// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "قراءة وكتابة الملفات",
      l: 1,
      n: "",
      items: [
        {
          cmd: "Get-Content",
          title: "اقرا الملف (cat / tail)",
          desc: R`[[Get-Content]] بيقرا ملف ويطبعه، زي [[cat]] في bash و [[type]] في CMD، واختصاراته [[cat]] و [[gc]] و [[type]]. الناتج مش نص واحد: ده array، كل سطر عنصر لوحده، فـ [[(Get-Content app.log).Count]] بيرجع عدد السطور (الأقواس بتنفّذ الأول وبعدين [[.Count]] بتعدّ).

الإضافات: [[-Tail 20]] آخر ٢٠ سطر بس (زي [[tail -n 20]])، و [[-Wait]] بيفضل فاتح الملف ويطبع أي سطر جديد يتضاف (زي [[tail -f]]) لحد ما تدوس Ctrl+C، و [[-TotalCount 5]] أول ٥ سطور (زي head). و [[-Raw]] بيقرا الملف كله كنص واحد بدل array، ودي اللي محتاجها مع JSON (الدرس اللي بعد الجاي).

مع لوج كبير متعملش [[-Wait]] لوحدها، هيطبع الملف كله الأول. استخدم [[-Tail 5 -Wait]] زي السطر التالت. ولو العربي طالع رموز غريبة في 5.1، حدد الترميز: [[-Encoding utf8]].`,
          example: R`Get-Content package.json
Get-Content app.log -Tail 20
Get-Content app.log -Tail 5 -Wait
(Get-Content app.log).Count`,
          try: R`في نافذة [[Get-Content app.log -Wait]]، وفي نافذة تانية [[Add-Content app.log "hello"]].`,
          deep: {
            why: R`قراية ملف هي أكتر حاجة بتعملها بعد ls: تشوف .env، أو config، أو آخر سطور في لوج وقع فيه السيرفر. Get-Content بيعمل شغل cat و head و tail و tail -f في أمر واحد.`,
            how: R`[[Get-Content file.txt]] بيرجع array من السطور. كل سطر object منفصل (String).

[[-Tail 20]] آخر ٢٠ سطر (زي tail -n). [[-Wait]] بيفضل يراقب الملف وياخد السطور الجديدة (زي tail -f).

[[Get-Content file.json | ConvertFrom-Json]] بيقرا JSON مباشرة لـ object.

[[Get-Content]] بيحمّل الملف كله في الذاكرة. للملفات الضخمة: [[Switch -File]] أسرع.`,
            when: "قراية .env. قراية config.json. مراقبة لوج.",
            mistakes: "تستخدمه على لوج ضخم بـ -Wait وتحمّله كله. استخدم -Tail مع -Wait."
          },
          teach: R`## الفكرة

[[Get-Content]] بيقرا الملف ويرجّعه **سطور**: array، كل سطر عنصر لوحده. الأمثلة اتجربت في PowerShell 7.6 على [[package.json]] صغير و [[app.log]] فيه ٣١ سطر: ٣٠ سطر [[INFO]] وفي الآخر سطر [[ERROR]].

---

## ١. [[Get-Content package.json]]

~~~text الناتج
{
  "name": "myapp",
  "version": "1.2.0",
  "scripts": { "dev": "node index.js" },
  "dependencies": { "express": "^4.19.2", "dotenv": "^16.4.5" }
}
~~~

الملف زي ما هو، زي [[cat]] في bash.

---

## ٢. [[Get-Content app.log -Tail 20]]

[[-Tail 20]] = آخر ٢٠ سطر. جربتها بـ [[-Tail 3]] عشان الناتج يبقى قصير:

~~~text الناتج
2026-10-06 10:00:29 INFO request 29
2026-10-06 10:00:30 INFO request 30
2026-10-06 10:01:00 ERROR db timeout
~~~

ليه الآخر؟ لأن اللوج بيتكتب من تحت، فآخر سطور = آخر اللي حصل. والعكس [[-TotalCount 2]] طبع أول سطرين ([[request 1]] و [[request 2]]).

---

## ٣. [[Get-Content app.log -Tail 5 -Wait]]

[[-Wait]] = متقفلش الملف. اطبع آخر ٥، وبعدين استنى، وكل ما سطر جديد يتضاف اطبعه. الأمر مش بيرجعلك الـ prompt لحد ما تدوس Ctrl+C. ده [[tail -f]] بتاع لينكس، وبيتستخدم وانت بتشغّل سيرفر وعايز تشوف اللوج لحظة بلحظة.

ليه [[-Tail 5]] معاه؟ من غيره [[-Wait]] بيطبع الملف **كله** الأول، ولوج فيه مليون سطر هيغرّق الشاشة.

---

## ٤. [[(Get-Content app.log).Count]]

~~~text الناتج
31
~~~

الأقواس نفّذت [[Get-Content]] الأول، فبقى في إيدنا array من ٣١ نص، و [[.Count]] عدّتهم. نتأكد من النوع:

| الأمر | الناتج | يعني |
|---|---|---|
| [[(Get-Content app.log).GetType().Name]] | [[Object[]]] | array |
| [[(Get-Content app.log -Raw).GetType().Name]] | [[String]] | نص واحد |
| [[(Get-Content app.log)[0]]] | أول سطر | العدّ من صفر |
| [[(Get-Content app.log)[-1]]] | [[... ERROR db timeout]] | [[-1]] = آخر عنصر |

[[GetType()]] method بتقول نوع أي حاجة، و [[.Name]] اسم النوع. و [[-Raw]] بيقرا الملف كنص واحد بدل سطور، ودي اللي محتاجها مع JSON.

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| الملف كله | [[Get-Content f]] | [[cat f]] |
| آخر N | [[Get-Content f -Tail N]] | [[tail -n N f]] |
| أول N | [[Get-Content f -TotalCount N]] | [[head -n N f]] |
| تابع الجديد | [[Get-Content f -Tail 5 -Wait]] | [[tail -f f]] |
| عدد السطور | [[(Get-Content f).Count]] | [[wc -l f]] |
| نص واحد | [[Get-Content f -Raw]] | [[cat f]] |`,
          lines: [
            "اطبع الملف كله (زي cat).",
            "آخر ٢٠ سطر (زي tail).",
            "آخر ٥ سطور وتابع اللي جاي (زي tail -f). Ctrl+C يوقف.",
            "عدد السطور، لأن Get-Content بيرجع array وكل سطر عنصر."
          ],
          sol: R`في النافذة الأولى [[Get-Content app.log -Wait]] هيطبع محتوى الملف الموجود ويفضل مستني. أول ما تكتب [[Add-Content app.log "hello"]] في النافذة التانية، هتلاقي [[hello]] ظهرت في الأولى خلال ثانية تقريبًا. تخرج من المتابعة بـ Ctrl+C.

لو الملف كبير ضيف [[-Tail 5]] عشان ميطبعش كل اللي فيه الأول. ولو مظهرش حاجة، اتأكد إن النافذتين واقفين في نفس الفولدر (الاسم نسبي)، بـ [[Get-Location]] في الاتنين.`
        },
        {
          cmd: "Set-Content / Add-Content",
          title: "اكتب في ملف",
          desc: "Set-Content بيكتب من الأول، Add-Content بيضيف. [[>]] و [[>>]] شغالين برضه. في PowerShell 7 كله UTF-8 عادي. في Windows PowerShell 5.1 القديم [[>]] بتكتب UTF-16، وحتى [[-Encoding utf8]] بتحط علامة BOM مخفية في أول الملف، والاتنين ممكن يبوّظوا ملفات .env مع Node. الحل الأنضف: استخدم PowerShell 7 (أول أمر في الأساسيات).",
          example: R`Set-Content .env "PORT=3000" -Encoding utf8
Add-Content .env "NODE_ENV=development"
Get-Process | Out-File procs.txt -Encoding utf8`,
          try: "اعمل .env بسطرين واعرضه.",
          deep: {
            why: R`سكربتات كتير بتكتب ملفات: .env لمشروع جديد، أو لوج، أو ناتج أمر عايز تحفظه. والكتابة على ويندوز فيها فخ الترميز (UTF-16 و BOM) اللي بيبوّظ ملفات بتقراها أدوات تانية، فلازم تعرف الأمر بيكتب إزاي.`,
            how: R`[[Set-Content]] بيكتب ويمسح اللي كان (زي [[>]]). [[Add-Content]] بيضيف في الآخر (زي [[>>]]).

الـ encoding الافتراضي بيفرق: في 5.1 [[Set-Content]] بيكتب ANSI و [[>]] بيكتب UTF-16، وفي PowerShell 7 الاتنين UTF-8 من غير BOM. [[-Encoding UTF8]] صريح. [[-Encoding ASCII]] لملفات تانية ممكن تحتاجها.

[[Out-File]] بديل: بتاخد output من pipeline وتكتبه.`,
            when: "سكربت بيكتب .env. حفظ ناتج أمر في ملف.",
            mistakes: "Set-Content مع [[-Encoding UTF8]] على ويندوز القديم بيحط BOM في الأول. استخدم [[-Encoding UTF8NoBOM]] مع PowerShell 7."
          },
          teach: R`## الفكرة

[[Set-Content]] = اكتب الملف من الأول (اللي كان فيه يتمسح). [[Add-Content]] = ضيف في الآخر. و [[Out-File]] = خد ناتج أي أمر واكتبه في ملف. والمهم في الدرس ده **الترميز**، فهنبص على البايتات نفسها.

---

## ١. [[Set-Content .env "PORT=3000" -Encoding utf8]]

| الحتة | معناها |
|---|---|
| [[.env]] | اسم الملف. لو مش موجود بيتعمل، ولو موجود بيتمسح اللي فيه |
| [["PORT=3000"]] | اللي هيتكتب |
| [[-Encoding utf8]] | اكتب الحروف بترميز UTF-8 |

### يعني إيه encoding؟

الملف على الديسك أرقام (بايتات). الـ encoding هو القاموس اللي بيقول كل حرف يتكتب بأنهي رقم. UTF-8 هو القاموس اللي كل الأدوات الحديثة (Node و Git و VS Code) متوقعاه، وفيه الحروف الإنجليزية بايت واحد لكل حرف.

---

## ٢. [[Add-Content .env "NODE_ENV=development"]]

بيضيف سطر جديد في الآخر من غير ما يلمس اللي قبله.

~~~powershell
Get-Content .env
(Get-Content .env).Count
~~~

~~~text الناتج (PowerShell 7.6)
PORT=3000
NODE_ENV=development
2
~~~

---

## ٣. نبص على البايتات: ليه 5.1 بتعمل مشاكل

~~~powershell
[System.IO.File]::ReadAllBytes("$PWD\.env")[0..3] -join ' '
~~~

السطر ده بيقرا الملف أرقام، بترتيب التنفيذ:

1. [[$PWD]] متغير جاهز فيه الفولدر الحالي، فـ [["$PWD\.env"]] المسار الكامل.
2. [[[System.IO.File]::ReadAllBytes(...)]] بينادي function جاهزة من .NET (المكتبة اللي PowerShell مبني عليها) بترجّع بايتات الملف. [[::]] معناها «نادي حاجة جاهزة جوه النوع ده».
3. [[[0..3]]] أول ٤ بايتات بس: [[0..3]] يعني من 0 لـ 3.
4. [[-join ' ']] لزقهم بمسافة.

| اتكتب بـ | أول البايتات | يعني |
|---|---|---|
| PowerShell 7: [[Set-Content -Encoding utf8]] | [[80 79 82 84]] | P و O و R و T على طول. نضيف |
| PowerShell 7: [[>]] | [[80 79 82 84]] | نفس الكلام |
| 5.1: [[Set-Content -Encoding utf8]] | [[239 187 191 80 79]] | ٣ بايتات زيادة قبل P: ده الـ BOM |
| 5.1: [[>]] | [[255 254 80 0 79 0]] | UTF-16: كل حرف بايتين (P وبعدها صفر) |

الـ BOM (Byte Order Mark) علامة مخفية في أول الملف. المحرر مش هيوريهالك، بس برنامج زي مكتبة dotenv ممكن يقرا أول مفتاح على إنه «BOM+PORT» مش «PORT». وملف UTF-16 كتير من أدوات لينكس و Node مش بتفهمه أصلًا.

---

## ٤. [[Get-Process | Out-File procs.txt -Encoding utf8]]

[[Out-File]] بياخد اللي جاي في الـ pipe ويكتبه **زي ما كان هيتطبع على الشاشة**. جربتها على عملية واحدة ([[Get-Process -Id $PID]]):

~~~text Get-Content procs.txt
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     67    35.75      95.70       0.66   38208   1 pwsh
~~~

يعني الملف فيه الجدول كنص، مش بيانات تقدر تقراها تاني كـ objects. للبيانات استخدم Export-Csv أو ConvertTo-Json (درس «صدّر الناتج»).

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| اكتب من الأول | [[Set-Content f "..."]] | [[echo "..." > f]] |
| ضيف في الآخر | [[Add-Content f "..."]] | [[echo "..." >> f]] |
| ناتج أمر لملف | [[أمر | Out-File f]] | [[أمر > f]] |

- في PowerShell 7 كله UTF-8 من غير BOM. خلّص.
- في 5.1: [[>]] = UTF-16، و [[-Encoding utf8]] = UTF-8 **بـ** BOM. لو الملف رايح لـ Node أو Git، اكتبه من PowerShell 7.`,
          lines: [
            "اكتب في الملف ويمسح القديم (زي [[>]]). [[-Encoding utf8]]: في PowerShell 7 من غير BOM، لكن في 5.1 بيحط BOM في أول الملف.",
            "ضيف سطر في الآخر (زي [[>>]]).",
            "ودّي ناتج أمر لملف بدل الشاشة."
          ],
          sol: R`[[Set-Content .env "PORT=3000"]] وبعدين [[Add-Content .env "NODE_ENV=development"]] وبعدين [[Get-Content .env]] بيطبع السطرين: [[PORT=3000]] و [[NODE_ENV=development]]. و [[(Get-Content .env).Count]] يرجع [[2]].

لو لقيت سطر واحد بس، يبقى استخدمت Set-Content في المرتين فالتانية كتبت فوق الأولى. ولو انت على PowerShell 7 الملف UTF-8 من غير BOM (أنا فحصت أول بايتات الملف فطلعوا حروف PORT على طول). أما في 5.1، [[-Encoding utf8]] بيحط 3 بايتات BOM في الأول، وساعات مكتبة .env تقرا أول مفتاح على إنه مش PORT، فيبقى [[process.env.PORT]] فاضي من غير سبب واضح.`
        },
        {
          cmd: "ConvertFrom-Json",
          title: "اقرا JSON كـ object",
          desc: R`JSON نص، و [[ConvertFrom-Json]] بيحوّله لـ object تقدر تقرا منه بالنقطة: [[$pkg.version]] و [[$pkg.scripts.dev]]. مفيد مع package.json وملفات الإعدادات وردود الـ APIs. في bash محتاج أداة زي [[jq]]، هنا مبني جوه.

في السطر الأول [[$pkg]] متغير (أي اسم بيبدأ بـ [[$]])، و [[=]] بتحط فيه الناتج. [[-Raw]] بتقرا الملف كله نص واحد (من غيرها Get-Content بيرجع سطور منفصلة. ConvertFrom-Json في 7.6 و 5.1 لمّ السطور واشتغل في تجربتي، بس [[-Raw]] أسرع وأوضح). والـ [[|]] بتبعت النص لـ ConvertFrom-Json.

بعد كده [[$pkg.dependencies]] نفسه object جواه حقول، فبيتطبع كجدول بأسامي المكتبات ونسخها. ولو كتبت اسم حقل مش موجود مش هيطلع error، هيرجع فاضي ([[$null]])، فلو حاجة رجعت فاضية راجع الاسم والكابيتال. ولو عايز تعدّل وتكتب الملف تاني، ده درس «عدّل ملف JSON واكتبه» في المستوى التالت.`,
          example: R`$pkg = Get-Content package.json -Raw | ConvertFrom-Json
$pkg.version
$pkg.dependencies`,
          try: "اطبع اسم ونسخة أي مشروع Node عندك.",
          deep: {
            why: "تتعامل مع JSON response من API أو تقرا ملف JSON. PowerShell بيحوّله لـ objects تقدر توصل لـ properties بسهولة.",
            how: R`[[ConvertFrom-Json]] بياخد نص JSON ويرجع object. [[ConvertTo-Json]] بيعمل العكس.

مع curl أو Invoke-WebRequest: الـ response جاي كنص، فتعمل [[| ConvertFrom-Json]] تحوّله.

[[-Depth]] في ConvertTo-Json مهمة: افتراضيًا بيتعمق بس ٢ مستوى. لو عندك JSON معقّد، زوّد الرقم: [[-Depth 10]].`,
            when: "أي تعامل مع API responses أو قراية package.json أو config.json.",
            mistakes: "ConvertTo-Json بـ Depth قليل يقطع الـ objects العميقة ويحوّل بعضها لنص زي «System.Object»."
          },
          teach: R`## الفكرة

JSON مجرد نص. [[ConvertFrom-Json]] بيحوّله object، فتقرا منه بالنقطة. اتجرب في PowerShell 7.6 على الـ package.json ده:

~~~text package.json
{
  "name": "myapp",
  "version": "1.2.0",
  "scripts": { "dev": "node index.js" },
  "dependencies": { "express": "^4.19.2", "dotenv": "^16.4.5" }
}
~~~

---

## ١. [[$pkg = Get-Content package.json -Raw | ConvertFrom-Json]]

بترتيب التنفيذ:

### [[Get-Content package.json -Raw]]

بيقرا الملف كله كنص **واحد** ([[-Raw]]). جربت [[(Get-Content package.json -Raw).GetType().Name]] فطلع [[String]].

### [[| ConvertFrom-Json]]

بياخد النص ويفهمه: كل [[{ }]] في JSON بيبقى object، وكل [[[ ]]] بيبقى array، وكل [["key": value]] بيبقى خانة.

### [[$pkg =]]

بيحط الـ object في متغير اسمه [[$pkg]]، فالسطر ده مش بيطبع حاجة.

ونوع اللي في [[$pkg]]:

~~~powershell
$pkg | Get-Member -MemberType NoteProperty
~~~

~~~text الناتج
   TypeName: System.Management.Automation.PSCustomObject

Name         MemberType   Definition
----         ----------   ----------
dependencies NoteProperty System.Management.Automation.PSCustomObject dependencies=@{express=^4.19.2; dotenv=^16.4.5}
name         NoteProperty string name=myapp
scripts      NoteProperty System.Management.Automation.PSCustomObject scripts=@{dev=node index.js}
version      NoteProperty string version=1.2.0
~~~

[[PSCustomObject]] object معمول على المقاس، و [[NoteProperty]] خانة اتضافت له من الـ JSON. لاحظ إن [[name]] و [[version]] نوعهم [[string]]، لكن [[dependencies]] و [[scripts]] نفسهم objects جوّاهم خانات.

---

## ٢. [[$pkg.version]]

~~~text الناتج
1.2.0
~~~

---

## ٣. [[$pkg.dependencies]]

~~~text الناتج
express dotenv
------- ------
^4.19.2 ^16.4.5
~~~

ده object، فـ PowerShell بيطبعه جدول: أسامي الخانات فوق والقيم تحت. ولو عايز قيمة واحدة: نقطة تانية، زي [[$pkg.scripts.dev]] اللي طبع [[node index.js]].

---

## اسم غلط = فاضي، مش error

جربت [[$pkg.nope]]: مطبعش حاجة خالص. PowerShell بيرجّع [[$null]] (يعني «ولا حاجة») لخانة مش موجودة. فلو حاجة طلعت فاضية، راجع الاسم.

---

## حطهم في نص: [[$( )]]

~~~powershell
"$($pkg.name)@$($pkg.version)"
~~~

~~~text الناتج
myapp@1.2.0
~~~

جوه نص بين double quotes، [[$( )]] معناها «نفّذ اللي جوّا وحط ناتجه هنا». لازمة لأن [["$pkg.name"]] من غيرها بتحط [[$pkg]] كله وبعده كلمة [[.name]].

---

## الخلاصة

| الخطوة | الكود | النتيجة |
|---|---|---|
| ١ | [[Get-Content package.json -Raw]] | نص واحد |
| ٢ | [[| ConvertFrom-Json]] | object |
| ٣ | [[$pkg = ...]] | محفوظ في متغير |
| ٤ | [[$pkg.version]] و [[$pkg.scripts.dev]] | القيم بالنقطة |

في bash ده محتاج أداة [[jq]]: [[jq -r .version package.json]]. في PowerShell مبني جوّاه.`,
          lines: [
            "اقرا الملف كنص واحد ([[-Raw]])، وحوّله لـ object.",
            "دلوقتي تقدر تقرا أي حقل بالنقطة.",
            "حتى الحقول اللي جواها حقول."
          ],
          sol: R`في فولدر مشروع Node: [[$pkg = Get-Content package.json -Raw | ConvertFrom-Json]] وبعدين [[$pkg.name]] و [[$pkg.version]]. جربتها على package.json فيه name بـ myapp و version بـ 1.2.0، وسطر [["$($pkg.name)@$($pkg.version)"]] طبع [[myapp@1.2.0]]. و [[$pkg.dependencies]] بيطبع جدول فيه اسم كل مكتبة ونسختها.

[[-Raw]] بيقرا الملف كله كنص واحد بدل array سطور. الأمر اشتغل معايا من غيرها برضه في PowerShell 7.6 و 5.1، بس خليها عادة: أسرع، وأي أمر تاني بعد Get-Content (زي [[-replace]] على الملف كله) محتاج النص كله مرة واحدة. ولو [[$pkg.name]] رجع فاضي، يبقى انت مش في فولدر المشروع أو كتبت الاسم غلط؛ PowerShell مش بيطلع error لما property مش موجودة، بيرجع null بس.`
        }
      ]
    },
    {
      t: "البحث",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Select-String",
          title: "دوّر على نص (grep)",
          desc: R`[[Select-String]] بيدوّر على نص جوه ملفات أو جوه ناتج أمر، زي [[grep]] في bash و [[findstr]] في CMD، واختصاره [[sls]]. [[-Pattern]] الكلام اللي بتدوّر عليه، و [[-Path *.js]] الملفات اللي هيدوّر فيها. الناتج سطر لكل نتيجة بالشكل [[file.js:12:السطر نفسه]] (اسم الملف ورقم السطر والسطر).

الـ Pattern ده regex مش نص عادي، يعني النقطة معناها «أي حرف». عشان كده السطر التالت فيه [[-SimpleMatch]]: دوّر على [[console.log]] حرفيًا. والسطر ده كمان بيوريك الـ pipeline: [[-Include *.js,*.ts]] امتدادين مفصولين بفاصلة، و [[Where-Object FullName -notmatch 'node_modules']] بيشيل أي ملف مساره فيه node_modules.

اختيارات تانية: [[-CaseSensitive]] يفرّق بين الكابيتال والسمول (الافتراضي مش بيفرّق، عكس grep)، و [[-NotMatch]] السطور اللي مفيهاش الكلمة (زي [[grep -v]])، و [[-List]] أول نتيجة بس من كل ملف. وأي ناتج أمر ينفع: [[Get-Content app.log -Tail 200 | sls error]].`,
          example: R`Select-String -Path *.js -Pattern "TODO"
sls "error" app.log
Get-ChildItem -Recurse -File -Include *.js,*.ts | Where-Object FullName -notmatch 'node_modules' | Select-String "console.log" -SimpleMatch`,
          try: "دوّر على كل console.log في مشروع من غير node_modules.",
          deep: {
            why: R`بتدوّر على كل مكان فيه TODO أو اسم متغير في المشروع، أو على كلمة error في لوج من ١٠ آلاف سطر. Select-String هو grep بتاع PowerShell، وكمان بيرجع objects فيها اسم الملف ورقم السطر تقدر تفلترها.`,
            how: R`[[Select-String -Pattern "error" -Path "*.log"]] بيدوّر في كل ملفات .log. بيرجع objects فيها المسار والسطر والرقم.

[[-CaseSensitive]] للبحث بفرق الحروف. [[-NotMatch]] يجيب السطور اللي مش فيها. [[-List]] يجيب الملفات اللي فيها الكلمة بس (مش كل السطور).

[[Select-String "function" *.js | Select-Object Filename, LineNumber, Line]] بيطلعلك كل function مع مكانها.`,
            when: "البحث عن كل استخدامات function. إيجاد error في لوجات.",
            mistakes: "الـ Pattern هو regex مش نص عادي. لو عايز نص حرفي بس استخدم [[-SimpleMatch]]."
          },
          teach: R`## الفكرة

[[Select-String]] = grep بتاع PowerShell: بيدوّر على كلمة جوه ملفات ويطلّع السطور اللي فيها. اتجرب في PowerShell 7.6 على مشروع صغير: [[a.js]] فيه TODO، و [[src\server.js]] و [[src\util.ts]] فيهم console.log، و [[node_modules\x\i.js]] فيه console.log كمان، و [[app.log]] آخر سطر فيه ERROR.

---

## ١. [[Select-String -Path *.js -Pattern "TODO"]]

| الحتة | معناها |
|---|---|
| [[-Path *.js]] | دوّر في كل ملفات .js في الفولدر الحالي |
| [[-Pattern "TODO"]] | على الكلمة دي |

~~~text الناتج
a.js:1:console.log("a") // TODO: rename
~~~

### نقرا السطر

~~~text
a.js   :   1   :   console.log("a") // TODO: rename
الملف     رقم السطر   السطر نفسه
~~~

ده شكل الطباعة بس. الحقيقة إن كل نتيجة object، و [[Get-Member]] عليها طلّع خانات منها [[Filename]] و [[LineNumber]] و [[Line]] و [[Path]] و [[Matches]].

---

## ٢. [[sls "error" app.log]]

[[sls]] اختصار Select-String. وأول كلمة من غير اسم هي الـ Pattern، والتانية الـ Path.

~~~text الناتج
app.log:31:2026-10-06 10:01:00 ERROR db timeout
~~~

لاحظ: دوّرنا على [[error]] صغيرة ولقى [[ERROR]] كابيتال. Select-String مش بيفرّق بين الكابيتال والسمول إلا لو ضفت [[-CaseSensitive]] (عكس grep). ولو عايز رقم السطر بس: [[(sls "error" app.log).LineNumber]] طبع [[31]].

---

## ٣. السطر الطويل

~~~powershell
Get-ChildItem -Recurse -File -Include *.js,*.ts | Where-Object FullName -notmatch 'node_modules' | Select-String "console.log" -SimpleMatch
~~~

٣ أوامر في pipeline. نفكهم بالترتيب:

### الأمر الأول: [[Get-ChildItem -Recurse -File -Include *.js,*.ts]]

هات كل الملفات في كل الفولدرات، اللي امتدادها js **أو** ts. [[-Include]] بياخد أكتر من نمط بفاصلة. لو وقفنا هنا وطبعنا الأسامي:

~~~text الناتج
i.js
server.js
util.ts
a.js
b.js
old.js
~~~

[[i.js]] ده من [[node_modules]]، وده مش كودنا.

### الأمر التاني: [[Where-Object FullName -notmatch 'node_modules']]

[[FullName]] المسار الكامل، و [[-notmatch]] «مفيهوش». فأي ملف مساره فيه node_modules بيتشال.

### الأمر التالت: [[Select-String "console.log" -SimpleMatch]]

دوّر في الملفات اللي فضلت. و [[-SimpleMatch]] يعني الكلمة حرفيًا، مش regex.

~~~text الناتج
src\server.js:1:console.log("server")
src\util.ts:1:export const x = 1; console.log(x)
a.js:1:console.log("a") // TODO: rename
~~~

[[i.js]] اختفى.

### ليه [[-SimpleMatch]]؟

النقطة في regex معناها «أي حرف». جربت:

| الأمر | الناتج |
|---|---|
| [['console-log' | Select-String 'console.log']] | [[console-log]] (لقاها! النقطة طابقت الشرطة) |
| [['console-log' | Select-String 'console.log' -SimpleMatch]] | ولا حاجة |

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| كلمة في ملفات | [[sls "x" *.js]] | [[grep -n "x" *.js]] |
| حرفيًا | [[-SimpleMatch]] | [[grep -F]] |
| فرّق الكابيتال | [[-CaseSensitive]] | الافتراضي |
| السطور اللي مفيهاش | [[-NotMatch]] | [[grep -v]] |
| في ناتج أمر | [[أمر | sls "x"]] | [[أمر | grep x]] |`,
          lines: [
            "دوّر على TODO في كل ملفات .js (زي grep).",
            "الاختصار [[sls]]: دوّر على error في اللوج.",
            "كل ملفات js و ts، من غير node_modules، ودوّر فيهم على console.log كنص حرفي ([[-SimpleMatch]] مش regex)."
          ],
          sol: R`الأمر التالت في المثال هو الحل. جربته على مشروع فيه [[src\a.js]] و [[src\b.ts]] و [[node_modules\x\i.js]]، فطلع سطرين بس: [[src\a.js:1:console.log("a")]] و [[src\b.ts:1:const b=1; console.log(b)]]، والملف اللي جوه node_modules اتشال. الشكل: مسار الملف : رقم السطر : السطر نفسه.

[[-SimpleMatch]] مهمة لأن من غيرها النقطة في console.log بتبقى regex يعني «أي حرف». ولو عملت [[-Exclude node_modules]] مع [[-Recurse]] هتلاقيه لسه بيدخل جوه، لأن Exclude بيفلتر أسامي الملفات مش الفولدرات، عشان كده الفلترة بـ [[Where-Object FullName -notmatch]].`
        },
        {
          cmd: "Get-Command (which)",
          title: "البرنامج ده فين",
          desc: R`[[Get-Command node]] بيقولك لما تكتب node، أنهي حاجة بالظبط هتشتغل ومنين: نوعها (Application يعني برنامج، أو Cmdlet أو Alias أو Function) والمسار الكامل. ده المقابل لـ [[which]] و [[type]] في bash. و [[(Get-Command node).Source]] بيطلع المسار بس كنص، والأقواس بتنفّذ الأمر الأول وبعدين [[.Source]] تاخد منه الخاصية.

[[-All]] بيوريك كل النسخ لو البرنامج موجود في أكتر من فولدر في الـ PATH. اللي في الأول هو اللي بيشتغل، وده سبب مشاكل زي «انا سطبت node 22 وبيقول 18».

خد بالك من فخ: [[where]] جوه PowerShell اختصار لـ Where-Object (الفلترة)، مش أمر CMD اللي بيدوّر على البرامج. فلو عايز أمر CMD القديم اكتب [[where.exe]] بالامتداد، زي السطر التالت. نفس الحكاية مع [[curl]] و [[sc]] في 5.1.`,
          example: R`Get-Command node
(Get-Command node).Source
where.exe node`,
          try: "اعرف مسار node و git و npm عندك. لو أي واحد طلع أكتر من مسار، يبقى عندك أكتر من نسخة والـ PATH بيقرر أنهي واحدة بتشتغل.",
          deep: {
            why: "إيجاد مكان برنامج أو الـ alias اللي بيستخدمه. زي [[which]] أو [[type]] في bash.",
            how: R`[[Get-Command node]] بيقولك المسار الكامل. [[Get-Command ls]] بيقولك إنه alias لـ Get-ChildItem.

[[-All]] يوريك كل النسخ لو عندك أكتر من واحدة في PATH.

[[$env:PATH -split ";"]] بيعرض كل المسارات في PATH منفصلين.`,
            when: "مش عارف ليه نسخة node أو python غير المتوقعة. تتأكد إن برنامج متسطب.",
            mistakes: "على ويندوز PATH بيفصل بـ ; مش : زي لينكس."
          },
          teach: R`## الفكرة

لما تكتب [[node]]، PowerShell بيدوّر على حاجة بالاسم ده بالترتيب: alias، وبعدين function، وبعدين cmdlet، وبعدين برنامج في الـ PATH. [[Get-Command]] بيقولك هو لقى إيه ومنين. اتجرب في PowerShell 7.6 على جهاز عليه Node 24.

---

## ١. [[Get-Command node]]

~~~text الناتج
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     node.exe                                           24.19.0.0  C:\Program Files\nodejs\node.exe
~~~

| العمود | هنا | معناه |
|---|---|---|
| [[CommandType]] | [[Application]] | برنامج .exe حقيقي، مش أمر PowerShell |
| [[Name]] | [[node.exe]] | الاسم الكامل بالامتداد |
| [[Version]] | [[24.19.0.0]] | النسخة المكتوبة جوه الملف |
| [[Source]] | المسار | **ده اللي هيشتغل** لما تكتب node |

---

## ٢. [[(Get-Command node).Source]]

~~~text الناتج
C:\Program Files\nodejs\node.exe
~~~

الأقواس نفّذت الأمر، و [[.Source]] خدت المسار بس كنص. مفيد في سكربت: [[$nodePath = (Get-Command node).Source]].

---

## ٣. [[where.exe node]]

~~~text الناتج
C:\Program Files\nodejs\node.exe
~~~

[[where.exe]] برنامج من CMD بيدوّر في الـ PATH ويطبع **كل** اللي لقاه. ليه [[.exe]]؟

~~~powershell
Get-Command where
~~~

~~~text الناتج
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Alias           where -> Where-Object
~~~

[[where]] جوه PowerShell alias لـ Where-Object (الفلترة). فـ [[where node]] مش بيدوّر على حاجة. الـ [[.exe]] بيجبر PowerShell ياخد البرنامج نفسه.

---

## مثال بنسختين: npm

~~~text Get-Command npm
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
ExternalScript  npm.ps1                                                       C:\Program Files\nodejs\npm.ps1
~~~

~~~text where.exe npm
C:\Program Files\nodejs\npm
C:\Program Files\nodejs\npm.cmd
~~~

Node بيحط npm بكذا شكل: [[npm.ps1]] لـ PowerShell، و [[npm.cmd]] لـ CMD، و [[npm]] من غير امتداد لـ Git Bash. PowerShell بيختار [[.ps1]] (نوعه [[ExternalScript]]: سكربت PowerShell من بره)، و [[where.exe]] بيطبع اللي يعرفه هو.

و [[Get-Command node -All]] بيعرض كل النسخ لو فيه أكتر من واحدة في الـ PATH. هنا طلع سطر واحد، يعني نسخة واحدة.

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| ده إيه وجاي منين | [[Get-Command node]] | [[type node]] |
| المسار بس | [[(Get-Command node).Source]] | [[which node]] |
| كل النسخ | [[Get-Command node -All]] أو [[where.exe node]] | [[which -a node]] |

وأي alias كمان: [[Get-Command ls]] طبع [[ls -> Get-ChildItem]].`,
          lines: [
            "node ده جاي منين؟",
            "المسار بس كنص.",
            "أمر where بتاع CMD، بس لازم [[.exe]] لأن where في PowerShell اختصار لـ Where-Object."
          ],
          sol: R`[[Get-Command node]] بيطبع سطر فيه [[Application]] و [[node.exe]] والمسار زي [[C:\Program Files\nodejs\node.exe]]، و [[(Get-Command node).Source]] بيطبع المسار بس. [[Get-Command npm]] غالبًا هيطلع [[npm.ps1]] من نوع ExternalScript، لأن Node على ويندوز بيحط npm.ps1 و npm.cmd، و [[where.exe npm]] هيطبعلك الاتنين (مع [[npm]] من غير امتداد).

عشان تشوف كل النسخ: [[Get-Command node -All]] أو [[where.exe node]]. لما جربت على لينكس [[Get-Command npm -All]] طلع مسارين، وده بالظبط اللي الدرس بيحذر منه: اللي أول واحد في الـ PATH هو اللي بيشتغل. ولو كتبت [[where node]] من غير [[.exe]] مش هيطبع حاجة لأن where هنا Where-Object.`
        }
      ]
    }
]);
