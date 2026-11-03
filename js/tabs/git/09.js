// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "حالات حقيقية: الهوية والـ remote واللي بيدخل الـ commit",
      l: 3,
      time: R`حوالي ٥ ساعات (٩ حالات، كل واحدة بمعملها)`,
      goal: [
        R`تعرف الـ commit اتعمل بأنهي إيميل ومنين جه الإيميل ده، وتصلّح آخر commit أو التاريخ كله من غير ما تمسح شغل حد.`,
        R`تعرف انت ورا ولا قدام الـ remote بالأرقام قبل أي push، وترفع commit معين على main بـ fast-forward.`,
        R`تحوّل فولدر مشروع لأول ريبو على GitHub من غير ما يدخل فيه [[node_modules]] ولا أسرار، وتعرف إيه اللي بيخبّي ملف من غير ما تحس.`,
        R`تختار بإيدك الملفات اللي تدخل الـ commit، وتفحص الـ staged من الأسرار وملفات الـ build بفحص مبيكدبش عليك.`,
        R`تكشف إن سكربت أو [[sed]] قلب نهايات السطور في ملف، وتصلّحه، وتكتب سكربت تعديل مبيلمسهاش.`,
        R`تنزّل أداة من GitHub Releases وتتأكد إنها هي اللي اترفعت بالـ checksum قبل ما تشغّلها.`,
      ],
      use: {
        prog: R`كل حالة هنا حصلت فعلًا في شغل حقيقي، واتعادت في معمل بأسامي مخترعة ([[shop-api]] و [[ali]] و [[mona]] و [[ali@example.com]]). وكل واحدة ماشية بنفس الترتيب: العَرَض، والفحوصات بالترتيب وليه، والسبب، والحل والبدايل اللي اترفضت، والتأكيد، والوقاية.`,
        cs: R`الـ commit object فيه اسم وإيميل مرتين (author و committer) والهاش محسوب منهم، فأي تصليح في الإيميل = commit جديد بهاش جديد. والـ index هو اللي بيحدد إيه اللي داخل الـ commit، مش الفولدر. والـ checksum بيثبت إن البايتات هي هي، مش إن الأداة آمنة.`,
        work: R`«النشر اتقفل ومش فاهم ليه»، و «رفعت node_modules بالغلط»، و «الـ diff بيقول الملف كله اتغيّر وأنا غيّرت سطر» من أكتر المشاكل اللي بتوقف شغل حد في يومه، وحلها الصح بياخد دقايق لو عارف الترتيب.`,
      },
      lab: R`mkdir -p ~/lab/gitcases2 && cd ~/lab/gitcases2`,
      projects: [
        { lvl: 'صغير', t: R`[[whoami-git.sh]]: أنا هعمل commit بأنهي هوية؟`, what: R`سكربت بيتشغّل جوه أي ريبو ويطبع: الاسم والإيميل الفعليين ([[git var GIT_AUTHOR_IDENT]])، وكل مكان متعرّف فيه [[user.email]] بـ [[--show-origin --show-scope]]، وعدد الإيميلات المختلفة في آخر ٥٠ commit. ولو الإيميل الفعلي مش في ملف [[~/.allowed-emails]] يطبع [[WARN]] ويخرج بـ ١. من درس «إيميل الـ commit غلط والنشر اتقفل».`, done: R`في معمل الدرس بيطبع [[local  ali@laptop.local]] و [[WARN: ali@laptop.local not allowed]] ورقم خروج ١، وبعد [[git config --unset user.email]] بيطبع [[global ali@example.com]] ورقم خروج ٠.` },
        { lvl: 'صغير', t: R`[[sync-report.sh]]: كل الفروع ورا ولا قدام`, what: R`بيعمل [[git fetch]] مرة واحدة، وبعدين لكل فرع محلي يطبع سطر: الاسم، والـ upstream، ورقمين ورا/قدام من [[git rev-list --left-right --count]]. والفرع اللي مالوش upstream يطبع [[no upstream]] بدل ما يقع. من درس «ورا ولا قدام الـ remote؟».`, done: R`في معمل الدرس بيطبع [[feature-x  origin/feature-x  behind 1  ahead 2]] و [[feature-y  no upstream]]، ورقم الخروج ٠ حتى مع الفرع اللي مالوش upstream.` },
        { lvl: 'متوسط', t: R`pre-commit hook بيفحص الـ staged`, what: R`hook في [[.git/hooks/pre-commit]] بيفحص الملفات اللي داخلة الـ commit بس ([[git diff --cached --name-only -z]]): يرفض ملفات build ([[bin/]] و [[obj/]] و [[node_modules/]] و [[.exe]] و [[.dll]])، ويدوّر بـ [[git grep --cached]] على أنماط أسرار، ويفرّق بين «لقى» (٠) و «ملقاش» (١) و «الفحص نفسه فشل» (أي رقم تاني) فيرفض في الحالتين الأولى والتالتة. من درس «فحص أسرار قبل الـ commit».`, done: R`commit فيه [[tok_live_]] بيترفض ويطبع اسم الملف ورقم السطر، و commit فيه [[obj/project.assets.json]] بيترفض، ولو بوّظت الـ regex عمدًا الـ hook بيرفض بـ [[scan failed]] مش بيعدّي، و commit نضيف بيعدّي.` },
        { lvl: 'متوسط', t: R`[[eol-check.py]]: مين اتقلبت نهايات سطوره؟`, what: R`سكربت Python بيلف على الملفات المتغيّرة ([[git diff --name-only -z]])، ولكل ملف يعدّ CRLF و LF في نسخة HEAD ([[git show HEAD:<ملف>]]) وفي الملف على الديسك، ويطبع [[eol changed]] لو النوع اتغيّر. و [[--fix]] بيرجّع الملف لنوع HEAD بالبايت. من درسين «الـ diff بيقول الملف كله اتغيّر» و «سكربت Python يعدّل ملف CRLF».`, done: R`في معمل الدرس بيطبع [[deploy.ps1: HEAD crlf=122, now crlf=0  eol changed]]، وبعد [[--fix]] [[git diff --numstat]] بيطبع [[1	1	deploy.ps1]]، وتشغيله تاني مبيغيّرش حاجة.` },
        { lvl: 'كبير', t: R`[[fix-author.sh]]: صلّح إيميل التاريخ بأمان`, what: R`أداة كاملة بتاخد الإيميل الغلط والصح والفرع. (١) [[--dry-run]] الافتراضي: يطبع الـ commits اللي هتتغيّر بس (author أو committer). (٢) يرفض لو الشجرة فيها تعديلات. (٣) يعمل فرع احتياطي [[backup/<فرع>-<تاريخ>]]. (٤) يعيد الكتابة بـ [[git filter-repo]] لو موجود، وإلا [[git filter-branch --env-filter]]. (٥) يتأكد إن الـ tree هو هو قبل وبعد ([[rev-parse <فرع>^{tree}]]). (٦) يمسح [[refs/original]]. (٧) يطبع أمر الـ push بـ [[--force-with-lease]] ومبيعملوش إلا لو اديته [[--push]]. وكل خطوة في لوج.`, done: R`في معمل الدرس: بعد التشغيل [[git log --pretty=%ae | sort -u]] سطر واحد، والـ tree نفس الهاش، و [[git for-each-ref refs/original]] فاضي، والفرع الاحتياطي موجود. وتشغيله تاني بيطبع [[nothing to rewrite]] ومبيغيّرش هاش.`, ext: R`خليه يغطي كذا إيميل غلط من ملف [[.mailmap]]، ويشتغل على كل الفروع والـ tags ([[--all]])، ويطبع للفريق رسالة جاهزة فيها الأوامر اللي كل واحد يعملها بعد إعادة الكتابة.` },
        { lvl: 'كبير', t: R`[[fetch-release]]: نزّل أداة وتأكد منها`, what: R`سكربت (bash و PowerShell) بياخد [[owner/repo]] واسم الـ asset. (١) [[gh release view --json tagName,publishedAt,assets]]. (٢) يرفض لو الإصدار عمره أقل من ١٤ يوم إلا بـ [[--allow-fresh]]. (٣) [[gh release download]] في فولدر جديد فاضي. (٤) يقارن الهاش بملف الـ checksums أو الـ [[.dgst]] **و** بحقل [[digest]] بتاع GitHub، ويرفض لو أي واحد مختلف. (٥) يفك في فولدر باسم الإصدار ويشغّل [[--version]]. (٦) لوج بكل خطوة، وتشغيله تاني على نفس الإصدار مبينزّلش تاني.`, done: R`على إصدار عام صغير بيطبع [[OK sha256]] ونسخة الأداة، ولو زوّدت بايت في الملف بعد التنزيل بيطبع [[MISMATCH]] وبيخرج بـ ١ ومبيفكّش، وعلى إصدار عمره أيام بيرفض ويطبع عمره بالأيام.`, ext: R`زوّد [[gh release verify-asset]] أو [[gh attestation verify]] لو الريبو بينشر attestations، واعمل منه GitHub Action بتحدّث نسخة الأداة في ريبو وتفتح PR.` },
        { lvl: 'فكرة', t: R`[[pre-push]] بتاعك`, what: R`جمّع الدروس دي في checklist بتتشغّل قبل أي push: الهوية صح؟ أنا ورا؟ فيه ملفات build أو أسرار؟ نهايات سطور اتقلبت؟ الـ push هيكون force؟ انت اللي تختار الشكل (hook، أو alias، أو سكربت في الريبو)، وتحدد إيه اللي يمنع وإيه اللي يحذّر بس.`, done: R`على معمل كل درس من التسعة الـ checklist بتمسك المشكلة قبل ما توصل للـ remote، وزميل استخدمها أسبوع من غير ما تمنع push سليم.`, ext: R`حطها في [[core.hooksPath]] مشترك للفريق، وخلي نفس الفحوصات تتشغّل في GitHub Actions على كل PR عشان اللي معندوش الـ hook.` },
      ],
      n: R`تسع حالات حصلت فعلًا واتعادت في معمل بأسامي مخترعة: إيميل commit غلط قفل النشر، وورا ولا قدام قبل الـ push، وأول ريبو من فولدر، وشغل في المشروع الغلط، و commit لملفاتك بس، وفحص الأسرار، ونهايات السطور اللي اتقلبت بسكربت، وتنزيل أداة بـ checksum. كل حالة: العَرَض، والفحوصات بالترتيب، والسبب، والحل، والبدايل اللي اترفضت، والتأكيد، والوقاية`,
      items: [
        {
          cmd: "إيميل الـ commit غلط والنشر اتقفل",
          title: "منصة النشر قالت Blocked بعد الـ push: الـ commit اتعمل بإيميل مش بتاعك",
          learn: R`تعرف كل commit اتعمل بأنهي إيميل (author و committer)، ومنين جه، وتصلّح آخر commit أو التاريخ كله، وتنضّف النسخة الاحتياطية، وتتأكد من بره.`,
          out: R`[[git log --pretty=%ae | sort -u]] بيطبع إيميل واحد بس، وهو الإيميل المربوط بحسابك.`,
          desc: R`عملت push، ومنصة النشر علّمت النشر **Blocked** أو فضل معلّق. من أشهر الأسباب: الـ commit اتعمل بإيميل مش مربوط بحسابك (لا على GitHub ولا على المنصة). وده بيحصل لما [[user.email]] يتغيّر في ريبو واحد، أو git يخمّن إيميل من اسم جهازك لأنك مضبطّتهوش أصلًا.

الترتيب:
1. **الهوية دلوقتي:** [[git config --show-origin --show-scope --get-all user.email]]: كل مكان متعرّف فيه، وآخر واحد هو اللي بيكسب.
2. **التاريخ:** [[git log --pretty="%h | %an <%ae> | committer: %cn <%ce>"]]: كل commit فيه إيميلين، والاتنين مهمين.
3. **آخر commit بس:** [[git commit --amend --reset-author --no-edit]] وبعدين [[git push --force-with-lease]].
4. **التاريخ كله:** [[git filter-branch --env-filter]] (أو [[git filter-repo]] الأحدث)، وبعدين تنضّف [[refs/original]].

وأي تصليح هنا بيعمل commits جديدة بهاشات جديدة، فلازم push بـ force، ولازم تعرف مين تاني شغال على الفرع.`,
          example: R`git config --show-origin --show-scope --get-all user.email
git log -6 --pretty="%h | %an <%ae> | committer: %cn <%ce>"
git log --pretty="%ae" | sort | uniq -c
git config --unset user.email
git commit --amend --reset-author --no-edit
git push --force-with-lease --force-if-includes origin feature-x
git fetch origin
git rev-list --left-right --count origin/main...HEAD
git push origin HEAD:main`,
          lines: [
            R`بيطبع **كل** قيمة لـ [[user.email]] ومنين جت: [[--show-scope]] بيقول [[global]] ولا [[local]]، و [[--show-origin]] بيقول اسم الملف، و [[--get-all]] بيطبعهم كلهم مش اللي بيكسب بس. آخر سطر هو اللي git بيستخدمه.`,
            R`آخر ٦ commits، ولكل واحد: [[%h]] الهاش المختصر، و [[%an]] و [[%ae]] اسم وإيميل الـ author (اللي كتب التعديل)، و [[%cn]] و [[%ce]] اسم وإيميل الـ committer (اللي عمل الـ commit أو عدّله آخر مرة).`,
            R`كل الإيميلات في تاريخ الفرع، و [[sort | uniq -c]] بيرتّبهم ويعدّ كل واحد اتكرر كام مرة. لو طلع أكتر من سطر يبقى فيه commits بإيميل تاني.`,
            R`بيمسح [[user.email]] من إعدادات الريبو ده بس ([[.git/config]])، فيرجع للـ global الصح. (أو [[git config user.email ali@example.com]] لو عايزه local.)`,
            R`[[--amend]] بيعيد عمل آخر commit، و [[--reset-author]] بيقول «خد الـ author من الإعداد الحالي» (من غيره الـ author بيفضل القديم)، و [[--no-edit]] سيب الرسالة زي ما هي.`,
            R`بيرفع الفرع مكان القديم. [[--force-with-lease]] بيرفض لو الفرع على الـ remote مش هو اللي انت شايفه، و [[--force-if-includes]] بيرفض كمان لو عملت fetch وجالك شغل حد ومدمجتهوش.`,
            R`بيجيب آخر حالة من الـ remote من غير ما يغيّر ملفاتك، عشان الأرقام اللي جاية تبقى صح.`,
            R`رقمين: الشمال commits في [[origin/main]] مش عندك (ورا)، واليمين commits عندك مش فيه (قدام). [[0	2]] معناها تقدر تعمل fast-forward.`,
            R`[[HEAD:main]] معناها «حط الـ commit اللي انا واقف عليه على فرع main اللي على الـ remote». لو main مش ورا HEAD بالظبط بيترفض، فمبيعملش merge commit أبدًا.`,
          ],
          try: R`ابني المعمل اللي في الشرح، وامشي على الفحوصات التلاتة واكتب الإيميلين اللي ظهروا ومنين جه كل واحد. وبعدين جرّب [[git commit --amend --no-edit]] **من غير** [[--reset-author]] وقول إيه اللي اتغيّر وإيه اللي متغيّرش.`,
          teach: R`## العَرَض

عملت push لفرع [[feature-x]]، ومنصة النشر (زي Vercel) علّمت النشر **Blocked**، أو فضل في حالة مش واضحة من غير لوج. محدش غيّر في الكود حاجة غريبة.

> المنصة بتفحص إيه بالظبط؟ في منتدى Vercel الرسمي ناس كتير اشتكوا من «Deployment Blocked» وكان السبب: صاحب الـ commit (author) مش هو صاحب الحساب على خطة Hobby، أو إيميل الـ commit مش verified على حساب GitHub المربوط. **ملقيناش وثيقة رسمية بتقول إن المنصة بتفحص آخر commit بس** ولا كل الـ commits اللي في الـ push، فمتعتمدش على ده. الأضمن: كل commit في الفرع يبقى بإيميلك المربوط.

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56) وعلى [[ubuntu:24.04]] في Docker (Git 2.43)، ونفس النتايج. الـ [[origin]] ريبو bare على الجهاز بدل GitHub:

~~~bash
mkdir -p ~/lab/gitcases2/email && cd ~/lab/gitcases2/email
git config --global user.name "Ali Hassan"
git config --global user.email ali@example.com           # ده الإيميل المربوط بحسابك
git init -q --bare -b main origin/shop-api.git
git clone -q origin/shop-api.git laptop && cd laptop
printf 'PORT=3000\n' > config.env && git add . && git commit -qm "first version"
printf 'v1\n' > server.js && git add . && git commit -qm "server v1"
git push -q origin main
git switch -qc feature-x
git config user.email ali@laptop.local                    # الغلطة: إعداد local في الريبو ده
printf 'v2\n' > server.js && git commit -qam "server v2"
printf 'orders\n' > orders.js && git add . && git commit -qm "orders route"
git push -q -u origin feature-x
~~~

> لو مش عايز المعمل يلمس إعداداتك الـ global: قبل الأوامر [[export GIT_CONFIG_GLOBAL=~/lab/gitcases2/email/global.gitconfig]]، فـ [[--global]] يكتب في الملف ده بدل [[~/.gitconfig]].

---

## ١. الهوية دلوقتي: مين بيكسب؟

~~~text git config --show-origin --show-scope --get-all user.email
global	file:/home/ali/lab/gitcases2/email/global.gitconfig	ali@example.com
local	file:.git/config	ali@laptop.local
~~~

| الحتة | معناها |
|---|---|
| [[--get-all]] | اطبع كل قيمة للمفتاح ده، مش اللي بيكسب بس. [[git config user.email]] لوحده كان هيطبع [[ali@laptop.local]] وخلاص، ومتعرفش إن فيه global صح |
| [[--show-scope]] | العمود الأول: [[system]] (لكل اليوزرز) ولا [[global]] (ليك) ولا [[local]] (الريبو ده) |
| [[--show-origin]] | العمود التاني: الملف اللي القيمة جاية منه بالظبط |

git بيقرا الإعدادات بالترتيب system ثم global ثم local، **والأخير بيكسب**. فهنا [[ali@laptop.local]] هو اللي بيتكتب في أي commit جديد في الريبو ده، حتى لو الـ global صح.

---

## ٢. التاريخ: كل commit فيه إيميلين

~~~text git log -6 --pretty="%h | %an <%ae> | committer: %cn <%ce>"
2b49b32 | Ali Hassan <ali@laptop.local> | committer: Ali Hassan <ali@laptop.local>
d41eaeb | Ali Hassan <ali@laptop.local> | committer: Ali Hassan <ali@laptop.local>
24bec5d | Ali Hassan <ali@example.com> | committer: Ali Hassan <ali@example.com>
c472dbb | Ali Hassan <ali@example.com> | committer: Ali Hassan <ali@example.com>
~~~

- **author** ([[%an]] و [[%ae]]): اللي كتب التعديل. ده اللي GitHub بيعرضه جنب الـ commit.
- **committer** ([[%cn]] و [[%ce]]): اللي عمل الـ commit فعلًا أو عدّله آخر مرة (بـ amend أو rebase أو cherry-pick). غالبًا هو هو، لكن بيختلفوا لما حد يعدّل commit حد تاني.

ليه الاتنين مهمين؟ لأن التصليح الغلط بيصلّح واحد ويسيب التاني، وهنشوف ده بعينينا.

~~~text git log --pretty="%ae" | sort | uniq -c
      2 ali@example.com
      2 ali@laptop.local
~~~

إيميلين: آخر ٢ commits بالغلط. ولو عايز تشوف الفروع كلها مش الحالي بس: [[git log --all --pretty="%ae"]].

---

## السبب: منين جه الإيميل الغلط؟

هنا جه من [[git config user.email]] من غير [[--global]] اتكتب في ريبو واحد. وفيه سبب تاني أخطر: لو مفيش [[user.email]] خالص، git **بيخمّن** من اسم اليوزر واسم الجهاز. جرّبناها على [[ubuntu:24.04]] بجهاز اسمه [[laptop.lan]] ومن غير إيميل:

~~~text git commit -m first
[main (root-commit) b164204] first
 Committer: Ali Hassan <ali@laptop.lan>
Your name and email address were configured automatically based
on your username and hostname. Please check that they are accurate.
...
After doing this, you may fix the identity used for this commit with:

    git commit --amend --reset-author
~~~

الـ commit **اتعمل** بإيميل [[ali@laptop.lan]]، والتحذير بيعدّي في الزحمة. ولو اسم الجهاز مفيهوش دومين (زي أغلب أجهزة ويندوز) git بيرفض بدل ما يخمّن: [[fatal: unable to auto-detect email address (got 'ali@LAPTOP.(none)')]].

---

## ٣. الإصلاح ١: آخر commit بس

### الغلطة الأولى: [[--amend]] من غير [[--reset-author]]

~~~bash
git config --unset user.email          # يرجع للـ global: ali@example.com
git commit --amend --no-edit
git log -1 --pretty="%h | %an <%ae> | committer: %cn <%ce>"
~~~

~~~text الناتج
12ae68e | Ali Hassan <ali@laptop.local> | committer: Ali Hassan <ali@example.com>
~~~

الـ committer اتصلّح، والـ **author لسه غلط**. الـ amend بيحافظ على الـ author الأصلي عمدًا (عشان لو بتعدّل commit زميلك ميتنسبلكش). فلازم تقوله صراحة:

~~~text git commit --amend --reset-author --no-edit && git log -3 --pretty="%h | %ae | %ce | %s"
4a9a3a2 | ali@example.com | ali@example.com | orders route
f3d7dff | ali@laptop.local | ali@laptop.local | server v2
18a1177 | ali@example.com | ali@example.com | server v1
~~~

[[--reset-author]] بيعيد الـ author من الإعداد الحالي، وبيحدّث وقت الـ author كمان. آخر commit اتصلّح، و [[server v2]] لسه غلط (ده للإصلاح ٢).

### الرفع: ليه push عادي بيترفض؟

~~~text git push origin feature-x
 ! [rejected]        feature-x -> feature-x (non-fast-forward)
error: failed to push some refs to '.../origin/shop-api.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. ...
~~~

الـ amend عمل commit جديد ([[4a9a3a2]]) بدل القديم، فالفرع اللي على الـ remote فيه commit مش عندك. لازم force، والسؤال: أنهي force؟

| الأمر | بيعمل إيه | الخطر |
|---|---|---|
| [[git push --force]] | بيكتب فوق الفرع مهما كان فيه | لو زميلك رفع commit من دقيقة، بيتمسح من غير ما تعرف |
| [[git push --force-with-lease]] | بيكتب فوق بس لو الفرع على الـ remote لسه زي [[origin/feature-x]] اللي عندك | **بيتخدع لو عملت [[git fetch]]**، تحت |
| [[--force-with-lease --force-if-includes]] | زي اللي فوق، وكمان بيتأكد إن آخر حاجة جت في الـ fetch موجودة في فرعك | ده الأأمن (Git 2.30 وأحدث) |

### الفخ اللي جرّبناه: [[fetch]] بيخلّي الـ lease يعدّي

[[mona]] رفعت commit على [[feature-x]]. وعلي عمل amend، وبعدين:

~~~text git push --force-with-lease origin feature-x
 ! [rejected]        feature-x -> feature-x (stale info)
~~~

ممتاز، الـ lease حماه. بس علي عمل [[git fetch]] «عشان يحدّث» وجرّب تاني:

~~~text git fetch && git push --force-with-lease origin feature-x
 + 62c4e27...794ee4e feature-x -> feature-x (forced update)
~~~

**الـ commit بتاع mona اتمسح.** الـ fetch حدّث [[origin/feature-x]] عندك، فالـ lease («الفرع لسه زي اللي شايفه») بقى صح. وبـ [[--force-if-includes]] على نفس الحالة:

~~~text git push --force-with-lease --force-if-includes origin feature-x
 ! [rejected]        feature-x -> feature-x (remote ref updated since checkout)
hint: Updates were rejected because the tip of the remote-tracking branch has
hint: been updated since the last checkout. ...
~~~

وفيه طريقة تانية بتشتغل على أي نسخة: احفظ الهاش اللي على الـ remote **قبل** ما تعدّل، واديه للـ lease صراحة:

~~~bash
old=$(git rev-parse origin/feature-x)        # قبل الـ amend
git commit --amend --reset-author --no-edit
git push --force-with-lease=feature-x:$old origin feature-x
~~~

ده بيترفض لو الفرع على الـ remote بقى أي حاجة غير [[$old]]، مهما عملت fetch. (لازم الهاش الكامل أو اسم يتحل لهاش: هاش مختصر مكتوب غلط بيطلّع [[error: cannot parse expected object name]].)

---

## ٤. دمج في main بـ fast-forward من غير merge commit

الفرع اتصلّح، وعايز main يبقى عليه. merge عادي هيعمل merge commit جديد، وده هيتعمل بالإيميل الحالي (صح)، بس هيضيف commit مالوش لازمة. الأنضف: تحرّك main لنفس الـ commit لو ده ممكن.

~~~bash
git fetch origin
echo "ahead: $(git rev-list --count origin/main..HEAD)  behind: $(git rev-list --count HEAD..origin/main)"
git rev-list --left-right --count origin/main...HEAD
~~~

~~~text الناتج
ahead: 2  behind: 0
0	2
~~~

- [[origin/main..HEAD]] (نقطتين): الـ commits اللي في HEAD ومش في main. [[--count]] بيعدّهم بس.
- [[HEAD..origin/main]]: العكس. **لازم صفر** عشان الـ fast-forward يبقى ممكن.
- [[origin/main...HEAD]] (تلات نقط) و [[--left-right]]: الاتنين في أمر واحد، الشمال للي في main بس واليمين للي في HEAD بس. (ليه درس كامل: «ورا ولا قدام الـ remote؟».)

~~~text git push origin "$(git rev-parse --short HEAD)":main
   3bcea66..9cd8364  9cd8364 -> main
~~~

[[<مصدر>:<هدف>]] اسمها refspec: «خد المصدر ده من عندي، وحطه على الفرع ده هناك». المصدر ممكن يبقى هاش، أو [[HEAD]]، أو اسم فرع ([[feature-x:main]]). ومن غير [[--force]] git بيقبل بس لو الحركة fast-forward، فمستحيل يعمل merge commit أو يمسح حاجة.

ولو main اتحرك (mona رفعت عليه) قبل ما ترفع:

~~~text الناتج
ahead: 1  behind: 1
 ! [rejected]        HEAD -> main (non-fast-forward)
hint: Updates were rejected because a pushed branch tip is behind its remote
hint: counterpart. ...
~~~

هنا تعمل rebase على [[origin/main]] الأول (درس «git pull --rebase»)، وبعدين تعيد الفحص.

---

## ٥. الإصلاح ٢: التاريخ كله بـ [[filter-branch]]

[[server v2]] لسه بالإيميل الغلط. لتعديل أكتر من commit:

~~~bash
git branch backup/before-email                 # نسخة احتياطية بإيدك، بالاسم
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "ali@laptop.local" ]; then
  export GIT_AUTHOR_EMAIL="ali@example.com"
  export GIT_AUTHOR_NAME="Ali Hassan"
fi
if [ "$GIT_COMMITTER_EMAIL" = "ali@laptop.local" ]; then
  export GIT_COMMITTER_EMAIL="ali@example.com"
  export GIT_COMMITTER_NAME="Ali Hassan"
fi' -- feature-x
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[FILTER_BRANCH_SQUELCH_WARNING=1]] | متغيّر بيئة للأمر ده بس. من غيره بيطبع تحذير طويل إن [[filter-branch]] «فيه فخاخ كتير» وبيقترح [[git filter-repo]]، وبيستنى ثواني قبل ما يكمّل |
| [[--env-filter '...']] | سكربت shell بيتشغّل **لكل commit**، وقبله git بيحط بيانات الـ commit في متغيرات: [[GIT_AUTHOR_NAME]] و [[GIT_AUTHOR_EMAIL]] و [[GIT_AUTHOR_DATE]] ونفسهم لـ [[COMMITTER]]. اللي تعمله [[export]] بيتكتب في الـ commit الجديد |
| [[if [ "$GIT_AUTHOR_EMAIL" = "..." ]]] | غيّر بس لو الإيميل هو الغلط. من غير الشرط هتغيّر commits زمايلك كمان |
| [[-- feature-x]] | الفرع اللي هيتعاد كتابته. [[--]] بيفصل خيارات [[filter-branch]] عن الـ refs. [[-- --all]] كل الفروع والـ tags |

~~~text الناتج
Rewrite 9e80ade543c080af319dc562f29b5a05d6855636 (3/4) (1 seconds passed, remaining 0 predicted)
Ref 'refs/heads/feature-x' was rewritten
~~~

~~~text git log --pretty="%h %ae %ce %s"
42becea ali@example.com ali@example.com orders route
5edc5c0 ali@example.com ali@example.com server v2
594c9cf ali@example.com ali@example.com server v1
17d4892 ali@example.com ali@example.com first version
~~~

### الهاشات: مش كلها اتغيّرت

~~~text git log --oneline origin/feature-x   (قبل)        git log --oneline feature-x   (بعد)
9e80ade orders route                            42becea orders route
07010e4 server v2                               5edc5c0 server v2
594c9cf server v1                               594c9cf server v1
17d4892 first version                           17d4892 first version
~~~

الهاش محسوب من المحتوى **والـ author والـ committer والأب**. أول اتنين مااتغيّرش فيهم حاجة فهاشهم هو هو، وأول ما commit اتغيّر، هو وكل اللي بعده بقوا هاشات جديدة (لأن «الأب» اتغيّر). عشان كده:

~~~text git status -sb
## feature-x...origin/feature-x [ahead 2, behind 2]
~~~

### اتأكد إن الكود مااتلمسش

~~~bash
git diff backup/before-email feature-x --stat     # ولا سطر = نفس الملفات
git rev-parse backup/before-email^{tree} feature-x^{tree}
~~~

~~~text الناتج
3803eb30583af1aca9c442ae9b81d8f881824117
3803eb30583af1aca9c442ae9b81d8f881824117
~~~

[[^{tree}]] معناها «الـ tree بتاع الـ commit ده»: صورة كل الملفات. نفس الهاش = نفس الملفات بالبايت. اللي اتغيّر الأسامي والإيميلات بس.

### الرفع

main كان واقف على [[server v1]] اللي هاشه مااتغيّرش، فـ main يتقدّم fast-forward. لكن لو كنت عملت الإصلاح ١ ورفعت على main قبل كده (زي ما حصل في الشات الأصلي)، main بقى فيه الهاش القديم ولازم force هو كمان:

~~~text git push origin feature-x:main   (بعد ما main كان اتحرّك للهاش القديم)
hint: Updates were rejected because a pushed branch tip is behind its remote
~~~

~~~text git push --force-with-lease origin feature-x feature-x:main
 + 263a24a...e97da75 feature-x -> feature-x (forced update)
 + 263a24a...e97da75 feature-x -> main (forced update)
~~~

أمر واحد بـ refspecين: الفرع نفسه، و main. وكل واحد بالـ lease بتاعه. **force على main بيأثر على كل الفريق**: أي حد عنده نسخة قديمة لازم يعمل [[git fetch]] و [[git reset --hard origin/main]] (بعد ما يحفظ شغله)، وإلا هيرجّع الهاشات القديمة في أول push. في الشات الأصلي كان ريبو صاحبه لوحده، وده اللي خلّى force على main مقبول.

### النسخة الاحتياطية: [[refs/original]]

[[filter-branch]] بيحفظ الفرع القديم لوحده:

~~~text git for-each-ref refs/original
9e80ade543c080af319dc562f29b5a05d6855636 commit	refs/original/refs/heads/feature-x
~~~

ولو جيت تشغّله تاني:

~~~text FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --env-filter 'true' -- feature-x
Cannot create a new backup.
A previous backup already exists in refs/original/
Force overwriting the backup with -f
~~~

يا [[-f]] (بيكتب فوق النسخة القديمة)، يا تمسحها بعد ما تتأكد إن كل حاجة تمام:

~~~bash
git update-ref -d refs/original/refs/heads/feature-x
git for-each-ref refs/original          # فاضي
~~~

[[update-ref -d]] بيمسح ref واحد بالاسم الكامل. والـ commits القديمة لسه موجودة في [[git reflog]] لحد ما الـ gc يمسحها، وفي فرع [[backup/before-email]] اللي عملته، فامسحه هو كمان لما تخلص ([[git branch -D backup/before-email]]).

---

## ٦. البدايل، وليه اترفضت (اتجرّبت كلها في المعمل غير filter-repo)

| الطريقة | اللي حصل | الحكم |
|---|---|---|
| [[git rebase -r --root --exec 'git commit --amend --reset-author --no-edit']] | اشتغل في ٠.٦ ثانية، بس عدّل **الأربع commits** (حتى الصح) وكلهم بقى تاريخهم وقت تشغيل الأمر. يعني main بقى متفرّع والتواريخ الأصلية راحت | ⚠️ ينفع لو كل الـ commits بتاعتك ومش فارق التاريخ. وبطيء على تاريخ كبير |
| [[git filter-repo --mailmap my.mailmap]] | (من وثائق git-filter-repo، مش متنصّب في المعمل) أسرع بكتير، وبيعدّل حسب ملف mailmap، ومبيسيبش [[refs/original]]. الوثيقة الرسمية لـ git نفسها بتنصح بيه بدل [[filter-branch]] | ✅ لو تقدر تنصّبه ([[pip install git-filter-repo]]) |
| [[.mailmap]] في الريبو | [[git log --pretty=%aE]] و [[git shortlog -se]] بقوا يعرضوا [[ali@example.com]]، بس [[git cat-file -p HEAD]] لسه [[author Ali Hassan <ali@laptop.local>]] | ❌ بيغيّر **العرض** بس. المنصة و GitHub بيشوفوا الـ commit الحقيقي |
| commit جديد فاضي بالإيميل الصح | آخر commit بقى صح، والقدام لسه زي ما هي | ⚠️ ينفع لو المنصة بتبص على آخر commit بس، وده مش متأكد منه |
| تضيف الإيميل الغلط لحسابك على GitHub | لو الإيميل بتاعك فعلًا (مش [[@laptop.local]] متخمّن) ده أسهل حل: تضيفه وتعمله verify من [[Settings > Emails]] | ✅ لما الإيميل حقيقي وبتاعك (من وثائق GitHub) |

---

## ٧. اتأكد من بره، من غير ما تفتح المتصفح

بـ [[gh api]] (اتجرّبت على ريبو عام read-only، والأسامي هنا اتغيّرت لـ [[acme-co/shop-api]]):

~~~bash
gh api "repos/acme-co/shop-api/commits?sha=main&per_page=5" --jq '.[] | "\(.sha[0:7]) | \(.commit.author.email) | \(.commit.message | split("\n")[0])"'
gh api "repos/acme-co/shop-api/commits?sha=main&per_page=50" --jq '.[].commit.author.email' | sort -u
gh api repos/acme-co/shop-api/branches/main --jq '.commit.sha[0:7]'
~~~

- [[gh api <مسار>]] بيكلّم GitHub REST API بحسابك ويرجّع JSON. [[?sha=main]] الفرع، و [[per_page]] عدد النتايج.
- [[--jq]] بيطلّع حاجات من الـ JSON. [[.[]]] لف على عناصر المصفوفة، و [[.commit.author.email]] الحقل ده، و [[\(...)]] حط قيمة جوه نص، و [[.sha[0:7]]] أول ٧ حروف، و [[split("\n")[0]]] أول سطر من الرسالة.
- التاني لازم يطبع سطر واحد، والتالت لازم يطابق [[git rev-parse --short origin/main]].

### فخ الـ [[--jq]] اللي حصل فعلًا

الرد مصفوفة commits. لو كتبت كأنه object واحد، أو لفّيت مرتين:

~~~text gh api ".../commits?per_page=2" --jq '.commit.author.email'
expected an object but got: array ([{"author":{"avatar_url": ...])
~~~

~~~text gh api ".../commits?per_page=2" --jq '.[][] | .commit.author.email'
expected an object but got: string ("https://api.github.com/r ...")
~~~

[[.[][]]] بيلف على المصفوفة وبعدين على **قيم كل commit** (نصوص زي الـ url)، فـ [[.commit]] على نص بيفشل. الصح [[.[].commit.author.email]]. و [[gh]] جواه نسخة من jq اسمها gojq، فرسالته مختلفة عن [[jq]] العادي. نفس الغلطة بـ [[jq 1.7]] على Ubuntu:

~~~text jq -r '.commit.author.email' commits.json
jq: error (at commits.json:1): Cannot index array with string "commit"
~~~

---

## ٨. متتكررش

~~~bash
git config --global user.email ali@example.com     # مرة واحدة صح
git config --global user.useConfigOnly true        # متخمّنش أبدًا
git log -1 --pretty='%an <%ae>'                    # قبل أول push في أي ريبو
~~~

[[user.useConfigOnly]] بيمنع التخمين من اسم الجهاز. جرّبناه من غير أي إيميل:

~~~text git commit -m x
Author identity unknown

*** Please tell me who you are.
...
fatal: no email was given and auto-detection is disabled
~~~

رفض بدل ما يعمل commit بإيميل متخمّن. ولو عندك إيميل للشغل وإيميل شخصي، خلي كل فولدر ياخد بتاعه أوتوماتيك بـ [[includeIf]]:

~~~bash
git config --global includeIf."gitdir:~/work/".path "~/.gitconfig-work"
git config -f ~/.gitconfig-work user.email ali@acme-co.example
~~~

أي ريبو جوه [[~/work/]] بياخد إيميل الشغل، والباقي الإيميل الشخصي. جرّبناها: [[git var GIT_AUTHOR_IDENT]] جوه [[~/work/shop-api]] طبع [[Ali Hassan <ali@acme-co.example> ...]]، وفي [[~/personal/blog]] الشخصي.

---

## على PowerShell

نفس الأوامر بالظبط. الـ [[--env-filter]] بيتشغّل في الـ sh اللي جاي مع Git for Windows مهما كان الـ shell بتاعك، فالسكربت جوه الـ single quotes بيوصل زي ما هو. والمتغيّر بيتحط كده:

~~~powershell
$env:FILTER_BRANCH_SQUELCH_WARNING = 1
git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "ali@laptop.local" ]; then export GIT_AUTHOR_EMAIL="ali@example.com"; fi; if [ "$GIT_COMMITTER_EMAIL" = "ali@laptop.local" ]; then export GIT_COMMITTER_EMAIL="ali@example.com"; fi' -- feature-x
~~~

اتجرّب على PowerShell 7.6 و 5.1 ونفس النتيجة. لو هتغيّر اسم فيه مسافة ([[Ali Hassan]]) استخدم Git Bash: PowerShell 5.1 بيشيل علامات [["]] من جوه الـ arguments اللي رايحة لبرنامج تاني.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| الإيميل جاي منين | [[git config --show-origin --show-scope --get-all user.email]] |
| إيميلات التاريخ | [[git log --pretty="%h %ae %ce"]] و [[sort -u]] |
| آخر commit | [[--amend --reset-author --no-edit]] |
| رفع آمن بعد تعديل التاريخ | [[--force-with-lease --force-if-includes]] |
| main بـ fast-forward | [[rev-list --count HEAD..origin/main]] = ٠، وبعدين [[push origin HEAD:main]] |
| التاريخ كله | [[filter-branch --env-filter]] أو [[filter-repo --mailmap]] |
| تنضيف | [[git update-ref -d refs/original/refs/heads/<فرع>]] |

> [[--amend]] من غير [[--reset-author]] بيصلّح الـ committer بس. والإيميل في [[.mailmap]] عرض بس، مش تصليح.`,
          deep: {
            why: R`الـ commit مش «تعديل في ملفات» بس، ده object فيه الـ tree والأب واسم وإيميل ووقت مرتين. منصات النشر و GitHub بتربط الـ commit بحساب عن طريق الإيميل ده، فإيميل مش مربوط = commit «من حد غريب»، وبعض المنصات بترفض تنشره. والإيميل بيتكتب وقت الـ commit من الإعدادات، فغلطة في الإعداد بتفضل في التاريخ لحد ما تعيد كتابته.`,
            how: R`git بيقرا [[user.email]] من system ثم global ثم local والأخير بيكسب، ولو مفيش خالص بيخمّن من اسم اليوزر والجهاز (إلا لو [[useConfigOnly]]). الهاش محسوب من كل محتوى الـ commit، فأي تغيير في الإيميل بيطلّع هاش جديد، والـ commits اللي بعده هاشها بيتغيّر لأن الأب اتغيّر. [[--amend]] بيعمل commit جديد بنفس الأب ويحرّك الفرع عليه، وبيحتفظ بالـ author إلا لو [[--reset-author]]. و [[filter-branch]] بيلف على كل commit، يحط بياناته في متغيرات بيئة، يشغّل الـ filter، ويعمل commit جديد من النتيجة، ويحفظ الفرع القديم في [[refs/original]]. والـ push بيقبل fast-forward بس إلا لو force، و [[--force-with-lease]] بيقارن الفرع على الـ remote بالـ remote-tracking ref عندك قبل ما يكتب.`,
            when: R`لما منصة نشر أو GitHub تعرض commits من غير صورتك أو باسم غريب، أو بعد ما تعمل ريبو على جهاز جديد، أو لو عندك حساب شغل وحساب شخصي على نفس الجهاز، أو قبل ما تفتح ريبو داخلي للعامة (عشان إيميلات الشغل متتنشرش). ولو الإيميل الغلط إيميلك فعلًا، ضيفه لحسابك بدل ما تعيد كتابة التاريخ.`,
            mistakes: R`[[--amend]] من غير [[--reset-author]] فتفتكر إنك صلّحت. و [[git push --force]] على فرع حد تاني شغال عليه. و [[git fetch]] قبل [[--force-with-lease]] فالحماية تبطل من غير ما تحس. و [[filter-branch]] من غير شرط على الإيميل فتغيّر commits زمايلك. وتنسى إن الـ committer كمان فيه الإيميل الغلط. وتنسى تمسح [[refs/original]] فالتشغيل الجاي يقف بـ [[Cannot create a new backup]]. وتفتكر إن [[.mailmap]] بيصلّح التاريخ. وتعمل force على main من غير ما تقول للفريق.`
          },
          sol: R`الفحوصات: [[--get-all]] طلّع سطرين: [[global ... ali@example.com]] و [[local ... ali@laptop.local]]، والـ local بيكسب. و [[git log]] فيه آخر اتنين بـ [[ali@laptop.local]] في الـ author والـ committer.

[[git commit --amend --no-edit]] لوحده: [[Ali Hassan <ali@laptop.local> | committer: Ali Hassan <ali@example.com>]]. الـ committer اتصلّح والـ author لأ، لأن الـ amend بيحتفظ بالـ author الأصلي. والهاش اتغيّر رغم إن الملفات هي هي.

بعد [[--reset-author]]: الاتنين [[ali@example.com]]، وبعد [[filter-branch]]: [[git log --pretty=%ae | sort -u]] سطر واحد، و [[rev-parse ...^{tree}]] نفس الهاش قبل وبعد.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: commit فيه [[author: mona@example.com]] و [[committer: mona@example.com]]. عملت عليه [[git commit --amend --no-edit]] وانت [[ali@example.com]]. الـ author والـ committer هيبقوا إيه؟ وبـ [[--reset-author]]؟ وبعدين جرّب في المعمل.`, done: R`كتبت: من غير الخيار author [[mona]] و committer [[ali]]، وبالخيار الاتنين [[ali]]، والناتج في [[git log -1 --pretty="%ae / %ce"]] طابق توقعك في الحالتين.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git help push]] لاقي الفرق بين [[--force-with-lease]] من غير قيمة، و [[--force-with-lease=<ref>:<expect>]]، و [[--force-if-includes]]. وفي أنهي حالة بالظبط الأولى بتعدّي وهي المفروض تترفض؟`, done: R`كتبت ٣ سطور، وفيهم إن الأولى بتقارن بالـ remote-tracking ref اللي بيتحدّث مع أي [[fetch]]، فبعد fetch بتعدّي وتمسح شغل اللي رفع، وده اللي حصل في المعمل.` },
            { lvl: 'تطبيق', t: R`اعمل محاكاة لفريق: [[ali]] و [[mona]] على نفس [[feature-x]]. mona ترفع commit، وعلي يعمل amend ويعمل [[git fetch]] وبعدين push بالتلات طرق ([[--force]] و [[--force-with-lease]] و [[--force-with-lease --force-if-includes]])، كل مرة على معمل جديد. سجّل commit mona عاش ولا اتمسح.`, done: R`عندك جدول ٣ صفوف: الأوليين [[forced update]] و commit mona اختفى من [[git log origin/feature-x]]، والتالتة [[remote ref updated since checkout]] و commit mona موجود.` },
            { lvl: 'تطبيق', t: R`صلّح الـ env-filter البايظ ده: [[git filter-branch --env-filter 'export GIT_AUTHOR_EMAIL=ali@example.com' -- --all]]. فيه ٣ مشاكل على ريبو فيه commits لـ mona وفرعين. اكتب النسخة الصح وجرّبها على معمل فيه commit لـ mona.`, done: R`نسختك فيها شرط على الإيميل الغلط، وبتصلّح الـ committer كمان، وبعدها [[git log --all --pretty="%ae %ce" | sort -u]] فيه [[ali@example.com]] و [[mona@example.com]] بس، ومفيش [[ali@laptop.local]]، و commit mona اسمه لسه mona.` },
            { lvl: 'تحدي', t: R`قارن وقيس: على ريبو فيه ٢٠٠ commit (اعملهم بلوب)، ١٠٠ منهم بالإيميل الغلط، قيس بـ [[time]]: [[filter-branch --env-filter]] قصاد [[rebase -r --root --exec 'git commit --amend --reset-author --no-edit']]. وبعد كل واحد عدّ كام commit اتغيّر هاشه، واتأكد من التواريخ.`, done: R`عندك رقمين بالثواني لكل طريقة، وعدد الهاشات اللي اتغيّرت (filter-branch: من أول commit غلط لحد الآخر بس، rebase: الـ ٢٠٠)، وعرفت إن الـ rebase غيّر [[%ad]] لكل الـ commits لوقت التشغيل، و filter-branch سابه.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه بعد [[filter-branch]] الـ status قال [[ahead 2, behind 2]] مش [[ahead 4, behind 4]]؟ وإيه اللي لازم كل واحد في الفريق يعمله بعد ما تعمل force على main؟`, done: R`الشرح فيه إن الهاش محسوب من المحتوى والأب والإيميل، فالـ commits اللي مااتغيّرش فيها حاجة هاشها هو هو، وإن كل commit بعد أول واحد اتغيّر بياخد هاش جديد، وإن الفريق يحفظ شغله ويعمل [[git fetch]] و [[git reset --hard origin/main]] (أو rebase لشغله) قبل أي push.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_CONFIG_GLOBAL="$PWD/global.gitconfig" GIT_CONFIG_NOSYSTEM=1
git config --global user.name "Ali Hassan"; git config --global user.email ali@example.com; git config --global core.autocrlf false
git init -q --bare origin.git && git clone -q origin.git laptop 2>/dev/null && cd laptop
git switch -qc main
printf 'a\n' > a && git add . && git commit -qm one && printf 'b\n' > b && git add . && git commit -qm two
git push -q origin main && git switch -qc feature-x
git config user.email ali@laptop.local
printf 'c\n' > c && git add . && git commit -qm three && printf 'd\n' > d && git add . && git commit -qm four
git push -q -u origin feature-x
git config --show-scope --get-all user.email
git config --unset user.email
git commit --amend --no-edit -q && git log -1 --pretty="amend-only %ae / %ce"
git commit --amend --reset-author --no-edit -q && git log -1 --pretty="reset-author %ae / %ce"
git branch backup
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "ali@laptop.local" ]; then export GIT_AUTHOR_EMAIL=ali@example.com; fi; if [ "$GIT_COMMITTER_EMAIL" = "ali@laptop.local" ]; then export GIT_COMMITTER_EMAIL=ali@example.com; fi' -- feature-x >/dev/null 2>&1
echo "emails: $(git log --pretty='%ae %ce' | tr ' ' '\n' | sort -u | tr '\n' ' ')"
[ "$(git rev-parse backup^{tree})" = "$(git rev-parse feature-x^{tree})" ] && echo SAME-TREE
git for-each-ref refs/original | wc -l | tr -d ' '
git update-ref -d refs/original/refs/heads/feature-x && echo "backups: $(git for-each-ref refs/original | wc -l | tr -d ' ')"
git fetch -q && echo "behind: $(git rev-list --count HEAD..origin/main)"
git push -q --force-with-lease origin feature-x && git push origin HEAD:main 2>&1 | tail -1`, expect: [R`local	ali@laptop.local`, R`amend-only ali@laptop.local / ali@example.com`, R`reset-author ali@example.com / ali@example.com`, R`emails: ali@example.com `, R`SAME-TREE`, R`backups: 0`, R`behind: 0`, R`HEAD -> main`] },
          ],
        },
        {
          cmd: "ورا ولا قدام الـ remote؟",
          title: "قبل ما ترفع: انت ورا الـ remote ولا قدامه، وبكام commit؟",
          learn: R`تعرف بالأرقام انت ورا ولا قدام فرعك على الـ remote، وإيه الـ commits اللي لسه مترفعتش وإيه اللي جالك، وتتعامل مع فرع مالوش upstream.`,
          out: R`رقمين من [[git rev-list --left-right --count]] بتقراهم صح، وقرار: push ولا pull ولا rebase.`,
          desc: R`قبل أي push (وقبل أي [[scp]] لملف على سيرفر)، لازم تعرف حاجتين: فيه commits عندك لسه مترفعتش (**قدام**)؟ وفيه commits على الـ remote لسه مجتلكش (**ورا**)؟ [[git status -sb]] بيقولك، بس **بس من آخر مرة عملت [[fetch]]**، فمن غير fetch الرقم ممكن يكون كدب.

الترتيب:
1. [[git fetch origin]]: هات آخر حالة.
2. [[git status -sb]]: السطر الأول فيه [[ahead]] و [[behind]].
3. [[git rev-list --left-right --count origin/feature-x...HEAD]]: نفس الرقمين لسكربت.
4. [[git log origin/feature-x..HEAD --oneline]]: إيه اللي لسه مترفعش، و [[git log HEAD..origin/feature-x --oneline]]: إيه اللي جالك.

ولو الفرع مالوش upstream (عملته محلي ولسه مرفعتوش)، الأوامر دي بتقع، ولازم تتعامل مع ده في أي سكربت.`,
          example: R`git status -sb
git fetch origin
git status -sb
git rev-list --left-right --count origin/feature-x...HEAD
git log --oneline origin/feature-x..HEAD
git log --oneline HEAD..origin/feature-x
git log --oneline --left-right origin/feature-x...HEAD
git rev-parse --abbrev-ref --symbolic-full-name @{u}`,
          lines: [
            R`[[-s]] ناتج مختصر و [[-b]] زوّد سطر الفرع في الأول: [[## feature-x...origin/feature-x [ahead 2]]]. الرقم ده محسوب من آخر fetch، مش من الـ remote دلوقتي.`,
            R`[[fetch]] بيجيب الـ commits والفروع الجديدة من [[origin]] ويحدّث [[origin/feature-x]] عندك، **من غير ما يلمس ملفاتك ولا فرعك**. آمن تعمله في أي وقت.`,
            R`نفس الأمر تاني بعد الـ fetch: لو الرقم اتغيّر يبقى فيه حد رفع حاجة. هنا ظهر [[behind 1]] جديد.`,
            R`[[A...B]] بتلات نقط = الـ commits اللي في واحد بس منهم. [[--left-right]] بيفصلهم شمال ويمين، و [[--count]] بيعدّ. الناتج [[1	2]]: ١ في الـ remote بس (ورا)، و ٢ عندك بس (قدام).`,
            R`[[A..B]] بنقطتين = اللي في B ومش في A. هنا: commits عندك لسه مترفعتش.`,
            R`العكس: commits على الـ remote لسه مدخلتش فرعك. دي اللي هتيجي مع [[pull]].`,
            R`الاتنين في قايمة واحدة، وقبل كل commit علامة: [[<]] جاي من الشمال (الـ remote) و [[>]] من اليمين (عندك).`,
            R`[[@{u}]] اختصار لـ «الـ upstream بتاع الفرع ده». الأمر بيطبع اسمه ([[origin/feature-x]])، ولو مفيش بيقع بـ [[fatal: no upstream configured]]، فبيتستخدم كفحص في السكربتات.`,
          ],
          try: R`ابني المعمل اللي في الشرح، وقبل ما تعمل [[fetch]] اكتب توقعك لرقمين [[rev-list]]، وبعد الـ fetch قارن. وبعدين جرّب [[git push]] واقرا سبب الرفض، وحلّه بـ [[git pull --rebase]] وارجع للرقمين.`,
          teach: R`## العَرَض

حالتين حصلوا فعلًا: مرة الـ push اترفض من غير ما تفهم ليه، ومرة أسوأ: ملف اتنسخ على سيرفر بـ [[scp]] من جهاز كان **ورا** الريبو بـ ٢٠ commit، فرجّع كود قديم وكسر الإنتاج (درس «نسخة قديمة كسرت الإنتاج» في تاب diag). في الحالتين السؤال اللي كان لازم يتسأل قبل أي حاجة: «أنا فين بالنسبة للـ remote؟»

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56)، والناتج على [[ubuntu:24.04]] نفس الشكل:

~~~bash
mkdir -p ~/lab/gitcases2/sync && cd ~/lab/gitcases2/sync
git init -q --bare -b main origin/shop-api.git
git clone -q origin/shop-api.git laptop && cd laptop
echo a > a && git add . && git commit -qm "first" && git push -q -u origin main
git switch -qc feature-x && git push -q -u origin feature-x
git clone -q -b feature-x ../origin/shop-api.git ../mona            # زميلتك
(cd ../mona && echo m > m && git add . && git commit -qm "mona: m" && git push -q)
echo b > b && git add . && git commit -qm "ali: b"
echo c > c && git add . && git commit -qm "ali: c"
~~~

mona رفعت commit، وانت عندك ٢ مرفعتهمش.

---

## ١. [[git status -sb]] قبل وبعد الـ fetch

~~~text git status -sb   (قبل fetch)
## feature-x...origin/feature-x [ahead 2]
~~~

[[ahead 2]] بس، ومفيش [[behind]]. بس mona رفعت! الرقم ده بيقارن فرعك بـ [[origin/feature-x]] **اللي عندك على الجهاز**، وده متحدّثش من ساعة آخر fetch أو pull.

~~~text git fetch origin
From .../origin/shop-api
   a7b0597..b7a67dc  feature-x  -> origin/feature-x
~~~

السطر ده بيقول إن [[origin/feature-x]] اتحرّك من [[a7b0597]] لـ [[b7a67dc]]: فيه حاجة جديدة.

~~~text git status -sb   (بعد fetch)
## feature-x...origin/feature-x [ahead 2, behind 1]
~~~

ده الحقيقي: الفرعين **اتفرّعوا** (diverged). push عادي هيترفض، و pull عادي هيعمل merge commit.

---

## ٢. الرقمين لسكربت: [[rev-list --left-right --count]]

~~~text git rev-list --left-right --count origin/feature-x...HEAD
1	2
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[git rev-list]] | بيطبع هاشات commits حسب شروط. ده أمر «plumbing»: ناتجه ثابت ومعمول للسكربتات، عكس [[status]] اللي شكله ممكن يتغيّر |
| [[origin/feature-x...HEAD]] | تلات نقط: الـ commits اللي في واحد بس من الاتنين (الفرق المتماثل) |
| [[--left-right]] | علّم كل commit جاي من الشمال ولا اليمين |
| [[--count]] | متطبعش الهاشات، اطبع العدد، ومع [[--left-right]] بيطبع رقمين مفصولين بـ tab |

اقراها كده: **الشمال = ورا** (في الـ remote ومش عندك)، **اليمين = قدام** (عندك ومش في الـ remote). ولو كتبت [[HEAD...origin/feature-x]] بالعكس الرقمين بيتبدّلوا، فثبّت الترتيب في سكربتاتك.

| الناتج | المعنى | تعمل إيه |
|---|---|---|
| [[0	0]] | متزامن | مفيش حاجة |
| [[0	2]] | قدام بس | [[git push]] |
| [[3	0]] | ورا بس | [[git pull --ff-only]] |
| [[1	2]] | متفرّع | [[git pull --rebase]] وبعدين push |

وبدل اسم الفرع ممكن تكتب [[@{u}]] (الـ upstream): [[git rev-list --left-right --count @{u}...HEAD]] طلّع نفس [[1	2]]، وده بيشتغل على أي فرع من غير ما تكتب اسمه.

---

## ٣. أنهي commits بالظبط؟ نقطتين

~~~text git log --oneline origin/feature-x..HEAD
0fc2e94 ali: c
438a93d ali: b
~~~

~~~text git log --oneline HEAD..origin/feature-x
b7a67dc mona: m
~~~

[[A..B]] = «اللي في B ومش في A». الأول: اللي لسه مترفعش. التاني: اللي جالك ولسه مدخلش فرعك. والاتنين في أمر واحد:

~~~text git log --oneline --left-right origin/feature-x...HEAD
< b7a67dc mona: m
> 0fc2e94 ali: c
> 438a93d ali: b
~~~

وعشان تشوف إيه اللي **هيتغيّر في الملفات** لو عملت pull: [[git diff HEAD...origin/feature-x --stat]] (تلات نقط هنا معناها «من نقطة التفرّع لحد الـ remote»).

---

## ٤. الـ push بيترفض

~~~text git push
 ! [rejected]        feature-x -> feature-x (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. If you want to integrate the remote changes,
hint: use 'git pull' before pushing again.
~~~

الرسالة بتقول نفس اللي الرقمين قالوه. (ولو مكنتش عملت fetch خالص، السبب في الرسالة بيبقى [[(fetch first)]]: يعني «الـ remote فيه حاجة انت متعرفهاش أصلًا».) الحل: [[git pull --rebase]]، فالـ commits بتوعك تتحط فوق commit mona من غير merge commit:

~~~text git pull --rebase && git rev-list --left-right --count @{u}...HEAD
0	2
~~~

[[0]] ورا (commit mona بقى جوه فرعك)، و [[2]] قدام (بتوعك، بهاشات جديدة لأن أبوهم اتغيّر). بعد [[git push]] الرقمين [[0	0]].

---

## ٥. فرع مالوش upstream

~~~bash
git switch -qc feature-y
git status -sb
git log origin/feature-y..HEAD
~~~

~~~text الناتج
## feature-y
fatal: ambiguous argument 'origin/feature-y..HEAD': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
~~~

- [[## feature-y]] من غير [[...origin/...]]: الفرع مش مربوط بحاجة على الـ remote.
- [[git log origin/feature-y..HEAD]] بيقع لأن [[origin/feature-y]] مش موجود أصلًا.

~~~text git rev-list --count @{u}..HEAD
fatal: no upstream configured for branch 'feature-y'
~~~

في سكربت اتعامل معاها صراحة:

~~~bash
if up=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null); then
  git rev-list --left-right --count "$up"...HEAD
else
  echo "no upstream tracking"
fi
~~~

- [[up=$(...)]] بيحط الناتج في متغيّر، و [[if]] بيبص على رقم خروج الأمر: ٠ يبقى فيه upstream.
- [[2>/dev/null]] بيخفي رسالة الـ fatal، لأننا متعاملين معاها.
- الشكل القصير اللي في الشات الأصلي [[git log origin/x..HEAD 2>/dev/null || echo "no upstream tracking"]] بيشتغل، بس بيقول «no upstream» لأي فشل تاني كمان (اسم فرع غلط مثلًا)، فالشكل اللي فوق أدق.

والحل للفرع نفسه: [[git push -u origin feature-y]] ([[-u]] بيربطه بالـ upstream من أول push).

---

## اتأكد قبل أي push أو نسخ على سيرفر

~~~bash
git fetch origin
git status -sb                         # مفيش behind
git log --oneline HEAD..origin/main    # لازم يطلع فاضي قبل أي scp من الجهاز ده
~~~

## متتكررش

- خلّي [[git fetch]] أول أمر في أي سكربت نشر، ومتعتمدش على [[status]] من غيره.
- [[git config --global fetch.prune true]]: الـ fetch يمسح كمان الفروع اللي اتمسحت على الـ remote، فـ [[git branch -vv]] يقول [[gone]] عليها بدل ما تفضل كأنها موجودة.
- على PowerShell نفس الأوامر بالظبط، بس [[@{u}]] لازم بين علامتين: [[git rev-list --left-right --count '@{u}...HEAD']]. من غيرهم PowerShell بيفتكرها hashtable ([[@{}]] عنده معناها كده) وبيقف قبل ما git يشتغل: [[ParserError: Missing '=' operator after key in hash literal.]] (اتجرّب على 7.6).

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| حدّث الصورة | [[git fetch origin]] |
| ورا/قدام بالكلام | [[git status -sb]] |
| ورا/قدام لسكربت | [[git rev-list --left-right --count @{u}...HEAD]] (شمال ورا، يمين قدام) |
| إيه اللي مترفعش | [[git log @{u}..HEAD]] |
| إيه اللي جالي | [[git log HEAD..@{u}]] |
| فيه upstream؟ | [[git rev-parse --abbrev-ref @{u}]] |

> من غير [[fetch]]، [[up to date]] معناها «متزامن مع آخر مرة سألت»، مش دلوقتي.`,
          deep: {
            why: R`git مبيكلّمش الـ remote إلا في [[fetch]] و [[pull]] و [[push]]. كل حاجة تانية ([[status]] و [[log]] و [[branch -vv]]) بتقارن بنسخة محلية من فروع الـ remote ([[origin/*]])، فلو مسألتش الـ remote من بدري، الأرقام قديمة. وأخطر غلطة مش push يترفض: دي نسخ ملفات من نسخة قديمة على سيرفر، لأن مفيش حاجة بترفضها.`,
            how: R`الـ remote-tracking branches ([[refs/remotes/origin/*]]) هي آخر حاجة شافها الـ fetch. [[A..B]] معناها «اللي يوصله B ومايوصلوش A» في رسم الـ commits، و [[A...B]] «اللي يوصله واحد بس منهم». [[--left-right]] بيعلّم كل commit بجهته، و [[--count]] بيعدّ. و [[@{u}]] (أو [[@{upstream}]]) بيتحل من [[branch.<name>.remote]] و [[branch.<name>.merge]] في [[.git/config]]، اللي [[push -u]] أو [[clone]] بيكتبهم.`,
            when: R`قبل أي push، وقبل أي نسخ ملف من الجهاز لسيرفر أو لزميل، وفي أول سكربت نشر أو إصدار (درس «مشروع — الشجرة جاهزة؟»)، ولما الـ push يترفض، وقبل ما تبدأ شغل يوم جديد على فرع مشترك.`,
            mistakes: R`تصدّق [[up to date]] من غير fetch. وتقرا الرقمين بالعكس (الشمال قدام). وتكتب [[A..B]] وانت عايز [[A...B]] أو العكس. وتعمل [[git pull]] على فرع متفرّع فيعمل merge commit مش عايزه. وتكتب سكربت بـ [[origin/$branch]] فيقع على فرع جديد مالوش upstream، أو تحط [[|| echo]] تخبّي أي خطأ تاني. وفي PowerShell تكتب [[@{u}]] من غير quotes.`
          },
          sol: R`قبل الـ fetch: [[## feature-x...origin/feature-x [ahead 2]]] و [[0	2]]. بعده: [[[ahead 2, behind 1]]] و [[1	2]]. و [[git log origin/feature-x..HEAD]] فيه [[ali: c]] و [[ali: b]]، والعكس فيه [[mona: m]].

[[git push]] اترفض. وبعد [[git pull --rebase]]: الرقمين [[0	2]] (commits بتوعك اتحطوا فوق commit mona فهاشهم اتغيّر)، و [[git push]] عدّى، وبعده [[0	0]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: [[git rev-list --left-right --count origin/main...HEAD]] طلّع [[4	0]]. انت ورا ولا قدام وبكام؟ ولو كتبت [[HEAD...origin/main]] هيطلع إيه؟ وتعمل إيه؟`, done: R`كتبت: ورا بـ ٤ ومش قدام، والعكس بيطلّع [[0	4]]، والحل [[git pull --ff-only]] (مفيش حاجة عندك تتدمج).` },
            { lvl: 'سريع', t: R`اقرا وتوقّع: في المعمل قبل أي fetch، [[git log HEAD..origin/feature-x]] هيطبع إيه؟ وبعد الـ fetch؟ اكتب الاتنين وبعدين جرّب.`, done: R`توقعت فاضي قبل الـ fetch (لأن [[origin/feature-x]] عندك قديم) و [[mona: m]] بعده، والناتج طابق.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ ده اللي بيقع على فرع جديد: [[b=$(git branch --show-current); n=$(git rev-list --count origin/$b..HEAD); echo "unpushed: $n"]]. خليه يعمل fetch الأول، ويطبع [[no upstream]] للفرع اللي مالوش، ويستخدم [[@{u}]] بدل ما يركّب الاسم.`, done: R`على [[feature-x]] بيطبع [[unpushed: 2]] وعلى [[feature-y]] بيطبع [[no upstream]] ورقم الخروج ٠ في الاتنين، ومفيش [[fatal]] على الشاشة.` },
            { lvl: 'تطبيق', t: R`محاكاة: ٣ أشخاص على [[main]] (اعمل ٣ clones). كل واحد يعمل commit، واتنين يرفعوا. التالت قبل ما يرفع يمشي على الأوامر الأربعة في الدرس ويكتب: ورا كام، قدام كام، وأنهي commits. وبعدين يرفع من غير merge commit.`, done: R`الأرقام قبل الـ rebase [[2	1]]، وبعد [[git pull --rebase]] [[0	1]]، و [[git log --merges --oneline]] فاضي على الـ remote بعد الـ push.` },
            { lvl: 'تحدي', t: R`ابني [[sync-report.sh]] (مشروع الوحدة الصغير): fetch مرة واحدة، وسطر لكل فرع محلي بالاسم والـ upstream والرقمين، و [[no upstream]] للي مالوش. استخدم [[git for-each-ref --format='%(refname:short) %(upstream:short)' refs/heads]].`, done: R`في المعمل بيطبع سطر لـ [[main]] و [[feature-x]] (ورا ١ قدام ٢) و [[feature-y]] (no upstream)، وتشغيله مرتين ورا بعض بيطلّع نفس الناتج.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: [[git for-each-ref]] عنده [[%(upstream:track)]] و [[%(upstream:trackshort)]]. من [[git help for-each-ref]] اعرف بيطبعوا إيه، وقارن ناتجهم بالرقمين بتوع [[rev-list]] في المعمل.`, done: R`كتبت إن [[track]] بيطبع [[[ahead 2, behind 1]]] و [[trackshort]] بيطبع [[<>]] (متفرّع) أو [[>]] أو [[<]] أو [[=]]، وإنهم زي [[rev-list]] بيعتمدوا على آخر fetch.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q --bare origin.git
git clone -q origin.git laptop 2>/dev/null && cd laptop && git switch -qc feature-x
echo a > a && git add . && git commit -qm first && git push -q -u origin feature-x
git clone -q -b feature-x ../origin.git ../mona
(cd ../mona && echo m > m && git add . && git commit -qm "mona: m" && git push -q)
echo b > b && git add . && git commit -qm "ali: b"
echo c > c && git add . && git commit -qm "ali: c"
echo "before: $(git rev-list --left-right --count @{u}...HEAD)"
git fetch -q origin
echo "after: $(git rev-list --left-right --count @{u}...HEAD)"
git log --oneline --format=%s HEAD..@{u}
git switch -qc feature-y
if up=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null); then echo "up=$up"; else echo "no upstream tracking"; fi
git switch -q feature-x && git pull -q --rebase && echo "rebased: $(git rev-list --left-right --count @{u}...HEAD)"`, expect: [R`before: 0	2`, R`after: 1	2`, R`mona: m`, R`no upstream tracking`, R`rebased: 0	2`] },
          ],
        },
        {
          cmd: "أول ريبو على GitHub من فولدر",
          title: "مشروع شغّال على جهازك ومش ريبو: ارفعه أول مرة من غير node_modules ولا أسرار",
          learn: R`تحوّل فولدر لريبو، وتضبط الهوية قبل أول commit، وتفحص اللي داخل قبل ما يدخل، وتربطه بريبو فاضي على GitHub وترفع، وتعرف git متسجّل دخول ولا لأ.`,
          out: R`[[git branch -vv]] بيقول [[[origin/main]]]، و [[git ls-files]] مفيهوش [[node_modules]] ولا [[.next]] ولا [[.env.local]].`,
          desc: R`عندك مشروع (Next.js مثلًا) شغّال على جهازك ومش ريبو أصلًا، وعايز ترفعه على GitHub أول مرة. الغلطات اللي بتحصل هنا بتفضل في التاريخ: [[node_modules]] بآلاف الملفات، و [[.env.local]] فيه مفاتيح، و commit بإيميل غلط.

الترتيب:
1. [[git status]]: اتأكد إنه مش ريبو (ولا جوه ريبو أكبر).
2. [[git init -b main]]، و **الهوية قبل أول commit**.
3. [[.gitignore]] **قبل** [[git add]]، وبعد الـ add افحص الـ staged بالأرقام.
4. commit، و [[git remote add origin <url>]]، و [[git push -u origin main]].

والريبو على GitHub يتعمل **فاضي**: من غير README ولا [[.gitignore]] ولا license، وإلا أول push يترفض لأن الريبو فيه تاريخ تاني.`,
          example: R`git status
git init -b main
git config user.name "Ali Hassan"
git config user.email ali@example.com
printf 'node_modules/\n.next/\n.env*.local\n' > .gitignore
git add .
git diff --cached --name-only | grep -cE "^(node_modules|\.next)/"
git diff --cached --name-only | wc -l
git commit -m "first commit"
git remote add origin https://github.com/ali/shop.git
git push -u origin main
git branch -vv`,
          lines: [
            R`لو طلع [[fatal: not a git repository]] يبقى تمام: الفولدر مش ريبو ومش جوه ريبو. ولو طلع [[On branch ...]] يبقى انت جوه ريبو (يمكن فولدر فوقه)، ومتعملش [[init]] جوه ريبو.`,
            R`بيعمل فولدر [[.git]] فاضي، و [[-b main]] بيسمّي أول فرع [[main]] بدل الافتراضي القديم [[master]] (Git 2.28 وأحدث).`,
            R`الاسم اللي هيظهر على الـ commits في الريبو ده. من غير [[--global]] بيتكتب في [[.git/config]] بتاع الريبو ده بس.`,
            R`الإيميل لازم يكون المربوط بحسابك على GitHub، وإلا الـ commits هتظهر من غير صورتك ومنصات النشر ممكن ترفضها (درس «إيميل الـ commit غلط والنشر اتقفل»).`,
            R`[[.gitignore]] قبل أي [[add]]: [[node_modules/]] و [[.next/]] فولدرات بتتبني من جديد، و [[.env*.local]] أي ملف إعدادات محلي فيه أسرار. الـ [[/]] في الآخر معناها «فولدر».`,
            R`[[git add .]] بيضيف كل اللي في الفولدر للـ index، **ما عدا** اللي في [[.gitignore]] (وأي ملف ignore تاني على جهازك، تحت).`,
            R`فحص بالأرقام: [[--cached --name-only]] أسامي الملفات الـ staged، و [[grep -cE]] يعدّ اللي بيبدأ بـ [[node_modules/]] أو [[.next/]]. لازم [[0]].`,
            R`عدد الملفات الداخلة. لو مشروع صغير وطلع آلاف، فيه فولدر دخل غلط.`,
            R`أول commit. لو الهوية مش مظبوطة هيرفض أو هيخمّن، عشان كده ضبطناها قبل.`,
            R`[[origin]] اسم مختصر للريبو اللي على GitHub، وكل [[push]] و [[pull]] بعد كده بيستخدمه.`,
            R`بيرفع [[main]]، و [[-u]] (upstream) بيربط [[main]] المحلي بـ [[origin/main]]، فبعد كده [[git push]] و [[git pull]] من غير أسامي.`,
            R`[[-vv]] بيوري كل فرع وآخر commit والـ upstream بتاعه بين قوسين مربعين. لازم يظهر [[[origin/main]]].`,
          ],
          try: R`اعمل فولدر فيه [[src/page.js]] و [[node_modules/react/index.js]] و [[.next/cache/a]] و [[.env.local]]، وريبو bare فاضي مكان GitHub. امشي على الخطوات، وبعد [[git add .]] **قبل** الـ commit اكتب العدد اللي المفروض يطلع، وقارن.`,
          teach: R`## العَرَض

مشروع Next.js على جهازك، اتعمل من غير git، وعايز ترفعه على GitHub. وفي الشات الأصلي كمان: [[gh]] اتنصّب بس الـ terminal مش لاقيه، ومش معروف git متسجّل دخول على GitHub ولا لأ، واسم الحساب في الرابط اتكتب بحروف صغيرة.

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56). والـ «GitHub» هنا ريبو bare فاضي، والسلوك هو هو:

~~~bash
mkdir -p ~/lab/gitcases2/first && cd ~/lab/gitcases2/first
git init -q --bare -b main github/shop.git          # ده «ريبو فاضي على GitHub»
mkdir -p shop/src shop/node_modules/react shop/.next/cache shop/.claude && cd shop
echo 'export default 1' > src/page.js
echo '{"name":"shop"}' > package.json
echo 'x' > node_modules/react/index.js
echo c > .next/cache/a
echo '{}' > .claude/settings.local.json
echo 'SECRET=1' > .env.local
~~~

---

## ١. مش ريبو؟ و [[init]]

~~~text git status
fatal: not a git repository (or any of the parent directories): .git
~~~

ده المطلوب. git دوّر على [[.git]] هنا وفي كل فولدر فوقه ملقاش. ولو لقى (مثلًا عملت [[git init]] في الـ home بالغلط زمان) كان هيقول [[On branch]]، وساعتها [[git rev-parse --show-toplevel]] يقولك الريبو الأكبر فين.

~~~text git init -b main
Initialized empty Git repository in /home/ali/lab/gitcases2/first/shop/.git/
~~~

---

## ٢. الهوية قبل أول commit

لو مضبطّتهاش خالص، على ويندوز:

~~~text git commit -m "first commit"
fatal: unable to auto-detect email address (got 'ali@LAPTOP.(none)')
~~~

(وعلى جهاز اسمه فيه دومين git بيخمّن ويعمل الـ commit بإيميل غلط، شوف درس «إيميل الـ commit غلط والنشر اتقفل».) الحل يا إعداد للريبو، يا للمرة دي بس من غير ما يتحفظ:

~~~bash
git config user.name "Ali Hassan"
git config user.email ali@example.com
# أو للأمر ده بس:
git -c user.name="Ali Hassan" -c user.email=ali@example.com commit -m "first commit"
~~~

[[-c key=value]] قبل اسم الأمر بيحط إعداد للتشغيلة دي بس، ومبيكتبش في أي ملف.

---

## ٣. افحص قبل الـ commit

~~~bash
git add .
for d in node_modules .next .claude; do echo "$d: $(git diff --cached --name-only | grep -c "^$d/")"; done
git diff --cached --name-only | wc -l
~~~

~~~text الناتج (من غير .gitignore)
node_modules: 1
.next: 1
.claude: 0
5
~~~

- [[git diff --cached --name-only]]: أسامي الملفات اللي في الـ index (اللي داخلة الـ commit)، سطر لكل ملف.
- [[grep -c "^$d/"]]: عدّ السطور اللي بتبدأ بالفولدر ده. [[^]] أول السطر.
- [[wc -l]]: كام سطر = كام ملف.

[[node_modules]] و [[.next]] دخلوا (هنا ملف واحد، في مشروع حقيقي آلاف). و [[.claude]] **صفر** مع إننا عملناه! ليه؟

### ملف متجاهَل وانت مكتبتش [[.gitignore]]

~~~text git check-ignore -v .claude/settings.local.json
/home/ali/.config/git/ignore:1:.claude/	.claude/settings.local.json
~~~

[[git check-ignore -v <ملف>]] بيقول أنهي ملف ignore وأنهي سطر بيتجاهل الملف ده. هنا: ملف ignore **global** في [[~/.config/git/ignore]] (git بيقراه لوحده حتى لو مفيش [[core.excludesFile]]). يعني على جهازك الفولدر مستخبي، وعلى جهاز زميلك [[git add .]] هيضيفه. فأي حاجة المشروع محتاج يتجاهلها تتكتب في [[.gitignore]] بتاع الريبو، مش تعتمد على جهازك.

### صلّح: [[.gitignore]] و [[rm --cached]]

~~~bash
printf 'node_modules/\n.next/\n.claude/\n.env*.local\n' > .gitignore
git rm -r -q --cached node_modules .next .claude .env.local
~~~

~~~text الناتج
fatal: pathspec '.claude' did not match any files
~~~

**ولا ملف اتشال.** [[.claude]] مكنش staged أصلًا، و [[git rm]] لما اسم واحد ميلاقيهوش بيقف ومبيعملش حاجة للباقيين ([[git diff --cached --name-only | wc -l]] لسه ٥). ولو مخدتش بالك من السطر ده وعملت commit، [[node_modules]] و [[.env.local]] هيدخلوا. الحل: [[--ignore-unmatch]]:

~~~bash
git rm -r -q --cached --ignore-unmatch node_modules .next .claude .env.local
git add .gitignore
git status --short --ignored
~~~

~~~text الناتج
A  .gitignore
A  package.json
A  src/page.js
!! .claude/
!! .env.local
!! .next/
!! node_modules/
~~~

- [[--cached]]: شيله من الـ index بس، **والملف على الديسك يفضل**. من غيره [[git rm]] بيمسح الملف نفسه.
- [[-r]]: جوه الفولدرات.
- [[--ignored]] مع [[status]]: اعرض كمان الملفات المتجاهلة بعلامة [[!!]]، عشان تتأكد إنها متجاهلة فعلًا مش ناسيها.

---

## ٤. اربط وارفع

~~~bash
git commit -qm "first commit"
git remote add origin https://github.com/ali/shop.git      # في المعمل: ../github/shop.git
git branch -M main
git push -u origin main
git branch -vv
~~~

~~~text الناتج
To ../github/shop.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
* main 0b601a6 [origin/main] first commit
~~~

[[git branch -M main]] بيغيّر اسم الفرع الحالي لـ [[main]] حتى لو فيه فرع بالاسم ده ([[-M]] = force). هنا مالوش لازمة لأن [[init -b main]] عملها، بس GitHub بيكتبها في التعليمات عشان اللي عمل [[init]] من غير [[-b]].

---

## ٥. الفخ: الريبو على GitHub مش فاضي

لو علّمت «Add a README» وانت بتعمل الريبو، GitHub بيعمل commit لوحده. عملنا نفس الحالة (commit [[Initial commit]] على الـ bare):

~~~text git push -u origin main
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to '../github/shop.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. ...
~~~

~~~text git pull origin main
fatal: refusing to merge unrelated histories
~~~

تاريخين مالهمش أي commit مشترك. الحلول:

| الطريقة | اللي حصل | الحكم |
|---|---|---|
| [[git pull --rebase origin main]] | commit بتاعك اتحط فوق [[Initial commit]]، وبعدها push عدّى | ✅ الأنضف |
| [[git pull --allow-unrelated-histories origin main]] | merge commit بيجمع التاريخين | ✅ لو عايز تحتفظ بالاتنين زي ما هما |
| [[git push --force]] | الـ README بتاع GitHub بيتمسح | ⚠️ مقبول هنا بس (ريبو جديد مفيهوش غير README)، ومتتعودش عليه |
| تعمل الريبو على GitHub فاضي من الأول | مفيش مشكلة أصلًا | ✅ الوقاية |

---

## ٦. هل git متسجّل دخول على GitHub؟

اللي بيحفظ اليوزر والتوكن مش git نفسه، ده «credential helper»:

~~~text git config --show-origin --show-scope credential.helper
system	file:C:/Program Files/Git/etc/gitconfig	manager
~~~

[[manager]] = Git Credential Manager، اللي بييجي مع Git for Windows، وبيحفظ في Windows Credential Manager. وعشان تعرف فيه حاجة محفوظة لـ GitHub من غير ما تعرض الباسورد:

~~~powershell
cmdkey /list | findstr /i github
cmdkey /list:git:https://github.com
~~~

[[cmdkey /list]] بيعرض **أسامي** الـ credentials المحفوظة (الهدف واليوزر)، عمره ما بيعرض الباسورد. و [[findstr /i github]] بيفلتر السطور اللي فيها github من غير ما يفرّق بين الحروف الكبيرة والصغيرة، و [[/list:<هدف>]] بيعرض هدف واحد بس. جرّبناه على هدف مش موجود:

~~~text cmdkey /list:git:https://nothing.example.invalid
Currently stored credentials for git:https://nothing.example.invalid:

* NONE *
~~~

لو طلع [[* NONE *]] لـ GitHub، أول push هيفتح نافذة تسجيل الدخول. ⚠️ متستخدمش [[git credential fill]] عشان «تتأكد»: بيطبع التوكن نفسه على الشاشة.

---

## ٧. [[gh]] اتنصّب والـ terminal مش لاقيه

بعد [[winget install --id GitHub.cli --scope user]] (من وثائق GitHub CLI، متنصّبش في المعمل)، في نفس الـ terminal:

~~~text gh --version   (PowerShell 7.6، بعد ما شلنا فولدره من الـ PATH عشان نعيد الحالة)
The term 'gh' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

ليه؟ الـ terminal بياخد نسخة من [[PATH]] وقت ما يفتح، و [[winget]] ضاف الفولدر للـ PATH بتاع اليوزر **في الريجستري** بعد كده. الحلول بالترتيب:

~~~powershell
# الأنضف: اقفل الـ terminal وافتح واحد جديد
# أو حدّث الـ PATH في نفس الجلسة من الإعدادات المحفوظة:
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
(Get-Command gh).Source
# أو ضيف الفولدر بإيدك للجلسة دي بس:
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"
~~~

~~~text (Get-Command gh).Source
C:\Users\ali\AppData\Local\Microsoft\WinGet\Links\gh.exe
~~~

- [[[Environment]::GetEnvironmentVariable('Path','User')]]: الـ PATH المحفوظ لليوزر في الريجستري (اللي winget عدّله)، و [['Machine']] اللي لكل الجهاز. بنركّبهم ونحطهم في [[$env:Path]] (الجلسة دي).
- [[WinGet\Links]] الفولدر اللي winget بيحط فيه اختصارات البرامج اللي بتتنصّب للـ user.
- ولو مش عارف هو فين: [[Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Filter gh.exe -Recurse]]. و [[where.exe gh]] في CMD أو PowerShell بيدوّر في الـ PATH الحالي بس.

وبعدين [[gh auth login]] (من الوثائق): GitHub.com ثم HTTPS ثم Login with a web browser، و [[gh auth status]] يتأكد.

---

## ٨. اسم الحساب بحروف مختلفة في الرابط

في الشات الأصلي الرابط اتكتب [[https://github.com/acme-co/shop.git]] والحساب اسمه [[Acme-Co]]، والـ push اشتغل لأن GitHub بيقبل الاسم من غير ما يفرّق بين الحروف الكبيرة والصغيرة. (ده من سلوك GitHub، ومتجرّبش هنا لأنه مينفعش على ريبو bare محلي.) الأفضل تكتبه زي ما GitHub بيعرضه:

~~~bash
git remote set-url origin https://github.com/Acme-Co/shop.git
git remote -v
git branch -vv
~~~

[[set-url]] بيغيّر رابط [[origin]] من غير ما يلمس أي حاجة تانية، و [[-v]] يتأكد إن الـ fetch والـ push الاتنين اتغيّروا، و [[branch -vv]] إن الـ tracking لسه [[[origin/main]]].

---

## اتأكد

~~~bash
git ls-files | grep -cE "^(node_modules|\.next|\.claude)/|\.env"    # 0
git log -1 --pretty='%an <%ae>'                                      # الهوية الصح
git status -sb                                                       # ## main...origin/main
~~~

## متتكررش

- [[.gitignore]] أول ملف في أي مشروع (GitHub عنده قوالب جاهزة لكل لغة).
- الفحص بالأرقام بعد [[git add]] عادة قبل كل أول commit.
- [[--ignore-unmatch]] في أي [[git rm --cached]] جوه سكربت.

---

## الخلاصة

| الخطوة | الأمر | الفخ |
|---|---|---|
| مش ريبو؟ | [[git status]] | ريبو أكبر فوقك |
| ريبو | [[git init -b main]] | من غير [[-b]] ممكن يبقى [[master]] |
| الهوية | [[git config user.email]] أو [[git -c]] | تخمين، أو [[unable to auto-detect]] |
| تجاهل | [[.gitignore]] قبل [[add]] | global ignore بيخبّي عندك بس |
| تصليح | [[git rm -r --cached --ignore-unmatch]] | اسم مش موجود بيوقف الكل |
| رفع | [[git push -u origin main]] | ريبو GitHub مش فاضي |

> افحص اللي داخل الـ commit بالأرقام، مش بعينك على [[git status]].`,
          deep: {
            why: R`أول commit هو الأخطر لأنه بيدخّل كل حاجة مرة واحدة، وأي ملف دخل فيه بيفضل في التاريخ حتى لو مسحته بعدين (ولو كان سر، لازم يتغيّر). والدقيقة اللي بتصرفها في الفحص قبل الـ commit بتوفّر ساعات تنضيف تاريخ بعدين.`,
            how: R`[[git init]] بيعمل [[.git]] فاضي. [[git add]] بيقرا قواعد التجاهل من [[.gitignore]] في كل فولدر، ومن [[.git/info/exclude]] (للريبو ده بس ومش بيترفع)، ومن [[core.excludesFile]] أو [[~/.config/git/ignore]] (لكل ريبوهاتك على الجهاز ده). التجاهل بيأثر على الملفات اللي مش متتبّعة بس، فاللي دخل الـ index لازم [[git rm --cached]]. و [[push -u]] بيكتب [[branch.main.remote]] و [[branch.main.merge]] في [[.git/config]]. والـ credential helper بيتسأل من git وقت الـ push عن اليوزر والتوكن لـ [[github.com]].`,
            when: R`أي مشروع اتعمل من غير git (قالب، أو مشروع قديم، أو كود من زميل)، وأي مرة بتعمل ريبو جديد على GitHub، ولما تنقل مشروع لجهاز جديد وتحتاج تعرف git متسجّل ولا لأ، ولما برنامج اتنصّب والـ terminal مش شايفه.`,
            mistakes: R`[[git add .]] قبل [[.gitignore]] و commit على طول. و [[git rm --cached]] بأسامي فيها واحد مش staged فمحدش يتشال ومتاخدش بالك من الـ fatal. وتعتمد على global ignore فزميلك يرفع اللي انت مخبّيه. وتعمل README على GitHub وبعدين [[--force]] على طول. و [[git rm]] من غير [[--cached]] فتمسح الملف من الديسك. وتلزق التوكن في الرابط ([[https://user:token@github.com/...]]) فيتحفظ في [[.git/config]] بنص واضح.`
          },
          sol: R`قبل [[.gitignore]]: [[node_modules: 1]] و [[.next: 1]] والعدد ٥ (كل الملفات ما عدا اللي متجاهل global لو عندك). بعد [[.gitignore]] و [[git rm -r --cached --ignore-unmatch]]: [[git diff --cached --name-only]] فيه [[.gitignore]] و [[package.json]] و [[src/page.js]] بس (٣).

بعد الـ push: [[* main <hash> [origin/main] first commit]]. ولو الـ bare فيه commit قبلك: [[(fetch first)]] ثم [[refusing to merge unrelated histories]]، و [[git pull --rebase origin main]] بيحلها.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: [[git rm -r --cached node_modules .env.local logs]] وفولدر [[logs]] مش موجود. هيحصل إيه لـ [[node_modules]]؟ وإيه الخيار اللي يخلّيه يكمّل؟`, done: R`كتبت إن الأمر كله هيقف بـ [[fatal: pathspec 'logs' did not match any files]] ومحدش هيتشال، والحل [[--ignore-unmatch]]، وجرّبت في المعمل.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git help gitignore]] اعرف التلات أماكن اللي git بيقرا منها قواعد التجاهل غير [[.gitignore]]، وأنهي فيهم بيترفع مع الريبو.`, done: R`كتبت [[.git/info/exclude]] و [[core.excludesFile]] و [[$XDG_CONFIG_HOME/git/ignore]] (أو [[~/.config/git/ignore]])، وإن ولا واحد فيهم بيترفع، و [[.gitignore]] بس اللي بيترفع.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اعمل مشروع Node بـ [[npm init -y]] و [[npm install]] لحزمة صغيرة، وفولدر [[dist/]] فيه ملف، و [[.env]]. اعمل [[git add .]] **من غير** [[.gitignore]] وعدّ الملفات، وبعدين صلّح ووصّل لأقل عدد صح.`, done: R`كتبت الرقمين (قبل: عشرات أو أكتر حسب الحزمة، بعد: [[package.json]] و [[package-lock.json]] و [[.gitignore]] وكودك)، و [[git ls-files | grep -c node_modules]] بيطبع [[0]].` },
            { lvl: 'تطبيق', t: R`محاكاة «ريبو GitHub فيه README»: اعمل bare فيه commit [[Initial commit]]، وارفع عليه مشروع جديد. جرّب الطرق التلاتة في جدول الدرس (كل مرة على معمل جديد) وسجّل [[git log --oneline --graph]] على الـ remote بعد كل واحدة.`, done: R`عندك ٣ رسومات: rebase خط واحد فيه الاتنين، و [[--allow-unrelated-histories]] فيه merge commit بأبين، و [[--force]] فيه commit بتاعك بس والـ README اختفى.` },
            { lvl: 'تحدي', t: R`ابني [[first-push-check.sh]]: بيتشغّل بعد [[git add]] وقبل الـ commit، ويرفض (رقم خروج ١) لو فيه ملفات staged تحت [[node_modules/]] أو [[.next/]] أو [[dist/]] أو اسمها [[.env]] أو [[.env.*]] (ما عدا [[.env.example]])، أو الهوية مش مظبوطة، أو عدد الملفات أكتر من رقم تديهوله. ويطبع السبب.`, done: R`على المعمل قبل التصليح بيطبع [[node_modules: 1 file(s)]] و [[.env.local]] ويخرج ١، وبعد التصليح بيطبع [[OK 3 files]] ويخرج ٠، ولو شلت [[user.email]] بيقول [[no identity]].` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه [[.claude]] متضافش عندك ومش هيبقى كده عند زميلك، وإزاي تعرف ده بأمر واحد، وإيه الصح تعمله.`, done: R`الشرح فيه [[git check-ignore -v]] واسم ملف الـ ignore الـ global، وإن الـ global مش بيترفع، والحل سطر في [[.gitignore]] بتاع الريبو.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export HOME="$PWD" GIT_CONFIG_NOSYSTEM=1 XDG_CONFIG_HOME="$PWD/.config"
git config --global core.autocrlf false
mkdir -p .config/git && echo '.claude/' > .config/git/ignore
git init -q --bare github.git
mkdir -p shop/src shop/node_modules/react shop/.next/cache shop/.claude && cd shop
echo 'x' > src/page.js && echo '{}' > package.json && echo x > node_modules/react/index.js && echo c > .next/cache/a && echo '{}' > .claude/s.json && echo 'S=1' > .env.local
git status 2>&1 | head -1
git init -q -b main && git add .
for d in node_modules .next .claude; do echo "$d: $(git diff --cached --name-only | grep -c "^$d/")"; done
git check-ignore -v .claude/s.json | sed 's#.*/\(git/ignore\)#\1#'
printf 'node_modules/\n.next/\n.claude/\n.env*.local\n' > .gitignore
git rm -r -q --cached node_modules .next .claude .env.local 2>&1; echo "staged after failed rm: $(git diff --cached --name-only | wc -l | tr -d ' ')"
git rm -r -q --cached --ignore-unmatch node_modules .next .claude .env.local && git add .gitignore
echo "staged: $(git diff --cached --name-only | tr '\n' ' ')"
git -c user.name=ali -c user.email=ali@example.com commit -qm "first commit"
git remote add origin ../github.git && git push -q -u origin main 2>&1
git branch -vv | sed 's/ [0-9a-f]\{7\} / <h> /'`, expect: [R`fatal: not a git repository`, R`node_modules: 1`, R`.claude: 0`, R`git/ignore:1:.claude/`, R`did not match any files`, R`staged after failed rm: 5`, R`staged: .gitignore package.json src/page.js `, R`* main <h> [origin/main] first commit`] },
          ],
        },
        {
          cmd: "شغل في المشروع الغلط",
          title: "اتعمل شغل (npm install وتعديلات وملفات جديدة) في المشروع الغلط: انقله ورجّع المشروع زي ما كان",
          learn: R`تعرف بالظبط إيه اللي اتغيّر في مشروع من غير ما تدخله، وتنقل الشغل للمشروع الصح بـ patch، وترجّع المشروع الغلط لحالته من غير ما تمسح حاجة مش بتاعة الغلطة.`,
          out: R`[[git -C shop-admin status --short]] فاضي، والشغل نفسه موجود في [[shop-landing]].`,
          desc: R`عندك مشروعين جنب بعض ([[shop-admin]] و [[shop-landing]])، والشغل بتاع واحد (حزمة 3D جديدة، وتعديل في الـ navbar، وفولدر component جديد) اتعمل في التاني بالغلط. التراجع العشوائي ([[git reset --hard]] و [[git clean -fdx]]) بيمسح كمان حاجات مش بتاعة الغلطة، وبيضيّع الشغل اللي كان المفروض يتنقل.

الترتيب:
1. [[git -C <مشروع> status --short]] و [[diff --stat]]: إيه اللي اتغيّر، من غير [[cd]].
2. **انقل الشغل الأول** لو محتاجه: [[git add -N]] للملفات الجديدة، و [[git diff --binary > work.patch]]، و [[git -C <الصح> apply]].
3. الحزم: [[npm uninstall]] (أو [[git restore package.json package-lock.json]] و [[npm ci]]).
4. الملفات المتتبّعة: [[git restore <ملفات>]]. الجديدة: [[git clean -nd -- <مسارات>]] تعرض، وبعدين [[-fd]] بنفس المسارات.
5. [[git status --short]] فاضي.`,
          example: R`git -C shop-admin status --short
git -C shop-admin diff --stat
git -C shop-admin add -N components/three-scene hero.glb
git -C shop-admin diff --binary -- components hero.glb > three-work.patch
git -C shop-landing apply --check ../three-work.patch
git -C shop-landing apply ../three-work.patch
git -C shop-admin reset -q -- components/three-scene hero.glb
npm --prefix shop-admin uninstall three
git -C shop-admin restore components/navbar.tsx
git -C shop-admin clean -nd -- components/three-scene hero.glb
git -C shop-admin clean -fd -- components/three-scene hero.glb
git -C shop-admin status --short`,
          lines: [
            R`[[-C <فولدر>]] بيخلّي git يشتغل كأنك واقف جوه الفولدر ده، من غير [[cd]]. مفيد لما تبقى بتقارن مشروعين أو في سكربت. [[--short]] حرفين لكل ملف: [[ M]] متعدّل، و [[??]] جديد مش متتبّع.`,
            R`كام سطر اتغيّر في كل ملف متتبّع. هنا [[package.json]] و [[package-lock.json]] (من [[npm install]]) و [[navbar.tsx]]. والملفات الجديدة **مش هنا**: [[diff]] بيقارن المتتبّع بس.`,
            R`[[-N]] (intent-to-add) بيقول لـ git «الملفات دي هتدخل» من غير ما يحط محتواها في الـ index، فتظهر في [[git diff]] كملفات جديدة. من غيره الـ patch هيبقى ناقص كل الملفات الجديدة.`,
            R`بيكتب كل التعديلات في ملف patch. [[--binary]] عشان الملفات اللي مش نص (زي [[hero.glb]]) تتكتب صح بدل [[Binary files differ]]. و [[-- components hero.glb]] حدّد المسارات، فـ [[package.json]] مش داخل (الحزمة هتتنصّب في الصح بـ npm مش بـ patch).`,
            R`[[--check]] بيجرّب الـ patch من غير ما يطبّقه: لو ملف في المشروع الصح مختلف ومش هيركب، بيقول دلوقتي قبل ما يلمس حاجة.`,
            R`بيطبّق الـ patch على ملفات [[shop-landing]]. الملف اللي في المسار [[../three-work.patch]] نسبةً للفولدر اللي [[-C]] دخله.`,
            R`بيشيل علامة [[-N]] من الـ index في [[shop-admin]]، فالملفات ترجع [[??]] عادي، عشان [[git clean]] يقدر يمسحها.`,
            R`[[--prefix shop-admin]] زي [[-C]] بتاعة git: شغّل npm في الفولدر ده. [[uninstall]] بيشيل الحزمة من [[node_modules]] ومن [[package.json]] و [[package-lock.json]].`,
            R`[[restore]] بيرجّع الملف المتتبّع لنسخة الـ index (يعني آخر commit لو مفيش حاجة staged). التعديل اللي عليه بيتمسح، وعشان كده نقلناه الأول.`,
            R`[[clean -n]] (dry run) بيعرض اللي **كان** هيتمسح، و [[-d]] فولدرات كمان. و [[-- <مسارات>]] بيحصره في ملفات الغلطة بس.`,
            R`نفس الأمر بـ [[-f]] (force) بدل [[-n]]: بيمسح فعلًا. نفس المسارات بالظبط اللي اتعرضت.`,
            R`لازم يطلع فاضي: المشروع رجع زي آخر commit.`,
          ],
          try: R`ابني المعمل اللي في الشرح، وقبل أي تراجع اكتب قايمة بكل حاجة اتغيّرت في [[shop-admin]] من [[status]] و [[diff --stat]]. وبعدين انقل الشغل لـ [[shop-landing]] وتأكد إن [[hero.glb]] وصل، وبعدين رجّع [[shop-admin]].`,
          teach: R`## العَرَض

كنت فاتح terminal في [[shop-admin]] وانت فاكر إنك في [[shop-landing]]، وعملت:

~~~bash
npm install three @react-three/fiber @react-three/drei @types/three
# وعدّلت components/navbar.tsx و messages/ar.json، وعملت components/three-scene/ وحطيت hero.glb
~~~

ودلوقتي اكتشفت. عايز حاجتين: الشغل يروح لـ [[shop-landing]]، و [[shop-admin]] يرجع زي ما كان بالظبط.

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56، Node 24، npm 11). عشان المعمل ميحتاجش نت، الحزمة [[three]] هنا فولدر محلي بـ [[package.json]] بس، و [[npm install <فولدر>]] بيعامله زي أي حزمة:

