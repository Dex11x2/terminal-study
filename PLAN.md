# الخطة: وصلنا لفين وفاضل إيه

آخر تحديث: ٦ أكتوبر ٢٠٢٦ (TypeScript و HTML/CSS و React و Next.js و API و SQL خلصوا؛ و Python API والملفات والرموز والقاموس خلصوا،  و apps و DSA و real و Go و .NET و PHP و Spring و Angular و React Native خلصوا و Flutter و Kotlin و APIs و Swift و C++ خلصوا؛ cloud و arch و sweng و ai شغالين).

أي جلسة جديدة تقرا الملف ده الأول، وبعد أي دفعة شغل تحدّثه: تشيل اللي خلص من «الشغل الجاي» وتضيفه في «اتعمل»، وتكتب أي حاجة ناقصة اكتشفتها.

## الحالة دلوقتي

- **60 تاب، و 3603 درس، و 154 تمرين بيتصحح لوحده.** `npm run check` بيطلع 0 خطأ و 0 تنبيه، وكل الدروس فيها `teach`.
- **التمارين اللي بتتصحح لوحدها موجودة في 5 تابات بس:** js (38)، و dsa (59)، و data (29)، و symbols (15)، و files (13).
- **أصغر التابات:** sshc (9)، و wsl (14)، و apps (15)، و mongo (23)، و gha (24)، و diag (28)، و nginx (28).

## اتعمل (الأحدث فوق)

- **(٢٧ أكتوبر) تاب جديد «هندسة عكسية (أندرويد)» (re) — تحليل للفهم والدفاع على تطبيقاتك أو عيّنة بس، مش كسر تطبيق حد. المستوى الأول (٥ دروس):**
  - المعمل والحدود الأخلاقية (تطبيقك/عيّنة + إذن)، وتركيب ملف APK (ZIP: dex و manifest و resources و lib و توقيع)، والـ AndroidManifest، والـ DEX/smali (register-based، d8/R8، ART)، والـ decompiling بـ jadx (وحدود الـ obfuscation).
  - اتكتب بـ workflow واتراجع عليه بـ ٣ مراجعات (تقني، أوامر، إطار أخلاقي)؛ ١٧ تصحيح اتطبّقوا قبل الدمج (اتجاه baksmali، مكان توقيع v4 = ملف idsig، آلية Binary XML، AOT الحديث، حدّ الـ 64K = مراجع ميثودز). أوامر الـ ZIP (unzip/file) اتجرّبت؛ أدوات أندرويد (apktool/jadx/aapt/adb) قياسية ومحتاجة SDK.
  - المستويات الجاية (٢ و ٣) هتستعين بمرجع المستخدم في `D:\programming projects\RE` (٢٥ فصل: smali بعمق، JNI، Unity/Flutter، Frida، ARM64، Ghidra، OWASP MASTG) مع الحفاظ على الإطار الدفاعي.
- **(٢٧ أكتوبر) تاب جديد «الشبكات بعمق» (net)، ١٨ درس في ٣ مستويات، بيشرح المبادئ ورا مشروع NetPilot (الـ VPN بتاع المستخدم):**
  - المستوى ١: الطبقات، IP، البورت، TCP، UDP، DNS، والرحلة الكاملة (DNS→TCP→TLS→HTTP).
  - المستوى ٢: جدول التوجيه (longest-prefix و الـ split routes)، NAT، HTTP، TLS/SNI بعمق (والبصمة)، وتصنيف الترافيك (وصفي/دفاعي).
  - المستوى ٣: كارت الـ TUN، SOCKS، التغليف، حماية التسريب (DNS/IPv6 و WFP)، ومفتاح القطع.
  - كل درس اتكتب بـ workflow ثم اتراجع عليه تقنيًا بـ ٣ مراجعات متشككة (دقة البروتوكول، والأوامر، وربط NetPilot)؛ التصحيحات اتطبّقت قبل الدمج. أوامر ويندوز اتجرّبت؛ أوامر لينكس قياسية (Docker مكانش متاح وقتها).
- **(٨ أكتوبر) «الشرح خطوة بخطوة» خلص في كل الـ 3256 درس (100٪).** كل درس اتشغّل كوده قبل ما يتشرح، والـ agents صلّحوا bugs حقيقية كتير (أمان، races، أمثلة مش شغالة). سجل المراجعة: 3251 درس اتجرّب، و 5 لسه (3 RDS محتاجين حساب AWS، و 2 Swift محتاجين Mac). المتابعات في «٤ج».

- **(٦ أكتوبر) تسهيل الشغل وتوفير التوكينز:**
  - `CLAUDE.md` فيه خريطة المشروع والقواعد، و `.claude/settings.json` بيمنع قراية `dist/` و `vendor/`.
  - كل تاب بقى فولدر في `js/tabs/<التاب>/` وملفات حوالي ١٢٠٠ سطر بدل ملف واحد (أكبر ملف كان ٩٣٠٠ سطر). بيانات الموقع بعد التقسيم اتقارنت بالقديمة وطلعت متطابقة بالبايت.
  - `tools/lesson.js`: يطلّع درس واحد أو قايمة دروس تاب بمكانها.
  - `tools/verify.js` و `verified.json`: سجل المراجعة. اتسجّل فيه 502 درس اتراجعوا يوم ٢ أكتوبر (من تاريخ git، بحذر: درس اتراجع من غير ما يتعدّل ممكن يكون لسه متسجّلش)، و `npm run check` بيطبع الملخص.

- **(٢ أكتوبر) مراجعة دروس السكربتات و Python اللي جت من `b346cf4`.** كل أمر اتشغّل: لينكس في Ubuntu 24.04، وويندوز في PowerShell 7.6 و 5.1 و CMD و Python 3.14.
  - **bash:** اتراجع 118 درس واتصلح 14. أشهرهم:
    - رسالة CRLF الحقيقية على Ubuntu 24.04 هي `cannot execute: required file not found`، مش «bad interpreter».
    - `$(( ))`.
    - `disk-alert.sh` في WSL.
    - `convert-all.sh` اتشغّل بـ ImageMagick بجد.
  - **PowerShell و CMD:** اتراجع 125 درس، واتصلحت bugs حقيقية:
    - `organize-downloads.ps1` و `rename-photos.ps1` كانوا بيتجاهلوا الملفات اللي في اسمها `[ ]`.
    - `backup.ps1` كان بيقول «Saved» من غير ما يعمل zip.
    - `set NAME=%1` كان بيقع مع اسم فيه مسافة.
    - `if errorlevel 1` كان بيعدّي أخطاء npm (اللي كود الخروج بتاعها سالب).
    - `forfiles` مكانش بيمسح النسخ القديمة.
  - **Python:** اتراجع الـ 59 درس كلهم:
    - `organize_downloads.py` كان هينقل `desktop.ini` المخفي من فولدر Downloads.
    - تست كان بيمسح ملف حقيقي على ويندوز، لأن `HOME` مبيغيّرش `Path.home()` هناك.
    - أمر `where` و `diff` في PowerShell مش زي لينكس.
    - Python 3.12 بيرمي خطأ لما تكتب `fake.called_once_with` غلط بدل ما يعدّيها في صمت.
  - **zsh:** دروس الماك اللي متجرّبتش بقت تقول مصدرها من الـ docs.
