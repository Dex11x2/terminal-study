// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
    {
      t: "ويندوز: قائمة Run (Win+R)",
      l: 2,
      n: "Win+R واكتب اسم الأداة: أسرع طريق لأي حاجة في النظام من غير ما تدوّر",
      items: [
        {
          cmd: "Win+R",
          title: "شغّل أي أداة في ويندوز باسمها",
          desc: R`Win+R بيفتح خانة Run صغيرة: اكتب اسم برنامج أو أداة أو فولدر ودوس Enter. [[cmd]] يفتح CMD، و [[wt]] يفتح Windows Terminal، و [[.]] يفتح فولدر اليوزر بتاعك.

والأهم: بدل Enter دوس Ctrl+Shift+Enter والبرنامج يفتح كأدمن. كده تفتح ملف hosts للتعديل في خطوة واحدة (شرح الملف نفسه في تاب CMD وتاب PowerShell).`,
          example: R`Win+R → cmd                      CMD
Win+R → wt                       Windows Terminal
Win+R → .                        your user folder (C:\Users\you)
Win+R → cmd → Ctrl+Shift+Enter   CMD as administrator
Win+R → notepad C:\Windows\System32\drivers\etc\hosts → Ctrl+Shift+Enter
Win+R → http://localhost:3000    open it in the default browser
Win+R → Up/Down                  previous things you ran`,
          try: "افتح ملف hosts في Notepad كأدمن بـ Ctrl+Shift+Enter من Win+R، واقرا اللي فيه من غير ما تعدّل حاجة، واقفل.",
          flag: "keys",
          deep: {
            why: "أدوات ويندوز المهمة (الخدمات، متغيرات البيئة، الفايروول) مدفونة جوه قوايم. كل واحدة ليها اسم قصير تكتبه في Run وتوصلها على طول.",
            how: R`Run بيفهم أربع حاجات: اسم برنامج موجود في الـ PATH ([[notepad]]، [[cmd]])، ومسار فولدر أو ملف، ومتغيرات زي [[%temp%]]، ولينكات زي [[http://]] و [[ms-settings:]]. كل ده هتشوفه في الدروس الجاية.

Ctrl+Shift+Enter بيطلب صلاحيات أدمن، فهتطلعلك نافذة UAC توافق عليها.`,
            when: "كل مرة تحتاج أداة من أدوات النظام، أو أمر كأدمن بسرعة.",
            mistakes: "تعدّل hosts من Notepad عادي فيقولك Access denied وقت الحفظ. لازم يتفتح كأدمن من الأول. وبعد الحفظ [[ipconfig /flushdns]] (في تاب CMD)."
          },
          teach: R`## الفكرة: خانة واحدة بتفهم ٤ أنواع كلام

Win+R (R من Run) بيفتح نافذة صغيرة تحت شمال فيها خانة واحدة. اللي بتكتبه فيها لازم يبقى واحد من أربعة: اسم برنامج، أو مسار، أو متغير، أو لينك. المثال فيه من كل نوع، نفكه سطر سطر.

---

## ١. اسم برنامج

~~~text
Win+R → cmd                      CMD
Win+R → wt                       Windows Terminal
~~~

Run بيدوّر على الاسم في فولدرات الـ PATH (نفس الفولدرات اللي الترمنال بيدوّر فيها). تقدر تعرف هو هيلاقي إيه بنفس السؤال من PowerShell:

~~~powershell
Get-Command cmd, wt | Format-Table Name, Source
~~~

~~~text الناتج على جهاز الدرس
Name    Source
----    ------
cmd.exe C:\WINDOWS\system32\cmd.exe
wt.exe  C:\Users\you\AppData\Local\Microsoft\WindowsApps\wt.exe
~~~

مش محتاج تكتب [[.exe]]، ويندوز بيكمّلها.

---

## ٢. مسار

~~~text
Win+R → .                        your user folder (C:\Users\you)
~~~

[[.]] لوحدها مسار معناه «الفولدر الحالي»، و Run فولدره الحالي هو فولدر اليوزر، فبيفتحه في Explorer. أي مسار فولدر تاني ([[C:\Windows]]) بيتفتح في Explorer برضه، ومسار ملف بيتفتح بالبرنامج الافتراضي بتاعه.

---

## ٣. أدمن: Ctrl+Shift+Enter

~~~text
Win+R → cmd → Ctrl+Shift+Enter   CMD as administrator
Win+R → notepad C:\Windows\System32\drivers\etc\hosts → Ctrl+Shift+Enter
~~~

السطر التاني فيه حاجتين: برنامج ([[notepad]]) وبعده مسافة وبعدها **argument** (الحاجة اللي البرنامج يشتغل عليها)، هنا مسار ملف hosts. و Ctrl+Shift+Enter بيشغّل الاتنين كأدمن، فـ Notepad يقدر يحفظ الملف (ده ملف نظام).

ملف hosts بيربط أسامي بـ IPs قبل ما الجهاز يسأل الـ DNS. قريت آخره من PowerShell عادي (القراية مش محتاجة أدمن):

~~~powershell
Get-Content C:\Windows\System32\drivers\etc\hosts | Select-Object -Last 6
~~~

~~~text الناتج على جهاز الدرس
# Added by Docker Desktop
192.168.1.4 host.docker.internal
192.168.1.4 gateway.docker.internal
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section
~~~

| السطر | يعني |
|---|---|
| بيبدأ بـ [[#]] | تعليق، الجهاز بيتجاهله |
| [[192.168.1.4 host.docker.internal]] | IP وبعده اسم: لما حاجة تطلب الاسم ده، رد بالـ IP ده |

يعني Docker Desktop ضاف سطوره لوحده. وده سبب تاني تفتح الملف وتقراه قبل ما تعدّل.

---

## ٤. لينك

~~~text
Win+R → http://localhost:3000    open it in the default browser
~~~

أي حاجة بتبدأ بنوع لينك ([[http:]] أو [[https:]] أو [[ms-settings:]]) بتتفتح بالبرنامج المسجّل للنوع ده، هنا المتصفح الافتراضي.

---

## ٥. التاريخ

~~~text
Win+R → Up/Down                  previous things you ran
~~~

Run بيفتكر اللي كتبته قبل كده، والأسهم بتلف عليه. والخانة نفسها فيها سهم تحت بيفتح اللستة.

> سلوك نافذة Run من دوكيومنتيشن مايكروسوفت (مش متجرّب لأنه بيفتح نوافذ). أوامر PowerShell اتشغّلت فعلًا في pwsh 7.

---

## الخلاصة

| اللي بتكتبه | مثال | بيحصل إيه |
|---|---|---|
| اسم برنامج | [[cmd]] | يشغّله من الـ PATH |
| مسار | [[.]] أو [[C:\Windows]] | يفتحه في Explorer |
| متغير | [[%temp%]] | يبدّله بالمسار ويفتحه |
| لينك | [[http://localhost:3000]] | البرنامج الافتراضي |
| أي واحد فيهم + Ctrl+Shift+Enter | | كأدمن |`,
          sol: R`Win+R، اكتب [[notepad C:\Windows\System32\drivers\etc\hosts]] ودوس Ctrl+Shift+Enter (مش Enter)، هيطلع UAC دوس Yes. الملف هيفتح وكله سطور بتبدأ بـ [[#]]، يعني تعليقات، وآخرها [[# 127.0.0.1 localhost]] و [[# ::1 localhost]]. ده الطبيعي: ويندوز بيعرف localhost من غير الملف. لو فيه سطور من غير [[#]] (زي [[127.0.0.1 myapp.local]]) يبقى برنامج أو انت ضفتها قبل كده. اقفل من غير حفظ.

لو فتحت بـ Enter عادي، هيفتح بردو ويتقري، بس لو حاولت تحفظ هيقولك Access denied.`
        },
        {
          cmd: "%localappdata%",
          title: "فين البرامج بتحفظ إعداداتها والكاش بتاعها",
          desc: R`كل يوزر عنده فولدر AppData مخفي، جواه اتنين مهمين: [[%appdata%]] (اسمه Roaming) فيه الإعدادات، و [[%localappdata%]] (اسمه Local) فيه الكاش والبرامج اللي اتسطبت لليوزر ده بس.

هنا هتلاقي إعدادات VS Code، وحزم npm اللي سطبتها بـ [[-g]]، وكاش npm، وأي برنامج Electron اتسطب من غير أدمن.`,
          example: R`Win+R → %appdata%                 C:\Users\you\AppData\Roaming
Win+R → %localappdata%            C:\Users\you\AppData\Local
%appdata%\Code\User               VS Code settings.json, keybindings.json
%appdata%\npm                     global npm packages (npm i -g)
%localappdata%\npm-cache          npm download cache
%localappdata%\Programs           per-user apps (VS Code user install, ...)`,
          try: "افتح [[%appdata%\\Code\\User]] وشوف ملف [[settings.json]] بتاع VS Code. متعدّلش فيه من هنا، بس اعرف مكانه.",
          flag: "keys",
          deep: {
            why: "برنامج بايظ ومحتاج تمسح إعداداته، أو عايز تنقل إعدادات VS Code لجهاز جديد، أو الهارد مليان وعايز تعرف مين واكله.",
            how: R`[[%appdata%]] متغير بيئة، ويندوز بيبدّله بالمسار الحقيقي. نفس المتغير بيشتغل في CMD ([[cd %appdata%]]) وفي PowerShell ([[$env:APPDATA]]).

Roaming معمول عشان يتنقل مع اليوزر في شبكات الشركات، فبيبقى فيه الإعدادات الصغيرة. Local فيه الحاجات الكبيرة الخاصة بالجهاز ده: كاش، ولوجات، وبرامج. وفيه كمان [[LocalLow]] لبرامج قليلة.`,
            when: "تنظيف برنامج بايظ، إيجاد لوجات برنامج، معرفة ليه الهارد اتملى، نقل إعدادات.",
            mistakes: "تمسح فولدر برنامج من AppData وهو مفتوح، أو تمسحه وتفتكر إنه كاش بس فتضيع إعداداتك. اقفل البرنامج، وخد نسخة من الفولدر قبل ما تمسحه. ولكاش npm استخدم [[npm cache verify]] أو [[npm cache clean --force]] بدل المسح بإيدك."
          },
          teach: R`## الفكرة: [[%...%]] يعني «حط المسار هنا»

اللي بين علامتين [[%]] اسم **متغير بيئة** (environment variable): اسم قصير ويندوز شايل فيه قيمة، هنا مسار فولدر. Run و Explorer و CMD بيبدّلوا الاسم بقيمته قبل ما يفتحوا. فـ [[%localappdata%]] مش فولدر اسمه كده، ده «الفولدر اللي المتغير ده بيشاور عليه».

---

## ١. المتغيرين

~~~text
Win+R → %appdata%                 C:\Users\you\AppData\Roaming
Win+R → %localappdata%            C:\Users\you\AppData\Local
~~~

اتأكدت من قيمهم على جهاز الدرس بتلات طرق:

~~~cmd
echo %appdata% & echo %localappdata%
~~~

~~~powershell
$env:APPDATA
$env:LOCALAPPDATA
~~~

~~~text الناتج (نفسه في cmd و pwsh 7 و Windows PowerShell 5.1)
C:\Users\you\AppData\Roaming
C:\Users\you\AppData\Local
~~~

| الطريقة | الكتابة |
|---|---|
| Run و Explorer و CMD | [[%appdata%]] (الحروف الكبيرة والصغيرة مش فارقة) |
| PowerShell | [[$env:APPDATA]] |

### Roaming و Local

| | Roaming | Local |
|---|---|---|
| المتغير | [[%appdata%]] | [[%localappdata%]] |
| فيه إيه | إعدادات صغيرة | كاش ولوجات وبرامج كبيرة |
| ليه الاسم | في شبكات الشركات بيتنقل (roam) مع اليوزر لأي جهاز | خاص بالجهاز ده بس |

و [[AppData]] نفسه مخفي (عليه attribute الـ H)، عشان كده الأسهل توصله بالمتغير بدل ما تدوّر عليه.

---

## ٢. الفولدرات المهمة جواهم

~~~text
%appdata%\Code\User               VS Code settings.json, keybindings.json
%appdata%\npm                     global npm packages (npm i -g)
%localappdata%\npm-cache          npm download cache
%localappdata%\Programs           per-user apps (VS Code user install, ...)
~~~

المتغير بيتحط في أول المسار، والباقي فولدرات عادية جواه. اتأكدت إن الأربعة موجودين على جهاز الدرس بـ [[Test-Path]] (بيرجع [[True]] لو المسار موجود):

~~~powershell
Test-Path "$env:APPDATA\Code\User\settings.json"
Test-Path "$env:APPDATA\npm"
Test-Path "$env:LOCALAPPDATA\npm-cache"
Test-Path "$env:LOCALAPPDATA\Programs"
~~~

~~~text الناتج
True
True
True
True
~~~

| الفولدر | مين بيكتب فيه |
|---|---|
| [[Code\User]] | VS Code: إعداداتك واختصاراتك و snippets |
| [[npm]] | [[npm i -g]]: الحزم اللي بتسطبها global وأوامرها |
| [[npm-cache]] | npm: نسخ من كل حزمة نزلت، عشان المرة الجاية ميحمّلهاش |
| [[Programs]] | برامج اتسطبت لليوزر ده بس من غير أدمن، زي VS Code (User installer) |

---

## الخلاصة

- [[%name%]] = قيمة متغير، و Run بيفتح المسار اللي فيه.
- Roaming = إعدادات، Local = كاش وبرامج.
- قبل ما تمسح حاجة من هنا: اقفل البرنامج وخد نسخة.`,
          sol: R`[[%appdata%\Code\User]] هيفتح [[C:\Users\you\AppData\Roaming\Code\User]] وفيه [[settings.json]]، وممكن [[keybindings.json]] و فولدر [[snippets]]. افتحه بـ Notepad للقراية بس: هتلاقي الإعدادات اللي غيّرتها من واجهة VS Code مكتوبة JSON، زي [["editor.fontSize": 16]].

لو الفولدر مش موجود، يبقى VS Code مش متسطب على اليوزر ده أو عمرك ما غيّرت إعداد. ولو بتستخدم VS Code Insiders، الفولدر اسمه [[Code - Insiders]]. وفي الـ Portable version الإعدادات جوه فولدر [[data]] جنب البرنامج نفسه.`
        },
        {
          cmd: "%temp%",
          title: "نضّف الملفات المؤقتة اللي واكلة الهارد",
          desc: R`[[%temp%]] هو فولدر الملفات المؤقتة لليوزر بتاعك. أدوات التسطيب والـ builds والمتصفحات بتسيب فيه حاجات ومبتمسحهاش، فممكن يوصل لكذا جيجا.

تقدر تحدد كله وتمسحه، والملفات اللي برنامج شغال ماسكها هترفض تتمسح، اعمل Skip ليها. والأأمن من ده كله أداة ويندوز نفسها: Settings ← System ← Storage ← Temporary files، أو [[cleanmgr]].`,
          example: R`Win+R → %temp%                   C:\Users\you\AppData\Local\Temp
Ctrl+A → Delete                  delete what you can
"File in use" → Skip             leave files that apps still hold
Win+R → cleanmgr                 Disk Cleanup (safe, built in)
Win+R → ms-settings:storagesense Storage → Temporary files`,
          try: "افتح [[%temp%]] واعمل Ctrl+A وبص في شريط الحالة تحت على الحجم، من غير ما تمسح. بعدين جرّب ms-settings:storagesense وشوف Temporary files بتقول كام.",
          flag: "keys danger",
          deep: {
            why: "الهارد C بيتملي والجهاز يبطّأ. الملفات المؤقتة غالبًا من أسهل الحاجات اللي تتمسح.",
            how: R`البرامج بتكتب في [[%temp%]] ملفات وقت الشغل (فك ضغط installer، ملفات build وسيطة) والمفروض تمسحها بعد ما تخلص، بس كتير مبتمسحش.

ملف مفتوح في برنامج شغال مش هيتمسح، وويندوز هيقولك «The action can't be completed». ده الطبيعي، اعمل Skip. [[cleanmgr]] وصفحة Storage بيمسحوا الأنواع الآمنة بس.`,
            when: "الهارد قرب يتملي. بعد ما تسطّب برامج كبيرة (Visual Studio، Android Studio).",
            mistakes: R`تمسح من [[%temp%]] وفيه installer لسه شغال، فالتسطيب يبوظ في النص. اقفل البرامج وأنسب وقت بعد restart. والأخطر: متقربش من [[C:\Windows\Installer]] ولا [[C:\Windows\WinSxS]] حتى لو كبار، مسحهم بيبوّظ تحديث وإزالة البرامج. ومتستخدمش برامج «تنظيف» من مصادر مش معروفة.`
          },
          teach: R`## الفكرة: فولدر المؤقت اللي محدش بينضّفه

[[%temp%]] متغير بيئة قيمته فولدر الملفات المؤقتة بتاعك. البرامج المفروض تمسح اللي بتكتبه فيه، بس كتير مبتعملش. نفك الجدول، ونشوف الحجم الحقيقي على جهاز.

---

## ١. افتحه

~~~text
Win+R → %temp%                   C:\Users\you\AppData\Local\Temp
~~~

~~~powershell
$env:TEMP
~~~

~~~text الناتج على جهاز الدرس
C:\Users\you\AppData\Local\Temp
~~~

يعني فولدر [[Temp]] جوه [[%localappdata%]]. نفس القيمة طلعت من [[echo %temp%]] في CMD.

### الحجم الحقيقي

قسته من غير ما أمسح حاجة (pwsh 7):

~~~powershell
Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
~~~

| الحتة | معناها |
|---|---|
| [[Get-ChildItem $env:TEMP]] | هات اللي في الفولدر |
| [[-Recurse]] | وكل الفولدرات اللي جواه |
| [[-File]] | الملفات بس |
| [[-Force]] | والمخفي كمان |
| [[-ErrorAction SilentlyContinue]] | لو ملف مقفول متطبعش error، كمّل |
| [[Measure-Object Length -Sum]] | اجمع الأحجام ([[Length]] = حجم الملف بالبايت) |

النتيجة بعد ما قسمتها على [[1MB]]: حوالي **3,512.8 MB في 39,523 ملف**، يعني ٣.٥ جيجا. ده على جهاز بيتستخدم للتطوير كل يوم.

---

## ٢. امسح اللي ينفع

~~~text
Ctrl+A → Delete                  delete what you can
"File in use" → Skip             leave files that apps still hold
~~~

- Ctrl+A = حدد الكل، و Delete = لسلة المهملات (Shift+Delete نهائي).
- ملف برنامج شغال فاتحه **مش هيتمسح**، وويندوز يقولك إنه in use. علّم «Do this for all current items» ودوس Skip.

ليه بيرفض؟ جربت على ملف في فولدر التجارب: فتحته من PowerShell بطريقة بتمنع أي حد تاني يلمسه، وحاولت أمسحه وهو مفتوح:

~~~text الناتج
The process cannot access the file '...\package.json' because it is being used by another process.
~~~

وده بالظبط اللي بيحصل في [[%temp%]] مع installer لسه شغال، وده اللي بيحميه.

---

## ٣. الطرق الآمنة

~~~text
Win+R → cleanmgr                 Disk Cleanup (safe, built in)
Win+R → ms-settings:storagesense Storage → Temporary files
~~~

| الأداة | هي إيه |
|---|---|
| [[cleanmgr]] | Disk Cleanup، اسم الملف الحقيقي [[cleanmgr.exe]] ووصفه «Disk Space Cleanup Manager for Windows» |
| [[ms-settings:storagesense]] | صفحة Storage في Settings، وجواها Temporary files بأنواع كتير تختار منها |

الاتنين بيمسحوا الأنواع اللي ويندوز عارف إنها آمنة بس، وبيحسبوا حاجات أكتر من [[%temp%]] (زي بقايا Windows Update وسلة المهملات).

> المسح نفسه مش متجرّب على الجهاز (تغيير). القياس والقراية اتشغّلوا فعلًا.

---

## الخلاصة

- [[%temp%]] = [[AppData\Local\Temp]]، وممكن يوصل جيجات.
- امسح بعد restart، و Skip لأي ملف in use.
- الأأمن: Storage ← Temporary files.
- متقربش من [[C:\Windows\Installer]] ولا [[WinSxS]].`,
          sol: R`بعد Ctrl+A شريط الحالة تحت شمال في Explorer هيقول حاجة زي «2,345 items selected 1.8 GB». الرقم بيفرق من جهاز لجهاز، من ميجات قليلة لكذا جيجا لو الجهاز عمره ما اتنضف. [[ms-settings:storagesense]] هيفتح Storage، ادخل Temporary files هيحسب شوية ويوريك رقم أكبر، لأنه بيحسب حاجات تانية زي Windows Update Cleanup و Recycle Bin.

لو شريط الحالة مش ظاهر، فعّله من View ثم Show ثم Status bar. ولو الحجم ظهر صغير أوي والجهاز واكل مساحة، المشكلة في حتة تانية (غالبًا node_modules قديمة أو صور Docker أو ملف WSL). ومتمسحش من Temporary files «Downloads» لو هو متعلّم.`
        },
        {
          cmd: "shell:startup",
          title: "خلّي حاجة تشتغل أول ما تفتح الجهاز",
          desc: R`[[shell:startup]] بيفتح فولدر الـ Startup بتاعك: أي shortcut تحطه فيه بيشتغل لوحده أول ما تعمل login. تحط فيه shortcut لسكربت بتحتاجه كل يوم، أو لبرنامج.

وفي نفس العيلة [[shell:sendto]]: حط فيه shortcut لـ VS Code، ويبقى عندك كليك يمين على أي فولدر ← Send to ← VS Code.`,
          example: R`Win+R → shell:startup          your Startup folder (runs at login)
Win+R → shell:common startup   Startup for all users (needs admin)
Win+R → shell:sendto           the "Send to" right-click menu
Win+R → shell:appsfolder       every installed app, including Store apps
Ctrl+Shift+Esc → Startup apps  disable heavy apps that start with Windows`,
          try: "افتح [[shell:sendto]] واعمل فيه shortcut لـ Notepad (كليك يمين ← New ← Shortcut ← notepad). بعدين كليك يمين على أي ملف ← Show more options ← Send to ← Notepad.",
          flag: "keys",
          deep: {
            why: "حاجات بتفتحها كل يوم أول ما تقعد، أو برامج بتقوم لوحدها وتبطّأ الجهاز ومش عارف منين.",
            how: R`[[shell:]] أسماء مختصرة لفولدرات خاصة في ويندوز. [[shell:startup]] هو في الحقيقة [[%appdata%\Microsoft\Windows\Start Menu\Programs\Startup]].

البرامج اللي بتقوم مع الجهاز مش كلها في الفولدر ده، أغلبها مسجلة في أماكن تانية. عشان كده القايمة الكاملة في Task Manager ← Startup apps (أو [[ms-settings:startupapps]])، ومن هناك تقفل أي واحد.`,
            when: "سكربت يجهّز بيئة الشغل. برنامج بطيء بيقوم مع الجهاز ومحتاج تقفله.",
            mistakes: "تحط Docker Desktop أو برامج تقيلة في Startup فالجهاز يبقى بطيء أول ما يفتح. البرامج اللي ليها خيار «Start on login» في إعداداتها، اقفلها من هناك أحسن من الفولدر."
          },
          teach: R`## الفكرة: [[shell:]] أسامي مختصرة لفولدرات خاصة

ويندوز عنده فولدرات ليها وظيفة (Startup، Send to، الصور...) ومكانها الحقيقي طويل ومختلف من جهاز لجهاز. [[shell:]] وبعده اسم بيوصلك ليها على طول. الأسامي دي متسجلة في الـ registry، وعلى جهاز الدرس قريت عددهم: **134 اسم**.

---

## ١. Startup

~~~text
Win+R → shell:startup          your Startup folder (runs at login)
Win+R → shell:common startup   Startup for all users (needs admin)
~~~

المكان الحقيقي، من PowerShell:

~~~powershell
[Environment]::GetFolderPath("Startup")
[Environment]::GetFolderPath("CommonStartup")
~~~

~~~text الناتج على جهاز الدرس
C:\Users\you\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
~~~

- [[[Environment]::GetFolderPath]] دالة في .NET بتسأل ويندوز «الفولدر الخاص ده مكانه فين؟».
- الأول جوه [[%appdata%]] بتاعك: يشتغل لما **انت** تعمل login.
- التاني في [[C:\ProgramData]]: لكل اليوزرز، ومحتاج أدمن عشان تحط فيه.

أي shortcut (اختصار، ملف [[.lnk]]) في الفولدر ده بيشتغل بعد الـ login.

---

## ٢. Send to و AppsFolder

~~~text
Win+R → shell:sendto           the "Send to" right-click menu
Win+R → shell:appsfolder       every installed app, including Store apps
~~~

| الاسم | الفولدر | فايدته |
|---|---|---|
| [[shell:sendto]] | [[%appdata%\Microsoft\Windows\SendTo]] | كل shortcut فيه بيظهر في قايمة Send to |
| [[shell:appsfolder]] | فولدر افتراضي (مش على الديسك) | كل البرامج، حتى بتاعة الـ Store، وتعمل منها shortcut بالسحب |

---

## ٣. القايمة الكاملة للي بيقوم مع الجهاز

~~~text
Ctrl+Shift+Esc → Startup apps  disable heavy apps that start with Windows
~~~

فولدر Startup **مش** المكان الوحيد. سألت ويندوز عن البرامج اللي بتقوم مع الجهاز (قراية بس):

~~~powershell
Get-CimInstance Win32_StartupCommand | Select-Object -First 3 | Format-Table Name, Location
~~~

~~~text الناتج على جهاز الدرس
Name                 Location
----                 --------
DeepL auto-start     Startup
Discord              HKU\...\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
AMDNoiseSuppression  HKU\...\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
~~~

- اللي Location بتاعه [[Startup]] جاي من الفولدر ده.
- اللي Location بتاعه مفتاح [[...\CurrentVersion\Run]] في الـ registry البرنامج سجّل نفسه هناك، ومش هتلاقيه في الفولدر.

عشان كده تاب Startup apps في Task Manager هو اللي فيه القايمة الكاملة، ومنه تعمل Disable.

---

## الخلاصة

| الاسم | بيوديك فين |
|---|---|
| [[shell:startup]] | Startup بتاعك |
| [[shell:common startup]] | Startup لكل اليوزرز |
| [[shell:sendto]] | قايمة Send to |
| [[shell:appsfolder]] | كل البرامج |

ولو عايز تعرف كل اللي بيقوم مع الجهاز: Task Manager ← Startup apps.`,
          sol: R`في [[shell:sendto]]: كليك يمين في مكان فاضي ثم New ثم Shortcut، اكتب [[notepad]] ثم Next، وسمّيه [[Notepad]] ثم Finish. بعدين كليك يمين على أي ملف ثم «Show more options» (أو Shift+F10 أو Shift + كليك يمين عشان توصل للقايمة القديمة على طول) ثم Send to: هتلاقي Notepad في اللستة، ودوسه يفتح الملف فيه.

لو New ثم Shortcut مش ظاهرين، يبقى انت عملت كليك يمين على ملف مش في مكان فاضي. ولو Notepad ظهر ومفتحش الملف، اتأكد إنك كتبت [[notepad]] بس مش [[notepad.exe %1]]، ويندوز بيبعت اسم الملف لوحده.`
        },
        {
          cmd: "rundll32 sysdm.cpl,EditEnvironmentVariables",
          title: "عدّل PATH ومتغيرات البيئة من الواجهة",
          desc: R`الأمر ده في Win+R بيفتح نافذة Environment Variables على طول. هنا بتضيف فولدر لـ PATH عشان [[node]] أو [[python]] أو [[git]] يشتغلوا من أي ترمنال، أو بتعمل متغير دائم.

الطريق الطويل لنفس النافذة: [[sysdm.cpl]] ← Advanced ← Environment Variables. أو دوس Win واكتب «env».`,
          example: R`Win+R → rundll32 sysdm.cpl,EditEnvironmentVariables
Win+R → sysdm.cpl → Advanced → Environment Variables   same window
User variables → Path → Edit → New → C:\Users\you\AppData\Roaming\npm
Move Up / Move Down            the first match in PATH wins
OK → close ALL terminals and VS Code, then reopen`,
          try: "افتح النافذة، ادخل على Path بتاع اليوزر، واقرا الفولدرات اللي فيه من غير ما تغيّر حاجة. بعدين قارنها بـ [[$env:PATH -split ';']] في PowerShell.",
          flag: "keys",
          deep: {
            why: "«'node' is not recognized as an internal or external command». البرنامج متسطب بس فولدره مش في PATH.",
            how: R`فيه نوعين: User variables ليك انت بس ومش محتاجة أدمن، و System variables لكل اليوزرز ومحتاجة أدمن. الـ PATH النهائي هو System وبعده User.

ويندوز بيدوّر على الأمر في فولدرات PATH بالترتيب وياخد أول واحد يلاقيه، عشان كده Move Up بيفرق لو عندك نسختين من Python.

أي برنامج شغال بياخد نسخة من المتغيرات وقت ما اتفتح. التغيير مش هيوصل لترمنال مفتوح، ولا للترمنال اللي جوه VS Code لحد ما تقفل VS Code كله وتفتحه. للجلسة الحالية بس: [[$env:]] في تاب PowerShell و [[set / setx]] في تاب CMD.`,
            when: "بعد تسطيب لغة أو أداة والترمنال مش شايفها. أو عايز متغير زي [[JAVA_HOME]] دائم.",
            mistakes: R`[[python]] بيفتح Microsoft Store بدل Python: ده alias من ويندوز في [[WindowsApps]] جاي قبل Python في PATH. اقفله من Settings ← Apps ← Advanced app settings ← App execution aliases. وخالص متستخدمش [[setx PATH]]، ممكن يقص الـ PATH ويمسح نصه، عدّل من النافذة دي.`
          },
          teach: R`## الفكرة: الأمر بيفتح نافذة واحدة جوه ملف فيه نوافذ كتير

الأمر شكله غريب، بس هو ٣ حتت. ملف [[sysdm.cpl]] فيه نافذة System Properties كلها، والأمر بيقوله «افتح جزء متغيرات البيئة بس». نفكه من جوه لبرة.

---

## ١. [[sysdm.cpl]]

امتداد [[.cpl]] اختصار Control Panel: كل ملف [[.cpl]] صفحة من Control Panel القديمة. و [[sysdm]] من System. الملف موجود في [[C:\Windows\System32]]، وأول حرفين فيه:

~~~bash
head -c 2 /c/Windows/System32/sysdm.cpl
~~~

~~~text الناتج (Git Bash على جهاز الدرس)
MZ
~~~

[[MZ]] هي العلامة اللي بيبدأ بيها أي برنامج أو DLL في ويندوز. يعني [[.cpl]] في الحقيقة **DLL**: ملف فيه دوال (functions) جاهزة، بس مبيشتغلش لوحده.

---

## ٢. [[,EditEnvironmentVariables]]

اسم دالة جوه الـ DLL، والفاصلة بتفصل اسم الملف عن اسم الدالة. اتأكدت إن الاسم موجود جوه الملف:

~~~bash
grep -c "EditEnvironmentVariables" /c/Windows/System32/sysdm.cpl
~~~

~~~text الناتج
1
~~~

[[grep -c]] بيعدّ السطور اللي فيها الكلمة: [[1]] يعني موجودة.

> متحطش مسافة بعد الفاصلة: [[sysdm.cpl, EditEnvironmentVariables]] غلط.

---

## ٣. [[rundll32]]

بما إن الـ DLL مبيشتغلش لوحده، محتاج برنامج يحمّله وينادي الدالة. ده شغل [[rundll32.exe]] (من [[C:\Windows\System32]]): «شغّل DLL، 32 من أيام ويندوز 32 بت».

~~~text الأمر كله
rundll32      sysdm.cpl      ,EditEnvironmentVariables
مين يشغّل      أنهي ملف       أنهي دالة جواه
~~~

---

## ٤. باقي الجدول

~~~text
Win+R → sysdm.cpl → Advanced → Environment Variables   same window
User variables → Path → Edit → New → C:\Users\you\AppData\Roaming\npm
Move Up / Move Down            the first match in PATH wins
OK → close ALL terminals and VS Code, then reopen
~~~

- [[sysdm.cpl]] لوحده بيفتح System Properties كلها، ومن تاب Advanced زرار Environment Variables. نفس النافذة، بخطوتين زيادة.
- **Path** متغير فيه لستة فولدرات. Edit بيعرضها سطر سطر، و New يضيف فولدر.
- **الترتيب بيفرق**: الترمنال بيدوّر بالترتيب وياخد أول واحد يلاقيه.

### الترتيب بالتجربة

على جهاز الدرس، سألت PowerShell عن كل [[python]] في الـ PATH بالترتيب:

~~~powershell
(Get-Command python -All).Source
~~~

~~~text الناتج
C:\Users\you\AppData\Local\Microsoft\WindowsApps\python.exe
C:\Users\you\AppData\Local\Python\bin\python.exe
~~~

[[-All]] يعني «هات كل اللي لقيته مش أول واحد بس». الأول هو اللي بيشتغل لما تكتب [[python]]، وده alias من ويندوز في [[WindowsApps]] جاي قبل Python الحقيقي. ده بالظبط اللي Move Up / Move Down بيحله (أو App execution aliases).

### ليه تقفل كل الترمنالات

كل برنامج بياخد نسخة من المتغيرات وقت ما يفتح. الترمنال المفتوح عنده النسخة القديمة، والترمنال جوه VS Code ورث نسخة VS Code، فلازم VS Code كله يتقفل.

> فتح النافذة نفسها والتعديل فيها مش متجرّب (بيفتح نافذة وبيغيّر إعدادات). فحص الملف و [[Get-Command]] اتشغّلوا فعلًا.

---

## الخلاصة

| الحتة | هي إيه |
|---|---|
| [[rundll32]] | البرنامج اللي بيشغّل دالة من DLL |
| [[sysdm.cpl]] | DLL صفحة System في Control Panel |
| [[,EditEnvironmentVariables]] | الدالة اللي بتفتح نافذة متغيرات البيئة على طول |`,
          sol: R`نافذة Environment Variables فيها جزئين: User variables فوق و System variables تحت. Path بتاع اليوزر غالبًا فيه حاجات زي [[%USERPROFILE%\AppData\Local\Microsoft\WindowsApps]] و [[...\Programs\Microsoft VS Code\bin]] و [[...\AppData\Roaming\npm]]. في PowerShell [[$env:PATH -split ';']] هيطبع فولدر في كل سطر: هتلاقي فولدرات System الأول (زي [[C:\Windows\system32]])، وبعدين بتوع اليوزر، و [[%USERPROFILE%]] متحوّل للمسار الحقيقي.

الترتيب ده هو السبب إن برنامج في System Path بيكسب على نسخة تانية في User Path. ولو PowerShell عرض فولدرات مش موجودة في النافذة، غالبًا البرنامج اللي فتحت منه الترمنال ضافها لنفسه (زي VS Code أو nvm)، أو الترمنال مفتوح من قبل ما تغيّر حاجة. دوس Cancel مش OK لو معدلتش.`
        },
        {
          cmd: "optionalfeatures",
          title: "فعّل WSL و Hyper-V ومزايا ويندوز المقفولة",
          desc: R`[[optionalfeatures]] بيفتح Windows Features: قايمة مزايا موجودة في ويندوز بس مقفولة. أهمها للمبرمج: Windows Subsystem for Linux و Virtual Machine Platform (الاتنين لـ WSL 2 و Docker Desktop)، و Hyper-V و Windows Sandbox (في نسخة Pro بس).

علّم ودوس OK وهيطلب restart. بس لـ WSL الأسهل [[wsl --install]] اللي بيعمل ده كله لوحده (متشرح في تاب WSL).`,
          example: R`Win+R → optionalfeatures          Windows Features
[x] Windows Subsystem for Linux    WSL
[x] Virtual Machine Platform       WSL 2 / Docker Desktop
[x] Hyper-V                        Pro / Enterprise only
[x] Windows Sandbox                Pro / Enterprise only
OK → Restart now
Win+R → winver                     which edition and build you have`,
          try: "افتح [[optionalfeatures]] وشوف إيه المفعّل عندك. بعدين [[winver]] واعرف نسختك Home ولا Pro.",
          flag: "keys",
          deep: {
            why: "Docker Desktop بيقولك «WSL 2 is not installed» أو «Virtual Machine Platform not enabled»، أو عايز Windows Sandbox تجرّب فيه برنامج.",
            how: R`المزايا دي جزء من ويندوز وبتتفعّل من غير تحميل حاجة كبيرة. تفعيلها بيعدّل النظام نفسه، عشان كده محتاج restart.

كل ده محتاج Virtualization مفعّلة في الـ BIOS. اعرف من Task Manager ← Performance ← CPU ← Virtualization. لو Disabled، لازم تفعّلها من BIOS/UEFI (اسمها Intel VT-x أو AMD-V أو SVM).

نسخة Home مفيهاش Hyper-V ولا Windows Sandbox ولا [[gpedit.msc]] ولا [[lusrmgr.msc]]، و WSL 2 و Docker Desktop شغالين عليها عادي. [[winver]] بيقولك النسخة والـ build.`,
            when: "أول ما تجهز جهاز للتطوير. أو لما Docker أو WSL يشتكوا.",
            mistakes: "تدوّر على Hyper-V على نسخة Home وتفتكر فيه مشكلة. هو مش موجود أصلًا. وبعض برامج الـ VM القديمة (VirtualBox و VMware قديمين) بتتعارض مع Hyper-V، حدّثها."
          },
          teach: R`## الفكرة: ويندوز فيه حاجات متسطبة بس مقفولة

[[optionalfeatures]] (يعني «المزايا الاختيارية») بيفتح نافذة Windows Features: لستة أجزاء من ويندوز تقدر تشغّلها أو تقفلها. الملف نفسه [[OptionalFeatures.exe]] في [[System32]]، ووصفه في خصائصه «Windows Features». نفك الجدول.

---

## ١. المزايا المهمة

~~~text
Win+R → optionalfeatures          Windows Features
[x] Windows Subsystem for Linux    WSL
[x] Virtual Machine Platform       WSL 2 / Docker Desktop
[x] Hyper-V                        Pro / Enterprise only
[x] Windows Sandbox                Pro / Enterprise only
~~~

الـ [x] في الجدول معناها checkbox متعلّم. تقدر تشوف حالتهم من غير ما تفتح النافذة (قراية بس، ومش محتاجة أدمن):

~~~powershell
Get-CimInstance Win32_OptionalFeature | Where-Object Name -in "Microsoft-Windows-Subsystem-Linux","VirtualMachinePlatform","Microsoft-Hyper-V-All","Containers-DisposableClientVM" | Format-Table Name, InstallState
~~~

~~~text الناتج على جهاز الدرس (ويندوز 11 Home)
Name                              InstallState
----                              ------------
VirtualMachinePlatform                       1
Microsoft-Windows-Subsystem-Linux            1
~~~

| الحتة | معناها |
|---|---|
| [[Win32_OptionalFeature]] | كتالوج المزايا الاختيارية |
| [[Where-Object Name -in ...]] | خد بس اللي اسمه واحد من دول |
| [[InstallState 1]] | متفعّلة (2 = مقفولة) |

الأسامي هنا هي الأسامي التقنية: [[Microsoft-Hyper-V-All]] هو Hyper-V، و [[Containers-DisposableClientVM]] هو Windows Sandbox. وطلبت ٤ وطلع **اتنين بس**: Hyper-V و Sandbox مش موجودين أصلًا في نسخة Home، مش مقفولين.

---

## ٢. Restart

~~~text
OK → Restart now
~~~

تفعيل ميزة بيعدّل أجزاء من النظام نفسه، فمش بتشتغل غير بعد restart.

---

## ٣. نسختك إيه

~~~text
Win+R → winver                     which edition and build you have
~~~

[[winver]] (Windows version) بيفتح نافذة About Windows. ونفس المعلومة من الـ registry:

~~~powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" | Format-List ProductName, EditionID, DisplayVersion, CurrentBuild
~~~

~~~text الناتج على جهاز الدرس
ProductName    : Windows 10 Home Single Language
EditionID      : CoreSingleLanguage
DisplayVersion : 26H2
CurrentBuild   : 26300
~~~

- [[EditionID]]: [[Core]] = Home. لو Pro هتلاقي [[Professional]].
- [[CurrentBuild]]: 26300، وأي build من 22000 وطالع يبقى ويندوز 11.
- [[ProductName]] مكتوب فيه «Windows 10» مع إن الجهاز ويندوز 11! ده خطأ قديم معروف مايكروسوفت سابته عشان البرامج القديمة. عشان كده اعتمد على [[winver]] أو رقم الـ build مش على الاسم ده.

---

## الخلاصة

- [[optionalfeatures]] = شغّل أو اقفل أجزاء من ويندوز، وبعدها restart.
- WSL 2 و Docker Desktop محتاجين Virtual Machine Platform، وده موجود في Home.
- Hyper-V و Sandbox في Pro وأعلى بس.
- اعرف نسختك من [[winver]] أو EditionID.`,
          sol: R`نافذة Windows Features هتعرض لستة بـ checkboxes. لو WSL متسطب هتلاقي «Windows Subsystem for Linux» و «Virtual Machine Platform» متعلّم عليهم. المربع المملي نص (مربع صغير جوه) معناه إن جزء من الخاصية بس متفعّل. [[winver]] هيفتح نافذة «About Windows» فيها سطر زي «Windows 11 Home» أو «Windows 11 Pro»، والـ Version (زي 24H2 أو 25H2) والـ OS Build.

لو Hyper-V و Windows Sandbox مش ظاهرين خالص، ده معناه إن نسختك Home، مش مشكلة. WSL 2 و Docker Desktop بيشتغلوا على Home عادي بـ Virtual Machine Platform. ولو فعّلت حاجة، لازم restart وإلا مش هتشتغل.`
        },
        {
          cmd: "ms-settings:",
          title: "افتح صفحة إعدادات بعينها في ويندوز على طول",
          desc: R`كل صفحة في Settings ليها لينك بيبدأ بـ [[ms-settings:]]، تكتبه في Win+R وتوصل للصفحة على طول بدل ما تدوّر في القوايم.

أهمهم للمبرمج: [[ms-settings:developers]] (وضع المطوّر)، و [[ms-settings:network-proxy]] (لما npm و git فجأة مش بيتصلوا)، و [[ms-settings:appsfeatures]] (تمسح نسخ Node أو Python قديمة).`,
          example: R`Win+R → ms-settings:developers      For developers / Developer Mode
Win+R → ms-settings:network-proxy   proxy settings
Win+R → ms-settings:appsfeatures    installed apps (uninstall)
Win+R → ms-settings:startupapps     apps that start with Windows
Win+R → ms-settings:clipboard       clipboard history
Win+R → ms-settings:about           device specs and Windows edition
Win+R → appwiz.cpl                  classic Programs and Features`,
          try: "افتح [[ms-settings:about]] واعرف رامات جهازك ونسخة ويندوز. بعدين [[ms-settings:network-proxy]] واتأكد إن مفيش proxy متفعّل من غير ما تعرف.",
          flag: "keys",
          deep: {
            why: "إعدادات ويندوز 11 بتتنقل من مكان لمكان مع كل تحديث. اللينك ثابت ومش بيتأثر.",
            how: R`[[ms-settings:]] نوع لينك (URI) زي [[http:]]، ويندوز مسجّل تطبيق Settings إنه اللي بيفتحه. عشان كده بيشتغل من Win+R، ومن [[start ms-settings:about]] في CMD، ومن أي سكربت.

[[appwiz.cpl]] هو Control Panel القديم لإزالة البرامج، وساعات بيبان فيه برامج قديمة مش ظاهرة في الإعدادات الجديدة.

القايمة الكاملة للصفحات في دوكيومنتيشن مايكروسوفت، دوّر على «ms-settings URI».`,
            when: "توصل لإعداد بسرعة، أو تكتب في README لزميلك «افتح ms-settings:developers» بدل شرح القوايم.",
            mistakes: "إنك تمسح نسخة Node من Installed apps وتسيب [[%appdata%\\npm]] بحزم متسطبة لنسخة تانية، فتطلع أخطاء غريبة. لو هتغيّر نسخ Node كتير، استخدم مدير نسخ بدل التسطيب والمسح."
          },
          teach: R`## الفكرة: كل صفحة إعدادات ليها لينك

[[ms-settings:]] نوع لينك (URI)، زي [[http:]] بالظبط. اللي بعد النقطتين اسم الصفحة. ويندوز مسجّل إن تطبيق Settings هو اللي بيفتح النوع ده، فأي مكان بيفتح لينكات (Run، CMD، المتصفح) يوصلك للصفحة.

---

## ١. اتأكد إنه نوع لينك

نوع اللينك متسجل في الـ registry تحت اسمه. قريته على جهاز الدرس:

~~~powershell
Get-ItemProperty Registry::HKEY_CLASSES_ROOT\ms-settings | Format-List "(default)", "URL Protocol"
~~~

~~~text الناتج
(default)    : URL:ms-settings
URL Protocol :
~~~

وجود قيمة [[URL Protocol]] (حتى لو فاضية) هو اللي بيقول لويندوز «ده نوع لينك». نفس الطريقة متسجّل بيها [[http]] و [[mailto]].

---

## ٢. الصفحات

~~~text
Win+R → ms-settings:developers      For developers / Developer Mode
Win+R → ms-settings:network-proxy   proxy settings
Win+R → ms-settings:appsfeatures    installed apps (uninstall)
Win+R → ms-settings:startupapps     apps that start with Windows
Win+R → ms-settings:clipboard       clipboard history
Win+R → ms-settings:about           device specs and Windows edition
~~~

| اللينك | الصفحة | ليه هتحتاجها |
|---|---|---|
| [[ms-settings:developers]] | System ← For developers | Developer Mode، وإظهار الامتدادات والمخفي |
| [[ms-settings:network-proxy]] | Network ← Proxy | npm و git فجأة timeout |
| [[ms-settings:appsfeatures]] | Apps ← Installed apps | تمسح برنامج |
| [[ms-settings:startupapps]] | Apps ← Startup | زي تاب Startup في Task Manager |
| [[ms-settings:clipboard]] | System ← Clipboard | تاريخ Win+V |
| [[ms-settings:about]] | System ← About | الـ RAM ونسخة ويندوز |

### البروكسي: اقرا قبل ما تفتح

صفحة Proxy بتكتب إعداداتها في الـ registry، وتقدر تقراها:

~~~powershell
Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' | Format-List ProxyEnable, AutoConfigURL
~~~

~~~text الناتج على جهاز الدرس
ProxyEnable : 0
~~~

[[ProxyEnable : 0]] يعني «Use a proxy server» مقفول، و [[AutoConfigURL]] مش موجودة يعني مفيش «setup script». ده الطبيعي على جهاز بيت.

---

## ٣. Control Panel القديم

~~~text
Win+R → appwiz.cpl                  classic Programs and Features
~~~

[[appwiz.cpl]] صفحة Control Panel (DLL زي [[sysdm.cpl]]) لإزالة البرامج بالشكل القديم. wiz من Wizard، والاسم من أيام «Add/Remove Programs Wizard».

---

## ٤. من الترمنال

~~~cmd
start ms-settings:about
~~~

[[start]] في CMD بيفتح أي حاجة ببرنامجها الافتراضي، واللينك ده برنامجه Settings. (مش متجرّب هنا لأنه بيفتح نافذة، من دوكيومنتيشن مايكروسوفت «Launch the Windows Settings app».)

---

## الخلاصة

- [[ms-settings:اسم-الصفحة]] في Win+R = الصفحة على طول.
- اللينك بيفضل ثابت حتى لو مكان الصفحة في القوايم اتغيّر.
- متنساش النقطتين [[:]] في الآخر.`,
          sol: R`[[ms-settings:about]] هيفتح صفحة About: تحت «Device specifications» هتلاقي Installed RAM (زي 16.0 GB)، وتحت «Windows specifications» هتلاقي Edition و Version و OS build. [[ms-settings:network-proxy]] هيفتح Proxy: الطبيعي «Automatically detect settings» شغال، و «Use setup script» و «Use a proxy server» مقفولين.

لو لقيت proxy متفعّل وانت مش في شركة ومش مفعّله بنفسك، ده ممكن يبقى برنامج VPN أو antivirus أو برنامج مش كويس، ويخلي npm و git يفشلوا بـ timeout. اقفله واعرف مين حطه. ولو [[ms-settings:about]] مفتحش حاجة، اتأكد إنك كتبت النقطتين في الآخر.`
        }
      ]
    }
]);
