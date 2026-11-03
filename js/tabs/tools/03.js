// تكملة تاب tools: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/tools/01.js (شرح حقول الدرس في أوله)
MORE("tools", [
    {
      t: "افحص وصلّح",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تعمل فحص فيروسات من الترمنال، لفولدر أو للجهاز كله، وتعرف آخر مرة اتعمل.`,
        R`تعرف إمتى تشغّل [[sfc]] و [[DISM]] و [[chkdsk]]، وليه محتاجين Admin.`,
        R`تلاقي المساحة راحت فين، وتنضّف من غير ما تمسح حاجة مهمة.`,
      ],
      use: {
        work: R`جهاز حد في البيت أو الشغل بقى غريب — الخطوات دي بالترتيب بتلاقي السبب أو بتصلّحه.`,
        prog: R`فولدرات زي [[node_modules]] و [[.venv]] و كاش Docker بتاكل عشرات الجيجات من غير ما تحس.`,
      },
      lab: R`# Windows (PowerShell):
pwsh -NoProfile`,
      projects: [
        { t: R`فحص أسبوعي`, what: R`سكربت بيعمل [[Start-MpScan -ScanType QuickScan]] وبعدين [[Get-MpThreatDetection]] ويكتب النتيجة في ملف. وبعدين جدوله (درس [[schtasks]] في تاب CMD، أو [[Register-ScheduledTask]] في تاب PowerShell).` },
        { t: R`لاقي الفولدرات الكبيرة`, what: R`أمر بيطلّع أكبر ١٠ فولدرات في [[$HOME]] بحجمهم — من غير ما يمسح حاجة. وجرّبه على فولدر فيه مشاريع Node وشوف [[node_modules]] بياخد كام.` },
      ],
      n: R`الفحص اتعمل على فولدر تجربة بس، ومفيش حاجة اتمسحت. والأوامر اللي محتاجة Admin اتجرّبت من غير Admin عشان تشوف رسالتها`,
      items: [
        {
          cmd: "فحص فيروسات من الترمنال",
          title: "Defender من غير ما تفتح الإعدادات",
          learn: R`تعرف حالة Defender، وتفحص فولدر أو الجهاز كله، وتشوف اللي اتلقى قبل كده.`,
          out: R`تعرف الجهاز محمي ولا لأ، وآخر full scan كان إمتى.`,
          use: {
            work: R`فلاشة جاية من بره، أو ملف نزل من مكان مش مضمون — فحص الفولدر ده بس بياخد ثانيتين.`,
            prog: R`سكربتات بتنزّل ملفات أو بتفكّ ضغط حاجات ممكن تفحصها قبل ما تشغّلها.`,
          },
          desc: R`**الحالة أولًا:** [[Get-MpComputerStatus]]

| الخاصية | جهاز التجربة |
|---|---|
| [[AntivirusEnabled]] | [[True]] |
| [[RealTimeProtectionEnabled]] | [[True]] |
| [[AntivirusSignatureLastUpdated]] | امبارح |
| [[QuickScanAge]] | [[0]] — النهارده |
| [[FullScanAge]] | **[[4294967295]]** |

**[[4294967295]]** ده أكبر رقم يتخزن في المتغير ده — ومعناه «**عمره ما اتعمل**». يعني الجهاز بيعمل quick scan كل يوم، بس عمره ما اتفحص كله.

**فحص فولدر:** [[Start-MpScan -ScanType CustomScan -ScanPath <فولدر>]] — **من غير Admin**، وخلص في **١.٨ ثانية** لفولدر صغير.

**أو بـ [[MpCmdRun.exe]]** (الأداة القديمة، وبتطلّع نص أوضح):

[[Scan starting... Scan finished. Scanning C:\...\cmdlab found no threats.]]

**ومفاجأة اتعلمتها وأنا بجرّب:** حطيت [[Start-MpScan]] جوه [[Measure-Command]] عشان أقيس الوقت — فـ [[Measure-Command]] **كتم الناتج كله**، ومعرفتش نجح ولا لأ. ولما عدته من غيره، طلع [[scan done in 1.8s]]. فلو بتقيس وقت أمر، متعتمدش على إنك تشوف ناتجه.

**واللي اتلقى قبل كده:** [[Get-MpThreatDetection]] بيرجّع كل حاجة Defender مسكها. على جهاز التجربة طلع فيه ١٢ — والتفاصيل ([[ThreatID]] والمسار والإجراء) في كل واحدة.`,
          example: R`# Windows (PowerShell):
Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated, QuickScanAge, FullScanAge
Start-MpScan -ScanType CustomScan -ScanPath "$HOME\Downloads"
Start-MpScan -ScanType QuickScan
Get-MpThreatDetection | Select-Object InitialDetectionTime, ThreatID, ActionSuccess
Update-MpSignature
# Windows (CMD):
"%ProgramFiles%\Windows Defender\MpCmdRun.exe" -Scan -ScanType 3 -File "%USERPROFILE%\Downloads"`,
          lines: [
            R`الحالة. و [[FullScanAge = 4294967295]] = عمره ما اتعمل.`,
            R`فولدر واحد — ثواني لفولدر صغير، ومن غير Admin.`,
            R`فحص سريع للأماكن المهمة (الذاكرة، والـ startup، وفولدرات النظام) — دقايق.`,
            R`كل اللي اتلقى قبل كده.`,
            R`حدّث التعريفات قبل أي فحص مهم.`,
            R`نفس الفحص من CMD. [[-ScanType 3]] = فولدر معين. وبتطلّع «found no threats» أو اسم اللي لقاه.`,
          ],
          try: R`شغّل [[Get-MpComputerStatus]] واعرف آخر full scan. ولو [[4294967295]]، اعمل [[Start-MpScan -ScanType FullScan]] في وقت مش محتاج فيه الجهاز — **ممكن ياخد ساعة أو أكتر** حسب حجم الملفات.`,
          deep: {
            why: R`الحماية اللحظية بتفحص الملفات وانت بتفتحها. بس الملفات اللي موجودة من زمان وعمرك ما فتحتها، محدش فحصها — وده دور الـ full scan.`,
            how: R`**أنواع الفحص:**

| | بيفحص | الوقت |
|---|---|---|
| [[QuickScan]] | الأماكن اللي البرامج الخبيثة بتستخبى فيها عادة | دقايق |
| [[FullScan]] | كل الملفات على كل الديسكات | ساعة أو أكتر |
| [[CustomScan]] | فولدر أو ملف انت بتحدده | حسب الحجم |
| [[-ScanType OfflineScan]] (لـ [[Start-MpWDOScan]]) | بيعمل restart ويفحص قبل ويندوز ما يفتح | — |

(أوقات QuickScan و FullScan من وثائق Microsoft — الـ CustomScan بس اللي اتقاس هنا.)

**ليه [[4294967295]]؟** ده [[2³² − 1]] — أكبر قيمة لرقم [[uint32]]. البرنامج بيستخدمه كعلامة «مفيش قيمة». وده نمط هتشوفه كتير: أرقام زي [[-1]] و [[65535]] و [[4294967295]] غالبًا معناها «مش موجود»، مش رقم حقيقي.

**[[Get-Command -Module Defender]]** طلّع **١٥ أمر** — منهم [[Set-MpPreference]] (إعدادات، محتاج Admin) و [[Add-MpPreference -ExclusionPath]] (استثناء فولدر — **خد بالك**، أي حاجة في الاستثناء مش هتتفحص).

**و [[Measure-Command]]:** بيشغّل الكود وبيرمي ناتجه، وبيرجّع الوقت بس. فلو عايز الاتنين:

~~~powershell
$s = Get-Date; Start-MpScan -ScanType CustomScan -ScanPath $p; "خلص في {0:N1} ثانية" -f ((Get-Date) - $s).TotalSeconds
~~~

**وعلى لينكس:** ClamAV ([[clamscan -r ~/Downloads]]) — بيحتاج يحمّل قاعدة بيانات التعريفات الأول ([[freshclam]]). (من وثائق ClamAV — مااتجرّبش هنا.)`,
            when: R`أي ملف أو فلاشة من بره، وكل شوية full scan، وأي وقت الجهاز يتصرف بشكل غريب.`,
            mistakes: R`تفتكر الـ quick scan اليومي كفاية. أو تضيف فولدر للاستثناءات «مؤقتًا» وتنساه. أو [[Measure-Command]] على أمر محتاج تشوف ناتجه. أو تقرا [[4294967295]] كعدد أيام.`
          },
          teach: R`## الحالة

~~~powershell
Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled,
  AntivirusSignatureLastUpdated, QuickScanAge, FullScanAge
~~~

~~~text اتشغّل فعلًا
AntivirusEnabled              : True
RealTimeProtectionEnabled     : True
AntivirusSignatureLastUpdated : 10/28/2026 11:03:00 PM
QuickScanAge                  : 0
FullScanAge                   : 4294967295
~~~

**[[4294967295]] = عمره ما اتعمل.** ده أكبر رقم [[uint32]]، والبرنامج بيستخدمه علامة «مفيش قيمة».

---

## ١. فحص فولدر

~~~powershell
$s = Get-Date
Start-MpScan -ScanType CustomScan -ScanPath $p
"scan done in {0:N1}s" -f ((Get-Date) - $s).TotalSeconds
~~~

~~~text اتشغّل فعلًا — من غير Admin
scan done in 1.8s
~~~

~~~bat أو من CMD
"%ProgramFiles%\Windows Defender\MpCmdRun.exe" -Scan -ScanType 3 -File "%USERPROFILE%\Downloads"
~~~

~~~text اتشغّل فعلًا (على فولدر تجربة)
Scan starting...
Scan finished.
Scanning C:\...\cmdlab found no threats.
~~~

---

## ٢. مصيدة: [[Measure-Command]] بيكتم الناتج

~~~powershell
Measure-Command { Start-MpScan -ScanType CustomScan -ScanPath $p; "scan done" }
~~~

~~~text اتشغّل فعلًا
TotalSeconds : 0.1          <-- و "scan done" ماتطبعتش
~~~

**[[Measure-Command]] بيرمي الناتج.** فاستخدم [[Get-Date]] قبل وبعد لو محتاج الاتنين.

---

## ٣. أنواع الفحص

| | | الوقت |
|---|---|---|
| [[QuickScan]] | الأماكن المعتادة | دقايق |
| [[FullScan]] | **كل حاجة** | ساعة أو أكتر |
| [[CustomScan]] | فولدر | حسب الحجم |

---

## ٤. اللي اتلقى قبل كده

~~~powershell
Get-MpThreatDetection | Select-Object InitialDetectionTime, ThreatID, ActionSuccess
~~~

---

## الخلاصة

- [[Get-MpComputerStatus]] — والـ [[FullScanAge]].
- [[Start-MpScan -ScanType CustomScan]] — من غير Admin.
- [[4294967295]] = مفيش، مش رقم.
- [[Measure-Command]] بيكتم الناتج.
- الاستثناءات = أماكن مش بتتفحص.`,
          sol: R`الحالة، والفحص بـ [[Start-MpScan]] و [[MpCmdRun]] على فولدر تجربة، و [[Get-MpThreatDetection]]، اتشغّلوا من غير Admin على ويندوز 11. أوقات QuickScan و FullScan و ClamAV من الوثائق.`,
          solCode: R`Get-MpComputerStatus     # FullScanAge : 4294967295   (= عمره ما اتعمل)
Start-MpScan -ScanType CustomScan -ScanPath $p      # scan done in 1.8s
MpCmdRun.exe -Scan -ScanType 3 -File $p             # ... found no threats.   exit=0
(Get-Command -Module Defender).Count                # 15`
        },

        {
          cmd: "ملفات النظام والديسك",
          title: "sfc و DISM و chkdsk: بالترتيب، وكـ Admin",
          learn: R`تعرف إمتى تشغّل كل أداة من التلاتة، وبأنهي ترتيب، وليه محتاجين Admin.`,
          out: R`تصلّح ويندوز بايظ من غير ما تعيد تسطيبه.`,
          use: {
            work: R`ويندوز بيطلّع أخطاء غريبة، أو برامج النظام بتقع، أو التحديثات بتفشل — التلاتة دول قبل ما تفكّر في إعادة تسطيب.`,
          },
          desc: R`تلات أدوات، وكل واحدة ليها شغلة:

| الأداة | بتفحص | بتصلّح من |
|---|---|---|
| [[sfc /scannow]] | ملفات ويندوز نفسها | نسخة محفوظة على الجهاز |
| [[DISM /Online /Cleanup-Image /RestoreHealth]] | **النسخة المحفوظة دي** | Windows Update |
| [[chkdsk C: /scan]] | نظام الملفات على الديسك | — |

**والترتيب مهم:** لو [[sfc]] قال إنه لقى ملفات بايظة ومقدرش يصلّحها، يبقى النسخة المحفوظة نفسها بايظة. فـ [[DISM]] الأول يصلّحها من النت، وبعدين [[sfc]] تاني.

**والتلاتة محتاجين Admin.** جرّبتهم من غير:

[[sfc]]: [[You must be an administrator running a console session in order to use the sfc utility.]]

[[chkdsk C:]]: [[Access Denied as you do not have sufficient privileges ... You have to invoke this utility running in elevated mode]]

وفي الاتنين [[exit=1]].

**التفاصيل الكاملة** لكل أداة في تاب CMD (قسم «تحكّم في الجهاز وصيانته»: درس «sfc و DISM» ودرس «chkdsk»).`,
          example: R`# Windows (PowerShell كـ Admin):
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
chkdsk C: /scan
Get-Content "$env:windir\Logs\CBS\CBS.log" -Tail 50 | Select-String "corrupt|repaired"`,
          lines: [
            R`افحص ملفات ويندوز وصلّحها من النسخة المحفوظة. ١٠ لـ ٣٠ دقيقة.`,
            R`صلّح النسخة المحفوظة نفسها من Windows Update. محتاج نت.`,
            R`[[sfc]] تاني — دلوقتي عنده نسخة سليمة يصلّح منها.`,
            R`افحص نظام الملفات وهو شغّال ([[/scan]] من غير إعادة تشغيل). و [[/f]] بيصلّح بس محتاج restart لـ [[C:]].`,
            R`لوج [[sfc]]: اللي اتلقى واللي اتصلّح.`,
          ],
          try: R`افتح PowerShell كـ Admin (Win+X ← Terminal (Admin))، وشغّل [[sfc /scannow]] بس، واستنى. لو قال «did not find any integrity violations»، خلاص. ولو قال إنه صلّح، اعمل restart. ولو قال «unable to fix some»، كمّل بـ [[DISM]].`,
          deep: {
            why: R`ملفات النظام بتبوظ من انقطاع كهربا وقت تحديث، أو ديسك فيه مشكلة، أو برنامج غيّر حاجة مش بتاعته. والأدوات دي بتقارنها بنسخة معروفة إنها سليمة.`,
            how: R`**نتايج [[sfc]]:**

| الرسالة | معناها |
|---|---|
| did not find any integrity violations | سليم |
| found corrupt files and successfully repaired them | اتصلّح — اعمل restart |
| found corrupt files but was unable to fix some | **[[DISM]]** وبعدين [[sfc]] تاني |
| could not perform the requested operation | جرّب من Safe Mode |

(الرسايل دي من وثائق Microsoft — مااتشغّلتش كـ Admin هنا.)

**[[chkdsk]]:**

| | |
|---|---|
| [[chkdsk C:]] | قراية بس |
| [[chkdsk C: /scan]] | فحص وهو شغّال (NTFS) |
| [[chkdsk C: /f]] | يصلّح — لـ [[C:]] بيتجدول للـ restart الجاي |
| [[chkdsk C: /r]] | يدوّر على sectors بايظة — **ساعات** على ديسك كبير |

**وليه Admin؟** الأدوات دي بتكتب في ملفات النظام نفسه وبتقرا الديسك مباشرة. وده مينفعش يتعمل بصلاحيات يوزر عادي — حتى لو انت الـ Admin بتاع الجهاز، لازم تفتح الترمنال «كـ Admin» (UAC).

**فرق مهم:** [[sfc]] بيصلّح ويندوز، مش برامجك. لو برنامج معين بيقع، الحل في البرنامج نفسه (إصلاح أو إعادة تسطيب)، مش [[sfc]].`,
            when: R`ويندوز بيتصرف غلط بعد تحديث أو انقطاع كهربا، أو بعد إزالة فيروس.`,
            mistakes: R`تشغّلهم من غير Admin وتفتكر الأداة بايظة. أو [[sfc]] مرة وخلاص وهو قال «unable to fix». أو [[chkdsk /r]] على ديسك كبير وانت محتاج الجهاز.`
          },
          teach: R`## تلات أدوات، تلات شغلات

| | بتفحص | بتصلّح من |
|---|---|---|
| [[sfc /scannow]] | ملفات ويندوز | نسخة على الجهاز |
| [[DISM ... /RestoreHealth]] | **النسخة دي** | Windows Update |
| [[chkdsk C: /scan]] | نظام الملفات | — |

---

## ١. الترتيب

~~~text
sfc /scannow
   │
   ├─ سليم أو اتصلّح         ->  خلاص (restart لو صلّح)
   └─ unable to fix some     ->  DISM /Online /Cleanup-Image /RestoreHealth
                                  ثم  sfc /scannow  تاني
~~~

---

## ٢. والتلاتة محتاجين Admin

~~~text اتشغّل فعلًا — من غير Admin
sfc /verifyonly
  You must be an administrator running a console session in order to use the sfc utility.
  exit=1

chkdsk C:
  Access Denied as you do not have sufficient privileges or
  the disk may be locked by another process.
  You have to invoke this utility running in elevated mode
  exit=1
~~~

**Win+X ← Terminal (Admin).**

---

## ٣. [[chkdsk]]

| | |
|---|---|
| [[chkdsk C:]] | قراية |
| [[/scan]] | فحص وهو شغّال |
| [[/f]] | يصلّح — مع restart لـ [[C:]] |
| [[/r]] | sectors بايظة — **ساعات** |

---

## ٤. اللوج

~~~powershell
Get-Content "$env:windir\Logs\CBS\CBS.log" -Tail 50 | Select-String "corrupt|repaired"
~~~

---

## الخلاصة

- [[sfc]] ← لو فشل ← [[DISM]] ← [[sfc]] تاني.
- [[chkdsk /scan]] من غير restart.
- كلهم Admin.
- [[sfc]] بيصلّح ويندوز، مش برامجك.
- التفاصيل في تاب CMD.`,
          sol: R`رسايل [[sfc]] و [[chkdsk]] من غير Admin اتشغّلت على ويندوز 11. الأدوات نفسها كـ Admin ورسايل نتايجها من وثائق Microsoft — مااتشغّلتش لأنها بتصلّح ملفات النظام.`,
          solCode: R`sfc /verifyonly     # You must be an administrator running a console session ...   exit=1
chkdsk C:           # Access Denied ... You have to invoke this utility running in elevated mode   exit=1`
        },

        {
          cmd: "نضّف من غير ما تمسح غلط",
          title: "اعرف المساحة راحت فين، وشوف قبل ما تمسح",
          learn: R`تلاقي أكبر الفولدرات والملفات، وتمسح بـ [[-WhatIf]] الأول.`,
          out: R`جيجات بترجع من غير ما تخسر ملف مهم.`,
          use: {
            prog: R`[[node_modules]] و [[.venv]] و [[target]] و [[bin/obj]] وكاش Docker — كل مشروع قديم بياخد مساحة من غير ما تستخدمه.`,
            work: R`الديسك فاضل فيه ٥٪ — بدل ما تمسح عشوائي، اعرف الأول إيه الكبير.`,
          },
          desc: R`**قبل ما تمسح: اعرف إيه الكبير.**

فولدر الـ TEMP على جهاز التجربة:

[[17,885 files, 3.02 GB]]

**تلات جيجا** ملفات مؤقتة. وده بس مكان واحد.

**والقاعدة: [[-WhatIf]] الأول، دايمًا.** [[Remove-Item ... -WhatIf]] بيطبع اللي **كان** هيتمسح، ومبيمسحش:

[[What if: Performing the operation "Remove File" on target "C:\...\report.htm".]]

ولما تتأكد إن القايمة صح، شيل [[-WhatIf]].

**أماكن تبص فيها:**

| | |
|---|---|
| [[$env:TEMP]] | ملفات مؤقتة — آمنة تتمسح غالبًا (اللي مفتوح هيرفض) |
| [[$HOME\Downloads]] | اللي نزّلته من سنين |
| [[node_modules]] في مشاريع قديمة | بيرجع بـ [[npm install]] |
| كاش Docker | [[docker system df]] بيقولك حجمه — **والمسح لكل مشروع لوحده** (درس «الشبكة ملك مين؟» في تاب docker بيشرح ليه [[prune]] العام خطر) |

**ولاحظ:** Defender بيستخدم TEMP، والبرامج المفتوحة ماسكة ملفات فيه. فالمسح هيطلّع أخطاء «in use» لبعض الملفات — وده طبيعي، سيبهم.`,
          example: R`# Windows (PowerShell):
Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
Get-ChildItem $HOME -Directory | ForEach-Object { [pscustomobject]@{ Folder=$_.Name; GB=[math]::Round((Get-ChildItem $_.FullName -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum/1GB,2) } } | Sort-Object GB -Descending | Select-Object -First 10
Get-ChildItem $env:TEMP -Recurse -File -ErrorAction SilentlyContinue | Where-Object LastWriteTime -lt (Get-Date).AddDays(-7) | Remove-Item -WhatIf
docker system df
# Linux:
du -sh ~/* 2>/dev/null | sort -rh | head -10`,
          lines: [
            R`حجم TEMP. و [[-Force]] بيشمل الملفات المخفية، و [[SilentlyContinue]] بيتجاهل اللي مش مسموح تقراه.`,
            R`أكبر ١٠ فولدرات في البيت بتاعك. **بياخد وقت** لو فيه ملفات كتير.`,
            R`**[[-WhatIf]]**: اللي أقدم من أسبوع في TEMP — بيطبع، مبيمسحش.`,
            R`حجم صور وكونتينرات Docker. قراية بس.`,
            R`لينكس: أكبر ١٠ حاجات في البيت. و [[sort -rh]] بيرتب «2.1G» قبل «900M» صح.`,
          ],
          try: R`شغّل الأمر التاني على [[$HOME]]، وبعدين ادخل في أكبر فولدر وشغّله تاني جواه. هتوصل لأكبر حاجة في ٣ خطوات. ومتمسحش حاجة غير لما تعرفها.`,
          deep: {
            why: R`المسح العشوائي بيضيّع حاجات. والمسح من غير ما تعرف الكبير بيضيّع وقت. والطريقة الصح: قيس، ادخل، قيس، امسح بـ [[-WhatIf]] الأول.`,
            how: R`**[[-WhatIf]] في كل حاجة:** أغلب أوامر PowerShell اللي بتغيّر حاجة بتدعمه ([[Remove-Item]] و [[Move-Item]] و [[Stop-Process]] و [[Format-Volume]]...). و [[-Confirm]] بيسألك عن كل واحدة.

**ليه [[Get-ChildItem -Recurse]] بطيء؟** بيقرا كل ملف. على [[$HOME]] فيه مئات الآلاف من الملفات، ممكن ياخد دقايق. وأداة زي WizTree أو WinDirStat (برامج بواجهة) بتقرا الـ MFT مباشرة وأسرع بكتير. (معلومات عامة — البرامج دي مااتجرّبتش هنا.)

**أدوات ويندوز المدمجة:**

| | |
|---|---|
| Settings ← Storage ← Storage Sense | تنضيف تلقائي لـ TEMP والـ Recycle Bin |
| [[cleanmgr]] | Disk Cleanup القديم — و «Clean up system files» بيمسح ملفات التحديثات القديمة |

**ومشاريع البرمجة:**

~~~powershell أكبر node_modules
Get-ChildItem $HOME -Recurse -Directory -Filter node_modules -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch 'node_modules.+node_modules' }
~~~

([[-notmatch]] بيشيل [[node_modules]] اللي جوه [[node_modules]] — الخارجي بس هو اللي يهمك.)

**و Docker:** [[docker system df]] بيقرا بس. والمسح: [[docker compose down --rmi local]] لكل مشروع، أو [[docker image rm]] لصورة معينة. [[docker system prune]] بيمسح حاجات **كل** المشاريع (درس في تاب docker).`,
            when: R`الديسك تحت ١٠٪، أو قبل ما تشتري ديسك أكبر.`,
            mistakes: R`[[Remove-Item -Recurse]] من غير [[-WhatIf]]. أو تمسح من [[C:\Windows]] «عشان كبير». أو [[docker system prune]] على جهاز عليه مشاريع مهمة. أو تقرا ديسك مليان بـ [[Get-ChildItem]] وتقفله بعد دقيقة فتفتكره علّق.`
          },
          teach: R`## قيس قبل ما تمسح

~~~powershell
Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
~~~

~~~text اتشغّل فعلًا
17,885 files, 3.02 GB
~~~

**تلات جيجا** ملفات مؤقتة.

---

## ١. أكبر الفولدرات

~~~powershell
Get-ChildItem $HOME -Directory | ForEach-Object {
  [pscustomobject]@{ Folder=$_.Name; GB=[math]::Round((Get-ChildItem $_.FullName -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum/1GB,2) }
} | Sort-Object GB -Descending | Select-Object -First 10
~~~

**ادخل في الأكبر وشغّله تاني.** تلات خطوات وتوصل.

---

## ٢. [[-WhatIf]] الأول، دايمًا

~~~powershell
Get-ChildItem -LiteralPath $folder -File | Where-Object Extension -eq '.htm' | Remove-Item -WhatIf
~~~

~~~text اتشغّل فعلًا — مفيش حاجة اتمسحت
What if: Performing the operation "Remove File" on target "C:\...\report.htm".
~~~

القايمة صح؟ شيل [[-WhatIf]].

---

## ٣. فين تبص

| | |
|---|---|
| [[$env:TEMP]] | آمن غالبًا (المفتوح هيرفض — سيبه) |
| [[Downloads]] | من سنين |
| [[node_modules]] قديمة | ترجع بـ [[npm install]] |
| Docker | [[docker system df]] — والمسح لكل مشروع |

---

## ٤. لينكس

~~~bash
du -sh ~/* 2>/dev/null | sort -rh | head -10
~~~

---

## الخلاصة

- قيس، ادخل، قيس.
- [[-WhatIf]] قبل أي مسح.
- TEMP و Downloads و [[node_modules]] القديمة الأول.
- [[docker system prune]] بيلمس كل المشاريع.`,
          sol: R`حجم TEMP و [[-WhatIf]] اتشغّلوا على جهاز التجربة (مفيش حاجة اتمسحت). Storage Sense و [[cleanmgr]] والبرامج التانية من الوثائق.`,
          solCode: R`Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
#   17,885 files, 3.02 GB
Get-ChildItem -LiteralPath $folder -File | Where-Object Extension -eq '.htm' | Remove-Item -WhatIf
#   What if: Performing the operation "Remove File" on target "...\report.htm".`
        },
        {
          cmd: "افتح برنامج .NET متسطّب",
          title: "برنامج .NET متسطّب ومعاكش الكود: اعرف هو إيه وبيشتغل إزاي من الملفات اللي جنبه",
          learn: R`تعرف برنامج ويندوز مبني بـ .NET الحديث ولا .NET Framework من الملفات اللي جنبه ومن الـ DLLs اللي محمّلها، وتقرا إعداده ونسخته ومكتباته من غير ما تشغّله، وتعرف بيتشغّل بأمر إيه، وتعرف إمتى تفتح الكود بـ decompiler.`,
          out: R`[[pwsh.runtimeconfig.json]] فيه [[net10.0]]، و [[System.Management.Automation]] رقم نسخته وعدد مكتباته، و [[coreclr.dll]] في العملية الشغّالة.`,
          use: {
            prog: R`برنامج بتاعك قديم ضاع الكود بتاعه، أو أداة مفتوحة المصدر عايز تعرف بتستخدم أنهي نسخة .NET قبل ما تحدّث، أو خطأ [[FileNotFoundException]] على DLL ومش عارف مين محتاجها.`,
            work: R`في الحالة الحقيقية: أداة VPN جاهزة متسطّبة، وعايزين نعرف بتشغّل محركها بأي arguments وبتقرا إعداداتها منين، من غير ما نلمس حاجة.`,
          },
          desc: R`عندك برنامج متسطّب ومعاكش الكود، وعايز تعرف: مبني بإيه؟ نسخة كام؟ بيقرا إعداده منين؟ بيشغّل برامج تانية بأي أمر؟ أغلب الإجابات **في الملفات اللي جنب الـ exe** وفي العملية وهي شغّالة، من غير أي أداة إضافية:

- [[*.runtimeconfig.json]] = .NET الحديث (5 وما بعده)، وفيه نسخة الـ runtime. و [[App.exe.config]] = .NET Framework (القديم).
- [[*.deps.json]] = كل المكتبات (packages) ونسخها.
- [[VersionInfo]] = اسم المنتج ونسخته.
- [[[Reflection.AssemblyName]::GetAssemblyName()]] = اسم الـ DLL ونسختها، ومن غير ما الكود يشتغل.
- الـ modules المحمّلة: [[coreclr.dll]] = .NET الحديث، و [[clr.dll]] = Framework.
- [[Get-CimInstance Win32_Process]] و [[CommandLine]] = بيشغّل محركه بإيه.

جرّبناها على PowerShell 7 نفسه (برنامج .NET مفتوح المصدر). ولو محتاج تشوف الكود: [[ilspycmd]] بيعمل decompile. **بس على برنامج بتاعك أو مفتوح المصدر**، مش لتخطي ترخيص أو حماية.`,
          example: R`# Windows (PowerShell):
$dir = Split-Path (Get-Process -Id $PID).Path
Get-ChildItem $dir -Filter 'pwsh*' | Select-Object Name, Length
Get-Content (Join-Path $dir 'pwsh.runtimeconfig.json')
(Get-Item (Join-Path $dir 'pwsh.exe')).VersionInfo | Select-Object ProductName, ProductVersion, OriginalFilename
[Reflection.AssemblyName]::GetAssemblyName((Join-Path $dir 'System.Management.Automation.dll')).FullName
[Reflection.AssemblyName]::GetAssemblyName((Join-Path $dir 'pwsh.exe'))
(Get-Process -Id $PID).Modules | Where-Object ModuleName -in 'coreclr.dll', 'clr.dll', 'hostfxr.dll' | Select-Object ModuleName
Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Select-Object Name, CommandLine`,
          lines: [
            R`فولدر البرنامج: [[$PID]] رقم النافذة دي، و [[.Path]] مسار الـ exe بتاعها، و [[Split-Path]] يشيل اسم الملف ويسيب الفولدر. لبرنامج تاني: [[(Get-Process <name>).Path]] أو فولدره في [[Program Files]].`,
            R`الملفات اللي جنب الـ exe وبتبدأ بنفس الاسم: [[.exe]] و [[.dll]] و [[.runtimeconfig.json]] و [[.deps.json]]. وجودهم لوحده بيقول «.NET الحديث».`,
            R`إعداد الـ runtime: [[tfm]] (النسخة اللي اتبنى عليها) والـ frameworks اللي محتاجها. [[includedFrameworks]] = البرنامج جايب الـ runtime معاه (self-contained).`,
            R`اسم المنتج ونسخته من الـ resources بتاعة الملف. [[OriginalFilename]] = [[pwsh.dll]]: الكود الحقيقي في الـ DLL، والـ exe مجرد مشغّل.`,
            R`اسم الـ DLL الكامل: الاسم والنسخة والثقافة و [[PublicKeyToken]] (بصمة اللي وقّعه باسم قوي). [[GetAssemblyName]] بيقرا الـ metadata بس ومبيشغّلش كود.`,
            R`نفس الأمر على الـ exe: [[PE image does not have metadata.]] يعني الـ exe ده مش assembly .NET، ده «apphost» native بيحمّل [[pwsh.dll]].`,
            R`الـ runtime اللي محمّل في العملية: [[coreclr.dll]] و [[hostfxr.dll]] = .NET الحديث، و [[clr.dll]] = .NET Framework.`,
            R`أي نسخة شغّالة من برنامج اتشغّلت بأمر إيه بالظبط (هنا Windows PowerShell، ولبرنامج تاني غيّر الاسم).`,
          ],
          try: R`افتح نافذة [[powershell]] (5.1) وسيبها، ومن [[pwsh]] شغّل الـ ٨ سطور. وبعدين كرّرهم على 5.1: [[Get-ChildItem "$env:windir\System32\WindowsPowerShell\v1.0" -Filter *.config]] و [[Get-Content]] على [[powershell.exe.config]]، و [[Modules]] للعملية بتاعتها. قارن: أنهي فيه [[runtimeconfig.json]] وأنهي فيه [[.exe.config]]؟ وأنهي فيه [[coreclr.dll]] وأنهي [[clr.dll]]؟`,
          teach: R`## السؤال

أداة متسطّبة على الجهاز، ومعاك الملفات بس. عايز تعرف من غير ما تخمّن ومن غير ما تشغّل حاجة غريبة:

١. مبنية على .NET الحديث ولا .NET Framework؟ (بيحدد إيه اللي محتاج يتسطّب، وإيه الأدوات اللي تنفع)
٢. نسختها ونسخ المكتبات اللي معاها؟
٣. بتقرا إعدادها منين؟
٤. وهي شغّالة، بتشغّل إيه وبأي arguments؟

المعمل: PowerShell 7 نفسه، برنامج .NET مفتوح المصدر (رخصة MIT) ومتسطّب عندك.

---

## ١. الملفات اللي جنب الـ exe

~~~powershell
$dir = Split-Path (Get-Process -Id $PID).Path
Get-ChildItem $dir -Filter 'pwsh*' | Select-Object Name, Length
~~~

~~~text الناتج (PowerShell 7.6 من Microsoft Store)
Name                           Length
----                           ------
pwsh.deps.json                  99635
pwsh.dll                       157480
pwsh.exe                       301360
pwsh.profile.dsc.resource.json   5024
pwsh.profile.resource.ps1       20471
pwsh.runtimeconfig.json           790
~~~

| الملف | بيقول إيه |
|---|---|
| [[pwsh.exe]] | المشغّل (apphost): برنامج native صغير بيلاقي الـ runtime ويحمّل الـ DLL |
| [[pwsh.dll]] | الكود الحقيقي (assembly .NET) |
| [[pwsh.runtimeconfig.json]] | الـ runtime المطلوب. وجوده = .NET الحديث |
| [[pwsh.deps.json]] | شجرة المكتبات ونسخها |
| [[App.exe.config]] (مش هنا) | لو لقيته بدل اللي فوق: .NET Framework |

---

## ٢. الـ runtime

~~~text Get-Content (Join-Path $dir 'pwsh.runtimeconfig.json') (أوله)
{
  "runtimeOptions": {
    "tfm": "net10.0",
    "includedFrameworks": [
      {
        "name": "Microsoft.NETCore.App",
        "version": "10.0.14"
      },
      {
        "name": "Microsoft.WindowsDesktop.App",
        "version": "10.0.14"
      }
    ],
~~~

| المفتاح | معناه |
|---|---|
| [[tfm]] [[net10.0]] | Target Framework: اتبنى على .NET 10 |
| [[includedFrameworks]] | الـ runtime **جوه** فولدر البرنامج (self-contained). مش محتاج تسطّب .NET |
| [[framework]] (في برامج تانية بدل اللي فوق) | framework-dependent: محتاج الـ runtime ده متسطّب على الجهاز ([[dotnet --list-runtimes]]) |
| [[Microsoft.WindowsDesktop.App]] | بيستخدم WinForms أو WPF |
| [[configProperties]] | إعدادات للـ runtime (زي [[TieredCompilation]])، مش إعدادات البرنامج نفسه |

وفي Windows PowerShell 5.1 (.NET Framework) مفيش runtimeconfig، فيه [[.exe.config]] XML:

~~~text Get-Content "$env:windir\System32\WindowsPowerShell\v1.0\powershell.exe.config"
<configuration>
  <uri>
    <schemeSettings>
      <add name="http" genericUriParserOptions="DontUnescapePathDotsAndSlashes"/>
      <add name="https" genericUriParserOptions="DontUnescapePathDotsAndSlashes"/>
    </schemeSettings>
  </uri>
  <runtime>
    <AppContextSwitchOverrides value="Switch.System.Net.DontEnableSystemDefaultTlsVersions=false" />
  </runtime>
</configuration>
~~~

وده ممكن يكون فيه إعدادات البرنامج كمان ([[appSettings]] و [[connectionStrings]]) في برامج Framework تانية. وأحيانًا أسرار، فمتبعتوش لحد من غير ما تقراه.

---

## ٣. النسخة والمكتبات

~~~text (Get-Item (Join-Path $dir 'pwsh.exe')).VersionInfo | Select-Object ProductName, ProductVersion, OriginalFilename
ProductName      : PowerShell
ProductVersion   : 7.6.9 SHA: 3a0b9fb386a321f664ab6dd6a39abaf2313c76bf+3a0b9fb386a321f664ab6dd6a39abaf2313c76bf
OriginalFilename : pwsh.dll
~~~

[[ProductVersion]] فيه هاش الـ commit اللي اتبنى منه (المشروع مفتوح المصدر، فتقدر تفتح نفس الكود على GitHub).

~~~text [Reflection.AssemblyName]::GetAssemblyName((Join-Path $dir 'System.Management.Automation.dll')).FullName
System.Management.Automation, Version=7.6.0.500, Culture=neutral, PublicKeyToken=31bf3856ad364e35
~~~

~~~text [Reflection.AssemblyName]::GetAssemblyName((Join-Path $dir 'pwsh.exe'))
Exception calling "GetAssemblyName" with "1" argument(s): "PE image does not have metadata."
~~~

[[GetAssemblyName]] بيفتح الملف ويقرا جدول الـ metadata بس، مبيحمّلش الكود ومبيشغّلش حاجة منه. والـ exe طلع native (مفيهوش metadata)، فالكود في [[pwsh.dll]]. ونفس الحكاية على [[powershell.exe]] بتاع 5.1.

والمكتبات من [[deps.json]]:

~~~powershell
$j = Get-Content (Join-Path $dir 'pwsh.deps.json') -Raw | ConvertFrom-Json
$j.runtimeTarget.name
$j.libraries.PSObject.Properties | Select-Object -First 4 | ForEach-Object { "$($_.Name)  type=$($_.Value.type)" }
~~~

~~~text الناتج
.NETCoreApp,Version=v10.0/win7-x64
pwsh/7.6.9.500  type=project
runtimepack.Microsoft.NETCore.App.Runtime.win-x64/10.0.14  type=runtimepack
runtimepack.Microsoft.WindowsDesktop.App.Runtime.win-x64/10.0.14  type=runtimepack
Humanizer.Core/2.14.1  type=package
~~~

[[type=package]] = مكتبة من NuGet باسمها ونسختها (تقدر تدوّر عليها لو فيها ثغرة معروفة). و [[project]] = كود المشروع نفسه.

ولو عايز المكتبات اللي DLL معينة بتعتمد عليها، من غير ما تحمّلها (PowerShell 7):

~~~powershell
$fs = [IO.File]::OpenRead((Join-Path $dir 'System.Management.Automation.dll'))
$pe = [System.Reflection.PortableExecutable.PEReader]::new($fs)
$md = [System.Reflection.Metadata.PEReaderExtensions]::GetMetadataReader($pe)
"refs: " + $md.AssemblyReferences.Count
$md.AssemblyReferences | Select-Object -First 3 | ForEach-Object { $r = $md.GetAssemblyReference($_); '{0} {1}' -f $md.GetString($r.Name), $r.Version }
$pe.Dispose(); $fs.Dispose()
~~~

~~~text الناتج
refs: 62
System.Runtime 10.0.0.0
System.Runtime.InteropServices 10.0.0.0
System.Diagnostics.Process 10.0.0.0
~~~

---

## ٤. وهي شغّالة

~~~text (Get-Process -Id $PID).Modules | Where-Object ModuleName -in 'coreclr.dll','clr.dll','hostfxr.dll'
ModuleName
----------
hostfxr.dll
coreclr.dll
~~~

~~~text نفس الأمر على عملية powershell.exe (5.1)
ModuleName
----------
clr.dll
~~~

| الـ module | الـ runtime |
|---|---|
| [[hostfxr.dll]] و [[hostpolicy.dll]] و [[coreclr.dll]] | .NET الحديث |
| [[mscoree.dll]] و [[clr.dll]] | .NET Framework 4.x |

~~~text Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Select-Object Name, CommandLine
Name        : powershell.exe
CommandLine : "C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -Command Start-Sleep 8
~~~

في الحالة الحقيقية نفس السطر بـ [[Name='engine.exe']] هو اللي ورّى الأداة بتشغّل محركها بأي arguments وأنهي ملف إعداد، من غير ما نفتح الكود ولا نشغّل حاجة جديدة.

---

## ٥. لو محتاج الكود نفسه (من الوثائق)

| الأداة | بتعمل إيه | التسطيب |
|---|---|---|
| [[ilspycmd]] | decompile لـ DLL لكود C# مقري | [[dotnet tool install ilspycmd --tool-path C:\lab\tools]] وبعدين [[C:\lab\tools\ilspycmd App.dll -o out]] |
| [[dnfile]] (Python) | يقرا الـ metadata (types و methods و resources) من غير .NET | [[pip install dnfile]] |
| ILSpy أو dnSpy (واجهة) | نفس الحكاية بالماوس | من GitHub releases |

دول متسطّبوش هنا (مساحة الديسك)، والأوامر من وثائقهم. والقاعدة: على برنامج **بتاعك**، أو **مفتوح المصدر**، أو عندك إذن. مش لتخطي ترخيص أو حماية في برنامج حد.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تشغّل البرنامج وتجرّب | ممكن يغيّر إعدادات أو شبكة (أداة VPN مثلًا). القراية الأول |
| [[[Reflection.Assembly]::LoadFile()]] | بيحمّل الـ DLL جوه عمليتك، وممكن يشغّل كود (module initializers)، ومش هتعرف تشيله. [[GetAssemblyName]] و [[PEReader]] قراية بس |
| تدوّر على النت «البرنامج ده مبني بإيه» | الملفات بتقولك بالظبط، وبنسختك انت |

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| .NET الحديث ولا Framework؟ | [[*.runtimeconfig.json]] ولا [[*.exe.config]]، أو [[coreclr.dll]] ولا [[clr.dll]] في [[Modules]] |
| محتاج runtime متسطّب؟ | [[framework]] = أيوه، [[includedFrameworks]] = لأ |
| النسخة | [[VersionInfo]] و [[GetAssemblyName]] |
| المكتبات | [[deps.json]] أو [[PEReader]] و [[AssemblyReferences]] |
| بيشغّل إيه | [[Get-CimInstance Win32_Process]] و [[CommandLine]] |`,
          deep: {
            why: R`قبل ما تحدّث أو تنقل أو تشخّص برنامج، محتاج تعرف هو إيه. والملفات اللي جنب الـ exe بتجاوب في دقيقة، بدل ما تشغّل البرنامج وتشوف هيعمل إيه أو تسطّب أدوات كبيرة.`,
            how: R`برنامج .NET الحديث بيتكوّن من apphost ([[App.exe]] native) بيقرا [[App.runtimeconfig.json]] عشان يعرف أنهي runtime يحمّل (من الفولدر نفسه لو self-contained، أو من [[C:\Program Files\dotnet]])، وبعدين [[hostfxr]] و [[hostpolicy]] بيقروا [[deps.json]] عشان يعرفوا مسار كل مكتبة، و [[coreclr]] بيشغّل الكود. و .NET Framework بيتحمّل عن طريق [[mscoree.dll]] (shim في ويندوز) اللي بيحمّل [[clr.dll]] ويقرا [[App.exe.config]]. والـ assembly ملف PE فيه جداول metadata (أنواع، وmethods، ومراجع) وكود IL، وده اللي [[PEReader]] و [[ilspycmd]] بيقروه.`,
            when: R`برنامج قديم ضاع كوده، وخطأ [[Could not load file or assembly]]، وقبل ما تحدّث .NET على سيرفر (مين محتاج أنهي نسخة؟)، وفحص مكتبة فيها ثغرة معروفة (موجودة في [[deps.json]] بتاع أنهي برنامج؟)، وأداة بتشغّل برنامج تاني ومحتاج تعرف بأي إعداد.`,
            mistakes: R`تحمّل الـ DLL بـ [[LoadFile]] عشان «تشوفها» فتشغّل كود من غير ما تقصد. وتفتكر إن الـ exe هو الكود (في .NET الحديث هو مشغّل بس). وتبعت [[.exe.config]] لحد وفيه connection string بباسورد. وتعمل decompile لبرنامج مش بتاعك. وتدوّر على [[runtimeconfig.json]] في برنامج Framework ومتلاقيهوش فتفتكر إنه مش .NET.`
          },
          sol: R`على ويندوز 11 و PowerShell 7.6 (من Store): الفولدر فيه [[pwsh.exe]] (301,360 byte) و [[pwsh.dll]] و [[pwsh.runtimeconfig.json]] و [[pwsh.deps.json]]، و [[tfm]] = [[net10.0]] و [[includedFrameworks]] فيه [[Microsoft.NETCore.App]] و [[Microsoft.WindowsDesktop.App]] [[10.0.14]]، و [[OriginalFilename : pwsh.dll]]، و [[System.Management.Automation, Version=7.6.0.500, ... PublicKeyToken=31bf3856ad364e35]]، و [[pwsh.exe]] رجّع [[PE image does not have metadata.]]، و [[deps.json]] فيه 54 مكتبة و [[runtimeTarget]] [[.NETCoreApp,Version=v10.0/win7-x64]]، و [[PEReader]]: [[refs: 62]] و [[types: 3531]]. وعملية [[pwsh]] فيها [[hostfxr.dll]] و [[hostpolicy.dll]] و [[coreclr.dll]]، وعملية [[powershell.exe]] فيها [[mscoree.dll]] و [[clr.dll]]، و [[powershell.exe.config]] موجود.

كله قراية بس. [[ilspycmd]] و [[dnfile]] من وثائقهم ومتسطّبوش.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ٣ علامات تقول إن برنامج مبني بـ .NET الحديث، و ٢ تقول .NET Framework.`, done: R`الحديث: [[*.runtimeconfig.json]] و [[*.deps.json]] و [[coreclr.dll]] في الـ modules. Framework: [[*.exe.config]] و [[clr.dll]] (أو [[mscoree.dll]]).` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: لف على كل فولدرات [[C:\Program Files]] (مستوى واحد أو اتنين)، ولاقي كل [[*.runtimeconfig.json]]، واطبع جدول: البرنامج، والـ [[tfm]]، و self-contained ولا لأ.`, done: R`الجدول فيه كل البرامج اللي لقيتها، و [[tfm]] متقري من الـ JSON (مش من اسم الملف)، والأمر مبيقعش على فولدر ممنوع (فيه [[-ErrorAction SilentlyContinue]])، وكتبت عدد البرامج اللي محتاجة runtime متسطّب.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: عملية [[dotnet]] شغّالة (أو أي برنامج .NET عندك)، هتلاقي فيها [[coreclr.dll]] ولا [[clr.dll]]؟ و [[GetAssemblyName]] على الـ exe بتاعها هيرجّع إيه؟ وبعدين اتأكد.`, done: R`توقعت [[coreclr.dll]] و [[PE image does not have metadata.]] للـ apphost (أو اسم assembly لو الـ exe نفسه assembly زي برامج Framework)، والنتيجة طابقت أو كتبت ليه لأ.` },
            { lvl: 'تطبيق', t: R`صلّح: صاحبك بيقرا DLL كده: [[$a = [Reflection.Assembly]::LoadFile('C:\tools\Plugin.dll'); $a.GetName().Version]]. إيه المشكلة وإيه البديل؟`, done: R`كتبت إن [[LoadFile]] بيحمّل الكود جوه العملية ومش بيتشال وممكن يشغّل كود، والبديل [[[Reflection.AssemblyName]::GetAssemblyName($path).Version]]، وجرّبته على DLL من فولدر [[pwsh]].` },
            { lvl: 'تحدي', t: R`ابني [[Get-DotNetInfo -Path <exe>]]: بيرجّع object فيه النوع (Modern أو Framework أو Native)، و [[tfm]]، و self-contained، والنسخة، وعدد المكتبات من [[deps.json]]، وأول ٥ packages. جرّبه على [[pwsh.exe]] و [[powershell.exe]] و [[notepad.exe]].`, done: R`[[pwsh.exe]] = Modern و [[net10.0]] و self-contained، و [[powershell.exe]] = Framework (لقى [[.exe.config]])، و [[notepad.exe]] = Native، ومبيحمّلش ولا DLL في العملية.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`$dir = Split-Path (Get-Process -Id $PID).Path
$rc = Get-Content (Join-Path $dir 'pwsh.runtimeconfig.json') -Raw | ConvertFrom-Json
"tfm: " + $rc.runtimeOptions.tfm.StartsWith('net')
[Reflection.AssemblyName]::GetAssemblyName((Join-Path $dir 'System.Management.Automation.dll')).Name
try { [Reflection.AssemblyName]::GetAssemblyName((Join-Path $dir 'pwsh.exe')) } catch { $_.Exception.Message }
"coreclr loaded: " + [bool]((Get-Process -Id $PID).Modules | Where-Object ModuleName -eq 'coreclr.dll')`, expect: [R`tfm: True`, R`System.Management.Automation`, R`PE image does not have metadata.`, R`coreclr loaded: True`] },
          ],
        }
      ]
    },
    {
      t: "الفلاشات والديسكات",
      l: 2,
      time: R`حوالي ٤٠ دقيقة`,
      goal: [
        R`تعرف الفلاشة من بين الديسكات قبل أي حاجة، عشان متفرمتش الديسك الغلط.`,
        R`تفرمت فلاشة بالنظام الصح: FAT32 أو exFAT أو NTFS أو ext4.`,
      ],
      use: {
        work: R`فلاشة لشاشة أو عربية أو تلفزيون، أو فلاشة bootable، أو فلاشة بتتنقل بين ويندوز والماك.`,
        cs: R`نظام الملفات هو الطريقة اللي الملفات بتتنظّم بيها على الديسك. وكل نظام ليه حدود (حجم الملف، والأجهزة اللي بتقراه).`,
      },
      lab: R`# Linux (ديسك وهمي، من غير ما تلمس أي جهاز):
docker run -it --rm ubuntu:24.04 bash
apt-get update && apt-get install -y dosfstools exfatprogs ntfs-3g mtools
truncate -s 256M usb.img`,
      projects: [
        { t: R`جرّب الأربعة على ديسك وهمي`, what: R`في Docker: اعمل ٤ ملفات [[.img]]، وفرمت كل واحد بنظام، واقرا النتيجة بـ [[blkid]]. وبعدين اكتب ملف جوه الـ FAT32 بـ [[mcopy]] من غير ما تركّبه.` },
      ],
      n: R`الفرمتة اتجرّبت على ديسكات وهمية (ملفات [[.img]] جوه Docker) — مفيش ديسك حقيقي اتلمس. وأوامر ويندوز اتجرّبت قراية بس، أو بـ [[-WhatIf]] على حرف مش موجود`,
      items: [
        {
          cmd: "اعرف الفلاشة صح",
          title: "قبل ما تفرمت: اتأكد إن ده الديسك اللي في إيدك",
          learn: R`تفرّق الفلاشة عن ديسكات الجهاز بالنوع ([[BusType]]) والحجم، قبل أي أمر بيمسح.`,
          out: R`عمرك ما تفرمت الديسك الغلط.`,
          use: {
            work: R`غلطة رقم واحد في الفرمتة من الترمنال: رقم ديسك غلط. وده بيمسح الويندوز أو ملفاتك.`,
          },
          desc: R`على جهاز التجربة، [[Get-Disk]]:

| Number | النوع ([[BusType]]) | الحجم | [[IsBoot]] | [[IsSystem]] |
|---|---|---|---|---|
| 0 | NVMe | 932 جيجا | **True** | False |
| 1 | NVMe | 954 جيجا | False | **True** |

**مفيش فلاشة متوصلة** — [[Get-Disk | Where-Object BusType -eq 'USB']] رجّع ولا حاجة.

**لما توصّل فلاشة**، هتظهر سطر جديد [[BusType = USB]] بحجمها (١٦ أو ٣٢ أو ٦٤ جيجا عادة). وده اللي بتشتغل عليه.

**تلات علامات إن ده مش الديسك الصح:**

- [[IsBoot = True]] أو [[IsSystem = True]] — ده ديسك الويندوز.
- [[BusType]] مش [[USB]].
- الحجم أكبر بكتير من الفلاشة.

**وعلى لينكس:** [[lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS]]. العمود [[TRAN]] = [[usb]]، و [[RM]] = [[1]] (removable). وجوه Docker الأعمدة بتظهر فاضية لأنه مش شايف أجهزة حقيقية.`,
          example: R`# Windows (PowerShell):
Get-Disk | Select-Object Number, FriendlyName, BusType, @{n='SizeGB';e={[math]::Round($_.Size/1GB)}}, IsBoot, IsSystem
Get-Disk | Where-Object BusType -eq 'USB'
Get-Volume | Where-Object DriveType -eq 'Removable'
# Linux:
lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS
# Mac:
diskutil list external`,
          lines: [
            R`كل الديسكات: الرقم، والنوع، والحجم، وهل ده ديسك الويندوز.`,
            R`الفلاشات بس. لو فاضي، مفيش فلاشة متوصلة.`,
            R`أو بالحرف: الـ volumes اللي «Removable».`,
            R`لينكس: [[TRAN]] = usb، و [[RM]] = 1.`,
            R`الماك: الديسكات الخارجية بس. (من وثائق Apple — مااتجرّبش هنا.)`,
          ],
          try: R`شغّل [[Get-Disk]] من غير فلاشة، وبعدين وصّل فلاشة وشغّله تاني. السطر الجديد هو الفلاشة. واكتب رقمه، وقارن الحجم باللي مكتوب عليها.`,
          deep: {
            why: R`أوامر الفرمتة مبتسألش «متأكد إن ده الديسك اللي في إيدك؟». بتنفّذ. فالتأكد بيحصل قبلها، بالعين.`,
            how: R`**[[Number]] ممكن يتغيّر:** رقم الديسك بيتحدد لما الجهاز يفتح أو الفلاشة تتوصل. فلو شلت فلاشة ووصّلت تانية، أو وصّلت اتنين، الأرقام ممكن تتبادل. **اعرف الرقم قبل الأمر على طول**، مش من ساعة.

**الأمان في السكربت:** لو بتكتب سكربت بيفرمت، فلتر بالنوع والحجم، ووقّف لو لقى أكتر من واحد:

~~~powershell
$usb = @(Get-Disk | Where-Object { $_.BusType -eq 'USB' -and -not $_.IsBoot -and -not $_.IsSystem })
if ($usb.Count -ne 1) { throw "لازم فلاشة واحدة بالظبط، لقيت $($usb.Count)" }
~~~

**الديسكات الخارجية (USB HDD/SSD)** برضه [[BusType = USB]]. فلو عندك ديسك خارجي متوصل فيه ملفاتك، **افصله** قبل ما تفرمت أي فلاشة.

**وفي [[diskpart]]** (تاب CMD): [[list disk]] بيطلّع نفس القايمة، و [[select disk N]] ثم [[clean]] بيمسح الديسك كله فورًا. نفس الخطر، ومن غير [[-WhatIf]].`,
            when: R`قبل أي فرمتة، أو [[diskpart]]، أو كتابة ISO على فلاشة.`,
            mistakes: R`تعتمد على رقم شفته من شوية. أو تسيب ديسك خارجي متوصل. أو تفرمت بالحرف من غير ما تتأكد إن الحرف ده الفلاشة.`
          },
          teach: R`## الديسكات اللي على الجهاز

~~~powershell
Get-Disk | Select-Object Number, FriendlyName, BusType,
  @{n='SizeGB';e={[math]::Round($_.Size/1GB)}}, IsBoot, IsSystem
~~~

~~~text اتشغّل فعلًا (الأسماء اتغيّرت)
Number FriendlyName BusType SizeGB IsBoot IsSystem
------ ------------ ------- ------ ------ --------
     0 SSD-2        NVMe       932   True    False
     1 SSD-1        NVMe       954  False     True
~~~

~~~powershell
Get-Disk | Where-Object BusType -eq 'USB'
~~~

~~~text اتشغّل فعلًا
(ولا حاجة — مفيش فلاشة متوصلة)
~~~

---

## ١. علامات إنه **مش** الديسك الصح

| | |
|---|---|
| [[IsBoot]] أو [[IsSystem]] = [[True]] | ديسك الويندوز |
| [[BusType]] مش [[USB]] | ديسك داخلي |
| الحجم أكبر بكتير | مش الفلاشة |

---

## ٢. في سكربت

~~~powershell
$usb = @(Get-Disk | Where-Object { $_.BusType -eq 'USB' -and -not $_.IsBoot -and -not $_.IsSystem })
if ($usb.Count -ne 1) { throw "لازم فلاشة واحدة بالظبط، لقيت $($usb.Count)" }
~~~

> **الديسكات الخارجية برضه [[USB]].** افصلها قبل ما تفرمت.

---

## ٣. لينكس والماك

~~~bash
# Linux:
lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS
# Mac:
diskutil list external
~~~

---

## الخلاصة

- [[BusType = USB]] + الحجم + مش [[IsBoot]].
- الرقم ممكن يتغيّر — اعرفه قبل الأمر على طول.
- افصل أي ديسك خارجي تاني.`,
          sol: R`[[Get-Disk]] والفلتر اتشغّلوا على ويندوز 11 (قراية بس، والأسماء اتغيّرت). [[diskutil]] من وثائق Apple.`,
          solCode: R`Get-Disk     # 0: NVMe 932 IsBoot=True  |  1: NVMe 954 IsSystem=True
Get-Disk | Where-Object BusType -eq 'USB'     # (ولا حاجة)`
        },

        {
          cmd: "فرمت فلاشة",
          title: "FAT32 ولا exFAT ولا NTFS: حسب هتوصّلها بإيه",
          learn: R`تختار نظام الملفات حسب الأجهزة اللي هتقرا الفلاشة، وتفرمتها من الترمنال.`,
          out: R`فلاشة بتشتغل على الجهاز اللي محتاجه.`,
          use: {
            work: R`فلاشة للتلفزيون (FAT32 غالبًا)، أو بتتنقل بين ويندوز والماك (exFAT)، أو لويندوز بس بملفات كبيرة (NTFS).`,
            cs: R`FAT32 من التسعينات، وحد أقصى للملف الواحد ٤ جيجا. exFAT اتعمل عشان يشيل الحد ده ويفضل بسيط.`,
          },
          desc: R`**اختار النظام الأول:**

| النظام | ويندوز | ماك | لينكس | تلفزيونات وعربيات | ملف أكبر من ٤ جيجا |
|---|---|---|---|---|---|
| **FAT32** | ✓ | ✓ | ✓ | ✓ غالبًا | **✗** |
| **exFAT** | ✓ | ✓ | ✓ | بعضها | ✓ |
| **NTFS** | ✓ | قراية بس | ✓ | نادرًا | ✓ |
| **ext4** | ✗ | ✗ | ✓ | ✗ | ✓ |

(التوافق ده من الوثائق والتجربة العامة — والحد الـ ٤ جيجا في FAT32 من مواصفات النظام نفسه.)

**القاعدة البسيطة:** exFAT لو مش متأكد. FAT32 لو جهاز قديم مش بيقرا exFAT.

**اتجرّب على ديسكات وهمية:** ٤ ملفات [[.img]] بـ ٢٥٦ ميجا جوه Docker، وكل واحد اتفرمت بنظام، و [[blkid]] قرا كل واحد:

[[usb-vfat.img: LABEL="MYUSB" UUID="2E45-4E16" TYPE="vfat"]]

[[usb-exfat.img: LABEL="MYUSB" UUID="EBF7-92E4" TYPE="exfat"]]

[[usb-ext4.img: LABEL="MYUSB" UUID="b50d962e-..." TYPE="ext4"]]

[[usb-ntfs.img: LABEL="MYUSB" UUID="03C55F29036BEED9" TYPE="ntfs"]]

**وكتبت ملف جوه الـ FAT32 من غير ما أركّبه** بـ [[mtools]] ([[mcopy]] و [[mdir]]) — وطلع [[a txt 6]]. يعني الفرمتة اشتغلت فعلًا، مش بس الأمر خلص.

**وعلى ويندوز:** [[Format-Volume]] بيقبل [[FAT]] و [[FAT32]] و [[exFAT]] و [[NTFS]] و [[ReFS]] (ده من الـ [[ValidateSet]] بتاعه). وجرّبته بـ [[-WhatIf]] على حرف مش موجود:

[[No MSFT_Volume objects found with property 'DriveLetter' equal to 'Q'.]]

**ولاحظ:** [[Format-Volume]] في ويندوز مش هيفرمت FAT32 لو الفلاشة أكبر من ٣٢ جيجا (حد في أداة ويندوز، مش في النظام نفسه — من وثائق Microsoft).`,
          example: R`# Windows (PowerShell كـ Admin):
Format-Volume -DriveLetter E -FileSystem exFAT -NewFileSystemLabel MYUSB -WhatIf
Format-Volume -DriveLetter E -FileSystem exFAT -NewFileSystemLabel MYUSB
# Linux (الفلاشة /dev/sdX — اتأكد بـ lsblk الأول):
sudo umount /dev/sdX1
sudo mkfs.exfat -L MYUSB /dev/sdX1
# Linux (ديسك وهمي للتجربة):
truncate -s 256M usb.img && mkfs.vfat -F 32 -n MYUSB usb.img && blkid usb.img`,
          lines: [
            R`**[[-WhatIf]] الأول**: بيقول هيعمل إيه من غير ما يعمله. و [[E]] = حرف الفلاشة (من الدرس اللي فات).`,
            R`الفرمتة الحقيقية. **كل اللي على الفلاشة بيتمسح.**`,
            R`لازم تفصل الـ partition قبل الفرمتة. و [[sdX1]] = الفلاشة (مش [[sda]] اللي غالبًا ديسكك).`,
            R`الفرمتة. ([[mkfs.vfat -F 32]] لـ FAT32، و [[mkfs.ext4]] لـ ext4، و [[mkntfs -Q]] لـ NTFS.)`,
            R`**للتجربة**: ملف ٢٥٦ ميجا، وفرمتة FAT32، وقراية النتيجة. ومفيش أي ديسك حقيقي اتلمس.`,
          ],
          try: R`في Docker: [[docker run -it --rm ubuntu:24.04 bash]]، وبعدين [[apt-get update && apt-get install -y dosfstools exfatprogs mtools]]، واعمل [[usb.img]] وفرمته بالاتنين وقارن [[blkid]]. ده كله على ملف — جهازك مش هيتأثر.`,
          flag: "danger",
          deep: {
            why: R`الفرمتة بتمسح كل حاجة على الديسك، ومفيش [[undo]]. والفرق بين ديسك وهمي وديسك حقيقي في الأمر هو حرف واحد. فالتجربة على الوهمي، والحقيقي بعد ما تتأكد ٣ مرات.`,
            how: R`**الـ ٤ جيجا في FAT32:** حجم الملف بيتخزن في ٣٢ bit، فأقصى حجم [[2³² − 1]] بايت = ٤ جيجا ناقص بايت. فيلم ٥ جيجا مش هيتنسخ — وويندوز هيقول «The file is too large for the destination file system». (ده من مواصفات FAT32 — مااتجرّبش بملف كبير هنا.)

**Quick مقابل Full:** [[Format-Volume]] بيعمل quick افتراضيًا (بيكتب نظام ملفات جديد بس). و [[-Full]] بيكتب على كل الفلاشة — أبطأ بكتير، بس بيلاقي الأجزاء البايظة، وبيصعّب استرجاع الملفات القديمة.

**[[diskpart]] لما [[Format-Volume]] مايكفيش:** لو الفلاشة متلخبطة (partitions غريبة من ISO قديم، أو مش بتظهر بحرف)، [[diskpart]] بـ [[clean]] ثم [[create partition primary]] ثم [[format fs=exfat quick]] بيرجّعها جديدة. ده في تاب CMD (درس [[diskpart]]) — و [[clean]] بيمسح الديسك اللي اخترته فورًا.

**و [[mtools]] للتجربة:** [[mcopy -i usb.img file ::/]] بيكتب جوه صورة FAT من غير [[mount]] (اللي محتاج صلاحيات جوه Docker). وده اتجرّب:

~~~text
mdir -i usb-vfat.img ::/
a        txt         6 2026-10-29   9:33
                        264 288 256 bytes free
~~~

**و [[fsck.vfat -n]]** بيفحص من غير ما يصلّح ([[-n]] = no changes):

~~~text
usb-vfat.img: 1 files, 1/516190 clusters
~~~`,
            when: R`فلاشة جديدة لجهاز معين، أو فلاشة بتطلّع أخطاء، أو قبل ما تديها لحد.`,
            mistakes: R`تفرمت من غير [[-WhatIf]] أو من غير ما تتأكد من الحرف. أو FAT32 لفيلم أكبر من ٤ جيجا. أو NTFS لفلاشة هتتقري على ماك. أو [[mkfs]] على [[/dev/sda]] بدل [[/dev/sdb1]].`
          },
          teach: R`## اختار النظام الأول

| | ويندوز | ماك | لينكس | تلفزيون | ملف > ٤ جيجا |
|---|---|---|---|---|---|
| **FAT32** | ✓ | ✓ | ✓ | ✓ | **✗** |
| **exFAT** | ✓ | ✓ | ✓ | بعضها | ✓ |
| **NTFS** | ✓ | قراية | ✓ | نادرًا | ✓ |
| **ext4** | ✗ | ✗ | ✓ | ✗ | ✓ |

**مش متأكد؟ exFAT.**

---

## ١. التجربة: ٤ ديسكات وهمية

~~~bash
for fs in vfat exfat ext4 ntfs; do truncate -s 256M usb-$fs.img; done
mkfs.vfat -F 32 -n MYUSB usb-vfat.img
mkfs.exfat -L MYUSB usb-exfat.img
mkfs.ext4 -q -L MYUSB usb-ext4.img
mkntfs -F -Q -L MYUSB usb-ntfs.img
for fs in vfat exfat ext4 ntfs; do blkid usb-$fs.img; done
~~~

~~~text اتشغّل فعلًا · أوبونتو 24.04 جوه Docker
usb-vfat.img:  LABEL="MYUSB" UUID="2E45-4E16" BLOCK_SIZE="512" TYPE="vfat"
usb-exfat.img: LABEL="MYUSB" UUID="EBF7-92E4" BLOCK_SIZE="512" TYPE="exfat"
usb-ext4.img:  LABEL="MYUSB" UUID="b50d962e-1edf-44d8-9693-9954a1424757" BLOCK_SIZE="4096" TYPE="ext4"
usb-ntfs.img:  LABEL="MYUSB" BLOCK_SIZE="512" UUID="03C55F29036BEED9" TYPE="ntfs"
~~~

**مفيش ديسك حقيقي اتلمس.**

### واتأكد إنها اشتغلت فعلًا

~~~bash
echo "hello" > a.txt; mcopy -i usb-vfat.img a.txt ::/; mdir -i usb-vfat.img ::/
~~~

~~~text اتشغّل فعلًا
a        txt         6 2026-10-29   9:33
                        264 288 256 bytes free
~~~

---

## ٢. ويندوز

~~~powershell
Format-Volume -DriveLetter E -FileSystem exFAT -NewFileSystemLabel MYUSB -WhatIf
~~~

~~~text اتشغّل فعلًا — على حرف مش موجود
No MSFT_Volume objects found with property 'DriveLetter' equal to 'Q'.
~~~

الأنظمة المتاحة (من الـ [[ValidateSet]] بتاعه):

~~~text اتشغّل فعلًا
FAT, FAT32, exFAT, NTFS, ReFS
~~~

> و [[Format-Volume]] مش هيعمل FAT32 لفلاشة أكبر من ٣٢ جيجا (حد في أداة ويندوز — من الوثائق).

---

## ٣. لينكس — على فلاشة حقيقية

~~~bash
lsblk                                  # اتأكد من الاسم
sudo umount /dev/sdX1
sudo mkfs.exfat -L MYUSB /dev/sdX1
~~~

> [[sdX1]] = الفلاشة. **مش [[sda]]** — ده غالبًا ديسكك.

---

## الخلاصة

- اختار النظام حسب هتوصّلها بإيه.
- جرّب على [[.img]] الأول.
- [[-WhatIf]] و [[lsblk]] قبل الحقيقي.
- FAT32 = ملفات أصغر من ٤ جيجا بس.`,
          sol: R`الفرمتة بالأنظمة الأربعة و [[blkid]] و [[mcopy]] و [[fsck.vfat -n]] اتشغّلوا على ملفات [[.img]] جوه Docker (أوبونتو 24.04). [[Format-Volume]] اتجرّب بـ [[-WhatIf]] على حرف مش موجود. حد الـ ٤ جيجا، وحد الـ ٣٢ جيجا في ويندوز، وجدول التوافق، من الوثائق.`,
          solCode: R`mkfs.vfat -F 32 -n MYUSB usb-vfat.img    # mkfs.fat 4.2 (2021-01-31)
mkfs.exfat -L MYUSB usb-exfat.img        # exFAT format complete!
mkntfs -F -Q -L MYUSB usb-ntfs.img       # mkntfs completed successfully. Have a nice day.
blkid usb-vfat.img                       # LABEL="MYUSB" UUID="2E45-4E16" TYPE="vfat"
fsck.vfat -n usb-vfat.img                # usb-vfat.img: 1 files, 1/516190 clusters
# Windows:
Format-Volume -DriveLetter Q -FileSystem exFAT -WhatIf
#   No MSFT_Volume objects found with property 'DriveLetter' equal to 'Q'.`
        }
      ]
    }
]);
