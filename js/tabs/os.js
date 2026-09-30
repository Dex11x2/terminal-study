// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("os", {
  label: "اختصارات النظام",
  prompt: "$ ",
  lab: R`Win+R  →  اكتب الأمر  →  Enter
Win+X  →  قايمة أدوات الإدارة
مفتاح Win وحده  →  ابدأ اكتب اسم أي برنامج`,
  labText: "مفيش حاجة تتسطّب. جرّب كل اختصار وانت بتقرا، وعلّم على «جربتها». على الماك Cmd مكان Ctrl في أغلب الاختصارات.",
  levels: {"1":["كل يوم","الاختصارات اللي هتستخدمها كل ساعة: التنقل بين البرامج والملفات والشاشة"],"2":["أدوات النظام","قائمة Run وأدوات الإدارة: الخدمات والشبكة ومتغيرات البيئة والبرامج اللي بتقوم مع الجهاز"],"3":["تحكم كامل","مسارات مخفية، وتخصيص الاختصارات، وحل المشاكل من غير ما تدوّر"]},
  categories: [
    {
      t: "ويندوز: كل يوم",
      l: 1,
      n: "ويندوز 11: تفتح وتتنقل وتصوّر وترتّب الشبابيك من غير ما تمسك الماوس",
      items: [
        {
          cmd: "Win",
          title: "افتح أي برنامج أو إعداد بالكتابة",
          desc: R`دوس مفتاح Win لوحده وابدأ اكتب على طول: «code» يفتح VS Code، و «terminal» يفتح Windows Terminal، و «env» يطلعلك صفحة متغيرات البيئة. مش محتاج تدوّر في قايمة Start ولا على الديسكتوب.

ولو عايز البرنامج يفتح كأدمن، اكتب اسمه ودوس Ctrl+Shift+Enter بدل Enter. وأرقام الـ taskbar كمان اختصارات: Win+1 يفتح أول برنامج متثبّت عليه، Win+2 التاني، وهكذا.`,
          example: R`Win → type "code"                     open VS Code
Win → type "env"                      edit environment variables
Win → type "terminal" → Ctrl+Shift+Enter   run it as administrator
Win+1 .. Win+9                        open / switch to taskbar app N
Win+Shift+1                           new window of taskbar app 1
Win+E                                 File Explorer
Win+D                                 show desktop (again to restore)
Win+I                                 Settings
Win+L                                 lock the PC`,
          try: "ثبّت Terminal و VS Code والمتصفح في أول ٣ أماكن على الـ taskbar، واتنقل بينهم بـ Win+1 و Win+2 و Win+3 لمدة ساعة من غير ماوس.",
          flag: "keys",
          deep: {
            why: "كل مرة تسيب الكيبورد عشان تدوّر على أيقونة بتضيّع ثواني وتركيز. البحث بالكتابة أسرع من أي قايمة، وبيوصلك لإعدادات مدفونة جوه Control Panel.",
            how: R`بحث Start بيدوّر في البرامج المتسطبة وصفحات الإعدادات والملفات الأخيرة. مش لازم تكتب الاسم كامل: «vsc» أو «code» كفاية لـ VS Code.

Win+رقم بيشتغل على ترتيب الأيقونات على الـ taskbar: لو البرنامج مقفول يفتحه، ولو مفتوح يجيبه قدام، ولو مفتوح منه أكتر من نافذة دوس الرقم تاني يلف بينهم. Win+Shift+رقم بيفتح نسخة جديدة، و Win+Alt+رقم بيفتح الـ jump list (آخر فولدرات فتحتها في VS Code مثلًا).

Ctrl+Shift+Enter بيشتغل في بحث Start وفي Win+R الاتنين، وبيطلعلك نافذة UAC تأكّد.`,
            when: "طول اليوم. وخصوصًا لما تحتاج صفحة إعدادات مش فاكر مكانها، اكتب اسمها بالإنجليزي في البحث.",
            mistakes: "إنك تقوم من على الجهاز وسايبه مفتوح وعليه ملف .env أو جلسة سيرفر. Win+L قبل ما تقوم، دي عادة. وخلي بالك إن البحث ساعات بيجيب نتايج من النت، فلو اللي كتبته مش برنامج متسطب هيفتحلك المتصفح."
          },
          sol: R`التثبيت: افتح البرنامج، كليك يمين على أيقونته في الـ taskbar ثم «Pin to taskbar»، واسحبها لأول مكان. بعد كده Win+1 يفتح Terminal لو مقفول، ولو مفتوح يجيبه قدامك، ولو هو قدامك أصلًا يعمله minimize. Win+2 نفس الكلام لـ VS Code، و Win+3 للمتصفح. الترقيم بيبدأ من أول أيقونة متثبتة بعد زرار Start و Search و Task View، مش من الشمال خالص.

لو Win+1 فتح برنامج غلط، يبقى فيه أيقونة تانية متثبتة قبله (زي File Explorer أو Edge اللي بييجوا متثبتين من الأول). ولو البرنامج له أكتر من نافذة، Win+1 بيعرضلك صور مصغرة ودوسه تاني يتنقل بينهم. وخد بالك: لو الكيبورد على العربي، Win+رقم شغال عادي، لأن ويندوز بيقرا الزرار نفسه مش الحرف.`
        },
        {
          cmd: "Win+V",
          title: "ارجع لحاجة نسختها من شوية",
          desc: R`Ctrl+V بيلزق آخر حاجة نسختها بس. Win+V بيفتح تاريخ الكليب بورد: آخر ٢٥ حاجة نسختها، تختار منهم اللي انت عايزه. أول مرة هيقولك الخاصية مقفولة، دوس Turn on.

وتقدر تثبّت (Pin) حاجات بتلزقها كتير، زي أمر طويل بتكتبه كل يوم أو IP السيرفر التجريبي، فتفضل موجودة حتى بعد الريستارت.`,
          example: R`Win+V                  open clipboard history
Win+V → Turn on        first time only
Up/Down → Enter        paste an older item
... → Pin              keep it after restart
... → Clear all        wipe the history
Win+R → ms-settings:clipboard     the settings page`,
          try: "فعّل Win+V، وانسخ ٣ حاجات ورا بعض (أمر، ولينك، وسطر كود)، وبعدين الزق التالتة الأولى من غير ما تنسخها تاني.",
          flag: "keys",
          deep: {
            why: "بتنسخ التوكن من صفحة، وقبل ما تلزقه تنسخ اسم المتغير، فيضيع التوكن وترجع تجيبه تاني. تاريخ الكليب بورد بيحل ده.",
            how: R`ويندوز بيحتفظ بآخر ٢٥ حاجة (نص وصور صغيرة) في الذاكرة. الحاجات المتثبّتة بس هي اللي بتفضل بعد الريستارت، والباقي بيتمسح.

فيه خيار «Sync across devices» في نفس صفحة الإعدادات بيرفع الكليب بورد على حسابك. الأحسن تسيبه مقفول على جهاز شغل.`,
            when: "وانت بتنقل كذا قيمة من مكان لمكان: متغيرات .env، أو أوامر من دوكيومنتيشن، أو أجزاء من error.",
            mistakes: "الباسوردات والتوكنز اللي بتنسخها بتتحفظ في التاريخ برضه. بعد ما تنسخ secret، امسحه من Win+V (النقط التلاتة ← Delete)، ومتثبّتش أي secret أبدًا. ولو بتشارك الشاشة في ميتنج متفتحش Win+V."
          },
          sol: R`أول Win+V هتظهر نافذة صغيرة فيها زرار «Turn on»، دوسه. من هنا ورايح أي حاجة بتنسخها بتتحفظ. انسخ الأمر ثم اللينك ثم سطر الكود، وبعدين دوس Win+V: هتلاقي التلاتة في لستة، الأحدث فوق. انزل بالسهم للتالت من فوق (الأمر اللي نسخته الأول) ودوس Enter، هيتلزق مكان المؤشر.

لو النسخة الأولى مش موجودة في اللستة، غالبًا نسختها قبل ما تفعّل الخاصية، فهي مش متسجلة. والتاريخ بيتمسح مع كل restart إلا اللي عملته Pin. والصور كمان بتتحفظ فيه، فممكن تلاقي screenshots قديمة وسط اللستة.`
        },
        {
          cmd: "Win+Shift+S",
          title: "صوّر جزء من الشاشة",
          desc: R`Win+Shift+S بيخليك تحدد أي جزء من الشاشة، والصورة بتروح الكليب بورد على طول، فتلزقها في issue على GitHub أو في شات بـ Ctrl+V. لو دوست على الإشعار اللي بيطلع، بيفتحها في Snipping Tool ترسم عليها أو تحفظها.

وفي ويندوز 11 زرار PrtScn نفسه بقى بيفتح نفس الأداة، و Win+Shift+R بيسجّل فيديو لجزء من الشاشة، مفيد جدًا لما تشرح bug بيحصل بحركة.`,
          example: R`Win+Shift+S        snip a region → clipboard
PrtScn             same tool (Windows 11 default)
Win+PrtScn         full screen → Pictures\Screenshots
Win+Shift+R        record a region as video
Ctrl+V             paste the snip into GitHub / chat`,
          try: "افتح Console في المتصفح على أي صفحة فيها error، صوّر الجزء الأحمر بس بـ Win+Shift+S، والزقه في أي شات.",
          flag: "keys",
          deep: {
            why: "«مش شغال» من غير صورة مالهاش معنى. صورة للـ error بالظبط بتوفر رسايل كتير رايحة جاية.",
            how: R`الأداة اللي بتفتح هي Snipping Tool. فوق فيه اختيارات: مستطيل، أو شكل حر، أو نافذة واحدة، أو الشاشة كلها. الصورة بتتنسخ على الكليب بورد، ومن الإشعار تفتحها للتعديل.

Win+PrtScn بيحفظ الشاشة كلها كملف في [[Pictures\Screenshots]] من غير أي سؤال. و Win+Shift+R بيسجّل فيديو، وبعد ما توقف التسجيل تحفظه من Snipping Tool.`,
            when: "تبليغ عن bug، شرح لعميل فين الزرار، توثيق خطوات في README.",
            mistakes: "صورة فيها توكن أو باسورد أو إيميل عميل ظاهر في التاب اللي جنبه. بص على الصورة كويس قبل ما تبعتها، وقص الجزء الحساس."
          },
          sol: R`الشاشة هتغمق شوية وشريط صغير يظهر فوق. اسحب مستطيل حوالين السطر الأحمر بس. مش هيطلع ملف، بس إشعار في الركن تحت «Snip copied to clipboard». روح للشات ودوس Ctrl+V، هتلاقي الصورة اتلزقت. ولو دوست على الإشعار نفسه، Snipping Tool هيفتح وتقدر ترسم عليها أو تحفظها.

لو ضغطت Win+Shift+S ومحصلش حاجة، غالبًا برنامج تاني (زي Lightshot أو ShareX) واخد الاختصار، أو Snipping Tool متعطل من الإعدادات. ولو لزقت ولقيت الصورة فيها الشاشة كلها، يبقى اخترت وضع «Fullscreen» من الشريط اللي فوق بدل «Rectangle».`
        },
        {
          cmd: "Win+Z",
          title: "رتّب الشبابيك جنب بعض",
          desc: R`Win+Z بيفتح Snap Layouts: تختار تقسيمة (نصين، تلات أعمدة، ...) والنافذة تروح مكانها، وبعدين ويندوز يسألك تحط إيه في الباقي. أسرع طريقة تحط VS Code على الشمال والمتصفح على اليمين.

ومن غير قايمة: Win+سهم شمال أو يمين يلزّق النافذة في نص الشاشة، Win+سهم فوق يكبّرها. ولو عندك شاشتين، Win+Shift+سهم ينقل النافذة للشاشة التانية.`,
          example: R`Win+Z                 snap layouts menu → pick a zone
Win+Left / Win+Right  snap to half the screen
Win+Up                maximize
Win+Down              restore / minimize
Win+Shift+Left/Right  move window to the other monitor`,
          try: "افتح VS Code والمتصفح، ولزّق واحد شمال وواحد يمين بـ Win+Left و Win+Right. بعدين جرّب Win+Z واختار تلات أعمدة وضيف الترمنال.",
          flag: "keys",
          deep: {
            why: "وانت بتطوّر محتاج الكود والنتيجة قدامك في نفس اللحظة. سحب الشبابيك بالماوس وتظبيط حجمها كل مرة تضييع وقت.",
            how: R`بعد ما تلزّق نافذة، ويندوز بيعرض باقي البرامج المفتوحة في المساحة الفاضية تختار منها (Snap Assist). والشبابيك اللي اتلزقت مع بعض بتتحفظ كـ «مجموعة» تقدر ترجعلها من الـ taskbar.

نفس القايمة بتظهر لو وقفت بالماوس على زرار التكبير في أي نافذة، أو لو سحبت النافذة لفوق الشاشة.`,
            when: "كود + متصفح، أو كود + دوكيومنتيشن، أو ترمنال + لوجات.",
            mistakes: "لو Win+Z مش بيعمل حاجة، يبقى Snap مقفول: Settings ← System ← Multitasking ← Snap windows. وبعض البرامج بتفرض حد أدنى لعرضها فمش بتدخل في عمود ضيق."
          },
          sol: R`Win+Left على VS Code هيلزّقه في النص الشمال، وويندوز هيعرض باقي النوافذ صور مصغرة في النص التاني، اختار المتصفح وهيتحط يمين لوحده (ده اسمه Snap Assist). بعدين Win+Z على أي نافذة هيعرض ٤ لـ ٦ أشكال تقسيم حسب حجم الشاشة. اختار شكل التلات أعمدة ودوس الرقم أو الكليك على المكان، وبعدين اختار الترمنال للمكان الفاضي.

لو شكل التلات أعمدة مش ظاهر، الشاشة صغيرة (ويندوز بيعرض الأشكال حسب عرض الشاشة ودقتها). ولو Win+Z مش شغال خالص، فعّل Snap windows من Settings ثم System ثم Multitasking.`
        },
        {
          cmd: "Win+Tab",
          title: "اعمل شاشة منفصلة لكل مشروع",
          desc: R`Virtual desktops يعني كذا «ديسكتوب» على نفس الشاشة، كل واحد عليه شبابيكه. واحد للمشروع اللي شغال عليه، وواحد للإيميل والشات، فمتتلخبطش.

Win+Tab بيوريك كل الشبابيك وكل الديسكتوبات. Win+Ctrl+D يعمل ديسكتوب جديد، و Win+Ctrl+سهم يتنقل بينهم، و Win+Ctrl+F4 يقفل اللي انت فيه (والشبابيك بتتنقل للي جنبه، مش بتتقفل).`,
          example: R`Win+Tab              Task View: all windows and desktops
Win+Ctrl+D           new virtual desktop
Win+Ctrl+Left/Right  switch desktop
Win+Ctrl+F4          close current desktop (windows move, not close)
Alt+Tab              switch windows`,
          try: "اعمل ديسكتوب تاني بـ Win+Ctrl+D وافتح فيه المتصفح بس، وارجع للأول بـ Win+Ctrl+Left. من Win+Tab كليك يمين على الديسكتوب وسمّيه باسم المشروع.",
          flag: "keys",
          deep: {
            why: "لما تبقى فاتح ١٥ نافذة، Alt+Tab بيبقى متاهة. تقسيم الشغل على ديسكتوبات بيقلل التشتيت، وبيسهل تشارك شاشة ديسكتوب واحد في ميتنج من غير ما الباقي يبان.",
            how: R`كل ديسكتوب ليه شبابيكه، لكن البرامج نفسها واحدة: VS Code المفتوح في ديسكتوب ١ هو نفس البرنامج. من Win+Tab تقدر تسحب نافذة من ديسكتوب لديسكتوب، أو كليك يمين عليها ← «Show this window on all desktops».

على التاتش باد: أربع صوابع يمين أو شمال بيتنقلوا بين الديسكتوبات.`,
            when: "شغال على مشروعين في نفس اليوم. عايز تشارك شاشة من غير ما الشات والإيميل يبانوا.",
            mistakes: "تدوّر على نافذة بـ Alt+Tab ومتلاقيهاش لأنها في ديسكتوب تاني. ده بيتحدد من Settings ← System ← Multitasking ← Desktops (هل Alt+Tab والـ taskbar يعرضوا شبابيك كل الديسكتوبات ولا الحالي بس)."
          },
          sol: R`Win+Ctrl+D هيوديك على ديسكتوب فاضي على طول. افتح فيه المتصفح، و Win+Ctrl+Left يرجعك للأول، والمتصفح مش هيبان هناك ولا في الـ taskbar بتاعته (الافتراضي إن الـ taskbar بيعرض برامج الديسكتوب الحالي بس). من Win+Tab هتلاقي الديسكتوبات تحت، كليك يمين على التاني ثم Rename، واكتب اسم المشروع. الاسم بيتحفظ حتى بعد restart.

لو فتحت المتصفح في الديسكتوب التاني ولقيته فتح في الأول، يبقى المتصفح كان مفتوح قبل كده، ودوسة أيقونته بتنقلك للنافذة القديمة. افتح نافذة جديدة بـ Ctrl+N من جوه الديسكتوب التاني.`
        },
        {
          cmd: "Ctrl+Shift+Esc",
          title: "اقفل برنامج علّق أو node مش راضي يقفل",
          desc: R`Ctrl+Shift+Esc بيفتح Task Manager على طول، من غير شاشة Ctrl+Alt+Del. فوق فيه خانة بحث: اكتب [[node]] أو [[docker]] وهتلاقي العمليات، كليك يمين ← End task.

ده الحل لما تقفل الترمنال والسيرفر يفضل ماسك البورت («port 3000 is already in use»). ولو عايز تعرف بالظبط أنهي عملية ماسكة البورت، [[netstat -ano]] و [[taskkill]] متشرحين في تاب CMD.`,
          example: R`Ctrl+Shift+Esc         open Task Manager
Search box → "node"    find every node.exe
Right-click → End task kill it
Details tab            shows PID (match it with netstat -ano)
Details → right-click header → Select columns → Command line
Startup apps           stop heavy apps from starting with Windows`,
          try: "شغّل [[npx http-server]] أو أي dev server، واقفله من Task Manager بدل Ctrl+C، وشوف السيرفر وقف في الترمنال.",
          flag: "keys",
          deep: {
            why: "عملية node فضلت شغالة في الخلفية بعد ما الترمنال اتقفل أو VS Code وقع، وماسكة البورت أو ماسكة فايلات في node_modules فمش عارف تمسحه.",
            how: R`تاب Processes بيجمّع العمليات تحت اسم البرنامج. تاب Details بيعرض كل عملية لوحدها بالـ PID. لو عندك كذا node.exe ومش عارف مين مين، ضيف عمود «Command line» من كليك يمين على عناوين الأعمدة: هتشوف [[node server.js]] أو [[vite]] جنب كل واحدة.

تاب Performance بيوريك الرامات والبروسيسور، وتحت CPU مكتوب Virtualization: Enabled أو Disabled، ودي مهمة لـ WSL و Docker.`,
            when: "برنامج مش بيرد. بورت مشغول. الجهاز بطيء وعايز تعرف مين السبب. Docker أو WSL واكلين الرامات.",
            mistakes: "إنك تقفل حاجات مش عارفها في تاب Details (زي svchost أو csrss)، ممكن الجهاز يعمل restart أو حاجات تقف. اقفل اللي انت عارفه بس. ولو الـ taskbar نفسه علّق، دوّر على «Windows Explorer» واختار Restart مش End task."
          },
          sol: R`في Task Manager اكتب [[node]] في خانة البحث فوق، هيظهر «Node.js JavaScript Runtime» (ممكن أكتر من واحد، أو جوه مجموعة Windows Terminal). كليك يمين ثم End task. في الترمنال السيرفر هيقف فجأة والـ prompt هيرجع، غالبًا من غير رسالة، لأن العملية اتقتلت مش خلصت بشياكة زي Ctrl+C.

لو فيه كذا node.exe ومش عارف أنهي، روح تاب Details وضيف عمود Command line: هتلاقي [[http-server]] في سطر واحد منهم. ولو قفلت واحد والسيرفر لسه شغال، يبقى قفلت عملية تانية (زي language server بتاع VS Code)، وده هيبوظ VS Code مش السيرفر.`
        },
        {
          cmd: "Win+X",
          title: "قايمة أدوات الإدارة المخفية",
          desc: R`Win+X (أو كليك يمين على زرار Start) بيفتح قايمة فيها أهم أدوات النظام: Terminal، و Terminal (Admin)، و Task Manager، و Device Manager، و Event Viewer، و Disk Management، و Installed apps.

وكل عنصر ليه حرف: Win+X وبعدها A يفتح ترمنال كأدمن على طول. دي أسرع طريقة لأمر زي [[wsl --install]] أو تعديل ملف hosts.`,
          example: R`Win+X            open the Quick Link menu
Win+X → A        Terminal (Admin)
Win+X → I        Terminal
Win+X → T        Task Manager
Win+X → M        Device Manager
Win+X → V        Event Viewer`,
          try: "افتح ترمنال كأدمن بـ Win+X ثم A، ولاحظ إن عنوان النافذة مكتوب فيه Administrator. اقفله على طول لو مش محتاجه.",
          flag: "keys",
          deep: {
            why: "أوامر كتير محتاجة صلاحيات أدمن (تفعيل WSL، إدارة الخدمات، ملف hosts). بدل ما تدوّر وتعمل كليك يمين ← Run as administrator، حرفين وخلاص.",
            how: R`القايمة دي موجودة من ويندوز 8 للمحترفين. الحرف المتسطّر تحت كل عنصر هو اختصاره بعد Win+X. في ويندوز 11 «Terminal» بيفتح Windows Terminal بالبروفايل الافتراضي بتاعك (PowerShell غالبًا).

الأدوات اللي فيها هتلاقي شرح كل واحدة في المستوى التاني من التاب ده.`,
            when: "أي حاجة محتاجة أدمن. أو لما تحتاج Device Manager أو Event Viewer بسرعة.",
            mistakes: "تشتغل في ترمنال الأدمن طول اليوم. ده بيخلي أي غلطة (زي [[rm]] في المكان الغلط) أخطر، وبيعمل ملفات صاحبها Administrator تتعبك بعدين. استخدمه للأمر اللي محتاجه واقفله."
          },
          sol: R`Win+X ثم A هيطلع رسالة UAC «Do you want to allow this app to make changes to your device?» دوس Yes، وبعدين Terminal يفتح وعنوان التاب أو النافذة يبدأ بـ [[Administrator:]]، زي [[Administrator: Windows PowerShell]]. ولو كتبت [[whoami /groups | findstr High]] هتلاقي [[High Mandatory Level]]، ودي الصلاحيات العالية.

الحروف بتشتغل لأنها متعلّمة بخط تحت في القايمة. لو الكيبورد على العربي، الحرف ممكن ميشتغلش لأن القايمة بتدوّر على الحرف اللي اتكتب (هيبقى «ش» مش A)، حوّل للإنجليزي أو استخدم الأسهم و Enter. وفي ويندوز 10 القايمة فيها PowerShell بدل Terminal.`
        },
        {
          cmd: "wt -d .",
          title: "افتح ترمنال في الفولدر اللي فاتحه في Explorer",
          desc: R`وانت في فولدر المشروع في Explorer، دوس Ctrl+L (أو Alt+D) عشان توصل لشريط العنوان، واكتب [[cmd]] أو [[powershell]] ودوس Enter: هيفتحلك ترمنال في نفس الفولدر. ولـ Windows Terminal اكتب [[wt -d .]]، ولـ VS Code اكتب [[code .]].

وفي ويندوز 11 كمان: كليك يمين في أي مكان فاضي في الفولدر ← Open in Terminal.`,
          example: R`Ctrl+L (or Alt+D)     focus the Explorer address bar
cmd                   CMD opened in this folder
powershell            PowerShell in this folder
wt -d .               Windows Terminal in this folder
code .                VS Code on this folder
wsl                   Ubuntu (WSL) in this folder
Right-click empty space → Open in Terminal`,
          try: "افتح فولدر أي مشروع في Explorer، واكتب [[wt -d .]] في شريط العنوان، واكتب [[pwd]] في الترمنال واتأكد إنه نفس الفولدر.",
          flag: "keys",
          deep: {
            why: "بدل ما تفتح ترمنال وتكتب [[cd]] لمسار طويل فيه مسافات، انت أصلًا واقف في الفولدر. خلّيه يفتح هناك.",
            how: R`اللي بتكتبه في شريط العنوان لو مش مسار، Explorer بيشغّله كأمر، والفولدر الحالي بيبقى هو فولدر الشغل بتاعه. [[cmd]] و [[powershell]] و [[code]] بيكمّلوا من الفولدر ده.

[[wt]] لوحده بيفتح في المكان الافتراضي بتاعه (الهوم غالبًا)، عشان كده [[-d .]] بتقوله «ابدأ من هنا». و [[wsl]] بيفتح أوبونتو واقف على نفس الفولدر من [[/mnt/c/...]]، بس للشغل اليومي الأحسن تحط المشروع جوه لينكس (متشرح في تاب WSL).`,
            when: "كل مرة تفتح مشروع. بعد ما تفك zip ريبو وعايز [[npm install]] على طول.",
            mistakes: "إنك تجرّب ده وانت واقف في «Home» أو «This PC» أو «Quick access». دي مش فولدرات حقيقية، فمش هيعرف يفتح فين. ادخل فولدر حقيقي الأول. ولو [[code .]] مش شغال، يبقى VS Code مش في الـ PATH (خيار «Add to PATH» وقت التسطيب)."
          },
          sol: R`هيفتح Windows Terminal في نافذة جديدة، و [[pwd]] في PowerShell هيطبع جدول صغير تحت عنوان [[Path]] فيه نفس مسار الفولدر اللي كان في Explorer، زي [[C:\Users\you\projects\myapp]]. لو التاب الافتراضي Ubuntu (WSL)، هيطبع [[/mnt/c/Users/you/projects/myapp]]، وده نفس الفولدر من جوه لينكس.

لو طلعت رسالة «Windows cannot find 'wt'»، يبقى Windows Terminal مش متسطب (شائع في ويندوز 10)، سطّبه من Store أو [[winget install Microsoft.WindowsTerminal]]. ولو [[pwd]] طلع [[C:\Users\you]] بدل الفولدر، غالبًا البروفايل متظبط على «Starting directory» ثابت وبيتجاهل [[-d]]، أو كتبت الأمر في Win+R بدل شريط عنوان Explorer.`
        },
        {
          cmd: "Ctrl+Shift+C",
          title: "انسخ المسار الكامل لملف",
          desc: R`حدد الملف في Explorer ودوس Ctrl+Shift+C (أو كليك يمين ← Copy as path): المسار الكامل بيتنسخ جوه علامات تنصيص، زي [[C:\Users\you\projects\myapp\.env]]. مفيد لما تحتاج مسار في أمر أو في config.

وفي نفس السياق: F2 يغيّر الاسم، Alt+Enter يفتح الخصائص، Ctrl+Shift+N فولدر جديد، Alt+سهم فوق يطلعك للفولدر الأب. ولو سحبت ملف ورميته جوه Windows Terminal، مساره بيتكتب لوحده.`,
          example: R`Ctrl+Shift+C      copy full path(s) of the selected item(s), quoted
F2                rename (Tab jumps to the next file)
Alt+Enter         Properties
Ctrl+Shift+N      new folder
Alt+Up            parent folder
Ctrl+T / Ctrl+W   new tab / close tab in Explorer
Drag a file into Windows Terminal → its path is typed`,
          try: "انسخ مسار [[package.json]] بتاع أي مشروع بـ Ctrl+Shift+C، والزقه في الترمنال بعد [[type]] (CMD) أو [[Get-Content]] (PowerShell).",
          flag: "keys",
          deep: {
            why: "كتابة مسار طويل بإيدك (فيه AppData ومسافات) بتجيب أخطاء كتابة. النسخ بيضمن إنه صح.",
            how: R`المسار بيتنسخ بعلامات تنصيص عشان لو فيه مسافات الترمنال يفهمه كحاجة واحدة. لو حددت كذا ملف، كل مسار في سطر.

F2 وانت بتغيّر الاسم: Tab ينقلك لتغيير اسم الملف اللي بعده، ومفيد لو بتسمّي كذا صورة ورا بعض.`,
            when: "مسار ملف لـ [[--env-file]]، أو ملف مفتاح SSH، أو مسار صورة في سكربت.",
            mistakes: R`لو هتلزق المسار في JSON (زي settings.json) لازم كل [[\]] تبقى [[\\]] أو تحوّلها لـ [[/]]، وإلا الملف هيبوظ. ولو هتستخدمه في bash جوه WSL، مسار ويندوز مش هيشتغل كده: [[C:\]] بتبقى [[/mnt/c/]].`
          },
          sol: R`في PowerShell: [[Get-Content ]] وبعدين Ctrl+V هيبقى [[Get-Content "C:\Users\you\projects\myapp\package.json"]] بعلامات تنصيص، ودوس Enter يطبع محتوى الـ JSON. في CMD نفس الكلام بـ [[type]]. علامات التنصيص اللي Explorer بيحطها لوحده بتحمي المسار لو فيه مسافات.

Ctrl+Shift+C في Explorer موجود في ويندوز 11 بس. على ويندوز 10 استخدم Shift + كليك يمين ثم «Copy as path». ولو اتلزق حاجة غريبة، اتأكد إن الملف متحدد فعلًا (مش بس الماوس عليه) قبل الاختصار.`
        },
        {
          cmd: "File name extensions",
          title: "اعرض امتداد الملفات والملفات المخفية",
          desc: R`ويندوز بيخبّي امتداد الملفات افتراضيًا، فـ [[index.html.txt]] بيبان [[index.html]] وانت مش واخد بالك. وبيخبّي كمان فولدرات زي [[AppData]] و [[.git]].

من Explorer: View ← Show ← علّم على «File name extensions» و «Hidden items». مرة واحدة وتفضل كده في كل الفولدرات.`,
          example: R`Explorer → View → Show → File name extensions    see .js .env .txt
Explorer → View → Show → Hidden items            see AppData, .git
Win+R → ms-settings:developers                    File Explorer section has the same switches`,
          try: "فعّل الاتنين، وادخل فولدر أي ريبو: لازم تشوف [[.git]] باهت شوية (يعني مخفي)، وامتداد كل ملف.",
          flag: "keys",
          deep: {
            why: "مشاكل حقيقية بتحصل من الإخفاء ده: ملف [[.env]] اتحفظ من Notepad باسم [[.env.txt]] فالتطبيق مش لاقيه، أو مرفق اسمه [[invoice.pdf.exe]] بيبان PDF.",
            how: R`الامتداد هو اللي بيحدد ويندوز يفتح الملف بإيه. لما يبقى مخفي، تغيير الاسم بيغيّر الجزء اللي قبله بس، فتكتب [[.env]] ويبقى [[.env.txt]] في الحقيقة.

«Hidden items» بيعرض الملفات اللي عليها attribute اسمه hidden (زي [[AppData]]، و [[.git]] اللي Git for Windows بيخبيه). في ويندوز الملفات اللي بتبدأ بنقطة مش بتتخبّى لوحدها زي لينكس. ملفات النظام الحساسة ليها إعداد تاني منفصل، سيبه زي ما هو.`,
            when: "أول حاجة تعملها على أي جهاز ويندوز جديد هتبرمج عليه.",
            mistakes: "تحفظ .env من Notepad من غير ما تختار «All files» في Save as type، فيتحفظ .env.txt. وتفضل تدوّر ليه المتغيرات undefined. شوف الامتداد الأول."
          },
          sol: R`بعد الاتنين هتشوف [[.git]] و [[.gitignore]] و [[.env]] باهتين شوية لأنهم مخفيين أو بيبدأوا بنقطة، وكل ملف باسمه كامل زي [[index.js]] و [[package.json]] بدل «index» بس. ولو فيه ملف كنت فاكره [[.env]] وطلع [[.env.txt]]، ده بالظبط السبب إن الإعداد ده مهم.

ملحوظة: [[.gitignore]] و [[.env]] ممكن يبانوا عادي مش باهتين، لأن الباهت هو اللي عليه attribute «Hidden» في ويندوز، و Git بيحط الـ attribute ده على [[.git]] بس. لو [[.git]] مش ظاهر خالص حتى بعد التفعيل، يبقى الفولدر ده مش ريبو Git.`
        },
        {
          cmd: "Alt+Shift+Plus",
          title: "قسّم Windows Terminal لكذا ترمنال جنب بعض",
          desc: R`في Windows Terminal تقدر تقسم التاب الواحد لكذا ترمنال (panes): Alt+Shift+Plus يفتح واحد على اليمين، و Alt+Shift+Minus يفتح واحد تحت. Alt+الأسهم يتنقل بينهم، و Ctrl+Shift+W يقفل اللي انت فيه.

كده [[npm run dev]] على الشمال، و git على اليمين، واللوجات تحت، في نافذة واحدة.`,
          example: R`Alt+Shift+Plus     split: new pane on the right (Plus = Shift+= key)
Alt+Shift+Minus    split: new pane below
Alt+Shift+D        split and duplicate the current profile
Alt+Arrows         move focus between panes
Alt+Shift+Arrows   resize the focused pane
Ctrl+Shift+W       close pane (or tab if it's the last one)
Ctrl+Shift+T       new tab
Ctrl+Shift+1..9    new tab with profile N (PowerShell, Ubuntu, ...)
Ctrl+Shift+P       command palette`,
          try: "افتح Windows Terminal، قسّمه لتلاتة: اتنين فوق وواحد تحت. شغّل [[ping 8.8.8.8 -t]] في واحد واتنقل بين الباقي بـ Alt+الأسهم.",
          flag: "keys",
          deep: {
            why: "الشغل العادي محتاج كذا ترمنال: سيرفر شغال، وأوامر git، ولوجات. فتح كذا نافذة وتبديل بينهم بيتوّه.",
            how: R`كل pane ترمنال مستقل بالكامل، بشيل مختلف لو عايز (PowerShell في واحد و Ubuntu في التاني). Alt+Shift+D بيفتح نفس البروفايل بتاع اللي انت فيه في أكتر مساحة فاضية.

الـ Plus هو نفس زرار الـ = على الكيبورد (مع Shift). كل الاختصارات دي تتغير من Settings (Ctrl+,) ← Actions. والـ command palette (Ctrl+Shift+P) فيه كل الأوامر لو نسيت اختصار، زي «Toggle pane zoom» اللي بيكبّر pane واحد مؤقتًا.`,
            when: "أي مشروع فيه frontend و backend شغالين مع بعض. أو وانت متابع لوجات سيرفر وبتكتب أوامر.",
            mistakes: R`Ctrl+Shift+W بيقفل الـ pane من غير سؤال، ولو كان فيه سيرفر شغال هيقف. وفي Windows Terminal، Ctrl+C بينسخ لو فيه كلام متحدد بس، ولو مفيش بيبعت إيقاف للأمر الشغال (متشرح في تاب ابدأ من هنا).`
          },
          sol: R`الترتيب اللي بيوصلك للشكل المطلوب: Alt+Shift+Minus الأول (بيقسم فوق وتحت)، وبعدين Alt+Up يوديك للجزء اللي فوق، وبعدين Alt+Shift+Plus يقسمه شمال ويمين. في أي واحد [[ping 8.8.8.8 -t]] هيفضل يطبع [[Reply from 8.8.8.8: bytes=32 time=20ms TTL=117]] كل ثانية، وانت بتتنقل بـ Alt+الأسهم وهو شغال. وقّفه بـ Ctrl+C لما تخلص.

لو عملت Plus الأول، هيبقى عندك اتنين جنب بعض وتحت واحد منهم بس. وعلى الكيبورد العربي: Alt+Shift هو اختصار تغيير اللغة في ويندوز لو متفعّل، فممكن تلاقي اللغة اتقلبت بعد الاختصار. الحل تستخدم Win+Space لتغيير اللغة وتقفل Alt+Shift من Settings ثم Time & language ثم Typing ثم Advanced keyboard settings ثم Input language hot keys. و Plus يعني زرار [[=]] مع Shift، أو + اللي في الـ numpad.`
        }
      ]
    },
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
    },
    {
      t: "الماك: كل يوم",
      l: 1,
      n: "macOS الحالي: Cmd بيقوم بدور Ctrl في ويندوز في أغلب الاختصارات",
      items: [
        {
          cmd: "Cmd+Space",
          title: "افتح أي برنامج أو ملف على الماك بالكتابة",
          desc: R`Cmd+Space بيفتح Spotlight: اكتب «term» يفتح Terminal، و «code» يفتح VS Code، و «activity» يفتح Activity Monitor. وبيحسب كمان: اكتب [[1024*8]] وهيطلعلك الناتج.

دي أسرع طريقة لأي حاجة على الماك، أسرع من Finder أو الـ Dock.`,
          example: R`Cmd+Space → "term"      open Terminal
Cmd+Space → "code"      open VS Code
Cmd+Space → "activity"  open Activity Monitor
Cmd+Space → 1024*8      quick calculation
Cmd+Space → file name → Cmd+R        reveal it in Finder
Cmd+,                   settings of the app in front`,
          try: "افتح Terminal و VS Code و System Settings بـ Spotlight ورا بعض من غير ماوس.",
          flag: "keys",
          deep: {
            why: "على الماك مفيش قايمة Start. Spotlight هو المدخل لكل حاجة.",
            how: R`Spotlight بيدوّر في البرامج والملفات والإعدادات. Return يفتح النتيجة، و Cmd+R يفتح الفولدر اللي هي فيه في Finder بدل ما يفتحها، ولو مسكت Cmd بس هيوريك مسارها.

Cmd+, (فاصلة) في أي برنامج بيفتح إعداداته، حتى VS Code والمتصفح والترمنال.

فيه بدايل مشهورة للمبرمجين زي Raycast و Alfred، بتعمل نفس الحاجة وزيادة (سكربتات، clipboard history). دي برامج خارجية مش جزء من النظام.`,
            when: "كل مرة تفتح برنامج أو تدوّر على ملف.",
            mistakes: "لو Spotlight بيجيبلك آلاف النتايج من [[node_modules]] أو بيتقل الجهاز وانت بتعمل npm install، ضيف فولدر المشاريع لقايمة الاستثناء من إعدادات Spotlight (Search Privacy)."
          },
          sol: R`Cmd+Space ثم [[term]] ثم Return يفتح Terminal، وبعدين Cmd+Space ثم [[code]] ثم Return يفتح VS Code، وبعدين Cmd+Space ثم [[settings]] ثم Return يفتح System Settings. Spotlight بيتعلم: بعد كام مرة الحرفين الأولانيين كفاية، والنتيجة اللي بيختارها بتبقى متعلّمة فوق.

لو Cmd+Space غيّر اللغة بدل ما يفتح Spotlight، يبقى إعداد «Select the previous input source» واخد نفس الاختصار (بيحصل كتير لما تضيف العربي). غيّره من System Settings ثم Keyboard ثم Keyboard Shortcuts ثم Input Sources، أو استخدم زرار Globe (fn) لتغيير اللغة. وخلي بالك إن البحث وانت على العربي هيكتب حروف عربي ومش هيلاقي البرنامج.`
        },
        {
          cmd: "Cmd+Tab",
          title: "اتنقل بين البرامج واقفلها صح على الماك",
          desc: R`Cmd+Tab بيتنقل بين البرامج، و Cmd مع الزرار اللي فوق Tab بين شبابيك نفس البرنامج، زي لو فاتح مشروعين في VS Code.

وفرق مهم عن ويندوز: Cmd+W بيقفل النافذة بس والبرنامج بيفضل شغال (عليه نقطة في الـ Dock). Cmd+Q هو اللي بيقفل البرنامج فعلًا.`,
          example: R`Cmd+Tab           switch apps (keep Cmd held, Tab to move)
Cmd+Tab → Q       quit the highlighted app
Cmd+(key above Tab)   switch windows of the same app
Cmd+W             close the window (app keeps running)
Cmd+Q             quit the app
Cmd+H             hide the app
Cmd+Option+H      hide all other apps
Cmd+M             minimize to the Dock`,
          try: "افتح نافذتين من VS Code واتنقل بينهم بـ Cmd+`. بعدين وانت ماسك Cmd+Tab، وقف على برنامج مش محتاجه ودوس Q.",
          flag: "keys",
          deep: {
            why: "ناس كتير جاية من ويندوز بتقفل الشبابيك بـ Cmd+W وتفتكر البرنامج اتقفل، فتلاقي ١٠ برامج شغالة وواكلة الرامات.",
            how: R`على الماك البرنامج والنافذة حاجتين منفصلين. البرنامج ممكن يفضل شغال من غير ولا نافذة، والقايمة اللي فوق خالص (menu bar) بتاعة البرنامج اللي قدامك.

Cmd+H بيخفي البرنامج كله من غير ما يقفله، وبيرجع بـ Cmd+Tab، أنضف من Cmd+M اللي بيحطه في الـ Dock.`,
            when: "طول اليوم. وقبل ما تشارك الشاشة: Cmd+Option+H يخفي كل حاجة غير البرنامج اللي هتعرضه.",
            mistakes: "Cmd+Q جنب Cmd+W على الكيبورد، ولو دوسته غلط في المتصفح هيقفل كل التابات. في Chrome فيه خيار «Warn before quitting» فعّله."
          },
          sol: R`Cmd+(الزرار اللي فوق Tab) بيتنقل بين نافذتين VS Code. ولو ماسك Cmd+Tab ووقفت على برنامج ودوست Q (وانت لسه ماسك Cmd)، البرنامج هيتقفل وأيقونته تختفي من الشريط. البرنامج اللي مفيهوش نوافذ مفتوحة بيفضل في الشريط لحد ما تعمله Quit، وده الفرق بين Cmd+W و Cmd+Q.

على كيبورد عربي أو غير أمريكي، الزرار اللي فوق Tab عليه حرف تاني («ذ» أو § حسب الكيبورد)، بس الاختصار شغال على الزرار نفسه. لو مش شغال، شوف الاختصار الفعلي في System Settings ثم Keyboard ثم Keyboard Shortcuts ثم Keyboard ثم «Move focus to next window». ولو Q مقفلش البرنامج، يبقى سيبت Cmd قبل ما تدوسه.`
        },
        {
          cmd: "Cmd+Option+Esc",
          title: "اقفل برنامج علّق على الماك",
          desc: R`Cmd+Option+Esc بيفتح نافذة Force Quit: تختار البرنامج اللي مش بيرد ودوس Force Quit. ده زي End task في ويندوز.

لكنه بيعرض البرامج اللي ليها واجهة بس. عملية [[node]] شغالة في الخلفية مش هتظهر هنا، دي من Activity Monitor أو من الترمنال بـ [[lsof -i :3000]] (متشرح في تاب zsh).`,
          example: R`Cmd+Option+Esc        Force Quit window
Select app → Force Quit
Right-click Dock icon + hold Option → Force Quit`,
          try: "افتح Force Quit وشوف البرامج اللي شغالة دلوقتي، واقفل برنامج مش محتاجه (من غير Force، بـ Cmd+Q الأول).",
          flag: "keys",
          deep: {
            why: "برنامج علّق وقوس الانتظار الملوّن مش بيروح، و Cmd+Q مش بيعمل حاجة.",
            how: R`Force Quit بيبعت للبرنامج إشارة إيقاف فوري، من غير ما يديله فرصة يحفظ. البرنامج اللي مش بيرد بيكون مكتوب جنبه «Not Responding» بالأحمر.

للعمليات اللي من غير واجهة (node، python، docker): Activity Monitor أو [[kill]] من الترمنال.`,
            when: "برنامج مش بيرد خالص. محاولة Cmd+Q الأول دايمًا.",
            mistakes: "Force Quit لمحرر فيه تعديلات مش محفوظة هيضيّعها. استنى شوية الأول، يمكن البرنامج مشغول بس مش واقع."
          },
          sol: R`Cmd+Option+Esc يفتح نافذة «Force Quit Applications» فيها لستة البرامج المفتوحة ليك (مش عمليات السيستم). أي برنامج مهنج هيبقى مكتوب جنبه [[(not responding)]] بالأحمر. للبرنامج العادي: قفّل النافذة دي، وروح للبرنامج و Cmd+Q، فيقفل بشياكة ويسألك لو فيه حاجة مش متحفظة.

Force Quit مش بيسأل ولا بيحفظ، فاستخدمه بس للي مهنج. ولو البرنامج اللي عايزه مش ظاهر في اللستة (زي dev server شغال من الترمنال)، ده عملية مش برنامج، اقفله من Activity Monitor أو [[kill]].`
        },
        {
          cmd: "Ctrl+Up",
          title: "شوف كل الشبابيك ورتّبها على الماك",
          desc: R`Ctrl+سهم فوق بيفتح Mission Control: كل الشبابيك قدامك، وفوق الـ Spaces (زي virtual desktops). Ctrl+سهم شمال ويمين يتنقل بين الـ Spaces، و Ctrl+سهم تحت يعرض شبابيك البرنامج الحالي بس.

ومن macOS Sequoia فيه تقسيم شبابيك مدمج: Fn+Ctrl+سهم شمال أو يمين يحط النافذة في نص الشاشة.`,
          example: R`Ctrl+Up                 Mission Control (all windows + Spaces)
Ctrl+Down               all windows of the current app
Ctrl+Left / Ctrl+Right  previous / next Space
Mission Control → +     add a new Space
Fn+Ctrl+Left / Right    tile window to left / right half (Sequoia+)
Fn+Ctrl+F               fill the screen
Fn+Ctrl+C               center the window`,
          try: "اعمل Space جديد من Mission Control، وحط فيه المتصفح، واتنقل بـ Ctrl+Left و Ctrl+Right. بعدين قسّم VS Code والمتصفح بـ Fn+Ctrl+الأسهم.",
          flag: "keys",
          deep: {
            why: "الماك لفترة طويلة مكانش فيه تقسيم شبابيك بالكيبورد، والناس كانت بتسطّب برامج زي Rectangle. دلوقتي جزء منه مدمج.",
            how: R`الـ Spaces بتتعمل من Mission Control (الـ + اللي فوق على اليمين). أي برنامج بتعمله full screen (زرار الأخضر) بياخد Space لوحده.

الاختصار Ctrl+رقم عشان تروح لـ Space بعينه موجود بس مقفول: فعّله من System Settings ← Keyboard ← Keyboard Shortcuts ← Mission Control. وأوامر التقسيم موجودة كمان في قايمة Window ← Move & Resize، أو لما تقف بالماوس على الزرار الأخضر.

على التاتش باد: تلات صوابع لفوق = Mission Control، وتلات صوابع يمين وشمال = تبديل Spaces (أو أربعة حسب الإعدادات).`,
            when: "فاتح شبابيك كتير وعايز تلاقي واحدة. أو عايز Space للمشروع وواحد للشات.",
            mistakes: "على بعض الكيبوردات مفتاح Fn اسمه Globe (عليه رسمة الكرة الأرضية)، هو هو. ولو Ctrl+Up مش شغال، يمكن اتاخد من برنامج تاني أو اتقفل في إعدادات Mission Control."
          },
          sol: R`من Mission Control (Ctrl+Up) دوس [[+]] في الشريط اللي فوق يمين، هيتعمل Desktop 2. اسحب نافذة المتصفح عليه. بعد كده Ctrl+Right يوديك Desktop 2 و Ctrl+Left يرجعك. Fn+Ctrl+Left على VS Code يلزّقه في النص الشمال، و Fn+Ctrl+Right على المتصفح يلزّقه يمين.

تلزيق Fn+Ctrl موجود من macOS 15 Sequoia وأحدث. على النسخ الأقدم، امسك الماوس على الزرار الأخضر فوق شمال النافذة واختار «Tile Window to Left of Screen». ولو Ctrl+Left و Ctrl+Right مش بيتنقلوا، شوف إنهم متفعّلين في Keyboard Shortcuts ثم Mission Control، ولو Fn مش بيشتغل جرّب زرار Globe لأنه نفس الزرار في الكيبوردات الجديدة.`
        },
        {
          cmd: "Cmd+Shift+4",
          title: "صوّر جزء من الشاشة على الماك",
          desc: R`Cmd+Shift+4 يخليك تحدد جزء من الشاشة، ولو دوست Space بعدها بيصوّر نافذة كاملة بظلها. Cmd+Shift+3 الشاشة كلها، و Cmd+Shift+5 بيفتح لوحة فيها تسجيل فيديو كمان.

الصورة بتتحفظ على الـ Desktop افتراضيًا. ولو ضفت Ctrl للاختصار، بتروح الكليب بورد بدل ما تتحفظ ملف.`,
          example: R`Cmd+Shift+3           full screen → file on Desktop
Cmd+Shift+4           select a region → file
Cmd+Shift+4 → Space   click a window → file
Ctrl+Cmd+Shift+4      region → clipboard (paste with Cmd+V)
Cmd+Shift+5           panel: record video, Options → save location
Esc                   cancel`,
          try: "صوّر الـ Console بتاع المتصفح وهو فيه error بـ Ctrl+Cmd+Shift+4، والزقه على طول في شات.",
          flag: "keys",
          deep: {
            why: "إرفاق صورة للـ error أو للتصميم أسرع وأوضح من الوصف.",
            how: R`بعد التصوير بتظهر صورة صغيرة في الركن، دوس عليها تعدّل أو تقص، أو اسحبها على طول لأي برنامج (Slack، GitHub). من Cmd+Shift+5 ← Options تغيّر مكان الحفظ بدل ما الـ Desktop يتملي، أو تختار Clipboard.`,
            when: "تبليغ عن bug، توثيق، شرح لعميل.",
            mistakes: "الـ Desktop بيتملي صور بعد أسبوع. غيّر مكان الحفظ لفولدر Screenshots من Options. وبص على الصورة قبل ما تبعتها لو فيها توكن أو بيانات عميل."
          },
          sol: R`Ctrl+Cmd+Shift+4 المؤشر هيبقى علامة +، اسحب مستطيل حوالين الـ error. مفيش ملف هيتعمل على الـ Desktop ولا صوت غالبًا، الصورة راحت الكليب بورد. في الشات Cmd+V هيلزقها على طول.

لو لقيت ملف [[Screenshot 2026-09-30 at 10.15.22.png]] على الـ Desktop، يبقى نسيت Ctrl ودوست Cmd+Shift+4 بس. ولو أول مرة طلب إذن «Screen Recording»، ده لبرنامج تاني بيحاول يصوّر مش للاختصار. ولو عايز الاختصار العادي يحفظ في الكليب بورد دايمًا، Cmd+Shift+5 ثم Options ثم Save to: Clipboard.`
        },
        {
          cmd: "Cmd+Shift+.",
          title: "اعرض الملفات المخفية في Finder",
          desc: R`Finder بيخبّي أي ملف اسمه بيبدأ بنقطة: [[.env]] و [[.git]] و [[.gitignore]] و [[~/.ssh]]. Cmd+Shift+. (نقطة) بيظهرهم ويخفيهم على طول، ومن غير أوامر.

وبيشتغل كمان في نوافذ Open و Save، يعني لما برنامج يطلب منك تختار ملف [[.env]] أو مفتاح SSH.`,
          example: R`Cmd+Shift+.       toggle hidden files in Finder
Cmd+Shift+.       same inside any Open / Save dialog
Cmd+Shift+H       jump to your home folder`,
          try: "افتح فولدر أي ريبو في Finder، ودوس Cmd+Shift+. وشوف [[.git]] ظهر باهت. دوس تاني يختفي.",
          flag: "keys",
          deep: {
            why: "محتاج ترفع .env لمكان، أو تختار مفتاح من ~/.ssh في برنامج، والملف مش ظاهر.",
            how: R`الملفات المخفية بتظهر بلون باهت عشان تفرّقها. الاختصار بيغيّر نفس الإعداد اللي [[defaults write com.apple.finder AppleShowAllFiles]] بيغيّره (متشرح في تاب zsh)، بس من غير ما تكتب أوامر ولا تعمل [[killall Finder]].

فولدر [[~/Library]] مخفي بطريقة تانية، ويظهر بنفس الاختصار أو من Cmd+Shift+G.`,
            when: "تعديل .env أو .gitignore من Finder، رفع مفتاح SSH، فتح ~/.config.",
            mistakes: "تسيبه ظاهر وتمسح ملف مخفي من فولدر النظام أو من ~/Library من غير ما تعرف هو إيه. اعرضهم وقت ما تحتاجهم بس."
          },
          sol: R`هتلاقي [[.git]] و [[.gitignore]] و [[.env]] وأي ملف بيبدأ بنقطة ظهروا بلون باهت، يعني مخفيين. دوس تاني يختفوا. الإعداد بيفضل على كل نوافذ Finder لحد ما تقفله، وكمان بيشتغل جوه نوافذ Open و Save في أي برنامج.

على كيبورد عربي، اختصارات الماك اللي فيها Cmd غالبًا بتتقري على الإنجليزي فمش هتفرق. بس لو مش شغال، حوّل اللغة للإنجليزي وجرّب، لأن زرار النقطة مكانه مختلف في بعض الـ layouts. ولو [[.git]] مظهرش حتى بعد الاختصار، يبقى الفولدر ده مش ريبو.`
        },
        {
          cmd: "Cmd+Shift+G",
          title: "روح لأي مسار مباشرة في Finder",
          desc: R`Cmd+Shift+G بيفتح خانة Go to Folder: اكتب المسار ودوس Return. [[~/.ssh]] أو [[~/Library/Application Support]] أو [[/opt/homebrew]]، حتى لو مخفي.

وبيشتغل في نوافذ Open و Save كمان، ده أسرع من إنك تتنقل فولدر فولدر.`,
          example: R`Cmd+Shift+G → ~/.ssh                      SSH keys
Cmd+Shift+G → ~/Library/Application Support/Code/User   VS Code settings
Cmd+Shift+G → /opt/homebrew               Homebrew (Apple Silicon)
Cmd+Shift+G → /etc/hosts                  jumps to the file
Tab                                        autocompletes the path`,
          try: "افتح Finder ودوس Cmd+Shift+G واكتب [[~/.ssh]]. بعدين جرّب تكتب [[~/Lib]] ودوس Tab يكمّل.",
          flag: "keys",
          deep: {
            why: "فولدرات كتير مهمة للمبرمج مخفية ومش في الـ sidebar: ~/Library، و /usr/local، و /opt، وفولدرات إعدادات البرامج.",
            how: R`الخانة بتفهم [[~]] للهوم، وبتكمّل بـ Tab زي الترمنال، وبتفتكر آخر مسارات كتبتها. لو كتبت مسار ملف، Finder بيفتح الفولدر ويعلّم على الملف.

من الترمنال العكس: [[open ~/.ssh]] بيفتح نفس الفولدر في Finder (متشرح في تاب zsh).`,
            when: "توصل لإعدادات برنامج، أو لوجات، أو فولدر نظام، أو مسار نسخته من دوكيومنتيشن.",
            mistakes: "تعدّل ملفات جوه [[/System]] أو [[/usr/bin]]. دي محمية (SIP) ومش هتقدر أصلًا، ولو قدرت متعملش. شغلك يبقى في الهوم و /opt/homebrew و /usr/local بس."
          },
          sol: R`Cmd+Shift+G هيفتح خانة «Go to Folder». [[~/.ssh]] و Return يفتح فولدر SSH وتلاقي فيه [[known_hosts]] ومفاتيحك. و [[~/Lib]] ثم Tab هيكمّلها [[~/Library/]] وفي النسخ الحديثة هيعرض لستة اقتراحات تحت وانت بتكتب.

لو قال «The folder can’t be found»، يبقى [[~/.ssh]] مش موجود لسه (بيتعمل مع أول [[ssh-keygen]] أو أول ssh لسيرفر). وخد بالك إن الحروف فارقة في الكتابة جوه الخانة: [[~/lib]] بحرف صغير ممكن يوصلك لـ Library برضه لأن نظام ملفات الماك مش حساس للحروف افتراضيًا، بس Tab ممكن ميكمّلش.`
        },
        {
          cmd: "Cmd+Option+C",
          title: "انسخ المسار الكامل لملف على الماك",
          desc: R`حدد الملف في Finder ودوس Cmd+Option+C: المسار الكامل زي [[/Users/you/projects/myapp/.env]] بيتنسخ. ونفس الحاجة من كليك يمين وانت ماسك Option ← Copy as Pathname.

وأسهل من كده: اسحب أي ملف أو فولدر وارميه جوه الترمنال، مساره بيتكتب لوحده. و Cmd+Option+P بيظهر شريط المسار تحت في Finder.`,
          example: R`Cmd+Option+C                  copy full path of the selection
Right-click + hold Option → Copy "..." as Pathname
Drag a file into Terminal     its path is typed for you
Cmd+Option+P                  show the path bar in Finder`,
          try: "اكتب [[cat ]] في الترمنال (بمسافة)، واسحب ملف [[package.json]] من Finder جوه الترمنال، ودوس Return.",
          flag: "keys",
          deep: {
            why: "المسارات على الماك فيها مسافات كتير (Application Support، مثلًا)، وكتابتها بإيدك بتجيب أخطاء.",
            how: R`Cmd+Option+C بيشتغل كأمر في قايمة Edit بتاعة Finder. السحب للترمنال بيكتب المسار ومعاه [[\]] قبل أي مسافة عشان الشيل يفهمه صح.

شريط المسار (Path bar) كل فولدر فيه قابل للضغط، ودبل كليك عليه يوديك هناك.`,
            when: "مسار ملف لأمر، أو مسار فولدر لـ config، أو تبعته لحد في شات.",
            mistakes: "Cmd+C العادي على ملف في Finder بينسخ الملف نفسه مش المسار. لو لزقته في محرر نصوص هيطلع الاسم بس."
          },
          sol: R`لما تسحب [[package.json]] جوه الترمنال، هيتكتب المسار كامل بعد [[cat ]] زي [[cat /Users/you/projects/myapp/package.json ]] بمسافة في الآخر، و Return يطبع الـ JSON. لو المسار فيه مسافات، Terminal بيحط [[\]] قبل كل مسافة لوحده، زي [[My\ Projects]].

لو اتكتب المسار من غير [[cat]] قبله، يبقى نسيت المسافة بعد cat، فالاتنين لزقوا في كلمة واحدة وهيقول command not found. ولو سحبت الملف على أيقونة Terminal في الـ Dock بدل النافذة، هيفتح ترمنال جديد في الفولدر بتاعه مش هيكتب المسار.`
        },
        {
          cmd: "Space",
          title: "اتفرج على ملف في Finder من غير ما تفتحه",
          desc: R`حدد أي ملف في Finder ودوس Space: Quick Look بيعرضه على طول، صورة أو PDF أو JSON أو كود أو فيديو، من غير ما يفتح برنامج. Space تاني يقفله.

وحاجات Finder اللي هتحتاجها معاه: Cmd+سهم تحت يفتح، و Cmd+سهم فوق يطلعك للفولدر الأب، و Cmd+Delete يرمي في سلة المهملات. وخد بالك: Return في Finder بيغيّر الاسم، مش بيفتح.`,
          example: R`Space              Quick Look preview
Cmd+Down           open the selected item
Cmd+Up             go to the parent folder
Return             RENAME (not open!)
Cmd+Delete         move to Trash
Cmd+I              Get Info (size, permissions)
Option+drag        copy instead of move
Cmd+Shift+N        new folder`,
          try: "في فولدر فيه صور أو ملفات JSON، اتنقل بالأسهم ودوس Space على كل واحد، واتفرج من غير ما تفتح أي برنامج.",
          flag: "keys",
          deep: {
            why: "بتدوّر على صورة معينة أو ملف JSON فيه قيمة، وفتح كل واحد في برنامج بطيء.",
            how: R`Quick Look بيعرض أغلب الأنواع، وتقدر تتنقل بالأسهم وهو مفتوح. Option+Space بيعرضه full screen.

Cmd+Down و Cmd+Up بيخلوك تتنقل في Finder كله بالكيبورد. والسحب العادي بين فولدرات على نفس الهارد بينقل، و Option+سحب بينسخ.`,
            when: "مراجعة صور assets، ملفات لوج، PDF، JSON من API.",
            mistakes: "جاي من ويندوز: تدوس Return عشان تفتح فولدر فتلاقي نفسك بتغيّر اسمه. وCmd+Delete في Finder بيرمي الملف، لكن نفس الاختصار في خانة كتابة بيمسح السطر، فخد بالك انت فين."
          },
          sol: R`كل Space هيفتح نافذة Quick Look فيها الصورة أو محتوى الـ JSON كنص (ملوّن في النسخ الحديثة)، والأسهم وهي مفتوحة بتنقلك للملف اللي بعده والنافذة بتتحدث لوحدها. Space تاني أو Esc يقفلها.

لو دوست Return بدل Space، الاسم هيتحدد للتعديل، دوس Esc من غير ما تكتب حاجة. ولو Space معملش حاجة، يبقى مفيش ملف متحدد، أو الـ focus في خانة البحث بتاعة Finder.`
        },
        {
          cmd: "Option+Left",
          title: "اتنقل بالكلمة وامسح بسرعة في أي خانة كتابة على الماك",
          desc: R`في أي مكان بتكتب فيه على الماك: Option+سهم شمال أو يمين يتنقل كلمة كلمة، و Cmd+سهم شمال أو يمين يروح أول أو آخر السطر. Option+Delete يمسح الكلمة اللي قبلك، و Cmd+Delete يمسح لأول السطر.

في Terminal.app، Option+الأسهم بس اللي شغالة لوحدها، ولأول السطر وآخره ومسح كلمة استخدم اختصارات الشيل Ctrl+A و Ctrl+E و Ctrl+W. في iTerm2 فعّلهم كلهم من Settings ← Profiles ← Keys ← Key Mappings ← Presets ← Natural Text Editing.`,
          example: R`Option+Left / Right    jump one word
Cmd+Left / Right       start / end of line
Cmd+Up / Down          start / end of the document
Option+Delete          delete the previous word
Cmd+Delete             delete to the start of the line
Fn+Delete              delete forward
iTerm2: Presets → Natural Text Editing   make these work in the terminal`,
          try: "اكتب أمر طويل في الترمنال، اتنقل فيه كلمة كلمة بـ Option+Left، وارجع لأوله بـ Ctrl+A، وامسح الكلمة اللي قبلك بـ Ctrl+W. وبعدين جرّب Cmd+Left و Option+Delete في خانة بحث المتصفح.",
          flag: "keys",
          deep: {
            why: "مسح أمر طويل حرف حرف، أو الرجوع لأوله بالسهم، بيضيّع وقت. الاختصارات دي نفسها في كل برامج الماك.",
            how: R`دي اختصارات نظام، فبتشتغل في VS Code والمتصفح وخانات الإعدادات. في الترمنال الموضوع مختلف: الشيل هو اللي بيفهم الزراير، فالترمنال لازم يترجم Option+Left لحاجة zsh تفهمها. Natural Text Editing في iTerm2 بيعمل الترجمة دي.

اختصارات الشيل نفسه (Ctrl+A و Ctrl+E و Ctrl+W و Ctrl+R) بتشتغل في أي ترمنال من غير إعداد. وفي iTerm2 كمان Cmd+D يقسم الترمنال لنصين جنب بعض، و Cmd+Shift+D فوق وتحت. (Cmd+K و Cmd+T متشرحين في تاب zsh.)`,
            when: "طول اليوم في الكتابة. وفي الترمنال لما تصلّح أمر طويل.",
            mistakes: "في iTerm2 من غير الـ preset، Option+Left بيكتب رموز غريبة زي [D. ده مش عطل، ده الإعداد."
          },
          sol: R`في Terminal.app الافتراضي، Option+Left بيرجع كلمة كلمة لأن Terminal بيبعت الـ sequence اللي zsh فاهمها. Ctrl+A يوديك أول السطر، و Ctrl+W يمسح الكلمة اللي قبل المؤشر. وفي خانة بحث المتصفح: Cmd+Left أول السطر، و Option+Delete يمسح كلمة. نفس المنطق، بس في الترمنال الاختصارات بـ Ctrl لأنها جاية من zsh مش من الماك.

لو Option+Left كتب رموز غريبة زي [[;3D]] في الترمنال، يبقى انت في iTerm2 من غير «Natural Text Editing»: فعّلها من Settings ثم Profiles ثم Keys ثم Key Mappings ثم Presets. ولو Cmd+Left في الترمنال مش بيعمل حاجة، ده طبيعي، استخدم Ctrl+A و Ctrl+E. وخد بالك: Ctrl+W في المتصفح بيقفل التاب، مش بيمسح كلمة.`
        }
      ]
    },
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
          sol: R`[[ms-settings:about]] هيفتح صفحة About: تحت «Device specifications» هتلاقي Installed RAM (زي 16.0 GB)، وتحت «Windows specifications» هتلاقي Edition و Version و OS build. [[ms-settings:network-proxy]] هيفتح Proxy: الطبيعي «Automatically detect settings» شغال، و «Use setup script» و «Use a proxy server» مقفولين.

لو لقيت proxy متفعّل وانت مش في شركة ومش مفعّله بنفسك، ده ممكن يبقى برنامج VPN أو antivirus أو برنامج مش كويس، ويخلي npm و git يفشلوا بـ timeout. اقفله واعرف مين حطه. ولو [[ms-settings:about]] مفتحش حاجة، اتأكد إنك كتبت النقطتين في الآخر.`
        }
      ]
    },
    {
      t: "ويندوز: أدوات الإدارة",
      l: 2,
      n: "الخدمات واللوجات والفايروول والأجهزة: أدوات المدير اللي هتحتاجها وانت بتطوّر",
      items: [
        {
          cmd: "services.msc",
          title: "شغّل أو وقّف خدمة زي Docker أو PostgreSQL",
          desc: R`[[services.msc]] بيعرض كل خدمات ويندوز: برامج بتشتغل في الخلفية من غير نافذة. Docker Desktop ليه خدمة، و PostgreSQL و MySQL و MongoDB لو سطبتهم بالـ installer بيبقوا خدمات.

Docker مش راضي يقوم؟ دوّر على «Docker Desktop Service» واعمل Restart. وبورت 5432 مشغول وانت عايز postgres في Docker؟ غالبًا خدمة postgres المتسطبة شغالة، وقّفها وخلّي الـ Startup type بتاعها Manual.`,
          example: R`Win+R → services.msc
Click any row → type "d"          jump to names starting with D
Docker Desktop Service → Restart
postgresql-x64-16 → Stop          frees port 5432 for Docker
Properties → Startup type → Manual   don't start with Windows
Startup type: Automatic / Manual / Disabled`,
          try: "افتح [[services.msc]] ورتّب بـ Status، وشوف إيه الخدمات الشغالة اللي انت سطبتها (Docker، أي قاعدة بيانات، أي VPN).",
          flag: "keys",
          deep: {
            why: "الخدمات هي «السيرفرات» اللي شغالة على جهازك من غير ما تشوفها. قاعدة بيانات بتقوم مع الجهاز وماسكة بورت، أو Docker واقف ومحتاج restart.",
            how: R`Automatic يعني تقوم مع الجهاز، Manual يعني تقوم لما برنامج يطلبها أو انت تشغّلها، Disabled مش هتقوم خالص. Start و Stop و Restart محتاجين أدمن، فلو الأزرار رمادي افتح [[services.msc]] بـ Ctrl+Shift+Enter.

نفس الحاجة من الترمنال: [[Get-Service]] و [[Restart-Service]] متشرحين في تاب PowerShell.`,
            when: "Docker أو قاعدة بيانات مش شغالين. بورت مشغول بخدمة. الجهاز بطيء بسبب خدمة بتقوم معاه ومش محتاجها.",
            mistakes: "تعمل Disabled لخدمات مش عارفها عشان «تسرّع الجهاز» (نصايح منتشرة على النت). ده بيبوّظ حاجات زي Windows Update والشبكة والبلوتوث. اقفل بس الخدمات اللي انت سطبتها وعارفها، وخلّيها Manual مش Disabled."
          },
          sol: R`دوس على عنوان عمود Status: مرة ترتّب والشغال (Running) ممكن ينزل تحت الفاضي، دوس تاني يطلع فوق. هتلاقي خدمات كتير من ويندوز، والمهم تدوّر على اللي انت سطبته: [[Docker Desktop Service]]، أو [[postgresql-x64-16]] (الرقم حسب النسخة)، أو [[MySQL80]]، أو خدمات VPN. عمود Startup Type يقولك هي بتقوم مع الجهاز (Automatic) ولا لأ.

لو مش لاقي Docker مع إنه شغال، ده طبيعي: Docker Desktop في النسخ الحديثة معظمه بيشتغل كبرنامج عادي والخدمة مش دايمًا موجودة. ولو Postgres مش في اللستة وشغال، غالبًا متسطب جوه WSL أو Docker مش على ويندوز.`
        },
        {
          cmd: "eventvwr.msc",
          title: "اعرف برنامج وقع ليه من غير رسالة",
          desc: R`البرنامج قفل لوحده ومفيش ولا رسالة؟ ويندوز غالبًا سجّل السبب. [[eventvwr.msc]] ← Windows Logs ← Application، وفلتر على Error: هتلاقي «Application Error» فيه اسم البرنامج والـ module اللي وقع فيه.

والأسهل للبداية: [[perfmon /rel]] بيفتح Reliability Monitor، خط زمني فيه كل برنامج وقع يوم بيوم، ودبل كليك يوريك التفاصيل.`,
          example: R`Win+R → perfmon /rel                      Reliability Monitor: crashes per day
Win+R → eventvwr.msc                      Event Viewer
Windows Logs → Application → Filter Current Log → Error
Event ID 1000 "Application Error"        which exe crashed + faulting module
Windows Logs → System                     drivers, disks, unexpected shutdowns`,
          try: "افتح [[perfmon /rel]] وشوف آخر أسبوع: فيه أي أيقونة X حمرا؟ دبل كليك عليها واقرا اسم البرنامج.",
          flag: "keys",
          deep: {
            why: "برنامج Electron أو desktop app عملته بيقع عند عميل ومفيش رسالة. أو الجهاز عمل restart لوحده ومش عارف ليه.",
            how: R`Event Viewer بيسجّل كل حاجة، فهيبان زحمة. الـ Filter بيخليك تشوف Error و Critical بس. كل event ليه Source (مين كتبه) و Event ID ورسالة.

Reliability Monitor بيقرا نفس اللوجات وبيعرضها بشكل أبسط: كل يوم عمود، وفيه علامات للبرامج اللي وقعت والتحديثات. «View technical details» بيوريك نفس معلومات Event Viewer.`,
            when: "برنامج بيقع. الجهاز بيعمل restart لوحده. عميل بيقول «التطبيق بيقفل فجأة»: اطلب منه صورة من [[perfmon /rel]].",
            mistakes: "تتخض من كمية الـ Warnings والـ Errors. جهاز سليم تمامًا فيه مئات منهم. دوّر على الوقت اللي المشكلة حصلت فيه بالظبط واسم برنامجك، مش على العدد."
          },
          sol: R`[[perfmon /rel]] هيفتح Reliability Monitor: رسم بياني بخط فوق (Stability Index من ١ لـ ١٠) وتحته صفوف فيها أيقونات. X حمرا يعني Critical event، زي برنامج وقف فجأة أو ويندوز اتقفل غلط. دبل كليك عليها هيوريك التفاصيل: «Faulting Application Name» فيها اسم الـ exe (زي [[Code.exe]] أو [[node.exe]])، و «Faulting Module» يقولك أنهي DLL.

لو مفيش أي X في أسبوع، ده كويس، مش غلطة. ولو الرسم فاضي خالص، الخدمة ممكن تكون لسه بتجمع بيانات (بتحتاج كام ساعة بعد أول تشغيل). ولو فيه X متكررة لنفس البرنامج كل يوم، ده اللي تدوّر عليه باسم الـ module في جوجل.`
        },
        {
          cmd: "resmon",
          title: "اعرف مين ماسك الملف اللي مش راضي يتمسح",
          desc: R`«The action can't be completed because the file is open in another program»، أو [[EBUSY: resource busy or locked]] وانت بتمسح [[node_modules]]. [[resmon]] بيقولك مين: تاب CPU ← Associated Handles، واكتب اسم الملف أو الفولدر في خانة البحث.

هتلاقي العملية (غالبًا node.exe أو VS Code أو antivirus)، كليك يمين ← End Process. وتاب Network ← Listening Ports بيوريك كل بورت ومين ماسكه.`,
          example: R`Win+R → resmon                     Resource Monitor
CPU → Associated Handles → search "node_modules"
Right-click the process → End Process
Network → Listening Ports          port → process (like netstat -ano)
Memory                             who is using the RAM`,
          try: "افتح ملف في Notepad، وبعدين في [[resmon]] دوّر على اسم الملف في Associated Handles، وشوف notepad.exe ظاهر جنبه.",
          flag: "keys",
          deep: {
            why: "ويندوز مش بيسمح تمسح ملف برنامج تاني فاتحه، ومش بيقولك مين. ده بيحصل كتير مع node_modules و git و Docker.",
            how: R`كل برنامج بيفتح ملف بياخد عليه «handle». Associated Handles بيدوّر في كل الـ handles المفتوحة في الجهاز على النص اللي كتبته.

Listening Ports بيعرض نفس اللي [[netstat -ano]] بيعرضه (في تاب CMD) بس باسم البرنامج جاهز، ومعاه حالة الفايروول لكل بورت.

بديل أسهل: PowerToys فيه File Locksmith، كليك يمين على الملف ويقولك مين ماسكه (في المستوى التالت).`,
            when: "مش قادر تمسح node_modules أو dist. [[git checkout]] بيفشل عشان ملف مقفول. بورت مشغول.",
            mistakes: "تقفل العملية وتكمّل من غير ما تعرف ليه كانت ماسكة الملف. غالبًا dev server أو watcher لسه شغال في ترمنال تاني، اقفله من هناك الأول."
          },
          sol: R`في [[resmon]] تاب CPU، اكتب اسم الملف في خانة البحث جنب Associated Handles. لو البرنامج ماسك الملف، هيظهر سطر فيه اسم العملية (زي [[notepad.exe]]) والـ PID والمسار كامل. وده بالظبط اللي بتعمله لما ملف مش راضي يتمسح.

لو Notepad مظهرش، ده مش غلطك: Notepad بيقرا الملف في الذاكرة وممكن يسيبه على طول، خصوصًا Notepad الجديد في ويندوز 11، فمبيبقاش ماسكه. جرّب بحاجة ماسكة الملف فعلًا: في PowerShell اعمل ملف بـ [[ni $HOME\test.txt]] وافتحه ومتقفلوش بـ [[$f = [IO.File]::OpenRead("$HOME\test.txt")]] وبعدين دوّر على [[test.txt]]، هتلاقي [[powershell.exe]] ظاهر، وبعدين [[$f.Close()]]. أو شغّل dev server ودوّر على اسم فولدر المشروع، هتلاقي node.exe.`
        },
        {
          cmd: "wf.msc",
          title: "افتح بورت عشان الموبايل يوصل لسيرفر التطوير",
          desc: R`عايز تجرّب موقعك من الموبايل على نفس الواي فاي، وفاتح [[http://192.168.1.5:5173]] ومش بيحمّل؟ غالبًا الفايروول. [[wf.msc]] ← Inbound Rules ← New Rule ← Port ← TCP 5173 ← Allow ← Private بس.

وقبل ده، السيرفر نفسه لازم يسمع على الشبكة مش على localhost بس: [[vite --host]] أو [[next dev -H 0.0.0.0]].`,
          example: R`Win+R → wf.msc                         Windows Defender Firewall with Advanced Security
Inbound Rules → New Rule → Port → TCP → 5173
Allow the connection → Private only (uncheck Public)
Name: "Vite dev 5173"
Win+R → firewall.cpl                   the simple firewall page
Win+R → ms-settings:network-status → Properties → Private network`,
          try: "اعمل rule لبورت 5173 على Private بس، وشغّل [[npx vite --host]] في أي مشروع Vite وافتح اللينك اللي فيه IP من الموبايل. بعد ما تخلص، اعمل Disable للـ rule.",
          flag: "keys",
          deep: {
            why: "اختبار الموقع على موبايل حقيقي أو جهاز تاني على نفس الشبكة، وويندوز بيقفل الاتصالات اللي جاية من بره افتراضيًا.",
            how: R`الفايروول فيه profiles: Private (البيت والشغل) و Public (الكافيه والمطار). الـ rule اللي عملتها على Private بس مش هتشتغل لو ويندوز شايف الشبكة Public، عشان كده اتأكد من نوع الشبكة من إعدادات الشبكة.

أول مرة node بيفتح بورت، ويندوز بيسألك «Allow access» على Private و Public. لو دوست Cancel بيتعمل rule بيمنع node.exe، وتلاقيه في Inbound Rules بعلامة حمرا. امسحه أو فعّله.

من الترمنال: [[netsh advfirewall]] (في تاب CMD) أو [[New-NetFirewallRule]] في PowerShell.`,
            when: "تجربة على الموبايل. جهاز تاني في الشبكة عايز يوصل لـ API عندك. WSL أو Docker مش واصلين لحاجة على ويندوز.",
            mistakes: "تقفل الفايروول كله عشان «مش عارف المشكلة فين»، أو تعمل Allow على Public، وتنسى، وتقعد في كافيه وسيرفرك مفتوح للكل. rule لبورت واحد على Private، وامسحه لما تخلص."
          },
          sol: R`Vite بـ [[--host]] هيطبع سطر [[Network: http://192.168.1.20:5173/]] (بـ IP جهازك). افتحه من موبايل على نفس الواي فاي، المفروض الصفحة تظهر. بعد ما تخلص، في Inbound Rules كليك يمين على «Vite dev 5173» ثم Disable Rule، هتلاقي أيقونته بقت رمادي.

لو الموبايل مفتحش: اتأكد إن شبكة الواي فاي في ويندوز متعرّفة Private مش Public، لأن الـ rule على Private بس. وأول مرة تشغّل node، ويندوز ممكن يطلع نافذة «Allow access» وانت لو دوست Cancel بيعمل rule بـ Block لـ node.exe، والـ Block بيكسب على أي Allow، شوف Inbound Rules ودوّر على Node.js. ولو Vite مطبعش سطر Network خالص، يبقى [[--host]] مش واصل. ولو المشروع جوه WSL، شوف درس الشبكة والبورتات في تاب WSL.`
        },
        {
          cmd: "devmgmt.msc",
          title: "اعرف الجهاز اللي وصلته شايفه ويندوز ولا لأ",
          desc: R`وصلت موبايل أندرويد عشان [[adb]]، أو ESP32 أو Arduino، ومش ظاهر؟ [[devmgmt.msc]] بيقولك: لو فيه علامة صفرا تحت Other devices يبقى الدرايفر مش متسطب.

لوحات Arduino و ESP32 بتظهر تحت Ports (COM & LPT) برقم زي COM3، وده الرقم اللي هتختاره في الـ IDE. ولو مش ظاهرة، غالبًا محتاج درايفر شريحة USB اللي عليها (CH340 أو CP210x).`,
          example: R`Win+R → devmgmt.msc                     Device Manager
Other devices → yellow "!"              driver missing
Ports (COM & LPT) → USB-SERIAL CH340 (COM3)   your board's port
Action → Scan for hardware changes      re-detect after plugging in
Right-click → Update driver
Win+R → compmgmt.msc                    Device Manager + Disk Management + Services in one`,
          try: "افتح Device Manager ووصّل موبايلك أو فلاشة USB، وشوف إيه اللي ظهر جديد. اعمل Scan for hardware changes.",
          flag: "keys",
          deep: {
            why: "تطوير موبايل أو embedded بيعتمد إن ويندوز شايف الجهاز صح. قبل ما تدوّر في إعدادات الـ IDE، اتأكد من هنا.",
            how: R`كل قطعة في الجهاز أو متوصلة بيه ليها درايفر. العلامة الصفرا يعني ويندوز شايف الجهاز بس مش عارف يتعامل معاه. View ← Show hidden devices بيعرض أجهزة اتوصلت قبل كده ومش موصولة دلوقتي.

[[compmgmt.msc]] بيجمع أدوات كتير في نافذة واحدة: Device Manager، و Disk Management ([[diskmgmt.msc]])، و Services، و Event Viewer.

تحت Network adapters هتلاقي adapters وهمية زي vEthernet (WSL)، دي طبيعية.`,
            when: "adb مش شايف الموبايل. البورد مش ظاهرة في Arduino IDE. كارت شبكة أو صوت مش شغال.",
            mistakes: "«Uninstall device» مع علامة «Delete the driver software» لحاجة مش عارفها، زي كارت الشبكة أو الـ adapters الوهمية بتاعة WSL و Hyper-V. ممكن تفقد النت أو WSL يبطّل. وكابلات USB كتير شحن بس ومفيهاش داتا، جرّب كابل تاني قبل ما تتعب في الدرايفرات."
          },
          sol: R`لما توصل فلاشة: هتلاقي حاجة جديدة تحت «Disk drives» باسمها (زي [[SanDisk Cruzer Blade USB Device]])، وتحت «Universal Serial Bus controllers» [[USB Mass Storage Device]]. الموبايل (في وضع نقل الملفات) بيظهر تحت «Portable Devices» باسمه، أو تحت Android Phone. Scan for hardware changes بتخلي القايمة تتحدث، ويمكن تشوفها بترمش ثانية.

لو ظهر جهاز تحت «Other devices» عليه علامة صفرا، ده driver ناقص. ولو موبايلك مظهرش خالص، غالبًا الكابل للشحن بس (من غير data)، أو الموبايل على وضع «Charging only»، غيّره من إشعار USB على الموبايل لـ File transfer.`
        },
        {
          cmd: "regedit",
          title: "عدّل إعداد مخفي في ويندوز مفيش ليه زرار",
          desc: R`[[regedit]] بيفتح الـ Registry: قاعدة البيانات اللي فيها كل إعدادات ويندوز والبرامج. أحيانًا حل مشكلة بيقولك «غيّر القيمة الفلانية»، زي تفعيل المسارات الطويلة عشان [[node_modules]] العميقة.

القاعدة: قبل أي تعديل، File ← Export للمفتاح اللي هتعدّله. وغيّر اللي انت فاهمه بس.`,
          example: R`Win+R → regedit → Ctrl+Shift+Enter         open as admin
Paste a path into the address bar:
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
LongPathsEnabled → 1                     allow paths longer than 260 chars
File → Export                            ALWAYS back up the key first
Double-click the .reg backup             restores it`,
          try: "افتح [[regedit]] وحط المسار ده في شريط العنوان واقرا قيمة LongPathsEnabled عندك من غير ما تغيّرها.",
          flag: "keys danger",
          deep: {
            why: "إعدادات كتير مفيش ليها واجهة. مثال حقيقي: مسار جوه node_modules عدّى ٢٦٠ حرف فالمسح أو النسخ بيفشل.",
            how: R`الـ Registry متقسم لـ hives: [[HKEY_CURRENT_USER]] إعداداتك انت، و [[HKEY_LOCAL_MACHINE]] إعدادات الجهاز كله ومحتاج أدمن. التعديل بيسري فورًا بس البرامج ساعات بتقراه وقت ما تفتح بس، فيمكن تحتاج restart.

LongPathsEnabled بيفتح الباب للبرامج اللي تدعمه. Git محتاج كمان [[git config --global core.longpaths true]].

من الترمنال: أمر [[reg query]] و [[reg add]] بيعملوا نفس الحاجة، ومفيدين في السكربتات.`,
            when: "حل مكتوب من مصدر رسمي (Microsoft Learn أو دوكيومنتيشن الأداة) بيطلب قيمة معينة.",
            mistakes: "تمسح مفاتيح أو تنفّذ ملف .reg من منتدى من غير ما تقراه. ده ممكن يوقّف برامج أو يمنع ويندوز يقوم. وبرامج «Registry cleaner» مش بتسرّع حاجة وممكن تبوّظ. Export قبل أي تغيير، دايمًا."
          },
          sol: R`بعد ما تلزق المسار في شريط العنوان فوق وتدوس Enter، هتلاقي [[LongPathsEnabled]] في الجزء اليمين، نوعه [[REG_DWORD]] وقيمته في عمود Data زي [[0x00000000 (0)]] أو [[0x00000001 (1)]]. 0 يعني المسارات الطويلة مقفولة (الافتراضي)، و 1 يعني برنامج زي Python installer أو انت فعّلتها قبل كده.

لو القيمة مش موجودة خالص، ده معناه نفس الـ 0. ولو شريط العنوان مش ظاهر، فعّله من View ثم Address Bar. وحتى لو 1، برامج قديمة كتير لسه مش بتدعم المسارات الطويلة، و Git محتاج [[git config --system core.longpaths true]] لوحده.`
        }
      ]
    },
    {
      t: "أوبونتو: أدوات النظام",
      l: 2,
      n: "مدير المهام والإعدادات والديسكات في أوبونتو، من الواجهة ومن الترمنال",
      items: [
        {
          cmd: "gnome-system-monitor",
          title: "مدير المهام بتاع أوبونتو",
          desc: R`System Monitor هو Task Manager أوبونتو. افتحه من Super واكتب «monitor»، أو من الترمنال [[gnome-system-monitor]]. تاب Processes فيه كل العمليات، و Ctrl+F يدوّر، وكليك يمين ← Kill.

و Resources فيها رسم للبروسيسور والرامات والشبكة، و File Systems بتوريك المساحة الفاضية في كل هارد.`,
          example: R`Super → "monitor"               open System Monitor
Processes → Ctrl+F → "node"      find node processes
Right-click → End / Kill         End asks nicely, Kill forces
Resources                        CPU, memory, network graphs
File Systems                     free disk space`,
          try: "شغّل [[sleep 999]] في الترمنال، ولاقيه في System Monitor واقفله بـ End، وشوف الترمنال رجع.",
          flag: "keys",
          deep: {
            why: "برنامج علّق، أو node فضل شغال في الخلفية وماسك بورت، أو الجهاز بطيء وعايز تعرف مين السبب.",
            how: R`End بيبعت SIGTERM (البرنامج يقفل نفسه بنظام)، و Kill بيبعت SIGKILL (يتقفل فورًا). جرّب End الأول. نفس الفرق بين [[kill]] و [[kill -9]] في تاب bash.

من الترمنال فيه [[top]] و [[htop]] بيعرضوا نفس المعلومات.`,
            when: "برنامج مش بيرد. الرامات مليانة. عايز تعرف مين واكل البروسيسور.",
            mistakes: "جاي من ويندوز وبتدوس Ctrl+Alt+Delete فتطلعلك نافذة Power Off. لو عايز اختصار زي ويندوز، اعمل custom shortcut: Ctrl+Shift+Esc يشغّل [[gnome-system-monitor]] (في المستوى التالت)."
          },
          sol: R`[[sleep 999]] هيفضل الترمنال واقف من غير prompt. في System Monitor تاب Processes، Ctrl+F واكتب [[sleep]]، هتلاقي عملية اسمها sleep. كليك يمين ثم End، وهيسألك تأكيد. الترمنال هيطبع [[Terminated]] والـ prompt يرجع.

الفرق: End بيبعت SIGTERM (العملية بتقدر تقفل بشياكة)، و Kill بيبعت SIGKILL (بتموت فورًا) والترمنال هيطبع [[Killed]] بدل Terminated. ولو sleep مظهرش، شوف إن View فوق على «All Processes» أو «My Processes» مش «Active Processes»، لأن sleep مش بيستهلك CPU فمش بيتحسب active.`
        },
        {
          cmd: "Alt+F2",
          title: "شغّل أمر بسرعة من غير ما تفتح ترمنال",
          desc: R`Alt+F2 بيفتح خانة صغيرة تكتب فيها أمر وتدوس Enter، زي Win+R في ويندوز. [[code ~/projects/myapp]] يفتح المشروع، و [[nautilus ~/.config]] يفتح الفولدر، و [[gnome-terminal]] يفتح ترمنال.

الفرق عن الترمنال إنه مش بيعرض أي output، فهو لتشغيل برامج بس.`,
          example: R`Alt+F2 → gnome-terminal               open a terminal
Alt+F2 → code ~/projects/myapp        open a project in VS Code
Alt+F2 → nautilus ~/.config           open a folder in Files
Alt+F2 → gnome-system-monitor         task manager
Up / Down                             previous commands`,
          try: "افتح Alt+F2 واكتب [[nautilus ~/.ssh]] وشوف Files فتح على الفولدر المخفي.",
          flag: "keys",
          deep: {
            why: "عايز تفتح برنامج بمسار معين أو باختيارات، والبحث في Super مش بيفهم arguments.",
            how: R`الخانة بتشغّل الأمر كأنه من الترمنال بس من غير ما تعرضلك حاجة، وبتفتكر الأوامر اللي فاتت.

فيه أوامر خاصة بـ GNOME نفسه هنا، أشهرها [[r]] اللي كان بيعمل restart للواجهة. ده بيشتغل على X11 بس، وأوبونتو 24.04 افتراضيًا على Wayland، فالبديل هو Log Out وتدخل تاني.`,
            when: "فتح مشروع أو فولدر بمسار مباشر، أو برنامج مش ظاهر في قايمة البرامج.",
            mistakes: "تكتب أمر محتاج [[sudo]] أو أمر بيطبع نتيجة ([[ls]]، [[npm install]]) وتستنى، مفيش حاجة هتظهر. الأوامر دي مكانها الترمنال."
          },
          sol: R`Alt+F2 هيفتح خانة صغيرة في نص الشاشة «Enter a Command». [[nautilus ~/.ssh]] و Enter يفتح Files على الفولدر المخفي مباشرة، حتى لو إخفاء الملفات المخفية شغال، لأنك طلبت المسار بالاسم.

لو قال «No such file or directory»، يبقى [[~/.ssh]] مش موجود لسه. ولو Alt+F2 مش بيفتح حاجة، فيه احتمالين: انت على Wayland مع إضافة واخدة الاختصار، أو اللابتوب بيعتبر F2 زرار وظيفة (زي السطوع)، جرّب Alt+Fn+F2.`
        },
        {
          cmd: "gnome-control-center",
          title: "افتح صفحة إعدادات بعينها في أوبونتو من الترمنال",
          desc: R`[[gnome-control-center]] هو برنامج Settings. لو اديته اسم صفحة، بيفتحها على طول: الشبكة، الكيبورد، الشاشة. زي [[ms-settings:]] في ويندوز.

مفيد في السكربتات وفي الشرح: بدل «ادخل Settings وبعدين دوّر على ...»، سطر واحد.`,
          example: R`gnome-control-center
gnome-control-center network
gnome-control-center keyboard
gnome-control-center display
gnome-control-center --list`,
          try: "افتح صفحة الكيبورد من الترمنال، وبعدين اعرض كل أسماء الصفحات بـ [[--list]].",
          deep: {
            why: "توصل لصفحة إعدادات بسرعة، أو تكتبها في README لزميل بيجهز جهازه.",
            how: R`كل صفحة في Settings اسمها panel وليها اسم قصير. [[--list]] بيطبعهم كلهم. البرنامج بيفضل مفتوح والترمنال بيستناه، فلو عايز ترجع للترمنال على طول ضيف [[&]] في الآخر.`,
            when: "تظبيط شبكة أو شاشة أو اختصارات بسرعة.",
            mistakes: "تشغّله جوه SSH أو على سيرفر من غير واجهة: مش هيشتغل، هو برنامج رسومي. وأسماء بعض الصفحات بتتغير بين إصدارات GNOME، فـ [[--list]] هو المرجع."
          },
          lines: [
            "افتح Settings على آخر صفحة كنت فيها.",
            "افتح صفحة الشبكة (Wi-Fi و Ethernet و VPN و proxy).",
            "افتح صفحة الكيبورد، ومنها الاختصارات.",
            "افتح صفحة الشاشات والدقة والتكبير.",
            "اعرض أسماء كل الصفحات اللي ينفع تفتحها."
          ],
          sol: R`[[gnome-control-center keyboard]] هيفتح Settings على صفحة Keyboard على طول. و [[gnome-control-center --list]] هيطبع في الترمنال «Available panels:» وتحتها أسامي زي [[background]] و [[bluetooth]] و [[display]] و [[keyboard]] و [[network]] و [[wifi]] و [[sound]] و [[ubuntu]] وغيرهم. الأسامي دي اللي تحطها بعد الأمر.

لو كتبت اسم غلط، هيفتح Settings عادي على آخر صفحة كنت فيها أو يطبع warning. الأسامي بتتغير بين نسخ GNOME، فـ [[--list]] هو المرجع مش أي لستة على النت. ولو طلع «command not found» يبقى انت مش على GNOME (زي Kubuntu).`
        },
        {
          cmd: "gnome-disks",
          title: "شوف الهاردات وجهّز فلاشة في أوبونتو",
          desc: R`برنامج Disks (من الترمنال [[gnome-disks]]) بيعرض كل الهاردات والفلاشات والـ partitions بشكل مرئي. منه تعمل format لفلاشة، أو تكتب ملف ISO عليها (Restore Disk Image) عشان تبقى bootable، أو تشوف صحة الهارد (SMART).

زي [[lsblk]] و [[df -h]] في الترمنال، بس بالصور، وأسهل تشوف أنهي جهاز هو أنهي.`,
          example: R`Super → "disks"                         open Disks
Left list → pick the USB stick (check the size!)
⋮ → Format Disk                         wipe the whole stick
⋮ → Restore Disk Image → ubuntu.iso     make a bootable USB
⋮ → SMART Data & Self-Tests             disk health`,
          try: "افتح Disks وشوف الهارد الأساسي والـ partitions بتاعته واقرا SMART Data، من غير ما تدوس أي زرار تاني.",
          flag: "keys danger",
          deep: {
            why: "تعمل فلاشة تسطيب لأوبونتو أو لسيرفر، أو تتأكد إن الهارد مش بيموت قبل ما تخسر شغلك.",
            how: R`كل جهاز تخزين بيظهر بالحجم والاسم، وتحته الـ partitions. Restore Disk Image بيكتب ملف الـ ISO على الجهاز كله بايت بايت، وده بيمسح اللي كان عليه.

SMART بيقرا معلومات الهارد عن نفسه (ساعات الشغل، القطاعات البايظة). لو قال «Disk is likely to fail soon» خد backup النهارده.`,
            when: "فلاشة bootable، فورمات فلاشة، فحص هارد بطيء أو بيعمل أصوات.",
            mistakes: "تختار الهارد الغلط وتعمل Format أو Restore عليه، فتمسح النظام أو الداتا بتاعتك. قبل أي زرار: اتأكد من الحجم والاسم، وشيل أي هارد خارجي مش محتاجه. مفيش Undo."
          },
          sol: R`في Disks الشمال فيه لستة بالهاردات، اختار الأساسي (غالبًا NVMe أو SSD بحجمه). اليمين هيعرض الـ partitions كشريط ملوّن: غالبًا partition صغير لـ EFI (حوالي 1 GB أو أقل، FAT) وواحد كبير ext4 لأوبونتو، ولو dual boot هتلاقي NTFS لويندوز. من ⋮ ثم SMART Data & Self-Tests هتلاقي «Overall Assessment: Disk is OK» والحرارة وعدد ساعات التشغيل.

لو SMART متاح بلون رمادي، ده شائع مع NVMe في نسخ gnome-disks القديمة أو جوه VM. جرّب [[sudo smartctl -a /dev/nvme0]] (من حزمة smartmontools). وما تدوسش Format ولا Delete partition في التجربة دي.`
        }
      ]
    },
    {
      t: "الماك: أدوات النظام",
      l: 2,
      n: "مدير المهام واللوجات والباسوردات والصلاحيات على الماك",
      items: [
        {
          cmd: "Activity Monitor",
          title: "مدير المهام بتاع الماك",
          desc: R`Activity Monitor (من Spotlight) بيعرض كل العمليات، حتى اللي من غير واجهة زي [[node]] و [[com.docker.backend]]. اكتب في خانة البحث فوق، حدد العملية، ودوس زرار X ← Quit أو Force Quit.

تاب Memory مهم: الرسم اللي تحت اسمه Memory Pressure، لو أصفر أو أحمر يبقى الرامات مش مكفية فعلًا، مش مجرد «مستخدمة».`,
          example: R`Cmd+Space → "activity"          open Activity Monitor
Search box → "node"             find node processes
Select → X button → Quit / Force Quit
Memory tab → Memory Pressure    green = fine, red = really short on RAM
View → All Processes            include system processes
Double-click a process → Open Files and Ports`,
          try: "شغّل dev server، ولاقي عملية node في Activity Monitor، ودبل كليك عليها ← Open Files and Ports وشوف البورت بتاعها.",
          flag: "keys",
          deep: {
            why: "الماك سخن والمروحة شغالة، أو node فضل شغال بعد ما قفلت الترمنال، أو Docker واكل الرامات.",
            how: R`Quit بيطلب من العملية تقفل بنظام، و Force Quit بيقفلها فورًا. «Open Files and Ports» بيقولك الملفات المفتوحة والبورتات، زي [[lsof]] بالظبط.

الماك بيستخدم الرامات الفاضية كاش، فرقم «Memory Used» العالي طبيعي. Memory Pressure هو المقياس الحقيقي. من الترمنال: [[top -o mem]] و [[lsof -i]] متشرحين في تاب zsh.`,
            when: "الجهاز بطيء. بورت مشغول. عايز تعرف Docker أو Chrome واخدين كام.",
            mistakes: "تقفل عمليات سيستم (زي WindowServer أو kernel_task) عشان عالية. kernel_task بيعلى عمدًا لما الجهاز سخن عشان يبرّده، وقفل WindowServer بيعملك log out."
          },
          sol: R`اكتب [[node]] في خانة البحث، هتلاقي عملية أو أكتر. دبل كليك على اللي بتاعة السيرفر ثم تاب «Open Files and Ports»: دوّر على سطر فيه [[TCP]] و [[LISTEN]]، زي [[TCP *:3000 (LISTEN)]] أو [[TCP localhost:5173 (LISTEN)]]. ده البورت.

لو فيه كذا عملية node، واحدة بس فيها LISTEN، الباقي ممكن يبقوا VS Code أو أدوات تانية. وفي الترمنال نفس المعلومة بـ [[lsof -iTCP -sTCP:LISTEN -n -P | grep node]].`
        },
        {
          cmd: "Console",
          title: "اقرا لوجات الماك وتقارير الكراش",
          desc: R`برنامج Console (من Spotlight) فيه لوجات النظام وتقارير الكراش. برنامجك أو برنامج Electron وقع؟ ادخل Crash Reports على الشمال ولاقي اسمه، وهتلاقي فيه آخر حاجة كان بيعملها.

وللوجات لايف: دوس Start، واكتب اسم البرنامج في البحث عشان تفلتر.`,
          example: R`Cmd+Space → "console"            open Console
Sidebar → Crash Reports          one file per crash, newest first
Sidebar → your Mac → Start       live log stream
Search → process:myapp           filter to one app
Terminal: log stream --predicate 'process == "myapp"'   same thing in the terminal`,
          try: "افتح Console ← Crash Reports وشوف لو فيه أي برنامج وقع قبل كده عندك، وافتح التقرير واقرا أول كام سطر.",
          flag: "keys",
          deep: {
            why: "برنامج بيقفل فجأة من غير رسالة، أو خدمة مش راضية تشتغل، ومحتاج تعرف السبب.",
            how: R`تقرير الكراش فيه اسم البرنامج ونسخته، والـ thread اللي وقع، وسبب الإيقاف (Exception Type). لو برنامجك native أو Electron، السطور دي بتوديك للمكان.

اللوج اللايف زحمة جدًا، عشان كده الفلترة مهمة. [[log stream]] و [[log show --last 1h]] في الترمنال بيعملوا نفس الحاجة وسهل تحفظ النتيجة في ملف.`,
            when: "تطبيق desktop بتطوّره بيقع. برنامج مش راضي يفتح. مشكلة صلاحيات بتظهر في اللوج.",
            mistakes: "تقرا اللوج اللايف من غير فلتر وتتوه في آلاف السطور. فلتر على اسم البرنامج، وشغّل Start قبل ما تعمل الخطوة اللي بتجيب المشكلة بثواني."
          },
          sol: R`في Console الشمال ثم Crash Reports، هتلاقي لستة ملفات بأسامي زي [[Code-2026-09-20-101522.ips]] (اسم البرنامج والتاريخ). افتح واحد: أول سطور فيها [[Process:]] و [[Version:]] و [[Date/Time:]]، وبعدين [[Exception Type:]] زي [[EXC_BAD_ACCESS (SIGSEGV)]] أو [[EXC_CRASH (SIGABRT)]]، ودي بتقولك البرنامج مات إزاي.

لو اللستة فاضية، ده كويس، مش غلطة. التقارير بتتمسح لوحدها بعد مدة. ولو ملقتش Crash Reports في الشمال، في النسخ الحديثة ممكن تلاقيها تحت Reports، وكمان في Terminal [[ls ~/Library/Logs/DiagnosticReports]].`
        },
        {
          cmd: "Keychain Access",
          title: "امسح باسورد git القديم المتخزن على الماك",
          desc: R`الماك بيخزّن الباسوردات والتوكنز في الـ Keychain، ومنهم توكن GitHub اللي git بيستخدمه. غيّرت التوكن و git لسه بيبعت القديم ويقولك Authentication failed؟ افتح Keychain Access، دوّر على [[github.com]]، وامسح الـ entry اللي نوعها internet password.

المرة الجاية git هيسألك وتدخّل التوكن الجديد. وفي الإصدارات الحديثة البرنامج اتشال من فولدر Utilities، بس Spotlight بيلاقيه.`,
          example: R`Cmd+Space → "keychain access"      open it (Utilities folder in older macOS)
Search → github.com                  find the stored credential
Kind: internet password → Delete     git will ask for the new token
Certificates                         local CAs (e.g. from mkcert) live here
Passwords app                        website and Wi-Fi passwords (newer macOS)`,
          try: "افتح Keychain Access ودوّر على [[github.com]] وشوف إذا فيه credential متخزن، من غير ما تمسح حاجة.",
          flag: "keys",
          deep: {
            why: "git على الماك بيستخدم [[credential-osxkeychain]] عشان ميسألكش كل مرة. لما التوكن يتغير أو يخلص، الـ Keychain بيفضل ماسك القديم.",
            how: R`الـ Keychain قاعدة بيانات مشفرة بباسورد الماك. البرامج بتحفظ فيها وبتطلب إذن تقرا منها. من macOS Sequoia الباسوردات العادية بقت في برنامج Passwords، و Keychain Access فضل للحاجات المتقدمة زي الشهادات.

من الترمنال بنفس المعنى: [[git credential-osxkeychain erase]]، أو أمر [[security]] للسكربتات.

الشهادات المحلية (زي اللي [[mkcert]] بيعملها عشان https://localhost) بتتضاف هنا وبتتعلّم Trusted.`,
            when: "git أو npm بيرفضوا الدخول بعد تغيير توكن. شهادة محلية مش متوثق فيها.",
            mistakes: "تمسح entries مش عارفها، أو تعمل Reset للـ keychain كله، فتضيع باسوردات Wi-Fi والبرامج. امسح الـ entry بتاعة الموقع اللي انت عارفه بس."
          },
          sol: R`دوّر على [[github.com]] في خانة البحث فوق يمين. لو git حفظ باسورد أو token، هتلاقي سطر Kind بتاعه «internet password» واسمه [[github.com]] وفي Account اسم حسابك. دبل كليك عليه يعرض التفاصيل (الباسورد نفسه مخفي ومحتاج باسورد الماك عشان يظهر).

لو مفيش ولا سطر، يبقى git بيستخدم SSH مش HTTPS، أو الـ credential helper مش osxkeychain (اعرف بـ [[git config --get credential.helper]]). في macOS 15 وأحدث Keychain Access مبقاش في Utilities، بس Spotlight لسه بيلاقيه، والباسوردات العادية بقت في تطبيق Passwords.`
        },
        {
          cmd: "Full Disk Access",
          title: "الترمنال بيقول Operation not permitted على الماك",
          desc: R`الماك بيحمي فولدرات معينة (Desktop و Documents و Downloads و Mail وغيرهم) حتى من الترمنال. أمر أو سكربت بيقولك [[Operation not permitted]] مع إن الصلاحيات سليمة؟ ادي الترمنال صلاحية.

System Settings ← Privacy & Security ← Full Disk Access ← + ← اختار Terminal أو iTerm2 أو VS Code. واقفل البرنامج وافتحه.`,
          example: R`System Settings → Privacy & Security → Full Disk Access → +
Add Terminal / iTerm2 / VS Code → quit and reopen it
Privacy & Security → Files and Folders   per-folder permissions
Privacy & Security → Accessibility       window tools, automation
Privacy & Security → "Open Anyway"        an app blocked on first launch`,
          try: "افتح Privacy & Security ← Full Disk Access وشوف إيه البرامج اللي عندها الصلاحية دي دلوقتي. لو فيه حاجة مش عارفها، اقفلها.",
          flag: "keys",
          deep: {
            why: "سكربت backup، أو cron، أو أداة بتقرا ملفات في ~/Library، بتفشل على الماك بس، ورسالة الخطأ مش بتقول السبب الحقيقي.",
            how: R`نظام الحماية ده اسمه TCC. الصلاحية بتتدي للبرنامج اللي فاتح الشيل (Terminal نفسه)، وكل أمر بيشتغل جواه بياخدها. عشان كده بتدّيها لـ iTerm2 مش لـ zsh.

Files and Folders أدق: صلاحية لفولدر بعينه (Desktop مثلًا) بدل كل الهارد. و «Open Anyway» بيظهر تحت بعد ما تحاول تفتح برنامج نزلته من النت والماك منعه.`,
            when: "Operation not permitted من غير سبب واضح. برنامج نزلته من GitHub مش راضي يفتح.",
            mistakes: "تدي Full Disk Access لأي برنامج يطلبها. ده بيخليه يقرا الإيميل والرسايل وكل حاجة. ادّيها للترمنال اللي بتستخدمه بس، وشيلها من أي برنامج مبقتش تستخدمه."
          },
          sol: R`في System Settings ثم Privacy & Security ثم Full Disk Access هتلاقي لستة برامج قدام كل واحد مفتاح on/off. الطبيعي تلاقي حاجات زي Terminal أو iTerm أو VS Code لو انت ضفتهم، وبرامج backup أو antivirus. أي برنامج مش فاكره أو اتمسح من الجهاز اقفله أو امسحه بـ [[-]].

لو اللستة فاضية، ده طبيعي على ماك جديد. ولو قفلت الصلاحية عن Terminal، هتلاقي أوامر زي [[ls ~/Library/Mail]] بتطلع [[Operation not permitted]]. ده بالظبط الـ error اللي الدرس بيشرحه. وبعد أي تغيير لازم تقفل البرنامج بـ Cmd+Q وتفتحه، مش تقفل النافذة بس.`
        }
      ]
    },
    {
      t: "ويندوز: مسارات وحيل",
      l: 3,
      n: "أدوات إضافية من مايكروسوفت، ووضع المطوّر، وهارد مخصص للمشاريع",
      items: [
        {
          cmd: "PowerToys",
          title: "أدوات مايكروسوفت الإضافية للمبرمجين على ويندوز",
          desc: R`PowerToys برنامج مجاني من مايكروسوفت (مش جزء من ويندوز، بيتسطب لوحده) فيه أدوات صغيرة مفيدة جدًا: Command Palette يفتح أي حاجة بـ Win+Alt+Space، و File Locksmith يقولك مين ماسك ملف، و Keyboard Manager يغيّر أي زرار (Caps Lock يبقى Esc مثلًا).

وفيه كمان محرر لملف hosts ومحرر لمتغيرات البيئة أسهل من النافذة القديمة، و Text Extractor ينسخ نص من أي حتة في الشاشة حتى لو صورة.`,
          example: R`winget install Microsoft.PowerToys   install it (winget is in the PowerShell tab)
Win+Alt+Space        Command Palette: apps, files, calc, settings
Right-click a file → Unlock with File Locksmith   who is locking it
Keyboard Manager     remap keys (Caps Lock → Esc / Ctrl)
FancyZones           custom window layouts (Win+Shift+(key above Tab) to edit)
Win+Shift+T          Text Extractor: copy text from anything on screen
Hosts File Editor / Environment Variables   friendlier editors`,
          try: "سطّب PowerToys بـ winget، وجرّب File Locksmith على فولدر [[node_modules]] وانت فاتح dev server، وشوف node.exe ظاهر.",
          flag: "keys",
          deep: {
            why: "حاجات بتحتاجها كل يوم ومش موجودة في ويندوز بشكل مريح: مين ماسك الملف، تغيير زراير، ترتيب شبابيك مخصص.",
            how: R`كل أداة ليها زرار تشغيل وإيقاف في إعدادات PowerToys، فشغّل اللي محتاجه بس. Command Palette هو الجيل الجديد من PowerToys Run القديم (اللي كان على Alt+Space)، وممكن تلاقي الاتنين في الإعدادات.

Text Extractor مفيد لما يطلعلك error في نافذة مش بتسمح بالنسخ، أو كود في فيديو. File Locksmith بيعمل نفس اللي [[resmon]] بيعمله في كليك واحد.`,
            when: "أول ما تجهز جهاز ويندوز للتطوير.",
            mistakes: "تغيّر زراير بـ Keyboard Manager وتنسى، وبعدين تستغرب ليه زرار بيعمل حاجة تانية. والتغيير بيشتغل بس وPowerToys شغال. ومتسطبهوش من أي موقع غير GitHub الرسمي أو winget أو Microsoft Store."
          },
          sol: R`[[winget install Microsoft.PowerToys]] هيطبع [[Found PowerToys [Microsoft.PowerToys] Version ...]] وبعدين تحميل وأخيرًا [[Successfully installed]]. شغّل dev server، وكليك يمين على فولدر [[node_modules]] ثم «Unlock with File Locksmith» (في ويندوز 11 ممكن تحت Show more options). هتلاقي [[node.exe]] مع الـ PID بتاعه وعدد الملفات اللي ماسكها، وزرار End task.

لو File Locksmith قال إن مفيش حاجة ماسكة الفولدر، جرّب على فولدر المشروع كله بدل node_modules، لأن السيرفر بعد ما يقوم ممكن ميبقاش فاتح ملفات من node_modules. ولو العملية مش بتاعتك (أدمن)، دوس «Restart as administrator» جوه الأداة. ولو winget نفسه مش موجود، سطّب «App Installer» من Store.`
        },
        {
          cmd: "ms-settings:developers",
          title: "فعّل وضع المطوّر في ويندوز",
          desc: R`صفحة For developers فيها إعدادات معمولة للمبرمجين: Developer Mode بيخليك تعمل symlinks من غير أدمن (ريبوهات فيها symlinks بتتنسخ صح)، و End task بيضيف «End task» لكليك يمين على أي برنامج في الـ taskbar.

وفيها كمان مفاتيح Explorer (إظهار الامتدادات والملفات المخفية) وسماح لسكربتات PowerShell المحلية. في الإصدارات الأحدث الصفحة دي اتنقلت لـ System ← Advanced.`,
          example: R`Win+R → ms-settings:developers        (newer builds: System → Advanced)
Developer Mode → On                   symlinks without admin
End task → On                         right-click a taskbar app → End task
File Explorer → show extensions / hidden files / full path in title bar
PowerShell → allow local scripts      same as ExecutionPolicy RemoteSigned
mklink /D shared C:\code\shared-lib   (CMD) a folder symlink, no admin needed now`,
          try: "فعّل End task، وافتح Notepad، وكليك يمين على أيقونته في الـ taskbar ← End task.",
          flag: "keys",
          deep: {
            why: "ريبوهات فيها symlinks بتتنسخ على ويندوز كملفات نصية صغيرة وتبوظ الـ build. وبرنامج بيعلّق ومحتاج تقفله من غير ما تفتح Task Manager.",
            how: R`عمل symlink في ويندوز كان محتاج أدمن. Developer Mode بيشيل الشرط ده. Git for Windows كمان محتاج [[git config --global core.symlinks true]] (وتعمل clone من جديد) عشان يعمل symlinks حقيقية.

مفتاح PowerShell في الصفحة بيغيّر نفس الـ ExecutionPolicy اللي متشرحة في تاب PowerShell.`,
            when: "أول ما تجهز جهاز للتطوير. أو ريبو فيه symlinks (monorepos كتير كده).",
            mistakes: "Developer Mode بيسمح كمان بتسطيب تطبيقات من برّه الـ Store (sideloading). ده مش مشكلة لوحده، بس متسطبش أي حاجة من مصدر مش واثق فيه بحجة إن الوضع مفعّل."
          },
          sol: R`بعد ما تفعّل End task من صفحة For developers (أو System ثم Advanced في النسخ الأحدث): افتح Notepad، كليك يمين على أيقونته في الـ taskbar، هتلاقي «End task» تحت في القايمة جنب «Close window». دوسه هيقفل Notepad على طول، ولو فيه كلام مش متحفظ مش هيسألك.

لو «End task» مش ظاهر في القايمة، يبقى نسختك من ويندوز 11 أقدم من 23H2 (فيها الخيار ده متاح بعد تحديث) أو الإعداد مش متحفظ. ودي بتقفل العملية كلها مش النافذة بس، فلو عندك ٣ نوافذ Notepad (في Notepad الجديد اللي بالتابات) هيقفلهم كلهم.`
        },
        {
          cmd: "Dev Drive",
          title: "هارد مخصص للمشاريع يخلي npm install أسرع",
          desc: R`Dev Drive ميزة في ويندوز 11 (كل النسخ، حتى Home): partition أو هارد وهمي بنظام ملفات ReFS، معمول للمشاريع والكاش. أسرع في الشغل اللي فيه آلاف الملفات الصغيرة زي [[npm install]] والـ builds، لأن Defender بيفحصه بطريقة أخف (performance mode).

بيتعمل من Settings ← System ← Storage ← Advanced storage settings ← Disks & volumes ← Create dev drive. أقل حجم ٥٠ جيجا.`,
          example: R`Win+R → ms-settings:disksandvolumes → Create dev drive
Create new VHD → VHDX, Dynamically expanding, 50 GB+
D:\code\myapp                          put repos here
setx /M npm_config_cache D:\packages\npm   (admin) move npm's cache there too
fsutil devdrv query D:                 (admin) check it is "trusted"`,
          try: "افتح [[ms-settings:disksandvolumes]] وشوف هل عندك مساحة فاضية كفاية وهل الاختيار ظاهر، من غير ما تكمّل.",
          flag: "keys",
          deep: {
            why: "[[npm install]] و builds على ويندوز أبطأ بشكل ملحوظ من لينكس والماك، وجزء كبير من ده فحص الـ antivirus لكل ملف صغير.",
            how: R`اختيار VHD بيعمل ملف واحد على الهارد بيتعامل كهارد منفصل، ومش بيمس الـ partitions الموجودة، وده الأأمن. «Dynamically expanding» يعني الملف بيكبر مع الاستخدام مش ياخد الـ ٥٠ جيجا من الأول.

Defender بيفضل شغال على الـ Dev Drive، بس في performance mode: بيفحص بعد ما الملف يتفتح بدل ما يوقفه. ده أأمن من إنك تعمل exclusion لفولدر المشاريع في Defender.

بعد [[setx]] لازم تقفل كل الترمنالات وتفتحها.`,
            when: "مشاريع JavaScript أو .NET أو Java كبيرة على ويندوز مش على WSL.",
            mistakes: "تحط البرامج نفسها (Node، VS Code) على الـ Dev Drive، ده مش مقصود ليها، البرامج تفضل على C. ولو مشروعك جوه WSL مش هتستفيد، WSL ليه هارده الخاص. واختيار «Resize an existing volume» بيلعب في الـ partitions، خد backup قبله أو استخدم VHD."
          },
          sol: R`[[ms-settings:disksandvolumes]] هيفتح Disks & volumes. لو نسختك بتدعم Dev Drive (ويندوز 11 22H2 بتحديث 2023 أو أحدث)، هتلاقي زرار «Create dev drive» فوق. دوسه يوريك الخيارات (VHD جديد، أو تصغير partition، أو مساحة فاضية) من غير ما تتنفذ حاجة. وجنب كل درايف المساحة الفاضية، ومحتاج 50 GB على الأقل فاضيين.

لو الزرار مش موجود، يبقى ويندوز أقدم من المطلوب أو ويندوز 10، حدّثه. وخد بالك: Dev Drive بيتفرمت ReFS وبيفرق في npm install مع Defender في وضع «performance mode». الفرق الحقيقي بيتقاس، مش مضمون نفس الرقم في كل جهاز.`
        }
      ]
    },
    {
      t: "أوبونتو: تخصيص",
      l: 3,
      n: "اختصاراتك انت، وإعدادات GNOME من الترمنال عشان تجهز أي جهاز في دقيقة",
      items: [
        {
          cmd: "Custom Shortcuts",
          title: "اعمل اختصار يفتح مشروعك أو أي أمر في أوبونتو",
          desc: R`Settings ← Keyboard ← View and Customize Shortcuts ← Custom Shortcuts ← Add Shortcut. تكتب اسم، وأمر، وتختار الزراير. مثلًا Ctrl+Alt+M يفتح ترمنال جوه فولدر المشروع على طول، أو Ctrl+Shift+Esc يفتح System Monitor زي ويندوز.

وفي نفس الصفحة تقدر تغيّر أي اختصار موجود في النظام.`,
          example: R`Settings → Keyboard → View and Customize Shortcuts → Custom Shortcuts
Name:     myapp terminal
Command:  gnome-terminal --working-directory=/home/you/projects/myapp
Shortcut: Ctrl+Alt+M
Name: Task manager   Command: gnome-system-monitor   Shortcut: Ctrl+Shift+Esc
Command:  sh -c "code $HOME/projects/myapp"          when you need ~ or $HOME`,
          try: "اعمل اختصار Ctrl+Shift+Esc يفتح [[gnome-system-monitor]]، وجرّبه.",
          flag: "keys",
          deep: {
            why: "بتفتح نفس المشروع كل يوم بنفس الخطوات. اختصار واحد يوفّرها، وكمان تنقل عادات ويندوز اللي اتعودت عليها.",
            how: R`الأمر بيتشغّل مباشرة من غير شيل. يعني [[~]] و [[$HOME]] والـ pipes و [[&&]] مش هيشتغلوا لوحدهم. اكتب المسار كامل، أو لف الأمر في [[sh -c "..."]] لو محتاج حاجات الشيل.

[[--working-directory]] بتخلي الترمنال يفتح في الفولدر ده بدل الهوم.`,
            when: "مشروع شغال عليه كل يوم. أمر بتكتبه كتير. اختصار من نظام تاني اتعودت عليه.",
            mistakes: R`تكتب [[gnome-terminal --working-directory=~/projects/myapp]] فيفتح في الهوم ومش فاهم ليه، لأن [[~]] مش بتتفك من غير شيل. واختيار زراير مستخدمة في برنامج بتشتغل عليه (زي Ctrl+Shift+P في VS Code) بياخدها منه.`
          },
          sol: R`في Settings ثم Keyboard ثم View and Customize Shortcuts ثم Custom Shortcuts ثم [[+]]: Name أي حاجة، Command [[gnome-system-monitor]]، وبعدين Set Shortcut ودوس Ctrl+Shift+Esc. بعد Add، Ctrl+Shift+Esc من أي مكان هيفتح System Monitor.

لو Settings قالك إن الاختصار مستخدم في حاجة تانية، هيسألك تستبدله، ده في أوبونتو غالبًا مش هيحصل مع الاختصار ده. ولو الاختصار مش بيشتغل وانت على الكيبورد العربي، جرّب بالإنجليزي: GNOME ساعات بيقرا الاختصارات على أول layout بس. ولو كتبت [[~]] في Command وماشتغلش، ده لأن الأمر مش بيتنفذ في shell، استخدم [[sh -c]] زي المثال.`
        },
        {
          cmd: "gsettings",
          title: "غيّر إعدادات GNOME من الترمنال",
          desc: R`كل إعداد في GNOME متخزن كمفتاح، و [[gsettings]] بيقراه ويغيّره من الترمنال. بدل ما تدوّر في Settings، سطر واحد. والأهم: تحط الأوامر دي في سكربت، فأي جهاز أوبونتو جديد يتظبط زي جهازك في ثانية.`,
          example: R`gsettings get org.gnome.desktop.interface color-scheme
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
gsettings set org.gnome.mutter center-new-windows true
gsettings reset org.gnome.mutter center-new-windows
gsettings list-keys org.gnome.mutter`,
          try: "اعرف قيمة [[color-scheme]] عندك، وحوّلها لـ dark، وبعدين رجّعها بـ [[gsettings reset org.gnome.desktop.interface color-scheme]].",
          deep: {
            why: "تجهيز جهاز جديد بإعداداتك بالظبط من غير ما تفتكر كل checkbox، وحاجات كتير مش موجودة في Settings أصلًا.",
            how: R`الإعدادات متقسمة لـ schemas (زي [[org.gnome.desktop.interface]])، وكل واحدة فيها مفاتيح. [[list-keys]] يعرض المفاتيح، و [[get]] يقرا، و [[set]] يكتب، و [[reset]] يرجّع الافتراضي. التغيير بيسري فورًا.

القيم النصية لازم تتحط بين ' ' عشان الشيل. [[dash-to-dock]] هو الـ dock بتاع أوبونتو، ومفتاح [[click-action]] بيخلي الضغط على أيقونة برنامج مفتوح يصغّره (زي ويندوز). ولو عايز تشوف الإعدادات بواجهة: [[sudo apt install dconf-editor]].

وللإضافات (extensions): [[sudo apt install gnome-shell-extension-manager]] يسطّب برنامج Extension Manager.`,
            when: "dotfiles وسكربت تجهيز الجهاز. إعداد مخفي ملوش زرار.",
            mistakes: "تغيّر مفاتيح كتير عشوائي من نصايح نت، وبعدين مش فاكر غيّرت إيه. اكتب كل [[set]] في سكربت، وقبله [[get]] للقيمة القديمة، و [[reset]] دايمًا موجود."
          },
          lines: [
            "اقرا الوضع الحالي (فاتح ولا غامق).",
            "خلّي الواجهة dark. القيمة بين ' ' عشان الشيل.",
            "الضغط على أيقونة برنامج مفتوح في الـ dock يصغّره (خاص بأوبونتو).",
            "النوافذ الجديدة تفتح في نص الشاشة.",
            "رجّع المفتاح ده لقيمته الافتراضية.",
            "اعرض كل المفاتيح اللي في الـ schema دي."
          ],
          sol: R`[[gsettings get org.gnome.desktop.interface color-scheme]] هيطبع [[default]] بعلامات تنصيص مفردة (يعني فاتح) أو [[prefer-dark]]، وفي GNOME الحديث ممكن [[prefer-light]]. بعد [[set ... 'prefer-dark']] الـ Settings والبرامج الحديثة هتقلب داكن على طول من غير restart. و [[reset]] يرجّعها للقيمة الافتراضية، و [[get]] بعدها يطبع [[default]].

لو طلع [[No such schema]] يبقى انت مش على GNOME، أو في جلسة ssh أو WSL من غير الـ desktop. ولو اتغير الإعداد والتطبيقات القديمة (GTK3) فضلت فاتحة، ده لأنها بتقرا [[gtk-theme]] مش color-scheme، وده من الـ Appearance في Settings.`
        }
      ]
    },
    {
      t: "الماك: تخصيص",
      l: 3,
      n: "اختصارات Finder للترمنال، وإعدادات الكيبورد اللي المبرمج بيحتاجها",
      items: [
        {
          cmd: "New Terminal at Folder",
          title: "افتح ترمنال على الفولدر من Finder",
          desc: R`الماك فيه أمر جاهز بس مقفول: System Settings ← Keyboard ← Keyboard Shortcuts ← Services ← Files and Folders، وعلّم على «New Terminal at Folder». بعدها كليك يمين على أي فولدر في Finder ← Services ← New Terminal at Folder.

وحيلة من غير إعداد: اسحب الفولدر وارميه على أيقونة Terminal في الـ Dock، هيفتح جواه.`,
          example: R`System Settings → Keyboard → Keyboard Shortcuts → Services
Files and Folders → [x] New Terminal at Folder / New Terminal Tab at Folder
Right-click a folder → Services → New Terminal at Folder
Drag a folder onto Terminal in the Dock   opens a terminal there
Keyboard Shortcuts → App Shortcuts → +    give any menu item a shortcut`,
          try: "فعّل New Terminal at Folder، وافتح ترمنال على فولدر أي مشروع من Finder، واكتب [[pwd]].",
          flag: "keys",
          deep: {
            why: "انت في Finder واقف على المشروع، وعايز ترمنال هناك من غير [[cd]] لمسار طويل.",
            how: R`Services أوامر عامة بتشتغل على الحاجة اللي انت محددها في أي برنامج. من نفس الصفحة تقدر تديها اختصار كيبورد.

App Shortcuts بيخليك تدي اختصار لأي أمر في قايمة أي برنامج: تكتب اسم البرنامج واسم الأمر بالظبط زي ما هو مكتوب في القايمة، وتختار الزراير.

والعكس، من الترمنال لـ Finder: [[open .]] (متشرح في تاب zsh).`,
            when: "كل مرة تبدأ شغل على مشروع من Finder.",
            mistakes: "في App Shortcuts اسم الأمر لازم يطابق اللي في القايمة حرف بحرف، بما فيه «...» لو موجودة، وإلا مش هيشتغل ومش هيقولك ليه."
          },
          sol: R`بعد التفعيل: كليك يمين على فولدر المشروع في Finder ثم Services (أو Quick Actions تحت في بعض النسخ) ثم «New Terminal at Folder». Terminal هيفتح، و [[pwd]] يطبع [[/Users/you/projects/myapp]].

لو Services مش ظاهرة في القايمة، يبقى عملت كليك يمين على ملف أو مساحة فاضية، لازم على الفولدر نفسه. ولو [[pwd]] طبع [[~]] بدل الفولدر، يبقى إعداد في [[~/.zshrc]] بيعمل [[cd ~]] كل مرة الترمنال يفتح.`
        },
        {
          cmd: "ApplePressAndHoldEnabled",
          title: "خلّي الزرار يتكرر لما تدوس عليه مطوّل على الماك",
          desc: R`على الماك لو دوست مطوّل على حرف، بيطلعلك قايمة حروف بتشكيل (é ê ë) بدل ما الحرف يتكرر. ده مزعج جدًا لو بتستخدم Vim أو إضافة Vim في VS Code وعايز تمسك [[j]] تنزل.

الحل أمر [[defaults]] (الأمر نفسه متشرح في تاب zsh) يقفل القايمة دي لبرنامج واحد أو للنظام كله، وأوامر تانية تسرّع التكرار.`,
          example: R`defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
defaults write -g KeyRepeat -int 2
defaults write -g InitialKeyRepeat -int 15
defaults delete com.microsoft.VSCode ApplePressAndHoldEnabled`,
          try: "نفّذ أول سطر، واقفل VS Code وافتحه، وامسك زرار [[j]] في أي ملف وشوف بيتكرر.",
          deep: {
            why: "مستخدمين Vim ومحبي التنقل بالكيبورد بيحتاجوا التكرار. والتكرار الافتراضي على الماك بطيء على الكتير.",
            how: R`[[-g]] اختصار لـ NSGlobalDomain، يعني النظام كله. [[com.microsoft.VSCode]] يعني VS Code بس، وده أنضف لو مش عايز تفقد الحروف المشكّلة في باقي البرامج.

KeyRepeat هو السرعة (رقم أصغر = أسرع)، و InitialKeyRepeat هو الانتظار قبل ما يبدأ يكرر. 2 و 15 هما أسرع قيم في سلايدرات System Settings، وأي رقم أصغر (زي KeyRepeat 1) بيعدّي حدود السلايدر. إعدادات الكيبورد العامة محتاجة log out وتدخل تاني عشان تسري.`,
            when: "بتستخدم Vim أو إضافته، أو حاسس إن الكيبورد بطيء في التكرار.",
            mistakes: "تكتب [[-g]] مع ApplePressAndHoldEnabled وتنسى، وبعدين تحتاج تكتب حرف بتشكيل ومش عارف ليه القايمة مش بتظهر. واختيار أرقام صغيرة جدًا بيخلي الكتابة العادية تطلع حروف متكررة."
          },
          lines: [
            "اقفل قايمة الحروف المشكّلة في VS Code بس، فالزرار يتكرر وانت ماسكه.",
            "سرعة التكرار للنظام كله (أصغر = أسرع).",
            "المدة قبل ما التكرار يبدأ (أصغر = أسرع).",
            "رجّع VS Code للسلوك الافتراضي."
          ],
          sol: R`[[defaults write]] مش بيطبع حاجة. بعد ما تقفل VS Code بـ Cmd+Q (مش بس النافذة) وتفتحه، امسك [[j]] هيطلع [[jjjjjjjj]] بيتكرر. قبل الأمر، مسكة الزرار كانت بتكتب j واحدة بس (ولحروف زي [[e]] كانت هتطلّع قايمة الحروف بالتشكيل زي é). ولو عايز تشوف القيمة: [[defaults read com.microsoft.VSCode ApplePressAndHoldEnabled]] يطبع [[0]].

لو لسه مش بيتكرر، غالبًا قفلت النافذة بس والبرنامج لسه شغال. ولو السرعة بطيئة، الأمرين التانيين (KeyRepeat و InitialKeyRepeat) محتاجين logout وتدخل تاني. وده خاص بـ VS Code بس، في باقي البرامج مسكة الزرار لسه بتطلع القايمة.`
        }
      ]
    }
  ]
});
