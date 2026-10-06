// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "إعدادات تتشارك مع الفريق",
      l: 3,
      n: "ملفات في .vscode جوه الـ repo، فكل واحد يفتح المشروع يلاقي نفس السلوك",
      items: [
        {
          cmd: "Ctrl+,",
          title: "افتح الإعدادات وافرق بين بتاعتك وبتاعة المشروع",
          desc: R`Ctrl+, بيفتح الإعدادات، وفوق فيه تابين: User (ليك انت في كل المشاريع) و Workspace (للمشروع ده بس، ومتحفوظة في [[.vscode/settings.json]]). إعداد Workspace بيغلب User.

اكتب [[@modified]] في البحث تشوف اللي انت غيّرته بس. والأيقونة فوق على اليمين (Open Settings JSON) بتفتح الملف نفسه.`,
          example: R`Ctrl+,                 Settings (Cmd+, on Mac)
@modified              only the settings you changed
@lang:typescript       settings for one language
User | Workspace       tabs at the top: where the change is saved
Ctrl+Shift+P           Preferences: Open User Settings (JSON)`,
          try: "افتح الإعدادات ودوّر على [[@modified]] وشوف انت غيّرت إيه. وبعدين غيّر [[editor.tabSize]] في Workspace بس، وشوف [[.vscode/settings.json]] اتعمل.",
          flag: "keys",
          deep: {
            why: "إعدادات زي format on save والـ formatter لازم تبقى نفسها عند الكل في المشروع، وإعدادات زي الخط والثيم بتاعتك انت. لو خلطتهم، زميلك مش هيلاقي نفس السلوك.",
            how: R`الترتيب من الأضعف للأقوى: Default ثم User ثم Remote (لو شغال WSL أو SSH) ثم Workspace ثم Workspace Folder (في multi-root). وأي إعداد ممكن يتحدد للغة واحدة بـ [["[typescript]": { ... }]].

User settings على ويندوز في [[%APPDATA%\Code\User\settings.json]]، وعلى لينكس [[~/.config/Code/User/settings.json]]، وعلى الماك [[~/Library/Application Support/Code/User/settings.json]].

الملف JSON بيقبل كومنتات، فتقدر تكتب [[//]] جواه تشرح ليه الإعداد ده موجود.`,
            when: "قبل أي إعداد اسأل نفسك: «ده ذوقي ولا قاعدة المشروع؟»",
            mistakes: "تحط إعدادات شخصية (الخط، الثيم، [[editor.fontSize]]) في Workspace وتعمل commit، فتفرضها على الفريق. وتغيّر إعداد في User وهو متغلوب من Workspace فتفتكره مش شغال: الإعداد بيبقى جنبه «Also modified in: Workspace»."
          },
          teach: R`## الفكرة في سطر

Ctrl+, بيفتح شاشة الإعدادات. وأهم حاجة فيها التابين اللي فوق: **User** (ليك انت) و **Workspace** (للمشروع ده). نفك سطور المثال.

---

## ١. افتح الإعدادات

~~~text
Ctrl+,                 Settings (Cmd+, on Mac)
~~~

الفاصلة ([[,]]) هي اختصار الإعدادات في برامج كتير على الماك، و VS Code خلاها نفسها على كل الأنظمة. بتفتح شاشة فيها خانة بحث وتحتها كل إعداد بشرحه.

---

## ٢. [[@modified]]

~~~text
@modified              only the settings you changed
~~~

لما تكتب [[@modified]] في خانة البحث، بيعرض الإعدادات اللي **انت غيرتها** بس (اللي مش على قيمتها الافتراضية). وجنب كل واحد خط أزرق على الشمال.

---

## ٣. [[@lang:typescript]]

~~~text
@lang:typescript       settings for one language
~~~

بيعرض الإعدادات اللي ينفع تتحدد للغة واحدة، وأي تغيير هنا بيتحفظ للغة دي بس. في الملف بيتكتب كده:

~~~json settings.json
{
  "[typescript]": { "editor.tabSize": 4 }
}
~~~

[["[typescript]"]] بين أقواس مربعة معناها «الإعدادات اللي جوه دي لملفات TypeScript بس».

---

## ٤. User و Workspace

~~~text
User | Workspace       tabs at the top: where the change is saved
~~~

| التاب | بيتحفظ فين | بيأثر على |
|---|---|---|
| User | ملف الإعدادات بتاعك على الجهاز | كل المشاريع |
| Workspace | [[.vscode/settings.json]] جوه المشروع | المشروع ده بس، ولكل اللي يفتحه |

ولو نفس الإعداد في الاتنين، **Workspace بيكسب**. الترتيب من الأضعف للأقوى:

~~~text
Default  <  User  <  Remote  <  Workspace  <  Workspace Folder
~~~

(Remote لو شغال WSL أو SSH، و Workspace Folder لو المشروع multi-root).

---

## ٥. الملف نفسه

~~~text
Ctrl+Shift+P           Preferences: Open User Settings (JSON)
~~~

بيفتح ملف User settings كـ JSON. مكانه:

| النظام | المسار |
|---|---|
| ويندوز | [[%APPDATA%\Code\User\settings.json]] |
| لينكس | [[~/.config/Code/User/settings.json]] |
| الماك | [[~/Library/Application Support/Code/User/settings.json]] |

والملف ده بيقبل تعليقات [[//]] (النوع ده اسمه JSONC)، عكس JSON العادي.

---

## الخلاصة

~~~text
Ctrl+,             الإعدادات (Cmd+,)
@modified          اللي غيرته
@lang:typescript   إعدادات لغة واحدة
User               ليك في كل المشاريع
Workspace          للمشروع ولكل الفريق، وبيكسب
~~~

قبل أي إعداد اسأل: «ده ذوقي ولا قاعدة المشروع؟»`,
          sol: R`[[@modified]] هيعرض بس الإعدادات اللي غيّرتها، وجنب كل واحد خط أزرق. دوس على تاب «Workspace» فوق، دوّر على [[editor.tabSize]] واكتب 2. VS Code هيعمل [[.vscode/settings.json]] في المشروع وفيه [[{ "editor.tabSize": 2 }]].

لو غيّرت tabSize والملف لسه بيعرض 4 تحت يمين، ده لأن [[editor.detectIndentation]] مفعّل وبيقرا المسافات من الملف نفسه، أو فيه [[.editorconfig]] بيكسب. ولو الملف اتعمل بس في [[settings.json]] بتاع اليوزر، يبقى كنت على تاب User مش Workspace.`
        },
        {
          cmd: ".vscode/settings.json",
          title: "format on save و ESLint fix و LF لكل الفريق",
          desc: R`الملف ده جوه الـ repo، فأي حد يفتح المشروع في VS Code بياخد نفس السلوك: يتنسّق مع كل حفظ بـ Prettier، و ESLint يصلّح اللي يتصلّح، ونهاية السطر LF حتى على ويندوز، و TypeScript بتاع المشروع مش اللي جاي مع VS Code.

محتاج extensions الـ ESLint و Prettier متسطّبين (الدرس بعد الجاي بيقترحهم على الفريق). وقواعد الشكل نفسها مكانها [[.prettierrc]] و [[.editorconfig]] (تاب فحص الكود).`,
          example: R`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[prisma]": { "editor.defaultFormatter": "Prisma.prisma" },
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "js/ts.tsdk.path": "node_modules/typescript/lib"
}`,
          try: "ضيف الملف ده لمشروعك، وبوّظ مسافات ملف واحفظ: المفروض يتنسّق ويتصلّح. وبص تحت على اليمين: مكتوب LF.",
          flag: "script",
          deep: {
            why: "من غيره: واحد بيحفظ من غير تنسيق فالـ diff يبقى مسافات، وواحد على ويندوز بيعمل ملفات CRLF، وواحد بيشغّل formatter غير اللي المشروع ماشي بيه.",
            how: R`[[editor.defaultFormatter]] بيحسم أنهي extension تنسّق، ولكل لغة تقدر تحدد غيره جوه [["[اسم اللغة]"]].

[[editor.codeActionsOnSave]] بيشغّل code actions مع الحفظ. [[source.fixAll.eslint]] معناها «صلّح كل اللي ESLint يقدر يصلّحه». القيمة [["explicit"]] معناها مع الحفظ بإيدك (Ctrl+S) مش مع الـ auto save. القيم القديمة true و false لسه شغالة، بس الجديدة explicit و always و never.

[[files.eol]] بيأثر على الملفات الجديدة بس. ملف موجود بـ CRLF هيفضل كده لحد ما تغيّره (كليك على CRLF تحت في شريط الحالة).

[[js/ts.tsdk.path]] (اسمه القديم [[typescript.tsdk]]، لسه شغال بس deprecated) بيعرّف VS Code إن فيه TypeScript جوه المشروع، بس مش بيشغّلها لوحده لأسباب أمان: كل واحد يختارها مرة من TypeScript: Select TypeScript Version ثم Use Workspace Version، فالأخطاء في المحرر تبقى نفس أخطاء [[tsc]].`,
            when: "أول يوم في أي مشروع عليه أكتر من شخص، أو شغال عليه من أكتر من جهاز.",
            mistakes: R`Prettier مع الحفظ و ESLint فيه قواعد شكل (من غير [[eslint-config-prettier]]) بيتخانقوا: كل حفظ يغيّر ويرجّع. وتحط [[files.eol]] وتفتكر إن الملفات القديمة اتصلحت: الحل الكامل [[.gitattributes]] (تاب git). وفولدر [[.vscode]] كله في [[.gitignore]] فالملف عمره ما يوصل للفريق: استثني [[settings.json]] و [[extensions.json]] و [[launch.json]] من الـ ignore.`
          },
          teach: R`## الفكرة في سطر

الملف ده إعدادات VS Code **للمشروع**، جوه الـ repo، فأي حد يفتح المشروع بياخد نفس السلوك. هنفكه سطر سطر.

---

## الأول: الملف صح؟

الملف ده JSON، بس VS Code بيقبل فيه تعليقات [[//]] (النوع ده اسمه **JSONC**: JSON with Comments). شلت سطر التعليق الأول وقريت الباقي بـ [[JSON.parse]] في Node على ويندوز 11، وطلع سليم وفيه المفاتيح دي:

~~~text الناتج
editor.formatOnSave, editor.defaultFormatter, [prisma], editor.codeActionsOnSave, files.eol, files.insertFinalNewline, files.trimTrailingWhitespace, js/ts.tsdk.path
~~~

وأسامي الإعدادات مكتوبة بالشكل **مجموعة.إعداد**: [[editor.formatOnSave]] يعني إعداد formatOnSave في مجموعة editor.

---

## ١. اسم الملف والقوس

~~~json
// .vscode/settings.json
{
~~~

- السطر الأول تعليق بيقولك الملف ده اسمه إيه ومكانه: فولدر [[.vscode]] في أول المشروع. (النقطة في أول الاسم بتخلي الفولدر مخفي على لينكس والماك).
- [[{]] بداية object: مجموعة **key: value**.

---

## ٢. نسّق مع كل حفظ

~~~json
  "editor.formatOnSave": true,
~~~

كل Ctrl+S، الـ formatter يشتغل على الملف قبل ما يتحفظ (زي Shift+Alt+F لوحده). [[true]] = شغال.

---

## ٣. مين ينسّق

~~~json
  "editor.defaultFormatter": "esbenp.prettier-vscode",
~~~

القيمة **ID** بتاع extension، بالشكل [[publisher.name]]: [[esbenp]] اسم الناشر، و [[prettier-vscode]] اسم الـ extension. يعني «Prettier هو اللي ينسّق كل اللغات». من غيره، لو فيه أكتر من formatter، VS Code بيسأل.

---

## ٤. إلا Prisma

~~~json
  "[prisma]": { "editor.defaultFormatter": "Prisma.prisma" },
~~~

اسم لغة بين أقواس مربعة [["[prisma]"]] معناه «الإعدادات اللي جوه دي لملفات اللغة دي بس». فملفات [[schema.prisma]] بتتنسّق بالـ extension بتاعة Prisma ([[Prisma.prisma]]) مش Prettier. والإعداد الخاص بلغة بيغلب العام.

---

## ٥. ESLint يصلّح مع الحفظ

~~~json
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
~~~

- **code actions** هي نفس الحلول اللي Ctrl+. بيعرضها.
- [[source.fixAll.eslint]]: «صلّح كل حاجة ESLint يعرف يصلّحها لوحده».
- [["explicit"]]: لما تحفظ **بإيدك** (Ctrl+S)، مش مع الـ auto save. القيم: [["explicit"]] و [["always"]] و [["never"]]، والقديمة [[true]] و [[false]] لسه بتشتغل.

---

## ٦. نهاية السطر

~~~json
  "files.eol": "\n",
~~~

**EOL** = End Of Line: الحرف اللي في آخر كل سطر.

| الاسم | الحروف | مين بيستخدمه |
|---|---|---|
| LF | [[\n]] | لينكس والماك و git |
| CRLF | [[\r\n]] | ويندوز |

[["\n"]] معناها LF للملفات **الجديدة**، حتى على ويندوز. الملف الموجود بـ CRLF بيفضل كده لحد ما تغيّره من شريط الحالة.

---

## ٧. سطر فاضي في الآخر

~~~json
  "files.insertFinalNewline": true,
~~~

يضيف [[\n]] في آخر الملف لو مش موجود. من غيره git بيكتب في الـ diff [[\ No newline at end of file]].

---

## ٨. امسح المسافات الزيادة

~~~json
  "files.trimTrailingWhitespace": true,
~~~

**trailing whitespace** = مسافات في آخر السطر بعد آخر حرف. مش باينة، بس بتظهر في الـ diff كتعديل.

---

## ٩. TypeScript بتاع المشروع

~~~json
  "js/ts.tsdk.path": "node_modules/typescript/lib"
}
~~~

- **tsdk** = TypeScript SDK. VS Code جاي معاه نسخة TypeScript، والمشروع ممكن يكون على نسخة تانية في [[node_modules]].
- الإعداد ده بيقول لـ VS Code مكان نسخة المشروع. الاسم ده موجود في الـ extension بتاعة TypeScript جوه VS Code 1.140 (والاسم القديم [[typescript.tsdk]] لسه موجود).
- مش بيشغّلها لوحده (عشان أمان): كل واحد يختار مرة من الـ Palette: TypeScript: Select TypeScript Version ثم Use Workspace Version.
- مفيش فاصلة بعده لأنه آخر key، و [[}]] بتقفل الـ object.

---

## الملف كله في جدول

| الإعداد | بيعمل إيه |
|---|---|
| [[editor.formatOnSave]] | نسّق مع كل حفظ |
| [[editor.defaultFormatter]] | بـ Prettier |
| [["[prisma]"]] | إلا Prisma بالـ extension بتاعتها |
| [[editor.codeActionsOnSave]] | ESLint يصلّح مع الحفظ |
| [[files.eol]] | LF للملفات الجديدة |
| [[files.insertFinalNewline]] | سطر فاضي في الآخر |
| [[files.trimTrailingWhitespace]] | امسح المسافات في آخر السطور |
| [[js/ts.tsdk.path]] | TypeScript بتاع المشروع |

---

## الخلاصة

الملف ده محتاج الـ extensions بتاعته متسطبة (Prettier و ESLint)، وإلا الإعدادات بتشاور على حاجة مش موجودة. والدرس بعد الجاي بيقترحهم على الفريق.`,
          lines: [
            "بداية الإعدادات.",
            "نسّق الملف مع كل حفظ.",
            "بـ Prettier لكل اللغات.",
            "إلا Prisma: الـ extension بتاعتها هي اللي تنسّق.",
            "ومع كل حفظ، ESLint يصلّح اللي يتصلّح.",
            "نهاية السطر LF للملفات الجديدة، حتى على ويندوز.",
            "سطر فاضي في آخر كل ملف.",
            "امسح المسافات الزيادة في آخر السطور.",
            "TypeScript بتاع المشروع في node_modules (كل واحد يختارها مرة بـ Use Workspace Version).",
            "نهاية الإعدادات."
          ],
          sol: R`بعد الملف ده، بوّظ مسافات ملف و Ctrl+S: هيتنسّق بـ Prettier، ولو فيه مشاكل ESLint ليها fix (زي [[let]] ممكن تبقى [[const]]) هتتصلح. وتحت يمين في الـ status bar هيبقى مكتوب [[LF]].

لو التنسيق محصلش: اتأكد إن extension Prettier (esbenp.prettier-vscode) متسطب، وإلا [[defaultFormatter]] بيشاور على حاجة مش موجودة. ولو الملف لسه [[CRLF]]، ده لأن [[files.eol]] بيأثر على الملفات الجديدة بس، مش القديمة. دوس على CRLF تحت واختار LF، أو Prettier هيحوّلها لما ينسّق لأن الافتراضي بتاعه [[endOfLine: "lf"]]. ولو ESLint مصلحش حاجة، extension ESLint لازم يكون متسطب وشغال (شوف Output ثم ESLint).`
        },
        {
          cmd: "files.exclude",
          title: "اخفي الزحمة من شجرة الملفات والبحث",
          desc: R`[[files.exclude]] بيخفي فولدرات من شجرة الملفات والبحث و Ctrl+P. و [[search.exclude]] بيشيلها من البحث بس وتفضل ظاهرة في الشجرة. و [[files.watcherExclude]] بيقول لـ VS Code ميراقبش تغييراتها، ودا بيفرق في الأداء في مشروع ضخم.

node_modules متشالة من البحث افتراضيًا، لكن [[.next]] و [[dist]] و [[coverage]] لأ لو مش في [[.gitignore]].`,
          example: R`// .vscode/settings.json
{
  "files.exclude": { "**/.next": true, "**/coverage": true },
  "search.exclude": { "**/dist": true, "**/*.min.js": true, "**/package-lock.json": true },
  "files.watcherExclude": { "**/.next/**": true, "**/dist/**": true }
}`,
          try: "دوّر على اسم دالة في مشروع Next.js قبل وبعد الإعداد ده، وقارن عدد النتايج.",
          flag: "script",
          deep: {
            why: "Ctrl+Shift+F بيرجعلك ٢٠٠ نتيجة من ملفات build متولّدة، و Ctrl+P بيقترح [[.next/server/app/page.js]] بدل الملف الحقيقي.",
            how: R`القيم glob patterns: [[**]] معناها أي عمق من الفولدرات. [[search.exclude]] بياخد كل اللي في [[files.exclude]] ويزوّد عليه.

البحث كمان بيحترم [[.gitignore]] افتراضيًا ([[search.useIgnoreFiles]])، فأغلب ملفات الـ build متشالة لو هي في الـ ignore. الإعداد هنا للي مش في الـ ignore، أو لو عايز تشيله من الشجرة كمان.

الـ watcher بيتابع كل ملف عشان يحدّث الشجرة و Git. فولدر build بيتولّد فيه آلاف الملفات مع كل حفظ بيخلي VS Code يلهث.`,
            when: "مشروع فيه build output أو ملفات متولّدة كتير، أو monorepo.",
            mistakes: "تخفي حاجة من الشجرة وتنساها، فتدوّر على ملف «مش موجود» وهو مخفي: خلي [[files.exclude]] للحاجات اللي عمرك ما هتفتحها. وتحط [[.env]] في files.exclude عشان «محدش يشوفه»: ده عرض بس، والملف موجود وممكن يدخل commit."
          },
          teach: R`## الفكرة في سطر

تلات إعدادات بتشيل فولدرات من أماكن مختلفة في VS Code: الشجرة، والبحث، والمراقبة. نفك الملف سطر سطر.

---

## الأول: الملف صح؟

شلت سطر التعليق وقريت الباقي بـ [[JSON.parse]] في Node على ويندوز 11، وطلع سليم بالـ ٣ مفاتيح: [[files.exclude]] و [[search.exclude]] و [[files.watcherExclude]].

---

## القيم دي glob patterns

كل key في الإعدادات دي **glob pattern** (نمط أسامي ملفات)، والقيمة [[true]] معناها «طبّق».

| الجزء | معناه |
|---|---|
| [[**]] | أي عدد فولدرات جوه بعض (ولا واحد أو أكتر) |
| [[*]] | أي حروف في الاسم |
| [[**/.next]] | فولدر [[.next]] في أي مكان في المشروع |
| [[**/.next/**]] | كل حاجة **جوه** [[.next]] |

---

## ١. البداية

~~~json
// .vscode/settings.json
{
~~~

نفس ملف إعدادات المشروع من الدرس اللي فات. الإعدادات دي بتتضاف جنب اللي فيه.

---

## ٢. files.exclude: اخفي من كل حاجة

~~~json
  "files.exclude": { "**/.next": true, "**/coverage": true },
~~~

- [[.next]]: فولدر Next.js بيحط فيه الـ build.
- [[coverage]]: تقارير الـ tests.

الاتنين بيختفوا من **شجرة الملفات**، ومن **البحث**، ومن **Ctrl+P**. الافتراضي في VS Code 1.140 بيخفي أصلًا حاجات زي [[**/.git]] و [[**/.DS_Store]] و [[**/Thumbs.db]].

---

## ٣. search.exclude: من البحث بس

~~~json
  "search.exclude": { "**/dist": true, "**/*.min.js": true, "**/package-lock.json": true },
~~~

دول بيفضلوا **ظاهرين في الشجرة**، بس Ctrl+Shift+F مش بيدوّر فيهم:

| الـ pattern | ليه |
|---|---|
| [[**/dist]] | كود متبني، نسخة من src |
| [[**/*.min.js]] | ملفات مضغوطة سطر واحد طويل |
| [[**/package-lock.json]] | آلاف السطور بأسامي مكتبات |

و [[search.exclude]] بياخد كل اللي في [[files.exclude]] ويزود عليه. والافتراضي فيه [[**/node_modules]] و [[**/bower_components]] و [[**/*.code-search]].

---

## ٤. files.watcherExclude: متراقبش

~~~json
  "files.watcherExclude": { "**/.next/**": true, "**/dist/**": true }
}
~~~

VS Code بيراقب الملفات عشان يحدّث الشجرة وحالة git لما حاجة تتغير. فولدر build بيتولّد فيه آلاف الملفات مع كل حفظ، ومراقبته بتتعب الجهاز. ده **مش** بيخفي حاجة، بيقلل الشغل بس.

لاحظ الـ [[/**]] في الآخر هنا: الـ watcher محتاج «كل اللي جوه الفولدر».

---

## الفرق في جدول

| الإعداد | الشجرة | البحث و Ctrl+P | المراقبة |
|---|---|---|---|
| [[files.exclude]] | مخفي | مخفي | |
| [[search.exclude]] | ظاهر | مخفي | |
| [[files.watcherExclude]] | ظاهر | ظاهر | مش متراقب |

---

## و .gitignore؟

البحث بيحترم [[.gitignore]] لوحده (الإعداد [[search.useIgnoreFiles]])، فلو [[dist]] فيه، هو أصلًا مش في نتايج البحث. الإعدادات هنا للي **مش** في [[.gitignore]] (زي [[package-lock.json]])، أو لو عايز تخفي حاجة من الشجرة كمان.

---

## الخلاصة

~~~text
files.exclude          اخفي من الشجرة والبحث و Ctrl+P
search.exclude         من البحث بس
files.watcherExclude   متراقبش (أداء)
**                     أي عمق فولدرات
~~~

ده عرض بس: الملف المخفي لسه موجود وممكن يدخل commit.`,
          lines: [
            "بداية الإعدادات.",
            "اخفي .next و coverage من الشجرة والبحث و Ctrl+P.",
            "شيل من البحث بس: dist والملفات المضغوطة والـ lock file.",
            "متراقبش تغييرات فولدرات الـ build.",
            "نهاية الإعدادات."
          ],
          sol: R`قبل الإعداد، البحث عن اسم دالة ممكن يطلع نتايج من [[.next]] و [[dist]] (كود متبني) و [[package-lock.json]]. بعده هيطلع النتايج من [[src]] بس، والعدد هيقل. وفولدر [[.next]] هيختفي من شجرة الملفات كمان.

لو العدد متغيرش خالص، ده غالبًا لأن [[.next]] و [[dist]] موجودين في [[.gitignore]]، و VS Code افتراضيًا بيتجاهل اللي في [[.gitignore]] في البحث ([[search.useIgnoreFiles]]). يعني كانوا مستبعدين من الأول، وده طبيعي. الفرق هيبان في الملفات اللي مش في [[.gitignore]] زي [[package-lock.json]]، أو في شجرة الملفات.`
        },
        {
          cmd: ".vscode/extensions.json",
          title: "قول للفريق يسطّب أنهي extensions",
          desc: R`الملف ده فيه IDs الـ extensions اللي المشروع محتاجها. أول ما حد يفتح المشروع، VS Code بيسأله «تسطّب الـ extensions المقترحة؟». وفي تاب Extensions، الفلتر [[@recommended]] بيعرضهم.

الـ ID بتلاقيه في صفحة الـ extension، أو كليك يمين عليها ثم Copy Extension ID. و Add to Workspace Recommendations من نفس القايمة بيضيفها للملف لوحده.`,
          example: R`// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "EditorConfig.EditorConfig"
  ],
  "unwantedRecommendations": ["hookyqr.beautify"]
}`,
          try: "اعمل الملف ده في مشروعك بالـ extensions اللي فعلًا بتستخدمها، وافتح المشروع من profile فاضي (درس Profiles) وشوف الرسالة.",
          flag: "script",
          deep: {
            why: "زميل جديد بيفتح المشروع من غير ESLint فمش شايف الأخطاء، والـ formatOnSave في settings.json مش بيعمل حاجة من غير Prettier.",
            how: R`VS Code مش بيسطّب حاجة لوحده، بيقترح بس، والقرار للي فاتح المشروع. [[unwantedRecommendations]] بتمنع VS Code يقترح extensions بتتعارض مع إعداد المشروع (formatter تاني مثلًا).

في Dev Containers الموضوع أقوى: اللستة في devcontainer.json بتتسطّب فعلًا جوه الـ container.

خلي اللستة قصيرة: اللي المشروع بيعتمد عليه بس، مش ذوقك (الثيم مثلًا).`,
            when: "أي مشروع مشترك، ومع settings.json اللي بيعتمد على extensions.",
            mistakes: "تكتب اسم الـ extension بدل الـ ID ([[ESLint]] بدل [[dbaeumer.vscode-eslint]]) فمش هيلاقيها. وتحط ١٥ extension فمحدش هيسطّب حاجة."
          },
          teach: R`## الفكرة في سطر

الملف ده لستة بالـ extensions اللي المشروع محتاجها. VS Code **مش بيسطّبهم**، بيقترحهم على أي حد يفتح المشروع. نفكه سطر سطر.

---

## الأول: الملف صح؟

شلت سطر التعليق وقريت الباقي بـ [[JSON.parse]] في Node على ويندوز 11، وطلع سليم بمفتاحين: [[recommendations]] و [[unwantedRecommendations]].

---

## ١. البداية

~~~json
// .vscode/extensions.json
{
  "recommendations": [
~~~

- **recommendations** = «المقترحة». القيمة **array** (لستة بين قوسين مربعين).
- كل عنصر فيها **ID** extension بالشكل [[publisher.name]].

---

## ٢. الـ IDs

~~~json
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "EditorConfig.EditorConfig"
  ],
~~~

| الـ ID | الناشر | الـ extension |
|---|---|---|
| [[dbaeumer.vscode-eslint]] | dbaeumer | ESLint |
| [[esbenp.prettier-vscode]] | esbenp | Prettier |
| [[bradlc.vscode-tailwindcss]] | bradlc | Tailwind CSS IntelliSense |
| [[Prisma.prisma]] | Prisma | Prisma |
| [[EditorConfig.EditorConfig]] | EditorConfig | EditorConfig |

الاسم اللي بتشوفه في المتجر (زي «ESLint») **مش** الـ ID. الـ ID بتلاقيه في صفحة الـ extension، أو كليك يمين عليها ثم Copy Extension ID.

### انت عندك منهم إيه؟

[[code --list-extensions]] بيطبع IDs الـ extensions المتسطبة، سطر لكل واحد، من غير ما يفتح شباك. على جهاز ويندوز 11 عليه VS Code 1.140:

~~~bash
code --list-extensions
~~~

~~~text جزء من الناتج
bradlc.vscode-tailwindcss
dbaeumer.vscode-eslint
editorconfig.editorconfig
esbenp.prettier-vscode
~~~

لاحظ إن الأمر بيطبعهم **بحروف صغيرة** ([[editorconfig.editorconfig]])، والـ IDs مش بتفرّق بين الكابيتال والصغير. فعملت سكربت Node صغير يقارن اللستة اللي في الملف باللي متسطب (بعد ما يصغّر الحروف):

~~~text الناتج
installed dbaeumer.vscode-eslint
installed esbenp.prettier-vscode
installed bradlc.vscode-tailwindcss
MISSING   Prisma.prisma
installed EditorConfig.EditorConfig
~~~

يعني على الجهاز ده، لما المشروع يتفتح، VS Code هيقترح Prisma بس، لأن الباقي متسطب.

---

## ٣. extensions متقترحهاش

~~~json
  "unwantedRecommendations": ["hookyqr.beautify"]
}
~~~

**unwanted** = «مش مرغوب فيها». [[hookyqr.beautify]] formatter قديم بيتخانق مع Prettier، فالسطر ده بيقول لـ VS Code ميقترحهوش للمشروع ده.

---

## بيحصل إيه لما حد يفتح المشروع؟

لو فيه extension مقترحة ومش متسطبة، بيظهر إشعار تحت يمين بيسأله لو عايز يسطّب الـ extensions المقترحة، بزرار Install. وفي تاب Extensions، البحث [[@recommended]] بيعرض اللستة دي. والقرار للي فاتح المشروع.

---

## الخلاصة

~~~text
recommendations           IDs بالشكل publisher.name
unwantedRecommendations   متقترحش دول
@recommended              شوفهم في تاب Extensions
code --list-extensions    اللي متسطب عندك
~~~

خلي اللستة قصيرة: اللي المشروع محتاجه، مش ذوقك.`,
          lines: [
            "بداية الملف.",
            "اللستة المقترحة:",
            "ESLint: الأخطاء في المحرر والـ fix مع الحفظ.",
            "Prettier: الـ formatter.",
            "اقتراحات Tailwind classes.",
            "Prisma: الألوان والتنسيق والاقتراحات في schema.prisma.",
            "EditorConfig: يطبّق .editorconfig.",
            "نهاية اللستة.",
            "extensions متقترحهاش (formatter بيتعارض مع Prettier).",
            "نهاية الملف."
          ],
          sol: R`لما تفتح المشروع في profile فاضي، هيظهر إشعار تحت يمين: «Do you want to install the recommended extensions from ... for this repository?» بزرارين Install و Show Recommendations. التاني يفتح Extensions على [[@recommended]] وهتلاقي اللستة اللي كتبتها بالظبط.

لو الإشعار مظهرش، ممكن تكون قلت قبل كده «Don't Show Again»، أو كل الـ extensions متسطبة أصلًا. افتح [[@recommended]] بإيدك. ولو extension مظهرتش في اللستة، الـ ID غلط: لازم [[publisher.name]] بالظبط، تقدر تنسخه من صفحة الـ extension (الترس ثم Copy Extension ID).`
        }
      ]
    },
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
          teach: R`## الملف ده مش أمر، ده وصفة تشغيل

[[launch.json]] ملف إعدادات بيقول لـ VS Code «شغّل البرنامج إزاي وانت ماسك الـ debugger». لما تفتح Run and Debug (Ctrl+Shift+D)، كل عنصر جوه الملف بيظهر كاختيار في القايمة اللي فوق، و F5 بيشغّل اللي مختاره. هنفك المثال حتة حتة.

---

## ١. مكان الملف وأول سطرين

~~~text مكانه في المشروع
myapp/
  .vscode/
    launch.json
  package.json
~~~

- [[.vscode]] فولدر في جذر المشروع. النقطة في أول الاسم معناها إنه مخفي على لينكس والماك. الفولدر ده بيدخل Git، فالفريق كله بياخد نفس الإعدادات.
- [[// .vscode/launch.json]] تعليق. JSON العادي مبيقبلش تعليقات، بس VS Code بيقرا ملفاته بصيغة اسمها **JSONC** (JSON with Comments)، فـ [[//]] مسموحة.

~~~text
"version": "0.2.0",
"configurations": [ ... ]
~~~

- [[version]] نسخة شكل الملف نفسه، مش نسخة مشروعك. سيبها [[0.2.0]] زي ما VS Code بيكتبها.
- [[configurations]] لستة (الأقواس المربعة)، وكل [[{ }]] جواها **طريقة تشغيل واحدة**. المثال فيه اتنين.

> اتأكدنا إن المثال JSON سليم: شيلنا سطر التعليق وعدّيناه على [[JSON.parse]] في Node واتقرا من غير غلط.

---

## ٢. الطريقة الأولى: VS Code يشغّل السيرفر بنفسه

~~~text
"name": "API: npm run dev", "type": "node", "request": "launch",
~~~

| المفتاح | القيمة | معناها |
|---|---|---|
| [[name]] | [[API: npm run dev]] | الاسم اللي بيظهر في القايمة. اكتب أي حاجة توضّح |
| [[type]] | [[node]] | أنهي debugger: بتاع Node.js. وغيره [[chrome]] و [[msedge]] للمتصفح، و [[debugpy]] لبايثون |
| [[request]] | [[launch]] | VS Code هو اللي يشغّل البرنامج |

~~~text
"runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"],
~~~

- [[runtimeExecutable]] البرنامج اللي هيتشغّل. الافتراضي [[node]]، وهنا خليناه [[npm]].
- [[runtimeArgs]] الكلمات اللي بتتكتب بعده، كل كلمة string لوحدها.

فالاتنين مع بعض بيشغّلوا بالظبط اللي كنت هتكتبه في الترمنال:

~~~text
npm run dev
~~~

ليه [[npm run dev]] مش [[node server.js]]؟ لأن سكربت [[dev]] في [[package.json]] ممكن يكون [[nodemon]] أو [[tsx watch]] أو فيه متغيرات بيئة، وكده كل ده بيفضل زي ما هو. والـ debugger بيتربط بأي عملية Node السكربت بيولّدها.

~~~text
"skipFiles": ["<node_internals>/**", "**/node_modules/**"],
~~~

[[skipFiles]] ملفات الـ debugger ميدخلش جواها لما تدوس F11 (Step Into):

- [[<node_internals>]] اسم خاص معناه كود Node نفسه، زي موديول [[fs]] و [[http]].
- [[**]] معناها «أي عدد من الفولدرات». فـ [[**/node_modules/**]] يعني أي ملف جوه أي [[node_modules]].

كده F11 بيدخلك جوه كودك انت بس، مش جوه Express.

~~~text
"console": "integratedTerminal"
~~~

الـ output يطلع في الترمنال المدمج، مش في Debug Console. الترمنال بيحافظ على الألوان، وتقدر تكتب فيه لو البرنامج بيستنى input.

---

## ٣. الطريقة التانية: اتصل بسيرفر شغال أصلًا

~~~text
"name": "Attach 9229 (Docker)", "type": "node", "request": "attach",
"port": 9229, "restart": true,
~~~

[[attach]] عكس [[launch]]: VS Code مش هيشغّل حاجة، هو هيتصل ببرنامج Node شغال لوحده. والبرنامج ده لازم يكون اتشغّل بـ [[--inspect]] عشان يفتح باب للـ debugger. شوف بيطبع إيه (اتشغّل على ويندوز بـ Node 24):

~~~powershell
node --inspect -e "setTimeout(()=>{},300)"
~~~

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/38978ffa-d236-4697-a1f7-713b1d89ea60
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

- [[-e]] بيشغّل الكود اللي بعده كـ string، و [[setTimeout]] بيخلي البرنامج عايش ٣٠٠ مللي ثانية بس عشان نشوف السطر.
- [[ws://]] يعني WebSocket، الطريقة اللي الـ debugger بيكلّم بيها Node.
- [[127.0.0.1]] معناها «الجهاز ده بس»: محدش من برا يقدر يتصل.
- [[9229]] البورت الافتراضي للـ debugging، وده اللي في [["port": 9229]].
- الرقم الطويل في الآخر ID عشوائي بيتغير كل تشغيلة، و VS Code بيجيبه لوحده.

[["restart": true]] معناها: لو البرنامج وقع أو [[nodemon]] عمل restart، ارجع اتصل تاني لوحدك بدل ما الـ debug session تقفل.

### ليه الـ container محتاج [[0.0.0.0]]؟

جوه Docker، [[127.0.0.1]] يعني الـ container نفسه، فجهازك مش هيوصل. لازم تقول لـ Node يسمع على كل الشبكات (اتشغّل في [[node:22-slim]] جوه Docker):

~~~bash
node --inspect=0.0.0.0:9229 -e "setTimeout(()=>{},300)"
~~~

~~~text الناتج
Debugger listening on ws://0.0.0.0:9229/3174a5ec-0c23-4630-8bae-dc8cf1a30c6f
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

وكمان تفتح البورت لجهازك (في compose: [["9229:9229"]] تحت [[ports]]). ده للتطوير بس: أي حد يوصل للبورت ده يقدر ينفّذ أي كود على السيرفر.

### ربط المسارات

~~~text
"localRoot": "$__{workspaceFolder}", "remoteRoot": "/app"
~~~

- [[$__{workspaceFolder}]] متغير VS Code بيتبدّل وقت التشغيل بمسار فولدر المشروع اللي فاتحه.
- [[remoteRoot]] مكان نفس الكود جوه الـ container.

| عندك (localRoot) | جوه الـ container (remoteRoot) |
|---|---|
| [[D:\myapp\src\server.js]] | [[/app/src/server.js]] |

لما تحط breakpoint في الملف عندك، VS Code بيشيل [[localRoot]] من أول المسار ويحط [[remoteRoot]] مكانه، فـ Node يفهم انت تقصد أنهي ملف. لو المسار ده غلط، الـ breakpoint بيفضل رمادي ومبيقفش.

---

## ٤. التشغيل

1. Ctrl+Shift+D يفتح Run and Debug.
2. اختار الإعداد من القايمة اللي فوق.
3. F9 على سطر يحط breakpoint (نقطة حمرا).
4. F5 يبدأ.

---

## الخلاصة

| المفتاح | بيعمل إيه |
|---|---|
| [[type]] | أنهي debugger ([[node]] للسيرفر) |
| [[request]] | [[launch]] يشغّل، و [[attach]] يتصل بواحد شغال |
| [[runtimeExecutable]] + [[runtimeArgs]] | الأمر نفسه ([[npm run dev]]) |
| [[skipFiles]] | ملفات F11 ميدخلهاش |
| [[port]] + [[restart]] | بورت [[--inspect]]، وإعادة الاتصال |
| [[localRoot]] + [[remoteRoot]] | ربط مسار جهازك بمسار الـ container |

> [[launch]] لو VS Code هيشغّل، و [[attach]] لو البرنامج شغال بـ [[--inspect]] لوحده. والـ container لازم [[0.0.0.0]].`,
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
          teach: R`## Next.js فيه عالمين، فمحتاج debugger لكل واحد

كود Next.js بيتنفّذ في مكانين: جزء على السيرفر (Node) وجزء في المتصفح. الـ debugger بتاع Node مبيشوفش المتصفح، والعكس. فالملف ده فيه إعداد لكل ناحية، وإعداد تالت بيشغّلهم مع بعض.

| الكود | بيتنفّذ فين | الإعداد اللي يقف فيه |
|---|---|---|
| Server Components و route handlers ([[route.ts]]) و server actions | السيرفر | [[Next.js: server]] |
| أي ملف أوله [["use client"]]، زي [[onClick]] و [[useState]] | المتصفح | [[Next.js: client]] |

---

## ١. الإعداد الأول: السيرفر

~~~text
"name": "Next.js: server", "type": "node-terminal", "request": "launch",
"command": "npm run dev -- --inspect"
~~~

- [[node-terminal]] نوع خاص: بيفتح ترمنال debug ويكتب فيه [[command]]، وأي عملية Node تقوم من الترمنال ده الـ debugger بيتربط بيها. ده نفس JavaScript Debug Terminal بالظبط، بس محفوظ في ملف.
- [[command]] الأمر اللي هيتكتب في الترمنال.

### الـ [[--]] في النص بتعمل إيه؟

[[npm]] نفسه عنده options، فلو كتبت [[--inspect]] على طول npm بيفتكرها ليه هو. الـ [[--]] معناها «اللي بعدي مش ليك يا npm، عدّيه للسكربت». جربناها على سكربت صغير بيطبع الـ arguments اللي وصلته ([[package.json]] فيه [["dev": "node show-args.js"]])، على ويندوز بـ npm 11:

~~~powershell
npm run dev -- --inspect
~~~

~~~text الناتج
> dev
> node show-args.js --inspect

args: [ '--inspect' ]
~~~

السطر اللي أوله [[>]] هو الأمر اللي npm شغّله فعلًا: [[--inspect]] اتلزقت في آخره. ومن غير [[--]]:

~~~powershell
npm run dev --inspect
~~~

~~~text الناتج
npm warn Unknown cli config "--inspect". This will stop working in the next major version of npm.

> dev
> node show-args.js

args: []
~~~

npm أكل الكلمة وماعدّاهاش. في Next.js سكربت [[dev]] هو [[next dev]]، فالأمر بيبقى [[next dev --inspect]]، و Next بيشغّل سيرفره بالـ inspector.

### لو monorepo

لو التطبيق في [[apps/web]] مش في الجذر، ضيف للإعداد ده:

~~~text
"cwd": "$__{workspaceFolder}/apps/web"
~~~

[[cwd]] اختصار current working directory: الفولدر اللي الأمر يتشغّل منه.

---

## ٢. الإعداد التاني: المتصفح

~~~text
"name": "Next.js: client", "type": "chrome", "request": "launch",
"url": "http://localhost:3000"
~~~

- [[chrome]] بيفتح نافذة Chrome **جديدة ومنفصلة** (بـ profile مؤقت، مش Chrome بتاعك اللي فيه الحسابات) ومتوصلة بـ VS Code.
- [[url]] الصفحة اللي تتفتح فيها: عنوان الـ dev server. [[localhost]] يعني جهازك، و [[3000]] البورت الافتراضي لـ Next.

المتصفح بيشغّل JavaScript متبني ومضغوط، مش ملفات [[.tsx]] بتاعتك. اللي بيربط الاتنين اسمه **source maps**: ملفات بتقول «السطر ده في الكود المتبني جاي من السطر ده في [[page.tsx]]»، فالـ breakpoint اللي في ملفك بيقف صح.

لو عندك Edge بدل Chrome: [["type": "msedge"]].

---

## ٣. الاتنين بضغطة: [[compounds]]

~~~text
"compounds": [{ "name": "Next.js: both", "configurations": ["Next.js: server", "Next.js: client"] }]
~~~

- [[compounds]] لستة «مجموعات». كل مجموعة ليها [[name]] بيظهر في القايمة زي أي إعداد.
- [[configurations]] هنا أسامي الإعدادات اللي فوق، **مكتوبة بالظبط** زي [[name]] بتاعهم (الحروف والمسافات). اسم غلط يعني VS Code مش لاقيه.

F5 على [[Next.js: both]] بيشغّل الاتنين، وتلاقي في شريط الـ debug قايمة تختار منها أنهي session.

---

## الخلاصة

| الإعداد | النوع | بيقف في |
|---|---|---|
| [[Next.js: server]] | [[node-terminal]] + [[npm run dev -- --inspect]] | كود السيرفر |
| [[Next.js: client]] | [[chrome]] على [[localhost:3000]] | كود المتصفح ([["use client"]]) |
| [[Next.js: both]] | [[compounds]] | الاتنين |

> الـ breakpoint مبيقفش؟ اسأل الأول: الكود ده بيتنفّذ فين؟ وتأكد إنك بتجرّب في نافذة Chrome اللي VS Code فتحها. والإعدادات دي من توثيق Next.js للـ debugging (مفيش مشروع Next اتشغّل هنا)، والملف نفسه اتأكدنا إنه JSON سليم بـ Node.`,
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
          teach: R`## task = أمر من أوامر المشروع ليه اسم، والأخطاء بتاعته بتروح Problems

[[tasks.json]] بيحفظ أوامر بتشغّلها كتير (typecheck و lint و build) كـ **tasks**: كل واحدة ليها اسم، وتشغّلها من Terminal ثم Run Task أو باختصار. والميزة الكبيرة إن VS Code بيقرا الـ output بتاعها ويحط كل غلط في لوحة Problems، ودوسة على الغلط تفتح الملف على السطر.

---

## ١. أول الملف

~~~text
"version": "2.0.0",
"tasks": [ ... ]
~~~

- [[version]] هنا [[2.0.0]]، **مش** [[0.2.0]] زي [[launch.json]]. كل ملف ليه نسخة شكل خاصة بيه، فمتنسخهاش من التاني.
- [[tasks]] لستة، كل [[{ }]] جواها task واحدة.

---

## ٢. الـ task الأولى: typecheck

~~~text
"label": "typecheck", "type": "npm", "script": "typecheck",
~~~

| المفتاح | القيمة | معناها |
|---|---|---|
| [[label]] | [[typecheck]] | اسم الـ task اللي بيظهر في Run Task، وبيتنادى بيه من أي حتة تانية |
| [[type]] | [[npm]] | شغّل سكربت من [[package.json]] |
| [[script]] | [[typecheck]] | اسم السكربت، فالأمر اللي هيتشغّل [[npm run typecheck]] |

السكربت نفسه لازم يبقى موجود في [[package.json]]:

~~~text package.json
"scripts": { "typecheck": "tsc --noEmit" }
~~~

[[tsc]] هو الـ TypeScript compiler، و [[--noEmit]] يعني «افحص الأنواع بس، متطلعش ملفات [[.js]]». ولو مش عايز npm، فيه [["type": "shell"]] مع [["command": "npx tsc --noEmit"]].

### [[problemMatcher]]: إزاي VS Code بيقرا الأخطاء

~~~text
"problemMatcher": "$tsc",
~~~

الـ problem matcher قالب بيقول لـ VS Code «الأخطاء في الـ output شكلها كده». و [[$tsc]] قالب جاهز في VS Code لشكل أخطاء TypeScript. عشان تفهمه، ده غلط حقيقي من [[tsc]] (اتشغّل جوه Docker في [[node:22-slim]] بـ TypeScript 5، على ملف فيه [[const port: number = "3000";]]):

~~~bash
npx -p typescript@5 tsc --noEmit server.ts
~~~

~~~text الناتج
server.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

نفكّ السطر:

| الحتة | معناها |
|---|---|
| [[server.ts]] | الملف |
| [[(1,7)]] | السطر ١، العمود ٧ (مكان كلمة [[port]]) |
| [[error]] | نوعه: غلط مش تحذير |
| [[TS2322]] | رقم الغلط في TypeScript، تقدر تدوّر بيه |
| بعد [[:]] | الرسالة نفسها |

الـ matcher بيمسك الحتت دي، ويعمل منها سطر في Problems: الملف والمكان والرسالة. وكمان [[tsc]] لما يطلع في ترمنال بيكتب شكل ملوّن ([[server.ts:1:7 - error TS2322: ...]])، و [[$tsc]] فاهم الشكلين. ولو [[tsc]] لقى أخطاء بيخرج بـ exit code [[2]] (جربناها: [[exit=2]])، فـ VS Code بيعرف إن الـ task فشلت.

### [[group]]: Ctrl+Shift+B

~~~text
"group": { "kind": "build", "isDefault": true }
~~~

- [[kind: build]] الـ task دي من نوع build.
- [[isDefault: true]] هي الـ build الافتراضي، فـ Ctrl+Shift+B (Shift+Cmd+B على الماك) يشغّلها على طول من غير ما يسألك.

---

## ٣. الـ task التانية: lint

~~~text
"label": "lint", "type": "npm", "script": "lint",
"problemMatcher": "$eslint-stylish"
~~~

نفس الفكرة: [[npm run lint]]. بس الأخطاء شكلها مختلف، فالـ matcher مختلف. [[stylish]] اسم الشكل الافتراضي اللي ESLint بيطبع بيه: اسم الملف في سطر، وتحته كل غلط في سطر فيه [[line:column]] والنوع والرسالة واسم القاعدة. و [[$eslint-stylish]] **مش** جوه VS Code نفسه، ده جاي من extension الـ ESLint (عن الـ docs، ESLint ما اتشغّلش هنا). ومفيش [[group]] هنا، فبتشغّلها من Run Task.

---

## الخلاصة

| المفتاح | بيعمل إيه |
|---|---|
| [[label]] | اسم الـ task |
| [[type: npm]] + [[script]] | بيشغّل [[npm run <script>]] |
| [[problemMatcher]] | شكل الأخطاء، عشان تروح Problems |
| [[group]] + [[isDefault]] | تشتغل بـ Ctrl+Shift+B |

> [[tasks.json]] نسخته [[2.0.0]]، و [[launch.json]] نسخته [[0.2.0]]. ومن غير problem matcher الأخطاء بتفضل نص في الترمنال ومبتوصلش Problems.`,
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
    }
]);
