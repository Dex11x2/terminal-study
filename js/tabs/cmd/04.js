// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "العمليات",
      l: 2,
      n: "",
      time: R`حوالي نص ساعة`,
      goal: [R`تعرف إيه اللي شغال على الجهاز، وتقفل برنامج معلّق.`, R`تعرف مين ماسك بورت معين.`, R`تفتح برامج وملفات من CMD.`],
      use: { prog: R`«Port 3000 is already in use» — [[netstat -ano | findstr :3000]] وبعدين [[taskkill /pid]].`, work: R`برنامج معلّق على سيرفر من غير واجهة.` },
      lab: R`mkdir %TEMP%\cmdlab & cd /d %TEMP%\cmdlab`,
      projects: [
        { lvl: 'صغير', t: R`مين ماسك البورت؟`, what: R`[[who-port.bat PORT]]: شغّل سيرفر على بورت (مثلًا [[python -m http.server 8000]])، والسكربت يلاقي سطر [[LISTENING]] بتاعه بالظبط ([[findstr /r /c:":%1 .*LISTENING"]]) ويطبع الـ PID واسم البرنامج من [[tasklist /fi "pid eq ..." /fo csv /nh]]. من درسين «netstat -ano» و «tasklist / taskkill».`, done: R`على بورت السيرفر بيطبع سطر زي [[port 8000  pid 8216  python.exe]]، وعلى بورت فاضي [[nobody listens on 4322]] بكود [[1]]، ومن غير بورت [[usage: who-port PORT]] بكود [[2]]. وسيرفر تاني على [[80001]] أو [[18000]] مبيظهرش.` },
        { lvl: 'صغير', t: R`زرار «افتح شغلي»`, what: R`[[open-work.bat]] بتدوس عليه الصبح: يفتح فولدر المشروع في Explorer بـ [[start "" "%~dp0"]]، وملف [[notes.txt]] بـ [[start "" notepad notes.txt]]، ولينك الـ dashboard في المتصفح، ونافذة CMD عنوانها [[DEV]] في فولدر المشروع بـ [[start "DEV" /d "%~dp0" cmd /k]]. من درس «start».`, done: R`دبل كليك واحد بيفتح الأربع حاجات، ونافذة السكربت نفسها بتقفل لوحدها (لأن [[start]] مبيستناش)، ولو المسار فيه مسافة ([[C:\my projects\shop]]) كله بيفتح برضه.` },
        { lvl: 'متوسط', t: R`اقفل السيرفر القديم بأمان`, what: R`[[kill-port.bat PORT]]: بيعرض الـ PID واسم البرنامج الأول، ويسألك [[choice /c yn]] قبل ما يقفل، ويقفل بـ [[/T /F]] بس الـ PIDs اللي في سطور [[LISTENING]] (ويتخطى [[0]] و [[4]])، وبعدها يتأكد إن البورت فضي. ومع [[/yes]] من غير سؤال للسكربتات. من دروس «netstat -ano» و «tasklist / taskkill».`, done: R`لو قلت [[n]] مبيقفلش حاجة ويخرج بكود [[1]]. لو [[y]] بيطبع [[SUCCESS: ...]] وبعدها [[port 8000 is free]]. وعلى بورت فاضي بيقول كده ومبيندهش [[taskkill]] خالص، ومستحيل يحاول يقفل PID صفر (جرّبه على عينة [[net.txt]] فيها [[TIME_WAIT 0]]).` },
        { lvl: 'متوسط', t: R`مين بيفتح الملفات دي؟`, what: R`[[who-opens.bat]] بياخد لستة امتدادات ([[.txt .bat .js .vbs .html .pdf]]) ولكل واحد يطبع [[assoc]] وبعده [[ftype]] للنوع، ويعلّم بـ [[DANGER]] أي نوع أمر الفتح بتاعه [["%1" %*]] أو فيه [[WScript]]، ويطبع [[no association]] للمش مربوط. من درس «assoc / ftype».`, done: R`[[.bat]] و [[.js]] و [[.vbs]] متعلّم عليهم [[DANGER]]، و [[.txt]] بيقول [[txtfilelegacy]] ومعاه ملاحظة إن الـ UserChoice ممكن يكون غيره، وامتداد زي [[.nosuch]] بيطبع [[no association]] من غير ما السكربت يقف.` },
        { lvl: 'كبير', t: R`مشغّل بيئة التطوير`, what: R`[[dev-up.bat]] و [[dev-down.bat]] لمشروع فيه API وواجهة. [[dev-up]]: يتأكد إن البورتين فاضيين (ولو مشغولين بنفس المشروع يقول «شغال أصلًا» ويخرج بـ [[0]])، ويشغّل كل واحد في نافذة باسمها بـ [[start "API" cmd /k ...]]، ويستنى في loop لحد ما كل بورت يبقى [[LISTENING]] بحد أقصى ٣٠ ثانية، ويحفظ الـ PIDs في [[dev.pids]]، ويكتب كل خطوة بالوقت في [[dev.log]]، وفي الآخر يفتح المتصفح. [[dev-down]]: يقرا [[dev.pids]] ويقفل بـ [[/T /F]] ويمسح الملف. من كل دروس الوحدة.`, done: R`[[dev-up]] مرتين ورا بعض: التانية بتقول «شغال أصلًا» ومش بتفتح نوافذ زيادة. لو الـ API وقع وهو بيقوم، بعد ٣٠ ثانية بيطبع [[API did not start in 30s]] ويخرج بكود غير صفر ومش بيفتح المتصفح. [[dev-down]] بيسيب البورتين فاضيين، وتشغيله مرتين التانية بتقول «مفيش حاجة شغالة». و [[dev.log]] فيه سطر بالوقت لكل خطوة.`, ext: R`زوّد [[dev-status.bat]] بيطبع كل خدمة شغالة ولا لأ والرام بتاعتها من [[tasklist /fi "pid eq ..."]]، وخلّي الخدمات وبورتاتها في ملف [[services.txt]] بدل ما تكون مكتوبة في السكربت.` },
        { lvl: 'فكرة', t: R`مدير عمليات بالكيبورد`, what: R`قايمة في CMD بـ [[choice]]: ١ اعرض أكبر العمليات في الرام ([[/fi "memusage gt ..."]])، ٢ دوّر باسم، ٣ مين على بورت، ٤ اقفل بـ PID بعد تأكيد، ٥ البرامج المعلّقة ([[/fi "status eq not responding"]]). انت اللي تقرر الشكل والترتيب.`, done: R`كل اختيار بيرجعك للقايمة، وأي إدخال غلط (اسم مش موجود، PID مش رقم) بيطبع رسالة ومبيقفلش السكربت، ومفيش ولا خيار بيقفل حاجة من غير ما يسألك.`, ext: R`زوّد لوج لكل عملية اتقفلت (مين وإمتى)، وخيار «صدّر اللستة CSV» بـ [[/fo csv]]، وبعدين اكتب نفس الأداة في PowerShell وقارن عدد السطور.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل: [[taskkill /PID 99999]] وبعده [[echo %errorlevel%]]، وبعدين [[taskkill /IM nosuchprog.exe /F]] وبعده [[echo %errorlevel%]]. هيطبعوا إيه؟`, done: R`الاتنين طبعوا [[ERROR: The process "99999" not found.]] (والتاني باسم البرنامج) و [[errorlevel]] = [[128]] في الحالتين. يعني «مش موجود» ليه رقم خاص بيه، وسكربتك يقدر يفرّق بينه وبين «اتقفل» ([[0]]).` },
            { lvl: 'سريع', t: R`**قارن وقيس:** عايز تعرف في سكربت «البرنامج ده شغال؟». قارن [[tasklist /fi "imagename eq nosuchprog.exe"]] بـ [[tasklist | findstr /i nosuchprog]]، وبعد كل واحد [[echo %errorlevel%]]، وبعدين زوّد على الأول [[| find /c /v ""]].`, done: R`الأول طبع [[INFO: No tasks are running which match the specified criteria.]] و [[errorlevel]] [[0]]، والسطر ده على الـ stdout ([[find /c]] عدّه [[1]])، فمينفعش تبني عليه [[if errorlevel]]. التاني مطبعش حاجة و [[errorlevel]] [[1]]: ده اللي تستخدمه في [[&&]] و [[||]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** كام نسخة [[svchost.exe]] شغالة عندك؟ وكام عملية واكلة أكتر من ٤٠٠ ميجا؟ استخدم [[tasklist /fo csv /nh /fi "imagename eq svchost.exe" | find /c /v ""]] و [[/fi "memusage gt 400000"]] (الرقم بالكيلوبايت).`, done: R`طلعلك رقمين (على جهاز التجربة [[106]] نسخة svchost و [[9]] عمليات فوق ٤٠٠ ميجا). وفهمت ليه [[/fo csv /nh]]: كل عملية سطر واحد من غير الهيدر والخط اللي تحته، فالعدّ بيطلع صح من غير ما تطرح حاجة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شغّلت [[start "" /b ping -n 30 127.0.0.1 >nul]] وجبت الـ PID بتاعه من [[tasklist]]، و [[taskkill /PID <الرقم>]] رفض. اقرا الرسالة وصلّح.`, done: R`الرسالة [[ERROR: The process with PID 27504 could not be terminated.]] وتحتها [[Reason: This process can only be terminated forcefully (with /F option).]] و [[errorlevel]] [[1]]: برنامج كونسول من غير نافذة مبيستقبلش «اقفل نفسك». [[taskkill /PID <الرقم> /F]] طبع [[SUCCESS: The process with PID ... has been terminated.]] و [[errorlevel]] [[0]].` },
            { lvl: 'تحدي', t: R`**ابني:** [[kill-ping.bat]]: بيشغّل [[ping -n 30 127.0.0.1]] في الخلفية بـ [[start "" /b]]، ويجيب رقمه بـ [[for /f "tokens=2 delims=," %%p in ('tasklist /fi "imagename eq PING.EXE" /fo csv /nh')]]، ويقفله بـ [[/F]]، ويتأكد إنه اتقفل بـ [[tasklist /fi "pid eq %pid%" /nh]]. ولو لقى أكتر من ping شغال قبل ما يبدأ، يرفض ويخرج بكود [[2]] بدل ما يقفل حاجة مش بتاعته.`, done: R`التشغيل طبع [[found pid=2520]] وبعدها [[SUCCESS: The process with PID 2520 has been terminated.]] وبعدها [[INFO: No tasks are running which match the specified criteria.]]. ولما شغلته تاني طلع PID جديد واشتغل عادي. ولو فيه ping تاني شغال قبله بيطبع رسالة ويخرج بـ [[2]] (اتأكد بـ [[echo %errorlevel%]]).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[tasklist /?]] و [[taskkill /?]] من غير ما تبص في الدرس: إزاي تعرض الخدمات اللي جوه كل [[svchost]]؟ وإزاي تلاقي البرامج المعلّقة؟ وهل [[taskkill]] بيقبل [[/fi]]؟ وبعدين جرّب [[taskkill /PID 0 /F]] واقرا الرد.`, done: R`[[tasklist /svc]] (بيضيف عمود [[Services]]، و [[tasklist /svc /fi "pid eq 4"]] طبع [[System]] قدامه [[N/A]])، و [[/fi "status eq not responding"]]، وأيوه [[taskkill /f /fi "pid eq 1234"]]. و PID صفر رد [[ERROR: The process with PID 0 could not be terminated.]] و [[Reason: This is critical system process. Taskkill cannot end this process.]]: ويندوز بيحمي العمليات دي حتى من [[/F]].` },
          ],
          deep: {
            why: R`برنامج معلّق، أو سيرفر node قديم لسه ماسك البورت، أو عايز تعرف مين بياكل الرام. زي ps و kill في bash.`,
            how: R`[[tasklist]] بيعرض كل العمليات. [[tasklist /fi "imagename eq node.exe"]] بيفلتر بالاسم من غير findstr، و [[/fi "pid eq 1234"]] بالرقم، و [[/fo csv]] بيطلّع الناتج CSV لو هتقراه في سكربت أو Excel.

[[taskkill /IM node.exe]] من غير [[/F]] بيبعت للبرنامج طلب إنه يقفل نفسه، والبرنامج ممكن يتجاهله. [[/F]] بيقفله غصب فورًا. [[/PID 1234]] بالرقم بدل الاسم، و [[/T]] بيقفل العمليات اللي هو شغّلها كمان.

[[tasklist | findstr /i node]] أسرع طريقة تشوف بيها لو فيه حاجة شغالة بالاسم ده.`,
            when: R`برنامج معلّق مش بيرد ومش بيقفل من الـ X، أو سيرفر node قديم لسه ماسك البورت ([[EADDRINUSE]])، أو عايز تعرف أنهي برنامج واكل الرام، أو سكربت محتاج يقفل برنامج قبل ما يحدّثه أو يمسح ملفاته.`,
            mistakes: R`[[taskkill /IM node]] من غير [[.exe]] بيقول [[not found]]، فاكتب الاسم بالامتداد زي ما ظاهر في tasklist. و [[/IM node.exe /F]] بيقفل **كل** نسخ node، ومنها سيرفرات تانية وأدوات شغالة عليه، فلو عايز واحدة بس استخدم [[/PID]]. و [[/F]] بيقفل من غير حفظ، فمتستخدمهاش على محرر فيه شغل مش متحفظ.`
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
            R`بيعرض كل البرامج الشغالة دلوقتي في جدول: اسم البرنامج ([[Image Name]]) ورقمه ([[PID]]) والرام اللي واخدها ([[Mem Usage]]). زي [[ps]] في bash. الـ PID ده اللي هتستخدمه بعدين في [[taskkill /PID]].`,
            R`[[|]] بيبعت الجدول لـ [[findstr]] اللي بيسيب بس السطور اللي فيها [[node]]، فتشوف كل نسخ [[node.exe]] وأرقامها. [[findstr]] بيفرّق بين الكابيتال والسمول، فلو مش متأكد اكتب [[findstr /i node]]. ولو مطلعش ولا سطر يبقى مفيش node شغال.`,
            R`[[/IM]] (image name) بيقفل **كل** العمليات اللي بالاسم ده مرة واحدة، و [[/F]] (force) بيقفلها غصب من غير ما يستناها تقفل نفسها، فأي حاجة مش متحفظة فيها بتضيع. والاسم لازم بالامتداد: [[taskkill /IM node]] بيطلع [[not found]].`,
            R`[[/PID]] بيقفل عملية واحدة برقمها بدل كل اللي بنفس الاسم، وده أأمن لما يكون عندك كذا node شغالين. و [[/T]] (tree) بيقفل كمان العمليات اللي هي شغّلتها، زي node اللي [[npm run dev]] شغّله تحته. و [[1234]] مثال: حط الرقم اللي طلعلك.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اعمل ملف [[net.txt]] فيه ناتج netstat ده (سطر لكل اتصال): [[0.0.0.0:3000 LISTENING 8216]] و [[0.0.0.0:30001 LISTENING 9120]] و [[127.0.0.1:59370 → 127.0.0.1:3000 TIME_WAIT 0]] و [[[::]:3000 LISTENING 8216]] (بنفس أعمدة netstat). قبل ما تشغّل: [[findstr :3000 net.txt]] هيطبع كام سطر؟ وبعدين [[findstr /r /c:":3000 .*LISTENING" net.txt]]؟`, done: R`الأول طبع ٤ سطور، ومنهم سيرفر تاني خالص على [[30001]] واتصال [[TIME_WAIT]]. التاني طبع سطرين بس، الاتنين [[LISTENING]] ورقمهم [[8216]] (IPv4 و IPv6 لنفس السيرفر). المسافة بعد [[:3000]] في الـ regex هي اللي شالت [[30001]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سكربت «اقفل اللي على 3000»: [[for /f "tokens=5" %%p in ('netstat -ano ^| findstr :3000') do taskkill /PID %%p /F]]. جرّبه على [[net.txt]] بـ [[echo would kill %%p]] بدل [[taskkill]] (و [[findstr :3000 net.txt]] بدل netstat). هيقفل مين؟`, done: R`طبع [[would kill 8216]] و [[would kill 9120]] و [[would kill 0]] و [[would kill 8216]]: كان هيقفل سيرفر تاني بريء على 30001، ويحاول يقفل PID صفر ([[taskkill /PID 0 /F]] بيرد [[ERROR: The process with PID 0 could not be terminated.]]). بعد التصليح بـ [[findstr /r /c:":3000 .*LISTENING"]] طبع [[8216]] بس (مرتين، فمش مشكلة).` },
            { lvl: 'سريع', t: R`**قارن وقيس:** شغّل [[netstat -an]] مرة و [[netstat -a]] (من غير [[-n]]) مرة، واحسب الوقت (مثلًا [[echo %time%]] قبل وبعد، أو [[Measure-Command]] من PowerShell).`, done: R`على جهاز التجربة [[-an]] خلص في حوالي [[39]] ميلي ثانية و [[-a]] أخد حوالي [[236]] ثانية (قرب ٤ دقايق)، لأنه بيسأل الـ DNS عن اسم كل عنوان. فـ [[-n]] مش رفاهية: من غيرها الأمر بيبان إنه معلّق.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[who-port.bat PORT]]: بيدوّر على سطر [[LISTENING]] للبورت ده بس، ولكل واحد يطبع الـ PID واسم البرنامج من [[tasklist /fi "pid eq ..." /fo csv /nh]]. من غير بورت يطبع طريقة الاستخدام ويخرج بـ [[2]]، ولو محدش ماسكه يقول كده ويخرج بـ [[1]].`, done: R`[[call who-port.bat]] طبع [[usage: who-port PORT]] و [[errorlevel]] [[2]]، و [[call who-port.bat 4322]] (بورت فاضي) طبع [[nobody listens on 4322]] و [[errorlevel]] [[1]]، وعلى سيرفر شغال بيطبع سطر زي [[port 3000  pid 8216  node.exe]] (سطرين لو سامع على IPv4 و IPv6).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[netstat /?]]: أنهي option بيرتّب العمليات حسب عدد البورتات اللي ماسكاها؟ وأنهي واحد بيطبع اسم البرنامج بدل ما تروح لـ tasklist؟ جرّب التاني من CMD عادي.`, done: R`[[-c]] بيطبع جدول [[Port Consumption]] بأعمدة [[Proto]] و [[PID]] و [[NumberOfPorts]]. و [[-b]] من CMD عادي رد [[The requested operation requires elevation.]] و [[errorlevel]] [[1]]، فاسم البرنامج يا إما من نافذة أدمن يا إما من [[tasklist /fi "pid eq ..."]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك شاف [[TCP 127.0.0.1:59370 127.0.0.1:3000 TIME_WAIT 0]] وعايز يقفل PID صفر عشان «ده اللي ماسك البورت». اكتبله ٣ سطور: إيه الاتصال ده، وليه PID صفر، وهو المفروض يعمل إيه.`, done: R`السطور فيها: ده اتصال قديم خلص (البورت [[3000]] في العمود البعيد مش المحلي)، وPID صفر معناه ملوش صاحب والنظام بيستنى شوية قبل ما ينساه، والمطلوب سطر [[LISTENING]] اللي فيه [[:3000]] في العمود الأول بس.` },
          ],
          deep: {
            why: R`السيرفر مش راضي يقوم ويقول EADDRINUSE أو port 3000 in use. netstat بيوريك أنهي برنامج (برقمه) ماسك البورت، وبعدها taskkill يقفله. زي [[ss -tlnp]] في لينكس.`,
            how: R`[[-a]] كل الاتصالات والبورتات اللي بتسمع، و [[-n]] أرقام بدل أسامي (أسرع بكتير)، و [[-o]] رقم العملية (PID). الناتج أعمدة: البروتوكول، والعنوان المحلي ([[0.0.0.0:3000]] يعني بيسمع على كل الكروت)، والعنوان البعيد، والحالة ([[LISTENING]] أو [[ESTABLISHED]] أو [[TIME_WAIT]])، وآخر حاجة الـ PID.

للدور على بورت معين: [[netstat -ano | findstr :3000]].

بعدين [[tasklist /fi "pid eq 1234"]] تعرف البرنامج إيه قبل ما تقفله.

[[netstat -ano | findstr LISTENING]] البورتات اللي فيها حد بيسمع بس. ولو عايز اسم البرنامج على طول: [[netstat -anob]] من CMD أدمن.`,
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
            R`[[-a]] كل الاتصالات والبورتات اللي بتسمع، و [[-n]] أرقام بدل أسامي (أسرع)، و [[-o]] رقم العملية (PID) في آخر عمود. و [[findstr :3000]] بيسيب السطور اللي فيها البورت ده بس، والنقطتين قبل الرقم عشان ميجيبش [[13000]] (بس ممكن لسه يجيب [[30001]]). السطر اللي حالته [[LISTENING]] هو اللي ماسك البورت.`,
            R`[[/PID]] بالرقم اللي طلع في آخر عمود (هنا [[1234]] مثال)، و [[/F]] يقفله غصب. بعدها شغّل [[netstat -ano | findstr :3000]] تاني: لو مفيش [[LISTENING]] يبقى البورت فضي وتقدر تشغّل السيرفر.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في ملف [[.bat]]: [[ver >nul]] (عشان errorlevel يبقى صفر)، وبعدين [[start "" /b cmd /c exit 7]] و [[echo %errorlevel%]]، وبعدين نفس السطر بـ [[/wait]]. الرقمين هيبقوا كام؟`, done: R`من غير [[/wait]] طبع [[0]]: [[start]] نجح إنه **يشغّل**، ومستناش يعرف النتيجة. مع [[/wait]] طبع [[7]]. فلو سكربتك بيقرر على نتيجة أمر، لازم [[/wait]] (أو [[call]] لو ملف batch).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** زميلك كتب في سكربت [[start "C:\my tools\app.exe"]] والبرنامج مبيفتحش، وبتفتح بداله نافذة CMD فاضية. صلّح السطر، واكتب ليه.`, done: R`السطر بقى [[start "" "C:\my tools\app.exe"]]، والسبب مكتوب: أول حاجة بين علامات تنصيص [[start]] بياخدها عنوان النافذة. (السلوك ده من توثيق [[start]] على Microsoft Learn، والدرس مجرّبهوش عشان مبيفتحش نوافذ على الجهاز.)` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[start /?]] لاقي الـ option اللي بيحدد الفولدر اللي البرنامج يشتغل منه، وجرّبه: [[start "" /b /wait /d "%TEMP%" cmd /c cd]]. وبعدين جرّبه بفولدر مش موجود.`, done: R`[[/d]]: طبع مسار الـ TEMP بتاعك (زي [[C:\Users\ali\AppData\Local\Temp]]) مع إن السكربت نفسه في فولدر تاني. والفولدر المش موجود طبع [[The current directory is invalid.]] و [[errorlevel]] مش صفر. ولقيت كمان [[/min]] و [[/max]] و [[/low]] و [[/high]] للأولوية.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** [[dev.bat]] بيشغّل «سيرفر» بياخد ٢ ثانية يقوم: [[start "" /b cmd /c "ping -n 3 127.0.0.1 >nul & echo server ready"]]، والسطر اللي بعده [[echo opening browser]] (مكان [[start http://localhost:3000]]). شغّله واكتب الترتيب.`, done: R`اتطبع [[opening browser]] الأول وبعده بثانيتين [[server ready]]: المتصفح كان هيفتح على سيرفر لسه مقامش (والصفحة تقول refused). فهمت إن [[start]] مبيستناش، والحل إنك تستنى لحد ما السيرفر يرد (loop بـ [[curl.exe -s]] أو [[ping -n 2]] كـ sleep) قبل ما تفتح المتصفح.` },
            { lvl: 'تحدي', t: R`**ابني:** [[par.bat]] بيشغّل ٣ شغلانات بالتوازي بـ [[start "" /b cmd /c "ping -n 4 127.0.0.1 >nul & echo ok>job%%j.done"]] جوه [[for %%j in (1 2 3)]]، ويستنى في loop لحد ما الـ ٣ ملفات [[job*.done]] يبقوا موجودين، ويطبع وقت البداية والنهاية، ويمسح الملفات في الآخر.`, done: R`طبع [[all 3 jobs done  start=18:47:35.04 end=18:47:38.14]]: حوالي ٣ ثواني، مش ٩ (كل شغلانة ٣ ثواني لوحدها). ولو شغلته مرتين ورا بعض بيشتغل عادي لأنه بيمسح [[job*.done]] في الأول والآخر.` },
          ],
          deep: {
            why: R`سكربت عايز يفتح المتصفح على localhost بعد ما السيرفر يقوم، أو يفتح فولدر الناتج في Explorer، أو يشغّل سيرفر في نافذة لوحده ويكمّل. start بيعمل كل ده ومش بيستنى البرنامج يخلص. زي xdg-open في لينكس و open في الماك.`,
            how: R`[[start .]] يفتح Explorer على الفولدر الحالي. [[start http://localhost:3000]] يفتح المتصفح. [[start "" "file.pdf"]] يفتح أي ملف بالبرنامج المرتبط بامتداده. [[start "" "C:\path\program.exe"]] يشغّل برنامج.

أول حاجة بين تنصيص هي عنوان النافذة، فلو المسار متنصّص لازم [[""]] قبله.

[[start]] مش بيستنى: CMD بيكمّل على طول. لو عايزه يستنى البرنامج يقفل: [[start /wait]]. و [[start "API" cmd /k npm run dev]] بيفتح نافذة CMD جديدة عنوانها API فيها السيرفر، وانت تكمّل في نافذتك.

[[start /b command]] يشغّل في نفس النافذة من غير نافذة جديدة ومن غير ما يستنى.`,
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
            R`[[.]] معناها الفولدر الحالي، و [[start]] بيفتحه بالبرنامج الافتراضي للفولدرات، يعني File Explorer. مفيد لما تكون في الترمنال وعايز تسحب ملف أو تشوف الصور اللي في الفولدر.`,
            R`بيشغّل Notepad في نافذة لوحده، و CMD بيرجعلك على طول من غير ما يستنى تقفله. [[start]] بيلاقي البرنامج من الـ PATH، وكمان من «App Paths» في الـ registry، وده سبب إن [[start msedge]] بيشتغل حتى لو [[msedge]] لوحدها بتقول [[is not recognized]].`,
            R`لما تدّيله لينك، [[start]] بيفتحه في المتصفح الافتراضي. مفيد في سكربت بعد ما السيرفر يقوم: [[start http://localhost:3000]]. ولو اللينك فيه [[&]] لازم تنصيص، ومعاه [[""]] للعنوان: [[start "" "https://site.com/?a=1&b=2"]].`,
            R`افتح برنامج مساره فيه مسافات. الـ [[""]] الفاضية لازمة: أول حاجة بين علامات تنصيص start بيعتبرها عنوان النافذة، فمن غيرها هيفتح نافذة CMD فاضية عنوانها المسار ومش هيشغّل البرنامج.`,
          ],
          sol: R`[[start .]] بيفتح نافذة File Explorer على الفولدر اللي انت فيه، ومش بيطبع حاجة في CMD.

لو كتبت [[start "C:\my folder"]] بين علامات تنصيص، هتفتح نافذة CMD جديدة عنوانها «C:\my folder» بدل الفولدر، لأن أول حاجة بين علامات تنصيص بتتقري عنوان. الحل [[start "" "C:\my folder"]]، أو [[explorer .]].`
        },
        {
          cmd: "assoc / ftype",
          title: "مين بيفتح الملف ده؟",
          learn: R`تعرف الامتداد ده مربوط بأنهي «نوع ملف»، والنوع ده بيتفتح بأنهي أمر، وليه [[start file.txt]] أو دبل كليك على [[.js]] بيعمل حاجة غير اللي انت متوقعها.`,
          out: R`لما ملف يتفتح ببرنامج غلط (أو مبيتفتحش خالص)، تعرف تقرا الربط من CMD في ثانيتين بدل ما تخمّن، وتعرف إمتى الربط ده مش هو اللي بيحكم.`,
          use: {
            prog: R`دبل كليك على [[app.js]] بيطلّع error غريب بدل ما node يشغّله: [[assoc .js]] بيقولك إن [[.js]] مربوط بـ Windows Script Host مش node.`,
            work: R`سكربت batch بيعمل [[start report.csv]] والملف بيفتح في برنامج مش متسطّب عند زميلك. بتعرف الربط بـ [[assoc]] و [[ftype]] قبل ما تبعت السكربت.`,
            cs: R`ده نفس فكرة «MIME type ← برنامج» في المتصفح و [[xdg-mime]] في لينكس: طبقتين، الامتداد بيشاور على نوع، والنوع بيشاور على أمر.`,
          },
          desc: R`لما تدوس دبل كليك على ملف أو تكتب [[start file.txt]]، ويندوز بيمشي خطوتين: **الامتداد** ([[.txt]]) مربوط بـ **نوع ملف** (file type، زي [[txtfile]])، و**النوع** ده ليه **أمر فتح** (open command). [[assoc]] بيوريك الخطوة الأولى، و [[ftype]] بيوريك التانية.

[[assoc .bat]] طبع [[.bat=batfile]]، و [[ftype batfile]] طبع [[batfile="%1" %*]]: يعني شغّل الملف نفسه ([[%1]]) وابعتله كل الـ arguments ([[%*]]). و [[assoc .js]] طبع [[.js=JSFile]]، و [[ftype JSFile]] طبع [[JSFile=C:\Windows\System32\WScript.exe "%1" %*]]: فدبل كليك على [[app.js]] بيشغّله بـ Windows Script Host مش node.

[[assoc]] من غير حاجة بيطبع كل الروابط (على جهاز التجربة [[580]] سطر)، فبتفلترها بـ [[findstr /i /b /c:".zip="]]. والامتداد المش مربوط بيطبع [[File association not found for extension .nosuch]] و [[errorlevel]] [[1]]، والنوع المش موجود [[File type 'nosuchtype' not found or no open command associated with it.]] و [[errorlevel]] [[2]].

**الفخ الكبير:** [[assoc]] و [[ftype]] بيقروا الربط القديم بتاع النظام كله (الجزء اللي في [[HKLM\Software\Classes]]). أما البرنامج اللي **انت** اخترته من «Open with» أو من Settings فمتسجّل لكل يوزر في مكان تاني (اسمه UserChoice)، وده اللي بيكسب. عشان كده على ويندوز 11 [[assoc .txt]] طبع [[.txt=txtfilelegacy]] و [[ftype txtfilelegacy]] قال إن مفيش أمر فتح، ومع ذلك [[.txt]] بيتفتح عادي بـ Notepad الجديد.

والتغيير ([[assoc .ext=type]] و [[ftype type=command]]) محتاج CMD كأدمن وبيغيّر النظام كله، فمش متجرّب هنا: الشكل من توثيق Microsoft، وجرّبه في VM أو Windows Sandbox بس.`,
          example: R`assoc .txt
assoc .bat
ftype batfile
assoc | findstr /i /b /c:".js="
ftype JSFile
assoc .nosuch`,
          try: R`اعرف [[.bat]] و [[.cmd]] و [[.js]] و [[.vbs]] مربوطين بإيه، ولكل واحد اعرف أمر الفتح بـ [[ftype]]. أنهي واحد فيهم «خطر» لو حد بعتلك ملف بيه في إيميل؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[assoc .bat]] و [[ftype batfile]] و [[assoc .exe]] و [[ftype exefile]]. قبل ما تشغّل: إيه اللي جوه أمر الفتح بتاع ملف [[.exe]]؟`, done: R`[[.bat=batfile]] و [[batfile="%1" %*]] و [[.exe=exefile]] و [[exefile="%1" %*]]: الاتنين «شغّل الملف نفسه وابعتله الـ arguments». مفيش برنامج تاني بيفتحهم، وده الفرق بينهم وبين [[.txt]].` },
            { lvl: 'سريع', t: R`**قارن وقيس:** [[assoc .nosuch]] و [[ftype nosuchtype]]، وبعد كل واحد [[echo %errorlevel%]]. وبعدين [[assoc txt]] (من غير نقطة).`, done: R`[[File association not found for extension .nosuch]] بكود [[1]]، و [[File type 'nosuchtype' not found or no open command associated with it.]] بكود [[2]]، و [[assoc txt]] قال [[File association not found for extension txt]] بكود [[1]]: النقطة جزء من الاسم. والحروف مش فارقة: [[assoc .TXT]] طبع [[.TXT=txtfilelegacy]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** كام امتداد مربوط عندك؟ وكام نوع ليه أمر فتح؟ [[assoc | find /c "="]] و [[ftype | find /c "="]]. وبعدين لاقي كل الأنواع اللي بتفتح بـ notepad: [[ftype | findstr /i notepad]].`, done: R`طلعلك رقمين (على جهاز التجربة [[580]] و [[619]]: الأنواع أكتر من الامتدادات لأن فيه أنواع بتتستخدم من غير امتداد). وسطور notepad زي [[scriptletfile="C:\Windows\System32\NOTEPAD.EXE" "%1"]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عايز تعرف [[.md]] مربوط بإيه: [[assoc | findstr /i /b ".md"]]. طلعلك سطر لامتداد تاني خالص. ليه؟ وصلّح.`, done: R`[[findstr]] من غير [[/c:]] بيدوّر على [[.md]] في **أول** السطر، فطلّع كمان [[.mdp=...]] (أي امتداد بيبدأ بـ md). [[assoc | findstr /i /b /c:".md="]] بيدوّر على الامتداد بالظبط، ولو مش مربوط بيرجّع [[errorlevel]] [[1]] ومبيطبعش حاجة. أو أسهل: [[assoc .md]].` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[echo console.log("hi from node")> hello.js]]، وبعدين [[cscript //nologo hello.js]] (ده نفس Windows Script Host اللي [[JSFile]] مربوط بيه، بس بيطبع في الكونسول بدل نافذة)، وبعدين [[node hello.js]]. وبص على [[echo %PATHEXT%]].`, done: R`[[cscript]] طبع [[hello.js(1, 1) JavaScript runtime error: 'console' is undefined]]، و [[node]] طبع [[hi from node]]. و [[PATHEXT]] فيه [[.JS]]، يعني لو كتبت [[hello]] بس في الفولدر ده (أو دُست دبل كليك) هيشتغل بـ WScript مش node. عشان كده دايمًا اكتب [[node hello.js]] صريحة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** ليه [[assoc .txt]] بيقول [[txtfilelegacy]] و [[ftype txtfilelegacy]] بيقول مفيش أمر فتح، والملف بيفتح عادي؟ دوّر بـ [[reg query]] (قراية بس): [[reg query HKLM\Software\Classes\.txt /ve]] و [[reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.txt\UserChoice /v ProgId]].`, done: R`الأول طبع [[(Default)    REG_SZ    txtfilelegacy]] (ده اللي [[assoc]] بيقراه)، والتاني طبع [[ProgId    REG_SZ    AppX...]] (اختيار اليوزر لـ Notepad الجديد). فهمت إن [[assoc]] بيوريك ربط النظام القديم، والـ UserChoice هو اللي بيكسب، وده بيتغيّر من Settings ‹ Default apps مش من CMD.` },
          ],
          deep: {
            why: R`ملف بيتفتح ببرنامج غلط، أو [[start report.pdf]] في سكربت بيفتح حاجة غريبة على جهاز زميلك، أو حد بعتلك [[invoice.js]] وعايز تعرف الدبل كليك عليه هيعمل إيه قبل ما تجرّب. [[assoc]] و [[ftype]] بيردوا في ثانية، ومن غير ما تفتح Settings.`,
            how: R`ويندوز بيقرا الربط من الـ registry تحت [[Classes]]: مفتاح باسم الامتداد ([[.bat]]) قيمته الافتراضية اسم النوع ([[batfile]])، ومفتاح باسم النوع جواه [[shell\open\command]] فيه أمر الفتح. [[assoc]] بيقرا الأول و [[ftype]] بيقرا التاني، الاتنين أوامر جوه cmd.exe نفسه ([[where assoc]] قال [[INFO: Could not find "assoc".]]).

جوه أمر الفتح: [[%1]] اسم الملف اللي اتداس عليه، و [[%*]] كل الـ arguments. والـ help بيقول كمان إن [[%2]] أول parameter و [[%~2]] كل اللي من التاني وطالع.

اللي بيحصل لما تكتب [[hello]] من غير امتداد: CMD بيجرّب الامتدادات اللي في [[PATHEXT]] بالترتيب ([[.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;...]])، ولما يلاقي [[hello.js]] بيفتحه بالربط بتاعه. وفوق الربط القديم ده، ويندوز 8 وأحدث بيحفظ اختيار كل يوزر في UserChoice (تحت [[HKCU]]) بـ hash محمي، فمينفعش برنامج يغيّره من ورا ضهرك، ومينفعش [[assoc]] يغيّره.`,
            when: R`لما ملف بيتفتح غلط، أو قبل ما تكتب [[start file.ext]] في سكربت لحد تاني، أو وانت بتحقق في ملف مشبوه (إيه اللي هيشغّله؟). والتغيير بـ [[assoc]] و [[ftype]] بس في ماكينة بتجهزها كأدمن (VM أو صورة شركة)، مش على جهازك اليومي: اختيار البرنامج الافتراضي لنفسك من Settings.`,
            mistakes: R`تفتكر [[assoc .txt]] بيقولك البرنامج اللي هيفتح (هو بيقول الربط القديم، والـ UserChoice ممكن يكون غيره). تكتب [[assoc txt]] من غير نقطة فيقول مش موجود. تفلتر بـ [[findstr /b ".md"]] فيجيبلك [[.mdp]] كمان. تشغّل [[assoc .ext=]] (فاضية) فاكر إنها بتعرض، وهي **بتمسح** الربط (من الـ help: Specify nothing for the file type and the command will delete the association). أو تفتكر [[app.js]] هيشتغل بـ node لو دُست عليه.`
          },
          teach: R`## الفكرة

ويندوز بيعرف يفتح الملف بأنهي برنامج على خطوتين:

~~~text
.txt   ──assoc──▶   txtfile   ──ftype──▶   "C:\Windows\system32\NOTEPAD.EXE" %1
الامتداد            نوع الملف              أمر الفتح
~~~

[[assoc]] (من association) بيوريك الخطوة الأولى، و [[ftype]] (من file type) التانية. الاتنين أوامر جوه CMD (مش ملفات exe)، والقراية منهم آمنة ومش محتاجة أدمن. كل اللي تحت اتشغّل فعلًا في CMD عادي على ويندوز 11 (build 26300)، والتغيير بس من الوثائق.

---

## ١. [[assoc .txt]]

~~~cmd
assoc .txt
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
.txt=txtfilelegacy
~~~

الشكل [[امتداد=نوع]]. الحروف مش فارقة ([[assoc .TXT]] طبع [[.TXT=txtfilelegacy]])، بس النقطة لازم: [[assoc txt]] طبع [[File association not found for extension txt]].

الاسم [[txtfilelegacy]] غريب، وده أول دليل على الفخ اللي في الخطوة ٦.

---

## ٢. [[assoc .bat]] و [[ftype batfile]]

~~~cmd
assoc .bat
ftype batfile
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
.bat=batfile
batfile="%1" %*
~~~

نقرا أمر الفتح:

| الحتة | معناها |
|---|---|
| [["%1"]] | اسم الملف اللي اتداس عليه، بين علامات تنصيص عشان المسافات |
| [[%*]] | كل الـ arguments اللي اتبعتت بعده |

يعني «شغّل الملف نفسه». ونفس الكلام لـ [[.cmd=cmdfile]] و [[.exe=exefile]] و [[.com=comfile]]: كلهم [["%1" %*]]. دول الملفات اللي بتشتغل لوحدها، وعشان كده خطر تفتحها من إيميل.

---

## ٣. [[assoc]] كلها، وفلترها صح

~~~cmd
assoc | find /c "="
ftype | find /c "="
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
580
619
~~~

[[assoc]] من غير حاجة بيطبع كل الروابط، سطر لكل امتداد. فبتدوّر بـ [[findstr]]:

~~~cmd
assoc | findstr /i /b /c:".js="
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
.js=JSFile
~~~

| الحتة | ليه |
|---|---|
| [[/i]] | من غير فرق بين كابيتال وسمول |
| [[/b]] | السطر لازم **يبدأ** بيها |
| [[/c:".js="]] | النص بالظبط ومعاه [[=]]، عشان ميجيبش [[.jse]] أو [[.json]] |

من غير [[=]] الفلتر بيمسك أي امتداد بيبدأ بنفس الحروف: [[assoc | findstr /i /b ".md"]] طلّع امتداد [[.mdp]] لبرنامج تاني، مع إن [[.md]] نفسه مش مربوط خالص.

---

## ٤. [[ftype JSFile]]: الفخ بتاع [[.js]]

~~~cmd
ftype JSFile
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
JSFile=C:\Windows\System32\WScript.exe "%1" %*
~~~

[[.js]] مربوط بـ **Windows Script Host** (برنامج قديم من ويندوز بيشغّل JScript)، مش node. ولأن [[PATHEXT]] فيه [[.JS]]:

~~~text اتشغّل فعلًا: echo %PATHEXT%
.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL
~~~

فلو كتبت [[hello]] بس في فولدر فيه [[hello.js]]، أو دُست عليه دبل كليك، هيتفتح بـ WScript. جربت نفس المحرّك في الكونسول بـ [[cscript]] (أخو WScript اللي بيطبع في CMD بدل نافذة):

~~~cmd
echo console.log("hi from node")> hello.js
cscript //nologo hello.js
node hello.js
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
hello.js(1, 1) JavaScript runtime error: 'console' is undefined
hi from node
~~~

[[console]] مش موجود هناك لأنه مش node. الدرس: اكتب [[node hello.js]] دايمًا صريحة. ونفس الفكرة بتخلي [[.js]] و [[.vbs]] في مرفق إيميل خطر: دبل كليك = تشغيل.

---

## ٥. لو الحاجة مش موجودة

~~~cmd
assoc .nosuch
echo %errorlevel%
ftype nosuchtype
echo %errorlevel%
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
File association not found for extension .nosuch
1
File type 'nosuchtype' not found or no open command associated with it.
2
~~~

[[assoc]] بيرجّع [[1]] و [[ftype]] بيرجّع [[2]]، فتقدر تكتب في سكربت: [[assoc .pdf >nul 2>&1 || echo مفيش برنامج للـ PDF]].

---

## ٦. الفخ: [[assoc]] مش دايمًا هو اللي بيحكم

~~~cmd
ftype txtfilelegacy
ftype htmlfile
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe
File type 'txtfilelegacy' not found or no open command associated with it.
htmlfile="C:\Program Files\Internet Explorer\iexplore.exe" %1
~~~

يعني حسب [[assoc]] و [[ftype]]: [[.txt]] ملوش أمر فتح، و [[.html]] بيفتح بـ Internet Explorer. والحقيقة إن الاتنين بيتفتحوا بـ Notepad الجديد والمتصفح الافتراضي. ليه؟

[[assoc]] و [[ftype]] بيقروا ربط **النظام** القديم ([[HKLM\Software\Classes]]). أما البرنامج اللي اخترته انت من «Open with ‹ Always» أو من Settings فمتسجّل لكل يوزر في مفتاح اسمه **UserChoice**، وده اللي بيكسب. شفته بـ [[reg query]] (قراية بس):

~~~cmd
reg query HKLM\Software\Classes\.txt /ve
reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.txt\UserChoice /v ProgId
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe (الـ ProgId متقصّر)
HKEY_LOCAL_MACHINE\Software\Classes\.txt
    (Default)    REG_SZ    txtfilelegacy

HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.txt\UserChoice
    ProgId    REG_SZ    AppX...
~~~

وكمان: [[assoc .py]] قال [[File association not found for extension .py]] مع إن Python متسطّب على الجهاز، لأنه اتسطّب لليوزر بس مش للنظام كله. فـ [[assoc]] مفيد يقولك «فيه ربط قديم بيعمل إيه»، بس مش آخر كلمة.

---

## ٧. التغيير (من الوثائق، مش متجرّب)

| الأمر | بيعمل إيه |
|---|---|
| [[assoc .log=txtfile]] | يربط [[.log]] بنوع [[txtfile]] |
| [[ftype PyLab="C:\Python\python.exe" "%1" %*]] | يعمل نوع جديد بأمر فتح |
| [[assoc .log=]] | **بيمسح** الربط (مش بيعرضه!) |

الاتنين محتاجين CMD كأدمن، وبيغيّروا الجهاز لكل اليوزرز، وأي اختيار في UserChoice هيفضل غالب عليهم. عشان كده مش متشغّلين هنا: الشكل من [[assoc /?]] و [[ftype /?]] وتوثيق Microsoft. لو عايز تجرّب، في Windows Sandbox أو VM. ولنفسك: Settings ‹ Apps ‹ Default apps.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الامتداد مربوط بإيه | [[assoc .txt]] |
| النوع بيتفتح بإيه | [[ftype txtfile]] |
| دوّر على امتداد في اللستة | [[assoc | findstr /i /b /c:".js="]] |
| اختيار اليوزر الحقيقي | [[reg query ...\FileExts\.txt\UserChoice /v ProgId]] |
| غيّر (أدمن، VM بس) | [[assoc .ext=type]] و [[ftype type=command]] |

المقابل: في PowerShell مفيش cmdlet مباشر، بتستخدم [[cmd /c assoc .txt]] أو تقرا الـ registry بـ [[Get-ItemProperty]]. وفي لينكس [[xdg-mime query default text/plain]]، وفي الماك [[duti]] (برنامج منفصل).`,
          lines: [
            R`بيطبع الامتداد ده مربوط بأنهي نوع ملف، بالشكل [[امتداد=نوع]]. على ويندوز 11 طلع [[.txt=txtfilelegacy]]، ودي أول علامة إن الربط القديم مش هو اللي بيفتح الملف فعلًا (الـ UserChoice بتاع اليوزر هو اللي بيكسب).`,
            R`[[.bat=batfile]]: ملفات batch ليها نوع اسمه [[batfile]]. اكتب الامتداد بالنقطة، والحروف مش فارقة.`,
            R`بيطبع أمر الفتح بتاع النوع: [[batfile="%1" %*]]، يعني شغّل الملف نفسه ([[%1]]) بكل الـ arguments ([[%*]]). مفيش برنامج وسيط، وده سبب إن [[.bat]] في إيميل خطر.`,
            R`[[assoc]] لوحده بيطبع كل الروابط (مئات السطور)، و [[findstr /i /b /c:".js="]] بيسيب السطر اللي بيبدأ بـ [[.js=]] بالظبط. الـ [[=]] مهمة عشان ميجيبش [[.jse]] و [[.json]].`,
            R`طبع [[JSFile=C:\Windows\System32\WScript.exe "%1" %*]]: ملفات [[.js]] بتتفتح بـ Windows Script Host مش node. فدبل كليك على [[app.js]] (أو كتابة [[app]] بس، لأن [[.JS]] في [[PATHEXT]]) مش هيشغّل كود node.`,
            R`امتداد مش مربوط بحاجة بيطبع [[File association not found for extension .nosuch]] و [[errorlevel]] [[1]]. ولو [[ftype]] على نوع مش موجود، الرسالة [[File type '...' not found or no open command associated with it.]] و [[errorlevel]] [[2]].`,
          ],
          sol: R`اتشغّل في CMD عادي على ويندوز 11:

[[assoc .bat]] ← [[.bat=batfile]] و [[ftype batfile]] ← [[batfile="%1" %*]]. و [[assoc .cmd]] ← [[.cmd=cmdfile]] و [[ftype cmdfile]] ← [[cmdfile="%1" %*]]. و [[assoc .js]] ← [[.js=JSFile]] و [[ftype JSFile]] ← [[JSFile=C:\Windows\System32\WScript.exe "%1" %*]]. و [[assoc .vbs]] ← [[.vbs=VBSFile]] و [[ftype VBSFile]] ← [[VBSFile="%SystemRoot%\System32\WScript.exe" "%1" %*]].

الأربعة خطر في إيميل: [[.bat]] و [[.cmd]] بيشتغلوا بنفسهم، و [[.js]] و [[.vbs]] بيشغّلهم Windows Script Host، يعني دبل كليك = الكود اشتغل على جهازك. والتغيير ([[assoc .ext=type]]) من الوثائق ومحتاج أدمن، فمش متجرّب هنا.`,
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
assoc .bat
ftype batfile
assoc .nosuch_lab
echo assoc missing=%errorlevel%
ftype nosuchtype_lab
echo ftype missing=%errorlevel%
exit /b 0`, expect: [R`.bat=batfile`, R`batfile="%1" %*`, R`File association not found for extension .nosuch_lab`, R`assoc missing=1`, R`ftype missing=2`] },
          ],
        }
      ]
    }
]);
