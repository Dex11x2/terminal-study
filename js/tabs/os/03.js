// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
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
          teach: R`## الفكرة: Spotlight هو «Start» بتاع الماك

Spotlight خانة بحث بتظهر في نص الشاشة، بتدوّر في البرامج والملفات والإعدادات، وبتحسب كمان. المثال جدول، نفكه سطر سطر.

> مفيش ماك هنا، فكل الكلام ده من دوكيومنتيشن Apple: «Mac keyboard shortcuts» و «Search with Spotlight on Mac» على support.apple.com.

### زراير الماك

| الزرار | اسمه | يقابل في ويندوز |
|---|---|---|
| Cmd (⌘) | Command | Ctrl في أغلب الاختصارات |
| Option (⌥) | Option، ومكتوب عليه Alt في كيبوردات قديمة | Alt |
| Ctrl (⌃) | Control | مش زي Ctrl ويندوز، استخدامه أقل |
| Return | Enter | Enter |

---

## ١. افتح برنامج

~~~text
Cmd+Space → "term"      open Terminal
Cmd+Space → "code"      open VS Code
Cmd+Space → "activity"  open Activity Monitor
~~~

- Cmd+Space يفتح الخانة، وتكتب على طول.
- مش لازم الاسم كامل: [[term]] كفاية لـ Terminal، و [[activity]] لـ Activity Monitor (مدير المهام بتاع الماك).
- Return يفتح أول نتيجة (اللي متعلّمة).

---

## ٢. حاسبة

~~~text
Cmd+Space → 1024*8      quick calculation
~~~

[[*]] يعني ضرب. الناتج ([[8192]]) بيظهر في النتايج على طول من غير ما تدوس حاجة.

---

## ٣. اعرف الملف فين

~~~text
Cmd+Space → file name → Cmd+R        reveal it in Finder
~~~

اكتب اسم ملف، وبدل Return دوس Cmd+R (R من Reveal، «اكشف»): بيفتح Finder على الفولدر اللي فيه الملف ومعلّم عليه، بدل ما يفتح الملف نفسه.

---

## ٤. إعدادات أي برنامج

~~~text
Cmd+,                   settings of the app in front
~~~

Cmd مع زرار الفاصلة [[,]]. اتفاق في كل برامج الماك تقريبًا: يفتح Settings (أو Preferences في النسخ القديمة) بتاعة البرنامج اللي قدامك، Terminal أو VS Code أو المتصفح.

---

## الخلاصة

| الاختصار | بيعمل إيه |
|---|---|
| Cmd+Space ← اكتب ← Return | افتح |
| Cmd+Space ← اسم ملف ← Cmd+R | وريني مكانه في Finder |
| Cmd+, | إعدادات البرنامج اللي قدامك |`,
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
          teach: R`## الفكرة: على الماك البرنامج حاجة والنافذة حاجة

في ويندوز لما تقفل آخر نافذة البرنامج بيقفل. على الماك لأ: البرنامج ممكن يفضل شغال من غير ولا نافذة. وده بيفسّر نص الجدول. كل الكلام من دوكيومنتيشن Apple «Mac keyboard shortcuts» (مفيش ماك هنا).

---

## ١. التنقل

~~~text
Cmd+Tab           switch apps (keep Cmd held, Tab to move)
Cmd+Tab → Q       quit the highlighted app
Cmd+(key above Tab)   switch windows of the same app
~~~

- امسك Cmd، ودوس Tab كذا مرة: شريط أيقونات في نص الشاشة، والتحديد بيتنقل. سيب Cmd يروح للبرنامج المتحدد.
- وانت لسه ماسك Cmd، دوس Q: البرنامج المتحدد يتقفل من غير ما تروحله.
- الزرار اللي فوق Tab (في الكيبورد الإنجليزي عليه backtick) مع Cmd بيتنقل بين **نوافذ نفس البرنامج**، زي مشروعين مفتوحين في VS Code.

---

## ٢. القفل والإخفاء

~~~text
Cmd+W             close the window (app keeps running)
Cmd+Q             quit the app
Cmd+H             hide the app
Cmd+Option+H      hide all other apps
Cmd+M             minimize to the Dock
~~~

| الاختصار | الحرف من | النافذة | البرنامج |
|---|---|---|---|
| Cmd+W | Window | تتقفل | **لسه شغال** |
| Cmd+Q | Quit | تتقفل | يتقفل فعلًا |
| Cmd+H | Hide | تختفي | شغال، وCmd+Tab يرجّعه |
| Cmd+Option+H | Hide others | الباقي يختفي | كله شغال |
| Cmd+M | Minimize | تنزل الـ Dock | شغال |

تعرف إن البرنامج لسه شغال من النقطة الصغيرة تحت أيقونته في الـ Dock (الشريط اللي تحت).

---

## الخلاصة

- Cmd+Tab بين البرامج، Cmd+(اللي فوق Tab) بين نوافذ نفس البرنامج.
- Cmd+W = نافذة، Cmd+Q = برنامج.
- قبل ما تشارك الشاشة: Cmd+Option+H.`,
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
          teach: R`## الفكرة: القفل بالعافية

«Force Quit» يعني اقفل بالعافية: البرنامج مبيتسألش ومبيحفظش، بيتقفل وخلاص. ده آخر حل بعد ما Cmd+Q يفشل. الكلام من دوكيومنتيشن Apple «Force an app to quit on Mac» (مفيش ماك هنا).

---

## ١. النافذة

~~~text
Cmd+Option+Esc        Force Quit window
~~~

- Cmd و Option و Esc (Escape، الزرار اللي فوق شمال) مع بعض. نفس فكرة Ctrl+Alt+Del القديمة في ويندوز.
- النافذة اللي بتظهر اسمها «Force Quit Applications»، فيها البرامج اللي ليها واجهة بس.
- البرنامج المهنّج مكتوب جنبه «Not Responding».

---

## ٢. القفل

~~~text
Select app → Force Quit
~~~

حدد البرنامج من اللستة ودوس زرار Force Quit تحت، وهيسألك تأكيد. أي حاجة مش محفوظة فيه بتضيع.

---

## ٣. من الـ Dock

~~~text
Right-click Dock icon + hold Option → Force Quit
~~~

كليك يمين على أيقونة البرنامج في الـ Dock بيطلّع قايمة فيها Quit. لو مسكت Option والقايمة مفتوحة، Quit بتتحوّل لـ Force Quit.

---

## اللي مش هتلاقيه هنا

dev server شغال من الترمنال ([[node]] أو [[python]]) **مش برنامج بواجهة**، فمش هيظهر في النافذة دي. ده يتقفل بـ Ctrl+C في الترمنال بتاعه، أو من Activity Monitor، أو بـ [[kill]] (متشرحة في تاب zsh).

| الأداة | بتعرض إيه |
|---|---|
| Cmd+Option+Esc | البرامج اللي ليها نوافذ |
| Activity Monitor | كل العمليات |
| [[kill]] و [[lsof -i :3000]] | من الترمنال، بالـ PID أو بالبورت |

---

## الخلاصة

Cmd+Q الأول، واستنى شوية. لو مفيش فايدة: Cmd+Option+Esc ← Force Quit.`,
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
          teach: R`## الفكرة: Mission Control و Spaces والتقسيم

Mission Control شاشة بتوريك كل النوافذ مفرودة، وفوقها شريط الـ **Spaces** (اسم الماك للـ virtual desktops). ومن macOS 15 Sequoia فيه تقسيم شبابيك بالكيبورد. الكلام من دوكيومنتيشن Apple «Mission Control» و «Tile windows on Mac» (مفيش ماك هنا).

---

## ١. Mission Control

~~~text
Ctrl+Up                 Mission Control (all windows + Spaces)
Ctrl+Down               all windows of the current app
~~~

| الاختصار | بيعرض إيه |
|---|---|
| Ctrl+Up | كل نوافذ كل البرامج، والـ Spaces فوق |
| Ctrl+Down | نوافذ البرنامج اللي قدامك بس (اسمها App Exposé) |

Ctrl هنا هو Control الحقيقي (⌃) مش Cmd.

---

## ٢. Spaces

~~~text
Ctrl+Left / Ctrl+Right  previous / next Space
Mission Control → +     add a new Space
~~~

- Ctrl+الأسهم يتنقل بين الـ Spaces بحركة سحب.
- Space جديد: افتح Mission Control، وفي الشريط اللي فوق على اليمين زرار [[+]].
- أي برنامج full screen (الزرار الأخضر) بياخد Space لوحده.

---

## ٣. التقسيم (Sequoia وأحدث)

~~~text
Fn+Ctrl+Left / Right    tile window to left / right half (Sequoia+)
Fn+Ctrl+F               fill the screen
Fn+Ctrl+C               center the window
~~~

| الاختصار | بيعمل إيه |
|---|---|
| Fn+Ctrl+Left / Right | النافذة تاخد النص الشمال / اليمين |
| Fn+Ctrl+F | تملى الشاشة (F من Fill)، من غير ما تبقى full screen في Space لوحدها |
| Fn+Ctrl+C | ترجع في النص (C من Center) |

**Fn** الزرار اللي تحت شمال، وفي الكيبوردات الجديدة عليه رسمة كرة أرضية واسمه **Globe**، هو هو. من غير Fn، Ctrl+Left بيتنقل بين الـ Spaces، فالـ Fn هي اللي بتفرّق.

---

## الخلاصة

- Ctrl+Up = شوف كله، Ctrl+Down = نوافذ البرنامج ده.
- Ctrl+الأسهم = بين الـ Spaces.
- Fn+Ctrl+الأسهم = نص الشاشة (macOS 15 وأحدث).`,
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
          teach: R`## الفكرة: الرقم بيحدد بتصوّر إيه، و Ctrl بيحدد تروح فين

اختصارات التصوير على الماك كلها Cmd+Shift ورقم. الرقم بيقول «صوّر إيه»، ولو زودت Ctrl الصورة تروح الكليب بورد بدل ما تبقى ملف. الكلام من دوكيومنتيشن Apple «Take a screenshot on Mac» (مفيش ماك هنا).

---

## ١. الأرقام

~~~text
Cmd+Shift+3           full screen → file on Desktop
Cmd+Shift+4           select a region → file
Cmd+Shift+4 → Space   click a window → file
~~~

| الاختصار | بيصوّر | إزاي |
|---|---|---|
| Cmd+Shift+3 | الشاشة كلها | فورًا |
| Cmd+Shift+4 | جزء | المؤشر بيبقى علامة [[+]]، اسحب مستطيل |
| Cmd+Shift+4 ثم Space | نافذة | المؤشر بيبقى كاميرا، دوس على النافذة. الصورة بظلها |

الملف بيروح الـ Desktop باسم زي [[Screenshot 2026-09-30 at 10.15.22.png]] (التاريخ والوقت).

---

## ٢. Ctrl = الكليب بورد

~~~text
Ctrl+Cmd+Shift+4      region → clipboard (paste with Cmd+V)
~~~

نفس Cmd+Shift+4 بالظبط، بس مفيش ملف بيتعمل، والصورة في الكليب بورد. تلزقها في شات أو GitHub بـ Cmd+V. نفس الحكاية مع 3: Ctrl+Cmd+Shift+3 الشاشة كلها للكليب بورد.

---

## ٣. اللوحة الكاملة

~~~text
Cmd+Shift+5           panel: record video, Options → save location
Esc                   cancel
~~~

- Cmd+Shift+5 بيفتح شريط تحت فيه كل الأوضاع، وكمان تسجيل فيديو للشاشة كلها أو لجزء.
- Options في نفس الشريط: Save to تغيّر منه مكان الحفظ (فولدر Screenshots، أو Clipboard على طول).
- Esc في أي لحظة يلغي.

---

## الخلاصة

| الاختصار | النتيجة |
|---|---|
| Cmd+Shift+3 | الشاشة ← ملف |
| Cmd+Shift+4 | جزء ← ملف |
| ... ثم Space | نافذة ← ملف |
| Ctrl + أي واحد فوق | نفس الحاجة ← الكليب بورد |
| Cmd+Shift+5 | كل حاجة + فيديو + الإعدادات |`,
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
          teach: R`## الفكرة: نقطة في أول الاسم = مخفي

الماك نظام يونكس زي لينكس، فأي ملف اسمه بيبدأ بنقطة Finder بيخبيه. Cmd+Shift+. (النقطة هي الزرار نفسه) بيبدّل بين إظهارهم وإخفائهم. الكلام من دوكيومنتيشن Apple «Mac keyboard shortcuts» (مفيش ماك هنا).

---

## ١. في Finder

~~~text
Cmd+Shift+.       toggle hidden files in Finder
~~~

- **toggle** يعني «بدّل»: دوسة تظهرهم، ودوسة تخفيهم.
- الملفات المخفية بتظهر **باهتة** عشان تعرف إنها مخفية في العادي.
- هتلاقي [[.git]] و [[.gitignore]] و [[.env]] في فولدر المشروع، و [[.zshrc]] و [[.ssh]] في الهوم.

نفس الفكرة في الترمنال: [[ls]] مش بيعرضهم، و [[ls -a]] بيعرضهم. جربتها على أوبونتو جوه Docker (والماك نفس السلوك): في الهوم [[ls]] مطلّعش حاجة، و [[ls -a]] طلّع [[.bashrc]] و [[.profile]] و [[.ssh]].

---

## ٢. في نوافذ Open و Save

~~~text
Cmd+Shift+.       same inside any Open / Save dialog
~~~

لما برنامج يقولك «اختار ملف» (زي ترفع مفتاح SSH أو [[.env]])، النافذة دي هي Finder مصغّر، فنفس الاختصار بيشتغل جواها.

---

## ٣. الهوم

~~~text
Cmd+Shift+H       jump to your home folder
~~~

H من Home: فولدرك ([[/Users/you]]، اللي الترمنال بيكتبه [[~]]). مكان معظم الملفات المخفية المهمة.

---

## الخلاصة

| | Finder | الترمنال |
|---|---|---|
| المخفي مستخبي | العادي | [[ls]] |
| المخفي ظاهر | Cmd+Shift+. | [[ls -a]] |`,
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
          teach: R`## الفكرة: اكتب المسار بدل ما تدوّر

Go to Folder خانة بتكتب فيها مسار، و Finder يروحله على طول، حتى لو الفولدر مخفي. الكلام من دوكيومنتيشن Apple «Go directly to a specific folder on Mac» (مفيش ماك هنا).

---

## ١. المسارات في المثال

~~~text
Cmd+Shift+G → ~/.ssh                      SSH keys
Cmd+Shift+G → ~/Library/Application Support/Code/User   VS Code settings
Cmd+Shift+G → /opt/homebrew               Homebrew (Apple Silicon)
Cmd+Shift+G → /etc/hosts                  jumps to the file
~~~

G من Go. وكل مسار:

| المسار | فيه إيه |
|---|---|
| [[~/.ssh]] | [[~]] = الهوم، و [[.ssh]] فولدر مفاتيح SSH (مخفي بالنقطة) |
| [[~/Library/Application Support/Code/User]] | إعدادات VS Code ([[settings.json]]). [[Library]] مخفي، و [[Application Support]] فيه مسافة |
| [[/opt/homebrew]] | Homebrew على أجهزة Apple Silicon (M1 وأحدث). على Intel كان [[/usr/local]] |
| [[/etc/hosts]] | ده **ملف** مش فولدر: Finder بيفتح الفولدر اللي فيه ويعلّم عليه |

المسار اللي بيبدأ بـ [[/]] من أول الديسك، واللي بيبدأ بـ [[~]] من فولدرك.

---

## ٢. الإكمال

~~~text
Tab                                        autocompletes the path
~~~

زي الترمنال: اكتب أول حروف ودوس Tab، يكمّل الاسم. [[~/Lib]] ثم Tab يبقى [[~/Library/]].

---

## العكس من الترمنال

| عايز | الأمر |
|---|---|
| تروح لفولدر في Finder | Cmd+Shift+G |
| تفتح فولدر في Finder من الترمنال | [[open ~/.ssh]] (تاب zsh) |
| تفتحه في Files على أوبونتو | [[xdg-open ~/.ssh]] |

---

## الخلاصة

Cmd+Shift+G ← اكتب المسار (Tab يكمّل) ← Return. بيشتغل في Finder وفي نوافذ Open و Save.`,
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
          teach: R`## الفكرة: نسخ المسار مش نسخ الملف

Cmd+C العادي على ملف في Finder بينسخ **الملف** (عشان تلزقه في فولدر تاني). لو عايز **المسار** كنص، فيه اختصار تاني. الكلام من دوكيومنتيشن Apple (Finder ← Edit menu) (مفيش ماك هنا).

---

## ١. الاختصار

~~~text
Cmd+Option+C                  copy full path of the selection
~~~

حدد الملف، و Cmd+Option+C: المسار الكامل زي [[/Users/you/projects/myapp/package.json]] بيروح الكليب بورد كنص. ونفس الأمر من القايمة:

~~~text
Right-click + hold Option → Copy "..." as Pathname
~~~

كليك يمين على الملف، والقايمة مفتوحة امسك Option: «Copy» بيتحوّل لـ «Copy "package.json" as Pathname».

---

## ٢. السحب للترمنال

~~~text
Drag a file into Terminal     its path is typed for you
~~~

ارمي الملف جوه نافذة Terminal: المسار بيتكتب مكان المؤشر، ولو فيه مسافة بيحط قبلها [[\]]:

~~~text
My Projects   ←  اسم الفولدر
My\ Projects  ←  اللي بيتكتب في الترمنال
~~~

[[\]] قبل المسافة معناها «المسافة دي جزء من الاسم، مش فاصل بين حاجتين» (اسمها escape). ده بديل التنصيص [["My Projects"]].

---

## ٣. شريط المسار

~~~text
Cmd+Option+P                  show the path bar in Finder
~~~

P من Path. بيظهر شريط تحت في Finder فيه الفولدرات من الديسك لحد مكانك، وكل واحد تقدر تدوس عليه دبل كليك تروحله. ودوسة تانية تخفيه.

---

## الخلاصة

| | ويندوز | ماك |
|---|---|---|
| نسخ المسار | Ctrl+Shift+C (بتنصيص) | Cmd+Option+C |
| من القايمة | Shift + كليك يمين ← Copy as path | Option + كليك يمين ← Copy as Pathname |
| السحب للترمنال | بيكتب المسار | بيكتب المسار و [[\]] قبل المسافات |`,
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
          teach: R`## الفكرة: بص على الملف من غير ما تفتحه

Quick Look معاينة سريعة: Finder بيعرض الملف في نافذة خفيفة من غير ما يشغّل البرنامج بتاعه. والجدول فيه كمان اختصارات Finder اللي تخليك تستغنى عن الماوس. الكلام من دوكيومنتيشن Apple «Mac keyboard shortcuts» (Finder) و «View files with Quick Look» (مفيش ماك هنا).

---

## ١. Quick Look

~~~text
Space              Quick Look preview
~~~

- حدد ملف ودوس Space: نافذة بتعرضه. صورة، PDF، فيديو، نص، JSON.
- وهي مفتوحة الأسهم بتنقلك للملف اللي بعده والمعاينة تتحدّث.
- Space تاني (أو Esc) يقفلها.

---

## ٢. التنقل بالكيبورد

~~~text
Cmd+Down           open the selected item
Cmd+Up             go to the parent folder
Return             RENAME (not open!)
~~~

| الاختصار | بيعمل إيه | في ويندوز |
|---|---|---|
| Cmd+Down | يفتح الملف أو يدخل الفولدر | Enter |
| Cmd+Up | الفولدر الأب | Alt+Up |
| Return | **تغيير الاسم** | F2 |

ده أكتر فرق بيلخبط اللي جاي من ويندوز: Return في Finder مبيفتحش.

---

## ٣. باقي الإيدين

~~~text
Cmd+Delete         move to Trash
Cmd+I              Get Info (size, permissions)
Option+drag        copy instead of move
Cmd+Shift+N        new folder
~~~

| الاختصار | بيعمل إيه |
|---|---|
| Cmd+Delete | للـ Trash (سلة المهملات). Delete لوحده مبيعملش حاجة في Finder |
| Cmd+I | Get Info: الحجم، وتاريخ الإنشاء، والـ permissions تحت |
| Option+سحب | ينسخ بدل ما ينقل، وبتشوف علامة [[+]] خضرا جنب المؤشر |
| Cmd+Shift+N | فولدر جديد |

---

## الخلاصة

- Space = بص، Cmd+Down = افتح، Return = غيّر الاسم.
- Cmd+Up = اطلع فولدر لفوق.
- Cmd+Delete = Trash.`,
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
          teach: R`## الفكرة: نوعين اختصارات، والترمنال حالة خاصة

في أي خانة كتابة على الماك (VS Code، المتصفح، الإعدادات)، النظام نفسه بيفهم Option و Cmd مع الأسهم. لكن جوه الترمنال، اللي بيستلم الزراير هو الشيل (zsh)، ومش فاهم لغة الماك. فالجدول نصين: اختصارات النظام، وإزاي توصّلها للترمنال. الكلام من دوكيومنتيشن Apple «Mac keyboard shortcuts» (Document shortcuts) ودوكيومنتيشن iTerm2 (مفيش ماك هنا).

---

## ١. التنقل

~~~text
Option+Left / Right    jump one word
Cmd+Left / Right       start / end of line
Cmd+Up / Down          start / end of the document
~~~

القاعدة: **Option = كلمة، Cmd = لآخر حاجة**.

| | Option | Cmd |
|---|---|---|
| Left / Right | كلمة | أول / آخر السطر |
| Up / Down | | أول / آخر الملف كله |

---

## ٢. المسح

~~~text
Option+Delete          delete the previous word
Cmd+Delete             delete to the start of the line
Fn+Delete              delete forward
~~~

زرار Delete على الماك هو Backspace (بيمسح اللي **قبل** المؤشر). فنفس القاعدة:

- Option+Delete = امسح الكلمة اللي قبلك.
- Cmd+Delete = امسح من المؤشر لأول السطر.
- Fn+Delete = امسح الحرف اللي **بعد** المؤشر (Delete بتاع ويندوز)، لأن كيبورد الماك مفيهوش زرار منفصل ليه.

---

## ٣. الترمنال

~~~text
iTerm2: Presets → Natural Text Editing   make these work in the terminal
~~~

لما تدوس Option+Left، برنامج الترمنال بيحوّلها لحروف خاصة ويبعتها للشيل (اسمها escape sequence، بتبدأ بزرار Esc). لو الترمنال بعت حاجة zsh مش فاهمها، هتظهر قدامك كرموز زي [[;3D]].

| الترمنال | Option+Left | Cmd+Left | الحل |
|---|---|---|---|
| Terminal.app | شغال | مش شغال | Ctrl+A و Ctrl+E |
| iTerm2 الافتراضي | رموز غريبة | مش شغال | Settings ← Profiles ← Keys ← Key Mappings ← Presets ← Natural Text Editing |

ومقابلهم في الشيل نفسه (بيشتغلوا في أي ترمنال من غير إعداد):

| الشيل | بيعمل إيه | مقابل الماك |
|---|---|---|
| Ctrl+A | أول السطر | Cmd+Left |
| Ctrl+E | آخر السطر (E من End) | Cmd+Right |
| Ctrl+W | امسح الكلمة اللي قبلك (W من Word) | Option+Delete |

---

## الخلاصة

- Option = كلمة، Cmd = للآخر، في أي خانة كتابة.
- في الترمنال: Ctrl+A و Ctrl+E و Ctrl+W شغالين دايمًا.
- iTerm2: فعّل Natural Text Editing مرة واحدة.
- Ctrl+W في المتصفح بيقفل التاب، مش بيمسح كلمة.`,
          sol: R`في Terminal.app الافتراضي، Option+Left بيرجع كلمة كلمة لأن Terminal بيبعت الـ sequence اللي zsh فاهمها. Ctrl+A يوديك أول السطر، و Ctrl+W يمسح الكلمة اللي قبل المؤشر. وفي خانة بحث المتصفح: Cmd+Left أول السطر، و Option+Delete يمسح كلمة. نفس المنطق، بس في الترمنال الاختصارات بـ Ctrl لأنها جاية من zsh مش من الماك.

لو Option+Left كتب رموز غريبة زي [[;3D]] في الترمنال، يبقى انت في iTerm2 من غير «Natural Text Editing»: فعّلها من Settings ثم Profiles ثم Keys ثم Key Mappings ثم Presets. ولو Cmd+Left في الترمنال مش بيعمل حاجة، ده طبيعي، استخدم Ctrl+A و Ctrl+E. وخد بالك: Ctrl+W في المتصفح بيقفل التاب، مش بيمسح كلمة.`
        }
      ]
    }
]);