~~~bash
mkdir -p ~/lab/gitcases2/wrong && cd ~/lab/gitcases2/wrong
mkdir -p pkgs/three && echo '{"name":"three","version":"1.0.0"}' > pkgs/three/package.json
for p in shop-admin shop-landing; do
  mkdir -p $p/components $p/messages && cd $p
  printf '{\n  "name": "%s",\n  "version": "1.0.0"\n}\n' $p > package.json
  echo 'export const Navbar = 1' > components/navbar.tsx
  echo '{"hi":"اهلا"}' > messages/ar.json
  printf 'node_modules/\n' > .gitignore
  npm install --silent && git init -q -b main && git add . && git commit -qm v1
  cd ..
done
# الغلطة: كل ده في shop-admin
cd shop-admin
npm install ../pkgs/three
echo 'export const Navbar = 2 // 3d hero' > components/navbar.tsx
echo '{"hi":"اهلا","hero":"3D"}' > messages/ar.json
mkdir -p components/three-scene && echo 'scene' > components/three-scene/Scene.tsx
printf 'GLB\0bin' > hero.glb
cd ..
~~~

---

## ١. إيه اللي اتغيّر بالظبط؟ (من غير [[cd]])

~~~text git -C shop-admin status --short
 M components/navbar.tsx
 M messages/ar.json
 M package-lock.json
 M package.json
