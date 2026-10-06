// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "العمليات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "tasklist / taskkill",
          title: "العمليات ووقفها",
          desc: R`[[tasklist]] بيعرض البرامج الشغالة، زي [[ps]] في bash: لكل عملية اسمها و PID (رقمها) والرام. و [[| findstr node]] بيفلتر السطور اللي فيها node. و [[taskkill]] بيقفل عملية، زي [[kill]].

[[/IM node.exe]] بيقفل بالاسم (IM من image name)، والامتداد [[.exe]] لازم، وبيقفل كل العمليات اللي بالاسم ده. و [[/PID 1234]] بيقفل عملية واحدة برقمها، وده أدق. و [[/F]] (force) يقفل غصب من غير ما يستنى البرنامج يوافق، زي [[kill -9]]. و [[/T]] (tree) يقفل العملية وكل العمليات اللي هي فتحتها، مهم مع npm اللي بيفتح node تحته.

تحذير: [[/F]] مش بيدّي البرنامج فرصة يحفظ، فأي شغل مش محفوظ بيضيع. ولو قالك Access is denied، العملية شغالة كأدمن وانت لأ. وفيه فلتر مدمج أدق من findstr: [[tasklist /fi "imagename eq node.exe"]].`,
          example: R`tasklist
tasklist | findstr node
taskkill /IM node.exe /F
taskkill /PID 1234 /F /T`,
          try: "افتح notepad واقفله بـ taskkill.",
          flag: "danger",
          deep: {
            why: R`برنامج معلّق، أو سيرفر node قديم لسه ماسك البورت، أو عايز تعرف مين بياكل الرام. زي ps و kill في bash.`,
            how: R`[[tasklist]] كل العمليات. [[tasklist /fo csv]] بـ CSV format أسهل للـ parsing. [[tasklist /fi "imagename eq node.exe"]] تفلتر باسم.

[[taskkill /im "notepad.exe" /f]] يوقف بالاسم. [[taskkill /pid 1234 /f]] بالـ PID. [[/f]] force.

[[tasklist | findstr "node"]] أسرع للبحث السريع.`,
            when: "عملية معلّقة. تطبيق ماسك بورت.",
            mistakes: R`[[taskkill /im "node"]] مش شغال، لازم [[node.exe]] (الامتداد مهم).`
          },
          teach: R`## الفكرة

أي برنامج شغال على الجهاز اسمه **process** (عملية)، وكل واحدة ليها رقم فريد اسمه **PID** (Process ID). [[tasklist]] بيعرضهم، و [[taskkill]] بيقفل واحدة منهم. اتجرب في CMD على ويندوز 11، والقفل اتجرب على عمليات [[ping]] أنا اللي مشغلها للتجربة.

---

## ١. [[tasklist]]

~~~cmd
tasklist
~~~

~~~text الناتج (أول سطور)
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
System Idle Process              0 Services                   0          8 K
System                           4 Services                   0      4,932 K
Registry                       280 Services                   0     41,640 K
smss.exe                       900 Services                   0      1,600 K
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[Image Name]] | اسم ملف البرنامج ([[node.exe]] مثلًا) |
| [[PID]] | رقم العملية، وده اللي هتقفل بيه |
| [[Session Name]] | [[Services]] خدمات النظام، و [[Console]] البرامج اللي انت فاتحها |
| [[Session#]] | رقم الجلسة نفسها |
| [[Mem Usage]] | الرام اللي واكلاها، بالـ K (كيلوبايت) |

---

## ٢. [[tasklist | findstr node]]

اللستة طويلة جدًا، فبنفلترها بـ pipe و findstr (درس findstr):

~~~text الناتج (أول سطور)
node.exe                     27148 Console                    1     44,440 K
node.exe                     11300 Console                    1     44,420 K
node.exe                     17940 Console                    1     59,064 K
~~~

على الجهاز ده طلع حوالي **٣٠ عملية node** شغالين، من محرر الكود وأدوات تانية، مش سيرفر واحد. افتكر الرقم ده في الخطوة الجاية.

وفيه فلتر جوه tasklist نفسه أدق: [[tasklist /fi "imagename eq node.exe"]]. [[/fi]] من filter، و [[eq]] من equal. وكمان بالرقم: [[tasklist /fi "pid eq 14864"]].

---

## ٣. [[taskkill /IM node.exe /F]]

| الحتة | معناها |
|---|---|
| [[/IM node.exe]] | بالاسم (IM من image name)، والـ [[.exe]] لازم |
| [[/F]] | من force: اقفل غصب، من غير ما تستنى البرنامج يوافق |

> السطر ده بيقفل **كل** عملية اسمها node.exe. على الجهاز ده كان هيقفل الـ ٣٠ مرة واحدة، ومعاهم أدوات المحرر، عشان كده مجربتهوش هنا. القفل بالـ PID أأمن.

ولو كتبت الاسم من غير [[.exe]]، جربتها:

~~~text الناتج: taskkill /IM PING /F
ERROR: The process "PING" not found.
~~~

---

## ٤. [[taskkill /PID 1234 /F /T]]

### بالرقم من غير [[/F]]

شغلت [[ping]] طويل رقمه طلع 14864، وقفلته:

~~~cmd
taskkill /PID 14864
~~~

~~~text الناتج
SUCCESS: Sent termination signal to the process with PID 14864.
~~~

من غير [[/F]]، taskkill **بيطلب** من البرنامج يقفل (فبرنامج زي notepad ممكن يسألك تحفظ الأول). ولما كررت الأمر بعدها:

~~~text الناتج
ERROR: The process "14864" not found.
~~~

خلاص اتقفل.

### [[/T]]: العملية واللي هي شغّلاه

شغلت [[cmd]] بيشغّل [[ping]] جواه، وقفلت الـ cmd برقمه (41016):

~~~cmd
taskkill /PID 41016 /F /T
~~~

~~~text الناتج
SUCCESS: The process with PID 29296 (child process of PID 41016) has been terminated.
SUCCESS: The process with PID 31524 (child process of PID 41016) has been terminated.
SUCCESS: The process with PID 41016 (child process of PID 42240) has been terminated.
~~~

[[/T]] من tree: قفل العملية وكل «الأولاد» اللي فتحتهم الأول ([[child process]])، وبعدين هي نفسها. وده مهم مع [[npm run dev]]: npm بيشغّل node تحته، فلو قفلت npm بس، node ممكن يفضل ماسك البورت.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| كل العمليات | [[tasklist]] |
| عمليات برنامج معين | [[tasklist | findstr node]] |
| عملية برقمها | [[tasklist /fi "pid eq 1234"]] |
| اقفل بالرقم | [[taskkill /PID 1234]] |
| اقفل غصب هي وأولادها | [[taskkill /PID 1234 /F /T]] |
| اقفل كل نسخ برنامج | [[taskkill /IM notepad.exe]] |

في bash: [[ps aux]] و [[kill 1234]] و [[kill -9 1234]] (زي [[/F]]).`,
          lines: [
            "كل العمليات (زي ps).",
            "عمليات node بس.",
            "اقفل كل node بالاسم، غصب ([[/F]]). الامتداد .exe لازم.",
            "اقفل عملية برقمها، هي واللي عملتهم ([[/T]] شجرة)."
          ],
          sol: R`[[start notepad]] وبعدين [[tasklist | findstr /i notepad]] يوريك السطر ورقم الـ PID. [[taskkill /IM notepad.exe]] يطبع [[SUCCESS: Sent termination signal to the process "notepad.exe" with PID 1234.]] والنافذة تتقفل (ولو فيه كلام مش محفوظ ممكن notepad يسألك). مع [[/F]] الرسالة [[SUCCESS: The process "notepad.exe" with PID 1234 has been terminated.]] ومن غير سؤال.

لو قالك [[ERROR: The process "notepad" not found.]] يبقى كتبت الاسم من غير [[.exe]]، أو notepad مقفول أصلًا. و [[/IM]] بيقفل كل النسخ اللي بنفس الاسم.`
        },
        {
          cmd: "netstat -ano",
          title: "مين ماسك البورت",
          desc: R`لما سيرفر يقولك البورت مستخدم (EADDRINUSE)، [[netstat]] بيوريك مين ماسكه. [[-a]] كل الاتصالات والبورتات اللي بتسمع، و [[-n]] الأرقام بدل الأسامي (أسرع)، و [[-o]] رقم العملية (PID) في آخر عمود. ومتجمعين [[-ano]].

[[| findstr :3000]] بيفلتر السطور اللي فيها البورت، والنقطتين قبل الرقم عشان ميجيبش 13000 أو 30001 كتير. دوّر على السطر اللي فيه [[LISTENING]]، وخد الرقم اللي في آخره، وابعته لـ [[taskkill /PID الرقم /F]].

الشكل: Proto (TCP)، و Local Address (زي [[0.0.0.0:3000]] يعني سامع لأي حد على الشبكة، و [[127.0.0.1:3000]] جوه الجهاز بس)، و Foreign Address، و State، و PID. اتصالات حالتها TIME_WAIT ورقمها 0 دي قديمة متعملهاش حاجة. المقابل في لينكس [[ss -tlnp]]، وفي PowerShell [[Get-NetTCPConnection]].`,
          example: R`netstat -ano | findstr :3000
taskkill /PID 1234 /F`,
          try: "شغّل سيرفر على 3000 واقفله بالطريقة دي.",
          deep: {
            why: R`السيرفر مش راضي يقوم ويقول EADDRINUSE أو port 3000 in use. netstat بيوريك أنهي برنامج (برقمه) ماسك البورت، وبعدها taskkill يقفله. زي [[ss -tlnp]] في لينكس.`,
            how: R`[[-a]] كل الاتصالات. [[-n]] أرقام بدل أسامي. [[-o]] PID العملية. فالناتج: حالة الاتصال، والعنوان المحلي والبعيد، والـ PID.

للدور على بورت معين: [[netstat -ano | findstr ":3000"]] يعرض كل سطر فيه البورت ده.

بعدين [[tasklist /fi "pid eq 1234"]] تعرف العملية.

[[netstat -ano | findstr "LISTENING"]] البورتات اللي بتستمع بس.`,
            when: "EADDRINUSE. تعرف مين ماسك بورت معين.",
            mistakes: R`[[findstr "3000"]] ممكن يرجع اتصالات على بورت تاني زي 13000. استخدم [[":3000"]] بنقطتين.`
          },
          teach: R`## الفكرة

كل سيرفر بيستنى الطلبات على **بورت** (رقم من 0 لـ 65535، زي 3000). بورت واحد مينفعش يمسكه برنامجين، فلو سيرفر قديم لسه شغال، الجديد بيقول [[EADDRINUSE]] (address in use). [[netstat]] بيوريك مين ماسك البورت، و [[taskkill]] يقفله. اتجرب في CMD على ويندوز 11 بسيرفر node صغير شغلته على 3000.

---

## ١. [[netstat -ano]]

[[netstat]] من network statistics، والتلات حروف إضافات متجمعة:

| الحرف | معناه |
|---|---|
| [[-a]] | all: كل الاتصالات، ومعاها البورتات اللي بتستنى |
| [[-n]] | numbers: اكتب الـ IP والبورت أرقام، من غير ما تدوّر على أساميهم (أسرع بكتير) |
| [[-o]] | owner: ضيف عمود فيه PID العملية |

~~~text الناتج (أول سطور)
Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1864
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:5432           0.0.0.0:0              LISTENING       6424
~~~

الناتج مئات السطور، عشان كده بنفلتره.

---

## ٢. [[netstat -ano | findstr :3000]]

~~~cmd
netstat -ano | findstr :3000
~~~

~~~text الناتج
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       8216
  TCP    127.0.0.1:59370        127.0.0.1:3000         TIME_WAIT       0
  TCP    [::]:3000              [::]:0                 LISTENING       8216
~~~

النقطتين قبل الرقم ([[:3000]]) عشان ميمسكش سطور فيها 13000 مثلًا. نقرا كل عمود:

| العمود | السطر الأول | معناه |
|---|---|---|
| [[Proto]] | [[TCP]] | البروتوكول |
| [[Local Address]] | [[0.0.0.0:3000]] | العنوان والبورت على جهازك. [[0.0.0.0]] يعني «سامع على كل الكروت» (يعني حتى من موبايل على نفس الواي فاي) |
| [[Foreign Address]] | [[0.0.0.0:0]] | الطرف التاني. أصفار يعني لسه مفيش حد، هو مستني |
| [[State]] | [[LISTENING]] | بيستنى طلبات: **ده السيرفر** |
| [[PID]] | [[8216]] | رقم العملية اللي ماسكة البورت |

والسطرين التانيين:

- [[[::]:3000]]: نفس السيرفر بس على IPv6 ([[::]] هي [[0.0.0.0]] بتاعة IPv6). نفس الـ PID.
- [[TIME_WAIT]] و PID بـ [[0]]: اتصال قديم خلص (أنا فتحت الصفحة مرة)، والنظام بيستنى شوية قبل ما ينساه. ملهوش صاحب، فمتحاولش تقفله.

ولو عايز سطر السيرفر بس: [[netstat -ano | findstr :3000 | findstr LISTENING]].

---

## ٣. اتأكد قبل ما تقفل

~~~cmd
tasklist /fi "pid eq 8216"
~~~

~~~text الناتج
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
node.exe                      8216 Console                    1     60,680 K
~~~

node فعلًا، يعني ده السيرفر بتاعنا مش حاجة تانية.

---

## ٤. [[taskkill /PID 8216 /F]]

~~~cmd
taskkill /PID 8216 /F
~~~

~~~text الناتج
SUCCESS: The process with PID 8216 has been terminated.
~~~

وبعدها [[netstat -ano | findstr :3000]] طلع سطر الـ [[TIME_WAIT]] بس: البورت فضي، والسيرفر الجديد يقدر يقوم.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ١. مين على البورت | [[netstat -ano | findstr :3000]] |
| ٢. خد الـ PID من سطر [[LISTENING]] | آخر عمود |
| ٣. اتأكد ده إيه | [[tasklist /fi "pid eq 8216"]] |
| ٤. اقفله | [[taskkill /PID 8216 /F]] |

المقابل في لينكس [[ss -tlnp]] أو [[lsof -i :3000]]، وفي PowerShell [[Get-NetTCPConnection -LocalPort 3000]].`,
          lines: [
            "مين ماسك بورت 3000. آخر عمود هو رقم العملية. النقطتين قبل الرقم عشان ميجيبش 13000.",
            "اقفلها بالرقم اللي طلع."
          ],
          sol: R`شغّل [[npx http-server -p 3000]]، ومن نافذة تانية [[netstat -ano | findstr :3000]]. هتلاقي سطر زي [[TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345]] (وممكن سطر [[[::]:3000]] لـ IPv6)، آخر رقم هو الـ PID. [[taskkill /PID 12345 /F]] يطبع [[SUCCESS: The process with PID 12345 has been terminated.]] والسيرفر في النافذة الأولى يقف.

خد بالك: [[:3000]] بتطابق كمان [[:30001]] واتصالات قديمة حالتها TIME_WAIT ورقمها 0، فخد رقم سطر [[LISTENING]] بس، أو ضيف [[| findstr LISTENING]]. ولو [[taskkill]] قال Access is denied، العملية شغالة كأدمن، افتح CMD كأدمن.`
        },
        {
          cmd: "start",
          title: "افتح حاجة",
          desc: R`[[start]] بيفتح أي حاجة بالبرنامج المناسب ليها ومش بيستناه يخلص، زي [[xdg-open]] في لينكس و [[open]] في الماك. [[start .]] بيفتح Explorer على الفولدر الحالي (النقطة هي الفولدر الحالي)، و [[start notepad]] بيشغّل برنامج، و [[start https://github.com]] بيفتح اللينك في المتصفح الافتراضي، و [[start report.pdf]] بيفتح الملف بالبرنامج بتاعه.

الفخ المشهور: أول حاجة بين علامات تنصيص بعد start بيعتبرها عنوان النافذة مش البرنامج. فلو المسار فيه مسافات لازم تحط [[""]] فاضية الأول كعنوان، وبعدها المسار: [[start "" "C:\Program Files\Git\git-bash.exe"]].

في السكربتات: [[start "" /wait program.exe]] يستنى البرنامج يقفل، و [[start "" /b command]] يشغّله في نفس النافذة في الخلفية، و [[start "Server" cmd /k npm run dev]] يفتح نافذة CMD جديدة اسمها Server شغال فيها السيرفر وتفضل مفتوحة.`,
          example: R`start .
start notepad
start https://github.com
start "" "C:\Program Files\Git\git-bash.exe"`,
          try: "افتح الفولدر الحالي في Explorer.",
          deep: {
            why: R`سكربت عايز يفتح المتصفح على localhost بعد ما السيرفر يقوم، أو يفتح فولدر الناتج في Explorer، أو يشغّل سيرفر في نافذة لوحده ويكمّل. start بيعمل كل ده ومش بيستنى البرنامج يخلص. زي xdg-open في لينكس و open في الماك.`,
            how: R`[[start .]] يفتح الـ Explorer على الفولدر الحالي. [[start http://localhost:3000]] يفتح المتصفح. [[start "" "program.exe"]] يشغّل برنامج. [[start /wait program.exe]] بيستنى.

[[start "" "file.pdf"]] يفتح الـ PDF بالبرنامج الافتراضي.

[[start /b command]] يشغّل في الخلفية من غير نافذة جديدة.`,
            when: "فتح فولدر في Explorer. فتح الموقع لما يشتغل. تشغيل برنامج.",
            mistakes: R`[[start "prog.exe"]] الـ quote الأول هو title مش المسار. استخدم [[start "" "prog.exe"]].`
          },
          teach: R`## الفكرة

[[start]] بيفتح حاجة **ويرجعلك على طول** من غير ما يستناها تخلص. والحاجة دي ممكن تبقى فولدر أو برنامج أو لينك أو ملف، وويندوز بيختار البرنامج المناسب لكل نوع. [[start]] أمر جوه CMD نفسه: [[where start]] بيقول [[Could not find files]].

> سطور المثال بتفتح نوافذ (Explorer و Notepad والمتصفح)، فمش متجربة هنا عشان التجربة متفتحش حاجات على الجهاز؛ سلوكها من توثيق start على Microsoft Learn. اللي اتجرب فعلًا هو فكرة «مش بيستنى» و [[/wait]] تحت، بـ [[/b]] اللي مش بيفتح نافذة.

---

## ١. [[start .]]

[[.]] (نقطة) معناها الفولدر الحالي. و «فتح فولدر» في ويندوز معناه File Explorer، فبتفتحلك نافذة Explorer على الفولدر اللي انت فيه.

---

## ٢. [[start notepad]]

بيشغّل Notepad وانت ترجع للـ prompt على طول تكمّل كتابة. [[notepad]] بيتلاقي من الـ PATH ([[where notepad]] طلع [[C:\Windows\System32\notepad.exe]] أول واحد).

---

## ٣. [[start https://github.com]]

اللينك بيفتح في المتصفح الافتراضي. ويندوز عارف إن أي حاجة بتبدأ بـ [[https://]] بتتفتح بالمتصفح. ونفس الكلام مع [[start report.pdf]]: بتتفتح بالبرنامج اللي ويندوز مربوط بيه للـ PDF.

---

## ٤. [[start "" "C:\Program Files\Git\git-bash.exe"]]

ده الفخ المشهور. [[start]] بيعتبر **أول حاجة بين علامات تنصيص عنوان النافذة** (title)، مش البرنامج. فلو كتبت:

~~~cmd
start "C:\Program Files\Git\git-bash.exe"
~~~

هيفهم المسار على إنه عنوان، ويفتح نافذة CMD فاضية عنوانها المسار ده. والحل:

| الحتة | معناها |
|---|---|
| [[""]] | عنوان فاضي، بس عشان نشغل مكانه |
| [["C:\Program Files\Git\git-bash.exe"]] | البرنامج، بين علامات تنصيص عشان المسافة في Program Files |

---

## ٥. «مش بيستنى» اتجربت

[[/b]] بيشغّل الحاجة في نفس النافذة من غير ما يفتح واحدة جديدة، فقدرت أجربه:

~~~cmd
start "" /b cmd /c echo hello from start /b
echo this line ran without waiting
~~~

~~~text الناتج
this line ran without waiting
hello from start /b
~~~

السطر التاني اتطبع **الأول**: [[start]] رجّع على طول، والسطر اللي بعده اشتغل قبل ما الأمر اللي اتفتح يلحق يطبع.

### [[/wait]]: استنى

~~~cmd
start "" /b /wait cmd /c "echo inside & exit /b 3"
echo errorlevel after /wait = %errorlevel%
~~~

~~~text الناتج
inside
errorlevel after /wait = 3
~~~

مع [[/wait]] الـ start استنى الأمر يخلص، وكمان رجّع الـ exit code بتاعه ([[3]]) في [[errorlevel]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| افتح الفولدر الحالي | [[start .]] |
| شغّل برنامج | [[start notepad]] |
| افتح لينك | [[start https://github.com]] |
| برنامج مساره فيه مسافة | [[start "" "C:\Program Files\...\app.exe"]] |
| شغّل واستنى يخلص | [[start "" /wait app.exe]] |
| من غير نافذة جديدة | [[start "" /b command]] |

المقابل: [[open]] في الماك، و [[xdg-open]] في لينكس، و [[Start-Process]] أو [[ii .]] في PowerShell.`,
          lines: [
            "افتح الفولدر الحالي في Explorer.",
            "افتح برنامج.",
            "افتح لينك في المتصفح.",
            R`افتح برنامج مساره فيه مسافات. الـ [[""]] الفاضية لازمة: أول حاجة بين علامات تنصيص start بيعتبرها عنوان النافذة.`
          ],
          sol: R`[[start .]] بيفتح نافذة File Explorer على الفولدر اللي انت فيه، ومش بيطبع حاجة في CMD.

لو كتبت [[start "C:\my folder"]] بين علامات تنصيص، هتفتح نافذة CMD جديدة عنوانها «C:\my folder» بدل الفولدر، لأن أول حاجة بين علامات تنصيص بتتقري عنوان. الحل [[start "" "C:\my folder"]]، أو [[explorer .]].`
        }
      ]
    },
    {
      t: "الشبكة والنظام",
      l: 2,
      n: "",
      items: [
        {
          cmd: "ipconfig",
          title: "إعدادات الشبكة",
          desc: R`[[ipconfig]] بيعرض إعدادات الشبكة لكل كارت (Wi-Fi و Ethernet والكروت الافتراضية)، زي [[ip a]] في لينكس. أهم سطرين تحت الكارت اللي انت متوصل بيه: [[IPv4 Address]] ده عنوان جهازك على شبكة البيت، و [[Default Gateway]] ده الراوتر.

[[/all]] بيعرض تفاصيل أكتر: الـ MAC (اسمه Physical Address)، وسيرفرات الـ DNS، وهل الـ IP جاي من الراوتر أوتوماتيك (DHCP Enabled). و [[/flushdns]] بيمسح الردود اللي ويندوز حافظها عن الدومينات، ودي أول حاجة لو غيّرت الـ DNS بتاع دومين أو ملف hosts ولسه بيفتح القديم.

لو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر أصلًا (مشكلة اتصال مش مشكلة DNS). والـ IP اللي هنا مش اللي الناس بتشوفه على النت، ده جوه شبكتك بس.`,
          example: R`ipconfig
ipconfig /all
ipconfig /flushdns`,
          try: "اعرف الـ IP المحلي بتاعك.",
          deep: {
            why: R`عايز تفتح موقعك من الموبايل على نفس الواي فاي (محتاج IP جهازك)، أو النت فيه مشكلة وعايز تعرف الجهاز واخد IP ولا لأ، أو غيّرت DNS ومحتاج تمسح الكاش. زي [[ip a]] في لينكس.`,
            how: R`[[ipconfig]] كل الكروت وعناوينها. [[ipconfig /all]] تفاصيل كاملة: MAC، وDNS، والـ DHCP.

[[ipconfig /flushdns]] يمسح DNS cache (مفيد بعد تغيير hosts أو DNS). على ويندوز 11 الجديد ممكن يطلب CMD كأدمن.

عنوانك على الواي فاي: ابص على «Wireless LAN adapter Wi-Fi» وخد الـ IPv4 Address.

الـ Default Gateway هو عنوان الراوتر بتاعك. الـ DNS Servers هم اللي بتسألهم عن الدومينات.`,
            when: "إيجاد عنوان الجهاز على الشبكة. بعد تغيير DNS. مشاكل الشبكة.",
            mistakes: "الخلط بين IPv4 الحقيقي والـ 169.254.x.x: ده Automatic Private IP Address ومعناه مش قادر يتصل بـ DHCP (راوترك)."
          },
          teach: R`## الفكرة

[[ipconfig]] (من IP configuration) بيعرض إعدادات الشبكة لكل «كارت شبكة» في الجهاز. اتجرب في CMD على ويندوز 11 على لابتوب متوصل بالواي فاي.

---

## ١. [[ipconfig]]

~~~cmd
ipconfig
~~~

الناتج قسم لكل كارت. على الجهاز ده طلع ٨ كروت! أغلبهم كده:

~~~text كارت مش متوصل
Ethernet adapter Ethernet:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . :
~~~

[[Media disconnected]] يعني الكارت ده مش متوصل بحاجة (هنا كابل الشبكة مش متركب)، اتجاهله. والقسم المهم هو الكارت اللي انت متوصل بيه:

~~~text كارت الواي فاي
Wireless LAN adapter Wi-Fi:

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::84e:34ec:cd48:1b6e%13
   IPv4 Address. . . . . . . . . . . : 192.168.1.65
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
~~~

### نقرا السطور

| السطر | القيمة | معناها |
|---|---|---|
| [[IPv4 Address]] | [[192.168.1.65]] | عنوان جهازك **جوه شبكة البيت**. ده اللي تكتبه في الموبايل عشان تفتح سيرفرك: [[http://192.168.1.65:3000]] |
| [[Subnet Mask]] | [[255.255.255.0]] | أنهي جزء من العنوان هو «الشبكة»: الـ ٣ أرقام الأولى ([[192.168.1]]) ثابتة لكل الأجهزة اللي معاك، والأخير بيفرّق بينهم |
| [[Default Gateway]] | [[192.168.1.1]] | الراوتر: أي حاجة رايحة برا الشبكة (النت) بتعدّي عليه |
| [[Link-local IPv6 Address]] | [[fe80::...]] | عنوان IPv6 شغّال جوه الشبكة المحلية بس |

وكان فيه كارت تاني متوصل: [[vEthernet (WSL (Hyper-V firewall))]] بـ IPv4 [[172.29.160.1]] ومن غير Gateway. ده كارت افتراضي بتاع WSL و Docker، مش اتصالك بالنت.

---

## ٢. [[ipconfig /all]]

[[/all]] بيضيف لكل كارت سطور كتير. ده الجزء الزيادة في كارت الواي فاي (الـ MAC متخبي جزء منه):

~~~text الناتج (جزء)
   Description . . . . . . . . . . . : Intel(R) Wi-Fi 6 AX200 160MHz
   Physical Address. . . . . . . . . : 84-1B-77-XX-XX-XX
   DHCP Enabled. . . . . . . . . . . : Yes
   Lease Obtained. . . . . . . . . . : Tuesday, October 6, 2026 9:24:09 AM
   Lease Expires . . . . . . . . . . : Wednesday, October 7, 2026 9:24:08 AM
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : fe80::1%13
                                       8.8.8.8
                                       8.8.4.4
                                       192.168.1.1
~~~

| السطر | معناه |
|---|---|
| [[Description]] | الكارت الحقيقي (اسم الهاردوير) |
| [[Physical Address]] | الـ MAC: رقم ثابت للكارت نفسه، ٦ أجزاء بالـ hex |
| [[DHCP Enabled: Yes]] | الـ IP جاي أوتوماتيك من الراوتر (DHCP)، مش متكتب بإيد |
| [[Lease Obtained]] و [[Lease Expires]] | الراوتر «سلّف» الـ IP ده للجهاز من الساعة 9 الصبح ولمدة يوم، وبعدها الجهاز بيجدده |
| [[DHCP Server]] | مين اداله الـ IP (الراوتر نفسه) |
| [[DNS Servers]] | السيرفرات اللي الجهاز بيسألها «الدومين ده IP بتاعه إيه». هنا [[8.8.8.8]] و [[8.8.4.4]] بتوع Google |

---

## ٣. [[ipconfig /flushdns]]

ويندوز بيحفظ ردود الـ DNS شوية (cache) عشان ميسألش كل مرة. [[/flushdns]] بيمسح الحاجات دي، فأول طلب بعدها يسأل من جديد. مفيد لما تغيّر الـ DNS بتاع دومين أو ملف hosts ولسه بيفتح القديم. على ويندوز 11 اللي اتجرّب عليه (build 26300) الأمر ده من CMD عادي (مش أدمن) طلّع [[The requested operation requires elevation.]] ورجّع errorlevel [[1]]، ونفس الكلام لـ [[/displaydns]]؛ في نسخ ويندوز أقدم كانوا بيشتغلوا من غير أدمن. فلو طلعتلك الرسالة دي، افتح CMD كأدمن (Win+X ثم Terminal (Admin)). والرسالة اللي بتطلع لما ينجح (من توثيق ipconfig):

~~~text الناتج
Successfully flushed the DNS Resolver Cache.
~~~

---

## الخلاصة

| عايز | اكتب | بص على |
|---|---|---|
| IP جهازك على الشبكة | [[ipconfig]] | [[IPv4 Address]] تحت الكارت المتوصل |
| IP الراوتر | [[ipconfig]] | [[Default Gateway]] |
| الـ MAC والـ DNS | [[ipconfig /all]] | [[Physical Address]] و [[DNS Servers]] |
| امسح كاش الـ DNS | [[ipconfig /flushdns]] | |

لو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر خالص. والمقابل في لينكس [[ip a]] و [[ip route]].`,
          lines: ["عناوين الشبكة (زي ip a).", "كل التفاصيل: MAC والـ DNS والـ DHCP.", "امسح كاش الـ DNS."],
          sol: R`[[ipconfig]] بيطبع قسم لكل كارت، دوّر على الكارت اللي انت متوصل بيه ([[Wireless LAN adapter Wi-Fi]] أو [[Ethernet adapter Ethernet]]). تحته [[IPv4 Address. . . : 192.168.1.15]] ده الـ IP المحلي، و [[Default Gateway . . . : 192.168.1.1]] ده الراوتر.

اتجاهل كروت زي [[vEthernet (WSL)]] (في النسخ الجديدة اسمه [[vEthernet (WSL (Hyper-V firewall))]]) أو اللي تحتها [[Media disconnected]]، دي مش اتصالك الحقيقي. ولو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر (مشكلة DHCP أو الكابل). والـ IP ده مش اللي الناس بتشوفه على النت، ده جوه شبكة البيت بس.`
        },
        {
          cmd: "ping / tracert / nslookup",
          title: "اختبار الاتصال",
          desc: R`تلات أوامر لتشخيص «النت مش شغال» أو «الموقع مش بيفتح». [[ping]] بيبعت رسايل صغيرة للجهاز ويقيس الوقت لحد ما يرد: لو رد يبقى واصل. و [[-n 4]] عدد المرات (في ويندوز الافتراضي 4 وبيقف لوحده، و [[-t]] يفضل لحد Ctrl+C). خلي بالك: [[-n]] في لينكس معناها حاجة تانية، والعدد هناك [[-c]].

[[tracert]] بيوريك الطريق كله من جهازك للسيرفر، راوتر راوتر، فتعرف المشكلة واقفة فين (زي traceroute). و [[nslookup]] بيسأل الـ DNS: الدومين ده بيشاور على أنهي IP؟ (زي dig، وفيه درس لوحده في «الشبكات بعمق»).

ping بيفشل مش معناه الجهاز واقع: سيرفرات كتير (وراوترات) قافلة الرد على ping عن قصد. لو موقع مش بيرد على ping بس بيفتح في المتصفح، ده طبيعي.`,
          example: R`ping -n 4 google.com
tracert google.com
nslookup example.com`,
          try: "اعمل nslookup على دومين من دوميناتك واتأكد إنه بيشاور على IP السيرفر.",
          deep: {
            why: "تشخيص الشبكة: هل الجهاز بيرد؟ وما الطريق للوصول له؟ والـ DNS شايف إيه؟",
            how: R`[[ping google.com]] بيجرّب 4 مرات افتراضيًا. [[-n 10]] عدد معين. [[-t]] يفضل بدون توقف.

[[tracert google.com]] الطريق كامل. [[tracert /d]] بدون الـ DNS resolution (أسرع).

[[nslookup example.com]] بيسأل الـ DNS عن الـ IP. [[nslookup example.com 8.8.8.8]] يسأل سيرفر معين.

وعلى عكس Linux، [[ping]] في ويندوز بيوقف بعد 4 مرات لوحده.`,
            when: "الموقع مش بيفتح. الـ DNS لسه مش منتشر. لتشخيص بطء الشبكة.",
            mistakes: "ping بيوقف لوحده في ويندوز، بس لو عايزه يفضل زي لينكس استخدم [[-t]]."
          },
          teach: R`## الفكرة

٣ أوامر، كل واحد بيجاوب سؤال لما «النت مش شغال» أو «الموقع مش بيفتح»:

| الأمر | السؤال |
|---|---|
| [[ping]] | الجهاز ده بيرد عليا؟ وفي قد إيه؟ |
| [[tracert]] | الطريق ليه بيعدّي على مين؟ |
| [[nslookup]] | الدومين ده IP بتاعه إيه؟ |

كله اتجرب في CMD على ويندوز 11 من شبكة بيت في مصر.

---

## ١. [[ping -n 4 google.com]]

~~~cmd
ping -n 4 google.com
~~~

~~~text الناتج
Pinging google.com [142.251.209.206] with 32 bytes of data:
Reply from 142.251.209.206: bytes=32 time=57ms TTL=118
Reply from 142.251.209.206: bytes=32 time=51ms TTL=118
Reply from 142.251.209.206: bytes=32 time=74ms TTL=118
Reply from 142.251.209.206: bytes=32 time=115ms TTL=118

Ping statistics for 142.251.209.206:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 51ms, Maximum = 115ms, Average = 74ms
~~~

### نقرا الناتج

- أول سطر: ping حوّل [[google.com]] لـ IP ([[142.251.209.206]]) الأول، وبعت رسايل حجم كل واحدة [[32 bytes]].
- [[-n 4]]: ابعت ٤ رسايل (n من number). ده الافتراضي أصلًا في ويندوز، وبعدها بيقف لوحده.
- [[time=57ms]]: الرسالة راحت ورجعت في ٥٧ ميلي ثانية (الثانية = 1000ms). الرقم ده بيتغير كل مرة، عشان كده في الآخر [[Minimum]] و [[Maximum]] و [[Average]].
- [[TTL=118]] (Time To Live): عداد بيقل ١ عند كل راوتر في السكة. مش محتاجه دلوقتي.
- [[Lost = 0 (0% loss)]]: مفيش ولا رسالة ضاعت، وده أهم رقم.

### لو مفيش رد

جربت IP مفيش حد عليه (و [[-w 1000]] يعني استنى ثانية بس لكل رد):

~~~text الناتج
Request timed out.
Request timed out.

Ping statistics for 10.255.255.1:
    Packets: Sent = 2, Received = 0, Lost = 2 (100% loss),
~~~

خلي بالك: سيرفرات كتير بتتجاهل ping عن قصد، فـ [[Request timed out]] مش دايمًا معناها إنه واقع.

> [[-n]] في لينكس معناها حاجة تانية خالص، والعدد هناك [[-c 4]]. و ping في لينكس مش بيقف لوحده.

---

## ٢. [[tracert google.com]]

~~~text الناتج
Tracing route to google.com [142.251.209.206]
over a maximum of 30 hops:

  1    12 ms    17 ms    46 ms  192.168.1.1 [192.168.1.1]
  2    21 ms    27 ms     5 ms  41.47.224.1
  3     4 ms     5 ms     5 ms  10.35.33.145 [10.35.33.145]
  4     8 ms    23 ms    38 ms  10.35.33.146 [10.35.33.146]
  5    12 ms     5 ms     9 ms  10.45.28.77 [10.45.28.77]
  6    16 ms     7 ms    11 ms  81.52.188.108
  7    68 ms   101 ms    56 ms  193.251.152.113
  8     *       48 ms     *     72.14.222.118
  9    60 ms    79 ms    56 ms  ncmrsa-am-in-f14.1e100.net [142.251.209.206]

Trace complete.
~~~

كل سطر اسمه **hop**: راوتر الباكت عدّى عليه في السكة.

| العمود | معناه |
|---|---|
| الرقم الأول | ترتيب الـ hop. [[1]] هو الراوتر بتاعك ([[192.168.1.1]]) |
| ٣ أوقات | tracert بيجرب كل hop ٣ مرات |
| [[*]] | المحاولة دي مرجعش ليها رد (الراوتر ده مش بيرد على كل المحاولات، والطريق كمّل عادي) |
| الآخر | عنوان الراوتر، واسمه لو ليه |

الـ hops اللي في النص راوترات شركة النت والشبكات اللي بعدها، و hop 9 هو سيرفر جوجل نفسه (نفس الـ IP اللي ping طلّعه). لو النت واقف، tracert بيوريك فين بالظبط: لو hop 1 نفسه مش بيرد، المشكلة في الراوتر أو الواي فاي عندك.

---

## ٣. [[nslookup example.com]]

~~~text الناتج
Server:  UnKnown
Address:  fe80::1

Non-authoritative answer:
Name:    example.com
Addresses:  2606:4700:10::ac42:93f3
	  2606:4700:10::6814:179a
	  104.20.23.154
	  172.66.147.243
~~~

| السطر | معناه |
|---|---|
| [[Server]] و [[Address]] الأولانيين | سيرفر الـ DNS اللي اتسأل (هنا الراوتر). [[UnKnown]] معناها إن الراوتر ملوش اسم، عادي |
| [[Non-authoritative answer]] | الرد جه من سيرفر وسيط عنده نسخة، مش من سيرفر الدومين الأصلي. عادي |
| [[Name]] | الدومين اللي سألت عليه |
| [[Addresses]] | الـ IPs بتاعته: ٢ IPv6 (اللي فيهم [[:]]) و ٢ IPv4 |

وظهر كمان سطر [[DNS request timed out.]]: nslookup بيحاول يعرف اسم سيرفر الـ DNS نفسه الأول، والراوتر مردّش، عشان كده كتب [[UnKnown]]. الرد الأساسي وصل عادي.

---

## الخلاصة

| عايز تعرف | اكتب | بص على |
|---|---|---|
| واصل ولا لأ | [[ping -n 4 google.com]] | [[Lost]] و [[time]] |
| المشكلة فين في السكة | [[tracert google.com]] | أول hop مش بيرد |
| الدومين على أنهي IP | [[nslookup example.com]] | [[Address]] تحت [[Name]] |

المقابل في لينكس: [[ping -c 4]] و [[traceroute]] و [[dig]].`,
          lines: [
            "ping ٤ مرات ([[-n]] هنا عدد المرات، مش زي لينكس).",
            "الطريق لحد جوجل (زي traceroute).",
            "الدومين بيشاور على أنهي IP (زي dig)."
          ],
          sol: R`[[nslookup yourdomain.com]] بيطبع الأول [[Server:]] و [[Address:]] بتوع الـ DNS اللي سألته (غالبًا الراوتر، ولو اسمه طلع [[UnKnown]] ده عادي: معناه إن الراوتر ملوش اسم في الـ DNS)، وبعدين [[Non-authoritative answer:]] وتحته [[Name:]] و [[Address:]] (أو [[Addresses:]] لو الدومين ليه أكتر من IP). الـ Address الأخيرة لازم تبقى IP السيرفر بتاعك.

لو IP تاني: إما الـ A record غلط، أو غيّرته قريب والكاش لسه قديم (استنى أو [[ipconfig /flushdns]])، أو الدومين ورا Cloudflare بالسحابة البرتقالي، فهتشوف IPs بتوع Cloudflare وده طبيعي. ولو [[Non-existent domain]] يبقى الـ record مش موجود أصلًا.`
        },
        {
          cmd: "systeminfo / whoami",
          title: "معلومات الجهاز",
          desc: R`[[systeminfo]] بيطلع تقرير كامل عن الجهاز: اسم الجهاز، ونسخة ويندوز ورقم الـ build، والرام الكلية والفاضية، وتاريخ التسطيب، وآخر مرة اشتغل فيها (System Boot Time)، والتحديثات المتسطبة. بياخد ثواني قبل ما يطبع، وده طبيعي.

[[whoami]] بيقولك انت داخل بأنهي يوزر، بالشكل [[اسم-الجهاز\اسم-اليوزر]] (أو الدومين لو جهاز شركة)، و [[whoami /groups]] أو [[/priv]] بيوريك صلاحياتك. و [[hostname]] بيطبع اسم الجهاز بس، وده نفس أمر لينكس.

عشان تاخد سطور معينة من التقرير الطويل: [[systeminfo | findstr /B /C:"OS Name" /C:"Total Physical Memory"]]، و [[/B]] يعني السطر لازم يبدأ بالكلام ده. بس لو ويندوزك بالعربي أسامي السطور هتبقى بالعربي فالفلتر ده مش هيلاقي حاجة.`,
          example: R`systeminfo
whoami
hostname`,
          try: "اعرف نسخة الويندوز والرام من systeminfo.",
          deep: {
            why: R`استلمت جهاز جديد أو VM، أو حد طالب منك مواصفات جهازك عشان مشكلة، أو عايز تتأكد انت شغال بأنهي يوزر وبصلاحيات إيه قبل ما تعمل حاجة محتاجة أدمن.`,
            how: R`[[systeminfo]] معلومات كاملة: اسم الجهاز، وويندوز version، والـ RAM، والـ CPU. ممكن يأخد ثانية.

[[whoami]] اسم المستخدم الحالي (DOMAIN\username). [[whoami /all]] كل الـ groups والـ privileges.

[[whoami /priv]] بيوريك الصلاحيات: هل Administrator؟ وفيه حاجات معينة مفعّلة ولأ.`,
            when: "استلام جهاز جديد أو VM. التأكد إنك Admin. إرسال معلومات support.",
            mistakes: "[[systeminfo]] بطيء. لو محتاج معلومات محددة، استخدم [[ver]]، أو من PowerShell [[Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version]] (wmic اتشال من ويندوز 11 الجديد)."
          },
          teach: R`## الفكرة

٣ أوامر بتعرّفك انت فين: [[systeminfo]] تقرير كامل عن الجهاز، و [[whoami]] انت داخل بأنهي يوزر، و [[hostname]] اسم الجهاز. اتجربوا في CMD على ويندوز 11 على لابتوب فيه 32GB RAM.

---

## ١. [[systeminfo]]

بياخد ثواني قبل ما يطبع (بيجمع معلومات من حتت كتير)، وبعدين بيطلع حوالي ٤٠ سطر. دي أهم السطور (شلت منها سطور فيها بيانات شخصية زي الإيميل ورقم الترخيص):

~~~text الناتج (جزء)
Host Name:                     ALI-PC
OS Name:                       Microsoft Windows 11 Home Single Language
OS Version:                    10.0.26300 N/A Build 26300
Original Install Date:         2/28/2026, 1:45:48 AM
System Boot Time:              10/6/2026, 9:23:44 AM
System Manufacturer:           ASUSTeK COMPUTER INC.
System Type:                   x64-based PC
Processor(s):                  1 Processor(s) Installed.
Total Physical Memory:         32,175 MB
Available Physical Memory:     11,523 MB
Hotfix(s):                     9 Hotfix(s) Installed.
~~~

### نقرا السطور

| السطر | معناه |
|---|---|
| [[OS Name]] | نسخة ويندوز ونوعها (Home) |
| [[OS Version]] | [[10.0]] ثابتة حتى في ويندوز 11، والمهم رقم [[Build]]: من 22000 وطالع يعني ويندوز 11 |
| [[Original Install Date]] | ويندوز اتسطب امتى |
| [[System Boot Time]] | آخر مرة الجهاز اشتغل (من هنا تعرف لو «Restart» حصل فعلًا) |
| [[System Type]] | [[x64]] يعني 64-bit |
| [[Total Physical Memory]] | الـ RAM كلها بالميجا: 32,175 MB يعني حوالي 31.4 جيجا (بنقسم على 1024) |
| [[Available Physical Memory]] | الفاضي منها دلوقتي |
| [[Hotfix(s)]] | عدد تحديثات ويندوز المتسطبة، وتحته رقم كل واحد ([[KB...]]) |

### سطور معينة بس

~~~cmd
systeminfo | findstr /B /C:"OS Name" /C:"Total Physical"
~~~

~~~text الناتج
OS Name:                       Microsoft Windows 11 Home Single Language
Total Physical Memory:         32,175 MB
~~~

- [[/C:"..."]] دوّر على الكلام ده زي ما هو بالمسافة، وينفع تكررها كذا مرة.
- [[/B]] (من beginning) السطر لازم **يبدأ** بالكلام ده. ليه؟ جربت [[systeminfo | findstr /C:"OS Version"]] من غير [[/B]]، فطلع سطرين: [[OS Version: 10.0.26300 ...]] وكمان [[BIOS Version: American Megatrends ...]]، لأن كلمة BIOS Version فيها [[OS Version]] في نصها. ومع [[/B]] طلع السطر الأول بس.

> لو ويندوزك بالعربي، أسامي السطور هتطلع بالعربي، والفلتر بالإنجليزي مش هيلاقي حاجة.

---

## ٢. [[whoami]]

~~~cmd
whoami
~~~

~~~text الناتج
ali-pc\ali
~~~

الشكل [[اسم-الجهاز\اسم-اليوزر]]، بحروف سمول. الجزء الأول هنا اسم الجهاز لأنه يوزر محلي، ولو جهاز شركة متوصل بـ domain بيبقى اسم الدومين.

---

## ٣. [[hostname]]

~~~cmd
hostname
~~~

~~~text الناتج
Dexter
~~~

اسم الجهاز بس، بالحروف زي ما اتكتب. ([[systeminfo]] كتبه [[ALI-PC]] كابيتال، و [[whoami]] كتبه سمول، والتلاتة نفس الاسم.) و [[hostname]] نفس الأمر في لينكس والماك.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقرير كامل | [[systeminfo]] |
| نسخة ويندوز والـ RAM بس | [[systeminfo | findstr /B /C:"OS Name" /C:"Total Physical"]] |
| رقم النسخة بسرعة | [[ver]] (طبع سطر فيه [[Microsoft Windows]] ورقم النسخة [[10.0.26300.9550]]) |
| انا مين | [[whoami]] |
| صلاحياتي | [[whoami /groups]] أو [[whoami /priv]] |
| اسم الجهاز | [[hostname]] |`,
          lines: ["كل معلومات الجهاز والنظام (بياخد ثواني).", "انت مين.", "اسم الجهاز."],
          sol: R`الأسرع: [[systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"Total Physical Memory"]]. هيطلع زي [[OS Name: Microsoft Windows 11 Pro]] و [[OS Version: 10.0.26100 N/A Build 26100]] و [[Total Physical Memory: 16,097 MB]].

متتلخبطش إن ويندوز 11 مكتوب نسخته 10.0: رقم الـ Build من 22000 وطالع يعني ويندوز 11. و systeminfo بياخد ثواني قبل ما يطبع، ده طبيعي. ولو ويندوزك عربي الـ labels هتبقى بالعربي، فـ findstr بالإنجليزي مش هيلاقي حاجة، شغّله من غير فلتر ودوّر بعينك.`
        }
      ]
    }
]);
