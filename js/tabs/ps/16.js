// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "اليوزرز والصلاحيات في ويندوز",
      l: 3,
      n: R`مين بيستخدم الجهاز وبأنهي صلاحيات: تعمل يوزر لحد من العيلة أو للتجارب، وتخلي حد أدمن أو تشيله، وتعرف السكربت شغال أدمن ولا لأ، وتتحكم مين يفتح فولدر. العرض من غير أدمن، والتعديل محتاج Terminal أدمن`,
      projects: [
        { lvl: 'صغير', t: R`مين أدمن هنا؟`, what: R`[[admins.ps1]] بيطبع أعضاء Administrators ونوع كل واحد ([[PrincipalSource]]) ومين فيهم شغال، وفي الآخر سطر «النافذة دي أدمن ولا لأ» من [[IsInRole]]. من دروس Add-LocalGroupMember و IsInRole.`, done: R`من نافذة عادية السطر الأخير بيقول لأ حتى لو حسابك في الجروب، ومن Terminal أدمن بيقول أيوه، والجدول نفسه نفس النتيجة في الحالتين.` },
        { lvl: 'صغير', t: R`حارس فولدر .ssh`, what: R`سكربت بيقرا [[(Get-Acl $HOME\.ssh).Access]] ويطبع تحذير لو فيه أي حد عنده صلاحية غير حسابك و [[SYSTEM]] و [[Administrators]]، لأن ssh بيرفض المفتاح لو حد تاني يقدر يقراه. من درس Get-Acl / Set-Acl.`, done: R`على فولدر سليم بيطبع OK والكود ٠. على فولدر تجربة في TEMP ادّيت فيه [[Users]] قراية، بيطبع اسم [[BUILTIN\Users]] والكود ١. ولو [[.ssh]] مش موجود أصلًا بيقول كده من غير error أحمر.` },
        { lvl: 'متوسط', t: R`تقرير حسابات الجهاز`, what: R`CSV فيه كل حساب local: Enabled و PrincipalSource و LastLogon، والجروبات اللي هو فيها (لفّ على [[Get-LocalGroup]] و [[Get-LocalGroupMember]])، ومسار البروفايل من [[Win32_UserProfile]] بالـ SID. من الوحدة كلها.`, done: R`كل حساب في صف واحد والجروبات مفصولة بـ [[;]] في خانة واحدة، وحسابك فيه Administrators و Users، والحسابات اللي ملهاش بروفايل الخانة فاضية مش error، وجروب فاضي مبيوقّفش السكربت.` },
        { lvl: 'متوسط', t: R`onboard.ps1 بـ WhatIf`, what: R`[[onboard.ps1 -Name -FullName]] بـ [[SupportsShouldProcess]]: يشيك أدمن بـ [[IsInRole]]، ولو الحساب موجود يقول كده ويخرج بـ ٠، ولو لأ يطلب الباسورد بـ [[Read-Host -AsSecureString]] ويعمل الحساب ويضيفه لجروب Users بالـ SID. من دروس New-LocalUser و Add-LocalGroupMember و IsInRole.`, done: R`[[-WhatIf]] من نافذة عادية بيطبع سطر [[Create new local user]] ومبيعملش حاجة. وخطوة الجروب في [[-WhatIf]] هتطلع [[Principal ... was not found]] لأن الحساب لسه متعملش، فامسك الحالة دي واطبع «would add to Users» بدل الأحمر. والتشغيل الحقيقي مرتين: التانية بتقول «موجود» من غير error.` },
        { lvl: 'كبير', t: R`حساب تجارب كامل وتنضيفه`, what: R`[[lab-user.ps1 -Action Create|Remove]]: بيرفع نفسه أدمن لو محتاج ([[Start-Process -Verb RunAs]] زي درس IsInRole)، و Create بيعمل يوزر [[lab]] لو مش موجود ويضيفه لـ Users، ويعمل فولدر [[C:\LabShare]] ويدّي الحساب ده Modify عليه بـ [[Set-Acl]]. و Remove بيقفل الحساب، ويمسح بروفايله بـ [[Remove-CimInstance]]، ويمسحه، ويشيل الفولدر. وكل خطوة في [[Start-Transcript]]، و [[-WhatIf]] شغال على كل حاجة. من الوحدة دي و «سكربتات زي المحترفين».`, done: R`Create مرتين ورا بعض مبيطلّعش error والتانية بتقول «موجود»، و [[icacls C:\LabShare]] فيه الحساب بـ [[(M)]]، و Remove بعدها بيرجّع الجهاز زي ما كان ([[Get-LocalUser lab]] بيطلع not found والفولدر مش موجود)، واللوج فيه سطر لكل خطوة، و [[-WhatIf]] مبيغيّرش حاجة.`, ext: R`زوّد إنك تدخل بالحساب ده مرة عشان البروفايل يتعمل وتتأكد إن Remove بيمسحه، وخلّي الصلاحيات تيجي من ملف JSON (مين ياخد إيه على أنهي فولدر)، وزوّد تقرير قبل وبعد.` },
        { lvl: 'فكرة', t: R`جهاز العيلة`, what: R`صمّم إعداد جهاز بيستخدمه أكتر من حد: مين أدمن ومين يوزر عادي، وفولدرات مشتركة ليها صلاحيات، وفولدرات خاصة. وابني سكربت بيطبّق ده من ملف إعدادات، وسكربت تاني بيراجع إن الجهاز لسه زي الإعدادات وبيطبع أي فرق. انت اللي بتقرر الحسابات والفولدرات.`, done: R`سكربت المراجعة على جهاز مطابق بيطبع «مطابق» والكود ٠، ولو زوّدت حد لـ Administrators بإيدك أو غيّرت صلاحية فولدر بيطلع الفرق بالظبط والكود ١، وسكربت التطبيق بيشتغل بـ [[-WhatIf]] الأول.`, ext: R`شغّل المراجعة كمهمة أسبوعية وابعت النتيجة إشعار، وزوّد الحسابات اللي مبتدخلش من ٩٠ يوم في التقرير.` },
      ],
      items: [
        {
          cmd: "Get-LocalUser / New-LocalUser",
          title: "اعرض اليوزرز واعمل يوزر جديد",
          desc: R`[[Get-LocalUser]] بيعرض حسابات اليوزرز اللي على الجهاز، و [[New-LocalUser]] بيعمل حساب local جديد (موجود على الجهاز ده بس): لحد من العيلة، أو حساب منفصل تجرب عليه برامج، أو يوزر عادي من غير صلاحيات أدمن تستخدمه كل يوم.

أعمدة Get-LocalUser: [[Name]] اسم الدخول، و [[Enabled]] الحساب شغال ولا متقفل، و [[LastLogon]] آخر دخول، و [[PrincipalSource]] نوع الحساب: [[Local]] حساب على الجهاز ده بس، و [[MicrosoftAccount]] حساب داخل بإيميل Microsoft. وهتلاقي حسابات ويندوز نفسه متقفلة زي [[Administrator]] و [[Guest]] و [[DefaultAccount]]، سيبها متقفلة.

[[Read-Host -AsSecureString]] بيسألك على الباسورد، وانت بتكتبه بيظهر نجوم، وبيرجّعه [[SecureString]] (نص متشفّر في الرام) مش نص عادي، وده النوع اللي [[-Password]] عايزه، فالباسورد مبيتكتبش في المثال ولا في الـ History. و [[@{ ... }]] مع [[@params]] هو splatting (درس «splatting»): الـ parameters في hashtable بدل سطر طويل. [[Name]] اسم الدخول (لحد 20 حرف، ومن غير رموز زي [[\ / : * ? @]])، و [[FullName]] الاسم اللي بيظهر في شاشة الدخول، و [[Description]] وصف (لحد 48 حرف)، و [[PasswordNeverExpires]] الباسورد ميخلصش. و [[-NoPassword]] حساب من غير باسورد خالص، ودي تنفع لحساب ألعاب أطفال على جهاز في البيت بس.

[[New-LocalUser]] مش بيحط الحساب في أي جروب (على عكس Settings و [[net user /add]])، فـ [[Add-LocalGroupMember -SID S-1-5-32-545]] بيضيفه لجروب Users عشان يبقى يوزر عادي ويعرف يدخل (الجروبات والـ SID في درس Add-LocalGroupMember).

الإنشاء محتاج Terminal أدمن: Win+X وبعدين Terminal (Admin)، أو [[Start-Process pwsh -Verb RunAs]] (درس Start-Process). الموديول [[Microsoft.PowerShell.LocalAccounts]] جاي مع ويندوز وشغال في 5.1 و 7 (جربته على 7.6)، بس مش في PowerShell 32 بت على ويندوز 64 بت. وفي ويندوز Home أداة [[lusrmgr.msc]] (Local Users and Groups) مش شغالة، فالأوامر دي أو Settings ← Accounts ← Other users هم الطريقة. والمقابل من CMD في درس «net user» في تاب «CMD».`,
          example: R`Get-LocalUser
Get-LocalUser | Select-Object Name, Enabled, LastLogon, PrincipalSource
$password = Read-Host "Password for sara" -AsSecureString
$params = @{ Name = "sara"; FullName = "Sara"; Password = $password; Description = "Family account"; PasswordNeverExpires = $true }
New-LocalUser @params
Add-LocalGroupMember -SID S-1-5-32-545 -Member "sara"
New-LocalUser -Name "kids" -NoPassword -Description "Kids games"
Get-LocalUser "sara" | Select-Object Name, Enabled, PasswordExpires`,
          try: R`اعرض كل الحسابات اللي على جهازك ونوع كل واحد، واعرف الحساب اللي انت شغال بيه Local ولا Microsoft. ولو عايز تجرب الإنشاء من غير ما تعمل حساب فعلًا، زوّد [[-WhatIf]].`,
          practice: [
            { lvl: 'سريع', t: R`[[Get-LocalUser | Where-Object Enabled | Select-Object Name, PrincipalSource]]`, done: R`الحسابات الشغالة بس، وحسابك فيهم بـ [[Local]] أو [[MicrosoftAccount]]، والحسابات المدمجة (Administrator و Guest و DefaultAccount) مش ظاهرة لأنها مقفولة.` },
            { lvl: 'تطبيق', t: R`جرّب الإنشاء بـ splatting و [[-WhatIf]] من نافذة عادية: [[$u = @{ Name = "test.lab"; NoPassword = $true; Description = "Lab" }; New-LocalUser @u -WhatIf]]، وبعدين [[Get-LocalUser test.lab]].`, done: R`الأول بيطبع [[What if: Performing the operation "Create new local user" on target "test.lab".]] حتى من غير أدمن، والتاني بيطلع [[User test.lab was not found.]]: يعني مفيش حساب اتعمل (اتجرب على 7.6 و 5.1).` },
            { lvl: 'تحدي', t: R`تقرير CSV لكل الحسابات: Name و Enabled و PrincipalSource و PasswordLastSet و LastLogon، وعمود [[NeverLoggedOn]] بـ True لو LastLogon فاضي.`, done: R`عدد الصفوف بيساوي [[@(Get-LocalUser).Count]]، والملف بيتفتح في Excel صح. ولو LastLogon فاضي عند كل الحسابات حتى بتاعك (زي اللي حصل في الدرس)، اكتب في أول التقرير إن العمود ده مش مضمون بدل ما تعتمد عليه.` },
          ],
          flag: "danger",
          deep: {
            why: R`حد من العيلة محتاج يستخدم الجهاز من غير ما يشوف ملفاتك ولا يسطّب حاجات، أو عايز حساب نضيف تجرب عليه برنامج مشكوك فيه أو إعدادات جديدة، أو حساب Standard تشتغل بيه كل يوم وحساب أدمن للتسطيب بس. ومن الأوامر تقدر تعمل كذا حساب في سكربت (معمل كمبيوتر مثلًا) بدل الضغط في Settings.`,
            how: R`حساب Microsoft: بتدخل بإيميل، والإعدادات والباسوردات بتتزامن، والباسورد بيتغير أو يترجع من النت، ومفتاح «Device encryption» بيتحفظ فيه (درس Get-BitLockerVolume). حساب Local: موجود على الجهاز ده بس ومش محتاج نت، ولو نسيت الباسورد مفيش استرجاع من النت (غير أسئلة الأمان لو حطيتها). [[New-LocalUser]] بيعمل local بس، وحساب Microsoft بيتضاف من Settings ← Accounts ← Other users ← Add account.

[[SecureString]]: Read-Host بيرجّع object مش نص، فلو طبعته يظهر [[System.Security.SecureString]] مش الباسورد. ولو حطيت الباسورد نص صريح في سكربت ([[ConvertTo-SecureString "123" -AsPlainText -Force]]) هيفضل مكتوب في الملف وفي الـ History، فده للمعامل والتجارب بس.

[[LastLogon]] ممكن يطلع فاضي حتى للحساب اللي شغال بيه كل يوم: عندي حساب Microsoft بدخل بيه بالـ PIN كل يوم وطلع فاضي، و [[net user]] قال [[Never]]. فمتعتمدش عليه لوحده.

[[New-LocalUser]] بيعمل الحساب بس، وفولدر C:\Users\sara مش بيتعمل غير أول ما الحساب يسجّل دخول.`,
            when: R`حساب لحد تاني على نفس الجهاز، أو حساب للتجارب، أو فصل حسابك اليومي عن حساب الأدمن، أو تجهيز كذا جهاز بنفس الحسابات بسكربت.`,
            mistakes: R`تعمل الحساب وتنسى تضيفه لجروب Users. أو تكتب الباسورد نص صريح في السكربت. أو تستخدم [[-NoPassword]] على لابتوب بيخرج من البيت. أو تحاول تعمل حساب بإيميل Microsoft بـ New-LocalUser (ده local بس). أو تشغّله من غير أدمن فيطلع Access denied. أو تختار اسم أطول من 20 حرف أو فيه [[@]].`
          },
          teach: R`## الفكرة: اعرض الحسابات، واعمل حساب، وحطه في جروب

[[Get-LocalUser]] بيعرض حسابات الجهاز، و [[New-LocalUser]] بيعمل حساب local (موجود على الجهاز ده بس). العرض اتجرّب على ويندوز 11 Home في PowerShell 7.6 من غير أدمن. الإنشاء محتاج Terminal أدمن ومعملتش حسابات حقيقية، فجربته بـ [[-WhatIf]] بس. (غيّرت اسم حسابي لـ [[me]] في الناتج.)

---

## ١. كل الحسابات

~~~powershell
Get-LocalUser
~~~

~~~text الناتج
Name               Enabled Description
----               ------- -----------
me                    True
Administrator        False Built-in account for administering the computer/domain
DefaultAccount       False A user account managed by the system.
Guest                False Built-in account for guest access to the computer/domain
WDAGUtilityAccount   False A user account managed and used by the system for Windows Defender Application Guard scenar…
~~~

حساب واحد بتاعي شغال ([[Enabled True]])، والباقي حسابات ويندوز نفسه ومتقفلة، وسيبها كده.

---

## ٢. أعمدة تانية

~~~powershell
Get-LocalUser | Select-Object Name, Enabled, LastLogon, PrincipalSource
~~~

~~~text الناتج
Name               Enabled LastLogon  PrincipalSource
----               ------- ---------  ---------------
me                    True           MicrosoftAccount
Administrator        False                      Local
...
~~~

- [[PrincipalSource]] نوع الحساب: [[MicrosoftAccount]] بتدخل بإيميل Microsoft، و [[Local]] على الجهاز ده بس.
- [[LastLogon]] فاضي لكل الحسابات، حتى بتاعي اللي داخل بيه دلوقتي. فمتعتمدش عليه.

---

## ٣. الباسورد من غير ما يتكتب

~~~powershell
$password = Read-Host "Password for sara" -AsSecureString
~~~

- [[Read-Host "..."]] اسأل اليوزر واستنى يكتب.
- [[-AsSecureString]] وهو بيكتب يظهر نجوم، والناتج نوعه [[SecureString]]: نص متشفّر في الرام. لو طبعته هتشوف اسم النوع بس:

~~~text الناتج لو كتبت $password
System.Security.SecureString
~~~

وده النوع اللي [[-Password]] عايزه، فالباسورد مش مكتوب في السكربت ولا في الـ History.

---

## ٤. بيانات الحساب: splatting

~~~powershell
$params = @{ Name = "sara"; FullName = "Sara"; Password = $password; Description = "Family account"; PasswordNeverExpires = $true }
New-LocalUser @params
~~~

[[@{ ... }]] hashtable: كل مفتاح اسم parameter وجنبه قيمته. و [[@params]] (بـ [[@]] مش [[$]]) بيفرد الـ hashtable دي parameters للأمر (درس «splatting»). يعني نفس [[New-LocalUser -Name "sara" -FullName "Sara" ...]] بس مقري أكتر.

| المفتاح | معناه |
|---|---|
| [[Name]] | اسم الدخول (لحد 20 حرف) |
| [[FullName]] | الاسم اللي بيظهر في شاشة الدخول |
| [[Password]] | الـ SecureString |
| [[Description]] | وصف |
| [[PasswordNeverExpires = $true]] | الباسورد ميخلصش. ده switch، و [[$true]] في الـ hashtable معناها «اكتبه» |

جربت اسم 26 حرف:

~~~text الناتج
Cannot validate argument on parameter 'Name'. The character length of the 26 argument is too long. ... fewer than or equal to "20" characters ...
~~~

---

## ٥. حطه في جروب Users

~~~powershell
Add-LocalGroupMember -SID S-1-5-32-545 -Member "sara"
~~~

[[New-LocalUser]] مش بيحط الحساب في أي جروب، فـ [[Add-LocalGroupMember]] بيضيفه لجروب **Users**. و [[-SID S-1-5-32-545]] رقم الجروب ده الثابت في كل ويندوز بأي لغة (درس Add-LocalGroupMember).

---

## ٦. حساب من غير باسورد، والتأكد

~~~powershell
New-LocalUser -Name "kids" -NoPassword -Description "Kids games"
Get-LocalUser "sara" | Select-Object Name, Enabled, PasswordExpires
~~~

[[-NoPassword]] حساب من غير باسورد خالص (لجهاز في البيت بس). ومحتاج برضه سطر Add-LocalGroupMember. وبـ [[-WhatIf]] (من غير أدمن):

~~~text الناتج من New-LocalUser -Name "sara" -NoPassword -Description "Kids games" -WhatIf
What if: Performing the operation "Create new local user" on target "sara".
~~~

وآخر سطر بيتأكد إن الحساب اتعمل. على جهازي (الحساب مش موجود) طلع [[User sara was not found.]]

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اعرض | [[Get-LocalUser]] |
| باسورد بنجوم | [[Read-Host "..." -AsSecureString]] |
| اعمل حساب (أدمن) | [[New-LocalUser @params]] أو [[-NoPassword]] |
| خليه يوزر عادي | [[Add-LocalGroupMember -SID S-1-5-32-545 -Member "sara"]] |
| جرّب من غير ما تعمل | زوّد [[-WhatIf]] |`,
          lines: [
            "كل الحسابات اللي على الجهاز.",
            "الاسم، وشغال ولا متقفل، وآخر دخول، ونوع الحساب.",
            "اسأل على الباسورد وهو بيظهر نجوم، ورجّعه SecureString.",
            "بيانات الحساب في hashtable، و [[$true]] للـ switch.",
            "اعمل الحساب بالبيانات دي (splatting، أدمن).",
            "حطه في جروب Users بالـ SID عشان يعرف يدخل.",
            "حساب من غير باسورد (لجهاز في البيت بس). محتاج برضه يتحط في Users.",
            "اتأكد إنه اتعمل وشغال."
          ],
          sol: R`جربت العرض على ويندوز 11 Home من غير أدمن. [[Get-LocalUser]] طلع 5 حسابات: الحساب اللي شغال بيه [[True]] و [[MicrosoftAccount]]، و [[Administrator]] و [[DefaultAccount]] و [[Guest]] و [[WDAGUtilityAccount]] كلهم [[False]] و [[Local]]. و [[LastLogon]] كان فاضي لكل الحسابات، حتى بتاعي.

وجربت الإنشاء بـ [[-WhatIf]] بس: [[New-LocalUser -Name "sara" -NoPassword -Description "Kids account" -WhatIf]] طبع [[What if: Performing the operation "Create new local user" on target "sara".]] من غير ما يعمل حاجة. ومن غير WhatIf في Terminal أدمن، التوثيق بيقول إنه بيطبع جدول فيه [[Name]] و [[Enabled]] بـ True و [[Description]]. (معملتش حسابات حقيقية على الجهاز وأنا بكتب الدرس.)`
        },
        {
          cmd: "Set-LocalUser / Remove-LocalUser",
          title: "غيّر الباسورد، اقفل الحساب، امسحه صح",
          desc: R`[[Set-LocalUser]] بيغيّر حاجات في حساب local موجود (الباسورد والوصف وانتهاء الباسورد)، و [[Disable-LocalUser]] بيقفل الحساب من غير ما يمسحه، و [[Remove-LocalUser]] بيمسحه خالص. القاعدة: اقفل الأول، وامسح بعدين لما تتأكد إن محدش محتاج حاجة منه.

[[-Password $new]] باسورد جديد من [[Read-Host -AsSecureString]] (الدرس اللي فات). و [[-PasswordNeverExpires $true]] هنا بياخد قيمة True أو False، مش switch زي New-LocalUser. و [[Enable-LocalUser]] بيرجّع الحساب المقفول. و [[Rename-LocalUser -NewName]] بيغيّر اسم الدخول بس: الـ SID (رقم الحساب الحقيقي اللي الصلاحيات مربوطة بيه) بيفضل زي ما هو، وفولدر البروفايل في C:\Users بيفضل بالاسم القديم.

المسح: [[Remove-LocalUser]] بيمسح الحساب بس، وفولدر البروفايل (C:\Users\sara بالـ Desktop والـ Documents وكل حاجة) بيفضل على الديسك. [[Get-CimInstance Win32_UserProfile]] بيعرض البروفايلات الحقيقية: [[LocalPath]] مكان الفولدر، و [[SID]] الحساب، و [[Loaded]] حد داخل بيه دلوقتي، و [[-Filter "Special = false"]] من غير بروفايلات النظام. و [[$sid = (Get-LocalUser "sara.m").SID.Value]] رقم الحساب كنص، و [[Where-Object SID -eq $sid]] البروفايل بتاعه، و [[Remove-CimInstance]] بيمسح البروفايل صح (الفولدر وبياناته في الـ registry) وده لازم قبل مسح الحساب، لأن بعده مش هتعرف الـ SID بسهولة. أو من Settings ← Accounts ← Other users ← الحساب ← Remove، ودي بتمسح الاتنين.

كل أوامر التعديل محتاجة Terminal أدمن، والحساب لازم ميكونش داخل ([[Loaded]] False). وحساب Microsoft باسورده مش بيتغير من هنا: التوثيق بيقول متحطش [[-Password]] لحساب مربوط بحساب Microsoft، باسورده من account.microsoft.com. والمقابل من CMD في درس «net user» في تاب «CMD».`,
          example: R`$new = Read-Host "New password" -AsSecureString
Set-LocalUser -Name "sara" -Password $new -PasswordNeverExpires $true
Disable-LocalUser -Name "sara"
Enable-LocalUser -Name "sara"
Rename-LocalUser -Name "sara" -NewName "sara.m"
Get-CimInstance Win32_UserProfile -Filter "Special = false" | Select-Object LocalPath, SID, Loaded, LastUseTime
$sid = (Get-LocalUser "sara.m").SID.Value
Get-CimInstance Win32_UserProfile | Where-Object SID -eq $sid | Remove-CimInstance
Remove-LocalUser -Name "sara.m"`,
          try: R`اعرض البروفايلات الحقيقية على جهازك، وقارنها بالفولدرات اللي في [[C:\Users]]. فيه فولدرات ملهاش بروفايل؟`,
          practice: [
            { lvl: 'سريع', t: R`[[Disable-LocalUser -Name Guest -WhatIf]]، وبعدين [[(Get-LocalUser Guest).Enabled]].`, done: R`الأول بيطبع [[What if: Performing the operation "Disable local user" on target "Guest".]] من غير أدمن، والتاني بيرجّع نفس القيمة اللي كانت قبله (مفيش حاجة اتغيّرت).` },
            { lvl: 'تطبيق', t: R`[[offboard.ps1 -Name]] بـ [[SupportsShouldProcess]]: يتأكد إن الحساب موجود، ويقفله بـ [[Disable-LocalUser]]، ويطبع مسار البروفايل بتاعه من [[Win32_UserProfile]] بالـ SID، من غير ما يمسح أي حاجة. جرّبه بـ [[-WhatIf]] على حساب موجود، وباسم مش موجود.`, done: R`الاسم المش موجود بيطلع رسالتك انت (مش الـ error الأحمر [[User ... was not found.]]) والكود ١، و [[-WhatIf]] بيطبع سطر [[Disable local user]] والحساب لسه Enabled، ومسار البروفايل اتطبع.` },
            { lvl: 'تحدي', t: R`قارن ٣ لستات: فولدرات [[C:\Users]]، والبروفايلات في [[Win32_UserProfile -Filter "Special = false"]]، والحسابات في [[Get-LocalUser]] بالـ SID. وطلّع: فولدر من غير بروفايل، وبروفايل من غير حساب local، وحساب عمره ما دخل (ملوش بروفايل).`, done: R`[[Public]] بيطلع في «فولدر من غير بروفايل»، وحسابك مش في ولا لستة، والحسابات المدمجة المقفولة في «عمره ما دخل»، والسكربت كله [[Get-]] فمبيغيّرش حاجة.` },
          ],
          flag: "danger",
          deep: {
            why: R`حد نسي الباسورد، أو حد ساب البيت أو الشغل ومحتاج تقفل حسابه بس تحتفظ بملفاته، أو حساب تجارب خلص دوره. والمسح الغلط (تمسح الحساب وتسيب الفولدر، أو تمسح الفولدر بإيدك) بيسيب ملفات تقيلة محدش عارف بتاعة مين، أو بروفايل مكسور في الـ registry.`,
            how: R`ويندوز بيعرف الحساب بالـ SID مش بالاسم، زي [[S-1-5-21-...-1001]]. الصلاحيات على الملفات (درس Get-Acl / Set-Acl) والبروفايل مربوطين بالـ SID، عشان كده Rename ميبوّظش حاجة، ومسح الحساب بيخلي أي صلاحية كانت ليه تظهر كـ SID غريب من غير اسم.

[[Disable-LocalUser]] بيمنع الدخول بس: الملفات والصلاحيات والمهام المجدولة بتاعة الحساب كلها موجودة، وتقدر ترجّعه في ثانية. عشان كده أأمن خطوة أولى.

[[Win32_UserProfile]] هو اللي ويندوز بيستخدمه في System Properties ← User Profiles. [[Remove-CimInstance]] عليه بيمسح فولدر البروفايل ومفتاحه في [[HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList]]. أما [[Remove-Item C:\Users\sara -Recurse]] بيمسح الفولدر بس، ولو الحساب لسه موجود ودخل تاني، ويندوز بيعمله بروفايل مؤقت (TEMP) لأن المفتاح بيشاور على فولدر مش موجود.`,
            when: R`تغيير باسورد حساب local من غير ما تدخل بيه، أو قفل حساب مؤقتًا، أو تنضيف حسابات قديمة والمساحة اللي واخدينها.`,
            mistakes: R`تمسح الحساب الأول وبعدين تدوّر على البروفايل بتاعه. أو تمسح فولدر C:\Users بإيدك. أو تمسح من غير ما تاخد نسخة من ملفاته. أو تحاول تغيّر باسورد حساب Microsoft بـ Set-LocalUser. أو تقفل آخر حساب أدمن على الجهاز (افضل سايب حساب أدمن واحد على الأقل شغال). أو تفتكر [[-WhatIf]] مع Remove-LocalUser بيتأكد إن الحساب موجود: جربت [[Remove-LocalUser -Name "nosuchuser" -WhatIf]] وطبع «What if» عادي لحساب مش موجود.`
          },
          teach: R`## الفكرة: غيّر، اقفل، وامسح بالترتيب الصح

الأوامر دي بتعدّل حساب local موجود، وكلها محتاجة Terminal أدمن. مغيّرتش ولا مسحت أي حساب وأنا بكتب الدرس: جربت كل أمر تعديل بـ [[-WhatIf]] على حساب [[Guest]] المدمج في PowerShell 7.6، والعرض اتجرّب بجد. (اسم حسابي في الناتج [[me]].)

---

## ١. باسورد جديد

~~~powershell
$new = Read-Host "New password" -AsSecureString
Set-LocalUser -Name "sara" -Password $new -PasswordNeverExpires $true
~~~

- [[Read-Host -AsSecureString]] الباسورد بنجوم، ويرجع SecureString (الدرس اللي فات).
- [[Set-LocalUser -Name "sara"]] عدّل الحساب ده.
- [[-PasswordNeverExpires $true]]: هنا **parameter بقيمة** True أو False، مش switch زي New-LocalUser، فلازم تكتب [[$true]] بعده.

~~~text الناتج من Set-LocalUser -Name "Guest" -Description "x" -WhatIf
What if: Performing the operation "Modify local user" on target "Guest".
~~~

---

## ٢. اقفل ورجّع

~~~powershell
Disable-LocalUser -Name "sara"
Enable-LocalUser -Name "sara"
~~~

[[Disable-LocalUser]] بيمنع الدخول بس: الملفات والصلاحيات موجودة، وترجّعه بـ [[Enable-LocalUser]] في ثانية. عشان كده دي أول خطوة قبل أي مسح.

~~~text الناتج بـ -WhatIf على Guest
What if: Performing the operation "Disable local user" on target "Guest".
What if: Performing the operation "Enable local user" on target "Guest".
~~~

---

## ٣. غيّر الاسم

~~~powershell
Rename-LocalUser -Name "sara" -NewName "sara.m"
~~~

بيغيّر اسم الدخول بس. ويندوز بيعرف الحساب برقم اسمه **SID** (Security Identifier)، والرقم ده مش بيتغير، ولا فولدر [[C:\Users\sara]].

~~~text الناتج بـ -WhatIf
What if: Performing the operation "Rename local user to Guest2" on target "Guest".
~~~

---

## ٤. البروفايلات الحقيقية

~~~powershell
Get-CimInstance Win32_UserProfile -Filter "Special = false" | Select-Object LocalPath, SID, Loaded, LastUseTime
~~~

- [[Win32_UserProfile]] الـ class اللي فيه بروفايلات اليوزرز (الفولدر وبياناته).
- [[-Filter "Special = false"]] من غير بروفايلات النظام. من غيره طلعوا 4، التلاتة الزيادة فولدرات خدمات ويندوز زي [[C:\WINDOWS\ServiceProfiles\LocalService]].

~~~text الناتج
LocalPath    SID               Loaded LastUseTime
---------    ---               ------ -----------
C:\Users\me  S-1-5-21-...-1001   True 10/6/2026 10:18:05 AM
~~~

| العمود | معناه |
|---|---|
| [[LocalPath]] | مكان الفولدر |
| [[SID]] | رقم الحساب (قصّرت الجزء اللي في النص). الجزء الطويل خاص بالجهاز، والرقم الأخير ([[1001]]) بيميّز الحساب ده عن باقي حسابات الجهاز |
| [[Loaded]] | حد داخل بيه دلوقتي؟ |
| [[LastUseTime]] | آخر استخدام |

ولاحظ: [[Get-ChildItem C:\Users -Directory]] طلع 16 فولدر (زي [[Public]] و [[TEMP]] و [[UMFD-0]])، وبروفايل حقيقي واحد بس. يعني فولدر في C:\Users مش معناه حساب.

---

## ٥. المسح بالترتيب

~~~powershell
$sid = (Get-LocalUser "sara.m").SID.Value
Get-CimInstance Win32_UserProfile | Where-Object SID -eq $sid | Remove-CimInstance
Remove-LocalUser -Name "sara.m"
~~~

1. [[(Get-LocalUser "sara.m").SID]] بيرجع object نوعه [[SecurityIdentifier]]، و [[.Value]] الرقم كنص (عشان نقارنه بالنص اللي في Win32_UserProfile).
2. [[Where-Object SID -eq $sid]] البروفايل بتاع الحساب ده، و [[Remove-CimInstance]] بيمسحه صح: الفولدر وبياناته في الـ registry. لازم الحساب ميكونش داخل ([[Loaded]] False).
3. [[Remove-LocalUser]] بيمسح الحساب نفسه.

ليه البروفايل **الأول**؟ لأن بعد مسح الحساب مش هتعرف تجيب الـ SID بالاسم. و [[Remove-LocalUser]] لوحده بيسيب الفولدر كامل على الديسك.

> [[-WhatIf]] مع Remove-LocalUser مش بيتأكد إن الحساب موجود: [[Remove-LocalUser -Name "nosuchuser" -WhatIf]] طبع [[What if: Performing the operation "Remove local user" on target "nosuchuser".]] عادي.

---

## الخلاصة

| عايز | اكتب (أدمن) |
|---|---|
| باسورد جديد | [[Set-LocalUser -Name x -Password $new]] |
| تقفل مؤقتًا | [[Disable-LocalUser]]، وترجّع بـ [[Enable-LocalUser]] |
| تغيّر الاسم | [[Rename-LocalUser -NewName]] (الـ SID والفولدر زي ما هم) |
| تشوف البروفايلات | [[Get-CimInstance Win32_UserProfile -Filter "Special = false"]] |
| تمسح صح | البروفايل بـ [[Remove-CimInstance]]، وبعدين [[Remove-LocalUser]] |`,
          lines: [
            R`[[Read-Host -AsSecureString]] بيسألك على الباسورد ويظهره نجوم وانت بتكتب، ويرجّعه SecureString (نص متشفّر في الذاكرة) مش نص عادي، لأن [[-Password]] في أوامر LocalUser مبتقبلش غير النوع ده.`,
            R`بيغيّر باسورد sara بالجديد. [[-PasswordNeverExpires]] هنا بياخد قيمة [[$true]] أو [[$false]] (مش switch زي في New-LocalUser)، فلازم تكتب القيمة بعده. محتاج نافذة أدمن.`,
            R`بيقفل الحساب: sara مش هتقدر تدخل، بس الحساب وملفاتها وإعداداتها كلها فاضلة. أأمن من المسح لو مش متأكد، لأنك ترجّعه بأمر واحد.`,
            R`بيرجّع الحساب شغال تاني، فـ sara تقدر تدخل بنفس الباسورد وكل حاجتها زي ما هي.`,
            R`بيغيّر اسم الدخول بس من sara لـ sara.m. الـ SID (الرقم الحقيقي للحساب) وفولدر البروفايل [[C:\Users\sara]] بيفضلوا زي ما هم، فالصلاحيات اللي على الملفات مش بتتأثر.`,
            R`البروفايلات الحقيقية على الجهاز: [[Win32_UserProfile]] كل فولدر يوزر، و [[Special = false]] بيستبعد بروفايلات السيستم. الأعمدة: [[LocalPath]] الفولدر، و [[SID]] صاحبه، و [[Loaded]] لو True يبقى حد داخل بيه دلوقتي، و [[LastUseTime]] آخر استخدام.`,
            R`بيجيب الـ SID بتاع الحساب الجديد الاسم كنص ([[.Value]])، عشان نلاقي بيه البروفايل في السطر اللي بعده. الـ SID هو الرابط الوحيد بين الحساب وفولدره، مش الاسم.`,
            R`بيدوّر على البروفايل اللي الـ SID بتاعه ده، و [[Remove-CimInstance]] بيمسحه بالطريقة الصح: الفولدر والإعدادات المسجلة في ويندوز مع بعض. لازم الحساب ميكونش داخل ([[Loaded]] بـ False)، وده مسح نهائي.`,
            R`بيمسح الحساب نفسه. لازم ييجي بعد مسح البروفايل، لأن لو مسحت الحساب الأول الفولدر بيفضل يتيم على الديسك ومش هتعرف توصل لـ SID بتاعه بسهولة.`
          ],
          sol: R`جربت العرض بس. [[Get-CimInstance Win32_UserProfile -Filter "Special = false"]] طلع بروفايل واحد: [[C:\Users\me]] (غيّرت الاسم) و [[Loaded True]] و SID بيبدأ بـ [[S-1-5-21-]] وبيخلص بـ [[-1001]]. لكن [[Get-ChildItem C:\Users -Directory]] طلع فولدرات كتير غيره: [[Public]] (مشترك لكل اليوزرز) وفولدرات زي [[TEMP]] و [[UMFD-0]] و [[TEMP.Font Driver Host.000]]، ودي فاضلة من بروفايلات مؤقتة قديمة وملهاش أي بروفايل حقيقي. يعني وجود فولدر في C:\Users مش معناه إن فيه حساب.

وجربت [[Disable-LocalUser -Name Guest -WhatIf]] فطبع [[What if: Performing the operation "Disable local user" on target "Guest".]]. (مغيّرتش ولا مسحت أي حساب وأنا بكتب الدرس.)`,
          solCode: R`Get-CimInstance Win32_UserProfile -Filter "Special = false" | Select-Object LocalPath, Loaded
Get-ChildItem C:\Users -Directory | Select-Object Name`
        },
        {
          cmd: "Add-LocalGroupMember",
          title: "خلي حد أدمن (أو شيله)",
          desc: R`الصلاحيات في ويندوز بتيجي من الجروبات: اللي في جروب [[Administrators]] أدمن، واللي في [[Users]] يوزر عادي. [[Add-LocalGroupMember]] بيضيف حساب لجروب، و [[Remove-LocalGroupMember]] بيشيله، و [[Get-LocalGroupMember]] بيعرض مين في الجروب.

[[-Group "Administrators"]] اسم الجروب، و [[-Member "sara"]] الحساب بالاسم اللي بيظهر في Get-LocalUser. ونتيجة Get-LocalGroupMember فيها [[ObjectClass]] (User أو Group، لأن جروب ممكن يبقى جوه جروب)، و [[Name]] بالشكل [[PC\name]]، و [[PrincipalSource]] نوع الحساب.

أسامي الجروبات بتتترجم: على ويندوز بلغة تانية «Administrators» اسمها حاجة تانية، فسكربت فيه الاسم الإنجليزي هيقول [[Group Administrators was not found]]. الحل [[-SID S-1-5-32-544]] بدل الاسم، والرقم ده ثابت في كل ويندوز، و [[S-1-5-32-545]] هو Users. و [[Get-LocalGroup | Select-Object Name, SID]] بيعرض كل الجروبات بأرقامها.

[[Remote Desktop Users]] الجروب اللي بيسمح لحد يدخل الجهاز بـ Remote Desktop، وده مش موجود في ويندوز Home خالص (جربت، السطر الأخير بيفشل)، لأن Home مينفعش يستقبل Remote Desktop، يقدر بس يتصل بأجهزة تانية (درس «mstsc» في تاب «CMD»). فعلى Home الدخول من بعيد بيبقى بـ SSH (درس OpenSSH Server) أو PowerShell remoting (درس Enter-PSSession).

نصيحة: اشتغل يوميًا بحساب Standard، وخلي حساب أدمن منفصل للتسطيب والإعدادات: لو برنامج خبيث اشتغل وانت Standard، مش هيقدر يغيّر في النظام من غير باسورد الأدمن. والإضافة والشيل محتاجين Terminal أدمن والعرض لأ، والموديول شغال في 5.1 و 7. والمقابل من CMD في درس «net localgroup» في تاب «CMD».`,
          example: R`Get-LocalGroupMember -Group "Administrators"
Get-LocalGroupMember -SID S-1-5-32-544
Get-LocalGroup | Select-Object Name, SID
Add-LocalGroupMember -SID S-1-5-32-544 -Member "sara"
Remove-LocalGroupMember -SID S-1-5-32-544 -Member "sara"
Add-LocalGroupMember -Group "Remote Desktop Users" -Member "sara"`,
          try: R`اعرف مين أدمن على جهازك، وهل الحساب اللي انت شغال بيه منهم. واعرض الجروبات اللي على جهازك ودوّر على Remote Desktop Users.`,
          practice: [
            { lvl: 'سريع', t: R`[[Get-LocalGroupMember -SID S-1-5-32-544 | Select-Object Name, ObjectClass, PrincipalSource]]`, done: R`تعرف مين أدمن على جهازك، وهل حسابك منهم، و [[Administrator]] المدمج ظاهر حتى لو مقفول.` },
            { lvl: 'تطبيق', t: R`[[Add-LocalGroupMember -SID S-1-5-32-544 -Member "nope.user" -WhatIf]] باسم مش موجود، وبعدين [[Add-LocalGroupMember -SID S-1-5-32-545 -Member $env:USERNAME -WhatIf]] بحسابك على جروب Users.`, done: R`الأول بيطلع [[Principal nope.user was not found.]] حتى مع [[-WhatIf]]: الأمر بيدوّر على الحساب قبل ما يقرر يعمل إيه. والتاني بيطبع [[What if: Performing the operation "Add member]] واسم حسابك على [[S-1-5-32-545]].` },
            { lvl: 'تحدي', t: R`«مراجعة الأدمنز»: سكربت بيطلع أعضاء Administrators، ولكل واحد [[PrincipalSource]] بتاعه Local أو MicrosoftAccount يجيب [[Enabled]] من [[Get-LocalUser]] (الاسم بعد [[\]])، ويطبع تحذير ويخرج بـ [[exit 1]] لو فيه أدمن شغال غير اللي في لستة مسموحة انت كاتبها.`, done: R`لما لستتك فيها حسابك بس والـ Administrator مقفول الكود ٠ ومفيش تحذير، ولو شلت حسابك من اللستة بيطبع اسمه في التحذير والكود ١، والـ Administrator المقفول مبيطلعش في التحذير.` },
          ],
          flag: "danger",
          deep: {
            why: R`عايز تدّي حد صلاحية يسطّب برامج، أو تشيلها من حد ماكانش المفروض ياخدها، أو تراجع مين أدمن على جهاز (أول حاجة تبص عليها لو شاكك إن حد عبث في الجهاز). ومن غير الأوامر دي على Home مفيش أداة رسومية كاملة للجروبات.`,
            how: R`الجروبات اللي أرقامها بتبدأ بـ [[S-1-5-32-]] «built-in» جاية مع ويندوز: 544 Administrators، و 545 Users، و 546 Guests. وجروبات زي [[docker-users]] بتتعمل لما تسطّب برنامج، ورقمها بيبدأ بـ [[S-1-5-21-]] لأنها خاصة بالجهاز ده.

الإضافة لـ Administrators بتبان من أول دخول جديد: لو الحساب داخل دلوقتي، لازم يعمل Sign out ويدخل تاني عشان الصلاحية الجديدة تظهر، لأن ويندوز بيحسب جروبات الحساب لحظة الدخول.

[[Get-LocalGroupMember]] ليه bug معروف: لو الجروب فيه حساب اتمسح (بيظهر كـ SID من غير اسم)، ممكن يطلع error زي [[Failed to compare two elements in the array]]. ساعتها [[net localgroup administrators]] بيعرض عادي، وشيل الـ SID اليتيم ده.`,
            when: R`تدّي أو تشيل صلاحية أدمن، أو تراجع الأدمنز على جهاز، أو تحط حساب في جروب لازم لبرنامج (زي docker-users أو OpenSSH Users)، أو سكربت تجهيز بيشتغل على ويندوز بأي لغة (بالـ SID).`,
            mistakes: R`تشيل نفسك من Administrators وانت آخر أدمن. أو تكتب اسم الجروب بالإنجليزي في سكربت هيشتغل على ويندوز مترجم. أو تستنى الصلاحية تبان من غير Sign out. أو تدوّر على Remote Desktop Users على Home. أو تخلي كل أهل البيت أدمن عشان «ميسألوكش».`
          },
          teach: R`## الفكرة: الصلاحية بتيجي من الجروب

اللي في جروب [[Administrators]] أدمن، واللي في [[Users]] يوزر عادي. فإنك «تخلي حد أدمن» معناها تضيفه لجروب. العرض اتجرّب على ويندوز 11 Home في PowerShell 7.6 من غير أدمن، والإضافة بـ [[-WhatIf]] بس. (اسم حسابي في الناتج [[me]] واسم الجهاز [[PC]].)

---

## ١. مين أدمن

~~~powershell
Get-LocalGroupMember -Group "Administrators"
~~~

~~~text الناتج
ObjectClass Name              PrincipalSource
----------- ----              ---------------
User        PC\me            MicrosoftAccount
User        PC\Administrator            Local
~~~

| العمود | معناه |
|---|---|
| [[ObjectClass]] | [[User]] حساب، أو [[Group]] (جروب ممكن يبقى جوه جروب) |
| [[Name]] | اسم الجهاز (أو الدومين) وبعده [[\]] واسم الحساب، زي [[PC\me]] |
| [[PrincipalSource]] | نوع الحساب: Microsoft أو Local |

يعني الحساب اليومي بتاعي أدمن، ومعاه [[Administrator]] المدمج (وده متقفل).

---

## ٢. نفس الحاجة بالـ SID

~~~powershell
Get-LocalGroupMember -SID S-1-5-32-544
~~~

نفس الناتج بالظبط. ليه؟ أسامي الجروبات **بتتترجم**: على ويندوز عربي أو فرنساوي «Administrators» ليها اسم تاني، والسطر الأول هيقول إن الجروب مش موجود. أما الـ SID فثابت في كل ويندوز:

| حتة من [[S-1-5-32-544]] | معناها في الرقم ده |
|---|---|
| [[S]] | اختصار Security Identifier: بتقول إن النص ده SID |
| [[1]] | نسخة شكل الرقم |
| [[5]] | NT Authority: ويندوز نفسه هو اللي عامله |
| [[32]] | جروبات built-in جاية مع ويندوز |
| [[544]] | Administrators (و 545 = Users، و 546 = Guests) |

وجروب Users ([[S-1-5-32-545]]) طلع فيه حسابي وجروبين:

~~~text الناتج
ObjectClass Name                             PrincipalSource
----------- ----                             ---------------
User        PC\me                           MicrosoftAccount
Group       NT AUTHORITY\Authenticated Users          Unknown
Group       NT AUTHORITY\INTERACTIVE                  Unknown
~~~

---

## ٣. كل الجروبات

~~~powershell
Get-LocalGroup | Select-Object Name, SID
~~~

طلع 15 جروب، منهم:

~~~text الناتج (مختصر)
Name             SID
----             ---
docker-users     S-1-5-21-...-1002
Administrators   S-1-5-32-544
Guests           S-1-5-32-546
OpenSSH Users    S-1-5-32-585
Users            S-1-5-32-545
~~~

[[docker-users]] رقمه بيبدأ بـ [[S-1-5-21-]] لأنه جروب اتعمل على الجهاز ده لما Docker اتسطّب، مش جاي مع ويندوز. ومفيش [[Remote Desktop Users]]: [[Get-LocalGroup "Remote Desktop Users"]] طلع [[Group Remote Desktop Users was not found.]]، لأن ويندوز Home مبيستقبلش Remote Desktop.

---

## ٤. إضافة وشيل (أدمن)

~~~powershell
Add-LocalGroupMember -SID S-1-5-32-544 -Member "sara"
Remove-LocalGroupMember -SID S-1-5-32-544 -Member "sara"
~~~

[[-Member]] اسم الحساب زي ما بيظهر في [[Get-LocalUser]]. والإضافة بتبان من أول **دخول جديد**: لو sara داخلة دلوقتي، لازم تعمل Sign out وتدخل.

جربت بـ [[-WhatIf]]:

~~~text الناتج
Add-LocalGroupMember -SID S-1-5-32-544 -Member "sara" -WhatIf
  →  Principal sara was not found.

Add-LocalGroupMember -Group "Administrators" -Member "Guest" -WhatIf
  →  What if: Performing the operation "Add member PC\Guest" on target "Administrators".
~~~

يعني الأمر بيتأكد إن الحساب موجود حتى مع WhatIf.

---

## ٥. Remote Desktop

~~~powershell
Add-LocalGroupMember -Group "Remote Desktop Users" -Member "sara"
~~~

على Pro و Enterprise بيسمح لـ sara تدخل بـ Remote Desktop. على Home بيفشل لأن الجروب مش موجود (شفناه في خطوة ٣).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| مين أدمن | [[Get-LocalGroupMember -SID S-1-5-32-544]] |
| كل الجروبات وأرقامها | [[Get-LocalGroup | Select-Object Name, SID]] |
| خلي حد أدمن (أدمن) | [[Add-LocalGroupMember -SID S-1-5-32-544 -Member x]] |
| شيله | [[Remove-LocalGroupMember -SID S-1-5-32-544 -Member x]] |

| SID | الجروب |
|---|---|
| [[S-1-5-32-544]] | Administrators: الأدمنز، يقدروا يغيّروا أي حاجة في الجهاز |
| [[S-1-5-32-545]] | Users: اليوزرز العاديين، ولازم الحساب يبقى فيه عشان يعرف يدخل |
| [[S-1-5-32-546]] | Guests: حسابات ضيوف بصلاحيات أقل من Users |

واستخدم الـ SID في السكربتات، مش الاسم.`,
          lines: [
            R`بيعرض مين في جروب الأدمنز: كل عضو والنوع بتاعه (User أو Group) ومصدره (Local أو MicrosoftAccount). الاسم Administrators بالإنجليزي، فعلى ويندوز بلغة تانية ممكن يقولك الجروب مش موجود.`,
            R`نفس السؤال بس بالـ SID: [[S-1-5-32-544]] رقم جروب الأدمنز وثابت في كل نسخ ويندوز وكل اللغات، عكس الاسم اللي بيتترجم. عشان كده هو اللي تستخدمه في السكربتات.`,
            R`بيعرض كل الجروبات على الجهاز ورقم كل واحد: اللي بيبدأ بـ [[S-1-5-32-]] جاي مع ويندوز، واللي بيبدأ بـ [[S-1-5-21-]] اتعمل على الجهاز ده (زي docker-users). مفيد عشان تلاقي الـ SID قبل ما تكتب السكربت.`,
            R`بيضيف sara لجروب الأدمنز فتبقى أدمن، والأمر نفسه محتاج نافذة أدمن. لو الحساب مش موجود بيطلع «Principal sara was not found». والصلاحية الجديدة مبتشتغلش في الجلسة اللي هي داخلة بيها، لازم Sign out وتدخل تاني.`,
            R`العكس: بيشيل sara من جروب الأدمنز فترجع يوزر عادي، وبرضه محتاج أدمن ومحتاج دخول جديد عشان يبان. الحساب نفسه مبيتمسحش.`,
            R`بيضيف sara لجروب Remote Desktop Users فتقدر تدخل على الجهاز من جهاز تاني بـ Remote Desktop. على ويندوز Home الجروب ده مش موجود أصلًا (لأن Home مبيستقبلش Remote Desktop)، فالأمر بيفشل بـ «Group Remote Desktop Users was not found».`
          ],
          sol: R`جربت العرض على ويندوز 11 Home من غير أدمن. [[Get-LocalGroupMember -SID S-1-5-32-544]] طلع اتنين: الحساب اللي شغال بيه ([[User]] و [[MicrosoftAccount]]) و [[Administrator]] المدمج ([[Local]]، وهو متقفل). يعني الحساب اليومي أدمن. وجروب Users ([[S-1-5-32-545]]) طلع فيه حسابي و [[NT AUTHORITY\Authenticated Users]] و [[NT AUTHORITY\INTERACTIVE]] كـ Group.

و [[Get-LocalGroup]] طلع 15 جروب، منهم [[Administrators S-1-5-32-544]] و [[Users S-1-5-32-545]] و [[OpenSSH Users S-1-5-32-585]] و [[docker-users]] برقم بيبدأ بـ [[S-1-5-21-]]، ومفيش Remote Desktop Users، و [[Get-LocalGroup "Remote Desktop Users"]] طلع [[Group Remote Desktop Users was not found.]]. وجربت [[Add-LocalGroupMember -SID S-1-5-32-544 -Member "sara" -WhatIf]] فطلع [[Principal sara was not found.]] لأن الحساب مش موجود، يعني الأمر بيتأكد من الحساب حتى مع WhatIf.`
        },
        {
          cmd: "IsInRole (Admin check)",
          title: "السكربت شغال أدمن؟ ولو لأ، اطلب الصلاحية",
          desc: R`سكربتات كتير (تعديل hosts، فايروول، يوزرز) محتاجة أدمن، ولو اشتغلت من غيره بتفشل في النص وتسيب الشغل نصه معمول. أول سطرين في المثال بيسألوا ويندوز «النافذة دي شغالة أدمن؟»، ولو لأ السكربت بيفتح نفسه تاني كأدمن بـ [[Start-Process -Verb RunAs]] (درس Start-Process) ويقفل النسخة العادية.

[[[Security.Principal.WindowsIdentity]::GetCurrent()]] بيجيب هوية اليوزر اللي شغّل PowerShell، و [[[Security.Principal.WindowsPrincipal]::new($id)]] بيعمل منها object تسأله، و [[.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)]] بيرجع True لو النافذة نفسها مرفوعة كأدمن (elevated). و [[$PSCommandPath]] متغير جاهز فيه المسار الكامل للسكربت اللي شغال (فاضي لو لصقت الكود في الترمنال بدل ما تشغّله من ملف).

الإعادة: [[-Verb RunAs]] بيطلّع سؤال UAC، و [[('"{0}"' -f $PSCommandPath)]] بيحط المسار بين علامات تنصيص، لأن [[-ArgumentList]] بيلزق العناصر بمسافات ومش بيحط علامات تنصيص لوحده (جربتها على 7.6)، فمسار فيه مسافة هيتقطع. و [[exit]] بيقفل النسخة العادية. ولو السكربت بيشتغل بـ 5.1، اكتب [[powershell]] مكان [[pwsh]]. وتشغيل برنامج بحساب تاني (مش أدمن نفس الحساب) ده شغل [[runas]] (درس «runas» في تاب «CMD»).

أبسط من كده: سطر [[#Requires -RunAsAdministrator]] في أول ملف .ps1 بيخلي PowerShell يرفض يشغّل السكربت أصلًا لو مش أدمن، برسالة واضحة، من غير ما يفتحه تاني. السطر ده بيبدأ بـ [[#]] بس PowerShell بيقراه، ولازم يبقى في ملف سكربت.

UAC (User Account Control): حتى لو حسابك في جروب Administrators، البرامج اللي بتفتحها بتشتغل بصلاحيات يوزر عادي، والأدمن بيتفعّل بس للبرنامج اللي توافق له على سؤال UAC. عشان كده IsInRole بيرجع False في نافذة عادية وانت أدمن. و [[whoami /groups]] (درس «whoami /groups /priv» في تاب «CMD») بيوريك ده: Administrators جنبها [[Group used for deny only]]، والمستوى [[Medium Mandatory Level]]، وفي نافذة أدمن [[High Mandatory Level]].`,
          example: R`$id = [Security.Principal.WindowsIdentity]::GetCurrent()
$isAdmin = [Security.Principal.WindowsPrincipal]::new($id).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Not admin, asking for elevation..." -ForegroundColor Yellow
    Start-Process pwsh -Verb RunAs -ArgumentList @("-NoProfile", "-File", ('"{0}"' -f $PSCommandPath))
    exit
}
Write-Host "Running as admin" -ForegroundColor Green`,
          try: R`احفظ المثال في ملف [[admin-check.ps1]] في فولدر اسمه فيه مسافة، وشغّله من نافذة عادية ووافق على UAC. وبعدين جرب ملف تاني أول سطر فيه [[#Requires -RunAsAdministrator]] بس.`,
          practice: [
            { lvl: 'سريع', t: R`من نافذة عادية، قارن [[IsInRole(...Administrator)]] (أول سطرين في المثال) بوجود حسابك في [[Get-LocalGroupMember -SID S-1-5-32-544]].`, done: R`لو حسابك أدمن: اسمك موجود في الجروب، ومع ذلك [[$isAdmin]] بيطلع [[False]]. ده UAC: الحساب أدمن والنافذة نفسها لأ، والسكربت بيسأل عن النافذة.` },
            { lvl: 'تطبيق', t: R`سكربت فيه ٣ خطوات قراية وخطوة واحدة محتاجة أدمن: لو مش أدمن يطبع [[Write-Warning "skipping X: needs admin"]] ويعدّي الخطوة دي بس ويكمّل الباقي، ويخرج بـ ٠.`, done: R`من نافذة عادية بيطبع [[WARNING: skipping]] وخطوات القراية التلاتة بيطلع ناتجها و [[$LASTEXITCODE]] = ٠، ومن Terminal أدمن مفيش تحذير والأربع خطوات اشتغلوا.` },
            { lvl: 'تحدي', t: R`اطبع جروبات النافذة دي بأساميها: [[[Security.Principal.WindowsIdentity]::GetCurrent().Groups | ForEach-Object { $_.Translate([Security.Principal.NTAccount]) }]]، ودوّر على [[BUILTIN\Administrators]]، وقارن بـ [[whoami /groups]].`, done: R`في نافذة عادية [[BUILTIN\Administrators]] مش في لستة [[.Groups]] خالص (اتجرب على 7.6 و 5.1)، مع إن [[whoami /groups]] بيطلّعه وجنبه [[Group used for deny only]]: الـ token فيه الجروب بس متعلّم «للمنع بس». ومن نافذة أدمن بيظهر في الاتنين.` },
          ],
          flag: "script",
          deep: {
            why: R`سكربت بيعدّل الفايروول ويعمل يوزر ويغيّر hosts، شغّلته من نافذة عادية: أول خطوة فشلت بـ Access denied، والتانية نجحت لأنها مش محتاجة أدمن، والتالتة فشلت. النتيجة جهاز نص متظبط. الفحص في أول السكربت بيخلي الحكاية كلها تتعمل أو متتعملش.`,
            how: R`لما تدخل بحساب أدمن، ويندوز بيدّيك «token» مزدوج: واحد عادي بيستخدمه لكل البرامج، وواحد كامل بيستخدمه بس لما توافق على UAC. [[IsInRole]] بيبص على الـ token اللي البرنامج شغال بيه دلوقتي، فبيقولك «النافذة دي» أدمن ولا لأ، مش «الحساب» أدمن ولا لأ. ولو عايز تعرف الحساب نفسه في الجروب: [[Get-LocalGroupMember -SID S-1-5-32-544]] (درس Add-LocalGroupMember).

[[Start-Process -Verb RunAs]] بيشغّل نسخة جديدة في نافذة جديدة، والنسخة القديمة مش بتستنى ولا بتشوف ناتجها. فلو السكربت بياخد parameters لازم تبعتها بنفسك في [[-ArgumentList]]، وكل قيمة فيها مسافة تتحط بين علامات تنصيص بنفس الطريقة. ولو اليوزر رفض UAC، [[Start-Process]] بيطلع error إن العملية اتلغت، فممكن تحطه في [[try/catch]].

في Windows Terminal: Win+X وبعدين Terminal (Admin)، أو Ctrl+Shift+Click على البروفايل بيفتحه أدمن. والنافذة الأدمن عنوانها بيبدأ بـ Administrator، ولو عامل prompt (درس «function prompt») بيبان [[[admin]]].

[[#Requires]] ليه أشكال تانية مفيدة: [[#Requires -Version 7]] و [[#Requires -Modules NetSecurity]] و [[#Requires -PSEdition Core]].`,
            when: R`أي سكربت بيعدّل حاجة في النظام: يوزرز، فايروول، خدمات، hosts، registry تحت HKLM، Defender، ديسكات. [[#Requires]] لما تكون انت اللي بتشغّله، والإعادة الأوتوماتيك لما تبعته لحد مش هيعرف يفتح Terminal أدمن.`,
            mistakes: R`تبعت المسار من غير علامات تنصيص فالسكربت مش بيلاقي نفسه لو المسار فيه مسافة (جربت: [[The argument 'C:\...\dir' is not recognized as the name of a script file]]). أو تنسى [[exit]] فالنسخة العادية تكمّل وتفشل. أو تلصق الكود في الترمنال فـ [[$PSCommandPath]] يبقى فاضي. أو تفتكر إنك عشان أدمن يبقى النافذة أدمن. أو تشغّل pwsh من سكربت 5.1 والجهاز معندوش PowerShell 7.`
          },
          teach: R`## الفكرة: اسأل «النافذة دي أدمن؟»، ولو لأ افتح نفسك تاني كأدمن

السكربت بيسأل ويندوز عن صلاحيات النافذة اللي شغال فيها. لو مش أدمن، بيشغّل نسخة جديدة من نفسه بـ «Run as administrator» (سؤال UAC) ويقفل النسخة العادية. جربت الفحص من ملف في فولدر اسمه فيه مسافة ([[dir with space]]) في PowerShell 7.6 و 5.1 من نافذة عادية، والحساب نفسه أدمن. مفتحتش سؤال UAC وأنا بكتب الدرس.

---

## ١. مين شغّل PowerShell

~~~powershell
$id = [Security.Principal.WindowsIdentity]::GetCurrent()
~~~

- [[Security.Principal]] مكان في .NET فيه كل حاجة عن الهوية والصلاحيات.
- [[WindowsIdentity]] class بيمثّل حساب ويندوز، و [[::GetCurrent()]] method جاهزة بترجع **الحساب اللي البرنامج ده شغال بيه**.

[[$id.Name]] طلع [[PC\me]] (غيّرت الاسم)، والنوع [[System.Security.Principal.WindowsIdentity]].

---

## ٢. السؤال: [[IsInRole]]

~~~powershell
$isAdmin = [Security.Principal.WindowsPrincipal]::new($id).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
~~~

من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[[Security.Principal.WindowsPrincipal]::new($id)]] | اعمل من الهوية object تقدر تسأله عن الجروبات |
| [[[Security.Principal.WindowsBuiltInRole]::Administrator]] | دور «Administrators» المدمج (رقمه جوه [[544]]، نفس آخر رقم في SID الجروب) |
| [[.IsInRole(...)]] | النافذة دي شغالة بالدور ده؟ True أو False |

~~~text الناتج في نافذة عادية (7.6 و 5.1)
False
~~~

ليه False والحساب أدمن؟ ده **UAC** (User Account Control): حتى لو انت في جروب Administrators، البرامج بتشتغل بصلاحيات عادية، والأدمن بيتفعّل بس للبرنامج اللي توافق له على سؤال UAC. و [[whoami /groups]] بيوريك ده:

~~~text الناتج (السطور المهمة)
Mandatory Label\Medium Mandatory Level   ...
BUILTIN\Administrators   Alias   S-1-5-32-544   Group used for deny only
~~~

[[Group used for deny only]] يعني الجروب موجود بس متعطّل في النافذة دي، و [[Medium]] مستوى نافذة عادية (الأدمن [[High]]).

---

## ٣. لو مش أدمن

~~~powershell
if (-not $isAdmin) {
    Write-Host "Not admin, asking for elevation..." -ForegroundColor Yellow
    Start-Process pwsh -Verb RunAs -ArgumentList @("-NoProfile", "-File", ('"{0}"' -f $PSCommandPath))
    exit
}
~~~

- [[-not $isAdmin]] عكس القيمة: True لو **مش** أدمن.
- [[Write-Host ... -ForegroundColor Yellow]] رسالة بالأصفر.

### [[Start-Process pwsh -Verb RunAs]]

[[Start-Process]] بيشغّل برنامج في نافذة جديدة، و [[-Verb RunAs]] يعني «Run as administrator»، فبيطلع سؤال UAC.

### [[-ArgumentList @(...)]]

اللي هيتبعت لـ pwsh الجديد. [[@( )]] array بتلات عناصر:

1. [["-NoProfile"]]
2. [["-File"]]
3. [[('"{0}"' -f $PSCommandPath)]]

[[$PSCommandPath]] متغير جاهز فيه المسار الكامل للسكربت اللي شغال، و [['"{0}"' -f ...]] بيحطه بين علامات تنصيص. ليه؟ Start-Process بيلزق العناصر بمسافات ومش بيحط علامات تنصيص لوحده. الناتج لما لزقتهم بنفسي:

~~~text الناتج
-NoProfile -File "C:\...\dir with space\admin-check.ps1"
~~~

من غير علامات التنصيص، pwsh الجديد كان هيفهم إن الملف اسمه [[C:\...\dir]] والباقي arguments تانية.

> [[$PSCommandPath]] فاضي لو لزقت الكود في الترمنال بدل ما تشغّله من ملف (جربت: طلع فاضي)، فالمثال لازم يبقى في ملف [[.ps1]].

### [[exit]]

اقفل النسخة العادية، والنسخة الأدمن هتكمّل في النافذة الجديدة.

---

## ٤. هنا أدمن

~~~powershell
Write-Host "Running as admin" -ForegroundColor Green
~~~

أي سطر بعد الـ [[if]] بيتنفّذ في النسخة الأدمن بس.

---

## ٥. الأبسط: [[#Requires -RunAsAdministrator]] (الـ solCode)

سطر في أول الملف بيخلي PowerShell يرفض يشغّل السكربت لو مش أدمن، من غير ما يفتحه تاني. جربته من نافذة عادية في 7.6:

~~~text الناتج
The script 'needadmin.ps1' cannot be run because it contains a "#requires" statement for running as Administrator. The current PowerShell session is not running as Administrator. Start PowerShell by using the Run as Administrator option, and then try running the script again.
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تعرف النافذة أدمن | [[[Security.Principal.WindowsPrincipal]::new($id).IsInRole(... ::Administrator)]] |
| تفتح نفسك أدمن | [[Start-Process pwsh -Verb RunAs -ArgumentList ...]] ثم [[exit]] |
| مسار السكربت | [[$PSCommandPath]]، وبين علامات تنصيص |
| ترفض من غير أدمن | [[#Requires -RunAsAdministrator]] أول سطر |

والحساب أدمن مش معناه إن النافذة أدمن.`,
          lines: [
            R`بيجيب هوية اليوزر اللي مشغّل PowerShell دلوقتي (WindowsIdentity): اسمه والـ SID بتاعه والجروبات اللي هو فيها في الجلسة دي.`,
            R`بيلف الهوية في WindowsPrincipal ويسأله «انت في دور Administrator؟». خلي بالك إن ده بيسأل عن النافذة دي مش عن الحساب: حتى لو حسابك أدمن، نافذة عادية من غير «Run as administrator» بترجّع False بسبب UAC.`,
            R`لو النافذة مش أدمن ([[-not]] بيقلب False لـ True)، ينفذ اللي جوه.`,
            R`رسالة بالأصفر بتقول لليوزر إن السكربت هيطلب صلاحيات أدمن، عشان سؤال UAC اللي جاي ميبقاش مفاجأة.`,
            R`بيشغّل نسخة جديدة من pwsh كأدمن: [[-Verb RunAs]] هو اللي بيطلّع سؤال UAC. و [[-ArgumentList]] فيها [[-NoProfile]] و [[-File]] ومسار السكربت نفسه ([[$PSCommandPath]]) بين علامات تنصيص بالـ [[-f]]، عشان لو المسار فيه مسافة ميتقطعش. لو اليوزر رفض UAC، [[Start-Process]] بيرمي error.`,
            R`بيقفل النسخة العادية، لأن النسخة الأدمن هي اللي هتكمّل الشغل. من غيره السكربت هيكمّل هنا كمان من غير صلاحيات ويفشل في نص الشغل.`,
            R`بيقفل الـ [[if]].`,
            R`السطر ده بيوصله التنفيذ بس لو النافذة أدمن (أو النسخة الجديدة اللي اتفتحت)، فمن هنا تحط الأوامر اللي محتاجة أدمن.`
          ],
          sol: R`جربتها من نافذة عادية والحساب أدمن: [[$isAdmin]] طلع [[False]] في 7.6 و 5.1. و [[whoami /groups]] طلع [[BUILTIN\Administrators]] وجنبها [[Group used for deny only]]، و [[Mandatory Label\Medium Mandatory Level]]، ودي بالظبط حكاية UAC: الحساب في الجروب بس النافذة مش مرفوعة. (مفتحتش سؤال UAC وأنا بكتب الدرس.)

وملف أوله [[#Requires -RunAsAdministrator]] (الـ solCode) رفض يشتغل في 7.6 برسالة [[The script 'needadmin.ps1' cannot be run because it contains a "#requires" statement for running as Administrator. The current PowerShell session is not running as Administrator.]]، ونفس الرسالة تقريبًا في 5.1 ومعاها [[ScriptRequiresElevation]]. وجربت ليه علامات التنصيص مهمة: [[Start-Process pwsh -ArgumentList]] لسكربت جوه فولدر اسمه [[dir with space]] من غير علامات تنصيص طلع [[The argument '...\dir' is not recognized as the name of a script file]]، ومعاها اشتغل وطبع ناتج السكربت.`,
          solCode: R`#Requires -RunAsAdministrator
Write-Host "Running as admin" -ForegroundColor Green`
        },
        {
          cmd: "Get-Acl / Set-Acl",
          title: "مين يقدر يفتح الفولدر ده؟",
          desc: R`كل ملف وفولدر على NTFS ليه لستة صلاحيات اسمها ACL: مين يقرا، ومين يكتب، ومين ممنوع. [[Get-Acl]] بيقراها و [[Set-Acl]] بيكتبها، وبينهم بتعدّل الـ object في PowerShell: تضيف rule أو تشيلها. المثال كله على فولدر تجربة في TEMP وبيمسحه في الآخر.

[[(Get-Acl $folder).Access]] لستة الصلاحيات، وكل سطر فيه: [[IdentityReference]] مين (يوزر أو جروب)، و [[FileSystemRights]] إيه: [[FullControl]] كله، و [[Modify]] قراية وكتابة ومسح، و [[ReadAndExecute]] قراية وتشغيل، و [[Read]] قراية بس. و [[AccessControlType]] Allow أو Deny، و [[IsInherited]] True لو الصلاحية جاية وراثة من الفولدر الأب. و [[.Owner]] صاحب الفولدر.

إضافة rule: [[[System.Security.Principal.SecurityIdentifier]::new("S-1-5-32-545")]] جروب Users بالـ SID (عشان يشتغل على ويندوز بأي لغة، زي درس Add-LocalGroupMember)، وينفع تكتب اسم يوزر بداله زي [["PC\sara"]]. و [[[System.Security.AccessControl.FileSystemAccessRule]::new(...)]] بياخد 5 حاجات بالترتيب: مين، والصلاحية، و [["ContainerInherit, ObjectInherit"]] يعني الفولدرات والملفات اللي جوه تورثها، و [["None"]] الوراثة عادية، و [["Allow"]]. و [[$acl.AddAccessRule($rule)]] بيضيفها للـ object بس، و [[Set-Acl -AclObject $acl]] هو اللي بيكتبها على الفولدر فعلًا. و [[RemoveAccessRule]] بيشيلها وبيرجّع True لو لقاها، و [[Out-Null]] يخفي الـ True ده.

[[Where-Object { -not $_.IsInherited }]] الصلاحيات اللي اتحطت على الفولدر ده بس، من غير الموروثة. الأوامر دي في 5.1 و 7 على ويندوز. على فولدر انت صاحبه مش محتاج أدمن، وعلى فولدرات النظام أو فولدرات يوزر تاني محتاج. ولحاجات زي «رجّع الصلاحيات الافتراضية لكل اللي جوه» أو «خد ملكية فولدر»، [[icacls]] و [[takeown]] أسهل (درس «icacls» ودرس «takeown» في تاب «CMD»).`,
          example: R`$folder = Join-Path $env:TEMP "acl-lab"
New-Item -ItemType Directory -Force $folder | Out-Null
(Get-Acl $folder).Access | Format-Table IdentityReference, FileSystemRights, AccessControlType, IsInherited
$acl = Get-Acl $folder
$who = [System.Security.Principal.SecurityIdentifier]::new("S-1-5-32-545")
$rule = [System.Security.AccessControl.FileSystemAccessRule]::new($who, "ReadAndExecute", "ContainerInherit, ObjectInherit", "None", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path $folder -AclObject $acl
(Get-Acl $folder).Access | Where-Object { -not $_.IsInherited } | Format-Table IdentityReference, FileSystemRights, InheritanceFlags
$acl = Get-Acl $folder
$acl.RemoveAccessRule($rule) | Out-Null
Set-Acl -Path $folder -AclObject $acl
Remove-Item $folder -Recurse -Force`,
          try: R`شوف صلاحيات فولدر الـ SSH بتاعك ([[(Get-Acl $HOME\.ssh).Access]]): مين غيرك يقدر يقراه؟ وبعدين شغّل المثال كله على فولدر التجربة.`,
          practice: [
            { lvl: 'سريع', t: R`[[(Get-Acl $env:TEMP).Owner]] و [[(Get-Acl $env:TEMP).AccessToString]]`, done: R`الـ Owner حسابك، و AccessToString فيه ٣ سطور: [[NT AUTHORITY\SYSTEM Allow  FullControl]] و [[BUILTIN\Administrators Allow  FullControl]] وحسابك [[FullControl]]. ودي بالظبط الصلاحيات اللي فولدر التجربة في الدرس ورثها.` },
            { lvl: 'تطبيق', t: R`في فولدر تجربة في TEMP، ادي [[BUILTIN\Users]] (الـ SID [[S-1-5-32-545]]) صلاحية [[Read]] بس بـ [[ContainerInherit, ObjectInherit]]، واتأكد بـ [[icacls]]، وبعدين شيلها بـ [[RemoveAccessRule]].`, done: R`[[icacls]] بيطلع سطر [[BUILTIN\Users:(OI)(CI)(R)]] (من غير [[(I)]] لأنها صريحة مش موروثة)، وبعد الشيل السطر ده مش موجود. اتجرب على 7.6 و 5.1 من غير أدمن.` },
            { lvl: 'تحدي', t: R`اقفل الوراثة على فولدر التجربة بـ [[$acl.SetAccessRuleProtection($true, $true)]] (التانية [[$true]] معناها انسخ الموروث كصلاحيات صريحة) و [[Set-Acl]]، وبعدين اكتب ملف جواه وامسح الفولدر كله.`, done: R`[[(Get-Acl $f).AreAccessRulesProtected]] = [[True]]، وعدد الصلاحيات اللي [[IsInherited]] بقى ٠ بس العدد الكلي زي ما هو (٣)، والكتابة والمسح شغالين. ولو التانية كانت [[$false]] الصلاحيات الموروثة كلها كانت هتتشال، وممكن تقفل نفسك برا الفولدر.` },
          ],
          flag: "danger",
          deep: {
            why: R`فولدر مشترك بين يوزرين على نفس الجهاز، أو فولدر فيه أسرار (مفاتيح، ملفات .env) عايز تتأكد إن محدش غيرك يقراه، أو سيرفر شغال بحساب تاني ومحتاج يكتب في فولدر، أو SSH بيرفض المفتاح لأن صلاحيات الملف مفتوحة زيادة (درس ssh / scp).`,
            how: R`الوراثة: معظم الصلاحيات [[IsInherited True]] جاية من الفولدر الأب، و C:\Users\اسمك بيدّي SYSTEM و Administrators وصاحب الحساب FullControl. الـ rule اللي بتضيفها بتبقى «explicit» على الفولدر ده، ومع ContainerInherit و ObjectInherit بتنزل لكل اللي جواه: جربت أعمل ملف جوه الفولدر بعد الإضافة، ولقيت عليه [[BUILTIN\Users  ReadAndExecute, Synchronize  True]]. و [[Synchronize]] بتتزوّد لوحدها مع أي صلاحية، عادي.

[[Deny]] بيكسب على [[Allow]]، فاستخدمه نادرًا: Deny على جروب Users مثلًا بيمنعك انت كمان لأنك فيه.

[[$acl.SetAccessRuleProtection($true, $false)]] بيقطع الوراثة من الأب، والـ false التانية معناها متنسخش الصلاحيات الموروثة. ده اللي بتعمله لفولدر سري، بس لو قطعتها من غير ما تضيف نفسك ممكن تقفل الفولدر على نفسك.

[[Set-Acl -Path $other -AclObject (Get-Acl $folder)]] بينسخ صلاحيات فولدر لفولدر تاني. و [[(Get-Acl $folder).Sddl]] نفس الصلاحيات في نص مضغوط اسمه SDDL.`,
            when: R`تقفل فولدر على يوزر واحد، أو تدّي حساب خدمة صلاحية كتابة، أو تراجع مين يقدر يقرا فولدر فيه بيانات حساسة، أو سكربت تجهيز بيعمل فولدرات بصلاحيات معينة.`,
            mistakes: R`تعدّل الـ object وتنسى [[Set-Acl]]، فمحصلش حاجة. أو تحط Deny لجروب انت فيه. أو تقطع الوراثة من غير ما تسيب لنفسك صلاحية. أو تكتب اسم جروب بالإنجليزي على ويندوز مترجم (استخدم الـ SID). أو تجرب على فولدر مهم بدل فولدر تجربة. أو تكتب صلاحيات فولدر كبير بـ Set-Acl ومش فاهم هتنزل على إيه، وده مكان icacls أوضح.`
          },
          teach: R`## الفكرة: اقرا الصلاحيات، عدّل الـ object، اكتبه

كل فولدر وملف على NTFS ليه لستة صلاحيات اسمها **ACL** (Access Control List)، وكل سطر فيها اسمه **rule**: مين، يقدر يعمل إيه، سماح ولا منع. الخطوات: [[Get-Acl]] تجيب اللستة كـ object، تضيف أو تشيل rule في الـ object، و [[Set-Acl]] تكتبه على الفولدر. شغّلت المثال كله في PowerShell 7.6 و 5.1 من غير أدمن، على فولدر تجربة اتمسح في الآخر. (اسم حسابي في الناتج [[me]].)

---

## ١. فولدر التجربة وصلاحياته

~~~powershell
$folder = Join-Path $env:TEMP "acl-lab"
New-Item -ItemType Directory -Force $folder | Out-Null
(Get-Acl $folder).Access | Format-Table IdentityReference, FileSystemRights, AccessControlType, IsInherited
~~~

- [[New-Item -ItemType Directory -Force]] اعمل الفولدر (و [[-Force]] متشتكيش لو موجود)، و [[| Out-Null]] متطبعش حاجة.
- [[(Get-Acl $folder)]] الـ ACL، و [[.Access]] لستة الـ rules.

~~~text الناتج
IdentityReference      FileSystemRights AccessControlType IsInherited
-----------------      ---------------- ----------------- -----------
NT AUTHORITY\SYSTEM         FullControl             Allow        True
BUILTIN\Administrators      FullControl             Allow        True
PC\me                       FullControl             Allow        True
~~~

| العمود | معناه |
|---|---|
| [[IdentityReference]] | مين: يوزر أو جروب |
| [[FileSystemRights]] | إيه: [[FullControl]] كله، [[Modify]] قراية وكتابة ومسح، [[ReadAndExecute]] قراية وتشغيل، [[Read]] قراية بس |
| [[AccessControlType]] | [[Allow]] سماح أو [[Deny]] منع |
| [[IsInherited]] | True: جاية وراثة من الفولدر اللي فوقه |

الـ 3 موروثين من فولدر TEMP، والفولدر نفسه ملوش rules خاصة بيه.

---

## ٢. هات الـ ACL كـ object

~~~powershell
$acl = Get-Acl $folder
~~~

نوعه [[System.Security.AccessControl.DirectorySecurity]]: object في الرام. أي تعديل فيه مش بيلمس الفولدر لحد [[Set-Acl]].

---

## ٣. مين: جروب Users بالـ SID

~~~powershell
$who = [System.Security.Principal.SecurityIdentifier]::new("S-1-5-32-545")
~~~

[[SecurityIdentifier]] class بيمثّل SID، و [["S-1-5-32-545"]] جروب Users الثابت في كل ويندوز (درس Add-LocalGroupMember). جربت أترجمه لاسم: طلع [[BUILTIN\Users]].

---

## ٤. الـ rule

~~~powershell
$rule = [System.Security.AccessControl.FileSystemAccessRule]::new($who, "ReadAndExecute", "ContainerInherit, ObjectInherit", "None", "Allow")
~~~

[[FileSystemAccessRule]] بياخد 5 حاجات بالترتيب:

| # | القيمة | معناها |
|---|---|---|
| 1 | [[$who]] | مين |
| 2 | [["ReadAndExecute"]] | الصلاحية |
| 3 | [["ContainerInherit, ObjectInherit"]] | تنزل لمين: الفولدرات اللي جوه (Container) والملفات اللي جوه (Object) |
| 4 | [["None"]] | طريقة النزول (PropagationFlags): عادية، لكل المستويات |
| 5 | [["Allow"]] | سماح |

~~~text الناتج من $rule | Format-List
IdentityReference : S-1-5-32-545
FileSystemRights  : ReadAndExecute, Synchronize
InheritanceFlags  : ContainerInherit, ObjectInherit
PropagationFlags  : None
AccessControlType : Allow
~~~

[[Synchronize]] اتزوّدت لوحدها، وده عادي مع أي صلاحية.

---

## ٥. ضيف واكتب

~~~powershell
$acl.AddAccessRule($rule)
Set-Acl -Path $folder -AclObject $acl
~~~

- [[AddAccessRule]] بيضيف الـ rule للـ object بس، ومش بيرجّع حاجة. جربت أعدّ الـ rules الخاصة بالفولدر **قبل** Set-Acl: لسه [[0]].
- [[Set-Acl -AclObject $acl]] بيكتب الـ ACL كله على الفولدر.

---

## ٦. نتأكد

~~~powershell
(Get-Acl $folder).Access | Where-Object { -not $_.IsInherited } | Format-Table IdentityReference, FileSystemRights, InheritanceFlags
~~~

[[Where-Object { -not $_.IsInherited }]] خلّي الـ rules اللي **مش** موروثة، يعني اللي اتحطت على الفولدر ده بالذات:

~~~text الناتج
IdentityReference            FileSystemRights                InheritanceFlags
-----------------            ----------------                ----------------
BUILTIN\Users     ReadAndExecute, Synchronize ContainerInherit, ObjectInherit
~~~

وعملت ملف جوه الفولدر: لقيت عليه نفس الـ rule بـ [[IsInherited True]]. يعني [[ObjectInherit]] اشتغلت.

---

## ٧. شيل وامسح

~~~powershell
$acl = Get-Acl $folder
$acl.RemoveAccessRule($rule) | Out-Null
Set-Acl -Path $folder -AclObject $acl
Remove-Item $folder -Recurse -Force
~~~

- [[Get-Acl]] تاني عشان نشتغل على آخر نسخة.
- [[RemoveAccessRule]] بيشيل الـ rule وبيرجّع [[True]] لو لقاها (جربت من غير Out-Null فطبعت True)، و [[Out-Null]] بيخفيه.
- [[Set-Acl]] اكتب. وبعدها الـ rules الخاصة بقت [[0]].
- [[Remove-Item -Recurse -Force]] امسح الفولدر واللي جواه. و [[Test-Path]] بعدها طلع [[False]].

---

## نفس المعلومة بـ [[icacls]]

~~~text الناتج من icacls على الفولدر
NT AUTHORITY\SYSTEM:(I)(OI)(CI)(F)
BUILTIN\Administrators:(I)(OI)(CI)(F)
PC\me:(I)(OI)(CI)(F)
~~~

[[(I)]] موروثة، و [[(OI)(CI)]] ObjectInherit و ContainerInherit، و [[(F)]] FullControl.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اقرا | [[(Get-Acl $folder).Access]] |
| مين | [[[System.Security.Principal.SecurityIdentifier]::new("S-1-5-32-545")]] |
| الـ rule | [[FileSystemAccessRule]]::new(مين, صلاحية, وراثة, "None", "Allow") |
| ضيف / شيل | [[$acl.AddAccessRule($rule)]] / [[$acl.RemoveAccessRule($rule)]] |
| اكتب | [[Set-Acl -Path $folder -AclObject $acl]] |

ومن غير [[Set-Acl]] مفيش أي حاجة اتغيرت على الديسك.`,
          lines: [
            R`مسار فولدر تجربة جوه [[$env:TEMP]] (فولدر الملفات المؤقتة بتاعك)، عشان نجرّب الصلاحيات على حاجة ملهاش لازمة مش على ملفاتك.`,
            R`بيعمل الفولدر، و [[-Force]] متطلعش error لو موجود، و [[| Out-Null]] بيرمي الـ object اللي [[New-Item]] بيرجّعه فمش بيطبع سطر.`,
            R`[[Get-Acl]] بيجيب الـ ACL (قايمة الصلاحيات) و [[.Access]] القواعد اللي فيها. الأعمدة: [[IdentityReference]] مين، و [[FileSystemRights]] يقدر يعمل إيه، و [[AccessControlType]] سماح (Allow) ولا منع (Deny)، و [[IsInherited]] لو True يبقى القاعدة جاية من الفولدر الأب.`,
            R`بيجيب الـ ACL تاني ويحفظه في [[$acl]] كـ object هنعدّل فيه في الذاكرة الأول، وبعدين نكتبه مرة واحدة.`,
            R`بيعمل SecurityIdentifier لجروب Users من الـ SID بتاعه [[S-1-5-32-545]]. أحسن من كتابة الاسم [[BUILTIN\Users]] لأن الاسم بيتترجم على ويندوز بلغة تانية، والرقم ثابت.`,
            R`القاعدة نفسها بخمس حاجات بالترتيب: مين (Users)، والصلاحية (ReadAndExecute: يقرا ويشغّل، ومعاها Synchronize لوحدها)، والوراثة (ContainerInherit للفولدرات اللي جوه و ObjectInherit للملفات)، و None يعني تطبّق على الفولدر نفسه واللي جواه، و Allow يعني سماح.`,
            R`بيضيف القاعدة للـ ACL اللي في [[$acl]]. لحد دلوقتي ده في الذاكرة بس، والفولدر نفسه مااتغيّرش.`,
            R`[[Set-Acl]] بيكتب الـ ACL على الفولدر فعلًا: [[-Path]] الفولدر و [[-AclObject]] الـ object المعدّل. على فولدر بتاعك مش محتاج أدمن، لكن على ملفات السيستم هيرفض.`,
            R`بيتأكد إن القاعدة اتكتبت: [[Where-Object]] بيسيب اللي [[IsInherited]] بتاعها False بس (اتحطت على الفولدر ده مباشرة)، فتشوف [[BUILTIN\Users]] بـ ReadAndExecute والوراثة على الفولدرات والملفات.`,
            R`بيجيب الـ ACL من جديد بعد الكتابة، عشان نشتغل على النسخة الحالية اللي على الديسك مش النسخة القديمة اللي في الذاكرة.`,
            R`[[RemoveAccessRule]] بيشيل القاعدة اللي بتطابق [[$rule]] بالظبط من الـ object، وبيرجّع True لو لقاها وشالها؛ [[| Out-Null]] بيخفي الـ True ده.`,
            R`بيكتب الـ ACL بعد الشيل على الفولدر، فيرجع زي ما كان قبل التجربة. من غيره الشيل هيفضل في الذاكرة بس.`,
            R`بيمسح فولدر التجربة باللي جواه: [[-Recurse]] لكل اللي جوه، و [[-Force]] حتى الملفات المخفية أو read-only.`
          ],
          sol: R`شغّلت المثال كله على 7.6 و 5.1 من غير أدمن. الجدول الأول طلع 3 صلاحيات موروثة: [[NT AUTHORITY\SYSTEM  FullControl  Allow  True]] و [[BUILTIN\Administrators  FullControl  Allow  True]] وحسابي [[FullControl]] (موروثة كلها من فولدر TEMP). وبعد Set-Acl، الجدول التاني طلع سطر واحد: [[BUILTIN\Users  ReadAndExecute, Synchronize  ContainerInherit, ObjectInherit]]. وبعد الشيل، عدد الصلاحيات غير الموروثة بقى [[0]]، والفولدر اتمسح.

وجربت كمان [[icacls]] على نفس الفولدر: طلع [[NT AUTHORITY\SYSTEM:(I)(OI)(CI)(F)]]، و [[(I)]] يعني موروثة، و [[(OI)(CI)]] هي ObjectInherit و ContainerInherit، و [[(F)]] FullControl. نفس المعلومة بشكل أقصر. وفي التجربة: فولدر [[.ssh]] غالبًا هتلاقي عليه نفس التلاتة بس (SYSTEM و Administrators وانت)، وده كويس.`
        }
      ]
    }
]);
