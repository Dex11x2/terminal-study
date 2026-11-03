// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "توصل للأمر بنفسك",
      l: 1,
      n: R`CMD مفيهوش [[man]] ولا [[Get-Help]]، بس فيه فهرس كامل بأوامره و [[/?]] لكل برنامج. القسم ده بيوريك توصل بيهم لأي أمر، وامتى تسيب CMD وتروح لـ PowerShell`,
      time: R`حوالي نص ساعة`,
      goal: [R`تلاقي أي أمر في CMD وتعرف خياراته من غير جوجل.`, R`تقرا سطر الاستخدام: الأقواس المربعة، و [[|]]، و [[...]].`, R`تحوّل مهمة لأمر بخطوات ثابتة.`],
      use: { work: R`سيرفر مفيهوش نت، أو أمر نسيت خياراته.`, prog: R`نفس المهارة لكل أداة سطر أوامر: [[/?]] في ويندوز، و [[--help]] في الباقي.` },
      lab: R`mkdir %TEMP%\cmdlab & cd /d %TEMP%\cmdlab`,
      projects: [
        { lvl: 'صغير', t: R`اكتشف أمر جديد`, what: R`اختار أمر مستخدمتوش قبل كده من [[help]] (زي [[fc]] أو [[sort]] أو [[replace]] أو [[forfiles]])، واقرا [[/?]] بتاعه بس، واكتب ٣ أمثلة شغالة في فولدر تجربة، كل مثال بخيار مختلف.`, done: R`ملف [[notes.txt]] فيه الأمثلة التلاتة، وجنب كل واحد السطر من الـ help اللي وصّلك ليه بالنص، والناتج الحقيقي وكود الخروج.` },
        { lvl: 'صغير', t: R`كارت سطور الاستخدام`, what: R`اختار ٥ أوامر واكتب لكل واحد سطر الـ Usage بتاعه وتحته: إيه الإجباري، وإيه الاختياري، وفين [[|]]، وهل الخيارات بـ [[/]] ولا [[-]]. من درس «سطر الاستخدام في CMD».`, done: R`لكل أمر جملة واحدة صح اتكتبت من السطر بس واتجرّبت، وفيهم أمر واحد على الأقل بيستخدم [[-]] (زي [[ping]] أو [[netstat]]) وواحد الـ help بتاعه على stderr.` },
        { lvl: 'متوسط', t: R`howto.bat`, what: R`أداة [[howto.bat كلمة]] من درس «الطريقة»: بتدوّر في الفهرس، وبعدين في البرامج بـ [[where]]، وبتطبع لكل نتيجة أول سطر من الـ [[/?]] بتاعها (بـ [[2>&1]] عشان البرامج اللي بتكتب على stderr).`, done: R`[[howto hash]] بيوصّلك لـ [[certutil]] وأول سطر في شرحه، و [[howto disk]] بيطبع أوامر الفهرس، وكلمة مش موجودة بتطبع رسالة واضحة، ومن غير كلمة كود [[2]].` },
        { lvl: 'متوسط', t: R`cheats.txt بتاعك`, what: R`[[cheats.bat]] من تمرين درس «help و /?» بيكتب help لستة أوامر في ملف واحد بعناوين، وتزوّد عليه فهرس في أول الملف (الأوامر وأرقام سطورها) عشان تفتحه على أي سيرفر من غير نت.`, done: R`[[cheats.bat sort fc timeout netstat]] بيعمل ملف فيه ٤ أقسام مليانين، والفهرس في أوله بأرقام سطور صح (اتأكدت بـ [[findstr /n "=====" cheats.txt]]).` },
        { lvl: 'كبير', t: R`دليل CMD أوفلاين`, what: R`[[cmd-guide.bat]] بيمشي على كل أوامر [[help]] (اسم الأمر أول كلمة في كل سطر بيبدأ بحرف كابيتال)، ويكتب الـ [[/?]] بتاع كل واحد في ملف لوحده جوه فولدر [[guide]]، ويعمل [[index.txt]] بالأسامي والسطر الأول من الوصف، ويتجاهل الأوامر الخطيرة لو اتشغّلت من غير [[/?]] (ميشغّلش غير [[/?]] أبدًا)، ولوج بالأوامر اللي فشلت. وتشغيله تاني بيحدّث الملفات بس.`, done: R`فولدر [[guide]] فيه ملف لكل أمر من الفهرس ومفيش ملف فاضي (الفاضي يتسجّل في اللوج كـ «help على stderr» ويتعاد بـ [[2>&1]])، و [[findstr /s /i "attributes" guide\*.txt]] بيلاقي [[dir]] و [[attrib]]، والتشغيلة التانية بتخلص من غير errors.`, ext: R`زوّد البرامج اللي في System32 وليها [[/?]] (من [[where *.exe]]) مع حد أقصى للوقت لكل برنامج، وصفحة HTML بسيطة فيها بحث.` },
        { lvl: 'فكرة', t: R`كتالوج مهام فريقك`, what: R`اسأل ٣ زمايل عن حاجات بيعملوها في ويندوز بالماوس كل أسبوع، ولكل واحدة امشي الدورة (فهرس، [[/?]]، تجربة، [[%errorlevel%]]) لحد أمر أو سكربت صغير، واكتب «إمتى تسيب CMD وتروح PowerShell» لكل مهمة مش هتنفع في batch.`, done: R`ملف فيه ٦ مهام على الأقل، لكل واحدة الأمر أو السكربت ونتيجة تشغيله الحقيقية، والمهام اللي محتاجة JSON أو فلترة بأعمدة متعلّم عليها «PowerShell» بالسبب.`, ext: R`حوّل الكتالوج لـ [[menu.bat]] بيشغّل المهام، أو لموديول PowerShell للمهام اللي اتعلّم عليها.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** ملف [[fruits.txt]] فيه [[banana 3]] و [[apple 10]] و [[cherry 2]]. من [[sort /?]] بس (الدرس مشرحش [[sort]])، رتّبه بالعكس.`, done: R`لقيت [[/R[EVERSE]                  Reverses the sort order; that is,]] و [[sort /r fruits.txt]] طبع [[cherry 2]] وبعدها [[banana 3]] وبعدها [[apple 10]].` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** ملفين: [[a.txt]] فيه [[Line one]] و [[line two]] و [[line three]]، و [[b.txt]] فيه [[line ONE]] و [[line two]] و [[line 3]]. من [[fc /?]] لاقي الخيار اللي بيتجاهل الكابيتال والسمول، واللي بيطبع أرقام السطور، وقارن الملفين بيهم.`, done: R`[[/C         Disregards the case of letters.]] و [[/N         Displays the line numbers on an ASCII comparison.]]. و [[fc /c /n a.txt b.txt]] طلّع الفرق في السطر ٣ بس ([[3:  line three]] قصاد [[3:  line 3]]) مع السطر ٢ كسياق، والسطر الأول مابانش لأن [[/c]] اعتبر [[one]] و [[ONE]] زي بعض، و [[%errorlevel%]] = [[1]] (فيه فرق).` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[help fc]] و [[help where]] و [[help sort]]: مين فيهم هيشتغل ومين هيقول «not supported»؟ (التلاتة برامج exe في System32.)`, done: R`[[help fc]] و [[help sort]] اشتغلوا لأنهم في الفهرس ([[Compares two files or sets of files...]] و [[SORT [/R] [/+n] ...]]) مع إنهم مش جوه cmd.exe، و [[help where]] قال [[This command is not supported by the help utility.  Try "where /?".]]. يعني [[help]] بيعرف لستة ثابتة مش «الداخلي بس» بالظبط، و [[/?]] هو اللي شغال مع الكل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عايز تعرف خيار [[-o]] في netstat: [[netstat /? | findstr /c:"  -o"]] مطبعش ولا سطر. ليه؟ (جرّب [[netstat /? 2>nul | find /c /v ""]].)`, done: R`العدّ طلع [[0]]: [[netstat]] بيكتب الـ help على stderr مش stdout، فالـ pipe مبيوصلّوش حاجة. [[netstat /? 2>&1 | findstr /c:"  -o"]] طبع [[-o            Displays the owning process ID associated with each connection.]]. و [[ping /?]] بالعكس، بيكتب ٣٣ سطر على stdout.` },
            { lvl: 'تحدي', t: R`**ابني:** [[cheats.bat]] بياخد أسامي أوامر ([[cheats.bat sort fc timeout]]) ويكتب لكل واحد عنوان وبعده [[/?]] بتاعه في [[cheats.txt]] (افتكر الـ [[2>&1]] عشان البرامج اللي زي netstat)، ولو مفيش arguments يطبع طريقة الاستخدام ويخرج بـ [[2]].`, done: R`[[cheats.txt]] فيه ٣ عناوين وتحت كل واحد الـ help كامل، و [[cheats.bat netstat]] كتب الـ help مش فاضي، و [[cheats.bat]] لوحده طبع سطر الاستخدام و [[%errorlevel%]] = [[2]].` },
          ],
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

