// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "Git في السكربتات والإعدادات",
      l: 2,
      n: "سكربت يسأل Git «فيه تغييرات؟»، ومشاكل الملكية ونهايات السطور بين ويندوز ولينكس",
      items: [
        {
          cmd: "git diff --quiet",
          title: "اعرف فيه تغييرات ولا لأ من سكربت",
          desc: R`[[--quiet]] بيخلي [[git diff]] ميطبعش حاجة ويرجع exit code بس: 0 لو مفيش فرق، و 1 لو فيه.

فالسكربت يقدر يسأل «فيه حاجة أعملها commit؟» قبل ما يعمل commit، بدل ما Git يطلع «nothing to commit» والسكربت يقع.`,
          example: R`git add -A
git diff --cached --quiet
echo $?
git diff --cached --quiet || git commit -m "backup $(date +%F)"
git diff --quiet || echo "فيه تعديلات لسه متجهزتش"
test -z "$(git status --porcelain)" && echo "clean"`,
          try: "اعمل سكربت باك أب صغير بالسطر الرابع، وشغّله مرتين ورا بعض: المرة التانية المفروض متعملش commit.",
          deep: {
            why: "سكربت باك أب أو deploy بيعمل [[git add -A]] و [[git commit]] كل ساعة. لو مفيش تغييرات، [[git commit]] بيرجع 1 ويطبع «nothing to commit»، والسكربت يفتكر إن حاجة فشلت ويقف، أو يبعتلك تنبيه على الفاضي.",
            how: R`[[git diff --cached]] (نفس [[--staged]]) بيقارن منطقة التحضير بآخر commit، يعني «إيه اللي هيدخل الـ commit». و [[--quiet]] بيقفل الطباعة ويشغّل [[--exit-code]]: 0 معناها مفيش فرق، و 1 معناها فيه.

وده عكس اللي ممكن تتوقعه: 0 (نجاح) يعني «مفيش تغييرات». فـ [[git diff --cached --quiet || git commit]] معناها: لو مفيش تغييرات (نجح) خلاص، لو فيه (فشل) اعمل commit.

[[git diff --quiet]] من غير [[--cached]] بيسأل عن التعديلات اللي لسه معملتلهاش add. والاتنين مبيشوفوش الملفات الجديدة اللي Git مش متابعها، عشان كده [[git add -A]] الأول. أو استخدم [[git status --porcelain]]: بيطبع سطر لكل تغيير من أي نوع، بشكل ثابت مبيتغيرش بين النسخ واللغات، فلو فاضي يبقى الـ repo نضيف.

في ملف bat على ويندوز: بعد الأمر [[if %errorlevel%==0 (echo no changes & exit /b 0)]]. وفي PowerShell: [[if ($LASTEXITCODE -eq 0) { exit 0 }]].`,
            when: "أي سكربت بيعمل commit لوحده: باك أب، أو تحديث ملف متولّد، أو bot. و [[--exit-code]] في CI عشان تتأكد إن ملف متولّد متحدّث (في تاب فحص الكود).",
            mistakes: R`تقرا الـ exit code بالعكس، فالسكربت يعمل commit لما مفيش تغييرات ويسكت لما فيه. وتنسى [[git add -A]] قبل [[--cached]]، فتلاقيه دايمًا 0 حتى والملفات متغيرة. وتقارن نص [[git status]] العادي في سكربت، والنص ده بيتغير مع اللغة ونسخة Git، فاستخدم [[--porcelain]].`
          },
          teach: R`## الأول: سكربت مبيقراش كلام، بيقرا أرقام

لما انت تشغّل Git بتقرا الرسالة. السكربت مبيقراش، بيبص على رقم بيرجع بعد كل أمر اسمه **exit code**: [[0]] يعني الأمر نجح، وأي رقم تاني يعني حاجة مش تمام. والدرس كله عن أمر بيستخدم الرقم ده كإجابة على سؤال «فيه تغييرات؟». المثال bash (Git Bash على ويندوز، أو لينكس، أو الماك)، والناتج من Git Bash على ويندوز (Git 2.56) في repo تجربة. نسخة PowerShell في الآخر.

### المشكلة اللي بنحلها

~~~text git commit -m x على repo نضيف
On branch main
nothing to commit, working tree clean
~~~

و الـ exit code [[1]]. يعني سكربت باك أب بيعمل commit كل ساعة هيفتكر إنه فشل في كل ساعة مفيهاش تعديل.

---

## ١. [[git add -A]]

[[-A]] (all): جهّز **كل** التغييرات في الـ repo: المتعدّل، والجديد، والممسوح. لازم الأول، عشان السؤال الجاي بيبص على منطقة التحضير بس.

## ٢. [[git diff --cached --quiet]]

| الحتة | معناها |
|---|---|
| [[git diff]] | قارن نسختين |
| [[--cached]] | منطقة التحضير ضد آخر commit (نفس [[--staged]]) |
| [[--quiet]] | متطبعش أي حاجة، ورجّع الإجابة في الـ exit code |

## ٣. [[echo $?]]

[[$?]] متغير في bash فيه exit code آخر أمر اتنفّذ. جرّبته مرتين:

~~~text repo نضيف
0
~~~

~~~text بعد تعديل ملف وملف جديد و git add -A
1
~~~

> خد بالك من القلبة: [[0]] (نجاح) معناها **مفيش** فرق، و [[1]] معناها **فيه**. [[diff]] بيعتبر «لقيت فرق» زي «فيه حاجة».

---

## ٤. [[git diff --cached --quiet || git commit -m "backup $(date +%F)"]]

نفكّه من جوه لبرة:

### [[date +%F]]

[[date]] بيطبع التاريخ، و [[+%F]] شكله: [[%F]] اختصار سنة-شهر-يوم:

~~~text الناتج
2026-10-06
~~~

### [[$(...)]]

اسمها command substitution: نفّذ اللي جوه الأقواس وحط ناتجه مكانه. فالرسالة بتبقى [["backup 2026-10-06"]]. وعلامات التنصيص [[" "]] (مش [[' ']]) لازمة عشان bash ينفّذ اللي جواها.

### [[||]]

«لو اللي قبلي **فشل** (رجع غير 0)، نفّذ اللي بعدي». فالسطر بيقول: لو مفيش تغييرات ([[0]]) خلاص، لو فيه ([[1]]) اعمل commit.

شغّلته مرتين ورا بعض:

~~~text أول مرة (فيه تعديلات)
[main 5462613] backup 2026-10-06
 2 files changed, 2 insertions(+)
 create mode 100644 notes.txt
~~~

المرة التانية مطبعتش حاجة خالص، والـ exit code بتاع السطر كله [[0]]، فالسكربت كمّل عادي.

---

## ٥. [[git diff --quiet || echo "..."]]

من غير [[--cached]]: ملفاتك ضد منطقة التحضير، يعني «فيه تعديلات لسه معملتلهاش add؟». بعد ما عدّلت [[a.txt]] من غير add:

~~~text الناتج
فيه تعديلات لسه متجهزتش
~~~

ولو جرّبته **بعد** [[git add -A]] بيرجع [[0]] دايمًا، لأن مبقاش فيه حاجة برا التحضير. ده أشهر غلط في الدرس.

---

## ٦. [[test -z "$(git status --porcelain)" && echo "clean"]]

### [[git status --porcelain]]

نسخة من [[status -s]] متصممة للسكربتات: شكلها ثابت مهما اتغيرت نسخة Git أو لغتها. وبتشمل الملفات الجديدة كمان، اللي [[diff]] مش بيشوفها:

~~~text الناتج بعد تعديل وملف جديد
 M a.txt
?? notes.txt
~~~

وعلى repo نضيف بتطبع **ولا حاجة**.

### [[test -z "..."]]

[[test]] بيسأل سؤال ويرجع [[0]] لو الإجابة آه. و [[-z]] (zero length) يعني «النص ده فاضي؟». و [[&&]] «لو نجح نفّذ اللي بعدي». فالسطر: لو [[--porcelain]] مطبعش حاجة، اطبع [[clean]]:

~~~text الناتج على repo نضيف
clean
~~~

---

## ٧. نفس الفكرة في PowerShell

PowerShell بيحط exit code آخر برنامج في [[$LASTEXITCODE]] بدل [[$?]]، و [[date +%F]] مش موجود، بداله [[Get-Date -Format yyyy-MM-dd]]:

~~~powershell
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m "backup $(Get-Date -Format yyyy-MM-dd)" }
if (-not (git status --porcelain)) { "clean" }
~~~

[[-ne 0]] يعني «مش بيساوي صفر». ده اتشغّل في Windows PowerShell 5.1 و PowerShell 7 الاتنين وطلع نفس النتيجة. و PowerShell 7 بيقبل كمان [[||]] زي bash بالظبط، أما 5.1 بيرفض السطر كله:

~~~text الناتج في Windows PowerShell 5.1
The token '||' is not a valid statement separator in this version.
~~~

---

## الخلاصة

| السؤال | الأمر | [[0]] معناها |
|---|---|---|
| فيه حاجة متجهزة؟ | [[git diff --cached --quiet]] | لأ |
| فيه تعديل مش متجهز؟ | [[git diff --quiet]] | لأ |
| الـ repo نضيف خالص؟ | [[test -z "$(git status --porcelain)"]] | آه، نضيف |

والسطر اللي هتنسخه في أي سكربت باك أب:

~~~bash
git add -A
git diff --cached --quiet || git commit -m "backup $(date +%F)"
~~~`,
          lines: [
            "جهّز كل التغييرات، حتى الملفات الجديدة والممسوحة.",
            "فيه حاجة متجهزة؟ مبيطبعش، بيرجع exit code بس.",
            "اطبع الـ exit code: 0 يعني مفيش تغييرات، و 1 يعني فيه.",
            "اعمل commit بس لو فيه تغييرات، ومن غير ما السكربت يقع لو مفيش.",
            "نفس السؤال على التعديلات اللي لسه متجهزتش.",
            "الـ repo نضيف خالص؟ [[--porcelain]] بيشمل الملفات الجديدة وشكله ثابت للسكربتات."
          ],
          sol: R`أول تشغيل: فيه تغييرات، فـ [[git diff --cached --quiet]] بيرجع 1، و [[||]] بيشغّل الـ commit ويطبع [[[main bc27540] backup 2026-09-30]]. تاني تشغيل: مفيش حاجة جديدة، فـ [[--quiet]] بيرجع 0، والـ commit مش بيتشغل والسكربت بيخلص ساكت. و [[git log --oneline]] بيوري commit باك أب واحد بس.

ولو شغلت [[echo $?]] بعد [[git diff --cached --quiet]] على repo نضيف هيطبع 0، وبعد تعديل متعمله add هيطبع 1.

الغلط الشائع: تستخدم [[git diff --quiet]] من غير [[--cached]] بعد [[git add -A]]، فيرجع 0 دايمًا لأن كل حاجة بقت staged، والباك أب عمره ما يتعمل.`,
          solCode: R`cat > backup.sh <<'EOF2'
git add -A
git diff --cached --quiet || git commit -m "backup $(date +%F)"
EOF2
echo data > notes.txt
bash backup.sh
bash backup.sh
git log --oneline -2`
        },
        {
          cmd: "safe.directory",
          title: "لما Git يقول dubious ownership",
          desc: R`من Git 2.35.2، Git بيرفض يشتغل في repo فولدره مملوك ليوزر غيرك، ويطلّع «detected dubious ownership». بيحصل لما تنقل هارد من جهاز تاني، أو تنسخ مشروع من ويندوز قديم، أو repo على سيرفر مملوك لـ root وانت شغال بيوزر تاني.

[[safe.directory]] بيقول لـ Git «الفولدر ده أنا واثق فيه».`,
          example: R`# fatal: detected dubious ownership in repository at 'D:/projects/myapp'
git config --global --add safe.directory D:/projects/myapp
git config --global --get-all safe.directory
git -c safe.directory='*' -C D:/projects/myapp status
sudo chown -R deploy:deploy /opt/myapp`,
          try: R`على سيرفر التجربة: [[sudo git clone]] لـ repo في /opt/test، وبعدين [[git status]] جواه كيوزر عادي وشوف الخطأ، وصلّحه بـ chown.`,
          deep: {
            why: "repo جوه فولدر مملوك لحد تاني ممكن يكون فيه [[.git/config]] أو hooks حطها اليوزر التاني، وأول ما تكتب [[git status]] جواه، Git ممكن يشغّل أوامره بصلاحياتك انت. عشان كده Git بقى يرفض لحد ما تقول صراحة إنك واثق.",
            how: R`Git بيقارن صاحب فولدر الـ repo باليوزر اللي مشغّل الأمر. لو مختلفين، يقف ويطبع المسار والأمر اللي يحل المشكلة.

[[--add safe.directory PATH]] بيضيف المسار لقايمة في [[~/.gitconfig]]. و [[--add]] مهمة لأن الإعداد ده بيقبل أكتر من قيمة، ومن غيرها بتكتب فوق اللي قبله. و [[--get-all]] بيعرض القايمة كلها.

على ويندوز اكتب المسار بـ / مش backslash، وزي ما Git طبعه في الرسالة بالظبط.

[[-c safe.directory='*']] بيدّي الإعداد للأمر ده بس من غير ما يتحفظ، و [[-C path]] بيشغّل Git كأنك جوه الفولدر ده. مفيد في سكربت فحص بيعدّي على repos كتير.

وعلى لينكس الحل الأنضف غالبًا مش safe.directory: الـ repo اتعمله clone بـ sudo فبقى ملك root. [[chown]] للمستخدم اللي بيشتغل عليه وخلاص.`,
            when: "أول ما تشوف الرسالة. وعلى سيرفر: قبل ما تضيف safe.directory، اعرف ليه الملكية غلط.",
            mistakes: R`[[safe.directory '*']] بـ [[--global]] عشان تخلص من الرسالة للأبد، فالحماية تتقفل لكل الفولدرات. استخدمه بس في حاويات أو CI كل حاجة فيها بتاعتك. وفي مشروع حقيقي الخطأ ظهر على repo اتنقل من جهاز تاني (الفولدر ملك يوزر ويندوز قديم): الحل safe.directory للفولدر ده بس، أو تاخد ملكية الفولدر من Properties ثم Security. ونسيان [[--add]]، فالمسار الجديد يمسح اللي قبله.`
          },
          teach: R`## الأول: Git بيسأل «الفولدر ده بتاع مين؟»

قبل أي أمر جوه repo، Git بيقارن **صاحب** فولدر الـ repo باليوزر اللي بيشغّل الأمر. لو مختلفين بيرفض، لأن [[.git/config]] و [[.git/hooks]] ممكن يبقى فيهم أوامر حطها صاحب الفولدر، و Git هيشغّلها بصلاحياتك انت. عشان أشوف الرسالة بجد، عملت repo في [[/opt/myapp]] بيوزر [[root]]، وشغّلت Git جواه بيوزر عادي اسمه [[deploy]]، على أوبونتو 24.04 جوه Docker (Git 2.43). على ويندوز نفس الرسالة بالظبط، بس المسار شكله [[D:/projects/myapp]] زي المثال، وده مقدرتش أعمله هنا من غير ما أغيّر ملكية فولدرات على الجهاز.

~~~text ls -ld /opt/myapp
drwxr-xr-x 3 root root 4096 Oct  6 11:26 /opt/myapp
~~~

[[root root]] يعني صاحب الفولدر root والجروب root.

---

## ١. الرسالة (أول سطر في المثال تعليق بيوريها)

~~~text git status كيوزر deploy
fatal: detected dubious ownership in repository at '/opt/myapp'
To add an exception for this directory, call:

	git config --global --add safe.directory /opt/myapp
~~~

| الجزء | معناه |
|---|---|
| [[dubious ownership]] | ملكية مشكوك فيها: الفولدر مش بتاعك |
| [[at '/opt/myapp']] | المسار بالظبط زي ما Git شايفه، انسخه زي ما هو |
| السطر الأخير | الأمر اللي يحلها، Git كاتبهولك جاهز |

والـ exit code [[128]]، وده رقم Git لأي [[fatal]].

---

## ٢. [[git config --global --add safe.directory D:/projects/myapp]]

| الحتة | معناها |
|---|---|
| [[--global]] | في ملفك انت ([[~/.gitconfig]])، لكل الـ repos |
| [[--add]] | **ضيف** قيمة جديدة، متمسحش اللي موجود |
| [[safe.directory]] | قايمة الفولدرات اللي انت واثق فيها رغم إنها مش بتاعتك |
| [[D:/projects/myapp]] | المسار. على ويندوز بـ [[/]] مش backslash، زي ما الرسالة كتبته |

الإعداد ده بيقبل **أكتر من قيمة**، عشان كده [[--add]]. ضفت فولدرين، وده الملف بعدها:

~~~text ~/.gitconfig
[safe]
	directory = /opt/myapp
	directory = /srv/other
~~~

ولو نسيت [[--add]]: لو فيه قيمة واحدة بتتكتب فوقها وتضيع، ولو فيه أكتر من قيمة Git بيرفض:

~~~text git config --global safe.directory /srv/third
warning: safe.directory has multiple values
error: cannot overwrite multiple values with a single value
       Use a regexp, --add or --replace-all to change safe.directory.
~~~

وبعد الإضافة، نفس [[git status]] بقى شغال: [[On branch main]].

## ٣. [[git config --global --get-all safe.directory]]

[[--get-all]]: اعرض **كل** قيم الإعداد ده، مش آخر واحدة بس:

~~~text الناتج
/opt/myapp
/srv/other
~~~

---

## ٤. [[git -c safe.directory='*' -C D:/projects/myapp status]]

| الحتة | معناها |
|---|---|
| [[-c safe.directory='*']] | إعداد مؤقت للأمر ده بس، ومش بيتكتب في أي ملف |
| [[*]] | أي فولدر |
| [[-C D:/projects/myapp]] | شغّل Git كأنك واقف في الفولدر ده (من غير [[cd]]) |
| [[status]] | الأمر نفسه |

~~~text الناتج كيوزر deploy
On branch main

No commits yet
...
~~~

اشتغل، ومفيش حاجة اتحفظت. ده مفيد في سكربت بيلف على repos كتير مرة واحدة، أو تشوف حاجة بسرعة.

> [[-c]] الصغيرة = config، و [[-C]] الكابيتال = directory. حرف واحد والفرق كبير.

---

## ٥. [[sudo chown -R deploy:deploy /opt/myapp]] (لينكس)

الحل الأنضف: بدل ما تقول لـ Git «اسكت»، خلّي الفولدر بتاع اليوزر اللي بيشتغل عليه.

| الحتة | معناها |
|---|---|
| [[sudo]] | بصلاحيات الأدمن، لأن تغيير الملكية محتاجها |
| [[chown]] | change owner |
| [[-R]] | recursive: الفولدر وكل اللي جواه |
| [[deploy:deploy]] | اليوزر:الجروب الجداد |

~~~text ls -ld /opt/myapp بعدها
drwxr-xr-x 3 deploy deploy 4096 Oct  6 11:26 /opt/myapp
~~~

و [[git status]] بقى يقول [[On branch main]] من غير أي safe.directory. (في التجربة كنت root فمحتجتش [[sudo]].) وعلى ويندوز المقابل إنك تاخد ملكية الفولدر من Properties ثم Security، أو safe.directory للفولدر ده بس.

---

## الخلاصة

| الحل | بيعمل إيه | إمتى |
|---|---|---|
| [[chown -R USER:USER DIR]] | يصلّح السبب: الفولدر يبقى بتاعك | لينكس، والفولدر المفروض يبقى بتاعك |
| [[--add safe.directory DIR]] | يثق في فولدر واحد للأبد | فولدر مش هتغيّر ملكيته (هارد خارجي، repo قديم) |
| [[-c safe.directory='*']] | يثق مرة واحدة للأمر ده | سكربت أو container |

ومتعملش [[--global safe.directory '*']]: كده قفلت الحماية على الجهاز كله.`,
          lines: [
            "سجّل الفولدر ده إنه آمن، في إعداداتك انت ([[--global]]).",
            "اعرض كل الفولدرات اللي سجّلتها.",
            "للأمر ده بس من غير ما تحفظ حاجة: [[-c]] إعداد مؤقت، و [[-C]] الفولدر.",
            "على لينكس: الحل الأصلي، رجّع ملكية الفولدر لليوزر اللي بيشتغل عليه."
          ],
          sol: R`[[git status]] كيوزر عادي على repo صاحبه root بيطبع:

[[fatal: detected dubious ownership in repository at '/opt/test']] وتحته [[git config --global --add safe.directory /opt/test]].

بعد [[sudo chown -R $USER:$USER /opt/test]]، نفس الأمر بيشتغل ويقول [[On branch main]]. الـ chown أحسن من safe.directory لأنه بيصلّح السبب: اليوزر اللي بيشغّل Git هو صاحب الملفات، فمفيش حد يقدر يحط [[.git/config]] فيه أوامر تتنفذ باسمك.

الغلط الشائع: [[safe.directory '*']] في الإعدادات الـ global عشان الرسالة تختفي، وده بيقفل الحماية على كل الجهاز. ولو استخدمت [[sudo git]] جوه الـ repo بعد كده، الملفات هترجع ملك root وتتكرر المشكلة.`
        },
        {
          cmd: ".gitattributes",
          title: "نهايات السطور بقاعدة واحدة للمشروع",
          desc: R`ملف في جذر المشروع بيقول لـ Git يعمل إيه مع كل نوع ملف: يحوّل نهايات السطور ولا لأ، وأنهي ملفات binary ميلمسهاش.

وبيغلب إعداد [[core.autocrlf]] اللي على جهاز كل واحد، فالمشروع يبقى بنفس الشكل عند الكل.`,
          example: R`# .gitattributes
* text=auto eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
*.png binary
*.jpg binary`,
          try: R`ضيف الملف لـ repo التجربة، واعمل [[git add --renormalize .]] وبعدين [[git status]]: الملفات اللي كانت CRLF هتظهر متغيرة.`,
          flag: "script",
          deep: {
            why: "سكربت bash اتعمله commit من ويندوز بـ CRLF، ونزل على السيرفر فوقع بـ [[cannot execute: required file not found]] (ده نص bash على أوبونتو 24.04، والنسخ الأقدم بتقول [[bad interpreter: /bin/bash^M]]). أو كل ملفات المشروع بتظهر modified من غير ما حد يلمسها، لأن اتنين في الفريق autocrlf بتاعهم مختلف. الملف ده بيحط القاعدة في المشروع نفسه بدل إعداد كل جهاز.",
            how: R`كل سطر: pattern وبعده attributes. وآخر سطر بيطابق الملف هو اللي بيكسب، فالعام في الأول والاستثناءات بعده.

[[text=auto]]: Git يحدد لوحده الملف نص ولا binary، والنص بيتخزّن جوه الـ repo بـ LF دايمًا. و [[eol=lf]] معناها «ولما تطلّعه على الجهاز، خليه LF برضه»، حتى على ويندوز. و [[eol=crlf]] للملفات اللي لازم CRLF، زي سكربتات bat و cmd.

[[binary]] معناها متحوّلش ومتعملش diff نصي، للصور والخطوط والـ zip.

والبديل [[* -text]]: «متلمسش نهايات السطور خالص»، فكل ملف يتخزّن بالبايتات اللي اتكتب بيها بالظبط. في مشروع حقيقي كان مستخدم عشان الملفات في الريبو تفضل نفس البايتات اللي على السيرفر. ده بيشتغل لو كل الفريق بيكتب بنفس الشكل، بس مش بيحميك من ملف اتكتب CRLF بالغلط.

الملف بيأثر على اللي هيتعمله add من دلوقتي. الملفات الموجودة محتاجة [[git add --renormalize .]] مرة واحدة، في commit لوحده. (وإعدادات Git جوه WSL في تاب WSL.)`,
            when: "أول يوم في أي مشروع بيتشغّل على ويندوز ولينكس مع بعض، أو فيه سكربتات shell هتتنفّذ على سيرفر.",
            mistakes: R`تضيف الملف ومتعملش renormalize، فالملفات القديمة تفضل CRLF جوه الـ repo. وتعمل renormalize في نفس الـ commit مع تعديل حقيقي، فالـ diff يبقى المشروع كله. و [[eol=lf]] على ملفات bat، فتشتغل غلط في CMD.`
          },
          teach: R`## الأول: المشكلة اسمها CRLF و LF

كل سطر في ملف نصي بيخلص بحرف مخفي. لينكس والماك بيستخدموا حرف واحد اسمه **LF** (line feed، بيتكتب [[\n]]). ويندوز بيستخدم اتنين: **CRLF** (carriage return + line feed، [[\r\n]]). الكلام نفسه واحد، بس البايتات مختلفة. والمثال مش أوامر، ده **محتوى ملف** اسمه [[.gitattributes]] بتحطه في أول المشروع (السطر الأول [[# .gitattributes]] تعليق بيقول اسم الملف).

### ليه ده يفرق؟

سكربت bash مكتوب بـ CRLF، اتشغّل على أوبونتو 24.04 جوه Docker:

~~~text ./deploy.sh
bash: line 1: ./deploy.sh: cannot execute: required file not found
~~~

الملف موجود! بس أول سطر بقى [[#!/bin/bash\r]]، فلينكس بيدوّر على برنامج اسمه [[bash\r]] بحرف مخفي في آخره، ومش لاقيه. (bash القديم بيكتبها [[bad interpreter: /bin/bash^M]]، و [[^M]] هو الـ [[\r]].)

---

## ١. شكل الملف: pattern وبعده attributes

كل سطر: نمط ملفات (زي [[.gitignore]])، وبعده مسافة، وبعدها الخصائص. ولو أكتر من سطر طابق نفس الملف، **اللي تحت بيكسب**، فالقاعدة العامة فوق والاستثناءات تحتها.

## ٢. [[* text=auto eol=lf]]

| الحتة | معناها |
|---|---|
| [[*]] | كل الملفات |
| [[text=auto]] | Git يقرر لوحده: الملف نص ولا binary. والنص بيتخزّن **جوه الـ repo** بـ LF دايمًا |
| [[eol=lf]] | end of line: ولما Git يطلّع الملف على جهازك، يطلّعه LF برضه، حتى على ويندوز |

## ٣. [[*.bat text eol=crlf]] و [[*.cmd text eol=crlf]]

ملفات CMD لازم CRLF على جهازك. [[text]] من غير [[=auto]] معناها «ده نص أكيد، متخمّنش»، و [[eol=crlf]] يطلّعها CRLF. وجوه الـ repo برضه LF، التحويل بيحصل وقت ما الملف يطلع على الديسك.

## ٤. [[*.png binary]] و [[*.jpg binary]]

[[binary]] اختصار لتلات حاجات: متحوّلش نهايات سطور ([[-text]])، ومتعرضش diff نصي ([[-diff]])، ومتحاولش تدمج السطور ([[-merge]]). عشان صورة لو Git عدّل فيها بايت واحد بتبوظ.

---

## ٥. اتأكد Git فاهم إيه: [[git check-attr]]

ده مش في المثال بس مفيد. [[-a]] (all) بيوري كل الخصائص اللي اتطبّقت على كل ملف. الناتج من Git Bash على ويندوز (Git 2.56):

~~~text git check-attr -a deploy.sh run.bat logo.png
deploy.sh: text: auto
deploy.sh: eol: lf
run.bat: text: set
run.bat: eol: crlf
logo.png: binary: set
logo.png: diff: unset
logo.png: merge: unset
logo.png: text: unset
logo.png: eol: lf
~~~

لاحظ [[run.bat]] خد [[eol: crlf]] من سطره، مش [[lf]] من سطر [[*]]: اللي تحت كسب. و [[logo.png]] [[binary]] فكّت لـ [[diff: unset]] و [[merge: unset]] و [[text: unset]]. (الـ [[eol: lf]] جاية من سطر [[*]] بس ملهاش تأثير لأن [[text]] مقفولة.)

---

## ٦. الملفات اللي اتعملها commit قبل الملف

[[.gitattributes]] بيأثر على اللي هيتعمله add من دلوقتي. عشان أوريك، عملت repo فيه ملفات CRLF اتعملها commit من غير تحويل ([[core.autocrlf false]])، وده الـ solCode تقريبًا. [[git ls-files --eol]] بيوري نهايات السطور لكل ملف:

~~~text git ls-files --eol (قبل)
i/lf    w/lf    attr/                 	deploy.sh
i/crlf  w/crlf  attr/                 	run.bat
i/crlf  w/crlf  attr/                 	win.txt
~~~

| العمود | معناه |
|---|---|
| [[i/]] | index: الملف جوه الـ repo |
| [[w/]] | working tree: الملف على جهازك |
| [[attr/]] | الخصائص من [[.gitattributes]] (لسه فاضية) |

[[i/crlf]] هي المشكلة: الملف متخزّن CRLF جوه الـ repo، وأي حد على لينكس هيستلمه كده.

### [[git add --renormalize .]]

[[--renormalize]] يعني «طبّق قواعد [[.gitattributes]] من جديد على كل الملفات المتابعة، وجهّز اللي اتغير»:

~~~text git status -s
M  run.bat
M  win.txt
?? .gitattributes
~~~

~~~text git diff --cached --stat
 run.bat | 4 ++--
 win.txt | 4 ++--
 2 files changed, 4 insertions(+), 4 deletions(-)
~~~

كل ملف فيه سطرين، والسطرين «اتغيروا» مع إن الكلام هو هو: اللي اتغير الـ [[\r]] بس. عشان كده الـ commit ده لوحده، من غير أي تعديل حقيقي معاه. وبعد [[git commit]] و إعادة طلوع الملفات من الـ repo:

~~~text git ls-files --eol (بعد)
i/lf    w/lf    attr/text=auto eol=lf 	.gitattributes
i/lf    w/lf    attr/text=auto eol=lf 	deploy.sh
i/lf    w/crlf  attr/text eol=crlf    	run.bat
i/lf    w/lf    attr/text=auto eol=lf 	win.txt
~~~

كله [[i/lf]] جوه الـ repo، و [[run.bat]] لوحده [[w/crlf]] على الجهاز، بالظبط زي ما الملف طلب.

---

## الخلاصة

| السطر | جوه الـ repo | على جهازك |
|---|---|---|
| [[* text=auto eol=lf]] | LF | LF |
| [[*.bat text eol=crlf]] | LF | CRLF |
| [[*.png binary]] | زي ما هو | زي ما هو |

ولما تضيف الملف لمشروع قديم: [[git add --renormalize .]] مرة واحدة، و [[git ls-files --eol]] تتأكد إن مفيش [[i/crlf]].`,
          lines: [
            "كل الملفات: Git يفرّق النص من الـ binary، والنص LF في الـ repo وعلى الجهاز.",
            "سكربتات bat لازم CRLF، فاستثنيها.",
            "ونفسه لملفات cmd.",
            "الصور binary: متحوّلش ومتعملش diff.",
            "ونفسه لـ jpg."
          ],
          sol: R`لو الـ repo فيه ملف متعمله commit بـ CRLF، بعد [[git add --renormalize .]] [[git status -s]] بيوري [[M  win.txt]] (staged)، و [[git diff --cached --stat]] بيقول إن كل سطوره اتغيرت ([[2 insertions(+), 2 deletions(-)]] لملف سطرين) مع إن الكلام نفسه مااتغيرش، التغيير في نهاية السطر بس. و [[.gitattributes]] نفسه ظاهر [[??]] لحد ما تعمله add.

اعمل commit للاتنين مع بعض برسالة زي [[normalize line endings]]، عشان الـ commit ده ميتخلطش بتعديلات حقيقية.

لو مفيش ولا ملف ظهر، ده معناه إن الـ repo كان نضيف أصلًا (كله LF). وده مش غلط. تقدر تتأكد بـ [[git ls-files --eol]]: العمود [[i/crlf]] هو اللي كان هيتغير.`,
          solCode: R`git init crlf && cd crlf
git config core.autocrlf false
printf 'a\r\nb\r\n' > win.txt && git add . && git commit -m crlf
printf '* text=auto eol=lf\n' > .gitattributes
git add --renormalize .
git status -s
git add .gitattributes && git commit -m "normalize line endings"`
        }
      ]
    },
    {
      t: "المساهمة في مشاريع مفتوحة",
      l: 2,
      n: "fork و upstream، و Issues بتتقفل لوحدها من الـ PR، و submodule و lfs باختصار",
      items: [
        {
          cmd: "fork و upstream",
          title: "اعمل PR لمشروع مش بتاعك",
          desc: R`مش هتقدر تعمل push على repo مش بتاعك. فبتعمل fork: نسخة من الـ repo على حسابك، تعمل فيها push براحتك، وتفتح منها PR للمشروع الأصلي.

عندك remote اتنين: [[origin]] الـ fork بتاعك (بتعمل push عليه)، و [[upstream]] المشروع الأصلي (بتعمل منه fetch بس). وكل مساهمة بتبدأ branch جديدة من [[upstream/main]] مش من main بتاعك.`,
          example: R`gh repo fork OWNER/REPO --clone
cd REPO
git remote -v
# لو عملت clone للـ fork بإيدك من غير gh:
git remote add upstream https://github.com/OWNER/REPO.git
git fetch upstream
git switch -c fix/typo-readme upstream/main
git commit -am "docs: fix typo in README"
git push -u origin fix/typo-readme
gh pr create --repo OWNER/REPO --fill
git switch main
git merge --ff-only upstream/main
git push origin main`,
          try: R`اعمل fork لأي repo مفتوح صغير (أو repo تجربة من حساب تاني)، وضيف upstream، واعمل branch من [[upstream/main]] وارفعها على الـ fork. متفتحش PR لو التعديل مش حقيقي.`,
          deep: {
            why: "المساهمة في مشاريع مفتوحة من أحسن حاجات الـ portfolio: كود بتاعك اتراجع واتقبل في مشروع ناس بتستخدمه، وده بيتشاف على GitHub. والطريقة الوحيدة تبعت كود لمشروع مش بتاعك هي fork و PR.",
            how: R`[[gh repo fork --clone]] بيعمل الـ fork على حسابك وينزّله، ويظبط الـ remotes لوحده: [[origin]] للـ fork و [[upstream]] للأصلي. ولو عملت clone للـ fork بإيدك، هتلاقي origin بس، وتضيف upstream بـ [[git remote add]].

الـ fork نسخة اتاخدت في لحظة، ومش بتتحدّث لوحدها. المشروع الأصلي بيتقدم كل يوم، فقبل أي شغل: [[git fetch upstream]]، وتعمل الـ branch من [[upstream/main]] مباشرة. كده الـ PR بيبدأ من آخر نسخة، حتى لو main بتاعك قديم.

تحديث main بتاع الـ fork: [[git merge --ff-only upstream/main]] وبعدين push لـ origin. [[--ff-only]] بيرفض لو main بتاعك فيه commits مش في الأصلي، ودي علامة إنك اشتغلت على main بالغلط. وفيه زرار «Sync fork» على صفحة الـ fork في GitHub، و [[gh repo sync]] بيعمل نفس الحاجة من الترمنال.

[[gh pr create --repo OWNER/REPO]] بيفتح الـ PR على المشروع الأصلي. ولما المشرف يطلب تعديلات، تعمل commit و push على نفس الـ branch، والـ PR بيتحدّث لوحده.`,
            when: R`أي مساهمة في مشروع مش بتاعك. قبلها اقرا [[CONTRIBUTING.md]] لو موجود، ودوّر على Issues عليها label زي «good first issue»، واكتب تعليق إنك هتشتغل عليها قبل ما تبدأ.`,
            mistakes: R`تشتغل على main بتاع الـ fork، فكل PR جديد ياخد commits الـ PR اللي قبله، ومتعرفش تحدّث main من غير conflicts. branch لكل PR، ومن [[upstream/main]]. وتفتح PR ضخم من غير ما تسأل الأول في Issue، فيترفض لأن المشروع مش عايز الميزة دي أصلًا. وفي الانترفيو: «فرق fork عن branch؟» الـ branch جوه نفس الـ repo ومحتاج صلاحية push عليه، والـ fork repo كامل على حسابك مش محتاج أي صلاحية على الأصلي.`
          },
          teach: R`## الأول: ٣ نسخ من نفس المشروع

| النسخة | فين | اسمها عندك | تقدر تعمل push؟ |
|---|---|---|---|
| المشروع الأصلي | GitHub، حساب [[OWNER]] | [[upstream]] | لأ |
| الـ fork | GitHub، حسابك انت | [[origin]] | آه |
| النسخة اللي بتشتغل فيها | جهازك | — | — |

الكود بيمشي في دايرة: تجيب من [[upstream]]، وتشتغل عندك، وترفع على [[origin]]، وتفتح PR من الـ fork للأصلي. [[upstream]] و [[origin]] مجرد أسامي متعارف عليها للـ remotes، زي ما شفت في درس git remote.

> سطور [[git]] اتشغّلت فعلًا على ويندوز (Git 2.56) بـ ٣ repos على الجهاز: [[upstream.git]] يلعب دور المشروع الأصلي، و [[fork.git]] نسخة منه تلعب دور الـ fork، ويوزر تاني بيرفع على الأصلي عشان يتقدم عن الـ fork. سطور [[gh]] محتاجة حساب GitHub، فكلامها من docs بتوع [[gh]] ([[gh repo fork --help]]).

---

## ١. [[gh repo fork OWNER/REPO --clone]] و [[cd REPO]]

[[repo fork]] بيعمل الـ fork على حسابك في GitHub، و [[--clone]] بينزّله على جهازك كمان. وحسب الـ docs بيظبط الـ remotes لوحده: الـ fork بتاعك اسمه [[origin]]، والأصلي اسمه [[upstream]]. وبعدين [[cd REPO]] تدخل الفولدر.

## ٢. [[git remote -v]]

دي أهم خطوة تتأكد منها. لو عملت clone للـ fork بإيدك (من غير [[gh]])، هتلاقي origin بس:

~~~text git remote -v بعد clone عادي للـ fork
origin	.../fork.git (fetch)
origin	.../fork.git (push)
~~~

## ٣. [[git remote add upstream https://github.com/OWNER/REPO.git]]

سجّل الأصلي باسم [[upstream]]. وبعدها:

~~~text git remote -v
origin	.../fork.git (fetch)
origin	.../fork.git (push)
upstream	../upstream.git (fetch)
upstream	../upstream.git (push)
~~~

٤ سطور: كل remote ليه عنوان جلب ورفع. وده نفس الشكل اللي [[gh repo fork --clone]] بيسيبه.

---

## ٤. [[git fetch upstream]]

الـ fork صورة اتاخدت في لحظة. الأصلي اتقدم بعدها بـ commit ([[owner: more docs]]). [[fetch]] بيجيب الجديد من غير ما يلمس ملفاتك:

~~~text الناتج
From ../upstream
 * [new branch]      main       -> upstream/main
~~~

[[upstream/main]] نسخة Git من main بتاعة الأصلي. ودلوقتي main بتاعك (من الـ fork) لسه قديم، و [[upstream/main]] أحدث منه بـ commit.

## ٥. [[git switch -c fix/typo-readme upstream/main]]

| الحتة | معناها |
|---|---|
| [[-c fix/typo-readme]] | اعمل branch جديدة بالاسم ده |
| [[upstream/main]] | وابدأها من **هنا**، مش من مكانك الحالي |

~~~text الناتج
Switched to a new branch 'fix/typo-readme'
branch 'fix/typo-readme' set up to track 'upstream/main'.
~~~

[[git branch -vv]] ([[-vv]] = تفاصيل أكتر، ومعاها الـ branch المتابَعة) بيوري الفرق:

~~~text git branch -vv
* fix/typo-readme 6dae08b [upstream/main] owner: more docs
  main            4db8f9d [origin/main] init
~~~

الـ branch الجديدة بدأت من [[6dae08b]] (آخر الأصلي)، مش من [[4db8f9d]] (main القديم بتاعك). كده الـ PR هيبدأ من آخر نسخة.

## ٦. [[git commit -am "docs: fix typo in README"]]

صلّحت الكلمة في [[README]]. [[-a]] بيعمل add للملفات المتابعة اللي اتعدّلت، و [[-m]] الرسالة. و [[docs:]] في أول الرسالة عادة متعارف عليها (Conventional Commits): نوع التعديل وبعدين وصفه.

~~~text الناتج
[fix/typo-readme c98536d] docs: fix typo in README
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

## ٧. [[git push -u origin fix/typo-readme]]

ارفع على **الـ fork** ([[origin]])، لأنك مش مسموحلك ترفع على الأصلي:

~~~text الناتج
To .../fork.git
 * [new branch]      fix/typo-readme -> fix/typo-readme
branch 'fix/typo-readme' set up to track 'origin/fix/typo-readme'.
~~~

[[-u]] غيّر المتابعة من [[upstream/main]] لـ [[origin/fix/typo-readme]]، فـ [[git push]] الجاية تروح للـ fork.

## ٨. [[gh pr create --repo OWNER/REPO --fill]]

[[--repo OWNER/REPO]] (أو [[-R]]) يعني «افتح الـ PR على المشروع ده»، يعني الأصلي. والـ branch اللي هتتطلب هي اللي انت عليها. [[--fill]] العنوان والوصف من الـ commits.

---

## ٩. تحديث main بتاع الـ fork (السطور الأخيرة)

### [[git switch main]] و [[git merge --ff-only upstream/main]]

[[--ff-only]]: اعمل الدمج **بس** لو هو fast-forward (main يتحرك لقدام من غير merge commit):

~~~text الناتج
Updating 4db8f9d..6dae08b
Fast-forward
 README | 1 +
 1 file changed, 1 insertion(+)
~~~

### [[git push origin main]]

~~~text الناتج
To .../fork.git
   4db8f9d..6dae08b  main -> main
~~~

كده الـ fork على GitHub بقى زي الأصلي.

### ليه [[--ff-only]]؟

جرّبت أعمل commit على main بالغلط، والأصلي اتقدم هو كمان:

~~~text git merge --ff-only upstream/main
hint: Diverging branches can't be fast-forwarded, you need to either:
...
fatal: Not possible to fast-forward, aborting.
~~~

Git رفض ومعملش حاجة. ده إنذار: انت اشتغلت على main، والمفروض الشغل يبقى في branch لوحدها. من غير [[--ff-only]] كان هيعمل merge commit ساكت ويلخبط main بتاعك.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| fork وتنزيل | [[gh repo fork OWNER/REPO --clone]] |
| تضيف الأصلي | [[git remote add upstream URL]] |
| تجيب آخر الأصلي | [[git fetch upstream]] |
| branch لكل PR | [[git switch -c NAME upstream/main]] |
| ترفع | [[git push -u origin NAME]] |
| تفتح PR على الأصلي | [[gh pr create --repo OWNER/REPO --fill]] |
| تحدّث main بتاع الـ fork | [[git merge --ff-only upstream/main]] ثم [[git push origin main]] |`,
          lines: [
            "اعمل fork على حسابك ونزّله، و gh يظبط origin و upstream لوحده.",
            "ادخل فولدر المشروع.",
            "اتأكد: origin هو الـ fork بتاعك، و upstream هو الأصلي.",
            "لو مفيش upstream: ضيف المشروع الأصلي باسم upstream.",
            "نزّل آخر حاجة في المشروع الأصلي.",
            "اعمل branch للتعديل من آخر نسخة في الأصلي مش من main بتاعك.",
            "احفظ التعديل.",
            "ارفع الـ branch على الـ fork بتاعك (origin).",
            "افتح PR على المشروع الأصلي.",
            "بعدين، عشان تحدّث main بتاع الـ fork: ارجع لـ main.",
            "خده لقدام لآخر upstream، ويرفض لو main بتاعك فيه شغل مش في الأصلي.",
            "وارفعه على الـ fork."
          ],
          sol: R`[[git remote -v]] المفروض يطلّع ٤ سطور: [[origin]] بعنوان الـ fork بتاعك (fetch و push)، و [[upstream]] بعنوان المشروع الأصلي.

وبعد [[git switch -c fix/typo-readme upstream/main]]، [[git branch -vv]] بيوري الـ branch بتتبع [[upstream/main]]. ده طبيعي، و [[git push -u origin fix/typo-readme]] بيغيّر التتبع للـ fork.

وبعد الـ push، GitHub بيطبع رابط «Create a pull request» وصفحة الـ fork بتعرض زرار «Compare & pull request» بيشاور على الـ repo الأصلي.

الغلط الشائع: الـ push يترفض بـ 403. يبقى origin لسه بيشاور على الأصلي (عملت clone للأصلي مش للـ fork). صلّحه بـ [[git remote set-url origin]] بعنوان الـ fork.`
        },
        {
          cmd: "Closes #12",
          title: "اربط الـ PR بالـ Issue",
          desc: R`الـ Issue هو المكان اللي بتتكتب فيه المشكلة أو الميزة قبل الكود: وصف، وخطوات تكرار الـ bug، والنقاش. والـ PR هو الحل.

لو كتبت [[Closes #12]] في وصف الـ PR (أو [[Fixes #12]] أو [[Resolves #12]])، GitHub بيربطهم، ولما الـ PR يتدمج في الـ default branch، Issue رقم 12 بيتقفل لوحده.`,
          example: R`gh issue create --title "Cart total ignores coupon" --body "Steps: add item, apply SAVE10, total unchanged"
gh issue list --label bug
gh issue develop 12 --checkout
git commit -m "fix: apply coupon to cart total (closes #12)"
gh pr create --fill --body "Closes #12"
gh issue view 12`,
          try: "على repo التجربة: افتح Issue، واعمل branch و PR في وصفه Closes ورقم الـ Issue، وادمجه، واتأكد إن الـ Issue اتقفل لوحده.",
          deep: {
            why: "في فريق أو مشروع مفتوح، الشغل بيتتبع في Issues: إيه المطلوب، ومين شغال على إيه، وإيه اتحل. الربط بيخلي أي حد يفتح الـ Issue يلاقي الكود اللي حله، ويفتح الـ PR يعرف ليه اتعمل، من غير ما حد يقفل حاجة بإيده وينسى.",
            how: R`الكلمات اللي GitHub بيفهمها: close و closes و closed، و fix و fixes و fixed، و resolve و resolves و resolved، وبعدها رقم الـ Issue. ولـ Issue في repo تاني: [[Closes OWNER/REPO#12]]. ولكذا Issue كرر الكلمة: [[Closes #12, closes #15]].

بتشتغل في وصف الـ PR، أو في رسالة commit، بس القفل بيحصل لما الـ PR يتدمج في الـ default branch (غالبًا main). PR داخل branch تانية (زي develop) مش هيقفل حاجة.

[[#12]] من غير الكلمة بيعمل رابط بس، والـ Issue بيفضل مفتوح. وده مفيد لما الـ PR جزء من الحل مش كله: [[Part of #12]].

[[gh issue develop 12 --checkout]] بيعمل branch مربوطة بالـ Issue من صفحته، ويروح لها. وفي صفحة الـ PR، قسم «Development» في الجنب بيوريك الـ Issues اللي هتتقفل.`,
            when: "كل PR بيحل Issue. وفي مشروع مفتوح: متبدأش شغل من غير Issue، واكتب فيه الأول إنك هتاخده.",
            mistakes: R`تكتب [[Closes #12]] في PR داخل branch مش الـ default، وتستغرب إن الـ Issue مقفلش. وتكتب [[Closes 12]] من غير [[#]] أو كلمة مش في القايمة زي [[Solves #12]]، فالربط ميحصلش (النقطتين والحروف الكبيرة عادي: [[Fixes: #12]] و [[CLOSES #12]] شغالين). وتكتب Closes في PR بيحل جزء بس، فالـ Issue يتقفل والمشكلة لسه موجودة.`
          },
          teach: R`## الأول: Issue = المشكلة، و PR = الحل

الـ Issue صفحة على GitHub بتتكتب فيها مشكلة أو طلب، وبتاخد رقم: أول Issue في الـ repo [[#1]]، وبعدها [[#2]]، وهكذا (والـ PRs بتشارك نفس العدّاد). الدرس عن ربط الاتنين: تكتب في الـ PR كلمة زي [[Closes]] وبعدها [[#12]]، فلما الـ PR يتدمج، GitHub يقفل Issue 12 لوحده.

> سطور [[gh]] بتكلّم موقع GitHub بحساب حقيقي، فمتشغّلتش هنا، وكلامها من docs بتوع [[gh]] و GitHub. سطر [[git commit]] اتشغّل على ويندوز (Git 2.56) في repo تجربة. ومن غير تسجيل دخول، أي أمر [[gh]] بيطبع [[To get started with GitHub CLI, please run:  gh auth login]] (درس gh pr).

---

## ١. [[gh issue create --title "..." --body "..."]]

| الحتة | معناها |
|---|---|
| [[issue create]] | افتح Issue جديد في الـ repo اللي انت واقف فيه |
| [[--title]] | العنوان: المشكلة في سطر |
| [[--body]] | التفاصيل. للـ bug: الخطوات اللي بتكرره، وإيه المتوقع، وإيه اللي حصل |

بيطبع رابط الـ Issue الجديد، وآخره الرقم، زي [[.../issues/12]].

## ٢. [[gh issue list --label bug]]

الـ Issues المفتوحة، و [[--label bug]] (أو [[-l]]) يفلتر على اللي عليها label اسمه bug. الـ label وسم ملوّن بيتحط على الـ Issue عشان التصنيف (bug، enhancement، good first issue).

## ٣. [[gh issue develop 12 --checkout]]

| الحتة | معناها |
|---|---|
| [[issue develop 12]] | اعمل branch على GitHub مربوطة بـ Issue 12 |
| [[--checkout]] | (أو [[-c]]) ونزّلها واعمل لها switch على جهازك |

الـ branch بتبان في صفحة الـ Issue تحت «Development». واسمها الافتراضي (حسب docs GitHub) رقم الـ Issue وبعده العنوان، زي [[12-cart-total-ignores-coupon]]، ولو عايز اسم تاني [[--name]].

---

## ٤. [[git commit -m "fix: apply coupon to cart total (closes #12)"]]

~~~text الناتج
[12-cart-total-ignores-coupon 4cee59c] fix: apply coupon to cart total (closes #12)
 1 file changed, 1 insertion(+)
~~~

- [[fix:]] نوع التعديل (Conventional Commits).
- [[(closes #12)]] ربط بالـ Issue. GitHub بيقرا الكلمات دي في رسايل الـ commits كمان، مش في وصف الـ PR بس.

### خد بالك من [[#]] في الترمنال

في bash و PowerShell، [[#]] في أول كلمة من غير علامات تنصيص معناها «من هنا تعليق». جرّبت:

~~~text echo closes #12
closes
~~~

الـ [[#12]] اختفى. عشان كده الرسالة كلها بين [[" "]].

---

## ٥. [[gh pr create --fill --body "Closes #12"]]

[[--fill]] بياخد العنوان من الـ commits، و [[--body]] بيحدد الوصف بإيدك. المهم إن الوصف فيه [[Closes #12]].

### الكلمات اللي GitHub بيفهمها

| الكلمة | أشكالها |
|---|---|
| close | [[close]] و [[closes]] و [[closed]] |
| fix | [[fix]] و [[fixes]] و [[fixed]] |
| resolve | [[resolve]] و [[resolves]] و [[resolved]] |

وبعدها [[#]] والرقم. والحروف الكبيرة والنقطتين عادي ([[Fixes: #12]]). لـ Issue في repo تاني: [[Closes OWNER/REPO#12]].

| اللي كتبته | النتيجة |
|---|---|
| [[Closes #12]] | رابط، ويتقفل مع الدمج في الـ default branch |
| [[#12]] أو [[Part of #12]] | رابط بس، ويفضل مفتوح |
| [[Closes 12]] أو [[Solves #12]] | ولا حاجة: مفيش [[#]]، أو كلمة مش في القايمة |

---

## ٦. [[gh issue view 12]]

بيعرض الـ Issue: العنوان، والحالة، والوصف، والتعليقات. بعد الدمج الحالة بتبقى Closed، وفي صفحة الـ Issue على الموقع سطر إنه اتقفل بالـ PR ورقمه.

> القفل بيحصل لما الـ PR يتدمج في الـ **default branch** (غالبًا main). PR داخل develop مثلًا مش هيقفل حاجة لحد ما الكود يوصل main.

---

## الخلاصة

1. [[gh issue create]]: اكتب المشكلة، وخد رقمها.
2. [[gh issue develop N --checkout]]: branch مربوطة بيها.
3. [[git commit -m "... (closes #N)"]]: والرسالة بين علامات تنصيص.
4. [[gh pr create --fill --body "Closes #N"]].
5. بعد الدمج في main: [[gh issue view N]] يقول Closed.`,
          lines: [
            "افتح Issue بعنوان ووصف فيه خطوات تكرار الـ bug.",
            "اعرض الـ Issues اللي عليها label bug.",
            "اعمل branch مربوطة بـ Issue رقم 12 وروح لها.",
            "رسالة commit فيها رقم الـ Issue.",
            "افتح PR، والوصف فيه Closes #12 عشان يتقفل مع الدمج.",
            "بعد الدمج: اتأكد إن حالته بقت CLOSED."
          ],
          sol: R`قبل الدمج، صفحة الـ PR بتوري الـ Issue تحت «Development»، وصفحة الـ Issue فيها سطر «linked a pull request that will close this issue».

بعد [[gh pr merge]]، [[gh issue view 12]] بيوري الحالة Closed، وفي تايملاين الـ Issue على GitHub سطر إنه اتقفل بالـ PR ورقمه.

لو فضل مفتوح: اتأكد إن الـ PR اتدمج في الـ default branch، وإن الصيغة زي [[Closes #12]]: كلمة من القايمة وبعدها [[#]] والرقم.`
        },
        {
          cmd: "submodule و lfs",
          title: "repo جوه repo، وملفات ضخمة",
          desc: R`[[submodule]] بيحط repo تاني جوه مشروعك في فولدر، ومشروعك بيحفظ رقم commit معين منه بس. و [[git lfs]] بيخلّي الملفات الضخمة (فيديو وتصميمات و datasets) تتخزن بره التاريخ، والـ repo يحفظ مؤشر صغير لها.

الاتنين بيتقابلوا في مشاريع قديمة أو مفتوحة أكتر ما تحتاجهم في مشروعك.`,
          example: R`git submodule add https://github.com/OWNER/theme.git themes/theme
git commit -m "add theme as submodule"
git clone --recurse-submodules https://github.com/USER/REPO.git
git submodule update --init --recursive
git lfs install
git lfs track "*.psd"
git add .gitattributes design.psd
git lfs ls-files`,
          try: "اعمل repo صغير، وضيفه كـ submodule في repo تاني، واعمل clone للتاني من غير recurse وشوف الفولدر فاضي، وبعدين update --init.",
          deep: {
            why: R`submodule: مكتبة أو theme مشتركة بين كذا مشروع، وعايز كل مشروع يثبّت نسخة معينة منها. lfs: GitHub بيرفض أي ملف أكبر من 100MB، والملفات الـ binary الكبيرة بتتقل الـ repo للأبد لأن كل نسخة منها بتفضل في التاريخ.`,
            how: R`[[submodule add]] بيعمل clone للـ repo التاني جوه الفولدر، ويكتب ملف [[.gitmodules]] فيه المسار والرابط. ومشروعك مش بيحفظ ملفات الـ submodule، بيحفظ رقم commit واحد بس منه. فلو الـ repo التاني اتقدم، مشروعك مش هيتأثر لحد ما تدخل الفولدر وتعمل pull، وترجع تعمل commit للرقم الجديد.

[[git clone]] العادي بيسيب فولدر الـ submodule فاضي. [[--recurse-submodules]] وقت الـ clone، أو [[git submodule update --init --recursive]] بعده، بينزّل كل واحد على الـ commit المحفوظ.

[[git lfs install]] مرة على الجهاز. و [[git lfs track "*.psd"]] بيكتب سطر في [[.gitattributes]]، ومن ساعتها أي psd بيتخزن على سيرفر LFS، والـ repo فيه ملف نصي صغير بيشاور عليه. ولازم [[.gitattributes]] نفسه يدخل commit، وإلا باقي الفريق يرفعوا الملفات عادي. و [[git lfs ls-files]] بيعرض الملفات اللي LFS ماسكها.`,
            when: R`submodule: كود مشترك بين repos ومش عايزه package على npm. في مشروع Node غالبًا package أو monorepo (workspaces) أسهل. lfs: assets كبيرة لازم تبقى جنب الكود، وإلا خليها في S3 أو R2 بره Git خالص.`,
            mistakes: R`تعدّل كود جوه فولدر submodule وتنسى تعمل commit و push جوه الـ submodule نفسه، فمشروعك يشاور على commit محدش عنده، والباقيين يطلعلهم خطأ في update. وتنسى [[--recurse-submodules]] في CI أو على السيرفر، فالبيلد يقع لأن الفولدر فاضي. و [[lfs track]] بعد ما الملفات اتعملها commit عادي: الملفات القديمة بتفضل في التاريخ بحجمها. وحصص LFS على GitHub ليها حد تخزين ونقل.`
          },
          teach: R`## الأول: موضوعين مختلفين في درس واحد

- **submodule**: repo كامل جوه فولدر في مشروعك، ومشروعك بيحفظ «أنهي commit منه» بس.
- **LFS** (Large File Storage): الملفات الضخمة بتتشال في مكان تاني، والـ repo بيحفظ ورقة صغيرة بتشاور عليها.

الاتنين اتجرّبوا على ويندوز (Git 2.56، و git-lfs 3.8 اللي جاي مع Git for Windows) بـ repos على الجهاز بدل GitHub، وده بالظبط الـ solCode. الأوامر نفسها على لينكس والماك، بس هناك [[git lfs]] بيتسطّب لوحده ([[sudo apt install git-lfs]] أو [[brew install git-lfs]]).

---

## الجزء الأول: submodule

## ١. [[git submodule add URL themes/theme]]

| الحتة | معناها |
|---|---|
| [[submodule add]] | ضيف repo تاني كـ submodule |
| [[URL]] | عنوان الـ repo التاني. في التجربة [[../lib]] (فولدر جنبه) |
| [[themes/theme]] | الفولدر اللي هيتحط فيه جوه مشروعك |

لما العنوان فولدر على الجهاز، Git الحديث بيرفض لأسباب أمان:

~~~text git submodule add ../lib vendor/lib
Cloning into '.../app/vendor/lib'...
fatal: transport 'file' not allowed
~~~

فللتجربة بس بنسمح بيه للأمر ده بـ [[-c protocol.file.allow=always]]. مع رابط GitHub عادي مش محتاج ده:

~~~text git -c protocol.file.allow=always submodule add ../lib vendor/lib
Cloning into '.../app/vendor/lib'...
done.
~~~

### اللي حصل في مشروعك

~~~text cat .gitmodules
[submodule "vendor/lib"]
	path = vendor/lib
	url = ../lib
~~~

[[.gitmodules]] ملف عادي بيتعمله commit، فيه لكل submodule: مكانه ([[path]]) وجاي منين ([[url]]).

~~~text git status -s
A  .gitmodules
A  vendor/lib
~~~

[[vendor/lib]] ظاهر **سطر واحد** مش ملفاته. ليه؟

## ٢. [[git commit -m "add theme as submodule"]]

بعد الـ commit، بص على اللي اتحفظ فعلًا:

~~~text git ls-tree HEAD vendor/lib
160000 commit e4e581f4fb855ecf0bee3d1092fc858aebe9b33a	vendor/lib
~~~

[[160000 commit]] نوع خاص: مشروعك حافظ **رقم commit واحد** من الـ repo التاني، مش ملفات. لو الـ repo التاني اتقدم، مشروعك فاضل على الرقم ده لحد ما تغيّره بنفسك.

---

## ٣. [[git clone --recurse-submodules URL]]

clone عادي لمشروع فيه submodule بيسيب فولدره **فاضي**. جرّبت [[git clone app app2]] وبعدين [[ls -A app2/vendor/lib]]: مطبعش ولا حاجة. و [[git submodule status]] بيقول:

~~~text الناتج
-e4e581f4fb855ecf0bee3d1092fc858aebe9b33a vendor/lib
~~~

الـ [[-]] في الأول يعني «متسجّل بس لسه متنزلش». [[--recurse-submodules]] وقت الـ clone بينزّل الـ submodules كمان مرة واحدة.

## ٤. [[git submodule update --init --recursive]]

ولو عملت clone عادي ونسيت:

| الحتة | معناها |
|---|---|
| [[update]] | خلّي كل submodule على الـ commit اللي مشروعك حافظه |
| [[--init]] | سجّل الـ submodules اللي في [[.gitmodules]] الأول |
| [[--recursive]] | ولو جوه submodule فيه submodules، نزّلهم كمان |

~~~text الناتج
Submodule 'vendor/lib' (.../sm/lib) registered for path 'vendor/lib'
Cloning into '.../app2/vendor/lib'...
done.
Submodule path 'vendor/lib': checked out 'e4e581f4fb855ecf0bee3d1092fc858aebe9b33a'
~~~

[[checked out]] بنفس الرقم المحفوظ بالظبط. وبعدها [[git submodule status]] من غير [[-]]:

~~~text الناتج
 e4e581f4fb855ecf0bee3d1092fc858aebe9b33a vendor/lib (heads/main)
~~~

---

## الجزء التاني: Git LFS

## ٥. [[git lfs install]]

مرة واحدة على الجهاز. بيضيف في ملف إعداداتك الـ global فلتر اسمه [[lfs]]:

~~~text الناتج
Updated Git hooks.
Git LFS initialized.
~~~

~~~text اللي اتضاف في ~/.gitconfig
[filter "lfs"]
	required = true
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
~~~

الفلتر ده بيشتغل في اتجاهين: [[clean]] وانت بتعمل add (الملف الكبير يتشال ويتحط مكانه مؤشر)، و [[smudge]] وانت بتطلّع الملف (المؤشر يتبدّل بالملف الحقيقي). و [[Updated Git hooks]] لأني كنت جوه repo، فحط hooks بترفع الملفات الكبيرة مع [[git push]].

## ٦. [[git lfs track "*.psd"]]

~~~text الناتج
Tracking "*.psd"
~~~

~~~text cat .gitattributes
*.psd filter=lfs diff=lfs merge=lfs -text
~~~

يعني الأمر مجرد سطر في [[.gitattributes]] (درس .gitattributes): أي psd يعدّي على فلتر lfs، ومتعملش diff أو merge نصي، ومتلمسش نهايات سطوره. وعلامات التنصيص حوالين [["*.psd"]] عشان الترمنال ميفكّش النجمة لأسامي ملفات موجودة.

## ٧. [[git add .gitattributes design.psd]]

لازم الاتنين: لو [[.gitattributes]] ماتعملوش commit، باقي الفريق مش هيعرفوا إن psd رايحة LFS.

## ٨. [[git lfs ls-files]]

~~~text الناتج
3f0997dda6 * design.psd
~~~

[[3f0997dda6]] أول البصمة (sha256) بتاعة الملف، و [[*]] يعني الملف الحقيقي موجود على جهازك. وده اللي اتحفظ فعلًا جوه Git بعد الـ commit:

~~~text git show HEAD:design.psd
version https://git-lfs.github.com/spec/v1
oid sha256:3f0997dda692d16d4c78c3699be0fa5b2fe8e217432a91a2a8b109ac6faef140
size 2000
~~~

٣ سطور نصية بس: نسخة الصيغة، وبصمة الملف، وحجمه بالبايت. والملف الحقيقي (2000 بايت هنا، أو 2GB في الحقيقة) بيترفع لسيرفر LFS مع الـ push.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| تضيف repo جوه مشروعك | [[git submodule add URL PATH]] |
| clone ومعاه الـ submodules | [[git clone --recurse-submodules URL]] |
| نسيت، نزّلهم دلوقتي | [[git submodule update --init --recursive]] |
| تشوف حالتهم | [[git submodule status]] ([[-]] = مش متنزّل) |
| تفعّل LFS على الجهاز | [[git lfs install]] |
| نوع ملفات يروح LFS | [[git lfs track "*.ext"]] ثم commit لـ [[.gitattributes]] |
| تشوف اللي LFS ماسكه | [[git lfs ls-files]] |`,
          lines: [
            "ضيف repo تاني كـ submodule في فولدر themes/theme.",
            "احفظ .gitmodules ورقم الـ commit في مشروعك.",
            "نزّل مشروع ومعاه كل الـ submodules مرة واحدة.",
            "أو بعد clone عادي: نزّل الـ submodules (والمتداخلة جواها).",
            "فعّل LFS على جهازك (مرة واحدة).",
            "أي ملف psd يتخزن في LFS (بيكتب في .gitattributes).",
            "احفظ .gitattributes مع الملف نفسه.",
            "اعرض الملفات اللي LFS ماسكها."
          ],
          sol: R`[[git submodule add]] بيعمل [[.gitmodules]] فيه قسم [[submodule "vendor/lib"]] و [[path]] و [[url]]، و [[git status -s]] بيطلّع سطرين: [[A .gitmodules]] و [[A vendor/lib]]. الفولدر ظاهر كحاجة واحدة مش ملفات، لأن مشروعك حافظ رقم commit بس.

بعد clone عادي للمشروع التاني، [[ls vendor/lib]] فاضي. و [[git submodule update --init --recursive]] بيطبع [[Submodule path 'vendor/lib': checked out 'رقم']]، والملفات بتظهر.

لو الـ repo التاني على جهازك (مسار زي [[../lib]] مش رابط)، Git الجديد بيرفض بـ [[transport 'file' not allowed]]. للتجربة بس: [[git -c protocol.file.allow=always submodule add ../lib vendor/lib]] وبنفس الـ [[-c]] مع update.`,
          solCode: R`mkdir -p ~/lab/sub && cd ~/lab/sub
git init -b main lib && cd lib && echo x > l && git add l && git commit -m lib && cd ..
git init -b main app && cd app
git -c protocol.file.allow=always submodule add ../lib vendor/lib
cat .gitmodules && git status -s
git commit -m "add lib" && cd ..
git clone app app2 && ls app2/vendor/lib
cd app2 && git -c protocol.file.allow=always submodule update --init --recursive
ls vendor/lib && git submodule status`
        }
      ]
    }
]);
