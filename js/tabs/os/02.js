// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
    {
      t: "أوبونتو: كل يوم",
      l: 1,
      n: "أوبونتو 24.04 بواجهة GNOME: مفتاح Super هو مفتاح ويندوز نفسه",
      items: [
        {
          cmd: "Super",
          title: "افتح أي برنامج في أوبونتو بالكتابة",
          desc: R`Super هو زرار ويندوز. دوسه لوحده يفتح Activities: كل الشبابيك قدامك وخانة بحث، ابدأ اكتب اسم البرنامج أو الإعداد ودوس Enter. Super+A يفتح قايمة كل البرامج.

وللتنقل: Super+Tab بين البرامج، و Super مع الزرار اللي فوق Tab بين شبابيك نفس البرنامج، زي لو فاتح مشروعين في VS Code. و Super+L يقفل الشاشة.`,
          example: R`Super                Activities overview + search
Super+A              all applications
Super+Tab            switch applications
Super+(key above Tab)   switch windows of the same app
Super+1 .. Super+9   open / switch to dock app N
Super+L              lock the screen
Super+V              notifications and calendar`,
          try: "دوس Super واكتب [[term]] وافتح الترمنال، وبعدين اكتب [[settings]] وافتح الإعدادات، من غير ما تلمس الماوس.",
          flag: "keys",
          deep: {
            why: "GNOME مصمم للكيبورد. البحث من Super هو الطريقة الأساسية لفتح أي حاجة، مش قايمة Start.",
            how: R`Activities بتوريك الشبابيك المفتوحة كلها في الـ workspace الحالي، وتحتها الـ workspaces التانية، والبحث بيدوّر في البرامج والإعدادات والملفات.

Super+رقم بيشتغل على ترتيب البرامج في الـ dock على الشمال، زي Win+رقم في ويندوز.`,
            when: "كل مرة تفتح برنامج. وخصوصًا الإعدادات: اكتب «keyboard» أو «display» على طول.",
            mistakes: "عادة ويندوز: Ctrl+Alt+Delete في أوبونتو مش بيفتح مدير المهام، بيطلعلك نافذة Power Off. مدير المهام اسمه System Monitor (في المستوى التاني)."
          },
          teach: R`## الفكرة: الاختصارات في GNOME مكتوبة في إعدادات تقدر تقراها

أوبونتو بيستخدم واجهة اسمها GNOME. وكل اختصار فيها مش سحر: هو قيمة محفوظة في نظام إعدادات اسمه **gsettings**، وتقدر تسأله «الاختصار الفلاني متظبط على إيه؟». هنستخدم ده عشان نتأكد من كل سطر في الجدول.

### إزاي اتجرّب

مفيش شاشة أوبونتو هنا، فشغّلت ubuntu:24.04 في Docker، وسطّبت ملفات الإعدادات الافتراضية بتاعة GNOME وأوبونتو (الحزم [[gsettings-desktop-schemas]] و [[mutter-common]] و [[gnome-shell-common]] و [[gnome-settings-daemon-common]] و [[ubuntu-settings]])، وشغّلت [[gsettings get]] وأنا عامل [[XDG_CURRENT_DESKTOP=ubuntu:GNOME]] عشان ياخد قيم أوبونتو مش قيم GNOME الخام. اللي بيحصل على الشاشة نفسها من دوكيومنتيشن GNOME و Ubuntu.

### شكل الأمر

~~~bash
gsettings get org.gnome.shell.keybindings toggle-application-view
~~~

| الحتة | معناها |
|---|---|
| [[gsettings]] | أداة قراية وكتابة إعدادات GNOME |
| [[get]] | اقرا بس (مش بيغيّر حاجة) |
| [[org.gnome.shell.keybindings]] | اسم «المجموعة» (schema)، هنا اختصارات الـ shell |
| [[toggle-application-view]] | اسم الإعداد جوه المجموعة |

والناتج بيكتب الزراير كده: [[<Super>]] يعني امسك Super، و [[<Primary>]] يعني Ctrl، والحرف في الآخر هو الزرار.

---

## ١. Super لوحده

~~~text
Super                Activities overview + search
~~~

Super هو زرار ويندوز نفسه، بس لينكس بيسمّيه كده. دوسه وسيبه بيفتح **Activities**: كل النوافذ قدامك وخانة بحث جاهزة.

~~~bash
gsettings get org.gnome.mutter overlay-key
~~~

~~~text الناتج
'Super_L'
~~~

[[Super_L]] يعني زرار Super اللي على الشمال. [[mutter]] هو البرنامج اللي بيدير النوافذ في GNOME، و overlay-key هو «الزرار اللي لوحده بيفتح الـ overview».

---

## ٢. البرامج والتنقل

~~~text
Super+A              all applications
Super+Tab            switch applications
Super+(key above Tab)   switch windows of the same app
Super+1 .. Super+9   open / switch to dock app N
~~~

~~~text الناتج (٤ أوامر gsettings get)
toggle-application-view   ['<Super>a']
switch-applications       ['<Super>Tab']
switch-group              ['<Super>Above_Tab', '<Alt>Above_Tab']
switch-to-application-1   ['<Super>1']
~~~

- [[Super+A]]: A من Applications، شبكة بكل البرامج المتسطبة.
- [[Super+Tab]]: بيتنقل بين **البرامج** (VS Code كله حاجة واحدة).
- [[Above_Tab]]: ده اسم الزرار اللي فوق Tab حرفيًا (اللي عليه backtick في الكيبورد الإنجليزي). GNOME بيسمّيه بمكانه مش بحرفه، عشان يشتغل على أي لغة. بيتنقل بين **نوافذ نفس البرنامج**.
- [[Super+1]]: أول برنامج في الـ dock (الشريط اللي على الشمال)، زي Win+1.

---

## ٣. القفل والإشعارات

~~~text
Super+L              lock the screen
Super+V              notifications and calendar
~~~

~~~text الناتج
screensaver          ['<Super>l']
toggle-message-tray  ['<Super>v', '<Super>m']
~~~

- [[screensaver]] هو اسم «اقفل الشاشة» في الإعدادات.
- [[Super+V]] هنا **مش** الكليب بورد زي ويندوز: بيفتح قايمة الإشعارات والتقويم. و Super+M بيعمل نفس الحاجة.

---

## الخلاصة

| الاختصار | بيعمل إيه | زي ويندوز؟ |
|---|---|---|
| Super | Activities + بحث | زي Win |
| Super+A | كل البرامج | قايمة All apps |
| Super+Tab | بين البرامج | زي Alt+Tab تقريبًا |
| Super+الزرار اللي فوق Tab | بين نوافذ نفس البرنامج | مفيش مقابل مباشر |
| Super+رقم | برنامج الـ dock رقم كذا | زي Win+رقم |
| Super+L | قفل | زي Win+L |
| Super+V | الإشعارات | **مختلف**: في ويندوز الكليب بورد |`,
          sol: R`Super هيفتح Activities وخانة البحث جاهزة. [[term]] هيجيب Terminal أول نتيجة، Enter يفتحه. تاني Super و [[settings]] يجيب Settings. من غير ولا كليك. البحث بيدوّر في أسامي البرامج ووصفها كمان، فـ [[term]] يلاقي Terminal حتى لو الاسم بتاعه في نسختك «Console» أو Ptyxis (الترمنال الافتراضي في أوبونتو 25.10 وأحدث).

لو كتبت ومطلعش حاجة، اتأكد إن الكيبورد على الإنجليزي: لو على العربي هيكتب «فثقة» والبحث مش هيلاقي. وفي بعض الأجهزة (خصوصًا جوه VM) زرار Super بتاخده الماكينة الأصلية، فمش هيوصل لأوبونتو.`
        },
        {
          cmd: "Ctrl+Alt+T",
          title: "افتح الترمنال في أوبونتو",
          desc: R`Ctrl+Alt+T بيفتح ترمنال جديد من أي مكان. وجوه الترمنال: Ctrl+Shift+T تاب جديد، و Ctrl+PageUp و PageDown تتنقل بين التابات، و Alt+رقم يروح لتاب بعينه.

النسخ واللزق في ترمنال لينكس بـ Ctrl+Shift+C و Ctrl+Shift+V، لأن Ctrl+C بتوقف الأمر (متشرح في تاب ابدأ من هنا).`,
          example: R`Ctrl+Alt+T             open a new terminal window
Ctrl+Shift+T           new tab
Ctrl+Shift+N           new window
Ctrl+PageUp/PageDown   previous / next tab
Alt+1 .. Alt+9         go to tab N
Ctrl+Shift+W           close tab
Ctrl+Shift+F           search the output
Ctrl++ / Ctrl+- / Ctrl+0   zoom in / out / reset`,
          try: "افتح ترمنال بـ Ctrl+Alt+T، اعمل ٣ تابات، واتنقل بينهم بـ Alt+1 و Alt+2 و Alt+3. بعدين اعمل [[ls -la /etc]] ودوّر على كلمة hosts بـ Ctrl+Shift+F.",
          flag: "keys",
          deep: {
            why: "الترمنال هو أكتر برنامج هتفتحه في لينكس. اختصار ثابت من أي مكان أسرع من البحث عنه كل مرة.",
            how: R`الترمنال الافتراضي في أوبونتو 24.04 هو GNOME Terminal. الإصدارات الأحدث ممكن تيجي بترمنال تاني (Ptyxis)، والاختصارات تقريبًا هي هي.

Ctrl+Shift+F بيدوّر في كل اللي اتكتب في الشاشة، مفيد لما تدوّر على error وسط لوج طويل. والزوم بيكبّر الخط، مفيد وانت بتشارك الشاشة.`,
            when: "طول اليوم.",
            mistakes: "إنك تدوس Ctrl+C عشان تنسخ فتوقف السيرفر الشغال، أو Ctrl+V فيطلع ^V. في ترمنال لينكس النسخ واللزق فيهم Shift."
          },
          teach: R`## الفكرة: اختصار للنظام، والباقي للترمنال

السطر الأول في الجدول بيشتغل من أي مكان في أوبونتو، لأن النظام هو اللي ماسكه. الباقي بيشتغل **جوه** نافذة الترمنال بس، لأن برنامج الترمنال هو اللي ماسكه.

---

## ١. Ctrl+Alt+T

~~~text
Ctrl+Alt+T             open a new terminal window
~~~

T من Terminal. اتأكدت منه بـ gsettings في ubuntu:24.04 جوه Docker بإعدادات أوبونتو الافتراضية:

~~~bash
gsettings get org.gnome.settings-daemon.plugins.media-keys terminal
~~~

~~~text الناتج
['<Primary><Alt>t']
~~~

| الحتة | معناها |
|---|---|
| [[media-keys]] | مجموعة «الزراير الخاصة» اللي بتشغّل برامج (الترمنال، الآلة الحاسبة، الصوت...) |
| [[terminal]] | الإعداد اللي بيفتح الترمنال |
| [[<Primary>]] | اسم GNOME لـ Ctrl («الزرار الأساسي»، وعلى الماك بيبقى Cmd) |
| [[<Alt>t]] | مع Alt والحرف t |

---

## ٢. جوه الترمنال: التابات والنوافذ

~~~text
Ctrl+Shift+T           new tab
Ctrl+Shift+N           new window
Ctrl+PageUp/PageDown   previous / next tab
Alt+1 .. Alt+9         go to tab N
Ctrl+Shift+W           close tab
~~~

ليه Shift في كل حاجة؟ لأن Ctrl+T و Ctrl+N و Ctrl+W من غير Shift **بيروحوا للبرنامج اللي شغال جوه الترمنال**. مثلًا Ctrl+W في bash بيمسح الكلمة اللي قبل المؤشر. فالترمنال بياخد لنفسه النسخة اللي فيها Shift عشان ميبوّظش اختصارات الشيل.

| الاختصار | بيعمل إيه |
|---|---|
| Ctrl+Shift+T | تاب جديد في نفس النافذة |
| Ctrl+Shift+N | نافذة جديدة |
| Ctrl+PageUp / PageDown | التاب اللي قبله / بعده (PageUp و PageDown زرارين فوق الأسهم) |
| Alt+1 لحد Alt+9 | روح للتاب رقم كذا |
| Ctrl+Shift+W | اقفل التاب، ولو فيه أمر شغال هيسألك |

---

## ٣. البحث والزوم

~~~text
Ctrl+Shift+F           search the output
Ctrl++ / Ctrl+- / Ctrl+0   zoom in / out / reset
~~~

- Ctrl+Shift+F (F من Find): شريط بحث في كل اللي اتطبع في الترمنال، مش في الأوامر.
- [[Ctrl++]] يعني Ctrl مع زرار [[+]] (عمليًا زرار [[=]])، يكبّر الخط. [[Ctrl+-]] يصغّر. [[Ctrl+0]] يرجّع الحجم الأصلي.

> اختصارات جوه الترمنال من دوكيومنتيشن GNOME Terminal (الترمنال الافتراضي في أوبونتو 24.04)، مش متجرّبة لأن مفيش شاشة. Ctrl+Alt+T اتأكد من قيمته بـ gsettings.

---

## الخلاصة

- Ctrl+Alt+T من أي مكان = ترمنال جديد.
- جوه الترمنال: Ctrl+Shift+حرف للترمنال نفسه، Ctrl+حرف للشيل.
- النسخ واللزق: Ctrl+Shift+C و Ctrl+Shift+V، مش Ctrl+C.`,
          sol: R`Alt+1 و Alt+2 و Alt+3 بتنقلك للتاب رقم ١ و ٢ و ٣. [[ls -la /etc]] هيطبع لستة طويلة، و Ctrl+Shift+F هيفتح شريط بحث فوق، اكتب [[hosts]] ودوس Enter: هيعلّم على السطر اللي فيه [[hosts]] (وممكن [[hosts.allow]] و [[hosts.deny]] كمان)، و Enter تاني يروح للي بعده.

الكلام ده على GNOME Terminal في أوبونتو 24.04. في أوبونتو 25.10 وأحدث الترمنال الافتراضي بقى Ptyxis، ونفس الاختصارات دي شغالة فيه تقريبًا. ولو Alt+1 كتب رمز غريب بدل ما ينقل، يبقى فيه برنامج تاني (زي tmux أو إعداد في الترمنال) واخد Alt.`
        },
        {
          cmd: "Super+Left",
          title: "لزّق نافذة في نص الشاشة في أوبونتو",
          desc: R`Super+سهم شمال أو يمين يلزّق النافذة في نص الشاشة، و Super+سهم فوق يكبّرها، و Super+سهم تحت يرجّعها لحجمها. كده الكود على جنب والمتصفح على الجنب التاني.

ولو عندك شاشتين، Shift+Super+سهم ينقل النافذة للشاشة التانية.`,
          example: R`Super+Left / Super+Right     tile to the left / right half
Super+Up                     maximize
Super+Down                   restore
Shift+Super+Left/Right       move window to the other monitor`,
          try: "لزّق الترمنال على الشمال والمتصفح على اليمين، وبعدين كبّر الترمنال بـ Super+Up ورجّعه بـ Super+Down.",
          flag: "keys",
          deep: {
            why: "نفس فكرة Win+Arrows في ويندوز: الكود والنتيجة قدامك مع بعض من غير ما تسحب وتظبط بالماوس.",
            how: R`GNOME بيدعم النصين بس افتراضيًا. أوبونتو بيضيف تقسيمات أكتر (أرباع، وملء الباقي تلقائيًا) من Settings ← Ubuntu Desktop ← Enhanced Tiling.

وتقدر كمان تسحب النافذة لحافة الشاشة الشمال أو اليمين فتتلزّق، أو لفوق فتتكبّر.`,
            when: "كود + متصفح، ترمنال + دوكيومنتيشن.",
            mistakes: "بعض البرامج ليها حد أدنى للعرض فمش هتاخد النص بالظبط على شاشة صغيرة. ده طبيعي، مش bug."
          },
          teach: R`## الفكرة: tiling يعني ترص النوافذ جنب بعض

Tiling معناها «تبليط»: ترص النوافذ زي البلاط من غير ما تركب على بعض. GNOME بيعمل ده بالأسهم مع Super. نتأكد من كل اختصار بقيمته في gsettings (اتشغّل في ubuntu:24.04 جوه Docker بإعدادات أوبونتو الافتراضية)، والسلوك على الشاشة من دوكيومنتيشن GNOME.

---

## ١. نص الشاشة

~~~text
Super+Left / Super+Right     tile to the left / right half
~~~

~~~bash
gsettings get org.gnome.mutter.keybindings toggle-tiled-left
gsettings get org.gnome.mutter.keybindings toggle-tiled-right
~~~

~~~text الناتج
['<Super>Left']
['<Super>Right']
~~~

كلمة **toggle** في الاسم مهمة: يعني «بدّل». لو النافذة مش ملزوقة تتلزق، ولو ملزوقة على الشمال ودوست Super+Left تاني ترجع لحجمها العايم.

---

## ٢. تكبير ورجوع

~~~text
Super+Up                     maximize
Super+Down                   restore
~~~

~~~text الناتج (maximize و unmaximize في org.gnome.desktop.wm.keybindings)
['<Super>Up']
['<Super>Down', '<Alt>F5']
~~~

- maximize = النافذة تملى الشاشة كلها.
- unmaximize (أو restore) = ترجع لحجمها قبل التكبير. ولاحظ إن له اختصار تاني: Alt+F5.

---

## ٣. شاشة تانية

~~~text
Shift+Super+Left/Right       move window to the other monitor
~~~

~~~text الناتج (move-to-monitor-left)
['<Super><Shift>Left']
~~~

نفس الأسهم، و Shift بتغيّر المعنى لـ «انقل للشاشة اللي في الاتجاه ده». ترتيب الزراير في الاسم مش فارق: Shift+Super هو Super+Shift.

---

## ٤. السحب بالماوس

السحب لحافة الشاشة بيلزّق برضه، وده إعداد اسمه edge-tiling:

~~~text الناتج (gsettings get org.gnome.mutter edge-tiling)
true
~~~

> لما شغّلته من غير إعدادات أوبونتو (GNOME الخام) القيمة طلعت [[false]]، ولما ضفت [[XDG_CURRENT_DESKTOP=ubuntu:GNOME]] طلعت [[true]]. ده لأن أوبونتو والـ GNOME Shell بيحطوا قيم افتراضية فوق القيم الخام، والنتيجة على أوبونتو الحقيقي [[true]].

---

## الخلاصة

| الاختصار | الإعداد | بيعمل إيه |
|---|---|---|
| Super+Left / Right | toggle-tiled-left / right | نص الشاشة، ودوسة تانية ترجّعها |
| Super+Up | maximize | الشاشة كلها |
| Super+Down | unmaximize | رجوع |
| Shift+Super+الأسهم | move-to-monitor-left / right | شاشة تانية |`,
          sol: R`Super+Left على الترمنال هيلزّقه في النص الشمال، و Super+Right على المتصفح يلزّقه يمين. Super+Up على الترمنال هيكبّره على الشاشة كلها، و Super+Down يرجّعه للنص الشمال تاني (مش للحجم القديم قبل التلزيق). ولو دوست Super+Down وهو في نص الشاشة، هيرجع لحجمه الأصلي العايم.

أوبونتو 23.10 وأحدث فيه Tiling Assistant: بعد ما تلزق نافذة، هيعرضلك الباقي تختار واحدة تملى النص التاني، زي ويندوز. ولو النافذة مش بتتلزق، غالبًا البرنامج ليه حد أدنى للعرض أكبر من نص الشاشة (بيحصل في الشاشات الصغيرة).`
        },
        {
          cmd: "Super+PageDown",
          title: "اتنقل بين مساحات الشغل في أوبونتو",
          desc: R`الـ workspaces في GNOME زي الـ virtual desktops في ويندوز: كل واحدة ليها شبابيكها. Super+PageDown و Super+PageUp يتنقلوا بينهم، و Shift+Super+PageDown ياخد النافذة الحالية معاك للمساحة اللي بعدها.

GNOME بيعمل workspaces لوحده: دايمًا فيه واحدة فاضية في الآخر، أول ما تحط فيها نافذة بتظهر واحدة جديدة.`,
          example: R`Super+PageDown / Super+PageUp        next / previous workspace
Shift+Super+PageDown / PageUp        move the window with you
Super                                see all workspaces at the top`,
          try: "حط المتصفح في workspace لوحده بـ Shift+Super+PageDown، وارجع بـ Super+PageUp. دوس Super وشوف المساحات فوق.",
          flag: "keys",
          deep: {
            why: "تفصل الشغل: مشروع في مساحة، والشات والإيميل في مساحة، فمتتلخبطش بين عشرين نافذة.",
            how: R`الـ workspaces افتراضيًا ديناميكية: بتتعمل وتتشال لوحدها حسب الشبابيك. لو عايز عدد ثابت، Settings ← Multitasking ← Workspaces ← Fixed number.

على التاتش باد: تلات صوابع يمين وشمال بيتنقلوا بين المساحات.`,
            when: "شغال على أكتر من حاجة في نفس الوقت. أو عايز تشارك شاشة من غير الباقي.",
            mistakes: "تقفل آخر نافذة في مساحة فالمساحة تختفي، وتفتكر إن حاجة ضاعت. ده السلوك الطبيعي للمساحات الديناميكية."
          },
          teach: R`## الفكرة: الـ workspaces متصفّفة جنب بعض

Workspace يعني «مساحة شغل»، وهي نفس فكرة virtual desktop في ويندوز. في GNOME من النسخة 40 المساحات متصفّفة **أفقي** (شمال ويمين)، فـ PageDown معناها «اللي على اليمين». كل الكلام ده اتأكدت منه بـ [[gsettings get]] في ubuntu:24.04 جوه Docker بإعدادات أوبونتو الافتراضية.

---

## ١. التنقل

~~~text
Super+PageDown / Super+PageUp        next / previous workspace
~~~

~~~bash
gsettings get org.gnome.desktop.wm.keybindings switch-to-workspace-right
gsettings get org.gnome.desktop.wm.keybindings switch-to-workspace-left
~~~

~~~text الناتج
['<Super>Page_Down', '<Super><Alt>Right', '<Control><Alt>Right']
['<Super>Page_Up', '<Super><Alt>Left', '<Control><Alt>Left']
~~~

الإعداد اسمه switch-to-workspace-**right**، وليه **تلات** اختصارات بيعملوا نفس الحاجة:

| الاختصار | مفيد إمتى |
|---|---|
| Super+PageDown | الكيبورد فيه زرار PageDown |
| Super+Alt+Right | لابتوب صغير مفيهوش PageDown |
| Ctrl+Alt+Right | عادة قديمة من نسخ GNOME القديمة |

---

## ٢. خد النافذة معاك

~~~text
Shift+Super+PageDown / PageUp        move the window with you
~~~

~~~text الناتج (move-to-workspace-right)
['<Super><Shift>Page_Down', '<Super><Shift><Alt>Right', '<Control><Shift><Alt>Right']
~~~

نفس التلاتة بالظبط، و Shift زيادة. القاعدة في GNOME: **Shift = خد النافذة اللي قدامك معاك**.

---

## ٣. شوفهم كلهم

~~~text
Super                                see all workspaces at the top
~~~

Super بيفتح Activities، والمساحات بتبان فيها صور مصغرة.

---

## ٤. ليه بتظهر وتختفي لوحدها

~~~text الناتج (gsettings get org.gnome.mutter dynamic-workspaces)
true
~~~

**dynamic** يعني ديناميكي: GNOME بيسيب دايمًا مساحة فاضية في الآخر، وأي مساحة تفضى بتتمسح. لو عايز عدد ثابت، الإعداد في Settings ← Multitasking. (من غير قيم أوبونتو القيمة الخام طلعت [[false]] وعدد المساحات [[4]]، بس أوبونتو والـ GNOME Shell بيخلّوها [[true]].)

> السلوك على الشاشة من دوكيومنتيشن GNOME «Switch between workspaces».

---

## الخلاصة

- Super+PageDown/PageUp = يمين/شمال بين المساحات.
- Shift زيادة = النافذة تيجي معاك.
- مفيش PageDown؟ Super+Alt+الأسهم.
- المساحة الفاضية بتختفي، ده الطبيعي.`,
          sol: R`Shift+Super+PageDown على المتصفح هيوديه والشاشة معاه للـ workspace اللي بعده، فهتلاقي نفسك هناك والمتصفح لوحده. Super+PageUp يرجّعك للأول من غير المتصفح. لما تدوس Super هتلاقي المساحات صور مصغرة (فوق في GNOME القديم أو على الجنب حسب النسخة)، واللي فيها المتصفح ظاهر فيها.

أوبونتو بيعمل workspaces بشكل ديناميكي: دايمًا فيه واحدة فاضية في الآخر، وأي واحدة تفضى بتختفي. فلو قفلت المتصفح في التانية، هتلاقيها اتمسحت. ولو الاختصار مش شغال على لابتوب مفيهوش PageDown، جرّب Super+Fn+Down أو Super+Alt+Right.`
        },
        {
          cmd: "PrtSc",
          title: "صوّر الشاشة في أوبونتو",
          desc: R`PrtSc بيفتح أداة التصوير: تحدد جزء، أو نافذة، أو الشاشة كلها، وفيها كمان زرار لتسجيل فيديو. الصورة بتتحفظ في [[~/Pictures/Screenshots]] وبتتنسخ على الكليب بورد في نفس الوقت.

وفيه اختصارات مباشرة من غير الأداة: Alt+PrtSc للنافذة الحالية، و Shift+PrtSc للشاشة كلها.`,
          example: R`PrtSc                 screenshot tool (region / window / screen / video)
Alt+PrtSc             current window, instantly
Shift+PrtSc           full screen, instantly
Shift+Ctrl+Alt+R      start / stop screen recording
Ctrl+V                paste the screenshot (it is also on the clipboard)`,
          try: "صوّر نافذة الترمنال بـ Alt+PrtSc والزقها في أي شات، وبعدين ادخل [[~/Pictures/Screenshots]] ولاقي الملف.",
          flag: "keys",
          deep: {
            why: "صورة الـ error أوضح من وصفه. وفيديو قصير لـ bug بيحصل مع حركة بيوفر شرح طويل.",
            how: R`الأداة دي جزء من GNOME نفسه (من GNOME 42). التسجيل بيتحفظ في [[~/Videos/Screencasts]].

الصورة بتتحفظ كملف وبتتنسخ في نفس الوقت، فمش محتاج تختار.`,
            when: "تبليغ عن bug، توثيق خطوات، إرسال error لحد يساعدك.",
            mistakes: "توكن أو IP سيرفر حقيقي ظاهر في الترمنال اللي صوّرته. بص على الصورة قبل ما تبعتها."
          },
          teach: R`## الفكرة: أداة واحدة، وتلات اختصارات

من GNOME 42 التصوير بقى أداة واحدة مدمجة في النظام. PrtSc (اختصار Print Screen) بيفتحها، والاختصارات التانية بتصوّر على طول من غير ما تسأل. القيم دي اتأكدت منها بـ [[gsettings get]] في ubuntu:24.04 جوه Docker بإعدادات أوبونتو الافتراضية.

---

## ١. الاختصارات

~~~text
PrtSc                 screenshot tool (region / window / screen / video)
Alt+PrtSc             current window, instantly
Shift+PrtSc           full screen, instantly
Shift+Ctrl+Alt+R      start / stop screen recording
~~~

~~~bash
gsettings get org.gnome.shell.keybindings show-screenshot-ui
gsettings get org.gnome.shell.keybindings screenshot-window
gsettings get org.gnome.shell.keybindings screenshot
gsettings get org.gnome.shell.keybindings show-screen-recording-ui
~~~

~~~text الناتج
['Print']
['<Alt>Print']
['<Shift>Print']
['<Ctrl><Shift><Alt>R']
~~~

| الاختصار | اسم الإعداد | بيعمل إيه |
|---|---|---|
| PrtSc | show-screenshot-ui | يفتح الأداة: تختار جزء أو نافذة أو شاشة، أو تحوّل لتسجيل فيديو |
| Alt+PrtSc | screenshot-window | النافذة اللي قدامك، فورًا |
| Shift+PrtSc | screenshot | الشاشة كلها، فورًا |
| Shift+Ctrl+Alt+R | show-screen-recording-ui | تسجيل فيديو، ونفس الاختصار يوقفه |

[[Print]] هو اسم زرار PrtSc عند GNOME.

---

## ٢. الصورة بتروح فين

~~~text
Ctrl+V                paste the screenshot (it is also on the clipboard)
~~~

الصورة بتتعمل في مكانين مع بعض: الكليب بورد (فتلزقها بـ Ctrl+V)، وملف في [[~/Pictures/Screenshots]]. والفيديو بيروح [[~/Videos/Screencasts]].

[[~/Pictures]] نفسه اسمه ممكن يتغيّر لو لغة النظام مش إنجليزي، فتسأل عن مكانه الحقيقي:

~~~bash
xdg-user-dir PICTURES
~~~

~~~text الناتج في ubuntu:24.04 جوه Docker (يوزر root)
/root
~~~

ليه [[/root]] مش [[/root/Pictures]]؟ لأن الكونتينر مفيهوش واجهة رسومية، فمحدش عمل الفولدرات دي، والأداة بترجع للهوم. على أوبونتو بشاشة هيطلع حاجة زي [[/home/you/Pictures]] أو بالعربي [[/home/you/الصور]].

> سلوك الأداة على الشاشة من دوكيومنتيشن Ubuntu «Screenshots and screencasts».

---

## الخلاصة

- PrtSc = الأداة الكاملة. Alt = نافذة. Shift = شاشة.
- الصورة في الكليب بورد **و** في ملف.
- مش لاقي الفولدر؟ [[xdg-user-dir PICTURES]].`,
          sol: R`Alt+PrtSc هيصوّر نافذة الترمنال على طول من غير أي سؤال، ويطلع إشعار «Screenshot captured». الصورة بتتحفظ في الكليب بورد (Ctrl+V في الشات تلزقها) وفي ملف كمان. [[ls ~/Pictures/Screenshots]] هيوريك ملف اسمه زي [[Screenshot From 2026-09-30 10-15-22.png]].

لو الفولدر مش موجود، النسخ القديمة (قبل GNOME 42) كانت بتحفظ في [[~/Pictures]] مباشرة. ولو جهازك باللغة العربية، اسم الفولدر ممكن يبقى مترجم (زي [[~/الصور]]). اعرف مكانه بـ [[xdg-user-dir PICTURES]].`
        },
        {
          cmd: "Ctrl+H",
          title: "اعرض الملفات المخفية في أوبونتو",
          desc: R`في برنامج Files (اسمه Nautilus)، أي ملف اسمه بيبدأ بنقطة مخفي: [[.env]] و [[.git]] و [[~/.ssh]] و [[~/.bashrc]]. Ctrl+H بيظهرهم ويخفيهم.

و Ctrl+L يفتح خانة تكتب فيها المسار بإيدك (أو ابدأ اكتب [[/]] أو [[~]] على طول). وكليك يمين في مكان فاضي ← Open in Terminal يفتح ترمنال في الفولدر.`,
          example: R`Ctrl+H              show / hide dotfiles (.env, .git, .ssh)
Ctrl+L              type a path, e.g. ~/.config
F2                  rename
Ctrl+Shift+N        new folder
Alt+Up              parent folder
Delete              move to Trash
Shift+Delete        delete permanently (no Trash!)
Right-click empty space → Open in Terminal`,
          try: "افتح Files، روح لفولدر الهوم، دوس Ctrl+H وشوف [[.bashrc]]. بعدين Ctrl+L واكتب [[~/.ssh]].",
          flag: "keys",
          deep: {
            why: "ملفات الإعدادات كلها في لينكس مخفية بالنقطة. من غير Ctrl+H مش هتشوف .env المشروع ولا مفاتيح SSH.",
            how: R`الإخفاء في لينكس مجرد اتفاق: أي اسم بيبدأ بنقطة، البرامج بتتجاهله في العرض العادي. مفيش attribute خاص زي ويندوز. في الترمنال نفس الفكرة: [[ls]] مش بيعرضهم و [[ls -a]] بيعرضهم.

Files بيفتكر اختيار Ctrl+H، فلو فعّلته هيفضل كده.`,
            when: "تعديل .env، نسخ مفتاح من ~/.ssh، فتح ~/.config لبرنامج.",
            mistakes: "Shift+Delete بيمسح نهائي من غير سلة مهملات. لو بتنضّف فولدرات، Delete العادي أأمن."
          },
          teach: R`## الفكرة: في لينكس «مخفي» يعني اسم بيبدأ بنقطة

مفيش علامة خاصة على الملف زي ويندوز. أي ملف أو فولدر اسمه بيبدأ بـ [[.]] البرامج بتخبّيه في العرض العادي، وده بس. Files (اسمه التقني Nautilus، مدير الملفات في أوبونتو) بيخبيهم، و Ctrl+H (H من Hidden) بيظهرهم.

---

## ١. نفس الفكرة في الترمنال

في ubuntu:24.04 جوه Docker، في فولدر الهوم بتاع root:

~~~bash
ls
ls -a
~~~

~~~text الناتج
$ ls
$ ls -a
.
..
.bashrc
.profile
.ssh
~~~

- [[ls]] مطلّعش حاجة خالص، كأن الهوم فاضي.
- [[ls -a]] (a من all) طلّع ملفات كلها بتبدأ بنقطة. [[.]] يعني الفولدر الحالي و [[..]] الفولدر الأب.

Ctrl+H في Files هو [[ls -a]] بالظبط، بس بالماوس.

---

## ٢. الاختصار نفسه

~~~text
Ctrl+H              show / hide dotfiles (.env, .git, .ssh)
~~~

dotfiles = الملفات اللي بتبدأ بنقطة (dot). و Files بيفتكر اختيارك: في أوبونتو 24.04 بيحفظه في إعداد إظهار المخفي بتاع GTK 4 (المكتبة اللي Files ونوافذ Open و Save مبنيين بيها). قريت قيمته الافتراضية في نفس الكونتينر:

~~~bash
gsettings get org.gtk.gtk4.Settings.FileChooser show-hidden
~~~

~~~text الناتج
false
~~~

[[false]] = مخفيين (الافتراضي). بعد Ctrl+H بيبقى [[true]] لحد ما تدوسه تاني.

---

## ٣. باقي اختصارات Files

~~~text
Ctrl+L              type a path, e.g. ~/.config
F2                  rename
Ctrl+Shift+N        new folder
Alt+Up              parent folder
Delete              move to Trash
Shift+Delete        delete permanently (no Trash!)
~~~

| الاختصار | بيعمل إيه |
|---|---|
| Ctrl+L | شريط المسار يتحوّل خانة كتابة. [[~]] = فولدر الهوم |
| F2 | تغيير الاسم |
| Ctrl+Shift+N | فولدر جديد |
| Alt+Up | الفولدر الأب، زي [[cd ..]] |
| Delete | سلة المهملات (Trash)، وترجّعه منها |
| Shift+Delete | **مسح نهائي**، بيسألك مرة وبعدين مفيش رجوع |

---

## ٤. ترمنال من هنا

~~~text
Right-click empty space → Open in Terminal
~~~

كليك يمين في مكان فاضي (مش على ملف) ← Open in Terminal: ترمنال واقف في نفس الفولدر.

> اختصارات Files من دوكيومنتيشن GNOME «Files: keyboard shortcuts». [[ls]] و [[gsettings]] اتشغّلوا فعلًا في Docker.

---

## الخلاصة

- مخفي في لينكس = اسم بيبدأ بنقطة، مش أكتر.
- Ctrl+H في Files = [[ls -a]] في الترمنال.
- Shift+Delete مفيهوش رجوع.`,
          sol: R`بعد Ctrl+H هتلاقي في الهوم ملفات كتير ظهرت، كلها بتبدأ بنقطة: [[.bashrc]] و [[.profile]] و [[.cache]] و [[.config]] وغيرهم. Ctrl+L هيحوّل شريط المسار لخانة كتابة، اكتب [[~/.ssh]] و Enter تدخل الفولدر، وهتلاقي فيه [[known_hosts]] ومفاتيحك لو عملتها.

لو قال إن المكان مش موجود، يبقى لسه معملتش مفتاح ولا دخلت أي سيرفر بـ ssh، والفولدر بيتعمل مع أول استخدام. و Ctrl+H بيفضل متفعّل لحد ما تدوسه تاني، فلو لقيت الهوم زحمة بعدين، ده السبب.`
        },
        {
          cmd: "xdg-open .",
          title: "افتح الفولدر الحالي في مدير الملفات من الترمنال",
          desc: R`[[xdg-open]] بيفتح أي حاجة بالبرنامج الافتراضي بتاعها: فولدر في Files، ولينك في المتصفح، وصورة في عارض الصور. زي [[start]] في ويندوز و [[open]] في الماك (متشرح في تاب zsh).`,
          example: R`xdg-open .
xdg-open http://localhost:3000
xdg-open coverage/index.html
xdg-open screenshot.png`,
          try: "في فولدر أي مشروع اكتب [[xdg-open .]] وشوف Files فتح في نفس المكان.",
          deep: {
            why: "انت في الترمنال وعايز تشوف الملفات بشكل مرئي، أو تفتح تقرير HTML اتعمل، من غير ما تدوّر عليه.",
            how: R`[[xdg-open]] بيسأل النظام «مين البرنامج الافتراضي لنوع الملف ده؟» ويشغّله. الإعدادات دي من Settings ← Default Apps، أو من كليك يمين على ملف ← Open With ← Set as default.

الأمر بيرجعلك الترمنال على طول والبرنامج بيفضل مفتوح.`,
            when: "تفتح تقرير coverage أو build، أو الموقع بعد ما السيرفر يقوم، أو الفولدر في Files.",
            mistakes: "على سيرفر من غير واجهة رسومية أو جوه WSL مش هيشتغل. في WSL استخدم [[explorer.exe .]] (متشرح في تاب WSL)."
          },
          teach: R`## الفكرة: «افتحه بالبرنامج المناسب»

[[xdg-open]] أمر واحد بيفتح أي حاجة: فولدر، أو لينك، أو ملف. هو مبيعرفش يعرض حاجة بنفسه، بيسأل النظام «مين البرنامج الافتراضي للنوع ده؟» ويشغّله. XDG اختصار X Desktop Group، وده اسم المجموعة اللي عملت المعايير المشتركة بين واجهات لينكس (GNOME و KDE وغيرهم)، فالأمر شغال على أي واجهة.

---

## ١. [[xdg-open .]]

~~~bash
xdg-open .
~~~

| الحتة | معناها |
|---|---|
| [[xdg-open]] | افتح بالبرنامج الافتراضي |
| [[.]] | الفولدر الحالي |

على أوبونتو بشاشة: نافذة Files بتفتح على الفولدر، والـ prompt بيرجع على طول من غير ما يطبع حاجة (البرنامج بيفضل مفتوح لوحده).

### جربته في مكان من غير شاشة

في ubuntu:24.04 جوه Docker (سطّبت حزمة [[xdg-utils]] اللي فيها الأمر):

~~~text الناتج
/usr/bin/xdg-open: 882: www-browser: not found
/usr/bin/xdg-open: 882: links2: not found
/usr/bin/xdg-open: 882: elinks: not found
/usr/bin/xdg-open: 882: links: not found
/usr/bin/xdg-open: 882: lynx: not found
/usr/bin/xdg-open: 882: w3m: not found
xdg-open: no method available for opening '.'
~~~

ودي أحسن طريقة تفهم هو بيشتغل إزاي:

1. ملقاش واجهة رسومية (مفيش GNOME ولا KDE)، فمعرفش يسأل مين البرنامج الافتراضي.
2. فجرّب خطة احتياطية: يدوّر على متصفحات نصية بتشتغل في الترمنال (lynx و w3m وغيرهم) واحد ورا التاني، وكل سطر [[not found]] محاولة فشلت.
3. في الآخر استسلم: [[no method available]].

و [[echo $?]] بعدها طلّع [[3]]. الرقم ده الـ exit code، و 3 في [[xdg-open]] معناه «مش لاقي برنامج يفتح بيه». النجاح بيبقى 0.

---

## ٢. لينك

~~~bash
xdg-open http://localhost:3000
~~~

لينك [[http]] برنامجه الافتراضي المتصفح، فيفتح الموقع المحلي بتاعك فيه. في الكونتينر طلع نفس الستة سطور ونفس الرسالة الأخيرة بس باللينك: [[no method available for opening 'http://localhost:3000']].

---

## ٣. ملف HTML

~~~bash
xdg-open coverage/index.html
~~~

[[coverage/index.html]] مسار نسبي: فولدر [[coverage]] جوه الفولدر الحالي، وجواه [[index.html]]. ده التقرير اللي أدوات الاختبار زي Jest و Vitest بتعمله. ملف [[.html]] برنامجه الافتراضي المتصفح.

---

## ٤. صورة

~~~bash
xdg-open screenshot.png
~~~

[[.png]] برنامجه الافتراضي عارض الصور (Image Viewer في أوبونتو).

---

## مين بيقرر البرنامج الافتراضي؟

أداة أخت [[xdg-open]] اسمها [[xdg-mime]] بتقولك:

~~~bash
xdg-mime query default inode/directory
~~~

| الحتة | معناها |
|---|---|
| [[query default]] | اسأل مين الافتراضي |
| [[inode/directory]] | النوع (MIME type) بتاع الفولدرات |

في الكونتينر مطبعش ولا حاجة (مفيش برامج رسومية متسطبة) و exit code كان 0. على أوبونتو بشاشة بيرجع [[org.gnome.Nautilus.desktop]]، يعني Files.

---

## الخلاصة

| النظام | الأمر |
|---|---|
| لينكس | [[xdg-open]] |
| ماك | [[open]] |
| ويندوز (CMD) | [[start]] |
| ويندوز (PowerShell) | [[Invoke-Item]] أو [[ii]] |
| WSL | [[explorer.exe .]] |

[[no method available]] = مفيش واجهة رسومية (سيرفر، أو Docker، أو ssh).`,
          lines: [
            "افتح الفولدر الحالي في Files.",
            "افتح الموقع المحلي في المتصفح الافتراضي.",
            "افتح تقرير HTML اتولّد في المتصفح.",
            "افتح صورة في عارض الصور."
          ],
          sol: R`[[xdg-open .]] مش هيطبع حاجة والـ prompt هيرجع على طول، ونافذة Files هتفتح على نفس الفولدر (اتأكد من المسار فوق). الأمر بيفتح أي حاجة بالبرنامج الافتراضي لنوعها، والفولدر برنامجه Files.

لو طلع [[xdg-open: no method available for opening '.']] يبقى انت على جهاز من غير واجهة رسومية: سيرفر، أو WSL من غير WSLg، أو داخل بـ ssh. ولو فتح VS Code أو برنامج تاني بدل Files، يبقى البرنامج ده متسجل كافتراضي للفولدرات، ترجّعه بـ [[xdg-mime default org.gnome.Nautilus.desktop inode/directory]].`
        }
      ]
    }
]);
