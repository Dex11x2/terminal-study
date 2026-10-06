// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "Git من جوه المحرر",
      l: 2,
      n: "تشوف التغيير قبل ما تضيفه، وتضيف جزء من ملف، وتحل conflict، وترجّع ملف ضاع",
      items: [
        {
          cmd: "Ctrl+Shift+G",
          title: "راجع التعديلات وضيف جزء من ملف واعمل commit",
          desc: R`Ctrl+Shift+G بيفتح Source Control: الملفات المتغيرة تحت Changes، والكليك على أي ملف بيفتح diff قبل وبعد. الـ + جنب الملف بيعمل stage، وجوه الـ diff تحدد سطور وكليك يمين ثم Stage Selected Ranges فتضيف جزء من الملف بس.

تكتب الرسالة فوق و Ctrl+Enter يعمل commit. وجنب أرقام السطور في أي ملف فيه شريط ملون (أخضر للجديد، وأزرق للمتعدّل، وسهم أحمر للممسوح)، والكليك عليه بيعرض التغيير.`,
          example: R`Ctrl+Shift+G                 Source Control (Ctrl+Shift+G on Mac too)
click a file                 diff: last commit vs your changes
select lines, right-click    Stage Selected Ranges
Ctrl+Enter                   commit, from the message box (Cmd+Enter on Mac)`,
          try: "عدّل حاجتين ملهمش علاقة ببعض في نفس الملف (fix وتنسيق). ضيف الـ fix بس بـ Stage Selected Ranges واعمل commit، والتاني في commit لوحده.",
          flag: "keys",
          deep: {
            why: "[[git add .]] من غير ما تبص بيدخّل console.log و [[.env]] وتعديلات مش مقصودة. الـ diff في المحرر بيخليك تراجع كل سطر قبل ما يدخل.",
            how: R`فيه قسمين: Changes (مش متضاف) و Staged Changes (هيدخل الـ commit). نفس الملف ممكن يبقى في الاتنين لو ضفت جزء منه، ودا نفس [[git add -p]] بس بعينك.

الـ diff بيقارن اللي على الديسك بآخر commit (أو باللي متضاف)، والجهة اليمين تقدر تعدّل فيها على طول.

لو دوست Commit ومفيش حاجة متضافة، ممكن يسألك يضيف الكل، ودا بيتحكم فيه [[git.enableSmartCommit]]. الأوامر نفسها في تاب git، درس «git add / commit».`,
            when: "كل commit، خصوصًا لو عدّلت كذا حاجة ملهمش علاقة ببعض.",
            mistakes: "تدوس + على كل حاجة أو Commit All من غير ما تفتح الملفات. و Discard Changes (السهم الملفوف) بيمسح تعديلاتك من غير سلة محذوفات: لو دوسته بالغلط، Timeline (بعد درس) ممكن ينقذك."
          },
          teach: R`## الفكرة في سطر

Ctrl+Shift+G بيفتح **Source Control**: الملفات اللي اتغيرت، والـ diff بتاع كل واحد، والـ stage، والـ commit. كله من غير ما تكتب أوامر git. نفك سطور المثال.

---

## ١. افتح Source Control

~~~text
Ctrl+Shift+G                 Source Control (Ctrl+Shift+G on Mac too)
~~~

الـ G من Git. على الماك كمان **Control**+Shift+G (ده اللي في جدول الماك الرسمي). القسم بيبان فيه:

| القسم | معناه | زي الأمر |
|---|---|---|
| Changes | ملفات اتغيرت ومش متضافة | اللي [[git status]] بيقول عليه not staged |
| Staged Changes | ملفات متضافة وهتدخل الـ commit الجاي | بعد [[git add]] |

وجنب كل ملف حرف: [[M]] = Modified (اتعدّل)، و [[U]] = Untracked (جديد ومش في git)، و [[D]] = Deleted.

---

## ٢. الكليك على ملف: diff

~~~text
click a file                 diff: last commit vs your changes
~~~

**diff** يعني الفرق. بيفتح شاشة نصين: الشمال النسخة اللي في آخر commit، واليمين نسختك دلوقتي. السطور الجديدة خلفيتها خضرا، والممسوحة حمرا. والجهة اليمين ملف عادي تقدر تعدّل فيه.

---

## ٣. ضيف جزء من الملف بس

~~~text
select lines, right-click    Stage Selected Ranges
~~~

جوه الـ diff، حدد سطور، وكليك يمين، و **Stage Selected Ranges**: السطور دي بس اللي بتتضاف، والباقي من نفس الملف بيفضل مش متضاف. الأمر ده ليه كمان اختصار في الجدول الرسمي: Ctrl+K Ctrl+Alt+S.

ده نفس [[git add -p]]. جربته في repo تجربة على ويندوز 11: ملف فيه ١٢ سطر، عدّلت سطر 2 (fix) وسطر 11 (تنسيق)، وضفت تعديل سطر 2 بس:

~~~bash
git status --short
~~~

~~~text الناتج
MM a.txt
~~~

الحرفين: الأول ([[M]]) = فيه حاجة **متضافة** من الملف، والتاني ([[M]]) = فيه حاجة **لسه مش متضافة** منه. يعني نفس الملف في القسمين، وده اللي هتشوفه في VS Code: الملف تحت Staged Changes وتحت Changes مع بعض.

~~~text git diff --cached (المتضاف)
+line 2 FIX
~~~

~~~text git diff (اللي لسه)
-line 11
+line 11 STYLE
~~~

---

## ٤. الـ commit

~~~text
Ctrl+Enter                   commit, from the message box (Cmd+Enter on Mac)
~~~

اكتب رسالة الـ commit في الخانة اللي فوق، و Ctrl+Enter. ده بيعمل commit **للـ Staged Changes بس**. فالـ fix يدخل لوحده، والتنسيق في commit تاني.

ولو مفيش حاجة staged، VS Code بيسألك لو عايز يضيف كل حاجة ويعمل commit (الإعداد [[git.enableSmartCommit]] بيتحكم في ده).

---

## الشريط الملون جنب أرقام السطور

في أي ملف مفتوح، جنب رقم السطر:

| اللون | معناه |
|---|---|
| أخضر | سطر جديد |
| أزرق | سطر اتعدّل |
| سهم أحمر صغير | سطور اتمسحت هنا |

الكليك عليه بيعرض التغيير مكانه.

---

## الخلاصة

~~~text
Ctrl+Shift+G            Source Control (Control على الماك كمان)
كليك على ملف            diff
Stage Selected Ranges   ضيف سطور بس
Ctrl+Enter              commit للمتضاف
~~~`,
          sol: R`في Source Control هتلاقي الملف تحت «Changes». دوس عليه يفتح diff: الشمال آخر commit واليمين نسختك. حدد سطور الـ fix بس في الجزء اليمين، كليك يمين ثم «Stage Selected Ranges». الملف هيظهر مرتين: تحت «Staged Changes» (الـ fix) وتحت «Changes» (التنسيق). اكتب رسالة و Ctrl+Enter يعمل commit للـ staged بس. وبعدين commit تاني للباقي.

لو دوست Ctrl+Enter ومفيش حاجة staged، VS Code هيسألك «There are no staged changes to commit. Would you like to stage all your changes?»، لو قلت Yes هيعمل commit لكله. اتأكد بـ [[git log -p -2]] إن كل commit فيه اللي المفروض بس.`
        },
        {
          cmd: "Merge Editor",
          title: "حل الـ conflict وانت شايف الجهتين والنتيجة",
          desc: R`لما [[git merge]] أو [[git pull]] يطلّع conflict، الملف بيظهر تحت Merge Changes. فوق كل conflict فيه أزرار: Accept Current و Accept Incoming و Accept Both. ولو الـ conflict معقد، زرار Resolve in Merge Editor بيفتح ٣ أجزاء: Incoming و Current فوق، و Result تحت.

بعد ما تخلص: احفظ، واعمل stage للملف، وكمّل الـ merge.`,
          example: R`Ctrl+Shift+G                        conflicted files: under Merge Changes
Accept Current / Incoming / Both    buttons above each conflict
Resolve in Merge Editor             Incoming | Current on top, Result below
+ (Stage Changes)                   mark the file as resolved
Commit                              finishes the merge`,
          try: "في repo تجربة: اعمل branch وعدّل نفس السطر فيه وفي main، واعمل merge، وحل الـ conflict مرة بالأزرار ومرة في Merge Editor.",
          flag: "keys",
          deep: {
            why: "علامات [[<<<<<<<]] و [[=======]] و [[>>>>>>>]] جوه الملف سهل تتلخبط فيها وتسيب علامة أو تمسح كود. المحرر بيوريك كل جهة لوحدها.",
            how: R`في merge عادي، Current هو الـ branch اللي انت عليه، و Incoming اللي داخل عليه. بس في rebase المعنى بيتقلب: Current هو الـ base الجديد، و Incoming هو الـ commit بتاعك اللي بيتعاد. فمتختارش بالاسم، بص على الكود.

Accept Both بيحط الاتنين ورا بعض، وغالبًا محتاج تعديل بإيدك (import مكرر مثلًا). والـ Result في Merge Editor ملف عادي تقدر تكتب فيه.

المفاهيم والأوامر في تاب git، درس «الـ conflicts».`,
            when: "أي conflict في merge أو pull أو rebase أو stash pop.",
            mistakes: "تدوس Accept Current على كل الـ conflicts عشان تخلص، فتمسح شغل زميلك. أو Accept Both في [[package-lock.json]]: الملف ده ميتحلّش بإيدك، خد نسخة واحدة واعمل [[npm install]] يظبطه. وتنسى تشغّل التطبيق بعد الحل: مفيش علامات مش معناها إن الكود شغال."
          },
          teach: R`## الفكرة في سطر

لما git يلاقي نفس السطر اتغير في الـ branch بتاعك وفي اللي داخل عليه، بيعمل **conflict** ويسيبلك القرار. VS Code بيوريك الجهتين وأزرار تختار بيها. نفك المثال، ونبدأ بشكل الـ conflict نفسه.

---

## الـ conflict شكله إيه؟

عملت repo تجربة على ويندوز 11: ملف فيه [[const port = 3000;]]، وفي branch اسمه feature غيرته لـ 8080، وفي main لـ 5000، وبعدين من main:

~~~bash
git merge feature
~~~

~~~text الناتج
Auto-merging app.js
CONFLICT (content): Merge conflict in app.js
Automatic merge failed; fix conflicts and then commit the result.
~~~

والملف بقى كده:

~~~text app.js
<<<<<<< HEAD
const port = 5000;
=======
const port = 8080;
>>>>>>> feature
~~~

| العلامة | معناها |
|---|---|
| [[<<<<<<< HEAD]] | بداية نسختك (الـ branch اللي انت واقف عليه) |
| [[=======]] | الفاصل |
| [[>>>>>>> feature]] | نهاية النسخة اللي داخلة (من feature) |

و [[git status --short]] قال [[UU app.js]]: الـ [[UU]] معناها Unmerged، الجهتين غيّروا.

---

## ١. الملف في Source Control

~~~text
Ctrl+Shift+G                        conflicted files: under Merge Changes
~~~

الملفات اللي فيها conflict بتظهر في قسم لوحدها اسمه **Merge Changes**، قبل Changes.

---

## ٢. الأزرار فوق كل conflict

~~~text
Accept Current / Incoming / Both    buttons above each conflict
~~~

لما تفتح الملف، فوق العلامات بتلاقي أزرار صغيرة:

| الزرار | بيسيب | في مثالنا |
|---|---|---|
| Accept Current Change | نسختك (HEAD) | [[const port = 5000;]] |
| Accept Incoming Change | اللي داخل | [[const port = 8080;]] |
| Accept Both Changes | الاتنين ورا بعض | السطرين، وتمسح واحد بإيدك |

والعلامات بتتمسح لوحدها.

> في **rebase** المعنى بيتقلب: Current هو الـ branch اللي بتعمل عليه rebase، و Incoming هو الـ commit بتاعك. فاختار بالكود مش بالاسم.

---

## ٣. Merge Editor

~~~text
Resolve in Merge Editor             Incoming | Current on top, Result below
~~~

زرار **Resolve in Merge Editor** بيفتح شاشة ٣ أجزاء:

~~~text
| Incoming (feature)  | Current (HEAD) |
|          Result (الملف النهائي)        |
~~~

جنب كل تغيير فوق checkbox بيضيفه للـ Result، والـ Result ملف عادي تقدر تكتب فيه. ولما تخلص: **Complete Merge**.

---

## ٤. علّم إنه اتحل

~~~text
+ (Stage Changes)                   mark the file as resolved
~~~

الـ + جنب الملف = [[git add app.js]]. ده اللي بيقول لـ git «خلاص اتحل».

---

## ٥. كمّل الـ merge

~~~text
Commit                              finishes the merge
~~~

الـ commit هنا بيعمل **merge commit**: commit ليه أبين (الـ branch بتاعك والتاني).

---

## الخلاصة

| الخطوة | في VS Code | زي الأمر |
|---|---|---|
| شوف الملفات | Merge Changes | [[git status]] |
| اختار | Accept Current / Incoming / Both | تعديل بإيدك |
| أو | Resolve in Merge Editor | |
| علّم إنه اتحل | + | [[git add]] |
| خلّص | Commit | [[git commit]] |

بعد الحل شغّل التطبيق: مفيش علامات مش معناها إن الكود شغال.`,
          sol: R`بعد [[git merge]] هيقول [[CONFLICT (content): Merge conflict in file.txt]]. في VS Code الملف هتلاقي فيه [[<<<<<<< HEAD]] و [[=======]] و [[>>>>>>> branch]]، وفوق الـ conflict أزرار «Accept Current Change | Accept Incoming Change | Accept Both Changes». المرة الأولى دوس واحد منهم. المرة التانية (اعمل conflict تاني)، دوس «Resolve in Merge Editor» تحت يمين: Incoming و Current فوق، و Result تحت، و checkbox جنب كل تعديل. بعد ما تخلص «Complete Merge»، ثم commit.

«Current» يعني الـ branch اللي انت واقف فيه (main)، و «Incoming» يعني اللي بتعمله merge. ولو عملت merge من الاتجاه التاني هيتبدلوا، وده مصدر لخبطة كتير. و [[git log --oneline --graph]] في الآخر المفروض يوريك merge commit فيه أبين.`
        },
        {
          cmd: "Timeline",
          title: "رجّع نسخة قديمة من ملف، وشوف مين غيّر السطر ده",
          desc: R`تحت شجرة الملفات فيه قسم Timeline: بيعرض تاريخ الملف المفتوح، الـ commits بتاعته وكمان كل مرة حفظته (Local History) حتى لو مفيش commit. الكليك على أي نقطة بيفتح diff، وتقدر ترجّع النسخة دي.

وعشان تعرف مين غيّر سطر معين وامتى: Git: Toggle Git Blame Editor Decoration من Command Palette بيكتب في آخر السطر اسم آخر واحد غيّره ورسالة الـ commit.`,
          example: R`Ctrl+Shift+E                              Explorer: Timeline is the last section
click an entry                            diff that version against now
Local History: Find Entry to Restore      search saved versions of any file
Git: Toggle Git Blame Editor Decoration   who changed this line, and when`,
          try: "عدّل ملف واحفظ ٣ مرات بتعديلات مختلفة، وارجع لتاني نسخة من Timeline. وشغّل الـ blame على ملف قديم في مشروعك.",
          flag: "keys",
          deep: {
            why: "عملت Discard بالغلط، أو عدّلت ملف لحد ما باظ ومفيش commit ترجعله. Local History بيحفظ نسخة مع كل save. والـ blame بيجاوب «ليه السطر ده كده؟» بإنه يوديك للـ commit.",
            how: R`Local History بيتخزن على جهازك بس (مش في Git)، وبيحتفظ بعدد محدود من النسخ لكل ملف ([[workbench.localHistory.maxFileEntries]]). بيشتغل حتى في ملفات مش في Git زي [[.env]].

Local History: Find Entry to Restore بيدوّر في النسخ المحفوظة لأي ملف، حتى لو الملف نفسه اتمسح.

الـ blame المدمج ليه إعدادين: [[git.blame.editorDecoration.enabled]] (في السطر) و [[git.blame.statusBarItem.enabled]] (في شريط الحالة). GitLens extension بتعمل ده وأكتر بكتير، بس أتقل. وفي الترمنال: درس «git log -S / blame» في تاب git.`,
            when: "ملف باظ ومفيش commit، أو عايز تفهم تاريخ سطر قبل ما تغيّره.",
            mistakes: "تعتمد على Local History كـ backup: ده على جهاز واحد وبيتمسح مع الوقت، والـ commit والـ push هما الـ backup. و Discard لملف جديد مكانش في Git خالص بيمسحه، وساعتها Local History أو سلة المحذوفات فرصتك الوحيدة."
          },
          teach: R`## الفكرة في سطر

**Timeline** قسم تحت شجرة الملفات بيعرض تاريخ الملف المفتوح: الـ commits بتاعته، وكمان كل مرة حفظته (**Local History**). و Git Blame بيقولك مين غيّر كل سطر. نفك المثال.

---

## ١. فين Timeline؟

~~~text
Ctrl+Shift+E                              Explorer: Timeline is the last section
~~~

Ctrl+Shift+E بيفتح الـ Explorer، و Timeline آخر قسم فيه تحت (ممكن يكون مقفول، دوس على اسمه). بيعرض نقط من مصدرين:

| المصدر | بيتسجّل إمتى | محفوظ فين |
|---|---|---|
| Git | كل commit فيه الملف | في الـ repo |
| Local History (اسمه في اللستة File Saved) | كل مرة تحفظ | على جهازك بس |

---

## ٢. افتح نسخة قديمة

~~~text
click an entry                            diff that version against now
~~~

الكليك على أي نقطة بيفتح diff بين النسخة دي والنسخة الحالية. وكليك يمين عليها فيه **Restore Contents**: يرجّع الملف للنسخة دي.

### أرقام Local History

من إعدادات VS Code 1.140 الافتراضية:

| الإعداد | الافتراضي | معناه |
|---|---|---|
| [[workbench.localHistory.maxFileEntries]] | 50 | أقصى عدد نسخ لكل ملف، والأقدم بيتمسح |
| [[workbench.localHistory.maxFileSize]] | 256 | الملف الأكبر من 256 KB مش بيتحفظ |
| [[workbench.localHistory.mergeWindow]] | 10 | لو حفظت تاني قبل ما تعدّي 10 ثواني، النسخة الجديدة بتاخد مكان اللي قبلها |

يعني لو حفظت ٣ مرات ورا بعض بسرعة، هتلاقي نسخة واحدة مش ٣. استنى أكتر من ١٠ ثواني بين كل حفظ. (الأرقام والمعاني دي من وصف الإعدادات نفسها جوه VS Code).

---

## ٣. دوّر في النسخ المحفوظة

~~~text
Local History: Find Entry to Restore      search saved versions of any file
~~~

أمر من الـ Command Palette. بيدوّر في النسخ المحفوظة لأي ملف، **حتى لو الملف نفسه اتمسح**.

---

## ٤. مين غيّر السطر ده؟

~~~text
Git: Toggle Git Blame Editor Decoration   who changed this line, and when
~~~

**blame** يعني «لوم»، والأمر بيقول لكل سطر: آخر commit غيّره، ومين عمله، وإمتى. **Toggle** يعني شغّل لو مقفول واقفل لو شغال، و **Editor Decoration** يعني الكلام الرمادي اللي بيتكتب في آخر السطر في المحرر.

| الإعداد | بيعرض الـ blame فين |
|---|---|
| [[git.blame.editorDecoration.enabled]] | في آخر السطر |
| [[git.blame.statusBarItem.enabled]] | في شريط الحالة تحت |

وفي الترمنال نفس المعلومة: [[git blame file]].

---

## الخلاصة

~~~text
Timeline                    تاريخ الملف: commits وحفظات
Restore Contents            رجّع نسخة
Find Entry to Restore       نسخة لملف اتمسح
Toggle Git Blame            مين غيّر السطر
~~~

Local History على جهاز واحد وبيتمسح مع الوقت. الـ backup الحقيقي commit و push.`,
          sol: R`في Explorer تحت خالص قسم Timeline: هتلاقي ٣ مداخل «File Saved» بالوقت (Local History)، وممكن مداخل commits من Git. دوس على التاني يفتح diff بينه وبين النسخة الحالية. كليك يمين عليه ثم «Restore Contents»: الملف هيرجع للنسخة دي. و «Git: Toggle Git Blame Editor Decoration» هيكتب في آخر السطر اسم آخر حد غيّره ومن قد إيه، زي [[Ali, 3 months ago]].

لو Timeline فاضي، يبقى الـ Local History مقفول ([[workbench.localHistory.enabled]])، أو الملف مش جوه workspace مفتوح. ولو الـ blame مش ظاهر، الأمر ده جديد نسبيًا (من 2024)، حدّث VS Code، أو استخدم [[git blame file]] في الترمنال.`
        }
      ]
    },
    {
      t: "Debugger",
      l: 2,
      n: "توقف الكود على سطر وتشوف كل المتغيرات، بدل console.log في عشرين مكان",
      items: [
        {
          cmd: "F9",
          title: "حط نقطة توقف على السطر",
          desc: R`F9 بيحط breakpoint (نقطة حمرا) على السطر اللي فيه المؤشر، أو دوس جنب رقم السطر. لما الكود يوصل هنا وهو شغال بالـ debugger، بيقف وتشوف كل المتغيرات.

كليك يمين في نفس المكان بيدّيك نوعين أذكى: Conditional Breakpoint بيقف بس لو شرط اتحقق ([[user.id === 42]])، و Logpoint مش بيقف خالص، بيطبع رسالة زي [[order {order.id} total={order.total}]] من غير ما تعدّل الكود.`,
          example: R`F9                     toggle breakpoint (all systems)
right-click the gutter Add Conditional Breakpoint...
                       order.total > 1000
right-click the gutter Add Logpoint...
                       order {order.id} total={order.total}`,
          try: "في route بيتنادي كتير، حط Logpoint يطبع الـ id، و Conditional Breakpoint يقف على id معين بس، وشغّل بـ F5.",
          flag: "keys",
          deep: {
            why: "breakpoint عادي في loop بيتنفذ ١٠٠٠ مرة بيوقفك ١٠٠٠ مرة. و console.log محتاج تعدّل وتحفظ وتعيد تشغيل وتفتكر تمسحه.",
            how: R`الـ breakpoints بتتحفظ في VS Code مش في الكود، فمفيش حاجة تدخل Git. قسم Breakpoints في Run and Debug بيعرضهم كلهم، وتقدر تقفلهم مؤقتًا من غير ما تمسحهم.

الشرط أي expression بلغة البرنامج بيتقيّم في اللحظة دي. وفيه كمان Hit Count: يقف في المرة العاشرة مثلًا.

الـ Logpoint بيطبع في Debug Console، واللي بين الأقواس المعووجة بيتقيّم. console.log من غير ما تلمس الكود.`,
            when: "أي bug محتاج تشوف فيه قيم المتغيرات في لحظة معينة.",
            mistakes: "breakpoint رمادي مش أحمر معناه الـ debugger مش قادر يربطه بالكود الشغال: غالبًا مفيش source maps، أو اللي شغال هو dist مش src. أو انت شغّلت بـ [[npm run dev]] في ترمنال عادي مش من الـ debugger، فمفيش حد يقف."
          },
          teach: R`## الفكرة في سطر

F9 بيحط **breakpoint** (نقطة توقف) على السطر: لما البرنامج يوصله وهو شغال بالـ debugger، بيقف وتشوف كل المتغيرات. وفيه نوعين أذكى بالكليك يمين. نفك المثال.

---

## ١. breakpoint عادي

~~~text
F9                     toggle breakpoint (all systems)
~~~

- **toggle**: لو مفيش نقطة حطها، ولو فيه شيلها.
- بتظهر **دايرة حمرا** جنب رقم السطر. وممكن تدوس في المكان ده بالماوس (اسمه الـ gutter: العمود الضيق جنب أرقام السطور).

البرنامج بيقف **قبل** ما ينفّذ السطر ده.

---

## ٢. Conditional Breakpoint: بشرط

~~~text
right-click the gutter Add Conditional Breakpoint...
                       order.total > 1000
~~~

كليك يمين جنب رقم السطر، ثم **Add Conditional Breakpoint...**، واكتب شرط بلغة البرنامج نفسه. السطر التاني في المثال هو الشرط:

- [[order.total]]: قيمة total جوه object اسمه order.
- [[> 1000]]: أكبر من ألف.

البرنامج مش هيقف غير لما الشرط يبقى true. فلو الكود ده بيتنفّذ ١٠٠٠ مرة، هيقف بس على الطلبات الكبيرة. وفيه في نفس القايمة **Hit Count**: اقف في المرة رقم كذا.

---

## ٣. Logpoint: اطبع من غير ما تقف

~~~text
right-click the gutter Add Logpoint...
                       order {order.id} total={order.total}
~~~

**Logpoint** مش بيوقف البرنامج خالص، بيطبع رسالة في **Debug Console** كل ما السطر يتنفّذ. السطر التاني هو الرسالة:

| الجزء | معناه |
|---|---|
| [[order]] | كلام عادي بيتطبع زي ما هو |
| [[{order.id}]] | اللي جوه الأقواس المعووجة بيتحسب: قيمة order.id |
| [[total=]] | كلام عادي |
| [[{order.total}]] | قيمة order.total |

فلو order.id = 42 و order.total = 1500، بيطبع:

~~~text Debug Console
order 42 total=1500
~~~

ده زي [[console.log]] بالظبط، بس من غير ما تعدّل الكود أو تفتكر تمسحه. وشكله في الـ gutter معيّن (diamond) بدل الدايرة.

---

## الأشكال اللي هتشوفها

| الشكل | معناه |
|---|---|
| دايرة حمرا | breakpoint شغال |
| دايرة فيها علامة | conditional |
| معيّن | logpoint |
| دايرة رمادي فاضية | unbound: الـ debugger مش لاقي السطر ده في الكود اللي شغال |

الرمادي غالبًا معناه إنك شغّلت من ترمنال عادي مش بالـ debugger، أو TypeScript من غير source maps.

> الأشكال والقوايم من توثيق VS Code (Debugging). الـ breakpoints بتتحفظ في VS Code مش في الكود، فمفيش حاجة بتدخل git.

---

## الخلاصة

~~~text
F9                          breakpoint عادي
Add Conditional Breakpoint  اقف لو الشرط اتحقق
Add Logpoint                اطبع {expression} من غير ما تقف
~~~`,
          sol: R`Logpoint بيظهر كنقطة على شكل معين (diamond) بدل الدايرة الحمرا. كل ما الـ route يتنادى، هيطبع في Debug Console حاجة زي [[order 42 total=1500]] من غير ما يقف. الـ Conditional Breakpoint دايرة حمرا فيها علامة، والبرنامج هيقف بس لما الشرط يبقى true، زي [[req.params.id === "42"]].

لو الـ breakpoint طلع دايرة رمادي فاضية بدل حمرا، ده «Unbound breakpoint»: الـ debugger مش شايف الملف ده في الكود اللي شغال (غالبًا TypeScript من غير source maps، أو شغّلت السيرفر من ترمنال عادي مش بـ F5). ولو الـ logpoint طبع [[{order.id}]] حرفيًا، يبقى المتغير اسمه مختلف في المكان ده. وخد بالك إن [[req.params.id]] string، فـ [[=== 42]] كرقم مش هيقف أبدًا.`
        },
        {
          cmd: "F5",
          title: "شغّل بالـ debugger وامشي سطر سطر",
          desc: R`F5 بيشغّل الـ debug config المختار (أو يسألك تعمل واحد). لما يقف على breakpoint: F10 ينفّذ السطر ويروح للي بعده، و F11 يدخل جوه الدالة، و Shift+F11 يخرج منها، و F5 يكمّل للـ breakpoint الجاي، و Shift+F5 يوقف.

على الشمال: Variables فيها كل المتغيرات، و Watch تكتب فيها expression يفضل متحدّث، و Call Stack يوريك مين نادى مين. وتحت، Debug Console تكتب فيها أي كود ويتنفّذ في اللحظة دي.`,
          example: R`F5                     start / continue
F10 / F11              step over / step into
Shift+F11              step out
Shift+F5               stop
Ctrl+Shift+F5          restart (Shift+Cmd+F5 on Mac)
Ctrl+Shift+D           Run and Debug view (Shift+Cmd+D on Mac)`,
          try: "حط breakpoint في أول route handler، شغّل F5، وامشي بـ F10 لحد الـ query. ضيف [[req.body]] في Watch، واكتب [[JSON.stringify(req.headers)]] في Debug Console.",
          flag: "keys",
          deep: {
            why: "console.log بيوريك اللي انت فاكر تطبعه. الـ debugger بيوريك كل حاجة في اللحظة دي، وتجرّب expressions من غير ما تعيد التشغيل.",
            how: R`F5 من غير launch.json بيحاول يخمّن (Node لملف JS مفتوح مثلًا). في مشروع حقيقي أحسن launch.json (مستوى ٣)، أو JavaScript Debug Terminal (الدرس الجاي).

F10 بيعدّي على الدالة كوحدة واحدة، و F11 بيدخل جواها، ومع await بيستنى الـ promise. والـ Debug Console بيشوف متغيرات المكان اللي انت مختاره في Call Stack.

[[skipFiles]] في launch.json بيخلي F11 ميدخلش جوه node_modules أو Node نفسه.`,
            when: "bug محتاج تتبّع خطوة خطوة، أو عايز تشوف شكل data جاية من API أو DB.",
            mistakes: "تفضل تدوس F11 فتلاقي نفسك جوه Express أو node_modules: Shift+F11 يطلّعك، و skipFiles يمنعها من الأول. وتسيب الـ debugger واقف، فالـ request في المتصفح يعمل timeout وتفتكر فيه مشكلة تانية."
          },
          teach: R`## الفكرة في سطر

F5 بيشغّل البرنامج **جوه الـ debugger**. ولما يقف على breakpoint، بتمشي فيه سطر سطر بـ F10 و F11. نفك كل اختصار.

---

## ١. ابدأ وكمّل

~~~text
F5                     start / continue
~~~

- البرنامج مش شغال؟ F5 بيشغّله بالـ debug config المختار (من launch.json، أو بيسألك).
- واقف على breakpoint؟ F5 بيكمّل لحد الـ breakpoint الجاي.

---

## ٢. امشي خطوة

~~~text
F10 / F11              step over / step into
~~~

خد الكود ده، والبرنامج واقف على السطر 1:

~~~text
const user = getUser(id);    ← واقف هنا
const total = sum(user.orders);
~~~

| الاختصار | الاسم | بيعمل إيه |
|---|---|---|
| F10 | Step Over | ينفّذ السطر كله (ومعاه getUser كلها) ويقف على السطر 2 |
| F11 | Step Into | يدخل **جوه** getUser ويقف على أول سطر فيها |

**over** يعني «من فوق»: بيعدّي على الدالة كوحدة واحدة. و **into** يعني «جوه».

---

## ٣. اطلع من الدالة

~~~text
Shift+F11              step out
~~~

دخلت جوه دالة ومش عايز تكمل فيها سطر سطر؟ Shift+F11 بيكمّلها لآخرها ويرجعك للسطر اللي ناداها.

---

## ٤. وقّف

~~~text
Shift+F5               stop
~~~

بيوقف الـ debug session (والبرنامج نفسه لو الـ debugger هو اللي شغّله).

---

## ٥. أعد التشغيل

~~~text
Ctrl+Shift+F5          restart (Shift+Cmd+F5 on Mac)
~~~

يوقف ويشغّل من الأول. مفيد بعد ما تعدّل الكود.

---

## ٦. شاشة Run and Debug

~~~text
Ctrl+Shift+D           Run and Debug view (Shift+Cmd+D on Mac)
~~~

الـ D من Debug. بيفتح القسم ده في الشريط الجانبي، وفيه وانت واقف:

| الجزء | فيه إيه |
|---|---|
| Variables | كل المتغيرات في المكان ده وقيمها |
| Watch | expressions تكتبها وتفضل متحدّثة مع كل خطوة |
| Call Stack | مين نادى مين لحد ما وصلت هنا |
| Breakpoints | كل النقط، وتقدر تقفلها مؤقتًا |

وتحت في اللوحة **Debug Console**: تكتب فيها أي كود (زي [[JSON.stringify(req.headers)]]) ويتنفّذ في اللحظة دي بمتغيرات المكان اللي واقف فيه.

---

## الخلاصة

| الاختصار | بيعمل إيه |
|---|---|
| F5 | ابدأ / كمّل |
| F10 | السطر الجاي من غير ما تدخل الدوال |
| F11 | ادخل جوه الدالة |
| Shift+F11 | اطلع منها |
| Shift+F5 | وقّف |
| Ctrl+Shift+F5 | أعد التشغيل |
| Ctrl+Shift+D | شاشة Run and Debug |

الاختصارات دي نفسها على الأنظمة التلاتة إلا restart و Run and Debug (Cmd على الماك)، حسب جداول الاختصارات الرسمية.`,
          sol: R`F5 هيشغّل السيرفر في الـ debugger والـ status bar هيتلوّن. اطلب الـ route، الكود هيقف على الـ breakpoint والسطر متظلل أصفر. F10 بينزل سطر سطر من غير ما يدخل جوه الدوال. في Watch ضيف [[req.body]]، هتلاقي الـ object بتاعه (أو [[undefined]] لو مفيش [[express.json()]]). في Debug Console [[JSON.stringify(req.headers)]] يطبع الـ headers كـ string.

لو [[req.body]] طلع [[{}]] أو undefined مع POST، ده مش مشكلة debugger، ده الـ middleware ناقص. ولو F5 سألك «Select debugger»، يبقى مفيش [[launch.json]]، اختار Node.js أو شوف درس JavaScript Debug Terminal. ولو الطلب علّق في المتصفح، ده طبيعي: الـ server واقف عند الـ breakpoint، F5 يكمّل.`
        },
        {
          cmd: "JavaScript Debug Terminal",
          title: "debug لأي أمر npm من غير launch.json",
          desc: R`من السهم جنب + في الترمنال اختار JavaScript Debug Terminal، أو Debug: JavaScript Debug Terminal من Command Palette. أي حاجة Node تشغّلها منه ([[npm run dev]]، [[npx vitest]]، سكربت) الـ debugger بيتربط بيها لوحده، والـ breakpoints بتقف.

وفيه Auto Attach: من Debug: Toggle Auto Attach تختار smart، فأي node تشغّله من أي ترمنال عادي في VS Code بيتربط بالـ debugger.`,
          example: R`Ctrl+Shift+P           Debug: JavaScript Debug Terminal
npm run dev            now breakpoints in server code are hit
Ctrl+Shift+P           Debug: Toggle Auto Attach, then smart`,
          try: "افتح JavaScript Debug Terminal، حط breakpoint في route، وشغّل [[npm run dev]] منه، واطلب الـ route من المتصفح.",
          flag: "keys",
          deep: {
            why: "launch.json لكل سكربت تقيل، وأغلب المشاريع بتتشغل بـ npm scripts فيها tsx أو nodemon أو next. الترمنال ده بيتعامل مع كل ده من غير إعداد.",
            how: R`الترمنال ده بيحط متغير بيئة ([[NODE_OPTIONS]]) بيخلي أي عملية Node تتولد منه تتصل بـ VS Code لوحدها، حتى العمليات الفرعية (زي اللي nodemon بيعيد تشغيلها).

Auto Attach ليه أوضاع: smart (أي سكربت بره node_modules، وأدوات مشهورة زي mocha و ts-node)، و always (أي node)، و onlyWithFlag (بس اللي معاه [[--inspect]])، و disabled.

[[--inspect]] نفسه والـ attach على بورت 9229 في تاب node، درس «الـ debugger».`,
            when: "أسرع بداية debug لأي مشروع Node أو Next.js أو tests.",
            mistakes: "تفتح ترمنال عادي وتستغرب إن الـ breakpoints مش بتقف: لازم JavaScript Debug Terminal أو Auto Attach. و Auto Attach على always بيبطّأ أي أمر node صغير. وفي Docker الترمنال ده مش هيوصل للـ container: محتاج attach على بورت (launch.json في مستوى ٣)."
          },
          teach: R`## الفكرة في سطر

**JavaScript Debug Terminal** ترمنال عادي، بس أي برنامج Node تشغّله منه بيتربط بالـ debugger لوحده. فالـ breakpoints بتشتغل مع [[npm run dev]] من غير ما تكتب launch.json. نفك المثال.

---

## ١. افتحه

~~~text
Ctrl+Shift+P           Debug: JavaScript Debug Terminal
~~~

من الـ Command Palette، أو من السهم جنب الـ + في الترمنال. بيفتح ترمنال جديد اسمه JavaScript Debug Terminal.

### بيعمل إيه من تحت؟

بيحط متغير بيئة اسمه [[NODE_OPTIONS]] في الترمنال ده. المتغير ده Node بيقراه مع **كل** عملية Node بتبدأ، وفيه أمر بيحمّل كود صغير يتصل بـ VS Code. (ده واضح في كود الـ extension اللي اسمها ms-vscode.js-debug جوه VS Code 1.140: بتعدّل [[NODE_OPTIONS]] وبتحط معاه [[VSCODE_INSPECTOR_OPTIONS]]). عشان كده بيشتغل حتى مع العمليات الفرعية: npm بيشغّل nodemon، و nodemon بيشغّل السيرفر، وكلهم بيتربطوا.

---

## ٢. شغّل عادي

~~~text
npm run dev            now breakpoints in server code are hit
~~~

نفس الأمر اللي بتكتبه كل يوم. بس دلوقتي لو فيه breakpoint في كود السيرفر، البرنامج هيقف عنده.

ولما الـ debugger يتصل، Node بيطبع سطر. جربت ده على ويندوز 11 بـ Node 24: شغلت [[node --inspect]] وخليت برنامج تاني يتصل بيه زي ما الـ debugger بيعمل:

~~~text الناتج
Debugger listening on ws://127.0.0.1:9339/a6749255-69f8-4188-b466-44fa16191478
For help, see: https://nodejs.org/learn/getting-started/debugging
Debugger attached.
~~~

| السطر | معناه |
|---|---|
| [[Debugger listening on ws://...]] | Node فتح باب للـ debugger على البورت ده (ws = WebSocket) |
| [[Debugger attached.]] | debugger اتصل فعلًا |

في الـ JavaScript Debug Terminal هتشوف [[Debugger attached.]] أكتر من مرة: مرة لكل عملية Node (npm نفسه، و nodemon، والسيرفر). وده طبيعي.

---

## ٣. Auto Attach

~~~text
Ctrl+Shift+P           Debug: Toggle Auto Attach, then smart
~~~

بدل ترمنال مخصوص، **Auto Attach** بيخلي أي ترمنال عادي في VS Code يتربط بالـ debugger. بتختار وضع، والإعداد اسمه [[debug.javascript.autoAttachFilter]] وقيمته الافتراضية disabled:

| الوضع | بيتربط بإيه (من وصف الإعداد في VS Code) |
|---|---|
| always | أي عملية Node تتشغل من الترمنال |
| smart | السكربتات اللي مش جوه node_modules |
| onlyWithFlag | بس اللي متشغل بـ [[--inspect]] |
| disabled | مقفول |

smart هو الاختيار المعقول: كودك يتربط، والأدوات اللي جوه node_modules متتبطّأش.

---

## الخلاصة

~~~text
Debug: JavaScript Debug Terminal   ترمنال كل node فيه بيتربط
npm run dev                        والـ breakpoints تشتغل
Debugger attached.                 علامة إنه اتصل
Toggle Auto Attach → smart         نفس الفكرة في كل الترمنالات
~~~

ده لـ Node بس، مش لكود المتصفح، ومش هيوصل لـ container.`,
          sol: R`الترمنال الجديد هيبقى اسمه «JavaScript Debug Terminal». [[npm run dev]] منه هيطبع [[Debugger attached.]] (ممكن أكتر من مرة، واحدة لكل عملية node زي npm و nodemon والسيرفر). اطلب الـ route من المتصفح، و VS Code هيقف على الـ breakpoint من غير أي launch.json.

الـ [[Debugger attached.]] المتكرر ده طبيعي. ولو الـ breakpoint مابقفش، اتأكد إن الملف اللي حطيت فيه هو اللي بيتنفذ فعلًا (مش نسخة متبنية في [[dist]])، وإن الـ source maps موجودة لو TypeScript. وافتكر إن الأمر ده لـ Node، مش لكود المتصفح.`
        }
      ]
    },
    {
      t: "Markdown والـ AI",
      l: 2,
      n: "معاينة README وانت بتكتبه، والـ chat المدمج في المحرر",
      items: [
        {
          cmd: "Ctrl+Shift+V",
          title: "شوف ملف Markdown متعرض زي GitHub",
          desc: R`Ctrl+Shift+V على ملف [[.md]] بيفتح المعاينة مكانه، و Ctrl+K V بيفتحها جنبه، فتكتب وتشوف النتيجة في نفس اللحظة: العناوين والجداول والكود واللينكات والصور.

مفيد لـ README والتوثيق والملاحظات. و Ctrl+Shift+O جوه ملف Markdown بيعرض العناوين فتتنقل بينها.`,
          example: R`Ctrl+Shift+V           preview in place (Shift+Cmd+V on Mac)
Ctrl+K V               preview to the side (Cmd+K V)
Ctrl+Shift+O           jump between headings`,
          try: "افتح README مشروعك جنب المعاينة، وضيف جدول فيه أوامر التشغيل وشوفه وهو بيتعرض.",
          flag: "keys",
          deep: {
            why: "بتكتب README وترفعه تلاقي الجدول باظ أو الكود مش متلوّن. المعاينة بتوريك قبل الرفع.",
            how: R`المعاينة بتتحدث وانت بتكتب، والـ scroll متزامن بين الناحيتين. شكلها قريب من GitHub بس مش متطابق: بعض الحاجات الخاصة بـ GitHub محتاجة extension.

الصور بمسارات نسبية بتظهر من الـ repo، فتتأكد إن المسار صح قبل الرفع.`,
            when: "أي ملف Markdown قبل الرفع.",
            mistakes: "تكتب مسار الصورة بـ backslash بتاع ويندوز فيبان عندك ويبوظ على GitHub: استخدم / دايمًا. وتعدّل في المعاينة وتستغرب: المعاينة للقراية بس، التعديل في الملف."
          },
          teach: R`## الفكرة في سطر

ملف Markdown ([[.md]]) نص فيه رموز زي [[#]] و [[|]]. Ctrl+Shift+V بيعرضه **متنسّق** زي ما GitHub هيعرضه: عناوين وجداول وكود ملوّن. نفك المثال.

---

## ١. المعاينة مكان الملف

~~~text
Ctrl+Shift+V           preview in place (Shift+Cmd+V on Mac)
~~~

الأمر اسمه Markdown: Toggle Preview. بيبدّل التاب بين النص والمعاينة.

---

## ٢. المعاينة جنب الملف

~~~text
Ctrl+K V               preview to the side (Cmd+K V)
~~~

chord: Ctrl+K وتسيب، وبعدين V لوحدها. بيفتح المعاينة في جزء جنب الملف، فتكتب في الشمال وتشوف النتيجة في اليمين **وانت بتكتب**. والـ scroll في الاتنين ماشي مع بعض.

مثال: لو كتبت ده في الشمال

~~~text README.md
| Command | What it does |
|---|---|
| npm run dev | start the dev server |
~~~

اليمين بيعرضه جدول بخطوط وعنوان عريض. لو نسيت سطر [[|---|---|]]، الجدول مش هيبقى جدول، هيظهر سطور عادية فيها [[|]].

---

## ٣. العناوين

~~~text
Ctrl+Shift+O           jump between headings
~~~

في ملف Markdown، الـ symbols هي العناوين ([[#]] و [[##]])، فـ Ctrl+Shift+O بيعرض لستة بالعناوين تقفز لأي واحد منها. مفيد في README طويل.

---

## المعاينة مش GitHub بالظبط

قريبة جدًا، بس حاجات خاصة بـ GitHub (زي الـ alerts بتاعة NOTE و WARNING) ممكن تبان مختلفة. والصور بالمسار النسبي بتظهر من الـ repo، فاكتب المسار بـ [[/]] مش [[\]].

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| معاينة مكانه | Ctrl+Shift+V | Shift+Cmd+V |
| معاينة جنبه | Ctrl+K V | Cmd+K V |
| العناوين | Ctrl+Shift+O | Shift+Cmd+O |

المعاينة للقراية بس، التعديل في الملف.`,
          sol: R`Ctrl+K ثم V هيفتح المعاينة جنب الملف، وكل ما تكتب بتتحدث. الجدول ده مثلًا:

[[| Command | What it does |]] ثم [[|---|---|]] ثم [[| npm run dev | start the dev server |]]

هيظهر جدول بخطوط وعناوين عريضة، شبه GitHub.

لو الجدول ظهر كسطور عادية فيها [[|]]، يبقى ناقص سطر [[|---|---|]] أو ناقص سطر فاضي قبل الجدول. ولو Ctrl+K V مشتغلش، دوس Ctrl+K وسيب وبعدين V لوحدها. والمعاينة بتاعة VS Code قريبة من GitHub بس مش نفس الحاجة، فحاجات زي الـ alerts بتاعة GitHub (NOTE و WARNING) ممكن تبان مختلفة.`
        },
        {
          cmd: "Ctrl+Alt+I",
          title: "افتح الـ AI chat المدمج، أو اسأله جوه الكود",
          desc: R`Ctrl+Alt+I بيفتح Chat على الجنب: تسأل عن المشروع أو تطلب تعديل. و Ctrl+I وانت في الكود بيفتح inline chat في السطر نفسه: تحدد دالة وتكتب «ضيف validation» ويعرضلك التعديل كـ diff تقبله أو ترفضه. و Ctrl+I في الترمنال بيقترح أمر.

الاقتراحات الرمادية وانت بتكتب بتتقبل بـ Tab.`,
          example: R`Ctrl+Alt+I             Chat view (Ctrl+Cmd+I on Mac)
Ctrl+I                 inline chat in the editor or terminal (Cmd+I on Mac)
Tab                    accept the grey inline suggestion
Esc                    dismiss`,
          try: "حدد دالة صغيرة واطلب بـ Ctrl+I تكتبلها JSDoc، واقرا الـ diff سطر سطر قبل ما تقبل.",
          flag: "keys",
          deep: {
            why: "الـ chat جوه المحرر شايف الملف والتحديد، فبتسأل عن الكود اللي قدامك من غير نسخ ولزق في متصفح.",
            how: R`ده محتاج تسجيل دخول لـ GitHub Copilot (فيه خطة مجانية بحدود). الـ inline chat بيعدّل جوه الملف كـ diff، فتقبل جزء وترفض جزء.

الـ chat بيشوف الملفات اللي تديهاله (التحديد، أو [[#]] واسم ملف)، والكود ده بيتبعت لسيرفرات الخدمة.`,
            when: "شرح كود مش بتاعك، أو boilerplate، أو اقتراح test. مش بديل إنك تفهم التعديل.",
            mistakes: "تقبل تعديل كبير من غير ما تقراه، أو تدّي الـ chat ملف فيه [[.env]] أو مفاتيح. ولو الـ AI مقفول عندك، Ctrl+I بيفتح الاقتراحات العادية زي Ctrl+Space."
          },
          teach: R`## الفكرة في سطر

VS Code فيه AI مدمج (GitHub Copilot): **Chat** على الجنب تسأله، و **inline chat** جوه الكود يعدّل اللي محدده، واقتراحات رمادية وانت بتكتب. نفك المثال.

---

## ١. الـ Chat

~~~text
Ctrl+Alt+I             Chat view (Ctrl+Cmd+I on Mac)
~~~

بيفتح شباك Chat على الجنب. تكتب سؤال عن المشروع، أو تطلب تعديل. على الماك Ctrl+Cmd+I (من جدول الماك الرسمي).

---

## ٢. inline chat

~~~text
Ctrl+I                 inline chat in the editor or terminal (Cmd+I on Mac)
~~~

- **في المحرر**: حدد كود ودوس Ctrl+I، تظهر خانة صغيرة فوقه. تكتب «add JSDoc» مثلًا، والتعديل بيظهر كـ **diff**: الأخضر جديد والأحمر هيتشال. تقبل أو ترفض.
- **في الترمنال**: Ctrl+I بيقترح أمر من وصفك.

---

## ٣. الاقتراح الرمادي

~~~text
Tab                    accept the grey inline suggestion
~~~

وانت بتكتب، ممكن يظهر كلام رمادي بعد المؤشر: ده اقتراح. **Tab** يقبله ويكتبه.

---

## ٤. ارفض

~~~text
Esc                    dismiss
~~~

يقفل الاقتراح أو الـ inline chat من غير تغيير.

---

## محتاج إيه؟

| | |
|---|---|
| حساب | تسجيل دخول GitHub Copilot (فيه خطة مجانية بحدود) |
| الكود بيروح فين | لسيرفرات الخدمة، فمتديهوش [[.env]] أو مفاتيح |
| من غير AI | Ctrl+I بيفتح الاقتراحات العادية زي Ctrl+Space (ده موجود في جدول الاختصارات الرسمي كاختصار تاني لـ Trigger Suggest) |

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| Chat | Ctrl+Alt+I | Ctrl+Cmd+I |
| inline chat | Ctrl+I | Cmd+I |
| اقبل الاقتراح | Tab | Tab |
| ارفض | Esc | Esc |

اقرا الـ diff سطر سطر قبل ما تقبل.

> مجربناش الـ AI نفسه هنا (محتاج حساب)، والاختصارات من جداول VS Code الرسمية.`,
          sol: R`حدد الدالة و Ctrl+I هيطلع خانة صغيرة فوقها، اكتب «add JSDoc». الـ AI هيضيف comment زي [[/** ... @param ... @returns ... */]] وهيبان كـ diff: الأخضر جديد والأحمر اتشال. زرار Accept (أو Ctrl+Enter) يقبل، و Discard يلغي. اقرا كل [[@param]] واتأكد إن الـ types والوصف صح، لأنه بيخمّن من الأسامي.

لو Ctrl+I مفتحش حاجة، يبقى Copilot (أو أي AI extension) مش متفعّل أو مش عامل sign in، وفيه plan مجاني بيكفي للتجربة. ولو الـ diff غيّر الكود نفسه مش بس ضاف comment، ارفضه، ده بالظبط ليه قلنا اقرا الـ diff. وعلى الماك Cmd+I.`
        }
      ]
    }
]);
