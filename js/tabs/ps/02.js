// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "التنقل",
      l: 1,
      n: "",
      items: [
        {
          cmd: "Set-Location",
          title: "اتنقل (cd)",
          desc: R`[[Set-Location]] بيغيّر الفولدر اللي انت واقف فيه، وكل المسارات النسبية بعد كده بتتحسب منه. اختصاره [[cd]] (و [[sl]] و [[chdir]])، فاللي متعود عليه من bash أو CMD هيشتغل. و [[Get-Location]] (اختصاره [[pwd]]) بيطبع انت فين.

الرموز: [[..]] الفولدر اللي فوق، و [[~]] فولدرك الشخصي ([[C:\Users\اسمك]])، و [[\]] لوحدها جذر الدرايف ([[C:\]]). وPowerShell بيقبل [[/]] كمان، فـ [[cd C:/Users]] شغالة. وعكس CMD، [[cd D:\projects]] بتنقلك للدرايف التاني والفولدر في خطوة واحدة من غير [[/d]].

المسار اللي فيه مسافات لازم بين علامات تنصيص: [[cd "C:\Program Files"]]. وفي PowerShell 7 [[cd -]] بترجعك للفولدر اللي كنت فيه زي bash، لكن في 5.1 مش موجودة، والبديل Push-Location في الدرس اللي بعد الجاي.`,
          example: R`Set-Location C:\Users
cd D:\projects
cd ~
Get-Location`,
          try: "روح لأي درايف تاني وارجع الـ home.",
          deep: {
            why: R`كل أمر بتكتبه بيشتغل «من» فولدر معين، والملفات اللي بتكتب اسمها من غير مسار كامل بيدوّر عليها هناك. فأول حاجة في أي شغل إنك تقف في المكان الصح. نفس [[cd]] و [[pwd]] في bash.`,
            how: R`[[Set-Location C:\]] و [[cd C:\]] نفس الحاجة. PowerShell بيفهم الـ backslash ([[C:\Users]]) والـ forward slash ([[C:/Users]]) الاتنين.

الرموز: [[~]] بيشاور على فولدرك الشخصي ([[C:\Users\YourName]])، و [[..]] الفولدر اللي فوق، و [[.]] الفولدر الحالي نفسه. في PowerShell 7 فيه [[cd -]] ترجعك للمكان اللي قبله و [[cd +]] تقدّمك تاني. في 5.1 مش موجودين، فاستخدم [[Push-Location]] و [[Pop-Location]].

PowerShell بيشوف أماكن تانية كأنها درايفات: مش بس [[C:]]، فيه [[Env:]] لمتغيرات البيئة و [[HKCU:]] للـ registry. فـ [[cd Env:]] وبعدها [[ls]] بيعرضلك المتغيرات كأنها ملفات. شوفهم كلهم بـ [[Get-PSDrive]].`,
            when: "التنقل بين فولدرات المشروع. والانتقال لفولدر مؤقت وبعدين الرجوع.",
            mistakes: R`المسارات اللي فيها مسافات لازم تتحط بين علامات تنصيص. والـ backslash مش escape في PowerShell (الـ escape هو الـ backtick)، فـ [["C:\new\test"]] سليمة.`
          },
          teach: R`## الفكرة

[[Set-Location]] بيغيّر «انت واقف فين». كل أمر بعدها بيدوّر على الملفات من المكان ده. هنمشي على المثال سطر سطر، وبعد كل خطوة [[Get-Location]] يقولنا احنا فين (اتجرب في PowerShell 7.6 على جهاز فيه درايف C و D).

---

## ١. [[Set-Location C:\Users]]

~~~powershell
Set-Location C:\Users
Get-Location
~~~

~~~text الناتج
Path
----
C:\Users
~~~

- [[C:]] اسم الدرايف، و [[\]] الفاصل بين الفولدرات على ويندوز. فـ [[C:\Users]] = فولدر Users اللي على أول الدرايف C.
- [[Get-Location]] بيرجّع object فيه خانة اسمها [[Path]]، عشان كده بيطبع جدول بعنوان مش سطر عادي.

---

## ٢. [[cd D:\projects]]: درايف تاني في خطوة

[[cd]] اختصار [[Set-Location]] (من change directory). جربتها بـ [[cd D:\]]:

~~~text الناتج بعد Get-Location
Path
----
D:\
~~~

اتنقلنا للدرايف D على طول. في CMD نفس الأمر محتاج [[cd /d D:\projects]]، من غير [[/d]] الـ CMD مش بيغيّر الدرايف.

---

## ٣. [[cd ~]]: البيت

[[~]] (اسمها tilde) معناها فولدرك الشخصي:

~~~text الناتج بعد Get-Location
Path
----
C:\Users\ali
~~~

[[ali]] اسم اليوزر على الجهاز اللي اتجرب عليه. عندك هيطلع اسمك.

---

## ٤. رموز تانية جربتها

| اكتب | راح فين | ملاحظة |
|---|---|---|
| [[cd ..]] | من [[C:\Users\ali]] لـ [[C:\Users]] | [[..]] الفولدر اللي فوق |
| [[cd -]] | رجعني لـ [[C:\Users\ali]] بعد ما كنت في [[D:\]] | PowerShell 7 بس. في 5.1 طلع [[Cannot find path 'C:\Windows\-' because it does not exist.]] لأنه فهم [[-]] اسم فولدر |
| [[cd \]] | جذر الدرايف اللي انت فيه | [[\]] لوحدها |

---

## ٥. الدرايفات الموجودة

لو مش عارف عندك درايفات إيه:

~~~powershell
Get-PSDrive -PSProvider FileSystem
~~~

~~~text الناتج (الأعمدة اتشال منها CurrentLocation)
Name           Used (GB)     Free (GB) Provider      Root
----           ---------     --------- --------      ----
C                 255.76         45.55 FileSystem    C:\
D                 569.92         59.31 FileSystem    D:\
E                 904.70         48.90 FileSystem    E:\
Temp              255.76         45.55 FileSystem    C:\Users\ali\AppData\Local\Temp\
~~~

[[-PSProvider FileSystem]] يعني الدرايفات اللي فيها ملفات بس. و [[Temp]] مش ديسك حقيقي: ده اختصار PowerShell 7 بيعمله لفولدر الـ TEMP، عشان كده أرقامه نفس C.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| روح فولدر | [[cd C:\Users]] |
| درايف تاني | [[cd D:\]] أو [[D:]] |
| فولدرك | [[cd ~]] |
| فوق | [[cd ..]] |
| ارجع للي قبله | [[cd -]] (7 بس) |
| انا فين | [[Get-Location]] أو [[pwd]] |

ومسار فيه مسافة بين علامات تنصيص: [[cd "C:\Program Files"]].

على لينكس والماك نفس الأوامر بالظبط في bash و zsh ([[cd]] و [[pwd]] و [[cd -]] و [[~]])، بس الفاصل [[/]] ومفيش درايفات: كله تحت [[/]].`,
          lines: [
            "روح للفولدر ده.",
            "نفس الحاجة بالاختصار، ولدرايف تاني على طول (مش زي CMD).",
            "فولدرك الشخصي.",
            "انت فين دلوقتي (زي pwd)."
          ],
          sol: R`[[cd D:\]] (أو [[D:]] لوحدها) الـ prompt هيبقى [[PS D:\>]]، و [[cd ~]] يرجعك [[C:\Users\ali]]، و [[Get-Location]] بيطبع جدول فيه [[Path]] وتحته المسار. ومش محتاج [[/d]] زي CMD، PowerShell بيغيّر الدرايف والفولدر مع بعض.

لو ظهر [[Cannot find drive. A drive with the name 'D' does not exist.]] يبقى الجهاز مفيهوش D، شوف الدرايفات الموجودة بـ [[Get-PSDrive -PSProvider FileSystem]]. ولو المسار فيه مسافات حطه بين علامات تنصيص: [[cd "C:\Program Files"]].`
        },
        {
          cmd: "Get-ChildItem",
          title: "اعرض الملفات (ls / dir)",
          desc: R`[[Get-ChildItem]] بيعرض اللي جوه فولدر، زي [[ls]] في bash و [[dir]] في CMD، والاتنين شغالين كاختصار له (ومعاهم [[gci]]). من غير أي إضافة بيعرض الفولدر الحالي، وكل سطر فيه Mode (حروف زي [[d]] للفولدر و [[a]] للملف) و LastWriteTime و Length (الحجم بالبايت) و Name.

الإضافات اللي في المثال: [[-Force]] يعرض الملفات المخفية كمان (زي [[ls -a]])، و [[-Recurse]] يدخل جوه كل الفولدرات الفرعية، و [[-Filter *.js]] ياخد الأسامي اللي بتخلص بـ .js بس (النجمة يعني أي حروف)، و [[-Directory]] الفولدرات بس، وعكسه [[-File]] الملفات بس.

خلي بالك إن الناتج objects مش نص، فتقدر تبعته بـ [[|]] لأوامر زي Sort-Object و Where-Object (المستوى التاني). وأوعى تعمل [[-Recurse]] على فولدر كبير زي node_modules أو [[C:\]] من غير [[-Filter]]، هيطبع آلاف السطور ويعلّق شوية.`,
          example: R`Get-ChildItem
Get-ChildItem -Force
Get-ChildItem -Recurse -Filter *.js
Get-ChildItem -Directory`,
          try: "اعرض كل ملفات .json في مشروع عندك من غير فولدرات.",
          deep: {
            why: R`قبل ما تعمل أي حاجة في فولدر لازم تعرف فيه إيه: ملفات إيه، حجمها قد إيه، اتعدلت إمتى. وده أكتر أمر هتكتبه، زي ls في bash.`,
            how: R`[[Get-ChildItem]] أو [[ls]] أو [[dir]] كلهم شغالين. بيرجع objects مش نص، فتقدر تفلتر عليها بعدين.

[[-Recurse]] (أو [[-r]]) بيدخل جوه كل الفولدرات الفرعية. [[-Filter *.js]] أسرع من Where-Object لأنه بيستخدم Windows file filtering. [[-Force]] بيوري الملفات المخبّية. [[-Name]] بيرجع الأسامي بس بدل objects كاملة.

ومفيد جدًا: [[ls | Sort-Object Length -Descending | Select-Object -First 10]] أكبر ١٠ ملفات.`,
            when: "عرض الملفات. إيجاد ملفات بامتداد معين. ترتيب الملفات بالحجم.",
            mistakes: "استخدام [[-Recurse]] من غير [[-Filter]] على فولدر كبير فيعلق."
          },
          teach: R`## الفكرة

[[Get-ChildItem]] = «هات اللي جوه». المثال ٤ سطور، كل سطر بيضيف parameter واحد. اتجربوا في فولدر فيه ١٣ ملف، وفولدرين [[src]] و [[node_modules]]، وملف مخفي [[secret.txt]] (PowerShell 7.6؛ المسار اتختصر).

---

## ١. [[Get-ChildItem]] لوحده

~~~text الناتج
    Directory: C:\...\lab

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           10/6/2026  9:36 AM                node_modules
d----           10/6/2026  9:36 AM                src
-a---           10/6/2026  9:36 AM             11 .env.example
-a---           10/6/2026  9:36 AM             34 a.js
-a---           10/6/2026  9:36 AM           1139 app.log
-a---           10/6/2026  9:36 AM        2000000 big.bin
...
-a---           10/6/2026  9:36 AM            151 package.json
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[Directory:]] | الفولدر اللي بنعرضه |
| [[Mode]] | حروف الخصائص (تحت) |
| [[LastWriteTime]] | آخر تعديل |
| [[Length]] | الحجم بالبايت. فاضي للفولدرات |
| [[Name]] | الاسم |

### حروف [[Mode]]

كل خانة حرف، والشرطة يعني «لأ»:

| الحرف | معناه |
|---|---|
| [[d]] | directory: فولدر |
| [[a]] | archive: ملف عادي اتعدل (ويندوز بيحطها على أغلب الملفات) |
| [[r]] | read-only: للقراية بس |
| [[h]] | hidden: مخفي |
| [[s]] | system: ملف نظام |
| [[l]] | link: اختصار لمكان تاني |

في 5.1 العمود ٦ خانات ([[d-----]] و [[-a----]]) بدل ٥، نفس المعنى.

---

## ٢. [[Get-ChildItem -Force]]: المخفي كمان

نفس القايمة، وزيادة سطر واحد:

~~~text السطر الزيادة
---h-           10/6/2026  9:36 AM              1 secret.txt
~~~

الـ [[h]] في Mode: مخفي. من غير [[-Force]] مش بيظهر خالص.

---

## ٣. [[Get-ChildItem -Recurse -Filter *.js]]

- [[-Recurse]]: ادخل كل فولدر جوّا كل فولدر.
- [[-Filter *.js]]: الأسامي اللي بتخلص بـ [[.js]] بس. [[*]] = أي حروف.

~~~text الناتج
    Directory: C:\...\lab

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:36 AM             34 a.js
-a---           10/6/2026  9:36 AM             13 b.js
-a---           10/6/2026  9:36 AM              7 old.js

    Directory: C:\...\lab\node_modules\x

-a---           10/6/2026  9:36 AM             20 i.js

    Directory: C:\...\lab\src

-a---           10/6/2026  9:36 AM             23 server.js
~~~

كل فولدر ليه عنوان [[Directory:]] لوحده. ولاحظ إنه دخل [[node_modules]]: في مشروع حقيقي ده آلاف الملفات.

---

## ٤. [[Get-ChildItem -Directory]]

~~~text الناتج
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           10/6/2026  9:36 AM                node_modules
d----           10/6/2026  9:36 AM                src
~~~

الفولدرات بس. وعكسه [[-File]]: الملفات بس.

---

## الخلاصة

| الإضافة | بتعمل إيه | في bash |
|---|---|---|
| (ولا حاجة) | اللي في الفولدر الحالي | [[ls -l]] |
| [[-Force]] | والمخفي | [[ls -a]] |
| [[-Recurse]] | وكل اللي تحت | [[ls -R]] |
| [[-Filter *.js]] | بالاسم | [[ls *.js]] |
| [[-Directory]] / [[-File]] | فولدرات بس / ملفات بس | [[find -type d]] / [[find -type f]] |

والإضافات بتتجمّع: [[Get-ChildItem -Recurse -File -Filter *.json]].`,
          lines: [
            "محتوى الفولدر الحالي.",
            "مع المخفي ([[-Force]] هنا زي [[-a]]).",
            "كل ملفات .js في كل الفولدرات الفرعية. [[-Filter]] أسرع من Where-Object.",
            "الفولدرات بس."
          ],
          sol: R`الحل: [[Get-ChildItem -File -Filter *.json]] في فولدر المشروع. هتلاقي حاجات زي [[package.json]] و [[package-lock.json]] و [[tsconfig.json]]، كل واحد في سطر فيه Mode (زي [[-a---]]) و LastWriteTime و Length و Name، ومفيش ولا فولدر لأن [[-File]] شالهم.

لو زودت [[-Recurse]] هيدخل node_modules ويطلعلك آلاف الملفات، فلو عايز الفولدرات الفرعية فلتر بعدها: [[Get-ChildItem -Recurse -File -Filter *.json | Where-Object FullName -notmatch 'node_modules']]. ولو استخدمت [[-Include *.json]] من غير [[-Recurse]] ممكن ميرجعش حاجة خالص، [[-Filter]] هو الأسرع والأبسط هنا.`
        },
        {
          cmd: "Push-Location",
          title: "احفظ مكانك وارجعله",
          desc: R`[[Push-Location]] (اختصاره [[pushd]]) بيحفظ الفولدر اللي انت فيه في «stack» وبعدين ينقلك للمكان الجديد. و [[Pop-Location]] (اختصاره [[popd]]) بيرجعك لآخر مكان اتحفظ. الـ stack زي رصّة أطباق: آخر حاجة حطيتها هي أول حاجة بتشيلها، فلو عملت push مرتين، أول pop يرجعك للمكان التاني مش الأول.

الفايدة الحقيقية في السكربتات: السكربت يدخل فولدر، يعمل شغله، ويرجّع الترمنال مكان ما كان. ده مهم لأن [[cd]] جوه سكربت PowerShell بيغيّر مكان الترمنال نفسه حتى بعد ما السكربت يخلص (عكس bash). نفس الأوامر موجودة في bash و CMD بنفس الاسم [[pushd]] و [[popd]].

و [[Get-Location -Stack]] بيوريك الأماكن المحفوظة. ولو السكربت ممكن يقع في النص، حط الـ Pop جوه [[finally]] (درس try / catch) عشان يرجع في كل الأحوال.`,
          example: R`Push-Location C:\Windows
Pop-Location`,
          try: "اعمل pushd لفولدرين ورا بعض وبعدين popd مرتين.",
          deep: {
            why: R`محتاج تروح فولدر تعمل فيه حاجة وترجع مكانك بالظبط، من غير ما تفتكر كنت فين. مفيد جدًا في السكربتات اللي بتلف على كذا مشروع.`,
            how: R`[[Push-Location]] بيحفظ موقعك الحالي في stack ثم بيروح للمكان الجديد. [[Pop-Location]] يرجعك للمكان المحفوظ.

تقدر تعمل Push كذا مرة وتبني stack. Pop يرجعك مرة مرة بالترتيب.

وفيه alias: [[pushd]] = Push-Location، و[[popd]] = Pop-Location.`,
            when: "سكربت محتاج يدخل فولدر، يعمل حاجة، ويرجع. أو بتشتغل على مشاريع متعددة وبترجع لمشروعك الأصلي.",
            mistakes: R`تعمل Push في سكربت والسكربت يقع في النص قبل الـ Pop، فالترمنال يفضل واقف في فولدر غريب. حط الـ Pop جوه [[finally]]: [[Push-Location app; try { npm run build } finally { Pop-Location }]]. أو تعمل pop أكتر من الـ push وتستغرب إن مفيش حاجة حصلت.`
          },
          teach: R`## الفكرة

[[Push-Location]] = «افتكر انا فين، وبعدين روح هناك». [[Pop-Location]] = «رجّعني لآخر مكان افتكرته». جربتها في PowerShell 7.6، وبدأت من فولدر [[lab]].

### الـ stack

الأماكن اللي بتتحفظ بتترص فوق بعض زي رصة أطباق: آخر طبق اتحط هو أول طبق يتشال. ده اسمه stack.

---

## ١. [[Push-Location C:\Windows]]

~~~powershell
Push-Location C:\Windows
Get-Location
~~~

~~~text الناتج
Path
----
C:\Windows
~~~

[[Push-Location]] نفسه مش بيطبع حاجة. حصل حاجتين: [[lab]] اتحط في الـ stack، واحنا اتنقلنا لـ [[C:\Windows]].

---

## ٢. push تاني، ونبص على الـ stack

~~~powershell
Push-Location C:\Users
Get-Location -Stack
~~~

~~~text الناتج (المسار اتختصر)
Path
----
C:\Windows
C:\...\lab
~~~

[[-Stack]] بيعرض المحفوظ، وأول سطر هو اللي فوق (آخر واحد اتحفظ). احنا دلوقتي في [[C:\Users]]، وده مش في القايمة لأنه المكان الحالي مش محفوظ.

---

## ٣. [[Pop-Location]] مرتين

| الأمر | رجعنا لـ | ليه |
|---|---|---|
| [[Pop-Location]] الأولى | [[C:\Windows]] | ده اللي فوق الرصة |
| [[Pop-Location]] التانية | [[C:\...\lab]] | المكان اللي بدأنا منه |
| [[Pop-Location]] التالتة | مفضلناش مكانّا، ومفيش error | الـ stack فاضي |

---

## ليه ده مهم في السكربتات

سكربت PowerShell لو عمل [[cd]] جوّاه، الترمنال بتاعك بيفضل في المكان الجديد بعد ما السكربت يخلص. فالسكربت المحترم:

~~~powershell
Push-Location C:\Windows
try {
    Get-ChildItem -Filter *.log
} finally {
    Pop-Location
}
~~~

[[try]] و [[finally]]: الكود اللي في [[finally]] بيتنفذ في كل الأحوال، حتى لو حصل error في النص (درس try / catch في المستوى التالت).

---

## الخلاصة

| الأمر | اختصاره | بيعمل إيه |
|---|---|---|
| [[Push-Location مكان]] | [[pushd]] | احفظ مكانك وروح |
| [[Pop-Location]] | [[popd]] | ارجع لآخر محفوظ |
| [[Get-Location -Stack]] | | اعرض المحفوظ |

نفس [[pushd]] و [[popd]] موجودين في bash على لينكس والماك وفي CMD، بنفس الفكرة.`,
          lines: ["احفظ مكاني وروح لـ Windows.", "ارجعني للمكان المحفوظ."],
          sol: R`جربتها في PowerShell 7.6 و 5.1: [[Push-Location C:\Windows]] وبعدين [[Push-Location C:\Users]]. [[Get-Location -Stack]] وراني المكانين المحفوظين ([[C:\Windows]] وتحته الفولدر اللي بدأت منه)، وأول [[Pop-Location]] رجعني [[C:\Windows]] (المكان اللي كنت فيه قبل آخر push)، والتاني رجعني للفولدر اللي بدأت منه.

يعني الـ stack بيرجعك بالعكس: آخر حاجة اتحفظت أول حاجة ترجعلها. [[pushd]] نفسه مش بيطبع حاجة، وده طبيعي. ولو عملت [[popd]] زيادة مرة تالتة مش هيحصل حاجة (مفيش error، مفيش مكان يرجعله)، ففي السكربت اعمل pop بعدد الـ push بالظبط.`
        }
      ]
    },
    {
      t: "ملفات وفولدرات",
      l: 1,
      n: "",
      items: [
        {
          cmd: "New-Item",
          title: "اعمل ملف أو فولدر",
          desc: R`[[New-Item]] بيعمل ملف أو فولدر جديد، زي [[touch]] و [[mkdir]] في bash. الافتراضي ملف فاضي، ولو عايز فولدر لازم [[-ItemType Directory]]. واختصاراته [[ni]]، و [[mkdir]] (وده بيعمل فولدر على طول من غير ItemType).

[[lab\app\src]] مسار فيه فولدرات جوه بعض، و [[-Force]] هنا بتعمل كل الفولدرات اللي في السكة لو مش موجودة (زي [[mkdir -p]])، ومش بتطلع error لو الفولدر موجود أصلًا. و [[-Value "PORT=3000"]] بيحط محتوى في الملف وهو بيتعمل. والأسامي اللي بتبدأ بنقطة زي [[.env]] عادية على ويندوز ومش مخفية.

تحذير: [[-Force]] مع ملف (مش فولدر) موجود بتفضّيه وتكتب فوقه من غير سؤال. ومن غير [[-Force]]، لو الملف موجود هيطلع error «already exists»، وده في صالحك. وكل New-Item بيطبع سطر بالحاجة اللي اتعملت، ففي السكربتات بيتكتب بعده [[| Out-Null]] عشان يخفيه.`,
          example: R`New-Item -ItemType Directory lab\app\src -Force
New-Item index.js
New-Item .env -Value "PORT=3000"
mkdir logs`,
          try: R`اعمل [[app\src]] و [[app\public]] وملف [[app\src\server.js]].`,
          deep: {
            why: R`أي مشروع أو سكربت بيبدأ بهيكل: فولدرات src و logs، وملفات .env و README. New-Item بيعمل الاتنين، ومع [[-Force]] بيعمل المسار كله مرة واحدة.`,
            how: R`[[-ItemType File]] لملف أو [[-ItemType Directory]] لفولدر. [[-Force]] بيعمل الفولدرات الوسيطة لو مش موجودة (زي [[mkdir -p]] في bash).

[[New-Item -ItemType File .env]] بيعمل ملف فاضي. [[-Value]] بتحط محتوى مباشرة.

ملف على طريق مش موجود: لو عملت [[New-Item C:\projects\new\file.txt]] والـ new مش موجود، هيفشل. استخدم [[-Force]] أو اعمل الفولدر الأول.`,
            when: "إعداد هيكل مشروع جديد. سكربتات بتعمل ملفات إعدادات.",
            mistakes: R`تنسى [[-ItemType Directory]] فيتعمل ملف فاضي اسمه src بدل فولدر، وبعدها أي حاجة تحاول تكتب جواه تفشل. أو تستخدم [[-Force]] على ملف فيه بيانات فتفضّيه. أو تعمل ملف في فولدر مش موجود من غير [[-Force]] فيطلع [[Could not find a part of the path]].`
          },
          teach: R`## الفكرة

[[New-Item]] بيعمل حاجة جديدة: ملف أو فولدر. المثال ٤ سطور، وكلهم اتجربوا في PowerShell 7.6 جوه فولدر تجارب (المسار اتختصر لـ [[C:\...\lab]]).

---

## ١. [[New-Item -ItemType Directory lab\app\src -Force]]

| الحتة | معناها |
|---|---|
| [[-ItemType Directory]] | النوع: فولدر. من غيره [[New-Item]] بيعمل ملف |
| [[lab\app\src]] | مسار نسبي: [[src]] جوه [[app]] جوه [[lab]]، محسوب من المكان اللي انت فيه |
| [[-Force]] | اعمل كل الفولدرات اللي في السكة لو مش موجودة، ومتطلعش error لو الفولدر موجود |

~~~text الناتج
    Directory: C:\...\lab\lab\app

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           10/6/2026  9:37 AM                src
~~~

لاحظ [[lab\lab\app]]: أنا كنت واقف في [[lab]] أصلًا، فالمسار النسبي اتحسب من هناك وعمل [[lab]] تاني جوّاه. المسار النسبي دايمًا من مكانك الحالي.

والناتج بيعرض الحاجة **الأخيرة** اللي اتعملت ([[src]])، وفوقها [[Directory:]] الفولدر اللي هي فيه. وشغّلت نفس السطر تاني فطلع نفس الجدول من غير error، ودي فايدة [[-Force]] مع الفولدرات.

---

## ٢. [[New-Item index.js]]

من غير [[-ItemType]] الافتراضي ملف فاضي:

~~~text الناتج
    Directory: C:\...\lab

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:37 AM              0 index.js
~~~

[[Length]] بـ 0: ملف فاضي. وتاني مرة نفس الأمر:

~~~text error
The file 'C:\...\lab\index.js' already exists.
~~~

وده كويس: مش بيكتب فوق ملفك.

---

## ٣. [[New-Item .env -Value "PORT=3000"]]

[[-Value]] المحتوى اللي يتكتب في الملف وهو بيتعمل.

~~~text الناتج
-a---           10/6/2026  9:37 AM              9 .env
~~~

[[Length]] بـ 9: عدد حروف [[PORT=3000]] بالظبط (كل حرف إنجليزي بايت واحد). و [[Get-Content .env]] طبع [[PORT=3000]].

### خطر [[-Force]] مع الملفات

جربت [[New-Item .env -Value "PORT=1" -Force]] على الملف الموجود: اتكتب فوقه وبقى [[PORT=1]] من غير أي سؤال. ولما عملت [[New-Item]] بـ [[-Force]] من غير [[-Value]] على ملف فيه كلام، الحجم بقى 0. يعني [[-Force]] مع الفولدر أمان، ومع الملف مسح.

---

## ٤. [[mkdir logs]]

[[mkdir]] في PowerShell function جاهزة بتنادي [[New-Item -ItemType Directory]]، فمش محتاج تكتب النوع:

~~~text الناتج
d----           10/6/2026  9:37 AM                logs
~~~

---

## غلطة شائعة: ملف في فولدر مش موجود

~~~powershell
New-Item x\y\z.txt
~~~

~~~text error
Could not find a part of the path 'C:\...\lab\x\y\z.txt'.
~~~

الفولدرات [[x]] و [[y]] مش موجودة. الحل: [[-Force]] (بيعمل الفولدرات اللي في السكة للملف كمان)، أو تعمل الفولدر الأول.

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| فولدر | [[New-Item -ItemType Directory اسم]] أو [[mkdir اسم]] | [[mkdir]] |
| فولدرات جوه بعض | [[... -Force]] | [[mkdir -p]] |
| ملف فاضي | [[New-Item اسم]] | [[touch]] |
| ملف بمحتوى | [[New-Item اسم -Value "..."]] | [[echo "..." > اسم]] |

- [[-Force]] على فولدر: آمن. على ملف موجود: بيفضّيه.
- في السكربت ضيف [[| Out-Null]] عشان الجدول ميتطبعش.`,
          lines: [
            "اعمل فولدر بالفولدرات اللي في طريقه ([[-Force]] هنا زي [[mkdir -p]]).",
            "ملف فاضي (الافتراضي ملف).",
            "ملف بمحتوى على طول.",
            "الاختصار بيشتغل برضه."
          ],
          sol: R`[[New-Item -ItemType Directory app\src, app\public -Force]] بيعمل الفولدرين (ويعمل [[app]] نفسه في السكة)، وبعدين [[New-Item app\src\server.js]]. كل أمر بيطبع جدول تحت [[Directory: C:\...\app\src]] فيه Mode و LastWriteTime و Length (صفر للملف الجديد) و Name.

لو عملت الملف قبل الفولدر هتشوف [[Could not find a part of the path '...\app\src\server.js']]، لأن New-Item مش بيعمل الفولدرات الناقصة للملف إلا بـ [[-Force]]. ولو شغّلت نفس الأمر مرتين: [[The file '...\server.js' already exists.]] وده في صالحك، أما لو ضفت [[-Force]] على ملف موجود فهيفضّيه من غير ما يسأل.`,
          solCode: R`New-Item -ItemType Directory app\src, app\public -Force
New-Item app\src\server.js
Get-ChildItem app -Recurse | Select-Object FullName`
        },
        {
          cmd: "Copy-Item",
          title: "انسخ",
          desc: R`[[Copy-Item]] بينسخ ملفات وفولدرات، زي [[cp]] في bash و [[copy]] في CMD، واختصاراته [[cp]] و [[copy]] و [[cpi]]. الشكل: المصدر الأول وبعدين الهدف. لو الهدف اسم ملف جديد بيتعمل بالاسم ده (زي [[.env.example]] لـ [[.env]])، ولو الهدف فولدر موجود، النسخة بتتحط جوّاه.

في السطر التاني [[*.js]] يعني كل الملفات اللي بتخلص بـ .js، و [[backup\]] بالـ [[\]] في الآخر بتوضح إن ده فولدر (ولازم يكون موجود قبلها). وفي السطر التالت [[-Recurse]] لازمة مع الفولدرات: بتنسخ الفولدر بكل اللي جواه، زي [[cp -r]].

تحذيرين: من غير [[-Recurse]] PowerShell بيعمل فولدر فاضي ومن غير أي error، فتفتكر النسخ نجح. ولو الملف الهدف موجود، Copy-Item بيكتب فوقه من غير ما يسأل. جرّب الأول بـ [[-WhatIf]]: بيطبعلك هيعمل إيه من غير ما يعمله.`,
          example: R`Copy-Item .env.example .env
Copy-Item *.js backup\
Copy-Item src src_backup -Recurse`,
          try: "انسخ فولدر app كله لـ [[app_copy]].",
          deep: {
            why: R`نسخ ملفات وفولدرات: [[.env.example]] لـ [[.env]]، أو نسخة من فولدر قبل ما تجرّب فيه حاجة خطيرة. نفس cp في bash.`,
            how: R`[[Copy-Item source dest]]. [[-Recurse]] لازم مع الفولدرات. [[-Force]] يكتب فوق لو موجود.

والفرق عن bash cp: الهدف لو فولدر موجود، الملف بيتحط جواه. لو الهدف اسم ملف جديد، بينشئه باسمه. وده نفس السلوك العادي.

[[-WhatIf]] في PowerShell عمومًا بيقولك هيعمل إيه من غير ما يعمله فعلًا. مفيد جدًا للأوامر الخطيرة.`,
            when: "نسخ .env.example لـ .env. نسخ فولدر مشروع للتجربة.",
            mistakes: R`نسيان [[-Recurse]] مع الفولدرات: بيعمل الفولدر فاضي ومن غير error. وتشغيل نفس النسخ مرتين على فولدر: التانية بتتحط جوه الأولى ([[app_copy\app]]). وكمان Copy-Item بيكتب فوق الملفات الموجودة من غير سؤال، فجرّب بـ [[-WhatIf]] لو الهدف فيه حاجات مهمة.`
          },
          teach: R`## الفكرة

[[Copy-Item المصدر الهدف]]. المصدر الأول، والهدف تاني. هنجرب الـ ٣ سطور، ونشوف الغلطتين اللي بيوقعوا ناس كتير (PowerShell 7.6، فولدر تجارب).

---

## ١. [[Copy-Item .env.example .env]]

نسخ ملف باسم جديد في نفس المكان. الأمر مش بيطبع حاجة لو نجح. نتأكد:

~~~powershell
Get-Content .env
~~~

~~~text الناتج
PORT=3000
~~~

نفس محتوى [[.env.example]]. ده أشهر استخدام: المشاريع بتيجي بـ [[.env.example]] فيه شكل الإعدادات، وانت تنسخه [[.env]] وتملاه.

---

## ٢. [[Copy-Item *.js backup\]]

- [[*.js]]: كل الملفات اللي بتخلص بـ .js في الفولدر الحالي.
- [[backup\]]: الهدف فولدر. الـ [[\]] في الآخر بتوضّح ده لللي بيقرا.

الفولدر لازم يكون موجود. عملته الأول بـ [[New-Item -ItemType Directory backup]]، وبعد النسخ:

~~~powershell
Get-ChildItem backup -Name
~~~

~~~text الناتج
a.js
b.js
index.js
old.js
~~~

[[-Name]] بيطبع الأسامي بس من غير جدول.

---

## ٣. [[Copy-Item src src_backup -Recurse]]

[[-Recurse]] = انسخ الفولدر **وكل اللي جوّاه**.

~~~text Get-ChildItem src_backup -Recurse -Name
server.js
util.ts
~~~

### الغلطة الأولى: من غير [[-Recurse]]

~~~powershell
Copy-Item src src_empty
Get-ChildItem src_empty -Force
~~~

مطلعش ولا سطر: الفولدر اتعمل **فاضي**، ومفيش ولا error. تفتكر النسخ نجح وهو منسخش حاجة.

### الغلطة التانية: نفس الأمر مرتين

شغّلت [[Copy-Item src src_backup -Recurse]] تاني و [[src_backup]] موجود:

~~~text Get-ChildItem src_backup -Recurse -Name
src
server.js
util.ts
src\server.js
src\util.ts
~~~

لما الهدف فولدر موجود، النسخة بتتحط **جوّاه**، فبقى عندنا [[src_backup\src]].

---

## جرّب قبل ما تنسخ: [[-WhatIf]]

~~~powershell
Copy-Item .env.example .env -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Copy File" on target "Item: C:\...\lab\.env.example Destination: C:\...\lab\.env".
~~~

بيقولك هيعمل إيه ومش بيعمله. مهم هنا لأن [[.env]] موجود، و Copy-Item كان هيكتب فوقه من غير ما يسأل.

---

## الخلاصة

| الحالة | النتيجة |
|---|---|
| الهدف اسم جديد | نسخة بالاسم ده |
| الهدف فولدر موجود | النسخة جوّاه |
| الهدف ملف موجود | بيتكتب فوقه، من غير سؤال |
| فولدر من غير [[-Recurse]] | فولدر فاضي، من غير error |

| في bash | في PowerShell |
|---|---|
| [[cp a b]] | [[Copy-Item a b]] |
| [[cp -r src dst]] | [[Copy-Item src dst -Recurse]] |
| [[cp -i]] (يسأل) | [[-WhatIf]] الأول |`,
          lines: ["انسخ ملف باسم جديد.", "انسخ كل .js لفولدر backup.", "انسخ فولدر بكل اللي جواه ([[-Recurse]])."],
          sol: R`[[Copy-Item app app_copy -Recurse]] مش بيطبع حاجة. اتأكد بـ [[Get-ChildItem app_copy -Recurse -Name]]، هتلاقي [[public]] و [[src]] و [[src\server.js]] زي الأصل بالظبط.

غلطتين شفتهم بعيني وأنا بجرب: من غير [[-Recurse]] PowerShell بيعمل [[app_copy]] فولدر فاضي ومن غير أي error، فتفتكر النسخ اشتغل. والتانية: لو شغّلت نفس الأمر مرة تانية و [[app_copy]] موجود، النسخة بتتحط جواه كـ [[app_copy\app]]. فامسح النسخة القديمة الأول أو انسخ المحتوى بـ [[Copy-Item app\* app_copy -Recurse]].`
        },
        {
          cmd: "Move-Item / Rename-Item",
          title: "انقل وغيّر الاسم",
          desc: R`[[Move-Item]] (اختصاره [[mv]] و [[move]]) بينقل ملف أو فولدر لمكان تاني، و [[Rename-Item]] (اختصاره [[ren]]) بيغيّر الاسم بس في نفس المكان. الفرق المهم: Rename-Item بياخد الاسم الجديد لوحده من غير مسار، و Move-Item بياخد مسار كامل. في bash الاتنين أمر واحد [[mv]].

وفي السطر الأول فولدر [[logs]] لازم يكون موجود قبلها: جربتها من غيره في 7 و 5.1، فأول ملف log اتنقل وبقى ملف اسمه [[logs]] (مش فولدر)، والتاني طلع [[Cannot create a file when that file already exists.]]. فاعمله الأول بـ [[New-Item -ItemType Directory logs -Force]].

السطر التالت هو القوة الحقيقية: [[Get-ChildItem *.txt]] بيجيب كل ملفات txt، والـ [[|]] بيبعتهم واحد واحد لـ Rename-Item. الأقواس المعقوفة [[{ }]] بعد [[-NewName]] اسمها script block، ودي كود صغير بيتنفذ لكل ملف لوحده. وجوّاه [[$_]] معناها «العنصر الحالي اللي جاي في الـ pipe»، يعني الملف ده بالذات، و [[$_.Name]] اسمه.

و [[-replace '\.txt$', '.md']] بيدوّر بـ regex ويبدّل: [[\.]] نقطة حقيقية (لأن النقطة لوحدها في regex معناها أي حرف)، و [[$]] يعني آخر الاسم. ولو الاسم الجديد موجود قبل كده هيطلع error للملف ده بس، فجرّب الأول بـ [[-WhatIf]].`,
          example: R`Move-Item *.log logs\
Rename-Item old.js new.js
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }`,
          try: "اعمل 3 ملفات txt وحوّلهم كلهم لـ md بالأمر الأخير.",
          deep: {
            why: R`تنظيم الملفات في فولدرات، وتغيير أسامي ملفات كتير مرة واحدة (امتداد، أو بادئة، أو مسافات). نفس mv في bash، بس مع الـ pipe بتعمل rename جماعي من غير لوب.`,
            how: R`[[Move-Item source dest]] للنقل. [[Rename-Item old new]] للتسمية (بس الاسم مش المسار الكامل).

الاتنين ممكن تتعملوا بـ Move-Item: [[Move-Item file.txt newname.txt]] بيغيّر الاسم لو في نفس الفولدر.

[[Rename-Item]] أوضح للتسمية. [[Move-Item]] أفضل للنقل لمكان تاني.`,
            when: "تنظيم الملفات. تغيير امتداد ملف.",
            mistakes: "Rename-Item بتاخد الاسم الجديد بس مش المسار كامل. Move-Item بتاخد المسار كامل."
          },
          teach: R`## الفكرة

[[Move-Item]] بيغيّر **المكان**، و [[Rename-Item]] بيغيّر **الاسم** بس. السطر الأخير في المثال أطول سطر لحد دلوقتي، فهنفكه حتة حتة. كله اتجرب في PowerShell 7.6 في فولدر فيه [[app.log]] و [[error.log]] و [[web.log]] و [[a.log]] و [[b.log]] و [[n1.txt]] لـ [[n3.txt]] و [[notes.txt]].

---

## ١. [[Move-Item *.log logs\]]

- [[*.log]]: كل ملفات اللوج.
- [[logs\]]: الفولدر الهدف، ولازم يكون موجود (عملته بـ [[mkdir logs]]).

~~~text Get-ChildItem logs -Name
a.log
app.log
b.log
error.log
web.log
~~~

الملفات اتشالت من مكانها واتحطت في [[logs]]. لو [[logs]] مكانش موجود، أول ملف كان هيتنقل ويبقى **ملف** اسمه [[logs]]، والباقي يطلع error (مكتوب في الـ desc).

---

## ٢. [[Rename-Item old.js new.js]]

الاسم القديم وبعده الاسم الجديد:

~~~text Get-ChildItem *.js -Name
a.js
b.js
index.js
new.js
~~~

[[old.js]] بقى [[new.js]]. والاسم الجديد لازم يبقى **اسم بس**. جربت [[Rename-Item new.js src\x.js]] فطلع:

~~~text error
Cannot rename the specified target, because it represents a path or device name.
~~~

عايز تنقل وتغيّر الاسم مع بعض؟ ده شغل [[Move-Item new.js src\x.js]].

---

## ٣. تغيير امتداد كل الملفات مرة واحدة

~~~powershell
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }
~~~

### الحتة الأولى: [[Get-ChildItem *.txt]]

بيرجّع ٤ objects: [[n1.txt]] و [[n2.txt]] و [[n3.txt]] و [[notes.txt]].

### الحتة التانية: [[| Rename-Item]]

الـ pipe بيسلّم كل ملف لـ Rename-Item، فـ Rename-Item عارف هيغيّر اسم **مين** من غير ما تكتبه.

### الحتة التالتة: [[-NewName { ... }]]

الاسم الجديد مش نص ثابت: ده script block بيتنفذ مرة لكل ملف، واللي يطلع منه هو الاسم الجديد بتاع الملف ده.

### الحتة الرابعة: [[$_.Name]]

[[$_]] الملف اللي عليه الدور، و [[.Name]] اسمه، زي [[n1.txt]].

### الحتة الخامسة: [[-replace '\.txt$', '.md']]

[[-replace]] بياخد حاجتين بينهم فاصلة: «دوّر على ده» و «حط ده مكانه». الأولى **regex**: لغة صغيرة لوصف شكل النص.

| جوه الـ regex | معناه |
|---|---|
| [[\.]] | نقطة حقيقية. النقطة لوحدها في regex معناها «أي حرف» |
| [[txt]] | الحروف دي |
| [[$]] | آخر النص |

يعني «.txt في **آخر** الاسم بس». جربتها على نص لوحدها:

~~~text الناتج
'notes.md' -replace '\.md$', '.txt'      →  notes.txt
'my.txt.bak' -replace '\.txt$', '.md'    →  my.txt.bak
~~~

التانية متغيرتش، لأن [[.txt]] مش في آخرها. والعلامات المفردة [[' ']] حوالين الـ regex عشان PowerShell ميفتكرش [[$]] بداية متغير.

### النتيجة

~~~text Get-ChildItem *.md -Name
n1.md
n2.md
n3.md
notes.md
~~~

الأمر نفسه مش بيطبع حاجة.

---

## الخلاصة

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[Get-ChildItem *.txt]] | هات ملفات txt |
| ٢ | [[|]] | ابعتهم واحد واحد |
| ٣ | [[Rename-Item -NewName { }]] | لكل واحد، احسب اسم جديد |
| ٤ | [[$_.Name]] | اسمه الحالي |
| ٥ | [[-replace '\.txt$', '.md']] | بدّل الامتداد في الآخر |

- [[Rename-Item]]: اسم جديد بس. [[Move-Item]]: مكان (وممكن اسم كمان).
- في bash الاتنين [[mv]]، والتغيير الجماعي محتاج لوب.
- قبل أي rename جماعي: نفس السطر بـ [[-WhatIf]] في الآخر.`,
          lines: [
            "انقل كل .log لفولدر logs (لازم يكون موجود، وإلا أول ملف هيبقى ملف اسمه logs).",
            "غيّر اسم ملف.",
            "لكل ملف .txt: غيّر امتداده لـ .md. الـ [[-replace]] بتاخد regex، والدولار في الآخر يعني «نهاية الاسم»."
          ],
          sol: R`بعد [[1..3 | ForEach-Object { New-Item "n$_.txt" }]] والأمر الأخير، [[Get-ChildItem]] هيعرض [[n1.md]] و [[n2.md]] و [[n3.md]] ومفيش ولا txt. جربته فعلًا والأمر مبيطبعش حاجة، بيغيّر وبس.

الـ [[{ }]] بعد [[-NewName]] بيتنفذ لكل ملف لوحده و [[$_]] هو الملف الحالي. أشهر غلطة إنك تكتب [[-NewName "$_.Name -replace ..."]] بعلامات تنصيص بدل الأقواس: جربتها فطلع error لكل ملف ومفيش ولا ملف اتغير، لأن [[$_]] بره الـ [[{ }]] فاضي، فالاسم الجديد بقى نص غريب بيبدأ بـ [[.Name -replace]]. وخلي بالك إن [[-replace]] بياخد regex، عشان كده النقطة مكتوبة [[\.]] و [[$]] معناها آخر الاسم، فـ [[my.txt.bak]] مش هيتغير.`,
          solCode: R`1..3 | ForEach-Object { New-Item "n$_.txt" }
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }
Get-ChildItem *.md`
        },
        {
          cmd: "Remove-Item",
          title: "امسح",
          desc: R`[[Remove-Item]] بيمسح ملفات وفولدرات، زي [[rm]] في bash و [[del]] و [[rd]] في CMD، واختصاراته [[rm]] و [[del]] و [[ri]]. المسح نهائي: مفيش سلة محذوفات، ومفيش undo.

[[-Recurse]] لازمة مع فولدر فيه حاجات: بتمسح كل اللي جواه. من غيرها PowerShell بيسألك «The item has children... Are you sure?» وده في السكربت ممكن يوقفه مستنيك. و [[-Force]] بيمسح كمان الملفات المخفية والـ read-only اللي كان هيرفضها. فـ [[-Recurse -Force]] مع بعض هي [[rm -rf]].

أهم parameter هنا [[-WhatIf]]: بيطبع سطر «What if: Performing the operation...» لكل حاجة كان هيمسحها، ومش بيمسح أي حاجة. عادة مفيدة جدًا: اكتب الأمر بـ [[-WhatIf]]، اقرا القايمة، وبعدين شيلها وشغّله. والـ wildcards شغالة ([[Remove-Item *.log]])، فاتأكد إنك في الفولدر الصح بـ [[Get-Location]] قبل أي مسح بنجمة.`,
          example: R`Remove-Item notes.txt
Remove-Item node_modules -Recurse -Force -WhatIf
Remove-Item node_modules -Recurse -Force`,
          try: "امسح [[app_copy]] بـ [[-WhatIf]] الأول واقرا الناتج، وبعدين من غيرها.",
          flag: "danger",
          deep: {
            why: R`مسح node_modules وملفات مؤقتة ولوجات قديمة. وده أخطر أمر في التاب، لأن الغلطة فيه مبتترجعش.`,
            how: R`[[-Recurse]] للفولدرات. [[-Force]] للملفات المخفية أو المحمية. [[-WhatIf]] تجرّب من غير حذف فعلي.

على عكس bash rm، Remove-Item بيسأل تأكيد لو بتحذف فولدر فيه حاجات. [[-Recurse]] هو اللي بيوقف السؤال.

wildcard شغال: [[Remove-Item *.log]] يمسح كل ملفات .log.`,
            when: "حذف node_modules. تنضيف ملفات مؤقتة.",
            mistakes: R`[[Remove-Item C:\Windows -Recurse -Force]] ده يمسح كل شئ، مفيش undo. استخدم -WhatIf الأول.`
          },
          teach: R`## الفكرة

[[Remove-Item]] بيمسح. ومفيش Recycle Bin: اللي بيتمسح من الترمنال بيروح. عشان كده الدرس ده كله عن «اتأكد قبل ما تمسح». اتجرب في PowerShell 7.6 على فولدرات عملتها للتجربة بس.

---

## ١. [[Remove-Item notes.txt]]

مسح ملف. الأمر مش بيطبع حاجة. نتأكد:

~~~powershell
Test-Path notes.txt
~~~

~~~text الناتج
False
~~~

[[Test-Path]] بيقول الحاجة دي موجودة ولا لأ (الدرس اللي بعده).

---

## ٢. [[Remove-Item node_modules -Recurse -Force -WhatIf]]

| الحتة | معناها |
|---|---|
| [[-Recurse]] | امسح الفولدر بكل اللي جوّاه |
| [[-Force]] | وامسح المخفي والـ read-only كمان |
| [[-WhatIf]] | **متمسحش**، قولّي بس هتمسح إيه |

جربتها على فولدر اسمه [[src_backup]]:

~~~text الناتج
What if: Performing the operation "Remove Directory" on target "C:\...\lab\src_backup".
~~~

و [[Test-Path src_backup]] بعدها رجّع [[True]]: لسه موجود.

اقرا السطر ده كويس: [[target]] هو المسار الكامل اللي هيتمسح. لو المسار مش اللي انت متخيله (واقف في فولدر غلط مثلًا)، دي فرصتك.

---

## ٣. [[Remove-Item node_modules -Recurse -Force]]

نفس السطر من غير [[-WhatIf]]: المسح الحقيقي. مش بيطبع حاجة، و [[Test-Path src_backup]] رجّع [[False]].

ولو شغلته تاني:

~~~text error
Cannot find path 'C:\...\lab\src_backup' because it does not exist.
~~~

ده مش مشكلة، ده معناه إنه اتمسح خلاص.

---

## من غير [[-Recurse]] على فولدر فيه حاجات

في ترمنال عادي PowerShell بيوقف ويسألك «The item at ... has children and the Recurse parameter was not specified... Are you sure you want to continue?» ومستنيك تكتب Y أو N. جربت الحالة دي من سكربت مش تفاعلي فطلع بدل السؤال:

~~~text error
PowerShell is in NonInteractive mode. Read and Prompt functionality is not available.
~~~

ومتمسحش حاجة. يعني في سكربت متشغّل لوحده (Task Scheduler مثلًا)، نسيان [[-Recurse]] يا يوقفه يا يفشّله.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ١. اتأكد انت فين | [[Get-Location]] |
| ٢. جرّب | [[Remove-Item اسم -Recurse -Force -WhatIf]] |
| ٣. اقرا سطور What if | المسار صح؟ |
| ٤. امسح | نفس السطر من غير [[-WhatIf]] |

| في bash | في PowerShell |
|---|---|
| [[rm file]] | [[Remove-Item file]] |
| [[rm -rf dir]] | [[Remove-Item dir -Recurse -Force]] |
| مفيش | [[-WhatIf]] |`,
          lines: [
            "امسح ملف.",
            "جرّب مسح node_modules من غير ما تمسح فعلًا ([[-WhatIf]] يطبع هيعمل إيه).",
            "امسحه فعلًا: بكل اللي جواه ([[-Recurse]]) ومن غير أسئلة ([[-Force]])."
          ],
          sol: R`مع [[-WhatIf]] هتشوف سطر زي [[What if: Performing the operation "Remove Directory" on target "C:\lab\app_copy".]] والفولدر لسه موجود ([[Test-Path app_copy]] يرجع True). من غير [[-WhatIf]] الأمر مش بيطبع حاجة، و [[Test-Path app_copy]] يرجع False.

لو شغلته تاني بعد ما اتمسح هيقولك [[Cannot find path '...\app_copy' because it does not exist.]] وده معناه إنه اتمسح فعلًا مش إن فيه مشكلة. ولو نسيت [[-Recurse]] على فولدر فيه ملفات، PowerShell هيسألك «The item has children... Are you sure?» في الترمنال، وفي السكربت ده ممكن يوقفه مستنيك. ومفيش Recycle Bin هنا، اللي اتمسح راح.`
        },
        {
          cmd: "Test-Path",
          title: "الملف ده موجود؟",
          desc: R`[[Test-Path]] بيسأل سؤال واحد: المسار ده موجود ولا لأ؟ وبيرجع [[True]] أو [[False]] بس، من غير أي error لو مش موجود. عشان كده هو الأساس في أي سكربت قبل ما يقرا ملف أو يمسح فولدر. في bash المقابل [[[ -e .env ]]] وفي CMD [[if exist .env]].

السطر التاني فيه أول [[if]] هتشوفه: الشرط بين أقواس هلالية [[( )]]، والكود اللي هيتنفذ بين أقواس معقوفة [[{ }]]، و [[else]] اللي يتنفذ لو الشرط False. والنص لوحده بين علامات تنصيص ([["found"]]) بيتطبع على طول، من غير echo.

وتقدر تحدد النوع: [[-PathType Leaf]] يعني ملف بس، و [[-PathType Container]] يعني فولدر بس. والمسار اللي فيه مسافات حطه بين علامات تنصيص. وللعكس استخدم [[-not]]: [[if (-not (Test-Path logs)) { mkdir logs }]].`,
          example: R`Test-Path .env
if (Test-Path .env) { "found" } else { "missing" }`,
          try: "اختبر ملف موجود وملف مش موجود.",
          deep: {
            why: "تتأكد إن ملف أو فولدر موجود قبل ما تعمل حاجة. مش هيطلع error، هيرجع True أو False.",
            how: R`[[Test-Path "C:\file.txt"]] بيرجع [[True]] أو [[False]]. [[-PathType Container]] بيتأكد إنه فولدر. [[-PathType Leaf]] بيتأكد إنه ملف.

في السكربتات: [[if (Test-Path $file) { ... }]]. بدل ما تجرّب وتمسك الـ error.`,
            when: "في أي سكربت قبل ما يتعامل مع ملف. تتأكد إن .env موجود قبل التشغيل.",
            mistakes: R`تنسى علامات التنصيص حوالين مسار فيه مسافات. أو تفتكر [[Test-Path]] بيقولك إن الملف «سليم» أو «تقدر تقراه»: هو بيقول موجود بس. أو تكتب [[if (Test-Path $file -eq $false)]] بدل [[if (-not (Test-Path $file))]]، فـ [[-eq]] تتبعت لـ Test-Path كأنها parameter وتطلع error.`
          },
          teach: R`## الفكرة

[[Test-Path]] بيرجّع [[True]] أو [[False]]: المسار ده موجود ولا لأ. مش بيطلع error أبدًا لو مش موجود، وده اللي مخليه ينفع جوه [[if]]. اتجرب في PowerShell 7.6 في فولدر فيه [[.env.example]] ومفيهوش [[.env]].

---

## ١. [[Test-Path .env]]

~~~text الناتج
False
~~~

[[False]] = مش موجود. [[True]] و [[False]] اسمهم boolean: نوع قيمته واحدة من الاتنين دول بس. وجربت [[Test-Path .env.example]] فرجّع [[True]].

---

## ٢. [[if (Test-Path .env) { "found" } else { "missing" }]]

ده أول [[if]] في التاب، فنفكه:

~~~text شكل الـ if
if  ( الشرط )  { لو True }  else  { لو False }
~~~

| الحتة | معناها |
|---|---|
| [[if]] | «لو» |
| [[(Test-Path .env)]] | الشرط بين أقواس عادية. بيتنفذ ويطلع True أو False |
| [[{ "found" }]] | الكود اللي يتنفذ لو True |
| [[else]] | «وإلا» |
| [[{ "missing" }]] | الكود اللي يتنفذ لو False |

و [["found"]] لوحدها: نص بين علامات تنصيص في PowerShell بيتطبع على طول، من غير echo.

~~~text الناتج (مفيش .env)
missing
~~~

ونفس السطر بـ [[.env.example]] طبع [[found]].

---

## ٣. ملف ولا فولدر؟ [[-PathType]]

| الأمر | الناتج | ليه |
|---|---|---|
| [[Test-Path src -PathType Container]] | [[True]] | [[src]] فولدر، والفولدر اسمه Container (حاوية) |
| [[Test-Path src -PathType Leaf]] | [[False]] | Leaf (ورقة شجر) يعني ملف، و src مش ملف |
| [[Test-Path src\server.js -PathType Leaf]] | [[True]] | ده ملف |

---

## ٤. العكس: [[-not]]

~~~powershell
if (-not (Test-Path logs)) { "no logs" }
~~~

~~~text الناتج
no logs
~~~

[[-not]] بيقلب: True تبقى False والعكس. والأقواس حوالين [[(Test-Path logs)]] لازمة عشان [[-not]] تتطبق على الناتج.

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| موجود؟ | [[Test-Path x]] | [[[ -e x ]]] |
| ملف؟ | [[Test-Path x -PathType Leaf]] | [[[ -f x ]]] |
| فولدر؟ | [[Test-Path x -PathType Container]] | [[[ -d x ]]] |
| مش موجود؟ | [[-not (Test-Path x)]] | [[[ ! -e x ]]] |

[[Test-Path]] بيقول «موجود» بس، مش «سليم» ولا «تقدر تقراه».`,
          lines: ["الملف موجود؟ True أو False.", "نفس السؤال جوه شرط."],
          sol: R`[[Test-Path app]] (موجود) رجّع [[True]] و [[Test-Path nope.txt]] رجّع [[False]]، والسطر التاني في المثال طبع [[missing]] عشان مكانش عندي .env.

خد بالك إن [[Test-Path]] مش بيطلع error أبدًا لو الملف مش موجود، بيرجع False وبس، وده اللي مخليه مناسب لـ [[if]]. ولو عايز تفرق بين ملف وفولدر استخدم [[-PathType Leaf]] للملف و [[-PathType Container]] للفولدر: [[Test-Path app -PathType Leaf]] هترجع False لأن app فولدر.`
        },
        {
          cmd: "Get-Item",
          title: "بيانات ملف واحد",
          desc: R`[[Get-Item]] بيجيب object واحد لملف أو فولدر بكل بياناته (من غير محتواه، المحتوى ده شغل Get-Content). أهم الخصائص: [[Length]] الحجم بالبايت، و [[LastWriteTime]] آخر تعديل، و [[CreationTime]] وقت الإنشاء، و [[Extension]] الامتداد، و [[FullName]] المسار الكامل.

الأقواس الهلالية في [[(Get-Item .\app.log).Length]] معناها «نفّذ الأمر ده الأول، وبعدين خد من الناتج الخاصية دي». من غير الأقواس PowerShell هيعتبر [[.Length]] جزء من اسم الملف. وفي السطر التالت [[Format-List *]] بيعرض كل الخصائص في قايمة، كل خاصية في سطر، والنجمة يعني «كلهم» بدل الكام عمود اللي بيظهروا افتراضيًا.

في bash أقرب حاجة [[stat app.log]]. والحجم تقدر تحوّله على طول: [[(Get-Item .\app.log).Length / 1KB]] بالكيلو، لأن [[1KB]] و [[1MB]] أرقام جاهزة في PowerShell. وخلي بالك: الفولدر مفيهوش Length، حجمه بيتحسب بـ Measure-Object (المستوى التاني).`,
          example: R`(Get-Item .\app.log).Length
(Get-Item .\app.log).LastWriteTime
Get-Item .\app.log | Format-List *`,
          try: "اعرف حجم وتاريخ آخر تعديل لأي ملف.",
          deep: {
            why: "جلب object يمثّل ملف أو فولدر بكل properties بتاعته: الحجم، وتاريخ الإنشاء، والامتداد.",
            how: R`[[Get-Item "file.txt"]] بيرجع object بيه [[Length]] (الحجم)، و[[CreationTime]]، و[[LastWriteTime]]، و[[Extension]]، وغيرهم.

بعد ما تجيب الـ object تقدر تستخدم properties: [[(Get-Item "file.txt").Length]] يجيب الحجم بالبايت.

[[Get-ItemProperty]] بتاخد properties من الـ registry أو من الملفات كـ key-value.`,
            when: "تعرف آخر تعديل على ملف. تجيب الحجم. تستخدم metadata في سكربت.",
            mistakes: "الخلط بينه وبين Get-Content. Get-Item بيجيب معلومات الملف، Get-Content بيجيب محتواه."
          },
          teach: R`## الفكرة

[[Get-Item]] بيرجّع object **واحد** للملف: بياناته (الحجم والتواريخ والمسار)، من غير المحتوى. الأمثلة اتجربت على [[app.log]] حجمه 1139 بايت، في PowerShell 7.6.

---

## ١. [[(Get-Item .\app.log).Length]]

بترتيب التنفيذ:

1. [[Get-Item .\app.log]] جوه الأقواس بيتنفذ الأول ويرجّع object الملف.
2. [[.Length]] بتاخد من الـ object خانة الحجم.

~~~text الناتج
1139
~~~

الرقم بالبايت. عايزه بالكيلو؟

~~~powershell
(Get-Item .\app.log).Length / 1KB
~~~

~~~text الناتج
1.1123046875
~~~

لأن 1139 ÷ 1024 = 1.112... و [[1KB]] رقم جاهز = 1024.

---

## ٢. [[(Get-Item .\app.log).LastWriteTime]]

~~~text الناتج
Tuesday, October 6, 2026 9:37:42 AM
~~~

ده object تاريخ مش نص، فتقدر تاخد منه كمان: [[.Year]] أو [[.Hour]]، أو تقارنه بتاريخ تاني. وشكل الطباعة بيتبع لغة ويندوز.

---

## ٣. [[Get-Item .\app.log | Format-List *]]

[[Get-Item .\app.log]] لوحده بيطبع سطر واحد زي Get-ChildItem (Mode و LastWriteTime و Length و Name). الخانات التانية موجودة بس مستخبية. [[Format-List]] بيعرض الخانات كقايمة، كل خانة في سطر، و [[*]] يعني «كلها».

~~~text جزء من الناتج (المسارات اتختصرت)
PSChildName         : app.log
PSIsContainer       : False
Mode                : -a---
BaseName            : app
Name                : app.log
Length              : 1139
DirectoryName       : C:\...\lab
IsReadOnly          : False
Exists              : True
FullName            : C:\...\lab\app.log
Extension           : .log
CreationTime        : 10/6/2026 9:37:42 AM
CreationTimeUtc     : 10/6/2026 6:37:42 AM
LastAccessTime      : 10/6/2026 9:37:42 AM
LastWriteTime       : 10/6/2026 9:37:42 AM
Attributes          : Archive
~~~

### أهم الخانات

| الخانة | معناها |
|---|---|
| [[Name]] / [[BaseName]] / [[Extension]] | الاسم كامل / من غير امتداد / الامتداد بس |
| [[FullName]] | المسار الكامل |
| [[DirectoryName]] | الفولدر اللي هو فيه |
| [[PSIsContainer]] | فولدر؟ هنا [[False]] |
| [[CreationTime]] / [[LastWriteTime]] | اتعمل إمتى / اتعدل إمتى |
| [[...Utc]] | نفس الوقت بتوقيت جرينتش: الفرق ٣ ساعات هنا لأن ساعة الجهاز على UTC+3 |
| [[Attributes]] | [[Archive]] = ملف عادي |

---

## فخ: [[.Length]] على فولدر

جربت [[(Get-Item .\src).Length]] على فولدر فطلع [[1]] (في 7.6 و 5.1). الفولدر معندوش خاصية Length أصلًا، فـ PowerShell بيرجّع «عدد الحاجات» اللي في إيدك: object واحد = 1. يعني الرقم ده **مش** حجم. و [[Get-Item .\src | Select-Object Name, Length]] بيوريها صح: عمود Length فاضي. حجم الفولدر بيتحسب بـ Measure-Object.

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| الحجم | [[(Get-Item f).Length]] | [[stat -c %s f]] |
| آخر تعديل | [[(Get-Item f).LastWriteTime]] | [[stat -c %y f]] |
| كل حاجة | [[Get-Item f | Format-List *]] | [[stat f]] |

[[Get-Item]] = بيانات الملف. [[Get-Content]] = اللي مكتوب جوّاه.`,
          lines: [
            "حجم الملف بالبايت. الأقواس عشان تاخد الـ object الأول وبعدين تقرا منه property.",
            "آخر تعديل.",
            "كل الـ properties بتاعته في قايمة."
          ],
          sol: R`[[(Get-Item .\app.log).Length]] بيرجع رقم بالبايت زي [[1532]]، و [[.LastWriteTime]] بيرجع التاريخ والوقت. ولو عايز الحجم بالكيلو: [[(Get-Item .\app.log).Length / 1KB]].

لو جربتها على فولدر هتلاقي [[.Length]] بيرجع [[1]] (جربتها في 7.6 و 5.1)، وده مش حجم: الفولدر (DirectoryInfo) مفيهوش Length، فـ PowerShell بيرجع عدد الحاجات اللي في إيدك (object واحد). حجمه لازم يتحسب بـ Measure-Object (درس Measure-Object). ولو الملف بيبدأ بنقطة زي [[.env]] على لينكس أو الماك، [[Get-Item]] مش هيلاقيه إلا بـ [[-Force]] لأنه مخفي هناك، أما على ويندوز النقطة مش بتخفي حاجة.`
        }
      ]
    }
]);