- **`8ee9a35` (٢ أكتوبر): كل أمر مكتوب بيشتغل فين.**
  - شريط صندوق الكود بقى يقول المكان: «bash على لينكس والماك و WSL»، و «PowerShell على ويندوز»، و «CMD على ويندوز»، و «zsh على الماك».
  - المثال اللي فيه أكتر من نظام بيتقسم صناديق، كل نظام بلونه والـ prompt بتاعه.
  - تاب «ابدأ من هنا» اتراجع كله: كل أمر اتشغّل على Ubuntu و PowerShell 7 و 5.1، واتصلح 35 درس.
  - اتصلح كمان درس `Get-Help` في PowerShell، ورسالة git لما تنسى `add`.
- **`1fa97bf` (٢ أكتوبر): 82 درس عن اليوزرز والصلاحيات والشبكة والأجهزة اللي معاك والصيانة.**
  - PowerShell 26، و CMD 19، و bash 24، و zsh/الماك 13.
- **`af7caa3` (٢ أكتوبر): 53 درس عن شكل الترمنال والتحكم في الجهاز.**
  - الـ prompt، والألوان، والثيمات، و Nerd Font، و Windows Terminal.
  - قفل الجهاز بميعاد، والتحميل، والإشعارات، والجدولة.
- **`b346cf4` (١ أكتوبر، من جهاز تاني):**
  - تاب «ابدأ من هنا» زاد من 18 لـ 48 درس.
  - دروس سكربتات في bash و PowerShell و CMD و zsh.
  - Python بقى فيه 59 درس.
  - Go و C++ و Kotlin و Swift بقوا من 49 لـ 56 درس.
  - اتعاد كتابة الشرح المختصر في كذا تاب.

## الشغل الجاي (بالترتيب)

### ٠. «الشرح خطوة بخطوة» لكل الدروس (أول أولوية)

الهدف: كل الكود في كل درس يتشرح لحد ما اللي بيذاكر يفهم كل سطر ويقدر يكتبه بنفسه. الشكل والقواعد في README «الشرح خطوة بخطوة»، والدرس المرجع «CPU و RAM والديسك» في `js/tabs/start/01.js`.

- **التقدم:** `npm run check` بيطبع الإجمالي، و `node tools/lesson.js` بيطبع كل تاب لوحده.
- **طريقة الشغل:** مساعد لكل ملف (حوالي ٢٠ لـ ٣٠ درس)، بالنموذج الأقوى لأن جودة الشرح هي المطلوبة.
  - كل ناتج مكتوب في الشرح لازم يكون من تشغيل حقيقي.
  - وبعدها `node tools/verify.js mark` للدروس اللي اتشغّلت.
- **الترتيب:**
  1. [x] ابدأ من هنا (start): الـ 48 درس (٦ أكتوبر).
  2. [x] PowerShell: الـ 129 درس (٦ أكتوبر).
  3. [x] CMD: الـ 82 درس (٦ أكتوبر).
  4. [x] bash: الـ 166 درس (٦ أكتوبر).
  5. [x] zsh: الـ 57 درس (٦ أكتوبر).
  6. [x] اختصارات النظام، و WSL، و VS Code، و git، و ssh config (٦ أكتوبر).
  7. [x] VPS، و Docker، و Nginx، و Node، و PostgreSQL، و MongoDB، و GitHub Actions، والتشخيص، والأمان، وفحص الكود (٦ أكتوبر).
  8. [ ] Python، و JavaScript، و TypeScript، و HTML و CSS، و React، و Next.js، والباقي.
  9. [ ] تابات المفاهيم (القاموس، والرموز، والملفات، والانترفيو، والإنجليزي) آخر حاجة، ودول الشرح فيهم أقصر.

#### جدول الشغل الجاي (تابات الترمنال خلصت ٦ أكتوبر؛ ٨-١٠: اختصارات النظام و WSL و VS Code و ssh config و git؛ ١١-١٧: VPS و Docker و Nginx والتشخيص و Node و PostgreSQL و MongoDB و GitHub Actions والأمان وفحص الكود. أرقام الملفات دي قبل resplit؛ لو التاب اتقسم هات الأرقام الجديدة)

كل دفعة 3 مساعدين في نفس الوقت، كل واحد على ملف. وبعد كل دفعة:

1. سجّل اللي اتجرّب: سطور `MARK` في تقرير كل مساعد، بـ `node tools/verify.js mark`.
2. `npm run build`.
3. لو التاب خلص كله: `node tools/resplit.js <التاب>` عشان ملفاته ترجع حوالي 1200 سطر. ده بيغيّر أرقام الملفات، فبعده هات أرقام الملفات اللي فاضل فيها دروس من غير شرح، وحدّث الجدول.
4. اعمل commit و push.