?? components/three-scene/
?? hero.glb
~~~

~~~text git -C shop-admin diff --stat
 components/navbar.tsx |  2 +-
 messages/ar.json      |  2 +-
 package-lock.json     | 10 ++++++++++
 package.json          |  5 ++++-
 4 files changed, 16 insertions(+), 3 deletions(-)
~~~

قسّمهم لتلات أنواع، لأن كل نوع ليه طريقة رجوع:

| النوع | الملفات | الرجوع |
|---|---|---|
| ملفات الحزم | [[package.json]] و [[package-lock.json]] و [[node_modules/]] (متجاهل، مش ظاهر) | [[npm uninstall]] |
| ملفات متتبّعة اتعدّلت | [[navbar.tsx]] و [[ar.json]] | [[git restore]] |
| ملفات جديدة | [[components/three-scene/]] و [[hero.glb]] | [[git clean]] بمسارات |

[[git -C <فولدر>]] بيشتغل من أي مكان، وده بيخلّيك تقارن المشروعين من غير ما تتوه انت واقف فين (وهي نفسها سبب الغلطة الأصلية).

---

## ٢. انقل الشغل الأول (قبل ما تمسح أي حاجة)

### الفخ: [[git diff]] مبيشوفش الملفات الجديدة

~~~text git -C shop-admin diff -- components > three-work.patch && wc -l three-work.patch
7 three-work.patch
~~~

