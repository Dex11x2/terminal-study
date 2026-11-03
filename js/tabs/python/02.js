// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "أول سكربت Python",
      l: 1,
      n: "تكتب ملف .py وتشغّله على أي نظام، ياخد arguments أو يسأل، يطبع تقرير مترتب، ويرجّع exit code صح",
      projects: [
        { lvl: 'صغير', t: R`قسّم الفاتورة`, what: R`[[split.py TOTAL PEOPLE [TIP%]]] بيحسب نصيب كل واحد بعد البقشيش ويطبع جدول صغير مترتب بـ f-strings. من دروس [[sys.argv]] والـ exit codes والتقارير.`, done: R`[[split.py 450 4 10]] بيطبع نصيب كل واحد [[123.75]] والإجمالي [[495.00]]، و arguments ناقصة أو مش أرقام أو عدد ناس صفر بيطبع usage على stderr ويخرج بـ ٢.` },
        { lvl: 'صغير', t: R`خمّن الرقم`, what: R`لعبة بـ [[input]]: الكمبيوتر بيختار رقم من ١ لـ ١٠٠ والمستخدم عنده ٧ محاولات، وكل مرة يقوله أكبر أو أصغر. [[--seed N]] (من [[sys.argv]]) بيثبّت الرقم عشان تختبرها.`, done: R`بـ [[--seed]] نفس الرقم كل مرة، والكلام الغلط مبيحسبش محاولة، وبتخرج بـ ٠ لو كسبت و ١ لو خسرت، و [[printf '50\n75\n' | python guess.py --seed 1]] بيشتغل من غير كيبورد.` },
        { lvl: 'متوسط', t: R`[[pywc]]: نسخة من wc`, what: R`[[pywc.py [-l] [-w] [-c] FILE...]] بيعد السطور والكلمات والحروف لكل ملف وإجمالي، والخيارات بتتقري من [[argv]] بإيدك، والملف المش موجود على stderr والباقي يكمّل. بهيكل [[main(argv) -> int]].`, done: R`على لينكس أرقامه مطابقة لـ [[wc]] لنفس الملفات (و [[-c]] بيعد bytes زيه)، والملف المش موجود بيخلّي الـ exit code ١، وفيه اختبارات pytest لدالة العد.` },
        { lvl: 'متوسط', t: R`تقرير فولدر`, what: R`[[folder_report.py FOLDER [TOP]]] بيطبع أكبر TOP ملفات، وبعدها جدول لكل امتداد: عدد الملفات والحجم ونسبته، بأحجام مقروءة (KB و MB). من درس التقارير.`, done: R`الأعمدة على خط واحد حتى مع أسامي طويلة (بتتقص بـ [[...]])، والنسب مجموعها ١٠٠٪، و [[> report.txt]] بياخد التقرير بس، وفولدر فاضي بيطبع «مفيش ملفات» من غير قسمة على صفر.` },
        { lvl: 'كبير', t: R`preflight: فحص قبل النشر`, what: R`سكربت بيتشغّل قبل أي deploy: بيفحص إن [[config.json]] موجود وسليم وفيه المفاتيح المطلوبة، وإن متغيرات البيئة المطلوبة موجودة ([[os.environ]])، وإن الملفات والفولدرات اللي في الـ config موجودة. بيطبع جدول فيه [[OK]] أو [[FAIL]] لكل فحص، وبيخرج بكود مختلف لكل نوع مشكلة (٢ config، ٣ env، ٤ ملفات)، و [[-q]] بيخلّيه يطبع الفاشل بس. كله بـ [[sys.argv]] و [[main]] و stderr للأخطاء، واختبارات بـ [[subprocess.run]] لكل exit code.`, done: R`[[python preflight.py && echo deploying]] بيكمّل بس لما كله سليم، وكل نوع مشكلة بيطلّع الكود بتاعه، والاختبارات بتغطي الأربع حالات، واتشغّل مرتين ورا بعض بنفس النتيجة (مبيكتبش ولا يغيّر أي ملف).`, ext: R`زوّد [[--json]] عشان CI يقرا النتيجة، وفحص إن بورت معيّن فاضي، ولما توصل لدرس argparse انقل الخيارات ليه.` },
        { lvl: 'فكرة', t: R`أول أداة يومية بتاعتك`, what: R`اختار حاجة بتعملها بإيدك كل يوم في الترمنال (تفتح نفس الفولدرات، تحسب حاجة، تكتب ملاحظة بالتاريخ) وحوّلها لسكربت بأمر واحد بالهيكل اللي اتعلمته: shebang و [[main]] و exit codes وتقرير مترتب.`, done: R`بتستخدمه فعلًا أسبوع، وبيشتغل باسمه من أي فولدر (على لينكس من [[~/.local/bin]]، وعلى ويندوز بـ [[py]] أو function في الـ profile)، وفيه [[--help]] بسيط مكتوب بإيدك.`, ext: R`خلّيه يحفظ تاريخ اللي عمله في ملف، ويطبع ملخص الأسبوع.` },
      ],
      items: [
        {
          cmd: "python3 script.py",
          title: "شغّل أول سكربت",
          desc: R`السكربت ملف نصي عادي امتداده [[.py]] فيه أوامر Python، بيتنفّذ من أول سطر لآخر سطر. بتكتبه في أي editor وتشغّله من الترمنال بـ [[python3 hello.py]]، وأي كلام بعد اسم الملف بيوصل للسكربت في [[sys.argv]].

اسم الأمر بيختلف حسب النظام: على لينكس وماك [[python3]] (و [[python]] ساعات مش موجود خالص). على ويندوز [[python]] أو [[py]]، و [[py]] ده launcher بيختار النسخة لو عندك أكتر من واحدة.

اللغة نفسها (المتغيرات و if و loops والدوال و classes) في تاب «Python و FastAPI». هنا بنركّز على إزاي تكتب سكربت بيعمل شغل حقيقي على جهازك أو على السيرفر.`,
          example: R`# Linux و Mac:
python3 --version
python3 hello.py
python3 hello.py Sara
python3 -i hello.py
# Windows (PowerShell):
py --version
py --list
py hello.py Sara
py -3.14 hello.py`,
          try: R`اعمل [[hello.py]] فيه 4 سطور: [[import sys]]، و [[name = sys.argv[1] if len(sys.argv) > 1 else "world"]]، و [[print(f"hello {name}")]]، و [[print("python", sys.version.split()[0], "from", sys.executable)]]. شغّله من غير اسم وباسم، وبعدين بـ [[python3 -i hello.py]] واكتب [[name]] بعد ما يخلص. وجرّب تشغّله وانت واقف في فولدر تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سكربت [[z.py]] فيه ٣ سطور: [[print("a")]] و [[x = 1/0]] و [[print("b")]]. هيطبع إيه بالترتيب، والـ exit code كام؟ وبعدين شغّله.`, done: R`طبع [[a]] وبعده traceback آخره [[ZeroDivisionError: division by zero]]، و [[b]] مطبعتش خالص، والـ exit code ١. وفهمت إن السكربت بيتنفّذ سطر سطر وبيقف عند أول exception محدش مسكه.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[python -h]] بس، اعرف [[-i]] و [[-u]] و [[-q]] و [[-I]] بيعملوا إيه، واكتب لكل واحد إمتى تستخدمه.`, done: R`كتبت: [[-i]] يفتح الـ REPL بعد ما السكربت يخلص (تفتّش في المتغيرات)، و [[-u]] من غير buffer (الناتج يظهر فورًا في لوج أو pipe)، و [[-q]] من غير رسالة الإصدار، و [[-I]] معزول عن متغيرات البيئة وفولدر اليوزر (للسكربتات اللي بتقرا ملفات مش موثوقة).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[hello.py]] فيه [[open("names.txt")]] وشغال من فولدره. اقف في فولدر تاني وشغّله بمساره الكامل. إيه اللي حصل، وصلّحه بحيث يشتغل من أي فولدر.`, done: R`وقع بـ [[FileNotFoundError]] لأن المسار النسبي بيتحسب من الفولدر اللي انت واقف فيه مش فولدر السكربت، وصلّحته بـ [[Path(__file__).parent / "names.txt"]] (درس «Path(__file__).parent»)، وبقى شغال من أي مكان.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[sysinfo.py]] بيطبع: نسخة Python، والنظام ([[platform.system()]])، والفولدر الحالي ([[Path.cwd()]])، وفولدر السكربت، وعدد الـ arguments اللي جتله.`, done: R`شغّلته من فولدرين مختلفين: الفولدر الحالي اتغيّر وفولدر السكربت ثابت، و [[py sysinfo.py a "b c"]] قال إن الـ arguments ٢ مش ٣.` },
            { lvl: 'تطبيق', t: R`**أشكال:** [[stairs.py N]] بيطبع سلّمة نجوم: أول سطر [[*]] وآخر سطر N نجمة. ولو N مش رقم أو أصغر من ١ يطبع طريقة الاستخدام.`, done: R`[[py stairs.py 4]] طبع ٤ سطور: [[*]] و [[**]] و [[***]] و [[****]]، و [[py stairs.py x]] و [[py stairs.py 0]] طبعوا [[usage: stairs.py N]] ومطلعش traceback.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل [[python -X importtime -c "import json"]] واقرا الناتج (على stderr). أنهي موديول أخد أطول وقت؟ وبعدين قارن بـ [[import pathlib]].`, done: R`فهمت إن كل سطر فيه وقت الموديول لوحده ([[self]]) والوقت التراكمي ([[cumulative]]) بالميكروثانية، وكتبت أكبر موديول في كل واحدة، وعرفت إن ده اللي بيخلّي سكربت بيعمل import لحاجات كتير يبدأ بطيء.` },
          ],
          deep: {
            why: "أي حاجة بتعملها بإيدك أكتر من مرتين (تنقل ملفات، تجمع أرقام من شيتات، تشيّك على موقع) تتكتب سكربت مرة وتتشغّل بأمر واحد. والسكربت بيتحفظ في git، ويتجدول، وحد تاني يقدر يشغّله.",
            how: R`[[python3 hello.py]]: Python بيقرا الملف كله، يحوّله bytecode، وينفّذه من فوق لتحت. مفيش دالة main إجبارية زي C أو Java، أول سطر على مستوى الملف هو أول حاجة بتتنفّذ.

[[sys.executable]] بيقولك أنهي Python بالظبط اللي شغّال. لو الـ venv متفعّل هتلاقيه جوه [[.venv]]، ودي أسرع طريقة تعرف المكتبات هتيجي منين.

ويندوز: Python من python.org بيسطّب [[py]] (الـ installer العادي، و «Python install manager» اللي python.org بيرشّحه من 3.14). [[py]] لوحده بيشغّل أحدث نسخة، و [[py -3.14]] نسخة معيّنة لو متسطبة، و [[py --list]] بيعرض النسخ المتسطّبة. ولو الـ venv متفعّل، [[py]] بيشغّل Python بتاع الـ venv. ولو كتبت [[python]] واتفتح Microsoft Store أو طلع [[Python was not found]]، ده alias من ويندوز نفسه ومعناه إن Python مش متسطب: يا تسطّبه من python.org، يا تقفل الـ alias من Settings ثم Apps ثم Advanced app settings ثم App execution aliases.

[[python3 -i hello.py]] بيشغّل السكربت وبعدين يفتح الـ REPL ومعاك كل المتغيرات اللي اتعملت. مفيد تبص على النتيجة أو تجرّب دالة من غير ما تعدّل الملف.`,
            when: "أي مهمة بتتكرر. ولو المهمة سطر واحد بيوصّل أوامر موجودة، bash أو PowerShell ممكن يبقوا أقصر (درس «bash ولا Python ولا PowerShell» في المستوى ٣).",
            mistakes: R`تكتب [[hello.py]] لوحده في الترمنال فيطلع [[command not found]] (محتاج [[python3 hello.py]] أو shebang، الدرس الجاي). وتشغّله من فولدر تاني فيطلع [[python3: can't open file '/tmp/hello.py': [Errno 2] No such file or directory]]: المسار نسبي للفولدر اللي انت واقف فيه. وتسمّي السكربت [[random.py]] أو [[email.py]] أو [[csv.py]] فيغطّي على موديول Python الأصلي (درس «python -m»).`
          },
          teach: R`## المثال بيعمل إيه؟

بيشغّل سكربت صغير اسمه [[hello.py]] بأكتر من طريقة: من غير كلام بعده، وبكلمة، وبعدين يفتح Python تفاعلي بعده. والنص التاني نفس الكلام على ويندوز بالـ launcher [[py]]. الأوامر محتاجة ملف [[hello.py]]، وده محتواه (نفس اللي في «جرّب» وفي الحل):

~~~python hello.py
import sys
name = sys.argv[1] if len(sys.argv) > 1 else "world"
print(f"hello {name}")
print("python", sys.version.split()[0], "from", sys.executable)
~~~

اتشغّل على أوبونتو 24.04 ([[docker run --rm ubuntu:24.04]] و Python من apt) وعلى ويندوز 11 بـ Python 3.14 في PowerShell 7.

---

## ١. السكربت نفسه، سطر سطر

### [[import sys]]

[[sys]] موديول في المكتبة الأساسية فيه معلومات عن Python اللي شغال: الـ arguments ونسخته ومكانه. [[import]] بيجيبه عشان تستخدمه.

### [[name = sys.argv[1] if len(sys.argv) > 1 else "world"]]

نقراه من جوه:

| الحتة | معناها |
|---|---|
| [[sys.argv]] | list (لستة) فيها اسم السكربت وبعده كل كلمة اتكتبت بعده في الأمر. **argv** = argument vector |
| [[len(sys.argv)]] | عدد العناصر |
| [[> 1]] | فيه حاجة غير اسم السكربت؟ |
| [[sys.argv[1] ]] | العنصر رقم 1، يعني أول كلمة بعد الاسم (العد بيبدأ من 0، و 0 هو اسم السكربت) |
| [[A if COND else B]] | لو الشرط صح خد A، غير كده B |

يعني: «لو فيه كلمة خدها، لو مفيش خد [["world"]]». الشرط ده بيمنع [[IndexError]] لما تشغّله من غير كلام.

### [[print(f"hello {name}")]]

[[f]] قبل الـ quote يعني f-string: أي حاجة بين [[{}]] بتتبدل بقيمتها.

### [[print("python", sys.version.split()[0], "from", sys.executable)]]

[[print]] لما تديله كذا حاجة مفصولة بفواصل بيطبعهم بمسافة بينهم.

- [[sys.version]] نص طويل: [[3.12.3 (main, Aug 31 2026, 10:18:26) [GCC 13.3.0] ]].
- [[.split()]] بيقسّمه عند المسافات لـ list: [[['3.12.3', '(main,', 'Aug', ...] ]].
- [[[0] ]] أول عنصر: [[3.12.3]] بس.
- [[sys.executable]] المسار الكامل لبرنامج Python اللي شغّال دلوقتي.

---

## ٢. لينكس وماك

### [[python3 --version]]

~~~text الناتج
Python 3.12.3
~~~

### [[python3 hello.py]] و [[python3 hello.py Sara]]

~~~text الناتج
hello world
python 3.12.3 from /usr/bin/python3
hello Sara
python 3.12.3 from /usr/bin/python3
~~~

الأولى [[sys.argv]] كانت [[['hello.py'] ]] فخد [["world"]]، والتانية [[['hello.py', 'Sara'] ]]. و [[/usr/bin/python3]] يعني Python بتاع النظام، مش venv.

الشيل هو اللي بيقسّم الكلام عند المسافات: [[python3 hello.py two words]] طبع [[hello two]] (كلمتين وصلوا عنصرين)، و [[python3 hello.py "two words"]] طبع [[hello two words]] (الـ quotes خلّتهم عنصر واحد).

### [[python3 -i hello.py]]

[[-i]] من **interactive**: شغّل السكربت، وبعد ما يخلص **متقفلش**، افتح الـ REPL (السطر اللي بيبدأ بـ [[>>>]] وبتكتب فيه Python سطر سطر) ومعاك كل المتغيرات اللي اتعملت:

~~~text الناتج (بعد سطري السكربت)
>>> name
'world'
>>> sys.argv
['hello.py']
~~~

تخرج بـ [[exit()]] أو Ctrl+D (على ويندوز Ctrl+Z وبعدها Enter).

### من فولدر تاني

~~~text الناتج: cd /tmp && python3 hello.py
python3: can't open file '/tmp/hello.py': [Errno 2] No such file or directory
~~~

والـ exit code كان 2. [[hello.py]] اسم نسبي، يعني «في الفولدر اللي أنا فيه دلوقتي». ادخل الفولدر بـ [[cd]] أو اكتب المسار كامل.

---

## ٣. ويندوز: [[py]]

### [[py --version]] و [[py --list]]

~~~text الناتج
Python 3.14.3
 -V:3.14[-64] *   Python 3.14.3
~~~

[[--list]] بيعرض النسخ المتسطّبة. [[-V:3.14]] اسم النسخة اللي تكتبه بعد [[py]]، و [[[-64] ]] يعني 64-bit، و [[*]] يعني «دي الافتراضية».

### [[py hello.py Sara]]

~~~text الناتج
hello Sara
python 3.14.3 from C:\Users\ali\AppData\Local\Python\pythoncore-3.14-64\python.exe
~~~

نفس السكربت من غير تعديل. المسار ده مكان Python لما يتسطّب بـ «Python install manager».

### [[py -3.14 hello.py]]

[[-3.14]] يعني «شغّل بالنسخة دي بالظبط». ولو طلبت نسخة مش متسطّبة:

~~~text الناتج: py -3.12 hello.py
[ERROR] No runtime installed that matches 3.12. Try running "py install 3.12".
~~~

---

## المقارنة

| عايز | لينكس وماك | ويندوز |
|---|---|---|
| النسخة | [[python3 --version]] | [[py --version]] |
| النسخ المتسطّبة | [[ls /usr/bin/python3*]] (طلّع [[python3]] و [[python3.12]]) | [[py --list]] |
| شغّل | [[python3 hello.py Sara]] | [[py hello.py Sara]] أو [[python hello.py Sara]] |
| نسخة معيّنة | [[python3.12 hello.py]] | [[py -3.14 hello.py]] |
| شغّل وافتح REPL | [[python3 -i hello.py]] | [[py -i hello.py]] |

## الخلاصة

- السكربت بيتنفّذ من أول سطر لآخر سطر، ومفيش main إجباري.
- الكلام اللي بعد اسم الملف بيوصل في [[sys.argv]]، والشيل هو اللي بيقسّمه.
- [[sys.executable]] بيقولك أنهي Python شغّال، فبيقولك المكتبات هتيجي منين.
- المسار النسبي نسبةً للفولدر اللي انت واقف فيه.`,
          lines: [
            R`بيطبع نسخة Python اللي اسمها [[python3]] في الـ PATH. اعمله أول حاجة على أي جهاز جديد: سكربت مكتوب لنسخة أحدث (زي [[match]] اللي محتاجة 3.10) هيقع على نسخة أقدم بـ SyntaxError.`,
            R`بيشغّل الملف [[hello.py]] بـ Python من أوله لآخره، وبعدين البرنامج يخلص ويرجّعك للترمنال. الملف لازم يكون في الفولدر الحالي، أو تكتب مساره.`,
            R`أي كلمة بعد اسم الملف بتوصل للسكربت في [[sys.argv]]: [[sys.argv[0] ]] اسم السكربت، و [[sys.argv[1] ]] هو [["Sara"]]. كده نفس السكربت يشتغل على بيانات مختلفة من غير ما تعدّله.`,
            R`[[-i]] بيشغّل السكربت عادي، وبدل ما يقفل في الآخر بيفتحلك الـ REPL ([[>>>]]) ومعاك كل المتغيرات والدوال اللي اتعملت. مفيد لما السكربت يقع: تبص على قيم المتغيرات وقت الوقوع. و [[exit()]] بيطلّعك.`,
            R`على ويندوز: [[py]] هو الـ launcher اللي بيتسطّب مع Python من python.org، و [[--version]] بيقول أنهي نسخة هيشغّلها افتراضيًا. استخدم [[py]] أو [[python]]، لأن [[python3]] على ويندوز ممكن يبقى اختصار بيفتح Microsoft Store.`,
            R`[[py --list]] بيطبع كل نسخ Python المتسطّبة، وعلامة [[*]] جنب اللي هتشتغل افتراضيًا. لو عندك أكتر من نسخة ومش عارف السكربت شغال بأنهي واحدة، ده أول مكان تبص فيه.`,
            R`نفس [[python3 hello.py Sara]] بس بالـ launcher على ويندوز، و [[sys.argv]] بيوصل فيه نفس الحاجة بالظبط.`,
            R`[[-3.14]] بيختار نسخة معيّنة بدل الافتراضية، مفيد تتأكد إن السكربت شغال على نفس النسخة اللي على السيرفر. النسخة لازم تكون متسطّبة، و [[py --list]] بيقولك عندك إيه.`
          ],
          sol: R`الناتج عندي على أوبونتو 24.04:

[[python3 hello.py]] طبع [[hello world]] وتحتها [[python 3.12.3 from /usr/bin/python3]].
[[python3 hello.py Sara]] طبع [[hello Sara]].
[[python3 -i hello.py]] طبع نفس السطرين وبعدين [[>>>]]، و [[name]] رجّع [['world']]. اخرج بـ [[exit()]] أو Ctrl+D.

وعلى ويندوز 11: [[py --list]] طبع [[-V:3.14[-64] *   Python 3.14.3]]، و [[py hello.py Sara]] طبع [[hello Sara]] وتحتها [[python 3.14.3 from C:\Users\...\python.exe]]. ولما فعّلت venv وشغّلت [[py hello.py]]، المسار بقى [[...\.venv\Scripts\python.exe]].

ولما شغّلته من فولدر تاني بنفس الاسم طلع [[can't open file ... No such file or directory]]: يا تدخل الفولدر بـ cd، يا تكتب المسار كامل.

لو [[sys.executable]] طلع بره الـ venv وانت فاكره متفعّل، يبقى التفعيل اتعمل في ترمنال تاني.`,
          solCode: R`import sys
name = sys.argv[1] if len(sys.argv) > 1 else "world"
print(f"hello {name}")
print("python", sys.version.split()[0], "from", sys.executable)`
        },
        {
          cmd: "#!/usr/bin/env python3",
          title: "سكربت يتشغّل باسمه زي أي أمر",
          desc: R`على لينكس وماك تقدر تشغّل السكربت بـ [[./hello.py]] من غير ما تكتب python3، بشرطين: أول سطر فيه shebang [[#!/usr/bin/env python3]] بيقول للنظام يشغّل الملف بإيه، والملف عليه صلاحية تنفيذ بـ [[chmod +x]].

ولو حطيته من غير [[.py]] في فولدر موجود في الـ PATH (زي [[~/.local/bin]]) يبقى أمر تكتبه من أي مكان، زي [[ls]] و [[git]].

على ويندوز النظام مبيقراش السطر ده، بس الـ launcher [[py]] بيقراه، و Python نفسه بيعتبره تعليق عادي.`,
          example: R`# Linux و Mac:
head -1 hello.py
chmod +x hello.py
./hello.py Sara
mkdir -p ~/.local/bin
cp hello.py ~/.local/bin/hello
hello Ali
# لو طلع command not found:
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
# Windows (PowerShell):
py hello.py Sara`,
          try: R`حط [[#!/usr/bin/env python3]] أول سطر في [[hello.py]]. شغّله بـ [[./hello.py]] قبل [[chmod +x]] وبعدها. وبعدين اعمل نسخة بنهايات سطور ويندوز: [[printf '#!/usr/bin/env python3\r\nprint("hi")\r\n' > crlf.py]] و [[chmod +x crlf.py]] وشغّلها واقرا الرسالة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على لينكس، سكربت فيه shebang بس من غير [[chmod +x]]. [[./h.py]] هيطبع إيه والـ exit code كام؟`, done: R`[[bash: ./h.py: Permission denied]] والـ exit code [[126]] (يعني لقى الملف ومش قادر يشغّله)، وبعد [[chmod +x h.py]] اشتغل.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** سكربت اتكتب على ويندوز ونزل على السيرفر، وبعد [[chmod +x]] بيطلّع [[env: ‘python3\r’: No such file or directory]] والـ exit code ١٢٧. صلّحه.`, done: R`فهمت إن [[\r]] بتاعة نهاية سطر ويندوز (CRLF) بقت جزء من اسم البرنامج، وصلّحتها بـ [[sed -i 's/\r$//' c.py]] (أو [[dos2unix]] أو تخلي المحرر يحفظ LF)، و [[file c.py]] مبقاش بيقول CRLF.` },
            { lvl: 'تطبيق', t: R`**قارن:** في [[docker run --rm -it python:3.12-slim bash]] اعمل سكربتين بيطبعوا [[sys.executable]]: واحد أوله [[#!/usr/bin/env python3]] وواحد أوله [[#!/usr/bin/python3]]. شغّلهم، وبعدين اعمل venv وفعّله وشغّلهم تاني.`, done: R`الـ [[env]] طبع [[/usr/local/bin/python3]] وبعد التفعيل [[/tmp/v/bin/python3]] (أو مسار الـ venv بتاعك). والتاني وقع بـ [[cannot execute: required file not found]] لأن الصورة دي مفيهاش [[/usr/bin/python3]] أصلًا. فـ [[env]] بيلاقي Python من الـ PATH والمسار الثابت لأ.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** على ويندوز اكتب سكربت أوله [[#!/usr/bin/env python3.12]] وشغّله بـ [[py]]، وانت معندكش 3.12. بعدين غيّره لـ [[python3]].`, done: R`الـ launcher قرا السطر وطلّع [[No runtime installed that matches 3.12]] (ومعاها اقتراح [[py install 3.12]] في الـ launcher الجديد)، ومع [[python3]] اشتغل بالنسخة اللي عندك. يعني [[py]] بيقرا الـ shebang على ويندوز وبيختار بيه النسخة.` },
            { lvl: 'تحدي', t: R`**ابني:** أمر اسمه [[today]] في [[~/.local/bin]] (من غير [[.py]]) بيطبع التاريخ ورقم الأسبوع واليوم بالعربي من لستة أيام انت كاتبها.`, done: R`من أي فولدر [[today]] بيطبع مثلًا [[2026-11-03 أسبوع 45 التلات]]، و [[command -v today]] بيطبع المسار، وبعد ما تقفل الترمنال وتفتحه لسه شغال (يعني الـ PATH في [[.bashrc]]).` },
          ],
          deep: {
            why: "الأدوات اللي بتستخدمها كل يوم (backup، تنضيف، تقرير) أسهل لما تبقى أوامر باسمها، من غير ما تفتكر السكربت في أنهي فولدر.",
            how: R`لما تكتب [[./hello.py Sara]]، الـ kernel بيقرا أول حرفين في الملف، يلاقيهم [[#!]]، فبيشغّل [[/usr/bin/env python3 ./hello.py Sara]]. و [[env]] بيدوّر على [[python3]] في الـ PATH، فلو الـ venv متفعّل هياخد Python بتاع الـ venv.

ولو عايز السكربت يستخدم venv معيّن دايمًا (عشان مكتباته)، اكتب المسار كامل: [[#!/home/sara/tools/.venv/bin/python]]. ده أضمن من env في cron، لأن cron مش بيفعّل حاجة.

[[chmod +x]] بيدّي صلاحية التنفيذ. و [[~/.local/bin]] على أوبونتو بيتضاف للـ PATH لوحده من [[~/.profile]] لو الفولدر موجود ساعة الـ login، فلو لسه عامله افتح session جديدة أو ضيفه بإيدك زي آخر سطر في المثال. وعلى ماك الشيل zsh، فالسطر يروح [[~/.zshrc]].

ويندوز: مفيش chmod ولا [[./hello.py]]. [[py hello.py]] بيقرا الـ shebang ويفهم [[#!/usr/bin/env python3]] كـ «أحدث Python 3» (جربتها بـ Python 3.14). ولو الـ installer ربط ملفات [[.py]] بالـ launcher (الـ installer القديم من python.org بيعمل كده)، [[hello.py Sara]] بيشتغل في CMD لوحده. على جهازي «Python install manager» و [[assoc .py]] قال [[File association not found for extension .py]]، فالأضمن [[py hello.py]].`,
            when: "سكربت بتستخدمه كتير على لينكس أو ماك أو سيرفر. ولو ليه مكتبات خارجية، الأحسن تسطّبه كأمر بجد (درس «[project.scripts] و pipx» في المستوى ٣).",
            mistakes: R`ملف متكتب على ويندوز بنهايات CRLF: الـ shebang بيبقى [[python3\r]] والنظام مش لاقيه. وأي حاجة قبل [[#!]] (حتى سطر فاضي أو BOM) بتلغيه. و [[#!/usr/bin/python]] على أوبونتو الجديد مفيش [[python]] أصلًا. ونسيان chmod بيطلع [[Permission denied]]، ومن غير shebang خالص bash بيحاول يقرا الملف كأنه سكربت bash.`
          },
          teach: R`## المثال بيعمل إيه؟

بياخد نفس [[hello.py]] بتاع الدرس اللي فات، ويضيفله سطر في أوله، ويخليه يتشغّل بـ [[./hello.py]]، وبعدين يخليه أمر اسمه [[hello]] تكتبه من أي فولدر. اتجرب على أوبونتو 24.04 ([[docker run --rm ubuntu:24.04]]) بيوزر عادي اسمه sara، والسطر الأخير على ويندوز بـ Python 3.14.

---

## ١. [[head -1 hello.py]]: الـ shebang

[[head]] بيطبع أول سطور ملف، و [[-1]] يعني سطر واحد:

~~~text الناتج
#!/usr/bin/env python3
~~~

ده الـ **shebang** (الاسم من [[#]] اللي بتتقري sharp أو hash و [[!]] اللي بتتقري bang). لازم يكون **أول حاجة** في الملف، أول حرفين بالظبط. معناه:

| الحتة | معناها |
|---|---|
| [[#!]] | علامة للنظام: «السطر ده بيقول الملف يتشغّل بإيه» |
| [[/usr/bin/env]] | برنامج بيدوّر على أمر في الـ PATH ويشغّله |
| [[python3]] | الأمر اللي env هيدوّر عليه |

فلما تكتب [[./hello.py Sara]]، الـ kernel بيشغّل فعليًا:

~~~text اللي بيحصل من ورا
/usr/bin/env python3 ./hello.py Sara
~~~

ليه [[env]] مش [[/usr/bin/python3]] على طول؟ لأن [[env]] بياخد أول python3 في الـ PATH، فلو venv متفعّل هيشغّل Python بتاع الـ venv. وبالنسبة لـ Python نفسه السطر ده بيبدأ بـ [[#]] فهو تعليق عادي.

---

## ٢. [[chmod +x hello.py]]: صلاحية التنفيذ

قبل الـ chmod:

~~~text الناتج
-rw-rw-r-- 1 sara sara 174 Oct  6 17:53 hello.py
-sh: 4: ./hello.py: Permission denied
~~~

والـ exit code كان 126 (يعني «لقيت الملف بس مش قادر أشغّله»). أول عمود في [[ls -l]] هو الصلاحيات: [[rw-]] للصاحب، و [[rw-]] للجروب، و [[r--]] للباقي. [[r]] قراية، و [[w]] كتابة، و [[x]] تنفيذ، ومفيش [[x]] خالص.

[[chmod]] من **change mode**، و [[+x]] «ضيف صلاحية التنفيذ»:

~~~text الناتج: ls -l hello.py بعد chmod
-rwxrwxr-x 1 sara sara 174 Oct  6 17:53 hello.py
~~~

---

## ٣. [[./hello.py Sara]]

~~~text الناتج
hello Sara
python 3.12.3 from /usr/bin/python3
~~~

ليه [[./]]؟ لأن الشيل مبيدوّرش على الأوامر في الفولدر الحالي، بيدوّر في فولدرات الـ PATH بس. [[./]] معناها «الفولدر اللي أنا فيه»، فبتديله المسار صريح.

---

## ٤. خليه أمر: [[~/.local/bin]]

### [[mkdir -p ~/.local/bin]]

[[~]] هو الـ home ([[/home/sara]])، و [[-p]] يعمل الفولدرات اللي فوقه لو مش موجودة ومايعترضش لو موجود. و [[~/.local/bin]] هو المكان المتعارف عليه لأوامر اليوزر بتاعته.

### [[cp hello.py ~/.local/bin/hello]]

انسخه هناك **من غير [[.py]]**، عشان الأمر يبقى اسمه [[hello]]. الـ shebang هو اللي بيقول للنظام يشغّله بـ Python، مش الامتداد. و [[cp]] بيحتفظ بصلاحية [[x]].

### [[hello Ali]]

في نفس الـ session اللي عملت فيها الفولدر:

~~~text الناتج
-sh: 10: hello: not found
~~~

exit 127 (يعني «مش لاقي الأمر»). السبب في [[~/.profile]] بتاع أوبونتو:

~~~text ~/.profile (سطور 24-27)
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
~~~

يعني «لو الفولدر **موجود** ساعة الـ login ضيفه للـ PATH». ساعة الـ login مكانش موجود. بعد login جديد ([[su - sara]] تاني):

~~~text الناتج
hello Ali
python 3.12.3 from /usr/bin/python3
~~~

و [[which hello]] طبع [[/home/sara/.local/bin/hello]].

### [[echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc]]

لو الطريقة اللي فوق مش موجودة عندك (توزيعة تانية، أو root في Docker)، ضيفه بإيدك:

- [[export PATH="..."]]: غيّر الـ PATH وخليه يوصل للبرامج اللي هتتشغّل من الشيل.
- [[$HOME/.local/bin:$PATH]]: الفولدر بتاعك وبعده الـ PATH القديم كله. [[:]] بتفصل بين الفولدرات.
- الـ single quotes حوالين السطر كله: عشان [[$HOME]] و [[$PATH]] يتكتبوا في الملف زي ما هم ويتفكّوا كل مرة الشيل يفتح، مش دلوقتي.
- [[>>]] يضيف في آخر الملف (و [[>]] كان هيمسحه).
- [[~/.bashrc]] بيتقري مع كل ترمنال bash جديد. على الماك الشيل zsh فاكتبه في [[~/.zshrc]].

---

## ٥. ويندوز: [[py hello.py Sara]]

مفيش chmod ولا [[./]] بالمعنى ده. الـ launcher [[py]] بيقرا الـ shebang، ولما يلاقي [[/usr/bin/env python3]] بيفهمها «أحدث Python 3»:

~~~text الناتج
hello Sara
python 3.14.3 from C:\Users\ali\AppData\Local\Python\pythoncore-3.14-64\python.exe
~~~

---

## فخ: ملف بنهايات سطور ويندوز

ويندوز بيختم كل سطر بحرفين [[\r\n]] (CRLF)، ولينكس بحرف واحد [[\n]] (LF). عملت ملف بـ CRLF وشغّلته:

~~~text الناتج
/usr/bin/env: ‘python3\r’: No such file or directory
/usr/bin/env: use -[v]S to pass options in shebang lines
~~~

و [[od -c]] (بيطبع كل حرف لوحده) أكّد إن السطر الأول آخره [[3  \r  \n]]: الـ [[\r]] بقى جزء من اسم البرنامج. الحل [[sed -i 's/\r$//' crlf.py]] أو تغيّر [[CRLF]] لـ [[LF]] في VS Code.

---

## الخطوات كلها

| الخطوة | الأمر | من غيرها |
|---|---|---|
| shebang | [[#!/usr/bin/env python3]] أول سطر | bash يحاول يقرا الملف كسكربت bash |
| تنفيذ | [[chmod +x hello.py]] | [[Permission denied]] (126) |
| تشغيل | [[./hello.py]] | [[command not found]] |
| أمر من أي حتة | [[~/.local/bin/hello]] + الـ PATH | [[not found]] (127) |

## الخلاصة

- الـ shebang للنظام، و Python شايفه تعليق.
- [[x]] صلاحية، و [[./]] مسار، و PATH مكان الأوامر: ٣ حاجات مختلفة.
- بعد أي تغيير في الـ PATH افتح ترمنال (أو login) جديد.
- على ويندوز [[py hello.py]] وخلاص.`,
          lines: [
            R`[[head -1]] بيطبع أول سطر بس من الملف. لازم يطلع [[#!/usr/bin/env python3]] بالظبط: أول حاجة في الملف، مفيش قبله سطر فاضي ولا مسافة، وإلا النظام مش هيعتبره shebang.`,
            R`[[chmod +x]] بيدّي الملف صلاحية التنفيذ ([[x]]). من غيرها [[./hello.py]] بيطلّع [[Permission denied]] حتى لو الـ shebang سليم. بتتعمل مرة واحدة للملف.`,
            R`[[./]] معناها «الملف ده من الفولدر الحالي»، لأن الشيل مش بيدوّر في الفولدر الحالي لوحده. النظام بيقرا الـ shebang ويشغّل الملف بـ [[python3]]، و [[Sara]] بتوصل في [[sys.argv]] عادي.`,
            R`[[~/.local/bin]] الفولدر المتعارف عليه لأوامر اليوزر بتاعك، من غير sudo. [[-p]] بيعمل الفولدرات الناقصة في السكة، ومش بيشتكي لو الفولدر موجود أصلًا.`,
            R`بينسخ السكربت هناك باسم [[hello]] من غير [[.py]]، فده بقى اسم الأمر اللي هتكتبه. النسخة بتاخد صلاحية التنفيذ من الملف الأصلي، فمش محتاج [[chmod]] تاني.`,
            R`بتكتب اسم الأمر بس من أي فولدر، والشيل بيلاقيه لأنه بيدوّر في فولدرات الـ PATH بالترتيب. لو طلع [[command not found]] يبقى [[~/.local/bin]] مش في الـ PATH، والسطر اللي بعده بيحل ده.`,
            R`بيضيف سطر لآخر [[~/.bashrc]] ([[>>]] بتضيف من غير ما تمسح) بيحط [[~/.local/bin]] في أول الـ PATH. علامات التنصيص المفردة بتخلي [[$PATH]] يتكتب في الملف زي ما هو ويتفك كل ما ترمنال يفتح. بيشتغل في ترمنال جديد، وعلى ماك الشيل الافتراضي zsh فالملف [[~/.zshrc]].`,
            R`على ويندوز النظام مبيعرفش الـ shebang، بس الـ launcher [[py]] بيقراه ويختار بيه النسخة، و Python نفسه بيعتبره تعليق. و chmod مالوش لازمة هناك: امتداد [[.py]] هو اللي بيقول الملف بيتشغّل بإيه.`
          ],
          sol: R`جربتها على أوبونتو 24.04. قبل [[chmod +x]]: [[bash: ./hello.py: Permission denied]] (exit 126). وبعدها [[./hello.py Sara]] طبع [[hello Sara]]، و [[hello Ali]] من [[~/.local/bin]] طبع [[hello Ali]].

ملف الـ CRLF طلّع سطرين:

[[/usr/bin/env: ‘python3\r’: No such file or directory]]
[[/usr/bin/env: use -[v]S to pass options in shebang lines]]

والـ exit code كان 127. السطر التاني تخمين من env وملوش علاقة بمشكلتنا. الـ [[\r]] اللي في الآخر بقى جزء من اسم البرنامج. الحل: [[sed -i 's/\r$//' crlf.py]] أو [[dos2unix crlf.py]]، أو في VS Code دوس على [[CRLF]] تحت على اليمين وخليها [[LF]] واحفظ.

وجرّبت ملف من غير shebang فيه [[print(1)]] بس: bash حاول يقراه وطلع [[./nosb: line 1: syntax error near unexpected token $__bt1']].`
        },
        {
          cmd: "if __name__ == \"__main__\":",
          title: "هيكل كل سكربت: main و __name__",
          desc: R`بدل ما تكتب الكود كله على مستوى الملف، حطه في دوال، ودالة [[main]] بترجّع رقم، وفي الآخر:

[[if __name__ == "__main__":]] وتحتها [[sys.exit(main(sys.argv[1:]))]]

كده الملف بيشتغل لما تشغّله مباشرة، ولما ملف تاني (أو اختبار) يعمله import ياخد الدوال من غير ما يشغّل حاجة. والرقم اللي main بترجّعه بيبقى الـ exit code. ده نفس الهيكل في كل سكربت في باقي الدروس.`,
          example: R`#!/usr/bin/env python3
"""Count lines in text files: python3 count_lines.py FILE..."""
import sys
from pathlib import Path

def count_lines(path: Path) -> int:
    with path.open(encoding="utf-8") as f:
        return sum(1 for _ in f)

def main(argv: list[str]) -> int:
    if not argv:
        print("usage: count_lines.py FILE...", file=sys.stderr)
        return 2
    total = 0
    for name in argv:
        n = count_lines(Path(name))
        print(f"{n:>6}  {name}")
        total += n
    print(f"{total:>6}  total")
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))`,
          try: R`اعمل [[a.txt]] فيه 3 سطور و [[b.txt]] فيه سطرين. شغّل [[python3 count_lines.py a.txt b.txt]]، ومن غير ملفات، وعلى ملف مش موجود، وبعد كل واحدة [[echo $?]] (في PowerShell [[$LASTEXITCODE]]، لأن [[$?]] هناك True أو False بس). وبعدين [[python3 -c "import count_lines; print(count_lines.count_lines(__import__('pathlib').Path('a.txt')))"]]. وفي الآخر عدّله: الملف المش موجود يطبع رسالة على stderr والسكربت يكمّل الباقي، ويخرج بـ 1 لو أي ملف فشل.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[mod.py]] فيه [[print("mod:", __name__)]]، و [[main.py]] فيه [[import mod]] وبعدها [[print("main:", __name__)]]. [[python main.py]] هيطبع إيه بالترتيب؟`, done: R`[[mod: mod]] الأول (الـ import بيشغّل الملف كله من فوق لتحت) وبعده [[main: __main__]]. وفهمت إن [[__name__]] بيبقى اسم الموديول لما يتعمله import، و [[__main__]] لما يتشغّل مباشرة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه الـ exit code لو [[main]] رجّعت [[None]] (نسيت [[return]])؟ ولو رجّعت [[True]]؟ جرّب [[sys.exit(None)]] و [[sys.exit(True)]].`, done: R`[[None]] بيخرج بـ ٠ (نجاح، حتى لو حصلت مشكلة ونسيت ترجّع رقم) و [[True]] بيخرج بـ ١ لأن [[True]] رقمه ١. فـ main اللي بترجّع [[ok]] (True لو نجح) بتقلب المعنى، ولازم ترجّع ٠ أو رقم الخطأ صريح.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[utils.py]] فيه دالة [[slugify]] وتحتها على طول [[print(slugify(input("name: ")))]]. أول ما الاختبار عمل [[from utils import slugify]] الاختبار وقف يستنى كتابة. صلّحه.`, done: R`حطيت الـ [[print(...input...)]] جوه [[main()]] وتحت [[if __name__ == "__main__":]]، والاختبار بيعمل import ويخلص من غير ما يسأل، و [[python utils.py]] لسه بيسأل.` },
            { lvl: 'تطبيق', t: R`**refactor:** خد سكربت قديم كاتبه كله على مستوى الملف (من غير دوال)، وحوّله لدوال و [[main(argv) -> int]] و [[sys.exit(main(sys.argv[1:]))]] من غير ما تغيّر الناتج.`, done: R`ناتج السكربت قبل وبعد متطابق ([[fc]] أو [[diff]] على الناتجين فاضي)، والـ exit code نفسه في حالة النجاح والفشل، و [[python -c "import اسم_السكربت"]] مبيطبعش حاجة.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[count_lines]] اللي في المثال اكتب [[test_count_lines.py]] بـ [[tmp_path]] فيه ٣ حالات: ملف ٣ سطور، وملف فاضي، وملف [[a\nb]] من غير سطر جديد في الآخر.`, done: R`[[pytest -q]] بيقول [[3 passed]]، والحالة التالتة طلعت ٢ (السطر الأخير بيتعد حتى من غير [[\n]])، والملف الفاضي ٠.` },
            { lvl: 'تحدي', t: R`**مسألة:** زوّد [[count_lines.py]] خيار [[-w]] يعد الكلمات كمان (من [[argv]] بإيدك، من غير argparse)، والملف المش موجود يتطبع على stderr والباقي يكمّل، والـ exit code ١ لو أي ملف فشل.`, done: R`[[python count_lines.py -w a.txt nope.txt b.txt]] بيطبع سطرين للملفين الموجودين وإجمالي، ورسالة [[nope.txt]] على stderr بس ([[2> err.txt]] بيمسكها)، والـ exit code ١. وعلى لينكس أرقامه مطابقة لـ [[wc -l -w]].` },
          ],
          deep: {
            why: "سكربت مكتوب كله على مستوى الملف بيشتغل أول ما حد يعمله import، فمينفعش تستخدم دالة منه في سكربت تاني ولا تختبره بـ pytest. ومن غير exit code صح، cron و CI و && في bash فاكرين إنه نجح وهو فشل.",
            how: R`كل ملف Python ليه متغير [[__name__]]. الملف اللي بتشغّله مباشرة اسمه [["__main__"]]، والملف اللي بيتعمله import اسمه هو اسم الموديول ([["count_lines"]]). فالـ if دي معناها «اشتغل بس لو أنا البرنامج الرئيسي». (التفاصيل في درس «import و packages» في تاب «Python و FastAPI».)

[[main(argv)]] بتاخد الـ arguments كـ list بدل ما تقرا [[sys.argv]] جوه، فالاختبار يقدر يبعت [[main(["a.txt"])]] بإيده. و [[sys.argv[1:] ]] بيشيل اسم السكربت نفسه.

[[sys.exit(main(...))]]: الرقم اللي main رجّعته بقى exit code البرنامج. 0 نجاح، و 2 العرف بتاعه «استخدام غلط» (argparse بيستخدمه)، و 1 أي فشل تاني.

الـ docstring في أول الملف بيوصف السكربت، وبيبقى في [[__doc__]] فتقدر تطبعه كـ usage. و [[sum(1 for _ in f)]] بيعد السطور من غير ما يحمّل الملف كله في الذاكرة.`,
            when: "أي سكربت أطول من ١٠ سطور، أو هيتجدول، أو هيتختبر.",
            mistakes: R`[[main()]] لوحدها من غير [[sys.exit]]: الـ exit code بيبقى 0 دايمًا مهما main رجّعت. و [[if __name__ == "main":]] من غير الـ underscores: مفيش error، والسكربت مش بيعمل أي حاجة خالص. ومتغيرات بتتعمل جوه الـ if وبتستخدمها الدوال: بتشتغل لما تشغّله، وتقع بـ [[NameError]] لما تعمله import.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيعد سطور ملف أو أكتر ويطبع جدول صغير ومجموع، زي [[wc -l]]. بس الهدف الحقيقي **الهيكل**: دوال، و [[main]] بترجّع رقم، وسطرين في الآخر بيشغّلوها. ده الهيكل اللي هتلاقيه في كل سكربت بعد كده. اتشغّل على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز في PowerShell 7 (Python 3.14)، على [[a.txt]] فيه ٣ سطور و [[b.txt]] فيه سطرين.

---

## ١. أول الملف

~~~python count_lines.py
#!/usr/bin/env python3
"""Count lines in text files: python3 count_lines.py FILE..."""
import sys
from pathlib import Path
~~~

- [[#!/usr/bin/env python3]]: الـ shebang (الدرس اللي فات).
- [[""" ... """]]: نص بين ٣ quotes في أول الملف اسمه **docstring**. مش تعليق، ده قيمة Python بتتحفظ في [[__doc__]]:

~~~text الناتج: python3 -c "import count_lines; print(count_lines.__doc__)"
Count lines in text files: python3 count_lines.py FILE...
~~~

- [[import sys]]: هنحتاج منه [[argv]] و [[stderr]] و [[exit]].
- [[from pathlib import Path]]: هات [[Path]] بس من موديول [[pathlib]]، نوع بيمثّل مسار ملف.

---

## ٢. [[count_lines]]: دالة بتعمل حاجة واحدة

~~~python count_lines.py
def count_lines(path: Path) -> int:
    with path.open(encoding="utf-8") as f:
        return sum(1 for _ in f)
~~~

- [[def]] بيعرّف دالة. و [[path: Path]] و [[-> int]] اسمهم **type hints**: توضيح إن الدالة بتاخد Path وبترجّع رقم صحيح (int). Python مش بيفرضهم، بيساعدوا اللي بيقرا والـ editor.
- [[path.open(encoding="utf-8")]]: افتح الملف للقراية، و [[utf-8]] عشان العربي (درس «open() و encoding»).
- [[with ... as f:]]: افتح وسمّيه [[f]]، وأول ما البلوك يخلص اقفله لوحده حتى لو حصل error.
- [[sum(1 for _ in f)]]: نقراها من جوه. [[for _ in f]] بيلف على الملف سطر سطر، و [[_]] اسم متغير معناه «مش محتاج القيمة». ولكل سطر بنطلّع [[1]]، و [[sum]] بيجمعهم. يعني عدد السطور، من غير ما الملف كله يتحمّل في الذاكرة مرة واحدة.

---

## ٣. [[main]]: البرنامج نفسه

~~~python count_lines.py
def main(argv: list[str]) -> int:
    if not argv:
        print("usage: count_lines.py FILE...", file=sys.stderr)
        return 2
~~~

- [[argv: list[str] ]]: main بتاخد الـ arguments **كـ parameter**، list من النصوص. مبتقراش [[sys.argv]] بنفسها، فالاختبار يقدر يناديها [[main(["a.txt"])]].
- [[if not argv:]]: list فاضية تعتبر False، فـ [[not argv]] يعني «مفيش ملفات».
- [[file=sys.stderr]]: اطبع على قناة الأخطاء مش الناتج العادي (درس «sys.exit و exit codes»).
- [[return 2]]: 2 هو العرف لـ «استخدام غلط».

~~~text الناتج: python3 count_lines.py
usage: count_lines.py FILE...
~~~

و exit 2.

~~~python count_lines.py
    total = 0
    for name in argv:
        n = count_lines(Path(name))
        print(f"{n:>6}  {name}")
        total += n
    print(f"{total:>6}  total")
    return 0
~~~

- [[for name in argv:]]: لكل اسم ملف.
- [[Path(name)]]: حوّل النص لـ Path وابعته للدالة.
- [[f"{n:>6}  {name}"]]: [[:>6]] يعني «على اليمين في عرض ٦ خانات»، فالأرقام تيجي تحت بعض. [[f"[{3:>6}]"]] طلّع [[[     3] ]]: ٥ مسافات وبعدها 3.
- [[total += n]]: زوّد المجموع، اختصار [[total = total + n]].
- [[return 0]]: نجاح.

~~~text الناتج: python3 count_lines.py a.txt b.txt
     3  a.txt
     2  b.txt
     5  total
~~~

---

## ٤. السطرين اللي في الآخر

~~~python count_lines.py
if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
~~~

### [[__name__]]

كل ملف Python ليه متغير اسمه [[__name__]] (الشرطتين اللي قبل وبعد معناهم «اسم خاص بـ Python»). قيمته بتتحدد من **طريقة تحميل الملف**:

~~~text الناتج
python3 -c "print(__name__)"                                  →  __main__
python3 -c "import count_lines; print(count_lines.__name__)"  →  count_lines
~~~

الملف اللي انت شغّلته مباشرة اسمه [["__main__"]]، وأي ملف اتعمله import اسمه هو اسم الموديول. فالـ if معناها «نفّذ ده **بس** لو أنا البرنامج اللي اتشغّل».

### [[sys.argv[1:] ]]

[[[1:] ]] اسمه slice: «من العنصر 1 لحد الآخر»، يعني شيل [[sys.argv[0] ]] (اسم السكربت). فـ main بتستلم [[['a.txt', 'b.txt'] ]].

### [[sys.exit(...)]]

الرقم اللي main رجّعته بيبقى الـ **exit code** بتاع البرنامج كله. من غير [[sys.exit]] البرنامج بيخرج بـ 0 دايمًا مهما main رجّعت.

### الإثبات: import من غير تشغيل

~~~bash
python3 -c "import count_lines; print(count_lines.count_lines(__import__('pathlib').Path('a.txt')))"
~~~

~~~text الناتج
3
~~~

الدالة اشتغلت وطبعت 3 بس، ومفيش جدول ولا usage: main ماتشغّلتش لأن [[__name__]] كان [["count_lines"]]. ([[__import__('pathlib')]] طريقة تعمل import جوه تعبير، عشان السطر يفضل سطر واحد.)

---

## ٥. ملف مش موجود

~~~text الناتج: python3 count_lines.py nope.txt (آخر سطور)
  File "/w/count_lines.py", line 7, in count_lines
    with path.open(encoding="utf-8") as f:
FileNotFoundError: [Errno 2] No such file or directory: 'nope.txt'
~~~

ده **traceback**: سلسلة النداءات من main لحد السطر اللي وقع، وآخر سطر هو الـ exception. وأي exception محدش مسكه بيخرج بـ 1.

---

## ٦. الحل: يكمّل بعد الملف البايظ

الجزء اللي اتغير في main:

~~~python solCode
    total, failed = 0, 0
    for name in argv:
        try:
            n = count_lines(Path(name))
        except (OSError, UnicodeDecodeError) as e:
            print(f"skip {name}: {e}", file=sys.stderr)
            failed += 1
            continue
~~~

- [[total, failed = 0, 0]]: اتنين في سطر واحد.
- [[try:]] جرّب، ولو حصل exception من الأنواع اللي في [[except]] روح هناك بدل ما البرنامج يقع.
- [[(OSError, UnicodeDecodeError)]]: tuple يعني «أي واحد من دول». [[OSError]] هو الأب بتاع [[FileNotFoundError]] و [[IsADirectoryError]] و [[PermissionError]].
- [[as e]]: الـ exception نفسه في [[e]]، وطباعته بتدّي الرسالة.
- [[continue]]: سيب باقي اللفة دي وروح للملف اللي بعده.
- وفي الآخر [[return 1 if failed else 0]]: لو أي ملف فشل اخرج بـ 1.

~~~text الناتج: python3 count_lines.py a.txt nope.txt b.txt
skip nope.txt: [Errno 2] No such file or directory: 'nope.txt'
     3  a.txt
     2  b.txt
     5  total
~~~

و exit 1. (سطر الـ skip ظهر الأول لأن stderr بيظهر فورًا و stdout بيتجمّع لما مش متوصّل بترمنال، فالترتيب على الشاشة ممكن يختلف.) ولما اديته فولدر [[.]]: لينكس قال [[[Errno 21] Is a directory]] وويندوز قال [[[Errno 13] Permission denied]]، والاتنين اتمسكوا لأنهم تحت [[OSError]].

---

## الخلاصة

| الجزء | ليه |
|---|---|
| docstring | وصف السكربت، في [[__doc__]] |
| دوال صغيرة | تتختبر وتتعمل import لوحدها |
| [[main(argv) -> int]] | بتاخد الـ arguments وبترجّع exit code |
| [[if __name__ == "__main__":]] | شغّل main بس لما الملف يتشغّل مباشرة |
| [[sys.exit(main(sys.argv[1:]))]] | رقم main يبقى exit code البرنامج |

- 0 نجاح، و 1 فشل، و 2 استخدام غلط.
- الأخطاء على stderr.`,
          lines: [
            R`الـ docstring: نص بين تلات علامات تنصيص في أول الملف بيوصف السكربت بيعمل إيه وبيتشغّل إزاي. Python بيحفظه في [[__doc__]]، و [[help()]] على الموديول بيطبعه، فاللي يفتح الملف أو يعمل import يعرف يستخدمه على طول.`,
            R`[[sys]] عشان تلات حاجات: [[sys.argv]] (أسماء الملفات اللي بعد اسم السكربت)، و [[sys.stderr]] (رسالة الاستخدام)، و [[sys.exit]] (نطلع بكود النجاح أو الخطأ).`,
            R`[[Path]] من [[pathlib]] بيمثّل مسار ملف كـ object ليه دوال زي [[.open()]] و [[.exists()]]، بدل ما تتعامل مع المسار كنص وتلزق الأجزاء بإيدك.`,
            R`دالة بتاخد مسار ملف واحد وترجّع عدد سطوره. [[path: Path]] و [[-> int]] type hints: بيوضّحوا نوع الداخل والخارج للي بيقرا وللـ editor، و Python مش بيتأكد منهم وقت التشغيل.`,
            R`[[with]] بيفتح الملف ويقفله لوحده لما البلوك يخلص، حتى لو حصل error. و [[encoding="utf-8"]] مهمة: من غيرها ويندوز ممكن يقرا بـ encoding تاني، فيقع بـ [[UnicodeDecodeError]] أو يطلّع كلام ملخبط مع أي ملف فيه عربي.`,
            R`الـ file object بيتلف عليه سطر سطر، فـ [[for _ in f]] بتقرا سطر واحد في المرة، و [[sum(1 ...)]] بتجمع 1 لكل سطر. كده ملف حجمه جيجا مبيتحمّلش في الذاكرة مرة واحدة. و [[_]] اسم متعارف عليه لمتغير مش هنستخدمه.`,
            R`[[main]] بتاخد الـ arguments كـ list بدل ما تقرا [[sys.argv]] بنفسها، وبترجّع رقم هو الـ exit code. الفصل ده بيخليك تختبرها من اختبار بـ [[main(["a.txt"])]] من غير ما تشغّل السكربت.`,
            R`[[not argv]] بتبقى True لو اللستة فاضية، يعني اليوزر شغّل السكربت من غير ولا ملف. بنمسك الحالة دي بدري بدل ما السكربت يطبع total صفر ويبان إنه نجح.`,
            R`بيطبع طريقة الاستخدام الصح. [[file=sys.stderr]] بيبعتها لمجرى الأخطاء مش للناتج العادي، فلو حد عامل [[> out.txt]] الرسالة تظهر على الشاشة ومتتخلطش مع البيانات.`,
            R`بيرجّع 2 لـ [[main]]، وده اللي هيبقى الـ exit code. الرقم 2 متعارف عليه (و argparse بيستخدمه) معناه «استخدمت الأمر غلط»، فسكربت تاني أو CI يفرّق بينه وبين فشل حقيقي.`,
            R`متغير هنجمّع فيه سطور كل الملفات، ولازم يبدأ بصفر قبل اللفة. من غيره [[total += n]] تقع بـ [[UnboundLocalError]] لأن المتغير ملوش قيمة لسه.`,
            R`بيلف على أسماء الملفات اللي اتكتبت بعد اسم السكربت واحد واحد بنفس ترتيبها، فـ [[count_lines.py a.txt b.txt]] بيعدّ a الأول وبعدين b.`,
            R`بيحوّل الاسم (نص) لـ [[Path]] ويديه للدالة تعدّ سطوره. لو الملف مش موجود هنا هيطلع [[FileNotFoundError]] والسكربت يقع، ودي حالة السكربت ده مش بيمسكها.`,
            R`[[{n:>6}]] بيطبع الرقم في خانة عرضها 6 حروف مزقوق لليمين، فالأرقام تيجي تحت بعض مهما كان عدد خاناتها، زي ناتج [[wc -l]]. وبعده مسافتين واسم الملف.`,
            R`بيزوّد عدد سطور الملف ده على المجموع. [[+=]] اختصار [[total = total + n]].`,
            R`سطر أخير بالمجموع بنفس العرض، فيبقى تحت عمود الأرقام بالظبط.`,
            R`[[0]] معناها كل حاجة نجحت، وده الرقم اللي الشيل هيشوفه في [[$?]] (أو [[$LASTEXITCODE]] في PowerShell).`,
            R`[[__name__]] قيمته [["__main__"]] لما الملف يتشغّل بنفسه، وقيمته اسم الموديول لما يتعمله [[import]]. فالشرط ده بيخلي الـ import (من اختبار أو سكربت تاني) ياخد الدوال بس من غير ما يشغّل [[main]] ويقرا argv.`,
            R`[[sys.argv[1:] ]] كل الـ arguments من غير اسم السكربت، والرقم اللي [[main]] بترجّعه بيتسلّم لـ [[sys.exit]] فيبقى الـ exit code. من غير [[sys.exit]] السكربت كان هيخرج بـ 0 دايمًا حتى لو [[main]] رجّعت 2.`
          ],
          sol: R`[[python3 count_lines.py a.txt b.txt]] طبع [[     3  a.txt]] و [[     2  b.txt]] و [[     5  total]]، و [[echo $?]] طلع 0. من غير ملفات: [[usage: count_lines.py FILE...]] و exit 2. وعلى [[nope.txt]]: traceback آخره [[FileNotFoundError: [Errno 2] No such file or directory: 'nope.txt']] و exit 1 (أي exception محدش مسكه بيخرج بـ 1).

والـ import طبع [[3]] بس: الدالة اشتغلت، و main ماتشغّلتش لأن [[__name__]] كان [["count_lines"]].

بعد التعديل (تحت)، [[python3 count_lines.py a.txt nope.txt b.txt]] طبع:

[[     3  a.txt]]
[[skip nope.txt: [Errno 2] No such file or directory: 'nope.txt']]
[[     2  b.txt]]
[[     5  total]]

و exit 1. وجرّبت فولدر بدل ملف: على لينكس [[skip .: [Errno 21] Is a directory: '.']]، وعلى ويندوز [[skip .: [Errno 13] Permission denied: '.']]، يعني exception مختلف خالص (PermissionError). وملف binary: [[skip bin.dat: 'utf-8' codec can't decode byte 0xbb in position 0: invalid start byte]]. عشان كده الـ except بيمسك [[OSError]]، ودي أبو FileNotFoundError و IsADirectoryError و PermissionError، ومعاها UnicodeDecodeError. لو كتبت الأسماء واحد واحد ونسيت PermissionError، السكربت هيقع على ويندوز بس.`,
          solCode: R`def main(argv: list[str]) -> int:
    if not argv:
        print("usage: count_lines.py FILE...", file=sys.stderr)
        return 2
    total, failed = 0, 0
    for name in argv:
        try:
            n = count_lines(Path(name))
        except (OSError, UnicodeDecodeError) as e:
            print(f"skip {name}: {e}", file=sys.stderr)
            failed += 1
            continue
        print(f"{n:>6}  {name}")
        total += n
    print(f"{total:>6}  total")
    return 1 if failed else 0`
        },
        {
          cmd: "input() و sys.argv",
          title: "السكربت ياخد بيانات: arguments ولا سؤال",
          desc: R`طريقتين يوصل بيهم كلام للسكربت:

[[sys.argv]]: list فيها اسم السكربت وبعده كل كلمة كتبتها في الأمر، كلهم strings. ده اللي بيشتغل في cron والأتمتة لأن مفيش حد يرد.

[[input("سؤال: ")]]: بيطبع السؤال ويستنى المستخدم يكتب ويدوس Enter، وبيرجّع اللي اتكتب string. مناسب لسكربت بيشغّله إنسان، خصوصًا سؤال تأكيد قبل حاجة خطيرة.

والأرقام بتيجي نصوص في الحالتين، فلازم [[int()]] وتمسك الغلط.`,
          example: R`import sys
print(sys.argv)
args = sys.argv[1:]
folder = args[0] if args else input("folder: ").strip() or "."
try:
    days = int(input("older than how many days? [30] ") or "30")
except ValueError:
    sys.exit("error: days must be a number")
answer = input(f"delete files older than {days} days in {folder}? [y/N] ")
if answer.strip().lower() not in ("y", "yes"):
    sys.exit("cancelled")
print(f"ok: cleaning {folder}, days={days}")`,
          try: R`شغّله بـ [[python3 ask.py ~/Downloads "two words"]]، ومن غير arguments، واكتب [[ten]] بدل رقم. وبعدين من غير terminal خالص: [[python3 ask.py lab < /dev/null]] (على ويندوز PowerShell مفيش [[<]]، اكتب [[$null | python ask.py lab]]، وفي CMD [[python ask.py lab < NUL]]). وفي فولدر فيه ملفات txt جرّب [[python3 ask.py lab *.txt]] وبص على أول سطر.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[args.py]] بيطبع [[sys.argv[1:]]]، وفي الفولدر [[a.txt]] و [[b.txt]]. شغّل [[python args.py "two words" 3 *.txt]] في bash وفي PowerShell وفي CMD.`, done: R`bash طبع [[['two words', '3', 'a.txt', 'b.txt']]] لأن الشيل هو اللي فك [[*.txt]]، و PowerShell طبع [[['two words', '3', '*.txt']]] و CMD طبع [[['*.txt']]] للنجمة لوحدها. يعني على ويندوز السكربت لازم يفك النجمة بنفسه بـ [[glob]] (درس «glob و rglob»). و [[3]] جه string في كل الحالات.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[days = input("days: ")]] وبعدها [[if days > 30:]]. شغّله واقرا الخطأ.`, done: R`[[TypeError: '>' not supported between instances of 'str' and 'int']]، وصلّحته بـ [[int(days)]] جوه [[try]] ومعاه [[except ValueError]] برسالة مفهومة لو كتب [[ten]].` },
            { lvl: 'تطبيق', t: R`**محاكاة:** شغّل سكربت فيه [[input()]] من غير حد يرد: [[python ask.py < /dev/null]] في bash (أو [[$null | python ask.py]] في PowerShell). وبعدين خلّيه يتعامل مع الحالة دي.`, done: R`الأول وقع بـ [[EOFError: EOF when reading a line]] والـ exit code ١ (ده اللي بيحصل في cron). بعد [[try/except EOFError]] بقى يطبع [[cancelled: no input]] على stderr ويخرج بـ ١ من غير traceback.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[calc.py]] بياخد ٣ arguments: رقم وعملية ورقم ([[python calc.py 3 + 4]])، ويدعم [[+ - x /]] (استخدم [[x]] للضرب لأن [[*]] الشيل بيفكها). القسمة على صفر ورقم غلط برسالة و exit code ٢.`, done: R`[[3 + 4]] بيطبع [[7]]، و [[7 / 2]] بيطبع [[3.5]]، و [[5 / 0]] و [[a + 1]] و [[3 %]] بيطبعوا رسالة واضحة على stderr ويخرجوا بـ ٢.` },
            { lvl: 'تطبيق', t: R`**مسألة:** دالة [[ask_int(prompt, lo, hi, tries=3)]] بتسأل لحد ما المستخدم يكتب رقم بين [[lo]] و [[hi]]، ولو خلصت المحاولات ترمي [[ValueError]]. جرّبها من غير كيبورد: [[printf 'x\n20\n5\n' | python pick.py]].`, done: R`مع الإدخال ده طبعت رسالة لـ [[x]] (مش رقم) ورسالة لـ [[20]] (بره المدى) وقبلت [[5]]، ومع [[printf 'x\ny\nz\n']] وقعت بعد ٣ محاولات برسالة، ومع إدخال فاضي خالص اتعاملت مع [[EOFError]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** لاقي في الوثائق إزاي تسأل عن باسورد من غير ما يظهر وهو بيتكتب، وإزاي تعرف السكربت شغال من ترمنال ولا جايله [[stdin]] من pipe.`, done: R`استخدمت [[getpass.getpass()]] (مبيظهرش الحروف)، و [[sys.stdin.isatty()]]: [[echo hi | python tty.py]] طبع [[False]] ومن الترمنال طبع [[True]]. وخلّيت السكربت ميسألش لما [[isatty()]] تبقى [[False]].` },
          ],
          deep: {
            why: R`سكربت فيه المسار مكتوب جوه الكود لازم تعدّله قبل كل تشغيل. و [[sys.argv[1] ]] من غير فحص بيطلع [[IndexError]] للي بيستخدمه. والسؤال قبل المسح بيحميك من غلطة إيد.`,
            how: R`[[sys.argv[0] ]] اسم السكربت، والباقي الكلمات بالترتيب. اللي بيقسّم الكلام ويفك [[~]] و [[*]] هو الشيل مش Python: [["two words"]] وصلت عنصر واحد، و [[~/Downloads]] وصلت [[/home/sara/Downloads]]، و [[*.txt]] وصلت أسماء الملفات. على ويندوز CMD و PowerShell مبيفكوش [[*]]، فالسكربت بيستلم [[*.txt]] زي ما هي، والحل [[Path(".").glob(pattern)]] جوه Python. و [[~]]: PowerShell 7 بيفكها ([[C:\Users\sara/Downloads]] بشرطة مايلة لقدام في الآخر)، و PowerShell 5.1 و CMD بيبعتوها زي ما هي، فلو السكربت بياخد مسار اعمل [[expanduser()]] جواه.

[[input()]] بيرجّع السطر من غير الـ Enter، و [[or "30"]] بتدّي قيمة افتراضية لو داس Enter على طول. و [[sys.exit("msg")]] بيطبع الرسالة على stderr ويخرج بـ 1.

لو مفيش حد يرد (cron، أو [[< /dev/null]]، أو pipe خلص) [[input()]] بيرمي [[EOFError]]. وللباسوردات [[getpass.getpass()]] بدل input عشان متظهرش على الشاشة.

ولو الـ arguments بقت أكتر من واحد أو اتنين، أو فيها options، استخدم argparse (درس «argparse --dry-run» في المستوى ٢).`,
            when: "sys.argv لأي سكربت هيتشغّل من سكربت تاني أو cron. و input لسؤال تأكيد أو قيمة ناسيها المستخدم، ومش في سكربت هيتجدول.",
            mistakes: R`[[input]] في سكربت متجدول فيقع بـ [[EOFError]] كل ليلة. و [[days = input(...)]] وبعدين [[days * 86400]] فيطلع النص متكرر 86400 مرة بدل رقم. والتأكيد الافتراضي بيبقى «أيوه» ([[Y/n]]) لحاجة بتمسح: خلّي Enter معناه لأ.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيجمع ٣ معلومات قبل ما «ينضّف» فولدر: الفولدر (من الأمر نفسه، ولو مش موجود يسأل)، وعدد الأيام (يسأل، و Enter يعني 30)، وتأكيد (Enter يعني لأ). مفيش مسح حقيقي، آخره سطر [[ok: ...]]. الردود اتبعتت بـ [[printf "...\n" | python3 ask.py]] عشان التجربة تتكرر بالظبط. اتشغّل على لينكس ([[docker run --rm python:3.13]] و HOME هو [[/home/sara]]) وعلى ويندوز في PowerShell 7 و 5.1 و CMD.

---

## ١. اللي وصل فعلًا

~~~python ask.py
import sys
print(sys.argv)
args = sys.argv[1:]
~~~

[[print(sys.argv)]] بيوريك اللستة زي ما Python استلمها، وده أحسن debug لأي مشكلة arguments. و [[[1:] ]] بيشيل اسم السكربت.

~~~text الناتج: python3 ask.py ~/Downloads "two words"
['ask.py', '/home/sara/Downloads', 'two words']
~~~

لاحظ حاجتين عملهم **الشيل** قبل ما Python يشوف حاجة: [[~]] اتفكت لـ [[/home/sara]]، والـ quotes خلّت [["two words"]] عنصر واحد. ونفس الكلام للنجمة: في فولدر فيه [[a.txt]] و [[b.txt]]:

~~~text الناتج
python3 ask.py lab *.txt     →  ['ask.py', 'lab', 'a.txt', 'b.txt']
python3 ask.py lab "*.txt"   →  ['ask.py', 'lab', '*.txt']
~~~

وعلى ويندوز الشيل مبيفكش النجمة:

| الشيل | [[~/Downloads]] وصلت | [[*.txt]] وصلت |
|---|---|---|
| bash (لينكس وماك) | [['/home/sara/Downloads']] | أسماء الملفات |
| PowerShell 7 | [['C:\\Users\\ali/Downloads']] | [['*.txt']] زي ما هي |
| Windows PowerShell 5.1 | [['~/Downloads']] زي ما هي | [['*.txt']] زي ما هي |

([[\\]] ده شكل الطباعة بس لما Python يطبع list، المسار نفسه فيه [[\]] واحدة.)

---

## ٢. الفولدر: argument ولا سؤال

~~~python ask.py
folder = args[0] if args else input("folder: ").strip() or "."
~~~

نقراه بالترتيب اللي Python بيقيّمه:

1. [[args[0] if args else ...]]: لو فيه arguments خد أولهم، وخلاص.
2. لو مفيش: [[input("folder: ")]] بيطبع [[folder: ]] **ويستنى** لحد ما المستخدم يكتب ويدوس Enter، ويرجّع اللي اتكتب كنص (من غير الـ Enter).
3. [[.strip()]] بيشيل المسافات من الأول والآخر: [["  x "]] بقت [['x']].
4. [[or "."]]: النص الفاضي يعتبر False، فلو داس Enter بس (أو كتب مسافات) خد [["."]] (الفولدر الحالي).

جربت [[python3 -c 'print(int("" or "30"), repr("  x ".strip()), "".strip() or ".")']] فطلّع [[30 'x' .]] ([[repr]] بيطبع النص بالـ quotes عشان تشوف المسافات لو فيه).

---

## ٣. الأيام: رقم ولا غلط

~~~python ask.py
try:
    days = int(input("older than how many days? [30] ") or "30")
except ValueError:
    sys.exit("error: days must be a number")
~~~

- [[input(...)]] بيرجّع **نص** دايمًا، حتى لو كتبت 7.
- [[or "30"]]: Enter لوحده = [["30"]]. و [[[30] ]] في السؤال عرف بيقول «دي القيمة الافتراضية».
- [[int(...)]] بيحوّل النص لرقم. ولو النص مش رقم ([["ten"]]) بيرمي [[ValueError]].
- [[try / except ValueError]]: امسك الغلطة دي بالذات.
- [[sys.exit("رسالة")]]: اطبع الرسالة على stderr واخرج بـ 1.

~~~text الناتج: الرد ten
['ask.py', 'lab']
older than how many days? [30] error: days must be a number
~~~

و exit 1. (الرسالة لزقت في السؤال لأن الرد جاي من pipe مش من كيبورد، فمفيش Enter ظاهر على الشاشة.)

---

## ٤. التأكيد: Enter يعني لأ

~~~python ask.py
answer = input(f"delete files older than {days} days in {folder}? [y/N] ")
if answer.strip().lower() not in ("y", "yes"):
    sys.exit("cancelled")
print(f"ok: cleaning {folder}, days={days}")
~~~

- السؤال f-string فيه الفولدر والأيام، فالمستخدم يشوف هو بيوافق على إيه بالظبط.
- [[[y/N] ]]: الحرف الكبير هو الافتراضي، يعني Enter = No.
- [[.lower()]]: حروف صغيرة، فـ [[YES]] و [[Yes]] و [[y]] كلهم واحد.
- [[not in ("y", "yes")]]: أي رد **غير** دول (حتى Enter أو [[yep]]) يبقى إلغاء.

~~~text الناتج: الردود Enter ثم y
['ask.py', '/home/sara/Downloads', 'two words']
older than how many days? [30] delete files older than 30 days in /home/sara/Downloads? [y/N] ok: cleaning /home/sara/Downloads, days=30
~~~

~~~text الناتج: python3 ask.py والردود مسافات ثم Enter ثم YES
['ask.py']
folder: older than how many days? [30] delete files older than 30 days in .? [y/N] ok: cleaning ., days=30
~~~

~~~text الناتج: الردود 7 ثم Enter
older than how many days? [30] delete files older than 7 days in lab? [y/N] cancelled
~~~

و exit 1.

---

## ٥. مفيش حد يرد: [[EOFError]]

[[< /dev/null]] يعني «الـ input جاي من ملف فاضي»، وده نفس اللي بيحصل في cron:

~~~text الناتج: python3 ask.py lab < /dev/null
['ask.py', 'lab']
older than how many days? [30] Traceback (most recent call last):
  File "/tmp/ask.py", line 6, in <module>
    days = int(input("older than how many days? [30] ") or "30")
EOFError: EOF when reading a line
~~~

**EOF** = End Of File: [[input()]] كان مستني سطر ولقى الـ input خلص. exit 1. ونفس الـ EOFError بالظبط طلع على ويندوز بـ [[$null | python ask.py lab]] في PowerShell، وبـ [[python ask.py lab < NUL]] في CMD ([[NUL]] هو [[/dev/null]] بتاع ويندوز).

---

## الخلاصة

| | [[sys.argv]] | [[input()]] |
|---|---|---|
| بيجي منين | الأمر نفسه | المستخدم وهو السكربت شغال |
| النوع | list نصوص | نص |
| في cron | تمام | [[EOFError]] |
| مناسب لـ | الأتمتة والمسارات | سؤال تأكيد أو قيمة ناقصة |

- الأرقام بتيجي نصوص: [[int()]] جوه [[try]].
- الشيل هو اللي بيفك [[~]] و [[*]] والـ quotes، وويندوز مختلف.
- التأكيد قبل حاجة خطيرة: Enter = لأ.`,
          lines: [
            R`[[sys]] عشان [[sys.argv]] (الكلام اللي اتكتب بعد اسم السكربت) و [[sys.exit]] (نطلع برسالة وكود خطأ لو الرد غلط أو اليوزر لغى).`,
            R`بيطبع الـ list زي ما وصلت بالظبط، وأولها اسم السكربت. سطر تعليمي: بيوريك إن كل argument بيوصل نص ([[str]])، حتى [[30]] بتوصل [["30"]].`,
            R`[[sys.argv[1:] ]] بتاخد من العنصر التاني للآخر، يعني الـ arguments من غير اسم السكربت. لو مفيش arguments بترجّع list فاضية من غير error، بعكس [[sys.argv[1] ]] اللي بتقع بـ IndexError.`,
            R`لو فيه argument خده هو الفولدر. لو مفيش اسأل بـ [[input()]]، و [[.strip()]] تشيل المسافات، ولو الرد فاضي (داس Enter بس) الـ [[or]] بتحط [["."]] يعني الفولدر الحالي. كده السكربت يشتغل من cron بـ argument، ومن إيدك بسؤال.`,
            R`[[try]] بيبدأ بلوك ممكن يقع فيه error متوقع، عشان نمسكه في [[except]] اللي تحته ونطلّع رسالة مفهومة بدل traceback طويل.`,
            R`[[input()]] بترجّع نص دايمًا، فـ [[int()]] بيحوّله رقم. لو الرد فاضي، [[or "30"]] بيحط القيمة الافتراضية اللي مكتوبة بين القوسين في السؤال. ولو كتب [[abc]]، [[int()]] بيرمي [[ValueError]].`,
            R`بيمسك الـ [[ValueError]] اللي [[int()]] بترميه لما الرد مش رقم صحيح (زي [[abc]] أو [[3.5]]). بنمسك النوع ده بس، فأي error تاني مختلف يفضل يظهر ومتستخبّاش.`,
            R`[[sys.exit]] بنص: Python بيطبع النص على stderr ويخرج بكود 1. سطر واحد بدل [[print(..., file=sys.stderr)]] وبعده [[sys.exit(1)]].`,
            R`سؤال تأكيد قبل الحاجة الخطيرة (المسح)، وفيه القيم اللي السكربت فهمها عشان اليوزر يشوفها قبل ما يوافق. و [[y/N]] بالـ N الكبيرة معناها إن الافتراضي لأ.`,
            R`[[.strip().lower()]] بتشيل المسافات وتصغّر الحروف، فـ [[Y]] و [[YES]] يتقبلوا. وأي رد تاني، حتى Enter لوحده، يبقى لأ: في الحاجات الخطيرة الأمان إن الافتراضي ميعملش حاجة.`,
            R`بيطبع [[cancelled]] على stderr ويخرج بكود 1 من غير ما يمسح حاجة. الكود مش صفر عشان لو سكربت تاني بيستناه يعرف إن الشغل محصلش.`,
            R`لو وصلنا هنا يبقى القيم سليمة واليوزر وافق، فبيطبع اللي هيعمله بالقيم اللي فهمها. في سكربت حقيقي هنا يبتدي المسح الفعلي.`
          ],
          sol: R`[[python3 ask.py ~/Downloads "two words"]] طبع حاجة زي [[['ask.py', '/home/sara/Downloads', 'two words']]] (الشيل فك [[~]] والـ quotes خلّت الكلمتين عنصر واحد)، وبعدين سأل عن الأيام والتأكيد.

[[ten]] مكان الرقم: [[error: days must be a number]] و exit 1.

[[< /dev/null]]: السؤال اتطبع، وبعدين [[EOFError: EOF when reading a line]] و exit 1. ده بالظبط اللي هيحصل لو السكربت اتشغّل من cron.

و [[python3 ask.py lab *.txt]] في فولدر فيه [[a.txt]] و [[b.txt]]: [[['ask.py', 'lab', 'a.txt', 'b.txt']]]، يعني Python عمره ما شاف النجمة. ولو حطيتها بين quotes ([["*.txt"]]) هتوصل [['*.txt']] زي ما هي.

وعلى ويندوز PowerShell 7: [[~/Downloads]] وصلت [['C:\\Users\\sara/Downloads']] (الـ [[\\]] ده شكل الطباعة بس، المسار فيه شرطة واحدة)، و [[*.txt]] وصلت [['*.txt']] زي ما هي. و [[$null | python ask.py lab]] وقع بنفس [[EOFError: EOF when reading a line]].`
        },
        {
          cmd: "sys.exit و exit codes",
          title: "السكربت يقول نجح ولا فشل",
          desc: R`كل برنامج بيخلص بيرجّع رقم: 0 يعني نجح، وأي رقم تاني يعني فشل. الشيل بيحطه في [[$?]]، و [[&&]] بيكمّل بس لو 0، و cron و CI و Task Scheduler بيعتمدوا عليه.

[[sys.exit(2)]] بيخرج بالرقم ده. و [[sys.exit("رسالة")]] بيطبع الرسالة على stderr ويخرج بـ 1. وأي exception محدش مسكه بيخرج بـ 1 كمان.

والأخطاء تتطبع على stderr ([[print(..., file=sys.stderr)]]) مش stdout، عشان لو حد عمل [[> out.txt]] ميلاقيش رسالة الخطأ وسط البيانات.`,
          example: R`import json
import sys
from pathlib import Path
path = Path(sys.argv[1] if len(sys.argv) > 1 else "config.json")
if not path.exists():
    print(f"error: {path} not found", file=sys.stderr)
    sys.exit(2)
try:
    config = json.loads(path.read_text(encoding="utf-8"))
except json.JSONDecodeError as e:
    sys.exit(f"error: {path} is not valid JSON: {e}")
missing = [k for k in ("db_url", "backup_dir") if k not in config]
if missing:
    sys.exit(f"error: missing keys: {', '.join(missing)}")
print("config ok")`,
          try: R`سمّيه [[check_config.py]] وشغّله في ٤ حالات وبعد كل واحدة [[echo $?]]: من غير config.json، وبـ [[{"db_url": "x",}]] (فاصلة زيادة)، وبـ [[{"db_url": "x"}]]، وبـ [[{"db_url": "x", "backup_dir": "/b"}]]. وفي الأخيرة جرّب [[python3 check_config.py && echo deploying]] (الـ [[&&]] شغالة في bash و PowerShell 7، مش في 5.1). وجرّب [[python3 check_config.py nope.json > out.txt 2> err.txt]] وشوف كل ملف فيه إيه.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ exit code لكل واحدة قبل ما تشغّل: [[sys.exit()]] و [[sys.exit(3)]] و [[sys.exit("bad")]] و [[raise ValueError("x")]]. وبعدين اتأكد بـ [[python -c "import sys; ..."]] و [[$?]] أو [[$LASTEXITCODE]].`, done: R`٠ و ٣ و ١ (والرسالة [[bad]] على stderr) و ١ (مع traceback). وفهمت إن [[sys.exit]] من غير حاجة نجاح.` },
            { lvl: 'سريع', t: R`**قارن:** [[sys.exit(256)]] و [[sys.exit(-1)]] على ويندوز ([[$LASTEXITCODE]] في PowerShell) وعلى لينكس ([[echo $?]] في [[python:3.12-slim]]).`, done: R`ويندوز طبع [[256]] و [[-1]] زي ما هما، ولينكس طبع [[0]] و [[255]] لأن الـ exit code هناك بايت واحد (٠–٢٥٥) فبيتاخد باقي القسمة على ٢٥٦. يعني [[sys.exit(256)]] على لينكس **نجاح**، فخلّي أكوادك بين ٠ و ١٢٥.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** السكربت ده بيخرج بـ ٠ رغم الغلطة: [[try:]] وجواها [[sys.exit(2)]] وبعدها [[except:]] وجواها [[print("error")]] وفي الآخر [[print("still running")]]. ليه؟ وصلّحه.`, done: R`طبع [[error]] و [[still running]] والـ exit code ٠، لأن [[sys.exit]] بترمي [[SystemExit]] و [[except:]] من غير نوع بتمسك أي حاجة. صلّحتها بـ [[except Exception:]] (اللي مبتمسكش [[SystemExit]]) أو بنوع الخطأ نفسه، وبقى يخرج بـ ٢.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[users.csv]] فيه [[name,email,age]] و ٦ صفوف، منهم صف إيميله من غير [[@]] وصف السن فيه [[abc]]. اكتب [[validate.py]] بيطبع على stdout عدد الصفوف السليمة، وعلى stderr كل صف غلط برقم سطره، ويخرج بـ ١ لو فيه غلط.`, done: R`stdout فيه [[4 valid rows]] بس، و stderr فيه سطرين برقم السطر والسبب، و [[python validate.py users.csv > ok.txt]] خلّى الملف فيه السطر السليم بس والأخطاء ظهرت على الشاشة، والـ exit code ١.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[check_config.py]] اكتب اختبارين: واحد بـ [[subprocess.run([sys.executable, "check_config.py", "nope.json"])]] بيتأكد إن [[returncode == 2]]، وواحد بيعمل import لدالة [[main]] ويستخدم [[pytest.raises(SystemExit)]] ويتأكد من [[excinfo.value.code]].`, done: R`الاختبارين خضر، وفهمت الفرق: الأول بيختبر البرنامج كله من بره (أبطأ وأصدق)، والتاني بيختبر الدالة من جوه (أسرع وبتشوف الرسالة في [[code]] لو كانت string).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** موديول [[os]] فيه ثوابت زي [[os.EX_USAGE]]. اطبعها على لينكس وعلى ويندوز.`, done: R`على لينكس [[os.EX_USAGE]] طلع [[64]] و [[os.EX_OK]] طلع [[0]]، وعلى ويندوز [[AttributeError: module 'os' has no attribute 'EX_USAGE']]. فكتبت ثوابتي أنا في السكربت ([[EXIT_USAGE = 2]]) بدل ما أعتمد عليهم لو السكربت هيشتغل على الاتنين.` },
          ],
          deep: {
            why: R`سكربت backup فشل وطبع error بس خرج بـ 0: cron مش هيبعتلك حاجة، و [[backup.py && upload.py]] هيرفع نسخة بايظة، و CI هيبقى أخضر. الـ exit code هو الطريقة الوحيدة اللي البرامج التانية بتفهم بيها اللي حصل.`,
            how: R`[[sys.exit(n)]] بيرمي [[SystemExit]]، و Python وهو بيقفل بياخد الرقم منه. عشان كده [[finally]] و [[with]] بيكمّلوا شغلهم قبل الخروج.

القيم: [[sys.exit()]] أو [[sys.exit(None)]] = 0. رقم = الرقم ده (على لينكس وماك النظام بياخد آخر 8 bits بس، فـ [[sys.exit(256)]] بيطلع 0! وعلى ويندوز بيفضل 256). نص = يتطبع على stderr والكود 1. و [[sys.exit(True)]] = 1.

العرف: 0 نجاح، 1 فشل عام، 2 استخدام غلط (argparse بيخرج بيه)، و 130 لو اتقفل بـ Ctrl+C على لينكس وماك (Python بيعمل كده لوحده لو [[KeyboardInterrupt]] ماتمسكش). على ويندوز Ctrl+C بيدّي رقم ويندوز خاص: [[-1073741510]] (يعني [[0xC000013A]]).

تقرا الكود: bash [[echo $?]]، و PowerShell [[$LASTEXITCODE]] (مش [[$?]]، دي هناك True أو False بس)، و CMD [[echo %ERRORLEVEL%]].

[[f"{', '.join(missing)}"]]: علامات تنصيص مختلفة جوه الـ f-string. قبل Python 3.12 كان لازم، لأن نفس النوع كان بيقفل الـ f-string. من 3.12 مسموح، بس المختلف أوضح وبيشتغل على أي نسخة.`,
            when: "كل سكربت. وخصوصًا اللي بيتجدول، أو بيتنادى من سكربت تاني، أو بيتحط في CI أو pre-commit.",
            mistakes: R`[[except Exception: print(e)]] من غير خروج بكود غلط: الفشل بقى نجاح. و [[exit()]] بدل [[sys.exit()]]: دي معمولة للـ REPL ومش مضمونة تبقى موجودة (مع [[python -S]] مثلًا). والرسايل كلها على stdout فتبوظ أي pipe أو ملف.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيفحص ملف إعدادات JSON قبل ما حاجة تانية تستخدمه: موجود؟ JSON سليم؟ فيه المفتاحين المطلوبين؟ ولكل غلطة رسالة على stderr و exit code مختلف، فأي برنامج تاني (bash أو CI أو cron) يعرف حصل إيه من غير ما يقرا الكلام. اتشغّل على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز في PowerShell 7 و 5.1 و CMD.

---

## ١. الملف منين

~~~python check_config.py
import json
import sys
from pathlib import Path
path = Path(sys.argv[1] if len(sys.argv) > 1 else "config.json")
~~~

[[json]] موديول قراية وكتابة JSON. والسطر الأخير: لو فيه argument خده، غير كده [["config.json"]]، وحوّله [[Path]].

---

## ٢. مش موجود: stderr و 2

~~~python check_config.py
if not path.exists():
    print(f"error: {path} not found", file=sys.stderr)
    sys.exit(2)
~~~

- [[path.exists()]]: True لو فيه ملف أو فولدر بالاسم ده.
- [[file=sys.stderr]]: كل برنامج ليه قناتين للكتابة: **stdout** (الناتج العادي، رقم 1) و **stderr** (الأخطاء والتحذيرات، رقم 2). الاتنين بيظهروا على الشاشة، بس الـ redirect بيفصلهم.
- [[sys.exit(2)]]: اخرج حالًا بالرقم 2.

~~~text الناتج: python3 check_config.py ثم echo $?
error: config.json not found
2
~~~

[[$?]] في bash = exit code آخر أمر. الأرقام في الدرس كله:

| الرقم | معناه بالعرف |
|---|---|
| 0 | نجح |
| 1 | فشل عام |
| 2 | استخدام غلط أو حاجة ناقصة في المدخلات |

---

## ٣. JSON بايظ: رسالة و 1 في سطر واحد

~~~python check_config.py
try:
    config = json.loads(path.read_text(encoding="utf-8"))
except json.JSONDecodeError as e:
    sys.exit(f"error: {path} is not valid JSON: {e}")
~~~

- [[path.read_text(encoding="utf-8")]]: اقرا الملف كله نص.
- [[json.loads(...)]]: **load s**tring: حوّل نص JSON لـ dict في Python.
- [[json.JSONDecodeError]]: الـ exception اللي loads بيرميه لو النص مش JSON سليم، و [[e]] فيه السبب والمكان.
- [[sys.exit("نص")]]: لما تدّيه نص بدل رقم، بيطبعه على stderr ويخرج بـ 1. يعني سطر واحد بدل [[print(..., file=sys.stderr)]] و [[sys.exit(1)]].

بـ [[{"db_url": "x",}]] (فاصلة زيادة):

~~~text الناتج
error: config.json is not valid JSON: Illegal trailing comma before end of object: line 1 column 15 (char 14)
1
~~~

[[line 1 column 15]] بيقولك مكان الغلطة بالظبط. (Python 3.12 بتاع أوبونتو 24.04 بيطلّع رسالة تانية لنفس الغلطة: [[Expecting property name enclosed in double quotes]].)

---

## ٤. مفاتيح ناقصة

~~~python check_config.py
missing = [k for k in ("db_url", "backup_dir") if k not in config]
if missing:
    sys.exit(f"error: missing keys: {', '.join(missing)}")
print("config ok")
~~~

- [[[k for k in (...) if k not in config] ]]: list comprehension: «لكل مفتاح مطلوب، خده لو مش موجود في config». النتيجة لستة الناقص.
- [[if missing:]]: لستة فيها حاجة = True.
- [[', '.join(missing)]]: اربط العناصر بـ [[, ]] بينهم. والـ quotes الـ single جوه f-string بـ double عشان الاتنين ميتلخبطوش (لازم قبل Python 3.12).
- [[print("config ok")]] وبعدها الملف بيخلص، فالـ exit code بيبقى 0 لوحده.

~~~text الناتج
{"db_url": "x"}                       →  error: missing keys: backup_dir       (1)
{"db_url": "x", "backup_dir": "/b"}   →  config ok                             (0)
~~~

---

## ٥. ليه الـ exit code مهم

### [[&&]]

~~~text الناتج: python3 check_config.py && echo deploying
config ok
deploying
~~~

[[&&]] معناها «شغّل اللي بعدي **بس** لو اللي قبلي خرج بـ 0». لو الإعدادات ناقصة، [[deploying]] مش هيتطبع. واتجرب في PowerShell 7 بنفس النتيجة (Windows PowerShell 5.1 مفيهوش [[&&]]).

### الـ redirect بيفصل القناتين

~~~bash
python3 check_config.py nope.json > out.txt 2> err.txt
~~~

[[>]] بيحوّل stdout لملف، و [[2>]] بيحوّل stderr (القناة رقم 2) لملف تاني:

~~~text الناتج
out.txt:  (فاضي)
err.txt:  error: nope.json not found
~~~

لو الرسالة كانت بـ [[print]] عادي كانت هتروح في out.txt وسط «البيانات».

---

## ٦. تفاصيل [[sys.exit]] اتجربت

| الكود | لينكس | ويندوز |
|---|---|---|
| [[sys.exit()]] | 0 | 0 |
| [[sys.exit(True)]] | 1 | 1 |
| [[sys.exit(256)]] | **0** (النظام بياخد آخر 8 bits بس) | 256 |
| [[KeyboardInterrupt]] (Ctrl+C) | 130 | [[-1073741510]] |

و [[sys.exit]] مش بيقفل البرنامج على طول، ده بيرمي exception اسمه [[SystemExit]]. عشان كده [[finally]] بيلحق يشتغل:

~~~python
try:
    sys.exit(3)
finally:
    print("finally ran")
~~~

~~~text الناتج
finally ran
~~~

والـ exit code كان 3.

---

## ٧. تقرا الـ exit code منين

| الشيل | الأمر | ملاحظة |
|---|---|---|
| bash و zsh | [[echo $?]] | |
| PowerShell | [[$LASTEXITCODE]] | [[$?]] هناك True أو False بس: طلع [[2 False]] |
| CMD | [[echo %ERRORLEVEL%]] | جربته من ملف [[.bat]] وطبع 2 |

## الخلاصة

- [[sys.exit(رقم)]] للكود، و [[sys.exit("نص")]] رسالة على stderr + 1.
- الأخطاء على stderr، والبيانات على stdout.
- 0 بس معناه نجاح، وده اللي [[&&]] و cron و CI بيبصوا عليه.`,
          lines: [
            R`[[json]] عشان [[json.loads]] (تحويل نص الملف لـ dict) و [[json.JSONDecodeError]] (الـ error اللي بيطلع لو الملف مش JSON سليم).`,
            R`[[sys]] عشان [[sys.argv]] (اسم ملف الإعدادات لو اتكتب)، و [[sys.stderr]] (رسايل الأخطاء)، و [[sys.exit]] (نطلع بكود خطأ).`,
            R`[[Path]] عشان [[.exists()]] (الملف موجود؟) و [[.read_text()]] (اقرا الملف كله كنص في سطر واحد).`,
            R`لو فيه argument بعد اسم السكربت يبقى هو اسم الملف، وإلا الافتراضي [[config.json]]. [[len(sys.argv) > 1]] بتتأكد الأول، لأن [[sys.argv[1] ]] من غير argument تقع بـ IndexError.`,
            R`بيتأكد إن الملف موجود قبل ما يحاول يقراه، عشان يطلّع رسالة قصيرة واضحة بدل traceback [[FileNotFoundError]] طويل.`,
            R`رسالة الخطأ بـ [[file=sys.stderr]]: بتظهر على الشاشة حتى لو الناتج متحوّل لملف، ومتتخلطش مع الناتج العادي. وفيها اسم الملف عشان اليوزر يعرف أنهي ملف.`,
            R`يخرج بكود 2. السكربت ده بيستخدم 2 لـ «الملف مش موجود» و 1 لـ «الملف موجود بس فيه مشكلة»، فاللي بيشغّله (سكربت تاني أو CI) يفرّق بينهم بـ [[$?]].`,
            R`[[try]] حوالين القراية والتحويل، لأن الملف ممكن يبقى موجود بس محتواه JSON بايظ.`,
            R`[[read_text]] بيقرا الملف كله كنص بـ utf-8، و [[json.loads]] بيحوّل النص لـ dict. لو النص مش JSON سليم بيرمي [[JSONDecodeError]] واللي تحت بيمسكه.`,
            R`بيمسك الـ error ده بس ويحطه في [[e]]، والـ [[e]] فيه وصف الغلط ورقم السطر والعمود اللي فيهم.`,
            R`[[sys.exit]] بنص: بيطبعه على stderr ويخرج بكود 1، في سطر واحد بدل print وبعده exit. والرسالة فيها [[e]] زي [[line 1 column 2]]، فاليوزر يروح لمكان الغلط على طول.`,
            R`list comprehension: بيلف على المفاتيح اللي لازم تكون موجودة ويحتفظ باللي مش في [[config]]. كده نعرف كل الناقص مرة واحدة، بدل ما اليوزر يصلّح واحد ويشغّل يلاقي التاني.`,
            R`الـ list الفاضية بتتحسب False، فالشرط ده بيتنفّذ بس لو فيه مفتاح واحد ناقص على الأقل.`,
            R`يخرج بكود 1 ويقول المفاتيح الناقصة كلها مفصولة بفاصلة: [[', '.join]] بيلزق عناصر الـ list والنص ده بينهم.`,
            R`لو وصل هنا يبقى الملف موجود وسليم وكامل. السكربت بيخلص عادي من غير [[sys.exit]]، و Python بيخرج بـ 0 لوحده، يعني نجاح.`
          ],
          sol: R`النتايج بالترتيب:

من غير ملف: [[error: config.json not found]] و [[$?]] = 2.
الفاصلة الزيادة على Python 3.13 وأحدث: [[error: config.json is not valid JSON: Illegal trailing comma before end of object: line 1 column 15 (char 14)]] و 1. وعلى 3.12 (اللي على أوبونتو 24.04) نفس الحالة طلّعت رسالة أقل وضوحًا: [[Expecting property name enclosed in double quotes: line 1 column 16 (char 15)]].
مفتاح ناقص: [[error: missing keys: backup_dir]] و 1.
سليم: [[config ok]] وبعدها [[deploying]] و 0.

ومع [[> out.txt 2> err.txt]] على ملف مش موجود: الشاشة فاضية، و [[out.txt]] فاضي، و [[err.txt]] فيه سطر الخطأ. لو كنت طبعت الخطأ بـ print عادي كان راح في out.txt.

وجربت كمان على لينكس: Ctrl+C على سكربت شغال خرج بـ 130، و [[sys.exit(256)]] خرج بـ 0 مش 256. وعلى ويندوز [[sys.exit(256)]] طلّع [[$LASTEXITCODE]] = 256، و KeyboardInterrupt طلّع [[-1073741510]].`
        },
        {
          cmd: "print و f-strings للتقارير",
          title: "تقرير مترتب في الترمنال",
          desc: R`أغلب السكربتات آخرها تقرير: عدد الملفات، المساحة، اللي نجح واللي فشل. الـ f-string بيظبط العرض والمحاذاة: [[{name:<26}]] على الشمال بعرض 26، و [[{size:>10}]] على اليمين، و [[{n:,}]] بفواصل الآلاف، و [[{ratio:.1%}]] كنسبة مئوية.

وأي حاجة مش جزء من التقرير نفسه (debug، تحذيرات) تروح stderr، فلو حد عمل [[> report.txt]] ياخد التقرير نضيف. أساسيات الـ f-strings في درس «f-strings» في تاب «Python و FastAPI».`,
          example: R`import sys
from pathlib import Path
def human(n: float) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
rows = sorted(((p.name, p.stat().st_size) for p in folder.iterdir() if p.is_file()), key=lambda r: r[1], reverse=True)
total = sum(size for _, size in rows)
print(f"{'file':<26}{'size':>10}{'share':>8}")
print("-" * 44)
for name, size in rows[:5]:
    short = name if len(name) <= 24 else name[:21] + "..."
    print(f"{short:<26}{human(size):>10}{(size / total if total else 0):>8.1%}")
print("-" * 44)
print(f"{len(rows)} files, {total:,} bytes ({human(total)})")
print(f"{total=} {len(rows)=}", file=sys.stderr)`,
          try: R`شغّله على فولدر فيه ملفات بأحجام مختلفة، وبعدين [[python3 report.py > r.txt]] وشوف إيه اللي ظهر على الشاشة وإيه اللي راح في الملف. وبعدين غيّر عمود النسبة لعمود فيه تاريخ آخر تعديل بالشكل [[2026-09-20 10:30]].`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيطبعه [[print(f"[{'ab':>5}] [{'ab':^6}] [{3.14159:.2f}] [{1234567:,}] [{0.256:.1%}] [{7:03d}]")]]؟ اكتبه حرف حرف وبعدين شغّله.`, done: R`[[[   ab] [  ab  ] [3.14] [1,234,567] [25.6%] [007]]]. يعني [[>]] يمين و [[^]] نص و [[.2f]] كسرين و [[,]] فواصل الآلاف و [[%]] بيضرب في ١٠٠ و [[03d]] بيكمّل أصفار.` },
            { lvl: 'تطبيق', t: R`**أشكال:** اطبع هرم نجوم ارتفاعه ٤ بـ loop وسطر واحد جواها: [[f"{'*' * (2*i+1):^7}|"]]. وبعدين جدول ضرب ٣ صفوف × ٥ أعمدة كل خانة عرضها ٤.`, done: R`الهرم ٤ سطور آخرها [[*******|]] وأولها [[   *   |]] (العلامة [[|]] بتبيّن إن العرض ثابت ٧)، والجدول أول صف [[   1   2   3   4   5]] وآخر صف [[   3   6   9  12  15]] والأعمدة على خط واحد.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** بيانات جاية من CSV: [[price = row["price"]]] وبعدها [[print(f"{price:.2f}")]]. شغّله.`, done: R`[[ValueError: Unknown format code 'f' for object of type 'str']] لأن كل حاجة من CSV نص، وصلّحته بـ [[float(price)]] (أو [[Decimal]] للفلوس)، وبقى بيطبع [[12.50]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لستة لوج فيها ١٠ طلبات [[(path, status)]] بـ ٢٠٠ و ٤٠٤ و ٥٠٠. اطبع جدول: الـ status وعددها ونسبتها، متترتب من الأكتر للأقل، وسطر إجمالي.`, done: R`الأعمدة على خط واحد، والنسب بـ [[.1%]] ومجموعها [[100.0%]]، وسطر الإجمالي فيه [[10]]، و [[> report.txt]] مبيدخلش فيه أي سطر debug (راح stderr).` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** في وثائق Python دوّر على «Format Specification Mini-Language» واعرف إزاي تفصل الآلاف بـ [[_]] بدل الفاصلة، وإيه اللي بيعمله [[=]] و [[!r]] جوه الـ f-string.`, done: R`[[f"{1234.5:_.2f}"]] طبعت [[1_234.50]]، و [[x = 5]] وبعدها [[f"{x=}"]] طبعت [[x=5]] (للـ debugging)، و [[f"{'a'!r}"]] طبعت [['a']] بعلامات التنصيص.` },
            { lvl: 'تحدي', t: R`**refactor:** تقرير مكتوب كده: [["name: " + name + " " * (20 - len(name)) + str(size) + " bytes"]]. حوّله لـ f-string بعرض ثابت، واتأكد إن الناتج حرف بحرف زي القديم، وبعدين اعرف إيه اللي بيحصل لو الاسم أطول من ٢٠.`, done: R`السطر بقى [[f"name: {name:<20}{size} bytes"]] والناتجين متطابقين لأي اسم أقصر من ٢٠. ومع اسم أطول: القديم لزق الاسم في الرقم (لأن [[" " * سالب]] بتطلع فاضي)، و [[:<20]] برضه مبيقصّش، فزوّدت قص زي اللي في المثال ([[name[:17] + "..."]]).` },
          ],
          deep: {
            why: "تقرير متلزّق ([[video.mp4 2507812]]) محدش بيقراه. أعمدة مترتبة وأحجام مقروءة بتخلي الواحد يشوف المشكلة في ثانية.",
            how: R`جوه [[{}]]: القيمة، وبعد [[:]] الشكل. [[<]] شمال، [[>]] يمين، [[^]] نص، والرقم العرض. [[.1f]] رقم عشري واحد، و [[,]] فواصل آلاف، و [[.1%]] بيضرب في 100 ويحط [[%]]. وتقدر تحط تعبير كامل بين قوسين: [[{(size / total if total else 0):>8.1%}]] عشان فولدر ملفاته كلها فاضية ميقسمش على صفر.

[[{total=}]] (من Python 3.8) بيطبع الاسم والقيمة: [[total=2854563]]. مفيد للـ debug السريع.

[[human()]] بتقسم على 1024 لحد ما الرقم يبقى أصغر من 1024. و [[sorted(..., key=lambda r: r[1], reverse=True)]] بيرتّب بالحجم من الأكبر. و [[rows[:5] ]] أول 5 بس.

ولشريط تقدّم في سكربت طويل: [[print(f"\r{i}/{n}", end="", flush=True)]]: [[\r]] بيرجع لأول السطر، و [[end=""]] من غير سطر جديد، و [[flush=True]] يظهر حالًا.`,
            when: "آخر أي سكربت بيلف على حاجات كتير: ملفات، روابط، صفوف.",
            mistakes: R`العربي في أعمدة مترتبة: الترمنال بيعرضه من اليمين للشمال وعرض الحروف بيختلف، فالمحاذاة بتبوظ. خلّي الأعمدة اللي محتاجة محاذاة بالإنجليزي أو حط العربي في آخر عمود. وأسماء طويلة بتزق باقي السطر: قصّها زي [[short]]. والـ debug بـ print على stdout بيوسّخ الملف.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيلف على ملفات فولدر، ويرتّبها بالحجم، ويطبع أكبر ٥ في جدول بـ ٣ أعمدة (الاسم، والحجم مقروء، والنسبة من المجموع)، وتحته ملخص. اتشغّل على لينكس ([[docker run --rm python:3.13]]) على فولدر فيه ٧ ملفات عملتهم بأحجام معروفة بـ [[head -c]]، وعلى ويندوز في PowerShell 7.

---

## ١. [[human()]]: من bytes لحجم مقروء

~~~python report.py
def human(n: float) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
~~~

- بتلف على الوحدات بالترتيب. لو الرقم أصغر من 1024 يبقى الوحدة دي مناسبة: رجّعه.
- غير كده [[n /= 1024]] (يعني [[n = n / 1024]]) وجرّب الوحدة الأكبر.
- [[:.0f]] رقم من غير كسور (البايت مفيهوش نص)، و [[:.1f]] رقم عشري واحد. **f** = fixed-point.
- لو عدّى الـ GB، السطر الأخير يرجّع TB.

مثال: 2500000 → أكبر من 1024 فنقسم → 2441.4 KB → أكبر فنقسم → 2.38 MB → [[2.4 MB]].

---

## ٢. الملفات مترتبة

~~~python report.py
folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
rows = sorted(((p.name, p.stat().st_size) for p in folder.iterdir() if p.is_file()), key=lambda r: r[1], reverse=True)
total = sum(size for _, size in rows)
~~~

السطر الطويل من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[folder.iterdir()]] | كل حاجة جوه الفولدر |
| [[if p.is_file()]] | الملفات بس، من غير فولدرات |
| [[p.stat().st_size]] | حجم الملف بالـ byte. [[stat]] بيرجّع معلومات الملف من النظام |
| [[(p.name, ...)]] | tuple: الاسم والحجم مع بعض |
| [[sorted(..., key=lambda r: r[1])]] | رتّب. [[key]] بيقول «رتّب بإيه»، و [[lambda r: r[1] ]] دالة صغيرة من غير اسم بترجّع العنصر رقم 1 (الحجم) |
| [[reverse=True]] | من الأكبر للأصغر |

جربت نفس الفكرة على لستة صغيرة: [[sorted([("a",3),("b",9),("c",1)], key=lambda r: r[1], reverse=True)]] طلّع [[[('b', 9), ('a', 3), ('c', 1)] ]].

و [[sum(size for _, size in rows)]]: لكل tuple، فكّه لاتنين وتجاهل الأول ([[_]])، واجمع الأحجام.

---

## ٣. الجدول: الـ format spec

اللي بعد [[:]] جوه [[{}]] اسمه **format spec**، وبيقول القيمة تتكتب إزاي:

~~~python report.py
print(f"{'file':<26}{'size':>10}{'share':>8}")
print("-" * 44)
~~~

| الشكل | معناه | جربته على [[ab]] |
|---|---|---|
| [[:<6]] | شمال، عرض 6 | [[[ab    ] ]] |
| [[:>6]] | يمين، عرض 6 | [[[    ab] ]] |
| [[:^6]] | في النص | [[[  ab  ] ]] |

فالعناوين [[file]] و [[size]] و [[share]] بتاخد نفس عرض الأعمدة اللي تحتها، و 26 + 10 + 8 = 44، عشان كده الخط [["-" * 44]] (النص متكرر 44 مرة) طوله نفس طول السطر.

~~~python report.py
for name, size in rows[:5]:
    short = name if len(name) <= 24 else name[:21] + "..."
    print(f"{short:<26}{human(size):>10}{(size / total if total else 0):>8.1%}")
~~~

- [[rows[:5] ]]: أول ٥ بس.
- [[name[:21] + "..."]]: أول 21 حرف وبعدهم [[...]]، يعني 24 حرف بالظبط، فالاسم الطويل ميزقّش الأعمدة.
- [[(size / total if total else 0)]]: النسبة، ولو المجموع صفر (ملفات كلها فاضية) حط 0 بدل ما تقسم على صفر. جربت فولدر فيه ملفين فاضيين وطلع [[0.0%]] من غير error.
- [[:>8.1%]]: يمين بعرض 8، و [[.1%]] اضرب في 100 وحط [[%]] برقم عشري واحد: [[0.876]] بقت [[87.6%]].

---

## ٤. الملخص و سطر الـ debug

~~~python report.py
print(f"{len(rows)} files, {total:,} bytes ({human(total)})")
print(f"{total=} {len(rows)=}", file=sys.stderr)
~~~

- [[:,]]: فواصل الآلاف: [[2500000]] بقت [[2,500,000]].
- [[{total=}]]: علامة [[=]] في الآخر بتطبع **الاسم والقيمة**: [[total=2853368]]. مفيد للـ debug.
- [[file=sys.stderr]]: السطر ده مش جزء من التقرير، فيروح stderr.

---

## ٥. الناتج كله

~~~text الناتج: python3 report.py
total=2853368 len(rows)=7
file                            size   share
--------------------------------------------
video_lecture.mp4             2.4 MB   87.6%
photo.jpg                   332.0 KB   11.9%
notes.pdf                    11.7 KB    0.4%
a very long file name...       900 B    0.0%
a.txt                          300 B    0.0%
--------------------------------------------
7 files, 2,853,368 bytes (2.7 MB)
~~~

سطر الـ debug ظهر **الأول** مع إنه آخر سطر في الكود: stderr بيظهر على طول، و stdout بيتجمّع ويطلع مرة واحدة لما الناتج مش رايح لترمنال حقيقي. ٧ ملفات بس الجدول ٥، لأن [[[:5] ]].

ومع [[python3 report.py > r.txt]]: الشاشة فضل عليها [[total=2853368 len(rows)=8]] بس (8 لأن الشيل عمل [[r.txt]] الفاضي قبل ما السكربت يبدأ)، والتقرير كله في الملف. ونفس الكلام على ويندوز في PowerShell 7.

---

## ٦. الحل: عمود تاريخ بدل النسبة

~~~python solCode
from datetime import datetime
...
files = sorted((p for p in folder.iterdir() if p.is_file()), key=lambda p: p.stat().st_size, reverse=True)
...
    st = p.stat()
    modified = datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M")
    print(f"{name:<26}{human(st.st_size):>10}{modified:>18}")
~~~

- الترتيب بقى على الـ Path نفسه بدل tuple، عشان نحتاج [[stat()]] تاني.
- [[st.st_mtime]]: وقت آخر تعديل بالثواني من 1970 (اسمه Unix timestamp). **m** = modified.
- [[datetime.fromtimestamp(...)]]: حوّله تاريخ ووقت بتوقيت الجهاز.
- [[.strftime("%Y-%m-%d %H:%M")]]: **str**ing **f**ormat **time**: اكتبه بالشكل ده. [[%Y]] السنة، و [[%m]] الشهر، و [[%d]] اليوم، و [[%H]] الساعة (24)، و [[%M]] الدقيقة.
- [[:>18]] عشان التاريخ 16 حرف ومسافتين قبله. والخط بقى 26 + 10 + 18 = 54.

~~~text الناتج (photo.jpg اتغير تاريخها بـ touch -d)
file                            size          modified
------------------------------------------------------
video_lecture.mp4             2.4 MB  2026-10-06 17:57
photo.jpg                   332.0 KB  2026-09-20 10:30
~~~

---

## الخلاصة

| الشكل | النتيجة |
|---|---|
| [[{x:<26}]] / [[{x:>10}]] / [[{x:^6}]] | شمال / يمين / نص بعرض ثابت |
| [[{x:.1f}]] | رقم عشري واحد |
| [[{x:,}]] | فاصلة كل 3 أرقام، فـ 12345678 تبقى [[12,345,678]] |
| [[{x:.1%}]] | يضرب في 100 ويحط [[%]] برقم عشري واحد: 0.256 تبقى [[25.6%]] |
| [[{x=}]] | يطبع اسم المتغير وقيمته مع بعض، زي [[total=5]]، للـ debug |

- عرض العناوين = عرض الأعمدة، والأسماء الطويلة تتقص.
- التقرير على stdout، والـ debug على stderr.`,
          lines: [
            R`[[sys]] عشان [[sys.argv]] (الفولدر اللي هنعمل له تقرير) و [[sys.stderr]] (سطر الـ debug في الآخر يروح بعيد عن التقرير).`,
            R`[[Path]] عشان [[.iterdir()]] (اللف على اللي جوه الفولدر) و [[.stat()]] (حجم كل ملف).`,
            R`دالة بتحوّل عدد بايتات زي [[1536]] لنص مقروء زي [[1.5 KB]]. و [[n: float]] لأننا هنقسم ونطلع كسور.`,
            R`بيجرّب الوحدات من الأصغر للأكبر بالترتيب، ويقف عند أول وحدة الرقم فيها أصغر من 1024.`,
            R`لو الرقم بقى أقل من 1024 يبقى الوحدة دي مناسبة (مثلًا 900 بايت، أو 1.5 بعد ما اتقسم مرة يبقى KB).`,
            R`[[:.0f]] من غير كسور و [[:.1f]] برقم واحد بعد العلامة. البايت مفيهوش نص بايت فبيطلع [[900 B]]، والباقي زي [[1.5 MB]].`,
            R`[[/=]] بيقسم الرقم على 1024 ويخزّنه تاني في [[n]]، فاللفة الجاية تجرّب الوحدة الأكبر بالرقم الجديد.`,
            R`لو اللفة خلصت من غير ما ترجّع، يبقى الرقم لسه 1024 GB أو أكتر، فبيرجّعه بالـ TB. من غير السطر ده الدالة كانت هترجّع [[None]] للأحجام الكبيرة جدًا.`,
            R`الفولدر من أول argument لو موجود، وإلا [["."]] يعني الفولدر الحالي.`,
            R`[[iterdir()]] بيجيب كل حاجة في الفولدر، و [[if p.is_file()]] بيشيل الفولدرات. لكل ملف tuple فيه الاسم والحجم ([[st_size]] بالبايت)، و [[key=lambda r: r[1] ]] بيرتّب بالحجم، و [[reverse=True]] من الأكبر للأصغر.`,
            R`بيجمع الأحجام بس، و [[_]] بتتجاهل الاسم في كل tuple. المجموع ده هنحتاجه للنسبة المئوية وللملخص.`,
            R`سطر العناوين: [[:<26]] نص مزقوق شمال في 26 خانة، و [[:>10]] و [[:>8]] يمين. لازم نفس العرض اللي في الصفوف تحت، عشان كل عمود ييجي تحت عنوانه.`,
            R`[[*]] على نص بتكرره: 44 شَرطة، وده مجموع عرض الأعمدة (26 + 10 + 8)، فالخط بطول الجدول بالظبط.`,
            R`[[rows[:5] ]] أول 5 بس، ولأن الـ list مترتبة من الأكبر يبقوا أكبر 5 ملفات. لو الملفات أقل من 5 بياخد الموجود من غير error.`,
            R`لو الاسم أطول من 24 حرف بياخد أول 21 ويحط [[...]] (تلات حروف)، فيفضل 24 والأعمدة ماتتزقّش. من غير ده اسم طويل هيبوّظ الصف كله.`,
            R`الصف: الاسم شمال، والحجم المقروء يمين، و [[:>8.1%]] بيضرب الكسر في 100 ويحط علامة [[%]] برقم عشري واحد. و [[if total else 0]] بتحمي من القسمة على صفر لو كل الملفات فاضية.`,
            R`نفس الخط تاني يقفل الجدول من تحت.`,
            R`سطر الملخص: عدد الملفات، و [[{total:,}]] بيحط فاصلة كل 3 أرقام (زي [[12,345,678]]) عشان الرقم الكبير يتقري، وجنبه الحجم المقروء.`,
            R`[[{total=}]] بيطبع اسم المتغير وقيمته ([[total=5]])، مفيد للـ debug بسرعة. ورايح على stderr عشان لو حد حوّل التقرير لملف بـ [[>]] السطر ده ميدخلش فيه.`
          ],
          sol: R`على فولدر فيه فيديو وصورة و pdf وملفات صغيرة طلع:

[[file                            size   share]]
[[video_lecture.mp4             2.4 MB   87.6%]]
[[photo.jpg                   332.0 KB   11.9%]]
[[notes.pdf                    11.7 KB    0.4%]]
[[a very long file name...       900 B    0.0%]]
[[7 files, 2,854,563 bytes (2.7 MB)]]

ومع [[> r.txt]]: الشاشة فضل عليها سطر واحد بس [[total=2854563 len(rows)=8]] (8 لأن r.txt نفسه اتعمل قبل ما السكربت يبدأ)، والتقرير كله راح في الملف.

بعد ما بدّلت النسبة بالتاريخ (الكود تحت):

[[file                            size          modified]]
[[photo.jpg                   332.0 KB  2026-09-20 10:30]]

[[datetime.fromtimestamp(st.st_mtime)]] بيحوّل الوقت من ثواني لتاريخ بتوقيت جهازك، و [[strftime]] بيكتبه بالشكل اللي عايزه.`,
          solCode: R`import sys
from datetime import datetime
from pathlib import Path
def human(n: float) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
files = sorted((p for p in folder.iterdir() if p.is_file()), key=lambda p: p.stat().st_size, reverse=True)
print(f"{'file':<26}{'size':>10}{'modified':>18}")
print("-" * 54)
for p in files[:5]:
    st = p.stat()
    name = p.name if len(p.name) <= 24 else p.name[:21] + "..."
    modified = datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M")
    print(f"{name:<26}{human(st.st_size):>10}{modified:>18}")
print("-" * 54)
print(f"{len(files)} files, {human(sum(p.stat().st_size for p in files))}")`
        }
      ]
    }
]);