| الدفعة | الملفات (عدد الدروس) | الحالة |
|---|---|---|
| ١ | PowerShell أول 81 درس (الملفات القديمة 01 و 02 و 03) | [x] |
| ٢ | باقي PowerShell (48 درس) | [x] |
| ٣ | `cmd/01.js` (30)، و `cmd/02.js` (13)، و `cmd/03.js` (19) | [x] |
| ٤ | `cmd/04.js` (20)، و `bash/01.js` (32)، و `bash/02.js` (22) | [x] |
| ٥ | `bash/03.js` (24)، و `bash/04.js` (28)، و `bash/05.js` (22) | [x] |
| ٦ | `bash/06.js` (12)، و `bash/07.js` (18)، و `bash/08.js` (8) | [x] |
| ٧ | `zsh/01.js` (29)، و `zsh/02.js` (18)، و `zsh/03.js` (10) | [x] |
| ٨ | `os/01.js` (41)، و `os/02.js` (18)، و `wsl/01.js` (14) | [x] |
| ٩ | `vscode/01.js` (41)، و `vscode/02.js` (16)، و `sshc/01.js` (9) | [x] |
| ١٠ | `git/01.js` (21)، و `git/02.js` (17) | [x] |
| ١١ | `vps/01.js` (27)، و `vps/02.js` (25)، و `vps/03.js` (8) | [x] |
| ١٢ | `docker/01.js` (22)، و `docker/02.js` (24)، و `docker/03.js` (11) | [x] |
| ١٣ | `nginx/01.js` (15)، و `nginx/02.js` (13)، و `diag/01.js` (28) | [x] |
| ١٤ | `node/01.js` (26)، و `node/02.js` (16)، و `node/03.js` (19) | [x] |
| ١٥ | PostgreSQL (34) و MongoDB (23) | [x] |
| ١٦ | GitHub Actions (24) والأمان (38) | [x] |
| ١٧ | `quality/01.js` (9)، و `quality/02.js` (17)، و `quality/03.js` (8) | [x] |
| ١٨ | `python/01-03.js` (40) | [x] |
| ١٩ | `python/04-05.js` (19) و `web/01.js` (31) | [x] |
| ٢٠ | `js/01-03.js` (59) | [x] |
| ٢١ | `js/04-06.js` (39) | [x] |
| ٢٢ | `js/07.js` (12) و `ts/01-02.js` (40) | [x] |
| ٢٣ | `ts/03.js` (25) و `css/01-02.js` (42) | [x] (ts و css اتقسموا: ts بقى 12 ملف، css بقى 10) |
| ٢٤ | `css/08-10.js` (42، الأرقام بعد resplit) و `react/01.js` (20) | [x] (css اتقسم تاني: بقى 16 ملف) |
| ٢٥ | `react/02-04.js` (37) | [x] (react اتقسم: بقى 14 ملف) |
| ٢٦ | `react/05-06.js` (25) و `next/01.js` (17) | [x] |
| ٢٧ | `next/02-04.js` (47) | [x] (next اتقسم: بقى 17 ملف. ملاحظة: create-next-app 16.4 بيشغّل cacheComponents افتراضيًا) |
| ٢٨ | `api/01-03.js` (47) | [x] |
| ٢٩ | `api/04-05.js` (25) و `data/01.js` (16) | [x] (api اتقسم: بقى 13 ملف) |
| ٣٠ | `data/02-04.js` (34) | [x] |
| ٣١ | `data/05-06.js` (21) و `pyapi/01.js` (14) | [x] (data اتقسم: بقى 17 ملف) |
| ٣٢ | `pyapi/02-04.js` (37) | [x] |
| ٣٣ | `pyapi/05-06.js` (25) | [x] (pyapi اتقسم: بقى 19 ملف) |
| ٣٤ | `files/01-06.js` (92) | [x] (files اتقسم: بقى 21 ملف) |
| ٣٥ | `symbols/01-04.js` (104) | [x] (symbols اتقسم) |
| ٣٦ | `glossary/01.js` و `apps/01.js` (105) | [x] (glossary و apps خلصوا واتقسموا) |
| ٣٧ | `real/01-04.js` (40) | [x] (real اتقسم 9 ملفات) |
| ٣٨ | `dsa/01-06.js` (~36) | [x] (dsa خلص كله واتقسم 16 ملف) (فيها تمارين check: ماتقولش الحل) |
| ٣٩ | `dsa/07-11.js` (~30) | [x] |
| ٤٠ | `php/01-05.js` (74) | [x] (php اتقسم 11 ملف؛ images بتاعته اتمسحت) |
| ٤١ | `go/01-07.js` (54) | [x] (go اتقسم 11 ملف؛ golang:1.25 اتمسحت) |
| ٤٢ | `dotnet/01-04.js` (55) | [x] (dotnet اتقسم 16 ملف؛ images الـ .NET اتمسحت) |
| ٤٣ | `spring/01-04.js` (58) | [x] (spring اتقسم 16 ملف؛ image الـ JDK اتمسحت) |
| ٤٤ | `angular/01-03.js` (51) | [x] (angular اتقسم) |
| ٤٥ | `rn/01-04.js` (56) | [x] (rn اتقسم) |
| ٤٦ | `flutter/01-05.js` (61) | [x] (flutter اتقسم؛ dart:stable اتمسحت؛ image الـ flutter فيها Android SDK 36 فسايبينها لدروس Kotlin/Android وتتمسح بعدها) |
| ٤٧ | `kotlin/01-06.js` (56) | [x] (kotlin اتقسم؛ images الـ flutter و JDK اتمسحت. متابعة: دروس في kotlin بتقول compileSdk 36 مع activity-compose 1.13.0 ممكن تحتاج 37) |
| ٤٨ | `swift/01-05.js` (49) | [x] (swift اتقسم؛ swift:latest اتمسحت. «VStack و HStack و ZStack» و «التوقيع و provisioning» من الـ docs بس: محتاجين ماك) |
| ٤٩ | `cpp/01-06.js` (54) | [x] (cpp اتقسم؛ gcc:14 اتمسحت) |
| ٥٠ | `apis/01-04.js` (44) | [x] (apis اتقسم) |
| ٥١ | `cloud/01-04.js` (74) | [x] (cloud اتقسم؛ اتجرب على LocalStack و Terraform و Jaeger و Prometheus، و RDS/ECS/CloudFront من الـ docs) |
| ٥٢ | `arch/01-06.js` (87) | [x] (arch اتقسم؛ الـ 5 ثغرات اتصلحت) |
| ٥٣ | `sweng/01-03.js` و `ai/01-03.js` (73) | [ ] |
| ٥٤ | `interview/01-03.js` و `projects/01-03.js` (~75) | [x] |
| ٥٥ | `projects/04-07.js` (~21) | [x] (projects اتقسم؛ open redirect و race الطلبات و reconnect الـ LISTEN اتصلحوا) |
| ٥٦ | `career/01-02.js` و `english/01-04.js` (89) | [x] (career و english اتقسموا؛ ملاحظة git identity اتضافت) |
| ٥٧ | `speak/01-03.js` (58) | [x] (speak اتقسم؛ IPA اتصلح لـ idempotent و query) |

- **من الدفعة ١٨ (Python واللغات والفريموركات):** أرقام الملفات اتحسبت يوم ٦ أكتوبر قبل أي resplit، فلو التاب اتقسم هات الأرقام بـ `node tools/lesson.js`. TypeScript 7 بقى الـ latest و typescript-eslint لسه مش بيدعمه (ثبّت `typescript@6` لما الدرس يستخدم typescript-eslint). وفي الدروس اللي فيها تمرين بيتصحح لوحده (`check`) الشرح مايقولش حل التمرين.
- **التكلفة:** كل مساعد حوالي 230 ألف توكن، يعني الدفعة حوالي 700 ألف.
- **إزاي تعرف الدروس اللي فاضلها شرح في تاب:** `node -e` مش لازم؛ `node tools/lesson.js` بيطبع لكل تاب «شرح خطوة بخطوة: X/Y».
- **عشان تبدأ في جلسة جديدة،** اكتب: «كمّل جدول الشرح خطوة بخطوة من أول دفعة مش متعلّم عليها في PLAN.md».
- **الرسالة اللي بتتبعت لكل مساعد:** «Follow tools/teach-brief.md exactly. Your file: js/tabs/<tab>/<NN>.js».

### ١. مراجعة الدروس اللي اتكتبت من غير ما تتجرّب

نفس طريقة مراجعة «ابدأ من هنا»:

- كل أمر يتشغّل فعلًا: لينكس في `docker run --rm ubuntu:24.04`، وويندوز في PowerShell 7 و 5.1 و CMD.
- أي أمر مش شغال على ويندوز يتقال صراحة، ويتحط مكانه أمر ويندوز اتجرّب.
- أي ناتج في `sol` يبقى الناتج الحقيقي.

اللي فاضل بالظبط: `node tools/verify.js` (الملخص) و `node tools/verify.js todo <التاب>` (الدروس ومكانها). وبعد ما تجرّب دروس بجد: `node tools/verify.js mark <التاب> "<الدرس>" --on "<اتجرّب فين>"`.

الترتيب:

- [x] دروس السكربتات في bash و PowerShell و CMD و zsh (من `b346cf4`).
- [x] Python (59 درس، منهم 36 أتمتة).
- [ ] Go و C++ و Kotlin و Swift. الـ commit بيقول الأمثلة اتشغّلت في Docker، بس محدش راجعها هنا.
- [ ] درس `git-backup.bat` في تاب CMD لسه متراجعش.
- [ ] الشرح المختصر اللي اتعاد كتابته في: vps، و git، و pg، و sec، و docker، و node، و gha، و wsl.
- [ ] باقي التابات القديمة، تاب تاب.