٧ سطور: [[navbar.tsx]] بس. فولدر [[three-scene]] و [[hero.glb]] مش موجودين، لأنهم untracked. لو طبّقت الـ patch ده ومسحت الأصل، الـ component ضاع.

### الحل: [[add -N]] و [[--binary]]

~~~bash
git -C shop-admin add -N components/three-scene hero.glb
git -C shop-admin diff --binary -- components messages hero.glb > three-work.patch
git -C shop-landing apply --check ../three-work.patch && git -C shop-landing apply ../three-work.patch
git -C shop-landing status --short
~~~

~~~text الناتج
 M components/navbar.tsx
 M messages/ar.json
?? components/three-scene/
?? hero.glb
~~~

- [[add -N]] (intent-to-add): بيسجّل الملف في الـ index **فاضي**، فـ [[git diff]] بيعرضه كملف جديد بكل محتواه.
- [[--binary]]: من غيره [[hero.glb]] كان هيتكتب في الـ patch كسطر [[Binary files ... differ]] ومش هيتطبّق.
- [[apply --check]] الأول: لو [[navbar.tsx]] في [[shop-landing]] مختلف عن اللي الـ patch متوقعه، بيرفض **قبل** ما يغيّر حاجة.

والحزمة نفسها متتنقلش بـ patch: في [[shop-landing]] بتعمل [[npm install three @react-three/fiber ...]] عادي، فـ npm يكتب [[package.json]] والـ lock صح للمشروع ده.

وبعد النقل، شيل علامة [[-N]] من [[shop-admin]] عشان الملفات ترجع untracked:

~~~bash
git -C shop-admin reset -q -- components/three-scene hero.glb
~~~

---

## ٣. رجّع الحزم

~~~bash
npm --prefix shop-admin uninstall three
git -C shop-admin status --short
~~~

~~~text الناتج
 M components/navbar.tsx
 M messages/ar.json
?? components/three-scene/
?? hero.glb
~~~

[[package.json]] و [[package-lock.json]] اختفوا من القايمة: رجعوا **بالبايت** زي آخر commit. اتأكد بـ [[git -C shop-admin diff package.json package-lock.json]] (فاضي).

والبديل لو [[uninstall]] ساب فرق (مثلًا مشروع كان [[package.json]] فيه ترتيب أو مسافات مختلفة):

~~~bash
git -C shop-admin restore package.json package-lock.json
npm --prefix shop-admin ci
~~~

[[npm ci]] بيمسح [[node_modules]] ويبنيه من الـ lock بالظبط، فـ [[node_modules]] (اللي git مبيشوفهوش لأنه متجاهل) يرجع هو كمان مطابق.

---

## ٤. الملفات المتتبّعة والجديدة

~~~bash
git -C shop-admin restore components/navbar.tsx messages/ar.json
git -C shop-admin clean -n
git -C shop-admin clean -nd -- components/three-scene hero.glb
~~~

~~~text git clean -n   (من غير -d)
Would remove hero.glb
~~~

~~~text git clean -nd -- components/three-scene hero.glb
Would remove components/three-scene/
Would remove hero.glb
~~~

- [[git restore <ملف>]] (الأحدث) أو [[git checkout -- <ملف>]] (القديم، نفس النتيجة): يرجّع الملف المتتبّع لآخر commit.
- [[clean -n]] من غير [[-d]] **مبيعرضش الفولدرات**. لو اعتمدت عليه هتفتكر إن [[three-scene/]] مش هيتمسح.
- [[-- <مسارات>]]: احصر المسح في ملفات الغلطة. [[git clean -fd]] من غير مسارات بيمسح **أي** ملف untracked في المشروع، زي ملاحظاتك أو [[.env.local]] لو مكنش متجاهل.

~~~bash
git -C shop-admin clean -fd -- components/three-scene hero.glb
git -C shop-admin status --short
~~~

~~~text الناتج
Removing components/three-scene/
Removing hero.glb
~~~

و [[status]] بعدها فاضي.

---

## ٥. الطرق اللي اترفضت

| الطريقة | اللي بيحصل | الحكم |
|---|---|---|
| [[git reset --hard && git clean -fdx]] | كل التعديلات بتتمسح من غير ما تتنقل، و [[-x]] بيمسح كمان المتجاهل: [[node_modules]] كله و [[.env.local]] | ❌ مسحت الشغل وأسرارك المحلية |
| [[git stash -u]] وبعدين [[stash pop]] في المشروع التاني | الـ stash تبع الريبو، مش بيتنقل لريبو تاني | ❌ مبيشتغلش بين ريبوهين |
| تنسخ الملفات بإيدك | بيشتغل، بس [[navbar.tsx]] في [[shop-landing]] ممكن يكون مختلف فتكتب فوقه | ⚠️ [[apply --check]] بيحميك من ده |
| [[npm uninstall]] من غير ما تبص على [[git status]] بعدها | لو الـ lock مرجعش زي ما كان مش هتعرف | ⚠️ لازم تتأكد بـ [[git diff]] |
| patch بـ [[add -N]] و [[--binary]]، و [[restore]] و [[clean]] بمسارات | الشغل اتنقل كامل، والمشروع رجع، ومفيش حاجة تانية اتلمست | ✅ |

---

## اتأكد

~~~bash
git -C shop-admin status --short                 # فاضي
git -C shop-admin diff --stat HEAD               # فاضي
ls shop-admin/node_modules                       # من غير three
git -C shop-landing status --short               # الشغل هنا
~~~

## متتكررش

- خلّي الـ prompt بتاع الـ terminal يعرض اسم الفولدر والفرع (Git Bash بيعمل ده لوحده، وفي PowerShell أداة زي posh-git أو oh-my-posh)، وافتح كل مشروع في نافذة أو تاب باسمه.
- قبل [[npm install]] لحزمة جديدة: [[pwd]] و [[git -C . remote -v]]، أو [[npm pkg get name]] يطبع اسم المشروع اللي انت فيه.
- اعمل commit صغير قبل أي شغل كبير، فالرجوع يبقى [[git restore]] و [[clean]] على حاجة صغيرة.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| تشوف مشروع من بره | [[git -C <فولدر> status --short]] |
| الجديد يدخل الـ patch | [[git add -N <ملفات>]] |
| patch فيه binary | [[git diff --binary > x.patch]] |
| تجرّب قبل التطبيق | [[git apply --check]] |
| ترجّع حزمة | [[npm uninstall]] أو [[restore]] الـ lock و [[npm ci]] |
| تمسح الجديد بس | [[git clean -nd -- <مسارات>]] ثم [[-fd]] |

> انقل قبل ما تمسح، واحصر كل مسح في مسارات الغلطة.`,
          deep: {
            why: R`الغلطة نفسها بسيطة، والخسارة بتيجي من التراجع: أمر واحد عام ([[reset --hard]] أو [[clean -fdx]]) بيمسح الشغل اللي كان المفروض يتنقل، ومعاه ملفات محلية مالهاش علاقة. الترتيب «اعرف، انقل، رجّع بمسارات، اتأكد» بيخلّي كل خطوة قابلة للرجوع.`,
            how: R`git بيقسم الملفات لمتتبّعة (في الـ index) و untracked و ignored. [[diff]] بيقارن المتتبّعة بس، و [[add -N]] بيحط entry فاضي في الـ index فالملف يبقى «متتبّع ومتغيّر بالكامل». [[apply]] بيقرا الـ patch ويطبّقه على ملفات الفولدر، و [[--check]] بيعمل نفس الحسابات من غير كتابة. و [[clean]] بيمسح الـ untracked بس (ومع [[-x]] المتجاهل كمان)، و [[-d]] لازم عشان الفولدرات. و npm بيكتب [[package.json]] والـ lock مع كل [[install]] و [[uninstall]]، و [[npm ci]] بيبني [[node_modules]] من الـ lock بس.`,
            when: R`أي مرة شغل اتعمل في فولدر غلط: حزم اتنصّبت، أو كود اتلزق، أو generator (زي [[npx create-...]] أو [[prisma generate]]) اشتغل في مكان غلط. ونفس الـ patch بـ [[add -N]] و [[--binary]] بتنقل بيه شغل بين ريبوهين مختلفين أو لزميل من غير ما ترفع.`,
            mistakes: R`[[git clean -fd]] من غير مسارات أو من غير [[-n]] الأول. و [[git clean -n]] من غير [[-d]] فتفتكر الفولدرات مش هتتمسح. و patch من [[git diff]] عادي فالملفات الجديدة تضيع. و patch من غير [[--binary]] للصور والموديلات. وتنقل [[package.json]] بالـ patch بدل [[npm install]] في المشروع الصح. وتنسى [[git reset]] بعد [[add -N]] فـ [[clean]] ميمسحش الملفات لأنها بقت «متتبّعة».`
          },
          sol: R`القايمة: [[navbar.tsx]] و [[ar.json]] متعدّلين، و [[package.json]] و [[package-lock.json]] من npm، و [[three-scene/]] و [[hero.glb]] جداد، و [[node_modules/three]] (متجاهل، مش ظاهر في git).

بعد النقل: [[git -C shop-landing status --short]] فيه [[ M components/navbar.tsx]] و [[ M messages/ar.json]] و [[?? components/three-scene/]] و [[?? hero.glb]]، و [[cmp]] بين [[hero.glb]] في المشروعين مبيطبعش حاجة.

بعد الرجوع: [[git -C shop-admin status --short]] فاضي، و [[ls shop-admin/node_modules]] مفيهوش [[three]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: في المعمل قبل أي حاجة، [[git -C shop-admin clean -n]] هيطبع إيه؟ و [[git -C shop-admin clean -nd]]؟ و [[git -C shop-admin clean -ndx]]؟ وبعدين شغّل التلاتة.`, done: R`توقعت: الأول [[hero.glb]] بس، والتاني [[three-scene/]] و [[hero.glb]]، والتالت كمان [[node_modules/]]، والناتج طابق.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git help add]] اعرف [[--intent-to-add]] بيعمل إيه، وليه [[git diff --cached]] بعده مبيوريش محتوى الملف.`, done: R`كتبت إن [[-N]] بيحط entry فاضي في الـ index، فالفرق بين الـ index والملف (اللي [[git diff]] بيعرضه) هو الملف كله، والفرق بين HEAD والـ index (اللي [[--cached]] بيعرضه) ملف فاضي جديد.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ ده اللي بينقل الشغل: [[git -C shop-admin diff > w.patch && git -C shop-landing apply ../w.patch && git -C shop-admin reset --hard && git -C shop-admin clean -fdx]]. فيه ٤ مشاكل. اكتب نسخة آمنة وجرّبها على معمل جديد.`, done: R`نسختك فيها [[add -N]] و [[--binary]] و [[apply --check]] قبل التطبيق، و [[restore]] و [[clean -fd]] بمسارات بدل [[reset --hard]] و [[-fdx]]، وفي الآخر [[hero.glb]] موجود في [[shop-landing]] و [[shop-admin/node_modules]] لسه موجود.` },
            { lvl: 'تطبيق', t: R`قارن: رجّع الحزمة بطريقتين على معملين: (أ) [[npm uninstall three]]، (ب) [[git restore package.json package-lock.json]] و [[npm ci]]. في الاتنين سجّل [[git diff --stat]] و [[ls node_modules]] وعدد الثواني بـ [[time]].`, done: R`في الاتنين [[git diff]] فاضي و [[three]] مش في [[node_modules]]، وعندك رقمين بالثواني، وكتبت إمتى تختار (ب): لما [[uninstall]] يسيب فرق في الـ lock.` },
            { lvl: 'تحدي', t: R`ابني [[move-work.sh <from> <to> <path>...]]: بيعمل [[add -N]] للمسارات الجديدة، و patch بـ [[--binary]] في ملف مؤقت، و [[apply --check]] ولو فشل يقف من غير ما يلمس حاجة، وبعدين [[apply]]، وبعدين يرجّع المسارات في [[<from>]]، ويطبع [[git status --short]] للاتنين.`, done: R`على المعمل بينقل [[components]] و [[messages]] و [[hero.glb]]، و [[<from>]] يبقى نضيف. ولو عدّلت [[navbar.tsx]] في [[<to>]] قبل التشغيل، بيقف بـ [[patch does not apply]] والمشروعين زي ما هما.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه [[git clean -fdx]] أخطر أمر في الدرس ده، مع مثال لملف بيضيع ومش بيرجع بأي أمر git.`, done: R`الشرح فيه إن [[-x]] بيمسح المتجاهل، والمتجاهل عمره ما دخل git فمفيش [[reflog]] ولا commit يرجّعه، ومثال [[.env.local]] أو قاعدة بيانات SQLite محلية.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com npm_config_cache="$PWD/.npmcache" npm_config_audit=false npm_config_fund=false
mkdir -p pkgs/three && echo '{"name":"three","version":"1.0.0"}' > pkgs/three/package.json
for p in shop-admin shop-landing; do mkdir -p $p/components && (cd $p && printf '{\n  "name": "%s",\n  "version": "1.0.0"\n}\n' $p > package.json && echo 'export const Navbar = 1' > components/navbar.tsx && printf 'node_modules/\n' > .gitignore && npm install --silent >/dev/null 2>&1 && git init -q && git add . && git commit -qm v1); done
(cd shop-admin && npm install ../pkgs/three --silent >/dev/null 2>&1 && echo 'export const Navbar = 2' > components/navbar.tsx && mkdir -p components/three-scene && echo scene > components/three-scene/Scene.tsx && printf 'GLB\0bin' > hero.glb)
git -C shop-admin status --short
git -C shop-admin diff -- components | grep -c three-scene
git -C shop-admin add -N components/three-scene hero.glb
git -C shop-admin diff --binary -- components hero.glb > w.patch
git -C shop-landing apply --check ../w.patch && git -C shop-landing apply ../w.patch && echo APPLIED
git -C shop-admin reset -q -- components/three-scene hero.glb
npm --prefix shop-admin uninstall three --silent >/dev/null 2>&1
git -C shop-admin restore components/navbar.tsx
git -C shop-admin clean -n
git -C shop-admin clean -fd -q -- components/three-scene hero.glb
echo "admin: [$(git -C shop-admin status --short)]"
cmp hero.glb shop-landing/hero.glb 2>/dev/null; cmp <(printf 'GLB\0bin') shop-landing/hero.glb && echo GLB-OK`, expect: [R` M package.json`, R`?? hero.glb`, R`APPLIED`, R`Would remove hero.glb`, R`admin: []`, R`GLB-OK`] },
          ],
        },
        {
          cmd: "commit لملفاتك بس",
          title: "الشجرة فيها حاجات مش بتاعتك (.env وملاحظات وسكرين شوت): اعمل commit لملفاتك بس",
          learn: R`تشوف كل ملف جديد حتى جوه الفولدرات، وتختار اللي يدخل الـ commit بالاسم أو باستبعاد، وتكتب رسالة متعددة السطور من غير escape، وتتأكد قبل وبعد.`,
          out: R`[[git show --stat HEAD]] فيه ملفاتك الـ ٨ بس، و [[git status --short]] لسه فيه [[.env]] و [[notes.md]] و [[shot.png]] زي ما هما.`,
          desc: R`خلّصت شغل في ٨ ملفات، والشجرة فيها كمان: [[.env]] متتبّع بس انت غيّرت فيه بورت للتجربة، و [[notes.md]] ملاحظاتك، و [[shot.png]] سكرين شوت في الجذر. [[git add -A]] أو [[git add .]] هياخدهم كلهم.

الترتيب:
1. [[git status --short -uall]]: كل ملف جديد بالاسم، مش الفولدر بس.
2. اختار: بالاسم ([[git add src/routes/orders.js ...]])، أو بفولدر ([[git add -- src]])، أو كل حاجة ما عدا ([[git add -A -- . ':!shot.png' ':!notes.md' ':!.env']]).
3. [[git diff --cached --stat]]: العدد والأسامي قبل الـ commit.
4. [[git commit -F - <<'EOF']]: رسالة متعددة السطور.
5. [[git status --short]] بعدها: الحاجات اللي مش بتاعتك لسه موجودة ومتلمستش.`,
          example: R`git status --short
git status --short -uall
git add -A -- . ':!shot.png' ':!notes.md' ':!.env'
git diff --cached --stat
git commit -F - <<'EOF'
orders and users routes, db + cache helpers

