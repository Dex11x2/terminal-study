// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "تشغيل و Debug بملف",
      l: 3,
      n: "launch.json و tasks.json: الـ debug والأوامر المتكررة بضغطة، ومتسجلة في الـ repo",
      items: [
        {
          cmd: "launch.json",
          title: "debug لسيرفر Node بـ F5، أو اتصل بواحد شغال",
          desc: R`[[.vscode/launch.json]] فيه طرق التشغيل بالـ debugger، وتختار واحدة من Run and Debug (Ctrl+Shift+D) و F5. الأولى هنا بتشغّل [[npm run dev]] بالـ debugger، والتانية بتتصل بعملية Node شغالة أصلًا بـ [[--inspect]] (محلي أو جوه Docker).

من غير الملف ده، JavaScript Debug Terminal (مستوى ٢) أسرع. الملف مفيد لما التشغيل محتاج إعدادات، أو عايز الفريق كله يعمل debug بنفس الطريقة.`,
          example: R`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "API: npm run dev", "type": "node", "request": "launch",
      "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "console": "integratedTerminal"
    },
    {
      "name": "Attach 9229 (Docker)", "type": "node", "request": "attach",
      "port": 9229, "restart": true,
      "localRoot": "$__{workspaceFolder}", "remoteRoot": "/app"
    }
  ]
}`,
          try: "انسخ الإعداد الأول لمشروع Express عندك، وحط breakpoint في route، وشغّل F5 من Run and Debug.",
          flag: "script",
          deep: {
            why: "كل مرة تعمل debug بتفتكر الأمر والـ flags. الملف بيحفظهم، وأي حد في الفريق يدوس F5 ويشتغل.",
            how: R`[[type]] بيحدد الـ debugger (node للسيرفر، و chrome أو msedge للمتصفح). و [[request]] يا launch (VS Code يشغّل البرنامج) يا attach (يتصل بواحد شغال).

[[runtimeExecutable]] مع [[runtimeArgs]] بيشغّل npm script بدل ملف معين، فأي حاجة السكربت بيعملها (tsx، nodemon، متغيرات بيئة) بتفضل زي ما هي، والـ debugger بيتربط بعمليات Node اللي بتتولد.

في الـ attach لـ container: الكود جوه في [[/app]] وعندك في فولدر المشروع، و [[localRoot]] و [[remoteRoot]] بيربطوا المسارين عشان الـ breakpoints تقف صح. و [[restart]] بيعيد الاتصال لو nodemon عمل restart.

[[$__{workspaceFolder}]] بيتبدل بفولدر المشروع وقت التشغيل. و Ctrl+Space جوه الملف بيقترح الـ properties، وزرار Add Configuration بيحط قوالب جاهزة.`,
            when: "مشروع بتعمل فيه debug كتير، أو محتاج attach لـ Docker، أو عايز الفريق يبدأ debug بنفس الطريقة.",
            mistakes: "الـ breakpoints رمادي في الـ attach لـ Docker لأن [[remoteRoot]] غلط، أو لأن [[--inspect]] بيسمع على 127.0.0.1 جوه الـ container فمش واصل (لازم 0.0.0.0، تاب node). و [[--inspect]] على بورت مفتوح في الإنتاج: أي حد يتصل يقدر ينفّذ كود."
          },
          lines: [
            "بداية الملف.",
            "نسخة شكل الملف، سيبها زي ما هي.",
            "لستة طرق التشغيل، كل واحدة بتظهر في القايمة.",
            "الأولى:",
            "اسمها في القايمة، و debugger بتاع Node، و VS Code هو اللي يشغّل.",
            "شغّل npm run dev بدل ملف معين.",
            "F11 ميدخلش جوه Node نفسه أو node_modules.",
            "الـ output في الترمنال المدمج.",
            "نهاية الأولى.",
            "التانية:",
            "اتصل بعملية شغالة بدل ما تشغّل واحدة.",
            "على بورت 9229، ولو العملية عملت restart اتصل تاني.",
            "الكود عندك في فولدر المشروع، وجوه الـ container في /app.",
            "نهاية التانية.",
            "نهاية اللستة.",
            "نهاية الملف."
          ],
          sol: R`F5 على «API: npm run dev» هيشغّل [[npm run dev]] في الترمنال المدمج والـ debugger متوصل. اطلب الـ route من المتصفح أو curl، والكود هيقف على الـ breakpoint، والـ variables هتظهر في الشمال.

لو السيرفر شغال من nodemon أو tsx watch، ده مش مشكلة: الـ debugger بيتوصل بالعمليات الفرعية لوحده. ولو الـ breakpoint رمادي (Unbound)، غالبًا TypeScript من غير source maps أو السيرفر بيشغّل نسخة متبنية. ولو قال [[Port 3000 in use]]، يبقى فيه نسخة تانية من السيرفر شغالة في ترمنال تاني، اقفلها الأول.`
        },
        {
          cmd: "launch.json لـ Next.js",
          title: "debug للسيرفر والمتصفح في Next.js",
          desc: R`Next.js فيه كود بيشتغل على السيرفر (Server Components و route handlers و server actions) وكود بيشتغل في المتصفح. الإعداد الأول بيشغّل [[npm run dev -- --inspect]] وبيقف في كود السيرفر، والتاني بيفتح Chrome متوصل بالـ debugger فبيقف في كود المتصفح. و [[compounds]] بيشغّل الاتنين بضغطة.

الإعدادات دي مبنية على توثيق Next.js نفسه. ولو المشروع في monorepo، ضيف [["cwd": "$__{workspaceFolder}/apps/web"]] للأولى.`,
          example: R`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: server", "type": "node-terminal", "request": "launch",
      "command": "npm run dev -- --inspect"
    },
    {
      "name": "Next.js: client", "type": "chrome", "request": "launch",
      "url": "http://localhost:3000"
    }
  ],
  "compounds": [{ "name": "Next.js: both", "configurations": ["Next.js: server", "Next.js: client"] }]
}`,
          try: "في مشروع Next.js: حط breakpoint في route handler وواحد في onClick في component، وشغّل Next.js: both، وجرّب الاتنين.",
          flag: "script",
          deep: {
            why: "console.log في Next.js بيطلع مرة في الترمنال ومرة في المتصفح، ومش واضح الكود ده بيتنفذ فين. الـ debugger بيقف في الناحيتين.",
            how: R`[[node-terminal]] بيفتح ترمنال debug ويشغّل الأمر فيه، زي JavaScript Debug Terminal بالظبط بس محفوظ. والـ [[--]] في [[npm run dev -- --inspect]] بتعدّي [[--inspect]] لـ next مش لـ npm.

[[chrome]] بيفتح نسخة Chrome منفصلة متوصلة بـ VS Code، والـ breakpoints في ملفات [[.tsx]] بتقف في المتصفح بفضل الـ source maps. لو بتستخدم Edge: [["type": "msedge"]].

لو غيّرت البورت، غيّر 3000 في الـ url.`,
            when: "bug في Next.js ومش عارف هو في السيرفر ولا المتصفح، أو server action بتعمل حاجة غريبة.",
            mistakes: R`breakpoint في Server Component وانت شغال بإعداد المتصفح بس فمش بيقف، أو العكس. اعرف الكود بيتنفذ فين الأول: [["use client"]] في أول الملف معناه متصفح. وبورت 3000 مشغول فـ Next يقوم على 3001، والمتصفح المتوصل بيفتح 3000 الغلط.`
          },
          lines: [
            "بداية الملف.",
            "نسخة شكل الملف.",
            "الإعدادات:",
            "الأولى:",
            "كود السيرفر: ترمنال debug.",
            "بيشغّل الـ dev server بـ --inspect.",
            "نهاية الأولى.",
            "التانية:",
            "كود المتصفح: Chrome متوصل بالـ debugger.",
            "على عنوان الـ dev server.",
            "نهاية التانية.",
            "نهاية الإعدادات.",
            "الاتنين مع بعض بضغطة F5 واحدة.",
            "نهاية الملف."
          ],
          sol: R`«Next.js: both» هيشغّل السيرفر بـ [[--inspect]] في ترمنال ويفتح نافذة Chrome جديدة على [[localhost:3000]]. الطلب للـ route handler هيقف عند الـ breakpoint بتاع السيرفر، ودوسة الزرار في Chrome ده هتقف عند الـ breakpoint بتاع [[onClick]]، والاتنين في VS Code.

لو breakpoint الـ client مابقفش، اتأكد إنك دوست الزرار في نافذة Chrome اللي VS Code فتحها، مش المتصفح العادي بتاعك. ولو السيرفر قال إن [[--inspect]] مش معروف، النسخة قديمة. شوف توثيق Next.js للـ debugging للنسخة بتاعتك (النسخ الحديثة بتدعم [[next dev --inspect]]). ولو Chrome مش متسطب، غيّر [[type]] لـ [[msedge]].`
        },
        {
          cmd: "tasks.json",
          title: "شغّل أوامر المشروع بضغطة والأخطاء تروح Problems",
          desc: R`[[.vscode/tasks.json]] بيحوّل أوامر المشروع لـ tasks تشغّلها من Terminal ثم Run Task، أو Ctrl+Shift+B للـ default build task. والأهم: الـ problem matcher بيقرا output الأمر ويحط الأخطاء في لوحة Problems، والكليك بيوديك للسطر.

هنا [[typecheck]] على المشروع كله هو الـ build الافتراضي، فـ Ctrl+Shift+B بيطلّع كل أخطاء TypeScript في كل الملفات، مش المفتوحة بس.`,
          example: R`// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "typecheck", "type": "npm", "script": "typecheck",
      "problemMatcher": "$tsc",
      "group": { "kind": "build", "isDefault": true }
    },
    {
      "label": "lint", "type": "npm", "script": "lint",
      "problemMatcher": "$eslint-stylish"
    }
  ]
}`,
          try: "ضيف الملف ده (والسكربتات typecheck و lint في package.json)، واضغط Ctrl+Shift+B، وبص على Problems.",
          flag: "script",
          deep: {
            why: "لوحة Problems بتعرض أخطاء الملفات المفتوحة بس، و [[tsc]] في ترمنال عادي بيطبع نص طويل.",
            how: R`[["type": "npm"]] مع [[script]] بيشغّل [[npm run typecheck]]. [[problemMatcher]] بيقول لـ VS Code يقرا الـ output بأنهي شكل: [[$tsc]] لأخطاء TypeScript، و [[$eslint-stylish]] (من ESLint extension) لـ ESLint.

[[group]] build مع [[isDefault]] بيخليها هي اللي بتشتغل بـ Ctrl+Shift+B (Shift+Cmd+B على الماك). ولو فيه أكتر من task، Run Task بيعرضهم كلهم.

وتقدر تديها اختصار خاص في keybindings.json، أو تخليها تشتغل قبل الـ debug بـ [[preLaunchTask]] في launch.json.`,
            when: "أي أمر بتشغّله كتير ومحتاج تشوف أخطاؤه: typecheck، و lint، و build، و generate.",
            mistakes: R`task لـ dev server من غير [["isBackground": true]] ومن غير problem matcher يعرف إمتى السيرفر قام، فالـ preLaunchTask يفضل مستني للأبد. و [["problemMatcher": []]] بيقفل القراية خالص: كويس لأمر ملوش أخطاء، وحش لـ typecheck.`
          },
          lines: [
            "بداية الملف.",
            "نسخة شكل الملف.",
            "الـ tasks:",
            "الأولى:",
            "اسمها typecheck، وبتشغّل npm run typecheck.",
            "اقرا الأخطاء بشكل tsc وحطها في Problems.",
            "هي الـ build الافتراضي (Ctrl+Shift+B).",
            "نهاية الأولى.",
            "التانية:",
            "npm run lint.",
            "اقرا أخطاء ESLint بالشكل الافتراضي بتاعه.",
            "نهاية التانية.",
            "نهاية اللستة.",
            "نهاية الملف."
          ],
          sol: R`Ctrl+Shift+B هيشغّل typecheck على طول (لأنه [[isDefault]])، والناتج في ترمنال. لو فيه أغلاط، هتظهر في Problems (Ctrl+Shift+M) لكل ملفات المشروع مش المفتوحة بس، ودوسة على غلط تفتحه على السطر. للـ lint: Palette ثم «Tasks: Run Task» ثم lint.

لو الأغلاط ظهرت في الترمنال ومش في Problems، يبقى الـ problemMatcher مش فاهم شكل الناتج: [[$tsc]] لـ tsc، و [[$eslint-stylish]] محتاج ESLint يطبع بالـ formatter الافتراضي (stylish)، لو بتستخدم [[--format]] تاني مش هيفهمه. ولو قال «npm script typecheck not found»، ضيف السكربت في package.json، زي [["typecheck": "tsc --noEmit"]].`
        }
      ]
    },
    {
      t: "المحرر على مقاسك",
      l: 3,
      n: "اختصاراتك وقوالبك، وإعدادات منفصلة لكل نوع شغل ومتزامنة على كل أجهزتك",
      items: [
        {
          cmd: "keybindings.json",
          title: "اعمل اختصار لأي أمر، أو غيّر اختصار موجود",
          desc: R`Ctrl+K Ctrl+S بيفتح Keyboard Shortcuts: دوّر على أمر، ودبل كليك، واضغط الاختصار الجديد. كليك يمين على اختصار ثم Show Same Keybindings بيوريك لو فيه تعارض. والأيقونة فوق (Open Keyboard Shortcuts JSON) بتفتح الملف، وفيه تقدر تدّي الأمر [[args]] وشرط [[when]].

الملف ده بتاعك انت (User)، مش جوه المشروع.`,
          example: R`// keybindings.json (Ctrl+K Ctrl+S, then the file icon at the top)
[
  { "key": "ctrl+alt+r", "command": "workbench.action.terminal.runSelectedText", "when": "editorTextFocus" },
  { "key": "ctrl+shift+alt+t", "command": "workbench.action.tasks.runTask", "args": "typecheck" },
  { "key": "ctrl+alt+m", "command": "workbench.action.toggleMaximizedPanel" }
]`,
          try: "اعمل اختصار لـ Run Selected Text، وحدد سطر [[npm run build]] في README ودوسه.",
          flag: "script",
          deep: {
            why: "أمر بتستخدمه ١٠ مرات في اليوم ملوش اختصار، أو اختصار بيتعارض مع برنامج تاني.",
            how: R`كل entry فيها [[key]] و [[command]]، والـ ID بتاع الأمر بتلاقيه في Keyboard Shortcuts بكليك يمين ثم Copy Command ID. [[when]] بيحدد إمتى الاختصار يشتغل: [[editorTextFocus]] وانت في الكود، و [[terminalFocus]] وانت في الترمنال. فنفس المفتاح ممكن يعمل حاجتين في مكانين.

[[args]] بتبعت قيمة للأمر: اسم task، أو نص يتبعت للترمنال بـ [[workbench.action.terminal.sendSequence]] و [["args": { "text": "npm test\u000D" }]].

الأمر اللي قبله [[-]] بيشيل اختصار افتراضي، لو عايز تفضّي المفتاح لحاجة تانية.

الملف بيتزامن مع Settings Sync.`,
            when: "لما تلاقي نفسك بتفتح Command Palette لنفس الأمر كل شوية.",
            mistakes: "تختار Ctrl+Alt وحرف على كيبورد فيه AltGr (لغات أوروبية)، أو Ctrl+Alt+T على Ubuntu (بيفتح ترمنال)، فالنظام ياكله قبل VS Code. وتنسى الـ when فالاختصار يشتغل وانت في الترمنال ويعمل حاجة غريبة. أيقونة الكيبورد في Keyboard Shortcuts (Record Keys) تضغط المفتاح ويقولك مين واخده."
          },
          lines: [
            "لستة الاختصارات.",
            "Ctrl+Alt+R وانت في الكود: ابعت السطر أو التحديد للترمنال.",
            "Ctrl+Shift+Alt+T: شغّل الـ task اللي اسمها typecheck.",
            "Ctrl+Alt+M: كبّر اللوحة اللي تحت (الترمنال) ورجّعها.",
            "نهاية اللستة."
          ],
          sol: R`بعد ما تحفظ الملف، حدد سطر [[npm run build]] في README (لازم ترمنال مفتوح) ودوس Ctrl+Alt+R: النص هيتبعت للترمنال ويتنفذ على طول، والـ build يبدأ.

لو محصلش حاجة، الـ README لازم يبقى عليه الـ focus، لأن [[when: editorTextFocus]]. ولو في Markdown preview، ده مش editor. ولو Keyboard Shortcuts قال إن الاختصار عليه أكتر من أمر (زرار «Show Same Keybindings»)، ممكن extension تاني واخده. وعلى ويندوز Ctrl+Alt يساوي AltGr في بعض الـ layouts (زي الأوروبية)، فممكن يكتب حرف بدل الاختصار. العربي غالبًا مش هيتأثر.`
        },
        {
          cmd: ".code-snippets",
          title: "قوالب كود بتكتبها بكلمة وتتنقل جواها بـ Tab",
          desc: R`Snippet قالب كود بتستدعيه بكلمة قصيرة (prefix): تكتب [[rfc]] و Tab فيتكتب component كامل، والمؤشر يقف على الاسم، و Tab تاني يروح للمكان الجاي. [[$1]] و [[$2]] أماكن الوقوف، و [[$__{1:Name}]] مكان وقوف فيه قيمة جاهزة، و [[$0]] آخر مكان.

من Command Palette: Snippets: Configure Snippets. تختار لغة (ليك انت بس)، أو New Snippets file for current folder فيتعمل ملف [[.code-snippets]] في [[.vscode]] للفريق.`,
          example: R`// .vscode/react.code-snippets
{
  "React component": {
    "scope": "typescriptreact",
    "prefix": "rfc",
    "body": [
      "export function $__{1:$__{TM_FILENAME_BASE}}() {",
      "  return <div className=\"$2\">$0</div>;",
      "}"
    ],
    "description": "Function component named after the file"
  }
}`,
          try: "اعمل snippet لـ Express route handler فيه try/catch، واستخدمه في ملف جديد، واتنقل بين أماكنه بـ Tab.",
          flag: "script",
          deep: {
            why: "الـ boilerplate اللي بتكتبه كل يوم (component، route، test) بياخد وقت وبتنسى حتة فيه. القالب بيكتبه صح كل مرة.",
            how: R`[[scope]] بيحدد اللغات، ومن غيره الـ snippet يظهر في كل اللغات. [[prefix]] الكلمة اللي بتكتبها، وبيظهر في لستة الاقتراحات. و [[body]] السطور، كل سطر string.

الأماكن: [[$1]] أول وقفة، و [[$2]] التانية، و [[$0]] آخر مكان للمؤشر. لو [[$1]] متكرر، الكتابة في واحد بتكتب في الكل. والمتغيرات زي [[TM_FILENAME_BASE]] (اسم الملف من غير امتداد) و [[CURRENT_YEAR]] و [[CLIPBOARD]] بتتملي لوحدها.

ملفات اللغات (زي [[typescriptreact.json]]) في User وبتتزامن مع Settings Sync. وملف [[.code-snippets]] في [[.vscode]] للمشروع ويدخل Git.`,
            when: "أي قالب بتكتبه أكتر من ٣ مرات في الأسبوع.",
            mistakes: R`تنسى [[scope]] فالـ snippet يطلع في ملفات CSS و Markdown. وتكتب [[$]] عادية في الكود (template string مثلًا) فتتفهم على إنها مكان وقوف: اكتبها [[\\$]]. وعلامة التنصيص جوه الـ body محتاجة [[\"]] لأن الملف JSON.`
          },
          lines: [
            "بداية الملف.",
            "اسم الـ snippet.",
            "في ملفات tsx بس.",
            "اكتب rfc واختاره من الاقتراحات.",
            "السطور:",
            "الاسم أول وقفة، وقيمته الجاهزة اسم الملف.",
            "الوقفة التانية الـ className، وآخر مكان جوه الـ div.",
            "قفلة الدالة.",
            "نهاية السطور.",
            "الوصف اللي بيظهر في لستة الاقتراحات.",
            "نهاية الـ snippet.",
            "نهاية الملف."
          ],
          sol: R`اعمل ملف [[.vscode/express.code-snippets]] بالمحتوى اللي تحت. في أي ملف [[.js]] أو [[.ts]] اكتب [[exroute]]، هيظهر في الاقتراحات، و Tab يكتب الـ handler: أول وقفة لستة تختار منها [[get]] أو [[post]]، و Tab يوديك للمسار، و Tab تاني يوديك جوه [[try]] مكان [[$0]].

لو الـ snippet مظهرش: اتأكد إن الـ [[scope]] فيه اللغة الصح (ملفات [[.ts]] اسمها [[typescript]]، و [[.tsx]] اسمها [[typescriptreact]])، وإن الـ JSON صح (أي فاصلة ناقصة بتلغي الملف كله من غير رسالة واضحة). والـ backslash قبل علامة التنصيص جوه body لازم يبقى [[\"]]، وده اللي بيبوظ ناس كتير.`,
          solCode: R`{
  "Express route handler": {
    "scope": "javascript,typescript",
    "prefix": "exroute",
    "body": [
      "router.$__{1|get,post,put,patch,delete|}('/$__{2:path}', async (req, res, next) => {",
      "  try {",
      "    $0",
      "    res.json({ ok: true });",
      "  } catch (err) {",
      "    next(err);",
      "  }",
      "});"
    ],
    "description": "Express route with try/catch that forwards errors to next()"
  }
}`
        },
        {
          cmd: "Profiles",
          title: "إعدادات و extensions منفصلة لكل نوع شغل",
          desc: R`Profile مجموعة إعدادات و extensions واختصارات و snippets لوحدها. تعمل profile للشغل اليومي، وواحد للشرح (خط كبير، extensions قليلة، من غير AI)، وواحد لـ Python. وكل فولدر بيفتكر الـ profile اللي اتفتح بيه.

و Settings Sync (من أيقونة الحساب تحت على الشمال، Backup and Sync Settings) بيرفع كل ده على حسابك في GitHub أو Microsoft، فأي جهاز جديد يسجّل دخول ياخد نفس الإعدادات والـ extensions والـ profiles.`,
          example: R`Ctrl+Shift+P                   Profiles: New Profile...
gear icon (bottom left)        Profiles: switch, export, import
code --profile "Teaching" .    open a folder with a given profile
account icon (bottom left)     Backup and Sync Settings...`,
          try: "اعمل profile اسمه Teaching فاضي، كبّر فيه الخط وسطّب ٣ extensions بس، وافتح بيه فولدر بـ [[code --profile Teaching .]].",
          flag: "keys",
          deep: {
            why: "٤٠ extension لكل اللغات شغالين في كل مشروع بيبطّأوا المحرر وبيزحموا الاقتراحات. ووقت الشرح، إعداداتك الشخصية (خط صغير، AI بيقترح) بتشتت اللي بيتفرج.",
            how: R`الـ profile الجديد ممكن يبدأ فاضي، أو نسخة من الحالي، أو من template جاهز (Python أو Node مثلًا). وتقدر تخلي حاجات مشتركة بين كل الـ profiles وحاجات خاصة بكل واحد.

Export بيطلّع ملف أو gist، ودي طريقة حلوة تدّي إعداد جاهز لطلبة أو لزميل.

Settings Sync بيزامن الإعدادات والاختصارات والـ snippets والـ extensions والـ profiles. والإعدادات الخاصة بجهاز معين (مسارات مثلًا) تستثنيها بـ [[settingsSync.ignoredSettings]].`,
            when: "أكتر من نوع شغل على نفس الجهاز، أو أكتر من جهاز، أو قبل ما تفرمت.",
            mistakes: "تسطّب extension وانت في profile غلط وتدوّر عليها في التاني: اسم الـ profile بيظهر على أيقونة الترس تحت. وتشغّل Sync على جهاز شغل فيه إعدادات proxy أو مسارات خاصة، فتتنقل لجهازك الشخصي وتبوّظه."
          },
          sol: R`بعد [[code --profile Teaching .]] هيفتح شباك جديد والترس تحت شمال عليه اختصار اسم الـ profile. الخط الكبير والـ ٣ extensions بس هيبانوا، ولو فتحت شباك عادي هتلاقي إعداداتك القديمة زي ما هي.

لو الأمر عمل profile جديد فاضي باسم مختلف، يبقى الاسم مش مطابق بالظبط (الحروف الكابيتال والمسافات فارقة)، واللي فيه مسافة لازم بين علامات تنصيص. ولو فتح الفولدر في شباك موجود بالـ profile القديم، اقفل الشباك ده الأول، لأن VS Code بيربط الفولدر بآخر profile اتفتح بيه.`
        }
      ]
    },
    {
      t: "الشغل على جهاز تاني",
      l: 3,
      n: "VS Code على جهازك والكود في WSL أو على سيرفر أو جوه container، والإحساس كأنه محلي",
      items: [
        {
          cmd: "Remote-SSH",
          title: "افتح فولدر على سيرفر كأنه على جهازك",
          desc: R`extension اسمها Remote - SSH: من Command Palette تختار Remote-SSH: Connect to Host، وهي بتقرا [[~/.ssh/config]] فالسيرفرات اللي عرّفتها بتظهر بالاسم (تاب ssh config، درس «الأدوات بتقرا الملف»). بعد الاتصال، الملفات والترمنال والـ extensions كلها على السيرفر.

ونفس الفكرة بالظبط لـ WSL: [[code .]] من Ubuntu بيفتح VS Code متوصل بلينكس (تاب WSL، درس «VS Code»).`,
          example: R`code --remote ssh-remote+prod /var/www/myapp
code --remote wsl+Ubuntu /home/you/projects/myapp
ssh prod 'du -sh ~/.vscode-server'`,
          try: "عرّف سيرفر التجربة في [[~/.ssh/config]] واتصل بيه من Remote-SSH، وافتح [[/var/log]] واقرا لوج من المحرر.",
          deep: {
            why: "تعديل config أو قراية لوج على السيرفر بـ nano مرهق، ونقل الملفات رايح جاي بـ scp بطيء وبيغلط.",
            how: R`أول اتصال، VS Code بينزّل برنامج صغير (VS Code Server) في [[~/.vscode-server]] على السيرفر ويشغّله. الواجهة عندك والباقي هناك: الـ extensions اللي بتقرا الكود (ESLint، TypeScript) بتتسطّب على السيرفر، والثيم والخط عندك. والركن تحت على الشمال بيقول [[SSH: prod]].

الترمنال المدمج بيبقى shell على السيرفر، والبورتات بتتحوّل لجهازك لوحدها (درس Ports).

السيرفر محتاج Linux عادي (x64 أو ARM) ومساحة ورام: الـ server و TypeScript ممكن ياخدوا مئات الميجا.`,
            when: "إعداد سيرفر، وقراية لوجات، وتعديل configs، أو شغل على جهاز أقوى من جهازك.",
            mistakes: "تعدّل كود الإنتاج مباشرة على السيرفر بدل Git وتنسى، فأول deploy يمسح تعديلك: استخدمه للقراية والـ configs. وسيرفر رامه ١ جيجا: الـ TypeScript server ممكن ياكل الرام ويوقّع التطبيق نفسه. وتسطّب extensions تقيلة على سيرفر الإنتاج."
          },
          lines: [
            "افتح فولدر على السيرفر prod (الاسم من ~/.ssh/config).",
            "نفس الحكاية لتوزيعة WSL اسمها Ubuntu.",
            "الـ VS Code Server واخد مساحة قد إيه على السيرفر."
          ],
          sol: R`بعد Connect to Host واختيار السيرفر، أول مرة هيسطّب VS Code Server هناك (بياخد دقيقة) وتحت شمال هيبقى [[SSH: prod]]. File ثم Open Folder واكتب [[/var/log]]. افتح [[auth.log]] أو [[nginx/access.log]] وهتلاقي السطور في المحرر عادي، و Ctrl+F شغال.

لو ظهر [[EACCES: permission denied]] وانت بتفتح لوج، ده لأن معظم اللوجات مملوكة لـ root أو جروب [[adm]]. ضيف يوزرك للجروب بـ [[sudo usermod -aG adm deploy]] وادخل تاني، أو اقراه من الترمنال بـ [[sudo less]]. ولو الاتصال فشل من VS Code ونجح من الترمنال، غالبًا VS Code بيقرا ملف config تاني، شوف [[remote.SSH.configFile]].`
        },
        {
          cmd: "devcontainer.json",
          title: "بيئة التطوير كلها جوه container بملف",
          desc: R`[[.devcontainer/devcontainer.json]] بيوصف بيئة التطوير: image فيها Node بالنسخة الصح، والـ extensions، والبورتات، والأمر اللي يشتغل بعد الإنشاء. extension اسمها Dev Containers فيها Reopen in Container، فـ VS Code يبني الـ container ويفتح المشروع جواه.

أي حد عنده Docker يفتح المشروع ويبقى عنده نفس البيئة بالظبط.`,
          example: R`// .devcontainer/devcontainer.json
{
  "name": "myapp",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:22",
  "forwardPorts": [3000],
  "postCreateCommand": "npm ci",
  "customizations": {
    "vscode": { "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"] }
  }
}`,
          try: "في مشروع صغير: Dev Containers: Add Dev Container Configuration Files، اختار Node، وبعدين Reopen in Container، وشغّل [[node -v]] في الترمنال.",
          flag: "script",
          deep: {
            why: "«عندي شغال»: نسخة Node مختلفة، أو أداة مش متسطّبة، أو مشاكل ويندوز. الـ container بيوحّد البيئة للكل.",
            how: R`VS Code بيعمل container من الـ image (أو من Dockerfile أو docker-compose لو حددت)، وبيربط فولدر المشروع جواه، وبيشغّل VS Code Server جواه زي Remote-SSH بالظبط. الترمنال جوه الـ container، و [[npm ci]] بيتنفذ هناك.

[[customizations.vscode.extensions]] بتتسطّب فعلًا، مش اقتراح زي extensions.json. و [[forwardPorts]] بيحوّل البورت لجهازك.

على ويندوز، أسرع لما المشروع يبقى جوه WSL مش على C: (نفس السبب اللي في تاب WSL).

لو غيّرت الملف: Dev Containers: Rebuild Container.`,
            when: "مشروع فيه أدوات كتير أو نسخ محددة، أو فريق على أنظمة مختلفة، أو onboarding سريع.",
            mistakes: "تنسى Rebuild بعد تعديل الملف وتستغرب إن مفيش حاجة اتغيرت. وتحط أسرار في devcontainer.json وهو داخل Git. و Docker Desktop مش شغال فيفشل برسالة مش واضحة: شوف الـ log اللي بيفتحه."
          },
          lines: [
            "بداية الملف.",
            "اسم البيئة.",
            "image فيها Node 22 و TypeScript وأدوات أساسية.",
            "حوّل بورت 3000 لجهازك.",
            "بعد ما الـ container يتعمل أول مرة، سطّب الـ dependencies.",
            "إعدادات خاصة بالأدوات:",
            "extensions تتسطّب جوه الـ container.",
            "نهاية customizations.",
            "نهاية الملف."
          ],
          sol: R`بعد Reopen in Container، أول مرة هيبني الـ container (بياخد دقايق، وتقدر تشوف اللوج)، وبعدين تحت شمال هيبقى [[Dev Container: ...]]. [[node -v]] في الترمنال هيطبع النسخة اللي في الـ image، زي [[v22.x.x]] لو [[typescript-node:22]]، حتى لو جهازك عليه نسخة تانية أو مفيش node خالص. وده بالظبط الهدف.

لو فشل بـ «Docker is not running» أو «Cannot connect to the Docker daemon»، شغّل Docker Desktop الأول. ولو [[node -v]] طلع نسخة جهازك، يبقى الترمنال ده مفتوح من قبل ما تدخل الـ container. افتح ترمنال جديد. والـ wizard ممكن يختار نسخة Node أحدث من المثال، عادي.`
        },
        {
          cmd: ".code-workspace",
          title: "فولدرات كتير في شباك واحد لـ monorepo",
          desc: R`Multi-root workspace: شباك VS Code فيه أكتر من فولدر كجذور منفصلة، كل واحد ليه إعداداته. File ثم Add Folder to Workspace، أو [[code --add apps/api]] من الترمنال، وبعدين Save Workspace As يعمل ملف [[.code-workspace]] تفتحه بعد كده بـ [[code myapp.code-workspace]].

مفيد لـ monorepo (frontend و API و shared)، أو مشروعين في repos مختلفة بتشتغل عليهم مع بعض.`,
          example: R`// myapp.code-workspace
{
  "folders": [
    { "path": "apps/web", "name": "web" },
    { "path": "apps/api", "name": "api" },
    { "path": "packages/shared" }
  ],
  "settings": { "search.exclude": { "**/dist": true } }
}`,
          try: R`لو عندك frontend و backend في فولدرين، اعمل workspace فيه الاتنين، واحفظه، واقفل وافتح بـ [[code myapp.code-workspace]].`,
          flag: "script",
          deep: {
            why: "في monorepo، فتح الجذر كله ممكن يلخبط ESLint و TypeScript في أنهي config لأنهي فولدر، والبحث بيجيب من كل حتة. وفتح كل فولدر في شباك معناه ٣ شبابيك.",
            how: R`كل فولدر في [[folders]] بيبقى جذر: Ctrl+P بيكتب اسمه جنب الملف، والبحث تقدر تحصره فيه، وكل واحد ممكن يبقى ليه [[.vscode/settings.json]] لوحده. والـ [[settings]] في ملف الـ workspace بتسري على الكل.

ملف الـ workspace ممكن يبقى فيه [[launch]] و [[tasks]] و [[extensions]] كمان، لو عايز debug config يغطي فولدرين.

المسارات نسبية لمكان الملف، فحطه في جذر الـ repo واعمله commit لو الفريق كله بيستخدمه.`,
            when: "monorepo فيه أكتر من تطبيق، أو repos منفصلة بتتعدّل مع بعض.",
            mistakes: "تفتح الـ repo مرة كفولدر عادي ومرة كـ workspace، فالإعدادات تبان مختلفة: في حالة الـ workspace، إعدادات Workspace جاية من ملف [[.code-workspace]] مش من [[.vscode/settings.json]] اللي في الجذر. وتكتب مسارات مطلقة ([[C:\\Users\\you\\...]]) فالملف ميشتغلش عند غيرك."
          },
          lines: [
            "بداية الملف.",
            "الفولدرات:",
            "apps/web وهيظهر باسم web.",
            "apps/api وهيظهر باسم api.",
            "المكتبة المشتركة.",
            "نهاية اللستة.",
            "إعداد يسري على كل الفولدرات.",
            "نهاية الملف."
          ],
          sol: R`بعد ما تحفظ الـ workspace، [[code myapp.code-workspace]] هيفتح شباك عنوانه فيه [[myapp (Workspace)]]، وشجرة الملفات فيها الفولدرين كـ roots منفصلين. البحث والـ Git شغالين على الاتنين، و Source Control هيوريك repo لكل فولدر لو كانوا repos منفصلين.

لو فتحت الملف بدبل كليك وفتحه كـ JSON في تاب، دوس «Open Workspace» تحت يمين. ولو فولدر مظهرش، الـ [[path]] نسبي لمكان ملف [[.code-workspace]] نفسه مش للفولدر اللي انت فيه. ولو الـ settings اللي في الـ workspace ماشتغلتش في فولدر، ممكن [[.vscode/settings.json]] بتاع الفولدر نفسه بيكسب.`
        }
      ]
    },
    {
      t: "الأمر code من الترمنال",
      l: 3,
      n: "تفتح وتقفز لسطر وتقارن وتنقل الـ extensions من غير ما تسيب الترمنال",
      items: [
        {
          cmd: "code .",
          title: "افتح الفولدر الحالي في VS Code",
          desc: R`[[code .]] بيفتح الفولدر اللي انت فيه في شباك جديد. [[code -r .]] بيفتحه في آخر شباك مفتوح بدل شباك جديد. و [[code file.ts]] بيفتح ملف، ولو مش موجود بيعمله. و [[-]] بيقرا من الـ output اللي داخله ويفتحه كملف.

على ويندوز ولينكس الأمر بيتسطّب مع VS Code. على الماك: Command Palette ثم Shell Command: Install 'code' command in PATH. وجوه WSL بيفتح VS Code متوصل بلينكس (تاب WSL، درس «VS Code»).`,
          example: R`cd ~/projects/myapp && code .
code -r .
code README.md .env.example
git log --oneline -30 | code -`,
          try: "من الترمنال في مشروعك: [[code -r .]]، وبعدين [[git log --oneline -30 | code -]] وشوف النتيجة كملف تقدر تدوّر فيه بـ Ctrl+F.",
          deep: {
            why: "انت في الترمنال في الفولدر الصح. إنك تفتح VS Code وتدوّر على الفولدر من File ثم Open Folder رجوع لورا.",
            how: R`[[code]] سكربت صغير بيكلّم VS Code: لو فيه شباك مفتوح بيبعتله، ولو لأ بيشغّله. الفولدر اللي بيتفتح بيبقى جذر المشروع، فإعدادات [[.vscode]] اللي فيه بتتطبق، والترمنال المدمج بيبدأ منه.

[[-n]] شباك جديد دايمًا، و [[-r]] آخر شباك. و [[-]] بيقرا اللي داخله من pipe، فأي output طويل تفتحه وتدوّر فيه براحتك.`,
            when: "كل مرة تفتح مشروع، وأي output طويل عايز تقراه براحتك.",
            mistakes: "تفتح فولدر أب فيه ١٠ مشاريع، فـ ESLint و TypeScript يتلخبطوا والبحث يبقى بطيء: افتح المشروع نفسه. وعلى الماك تكتب code فيقولك command not found: لسه ما عملتش Install 'code' command in PATH."
          },
          lines: [
            "روح لفولدر المشروع وافتحه.",
            "افتحه في الشباك الحالي بدل شباك جديد.",
            "افتح ملفين.",
            "افتح output أي أمر كملف في المحرر."
          ],
          sol: R`[[code -r .]] هيفتح المشروع في الشباك اللي مفتوح بالفعل بدل شباك جديد. [[git log --oneline -30 | code -]] هيطبع في الترمنال [[Reading from stdin via: /tmp/code-stdin-xxx]] ويفتح تاب فيه ٣٠ سطر من الـ log، وتقدر تدوّر فيه بـ Ctrl+F. الترمنال هيفضل مستني لحد ما تقفل التاب أو تدوس Ctrl+C.

لو [[code]] قال command not found: على الماك افتح VS Code و Palette ثم «Shell Command: Install 'code' command in PATH». على ويندوز التسطيب بيضيفه لوحده، اقفل الترمنال وافتحه. وعلى ويندوز في PowerShell أو CMD، [[code -]] بيشتغل بنفس الطريقة.`
        },
        {
          cmd: "code --goto",
          title: "افتح ملف على سطر وعمود معين",
          desc: R`[[code --goto file:line:column]] (أو [[-g]]) بيفتح الملف والمؤشر على المكان بالظبط. مفيد مع أي أداة بتطبع مسارات بالشكل ده: eslint و tsc و grep و stack traces.

و [[code --wait]] (أو [[-w]]) بيستنى لحد ما تقفل الملف، ودا اللي بيخلي VS Code ينفع يبقى المحرر بتاع Git.`,
          example: R`code --goto src/server.ts:118:12
code -r -g package.json:5
git config --global core.editor "code --wait"`,
          try: R`شغّل [[npx tsc --noEmit]] وخد أول غلط وافتحه بـ [[code -g]]. وبعدين اضبط core.editor واعمل [[git commit]] من غير [[-m]]: الرسالة هتتفتح في تاب، اكتبها واقفل التاب.`,
          deep: {
            why: "الأداة قالتلك المكان بالظبط. نسخ اسم الملف وفتحه وبعدين Ctrl+G تلات خطوات، و --goto خطوة.",
            how: R`الصيغة [[path:line:column]] والعمود اختياري، والمسار نسبي للمكان اللي انت فيه في الترمنال.

[[--wait]] بيخلي الأمر ميرجعش لحد ما تقفل التاب. Git بيفتح ملف رسالة الـ commit ويستنى، ولما تقفل التاب يكمّل. من غير [[--wait]]، Git هيلاقي الرسالة فاضية ويلغي الـ commit.

جوه الترمنال المدمج مش محتاج --goto: Ctrl+Click على المسار بيعمل نفس الحاجة.`,
            when: "سكربتات وأدوات بتطبع مسارات، وضبط Git أول مرة على جهاز.",
            mistakes: "تنسى [[--wait]] في core.editor، فكل commit من غير -m يتلغي بـ «Aborting commit due to empty commit message». ومسار فيه مسافات من غير علامات تنصيص."
          },
          lines: [
            "افتح server.ts على سطر 118 عمود 12.",
            "في الشباك الحالي، على سطر 5.",
            "خلي Git يفتح رسايل الـ commit والـ rebase في VS Code ويستنى تقفلها."
          ],
          sol: R`[[code -g src/server.ts:118:12]] يفتح الملف والمؤشر على السطر ١١٨ العمود ١٢. بعد [[git config --global core.editor "code --wait"]]، [[git commit]] من غير [[-m]] هيطبع [[hint: Waiting for your editor to close the file...]] ويفتح تاب [[COMMIT_EDITMSG]]. اكتب الرسالة في أول سطر، احفظ، واقفل التاب: الـ commit هيخلص.

لو قفلت التاب من غير ما تكتب حاجة، git هيقول [[Aborting commit due to empty commit message.]]، وده طبيعي. ولو git مستناش وعمل commit فاضي أو فتح vim، يبقى [[--wait]] ناقص أو الإعداد متحفظ غلط، شوف [[git config --global core.editor]].`
        },
        {
          cmd: "code --diff",
          title: "قارن ملفين جنب بعض",
          desc: R`[[code --diff a b]] (أو [[-d]]) بيفتح الملفين في diff: الفرق متلوّن، وتقدر تعدّل في الجهة اليمين. مفيد لملفين config (local و production)، أو نسختين من ملف مش في Git.

ومن جوه المحرر: كليك يمين على ملف في الشجرة ثم Select for Compare، وعلى التاني Compare with Selected.`,
          example: R`code --diff .env.example .env
code -d nginx.conf nginx.conf.bak
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'`,
          try: R`قارن [[.env.example]] بـ [[.env]] في مشروعك وشوف مين ناقص. وجرّب [[git difftool HEAD~1 -- package.json]] بعد الإعداد.`,
          deep: {
            why: "«ليه شغال على جهازي ومش على السيرفر؟» كتير بتبقى سطرين مختلفين في config، وعينك مش هتلاقيهم في ملفين ١٠٠ سطر.",
            how: R`الـ diff editor هو نفسه اللي Source Control بيستخدمه: الأسهم فوق بتنقل بين التغييرات، والجهة اليمين قابلة للتعديل. وتقدر تخليه inline بدل جنب بعض من الأيقونات فوق.

[[git difftool]] بعد الإعداد بيفتح كل ملف متغير في VS Code واحد ورا التاني. و [[$LOCAL]] و [[$REMOTE]] بيحط Git مكانهم مسارات مؤقتة للنسختين.

وفيه [[--merge]] لـ 3-way merge من برا، بس جوه المشروع Merge Editor (مستوى ٢) أسهل.`,
            when: "مقارنة configs، أو نسخ ملفات من مصادر مختلفة، أو مراجعة قبل ما تكتب فوق ملف.",
            mistakes: "تكتب الأمر بعلامات تنصيص مزدوجة في bash، فالـ shell يبدّل [[$LOCAL]] بفاضي قبل ما يوصل لـ Git: استخدم علامات مفردة زي المثال. وتنسى إن الجهة اليمين ملف حقيقي، فتعدّل فيها بالغلط وتحفظ."
          },
          lines: [
            "شوف الـ .env ناقصه أنهي متغيرات من المثال.",
            "قارن config بالنسخة الاحتياطية قبل ما ترجّعها.",
            "خلي VS Code أداة الـ diff بتاعة Git.",
            "الأمر اللي Git يشغّله: النسختين في diff، ويستنى تقفل."
          ],
          sol: R`[[code --diff .env.example .env]] هيفتح تاب diff: الشمال [[.env.example]] واليمين [[.env]]. السطور اللي في الشمال بس (أحمر) يعني متغيرات موثّقة ومش موجودة عندك، واللي في اليمين بس (أخضر) عندك ومش موثّقة. بعد الإعداد، [[git difftool HEAD~1 -- package.json]] هيسأل [[Launch 'vscode' [Y/n]?]]، دوس Enter ويفتح diff بين النسخة القديمة والحالية.

لو الـ diff ظهر كله أحمر وأخضر مع إن الملفين شبه بعض، غالبًا فرق في line endings (CRLF و LF) أو ترتيب السطور. ولو [[difftool]] فتح أداة تانية، يبقى [[diff.tool]] متحفظ في مكان تاني (زي config المشروع). ولو الأمر اتعمل على ويندوز في PowerShell، علامات التنصيص المفردة حوالين [[$LOCAL]] مهمة عشان PowerShell ميحاولش يفكها.`
        },
        {
          cmd: "code --list-extensions",
          title: "خد backup للـ extensions ورجّعها على جهاز جديد",
          desc: R`[[code --list-extensions]] بيطبع IDs كل الـ extensions المتسطّبة، سطر لكل واحدة. احفظها في ملف، وعلى الجهاز الجديد سطّبهم بـ [[code --install-extension]] في loop.

ودا بديل لـ Settings Sync لو مش عايز تربط حساب، أو عايز لستة مكتوبة تشاركها أو تحطها مع الـ dotfiles.`,
          example: R`code --list-extensions > extensions.txt
code --list-extensions --show-versions
xargs -L 1 code --install-extension < extensions.txt
code --install-extension dbaeumer.vscode-eslint
code --uninstall-extension ms-python.python
# PowerShell:
Get-Content extensions.txt | ForEach-Object { code --install-extension $_ }`,
          try: "خد backup للـ extensions عندك في ملف، وافتحه وامسح منه اللي مبقتش بتستخدمه. دي فرصة تنضّف.",
          deep: {
            why: "جهاز جديد أو فورمات، وعندك ٣٠ extension مش فاكر أساميهم.",
            how: R`الـ ID شكله [[publisher.name]]، وهو نفسه اللي بيتكتب في extensions.json و devcontainer.json. و [[--install-extension]] بيقبل ID أو مسار ملف [[.vsix]] (لـ extension مش على الـ marketplace، أو جهاز من غير نت).

الأوامر دي بتشتغل على الـ profile الحالي، و [[--profile]] بيحدد profile معين.

جوه WSL أو Remote، [[code --list-extensions]] بيطبع الـ extensions اللي على الناحية دي (لينكس) مش اللي على ويندوز.`,
            when: "قبل فورمات أو جهاز جديد، أو تجهيز جهاز لطلبة أو لزميل.",
            mistakes: "ترجّع كل حاجة اتسطّبت من ٣ سنين فيرجع الزحام والبطء. وتحفظ اللستة من جوه WSL وتفتكرها كل حاجة، وهي نص الحكاية."
          },
          lines: [
            "احفظ الـ IDs في ملف.",
            "بالنسخ، عشان تعرف لو تحديث extension هو اللي بوّظ حاجة.",
            "سطّب كل سطر في الملف (bash أو WSL أو Git Bash).",
            "سطّب واحدة بالـ ID.",
            "شيل واحدة.",
            "نفس الـ restore من PowerShell."
          ],
          sol: R`[[code --list-extensions > extensions.txt]] هيعمل ملف فيه ID لكل extension في سطر، زي [[dbaeumer.vscode-eslint]] و [[esbenp.prettier-vscode]]. و [[--show-versions]] بيضيف الإصدار: [[dbaeumer.vscode-eslint@3.0.x]]. امسح من الملف اللي مش بتستخدمه، والملف ده هو اللي هتسطّب بيه على جهاز جديد.

لو الملف طلع فاضي، يبقى فيه أكتر من VS Code (زي Insiders أو Cursor) والـ [[code]] بيشاور على واحد تاني. ولو شغّلته من ترمنال جوه Remote-SSH أو WSL، هيطلع الـ extensions المتسطبة على الجهاز البعيد بس. وعلى ويندوز، [[xargs]] مش موجود في PowerShell، استخدم سطر PowerShell اللي في المثال.`
        }
      ]
    },
    {
      t: "لما المحرر يتقل أو يبوظ",
      l: 3,
      n: "Reload، وتقفل الـ extensions، وتعرف مين التقيل، وتختار اللي يستاهل بس",
      items: [
        {
          cmd: "Reload Window",
          title: "الأخطاء الحمرا مش حقيقية أو المحرر معلّق",
          desc: R`Developer: Reload Window من Command Palette بيعيد تحميل الشباك في ثانيتين، من غير ما تقفل VS Code، والتابات بترجع زي ما هي. أغلب «VS Code باظ» بتتحل بيه.

ولو المشكلة في TypeScript بالذات (خط أحمر على حاجة موجودة، أو import مش شايفه بعد [[npm install]] أو [[prisma generate]])، TypeScript: Restart TS Server أخف. ونفس الحكاية لـ ESLint: Restart ESLint Server.`,
          example: R`Ctrl+Shift+P           Developer: Reload Window
Ctrl+Shift+P           TypeScript: Restart TS Server
Ctrl+Shift+P           ESLint: Restart ESLint Server
Ctrl+Shift+U           Output panel: pick "TypeScript" or "ESLint" to see why
Mac: Shift+Cmd+U / Linux: Ctrl+K Ctrl+H`,
          try: "بعد [[npx prisma generate]] أو إضافة مكتبة، لو لسه فيه خط أحمر على حاجة موجودة، جرّب Restart TS Server بدل ما تقفل VS Code.",
          flag: "keys",
          deep: {
            why: "الـ language server بيبني صورة للمشروع في الذاكرة، ولما حاجات تتغير من برا (مكتبة جديدة، types متولّدة، checkout لفرع مختلف جدًا) الصورة ممكن تتأخر.",
            how: R`كل لغة ليها عملية منفصلة (TypeScript server، ESLint server). الـ Restart بيقفل العملية دي ويعيدها فتقرا المشروع من الأول. و Reload Window بيعيد تشغيل كل الـ extensions مرة واحدة.

لوحة Output (من القايمة اللي فيها تختار الـ extension) بتوريك رسايل كل extension، زي «Cannot find module» أو «config not found»، ودا أول مكان تبص فيه لو extension مش شغالة.`,
            when: "أخطاء مش منطقية بعد تسطيب أو توليد أو تبديل فرع، أو extension بطّلت ترد.",
            mistakes: "تقفل VS Code كله وتفتحه، ودا أبطأ وبيقفل الترمنالات والـ dev server. أو تفضل تعمل Restart والمشكلة إن TypeScript بتاع VS Code غير بتاع المشروع: شوف [[js/ts.tsdk.path]] في درس «.vscode/settings.json»."
          },
          sol: R`بعد Palette ثم «TypeScript: Restart TS Server»، الـ status bar تحت هيقول «Initializing JS/TS language features» ثواني، وبعدين الخطوط الحمرا اللي كانت على types اتولدت جديد (زي Prisma client) هتختفي من غير ما تقفل VS Code. ولو لسه موجودة، Ctrl+Shift+U ثم اختار «TypeScript» من اللستة فوق يمين، هيوريك لوج الـ server.

لو الخط الأحمر لسه موجود بعد الـ restart، يبقى الغلط حقيقي: شغّل [[npx tsc --noEmit]] في الترمنال. لو هو كمان قال نفس الغلط، يبقى مش مشكلة المحرر. ولو الترمنال مقالش حاجة والمحرر لسه أحمر، غالبًا VS Code بيستخدم نسخة TypeScript غير اللي في المشروع، «TypeScript: Select TypeScript Version» ثم Use Workspace Version.`
        },
        {
          cmd: "code --disable-extensions",
          title: "اعرف لو extension هي اللي مبوّظة المحرر",
          desc: R`[[code --disable-extensions .]] بيفتح المشروع من غير أي extension. لو المشكلة اختفت، يبقى extension هي السبب. ومن جوه المحرر: Help: Start Extension Bisect بيقفل نص الـ extensions ويسألك «المشكلة لسه موجودة؟» لحد ما يلاقي المتهمة.

و Developer: Show Running Extensions بيوريك كل extension خدت كام وقت عشان تشتغل، ودا بيوضّح مين التقيلة.`,
          example: R`code --disable-extensions .
code --disable-extension eamodio.gitlens .
code --status`,
          try: "افتح مشروعك بـ [[--disable-extensions]] وقارن سرعة الفتح. وبعدين في الوضع العادي شوف Show Running Extensions ورتّبهم بالوقت.",
          deep: {
            why: "VS Code بطيء، أو الكتابة بتقطّع، أو format on save بيعمل حاجة غريبة. غالبًا extension، بس أنهي واحدة من ٣٠؟",
            how: R`[[--disable-extensions]] للجلسة دي بس، مش بيغيّر حاجة في الإعدادات. والـ Bisect بيعمل binary search: ٣٠ extension محتاجين حوالي ٥ أسئلة بس.

Help ثم Open Process Explorer بيوريك كل عملية VS Code والرام والـ CPU بتوعها: الـ extension host، والـ TypeScript server، والترمنالات. عملية واكلة ١٠٠٪ CPU هي أول متهم.

ولما تلاقيها: Disable (Workspace) في صفحة الـ extension بيقفلها للمشروع ده بس، فتفضل شغالة في المشاريع اللي محتاجاها.`,
            when: "بطء، أو تقطيع، أو سلوك غريب ظهر فجأة (غالبًا بعد تحديث extension).",
            mistakes: "تمسح VS Code وتسطّبه تاني، والـ extensions والإعدادات بترجع زي ما هي لأنها في فولدر المستخدم مش فولدر البرنامج. أو تفتكر المشكلة في VS Code والسبب مشروع فيه فولدرات build ضخمة من غير [[files.watcherExclude]]."
          },
          lines: [
            "افتح المشروع من غير أي extension.",
            "اقفل extension واحدة بس للجلسة دي.",
            "اطبع العمليات والرام والـ CPU (و VS Code مفتوح)."
          ],
          sol: R`بـ [[code --disable-extensions .]] الشباك هيفتح أسرع بشكل ملحوظ لو عندك extensions كتير، وفي Extensions هتلاقيهم كلهم تحت «Disabled» (الإعداد ده للشباك ده بس، مش هيأثر بعدين). في الوضع العادي، Palette ثم «Developer: Show Running Extensions» هيعرض كل extension وجنبها وقت التفعيل بالـ ms، والأبطأ يستاهل تبص عليه.

لو المشكلة اختفت مع [[--disable-extensions]]، يبقى extension هي السبب، و «Help: Start Extension Bisect» بيلاقيها في كام خطوة بدل ما تجرب واحدة واحدة. ولو المشكلة لسه موجودة، يبقى مش من الـ extensions: جرّب الإعدادات أو حجم المشروع (فولدر [[node_modules]] ضخم من غير watcherExclude).`
        },
        {
          cmd: "Ctrl+Shift+X",
          title: "الـ extensions اللي تستاهل لمشروع Node و React",
          desc: R`Ctrl+Shift+X بيفتح الـ extensions، وفيه فلاتر: [[@installed]] و [[@recommended]] (من extensions.json) و [[@disabled]] و [[@builtin]]. وكل extension ليها Disable و Disable (Workspace).

اللي بيفرق فعلًا لمشروع Node و React و Docker: ESLint و Prettier (الأخطاء والشكل)، و Tailwind CSS IntelliSense، و Prisma، و extension الـ Docker من Microsoft (الـ Dockerfile و compose)، و GitLens (أو الـ blame المدمج لو كفاية)، و REST Client أو Thunder Client (تبعت requests من المحرر)، و Error Lens (الغلط مكتوب في آخر السطر)، و EditorConfig.`,
          example: R`Ctrl+Shift+X                 Extensions (Shift+Cmd+X on Mac)
@installed                   what you have
@recommended                 what this project suggests (.vscode/extensions.json)
@disabled / @builtin         disabled ones / shipped with VS Code
gear, Disable (Workspace)    off for this project only`,
          try: "افتح [[@installed]] وعدّهم. أي واحدة ما استخدمتهاش من شهر: Disable، وبعد أسبوع لو محدش افتقدها، Uninstall.",
          flag: "keys",
          deep: {
            why: "كل extension بتاكل رام ووقت تشغيل، وبعضها بيتعارض مع بعض (formatterين، اتنين linters). ٥ كويسين أحسن من ٤٠.",
            how: R`الـ extensions بتشتغل في عملية اسمها extension host. أغلبها بيصحى لما يحتاج بس (ملف من لغتها اتفتح)، بس فيه اللي بيصحى مع أول فتح ويفضل شغال.

Disable (Workspace) بيتحفظ لكل مشروع، فمشروع Python ميشغّلش extensions الـ React والعكس. ولو عايز فصل كامل: Profiles.

قبل ما تسطّب: بص على الناشر (علامة verified) وعدد التسطيبات وآخر تحديث. الـ extension بتشتغل بصلاحيات حسابك: تقرا ملفاتك وتكلّم النت.`,
            when: "إعداد جهاز جديد، أو المحرر بقى بطيء، أو مشروع بستاك جديد.",
            mistakes: "تسطّب Prettier ومعاه Beautify ومعاه formatter تالت، فكل حفظ الشكل يتغير: واحد بس، ومحدد في [[editor.defaultFormatter]]. وتسطّب extension من ناشر مجهول بيقلّد اسم مشهور: الـ extensions ليها صلاحيات كاملة على ملفاتك."
          },
          sol: R`[[@installed]] هيعرض كل اللي متسطب ومقسّم Enabled و Disabled، وفوق العدد. الرقم الطبيعي لمطوّر Node و React بين ١٠ و ٢٥. اللي فوق ٤٠ غالبًا فيه تكرار (زي ٣ extensions للـ formatting). الترس جنب extension ثم «Disable» يقفلها لكل حاجة، و «Disable (Workspace)» للمشروع ده بس.

ملحوظة: فيه extensions بتتسطب لوحدها كجزء من extension تانية (Extension Pack)، فلو عملت Disable لواحدة ولقيتها رجعت، شيل الـ pack نفسه. ولو [[@recommended]] فاضي، يبقى المشروع مفيهوش [[.vscode/extensions.json]].`
        }
      ]
    }
]);
