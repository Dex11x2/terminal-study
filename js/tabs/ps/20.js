// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "توصل للأمر بنفسك",
      l: 1,
      time: R`حوالي ساعتين`,
      goal: [
        R`تلاقي الأمر اللي بيعمل حاجة معينة من غير ما تفتح جوجل.`,
        R`تقرا سطر الاستخدام وتعرف إيه إجباري وإيه اختياري.`,
        R`تجرّب أي أمر خطير من غير ما ينفّذ، وتشوف هيعمل إيه الأول.`,
        R`تفك رسالة الخطأ وتعرف منها السطر الغلط بالظبط.`,
      ],
      use: {
        prog: R`نفس الدورة بتشتغل مع أي SDK أو CLI جديد: اعرف الفعل اللي انت عايزه، دوّر عليه، اقرا التوقيع، جرّبه على نسخة. الفرق بين واحد بيتعلم مكتبة في ساعة وواحد في أسبوع هو الدورة دي، مش الحفظ.`,
        net: R`على سيرفر بعيد مفيش متصفح ومفيش واجهة. [[Get-Command]] و [[-Syntax]] و [[Get-Help]] هما المرجع الوحيد اللي معاك، وبيشتغلوا من غير إنترنت.`,
        cs: R`أسماء الأوامر في PowerShell مبنية على فعل-اسم عشان تبقى متوقَّعة. دي نفس فكرة تصميم الـ API: الاسم المتوقَّع بيوفّر على المستخدم توثيق كامل.`,
      },
      lab: R`New-Item -ItemType Directory "$HOME\lab\ps-find" -Force
Set-Location "$HOME\lab\ps-find"`,
      projects: [
        { t: R`دليل الأوامر بتاعك`, what: R`سكربت بياخد كلمة (زي [[service]])، يجيب كل أمر فيها بـ [[Get-Command]]، ويطلّع ملف Markdown فيه لكل أمر: اسمه، وسطر الاستخدام من [[-Syntax]]، وأول سطر من [[Get-Help]]. مرجعك انت، ومن دروس ٢ و ٣ و ٦.` },
        { t: R`بوابة قبل التنفيذ`, what: R`دالة بتاخد اسم أمر و parameters، تشغّله بـ [[-WhatIf]] الأول وتطبع اللي هيحصل، وتسألك تكمّل ولا لأ. أول حاجة تحطها في [[$PROFILE]] بتاعك. من دروس ٤ و ٨.` },
      ],
      n: R`مش هتحفظ ٥٠٠ أمر. هتحفظ الدورة اللي بتوصلك لأي أمر: تترجم المهمة لفعل واسم، تصطاد الأمر، تقرا شكله، تجرّبه من غير ما ينفّذ، وتفهم الخطأ لو وقع`,
      items: [
        {
          cmd: "الطريقة: من مهمة لأمر",
          title: "عندك مهمة ومش عارف الأمر؟ دي الدورة",
          learn: R`الدورة اللي بتوصلك من «عايز أعمل كذا» لاسم أمر حقيقي، من غير جوجل.`,
          out: R`تعرف تبدأ البحث عن أي أمر صح من أول مرة.`,
          use: {
            prog: R`أول حاجة بتعملها في مكتبة جديدة هي نفس الدورة: إيه الفعل اللي انت عايزه، وإيه الاسم اللي المكتبة بتسميه بيه.`,
            cs: R`الـ discoverability صفة في تصميم الأنظمة: نظام كويس بيخليك تلاقي اللي محتاجه من جواه، مش من بره.`,
          },
          desc: R`أي مهمة في PowerShell بتتحل بنفس الخمس خطوات: ترجم المهمة لـ **فعل + اسم**، اصطاد الأمر بـ [[Get-Command]]، اقرا شكله بـ [[-Syntax]]، جرّبه بـ [[-WhatIf]]، وبصّ على الناتج. الدرس ده الدورة نفسها على مهمة حقيقية.

المهمة: «عايز أوقّف خدمة الطابعة». مفيش حاجة تحفظها هنا، فيه طريقة تمشي عليها.

**الخطوة ١ — المهمة بقت فعل واسم.** «أوقّف» فعل، و «خدمة» اسم. PowerShell كل أوامره بالشكل ده ([[Verb-Noun]])، والفعل من قايمة مقفولة تشوفها بـ [[Get-Verb]]. فعل الإيقاف المعتمد [[Stop]].

**الخطوة ٢ — اصطاد الأمر.** [[Get-Command -Noun Service]] بيطلّع كل الأوامر اللي بتشتغل على الخدمات. مش محتاج تعرف الاسم الكامل، محتاج تعرف نص الاسم.

**الخطوة ٣ — اقرا شكله.** [[Get-Command Stop-Service -Syntax]] بيطبع سطر الاستخدام: الـ parameters وأنواعها وإيه اللي إجباري.

**الخطوة ٤ — جرّب من غير ما تنفّذ.** [[-WhatIf]] بيطبع «كنت هعمل كذا» وميعملش. دي أهم عادة: تجرّب الأول على الحقيقي من غير خسارة.

**الخطوة ٥ — اتأكد.** بعد ما تنفّذ، شوف الحالة بنفسك ([[Get-Service]]) بدل ما تفترض إنه نجح.

والخطوة الزيادة لما تحتاج تطلّع تفاصيل من الناتج: [[Get-Member]] بيوريك الـ object راجع فيه إيه بالظبط (درس «Get-Member»).`,
          example: R`Get-Verb | Where-Object Verb -like 'St*'
Get-Command -Noun Service
Get-Command Stop-Service -Syntax
Stop-Service -Name Spooler -WhatIf
Get-Service -Name Spooler`,
          try: R`امشي بنفس الدورة على مهمة تانية: «عايز أقفل برنامج شغّال». الفعل إيه؟ والاسم إيه؟ اصطاد الأمر بـ [[Get-Command -Noun Process]]، واقرا [[-Syntax]] بتاعه، وجرّب بـ [[-WhatIf]] على [[notepad]].`,
          sol: R`الفعل [[Stop]] والاسم [[Process]]، فالأمر [[Stop-Process]].

~~~text الناتج (PowerShell 7.6)
PS> Get-Command -Noun Process

CommandType Name         Version   Source
----------- ----         -------   ------
Cmdlet      Debug-Process 7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Get-Process   7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Start-Process 7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Stop-Process  7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Wait-Process  7.0.0.0  Microsoft.PowerShell.Management
~~~

و [[Stop-Process -Name notepad -WhatIf]] هيطبع سطر «What if» لكل نسخة من notepad مفتوحة، ومش هيقفل حاجة. لو مفيش notepad مفتوح هيطلّع error [[NoProcessFoundForGivenName]]، وده رد صحيح كمان: معناه الأمر شغال والاسم مش موجود.`,
          deep: {
            why: R`الفرق بين حد بيستخدم الترمنال وحد بيخاف منه مش عدد الأوامر اللي حافظها. الفرق إن الأول عنده طريقة يوصل بيها لأي أمر في دقيقة، والتاني بيدوّر في جوجل على أمر جاهز وينسخه من غير ما يفهمه. الدورة دي هي الطريقة.`,
            how: R`الخطوات الخمسة بترد على خمس أسئلة بالترتيب:

1. **الأمر اسمه إيه غالبًا؟** [[Get-Verb]] بيدّيك قايمة الأفعال المعتمدة (حوالي ١٠٠ فعل). الاسم بعدها بيبقى مفرد دايمًا ([[Service]] مش [[Services]]).
2. **موجود ولا لأ؟** [[Get-Command -Noun Service]] أو [[Get-Command *service*]]. لو طلع فاضي يبقى الاسم غلط أو الموديول مش متحمّل.
3. **بياخد إيه؟** [[-Syntax]] بيطبع السطر بدل ما تقرا صفحة كاملة.
4. **هيعمل إيه لو شغّلته؟** [[-WhatIf]]. وده شغال على أي أمر بيغيّر حاجة، تعرفهم بـ [[Get-Command -ParameterName WhatIf]].
5. **نجح؟** شوف بنفسك. [[Get-Service]] بعد [[Stop-Service]]، و [[Test-Path]] بعد [[New-Item]].

وفي النص ده كله: [[Get-Help <الأمر> -Examples]] لو عايز مثال جاهز، و [[Get-Help <الأمر> -Online]] لو ملفات المساعدة مش متحمّلة على جهازك (درس «Get-Help»).`,
            when: "كل مرة تقع في مهمة جديدة. وبالذات قبل ما تنسخ أمر من النت: امشي بالدورة على الأمر اللي نسخته، وهتعرف هو بيعمل إيه قبل ما تدوس Enter.",
            mistakes: R`إنك تبدأ من جوجل بدل [[Get-Command]]. الأمر اللي هتلاقيه في النت ممكن يبقى لنسخة قديمة، أو لموديول مش متسطب عندك، أو لـ bash أصلًا.

وغلطة تانية: تنفّذ وتفترض إنه نجح. PowerShell مش دايمًا بيصرّخ لما حاجة متتعملش.`
          },
          teach: R`## الفكرة

مش هنتعلم أمر. هنتعلم إزاي نوصل لأي أمر. المهمة: **«أوقّف خدمة الطابعة»**. وهنمشي بخمس خطوات، كل واحدة بناتجها الحقيقي من PowerShell 7.6 على ويندوز 11.

---

## ١. [[Get-Verb | Where-Object Verb -like 'St*']]: الفعل اسمه إيه عندهم؟

| الحتة | معناها |
|---|---|
| [[Get-Verb]] | هات قايمة الأفعال المعتمدة في PowerShell |
| [[|]] | الـ pipe: وديها للي بعدها |
| [[Where-Object]] | فلتر: سيب اللي بيحقق الشرط بس |
| [[Verb]] | اسم العمود اللي هنفلتر بيه |
| [[-like]] | مقارنة بنجمة (wildcard) |
| [['St*']] | «أي حاجة بتبدأ بـ St» |

~~~powershell
Get-Verb | Where-Object Verb -like 'St*'
~~~

~~~text الناتج
Verb  Group     Description
----  -----     -----------
Step  Common    Moves to the next point or resource in a sequence
Start Lifecycle Initiates an operation
Stop  Lifecycle Discontinues an activity
~~~

### نقرا الناتج

- [[Stop]] وصفه [[Discontinues an activity]] (بيوقّف نشاط). ده فعلنا.
- [[Start]] عكسه، هيلزمنا لو عايزين نشغّلها تاني.
- [[Group]] تصنيف الفعل. [[Lifecycle]] يعني أفعال دورة حياة حاجة (ابدأ، وقّف، ريستارت، سطّب، شيل).

**ليه القايمة مقفولة أصلًا؟** عشان لو كل واحد سمّى أمره باللي يعجبه، مكنتش هتعرف تخمّن. دلوقتي انت عارف إن اللي بيوقّف أي حاجة اسمه [[Stop-]]، واللي بيجيب اسمه [[Get-]]، واللي بيمسح [[Remove-]].

> [[Get-Verb]] لوحده بيطبع الـ ١٠٠ فعل كلهم. الفلتر بس عشان الناتج يبقى قد الشاشة.

---

## ٢. [[Get-Command -Noun Service]]: الأمر موجود؟

[[-Noun]] يعني «الجزء اللي بعد الشرطة». إحنا عارفين إننا عايزين حاجة عن [[Service]]، مش عارفين الاسم الكامل.

~~~powershell
Get-Command -Noun Service
~~~

~~~text الناتج
CommandType Name            Source
----------- ----            ------
     Cmdlet Get-Service     Microsoft.PowerShell.Management
     Cmdlet New-Service     Microsoft.PowerShell.Management
     Cmdlet Remove-Service  Microsoft.PowerShell.Management
     Cmdlet Restart-Service Microsoft.PowerShell.Management
     Cmdlet Resume-Service  Microsoft.PowerShell.Management
     Cmdlet Set-Service     Microsoft.PowerShell.Management
     Cmdlet Start-Service   Microsoft.PowerShell.Management
     Cmdlet Stop-Service    Microsoft.PowerShell.Management
     Cmdlet Suspend-Service Microsoft.PowerShell.Management
~~~

### نقرا الناتج

- تسع أوامر، كلهم [[<فعل>-Service]]. [[Stop-Service]] هو بتاعنا.
- [[CommandType]] = [[Cmdlet]]: أمر مبني جوه PowerShell نفسه (مش برنامج .exe بره).
- [[Source]] = [[Microsoft.PowerShell.Management]]: اسم الموديول اللي جايبهم. ده مهم: لو أمر مش ظاهر عندك، غالبًا موديوله مش متسطب.

والمكسب التاني: شفت **كل اللي ممكن تعمله** بالخدمات في سطر واحد، مش بس اللي كنت بتدوّر عليه. [[Suspend-Service]] دي معرفتهاش قبل كده، ودلوقتي عارف إنها موجودة.

> لو منتش عارف الاسم بالظبط، النجمة بتشتغل: [[Get-Command *service*]] بيجيب أي أمر فيه الكلمة دي في أي مكان.

---

## ٣. [[Get-Command Stop-Service -Syntax]]: بياخد إيه؟

~~~powershell
Get-Command Stop-Service -Syntax
~~~

~~~text الناتج
Stop-Service [-InputObject] <ServiceController[]> [-Force] [-NoWait] [-PassThru] [-Include <string[]>] [-Exclude <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]

Stop-Service [-Name] <string[]> [-Force] [-NoWait] [-PassThru] [-Include <string[]>] [-Exclude <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]

Stop-Service -DisplayName <string[]> [-Force] [-NoWait] [-PassThru] [-Include <string[]>] [-Exclude <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]
~~~

### نقرا الناتج

تلات سطور، يعني **تلات طرق** مختلفة تنادي بيها نفس الأمر (اسمها parameter sets):

1. تديله الـ object نفسه ([[-InputObject]]) — ده اللي بيحصل لما تعمل [[Get-Service Spooler | Stop-Service]].
2. تديله الاسم ([[-Name]]).
3. تديله الاسم المعروض ([[-DisplayName]]).

وتختار واحدة منهم بس. والمهم اللي هنستخدمه: السطر التاني، [[-Name]].

ومنه كمان شفنا إن [[-WhatIf]] مدعومة. تفاصيل قراية السطر ده (الأقواس ومعانيها) في الدرس اللي بعده.

---

## ٤. [[Stop-Service -Name Spooler -WhatIf]]: جرّب من غير ما تنفّذ

[[Spooler]] اسم خدمة الطابعة في ويندوز (الاسم المعروض [[Print Spooler]]).

~~~powershell
Stop-Service -Name Spooler -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Stop-Service" on target "Print Spooler (Spooler)".
~~~

### نقرا الناتج

- [[What if:]] يعني «لو كنت شغّلتني من غير [[-WhatIf]]، كنت هعمل الآتي».
- [[Performing the operation "Stop-Service"]] العملية اللي كانت هتتعمل.
- [[on target "Print Spooler (Spooler)"]] على مين بالظبط. ودي أهم حتة: بتأكدلك إنك ظبطت الاسم صح وإنه لقى الخدمة.

**الخدمة لسه شغالة.** [[-WhatIf]] مبينفذش.

---

## ٥. [[Get-Service -Name Spooler]]: اتأكد بنفسك

~~~powershell
Get-Service -Name Spooler
~~~

~~~text الناتج
 Status Name    DisplayName
 ------ ----    -----------
Running Spooler Print Spooler
~~~

[[Running]] يعني لسه شغالة — وده المتوقع، لأن اللي قبله كان [[-WhatIf]]. لو كنت شغّلت الأمر من غير [[-WhatIf]] (ومعاك صلاحية أدمن) الحالة كانت هتبقى [[Stopped]].

ودي الخطوة اللي الناس بتنساها: **متفترضش، شوف**.

---

## الدورة في جدول

| الخطوة | السؤال | الأمر |
|---|---|---|
| ١ | الفعل اسمه إيه عندهم؟ | [[Get-Verb]] |
| ٢ | الأمر موجود؟ وإيه اللي حواليه؟ | [[Get-Command -Noun X]] |
| ٣ | بياخد إيه؟ | [[Get-Command X -Syntax]] |
| ٤ | هيعمل إيه؟ | [[X -WhatIf]] |
| ٥ | نجح؟ | [[Get-X]] تاني |

ولو احتجت مثال جاهز في النص: [[Get-Help X -Examples]]، ولو ملفات المساعدة مش متحمّلة: [[Get-Help X -Online]].

---

## الخلاصة

- الأمر في PowerShell = **فعل من قايمة معروفة** + **اسم مفرد**. ده اللي بيخليك تخمّن.
- [[Get-Command]] بيدوّر بالاسم أو بجزء منه أو بالفعل أو بالموديول. ابدأ منه مش من جوجل.
- [[-Syntax]] بيديك سطر الاستخدام من غير ما تقرا صفحة.
- [[-WhatIf]] بيخليك تجرّب على الحقيقي من غير خسارة. خليها عادة قبل أي أمر بيغيّر.
- بعد التنفيذ، اتأكد بأمر [[Get-]] بدل ما تفترض.`,
          lines: [
            R`[[Get-Verb]] بيرجّع لستة الأفعال المعتمدة اللي كل أوامر PowerShell بتبدأ بيها (Get و Set و Stop...). [[Where-Object Verb -like 'St*']] بيسيب اللي بيبدأ بـ St بس، فيطلع [[Step]] و [[Start]] و [[Stop]]، ومنهم عرفنا إن الفعل اللي يوقّف حاجة اسمه [[Stop]] مش End أو Kill.`,
            R`[[-Noun Service]] بيجيب كل الأوامر اللي الجزء التاني من اسمها [[Service]] (Get-Service و Start-Service و Stop-Service...). كده الفعل من السطر اللي فات والاسم من هنا بيدّوا الأمر الكامل [[Stop-Service]] من غير ما تكون حافظه.`,
            R`[[-Syntax]] بيطبع سطر الاستخدام بدل جدول المعلومات: كل parameter وقيمته من نوع إيه، وكل سطر طريقة استخدام (parameter set). لقينا فيه [[[-WhatIf]]] بين أقواس، يعني اختياري ومدعوم، فنقدر نجرّب بأمان قبل التنفيذ.`,
            R`[[-Name Spooler]] اسم الخدمة (خدمة الطباعة)، و [[-WhatIf]] بيخلي الأمر يطبع «What if: Performing the operation "Stop-Service" on target "Print Spooler (Spooler)"» من غير ما يوقّفها. دي أأمن طريقة تتأكد إن الأمر هيمسك الحاجة الصح، وكمان مش محتاجة أدمن عشان مفيش تنفيذ.`,
            R`[[Get-Service -Name Spooler]] بيعرض حالة الخدمة: [[Status]] لسه [[Running]]، وده بيثبت إن [[-WhatIf]] معملش حاجة فعلًا. خطوة التأكد دي عادة كويسة بعد أي أمر مش متأكد من تأثيره.`
          ]
        },

        {
          cmd: "Get-Command -Verb و -Noun",
          title: "اصطاد الأمر من نص اسمه",
          learn: R`تدوّر على أمر باسمه الناقص، أو بالفعل، أو بالحاجة اللي بيشتغل عليها.`,
          out: R`تلاقي الأمر وانت فاكر نصّه بس.`,
          use: {
            prog: R`زي ما بتدوّر في الـ autocomplete بتاع الـ IDE على اسم ميثود مش فاكره كامل.`,
            net: R`على سيرفر: [[Get-Command -Noun Service]] بتوريك كل اللي ممكن تعمله بخدمة من غير ما تفتح توثيق.`,
          },
          desc: R`[[Get-Command]] هو محرك البحث بتاع PowerShell جوه الترمنال. بتديله فعل أو اسم أو جزء من اسم، فيطلّعلك كل الأوامر اللي بتطابقه. ودي الطريقة اللي بتلاقي بيها أمر من غير ما تخرج من الترمنال.

[[-Verb Stop]] كل اللي بيوقّف أي حاجة، و [[-Noun Service]] كل اللي بيشتغل على الخدمات، والاتنين مع بعض بيحددوا أمر واحد. و [[*word*]] من غير أي parameter بيدوّر بالنجمة في اسم الأمر كله.

[[-Module <اسم>]] بيطلّع كل أوامر موديول معين، وده أسرع طريقة تعرف مكتبة جديدة سطّبتها بتقدّم إيه. و [[-CommandType Application]] بيطلّع البرامج اللي في الـ [[PATH]] (ملفات [[.exe]]) بدل أوامر PowerShell.

وأقوى واحدة فيهم: [[-ParameterName WhatIf]] بيطلّع كل الأوامر اللي بتدعم parameter معين. يعني تقدر تسأل «مين الأوامر اللي بتدعم [[-WhatIf]]؟» وتلاقي الرد.

وخد بالك: الاسم ([[Noun]]) في PowerShell **مفرد دايمًا**، [[Get-Service]] مش [[Get-Services]]، حتى وهو بيرجّع عشرين خدمة.`,
          example: R`Get-Command -Verb Restart -Noun Computer
Get-Command *shutdown*
Get-Command -Module Microsoft.PowerShell.Management
Get-Command -ParameterName WhatIf
Get-Command -CommandType Application`,
          try: R`دوّر على كل الأوامر اللي بتشتغل على الملفات بـ [[Get-Command -Noun Item]]، وبعدين عدّ كام أمر عندك في موديول [[Microsoft.PowerShell.Management]] بـ [[(Get-Command -Module Microsoft.PowerShell.Management).Count]].`,
          sol: R`~~~text الناتج (PowerShell 7.6)
PS> Get-Command -Noun Item

CommandType Name           Version  Source
----------- ----           -------  ------
Cmdlet      Clear-Item     7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Copy-Item      7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Get-Item       7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Invoke-Item    7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Move-Item      7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      New-Item       7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Remove-Item    7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Rename-Item    7.0.0.0  Microsoft.PowerShell.Management
Cmdlet      Set-Item       7.0.0.0  Microsoft.PowerShell.Management

PS> (Get-Command -Module Microsoft.PowerShell.Management).Count
61
~~~

الموديول الواحد ده فيه ٦١ أمر، وهو واحد من كذا موديول بييجوا مع PowerShell. ودي السبب إن الحفظ مش طريقة.`,
          deep: {
            why: R`عشان تبطّل تسأل «إيه الأمر اللي بيعمل كذا؟». الرد موجود جوه الترمنال اللي قدامك، وبيجاوب في أقل من ثانية، وبيجاوب بالنسبة اللي متسطبة عندك انت مش اللي في الـ docs.`,
            how: R`[[Get-Command]] بيدور في كل الموديولات اللي في [[$env:PSModulePath]]، مش بس اللي محمّلة في الجلسة. فلو سطّبت موديول جديد وملقتوش، اقفل الترمنال وافتحه.

الفرق بين الطرق:

| تكتب | بيجيب |
|---|---|
| [[Get-Command Stop-Service]] | الأمر ده بالظبط |
| [[Get-Command *service*]] | أي أمر اسمه فيه service |
| [[Get-Command -Verb Stop]] | كل اللي بيوقّف |
| [[Get-Command -Noun Service]] | كل اللي على الخدمات |
| [[Get-Command -Module X]] | كل أوامر الموديول ده |
| [[Get-Command -CommandType Application]] | برامج .exe في الـ PATH |
| [[Get-Command -ParameterName WhatIf]] | كل أمر بيدعم -WhatIf |

و [[-CommandType]] قيمه: [[Cmdlet]] (أمر مبني في PowerShell)، و [[Function]] (دالة متعرّفة بـ PowerShell نفسه)، و [[Alias]] (اختصار)، و [[Application]] (برنامج خارجي)، و [[Script]] و [[ExternalScript]].

ولو عايز تشوف الأمر نفسه مكتوب إزاي (للـ [[Function]] بس): [[(Get-Command <الاسم>).Definition]] بيطبع الكود.`,
            when: "أول حاجة تعملها في أي مهمة جديدة. وكمان بعد ما تسطّب موديول جديد، عشان تعرف جابلك إيه.",
            mistakes: R`تكتب الاسم بالجمع ([[Get-Command -Noun Services]]) وميطلعش حاجة فتفتكر إنه مش موجود. الاسم مفرد دايمًا.

وغلطة تانية: [[Get-Command -ParameterName WhatIf]] بيطلّع عندي ٨٣ أمر، ودي الأوامر المحمّلة في الجلسة دلوقتي بس، مش كل الموجود على الجهاز.`
          },
          teach: R`## الفكرة

[[Get-Command]] بيرد على سؤال «فيه أمر بيعمل كذا؟». هنمشي على خمس طرق مختلفة تسأله بيهم، وكل واحدة بناتجها الحقيقي (PowerShell 7.6 على ويندوز 11).

---

## ١. [[Get-Command -Verb Restart -Noun Computer]]: الفعل والاسم مع بعض

~~~powershell
Get-Command -Verb Restart -Noun Computer
~~~

~~~text الناتج
CommandType Name             Version Source
----------- ----             ------- ------
     Cmdlet Restart-Computer 7.0.0.0 Microsoft.PowerShell.Management
~~~

لما تدّي الاتنين، الناتج بيبقى أمر واحد غالبًا. ودي الطريقة لما تبقى متأكد من الفكرة ومش فاكر الإملاء.

| الحتة | معناها |
|---|---|
| [[-Verb Restart]] | الفعل: «اعمل ريستارت» |
| [[-Noun Computer]] | على إيه: الجهاز |
| [[Version 7.0.0.0]] | نسخة الموديول اللي الأمر جاي منه |
| [[Source]] | الموديول نفسه |

---

## ٢. [[Get-Command *shutdown*]]: دوّر بالنجمة

النجمة ([[*]]) معناها «أي حاجة». [[*shutdown*]] = «أي اسم فيه كلمة shutdown في أي مكان».

~~~powershell
Get-Command *shutdown*
~~~

~~~text الناتج
CommandType Name                Source
----------- ----                ------
Application shutdown.exe        C:\WINDOWS\system32\shutdown.exe
Application SlideToShutDown.exe C:\WINDOWS\system32\SlideToShutDown.exe
~~~

### نقرا الناتج

- [[CommandType]] = [[Application]] مش [[Cmdlet]]. يعني دول **برامج ويندوز عادية** مش أوامر PowerShell.
- عشان كده [[Source]] هنا **مسار الملف** مش اسم موديول.
- ومعلومة مهمة اتعلمناها من غير ما نقصد: مفيش cmdlet اسمه [[Stop-Shutdown]] ولا حاجة. اللي بيقفل الجهاز في PowerShell اسمه [[Stop-Computer]] (الاسم [[Computer]] مش [[Shutdown]]) — والبرنامج القديم [[shutdown.exe]] لسه موجود ومعاه مميزات مش في الـ cmdlet (زي المعاد).

---

## ٣. [[Get-Command -Module Microsoft.PowerShell.Management]]: موديول كامل

~~~powershell
(Get-Command -Module Microsoft.PowerShell.Management).Count
~~~

~~~text الناتج
61
~~~

الأقواس [[( )]] عشان ناخد ناتج الأمر الأول وبعدين نقرا [[.Count]] منه (عدد العناصر).

من غير [[.Count]] الأمر بيطبع الـ ٦١ أمر كلهم. ودي أحسن حاجة تعملها لما تسطّب موديول جديد: تشوف جابلك إيه بالظبط بدل ما تقرا صفحة الـ README.

---

## ٤. [[Get-Command -ParameterName WhatIf]]: مين بيدعم الـ parameter ده؟

~~~powershell
(Get-Command -ParameterName WhatIf).Count
Get-Command -ParameterName WhatIf | Select-Object -First 8 -ExpandProperty Name
~~~

~~~text الناتج
83
mkdir
Add-Content
Clear-Content
Clear-History
Clear-Item
Clear-ItemProperty
Clear-RecycleBin
Clear-Variable
~~~

### نقرا الناتج

- [[83]] أمر في الجلسة دي بيدعم [[-WhatIf]]. يعني ٨٣ حاجة تقدر تجرّبها قبل ما تنفّذها.
- [[Select-Object -First 8]] ياخد أول ٨ بس، و [[-ExpandProperty Name]] يطبع الاسم كنص بدل الجدول.
- لاحظ [[mkdir]] في القايمة: دي مش cmdlet، دي [[Function]] معمولة في PowerShell بتنادي [[New-Item]]، وعشان كده ورثت منه [[-WhatIf]].

ودي قلب الفكرة: مش بتسأل «الأمر ده بياخد إيه؟» بس، تقدر تسأل العكس — **«مين الأوامر اللي بتاخد الحاجة دي؟»**.

---

## ٥. [[Get-Command -CommandType Application]]: البرامج اللي في الـ PATH

~~~powershell
(Get-Command -CommandType Application).Count
~~~

~~~text الناتج (بيختلف من جهاز لجهاز)
1083
~~~

دي كل البرامج التنفيذية اللي ويندوز يقدر يلاقيها من غير ما تكتب مسارها كامل (اللي في متغير [[PATH]]). الرقم عندك هيبقى مختلف حسب اللي متسطب.

ولو عايز واحد بعينه: [[Get-Command git]] بيقولك [[git.exe]] موجود فين بالظبط (ده درس «Get-Command (which)»).

---

## الفرق بين [[Cmdlet]] و [[Function]] و [[Alias]] و [[Application]]

| النوع | يعني إيه | مثال |
|---|---|---|
| [[Cmdlet]] | أمر مبني جوه PowerShell بـ C# | [[Get-Service]] |
| [[Function]] | أمر متكتب بـ PowerShell نفسه | [[mkdir]] |
| [[Alias]] | اختصار لأمر تاني | [[ls]] |
| [[Application]] | برنامج [[.exe]] بره PowerShell | [[git.exe]] |

الفرق ده مهم في حاجة واحدة بالذات: الـ [[Application]] بيرجّع **نص** و **exit code**، والـ [[Cmdlet]] بيرجّع **objects**. وده بيغيّر إزاي تتعامل مع ناتجه (درس «$? و $LASTEXITCODE»).

---

## الخلاصة

- [[Get-Command]] بيدوّر بالفعل، أو بالاسم، أو بجزء من الاسم بالنجمة، أو بالموديول، أو بالنوع، أو حتى بالـ parameter.
- الاسم ([[Noun]]) مفرد دايمًا.
- [[-Module]] أسرع طريقة تعرف موديول جديد بيقدّم إيه.
- [[-ParameterName]] بيقلب السؤال: مش «الأمر بياخد إيه» لكن «مين بياخد ده».
- [[Application]] معناه برنامج خارجي، و [[Source]] ساعتها بيبقى مسار الملف.`,
          lines: [
            R`[[-Verb Restart]] و [[-Noun Computer]] مع بعض بيحددوا الأمر بالجزئين: الفعل والاسم، فيطلع [[Restart-Computer]] بس ومعاه اسم الموديول اللي جاي منه. مفيد لما تبقى عارف عايز تعمل إيه وعلى إيه بس مش فاكر الاسم مكتوب إزاي بالظبط.`,
            R`النجوم wildcard يعني «أي حروف قبل وبعد»، فبيدوّر على أي اسم فيه shutdown في أي حتة: cmdlets و functions و aliases وبرامج خارجية زي [[shutdown.exe]]. وعمود [[CommandType]] بيقولك ده إيه، فتعرف إن [[shutdown.exe]] برنامج ويندوز مش أمر PowerShell.`,
            R`[[-Module]] بيجيب كل الأوامر اللي جوه موديول واحد بالاسم. [[Microsoft.PowerShell.Management]] الموديول اللي فيه أوامر الملفات والعمليات والخدمات، فده زي فهرس: لما تسطّب موديول جديد، الأمر ده بيوريك كل اللي يقدر يعمله.`,
            R`[[-ParameterName WhatIf]] بيقلب البحث: بدل ما تسأل «الأمر ده بيدعم إيه»، بتسأل «مين الأوامر اللي عندها parameter اسمه WhatIf». الناتج هو الأوامر اللي تقدر تعاينها قبل ما تنفّذها، وغالبًا هي اللي بتغيّر حاجة.`,
            R`[[-CommandType Application]] بيجيب البرامج الخارجية بس (.exe و .cmd وغيرهم) اللي موجودة في الفولدرات اللي في متغير [[PATH]]. لو برنامج سطّبته ومش ظاهر هنا، يبقى فولدره مش في الـ PATH وده سبب إن الترمنال مش لاقيه.`
          ]
        },

        {
          cmd: "Get-Command -Syntax",
          title: "اقرا سطر الاستخدام: الأقواس معناها إيه",
          learn: R`تقرا سطر الاستخدام: إيه إجباري، إيه اختياري، وإيه اللي بياخد قايمة.`,
          out: R`تستخدم أمر جديد صح من غير ما تجرّب وتغلط.`,
          use: {
            prog: R`ده نفس قراية توقيع دالة في التوثيق: الأقواس المربعة = اختياري، والنجمة = بيتكرر.`,
            cs: R`التوقيع هو العقد بين اللي بيكتب والـ اللي بيستخدم. تقراه صح يبقى ملكش حجة.`,
          },
          desc: R`[[-Syntax]] بيطبع سطر الاستخدام بتاع الأمر بدل صفحة المساعدة كلها. ولو عرفت تقرا الأقواس فيه، هتعرف تستخدم أي أمر من غير ما تقرا عنه حاجة تانية.

القاعدة كلها أربع علامات:
[[[ ]]] حوالين حاجة = **اختيارية**. [[[-Force]]] يعني ممكن تحطها وممكن لأ.
[[< >]] = **نوع القيمة** اللي الـ parameter بياخدها. [[<string>]] نص، [[<int>]] رقم، [[<string[]>]] قايمة نصوص.
[[[ ]]] جوه النوع = **قايمة**. [[<string[]>]] يعني ممكن تديله أكتر من قيمة بفاصلة.
[[{ }]] = **قيم محددة** مسموح بيها بس، مفصولة بـ [[|]].

وفيه حالة واحدة بتلخبط: [[[-Name] <string[]>]]، الاسم نفسه بين أقواس مربعة والنوع بعده من غير أقواس. ده معناه إن الـ parameter **إجباري** بس **اسمه** اختياري، يعني تقدر تكتب القيمة على طول من غير ما تكتب [[-Name]] (اسمها positional).

ولو الأمر طبع أكتر من سطر، ده معناه إن ليه أكتر من طريقة استعمال (parameter sets)، وانت تختار واحدة منهم مش تخلط.

و [[[<CommonParameters>]]] في آخر كل سطر هي الـ parameters اللي كل أمر بياخدها: [[-Verbose]] و [[-ErrorAction]] و [[-ErrorVariable]] وغيرهم.`,
          example: R`Get-Command Get-ChildItem -Syntax
Get-Command Stop-Service -Syntax
(Get-Command Get-Process).ParameterSets | Select-Object Name, IsDefault
Get-ChildItem C:\Windows -Filter *.ini
Get-ChildItem -Path C:\Windows -Filter *.ini`,
          try: R`اطبع [[Get-Command New-Item -Syntax]]، وجاوب من السطر: إيه الـ parameter الإجباري؟ وإيه القيم المسموحة لـ [[-ItemType]]؟`,
          sol: R`~~~text الناتج (PowerShell 7.6)
PS> Get-Command New-Item -Syntax

New-Item [-Path] <string[]> [-ItemType <string>] [-Value <Object>] [-Force] [-Credential <pscredential>] [-WhatIf] [-Confirm] [<CommonParameters>]

New-Item [[-Path] <string[]>] -Name <string> [-ItemType <string>] [-Value <Object>] [-Force] [-Credential <pscredential>] [-WhatIf] [-Confirm] [<CommonParameters>]
~~~

- في السطر الأول [[[-Path] <string[]>]]: الـ parameter **إجباري** (مفيش أقواس حوالين الحتة كلها)، بس اسمه اختياري، فـ [[New-Item x.txt]] شغالة.
- [[-ItemType <string>]] نوعها [[<string>]] مش [[{ }]]، يعني السطر مش بيقولك القيم المسموحة. دي حالة لازم تروح فيها للمساعدة: [[Get-Help New-Item -Online]]. القيم المشهورة [[File]] و [[Directory]] و [[SymbolicLink]] و [[Junction]] و [[HardLink]].

**الدرس المستفاد:** [[-Syntax]] بيقولك الشكل والأنواع، مش بيقولك القيم إلا لو كانت [[{ }]]. ساعتها كمّل بـ [[-Online]].`,
          deep: {
            why: R`صفحة المساعدة الكاملة ممكن تبقى ٣٠٠ سطر. سطر الـ Syntax بيدّيك ٩٠٪ من اللي محتاجه في سطر واحد: إيه الإجباري، إيه الاختياري، كل حاجة نوعها إيه، وإيه الطرق المختلفة للنداء.`,
            how: R`اقرا السطر من الشمال:

~~~text
Get-ChildItem [[-Path] <string[]>] [[-Filter] <string>] [-Recurse] [-Depth <uint>] ...
~~~

- [[[-Path] <string[]>]]: قوسين مربعين برّانيين = الحتة كلها **اختيارية**. وقوسين جوّانيين على الاسم = الاسم نفسه اختياري كمان. يعني الاتنين شغالين: [[Get-ChildItem C:\]] و [[Get-ChildItem -Path C:\]].
- [[[-Recurse]]]: من غير [[< >]] بعدها، يعني دي **switch**: موجودة أو لأ، مش بتاخد قيمة.
- [[[-Depth <uint>]]]: اختيارية، وبتاخد رقم صحيح موجب ([[uint]] = unsigned integer).
- [[-DisplayName <string[]>]] من غير أقواس خالص = **إجبارية** في الطريقة دي.

والترتيب مهم في الـ positional بس. [[Get-ChildItem C:\Windows *.ini]] شغالة لأن [[-Path]] أول positional و [[-Filter]] تانيهم.

ولو عايز تعرف كل parameter بالتفصيل: [[Get-Help <الأمر> -Parameter Recurse]] بيشرح واحد بس، و [[Get-Help <الأمر> -Full]] بيشرح الكل.

وفي الكود المكتوب (مش في الترمنال) **اكتب أسامي الـ parameters دايمًا**، حتى الـ positional. [[Copy-Item -Path a -Destination b]] واضحة، و [[Copy-Item a b]] محتاجة اللي بعدك يفتح المساعدة.`,
            when: "أول ما تشوف أمر جديد. وقبل ما تكتبه في سكربت، عشان تعرف الإجباري من الاختياري.",
            mistakes: R`تخلط parameter sets. لو كتبت [[Stop-Service -Name Spooler -DisplayName "Print Spooler"]] هتاخد error [[AmbiguousParameterSet]]، لأن الاتنين من سطرين مختلفين.

وغلطة تانية: تفتكر إن [[<string[]>]] معناها قايمة إجبارية. لأ، الأقواس المربعة جوه النوع معناها «**يقبل** أكتر من واحد»، وقيمة واحدة برضه شغالة.`
          },
          teach: R`## الفكرة

سطر الـ Syntax لغة ليها أربع علامات بس. لما تحفظ الأربعة، أي أمر في PowerShell بقى مقروء. هنفك سطرين حقيقيين.

---

## ١. [[Get-Command Get-ChildItem -Syntax]]

~~~powershell
Get-Command Get-ChildItem -Syntax
~~~

~~~text الناتج (اتقص للوضوح)
Get-ChildItem [[-Path] <string[]>] [[-Filter] <string>] [-Include <string[]>]
  [-Exclude <string[]>] [-Recurse] [-Depth <uint>] [-Force] [-Name]
  [-Attributes {None | ReadOnly | Hidden | System | Directory | Archive | ...}]
  [-FollowSymlink] [-Directory] [-File] [-Hidden] [-ReadOnly] [-System]
  [<CommonParameters>]
~~~

### العلامات الأربعة

~~~text خريطة
[ ]              اختياري
< >              نوع القيمة
<string[]>       الأقواس جوه النوع = يقبل أكتر من قيمة بفاصلة
{ a | b | c }    القيم المسموحة بس، واختار واحدة
~~~

### نفكها حتة حتة

**[[[-Path] <string[]>]]**

قوسين جوه قوسين، وكل واحد معناه حاجة:

| القوس | اللي جواه | معناه |
|---|---|---|
| البرّاني | [[[-Path] <string[]>]] كلها | الـ parameter **اختياري**، ممكن متكتبهوش خالص |
| الجوّاني | [[-Path]] الاسم بس | **الاسم** اختياري، تقدر تكتب القيمة على طول |

فالتلاتة دول شغالين:

~~~powershell
Get-ChildItem
Get-ChildItem C:\Windows
Get-ChildItem -Path C:\Windows
~~~

و [[<string[]>]]: نص، والأقواس المربعة معناها **ممكن تديله قايمة**:

~~~powershell
Get-ChildItem -Path C:\Windows, C:\Users
~~~

**[[[-Recurse]]]**

مفيش [[< >]] بعدها. يعني **switch**: مش بتاخد قيمة، موجودة يعني «أيوه».

~~~powershell
Get-ChildItem -Recurse
~~~

**[[[-Depth <uint>]]]**

بتاخد رقم، ونوعه [[uint]] يعني رقم صحيح **موجب** (unsigned integer). لو كتبت [[-Depth -1]] هياخد error.

**[[[-Attributes {None | ReadOnly | Hidden | ...}]]]**

الأقواس المعقوفة [[{ }]] معناها **دي القيم المسموحة وبس**، والـ [[|]] بينهم معناه «أو». فـ [[-Attributes Hidden]] شغالة و [[-Attributes Invisible]] هتاخد error.

> والحتة الحلوة: الـ [[{ }]] دي بالظبط هي اللي بتخلي زرار Tab يعرف يكمّلك القيم.

**[[[<CommonParameters>]]]**

اختصار بيتكتب في آخر كل أمر. معناه إنه بياخد كمان الـ parameters العامة: [[-Verbose]] و [[-Debug]] و [[-ErrorAction]] و [[-ErrorVariable]] و [[-WarningAction]] و [[-OutVariable]] وغيرهم. مش بتتكتب كلها عشان ميبقاش كل سطر بطول الصفحة.

---

## ٢. [[Get-Command Stop-Service -Syntax]]: تلات سطور يعني تلات طرق

~~~text الناتج
Stop-Service [-InputObject] <ServiceController[]> [-Force] [-NoWait] ...

Stop-Service [-Name] <string[]> [-Force] [-NoWait] ...

Stop-Service -DisplayName <string[]> [-Force] [-NoWait] ...
~~~

كل سطر **parameter set**: طريقة كاملة ومستقلة لنداء الأمر. وانت تختار واحدة، متخلطش.

| السطر | الـ parameter الأساسي | إجباري؟ | تستخدمه امتى |
|---|---|---|---|
| ١ | [[-InputObject <ServiceController[]>]] | أيوه | لما ييجي من pipeline |
| ٢ | [[-Name <string[]>]] | أيوه | لما تعرف الاسم القصير |
| ٣ | [[-DisplayName <string[]>]] | أيوه | لما تعرف الاسم المعروض |

لاحظ الفرق في السطر التالت: [[-DisplayName]] **مش** بين أقواس مربعة، يعني لازم تكتب اسمها. أما [[[-Name]]] فاسمها اختياري، عشان كده [[Stop-Service Spooler]] شغالة.

**لو خلطت:**

~~~powershell
Stop-Service -Name Spooler -DisplayName "Print Spooler"
~~~

~~~text الناتج (من الـ docs: Parameter set cannot be resolved)
Stop-Service: Parameter set cannot be resolved using the specified named parameters.
~~~

---

## ٣. تشوف الـ parameter sets بأساميها

~~~powershell
(Get-Command Get-Process).ParameterSets | Select-Object Name, IsDefault
~~~

~~~text الناتج
Name                    IsDefault
----                    ---------
Name                         True
NameWithUserName            False
Id                          False
IdWithUserName              False
InputObject                 False
IdWithUserName              False
~~~

- ستة أطقم. [[IsDefault = True]] على [[Name]] معناه: لو كتبت [[Get-Process]] من غير أي parameter، هو بيستخدم الطقم ده.
- [[NameWithUserName]] طقم زيادة بيضيف عمود اليوزر، وده بيحتاج صلاحيات أعلى.

---

## ٤. الـ positional: ليه ده شغال؟

~~~powershell
Get-ChildItem C:\Windows -Filter *.ini
Get-ChildItem -Path C:\Windows -Filter *.ini
~~~

الاتنين بيعملوا نفس الحاجة بالظبط. الأول بيعتمد على إن [[-Path]] هو الـ parameter رقم ٠ (أول positional)، فـ PowerShell فهم إن [[C:\Windows]] دي قيمته.

~~~text الناتج (الاتنين)
    Directory: C:\Windows

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---            5/8/2021  9:14 AM            111 system.ini
-a---            5/8/2021  9:14 AM             92 win.ini
~~~

**القاعدة:** في الترمنال اكتب اللي يريّحك. في السكربت اكتب أسامي الـ parameters كاملة. السكربت بيتقرا أكتر ما بيتكتب.

---

## الخلاصة

| العلامة | معناها |
|---|---|
| [[[-X]]] | اختياري: تقدر تكتبه أو تسيبه خالص والأمر يشتغل |
| [[-X]] من غير أقواس | إجباري: لو مكتبتوش الأمر هيسألك عليه أو يرفض يشتغل |
| [[[-X] <type>]] | إجباري، بس اسمه ممكن يتساب (positional) |
| [[<string>]] | نوع القيمة اللي بتتكتب بعد الـ parameter، هنا نص |
| [[<string[]>]] | يقبل قايمة بفاصلة |
| [[-X]] من غير [[< >]] | switch: موجودة أو لأ |
| قيم جوه [[{ }]] بينها خط رأسي | القيم المسموحة بس، اختار واحدة منهم؛ أي قيمة تانية الأمر يرفضها |
| أكتر من سطر | أكتر من طريقة نداء، اختار واحدة |
| [[[<CommonParameters>]]] | parameters موجودة في كل الأوامر، زي [[-Verbose]] و [[-ErrorAction]] و [[-WarningAction]] |`,
          lines: [
            R`[[-Syntax]] على [[Get-ChildItem]] بيطبع سطرين (طريقة بـ [[-Path]] وطريقة بـ [[-LiteralPath]])، وفيهم كل أشكال الأقواس: [[-Path]] جاي جوه قوسين مربعين جوه قوسين تانيين، يعني الـ parameter كله اختياري واسمه نفسه ممكن يتشال، و [[-Recurse]] بين قوسين لوحده ومن غير نوع يعني switch اختياري، و [[<string>]] نوع القيمة، والقوسين الفاضيين بعد النوع (string[]) معناهم إنك تقدر تبعت أكتر من قيمة بالفاصلة.`,
            R`[[Stop-Service]] بيطبع 3 سطور: كل سطر parameter set، يعني طريقة مستقلة تحدد بيها الخدمة: بـ [[-InputObject]] (object خدمة من الـ pipe)، أو [[-Name]]، أو [[-DisplayName]]. تختار طريقة واحدة؛ لو كتبت [[-Name]] و [[-DisplayName]] مع بعض PowerShell هيرفض لأنه مش عارف تقصد انهي سطر.`,
            R`[[(Get-Command Get-Process)]] بين قوسين بيرجّع object الأمر، و [[.ParameterSets]] كل الأطقم بتاعته. [[Name]] اسم كل طقم، و [[IsDefault]] بيقولك انهي واحد PowerShell بيختاره لما متحددش (هنا [[Name]])، فـ [[Get-Process]] لوحده بيشتغل بالطقم ده ويجيب كل العمليات.`,
            R`positional: [[C:\Windows]] من غير اسم parameter راحت لـ [[-Path]] لأنه أول parameter بالترتيب في سطر الاستخدام (الأقواس حوالين [[-Path]] بس كانت معناها إن الاسم مش لازم). و [[-Filter *.ini]] بيسيب الملفات اللي آخرها .ini.`,
            R`نفس الأمر بالظبط بالاسم الصريح [[-Path]]. في السكربتات اكتب الأسامي دايمًا: اللي بيقرا بعدك يفهم من غير ما يحفظ الترتيب، ولو الأمر اتغيّر في نسخة جديدة الكود مش هيتلخبط.`
          ]
        },

        {
          cmd: "-WhatIf و -Confirm",
          title: "شوف الأمر هيعمل إيه قبل ما يعمله",
          learn: R`تشغّل أي أمر خطير في وضع المعاينة: بيقولك هيعمل إيه من غير ما يعمله.`,
          out: R`تجرّب أوامر المسح والقفل على بياناتك من غير خوف.`,
          use: {
            prog: R`ده الـ dry run: [[terraform plan]] و [[git clean -n]] و [[rsync --dry-run]] نفس الفكرة بالظبط.`,
            net: R`على سيرفر إنتاج، الـ dry run هو الفرق بين تغيير وبين حادثة.`,
            work: R`خلّيها عادة: أي أمر بيمسح أو بيغيّر حاجة، شغّله بالمعاينة مرة الأول.`,
          },
          desc: R`[[-WhatIf]] بيخلي الأمر يطبع «كنت هعمل كذا على كذا» من غير ما ينفّذ حاجة. و [[-Confirm]] بيوقف ويسألك على كل عنصر قبل ما يلمسه. الاتنين دول اللي بيخلّوك تجرّب أوامر خطيرة على بياناتك الحقيقية من غير خوف.

[[-WhatIf]] موجودة في أي أمر بيغيّر حاجة (بيمسح، بينقل، بيكتب، بيوقّف). تعرف مين بيدعمها بـ [[Get-Command -ParameterName WhatIf]] — عندي طلعوا ٨٣ أمر.

الناتج بيبقى سطر زي: [[What if: Performing the operation "Remove File" on target "C:\...\a.txt"]]. وكل حتة فيه مهمة: اسم العملية، و **على مين بالظبط**. السطر ده هو اللي بيكشف إن الفلتر بتاعك واخد ملفات مكنتش قاصدها.

و [[-Confirm]] بيطلّع سؤال فيه خمس اختيارات: [[Y]] أيوه للعنصر ده، و [[A]] أيوه للكل، و [[N]] لأ للعنصر ده، و [[L]] لأ للكل، و [[S]] وقّف وادخل جلسة فرعية أبص فيها وارجع.

وتقدر تخلي [[-WhatIf]] الافتراضي في الجلسة كلها بـ [[$WhatIfPreference = $true]]، وساعتها لو عايز تنفّذ بجد تكتب [[-WhatIf:$false]].

وفي سكربتاتك انت: [[[CmdletBinding(SupportsShouldProcess)]]] فوق [[param()]] بيدّي سكربتك نفس الـ parameters دي (درس «[CmdletBinding()]»).`,
          example: R`Remove-Item *.txt -WhatIf
Stop-Service -Name Spooler -WhatIf
Restart-Computer -WhatIf
$WhatIfPreference = $true
$WhatIfPreference = $false`,
          flag: "danger",
          try: R`اعمل فولدر تجربة وحط فيه ملفات، وجرّب [[Get-ChildItem -Recurse | Remove-Item -WhatIf]] وعدّ كام سطر «What if» طلع. بعدين غيّر الفلتر لـ [[-Filter *.log]] وشوف الفرق.`,
          sol: R`~~~text الناتج (PowerShell 7.6، فولدر فيه a.txt و b.txt و old.log)
PS> Remove-Item *.txt -WhatIf
What if: Performing the operation "Remove File" on target "C:\...\lab\a.txt".
What if: Performing the operation "Remove File" on target "C:\...\lab\b.txt".

PS> Get-ChildItem
a.txt
b.txt
old.log
~~~

سطرين «What if» بس، لأن [[*.txt]] مطابقتش [[old.log]]. والتلات ملفات لسه موجودين بعد الأمر.

**ودي الفايدة بالظبط:** لو كنت كتبت [[*]] بالغلط، كنت هتشوف تلات سطور بدل اتنين، وتعرف إنك غلطان **قبل** ما تمسح.`,
          deep: {
            why: R`في الترمنال مفيش «undo» ولا سلة مهملات (الافتراضي). [[Remove-Item]] غلط على فولدر غلط = البيانات راحت. [[-WhatIf]] بيكلفك ثانية واحدة وبيوفّر عليك ده.

والأهم: هو مش بيحميك من الأمر، هو بيحميك من **الفلتر**. أغلب الكوارث مش من أمر غلط، من [[*]] أو [[-Recurse]] واخدة أكتر من المقصود.`,
            how: R`الفكرة ورا [[-WhatIf]] اسمها [[ShouldProcess]]. أي أمر بيغيّر حاجة بيسأل جواه: «أنا مسموحلي أعمل العملية دي على الهدف ده؟». والرد بيتحدد من:

| الحالة | بيحصل إيه |
|---|---|
| عادي | بينفّذ |
| [[-WhatIf]] | بيطبع السطر ومبينفذش |
| [[-Confirm]] | بيسأل ويستنى ردك |
| [[$WhatIfPreference = $true]] | كل الأوامر في الجلسة بقت [[-WhatIf]] |
| [[-WhatIf:$false]] | نفّذ بجد حتى لو الـ preference متفعّل |

و [[-Confirm]] ليه أخ اسمه [[$ConfirmPreference]]، وده بياخد [[High]] (الافتراضي) أو [[Medium]] أو [[Low]] أو [[None]]. كل أمر عنده «خطورة» متسجّلة، ولو خطورته أعلى من الـ preference بيسأل لوحده من غير ما تكتب [[-Confirm]]. عشان كده [[Remove-Item]] على فولدر فيه حاجة بيسألك لوحده.

**الفرق بين [[-WhatIf]] و [[-Confirm]]:**

- [[-WhatIf]] للتجربة: شوف الليستة كلها الأول.
- [[-Confirm]] للتنفيذ الحذر: امشي عنصر عنصر.
- والمزيج العملي: [[-WhatIf]] الأول، تراجع الليستة، وبعدين شيلها وشغّل.

**حاجة مهمة:** [[-WhatIf]] مش ضمان كامل. هو بيشتغل على الأوامر اللي داعماه بس. لو السكربت بتاعك فيه [[[System.IO.File]::Delete()]] أو بينادي [[.exe]] خارجي، [[-WhatIf]] مش هيوقّفهم.`,
            when: "قبل أي [[Remove-]] أو [[Move-]] أو [[Set-]] أو [[Stop-]] على حاجة مش لعب. وبالذات لو فيه [[*]] أو [[-Recurse]] أو متغير في المسار.",
            mistakes: R`تحط [[-WhatIf]] في نص الـ pipeline بدل آخره. [[Get-ChildItem -WhatIf | Remove-Item]] ملهاش معنى: [[Get-ChildItem]] مبيغيّرش حاجة أصلًا، والمسح هيتم. الصح [[Get-ChildItem | Remove-Item -WhatIf]].

وتفتكر إن [[-WhatIf]] بتحمي من كل حاجة. أوامر زي [[Format-Volume]] و [[Clear-Disk]] بتدعمها، بس لو ناديت برنامج خارجي زي [[diskpart]] مفيش حماية.

وتسيب [[$WhatIfPreference = $true]] متفعّل وتنسى، وبعدين تقعد تستغرب ليه الأوامر مش بتعمل حاجة.`
          },
          teach: R`## الفكرة

[[-WhatIf]] بيحوّل أي أمر خطير لـ «معاينة». هنشوفه على ملفات، وعلى خدمة، وعلى أخطر أمر في الجهاز كله: قفل الجهاز.

كل الناتج اللي تحت من تشغيل حقيقي على PowerShell 7.6 / ويندوز 11، **ومحصلش أي تغيير**.

---

## ١. [[Remove-Item *.txt -WhatIf]]: على الملفات

الفولدر فيه تلات ملفات: [[a.txt]] و [[b.txt]] و [[old.log]].

~~~powershell
Remove-Item *.txt -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Remove File" on target "C:\...\lab\a.txt".
What if: Performing the operation "Remove File" on target "C:\...\lab\b.txt".
~~~

### نفك السطر

| الحتة | معناها |
|---|---|
| [[What if:]] | «لو كنت نفّذت، كان هيحصل الآتي» |
| [[Performing the operation "Remove File"]] | العملية: مسح ملف |
| [[on target "C:\...\lab\a.txt"]] | على الملف ده بالظبط، بالمسار الكامل |

**والحتة المهمة هي [[on target]].** هي اللي بتقولك الفلتر بتاعك مسك إيه فعلًا.

### نتأكد إن مفيش حاجة اتمسحت

~~~powershell
Get-ChildItem | Select-Object -ExpandProperty Name
~~~

~~~text الناتج
a.txt
b.txt
old.log
~~~

التلاتة موجودين. وعدد سطور الـ «What if» كان **اتنين** مش تلاتة، لأن [[old.log]] مش [[.txt]].

> لو كنت كتبت [[Remove-Item *]] كنت هتشوف تلات سطور، وده كان هينبهك على طول.

---

## ٢. [[Stop-Service -Name Spooler -WhatIf]]: على خدمة

~~~powershell
Stop-Service -Name Spooler -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Stop-Service" on target "Print Spooler (Spooler)".
~~~

- العملية [[Stop-Service]]، والهدف [[Print Spooler (Spooler)]].
- الهدف هنا طلع بالاسمين: المعروض والقصير. فلو كنت كتبت اسم غلط، كنت هتاخد error بدل السطر ده.
- الخدمة لسه [[Running]]. اتأكدنا بـ [[Get-Service Spooler]].

---

## ٣. [[Restart-Computer -WhatIf]]: على أخطر أمر عندك

~~~powershell
Restart-Computer -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Enable the Local shutdown access rights and restart the computer." on target "localhost (Dexter)".
~~~

و [[Stop-Computer -WhatIf]]:

~~~text الناتج
What if: Performing the operation "Stop-Computer" on target "localhost (Dexter)".
~~~

### نقرا الناتج

- [[localhost (Dexter)]]: الجهاز المحلي، واسمه [[Dexter]] (هيبقى اسم جهازك انت).
- وصف العملية في [[Restart-Computer]] بيذكر [[Enable the Local shutdown access rights]]: يعني الأمر جواه بيفعّل صلاحية الإطفاء الأول وبعدين يعمل ريستارت.
- **الجهاز معملش ريستارت.** ودي الحتة اللي بتخليك تقدر تختبر سكربت بيقفل الجهاز وانت مرتاح.

> دي أهم استخدام لـ [[-WhatIf]] في الدروس دي كلها: لما نبني سكربت بيقفل الجهاز في «مشاريع PowerShell»، هنختبره كله بـ [[-WhatIf]] من غير ما الجهاز يقفل ولا مرة.

---

## ٤. [[-Confirm]]: يسألك على كل واحد

~~~powershell
Remove-Item *.txt -Confirm
~~~

~~~text الناتج (الشكل من الـ docs، لأنه محتاج رد منك)
Confirm
Are you sure you want to perform this action?
Performing the operation "Remove File" on target "C:\...\lab\a.txt".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):
~~~

| الاختيار | معناه |
|---|---|
| [[Y]] | أيوه للعنصر ده بس |
| [[A]] | أيوه لكل اللي جاي، بلاش تسألني تاني |
| [[N]] | لأ للعنصر ده، كمّل للي بعده |
| [[L]] | لأ لكل اللي جاي، وقّف |
| [[S]] | وقّف مؤقتًا وافتحلي جلسة أبص فيها، ولما أكتب [[exit]] أرجع للسؤال |
| [[?]] | اشرحلي الاختيارات دي |

[[S]] دي الحلوة: تقدر توقف في نص عملية، تبص على الملف، وترجع تقرر.

---

## ٥. [[$WhatIfPreference]]: خلي الجلسة كلها «معاينة»

~~~powershell
$WhatIfPreference = $true
Remove-Item old.log
~~~

~~~text الناتج
What if: Performing the operation "Remove File" on target "C:\...\lab\old.log".
~~~

مكتبناش [[-WhatIf]] وبرضه اشتغل كمعاينة. مفيد لما تبقى بتجرّب سكربت طويل.

وعشان تنفّذ أمر واحد بجد وانت في الوضع ده:

~~~powershell
Remove-Item old.log -WhatIf:$false
~~~

و عشان ترجع كل حاجة لطبيعتها:

~~~powershell
$WhatIfPreference = $false
~~~

> [[-WhatIf:$false]] بالنقطتين دي شكل كتابة الـ switch بقيمة صريحة. أي switch تقدر تكتبها [[-Force:$true]] أو [[-Force:$false]]، ودي بتلزمك لما القيمة جاية من متغير.

---

## إزاي تعرف مين بيدعمهم

~~~powershell
(Get-Command -ParameterName WhatIf).Count
~~~

~~~text الناتج
83
~~~

٨٣ أمر في الجلسة. ولو أمر معين مش منهم، يبقى هو مش بيغيّر حاجة أصلًا (زي [[Get-]])، أو إنه مش بيدعم المعاينة فخد بالك منه.

---

## الخلاصة

- [[-WhatIf]] = اطبع اللي كنت هعمله ومتعملش. مجاني، وبيكشف غلط الفلتر.
- [[-Confirm]] = اسألني على كل واحد. و [[S]] بتوقف وتفتحلك جلسة تبص فيها.
- السطر المهم في الناتج هو [[on target]]: هو اللي بيقولك مسكت إيه بالظبط.
- [[$WhatIfPreference = $true]] بتعمّم المعاينة على الجلسة، و [[-WhatIf:$false]] بتكسرها لأمر واحد.
- [[-WhatIf]] بتحمي من أوامر PowerShell اللي داعماها بس، مش من برامج خارجية ولا من [[[System.IO.File]::Delete()]].
- حطها في آخر الـ pipeline، على الأمر اللي بيغيّر، مش في أوله.`,
          lines: [
            R`[[*.txt]] wildcard بيمسك كل ملف آخره .txt في الفولدر الحالي، و [[-WhatIf]] بيخلي [[Remove-Item]] يطبع سطر «What if: Performing the operation "Remove File" on target ...» لكل ملف بدل ما يمسحه. اقرا اللستة: لو فيها ملف مش متوقع، غيّر الـ wildcard قبل ما تشيل [[-WhatIf]].`,
            R`[[-Name Spooler]] خدمة الطباعة، و [[-WhatIf]] بيطبع اسم العملية ([[Stop-Service]]) والهدف بالاسمين: الاسم اللي بيظهر [[Print Spooler]] والاسم القصير [[Spooler]] بين قوسين، فتتأكد إنك ماسك الخدمة الصح.`,
            R`[[Restart-Computer]] من غير [[-ComputerName]] معناه جهازك انت، و [[-WhatIf]] بيطبع سطر «What if:» بس والجهاز مش بيعمل restart. ده بيوريك إن حتى أخطر الأوامر بتدعم المعاينة، فجرّبها قبل ما تشغّل سكربت بيقفل أجهزة.`,
            R`[[$WhatIfPreference]] متغير بيتحكم في كل الأوامر اللي بتدعم [[-WhatIf]] في الجلسة دي: لما يبقى [[$true]] كأنك كاتب [[-WhatIf]] على كل أمر، فتقدر تشغّل سكربت كامل كمعاينة. البرامج الخارجية زي [[git]] مش بتتأثر بيه، فهي بتتنفّذ عادي.`,
            R`بيرجّع المتغير لـ [[$false]] فالأوامر تتنفّذ تاني. التأثير بيفضل لحد آخر الجلسة، فلو نسيت السطر ده هتلاقي [[Remove-Item]] و [[Stop-Service]] بيطبعوا «What if» ومش بيعملوا حاجة، ولو قفلت الترمنال وفتحته بيرجع [[$false]] لوحده.`
          ]
        },

        {
          cmd: "Get-Alias",
          title: "الاختصارات: تفك كود غيرك وتكتب كود مفهوم",
          learn: R`تعرف إن [[ls]] و [[dir]] و [[gci]] كلهم نفس الأمر، وتلاقي الاسم الحقيقي.`,
          out: R`تفهم سكربتات غيرك المليانة اختصارات.`,
          use: {
            prog: R`الاختصار للكتابة السريعة، والاسم الكامل للكود اللي حد تاني هيقراه. نفس قاعدة أسماء المتغيرات.`,
            work: R`لما تنسخ سكربت من النت مليان اختصارات، [[Get-Alias]] بتفكّه لك.`,
          },
          desc: R`[[Get-Alias]] بيقولك الاختصار ده بيشاور على أمر إيه، و [[Get-Alias -Definition <الأمر>]] بيعمل العكس: يقولك الأمر ده ليه اختصارات إيه. ودي اللي بتخليك تقرا كود مكتوب بـ [[gci | ? Length -gt 1KB | % Name]] وتفهمه.

PowerShell بييجي معاه حوالي ١٥٠ اختصار جاهز. منهم اللي جاي من ويندوز ([[dir]] و [[copy]] و [[cls]])، ومنهم اللي جاي من لينكس ([[ls]] و [[cat]] و [[pwd]])، ومنهم اختصارات PowerShell نفسه ([[gci]] و [[%]] و [[?]]).

و [[Options]] في الناتج بيقول الاختصار محمي ولا لأ: [[ReadOnly]] يعني متقدرش تغيّره من غير [[-Force]]، و [[AllScope]] يعني شغال في كل الدوال والسكربتات.

وتعمل اختصار بتاعك بـ [[Set-Alias]]، بس ده بيعيش في الجلسة دي بس؛ عشان يفضل حطه في [[$PROFILE]] (درس «$PROFILE»).

**وقاعدة مهمة:** الاختصارات للترمنال بس. في السكربتات اكتب الاسم الكامل، لأن الاختصار ممكن يبقى متغيّر على جهاز تاني، و [[ls]] على لينكس في PowerShell بيتشال عشان يسيب مكان لـ [[ls]] الحقيقي.`,
          example: R`Get-Alias ls, gci, cat, cd
Get-Alias -Definition Get-ChildItem
Get-Alias | Measure-Object
Set-Alias gh Get-Help
Get-Command gci | Select-Object CommandType, Name, Definition`,
          try: R`شوف [[%]] و [[?]] بيشاوروا على إيه بـ [[Get-Alias -Definition ForEach-Object]] و [[Get-Alias -Definition Where-Object]]. وبعدين حاول [[Get-Alias '?']] وشوف الناتج الغريب واعرف ليه.`,
          sol: R`~~~text الناتج (PowerShell 7.6)
PS> Get-Alias -Definition ForEach-Object

CommandType     Name                      Definition
-----------     ----                      ----------
Alias           % -> ForEach-Object
Alias           foreach -> ForEach-Object

PS> Get-Alias -Definition Where-Object

CommandType     Name                      Definition
-----------     ----                      ----------
Alias           ? -> Where-Object
Alias           where -> Where-Object
~~~

أما [[Get-Alias '?']] فبيطلّع **كل الاختصارات اللي اسمها حرف واحد**:

~~~text الناتج
Name Definition     Options
---- ----------     -------
?    Where-Object   ReadOnly, AllScope
%    ForEach-Object ReadOnly, AllScope
h    Get-History
r    Invoke-History
~~~

**ليه؟** لأن [[?]] في PowerShell wildcard معناها «أي حرف واحد»، و [[Get-Alias]] بيقبل wildcards في الاسم. فهو فهمها «هات أي اختصار طوله حرف واحد» مش «هات الاختصار المسمّى ؟».

والحل لو عايز الاختصار ده بالذات: دوّر بالعكس ([[-Definition Where-Object]]) زي فوق.`,
          deep: {
            why: R`هتقرا أكواد في النت مكتوبة بالاختصارات، وهتلاقي [[gci]] و [[sls]] و [[iwr]] من غير ما تعرف دي إيه. [[Get-Alias]] بيفكها في ثانية.

والاتجاه التاني مهم كمان: انت بتكتب في الترمنال طول اليوم، والاختصار بيوفّر وقت حقيقي.`,
            how: R`الاختصارات في PowerShell مش مجرد «نسخ ولصق» زي [[doskey]] في CMD ولا [[alias]] في bash. هي **اسم تاني لنفس الأمر**، فبتاخد نفس الـ parameters بالظبط. [[gci -Recurse]] شغالة لأن [[gci]] هو [[Get-ChildItem]] بعينه.

وعشان كده مينفعش تعمل alias فيه parameters: [[Set-Alias ll "Get-ChildItem -Force"]] **مش** هتشتغل. اللي بيعمل ده دالة:

~~~powershell
function ll { Get-ChildItem -Force @args }
~~~

[[@args]] بتمرّر أي حاجة كتبتها بعد [[ll]] للأمر اللي جوه.

**الاختصارات اللي من ويندوز ولينكس:**

| تكتب | في الحقيقة |
|---|---|
| [[dir]] / [[ls]] / [[gci]] | [[Get-ChildItem]]: يعرض الملفات والفولدرات اللي في مكان |
| [[cat]] / [[type]] / [[gc]] | [[Get-Content]]: يقرا محتوى ملف سطر سطر |
| [[cd]] / [[chdir]] / [[sl]] | [[Set-Location]]: ينقلك لفولدر تاني |
| [[cls]] / [[clear]] | [[Clear-Host]]: يمسح الشاشة بس، مش الـ history |
| [[%]] | [[ForEach-Object]]: يشغّل بلوك لكل object جاي في الـ pipe |
| [[?]] | [[Where-Object]]: يسيب الـ objects اللي ماشية مع الشرط بس |
| [[iwr]] | [[Invoke-WebRequest]]: يطلب صفحة أو API من النت |
| [[sls]] | [[Select-String]]: يدوّر على نص جوه ملفات أو ناتج، زي grep |

**تعرف الاختصار ورا الأمر:** [[Get-Command gci]] بيطلّع الاسم الحقيقي في العمود [[Name]] نفسه ([[gci -> Get-ChildItem]]) وفي خاصية [[Definition]]، و [[Get-Help <أمر>]] بيعرض قسم [[ALIASES]].

**على لينكس وماك:** PowerShell بيشيل الاختصارات اللي بتتعارض مع أوامر النظام ([[ls]] و [[cat]] و [[man]] و [[mv]] و [[cp]] و [[rm]] و [[pwd]])، عشان لما تكتب [[ls]] هناك تاخد الأمر الحقيقي. وده السبب التاني إن السكربت ميعتمدش على اختصار.`,
            when: "لما تقرا كود مش فاهمه. ولما تبقى بتكتب في الترمنال كتير وعايز توفّر ضغطات.",
            mistakes: R`تستخدم الاختصارات في سكربت هيشتغل على جهاز تاني. ولا هتشتغل على لينكس، ولا اللي بعدك هيفهمها، و [[PSScriptAnalyzer]] هينبهك عليها بقاعدة [[PSAvoidUsingCmdletAliases]].

وتحاول تحط parameters جوه [[Set-Alias]]. ده شغل دالة مش alias.

وتنسى إن [[?]] و [[*]] wildcards، فتدوّر على اختصار باسمه وتاخد نتايج مش متوقعة.`
          },
          teach: R`## الفكرة

الاختصار في PowerShell هو **اسم تاني لنفس الأمر**. هنشوف إزاي نفكه، وإزاي نعمل واحد، وإزاي ده بيختلف عن bash و CMD.

كل الناتج من PowerShell 7.6 على ويندوز 11.

---

## ١. [[Get-Alias ls, gci, cat, cd]]: الاختصار ده إيه؟

~~~powershell
Get-Alias ls, gci, cat, cd
~~~

~~~text الناتج
Name Definition    Options
---- ----------    -------
ls   Get-ChildItem    None
gci  Get-ChildItem    ReadOnly
cat  Get-Content      None
cd   Set-Location  AllScope
~~~

### نقرا الناتج

- [[ls]] و [[gci]] الاتنين على نفس الأمر. يعني [[ls]] هنا **مش** برنامج لينكس، ده اسم تاني لـ [[Get-ChildItem]].
- [[Options]] بيقول الاختصار محمي قد إيه:

| القيمة | معناها |
|---|---|
| [[None]] | عادي، تقدر تغيّره بـ [[Set-Alias]] |
| [[ReadOnly]] | محمي، محتاج [[Set-Alias -Force]] عشان تغيّره |
| [[AllScope]] | موجود في كل الدوال والسكربتات، مش بس المستوى الحالي |

- [[gci]] [[ReadOnly]] لأنه اختصار رسمي من PowerShell، لكن [[ls]] [[None]] لأنه اختصار «راحة» ممكن تدوسه.

---

## ٢. [[Get-Alias -Definition Get-ChildItem]]: الاتجاه العكسي

~~~powershell
Get-Alias -Definition Get-ChildItem
~~~

~~~text الناتج
CommandType     Name
-----------     ----
Alias           dir -> Get-ChildItem
Alias           gci -> Get-ChildItem
Alias           ls -> Get-ChildItem
~~~

تلات اختصارات لنفس الأمر: واحد من CMD ([[dir]])، وواحد من لينكس ([[ls]])، وواحد من PowerShell ([[gci]]).

**ليه كده؟** عشان أي حد جاي من أي خلفية يكتب اللي اتعوّد عليه ويشتغل.

> [[-Definition]] هي الطريقة الصح لما الاسم فيه رموز زي [[?]] و [[%]]، لأن دول wildcards لو كتبتهم في [[-Name]].

---

## ٣. كام اختصار عندي أصلًا؟

~~~powershell
Get-Alias | Measure-Object
~~~

~~~text الناتج (بيختلف حسب الموديولات المحمّلة)
Count    : 154
Average  :
Sum      :
Maximum  :
Minimum  :
Property :
~~~

[[Measure-Object]] بيعد العناصر. ١٥٤ اختصار جاهز من أول ما تفتح.

---

## ٤. [[Set-Alias gh Get-Help]]: اعمل اختصارك

~~~powershell
Set-Alias gh Get-Help
Get-Alias gh
~~~

~~~text الناتج
Name Definition Options
---- ---------- -------
gh   Get-Help      None
~~~

ودلوقتي [[gh Stop-Service]] = [[Get-Help Stop-Service]].

**بس خد بالك:** ده عايش في الجلسة دي بس. اقفل الترمنال وهيروح. عشان يفضل، حطه في ملف [[$PROFILE]].

### الحد اللي مينفعش تعدّيه

~~~powershell
Set-Alias ll "Get-ChildItem -Force"
~~~

~~~text الناتج
Set-Alias: The term 'Get-ChildItem -Force' is not recognized as a name of a cmdlet...
~~~

**ليه؟** لأن الـ alias اسم لأمر، مش نص بيتلصق. هو دوّر على أمر **اسمه** [[Get-ChildItem -Force]] (بالمسافة والشرطة) وملقاهوش.

**الحل: دالة.**

~~~powershell
function ll { Get-ChildItem -Force @args }
ll
~~~

[[@args]] معناها «أي حاجة اتكتبت بعد [[ll]]، مرّرها زي ما هي». فـ [[ll C:\Windows]] بتشتغل.

> ودي حتة بتفرّق PowerShell عن bash: في bash [[alias ll='ls -la']] شغالة لأن الـ alias هناك **نص بيتلصق** قبل التنفيذ. في PowerShell الـ alias **اسم لأمر**، فالحاجات اللي فيها parameters بتتعمل بدوال.

---

## ٥. الاختصار ده رايح لفين بالظبط؟

~~~powershell
Get-Command gci | Select-Object CommandType, Name, Definition
~~~

~~~text الناتج
CommandType Name Definition
----------- ---- ----------
      Alias gci  Get-ChildItem
~~~

[[Definition]] في الـ alias هو الأمر اللي بيشاور عليه. وفيه كمان خاصية [[ResolvedCommand]] (الأمر النهائي بعد فك كل الاختصارات، مفيدة لو alias بيشاور على alias)، بس اتجرّبت في جلسة جديدة في 5.1 و 7 وطلعت **فاضية** لحد ما موديول الأمر يتحمّل (بعد أول [[Get-ChildItem]]). عشان كده المثال بيستخدم [[Definition]]: بتطلع على طول.

---

## جدول: الاختصارات اللي هتقابلها كتير

| الاختصار | الأمر الكامل | جاي منين |
|---|---|---|
| [[gci]] / [[ls]] / [[dir]] | [[Get-ChildItem]] | PowerShell / لينكس / CMD |
| [[gc]] / [[cat]] / [[type]] | [[Get-Content]] | PowerShell / لينكس / CMD |
| [[sl]] / [[cd]] | [[Set-Location]] | PowerShell / الكل |
| [[%]] | [[ForEach-Object]] | PowerShell |
| [[?]] / [[where]] | [[Where-Object]] | PowerShell |
| [[select]] | [[Select-Object]] | PowerShell |
| [[sls]] | [[Select-String]] | PowerShell |
| [[iwr]] | [[Invoke-WebRequest]] | PowerShell |
| [[irm]] | [[Invoke-RestMethod]] | PowerShell |
| [[cls]] / [[clear]] | [[Clear-Host]] | CMD / لينكس |

---

## الخلاصة

- الـ alias في PowerShell **اسم تاني لأمر**، مش نص بيتلصق زي bash. فمفيش parameters جواه؛ اللي بيعمل كده دالة بـ [[@args]].
- [[Get-Alias <اسم>]] بيفك الاختصار، و [[Get-Alias -Definition <أمر>]] بيعمل العكس.
- [[?]] و [[*]] في الاسم بيتعاملوا كـ wildcards، فاستخدم [[-Definition]] معاهم.
- [[Options]] بيقولك [[ReadOnly]] (محمي) و [[AllScope]] (في كل مكان).
- [[Set-Alias]] عايش للجلسة بس؛ للدوام حطه في [[$PROFILE]].
- **في السكربتات اكتب الاسم الكامل.** الاختصارات مش مضمونة على كل نظام، و [[PSScriptAnalyzer]] بينبّه عليها.`,
          lines: [
            R`[[Get-Alias]] بياخد كذا اسم بالفاصلة ويرجّع لكل واحد [[Definition]] (الأمر الحقيقي اللي بيشاور عليه، زي [[ls]] بيروح لـ [[Get-ChildItem]]) و [[Options]]: [[ReadOnly]] يعني مينفعش تغيّره من غير [[-Force]]، و [[AllScope]] (زي [[cd]]) يعني موجود في كل scope ومينفعش تشيل الخاصية دي. والقيم بتختلف بين 5.1 و 7.`,
            R`[[-Definition]] بيقلب السؤال: بدل «الاختصار ده إيه»، «الأمر ده ليه اختصارات إيه»، فيطلع [[dir]] و [[gci]] و [[ls]]. وده الطريقة الآمنة مع اختصارات زي [[?]] و [[%]]: لو كتبتهم كأسامي في [[Get-Alias]] هيتفهموا wildcard ويجيبوا حاجات كتير.`,
            R`[[Get-Alias]] من غير أسامي بيجيب كل الاختصارات، و [[Measure-Object]] بيعدّهم ويطلّع [[Count]]. العدد بيختلف حسب النسخة (5.1 فيه اختصارات أكتر، زي [[curl]] و [[wget]] اللي اتشالوا من 7) وحسب الموديولات اللي اتحمّلت.`,
            R`[[Set-Alias]] بيعمل اختصار جديد: الاسم الأول ([[gh]]) والأمر اللي بيشاور عليه ([[Get-Help]]). بيعيش لحد ما تقفل الترمنال بس؛ عشان يفضل حطه في ملف [[$PROFILE]]. خلي بالك: الاختصار بيكسب على البرامج الخارجية، فلو عندك GitHub CLI اسمه [[gh]] كمان، [[gh]] هيفتح Get-Help بداله.`,
            R`[[Get-Command]] على اختصار بيرجّع [[CommandType]] = [[Alias]]، و [[Definition]] فيها الأمر اللي الاختصار بيشاور عليه ([[Get-ChildItem]]). اخترنا [[Definition]] مش [[ResolvedCommand]] لأن التانية اتجرّبت في جلسة جديدة (5.1 و 7) وطلعت فاضية لحد ما موديول الأمر يتحمّل.`
          ]
        },

        {
          cmd: "Update-Help و about_",
          title: "صفحات المفاهيم، ولما المساعدة مش متحمّلة",
          learn: R`تجيب التوثيق الكامل على جهازك، وتقرا مواضيع الشرح (about_) مش الأوامر بس.`,
          out: R`يبقى معاك مرجع شغال من غير إنترنت.`,
          use: {
            net: R`على سيرفر مقفول من النت، التوثيق المحلي هو كل اللي معاك.`,
            cs: R`الفرق بين توثيق الأمر وتوثيق المفهوم: الأول بيقولك إزاي، والتاني بيقولك ليه.`,
          },
          desc: R`غير مساعدة الأوامر، PowerShell فيه نوع تاني من الصفحات اسمه [[about_]]: صفحات بتشرح **مفهوم** مش أمر. زي [[about_Operators]] (كل العمليات) و [[about_If]] و [[about_Functions]] و [[about_Comparison_Operators]].

بس فيه مفاجأة على ويندوز: **ملفات المساعدة مش بتيجي مسطّبة.** لو كتبت [[Get-Help about_Operators]] على جهاز جديد هتاخد رسالة «could not find about_Operators in a help file in this session».

[[Update-Help]] بينزّلهم مرة واحدة. في PowerShell 7 بينزّل لليوزر بتاعك ومش محتاج أدمن؛ في 5.1 لازم تفتح PowerShell كأدمن. وبعدها [[Get-Help about_*]] بيطلّع أكتر من ١٠٠ موضوع.

ولو مش عايز تنزّل: [[-Online]] بتفتح الصفحة على موقع Microsoft في المتصفح، وبتشتغل على طول.

وبعد ما تنزّلهم، أقوى حاجة: [[Get-Help -Name "*" -Category HelpFile]] أو [[Get-Help about_* | Where-Object Synopsis -match "كلمة"]] عشان تدوّر جوه المواضيع نفسها.`,
          example: R`Get-Help about_*
Get-Help about_Operators
Get-Help about_Operators -Online
Update-Help -Scope CurrentUser -ErrorAction SilentlyContinue
Get-Help Get-ChildItem -Examples`,
          try: R`شغّل [[Get-Help about_*]] على جهازك وعدّ كام موضوع طلع. لو أقل من ٢٠، يبقى ملفات المساعدة مش متحمّلة. وجرّب [[Get-Help about_Comparison_Operators -Online]] من غير أي تحميل.`,
          sol: R`~~~text الناتج على جهاز لسه مشغّلش Update-Help (PowerShell 7.6)
PS> Get-Help about_*

Name                     Category  Module   Synopsis
----                     --------  ------   --------
about_BeforeEach_AfterEach HelpFile
about_Mocking              HelpFile
about_Pester               HelpFile
about_should               HelpFile
about_TestDrive            HelpFile

PS> (Get-Help about_*).Count
5
~~~

**خمسة بس، وكلهم بتوع Pester** (مكتبة اختبارات اتسطبت مع حاجة تانية). مفيش ولا موضوع من بتوع PowerShell نفسه.

و [[Get-Help about_Operators]]:

~~~text الناتج
Get-Help: Get-Help could not find about_Operators in a help file in this session. To download
updated help topics type: "Update-Help". To get help online, search for the help topic in the
TechNet library at https://go.microsoft.com/fwlink/?LinkID=107116.
~~~

الرسالة نفسها بتدّيك الحلّين: [[Update-Help]] أو تدوّر أونلاين. وبعد [[Update-Help]] العدد بيبقى أكتر من ١٠٠.`,
          deep: {
            why: R`فيه حاجات في PowerShell مش أوامر، فمش هتلاقيها بـ [[Get-Command]]: إزاي الـ operators شغالة، وإيه قواعد النطاقات (scopes)، وإزاي الـ pipeline بيربط. دي كلها في صفحات [[about_]].

والسبب التاني: على جهاز جديد [[Get-Help X -Examples]] مش بيطلّع أمثلة، وناس كتير بتفتكر إن الأمر ده ملوش أمثلة، والحقيقة إن الملفات مش متحمّلة.`,
            how: R`PowerShell بيشحن **من غير** ملفات مساعدة عشان يقلّل الحجم ويخلي المساعدة محدّثة. [[Update-Help]] بينزّلها من سيرفرات مايكروسوفت.

~~~powershell
Update-Help -Scope CurrentUser
~~~

- [[-Scope CurrentUser]] بينزّل في فولدر اليوزر، فمش محتاج أدمن (PowerShell 6 وأحدث).
- [[-Force]] بيتجاهل الحد بتاع «مرة كل ٢٤ ساعة».
- [[-UICulture en-US]] لو جهازك بلغة تانية وملفات لغتك مش موجودة.
- بياخد دقيقة أو اتنين، ومن الطبيعي يطلّع تحذيرات لموديولات ملهاش ملفات مساعدة أونلاين.

**المواضيع اللي تستاهل تقراها:**

| الموضوع | بيشرح إيه |
|---|---|
| [[about_Operators]] | كل العمليات والرموز |
| [[about_Comparison_Operators]] | [[-eq]] و [[-like]] و [[-match]] والفرق |
| [[about_Pipelines]] | الـ pipeline بيشتغل إزاي من جوه |
| [[about_Functions_Advanced_Parameters]] | [[[Parameter()]]] و الـ validation |
| [[about_Scopes]] | المتغير شايفه مين |
| [[about_Preference_Variables]] | المتغيرات اللي بتغيّر سلوك كل الأوامر، زي [[$ErrorActionPreference]] وإخواتها |
| [[about_Splatting]] | تمرير الـ parameters من hashtable |
| [[about_Automatic_Variables]] | [[$_]] و [[$?]] و [[$PSItem]] وكل المتغيرات الجاهزة |

**تدوّر جواهم:**

~~~powershell
Get-Help about_* | Where-Object Name -match "Operator"
Get-Help about_Comparison_Operators | Out-String -Stream | Select-String "like"
~~~

[[Out-String -Stream]] بيحوّل الصفحة لسطور، و [[Select-String]] بيدوّر فيها زي [[grep]].`,
            when: "أول حاجة تعملها على جهاز جديد: [[Update-Help -Scope CurrentUser]]. وبعدها كل ما تحتاج تفهم مفهوم مش أمر.",
            mistakes: R`تفتكر إن الأمر ملوش أمثلة والحقيقة إن الملفات مش متحمّلة. اقرا [[REMARKS]] في آخر ناتج [[Get-Help]]، هو بيقولك.

وتشغّل [[Update-Help]] من غير [[-Scope CurrentUser]] في PowerShell 5.1 من غير أدمن، فتاخد errors على كل موديول.

وتتوقع إن [[about_]] فيها أمثلة كود كتير. لأ، دي صفحات مفاهيم طويلة ونصيّة؛ الأمثلة العملية في [[Get-Help <أمر> -Examples]].`
          },
          teach: R`## الفكرة

مساعدة PowerShell نوعين: صفحة لكل **أمر**، وصفحة لكل **مفهوم** (اللي اسمها [[about_]]). وفي الاتنين فيه مفاجأة على ويندوز: مش متسطبين أصلًا. هنشوف ده بالناتج الحقيقي.

جهاز الاختبار: ويندوز 11، PowerShell 7.6، **لسه مشغّلش [[Update-Help]]**.

---

## ١. [[Get-Help about_*]]: إيه الموجود عندي؟

~~~powershell
Get-Help about_*
~~~

~~~text الناتج
Name                       Category  Module  Synopsis
----                       --------  ------  --------
about_BeforeEach_AfterEach HelpFile
about_Mocking              HelpFile
about_Pester               HelpFile
about_should               HelpFile
about_TestDrive            HelpFile
~~~

### نقرا الناتج

خمس مواضيع بس، **وكلهم بتوع Pester** (مكتبة اختبارات اتسطبت مع أداة تانية وجابت ملفات مساعدتها معاها).

مفيش [[about_Operators]]، ولا [[about_Functions]]، ولا أي حاجة من بتوع PowerShell نفسه. **ليه؟** لأن PowerShell بيتشحن من غير ملفات المساعدة.

> المفروض العدد يبقى أكتر من ١٠٠. لو عندك ٥، يبقى انت في نفس الحالة.

---

## ٢. [[Get-Help about_Operators]]: الرسالة اللي بتلخبط

~~~powershell
Get-Help about_Operators
~~~

~~~text الناتج
Get-Help: Get-Help could not find about_Operators in a help file in this session. To download
updated help topics type: "Update-Help". To get help online, search for the help topic in the
TechNet library at https://go.microsoft.com/fwlink/?LinkID=107116.
~~~

### نفك الرسالة

| الحتة | معناها |
|---|---|
| [[could not find about_Operators in a help file]] | الملف نفسه مش موجود على الجهاز |
| [[in this session]] | في الجلسة دي، يعني ممكن يبقى موجود بعد تحميل |
| [[To download ... type: "Update-Help"]] | الحل الأول: شغّل [[Update-Help]] ينزّل الملفات على جهازك |
| [[To get help online, search ...]] | الحل التاني: اقرا نفس الصفحة على النت من غير تحميل |

**الرسالة مش بتقول «الموضوع ده مش موجود».** بتقول «الملف مش عندي». فرق كبير.

---

## ٣. نفس المشكلة على مساعدة الأوامر

~~~powershell
Get-Help Get-ChildItem
~~~

~~~text الناتج (اتقص)
NAME
    Get-ChildItem

SYNTAX
    Get-ChildItem [[-Path] <string[]>] [[-Filter] <string>] [-Include <string[]>] ...

ALIASES
    gci
    ls
    dir

REMARKS
    Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying
    only partial help.
        -- To download and install Help files for the module that includes this cmdlet, use
    Update-Help.
        -- To view the Help topic for this cmdlet online, type: "Get-Help Get-ChildItem
    -Online" or go to https://go.microsoft.com/fwlink/?LinkID=2096492.
~~~

### نقرا الناتج

- [[NAME]] و [[SYNTAX]] و [[ALIASES]] طلعوا. دول **محفورين جوه الأمر نفسه**، مش محتاجين ملف.
- [[DESCRIPTION]] و [[EXAMPLES]] و [[PARAMETERS]] **مش** موجودين. دول في الملف.
- [[REMARKS]] بيقول الحكاية صراحة: [[It is displaying only partial help]].

**يعني من غير [[Update-Help]]:** [[-Syntax]] شغال تمام، و [[-Examples]] مش هيطلّع حاجة.

---

## ٤. [[-Online]]: الحل من غير تحميل

~~~powershell
Get-Help about_Operators -Online
Get-Help Get-ChildItem -Online
~~~

مبيطبعش حاجة في الترمنال: بيفتح المتصفح على صفحة Microsoft Learn. ودي أحدث نسخة وفيها كل الأمثلة.

الرابط في الرسالة فوق ([[LinkID=2096492]]) هو بالظبط اللي [[-Online]] بيفتحه.

---

## ٥. [[Update-Help]]: الحل الدائم

~~~powershell
Update-Help -Scope CurrentUser
~~~

| الحتة | معناها |
|---|---|
| [[Update-Help]] | نزّل ملفات المساعدة من سيرفرات مايكروسوفت |
| [[-Scope CurrentUser]] | في فولدر اليوزر بتاعي، **فمش محتاج أدمن** |

- في **PowerShell 7**: [[-Scope CurrentUser]] شغالة ومش محتاجة أدمن.
- في **PowerShell 5.1**: مفيش [[-Scope]]، فلازم تفتح PowerShell كأدمن.
- بياخد دقيقة أو اتنين على نت عادي.
- طبيعي يطلّع تحذيرات صفرا لموديولات ملهاش ملفات مساعدة منشورة. دي مش أخطاء.

> الأمر ده بينزّل ملفات على الجهاز، فمشغلتوش هنا. الكلام ده من دليل Microsoft ومن الرسالة نفسها اللي فوق.

**بعده** [[Get-Help about_*]] بيطلّع أكتر من ١٠٠ موضوع، و [[Get-Help Get-ChildItem -Examples]] بيطلّع أمثلة مترقمة.

---

## ٦. تدوّر جوه المواضيع

بعد التحميل:

~~~powershell
Get-Help about_* | Where-Object Name -match "Operator"
~~~

وعشان تدوّر جوه صفحة معينة زي [[grep]]:

~~~powershell
Get-Help about_Comparison_Operators | Out-String -Stream | Select-String "match"
~~~

| الحتة | معناها |
|---|---|
| [[Out-String -Stream]] | حوّل الصفحة الطويلة لسطور منفصلة |
| [[Select-String "match"]] | طلّع السطور اللي فيها الكلمة دي |

من غير [[-Stream]]، [[Out-String]] بيطلّع نص واحد كبير و [[Select-String]] هيرجّعه كله.

---

## المواضيع اللي تستاهل

| الموضوع | ليه |
|---|---|
| [[about_Comparison_Operators]] | [[-eq]] و [[-like]] و [[-match]] والفرق بينهم |
| [[about_Operators]] | كل الرموز في مكان واحد |
| [[about_Automatic_Variables]] | [[$_]] و [[$?]] و [[$args]] وكل المتغيرات الجاهزة |
| [[about_Preference_Variables]] | المتغيرات اللي بتغيّر سلوك كل الأوامر في الجلسة، زي [[$ErrorActionPreference]] و [[$WhatIfPreference]] |
| [[about_Splatting]] | تمرير parameters من hashtable |
| [[about_Scopes]] | المتغير ده شايفه مين |
| [[about_Pipelines]] | الـ pipeline من جوه |

---

## الخلاصة

- مساعدة PowerShell نوعين: صفحة لكل **أمر**، و [[about_]] لكل **مفهوم**.
- على ويندوز الملفات **مش بتيجي مسطّبة**. [[Get-Help about_*]] بيطلّع ٥ مواضيع بس عندي، كلهم من مكتبة تانية.
- [[NAME]] و [[SYNTAX]] و [[ALIASES]] شغالين من غير تحميل؛ [[EXAMPLES]] و [[DESCRIPTION]] لأ.
- [[Update-Help -Scope CurrentUser]] مرة واحدة بتحل المشكلة (أدمن مطلوب في 5.1 بس).
- [[-Online]] شغال على طول من غير تحميل.
- اقرا [[REMARKS]] في آخر المساعدة؛ هي بتقولك لو اللي قدامك ناقص.`,
          lines: [
            R`[[about_*]] بالنجمة بيعرض كل صفحات المفاهيم (اللي بتشرح فكرة زي الـ operators أو الـ variables، مش أمر معين) الموجودة على جهازك. على تسطيبة جديدة بيطلع كام صفحة بس، ولو أقل من 20 يبقى ملفات المساعدة لسه متنزلتش.`,
            R`بيعرض صفحة مفهوم واحدة بالاسم: [[about_Operators]] بتشرح كل العوامل ([[-eq]] و [[-and]] و [[-replace]]...). لو المساعدة مش متحمّلة، بيطلع error «could not find about_Operators in a help file» وبيقترح تشغّل [[Update-Help]] أو تدوّر على الصفحة على النت.`,
            R`[[-Online]] بيفتح نفس الصفحة على موقع Microsoft في المتصفح، فبيشتغل من غير ما تنزّل حاجة ودايمًا أحدث نسخة. محتاج نت ومتصفح، فمش هينفع على سيرفر من غير واجهة.`,
            R`[[Update-Help]] بينزّل ملفات المساعدة الكاملة من النت. [[-Scope CurrentUser]] (PowerShell 7 بس) بيحطها في فولدر يوزرك فمش محتاج أدمن، وفي 5.1 الـ parameter ده مش موجود والأمر محتاج ترمنال أدمن. [[-ErrorAction SilentlyContinue]] لأن موديولات قليلة ملهاش مساعدة على النت فبتطلّع errors حمرا مالهاش لازمة.`,
            R`[[-Examples]] بيعرض الأمثلة بس من صفحة الأمر، مترقمة وكل واحد معاه شرحه، وده غالبًا أسرع طريق تفهم بيه أمر جديد. قبل [[Update-Help]] بيطلّع الاسم والـ syntax بس لأن الأمثلة جوه الملفات اللي بتتنزل.`
          ]
        },

        {
          cmd: "Tab و Ctrl+Space",
          title: "الإكمال التلقائي: أسرع طريقة تكتشف",
          learn: R`الإكمال التلقائي بيكمّل أسماء الأوامر والـ parameters وحتى القيم المسموحة.`,
          out: R`تكتب أسرع وتغلط أقل في الأسامي.`,
          use: {
            prog: R`نفس الـ IntelliSense، بس في الترمنال. ولو الإكمال مش لاقي حاجة، غالبًا الاسم غلط.`,
            work: R`الإكمال بيكشف غلطة الكتابة قبل ما تضغط Enter، وده بيوفّر عليك نص الأخطاء.`,
          },
          desc: R`زرار [[Tab]] مش بس بيوفّر كتابة، ده أداة اكتشاف. اكتب جزء من اسم أمر ودوس Tab فيكمّله، واكتب [[-]] بعد الأمر ودوس Tab فيلف على كل الـ parameters واحدة واحدة.

[[Ctrl+Space]] أقوى: بيفتح **قايمة** بكل الاحتمالات تحت السطر وتتحرك فيها بالأسهم، بدل ما تلف واحد واحد. وده بيوريك كل الخيارات مرة واحدة.

والإكمال شغال على حاجات أكتر مما تتخيل: أسامي الأوامر، والـ parameters، و **قيم** الـ parameters لما تكون محددة (زي [[-ItemType]])، وأسامي الملفات والفولدرات، وأسامي الخدمات في [[-Name]]، وحتى خصائص الـ object بعد النقطة جوه [[{ }]].

[[Shift+Tab]] بيرجّع للخيار اللي قبله لو عدّيت اللي انت عايزه.

واللي ورا ده كله دالة اسمها [[TabExpansion2]]، وتقدر تناديها بنفسك عشان تشوف الاحتمالات كنص (مفيدة لما تبقى بتشرح أو بتكتب سكربت).`,
          example: R`$r = TabExpansion2 -inputScript 'Get-Ch' -cursorColumn 6
$r.CompletionMatches | Select-Object CompletionText, ResultType
$s = 'Get-Service -'
$r2 = TabExpansion2 -inputScript $s -cursorColumn $s.Length
$r2.CompletionMatches | Select-Object -First 10 -ExpandProperty CompletionText
Get-PSReadLineKeyHandler -Bound | Where-Object Function -like '*Complete*'`,
          flag: "keys",
          try: R`في الترمنال: اكتب [[Get-Ch]] ودوس Tab. وبعدين اكتب [[Get-Service -]] ودوس [[Ctrl+Space]] وشوف القايمة. وبعدين [[New-Item -ItemType ]] ودوس Tab كذا مرة.`,
          sol: R`[[Get-Ch]] + Tab بتكمّل لـ [[Get-ChildItem]] على طول، لأن فيه احتمال واحد بس:

~~~text ناتج TabExpansion2 (PowerShell 7.6)
CompletionText ResultType
-------------- ----------
Get-ChildItem     Command
~~~

و [[Get-Service -]] + Ctrl+Space بيطلّع قايمة:

~~~text
-Name
-DependentServices
-RequiredServices
-DisplayName
-Include
-Exclude
-InputObject
-Verbose
-Debug
-ErrorAction
~~~

لاحظ إن أول ٧ دول parameters بتاعة [[Get-Service]] نفسه، واللي بعدهم ([[-Verbose]] و [[-Debug]] و [[-ErrorAction]]) دول الـ [[CommonParameters]] اللي كل أمر بياخدهم.

و [[New-Item -ItemType ]] + Tab بيلف على [[File]] و [[Directory]] و [[SymbolicLink]] و [[Junction]] و [[HardLink]] — وديل القيم اللي سطر الـ Syntax مكنش بيعرضها!`,
          deep: {
            why: R`الإكمال بيرد على أسئلة من غير ما تطلع من السطر اللي بتكتبه: الأمر اسمه كده ولا كده؟ الـ parameter دي موجودة؟ القيم المسموحة إيه؟ الخدمة اسمها إيه بالظبط؟

وبيمنع غلطات الإملاء، وهي أكتر سبب لـ «الأمر مش شغال».`,
            how: R`الإكمال في PowerShell مش قايمة ثابتة، ده **بيسأل النظام وقت ما تدوس**:

| بتكتب | بيكمّل من |
|---|---|
| [[Get-Ch]] + Tab | أسامي الأوامر المحمّلة |
| [[Get-Service -]] + Tab | parameters الأمر + CommonParameters |
| [[Get-Service -Name ]] + Tab | **أسامي الخدمات الموجودة على جهازك دلوقتي** |
| [[New-Item -ItemType ]] + Tab | القيم المسموحة من تعريف الـ parameter |
| [[cd Doc]] + Tab | الفولدرات اللي في مكانك |
| [[$x = Get-Date; $x.]] + Tab | خصائص وميثودز الـ object |

الحتة التالتة دي هي السحر: هو بينادي [[Get-Service]] فعلًا عشان يجيبلك الأسامي.

**الفرق بين Tab و Ctrl+Space:**

| | Tab | Ctrl+Space |
|---|---|---|
| الشكل | بيبدّل الكلمة في السطر | بيفتح قايمة تحت السطر |
| التنقل | Tab للي بعده، Shift+Tab للي قبله | الأسهم الأربعة |
| امتى | عارف اللي عايزه تقريبًا | عايز تشوف كل الاحتمالات |

والاتنين من مكتبة [[PSReadLine]] (نسخة 2.4.5 عندي)، وتقدر تشوف ربط الأزرار بـ [[Get-PSReadLineKeyHandler -Bound]].

**تخلي Tab يفتح قايمة زي Ctrl+Space:**

~~~powershell
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
~~~

حطها في [[$PROFILE]] لو عجبتك.

**و [[TabExpansion2]]:** الدالة اللي بتشتغل تحت. [[-inputScript]] السطر، و [[-cursorColumn]] مكان المؤشر فيه. بترجّع object فيه [[CompletionMatches]]. ودي الطريقة الوحيدة تشوف الاحتمالات كنص في سكربت أو في درس زي ده.`,
            when: "طول الوقت. ومخصوص لما تكون مش متأكد من إملاء، أو عايز تعرف القيم المسموحة لـ parameter.",
            mistakes: R`تدوس Tab وتستنى قايمة فتتلخبط لما الكلمة تتبدّل. ده الفرق: Tab بيبدّل، Ctrl+Space بيعرض قايمة.

وتفتكر إن الإكمال بيعرف كل الأوامر. هو بيعرف المحمّل في الجلسة والموجود في [[$env:PSModulePath]] بس. لو سطّبت موديول جديد، افتح ترمنال جديد.

وفي CMD القديمة Tab بيكمّل **أسامي الملفات بس**، مش الأوامر ولا الـ parameters. ده فرق كبير لصالح PowerShell.`
          },
          teach: R`## الفكرة

Tab مش اختصار كتابة، ده **سؤال للنظام**. هنشوف الاحتمالات اللي بيرجّعها فعلًا، بدالة [[TabExpansion2]] اللي شغالة تحته.

كل الناتج من PowerShell 7.6 / PSReadLine 2.4.5 على ويندوز 11.

---

## ١. إكمال اسم أمر

~~~powershell
$r = TabExpansion2 -inputScript 'Get-Ch' -cursorColumn 6
$r.CompletionMatches | Select-Object CompletionText, ResultType
~~~

| الحتة | معناها |
|---|---|
| [[TabExpansion2]] | الدالة اللي بتشتغل لما تدوس Tab |
| [[-inputScript 'Get-Ch']] | السطر اللي مكتوب دلوقتي |
| [[-cursorColumn 6]] | المؤشر بعد الحرف السادس (آخر السطر هنا) |
| [[.CompletionMatches]] | قايمة الاحتمالات اللي لقاها |
| [[CompletionText]] | النص اللي هيتحط |
| [[ResultType]] | نوعه: أمر؟ parameter؟ ملف؟ |

~~~text الناتج
CompletionText ResultType
-------------- ----------
Get-ChildItem     Command
~~~

احتمال واحد بس، فـ Tab بيكمّله على طول من غير ما يسألك.

---

## ٢. إكمال الـ parameters

~~~powershell
$s = 'Get-Service -'
$r2 = TabExpansion2 -inputScript $s -cursorColumn $s.Length
$r2.CompletionMatches | Select-Object -First 10 -ExpandProperty CompletionText
~~~

[[$s.Length]] بيدّي طول النص، يعني المؤشر في آخره.

~~~text الناتج
-Name
-DependentServices
-RequiredServices
-DisplayName
-Include
-Exclude
-InputObject
-Verbose
-Debug
-ErrorAction
~~~

### نقرا الناتج

- أول ٧: parameters [[Get-Service]] نفسه.
- [[-Verbose]] و [[-Debug]] و [[-ErrorAction]]: دول الـ [[<CommonParameters>]] اللي كل أمر بياخدهم.
- الترتيب مش أبجدي: بيبدأ بالأهم (اللي في أول الـ parameter set).

**يعني دوسة [[-]] + Tab = «الأمر ده بياخد إيه؟»** من غير ما تفتح مساعدة.

---

## ٣. الحتة اللي بتبهر: إكمال **القيم**

~~~powershell
Get-Service -Name <Tab>
~~~

هنا PowerShell **بينادي [[Get-Service]] فعلًا** ويجيب أسامي الخدمات اللي على جهازك، ويكمّل منها. فأول دوسة ممكن تجيب [[AarSvc_...]] والتانية خدمة تانية.

ونفس الفكرة:

~~~powershell
New-Item -ItemType <Tab>
~~~

بيلف على: [[File]] و [[Directory]] و [[SymbolicLink]] و [[Junction]] و [[HardLink]].

> افتكر إن سطر الـ Syntax بتاع [[New-Item]] كان بيقول [[-ItemType <string>]] بس، من غير ما يقول القيم إيه. **Tab عرف القيم والـ Syntax مكنش عارف.** دي حالة Tab بيكسب فيها المساعدة.

ونفس الحاجة على خصائص الـ objects:

~~~powershell
$d = Get-Date
$d.<Tab>
~~~

بيلف على [[Day]] و [[DayOfWeek]] و [[Hour]] و [[AddDays]] وكل اللي في الـ object.

---

## ٤. Tab ولا Ctrl+Space؟

~~~powershell
Get-PSReadLineKeyHandler -Bound | Where-Object Function -like '*Complete*'
~~~

~~~text الناتج
Key           Function            Description
---           --------            -----------
Ctrl+@        MenuComplete        Complete the input if there is a single completion, otherwise...
Ctrl+Spacebar MenuComplete        Complete the input if there is a single completion, otherwise...
Tab           TabCompleteNext     Complete the input using the next completion
Shift+Tab     TabCompletePrevious Complete the input using the previous completion
~~~

### نقرا الناتج

| الزرار | الدالة | بيعمل إيه |
|---|---|---|
| [[Tab]] | [[TabCompleteNext]] | يحط الاحتمال اللي بعده **مكان** الكلمة |
| [[Shift+Tab]] | [[TabCompletePrevious]] | يرجّع للي قبله |
| [[Ctrl+Space]] | [[MenuComplete]] | يفتح **قايمة** تحت السطر |

[[Ctrl+@]] هو نفسه [[Ctrl+Space]] (الترمنال بيبعتهم كنفس الكود).

**القايمة بتاعة [[Ctrl+Space]]** بتظهر تحت السطر، وتتحرك فيها بالأسهم الأربعة، و Enter بتختار، و Esc بتقفل. وبتورّيك ١٠ أو ٢٠ احتمال مرة واحدة بدل ما تلف عليهم واحد واحد.

### تخلي Tab يفتح قايمة كمان

~~~powershell
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
~~~

حطها في [[$PROFILE]] لو عجبتك. (شغّلناهاش هنا لأنها بتغيّر إعدادات الجلسة.)

---

## ٥. جدول: Tab بيكمّل إيه

| بتكتب | Tab بيجيب | من فين |
|---|---|---|
| [[Get-Ch]] | [[Get-ChildItem]] | الأوامر المحمّلة |
| [[Get-Service -]] | الـ parameters | تعريف الأمر |
| [[Get-Service -Name ]] | أسامي الخدمات | **بينادي الأمر فعلًا** |
| [[New-Item -ItemType ]] | File, Directory... | القيم المسموحة |
| [[cd Doc]] | [[Documents\]] | الملفات والفولدرات |
| [[$d.]] | [[Day]], [[AddDays]]... | الـ object نفسه |
| [[git che]] | [[checkout]] | لو الموديول متسطب |

---

## الخلاصة

- [[Tab]] بيبدّل الكلمة بالاحتمال اللي بعده، و [[Shift+Tab]] بيرجّع، و [[Ctrl+Space]] بيفتح قايمة.
- [[-]] + Tab = قايمة الـ parameters من غير ما تفتح مساعدة.
- الإكمال بيعرف **القيم** كمان، وأحيانًا بيعرفها أكتر من سطر الـ Syntax.
- في [[-Name]] بتاع الخدمات والعمليات، PowerShell بينادي الأمر فعلًا عشان يكمّل.
- الأوامر اللي بيعرفها هي المحمّلة في الجلسة؛ بعد تسطيب موديول جديد افتح ترمنال جديد.
- [[TabExpansion2]] هي الدالة اللي تحت، ومفيدة لو عايز تشوف الاحتمالات كنص.`,
          lines: [
            R`[[TabExpansion2]] هي الدالة اللي PowerShell بينادي عليها لما تدوس Tab، وهنا بنناديها بإيدينا عشان نشوف هي بتفكر إزاي. [[-inputScript]] النص المكتوب، و [[-cursorColumn 6]] مكان المؤشر (بعد 6 حروف، يعني في آخر [[Get-Ch]]). النتيجة object بنحفظه في [[$r]].`,
            R`[[CompletionMatches]] لستة الاحتمالات اللي لقتها، و [[CompletionText]] النص اللي هيتكتب لو اخترته، و [[ResultType]] نوعه ([[Command]] أو [[ParameterName]] أو [[ProviderItem]] للملفات). هنا طلع احتمال واحد [[Get-ChildItem]]، فـ Tab بيكمّله على طول.`,
            R`نص فيه اسم أمر وبعده مسافة وشرطة. الشرطة بتقول لدالة الإكمال إنك بتكتب اسم parameter، فهي هتقترح parameters الأمر ده بالذات مش أوامر.`,
            R`المرة دي مكان المؤشر هو طول النص ([[$s.Length]])، يعني آخره، بدل ما نعدّ الحروف بإيدينا. لو حطيت المؤشر في نص الكلام، الإكمال بيشتغل على الكلمة اللي هو فيها.`,
            R`[[-First 10]] أول 10 احتمالات بس، و [[-ExpandProperty CompletionText]] بيطلّع النص نفسه بدل جدول. هتلاقي parameters [[Get-Service]] الأول زي [[-Name]] و [[-DisplayName]]، وبعدها الـ CommonParameters زي [[-Verbose]] و [[-ErrorAction]] اللي موجودة في كل الأوامر.`,
            R`[[Get-PSReadLineKeyHandler -Bound]] بيعرض الأزرار المربوطة بوظايف في PSReadLine (الموديول اللي بيتحكم في الكتابة في الترمنال)، والفلتر بيسيب وظايف الإكمال. هتلاقي [[Tab]] مربوط بـ [[TabCompleteNext]] (يلف على الاحتمالات واحد واحد)، و [[Ctrl+Spacebar]] بـ [[MenuComplete]] (يعرضهم كلهم كقايمة تختار منها).`
          ]
        },

        {
          cmd: "اقرا رسالة الخطأ",
          title: "الخطأ مش حيطة، ده دليل استخدام",
          learn: R`تفك رسالة الخطأ: النوع، والسطر، والـ parameter اللي زعل.`,
          out: R`تصلّح غلطتك بنفسك بدل ما تنسخ الرسالة في جوجل.`,
          use: {
            prog: R`قراية الـ stack trace نفس المهارة: ابدأ من أول سطر فيه ملفك انت، مش من أول سطر في الرسالة.`,
            cs: R`رسالة الخطأ جزء من واجهة البرنامج. لما تكتب أداة، اللي بتكتبه في رسالة الخطأ هو اللي هيحدد لو حد هيستخدمها تاني.`,
          },
          desc: R`رسالة الخطأ في PowerShell مش سطر واحد، دي **object** كامل فيه: الرسالة، ونوع الاستثناء، وكود الخطأ، والسطر اللي وقع فيه ورقمه. ولما تعرف تقراها، أغلب الأخطاء بتحل نفسها.

[[$Error]] قايمة بكل الأخطاء اللي حصلت في الجلسة، والأحدث [[$Error[0]]].

وأهم أربع حاجات تقراهم:
[[$Error[0].Exception.Message]] الرسالة نفسها.
[[$Error[0].Exception.GetType().FullName]] نوع الخطأ، ودي بتفرق بين «الملف مش موجود» و «ممنوع تفتحه».
[[$Error[0].FullyQualifiedErrorId]] كود الخطأ + الأمر اللي طلّعه. **ده أحسن حاجة تبحث بيها في جوجل.**
[[$Error[0].InvocationInfo]] السطر ورقمه في السكربت.

و [[$Error[0].CategoryInfo.Category]] بيصنّف الخطأ: [[ObjectNotFound]] أو [[PermissionDenied]] أو [[InvalidArgument]]...

وفي PowerShell 7 الأخطاء بتتعرض بشكل مختصر افتراضيًا. [[$ErrorView = 'NormalView']] بيرجّع الشكل القديم الكامل، و [[Get-Error]] بيطبع كل تفاصيل آخر خطأ منسّقة.`,
          example: R`Get-Item "C:\nope\missing.txt"
$Error[0].Exception.Message
$Error[0].Exception.GetType().FullName
$Error[0].FullyQualifiedErrorId
$Error[0].InvocationInfo.ScriptLineNumber
Get-Error`,
          try: R`غلّط بنفسك: شغّل [[Get-Content "C:\Windows\System32\config\SAM"]] (ملف محمي)، وبعدين [[Get-Content "C:\nope.txt"]] (ملف مش موجود). قارن [[$Error[0].Exception.GetType().FullName]] في الحالتين.`,
          sol: R`الاتنين بيفشلوا، بس بنوعين مختلفين — وده بيحدد الحل:

| الحالة | النوع | يعني |
|---|---|---|
| ملف مش موجود | [[System.Management.Automation.ItemNotFoundException]] | المسار غلط |
| ملف محمي | [[System.UnauthorizedAccessException]] | المسار صح، الصلاحية ناقصة |

~~~text الناتج لملف مش موجود (PowerShell 7.6)
PS> Get-Item "C:\nope\missing.txt"
Get-Item: Cannot find path 'C:\nope\missing.txt' because it does not exist.

PS> $Error[0].Exception.GetType().FullName
System.Management.Automation.ItemNotFoundException

PS> $Error[0].FullyQualifiedErrorId
PathNotFound,Microsoft.PowerShell.Commands.GetItemCommand

PS> $Error[0].CategoryInfo.Category
ObjectNotFound
~~~

**الفايدة:** [[ItemNotFoundException]] معناها «صلّح المسار»، و [[UnauthorizedAccessException]] معناها «المسار صح، افتح كأدمن أو غيّر الصلاحيات». الرسالتين بالعين ممكن يشبهوا بعض، النوع بيفرق.`,
          deep: {
            why: R`أغلب الوقت الضايع في الترمنال بيروح في أخطاء مش مفهومة. والرسالة نفسها غالبًا فيها الحل: اسم الملف الغلط، أو الـ parameter اللي مش موجود، أو الصلاحية الناقصة. المشكلة إن الناس بتشوف الأحمر وتقفل.`,
            how: R`**الأربع حتت اللي تقراهم بالترتيب:**

1. [[.Exception.Message]] — الجملة بالإنجليزي. اقراها لآخرها، غالبًا فيها الاسم اللي غلط.
2. [[.CategoryInfo.Category]] — التصنيف: [[ObjectNotFound]] (مش لاقيه)، [[PermissionDenied]] (ممنوع)، [[InvalidArgument]] (قيمة غلط)، [[InvalidOperation]] (العملية مش منطقية دلوقتي)، [[ResourceUnavailable]] (مش متاح).
3. [[.Exception.GetType().FullName]] — النوع الدقيق. ده اللي تستخدمه في [[catch]] عشان تمسك نوع واحد بس:

~~~powershell
try { Get-Item "C:\nope.txt" -ErrorAction Stop }
catch [System.Management.Automation.ItemNotFoundException] { "مش موجود" }
~~~

4. [[.FullyQualifiedErrorId]] — زي [[PathNotFound,Microsoft.PowerShell.Commands.GetItemCommand]]. الجزء الأول كود الخطأ والتاني الأمر. **ده أحسن نص تحطه في جوجل**، لأنه فريد ومش بيختلف باختلاف لغة الجهاز.

**وفي السكربتات:** [[.InvocationInfo]] فيه [[ScriptLineNumber]] و [[Line]] (السطر نفسه) و [[ScriptName]]. و [[.ScriptStackTrace]] بيدّي سلسلة النداءات كلها.

**أدوات مساعدة:**

| الأمر | بيعمل إيه |
|---|---|
| [[Get-Error]] | يطبع آخر خطأ بكل تفاصيله منسّقة (PowerShell 7) |
| [[$Error.Clear()]] | يفضّي القايمة عشان تبدأ نضيف |
| [[$Error.Count]] | كام خطأ حصل في الجلسة |
| [[$ErrorView = 'NormalView']] | الشكل القديم الكامل بدل المختصر |
| [[-ErrorVariable e]] | يحط الخطأ في [[$e]] من غير ما يأثر على [[$Error]] |

**فخ مهم:** [[-ErrorAction SilentlyContinue]] بيخفي الرسالة بس **بيحط الخطأ في [[$Error]] برضه**. فلو بتسكّت أخطاء متوقعة، افتكر إن [[$Error[0]]] ممكن يبقى قديم.`,
            when: "أول ما تشوف أحمر. وفي السكربتات، جوه [[catch]] عشان تعرف نوع المشكلة وترد عليها صح.",
            mistakes: R`تبص على أول سطر وتقفل. الرسالة بتقول اسم الملف أو الـ parameter اللي غلط.

وتكتب الرسالة كلها في جوجل بالمسارات بتاعتك. استخدم [[FullyQualifiedErrorId]] بدلها.

وتفتكر إن [[$Error[0]]] هو خطأك الأخير دايمًا؛ أي أمر داخلي فشل بصمت بيحطّ نفسه هناك كمان.`
          },
          teach: R`## الفكرة

في PowerShell الخطأ مش نص أحمر، ده **object** تقدر تسأله أسئلة. هنغلّط غلطة بسيطة ونفكّ الـ object اللي طلع منها.

كل الناتج من تشغيل حقيقي على PowerShell 7.6 / ويندوز 11.

---

## ١. نغلّط

~~~powershell
Get-Item "C:\nope\missing.txt"
~~~

~~~text الناتج
Get-Item: Cannot find path 'C:\nope\missing.txt' because it does not exist.
~~~

ده الشكل المختصر بتاع PowerShell 7. سطر واحد، وفيه المعلومة الأساسية: **المسار ده مش موجود**.

> في PowerShell 5.1 نفس الخطأ بيطلع في ٥ سطور فيها [[+ CategoryInfo]] و [[+ FullyQualifiedErrorId]]. الاتنين نفس المعلومة بشكل مختلف.

---

## ٢. [[$Error[0]]]: نمسك الخطأ

~~~powershell
$Error[0].Exception.Message
~~~

~~~text الناتج
Cannot find path 'C:\nope\missing.txt' because it does not exist.
~~~

| الحتة | معناها |
|---|---|
| [[$Error]] | متغير جاهز: قايمة بكل أخطاء الجلسة |
| [[[0]]] | العنصر رقم صفر = **الأحدث** (مش الأقدم) |
| [[.Exception]] | الاستثناء اللي جوه الخطأ |
| [[.Message]] | نص الرسالة |

> [[$Error]] بيتملى من الآخر للأول: [[$Error[0]]] آخر خطأ، و [[$Error[1]]] اللي قبله.

---

## ٣. [[.GetType().FullName]]: النوع، وده اللي بيحدد الحل

~~~powershell
$Error[0].Exception.GetType().FullName
~~~

~~~text الناتج
System.Management.Automation.ItemNotFoundException
~~~

| الحتة | معناها |
|---|---|
| [[.GetType()]] | ميثود موجودة في أي object: «انت نوعك إيه؟» |
| [[.FullName]] | الاسم الكامل بالمسار بتاعه |

### ليه النوع أهم من الرسالة

~~~text مقارنة
الملف مش موجود    →  ItemNotFoundException        →  صلّح المسار
الملف محمي         →  UnauthorizedAccessException  →  افتح كأدمن
الملف مقفول ببرنامج →  IOException                  →  اقفل البرنامج
~~~

التلاتة ممكن يطلعوا رسايل متشابهة، والنوع بيفصل. وده كمان اللي بتمسك بيه نوع واحد في [[catch]]:

~~~powershell
try {
    Get-Item "C:\nope.txt" -ErrorAction Stop
}
catch [System.Management.Automation.ItemNotFoundException] {
    Write-Host "المسار غلط"
}
~~~

> [[-ErrorAction Stop]] لازمة هنا: من غيرها [[Get-Item]] بيطلّع خطأ «غير منهي» (non-terminating) و [[catch]] مش بيمسكه.

---

## ٤. [[FullyQualifiedErrorId]]: النص اللي تبحث بيه

~~~powershell
$Error[0].FullyQualifiedErrorId
~~~

~~~text الناتج
PathNotFound,Microsoft.PowerShell.Commands.GetItemCommand
~~~

### نفكه

| الجزء | معناه |
|---|---|
| [[PathNotFound]] | كود الخطأ نفسه |
| [[,]] | فاصل |
| [[Microsoft.PowerShell.Commands.GetItemCommand]] | الكلاس اللي طلّع الخطأ (يعني [[Get-Item]]) |

**ليه ده أحسن نص للبحث؟** لأنه:

- ثابت مهما اتغيرت لغة الجهاز (الرسالة بتترجم، الكود لأ).
- مفيهوش مساراتك الشخصية.
- بيحدد الأمر والمشكلة بالظبط.

فبدل ما تبحث بـ [[Cannot find path 'C:\Users\you\...' because it does not exist]]، ابحث بـ [[PathNotFound GetItemCommand]].

---

## ٥. [[CategoryInfo]]: التصنيف

~~~powershell
$Error[0].CategoryInfo.Category
~~~

~~~text الناتج
ObjectNotFound
~~~

| التصنيف | معناه | تعمل إيه |
|---|---|---|
| [[ObjectNotFound]] | مش لاقي الحاجة | صلّح الاسم/المسار |
| [[PermissionDenied]] | ممنوع | أدمن أو صلاحيات |
| [[InvalidArgument]] | قيمة غلط | راجع الـ Syntax |
| [[InvalidOperation]] | العملية مش منطقية دلوقتي | الحالة غلط (خدمة واقفة مثلًا) |
| [[ResourceUnavailable]] | مش متاح | الشبكة أو الملف مقفول |
| [[SecurityError]] | منع أمني | ExecutionPolicy مثلًا |

---

## ٦. [[InvocationInfo]]: وقع فين بالظبط

~~~powershell
$Error[0].InvocationInfo.Line.Trim()
$Error[0].InvocationInfo.ScriptLineNumber
~~~

~~~text الناتج
try { Get-Item "C:\nope\missing.txt" -ErrorAction Stop } catch { }
2
~~~

- [[.Line]] السطر اللي وقع فيه الخطأ **بنصه**.
- [[.Trim()]] بيشيل المسافات من حواليه.
- [[.ScriptLineNumber]] رقم السطر.
- وفيه كمان [[.ScriptName]] (اسم الملف) و [[.OffsetInLine]] (مكان الحرف).

ودي أهم حتة لما السكربت يبقى ٢٠٠ سطر.

---

## ٧. [[Get-Error]]: كل ده مرة واحدة

~~~powershell
Get-Error
~~~

بيطبع آخر خطأ بكل حقوله منسّقة (موجود من PowerShell 7). الشكل تقريبًا:

~~~text
Exception             :
    Type    : System.Management.Automation.ItemNotFoundException
    Message : Cannot find path 'C:\nope\missing.txt' because it does not exist.
    HResult : -2146233087
CategoryInfo          : ObjectNotFound: (C:\nope\missing.txt:String) [Get-Item], ItemNotFoundException
FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.GetItemCommand
InvocationInfo        :
    MyCommand        : Get-Item
    ScriptLineNumber : 2
...
~~~

[[Get-Error -Newest 3]] بيطبع آخر تلاتة.

---

## ٨. الفخ: [[-ErrorAction SilentlyContinue]]

~~~powershell
Get-ChildItem C:\does-not-exist-xyz -ErrorAction SilentlyContinue
$?
~~~

~~~text الناتج
False
~~~

- الشاشة فاضية: الرسالة اتخبّت.
- بس [[$?]] طلعت [[False]]، والخطأ **اتحط في [[$Error]] برضه**.

**يعني [[SilentlyContinue]] بيخفي مش بيلغي.** لو عايز الأمر ميسجّلش الخطأ خالص استخدم [[-ErrorAction Ignore]].

---

## خريطة الـ object

~~~text ErrorRecord
$Error[0]
├── Exception
│   ├── Message        ← الرسالة
│   ├── GetType()      ← النوع (للـ catch)
│   └── InnerException ← الخطأ الأصلي لو فيه
├── FullyQualifiedErrorId  ← للبحث في جوجل
├── CategoryInfo
│   └── Category       ← ObjectNotFound / PermissionDenied ...
├── TargetObject       ← الحاجة اللي الأمر كان شغال عليها
├── InvocationInfo
│   ├── Line           ← السطر بنصه
│   ├── ScriptLineNumber
│   └── ScriptName
└── ScriptStackTrace   ← سلسلة النداءات
~~~

---

## الخلاصة

- الخطأ object، و [[$Error[0]]] هو الأحدث.
- اقرا بالترتيب: [[.Exception.Message]] ← [[.CategoryInfo.Category]] ← [[.Exception.GetType().FullName]] ← [[.FullyQualifiedErrorId]].
- النوع هو اللي بيفرق بين «المسار غلط» و «الصلاحية ناقصة»، وهو اللي بتمسكه في [[catch]] بنوع محدد.
- ابحث في جوجل بـ [[FullyQualifiedErrorId]] مش بالرسالة كاملة.
- [[InvocationInfo.ScriptLineNumber]] بيقولك وقع فين في السكربت.
- [[Get-Error]] بيطبع كل ده مرة واحدة.
- [[-ErrorAction SilentlyContinue]] بيخفي الرسالة بس الخطأ بيفضل في [[$Error]] و [[$?]] بتبقى [[False]].`,
          lines: [
            R`بنعمل غلطة عمدًا: [[Get-Item]] على ملف في فولدر مش موجود. هيطبع رسالة حمرا «Cannot find path ... because it does not exist»، والـ error ده بيتسجل في [[$Error]] حتى لو الرسالة اختفت من الشاشة.`,
            R`[[$Error]] array فيها كل الأخطاء اللي حصلت في الجلسة، والأحدث في [[$Error[0]]]. [[.Exception.Message]] النص بس من غير المسار والألوان، وده اللي تحطه في لوج أو تقارنه في سكربت.`,
            R`[[GetType().FullName]] بيطلّع نوع الـ exception بالاسم الكامل، هنا [[System.Management.Automation.ItemNotFoundException]]. النوع ده اللي بيفرّق بين «مش موجود» و«مفيش صلاحية» ([[UnauthorizedAccessException]])، وتقدر تمسك نوع معين بـ [[catch]] لوحده.`,
            R`[[FullyQualifiedErrorId]] كود ثابت بالإنجليزي على شكل [[PathNotFound,Microsoft.PowerShell.Commands.GetItemCommand]]: سبب الخطأ وبعده الأمر اللي طلّعه. مش بيتترجم مع لغة ويندوز، فلو بحثت بيه هتلاقي نتايج أكتر من البحث بالرسالة.`,
            R`[[InvocationInfo]] فيه معلومات عن المكان اللي الخطأ حصل فيه، و [[ScriptLineNumber]] رقم السطر. في ترمنال تفاعلي الرقم قليل مالوش معنى، بس في سكربت طويل ده اللي يوديك على السطر اللي وقع على طول.`,
            R`[[Get-Error]] (PowerShell 7 وأحدث، مش موجود في 5.1) بيعرض آخر error بكل تفاصيله منسّقة: الـ exception والنوع والسطر والـ inner exceptions لو فيه. لو عايز أخطاء أقدم: [[Get-Error -Newest 3]].`
          ]
        }
      ]
    }
]);