- routes: orders.js, users.js
- lib: db.js, cache.js, payments/ (stripe, fawry)
EOF
git status --short`,
          lines: [
            R`الملخص العادي: الملفات المتتبّعة المتعدّلة ([[ M]])، والجديدة ([[??]]). لو فولدر كله جديد بيظهر كسطر واحد [[?? src/lib/]] من غير ما يقول جواه إيه.`,
            R`[[-uall]] (untracked=all): اعرض كل ملف جديد بالاسم حتى لو جوه فولدر جديد. كده تعرف بالظبط إيه اللي هيدخل لو عملت add للفولدر.`,
            R`[[-A]] كل التغييرات (جديد ومتعدّل وممسوح)، و [[--]] بيفصل الخيارات عن المسارات، و [[.]] الفولدر كله، و [[':!shot.png']] معناها «ما عدا ده» (pathspec magic اسمه exclude). الـ single quotes عشان الـ shell ميلمسش [[!]].`,
            R`أسامي الملفات اللي داخلة وعدد السطور، من غير المحتوى. اعدّهم: لازم ٨.`,
            R`[[-F -]] «خد الرسالة من ملف، والملف هو الـ stdin». و [[<<'EOF']] (heredoc) بيبعت السطور اللي بعده لحد [[EOF]] على الـ stdin. الـ quotes حوالين [[EOF]] معناها «متفكّش [[$]] ولا backtick جوه الرسالة».`,
            R`أول سطر في الرسالة هو العنوان (اللي بيظهر في [[git log --oneline]])، وسطر فاضي بعده إجباري عشان git يعرف إن اللي بعده تفاصيل.`,
            R`سطر من تفاصيل الرسالة. أي حاجة بين العنوان و [[EOF]] بتتكتب زي ما هي، من غير ما تهرب أي حرف.`,
            R`سطر تاني من التفاصيل.`,
            R`[[EOF]] لوحده في أول السطر بيقفل الـ heredoc. لو قبله مسافة أو بعده حاجة، الـ shell مش هيعتبره قفلة.`,
            R`اللي فاضل: [[ M .env]] و [[?? notes.md]] و [[?? shot.png]]. اتأكد إنهم هما بس.`,
          ],
          try: R`ابني المعمل اللي في الشرح، وقبل أي add اعدّ الملفات اللي بتاعتك من [[status -uall]] (لازم ٨). جرّب الطرق التلاتة (بالاسم، وبفولدر، وبالاستبعاد) كل مرة بـ [[git reset]] بينهم، وقارن [[git diff --cached --stat]] في كل مرة.`,
          teach: R`## العَرَض

خلّصت ميزة: ٤ ملفات جديدة في [[src/routes]] و [[src/lib]]، وفولدر [[src/lib/payments]] بملفين، وعدّلت [[src/app.js]] و [[src/routes/index.js]]. يعني ٨ ملفات. وفي نفس الوقت الشجرة فيها حاجات مش بتاعة الـ commit ده:

- [[.env]] متتبّع (للأسف، في المشروع ده)، وانت غيّرت فيه [[PORT=9999]] للتجربة.
- [[notes.md]] ملاحظاتك.
- [[shot.png]] سكرين شوت.

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56)، والأوامر نفسها على [[ubuntu:24.04]]:

~~~bash
mkdir -p ~/lab/gitcases2/mine && cd ~/lab/gitcases2/mine
git init -q -b main shop-api && cd shop-api
mkdir -p src/routes src/lib && echo 'PORT=3000' > .env
echo 'app' > src/app.js && echo 'r' > src/routes/index.js
git add . && git commit -qm "start"
# شغلك: ٨ ملفات
for f in src/routes/orders.js src/routes/users.js src/lib/db.js src/lib/cache.js; do echo "new $f" > $f; done
mkdir -p src/lib/payments && echo p > src/lib/payments/stripe.js && echo q > src/lib/payments/fawry.js
echo 'app v2' > src/app.js && echo 'r2' > src/routes/index.js
# مش بتاعك
echo 'PORT=9999' > .env && echo 'my notes' > notes.md && printf 'PNG' > shot.png
~~~

---

## ١. شوف كل حاجة: [[-uall]]

~~~text git status --short
 M .env
 M src/app.js
 M src/routes/index.js
?? notes.md
?? shot.png
?? src/lib/
?? src/routes/orders.js
?? src/routes/users.js
~~~

[[?? src/lib/]] سطر واحد لفولدر فيه ٤ ملفات (منهم فولدر [[payments]]). مش هتعرف جواه إيه.

~~~text git status --short -uall
 M .env
 M src/app.js
 M src/routes/index.js
?? notes.md
?? shot.png
?? src/lib/cache.js
?? src/lib/db.js
?? src/lib/payments/fawry.js
?? src/lib/payments/stripe.js
?? src/routes/orders.js
?? src/routes/users.js
~~~

[[-u]] (أو [[--untracked-files]]) ليه ٣ قيم: [[no]] متعرضش الجديد خالص، و [[normal]] (الافتراضي) فولدر جديد سطر واحد، و [[all]] كل ملف بالاسم. دلوقتي تقدر تعدّ: ١١ سطر، ٨ بتوعك و ٣ لأ.

---

## ٢. الفخ: [[git add -A]]

~~~bash
git add -A
git diff --cached --stat | tail -1
git diff --cached --name-only | grep -E '^\.env|notes|shot'
~~~

~~~text الناتج
 11 files changed, 11 insertions(+), 3 deletions(-)
.env
notes.md
shot.png
~~~

[[.env]] بالبورت بتاع التجربة، وملاحظاتك، والسكرين شوت، كلهم داخلين. ([[git reset]] من غير حاجة بيشيلهم كلهم من الـ index ومبيلمسش الملفات.)

---

## ٣. اختار: تلات طرق

### بالاسم

~~~bash
git add src/app.js src/routes/index.js src/routes/orders.js src/routes/users.js src/lib/db.js src/lib/cache.js src/lib/payments/stripe.js src/lib/payments/fawry.js
~~~

الأوضح، والأطول. ينفع لما الملفات قليلة.

### بفولدر

~~~bash
git add -- src
~~~

هنا كل شغلك جوه [[src]] واللي مش بتاعك بره، فده أقصر حل. الـ [[--]] بيقول «اللي بعدي مسارات»، فلو اسم فولدر بيبدأ بـ [[-]] ميتفهمش كخيار.

### كل حاجة ما عدا: pathspec exclude

~~~bash
git add -A -- . ':!shot.png' ':!notes.md' ':!.env'
git diff --cached --stat
~~~

~~~text الناتج
 src/app.js                 | 2 +-
 src/lib/cache.js           | 1 +
 src/lib/db.js              | 1 +
 src/lib/payments/fawry.js  | 1 +
 src/lib/payments/stripe.js | 1 +
 src/routes/index.js        | 2 +-
 src/routes/orders.js       | 1 +
 src/routes/users.js        | 1 +
 8 files changed, 8 insertions(+), 2 deletions(-)
~~~

| الحتة | معناها |
|---|---|
| [[.]] | ابدأ بكل حاجة في الفولدر الحالي |
| [[':!shot.png']] | [[:!]] أول الـ pathspec معناها exclude: شيل ده من اللي فوق. الشكل الطويل [[':(exclude)shot.png']] نفس الحاجة وأوضح في سكربت |
| [[':!*.png']] | ينفع wildcard: استبعد كل الصور |
| الـ single quotes | عشان الـ shell ميحاولش يفسّر [[!]] أو [[*]] قبل ما يوصلوا لـ git |

الطريقة دي الأحسن لما اللي **مش** بتاعك قليل واللي بتاعك كتير ومتفرّق.

> ونفس الـ pathspec بيشتغل مع أوامر تانية: [[git status --short -- . ':!shot.png']] و [[git diff -- . ':(exclude)*.lock']].

---

## ٤. الرسالة: [[git commit -F -]] و heredoc

~~~bash
git commit -q -F - <<'EOF'
orders and users routes, db + cache helpers

- routes: orders.js, users.js
- lib: db.js, cache.js, payments/ (stripe, fawry)
- app.js: mount the new routes
EOF
git log -1 --format=%B
~~~

~~~text الناتج
orders and users routes, db + cache helpers

- routes: orders.js, users.js
- lib: db.js, cache.js, payments/ (stripe, fawry)
- app.js: mount the new routes
~~~

- [[-m "..."]] ينفع لسطر واحد، ولأكتر لازم [[-m]] لكل فقرة أو escape. [[-F <ملف>]] بياخد الرسالة من ملف، و [[-F -]] من الـ stdin.
- [[<<'EOF']]: كل السطور لحد [[EOF]] بتتبعت للأمر. ومع الـ quotes حوالين [[EOF]] الـ shell **مبيفسّرش** [[$HOME]] ولا [[$(...)]] جوه الرسالة، فرسالة فيها [[$PORT]] بتتكتب زي ما هي.
- [[%B]] في [[--format]]: الرسالة كاملة (العنوان والتفاصيل).

### على PowerShell

~~~powershell
$msg = @'
add x helper

- src/x.js
'@
$msg | git commit -q -F -
~~~

[[@' ... '@]] (here-string بـ single quotes) نفس فكرة [[<<'EOF']]: سطور كتير، ومن غير ما PowerShell يفك [[$]] جواها. و [['@]] لازم في أول السطر. اتجرّب على 7.6 واشتغل.

وعلى **PowerShell 5.1** بالعربي جرّبنا نفس الـ pipe برسالة [[إصلاح الطلبات]]:

~~~text git log -1 --format=%s   (بعد pipe من PowerShell 5.1)
????? ???????
~~~

5.1 بيبعت للبرامج التانية بـ [[$OutputEncoding]] الافتراضي (ASCII)، فكل حرف عربي بقى [[?]]. وكمان [[Set-Content -Encoding utf8]] في 5.1 بيكتب BOM في أول الملف، و [[git commit -F]] بيحطه في أول الرسالة. الحل اللي اشتغل على الاتنين: ملف من غير BOM:

~~~powershell
[IO.File]::WriteAllText("$env:TEMP\msg.txt", "إصلاح الطلبات$__btn$__btn- orders.js$__btn")
git commit -F "$env:TEMP\msg.txt"
~~~

[[[IO.File]::WriteAllText]] (من .NET) بيكتب UTF-8 من غير BOM افتراضيًا، و [[$__btn]] سطر جديد في PowerShell.

---

## ٥. اتأكد بعد الـ commit

~~~text git show --stat --format='%h %s' HEAD | tail -3 ; git status --short
 src/routes/orders.js       | 1 +
 src/routes/users.js        | 1 +
 8 files changed, 8 insertions(+), 2 deletions(-)
 M .env
?? notes.md
?? shot.png
~~~

الـ commit فيه ٨، واللي مش بتاعك لسه زي ما هو: [[.env]] لسه فيه [[PORT=9999]] على جهازك (مش في الـ commit)، والملفين التانيين untracked.

---

## مشروع على ديسك تاني: [[safe.directory]]

في الشات الأصلي المشروع كان على ديسك تاني (فولدر صاحبه يوزر تاني)، و git رفض يشتغل بـ [[detected dubious ownership]]. الحل للأمر ده بس من غير ما تغيّر إعداداتك: [[git -c safe.directory='D:/work/shop-api' status]]، والشرح الكامل في درس «safe.directory».

---

## الطرق اللي اترفضت

| الطريقة | اللي حصل | الحكم |
|---|---|---|
| [[git add -A]] أو [[git add .]] وخلاص | ١١ ملف، ومنهم [[.env]] بالبورت الغلط | ❌ |
| [[git commit -a]] | بياخد كل المتتبّع المتعدّل: [[.env]] داخل، والملفات الجديدة الـ ٦ **مش** داخلة | ❌ أسوأ: ناقص وزيادة |
| [[mv notes.md shot.png /tmp]] قبل الـ add وترجّعهم | بيشتغل، بس [[.env]] متتبّع فمش هينفع تنقله، وسهل تنسى ترجّعهم | ⚠️ |
| تضيفهم لـ [[.gitignore]] | [[notes.md]] و [[shot.png]] ينفع لو هيتكرروا، بس [[.env]] متتبّع فالـ ignore مبيأثرش عليه | ⚠️ لملفات بتتكرر بس |
| [[git add -p]] | بيسألك على كل جزء متغيّر في الملفات المتتبّعة (y/n)، ممتاز لو ملف واحد فيه تعديلين وعايز واحد بس. مبيشوفش الملفات الجديدة | ✅ لحالة تانية |
| بالاسم أو بالفولدر أو بالاستبعاد، وبعدين [[diff --cached --stat]] | ٨ بالظبط | ✅ |

---

## الخلاصة

| عايز | الأمر |
|---|---|
| كل ملف جديد بالاسم | [[git status --short -uall]] |
| كله ما عدا | [[git add -A -- . ':!ملف']] |
| شوف قبل الـ commit | [[git diff --cached --stat]] |
| رسالة متعددة السطور | [[git commit -F - <<'EOF']] أو [[@'...'@ | git commit -F -]] |
| عربي من PowerShell 5.1 | ملف بـ [[[IO.File]::WriteAllText]] و [[-F <ملف>]] |
| شيل حاجة دخلت غلط | [[git restore --staged <ملف>]] |

> عدّ ملفاتك قبل الـ add، وعدّ اللي في الـ index قبل الـ commit. الرقمين لازم يبقوا زي بعض.`,
          deep: {
            why: R`الـ commit المفروض يبقى «تغيير واحد له معنى». ملف إعدادات بقيمة تجربة أو سكرين شوت جوه commit ميزة بيخلّي الـ review أصعب، والـ revert بيرجّع حاجات مالهاش علاقة، وأسوأ حاجة: إعداد تجربة (أو سر) يتنشر للفريق. والـ index موجود في git عشان تختار بالظبط إيه اللي يدخل.`,
            how: R`[[git add]] بينسخ المحتوى من الملفات للـ index، والـ commit بيتعمل من الـ index بس، مش من الفولدر. الـ pathspec هو اللي بيحدد الملفات: مسار، أو wildcard، أو magic زي [[:(exclude)]] و [[:!]] (اختصارها) و [[:(icase)]]. [[git status -uall]] بيخلّي git يدخل جوه الفولدرات الجديدة ويعدّ كل ملف (أبطأ شوية في مشروع كبير، عشان كده مش الافتراضي). و [[-F -]] بيقرا الرسالة من الـ stdin، والـ heredoc ميزة في الـ shell مش في git.`,
            when: R`أي مرة الشجرة فيها أكتر من تغيير واحد: ميزة وتجربة، أو تصليحين مختلفين، أو ملفات اتعملت وانت بتجرّب. وفي السكربتات اللي بتعمل commit أوتوماتيك (زي سكربت إصدار) استخدم مسارات محددة دايمًا، متستخدمش [[-A]].`,
            mistakes: R`[[git add .]] من الجذر من غير ما تبص. و [[git commit -a]] وانت فاكر إنه بياخد الملفات الجديدة. و [["':!x'"]] بـ double quotes في bash تفاعلي فـ [[!]] ممكن يتفسّر history expansion. و heredoc من غير quotes حوالين [[EOF]] فرسالة فيها [[$VAR]] تتغيّر. و [[EOF]] القفلة فيها مسافة قبلها. ورسالة عربي بـ pipe من PowerShell 5.1 فتطلع [[?????]]. وتنسى سطر فاضي بعد العنوان فالتفاصيل تبقى جزء من العنوان.`
          },
          sol: R`[[status --short -uall]] فيه ١١ سطر: ٨ بتوعك و [[.env]] و [[notes.md]] و [[shot.png]].

الطرق التلاتة طلّعت نفس [[git diff --cached --stat]]: [[8 files changed, 8 insertions(+), 2 deletions(-)]].

بعد الـ commit: [[git log -1 --format=%B]] فيه العنوان وسطر فاضي والتفاصيل، و [[git status --short]] فيه [[ M .env]] و [[?? notes.md]] و [[?? shot.png]] بس.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: في المعمل، [[git commit -a -m wip]] هيدخّل كام ملف وأنهي؟ وبعدين جرّب على نسخة من المعمل.`, done: R`توقعت ٣: [[.env]] و [[src/app.js]] و [[src/routes/index.js]] (المتتبّع المتعدّل بس)، ومفيش ولا ملف من الـ ٦ الجداد، و [[git show --stat HEAD]] طابق.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git help glossary]] (دوّر على pathspec) اعرف الـ magic words التانية غير [[exclude]]، وجرّب [[:(icase)]] على ملف اسمه [[README.MD]].`, done: R`كتبت ٣ على الأقل ([[top]] و [[literal]] و [[icase]] و [[glob]] و [[attr]])، و [[git add ':(icase)readme.md']] ضاف [[README.MD]].` },
            { lvl: 'تطبيق', t: R`صلّح الأمر ده اللي المفروض يستبعد الصور والملاحظات: [[git add -A . !*.png !notes.md]]. جرّبه في bash واقرا اللي حصل، وبعدين اكتبه صح بطريقتين (اختصار وشكل طويل).`, done: R`عرفت إنه من غير quotes والـ [[:]] الـ shell بيفسّر [[!]] أو git بيعتبرها أسامي ملفات، وكتبت [[git add -A -- . ':!*.png' ':!notes.md']] و [[git add -A -- . ':(exclude)*.png' ':(exclude)notes.md']]، والاتنين طلّعوا ٨ ملفات.` },
            { lvl: 'تطبيق', t: R`رسالة فيها حاجات بتتفسّر: اعمل commit برسالة فيها [[$PORT]] و [[$(whoami)]] و backtick، مرة بـ [[<<EOF]] ومرة بـ [[<<'EOF']]، وقارن [[git log -1 --format=%B]].`, done: R`مع [[<<EOF]] الـ [[$PORT]] بقى فاضي و [[$(whoami)]] بقى اسمك، ومع [[<<'EOF']] الاتنين اتكتبوا زي ما هما، وتقدر تقول ليه.` },
            { lvl: 'تحدي', t: R`ابني [[commit-only.sh <msg-file> <path>...]]: بيرفض لو فيه حاجة staged قبل ما يبدأ، ويعمل add للمسارات بس، ويطبع [[git diff --cached --stat]]، ويسأل [[y/N]]، ويعمل commit بـ [[-F <msg-file>]]، ويطبع اللي فاضل في [[status --short]]. ويشتغل مع أسامي فيها مسافات.`, done: R`على المعمل بـ [[src]] بيعمل commit لـ ٨ ملفات ويطبع [[.env]] و [[notes.md]] و [[shot.png]] فاضلين، وملف اسمه [[my notes.md]] في المسارات بيدخل صح، ولو فيه حاجة staged قبل بيرفض بـ [[index not clean]].` },
            { lvl: 'تحدي', t: R`قارن على PowerShell: رسالة عربي بتلات طرق: pipe على 7.6، و pipe على 5.1، و ملف بـ [[[IO.File]::WriteAllText]] على 5.1. لكل واحدة اطبع أول ٣ بايت من الرسالة بـ [[git log -1 --format=%s | od -c | head -1]] من Git Bash.`, done: R`الأولى والتالتة بيبدأوا بـ [[330]] (حرف عربي UTF-8)، والتانية فيها [[?]]، وكتبت أنهي طريقة هتستخدمها في سكربت لازم يشتغل على الاتنين.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q shop-api && cd shop-api
mkdir -p src/routes src/lib && echo 'PORT=3000' > .env && echo app > src/app.js && echo r > src/routes/index.js
git add . && git commit -qm start
for f in src/routes/orders.js src/routes/users.js src/lib/db.js src/lib/cache.js; do echo "new $f" > $f; done
mkdir -p src/lib/payments && echo p > src/lib/payments/stripe.js && echo q > src/lib/payments/fawry.js
echo 'app v2' > src/app.js && echo r2 > src/routes/index.js
echo 'PORT=9999' > .env && echo notes > notes.md && printf PNG > shot.png
echo "normal: $(git status --short | wc -l | tr -d ' ') all: $(git status --short -uall | wc -l | tr -d ' ')"
git add -A && echo "add -A: $(git diff --cached --name-only | wc -l | tr -d ' ')" && git reset -q
git add -A -- . ':!shot.png' ':!notes.md' ':!.env'
git diff --cached --stat | tail -1
git commit -q -F - <<'EOF'
orders and users routes

- keeps $PORT literally
EOF
git log -1 --format=%B
echo "left: $(git status --short | tr '\n' ' ')"`, expect: [R`normal: 8 all: 11`, R`add -A: 11`, R`8 files changed`, R`- keeps $PORT literally`, R`left:  M .env ?? notes.md ?? shot.png`] },
          ],
        },
        {
          cmd: "فحص أسرار قبل الـ commit",
          title: "قبل أول commit لأداة: مفيش توكن ولا ملفات build داخلة، والفحص نفسه مبيكدبش",
          learn: R`تفحص الملفات الـ staged من ملفات الـ build ومن الأسرار بـ [[git grep --cached]]، وتقرا رقم الخروج صح (لقى، ملقاش، الفحص فشل)، وتتأكد إن الـ commit فيه اللي قصدته بس.`,
          out: R`[[git show --numstat --format=%h HEAD]] فيه ملفات الكود والقالب بس، و [[git log --all -p | grep -c tok_live_]] بيطبع [[0]].`,
          desc: R`أداة (C# مثلًا) هتترفع لأول مرة. الفولدر فيه [[bin/]] و [[obj/]] (ناتج الـ build)، وملف إعدادات فيه توكن حقيقي. لو دخلوا الـ commit، التوكن بقى في التاريخ، ومسحه بعدين مش بيكفي (لازم يتغيّر).

الترتيب:
1. [[git add -A]] و [[git status --short]]: شوف اللي داخل.
2. ملفات build: [[git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$" || echo none]].
3. أسرار: [[git grep --cached -nE "<أنماط>"]] واقرا [[$?]] لوحده: ٠ لقى، ١ ملقاش، **أي رقم تاني الفحص نفسه فشل**.
4. صلّح: [[.gitignore]]، و [[git rm --cached]]، والتوكن يطلع لملف مش متتبّع، وقالب فاضي يترفع مكانه.
5. commit، و [[git show --numstat --format=%h HEAD]] تتأكد.`,
          example: R`git add -A && git status --short
git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$" || echo none
git grep --cached -nE "tok_live_|api[_-]?key|BEGIN [A-Z ]*PRIVATE KEY"; echo "exit=$?"
printf 'bin/\nobj/\nsrc/appsettings.json\n' > .gitignore
git rm -q -r --cached --ignore-unmatch obj src/appsettings.json
git add -A
git grep --cached -qE "tok_live_"; rc=$?; [ $rc -eq 1 ] && echo clean || echo "STOP (exit=$rc)"
git commit -q -m "vpn-tool: first import"
git show --numstat --format=%h HEAD`,
          lines: [
            R`[[-A]] كل حاجة للـ index (الـ grep بتاع الخطوة الجاية بيدوّر في الـ index، فلازم الملفات تبقى فيه)، و [[status --short]] حرفين لكل ملف: [[A ]] اتضاف.`,
            R`[[git ls-files]] أسامي كل الملفات في الـ index. و [[grep -iE]] بيدوّر على فولدر اسمه [[bin]] أو [[obj]] أو [[out]] (في أول المسار أو بعد [[/]]) أو امتداد [[.exe]] أو [[.dll]] أو [[.pdb]]، و [[|| echo none]] يطبع [[none]] لو ملقاش (عشان السطر الفاضي ميتفهمش غلط).`,
            R`[[git grep]] بيدوّر في ملفات git، و [[--cached]] في الـ index (اللي داخل الـ commit) مش الفولدر، و [[-n]] رقم السطر، و [[-E]] regex موسّع: [[|]] يعني «أو». و [[echo "exit=$?"]] بيطبع رقم خروج الـ grep عشان تقراه بعينك.`,
            R`[[.gitignore]] جديد: [[bin/]] و [[obj/]] فولدرات build، و [[src/appsettings.json]] الملف اللي فيه التوكن الحقيقي (هيفضل على جهازك بس).`,
            R`[[rm --cached]] يشيلهم من الـ index ويسيبهم على الديسك، و [[-r]] للفولدرات، و [[--ignore-unmatch]] عشان لو واحد مش staged الأمر ميقفش للباقي.`,
            R`[[add -A]] تاني عشان [[.gitignore]] الجديد والقالب [[appsettings.example.json]] يدخلوا.`,
            R`نفس الفحص بس للسكربت: [[-q]] ميطبعش، و [[rc=$?]] يحفظ رقم الخروج **فورًا** قبل ما أي أمر تاني يغيّره، و [[clean]] بس لو [[1]]. أي رقم تاني (٠ لقى، أو ١٢٨ الفحص فشل) يوقف.`,
            R`الـ commit. لرسالة متعددة السطور استخدم [[-F -]] و heredoc (درس «commit لملفاتك بس»).`,
            R`[[--numstat]] لكل ملف رقمين (سطور اتضافت واتشالت) واسمه، بشكل ثابت للسكربتات. و [[--format=%h]] أول سطر الهاش المختصر بس. اتأكد إن الأسامي هي اللي قصدتها.`,
          ],
          try: R`ابني المعمل اللي في الشرح بتوكن وهمي، وشغّل الفحص بالـ regex الصح، وبعدين بوّظ الـ regex عمدًا ([[tok_live_[]]) وشغّل الشكل اللي بـ [[&&]] و [[||]]. قارن اللي اتطبع برقم الخروج الحقيقي.`,
          teach: R`## العَرَض

أداة ويندوز صغيرة ([[vpn-tool]]) شغّالة على جهازك وهتترفع لأول مرة. فيها:

- [[src/]] الكود.
- [[bin/Release/]] و [[obj/]]: ناتج [[dotnet build]]، فيه [[.exe]] و [[.dll]].
- [[src/appsettings.json]]: فيه [[token]] حقيقي.

في الشات الأصلي الفحص اتعمل الأول بشكل [[git grep ... && echo found || echo none]]، وطلع إن الشكل ده بيكدب في حالة معينة، فاتغيّر. هنشوف الحالة دي بعينينا.

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56)، والتوكن **وهمي**:

~~~bash
mkdir -p ~/lab/gitcases2/secrets && cd ~/lab/gitcases2/secrets
git init -q -b main vpn-tool && cd vpn-tool
mkdir -p src bin/Release obj
echo 'class App {}' > src/App.cs
printf 'MZ' > bin/Release/App.exe && printf 'x' > bin/Release/App.dll
echo '{}' > obj/project.assets.json
printf '{\n  "server": "vpn.example",\n  "token": "tok_live_9f8e7d6c5b4a"\n}\n' > src/appsettings.json
printf 'bin/\n' > .gitignore          # حد كتب bin بس ونسي obj
~~~

---

## ١. اللي داخل

~~~text git add -A && git status --short
A  .gitignore
A  obj/project.assets.json
A  src/App.cs
A  src/appsettings.json
~~~

[[bin/]] متجاهل فمظهرش. و [[obj/]] دخل.

> ليه [[git add -A]] قبل الفحص؟ لأن [[git grep --cached]] بيدوّر في الـ index بس. جرّبناه قبل الـ add: [[exit=1]] (ملقاش)، والتوكن موجود في الفولدر! الملف untracked فـ git مبيشوفهوش. (و [[git grep --untracked]] بيدوّر في الملفات الجديدة كمان، ولقاه بـ [[exit=0]].)

---

## ٢. ملفات build

~~~text git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$" || echo none
obj/project.assets.json
~~~

نفك الـ regex:

| الحتة | معناها |
|---|---|
| [[(^|/)]] | أول المسار أو بعد [[/]]. من غيرها [[out/]] هيمسك [[layout/]] و [[checkout/]] |
| [[(bin|obj|out)/]] | فولدر بالاسم ده |
| [[\.(exe|dll|pdb)$]] | الامتداد ده في **آخر** الاسم ([[$]])، و [[\.]] نقطة حرفية (من غير [[\]] النقطة معناها أي حرف) |
| [[-i]] | من غير ما يفرّق بين [[Bin]] و [[bin]] (ويندوز مبيفرّقش) |

وعشان تتأكد إن [[bin/]] متجاهل فعلًا مش ناسيه: [[git ls-files --others --ignored --exclude-standard]] بيطبع الملفات المتجاهلة ([[bin/Release/App.dll]] و [[bin/Release/App.exe]]).

---

## ٣. الأسرار: [[git grep --cached]] ورقم الخروج

~~~bash
git grep --cached -nE "tok_live_|api[_-]?key|password\s*[:=]|BEGIN [A-Z ]*PRIVATE KEY"
echo "exit=$?"
~~~

~~~text الناتج
src/appsettings.json:3:  "token": "tok_live_9f8e7d6c5b4a"
exit=0
~~~

- الأنماط: [[tok_live_]] بادئة التوكن بتاع الخدمة دي (كل خدمة ليها بادئة معروفة، زي [[ghp_]] لتوكن GitHub و [[AKIA]] لمفاتيح AWS)، و [[api[_-]?key]] «api» وبعدها [[_]] أو [[-]] أو لا حاجة، و [[\s*[:=]]] مسافات وبعدها [[:]] أو [[=]]، و [[BEGIN ... PRIVATE KEY]] أول سطر في أي مفتاح خاص.
- [[-n]] رقم السطر: [[src/appsettings.json:3]].

### رقم الخروج: تلات حالات مش اتنين

| الرقم | معناه |
|---|---|
| [[0]] | لقى (يعني فيه سر، **وقف**) |
| [[1]] | ملقاش حاجة (نضيف) |
| [[128]] | الفحص نفسه فشل: regex غلط، أو انت مش في ريبو |

### الفخ: [[&&]] و [[||]] بيدمجوا ١ و ١٢٨

جرّبنا regex فيه غلطة ([[[]] مقفلتش):

~~~text git grep --cached -qE "tok_live_[" && echo "SECRET FOUND" || echo "clean"
fatal: command line, 'tok_live_[': Invalid regular expression
clean
~~~

**[[clean]]!** الـ grep فشل بـ ١٢٨، و [[||]] بيشتغل مع **أي** رقم غير صفر، فطبع «نضيف» والتوكن لسه موجود. ونفس الحاجة لو شغّلت الفحص من فولدر مش ريبو ([[fatal: not a git repository]] ورقم ١٢٨). وفي سكربت أوتوماتيك محدش بيقرا سطر الـ fatal.

الصح: احفظ الرقم واتعامل مع التلات حالات:

~~~bash
git grep --cached -nE "tok_live_"; rc=$?
case $rc in
  0) echo "STOP: secret staged" ;;
  1) echo "clean (exit=1)" ;;
  *) echo "scan failed (exit=$rc)" ;;
esac
~~~

- [[rc=$?]] **على طول** بعد الأمر: أي أمر تاني (حتى [[echo]]) بيغيّر [[$?]].
- [[case $rc in ... esac]] زي [[switch]]: [[0)]] و [[1)]] و [[*)]] (أي حاجة تانية).