### ٢. دروس مكتوبة من الـ docs لأنها متجرّبتش

كل `sol` في الدروس دي بيقول إنه من الـ docs. نجرّبها لما يبقى فيه الجهاز المناسب.

- [ ] **محتاجة حساب AWS (٨ أكتوبر):** cloud «aws rds create-db-instance» و «RDS snapshots و PITR» و «RDS من جهازك» اتشرحوا من الـ docs (LocalStack المجاني مفيهوش RDS)، ومش متعلّم عليهم.
- [x] **محتاجة Android SDK (٧ أكتوبر، اتجربت ٨ أكتوبر بـ image الـ flutter):** دروس kotlin «مشروع Android» و «Gradle و libs.versions.toml» و «AndroidManifest و res» و «Activity و lifecycle» اتشرحت من الـ docs ومش متعلّم عليها. ممكن تتجرب بـ `ghcr.io/cirruslabs/flutter:stable` (اتضح إن فيها Android SDK 36 و Gradle و Java 21).
- [x] **محتاجة toolchains مش متسطبة (٧ أكتوبر، اتجربت كلها في Docker نفس اليوم ما عدا AAPT2):** files «.java و .class و .jar» و «.c و .h و .cpp و .o» و «.go و go.mod» و «.php» و «.swift و .dart و .rs و .rb» و «pom.xml و build.gradle» و «AndroidManifest.xml و strings.xml» و «.csproj و .sln و appsettings.json»: الشرح اتكتب من الـ docs ومش متعلّم عليها في verified.json. تتجرب لما نوافق على images زي `eclipse-temurin` و `gcc` و `golang` و `php` و `rust` (ونفس القرار هيلزم لتابات اللغات: php و go و dotnet و spring و kotlin و swift و cpp و flutter). **القرار (٧ أكتوبر): وافقت تنزّل الـ images الرسمية لكل لغة، وتمسحها (docker rmi للـ tags اللي نزلت بس) بعد ما التاب يخلص.** وكيل كل تاب لغة: ينزّل الـ image اللي محتاجها، ويكتب في تقريره أسماء الـ images اللي نزّلها عشان القائد يمسحها بعد التاب.

- [ ] **محتاجة ماك:** دروس zsh:
  - `pmset` و `say` و `osascript`.
  - `dscl و sysadminctl` و `dseditgroup` و `chmod +a` و `xattr و quarantine` و `socketfilterfw` و `fdesetup و profiles`.
  - `networksetup` و `dns-sd و arp -a` و `Remote Login و Screen Sharing`.
  - `diskutil` و `softwareupdate` و `tmutil` و `system_profiler و ioreg`.
  - دروس Homebrew، و `open`، و `pbcopy`، و `mdfind`، و `caffeinate`، و `defaults`، و `networkQuality`، و `launchd plist` و `launchctl`.
- [ ] **محتاجة ويندوز بإعدادات عادية:** الجهاز اللي اتجرّب عليه مفعّل «Beta: UTF-8» (الـ code page 65001)، فأي كلام عن الترميز (العربي في ملفات من غير BOM في 5.1، و cp1252/cp1256 في Python) محتاج يتجرّب على ويندوز من غير الإعداد ده.
- [ ] `netsh wlan show profile ... key=clear` متشغّلش (بيطبع باسوردات الواي فاي).
- [ ] شاشات الـ debugger في VS Code في درس `debugpy و launch.json` من الـ docs.
- [ ] **محتاجة Admin أو بتغيّر الجهاز (ويندوز):**
  - إضافة يوزر أو مسحه (`net user /add` و `New-LocalUser`).
  - الفايروول، و IP ثابت، و DNS.
  - `diskpart` و `Format-Volume`.
  - BitLocker، و restore points، و OpenSSH Server.
  - `sfc` و `DISM` و `chkdsk`.
  - `shutdown`.

  محتاجين جهاز تجارب أو VM. Windows Sandbox مش موجود في Home.

### ٣. تكبير التابات الصغيرة

- [x] sshc (9)، و wsl (14)، و apps (15)، و mongo (23)، و gha (24)، و diag (28)، و nginx (28). (اتكبّروا في دفعة ٢٨ أكتوبر)
- قبل أي دفعة: دوّر على المواضيع المهمة الناقصة في التاب واللي حواليه، وضيفها مع الطلب.

### ٣ج. دفعة المحتوى الجديد (٢٧ أكتوبر، بقرارك «ضيفهم كلهم»)

الدفعة الأولى (خلصت ٢٨ أكتوبر، كل الدروس اتجربت واتسجلت في verified.json، والصور اللي اتسحبت اتمسحت):
- [x] net و re: تجربة الـ 22 درس اللي اتكتبوا النهارده + net/05 (subnetting، ARP و DHCP، IPv6، tcpdump و Wireshark، WireGuard) + re/02 (المستوى التاني على تطبيقك بس). اتعمل: الـ 22 درس اتجربوا واتصلح فيهم curl.exe في PS 5.1 و example.com على Cloudflare و MTU و smali apktool 3، و net/05 فيه 11 درس. re/02 اتكتب بعدين من ناحية الدفاع (٢٨ أكتوبر): 11 درس (الأسرار في الـ APK، وتقفيل المانيفست، و R8 و retrace، و network security config والـ pinning، والكلاينت مش مضمون، و Play Integrity، و Keystore)، واتغيّر وصف المستوى ٢ و ٣
- [x] ai/07: MCP، و agents و tool use، و Claude Code و Cursor، و Ollama محلي، و evals. اتعمل: 18 درس في 4 أقسام. وبعدها ai/11: صور و PDF للموديل (5 دروس). متابعة: SDK 1.3.0 بيبعت المفتاح Authorization: Bearer، ودرس «@anthropic-ai/sdk» في ai/02 لسه بيقول x-api-key (اتجرّب على 0.132): يتراجع
- [x] تاب جديد pydata: Jupyter و numpy و pandas والرسوم و scikit-learn و scraping. اتعمل: 29 درس في 9 أقسام (pandas 3.1، scikit-learn 1.9، polars و DuckDB)
- [x] تاب جديد vue: Vue 3 و Router و Pinia والاختبارات و Nuxt ومقارنة Svelte. اتعمل: 42 درس في 11 قسم (Vue 3.5.44، Nuxt 4.6.3)
- [x] apis/12 و arch/15: RabbitMQ و Kafka، و Meilisearch و Elasticsearch، و outbox، و microservices. اتعمل: 13 درس في apis (RabbitMQ و Kafka و CDC و Meilisearch و Elasticsearch) و 8 في arch (microservices و saga و tracing)
- [x] node/09 و quality/07 و js/20: Bun و Deno و Hono، و Biome، و Web Components و WebAssembly. اتعمل: 14 درس في node و 6 في quality (Biome و knip) و 9 في js

