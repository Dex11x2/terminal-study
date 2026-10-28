// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "توصل للأمر بنفسك في git",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تلاقي أمر git اللي بيعمل حاجة معينة من غير ما تفتح جوجل.`,
        R`تقرا سطر الاستخدام من الترمنال نفسه.`,
        R`تجرّب أي أمر خطير في git **من غير ما ينفّذ**.`,
        R`تقرا رسالة git وتعرف إنها بتقترح عليك الأمر اللي محتاجه.`,
      ],
      use: {
        prog: R`git نفسه مثال كويس على CLI كبير: ١٨٠ أمر مقسومين لطبقتين، وكل أمر فيه توثيق جواه. الدورة اللي هتتعلمها هنا هي نفسها مع [[docker]] و [[kubectl]] و [[npm]].`,
        net: R`على سيرفر من غير متصفح، [[git <أمر> -h]] هو المرجع الوحيد اللي معاك.`,
        cs: R`تقسيم git لـ porcelain و plumbing هو فصل بين **واجهة للبني آدم** و**واجهة للبرامج**. وده قرار تصميم بتلاقيه في كل نظام ناضج.`,
        work: R`أغلب أوامر git اللي بتخاف منها ليها وضع معاينة. تعرفه مرة، وتبطّل تخاف.`,
      },
      lab: R`mkdir -p ~/lab/gitlab && cd ~/lab/gitlab && git init -b main`,
      projects: [
        { t: R`ورقة الأوامر بتاعتك`, what: R`[[git help -a]] بتطلّع ١٨٠ أمر. خد منهم العشرة اللي بتستخدمهم، وحط جنب كل واحد سطر الاستخدام من [[-h]]، في ملف واحد. وبعد أسبوع راجعه وشيل اللي حفظته.` },
        { t: R`جرّب الخطير بأمان`, what: R`اعمل ريبو تجريبي ونفّذ فيه كل أمر بتخاف منه: [[clean -fd]] و [[reset --hard]] و [[rebase]] و [[filter-branch]]. كل واحد بـ [[-n]] أو [[--dry-run]] الأول وبعدين بجد. الريبو ده ملوش لازمة، فاكسره براحتك.` },
        { t: R`alias للمعاينة`, what: R`[[git config --global alias.cleanp "clean -nd"]] و [[alias.pushp "push --dry-run"]]. بقى عندك نسخة آمنة من كل أمر خطير على بُعد حرف.` },
      ],
      n: R`git فيه ١٨٠ أمر. والسؤال مش «احفظهم إزاي» — السؤال «ألاقي اللي محتاجه إزاي، وأجرّبه إزاي من غير ما أكسر حاجة»`,
      items: [
        {
          cmd: "git help -a و -g",
          title: "القايمة الكاملة، والأدلة اللي محدش بيعرفها",
          learn: R`تطلّع كل أوامر git مقسومة بالطبقات، وتلاقي أدلة مفاهيم مكتوبة جوه git نفسه.`,
          out: R`تعرف الأمر موجود ولا لأ قبل ما تدوّر عليه بره.`,
          use: {
            prog: R`التقسيم لـ porcelain و plumbing بيقولك أنهي أمر آمن تحطه في سكربت: اللي ناتجه للبني آدم ممكن يتغيّر، واللي للبرامج مستقر.`,
            cs: R`طبقتين فوق نفس البيانات: واحدة مريحة وواحدة دقيقة. ودي نفس فكرة الـ high-level و low-level API.`,
          },
          desc: R`أول سؤال في أي أداة كبيرة: **فيها إيه أصلًا؟**

[[git help -a]] بتطلّع **كل** الأوامر مع سطر وصف لكل واحد. وعلى النسخة اللي جرّبت عليها طلعوا **١٨٠ أمر**. ومش قايمة واحدة — دي مقسومة لمجموعات، وأهم تقسيم فيها اتنين:

**Main Porcelain Commands** — الأوامر اللي انت بتستخدمها: [[add]] و [[commit]] و [[branch]] و [[merge]]. اسمها «بورسلين» يعني الطبقة اللي بتلمسها، المصمَّمة للبني آدم. وناتجها ممكن يتغيّر بين النسخ عشان يبقى أوضح.

**Low-level Commands (plumbing)** — السباكة اللي تحت: [[rev-parse]] و [[cat-file]] و [[rev-list]] و [[for-each-ref]]. دي مصمَّمة **للبرامج**، وناتجها مستقر ومش بيتغيّر.

والتقسيم ده مش معلومة ثقافية — ده بيقولك أنهي أمر آمن تحطه في سكربت. [[git status]] ناتجه للبني آدم؛ [[git status --porcelain]] ناتجه للسكربتات. وهنستخدم ده في المشروع الجاي.

وفيه حاجة تانية قليل اللي يعرفها: [[git help -g]] بتطلّع **أدلة مفاهيم** مكتوبة جوه git — مش أوامر، شرح. فيها [[everyday]] (أقل مجموعة أوامر تحتاجها يوميًا) و [[glossary]] و [[workflows]] و [[datamodel]] (إزاي git بيخزّن الحاجات).`,
          example: R`# كل الأوامر، وعددهم
git help -a
git help -a | grep -cE '^   [a-z]'

# الأدلة (مفاهيم، مش أوامر)
git help -g

# دوّر على أمر فيه كلمة
git help -a | grep -i tag`,
          lines: [
            R`القايمة الكاملة، مقسومة لمجموعات.`,
            R`عدّهم: كل سطر أمر بيبدأ بتلات مسافات وحرف صغير.`,
            R`أدلة المفاهيم. دي مش أوامر — دي شرح مكتوب جوه git.`,
            R`أسرع طريقة تلاقي أمر وانت فاكر كلمة منه.`,
          ],
          try: R`شغّل [[git help -a]] وشوف المجموعات. وبعدين [[git help -g]] واقرا أسماء الأدلة. وبعدين [[git help -a | grep -i branch]] وشوف كام أمر فيه الكلمة دي.`,
          mac: ["both", R`[[git help -a]] و [[-g]] شغالين زي ما هم على الماك ولينكس. الفرق الوحيد إن [[git help <أمر>]] على الماك ولينكس بتفتح الـ man page في الترمنال، وعلى ويندوز بتفتح المتصفح (الدرس الجاي).`],
          deep: {
            why: R`الأداة اللي فيها ١٨٠ أمر مستحيل تتحفظ. اللي بيفرق إنك تعرف تدوّر جواها. والتقسيم لطبقتين بيوفّر عليك فئة كاملة من الباگات في السكربتات.`,
            how: R`[[git help -a]] بتقرا قايمة الأوامر من git نفسه، مش من ملف توثيق. فهي بتعكس **النسخة اللي عندك** بالظبط، وبتشمل أي أمر خارجي اسمه [[git-xxx]] موجود في الـ PATH.

المجموعات اللي هتلاقيها: [[Main Porcelain Commands]]، و [[Ancillary Commands]] (مساعدة: [[config]] و [[gc]])، و [[Interacting with Others]] ([[send-email]])، و [[Low-level Commands]] مقسومة لأربع مجموعات فرعية.

الفرق العملي بين الطبقتين:

| | porcelain | plumbing |
|---|---|---|
| مصمَّم لـ | البني آدم | البرامج |
| الناتج | ممكن يتغيّر | مستقر |
| أمثلة | [[status]] و [[log]] | [[rev-parse]] و [[cat-file]] |

وفيه لخبطة في الاسم: [[git status --porcelain]] معناها «ناتج **للسكربتات**» — بالعكس تمامًا. السبب إن الخيار معناه «اعرض الناتج بالشكل المستقر بتاع الطبقة التحتانية».

[[git help -g]] بتطلّع الأدلة. وتقراها بـ [[git help <اسم الدليل>]]، زي [[git help everyday]]. ودي مكتوبة من فريق git نفسه، ومحدّثة مع النسخة.

ولو عايز تشوف أمر خارجي اتسطّب: أي ملف تنفيذي اسمه [[git-foo]] في الـ PATH بيبقى [[git foo]]. وعشان كده [[gh]] و [[git-lfs]] بيظهروا.`,
            when: R`أول ما تواجه مهمة في git مش عارف اسم أمرها. وقبل ما تكتب أي سكربت بيقرا ناتج git.`,
            mistakes: R`تقرا ناتج [[git status]] العادي في سكربت فيتكسر مع تحديث. أو تفتكر إن [[--porcelain]] معناها «للبني آدم». أو تدوّر على أمر في النت وهو مش موجود في نسختك أصلًا.`
          },
          teach: R`## السؤال الأول: git فيه إيه؟

~~~bash git 2.56
git help -a | grep -cE '^   [a-z]'
~~~

~~~text الناتج (اتشغّل فعلًا)
180
~~~

مية وتمانين أمر. مش هتحفظهم.

---

## ١. القايمة مقسومة، والتقسيم مهم

~~~text من git help -a (اتشغّل فعلًا)
See 'git help <command>' to read about a specific subcommand

Main Porcelain Commands
   add                     Add file contents to the index
   am                      Apply a series of patches from a mailbox
   archive                 Create an archive of files from a named tree
   bisect                  Use binary search to find the commit that introduced a bug
   branch                  List, create, or delete branches
   checkout                Switch branches or restore working tree files
   cherry-pick             Apply the changes introduced by some existing commits
   clean                   Remove untracked files from the working tree
~~~

| المجموعة | إيه هي |
|---|---|
| **Main Porcelain** | اللي بتستخدمه: [[add]] و [[commit]] و [[branch]] |
| Ancillary | مساعدة: [[config]] و [[gc]] |
| Interacting with Others | [[send-email]] و [[request-pull]] |
| **Low-level (plumbing)** | السباكة: [[rev-parse]] و [[cat-file]] |

---

## ٢. porcelain و plumbing: مش ثقافة، ده قرار عملي

~~~text التشبيه
porcelain  =  البورسلين اللي بتلمسه (الحوض)
plumbing   =  المواسير اللي تحته
~~~

| | porcelain | plumbing |
|---|---|---|
| مصمَّم لـ | البني آدم | **البرامج** |
| الناتج | ممكن يتغيّر بين النسخ | **مستقر** |
| في سكربت؟ | **لأ** | أيوه |

يعني [[git status]] في سكربت = وقت القنبلة. والصح [[git status --porcelain]].

> **ولاحظ اللخبطة:** [[--porcelain]] معناها «اعرض الناتج بشكل **السكربتات**» — بالعكس من الاسم. السبب إنها بتقول «اعرضه بالشكل المستقر بتاع الطبقة التحتانية».

---

## ٣. الأدلة اللي محدش بيعرفها

~~~bash
git help -g
~~~

~~~text الناتج (اتشغّل فعلًا)
The Git concept guides are:
   core-tutorial    A Git core tutorial for developers
   credentials      Providing usernames and passwords to Git
   datamodel        Git's core data model
   everyday         A useful minimum set of commands for Everyday Git
   faq              Frequently asked questions about using Git
   glossary         A Git Glossary
   submodules       Mounting one repository inside another
   tutorial         A tutorial introduction to Git
   workflows        An overview of recommended workflows with Git
~~~

دي **مش أوامر** — دي شرح مكتوب جوه git، من الفريق نفسه، ومحدّث مع نسختك.

| الدليل | ليه تقراه |
|---|---|
| [[everyday]] | أقل مجموعة أوامر تحتاجها فعلًا |
| [[datamodel]] | git بيخزّن إيه جواه |
| [[workflows]] | طرق شغل الفرق |
| [[glossary]] | المصطلحات: ref و HEAD و index |

وتقراه بـ [[git help everyday]].

---

## ٤. الدورة: من مهمة لأمر

~~~text
«عايز أشيل الملفات اللي مش في git»
      ↓
git help -a | grep -i clean
      ↓
clean   Remove untracked files from the working tree
      ↓
git clean -h          (الدرس الجاي)
      ↓
git clean -n          (المعاينة — الدرس اللي بعده)
~~~

---

## ٥. والأوامر الخارجية

أي ملف تنفيذي اسمه [[git-foo]] في الـ PATH بيبقى [[git foo]].

وعشان كده [[git lfs]] بيشتغل بعد ما تسطّب [[git-lfs]]، وبيظهر في [[git help -a]] كمان.

---

## الخلاصة

- [[git help -a]] بتطلّع كل الأوامر من **نسختك انت**.
- porcelain للبني آدم، plumbing للبرامج.
- [[--porcelain]] كخيار معناها **العكس**: ناتج للسكربتات.
- [[git help -g]] فيها أدلة مفاهيم، و [[everyday]] أحسن بداية.
- [[git help -a | grep]] أسرع من جوجل.`,
          sol: R`عدد الأوامر في نسخة 2.56، وأسماء الأدلة. الأرقام دي من جهازي — شوف نسختك انت.`,
          solCode: R`git help -a | grep -cE '^   [a-z]'
git help -g

# الناتج (اتشغّل فعلًا، git 2.56.0.windows.3):
# 180
#
# The Git concept guides are:
#    core-tutorial    A Git core tutorial for developers
#    datamodel        Git's core data model
#    everyday         A useful minimum set of commands for Everyday Git
#    glossary         A Git Glossary
#    workflows        An overview of recommended workflows with Git`
        },

        {
          cmd: "git <أمر> -h",
          title: "سطر الاستخدام في الترمنال، مش في المتصفح",
          learn: R`تقرا سطر استخدام أي أمر git من غير ما تخرج من الترمنال.`,
          out: R`تعرف الخيارات المتاحة في ثانية، مش في بحث.`,
          use: {
            prog: R`قراية التوقيع قبل الاستخدام عادة بتوفّر محاولات غلط. وفي git التوقيع فيه كل الأشكال اللي الأمر بياخدها.`,
            net: R`على سيرفر مفيهوش متصفح ولا man، الـ [[-h]] هي كل اللي معاك.`,
          },
          desc: R`لكل أمر في git طريقتين تقرا عنه:

[[git <أمر> -h]] — **سطر الاستخدام القصير**، بيتطبع في الترمنال على طول. فيه كل الأشكال اللي الأمر بياخدها وكل خيار بسطر.

[[git help <أمر>]] — **الدليل الكامل**، فيه الشرح والأمثلة والتفاصيل.

والفرق العملي بينهم على ويندوز كبير: [[git help <أمر>]] على لينكس والماك بتفتح الـ man page في الترمنال. وعلى ويندوز، لو مفيش [[man]] ولا ملفات توثيق محلية (وده الوضع الافتراضي في Git for Windows)، بتفتح **المتصفح**.

يعني لو انت على ويندوز وعايز تفضل في الترمنال: [[-h]] هي اللي تستخدمها.

وسطر الاستخدام نفسه بيتقري زي أي سطر استخدام (نفس قواعد الدرس بتاع SYNOPSIS):

[[[ ]]] اختياري.
[[< >]] حاجة انت بتحطها.
[[|]] يا ده يا ده.
[[...]] بيتكرر.
والسطور اللي بتبدأ بـ [[or:]] أشكال تانية للأمر.`,
          example: R`# سطر الاستخدام القصير، في الترمنال
git tag -h

# وكود الخروج بتاعه
git tag -h >/dev/null 2>&1; echo "code=$?"

# الدليل الكامل (على ويندوز: بيفتح المتصفح)
git help tag

# ودي تشتغل على أي أمر
git clean -h
git log -h`,
          lines: [
            R`بيطبع سطر الاستخدام في الترمنال وبيخرج.`,
            R`بيرجّع **صفر**. وده مش بديهي — في أدوات كتير [[-h]] بترجّع ١.`,
            R`الدليل الكامل. وعلى ويندوز من غير man وملفات محلية، بيفتح المتصفح.`,
            R`نفس الحاجة لأي أمر.`,
            R`وأي أمر تاني.`,
          ],
          try: R`شغّل [[git tag -h]] واقرا الأشكال التلاتة. وبعدين [[git clean -h]] ودوّر على [[-n]] و [[-d]]. وبعدين جرّب [[git help tag]] وشوف بيحصل إيه على جهازك.`,
          mac: ["diff", R`على الماك ولينكس، [[git help tag]] بتفتح الـ man page في الترمنال (وبتخرج منها بـ [[q]]). على ويندوز بتفتح المتصفح لأن مفيش [[man]]. أما [[git tag -h]] فبتطبع في الترمنال في الأنظمة التلاتة.`],
          deep: {
            why: R`الخروج من الترمنال للمتصفح بيقطع الشغل. و [[-h]] بتدّي ٨٠٪ من اللي محتاجه في نص ثانية.`,
            how: R`[[git <أمر> -h]] بيطبع سطر الاستخدام **من الأمر نفسه**، لأن كل أمر في git معرّف خياراته في كوده. فالناتج دايمًا مطابق لنسختك.

وبيرجّع **صفر**، مش زي بعض الأدوات اللي بتعتبر [[-h]] خطأ. ودي مفيدة في سكربت: [[git foo -h >/dev/null 2>&1]] طريقة تفحص بيها إن الأمر موجود.

[[git help <أمر>]] بيدوّر على التوثيق بالترتيب ده: [[man]] الأول، وبعدين [[info]]، وبعدين HTML. وتقدر تجبره: [[git help --web tag]] أو [[--man]] أو [[--info]].

وتقدر تثبّت الاختيار: [[git config --global help.format html]] أو [[man]] أو [[web]].

وعلى Git for Windows، الإصدارات الحديثة بتيجي من غير ملفات man ومن غير ملفات توثيق محلية، فـ [[git help]] بتروح للتوثيق أونلاين في المتصفح. فلو مش على نت، [[-h]] هي الوحيدة اللي شغالة.

وحاجة لطيفة: [[git help --all]] هي نفسها [[git help -a]]، و [[git <أمر> --help]] هي نفسها [[git help <أمر>]] — بس [[-h]] (بشرطة واحدة وحرف واحد) **مختلفة تمامًا** عن [[--help]]. دي الوحيدة اللي بتطبع في الترمنال.`,
            when: R`كل مرة تستخدم خيار مش فاكره. و [[-h]] أسرع من أي بحث.`,
            mistakes: R`تكتب [[--help]] وتستنى ناتج في الترمنال — دي بتفتح الدليل. أو تفتكر إن [[-h]] بترجّع كود خطأ. أو تدوّر في النت على خيار وانت نسختك مفيهاش.`
          },
          teach: R`## شرطة واحدة مقابل شرطتين

| | بيعمل إيه | فين |
|---|---|---|
| [[git tag -h]] | سطر الاستخدام القصير | **الترمنال** |
| [[git tag --help]] | الدليل الكامل | man أو **المتصفح** |
| [[git help tag]] | نفس [[--help]] | نفس الحاجة |

على ويندوز، التانية والتالتة بيفتحوا المتصفح. فلو عايز تفضل في الترمنال، **[[-h]]**.

---

## ١. الناتج الحقيقي

~~~bash git 2.56 · ويندوز 11
git tag -h
~~~

~~~text اتشغّل فعلًا
usage: git tag [-a | -s | -u <key-id>] [-f] [-m <msg> | -F <file>] [-e]
               [(--trailer <token>[(=|:)<value>])...]
               <tagname> [<commit> | <object>]
   or: git tag -d <tagname>...
   or: git tag [-n[<num>]] -l [--contains <commit>] [--no-contains <commit>]
               [--points-at <object>] [--column[=<options>] | --no-column]
               [--create-reflog] [--sort=<key>] [--format=<format>]
               [--merged <commit>] [--no-merged <commit>] [<pattern>...]
   or: git tag -v [--format=<format>] <tagname>...

    -l, --list            list tag names
    -n[<n>]               print <n> lines of each tag message
~~~

---

## ٢. اقراه إزاي

| الرمز | معناه |
|---|---|
| [[[ ]]] | اختياري |
| [[< >]] | حاجة انت بتحطها |
| [[|]] | يا ده يا ده |
| [[...]] | بيتكرر |
| [[or:]] | **شكل تاني للأمر** |

بص على الناتج فوق: [[git tag]] له **أربع صور** مختلفة — واحدة بتعمل tag، وواحدة بتمسح ([[-d]])، وواحدة بتعرض ([[-l]])، وواحدة بتتحقق ([[-v]]).

ودي معلومة أهم من أي خيار: الأمر الواحد في git ممكن يكون كذا أمر في الحقيقة.

---

## ٣. وبيرجّع صفر

~~~bash
git tag -h >/dev/null 2>&1; echo "code=$?"
~~~

~~~text اتشغّل فعلًا
code=0
~~~

مش بديهي — في أدوات كتير [[-h]] بتترجّع ١ لأنها بتعتبرها «استخدام غلط». وده بيخليها مفيدة في سكربت كفحص وجود.

---

## ٤. ليه المتصفح على ويندوز؟

[[git help <أمر>]] بتدوّر على التوثيق بالترتيب: [[man]]، وبعدين [[info]]، وبعدين HTML.

وعلى Git for Windows:

~~~text اتفحص فعلًا على الجهاز ده
man موجود؟                     لأ
ملفات التوثيق المحلية؟          0 ملف
~~~

فمفيش غير HTML — ومن هنا المتصفح.

ولو عايز تثبّت الاختيار:

~~~bash
git config --global help.format html
~~~

---

## ٥. وفي الممارسة

~~~bash الدورة الكاملة
git help -a | grep -i clean      # لقيت الأمر
git clean -h                      # قريت الاستخدام
git clean -nd                     # جرّبته من غير ما ينفّذ
git clean -fd                     # ونفّذت
~~~

التلات خطوات الأولانيين مجانًا، والرابعة بس هي اللي بتغيّر حاجة.

---

## الخلاصة

- [[-h]] في الترمنال، [[--help]] في المتصفح (على ويندوز).
- [[or:]] في الناتج معناها **شكل تاني للأمر**.
- [[-h]] بترجّع صفر.
- [[help.format]] بتثبّت الاختيار.`,
          sol: R`سطر الاستخدام بتاع [[git tag]] بأشكاله الأربعة، وكود الخروج.`,
          solCode: R`git tag -h
git tag -h >/dev/null 2>&1; echo "code=$?"

# الناتج (اتشغّل فعلًا، git 2.56.0.windows.3):
# usage: git tag [-a | -s | -u <key-id>] [-f] [-m <msg> | -F <file>] [-e]
#                [(--trailer <token>[(=|:)<value>])...]
#                <tagname> [<commit> | <object>]
#    or: git tag -d <tagname>...
#    or: git tag [-n[<num>]] -l [--contains <commit>] ...
#    or: git tag -v [--format=<format>] <tagname>...
#
#     -l, --list            list tag names
#     -n[<n>]               print <n> lines of each tag message
#
# code=0`
        },

        {
          cmd: "المعاينة في git: -n و --dry-run",
          title: "شوف هيعمل إيه قبل ما يعمله",
          learn: R`تشغّل أوامر git الخطيرة في وضع المعاينة، وتعرف أنهي أمر ليه وضع كده.`,
          out: R`تبطّل تخاف من [[clean]] و [[rm]] و [[push]].`,
          use: {
            prog: R`الـ dry run موجود في كل أداة بتغيّر حاجات: [[terraform plan]] و [[rsync --dry-run]] و [[npm --dry-run]]. نفس الفكرة، نفس العادة.`,
            net: R`[[git push --dry-run]] بتقولك هتدفع إيه قبل ما تدفع. وعلى فرع مشترك، دي الفرق بين دفعة عادية ومشكلة.`,
            work: R`الأمر اللي جرّبته في وضع المعاينة مرة بتبطّل تخاف منه. والأوامر اللي بتخاف منها هي اللي بتضطرك تعمل الحاجة بإيدك.`,
          },
          desc: R`أغلب أوامر git اللي بتخاف منها ليها وضع معاينة. والمشكلة إن الاسم مش موحّد:

[[-n]] أو [[--dry-run]] في [[clean]] و [[rm]] و [[add]] و [[push]] و [[fetch]] و [[mv]].
[[--no-commit]] في [[merge]] — بيعمل الدمج بس بيقف قبل الـ commit.
[[--stat]] أو [[--name-only]] في [[apply]] — بيوريك هيغيّر إيه.
[[--check]] في [[apply]] — بيفحص إن الباتش هيتطبّق من غير ما يطبّقه.

والفرق في المعنى بسيط بس مهم: [[-n]] في [[clean]] و [[rm]] بتقولك **إيه هيحصل**. و [[--no-commit]] في [[merge]] **بتعمل الشغل** بس بتسيبك تراجع قبل ما تثبّته — وده أقوى، لأنك بتشوف النتيجة نفسها مش وصفها.

والأوامر اللي **مالهاش** وضع معاينة هي اللي محتاجة انتباه أكتر: [[reset --hard]] و [[checkout -- .]] و [[rebase]]. ودول بيتجرّبوا بطريقة تانية: اعمل فرع مؤقت الأول، أو اعتمد على [[git reflog]] في الرجوع.

وفيه قاعدة بسيطة: لو الأمر هيمسح حاجة **مش في git**، معاينته إجبارية. لأن اللي في git بيترجّع، واللي مش فيه بيروح للأبد.`,
          example: R`# clean: الملفات اللي مش في git
git clean -nd

# rm: شيل ملف من git
git rm -n f5.txt

# add: إيه اللي هيتضاف
git add -n .

# merge: اعمل الدمج بس متعملش commit
git merge --no-commit --no-ff feature
git merge --abort

# push: هيدفع إيه
git push --dry-run origin main`,
          lines: [
            R`[[-n]] معاينة و [[-d]] تشمل الفولدرات. **ابدأ بيها دايمًا** قبل [[-fd]].`,
            R`بيقولك هيشيله من الـ index، والملف بيفضل على القرص.`,
            R`بيوريك إيه اللي هيتضاف، مفيد قبل [[git add .]] في ريبو مش فاهمه.`,
            R`بيدمج فعلًا بس بيقف قبل الـ commit، فتقدر تشوف النتيجة بعينك.`,
            R`وبترجّع كل حاجة زي ما كانت.`,
            R`بيقولك هيدفع أنهي refs لفين، من غير ما يدفع.`,
          ],
          try: R`اعمل ملف مش في git وفولدر، وشغّل [[git clean -nd]] وشوف الرسالة، وبعدين اتأكد إن الملفات لسه موجودة. وبعدين جرّب [[git merge --no-commit]] على فرع و [[git merge --abort]].`,
          mac: ["both", R`كل أوضاع المعاينة دي شغالة زي ما هي على الماك ولينكس.`],
          deep: {
            why: R`اللي في git بيترجّع من [[reflog]]. واللي مش في git — الملفات الجديدة اللي لسه مضفتهاش — بيروح للأبد مع [[clean -fd]]. ودي أكتر خسارة بتحصل فعلًا.`,
            how: R`[[git clean -n]] بترجّع نفس القايمة اللي [[-f]] هتمسحها بالظبط، لأنها بتستخدم نفس المنطق. و [[-d]] بتضيف الفولدرات، و [[-x]] بتضيف اللي في [[.gitignore]] كمان — و [[-nx]] ضرورية قبل [[-fx]] لأن دي بتمسح [[node_modules]] و [[.env]].

[[git rm -n]] بتوريك اللي هيتشال من الـ index. و [[git rm --cached -n]] بتوريك اللي هيتشال من git **من غير** ما يتمسح من القرص.

[[git merge --no-commit --no-ff]]: الـ [[--no-ff]] مهمة معاها، لأن من غيرها لو الدمج fast-forward مفيش commit أصلًا فالـ [[--no-commit]] مالهاش معنى. وبعدها [[git merge --abort]] بترجّع كل حاجة، أو [[git commit]] بتثبّت.

[[git push --dry-run]] بتعمل كل حاجة ماعدا الكتابة على الـ remote: بتتصل، وبتحسب اللي ناقص، وبتطبع. وعشان كده بتكشف مشاكل الصلاحيات والـ non-fast-forward قبل ما تحصل.

والأوامر اللي مالهاش معاينة:

| الأمر | بتجرّبه إزاي |
|---|---|
| [[reset --hard]] | [[git branch backup]] الأول |
| [[rebase]] | [[git rebase]] على فرع مؤقت |
| [[checkout -- .]] | [[git diff]] الأول، وشوف هتخسر إيه |

و [[git reflog]] هي شبكة الأمان الأخيرة لأي حاجة كانت في commit: بتفضل موجودة ٩٠ يوم افتراضيًا.`,
            when: R`كل مرة تستخدم أمر بيمسح أو بيدفع. وخصوصًا في ريبو مش انت عاملـه.`,
            mistakes: R`تعمل [[clean -fd]] على طول وتخسر ملفات جديدة. أو تنسى [[-x]] في المعاينة وتستخدمها في التنفيذ. أو تعمل [[merge --no-commit]] من غير [[--no-ff]] فميقفش. أو تفتكر إن [[reset --hard]] ليها [[--dry-run]].`
          },
          teach: R`## القاعدة في سطر

**لو الأمر هيمسح حاجة مش في git، معاينته إجبارية.** اللي في git بيترجّع من [[reflog]]؛ اللي مش فيه بيروح للأبد.

---

## ١. [[git clean -nd]]

~~~bash git 2.56
git clean -nd
~~~

~~~text الناتج (اتشغّل فعلًا)
Would remove b.log
Would remove junk/
~~~

والملفات؟

~~~text اتشغّل فعلًا
b.log
junk/:
a.log
~~~

**لسه موجودة.** [[-n]] بترجّع نفس القايمة اللي [[-f]] هتمسحها بالظبط.

| الخيار | بيضيف |
|---|---|
| [[-d]] | الفولدرات |
| [[-x]] | **اللي في [[.gitignore]] كمان** |

و [[-nx]] ضرورية قبل [[-fx]]، لأن دي بتمسح [[node_modules]] و [[.env]].

---

## ٢. [[git rm -n]] و [[git add -n]]

~~~text اتشغّل فعلًا
$ git rm -n f5.txt
rm 'f5.txt'
f5 لسه موجود؟ أيوه

$ git add -n .
add 'b.log'
add 'junk/a.log'
~~~

[[git add -n]] مفيدة قبل [[git add .]] في ريبو مش فاهمه: بتوريك إيه اللي داخل.

---

## ٣. [[merge --no-commit]]: أقوى من المعاينة

~~~bash
git merge --no-commit --no-ff feature
~~~

~~~text الناتج (اتشغّل فعلًا)
Automatic merge went well; stopped before committing as requested
~~~

دي **عملت الدمج فعلًا** بس وقفت قبل الـ commit. يعني تقدر تفتح الملفات وتشوف النتيجة بعينك، مش وصفها.

وبعدها اختيارين:

~~~bash
git commit          # ثبّتها
git merge --abort   # رجّع كل حاجة
~~~

~~~text بعد abort (اتشغّل فعلًا)
(git status --porcelain فاضي — الشجرة رجعت زي ما كانت)
~~~

> [[--no-ff]] مهمة معاها: من غيرها، لو الدمج fast-forward مفيش commit أصلًا، فـ [[--no-commit]] مالهاش معنى.

---

## ٤. الأسماء مش موحّدة

| الأمر | وضع المعاينة |
|---|---|
| [[clean]] و [[rm]] و [[add]] و [[mv]] | [[-n]] |
| [[push]] و [[fetch]] | [[--dry-run]] |
| [[merge]] | [[--no-commit --no-ff]] |
| [[apply]] | [[--check]] أو [[--stat]] |

ولما تشك: [[git <أمر> -h | grep -i dry]].

---

## ٥. واللي مالهاش معاينة

| الأمر | بتجرّبه إزاي |
|---|---|
| [[reset --hard]] | [[git branch backup]] الأول |
| [[rebase]] | على فرع مؤقت |
| [[checkout -- .]] | [[git diff]] الأول |

و [[git reflog]] هي شبكة الأمان لأي حاجة كانت في commit — بتفضل ٩٠ يوم.

---

## ٦. خليها على بُعد حرف

~~~bash
git config --global alias.cleanp "clean -nd"
git config --global alias.pushp  "push --dry-run"
~~~

دلوقتي [[git cleanp]] قبل [[git clean -fd]] مش محتاجة مجهود.

---

## الخلاصة

- [[-n]] بتوصف، و [[--no-commit]] **بتعمل وتوقف** — والتانية أقوى.
- [[clean -nd]] قبل [[clean -fd]]، دايمًا.
- [[-x]] بتشمل [[.gitignore]] — خد بالك.
- [[push --dry-run]] بتكشف مشاكل الصلاحيات بدري.
- اللي مالهوش معاينة: اعمل فرع نسخة الأول.`,
          sol: R`[[clean -nd]] والملفات بعدها، و [[merge --no-commit]] والرجوع — كلهم بناتجهم الحقيقي.`,
          solCode: R`git clean -nd
# Would remove b.log
# Would remove junk/
# والملفات لسه موجودة بعدها

git rm -n f5.txt
# rm 'f5.txt'      <-- والملف لسه موجود

git merge --no-commit --no-ff feature
# Automatic merge went well; stopped before committing as requested
git merge --abort
# والشجرة رجعت زي ما كانت

# (اتشغّل فعلًا على git 2.56.0.windows.3)`
        },

        {
          cmd: "git بيقترح عليك الأمر",
          title: "اقرا الرسالة بدل ما تنسخها في جوجل",
          learn: R`تقرا رسائل git اللي فيها الحل مكتوب، و [[git status]] كبوصلة.`,
          out: R`تحل أغلب مشاكل git من الرسالة نفسها.`,
          use: {
            prog: R`رسالة الخطأ جزء من واجهة البرنامج. و git من أحسن الأمثلة: بيقولك المشكلة **والأمر اللي يحلها**.`,
            work: R`نسخ الرسالة في جوجل بياخد دقيقة. وقرايتها بتاخد عشر ثواني، والإجابة فيها.`,
            cs: R`الـ affordance: النظام الكويس بيوريك اللي تقدر تعمله في اللحظة دي، مش بيسيبك تخمّن.`,
          },
          desc: R`git من أكتر الأدوات اللي بتكتب رسائل مفيدة. المشكلة إن الناس بتنسخها في جوجل بدل ما تقراها.

وأهم أمر فيها مش رسالة خطأ أصلًا — ده [[git status]]. هو مش بيقولك الحالة بس، ده بيقولك **الأوامر المتاحة من اللحظة دي**:

«use "git restore --staged <file>..." to unstage»
«use "git restore <file>..." to discard changes in working directory»
«use "git push" to publish your local commits»

يعني [[git status]] بوصلة: بيقولك انت فين، وتقدر تروح فين، وبأي أمر.

ونفس الحاجة في رسائل الأخطاء:

لما تعمل [[git push]] على فرع جديد: «use git push --set-upstream origin <branch>» — الأمر كامل، انسخه ونفّذه.
لما يحصل conflict: «fix conflicts and run git commit» أو «use git merge --abort».
لما تعمل [[git pull]] والفروع متباعدة: بيقترح عليك [[--rebase]] أو [[--no-rebase]] وبيقولك إزاي تثبّت الاختيار.
ولما تكتب أمر غلط: «The most similar command is...».

والقاعدة: **اقرا آخر تلات سطور الأول**. git بيحط الاقتراح في الآخر عادة.`,
          example: R`# البوصلة
git status

# والنسخة اللي للسكربتات
git status --porcelain

# المختصرة
git status --short

# ولو كتبت أمر غلط
git stats`,
          lines: [
            R`الحالة + **الأوامر المتاحة دلوقتي**. اقرا السطور اللي فيها [[use "git ..."]].`,
            R`نفس المعلومة بشكل ثابت للسكربتات. فاضي = الشجرة نضيفة.`,
            R`شكل مختصر للبني آدم: حرفين وبعدين اسم الملف.`,
            R`git بيقترح الأمر الأقرب.`,
          ],
          try: R`عدّل ملف من غير ما تعمل [[add]]، وشغّل [[git status]] واقرا السطور اللي بتبدأ بـ [[(use ...)]]. وبعدين اعمل [[add]] وشغّل تاني وشوف الاقتراحات اتغيّرت.`,
          mac: ["both", R`الرسائل والاقتراحات واحدة في الأنظمة التلاتة.`],
          deep: {
            why: R`الوقت اللي بيضيع في جوجل أطول من الوقت اللي بتاخده قراية الرسالة. وفي نص الحالات، الرسالة فيها الأمر جاهز للنسخ.`,
            how: R`[[git status]] بيعرض تلات حاجات: الفرع وعلاقته بالـ remote، والملفات في الـ index، والملفات في شجرة العمل. وجنب كل قسم بيحط الأمر اللي بيتعامل معاه.

والرسائل دي اتغيّرت مع الوقت لتبقى أوضح: زمان كان بيقول [[git reset HEAD <file>]]، ودلوقتي بيقول [[git restore --staged <file>]]. وده بالظبط السبب اللي يخلي قراية ناتج [[git status]] في سكربت فكرة وحشة — الناتج ده **مصمَّم ليتغيّر**.

[[git status --porcelain]] بترجّع سطرين حرف لكل ملف: الأول حالة الـ index والتاني حالة شجرة العمل. [[??]] يعني مش متتبّع، و [[M ]] يعني معدّل ومضاف، و [[ M]] يعني معدّل ومش مضاف.

وفيه [[--porcelain=v2]] بتدّي تفاصيل أكتر بشكل ثابت كمان.

والاقتراح بتاع الأمر الغلط بيتحكم فيه [[help.autocorrect]]. لو حطيتها رقم (زي [[10]] يعني ثانية)، git **هينفّذ** الأمر الأقرب لوحده بعد المهلة دي. ومع [[prompt]] بيسألك. القيمة الافتراضية [[0]]: بيقترح بس.

وحاجة مفيدة: [[git <أمر> --advice]] مش موجودة، لكن فيه مجموعة إعدادات [[advice.*]] بتتحكم في الرسائل الإرشادية. ولو قفلتها (ناس بتعمل كده عشان الناتج يبقى أقصر)، بتخسر الاقتراحات دي.`,
            when: R`كل مرة git يقول حاجة. خصوصًا لو انت مستعجل.`,
            mistakes: R`تنسخ الرسالة في جوجل من غير ما تقراها للآخر. أو تقرا ناتج [[git status]] في سكربت. أو تقفل [[advice.*]] وتخسر الاقتراحات. أو تحط [[help.autocorrect]] برقم وتلاقي git بينفّذ أوامر مش قصدك.`
          },
          teach: R`## [[git status]] مش بيقول الحالة — ده بيقول اللي تقدر تعمله

~~~text نموذج من الناتج
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   app.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        notes.txt
~~~

**كل قسم جنبه الأمر بتاعه.** ده مش ناتج — ده قايمة خيارات.

---

## ١. اقرا آخر تلات سطور الأول

git بيحط الاقتراح في الآخر عادة:

| الموقف | اللي git بيقوله |
|---|---|
| push لفرع جديد | [[use git push --set-upstream origin <branch>]] |
| conflict | [[fix conflicts and run git commit]] |
| pull والفروع متباعدة | بيقترح [[--rebase]] أو [[--no-rebase]] ويقولك تثبّتها إزاي |
| أمر غلط | [[The most similar command is...]] |
| detached HEAD | [[use git switch -c <new-branch-name>]] |

في نص الحالات، الأمر **جاهز للنسخ**.

---

## ٢. تلات صور لنفس المعلومة

~~~bash
git status              # للبني آدم، طويل وفيه اقتراحات
git status --short      # للبني آدم، مختصر
git status --porcelain  # للسكربتات، ثابت
~~~

~~~text --short و --porcelain شكلهم واحد
?? dirty.txt
 M README.md
M  app.js
~~~

حرفين لكل ملف: **الأول** حالة الـ index، و**التاني** حالة شجرة العمل.

| الرمز | معناه |
|---|---|
| [[??]] | مش متتبّع |
| [[M ]] | معدّل **ومضاف** |
| [[ M]] | معدّل **ومش مضاف** |
| [[A ]] | ملف جديد مضاف |

> الفرق بين [[--short]] و [[--porcelain]] إن التانية **مضمونة متتغيّرش** بين النسخ. شكلهم واحد دلوقتي، بس واحدة بس منهم تعهّد.

---

## ٣. ليه متقراش [[git status]] في سكربت

رسائل [[git status]] **مصمَّمة تتغيّر** عشان تبقى أوضح:

~~~text زمان
(use "git reset HEAD <file>..." to unstage)
~~~

~~~text دلوقتي
(use "git restore --staged <file>..." to unstage)
~~~

السكربت اللي كان بيدوّر على [[git reset HEAD]] اتكسر. والسكربت اللي كان بيستخدم [[--porcelain]] لأ.

---

## ٤. الاقتراح لما تغلط في الاسم

~~~bash
git stats
~~~

~~~text
git: 'stats' is not a git command. See 'git --help'.

The most similar command is
        status
~~~

~~~bash وتقدر تخليه ينفّذها لوحده
git config --global help.autocorrect 10     # بعد ثانية
git config --global help.autocorrect prompt # يسألك
~~~

> [[10]] يعني **عشرة أعشار الثانية**. والافتراضي [[0]]: بيقترح بس ومش بينفّذ. خلّيها [[prompt]] لو عايز راحة من غير مفاجآت.

---

## ٥. ومتقفلش النصايح

فيه إعدادات [[advice.*]] بتتحكم في الرسائل الإرشادية. ناس بتقفلها عشان الناتج يبقى أقصر — وبتخسر بيها الاقتراحات اللي بتحل المشاكل.

---

## الخلاصة

- [[git status]] قايمة خيارات، مش تقرير حالة.
- اقرا **آخر تلات سطور** الأول.
- [[--porcelain]] للسكربتات، [[--short]] لعينك.
- ناتج [[git status]] العادي مصمَّم يتغيّر — متبنيش عليه.
- [[help.autocorrect prompt]] مفيدة؛ الرقم خطر.`,
          sol: R`الصور التلاتة لناتج [[git status]]، وإزاي تقرا الحرفين.`,
          solCode: R`git status --short
# ?? dirty.txt      مش متتبّع
#  M README.md      معدّل ومش مضاف
# M  app.js         معدّل ومضاف

# والحرفين: الأول حالة الـ index، والتاني حالة شجرة العمل.
# و --porcelain شكلها زي --short بالظبط، بس هي الوحيدة
# المضمونة إنها متتغيّرش بين نسخ git — فهي اللي تستخدمها في سكربت.`
        }
      ]
    }
]);