---

## ٤. صلّح

~~~bash
printf 'bin/\nobj/\nsrc/appsettings.json\n' > .gitignore
printf '{\n  "server": "vpn.example",\n  "token": ""\n}\n' > src/appsettings.example.json
git rm -q -r --cached --ignore-unmatch obj src/appsettings.json
git add -A
git status --short
~~~

~~~text الناتج
A  .gitignore
A  src/App.cs
A  src/appsettings.example.json
~~~

- [[appsettings.json]] الحقيقي فضل على جهازك بس (متجاهل)، و [[appsettings.example.json]] قالب بنفس الشكل وقيمة فاضية بيترفع، عشان أي حد ياخد الريبو يعرف محتاج إيه.
- البديل الأحسن في الأدوات الحقيقية: التوكن ميبقاش في ملف أصلًا، يتقري من متغيّر بيئة أو من مخزن أسرار (تاب sec، درس «أسرار مكشوفة»).

~~~text git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$" || echo none ; الفحص بـ case
none
clean (exit=1)
~~~

---

## ٥. الـ commit والتأكد

~~~bash
git commit -q -F - <<'EOF'
vpn-tool: first import

- src/App.cs, settings template (no token)
- bin/ obj/ and the real settings file are ignored
EOF
git show --numstat --format=%h HEAD
git log --all -p | grep -c tok_live_
~~~

~~~text الناتج
ec8b1f0

3	0	.gitignore
1	0	src/App.cs
4	0	src/appsettings.example.json
0
~~~

- [[--numstat]]: سطور اتضافت، وسطور اتشالت، والاسم، مفصولين بـ tab. ٣ ملفات بالظبط.
- [[git log --all -p]] كل commit في كل الفروع بالـ diff بتاعه، و [[grep -c]] يعدّ. [[0]]: التوكن مش في أي مكان في التاريخ.

---

## ولو التوكن دخل commit فعلًا؟

ده درس تاني في تاب sec («.env اترفع على Git»): **غيّر التوكن الأول** (اللي اترفع اعتبره اتسرّب)، وبعدين [[git filter-repo]] لو عايز تنضّف التاريخ. ولو لسه مرفعتش: [[git reset --soft HEAD~1]] وصلّح وارجع اعمل commit.

---

## البدايل

| الطريقة | ليه / ليه لأ |
|---|---|
| [[git diff --cached -U0 | grep -nE '^\+.*tok_live_']] | بيفحص **السطور الجديدة** بس في الـ commit ده، مش كل الملفات. أسرع على ريبو كبير، بس مش هيمسك سر قديم في ملف متتبّع من زمان |
| [[gitleaks]] أو [[trufflehog]] | أدوات فيها مئات الأنماط الجاهزة، وبتفحص التاريخ كله (درس «السكانرات في CI» في تاب sec). أحسن من أنماطك في مشروع حقيقي |
| بعينك على [[git status]] | بيوري الأسامي بس، مش المحتوى. توكن جوه ملف اسمه عادي مش هيبان |
| [[git grep]] بـ [[&&]] و [[||]] | بيطبع «نضيف» لما الفحص يفشل، زي ما شفنا |

---

## الخلاصة

| الفحص | الأمر |
|---|---|
| إيه اللي داخل | [[git add -A && git status --short]] |
| ملفات build | [[git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$"]] |
| المتجاهل فعلًا | [[git ls-files --others --ignored --exclude-standard]] |
| أسرار في الـ index | [[git grep --cached -nE "..."; rc=$?]] |
| الـ commit فيه إيه | [[git show --numstat --format=%h HEAD]] |
| في التاريخ كله | [[git log --all -p | grep -c <نمط>]] |

> فحص بيطبع «نضيف» لما يفشل أخطر من مفيش فحص: بيديك ثقة مش في مكانها.`,
          deep: {
            why: R`أي ملف بيدخل commit بيتنسخ عند كل اللي بياخدوا الريبو، ومسحه من التاريخ بعدين مبيوصلش للنسخ دي. فالفحص قبل الـ commit أرخص بكتير من التنضيف بعده. وملفات الـ build بتكبّر الريبو وبتعمل conflicts مالهاش معنى، وممكن يكون جواها إعدادات أو مسارات من جهازك.`,
            how: R`[[git grep]] بيدوّر في الـ tree اللي تحدده: من غير خيارات الملفات المتتبّعة على الديسك، و [[--cached]] الـ index، و [[<commit>]] commit معين، و [[--untracked]] كمان الجديد. وزي [[grep]] العادي: ٠ لو لقى، و ١ لو ملقاش، و أكتر من ١ لو حصل خطأ. و [[&&]] بيشغّل اللي بعده لو الرقم صفر، و [[||]] لو مش صفر، فالاتنين مع بعض بيعاملوا ١ و ١٢٨ زي بعض. و [[git ls-files]] بيقرا الـ index، و [[--others --ignored --exclude-standard]] بيعرض الملفات اللي مش متتبّعة والمتجاهلة حسب [[.gitignore]] والـ global ignore.`,
            when: R`قبل أول commit لأي مشروع، وقبل ما تفتح ريبو private للعامة، وفي pre-commit hook على كل commit، وفي CI على كل PR (عشان اللي معندوش الـ hook). وأي مرة ملف إعدادات اتعمله commit لأول مرة.`,
            mistakes: R`تفحص قبل [[git add]] بـ [[--cached]] فمتلاقيش حاجة. و [[&& ... || echo clean]] فالفشل يبقى «نضيف». وتقرا [[$?]] بعد [[echo]] فتاخد رقم الـ echo. و [[out/]] من غير [[(^|/)]] فتمسك [[layout/]]. و [[.exe]] من غير [[\.]] و [[$]] فتمسك أي اسم فيه «exe». وتعتمد على أنماطك بس في مشروع حقيقي بدل أداة زي gitleaks. وتمسح التوكن من الكود وتفتكر خلاص، من غير ما تغيّره.`
          },
          sol: R`قبل التصليح: [[obj/project.assets.json]] في فحص الـ build، و [[src/appsettings.json:3]] في الأسرار بـ [[exit=0]].

الـ regex البايظ: [[fatal: ... Invalid regular expression]] وبعدها [[clean]]، مع إن التوكن موجود. ورقم الخروج الحقيقي [[128]]، والشكل بـ [[case]] بيطبع [[scan failed (exit=128)]].

بعد التصليح: [[none]] و [[clean (exit=1)]]، و [[git show --numstat]] فيه [[.gitignore]] و [[src/App.cs]] و [[src/appsettings.example.json]] بس.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: لكل حالة قول [[git grep --cached -q tok_]] هيخرج بكام: (أ) التوكن في ملف staged، (ب) في ملف untracked بس، (ج) انت في فولدر مش ريبو، (د) الـ regex [[tok_[]].`, done: R`كتبت: أ [[0]]، ب [[1]] (مش في الـ index)، ج [[128]]، د [[128]]، وجرّبت الأربعة وطابقوا.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git help grep]] اعرف [[-I]] و [[-l]] و [[--untracked]] و [[-e]] بيعملوا إيه، وأنهي واحد يخلّي الفحص يطبع أسامي الملفات بس.`, done: R`كتبت سطر لكل واحد: [[-I]] متدوّرش في الـ binary، و [[-l]] أسامي الملفات بس، و [[--untracked]] كمان الملفات الجديدة، و [[-e]] نمط (ينفع أكتر من واحد).` },
            { lvl: 'تطبيق', t: R`صلّح الـ hook البايظ ده: [[git grep --cached -qE "$PATTERN" && { echo "secret!"; exit 1; } || exit 0]]. خليه يرفض لو لقى، ويرفض كمان لو الفحص فشل، ويقبل بس لو ملقاش. وجرّبه بـ [[PATTERN='tok_[']].`, done: R`نسختك فيها [[rc=$?]] و [[case]]، وبـ regex بايظ بتطبع [[scan failed]] وتخرج ١، وبتوكن staged بتخرج ١، ومن غير توكن بتخرج ٠.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اعمل ريبو فيه ٥ ملفات إعدادات (JSON و YAML و [[.env]] و [[.ini]] و PowerShell) فيهم أسرار وهمية بأشكال مختلفة ([[password: x]] و [[API_KEY=x]] و [["apiKey": "x"]] و [[-----BEGIN RSA PRIVATE KEY-----]]). اكتب نمط واحد يمسكهم كلهم ومايمسكش [[password_hint: ""]].`, done: R`[[git grep --cached -nE]] بالنمط بتاعك بيطلّع ٥ سطور بالظبط، وسطر [[password_hint]] مش منهم.` },
            { lvl: 'تحدي', t: R`ابني الـ pre-commit hook (مشروع الوحدة المتوسط): ملفات build وأسرار، بأسامي فيها مسافات ([[git diff --cached --name-only -z]])، ويطبع اسم الملف ورقم السطر، ويخرج ١ في «لقى» و «الفحص فشل».`, done: R`commit فيه [[tok_live_]] بيترفض ويطبع [[src/appsettings.json:3]]، و commit فيه [[my build/out.dll]] بيترفض، و commit نضيف بيعدّي، و [[git commit --no-verify]] بيعدّي (وكتبت ليه ده مقبول بس في حالات معينة).` },
            { lvl: 'تحدي', t: R`قارن وقيس: على ريبو فيه ٢٠٠٠ ملف (اعملهم بلوب) وملف واحد staged فيه توكن، قيس بـ [[time]]: [[git grep --cached]] قصاد [[git diff --cached -U0 | grep '^+'...]]. وبعدين حط التوكن في ملف قديم متتبّع ومش متعدّل: أنهي واحد مسكه؟`, done: R`عندك رقمين بالثواني، وكتبت إن [[diff]] أسرع لأنه بيقرا التغييرات بس، بس مسكش التوكن القديم، و [[git grep --cached]] مسكه.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q vpn-tool && cd vpn-tool
mkdir -p src bin/Release obj && echo 'class App {}' > src/App.cs && printf MZ > bin/Release/App.exe && echo '{}' > obj/project.assets.json
printf '{\n  "token": "tok_live_9f8e7d6c5b4a"\n}\n' > src/appsettings.json
printf 'bin/\n' > .gitignore
git grep --cached -q tok_live_; echo "before add: $?"
git add -A
git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$" || echo none
git grep --cached -nE "tok_live_"; echo "exit=$?"
git grep --cached -qE "tok_live_[" 2>/dev/null && echo "SECRET FOUND" || echo "trap says: clean"
git grep --cached -qE "tok_live_[" 2>/dev/null; rc=$?; case $rc in 0) echo STOP;; 1) echo clean;; *) echo "scan failed (exit=$rc)";; esac
printf 'bin/\nobj/\nsrc/appsettings.json\n' > .gitignore
printf '{\n  "token": ""\n}\n' > src/appsettings.example.json
git rm -q -r --cached --ignore-unmatch obj src/appsettings.json && git add -A
git ls-files | grep -iE "(^|/)(bin|obj|out)/|\.(exe|dll|pdb)$" || echo none
git grep --cached -qE "tok_live_"; rc=$?; [ $rc -eq 1 ] && echo "clean (exit=1)"
git commit -qm "first import" && git show --numstat --format=%h HEAD | tail -3
echo "in history: $(git log --all -p | grep -c tok_live_)"`, expect: [R`before add: 1`, R`obj/project.assets.json`, R`src/appsettings.json:2:`, R`exit=0`, R`trap says: clean`, R`scan failed (exit=128)`, R`none`, R`clean (exit=1)`, R`src/appsettings.example.json`, R`in history: 0`] },
          ],
        },
        {
          cmd: "الـ diff بيقول الملف كله اتغيّر",
          title: "غيّرت سطر واحد بسكربت، و git diff بيقول 122 سطر اتشال و 122 اتضاف",
          learn: R`تعرف إن الفرق في نهايات السطور بالأرقام (CR في HEAD قصاد CR على الديسك)، وترجّع الملف لنوع نهايات سطوره الأصلي، وتتأكد إن الـ diff بقى السطر اللي غيّرته بس.`,
          out: R`[[git diff --numstat]] بيطبع [[1	1	deploy.ps1]] بدل [[122	122	deploy.ps1]].`,
          desc: R`عدّلت سطر واحد في [[deploy.ps1]] بسكربت Python (أو بـ [[sed -i]])، و [[git diff --stat]] بيقول الملف **كله** اتغيّر. السكربت مبوّظش الكود: غيّر **نهايات السطور**. الملف كان متسجّل في الريبو CRLF ([[\r\n]]، شكل ويندوز)، والسكربت كتبه LF ([[\n]]، شكل لينكس)، فكل سطر بقى مختلف بحرف [[\r]] واحد.

التشخيص بالترتيب:
1. [[git diff --numstat]]: نفس العدد مضاف ومشال = غالبًا نهايات سطور.
2. [[git diff --ignore-cr-at-eol --stat]]: لو بقى سطر أو اتنين، اتأكدت.
3. عدّ حروف [[\r]] في الملف دلوقتي ([[tr -cd '\r' < <ملف> | wc -c]]) وفي HEAD ([[git show HEAD:<ملف> | tr -cd '\r' | wc -c]]).
4. [[git ls-files --eol]]: [[i/crlf w/lf]].

والحل: رجّع الملف لـ CRLF **بالبايت** (مش بمحرر ممكن يغيّر حاجة تانية)، واتأكد إن الـ diff بقى السطر بتاعك بس.`,
          example: R`git diff --stat
git diff --numstat
for f in $(git diff --name-only); do echo "$f CR=$(tr -cd '\r' < "$f" | wc -c) lines=$(wc -l < "$f")"; done
git show HEAD:deploy.ps1 | tr -cd '\r' | wc -c
git ls-files --eol deploy.ps1
git diff --ignore-cr-at-eol --stat
python3 -c "p='deploy.ps1'; b=open(p,'rb').read(); open(p,'wb').write(b.replace(b'\r\n',b'\n').replace(b'\n',b'\r\n'))"
git diff --numstat
git ls-files --eol deploy.ps1`,
          lines: [
            R`ملخص: الملف وجنبه عدد السطور اللي اتغيّرت وعلامات [[+]] و [[-]]. [[244 ++++----]] في ملف ١٢٢ سطر يعني كل سطر اتشال واتحط تاني.`,
            R`نفس الكلام بأرقام صافية لسكربت: سطور اتضافت، وسطور اتشالت، والاسم. [[122	122]] متساويين = نفس السطور بس مكتوبة بشكل مختلف.`,
            R`لكل ملف متغيّر: [[tr -cd '\r']] بيمسح كل حاجة **ما عدا** حرف CR ([[-d]] امسح، و [[-c]] العكس: كل اللي مش في القايمة)، و [[wc -c]] بيعدّ اللي فاضل. وجنبه عدد السطور. [[CR=0 lines=122]] = ولا سطر CRLF.`,
            R`نفس العدّ على نسخة الملف اللي في آخر commit: [[git show HEAD:<مسار>]] بيطبع محتوى الملف من الـ commit من غير ما يلمس الديسك، والـ pipe بيبعته لـ [[tr]]. [[122]] = كان كله CRLF.`,
            R`[[i/]] نهايات السطور في الـ index، و [[w/]] على الديسك. [[i/crlf  w/lf]] هي الحكاية كلها في سطر.`,
            R`الـ diff من غير فرق [[\r]] في آخر السطور. لو بقى [[1 file changed, 1 insertion(+), 1 deletion(-)]] يبقى التعديل الحقيقي سطر واحد.`,
            R`بيقرا الملف bytes ([[rb]]: من غير أي تحويل)، ويحوّل أي CRLF لـ LF الأول (عشان لو فيه سطور CRLF متتحولش لـ [[\r\r\n]])، وبعدين كل LF لـ CRLF، ويكتب bytes ([[wb]]).`,
            R`لازم يبقى [[1	1	deploy.ps1]]: سطر اتشال وسطر اتضاف، وده تعديلك.`,
            R`[[i/crlf  w/crlf]]: الملف رجع زي ما كان في الريبو.`,
          ],
          try: R`ابني المعمل اللي في الشرح على [[ubuntu:24.04]] في Docker (أو Git Bash)، وعدّل السطر بسكربت Python العادي، وامشي على الفحوصات الأربعة واكتب ناتج كل واحد قبل ما تصلّح. وبعدين جرّب [[sed -i]] على نفس الملف في Ubuntu وفي Git Bash وقارن [[git ls-files --eol]].`,
          teach: R`## العَرَض

في شات أداة ويندوز، سكربت PowerShell طويل ([[deploy.ps1]]، ١٢٢ سطر) محتاج سطر واحد يتغيّر: [[$Port = 443]] يبقى [[8443]]. اتعمل بسكربت Python صغير، وبعدها:

~~~text git diff --stat
 deploy.ps1 | 244 ++++++++++++++++++++++++++++++-------------------------------
 1 file changed, 122 insertions(+), 122 deletions(-)
~~~

سطر واحد اتغيّر، والـ diff بيقول ١٢٢. لو عملت commit كده: الـ review مستحيل، و [[git blame]] هيقول إنك كاتب الملف كله، وأي حد معدّل في نفس الملف هيلاقي conflict في كل سطر.

---

## المعمل

اتجرّب على [[ubuntu:24.04]] في Docker (Git 2.43، Python 3.12):

~~~bash
mkdir -p ~/lab/gitcases2/eol && cd ~/lab/gitcases2/eol
git init -q tool && cd tool
python3 - <<'PY'
CR, LF = chr(13), chr(10)
lines = ["# deploy.ps1 for vpn-tool", "$Server = 'vpn.example'", "$Port = 443"] + [f"Write-Host 'step {i}'" for i in range(1, 120)]
open("deploy.ps1", "w", newline="").write((CR + LF).join(lines) + CR + LF)
PY
git add . && git commit -qm "deploy script"
# التعديل «البريء»:
python3 - <<'PY'
p = "deploy.ps1"
s = open(p, encoding="utf-8").read()
assert s.count("$Port = 443") == 1
open(p, "w", encoding="utf-8").write(s.replace("$Port = 443", "$Port = 8443"))
PY
~~~

- أول سكربت بيعمل ملف ١٢٢ سطر CRLF (زي ما محرر على ويندوز بيكتب)، و [[newline=""]] بيقول لـ Python «اكتب اللي اديتهولك زي ما هو». و [[chr(13)]] هو [[\r]] و [[chr(10)]] هو [[\n]] (ليه بنكتبهم كده؟ درس «سكربت Python يعدّل ملف CRLF»).
- التاني هو التعديل اللي حصل: [[open()]] عادي للقراية والكتابة.

---

## ١. [[--numstat]]: الأرقام متساوية

~~~text git diff --numstat
122	122	deploy.ps1
~~~

[[--numstat]] رقمين وتاب واسم: سطور اتضافت، وسطور اتشالت. لما الاتنين **متساويين وبعدد سطور الملف**، أول شك: كل سطر اتكتب تاني بنفس الكلام بس بشكل مختلف. أشهر سبب: نهايات السطور، وبعده المسافات (tab بقى spaces) أو encoding.

## ٢. عدّ الـ [[\r]]: دلوقتي وفي HEAD

~~~bash
for f in $(git diff --name-only); do echo "$f CR=$(tr -cd '\r' < "$f" | wc -c) lines=$(wc -l < "$f")"; done
git show HEAD:deploy.ps1 | tr -cd '\r' | wc -c
~~~

~~~text الناتج
deploy.ps1 CR=0 lines=122
122
~~~

| الحتة | معناها |
|---|---|
| [[git diff --name-only]] | أسامي الملفات المتغيّرة بس، سطر لكل واحد |
| [[tr -cd '\r']] | [[tr]] بيبدّل أو يمسح حروف. [[-d]] امسح، و [[-c]] (complement) اقلب القايمة: امسح كل حرف **مش** CR. اللي بيفضل حروف CR بس |
| [[wc -c]] | عدد البايتات اللي فاضلة، يعني عدد حروف CR |
| [[wc -l < "$f"]] | عدد السطور كلها. الـ [[<]] بيخلّي [[wc]] يطبع الرقم من غير اسم الملف |
| [[git show HEAD:deploy.ps1]] | محتوى الملف زي ما هو في آخر commit |

**٠ CR في ١٢٢ سطر دلوقتي، و ١٢٢ في HEAD.** الملف كان CRLF كله وبقى LF كله.

### فخ في Git Bash: [[grep -c $'\r$']] بيكدب

في الشات الأصلي العدّ اتعمل بـ [[grep -c $'\r$' "$f"]] (عدّ السطور اللي آخرها CR). على [[ubuntu:24.04]] طلّع نفس الأرقام ([[0]] و [[122]]). بس على Git Bash في ويندوز (grep 3.0) جرّبناه على ملفين، [[app.env]] (LF) و [[deploy.ps1]] (CRLF)، كل واحد سطرين:

~~~text Git Bash: CR بـ tr وبـ grep
app.env disk-tr=0 head-tr=0 disk-grep=2 lines=2
deploy.ps1 disk-tr=2 head-tr=2 disk-grep=2 lines=2
~~~

[[grep]] قال إن ملف الـ LF سطوره كلها آخرها CR! نسخة grep اللي مع Git for Windows بتتعامل مع الـ CR كجزء من نهاية السطر، فالعدّ بيطلع عدد السطور مهما كان الملف. و [[tr -cd '\r']] بيعدّ البايتات نفسها، فمبيكدبش على الاتنين. (وكمان [[$'\r$']] جوه [["$(...)"]] في سطر طويل طلّع لنا في Git Bash [[unexpected EOF while looking for matching )]]، فلو لازم تستخدمه حطه في متغيّر في سطر لوحده.)

## ٣. [[git ls-files --eol]]

~~~text git ls-files --eol deploy.ps1
i/crlf  w/lf    attr/                 	deploy.ps1
~~~

[[i/crlf]] جوه الـ index CRLF، و [[w/lf]] على الديسك LF، و [[attr/]] فاضي: مفيش [[.gitattributes]] بيقول الملف ده المفروض يبقى إيه.

## ٤. الـ diff الحقيقي: [[--ignore-cr-at-eol]]

~~~text git diff --ignore-cr-at-eol --stat
 deploy.ps1 | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

ده التعديل الحقيقي: سطر. وعشان تشوف الـ [[\r]] بعينك في الـ diff العادي:

~~~text git diff | head -8 | cat -A
diff --git a/deploy.ps1 b/deploy.ps1$
index 0302b48..103c3d6 100644$
--- a/deploy.ps1$
+++ b/deploy.ps1$
@@ -1,122 +1,122 @@$
-# deploy.ps1 for vpn-tool^M$
-$Server = 'vpn.example'^M$
-$Port = 443^M$
~~~

[[cat -A]] بيعرض الحروف المخفية: [[^M]] هو CR، و [[$]] آخر السطر. السطور اللي بتتشال ([[-]]) فيها [[^M]]، واللي بتتضاف لأ.

---

## السبب: Python في وضع النص

[[open(p)]] من غير [[newline]] بيفتح في «universal newlines»:

| | القراية | الكتابة |
|---|---|---|
| لينكس وماك | أي [[\r\n]] بيبقى [[\n]] | [[\n]] بيتكتب [[\n]] |
| ويندوز | أي [[\r\n]] بيبقى [[\n]] | [[\n]] بيتكتب [[\r\n]] |

يعني على لينكس (السيرفر، أو Docker، أو WSL) أي ملف CRLF بيتقري ويتكتب LF. وعلى ويندوز العكس: جرّبنا نفس السكربت على Python 3.14 في ويندوز على ملفين، [[app.env]] متسجّل LF و [[deploy.ps1]] CRLF:

~~~text git ls-files --eol   (بعد السكربت على ويندوز)
i/lf    w/crlf  attr/                 	app.env
i/crlf  w/crlf  attr/                 	deploy.ps1
~~~

[[deploy.ps1]] سلم بالصدفة، و [[app.env]] اتقلب CRLF كله. **نفس السكربت بيبوّظ ملفات مختلفة حسب النظام.**

### و [[sed -i]]؟

| | [[sed -i 's/443/8443/' deploy.ps1]] على ملف CRLF |
|---|---|
| Ubuntu (GNU sed) | السطر اتغيّر والـ CR فضل: [[i/crlf  w/crlf]]، و diff سطر واحد |
| Git Bash على ويندوز | **الملف كله بقى LF**: [[i/crlf  w/lf]] |

وفخ تاني في sed على ملف CRLF: [[sed -i 's/443$/8443/']] (بـ [[$]] آخر السطر) **معملش حاجة خالص** على Ubuntu ومن غير أي رسالة، لأن آخر السطر بقى [[\r]] مش [[3]]. [[git diff --stat]] فاضي هو اللي كشفه.

---

## الحل: رجّعه CRLF بالبايت

~~~bash
python3 - <<'PY'
p = "deploy.ps1"
b = open(p, "rb").read()
b = b.replace(b"\r\n", b"\n").replace(b"\n", b"\r\n")
open(p, "wb").write(b)
PY
git diff
~~~

~~~text الناتج
diff --git a/deploy.ps1 b/deploy.ps1
index 0302b48..f40127c 100644
--- a/deploy.ps1
+++ b/deploy.ps1
@@ -1,6 +1,6 @@
 # deploy.ps1 for vpn-tool
 $Server = 'vpn.example'
-$Port = 443
+$Port = 8443
 Write-Host 'step 1'
 Write-Host 'step 2'
 Write-Host 'step 3'
~~~

- [[rb]] و [[wb]]: binary، Python مبيحوّلش أي حاجة.
- [[b"..."]]: bytes مش نص، فـ [[.replace]] بيشتغل على البايتات.
- ليه **خطوتين**؟ لو الملف مخلوط (سطور CRLF وسطور LF)، [[replace(b"\n", b"\r\n")]] لوحده هيخلّي الـ CRLF القديمة [[\r\r\n]]. الأولى بتوحّد كله LF، والتانية بتحوّل كله CRLF.

### نفس الحل بأدوات تانية

~~~bash
unix2dos deploy.ps1          # Git Bash فيه unix2dos و dos2unix. وعلى Ubuntu: apt install dos2unix
file deploy.ps1              # Git Bash: "ASCII text, with CRLF line terminators"
~~~

~~~powershell
$t = [IO.File]::ReadAllText("$PWD\deploy.ps1") -replace "$__btr?$__btn", "$__btr$__btn"
[IO.File]::WriteAllText("$PWD\deploy.ps1", $t)
~~~

