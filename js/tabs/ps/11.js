// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "ضغط وهاش",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Compress-Archive",
          title: "zip وفكه",
          desc: R`[[Compress-Archive]] بيعمل ملف zip و [[Expand-Archive]] بيفكه، من غير أي برنامج زيادة، زي [[zip]] و [[unzip]] في لينكس. [[-Path]] اللي هيتضغط، و [[-DestinationPath]] اسم الـ zip أو الفولدر اللي هيتفك فيه.

[[dist\*]] بالنجمة يعني «اللي جوه dist»، فالـ zip هيبقى جواه الملفات على طول. لو كتبت [[dist]] من غير [[\*]]، الـ zip هيبقى جواه فولدر اسمه dist والملفات جوّاه. وده بيفرق لما ترفعه على سيرفر وتفكه.

[[tar]] كمان موجود في ويندوز 10 و 11 بنفس حروف لينكس: [[-c]] اعمل، و [[-z]] اضغط gzip، و [[-f app.tar.gz]] اسم الملف، و [[app]] اللي هيتضغط. مفيد لو السيرفر لينكس ومتعود على tar.gz. وخلي بالك: لو الـ zip موجود قبل كده Compress-Archive هيطلع error، استخدم [[-Force]] يكتب فوقه أو [[-Update]] يضيف عليه.`,
          example: R`Compress-Archive -Path dist\* -DestinationPath dist.zip
Expand-Archive dist.zip -DestinationPath out
tar -czf app.tar.gz app`,
          try: "اضغط فولدر وفكه في مكان تاني.",
          deep: {
            why: R`باك أب سريع لفولدر، أو تجهيز ملف ترفعه على سيرفر أو تبعته لحد، من غير ما تسطّب WinRAR أو 7-Zip. Compress-Archive مبني جوه PowerShell، و tar موجود جنبه لو محتاج tar.gz.`,
            how: R`[[Compress-Archive -Path ".\folder" -DestinationPath "archive.zip"]] يعمل zip. [[-Update]] يضيف لـ zip موجود.

[[Expand-Archive -Path "archive.zip" -DestinationPath ".\output"]] يفكّه. [[-Force]] يكتب فوق لو الفولدر موجود.

[[Compress-Archive -Path ".\file1.txt", ".\file2.txt" -Destination "files.zip"]] ملفات متعددة.

بس PowerShell Compress-Archive بطيء على ملفات كتير. لو عندك 7-Zip: [[7z a archive.7z folder\]] أسرع بكتير.`,
            when: "باك أب. إرسال مشروع. نقل ملفات.",
            mistakes: R`Path ممكن تاخد * : [[Compress-Archive ".\logs\*.log"]] بس الـ wildcards مش شغالة في كل الأحوال. خليها بين quotes.`
          },
          teach: R`## الأول: ٣ أوامر، ٣ شغلانات

[[Compress-Archive]] بيعمل zip، و [[Expand-Archive]] بيفكه، و [[tar]] بيعمل tar.gz (الشكل المنتشر على لينكس). اتشغّل على ويندوز 11 في PowerShell 7.6، في فولدر تجربة فيه [[dist]] جواه [[index.html]] وفولدر [[assets]] جواه [[app.css]].

---

## ١. [[Compress-Archive -Path dist\* -DestinationPath dist.zip]]

| الحتة | معناها |
|---|---|
| [[-Path dist\*]] | اللي هيتضغط. [[\*]] = كل اللي **جوه** dist |
| [[-DestinationPath dist.zip]] | اسم الـ zip اللي هيتعمل |

مبيطبعش حاجة لما ينجح. الـ zip طلع 247 بايت.

## ٢. [[Expand-Archive dist.zip -DestinationPath out]]

أول حاجة من غير اسم parameter هي الـ zip، و [[-DestinationPath out]] الفولدر اللي هيتفك فيه (بيتعمل لو مش موجود). وعشان نشوف اللي اتفك:

~~~powershell
Get-ChildItem out -Recurse -Name
~~~

~~~text الناتج
assets
index.html
assets\app.css
~~~

[[-Recurse]] جوه الفولدرات كمان، و [[-Name]] الأسامي بس. الملفات جوه [[out]] على طول.

### الفرق اللي بيعمله [[\*]]

جربت من غيرها: [[Compress-Archive -Path dist -DestinationPath dist2.zip]] وفكيته في [[out2]]:

~~~text الناتج
dist
dist\assets
dist\index.html
dist\assets\app.css
~~~

بقى فيه فولدر [[dist]] زيادة. يعني:

~~~text
-Path dist\*   →  out\index.html
-Path dist     →  out2\dist\index.html
~~~

وده بيفرق لما ترفع الـ zip على سيرفر وتفكه في [[/var/www/html]]: إما الموقع يشتغل، إما يبقى في [[/var/www/html/dist]].

### لو شغلته تاني

~~~text الناتج
The archive file ...\dist.zip already exists. Use the -Update parameter to update the existing archive file or use the -Force parameter to overwrite the existing archive file.
~~~

و [[Expand-Archive]] تاني على نفس الفولدر:

~~~text الناتج
Failed to create file '...\out\assets\app.css' while expanding the archive file '...\dist.zip' contents as the file '...\out\assets\app.css' already exists. Use the -Force parameter if you want to overwrite ...
~~~

(قصّرت المسارات بـ [[...]].) الحل في الرسالتين: [[-Force]].

---

## ٣. [[tar -czf app.tar.gz app]]

[[tar]] برنامج موجود في ويندوز 10 و 11 ([[Get-Command tar]] طلع [[C:\WINDOWS\system32\tar.exe]])، وبنفس حروف لينكس:

| الحرف | معناه |
|---|---|
| [[-c]] | create: اعمل أرشيف |
| [[-z]] | اضغطه بـ gzip |
| [[-f app.tar.gz]] | file: اسم الملف، ولازم ييجي بعده على طول |
| [[app]] | اللي هيتضغط |

وعشان تشوف اللي جواه من غير ما تفكه ([[-t]] = list):

~~~powershell
tar -tzf app.tar.gz
~~~

~~~text الناتج
app/
app/src/
app/src/server.js
~~~

لاحظ إن tar بيحط الفولدر نفسه ([[app/]]) جوه الأرشيف، زي [[Compress-Archive]] من غير [[\*]]. والفك: [[tar -xzf app.tar.gz]] ([[-x]] = extract).

---

## على لينكس والماك

| | PowerShell | لينكس والماك |
|---|---|---|
| zip | [[Compress-Archive -Path dist\* -DestinationPath dist.zip]] | [[cd dist && zip -r ../dist.zip .]] |
| فك zip | [[Expand-Archive dist.zip -DestinationPath out]] | [[unzip dist.zip -d out]] |
| tar.gz | [[tar -czf app.tar.gz app]] | نفسه |

## الخلاصة

~~~text
dist\*      اللي جوه الفولدر (من غير الفولدر نفسه)
dist        الفولدر نفسه جوه الـ zip
-Force      اكتب فوق الموجود
tar -czf    موجود في ويندوز 10/11 بنفس حروف لينكس
~~~`,
          lines: ["اضغط محتوى dist في zip.", "فك zip في فولدر out.", "tar موجود في ويندوز 10 وأحدث، بنفس حروف لينكس."],
          sol: R`[[Compress-Archive -Path app\* -DestinationPath app.zip]] وبعدين [[Expand-Archive app.zip -DestinationPath out]]. جربتها فـ [[Get-ChildItem out -Recurse -Name]] طلع [[src]] و [[src\server.js]] زي الأصل.

لو كتبت [[-Path app]] من غير [[\*]]، الـ zip هيبقى جواه فولدر app، فبعد الفك هتلاقي [[out\app\src]]. ولو شغلت الضغط تاني على نفس اسم الـ zip هيطلع [[The archive file ... already exists. Use the -Update parameter ... or use the -Force parameter]]، ونفس الحكاية Expand-Archive على فولدر فيه نفس الملفات محتاج [[-Force]].`,
          solCode: R`Compress-Archive -Path app\* -DestinationPath app.zip
Expand-Archive app.zip -DestinationPath out
Get-ChildItem out -Recurse -Name`
        },
        {
          cmd: "Get-FileHash",
          title: "اتأكد إن الملف سليم",
          desc: R`الهاش (hash) بصمة للملف: رقم طويل بيتحسب من كل بايت فيه، ولو بايت واحد اتغير البصمة كلها بتتغير. [[Get-FileHash]] بيحسبها، و [[-Algorithm SHA256]] نوع البصمة (وده الافتراضي أصلًا، والمواقع غالبًا بتكتبه). المقابل في لينكس [[sha256sum]].

الاستخدام: صفحة تحميل برنامج بتكتب الـ SHA256 بتاعه، تحسبه انت على الملف اللي نزل وتقارن. لو زي بعض، الملف وصل سليم ومحدش عدّل فيه. ونفس الفكرة تتأكد إن نسخة باك أب زي الأصل.

المقارنة الأسهل: [[(Get-FileHash .\setup.exe).Hash -eq "الرقم من الموقع"]] بترجع True أو False، و [[-eq]] مش بيفرّق بين الحروف الكابيتال والسمول، فمش مشكلة إن الموقع كاتبه سمول. و [[.\setup.exe]] يعني الملف في الفولدر الحالي.`,
          example: R`Get-FileHash .\setup.exe -Algorithm SHA256`,
          try: "اطلع الهاش لأي ملف عندك.",
          deep: {
            why: "التأكد إن ملف وصل سليم بعد النقل أو نزل بدون تعديل. زي sha256sum في bash.",
            how: R`[[Get-FileHash file.zip]] بيحسب SHA256 افتراضيًا. [[-Algorithm MD5]] أو [[-Algorithm SHA512]] لو محتاج.

[[(Get-FileHash file.zip).Hash]] الـ hash بس كنص.

قارن: [[Get-FileHash file.zip -Algorithm SHA256]] وبعدين قارن الـ Hash بالقيمة على الموقع.`,
            when: "بعد تحميل برنامج. بعد نسخ ملفات مهمة. للتأكد من سلامة باك أب.",
            mistakes: "نسيان إن الأحرف lowercase وuppercase ممكن تختلف في الـ hash المعروض وذاك. PowerShell بيطبع uppercase."
          },
          teach: R`## الأول: البصمة

الهاش رقم ثابت الطول بيتحسب من **كل بايت** في الملف. نفس الملف = نفس الهاش دايمًا، وأي تغيير ولو حرف = هاش مختلف تمامًا. الأمر سطر واحد، فهنفكه ونجرّب الفكرة نفسها. اتشغّل على ويندوز 11 في PowerShell 7.6.

---

## الأمر

~~~powershell
Get-FileHash .\setup.exe -Algorithm SHA256
~~~

| الحتة | معناها |
|---|---|
| [[Get-FileHash]] | احسب الهاش |
| [[.\setup.exe]] | الملف: [[.]] الفولدر الحالي و [[\]] الفاصل |
| [[-Algorithm SHA256]] | نوع الهاش. SHA = Secure Hash Algorithm، و 256 عدد الـ bits |

عشان أجرّب، عملت ملف اسمه [[setup.exe]] فيه كلمة [[hello]] بس (5 بايت، مش برنامج حقيقي):

~~~text الناتج
Algorithm : SHA256
Hash      : 2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824
Path      : C:\...\setup.exe
~~~

### ليه 64 حرف؟

256 bit ÷ 4 = **64 حرف hex** (كل حرف hex بيشيل 4 bits، من 0 لـ F). جربت [[(Get-FileHash .\setup.exe).Hash.Length]] وطلع [[64]]. والملف ممكن يبقى 5 بايت أو 5 جيجا، الهاش 64 حرف برضه.

### حرف واحد بيغيّر كله

غيّرت آخر حرف لكابيتال ([[hellO]]):

~~~text الناتج
04A6F55FACE2F46BE8C23F627D539827615851E10751B63EC59DB6D2C706B770
~~~

ولا حتة شبه الأول. وده اللي بيخلي الهاش ينفع تتأكد بيه إن محدش عدّل في الملف.

---

## المقارنة

~~~powershell
(Get-FileHash .\setup.exe).Hash -eq "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
~~~

1. [[(Get-FileHash .\setup.exe)]]: الأقواس تنفّذ الأول. ومن غير [[-Algorithm]] بياخد SHA256 (الافتراضي).
2. [[.Hash]]: الخانة دي بس كنص.
3. [[-eq "..."]]: يساوي؟ و [[-eq]] مش بيفرّق بين كابيتال وسمول.

~~~text الناتج
True
~~~

الرقم اللي قارنت بيه مكتوب سمول، وده نفس اللي [[sha256sum]] طلّعه على أوبونتو 24.04 لنفس المحتوى:

~~~text الناتج (لينكس)
2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  setup.exe
~~~

نفس الرقم بالظبط، بس لينكس بيكتبه سمول و PowerShell كابيتال.

---

## الأنواع

| [[-Algorithm]] | الطول | ملاحظة |
|---|---|---|
| [[SHA256]] | 64 حرف | الافتراضي، والمستخدم في مواقع التحميل |
| [[SHA512]] | 128 حرف | أطول |
| [[MD5]] | 32 حرف | قديم: بيكشف تلف الملف، بس مينفعش للأمان |

وعلى نفس الملف MD5 طلع [[5D41402ABC4B2A76B9719D911017C592]].

## على لينكس والماك

| | PowerShell | لينكس | الماك |
|---|---|---|---|
| SHA256 | [[Get-FileHash file]] | [[sha256sum file]] | [[shasum -a 256 file]] |

## الخلاصة

~~~text
SHA256          64 حرف hex، الافتراضي
نفس الملف        نفس الهاش دايمًا
حرف واحد اتغير   هاش مختلف كله
-eq             مش بيفرّق كابيتال وسمول، فقارن على طول
~~~`,
          lines: ["بصمة SHA256 للملف، قارنها باللي على موقع التحميل."],
          sol: R`[[Get-FileHash .\setup.exe -Algorithm SHA256]] بيطبع 3 حاجات: [[Algorithm SHA256]] و [[Hash]] (64 حرف hex كابيتال) و [[Path]]. جربتها على ملف وقارنتها بـ [[sha256sum]] على لينكس، طلعوا نفس الرقم بالظبط بس sha256sum بيكتبه حروف صغيرة.

الفرق في الكابيتال مش مهم، و [[-eq]] في PowerShell مش بيفرق بين كابيتال وسمول، فتقدر تقارن: [[(Get-FileHash .\setup.exe).Hash -eq "abc..."]]. لو رجع False يبقى الملف اتعدل أو التحميل بايظ، أو انت بتقارن بهاش نسخة تانية. [[SHA256]] هو الافتراضي أصلًا، فممكن تشيل [[-Algorithm]].`
        }
      ]
    }
]);
