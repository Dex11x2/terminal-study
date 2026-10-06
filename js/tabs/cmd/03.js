// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "قراءة وبحث",
      l: 1,
      n: "",
      items: [
        {
          cmd: "type / more",
          title: "اقرا ملف",
          desc: R`[[type]] بيطبع محتوى ملف نصي على الشاشة، زي [[cat]] في bash. ولو كتبت أكتر من ملف بيطبعهم ورا بعض. مناسب للملفات الصغيرة زي .env و package.json.

للملفات الكبيرة استخدم [[more]]: بيعرض صفحة بقد الشاشة ويقف، و Space يجيب الصفحة اللي بعدها، و Enter سطر واحد، و q يخرج. والـ [[|]] (pipe) بتاخد ناتج الأمر اللي على الشمال وتديه للي على اليمين، فـ [[type app.log | more]] معناها «اطبع اللوج بس صفحة صفحة». وينفع مع أي أمر ناتجه طويل: [[dir /s | more]].

[[more]] مش بيرجع لورا زي [[less]] في لينكس. ومتعملش [[type]] على ملف مش نصي (exe أو صورة)، هيطبع رموز غريبة وممكن يطلع صوت، و Ctrl+C يوقفه. والعربي ممكن يطلع رموز لو الملف UTF-8، والحل في درس [[chcp 65001]].`,
          example: R`type package.json
type app.log | more`,
          try: "اعرض ملف كبير بـ [[type file | more]]، واتنقل بـ Space، واخرج بـ q قبل ما تخلص الملف.",
          deep: {
            why: R`عايز تبص بسرعة على .env أو config أو لوج من غير ما تفتح محرر. type هو cat بتاع ويندوز، و more هو less المبسّط للملفات الطويلة.`,
            how: R`[[type file.txt]] يطبع المحتوى كله. للملفات الكبيرة بيغرق الشاشة.

[[more file.txt]] بيعرض صفحة صفحة. Space للصفحة الجاية. Enter سطر واحد. Q للخروج.

[[type file1.txt file2.txt]] يطبع الملفين ورا بعض (زي الوظيفة الأصلية لـ cat).

[[type file.txt | more]] نفس more مع pipe.`,
            when: "قراية ملف نصي صغير أو كبير. التأكد من محتوى ملف إعداد.",
            mistakes: "[[type]] على ملف binary بيلخبط الشاشة وممكن يعمل صوت beep. قفله بـ Ctrl+C."
          },
          teach: R`## الفكرة

[[type]] بيطبع ملف نصي كله على الشاشة مرة واحدة، و [[more]] بيطبعه صفحة صفحة. اتجرب في CMD على ويندوز 11 على [[package.json]] صغير و [[.env]] و [[app.log]].

---

## ١. [[type package.json]]

~~~cmd
type package.json
~~~

~~~text الناتج
{
  "name": "lab",
  "version": "1.0.0"
}
~~~

الملف زي ما هو بالظبط، من غير أرقام سطور ولا أي زيادة. زي [[cat]] في bash.

### أكتر من ملف

~~~cmd
type .env package.json
~~~

~~~text الناتج
.env


PORT=3000

package.json


{
  "name": "lab",
  ...
~~~

لما تدّيه أكتر من ملف، بيطبع اسم كل ملف قبل محتواه عشان تعرف ده بتاع مين.

### ملف مش موجود

~~~text الناتج
The system cannot find the file specified.
~~~

---

## ٢. [[type app.log | more]]

المشكلة مع [[type]] إن الملف الطويل بينزل كله في ثانية، وانت تشوف آخره بس. الحل:

- [[|]] (pipe): خد اللي [[type]] طبعه، ومتطبعهوش، ادّيه للأمر اللي بعدي.
- [[more]]: اعرض اللي وصلك بقد الشاشة، واقف.

وانت واقف، تحت في آخر الشاشة هتلاقي [[-- More --]]، والزراير:

| الزرار | بيعمل |
|---|---|
| Space | الصفحة اللي بعدها |
| Enter | سطر واحد كمان |
| q | اخرج دلوقتي |

ولو كتبت [[more app.log]] على طول من غير [[type]]، more بيبقى عارف حجم الملف، فبيكتب النسبة اللي وصلتلها: [[-- More (12%) --]].

> الوقفة دي بتحصل بس لما الناتج رايح لشاشة حقيقية، والزراير وشكل [[-- More --]] من توثيق more. لما الناتج اتوجّه لبرنامج تاني (زي هنا في التجربة)، more طبع الملف كله مرة واحدة.

### تبدأ من سطر معين

~~~cmd
more +3 app.log
~~~

~~~text الناتج (الملف فيه line 1 لحد line 5)
line 4
line 5
~~~

[[+3]] معناها «فوّت أول ٣ سطور».

---

## الخلاصة

| عايز | اكتب |
|---|---|
| ملف صغير كله | [[type .env]] |
| كذا ملف ورا بعض | [[type a.txt b.txt]] |
| ملف طويل صفحة صفحة | [[more app.log]] أو [[type app.log | more]] |
| أي ناتج طويل صفحة صفحة | [[dir /s | more]] |
| فوّت أول سطور | [[more +3 app.log]] |

[[more]] مش بيرجع لورا. لو محتاج تتحرك فوق وتحت أو تدوّر، افتح الملف في محرر، أو [[less]] من Git Bash.`,
          lines: ["اطبع الملف كله (زي cat).", "صفحة صفحة، Space للي بعدها و q للخروج (زي less)."],
          sol: R`[[type package-lock.json | more]] بيعرض صفحة واحدة وفي آخر الشاشة [[-- More --]]. لو كتبت [[more package-lock.json]] على طول من غير type، هيبان كمان قد إيه فاضل: [[-- More (12%) --]] والنسبة بتزيد وانت ماشي، لأن more ساعتها عارف حجم الملف. Space يجيب الصفحة اللي بعدها، Enter سطر واحد، و q يخرجك على طول للـ prompt من غير ما يكمل الملف.

لو الملف كله نزل مرة واحدة من غير توقف، يبقى نسيت [[| more]] أو الملف أصغر من الشاشة. و [[more]] في CMD مش بيرجع لورا، لو محتاج تتحرك فوق وتحت افتح الملف في محرر أو استخدم [[less]] من Git Bash.`
        },
        {
          cmd: "findstr",
          title: "دوّر على نص (grep)",
          desc: R`[[findstr]] بيدوّر على كلام جوه ملفات أو جوه ناتج أمر، ويطبع السطور اللي فيها الكلمة، زي [[grep]] في bash. الشكل: الكلمة بين علامات تنصيص، وبعدها الملفات.

الإضافات: [[/s]] دوّر في الفولدر ده وكل اللي جوه، و [[/i]] من غير فرق بين الكابيتال والسمول (زي [[grep -i]])، و [[/n]] اطبع رقم السطر، و [[/v]] السطور اللي مفيهاش الكلمة (زي [[grep -v]])، و [[/c:"كلام فيه مسافات"]] دوّر على الجملة كاملة. فخ مهم: [[findstr "hello world"]] بيدوّر على hello أو world، مش الجملة؛ للجملة لازم [[/c:]].

[[find]] أمر أبسط وأقدم: [[find /c "ERROR" app.log]] بيعدّ السطور اللي فيها ERROR (الـ [[/c]] من count)، زي [[grep -c]]. وكلهم بيشتغلوا مع [[|]]: [[tasklist | findstr node]]. والـ regex في findstr محدود جدًا ([[/r]])، لو محتاج أكتر استخدم Select-String في PowerShell.`,
          example: R`findstr "PORT" .env
findstr /s /i /n "TODO" *.js
find /c "ERROR" app.log`,
          try: "دوّر على كلمة في كل ملفات مشروع.",
          deep: {
            why: R`بتدوّر على كل مكان فيه TODO أو اسم متغير في المشروع، أو على ERROR في لوج طويل، أو تفلتر ناتج أمر (tasklist أو netstat) على سطر واحد. findstr هو grep اللي موجود في كل ويندوز من غير تسطيب.`,
            how: R`[[findstr "text" file.txt]] بيدوّر. [[/i]] بدون فرق حروف. [[/n]] بيعرض رقم السطر. [[/r]] regex. [[/s]] في الفولدرات الفرعية.

مع pipe: [[dir | findstr "log"]] يدوّر على ملفات فيها كلمة log.

[[findstr /c:"exact phrase"]] بيدوّر على العبارة كاملة.

بالمقارنة مع grep: findstr أبطأ وأقل features، بس موجود في كل ويندوز من غير تسطيب.`,
            when: "دوّر على ملف. فلتر output أمر.",
            mistakes: "الـ regex في findstr محدود جدًا مقارنة بـ grep. لـ regex معقد استخدم PowerShell Select-String."
          },
          teach: R`## الفكرة

[[findstr]] (من find string) بيدوّر على كلام جوه ملفات، ويطبع **السطور** اللي فيها الكلام ده. هنجرب سطور المثال على ملفات صغيرة، في CMD على ويندوز 11:

~~~text الملفات اللي اتجرب عليها
.env         PORT=3000 / DB_PORT=5432 / NODE_ENV=development
main.js      // TODO later
src\app.js   // todo: login / const x = 1 / // TODO fix api
app.log      INFO start / ERROR db down / INFO retry / ERROR db down again
~~~

---

## ١. [[findstr "PORT" .env]]

~~~cmd
findstr "PORT" .env
~~~

~~~text الناتج
PORT=3000
DB_PORT=5432
~~~

- الكلمة الأول بين علامات تنصيص، والملف بعدها.
- طلع سطرين، لأن [[DB_PORT]] فيها [[PORT]] برضه: findstr بيدوّر على الكلام في أي حتة في السطر. لو عايز السطور اللي **بتبدأ** بيه بس: [[findstr /b "PORT" .env]] طبعت [[PORT=3000]] لوحده ([[/b]] من beginning).
- الحروف الكابيتال والسمول بتفرق افتراضيًا: [[findstr "port" .env]] مش هتلاقي حاجة هنا.

---

## ٢. [[findstr /s /i /n "TODO" *.js]]

~~~cmd
findstr /s /i /n "TODO" *.js
~~~

~~~text الناتج
main.js:1:// TODO later
src\app.js:1:// todo: login
src\app.js:3:// TODO fix api
~~~

### الإضافات

| الإضافة | من | معناها |
|---|---|---|
| [[/s]] | subdirectories | دوّر في [[*.js]] هنا وفي كل الفولدرات اللي جوه |
| [[/i]] | ignore case | TODO و todo و Todo كلهم واحد |
| [[/n]] | number | اطبع رقم السطر |

### شكل كل سطر

[[src\app.js:3:// TODO fix api]] تلات حتت مفصولين بـ [[:]]: الملف، ورقم السطر، والسطر نفسه.

ومن غير [[/i]] جربتها: سطر [[// todo: login]] اختفى، لأن [[todo]] سمول.

---

## ٣. [[find /c "ERROR" app.log]]

~~~cmd
find /c "ERROR" app.log
~~~

~~~text الناتج
---------- APP.LOG: 2
~~~

[[find]] أمر أبسط وأقدم من findstr. [[/c]] (من count) بيطبع **عدد** السطور اللي فيها الكلمة بدل السطور نفسها، وقبله اسم الملف بحروف كابيتال.

> متخلطش: [[/c]] في find معناها عدّ، أما في findstr فـ [[/c]] لوحدها مش معروفة (جربتها وطلع [[FINDSTR: /c ignored]])، والمعروف [[/c:"..."]] اللي تحت.

---

## ٤. فخ المسافة: [[/c:]]

~~~cmd
findstr "hello world" h.txt
~~~

~~~text الناتج
say hello world
hello there
world peace
~~~

findstr فهم المسافة «أو»: أي سطر فيه hello **أو** world. عشان الجملة كاملة:

~~~cmd
findstr /c:"hello world" h.txt
~~~

~~~text الناتج
say hello world
~~~

[[/c:]] معناها «دوّر على الكلام ده حرفيًا (literal)، كله زي ما هو بالمسافة».

---

## ٥. إضافات تانية اتجربت

| الأمر | طبع |
|---|---|
| [[findstr /v "INFO" app.log]] | سطرين الـ ERROR بس ([[/v]] السطور اللي **مفيهاش** الكلمة) |
| [[findstr "NOPE" app.log]] | مفيش ولا حرف، و [[errorlevel]] بقى 1 |

يعني لو مفيش نتيجة، findstr مش بيقولك «مالقيتش»، بيسكت بس.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| سطور فيها كلمة | [[findstr "PORT" .env]] |
| في كل الملفات والفولدرات | [[findstr /s /i /n "TODO" *.js]] |
| جملة فيها مسافة | [[findstr /c:"hello world" file]] |
| السطور اللي مفيهاش | [[findstr /v "INFO" app.log]] |
| عدد السطور | [[find /c "ERROR" app.log]] |
| فلتر ناتج أمر | [[tasklist | findstr node]] |

المقابل في bash: [[grep]] و [[grep -rin]] و [[grep -v]] و [[grep -c]].`,
          lines: [
            "دوّر على PORT في .env (زي grep).",
            "دوّر على TODO في كل ملفات .js في كل الفولدرات ([[/s]])، من غير فرق بين الحروف ([[/i]])، واطبع رقم السطر ([[/n]]).",
            "عدّ السطور اللي فيها ERROR ([[/c]] count)."
          ],
          sol: R`[[findstr /s /i /n "TODO" *.js]] من فولدر المشروع بيطبع كل سطر فيه الكلمة بالشكل [[src\app.js:12:// TODO fix login]]: الملف، رقم السطر، والسطر نفسه. ولو عايز كذا نوع: [[findstr /s /i /n "TODO" *.js *.ts]].

أشهر فخ: [[findstr "hello world"]] بيدوّر على hello أو world، مش الجملة. للجملة استخدم [[/c:"hello world"]]. و [[/s]] بيدخل node_modules فهتلاقي نتايج كتير منه وبطء، فلتر بـ [[| findstr /v /i /c:"node_modules"]]. ولو مفيش ناتج خالص مش هيطبع أي رسالة.`
        },
        {
          cmd: "where",
          title: "البرنامج فين",
          desc: R`[[where]] بيدوّر على برنامج في كل الفولدرات اللي في الـ PATH (والفولدر الحالي)، ويطبع المسار الكامل لكل نسخة لقاها، زي [[which -a]] في bash. اللي في أول سطر هو اللي بيشتغل لما تكتب الاسم.

لو طلع أكتر من مسار، يبقى عندك أكتر من نسخة، وده سبب مشاكل زي «سطبت node 22 وبيقول 18». والـ PATH بيحدد الترتيب. ولو مفيش ولا نسخة بيطبع [[INFO: Could not find files for the given pattern(s).]] ويرجع errorlevel 1.

وفي السكربتات: [[where /q git]] من غير ما يطبع حاجة، و errorlevel بيقولك موجود (0) ولا لأ (1)، فتعمل [[where /q git || echo Install Git first]]. وخلي بالك إن [[where]] جوه PowerShell اختصار لحاجة تانية خالص (Where-Object)، هناك اكتب [[where.exe]].`,
          example: R`where node
where git`,
          try: "اعرف فين python عندك، ولو طلع أكتر من مسار يبقى عندك أكتر من نسخة.",
          deep: {
            why: R`سطبت برنامج والترمنال بيقول مش موجود، أو بيشغّل نسخة غير اللي سطبتها. where بيوريك كل نسخة في الـ PATH وبالترتيب، فتعرف المشكلة فين. زي [[which -a]] في bash.`,
            how: R`[[where node]] يطبع المسار. [[where /r C:\ node.exe]] يدوّر في فولدر معين recursive.

لو الأمر موجود في أكتر من مكان بيطبعهم كلهم بالترتيب.

مع CMD script: [[where /q program]] (quiet) بيرجع errorlevel 0 لو موجود، 1 لو لأ. مفيد للشروط.`,
            when: "تحقق إن برنامج متسطب ومكانه. النسخة اللي بتشتغل.",
            mistakes: "[[where]] في PowerShell اختصار لـ Where-Object فمش هيطبع حاجة. استخدم [[where.exe]] أو [[Get-Command]]."
          },
          teach: R`## الفكرة

لما تكتب [[node]] في الترمنال، CMD لازم يلاقي ملف [[node.exe]] في مكان ما على الديسك. [[where]] بيقولك هو لقاه فين، وبيطبع **كل** نسخة لقاها مش أول واحدة بس. اتجرب في CMD على ويندوز 11.

---

## ١. يعني إيه PATH؟

[[PATH]] متغير بيئة فيه لستة فولدرات مفصولين بـ [[;]]. لما تكتب اسم أمر مش من أوامر CMD الداخلية، CMD بيدوّر في الفولدر الحالي الأول، وبعدين في فولدرات الـ PATH **بالترتيب**، وأول ملف يلاقيه بالاسم ده هو اللي بيشتغل. وبيجرب الاسم بالامتدادات اللي في متغير [[PATHEXT]] ([[.COM;.EXE;.BAT;.CMD]] وغيرهم)، عشان كده بتكتب [[node]] مش [[node.exe]].

و [[where]] بيمشي على نفس الطريق ويطبع كل اللي لقاه.

---

## ٢. [[where node]] و [[where git]]

~~~cmd
where node
where git
~~~

~~~text الناتج
C:\Program Files\nodejs\node.exe
C:\Program Files\Git\cmd\git.exe
~~~

نسخة واحدة من كل واحد، فمفيش لخبطة: [[node --version]] طبع [[v24.19.0]]، و [[git --version]] طبع [[git version 2.56.0.windows.1]].

---

## ٣. لما يطلع أكتر من سطر

~~~cmd
where python
~~~

~~~text الناتج
C:\Users\ali\AppData\Local\Microsoft\WindowsApps\python.exe
C:\Users\ali\AppData\Local\Python\bin\python.exe
~~~

نسختين! اللي فوق هو اللي بيشتغل لما تكتب [[python]]، لأن فولدره جاي قبل التاني في الـ PATH. ولما كتبت [[python --version]] طبع [[Python 3.14.3]]، يعني الأولانية شغالة هنا (ده اختصار في فولدر WindowsApps، وعلى الجهاز ده بيشغّل Python حقيقي، والتفاصيل في الحل تحت). ولو طلع Python غير اللي انت سطّبته، المشكلة ترتيب الـ PATH.

### استثناء صغير

~~~text الناتج بتاع where code
C:\Users\ali\AppData\Local\Programs\Microsoft VS Code\bin\code
C:\Users\ali\AppData\Local\Programs\Microsoft VS Code\bin\code.cmd
~~~

السطر الأول ملف [[code]] **من غير امتداد** (ده سكربت لـ Git Bash). CMD مش بيشغّل ملف من غير امتداد، فاللي بيشتغل فعلًا لما تكتب [[code]] في CMD هو [[code.cmd]] اللي تحته. يعني «أول سطر هو اللي بيشتغل» صح، بشرط يكون امتداده من [[PATHEXT]].

---

## ٤. لو مش موجود

~~~cmd
where nothing123
echo %errorlevel%
~~~

~~~text الناتج
INFO: Could not find files for the given pattern(s).
1
~~~

ومعاه [[errorlevel]] بـ 1. والأوامر الداخلية زي [[cd]] و [[dir]] و [[cls]] بتطلع نفس الرسالة، لأنها جوه CMD نفسه ومش ملفات على الديسك.

---

## ٥. [[where /q]] في السكربتات

[[/q]] (من quiet) متطبعش أي حاجة، بس errorlevel يقول النتيجة:

~~~cmd
where /q nothing123 || echo Install it first
~~~

~~~text الناتج
Install it first
~~~

[[||]] معناها «نفّذ اللي بعدي لو اللي قبلي فشل» (درس اربط أوامر). فالسطر ده بيطبع رسالة بس لو البرنامج مش موجود.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| البرنامج ده فين | [[where node]] |
| عندي كام نسخة | [[where python]] (عدّ السطور) |
| موجود ولا لأ في سكربت | [[where /q git || echo Install Git]] |

| الترمنال | الأمر |
|---|---|
| CMD | [[where node]] |
| PowerShell | [[where.exe node]] أو [[Get-Command node]] |
| bash | [[which -a node]] أو [[type -a node]] |

> في PowerShell اكتب [[where.exe]] بالامتداد: [[where]] لوحدها هناك اختصار لـ [[Where-Object]]، وجربتها: [[where node]] في PowerShell مطبعتش ولا حاجة.`,
          lines: ["node جاي منين (زي which).", "وgit."],
          sol: R`[[where python]] بيطبع كل مسار في سطر، زي [[C:\Users\ali\AppData\Local\Programs\Python\Python313\python.exe]]، وممكن تحته [[C:\Users\ali\AppData\Local\Microsoft\WindowsApps\python.exe]]. لو سطّبت Python من python.org بالـ installer العادي، التاني ده مش Python حقيقي، ده اختصار بيفتح Microsoft Store، ولو هو الأول في الترتيب [[python]] هيفتحلك الـ Store بدل ما يشتغل. أما لو سطّبته من الـ Store أو بالـ Python install manager الجديد، فالاختصار ده هو Python الحقيقي: عندي طلع الأول، و [[python --version]] منه طبع [[Python 3.14.3]].

الحل إنك تقفل الاختصار من Settings، App execution aliases، أو تنزل مسار Python الحقيقي فوقه في الـ PATH. ولو طلع [[INFO: Could not find files for the given pattern(s).]] يبقى python مش في الـ PATH خالص، جرب [[where py]] (الـ launcher الرسمي).`
        }
      ]
    },
    {
      t: "الربط والتوجيه",
      l: 2,
      n: "نفس فكرة bash تقريبًا",
      items: [
        {
          cmd: "| > >> 2>&1",
          title: "pipe وتوجيه",
          desc: R`نفس رموز bash بنفس المعنى تقريبًا. [[|]] (pipe) بتاخد ناتج الأمر اللي على الشمال وتديه للي على اليمين، فـ [[dir | findstr .env]] بتفلتر ناتج dir. و [[>]] بتكتب الناتج في ملف بدل الشاشة وبتمسح اللي كان فيه، و [[>>]] بتضيف في آخره.

كل برنامج ليه مخرجين: الناتج العادي رقمه 1، والأخطاء رقمها 2. [[2>]] بتوجّه الأخطاء بس، و [[2>&1]] معناها «ودّي الأخطاء لنفس مكان الناتج العادي»، فـ [[npm run build > build.log 2>&1]] بتحفظ كل حاجة في ملف واحد. والترتيب مهم: [[2>&1]] تيجي بعد [[>]]. و [[nul]] هو «اللا مكان» بتاع ويندوز (زي [[/dev/null]])، فـ [[2>nul]] بترمي رسايل الخطأ، و [[>nul 2>&1]] بترمي كل حاجة.

و [[| clip]] بتنسخ الناتج على الكليب بورد، زي [[pbcopy]] في الماك. ولو عايز تكتب الرمز نفسه في echo من غير ما يتفهم توجيه، حط قبله [[^]]: [[echo 5 ^> 3]] (درس رموز CMD).`,
          example: R`dir | findstr .env
npm run build > build.log 2>&1
dir not-here 2>nul
ipconfig | clip`,
          try: "انسخ ناتج [[ipconfig]] بـ clip والصقه في notepad.",
          deep: {
            why: "توجيه الـ output لملفات أو قنوات تانية. نفس الفكرة زي bash بس بسيطة أكتر.",
            how: R`[[>]] يكتب في ملف ويمسح القديم. [[>>]] يضيف في الآخر. [[|]] يوصّل بين أوامر.

[[2>]] للأخطاء. [[2>&1]] يوجّه الأخطاء لنفس مكان الـ output العادي.

الفرق عن bash: في CMD مفيش [[/dev/null]]، بدلها [[nul]]: [[2>nul]] بيرمي الأخطاء.

[[command >> log.txt 2>&1]] يحفظ كل الـ output والأخطاء في لوج، مفيد مع المهام المجدولة.`,
            when: "سكربت batch بيحفظ output. إخفاء رسايل error مزعجة.",
            mistakes: R`[[>]] بيفضّي الملف قبل ما الأمر يشتغل، فـ [[sort data.txt > data.txt]] بيضيّع الملف. أو [[2>&1 > log.txt]] بالترتيب العكسي فالأخطاء تفضل على الشاشة. أو [[> clip]] بدل [[| clip]] فيتعمل ملف اسمه clip. أو تكتب [[/dev/null]] بدل [[nul]].`
          },
          teach: R`## الفكرة

أي أمر بيطبع على الشاشة من «مخرجين» منفصلين:

| رقمه | اسمه | فيه إيه |
|---|---|---|
| 1 | stdout (standard output) | الناتج العادي |
| 2 | stderr (standard error) | رسايل الأخطاء |

الاتنين بيوصلوا الشاشة فبيبانوا واحد، بس CMD يقدر يوجّه كل واحد لمكان. هنفك سطور المثال الأربعة، وكلها اتجربت في CMD على ويندوز 11 على فولدر فيه [[.env]] و [[.env.example]] و [[index.js]] و [[package.json]].

---

## ١. [[dir | findstr .env]]: pipe

~~~cmd
dir | findstr .env
~~~

~~~text الناتج
10/06/2026  10:27 AM                 3 .env
10/06/2026  10:27 AM                 3 .env.example
~~~

[[|]] (اسمها pipe، ماسورة) بتاخد **الناتج العادي** للأمر اللي على الشمال، ومتطبعهوش، وتدّيه للأمر اللي على اليمين كأنه ملف بيقراه. فـ [[findstr]] قرا ناتج [[dir]] كله وطبع السطرين اللي فيهم [[.env]] بس.

ومع [[dir /b]] بيطلع الأسامي بس: [[.env]] و [[.env.example]].

---

## ٢. [[npm run build > build.log 2>&1]]: كل حاجة في ملف

عشان نشوف الفرق، عملت script اسمه build بيطبع سطر عادي ([[building...]]) وسطر خطأ ([[Error: missing file src/app.js]]) ويفشل.

### الأول: [[>]] لوحدها

~~~cmd
npm run build > build.log
~~~

~~~text الناتج على الشاشة
Error: missing file src/app.js
~~~

~~~text اللي في build.log (سطر الأمر الطويل مختصر بـ ...)
> lab@1.0.0 build
> node -e "..."

building...
~~~

[[>]] هي في الحقيقة [[1>]]: وجّهت المخرج رقم 1 بس للملف. سطر الخطأ في المخرج 2، فراح للشاشة زي ما هو. (ولو السطر ده جوه ملف bat من غير [[@echo off]]، CMD بيطبعه قبل ما ينفّذه، وبيكتبه بنفسه [[1>build.log]].)

### بعدين: [[2>&1]]

~~~cmd
npm run build > build.log 2>&1
~~~

الشاشة فاضية خالص، والملف فيه كله:

~~~text اللي في build.log (سطر الأمر الطويل مختصر بـ ...)
> lab@1.0.0 build
> node -e "..."

building...
Error: missing file src/app.js
~~~

[[2>&1]] تتقري: «المخرج 2، ودّيه **لنفس مكان** المخرج 1». و [[&]] قبل الـ 1 معناها «ده رقم مخرج مش ملف اسمه 1».

### الترتيب مهم

~~~cmd
npm run build 2>&1 > build2.log
~~~

~~~text الناتج على الشاشة
Error: missing file src/app.js
~~~

CMD بينفّذ التوجيه من الشمال لليمين: [[2>&1]] الأول خلّت 2 يروح مكان 1، و 1 لسه الشاشة. وبعدين [[>]] غيّرت 1 بس للملف. فالخطأ فضل على الشاشة. القاعدة: [[>]] الأول، و [[2>&1]] بعدها.

---

## ٣. [[dir not-here 2>nul]]: ارمي الأخطاء

~~~cmd
dir not-here
~~~

~~~text الناتج
 Volume in drive C has no label.
 Volume Serial Number is BEFF-044A

 Directory of C:\lab

File Not Found
~~~

~~~cmd
dir not-here 2>nul
~~~

~~~text الناتج
 Volume in drive C has no label.
 Volume Serial Number is BEFF-044A

 Directory of C:\lab
~~~

- [[nul]] مكان وهمي أي حاجة بتتكتب فيه بتختفي (زي [[/dev/null]] في لينكس).
- [[2>nul]] رمت [[File Not Found]] بس، لأنها رسالة خطأ. الهيدر فضل، لأنه ناتج عادي (مخرج 1).
- و [[dir not-here >nul 2>&1]] مطبعتش ولا حرف: ده الشكل اللي يسكّت أمر خالص.

---

## ٤. [[ipconfig | clip]]

~~~cmd
ipconfig | clip
~~~

مش بيطبع حاجة: الـ pipe ودّت الناتج لـ [[clip]]، و clip حطه في الـ clipboard. اعمل Ctrl+V في أي مكان تلاقيه. (تفاصيله في درس clip.)

---

## الخلاصة

| الرمز | معناه |
|---|---|
| [[|]] | ودّي الناتج العادي للأمر اللي بعدي |
| [[>]] (يعني [[1>]]) | الناتج العادي في ملف، والملف بيتمسح الأول |
| [[>>]] | الناتج العادي في آخر الملف |
| [[2>]] | الأخطاء بس في ملف |
| [[2>&1]] | الأخطاء مكان الناتج العادي (بعد [[>]] مش قبلها) |
| [[nul]] | ارمي |

نفس الرموز بنفس المعنى في bash، والفرق إن [[nul]] هناك اسمها [[/dev/null]].`,
          lines: [
            "فلتر ناتج dir على .env (زي grep).",
            "احفظ ناتج الـ build وأخطاءه في ملف.",
            "ارمي رسالة الـ error ([[nul]] هو /dev/null بتاع ويندوز). هيختفي [[File Not Found]] بس، وهيدر dir هيفضل لأنه ناتج عادي مش error.",
            "انسخ الناتج للكليب بورد (clip زي pbcopy)."
          ],
          sol: R`[[ipconfig | clip]] مش بيطبع حاجة على الشاشة، ده الطبيعي لأن الناتج راح للكليب بورد. افتح notepad واعمل Ctrl+V، هتلاقي ناتج ipconfig كامل بـ [[Windows IP Configuration]] وكل الكروت.

لو لزقت ولقيت حاجة قديمة، يبقى الأمر مشتغلش أو كتبت [[ipconfig > clip]]، ودي بتعمل ملف اسمه clip في الفولدر بدل ما تبعت للكليب بورد. امسحه بـ [[del clip]].`
        },
        {
          cmd: "&& و || و &",
          title: "اربط أوامر",
          desc: R`تلات طرق تربط بيهم أكتر من أمر في سطر واحد. [[&&]] نفّذ التاني بس لو الأول نجح، فـ [[npm install && npm run dev]] مش هيشغّل السيرفر لو التسطيب فشل. و [[||]] نفّذ التاني بس لو الأول فشل، مفيد لرسالة أو بديل. و [[&]] واحدة نفّذ الاتنين ورا بعض في كل الأحوال، وده المقابل لـ [[;]] في bash (الـ [[;]] في CMD ملهاش المعنى ده).

النجاح والفشل بيتحددوا بالـ exit code: 0 نجح، وأي رقم تاني فشل، والرقم ده بيتحفظ في [[%errorlevel%]] (درس if و errorlevel). وتقدر تجمع: [[mkdir app && echo created || echo failed]].

خلي بالك من حاجتين: [[echo done && ...]] بيطبع مسافة زيادة في آخر done لأن المسافة قبل [[&&]] بتبقى جزء من الكلام. وبعض البرامج بترجع أرقام غريبة، زي robocopy اللي بيرجع 1 وهو ناجح، فـ [[&&]] هتعتبره فشل.`,
          example: R`npm install && npm run dev
mkdir app || echo already exists
cd lab & dir`,
          try: "اكتب [[mkdir app && echo done]] مرتين وقارن.",
          deep: {
            why: R`«ثبّت وبعدين شغّل، بس لو التسطيب نجح» أو «اعمل الفولدر، ولو موجود قول كده». الربط بالشروط بيخلّي سطر واحد يتصرف صح من غير if، وده أساس أي سكربت bat آمن.`,
            how: R`[[&&]] ينفّذ التاني لو الأول نجح. [[||]] ينفّذ التاني لو الأول فشل. [[&]] يشغّل الاتنين بغض النظر.

الـ «نجاح» في CMD يعتمد على [[errorlevel]]: 0 نجاح، أي رقم تاني فشل. بعض الأوامر القديمة مش بترجع errorlevel صح.

[[cd /d D:\project && npm install && npm start]] سلسلة آمنة.

[[&& echo Done || echo Failed]] بيطبع Done لو الأمر نجح أو Failed لو فشل.`,
            when: "سلسلة أوامر مترابطة. التحقق من نجاح خطوة.",
            mistakes: "بعض الأوامر مش بترجع errorlevel صح حتى لو فشلت. اختبر الأمر الأول بيدك."
          },
          teach: R`## الفكرة

كل أمر لما يخلص بيسيب رقم اسمه **exit code**، و CMD بيحفظه في [[%errorlevel%]]: [[0]] يعني نجح، وأي رقم تاني يعني فشل. الرموز التلاتة دي بتربط أمرين في سطر، وبتقرر تشغّل التاني ولا لأ على أساس الرقم ده. اتجرب في CMD على ويندوز 11.

---

## ١. [[&&]]: التاني لو الأول نجح

~~~cmd
npm install && npm run dev
~~~

[[npm run dev]] مش هيشتغل إلا لو [[npm install]] خلص بنجاح. جربت الفكرة بأمرين: واحد بيفشل وواحد بينجح.

~~~cmd
npm run build && echo SERVER STARTING
echo %errorlevel%
~~~

~~~text الناتج (الـ build هنا متعمول عشان يفشل)
1
~~~

[[SERVER STARTING]] مااتطبعتش، و [[errorlevel]] بـ 1. أما [[npm install && echo ...]] في فولدر سليم فطبع الرسالة، لأن التسطيب رجّع 0.

ليه ده مهم؟ لو التسطيب فشل وكمّلت تشغّل السيرفر، هتشوف أخطاء غريبة عن مكتبات ناقصة بدل الخطأ الحقيقي.

---

## ٢. [[||]]: التاني لو الأول فشل

~~~cmd
mkdir app || echo already exists
~~~

أول مرة: [[app]] اتعمل، فمطبعش حاجة. تاني مرة:

~~~text الناتج
A subdirectory or file app already exists.
already exists
~~~

[[mkdir]] فشل (errorlevel 1)، فاتنفّذ اللي بعد [[||]].

---

## ٣. [[&]]: الاتنين في كل الأحوال

~~~cmd
cd lab & dir
~~~

[[&]] واحدة معناها «ورا بعض» من غير شرط: [[dir]] هيشتغل حتى لو [[cd]] فشل. وده المقابل لـ [[;]] في bash. والفرق اتجرب:

~~~text الناتج: mkdir app & echo done (و app موجود)
A subdirectory or file app already exists.
done
~~~

~~~text الناتج: mkdir app && echo done (و app موجود)
A subdirectory or file app already exists.
~~~

---

## ٤. التلاتة مع بعض

~~~cmd
mkdir app && echo created || echo failed
~~~

~~~text الناتج (و app موجود)
A subdirectory or file app already exists.
failed
~~~

بيتقري زي «لو نجح قول created، غير كده قول failed».

---

## ٥. فخ المسافة قبل [[&&]]

~~~cmd
echo done && echo next
~~~

اتطبع [[done]] وبعدها [[next]]، بس لما فحصت الحروف لقيت [[done]] بعدها **مسافة**: CMD بيعتبر كل حاجة لحد [[&&]] جزء من كلام [[echo]]، ومنها المسافة. لو وجّهته لملف هتتحفظ. الحل [[echo done&& echo next]] (من غير مسافة قبل [[&&]])، أو [[(echo done) && echo next]].

---

## الخلاصة

| الرمز | التاني بيشتغل امتى |
|---|---|
| [[&&]] | لو الأول نجح (errorlevel 0) |
| [[||]] | لو الأول فشل (أي رقم غير 0) |
| [[&]] | دايمًا |

| bash | CMD |
|---|---|
| [[a && b]] | [[a && b]] |
| [[a || b]] | [[a || b]] |
| [[a ; b]] | [[a & b]] |

و [[;]] في CMD مش فاصل: [[mkdir x ; echo done]] بيعمل فولدرات اسمها [[x]] و [[echo]] و [[done]]. وفيه برامج بترجع رقم غير 0 وهي ناجحة (زي robocopy)، فـ [[&&]] معاها بتغلط.`,
          lines: [
            "شغّل الثاني بس لو الأول نجح.",
            "شغّل الثاني بس لو الأول فشل.",
            "شغّل الاتنين في كل الأحوال (زي [[;]] في bash)."
          ],
          sol: R`أول مرة [[mkdir app && echo done]] بيطبع [[done]]. تاني مرة بيطبع [[A subdirectory or file app already exists.]] ومش بيطبع done، لأن mkdir فشل (errorlevel 1) و [[&&]] بتنفذ اللي بعدها بس لو اللي قبلها نجح.

لو استخدمت [[&]] بدل [[&&]]، done هتطلع في المرتين حتى مع الـ error. ولو كتبت [[;]] زي bash، CMD هيعتبرها جزء من الأمر مش فاصل: [[mkdir x ; echo done]] عمل عندي ٣ فولدرات اسمهم x و echo و done.`
        },
        {
          cmd: "clip",
          title: "انسخ ناتج أمر للـ clipboard",
          desc: R`[[clip]] بياخد أي كلام بيوصله من [[|]] أو من ملف بـ [[<]] ويحطه في الـ clipboard، فتعمل Ctrl+V في أي برنامج. زي [[pbcopy]] في الماك و [[xclip]] في لينكس، وموجود في كل ويندوز.

[[dir /b | clip]] بينسخ أسامي الملفات، و [[type package.json | clip]] محتوى ملف، و [[clip < notes.txt]] نفس الحكاية من غير type: [[<]] بتدخّل الملف للأمر كأنك كتبته بإيدك. و [[ipconfig | findstr IPv4 | clip]] بيفلتر الأول وينسخ سطر الـ IP بس.

[[echo]] بيحط سطر جديد في آخر الكلام، والمسافة قبل [[|]] بتتحسب كمان: [[echo hello | clip]] بينسخ hello ومسافة وسطر جديد. عشان تنسخ الكلام بالظبط (باسورد، أو أمر هتلزقه في نص سطر): [[echo|set /p=hello|clip]]. الحركة دي: [[set /p]] بيطبع الكلام اللي بعد [[=]] من غير سطر جديد ويستنى إدخال (درس set /p و choice)، و [[echo|]] قبله بيديله سطر فاضي فميستناش.

[[clip]] بيكتب بس ومش بيقرا. عشان تشوف اللي في الـ clipboard من CMD: [[powershell -NoProfile -Command Get-Clipboard]]، ولسجل الحاجات اللي نسختها Win+V (درس «Win+V» في تاب «اختصارات النظام»). والعربي: clip بيقرا الكلام بصفحة الترميز الحالية، فملف UTF-8 فيه عربي محتاج [[chcp 65001]] الأول (درس chcp 65001)، وإلا هيتنسخ رموز غريبة.`,
          example: R`dir /b | clip
type package.json | clip
clip < notes.txt
ipconfig | findstr IPv4 | clip
echo|set /p=npm run dev|clip
powershell -NoProfile -Command Get-Clipboard`,
          try: R`انسخ أسامي ملفات فولدر lab بـ clip والصقها في notepad. وبعدين انسخ [[npm run dev]] من غير سطر جديد والصقه في نص سطر في notepad، واتأكد إن المؤشر فضل في نفس السطر.`,
          deep: {
            why: R`بدل ما تعمل select بالماوس على ناتج طويل في الترمنال (وتخسر سطور أو تاخد مسافات زيادة)، تبعته على طول للـ clipboard وتلزقه في issue أو شات أو إيميل. ومع findstr تختار الجزء اللي محتاجه بالظبط.`,
            how: R`[[clip.exe]] برنامج صغير في [[C:\Windows\System32]] بيقرا كل اللي بيوصله على الـ input لحد الآخر، ويحطه نص في الـ clipboard. عشان كده [[> clip]] غلط: دي بتعمل ملف اسمه clip (درس pipe وتوجيه). ولو شغّلته لوحده من غير input بيطبع [[INFO: Type "CLIP /?" for usage.]] ومش بينسخ حاجة.

السطر الجديد: echo دايمًا بيحط سطر جديد ([[\r\n]]) في الآخر، و CMD بيعتبر أي مسافة قبل [[|]] جزء من الكلام. [[set /p=نص]] بيطبع النص كأنه سؤال من غير سطر جديد، و [[echo|]] بيرد عليه بسطر فاضي فيخلص على طول. وفيه شكل تاني منتشر [[<nul set /p=hello|clip]]، بس لما جرّبته نسخ hello بمسافة في الآخر، فخليك في شكل echo.

الترميز: clip بيحوّل البايتات اللي جاياله لنص على أساس صفحة الترميز الحالية ([[chcp]])، فلو الملف UTF-8 والنافذة على 437 أو 720، العربي بيتنسخ رموز. والأوامر الداخلية زي [[dir]] و [[echo]] بتكتب بنفس صفحة النافذة فمفيش مشكلة معاها.

ولأنه برنامج عادي، بيشتغل كمان من PowerShell ([[Get-Process | clip]]) ومن Git Bash ([[echo hi | clip]]). وفي PowerShell فيه [[Set-Clipboard]] و [[Get-Clipboard]] جاهزين.`,
            when: R`تبعت ناتج error أو [[systeminfo]] لحد بيساعدك، أو تنسخ IP أو مسار أو token طلع في الترمنال، أو سكربت bat بيجهّز سطر جاهز للّزق (رابط أو أمر).`,
            mistakes: R`[[ipconfig > clip]] بدل [[| clip]] فيتعمل ملف اسمه clip. أو [[echo pass | clip]] بمسافة وسطر جديد فالباسورد تبقى غلط لما تلزقها. أو ملف UTF-8 فيه عربي من غير [[chcp 65001]]. أو تنسخ أسرار (.env أو مفاتيح) للـ clipboard وتنسى إن سجل Win+V وأي برنامج شغال يقدر يقراها.`
          },
          teach: R`## الفكرة

[[clip]] برنامج صغير في ويندوز ([[C:\Windows\System32\clip.exe]]) بيقرا أي كلام بيوصله ويحطه في الـ clipboard، كأنك عملت Copy. هنمشي على سطور المثال الستة، وبعد كل واحد قريت الـ clipboard بالسطر الأخير عشان نشوف اتنسخ إيه. اتجرب في CMD على ويندوز 11.

---

## ١. [[dir /b | clip]]

~~~cmd
dir /b | clip
~~~

مش بيطبع حاجة على الشاشة، لأن الـ pipe ([[|]]) ودّت الناتج لـ clip بدل الشاشة. اللي اتنسخ:

~~~text اللي في الـ clipboard
.env
.env.example
app
build.log
build2.log
index.js
notes.txt
package-lock.json
package.json
~~~

---

## ٢. [[type package.json | clip]]

نفس الفكرة: [[type]] بيطبع الملف، والـ pipe بتوديه لـ clip. فمحتوى الملف كله بقى في الـ clipboard (جربته و Get-Clipboard طبع الملف من أول [[{]] لآخره)، جاهز تلزقه في شات أو issue.

---

## ٣. [[clip < notes.txt]]

~~~cmd
clip < notes.txt
~~~

~~~text اللي في الـ clipboard
first note
second note
~~~

[[<]] عكس [[>]]: بدل ما تكتب ناتج أمر في ملف، بتدّي الملف للأمر كأنك كتبته بإيدك. النتيجة نفس [[type notes.txt | clip]] من غير type.

---

## ٤. [[ipconfig | findstr IPv4 | clip]]

pipe مرتين، والكلام بيعدّي من الشمال لليمين:

1. [[ipconfig]] بيطبع إعدادات الشبكة كلها.
2. [[findstr IPv4]] بيسيب السطور اللي فيها IPv4 بس.
3. [[clip]] بينسخهم.

~~~text اللي في الـ clipboard
   IPv4 Address. . . . . . . . . . . : 192.168.1.65
   IPv4 Address. . . . . . . . . . . : 172.29.160.1
~~~

طلع سطرين لأن الجهاز عليه كارت تاني افتراضي (بتاع WSL، رقمه 172...). الأولاني هو الواي فاي.

---

## ٥. [[echo|set /p=npm run dev|clip]]: الكلام بالظبط

المشكلة: [[echo]] دايمًا بيحط سطر جديد في الآخر، والمسافة قبل [[|]] بتدخل في الكلام. قست طول اللي اتنسخ:

| الأمر | الطول | ليه |
|---|---|---|
| [[echo npm run dev | clip]] | 14 | 11 حرف + مسافة + سطر جديد (حرفين [[\r\n]]) |
| [[echo|set /p=npm run dev|clip]] | 11 | الكلام بس |

الحيلة بالترتيب:

- [[set /p=npm run dev]]: [[set /p]] أصلًا بيسأل سؤال ويستنى إجابة، والسؤال هو الكلام اللي بعد [[=]]. والمهم إنه بيطبع السؤال **من غير سطر جديد**.
- [[echo|]] قبله: [[echo]] فاضي بيبعتله سطر فاضي، كأنك ضغطت Enter، فـ set ميقفش مستني.
- [[|clip]]: اللي اتطبع (الكلام بس) يروح الـ clipboard.

---

## ٦. [[powershell -NoProfile -Command Get-Clipboard]]

clip بيكتب في الـ clipboard بس ومش بيقرا منه. فعشان تشوف فيه إيه من CMD، بنشغّل PowerShell لأمر واحد:

- [[powershell]]: شغّل Windows PowerShell.
- [[-NoProfile]]: من غير ملف الإعدادات بتاعك (أسرع).
- [[-Command Get-Clipboard]]: نفّذ الأمر ده واخرج. [[Get-Clipboard]] بيطبع اللي في الـ clipboard.

ده اللي استخدمته في كل الخطوات اللي فاتت.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| انسخ ناتج أمر | [[dir /b | clip]] |
| انسخ ملف | [[clip < notes.txt]] |
| انسخ سطر معين | [[ipconfig | findstr IPv4 | clip]] |
| انسخ كلام من غير سطر جديد | [[echo|set /p=text|clip]] |
| شوف اللي اتنسخ | [[powershell -NoProfile -Command Get-Clipboard]] |

[[ipconfig > clip]] غلط: دي بتعمل ملف اسمه clip. وفي الماك [[pbcopy]]، وفي لينكس [[xclip]] (محتاج يتسطب).`,
          lines: [
            R`انسخ أسامي الملفات.`,
            R`انسخ محتوى ملف.`,
            R`نفس الحكاية بـ [[<]] من غير type.`,
            R`فلتر سطر الـ IPv4 بس وانسخه (ممكن يطلع أكتر من سطر لو عندك أكتر من كارت شبكة).`,
            R`انسخ الكلام بالظبط، من غير سطر جديد في الآخر.`,
            R`اطبع اللي في الـ clipboard دلوقتي (بـ PowerShell).`
          ],
          sol: R`[[echo|set /p=npm run dev|clip]] وبعدين Ctrl+V في notepad: هيتلزق [[npm run dev]] من غير سطر جديد، والمؤشر يفضل في نفس السطر. جرّبت على ويندوز 11 وقريت الـ clipboard بعد كل أمر:
[[echo hello| clip]] نسخ hello وسطر جديد (7 حروف).
[[echo hello | clip]] نسخ hello ومسافة وسطر جديد (8).
[[echo|set /p=hello|clip]] و [[echo|set /p=npm run dev|clip]] نسخوا الكلام بالظبط (5 و 11).
[[<nul set /p=hello|clip]] نسخ hello ومسافة (6).
و [[ipconfig | findstr IPv4 | clip]] نسخ سطرين، لأن عندي كارت شبكة افتراضي (WSL) غير الواي فاي.

وملف UTF-8 فيه [[مرحبا يا عالم]]: [[clip < ar.txt]] بعد [[chcp 65001]] اتنسخ صح، وبعد [[chcp 437]] اتنسخ [[┘à╪▒╪¡╪¿╪º ┘è╪º ╪╣╪º┘ä┘à]]. و [[powershell -NoProfile -Command Get-Clipboard]] طبع اللي اتنسخ وتحته سطر فاضي (السطر الجديد اللي echo حطه).`
        }
      ]
    }
]);