[[$__btr?$__btn]] في PowerShell: CR اختياري وبعده LF، يعني أي نهاية سطر، و [[-replace]] بيحوّلها كلها لـ [[$__btr$__btn]]. و [[WriteAllText]] بيكتب UTF-8 من غير BOM (اتجرّب على 7.6 على ملف فيه عربي: قبل [[CR=1 LF=3]]، بعد [[CR=3 LF=3]]، وأول بايت لسه [[35]] يعني [[#]] مش BOM). وعدّ الـ CR في PowerShell: [[$b = [IO.File]::ReadAllBytes($f); ($b | Where-Object { $_ -eq 13 }).Count]].

---

## البدايل اللي اترفضت

| الطريقة | ليه لأ |
|---|---|
| تعمل commit كده | ١٢٢ سطر في الـ diff لتعديل سطر، و [[blame]] بقى باسمك على الملف كله، و conflicts مع أي حد |
| [[git checkout -- deploy.ps1]] وتعدّل بإيدك | بيشتغل، بس تعديلك راح وهتعيده، ولو كان سكربت بيعدّل ٢٠ ملف مش هينفع |
| تفتحه في محرر وتحفظه CRLF | ممكن، بس محررات كتير بتغيّر حاجات تانية (مسافات آخر السطر، أو سطر فاضي في الآخر، أو BOM) |
| [[git config core.autocrlf true]] | بيغيّر إزاي git **بيقارن** وبيكتب، مش الملف. وبيأثر على كل ملفات الريبو |
| [[git diff --ignore-cr-at-eol]] وخلاص | ده للتشخيص بس؛ الـ commit هيتعمل بالملف LF |
| تحويل بالبايت، وبعدين [[--numstat]] | ✅ الملف رجع زي ما كان وتعديلك بس هو الفرق |

---

## اتأكد

~~~bash
git diff --numstat                      # 1	1	deploy.ps1
git ls-files --eol deploy.ps1           # i/crlf  w/crlf
git diff --ignore-cr-at-eol --numstat   # نفس الرقمين: مفيش فرق CR مستخبي
~~~

## متتكررش

- أي سكربت بيعدّل ملفات: [[open(p, newline="")]] أو [[rb]] و [[wb]] (درس «سكربت Python يعدّل ملف CRLF»).
- [[.gitattributes]] بيقول لكل ملف المفروض يبقى إيه: [[*.ps1 text eol=crlf]] و [[*.sh text eol=lf]] (درس «.gitattributes»). مع السطر ده git بيسجّل الملفات LF جوه وبيكتبها CRLF على الديسك، والـ diff بيتجاهل الفرق.
- بعد أي تعديل بسكربت: [[git diff --numstat]] قبل الـ commit. الرقم لازم يبقى منطقي.

---

## الخلاصة

| الفحص | لو طلع | يبقى |
|---|---|---|
| [[--numstat]] | الرقمين متساويين وقد الملف | شك في نهايات السطور |
| [[--ignore-cr-at-eol --stat]] | سطر أو اتنين | اتأكدت |
| [[tr -cd '\r' | wc -c]] دلوقتي و في HEAD | [[0]] و [[122]] | CRLF بقى LF |
| [[ls-files --eol]] | [[i/crlf w/lf]] | نفس الحكاية |
| الحل | [[replace(b"\r\n",b"\n").replace(b"\n",b"\r\n")]] | ومعاه [[--numstat]] تاني |

> ملف «اتغيّر كله» وانت غيّرت سطر: اعدّ الـ [[\r]] قبل ما تقرا الـ diff.`,
          deep: {
            why: R`git بيقارن الملفات سطر سطر، والسطر عنده بينتهي بـ [[\n]]. فلو كل سطر اتشال منه [[\r]] (أو اتضافله)، كل سطر بقى «سطر مختلف». الكود شغّال عادي، بس التاريخ بقى كدب: الـ diff والـ blame والـ merge كلهم بيتعاملوا مع الملف كأنه اتكتب من جديد.`,
            how: R`ويندوز تاريخيًا بيختم السطر بحرفين CR LF (١٣ و ١٠)، ولينكس وماك بحرف LF. Python في وضع النص بيحوّل CRLF لـ LF وهو بيقرا، وبيكتب [[os.linesep]] (على ويندوز CRLF) وهو بيكتب، إلا لو [[newline=""]]. و GNU sed مبيلمسش الـ CR، بس sed في Git Bash (MSYS) بيقرا الملف في وضع نص فبيشيله. و git بيخزّن البايتات زي ما هي إلا لو [[core.autocrlf]] أو [[.gitattributes]] قالوا يحوّل، و [[ls-files --eol]] بيقرا الاتنين ويعرض النوع.`,
            when: R`بعد أي تعديل بسكربت ([[sed]] أو Python أو Node أو PowerShell) على ملفات ريبو فيه ملفات ويندوز، وفي ريبو الفريق فيه ويندوز ولينكس ومفيش [[.gitattributes]]، ولما ملف يتنسخ من جهاز لسيرفر ويرجع، ولما [[git diff --stat]] يطلّع رقم مش منطقي.`,
            mistakes: R`تعمل commit من غير ما تبص على [[--numstat]]. وتصلّح بـ [[replace(b"\n", b"\r\n")]] بس فالملف المخلوط يبقى فيه [[\r\r\n]]. وتغيّر [[core.autocrlf]] وتفتكر إنه صلّح الملف. وتفتكر إن [[sed -i]] بيتصرف نفس التصرف في Git Bash و Ubuntu. وتكتب [[sed 's/x$/y/']] على ملف CRLF ومتاخدش بالك إنه معملش حاجة. وتستخدم [[git diff --ignore-cr-at-eol]] كحل بدل ما يبقى أداة تشخيص.`
          },
          sol: R`الفحوصات بالترتيب على Ubuntu: [[122	122	deploy.ps1]]، و [[deploy.ps1 0/122]]، و HEAD [[122]]، و [[i/crlf  w/lf]]، و [[--ignore-cr-at-eol]]: [[1 file changed, 1 insertion(+), 1 deletion(-)]].

بعد التحويل بالبايت: [[git diff --numstat]] = [[1	1	deploy.ps1]]، و [[git diff]] فيه [[-$Port = 443]] و [[+$Port = 8443]] بس، و [[i/crlf  w/crlf]].

[[sed -i]]: على Ubuntu [[w/crlf]] و diff سطر، وعلى Git Bash [[w/lf]] والملف كله.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: ملف ١٠ سطور CRLF في الريبو. اتعدّل بسكربت قلبه LF وغيّر سطرين. [[git diff --numstat]] هيطبع إيه؟ و [[--ignore-cr-at-eol --numstat]]؟`, done: R`كتبت [[10	10]] و [[2	2]]، وعملت المعمل بـ Python وطابق.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git help diff]] اعرف الفرق بين [[--ignore-cr-at-eol]] و [[--ignore-space-at-eol]] و [[--ignore-all-space]]. وأنهي واحد كان هيخبّي تعديل حقيقي لو السكربت شال مسافة مهمة في ملف YAML؟`, done: R`كتبت سطر لكل واحد، وإن [[--ignore-all-space]] ([[-w]]) هيخبّي تغيير المسافات اللي ليها معنى في YAML و Python، و [[--ignore-cr-at-eol]] بيتجاهل الـ CR بس.` },
            { lvl: 'تطبيق', t: R`صلّح التحويل البايظ ده على ملف مخلوط (٥ سطور CRLF و ٥ LF): [[b = open(p,'rb').read().replace(b'\n', b'\r\n')]]. اعدّ [[\r\r\n]] قبل وبعد التصليح.`, done: R`نسختك فيها [[replace(b'\r\n', b'\n')]] الأول، و [[b.count(b'\r\r\n')]] بعدها [[0]] (وفي النسخة البايظة كان [[5]])، و [[file]] بيقول [[with CRLF line terminators]] بس.` },
            { lvl: 'تطبيق', t: R`قارن: على نفس الملف CRLF شغّل [[sed -i 's/443/8443/']] في Git Bash وفي [[ubuntu:24.04]]، و [[sed -i 's/443$/8443/']] في الاتنين. سجّل لكل مرة [[git diff --numstat]] و [[git ls-files --eol]].`, done: R`جدول ٤ صفوف: Ubuntu بدون [[$]] [[1	1]] و [[w/crlf]]، Ubuntu بـ [[$]] مفيش تغيير، Git Bash بدون [[$]] [[N	N]] و [[w/lf]]، و Git Bash بـ [[$]] (سجّل اللي طلع عندك وفسّره).` },
            { lvl: 'تحدي', t: R`ابني [[eol-check.py]] (مشروع الوحدة المتوسط): لكل ملف في [[git diff --name-only -z]] يعدّ CRLF و LF في HEAD وعلى الديسك ويطبع [[eol changed]]، و [[--fix]] يرجّع نوع HEAD بالبايت. ويتعامل مع ملف جديد مش في HEAD.`, done: R`في المعمل بيطبع [[deploy.ps1: HEAD crlf=122, now crlf=0  eol changed]]، وبعد [[--fix]] [[git diff --numstat]] = [[1	1]]، وملف جديد بيطبع [[new file]] من غير ما يقع.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه نفس سكربت Python بوّظ [[deploy.ps1]] على السيرفر وبوّظ [[app.env]] على ويندوز، وإيه السطر الواحد اللي يخلّيه آمن على الاتنين.`, done: R`الشرح فيه إن وضع النص بيقرا CRLF كـ LF على الاتنين بس بيكتب [[os.linesep]]، فلينكس بيكتب LF وويندوز CRLF، والسطر: [[open(p, newline="")]] في القراية والكتابة.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
PY=$(command -v python3 || command -v python)
git init -q tool && cd tool && git config core.autocrlf false
"$PY" -c "
CR, LF = chr(13), chr(10)
lines = ['# deploy', '\$Port = 443'] + ['Write-Host %d' % i for i in range(1, 121)]
open('deploy.ps1', 'w', newline='').write((CR + LF).join(lines) + CR + LF)"
git add . && git commit -qm deploy
"$PY" -c "
p = 'deploy.ps1'
s = open(p, encoding='utf-8', newline=None).read()
open(p, 'w', encoding='utf-8', newline=chr(10)).write(s.replace('\$Port = 443', '\$Port = 8443'))"
git diff --numstat
for f in $(git diff --name-only); do n=$(tr -cd '\r' < "$f" | wc -c | tr -d ' '); echo "$f CR=$n"; done
echo "HEAD: $(git show HEAD:deploy.ps1 | tr -cd '\r' | wc -c | tr -d ' ')"
git ls-files --eol deploy.ps1 | cut -c1-15
git diff --ignore-cr-at-eol --numstat
"$PY" -c "p='deploy.ps1'; b=open(p,'rb').read(); open(p,'wb').write(b.replace(b'\r\n',b'\n').replace(b'\n',b'\r\n'))"
echo "after:"; git diff --numstat; git ls-files --eol deploy.ps1 | cut -c1-15`, expect: [R`122	122	deploy.ps1`, R`deploy.ps1 CR=0`, R`HEAD: 122`, R`i/crlf  w/lf`, R`1	1	deploy.ps1`, R`after:
1	1	deploy.ps1
i/crlf  w/crlf`] },
          ],
        },
        {
          cmd: "سكربت Python يعدّل ملف CRLF",
          title: "سكربت استبدال بـ Python فشل على ملف ويندوز: اقرا واكتب من غير ما تلمس نهايات السطور",
          learn: R`تكتب سكربت تعديل بيعرف نوع نهايات السطور في الملف ويحافظ عليه، ويتأكد إن النص القديم موجود بالعدد المتوقع قبل ما يغيّر، ويرفض يعدّل مرتين، ومبيتأثرش بالـ shell اللي شغّله.`,
          out: R`[[git diff --stat]] بيقول السطور اللي قصدتها بس، و [[file]] بيقول [[with CRLF line terminators]] (مش [[CRLF, LF]]).`,
          desc: R`عايز تعدّل كود في ملف بسكربت (بدل المحرر) عشان التعديل يتعاد أو يتراجع بسهولة. السكربت فيه [[assert s.count(old) == 1]] وبعدين [[s.replace(old, new)]]، وفشل: [[old]] فيه [[\n]]، والملف CRLF ([[\r\n]])، فالنص «مش موجود». ومحاولة كتابة [[\r\n]] جوه السكربت اتكسرت في الـ shell.

الصح:
1. اقرا من غير تحويل: [[open(p, encoding="utf-8", newline="")]].
2. اعرف النوع: عدّ [[CR+LF]] وعدّ [[LF]] لوحدها.
3. ابني [[CR = chr(13)]] و [[LF = chr(10)]] جوه السكربت، فمفيش backslash أي shell يلمسه، وركّب [[old]] و [[new]] بنهاية السطر الصح.
4. اتأكد من العدد قبل ما تغيّر (بـ [[if]] مش [[assert]])، وارفض لو التعديل اتعمل قبل كده.
5. اكتب بـ [[newline=""]] برضه.`,
          example: R`import sys
p, want = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 1
CR, LF = chr(13), chr(10)
s = open(p, encoding="utf-8", newline="").read()
crlf = s.count(CR + LF); lf = s.count(LF) - crlf
nl = CR + LF if crlf > lf else LF
old = "$Port = 443" + nl + "Start-Service vpn"
new = "$Port = 8443" + nl + "Write-Host 'starting'" + nl + "Start-Service vpn"
if s.count(new) == want: print("already patched"); sys.exit(0)
n = s.count(old)
if n != want: sys.exit(f"expected {want} match(es), found {n}")
open(p, "w", encoding="utf-8", newline="").write(s.replace(old, new))
print("patched", n, "newline =", repr(nl))`,
          lines: [
            R`[[sys]] عشان [[sys.argv]] (الـ arguments) و [[sys.exit]] (اخرج برسالة ورقم).`,
            R`[[sys.argv[1]]] اسم الملف، و [[want]] عدد المرات المتوقع للنص القديم (الافتراضي ١). ليه رقم؟ في حالة حقيقية النص كان موجود مرتين (سوقين في نفس الملف)، والسكربت لازم يعرف ده مقدمًا.`,
            R`[[chr(13)]] هو CR و [[chr(10)]] هو LF. بنعملهم بالأرقام بدل [[\r]] و [[\n]] عشان السكربت لو اتبعت جوه heredoc أو [[echo]] أو [[ssh]]، مفيش backslash يتفسّر في السكة.`,
            R`[[newline=""]] بيقول لـ Python «متحوّلش نهايات السطور وانت بتقرا». من غيره أي [[\r\n]] بيبقى [[\n]] وانت مش واخد بالك (وده سبب درس «الـ diff بيقول الملف كله اتغيّر»). و [[encoding="utf-8"]] صراحة عشان ويندوز ممكن يفترض encoding تاني.`,
            R`عدّ CRLF، وعدّ LF اللي لوحدها (كل LF ناقص اللي جوه CRLF). لو الاتنين أكبر من صفر الملف مخلوط.`,
            R`نختار نهاية السطر اللي الملف أغلبه بيها. ده اللي هنركّب بيه النص القديم والجديد.`,
            R`النص القديم سطرين، متركّبين بنهاية سطر الملف نفسه. فلو الملف CRLF هيدوّر على [[443\r\nStart]] وده الموجود فعلًا.`,
            R`النص الجديد: نفس الفكرة، وسطر زيادة. كل السطور بنفس [[nl]]، فمفيش سطر LF هيتزرع جوه ملف CRLF.`,
            R`لو الجديد موجود بالعدد المتوقع، التعديل اتعمل قبل كده: اطبع كده واخرج بـ ٠ (نجاح) من غير ما تلمس حاجة. الـ [[;]] بيحط أمرين في سطر الـ [[if]]. كده تشغيل السكربت مرتين آمن.`,
            R`عدد مرات النص القديم.`,
            R`[[sys.exit("رسالة")]] بيطبع الرسالة على stderr ويخرج برقم ١. ليه مش [[assert]]؟ [[python -O]] بيشيل كل الـ asserts، فالسكربت كان هيكمّل ويعمل [[replace]] على صفر أو أكتر من المتوقع.`,
            R`[[replace]] بيغيّر كل المرات (وإحنا اتأكدنا إنهم [[want]] بالظبط)، و [[newline=""]] في الكتابة كمان: متحوّلش [[\n]] لـ [[\r\n]] على ويندوز.`,
            R`[[repr(nl)]] بيطبع [['\r\n']] أو [['\n']] بالشكل اللي يتقري، عشان تعرف السكربت اشتغل بأنهي نوع.`,
          ],
          try: R`ابني الملف [[deploy.ps1]] CRLF اللي في الشرح، وجرّب السكربت الأول (اللي فيه [[\n]] في [[old]]) واقرا الخطأ، وبعدين السكربت الصح، وشغّله مرتين، وبعدين بـ [[2]] كـ argument. وبعد كل مرة: [[git diff --stat]] و [[file deploy.ps1]].`,
          teach: R`## العَرَض

في شات تعديل موقع على سيرفر، التعديل اتعمل بسكربت Python بيعمل [[s.replace(old, new)]] بعد ما يتأكد إن [[old]] موجود مرة واحدة. على ملف من ويندوز:

~~~text الناتج
count: 0
Traceback (most recent call last):
  File "<stdin>", line 5, in <module>
AssertionError: old text not found (exactly once)
~~~

النص موجود في الملف بعينك! والمحاولة التانية (تكتب [[\r\n]] في [[old]]) اتبعتت للسيرفر جوه أمر shell، ووقعت بـ SyntaxError. الدرس ده بيفك الاتنين ويبني السكربت الصح.

---

## المعمل

اتجرّب على [[ubuntu:24.04]] في Docker (Python 3.12، Git 2.43) وعلى ويندوز (Python 3.14):

~~~bash
mkdir -p ~/lab/gitcases2/pypatch && cd ~/lab/gitcases2/pypatch
git init -q tool && cd tool
python3 -c "
CR, LF = chr(13), chr(10)
lines = ['\$Server = \'vpn.example\'', '\$Port = 443', 'Start-Service vpn']
open('deploy.ps1', 'w', newline='').write((CR + LF).join(lines) + CR + LF)"
git add . && git commit -qm init
~~~

[[\$]] جوه الـ double quotes عشان bash ميفكّش [[$Server]] كمتغيّر.

---

## ١. ليه [[count]] طلع صفر؟

~~~python
p = "deploy.ps1"
s = open(p, encoding="utf-8", newline="").read()
old = "$Port = 443\nStart-Service vpn"
print("count:", s.count(old))
~~~

السكربت قرا بـ [[newline=""]] (صح، عشان ميبوّظش الملف)، فالنص اللي في الذاكرة فيه [[443\r\nStart]]. و [[old]] مكتوب [[443\nStart]]. الفرق حرف واحد مش باين، والعدد صفر.

اعرف نوع الملف قبل أي حاجة:

~~~bash
python3 - <<'PY'
b = open("deploy.ps1", "rb").read()
crlf = b.count(b"\r\n"); lf = b.count(b"\n") - crlf
print(f"crlf={crlf} lf_only={lf}")
PY
~~~

~~~text الناتج
crlf=3 lf_only=0
~~~

[[rb]] بايتات من غير تحويل، و [[b'\r\n']] bytes. ٣ سطور كلهم CRLF.

---

## ٢. ليه المحاولة التانية اتكسرت؟ الـ backslash في السكة

السكربت اتبعت للسيرفر جوه أمر shell. جرّبنا نفس الفكرة على [[ubuntu:24.04]]: سطر Python فيه [[\r\n]] بيتبعت بـ [[echo]]:

~~~text sh -c 'echo "print(repr(\"a\r\nb\"))" | python3'
    print(repr("a
               ^
SyntaxError: unterminated string literal (detected at line 1)
~~~

~~~text bash -c 'echo "print(repr(\"a\r\nb\"))" | python3'
'a\r\nb'
~~~

نفس الأمر بالظبط: في [[sh]] (على Ubuntu هو [[dash]]) الـ [[echo]] **بيفسّر** [[\r]] و [[\n]] ويحطهم حروف حقيقية، فـ Python استلم سطر مقطوع في نص الـ string. وفي [[bash]] الـ [[echo]] سابهم زي ما هما. ولما الأمر بيعدّي على أكتر من طبقة ([[ssh]] جوه [[bash -c]] جوه heredoc من غير quotes)، كل طبقة ممكن تاكل backslash.

**الحل:** متكتبش [[\r]] ولا [[\n]] في السكربت أصلًا:

~~~python
CR, LF = chr(13), chr(10)
~~~

[[chr(13)]] رقم، مفيهوش أي حرف خاص، فمفيش shell يقدر يغيّره. ولو السكربت طويل: احفظه في ملف ([[patch.py]]) وانقله بـ [[scp]] وشغّله بـ [[python3 patch.py]]، أو ابعته بـ heredoc بـ quotes ([[<<'PY']]) اللي مبيفسّرش حاجة.

---

## ٣. السكربت الصح

~~~python patch.py
import sys
p, want = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 1
CR, LF = chr(13), chr(10)
s = open(p, encoding="utf-8", newline="").read()
crlf = s.count(CR + LF); lf = s.count(LF) - crlf
nl = CR + LF if crlf > lf else LF
print(f"{p}: crlf={crlf} lf_only={lf} -> using {'CRLF' if nl == CR + LF else 'LF'}")
old = "$Port = 443" + nl + "Start-Service vpn"
new = "$Port = 8443" + nl + "Write-Host 'starting'" + nl + "Start-Service vpn"
if s.count(new) == want:
    print("already patched"); sys.exit(0)
n = s.count(old)
if n != want:
    sys.exit(f"expected {want} match(es), found {n}")
open(p, "w", encoding="utf-8", newline="").write(s.replace(old, new))
print("patched", n)
~~~

~~~text python3 patch.py deploy.ps1 ; git diff --stat ; file deploy.ps1
deploy.ps1: crlf=3 lf_only=0 -> using CRLF
patched 1
 deploy.ps1 | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
deploy.ps1: ASCII text, with CRLF line terminators
~~~

[[2 insertions(+), 1 deletion(-)]]: سطر [[443]] اتشال، و [[8443]] و [[Write-Host]] اتضافوا. والملف لسه CRLF كله. نفس الناتج على ويندوز (Python 3.14).

### تشغيل تاني، وعدد غلط

~~~text python3 patch.py deploy.ps1
deploy.ps1: crlf=4 lf_only=0 -> using CRLF
already patched
~~~

~~~text python3 patch.py deploy.ps1 2
expected 2 match(es), found 0
~~~

- التاني رقم خروجه [[0]] ومغيّرش حاجة: السكربت idempotent (تشغيله مرة أو عشرة نفس النتيجة).
- التالت رقم خروجه [[1]]: النص مش بالعدد اللي قلته، فرفض. ده بيمسك حالتين: الكود اتغيّر من ساعة ما كتبت السكربت، أو النص موجود في أماكن أكتر من اللي فاكرها.

---

## ٤. الفخ: سطر LF جوه ملف CRLF

لو قريت صح بـ [[newline=""]] بس كتبت السطر الجديد بـ [[\n]] عادي:

~~~python
s = s.replace("Start-Service vpn", "Write-Host 'starting'\nStart-Service vpn")
~~~

~~~text file deploy.ps1 ; git diff | cat -A | tail -4
deploy.ps1: ASCII text, with CRLF, LF line terminators
 $Server = 'vpn.example'^M$
 $Port = 443^M$
+Write-Host 'starting'$
 Start-Service vpn^M$
~~~

[[with CRLF, LF]]: الملف بقى **مخلوط**. والـ diff باين صغير وسليم، بس السطر الجديد مفيهوش [[^M]] زي اللي حواليه. PowerShell هيشغّله عادي، بس أدوات تانية (و [[git diff]] مع [[core.whitespace=cr-at-eol]] أو editor بيحفظ «نوع واحد») هتطلّع الفرق بعدين. عشان كده كل سطر جديد بيتركّب بـ [[nl]].

---

## ٥. [[assert]] مش للتأكيد في سكربت شغل

~~~text python -O -c "assert False, 'x'; print('assert skipped')"
assert skipped
~~~

[[-O]] (optimize) بيشيل كل الـ [[assert]] من الكود. لو حد شغّل السكربت بـ [[-O]] (أو متغيّر [[PYTHONOPTIMIZE]] متظبّط على الجهاز)، الفحص اختفى والـ [[replace]] اشتغل. [[assert]] للاختبارات وللحاجات اللي «مستحيل تحصل»، أما شرط لازم يوقف السكربت: [[if ...: sys.exit(...)]].

---

## اتأكد بعد أي سكربت

~~~bash
git diff --stat                     # السطور اللي قصدتها بس
git diff --ignore-cr-at-eol --stat  # نفس الأرقام = مفيش نهايات سطور اتغيّرت
git ls-files --eol deploy.ps1       # i/crlf  w/crlf
file deploy.ps1                     # with CRLF line terminators (مش CRLF, LF)
~~~

## متتكررش

- كل سكربت تعديل: [[newline=""]] في القراية والكتابة، و [[chr(13)]] و [[chr(10)]]، وعدّ متوقع، وفحص «اتعمل قبل كده».
- السكربت يتحفظ في ملف ويتنقل، مش يتلزق جوه أمر shell طويل.
- [[.gitattributes]] للملفات اللي ليها نوع ثابت ([[*.ps1 text eol=crlf]])، فـ git نفسه يعرف الصح (درس «.gitattributes»).
- ونفس الفكرة لأي لغة: Node بيقرا بايتات زي ما هي ([[fs.readFileSync(p, "utf8")]] مبيحوّلش)، و PowerShell [[Get-Content]] بيقسم السطور ويشيل نهاياتها، فـ [[Set-Content]] بعدها بيكتب نهاية سطر النظام (درس «الـ diff بيقول الملف كله اتغيّر» فيه الشكل الآمن بـ [[[IO.File]::ReadAllText]]).

---

## الخلاصة

| المشكلة | السبب | الحل |
|---|---|---|
| [[count: 0]] والنص موجود | [[old]] فيه [[\n]] والملف [[\r\n]] | [[nl]] من الملف نفسه |
| SyntaxError بعد ما اتبعت للسيرفر | [[echo]] في [[sh]] فسّر [[\r]] | [[chr(13)]] و [[chr(10)]]، وملف بدل سطر |
| [[with CRLF, LF]] | سطر جديد بـ [[\n]] | كل سطر جديد بـ [[nl]] |
| الفحص اتشال | [[assert]] مع [[-O]] | [[if ...: sys.exit()]] |
| تشغيل مرتين | السكربت مش idempotent | [[if s.count(new) == want]] |

> السكربت اللي بيعدّل ملفات لازم يسيب كل حاجة زي ما هي ما عدا اللي قصدته: البايتات، ونهايات السطور، والـ encoding.`,
          deep: {
            why: R`التعديل بسكربت بيتعاد بالظبط على سيرفر تاني أو بعد شهر، وبيتراجع بسهولة، وبيتراجع (review) كسطور واضحة. بس لو السكربت غيّر نهايات السطور، أو اشتغل على نص غلط، أو اتعمل مرتين، بيعمل ضرر أكبر من التعديل بإيدك لأنه بيعمل كده بثقة ومن غير ما حد يبص.`,
            how: R`[[open()]] في Python 3 هو نفسه [[io.open()]]. البراميتر [[newline]]: [[None]] (الافتراضي) بيحوّل أي [[\r\n]] أو [[\r]] لـ [[\n]] وهو بيقرا، وبيكتب [[os.linesep]] مكان كل [[\n]]. و [[""]] بيقرا من غير تحويل وبيكتب من غير تحويل. و [[str.count]] بيعدّ المرات اللي مش متداخلة، و [[str.replace]] بيغيّرهم كلهم. و [[sys.exit("msg")]] بيطبع على stderr ويخرج بـ ١، و [[sys.exit(0)]] نجاح. و [[echo]] في dash بيفسّر الـ escapes زي [[printf]] (ده المسموح في POSIX)، وفي bash لأ إلا بـ [[-e]].`,
            when: R`أي تعديل كود بسكربت: patch على سيرفر، أو migration لملفات إعدادات، أو تغيير نفس السطر في ٢٠ ريبو، أو أداة بتحدّث رقم إصدار. وبالذات لما الملفات جاية من ويندوز والسكربت شغّال على لينكس أو العكس.`,
            mistakes: R`تقرا بـ [[open(p)]] العادي فتقلب نهايات السطور. أو تقرا صح وتكتب سطر جديد بـ [[\n]] فالملف يتخلط. وتكتب [[\r\n]] في سكربت بيعدّي على shell. وتستخدم [[assert]] كفحص أمان. وتعمل [[replace]] من غير ما تعدّ فيغيّر مكان تاني مش قاصده. ومتعملش فحص «اتعمل قبل كده» فالتشغيل التاني يضيف السطر مرتين أو يقع. ومتبصّش على [[git diff --stat]] بعد السكربت.`
          },
          sol: R`السكربت الأول: [[count: 0]] و [[AssertionError]]، لأن [[old]] فيه [[\n]] والملف [[crlf=3 lf_only=0]].

السكربت الصح: [[deploy.ps1: crlf=3 lf_only=0 -> using CRLF]] و [[patched 1]]، و [[git diff --stat]] = [[2 insertions(+), 1 deletion(-)]]، و [[file]] = [[with CRLF line terminators]]. التشغيل التاني: [[already patched]] ورقم خروج ٠. وبـ [[2]]: [[expected 2 match(es), found 0]] ورقم خروج ١.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: ملف فيه [[a\r\nb\r\n]]. [[open(p).read()]] على لينكس هيرجّع إيه؟ وعلى ويندوز؟ و [[open(p, newline="").read()]]؟ اكتب بـ [[repr]] وبعدين جرّب على الاتنين.`, done: R`كتبت [['a\nb\n']] في الحالتين الأوليين (القراية بتحوّل على الاتنين)، و [['a\r\nb\r\n']] مع [[newline=""]]، والناتج طابق.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من وثيقة Python ([[help(open)]] في الـ REPL) اقرا جزء [[newline]] واكتب القيم الخمسة ([[None]] و [[""]] و [["\n"]] و [["\r"]] و [["\r\n"]]) وإيه اللي بيحصل في القراية والكتابة لكل واحدة.`, done: R`عندك جدول ٥ صفوف × عمودين، وفيه إن [[newline="\n"]] في الكتابة بيكتب LF حتى على ويندوز.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ ده (٤ مشاكل): [[s = open(p).read(); assert old in s; open(p, "w").write(s.replace(old, new))]]. شغّله على ملف CRLF على لينكس وشوف [[git diff --stat]]، وبعدين نسختك.`, done: R`البايظ قلب الملف LF (الـ diff الملف كله)، ونسختك فيها [[newline=""]] في الاتنين، وعدّ بدل [[in]]، و [[sys.exit]] بدل [[assert]]، وفحص «already patched»، والـ diff بقى السطور بتاعتك بس.` },
            { lvl: 'تطبيق', t: R`اعمل الفخ بإيدك: سكربت بيقرا CRLF صح ويضيف سطر بـ [[\n]]. شوف [[file]] و [[git diff | cat -A]]، وبعدين خلي السكربت يطبع [[mixed!]] ويرفض يكتب لو بعد التعديل [[crlf > 0 and lf_only > 0]].`, done: R`شفت [[with CRLF, LF line terminators]] والسطر الجديد من غير [[^M]]، ونسختك بترفض بـ [[mixed!]] ورقم خروج ١ والملف متلمسش.` },
            { lvl: 'تحدي', t: R`عمّم السكربت: [[patch.py <file> <old-file> <new-file> [count]]] بياخد النص القديم والجديد من ملفين (مكتوبين LF عادي)، ويحوّلهم لنهاية سطر الملف الهدف، ويشتغل على CRLF و LF ومن غير سطر فاضي في الآخر، ويطبع diff صغير قبل ما يكتب لو اديته [[--dry-run]].`, done: R`نفس الـ old/new اشتغلوا على نسخة CRLF ونسخة LF من نفس الملف، والاتنين [[git diff --ignore-cr-at-eol --stat]] = [[--stat]]، و [[--dry-run]] مبيغيّرش الملف، وتشغيله مرتين بيطبع [[already patched]].` },
            { lvl: 'تحدي', t: R`اكتب اختبار: [[test_patch.py]] (بـ [[unittest]] أو [[pytest]]) بيعمل ملفات مؤقتة CRLF و LF ومخلوطة، ويتأكد إن [[patch.py]]: بيحافظ على النوع، وبيرفض لو العدد غلط، و idempotent، وبيرفض المخلوط.`, done: R`٤ اختبارات بتعدّي، ولو شلت [[newline=""]] من الكتابة اختبار «بيحافظ على النوع» بيفشل على الأقل على نظام واحد (اكتب أنهي).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
PY=$(command -v python3 || command -v python)
git init -q tool && cd tool && git config core.autocrlf false
"$PY" -c "
CR, LF = chr(13), chr(10)
open('deploy.ps1', 'w', newline='').write((CR + LF).join(['\$Port = 443', 'Start-Service vpn']) + CR + LF)"
git add . && git commit -qm init
"$PY" -c "
s = open('deploy.ps1', encoding='utf-8', newline='').read()
print('naive count:', s.count('\$Port = 443' + chr(10) + 'Start-Service vpn'))"
cat > ../patch.py <<'PY'
import sys
p, want = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 1
CR, LF = chr(13), chr(10)
s = open(p, encoding="utf-8", newline="").read()
crlf = s.count(CR + LF); lf = s.count(LF) - crlf
nl = CR + LF if crlf > lf else LF
old = "$Port = 443" + nl + "Start-Service vpn"
new = "$Port = 8443" + nl + "Write-Host 'starting'" + nl + "Start-Service vpn"
if s.count(new) == want:
    print("already patched"); sys.exit(0)
n = s.count(old)
if n != want:
    sys.exit(f"expected {want} match(es), found {n}")
open(p, "w", encoding="utf-8", newline="").write(s.replace(old, new))
print("patched", n, "crlf" if nl == CR + LF else "lf")
PY
"$PY" ../patch.py deploy.ps1
git diff --stat | tail -1
git ls-files --eol deploy.ps1 | cut -c1-15
"$PY" ../patch.py deploy.ps1; echo "rc=$?"
"$PY" ../patch.py deploy.ps1 2; echo "rc=$?"`, expect: [R`naive count: 0`, R`patched 1 crlf`, R`2 insertions(+), 1 deletion(-)`, R`i/crlf  w/crlf`, R`already patched`, R`rc=0`, R`expected 2 match(es), found 0`, R`rc=1`] },
          ],
        },
        {
          cmd: "أداة من GitHub Releases بـ checksum",
          title: "نزّل أداة جاهزة من GitHub Releases، واتأكد إنها هي اللي اترفعت قبل ما تشغّلها",
          learn: R`تعرف آخر إصدار وعمره وملفاته بـ [[gh release view]]، وتنزّل الملف وملف الـ checksum بـ [[gh release download]]، وتقارن الهاش في bash و PowerShell صح، وتعرف الـ checksum بيثبت إيه ومبيثبتش إيه.`,
          out: R`[[MATCH]] بين الهاش المنشور والهاش المحسوب، والأداة بتطبع نسختها من فولدر جديد.`,
          desc: R`أداة (CLI لـ VPN مثلًا) بتنزل ZIP جاهز من صفحة Releases على GitHub. قبل ما تشغّلها: اتأكد إن الملف اللي نزل هو بالظبط اللي صاحب الأداة رفعه، مش نسخة اتبوّظت في التحميل أو اتغيّرت في السكة.

الترتيب:
1. [[gh release view -R <owner/repo> --json tagName,publishedAt,assets]]: آخر إصدار، وإمتى اتنشر، وأسامي الملفات.
2. [[gh release download <tag> -R <owner/repo> -p <ملف> -p <ملف>.dgst]] في فولدر جديد فاضي.
3. طلّع الهاش المنشور من ملف الـ checksum ([[grep -i SHA2-256]] أو [[sha256sum -c]]) واحسب هاش الملف ([[sha256sum]] أو [[Get-FileHash]]) وقارن.
4. فك الضغط وشغّل [[--version]].

وقاعدة قبل ما تضيف أي أداة أو package جديدة للمشروع: الإصدار يكون عدّى عليه **أسبوعين** على الأقل، عشان لو اتنشر إصدار مضروب يكون اتكشف واتشال.`,
          example: R`gh release view -R acme-tools/vpncli --json tagName,publishedAt,assets --jq '.tagName, .publishedAt, (.assets[] | select(.name | test("windows-64")) | .name)'
mkdir dl-vpncli && cd dl-vpncli
gh release download v1.4.2 -R acme-tools/vpncli -p "vpncli-windows-64.zip" -p "vpncli-windows-64.zip.dgst" --clobber
grep -i '^SHA2-256=' vpncli-windows-64.zip.dgst
want=$(grep -i '^SHA2-256=' vpncli-windows-64.zip.dgst | awk '{print $2}')
got=$(sha256sum vpncli-windows-64.zip | awk '{print $1}')
[ "$want" = "$got" ] && echo MATCH || echo MISMATCH
unzip -qo vpncli-windows-64.zip -d vpncli-1.4.2
./vpncli-1.4.2/vpncli version`,
          lines: [
            R`[[gh release view]] من غير tag = آخر إصدار. [[-R]] الريبو، و [[--json]] الحقول اللي عايزها، و [[--jq]] بيطلّع منها: الـ tag، وتاريخ النشر، وأسامي الملفات اللي فيها [[windows-64]] ([[select]] بيسيب العنصر لو الشرط صح، و [[test]] regex).`,
            R`فولدر **جديد فاضي** للتنزيل: ملفات جاية من بره ميتخلطوش بملفاتك، ولو فيها سكربت باسم ملف عندك ميتشغّلش بالغلط.`,
            R`[[download <tag>]] الإصدار ده بالظبط (مش «الأحدث» اللي ممكن يتغيّر بين الأمر ده والجاي)، و [[-p]] pattern لاسم الملف (ينفع أكتر من واحد، وينفع [[*]])، و [[--clobber]] اكتب فوق لو الملف موجود من تحميل قبل كده.`,
            R`ملف [[.dgst]] فيه سطر لكل نوع هاش ([[MD5=]] و [[SHA1=]] و [[SHA2-256=]] و [[SHA2-512=]]). [[^]] أول السطر، و [[-i]] من غير ما يفرّق بين الحروف.`,
            R`نفس السطر، و [[awk '{print $2}']] بياخد الكلمة التانية (الهاش نفسه). [[want=$(...)]] بيحطه في متغيّر.`,
            R`[[sha256sum]] بيحسب SHA-256 للملف ويطبع الهاش واسم الملف، و [[awk]] بياخد الهاش بس.`,
            R`[[ [ "$want" = "$got" ] ]] مقارنة نصين. لازم الاتنين نفس شكل الحروف (صغيرة)، تحت فيه فخ.`,
            R`[[-q]] من غير كلام، و [[-o]] اكتب فوق من غير ما تسأل، و [[-d]] فك في فولدر باسم الإصدار.`,
            R`أول تشغيل: يطبع نسخته. لو طبع نسخة غير اللي نزّلتها، أو طلب صلاحيات أدمن، أو حاول يتصل بحاجة، وقف.`,
          ],
          try: R`ابني «إصدار» محلي زي المعمل اللي في الشرح (ZIP و [[.dgst]] و [[checksums.txt]])، وانسخهم لفولدر تنزيل، وتأكد بالطريقتين (bash و PowerShell). وبعدين زوّد بايت في الـ ZIP واتأكد إن الطريقتين قالوا [[MISMATCH]].`,
          teach: R`## العَرَض

في شات أداة VPN لويندوز، الأداة بتعتمد على برنامج تاني بينزل ZIP جاهز من GitHub Releases. السؤال: إزاي تنزّله من الـ terminal، وتعرف إنه سليم، وتعرف إن الإصدار مش جديد زيادة عن اللزوم؟

> أوامر [[gh]] هنا اتجرّبت read-only على ريبو عام حقيقي بـ GitHub CLI 2.103، والأسامي والأرقام اتغيّرت لـ [[acme-tools/vpncli]]. وجزء الـ checksum اتجرّب كامل على «إصدار» محلي اتعمل بنفس الأدوات اللي مشاريع كتير بتستخدمها، على Git Bash و [[ubuntu:24.04]].

---

## ١. إيه آخر إصدار؟ وعمره كام؟

~~~bash
gh release view -R acme-tools/vpncli --json tagName,publishedAt,assets --jq '.tagName, .publishedAt, (.assets[] | select(.name | test("windows-64")) | .name)'
~~~

~~~text الناتج
v1.4.2
2026-10-26T19:20:08Z
vpncli-windows-64.zip
vpncli-windows-64.zip.dgst
~~~

| الحتة | معناها |
|---|---|
| [[gh release view]] | تفاصيل إصدار. من غير tag: آخر إصدار (الـ Latest) |
| [[-R acme-tools/vpncli]] | الريبو، فمش لازم تبقى جوه clone |
| [[--json tagName,publishedAt,assets]] | رجّع الحقول دي بس كـ JSON. ([[--json]] لوحده من غير حقول بيطبع أسامي الحقول المتاحة) |
| [[.assets[] | select(...)]] | لف على الملفات، وسيب اللي اسمه فيه [[windows-64]] |

وعمره بالأيام:

~~~bash
gh release view v1.4.2 -R acme-tools/vpncli --json tagName,publishedAt --jq '"\(.tagName) \(((now - (.publishedAt | fromdateiso8601)) / 86400) | floor) days"'
~~~

~~~text الناتج
v1.4.2 7 days
~~~

[[now]] الوقت دلوقتي بالثواني، و [[fromdateiso8601]] بيحوّل التاريخ لثواني، والفرق على ٨٦٤٠٠ (ثواني اليوم) و [[floor]] يقرّب لتحت. وفي bash: [[echo $(( ( $(date +%s) - $(date -d 2026-10-26T19:20:08Z +%s) ) / 86400 ))]]، وفي PowerShell: [[((Get-Date) - [datetime]'2026-10-26T19:20:08Z').Days]]. التلاتة طلّعوا [[7]].

**٧ أيام = أقل من أسبوعين.** لو هتضيفها لمشروع أو سيرفر، خد الإصدار اللي قبله: [[gh release list -R acme-tools/vpncli --limit 5 --json tagName,publishedAt,isLatest]] بيطبع الإصدارات وتواريخها. الإصدارات المضروبة (حساب صاحب الأداة اتسرق، أو مكتبة جواها اتغيّرت) غالبًا بتتكشف وتتشال في أيام، فالأسبوعين وقت كفاية إن غيرك يلاحظ.

---

## ٢. التنزيل

~~~bash
mkdir dl-vpncli && cd dl-vpncli
gh release download v1.4.2 -R acme-tools/vpncli -p "vpncli-windows-64.zip" -p "vpncli-windows-64.zip.dgst"
~~~

ولو شغّلته تاني في نفس الفولدر:

~~~text الناتج
vpncli-windows-64.zip.dgst already exists (use $__bt--clobber$__bt to overwrite file or $__bt--skip-existing$__bt to skip file)
~~~

رقم الخروج [[1]]. [[--clobber]] اكتب فوق، و [[--skip-existing]] سيب الموجود. ورسايل تانية حقيقية:

| الحالة | الرسالة |
|---|---|
| مفيش ملف بالاسم ده ([[-p "*arm99*"]]) | [[no assets match the file pattern]] |
| tag مش موجود ([[v9.9.9]]) | [[release not found]] |

والاتنين رقم خروج [[1]]، فسكربت بيقف لو اتعمل بـ [[|| exit 1]].

> ليه فولدر جديد؟ الملفات النازلة من النت «مش موثوقة» لحد ما تتأكد منها. لو اتفكّت في فولدر مشروعك ممكن تكتب فوق ملف عندك، ولو فيها سكربت اسمه زي أمر عندك ممكن يتشغّل بالغلط.

---

## ٣. التأكد: الـ checksum

### المعمل: «إصدار» محلي

~~~bash
mkdir -p ~/lab/gitcases2/release/src && cd ~/lab/gitcases2/release
printf '#!/bin/sh\necho "vpncli 1.4.2"\n' > src/vpncli && chmod +x src/vpncli
python3 -c "import zipfile; z = zipfile.ZipFile('vpncli-linux-64.zip', 'w'); z.write('src/vpncli', 'vpncli'); z.close()"
for m in md5 sha1 sha256 sha512; do openssl dgst -$m vpncli-linux-64.zip | sed 's/([^)]*)//g'; done > vpncli-linux-64.zip.dgst
sha256sum vpncli-linux-64.zip > checksums.txt
mkdir ../dl && cp vpncli-linux-64.zip vpncli-linux-64.zip.dgst checksums.txt ../dl/ && cd ../dl
~~~

- [[openssl dgst -sha256 <ملف>]] بيطبع [[SHA2-256(vpncli-linux-64.zip)= 5ca2...]]، و [[sed 's/([^)]*)//g']] بيشيل الجزء اللي بين القوسين، فيبقى [[SHA2-256= 5ca2...]]: ده شكل ملفات [[.dgst]] اللي مشاريع كتير بتنشرها.
- [[sha256sum <ملف> > checksums.txt]]: الشكل التاني المشهور، سطر لكل ملف: [[<هاش>  <اسم>]].

### شكل [[.dgst]]: [[grep]] و [[awk]]

~~~text cat vpncli-linux-64.zip.dgst
MD5= 1c127a81f24b6baa3fc...
SHA1= f62258578a2642ab05...
SHA2-256= 5ca2ec4320f8a7750f68...
SHA2-512= 50aed73be8eb96...
~~~

~~~bash
want=$(grep -i '^SHA2-256=' vpncli-linux-64.zip.dgst | awk '{print $2}')
got=$(sha256sum vpncli-linux-64.zip | awk '{print $1}')
[ "$want" = "$got" ] && echo MATCH || echo MISMATCH
~~~

~~~text الناتج
MATCH
~~~

ليه SHA2-256 ومش MD5 أو SHA1؟ الاتنين دول اتكسروا: ممكن حد يعمل ملفين مختلفين بنفس الهاش. SHA-256 مفيش طريقة معروفة لده.

### شكل [[checksums.txt]]: [[sha256sum -c]]

~~~text sha256sum -c checksums.txt
vpncli-linux-64.zip: OK
~~~

[[-c]] (check) بيقرا الملف، ولكل سطر يحسب الهاش ويقارن، ويطبع [[OK]] أو [[FAILED]]، ورقم الخروج [[0]] لو كله تمام. ولو الملف فيه أسامي ملفات كتير وانت نزّلت واحد بس:

~~~text sha256sum -c checksums.txt   (ملف واحد من ٢١ موجود)
sha256sum: vpncli_windows_arm64.zip: No such file or directory
vpncli_windows_arm64.zip: FAILED open or read
sha256sum: WARNING: 20 listed files could not be read
~~~

الحل [[--ignore-missing]]: بيتجاهل اللي مش موجود. **بس** لو ولا ملف موجود (اسم غلط مثلًا):

~~~text sha256sum -c --ignore-missing checksums.txt
sha256sum: checksums.txt: no file was verified
~~~

ورقم الخروج [[1]]، كويس: مبيعدّيش «مفيش حاجة اتفحصت» على إنها نجاح.

### الملف اتغيّر: زوّدنا بايت

~~~text printf 'x' >> vpncli-linux-64.zip ; sha256sum -c checksums.txt
vpncli-linux-64.zip: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
~~~

بايت واحد غيّر الهاش كله. ده اللي بيخلّي المقارنة تمسك أي تغيير.

---

## ٤. على PowerShell: [[Get-FileHash]] وفخ الحروف

~~~powershell
$f = Get-Item vpncli-windows-64.zip
$got = (Get-FileHash $f -Algorithm SHA256).Hash
$want = ((Select-String -Path *.dgst -Pattern '^SHA2-256=').Line -split ' ')[1]
$got
$want
$got -eq $want
$got -ceq $want
~~~

~~~text الناتج
98D0CFA794721665D7973DD728C78AFF7BD836D58F10F6D7A03568ECCB0A22E0
98d0cfa794721665d7973dd728c78aff7bd836d58f10f6d7a03568eccb0a22e0
True
False
~~~

- [[Get-FileHash]] بيرجّع الهاش **بحروف كبيرة**، والملفات المنشورة غالبًا صغيرة.
- [[-eq]] في PowerShell مبيفرّقش بين الحروف، فـ [[True]]. و [[-ceq]] (case-sensitive) بيفرّق، فـ [[False]] رغم إن الهاش هو هو.
- و [[Select-String]] زي [[grep]]، و [[.Line]] السطر اللي طابق، و [[-split ' ']] بيقسمه على المسافة، و [[[1]]] التاني.

ونفس الفخ في bash بالعكس: لو نسخت الهاش من PowerShell ([[98D0...]]) وقارنته بـ [[=]] في bash بالهاش من [[sha256sum]] ([[98d0...]])، بيطلع [[MISMATCH (case)]]. الحل: وحّد الحروف قبل المقارنة: [[$__{got,,}]] في bash بتحوّل لحروف صغيرة، أو [[$got.ToLower()]] في PowerShell.

وجرّبنا تغيير بايت على PowerShell كمان: [[(Get-FileHash tampered.zip -Algorithm SHA256).Hash -eq $want]] = [[False]].

### الفك والتشغيل

~~~powershell
Expand-Archive $f -DestinationPath vpncli-1.4.2 -Force
& .\vpncli-1.4.2\vpncli.exe version
~~~

[[Expand-Archive]] بيفك ZIP، و [[-Force]] يكتب فوق. و [[&]] (call operator) بيشغّل برنامج من مسار. على الريبو العام اللي جرّبنا عليه الأداة طبعت نسختها وتاريخها، ونفس الإصدار اللي نزّلناه.

---

## ٥. الـ checksum بيثبت إيه؟ ومبيثبتش إيه؟

| | الـ checksum بيحميك؟ |
|---|---|
| التحميل اتقطع أو اتبوّظ | ✅ الهاش هيختلف |
| حد غيّر الملف في السكة (proxy، أو mirror) | ✅ لو الـ checksum جه من مكان موثوق |
| صاحب الحساب نفسه اتسرق، ورفع ملف مضروب **و** checksum جديد معاه | ❌ الاتنين هيطابقوا بعض |
| الأداة نفسها فيها باب خلفي من الأول | ❌ الـ checksum بيثبت إنها هي، مش إنها آمنة |

عشان الحالة التالتة فيه طبقات أقوى:

- **[[digest]] من GitHub نفسه:** [[gh release view v1.4.2 -R acme-tools/vpncli --json assets --jq '.assets[] | select(.name | endswith("windows-64.zip")) | .digest']] طلّع [[sha256:98d0cfa7...]]: هاش GitHub حسبه وقت ما الملف اترفع، ومش ملف ممكن يتعدّل جنب الـ ZIP. قارن الاتنين.
- **attestations:** [[gh release verify-asset]] و [[gh attestation verify]] بيتأكدوا بتوقيع إن الملف اتبنى من الريبو ده في GitHub Actions (من [[gh release verify-asset --help]]، والريبو لازم يكون بينشرها).
- **الأسبوعين:** وقت للناس تلاحظ.

---

## الطرق اللي اترفضت

| الطريقة | ليه لأ |
|---|---|
| تنزّل من المتصفح وتشغّل على طول | مفيش أي تأكد، والملف في Downloads جنب كل حاجة |
| [[curl -L <رابط> | sh]] أو [[iwr ... | iex]] | بيشغّل اللي نزل قبل ما تشوفه أو تتأكد منه |
| تقارن بـ MD5 لأنه أقصر | MD5 مكسور |
| تقارن بعينك أول ٦ حروف | ممكن يتعمل ملف أوله زي أول الهاش، والعين بتغلط |
| [[gh release download]] من غير tag | بينزّل «الأحدث» وقت التشغيل، فممكن تتأكد من إصدار وتنزّل التاني |
| آخر إصدار عمره أيام | خد اللي قبله |

---

## الخلاصة

| الخطوة | bash | PowerShell |
|---|---|---|
| آخر إصدار وعمره | [[gh release view --json tagName,publishedAt,assets]] | نفس الأمر |
| التنزيل | [[gh release download <tag> -p ... --clobber]] | نفس الأمر |
| الهاش المنشور | [[grep -i '^SHA2-256=' x.dgst | awk '{print $2}']] | [[(Select-String ...).Line -split ' ']] |
| الهاش المحسوب | [[sha256sum x | awk '{print $1}']] | [[(Get-FileHash x -Algorithm SHA256).Hash]] |
| المقارنة | [[ [ "$want" = "$got" ] ]] بحروف صغيرة | [[-eq]] (مبيفرّقش) |
| ملف checksums | [[sha256sum -c --ignore-missing]] | [[Get-FileHash]] لكل سطر |

> الـ checksum بيقول «ده نفس الملف اللي اتنشر»، مش «ده ملف آمن». الأمان من مصدر الـ checksum، ومن عمر الإصدار، ومن الـ attestations.`,
          deep: {
            why: R`أي أداة بتشغّلها بتشتغل بصلاحياتك، وأداة VPN أو أي حاجة بتلمس الشبكة بتشتغل بصلاحيات أدمن غالبًا. فملف اتبوّظ أو اتغيّر = كود غريب بصلاحيات كاملة على جهازك. والتأكد بياخد ٣ أوامر، والمشكلة لو حصلت مش بتتصلّح.`,
            how: R`الهاش (SHA-256) دالة بتحوّل أي ملف لرقم طوله ٢٥٦ بت (٦٤ حرف hex)، وأي تغيير ولو بايت بيطلّع رقم مختلف تمامًا، ومفيش طريقة معروفة تعمل ملفين بنفس الرقم. صاحب الأداة بيحسبه وقت البناء وينشره، وانت بتحسبه على اللي نزل عندك. [[gh release]] بيكلّم GitHub API: [[view]] بيرجّع بيانات الإصدار (ومنها [[digest]] اللي GitHub حسبه للملف)، و [[download]] بينزّل الملفات اللي أساميها طابقت الـ patterns. والـ attestation توقيع بيربط هاش الملف بالـ workflow اللي بناه.`,
            when: R`أي برنامج بتنزّله كملف جاهز مش من package manager: أدوات CLI، و drivers، و binaries على سيرفر، وفي Dockerfile بيعمل [[curl]] لملف (تاب docker). وفي CI لما بتنزّل أداة في كل build. ومع package managers (npm و pip) الـ lock file بيعمل نفس الشغل بـ [[integrity]] (تاب node).`,
            mistakes: R`تشغّل الملف قبل ما تتأكد. أو تنزّل الـ checksum من نفس المكان المشكوك فيه وتعتبره ضمان. أو تقارن بـ MD5. أو تقارن نصين بحروف مختلفة فتفتكر الملف بايظ (أو بـ [[-eq]] في PowerShell وتفتكر الحروف مش فارقة في bash). أو [[sha256sum -c]] على ملف checksums كبير من غير [[--ignore-missing]] فتغرق في [[FAILED open or read]]. أو تنزّل «الأحدث» من غير tag. أو تضيف إصدار طلع امبارح.`
          },
          sol: R`[[MATCH]] بين [[SHA2-256=]] من الـ [[.dgst]] و [[sha256sum]]، و [[sha256sum -c checksums.txt]] = [[vpncli-linux-64.zip: OK]].

بعد [[printf 'x' >>]]: [[FAILED]] و [[WARNING: 1 computed checksum did NOT match]] ورقم خروج ١، والمقارنة اليدوية [[MISMATCH]].

PowerShell: [[Get-FileHash]] حروف كبيرة، [[-eq]] = [[True]] و [[-ceq]] = [[False]]، وبعد التغيير [[-eq]] = [[False]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: [[(Get-FileHash a.zip -Algorithm SHA256).Hash -eq 'ab12...']] والهاشين نفس الحروف بس واحد كبير. النتيجة إيه؟ وفي bash بـ [[=]]؟ وإزاي تخلّي الاتنين يتصرفوا نفس التصرف؟`, done: R`كتبت [[True]] في PowerShell و «مختلف» في bash، والحل توحيد الحروف ([[.ToLower()]] أو [[$__{x,,}]])، وجرّبت.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[gh release download --help]] اعرف الفرق بين [[--clobber]] و [[--skip-existing]] و [[-A zip]] و [[-D]]. وأنهي واحد بينزّل الكود نفسه مش الملفات المرفوعة؟`, done: R`كتبت سطر لكل واحد، وإن [[-A zip]] (أو [[tar.gz]]) بينزّل أرشيف الكود (زي «Source code» في الصفحة) مش الـ assets.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ ده: [[gh release download -R acme-tools/vpncli -p "*windows*" && unzip -o *.zip && ./vpncli version]]. فيه ٤ مشاكل (مفيش tag، ومفيش فولدر جديد، ومفيش checksum، و [[*windows*]] بيمسك ملفات كتير). اكتب نسخة على معمل الـ release المحلي (بدل [[gh]] انسخ الملفات).`, done: R`نسختك بتاخد tag كـ argument، وبتعمل فولدر جديد، وبتقارن SHA2-256 وبتقف بـ [[MISMATCH]] ورقم ١ قبل الفك، وبتنزّل الملف بالاسم بالظبط. ولو غيّرت بايت في الـ ZIP مبتفكّش.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: نزّل ملف checksums لأداة عامة مشهورة بتستخدمها (من صفحة Releases، أو [[gh release download -p "*checksums*"]])، وملف واحد صغير منها، واتأكد بـ [[sha256sum -c --ignore-missing]] وبـ PowerShell. وقارن كمان بحقل [[digest]] من [[gh release view --json assets]].`, done: R`التلاتة طابقوا، وكتبت اسم الملف والهاش أول ١٢ حرف، وعمر الإصدار بالأيام، وقرارك (تستخدمه ولا تاخد اللي قبله).` },
            { lvl: 'تحدي', t: R`ابني [[fetch-release]] (مشروع الوحدة الكبير) بس على «سيرفر» محلي: [[python -m http.server]] في فولدر الـ release، والسكربت ينزّل بـ [[curl]] من [[http://localhost:8000]]، ويرفض الإصدار لو تاريخه (من ملف [[release.json]] بتعمله) أقل من ١٤ يوم، ويقارن الهاش، ويفك في فولدر باسم الإصدار، ويكتب لوج.`, done: R`على إصدار عمره ٣٠ يوم بيطبع [[OK sha256]] والنسخة، وعلى إصدار عمره ٣ أيام بيرفض ويطبع [[too fresh: 3 days]]، وعلى ZIP متغيّر بيطبع [[MISMATCH]] ومبيفكّش، وتشغيله مرتين مبينزّلش تاني.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: لو حساب صاحب الأداة اتسرق ورفع ZIP مضروب و [[.dgst]] جديد، الـ checksum هيقول إيه؟ وإيه التلات حاجات اللي كانت هتحميك؟`, done: R`الشرح فيه إن الاتنين هيطابقوا لأنهم من نفس المصدر، والحماية: عمر الإصدار (الأسبوعين)، والـ attestations ([[gh attestation verify]])، ومقارنة بهاش من مصدر تاني (إعلان الإصدار، أو [[digest]] اللي اتسجّل قبل كده، أو package manager).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`windows`], sh: R`bash`, run: R`PY=$(command -v python3 || command -v python)
mkdir -p release/src && cd release
printf '#!/bin/sh\necho "vpncli 1.4.2"\n' > src/vpncli
"$PY" -c "import zipfile; z = zipfile.ZipFile('vpncli-64.zip', 'w'); z.write('src/vpncli', 'vpncli'); z.close()"
for m in md5 sha256; do openssl dgst -$m vpncli-64.zip | sed 's/([^)]*)//g'; done > vpncli-64.zip.dgst
if command -v sha256sum >/dev/null; then SUM="sha256sum"; else SUM="shasum -a 256"; fi
$SUM vpncli-64.zip > checksums.txt
mkdir ../dl && cp vpncli-64.zip vpncli-64.zip.dgst checksums.txt ../dl/ && cd ../dl
cut -c1-9 vpncli-64.zip.dgst
want=$(grep -i '^SHA2-256=' vpncli-64.zip.dgst | awk '{print $2}')
got=$($SUM vpncli-64.zip | awk '{print $1}')
[ "$want" = "$got" ] && echo MATCH || echo MISMATCH
$SUM -c checksums.txt
up=$(echo "$got" | tr a-f A-F); [ "$up" = "$want" ] && echo "case: MATCH" || echo "case: MISMATCH"
[ "$(echo "$up" | tr A-F a-f)" = "$want" ] && echo "lowercased: MATCH"
printf 'x' >> vpncli-64.zip
$SUM -c checksums.txt; echo "rc=$?"
got=$($SUM vpncli-64.zip | awk '{print $1}'); [ "$want" = "$got" ] && echo MATCH || echo "tampered: MISMATCH"`, expect: [R`SHA2-256=`, R`MATCH`, R`vpncli-64.zip: OK`, R`case: MISMATCH`, R`lowercased: MATCH`, R`vpncli-64.zip: FAILED`, R`rc=1`, R`tampered: MISMATCH`] },
          ],
        },
      ],
    }
]);