الدفعة التانية (خلصت ٢٨ أكتوبر):
- [x] gha (reusable workflows، environments، matrix) و wsl و sshc. اتعمل: 9 دروس gha (workflow_call و composite و act و actionlint و zizmor و script injection) و 7 wsl و 7 sshc (SOCKS والشهادات و ssh-audit و FIDO2)
- [x] mongo (aggregation أعمق) و apps (Tauri). اتعمل: 10 دروس mongo (aggregate متقدم و explain و replica set و change streams على mongo 8) و 6 apps (Tauri 2 والمقارنة مع Electron والتحديث الموقّع)
- [x] pyapi (Django و Flask) و python (scraping بسيط لو مش في pydata). اتعمل: 17 درس (Django 6.1 و DRF و pytest-django و Flask 3.1 ومقارنة الـ 3). الـ scraping اتغطى في pydata
- [x] vps: SELinux و AppArmor و Ansible. اتعمل: 15 درس (Ansible 6، و AppArmor و SELinux 5 على Docker Desktop اللي الاتنين مقفولين فيه فجزء من الدوكس، و logrotate و journald و sysctl و LimitNOFILE)
- [x] nginx و diag. اتعمل: 8 دروس nginx (كاش الـ proxy وتوزيع الحمل و map و auth_request و error_page) و 6 في diag (strace و cpu-prof و تسريب الذاكرة و EMFILE و iowait و exit codes)
- [x] إصلاحات «٤ج» + التمارين اللي بتكشف حلها
- [x] ترتيب المذاكرة في index.html للتابات الجديدة (vue و pydata و net و re)

### ٣د. دفعة المواضيع الناقصة (٢٨ أكتوبر، بقرارك)

- [x] cloud/15: Kubernetes أعمق (kind محلي، Service و Ingress، probes، resources و HPA، rolling update و rollback، Helm). اتعمل: 8 دروس على cluster حقيقي (kind 0.33 و k8s 1.37 و Helm 4.3). ملاحظة: ingress-nginx بقى archived، والدرس بيقول كده وبيشاور على Gateway API
- [x] cloud/16: Firebase (Emulator Suite محلي: Auth و Firestore و rules و Functions و Storage). اتعمل: 7 دروس (firebase-tools 15.34، كله على الـ emulator من غير login؛ FCM و deploy من الـ docs)
- [x] apis/15: WebSockets (سيرفر و reconnect و scaling) و GraphQL (schema و resolvers و N+1 و DataLoader). اتعمل: 11 درس (ws 8.22 و graphql-yoga 6)، واتصلح درس «auth في resolvers»: graphql-yoga 6 شالت createGraphQLError
- [x] diag/05: Prometheus و Grafana (metrics من Node، node_exporter، PromQL، alerts). اتعمل: 6 دروس (Prometheus 3.15 و Alertmanager 0.34 و Grafana 13.3، التنبيهات اشتغلت فعلًا)
- [x] react/15: Storybook. اتعمل: 5 دروس (init و controls و decorators و addon-vitest و addon-a11y، Storybook 10.6)

بعدها: مراجعة بعين المبتدئ لدروس المستوى الأول في بداية الطريق.

### ٣هـ. دفعة «اعمل حاجة بإيدك» (٢٨ أكتوبر، بطلبك) — الترمنال خلص، والباقي في الجدول

**طلبك بالنص:** دروس الترمنال فيها تعقيد، وناقصها «أعمل مهمة حقيقية إزاي» (أمرين مع بعض، سكربت يقفل الجهاز بعد وقت، الصلاحيات)، و«الاختصارات والـ help ده بيعمل إيه»، و«مشاريع متدرّجة تتبني قدامي خطوة خطوة زي ما بتعمل انت». والبداية PowerShell، بعدها bash، بعدها CMD، وبعد كده **على كل التابات**.

**اللي اتكشف في المراجعة:** الأوامر نفسها كلها موجودة ومشروحة كويس (`shutdown /s /t` و `schtasks` و `icacls` و `Get-Help` و `chmod` و `&&` في bash و CMD). الناقص مش أوامر — الناقص **الطريقة** و**الربط** و**البناء التدريجي**.

#### جدول الشغل

| # | التاب | الشغل | عدد الدروس | الحالة |
|---|---|---|---|---|
| ١ | ps | `ps/20.js` قسم «توصل للأمر بنفسك» | ٨ | [x] |
| ٢ | ps | `ps/21.js` قسم «أوامر ورا بعض» (`;` `&&` `\|\|` `$?` `( )` `-and`) | ٤ | [x] |
| ٣ | ps | `ps/22.js` مشروع ١: `pc.ps1` (قفل/restart بمهلة + إلغاء + حالة) | ٦ | [x] |
| ٤ | ps | `ps/23.js` مشروع ٢: `task.ps1` (JSON + objects + اختبارات) | ٦ | [x] |
| ٥ | bash | `bash/29.js` قسم «توصل للأمر بنفسك» | ٥ | [x] |
| ٦ | cmd | `cmd/13.js` قسم «توصل للأمر بنفسك» | ٣ | [x] |
| ٧ | bash | `bash/30.js` مشروع: `perm.sh` (فحص وإصلاح الصلاحيات) | ٥ | [x] |
| ٧ب | الموقع كله | **شكل العرض الجديد**: خريطة الوحدة بدل القايمة الطويلة، وقارئ درس واحد بسابق/تالي، وعمودين جانبيين (قايمة الوحدة يمين، فهرس الدرس شمال)، و«تستخدمها فين؟» لكل درس، ومشاريع آخر كل قسم | — | [x] |
| ٨ | ps | `ps/24.js` مشروع ٣: من سكربت لموديول — `.psm1` و `.psd1`، و comment-based help عشان `Get-Help <أمرك>` يشتغل، و `ArgumentCompleter`، والتسطيب في `PSModulePath` | ٥ | [x] |
| ٩ | ps | مشروع ٤: مراقبة — فحص دوري + لوج بيتقلّم + إشعار + `Register-ScheduledTask` (و `-Force` ضرورية) | ~٥ | [ ] |
| ١٠ | ps | مشروع ٥: `setup-dev.ps1` idempotent — `winget` من ملف، و `git config`، وفحص قبل وبعد، وجدول ملخص | ~٥ | [ ] |
| ١١ | bash | مشروع ٢ (أقوى): سكربت نشر أو إدارة خدمة — `trap` و `mktemp` و rollback و `systemd` | ~٥ | [ ] |
| ١٢ | cmd | مشروع batch متدرّج واحد (`setlocal` و `for /f` و `errorlevel` ومتى تنادي PowerShell) | ~٤ | [ ] |
| ١٣ | git | «الطريقة» (`git help -a`, `git <cmd> -h`, `--dry-run`) + مشروع متدرّج | ~٨ | [ ] |
| ١٤ | docker | نفس الفكرة | ~٨ | [ ] |
| ١٥ | node | نفس الفكرة | ~٨ | [ ] |
| ١٦ | python | نفس الفكرة | ~٨ | [ ] |
| ١٧ | js | نفس الفكرة | ~٨ | [ ] |

**ابدأ من أول صف مش متعلّم عليه.** الصفوف ١-٨ خلصت كلها واتجربت واتسجلت في `verified.json`.

#### شكل العرض الجديد (٢٨ أكتوبر، بعد صفحة التيست) — اتطبّق على الموقع كله

بعد ما اتفقنا على `test.html`، الفورمات اتنقل للموقع الحقيقي. المحتوى زي ما هو؛ اللي اتغيّر العرض بس:

