// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
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
          teach: R`## الفكرة: الكيبورد أسرع من أي قايمة

المثال جدول اختصارات، مش أوامر بتتكتب في ترمنال. كل سطر فيه حاجة بتدوسها على الشمال، وعلى اليمين بالإنجليزي اللي هيحصل. هنفكه سطر سطر، وبعدين نشوف الرموز اللي في الجدول نفسه.

### الرموز اللي في المثال

| الرمز | يعني |
|---|---|
| [[Win]] | زرار ويندوز (عليه شعار ويندوز، بين Ctrl و Alt) |
| [[+]] | دوسهم مع بعض: امسك الأول وانت ماسكه دوس التاني |
| [[→]] | وبعدين: سيب اللي فات واعمل اللي بعده |
| [[type "code"]] | اكتب الكلمة دي بالكيبورد |
| [[..]] | من ... لـ ... (Win+1 لحد Win+9) |

---

## ١. البحث بالكتابة

~~~text
Win → type "code"                     open VS Code
Win → type "env"                      edit environment variables
~~~

- دوس Win **لوحده وسيبه**: قايمة Start بتفتح وخانة البحث جاهزة، مش محتاج تدوس عليها.
- ابدأ اكتب على طول. [[code]] بيلاقي VS Code لأن ده اسم البرنامج نفسه.
- [[env]] مش اسم برنامج، ده جزء من اسم صفحة «Edit the system environment variables». البحث بيدوّر في أسامي صفحات الإعدادات كمان، فمش لازم تحفظ مكانها.
- Enter بيفتح أول نتيجة (اللي متعلّمة فوق).

---

## ٢. افتحه كأدمن من غير ماوس

~~~text
Win → type "terminal" → Ctrl+Shift+Enter   run it as administrator
~~~

| الحتة | معناها |
|---|---|
| [[terminal]] | دوّر على Windows Terminal |
| [[Ctrl+Shift+Enter]] | افتح النتيجة دي «Run as administrator» بدل Enter العادي |

هيطلعلك مربع UAC (اختصار User Account Control) يسألك «Do you want to allow this app to make changes to your device?»، توافق بـ Yes (أو Alt+Y). وتعرف إنه أدمن من كلمة [[Administrator:]] في أول عنوان النافذة.

---

## ٣. أرقام الـ taskbar

~~~text
Win+1 .. Win+9                        open / switch to taskbar app N
Win+Shift+1                           new window of taskbar app 1
~~~

الرقم هو ترتيب الأيقونة على الـ taskbar (الشريط اللي تحت)، بيبدأ من أول برنامج **بعد** زراير Start و Search و Task View:

| حالة البرنامج | Win+1 بيعمل إيه |
|---|---|
| مقفول | يفتحه |
| مفتوح ومش قدامك | يجيبه قدام |
| قدامك أصلًا | يعمله minimize |
| مفتوح منه أكتر من نافذة | يعرض صور مصغّرة، ودوسة تانية تلف بينهم |

و Shift في النص معناها «نسخة جديدة»: Win+Shift+1 بيفتح نافذة جديدة من البرنامج حتى لو مفتوح.

> ويندوز بيقرا الزرار نفسه مش الحرف، فالأرقام شغالة حتى لو الكيبورد على العربي.

---

## ٤. أربع اختصارات من حرف واحد

~~~text
Win+E                                 File Explorer
Win+D                                 show desktop (again to restore)
Win+I                                 Settings
Win+L                                 lock the PC
~~~

| الاختصار | الحرف جاي منين | بيعمل إيه |
|---|---|---|
| Win+E | Explorer | يفتح File Explorer |
| Win+D | Desktop | يخفي كل الشبابيك ويوريك الديسكتوب، ودوسة تانية ترجّعهم زي ما كانوا |
| Win+I | الإعدادات (Settings) | يفتح Settings |
| Win+L | Lock | يقفل الشاشة، والبرامج كلها بتفضل شغالة وراها |

> سلوك الشاشة هنا من صفحة مايكروسوفت «Keyboard shortcuts in Windows»، مش متجرّب بأوامر لأنه بيفتح نوافذ.

---

## الخلاصة

- Win لوحده + اكتب الاسم = أسرع طريقة لأي برنامج أو إعداد.
- Ctrl+Shift+Enter بدل Enter = افتحه كأدمن.
- Win+رقم = البرنامج اللي في المكان ده على الـ taskbar، والعدّ بعد زراير Start و Search و Task View.
- Win+L قبل ما تقوم من على الجهاز، دايمًا.`,
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
          teach: R`## الفكرة: الكليب بورد بقى له ذاكرة

الكليب بورد العادي خانة واحدة: كل نسخة جديدة بتمسح اللي قبلها. Win+V بيحوّله لستة بآخر حاجات نسختها. المثال جدول خطوات، هنفكه سطر سطر.

---

## ١. افتح التاريخ وفعّله

~~~text
Win+V                  open clipboard history
Win+V → Turn on        first time only
~~~

- [[Win+V]]: V نفس حرف اللزق في Ctrl+V، والـ Win بتقول «النسخة الكبيرة منه».
- أول مرة هتلاقي رسالة إن الخاصية مقفولة وزرار **Turn on**. الخاصية مقفولة افتراضيًا، والتفعيل بيبدأ يسجّل من اللحظة دي بس، يعني اللي نسخته قبلها مش هيظهر.

على الجهاز اللي اتكتب عليه الدرس (ويندوز 11، PowerShell) قريت الإعداد من الـ registry من غير ما أغيّره:

~~~powershell
Get-ItemProperty HKCU:\Software\Microsoft\Clipboard
~~~

~~~text الناتج (من غير سطور PSPath)
ShellHotKeyUsed : 1
~~~

- [[HKCU]] اختصار HKEY_CURRENT_USER: إعدادات اليوزر الحالي.
- [[ShellHotKeyUsed : 1]] يعني Win+V اتداس قبل كده على الجهاز ده.
- ومفيش قيمة اسمها [[EnableClipboardHistory]]، يعني حد داس Win+V بس عمره ما داس Turn on، فالتاريخ مقفول. لما تدوس Turn on ويندوز بيكتب القيمة دي بـ 1. (متغيّرهاش بإيدك من الـ registry، الزرار أأمن.)

---

## ٢. الزق حاجة قديمة

~~~text
Up/Down → Enter        paste an older item
~~~

اللستة الأحدث فوق. الأسهم بتتحرك فيها، و Enter بيلزق العنصر اللي واقف عليه **مكان المؤشر** في البرنامج اللي كنت فيه. ممكن كمان تدوس عليه بالماوس.

---

## ٣. ثبّت وامسح

~~~text
... → Pin              keep it after restart
... → Clear all        wipe the history
~~~

[[...]] هنا هي زرار النقط التلاتة جنب كل عنصر:

| الاختيار | بيعمل إيه |
|---|---|
| Pin | يثبّت العنصر: مش بيتمسح مع restart ولا مع Clear all |
| Delete | يمسح العنصر ده بس (استخدمه بعد ما تنسخ باسورد أو توكن) |
| Clear all | يمسح كل اللي مش متثبّت |

اللستة بتشيل حوالي ٢٥ عنصر، والقديم بيقع من تحت لما تعدّي العدد ده.

---

## ٤. صفحة الإعدادات

~~~text
Win+R → ms-settings:clipboard     the settings page
~~~

[[Win+R]] بيفتح خانة Run، و [[ms-settings:clipboard]] لينك لصفحة Clipboard في Settings على طول (فكرة [[ms-settings:]] متشرحة في المستوى التاني من التاب). فيها زرار التفعيل، و «Sync across devices» (سيبه مقفول على جهاز شغل)، و Clear.

> سلوك النافذة من صفحة دعم مايكروسوفت «Clipboard in Windows».

---

## الخلاصة

- Win+V = لستة آخر حاجات نسختها، مش آخر واحدة بس.
- مقفول افتراضيًا: أول مرة Turn on.
- اللي مش متثبّت بيتمسح مع restart.
- secret نسخته؟ امسحه من اللستة بعد ما تستخدمه.`,
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
          teach: R`## الفكرة: الصورة بتروح الكليب بورد مش ملف

أغلب اختصارات التصوير في ويندوز 11 بتفتح أداة واحدة اسمها Snipping Tool. الفرق بينهم: بتصوّر إيه، والصورة بتروح فين. نفك الجدول سطر سطر.

---

## ١. صوّر جزء: Win+Shift+S

~~~text
Win+Shift+S        snip a region → clipboard
~~~

S هنا من Snip (قص). اللي بيحصل:

1. الشاشة بتغمق وشريط صغير بيظهر فوق في النص.
2. الشريط فيه ٤ أوضاع: Rectangle (مستطيل، الافتراضي)، و Freeform (شكل حر بالماوس)، و Window (نافذة بكليك)، و Fullscreen (الشاشة كلها).
3. تسحب المستطيل، والصورة تروح **الكليب بورد** على طول، ويطلع إشعار في الركن.
4. Esc يلغي من غير ما يصوّر.

---

## ٢. PrtScn لوحده

~~~text
PrtScn             same tool (Windows 11 default)
~~~

PrtScn اختصار Print Screen، زرار فوق على اليمين في الكيبورد (ساعات مكتوب PrtSc أو PrtScn). في ويندوز 11 الافتراضي إنه يفتح نفس الأداة اللي فوق. ده إعداد في Settings ← Accessibility ← Keyboard اسمه «Use the Print screen key to open screen capture».

---

## ٣. الشاشة كلها لملف

~~~text
Win+PrtScn         full screen → Pictures\Screenshots
~~~

ده الوحيد في الجدول اللي بيعمل **ملف** على طول من غير أي سؤال، والشاشة بتغمق لحظة كإشارة. الملف بيروح [[Pictures\Screenshots]] جوه فولدر الصور بتاعك. تعرف فولدر الصور فين من PowerShell:

~~~powershell
[Environment]::GetFolderPath("MyPictures")
~~~

~~~text الناتج على جهاز الدرس
C:\Users\you\OneDrive\Pictures
~~~

لاحظ إنه جوه OneDrive مش [[C:\Users\you\Pictures]]: لو OneDrive عامل backup للصور، فولدر الصور بيتنقل جواه، والـ screenshots كمان. و [[Screenshots]] نفسه بيتعمل مع أول صورة، فلو لسه مصوّرتش بالطريقة دي مش هتلاقيه.

---

## ٤. فيديو

~~~text
Win+Shift+R        record a region as video
~~~

R من Record. نفس فكرة Win+Shift+S، بس بعد ما تحدد المكان بتدوس Start، ولما توقف الفيديو بيفتح في Snipping Tool وتحفظه من هناك.

---

## ٥. اللزق

~~~text
Ctrl+V             paste the snip into GitHub / chat
~~~

GitHub (في issue أو comment) والشات بيقبلوا صورة من الكليب بورد مباشرة، فمحتاجش تحفظ ملف وترفعه.

> السلوك من صفحة مايكروسوفت «Use Snipping Tool to capture screenshots». اللي اتشغّل فعلًا هو أمر PowerShell بس.

---

## الخلاصة

| الاختصار | بيصوّر إيه | بيروح فين |
|---|---|---|
| Win+Shift+S أو PrtScn | جزء تختاره | الكليب بورد |
| Win+PrtScn | الشاشة كلها | ملف في Pictures\Screenshots |
| Win+Shift+R | فيديو لجزء | Snipping Tool تحفظه منه |`,
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
          teach: R`## الفكرة: Snap يعني «لزّق النافذة في مكان محسوب»

بدل ما تسحب النافذة وتشد أطرافها لحد ما تبقى نص الشاشة بالظبط، ويندوز بيعمل ده بزرار. والميزة دي اسمها Snap. المثال فيه طريقتين: قايمة أشكال (Win+Z)، وأسهم مباشرة.

---

## ١. قايمة الأشكال

~~~text
Win+Z                 snap layouts menu → pick a zone
~~~

- Win+Z بيفتح مربع صغير فوق على اليمين فيه أشكال تقسيم: نصين، وتلات أعمدة، وأربع أرباع...
- كل شكل متقسم لمناطق (zones)، وكل منطقة عليها رقم. تدوس الرقم أو تدوس على المنطقة بالماوس، والنافذة الحالية تتنقل هناك.
- بعدها على طول ويندوز بيعرض باقي النوافذ المفتوحة في المناطق الفاضية تختار تحط إيه فيها. ده اسمه **Snap Assist**.
- عدد الأشكال بيعتمد على عرض الشاشة: الشاشة الصغيرة بتعرض أشكال أقل.

---

## ٢. الأسهم

~~~text
Win+Left / Win+Right  snap to half the screen
Win+Up                maximize
Win+Down              restore / minimize
~~~

| الاختصار | بيعمل إيه |
|---|---|
| Win+Left | النافذة تاخد النص الشمال |
| Win+Right | النص اليمين |
| Win+Up | تكبّر على الشاشة كلها (maximize) |
| Win+Down | لو مكبّرة ترجع لحجمها (restore)، ولو هي أصلًا عادية تتصغّر للـ taskbar (minimize) |

ولو دوست Win+Up وهي في نص الشاشة، بتاخد الربع اللي فوق، و Win+Down تاخد الربع اللي تحت. كده تعمل أرباع من غير القايمة.

---

## ٣. شاشة تانية

~~~text
Win+Shift+Left/Right  move window to the other monitor
~~~

Shift هنا بتغيّر المعنى من «لزّق» لـ «انقل»: النافذة بتتنقل للشاشة اللي على الشمال أو اليمين بنفس حجمها النسبي. لو عندك شاشة واحدة مش هيحصل حاجة.

> السلوك من صفحة مايكروسوفت «Snap your windows»، مش متجرّب بأوامر لأنه بيحرّك نوافذ.

---

## الخلاصة

- Win+Z = اختار شكل تقسيم، وبعدين Snap Assist يملالك الباقي.
- Win+الأسهم = نص، تكبير، رجوع. و Up/Down وهي في نص = أرباع.
- Win+Shift+الأسهم = انقلها لشاشة تانية.
- مش شغال؟ Settings ← System ← Multitasking ← Snap windows.`,
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
          teach: R`## الفكرة: كذا «ترابيزة» على نفس الشاشة

Virtual desktop يعني ديسكتوب افتراضي: نفس الشاشة، بس كل ديسكتوب ليه مجموعة نوافذ لوحده. البرامج نفسها شغالة مرة واحدة، اللي بيتقسم هو **النوافذ**. نفك الجدول.

---

## ١. Task View

~~~text
Win+Tab              Task View: all windows and desktops
~~~

Task View شاشة فيها كل نوافذ الديسكتوب الحالي صور كبيرة، وتحتها شريط فيه كل الديسكتوبات اللي عندك وزرار «New desktop». من هنا تقدر:

- تدوس على نافذة تروحلها.
- تسحب نافذة لديسكتوب تاني تحت.
- كليك يمين على ديسكتوب ← Rename تسميه.

ومتلخبطش بينه وبين Alt+Tab: Alt+Tab بيقلب بين النوافذ وانت ماسك Alt وبيقفل أول ما تسيبه، Task View بيفضل مفتوح لحد ما تختار.

---

## ٢. ديسكتوب جديد والتنقل

~~~text
Win+Ctrl+D           new virtual desktop
Win+Ctrl+Left/Right  switch desktop
~~~

| الحتة | معناها |
|---|---|
| Win+Ctrl | «أوامر الديسكتوبات» |
| D | Desktop: اعمل واحد جديد وروحله على طول |
| Left / Right | الديسكتوب اللي قبله / اللي بعده بالترتيب |

---

## ٣. قفل ديسكتوب

~~~text
Win+Ctrl+F4          close current desktop (windows move, not close)
~~~

F4 هنا نفس فكرة Alt+F4 (اقفل)، بس على الديسكتوب. المهم في آخر السطر: النوافذ اللي كانت عليه **مش بتتقفل**، بتتنقل للديسكتوب اللي جنبه. فمفيش شغل بيضيع.

---

## ٤. Alt+Tab

~~~text
Alt+Tab              switch windows
~~~

امسك Alt ودوس Tab كذا مرة تتنقل بين النوافذ، وسيب Alt على اللي عايزه. الافتراضي إنه يعرض نوافذ **الديسكتوب الحالي بس**، وده سبب «النافذة اختفت» (هي في ديسكتوب تاني). الإعداد في Settings ← System ← Multitasking ← Desktops.

> السلوك من صفحة مايكروسوفت «Multiple desktops in Windows».

---

## الخلاصة

| الاختصار | بيعمل إيه |
|---|---|
| Win+Tab | شوف كل حاجة واختار |
| Win+Ctrl+D | ديسكتوب جديد |
| Win+Ctrl+الأسهم | اتنقل |
| Win+Ctrl+F4 | اقفل الديسكتوب، والنوافذ تتنقل مش تتقفل |`,
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
          teach: R`## الفكرة: مدير المهام بزرار واحد

Task Manager هو البرنامج اللي بيعرض كل اللي شغال على الجهاز ويخليك تقفله. Ctrl+Alt+Del بيوصلك ليه في خطوتين (شاشة زرقا وبعدين تختار)، و Ctrl+Shift+Esc بيفتحه على طول. Esc اختصار Escape، الزرار اللي فوق شمال.

---

## ١. افتحه ودوّر

~~~text
Ctrl+Shift+Esc         open Task Manager
Search box → "node"    find every node.exe
~~~

خانة البحث فوق بتفلتر تاب Processes بالاسم. هتلاقي node ظاهر باسم «Node.js JavaScript Runtime»، وممكن يبقى جوه مجموعة البرنامج اللي شغّله (زي Windows Terminal أو VS Code)، فوسّع المجموعة بالسهم.

نفس السؤال من PowerShell (من غير ما تقفل حاجة):

~~~powershell
Get-Process node
~~~

على جهاز الدرس (pwsh 7) طلع جدول طويل، أوله:

~~~text الناتج
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     79   110.42      59.11       0.91     356   1 node
     44   116.07      47.30       6.78    1764   1 node
     30    91.98      66.77       0.86    1896   1 node
~~~

و [[(Get-Process node).Count]] قال [[33]]: ٣٣ عملية node شغالين في نفس الوقت، أغلبهم أدوات في الخلفية مش سيرفرات انت شغّلتها. عشان كده تقفل بالاسم بس غلط.

| العمود | يعني |
|---|---|
| [[Id]] | الـ PID، رقم العملية |
| [[WS(M)]] | Working Set بالميجا: الـ RAM اللي العملية ماسكاها دلوقتي |
| [[CPU(s)]] | كام ثانية معالج استهلكت من ساعة ما قامت |

ولو مفيش عملية بالاسم ده:

~~~text الناتج
Get-Process: Cannot find a process with the name "nosuchapp". Verify the process name and call the cmdlet again.
~~~

---

## ٢. اقفله

~~~text
Right-click → End task kill it
~~~

End task بيقفل العملية فورًا، مش بيستأذنها زي Ctrl+C. فالسيرفر هيقف من غير ما يقفل الاتصالات أو يحفظ حاجة. اعتبره الحل لما Ctrl+C ميشتغلش، أو الترمنال اتقفل والعملية فضلت.

---

## ٣. تاب Details والـ PID

~~~text
Details tab            shows PID (match it with netstat -ano)
Details → right-click header → Select columns → Command line
~~~

- **PID** اختصار Process ID: رقم فريد لكل عملية شغالة. [[netstat -ano]] (في تاب CMD) بيقولك البورت 3000 ماسكه PID كام، وهنا تلاقي الـ PID ده وتقفله.
- عمود **Command line** بيوريك الأمر الكامل اللي العملية اتشغلت بيه. ده اللي بيفرّق بين خمس node.exe: واحد [[node server.js]] وواحد language server بتاع VS Code.

نفس المعلومة من PowerShell (قراية بس)، على عملية Explorer كمثال اتشغّل على جهاز الدرس:

~~~powershell
Get-CimInstance Win32_Process -Filter "Name='explorer.exe'" | Format-List ProcessId, CommandLine
~~~

~~~text الناتج
ProcessId   : 12932
CommandLine : C:\WINDOWS\Explorer.EXE
~~~

غيّر [[explorer.exe]] لـ [[node.exe]] وهتشوف أمر كل node شغال.

---

## ٤. Startup apps

~~~text
Startup apps           stop heavy apps from starting with Windows
~~~

تاب في الشمال فيه البرامج اللي بتقوم مع ويندوز، وعمود Startup impact يقولك تقلها. كليك يمين ← Disable يمنعها تقوم لوحدها، من غير ما يمسحها.

> شكل نافذة Task Manager من دوكيومنتيشن مايكروسوفت. أوامر PowerShell اتشغّلت فعلًا في pwsh 7.

---

## الخلاصة

- Ctrl+Shift+Esc → ابحث بالاسم → End task.
- كذا عملية بنفس الاسم؟ Details + عمود Command line.
- الـ PID هو الرابط بين Task Manager و [[netstat -ano]].
- متقفلش حاجة مش عارفها، ولو الـ taskbar علّق: Windows Explorer ← Restart.`,
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
          teach: R`## الفكرة: قايمة مختصرة لأدوات المدير

Win+X بيفتح قايمة نصية صغيرة جنب زرار Start اسمها Quick Link menu (ومعروفة بـ «power user menu»). كل عنصر فيها حرف متعلّم بخط تحت، وده اختصاره. نفك الجدول.

---

## ١. افتح القايمة

~~~text
Win+X            open the Quick Link menu
~~~

نفس القايمة بتظهر بكليك يمين على زرار Start. بعد ما تفتح، دوس الحرف لوحده (من غير Win ومن غير X).

---

## ٢. الحروف

~~~text
Win+X → A        Terminal (Admin)
Win+X → I        Terminal
Win+X → T        Task Manager
Win+X → M        Device Manager
Win+X → V        Event Viewer
~~~

| الحرف | العنصر | ملاحظة |
|---|---|---|
| A | Terminal (Admin) | A من Admin، بيطلّع UAC |
| I | Terminal | ترمنال عادي، ببروفايلك الافتراضي |
| T | Task Manager | زي Ctrl+Shift+Esc |
| M | Device Manager | الأجهزة والدرايفرات |
| V | Event Viewer | اللوجات |

الحروف دي مش ثابتة في كل نسخة ويندوز: الحرف الحقيقي هو اللي عليه خط تحت في القايمة عندك. في ويندوز 10 مثلًا العنصر اسمه Windows PowerShell مش Terminal.

---

## ٣. تتأكد إنك أدمن

بعد Win+X ثم A، عنوان النافذة بيبدأ بـ [[Administrator:]]. وفيه طريقة أدق: [[whoami /groups]] بيطبع المجموعات اللي انت فيها، ومنها «مستوى الثقة» (integrity level). على جهاز الدرس في PowerShell عادي (مش أدمن):

~~~powershell
whoami /groups | Select-String 'Mandatory Level'
~~~

~~~text الناتج
Mandatory Label\Medium Mandatory Level   Label   S-1-16-8192
~~~

- [[whoami]] يعني «أنا مين»، و [[/groups]] اعرض المجموعات.
- [[Select-String]] بيفلتر السطور اللي فيها الكلام ده (زي [[findstr]] في CMD).
- **Medium** = ترمنال عادي. في ترمنال الأدمن نفس الأمر بيطلّع **High Mandatory Level**.

---

## الخلاصة

- Win+X ثم A = ترمنال أدمن في ثانية.
- الحرف هو المتعلّم بخط تحت، والكيبورد لازم يبقى إنجليزي.
- Medium = عادي، High = أدمن. واقفل ترمنال الأدمن أول ما تخلص.`,
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
          teach: R`## الفكرة: شريط العنوان في Explorer بيشغّل أوامر

شريط العنوان (address bar) في Explorer مش بس للمسارات: لو كتبت فيه حاجة مش مسار، Explorer بيشغّلها كأمر، **وفولدر الشغل** بتاعها هو الفولدر اللي انت واقف فيه. ده كل السر. نفك الجدول.

---

## ١. الوصول لشريط العنوان

~~~text
Ctrl+L (or Alt+D)     focus the Explorer address bar
~~~

Ctrl+L (L من Location) أو Alt+D (D من aDdress) بيحددوا الكلام اللي في الشريط عشان تكتب فوقه على طول. نفس الاختصارين في المتصفح كمان.

---

## ٢. الأوامر

~~~text
cmd                   CMD opened in this folder
powershell            PowerShell in this folder
wt -d .               Windows Terminal in this folder
code .                VS Code on this folder
wsl                   Ubuntu (WSL) in this folder
~~~

### [[cmd]] و [[powershell]]

أسامي برامج موجودة في [[C:\Windows\System32]]، والبرامج دي بتبدأ في الفولدر اللي اتشغلت منه. فبتفتح واقفة في فولدر المشروع.

### [[wt -d .]]: نفكه حتة حتة

| الحتة | معناها |
|---|---|
| [[wt]] | Windows Terminal |
| [[-d]] | اختصار [[--startingDirectory]]: ابدأ في الفولدر ده |
| [[.]] | النقطة = «الفولدر الحالي» |

ليه [[wt]] محتاج [[-d .]] و [[cmd]] لأ؟ لأن Windows Terminal بيفتح كل تاب في الـ «Starting directory» المكتوب في البروفايل (غالبًا الهوم)، مش في الفولدر اللي اتشغل منه. [[-d .]] بتقوله صراحة «هنا». و [[wt]] نفسه برنامج صغير بيتسطب مع Windows Terminal في فولدر خاص بتطبيقات الـ Store، اتأكد إنه موجود من PowerShell:

~~~powershell
Get-Command wt
~~~

~~~text الناتج على جهاز الدرس
CommandType  Name    Source
-----------  ----    ------
Application  wt.exe  C:\Users\you\AppData\Local\Microsoft\WindowsApps\wt.exe
~~~

لو طلع error يبقى Windows Terminal مش متسطب.

### [[code .]]

[[code]] أمر VS Code (متسطب في الـ PATH لو علّمت «Add to PATH»)، والنقطة هنا معناها «افتح الفولدر ده كله كمشروع».

### [[wsl]]

بيفتح الشيل بتاع توزيعة لينكس الافتراضية، واقف على نفس الفولدر بس من جوه لينكس: [[C:\Users\you\app]] بيبقى [[/mnt/c/Users/you/app]].

---

## ٣. من غير كتابة

~~~text
Right-click empty space → Open in Terminal
~~~

في ويندوز 11، كليك يمين في **مكان فاضي** جوه الفولدر (مش على ملف) فيه «Open in Terminal»، وبيعمل نفس [[wt -d .]].

> تشغيل الأوامر من شريط Explorer من دوكيومنتيشن مايكروسوفت (مش متجرّب لأنه بيفتح نوافذ). [[Get-Command wt]] اتشغّل فعلًا في pwsh 7.

---

## الخلاصة

- Ctrl+L في Explorer ← اكتب الأمر ← Enter = يفتح في نفس الفولدر.
- [[wt]] بالذات محتاج [[-d .]].
- لازم تكون في فولدر حقيقي، مش Home أو This PC.`,
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
          teach: R`## الفكرة: المسار يتنسخ صح، بعلامات تنصيص

المسار (path) هو العنوان الكامل للملف من أول الدرايف: [[C:\Users\you\projects\myapp\package.json]]. Ctrl+Shift+C في Explorer بينسخه جاهز. وباقي الجدول اختصارات Explorer اللي بتمشي معاه.

---

## ١. نسخ المسار

~~~text
Ctrl+Shift+C      copy full path(s) of the selected item(s), quoted
~~~

- لازم الملف يبقى **متحدد** (كليك واحدة عليه، لونه اتغيّر).
- المسار بيتنسخ جوه [["..."]]. ليه؟ عشان لو فيه مسافة، الترمنال يفهمه حاجة واحدة.
- لو حددت كذا ملف، كل مسار بيتنسخ في سطر لوحده.

### ليه التنصيص مهم: جربتها

عملت فولدر اسمه [[My Project]] (فيه مسافة) في فولدر تجارب، وجواه [[package.json]]، وجرّبت في pwsh 7 من غير تنصيص:

~~~powershell
Get-Content My Project\package.json
~~~

~~~text الناتج
Get-Content: A positional parameter cannot be found that accepts argument 'Project\package.json'.
~~~

PowerShell قسم الكلام عند المسافة: فهم [[My]] كمسار، و [[Project\package.json]] كحاجة تانية زيادة مش عارف يحطها فين. وبالتنصيص:

~~~powershell
Get-Content "My Project\package.json"
~~~

~~~text الناتج
{ "name": "myapp" }
~~~

وده بالظبط اللي Ctrl+Shift+C بيعمله لوحده.

---

## ٢. باقي اختصارات Explorer

~~~text
F2                rename (Tab jumps to the next file)
Alt+Enter         Properties
Ctrl+Shift+N      new folder
Alt+Up            parent folder
Ctrl+T / Ctrl+W   new tab / close tab in Explorer
~~~

| الاختصار | بيعمل إيه | ملاحظة |
|---|---|---|
| F2 | يغيّر الاسم | وانت بتكتب، Tab يحفظ وينقلك للملف اللي بعده |
| Alt+Enter | Properties | الحجم، والمسار، والـ attributes |
| Ctrl+Shift+N | فولدر جديد | N من New |
| Alt+Up | الفولدر الأب | الفولدر اللي فيه الفولدر الحالي، زي [[cd ..]] |
| Ctrl+T / Ctrl+W | تاب جديد / اقفل التاب | التابات في Explorer من ويندوز 11 |

---

## ٣. السحب للترمنال

~~~text
Drag a file into Windows Terminal → its path is typed
~~~

لو سحبت ملف ورميته جوه نافذة Windows Terminal، المسار بيتكتب مكان المؤشر (والأمر مش بيتنفّذ لوحده، انت اللي بتدوس Enter).

> الاختصارات من صفحة مايكروسوفت «Keyboard shortcuts in Windows» (جزء File Explorer). تجربة التنصيص اتشغّلت فعلًا في pwsh 7.

---

## الخلاصة

- Ctrl+Shift+C = المسار كامل بتنصيص (ويندوز 11). في ويندوز 10: Shift + كليك يمين ← Copy as path.
- التنصيص هو اللي بيحمي المسار اللي فيه مسافات.
- في JSON كل [[\]] تبقى [[\\]]، وفي WSL [[C:\]] تبقى [[/mnt/c/]].`,
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
          teach: R`## الفكرة: إعدادين بيغيّروا اللي بتشوفه، مش الملفات

الامتداد (extension) هو آخر حتة في اسم الملف بعد النقطة: [[.js]] و [[.txt]] و [[.exe]]. ويندوز بيستخدمه عشان يعرف يفتح الملف بإيه، وبيخبّيه عنك افتراضيًا. والإعداد التاني بيخبّي الملفات اللي عليها علامة «مخفي». الاتنين بيغيّروا العرض بس، الملفات نفسها زي ما هي.

---

## ١. File name extensions

~~~text
Explorer → View → Show → File name extensions    see .js .env .txt
~~~

- **View** قايمة فوق في Explorer (ويندوز 11)، جواها **Show**، جواها الاختيار.
- علامة صح قدامه = الامتدادات ظاهرة.

الإعداد ده مكتوب في الـ registry. قريته من غير ما أغيّر حاجة على جهاز الدرس (pwsh 7):

~~~powershell
Get-ItemProperty HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced | Format-List HideFileExt, Hidden
~~~

~~~text الناتج
HideFileExt     : 1
Hidden          : 2
~~~

| القيمة | معناها |
|---|---|
| [[HideFileExt : 1]] | الامتدادات مخفية (ده الافتراضي). بعد ما تعلّم في القايمة بتبقى 0 |
| [[Hidden : 2]] | الملفات المخفية مش ظاهرة (الافتراضي). بعد التفعيل بتبقى 1 |

> متغيّرهمش من الـ registry، القايمة بتغيّرهم بأمان وExplorer بيتحدّث على طول.

---

## ٢. Hidden items

~~~text
Explorer → View → Show → Hidden items            see AppData, .git
~~~

في ويندوز «مخفي» مش اسم بيبدأ بنقطة زي لينكس، ده **attribute** (خاصية) على الملف اسمها H. تشوفها بأمر [[attrib]]، اتشغّل على فولدر المشروع اللي على الجهاز:

~~~powershell
attrib .git
attrib .gitignore
~~~

~~~text الناتج
    H                D:\...\full stack road map\.git
A                    D:\...\full stack road map\.gitignore
~~~

- [[H]] = Hidden: Git for Windows حطها على [[.git]]، فمش هيبان غير بعد ما تفعّل Hidden items، ويبان باهت.
- [[A]] = Archive، علامة عادية بتتحط على أي ملف اتعدّل، ملهاش علاقة بالإخفاء.
- [[.gitignore]] مفيهوش H، فبيبان عادي حتى من غير التفعيل، مع إنه بيبدأ بنقطة.

---

## ٣. نفس الإعدادات من Settings

~~~text
Win+R → ms-settings:developers                    File Explorer section has the same switches
~~~

صفحة For developers فيها قسم File Explorer فيه «Show file extensions» و «Show hidden and system files». نفس الإعدادات، من مكان تاني.

---

## الخلاصة

| الإعداد | الافتراضي | بعد التفعيل |
|---|---|---|
| File name extensions | [[index.html]] (والحقيقة ممكن [[index.html.txt]]) | الاسم كامل |
| Hidden items | [[.git]] و AppData مش ظاهرين | ظاهرين باهتين |

فعّلهم مرة واحدة على أي جهاز هتبرمج عليه، وبيفضلوا كده في كل الفولدرات.`,
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
          teach: R`## الفكرة: التاب الواحد يتقسم لكذا ترمنال

pane يعني «لوح» أو جزء من النافذة. Windows Terminal بيقسم التاب لكذا pane، وكل واحد ترمنال كامل لوحده. والاختصارات دي مش من ويندوز، دي من Windows Terminal نفسه، ومكتوبة في ملف [[defaults.json]] اللي جوه فولدر البرنامج. قريته على جهاز الدرس (Windows Terminal 1.24) والجدول تحت منه.

---

## ١. التقسيم

~~~text
Alt+Shift+Plus     split: new pane on the right (Plus = Shift+= key)
Alt+Shift+Minus    split: new pane below
Alt+Shift+D        split and duplicate the current profile
~~~

### إيه Plus و Minus؟

Plus هو زرار [[=]] (جنب Backspace)، لأن [[+]] بتطلع منه مع Shift. و Minus هو زرار [[-]] اللي جنبه. فـ Alt+Shift+Plus عمليًا = امسك Alt و Shift ودوس زرار [[=]].

### من الملف نفسه

~~~text اللي في defaults.json
{ "keys": "alt+shift+plus", "id": "Terminal.DuplicatePaneRight" },
{ "keys": "alt+shift+-",    "id": "Terminal.DuplicatePaneDown" },
~~~

| الاختصار | الاسم في الملف | يعني |
|---|---|---|
| Alt+Shift+Plus | DuplicatePaneRight | pane جديد على اليمين، بنفس البروفايل |
| Alt+Shift+Minus | DuplicatePaneDown | pane جديد تحت، بنفس البروفايل |
| Alt+Shift+D | DuplicatePaneAuto | نفس البروفايل، في الاتجاه اللي فيه مساحة أكبر |

Duplicate يعني «نسخة»: لو انت في Ubuntu، الجديد Ubuntu. ولاحظ إن Alt+Shift+D **مش** في [[defaults.json]]، هو مكتوب في ملف [[settings.json]] بتاعك: Windows Terminal بيكتبه فيه أول مرة يتفتح، جنب [[ctrl+c]] و [[ctrl+v]]. فلو لقيته مش شغال عندك، يبقى اتمسح من ملفك، وترجّعه من Settings ← Actions.

---

## ٢. التنقل والحجم

~~~text
Alt+Arrows         move focus between panes
Alt+Shift+Arrows   resize the focused pane
~~~

- **focus** يعني «اللي الكيبورد بيكتب فيه دلوقتي»، وعليه إطار ملوّن.
- Alt+السهم = انقل الـ focus للـ pane اللي في الاتجاه ده (في الملف: [[MoveFocusDown]] وإخواتها).
- Alt+Shift+السهم = كبّر أو صغّر الـ pane الحالي ([[ResizePaneDown]]...). Shift تاني بتغيّر المعنى: من «اتنقل» لـ «شد».

---

## ٣. القفل والتابات

~~~text
Ctrl+Shift+W       close pane (or tab if it's the last one)
Ctrl+Shift+T       new tab
Ctrl+Shift+1..9    new tab with profile N (PowerShell, Ubuntu, ...)
Ctrl+Shift+P       command palette
~~~

| الاختصار | الاسم في الملف | ملاحظة |
|---|---|---|
| Ctrl+Shift+W | ClosePane | من غير سؤال، وأي حاجة شغالة فيه بتقف |
| Ctrl+Shift+T | OpenNewTab | تاب بالبروفايل الافتراضي |
| Ctrl+Shift+1 | OpenNewTabProfile0 | العد في الملف من 0، فـ 1 = أول بروفايل في القايمة |
| Ctrl+Shift+P | ToggleCommandPalette | لستة بكل الأوامر وتبحث فيها بالاسم |

ليه كلها فيها Shift؟ لأن Ctrl+W و Ctrl+T من غير Shift بيروحوا للبرنامج اللي شغال جوه الترمنال (زي nano أو vim)، فـ Windows Terminal بياخد النسخة اللي فيها Shift لنفسه.

> قراية [[defaults.json]] و [[settings.json]] اتعملت فعلًا على جهاز الدرس. شكل الـ panes على الشاشة من دوكيومنتيشن Windows Terminal.

---

## الخلاصة

- Plus = يمين، Minus = تحت، D = اللي فيه مكان.
- Alt+أسهم = اتنقل، Alt+Shift+أسهم = غيّر الحجم.
- Ctrl+Shift+W بيقفل من غير سؤال.
- نسيت اختصار؟ Ctrl+Shift+P.`,
          sol: R`الترتيب اللي بيوصلك للشكل المطلوب: Alt+Shift+Minus الأول (بيقسم فوق وتحت)، وبعدين Alt+Up يوديك للجزء اللي فوق، وبعدين Alt+Shift+Plus يقسمه شمال ويمين. في أي واحد [[ping 8.8.8.8 -t]] هيفضل يطبع [[Reply from 8.8.8.8: bytes=32 time=20ms TTL=117]] كل ثانية، وانت بتتنقل بـ Alt+الأسهم وهو شغال. وقّفه بـ Ctrl+C لما تخلص.

لو عملت Plus الأول، هيبقى عندك اتنين جنب بعض وتحت واحد منهم بس. وعلى الكيبورد العربي: Alt+Shift هو اختصار تغيير اللغة في ويندوز لو متفعّل، فممكن تلاقي اللغة اتقلبت بعد الاختصار. الحل تستخدم Win+Space لتغيير اللغة وتقفل Alt+Shift من Settings ثم Time & language ثم Typing ثم Advanced keyboard settings ثم Input language hot keys. و Plus يعني زرار [[=]] مع Shift، أو + اللي في الـ numpad.`
        }
      ]
    }
  ]
});
