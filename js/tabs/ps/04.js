// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "الـ Pipeline والـ Objects",
      l: 2,
      n: "الفرق الحقيقي بين PowerShell وأي شيل تاني",
      items: [
        {
          cmd: "Where-Object",
          title: "فلتر",
          desc: R`[[Where-Object]] بيفلتر: بيعدّي من الـ pipe الـ objects اللي الشرط عليها صح بس، زي [[grep]] بس على الخصائص مش على النص. اختصاراته [[where]] و [[?]].

المقارنة في PowerShell بكلمات مش رموز: [[-gt]] أكبر من، [[-lt]] أصغر من، [[-eq]] يساوي، [[-ne]] مش يساوي، [[-like]] مع wildcard زي [["*.log"]]، و [[-match]] مع regex. ليه مش [[>]]؟ لأن [[>]] في الشيل معناها «اكتب في ملف». الشرح الكامل للعوامل دي في درس «عوامل المقارنة» في المستوى التالت.

فيه شكلين للكتابة: المختصر [[Where-Object CPU -gt 100]] (اسم الخاصية وبعدها المقارنة) لما الشرط بسيط، والكامل [[Where-Object { $_.Length -gt 1MB }]] لما الشرط أعقد: الأقواس المعقوفة كود بيتنفذ لكل object، و [[$_]] هو الـ object الحالي. و [[1MB]] رقم جاهز (1048576 بايت)، ومعاه [[1KB]] و [[1GB]].`,
          example: R`Get-Process | Where-Object CPU -gt 100
Get-ChildItem -File | Where-Object { $_.Length -gt 1MB }
Get-Service | Where-Object Status -eq Running`,
          try: "اعرض الملفات اللي اتعدلت النهارده بس: [[Where-Object LastWriteTime -gt (Get-Date).Date]].",
          deep: {
            why: "فلترة الـ objects اللي طالعة من أمر قبله. زي grep بس بيفهم الـ properties مش النص.",
            how: R`[[Where-Object { $_.CPU -gt 10 }]] فيه [[$_]] هو اللي اسمه pipeline variable، يمثّل كل object جاي من اليسار.

الاختصارات: [[-gt]] أكبر، [[-lt]] أصغر، [[-eq]] يساوي، [[-ne]] مش يساوي، [[-like "text*"]] wildcard match. ولو الـ property اسمه بسيط: [[Where-Object Name -eq "chrome"]].

وفيه shorthand: بدل [[Where-Object { ... }]] ممكن تكتب [[Where { ... }]] أو [[? { ... }]].`,
            when: "تلاقي processes بتاكل أكتر من X رام. تلاقي services واقفة. تفلتر ملفات بحجم معين.",
            mistakes: "نسيان [[$_]] جوه الـ block. [[.CPU]] لوحدها مش شايلة حاجة."
          },
          teach: R`## الفكرة

[[Where-Object]] بيقف في نص الـ pipe زي البوّاب: كل object جاي بيتسأل سؤال، اللي إجابته True بيعدّي، والباقي بيتشال. السؤال ده اسمه الشرط. اتجرب في PowerShell 7.6.

---

## ١. [[Get-Process | Where-Object CPU -gt 100]]

| الحتة | معناها |
|---|---|
| [[Get-Process]] | object لكل برنامج شغال |
| [[Where-Object]] | عدّي اللي الشرط عليه صح بس |
| [[CPU]] | اسم الخاصية اللي هنسأل عنها |
| [[-gt]] | greater than: أكبر من |
| [[100]] | الرقم |

### [[CPU]] هنا معناها إيه؟

**ثواني**: الوقت اللي المعالج قضّاه شغال للبرنامج ده من ساعة ما اتفتح، مش نسبة مئوية. فبرنامج فاتح من الصبح ممكن يبقى عنده ٨٠ ثانية وهو دلوقتي نايم.

على الجهاز هنا الأمر مطبعش ولا سطر: مفيش برنامج عدّى ١٠٠ ثانية. أعلى واحد كان ٨٦.٨٤. فجربت بـ ٢٠:

~~~powershell
Get-Process | Where-Object CPU -gt 20 | Select-Object Name, Id, CPU
~~~

~~~text جزء من الناتج
Name                  Id   CPU
----                  --   ---
AUEPMaster         12404 86.84
chrome             34780 49.61
Code               22444 62.11
explorer           12932 24.95
~~~

([[Select-Object]] اختار ٣ أعمدة بس عشان الجدول يبقى صغير، الدرس اللي بعده.)

ده **الشكل المختصر**: اسم الخاصية، وبعده المقارنة، وبعده القيمة.

---

## ٢. [[Get-ChildItem -File | Where-Object { $_.Length -gt 1MB }]]

ده **الشكل الكامل**:

- [[{ }]] script block: كود بيتنفذ لكل object.
- [[$_]] الـ object اللي عليه الدور.
- [[$_.Length]] حجمه بالبايت.
- [[1MB]] رقم جاهز = 1048576.

~~~text الناتج (فولدر فيه big.bin حجمه 2000000 بايت)
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:38 AM        2000000 big.bin
~~~

إمتى الشكل الكامل؟ لما الشرط فيه أكتر من حاجة، زي [[{ $_.Length -gt 1MB -and $_.Extension -eq ".log" }]] ([[-and]] = «و»).

---

## ٣. [[Get-Service | Where-Object Status -eq Running]]

[[-eq]] = equal: يساوي. و [[Running]] من غير علامات تنصيص شغالة هنا لأنها كلمة واحدة.

~~~text أول الناتج
Status   Name               DisplayName
------   ----               -----------
Running  AMD Crash Defende… AMD Crash Defender Service
Running  AMD External Even… AMD External Events Utility
Running  AnyDesk            AnyDesk Service
~~~

عدّيتهم: [[(Get-Service).Count]] طلع 308 خدمة، والشغال منهم ([[(Get-Service | Where-Object Status -eq Running).Count]]) 146. يعني الفلتر شال 162.

والعلامة [[…]] في آخر الاسم معناها إن الاسم أطول من العمود فاتقص.

---

## الخلاصة: عوامل المقارنة

| العامل | معناه | مثال |
|---|---|---|
| [[-eq]] | يساوي | [[Status -eq Running]] |
| [[-ne]] | مش يساوي | [[Status -ne Running]] |
| [[-gt]] / [[-lt]] | أكبر / أصغر | [[CPU -gt 20]] |
| [[-ge]] / [[-le]] | أكبر أو يساوي / أصغر أو يساوي | [[Length -ge 1KB]] |
| [[-like]] | بالـ wildcard | [[Name -like "*.log"]] |
| [[-match]] | بالـ regex | [[Name -match '^n\d']] |

ليه مش [[>]]؟ لأن [[>]] في الشيل معناها «اكتب في ملف»: [[CPU > 100]] هتعمل ملف اسمه 100.`,
          lines: [
            "العمليات اللي استهلاكها للمعالج أكبر من 100. الشكل المختصر: property وبعدين المقارنة.",
            "الملفات اللي أكبر من ميجا. الشكل الكامل بالأقواس و [[$_]] لما الشرط أعقد.",
            "الخدمات الشغالة بس."
          ],
          sol: R`[[Get-ChildItem -File | Where-Object LastWriteTime -gt (Get-Date).Date]] بيعرض الملفات اللي اتعدلت النهارده بس. جربتها بعد ما عملت كام ملف فظهروا هما بس. [[(Get-Date).Date]] معناها النهارده الساعة 12 بالليل، فأي حاجة اتعدلت بعدها تبقى من النهارده.

لو طلعلك ولا حاجة، جرب [[New-Item test.txt]] وشغله تاني، المفروض يظهر. ولو كتبت [[-gt Get-Date]] من غير أقواس هيطلع error، لأن PowerShell هيعتبر Get-Date كلمة نص مش أمر. والأقواس حوالين [[(Get-Date)]] هي اللي بتنفذ الأمر الأول وتاخد منه [[.Date]].`
        },
        {
          cmd: "Select-Object",
          title: "اختار أعمدة أو عدد",
          desc: R`[[Select-Object]] (اختصاره [[select]]) بيختار أعمدة أو عدد صفوف من الناتج. [[Name, Id, CPU]] أسامي الخصائص اللي عايزها مفصولة بفواصل، فالجدول يبقى فيه الأعمدة دي بس، زي [[cut]] في bash بس على أسامي مش أرقام أعمدة.

[[-First 5]] أول ٥ بس (زي [[head -5]])، و [[-Last 5]] آخر ٥ (زي tail)، و [[-Skip 2]] يعدّي أول اتنين، و [[-Unique]] يشيل المكرر. و [[-ExpandProperty Name]] بيطلع القيمة نفسها كنص عادي بدل جدول بعمود اسمه Name، ودي اللي محتاجها لما هتبعت الأسامي لأمر تاني أو تكتبها في ملف.

متتلخبطش بينه وبين Where-Object: Select بيختار أعمدة أو عدد، Where بيختار صفوف بشرط. ولو كتبت اسم خاصية مش موجود مش هيطلع error، هيطلعلك عمود فاضي، فاتأكد من الأسامي بـ Get-Member.`,
          example: R`Get-Process | Select-Object Name, Id, CPU -First 5
Get-ChildItem | Select-Object -ExpandProperty Name`,
          try: "اعرض اسم وحجم كل ملف في فولدر.",
          deep: {
            why: "اختيار properties معينة من object أو تحديد عدد النتايج. زي [[cut]] في bash بس لـ objects.",
            how: R`[[Select-Object Name, CPU]] بيعرض العمودين دول بس. [[-First 5]] أول ٥. [[-Last 5]] آخر ٥. [[-Unique]] بيشيل المتكرر.

[[-ExpandProperty Name]] بيجيب قيمة property بس (String مش object)، مفيد لما بتحتاج النص نفسه مش الـ object.

[[Select-Object *]] بيعرض كل properties، مفيد لما Format-Table بيختصر وانت عايز الكل.`,
            when: "تعمل output نضيف بأعمدة معينة. تاخد أول N نتايج. تجيب قيمة property كنص.",
            mistakes: "الخلط بين Select-Object وWhere-Object. Select بيختار أعمدة، Where بيفلتر صفوف."
          },
          teach: R`## الفكرة

[[Where-Object]] بيختار **صفوف**. [[Select-Object]] بيختار **أعمدة** (أو عدد صفوف من الأول أو الآخر). اتجرب في PowerShell 7.6.

---

## ١. [[Get-Process | Select-Object Name, Id, CPU -First 5]]

| الحتة | معناها |
|---|---|
| [[Name, Id, CPU]] | الأعمدة اللي عايزها، مفصولة بفاصلة، بالترتيب ده |
| [[-First 5]] | أول ٥ صفوف بس |

~~~text الناتج
Name                   Id  CPU
----                   --  ---
AcPowerNotification 11788 2.44
AggregatorHost       9132
amdfendrsr           3816
AMDRSServ           24804 0.23
AMDRSSrcExt         14972 1.00
~~~

ليه [[CPU]] فاضي في سطرين؟ دي برامج شغالة بصلاحيات أعلى منك (خدمات)، فويندوز مش بيديك وقت المعالج بتاعها. والترتيب أبجدي لأن [[Get-Process]] بيرجّعهم كده.

ومن غير [[Select-Object]]، [[Get-Process]] بيعرض أعمدته الافتراضية ([[NPM(K)]] و [[PM(M)]] و [[WS(M)]] و ...). يعني انت اللي بتختار الشكل.

---

## ٢. [[Get-ChildItem | Select-Object -ExpandProperty Name]]

~~~text الناتج
node_modules
src
.env.example
a.js
app.log
...
~~~

قارن بـ [[Select-Object Name]] من غير Expand:

~~~text Get-ChildItem | Select-Object Name -First 2
Name
----
node_modules
src
~~~

| الأمر | بيرجّع | تستخدمه لما |
|---|---|---|
| [[Select-Object Name]] | objects لسه، فيها خانة واحدة اسمها Name، فبتتطبع جدول بعنوان | عايز تعرض |
| [[Select-Object -ExpandProperty Name]] | النصوص نفسها، من غير غلاف | هتبعت الأسامي لأمر تاني أو ملف أو متغير |

---

## اختيارات تانية

| الإضافة | بتعمل إيه | في bash |
|---|---|---|
| [[-First 5]] | أول ٥ | [[head -5]] |
| [[-Last 5]] | آخر ٥ | [[tail -5]] |
| [[-Skip 2]] | عدّي أول ٢ | [[tail -n +3]] |
| [[-Unique]] | شيل المكرر | [[uniq]] |
| [[Name, Length]] | أعمدة بالاسم | [[cut]] بالرقم |

---

## الخلاصة

- [[Select-Object]] أعمدة وعدد، [[Where-Object]] صفوف بشرط.
- [[-ExpandProperty]] لما عايز القيمة نفسها مش جدول.
- اسم عمود غلط بيطلع عمود فاضي من غير error، فـ [[Get-Member]] الأول.`,
          lines: ["٣ أعمدة بس، وأول ٥ صفوف.", "الأسامي كنصوص عادية بدل objects ([[-ExpandProperty]])."],
          sol: R`[[Get-ChildItem -File | Select-Object Name, Length]] بيطبع جدول بعمودين. جربتها فطلع مثلًا [[b.txt  5]] و [[package.json  85]] (الحجم بالبايت).

لو شلت [[-File]] الفولدرات هتظهر وعمود Length جنبها فاضي، لأن الفولدر مفيهوش حجم. وخلي بالك: لو كتبت [[Select-Object Name, Size]] مش هيطلع error، هيطلعلك عمود Size فاضي، لأن الاسم الصح Length. استخدم [[Get-Member]] لو مش متأكد من اسم الـ property.`
        },
        {
          cmd: "Sort-Object",
          title: "رتّب",
          desc: R`[[Sort-Object]] (اختصاره [[sort]]) بيرتب الـ objects حسب أي خاصية: [[Sort-Object Length]] بالحجم من الأصغر للأكبر، و [[-Descending]] بيعكس الترتيب، و [[-Unique]] بيشيل المكرر. وتقدر ترتب بأكتر من خاصية: [[Sort-Object Extension, Name]].

المثال الأول pipeline من ٣ أوامر: هات كل الملفات في كل الفولدرات، رتّبهم بالحجم من الأكبر، وخد أول ١٠ بعمودين بس. ده المقابل لـ [[du -a | sort -rn | head]] في bash، بس من غير ما تقصّ نص. والتاني بيرتب العمليات بـ [[WorkingSet]] (الرام اللي العملية ماسكاها بالبايت).

ميزة كبيرة عن bash: بيرتب الأرقام كأرقام والتواريخ كتواريخ لوحده، لأن الخصائص ليها نوع. بس لو القيم نصوص فيها أرقام (زي اللي جاية من CSV)، [["10"]] هتيجي قبل [["9"]]، فحوّلها: [[Sort-Object { [int]$_.Age }]].`,
          example: R`Get-ChildItem -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 Name, Length
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5`,
          try: "اعرف أكتر 5 برامج بتاكل رام.",
          deep: {
            why: R`«أكبر ١٠ ملفات»، «أكتر ٥ برامج بتاكل رام»، «آخر الملفات اللي اتعدلت». أي سؤال فيه «أكتر» أو «آخر» محتاج ترتيب، و Sort-Object بيرتب بأي خاصية من غير ما تقص نص زي [[sort -k]] في bash.`,
            how: R`[[Sort-Object Name]] ترتيب أبجدي. [[Sort-Object CPU -Descending]] من الأكبر للأصغر (أكتر CPU أول). [[Sort-Object @{e="CPU";d=$true}, Name]] ترتيب بأكتر من property.

أول تفصيلة مهمة: Sort-Object بيعمل الترتيب على كل الـ objects الجاية، يعني بيجمعها الأول في الذاكرة. على pipeline طويل ده ممكن يأكل رام.`,
            when: "ترتيب processes بالـ CPU. ترتيب ملفات بالحجم.",
            mistakes: "ترتيب نص رقمي بدون [[-Property { [int]$_ }]] فـ «10» تيجي قبل «9»."
          },
          teach: R`## الفكرة

[[Sort-Object]] بيرتّب الـ objects حسب خاصية. ولأن الخاصية ليها نوع (رقم، تاريخ، نص)، الترتيب بيطلع صح من غير ما تقوله «رتّب كأرقام». اتجرب في PowerShell 7.6.

---

## ١. السطر الأول: أكبر ١٠ ملفات

~~~powershell
Get-ChildItem -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 Name, Length
~~~

### الأمر الأول: [[Get-ChildItem -Recurse -File]]

كل الملفات في الفولدر وكل اللي تحته، من غير فولدرات.

### الأمر التاني: [[Sort-Object Length -Descending]]

رتّبهم بالحجم. الافتراضي من الصغير للكبير، و [[-Descending]] بيعكس: الكبير الأول.

### الأمر التالت: [[Select-Object -First 10 Name, Length]]

خد أول ١٠ (اللي هما الأكبر دلوقتي)، بعمودين بس.

~~~text الناتج
Name          Length
----          ------
big.bin      2000000
app.log         1139
package.json     151
util.ts           36
a.js              34
server.js         23
i.js              20
b.js              13
notes.txt         13
.env.example      11
~~~

[[Sort-Object]] لازم يستلم **كل** الـ objects الأول قبل ما يطلّع أي حاجة (مش ممكن تعرف مين الأكبر قبل ما تشوف الكل)، فعلى فولدر ضخم هتستنى شوية.

---

## ٢. السطر التاني: أكتر ٥ برامج بتاكل رام

~~~powershell
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5
~~~

[[WorkingSet]] الرام اللي البرنامج ماسكها دلوقتي بالبايت.

~~~text الناتج
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
    113   582.78     636.71      23.91   27384   1 Code
    137   567.50     579.95      29.44   21380   1 Code
     98   395.21     540.95      49.58   34780   1 chrome
     69   459.14     511.77       7.22    8424   1 Code
    306   479.15     496.30       0.00    6932   0 MsMpEng
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[NPM(K)]] | رام مش ممكن تتنقل للديسك، بالكيلو |
| [[PM(M)]] | رام خاصة بالبرنامج، بالميجا |
| [[WS(M)]] | Working Set: الرام اللي ماسكها فعلًا دلوقتي، بالميجا. ده اللي رتبنا بيه |
| [[CPU(s)]] | ثواني معالج من ساعة ما فتح |
| [[Id]] | رقم العملية (PID) |
| [[SI]] | Session ID: 0 خدمات النظام، و 1 اليوزر اللي فاتح |
| [[ProcessName]] | الاسم |

[[Code]] (VS Code) ظاهر ٣ مرات لأن كل نافذة وكل extension host عملية لوحدها. و [[MsMpEng]] ده Windows Defender، و [[SI]] بتاعه 0 لأنه خدمة نظام. وفي 5.1 العمود اسمه [[WS(K)]] وبالكيلو.

---

## فخ: نصوص فيها أرقام

~~~text الناتج
"10","9","100" | Sort-Object            →  10  100  9
"10","9","100" | Sort-Object { [int]$_ } →  9  10  100
~~~

النصوص بتترتب حرف حرف ("1" قبل "9")، فـ 100 جت قبل 9. الحل: script block يحوّل كل قيمة لرقم قبل المقارنة.

---

## الخلاصة

| الخطوة | الحتة |
|---|---|
| هات | [[Get-ChildItem -Recurse -File]] |
| رتّب | [[Sort-Object Length -Descending]] |
| خد الأوائل | [[Select-Object -First 10 Name, Length]] |

في bash: [[du -a | sort -rn | head]]، بس هناك بتقصّ نص. هنا بتقول اسم الخاصية.`,
          lines: [
            "كل الملفات، مرتبة بالحجم من الأكبر، وخد أكبر ١٠ بالاسم والحجم.",
            "أكتر ٥ عمليات استهلاكًا للرام."
          ],
          sol: R`[[Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5]] بيطلع أكتر 5 عمليات بتاكل رام. غالبًا هتلاقي chrome أو msedge أو Code أو MsMpEng (Defender)، والعمود [[WS(M)]] في PowerShell 7 بالميجا (في 5.1 اسمه [[WS(K)]] وبالكيلو).

لو عايز عمود بالميجا واضح استخدم الـ solCode. ولاحظ إن Chrome بيطلع كذا مرة لأن كل تاب عملية لوحده، فعشان تعرف Chrome كله بياخد كام، جمّع بالاسم (درس Group-Object). ولو رتبت بـ [[CPU]] بدل WorkingSet هتجيب اللي أكل وقت معالج من ساعة ما فتح، مش الرام.`,
          solCode: R`Get-Process |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 5 Name, Id, @{ Name = "MB"; Expression = { [math]::Round($_.WorkingSet / 1MB, 1) } }`
        },
        {
          cmd: "Measure-Object",
          title: "عدّ واجمع",
          desc: R`[[Measure-Object]] (اختصاره [[measure]]) بيعدّ ويحسب إحصائيات على الـ objects اللي جاية له: [[-Sum]] المجموع، و [[-Average]] المتوسط، و [[-Maximum]] و [[-Minimum]]. بتديله اسم الخاصية اللي هيحسب عليها، زي [[Length]] للحجم. الناتج object فيه [[Count]] و [[Sum]] وغيرهم، فتقدر تاخد منه بالنقطة: [[(...).Sum / 1MB]].

السطر الأول طريقة أقصر للعدّ بس: الأقواس بتجمع كل الملفات في array، و [[.Count]] بيعدّها. والتاني بيجمع أحجام كل الملفات في الفولدر واللي تحته، يعني حجم الفولدر بالبايت. في bash ده [[du -sb]] للحجم و [[wc -l]] للعدّ.

خلي بالك: الحجم ده مجموع أحجام الملفات، وممكن يختلف شوية عن «Size on disk» في Explorer. وعلى فولدر كبير زي node_modules بياخد ثواني، طبيعي.`,
          example: R`(Get-ChildItem -Recurse -File).Count
Get-ChildItem -Recurse -File | Measure-Object Length -Sum`,
          try: "اعرف حجم فولدر node_modules بالميجا: قسّم الـ Sum على [[1MB]].",
          deep: {
            why: "إحصاءات على مجموعة من القيم: العد، والمجموع، والمتوسط. زي wc -l في bash بس أقوى.",
            how: R`[[Get-Process | Measure-Object]] بيعدّهم. [[Measure-Object -Property CPU -Sum -Average -Maximum]] بيحسب إحصاءات على property معينة.

[[(Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB]] حجم الفولدر بالميجا.`,
            when: "عد الملفات. إجمالي حجم فولدر. متوسط أو أعلى استهلاك CPU.",
            mistakes: "نسيان property اسمها [[-Property]] لما بتعمل Sum أو Average."
          },
          teach: R`## الفكرة

[[Measure-Object]] بيعدّ ويحسب: عدد، ومجموع، ومتوسط، وأكبر، وأصغر. اتجرب في PowerShell 7.6 على فولدر فيه ١٦ ملف (منهم [[big.bin]] بـ 2000000 بايت).

---

## ١. [[(Get-ChildItem -Recurse -File).Count]]

~~~text الناتج
16
~~~

ده مش Measure-Object خالص: الأقواس جمعت الملفات في array، و [[.Count]] عدّت العناصر. أقصر طريقة لما عايز العدد بس.

> الملفات المخفية مش بتتعد إلا بـ [[-Force]]. الفولدر ده فيه ملف مخفي، وهو مش في الـ ١٦.

---

## ٢. [[Get-ChildItem -Recurse -File | Measure-Object Length -Sum]]

| الحتة | معناها |
|---|---|
| [[Measure-Object]] | احسب على اللي جاي في الـ pipe |
| [[Length]] | على خاصية الحجم |
| [[-Sum]] | اجمع |

~~~text الناتج
Count             : 16
Average           :
Sum               : 2001465
Maximum           :
Minimum           :
StandardDeviation :
Property          : Length
~~~

- [[Count]] اتحسب لوحده دايمًا.
- [[Sum]] مجموع الأحجام بالبايت.
- الباقي فاضي لأننا مطلبناهوش.
- [[Property]] الخاصية اللي اتحسب عليها.

### اطلب كله

~~~powershell
Get-ChildItem -Recurse -File | Measure-Object Length -Sum -Average -Maximum -Minimum
~~~

~~~text الناتج
Count             : 16
Average           : 125091.5625
Sum               : 2001465
Maximum           : 2000000
Minimum           : 3
~~~

المتوسط 125091 كبير كده لأن ملف واحد ([[big.bin]]) بـ ٢ مليون والباقي صغيرين. المتوسط بيتأثر بالأرقام الشاذة.

### حوّله ميجا

~~~powershell
(Get-ChildItem -Recurse -File | Measure-Object Length -Sum).Sum / 1MB
~~~

~~~text الناتج
1.90874576568604
~~~

الأقواس جابت الـ object، و [[.Sum]] خدت المجموع، و [[/ 1MB]] قسمت على 1048576. وعشان رقمين بس بعد العلامة: [[[math]::Round(..., 2)]] (زي الـ solCode).

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| عدد | [[(...).Count]] | [[wc -l]] |
| حجم فولدر | [[Measure-Object Length -Sum]] | [[du -sb]] |
| متوسط / أكبر / أصغر | [[-Average -Maximum -Minimum]] | [[awk]] |
| بالميجا | [[(...).Sum / 1MB]] | [[du -sh]] |

لازم تقوله **أنهي خاصية** ([[Length]])، وإلا هيحاول يجمع الملفات نفسها ويطلع [[is not numeric]].`,
          lines: ["عدد الملفات (الأقواس تجمع الناتج الأول وبعدين .Count).", "مجموع أحجام كل الملفات."],
          sol: R`[[Get-ChildItem node_modules -Recurse -File | Measure-Object Length -Sum]] بيطبع [[Count]] (عدد الملفات) و [[Sum]] (الحجم بالبايت)، وبعدين تقسم على [[1MB]]. جربتها على فولدر node_modules فيه 8463 ملف فطلع Sum بـ 229935708 والقسمة طلعت [[219.28]] ميجا.

الرقم ممكن يختلف شوية عن «Size on disk» في Explorer، لأن Explorer بيحسب حجم الـ clusters على الديسك. وعلى لينكس والماك ضيف [[-Force]] عشان الملفات اللي بتبدأ بنقطة متتشالش من الحساب. ولو كتبت [[Measure-Object -Sum]] من غير [[Length]] بيحاول يجمع الملفات نفسها فيطلع [[Input object "..." is not numeric.]] (جربتها في 7.6 و 5.1).`,
          solCode: R`$m = Get-ChildItem .\node_modules -Recurse -File -Force | Measure-Object Length -Sum
$m.Count
[math]::Round($m.Sum / 1MB, 2)`
        },
        {
          cmd: "ForEach-Object",
          title: "نفّذ حاجة على كل عنصر",
          desc: R`[[ForEach-Object]] بينفّذ كود على كل عنصر جاي في الـ pipe، واحد واحد. اختصاراته [[foreach]] و [[%]] (النسبة المئوية)، فلو شفت [[| % { ... }]] في كود حد، ده هو. الكود بيتكتب جوه [[{ }]]، و [[$_]] جوّاه هو العنصر الحالي.

[[1..5]] بيعمل array أرقام من 1 لـ 5 (الـ [[..]] هنا اسمها range operator). و [["Item $_"]] نص بين double quotes، فـ [[$_]] بتتبدّل بقيمتها جوه النص. وفي السطر التاني [[$_.Name.ToUpper()]]: اسم الملف، وعليه method بتحوّله لحروف كابيتال، والأقواس [[()]] في الآخر لازمة مع أي method.

ده المقابل لـ [[| while read line]] أو [[xargs]] في bash. ولو بتلف على حاجة جوه سكربت مش جوه pipe، [[foreach ($x in $list) { }]] أوضح (درس اللوب في المستوى التالت). وفي PowerShell 7 فيه [[-Parallel]] يشغّل أكتر من عنصر في نفس الوقت.`,
          example: R`1..5 | ForEach-Object { "Item $_" }
Get-ChildItem *.log | ForEach-Object { $_.Name.ToUpper() }`,
          try: "اعمل 5 ملفات test1.txt لـ test5.txt بـ ForEach-Object و New-Item.",
          deep: {
            why: "تنفيذ كود على كل element في pipeline. زي for loop في لينكس بس داخل pipeline.",
            how: R`[[ForEach-Object { $_ }]] أو [[% { $_ }]] الاختصار. جوه الـ block [[$_]] (أو [[$PSItem]]، نفس الحاجة باسم أوضح) هو العنصر الحالي.

فيه شكل أقصر للخصائص البسيطة: [[Get-Process | ForEach-Object Name]] بدل [[Get-Process | ForEach-Object { $_.Name }]].

وفيه [[-Begin]] و [[-End]]: كود بيتنفذ مرة قبل أول عنصر ومرة بعد آخر عنصر، زي [[1..3 | ForEach-Object -Begin { $sum = 0 } -Process { $sum += $_ } -End { $sum }]].

في PowerShell 7: [[-Parallel { ... } -ThrottleLimit 5]] بيشغّل لحد ٥ عناصر في نفس الوقت، مفيد مع طلبات شبكة كتير. جوه الـ Parallel المتغيرات اللي بره مش بتتشاف إلا بـ [[$using:name]]. والترتيب مش مضمون: [[1..3 | ForEach-Object -Parallel { $_ * $using:n }]] مع [[$n = 5]] طلّع 10 و 5 و 15 في تجربتي. وفي 5.1 مفيش [[-Parallel]] خالص: بيطلع [[Parameter set cannot be resolved using the specified named parameters.]]`,
            when: "تعمل حاجة على كل ملف. تبعت طلب API لكل record.",
            mistakes: "استخدامه لحاجات موجودة كـ methods في الـ objects. لو Process عنده Kill() method، استخدمه مباشرة."
          },
          teach: R`## الفكرة

[[ForEach-Object]] بيشغّل نفس الكود على كل عنصر جاي في الـ pipe، واحد ورا التاني. الكود جوه [[{ }]]، و [[$_]] هو العنصر الحالي. اتجرب في PowerShell 7.6.

---

## ١. [[1..5 | ForEach-Object { "Item $_" }]]

### [[1..5]]

[[..]] اسمه range operator: بيعمل array أرقام من الأول للآخر.

~~~text الناتج لوحده
1
2
3
4
5
~~~

### [[| ForEach-Object { ... }]]

الأرقام بتعدّي واحد واحد. أول دورة [[$_]] = 1، والتانية 2، وهكذا.

### [["Item $_"]]

نص بين **double quotes**، فأي متغير جوّاه بيتبدّل بقيمته. والنص لوحده بيتطبع.

~~~text الناتج
Item 1
Item 2
Item 3
Item 4
Item 5
~~~

وبـ **single quotes** مفيش تبديل: [['Item $_']] طبع [[Item $_]] حرفيًا.

---

## ٢. [[Get-ChildItem *.log | ForEach-Object { $_.Name.ToUpper() }]]

بترتيب التنفيذ لكل ملف:

| الحتة | قيمتها لأول ملف |
|---|---|
| [[$_]] | object الملف [[app.log]] |
| [[$_.Name]] | النص [["app.log"]] |
| [[.ToUpper()]] | method على النص: حوّل لكابيتال. الأقواس [[()]] لازمة مع أي method حتى لو فاضية |

~~~text الناتج
APP.LOG
ERROR.LOG
WEB.LOG
~~~

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[| ForEach-Object { كود }]] | الكود لكل عنصر |
| [[| % { كود }]] | نفس الكلام مختصر |
| [[| ForEach-Object Name]] | هات خاصية من كل عنصر |
| [[$_]] | العنصر الحالي |
| [["... $_ ..."]] | حط القيمة جوه نص (double quotes بس) |

في bash أقرب حاجة [[for i in {1..5}; do echo "Item $i"; done]] أو [[xargs]]. وفي 5.1 مفيش [[-Parallel]] (جربتها: [[Parameter set cannot be resolved using the specified named parameters.]]).`,
          lines: [
            "الأرقام من ١ لـ ٥، ولكل واحد اطبع Item ورقمه. [[$_]] هو العنصر الحالي.",
            "اسم كل ملف log بحروف كابيتال. بتقدر تنادي methods على [[$_]]."
          ],
          sol: R`[[1..5 | ForEach-Object { New-Item "test$_.txt" }]] بيعمل [[test1.txt]] لـ [[test5.txt]] وبيطبع جدول بالـ 5 ملفات. جربتها وطلعوا الخمسة.

[[$_]] جوه الـ [[{ }]] هو الرقم الحالي، والـ double quotes هي اللي بتخليه يتحط في الاسم. لو كتبت [['test$_.txt']] بـ single quotes هيعمل ملف واحد اسمه حرفيًا [[test$_.txt]] والباقي هيطلع error إنه موجود. ولو شغلته مرة تانية هيطلعلك 5 errors [[already exists]] لأن الملفات موجودة.`,
          solCode: R`1..5 | ForEach-Object { New-Item "test$_.txt" }
Get-ChildItem test*.txt | Select-Object Name`
        },
        {
          cmd: "Group-Object",
          title: "جمّع حسب قيمة",
          desc: R`[[Group-Object]] (اختصاره [[group]]) بيجمّع الـ objects اللي ليها نفس القيمة في خاصية معينة، ويعدّ كل مجموعة. الناتج جدول بـ ٣ أعمدة: [[Count]] عدد العناصر، و [[Name]] القيمة المشتركة، و [[Group]] العناصر نفسها.

المثال: هات كل الملفات، جمّعهم حسب [[Extension]] (الامتداد)، وبعدين [[Sort-Object Count -Descending]] رتّب المجموعات من الأكتر عددًا. فتعرف مشروعك فيه كام ملف js وكام css. في bash ده محتاج [[sort | uniq -c | sort -rn]] على نص متقصوص، هنا سطر واحد على خصائص.

[[-NoElement]] بيشيل عمود Group لو مش محتاجه فالجدول يبقى أنضف. والملفات اللي ملهاش امتداد بتتجمع تحت Name فاضي، ومش غلط.`,
          example: "Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending",
          try: "اعرف أكتر نوع ملفات في مشروعك.",
          deep: {
            why: "تجميع النتايج بـ property. زي [[uniq -c]] في bash بس بيجيب groups كاملة.",
            how: R`[[Get-Process | Group-Object Name]] بيجمع كل processes بنفس الاسم في group، وبيقولك العدد.

الناتج objects بيها [[Count]] وعدد العناصر و[[Group]] قايمة العناصر نفسها. فتقدر تعمل فلترة بعدين.

[[Get-WinEvent -LogName Application -MaxEvents 100 | Group-Object LevelDisplayName | Sort-Object Count -Descending]] إحصاء لأنواع events.`,
            when: "كام process بكل اسم. إيه أكتر نوع لوج بيتكرر.",
            mistakes: "استخدامه من غير Sort-Object بعده. عادة الناتج محتاج ترتيب."
          },
          teach: R`## الفكرة

[[Group-Object]] بيحط الـ objects اللي ليها نفس القيمة في كوم واحد، ويعدّ كل كوم. المثال pipeline من ٣ أوامر، اتجرب في PowerShell 7.6 على فولدر فيه ١٦ ملف.

---

## الأمر الأول: [[Get-ChildItem -Recurse -File]]

كل الملفات تحت الفولدر.

## الأمر التاني: [[Group-Object Extension]]

جمّعهم حسب [[Extension]] (الامتداد): كل الـ [[.js]] مع بعض، وكل الـ [[.txt]] مع بعض.

## الأمر التالت: [[Sort-Object Count -Descending]]

رتّب الكوَم: الأكبر عددًا الأول.

~~~text الناتج (عمود Group اتقص)
Count Name                      Group
----- ----                      -----
    5 .js                       {C:\Users\7ossa\AppData\Local\Temp\…
    4 .txt                      {C:\Users\7ossa\AppData\Local\Temp\…
    3 .log                      {C:\Users\7ossa\AppData\Local\Temp\…
    1 .bin                      {C:\Users\7ossa\AppData\Local\Temp\…
    1 .example                  {C:\Users\7ossa\AppData\Local\Temp\…
    1 .json                     {C:\Users\7ossa\AppData\Local\Temp\…
    1 .ts                       {C:\Users\7ossa\AppData\Local\Temp\…
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[Count]] | كام ملف في الكوم ده |
| [[Name]] | القيمة المشتركة (الامتداد) |
| [[Group]] | الـ objects نفسها. [[{ }]] في العرض معناها «لستة» |

لاحظ [[.example]]: الملف اسمه [[.env.example]]، والامتداد هو اللي بعد **آخر** نقطة.

---

## [[-NoElement]]: من غير عمود Group

~~~powershell
Get-ChildItem -Recurse -File | Group-Object Extension -NoElement | Sort-Object Count -Descending
~~~

~~~text الناتج
Count Name
----- ----
    5 .js
    4 .txt
    3 .log
    1 .bin
    1 .example
    1 .json
    1 .ts
~~~

---

## الخلاصة

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[Get-ChildItem -Recurse -File]] | هات الملفات |
| ٢ | [[Group-Object Extension]] | كوّمهم بالامتداد |
| ٣ | [[Sort-Object Count -Descending]] | الأكبر الأول |

نفس الفكرة على أي خاصية: [[Get-Process | Group-Object Name]] كام عملية من كل برنامج. وفي bash: [[sort | uniq -c | sort -rn]] على نص.`,
          lines: ["جمّع الملفات حسب الامتداد، ورتّب المجموعات من الأكتر عددًا."],
          sol: R`[[Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending]] بيطلع جدول [[Count  Name  Group]]. جربته على مشروع صغير فطلع [[2 .js]] و [[1 .ts]]. في مشروع حقيقي أول سطر غالبًا [[.js]] بآلاف، وده لأن node_modules داخل في الحساب.

عشان تشوف كودك انت بس، فلتر node_modules الأول بـ [[Where-Object FullName -notmatch 'node_modules']]. الملفات اللي ملهاش امتداد بتتجمع تحت Name فاضي. وعمود Group فيه الملفات نفسها لو عايز تفتحها، ولو مش محتاجها ضيف [[-NoElement]] يبقى الجدول أنضف.`
        },
        {
          cmd: "Export-Csv / ConvertTo-Json",
          title: "صدّر الناتج",
          desc: R`لما الناتج يعجبك وعايز تحفظه أو تبعته: [[Export-Csv]] بيكتبه ملف CSV يتفتح في Excel، و [[ConvertTo-Json]] بيحوّله نص JSON ينفع لـ API أو ملف إعدادات. الاتنين بياخدوا objects من الـ pipe، فقبلهم [[Select-Object]] تختار الأعمدة اللي عايزها بس.

[[-NoTypeInformation]] بتشيل سطر أول غريب بيبدأ بـ [[#TYPE]] في Windows PowerShell 5.1 (في 7 مش بيتكتب أصلًا، والإضافة مش بتضر). و [[-AutoSize]] في [[Format-Table]] بتظبط عرض الأعمدة على قد الكلام.

أهم قاعدة: أوامر [[Format-*]] (زي Format-Table و Format-List) للعرض على الشاشة بس، وبيطلّعوا أوامر رسم مش بيانات. فلو حطيت Format-Table قبل Export-Csv الملف هيطلع مليان كلام غريب. خلّي Format-Table آخر حاجة في السطر دايمًا. والعكس موجود: [[Import-Csv]] و [[ConvertFrom-Json]] بيرجّعوا الملف objects تاني.`,
          example: R`Get-Process | Select-Object Name, Id -First 5 | Format-Table -AutoSize
Get-Process | Select-Object Name, Id, CPU | Export-Csv procs.csv -NoTypeInformation
Get-Service | Select-Object Name, Status -First 3 | ConvertTo-Json`,
          try: "صدّر لستة ملفات فولدر (الاسم والحجم) لـ CSV وافتحه في Excel.",
          deep: {
            why: "تحفظ البيانات في شكل قابل للاستخدام: CSV لـ Excel، أو JSON لـ API أو ملفات config.",
            how: R`[[Export-Csv -Path out.csv -NoTypeInformation]] يحفظ مباشرة. [[-NoTypeInformation]] مهمة عشان تشيل السطر الأول الغريب اللي بيبقى اسم النوع في PowerShell.

[[ConvertTo-Json -Depth 5]] يحوّل لـ JSON. [[-Depth]] مهمة عشان الـ objects المتداخلة.

وخلي بالك في السطر التالت: [[Status]] نوعه enum، فبيتكتب في الـ JSON رقم ([["Status": 4]] يعني Running و 1 يعني Stopped) مش كلمة. في PowerShell 7 ضيف [[-EnumsAsStrings]] فيطلع [["Status": "Running"]]، وفي 5.1 مش موجودة.

[[Import-Csv]] لاستيراد CSV. [[ConvertFrom-Json]] لـ JSON. الاتنين بيتعاملوا بـ objects مش نص.`,
            when: "تصدير بيانات لـ Excel. حفظ نتايج تحليل. كتابة config جديد.",
            mistakes: "نسيان -NoTypeInformation فيطلع سطر أول غريب. ونسيان -Depth فـ JSON يكون مبتور."
          },
          teach: R`## الفكرة

٣ طرق تطلّع بيها الناتج: جدول **للعين** ([[Format-Table]])، أو ملف CSV **لـ Excel** ([[Export-Csv]])، أو نص JSON **لبرنامج تاني** ([[ConvertTo-Json]]). اتجرب في PowerShell 7.6، والفروق مع 5.1 في الآخر.

---

## ١. [[Get-Process | Select-Object Name, Id -First 5 | Format-Table -AutoSize]]

[[Format-Table]] بيرسم جدول، و [[-AutoSize]] بيخلي عرض كل عمود على قد أطول كلمة فيه.

~~~text الناتج
Name                   Id
----                   --
AcPowerNotification 11788
AggregatorHost       9132
amdfendrsr           3816
AMDRSServ           24804
AMDRSSrcExt         14972
~~~

---

## ٢. [[... | Export-Csv procs.csv -NoTypeInformation]]

بيكتب الـ objects في ملف CSV: أول سطر أسامي الأعمدة، وكل object سطر.

~~~text Get-Content procs.csv -TotalCount 4
"Name","Id","CPU"
"AcPowerNotification","11788","2.484375"
"AggregatorHost","9132",
"amdfendrsr","3816",
~~~

- كل قيمة بين علامات تنصيص، ومفصولة بفاصلة (CSV = Comma-Separated Values).
- [[CPU]] الفاضي بقى خانة فاضية بعد الفاصلة.
- [[-NoTypeInformation]]: في 5.1 من غيرها أول سطر بيبقى [[#TYPE Selected.System.Diagnostics.Process]] (جربتها). في 7 مش بيتكتب أصلًا.

والعكس [[Import-Csv procs.csv]] بيرجّعهم objects، بس كل القيم بتبقى **نصوص**: [[(Import-Csv procs.csv)[0].Id.GetType().Name]] طلع [[String]].

---

## ٣. [[Get-Service | Select-Object Name, Status -First 3 | ConvertTo-Json]]

~~~text الناتج (PowerShell 7.6)
[
  {
    "Name": "AarSvc_11a339",
    "Status": 1
  },
  {
    "Name": "ADPSvc",
    "Status": 1
  },
  {
    "Name": "ALG",
    "Status": 1
  }
]
~~~

- [[[ ]]] array، وكل [[{ }]] object.
- [["Status": 1]] رقم مش كلمة! [[Status]] نوعه **enum**: لستة كلمات ثابتة كل واحدة ليها رقم ([[1]] = Stopped و [[4]] = Running). JSON بيكتب الرقم.

في PowerShell 7 ضيف [[-EnumsAsStrings]]:

~~~text الناتج
    "Status": "Stopped"
~~~

---

## الغلطة الكبيرة: [[Format-Table]] قبل التصدير

جربت [[... | Format-Table | Export-Csv bad.csv]]:

~~~text Get-Content bad.csv -TotalCount 2
"ClassId2e4f51ef21dd47e99d3c952918aff9cd","pageHeaderEntry","pageFooterEntry","autosizeInfo","shapeInfo","groupingEntry"
"033ecb2bc07a4d43b5ef94ed5a35d280",,,,"Microsoft.PowerShell.Commands.Internal.Format.TableHeaderInfo",
~~~

[[Format-Table]] مش بيطلّع بيانات، بيطلّع **تعليمات رسم** للشاشة. فـ Export-Csv كتب التعليمات دي. القاعدة: [[Format-*]] آخر حاجة في السطر، ومفيش بعدها غير الشاشة.

---

## الخلاصة

| عايز | آخر السطر |
|---|---|
| تشوف | [[| Format-Table -AutoSize]] |
| Excel | [[| Export-Csv f.csv -NoTypeInformation]] |
| JSON | [[| ConvertTo-Json]] |
| ترجّع CSV | [[Import-Csv f.csv]] |
| ترجّع JSON | [[Get-Content f.json -Raw | ConvertFrom-Json]] |

| | 5.1 | 7 |
|---|---|---|
| سطر [[#TYPE]] في CSV | بيتكتب من غير [[-NoTypeInformation]] | مش بيتكتب |
| [[-EnumsAsStrings]] | مش موجود | موجود |
| مسافات JSON | [["Status":  1]] (مسافتين) | [["Status": 1]] |`,
          lines: [
            "اعرض جدول مضبوط الأعمدة (للشاشة بس).",
            "احفظ كـ CSV تفتحه في Excel. [[-NoTypeInformation]] يشيل سطر أول غريب.",
            "حوّل لـ JSON."
          ],
          sol: R`الحل في الـ solCode. جربته فطلع ملف أوله [["Name","Length"]] وبعدين سطر لكل ملف زي [["b.txt","5"]]. [[ii files.csv]] بيفتحه في Excel لو متسطب.

أشهر غلطة إنك تعمل [[Format-Table]] قبل [[Export-Csv]]: جربتها فطلع ملف فيه أعمدة غريبة زي [[ClassId2e4f51ef21dd47e99d3c952918aff9cd]] بدل الاسم والحجم، لأن Format-Table بيطلع أوامر عرض مش بيانات. ولو أسامي الملفات عربي وطلعت رموز غريبة في Excel استخدم [[-Encoding utf8BOM]] في PowerShell 7 (أو [[-Encoding UTF8]] في 5.1)، ولو كل البيانات اتحطت في عمود واحد جرب [[-UseCulture]] عشان يستخدم الفاصل بتاع إعدادات ويندوز.`,
          solCode: R`Get-ChildItem -File |
    Select-Object Name, Length |
    Export-Csv files.csv -NoTypeInformation -Encoding utf8BOM
Get-Content files.csv
ii files.csv`
        }
      ]
    }
]);