- **الخريطة بدل القايمة.** `#list` بقى يعرض لكل قسم جدول مضغوط (`#` / الدرس / هتتعلم إيه / النتيجة العملية). كل صف كله زرار: دوسة = الدرس يفتح لوحده.
- **قارئ درس واحد.** `renderReader()` في `js/app.js`: شريط فيه اسم القسم و«الدرس ٣ من ٨»، الدرس، وبعده سابق/تالي. والسهم شمال = الجاي (الصفحة RTL)، و Escape = رجوع للخريطة.
- **عمودين جانبيين في `index.html`:** `#unitnav` يمين (الأقسام في الخريطة، ودروس الوحدة في القارئ)، و `#toc` شمال (عناوين الدرس المفتوح مع تمييز اللي انت فيه بـ IntersectionObserver). بيختفوا تحت 1560px و 1150px.
- **الـ hash بقى `#<tab>/<cmd>`** (`hashSet()` و `hashParse()`)، فالدرس نفسه بقى لينك يتبعت ويتحفظ.
- **البحث بيرجّع للخريطة** مفلترة، مش قايمة كروت كاملة.

#### حقول جديدة اختيارية (التابات اللي مفيهاش الحقول دي بتشتغل زي ما هي)

| الحقل | مكانه | بيعمل إيه |
|---|---|---|
| `time` | القسم | «حوالي ساعة ونص» جنب عدد الدروس |
| `goal` | القسم | قايمة «هتقدر تعمل إيه لما تخلص» |
| `use` | القسم | `{prog, net, cs, work}` — «وهتستخدمها فين؟» |
| `lab` | القسم | كود تجهيز المعمل تحت الجدول |
| `projects` | القسم | `[{t, what}]` — مشاريع آخر القسم |
| `learn` | الدرس | عمود «هتتعلم إيه» (لو مفيش، أول جملة من `desc`) |
| `out` | الدرس | عمود «النتيجة العملية» (العمود بيظهر لو درس واحد على الأقل فيه) |
| `use` | الدرس | `{prog, net, cs, work, scen}` — كروت «تستخدمها فين؟» جوه الدرس |

بتتسجّل في `js/core.js` في `USE` و `CARD` وفي الـ category object.

**اتعمل لحد دلوقتي:** `ps/20` و `ps/21` و `ps/22` و `ps/23` (٢٤ درس) كلهم فيهم `learn` و `out` و `use`، والأربع أقسام فيهم `goal` و `use` و `lab` و `projects` و `time`.

**الباقي:** باقي أقسام ps، وبعدها bash و cmd، وبعدها التابات التانية. أي دفعة محتوى جديدة تتكتب بالحقول دي من الأول.

#### الأسلوب اللي اتفقنا عليه في الدفعة دي (اتبعه في الصفوف الجاية)

1. **قسم «توصل للأمر بنفسك» لكل أداة:** الدورة من مهمة لأمر، وأدوات البحث (`Get-Command` / `man -k` / `help`)، وقراية سطر الاستخدام، والمعاينة قبل التنفيذ، وقراية رسالة الخطأ.
2. **المشروع بيتبني خطوة خطوة، مش سكربت جاهز.** كل درس = خطوة واحدة بتضيف حاجة واحدة، بتتشغّل، وناتجها الحقيقي في الدرس. و`ps/19` و`bash/26` فيهم السكربتات الجاهزة؛ المشاريع حاجة تانية.
3. **الترتيب داخل المشروع:** الواجهة قبل الكود ← التحقق من المدخلات ← الوظايف الآمنة ← الوظيفة الخطرة ومعاها شبكة الأمان في نفس الخطوة ← اللوج وأكواد الخروج ← التوزيع/الجدولة ← الاختبارات.
4. **الباگات اللي بتقع فيها وانت بتبني تتساب في الدرس** بناتجها الحقيقي، مش تتخبّى. دي أغلى حتة في المشروع.
5. **الوضع الآمن هو الافتراضي:** `-WhatIf` و `--fix` صريحة، مش العكس.
6. **الأداة بترجّع objects مش نصوص** (في PowerShell)، وأكواد خروج معبّرة في كل الأصداف.

#### اكتشافات من التجربة اتحطّت في الدروس

- `&&` **بتشتغل** جوه `if` في PowerShell 7 وبتدّي نتيجة **غلط** من غير أي تنبيه: `if (($a -gt 50) && ($b -lt 3))` بتدخل، و `-and` مبتدخلش. السبب إن الناتج بيبقى قايمة من عنصرين، و`if` بيعتبر أي قايمة فيها عناصر `True`.
- `if ($a > 5)` بتعمل ملف اسمه `5` ومبتطبعش حاجة (الشرط بيبقى `False`).
- `-ErrorAction SilentlyContinue` و `Ignore` الاتنين بيخلّوا `$?` = False وبيوقّفوا `&&`؛ الفرق إن `Ignore` مبيسجّلش في `$Error`.
- `about_*` على جهاز من غير `Update-Help` بيطلّع ٥ مواضيع بس، كلهم من Pester.
- `Get-Alias '?'` بيطلّع كل الاختصارات اللي طولها حرف واحد، لأن `?` wildcard.
- جوه سكربت فيه `SupportsShouldProcess`، الـ cmdlets الداخلية (اللوج وملف الحالة) بترث `-WhatIf`، فالمعاينة بتطلّع سطور زيادة واللوج مبيتكتبش. الحل `-WhatIf:$false` عليها.
- `ShouldContinue` بترمي error في الجلسات غير التفاعلية، فـ `-Force` ضرورية لأي مهمة مجدولة.
- دالة PowerShell **بتفرد القايمة اللي فيها عنصر واحد** وهي بترجّعها، فـ `$tasks + $task` رمت `does not contain a method named 'op_Addition'`. الحل `@($tasks) + $task` **عند الاستخدام**.
- `$PSBoundParameters` جوه دالة هو بتاع **الدالة**، فـ `-Due` كانت بتضيع **في صمت**. الحل `$DueSet` في مستوى السكربت.
- في bash: `find | mapfile` و `find | while read` بيموتوا في شيل فرعي؛ الحل `mapfile -t a < <(find ...)`.
- Pester المتسطب مع ويندوز نسخة 3.4.0 (صيغة قديمة)، و 5 محتاجة `Install-Module`.

#### اكتشافات من تشغيل مشروع ٣ (الموديول)

- `#>` **بيتعدّ كتعليق** في `exampleLines`، فمش بياخد سطر في `lines` (زي `#!/usr/bin/env bash`). أما `<#` و `.SYNOPSIS` فبيتعدّوا عادي.
- فعل مش معتمد (`Cancel-`) بيخلي `Import-Module` يطلّع `WARNING: ... include unapproved verbs ...` — الموديول بيشتغل بس اللي بيدوّر مش هيلاقيه.
- `Import-Module` تاني بعد ما تعدّل الملف **بيرجّع النسخة القديمة من غير أي تنبيه**؛ لازم `-Force` أو `Remove-Module`. اتجرّب وطلع: «أول مرة: النسخة الأولى / بعد التعديل: النسخة الأولى / بـ -Force: النسخة التانية».
- `TabExpansion2 -inputScript <line> -cursorColumn <n>` بتختبر الـ `ArgumentCompleter` من سكربت من غير ما تدوس Tab — مفيدة في الاختبارات.
- `Get-Command <اسم> -ErrorAction SilentlyContinue` لما ميلاقيش بيخلي كود خروج العملية 1 حتى لو الناتج صح.
- اختبار `PSModulePath` من غير ما تلمس جهاز المستخدم: `$env:PSModulePath = "<فولدر>" + [IO.Path]::PathSeparator + $env:PSModulePath` — بيضيع مع النافذة، والـ autoloading بيشتغل عليه عادي.

