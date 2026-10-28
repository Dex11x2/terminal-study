// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "توصل للأمر بنفسك",
      l: 1,
      n: R`CMD مفيهوش [[man]] ولا [[Get-Help]]، بس فيه فهرس كامل بأوامره و [[/?]] لكل برنامج. القسم ده بيوريك توصل بيهم لأي أمر، وامتى تسيب CMD وتروح لـ PowerShell`,
      items: [
        {
          cmd: "help و /?",
          title: "فهرس أوامر CMD، والفرق بين الاتنين",
          desc: R`[[help]] لوحده بيطبع **فهرس كامل** بكل أوامر CMD الداخلية مع سطر وصف لكل واحد. على ويندوز 11 بيطلّع ٨٣ أمر. ودي أسرع طريقة تعرف CMD بيقدّم إيه أصلًا.

[[help dir]] بيطبع شرح أمر واحد. و [[dir /?]] بيطبع **نفس الكلام بالظبط** (جربنا الاتنين وقارنّا الناتج: متطابقين).

**والفرق المهم:** [[help]] بيعرف **أوامر CMD الداخلية بس**. لو جربت [[help ping]]، هيقولك:

[[This command is not supported by the help utility.  Try "ping /?".]]

لأن [[ping]] مش أمر من CMD، ده **برنامج** منفصل في [[C:\Windows\System32]]. والبرامج دي بتشرح نفسها بـ [[/?]].

**فالقاعدة:**
[[help]] لوحده = الفهرس (أوامر CMD بس).
[[help <أمر>]] أو [[<أمر> /?]] = شرح أمر داخلي.
[[<برنامج> /?]] = شرح برنامج خارجي، ودي الطريقة الوحيدة ليه.

ولو مش عارف الأمر داخلي ولا خارجي، [[where ping]] بيقولك: لو طلّع مسار ملف يبقى برنامج خارجي، ولو قال [[Could not find]] يبقى أمر داخلي.

> و [[/?]] مش [[--help]]. ويندوز بيستخدم الشرطة المايلة [[/]] للـ options، ولينكس بيستخدم [[-]]. بس برامج كتير حديثة على ويندوز (زي [[git]] و [[curl.exe]]) بتفهم [[--help]] كمان.`,
          example: R`help
help dir
dir /?
help ping
where ping`,
          try: R`شغّل [[help]] وعدّ كام أمر طلع بـ [[help | find /c " "]]. وبعدين جرّب [[help xcopy]] و [[xcopy /?]] وقارن.`,
          sol: R`~~~text الناتج (ويندوز 11، CMD)
C:\>help
For more information on a specific command, type HELP command-name
ASSOC          Displays or modifies file extension associations.
ATTRIB         Displays or changes file attributes.
BREAK          Sets or clears extended CTRL+C checking.
BCDEDIT        Sets properties in boot database to control boot loading.
CACLS          Displays or modifies access control lists (ACLs) of files.
CALL           Calls one batch program from another.
CD             Displays the name of or changes the current directory.
CHCP           Displays or sets the active code page number.
...
~~~

٨٣ أمر في الفهرس.

~~~text
C:\>help ping
This command is not supported by the help utility.  Try "ping /?".
~~~

**الرسالة نفسها بتقولك تعمل إيه.** و [[ping /?]]:

~~~text
Usage: ping [-t] [-a] [-n count] [-l size] [-f] [-i TTL] [-v TOS]
            [-r count] [-s count] [[-j host-list] | [-k host-list]]
            [-w timeout] [-R] [-S srcaddr] [-c compartment] [-p]
            [-4] [-6] target_name
~~~

ولاحظ إن [[ping]] بيستخدم **شرطة عادية** ([[-t]]) مش [[/t]]، لأنه برنامج قديم متكتب بأسلوب يونكس. فمتفترضش إن كل برامج ويندوز بتستخدم [[/]].

أما [[xcopy]] فـ [[help xcopy]] هيقول نفس رسالة «not supported» لأنه برنامج خارجي، و [[xcopy /?]] هو اللي بيشرحه.`,
          deep: {
            why: R`ناس كتير فاكرة إن CMD «مفيهوش مساعدة». فيه فهرس كامل وشرح لكل أمر، وموجود من غير نت. المشكلة إن محدش بيقوله إن [[help]] لوحده بيطبع الفهرس.`,
            how: R`**CMD فيه نوعين من الأوامر:**

| النوع | فين | المساعدة |
|---|---|---|
| داخلي (internal) | جوه [[cmd.exe]] نفسه | [[help X]] أو [[X /?]] |
| خارجي (external) | ملف [[.exe]] في [[System32]] | [[X /?]] بس |

أمثلة داخلية: [[dir]] و [[cd]] و [[copy]] و [[del]] و [[set]] و [[echo]] و [[for]] و [[if]].
أمثلة خارجية: [[ping]] و [[ipconfig]] و [[tasklist]] و [[xcopy]] و [[robocopy]] و [[netstat]].

**تعرف النوع إزاي:**

~~~text
where dir    →  INFO: Could not find files for the given pattern(s).
where ping   →  C:\Windows\System32\PING.EXE
~~~

[[where]] بيدوّر على **ملفات** بس، فالأوامر الداخلية مبيلاقيهاش. وده في حد ذاته الإجابة.

**حيل مع المساعدة الطويلة:**

~~~text
dir /? | more
dir /? > help.txt
dir /? | find "/S"
~~~

[[more]] بيوقف كل شاشة، و [[>]] بيحفظ في ملف، و [[find]] بيدوّر على سطر معين (وهو **حساس لحالة الحروف** افتراضيًا؛ [[/i]] بتلغي ده).

**و [[/?]] ليه شكلين في برامج ويندوز:**

| الشكل | أمثلة |
|---|---|
| [[/?]] | أغلب أوامر ويندوز: [[dir /?]] و [[tasklist /?]] |
| [[-?]] أو [[--help]] | برامج منقولة من يونكس: [[curl.exe --help]] و [[git --help]] |

ولو واحد منهم مش شغال، جرّب التاني. وأسوأ حالة: الأمر يتنفّذ من غير options وانت مش قاصد — فجرّب على حاجة مش مهمة.`,
            when: "أول ما تحتاج أمر في CMD. و [[help]] لوحده مرة واحدة عشان تعرف الموجود أصلًا.",
            mistakes: R`تجرّب [[help ipconfig]] وتستنتج إن مفيش مساعدة. ده برنامج خارجي، جرّب [[ipconfig /?]].

وتكتب [[--help]] لأمر ويندوز، فيتنفّذ بشكل غريب أو يقول [[Invalid switch]].

وتنسى [[| more]] فالصفحة تعدّي قدامك.`
          },
          teach: R`## الفكرة

CMD مفيهوش [[man]]، بس فيه فهرس كامل وشرح لكل أمر. الدرس ده بيوريك إزاي توصلهم، والفرق بين نوعين الأوامر.

كل الناتج من تشغيل حقيقي على ويندوز 11.

---

## ١. [[help]] لوحده: الفهرس

~~~cmd
help
~~~

~~~text الناتج (أول ١٢ سطر من ٨٣)
For more information on a specific command, type HELP command-name
ASSOC          Displays or modifies file extension associations.
ATTRIB         Displays or changes file attributes.
BREAK          Sets or clears extended CTRL+C checking.
BCDEDIT        Sets properties in boot database to control boot loading.
CACLS          Displays or modifies access control lists (ACLs) of files.
CALL           Calls one batch program from another.
CD             Displays the name of or changes the current directory.
CHCP           Displays or sets the active code page number.
CHDIR          Displays the name of or changes the current directory.
CHKDSK         Checks a disk and displays a status report.
CHKNTFS        Displays or modifies the checking of disk at boot time.
~~~

### نقرا الناتج

- السطر الأول بيقولك الخطوة الجاية: [[HELP command-name]].
- كل سطر: **اسم الأمر** وبعده **سطر وصف**.
- ٨٣ أمر إجمالًا.

**ودي أهم حاجة في الدرس:** في دقيقة واحدة شفت كل اللي CMD بيقدمه. مش محتاج تدوّر في جوجل على «أوامر CMD».

### والصفحة بتعدّي بسرعة

~~~cmd
help | more
~~~

[[more]] بيوقف كل شاشة، ومسافة بتنزّل صفحة، و [[q]] بتخرج.

~~~cmd
help > commands.txt
~~~

أو احفظها في ملف واقراها براحتك.

---

## ٢. [[help dir]] و [[dir /?]]: نفس الحاجة

~~~cmd
dir /?
~~~

~~~text الناتج (أول ١٤ سطر)
Displays a list of files and subdirectories in a directory.

DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]
  [/O[[:]sortorder]] [/P] [/Q] [/R] [/S] [/T[[:]timefield]] [/W] [/X] [/4]

  [drive:][path][filename]
              Specifies drive, directory, and/or files to list.

  /A          Displays files with specified attributes.
  attributes   D  Directories                R  Read-only files
               H  Hidden files               A  Files ready for archiving
               S  System files               I  Not content indexed files
               L  Reparse Points             O  Offline files
               -  Prefix meaning not
~~~

قارنّا ناتج [[help dir]] بناتج [[dir /?]] حرف بحرف: **متطابقين**.

فاستخدم اللي يريّحك. [[X /?]] أقصر، و [[help X]] بيشتغل حتى لو نسيت إن الأمر اسمه إيه بالظبط (الفهرس قدامك).

---

## ٣. الفخ: [[help ping]]

~~~cmd
help ping
~~~

~~~text الناتج
This command is not supported by the help utility.  Try "ping /?".
~~~

### ليه؟

CMD فيه **نوعين** من الأوامر:

| النوع | ده إيه | مثال |
|---|---|---|
| **داخلي** | جوه [[cmd.exe]] نفسه، مفيش ملف ليه | [[dir]] و [[cd]] و [[copy]] و [[set]] |
| **خارجي** | ملف [[.exe]] في [[C:\Windows\System32]] | [[ping]] و [[ipconfig]] و [[tasklist]] |

و [[help]] بيعرف **الداخلية بس**، لأنه بيقرا من نصوص مخزّنة جوه ويندوز للأوامر دي.

البرامج الخارجية بتشرح نفسها، وده بيحصل بـ [[/?]].

### الرسالة نفسها بتقولك الحل

[[Try "ping /?"]]. اقرا رسايل الخطأ، هي غالبًا فيها الخطوة الجاية.

---

## ٤. [[ping /?]]: شكل تاني من الـ syntax

~~~cmd
ping /?
~~~

~~~text الناتج (أول ٥ سطور)
Usage: ping [-t] [-a] [-n count] [-l size] [-f] [-i TTL] [-v TOS]
            [-r count] [-s count] [[-j host-list] | [-k host-list]]
            [-w timeout] [-R] [-S srcaddr] [-c compartment] [-p]
            [-4] [-6] target_name
~~~

### لاحظ حاجة مهمة

[[ping]] بيستخدم **شرطة عادية** ([[-t]] و [[-n]]) مش شرطة مايلة ([[/t]]).

**ليه؟** [[ping]] برنامج قديم جدًا متكتب بأسلوب يونكس، فورث شكل الـ options بتاعه. بينما أوامر CMD نفسها بتستخدم [[/]].

**القاعدة:** متفترضش. اقرا سطر الـ Usage، هو بيقولك الشكل.

---

## ٥. داخلي ولا خارجي؟ اسأل [[where]]

~~~cmd
where ping
~~~

~~~text الناتج
C:\Windows\System32\PING.EXE
~~~

~~~cmd
where dir
~~~

~~~text الناتج
INFO: Could not find files for the given pattern(s).
~~~

| الناتج | يعني | المساعدة |
|---|---|---|
| مسار ملف | **خارجي** | [[/?]] |
| [[Could not find]] | **داخلي** | [[help X]] أو [[X /?]] |

[[where]] بيدوّر على **ملفات** في الـ [[PATH]]. والأوامر الداخلية ملهاش ملفات، فمش بيلاقيها — وده في حد ذاته الإجابة.

### و [[where]] بيقبل نجمة

~~~cmd
where *.exe
~~~

~~~text الناتج (أول ٣ سطور)
C:\Users\...\pwsh.exe
C:\Windows\System32\agentactivationruntimestarter.exe
C:\Windows\System32\AggregatorHost.exe
~~~

كل البرامج اللي ويندوز يقدر يلاقيها من غير مسار كامل.

---

## ٦. تدوّر جوه المساعدة

المساعدة ممكن تبقى ٨٠ سطر. متقراهاش كلها:

~~~cmd
dir /? | find "/S"
~~~

~~~text الناتج
  /S          Displays files in specified directory and all subdirectories.
~~~

| الحتة | معناها |
|---|---|
| [[\|]] | وجّه الناتج |
| [[find "/S"]] | اطبع السطور اللي فيها النص ده |

**و [[find]] حساس لحالة الحروف افتراضيًا.** عشان يتجاهلها:

~~~cmd
dir /? | find /i "subdirect"
~~~

> في PowerShell البديل [[Select-String]]، وهو مش حساس افتراضيًا.

---

## ٧. [[/?]] ولا [[--help]]؟

| الشكل | البرامج |
|---|---|
| [[/?]] | أوامر ويندوز الأصلية: [[dir]] و [[tasklist]] و [[sc]] |
| [[-?]] | بعض البرامج القديمة |
| [[--help]] | المنقولة من يونكس: [[git]] و [[curl.exe]] و [[node]] |

ولو واحد مش شغال جرّب التاني. **بس خد بالك:** لو كتبت [[--help]] لبرنامج مش فاهمها، ممكن يعتبرها اسم ملف أو ينفّذ حاجة مش قاصدها. فجرّب على فولدر تجربة.

---

## الخلاصة

- [[help]] لوحده = فهرس بـ ٨٣ أمر مع وصف لكل واحد. شوفه مرة.
- [[help X]] و [[X /?]] نفس الناتج بالظبط للأوامر الداخلية.
- [[help]] بيعرف **الداخلية بس**؛ البرامج الخارجية بـ [[/?]].
- [[where X]] بيفرق بينهم: مسار = خارجي، [[Could not find]] = داخلي.
- [[ping]] بيستخدم [[-t]] مش [[/t]]: اقرا سطر الـ Usage متفترضش.
- [[| more]] للصفحات، و [[| find /i "كلمة"]] للبحث جوه المساعدة.`,
          lines: [
            R`الفهرس الكامل: ٨٣ أمر داخلي مع وصف سطر لكل واحد`,
            R`شرح أمر داخلي واحد`,
            R`نفس الناتج بالظبط، وده الشكل الأشهر`,
            R`بيفشل لأن ping برنامج خارجي، والرسالة بتقولك تعمل إيه`,
            R`بيفرق بين الداخلي والخارجي: مسار يعني برنامج، ومفيش يعني أمر جوه CMD`
          ]
        },

        {
          cmd: "سطر الاستخدام في CMD",
          title: "الأقواس والشرطة المايلة والنقطتين",
          desc: R`سطر الـ [[Usage]] في ويندوز بيستخدم نفس فكرة لينكس بس بعلامات مختلفة شوية. وأغرب واحدة فيهم موجودة في [[dir /?]]:

[[DIR [drive:][path][filename] [/A[[:]attributes]] [/B] ...]]

**العلامات:**
[[[ ]]] اختياري، زي لينكس.
[[[drive:][path][filename]]] تلات أقواس متلاصقة = تلات حاجات اختيارية ممكن تكتبهم ورا بعض من غير مسافة: [[C:\Users\me\*.txt]].
[[[/A[[:]attributes]]]] الأقواس المتداخلة معناها: [[/A]] اختيارية، ولو كتبتها ممكن تضيف [[:]] وقيم، والنقطتين نفسها اختيارية. يعني [[/A]] و [[/AD]] و [[/A:D]] كلهم صح.
[[|]] أو، زي لينكس: [[[[-j host-list] | [-k host-list]]]].
**الكلام من غير أقواس = إجباري**: [[target_name]] في [[ping]].

**وفرق مهم عن لينكس:** في ويندوز الـ options بتتلزق بقيمتها من غير مسافة كتير: [[dir /O:N]] و [[tasklist /FI "STATUS eq RUNNING"]]. بينما لينكس بيفصل: [[ls --sort=name]].

وأغلب أوامر ويندوز **مش حساسة لحالة الحروف** في الـ options: [[dir /s]] و [[dir /S]] نفس الحاجة. بس ده **مش** قاعدة عامة: [[robocopy]] و [[tasklist]] بيفرّقوا في بعض القيم.`,
          example: R`dir /?
ping /?
where /?
dir /O:N /B
tasklist /FI "STATUS eq RUNNING"`,
          try: R`من [[dir /?]]، اعرف إزاي تعرض الملفات المخفية بس. وبعدين من [[where /?]]، اعرف إزاي تدوّر في فولدر معين وكل اللي جواه.`,
          sol: R`**الملفات المخفية:** من سطر [[/A]] في المساعدة:

~~~text
  /A          Displays files with specified attributes.
  attributes   D  Directories                R  Read-only files
               H  Hidden files               A  Files ready for archiving
~~~

يعني [[dir /A:H]] (أو [[dir /AH]]، النقطتين اختيارية زي ما السطر بيقول).

**البحث في فولدر:** [[where /?]] بيقول:

~~~text الناتج (ويندوز 11)
WHERE [/R dir] [/Q] [/F] [/T] pattern...

Description:
    Displays the location of files that match the search pattern.
    By default, the search is done along the current directory and
    in the paths specified by the PATH environment variable.
~~~

يعني [[where /R C:\Users\me *.log]].

| الحتة | معناها |
|---|---|
| [[[/R dir]]] | اختيارية، وبتاخد اسم فولدر |
| [[pattern...]] | **إجباري** (مفيش أقواس)، وممكن أكتر من واحد |

ولاحظ إن [[pattern...]] من غير أقواس، يعني [[where]] لوحده هيفشل.`,
          deep: {
            why: R`أوامر ويندوز ليها عادات مختلفة عن لينكس: الشرطة المايلة، والنقطتين، والالتصاق من غير مسافة. ولو قريت السطر غلط، الأمر هيتنفّذ بشكل مختلف تمامًا عن اللي قصدته.`,
            how: R`**جدول العلامات:**

| العلامة | معناها | مثال |
|---|---|---|
| [[[x]]] | اختياري | [[[/S]]] |
| [[x]] | إجباري | [[target_name]] |
| [[x...]] | ممكن يتكرر | [[pattern...]] |
| [[a \| b]] | أو | [[[-j list] \| [-k list]]] |
| [[[a][b][c]]] | تلاتة اختيارية ملزوقين | [[[drive:][path][filename]]] |
| نقطتين جوه أقواس | النقطتين نفسها اختيارية | [[dir /A:H]] زي [[dir /AH]] |

**شكل الـ options:**

| الشكل | مثال |
|---|---|
| [[/X]] | [[dir /S]] |
| [[/X:value]] | [[dir /O:N]] |
| [[/Xvalue]] | [[dir /AD]] |
| [[/X value]] | [[where /R C:\ *.log]] |
| [[-x]] (يونكس) | [[ping -n 4]] |

**حالة الحروف:**

- أغلب أوامر ويندوز بتتجاهلها في الـ options: [[dir /s]] = [[dir /S]].
- **بس مش كلها.** [[robocopy]] و بعض فلاتر [[tasklist]] بيفرّقوا.
- والمسارات نفسها في ويندوز مش حساسة: [[C:\Windows]] = [[c:\windows]].

**لو الأمر مش بيتصرف زي ما توقعت:**

~~~cmd
dir /? | find /i "sort"
~~~

ارجع للمساعدة ودوّر على الحتة. غالبًا فيه تفصيلة في السطر.

**والفرق الأكبر عن لينكس:** أوامر ويندوز بترجّع **نصوص** زي لينكس بالظبط، فاللي عايز يفلتر بيستخدم [[find]] و [[findstr]] و [[for /f]]. وده شغل متعب مقارنة بـ PowerShell اللي بيرجّع objects — ودي أهم سبب تسيب CMD في أي حاجة أعقد من أمر واحد.`,
            when: "أول ما تشوف أمر ويندوز جديد. وبالذات قبل ما تحطه في ملف [[.bat]].",
            mistakes: R`تحط مسافة في مكان غلط: [[dir /O :N]] مش شغالة.

وتفتكر إن [[/]] هي الشكل الوحيد. [[ping]] و [[curl.exe]] بيستخدموا [[-]].

وتكتب [[where]] من غير pattern وتستغرب الـ error. السطر كان بيقول إنه إجباري.`
          },
          teach: R`## الفكرة

نفس فكرة الـ SYNOPSIS في لينكس، بس بعلامات ويندوز. والعلامة الغريبة اللي بتلخبط الكل موجودة في [[dir /?]].

كل الناتج من تشغيل حقيقي على ويندوز 11.

---

## ١. سطر [[dir]]

~~~cmd
dir /?
~~~

~~~text الناتج (السطر الأهم)
DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]
  [/O[[:]sortorder]] [/P] [/Q] [/R] [/S] [/T[[:]timefield]] [/W] [/X] [/4]
~~~

### [[[drive:][path][filename]]]: تلات أقواس متلاصقة

~~~text
[drive:] [path] [filename]
   │       │        └── اسم الملف أو نمط، اختياري
   │       └─────────── المسار، اختياري
   └─────────────────── حرف القرص، اختياري
~~~

التلاتة **ملزوقين من غير مسافة** في السطر، وده مقصود: يعني تكتبهم ملزوقين فعلًا.

~~~cmd
dir
dir C:\
dir C:\Users\
dir C:\Users\*.txt
dir *.txt
~~~

كلهم صح، وكل واحد بياخد جزء مختلف.

### [[[/A[[:]attributes]]]]: الأقواس المتداخلة

دي أغرب واحدة. نفكها من بره لجوه:

~~~text
[ /A [ [:] attributes ] ]
│  │   │       │
│  │   │       └── القيم: D للفولدرات، H للمخفي...
│  │   └────────── النقطتين **نفسها** اختيارية
│  └────────────── الـ option
└───────────────── الحتة كلها اختيارية
~~~

يعني **التلاتة دول صح**:

~~~cmd
dir /A
dir /A:H
dir /AH
~~~

| الشكل | معناه |
|---|---|
| [[/A]] | اعرض كل الملفات بكل الصفات |
| [[/A:H]] | المخفية بس (بالنقطتين) |
| [[/AH]] | المخفية بس (من غير نقطتين) |

**ودي القاعدة في أوامر ويندوز كتير:** النقطتين تجميلية.

---

## ٢. [[|]] في [[ping]]

~~~cmd
ping /?
~~~

~~~text الناتج (أول ٥ سطور)
Usage: ping [-t] [-a] [-n count] [-l size] [-f] [-i TTL] [-v TOS]
            [-r count] [-s count] [[-j host-list] | [-k host-list]]
            [-w timeout] [-R] [-S srcaddr] [-c compartment] [-p]
            [-4] [-6] target_name
~~~

### [[[[-j host-list] | [-k host-list]]]]

~~~text
[ [-j host-list] | [-k host-list] ]
│       │         │       │
│       │         │       └── الشكل التاني
│       │         └────────── أو
│       └──────────────────── الشكل الأول
└──────────────────────────── الحتة كلها اختيارية
~~~

يعني: ممكن تسيبهم، وممكن تكتب [[-j]]، وممكن [[-k]]. **بس مش الاتنين.**

### و [[target_name]] من غير أقواس

يعني **إجباري**. [[ping]] لوحده مش هيشتغل، لازم تديله عنوان.

### و [[-t]] مش [[/t]]

[[ping]] برنامج قديم بأسلوب يونكس. **اقرا السطر، متفترضش.**

---

## ٣. [[where /?]]

~~~cmd
where /?
~~~

~~~text الناتج
WHERE [/R dir] [/Q] [/F] [/T] pattern...

Description:
    Displays the location of files that match the search pattern.
    By default, the search is done along the current directory and
    in the paths specified by the PATH environment variable.
~~~

| الحتة | معناها |
|---|---|
| [[[/R dir]]] | اختيارية، وبتاخد قيمة **بمسافة** بعدها |
| [[[/Q]]] [[[/F]]] [[[/T]]] | switches، مش بتاخد قيمة |
| [[pattern...]] | **إجباري**، وممكن أكتر من واحد |

فـ [[where /R C:\Users\me *.log]] شغالة، و [[where]] لوحده هيفشل.

---

## ٤. شكل الـ options في ويندوز

| الشكل | مثال | ملاحظة |
|---|---|---|
| [[/X]] | [[dir /S]] | switch بسيط |
| [[/X:value]] | [[dir /O:N]] | بنقطتين، **من غير مسافة** |
| [[/Xvalue]] | [[dir /AD]] | ملزوق |
| [[/X value]] | [[where /R C:\ *.log]] | بمسافة |
| [[-x]] | [[ping -n 4]] | أسلوب يونكس |

**مفيش قاعدة واحدة.** المساعدة هي المرجع.

### جرّب

~~~cmd
dir /O:N /B
~~~

| الحتة | معناها |
|---|---|
| [[/O:N]] | رتّب بالاسم (N = Name) |
| [[/B]] | عرض مختصر: أسامي بس |

~~~cmd
tasklist /FI "STATUS eq RUNNING"
~~~

| الحتة | معناها |
|---|---|
| [[/FI]] | فلتر |
| [["STATUS eq RUNNING"]] | الشرط بين علامات تنصيص لأن فيه مسافات |

---

## ٥. حالة الحروف

~~~cmd
dir /s
dir /S
~~~

الاتنين نفس الحاجة. أغلب أوامر ويندوز بتتجاهل حالة الحروف في الـ options.

**بس مش كلها:**

| الأمر | حساس؟ |
|---|---|
| [[dir]] و [[copy]] و [[del]] | لأ |
| [[robocopy]] | في بعض الـ flags أيوه |
| [[tasklist /FI]] | قيمة الفلتر لازم بحروف كبيرة ([[eq]] صغيرة والباقي كبير) |
| [[find]] | **حساس** في النص اللي بتدوّر عليه، إلا بـ [[/i]] |

---

## ٦. الفرق الكبير عن PowerShell

أوامر CMD بترجّع **نص**. فعشان تفلتر، محتاج [[find]] أو [[findstr]] أو [[for /f]]:

~~~cmd
tasklist | find "chrome"
~~~

وعشان تاخد عمود معين، محتاج [[for /f "tokens=2"]] وتعد الأعمدة بإيدك.

في PowerShell:

~~~powershell
Get-Process chrome | Select-Object Id, WorkingSet
~~~

**ودي أهم سبب تسيب CMD** في أي حاجة أعقد من أمر واحد. CMD ممتاز لأمر سريع ولملفات [[.bat]] بسيطة؛ وبعد كده PowerShell.

---

## الخلاصة

| العلامة | معناها |
|---|---|
| [[[x]]] | اختياري |
| [[x]] من غير أقواس | إجباري |
| [[x...]] | ممكن يتكرر |
| [[a \| b]] | أو |
| [[[a][b][c]]] | اختياريين ملزوقين |
| نقطتين جوه أقواس | النقطتين نفسها اختيارية |

- [[dir /A]] و [[dir /A:H]] و [[dir /AH]] كلهم صح، والسطر هو اللي بيقول كده.
- شكل الـ options مش موحّد: [[/S]] و [[/O:N]] و [[/AD]] و [[/R dir]] و [[-n]].
- أغلب الأوامر مش حساسة لحالة الحروف، بس [[find]] و [[robocopy]] استثناءات.
- CMD بيرجّع نص، فالفلترة متعبة. في أي حاجة مركّبة، روح PowerShell.`,
          lines: [
            R`سطر الاستخدام بتاع dir: فيه الأقواس المتلاصقة والمتداخلة`,
            R`سطر ping: فيه | للاختيار، و target_name إجباري، وشرطة يونكس`,
            R`سطر where: /R بتاخد قيمة بمسافة، والـ pattern إجباري`,
            R`option بقيمة بعد نقطتين، وتاني switch من غير قيمة`,
            R`فلتر بين علامات تنصيص لأن فيه مسافات`
          ]
        },

        {
          cmd: "الطريقة: من مهمة لأمر في CMD",
          title: "الدورة، وامتى تسيب CMD",
          desc: R`الدورة في CMD أقصر من لينكس و PowerShell، لأن أدوات الاكتشاف أقل:

**١ — شوف الفهرس:** [[help | find /i "كلمة"]] بيدوّر في أوصاف الـ ٨٣ أمر الداخلي. ودي أقرب حاجة لـ [[man -k]].
**٢ — اقرا الشرح:** [[X /?]] (أو [[help X]]).
**٣ — جرّب في فولدر تجربة.**
**٤ — اتأكد:** [[echo %errorlevel%]]، وصفر معناه نجح.

والخطوة اللي مش موجودة: **مفيش بحث في البرامج الخارجية**. لو الأمر مش من الـ ٨٣، [[help]] مش هيساعدك تلاقيه. ساعتها:
[[where *.exe]] بيعرض كل البرامج الموجودة في الـ [[PATH]].
أو تستخدم PowerShell: [[Get-Command *word*]].

**و [[%errorlevel%]] فيه فخ:** في سطر واحد فيه [[&]]، القيمة بتتحسب **قبل** ما الأمر يشتغل. عشان تشوفها في سطر واحد لازم [[cmd /v:on]] و [[!errorlevel!]] (التفاصيل في درس «%errorlevel% و !errorlevel!»).

**وامتى تسيب CMD؟** لما تحتاج تفلتر، أو تاخد عمود من ناتج، أو تتعامل مع JSON، أو تعمل حاجة على عشر ملفات بشرط. CMD بيرجّع نص، و PowerShell بيرجّع objects. ومفيش عيب في إنك تكتب [[powershell -NoProfile -Command "..."]] من جوه ملف [[.bat]].`,
          example: R`help | find /i "attrib"
attrib /?
dir C:\nope >nul 2>&1
echo %errorlevel%
where *.exe | find /c /v ""`,
          try: R`دوّر في الفهرس على أمر بيتعامل مع «disk» بـ [[help | find /i "disk"]]. وبعدين اقرا [[/?]] بتاع أول واحد.`,
          sol: R`~~~text الناتج (ويندوز 11)
C:\>help | find /i "disk"
CHKDSK         Checks a disk and displays a status report.
CHKNTFS        Displays or modifies the checking of disk at boot time.
DISKPART       Displays or configures Disk Partition properties.
FORMAT         Formats a disk for use with Windows.
LABEL          Creates, changes, or deletes the volume label of a disk.
RECOVER        Recovers readable information from a bad or defective disk.
               correctly to a disk.
VOL            Displays a disk volume label and serial number.
~~~

سبع أوامر عن الأقراص، وانت مكنتش عارف غير واحد أو اتنين منهم. (السطر اللي فيه [[correctly to a disk.]] لوحده جزء من وصف أمر تاني اتقطع، لأن [[find]] بيطلّع السطر المطابق بس.)

**وكود الخروج:**

~~~text
C:\>dir C:\nope >nul 2>&1
C:\>echo %errorlevel%
1
~~~

[[1]] يعني فشل. والشاشة كانت فاضية لأن [[>nul 2>&1]] رمت كل حاجة.

ولو جربت الاتنين في سطر واحد:

~~~text
C:\>dir C:\nope >nul 2>&1 & echo %errorlevel%
0
~~~

**طلع صفر وهو فاشل!** لأن [[%errorlevel%]] اتحسبت قبل ما السطر يشتغل. الحل:

~~~text
C:\>cmd /v:on /c "dir C:\nope >nul 2>&1 & echo !errorlevel!"
1
~~~`,
          deep: {
            why: R`CMD لسه موجود في كل ويندوز وبيشتغل من غير أي إعداد، وملفات [[.bat]] شغالة على أي جهاز. فمفيد تعرف توصل فيه لأي أمر. بس كمان مفيد تعرف حدوده عشان متضيعش ساعة في حاجة PowerShell بيعملها في سطر.`,
            how: R`**الدورة:**

| الخطوة | الأمر |
|---|---|
| فيه أمر داخلي عن كذا؟ | [[help \| find /i "كلمة"]] |
| بياخد إيه؟ | [[X /?]] |
| فيه برنامج خارجي؟ | [[where *كلمة*]] أو PowerShell |
| نجح؟ | [[echo %errorlevel%]] |

**[[%errorlevel%]] وفخ التوسيع:**

CMD بيستبدل [[%errorlevel%]] بقيمتها **وقت قراية السطر**، مش وقت تنفيذه. فلو السطر فيه أمرين، التانية بتشوف القيمة القديمة.

| الحالة | الحل |
|---|---|
| سطرين منفصلين | شغال عادي |
| سطر واحد بـ [[&]] | [[cmd /v:on]] و [[!errorlevel!]] |
| جوه ملف [[.bat]] | [[setlocal enabledelayedexpansion]] و [[!errorlevel!]] |

(التفاصيل في درس «%errorlevel% و !errorlevel!».)

**وفيه شكل تاني بيتفادى الموضوع كله:**

~~~cmd
dir C:\nope >nul 2>&1
if errorlevel 1 echo فشل
~~~

[[if errorlevel N]] معناها «لو الكود **أكبر من أو يساوي** N». ودي صيغة قديمة بس شغالة من غير delayed expansion.

**حدود CMD بالظبط:**

| المهمة | CMD | PowerShell |
|---|---|---|
| أمر سريع | ممتاز | ممتاز |
| فلترة نص بسيطة | [[find]] | [[Select-String]] |
| أخذ عمود من ناتج | [[for /f "tokens=2"]] متعب | [[Select-Object]] |
| JSON | شبه مستحيل | [[ConvertFrom-Json]] |
| شرط على خصائص ملفات | متعب جدًا | [[Where-Object]] |
| نداء REST API | [[curl.exe]] + تحليل يدوي | [[Invoke-RestMethod]] |

**والمزج مسموح:**

~~~cmd
powershell -NoProfile -Command "Get-Process | Where-Object WS -gt 100MB | Select-Object Name, WS"
~~~

تقدر تحط السطر ده جوه ملف [[.bat]] عادي.`,
            when: "في CMD: لأمر سريع، ولملف [[.bat]] بسيط، ولما تكون على جهاز مش بتاعك. وبره كده PowerShell.",
            mistakes: R`تفتكر إن [[%errorlevel%]] غلطانة. هي بتتحسب بدري، والحل [[!errorlevel!]].

وتصرّ تعمل كل حاجة في CMD. [[for /f "tokens=1-5 delims= "]] عشان تاخد عمود من [[tasklist]] شغل نص ساعة، و PowerShell بيعمله في سطر.

وتنسى إن [[help]] بيدوّر في الداخلية بس، فتستنتج إن الأمر مش موجود وهو برنامج خارجي.`
          },
          teach: R`## الفكرة

الدورة في CMD أربع خطوات، وفيها حتة ناقصة مقصود نقولها: مفيش بحث في البرامج الخارجية.

كل الناتج من تشغيل حقيقي على ويندوز 11.

---

## ١. [[help | find /i "كلمة"]]: أقرب حاجة لـ [[man -k]]

~~~cmd
help | find /i "disk"
~~~

~~~text الناتج
CHKDSK         Checks a disk and displays a status report.
CHKNTFS        Displays or modifies the checking of disk at boot time.
DISKPART       Displays or configures Disk Partition properties.
FORMAT         Formats a disk for use with Windows.
LABEL          Creates, changes, or deletes the volume label of a disk.
RECOVER        Recovers readable information from a bad or defective disk.
               correctly to a disk.
VOL            Displays a disk volume label and serial number.
~~~

| الحتة | معناها |
|---|---|
| [[help]] | الفهرس الكامل (٨٣ سطر) |
| [[\|]] | وجّهه للي بعده |
| [[find /i]] | دوّر، و [[/i]] = متجاهل حالة الحروف |
| [["disk"]] | النص (**لازم** بين علامات تنصيص) |

**سبع أوامر عن الأقراص** في أمر واحد. ودي قيمة الفهرس.

> والسطر اللي فيه [[correctly to a disk.]] لوحده هو بقية وصف أمر تاني اتقطع على سطرين، و [[find]] طلّع السطر المطابق بس. ده سلوك عادي للبحث السطري.

~~~cmd
help | find /i "attrib"
~~~

~~~text الناتج
ATTRIB         Displays or changes file attributes.
~~~

---

## ٢. [[X /?]]: اقرا الشرح

~~~cmd
attrib /?
~~~

وبعدها اقرا سطر الـ Usage زي ما في درس «سطر الاستخدام في CMD».

---

## ٣. [[echo %errorlevel%]]: نجح ولا لأ

~~~cmd
dir C:\nope >nul 2>&1
echo %errorlevel%
~~~

~~~text الناتج
1
~~~

| الحتة | معناها |
|---|---|
| [[>nul]] | ارمي الناتج العادي |
| [[2>&1]] | وارمي رسايل الخطأ معاه |
| [[%errorlevel%]] | كود خروج آخر أمر |

الشاشة كانت فاضية (رمينا كل حاجة)، و [[1]] كشفت إن الأمر فشل.

### والفخ

~~~cmd
dir C:\nope >nul 2>&1 & echo %errorlevel%
~~~

~~~text الناتج
0
~~~

**صفر؟! وهو فاشل.**

### ليه؟

CMD بيستبدل [[%errorlevel%]] بقيمتها **وهو بيقرا السطر**، قبل ما ينفّذ أي حاجة فيه:

~~~text
السطر اللي كتبته:   dir C:\nope & echo %errorlevel%
CMD بيقراه:          dir C:\nope & echo 0        ← القيمة القديمة اتحطت
بعدين بينفّذ:        dir فشل، و echo بيطبع 0
~~~

### الحل

~~~cmd
cmd /v:on /c "dir C:\nope >nul 2>&1 & echo !errorlevel!"
~~~

~~~text الناتج
1
~~~

| الحتة | معناها |
|---|---|
| [[/v:on]] | فعّل delayed expansion |
| [[!errorlevel!]] | بعلامات تعجب: احسبها **وقت التنفيذ** |

وفي ملف [[.bat]]: [[setlocal enabledelayedexpansion]] في الأول.

### أو تتفادى الموضوع خالص

~~~cmd
dir C:\nope >nul 2>&1
if errorlevel 1 echo فشل
~~~

[[if errorlevel 1]] معناها «لو الكود **أكبر من أو يساوي** ١». صيغة قديمة بس شغالة في كل مكان من غير أي إعداد.

---

## ٤. الحتة الناقصة: البرامج الخارجية

[[help]] بيدوّر في الـ ٨٣ أمر الداخلي بس. فلو الأمر اللي محتاجه برنامج خارجي (زي [[tasklist]] أو [[robocopy]])، الفهرس مش هيساعدك تلاقيه.

### البديل الأول: [[where]] بنجمة

~~~cmd
where *.exe | find /c /v ""
~~~

~~~text الناتج (بيختلف من جهاز لجهاز)
740
~~~

| الحتة | معناها |
|---|---|
| [[where *.exe]] | كل البرامج في الـ PATH |
| [[find /c /v ""]] | [[/c]] عُدّ، و [[/v ""]] السطور اللي **مش** فاضية = عدّ الكل |

~~~cmd
where *task*
~~~

بيدوّر على أي برنامج فيه الكلمة دي في اسمه.

### البديل التاني: استعير من PowerShell

~~~cmd
powershell -NoProfile -Command "Get-Command *task* | Select-Object Name, CommandType"
~~~

**ومفيش عيب في ده.** ملف [[.bat]] يقدر ينادي PowerShell لسطر واحد ويرجع يكمّل.

---

## ٥. امتى تسيب CMD

| المهمة | CMD | PowerShell |
|---|---|---|
| أمر سريع | ممتاز | ممتاز |
| فلترة نص | [[find]] شغال | [[Select-String]] |
| عمود من ناتج | [[for /f "tokens=2"]] متعب | [[Select-Object]] سطر |
| JSON | شبه مستحيل | [[ConvertFrom-Json]] |
| شرط على خصائص ملفات | متعب | [[Where-Object]] |
| REST API | [[curl.exe]] وتحليل يدوي | [[Invoke-RestMethod]] |

### مثال الفرق

**في CMD**، عشان تاخد أسامي العمليات اللي بتاكل ذاكرة:

~~~cmd
tasklist /FO CSV /NH | find "chrome"
~~~

وبعدين تحتاج [[for /f "tokens=1,5 delims=,"]] وتشيل علامات التنصيص بإيدك وتحوّل «123,456 K» لرقم.

**في PowerShell:**

~~~powershell
Get-Process chrome | Where-Object WS -gt 100MB | Select-Object Name, WS
~~~

**سطر واحد، وبيرجّع أرقام حقيقية تقدر تقارنها.**

### القاعدة

- CMD: أمر واحد، أو [[.bat]] بسيط، أو جهاز مش بتاعك.
- أي حاجة فيها **فلترة أو حساب أو بيانات منظّمة**: PowerShell.

---

## الدورة في جدول

| الخطوة | الأمر |
|---|---|
| ١ | [[help \| find /i "كلمة"]] |
| ٢ | [[X /?]] |
| ٣ | جرّب في فولدر تجربة |
| ٤ | [[echo %errorlevel%]] (أو [[if errorlevel 1]]) |
| لو مش داخلي | [[where *كلمة*]] أو [[Get-Command]] من PowerShell |

---

## الخلاصة

- [[help | find /i "كلمة"]] هو [[man -k]] بتاع CMD، بس للأوامر الداخلية بس.
- [[%errorlevel%]] بتتحسب وقت **قراية** السطر: في سطر واحد استخدم [[!errorlevel!]] مع [[cmd /v:on]]، أو [[if errorlevel 1]].
- [[where *كلمة*]] للبرامج الخارجية.
- CMD بيرجّع نص، فالفلترة والحساب متعبين.
- مفيش عيب تنادي PowerShell من جوه [[.bat]] لسطر واحد.`,
          lines: [
            R`دوّر في فهرس الأوامر الداخلية عن كلمة، ودي أقرب حاجة لـ man -k`,
            R`اقرا شرح اللي لقيته`,
            R`أمر بيفشل، وكل ناتجه مرمي`,
            R`كود الخروج في سطر منفصل: هنا بيشتغل صح`,
            R`عدّ البرامج الخارجية اللي ويندوز يقدر يلاقيها`
          ]
        }
      ]
    }
]);
