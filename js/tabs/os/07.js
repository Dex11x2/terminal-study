// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
    {
      t: "ويندوز: شكّل Windows Terminal",
      l: 3,
      n: "خط فيه أيقونات، وملف الإعدادات، وترمنال بينزل من فوق الشاشة بزرار واحد",
      items: [
        {
          cmd: "Nerd Font",
          title: "خط فيه أيقونات للترمنال",
          desc: R`Nerd Font مش خط واحد: ده خطوط برمجة معروفة (زي Meslo و JetBrains Mono و Cascadia) اتضاف عليها آلاف الأيقونات: فرع git، وفولدر، ولوجو Node و Python، وأسهم Powerline. أدوات تجميل الترمنال زي Oh My Posh و Starship و Powerlevel10k و Terminal-Icons بتطبع الأيقونات دي، ولو الترمنال مش على Nerd Font هتظهر مكانها مربعات فاضية أو علامات استفهام.

التسطيب على ويندوز، أي طريقة من دول:
• من [[nerdfonts.com/font-downloads]] (أو صفحة Releases في repo اسمه ryanoasis/nerd-fonts على GitHub): نزّل zip الخط، وفكّه، وحدد ملفات [[.ttf]] كلها، وكليك يمين ثم Install (ليك انت بس) أو Install for all users (محتاج أدمن). في ويندوز 11 ممكن تلاقيهم تحت Show more options.
• لو Oh My Posh متسطب عندك: [[oh-my-posh font install meslo]] بينزّل Meslo ويسطّبه لليوزر بتاعك، ولو الترمنال شغال كأدمن بيسطّبه لكل اليوزرز.
• winget فيه package واحدة بس عاملها حد من المجتمع لخط JetBrainsMono: [[winget install DEVCOM.JetBrainsMonoNerdFont]]. مش من فريق Nerd Fonts نفسه، فاعرف انت بتسطّب من مين.

اسم الخط اللي هتكتبه في الإعدادات هو اسم العيلة مش اسم الملف: من zip بتاع Nerd Fonts أو من Oh My Posh هيبقى زي [[MesloLGM Nerd Font]]، ولو سطّبت نسخة Powerlevel10k هيبقى [[MesloLGS NF]]. وكل خط بييجي بـ 3 أشكال: [[Nerd Font]] الأيقونات فيه أعرض شوية (حوالي حرف ونص) ومناسب لأغلب الترمنالات، و [[Nerd Font Mono]] كل أيقونة بعرض حرف واحد فبتبان أصغر، و [[Nerd Font Propo]] للبرامج العادية مش الترمنال.

بعد التسطيب اقفل البرنامج كله وافتحه عشان يشوف الخط الجديد، وبعدين:
• Windows Terminal: [[Ctrl+,]] ثم Profiles ثم Defaults ثم Appearance ثم Font face، فيتطبق على كل البروفايلات. أو [[font.face]] جوه [[profiles.defaults]] في settings.json (الدرس الجاي).
• VS Code: الترمنال اللي جواه ليه إعداد لوحده، [[terminal.integrated.fontFamily]] في settings.json بتاع VS Code (Ctrl+Shift+P ثم [[Preferences: Open User Settings (JSON)]]).

الاختبار: آخر سطر في المثال بيطبع ٣ أيقونات في PowerShell بأرقامها في Unicode. [[0xf07b]] رقم مكتوب hex ([[0x]] معناها إن اللي بعدها hex)، و [[[char]0xf07b]] بتحوّل الرقم للحرف اللي رقمه كده، و [[$(...)]] جوه النص بتحط الناتج مكانها. لو الخط شغال هتشوف فولدر، وفرع git، ولوجو GitHub. لو شفت مربعات، الخط مش متطبق.`,
          example: R`nerdfonts.com/font-downloads → Meslo → Download          zip with every weight
Extract → select all .ttf → right-click → Install        per user (Install for all users = admin)
oh-my-posh font install meslo                            same, from the terminal (needs Oh My Posh)
winget install DEVCOM.JetBrainsMonoNerdFont              community package, JetBrainsMono only
Windows Terminal → Ctrl+, → Defaults → Appearance → Font face → MesloLGM Nerd Font
VS Code settings.json → "terminal.integrated.fontFamily": "MesloLGM Nerd Font"
"$([char]0xf07b) $([char]0xf418) $([char]0xf09b)"       (PowerShell) folder, git branch, GitHub`,
          try: "سطّب Meslo Nerd Font، وخليه خط Windows Terminal والترمنال بتاع VS Code، واطبع سطر الأيقونات (آخر سطر في المثال) في الاتنين.",
          flag: "keys",
          deep: {
            why: "ثيمات الترمنال بتعرض الـ branch وحالة git ونسخة Node بأيقونات صغيرة بتوفّر مساحة وبتتقري بسرعة. من غير الخط اللي فيه الأيقونات دي، الـ prompt بيطلع مليان مربعات، وناس كتير تفتكر إن الثيم بايظ والمشكلة في الخط.",
            how: R`الأيقونات دي مكانها في Unicode منطقة اسمها Private Use Area (من [[U+E000]] لـ [[U+F8FF]]، وفيه مناطق تانية بعد كده). الأرقام دي مالهاش شكل رسمي، وكل خط بيحط فيها اللي هو عايزه. Nerd Fonts بياخد أيقونات من مجموعات زي Font Awesome و Devicons و Octicons و Powerline ويحطها في أرقام ثابتة، فأي برنامج يطبع [[U+F418]] عارف إنها هتطلع فرع git لو الخط Nerd Font.

Install العادية بتحط الخط في فولدر خطوط اليوزر ([[%LOCALAPPDATA%\Microsoft\Windows\Fonts]])، و Install for all users في [[C:\Windows\Fonts]]. والترمنال بيرسم بالخط اللي في إعداداته بس، فالتسطيب لوحده مش كفاية: لازم تختاره.

ولو بتستخدم WSL أو ssh لسيرفر: الخط بيتسطب على ويندوز بس، مش جوه لينكس، لأن Windows Terminal هو اللي بيرسم الحروف. الـ prompt اللي على السيرفر بيبعت رقم الأيقونة، والترمنال اللي على جهازك هو اللي بيرسمها.`,
            when: "قبل ما تسطّب أي ثيم للترمنال (Oh My Posh أو Starship أو Powerlevel10k) أو Terminal-Icons. ومرة واحدة على كل جهاز جديد.",
            mistakes: R`تغيّر الخط في Windows Terminal بس، وتفتح الترمنال بتاع VS Code تلاقي مربعات: ليه إعداد لوحده. أو تكتب اسم الملف ([[MesloLGMNerdFont-Regular]]) بدل اسم العيلة ([[MesloLGM Nerd Font]]). أو تسطّب ملف Regular بس، فالكلام العريض والمايل بيترسم بشكل تقريبي: سطّب كل الملفات. أو تسطّب الخط جوه WSL وتستنى Windows Terminal يشوفه.`
          },
          teach: R`## الدرس ده عن إيه

الـ prompt الحلو (فرع git ولوجو Node) بيطبع أرقام Unicode معينة، والخط هو اللي بيرسم شكلها. Nerd Font خط فيه رسومات للأرقام دي. فيه ٣ خطوات: تنزّل الخط، تسطّبه، تختاره في كل ترمنال. وآخر سطر اختبار. التسطيب والاختيار من الـ docs (مسطّبتش خطوط على الجهاز ده)، وسطر الاختبار اتجرّب في PowerShell 7 و 5.1.

---

## ١. التنزيل والتسطيب (أول ٤ سطور)

| السطر | الطريقة | لمين |
|---|---|---|
| ١ | [[nerdfonts.com/font-downloads]] ← Meslo ← Download | zip فيه كل الأوزان |
| ٢ | فك الـ zip ← حدد كل [[.ttf]] ← Install | ليك انت بس، من غير أدمن |
| ٣ | [[oh-my-posh font install meslo]] | نفس اللي فات بأمر، لو Oh My Posh متسطب |
| ٤ | [[winget install DEVCOM.JetBrainsMonoNerdFont]] | package من حد في المجتمع، لخط JetBrainsMono بس |

- [[.ttf]] (TrueType Font) ملف الخط. كل وزن ملف لوحده: Regular و Bold و Italic، فسطّبهم كلهم.
- في سطر ٣: [[oh-my-posh]] البرنامج، و [[font install]] أمره الفرعي، و [[meslo]] اسم الخط.
- في سطر ٤: [[DEVCOM]] اسم الناشر في winget، وده مش فريق Nerd Fonts.

Install العادية بتحط الخط في [[%LOCALAPPDATA%\Microsoft\Windows\Fonts]] (ليك بس)، و Install for all users في [[C:\Windows\Fonts]].

---

## ٢. اختيار الخط (سطر ٥ و ٦)

التسطيب لوحده مش كفاية: كل ترمنال بيرسم بالخط المكتوب في إعداداته هو.

| السطر | فين | الإعداد |
|---|---|---|
| ٥ | Windows Terminal | [[Ctrl+,]] ← Profiles ← Defaults ← Appearance ← Font face |
| ٦ | ترمنال VS Code | [["terminal.integrated.fontFamily": "MesloLGM Nerd Font"]] |

[[Ctrl+,]] بيفتح إعدادات Windows Terminal. و Defaults يعني الإعداد يسري على كل البروفايلات (PowerShell و CMD و Ubuntu) مرة واحدة. والقيمة **اسم العيلة** ([[MesloLGM Nerd Font]]) مش اسم الملف ([[MesloLGMNerdFont-Regular.ttf]]).

ولو فتحت [[defaults.json]] بتاع Windows Terminal 1.24 هتلاقي الخط الافتراضي مكتوب بالشكل القديم:

~~~text من defaults.json (Windows Terminal 1.24)
"fontFace": "Cascadia Mono",
"fontSize": 12,
~~~

الشكل الجديد اللي بتكتبه انت هو [["font": { "face": "...", "size": 12 }]] (الدرس الجاي)، والاتنين شغالين.

---

## ٣. سطر الاختبار

~~~powershell
"$([char]0xf07b) $([char]0xf418) $([char]0xf09b)"
~~~

هنفكه من جوه لبرة:

### [[0xf07b]]

رقم مكتوب بالـ hex (النظام الستاشري: أرقام من 0 لـ 9 وبعدها a لـ f). [[0x]] في الأول بتقول لـ PowerShell إن اللي بعدها hex:

~~~powershell
0xf07b
~~~

~~~text الناتج
61563
~~~

### [[[char]0xf07b]]

[[[char]0xf07b]] بيحوّل الرقم للحرف اللي رقمه في Unicode كده. والعكس [[[int][char]0xf418]] بيرجّع الرقم:

~~~powershell
[int][char]0xf418
~~~

~~~text الناتج
62488
~~~

### [[$(...)]] جوه [["..."]]

جوه نص بين علامات تنصيص مزدوجة، [[$(...)]] معناها «نفّذ اللي جوه وحط ناتجه هنا». فالسطر كله نص فيه ٣ حروف بينهم مسافتين. اتأكدت من ده بعدّ الحروف وأرقامها:

~~~powershell
$x = "$([char]0xf07b) $([char]0xf418) $([char]0xf09b)"
$x.Length
($x.ToCharArray() | % { "U+{0:X4}" -f [int]$_ }) -join " "
~~~

~~~text الناتج (PowerShell 7، و 5.1 طلّع نفس الطول 5)
5
U+F07B U+0020 U+F418 U+0020 U+F09B
~~~

[[U+0020]] هي المسافة. والتلات أرقام التانيين في منطقة اسمها **Private Use Area** (من [[U+E000]] لـ [[U+F8FF]]): Unicode مش بيدي أرقامها شكل رسمي، و Nerd Fonts حاطط فيها:

| الرقم | الأيقونة في Nerd Font |
|---|---|
| [[U+F07B]] | فولدر (Font Awesome) |
| [[U+F418]] | فرع git (Octicons) |
| [[U+F09B]] | لوجو GitHub (Font Awesome) |

لو الخط مش Nerd Font، الخط مالوش رسمة للأرقام دي، فبيطلع مربع أو علامة استفهام. الحروف نفسها موجودة صح، الرسم بس اللي ناقص.

---

## الخلاصة

~~~text
نزّل + سطّب كل .ttf      ليك انت بس، من غير أدمن
اختاره في كل ترمنال      Windows Terminal و VS Code كل واحد لوحده
اسم العيلة               MesloLGM Nerd Font، مش اسم الملف
مربعات                   الخط مش متطبق، الأيقونات نفسها سليمة
~~~`,
          lines: [
            "الموقع الرسمي: اختار Meslo (أو أي خط) ونزّل الـ zip، وفيه كل الأوزان: عادي وعريض ومايل.",
            "فك الـ zip وسطّب ملفات [[.ttf]] كلها مرة واحدة. Install لوحدها لليوزر بتاعك بس ومش محتاجة أدمن.",
            "نفس الخطوتين بأمر واحد، لو Oh My Posh متسطب.",
            "الـ package الوحيدة في winget: من حد في المجتمع، ولخط واحد بس.",
            "خليه خط كل البروفايلات في Windows Terminal. اختاره من القايمة بدل ما تكتبه، عشان الاسم يبقى مظبوط.",
            "الترمنال اللي جوه VS Code ليه خط لوحده، مش بياخد من Windows Terminal.",
            "اختبار في PowerShell: ٣ أيقونات بأرقامها. فولدر وفرع git ولوجو GitHub يبقى تمام، ومربعات يبقى الخط مش متطبق."
          ],
          sol: R`في Windows Terminal: [[Ctrl+,]] ثم Defaults تحت Profiles ثم Appearance، ومن Font face اختار [[MesloLGM Nerd Font]] ودوس Save. في VS Code: Ctrl+Shift+P ثم [[Preferences: Open User Settings (JSON)]]، وضيف [["terminal.integrated.fontFamily": "MesloLGM Nerd Font"]] واحفظ. سطر الاختبار في الاتنين بيطبع ٣ أيقونات جنب بعض: فولدر، وفرع git، ولوجو GitHub.

اتأكدت من الأسامي من الملفات نفسها: [[MesloLGMNerdFont-Regular.ttf]] من الـ repo الرسمي اسم العيلة جواه [[MesloLGM Nerd Font]]، ونسخة Mono [[MesloLGM Nerd Font Mono]]، وملف Powerlevel10k [[MesloLGS NF]]. واتأكدت إن الأيقونات التلاتة موجودة في الخطين دول، ومش موجودة في Cascadia Mono (خط Windows Terminal الافتراضي) ولا في خطوط الأيقونات اللي جاية مع ويندوز، فلو ظهرت يبقى الخط اشتغل فعلًا.

لو ظهرت مربعات: الخط مش متختار، أو البرنامج كان مفتوح وانت بتسطّب (اقفل كل نوافذه وافتحه). لو Windows Terminal طلّع تحذير [[Unable to find the following fonts]] وبعده الاسم، يبقى الاسم مكتوب غلط أو الخط مش متسطب. ولو الأيقونات راكبة على الحرف اللي بعدها أو مقطوعة، جرّب نسخة [[Mono]].`
        },
        {
          cmd: "Windows Terminal settings.json",
          title: "شكّل Windows Terminal من ملف الإعدادات",
          desc: R`كل إعدادات Windows Terminal (الخط والألوان والشفافية والبروفايل اللي بيفتح الأول) متخزنة في ملف JSON واحد اسمه [[settings.json]]. [[Ctrl+Shift+,]] بيفتحه في محرر النصوص بتاعك، و [[Ctrl+,]] بيفتح نفس الإعدادات بواجهة.

مكانه:
• النسخة العادية (من Store أو winget): [[%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json]].
• Preview: نفس المسار بس الفولدر اسمه [[Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe]].
• لو متسطب بـ Scoop أو Chocolatey: [[%LOCALAPPDATA%\Microsoft\Windows Terminal\settings.json]].
و [[Ctrl+Alt+,]] بيفتح [[defaults.json]]: كل القيم الافتراضية، للقراية بس، وأي تعديل فيه بيتجاهل.

JSON بسرعة: [[{ }]] object فيه مفاتيح وقيم، و [[[ ]]] لستة، و [[:]] بين المفتاح وقيمته، و [[,]] بين كل عنصر واللي بعده، ومفيش فاصلة بعد آخر عنصر. والنصوص والمفاتيح بين علامات تنصيص مزدوجة، و [[\]] جوه نص بتتكتب [[\\]].

[[profiles]] جواه [[defaults]] (إعدادات بتسري على كل البروفايلات) و [[list]] (البروفايلات نفسها: PowerShell و Command Prompt و Ubuntu...). أي مفتاح في [[defaults]] كل البروفايلات بتاخده، إلا لو بروفايل كاتب نفس المفتاح جواه في [[list]]، فبتاعه هو اللي يكسب.

مفاتيح [[defaults]] في المثال:
• [[font]]: جواه [[face]] اسم الخط (زي [[MesloLGM Nerd Font]] من درس Nerd Font) و [[size]] الحجم بالـ points (الافتراضي 12).
• [[colorScheme]]: اسم مجموعة الألوان. فيه جاهز زي [[Campbell]] (الافتراضي) و [[One Half Dark]] و [[Tango Dark]]، أو اسم scheme عملتها في [[schemes]].
• [[opacity]]: الشفافية من 0 لـ 100 (100 = مش شفاف خالص). و [[useAcrylic]] بـ [[true]] بيخلي الجزء الشفاف مضبب (acrylic)، و [[false]] شفاف من غير تضبيب، ودي على ويندوز 11 بس.
• [[backgroundImage]]: مسار صورة خلفية، و [[backgroundImageOpacity]] شفافيتها من 0 لـ 1 (0.15 يعني باهتة جدًا فالكلام يتقري).
• [[cursorShape]]: شكل المؤشر: [[bar]] (الافتراضي) أو [[underscore]] أو [[filledBox]] أو [[emptyBox]] أو [[vintage]] أو [[doubleUnderscore]].
• [[padding]]: المسافة بين الكلام وحرف النافذة: رقم واحد لكل الجهات، أو أربعة بالترتيب شمال وفوق ويمين وتحت ([["12, 8, 12, 8"]]).
• [[startingDirectory]]: الفولدر اللي التاب الجديد بيفتح فيه. [[%USERPROFILE%]] متغير بيئة ويندوز بيتبدّل بمسار الـ home بتاعك، وده الافتراضي.

وفي أول مستوى (برّه [[profiles]]):
• [[defaultProfile]]: البروفايل اللي بيفتح مع Ctrl+Shift+T أو [[wt]]، باسمه ([["PowerShell"]] ده PowerShell 7) أو بالـ GUID بتاعه.
• [[copyOnSelect]]: [[true]] يعني أي كلام تحدده بالماوس بيتنسخ على طول، وكليك يمين بيلزق.
• [[schemes]]: لستة الـ color schemes بتاعتك. كل واحدة ليها [[name]] (اللي بتكتبه في colorScheme)، و [[background]] و [[foreground]] (لون الكلام)، و [[cursorColor]] و [[selectionBackground]] (اختياريين)، و 16 لون الترمنال: 8 عادية ([[black]] و [[red]] و [[green]] و [[yellow]] و [[blue]] و [[purple]] و [[cyan]] و [[white]]) و 8 فاتحة بنفس الأسامي وقبلها [[bright]] ([[brightRed]] مثلًا). كل لون بالشكل [[#RRGGBB]]: أحمر وأخضر وأزرق، كل واحد رقمين hex.

لو فيه غلطة: الترمنال بيقرا الملف أول ما تحفظ. غلطة في شكل الـ JSON (فاصلة ناقصة أو زيادة) بتطلّع تحذير [[Failed to reload settings]] والترمنال يفضل على الإعدادات اللي قبلها، ولو فتحته والملف بايظ بيقول [[Temporarily using the Windows Terminal default settings.]] ويشتغل بالافتراضي لحد ما تصلّحه. ولو الـ JSON سليم بس فيه قيمة غلط (زي colorScheme مش موجودة)، بيطلع تحذير بالمشكلة دي بس ويتجاهل القيمة.

من الواجهة ([[Ctrl+,]]): Startup فيها Default profile، و Profiles ثم Defaults ثم Appearance فيها الخط والألوان والشفافية والخلفية والمؤشر والـ padding، و Color schemes تعمل فيها scheme جديدة أو تعدّل نسخة من واحدة جاهزة، و Interaction فيها Automatically copy selection to clipboard (ده copyOnSelect). وتحت على الشمال Open JSON file بيفتح نفس الملف.`,
          example: R`{
  "defaultProfile": "PowerShell",
  "copyOnSelect": true,
  "profiles": {
    "defaults": {
      "font": { "face": "MesloLGM Nerd Font", "size": 12 },
      "colorScheme": "My Dark",
      "opacity": 90,
      "useAcrylic": true,
      "backgroundImage": "C:\\Users\\you\\Pictures\\terminal-bg.png",
      "backgroundImageOpacity": 0.15,
      "cursorShape": "filledBox",
      "padding": "12, 8, 12, 8",
      "startingDirectory": "%USERPROFILE%\\projects"
    }
  },
  "schemes": [
    {
      "name": "My Dark",
      "background": "#1E1E2E", "foreground": "#CDD6F4",
      "cursorColor": "#F5E0DC", "selectionBackground": "#585B70",
      "black": "#45475A", "red": "#F38BA8", "green": "#A6E3A1", "yellow": "#F9E2AF",
      "blue": "#89B4FA", "purple": "#F5C2E7", "cyan": "#94E2D5", "white": "#BAC2DE",
      "brightBlack": "#585B70", "brightRed": "#F38BA8", "brightGreen": "#A6E3A1", "brightYellow": "#F9E2AF",
      "brightBlue": "#89B4FA", "brightPurple": "#F5C2E7", "brightCyan": "#94E2D5", "brightWhite": "#A6ADC8"
    }
  ]
}`,
          try: R`افتح الملف بـ [[Ctrl+Shift+,]] وجوه [[profiles]] ثم [[defaults]] ضيف [["colorScheme": "One Half Dark"]] و [["opacity": 85]] واحفظ، وشوف الترمنال اتغير من غير ما تقفله. وبعدين امسح فاصلة عمدًا واحفظ وشوف التحذير، ورجّعها.`,
          flag: "script",
          deep: {
            why: "الواجهة كويسة لتعديل واحد، لكن الملف بيخليك تشوف كل إعداداتك في مكان واحد، وتنسخها لجهاز جديد في ثانية، وتحطها مع الـ dotfiles بتاعتك على GitHub.",
            how: R`الإعدادات طبقات: [[defaults.json]] اللي جاي مع البرنامج، وفوقه [[profiles.defaults]] بتاعتك، وفوقه كل بروفايل في [[list]]، والطبقة الأقرب للبروفايل تكسب. البروفايلات اللي بتتعمل لوحدها (PowerShell 7 و WSL و Git Bash) ليها [["source"]]، وكل بروفايل ليه [["guid"]] رقم ثابت بيتعرف بيه.

البرنامج بيراقب الملف، فأي حفظ بيتطبق على النوافذ المفتوحة على طول. ولو حفظت من الواجهة، البرنامج بيكتب الملف من جديد بترتيبه هو. وأول الملف فيه [["$schema"]]، وده بيخلي VS Code يعرف المفاتيح المسموحة فيكمّلها لك ويعلّم على الغلط وانت بتكتب.

[[colorScheme]] تقدر تديله اتنين: [[{ "light": "One Half Light", "dark": "One Half Dark" }]] فيتغير مع ثيم الترمنال. ولو عايز ترجّع كل حاجة للأصل: اقفل الترمنال، وامسح [[settings.json]] و [[state.json]] اللي جنبه، وافتحه يعمل ملف جديد.`,
            when: "أول ما تجهّز جهاز ويندوز للشغل، وكل ما تسطّب خط أو ثيم جديد. ولما تنقل إعداداتك لجهاز تاني: انسخ الملف.",
            mistakes: R`تلزق مسار فيه [[\]] واحدة فالـ JSON يبوظ: لازم [[\\]] أو [[/]]. وتسيب فاصلة بعد آخر عنصر في object أو لستة. وتلزق المثال مكان الملف كله فتضيّع [["list"]] وتعديلاتك على البروفايلات: عدّل المفاتيح جوه ملفك. وتحط الإعداد في بروفايل واحد جوه [[list]] وتستغرب ليه التاني متغيرش: الإعدادات العامة مكانها [[defaults]]. وتكتب [[opacity]] بالشكل القديم [[0.8]]: القيمة دلوقتي من 0 لـ 100 (المفتاح القديم [[acrylicOpacity]] كان من 0 لـ 1).`
          },
          teach: R`## الملف ده إيه

[[settings.json]] ملف نصي فيه كل إعدادات Windows Terminal بصيغة JSON. المثال مش ملف كامل تلزقه: ده المفاتيح اللي بتعدّلها جوه ملفك. هنقرا الأول شكل الملف الحقيقي، وبعدين قواعد JSON، وبعدين كل مفتاح. الملف الحقيقي والـ [[defaults.json]] قريتهم (قراية بس) من جهاز عليه Windows Terminal 1.24، والمثال اتأكدت إنه JSON سليم بـ Node.

---

## ١. شكل الملف الحقيقي

ده الملف على الجهاز ده (مختصر)، في [[%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json]]:

~~~text settings.json (Windows Terminal 1.24، مختصر)
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": [],
    "copyOnSelect": false,
    "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
    "keybindings": [ ... ],
    "profiles":
    {
        "defaults": {},
        "list":
        [
            { "guid": "{61c54bbd-...}", "name": "Windows PowerShell", ... },
            { "guid": "{2ece5bfe-...}", "name": "Git Bash", "source": "Git" },
            { "guid": "{574e775e-...}", "name": "PowerShell", "source": "Windows.Terminal.PowershellCore" }
        ]
    },
    "schemes": [],
    "themes": []
}
~~~

- [[%LOCALAPPDATA%]] متغير بيئة بيتبدّل بـ [[C:\Users\<اسمك>\AppData\Local]].
- [[8wekyb3d8bbwe]] جزء ثابت في اسم أي تطبيق من مايكروسوفت متسطب من الـ Store.
- [[defaults]] فاضي ([[{}]])، وده المكان اللي هنحط فيه إعدادات المثال.
- [[list]] فيها البروفايلات، وكل واحد ليه [[guid]]: رقم فريد ثابت. [[source]] معناها إن البروفايل ده الترمنال اكتشفه لوحده (Git Bash من Git، و PowerShell 7).

---

## ٢. JSON في ٥ قواعد

| الرمز | معناه |
|---|---|
| [[{ }]] | object: مفاتيح وقيم |
| [[[ ]]] | لستة (array) |
| [["key": value]] | المفتاح بين [[" "]] دايمًا، وبعده [[:]] |
| [[,]] | بين كل عنصر واللي بعده، **ومش بعد آخر واحد** |
| [[\\]] | جوه نص، [[\]] لوحدها بتتكتب مرتين |

جرّبت الغلطتين المشهورتين بـ [[JSON.parse]] في Node:

~~~text الناتج
{"opacity": 85,}         -> Expected double-quoted property name in JSON at position 15
{"p": "C:\Users\you"}    -> Bad escaped character in JSON at position 10
{"p": "C:\\Users\\you"}  -> سليم
{"p": "C:/Users/you"}    -> سليم
~~~

الأولى: بعد الفاصلة الـ parser مستني مفتاح جديد، لقى [[}]]. التانية: [[\U]] جوه نص JSON معناها escape مش معروف. عشان كده المسار في المثال [[C:\\Users\\you\\...]]، أو اكتبه بـ [[/]].

---

## ٣. أول مستوى في المثال

~~~text
"defaultProfile": "PowerShell",
"copyOnSelect": true,
~~~

| المفتاح | القيمة | معناها | الافتراضي (من defaults.json) |
|---|---|---|---|
| [[defaultProfile]] | [["PowerShell"]] | البروفايل اللي بيفتح الأول، بالاسم أو بالـ guid | Windows PowerShell بالـ guid بتاعه |
| [[copyOnSelect]] | [[true]] | اللي تحدده بالماوس يتنسخ على طول | [[false]] |

[[true]] و [[false]] من غير علامات تنصيص: دول قيم منطقية (boolean) مش نص.

---

## ٤. [[profiles.defaults]]: كل البروفايلات

~~~text
"profiles": {
  "defaults": {
    ...
  }
},
~~~

[[profiles]] object جواه [[defaults]]. أي مفتاح في [[defaults]] بيسري على كل بروفايل، إلا لو البروفايل في [[list]] كاتب نفس المفتاح، فبتاعه يكسب. المفاتيح واحد واحد:

| المفتاح | قيمة المثال | معناها | الافتراضي |
|---|---|---|---|
| [[font]] | [[{ "face": "MesloLGM Nerd Font", "size": 12 }]] | object جواه اسم الخط وحجمه بالـ points | Cascadia Mono، 12 |
| [[colorScheme]] | [["My Dark"]] | اسم مجموعة ألوان، هنا اللي معرّفة تحت في [[schemes]] | [[Campbell]] |
| [[opacity]] | [[90]] | شفافية من 0 لـ 100، و 100 = مش شفاف | 100 |
| [[useAcrylic]] | [[true]] | الجزء الشفاف يبقى مضبب | [[false]] |
| [[backgroundImage]] | [["C:\\Users\\you\\Pictures\\terminal-bg.png"]] | مسار صورة خلفية، بـ [[\\]] | مفيش |
| [[backgroundImageOpacity]] | [[0.15]] | شفافية الصورة من 0 لـ 1 | 1 |
| [[cursorShape]] | [["filledBox"]] | مربع مليان | [[bar]] |
| [[padding]] | [["12, 8, 12, 8"]] | المسافة: شمال، فوق، يمين، تحت | [["8, 8, 8, 8"]] |
| [[startingDirectory]] | [["%USERPROFILE%\\projects"]] | التاب الجديد يفتح فين | [["%USERPROFILE%"]] |

العمود الأخير من [[defaults.json]] الحقيقي، وده سطر منه:

~~~text من defaults.json (Windows Terminal 1.24)
"colorScheme": "Campbell",
"cursorShape": "bar",
"padding": "8, 8, 8, 8",
"startingDirectory": "%USERPROFILE%",
"useAcrylic": false
~~~

لاحظ: [[opacity]] رقم من غير تنصيص، و [[padding]] نص بين تنصيص فيه ٤ أرقام. و [[%USERPROFILE%]] متغير بيئة بيتبدّل بمسار الهوم.

---

## ٥. [[schemes]]: مجموعة الألوان

~~~text
"schemes": [
  {
    "name": "My Dark",
    "background": "#1E1E2E", "foreground": "#CDD6F4",
    ...
  }
]
~~~

[[schemes]] لستة ([[[ ]]])، وكل عنصر فيها object لـ scheme واحدة. [[name]] هو اللي كتبناه في [[colorScheme]] فوق، ولازم يطابقه حرف بحرف.

### الألوان بتتقري إزاي: [[#1E1E2E]]

[[#]] وبعدها ٦ حروف hex، كل اتنين لون: أحمر ([[1E]] = 30)، أخضر ([[1E]] = 30)، أزرق ([[2E]] = 46). كل واحد من 0 ([[00]]) لـ 255 ([[FF]]). يعني [[#1E1E2E]] رمادي غامق مايل للأزرق.

### المفاتيح

| المفتاح | لون إيه |
|---|---|
| [[background]] و [[foreground]] | الخلفية والكلام |
| [[cursorColor]] و [[selectionBackground]] | المؤشر وخلفية الكلام المتحدد |
| [[black]] [[red]] [[green]] [[yellow]] [[blue]] [[purple]] [[cyan]] [[white]] | الـ 8 ألوان العادية |
| نفس الأسامي وقبلها [[bright]] | الـ 8 الفاتحة |

الـ 16 دول هما الألوان اللي البرامج بتطلبها بالاسم: لما [[git]] يلوّن سطر محذوف أحمر، بيطلب «red»، والـ scheme بتقرر يعني إيه أحمر. وده [[Campbell]] من [[defaults.json]] للمقارنة:

~~~text من defaults.json
"name": "Campbell",
"foreground": "#CCCCCC",
"background": "#0C0C0C",
"red": "#C50F1F",
"brightRed": "#E74856",
~~~

---

## ٦. اتأكدت إن المثال سليم

حملت المثال بـ [[JSON.parse]] في Node:

~~~text الناتج
valid JSON, top keys: defaultProfile, copyOnSelect, profiles, schemes
defaults keys: font, colorScheme, opacity, useAcrylic, backgroundImage, backgroundImageOpacity, cursorShape, padding, startingDirectory
scheme keys: 21
~~~

21 = [[name]] + [[background]] و [[foreground]] + [[cursorColor]] و [[selectionBackground]] + 16 لون.

---

## ٧. الاختصارات اللي بتفتح الملفات

من [[defaults.json]]:

| الاختصار | بيفتح |
|---|---|
| [[Ctrl+,]] | الإعدادات بالواجهة |
| [[Ctrl+Shift+,]] | [[settings.json]] في المحرر |
| [[Ctrl+Alt+,]] | [[defaults.json]]: أول سطر فيه [[// THIS IS AN AUTO-GENERATED FILE! Changes to this file will be ignored.]] |

---

## الخلاصة

~~~text
defaults.json      القيم الافتراضية، قراية بس
profiles.defaults  إعداداتك لكل البروفايلات
profiles.list      بروفايل واحد، وبيكسب على defaults
schemes            ألوانك، و name = colorScheme
JSON               "مفاتيح" بتنصيص، مفيش فاصلة بعد آخر عنصر، \\ في المسارات
~~~`,
          lines: [
            "بداية الملف.",
            "البروفايل اللي بيفتح الأول: PowerShell 7. لو مش متسطب عندك اكتب [[Windows PowerShell]].",
            "التحديد بالماوس بينسخ على طول، وكليك يمين بيلزق.",
            "بداية البروفايلات.",
            "الإعدادات اللي كل البروفايلات بتاخدها.",
            "الخط (Nerd Font) وحجمه.",
            "مجموعة الألوان اللي معرّفة تحت في schemes.",
            "شفافية: 90 من 100 (100 = مش شفاف).",
            "الجزء الشفاف يبقى مضبب.",
            R`صورة خلفية. كل [[\]] في المسار متكتبة [[\\]].`,
            "الصورة باهتة جدًا عشان الكلام يتقري فوقها.",
            "مؤشر مربع مليان بدل الخط الرفيع.",
            "مسافة 12 شمال ويمين، و 8 فوق وتحت.",
            "التاب الجديد يفتح في فولدر projects جوه الـ home (لازم يكون موجود).",
            "قفلة defaults.",
            "قفلة profiles. الـ list بتاعتك مش في المثال: سيبها في ملفك زي ما هي.",
            "بداية لستة الـ color schemes.",
            "بداية scheme واحدة.",
            "اسمها، وده اللي مكتوب في colorScheme فوق.",
            "لون الخلفية ولون الكلام.",
            "لون المؤشر ولون خلفية الكلام المتحدد.",
            "أول 4 ألوان من الـ 8 العادية.",
            "الـ 4 التانيين.",
            "أول 4 من الفاتحة (bright).",
            "آخر 4.",
            "قفلة الـ scheme.",
            "قفلة اللستة.",
            "آخر الملف."
          ],
          sol: R`أول ما تحفظ (Ctrl+S) الترمنال المفتوح بيتغير من غير restart: الألوان بقت One Half Dark والنافذة شفافة شوية. لما تمسح الفاصلة وتحفظ: بيطلع تحذير [[Failed to reload settings]] وتحته [[Settings could not be reloaded from file. Check for syntax errors, including trailing commas.]]، والترمنال يفضل بالإعدادات اللي كانت قبل الغلطة. رجّع الفاصلة واحفظ، التحذير يروح والتعديل يتطبق.

نصوص التحذيرات دي من ملفات الترجمة بتاعة Windows Terminal نفسه على GitHub، وأسامي المفاتيح ومكان الملف طابقتها مع Microsoft Learn ومع ملف حقيقي على جهاز عليه Windows Terminal 1.24، والمثال اتأكدت إنه JSON سليم. لو كتبت اسم scheme مش موجودة، هيطلع تحذير فيه [[Found a profile with an invalid "colorScheme"]] والبروفايل يرجع للألوان الافتراضية. ولو [[startingDirectory]] لفولدر مش موجود، التاب هيطبع [[Could not access starting directory]] ويفتح في مكان تاني. ولو صورة الخلفية مش موجودة: [[One or more resources (such as icon or backgroundImage) specified in your settings could not be found.]]`
        },
        {
          cmd: "Win+`",
          title: "ترمنال بينزل من فوق الشاشة بزرار (Quake mode)",
          desc: R`[[Win+$__bt]] (الزرار اللي فوق Tab وشمال 1) بيطلّع نافذة Windows Terminal بتنزل من فوق الشاشة وانت في أي برنامج، ونفس الزرار بيخبّيها. الفكرة جاية من كونسول لعبة Quake، وعشان كده اسمها quake mode.

النافذة دي اسمها [[_quake]] وليها قواعد:
• بتلزق في النص اللي فوق من الشاشة، وبتكبّرها أو تصغّرها من الحرف اللي تحت بس.
• مفيهاش شريط تابات ولا title bar (ده اسمه focus mode)، بس جواها تابات و panes عادي: Ctrl+Shift+T تاب جديد، و Ctrl+Tab تتنقل بينهم.
• لما تتخبّى مش بتظهر في الـ taskbar ولا في Alt+Tab، واللي شغال جواها بيفضل شغال.
• نافذة واحدة بس تبقى quake في نفس الوقت.

الاختصار بيشغّل action اسمها [[quakeMode]]، ودي نسخة جاهزة من action تانية اسمها [[globalSummon]] (استدعاء من أي مكان) بالاسم [[_quake]]. «global» يعني الزرار شغال وانت في المتصفح أو VS Code، مش جوه الترمنال بس. وهو متسجّل في الإعدادات الافتراضية كـ [[win+sc(41)]]: [[sc(41)]] يعني scan code رقم 41، يعني مكان الزرار على الكيبورد مش الحرف المكتوب عليه، فبيشتغل حتى والكيبورد عربي (الزرار ده عليه «ذ»).

شرط مهم: الاختصار بيشتغل بس لو فيه نسخة من Windows Terminal شغالة، لأن البرنامج هو اللي بيسجّل الزرار عند ويندوز. لو قفلت كل نوافذه، [[Win+$__bt]] مش هيعمل حاجة. الحل: [[Ctrl+,]] ثم Startup ثم Launch on machine startup، فيقوم مع ويندوز. (في شروحات قديمة هتلاقي مفتاح [[startOnUserLogin]] في الـ JSON: اتشال من نسخة 1.22، وبقى الزرار اللي في الواجهة بيتحكم مباشرة في Startup apps بتاعة ويندوز.)

[[wt -w _quake]] بيفتح نفس النافذة من Win+R أو من أي ترمنال: [[-w]] معناها «اشتغل في النافذة اللي اسمها كده»، ولو موجودة بيفتح فيها تاب جديد.

ولو عايز زرار تاني أو من غير حركة النزول، اعمل action بنفسك في [[settings.json]]: [[globalSummon]] بالاسم [[_quake]]، و [[dropdownDuration]] مدة حركة النزول بالـ milliseconds (0 = تظهر على طول، و quakeMode بيستخدم 200)، و [[toggleVisibility]] بـ [[true]] يخلي نفس الزرار يخبّيها. وبعدين في لستة [[keybindings]] اربط الزرار بالـ [[id]] بتاع الـ action. ومن غير [[name]]، [[globalSummon]] بيجيب آخر نافذة ترمنال عادية استخدمتها، ودي مفيدة لو عايز زرار يجيب الترمنال العادي من أي حتة.`,
          example: R`Win+$__bt                  show / hide the quake window, from any app
wt -w _quake           open the same window from Win+R or a terminal
Ctrl+Shift+T           new tab inside it (tab bar is hidden, Ctrl+Tab switches)
Drag the bottom edge   taller or shorter (width is fixed)
Ctrl+, → Startup → Launch on machine startup → On   so Win+$__bt works right after login
Ctrl+Shift+, → "actions" + "keybindings"           your own globalSummon key (solution below)`,
          try: R`دوس [[Win+$__bt]] وانت في المتصفح، واكتب أمر، ودوسه تاني تختفي. وبعدين اعمل اختصار Ctrl+Alt+T (زي أوبونتو) يجيب نفس النافذة من غير حركة النزول.`,
          flag: "keys",
          deep: {
            why: "بتحتاج ترمنال لأمر سريع ([[git status]]، أو [[ping]]، أو تشوف مين ماسك بورت) وانت في المتصفح أو VS Code. بدل ما تدوّر على نافذة الترمنال وسط عشر نوافذ، زرار واحد ينزّلها فوق اللي انت فيه، ونفس الزرار يرجّعك مكانك.",
            how: R`Windows Terminal بيسجّل الاختصار عند ويندوز بـ [[RegisterHotKey]]، فويندوز بيبعتله الزرار حتى لو برنامج تاني هو اللي قدامك. عشان كده لازم يكون شغال، ولو برنامج تاني سجّل نفس الزرار قبله، الترمنال مش هيقدر ياخده. ولو عندك نسخة أدمن ونسخة عادية (أو Stable و Preview) شغالين، أول واحدة فتحت هي اللي بتاخد الزرار.

[[quakeMode]] نفسها مجرد [[globalSummon]] بالقيم دي: [[name]] = [[_quake]]، و [[dropdownDuration]] = 200، و [[toggleVisibility]] = [[true]]، و [[monitor]] = [[toMouse]] (تنزل على الشاشة اللي فيها الماوس)، و [[desktop]] = [[toCurrent]] (تيجي على الـ virtual desktop اللي انت عليه). والاسم [[_quake]] محجوز: أي نافذة بالاسم ده بتاخد سلوك الـ quake.`,
            when: "لو بتفتح الترمنال عشرين مرة في اليوم لأوامر قصيرة. ولو بتشتغل على أكتر من شاشة: النافذة بتنزل على الشاشة اللي فيها الماوس.",
            mistakes: R`تقفل كل نوافذ Windows Terminal وتستغرب إن [[Win+$__bt]] مبيعملش حاجة. أو تفتح نافذة [[_quake]] بـ [[wt -w _quake]] وانت شايل الاختصار، وبعدين تصغّرها: مش هتلاقيها في الـ taskbar ولا Alt+Tab، والحل Task Manager. أو تدوّر على [[startOnUserLogin]] في الـ JSON زي الشروحات القديمة: اتشال، والإعداد بقى في الواجهة بس. أو تختار لـ globalSummon زرار بتستخدمه في برنامج تاني: طول ما الترمنال شغال، الزرار ده مش هيوصل للبرنامج التاني.`
          },
          teach: R`## الاختصار ده بيعمل إيه

[[Win+$__bt]] بيطلّع نافذة Windows Terminal خاصة اسمها [[_quake]] من فوق الشاشة وانت في أي برنامج، ونفس الزرار يخبّيها. هنشوف هو متعرّف فين في [[defaults.json]]، وبعدين سطور المثال، وبعدين الـ solCode اللي بيعمل اختصار بتاعك. الضغط على الاختصار نفسه وفتح نوافذ متجربش هنا، الكلام من صفحة Actions على Microsoft Learn، و [[defaults.json]] اتقرا من Windows Terminal 1.24.

---

## ١. الاختصار متعرّف فين؟

في [[defaults.json]] فيه سطرين:

~~~text من defaults.json (Windows Terminal 1.24)
{ "command": "quakeMode", "id": "Terminal.QuakeMode" },
...
{ "keys": "win+sc(41)", "id": "Terminal.QuakeMode" },
~~~

- الأول **action**: حاجة الترمنال يقدر يعملها ([[quakeMode]]) وليها [[id]] (اسم فريد).
- التاني **keybinding**: بيربط زراير بالـ [[id]] ده.
- [[win+sc(41)]]: Win مع الزرار اللي **scan code** بتاعه 41. الـ scan code رقم مكان الزرار على الكيبورد مش الحرف المكتوب عليه، فبيشتغل والكيبورد عربي (الزرار عليه «ذ») أو فرنساوي.

الفصل ده بين action و keybinding هو اللي هنستخدمه في الـ solCode.

---

## ٢. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Win+$__bt]] | يطلّع أو يخبّي نافذة [[_quake]] من أي برنامج |
| [[wt -w _quake]] | نفس النافذة بأمر |
| [[Ctrl+Shift+T]] | تاب جديد جواها (شريط التابات مخفي) |
| سحب الحرف اللي تحت | تطوّلها أو تقصّرها، والعرض ثابت |
| [[Ctrl+,]] ← Startup ← Launch on machine startup | الترمنال يقوم مع ويندوز |
| [[Ctrl+Shift+,]] ← [["actions"]] و [["keybindings"]] | اختصارك انت (الـ solCode) |

### [[wt -w _quake]]

| الحتة | معناها |
|---|---|
| [[wt]] | Windows Terminal من سطر الأوامر |
| [[-w]] | window: اشتغل في نافذة بالاسم ده |
| [[_quake]] | الاسم المحجوز لنافذة الـ quake |

لو النافذة موجودة بيفتح فيها تاب جديد، ولو مش موجودة بيعملها.

### ليه Launch on machine startup؟

الاختصار بيتسجّل عند ويندوز من البرنامج نفسه وهو شغال. لو مفيش نافذة Windows Terminal مفتوحة، مفيش حد ماسك الزرار، فـ [[Win+$__bt]] مش هيعمل حاجة.

---

## ٣. الـ solCode: اختصار Ctrl+Alt+T

~~~text
"actions": [
    { "command": { "action": "globalSummon", "name": "_quake", "dropdownDuration": 0 }, "id": "User.QuakeNoAnim" }
],
"keybindings": [
    { "keys": "ctrl+alt+t", "id": "User.QuakeNoAnim" }
]
~~~

### الجزء الأول: الـ action

| المفتاح | القيمة | معناها |
|---|---|---|
| [[command]] | object | الأمر وخصائصه، لأن [[globalSummon]] محتاج خصائص (في defaults.json كان نص بس: [["quakeMode"]]) |
| [[action]] | [["globalSummon"]] | استدعي نافذة من أي برنامج (global = الزرار شغال برّه الترمنال) |
| [[name]] | [["_quake"]] | أنهي نافذة: الاسم المحجوز، فتاخد سلوك الـ quake |
| [[dropdownDuration]] | [[0]] | مدة حركة النزول بالـ milliseconds، و 0 = تظهر على طول |
| [[id]] | [["User.QuakeNoAnim"]] | اسم فريد انت بتختاره. [[User.]] في الأول عادة الترمنال للـ actions بتاعتك |

### الجزء التاني: الزرار

| المفتاح | القيمة | معناها |
|---|---|---|
| [[keys]] | [["ctrl+alt+t"]] | الزراير بحروف صغيرة وبينهم [[+]] |
| [[id]] | [["User.QuakeNoAnim"]] | نفس الـ id اللي فوق بالظبط، وده اللي بيربطهم |

ده مش ملف كامل: دول عنصرين تحطهم جوه اللستتين اللي موجودين أصلًا في ملفك (في ملف جديد [[actions]] لستة فاضية). حطيت الاتنين جوه [[{ }]] وحملتهم بـ [[JSON.parse]] في Node، وطلعوا سليمين:

~~~text الناتج
{"actions":[{"command":{"action":"globalSummon","name":"_quake","dropdownDuration":0},"id":"User.QuakeNoAnim"}],"keybindings":[{"keys":"ctrl+alt+t","id":"User.QuakeNoAnim"}]}
~~~

### [[quakeMode]] نفسها إيه؟

حسب Microsoft Learn، [[quakeMode]] اختصار لـ [[globalSummon]] بالقيم دي: [[name]] = [["_quake"]]، و [[dropdownDuration]] = 200، و [[toggleVisibility]] = [[true]] (نفس الزرار يخبّي). اللي احنا غيّرناه هو 200 بقت 0.

---

## الخلاصة

~~~text
win+sc(41)         Win + الزرار اللي فوق Tab، بمكانه مش بحرفه
_quake             اسم محجوز: فوق الشاشة، مخفية من الـ taskbar
actions + keybindings   action ليها id، والزرار بيشاور على الـ id
الترمنال لازم يكون شغال   عشان كده Launch on machine startup
~~~`,
          lines: [
            "اطلّع النافذة من أي برنامج، ودوسه تاني يخبّيها. لازم Windows Terminal يكون شغال.",
            R`نفس النافذة بأمر: [[-w _quake]] يعني «في النافذة اللي اسمها _quake»، ولو موجودة بيفتح فيها تاب جديد.`,
            "تاب جديد جواها. شريط التابات مخفي، فبتتنقل بـ Ctrl+Tab.",
            "الحرف اللي تحت بس هو اللي بيتسحب، والعرض ثابت على عرض الشاشة.",
            "خلّي الترمنال يقوم مع ويندوز، فالاختصار يشتغل من أول ما تفتح الجهاز.",
            "زرار تاني أو من غير حركة: action من نوع globalSummon في settings.json (الحل تحت)."
          ],
          sol: R`[[Win+$__bt]] من المتصفح: النافذة بتنزل من فوق وبتاخد نص الشاشة اللي فوق، وفيها البروفايل الافتراضي. اكتب [[git status]] مثلًا، ودوس [[Win+$__bt]] تاني: بتطلع لفوق وتختفي، ومش هتلاقيها في الـ taskbar. ودوسه تاني هترجع بنفس اللي كان فيها.

للاختصار الجديد: [[Ctrl+Shift+,]] وضيف العنصر اللي جوه [["actions"]] تحت للستة [["actions"]] اللي في ملفك، واللي جوه [["keybindings"]] للستة [["keybindings"]] (بفاصلة بينه وبين اللي قبله لو اللستة مش فاضية)، واحفظ. بعدها Ctrl+Alt+T من أي برنامج يجيب نفس النافذة على طول من غير حركة. لو مشتغلش، اقفل الترمنال كله وافتحه، ولو برضه لأ جرّب زرار تاني: ممكن برنامج تاني ماسكه.

أسامي الـ actions والخصائص من صفحة Actions على Microsoft Learn، والاختصار الافتراضي [[win+sc(41)]] لقيته في [[defaults.json]] بتاع Windows Terminal 1.24، وإن [[startOnUserLogin]] اتشال لقيته في كود Windows Terminal على GitHub (موجود في 1.21 ومش موجود من 1.22). مجربتش الضغط على الاختصار نفسه هنا. لو [[Win+$__bt]] معملش حاجة: Windows Terminal مش شغال، أو برنامج تاني ماسك الزرار، أو فيه نسخة أدمن شغالة خدت الزرار قبل العادية.`,
          solCode: R`"actions": [
    { "command": { "action": "globalSummon", "name": "_quake", "dropdownDuration": 0 }, "id": "User.QuakeNoAnim" }
],
"keybindings": [
    { "keys": "ctrl+alt+t", "id": "User.QuakeNoAnim" }
]`
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
          teach: R`## الحاجة دي بتعمل إيه

Custom Shortcuts في أوبونتو بيربط زراير بأمر: تدوس Ctrl+Alt+M يفتح ترمنال في مشروعك. كل اختصار ٣ حاجات: اسم، وأمر، وزراير. الخطوات في Settings من دليل GNOME (مفيش واجهة هنا)، وجزء [[~]] اتجرب في أوبونتو 24.04 جوه Docker.

---

## ١. المكان

[[Settings → Keyboard → View and Customize Shortcuts → Custom Shortcuts]]. ومن الترمنال بيوصلك قريب منها [[gnome-control-center keyboard]] (درس فات).

---

## ٢. خانات الاختصار

| الخانة | في المثال | معناها |
|---|---|---|
| Name | [[myapp terminal]] | أي اسم يفكّرك، مالوش تأثير |
| Command | [[gnome-terminal --working-directory=/home/you/projects/myapp]] | الأمر اللي بيتشغّل |
| Shortcut | [[Ctrl+Alt+M]] | تدوس Set Shortcut وبعدين الزراير نفسها |

### الأمر: [[gnome-terminal --working-directory=...]]

- [[gnome-terminal]] برنامج الترمنال.
- [[--working-directory=]] اختيار معناه «افتح الشيل في الفولدر ده» بدل الهوم. القيمة لازقة فيه بـ [[=]].
- [[/home/you/projects/myapp]] مسار كامل يبدأ بـ [[/]]. غيّر [[you]] لاسم اليوزر بتاعك.

والسطر التاني في المثال: Name [[Task manager]]، و Command [[gnome-system-monitor]]، و Shortcut [[Ctrl+Shift+Esc]]، زي ويندوز بالظبط.

---

## ٣. ليه المسار كامل ومش [[~]]؟

الأمر بيتشغّل **من غير shell**. والـ shell هو اللي بيحوّل [[~]] و [[$HOME]] لمسار الهوم. من غيره، البرنامج بيستلم الحرف [[~]] زي ما هو. ده نفس اللي بيحصل لما Docker يشغّل أمر من غير shell، جرّبته:

~~~bash
docker run --rm ubuntu:24.04 ls '~/projects'
docker run --rm ubuntu:24.04 echo '$HOME'
~~~

~~~text الناتج
ls: cannot access '~/projects': No such file or directory
$HOME
~~~

[[ls]] دوّر على فولدر اسمه حرفيًا [[~]]، و [[echo]] طبع [[$HOME]] كنص. ولما بنحط shell في النص:

~~~bash
docker run --rm ubuntu:24.04 sh -c 'echo $HOME; cd ~ && pwd'
~~~

~~~text الناتج
/root
/root
~~~

ده بالظبط آخر سطر في المثال: [[sh -c "code $HOME/projects/myapp"]]. [[sh]] هو الـ shell، و [[-c]] معناها «نفّذ النص ده كأمر»، فجوه النص [[$HOME]] بيتفك (في الكونتينر الهوم [[/root]] لأن اليوزر root).

---

## الخلاصة

~~~text
Name / Command / Shortcut   اسم، أمر، زراير
Command من غير shell        ~ و $HOME و | و && مش بيشتغلوا
الحل                        مسار كامل، أو sh -c "..."
~~~`,
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
          teach: R`## الأمر ده بيعمل إيه

GNOME شايل كل إعداداته كمفاتيح وقيم في قاعدة بيانات اسمها **dconf**، و [[gsettings]] أداة الترمنال اللي بتقرا وتكتب فيها. كل الأوامر اتجربت في أوبونتو 24.04 جوه Docker، بعد ما سطّبت الـ schemas بتاعة GNOME وشغّلت dbus (من غير واجهة، فالتغيير بيتكتب ومفيش شاشة تتغير).

---

## ١. تركيب أي أمر

~~~bash
gsettings get org.gnome.desktop.interface color-scheme
~~~

| الحتة | معناها |
|---|---|
| [[gsettings]] | الأداة (GNOME settings) |
| الفعل | [[get]] اقرا، [[set]] اكتب، [[reset]] رجّع الافتراضي، [[list-keys]] اعرض المفاتيح |
| **schema** | مجموعة مفاتيح ليها اسم بنقط زي اسم package: [[org.gnome.desktop.interface]] إعدادات شكل الواجهة |
| المفتاح | إعداد واحد جوه الـ schema |

---

## ٢. [[get]]: اقرا

~~~bash
gsettings get org.gnome.desktop.interface color-scheme
~~~

~~~text الناتج
'default'
~~~

[[' ']] حوالين القيمة معناها إنها نص. والقيم المسموحة للمفتاح ده تعرفها بـ [[range]]:

~~~bash
gsettings range org.gnome.desktop.interface color-scheme
~~~

~~~text الناتج
enum
'default'
'prefer-dark'
'prefer-light'
~~~

[[enum]] يعني لستة قيم ثابتة، ومينفعش غيرها. لو كتبت [[dark]] بدل [[prefer-dark]]:

~~~text الناتج
The provided value is outside of the valid range
~~~

---

## ٣. [[set]]: اكتب

~~~bash
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
gsettings get org.gnome.desktop.interface color-scheme
~~~

~~~text الناتج
'prefer-dark'
~~~

[[set]] مبيطبعش حاجة لو نجح. والقيمة بين [[' ']] عشان الشيل يبعتها كلمة واحدة زي ما هي (هنا كانت هتشتغل من غيرها، بس مع قيم فيها مسافات أو أقواس لازم).

### سطر الـ dock

~~~bash
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
~~~

[[org.gnome.shell.extensions.dash-to-dock]] إعدادات الـ dock اللي على جنب الشاشة في أوبونتو (هو إضافة اسمها Dash to Dock). [[click-action]] اللي بيحصل لما تدوس على أيقونة برنامج مفتوح، و [[minimize]] يصغّره زي ويندوز. القيمة الافتراضية في الكونتينر كانت [['cycle-windows']] (من غير باقي إعدادات أوبونتو، فعلى جهاز أوبونتو حقيقي ممكن تلاقيها غير كده)، و [[range]] بيعرض ١٣ قيمة منها [['minimize']] و [['previews']] و [['focus-or-previews']].

---

## ٤. [[reset]]: رجّع الافتراضي

~~~bash
gsettings set org.gnome.mutter center-new-windows true
gsettings get org.gnome.mutter center-new-windows
gsettings reset org.gnome.mutter center-new-windows
gsettings get org.gnome.mutter center-new-windows
~~~

~~~text الناتج
true
false
~~~

[[mutter]] هو الـ window manager بتاع GNOME (اللي بيرسم ويحرّك النوافذ). [[true]] و [[false]] من غير تنصيص لأنها boolean. و [[reset]] رجّعها [[false]].

---

## ٥. [[list-keys]]: إيه المتاح؟

~~~bash
gsettings list-keys org.gnome.mutter
~~~

~~~text الناتج
attach-modal-dialogs
auto-maximize
center-new-windows
check-alive-timeout
draggable-border-width
dynamic-workspaces
edge-tiling
experimental-features
focus-change-on-pointer-rest
locate-pointer-key
overlay-key
workspaces-only-on-primary
~~~

ولو عايز تعرف مفتاح بيعمل إيه: [[gsettings describe org.gnome.mutter center-new-windows]] طبع [[When true, the new windows will always be put in the center of the active screen of the monitor.]]

---

## ٦. الأخطاء

| الرسالة | السبب |
|---|---|
| [[No such schema “org.gnome.nope”]] | الـ schema مش موجودة: غلط في الاسم، أو البرنامج بتاعها مش متسطب |
| [[No such key “nope”]] | الـ schema صح بس المفتاح غلط |
| [[failed to commit changes to dconf: Cannot autolaunch D-Bus without X11 $DISPLAY]] | [[set]] من غير جلسة desktop (زي ssh أو كونتينر): القراية تشتغل والكتابة لأ |

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[gsettings get S K]] | اقرا |
| [[gsettings set S K V]] | اكتب، ويسري على طول |
| [[gsettings reset S K]] | رجّع الافتراضي |
| [[gsettings list-keys S]] | المفاتيح المتاحة |
| [[gsettings range S K]] | القيم المسموحة |`,
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
          teach: R`## الحاجة دي بتعمل إيه

الماك فيه أمر جاهز في Finder يفتح Terminal على الفولدر اللي انت واقف عليه، بس مقفول افتراضيًا. مفيش ماك هنا، فالخطوات من دليل Apple (Mac User Guide، Keyboard Shortcuts و Services).

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| System Settings ← Keyboard ← Keyboard Shortcuts ← Services | صفحة الـ Services |
| Files and Folders ← علّم على New Terminal at Folder / New Terminal Tab at Folder | فعّل الأمرين (نافذة جديدة، أو تاب جديد) |
| كليك يمين على فولدر ← Services ← New Terminal at Folder | الاستخدام |
| اسحب الفولدر على أيقونة Terminal في الـ Dock | من غير أي إعداد |
| Keyboard Shortcuts ← App Shortcuts ← [[+]] | اختصار لأي أمر في قايمة أي برنامج |

---

## ٢. يعني إيه Services؟

**Services** أوامر عامة بتشتغل على الحاجة اللي انت محددها: نص، أو ملف، أو فولدر. «Files and Folders» معناها الأوامر اللي بتشتغل لما المحدد فولدر أو ملف. عشان كده لازم الكليك يمين يبقى على الفولدر نفسه.

Terminal هيفتح والشيل واقف جوه الفولدر، كأنك كتبت [[cd]] للمسار:

~~~zsh
pwd
~~~

[[pwd]] (print working directory) بيطبع الفولدر الحالي، زي [[/Users/you/projects/myapp]].

---

## ٣. App Shortcuts

| الخانة | تكتب فيها |
|---|---|
| Application | البرنامج (أو All Applications) |
| Menu Title | اسم الأمر **بالظبط** زي ما هو في القايمة، حتى «...» |
| Keyboard Shortcut | الزراير |

---

## الخلاصة

~~~text
Services → Files and Folders   فعّل New Terminal at Folder
كليك يمين على الفولدر نفسه     مش على مساحة فاضية
اسحب على Terminal في الـ Dock   من غير إعداد
open .                          العكس: من الترمنال لـ Finder
~~~`,
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
          teach: R`## الأوامر دي بتعمل إيه

أمر [[defaults]] بيكتب ويقرا إعدادات برامج الماك. هنا بنقفل قايمة الحروف المشكّلة (é ê ë) في VS Code فالزرار يتكرر، وبنسرّع التكرار. مفيش ماك هنا، فالشرح من [[man defaults]] ومن دليل Apple.

---

## ١. تركيب الأمر

~~~zsh
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
~~~

| الحتة | معناها |
|---|---|
| [[defaults]] | أداة إعدادات البرامج في الماك |
| [[write]] | اكتب (و [[read]] اقرا، و [[delete]] امسح) |
| [[com.microsoft.VSCode]] | الـ **domain**: اسم البرنامج بالشكل ده (bundle identifier) |
| [[ApplePressAndHoldEnabled]] | المفتاح: «الضغط المطوّل يطلّع قايمة الحروف» |
| [[-bool false]] | نوع القيمة (boolean) وقيمتها: اقفلها |

الإعداد بيتحفظ في ملف [[.plist]] بتاع البرنامج في [[~/Library/Preferences]]، والبرنامج بيقراه لما يفتح، عشان كده لازم Cmd+Q وتفتحه.

---

## ٢. سرعة التكرار

~~~zsh
defaults write -g KeyRepeat -int 2
defaults write -g InitialKeyRepeat -int 15
~~~

| الحتة | معناها |
|---|---|
| [[-g]] | global: النظام كله (اسمه NSGlobalDomain) بدل برنامج واحد |
| [[KeyRepeat]] | الوقت بين كل تكرار والتاني. أصغر = أسرع |
| [[InitialKeyRepeat]] | المدة قبل ما التكرار يبدأ. أصغر = يبدأ أسرع |
| [[-int]] | القيمة رقم صحيح (integer) |

2 و 15 أسرع قيم في سلايدرات System Settings ← Keyboard. ودول محتاجين log out وتدخل تاني.

---

## ٣. الرجوع: [[defaults delete]]

~~~zsh
defaults delete com.microsoft.VSCode ApplePressAndHoldEnabled
~~~

[[delete]] بيشيل المفتاح خالص، فالبرنامج يرجع للقيمة الافتراضية (القايمة تظهر تاني). ده أنضف من إنك تكتب [[true]]. ولو عايز تشوف القيمة الحالية: [[defaults read com.microsoft.VSCode ApplePressAndHoldEnabled]] بيطبع [[0]] (يعني false).

---

## الخلاصة

~~~text
defaults write <domain> <key> -<type> <value>   اكتب إعداد
com.microsoft.VSCode     VS Code بس (أنضف)
-g                       النظام كله
defaults delete          رجّع الافتراضي
Cmd+Q / log out          عشان التغيير يسري
~~~`,
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
]);
