// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "العمليات والخدمات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Get-Process / Stop-Process",
          title: "العمليات",
          desc: R`[[Get-Process]] بيعرض البرامج الشغالة، زي [[ps]] في bash و [[tasklist]] في CMD، واختصاره [[ps]] و [[gps]]. لو كتبت اسم بعده ([[Get-Process node]]) بيجيب العمليات اللي بالاسم ده بس، وكل واحدة ليها [[Id]] (رقم العملية أو PID) و [[CPU]] (ثواني معالج) و [[WS]] (الرام).

[[Stop-Process]] بيقفل عملية، واختصاره [[kill]]. [[-Name node]] بيقفل كل العمليات اللي اسمها node مرة واحدة (من غير .exe)، و [[-Id 1234]] بيقفل عملية واحدة برقمها، وده أدق لو فيه أكتر من نسخة. و [[-Force]] بيقفل غصب من غير أسئلة، زي [[kill -9]].

تحذير: Stop-Process مش بيسأل البرنامج «تحب تحفظ؟»، أي شغل مش محفوظ بيضيع. ولو قالك Access is denied، العملية شغالة بصلاحيات أدمن وانت لأ. ولو الاسم مش موجود هيطلع error، فـ [[-ErrorAction SilentlyContinue]] لو مش فارق معاك.`,
          example: R`Get-Process node
Stop-Process -Name node
Stop-Process -Id 1234 -Force`,
          try: "افتح notepad واقفله بـ Stop-Process بالاسم.",
          flag: "danger",
          deep: {
            why: R`برنامج معلّق، أو سيرفر node قديم لسه ماسك البورت، أو عايز تعرف مين بياكل الرام. زي ps و kill في bash.`,
            how: R`[[Get-Process]] بدون حاجة كل العمليات. [[Get-Process chrome]] بيفلتر. الـ objects بيها CPU، ورام [[WorkingSet64]]، والـ Id، والاسم.

[[Stop-Process -Name "notepad"]] أو [[-Id 1234]]. [[-Force]] لو مش قافل لوحده.

[[Get-Process | Where-Object WorkingSet64 -gt 500MB | Select Name, Id, WorkingSet64]] عمليات تاكل أكتر من ٥٠٠MB.`,
            when: "عملية معلّقة. تطبيق ماسك resources. تعرف الـ PID عشان تربطه ببورت.",
            mistakes: "Stop-Process على اسم غلط بيطلع error. استخدم -ErrorAction SilentlyContinue لو مش مهم."
          },
          teach: R`## الفكرة

[[Get-Process]] بيوريك البرامج الشغالة، و [[Stop-Process]] بيقفل واحد منهم. اتجرب في PowerShell 7.6 على ويندوز ١١. وعشان مقفلش حاجة شغالة على الجهاز، التجربة كانت على سيرفر node صغير أنا اللي شغلته.

---

## ١. [[Get-Process node]]

[[node]] هنا اسم العملية (من غير [[.exe]]). الناتج على الجهاز ده كان ٣٤ سطر! دي أول ٣ منهم:

~~~text الناتج
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     79   110.06     123.74       0.88     356   1 node
     44   116.07     121.61       6.77    1764   1 node
     25    67.98      71.82       0.61    7344   1 node
...
     43    18.75      59.96       0.06   39080   1 node
~~~

ليه ٣٤ وانا شغّلت واحد بس (رقم 39080)؟ لأن برامج كتير مبنية على Node وبتشغّل عمليات node في الخلفية: VS Code وإضافاته، وأدوات زي MCP servers. ودي أهم نقطة في الدرس.

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[WS(M)]] | الرام اللي ماسكها دلوقتي بالميجا |
| [[CPU(s)]] | ثواني معالج من ساعة ما اتفتح |
| [[Id]] | رقم العملية (PID). فريد: مفيش اتنين بنفس الرقم في نفس الوقت |
| [[ProcessName]] | الاسم. ممكن يتكرر |

---

## ٢. [[Stop-Process -Name node]]

[[-Name node]] = اقفل **كل** عملية اسمها node. على الجهاز ده كان هيقفل الـ ٣٤، ومنهم أدوات شغالة جوه VS Code. عشان كده **ماشغلتهوش هنا**. استخدم [[-Name]] بس لما تكون متأكد إن كل اللي بالاسم ده بتاعك.

ولو الاسم مش موجود:

~~~text error
Cannot find a process with the name "notepadxyz". Verify the process name and call the cmdlet again.
~~~

و [[-ErrorAction SilentlyContinue]] بيخفي الـ error ده: جربت [[Stop-Process -Name notepadxyz -ErrorAction SilentlyContinue]] فعدّى من غير أي رسالة.

---

## ٣. [[Stop-Process -Id 1234 -Force]]

[[-Id]] = اقفل العملية دي بالظبط برقمها. ده الأأمن. و [[-Force]] = اقفلها غصب من غير سؤال.

جربتها على السيرفر بتاعي:

~~~powershell
Stop-Process -Id 39080 -Force
Get-Process -Id 39080
~~~

~~~text الناتج
Cannot find a process with the process identifier 39080.
~~~

اتقفل. والـ error ده معناه «مفيش عملية بالرقم ده»، يعني نجحنا.

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| كل البرامج | [[Get-Process]] | [[ps aux]] |
| بالاسم | [[Get-Process node]] | [[pgrep -a node]] |
| اقفل بالرقم | [[Stop-Process -Id 1234]] | [[kill 1234]] |
| اقفل غصب | [[... -Force]] | [[kill -9 1234]] |
| اقفل بالاسم | [[Stop-Process -Name node]] | [[pkill node]] |

- اقفل بالـ [[Id]] لما تقدر، والـ [[-Name]] بيقفل كل اللي بنفس الاسم.
- Stop-Process مش بيسأل البرنامج يحفظ: أي شغل مش محفوظ بيضيع.`,
          lines: [
            "عمليات node الشغالة (زي pgrep).",
            "اقفلهم كلهم بالاسم.",
            "اقفل عملية برقمها، غصب ([[-Force]] زي kill -9)."
          ],
          sol: R`[[Start-Process notepad]] وبعدين [[Get-Process notepad]] هيطلع سطر فيه Id و ProcessName، و [[Stop-Process -Name notepad]] يقفله من غير أي رسالة. تأكد بـ [[Get-Process notepad]] تاني، المفروض يقولك [[Cannot find a process with the name "notepad"]].

Stop-Process مش بيسأل «تحب تحفظ؟»، أي كلام مكتوب مش محفوظ بيضيع. ولو قالك [[Access is denied]] يبقى العملية شغالة كأدمن وانت مش أدمن. ولو فيه أكتر من notepad مفتوح، [[-Name]] هيقفلهم كلهم، فلو عايز واحد بس استخدم [[-Id]].`
        },
        {
          cmd: "Get-NetTCPConnection",
          title: "مين ماسك البورت",
          desc: R`لما تشغّل سيرفر ويطلعلك [[EADDRINUSE]] أو «port 3000 is already in use»، يبقى فيه برنامج تاني ماسك البورت. [[Get-NetTCPConnection]] بيعرض اتصالات TCP على الجهاز، و [[-LocalPort 3000]] البورت ده بس، و [[-State Listen]] اللي «بيسمع» (مستني اتصالات) بس. أهم عمود [[OwningProcess]]: رقم العملية اللي ماسكة البورت. المقابل في لينكس [[ss -tlnp]] أو [[lsof -i :3000]].

السطر التاني فيه أقواس جوه أقواس: [[(Get-NetTCPConnection ...).OwningProcess]] بيتنفذ الأول ويطلع الرقم، والرقم ده بيتحط مكان [[-Id]] في Get-Process، فتعرف اسم البرنامج. والسطر التالت نفس الفكرة بس مع Stop-Process و [[-Force]]: يقفل البرنامج في سطر واحد.

[[-State Listen]] مهمة: من غيرها هتلاقي اتصالات قديمة حالتها TimeWait رقم عمليتها 0، وتقفل الغلط أو يطلعلك error. والأمر ده على ويندوز بس (5.1 و 7)، ومن غير أدمن بيشتغل عادي.`,
          example: R`Get-NetTCPConnection -LocalPort 3000 -State Listen
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force`,
          try: "شغّل [[npx http-server -p 3000]] واقفله من نافذة تانية بالبورت.",
          deep: {
            why: R`أشهر error لأي حد بيشغّل سيرفر محلي: [[EADDRINUSE]]، يعني سيرفر قديم لسه ماسك البورت (غالبًا node في نافذة نسيتها). الأمر ده بيوصلك للبرنامج ويقفله في سطر، زي [[lsof -i]] و [[ss -tlnp]] في لينكس.`,
            how: R`[[-LocalPort 3000]] بيدوّر على البورت ده. [[-State Listen]] العمليات اللي بتستمع. الناتج بيه LocalPort وRemoteAddress والـ State وOwningProcess (الـ PID).

[[Get-NetTCPConnection -LocalPort 3000 | Select-Object *]] وبعدين [[Get-Process -Id PID]] تعرف اسم العملية.

[[netstat -ano]] كمان شغال في PowerShell وبياخد نفس المعلومات بأسلوب قديم.`,
            when: "EADDRINUSE: بورت مشغول. تتأكد إن التطبيق شغال ومستمع.",
            mistakes: "تنسى [[-State Listen]] فيطلعلك اتصالات TIME_WAIT قديمة رقم عمليتها 0، وتقفل الغلط."
          },
          teach: R`## الفكرة

السؤال: «مين ماسك البورت 3000؟». عشان أجرّب بجد شغّلت سيرفر node صغير على [[127.0.0.1:3000]] في الخلفية، وبعدين مشيت على الـ ٣ سطور في PowerShell 7.6.

### يعني إيه بورت و Listen؟

البورت رقم من 0 لـ 65535 بيفرّق بين البرامج اللي على نفس الجهاز. البرنامج اللي **بيسمع** (Listen) على بورت هو اللي مستني حد يكلمه عليه، وبرنامج واحد بس يقدر يسمع على نفس البورت ونفس العنوان. عشان كده التاني بيطلع [[EADDRINUSE]] (address already in use).

---

## ١. [[Get-NetTCPConnection -LocalPort 3000 -State Listen]]

| الحتة | معناها |
|---|---|
| [[Get-NetTCPConnection]] | اتصالات TCP على الجهاز (TCP البروتوكول اللي الويب والـ APIs شغالين عليه) |
| [[-LocalPort 3000]] | البورت اللي على جهازي = 3000 |
| [[-State Listen]] | اللي بيسمع بس |

~~~text الناتج
LocalAddress  LocalPort RemoteAddress  RemotePort State   AppliedSetting OwningProcess
------------  --------- -------------  ---------- -----   -------------- -------------
127.0.0.1     3000      0.0.0.0        0          Listen                 39080
~~~

| العمود | هنا | معناه |
|---|---|---|
| [[LocalAddress]] | [[127.0.0.1]] | السيرفر سامع على الجهاز نفسه بس (localhost). [[0.0.0.0]] كان يبقى معناه كل الشبكات |
| [[RemoteAddress]] / [[RemotePort]] | [[0.0.0.0]] / [[0]] | مفيش طرف تاني لسه: هو مستني |
| [[OwningProcess]] | [[39080]] | **رقم العملية** اللي ماسكة البورت. ده المفتاح |

---

## ٢. [[Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess]]

بترتيب التنفيذ من جوه لبرة:

### الخطوة ١: الأقواس

[[(Get-NetTCPConnection -LocalPort 3000 -State Listen)]] بيتنفذ الأول ويرجّع الـ object اللي فوق.

### الخطوة ٢: [[.OwningProcess]]

خد منه الرقم بس: [[39080]].

### الخطوة ٣: [[Get-Process -Id 39080]]

الرقم بيتحط مكان [[-Id]]:

~~~text الناتج
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     43    18.75      59.96       0.06   39080   1 node
~~~

عرفنا إن اللي ماسك البورت [[node]].

---

## ٣. [[Stop-Process -Id (...).OwningProcess -Force]]

نفس الخطوة ١ و ٢، بس الرقم راح لـ [[Stop-Process]]. وبعدها نفس سؤال الخطوة ١ طلّع:

~~~text الناتج
No matching MSFT_NetTCPConnection objects found by CIM query for instances of the ROOT/StandardCimv2/MSFT_NetTCPConnection class on the  CIM server: SELECT * FROM MSFT_NetTCPConnection  WHERE ((LocalPort = 3000)) AND ((State = 2)). Verify query parameters and retry.
~~~

يعني مفيش حد بيسمع على 3000. [[State = 2]] هو رقم حالة Listen جوه ويندوز. البورت فضي.

---

## الخلاصة

| الخطوة | الكود | الناتج |
|---|---|---|
| مين بيسمع | [[Get-NetTCPConnection -LocalPort 3000 -State Listen]] | سطر فيه [[OwningProcess]] |
| رقمه بس | [[(...).OwningProcess]] | [[39080]] |
| اسمه | [[Get-Process -Id (...)]] | [[node]] |
| اقفله | [[Stop-Process -Id (...) -Force]] | البورت فضي |

| النظام | الأمر |
|---|---|
| ويندوز (PowerShell 5.1 و 7) | [[Get-NetTCPConnection -LocalPort 3000 -State Listen]] |
| ويندوز (CMD) | [[netstat -ano]] ودوّر على [[:3000]] |
| لينكس | [[ss -tlnp]] أو [[lsof -i :3000]] |
| الماك | [[lsof -i :3000]] |`,
          lines: [
            "مين بيسمع على بورت 3000 (زي ss -tlnp). OwningProcess هو رقم العملية.",
            "هات العملية نفسها برقمها (الأقواس بتنفّذ الجوّاني الأول).",
            "واقفلها. الحل الكامل لـ EADDRINUSE في سطر."
          ],
          sol: R`في نافذة: [[npx http-server -p 3000]]. في التانية [[Get-NetTCPConnection -LocalPort 3000 -State Listen]] هيطلع سطر أو اتنين (IPv4 و IPv6) فيهم [[LocalPort 3000]] و [[State Listen]] و [[OwningProcess]] رقم زي 12345، وبعدين [[Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force]]. النافذة الأولى هترجع للـ prompt والسيرفر وقف.

لو ملقاش حاجة هيقولك (مع [[-State Listen]]) [[No matching MSFT_NetTCPConnection objects found by CIM query ... WHERE ((LocalPort = 3000)) AND ((State = 2))]]، ومن غير [[-State]] [[No MSFT_NetTCPConnection objects found with property 'LocalPort' equal to '3000']]، والاتنين معناهم مفيش حد بيسمع على البورت (أو السيرفر لسه بيقوم). جربت ده في 7.6 و 5.1 بسيرفر Node على 127.0.0.1 فطلع سطر واحد بس (IPv4)، والسطرين بيطلعوا لو السيرفر سامع على IPv4 و IPv6 الاتنين. و Get-NetTCPConnection موجود على ويندوز بس (جوه PowerShell 5.1 و 7)، على لينكس والماك استخدم [[ss -tlnp]] أو [[lsof -i :3000]].`
        },
        {
          cmd: "Start-Process",
          title: "شغّل حاجة",
          desc: R`[[Start-Process]] بيفتح أي حاجة بالبرنامج المناسب لها، زي [[start]] في CMD و [[xdg-open]] في لينكس و [[open]] في الماك. اسم برنامج ([[notepad]]) بيشغّله، ولينك ([["https://github.com"]]) بيفتحه في المتصفح الافتراضي، وملف بيفتحه بالبرنامج المرتبط بامتداده. اختصاره [[start]].

[[-Verb RunAs]] بيشغّل البرنامج كأدمن، فهيطلعلك سؤال UAC «Do you want to allow...». ودي الطريقة تفتح PowerShell أدمن من PowerShell عادي. و [[ii]] اختصار [[Invoke-Item]]: بيفتح الحاجة بالبرنامج الافتراضي، والنقطة [[.]] يعني الفولدر الحالي، فـ [[ii .]] بيفتح Explorer على المكان اللي انت فيه.

إضافات مهمة في السكربتات: [[-Wait]] يستنى البرنامج يقفل قبل ما يكمّل (من غيرها السكربت بيكمّل على طول)، و [[-ArgumentList]] للـ arguments، و [[-WindowStyle Hidden]] من غير نافذة. ولو عايز البرنامج يشتغل جوه نفس النافذة وتشوف ناتجه، ده شغل [[&]] (الدرس اللي بعده).`,
          example: R`Start-Process notepad
Start-Process "https://github.com"
Start-Process powershell -Verb RunAs
ii .`,
          try: "افتح الفولدر الحالي في Explorer بـ [[ii .]].",
          deep: {
            why: R`عايز تفتح لينك أو ملف بالبرنامج بتاعه، أو تفتح PowerShell كأدمن من غير ما تقفل اللي انت فيه، أو سكربت يشغّل برنامج ويستناه يخلص. Start-Process بيعمل الحاجات دي كلها، زي [[start]] في CMD و [[xdg-open]] في لينكس.`,
            how: R`[[Start-Process notepad.exe]] بيشغّل Notepad. [[-Verb RunAs]] تشغيل كـ Administrator (هيطلع UAC prompt). [[-Wait]] بيستنى يخلص قبل ما يكمّل.

[[Start-Process -FilePath "cmd.exe" -Verb RunAs]] بيفتح CMD كمدير.

[[-WindowStyle Hidden]] بيشغّل من غير نافذة. [[-RedirectStandardOutput out.txt]] بيحفظ الـ output.`,
            when: "تشغيل أمر بصلاحيات مرتفعة. تشغيل عملية في الخلفية من سكربت.",
            mistakes: "تنسى -Wait فالسكربت يكمّل قبل ما البرنامج يخلص."
          },
          teach: R`## الفكرة

[[Start-Process]] بيفتح حاجة **بره** PowerShell: برنامج، أو لينك، أو ملف بالبرنامج بتاعه. وبيرجّعلك الـ prompt على طول من غير ما يستنى. كل سطر في المثال بيفتح نافذة، فالسطور اللي بتفتح متصفح أو تطلب أدمن مكتوب سلوكها من دليل Microsoft، والباقي اتجرب في PowerShell 7.6.

---

## ١. [[Start-Process notepad]]

بيفتح Notepad في نافذة لوحده. الأمر نفسه مش بيطبع حاجة. ولو عايز تعرف رقم العملية اللي اتفتحت، ضيف [[-PassThru]]:

~~~text الناتج بـ -PassThru (Format-Table Id, ProcessName, HasExited)
   Id ProcessName HasExited
   -- ----------- ---------
37624 Notepad         False
~~~

[[HasExited]] بـ [[False]]: لسه مفتوح. و [[-PassThru]] معناها عمومًا «رجّعلي الـ object اللي عملته».

---

## ٢. [[Start-Process "https://github.com"]]

لينك بدل برنامج: ويندوز بيبص على نوعه ويفتحه بالبرنامج الافتراضي، يعني المتصفح. ونفس الكلام لملف: [[Start-Process report.pdf]] بيفتحه بقارئ الـ PDF.

---

## ٣. [[Start-Process powershell -Verb RunAs]]

- [[powershell]] البرنامج: Windows PowerShell 5.1 (لو عايز 7 اكتب [[pwsh]]).
- [[-Verb]] «الفعل» اللي ويندوز يعمله بالملف، زي الاختيارات في كليك يمين.
- [[RunAs]] = Run as administrator.

هيطلعلك سؤال UAC «Do you want to allow this app to make changes to your device?»، ولو وافقت تتفتح نافذة PowerShell جديدة كأدمن، وعنوانها بيبدأ بـ Administrator. النافذة اللي انت فيها بتفضل عادية.

---

## ٤. [[ii .]]

[[ii]] اختصار [[Invoke-Item]]: «افتح الحاجة دي بالبرنامج الافتراضي بتاعها». و [[.]] الفولدر الحالي، والبرنامج الافتراضي للفولدر هو File Explorer. فـ [[ii .]] = افتح الفولدر اللي انا فيه في Explorer.

---

## [[-Wait]]: استنى لحد ما يخلص

من غير [[-Wait]] السكربت بيكمّل على طول. جربت برنامج بيقفل لوحده برقم خروج 3:

~~~powershell
$r = Start-Process cmd -ArgumentList '/c', 'exit 3' -Wait -PassThru -WindowStyle Hidden
$r.ExitCode
~~~

~~~text الناتج
3
~~~

| الحتة | معناها |
|---|---|
| [[-ArgumentList '/c', 'exit 3']] | الـ arguments اللي هتتبعت لـ cmd: نفّذ [[exit 3]] واقفل |
| [[-Wait]] | استنى لحد ما cmd يقفل |
| [[-PassThru]] | رجّع الـ object وحطه في [[$r]] |
| [[-WindowStyle Hidden]] | من غير نافذة |
| [[$r.ExitCode]] | رقم الخروج. 0 = نجح، غيره = فيه مشكلة |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| افتح برنامج | [[Start-Process notepad]] |
| افتح لينك أو ملف | [[Start-Process "https://..."]] أو [[ii file.pdf]] |
| أدمن | [[Start-Process pwsh -Verb RunAs]] |
| الفولدر في Explorer | [[ii .]] |
| استنى يخلص | [[-Wait]] |

| النظام | افتح بالبرنامج الافتراضي |
|---|---|
| ويندوز CMD | [[start file]] |
| لينكس | [[xdg-open file]] |
| الماك | [[open file]] |
| WSL | [[explorer.exe .]] |`,
          lines: [
            "افتح Notepad.",
            "افتح لينك في المتصفح الافتراضي.",
            "افتح PowerShell كمدير (هيطلع سؤال UAC).",
            "[[ii]] اختصار Invoke-Item: افتح الفولدر الحالي في Explorer."
          ],
          sol: R`[[ii .]] بيفتح نافذة File Explorer على الفولدر اللي انت واقف فيه، ومش بيطبع حاجة في الترمنال. [[ii]] اختصار Invoke-Item، وبيفتح أي حاجة بالبرنامج الافتراضي بتاعها: [[ii .\report.pdf]] يفتح الـ PDF، و [[ii .\files.csv]] يفتح Excel.

لو انت جوه WSL الأمر ده مش موجود أصلًا، المقابل هناك [[explorer.exe .]]. وعلى لينكس PowerShell بيستخدم [[xdg-open]]، فلو مفيش واجهة رسومية مش هيفتح حاجة.`
        },
        {
          cmd: "& (call operator)",
          title: "شغّل برنامج مساره في متغير أو فيه مسافات",
          desc: R`مسار بين علامات تنصيص في أول السطر PowerShell بيعتبره نص مش أمر، فبيطبعه أو يطلع error. [[&]] قبله بيقول «شغّل ده»: [[& "C:\Program Files\nodejs\node.exe" --version]]. ونفس الحكاية لو المسار في متغير: [[& $chrome ...]]. والـ arguments ممكن تبقى array تتبني في السكربت وتتبعت مرة واحدة.`,
          example: R`$node = "C:\Program Files\nodejs\node.exe"
"C:\Program Files\nodejs\node.exe" --version
& "C:\Program Files\nodejs\node.exe" --version
& $node --version
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$chromeArgs = @("--headless=new", "--screenshot=$env:TEMP\page.png", "http://localhost:3000")
& $chrome $chromeArgs`,
          try: R`اكتب [["C:\Program Files\nodejs\node.exe" --version]] وشوف الـ error، وبعدين حط [[&]] قبلها.`,
          deep: {
            why: "أي برنامج في [[C:\\Program Files]] مساره فيه مسافة، فلازم يتحط بين علامات تنصيص. بس في PowerShell أي حاجة بين علامات تنصيص في أول السطر بتبقى نص مش أمر، فبيطلعلك error غريب أو المسار يتطبع وخلاص.",
            how: R`PowerShell بيبص على أول حاجة في السطر: لو كلمة عادية ([[node]]، [[git]]) بيدوّر عليها كأمر. لو string أو متغير، بيعتبره قيمة ويطبعها. فالمسار بين علامات تنصيص لوحده بيطبع المسار، ولو بعده arguments بيطلع [[Unexpected token]].

[[&]] (اسمه call operator) بيقول «القيمة اللي بعدي دي اسم أمر أو مسار برنامج، شغّله»، وأي حاجة بعده بتتبعت له كـ arguments.

ولما تحط array بعده، كل عنصر بيتبعت argument لوحده، والعنصر اللي فيه مسافات بيتحط بين علامات تنصيص أوتوماتيك. فتقدر تبني الـ arguments خطوة خطوة (تزوّد فلاج بشرط مثلًا) وتبعتهم مرة واحدة.

والفرق بينه وبين [[Start-Process]]: [[&]] بيشغّل البرنامج في نفس النافذة، والناتج بيطلع قدامك، و [[$LASTEXITCODE]] بيتملى. [[Start-Process]] بيشغّله كبروسس منفصل، ومحتاج [[-Wait]] عشان تستناه.

وخلي بالك: برامج GUI زي Chrome، [[&]] ممكن ميستناهاش تخلص، فالسكربت يكمّل قبل ما الصورة تتعمل. في الحالة دي [[Start-Process -Wait]] أضمن (الدرس اللي بعده).`,
            when: "أي برنامج مش في الـ PATH ومساره فيه مسافات، أو مساره بيتحدد في السكربت (تدوّر عليه في أكتر من مكان).",
            mistakes: R`في مشروع حقيقي كان سكربت التصوير بيشغّل Chrome بـ [[&]] وبعدين [[Start-Sleep -Seconds 2]] ويتمنى الصورة تكون خلصت. وكان مسمّي الـ array [[$args]]، ودي متغير محجوز في PowerShell (فيه الـ arguments اللي اتبعتت للسكربت)، فاستخدم اسم زي [[$chromeArgs]]. وكتابة الـ arguments كلها string واحد ([[& $chrome "--headless --screenshot=x"]]) بتوصل للبرنامج argument واحد طويل.`
          },
          teach: R`## الفكرة

PowerShell بيبص على **أول حاجة في السطر** عشان يقرر يعمل إيه. كلمة عادية زي [[node]] بيدوّر عليها كأمر. لكن نص بين علامات تنصيص أو متغير بيعتبره **قيمة**. و [[&]] بتقوله «القيمة دي اسم برنامج، شغّله». اتجرب في PowerShell 7.6 و 5.1 على Node 24.

---

## ١. [[$node = "C:\Program Files\nodejs\node.exe"]]

متغير فيه المسار. والمسار بين علامات تنصيص عشان فيه مسافة ([[Program Files]]). السطر ده مش بيطبع حاجة.

---

## ٢. من غير [[&]]: error

~~~powershell
"C:\Program Files\nodejs\node.exe" --version
~~~

~~~text الناتج في PowerShell 7.6
ParserError:
Line |
   1 |  "C:\Program Files\nodejs\node.exe" --version
     |                                       ~~~~~~~
     | Unexpected token 'version' in expression or statement.
~~~

PowerShell شاف نص، وبعده [[--version]] فاكرها عملية حسابية على النص ([[--]] في PowerShell معناها «اطرح واحد»). فطلع ParserError: الكود نفسه مش مفهوم، فولا حاجة اتنفذت. و 5.1 طلّعت سطر زيادة: [[The '--' operator works only on variables or on properties.]]

---

## ٣. بـ [[&]]

~~~powershell
& "C:\Program Files\nodejs\node.exe" --version
~~~

~~~text الناتج
v24.19.0
~~~

[[&]] اسمه call operator. قاله «شغّل البرنامج ده»، وكل اللي بعده arguments.

---

## ٤. [[& $node --version]]

نفس الحكاية من متغير:

~~~text الناتج
v24.19.0
~~~

ومن غير [[&]]: [[$node --version]] طلّع نفس الـ ParserError. وبعد ما البرنامج يخلص، [[$LASTEXITCODE]] فيه رقم خروجه (هنا [[0]] = نجح).

---

## ٥ و ٦ و ٧: الـ arguments في array

~~~powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$chromeArgs = @("--headless=new", "--screenshot=$env:TEMP\page.png", "http://localhost:3000")
& $chrome $chromeArgs
~~~

- [[$chrome]]: مسار Chrome.
- [[@( ... )]]: array، كل عنصر argument لوحده.
- [[$env:TEMP]]: متغير بيئة فيه فولدر الملفات المؤقتة، فـ [[--screenshot=...]] بيبقى مسار حقيقي.
- [[& $chrome $chromeArgs]]: كل عنصر في الـ array بيوصل للبرنامج argument منفصل.

عشان أتأكد إزاي البرنامج بيستلمهم، استخدمت node بدل Chrome يطبعلي الـ arguments اللي وصلته ([[process.argv.slice(1)]] = الـ arguments من غير اسم البرنامج):

| اللي كتبته | اللي وصل للبرنامج |
|---|---|
| [[& $node -e "..." "a b" c]] | [[[ 'a b', 'c' ]]] |
| [[$a = @("x y", "--flag")]] ثم [[& $node -e "..." $a]] | [[[ 'x y', '--flag' ]]] |
| [[& $node -e "..." "x y --flag"]] | [[[ 'x y --flag' ]]] |

السطر التاني: كل عنصر في الـ array وصل لوحده، و [["x y"]] فضل argument واحد رغم المسافة. والتالت: string واحد = argument واحد طويل، والبرنامج مش هيفهم إن فيه flag جوّاه.

---

## الخلاصة

| السطر بيبدأ بـ | محتاج [[&]]؟ |
|---|---|
| كلمة عادية: [[node]] [[git]] | لأ |
| مسار من غير مسافات ولا علامات تنصيص: [[C:\tools\x.exe]] | لأ |
| علامات تنصيص: [["C:\Program Files\..."]] | **أيوه** |
| متغير: [[$node]] | **أيوه** |

و [[&]] بيشغّل البرنامج **في نفس النافذة** وناتجه قدامك، عكس [[Start-Process]] اللي بيفتحه لوحده. ومتسمّيش الـ array [[$args]]: ده متغير محجوز في PowerShell.`,
          lines: [
            "مسار node في متغير.",
            "من غير [[&]]: PowerShell شايف نص وبعده كلام مش مفهوم، فيطلع error.",
            "بـ [[&]]: شغّل البرنامج اللي في المسار ده.",
            "نفس الحاجة من متغير.",
            "مسار Chrome.",
            "array فيها الـ arguments، كل واحد عنصر لوحده.",
            "شغّل Chrome وابعتله كل عناصر الـ array كـ arguments منفصلة."
          ],
          sol: R`من غير [[&]]: جربتها على PowerShell 7.6 والمسار بين علامات تنصيص، فطلع ParserError: [[Unexpected token 'version' in expression or statement.]]، وفي 5.1 ومعاه سطر تاني [[The '--' operator works only on variables or on properties.]]، لأن PowerShell شاف نص وبعده حاجة مش مفهومة. ولو كتبت المسار لوحده من غير أي arguments هيطبعه كنص وخلاص.

مع [[&]] قبلها: طبعت نسخة node زي [[v22.22.2]]. ونفس الحكاية [[& $node --version]]. أما [[$node --version]] من غير [[&]] بيطلع نفس الـ ParserError. القاعدة: لو السطر بيبدأ بـ علامة تنصيص أو [[$]] وانت عايز تشغّل، حط [[&]] قبله.`
        },
        {
          cmd: "screenshots.ps1",
          title: "صوّر صفحات موقعك بـ Chrome من غير أي مكتبة",
          desc: R`Chrome نفسه يقدر يصوّر صفحة من غير ما يفتح نافذة: [[--headless=new --screenshot=file.png --window-size=1440,900]]. لوب على لستة صفحات بمقاسات مختلفة، و [[Start-Process -Wait]] يستنى كل صورة تخلص، و [[--virtual-time-budget]] يدّي الصفحة وقت تحمّل الـ JavaScript والخطوط.`,
          example: R`$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }

$pages = @(
  @{ file = "home.png";    url = "http://localhost:3000/";        w = 1440; h = 900 },
  @{ file = "home-m.png";  url = "http://localhost:3000/";        w = 390;  h = 844 },
  @{ file = "contact.png"; url = "http://localhost:3000/contact"; w = 1440; h = 1000 }
)

foreach ($p in $pages) {
  $out = Join-Path $outDir $p.file
  Remove-Item $out -ErrorAction SilentlyContinue
  $chromeArgs = @("--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--user-data-dir=$env:TEMP\shot-profile", "--window-size=$($p.w),$($p.h)",
    "--virtual-time-budget=4000", "--screenshot=$out", $p.url)
  Start-Process $chrome -ArgumentList $chromeArgs -Wait
  if (Test-Path $out) { Write-Host "OK   $($p.file)" } else { Write-Host "FAIL $($p.file)" -ForegroundColor Red }
}
ii $outDir`,
          try: "شغّل موقعك محليًا، وغيّر اللستة لصفحاتك، وقارن صورة اللابتوب بصورة الموبايل.",
          flag: "script",
          deep: {
            why: "عايز صور لصفحات موقعك: للـ README، أو تبعتها لعميل، أو تتأكد إن شكل الموبايل مش بايظ قبل الرفع. Playwright و Puppeteer بيسطّبوا متصفح كامل ومكتبات، و Chrome اللي على جهازك أصلًا بيعمل ده بفلاجات.",
            how: R`[[--headless=new]] بيشغّل Chrome من غير نافذة (و [[new]] هي النسخة اللي بترسم الصفحة زي Chrome العادي بالظبط). و [[--screenshot=path]] بيصوّر ويقفل. و [[--window-size]] مقاس الشاشة، فـ 390 في 844 تقريبًا مقاس موبايل.

[[--virtual-time-budget=4000]] بيدّي الصفحة ٤ ثواني «افتراضية» تحمّل فيها الـ JavaScript والصور والخطوط قبل التصوير، ومن غيره ممكن تتصوّر فاضية أو نصها. و [[--user-data-dir]] بروفايل منفصل، عشان لو Chrome بتاعك مفتوح ميحصلش تعارض ومتتأثرش إعداداتك.

اللستة array من hashtables: كل [[@{ }]] فيه اسم الملف واللينك والمقاس، والـ [[foreach]] بيلف عليهم. فإضافة صفحة سطر واحد.

[[Remove-Item]] للصورة القديمة قبل التصوير مهم: من غيره، لو التصوير فشل، [[Test-Path]] هيلاقي الصورة القديمة ويقولك OK.

[[Start-Process -Wait]] بيستنى Chrome يقفل قبل ما يكمّل، فالفحص بعده دقيق. وفي الآخر [[ii]] بيفتح فولدر الصور.`,
            when: "قبل ما ترفع تعديل في التصميم، أو تعمل صور للـ README أو لعرض، أو تقارن شكل صفحة قبل وبعد تعديل.",
            mistakes: R`في مشروع حقيقي السكربت كان فيه مسارات كاملة فيها اسم اليوزر على الجهاز، فمش هيشتغل عند حد تاني، و [[$env:TEMP]] بتحل ده. وكان بيسمّي الـ array [[$args]] وده متغير محجوز. ومكانش بيمسح الصورة القديمة، فالـ OK كان ممكن يكذب. وخلي بالك إن [[-ArgumentList]] في PowerShell 5.1 و 7 (جربته على 7.6) بيلزق العناصر بمسافات من غير علامات تنصيص، فأي مسار فيه مسافة (زي اسم يوزر فيه مسافة) لازم تحطله علامات تنصيص بنفسك جوه العنصر.`
          },
          teach: R`## الفكرة

السكربت بيلف على لستة صفحات، ولكل صفحة بيشغّل Chrome من غير نافذة يصوّرها بمقاس معين، وبعدين يتأكد إن الصورة اتعملت. هنمشي عليه بالترتيب، ٤ أجزاء: التجهيز، واللستة، واللوب، والآخر.

اتجرب في PowerShell 7.6 على ويندوز ١١ عليه Chrome، وعلى سيرفر node صغير شغّلته على [[localhost:3000]] بيرد بصفحة فيها عنوان. شغّلت السكربت كله ما عدا آخر سطر ([[ii]]) عشان ميفتحش Explorer.

---

## الجزء ١: التجهيز

### [[$outDir = Join-Path $env:TEMP "shots"]]

- [[$env:TEMP]] متغير بيئة فيه فولدر الملفات المؤقتة لليوزر الحالي.
- [[Join-Path]] بيلزق جزئين مسار ويحط [[\]] بينهم صح.

~~~text قيمة $outDir هنا
C:\Users\ali\AppData\Local\Temp\shots
~~~

ليه مش مسار ثابت زي [[C:\Users\ali\shots]]؟ لأن السكربت ده هيشتغل عند حد تاني اسمه مش ali.

### [[New-Item -ItemType Directory -Force $outDir | Out-Null]]

اعمل الفولدر. [[-Force]]: لو موجود متطلعش error. و [[| Out-Null]]: ارمي الناتج (الجدول اللي New-Item بيطبعه) عشان الشاشة تفضل نضيفة.

### السطرين بتوع Chrome

~~~powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }
~~~

المكان المعتاد الأول. ولو مش موجود ([[-not (Test-Path ...)]])، جرّب مكان النسخة القديمة 32-bit في [[Program Files (x86)]].

---

## الجزء ٢: اللستة

~~~powershell
$pages = @(
  @{ file = "home.png";    url = "http://localhost:3000/";        w = 1440; h = 900 },
  ...
)
~~~

| الحتة | معناها |
|---|---|
| [[@( ... )]] | array: لستة |
| [[@{ ... }]] | hashtable: صفحة واحدة، فيها مفاتيح وقيم |
| [[file]] | اسم الصورة |
| [[url]] | اللينك |
| [[w]] / [[h]] | العرض والطول بالـ pixel |
| [[,]] بين الـ hashtables | فاصل بين عناصر اللستة |

جربت: [[$pages.Count]] طلع [[3]]، و [[$pages[0].GetType().Name]] طلع [[Hashtable]]. والمقاسات: 1440×900 لابتوب، و 390×844 موبايل.

---

## الجزء ٣: اللوب

### [[foreach ($p in $pages) {]]

لكل عنصر في [[$pages]]، حطه في [[$p]] ونفّذ اللي بين [[{ }]]. فأول دورة [[$p.file]] = [[home.png]].

### [[$out = Join-Path $outDir $p.file]]

مسار الصورة الكامل.

### [[Remove-Item $out -ErrorAction SilentlyContinue]]

امسح الصورة القديمة لو موجودة. و [[-ErrorAction SilentlyContinue]]: لو مش موجودة (أول مرة)، متطلعش error. ليه نمسح؟ لأن الفحص في الآخر بيسأل «الصورة موجودة؟»، ولو القديمة لسه هناك والتصوير فشل، الإجابة هتبقى «أيوه» وهي غلط.

### الـ arguments

~~~powershell
$chromeArgs = @("--headless=new", "--disable-gpu", "--hide-scrollbars",
  "--user-data-dir=$env:TEMP\shot-profile", "--window-size=$($p.w),$($p.h)",
  "--virtual-time-budget=4000", "--screenshot=$out", $p.url)
~~~

السطر مكسور على ٣ سطور من غير backtick، لأن PowerShell عارف إن الأقواس [[@(]] لسه مقفلتش.

| الـ flag | معناه |
|---|---|
| [[--headless=new]] | من غير نافذة، بنفس محرك الرسم بتاع Chrome العادي |
| [[--disable-gpu]] | من غير كارت الشاشة |
| [[--hide-scrollbars]] | من غير شريط التمرير في الصورة |
| [[--user-data-dir=...]] | بروفايل منفصل، عشان ميتخانقش مع Chrome بتاعك لو مفتوح |
| [[--window-size=W,H]] | مقاس الصفحة |
| [[--virtual-time-budget=4000]] | ادّي الصفحة ٤٠٠٠ ملي ثانية «افتراضية» تحمّل فيها قبل التصوير |
| [[--screenshot=path]] | صوّر واحفظ هنا، واقفل |
| [[$p.url]] | اللينك (آخر argument) |

#### ليه [[$($p.w)]] مش [[$p.w]]؟

جوه نص بين double quotes، PowerShell بيبدّل المتغير البسيط بس. جربت الاتنين:

~~~text الناتج
"--window-size=$($pages[1].w),$($pages[1].h)"  →  --window-size=390,844
"--window-size=$pages[1].w"                    →  --window-size=System.Collections.Hashtable System.Collections.Hashtable System.Collections.Hashtable[1].w
~~~

من غير [[$( )]] حط [[$pages]] كله نص، وساب [[[1].w]] كلام عادي. [[$( )]] = «نفّذ اللي جوّا وحط ناتجه».

### [[Start-Process $chrome -ArgumentList $chromeArgs -Wait]]

شغّل Chrome بالـ arguments، و [[-Wait]] استنى لحد ما يقفل. Chrome بيقفل لوحده بعد ما يحفظ الصورة، فلما السطر ده يخلص تبقى الصورة جاهزة.

### سطر الفحص

~~~powershell
if (Test-Path $out) { Write-Host "OK   $($p.file)" } else { Write-Host "FAIL $($p.file)" -ForegroundColor Red }
~~~

الصورة موجودة؟ اطبع OK. مش موجودة؟ اطبع FAIL بالأحمر. [[Write-Host]] بيكتب على الشاشة مباشرة، و [[-ForegroundColor Red]] لون الكلام.

---

## الجزء ٤: [[ii $outDir]]

افتح فولدر الصور في Explorer (اختصار Invoke-Item).

---

## الناتج

~~~text الناتج
OK   home.png
OK   home-m.png
OK   contact.png
~~~

والصور نفسها:

~~~text الملفات ومقاساتها
home.png      7645 bytes   1440x900
home-m.png    4491 bytes   390x844
contact.png   9727 bytes   1440x1000
~~~

المقاس طالع بالظبط زي [[w]] و [[h]] في اللستة (قريته من الصورة نفسها بـ System.Drawing).

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[$outDir]] + [[New-Item]] | فولدر في TEMP يشتغل على أي جهاز |
| ٢ | [[$chrome]] + [[if]] | لاقي Chrome في المكانين |
| ٣ | [[$pages]] | الصفحات والمقاسات: إضافة صفحة = سطر |
| ٤ | [[Remove-Item]] | عشان الفحص ميتخدعش |
| ٥ | [[$chromeArgs]] | كل flag عنصر لوحده |
| ٦ | [[Start-Process ... -Wait]] | استنى الصورة |
| ٧ | [[if (Test-Path $out)]] | OK أو FAIL |
| ٨ | [[ii $outDir]] | افتح الفولدر |

على لينكس والماك نفس الفكرة شغالة بـ [[google-chrome]] أو [[chromium]] بنفس الـ flags، والسكربت محتاج يتغير فيه مسار Chrome بس (من دليل Chrome headless، مش متجرب هنا).`,
          lines: [
            "فولدر الصور في الـ TEMP بدل مسار ثابت من جهازك.",
            "اعمله لو مش موجود، و [[Out-Null]] يخفي الناتج.",
            "مكان Chrome المعتاد.",
            "لو مش هناك، جرّب مكان نسخة الـ 32 بت.",
            "لستة الصفحات، كل واحدة hashtable.",
            "الرئيسية بمقاس لابتوب.",
            "نفس الصفحة بمقاس موبايل.",
            "صفحة التواصل.",
            "قفلة اللستة.",
            "لكل صفحة...",
            "مسار الصورة.",
            "امسح الصورة القديمة لو موجودة، عشان الفحص بعدين ميتخدعش.",
            "arguments الـ Chrome: من غير نافذة، ومن غير GPU، ومن غير scrollbar...",
            "...وبروفايل منفصل، والمقاس من الـ hashtable...",
            "...و ٤ ثواني تحميل، ومكان الصورة، واللينك.",
            "شغّل Chrome واستنى لحد ما يخلص.",
            "الصورة اتعملت؟ اطبع OK، أو FAIL بالأحمر.",
            "آخر اللوب.",
            "افتح فولدر الصور في Explorer."
          ],
          sol: R`شغّل موقعك ([[npm run dev]] مثلًا على 3000) وبعدين السكربت. هيطبع [[OK   home.png]] و [[OK   home-m.png]] و [[OK   contact.png]] بالأخضر، وفي الآخر يفتح فولدر [[%TEMP%\shots]]. Chrome نفسه ممكن يطبع سطر زيادة فيه «written to file»، ده طبيعي.

الصورة الأولى عرضها 1440 والتانية 390، ولو موقعك responsive فيه viewport meta و media queries، صورة الموبايل هتبان بالـ menu المقفول والعناصر تحت بعض. لو الصورتين شكلهم واحد متصغّر، يبقى الـ CSS مش responsive أو مفيش viewport meta. ولو كله OK بس الصور فيها «This site can't be reached»، السيرفر مكانش شغال، لأن Chrome بيصوّر صفحة الـ error عادي. و [[FAIL]] مع error إن الملف مش موجود معناه مسار Chrome غلط عندك.`
        },
        {
          cmd: "Get-Service",
          title: "خدمات ويندوز",
          desc: R`الخدمات (services) برامج ويندوز بيشغّلها في الخلفية من غير نافذة، زي Windows Update والطباعة و Docker و Postgres لو متسطب كخدمة. [[Get-Service]] بيعرضها بعمود [[Status]] (Running أو Stopped) و [[Name]] (الاسم القصير اللي بتستخدمه في الأوامر) و [[DisplayName]] (الاسم الطويل). المقابل في لينكس [[systemctl list-units --type=service]].

[[Where-Object Status -eq Running]] الشغالة بس، و [[*docker*]] أي خدمة اسمها فيه docker (النجوم wildcard). و [[Restart-Service]] بيوقف الخدمة ويشغّلها تاني، ومعاه [[Start-Service]] و [[Stop-Service]].

تحذير: Start و Stop و Restart محتاجين PowerShell مفتوح كأدمن، وإلا هيطلع error فيه «Cannot open ... service». وقبل ما توقف خدمة متعرفهاش، اقرا DisplayName بتاعها، فيه خدمات النظام محتاجها. والأوامر دي ويندوز بس.`,
          example: R`Get-Service | Where-Object Status -eq Running
Get-Service *docker*
Restart-Service com.docker.service`,
          try: "اعرف حالة خدمة Docker أو أي خدمة عندك.",
          deep: {
            why: R`Docker مش شغال، أو Postgres المتسطب على الجهاز ماسك بورت 5432، أو الطباعة واقفة: كلها خدمات ويندوز. Get-Service بيوريك حالتها، و Restart-Service يعيد تشغيلها، زي [[systemctl status]] و [[systemctl restart]] في لينكس.`,
            how: R`[[Get-Service]] كل الخدمات. [[Get-Service -Name "wuauserv"]] خدمة معينة. الـ Status بيه Running وStopped وPaused.

[[Start-Service]]، [[Stop-Service]]، [[Restart-Service]] محتاجوا صلاحيات Admin.

[[Set-Service -StartupType Automatic]] يخلي الخدمة تبدأ مع ويندوز.

وكمان: [[sc.exe query]] و[[sc.exe start]] أوامر CMD بتشتغل في PowerShell وبعض الناس تعوّدت عليهم.`,
            when: "تشغيل وإيقاف خدمات ويندوز. تجهيز سيرفر ويندوز.",
            mistakes: "محاولة تشغيل أو إيقاف خدمة من PowerShell عادي. لازم RunAs Administrator."
          },
          teach: R`## الفكرة

الخدمات (services) برامج ويندوز بيشغّلها في الخلفية من غير نافذة. [[Get-Service]] بيعرضها، و [[Restart-Service]] بيعيد تشغيل واحدة. اتجرب في PowerShell 7.6 على ويندوز ١١، كيوزر عادي (مش أدمن).

---

## ١. [[Get-Service | Where-Object Status -eq Running]]

- [[Get-Service]] بيرجّع object لكل خدمة. على الجهاز ده ٣٠٨ خدمة.
- [[Where-Object Status -eq Running]] بيسيب الشغالة بس: ١٤٦.

~~~text أول الناتج
Status   Name               DisplayName
------   ----               -----------
Running  AMD Crash Defende… AMD Crash Defender Service
Running  AMD External Even… AMD External Events Utility
Running  AnyDesk            AnyDesk Service
~~~

| العمود | معناه |
|---|---|
| [[Status]] | [[Running]] شغالة، [[Stopped]] واقفة |
| [[Name]] | الاسم القصير: ده اللي بتكتبه في الأوامر |
| [[DisplayName]] | الاسم الطويل اللي بيظهر في [[services.msc]] |

و [[…]] معناها إن الاسم اتقص عشان العمود ضيق.

---

## ٢. [[Get-Service *docker*]]

[[*docker*]] = أي خدمة اسمها فيه docker:

~~~text الناتج
Status   Name               DisplayName
------   ----               -----------
Stopped  com.docker.service Docker Desktop Service
~~~

[[Stopped]]، مع إن Docker شغال عادي على الجهاز ده ([[docker info]] رد بنسخة السيرفر 29.6.1)، و [[StartType]] بتاعها [[Manual]]. يعني الخدمة دي مش هي Docker نفسه، وبتقوم بس لما حد يطلبها. فحالة خدمة لوحدها مش دايمًا بتقول البرنامج كله شغال ولا لأ.

ولو عايز تفاصيل خدمة واحدة:

~~~powershell
Get-Service Spooler | Format-List Name, DisplayName, Status, StartType
~~~

~~~text الناتج
Name        : Spooler
DisplayName : Print Spooler
Status      : Running
StartType   : Automatic
~~~

[[StartType]] بيقول الخدمة بتقوم إمتى: [[Automatic]] مع ويندوز، [[Manual]] لما حد يطلبها، [[Disabled]] متقومش خالص.

---

## ٣. [[Restart-Service com.docker.service]]

بيوقف الخدمة ويشغّلها تاني. ده **مش متجرب هنا** لأنه بيغيّر حالة النظام. حسب دليل Microsoft:

- محتاج PowerShell مفتوح كأدمن. من غير أدمن بيطلع error فيه [[Cannot open ... service on computer '.']]، والـ [[.]] معناها «الجهاز ده».
- جرّب الأول بـ [[-WhatIf]]: بيطبع سطر What if من غير ما يعمل حاجة.

| الأمر | بيعمل إيه |
|---|---|
| [[Start-Service اسم]] | شغّل |
| [[Stop-Service اسم]] | وقّف |
| [[Restart-Service اسم]] | وقّف وشغّل |
| [[Set-Service اسم -StartupType Manual]] | غيّر إمتى تقوم |

---

## الخلاصة

| عايز | ويندوز (PowerShell) | لينكس (systemd) |
|---|---|---|
| كل الخدمات | [[Get-Service]] | [[systemctl list-units --type=service]] |
| خدمة واحدة | [[Get-Service Spooler]] | [[systemctl status nginx]] |
| ريستارت | [[Restart-Service اسم]] (أدمن) | [[sudo systemctl restart nginx]] |

اكتب الـ [[Name]] مش الـ [[DisplayName]] في الأوامر، واقرا الـ DisplayName قبل ما توقف حاجة متعرفهاش.`,
          lines: [
            "الخدمات الشغالة بس.",
            "أي خدمة اسمها فيه docker.",
            "اعمل ريستارت لخدمة Docker (محتاج PowerShell كمدير)."
          ],
          sol: R`[[Get-Service *docker*]] بيطلع جدول [[Status  Name  DisplayName]]، زي [[Running  com.docker.service  Docker Desktop Service]]. لو مطلعش حاجة يبقى Docker Desktop مش متسطب أو نسختك مش بتسطب خدمة بالاسم ده، جرب أي خدمة موجودة زي [[Get-Service Spooler]] (خدمة الطباعة) أو [[Get-Service wuauserv]] (Windows Update).

Status بيبقى Running أو Stopped. و [[Restart-Service]] من غير أدمن هيطلع error فيه [[Cannot open ... service on computer '.']]، مش معناه إن الخدمة بايظة، معناه إنك محتاج تفتح PowerShell كأدمن. و Get-Service على ويندوز بس، على لينكس المقابل [[systemctl status]].`
        }
      ]
    }
]);
