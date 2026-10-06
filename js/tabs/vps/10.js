// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "استضافة مشتركة (cPanel / Hostinger)",
      l: 3,
      n: "مفيش root ولا Docker: SSH و git و PHP و .htaccess، ولوحة التحكم للباقي",
      items: [
        {
          cmd: "ssh 'git pull'",
          title: "deploy بسطر واحد على استضافة مشتركة",
          desc: "على الاستضافة المشتركة مفيش Docker ولا CI، بس غالبًا فيه SSH و git. السيرفر نفسه عامل clone للريبو جوه فولدر الموقع، فالـ deploy كله [[git pull]] من جهازك عن طريق ssh، وبعدها تقارن آخر commit هناك باللي عندك. و [[~/.ssh/config]] بيحفظ البورت واليوزر والمفتاح في اسم قصير.",
          example: R`# ~/.ssh/config على جهازك
Host shared
    HostName 203.0.113.10
    Port 65002
    User deploy
    IdentityFile ~/.ssh/id_ed25519
ssh shared 'cd ~/domains/example.com/public_html && git pull -q origin main && git log --oneline -1'
git log --oneline -1`,
          try: "اعمل commit صغير (تعديل نص في الصفحة)، ادفعه، وشغّل سطر الـ ssh. الـ hash اللي راجع لازم يطابق [[git log --oneline -1]] عندك.",
          deep: {
            why: "رفع الملفات بالـ File Manager أو FTP بطيء، وسهل تنسى ملف، ومفيش رجوع. git على السيرفر بيخلي الـ deploy أمر واحد، وتعرف بالظبط أنهي نسخة شغالة، والرجوع [[git checkout]] لـ commit قديم.",
            how: R`أول مرة بس: فعّل SSH من لوحة الاستضافة (غالبًا على بورت غير 22 زي 65002)، وضيف المفتاح العام بتاعك فيها. على السيرفر اعمل مفتاح ([[ssh-keygen -t ed25519]]) وحطه في GitHub كـ Deploy Key للقراية بس، وبعدين [[git clone]] جوه [[public_html]] (لازم يكون فاضي).

[[Host shared]] في [[~/.ssh/config]]: بعدها [[ssh shared]] بدل [[ssh -p 65002 deploy@203.0.113.10]].

السطر نفسه: [[cd]] للفولدر، و [[git pull -q]] بهدوء، و [[git log --oneline -1]] يطبع آخر commit هناك. [[&&]] بيضمن إن لو الـ pull فشل مفيش حاجة بعده تتنفذ. والعلامات المفردة حوالين الأمر عشان يتنفذ كله على السيرفر مش عندك.

الملفات اللي مش في git (ملف الإعدادات، والصور اللي العملاء رفعوها، والفيديوهات) بتتظبط على السيرفر بإيدك مرة واحدة ومبتتلمسش من الـ pull. وقاعدة البيانات ليها باك أب منفصل من اللوحة.

بعد الـ pull: [[php -l]] على الملفات المهمة، و smoke test بـ curl (الدروس اللي بعده، وتاب التشخيص).`,
            when: "أي موقع PHP أو static على استضافة مشتركة فيها SSH.",
            mistakes: "في مشروع حقيقي الاتصال كان عن طريق سكربت Python وسيط شايل الباسورد بدل مفتاح SSH مباشر. وحد يعدّل ملف من File Manager على السيرفر فالـ pull يفشل بـ [[Your local changes would be overwritten]]؛ اعمل [[git status]] هناك، واعمل التعديل في الريبو مش على السيرفر. والأخطر: فولدر [[.git]] جوه [[public_html]] مكشوف للنت لو مش مقفول (درس .htaccess)."
          },
          teach: R`## الأول: الـ deploy كله = [[git pull]] على السيرفر

على الاستضافة المشتركة السيرفر نفسه عامل [[git clone]] للريبو جوه فولدر الموقع. فلما تعمل push من جهازك، الـ deploy بقى إنك تقول للسيرفر «اسحب آخر نسخة»، من جهازك عن طريق ssh، في سطر واحد. المثال جزئين: ملف [[~/.ssh/config]] بيختصر بيانات الاتصال، والسطر نفسه.

مفيش استضافة حقيقية هنا، فاتجرّب بـ ٢ أوبونتو 24.04 جوه Docker: واحد «السيرفر» (SSH على بورت 65002 زي Hostinger، ويوزر [[deploy]])، وواحد «جهازك» بمفتاح تجربة اتعمل للتجربة دي بس. والـ GitHub هنا ريبو bare على السيرفر نفسه.

---

## ١. [[~/.ssh/config]] على جهازك

~~~bash
Host shared
    HostName 203.0.113.10
    Port 65002
    User deploy
    IdentityFile ~/.ssh/id_ed25519
~~~

| السطر | معناه |
|---|---|
| [[Host shared]] | اسم مختصر انت بتختاره. كل السطور اللي تحته بتاعته |
| [[HostName 203.0.113.10]] | العنوان الحقيقي (IP أو دومين). ده IP للأمثلة بس، حط بتاعك |
| [[Port 65002]] | بورت SSH. الاستضافات المشتركة غالبًا مش 22 |
| [[User deploy]] | اليوزر على السيرفر |
| [[IdentityFile ~/.ssh/id_ed25519]] | المفتاح الخاص اللي هتدخل بيه |

المسافات في أول السطور للقراية بس. ومن غير الملف ده كنت هتكتب كل مرة:

~~~bash
ssh -p 65002 -i ~/.ssh/id_ed25519 deploy@203.0.113.10
~~~

وبيه بقت [[ssh shared]]. في التجربة (الـ HostName كان اسم كونتينر السيرفر)، أول اتصال:

~~~text ssh shared "hostname; whoami"
Warning: Permanently added '[vps02-sd]:65002' (ED25519) to the list of known hosts.
vps1
deploy
~~~

[[Permanently added]] أول مرة بس: جهازك حفظ «بصمة» السيرفر في [[~/.ssh/known_hosts]]، ولو اتغيرت بعد كده هيحذرك. والبورت بين أقواس مربعة لأنه مش 22.

---

## ٢. سطر الـ deploy

~~~bash
ssh shared 'cd ~/domains/example.com/public_html && git pull -q origin main && git log --oneline -1'
~~~

### علامات التنصيص المفردة

كل اللي بين [[' ']] بيتبعت للسيرفر كنص واحد ويتنفذ **هناك**. من غيرها، شيل جهازك كان هيشوف [[&&]] ويفتكر إن [[git pull]] أمر تاني يتنفذ عندك انت. وكمان [[~]] جوه التنصيص المفرد بتتحوّل على السيرفر لـ [[/home/deploy]] مش لفولدرك انت.

### الأوامر التلاتة (على السيرفر)

| الأمر | بيعمل إيه |
|---|---|
| [[cd ~/domains/example.com/public_html]] | ادخل فولدر الموقع (ده شكل المسار على Hostinger، و cPanel غالبًا [[~/public_html]]) |
| [[git pull -q origin main]] | اسحب branch main من origin وادمجه. [[-q]] (quiet) من غير رسايل التقدم |
| [[git log --oneline -1]] | اطبع آخر commit في سطر واحد ([[-1]] = واحد بس) |

و [[&&]] بينهم: كل واحد يتنفذ بس لو اللي قبله نجح. فلو الـ pull فشل، [[git log]] مش هيتنفذ، ومش هتشوف hash يضحك عليك.

---

## ٣. السطر الأخير: [[git log --oneline -1]] على جهازك

عدّلت نص في [[index.php]] على جهازي، و commit و push، وبعدين السطرين:

~~~text الناتج من السيرفر
8ccafb5 fix: header text
~~~

~~~text الناتج على جهازك
8ccafb5 fix: header text
~~~

نفس الـ hash ([[8ccafb5]]، أول ٧ حروف من رقم الـ commit) ونفس الرسالة = السيرفر عليه آخر نسخة بالظبط.

---

## ٤. لما ميتطابقوش

### نسيت [[git push]]

عملت commit ومعملتش push:

~~~text السيرفر
8ccafb5 fix: header text
~~~

~~~text جهازك
203e7f5 not pushed
~~~

السيرفر سحب آخر حاجة **على origin**، واللي عندك لسه موصلتهاش.

### حد عدّل ملف على السيرفر بإيده

عدّلت [[index.php]] على السيرفر مباشرة (زي ما حد يعدّل من File Manager)، وبعدين جرّبت الـ deploy:

~~~text الناتج
error: Your local changes to the following files would be overwritten by merge:
	index.php
Please commit your changes or stash them before you merge.
Aborting
~~~

و exit 1، فـ [[git log]] متنفذش. git رفض يمسح التعديل اللي على السيرفر. شوف إيه اللي اتغير هناك:

~~~text ssh shared 'cd ~/domains/example.com/public_html && git status --short'
 M index.php
~~~

[[M]] = modified. لو التعديل ده مهم، انقله للريبو على جهازك. ولو لأ، [[git checkout -- index.php]] على السيرفر بيرجّعه زي الريبو، وبعدها الـ pull اشتغل وطلّع [[969d4d4 about page]].

### مش قادر يتصل

~~~text بورت غلط (22)
ssh: connect to host vps02-sd port 22: Connection refused
~~~

~~~text مفتاح مش متضاف
deploy@vps02-sd: Permission denied (publickey,password).
~~~

[[Connection refused]] = البورت أو العنوان غلط في الـ config. و [[Permission denied (publickey...)]] = وصلت للسيرفر بس المفتاح بتاعك مش في لوحة الاستضافة (أو [[IdentityFile]] بيشاور على مفتاح تاني).

---

## الخلاصة

| الخطوة | فين | الأمر |
|---|---|---|
| مرة واحدة | جهازك | [[~/.ssh/config]] بـ Host و Port و User و IdentityFile |
| كل deploy | جهازك | [[git push]] |
| | جهازك ← السيرفر | [[ssh shared 'cd ... && git pull -q origin main && git log --oneline -1']] |
| تتأكد | جهازك | [[git log --oneline -1]] لازم نفس السطر |`,
          lines: [
            "اسم مختصر للسيرفر.",
            "العنوان.",
            "بورت SSH بتاع الاستضافة.",
            "اليوزر.",
            "المفتاح.",
            "على السيرفر: ادخل الفولدر، اسحب آخر نسخة، واطبع آخر commit.",
            "آخر commit عندك: لازم يطابق."
          ],
          sol: R`سطر الـ ssh بيطبع (بسبب [[-q]]) سطر واحد بس من [[git log --oneline -1]] على السيرفر، زي [[a1b2c3d fix: header text]]. و [[git log --oneline -1]] عندك بيطبع نفس السطر بالظبط، نفس الـ hash ونفس الرسالة. ده دليل إن السيرفر عليه آخر نسخة.

وبعد ريفريش للموقع (Ctrl+F5) التعديل ظاهر.

الأغلاط الشائعة: الـ hash مختلف: نسيت [[git push]] قبل الـ ssh. و [[error: Your local changes to the following files would be overwritten by merge]]: حد عدّل ملف على السيرفر بإيده. و [[Host key verification failed]] أو [[Permission denied]]: البورت (Hostinger مثلًا [[65002]]) أو اليوزر في [[~/.ssh/config]] غلط.`
        },
        {
          cmd: "php -l",
          title: "فحص أخطاء syntax في PHP من غير تشغيل",
          desc: "[[php -l]] بيقرا الملف ويتأكد إن مفيهوش غلطة syntax من غير ما ينفذه. على الاستضافة المشتركة غلطة واحدة في ملف متضمّن في كل الصفحات معناها الموقع كله صفحة بيضا أو 500. شغّله قبل الـ push، وبعد الـ pull على السيرفر نفسه عشان نسخة PHP هناك.",
          example: R`php -l index.php
for f in index.php login.php contact.php; do php -l "$f" | tail -1; done
find . -name "*.php" -not -path "./vendor/*" -exec php -l {} \; | grep -v "No syntax errors"
ssh shared 'cd ~/domains/example.com/public_html && php -v | head -1 && php -l index.php'`,
          try: "امسح [[;]] من سطر في ملف PHP وشغّل [[php -l]] عليه: هيقولك رقم السطر. وبعدين قارن [[php -v]] عندك وعلى السيرفر.",
          deep: {
            why: "على الاستضافة المشتركة مفيش لوج قدامك وقت الـ deploy، وغالبًا [[display_errors]] مقفول. فالغلطة بتبان للزوار قبلك. [[php -l]] بيمسكها في ثانية.",
            how: R`[[-l]] يعني lint: PHP بيعمل parse للملف بس. لو سليم يطبع [[No syntax errors detected]]، ولو لأ يطبع الغلطة ورقم السطر ويرجّع exit code غير صفر.

اللوب بيفحص الملفات المهمة ويطبع السطر الأخير بس من كل نتيجة. و [[find ... -exec php -l {} \;]] بيفحص كل ملفات المشروع ما عدا [[vendor]]، و [[grep -v]] بيخفي السليم فمبيفضلش غير المشاكل.

حدوده: syntax بس. دالة مش موجودة، أو [[require]] لملف مش موجود، أو متغير غلط، مش هيشوفهم. دول بيبانوا وقت التشغيل (smoke test).

النسخة مهمة: كود بيستخدم ميزة من PHP 8.3 يعدّي عندك ويفشل على سيرفر 8.1. وعلى cPanel نسخة [[php]] في SSH ممكن تبقى غير النسخة اللي الموقع شغال بيها (MultiPHP)، فشوف نسخة الموقع من اللوحة، وشغّل النسخة دي بالمسار الكامل لو لازم.`,
            when: "قبل كل push، وبعد كل pull على السيرفر، وفي CI لو عندك.",
            mistakes: "تفتكر إن [[No syntax errors]] معناها إن الصفحة شغالة. وتفحص بنسخة PHP على جهازك وتنسى إن السيرفر أقدم."
          },
          teach: R`## الأول: افحص من غير ما تشغّل

[[php -l]] ([[l]] من lint) بيخلي PHP يقرا الملف ويتأكد إن الكلام مكتوب صح (syntax)، من غير ما ينفّذ ولا سطر. المثال ٤ سطور: ملف واحد، وكذا ملف، وكل المشروع، وعلى السيرفر. اتجرّب بـ PHP 8.3.6 على أوبونتو 24.04 جوه Docker (جهاز وسيرفر تجربة زي الدرس اللي فات)، بملف [[index.php]] شلت منه [[;]] عن قصد:

~~~bash
<?php
$title = "Home"
echo $title;
~~~

---

## ١. [[php -l index.php]]

~~~text الناتج
PHP Parse error:  syntax error, unexpected token "echo" in index.php on line 3
Errors parsing index.php
~~~

و exit code 255. نقرا الرسالة:

| الجزء | معناه |
|---|---|
| [[Parse error]] | PHP مقدرش يفهم الكود (parse = يقرا ويحلل) |
| [[unexpected token "echo"]] | لقى [[echo]] في مكان مكانش مستنيه |
| [[on line 3]] | السطر اللي لقى فيه المشكلة |

الغلطة الحقيقية في السطر **2** ([[;]] ناقصة)، بس PHP مخدش باله غير لما وصل [[echo]] في سطر 3 وهو لسه مستني نهاية السطر اللي قبله. فلما يقولك سطر رقم كذا، بص عليه وعلى اللي قبله. والملف السليم:

~~~text الناتج
No syntax errors detected in login.php
~~~

---

## ٢. [[for f in index.php login.php contact.php; do php -l "$f" | tail -1; done]]

| الحتة | معناها |
|---|---|
| [[for f in ...; do ...; done]] | لوب: لكل اسم في القايمة، حطه في المتغير [[f]] ونفّذ اللي بين do و done |
| [[php -l "$f"]] | افحص الملف ده. علامات التنصيص عشان لو الاسم فيه مسافة |
| [[tail -1]] | آخر سطر بس من ناتج كل ملف |

~~~text الناتج
PHP Parse error:  syntax error, unexpected token "echo" in index.php on line 3
Errors parsing index.php
No syntax errors detected in login.php
No syntax errors detected in contact.php
~~~

ليه ملف index طلع سطرين مع إننا قلنا [[tail -1]]؟ لأن سطر [[Parse error]] بيطلع على قناة الأخطاء (stderr)، والـ pipe بيعدّي القناة العادية (stdout) بس. فالخطأ بيعدّي من جنب tail ويظهر على طول، وده كويس: الخطأ مش هيستخبى.

---

## ٣. [[find . -name "*.php" -not -path "./vendor/*" -exec php -l {} \; | grep -v "No syntax errors"]]

نفكّه بالترتيب:

| الحتة | معناها |
|---|---|
| [[find .]] | دوّر في الفولدر ده وكل اللي جواه |
| [[-name "*.php"]] | الملفات اللي اسمها آخره [[.php]] |
| [[-not -path "./vendor/*"]] | ما عدا فولدر vendor (مكتبات Composer، مش كودك) |
| [[-exec php -l {} \;]] | لكل ملف لقيته نفّذ [[php -l]]، و [[{}]] مكانها اسم الملف، و [[\;]] نهاية الأمر |
| [[grep -v "No syntax errors"]] | [[-v]] اعكس: اطبع كل السطور **ما عدا** السليمة |

ضفت ملف [[vendor/lib/x.php]] بايظ وملف [[inc/util.php]] بايظ:

~~~text الناتج
PHP Parse error:  syntax error, unexpected token "echo" in ./index.php on line 3
PHP Parse error:  syntax error, unexpected token "}", expecting ";" in ./inc/util.php on line 1
Errors parsing ./index.php
Errors parsing ./inc/util.php
~~~

الملفات السليمة اختفت، وملف vendor البايظ متفحصش أصلًا. اللي فاضل هو المشاكل بس. ولو مفيش مشاكل خالص: ولا سطر.

---

## ٤. [[ssh shared 'cd ... && php -v | head -1 && php -l index.php']]

نفس الفحص على السيرفر نفسه (اسم [[shared]] من [[~/.ssh/config]] في الدرس اللي فات):

~~~text الناتج
PHP 8.3.6 (cli) (built: Sep  2 2026 12:56:02) (NTS)
No syntax errors detected in index.php
~~~

| الحتة | معناها |
|---|---|
| [[php -v]] | النسخة. [[head -1]] أول سطر بس |
| [[cli]] | النسخة دي بتاعة سطر الأوامر |
| [[NTS]] | Non-Thread-Safe، النوع العادي، مش مهم هنا |

ليه تفحص على السيرفر وانت فحصت عندك؟ لأن الكود ممكن يبقى سليم على PHP 8.4 عندك وغلط على 8.1 على السيرفر (ميزة جديدة السيرفر مش فاهمها). وفي التجربة الجهازين كانوا 8.3.6. وعلى cPanel، [[php]] في SSH ممكن يبقى نسخة غير اللي الموقع شغال بيها، فبص على نسخة الموقع في اللوحة.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| ملف واحد | [[php -l file.php]] |
| المشروع كله، المشاكل بس | [[find . -name "*.php" -not -path "./vendor/*" -exec php -l {} \; ...]] |
| بنسخة السيرفر | نفس الأمر جوه [[ssh shared '...']] |

[[php -l]] بيمسك syntax بس. دالة مش موجودة، أو [[require]] لملف مش موجود، أو قاعدة واقعة، مش هيشوفهم: دول بيبانوا لما الصفحة تتفتح فعلًا.`,
          lines: [
            "افحص ملف واحد.",
            "افحص الملفات المهمة واطبع النتيجة بس.",
            "كل ملفات المشروع ما عدا vendor، واعرض المشاكل بس.",
            "على السيرفر: نسخة PHP هناك، وافحص بيها."
          ],
          sol: R`بعد ما تمسح [[;]]: [[php -l index.php]] بيطبع [[PHP Parse error: syntax error, unexpected token "echo" in index.php on line 3]] و [[Errors parsing index.php]] ويخرج بـ 255. لاحظ إن رقم السطر هو السطر اللي بعد اللي فيه الغلطة، لأن PHP اكتشف المشكلة لما لقى [[echo]]. جربتها.

الملف السليم بيطبع [[No syntax errors detected in login.php]]. و [[php -v]] عندي كان [[PHP 8.4.19 (cli)]]؛ قارنه بالسيرفر، ولو السيرفر أقدم (زي 8.1) ممكن كود شغال عندك يقع هناك.

الغلط الشائع: تفتكر [[php -l]] بيلاقي كل الأخطاء؛ هو syntax بس. فانكشن مش موجودة أو متغير فاضي مش هيبانوا غير وقت التشغيل.`
        },
        {
          cmd: "config.sample.php",
          title: "ملف الإعدادات الحقيقي بره Git",
          desc: "الريبو فيه نسخة نموذج من ملف الإعدادات بقيم وهمية، والملف الحقيقي (باسورد قاعدة البيانات والمفاتيح) في [[.gitignore]]. على أي سيرفر جديد: [[cp]] من النموذج وتملى القيم هناك. كده الأسرار عمرها ما بتوصل GitHub.",
          example: R`grep -n "config.php" .gitignore
git ls-files | grep -E "config\.php$|\.env$"
cp config.sample.php config.php
nano config.php
chmod 600 config.php`,
          try: "في مشروع PHP عندك: اعمل config.sample.php بقيم زي YOUR_DB_PASSWORD، وحط config.php في .gitignore، واتأكد إن [[git ls-files]] مش بيطلّعه.",
          deep: {
            why: "مشاريع PHP القديمة بتكتب باسورد قاعدة البيانات في ملف [[config.php]] جوه الريبو. أول ما الريبو يبقى public، أو حد ياخد نسخة منه، الباسورد راح.",
            how: R`[[config.sample.php]]: نفس شكل الملف الحقيقي بالظبط، بس بقيم زي [[YOUR_DB_PASSWORD]]، ومتعمله commit. أي حد ياخد المشروع يعرف محتاج إيه.

[[.gitignore]] فيه [[config.php]]، فـ [[git add .]] مبيشوفهوش. و [[git ls-files | grep]] بيتأكد إنه مش متتبع أصلًا (لو ظهر، اتعمله commit قبل كده: [[git rm --cached]] وغيّر كل اللي فيه، تاب الأمن).

[[chmod 600]]: القراية لصاحب الملف بس. على أغلب الاستضافات PHP بيشتغل بيوزرك فده كفاية. لو الموقع طلع 500 بعدها، PHP شغال بيوزر تاني، جرّب 640.

الأحسن كمان: حط الملف فولدر فوق [[public_html]] واعمله [[require __DIR__ . '/../config.php']]. لو إعداد PHP باظ في يوم والسيرفر بعت ملفات [[.php]] كنص، الأسرار مش هتبان لأن الملف مش جوه فولدر الموقع أصلًا. ولو لازم يفضل جوه، اقفل الوصول ليه بـ .htaccess.`,
            when: "من أول يوم في أي مشروع فيه باسورد أو مفتاح، PHP أو غيره (نفس فكرة .env.example).",
            mistakes: "النموذج نفسه فيه القيم الحقيقية لأنه اتنسخ من الحقيقي. وإضافة [[config.php]] لـ [[.gitignore]] بعد ما اتعمله commit وتفتكر إن ده كفاية."
          },
          teach: R`## الأول: ملفين بنفس الشكل

| الملف | فيه إيه | في git؟ |
|---|---|---|
| [[config.sample.php]] | نفس شكل الإعدادات بقيم وهمية زي [[YOUR_DB_PASSWORD]] | أيوه |
| [[config.php]] | القيم الحقيقية (باسورد القاعدة، والمفاتيح) | لأ، في [[.gitignore]] |

المثال ٥ أوامر: أول اتنين بيتأكدوا إن الحقيقي برا git، والتلاتة الباقيين على السيرفر. اتجرّب على أوبونتو 24.04 جوه Docker، في ريبو تجربة فيه [[config.sample.php]] بسطرين [[define]].

---

## ١. [[grep -n "config.php" .gitignore]]

[[.gitignore]] ملف بيقول لـ git «الأسامي دي اتجاهلها». و [[grep -n]] بيدوّر على النص ويطبع رقم السطر ([[n]] من number):

~~~text الناتج
3:config.php
~~~

السطر التالت. لو مطبعش حاجة، يبقى الملف مش في [[.gitignore]] وأي [[git add .]] هيضيفه.

---

## ٢. [[git ls-files | grep -E "config\.php$|\.env$"]]

| الحتة | معناها |
|---|---|
| [[git ls-files]] | كل الملفات اللي git **متتبعها** فعلًا (مش اللي في الفولدر) |
| [[grep -E]] | دوّر بـ regex موسّع ([[E]] = extended)، عشان [[|]] تشتغل كـ «أو» |
| [[config\.php$]] | اسم آخره [[config.php]]. [[\.]] نقطة حقيقية (النقطة لوحدها في regex = أي حرف)، و [[$]] = آخر الاسم |
| [[|]] | أو |
| [[\.env$]] | اسم آخره [[.env]] |

النتيجة الصح: **ولا سطر** (و grep بيخرج بـ 1 لأنه ملقاش). و [[config.sample.php]] مش هيطلع لأن آخره [[sample.php]]، والـ [[$]] بتمنع [[config.php]] يطابق في نص الاسم.

### ليه الأمر ده مع إن الملف في [[.gitignore]]؟

لأن [[.gitignore]] بيأثر على الملفات **الجديدة** بس. جربت: عملت commit لـ [[config.php]] بالعافية ([[git add -f]])، فالأمر طلّع:

~~~text الناتج
config.php
~~~

مع إنه في [[.gitignore]]. وبعد [[git rm --cached config.php]] (شيله من تتبع git وسيبه على الديسك) و commit، الأمر رجع مبيطبعش حاجة. بس:

~~~text git show HEAD~1:config.php
<?php
define("DB_PASS", "s3cret");
~~~

الباسورد لسه في التاريخ، أي حد معاه الريبو يشوفه. عشان كده الحل الكامل: [[git rm --cached]]، وكمان **غيّر** الباسورد نفسه.

---

## ٣. [[cp config.sample.php config.php]]

على السيرفر الجديد بعد الـ clone: انسخ النموذج باسم الملف الحقيقي. [[cp]] = copy، المصدر الأول وبعدين الجديد.

---

## ٤. [[nano config.php]]

افتحه وحط القيم الحقيقية مكان [[YOUR_DB_PASSWORD]] وغيرها. والملف ده بيتعمل **على السيرفر** بس، فالقيم عمرها ما بتعدّي على جهازك ولا على GitHub. وبعدها [[git status --short]] مبيطبعش حاجة: git مش شايف الملف أصلًا.

---

## ٥. [[chmod 600 config.php]]

~~~text ls -l config.php
-rw------- 1 root root 59 Oct  6 12:15 config.php
~~~

[[600]] رقمين معناهم كده:

| الرقم | لمين | الصلاحية |
|---|---|---|
| [[6]] | صاحب الملف | قراية (4) + كتابة (2) |
| [[0]] | الجروب | ولا حاجة |
| [[0]] | أي حد تاني | ولا حاجة |

فـ [[-rw-------]]: صاحبه بس يقرا ويكتب. (في التجربة صاحبه root لأني شغّلت كـ root، على الاستضافة هيبقى يوزرك.) لو الموقع طلع 500 بعدها، PHP شغال بيوزر تاني ومش قادر يقرا، جرّب [[640]] (الجروب يقرا).

---

## الخلاصة

| السؤال | الأمر | الإجابة الصح |
|---|---|---|
| الحقيقي متجاهل؟ | [[grep -n "config.php" .gitignore]] | رقم سطر |
| ومش متتبع من قبل كده؟ | [[git ls-files | grep -E ...]] | ولا سطر |
| سيرفر جديد | [[cp config.sample.php config.php]] ثم [[nano]] | |
| محدش غيرك يقراه | [[chmod 600 config.php]] | [[-rw-------]] |
| لقيته متتبع | [[git rm --cached config.php]] وغيّر الأسرار | |`,
          lines: [
            "الملف الحقيقي في .gitignore؟",
            "اتأكد إن Git مش متتبعه ولا .env.",
            "على السيرفر: انسخ النموذج.",
            "املى القيم الحقيقية.",
            "القراية لصاحبه بس."
          ],
          sol: R`[[grep -n "config.php" .gitignore]] بيطبع رقم السطر زي [[3:config.php]]. و [[git ls-files | grep -E "config\.php$|\.env$"]] المفروض مايطبعش ولا سطر. [[config.sample.php]] مش هيظهر لأن الـ regex بيدوّر على اسم آخره [[config.php]] بالظبط، وده آخره [[sample.php]].

لو ظهر [[config.php]]، يبقى اتعمله commit قبل ما تضيفه لـ .gitignore، و .gitignore مابيأثرش على ملف متتبع. الحل [[git rm --cached config.php]] وبعدين commit، وغيّر الباسوردات اللي كانت فيه لأنها لسه في التاريخ.

و [[ls -l config.php]] بعد [[chmod 600]] بيوري [[-rw-------]]. الغلط الشائع: تحط الباسورد الحقيقي في [[config.sample.php]] بالغلط.`
        },
        {
          cmd: ".htaccess",
          title: "تأمين موقع PHP على Apache من غير صلاحيات سيرفر",
          desc: "أغلب الاستضافات المشتركة Apache، و [[.htaccess]] هو المكان الوحيد اللي تتحكم فيه. الملف ده بيمنع تنفيذ PHP في فولدر الرفع، ويقفل ملفات الإعدادات و [[.git]] و [[.env]]، ويمنع عرض محتوى الفولدرات، ويوحّد الدومين، ويعمل روابط من غير .php بشرط إن الملف موجود.",
          example: R`RewriteEngine On
RewriteRule ^uploads/.*\.(php|phtml|phar|php[0-9])$ - [NC,F,L]
RewriteRule ^includes/.*\.php$ - [NC,F,L]
RewriteCond %{HTTP_HOST} ^www\.example\.com$ [NC]
RewriteRule ^(.*)$ https://example.com/$1 [R=301,L]
RedirectMatch 404 /\.(git|env)
<FilesMatch "^(\.env|composer\.(json|lock)|README\.md)$">
    Require all denied
</FilesMatch>
Options -Indexes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^\.]+)$ $1.php [NC,L]
ErrorDocument 404 /404.php
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`,
          try: "بعد أي تعديل: [[curl -sI https://example.com/nope | head -1]] لازم 404، و [[curl -sI https://example.com/login | head -1]] لازم 200. غلطة في الملف بتوقّع الموقع كله بـ 500.",
          flag: "script",
          deep: {
            why: "أشهر اختراق لمواقع PHP: حد يرفع ملف [[shell.php]] على إنه صورة ويفتحه من المتصفح فينفذ أوامر على السيرفر. وتاني أشهر واحد: [[.git]] مكشوف فأي حد ينزّل الكود كله بتاريخه. الملف ده بيقفل الاتنين من غير ما تحتاج root.",
            how: R`في أول قاعدتين: [[-]] يعني متغيّرش الرابط، [[F]] يرجع 403، [[NC]] من غير فرق بين الحروف الكبيرة والصغيرة، [[L]] آخر قاعدة. السطر الأول بيمنع أي ملف PHP بأي امتداد جوه [[uploads/]]، والتاني بيمنع فتح ملفات [[includes/]] (اللي فيها الإعدادات) مباشرة.

الـ www: [[RewriteCond]] شرط على الدومين، ولو تحقق [[R=301]] بيحوّل لنسخة واحدة (محركات البحث تشوف موقع واحد مش اتنين).

[[RedirectMatch 404]]: أي مسار فيه [[/.git]] أو [[/.env]] يرجع 404 كأنه مش موجود. و [[FilesMatch]] مع [[Require all denied]] بيقفل ملفات بالاسم.

[[Options -Indexes]]: فولدر من غير index ميعرضش قايمة ملفاته.

الروابط النضيفة: [[/login]] يفتح [[login.php]]. الشرطين قبلها أساسيين: الطلب مش فولدر ([[!-d]])، وفيه فعلًا ملف بالاسم ده + [[.php]] ([[-f]]). [[$1]] هو اللي اتطابق بين القوسين.

[[ErrorDocument 404]]: صفحة 404 بتاعتك، وبترجع كود 404 حقيقي.

[[Header always set]] جوه [[IfModule]]: headers الأمان، ولو [[mod_headers]] مش موجود الملف ميبوظش.`,
            when: "أي موقع PHP على Apache. وخصوصًا لو فيه رفع ملفات من المستخدمين.",
            mistakes: R`في مشروع حقيقي كان فيه [[RewriteRule ^([^\.]+)$ $1.php]] من غير شرط إن ملف [[.php]] موجود، فأي رابط غلط زي [[/nope]] بيتحول لـ [[nope.php]] اللي مش موجود، و [[/admin/]] بيتحول لـ [[admin/.php]] (جربتها على Apache 2.4.58: الـ 404 بقت جاية من ملف مش موجود بدل الصفحة نفسها)، وعلى إعدادات تانية ممكن يلف في loop ويطلع 500 بدل 404. وكان فيه قاعدة بتحوّل أي فولدر لصفحة تانية بـ 302 والدومين مكتوب فيها ثابت. واختبر بـ curl بعد كل تعديل، وشوف [[error_log]] من لوحة الاستضافة لو طلع 500.`
          },
          teach: R`## الأول: [[.htaccess]] = إعدادات Apache لفولدر واحد

على الاستضافة المشتركة مش بتلمس إعدادات Apache نفسه، بس بتحط ملف اسمه [[.htaccess]] في فولدر الموقع، و Apache بيقراه مع **كل طلب** ويطبّقه على الفولدر ده واللي جواه. المثال ١٩ سطر، كل مجموعة منهم بتقفل باب.

اتجرّب بالظبط على Apache 2.4.58 مع mod_php (أوبونتو 24.04 جوه Docker)، بموقع تجربة فيه [[index.php]] و [[login.php]] و [[uploads/shell.php]] و [[includes/config.php]] و [[.env]] وفولدر [[.git]]، وطلبات بـ curl على http (مفيش شهادة هنا) مع [[Host: example.com]]. ده الفرق قبل الملف وبعده:

| الطلب | من غير .htaccess | بالملف |
|---|---|---|
| [[/login]] | 404 | 200 |
| [[/nope]] | 404 | 404 (صفحتك) |
| [[/uploads/shell.php]] | 200 (اتنفذ!) | 403 |
| [[/uploads/x.phtml]] | 200 (اتنفذ!) | 403 |
| [[/uploads/a.jpg]] | 200 | 200 |
| [[/uploads/]] | 200 (قايمة الملفات) | 403 |
| [[/includes/config.php]] | 200 | 403 |
| [[/.env]] | 200 | 403 |
| [[/.git/config]] | 200 | 404 |
| [[/composer.json]] و [[/README.md]] | 200 | 403 |
| [[www.example.com/login]] | 404 | 301 لـ [[https://example.com/login]] |

لاحظ إن Apache من غير الملف كان بيدّي [[.env]] لأي حد، وبينفّذ PHP مرفوع في uploads.

---

## ١. [[RewriteEngine On]]

شغّل mod_rewrite (موديول بيعيد كتابة الروابط) للفولدر ده. من غيره أي سطر [[RewriteRule]] بيتجاهل.

---

## ٢. أول قاعدتين: منع

~~~bash
RewriteRule ^uploads/.*\.(php|phtml|phar|php[0-9])$ - [NC,F,L]
RewriteRule ^includes/.*\.php$ - [NC,F,L]
~~~

[[RewriteRule]] ليها ٣ أجزاء: الـ pattern (regex على المسار من غير [[/]] الأولانية)، والهدف، والـ flags بين [[[ ]]].

### الـ pattern بتاع السطر الأول

| الحتة | معناها |
|---|---|
| [[^]] | أول المسار |
| [[uploads/]] | فولدر uploads |
| [[.*]] | أي حاجة (أي حرف، أي عدد) |
| [[\.]] | نقطة حقيقية |
| القوسين وجواهم الامتدادات | واحد منهم: [[php]] أو [[phtml]] أو [[phar]] أو [[php[0-9]]] (يعني php5 و php7 وغيرهم). الخط العمودي بينهم معناه «أو» |
| [[$]] | آخر المسار |

ليه كل الامتدادات؟ لأن السيرفر بينفّذ أكتر من امتداد: في التجربة [[x.phtml]] اتنفذ وطبع [[pwned]] قبل الملف.

### الهدف والـ flags

| الحتة | معناها |
|---|---|
| [[-]] | متغيّرش الرابط |
| [[NC]] | No Case: [[SHELL.PHP]] زي [[shell.php]] |
| [[F]] | Forbidden: رجّع 403 |
| [[L]] | Last: متكمّلش باقي القواعد |

والسطر التاني نفس الفكرة لـ [[includes/]]: الملفات دي بتتعمل [[require]] من جوه PHP، ومحدش يفتحها من المتصفح مباشرة.

---

## ٣. الـ www

~~~bash
RewriteCond %{HTTP_HOST} ^www\.example\.com$ [NC]
RewriteRule ^(.*)$ https://example.com/$1 [R=301,L]
~~~

[[RewriteCond]] شرط على القاعدة اللي بعده على طول. [[%{HTTP_HOST}]] الدومين اللي الزائر كتبه. فـ «لو الدومين www.example.com»: خد المسار كله [[(.*)]]، و [[$1]] هو اللي اتمسك بين القوسين، وابعته لـ [[https://example.com/$1]]. و [[R=301]] تحويل دائم (المتصفح ومحركات البحث بيحفظوه):

~~~text curl -sI -H "Host: www.example.com" localhost/login
HTTP/1.1 301 Moved Permanently
Location: https://example.com/login
~~~

---

## ٤. [[RedirectMatch 404 /\.(git|env)]]

أي مسار فيه [[/.git]] أو [[/.env]] رجّع 404، كأنه مش موجود أصلًا. [[RedirectMatch]] من موديول تاني (mod_alias) فمش محتاج [[RewriteEngine]]. في التجربة [[/.git/config]] و [[/.git/HEAD]] بقوا 404 (قبلها [[/.git/HEAD]] كان بيرجّع [[ref: refs/heads/main]]).

---

## ٥. [[FilesMatch]]

~~~bash
<FilesMatch "^(\.env|composer\.(json|lock)|README\.md)$">
    Require all denied
</FilesMatch>
~~~

[[<FilesMatch "regex">]] ... [[</FilesMatch>]] بلوك: اللي جواه بيتطبق على الملفات اللي اسمها بيطابق. و [[Require all denied]] = محدش يوصله (403). ده اللي خلى [[/.env]] يرجع 403 مش 404: الاتنين اتطبقوا، و 403 كسب.

---

## ٦. [[Options -Indexes]]

لو حد فتح فولدر مفيهوش [[index.php]] أو [[index.html]]، Apache بيعرض قايمة بكل الملفات اللي فيه. قبل الملف [[/uploads/]] رجّع صفحة عنوانها [[Index of /uploads]] وفيها [[a.jpg]]. [[-Indexes]] بتقفل ده: 403.

---

## ٧. الروابط من غير [[.php]]

~~~bash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^\.]+)$ $1.php [NC,L]
~~~

| السطر | معناه |
|---|---|
| [[%{REQUEST_FILENAME}]] | مسار الملف على الديسك اللي الطلب بيشاور عليه |
| [[!-d]] | [[-d]] = فولدر موجود، و [[!]] = مش. يعني «الطلب مش فولدر» |
| [[.php -f]] | ولو ضفت [[.php]] للمسار، فيه ملف ([[-f]]) بالاسم ده فعلًا |
| [[^([^\.]+)$]] | مسار كله من غير ولا نقطة. [[[^\.]]] = أي حرف غير النقطة |
| [[$1.php]] | افتح نفس الاسم + .php |

فـ [[/login]] بيفتح [[login.php]] (200)، و [[/nope]] مبيتلمسش لأن [[nope.php]] مش موجود، فبيوصل لـ 404 عادي. ومن غير الشرطين جربت: [[/admin/]] اتحوّل لـ [[admin/.php]]، و [[/nope]] بقى طلب لـ [[nope.php]]، يعني القاعدة بتلعب في روابط ملهاش علاقة بيها.

---

## ٨. [[ErrorDocument 404 /404.php]]

لما الرد يبقى 404، اعرض الصفحة دي. في التجربة [[/nope]] طبع [[custom 404]] والـ status فضل 404 (لأن [[404.php]] نفسه بيقول [[http_response_code(404)]]).

---

## ٩. headers الأمان

~~~bash
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
~~~

| الحتة | معناها |
|---|---|
| [[<IfModule mod_headers.c>]] | طبّق اللي جوه بس لو الموديول موجود، وإلا اتجاهله من غير ما توقّع الموقع |
| [[Header always set]] | ضيف الـ header ده لكل رد، حتى ردود الأخطاء ([[always]]) |
| [[Strict-Transport-Security]] | المتصفح يستخدم https بس للدومين ده لمدة 31536000 ثانية (سنة) |
| [[X-Content-Type-Options: nosniff]] | المتصفح ميخمّنش نوع الملف (فملف مرفوع كصورة ميتنفذش كـ script) |
| [[Referrer-Policy]] | لما حد يدوس لينك لموقع تاني، ابعتله الدومين بس مش الرابط كامل |

والثلاثة ظهروا فعلًا في رد [[curl -sI]].

---

## ١٠. غلطة واحدة = الموقع كله 500

Apache بيقرا الملف مع كل طلب، فأي سطر مش فاهمه بيوقّع كل الصفحات. جربت سطرين:

~~~text RewriteRule ^x$ y [R=301 L]   (الفاصلة ناقصة بين الـ flags)
/                            500
/login                       500
.htaccess: RewriteRule: bad flag delimiters
~~~

~~~text Headr always set X-A b   (اسم مكتوب غلط)
/                            500
.htaccess: Invalid command 'Headr', perhaps misspelled or defined by a module not included in the server configuration
~~~

السطر التالت في كل واحد من [[error.log]] (على cPanel: Errors أو error_log). فبعد أي تعديل: [[curl -sI]] على صفحة موجودة وصفحة مش موجودة، ولو 500 رجّع النسخة القديمة فورًا.

---

## الخلاصة

| السطور | بتقفل إيه |
|---|---|
| قاعدتين [[F]] | تنفيذ PHP في uploads، وفتح includes مباشرة |
| [[RewriteCond %{HTTP_HOST}]] | نسختين من الموقع (www ومن غيرها) |
| [[RedirectMatch 404]] و [[FilesMatch]] | [[.git]] و [[.env]] وملفات المشروع |
| [[Options -Indexes]] | قايمة ملفات الفولدر |
| آخر ٣ Rewrite | روابط من غير .php، بس لملف موجود فعلًا |
| [[ErrorDocument]] | صفحة 404 بكود 404 |
| [[IfModule]] و [[Header]] | headers الأمان من غير ما توقّع الموقع |`,
          lines: [
            "شغّل محرك الـ rewrite.",
            "أي ملف PHP جوه uploads: ممنوع (403).",
            "ملفات includes (الإعدادات) متتفتحش مباشرة.",
            "لو الدومين بالـ www...",
            "...حوّله لنسخة واحدة من غير www (301).",
            "أي مسار فيه .git أو .env يرجع 404.",
            "الملفات دي بالاسم...",
            "...ممنوعة.",
            "قفلة.",
            "الفولدر من غير index ميعرضش ملفاته.",
            "لو الطلب مش فولدر...",
            "...وفيه ملف بنفس الاسم + .php...",
            "...افتحه: /login يفتح login.php.",
            "صفحة 404 بكود 404 حقيقي.",
            "لو mod_headers موجود:",
            "المتصفح يستخدم https بس لمدة سنة.",
            "متخمّنش نوع الملف.",
            "ابعت الدومين بس للمواقع التانية مش الرابط كامل.",
            "قفلة."
          ],
          sol: R`بعد أي تعديل: [[curl -sI https://example.com/nope | head -1]] لازم [[HTTP/2 404]]، و [[curl -sI https://example.com/login | head -1]] لازم [[HTTP/2 200]] (الـ login من غير .php اشتغل بسبب آخر 3 سطور Rewrite). و [[/.env]] أو [[/.git/config]] بيرجعوا [[403]] أو [[404]].

لو أي واحد رجّع [[HTTP/2 500]] بعد تعديل: الملف فيه غلطة (غالبًا directive من موديول مش موجود أو قوس ناقص)، والموقع كله واقع. رجّع النسخة القديمة فورًا، و error log في cPanel بيقول السطر ([[Invalid command 'Header'...]] أو [[RewriteRule: bad flag delimiters]]).

جربت الملف ده بالظبط على Apache 2.4.58 (أوبونتو 24.04 جوه Docker، على http بـ Host header): [[/nope]] رجّع 404 بصفحة [[404.php]]، و [[/login]] 200، و [[uploads/shell.php]] و [[/.env]] و [[includes/config.php]] 403، و [[/.git/config]] 404، و www اتحوّل بـ 301. وسطر [[RewriteRule ^x$ y [R=301 L]]] (الفاصلة ناقصة) وقّع الموقع كله بـ 500 واللوج قال [[RewriteRule: bad flag delimiters]]. الغلط الشائع: [[/login]] بيرجع 404: الـ [[RewriteCond %{REQUEST_FILENAME}.php -f]] محتاج الملف [[login.php]] يبقى في نفس الفولدر، أو [[RewriteEngine On]] مش في الأول.`
        },
        {
          cmd: "curl -I .git/config",
          title: "اتأكد من بره إن الملفات الحساسة مقفولة",
          desc: "مش كفاية تكتب قواعد المنع، لازم تجرّبها من بره زي أي زائر. [[.git/config]] و [[.env]] وملف الإعدادات لازم يرجعوا 403 أو 404. لو واحد فيهم رجع 200، دي حالة طوارئ: الكود أو الأسرار متاحين لأي حد.",
          example: R`curl -sI https://example.com/.git/config | head -1
curl -sI https://example.com/.env | head -1
curl -sI https://example.com/includes/config.php | head -1
curl -sI https://example.com/uploads/ | head -1
curl -sI https://example.com | grep -iE "strict-transport|x-content-type"`,
          try: "شغّلهم على موقعك دلوقتي. وبعدين جرّب [[curl -s https://example.com/.git/HEAD]]: لو رجع [[ref: refs/heads/main]] يبقى .git مكشوف فعلًا.",
          deep: {
            why: "[[.git]] مكشوف معناه إن أدوات جاهزة تقدر تنزّل الريبو كله ملف ملف وتعيد بناءه، بكل التاريخ، بما فيه أي باسورد اتعمله commit في يوم. والبوتات بتدوّر على [[/.git/config]] و [[/.env]] على كل موقع في النت كل يوم.",
            how: R`[[-sI]]: هادي، و headers بس. [[head -1]]: سطر الـ status بس ([[HTTP/2 404]] مثلًا).

المتوقع: [[.git/config]] و [[.env]]: 403 أو 404. [[includes/config.php]]: 403 (لو مش مقفول ممكن يرجع 200 بصفحة فاضية، لأن PHP بينفذه ومبيطبعش حاجة. مش مكشوف بس الأحسن يبقى مقفول). [[uploads/]]: 403 (مفيش عرض ملفات).

السطر الأخير: headers الأمان موجودة فعلًا في الرد.

ولو لقيت حاجة مكشوفة: اقفلها الأول، وبعدين اعتبر كل الأسرار اللي كانت في الريبو أو [[.env]] اتسربت وغيّرها، لأنك مش عارف مين نزّلها قبل ما تاخد بالك.`,
            when: "بعد أول deploy، وبعد أي تعديل في .htaccess أو إعداد السيرفر، وضيفه في smoke test الـ deploy.",
            mistakes: "تجرّب من المتصفح وهو فاكر نسخة قديمة. وتجرّب على http بس وتنسى https (ممكن يبقوا virtual hosts مختلفين). وتقفل .git وتفتكر إن الموضوع خلص من غير ما تغيّر الأسرار."
          },
          teach: R`## الأول: جرّب زي أي زائر

القواعد اللي في [[.htaccess]] مش بتتأكد منها بقرايتها، بتتأكد منها بطلب من بره. المثال ٥ طلبات بـ [[curl]] على أكتر ملفات بتتسرق، والإجابة الصح لكل واحد. اتجرّب على Apache 2.4.58 (أوبونتو 24.04 جوه Docker) بموقع التجربة بتاع الدرس اللي فات، مرة بملف [[.htaccess]] ومرة من غيره. والطلبات كانت على [[http://localhost]] مع [[-H "Host: example.com"]] (مفيش شهادة هنا)، فالسطر الأول بيطلع [[HTTP/1.1]]. على موقعك الحقيقي بـ https هتشوف [[HTTP/2]].

---

## ١. نفك أول سطر

~~~bash
curl -sI https://example.com/.git/config | head -1
~~~

| الحتة | معناها |
|---|---|
| [[curl]] | اطلب الرابط |
| [[-s]] | silent: من غير شريط تقدم |
| [[-I]] | headers بس (طلب HEAD)، من غير محتوى الملف |
| [[/.git/config]] | ملف إعدادات git. موجود في أي ريبو، فالبوتات بتجرّبه على كل المواقع |
| [[head -1]] | أول سطر بس من الرد: سطر الـ status |

والسطور التلاتة اللي بعده نفس الشكل بمسارات تانية.

---

## ٢. الناتج: محمي ولا لأ

| الطلب | محمي (بـ .htaccess) | مكشوف (من غيره) |
|---|---|---|
| [[/.git/config]] | [[HTTP/1.1 404 Not Found]] | [[HTTP/1.1 200 OK]] |
| [[/.env]] | [[HTTP/1.1 403 Forbidden]] | [[HTTP/1.1 200 OK]] |
| [[/includes/config.php]] | [[HTTP/1.1 403 Forbidden]] | [[HTTP/1.1 200 OK]] |
| [[/uploads/]] | [[HTTP/1.1 403 Forbidden]] | [[HTTP/1.1 200 OK]] |

| الرقم | معناه هنا |
|---|---|
| [[200]] | السيرفر بعت الملف. **مشكلة** في أول ٣ سطور |
| [[403]] | Forbidden: الملف موجود والسيرفر رافض |
| [[404]] | Not Found: السيرفر بيقول مش موجود (حتى لو موجود). ده الأحسن لـ [[.git]]: مبيأكدش وجوده |

### الـ 200 معناها إيه بالظبط؟

من غير [[.htaccess]] طلبت الملفات نفسها من غير [[-I]]:

~~~text curl -s .../.env
DB_PASS=secret
~~~

~~~text curl -s .../.git/HEAD
ref: refs/heads/main
~~~

الباسورد اتقري، و [[.git/HEAD]] رجّع محتواه، يعني فولدر [[.git]] كله متاح، وأدوات زي git-dumper بتنزّل الريبو ملف ملف وتبنيه بكل تاريخه. ومع الحماية نفس الطلب رجّع صفحة الـ 404 بتاعة الموقع ([[custom 404]]).

وفي [[includes/config.php]]: الـ 200 هنا رجّع صفحة فاضية، لأن PHP نفّذ الملف وهو مبيطبعش حاجة. يعني مش مكشوف زي [[.env]]، بس الأحسن 403: لو إعداد PHP باظ في يوم، الملف هيتبعت كنص.

---

## ٣. السطر الأخير: headers الأمان

~~~bash
curl -sI https://example.com | grep -iE "strict-transport|x-content-type"
~~~

| الحتة | معناها |
|---|---|
| [[curl -sI https://example.com]] | headers الصفحة الرئيسية |
| [[grep -i]] | من غير فرق بين الحروف الكبيرة والصغيرة (HTTP/2 بيكتب الأسامي صغيرة، و HTTP/1.1 زي ما اتكتبت) |
| [[-E "a|b"]] | السطر اللي فيه ده أو ده |

~~~text الناتج (محمي)
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
~~~

ومن غير [[.htaccess]] الأمر مطبعش ولا سطر: الـ headers مش موجودة.

---

## الخلاصة

| الطلب | الصح | لو طلع 200 |
|---|---|---|
| [[/.git/config]] | 404 أو 403 | الكود كله بتاريخه متاح: اقفله، وغيّر أي سر اتعمله commit في يوم |
| [[/.env]] | 403 أو 404 | الأسرار اتقرت: اقفله وغيّرها كلها |
| [[/includes/config.php]] | 403 | مش كارثة، بس اقفله |
| [[/uploads/]] | 403 | قايمة الملفات المرفوعة ظاهرة: [[Options -Indexes]] |
| headers | السطرين ظاهرين | [[mod_headers]] مش شغال أو الـ IfModule مش متطبق |

وجرّب على https مش http بس، ومن curl مش المتصفح (المتصفح ممكن يعرض نسخة قديمة من الـ cache).`,
          lines: [
            "فولدر Git: لازم 403 أو 404.",
            "ملف الأسرار: نفس الكلام.",
            "ملف الإعدادات: 403.",
            "فولدر الرفع: مفيش قايمة ملفات.",
            "headers الأمان موجودة في الرد؟"
          ],
          sol: R`في الحالة الآمنة كل الأوامر الأربعة الأولى بترجع [[HTTP/2 403]] أو [[HTTP/2 404]]، والأخير بيطبع [[strict-transport-security: max-age=31536000]] و [[x-content-type-options: nosniff]].

و [[curl -s https://example.com/.git/HEAD]] المفروض يرجع صفحة 404 أو 403 (HTML)، مش [[ref: refs/heads/main]]. جربت سيرفر PHP من غير حماية وفولدر [[.git]] جواه: رجّع [[ref: refs/heads/main]] بالظبط، يعني أي حد يقدر ينزّل الكود كله بأدوات زي git-dumper.

لو ظهر مكشوف: اقفله فورًا ([[RedirectMatch 404 /\.(git|env)]] في .htaccess)، وغيّر كل الأسرار اللي كانت في الريبو. الغلط الشائع: [[/uploads/]] بيرجع 200 وقايمة ملفات: [[Options -Indexes]] مش شغال.`
        },
        {
          cmd: "cron PHP",
          title: "مهمة مجدولة PHP على الاستضافة",
          desc: "من لوحة الاستضافة (Cron Jobs) شغّل السكربت بـ PHP CLI بالمسار الكامل، مش عن طريق رابط. وجوه السكربت شرط [[php_sapi_name()]] بيمنع حد يشغّله من المتصفح. ولو الاستضافة مش بتدي غير cron بـ URL، المفتاح يبقى طويل وعشوائي وفي ملف الإعدادات بره git، مش مكتوب في السكربت.",
          example: R`0 8 * * * /usr/bin/php /home/deploy/domains/example.com/public_html/cron/reminders.php >> /home/deploy/cron.log 2>&1
<?php
// cron/reminders.php
require __DIR__ . '/../../config.php';
if (php_sapi_name() !== 'cli') {
    $key = (string)($_GET['key'] ?? '');
    if (CRON_KEY === '' || !hash_equals(CRON_KEY, $key)) { http_response_code(403); exit('forbidden'); }
}
date_default_timezone_set('Africa/Cairo');
echo "done " . date('Y-m-d H:i') . "\n";`,
          try: "افتح رابط السكربت من المتصفح من غير key: لازم forbidden. وشغّله من SSH بـ [[php cron/reminders.php]]: لازم يشتغل.",
          flag: "script",
          deep: {
            why: "مهام زي التذكيرات والتقارير لازم تشتغل لوحدها. لو السكربت جوه [[public_html]] ومن غير حماية، أي حد يعرف الرابط يشغّله ١٠٠ مرة ويبعت ١٠٠ إيميل لكل عميل.",
            how: R`سطر الـ cron: نفس صيغة crontab. المسار الكامل لـ PHP (اللوحة بتقولك هو إيه، وعلى cPanel ممكن يبقى زي [[/opt/alt/php82/usr/bin/php]] لنسخة معينة)، والمسار الكامل للسكربت، والناتج لملف لوج.

[[php_sapi_name()]]: بترجع [[cli]] لما السكربت شغال من الترمنال أو cron. من المتصفح بترجع حاجة تانية، فهنا بنطلب المفتاح.

[[hash_equals]]: مقارنة بتاخد نفس الوقت مهما كان الفرق، فمحدش يقدر يخمّن المفتاح حرف حرف من سرعة الرد. و [[CRON_KEY === '']] عشان لو المفتاح فاضي في الإعدادات ميبقاش الباب مفتوح.

[[config.php]] فوق [[public_html]] (مش جوه الموقع) وفيه [[CRON_KEY]]، تولّده بـ [[openssl rand -hex 32]].

لو مفيش غير cron بـ URL: [[curl -fsS "https://example.com/cron/reminders.php?key=..." > /dev/null]]. بس المفتاح في الرابط بيتسجل في access log، فالـ CLI أحسن دايمًا.

والمهمة لازم تتحمل إنها تشتغل مرتين: سجّل كل تذكير اتبعت في جدول، ومتبعتش اللي اتسجل.`,
            when: "أي مهمة متكررة على استضافة مشتركة: تذكيرات، وتقارير، وتنضيف جلسات قديمة.",
            mistakes: "في مشروع حقيقي المفتاح السري كان مكتوب جوه ملف الـ cron نفسه ومترفوع على git، يعني أي حد شاف الريبو يقدر يشغّل المهمة؛ الحل تنقله لملف الإعدادات بره git وتغيّره. و [[php]] من غير مسار كامل في cron ياخد نسخة PHP غير نسخة الموقع."
          },
          teach: R`## الأول: سطر cron + سكربت بيحمي نفسه

المثال جزئين: سطر cron بتحطه في لوحة الاستضافة (Cron Jobs) بيشغّل السكربت بـ PHP من سطر الأوامر، وأول السكربت نفسه، اللي بيتأكد إن محدش بيشغّله من المتصفح من غير مفتاح. اتجرّب على أوبونتو 24.04 جوه Docker: PHP 8.3 من سطر الأوامر، و Apache 2.4.58 بـ mod_php للطلبات من «المتصفح» (بـ curl)، والسكربت في [[/var/www/site/cron/reminders.php]] و [[config.php]] في [[/var/www]] (فولدر فوق الموقع، زي ما هيبقى فوق [[public_html]]).

---

## ١. سطر الـ cron

~~~bash
0 8 * * * /usr/bin/php /home/deploy/domains/example.com/public_html/cron/reminders.php >> /home/deploy/cron.log 2>&1
~~~

| الحتة | معناها |
|---|---|
| [[0 8 * * *]] | كل يوم ٨:٠٠ الصبح بتوقيت السيرفر (درس صيغة cron) |
| [[/usr/bin/php]] | PHP نفسه بمسار كامل. على أوبونتو ده اختصار لـ [[/etc/alternatives/php]] |
| المسار الطويل | السكربت بمسار كامل، لأن cron مش بيبدأ من فولدر الموقع |
| [[>> /home/deploy/cron.log 2>&1]] | ضيف الناتج والأخطاء في لوج |

الأهم: السكربت بيتشغّل كـ **ملف** بـ PHP، مش بطلب رابط. فمفيش مفتاح بيعدّي على النت ولا بيتسجل في أي لوج. ولوحة الاستضافة بتقولك مسار PHP عندها (على cPanel ممكن يبقى [[/usr/local/bin/php]] أو مسار لنسخة محددة).

---

## ٢. أول السكربت

~~~bash
<?php
// cron/reminders.php
require __DIR__ . '/../../config.php';
~~~

| الحتة | معناها |
|---|---|
| [[<?php]] | بداية كود PHP |
| [[// ...]] | تعليق، PHP بيتجاهله |
| [[require]] | اقرا الملف ده ونفّذه هنا، ولو مش موجود اقف خالص |
| [[__DIR__]] | الفولدر اللي السكربت نفسه فيه ([[/var/www/site/cron]] في التجربة) |
| [[.]] | لزق نصين في PHP |
| [[/../../config.php]] | اطلع فولدرين ([[..]] = الفولدر اللي فوق): من [[cron]] لـ [[site]] لـ [[www]] |

ليه [[__DIR__]] مش مسار نسبي بس؟ لأن cron بيشغّل من فولدر تاني، والمسار النسبي بيتحسب من المكان اللي cron واقف فيه مش من مكان السكربت. ولو الملف مش في مكانه، جربت:

~~~text الناتج (أوله)
PHP Warning:  require(/var/www/site/cron/../../config.php): Failed to open stream: No such file or directory in /var/www/site/cron/reminders.php on line 3
PHP Fatal error:  Uncaught Error: Failed opening required '/var/www/site/cron/../../config.php' ...
~~~

الرسالة بتقولك المسار اللي دوّر فيه بالظبط، فتعرف محتاج كام [[..]].

---

## ٣. الحارس

~~~bash
if (php_sapi_name() !== 'cli') {
    $key = (string)($_GET['key'] ?? '');
    if (CRON_KEY === '' || !hash_equals(CRON_KEY, $key)) { http_response_code(403); exit('forbidden'); }
}
~~~

### [[php_sapi_name()]]

[[SAPI]] = Server API: PHP شغال إزاي. جربت ملف بيطبعها:

| شغّلته من | طبع |
|---|---|
| الترمنال أو cron ([[php file.php]]) | [[cli]] |
| المتصفح على Apache بـ mod_php | [[apache2handler]] |
| المتصفح على PHP-FPM (أغلب الاستضافات) | [[fpm-fcgi]] (من الـ docs) |

و [[!==]] = «مش بيساوي» (بالنوع كمان). فـ «لو مش cli» يعني «جاي من الويب»: هات المفتاح.

### [[$key = (string)($_GET['key'] ?? '');]]

| الحتة | معناها |
|---|---|
| [[$_GET['key']]] | قيمة [[?key=...]] من الرابط |
| [[?? '']] | لو مش موجودة، خد نص فاضي (بدل ما PHP يطلع warning) |
| [[(string)]] | حوّلها نص. لو حد بعت [[?key[]=x]] هتبقى array، وده بيضمن إنها نص |

### الشرط

| الحتة | معناها |
|---|---|
| [[CRON_KEY === '']] | لو المفتاح في الإعدادات فاضي، ارفض. من غيرها مفتاح فاضي + [[?key=]] فاضي = الباب مفتوح |
| [[hash_equals(CRON_KEY, $key)]] | قارن النصين في وقت ثابت، فمحدش يقدر يعرف كام حرف صح من سرعة الرد |
| [[||]] و [[!]] | «أو» و «مش». الشرط كله: فاضي أو مش مطابق |
| [[http_response_code(403)]] | الـ status يبقى 403 |
| [[exit('forbidden')]] | اطبع forbidden واقف، مفيش سطر بعده يتنفذ |

---

## ٤. آخر سطرين

~~~bash
date_default_timezone_set('Africa/Cairo');
echo "done " . date('Y-m-d H:i') . "\n";
~~~

[[date_default_timezone_set]] بيخلي [[date()]] يحسب بتوقيت القاهرة مهما كان توقيت السيرفر. و [[date('Y-m-d H:i')]] سنة-شهر-يوم ساعة:دقيقة. السطر ده مكان الشغل الحقيقي (التذكيرات)، وبيطبع إنه خلص عشان يتكتب في [[cron.log]].

---

## ٥. التجربة (الـ try)

المفتاح اتعمل بـ [[openssl rand -hex 32]]: ٣٢ byte عشوائي مكتوبين hex = ٦٤ حرف، وحطيته في [[config.php]] كـ [[define("CRON_KEY", "...")]].

| التشغيل | الناتج |
|---|---|
| [[php cron/reminders.php]] (زي cron) | [[done 2026-10-06 15:18]] و exit 0 |
| من الويب من غير key | [[forbidden]] و 403 |
| من الويب بـ [[?key=abc]] | [[forbidden]] و 403 |
| من الويب بالمفتاح الصح | [[done 2026-10-06 15:18]] و 200 |
| [[CRON_KEY]] فاضي و [[?key=]] فاضي | [[forbidden]] و 403 |

لاحظ [[15:18]]: السيرفر كان UTC (الساعة 12:18)، والسكربت طبع بتوقيت القاهرة. ولما شغّلته بالمفتاح من الويب، Apache سجّل الرابط كله في الـ access log:

~~~text other_vhosts_access.log (مقطوع)
"GET /cron/reminders.php?key=4aecdb1129443463c5cb6be2c1ee346c...
~~~

يعني المفتاح بقى مكتوب في ملف لوج. عشان كده الـ CLI أحسن دايمًا، والرابط بالمفتاح للاستضافة اللي مفيهاش غيره بس.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| cron بيشغّل [[/usr/bin/php file.php]] | مفيش مفتاح على النت، و SAPI = cli |
| [[require __DIR__ . '/../../config.php']] | الإعدادات بره الموقع، والمسار شغال من أي مكان |
| [[php_sapi_name() !== 'cli']] | الويب بس هو اللي بيتسأل على مفتاح |
| [[CRON_KEY === '']] | مفتاح فاضي = مقفول |
| [[hash_equals]] | مقارنة متتخمنش |
| [[date_default_timezone_set]] | الوقت بتوقيتك مش توقيت السيرفر |`,
          lines: [
            "كل يوم ٨ الصبح: شغّل السكربت بـ PHP CLI، والناتج للوج.",
            "بداية ملف PHP.",
            "الإعدادات من فولدر فوق الموقع (فيها CRON_KEY).",
            "لو مش شغال من cron أو الترمنال...",
            "...خد المفتاح من الرابط.",
            "مفتاح فاضي أو غلط: 403 واقف.",
            "قفلة.",
            "التوقيت.",
            "اطبع إنه خلص (بيتكتب في اللوج)."
          ],
          sol: R`من المتصفح من غير key: الصفحة بتطبع [[forbidden]] والـ status [[403]]. ومع [[?key=]] الصح بتشتغل. ومن SSH: [[php cron/reminders.php]] بيطبع [[done 2026-09-30 08:05]] بتوقيت القاهرة. جربت التلات حالات بسيرفر PHP محلي وطلعوا كده.

ده لأن [[php_sapi_name()]] بيرجع [[cli]] من الترمنال و cron، فالسكربت مش محتاج key، ومن الويب بيرجع حاجة تانية زي [[fpm-fcgi]] فبيطلب key.

الأغلاط الشائعة: [[Failed opening required '.../config.php']]: المسار [[/../../config.php]] معمول على إن config بره public_html بمستويين؛ عدّله حسب مكانه. و cron مابيشتغلش: [[/usr/bin/php]] على الاستضافة ممكن يبقى نسخة تانية (cPanel بيدّيك مسار زي [[/usr/local/bin/php]] أو [[ea-php82]]). اقرا [[cron.log]].`
        },
        {
          cmd: ".user.ini",
          title: "إعدادات PHP للجلسات من غير php.ini",
          desc: "على الاستضافة المشتركة مش بتعدّل [[php.ini]]، بس تقدر تحط [[.user.ini]] في فولدر الموقع. السطور دي بتأمّن كوكي الجلسة: JavaScript مش بيقراها، ومبتتبعتش غير على https، و SameSite ضد CSRF، والجلسات في فولدر بتاعك انت.",
          example: R`session.use_strict_mode = 1
session.cookie_httponly = 1
session.cookie_secure = 1
session.cookie_samesite = "Lax"
session.save_path = "/home/deploy/tmp/sessions"`,
          try: "اعمل الفولدر الأول ([[mkdir -p ~/tmp/sessions && chmod 700 ~/tmp/sessions]])، وبعد ٥ دقايق افتح DevTools وشوف كوكي PHPSESSID: HttpOnly و Secure عليهم علامة.",
          flag: "script",
          deep: {
            why: "كوكي الجلسة هو الدخول نفسه. لو JavaScript يقدر يقراها، أي ثغرة XSS بتسرقها. ولو بتتبعت على http، أي حد على نفس الواي فاي ياخدها. والإعدادات الافتراضية على كتير من الاستضافات مش مقفولة.",
            how: R`[[use_strict_mode]]: PHP ميقبلش session id هو اللي معملهوش (ضد session fixation). [[cookie_httponly]]: [[document.cookie]] مش شايفها. [[cookie_secure]]: https بس. [[cookie_samesite = "Lax"]]: الكوكي مبتتبعتش مع طلبات POST جاية من مواقع تانية.

[[save_path]]: الافتراضي فولدر [[/tmp]] مشترك، وتنضيف الجلسات فيه ماشي بإعدادات حد تاني. فولدر بتاعك بصلاحيات 700، ولازم يكون موجود وإلا الجلسات تفشل. ولو الفولدر ده مش بيتنضف لوحده، ضيف cron يمسح القديم.

[[.user.ini]] بيشتغل مع PHP-FPM و CGI (أغلب الاستضافات النهاردة). مع mod_php القديم مش بيتقري، وهناك بتكتب [[php_value]] في .htaccess. و PHP بيقراه كل ٥ دقايق ([[user_ini.cache_ttl]])، فالتغيير مش فوري. تتأكد بـ [[ini_get('session.cookie_secure')]] في صفحة تجربة، وامسحها بعدها.`,
            when: "أي موقع PHP فيه login على استضافة مشتركة.",
            mistakes: "في مشروع حقيقي مسار الجلسات كان مكتوب بـ [[session_save_path()]] وفيه اسم حساب الاستضافة، ومتكرر في عشرات الملفات؛ مكانه سطر واحد هنا. و [[cookie_secure]] وانت لسه بتجرّب على http فالدخول ميشتغلش. وتعدّل وتختبر فورًا وتفتكر إنه مشتغلش (استنى الـ cache)."
          },
          teach: R`## الأول: [[php.ini]] صغير لفولدر واحد

[[php.ini]] ملف إعدادات PHP للسيرفر كله، ومش في إيدك على الاستضافة المشتركة. بس PHP بيدوّر كمان على ملف اسمه [[.user.ini]] في فولدر الصفحة اللي بتتفتح (والفولدرات اللي فوقه لحد أول الموقع)، ويطبّق اللي فيه. المثال ٥ سطور كلهم عن كوكي الجلسة ([[PHPSESSID]]): الكوكي اللي بيقول للسيرفر «ده نفس اليوزر اللي عمل login».

اتجرّب على أوبونتو 24.04 جوه Docker: Apache 2.4.58 و PHP 8.3 بـ PHP-FPM (زي أغلب الاستضافات)، وصفحة فيها [[session_start()]] بتطبع [[php_sapi_name()]] و [[ini_get(...)]].

---

## ١. صيغة السطر

[[اسم.الإعداد = القيمة]]: نفس صيغة [[php.ini]]. [[1]] = شغّال، و [[0]] = مقفول، والنصوص بين علامات تنصيص.

---

## ٢. السطور الخمسة

| السطر | معناه |
|---|---|
| [[session.use_strict_mode = 1]] | لو المتصفح بعت session id السيرفر معملهوش، ارفضه واعمل واحد جديد. ده بيمنع session fixation: حد يدّيك رابط فيه id هو عارفه، وبعد ما تعمل login يدخل بيه |
| [[session.cookie_httponly = 1]] | JavaScript مش شايف الكوكي ([[document.cookie]] مبيرجّعهاش)، فثغرة XSS متقدرش تسرقها |
| [[session.cookie_secure = 1]] | الكوكي متتبعتش غير على https، فمحدش على نفس الواي فاي يشوفها |
| [[session.cookie_samesite = "Lax"]] | الكوكي متتبعتش مع طلب POST جاي من موقع تاني (ضد CSRF)، بس بتتبعت لو حد دخل من لينك عادي |
| [[session.save_path = "..."]] | ملفات الجلسات تتحفظ في الفولدر ده بدل [[/tmp]] المشترك مع كل اللي على السيرفر |

---

## ٣. التجربة: قبل وبعد

[[Set-Cookie]] header بيبعته السيرفر عشان المتصفح يحفظ الكوكي. من غير [[.user.ini]]:

~~~text الناتج
Set-Cookie: PHPSESSID=8onpco2amknfp6fioad8e0o7k6; path=/
fpm-fcgi  /var/lib/php/sessions
~~~

السطر التاني من الصفحة: SAPI = [[fpm-fcgi]]، و [[httponly]] فاضي (مقفول)، والجلسات في المكان الافتراضي. وبعد ما حطيت الملف:

~~~text الناتج
Set-Cookie: PHPSESSID=s6lrmic6n6ei1evjdhgh4bgq47; path=/; secure; HttpOnly; SameSite=Lax
fpm-fcgi 1 /home/deploy/tmp/sessions
~~~

[[secure]] و [[HttpOnly]] و [[SameSite=Lax]] اتضافوا للكوكي، و [[ini_get]] بقى [[1]] والمسار الجديد. ده نفس اللي هتشوفه في DevTools ← Application ← Cookies.

---

## ٤. ليه مش بيتطبق على طول أحيانًا: [[user_ini.cache_ttl]]

~~~text php -r 'echo ini_get("user_ini.cache_ttl");'
300
~~~

كل عملية PHP-FPM بتقرا [[.user.ini]] وتحفظه ٣٠٠ ثانية (٥ دقايق) قبل ما تبص عليه تاني. ومع FPM فيه كذا عملية شغالين مع بعض، كل واحدة ليها نسختها. ده اتشاف في التجربة: غيّرت [[save_path]] لفولدر تاني وبعدين رجّعته، و ٦ طلبات ورا بعض طلّعوا:

~~~text الناتج
fpm-fcgi 1 /home/deploy/tmp/sessions
fpm-fcgi 1 /home/deploy/tmp/nope
fpm-fcgi 1 /home/deploy/tmp/sessions
fpm-fcgi 1 /home/deploy/tmp/nope
~~~

نص العمليات لسه شايلة الإعداد القديم. فبعد أي تعديل، استنى ٥ دقايق قبل ما تحكم.

---

## ٥. فولدر الجلسات لازم يبقى موجود ويتكتب فيه

الـ try بيعمله الأول:

~~~bash
mkdir -p ~/tmp/sessions && chmod 700 ~/tmp/sessions
~~~

[[700]] = صاحبه بس يدخل ويقرا ويكتب. على الاستضافة PHP بيشتغل بيوزرك، فده كفاية. في التجربة PHP كان شغال بيوزر تاني ([[www-data]]) ومقدرش يوصل لفولدر جوه home اليوزر:

~~~text error.log (مختصر)
PHP Warning:  session_start(): open(/home/deploy/tmp/sessions/sess_8d5n1jctkuan7pdjfuo2qlrjs6, O_RDWR) failed: Permission denied
~~~

الصفحة نفسها اتعرضت عادي، بس الجلسة متحفظتش: يعني الـ login هيقع مع كل صفحة. بعد ما صلّحت الصلاحيات، الفولدر بقى فيه ملفات زي [[sess_2fougmi1md68tlkfg18ucqa3aa]]، ملف لكل جلسة باسم الـ id بتاعها.

---

## ٦. مش كل PHP بيقرا [[.user.ini]]

| PHP شغال إزاي ([[php_sapi_name()]]) | بيقرا [[.user.ini]]؟ |
|---|---|
| [[fpm-fcgi]] (PHP-FPM) | أيوه (اتجرّب) |
| [[cgi-fcgi]] | أيوه (من الـ docs) |
| [[apache2handler]] (mod_php) | لأ، وهنا بتكتب [[php_value]] و [[php_flag]] في [[.htaccess]] |
| [[cli-server]] ([[php -S]] للتجربة على جهازك) | لأ: جربته والكوكي طلعت من غير أي حاجة من دول |

---

## الخلاصة

| عايز | السطر |
|---|---|
| id مزوّر يترفض | [[use_strict_mode = 1]] |
| JavaScript ميشوفش الكوكي | [[cookie_httponly = 1]] |
| https بس | [[cookie_secure = 1]] (وعلى http الـ login مش هيشتغل) |
| ضد CSRF | [[cookie_samesite = "Lax"]] |
| جلساتك في فولدرك | [[save_path]] لفولدر موجود بصلاحية 700 |

وبعد أي تعديل استنى ٥ دقايق، واتأكد من [[Set-Cookie]] أو DevTools، مش من إنك عدّلت الملف.`,
          lines: [
            "متقبلش session id مش انت اللي عامله.",
            "JavaScript مش شايف الكوكي.",
            "https بس.",
            "متتبعتش مع POST من مواقع تانية.",
            "الجلسات في فولدر بتاعك (لازم يكون موجود)."
          ],
          sol: R`بعد حوالي ٥ دقايق (PHP بيقرا [[.user.ini]] كل [[user_ini.cache_ttl]] = 300 ثانية)، في DevTools › Application › Cookies، كوكي [[PHPSESSID]] عليه علامة في [[HttpOnly]] و [[Secure]]، و [[SameSite]] مكتوب [[Lax]].

للتأكد من غير DevTools: صفحة فيها [[<?php echo ini_get('session.cookie_httponly'), ini_get('session.save_path');]] بتطبع [[1]] والمسار بتاعك. و [[ls ~/tmp/sessions]] بعد ما تفتح الموقع بيوري ملفات [[sess_...]].

جربتها على Apache و PHP-FPM (أوبونتو 24.04 جوه Docker) مش على استضافة حقيقية: الكوكي طلع [[secure; HttpOnly; SameSite=Lax]]، ومع [[php -S]] أو mod_php الملف اتجاهل. الأغلاط الشائعة: مفيش أي تغيير بعد ساعة: الاستضافة شغالة بـ mod_php مش FPM/CGI، و [[.user.ini]] مابيتقريش أصلًا؛ جرّب [[php_value]] في .htaccess. و [[session_start(): open(...) failed: No such file]]: الفولدر مش موجود أو المسار فيه اسم يوزر غلط، والجلسات كلها بتقع.`
        }
      ]
    }
]);
