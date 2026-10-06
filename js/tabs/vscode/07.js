// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "الأمر code من الترمنال",
      l: 3,
      n: "تفتح وتقفز لسطر وتقارن وتنقل الـ extensions من غير ما تسيب الترمنال",
      items: [
        {
          cmd: "code .",
          title: "افتح الفولدر الحالي في VS Code",
          desc: R`[[code .]] بيفتح الفولدر اللي انت فيه في شباك جديد. [[code -r .]] بيفتحه في آخر شباك مفتوح بدل شباك جديد. و [[code file.ts]] بيفتح ملف، ولو مش موجود بيفتحه فاضي، والملف بيتعمل لما تعمل Save. و [[-]] بيقرا من الـ output اللي داخله ويفتحه كملف.

على ويندوز ولينكس الأمر بيتسطّب مع VS Code. على الماك: Command Palette ثم Shell Command: Install 'code' command in PATH. وجوه WSL بيفتح VS Code متوصل بلينكس (تاب WSL، درس «VS Code»).`,
          example: R`cd ~/projects/myapp && code .
code -r .
code README.md .env.example
git log --oneline -30 | code -`,
          try: "من الترمنال في مشروعك: [[code -r .]]، وبعدين [[git log --oneline -30 | code -]] وشوف النتيجة كملف تقدر تدوّر فيه بـ Ctrl+F.",
          deep: {
            why: "انت في الترمنال في الفولدر الصح. إنك تفتح VS Code وتدوّر على الفولدر من File ثم Open Folder رجوع لورا.",
            how: R`[[code]] سكربت صغير بيكلّم VS Code: لو فيه شباك مفتوح بيبعتله، ولو لأ بيشغّله. الفولدر اللي بيتفتح بيبقى جذر المشروع، فإعدادات [[.vscode]] اللي فيه بتتطبق، والترمنال المدمج بيبدأ منه.

[[-n]] شباك جديد دايمًا، و [[-r]] آخر شباك. و [[-]] بيقرا اللي داخله من pipe، فأي output طويل تفتحه وتدوّر فيه براحتك.`,
            when: "كل مرة تفتح مشروع، وأي output طويل عايز تقراه براحتك.",
            mistakes: "تفتح فولدر أب فيه ١٠ مشاريع، فـ ESLint و TypeScript يتلخبطوا والبحث يبقى بطيء: افتح المشروع نفسه. وعلى الماك تكتب code فيقولك command not found: لسه ما عملتش Install 'code' command in PATH."
          },
          teach: R`## [[code]] برنامج في الترمنال بيكلّم VS Code

لما تسطّب VS Code على ويندوز أو لينكس، بيتحط معاه أمر اسمه [[code]] في الـ PATH. الأمر ده مش المحرر نفسه، ده سكربت صغير: لو VS Code مفتوح بيبعتله «افتح كذا»، ولو مقفول بيشغّله. نتأكد إنه موجود:

~~~powershell
code --version
~~~

~~~text الناتج (ويندوز، VS Code 1.140)
1.140.0
07f806f999227108933c2e30515b26eecc1fda74
x64
~~~

| السطر | معناه |
|---|---|
| [[1.140.0]] | نسخة VS Code |
| الرقم الطويل | الـ commit (نسخة الكود بالظبط اللي اتبنى منها) |
| [[x64]] | معمول لمعالج 64-bit |

ولو طلع [[command not found]] (أو [[is not recognized]] في PowerShell)، يبقى [[code]] مش في الـ PATH (على الماك: Shell Command: Install 'code' command in PATH).

---

## ١. [[cd ~/projects/myapp && code .]]

- [[cd ~/projects/myapp]] ادخل فولدر المشروع. [[~]] فولدر اليوزر بتاعك.
- [[&&]] معناها «شغّل اللي بعدي **لو** اللي قبلي نجح». لو الفولدر مش موجود و [[cd]] فشل، [[code .]] مش هيتشغّل، فمش هتفتح فولدر غلط. جربناها في Docker ([[ubuntu:24.04]]) بـ [[cd /usr && pwd]] فطبع [[/usr]] لأن [[cd]] نجح.
- [[code .]]: النقطة يعني «الفولدر اللي أنا فيه». فبيتفتح كمشروع: [[.vscode]] بتاعه بيتقرا، والترمنال المدمج بيبدأ منه.

---

## ٢. [[code -r .]]

[[-r]] اختصار [[--reuse-window]]. من [[code --help]]:

~~~text الناتج (جزء)
  -n --new-window                            Force to open a new window.
  -r --reuse-window                          Force to open a file or folder in
                                             an already opened window.
~~~

يعني [[-r]] يفتح في الشباك المفتوح بدل ما يعمل شباك جديد، و [[-n]] العكس: شباك جديد دايمًا.

---

## ٣. [[code README.md .env.example]]

ممكن تدّي [[code]] أكتر من ملف، كل واحد يتفتح في تاب. ولو الملف مش موجود، بيتفتح تاب فاضي باسمه، والملف نفسه بيتعمل لما تعمل Save.

---

## ٤. [[git log --oneline -30 | code -]]

نفكّه من الشمال لليمين:

- [[git log]] تاريخ الـ commits. و [[--oneline]] كل commit في سطر (الـ hash المختصر والرسالة)، و [[-30]] آخر ٣٠ بس.
- [[|]] (pipe) خد الـ output بتاع اللي قبلي وابعته input للي بعدي.
- [[code -]]: الـ [[-]] معناها «اقرا من الـ input (stdin) بدل ملف». ده مكتوب في أول [[code --help]]:

~~~text الناتج (أول سطور)
Visual Studio Code 1.140.0

Usage: code.exe [options] [paths...]

To read from stdin, append '-' (e.g. 'echo Hello World | code.exe -')
~~~

اللي بيحصل: [[code]] بيكتب الـ input في ملف مؤقت ويفتحه في تاب، وبيطبع سطر زي [[Reading from stdin via: <temp>/code-stdin-xxx]] (الجملة دي من كود الـ CLI نفسه في VS Code 1.140؛ ما شغّلناش الأمر هنا لأنه بيفتح المحرر). وبعدين تقرا الـ output الطويل وتدوّر فيه بـ Ctrl+F براحتك.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[code .]] | افتح الفولدر الحالي |
| [[code -r .]] | في الشباك المفتوح |
| [[code -n .]] | في شباك جديد دايمًا |
| [[code a b]] | افتح ملفات (والمش موجود يتعمل لما تحفظ) |
| [[code -]] بعد pipe | افتح output أي أمر في تاب |

> افتح فولدر المشروع نفسه مش الفولدر الأب، عشان ESLint و TypeScript يلاقوا الـ config الصح.`,
          lines: [
            "روح لفولدر المشروع وافتحه.",
            "افتحه في الشباك الحالي بدل شباك جديد.",
            "افتح ملفين.",
            "افتح output أي أمر كملف في المحرر."
          ],
          sol: R`[[code -r .]] هيفتح المشروع في الشباك اللي مفتوح بالفعل بدل شباك جديد. [[git log --oneline -30 | code -]] هيطبع في الترمنال [[Reading from stdin via: /tmp/code-stdin-xxx]] ويفتح تاب فيه ٣٠ سطر من الـ log، وتقدر تدوّر فيه بـ Ctrl+F. الأمر بيرجّعلك الترمنال أول ما الـ input يخلص (مع [[git log]] على طول)، إلا لو ضفت [[--wait]] فيستنى لحد ما تقفل التاب.

لو [[code]] قال command not found: على الماك افتح VS Code و Palette ثم «Shell Command: Install 'code' command in PATH». على ويندوز التسطيب بيضيفه لوحده، اقفل الترمنال وافتحه. وعلى ويندوز في PowerShell أو CMD، [[code -]] بيشتغل بنفس الطريقة.`
        },
        {
          cmd: "code --goto",
          title: "افتح ملف على سطر وعمود معين",
          desc: R`[[code --goto file:line:column]] (أو [[-g]]) بيفتح الملف والمؤشر على المكان بالظبط. مفيد مع أي أداة بتطبع مسارات بالشكل ده: eslint و tsc و grep و stack traces.

و [[code --wait]] (أو [[-w]]) بيستنى لحد ما تقفل الملف، ودا اللي بيخلي VS Code ينفع يبقى المحرر بتاع Git.`,
          example: R`code --goto src/server.ts:118:12
code -r -g package.json:5
git config --global core.editor "code --wait"`,
          try: R`شغّل [[npx tsc --noEmit]] وخد أول غلط وافتحه بـ [[code -g]]. وبعدين اضبط core.editor واعمل [[git commit]] من غير [[-m]]: الرسالة هتتفتح في تاب، اكتبها واقفل التاب.`,
          deep: {
            why: "الأداة قالتلك المكان بالظبط. نسخ اسم الملف وفتحه وبعدين Ctrl+G تلات خطوات، و --goto خطوة.",
            how: R`الصيغة [[path:line:column]] والعمود اختياري، والمسار نسبي للمكان اللي انت فيه في الترمنال.

[[--wait]] بيخلي الأمر ميرجعش لحد ما تقفل التاب. Git بيفتح ملف رسالة الـ commit ويستنى، ولما تقفل التاب يكمّل. من غير [[--wait]]، Git هيلاقي الرسالة فاضية ويلغي الـ commit.

جوه الترمنال المدمج مش محتاج --goto: Ctrl+Click على المسار بيعمل نفس الحاجة.`,
            when: "سكربتات وأدوات بتطبع مسارات، وضبط Git أول مرة على جهاز.",
            mistakes: "تنسى [[--wait]] في core.editor، فكل commit من غير -m يتلغي بـ «Aborting commit due to empty commit message». ومسار فيه مسافات من غير علامات تنصيص."
          },
          teach: R`## افتح الملف والمؤشر على المكان بالظبط

أدوات كتير (tsc و eslint و grep و stack traces) بتطبع مكان الغلط: ملف وسطر وعمود. [[code --goto]] بياخد المكان ده ويفتح الملف والمؤشر عليه. والسطر التالت في المثال حاجة تانية خالص: بيخلي Git يستخدم VS Code كمحرر.

---

## ١. [[code --goto src/server.ts:118:12]]

من [[code --help]] (اتشغّل على VS Code 1.140):

~~~text الناتج (جزء)
  -g --goto <file:line[:character]>          Open a file at the path on the
                                             specified line and character
                                             position.
~~~

نقرا الصيغة [[<file:line[:character]>]]:

| الحتة | معناها |
|---|---|
| [[file]] | المسار، نسبة للفولدر اللي انت فيه في الترمنال |
| [[:line]] | رقم السطر |
| [[[:character]]] | العمود. الأقواس المربعة في الـ help معناها **اختياري** |

فـ [[src/server.ts:118:12]] يعني السطر ١١٨، الحرف رقم ١٢.

### خلي بالك: tsc بيكتب المكان بشكل تاني

ده غلط حقيقي من [[tsc]] (اتشغّل في Docker بـ TypeScript 5):

~~~text الناتج
server.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

[[tsc]] بيكتب [[(1,7)]] بأقواس وفاصلة، و [[--goto]] عايز نقطتين. فتحوّله بإيدك:

~~~text
server.ts(1,7)   →   code -g server.ts:1:7
~~~

وجوه الترمنال المدمج مش محتاج ده خالص: Ctrl+Click على المسار بيفتحه على المكان.

---

## ٢. [[code -r -g package.json:5]]

- [[-r]] في الشباك المفتوح (درس [[code .]]).
- [[-g]] اختصار [[--goto]].
- [[:5]] السطر ٥ من غير عمود، فالمؤشر في أوله.

---

## ٣. [[git config --global core.editor "code --wait"]]

لما Git محتاج منك نص (رسالة commit من غير [[-m]]، أو rebase)، بيفتح محرر ويستنى. السطر ده بيقوله يفتح VS Code.

| الحتة | معناها |
|---|---|
| [[git config]] | غيّر إعداد في Git |
| [[--global]] | لكل الـ repos بتوعك (في [[~/.gitconfig]])، مش للـ repo ده بس |
| [[core.editor]] | اسم الإعداد: المحرر |
| [["code --wait"]] | القيمة. التنصيص لازم عشان فيها مسافة، فتتحفظ كقيمة واحدة |

### ليه [[--wait]] بالذات؟

من [[code --help]]:

~~~text الناتج (جزء)
  -w --wait                                  Wait for the files to be closed
                                             before returning.
~~~

من غيرها، [[code]] بيفتح الملف ويرجع فورًا. Git يفتكر إنك خلصت، يقرا الملف فيلاقيه فاضي، ويلغي الـ commit. ومعاها، [[code]] بيفضل مستني لحد ما تقفل التاب، وبعدها Git يكمّل.

على الجهاز اللي اتجرّب عليه، الإعداد كان متحط أصلًا (تسطيب Git for Windows بيسأل عن المحرر). قريناه من غير ما نغيّره:

~~~powershell
git config --global core.editor
~~~

~~~text الناتج
"C:\Users\ali\AppData\Local\Programs\Microsoft VS Code\bin\code" --wait
~~~

نفس الفكرة بمسار كامل بدل [[code]] بس، و [[--wait]] موجودة.

### اللي بيحصل في [[git commit]] (من الـ docs)

1. Git يطبع [[hint: Waiting for your editor to close the file...]] ويفتح تاب [[COMMIT_EDITMSG]].
2. تكتب الرسالة في أول سطر، وتحفظ، وتقفل التاب.
3. Git ياخد الرسالة ويعمل الـ commit.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[code -g file:line:col]] | افتح الملف على المكان ده |
| [[code -r -g file:line]] | نفسه في الشباك المفتوح |
| [[core.editor "code --wait"]] | Git يكتب رسايله في VS Code ويستنى |

> [[--goto]] عايز [[file:line:col]] بنقطتين، و [[core.editor]] من غير [[--wait]] يلغي كل commit.`,
          lines: [
            "افتح server.ts على سطر 118 عمود 12.",
            "في الشباك الحالي، على سطر 5.",
            "خلي Git يفتح رسايل الـ commit والـ rebase في VS Code ويستنى تقفلها."
          ],
          sol: R`[[code -g src/server.ts:118:12]] يفتح الملف والمؤشر على السطر ١١٨ العمود ١٢. بعد [[git config --global core.editor "code --wait"]]، [[git commit]] من غير [[-m]] هيطبع [[hint: Waiting for your editor to close the file...]] ويفتح تاب [[COMMIT_EDITMSG]]. اكتب الرسالة في أول سطر، احفظ، واقفل التاب: الـ commit هيخلص.

لو قفلت التاب من غير ما تكتب حاجة، git هيقول [[Aborting commit due to empty commit message.]]، وده طبيعي. ولو git مستناش وعمل commit فاضي أو فتح vim، يبقى [[--wait]] ناقص أو الإعداد متحفظ غلط، شوف [[git config --global core.editor]].`
        },
        {
          cmd: "code --diff",
          title: "قارن ملفين جنب بعض",
          desc: R`[[code --diff a b]] (أو [[-d]]) بيفتح الملفين في diff: الفرق متلوّن، وتقدر تعدّل في الجهة اليمين. مفيد لملفين config (local و production)، أو نسختين من ملف مش في Git.

ومن جوه المحرر: كليك يمين على ملف في الشجرة ثم Select for Compare، وعلى التاني Compare with Selected.`,
          example: R`code --diff .env.example .env
code -d nginx.conf nginx.conf.bak
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'`,
          try: R`قارن [[.env.example]] بـ [[.env]] في مشروعك وشوف مين ناقص. وجرّب [[git difftool HEAD~1 -- package.json]] بعد الإعداد.`,
          deep: {
            why: "«ليه شغال على جهازي ومش على السيرفر؟» كتير بتبقى سطرين مختلفين في config، وعينك مش هتلاقيهم في ملفين ١٠٠ سطر.",
            how: R`الـ diff editor هو نفسه اللي Source Control بيستخدمه: الأسهم فوق بتنقل بين التغييرات، والجهة اليمين قابلة للتعديل. وتقدر تخليه inline بدل جنب بعض من الأيقونات فوق.

[[git difftool]] بعد الإعداد بيفتح كل ملف متغير في VS Code واحد ورا التاني. و [[$LOCAL]] و [[$REMOTE]] بيحط Git مكانهم مسارات مؤقتة للنسختين.

وفيه [[--merge]] لـ 3-way merge من برا، بس جوه المشروع Merge Editor (مستوى ٢) أسهل.`,
            when: "مقارنة configs، أو نسخ ملفات من مصادر مختلفة، أو مراجعة قبل ما تكتب فوق ملف.",
            mistakes: "تكتب الأمر بعلامات تنصيص مزدوجة في bash، فالـ shell يبدّل [[$LOCAL]] بفاضي قبل ما يوصل لـ Git: استخدم علامات مفردة زي المثال. وتنسى إن الجهة اليمين ملف حقيقي، فتعدّل فيها بالغلط وتحفظ."
          },
          teach: R`## ملفين جنب بعض، والفرق متلوّن

[[code --diff]] بيفتح ملفين في الـ diff editor بتاع VS Code: الشمال الملف الأول واليمين التاني، والسطور المختلفة متلوّنة. وآخر سطرين في المثال بيخلوا [[git difftool]] يستخدم نفس الشاشة دي.

من [[code --help]] (اتشغّل على VS Code 1.140):

~~~text الناتج (جزء)
  -d --diff <file> <file>                    Compare two files with each
                                             other.
~~~

يعني [[-d]] و [[--diff]] نفس الحاجة، وبعدها ملفين بالظبط. (أوامر [[code --diff]] ما اتشغّلتش هنا لأنها بتفتح المحرر. شكل الشاشة من الـ docs.)

---

## ١. [[code --diff .env.example .env]]

- [[.env.example]] الملف اللي في Git وفيه أسامي المتغيرات المطلوبة من غير قيم سرية.
- [[.env]] الملف الحقيقي عندك بالقيم (مش في Git).

| اللون | معناه هنا |
|---|---|
| أحمر في الشمال بس | متغير موثّق في المثال ومش موجود عندك: ناقصك |
| أخضر في اليمين بس | عندك ومش موثّق: يمكن نسيت تضيفه للمثال |

والجهة اليمين ملف حقيقي تقدر تعدّل فيه وتحفظ.

---

## ٢. [[code -d nginx.conf nginx.conf.bak]]

نفس الأمر بالاختصار [[-d]]. [[.bak]] امتداد متعارف عليه لنسخة احتياطية. فقبل ما ترجّع النسخة القديمة فوق الجديدة، بتشوف إيه اللي هيتغير.

---

## ٣. [[git config --global diff.tool vscode]]

| الحتة | معناها |
|---|---|
| [[--global]] | لكل الـ repos بتوعك |
| [[diff.tool]] | الإعداد: أداة المقارنة اللي [[git difftool]] يستخدمها |
| [[vscode]] | اسم بنختاره احنا. السطر الجاي بيعرّف الاسم ده بيشغّل إيه |

---

## ٤. [[git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE']]

- [[difftool.vscode.cmd]]: الأمر اللي يتشغّل للأداة اللي اسمها [[vscode]]. لاحظ الاسم في النص.
- [[--wait]]: [[code]] يستنى لحد ما تقفل التاب، فـ Git ميفتحش الملف اللي بعده إلا لما تخلص (درس [[code --goto]]).
- [[$LOCAL]] و [[$REMOTE]]: Git بيحط مكانهم مسارات النسختين (القديمة والجديدة) وقت التشغيل.

### ليه التنصيص المفرد [[' ']]؟

علامة [[$]] في bash وفي PowerShell معناها «متغير». لو كتبت الأمر بتنصيص مزدوج [[" "]]، الـ shell بتاعك هيدوّر على متغير اسمه [[LOCAL]] **قبل** ما Git يشوف حاجة، ومش هيلاقيه، فيحط فاضي. جربنا الاتنين بـ [[echo]] في bash (جوه [[ubuntu:24.04]] في Docker):

~~~bash
echo "code --wait --diff $LOCAL $REMOTE"
echo 'code --wait --diff $LOCAL $REMOTE'
~~~

~~~text الناتج
code --wait --diff
code --wait --diff $LOCAL $REMOTE
~~~

الأول [[$LOCAL]] و [[$REMOTE]] اختفوا، فـ Git كان هيتحفظ عنده أمر ناقص. التاني وصلوا زي ما هم. ونفس النتيجة بالظبط في PowerShell 7 و Windows PowerShell 5.1 بـ [[Write-Output]]: المزدوج بيفضّيهم والمفرد بيسيبهم. فالسطر ده بالتنصيص المفرد شغال في الاتنين.

---

## ٥. الاستخدام

بعد الإعداد:

~~~text
git difftool HEAD~1 -- package.json
~~~

- [[HEAD~1]] الـ commit اللي قبل الأخير.
- [[--]] اللي بعدها مسارات ملفات مش أسامي branches.

Git بيسأل [[Launch 'vscode' [Y/n]?]] لكل ملف، Enter يفتح الـ diff. (من الـ docs، الإعداد ما اتعملش على الجهاز ده عشان منغيّرش الـ config بتاع Git.)

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[code --diff a b]] | قارن ملفين |
| [[code -d a b]] | نفسه بالاختصار |
| [[diff.tool vscode]] | [[git difftool]] يستخدم أداة اسمها vscode |
| [[difftool.vscode.cmd '...']] | الأداة دي بتشغّل [[code --wait --diff]] |

> [[$LOCAL]] و [[$REMOTE]] بين تنصيص مفرد، وإلا الـ shell يفضّيهم قبل ما يوصلوا لـ Git.`,
          lines: [
            "شوف الـ .env ناقصه أنهي متغيرات من المثال.",
            "قارن config بالنسخة الاحتياطية قبل ما ترجّعها.",
            "خلي VS Code أداة الـ diff بتاعة Git.",
            "الأمر اللي Git يشغّله: النسختين في diff، ويستنى تقفل."
          ],
          sol: R`[[code --diff .env.example .env]] هيفتح تاب diff: الشمال [[.env.example]] واليمين [[.env]]. السطور اللي في الشمال بس (أحمر) يعني متغيرات موثّقة ومش موجودة عندك، واللي في اليمين بس (أخضر) عندك ومش موثّقة. بعد الإعداد، [[git difftool HEAD~1 -- package.json]] هيسأل [[Launch 'vscode' [Y/n]?]]، دوس Enter ويفتح diff بين النسخة القديمة والحالية.

لو الـ diff ظهر كله أحمر وأخضر مع إن الملفين شبه بعض، غالبًا فرق في line endings (CRLF و LF) أو ترتيب السطور. ولو [[difftool]] فتح أداة تانية، يبقى [[diff.tool]] متحفظ في مكان تاني (زي config المشروع). ولو الأمر اتعمل على ويندوز في PowerShell، علامات التنصيص المفردة حوالين [[$LOCAL]] مهمة عشان PowerShell ميحاولش يفكها.`
        },
        {
          cmd: "code --list-extensions",
          title: "خد backup للـ extensions ورجّعها على جهاز جديد",
          desc: R`[[code --list-extensions]] بيطبع IDs كل الـ extensions المتسطّبة، سطر لكل واحدة. احفظها في ملف، وعلى الجهاز الجديد سطّبهم بـ [[code --install-extension]] في loop.

ودا بديل لـ Settings Sync لو مش عايز تربط حساب، أو عايز لستة مكتوبة تشاركها أو تحطها مع الـ dotfiles.`,
          example: R`code --list-extensions > extensions.txt
code --list-extensions --show-versions
xargs -L 1 code --install-extension < extensions.txt
code --install-extension dbaeumer.vscode-eslint
code --uninstall-extension ms-python.python
# PowerShell:
Get-Content extensions.txt | ForEach-Object { code --install-extension $_ }`,
          try: "خد backup للـ extensions عندك في ملف، وافتحه وامسح منه اللي مبقتش بتستخدمه. دي فرصة تنضّف.",
          deep: {
            why: "جهاز جديد أو فورمات، وعندك ٣٠ extension مش فاكر أساميهم.",
            how: R`الـ ID شكله [[publisher.name]]، وهو نفسه اللي بيتكتب في extensions.json و devcontainer.json. و [[--install-extension]] بيقبل ID أو مسار ملف [[.vsix]] (لـ extension مش على الـ marketplace، أو جهاز من غير نت).

الأوامر دي بتشتغل على الـ profile الحالي، و [[--profile]] بيحدد profile معين.

جوه WSL أو Remote، [[code --list-extensions]] بيطبع الـ extensions اللي على الناحية دي (لينكس) مش اللي على ويندوز.`,
            when: "قبل فورمات أو جهاز جديد، أو تجهيز جهاز لطلبة أو لزميل.",
            mistakes: "ترجّع كل حاجة اتسطّبت من ٣ سنين فيرجع الزحام والبطء. وتحفظ اللستة من جوه WSL وتفتكرها كل حاجة، وهي نص الحكاية."
          },
          teach: R`## لستة الـ extensions كنص، تتحفظ وترجع

[[code --list-extensions]] بيطبع ID كل extension متسطّبة، سطر لكل واحدة. ولأنه نص عادي، تقدر تحفظه في ملف، وعلى جهاز جديد تقرا الملف وتسطّب سطر سطر. هنمشي على المثال سطر سطر، والسطور اللي بتسطّب أو بتشيل جربناها بـ [[echo]] بدل ما نغيّر حاجة على الجهاز.

---

## ١. [[code --list-extensions > extensions.txt]]

الأول من غير الملف، عشان نشوف الأمر بيطبع إيه (ويندوز، VS Code 1.140، أول سطور):

~~~powershell
code --list-extensions
~~~

~~~text الناتج (أوله)
21st-dev.21st-extension
anthropic.claude-code
bradlc.vscode-tailwindcss
christian-kohler.npm-intellisense
dalirnet.rtl-markdown
davidanson.vscode-markdownlint
dbaeumer.vscode-eslint
~~~

كل سطر ID بشكل [[publisher.name]]: [[dbaeumer]] الناشر و [[vscode-eslint]] اسم الـ extension. وعلى الجهاز ده كانوا ٤٦ سطر (عدّيناهم بـ [[Measure-Object]]). مرتبين أبجديًا بحروف صغيرة.

و [[>]] معناها «ابعت الناتج لملف بدل الشاشة»، وبيكتب فوق الملف لو موجود. فالسطر ده بيعمل [[extensions.txt]] فيه اللستة دي.

---

## ٢. [[code --list-extensions --show-versions]]

~~~text الناتج (سطرين منه)
dbaeumer.vscode-eslint@3.0.34
esbenp.prettier-vscode@12.4.0
~~~

[[@]] وبعدها النسخة المتسطّبة. مفيد لو extension اتحدثت وبوّظت حاجة: تعرف كانت أنهي نسخة.

---

## ٣. [[xargs -L 1 code --install-extension < extensions.txt]] (bash)

نفكّه من اليمين للشمال:

- [[< extensions.txt]] ابعت الملف كـ input (عكس [[>]]).
- [[xargs]] بياخد الـ input ويحوّله arguments لأمر.
- [[-L 1]] سطر واحد لكل تشغيلة، فالأمر يتشغّل مرة لكل extension.
- [[code --install-extension]] الأمر اللي هيتشغّل، والسطر بيتلزق في آخره.

حطينا [[echo]] قبل [[code]] عشان يطبع الأوامر بدل ما يسطّب (جوه [[ubuntu:24.04]] في Docker، والملف فيه سطرين):

~~~bash
xargs -L 1 echo code --install-extension < extensions.txt
~~~

~~~text الناتج
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
~~~

ده بالظبط اللي كان هيتنفّذ من غير [[echo]].

---

## ٤. [[code --install-extension]] و [[--uninstall-extension]]

من [[code --help]]:

~~~text الناتج (جزء)
  --install-extension <ext-id | path> Installs or updates an extension. The
                                      argument is either an extension id or a
                                      path to a VSIX.
  --uninstall-extension <ext-id>      Uninstalls an extension.
~~~

- [[install]] بياخد ID أو مسار ملف [[.vsix]] (ملف extension تنزّله وتسطّبه من غير marketplace). ولو متسطّبة أصلًا بيحدّثها.
- [[uninstall]] بياخد ID بس.

(ما شغّلناهمش هنا عشان منغيّرش الـ extensions على الجهاز.)

---

## ٥. نفس الـ restore في PowerShell

~~~powershell
Get-Content extensions.txt | ForEach-Object { code --install-extension $_ }
~~~

- [[# PowerShell:]] اللي فوقه في المثال عنوان بيقول السطر ده لـ PowerShell، لأن [[xargs]] مش موجود فيه.
- [[Get-Content]] بيقرا الملف سطر سطر.
- [[|]] بيبعت كل سطر للي بعده.
- [[ForEach-Object { ... }]] نفّذ الكود اللي بين الأقواس مرة لكل سطر.
- [[$_]] السطر الحالي.

نفس التجربة بـ [[Write-Output]] بدل التسطيب، في PowerShell 7 و Windows PowerShell 5.1 (نفس الناتج):

~~~powershell
Get-Content extensions.txt | ForEach-Object { Write-Output "code --install-extension $_" }
~~~

~~~text الناتج
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
~~~

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[--list-extensions > file]] | احفظ اللستة |
| [[--show-versions]] | اللستة بالنسخ |
| [[xargs -L 1 code --install-extension < file]] | سطّب كل سطر (bash) |
| [[Get-Content file]] ثم [[ForEach-Object]] | نفس الحاجة (PowerShell) |
| [[--install-extension ID]] | سطّب واحدة |
| [[--uninstall-extension ID]] | شيل واحدة |

> اللستة بتطلع من الناحية اللي الترمنال فيها: من جوه WSL أو Remote هتطلع extensions الناحية دي بس.`,
          lines: [
            "احفظ الـ IDs في ملف.",
            "بالنسخ، عشان تعرف لو تحديث extension هو اللي بوّظ حاجة.",
            "سطّب كل سطر في الملف (bash أو WSL أو Git Bash).",
            "سطّب واحدة بالـ ID.",
            "شيل واحدة.",
            "نفس الـ restore من PowerShell."
          ],
          sol: R`[[code --list-extensions > extensions.txt]] هيعمل ملف فيه ID لكل extension في سطر، زي [[dbaeumer.vscode-eslint]] و [[esbenp.prettier-vscode]]. و [[--show-versions]] بيضيف الإصدار: [[dbaeumer.vscode-eslint@3.0.x]]. امسح من الملف اللي مش بتستخدمه، والملف ده هو اللي هتسطّب بيه على جهاز جديد.

لو الملف طلع فاضي، يبقى فيه أكتر من VS Code (زي Insiders أو Cursor) والـ [[code]] بيشاور على واحد تاني. ولو شغّلته من ترمنال جوه Remote-SSH أو WSL، هيطلع الـ extensions المتسطبة على الجهاز البعيد بس. وعلى ويندوز، [[xargs]] مش موجود في PowerShell، استخدم سطر PowerShell اللي في المثال.`
        }
      ]
    },
    {
      t: "لما المحرر يتقل أو يبوظ",
      l: 3,
      n: "Reload، وتقفل الـ extensions، وتعرف مين التقيل، وتختار اللي يستاهل بس",
      items: [
        {
          cmd: "Reload Window",
          title: "الأخطاء الحمرا مش حقيقية أو المحرر معلّق",
          desc: R`Developer: Reload Window من Command Palette بيعيد تحميل الشباك في ثانيتين، من غير ما تقفل VS Code، والتابات بترجع زي ما هي. أغلب «VS Code باظ» بتتحل بيه.

ولو المشكلة في TypeScript بالذات (خط أحمر على حاجة موجودة، أو import مش شايفه بعد [[npm install]] أو [[prisma generate]])، TypeScript: Restart TS Server أخف. ونفس الحكاية لـ ESLint: Restart ESLint Server.`,
          example: R`Ctrl+Shift+P           Developer: Reload Window
Ctrl+Shift+P           TypeScript: Restart TS Server
Ctrl+Shift+P           ESLint: Restart ESLint Server
Ctrl+Shift+U           Output panel: pick "TypeScript" or "ESLint" to see why
Mac: Shift+Cmd+U / Linux: Ctrl+K Ctrl+H`,
          try: "بعد [[npx prisma generate]] أو إضافة مكتبة، لو لسه فيه خط أحمر على حاجة موجودة، جرّب Restart TS Server بدل ما تقفل VS Code.",
          flag: "keys",
          deep: {
            why: "الـ language server بيبني صورة للمشروع في الذاكرة، ولما حاجات تتغير من برا (مكتبة جديدة، types متولّدة، checkout لفرع مختلف جدًا) الصورة ممكن تتأخر.",
            how: R`كل لغة ليها عملية منفصلة (TypeScript server، ESLint server). الـ Restart بيقفل العملية دي ويعيدها فتقرا المشروع من الأول. و Reload Window بيعيد تشغيل كل الـ extensions مرة واحدة.

لوحة Output (من القايمة اللي فيها تختار الـ extension) بتوريك رسايل كل extension، زي «Cannot find module» أو «config not found»، ودا أول مكان تبص فيه لو extension مش شغالة.`,
            when: "أخطاء مش منطقية بعد تسطيب أو توليد أو تبديل فرع، أو extension بطّلت ترد.",
            mistakes: "تقفل VS Code كله وتفتحه، ودا أبطأ وبيقفل الترمنالات والـ dev server. أو تفضل تعمل Restart والمشكلة إن TypeScript بتاع VS Code غير بتاع المشروع: شوف [[js/ts.tsdk.path]] في درس «.vscode/settings.json»."
          },
          teach: R`## تعيد تشغيل الحتة اللي باظت بس

VS Code مش برنامج واحد: الواجهة حاجة، وكل لغة ليها برنامج لوحده شغال في الخلفية اسمه **language server** (زي TypeScript server و ESLint server). الـ server ده بيبني صورة للمشروع في الذاكرة، ولما حاجة تتغير من برا (مكتبة جديدة، أو types اتولّدت، أو فرع Git تاني) الصورة ممكن تبقى قديمة، فيطلع خط أحمر على كود سليم. المثال ٥ سطور، كل واحد أداة بحجم مختلف.

---

## ١. السطور واحد واحد

### [[Ctrl+Shift+P]] ثم [[Developer: Reload Window]]

بيعيد تحميل الشباك كله: الواجهة وكل الـ extensions. بياخد ثانيتين، والتابات المفتوحة بترجع زي ما هي. ده الحل العام لما المحرر يعلّق أو extension تبطّل ترد.

### [[TypeScript: Restart TS Server]]

بيقفل TypeScript server بس ويشغّله تاني، فيقرا المشروع من الأول. أخف وأسرع من Reload. ده المناسب بعد [[npm install]] أو [[npx prisma generate]] لما الـ import يفضل أحمر مع إن المكتبة موجودة.

### [[ESLint: Restart ESLint Server]]

نفس الفكرة لـ ESLint، بعد ما تغيّر [[eslint.config.js]] أو تسطّب plugin والتحذيرات القديمة لسه ظاهرة. الأمر ده جاي من extension الـ ESLint، فمش هيظهر لو مش متسطّبة.

### [[Ctrl+Shift+U]]: لوحة Output

قبل ما تعيد تشغيل حاجة، اعرف ليه باظت. لوحة Output فيها قايمة فوق يمين، تختار منها اسم الـ extension ([[TypeScript]] أو [[ESLint]])، فتشوف الرسايل بتاعتها، زي [[Cannot find module]] أو إن الـ config مش لاقيه.

### الماك ولينكس

| الأمر | ويندوز | الماك | لينكس |
|---|---|---|---|
| Command Palette | Ctrl+Shift+P | Shift+Cmd+P | Ctrl+Shift+P |
| Output | Ctrl+Shift+U | Shift+Cmd+U | Ctrl+K Ctrl+H |

على لينكس Ctrl+Shift+U بيستخدمه النظام لكتابة حروف Unicode، عشان كده اختصار Output مختلف. (الاختصارات دي من مرجع اختصارات VS Code الرسمي.)

---

## ٢. تختار أنهي واحد؟

| المشكلة | الحل |
|---|---|
| خط أحمر على import موجود أو types جديدة | Restart TS Server |
| تحذيرات ESLint قديمة بعد تعديل الـ config | Restart ESLint Server |
| المحرر معلّق أو extension مبتردش | Reload Window |
| مش عارف السبب | Output الأول، وبعدين اختار |

> لو بعد الـ restart الخط الأحمر لسه موجود، جرّب [[npx tsc --noEmit]] في الترمنال: لو هو كمان قال نفس الغلط، يبقى الغلط حقيقي في الكود مش في المحرر.

---

## الخلاصة

Reload Window بيعيد كل حاجة، و Restart Server بيعيد لغة واحدة، و Output بيقولك السبب. ابدأ بالأصغر، ومتقفلش VS Code كله: ده بيقفل الترمنالات والـ dev server.`,
          sol: R`بعد Palette ثم «TypeScript: Restart TS Server»، الـ status bar تحت هيقول «Initializing JS/TS language features» ثواني، وبعدين الخطوط الحمرا اللي كانت على types اتولدت جديد (زي Prisma client) هتختفي من غير ما تقفل VS Code. ولو لسه موجودة، Ctrl+Shift+U ثم اختار «TypeScript» من اللستة فوق يمين، هيوريك لوج الـ server.

لو الخط الأحمر لسه موجود بعد الـ restart، يبقى الغلط حقيقي: شغّل [[npx tsc --noEmit]] في الترمنال. لو هو كمان قال نفس الغلط، يبقى مش مشكلة المحرر. ولو الترمنال مقالش حاجة والمحرر لسه أحمر، غالبًا VS Code بيستخدم نسخة TypeScript غير اللي في المشروع، «TypeScript: Select TypeScript Version» ثم Use Workspace Version.`
        },
        {
          cmd: "code --disable-extensions",
          title: "اعرف لو extension هي اللي مبوّظة المحرر",
          desc: R`[[code --disable-extensions .]] بيفتح المشروع من غير أي extension. لو المشكلة اختفت، يبقى extension هي السبب. ومن جوه المحرر: Help: Start Extension Bisect بيقفل نص الـ extensions ويسألك «المشكلة لسه موجودة؟» لحد ما يلاقي المتهمة.

و Developer: Show Running Extensions بيوريك كل extension خدت كام وقت عشان تشتغل، ودا بيوضّح مين التقيلة.`,
          example: R`code --disable-extensions .
code --disable-extension eamodio.gitlens .
code --status`,
          try: "افتح مشروعك بـ [[--disable-extensions]] وقارن سرعة الفتح. وبعدين في الوضع العادي شوف Show Running Extensions ورتّبهم بالوقت.",
          deep: {
            why: "VS Code بطيء، أو الكتابة بتقطّع، أو format on save بيعمل حاجة غريبة. غالبًا extension، بس أنهي واحدة من ٣٠؟",
            how: R`[[--disable-extensions]] للجلسة دي بس، مش بيغيّر حاجة في الإعدادات. والـ Bisect بيعمل binary search: ٣٠ extension محتاجين حوالي ٥ أسئلة بس.

Help ثم Open Process Explorer بيوريك كل عملية VS Code والرام والـ CPU بتوعها: الـ extension host، والـ TypeScript server، والترمنالات. عملية واكلة ١٠٠٪ CPU هي أول متهم.

ولما تلاقيها: Disable (Workspace) في صفحة الـ extension بيقفلها للمشروع ده بس، فتفضل شغالة في المشاريع اللي محتاجاها.`,
            when: "بطء، أو تقطيع، أو سلوك غريب ظهر فجأة (غالبًا بعد تحديث extension).",
            mistakes: "تمسح VS Code وتسطّبه تاني، والـ extensions والإعدادات بترجع زي ما هي لأنها في فولدر المستخدم مش فولدر البرنامج. أو تفتكر المشكلة في VS Code والسبب مشروع فيه فولدرات build ضخمة من غير [[files.watcherExclude]]."
          },
          teach: R`## افتح من غير extensions، وشوف المشكلة لسه موجودة ولا لأ

لما VS Code يبقى بطيء أو بيعمل حاجة غريبة، أول سؤال: المشكلة من VS Code نفسه، ولا من extension؟ أسهل طريقة تعرف: افتحه من غير extensions خالص. لو المشكلة اختفت، يبقى واحدة منهم السبب. المثال ٣ أوامر للتشخيص ده، والتلاتة شرحهم من [[code --help]] (اتشغّل على VS Code 1.140). الأوامر نفسها ما اتشغّلتش هنا لأنها بتفتح شبابيك.

---

## ١. [[code --disable-extensions .]]

~~~text الناتج (جزء من code --help)
  --disable-extensions                    Disable all installed extensions.
                                          This option is not persisted and is
                                          effective only when the command opens
                                          a new window.
~~~

نقرا الكلام ده كويس، فيه حاجتين مهمين:

1. **not persisted**: مش بيتحفظ. للشباك ده بس، والمرة الجاية تفتح عادي هتلاقي كل حاجة شغالة. يعني آمن تجربه.
2. **effective only when the command opens a new window**: بيشتغل بس لو الأمر فتح شباك **جديد**. لو المشروع ده مفتوح أصلًا في شباك، [[code]] هيروح للشباك الموجود والـ extensions شغالة فيه. فاقفل شباك المشروع الأول.

و [[.]] الفولدر الحالي، زي [[code .]].

---

## ٢. [[code --disable-extension eamodio.gitlens .]]

~~~text الناتج (جزء من code --help)
  --disable-extension <ext-id>            Disable the provided extension. This
                                          option is not persisted and is
                                          effective only when the command opens
                                          a new window.
~~~

نفس الحاجة بس لـ extension واحدة. لاحظ [[extension]] من غير [[s]]، وبعدها ID بشكل [[publisher.name]]: [[eamodio]] الناشر و [[gitlens]] الاسم. الـ IDs بتجيبها من [[code --list-extensions]]. ولو عايز تقفل أكتر من واحدة، كرّر [[--disable-extension]] قبل كل ID.

---

## ٣. [[code --status]]

~~~text الناتج (جزء من code --help)
  -s --status                             Print process usage and diagnostics
                                          information.
~~~

بيطبع في الترمنال كل عمليات VS Code الشغالة، والـ CPU والرام بتوع كل واحدة: الشباك، و extension host (اللي فيه الـ extensions)، و TypeScript server، والترمنالات. محتاج VS Code يكون مفتوح عشان يسأله. نفس المعلومات بشكل جدول من جوه المحرر: Help ثم Open Process Explorer. (شكل الناتج من الـ docs.)

---

## ٤. ولما تعرف إنها extension: Bisect

لو عندك ٣٠ extension، تجرّبهم واحدة واحدة متعب. **Help: Start Extension Bisect** من Command Palette بيعمل binary search:

1. يقفل نص الـ extensions ويعمل Reload، ويسألك: المشكلة لسه موجودة؟
2. حسب إجابتك، المتهمة في النص ده أو التاني، فيقسمه نصين تاني.
3. يكرر لحد ما يفضل واحدة.

كل سؤال بيقسم العدد على ٢: ٣٠ ثم ١٥ ثم ٨ ثم ٤ ثم ٢ ثم ١، يعني حوالي ٥ أسئلة بدل ٣٠ تجربة.

وعشان تعرف مين **التقيلة** (مش مين المبوّظة): Developer: Show Running Extensions بيعرض كل extension ووقت تشغيلها بالـ ms.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[--disable-extensions]] | كل الـ extensions مقفولة للشباك الجديد ده بس |
| [[--disable-extension ID]] | واحدة بس |
| [[--status]] | العمليات والـ CPU والرام |
| Extension Bisect | يلاقي المتهمة بأسئلة نعم ولا |

> الـ flags دي مبتشتغلش غير لو الأمر فتح شباك جديد، فاقفل شباك المشروع قبلها. وبعد ما تلاقي الـ extension، Disable (Workspace) بيقفلها في المشروع ده بس.`,
          lines: [
            "افتح المشروع من غير أي extension.",
            "اقفل extension واحدة بس للجلسة دي.",
            "اطبع العمليات والرام والـ CPU (و VS Code مفتوح)."
          ],
          sol: R`بـ [[code --disable-extensions .]] الشباك هيفتح أسرع بشكل ملحوظ لو عندك extensions كتير، وفي Extensions هتلاقيهم كلهم تحت «Disabled» (الإعداد ده للشباك ده بس، مش هيأثر بعدين). في الوضع العادي، Palette ثم «Developer: Show Running Extensions» هيعرض كل extension وجنبها وقت التفعيل بالـ ms، والأبطأ يستاهل تبص عليه.

لو المشكلة اختفت مع [[--disable-extensions]]، يبقى extension هي السبب، و «Help: Start Extension Bisect» بيلاقيها في كام خطوة بدل ما تجرب واحدة واحدة. ولو المشكلة لسه موجودة، يبقى مش من الـ extensions: جرّب الإعدادات أو حجم المشروع (فولدر [[node_modules]] ضخم من غير watcherExclude).`
        },
        {
          cmd: "Ctrl+Shift+X",
          title: "الـ extensions اللي تستاهل لمشروع Node و React",
          desc: R`Ctrl+Shift+X بيفتح الـ extensions، وفيه فلاتر: [[@installed]] و [[@recommended]] (من extensions.json) و [[@disabled]] و [[@builtin]]. وكل extension ليها Disable و Disable (Workspace).

اللي بيفرق فعلًا لمشروع Node و React و Docker: ESLint و Prettier (الأخطاء والشكل)، و Tailwind CSS IntelliSense، و Prisma، و extension الـ Docker من Microsoft (الـ Dockerfile و compose)، و GitLens (أو الـ blame المدمج لو كفاية)، و REST Client أو Thunder Client (تبعت requests من المحرر)، و Error Lens (الغلط مكتوب في آخر السطر)، و EditorConfig.`,
          example: R`Ctrl+Shift+X                 Extensions (Shift+Cmd+X on Mac)
@installed                   what you have
@recommended                 what this project suggests (.vscode/extensions.json)
@disabled / @builtin         disabled ones / shipped with VS Code
gear, Disable (Workspace)    off for this project only`,
          try: "افتح [[@installed]] وعدّهم. أي واحدة ما استخدمتهاش من شهر: Disable، وبعد أسبوع لو محدش افتقدها، Uninstall.",
          flag: "keys",
          deep: {
            why: "كل extension بتاكل رام ووقت تشغيل، وبعضها بيتعارض مع بعض (formatterين، اتنين linters). ٥ كويسين أحسن من ٤٠.",
            how: R`الـ extensions بتشتغل في عملية اسمها extension host. أغلبها بيصحى لما يحتاج بس (ملف من لغتها اتفتح)، بس فيه اللي بيصحى مع أول فتح ويفضل شغال.

Disable (Workspace) بيتحفظ لكل مشروع، فمشروع Python ميشغّلش extensions الـ React والعكس. ولو عايز فصل كامل: Profiles.

قبل ما تسطّب: بص على الناشر (علامة verified) وعدد التسطيبات وآخر تحديث. الـ extension بتشتغل بصلاحيات حسابك: تقرا ملفاتك وتكلّم النت.`,
            when: "إعداد جهاز جديد، أو المحرر بقى بطيء، أو مشروع بستاك جديد.",
            mistakes: "تسطّب Prettier ومعاه Beautify ومعاه formatter تالت، فكل حفظ الشكل يتغير: واحد بس، ومحدد في [[editor.defaultFormatter]]. وتسطّب extension من ناشر مجهول بيقلّد اسم مشهور: الـ extensions ليها صلاحيات كاملة على ملفاتك."
          },
          teach: R`## لوحة الـ extensions فيها فلاتر، استخدمها

Ctrl+Shift+X بيفتح الـ extensions. خانة البحث فوق مش للبحث في الـ marketplace بس: الكلمات اللي بتبدأ بـ [[@]] فلاتر بتعرض جزء من اللي عندك. المثال جدول صغير، هنمشي عليه سطر سطر.

---

## ١. السطور

### [[Ctrl+Shift+X]] (Shift+Cmd+X على الماك)

بيفتح لوحة Extensions في الشريط الجانبي. من غير ما تكتب حاجة بيعرض المتسطّب والمقترح.

### [[@installed]]

كل اللي متسطّب، ومقسوم Enabled و Disabled. نفس اللستة اللي [[code --list-extensions]] بيطبعها في الترمنال. على الجهاز اللي اتجرّب عليه طلعت ٤٦، وده رقم كبير.

### [[@recommended]]

اللي المشروع ده بيقترحه، من ملف [[.vscode/extensions.json]] (درس «.vscode/extensions.json»). لو فاضي، يبقى المشروع مفيهوش الملف ده.

### [[@disabled]] و [[@builtin]]

- [[@disabled]] المتسطّب بس مقفول.
- [[@builtin]] اللي جاي مع VS Code نفسه (دعم JavaScript و Git و Markdown مثلًا). دول مبيتشالوش، بس ممكن يتقفلوا.

### الترس ثم [[Disable (Workspace)]]

جنب كل extension ترس، فيه:

| الاختيار | بيعمل إيه |
|---|---|
| Disable | مقفولة في كل المشاريع |
| Disable (Workspace) | مقفولة في المشروع ده بس، وشغالة في الباقي |
| Uninstall | تتشال من الجهاز |

---

## ٢. اللي يستاهل لمشروع Node و React

| الـ extension | بتعمل إيه | ID |
|---|---|---|
| ESLint | الأخطاء والتحذيرات وانت بتكتب | [[dbaeumer.vscode-eslint]] |
| Prettier | شكل الكود موحّد عند الحفظ | [[esbenp.prettier-vscode]] |
| Tailwind CSS IntelliSense | اقتراحات الـ classes | [[bradlc.vscode-tailwindcss]] |
| EditorConfig | المسافات ونهايات السطور زي ملف [[.editorconfig]] | [[editorconfig.editorconfig]] |

الـ IDs دي حقيقية: ظاهرة في [[code --list-extensions]] على الجهاز اللي اتجرّب عليه. والباقي (Prisma و Docker و GitLens و REST Client و Error Lens) دوّر عليهم بالاسم واتأكد من الناشر.

---

## ٣. قبل ما تسطّب

- **الناشر**: علامة verified جنب اسمه. فيه extensions بتقلّد أسامي مشهورة.
- **عدد التسطيبات وآخر تحديث**: extension ما اتحدثتش من سنين غالبًا مش هتشتغل كويس مع النسخ الجديدة.
- **الصلاحيات**: الـ extension بتشتغل بصلاحيات حسابك: تقرا ملفاتك وتكلّم النت.

---

## الخلاصة

| عايز | اكتب أو اعمل |
|---|---|
| اللي عندك | [[@installed]] |
| اللي المشروع بيقترحه | [[@recommended]] |
| المقفول / اللي مع VS Code | [[@disabled]] / [[@builtin]] |
| تقفل لمشروع واحد | الترس ثم Disable (Workspace) |

> formatter واحد بس (Prettier مثلًا)، ومحدد في [[editor.defaultFormatter]]. اتنين formatters مع بعض بيغيّروا شكل الملف كل حفظ.`,
          sol: R`[[@installed]] هيعرض كل اللي متسطب ومقسّم Enabled و Disabled، وفوق العدد. الرقم الطبيعي لمطوّر Node و React بين ١٠ و ٢٥. اللي فوق ٤٠ غالبًا فيه تكرار (زي ٣ extensions للـ formatting). الترس جنب extension ثم «Disable» يقفلها لكل حاجة، و «Disable (Workspace)» للمشروع ده بس.

ملحوظة: فيه extensions بتتسطب لوحدها كجزء من extension تانية (Extension Pack)، فلو عملت Disable لواحدة ولقيتها رجعت، شيل الـ pack نفسه. ولو [[@recommended]] فاضي، يبقى المشروع مفيهوش [[.vscode/extensions.json]].`
        }
      ]
    }
]);