~~~text
DIR [drive:][path][filename] [/A[[:]attributes]] [/B] ...
~~~

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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سطر الاستخدام في [[timeout /?]] هو [[TIMEOUT [/T] timeout [/NOBREAK]]]. هل [[timeout 3]] من غير [[/t]] صح؟ جاوب من السطر، وبعدين جرّب.`, done: R`صح: [[[/T]]] جوه أقواس يعني اختياري، و [[timeout]] من غير أقواس هو الرقم الإجباري. سكربت فيه [[echo %time%]] قبل وبعد [[timeout 3 >nul]] طبع فرق حوالي ٣ ثواني وكود [[0]]. وبالعكس [[timeout abc]] طلّع [[ERROR: Invalid value for timeout (/T) specified. Valid range is -1 to 99999.]]: الرقم إجباري وبيتفحص.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[tasklist /FI STATUS eq RUNNING]] و [[dir /O: N]]. شغّل الاتنين واقرا الرسايل، وبعدين صلّحهم من سطر الاستخدام.`, done: R`الأول طلّع [[ERROR: Invalid argument/option - 'eq'.]] لأن الفلتر لازم يبقى قيمة واحدة بين تنصيص ([[/FI "STATUS eq RUNNING"]]). والتاني طلّع [[File Not Found]] وكود [[1]] لأن المسافة فصلت [[N]] وبقت اسم ملف؛ [[/O:N]] لازقة اشتغلت.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** [[[/A[[:]attributes]]]] في [[dir /?]]: اكتب لزميل في ٣ سطور ليه [[dir /A:D]] و [[dir /AD]] الاتنين صح، وإيه اللي ممكن يتكتب بعد [[/A]] من الـ help.`, done: R`الشرح فيه إن [[/A]] اختيارية، وجواها [[:]] اختيارية لوحدها، وبعدها الحروف ([[D]] و [[H]] و [[S]] و [[R]] و [[A]] و [[-]] للنفي من سطور الـ help). وجرّبت [[dir /A:D /B]] و [[dir /AD /B]] والاتنين طلّعوا نفس اللستة من غير error.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من سطر الاستخدام بتاع [[sort /?]] ([[SORT [/R] [/+n] [/M kilobytes] [/L locale] [/REC recordbytes]]]) لوحده: إيه اللي إجباري في [[sort]]؟ وإزاي ترتّب [[fruits.txt]] من الحرف التامن؟`, done: R`مفيش حاجة إجبارية في السطر ده (كله بين أقواس)، فـ [[sort]] لوحده بيقرا من الكيبورد أو من pipe. و [[sort /+8 fruits.txt]] طبع [[apple 10]] و [[cherry 2]] و [[banana 3]] لأنه رتّب على الحرف التامن ([[0]] و [[2]] و [[3]]) مش على الكلمة.` },
          ],
          deep: {
            why: R`أوامر ويندوز ليها عادات مختلفة عن لينكس: الشرطة المايلة، والنقطتين، والالتصاق من غير مسافة. ولو قريت السطر غلط، الأمر هيتنفّذ بشكل مختلف تمامًا عن اللي قصدته.`,
            how: R`**جدول العلامات:**