#### فخاخ الأدوات اللي اتكشفت (مهمة لأي جلسة جاية)

- **`tools/check.js` بيعدّ `[[`/`]]` عدّ أعمى.** اتصلح جزئيًا: `noFence()` بقت بتستثني صناديق `~~~` في `teach` و `deep` و `sol`. **اللي لسه:** نوع المصفوفة `[object[]]` في `example` بيكسر العدّ (`]]` من غير `[[`) — استخدمنا `[array]`. ونفس المشكلة مع `[[[[:]x]]]` و `[[help "[["]]`؛ اكتبهم بالكلام بدل كود. الحل الجذري إن `brackets()` تستخدم نفس regex بتاع `fmt()` في `app.js`، بس ده محتاج فحص على كل الدروس.
- **`${` في ملفات الدروس لازم تتكتب `$__{`**، والـ backtick `$__bt`. غلطة متكررة وبتطلّع «Missing } in template expression» أو «Unexpected identifier».
- **`#!/usr/bin/env bash` بيتعدّ كتعليق** في `exampleLines`، فمش بياخد سطر في `lines`.
- **`dist/` لازم يتبني من worktree على جهاز صاحب المشروع** (مكتوب في القواعد تحت): شجرة العمل CRLF والـ CI بيبني LF.
- **`css/style.css` فيه `table{min-width:760px}` لكل جدول (اتكشف ٢٨ أكتوبر).** جداول الموقع شغالة بس لأنها ملفوفة في `.tbl` بـ `overflow-x:auto`. أي تخطيط جديد بأعمدة جانبية لازم يلغي الحد ده (`min-width:0` + `table-layout:fixed`) وإلا الجدول بيدفع الصفحة وتعمل سكرول أفقي والعمود الجانبي يتقطع.
- **صورة `ubuntu:24.04` فيها `man` stub** وبتمسح `/usr/share/man`. لتشغيل man حقيقي: امسح `/etc/dpkg/dpkg.cfg.d/excludes`، و `apt-get install --reinstall man-db manpages`، و `dpkg-divert --rename --remove /usr/bin/man`، و `mandb`.

### ٤. تمارين بتتصحح لوحدها في تابات أكتر

- [ ] TypeScript: ممكن تتحوّل JS وتشتغل على نفس المحرك من غير مكتبة كبيرة.
- [ ] Python: محتاج Pyodide، وحجمه كبير. القرار لسه متاخدش.
- [x] **تمارين حلها ظاهر قبل ما تحاول (لقيتها ٧ أكتوبر):** في 17 تمرين من 154 الـ `check.solution` (أو أغلبه) مكتوب في الأجزاء اللي بتظهر على طول (المثال أو الشرح)، مش في الحل المستخبي. الكامل: data «WHERE» و «HAVING» و «LEFT JOIN» و «EXISTS». ووكلاء الشرح لقوا كمان: dsa «monotonic stack» و «merge sort» و «search insert position» و «lower bound» و «binary search on answer» و «fast/slow pointers» و «sort comparator» (المثال أو نص «جرّب» قريب جدًا من الحل)، dsa «first unique (count + scan)» (نسخة الـ Map في المثال بتعدّي 3 tests من 6)، وdsa «group anagrams (key)» (مفتاح الـ sort في المثال بيعدّي كل الـ tests لأنها مش بتفرض مفتاح العدّ)، symbols «d  w  [ ]  ( )  {n}  |» (regex الموبايل في المثال هو الحل بالظبط)، و data «$queryRaw» (المثال هو الحل بتاريخ ثابت بدل المتغير) و «relation filters» (المثال + الحل المكتوب بيدّوا الإجابة). شبه كامل: data «ORDER BY و LIMIT» و «ON CONFLICT»، js «تمرين sumDigits» و «class» و «EventEmitter»، dsa «anagram (char count)» و «group anagrams (key)» و «queue و deque» و «lower bound (first/last)» و «search insert position» و «fast/slow pointers» و «merge (dummy head)» و «combination sum». **ملاحظة أكبر (٧ أكتوبر):** في DSA الـ solCode المستخبي ورا زرار «الحل» بتاع «جرّب» بيعدّي كل tests التمرين في أغلب الدروس (10 من 11 في dsa/06-07، ونفس الفكرة في 02). يعني اللي بيفتح حل «جرّب» بياخد حل التمرين. **اتحل (٧ أكتوبر، بقرارك):** حل «جرّب» بقى مقفول في أي درس فيه تمرين بيتصحح لوحده، لحد ما التمرين يعدّي أو الطالب يدوس «افتح الحل برضه» (`solHTML`/`solUnlock` في app.js، والمفتاح `reveal:` بيتحفظ في الباك أب). الحل: نغيّر المطلوب في التمرين (أعمدة أو شرط أو جدول تاني) بحيث المثال يعلّم الفكرة والتمرين يطلب تطبيقها بشكل مختلف، ونحدّث الـ tests والـ solution. في dsa المثال هو الـ pattern نفسه فالتشابه طبيعي جزئيًا: راجع كل واحد بعينك. ابعت كل تاب لوكيل واحد بعد ما شرح التاب يخلص. سكربت الفحص اتكتب في scratchpad الجلسة (leak.js)؛ الأحسن نضيفه تنبيه في `tools/check.js`. **اتصلح (٢٧ أكتوبر):** فحص كل الـ 154 تمرين (الحل مقابل المثال والشرح و«جرّب»، والمثال نفسه بيتشغّل كإجابة) لقى 26 تمرين حلها ظاهر أو شبه ظاهر، واتغيّر المطلوب فيهم: data ‏11 (WHERE و HAVING و ORDER BY و LIMIT و INNER JOIN و LEFT JOIN و EXISTS و WITH و GROUP BY و ON CONFLICT و keyset pagination و $queryRaw)، dsa ‏10 (monotonic stack و search insert position و merge sort و first unique و group anagrams و fast/slow و anagram و queue و deque و lower bound و combination sum)، symbols ‏2 (regex و =>)، js ‏2 (class و EventEmitter)، files ‏1 (JSON غلط). كل حل جديد بيعدّي اختباراته، والمثال لو اتنسخ زي ما هو (أو الـ starter أو الحل القديم المكشوف) بيقع. اتسابوا بعد مراجعة بالعين لأن المطلوب فيهم تطبيق مش نسخ: relation filters و binary search on answer و sort comparator و merge (dummy head) و min stack و sumDigits و count و sum و avg.

### ٤ب. ثغرات في كود دروس arch لسه مااتصلحتش (٨ أكتوبر)

