// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "قراءة وكتابة الملفات",
      l: 1,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`نظرة سريعة على لوج`, what: R`سطرين لأي ملف لوج: عدد السطور بـ [[(Get-Content app.log).Count]]، وآخر ١٠ سطور بـ [[-Tail 10]]، وأول سطر (امتى اللوج بدأ) بـ [[-TotalCount 1]]. من درس «اقرا الملف».`, done: R`التلات أرقام بتطابق اللي بتشوفه لو فتحت الملف في notepad، والأمر بيخلص بسرعة حتى على لوج كبير، عشان [[-Tail]] بيقرا من آخر الملف.` },
        { lvl: 'صغير', t: R`مولّد .env نضيف`, what: R`اعمل [[.env]] بـ [[Set-Content]] لأول سطر و [[Add-Content]] للباقي، من غير [[-Encoding utf8]] في 5.1 (هناك بيحط BOM)، بحيث الملف يطلع من غير BOM في النسختين: في 7 الـ default كويس، وفي 5.1 الـ default بتاع [[Set-Content]] (ANSI) آمن طول ما الملف كله حروف إنجليزي. من درس «اكتب في ملف».`, done: R`[[Format-Hex .env]] أول بايت فيه [[50]] (حرف P في PORT) مش [[EF BB BF]]، في النسختين. وتشغيله تاني بيسيب الملف بنفس السطور (Set-Content الأول بيمسح القديم) مش متكررة.` },
        { lvl: 'متوسط', t: R`تقرير package.json`, what: R`اقرا [[package.json]] بـ [[ConvertFrom-Json]]، واكتب [[report.txt]] فيه: الاسم والنسخة، وعدد الـ dependencies وعدد الـ devDependencies ([[.PSObject.Properties.Name]] و [[.Count]])، وأسامي الـ scripts. من دروس الوحدة كلها.`, done: R`الأرقام في التقرير بتطابق اللي في الملف لو عدّيتهم بإيدك، ولو المشروع مفيهوش [[devDependencies]] التقرير بيكتب [[0]] مش error.` },
        { lvl: 'متوسط', t: R`رفع رقم النسخة`, what: R`سطور بتقرا [[version]] من نسخة من [[package.json]]، وتحوّلها لـ version object بـ [[$v = [version]$pkg.version]] وتزوّد الرقم الأخير (patch)، وتكتب الملف تاني بـ [[ConvertTo-Json -Depth 10]]، وقبلها [[Copy-Item]] للأصل لـ [[package.json.bak]]. من الوحدة دي و «انسخ».`, done: R`[[1.2.3]] بقت [[1.2.4]]، والـ [[.bak]] فيه النسخة القديمة، وكل الحقول التانية (scripts و dependencies) لسه موجودة لما تقراه تاني بـ ConvertFrom-Json.` },
        { lvl: 'كبير', t: R`محرّر config آمن`, what: R`سكربت [[set-config.ps1]] بيغيّر قيمة واحدة في [[config.json]] متداخل: لو الملف مش موجود ([[Test-Path]]) يطبع رسالة ويقف، ولو الـ JSON بايظ يمسك الـ error بـ [[try { ... } catch { ... }]] ويطبع رسالة مفهومة بدل الأحمر الطويل، وقبل أي كتابة ياخد [[Copy-Item]] لـ [[config.json.bak]]، ويكتب بـ [[-Depth 10]]، ويضيف سطر لـ [[config.log]] بـ [[Add-Content]] فيه الوقت والقيمة القديمة والجديدة. بيجمع الوحدة دي مع «ملفات وفولدرات».`, done: R`٤ تجارب: ملف مش موجود بيطبع رسالتك بس، و JSON فيه غلطة بيطبع رسالتك والملف متلمسش، وتغيير عادي بيغيّر القيمة والباقي سليم (مفيش [[@{]] في الملف)، وتشغيله تاني بنفس القيمة بيشتغل عادي واللوج فيه سطر لكل مرة.`, ext: R`خليه يقبل مسار القيمة كنص زي [[db.port]]، ويتأكد إن نوع القيمة الجديدة زي القديمة (رقم مكان رقم)، ويحتفظ بآخر ٥ نسخ backup بس ويمسح الأقدم.` },
        { lvl: 'فكرة', t: R`دفتر يومي في الترمنال`, what: R`أداة ملاحظات انت تصمّمها: كل ملاحظة سطر فيه التاريخ، أو ملف JSON فيه لستة objects. تضيف ملاحظة، وتعرض آخر ٥، وتدوّر في القديم. انت اللي بتقرر الشكل (نص ولا JSON) وليه.`, done: R`تقدر تضيف ملاحظة وتقراها تاني بعد ما تقفل النافذة وتفتح واحدة جديدة، والملف بيفضل سليم بعد ٢٠ ملاحظة.`, ext: R`لما توصل لوحدة البحث، زوّد بحث بكلمة بـ [[Select-String]]، وبعد درس الـ functions حوّلها لأمرين [[note]] و [[notes]] في [[$PROFILE]].` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`[[Get-Content app.log -TotalCount 3]] وبعدين [[Get-Content app.log -Tail 3]].`, done: R`أول ٣ سطور وآخر ٣ سطور، و [[(Get-Content app.log).Count]] بيساوي عدد السطور اللي notepad بيوريهولك.` },
            { lvl: 'تطبيق', t: R`حط السطور في متغير [[$lines = Get-Content app.log]] واطبع آخر سطر وطوله: [[$lines[-1]; $lines[-1].Length]].`, done: R`آخر سطر هو نفسه اللي [[-Tail 1]] بيطلّعه، والطول رقم بعدد حروفه. و [[-1]] معناها «آخر عنصر» من غير ما تعرف العدد.` },
            { lvl: 'تحدي', t: R`اعمل ملف فاضي وملف فيه سطر واحد، واطبع [[.Count]] لكل واحد، وبعدين [[(Get-Content one.txt).GetType().Name]].`, done: R`الفاضي [[0]] واللي فيه سطر [[1]] (في 7 و 5.1)، بس النوع [[String]] مش array. يعني الـ index صفر على ملف سطر واحد بيرجّع أول **حرف** في السطر مش السطر كله، وعشان كده تكتب [[@(Get-Content one.txt)]] لما تحتاج array دايمًا.` },
          ],
          deep: {
            why: R`قراية ملف هي أكتر حاجة بتعملها بعد ls: تشوف .env، أو config، أو آخر سطور في لوج وقع فيه السيرفر. Get-Content بيعمل شغل cat و head و tail و tail -f في أمر واحد.`,
            how: R`[[Get-Content file.txt]] بيرجّع array من السطور: كل سطر عنصر نصي (String) لوحده، ومن غير علامة السطر الجديد. ولو الملف سطر واحد بيرجّع نص واحد مش array، ولو فاضي بيرجّع [[$null]]، و [[.Count]] بتشتغل صح في الحالات التلاتة (1 و 0).

[[-Tail 20]] آخر ٢٠ سطر (زي [[tail -n 20]])، و [[-TotalCount 5]] أول ٥ (زي [[head]]). و [[-Wait]] بيفضل فاتح الملف ويطبع أي سطر جديد يتكتب فيه (زي [[tail -f]]) لحد ما تدوس Ctrl+C.

و [[-Raw]] بيرجّع الملف كله كنص واحد بدل سطور، وده اللي محتاجه قبل [[ConvertFrom-Json]]. وخلي بالك إن Get-Content من غير [[-Tail]] بيقرا الملف كله، فعلى لوج حجمه جيجات استخدم [[-Tail]] أو [[-TotalCount]].`,
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
          practice: [
            { lvl: 'سريع', t: R`[[Set-Content .env 'PORT=3000']] وبعدين [[Add-Content .env 'DEBUG=true']] وبعدين [[Set-Content .env 'PORT=4000']].`, done: R`[[Get-Content .env]] بيطبع سطر واحد بس: [[PORT=4000]]. الـ Set التاني مسح كل اللي قبله.` },
            { lvl: 'تطبيق', t: R`اكتب سطر لوج فيه الوقت: [[Add-Content run.log "$(Get-Date -Format s) started"]]، وشغّله ٣ مرات.`, done: R`[[Get-Content run.log]] فيه ٣ سطور، كل واحد بيبدأ بتاريخ ووقت بالشكل [[2026-01-31T14:05:09]]، والأحدث في الآخر.` },
            { lvl: 'تحدي', t: R`في 5.1 اكتب [[Set-Content a.txt 'a' -Encoding utf8]] و [['a' > b.txt]]، وافتح الاتنين بـ [[Format-Hex]]. وبعدين اعمل نفس الحاجة في 7.`, done: R`في 5.1: [[a.txt]] بيبدأ بـ [[EF BB BF]] (BOM) و [[b.txt]] بيبدأ بـ [[FF FE]] (UTF-16). في 7 الاتنين بيبدأوا بـ [[61]] على طول (حرف a). وده سبب إن [[.env]] معمول بـ 5.1 ممكن Node ميقراش أول سطر فيه صح.` },
          ],
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
          practice: [
            { lvl: 'سريع', t: R`اطبع الـ scripts بتاعة مشروع: [[(Get-Content package.json -Raw | ConvertFrom-Json).scripts]].`, done: R`كل script باسمه وأمره زي ما هو في الملف، ولو كتبت [[.scripts.dev]] بيطبع أمر dev لوحده.` },
            { lvl: 'تطبيق', t: R`اطبع أسامي الـ dependencies بس من غير النسخ: [[$pkg.dependencies.PSObject.Properties.Name]]، وعدّهم بـ [[.Count]].`, done: R`سطر لكل باكدج، والعدد بيساوي عدد السطور جوه [[dependencies]] في الملف.` },
            { lvl: 'تحدي', t: R`على نسخة من config متداخل ٣ مستويات ([[{"a":{"b":{"c":{"d":1}}}}]])، غيّر قيمة واكتبه بـ [[ConvertTo-Json]] من غير [[-Depth]]، وبعدين بـ [[-Depth 10]].`, done: R`من غير Depth المستوى التالت بقى نص [[@{d=1}]] بدل object (والـ default عمقه ٢)، و 7 بيطبع [[WARNING: Resulting JSON is truncated]] لكن 5.1 بيعمل كده ساكت. وبـ [[-Depth 10]] الملف بيرجع زي الأصل.` },
          ],
          deep: {
            why: "تتعامل مع JSON response من API أو تقرا ملف JSON. PowerShell بيحوّله لـ objects تقدر توصل لـ properties بسهولة.",
            how: R`[[ConvertFrom-Json]] بياخد نص JSON ويرجّع object: كل مفتاح بيبقى property، وكل array بتبقى array، والأرقام والـ true/false بيبقوا أنواعهم الحقيقية مش نص. و [[ConvertTo-Json]] بيعمل العكس.

مع [[Invoke-WebRequest]] الرد جاي نص، فتعمل [[| ConvertFrom-Json]]. أما [[Invoke-RestMethod]] فبيحوّل الـ JSON لوحده.

[[-Depth]] في [[ConvertTo-Json]] مهمة: الافتراضي ٢ مستوى بس، واللي أعمق بيتحول لنص زي [[@{d=1}]] أو اسم النوع [[System.Collections.Hashtable]] بدل JSON. لو عندك JSON متداخل، زوّد الرقم: [[-Depth 10]]. وفي PowerShell 7 فيه [[ConvertFrom-Json -AsHashtable]] لو عايز hashtable بدل object، ودي مش موجودة في 5.1.`,
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
            R`[[Get-Content -Raw]] بيقرا [[package.json]] كنص واحد بدل array سطور، والـ pipe بيسلّمه لـ [[ConvertFrom-Json]] اللي بيحوّل الـ JSON لـ object حقيقي (PSCustomObject)، والناتج بيتحفظ في [[$pkg]]. [[-Raw]] هو الطريقة المضمونة والأسرع، لأن الـ JSON وحدة واحدة مش سطور منفصلة.`,
            R`دلوقتي كل مفتاح في الـ JSON بقى property تقراه بالنقطة: [[$pkg.version]] بيطبع 1.2.3 مثلًا. ولو كتبت اسم مش موجود زي [[$pkg.versoin]] مش هيطلع error، هيرجع فاضي، فراجع الاسم كويس.`,
            R`[[dependencies]] جواه object تاني (اسم كل باكدج وقدامه نسخته)، فبيتعرض كجدول اسم وقيمة. وتقدر تكمّل بالنقطة لجوه: [[$pkg.dependencies.express]]. ولو اسم الباكدج فيه شرطة أو @، حطه بين علامات تنصيص: [[$pkg.dependencies.'@types/node']].`,
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
      projects: [
        { lvl: 'صغير', t: R`لستة الـ TODO`, what: R`سطر واحد بيطلّع كل TODO و FIXME في مشروع بـ [[Select-String -Pattern 'TODO|FIXME']]، والناتج اسم الملف ورقم السطر. من درس «دوّر على نص».`, done: R`كل نتيجة شكلها [[ملف:رقم:السطر]]، ولو كتبت TODO جديد في أي ملف وشغّلت السطر تاني بيظهر برقم سطره الصح.` },
        { lvl: 'صغير', t: R`أدواتي جاية منين`, what: R`لـ [[node]] و [[git]] و [[npm]] و [[python]]: [[Get-Command -All]] والمسار والنسخة ([[--version]]). من درس «البرنامج ده فين».`, done: R`جدول فيه كل أداة ومسارها ونسختها، والأداة اللي ليها أكتر من مسار مكتوب قصادها أنهي واحد بيشتغل فعلًا (الأول في الـ PATH)، والمش متسطبة مكتوب قصادها «مش موجودة» من [[CommandNotFoundException]].` },
        { lvl: 'متوسط', t: R`صيّاد الأسرار`, what: R`دوّر في مشروع (من غير [[node_modules]] و [[.git]]) على سطور شكلها سر: [[password\s*=]] و [[api[_-]?key]] و [[secret]]، بـ [[Select-String]] و [[Where-Object FullName -notmatch]]. اعمل ملف تجريبي فيه سر وهمي عشان تتأكد إنه بيتمسك. من دروس الوحدة و «فلتر» لو سبقت.`, done: R`الملف التجريبي بيظهر برقم السطر الصح، وملف فيه كلمة password في تعليق عادي من غير [[=]] مبيظهرش، ومفيش ولا نتيجة من [[node_modules]].` },
        { lvl: 'متوسط', t: R`ملخّص لوج`, what: R`على لوج فيه INFO و WARN و ERROR: عدد كل نوع بـ [[(Select-String 'ERROR' app.log).Count]] وهكذا، وآخر ٣ errors ومعاهم سطر قبل وسطر بعد بـ [[-Context 1,1]]. من درس «دوّر على نص».`, done: R`الأرقام التلاتة مجموعها بيساوي عدد سطور اللوج (لو كل سطر فيه نوع واحد)، وكل error ظاهر قبله وبعده سطر، وسطر الـ error نفسه أوله [[>]].` },
        { lvl: 'كبير', t: R`فحص قبل الـ commit`, what: R`سكربت [[precommit.ps1]] بيدوّر في [[src]] على [[console.log]] (بـ [[-SimpleMatch]]) و TODO والأسرار الوهمية، ويكتب [[precommit-report.txt]] فيه الوقت وكل نتيجة. لو لقى سر بيطبع رسالة حمرا ويخرج بـ [[exit 1]]، ولو لقى console.log بس بيحذّر ويخرج بـ [[exit 0]]، ولو [[src]] مش موجود ([[Test-Path]]) بيقول كده ويخرج بـ [[exit 2]]. بيجمع الوحدة دي مع «قراءة وكتابة الملفات» و «ملفات وفولدرات».`, done: R`[[pwsh -File .\precommit.ps1; $LASTEXITCODE]] بيطبع [[1]] وفيه سر وهمي، و [[0]] بعد ما تشيله، و [[2]] لو غيّرت اسم src. والتقرير بيتكتب من جديد كل مرة (مش بيكبر للأبد)، وأول سطر فيه وقت آخر تشغيلة.`, ext: R`اربطه بـ git hook ([[.git\hooks\pre-commit]]) عشان يشتغل لوحده قبل كل commit، وخلّي الأنماط في ملف [[patterns.txt]] بدل ما تبقى في الكود، وزوّد قايمة استثناءات للسطور المقصودة.` },
        { lvl: 'فكرة', t: R`محرّك بحث في ملاحظاتك`, what: R`عندك ملاحظات أو كود أو كتب PDF متحوّلة نص في فولدرات كتير. صمّم طريقة تدوّر فيها بكلمة وتطلّع أحسن النتايج الأول (مثلًا الملف اللي الكلمة فيه أكتر). انت اللي بتقرر الترتيب وشكل النتيجة.`, done: R`بتدوّر بكلمة وتلاقي الملف الصح في أول ٣ نتايج، في فولدر فيه ٥٠ ملف على الأقل.`, ext: R`زوّد بحث بأكتر من كلمة، وفلتر بالتاريخ ([[LastWriteTime]])، ولما توصل للـ functions خليها أمر [[find-note]] في الـ profile.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`في لوج فيه [[ERROR]] و [[Error]] و [[error]]، جرّب [[sls error app.log]] وبعدين نفس الأمر بـ [[-CaseSensitive]].`, done: R`الأول بيجيب التلات أشكال (Select-String مش بيفرّق في الحروف من غير ما تقوله)، والتاني بيجيب [[error]] الصغيرة بس.` },
            { lvl: 'تطبيق', t: R`اعرض كل ERROR ومعاه سطر قبله وسطر بعده: [[Select-String 'ERROR' app.log -Context 1,1]].`, done: R`سطر الـ error أوله [[>]] واسم الملف ورقم السطر، والسطرين اللي حواليه من غير [[>]]، في 7 و 5.1.` },
            { lvl: 'تحدي', t: R`في مشروع، اعرف **كام ملف** (مش كام سطر) فيه TODO: [[(Select-String TODO -Path *.js -List).Count]]، وقارنه بالعدد من غير [[-List]].`, done: R`ملف فيه ٣ TODO بيتحسب مرة واحدة مع [[-List]]، فالرقم الأول أصغر من أو بيساوي التاني. في تجربة بـ ٣ ملفات (واحد فيه ٣ TODO وواحد فيه ١ وواحد نضيف) طلع [[2]] و [[4]].` },
          ],
          deep: {
            why: R`بتدوّر على كل مكان فيه TODO أو اسم متغير في المشروع، أو على كلمة error في لوج من ١٠ آلاف سطر. Select-String هو grep بتاع PowerShell، وكمان بيرجع objects فيها اسم الملف ورقم السطر تقدر تفلترها.`,
            how: R`[[Select-String -Pattern "error" -Path "*.log"]] بيدوّر في كل ملفات .log، وبيرجّع object من نوع MatchInfo لكل سطر لقاه، فيه [[Filename]] و [[LineNumber]] و [[Line]] (السطر نفسه). عشان كده تقدر تكمّل بالـ pipe: [[Select-String "function" *.js | Select-Object Filename, LineNumber]].

الـ Pattern regex افتراضيًا، و [[-SimpleMatch]] يخليه نص حرفي. البحث مش بيفرّق كابيتال من سمول إلا مع [[-CaseSensitive]]. و [[-NotMatch]] يجيب السطور اللي **مش** فيها الكلمة، و [[-List]] يقف عند أول نتيجة في كل ملف (مفيد لو عايز أسامي الملفات بس)، و [[-Context 2]] يوريك سطرين قبل وبعد كل نتيجة.

وتقدر تبعتله نص من أمر تاني بدل ملف: [[Get-Process | Out-String -Stream | Select-String chrome]].`,
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
            R`[[Select-String]] بيدوّر جوه الملفات (زي grep): [[-Path *.js]] كل ملفات js في الفولدر الحالي، و [[-Pattern "TODO"]] الكلمة اللي بتدوّر عليها. الـ Pattern ده regex، والبحث افتراضيًا مش بيفرّق كابيتال من سمول، فـ todo هتطلع كمان. كل نتيجة بتطلع كده: [[a.js:1:line one TODO]]، يعني اسم الملف ورقم السطر والسطر نفسه.`,
            R`[[sls]] alias لـ Select-String. أول كلمة من غير اسم parameter بتبقى الـ Pattern، والتانية الـ Path، فده يعني «دوّر على error في [[app.log]]». مفيد جدًا مع اللوجات: تطلع السطور اللي فيها مشكلة بس من وسط آلاف السطور.`,
            R`[[Get-ChildItem -Recurse -File -Include *.js,*.ts]] بيجيب ملفات js و ts في كل الفولدرات. [[Where-Object FullName -notmatch 'node_modules']] بيشيل أي ملف مساره فيه node_modules (بس بعد ما الـ Recurse لف عليها، فممكن ياخد وقت). وفي الآخر [[Select-String "console.log" -SimpleMatch]] بيدوّر كنص حرفي: من غير [[-SimpleMatch]] النقطة في regex معناها «أي حرف»، فـ consoleXlog كانت هتطلع كمان.`,
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
          practice: [
            { lvl: 'سريع', t: R`[[Get-Command git]] وبعدين [[(Get-Command git).Source]].`, done: R`الأول جدول فيه [[CommandType]] قيمته [[Application]]، والتاني المسار بس كنص بيخلص بـ [[git.exe]].` },
            { lvl: 'تطبيق', t: R`اعرف [[cd]] و [[ls]] و [[where]] إيه بالظبط: [[Get-Command cd, ls, where]].`, done: R`التلاتة نوعهم [[Alias]]، و [[where]] بيشاور على [[Where-Object]] مش برنامج [[where.exe]]، وعشان كده [[where.exe node]] لازم بالـ .exe.` },
            { lvl: 'تحدي', t: R`سطر بيقول الأداة موجودة ولا لأ من غير error أحمر: [[if (Get-Command docker -ErrorAction SilentlyContinue) { 'yes' } else { 'no' }]]. جرّبه على أداة عندك وعلى اسم مش موجود.`, done: R`الأداة الموجودة بتطبع [[yes]] والاسم الوهمي بيطبع [[no]] من غير أي error. ومن غير [[-ErrorAction SilentlyContinue]] الاسم الوهمي بيطلّع [[CommandNotFoundException]] قبل الـ no.` },
          ],
          deep: {
            why: "إيجاد مكان برنامج أو الـ alias اللي بيستخدمه. زي [[which]] أو [[type]] في bash.",
            how: R`[[Get-Command node]] بيقولك الاسم ده هيتنفّذ إزاي: برنامج exe ومساره، أو cmdlet والموديول بتاعه، أو alias والأمر اللي بيشاور عليه. مثلًا [[Get-Command ls]] بيقولك إنه alias لـ Get-ChildItem.

[[-All]] يوريك كل النسخ لو فيه أكتر من واحدة بنفس الاسم، والأولى في القايمة هي اللي بتكسب. ودي مفيدة لما تسطّب نسخة جديدة وتلاقي القديمة لسه هي اللي بتشتغل.

PowerShell بيدوّر على البرامج في الفولدرات اللي في PATH بالترتيب، و [[$env:PATH -split ";"]] بيعرضهم سطر سطر، فتعرف أنهي فولدر بيتقري الأول.`,
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
            R`لما تكتب [[node]] في الترمنال، [[Get-Command node]] بيقولك PowerShell هيشغّل إيه بالظبط: نوعه في [[CommandType]] (هنا Application، يعني برنامج exe)، ونسخته، ومساره في [[Source]]. ولو مش متسطب أو مش على الـ PATH بيطلع error «is not recognized»، ودي أسرع طريقة تعرف ده.`,
            R`الأقواس بتنفّذ الأمر وتجيب الـ object، والنقطة بتقرا منه خاصية [[Source]] بس: المسار الكامل كنص زي [[C:\Program Files\nodejs\node.exe]]. ولأنه نص عادي تقدر تحطه في متغير أو تستخدمه مع [[&]] أو [[Split-Path]] في سكربت.`,
            R`[[where.exe]] هو أمر where بتاع CMD، وبيطبع **كل** نسخ البرنامج اللي على الـ PATH بالترتيب، مش أول واحدة بس. لازم تكتب [[.exe]] لأن [[where]] لوحدها في PowerShell alias لـ Where-Object، فهتفتكرها فلتر ومش هتطبع حاجة مفيدة.`,
          ],
          sol: R`[[Get-Command node]] بيطبع سطر فيه [[Application]] و [[node.exe]] والمسار زي [[C:\Program Files\nodejs\node.exe]]، و [[(Get-Command node).Source]] بيطبع المسار بس. [[Get-Command npm]] غالبًا هيطلع [[npm.ps1]] من نوع ExternalScript، لأن Node على ويندوز بيحط npm.ps1 و npm.cmd، و [[where.exe npm]] هيطبعلك الاتنين (مع [[npm]] من غير امتداد).

عشان تشوف كل النسخ: [[Get-Command node -All]] أو [[where.exe node]]. لما جربت على لينكس [[Get-Command npm -All]] طلع مسارين، وده بالظبط اللي الدرس بيحذر منه: اللي أول واحد في الـ PATH هو اللي بيشتغل. ولو كتبت [[where node]] من غير [[.exe]] مش هيطبع حاجة لأن where هنا Where-Object.`
        }
      ]
    }
]);
