// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "أول سكربت Python",
      l: 1,
      n: "تكتب ملف .py وتشغّله على أي نظام، ياخد arguments أو يسأل، يطبع تقرير مترتب، ويرجّع exit code صح",
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
            "نسخة Python.",
            "شغّل السكربت.",
            "شغّله وابعتله كلمة توصل في sys.argv.",
            "شغّله، وبعد ما يخلص افتح REPL ومعاك متغيراته.",
            "الـ launcher بتاع ويندوز ونسخة Python اللي هيشغّلها.",
            "النسخ المتسطّبة على الجهاز.",
            "نفس التشغيل بالـ launcher.",
            "شغّل بنسخة معيّنة (لازم تكون متسطبة، و [[py --list]] بيقولك عندك إيه)."
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
            "اتأكد إن أول سطر هو الـ shebang.",
            "صلاحية تنفيذ.",
            "شغّله باسمه من الفولدر الحالي.",
            "فولدر للأوامر بتاعتك.",
            "انسخه هناك من غير .py.",
            "بقى أمر من أي مكان.",
            "ضيف الفولدر للـ PATH لو مش موجود (وافتح ترمنال جديد).",
            "على ويندوز: [[py]] بيقرا الـ shebang ويشغّل بيه، و chmod مالوش لازمة هناك."
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
            "وصف السكربت (docstring).",
            "sys للـ argv و stderr و exit.",
            "Path للملفات.",
            "دالة بتعد سطور ملف واحد.",
            "افتح الملف بـ utf-8.",
            "عد السطور واحد واحد من غير ما تحمّل الملف كله.",
            "main بتاخد الـ arguments كـ list وبترجّع exit code.",
            "مفيش ملفات؟",
            "رسالة الاستخدام على stderr.",
            "2 = استخدام غلط.",
            "المجموع.",
            "لكل ملف:",
            "عد سطوره.",
            "اطبع العدد بعرض 6 على اليمين.",
            "زوّد المجموع.",
            "سطر المجموع.",
            "نجح.",
            "لو الملف ده اتشغّل مباشرة (مش import):",
            "شغّل main ورجّع رقمها كـ exit code."
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
            "sys.",
            "اطبع اللي وصل فعلًا.",
            "من غير اسم السكربت.",
            "أول argument، ولو مفيش اسأل، ولو داس Enter خليه الفولدر الحالي.",
            "حاول...",
            "...تحوّل الرد لرقم، و Enter لوحده = 30.",
            "مكتوب كلام مش رقم:",
            "اخرج برسالة على stderr وكود 1.",
            "سؤال تأكيد.",
            "أي رد غير y أو yes يبقى لأ.",
            "اخرج من غير ما تعمل حاجة.",
            "كمّل."
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
            "json.",
            "sys.",
            "Path.",
            "الملف من الـ argument أو config.json.",
            "مش موجود؟",
            "الرسالة على stderr...",
            "...واخرج بـ 2.",
            "حاول...",
            "...تقرا الملف كـ JSON.",
            "لو JSON بايظ:",
            "اطبع السبب واخرج بـ 1 في سطر واحد.",
            "المفاتيح الناقصة.",
            "لو فيه ناقص:",
            "اخرج بـ 1 وقول إيه الناقص.",
            "كله تمام، والخروج 0 لوحده."
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
| [[{x:,}]] | فواصل آلاف |
| [[{x:.1%}]] | نسبة مئوية |
| [[{x=}]] | الاسم والقيمة |

- عرض العناوين = عرض الأعمدة، والأسماء الطويلة تتقص.
- التقرير على stdout، والـ debug على stderr.`,
          lines: [
            "sys.",
            "Path.",
            "دالة بتحوّل البايتات لحجم مقروء.",
            "جرّب كل وحدة بالترتيب:",
            "لو الرقم بقى أصغر من 1024...",
            "...رجّعه بالوحدة دي (البايت من غير كسور).",
            "قسّم وجرّب الوحدة الأكبر.",
            "أكبر من كده.",
            "الفولدر من الـ argument أو الحالي.",
            "(الاسم، الحجم) لكل ملف، مترتبين من الأكبر.",
            "المجموع.",
            "عناوين الأعمدة بنفس العرض.",
            "خط.",
            "أكبر 5:",
            "قصّ الاسم الطويل.",
            "صف: شمال، يمين، نسبة مئوية (ومن غير قسمة على صفر).",
            "خط.",
            "الملخص بفواصل الآلاف.",
            "سطر debug على stderr."
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