| العلامة | معناها | مثال |
|---|---|---|
| [[[x]]] | اختياري | [[[/S]]] |
| [[x]] | إجباري | [[target_name]] |
| [[x...]] | ممكن يتكرر | [[pattern...]] |
| [[a \| b]] | أو | [[ [-j list] \| [-k list] ]] |
| [[[a][b][c]]] | تلاتة اختيارية ملزوقين | [[[drive:][path][filename]]] |
| نقطتين جوه أقواس | النقطتين نفسها اختيارية | [[dir /A:H]] زي [[dir /AH]] |

**شكل الـ options:**

| الشكل | مثال |
|---|---|
| [[/X]] | [[dir /S]]: switch لوحده من غير قيمة |
| [[/X:value]] | [[dir /O:N]]: القيمة بعد نقطتين من غير مسافة |
| [[/Xvalue]] | [[dir /AD]]: القيمة لازقة في الـ switch على طول |
| [[/X value]] | [[where /R C:\ *.log]]: القيمة بعد مسافة |
| [[-x]] (يونكس) | [[ping -n 4]]: شرطة بدل [[/]]، زي أوامر لينكس |

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
| [[/FI]] | فلتر: اعرض بس اللي بيطابق الشرط اللي بعده |
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
| [[dir]] و [[copy]] و [[del]] | لأ: [[/S]] و [[/s]] نفس الحاجة |
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
| [[[x]]] | اختياري: تكتبه أو تسيبه |
| [[x]] من غير أقواس | إجباري: الأمر مش هيشتغل من غيره |
| [[x...]] | ممكن يتكرر: تكتب أكتر من واحد ورا بعض |
| [[a \| b]] | أو |
| [[[a][b][c]]] | تلات حتت كل واحدة اختيارية، وبيتكتبوا لازقين في بعض |
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
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** المهمة «اطلع الـ SHA256 بتاع ملف عشان أقارنه باللي على موقع التحميل». ابدأ بـ [[help | find /i "hash"]]، ولو مطلعش حاجة كمّل بالدورة لحد ما تلاقي الأمر وتطلّع الـ hash لملف [[report.txt]] فيه كلمة [[hello]].`, done: R`الفهرس مطلعش ولا سطر (كود [[1]]) لأن الأداة مش من أوامر CMD. [[where certutil]] لقاه في [[C:\Windows\System32\certutil.exe]]، و [[certutil -hashfile report.txt SHA256]] طبع [[SHA256 hash of report.txt:]] وتحته الـ hash و [[CertUtil: -hashfile command completed successfully.]] وكود [[0]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[howto.bat]] بياخد كلمة، ويدوّر بيها في [[help]]، ولو ملقاش حاجة يدوّر في البرامج بـ [[where "*كلمة*.exe"]]، ولو ملقاش برضه يقول كده. ومن غير كلمة يطبع طريقة الاستخدام ويخرج بـ [[2]].`, done: R`[[howto disk]] طبع ٨ سطور من الفهرس منهم [[CHKDSK]] و [[DISKPART]] و [[VOL]]. و [[howto cert]] قال إنها مش في الفهرس وطلّع [[certutil.exe]] و [[certreq.exe]] وغيرهم (ومعاهم [[TRACERT.EXE]] لأن فيه «cert» جوه الاسم: البحث بالاسم مش بالمعنى). و [[howto zzzq]] قال [[nothing found]]، ومن غير كلمة كود [[2]].` },
            { lvl: 'تطبيق', t: R`**مسألة:** «عايز أعرف الملفات اللي في فولدر [[old]] ومش في [[new]]». من غير ما حد يقولك الأمر: اعمل الفولدرين في TEMP بملفات مختلفة شوية، ومشّي الدورة (الفهرس، [[/?]]، تجربة، [[%errorlevel%]]).`, done: R`وصلت لـ [[dir /b old > a.txt]] و [[dir /b new > b.txt]] وبعدين [[fc a.txt b.txt]] (من سطر [[FC]] في الفهرس)، والناتج بيطلّع الأسامي المختلفة بين [[***** a.txt]] و [[***** B.TXT]] وكود [[1]]، ولما خليت الفولدرين زي بعض طبع [[FC: no differences encountered]] وكود [[0]].` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[help netstat]] بيقول «not supported». كود الخروج بتاعه هيبقى كام؟ وإزاي ده يأثّر على [[howto.bat]] لو بنيته على [[help %1 && ...]]؟`, done: R`الكود طلع [[0]] مع إنه قال [[This command is not supported by the help utility.  Try "netstat /?".]]، يعني مينفعش تعتمد على كود [[help]] عشان تعرف الأمر داخلي ولا لأ. و [[howto.bat]] اللي فوق سليم لأنه بيعتمد على كود [[find]] مش كود [[help]].` },
          ],
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