وكيل arch/03-04 لقاها وكتبها في الشرح بس من غير ما يغيّر الكود:
- [x] `resolveTenant` (byDomain) بيقبل دومين مش متأكد منه: لازم فلتر `domainVerifiedAt`. (اتصلح: `tenantLookup.byDomain` بشرط `domainVerifiedAt: { not: null }`)
- [x] `forTenant` مش بيغطي `$queryRaw`، و nested write على `Workspace` ممكن يعمل project في workspace تاني. (اتصلح: `noRaw` للـ 4 دوال الخام، و `Workspace` بـ `AND: [{ id: tenantId }]`)
- [x] بحث Prisma `contains` مش بيعمل escape لـ `%` و `_`. (اتصلح: دالة `like()`)
- [x] الكاش من Redis بيرجّع التواريخ strings. (اتصلح: `JSON.parse(hit, reviveDates)`)
- [x] `trust proxy 1` من غير proxy قدامه: header ‏`X-Forwarded-For` مزيف بيعدّي الـ rate limit. (اتصلح: `"loopback"`)

### ٤ج. متابعات من arch (٨ أكتوبر)

- [x] Sentry v11 من غير `dataCollection` بيبعت قيمة كوكي الـ refresh token في `request.cookies` (درس Sentry في arch). محتاج يتضاف للمثال. (اتصلح: `dataCollection` + `beforeSend` بيشيل `cookies` و header الـ `cookie` و `authorization`، واتجرّب بـ SDK 11.9.0 على ingest وهمي: من غيره التوكن كان في الخطأ وفي الـ trace)
- [x] presigned URLs من aws-sdk الحالي فيها `x-amz-checksum-crc32` لجسم فاضي، و S3 الحقيقي ممكن يرفضها. الحل `requestChecksumCalculation: "WHEN_REQUIRED"`. يأثر على «signed upload URL» في arch و cloud. (اتصلح: الخيار في المثالين، واتجرّب بـ SDK 3.1158.0 على MinIO: الرابط من غير checksum والرفع 200، ونفس الـ checksum كـ header بيترفض `XAmzContentChecksumMismatch`)

- [x] مشروع ٧ (AI): الحد اليومي count-then-insert مش atomic نظريًا (١٠ طلبات متوازية معدّتوش في ٣ جولات). ممكن يتحول لـ advisory lock زي الـ order. (اتصلح: `pg_advisory_xact_lock` في transaction؛ ٢٠ طلب متوازي من ٢٥: القديم وصل ٤٥، و INSERT…SELECT الشرطي ٣٥–٣٩، والقفل ٣٠ بالظبط في ٥ جولات)

### ٥. أسئلة مفتوحة

- [ ] `df -h ~` فشل عند صاحب المشروع. ده اتجرّب في Git Bash و PowerShell و CMD على نفس الجهاز واشتغل. محتاجين نعرف اتشغّل فين بالظبط.
- [ ] **حاجات لقيناها على جهاز صاحب المشروع.** دي مش شغل في المشروع، بس اتفقنا نفتكرها، ومحدش يغيّرها من غير ما يسأله:
  - Tamper Protection مقفولة في Windows Defender.
  - Node.js و Python مسموح لهم يستقبلوا اتصالات على الشبكات العامة.
  - DNS بتاع IPv6 بيروح للراوتر، فبيعدّي فلترة AdGuard.
  - سطر قديم في ملف hosts بتاع `host.docker.internal`.

## القواعد اللي اتفقنا عليها

1. **أي أمر يتكتب في درس لازم يتشغّل الأول على النظام اللي القارئ هيستخدمه.** ولو مينفعش يتشغّل (ماك، أو Admin، أو بيمسح حاجة)، الـ `sol` يقول صراحة إنه من الـ docs الرسمية.
2. **الأوامر اللي بتختلف حسب النظام تتقسم بسطر تعليق فيه اسم النظام بس، وآخره `:`.** الصفحة بتعمل لكل واحد صندوق لوحده:

   ```text
   # Linux (and WSL):
   # Linux و Mac:
   # Windows (PowerShell):
   # Windows (CMD):
   # Git Bash:
   # Mac:
   ```

   - الأمر اللي مش موجود على ويندوز (حتى في Git Bash) يتقال صراحة في `desc`.
   - المثال اللي فيه صناديق متقسمة ميتحطلوش `flag: "script"`، لأن الـ script مبيتقسمش.
3. **قبل أي دفعة دروس:** راجع التابات اللي ليها علاقة، وضيف المواضيع المهمة الناقصة من غير ما حد يطلبها.
4. **شكل الدرس:**
   - `desc`: أول فقرة ملخص، وبعدها كل flag ورمز يتشرح.
   - `example` و `try`.
   - `deep`: الأربعة (why و how و when و mistakes).
   - `lines`: سطر لكل سطر أمر.
   - `sol` بالناتج الحقيقي، و `solCode` لو فيه كود.
   - `flag: "danger"` لأي حاجة خطر.
   - اسم الدرس (`cmd`) ميتغيّرش، لأن التقدم محفوظ بيه.
   - التفاصيل في [README.md](README.md).
5. **توفير التوكينز:**
   - المساعدين اللي بيراجعوا ويجرّبوا الأوامر يشتغلوا بالنموذج الأرخص (Sonnet)، والكتابة والمراجعة النهائية بالنموذج الأقوى.
   - مساعدين أقل، وكل واحد لتاب واحد أو جزء منه، ويرجّع تقرير مختصر.
   - ممنوع قراية `dist/` و `vendor/` (القاعدة في `.claude/settings.json`)، وملف التاب ميتقريش كله: دوّر على الدرس واقرا جزءه بس.
   - المتصفح للضرورة بس، و `npm run check` الأول.
   - جلسة لكل مهمة، و `/clear` بين المهام.
6. **بعد أي تعديل:**
   - `npm run check`.
   - زوّد رقم `CACHE` في `sw.js`.
   - `npm run build`.
   - commit و push.
   - اتأكد إن الفحص على GitHub Actions نجح.
   - **`dist/` يتبني من worktree مش في المكان (٢٨ أكتوبر):** شجرة العمل على جهاز صاحب المشروع فيها CRLF (رغم `* text=auto eol=lf`)، فالبناء في المكان بيحشر CRLF في `dist/terminal.html` والـ CI (اللي بيبني من checkout بـ LF) بيفشل بـ «dist is up to date». الطريقة: `git worktree add --detach <tmp> HEAD` و `node tools/build.js` جواه وانسخ `dist/terminal.html` ورا.

## إزاي تكمل في جلسة جديدة

1. `git pull`.
2. اقرا الملف ده.
3. ابدأ بأول بند مش متعلّم عليه في «الشغل الجاي».
4. لما تخلص، حدّث الملف ده، واعمل commit ليه مع الشغل.

**الشغل المفتوح دلوقتي (٢٨ أكتوبر):** الدفعة النشطة هي **«٣هـ. دفعة اعمل حاجة بإيدك»** — فيها جدول مرقّم، والصفوف ١-٧ب خلصت (منهم شكل العرض الجديد، اقرا قسمه قبل أي حاجة). ابدأ من **الصف ٩** (مشروع ٤ في PowerShell: المراقبة والجدولة)، واكتبه بالحقول الجديدة (`learn` و `out` و `use` للدرس، و `goal` و `use` و `lab` و `projects` و `time` للقسم). واقرا «الأسلوب اللي اتفقنا عليه» و «فخاخ الأدوات» في نفس القسم قبل ما تكتب أي درس.
