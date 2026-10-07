// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "الأرشيف والضغط",
      l: 3,
      n: "الفرق بين الأرشيف (يجمع ملفات كتير في ملف) والضغط (يصغّر الحجم)، و .zip و .tar.gz و .7z و .rar و .xz، وإزاي تعملهم وتفكهم من الترمنال على كل نظام",
      items: [
        {
          cmd: ".zip",
          title: "تعمل ملف .zip وتفكه وتشوف جواه إيه من الترمنال إزاي؟",
          desc: R`[[.zip]] أشهر صيغة على الإطلاق: بيجمع ملفات وفولدرات كتير في ملف واحد (أرشيف) ويضغط كل ملف لوحده. ويندوز والماك بيفتحوه من غير أي برنامج إضافي.

حاجات كتير هي zip من جوه بس بامتداد تاني: [[.jar]] و [[.war]] (Java)، و [[.apk]] و [[.aab]] و [[.ipa]] (موبايل)، و [[.docx]] و [[.xlsx]] و [[.pptx]] (Office، درس [[.docx]])، و [[.epub]]، و [[.whl]] (Python)، و [[.vsix]] (إضافات VS Code)، و [[.nupkg]]. كلهم بيبدأوا بـ [[PK]] (اسم مخترع الصيغة)، وتقدر تعمل لهم [[unzip -l]].

من الترمنال:
• [[zip -r project.zip project]]: [[-r]] عشان يدخل الفولدرات. و [[-x "pattern"]] تستثني. و [[-q]] من غير كلام.
• [[unzip -l file.zip]]: شوف جواه إيه من غير ما تفك (اعمل ده دايمًا الأول).
• [[unzip file.zip -d out/]]: فك في فولدر معيّن.
• [[zip -e secret.zip file]]: بباسورد. بس التشفير القديم بتاع zip ضعيف، استخدم [[7z]] بـ AES لو السرية مهمة.
• ويندوز PowerShell: [[Compress-Archive -Path project -DestinationPath project.zip]] و [[Expand-Archive project.zip -DestinationPath out]]. أو كليك يمين ثم [[Send to]] ثم [[Compressed (zipped) folder]].
• الماك: دبل كليك يفك، وكليك يمين ثم Compress يعمل zip. (والماك بيحط جوه الـ zip فولدر [[__MACOSX/]] و [[.DS_Store]] اللي بتظهر لما حد على ويندوز يفكه.)

حاجات لازم تعرفها:
• فك الأرشيف من غير ما تشوفه ممكن يرمي ١٠٠٠ ملف في الفولدر الحالي، أو يكتب فوق ملفاتك. عشان كده [[-l]] الأول و [[-d]] لفولدر جديد.
• zip مبيحافظش على صلاحيات لينكس دايمًا ([[x]] بتضيع ساعات). لو هتنقل لسيرفر لينكس، [[tar]] أحسن.
• الملفات المضغوطة أصلًا (صور JPG و فيديو و zip تاني) مبتصغرش تقريبًا.
• zip bomb: ملف zip صغير بيتفك لجيجات. والـ zip slip: ملف جوه الأرشيف اسمه [[../../.bashrc]] بيكتب بره الفولدر. لو بتفك ملفات جاية من يوزرز في الكود، استخدم مكتبة بتمنع ده.`,
          example: R`zip -r -q project.zip project -x "project/node_modules/*" "project/.env"
unzip -l project.zip
file project.zip
xxd -l 4 project.zip
unzip -q project.zip -d out
ls -A out/project`,
          try: R`اعمل فولدر [[project]] فيه [[src/app.js]] و [[README.md]] و [[.env]] و [[node_modules/x/big.bin]] ونفّذ المثال. شوف [[.env]] و [[node_modules]] راحوا فين. بعدين جرّب [[unzip -l]] على أي [[.jar]] أو [[.docx]] أو [[.vsix]] عندك. على ويندوز جرّب [[Compress-Archive]] و [[Expand-Archive]].`,
          deep: {
            why: R`نقل ١٠٠٠ ملف واحد واحد (إيميل، رفع، تنزيل) بطيء ومتعب، وفيه احتمال ملف يضيع. الأرشيف بيخليهم ملف واحد، والضغط بيصغّر الحجم. و zip بقى المعيار لأنه مدعوم في كل نظام من التسعينات، فالصيغ الجديدة (jar و docx و apk) بنوا عليه بدل ما يخترعوا حاجة.`,
            how: R`الـ zip بيضغط كل ملف لوحده (غالبًا بـ Deflate)، وفي آخر الملف فيه «فهرس» (central directory) فيه أسامي كل الملفات ومكانها. عشان كده [[unzip -l]] سريع (بيقرا الفهرس بس)، وتقدر تفك ملف واحد من غير الباقي. والملفات الصغيرة جدًا بيتخزنوا من غير ضغط ([[compression method=store]]) لأن الضغط هيكبّرها.`,
            when: R`تبعت ملفات لحد على ويندوز أو ماك، أو ترفع مشروع على منصة بتطلب zip (AWS Lambda وبعض الاستضافات)، أو تفحص jar أو docx أو apk من جوه.`,
            mistakes: R`تعمل zip للمشروع ومعاه [[node_modules]] (مئات الميجا) و [[.env]] (أسرار). تفك أرشيف في فولدرك الحالي فيتلخبط بملفاتك. تعتمد على باسورد zip العادي للسرية. وتعمل [[zip project.zip project]] من غير [[-r]] فيطلعلك zip فيه الفولدر فاضي.`
          },
          teach: R`## المثال: نضغط مشروع من غير المكتبات والأسرار

المثال بيعمل zip لفولدر مشروع ويستثني [[node_modules]] و [[.env]]، وبعدين يشوف جواه، ويتأكد إنه zip فعلًا، ويفكه في مكان نضيف. اتشغّل في [[docker run --rm ubuntu:24.04]] (سطّبنا [[zip]] و [[unzip]] و [[file]] و [[xxd]])، على فولدر [[project]] فيه:

~~~text project
project/src/app.js               18 byte
project/README.md                 6 byte
project/.env                     SECRET=123
project/node_modules/x/big.bin   100000 byte (داتا عشوائية)
~~~

---

## ١. [[zip -r -q project.zip project -x "project/node_modules/*" "project/.env"]]

| الحتة | معناها |
|---|---|
| [[zip]] | الأمر |
| [[-r]] | recursive: ادخل الفولدرات اللي جوه الفولدرات |
| [[-q]] | quiet: متطبعش اسم كل ملف وانت بتضيفه |
| [[project.zip]] | اسم الأرشيف اللي هيتعمل. **أول اسم بعد الـ options هو الناتج** |
| [[project]] | اللي هيتضغط |
| [[-x "..." "..."]] | exclude: استثني اللي بيطابق الأنماط دي |
| [[project/node_modules/*]] | أي حاجة جوه [[node_modules]]. والتنصيص [[" "]] مهم: من غيره الـ shell هيحاول يفك الـ [[*]] بنفسه قبل ما [[zip]] يشوفها |

والأمر مبيطبعش حاجة لو نجح (exit code 0).

### ولو نسيت [[-r]]؟

~~~bash
zip project.zip project
~~~

~~~text ناتج unzip -l على الأرشيف ده
        0  2026-10-07 12:23   project/
        0                     1 file
~~~

الفولدر بس، فاضي. [[zip]] من غير [[-r]] بيضيف الاسم اللي ادتهوله ومبيدخلش جواه.

---

## ٢. [[unzip -l project.zip]]

[[-l]] = list: اعرض اللي جواه من غير ما تفك. اعمل ده دايمًا قبل ما تفك أي حاجة:

~~~text الناتج
Archive:  project.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2026-10-07 12:23   project/
        0  2026-10-07 12:23   project/src/
       18  2026-10-07 12:23   project/src/app.js
        6  2026-10-07 12:23   project/README.md
---------                     -------
       24                     4 files
~~~

- [[Length]]: الحجم الأصلي (قبل الضغط). الفولدرات صفر.
- آخر سطر: الإجمالي ([[24]] byte) والعدد ([[4 files]]، والفولدرات بتتعد معاهم).
- [[.env]] و [[node_modules]] مش موجودين: الـ [[-x]] اشتغل.

وللمقارنة، نفس الفولدر من غير [[-x]]: [[100035  8 files]]، والأرشيف 101383 byte بدل 668. الـ 100000 byte العشوائية مضغطتش خالص (الداتا العشوائية مفيهاش تكرار يتضغط)، وده نفس اللي بيحصل مع الصور والفيديو.

---

## ٣. [[file project.zip]]

~~~text الناتج
project.zip: Zip archive data, at least v1.0 to extract, compression method=store
~~~

- [[at least v1.0 to extract]]: أقل نسخة من صيغة zip تقدر تفكه.
- [[compression method=store]]: الملفات **متخزنة من غير ضغط**. الملفات صغيرة جدًا (18 و 6 byte)، والضغط بيضيف معلومات بتخليها أكبر، فـ [[zip]] قرر يخزنها زي ما هي. على ملف نصي كبير ([[text.txt]] 348894 byte) [[unzip -v]] قال [[Defl:N]] (Deflate، الضغط العادي) و [[63%]] توفير.

---

## ٤. [[xxd -l 4 project.zip]]

~~~text الناتج
00000000: 504b 0304                                PK..
~~~

[[50 4b]] = [[PK]] (Phil Katz، اللي عمل الصيغة)، و [[03 04]] = «هنا بيبدأ ملف». أي [[.docx]] و [[.jar]] و [[.apk]] بيبدأ بنفس الأربعة.

---

## ٥. [[unzip -q project.zip -d out]]

- [[-q]]: من غير كلام.
- [[-d out]]: directory: فك جوه فولدر [[out]] (وبيعمله لو مش موجود)، بدل الفولدر الحالي.

## ٦. [[ls -A out/project]]

[[-A]] = all: اعرض الملفات المخفية (اللي بتبدأ بنقطة زي [[.env]]) من غير [[.]] و [[..]].

~~~text الناتج
README.md
src
~~~

مفيش [[.env]] ولا [[node_modules]]. لو كانوا جوه الأرشيف، [[-A]] كانت هتوريهم.

---

## ٧. نفس الشغل على ويندوز

جربنا على نفس الفولدر في PowerShell 7.6:

~~~powershell
Compress-Archive -Path project -DestinationPath project-ps.zip
Expand-Archive project-ps.zip -DestinationPath outps
~~~

- [[Compress-Archive]] **ملوش exclude**: الأرشيف طلع فيه [[.env]] و [[node_modules]]. لو عايز تستثني، اعمل نسخة نضيفة الأول، أو استخدم [[tar.exe]] (تحت).
- لو الأرشيف موجود، بيرفض ويقولك [[already exists. Use the -Update parameter ... or use the -Force parameter]].
- و [[Format-Hex project-ps.zip -Count 4]] طلّع [[50 4B 03 04]]، نفس البصمة.

و ويندوز 10 و 11 فيه [[tar.exe]] (bsdtar 3.8.8 على جهاز التجربة) بيعمل zip كمان، وبيعرف يستثني:

~~~cmd
tar -a -c -f project-tar.zip --exclude=node_modules --exclude=.env project
tar -tf project-tar.zip
~~~

~~~text الناتج
project/
project/README.md
project/src/
project/src/app.js
~~~

[[-a]] = auto: اختار الصيغة من الامتداد ([[.zip]])، و [[-c]] create، و [[-f]] اسم الملف، و [[-t]] اعرض.

---

## الخلاصة

| عايز | لينكس والماك | ويندوز |
|---|---|---|
| أعمل zip لفولدر | [[zip -r out.zip dir]] | [[Compress-Archive -Path dir -DestinationPath out.zip]] |
| أستثني | [[-x "dir/node_modules/*"]] | [[tar -a -c -f out.zip --exclude=... dir]] |
| أشوف جواه | [[unzip -l]] | [[tar -tf]] |
| أفك في فولدر | [[unzip -d out]] | [[Expand-Archive -DestinationPath out]] |

وقبل أي فك: [[-l]] الأول، و [[-d]] لفولدر جديد.`,
          lines: [
            R`[[-r]] الفولدر بكل اللي جواه، و [[-x]] استثني المكتبات والأسرار.`,
            R`شوف جواه إيه من غير فك.`,
            R`[[file]] بيعرف إنه zip.`,
            R`البصمة: [[PK]] وبعدها [[03 04]].`,
            R`فك في فولدر [[out]].`,
            R`اتأكد: مفيش [[.env]] ولا [[node_modules]].`
          ],
          sol: R`الناتج الحقيقي:
[[Archive:  project.zip]]
[[        0  2026-10-01 17:03   project/]]
[[        0  2026-10-01 17:03   project/src/]]
[[       18  2026-10-01 17:03   project/src/app.js]]
[[        6  2026-10-01 17:03   project/README.md]]
[[       24                     4 files]]
[[project.zip: Zip archive data, at least v1.0 to extract, compression method=store]]
[[00000000: 504b 0304                                PK..]]
و [[ls -A out/project]] بيطبع [[README.md]] و [[src]] بس.

[[compression method=store]] لأن الملفات صغيرة جدًا فمش هتصغر. و [[unzip -l]] على [[.docx]] هيوريك [[word/document.xml]] و [[[Content_Types].xml]].`
        },
        {
          cmd: ".tar و .gz و .tgz",
          title: "إيه الفرق بين .tar و .gz و .tar.gz، وأمر tar بتفتكره إزاي؟",
          desc: R`على لينكس الأرشيف والضغط خطوتين منفصلين:

• [[.tar]] (tape archive): بيجمع ملفات وفولدرات في ملف واحد ومعاهم الصلاحيات والمالك والتواريخ والـ symlinks، من غير أي ضغط. حجمه تقريبًا مجموع الملفات.
• [[.gz]] (gzip): بيضغط ملف واحد بس. [[gzip file.txt]] بيعمل [[file.txt.gz]] ويمسح الأصلي (و [[-k]] يسيبه). و [[gunzip]] أو [[gzip -d]] العكس. و [[zcat]] و [[zgrep]] و [[zless]] بيقروه من غير فك (درس [[.log]]).
• [[.tar.gz]] أو [[.tgz]]: الاتنين مع بعض: tar يجمع، و gzip يضغط الناتج. ده الشكل المعتاد لأي حاجة على لينكس: كود المكتبات، و Node و Go الرسميين، والـ backups، وطبقات Docker images نفسها.
• وأخواته بضغط تاني: [[.tar.xz]] و [[.txz]] (xz، أصغر وأبطأ)، و [[.tar.bz2]] (bzip2، قديم)، و [[.tar.zst]] (zstd، سريع جدًا وضغطه كويس، والجديد في التوزيعات).

أمر [[tar]] بحروف:
• [[c]] create، و [[x]] extract، و [[t]] list.
• [[z]] gzip، و [[J]] xz، و [[j]] bzip2. (و tar الحديث بيعرف الضغط لوحده وهو بيفك، فـ [[tar -xf file.tar.xz]] شغالة.)
• [[f]] الملف، ولازم الاسم ييجي بعدها علطول.
• [[v]] verbose: اطبع كل ملف.
• [[-C dir]]: فك في الفولدر ده. و [[--exclude=pattern]].
طريقة تفتكره: [[tar -czf]] = Create Zipped File، و [[tar -xzf]] = eXtract Zipped File، و [[tar -tzf]] = Table (list).

على ويندوز ١٠ و ١١ فيه [[tar.exe]] جاهز في CMD و PowerShell بنفس الأوامر. و 7-Zip بيفتح الصيغ دي كلها.`,
          example: R`tar -czf project.tar.gz --exclude=node_modules --exclude=.env project
tar -tzf project.tar.gz
file project.tar.gz
mkdir -p out2 && tar -xzf project.tar.gz -C out2
gzip -k -9 text.txt
ls -l text.txt text.txt.gz`,
          try: R`على نفس فولدر [[project]] بتاع درس [[.zip]] نفّذ المثال وقارن حجم [[project.tar.gz]] بـ [[project.zip]]. اعمل ملف نصي كبير ([[seq 1 60000 > text.txt]]) واضغطه بـ gzip و xz ([[xz -k -9 text.txt]]) وقارن الأحجام. وبعدين اعمل [[tar -cf]] من غير [[z]] وشوف الحجم.`,
          deep: {
            why: R`فلسفة Unix: كل أداة تعمل حاجة واحدة كويس. tar اتعمل للشرايط (tapes) ويعرف يحفظ كل تفاصيل الملفات، و gzip بيعرف يضغط. ولما تفصلهم تقدر تغيّر الضغط (gz أو xz أو zstd) من غير ما تغيّر الأرشيف. وكمان ضغط الأرشيف كله مرة واحدة بيطلّع حجم أصغر من ضغط كل ملف لوحده زي zip، لأن الملفات المتشابهة بتضغط بعض.`,
            how: R`[[tar -czf]] بيكتب كل ملف (header فيه الاسم والصلاحيات، وبعده المحتوى) ورا بعض في stream، والـ stream ده بيعدّي على gzip قبل ما يتكتب. عشان كده مفيش فهرس: [[tar -t]] لازم يقرا الملف كله، ومينفعش تفك ملف من النص من غير ما تعدّي على اللي قبله. وبصمة gzip [[1f 8b]]، و xz [[fd 37 7a 58 5a 00]].`,
            when: R`backups على السيرفر، ونقل مشروع لسيرفر لينكس مع الصلاحيات، وتنزيل برامج لينكس، وأي حاجة هتتفك على لينكس.`,
            mistakes: R`[[tar -czf project project.tar.gz]] بالترتيب الغلط: بيعمل أرشيف اسمه [[project]]! الاسم لازم بعد [[f]]. تفك من غير [[-t]] الأول فالملفات تتفرد في الفولدر الحالي. تنسى [[-C]] فتفك في المكان الغلط. و [[gzip file]] بيمسح الأصلي من غير [[-k]].`
          },
          teach: R`## المثال: tar يجمع، و gzip يضغط

نفس فولدر [[project]] بتاع درس [[.zip]]، بس المرة دي بـ [[tar]]: نعمل [[.tar.gz]]، ونشوف جواه، ونفكه في فولدر تاني، وبعدين نضغط ملف نصي واحد بـ gzip ونقارن. اتشغّل في [[docker run --rm ubuntu:24.04]] (GNU tar، وسطّبنا [[xz-utils]] و [[zstd]] و [[bzip2]] للمقارنة).

---

## ١. حروف tar

قبل الأوامر، الحروف اللي هتشوفها:

| الحرف | من | معناه |
|---|---|---|
| [[c]] | create | اعمل أرشيف |
| [[x]] | extract | فك |
| [[t]] | table (list) | اعرض اللي جواه |
| [[z]] | gzip | اضغط أو فك بـ gzip |
| [[J]] | xz | اضغط بـ xz |
| [[v]] | verbose | اطبع كل ملف |
| [[f]] | file | اسم الأرشيف، **ولازم ييجي بعدها علطول** |

والحروف ممكن تتلزق: [[-czf]] = [[-c -z -f]].

---

## ٢. [[tar -czf project.tar.gz --exclude=node_modules --exclude=.env project]]

- [[-czf project.tar.gz]]: اعمل أرشيف مضغوط gzip واسمه [[project.tar.gz]]. الاسم جه بعد [[f]] على طول.
- [[--exclude=node_modules]]: استثني أي حاجة اسمها كده في أي مكان جوه. (أبسط من zip، اللي محتاج المسار كامل ونجمة.)
- [[project]]: اللي هيتجمع.

### الترتيب الغلط

~~~bash
tar -czf bad project.tar.gz
~~~

مطبعش أي غلط و exit code كان صفر! عمل أرشيف اسمه [[bad]] جواه [[project.tar.gz]]. لأن [[f]] بتاخد أول كلمة بعدها اسم للأرشيف، أيًا كانت. فلو كتبت [[tar -czf project project.tar.gz]] بالغلط، هيعمل أرشيف اسمه [[project]].

---

## ٣. [[tar -tzf project.tar.gz]]

[[t]] اعرض، [[z]] الملف gzip، [[f]] اسمه:

~~~text الناتج
project/
project/src/
project/src/app.js
project/README.md
~~~

ومع [[v]] ([[tar -tvzf]]) بيطلع زي [[ls -l]]، وبيبين إن tar حافظ الصلاحيات والمالك:

~~~text الناتج
drwxr-xr-x root/root         0 2026-10-07 12:23 project/
-rw-r--r-- root/root        18 2026-10-07 12:23 project/src/app.js
~~~

[[-rw-r--r--]] الصلاحيات، و [[root/root]] المالك والجروب. ده اللي zip مبيحافظش عليه دايمًا، وعشان كده tar هو الاختيار للسيرفرات.

---

## ٤. [[file project.tar.gz]]

~~~text الناتج
project.tar.gz: gzip compressed data, from Unix, original size modulo 2^32 10240
~~~

[[file]] شايف الطبقة اللي برا بس: gzip. و [[original size ... 10240]]: حجم اللي جوه الـ gzip قبل الضغط، وهو الـ tar. ([[modulo 2^32]] يعني الرقم ده بيلف بعد ٤ جيجا، لأنه متخزن في ٤ bytes.)

ليه 10240 والملفات 24 byte بس؟ الـ tar بيكتب header ٥١٢ byte لكل ملف وفولدر، وكل ملف بيتكمّل لمضاعفات ٥١٢، وفي الآخر الأرشيف كله بيتكمّل لـ 10240 (حجم «بلوك» من أيام الشرايط). و [[tar -cf]] من غير [[z]] طلّع ملف [[project.tar]] حجمه 10240 بالظبط. والـ gzip ضغطه لـ 224 byte، لأن أغلبه أصفار.

---

## ٥. [[mkdir -p out2 && tar -xzf project.tar.gz -C out2]]

- [[mkdir -p out2]]: اعمل الفولدر، و [[-p]] متشتكيش لو موجود.
- [[&&]]: نفّذ اللي بعدي بس لو اللي قبلي نجح.
- [[-xzf]]: فك gzip.
- [[-C out2]]: change directory: فك جوه [[out2]] بدل الفولدر الحالي. (الفولدر لازم يبقى موجود، عشان كده [[mkdir]] الأول.)

و [[ls -A out2/project]] طلّع [[README.md]] و [[src]] بس.

---

## ٦. [[gzip -k -9 text.txt]] و [[ls -l]]

[[gzip]] لوحده بيضغط ملف واحد:
- [[-k]] = keep: سيب الأصلي (من غيرها [[text.txt]] بيتمسح ويفضل [[text.txt.gz]] بس).
- [[-9]]: أقصى ضغط (من 1 الأسرع لـ 9 الأصغر، والافتراضي 6).

عملنا الملف بـ [[seq 1 60000 > text.txt]] (الأرقام من 1 لـ 60000 كل رقم في سطر) وضغطناه بكل الأدوات:

| الملف | الحجم (byte) | الأمر |
|---|---|---|
| [[text.txt]] | 348894 | الأصلي |
| [[text.txt.gz]] | 130587 | [[gzip -k -9]] |
| [[text.txt.zst]] | 68556 | [[zstd -19 -k]] |
| [[text.txt.bz2]] | 80835 | [[bzip2 -k -9]] |
| [[text.txt.xz]] | 11456 | [[xz -k -9]] |

الفرق كبير هنا لأن الملف فيه نمط طويل بيتكرر (الأرقام بتزيد بانتظام)، و gzip بيدوّر على التكرار في آخر 32KB بس، و xz بيدوّر في ميجات. في ملفات تانية الفرق بيبقى أصغر بكتير.

والبصمات: [[xxd -l 2 text.txt.gz]] = [[1f8b]]، و [[xxd -l 6 text.txt.xz]] = [[fd37 7a58 5a00]] ([[7zXZ]]).

---

## ٧. ويندوز

ويندوز 10 و 11 فيه [[tar.exe]] جاهز. جربناه في CMD على نفس الفولدر:

~~~cmd
tar -czf project.tar.gz --exclude=node_modules --exclude=.env project
tar -tzf project.tar.gz
~~~

نفس الليستة بالظبط، والملف طلع 211 byte. النسخة bsdtar 3.8.8 (مش GNU tar)، بس الحروف الأساسية واحدة.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| أعمل [[.tar.gz]] | [[tar -czf out.tar.gz dir]] |
| أشوف جواه | [[tar -tzf file.tar.gz]] |
| أفك في فولدر | [[tar -xzf file.tar.gz -C dir]] |
| أضغط ملف واحد وأسيب الأصلي | [[gzip -k file]] |
| أصغر حجم | [[tar -cJf out.tar.xz dir]] |

والقاعدة اللي متتنسيش: الاسم بعد [[f]] على طول.`,
          lines: [
            R`[[c]] اعمل، [[z]] gzip، [[f]] اسم الملف، واستثني المكتبات والأسرار.`,
            R`[[t]] اعرض اللي جواه.`,
            R`[[file]] بيقول gzip، والأرشيف tar جواه.`,
            R`[[x]] فك، و [[-C]] في فولدر [[out2]].`,
            R`gzip لملف واحد، و [[-k]] سيب الأصلي، و [[-9]] أقصى ضغط.`,
            R`قارن الحجم.`
          ],
          sol: R`الناتج الحقيقي:
[[project/]]
[[project/src/]]
[[project/src/app.js]]
[[project/README.md]]
[[project.tar.gz: gzip compressed data, from Unix, original size modulo 2^32 10240]]
(الـ 10240 حجم الـ tar قبل الضغط: tar بيكمّل لأقرب 10KB.)

ملف [[project.tar.gz]] طلع 224 byte و [[project.zip]] لنفس الملفات 668 byte (الأرقام بتتغير بايتات قليلة مع التواريخ).

و [[seq 1 60000 > text.txt]] بيعمل ملف 348894 byte (الأرقام من 1 لـ 60000 كل رقم في سطر):
[[text.txt.gz]] ← 130587، و [[text.txt.bz2]] ← 80835، و [[text.txt.zst]] ([[zstd -19]]) ← 68556، و [[text.txt.xz]] ← 11456. يعني xz أصغر من gzip بأكتر من ١١ مرة في الملف ده، لأن الأرقام المتتالية فيها نمط طويل بيتكرر و xz بيدوّر في مساحة أكبر بكتير.
ومن غير [[z]]، الـ [[.tar]] حجمه 10240 (أكبر من الملفات نفسها بسبب الـ headers والتكملة).`
        },
        {
          cmd: ".7z و .rar و .xz",
          title: "إمتى تستخدم .7z، وإيه حكاية .rar، وإزاي تفكهم على أي نظام؟",
          desc: R`• [[.7z]] (7-Zip): أرشيف وضغط مع بعض بضغط قوي (LZMA2)، غالبًا أصغر من zip بفرق كبير. وفيه تشفير AES-256 حقيقي بباسورد، ويقدر يخفي أسامي الملفات كمان ([[-mhe=on]]). البرنامج 7-Zip مجاني ومفتوح على ويندوز، وعلى لينكس [[7z]] (حزمة [[p7zip-full]] أو [[7zip]])، وعلى الماك [[brew install sevenzip]].
• [[.rar]]: صيغة WinRAR. مشهورة في الملفات اللي بتتنزل من النت. صيغة مغلقة: تقدر تفكها ببرامج كتير (7-Zip و [[unrar]] و The Unarchiver على الماك، وويندوز ١١ الجديد بيفتحها)، بس عشان تعمل [[.rar]] محتاج WinRAR. مفيش سبب تستخدمه في شغلك: استخدم zip أو 7z.
• [[.xz]]: ضغط ملف واحد زي gzip بس أصغر (نفس خوارزمية 7z). بتشوفه في [[.tar.xz]] (كود لينكس وتوزيعات كتير). [[xz -d]] أو [[unxz]] يفكه.
• [[.zst]] (zstd): الجديد: سريع جدًا في الضغط والفك، وبتستخدمه Facebook و Arch Linux و Docker والـ [[.deb]] الجديدة (درس [[.deb]]).
• [[.bz2]]: قديم وبطيء، هتقابله في ملفات قديمة.
• أرشيف متقسّم: [[.7z.001]] و [[.7z.002]] أو [[.part1.rar]]: ملف كبير متقطع حتت. لازم كل الحتت تبقى في نفس الفولدر، وتفك من أول حتة.

اختيار سريع:
• هتبعته لأي حد: [[.zip]].
• لسيرفر لينكس أو backup: [[.tar.gz]] أو [[.tar.zst]].
• أصغر حجم أو تشفير قوي: [[.7z]].
• [[.rar]]: فكه بس.`,
          example: R`7z a project.7z project/src project/README.md
7z l project.7z
7z a -pSecret123 -mhe=on secret.7z project/README.md
7z x project.7z -oout3
xz -k -9 text.txt
unrar x downloaded.rar`,
          try: R`سطّب 7-Zip (ويندوز من 7-zip.org، أو [[sudo apt install 7zip]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w alpine sh -c "apk add p7zip && 7z l project.7z"]]). نفّذ المثال وقارن حجم [[project.7z]] بـ zip و tar.gz. وجرّب [[7z l secret.7z]] من غير باسورد، وبعدين بـ [[-pSecret123]].`,
          deep: {
            why: R`كل صيغة اتعملت لهدف: zip للتوافق، و tar.gz للينكس، و 7z لأصغر حجم وتشفير حقيقي، و rar كانت أحسن ضغط في التسعينات وفضلت عايشة بالعادة. ومع إن الصيغ كتير، فيه أداة واحدة (7-Zip) بتفك تقريبًا كلهم.`,
            how: R`7z بيستخدم LZMA2: بيدوّر على التكرار في مساحة كبيرة جدًا من الداتا (dictionary بالميجات)، فالملفات المتشابهة بتضغط بعض. ده بيخليه أصغر بس أبطأ وبياكل رامات أكتر. والتشفير بـ [[-p]] بيحوّل الباسورد لمفتاح AES-256، و [[-mhe=on]] بيشفّر الفهرس كمان فمحدش يشوف حتى أسامي الملفات.`,
            when: R`backup لفولدر كبير، أو ترسل ملفات سرية (مع باسورد قوي تبعته في قناة تانية)، أو تفك أي حاجة نزلت من النت.`,
            mistakes: R`تبعت [[.7z]] أو [[.rar]] لعميل معندوش برنامج يفتحه. تبعت الباسورد في نفس الإيميل مع الملف. تفك أرشيف من النت فيه [[.exe]] وتشغّله (برامج كتير بتتوزع كده). وتنسى حتة من الأرشيف المتقسّم.`
          },
          teach: R`## المثال: أرشيف 7z عادي، وواحد بباسورد، وفك

أمر [[7z]] بياخد **حرف** بيقول هيعمل إيه (من غير [[-]] قبله)، وبعده اسم الأرشيف، وبعده الملفات. جربناه في [[docker run --rm ubuntu:24.04]] بعد [[apt install 7zip]] (7-Zip 23.01)، على نفس فولدر [[project]] بتاع درس [[.zip]].

| الحرف | من | بيعمل |
|---|---|---|
| [[a]] | add | ضيف ملفات لأرشيف (ويعمله لو مش موجود) |
| [[l]] | list | اعرض اللي جواه |
| [[x]] | extract | فك بالمسارات (الفولدرات) |
| [[e]] | extract | فك كل الملفات في فولدر واحد من غير مسارات |
| [[t]] | test | اتأكد إن الأرشيف سليم |

---

## ١. [[7z a project.7z project/src project/README.md]]

[[a]] اعمل [[project.7z]] وحط فيه فولدر [[src]] وملف [[README.md]]. آخر سطور الناتج:

~~~text الناتج
Files read from disk: 2
Archive size: 226 bytes (1 KiB)
Everything is Ok
~~~

الامتداد [[.7z]] هو اللي بيحدد الصيغة (لو كتبت [[.zip]] هيعمل zip).

---

## ٢. [[7z l project.7z]]

~~~text الناتج
   Date      Time    Attr         Size   Compressed  Name
------------------- ----- ------------ ------------  ------------------------
2026-10-07 12:23:36 D....            0            0  project/src
2026-10-07 12:23:36 ....A            6           28  project/README.md
2026-10-07 12:23:36 ....A           18               project/src/app.js
------------------- ----- ------------ ------------  ------------------------
2026-10-07 12:23:36                 24           28  2 files, 1 folders
~~~

- [[Attr]]: [[D]] = directory (فولدر)، و [[A]] = archive (علامة ويندوز للملف العادي).
- [[Size]]: الحجم الأصلي، و [[Compressed]]: بعد الضغط.
- الملفين ليهم رقم [[Compressed]] واحد (28) والتاني فاضي: 7z بيضغطهم **مع بعض** في بلوك واحد (solid archive)، فالملفات المتشابهة بتضغط بعض. وده سبب إن الـ 24 byte بقوا 28 (الملفات صغيرة جدًا والضغط له تكلفة ثابتة)، والأرشيف كله 226 byte بسبب الـ headers.

و [[file project.7z]] قال [[7-zip archive data, version 0.4]]، و [[xxd -l 6]] طلّع البصمة [[377a bcaf 271c]]: أول حرفين [[7z]] وبعدهم ٤ bytes ثابتة.

---

## ٣. [[7z a -pSecret123 -mhe=on secret.7z project/README.md]]

- [[-p]] = password، والباسورد لازق فيها من غير مسافة: [[-pSecret123]]. (لو كتبت [[-p]] لوحدها بيسألك عليه، وده أحسن عشان الباسورد ميتحفظش في تاريخ الترمنال.)
- [[-m]] = method (إعدادات)، و [[he=on]] = header encryption: شفّر الفهرس كمان، يعني أسامي الملفات.

نشوف الفرق بـ [[7z l]]:

| الأرشيف | من غير باسورد | باسورد غلط | الباسورد الصح |
|---|---|---|---|
| [[secret.7z]] (مع [[-mhe=on]]) | [[Enter password]] (لما الـ input مقفول: [[Break signaled]]) | [[Headers Error]] و [[Errors: 1]] | [[project/README.md]] |
| [[nohe.7z]] (من غير [[-mhe]]) | بيعرض [[project/README.md]] عادي | | |

يعني من غير [[-mhe=on]]، المحتوى متشفّر بس أي حد يشوف أسامي الملفات وأحجامها. والتشفير نفسه AES-256، والباسورد بيتحوّل لمفتاح، فقوته من قوة الباسورد.

---

## ٤. [[7z x project.7z -oout3]]

- [[x]]: فك وحافظ على الفولدرات.
- [[-oout3]]: [[-o]] = output directory، والاسم **لازق** فيها من غير مسافة (لو حطيت مسافة 7z هيفتكر [[out3]] اسم ملف).

و [[find out3]] طلّع:

~~~text الناتج
out3
out3/project
out3/project/src
out3/project/src/app.js
out3/project/README.md
~~~

---

## ٥. [[xz -k -9 text.txt]]

[[xz]] زي [[gzip]]: ملف واحد، و [[-k]] سيب الأصلي، و [[-9]] أقصى ضغط. على ملف [[seq 1 60000]] (348894 byte) طلّع 11456 byte، و gzip على نفس الملف 130587. و [[7z a t.7z text.txt]] بالإعدادات الافتراضية طلّع 17098، لأن الاتنين نفس الخوارزمية (LZMA) بإعدادات مختلفة.

---

## ٦. [[unrar x downloaded.rar]]

[[unrar]] بيفك بس، و [[x]] بنفس معنى 7z (بالمسارات). محتاج حزمة [[unrar]] (في أوبونتو في قسم multiverse لأنها مش مفتوحة المصدر). مجربناهوش لأن عمل ملف [[.rar]] محتاج WinRAR؛ الشكل من docs بتاعة RARLAB. والبديل اللي متسطّب عندك غالبًا: [[7z x downloaded.rar]].

---

## الخلاصة

| عايز | الأمر |
|---|---|
| أعمل 7z | [[7z a out.7z files...]] |
| بباسورد وأسامي مخفية | [[7z a -p -mhe=on secret.7z files...]] |
| أشوف جواه | [[7z l file.7z]] |
| أفك في فولدر | [[7z x file.7z -odir]] (من غير مسافة بعد [[-o]]) |
| أي صيغة تانية (rar و tar.xz و iso) | [[7z x]] بيفكها كلها تقريبًا |`,
          lines: [
            R`[[a]] add: اعمل أرشيف 7z بالملفات دي.`,
            R`[[l]] list: اعرض اللي جواه.`,
            R`[[-p]] باسورد، و [[-mhe=on]] شفّر أسامي الملفات كمان.`,
            R`[[x]] فك بالمسارات، و [[-o]] الفولدر (من غير مسافة بعدها).`,
            R`xz لملف واحد: [[-k]] سيب الأصلي و [[-9]] أقصى ضغط.`,
            R`فك rar (محتاج [[unrar]] أو استخدم [[7z x]]).`
          ],
          sol: R`[[7z l project.7z]] بيعرض الملفين والفولدر وفي الآخر [[2 files, 1 folders]]، وحجم الأرشيف المضغوط 28 byte للداتا. و [[file project.7z]] بيقول [[7-zip archive data, version 0.4]]، والبصمة [[37 7a bc af 27 1c]] ([[7z]] وبعدها bytes ثابتة).

[[7z l secret.7z]] من غير باسورد بيفشل (بيطلب الباسورد، أو [[Errors: 1]] لو الباسورد غلط)، لأن حتى الأسامي متشفّرة. ومع [[-pSecret123]] بيعرض [[project/README.md]].

و [[xz -k -9]] على الملف النصي بتاع درس [[.tar]] ([[seq 1 60000]]، يعني 348894 byte) طلّع 11456، و gzip على نفس الملف 130587. و [[7z a t.7z text.txt]] بالإعدادات الافتراضية طلّع 17098.`
        }
      ]
    }
]);
