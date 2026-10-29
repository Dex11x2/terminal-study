// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "مشروع ٣: من سكربت لموديول",
      l: 3,
      time: R`حوالي ساعة ونص`,
      goal: [
        R`تحوّل [[pc.ps1]] لتلات أوامر بأسماء زي أوامر النظام: [[Set-PcSchedule]] و [[Get-PcSchedule]] و [[Stop-PcSchedule]].`,
        R`تخلي [[Get-Help]] يشتغل على أوامرك انت بالأمثلة والشرح، زي أي أمر أصلي.`,
        R`تعمل ملف [[.psd1]] فيه نسخة الأداة ومتطلباتها.`,
        R`تخلي Tab يقترح قيم انت حددتها.`,
        R`تسطّبه مرة، فيشتغل في أي نافذة من غير [[Import-Module]].`,
      ],
      use: {
        prog: R`ده الفرق بين سكربت وبين **حزمة**: اسم، ونسخة، وواجهة معلنة، وتوثيق جواها. نفس اللي بيفرّق بين ملف [[.js]] وبين package على npm.`,
        net: R`أدوات السيرفر بتتسطب مرة وتتنادى من أي سكربت أو مهمة مجدولة. الموديول هو شكل التوزيع الرسمي في PowerShell، و [[Install-Module]] بياخد نفس الشكل ده.`,
        cs: R`الموديول بيفرض حدود: إيه اللي بره (الواجهة) وإيه اللي جوه (التفاصيل). ده الـ encapsulation بالظبط، ومن غيره أي حد هيعتمد على تفاصيلك ومش هتقدر تغيّرها بعد كده.`,
        work: R`الأداة اللي محتاجة مسار كامل ومحتاج تفتكر اسم ملفها مش هتتستخدم. اللي بتتكتب باسمها وبيكمّلها الـ Tab بتبقى جزء من يومك.`,
      },
      lab: R`New-Item -ItemType Directory "$HOME\lab\PcTool" -Force
Set-Location "$HOME\lab"`,
      projects: [
        { lvl: 'صغير', t: R`نسختين جنب بعض`, what: R`خلي عندك [[PcTool\1.0.0]] و [[PcTool\1.1.0]] في نفس الفولدر (كل واحدة بـ psd1 بنسختها، ودالة [[Get-PcVer]] بترجّع رقمها)، وجرّب [[Import-Module PcTool -RequiredVersion 1.0.0]]. هتفهم ليه الـ manifest لازم يبقى فيه نسخة. من دروس ٣ و ٥.`, done: R`[[Get-Module -ListAvailable PcTool]] بيطلّع النسختين، و [[Import-Module PcTool]] من غير نسخة بيحمّل [[1.1.0]] (الأعلى)، و [[-RequiredVersion 1.0.0]] في جلسة جديدة بيخلي [[Get-PcVer]] يطبع [[1.0.0]].` },
        { lvl: 'صغير', t: R`إكمال من الواقع`, what: R`[[Register-ArgumentCompleter]] بيقرا أسماء حقيقية وقت ما تدوس Tab: أسماء الفولدرات في [[$HOME\code]] لأمر [[Open-Project]]، بدل قايمة ثابتة. من درس ٤.`, done: R`[[TabExpansion2]] على [[Open-Project ]] بيرجّع أسامي الفولدرات الموجودة بس. ولو عملت فولدر جديد، بيظهر في الاقتراحات من غير [[Import-Module]] تاني، ولو مفيش [[$HOME\code]] مفيش error.` },
        { lvl: 'متوسط', t: R`موديول أدواتك الشخصي`, what: R`موديول اسمه [[MyTools]] فيه كل دالة بتكررها: [[Get-Stamp]] و [[Write-Log]] و [[Test-Port]]، بمساعدة لكل واحدة و manifest بأسامي صريحة. سطّبه مرة، وشيل الدوال دي من [[$PROFILE]]. من دروس ١ و ٢ و ٣ و ٥.`, done: R`من [[pwsh -NoProfile]] جديد [[Test-Port localhost 80]] بيشتغل من غير Import ومن غير profile، و [[Get-Help Write-Log -Examples]] فيه مثالك، و [[Test-ModuleManifest]] بيعدّي، و [[$PROFILE]] مبقاش فيه الدوال دي.` },
        { lvl: 'متوسط', t: R`وزّعه على حد تاني`, what: R`اضغط فولدر الموديول في [[.zip]] بـ [[Compress-Archive]]، وابعته لزميلك، وخليه يفك الضغط في [[Documents\PowerShell\Modules]]. لو اشتغل عنده من غير ما تشرحله حاجة، يبقى الموديول متكامل. من درس ٥.`, done: R`على جهاز تاني (أو فولدر تجريبي زوّدته لـ [[PSModulePath]]) [[Get-Command -Module PcTool]] بيطلّع التلات أوامر بس، و [[Get-Help Set-PcSchedule]] شغالة، والـ Tab بيقترح الدقايق. ولو الـ zip فيه فولدر زيادة فوق [[PcTool]] هتلاحظ إنه مبيتلاقيش، وتصلّحه.` },
        { lvl: 'كبير', t: R`PcTool جاهز للنشر`, what: R`قسّم الموديول لـ [[Public\]] و [[Private\]] (ملف لكل دالة، والـ psm1 بيعمل dot-source لهم ويصدّر اللي في [[Public]] بس)، و manifest بأسامي صريحة، ومساعدة لكل أمر، و completer. وفوقهم [[build.ps1]] بيعمل [[Test-ModuleManifest]] وفحص المساعدة (تحدي درس ٢) و [[check-module.ps1]] (تحدي درس ٣)، وبعدين zip باسم فيه النسخة، ويكتب لوج بكل خطوة. من الخمس دروس.`, done: R`[[.\build.ps1]] بيطلّع [[PcTool-1.2.0.zip]] وسطر في اللوج لكل خطوة. تشغيله تاني بنفس النسخة بيرفض بكود ١ ومبيكتبش فوق الـ zip. أمر من غير [[.SYNOPSIS]] أو اسم غلط في [[FunctionsToExport]] بيوقّف البناء برسالة فيها الاسم. والـ zip لما يتفك في فولدر تجريبي في [[PSModulePath]] بيشتغل من نافذة [[-NoProfile]].`, ext: R`زوّد اختبارات Pester لكل أمر عام، و [[CHANGELOG.md]] بيتقري منه رقم النسخة، وخطوة [[Publish-Module -WhatIf]] للـ PowerShell Gallery، وشغّل [[build.ps1]] في GitHub Actions على كل push.` },
        { lvl: 'فكرة', t: R`موديول لشغلك انت`, what: R`بص على الحاجات اللي بتكتبها في الترمنال كل يوم في شغلك (أوامر git طويلة، تشغيل مشروع بإعداداته، تنضيف فولدرات build، فتح لوجات) واختار ٤ منهم يبقوا أوامر بأسماء [[Verb-Noun]] في موديول واحد. انت اللي بتقرر الأسامي والـ parameters والاقتراحات.`, done: R`الموديول بيتحمّل لوحده من نافذة جديدة، ومفيش تحذير «unapproved verbs»، وكل أمر ليه [[Get-Help]] بمثال حقيقي، وأي أمر بيغيّر حاجة فيه [[-WhatIf]]، وكل parameter بقيمة متكررة ليه اقتراح Tab.`, ext: R`خليه يقرا إعداداته من ملف [[.psd1]] جنبه بدل ما تكون مكتوبة في الكود، وزوّد نسخة [[1.1.0]] بأمر جديد واحفظ القديمة جنبها، وشاركه مع فريقك من repo بـ README.` },
      ],
      n: R`الأداة شغالة، بس لسه ملف. في القسم ده بتبقى **أوامر**: ليها أسماء زي أوامر النظام، ومساعدة بتتقري بـ [[Get-Help]]، ونسخة، وإكمال تلقائي، وبتتحمّل لوحدها. ٥ خطوات على الأداة اللي بنيناها في مشروع ١`,
      items: [
        {
          cmd: "مشروع ٣ — من سكربت لموديول",
          title: "حوّل الأداة لأوامر بأسماء زي أوامر النظام",
          learn: R`الفرق بين سكربت بيتشغّل وبين دالة بتتنادى، وإزاي تختار اسم الأمر.`,
          out: R`[[Set-PcSchedule off -In 30]] بدل [[.\pc.ps1 off -In 30]].`,
          use: {
            prog: R`السكربت بيخرج بكود، والدالة بترجّع قيمة أو ترمي error. ده نفس الفرق بين process وبين function call: الأول بيتكلم بأرقام، والتاني بيتكلم بقيم وأنواع.`,
            cs: R`[[Export-ModuleMember]] هي الواجهة المعلنة. اللي مش مكتوب فيها تفصيلة داخلية، تقدر تغيّرها بكرة من غير ما تكسر حد.`,
          },
          desc: R`الأداة في مشروع ١ ملف [[.ps1]]. عشان تشغّلها لازم تعرف مسارها، والمسار ده بيتغيّر من جهاز لجهاز. الموديول بيحلّ ده: بتكتب الوظايف كـ **دوال**، وبتنادي الدوال بأسمائها من أي مكان.

بس مش مجرد نسخ ولزق. فيه تلات حاجات بتتغيّر:

**١. الاسم بقى فعل-اسم.** السكربت كان ليه [[-Action off]]، وده كان صح للسكربت. في الموديول الفعل بيبقى جزء من **اسم الأمر** نفسه، زي كل أوامر PowerShell: [[Set-PcSchedule]] و [[Get-PcSchedule]] و [[Stop-PcSchedule]]. والفعل لازم يكون من القايمة المعتمدة ([[Get-Verb]])، وإلا [[Import-Module]] هيطلّع تحذير.

**٢. مفيش [[exit]].** [[exit]] جوه دالة في موديول بيقفل **الجلسة كلها**، مش الدالة. بدالها: [[return]] للخروج، و [[throw]] للفشل، و**ترجّع object** للنجاح.

**٣. اللي مش في [[Export-ModuleMember]] مبيبانش.** [[Write-PcLog]] و [[Save-PcState]] دوال داخلية، مش محتاج حد بره يشوفها. ودي ميزة مش نقص: لو محدش شايفها، تقدر تغيّرها بكرة.

وملاحظة في التخزين: جوه موديول، المتغيرات المشتركة بتتكتب [[$script:StatePath]] بدل [[$StatePath]]. الـ [[$script:]] معناها «واحد لكل الموديول»، فكل الدوال بتشوف نفس القيمة.`,
          example: R`# PcTool\PcTool.psm1
$script:StatePath = "$env:LOCALAPPDATA\pc-tool\state.json"

function Write-PcLog {
    param([string]$Text)
    Add-Content "$env:LOCALAPPDATA\pc-tool\pc.log" $Text -Encoding utf8
}

function Set-PcSchedule {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Mandatory, Position = 0)]
        [ValidateSet('off', 'restart')]
        [string]$Kind,

        [ValidateRange(0, 10080)]
        [int]$In = 0
    )
    $at   = (Get-Date).AddSeconds($In * 60)
    $flag = if ($Kind -eq 'off') { '/s' } else { '/r' }
    if (-not $PSCmdlet.ShouldProcess("$Kind at $at", 'schedule')) { return }

    shutdown.exe $flag /t ($In * 60)
    if ($LASTEXITCODE -ne 0) { throw "shutdown.exe رجّع $LASTEXITCODE" }

    Write-PcLog "اتجدول $Kind"
    [pscustomobject]@{ Kind = $Kind; At = $at }
}

Export-ModuleMember -Function Set-PcSchedule`,
          lines: [
            R`متغير على مستوى الموديول كله، وأي دالة في الـ [[.psm1]] تقدر تقراه. على أعلى مستوى في الملف [[$script:StatePath]] و [[$StatePath]] نفس المتغير، بس [[$script:]] بتوضّح النية وبتفكّرك إن أي دالة عايزة **تغيّره** لازم تكتب [[$script:]]، وإلا هتعمل نسخة محلية والأصل يفضل زي ما هو. ومش بيبان برّه لأن [[Export-ModuleMember]] تحت مش بيصدّر متغيرات.`,
            R`دالة داخلية للّوج. اسمها مش مكتوب في [[Export-ModuleMember]] تحت، فاليوزر مش هيلاقيها في [[Get-Command]] ومش هيقدر يناديها، بس دوال الموديول نفسه بتناديها عادي.`,
            R`بتاخد نص الرسالة اللي هتتكتب في اللوج. مفيش مستوى زي مشروع ١، عشان نركّز على فكرة الموديول.`,
            R`بيضيف النص في آخر [[pc.log]] جوه فولدر الأداة، وبيعمل الملف لو مش موجود (بس الفولدر لازم يكون موجود). [[-Encoding utf8]] عشان اللوج بالعربي، والمسار والقيمة مكتوبين من غير [[-Path]] و [[-Value]] لأنهم positional بالترتيب ده.`,
            R`قفلة [[Write-PcLog]].`,
            R`أول أمر عام في الموديول. الاسم [[Verb-Noun]]: [[Set]] فعل معتمد، و [[Pc]] في أول الاسم بيميّز أوامرك عن أي موديول تاني. فبدل [[.\pc.ps1 off]] اليوزر هيكتب [[Set-PcSchedule off]] من أي مكان. ولو استخدمت فعل مش معتمد، [[Import-Module]] بيطلّع تحذير.`,
            R`بيخلي الدالة advanced function بتتصرف زي cmdlet: [[SupportsShouldProcess]] بتدّي [[-WhatIf]] و [[-Confirm]] وبتشغّل [[$PSCmdlet.ShouldProcess]]، ومعاها [[-Verbose]] و [[-ErrorAction]] ببلاش. لازم ييجي قبل [[param(]] على طول.`,
            R`بداية parameters الدالة، بنفس قواعد [[param]] بتاعة السكربت.`,
            R`[[Mandatory]]: لو اليوزر مكتبش [[$Kind]] PowerShell بيسأله عليه بدل ما الدالة تشتغل من غيره، وفي جلسة مش تفاعلية بيرمي error. و [[Position = 0]] بتخلي [[Set-PcSchedule off]] تساوي [[Set-PcSchedule -Kind off]].`,
            R`القيمتين المسموحين بس. أي قيمة تانية بتترفض قبل ما الدالة تشتغل، و Tab بيلف عليهم.`,
            R`[[$Kind]] نص فيه [[off]] أو [[restart]]. مفيش قيمة افتراضية لأنه [[Mandatory]]، والفاصلة لأن بعده parameter تاني.`,
            R`المهلة من صفر لـ 10080 دقيقة (أسبوع). أي رقم برّه المدى بيترفض برسالة فيها الحد قبل ما نوصل لـ [[shutdown.exe]].`,
            R`المهلة بالدقايق كرقم صحيح، والافتراضي صفر يعني حالًا. ومن غير [[Position]] فلازم يتكتب باسمه: [[-In 30]].`,
            R`قفلة الـ parameters.`,
            R`وقت التنفيذ: دلوقتي + المهلة بالثواني. بنحسبه هنا عشان نعرضه في رسالة المعاينة ونرجّعه في الـ object في الآخر.`,
            R`[[if]] في PowerShell بترجّع قيمة، فبنختار الـ flag في سطر واحد: [[/s]] لقفل الجهاز و [[/r]] لإعادة التشغيل.`,
            R`بوابة المعاينة: مع [[-WhatIf]] بتطبع سطر [[What if]] فيه [[$Kind at $at]] وترجّع [[False]]، و [[return]] تخرج قبل أي تنفيذ. ومع [[-Confirm]] بتسأل اليوزر الأول.`,
            R`السطر الوحيد اللي بيغيّر حاجة في الجهاز: بيجدول القفل أو الريستارت بعد المهلة بالثواني. الأقواس حوالين [[$In * 60]] لازمة، لأن في وضع الأوامر من غيرها [[*]] و [[60]] كانوا هيتبعتوا لـ [[shutdown]] كـ arguments منفصلة بدل ما تتحسب.`,
            R`[[shutdown.exe]] برنامج خارجي مبيرميش error، فبنفحص كود خروجه بنفسنا. ولو فشل نستخدم [[throw]] مش [[exit]]: الدالة دي بتتنادى من الترمنال مباشرة، و [[exit]] جوه دالة اتنادت من الـ prompt بيقفل الجلسة كلها، أما [[throw]] بيوقف الأمر بس واليوزر يقدر يمسكه بـ [[try/catch]].`,
            R`بنسجّل إن المعاد اتعمل بالدالة الداخلية. اليوزر مش شايف [[Write-PcLog]]، بس الدالة دي جوه نفس الموديول فشايفاها عادي.`,
            R`بترجّع object فيه النوع والوقت بدل ما تطبع نص. اللي مناديها يقدر يكتب [[(Set-PcSchedule off -In 30).At]] أو يمرّره في pipeline، والـ [[;]] بتفصل الخصائص لما تكون في سطر واحد.`,
            R`قفلة [[Set-PcSchedule]].`,
            R`بيحدد الواجهة العامة: [[Set-PcSchedule]] بس اللي هيبان برّه الموديول، و [[Write-PcLog]] و [[$StatePath]] بيفضلوا جوه. من غير السطر ده الـ [[.psm1]] بيصدّر كل الدوال، فالدوال الداخلية كانت هتبان لليوزر وتلخبطه.`
          ],
          try: R`اعمل الملف، وشغّل [[Import-Module .\PcTool\PcTool.psm1 -Force]]، وبعدين [[Get-Command -Module PcTool]]. وبعدين جرّب [[Get-Command Write-PcLog]] وشوف هيلاقيها ولا لأ. وجرّب تسمّي دالة [[Cancel-PcSchedule]] وشوف التحذير اللي هيطلع.`,
          practice: [
            { lvl: 'سريع', t: R`اعمل موديول تجريبي فيه دالة [[Stop-Bad]] جواها [[exit 1]] ودالة [[Stop-Good]] جواها [[throw 'bad']]، وشغّل [[pwsh -NoProfile -Command "Import-Module .\Ex.psm1; Stop-Bad; 'after'"]].`, done: R`كلمة [[after]] مبتتطبعش خالص وكود الخروج ١ (من bash [[$?]]، ومن PowerShell [[$LASTEXITCODE]]): الـ [[exit]] قفل الجلسة كلها مش الدالة. ومع [[try { Stop-Good } catch { 'caught' }; 'after']] بتطبع [[caught]] وبعدها [[after]] والجلسة كمّلت.` },
            { lvl: 'تطبيق', t: R`زوّد [[Get-PcSchedule]] بتقرا [[$script:StatePath]] وترجّع object فيه [[Kind]] و [[At]]، ولو الملف مش موجود متطبعش حاجة ومترميش. وصدّرها في [[Export-ModuleMember]].`, done: R`من غير ملف حالة [[$null -eq (Get-PcSchedule)]] بيطبع [[True]] ومفيش أي error، وبعد ما تكتب الملف بإيدك (JSON فيه Kind و At) [[(Get-PcSchedule).Kind]] بيطبع القيمة اللي كتبتها، و [[Get-Command -Module PcTool]] فيه الأمرين.` },
            { lvl: 'تحدي', t: R`اختبر الدالة الداخلية [[Write-PcLog]] من غير ما تصدّرها: نادِها جوه نطاق الموديول نفسه بـ [[& (Get-Module PcTool) { Write-PcLog 'test' }]]، وفسّر ليه دي للاختبار بس ومش طريقة استخدام.`, done: R`سطر [[test]] اتكتب في [[pc.log]]، وفي نفس الجلسة [[Get-Command Write-PcLog]] لسه بيرمي [[CommandNotFoundException]]، وتقدر تقول في جملة إن أي حد بيعتمد على الطريقة دي هيتكسر لما تغيّر تفاصيلك الداخلية.` },
          ],
          flag: "script",
          deep: {
            why: R`السكربت بيحل مشكلة واحدة. الموديول بيحل مشكلة التوزيع: اسم ثابت، وواجهة معلنة، وتفاصيل مخبّية. ولما تيجي تغيّر اسم ملف الحالة بعد شهر، هتغيّره في مكان واحد ومحدش هيحس، لأن محدش كان شايفه أصلًا.`,
            how: R`[[Import-Module]] بيشغّل ملف الـ [[.psm1]] في **نطاق خاص بالموديول**. كل دالة ومتغير بيتعرّفوا هناك، مش في جلستك. وبعدين بيشوف [[Export-ModuleMember]] ويطلّع اللي فيها بس لجلستك.

من غير [[Export-ModuleMember]] خالص، كل الدوال بتبان. أول ما تكتب السطر ده، بتبقى بتقول «دول بس»، والباقي بيتخبّي.

[[$script:]] في موديول معناها «على مستوى الموديول»، مش على مستوى الملف اللي بتشغّله. فلو عندك تلات دوال بتقرا [[$script:StatePath]]، كلهم بيشوفوا نفس القيمة، وتقدر تغيّرها من دالة وتشوفها في التانية.

الأفعال المعتمدة ([[Get-Verb]]) ٩٨ فعل مقسومين على مجموعات: [[Common]] زي [[Get]] و [[Set]]، و [[Lifecycle]] زي [[Start]] و [[Stop]]، و [[Data]] زي [[Import]] و [[Export]]. الفكرة إن اللي شايف اسم أمرك لأول مرة يبقى متوقّع هو بيعمل إيه.`,
            when: R`أول ما الأداة تبقى حاجة هتستخدمها كل يوم، أو حاجة هتدّيها لحد تاني، أو لما يبقى عندك أكتر من سكربت بيشاركوا نفس الدوال.`,
            mistakes: R`تكتب [[exit 1]] جوه دالة في موديول فتقفل جلسة اللي بينادي. أو تنسى [[Export-ModuleMember]] فتلاقي دوالك الداخلية كلها ظاهرة. أو تسمّي الدالة بفعل مش معتمد ([[Cancel-]] أو [[Delete-]]) فتاخد تحذير ومحدش يلاقي أمرك. أو تستخدم [[$StatePath]] من غير [[$script:]] فكل دالة تشتغل على نسخة فاضية.`
          },
          teach: R`## من فين لفين

قبل، في مشروع ١، كنت بتكتب:

~~~powershell السكربت
.\pc.ps1 off -In 30
~~~

ولازم تكون واقف في الفولدر الصح، أو تكتب المسار كامل. بعد القسم ده:

~~~powershell الموديول
Set-PcSchedule off -In 30
~~~

من أي مكان، وبإكمال تلقائي، وبـ [[Get-Help]] شغالة عليه.

---

## ١. الاسم: فعل-اسم مش [[-Action]]

السكربت كان بياخد [[-Action off]]. ده كان منطقي: ملف واحد بيعمل أكتر من حاجة، فمحتاج يعرف أنهي حاجة.

الموديول مش ملف واحد — ده **مجموعة أوامر**. فالفعل بيطلع برّه ويبقى جزء من الاسم:

| السكربت | الموديول |
|---|---|
| [[.\pc.ps1 off -In 30]] | [[Set-PcSchedule off -In 30]]: الفعل [[Set]] بقى جزء من الاسم |
| [[.\pc.ps1 cancel]] | [[Stop-PcSchedule]]: [[Stop]] لأنه بيوقف معاد مستني |
| [[.\pc.ps1 status]] | [[Get-PcSchedule]]: [[Get]] لأنه بيقرا من غير ما يغيّر حاجة |

ودي مش حاجة شكلية. دلوقتي [[Get-Command -Noun PcSchedule]] بتوريك كل اللي ممكن تعمله بالمعاد ده، و [[Get-Command -Verb Get]] بتحطّ أمرك مع كل أوامر القراية في النظام.

> الفعل لازم يكون من القايمة المعتمدة. شوفها بـ [[Get-Verb]].

---

## ٢. الفعل اللي مش معتمد بيطلّع تحذير

جرّبت أسمّي دالة [[Cancel-PcSchedule]] — [[Cancel]] مش فعل معتمد:

~~~powershell PowerShell 7.6 · ويندوز 11
Import-Module .\Bad\Bad.psm1 -Force
~~~

~~~text الناتج (اتشغّل فعلًا)
WARNING: The names of some imported commands from the module 'Bad' include
unapproved verbs that might make them less discoverable. To find the commands
with unapproved verbs, run the Import-Module command again with the Verbose
parameter. For a list of approved verbs, type Get-Verb.
~~~

الموديول بيشتغل، بس اللي بيدوّر مش هيلاقيك. والأفعال اللي معناها «ألغي»:

~~~text Get-Verb | Where-Object Verb -in "Stop","Remove","Disable","Clear"  (اتشغّل فعلًا)
Verb     Group       Description
----     -----       -----------
Clear    Common      Removes all the resources from a container but does not delete the container
Remove   Common      Deletes a resource from a container
Disable  Lifecycle   Configures a resource to an unavailable or inactive state
Stop     Lifecycle   Discontinues an activity
~~~

إحنا بنوقف نشاط متجدول، يبقى [[Stop]].

---

## ٣. [[exit]] ممنوعة جوه موديول

في السكربت كان آخر سطر:

~~~powershell مشروع ١
switch ($Action) {
    'cancel' { exit (Invoke-Cancel) }
}
~~~

جوه موديول ده **كارثة**: [[exit]] مش بتخرج من الدالة، دي بتقفل نافذة PowerShell كلها. اللي بينادي أمرك هيلاقي الجلسة بتاعته اتقفلت.

البديل تلاتة، كل واحد لحالة:

| الحالة | في السكربت | في الموديول |
|---|---|---|
| خلصت بنجاح | [[exit 0]] | [[return]] أو ترجّع object |
| فشلت | [[exit 2]] | [[throw "السبب"]] |
| مفيش حاجة تتعمل | [[exit 0]] | [[return]] من غير قيمة |

و [[throw]] أحسن من [[exit 2]]: الرقم ٢ لازم اللي مناديك يعرف معناه، أما رسالة الـ error فبتقول السبب لأي حد.

---

## ٤. اللي بره واللي جوه

~~~powershell آخر سطر في PcTool.psm1
Export-ModuleMember -Function Set-PcSchedule, Get-PcSchedule, Stop-PcSchedule
~~~

[[Write-PcLog]] و [[Save-PcState]] مش في القايمة، فمش هيبانوا. جرّبت:

~~~text بعد Import-Module (اتشغّل فعلًا)
Get-Command -Module PcTool

Name              CommandType
----              -----------
Get-PcSchedule       Function
Set-PcSchedule       Function
Stop-PcSchedule      Function

Get-Command Write-PcLog  ->  مفيش
~~~

ودي الفايدة الحقيقية: [[Write-PcLog]] بتاعتي، أقدر أغيّرها أو أشيلها بكرة. لو كانت ظاهرة، يمكن حد بنى عليها وبقيت مربوط بيها.

---

## ٥. [[$script:]] للمتغيرات المشتركة

~~~powershell أول سطر في الموديول
$script:StatePath = "$env:LOCALAPPDATA\pc-tool\state.json"
~~~

من غير [[$script:]]، كل دالة بتشوف متغير فاضي وبتعمل واحد جديد لنفسها. مع [[$script:]]، التلات دوال بيشوفوا نفس الملف.

---

## الخلاصة

- الاسم فعل-اسم من [[Get-Verb]]، وإلا محدش هيلاقيك.
- [[exit]] تتشال: [[return]] للخروج، [[throw]] للفشل، object للنجاح.
- [[Export-ModuleMember]] هي الواجهة؛ اللي مش فيها تفصيلة داخلية.
- [[$script:]] للمتغير اللي كل الدوال بتشاركه.`,
          sol: R`الأمر اللي بيحمّل الموديول ويوريك إيه اللي ظاهر منه، والنتيجة الحقيقية. و [[Get-Command Write-PcLog]] بيرجع فاضي، لأنها مش في [[Export-ModuleMember]].`,
          solCode: R`Import-Module .\PcTool\PcTool.psm1 -Force
Get-Command -Module PcTool | Format-Table -AutoSize Name, CommandType

# الناتج (اتشغّل فعلًا على ويندوز 11 و PowerShell 7.6):
# Name              CommandType
# ----              -----------
# Get-PcSchedule       Function
# Set-PcSchedule       Function
# Stop-PcSchedule      Function`
        },

        {
          cmd: "مشروع ٣ — المساعدة بتتكتب في الكود",
          title: "خلي Get-Help يشتغل على أوامرك انت",
          learn: R`تكتب المساعدة كتعليق فوق الدالة، فـ [[Get-Help]] يقراها زي أي أمر أصلي.`,
          out: R`[[Get-Help Set-PcSchedule -Examples]] بتطلّع أمثلتك انت.`,
          use: {
            prog: R`التوثيق اللي جنب الكود بيتحدّث معاه؛ اللي في ملف تاني بيبقى كداب بعد شهر. دي نفس فكرة docstrings في Python و JSDoc في JavaScript.`,
            work: R`بعد ٦ شهور انت هتبقى «حد تاني» على كودك. المساعدة دي ليك انت قبل ما تبقى لحد غيرك.`,
            cs: R`المساعدة جزء من الواجهة زي التوقيع بالظبط: الاتنين بيقولوا للمستخدم يعمل إيه من غير ما يفتح الكود.`,
          },
          desc: R`في درس «[[Update-Help]] و [[about_]]» اتعلمت تقرا مساعدة الأوامر. دلوقتي هتكتب واحدة.

PowerShell بيقرا **تعليق بشكل معيّن** فوق الدالة ويحوّله لمساعدة كاملة. التعليق ده بيتكتب بين [[<#]] و [[#>]]، وجواه أقسام بتبدأ بنقطة:

[[.SYNOPSIS]] سطر واحد: الأمر بيعمل إيه.
[[.DESCRIPTION]] الشرح الكامل.
[[.PARAMETER Kind]] شرح لكل parameter (الاسم لازم يطابق).
[[.EXAMPLE]] مثال، وتحته سطر بيشرحه.
[[.OUTPUTS]] بيرجّع إيه.
[[.LINK]] أوامر ليها علاقة.

واللي بيحصل بعدها إن [[Get-Help Set-PcSchedule]] بتشتغل زي ما بتشتغل على [[Get-ChildItem]] بالظبط. ومعاها [[-Examples]] و [[-Detailed]] و [[-Full]].

والجزء اللي مش بتكتبه: [[SYNTAX]]. ده PowerShell بيولّده لوحده من الـ [[param]] بتاعك. يعني لو غيّرت parameter، سطر الاستخدام بيتحدّث من غير ما تلمس التعليق.`,
          example: R`# PcTool\PcTool.psm1
function Set-PcSchedule {
<#
.SYNOPSIS
    يجدول قفل الجهاز أو إعادة تشغيله بعد مهلة.
.DESCRIPTION
    بينادي shutdown.exe ويسجّل المعاد في ملف حالة، عشان Get-PcSchedule يعرف يقراه.
    بيدعم -WhatIf و -Confirm، وبيرمي error لو shutdown.exe فشل.
.PARAMETER Kind
    off لقفل الجهاز، أو restart لإعادة التشغيل.
.PARAMETER In
    بعد كام دقيقة. 0 يعني حالًا، والحد الأقصى 10080 دقيقة (أسبوع).
.PARAMETER Force
    متسألش قبل التنفيذ. ضرورية في أي مهمة مجدولة.
.EXAMPLE
    Set-PcSchedule off -In 30
    يقفل الجهاز بعد نص ساعة.
.EXAMPLE
    Set-PcSchedule restart -In 5 -WhatIf
    يقولك هيعمل إيه من غير ما ينفّذ.
.OUTPUTS
    PcTool.Schedule
.LINK
    Get-PcSchedule
#>
    [CmdletBinding(SupportsShouldProcess)]
    [OutputType('PcTool.Schedule')]
    param(
        [Parameter(Mandatory, Position = 0)]
        [ValidateSet('off', 'restart')]
        [string]$Kind
    )
}`,
          lines: [
            R`نفس الدالة اللي فاتت، وهنضيف جواها المساعدة. مكان التعليق مهم: أول حاجة بعد [[{]] مباشرة.`,
            R`[[<#]] بيفتح تعليق متعدد السطور و [[#>]] بيقفله. PowerShell بيقرا التعليق ده كـ comment-based help لو كان في أول جسم الدالة (أو قبل [[function]] مباشرة، أو في آخر الجسم)، وبيعرضه في [[Get-Help]]. لو حطيت قبله سطر كود جوه الدالة، بيبقى تعليق عادي ومحدش يشوفه.`,
            R`كلمة مفتاحية بتبدأ بنقطة، واللي تحتها ملخص سطر واحد للأمر. بيظهر تحت [[SYNOPSIS]] في [[Get-Help Set-PcSchedule]]، وفي عمود [[Synopsis]] لما [[Get-Help Set-Pc*]] تلاقي أكتر من أمر. ([[Get-Command]] مبيعرضوش، جرّبناها.)`,
            R`الملخص نفسه: جملة واحدة بتقول الأمر بيعمل إيه من غير تفاصيل. خليها قصيرة لأنها اللي بتظهر جنب الاسم في نتايج البحث.`,
            R`اللي تحتها الشرح الكامل، وبيظهر تحت [[DESCRIPTION]] في [[Get-Help]] العادية وفي [[-Full]]. هنا تكتب الأمر بيشتغل إزاي وإيه اللي محتاج اليوزر يعرفه قبل ما يستخدمه.`,
            R`أول سطر من الشرح: بيقول الأمر بيعتمد على إيه ([[shutdown.exe]]) وبيسيب أثر فين (ملف الحالة)، عشان اللي بيقرا يعرف إن فيه ملف بيتكتب على جهازه.`,
            R`تاني سطر: بيعلن السلوك اللي يهم اليوزر، إنه بيدعم [[-WhatIf]] و [[-Confirm]] وإنه بيرمي error لو فشل. السطور اللي تحت نفس الكلمة المفتاحية بتتعرض مع بعض كفقرة واحدة.`,
            R`بداية شرح الـ parameter اللي اسمه [[Kind]]. الاسم لازم يطابق اسم المتغير في [[param]] من غير [[$]]؛ لو اتكتب غلط [[Get-Help]] بيتجاهل الشرح في صمت (جرّبناها باسم مش موجود ومطلعش error).`,
            R`الشرح نفسه، وبيظهر تحت [[-Kind]] في [[Get-Help Set-PcSchedule -Parameter Kind]] وفي [[-Full]]. اكتب القيم المسموحة ومعنى كل واحدة.`,
            R`شرح [[In]]: كل parameter ليه [[.PARAMETER]] لوحده بنفس اسمه.`,
            R`بيقول الوحدة (دقايق) ومعنى الصفر والحد الأقصى، عشان اليوزر ميضطرش يجرّب لحد ما [[ValidateRange]] يرفضه.`,
            R`شرح [[Force]]. خلي بالك: [[param]] في المثال المختصر ده فيه [[$Kind]] بس، فـ [[Get-Help]] هيتجاهل شرح [[In]] و [[Force]] لحد ما الـ parameters دي تبقى موجودة فعلًا في الدالة الكاملة.`,
            R`بيشرح إن [[-Force]] بتلغي سؤال التأكيد، وليه ضرورية في مهمة مجدولة: مفيش حد قدام الشاشة يرد على السؤال.`,
            R`بداية مثال. كل [[.EXAMPLE]] بيتعرض بعنوان [[EXAMPLE 1]] و [[EXAMPLE 2]]، وبيظهر في [[Get-Help -Examples]] و [[-Full]]. الأمثلة غالبًا أول حاجة اليوزر بيدوّر عليها.`,
            R`أول سطر تحت [[.EXAMPLE]] بيتعرض كأمر وقبله prompt زي [[PS >]]، فاكتبه زي ما اليوزر هيكتبه بالظبط بحيث ينفع ينسخه ويشغّله.`,
            R`السطور اللي بعد سطر الأمر بتتعرض كشرح للمثال: بتقول هيحصل إيه لو شغّلته.`,
            R`مثال تاني بيوري الأمان: لما يكون فيه مثال بـ [[-WhatIf]]، اليوزر بيعرف إنه يقدر يجرّب من غير خطر قبل ما يقفل جهازه بجد.`,
            R`الأمر بـ [[-WhatIf]]: ريستارت بعد ٥ دقايق، بس معاينة، فآمن تنسخه وتجرّبه.`,
            R`شرح المثال: بيطبع سطر [[What if]] باللي كان هيعمله ومبينفّذش حاجة.`,
            R`بيوصف نوع اللي الأمر بيرجّعه، وبيظهر تحت [[OUTPUTS]] في [[Get-Help -Full]]. ده توثيق للقارئ بس، مش بيأثر على الكود.`,
            R`اسم وصفي للـ object الراجع. عشان الـ object يحمل الاسم ده فعلًا لازم يتحط في خاصية [[PSTypeName]] وقت إنشائه؛ هنا بيقول لليوزر يتوقع إيه.`,
            R`أوامر أو لينكات ليها علاقة، بتظهر تحت [[RELATED LINKS]] في آخر [[Get-Help]]. كل [[.LINK]] فيها أمر واحد أو URL واحد.`,
            R`الأمر الشقيق اللي بيقرا المعاد، عشان اللي بيقرا مساعدة [[Set]] يعرف إن فيه [[Get]] يتأكد بيه.`,
            R`بعد قفلة التعليق على طول. الترتيب جوه الدالة: المساعدة، وبعدها attributes الدالة، وبعدها [[param(]]. و [[SupportsShouldProcess]] زي الخطوة اللي فاتت بتدّي [[-WhatIf]] و [[-Confirm]].`,
            R`بيعلن نوع الناتج في بيانات الأمر نفسه، فتقدر تقراه بـ [[(Get-Command Set-PcSchedule).OutputType]]، و PowerShell بيستخدمه في الإكمال بعد النقطة. مش بيفرض حاجة: لو الدالة رجّعت نوع تاني محدش هيعترض. ([[Get-Command]] ملوش parameter اسمه [[-OutputType]]، جرّبناها في 5.1 و 7.)`,
            R`بداية الـ parameters، مختصرة هنا عشان نركّز على المساعدة.`,
            R`[[$Kind]] لازم يتكتب، وينفع من غير اسمه كأول قيمة. والمساعدة بتعرض ده لوحدها في [[SYNTAX]] كـ [[Set-PcSchedule [-Kind] <String>]]: الأقواس المربعة حوالين [[-Kind]] معناها إن اسمه اختياري، من غير ما تكتب ده في التعليق.`,
            R`القيمتين المسموحين بس. التحقق ده في الكود مش في المساعدة، فلازم تحدّث [[.PARAMETER Kind]] بإيدك لو زوّدت قيمة.`,
            R`النوع والاسم. ده الاسم اللي [[.PARAMETER Kind]] فوق بيطابقه.`,
            R`قفلة الـ parameters.`,
            R`قفلة [[Set-PcSchedule]].`
          ],
          try: R`ضيف التعليق ده، واعمل [[Import-Module ... -Force]]، وشغّل [[Get-Help Set-PcSchedule]] وبعدين [[Get-Help Set-PcSchedule -Examples]]. وبعدين **شيل** parameter من [[param]] وشوف قسم [[SYNTAX]] اتغيّر لوحده ولا لأ.`,
          practice: [
            { lvl: 'سريع', t: R`بعد ما تضيف التعليق، اطبع [[(Get-Help Set-PcSchedule).Synopsis]]، وبعدين [[Get-Help Set-PcSchedule -Parameter In]].`, done: R`الأول بيطبع سطر الـ [[.SYNOPSIS]] بتاعك بالحرف، والتاني بيطبع شرح [[-In]] اللي كتبته ومعاه سطور [[Required?]] و [[Position?]] و [[Default value]] اللي PowerShell حسبها لوحده من الـ [[param]].` },
            { lvl: 'تطبيق', t: R`اكتب مساعدة كاملة لـ [[Get-PcSchedule]] و [[Stop-PcSchedule]]: سطر [[.SYNOPSIS]]، و [[.PARAMETER]] لكل parameter، ومثالين حقيقيين لكل أمر.`, done: R`[[(Get-Help Stop-PcSchedule).examples.example.Count]] بيطبع [[2]]، و [[Get-Help Get-PcSchedule -Examples]] بيطلّع أمثلتك انت، وكل parameter في [[Get-Help ... -Full]] تحته شرح مش فاضي.` },
            { lvl: 'تحدي', t: R`اغلط عمدًا مرتين: مرة اكتب [[.EXAMPEL]] بدل [[.EXAMPLE]]، ومرة [[.PARAMETER Kindd]] بدل [[Kind]]. وبعدين اكتب [[Test-PcHelp.ps1]] بيلف على [[Get-Command -Module PcTool]] ويمسك الأوامر اللي مساعدتها بايظة.`, done: R`كلمة واحدة غلط زي [[.EXAMPEL]] بتبوّظ التعليق كله، و [[Synopsis]] بيرجع سطر الـ syntax المتولّد بدل جملتك. والـ typo في اسم الـ parameter بيسيب شرحه فاضي من غير أي تحذير. والسكربت بيطبع اسم الأمر البايظ ويخرج بـ ١، وبعد التصليح بيخرج بـ ٠.` },
          ],
          flag: "script",
          deep: {
            why: R`الأداة اللي محدش عارف يستخدمها مش موجودة. والتوثيق اللي في ملف منفصل بيتنسى، فبيبقى كداب بعد تعديلين. التعليق ده جنب الكود، فبيتعدّل معاه.`,
            how: R`PowerShell بيحلّل الـ AST بتاع الدالة ويدوّر على تعليق [[<# ... #>]] في واحد من تلات أماكن: أول حاجة جوه الدالة، أو قبل كلمة [[function]] على طول، أو في آخر الدالة. الأشهر والأوضح هو الأول.

الأقسام اللي بيعرفها: [[.SYNOPSIS]] و [[.DESCRIPTION]] و [[.PARAMETER]] و [[.EXAMPLE]] و [[.INPUTS]] و [[.OUTPUTS]] و [[.NOTES]] و [[.LINK]] و [[.COMPONENT]] و [[.ROLE]] و [[.FUNCTIONALITY]] و [[.FORWARDHELPTARGETNAME]].

في [[.EXAMPLE]]: أول سطر هو الأمر، وأي سطر بعده بيبقى الشرح. ومتكتبش [[PS>]] قدام الأمر — PowerShell بيحطها لوحده في العرض.

قسم [[SYNTAX]] متولّد من الـ [[param]]، مش من التعليق. فلو ضفت parameter جديد هيظهر في السطر على طول من غير ما تكتبه تاني. ده معناه إن أهم جزء في المساعدة مستحيل يبقى قديم.

و [[Get-Help]] بتبحث كمان: [[Get-Help *Pc*]] بتلاقي أوامرك من الـ SYNOPSIS.`,
            when: R`أي دالة هتبقى في موديول. ولو الدالة داخلية ومش هتتصدّر، تعليق عادي بسطر واحد يكفي.`,
            mistakes: R`تحط التعليق **فوق** [[function]] بمسافة سطر فاضي بينهم، فمبيتقراش (لازم يكون ملزوق). أو تكتب [[.PARAMETER Kinds]] والـ parameter اسمه [[Kind]] فالشرح بيتجاهل. أو تكتب [[PS>]] في المثال فتطلع مرتين. أو تكتب [[.SYNOPSIS]] في فقرتين — ده سطر واحد، والباقي مكانه [[.DESCRIPTION]].`
          },
          teach: R`## الفكرة في سطر

تعليق بشكل متفق عليه فوق الدالة = مساعدة كاملة من غير أي ملف زيادة.

---

## ١. الشكل

~~~powershell القالب
function Set-PcSchedule {
<#
.SYNOPSIS
    سطر واحد.
.DESCRIPTION
    الشرح الكامل.
.PARAMETER Kind
    شرح الـ parameter ده.
.EXAMPLE
    Set-PcSchedule off -In 30
    السطر ده شرح المثال اللي فوقه.
#>
    [CmdletBinding()]
    param([string]$Kind)
}
~~~

تلات شروط بس:

- التعليق **جوه** الدالة، وأول حاجة فيها.
- كل قسم بيبدأ بنقطة في أول السطر.
- اسم الـ [[.PARAMETER]] يطابق اللي في [[param]] بالحرف.

---

## ٢. الناتج الحقيقي

شغّلت [[Get-Help Set-PcSchedule]] بعد ما كتبت التعليق:

~~~text اتشغّل فعلًا · PowerShell 7.6
NAME
    Set-PcSchedule

SYNOPSIS
    يجدول قفل الجهاز أو إعادة تشغيله بعد مهلة.

SYNTAX
    Set-PcSchedule [-Kind] <String> [-In <Int32>] [-Message <String>] [-Force]
    [-WhatIf] [-Confirm] [<CommonParameters>]

DESCRIPTION
    بينادي shutdown.exe ويسجّل المعاد في ملف حالة، عشان Get-PcSchedule يعرف يقراه.
    بيدعم -WhatIf و -Confirm، وبيرمي error لو shutdown.exe فشل.

RELATED LINKS
    Get-PcSchedule

REMARKS
    To see the examples, type: "Get-Help Set-PcSchedule -Examples"
~~~

**بص على [[SYNTAX]]:** أنا مكتبتهوش. ده اتولّد من الـ [[param]] بتاعي، وفيه [[-WhatIf]] و [[-Confirm]] اللي جايين من [[SupportsShouldProcess]]. يعني أهم سطر في المساعدة مستحيل يبقى قديم.

---

## ٣. الأمثلة

~~~text Get-Help Set-PcSchedule -Examples  (اتشغّل فعلًا)
    -------------------------- EXAMPLE 1 --------------------------

    PS > Set-PcSchedule off -In 30
    يقفل الجهاز بعد نص ساعة.

    -------------------------- EXAMPLE 2 --------------------------

    PS > Set-PcSchedule restart -In 5 -WhatIf
    يقولك هيعمل إيه من غير ما ينفّذ.
~~~

الـ [[PS >]] دي PowerShell حطّها لوحده. **متكتبهاش انت** وإلا هتطلع مرتين.

> خلي تاني مثال دايمًا بـ [[-WhatIf]]. اللي بيقرا مساعدة أمر خطير أول سؤال عنده: أجرّبه إزاي من غير ما أقع؟

---

## ٤. اللي بيفرق في الاستخدام

| تكتب | تاخد |
|---|---|
| [[Get-Help Set-PcSchedule]] | الشرح وسطر الاستخدام |
| [[Get-Help Set-PcSchedule -Examples]] | الأمثلة اللي كتبتها في [[.EXAMPLE]] بس، من غير باقي الشرح |
| [[Get-Help Set-PcSchedule -Full]] | كل حاجة، ومعاها شرح كل parameter |
| [[Get-Help *Pc*]] | بيدوّر في الـ SYNOPSIS ويلاقي أوامرك |
| [[Set-PcSchedule -?]] | نفس [[Get-Help Set-PcSchedule]] بالظبط، بس أسرع في الكتابة |

---

## ٥. الفخ: مسافة سطر

~~~powershell ده مش هيشتغل
<#
.SYNOPSIS
    سطر واحد.
#>

function Set-PcSchedule { }
~~~

السطر الفاضي بين التعليق و [[function]] بيكسر الربط. يا إما ملزوقين، يا إما التعليق جوه الدالة. والتاني أأمن.

---

## الخلاصة

- التعليق جوه الدالة وأول حاجة فيها.
- [[.SYNOPSIS]] سطر واحد؛ الباقي في [[.DESCRIPTION]].
- أسماء [[.PARAMETER]] لازم تطابق [[param]] بالحرف.
- [[SYNTAX]] متولّد لوحده — ومش محتاج تكتبه ولا تحدّثه.
- مثال بـ [[-WhatIf]] في أي أمر خطير.`,
          sol: R`الأمرين اللي بتفحص بيهم، وناتجهم الحقيقي. لاحظ إن [[SYNTAX]] فيه [[-WhatIf]] و [[-Confirm]] وانا مكتبتهمش في التعليق — جايين من [[SupportsShouldProcess]].`,
          solCode: R`Get-Help Set-PcSchedule
Get-Help Set-PcSchedule -Examples

# من الناتج (اتشغّل فعلًا على PowerShell 7.6):
# SYNTAX
#     Set-PcSchedule [-Kind] <String> [-In <Int32>] [-Message <String>] [-Force]
#     [-WhatIf] [-Confirm] [<CommonParameters>]
#
#     -------------------------- EXAMPLE 1 --------------------------
#     PS > Set-PcSchedule off -In 30
#     يقفل الجهاز بعد نص ساعة.`
        },

        {
          cmd: "مشروع ٣ — الـ manifest",
          title: "ملف .psd1: بطاقة هوية الموديول",
          learn: R`تعمل ملف [[.psd1]] فيه نسخة الأداة ومتطلباتها وقايمة اللي بتصدّره.`,
          out: R`[[Get-Module -ListAvailable]] بتوريك اسم أداتك ونسختها.`,
          use: {
            prog: R`ده الـ [[package.json]] بتاع PowerShell: اسم، ونسخة، واعتماديات، ونقطة دخول. ومن غيره مفيش طريقة تقول «أنا عايز نسخة ١.٠ مش ٢.٠».`,
            net: R`[[PowerShellVersion]] و [[RequiredModules]] بيخلّوا الأداة ترفض تشتغل على سيرفر ناقصه حاجة، بدل ما تفشل في النص.`,
            cs: R`الإصدار الدلالي (major.minor.patch) عقد: الرقم الأول بيتغيّر لما تكسر حاجة. وده اللي بيخلي حد يعتمد عليك.`,
          },
          desc: R`الموديول ينفع يشتغل بملف [[.psm1]] لوحده. بس ساعتها مفيش نسخة، ومفيش وصف، ومفيش طريقة تقول «ده محتاج PowerShell 7».

الـ manifest ملف [[.psd1]] — ده مجرد **hashtable** مكتوبة في ملف. أهم حاجات فيه:

[[RootModule]] الملف اللي فيه الكود ([[PcTool.psm1]]).
[[ModuleVersion]] نسخة الأداة، وده اللي بيخلي [[-RequiredVersion]] تشتغل.
[[GUID]] معرّف فريد بيتولّد لوحده، بيفرّق موديولك عن أي موديول تاني بنفس الاسم.
[[Author]] و [[Description]] — الوصف بيظهر في البحث.
[[PowerShellVersion]] أقل نسخة لازمة.
[[FunctionsToExport]] قايمة الدوال الظاهرة.

ومتعملوش بإيدك: [[New-ModuleManifest]] بتعمله بكل المفاتيح ومعاها تعليقات.

وفيه حاجة مهمة في [[FunctionsToExport]]: اكتب الأسماء صريحة، **متكتبش** [[*]]. السبب إن PowerShell بيقرا الـ manifest عشان يعرف أي موديول فيه الأمر اللي انت كتبته، من غير ما يشغّل الموديول. ولو لقى نجمة، هيضطر يحمّل الموديول كله عشان يعرف. يعني النجمة بتبطّأ فتح كل نافذة جديدة.`,
          example: R`# شغّله مرة واحدة جوه فولدر PcTool
$params = @{
    Path              = '.\PcTool\PcTool.psd1'
    RootModule        = 'PcTool.psm1'
    ModuleVersion     = '1.0.0'
    Author            = 'انت'
    Description       = 'تجدول قفل الجهاز أو إعادة تشغيله، وتلغي المعاد، وتقولك فيه معاد ولا لأ.'
    PowerShellVersion = '7.0'
    FunctionsToExport = @('Set-PcSchedule', 'Get-PcSchedule', 'Stop-PcSchedule')
    CmdletsToExport   = @()
    VariablesToExport = @()
    AliasesToExport   = @()
}
New-ModuleManifest @params

Test-ModuleManifest .\PcTool\PcTool.psd1`,
          lines: [
            R`hashtable كل مفتاح فيها اسم parameter لـ [[New-ModuleManifest]] من غير شرطة، والقيمة قيمته. ده splatting: بيخلي أمر بعشر parameters يتقري كجدول، بدل سطر طويل جدًا أو علامة استمرار في آخر كل سطر.`,
            R`مكان ملف الـ manifest اللي هيتعمل. الامتداد [[.psd1]]، واسمه لازم يطابق اسم الفولدر ([[PcTool\PcTool.psd1]])، لأن PowerShell بيدوّر جوه فولدر [[PcTool]] على ملف بنفس الاسم بالظبط.`,
            R`ملف الكود اللي الموديول بيشغّله لما يتحمّل. المسار نسبي لفولدر الـ manifest، فـ [[PcTool.psm1]] معناها الملف اللي جنبه.`,
            R`رقم النسخة بصيغة major.minor.patch. [[Get-Module]] بيعرضه، فتعرف أنهي نسخة عندك وأنهي عند زميلك. زوّده كل ما تغيّر حاجة.`,
            R`اسم صاحب الموديول، وبيتقري من [[(Get-Module PcTool).Author]] وبيظهر في PowerShell Gallery لو نشرته. مش بيأثر على التشغيل، بس بيقول لأي حد لاقاه على جهازه مين المسؤول عنه. حط اسمك بدل [['انت']].`,
            R`جملة بتقول الموديول بيعمل إيه. بتتقري من [[(Get-Module -ListAvailable PcTool).Description]] وبتظهر في نتايج البحث لو نشرته، فاكتبها لحد مشافش الكود.`,
            R`أقل نسخة PowerShell يتحمّل عليها. على 5.1 [[Import-Module]] بيرفض برسالة إن الموديول [[requires a minimum Windows PowerShell version of '7.0']] (جرّبناها)، بدل ما يتحمّل ويقع بعدين في سطر فيه حاجة من 7 بس.`,
            R`الدوال اللي اليوزر هيشوفها، مكتوبة بالاسم. القايمة الصريحة بتخلي PowerShell يعرف أوامر الموديول من الـ manifest من غير ما يشغّل الـ [[.psm1]]، فالـ autoloading والإكمال أسرع. ولو مكتبتهاش [[New-ModuleManifest]] بيحط [[*]]، وده بيصدّر كل حاجة وبيبطّأ الاكتشاف.`,
            R`cmdlets الموديول، ودي بتتكتب بـ C# وبتتعمل compile، واحنا كل أوامرنا functions. قايمة فاضية صريحة بدل [[*]] الافتراضية عشان ميتصدّرش حاجة بالغلط.`,
            R`مفيش متغيرات تطلع برّه الموديول، فـ [[$StatePath]] يفضل داخلي. الافتراضي هنا كمان [[*]]، يعني أي متغير الـ [[.psm1]] يصدّره بالغلط كان هيعدّي.`,
            R`مفيش aliases مصدّرة. لو عملت بعدين [[Set-Alias pcs Set-PcSchedule]] جوه الموديول، لازم تكتبه هنا (وفي [[Export-ModuleMember -Alias]] لو بتستخدمه)، وإلا مش هيبان برّه.`,
            R`قفلة الـ hashtable.`,
            R`[[@params]] مش [[$params]]: الـ [[@]] بتفك الـ hashtable، وكل مفتاح فيها بيتبعت كـ parameter بنفس الاسم. لو كتبت [[$params]] الـ hashtable كلها هتتبعت كقيمة واحدة لأول parameter. والأمر بيكتب ملف [[.psd1]] فيه الإعدادات دي ومعاها تعليقات لباقي المفاتيح.`,
            R`بيقرا الـ manifest ويتأكد إنه ملف صالح. في PowerShell 7 كمان بيتأكد إن [[RootModule]] موجود فعلًا، أما 5.1 بيعدّيه من غير الملف (جرّبنا الاتنين). لو نجح بيطبع اسم الموديول ونسخته، ولو فيه غلطة بيقولك قبل ما اليوزر يكتشفها.`
          ],
          try: R`شغّل الأمر، وافتح [[PcTool.psd1]] واقراه — ده نص عادي. وبعدين غيّر [[ModuleVersion]] لـ [[1.1.0]]، وشغّل [[Test-ModuleManifest]] تاني. وبعدين جرّب تحط [[RootModule = 'مش-موجود.psm1']] وشوف [[Test-ModuleManifest]] هتقول إيه.`,
          practice: [
            { lvl: 'سريع', t: R`شغّل [[Test-ModuleManifest .\PcTool\PcTool.psd1 | Format-List Name, Version, ExportedFunctions]].`, done: R`بيطبع [[PcTool]] والنسخة [[1.0.0]] وأسامي التلات دوال اللي في [[FunctionsToExport]] بالظبط، من غير ولا error.` },
            { lvl: 'تطبيق', t: R`سيب [[Get-PcSchedule]] في [[Export-ModuleMember]] جوه الـ psm1، بس شيلها من [[FunctionsToExport]] في الـ psd1، واعمل [[Import-Module .\PcTool\PcTool.psd1 -Force]].`, done: R`[[Get-Command -Module PcTool]] مبقاش فيه [[Get-PcSchedule]]: الـ manifest بيفلتر فوق الـ psm1، والدالة لازم تبقى مكتوبة في الاتنين عشان تبان. ولما ترجّعها في الـ psd1 تظهر تاني.` },
            { lvl: 'تحدي', t: R`اكتب [[check-module.ps1]] بيفحص أكتر من [[Test-ModuleManifest]]: الـ [[RootModule]] موجود فعلًا جنب الـ psd1، وكل اسم في [[FunctionsToExport]] متعرّف كـ [[function]] في الـ psm1، ومفيش [[*]]. وجرّبه بـ [[RootModule = 'missing.psm1']] على [[pwsh]] وعلى [[powershell]].`, done: R`هتلاقي إن [[Test-ModuleManifest]] في 7 بيرمي error على الـ RootModule الناقص، لكن في 5.1 بيعدّيه ساكت (و [[Import-Module]] بيفشل في الاتنين). وسكربتك بيمسكه في الاتنين، وبيطبع اسم أي دالة مكتوبة غلط في [[FunctionsToExport]]، ويخرج بـ ١.` },
          ],
          flag: "script",
          deep: {
            why: R`من غير manifest، موديولك ملف كود. مفيش طريقة حد يقول «أنا شغّال على ١.٠» ولا طريقة تقول «ده محتاج ٧». وأول ما تبقى عايز توزّعه أو تخلي حاجة تانية تعتمد عليه، النسخة بتبقى أول حاجة محتاجها.`,
            how: R`الـ [[.psd1]] عبارة عن hashtable بتتقري في **وضع مقيّد**: PowerShell بيقراها من غير ما ينفّذ أي كود فيها. عشان كده آمن إنه يقرا manifest لموديول مش واثق فيه.

ولما تكتب [[Import-Module PcTool]]، PowerShell بيدوّر على فولدر اسمه [[PcTool]]، وجواه بيدوّر على [[PcTool.psd1]] الأول. لو لقاه، بيقراه، وبيحمّل الـ [[RootModule]] اللي فيه. لو ملقهوش، بيحمّل [[PcTool.psm1]] على طول.

[[FunctionsToExport]] بالأسماء الصريحة هي اللي بتخلي الـ autoloading رخيص: PowerShell بيعمل فهرس من كل الـ manifests مرة واحدة، فلما تكتب [[Set-PcSchedule]] بيعرف على طول هو في أنهي موديول. مع [[*]] مش هيعرف غير لما يحمّل الموديول، فبيحمّل كل الموديولات.

مفاتيح تانية مفيدة: [[RequiredModules]] (موديولات لازم تتحمّل الأول)، و [[RequiredAssemblies]]، و [[PrivateData.PSData.Tags]] و [[ProjectUri]] (للنشر على PowerShell Gallery)، و [[CompatiblePSEditions]].

و [[Test-ModuleManifest]] بترجّع object فيه كل ده، فينفع تستخدمه في اختبار: [[(Test-ModuleManifest .\PcTool.psd1).Version]].`,
            when: R`أول ما الموديول يخرج من جهازك، أو أول ما تبقى عايز تعرف أنهي نسخة شغالة. وعمليًا: من أول يوم، لأن إضافته بعدين معناها إن اللي سطّبوه الأول عندهم نسخة من غير رقم.`,
            mistakes: R`اسم الملف مش زي اسم الفولدر، فـ [[Import-Module PcTool]] مش بيلاقيه. أو [[FunctionsToExport = '*']] فبتبطّأ كل نافذة جديدة. أو تنسى تزوّد [[ModuleVersion]] بعد ما تعدّل، فاللي عنده النسخة القديمة مش هياخد الجديدة. أو تكتب كود حقيقي جوه الـ [[.psd1]] — ده بيتقري في وضع مقيّد ومش بينفّذ.`
          },
          teach: R`## الفكرة في سطر

[[.psd1]] هو [[package.json]] بتاع PowerShell: اسم، ونسخة، ومتطلبات، وقايمة اللي بتصدّره.

---

## ١. اعمله بأمر، متكتبوش

~~~powershell PowerShell 7.6
$params = @{
    Path              = '.\PcTool\PcTool.psd1'
    RootModule        = 'PcTool.psm1'
    ModuleVersion     = '1.0.0'
    Description       = 'تجدول قفل الجهاز أو إعادة تشغيله.'
    PowerShellVersion = '7.0'
    FunctionsToExport = @('Set-PcSchedule', 'Get-PcSchedule', 'Stop-PcSchedule')
}
New-ModuleManifest @params
~~~

الـ [[@params]] دي **splatting**: بتاخد الـ hashtable وتفكّها كـ parameters. بتستخدمها لما الأمر ياخد مفاتيح كتير، بدل سطر طويل أوي.

---

## ٢. اللي اتكتب فعلًا

الملف بيطلع طويل ومليان تعليقات، بس السطور اللي بتفرق:

~~~text من PcTool.psd1 (اتشغّل فعلًا)
RootModule = 'PcTool.psm1'
ModuleVersion = '1.0.0'
GUID = '4e5b04a9-3f4e-4e00-a589-617ca46bf522'
Author = 'انت'
Description = 'تجدول قفل الجهاز أو إعادة تشغيله، وتلغي المعاد، وتقولك فيه معاد ولا لأ.'
PowerShellVersion = '7.0'
FunctionsToExport = 'Set-PcSchedule', 'Get-PcSchedule', 'Stop-PcSchedule'
CmdletsToExport = @()
AliasesToExport = @()
~~~

الـ [[GUID]] اتولّد لوحده. ده معرّف فريد، بيفرّق موديولك عن أي موديول تاني بنفس الاسم على نفس الجهاز.

---

## ٣. اتأكد إنه سليم

~~~powershell PowerShell 7.6
$m = Test-ModuleManifest .\PcTool\PcTool.psd1
'{0} v{1} — بيصدّر {2} دالة' -f $m.Name, $m.Version, $m.ExportedFunctions.Count
~~~

~~~text الناتج (اتشغّل فعلًا)
PcTool v1.0.0 — بيصدّر 3 دالة
~~~

[[Test-ModuleManifest]] مش بتقرا بس، دي **بتتأكد**: إن [[RootModule]] موجود، وإن الدوال اللي في [[FunctionsToExport]] موجودة فعلًا. حطّها في اختباراتك.

---

## ٤. ليه متكتبش نجمة

~~~powershell بطيء
FunctionsToExport = '*'
~~~

~~~powershell صح
FunctionsToExport = 'Set-PcSchedule', 'Get-PcSchedule', 'Stop-PcSchedule'
~~~

PowerShell بيعمل فهرس من كل الـ manifests عشان يعرف أي أمر في أي موديول — **من غير ما يشغّل أي موديول**. لما يلاقي نجمة، مبيعرفش، فمضطر يحمّل الموديول كله عشان يسأله.

واحد ولا اتنين مش هيبان. عشرين موديول بنجمة = كل نافذة جديدة بتاخد تانية زيادة في الفتح.

---

## ٥. المفاتيح اللي هتحتاجها بعدين

| المفتاح | بيعمل إيه |
|---|---|
| [[RequiredModules]] | موديولات لازم تتحمّل قبل موديولك |
| [[CompatiblePSEditions]] | [[Core]] (نسخة 7) ولا [[Desktop]] (نسخة 5.1) |
| [[PrivateData.PSData.Tags]] | كلمات للبحث على PowerShell Gallery |
| [[ProjectUri]] | لينك الريبو، وبيظهر في صفحة الموديول على PowerShell Gallery |
| [[FileList]] | الملفات اللي جوه الموديول |

---

## ٦. النسخة مش رقم عشوائي

[[1.4.2]] = major.minor.patch:

- **patch**: صلّحت غلطة، والاستخدام زي ما هو.
- **minor**: ضفت حاجة جديدة، واللي شغّال هيفضل شغّال.
- **major**: كسرت حاجة — غيّرت اسم parameter أو شلت دالة.

الرقم الأول هو العقد. لو حد كاتب في سكربته [[-RequiredVersion 1.0.0]]، انت ضامن له إن مفيش حاجة هتتكسر.

---

## الخلاصة

- [[New-ModuleManifest]] بتعمله؛ متكتبوش بإيدك.
- اسم الـ [[.psd1]] لازم يطابق اسم الفولدر.
- [[FunctionsToExport]] صريحة، مش [[*]].
- [[Test-ModuleManifest]] بتتأكد، مش بتقرا بس — حطّها في اختباراتك.
- زوّد [[ModuleVersion]] مع كل تعديل.`,
          sol: R`الأمر اللي بيتأكد إن الـ manifest سليم، وناتجه. و [[Test-ModuleManifest]] بترجّع object، فتقدر تقرا منه أي مفتاح.`,
          solCode: R`$m = Test-ModuleManifest .\PcTool\PcTool.psd1
'{0} v{1} — بيصدّر {2} دالة' -f $m.Name, $m.Version, $m.ExportedFunctions.Count

# الناتج (اتشغّل فعلًا على PowerShell 7.6):
# PcTool v1.0.0 — بيصدّر 3 دالة`
        },

        {
          cmd: "مشروع ٣ — إكمال تلقائي لقيمك",
          title: "Register-ArgumentCompleter: خلي Tab يقترح قيمك انت",
          learn: R`تكتب كود بيقرر الـ Tab يقترح إيه لـ parameter معيّن في أمرك.`,
          out: R`[[Set-PcSchedule off -In]] + Tab بيقترح 5 و 15 و 30 و 60.`,
          use: {
            prog: R`ده نفس الـ IntelliSense، بس انت اللي بتكتب مصدره. والفرق إن الاقتراح هنا ممكن يبقى **حي**: أسماء ملفات موجودة دلوقتي، أو خدمات شغالة دلوقتي.`,
            net: R`إكمال بأسماء السيرفرات من ملف inventory، أو بأسماء الخدمات الشغالة فعلًا، بيمنع نص الأخطاء على السيرفر قبل ما تحصل.`,
            work: R`الاقتراح بيوفّر عليك تفتكر. والأداة اللي الـ Tab بيكمّلها بتبقى أسهل من أداة محتاجة تفتح مساعدتها.`,
          },
          desc: R`في درس «[[Tab]] و [[Ctrl+Space]]» شفت إن PowerShell بيكمّل أسماء الأوامر والـ parameters وقيم الـ [[ValidateSet]]. دلوقتي هتضيف اقتراحاتك انت.

الفرق بين الاتنين مهم:

[[ValidateSet]] قايمة **ثابتة** ومقفولة: دي القيم المسموحة وبس، وأي حاجة تانية الأداة ترفضها. الـ Tab بيكمّلها مجانًا.
[[Register-ArgumentCompleter]] اقتراحات **مفتوحة**: دي حاجات مقترحة، وممكن تكتب غيرها. والقايمة بتتحسب وانت بتضغط Tab، فتقدر تجيبها من أي مكان: ملف، أو أمر تاني، أو الشبكة.

في أداتنا: [[-Kind]] فيه [[ValidateSet]] لأن القيم الوحيدة [[off]] و [[restart]]. لكن [[-In]] رقم من ٠ لـ ١٠٠٨٠، ومينفعش تحطه في قايمة — بس تقدر **تقترح** الأرقام اللي الناس بتستخدمها.

الدالة اللي بتكتبها بتاخد تلات حاجات مهمة: اسم الأمر، واسم الـ parameter، و**اللي اليوزر كتبه لحد دلوقتي**. وبترجّع كائنات [[CompletionResult]]، كل واحد فيه: القيمة اللي هتتكتب، والنص اللي هيبان في القايمة، ونوعه، وتلميح.`,
          example: R`# في آخر PcTool.psm1، قبل Export-ModuleMember
Register-ArgumentCompleter -CommandName Set-PcSchedule -ParameterName In -ScriptBlock {
    param($cmd, $param, $word)
    5, 15, 30, 60, 120 |
        Where-Object { "$_".StartsWith($word) } |
        ForEach-Object {
            [System.Management.Automation.CompletionResult]::new(
                "$_", "$_ دقيقة", 'ParameterValue', "بعد $_ دقيقة")
        }
}`,
          lines: [
            R`بيسجّل كود يتنادى كل ما اليوزر يدوس Tab بعد [[-In]] في [[Set-PcSchedule]]. [[-CommandName]] الأمر، و [[-ParameterName]] اسم الـ parameter من غير شرطة، و [[-ScriptBlock]] الكود اللي بيطلّع الاقتراحات. التسجيل بيعيش في الجلسة دي بس، فمكانه الطبيعي جوه الـ [[.psm1]] أو الـ profile.`,
            R`PowerShell بيبعت للكتلة ٥ حاجات بالترتيب: اسم الأمر، واسم الـ parameter، واللي اليوزر كتبه لحد دلوقتي، وشجرة الأمر (AST)، والـ parameters اللي اتكتبت. احنا محتاجين التالت بس ([[$word]])، بس لازم نكتب اللي قبله عشان الترتيب.`,
            R`القيم اللي هنقترحها كـ array بالفواصل، داخلة في الـ pipeline واحدة واحدة. ممكن تجيبها من ملف أو من أمر تاني بدل ما تكون ثابتة. و [[|]] في آخر السطر بيخلي PowerShell يكمّل الأمر في السطر الجاي.`,
            R`[[$_]] الرقم الحالي، و [["$_"]] بين تنصيص بيحوّله لنص عشان [[StartsWith]] ميثود نصوص. بيسيب اللي بيبدأ باللي اليوزر كتبه: [[-In 1]] ثم Tab يطلّع [[15]] و [[120]] بس. ولو مكتبش حاجة [[$word]] فاضي وكل نص بيبدأ بفاضي، فبتطلع كلها.`,
            R`لكل رقم عدّى الفلتر بنعمل اقتراح واحد، و [[$_]] جوه الكتلة دي هو الرقم ده.`,
            R`بنعمل object من نوع [[CompletionResult]]، وده الشكل اللي PowerShell بيفهمه كاقتراح. [[::new(]] بتنادي الـ constructor، ولازم الاسم الكامل بالـ namespace لأن النوع ده ملوش اختصار جاهز زي [[datetime]].`,
            R`٤ arguments بالترتيب: [["$_"]] النص اللي هيتكتب في السطر فعلًا، و [["$_ دقيقة"]] اللي بيظهر في قايمة [[Ctrl+Space]]، و [['ParameterValue']] نوع الاقتراح (قيمة لـ parameter)، و [["بعد $_ دقيقة"]] التلميح اللي بيظهر للعنصر المختار. والقوس في الآخر بيقفل [[new(]].`,
            R`قفلة [[ForEach-Object]]: كل الـ [[CompletionResult]] اللي اتعملت بتطلع من الكتلة، و PowerShell بيعرضهم بالترتيب ده.`,
            R`قفلة الـ scriptblock، وقفلة [[Register-ArgumentCompleter]] نفسه.`
          ],
          try: R`ضيف السطور دي، [[Import-Module ... -Force]]، وبعدين اكتب [[Set-PcSchedule off -In ]] (بمسافة في الآخر) ودوس Tab. وبعدين اكتب [[1]] ودوس Tab تاني وشوف الفرق. وبعدين غيّر القايمة تجيب أسماء الخدمات: [[(Get-Service).Name]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تدوس Tab: [[$s = 'Set-PcSchedule off -In 1'; (TabExpansion2 $s $s.Length).CompletionMatches.CompletionText]]، وبعدين نفس الحاجة بـ [[-In 9]].`, done: R`الأول بيطبع [[15]] و [[120]] بس (اللي بيبدأوا بـ ١)، والتاني مبيطبعش حاجة لأن مفيش اقتراح بيبدأ بـ ٩. والرقم التاني في [[TabExpansion2]] هو مكان المؤشر، فلو نسيته أو كتبته أكبر من طول النص هتاخد error [[cursorIndex]].` },
            { lvl: 'تطبيق', t: R`اعمل أمر تجريبي [[Get-SvcInfo -Name]] و completer بيقترح [[(Get-Service).Name]] اللي بتبدأ باللي اتكتب. وبعدين جرّب الطريقة القصيرة: الـ attribute [[ArgumentCompletions(5, 15, 30)]] فوق parameter، في [[pwsh]] وفي [[powershell]].`, done: R`[[TabExpansion2]] على [[Get-SvcInfo -Name Win]] بيرجّع أسامي خدمات حقيقية من جهازك كلها بتبدأ بـ Win. والـ attribute بيشتغل في 7، لكن في 5.1 نداء الدالة نفسه بيقع بـ «Cannot find the type for custom attribute 'ArgumentCompletions'»: لو أداتك لازم تشتغل على 5.1 استخدم [[Register-ArgumentCompleter]].` },
            { lvl: 'تحدي', t: R`خلي الاقتراحات تعتمد على parameter تاني: لو [[-Kind restart]] اقترح ١ و ٢ و ٥ دقايق، ولو [[off]] اقترح القايمة الكبيرة. الـ scriptblock بياخد parameter خامس اسمه [[$fakeBoundParameters]] فيه اللي اليوزر كتبه لحد دلوقتي.`, done: R`[[TabExpansion2]] على [[Set-PcSchedule restart -In ]] بيرجّع [[1]] و [[2]] و [[5]]، وعلى [[Set-PcSchedule off -In ]] بيرجّع ٥ و ١٥ و ٣٠ و ٦٠ و ١٢٠، ولو [[-Kind]] لسه مكتوبش بيرجّع القايمة الكبيرة من غير error.` },
          ],
          flag: "script",
          deep: {
            why: R`[[ValidateSet]] بتحل نص المشكلة: قايمة مقفولة. لكن أغلب القيم مش مقفولة — رقم، أو اسم ملف، أو اسم خدمة. الـ completer بيدّي اقتراح من غير ما يمنع، وبيقدر يقرا الواقع وقت الكتابة.`,
            how: R`لما تدوس Tab، PowerShell بينادي [[TabExpansion2]]، اللي بيحلّل السطر ويعرف انت واقف فين. لو انت في قيمة parameter وفيه completer مسجّل للأمر ده والـ parameter ده، بيشغّل الـ scriptblock بتاعك **في جلستك** ويستنى الناتج.

الـ scriptblock بياخد ٥ parameters بالترتيب: [[$commandName]] و [[$parameterName]] و [[$wordToComplete]] و [[$commandAst]] و [[$fakeBoundParameters]]. التلاتة الأولى اللي بتستخدمهم عادة. والأخير مفيد أوي: فيه الـ parameters اللي اليوزر كتبها بالفعل، فتقدر تخلي اقتراحاتك تتغيّر حسبها.

[[CompletionResult]] بياخد ٤ حاجات: [[completionText]] (اللي هيتحط في السطر)، و [[listItemText]] (اللي بيبان في القايمة لما تدوس Ctrl+Space)، و [[resultType]] ([[ParameterValue]] أو [[Command]] أو [[ProviderItem]]...)، و [[toolTip]].

والفلترة بـ [[StartsWith($word)]] مسؤوليتك انت. PowerShell بيديك اللي اتكتب وبيستنى منك ترجّع المناسب؛ مش بيفلتر بعدك.

وفيه طريقة تانية أقصر لو الاقتراحات جوه نفس الدالة: [[[ArgumentCompleter({...})]]] كـ attribute فوق الـ parameter مباشرة. الفرق إن [[Register-ArgumentCompleter]] تنفع تسجّلها لأوامر **مش بتاعتك** كمان، حتى أوامر النظام.

ولازم يتسجّل جوه الموديول، عشان يتسجّل أول ما الموديول يتحمّل.`,
            when: R`أي parameter قيمته مش مقفولة بس ليها قيم شائعة أو مصدر تقدر تقراه: أسماء ملفات، أو فروع git، أو خدمات، أو أرقام متكررة.`,
            mistakes: R`تنسى الفلترة بـ [[$word]]، فتلاقي الاقتراحات مش بتتقلّل وانت بتكتب. أو تكتب [[-ParameterName -In]] بشرطة — الاسم من غير شرطة. أو تحط كود بطيء جوه (نداء شبكة)، فالـ Tab يعلّق. أو تسجّله بره الموديول فميشتغلش غير في الجلسة اللي سجّلته فيها.`
          },
          teach: R`## [[ValidateSet]] ولا completer؟

| | [[ValidateSet]] | [[Register-ArgumentCompleter]] |
|---|---|---|
| القايمة | مقفولة: غيرها يترفض | مفتوحة: اقتراح بس |
| بتتحسب | مرة واحدة، ثابتة | كل مرة تدوس Tab |
| مصدرها | مكتوبة في الكود | أي حاجة: ملف، أمر، شبكة |
| الـ Tab | شغال مجانًا | محتاج تكتبه |

في أداتنا الاتنين موجودين: [[-Kind]] مقفول ([[off]] أو [[restart]])، و [[-In]] مفتوح (أي رقم من ٠ لـ ١٠٠٨٠) بس ليه أرقام شائعة.

---

## ١. الشكل

~~~powershell في آخر PcTool.psm1
Register-ArgumentCompleter -CommandName Set-PcSchedule -ParameterName In -ScriptBlock {
    param($cmd, $param, $word)
    5, 15, 30, 60, 120 |
        Where-Object { "$_".StartsWith($word) } |
        ForEach-Object {
            [System.Management.Automation.CompletionResult]::new(
                "$_", "$_ دقيقة", 'ParameterValue', "بعد $_ دقيقة")
        }
}
~~~

تلات حاجات تلاحظها:

- [[-ParameterName In]] **من غير شرطة**.
- [[$word]] هو اللي اليوزر كتبه لحد دلوقتي، و**انت** اللي بتفلتر بيه.
- [[CompletionResult]] بياخد ٤: اللي هيتكتب، واللي هيبان، والنوع، والتلميح.

---

## ٢. جرّبته فعلًا

عشان أجرّب من غير ما أضغط Tab بإيدي، ناديت [[TabExpansion2]] — ده الأمر اللي PowerShell نفسه بيناديه:

~~~powershell PowerShell 7.6
$line = "Set-PcSchedule off -In "
$r = TabExpansion2 -inputScript $line -cursorColumn $line.Length
$r.CompletionMatches | Format-Table -AutoSize CompletionText, ListItemText, ToolTip
~~~

~~~text الناتج (اتشغّل فعلًا)
CompletionText ListItemText ToolTip
-------------- ------------ -------
5              5 دقيقة      بعد 5 دقيقة
15             15 دقيقة     بعد 15 دقيقة
30             30 دقيقة     بعد 30 دقيقة
60             60 دقيقة     بعد 60 دقيقة
120            120 دقيقة    بعد 120 دقيقة
~~~

ولما كتبت [[1]] قبل ما أدوس Tab:

~~~text Set-PcSchedule off -In 1  (اتشغّل فعلًا)
15  120
~~~

دي الفلترة بـ [[$word]] شغالة: [[5]] و [[30]] و [[60]] اختفوا لأنهم مش بيبدأوا بـ [[1]].

---

## ٣. و [[-Kind]] شغال مجانًا

~~~text Set-PcSchedule   (اتشغّل فعلًا)
off  restart
~~~

دي من [[ValidateSet]] نفسها. مكتبتش ولا سطر عشانها.

---

## ٤. الاقتراح الحي

أقوى حاجة في الـ completer إن الكود بيشتغل **وقت ما تدوس Tab**، يعني يقدر يبص على الواقع:

~~~powershell أمثلة
# أسماء الخدمات الشغالة دلوقتي
(Get-Service | Where-Object Status -eq 'Running').Name

# فروع git في المشروع اللي انت فيه
git branch --format='%(refname:short)'

# أسماء من ملف
Get-Content .\servers.txt
~~~

> خلي الكود **سريع**. لو حطيت نداء شبكة جواه، الـ Tab هيعلّق كل مرة. اقرا من ملف أو من كاش.

---

## ٥. الـ parameters الخمسة

الـ scriptblock بياخد ٥ بالترتيب:

| # | الاسم | فيه إيه |
|---|---|---|
| ١ | [[$commandName]] | اسم الأمر |
| ٢ | [[$parameterName]] | الـ parameter اللي بيتكمّل |
| ٣ | [[$wordToComplete]] | اللي اليوزر كتبه لحد دلوقتي |
| ٤ | [[$commandAst]] | السطر كله محلّل |
| ٥ | [[$fakeBoundParameters]] | الـ parameters اللي اتكتبت بالفعل |

الخامس بيخليك تعمل اقتراح **بيعتمد على اللي قبله**: لو اليوزر كتب [[-Kind restart]]، تقترح أرقام أقصر.

---

## الخلاصة

- [[ValidateSet]] للقيم المقفولة، والـ completer للمفتوحة.
- [[-ParameterName]] من غير شرطة.
- فلتر بـ [[$word]] بنفسك — محدش هيفلتر بعدك.
- سجّله جوه الـ [[.psm1]] عشان يتسجّل مع الموديول.
- خلي الكود سريع: الـ Tab بيستناه.`,
          sol: R`الطريقة اللي تجرّب بيها الإكمال من غير ما تضغط Tab بإيدك — مفيدة في الاختبارات. [[TabExpansion2]] هو نفس الأمر اللي PowerShell بيناديه لما تدوس Tab.`,
          solCode: R`Import-Module .\PcTool\PcTool.psd1 -Force
$line = "Set-PcSchedule off -In "
$r = TabExpansion2 -inputScript $line -cursorColumn $line.Length
$r.CompletionMatches | Format-Table -AutoSize CompletionText, ListItemText

# الناتج (اتشغّل فعلًا على PowerShell 7.6):
# CompletionText ListItemText
# -------------- ------------
# 5              5 دقيقة
# 15             15 دقيقة
# 30             30 دقيقة
# 60             60 دقيقة
# 120            120 دقيقة`
        },

        {
          cmd: "مشروع ٣ — سطّبه وخليه يتحمّل لوحده",
          title: "PSModulePath: حطّه مرة، يشتغل في أي نافذة",
          learn: R`تحط الموديول في المكان اللي PowerShell بيدوّر فيه، فيتحمّل لوحده أول نداء.`,
          out: R`تفتح نافذة جديدة وتكتب [[Get-PcSchedule]] على طول.`,
          use: {
            prog: R`ده الـ [[node_modules]] / [[site-packages]] بتاع PowerShell: مسارات بحث متفق عليها، والاستيراد بيحصل لوحده. وفهم مسار البحث هو اللي بيخليك تفك «الأمر ده مش موجود».`,
            net: R`على سيرفر، الأدوات بتتحط في المسار على مستوى الجهاز، فأي حساب وأي مهمة مجدولة بتلاقيها.`,
            cs: R`الـ dynamic loading: الكود مبيتحملش لحد ما يتطلب. ده نفس الـ lazy loading في أي نظام، وبيقايض وقت الفتح بوقت أول نداء.`,
          },
          desc: R`لحد دلوقتي بتكتب [[Import-Module .\PcTool\PcTool.psd1]]. ده شغال، بس لسه محتاج مسار.

PowerShell بيدوّر على الموديولات في مسارات محددة، مكتوبة في [[$env:PSModulePath]]. لو حطيت الموديول في واحد منهم، هيتحمّل **لوحده** أول ما تنادي أي أمر منه — من غير [[Import-Module]] خالص. الحاجة دي اسمها autoloading.

وفيه شرط واحد مهم: **اسم الفولدر لازم يطابق اسم الموديول**. يعني [[PcTool\PcTool.psd1]]، مش [[tools\PcTool.psd1]]. لو خالفته، [[Import-Module PcTool]] مش هيلاقيه.

والمسارات الافتراضية في PowerShell 7 على ويندوز تلاتة:

[[Documents\PowerShell\Modules]] — ليك انت بس، جوه فولدر Documents بتاعك. ده اللي تستخدمه.
[[$env:ProgramFiles\PowerShell\Modules]] — لكل اليوزرز، ومحتاج صلاحيات admin.
مسار PowerShell نفسه — للموديولات اللي جاية مع النظام. **متحطش فيه حاجة**.

وخلي بالك: فولدر Documents مش دايمًا [[$HOME\Documents]]. لو ويندوز بيزامنه مع OneDrive (أو الشركة نقلته)، PowerShell بيحط في [[PSModulePath]] المسار الحقيقي زي [[C:\Users\you\OneDrive\Documents\PowerShell\Modules]]، ولو نسخت في [[$HOME\Documents]] الـ autoloading مش هيلاقيه. عشان كده بناخد مكان Documents من ويندوز نفسه بـ [[[Environment]::GetFolderPath('MyDocuments')]].

وللتجربة من غير ما تنقل حاجة، تقدر تزوّد فولدر للمسار **للجلسة الحالية بس**: ده بيختفي أول ما تقفل النافذة، فمفيد وانت بتطوّر.`,
          example: R`# للتجربة: زوّد فولدر المعمل للمسار، في الجلسة دي بس
$env:PSModulePath = "$HOME\lab" + [IO.Path]::PathSeparator + $env:PSModulePath

Get-Module -ListAvailable PcTool

# من غير أي Import: نادي الأمر على طول
Get-PcSchedule
Get-Module PcTool

# وللتسطيب الدائم (لما تخلص تطوير)
$docs = [Environment]::GetFolderPath('MyDocuments')
$dest = Join-Path $docs 'PowerShell\Modules\PcTool'
New-Item -ItemType Directory $dest -Force
Copy-Item "$HOME\lab\PcTool\*" $dest -Recurse -Force`,
          lines: [
            R`بنزوّد فولدر المعمل **قدام** [[$env:PSModulePath]]، فـ PowerShell يدوّر فيه الأول ويلاقي نسختك قبل أي نسخة متسطّبة. الفاصل بين المسارات [[;]] في ويندوز و [[:]] في لينكس وماك، و [[PathSeparator]] بتجيب الصح. والتعديل ده للجلسة دي بس، وبيضيع لما تقفل النافذة.`,
            R`بيدوّر في كل فولدرات [[PSModulePath]] على موديول اسمه [[PcTool]] ويعرضه من غير ما يحمّله. لو مطلعش حاجة، يبقى اسم الفولدر مش زي اسم الـ [[.psd1]]، أو الفولدر الأب مش في المسار.`,
            R`بننادي الأمر من غير [[Import-Module]]. ده الـ autoloading: PowerShell ملقاش الأمر في الجلسة، فدوّر في الموديولات اللي في [[PSModulePath]] ولقاه في [[FunctionsToExport]] بتاع [[PcTool]] وحمّله لوحده.`,
            R`من غير [[-ListAvailable]] بيعرض الموديولات المحمّلة فعلًا بس. ظهور [[PcTool]] هنا بيأكد إن النداء اللي فات هو اللي حمّله.`,
            R`بنسأل ويندوز فين فولدر Documents الحقيقي. [[GetFolderPath('MyDocuments')]] بترجّع المسار اللي PowerShell نفسه بيبني منه مسار الموديولات بتاعك، فلو Documents متزامن مع OneDrive أو متنقل، هتاخد [[...\OneDrive\Documents]] الصح بدل [[$HOME\Documents]] اللي ساعتها مش في [[PSModulePath]].`,
            R`مكان التسطيب الدائم لليوزر في PowerShell 7: [[Join-Path]] بتلزق [[PowerShell\Modules\PcTool]] في آخر Documents بالفاصل الصح. والفولدر الأخير لازم اسمه [[PcTool]] زي الموديول. في 5.1 الفولدر اسمه [[WindowsPowerShell\Modules]] بدل [[PowerShell\Modules]]. ولو عايز تتأكد، أول مسار في [[$env:PSModulePath -split ';']] في نافذة جديدة هو نفس المكان ده.`,
            R`بيعمل الفولدر، و [[-Force]] بتعمل أي فولدر ناقص في السكة ([[PowerShell]] و [[Modules]]) ومبترميش error لو الفولدر موجود. هيطبع الفولدر كـ object، ولو مش عايزه زوّد [[| Out-Null]].`,
            R`[[\*]] بتنسخ اللي جوه [[PcTool]] مش الفولدر نفسه، فمتطلعش [[PcTool\PcTool]]. [[-Recurse]] بتاخد الفولدرات اللي جوه، و [[-Force]] بتكتب فوق النسخة القديمة لما تحدّث. بعدها افتح نافذة جديدة وجرّب [[Get-PcSchedule]] من غير أي تعديل للمسار.`
          ],
          try: R`زوّد المسار وجرّب [[Get-Module -ListAvailable PcTool]]. وبعدين **اقفل النافذة وافتح واحدة جديدة** وجرّب [[Get-PcSchedule]] — المفروض متشتغلش، لأن تعديل [[$env:PSModulePath]] بيضيع. وبعدين سطّبه في [[Documents\PowerShell\Modules]] (جوه المسار اللي بيرجّعه [[GetFolderPath('MyDocuments')]]) وجرّب تاني من نافذة جديدة.`,
          practice: [
            { lvl: 'سريع', t: R`اطبع [[$env:PSModulePath -split ';']] في [[pwsh]]، وبعدين في [[powershell]] (5.1) من نافذة جديدة، وقارن.`, done: R`في 7 أول مسار بيخلص بـ [[Documents\PowerShell\Modules]]، وفي 5.1 بـ [[Documents\WindowsPowerShell\Modules]]. و 7 بيشوف مسارات 5.1 كمان، لكن 5.1 مبيشوفش مسارات 7: يعني موديول في فولدر 7 مش هيتلاقي من [[powershell.exe]].` },
            { lvl: 'تطبيق', t: R`غيّر اسم فولدر الموديول في المعمل من [[PcTool]] لـ [[tools]] وجرّب [[Import-Module PcTool]] بعد ما تزوّد المعمل لـ [[PSModulePath]]. وبعدين رجّع الاسم وجرّب [[$PSModuleAutoLoadingPreference = 'None']] وانده [[Get-PcSchedule]].`, done: R`باسم [[tools]] الـ error بيبقى [[Modules_ModuleNotFound]]، وبالاسم الصح بيتحمّل. ومع [[None]] نفس الأمر بيرمي [[CommandNotFoundException]] رغم إن الموديول في المسار، ولما ترجّعها [[All]] بيشتغل لوحده: كده انت شفت الـ autoloading بيشتغل وبيتقفل.` },
            { lvl: 'تحدي', t: R`اكتب [[Install-PcTool.ps1]] بياخد [[-Destination]] (الافتراضي جوه [[GetFolderPath('MyDocuments')]])، وبينسخ لفولدر باسم النسخة ([[PcTool\1.0.0]]) من الـ psd1، وبيدعم [[-WhatIf]]، وبيتأكد في الآخر من نافذة جديدة. جرّبه الأول بـ [[-Destination]] على فولدر مؤقت.`, done: R`[[-WhatIf]] بيطبع اللي هيتنسخ ومبيعملش ولا فولدر. والتشغيل التاني بيدّي نفس النتيجة من غير error. و [[pwsh -NoProfile -Command "Get-PcSchedule; (Get-Module PcTool).Version.ToString()"]] بيشتغل من غير [[Import-Module]] ويطبع النسخة اللي في الـ manifest.` },
          ],
          flag: "script",
          deep: {
            why: R`الأداة اللي محتاجة مسار مش أداة، دي ملف. أول ما تتسطّب، بتبقى جزء من النظام بتاعك: بتتكتب باسمها، والـ Tab بيكمّلها، و [[Get-Help]] بتشتغل عليها، وأي سكربت تاني يقدر يناديها.`,
            how: R`[[$env:PSModulePath]] قايمة مسارات مفصولة بـ [[;]] على ويندوز. PowerShell بيفحصها بالترتيب، فاللي قدام بيكسب.

الـ autoloading بيشتغل كده: أول نافذة، PowerShell بيعمل فهرس من الـ manifests في المسارات دي — **اسم كل أمر → أنهي موديول**. لما تكتب أمر مش موجود في جلستك، بيبص في الفهرس، ولو لقاه بيحمّل الموديول ويشغّل الأمر. وعشان كده [[FunctionsToExport]] الصريحة مهمة (درس ٣): من غيرها الفهرس مبيتعملش والموديول بيتحمّل كله.

الـ autoloading بيشتغل مع: نداء الأمر، و [[Get-Command]]، و [[Get-Help]]. وبيتقفل بـ [[$PSModuleAutoloadingPreference = 'None']].

ونسخ متعددة: لو حطيت [[PcTool\1.0.0\PcTool.psd1]] و [[PcTool\1.1.0\PcTool.psd1]]، PowerShell بياخد الأحدث افتراضيًا، وتقدر تطلب نسخة بـ [[Import-Module PcTool -RequiredVersion 1.0.0]].

وانت بتطوّر، [[Import-Module -Force]] ضرورية: PowerShell بيحمّل الموديول مرة واحدة في الجلسة، فتعديلك مش هيبان. أو [[Remove-Module PcTool]] وبعدين نادي الأمر تاني.

و PowerShell 5.1 ليه مسار تاني ([[Documents\WindowsPowerShell\Modules]]) — النسختين منفصلتين تمامًا.

ومسار اليوزر نفسه مش ثابت: PowerShell بيبنيه من فولدر Documents اللي ويندوز بيقول عليه، مش من [[$HOME\Documents]]. لو Documents متزامن مع OneDrive، أول مسار في [[PSModulePath]] بيبقى [[...\OneDrive\Documents\PowerShell\Modules]]، وأي موديول في [[$HOME\Documents\PowerShell\Modules]] مبيتلاقاش. عشان كده بنبني مكان التسطيب من [[[Environment]::GetFolderPath('MyDocuments')]].`,
            when: R`أول ما تخلص تطوير وتبقى هتستخدم الأداة فعلًا. وقبل كده، زوّد المسار للجلسة بس.`,
            mistakes: R`اسم الفولدر مش زي اسم الموديول، فمش بيتلاقى أبدًا. أو تعدّل [[$env:PSModulePath]] وتستنى إنه يفضل بعد ما تقفل النافذة. أو تعدّل الموديول وتنسى [[-Force]] وتفضل تستغرب إن التعديل مش ظاهر. أو تحطه في فولدر PowerShell نفسه فيضيع مع أول تحديث. أو تحطه في [[WindowsPowerShell\Modules]] وانت شغال على نسخة 7. أو تكتب [[$HOME\Documents]] بإيدك و Documents عندك متزامن مع OneDrive، فتنسخ في فولدر PowerShell مش بيدوّر فيه.`
          },
          teach: R`## الفكرة في سطر

حط الموديول في فولدر PowerShell بيدوّر فيه، وبنفس اسم الموديول — وهو هيتحمّل لوحده.

---

## ١. المسارات

~~~powershell PowerShell 7.6
$env:PSModulePath -split [IO.Path]::PathSeparator
~~~

على ويندوز هتلاقي تلاتة مهمين:

| المسار | لمين | تحط فيه؟ |
|---|---|---|
| [[Documents\PowerShell\Modules]] (جوه Documents بتاعك) | ليك انت | **أيوه** |
| [[$env:ProgramFiles\PowerShell\Modules]] | لكل اليوزرز (محتاج admin) | على سيرفر |
| مسار PowerShell نفسه | موديولات النظام | **لأ** — بيتمسح مع التحديث |

> نسخة 5.1 بتستخدم [[Documents\WindowsPowerShell\Modules]]. النسختين منفصلتين خالص.

### Documents مش دايمًا [[$HOME\Documents]]

لو ويندوز بيزامن Documents مع OneDrive، أو الشركة نقلته لمكان تاني، أول سطر في الناتج اللي فوق بيبقى حاجة زي:

~~~text
C:\Users\you\OneDrive\Documents\PowerShell\Modules
~~~

وساعتها [[$HOME\Documents\PowerShell\Modules]] **مش في القايمة**، وأي موديول تحطه هناك الـ autoloading مش هيشوفه. المكان الصح بتسأل عليه ويندوز:

~~~powershell
[Environment]::GetFolderPath('MyDocuments')
~~~

ده نفس الفولدر اللي PowerShell بيبني منه مسار الموديولات بتاعك، فاللي هتبنيه منه هيبقى في [[PSModulePath]] على طول.

---

## ٢. الشرط اللي بيوقّع الناس

~~~text الشكل الصح
Modules\
  PcTool\              <-- اسم الفولدر = اسم الموديول
    PcTool.psd1
    PcTool.psm1
~~~

~~~text مش هيتلاقى
Modules\
  tools\
    PcTool.psd1
~~~

لو اسم الفولدر مش زي اسم الموديول، [[Import-Module PcTool]] مش هيلاقيه مهما عملت.

---

## ٣. للتجربة: زوّد المسار للجلسة بس

~~~powershell PowerShell 7.6
$env:PSModulePath = "$HOME\lab" + [IO.Path]::PathSeparator + $env:PSModulePath
Get-Module -ListAvailable PcTool
~~~

~~~text الناتج (اتشغّل فعلًا)
Name   Version ModuleType Path
----   ------- ---------- ----
PcTool 1.0.0       Script  C:\Users\...\lab\PcTool\PcTool.psd1
~~~

> ده **للجلسة الحالية بس**، وبيضيع أول ما تقفل النافذة. وده بالظبط اللي انت عايزه وانت بتطوّر.

---

## ٤. الـ autoloading شغّال

جرّبت من غير أي [[Import-Module]]:

~~~powershell PowerShell 7.6
'محمّل؟ ' + [bool](Get-Module PcTool)
Get-PcSchedule | Out-Null
'محمّل دلوقتي؟ ' + [bool](Get-Module PcTool)
~~~

~~~text الناتج (اتشغّل فعلًا)
محمّل؟ False
محمّل دلوقتي؟ True
1.0.0
~~~

نداء الأمر لوحده حمّل الموديول. ودي اللحظة اللي الأداة بتبقى فيها جزء من النظام.

---

## ٥. فخ التطوير: التعديل مش بيبان

ده أكتر حاجة بتضيّع وقت. عملت موديول صغير وعدّلته:

~~~powershell PowerShell 7.6
Set-Content .\demo.psm1 'function Get-Demo { "النسخة الأولى" }'
Import-Module .\demo.psm1
'أول مرة:     ' + (Get-Demo)

Set-Content .\demo.psm1 'function Get-Demo { "النسخة التانية" }'
Import-Module .\demo.psm1
'بعد التعديل: ' + (Get-Demo)

Import-Module .\demo.psm1 -Force
'بـ -Force:    ' + (Get-Demo)
~~~

~~~text الناتج (اتشغّل فعلًا)
أول مرة:     النسخة الأولى
بعد التعديل: النسخة الأولى
بـ -Force:    النسخة التانية
~~~

**السطر التاني هو المشكلة:** عدّلت الملف، وعملت [[Import-Module]] تاني، والناتج القديم. PowerShell شايف إن الموديول متحمّل خلاص فمش بيعيد قرايته.

الحل: [[-Force]]، أو [[Remove-Module demo]] الأول.

---

## ٦. التسطيب الدائم

~~~powershell مرة واحدة
$docs = [Environment]::GetFolderPath('MyDocuments')
$dest = Join-Path $docs 'PowerShell\Modules\PcTool'
New-Item -ItemType Directory $dest -Force
Copy-Item "$HOME\lab\PcTool\*" $dest -Recurse -Force
~~~

| السطر | بيعمل إيه |
|---|---|
| [[$docs = ...]] | مكان Documents الحقيقي، حتى لو جوه OneDrive |
| [[Join-Path]] | بيلزق [[PowerShell\Modules\PcTool]] في آخره (في 5.1 [[WindowsPowerShell\Modules\PcTool]]) |
| [[New-Item ... -Force]] | بيعمل الفولدر وأي فولدر ناقص قبله |
| [[Copy-Item]] بـ [[\*]] | بينسخ اللي جوه [[PcTool]] من المعمل، مش الفولدر نفسه |

جرّبنا الخطوات دي على فولدر Documents وهمي جوه فولدر مؤقت، وبعد ما زوّدنا فولدر [[Modules]] بتاعه للمسار، [[Get-PcSchedule]] حمّلت الموديول لوحدها.

اقفل النافذة، افتح واحدة جديدة، واكتب [[Get-PcSchedule]]. لو اشتغل، خلاص — الأداة بقت أمر.

---

## ٧. نسختين جنب بعض

~~~text الشكل
Modules\PcTool\
  1.0.0\PcTool.psd1
  1.1.0\PcTool.psd1
~~~

PowerShell بياخد الأحدث لوحده، وتقدر تطلب واحدة بعينها:

~~~powershell
Import-Module PcTool -RequiredVersion 1.0.0
~~~

وده السبب اللي [[ModuleVersion]] في الـ manifest موجود عشانه.

---

## الخلاصة

- اسم الفولدر = اسم الموديول، وإلا مش هيتلاقى.
- [[Documents\PowerShell\Modules]] للتسطيب، و [[$env:PSModulePath]] المؤقت للتطوير.
- مكان Documents خده من [[[Environment]::GetFolderPath('MyDocuments')]]، مش [[$HOME\Documents]]: ممكن يكون جوه OneDrive.
- الـ autoloading بيحصل أول نداء، ومحتاج [[FunctionsToExport]] صريحة عشان يفضل سريع.
- [[-Force]] وانت بتعدّل، وإلا هتفضل تشوف النسخة القديمة.
- [[ModuleVersion]] بتخليك تشغّل نسختين جنب بعض.`,
          sol: R`السطرين اللي بيثبتوا إن الـ autoloading شغّال: الموديول مش محمّل، وبعد نداء واحد بقى محمّل — من غير [[Import-Module]] خالص.`,
          solCode: R`$env:PSModulePath = "$HOME\lab" + [IO.Path]::PathSeparator + $env:PSModulePath
'محمّل؟ ' + [bool](Get-Module PcTool)
Get-PcSchedule | Out-Null
'محمّل دلوقتي؟ ' + [bool](Get-Module PcTool)

# الناتج (اتشغّل فعلًا على ويندوز 11 و PowerShell 7.6):
# محمّل؟ False
# محمّل دلوقتي؟ True`
        }
      ]
    }
]);
