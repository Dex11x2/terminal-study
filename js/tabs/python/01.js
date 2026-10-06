// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("python", {
  label: "Python",
  prompt: "(venv) $ ",
  lab: R`mkdir -p ~/lab/py && cd ~/lab/py
python3 -m venv .venv
source .venv/bin/activate`,
  labText: "كل مشروع Python ليه venv خاص بيه. على ويندوز التفعيل بـ .venv\\Scripts\\Activate.ps1 بدل source.",
  levels: {"1":["البداية","تشغيل Python، و venv و pip، وأول سكربت: تشغيله، والـ arguments والـ exit codes، والملفات والفولدرات بـ pathlib و shutil"],"2":["المتوسط","pytest بالتفصيل، والـ debugging، و FastAPI بـ uvicorn، وأدوات السكربتات (argparse و JSON و CSV و YAML و logging و subprocess و HTTP و re)، وسكربتات أتمتة كاملة"],"3":["المتقدم","Python جوه Docker وعلى السيرفر، وسكربتات محترمة: تتسطّب كأمر، وتتجدول، وتستحمل الأخطاء، وتشتغل بالتوازي، وتتختبر"]},
  categories: [
    {
      t: "البيئة والمكتبات",
      l: 1,
      n: "كل مشروع في venv خاص بيه، والمكتبات بنسخ ثابتة",
      items: [
        {
          cmd: "python3 -m venv .venv",
          title: "بيئة معزولة لكل مشروع",
          desc: R`الـ venv فولدر جوه المشروع فيه Python ومكتبات خاصة بالمشروع ده بس. فمشروع محتاج FastAPI نسخة قديمة ومشروع تاني محتاج الجديدة، كل واحد في حاله.

[[activate]] بيخلي [[python]] و [[pip]] في الترمنال ده يشاوروا على الـ venv، وبيظهر [[(.venv)]] في أول السطر. و [[deactivate]] يرجّعك.`,
          example: R`# Linux و Mac:
python3 -m venv .venv
source .venv/bin/activate
which python
deactivate
# Windows (PowerShell):
py -m venv .venv
.venv\Scripts\Activate.ps1
(Get-Command python).Source
deactivate
# Windows (CMD):
py -m venv .venv
.venv\Scripts\activate.bat
where python
deactivate`,
          try: "اعمل venv في فولدر تجربة، وفعّله، وشوف [[which python]] بيشاور على جوه .venv. على ويندوز: [[(Get-Command python).Source]] في PowerShell، أو [[where python]] في CMD.",
          deep: {
            why: "من غير venv كل المكتبات بتتسطّب في Python بتاع النظام: المشاريع بتدوس على بعض، وعلى أوبونتو الجديد pip أصلًا بيرفض.",
            how: R`[[python3 -m venv .venv]] بيعمل فولدر [[.venv]] فيه لينك لـ Python، و pip، وفولدر site-packages فاضي للمكتبات.

[[activate]] مش سحر: بيحط [[.venv/bin]] (أو [[.venv\Scripts]] على ويندوز) في أول الـ PATH، فأول python يلاقيه الشيل هو اللي جوه الـ venv. عشان كده التفعيل للترمنال ده بس، وأي ترمنال جديد محتاج تفعيل تاني.

مش لازم تفعّل أصلًا: [[.venv/bin/python app.py]] بيشتغل بمكتبات الـ venv على طول. ودي الطريقة الصح في cron و systemd.

على ويندوز [[py]] هو الـ launcher اللي بييجي مع Python من python.org، ولو مش موجود عندك اكتب [[python -m venv .venv]]. ولو PowerShell رفض يشغّل Activate.ps1 بسبب execution policy: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة.

ومتكتبش [[where python]] في PowerShell: [[where]] هناك اختصار لـ [[Where-Object]]، فمش بيطبع حاجة ولا بيطلع error. استخدم [[(Get-Command python).Source]] أو [[where.exe python]].

على أوبونتو لو طلع [[ensurepip is not available]]: [[sudo apt install python3-venv]].

و [[.venv/]] يتحط في .gitignore: كل واحد يعمل الـ venv بتاعه ويسطّب من requirements.txt.`,
            when: "أول حاجة في أي مشروع Python، قبل أي pip install.",
            mistakes: "commit لفولدر .venv. وتنقل فولدر المشروع لمكان تاني فالـ venv يبوظ (جواه مسارات ثابتة): امسحه واعمله تاني. وتنسى التفعيل فـ pip يسطّب في مكان تاني وتلاقي [[ModuleNotFoundError]]."
          },
          teach: R`## المثال بيعمل إيه؟

٤ خطوات بتتكرر على كل نظام: **اعمل** الـ venv، و**فعّله**، و**اتأكد** إن [[python]] بقى بتاع الـ venv، و**ارجع** زي ما كنت. الفرق بين الأنظمة في شكل الأوامر بس. اتشغّل على لينكس في [[docker run --rm ubuntu:24.04]] (Python 3.12.3)، وعلى ويندوز 11 في PowerShell 7 و Windows PowerShell 5.1 و CMD (Python 3.14.3).

---

## ١. لينكس وماك

### [[python3 -m venv .venv]]: اعمل البيئة

نفك الأمر حتة حتة:

| الحتة | معناها |
|---|---|
| [[python3]] | Python بتاع الجهاز. على أوبونتو اسمه [[python3]]، و [[python]] لوحده مش موجود |
| [[-m]] | من **module**: شغّل موديول باسمه (درس «python -m») |
| [[venv]] | الموديول اللي بيعمل الـ virtual environment، جاي مع Python |
| [[.venv]] | اسم الفولدر اللي هيتعمل. النقطة في أوله بتخليه مخفي على لينكس وماك، والاسم ده هو العرف |

الأمر مبيطبعش حاجة لو نجح. نبص جوه الفولدر اللي اتعمل:

~~~bash
ls .venv
ls .venv/bin
~~~

~~~text الناتج (أوبونتو 24.04)
bin  include  lib  lib64  pyvenv.cfg
Activate.ps1  activate  activate.csh  activate.fish  pip  pip3  pip3.12  python  python3  python3.12
~~~

- [[bin]]: البرامج. فيه [[python]] (لينك لـ Python بتاع النظام) و [[pip]] خاص بالـ venv، وسكربتات التفعيل لكل shell ([[activate]] لـ bash و zsh، و [[.fish]] و [[.csh]] لشيلات تانية).
- [[lib]]: فيه [[site-packages]]، الفولدر اللي المكتبات هتتسطّب فيه. لسه فاضي تقريبًا.
- [[pyvenv.cfg]]: ملف صغير بيقول الـ venv ده جاي منين:

~~~text pyvenv.cfg
home = /usr/bin
include-system-site-packages = false
version = 3.12.3
executable = /usr/bin/python3.12
~~~

[[include-system-site-packages = false]] هو قلب الفكرة: الـ venv **مش شايف** مكتبات النظام، شايف اللي اتسطّب جواه بس.

> لو الأمر طلّع [[ensurepip is not available]] على أوبونتو، ناقصك باكدج: [[sudo apt install python3-venv]].

### [[source .venv/bin/activate]]: فعّل

[[activate]] ملف فيه أوامر shell. و [[source]] معناها «نفّذ الأوامر دي **جوه الشيل اللي انت فيه**»، مش في shell جديد. ده مهم: لو شغّلته بـ [[bash .venv/bin/activate]] التغيير هيحصل في shell فرعي ويختفي أول ما يقفل. (و [[. .venv/bin/activate]] بنقطة لوحدها هي نفس [[source]].)

التفعيل بيعمل حاجتين بس. بنقارن الـ PATH (لستة الفولدرات اللي الشيل بيدوّر فيها على الأوامر) قبل وبعد:

~~~text قبل
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
~~~

~~~text بعد
/root/lab/.venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
~~~

1. حط [[.venv/bin]] في **أول** الـ PATH، فأول [[python]] أو [[pip]] الشيل يلاقيه هو اللي جوه الـ venv.
2. غيّر الـ prompt فبقى يبدأ بـ [[(.venv)]] عشان تفتكر.

### [[which python]]: اتأكد

[[which]] بيدوّر في الـ PATH بالترتيب ويطبع أول برنامج بالاسم ده:

~~~text الناتج بعد التفعيل
/root/lab/.venv/bin/python
~~~

ولو عايز تتأكد من جوه Python نفسه:

~~~bash
python -c "import sys; print(sys.prefix); print(sys.base_prefix)"
~~~

~~~text الناتج
/root/lab/.venv
/usr
~~~

[[sys.prefix]] المكان اللي Python شغال منه دلوقتي، و [[sys.base_prefix]] الـ Python الأصلي اللي الـ venv اتعمل منه. لو الاتنين مختلفين يبقى انت جوه venv.

### [[deactivate]]: ارجع

[[deactivate]] دالة الشيل اتعملت وقت التفعيل: بترجّع الـ PATH والـ prompt زي ما كانوا. بعدها [[which python]] على أوبونتو مطبعش حاجة وخرج بـ 1، لأن مفيش [[python]] بره الـ venv أصلًا.

---

## ٢. ويندوز: PowerShell

~~~powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
(Get-Command python).Source
deactivate
~~~

- [[py]]: الـ launcher بتاع ويندوز اللي بيتسطّب مع Python من python.org، وبيختار أحدث نسخة. لو مش موجود اكتب [[python -m venv .venv]].
- على ويندوز الفولدر اسمه [[Scripts]] مش [[bin]]، والمكتبات في [[Lib\site-packages]]:

~~~text الناتج: Get-ChildItem .venv\Scripts -Name
activate
activate.bat
activate.fish
Activate.ps1
deactivate.bat
pip.exe
pip3.14.exe
pip3.exe
python.exe
pythonw.exe
~~~

- [[.venv\Scripts\Activate.ps1]]: سكربت التفعيل بتاع PowerShell. مفيش [[source]] هنا، PowerShell بيشغّل الـ [[.ps1]] في نفس الجلسة لوحده.
- [[(Get-Command python).Source]]: [[Get-Command]] بيدوّر على الأمر زي [[which]]، والأقواس معناها «نفّذ الأول»، والنقطة [[.Source]] تاخد خانة المسار من النتيجة.

~~~text قبل التفعيل (Python install manager)
C:\Users\ali\AppData\Local\Microsoft\WindowsApps\python.exe
~~~

~~~text بعد التفعيل
C:\Users\ali\...\lab\.venv\Scripts\python.exe
~~~

وبعد [[deactivate]] رجع لـ [[WindowsApps\python.exe]]. والـ prompt بقى يبدأ بـ [[(.venv) PS C:\...>]] زي لينكس.

> لو طلع [[running scripts is disabled on this system]]: دي الـ execution policy. على الجهاز ده [[Get-ExecutionPolicy -List]] كان فيه [[CurrentUser    RemoteSigned]]، فالتفعيل اشتغل في PowerShell 7 و 5.1. لو عندك مقفولة: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة.

ومتكتبش [[where python]] في PowerShell: [[where]] هناك اختصار لـ [[Where-Object]]، فجربتها ومطبعتش ولا سطر ولا error.

---

## ٣. ويندوز: CMD

~~~cmd
.venv\Scripts\activate.bat
where python
~~~

[[activate.bat]] نسخة CMD من سكربت التفعيل. و [[where]] في CMD برنامج حقيقي ([[where.exe]]) بيطبع **كل** الـ python اللي في الـ PATH بالترتيب، والأول هو اللي هيشتغل:

~~~text الناتج بعد التفعيل
C:\Users\ali\...\lab\.venv\Scripts\python.exe
C:\Users\ali\AppData\Local\Microsoft\WindowsApps\python.exe
C:\Users\ali\AppData\Local\Python\bin\python.exe
~~~

وبعد [[deactivate]] السطر الأول اختفى وفضل التانيين.

---

## ٤. المقارنة

| الخطوة | لينكس وماك | PowerShell | CMD |
|---|---|---|---|
| اعمل | [[python3 -m venv .venv]] | [[py -m venv .venv]] | [[py -m venv .venv]] |
| فعّل | [[source .venv/bin/activate]] | [[.venv\Scripts\Activate.ps1]] | [[.venv\Scripts\activate.bat]] |
| مين python؟ | [[which python]] | [[(Get-Command python).Source]] | [[where python]] |
| ارجع | [[deactivate]] | [[deactivate]] | [[deactivate]] |
| فولدر البرامج | [[.venv/bin]] | [[.venv\Scripts]] | [[.venv\Scripts]] |

> من Python 3.13 الـ venv بيعمل جواه ملف [[.gitignore]] فيه [[*]] لوحده (شفته على 3.14)، يعني git مش هيشوف الفولدر حتى لو نسيت تضيفه. على 3.12 مفيش الملف ده، فضيف [[.venv/]] للـ [[.gitignore]] بتاع المشروع.

---

## الخلاصة

- الـ venv فولدر عادي فيه Python ومكتبات خاصة بالمشروع، و [[pyvenv.cfg]] بيقول إنه مش شايف مكتبات النظام.
- التفعيل = [[.venv/bin]] (أو [[Scripts]]) في أول الـ PATH، للترمنال ده بس. ترمنال جديد = تفعيل جديد.
- مش لازم تفعّل: [[.venv/bin/python app.py]] أو [[.venv\Scripts\python.exe app.py]] بيستخدم مكتبات الـ venv على طول.
- اتأكد دايمًا بـ [[which python]] أو [[(Get-Command python).Source]] قبل ما تسطّب.`,
          lines: [
            "اعمل venv في فولدر .venv.",
            "فعّله (لينكس وماك).",
            "اتأكد إن python بقى اللي جوه .venv.",
            "ارجع للـ Python العادي.",
            "نفس الحاجة على ويندوز بالـ launcher [[py]].",
            "التفعيل في PowerShell.",
            "مسار python اللي هيشتغل (بديل which في PowerShell).",
            "ارجع للـ Python العادي.",
            "نفس الحاجة في CMD.",
            "التفعيل في CMD.",
            "كل python في الـ PATH، والأول هو اللي هيشتغل.",
            "ارجع."
          ],
          sol: R`جربتها على أوبونتو 24.04: بعد [[source .venv/bin/activate]] الـ prompt بقى يبدأ بـ [[(.venv)]]، و [[which python]] طبع [[/home/sara/lab/.venv/bin/python]]. وبعد [[deactivate]] الـ [[(.venv)]] اختفى، و [[which python]] مطبعش حاجة خالص، لأن على أوبونتو مفيش [[python]] بره الـ venv (اسمه [[python3]] بس).

وعلى ويندوز 11 بـ Python 3.14: [[(Get-Command python).Source]] طبع [[...\lab\.venv\Scripts\python.exe]]، و [[where python]] في CMD طبع 3 سطور أولهم [[...\.venv\Scripts\python.exe]]. و [[where python]] في PowerShell مطبعش أي حاجة (ده Where-Object).

لو [[which python]] لسه بيشاور بره .venv بعد التفعيل، يبقى انت شغّلت [[bash activate]] أو [[./activate]] بدل [[source]] (دي بتفعّل في shell فرعي وتقفل). وعلى PowerShell لو طلع [[running scripts is disabled on this system]] شغّل [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة.`
        },
        {
          cmd: "pip install -r requirements.txt",
          title: "سطّب مكتبات المشروع",
          desc: "[[requirements.txt]] لستة المكتبات اللي المشروع محتاجها، مكتبة في كل سطر. [[pip install -r]] بيسطّبهم كلهم مرة واحدة جوه الـ venv. و [[pip list]] و [[pip show]] بيوروك اللي متسطّب.",
          example: R`python -m pip install --upgrade pip
pip install -r requirements.txt
pip install httpx
pip list
pip show fastapi
pip uninstall -y httpx`,
          try: "اعمل requirements.txt فيه [[requests==2.32.3]]، وسطّبه في venv جديد، وشوف [[pip show requests]] بيقول إيه.",
          deep: {
            why: "حد عمل clone للمشروع (أو السيرفر) محتاج نفس المكتبات بالظبط. بدل ما يخمّن، أمر واحد من ملف.",
            how: R`[[python -m pip]] أضمن من [[pip]] لوحده: بيستخدم pip بتاع الـ python ده بالظبط، مش pip تاني في الـ PATH بيسطّب في Python غيره.

[[pip install -r requirements.txt]] بيقرا الملف سطر سطر: [[fastapi==0.115.5]] نسخة بالظبط، و [[uvicorn[standard]==0.32.1]] الأقواس دي «extras» يعني المكتبة ومعاها إضافات اختيارية. السطور اللي بتبدأ بـ # تعليقات.

[[pip show]] بيطبع النسخة والمكان والمكتبات اللي معتمد عليها. [[pip uninstall]] بيشيل المكتبة بس، مش اللي هي سحبتها معاها.

مصدر تاني للمكتبات: torch العادي بنسخة GPU حجمها جيجات. في مشروع حقيقي على سيرفر من غير كارت شاشة الحل كان [[pip install -r requirements-local.txt --extra-index-url https://download.pytorch.org/whl/cpu]]: بيدوّر في مصدر PyTorch كمان جنب PyPI ويجيب نسخة CPU الأصغر بكتير.`,
            when: "بعد clone، وبعد ما حد يضيف مكتبة، وفي الـ Dockerfile.",
            mistakes: "[[pip install]] لمكتبة جديدة وتنسى تضيفها لـ requirements.txt: شغالة عندك وبتقع على السيرفر بـ ModuleNotFoundError. و [[pip]] بيشاور على Python غير اللي بتشغّل بيه (خصوصًا من غير venv)."
          },
          teach: R`## المثال بيعمل إيه؟

[[pip]] هو اللي بينزّل المكتبات من PyPI (الـ Python Package Index، المخزن الرسمي للمكتبات) ويسطّبها. المثال ٦ أوامر: حدّث pip، سطّب كل المشروع، سطّب مكتبة لوحدها، شوف المتسطّب، شوف تفاصيل مكتبة، وشيل مكتبة. كل ده **جوه venv متفعّل** (الدرس اللي فات). الناتج من venv في [[docker run --rm python:3.13]]، ونفس الأوامر اتجربت على ويندوز بـ Python 3.14.

الملف اللي هنشتغل عليه:

~~~text requirements.txt
# web
fastapi==0.115.5
requests==2.32.3
~~~

سطر بيبدأ بـ [[#]] تعليق، وكل سطر تاني مكتبة. و [[==]] يعني «النسخة دي بالظبط».

---

## ١. [[python -m pip install --upgrade pip]]

| الحتة | معناها |
|---|---|
| [[python -m pip]] | شغّل pip **بتاع الـ python ده**، مش أي [[pip]] تاني في الـ PATH |
| [[install]] | سطّب |
| [[--upgrade]] | لو متسطّب، هات أحدث نسخة |
| [[pip]] | المكتبة اللي هتتحدّث: pip نفسه |

ليه [[python -m pip]] مش [[pip]]؟ عشان تتأكد إن الاتنين واحد. اتأكد بنفسك:

~~~bash
python -m pip --version
~~~

~~~text الناتج
pip 26.2.1 from /lab/.venv/lib/python3.13/site-packages/pip (python 3.13)
~~~

المسار جوه [[.venv]]، فده pip بتاع الـ venv. وعلى ويندوز طلع [[...\.venv\Lib\site-packages\pip (python 3.14)]].

---

## ٢. [[pip install -r requirements.txt]]

[[-r]] من **requirement file**: «اقرا أسماء المكتبات من الملف ده». pip بيقرا كل سطر، وبيجيب كمان المكتبات اللي كل واحدة **معتمدة عليها** (dependencies). آخر سطر في الناتج:

~~~text الناتج
Successfully installed annotated-types-0.8.0 anyio-4.15.1 certifi-2026.7.22 charset-normalizer-3.5.2 fastapi-0.115.5 idna-3.20 pydantic-2.13.5 pydantic-core-2.46.5 requests-2.32.3 starlette-0.41.3 typing-extensions-4.16.0 typing-inspection-0.4.4 urllib3-2.8.0
~~~

انت كتبت مكتبتين، و pip سطّب ١٣. الباقي سحبهم fastapi (محتاجة starlette و pydantic) و requests (محتاجة certifi و idna و urllib3...).

---

## ٣. [[pip install httpx]]

نفس الفكرة لمكتبة واحدة بالاسم. من غير [[==]] بياخد أحدث نسخة، وجاب معاها ٢:

~~~text الناتج
Successfully installed h11-0.16.0 httpcore-1.0.9 httpx-0.28.1
~~~

> الأمر ده **مش** بيكتب حاجة في requirements.txt. لو المشروع محتاجها، ضيف السطر بإيدك (أو [[pip freeze]]، الدرس الجاي).

---

## ٤. [[pip list]]

كل المكتبات المتسطّبة في الـ venv ونسخها، مترتبة بالاسم:

~~~text الناتج (أول سطور)
Package            Version
------------------ ---------
annotated-types    0.8.0
anyio              4.15.1
certifi            2026.7.22
...
httpx              0.28.1
~~~

---

## ٥. [[pip show fastapi]]

تفاصيل مكتبة واحدة:

~~~text الناتج (أهم السطور)
Name: fastapi
Version: 0.115.5
Location: /lab/.venv/lib/python3.13/site-packages
Requires: pydantic, starlette, typing-extensions
Required-by:
~~~

| السطر | بيقولك إيه |
|---|---|
| [[Version]] | النسخة المتسطّبة |
| [[Location]] | **اتسطّبت فين**. لازم يبقى جوه [[.venv]]، ولو بره يبقى نسيت تفعّل |
| [[Requires]] | المكتبات اللي هي محتاجاها |
| [[Required-by]] | مين محتاجها. فاضي يعني محدش، فتقدر تشيلها من غير ما تكسر حاجة |

---

## ٦. [[pip uninstall -y httpx]]

[[uninstall]] يشيل، و [[-y]] (من yes) يعني متسألنيش [[Proceed (Y/n)?]]:

~~~text الناتج
Found existing installation: httpx 0.28.1
Uninstalling httpx-0.28.1:
  Successfully uninstalled httpx-0.28.1
~~~

وبعدها [[pip list]] لسه فيه [[httpcore 1.0.9]] و [[h11]]: الـ uninstall بيشيل المكتبة اللي سمّيتها **بس**، مش اللي جات معاها. لو عايز venv نضيف، امسح [[.venv]] واعمله تاني من requirements.txt.

---

## الأوامر كلها

| الأمر | بيعمل إيه |
|---|---|
| [[python -m pip install --upgrade pip]] | حدّث pip |
| [[pip install -r requirements.txt]] | سطّب كل مكتبات المشروع ومعاها الـ dependencies |
| [[pip install NAME]] | سطّب مكتبة (مش بتتكتب في الملف) |
| [[pip list]] | كل المتسطّب |
| [[pip show NAME]] | النسخة والمكان واللي معتمدة عليه |
| [[pip uninstall -y NAME]] | شيلها هي بس |

## الخلاصة

- requirements.txt هو «اللستة» اللي أي حد (أو سيرفر) يسطّب منها نفس المكتبات.
- [[Location]] في [[pip show]] أسرع طريقة تتأكد إنك جوه الـ venv.
- [[python -m pip]] أضمن من [[pip]] لما يكون عندك أكتر من Python.`,
          lines: [
            "حدّث pip نفسه.",
            "سطّب كل مكتبات المشروع.",
            "سطّب مكتبة واحدة.",
            "كل اللي متسطّب ونسخه.",
            "تفاصيل مكتبة.",
            "شيل مكتبة من غير ما يسأل."
          ],
          sol: R`جربتها في venv جديد: [[pip install -r requirements.txt]] سطّب requests ومعاها ٤ مكتبات بتعتمد عليها. و [[pip show requests]] طلّع (أهم السطور):

[[Name: requests]] و [[Version: 2.32.3]] و [[Location: /home/sara/lab/.venv/lib/python3.12/site-packages]] (ده على أوبونتو 24.04، وعلى ويندوز بيبقى [[...\.venv\Lib\site-packages]]) و [[Requires: certifi, charset-normalizer, idna, urllib3]] و [[Required-by:]] فاضية.

الـ Location هو اللي يأكدلك إنها اتسطبت جوه الـ venv مش على النظام. و Requires بتقولك ليه [[pip list]] طلّع مكتبات انت ماكتبتهاش. لو الـ Location طلع بره .venv (زي [[/usr/lib/python3/dist-packages]] أو [[~/.local]]) يبقى نسيت تفعّل الـ venv.`
        },
        {
          cmd: "pip freeze",
          title: "ثبّت النسخ اللي اتجربت",
          desc: "[[pip freeze]] بيطبع كل المكتبات المتسطّبة بنسخها بالظبط ([[name==1.2.3]]). النسخ الثابتة في requirements.txt بتضمن إن السيرفر يسطّب نفس اللي اتجرّب عندك، مش نسخة نزلت امبارح وكسرت حاجة.",
          example: R`pip freeze
pip freeze > requirements-new.txt
pip list --outdated
# Linux و Mac:
diff requirements.txt requirements-new.txt
# Windows (PowerShell):
Compare-Object (Get-Content requirements.txt) (Get-Content requirements-new.txt)`,
          try: "في venv فيه مكتبة واحدة زي fastapi، شغّل [[pip freeze]] وشوف كام مكتبة طلعت (هي والمكتبات اللي بتعتمد عليها).",
          deep: {
            why: "requirements فيها [[fastapi]] من غير نسخة: النهارده تسطّب نسخة، وبعد شهر على السيرفر تسطّب أحدث فيها تغيير كاسر. الـ build نفسه بقى مختلف من غير ما تغيّر سطر.",
            how: R`[[pip freeze]] بيطبع كل اللي في الـ venv بـ [[==]]، ومعاها المكتبات اللي اتسحبت كـ dependencies (starlette و pydantic مع fastapi مثلًا).

[[>]] بيحط الناتج في ملف. هنا في ملف جديد عشان تقارنه بالقديم بـ [[diff]] قبل ما تستبدل، بدل ما تدوس على requirements.txt من غير ما تشوف إيه اتغير.

طريقتين للتثبيت: تكتب المكتبات الأساسية بإيدك بـ [[==]] (زي ما مشروع حقيقي كان عامل: [[fastapi==0.115.5]] و [[uvicorn[standard]==0.32.1]] و [[asyncpg==0.30.0]]). أو تستخدم pip-tools: ملف [[requirements.in]] فيه الأساسي، و [[pip-compile]] يطلّع requirements.txt بكل حاجة مثبّتة.

[[pip list --outdated]] بيوريك اللي ليه نسخ أحدث. التحديث قرار: تزوّد النسخة، تشغّل الاختبارات، و commit.`,
            when: "أي مشروع هيشتغل على سيرفر أو عند حد تاني.",
            mistakes: R`[[pip freeze]] من غير venv فيطلع مئات مكتبات النظام. و freeze فيه مكتبات جرّبتها ومش محتاجها (ipython مثلًا) فالـ image تتقل. و freeze على ويندوز فيه مكتبة ويندوز بس (زي pywin32) فالتسطيب يفشل على لينكس: شيلها أو اكتب [[; sys_platform == "win32"]] جنبها. وفي Windows PowerShell 5.1 الـ [[>]] بيكتب الملف UTF-16: pip بيقراه عادي (جربتها)، بس git بيعتبره ملف binary والـ diff بتاعه مش بيتقري، فاعمله من PowerShell 7 أو CMD.`
          },
          teach: R`## المثال بيعمل إيه؟

بيصوّر حالة الـ venv بالظبط (كل مكتبة ونسختها)، ويحفظها في ملف جديد، ويشوف مين ليه نسخة أحدث، وفي الآخر يقارن الملف الجديد بالقديم قبل ما تقرر تستبدل. الناتج من venv فيه requirements.txt بسطرين ([[fastapi==0.115.5]] و [[requests==2.32.3]])، اتجرب في [[docker run --rm python:3.13]] وعلى ويندوز بـ Python 3.14 في PowerShell 7.

---

## ١. [[pip freeze]]

«freeze» يعني «جمّد»: اطبع كل اللي متسطّب بالشكل [[name==version]]، نفس شكل requirements.txt بالظبط:

~~~text الناتج
annotated-types==0.8.0
anyio==4.15.1
certifi==2026.7.22
charset-normalizer==3.5.2
fastapi==0.115.5
idna==3.20
pydantic==2.13.5
pydantic_core==2.46.5
requests==2.32.3
starlette==0.41.3
typing-inspection==0.4.4
typing_extensions==4.16.0
urllib3==2.8.0
~~~

١٣ سطر من مكتبتين: كل الشجرة، بما فيها المكتبات اللي اتسحبت كـ dependencies. ولاحظ إن [[pip]] نفسه مش في اللستة، freeze بيسيبه.

---

## ٢. [[pip freeze > requirements-new.txt]]

[[>]] ده مش من pip، ده من الشيل: «بدل ما تطبع على الشاشة، اكتب في الملف ده» (ولو موجود امسحه واكتب من الأول). الأمر مبيطبعش حاجة، والملف فيه نفس الـ ١٣ سطر.

ليه ملف **جديد** مش requirements.txt على طول؟ عشان تشوف الفرق الأول. لو كتبت فوق القديم مش هتعرف إيه اللي اتغيّر.

---

## ٣. [[pip list --outdated]]

[[--outdated]] يعني «المكتبات اللي ليها نسخة أحدث على PyPI بس»:

~~~text الناتج (ويندوز، أكتوبر 2026)
Package       Version Latest  Type
------------- ------- ------- -----
fastapi       0.115.5 0.142.2 wheel
pydantic_core 2.46.5  2.49.0  wheel
requests      2.32.3  2.34.2  wheel
starlette     0.41.3  1.7.0   wheel
~~~

| العمود | معناه |
|---|---|
| [[Version]] | اللي عندك |
| [[Latest]] | أحدث نسخة على PyPI (الأرقام دي هتختلف يوم ما تجرّب) |
| [[Type]] | [[wheel]] يعني ملف جاهز للتسطيب من غير compile |

لاحظ [[starlette 0.41.3]] و [[1.7.0]]: رقم أول اتغير، وده غالبًا تغيير كاسر. عشان كده التحديث قرار: تغيّر النسخة، تشغّل الاختبارات، وبعدين commit.

---

## ٤. المقارنة

### لينكس وماك: [[diff]]

[[diff]] بيقارن ملفين سطر سطر:

~~~text الناتج: diff requirements.txt requirements-new.txt
0a1,4
> annotated-types==0.8.0
> anyio==4.15.1
> certifi==2026.7.22
> charset-normalizer==3.5.2
1a6,8
> idna==3.20
> pydantic==2.13.5
> pydantic_core==2.46.5
2a10,13
> starlette==0.41.3
...
~~~

إزاي تقراه: [[>]] قدام السطر يعني «موجود في الملف التاني (الجديد) بس»، و [[<]] يعني «في الأول بس». و [[0a1,4]] معناها «بعد سطر 0 في الأول، **a**dd السطور من 1 لـ 4 من التاني». و [[diff]] بيخرج بـ 1 لما الملفين مختلفين و 0 لما يبقوا زي بعض.

### PowerShell: [[Compare-Object]]

~~~powershell
Compare-Object (Get-Content requirements.txt) (Get-Content requirements-new.txt)
~~~

- [[Get-Content]] بيقرا الملف ويرجّعه لستة سطور، والأقواس «نفّذ الأول».
- [[Compare-Object]] بيقارن اللستتين ويطبع السطور المختلفة بس:

~~~text الناتج (أول سطور)
InputObject            SideIndicator
-----------            -------------
annotated-types==0.8.0 =>
anyio==4.15.1          =>
certifi==2026.7.22     =>
~~~

[[=>]] يعني «في التاني (الجديد) بس»، و [[<=]] «في الأول بس».

ليه مش [[diff]] في PowerShell؟ لأن [[diff]] هناك اختصار لـ [[Compare-Object]] نفسه، ولو اديته اسمين ملفات بيقارن **الاسمين** كنصوص:

~~~text الناتج: diff requirements.txt requirements-new.txt في PowerShell
InputObject          SideIndicator
-----------          -------------
requirements-new.txt =>
requirements.txt     <=
~~~

وفي CMD البديل [[fc requirements.txt requirements-new.txt]] (من **file compare**).

---

## الأوامر كلها

| الأمر | بيعمل إيه |
|---|---|
| [[pip freeze]] | كل المكتبات بنسخها بالظبط |
| [[> file]] | الشيل يحط الناتج في ملف |
| [[pip list --outdated]] | اللي ليه نسخة أحدث |
| [[diff]] / [[Compare-Object]] / [[fc]] | الفرق بين القديم والجديد |

## الخلاصة

- [[pip freeze]] بيثبّت **كل** الشجرة، مش اللي كتبته بس، فالسيرفر بيسطّب نفس اللي اتجرّب عندك.
- شغّله **جوه** venv المشروع، وإلا هتلاقي مكتبات ملهاش علاقة.
- اكتب في ملف جديد وقارن، وبعدين استبدل.`,
          lines: [
            "كل المكتبات بنسخها بالظبط.",
            "احفظها في ملف جديد.",
            "المكتبات اللي ليها نسخ أحدث.",
            "قارن بالقديم قبل ما تستبدل.",
            "نفس المقارنة في PowerShell. [[diff]] هناك اختصار لـ Compare-Object، ولو اديته اسمين ملفات بيقارن الاسمين نفسهم مش اللي جواهم، عشان كده Get-Content. وفي CMD: [[fc requirements.txt requirements-new.txt]]."
          ],
          sol: R`في venv نضيف سطّبت فيه [[fastapi]] بس، [[pip freeze]] طلّع ١١ سطر، كلهم بالشكل [[name==version]]: [[fastapi==...]] و [[starlette]] و [[pydantic]] و [[pydantic_core]] و [[anyio]] و [[idna]] و [[typing_extensions]] وغيرهم. الرقم بالظبط بيتغير مع نسخة fastapi، المهم إنه أكتر بكتير من واحد.

ده الفرق بين freeze و requirements اللي كتبتها بإيدك: freeze بيثبّت كل شجرة المكتبات بنسخها الحالية، فلما حد تاني يسطّب ياخد نفس الحاجات بالظبط. ولو لقيت فيه عشرات المكتبات اللي مالهاش علاقة (jupyter وغيره)، يبقى انت شغّلته على Python النظام أو venv قديم مش على venv المشروع.

وعلى ويندوز جربت [[diff req.txt req-new.txt]] في PowerShell: طبع [[req-new.txt =>]] و [[req.txt <=]]، يعني قارن الأسماء بس. بـ [[Compare-Object (Get-Content ...) (Get-Content ...)]] طلّع السطور المختلفة فعلًا.`
        },
        {
          cmd: "externally-managed-environment",
          title: "pip رافض يسطّب على أوبونتو",
          desc: R`على أوبونتو 24.04 (ودبيان 12) [[pip install]] بره venv بيقولك [[error: externally-managed-environment]]. ده مش عطل: Python بتاع النظام بيعتمد عليه apt، و pip ممنوع يلعب فيه.

الحل: مكتبات المشروع في venv. وأدوات الترمنال اللي عايزها في كل حتة (httpie و yt-dlp و ruff) بـ [[pipx]].

على ويندوز مش هتقابل الرسالة دي: Python بتاع python.org مفيهوش الملف اللي بيعمل الحماية دي (اتأكدت على Python 3.14)، فـ pip بره venv بيسطّب على Python بتاع الجهاز كله من غير ما يعترض. ده مش معناه إنه صح: برضه venv لكل مشروع.`,
          example: R`# Linux (and WSL):
pip install requests
# error: externally-managed-environment
sudo apt install python3-venv pipx
python3 -m venv .venv && . .venv/bin/activate && pip install requests
pipx install httpie
pipx ensurepath
pipx list`,
          try: "على سيرفر التجربة (أوبونتو 24.04) جرّب [[pip install requests]] وشوف الرسالة، وبعدين سطّب [[httpie]] بـ pipx وجرّب [[http example.com]].",
          deep: {
            why: "أول مرة على سيرفر جديد: [[pip install]] ويطلع error طويل. واللي بيقرا أول نتيجة في جوجل بيعمل [[--break-system-packages]] ويكسر حاجات في النظام بعد شهر.",
            how: R`ده PEP 668: التوزيعة بتحط ملف اسمه [[EXTERNALLY-MANAGED]] جنب Python بتاع النظام، و pip لما يشوفه بيرفض يسطّب بره venv. السبب إن أدوات في النظام مكتوبة بـ Python ومعتمدة على نسخ معيّنة جاية من apt، و pip لو غيّرها ممكن يكسرها.

التلات حلول الصح:

مكتبات لمشروع: venv، ودي الحالة الأغلب.

أداة ترمنال: [[pipx install httpie]] بيعمل venv مخصوص للأداة دي بس، وبيحط الأمر في [[~/.local/bin]]. [[pipx ensurepath]] بيضيف الفولدر ده للـ PATH (افتح ترمنال جديد بعدها). و [[pipx upgrade-all]] يحدّث الكل.

مكتبة لسكربت نظام: من apt، زي [[sudo apt install python3-requests]].

وفي Docker: صورة [[python:3.12-slim]] مش متأثرة لأن Python فيها مش من apt. بس لو بتبني على [[ubuntu:24.04]] وتسطّب Python من apt، هتقابل نفس الرسالة جوه الـ Dockerfile.`,
            when: "أي أوبونتو أو دبيان جديد.",
            mistakes: "[[sudo pip install]]: بيكتب فوق مكتبات apt ويكسر أدوات النظام. و [[--break-system-packages]] على سيرفر إنتاج، الاسم نفسه بيقولك هيعمل إيه."
          },
          teach: R`## المثال بيعمل إيه؟

بيوريك الرسالة، وبعدين الحلّين الصح: venv لمكتبات مشروع، و pipx لأداة ترمنال. كله اتشغّل على أوبونتو 24.04 نضيف في [[docker run --rm ubuntu:24.04]] (Python 3.12.3 من apt)، فالناتج اللي تحت هو اللي هتشوفه على أي سيرفر أوبونتو جديد.

---

## ١. [[pip install requests]] بره venv

~~~text الناتج (مختصر)
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.

    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    ...
    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.
...
hint: See PEP 668 for the detailed specification.
~~~

والـ exit code كان 1. الرسالة نفسها فيها الحلول التلاتة بالترتيب: apt، أو venv، أو pipx.

### مين اللي رفض؟

[[externally managed]] يعني «Python ده حد تاني مسؤول عنه»، والحد ده هو apt. التوزيعة حاطة ملف اسمه [[EXTERNALLY-MANAGED]] جنب مكتبات Python بتاع النظام:

~~~bash
head -3 /usr/lib/python3.12/EXTERNALLY-MANAGED
~~~

~~~text الناتج
[externally-managed]
Error=To install Python packages system-wide, try apt install
 python3-xyz, where xyz is the package you are trying to
~~~

pip قبل ما يسطّب بيدوّر على الملف ده، ولو لقاه بيطبع اللي مكتوب بعد [[Error=]] ويقف. ده اللي اسمه PEP 668 (PEP = **Python Enhancement Proposal**، يعني اقتراح رسمي اتقبل وبقى قاعدة).

> جربت أدوّر على نفس الملف في Python بتاع ويندوز (3.14) وفي صورة [[python:3.13]] الرسمية: مش موجود في الاتنين، عشان كده pip هناك مبيعترضش.

---

## ٢. [[sudo apt install python3-venv pipx]]

- [[sudo]]: نفّذ كـ root، لأن تسطيب حاجة للنظام كله محتاج صلاحيات.
- [[apt install]]: مدير الباكدجات بتاع أوبونتو.
- [[python3-venv]]: موديول [[venv]] نفسه (أوبونتو بيفصله عن Python). من غيره [[python3 -m venv]] بيقول [[ensurepip is not available]].
- [[pipx]]: الأداة اللي هنستخدمها في الحل التالت.

---

## ٣. venv في سطر واحد

~~~bash
python3 -m venv .venv && . .venv/bin/activate && pip install requests
~~~

٣ أوامر مربوطين بـ [[&&]]، يعني «كمّل للي بعده **بس لو** اللي قبله نجح». و [[.]] لوحدها هي [[source]]. جوه الـ venv مفيش ملف [[EXTERNALLY-MANAGED]]، فـ pip سطّب عادي، و [[import requests]] اشتغل وطبع [[2.34.2]].

---

## ٤. pipx لأداة ترمنال

### [[pipx install httpie]]

pipx بيعمل venv **لوحده للأداة دي بس**، ويسطّبها فيه، ويحط أوامرها في [[~/.local/bin]]:

~~~text الناتج
  installed package httpie 3.2.4, installed using Python 3.12.3
  These apps are now globally available
    - http
    - httpie
    - https
⚠️  Note: '/root/.local/bin' is not on your PATH environment variable. These
    apps will not be globally accessible until your PATH is updated. Run $__btpipx
    ensurepath$__bt to automatically add it, ...
done! ✨ 🌟 ✨
~~~

الباكدج اسمها [[httpie]] بس الأوامر اللي جواها [[http]] و [[https]]. والتحذير بيقولك إن الفولدر لسه مش في الـ PATH.

### [[pipx ensurepath]]

~~~text الناتج
Success! Added /root/.local/bin to the PATH environment variable.
...
You will need to open a new terminal or re-login for the PATH changes to take
effect.
~~~

بيضيف سطر في آخر [[~/.bashrc]]:

~~~text آخر ~/.bashrc
# Created by $__btpipx$__bt on 2026-10-06 17:45:02
export PATH="$PATH:/root/.local/bin"
~~~

يعني «الـ PATH القديم وبعده [[~/.local/bin]]». و [[.bashrc]] بيتقري لما تفتح ترمنال جديد، عشان كده لازم تفتح واحد.

### [[pipx list]]

~~~text الناتج
venvs are in /root/.local/share/pipx/venvs
apps are exposed on your $PATH at /root/.local/bin
manual pages are exposed at /root/.local/share/man
   package httpie 3.2.4, installed using Python 3.12.3
    - http
    - httpie
    - https
~~~

كل أداة ليها فولدر في [[~/.local/share/pipx/venvs]]، فمكتبات httpie مش هتلمس مكتبات أداة تانية ولا مكتبات النظام.

---

## مين يروح فين

| عايز إيه | الحل | ليه |
|---|---|---|
| مكتبات لمشروعك | venv | كل مشروع ونسخه |
| أداة تكتبها في الترمنال من أي حتة | [[pipx install]] | venv لوحدها وأمر في الـ PATH |
| مكتبة لسكربت نظام | [[sudo apt install python3-xyz]] | apt هو المسؤول عن Python ده |
| [[--break-system-packages]] | لأ | بيكسر أدوات النظام اللي معتمدة على نسخ apt |

## الخلاصة

- الرسالة دي **حماية** مش عطل، والملف [[EXTERNALLY-MANAGED]] هو اللي بيشغّلها.
- مكتبة لمشروع = venv. أداة = pipx. ومتعملش [[sudo pip install]].
- بعد [[pipx ensurepath]] افتح ترمنال جديد.`,
          lines: [
            "بره venv على أوبونتو 24.04: هيرفض.",
            "سطّب venv و pipx من apt.",
            "الحل لمكتبات المشروع: venv.",
            "الحل لأداة ترمنال: venv خاص بيها أوتوماتيك.",
            "ضيف فولدر أدوات pipx للـ PATH.",
            "الأدوات المتسطّبة بـ pipx."
          ],
          sol: R`على أوبونتو 24.04 [[pip install requests]] بيرفض ويطلّع:

[[error: externally-managed-environment]]
[[× This environment is externally managed]]
[[╰─> To install Python packages system-wide, try apt install python3-xyz ...]]

وكمل بيقترح venv أو pipx. ده مش bug: أوبونتو بيحمي Python بتاع النظام من إنك تكسر أدوات زي apt. (جربتها على python3.12 بتاع أوبونتو 24.04 وطلعت نفس الرسالة بالظبط. ولو pip نفسه مش متسطب، سطّبه الأول بـ [[sudo apt install python3-pip]].)

بعد [[pipx install httpie]] و [[pipx ensurepath]] (وافتح ترمنال جديد)، [[pipx list]] طبع [[package httpie 3.2.4, installed using Python 3.12.3]] والأوامر [[http]] و [[httpie]] و [[https]]. و [[http example.com]] طبع [[HTTP/1.1 200 OK]] والـ headers ملونة وبعدها الـ HTML. لو طلع [[http: command not found]] يبقى الـ PATH لسه ما اتحدّثش. والغلط اللي متعملوش: [[--break-system-packages]] أو [[sudo pip install]].`
        }
      ]
    },
    {
      t: "Python كأداة",
      l: 1,
      n: "سيرفر static في ثانية، وموديولات جاهزة بتشتغل كأوامر",
      items: [
        {
          cmd: "python -m http.server",
          title: "سيرفر static في ثانية",
          desc: "[[python -m http.server]] بيقدّم ملفات الفولدر الحالي على [[http://localhost:8000]]. مفيد تجرّب موقع static، وضروري لـ PWA: الـ service worker والـ manifest مش بيشتغلوا لو فتحت index.html بدبل كليك (file://).",
          example: R`python -m http.server 8000
python -m http.server 8000 --bind 127.0.0.1
python -m http.server 8000 --directory dist
# تجربة PWA: افتح http://localhost:8000 و DevTools > Application
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8000 shot-mobile.png`,
          try: "اعمل index.html بسيط، وشغّل السيرفر، وافتحه من المتصفح. وبعدين افتح نفس الملف بدبل كليك وقارن في Console.",
          deep: {
            why: "موقع ملف واحد أو build جاهز محتاج يتفتح من سيرفر مش من file://، لأن المتصفح بيمنع حاجات كتير من file://: الـ fetch، و ES modules، والـ service worker.",
            how: R`[[http.server]] موديول جاهز في Python: بيقدّم الملفات زي ما هي، مع index.html تلقائي، وبيطبع كل طلب في الترمنال. Ctrl+C يقفله.

[[--bind 127.0.0.1]]: الافتراضي بيسمع على كل الواجهات، يعني أي حد على نفس الـ Wi-Fi يقدر يقرا الملفات. و [[--directory]] يقدّم فولدر من غير ما تدخله.

PWA: المتصفح بيسمح بالـ service worker على https أو على localhost بس. فالسيرفر ده على localhost كفاية للتجربة: DevTools ثم Application تشوف الـ Manifest والـ Service Workers وزرار التثبيت.

[[playwright screenshot]] من ترمنال تاني بياخد صورة للصفحة بمقاس موبايل أو ديسكتوب ([[--viewport-size "1440,900"]])، فتقارن المقاسات من غير ما تكبّر وتصغّر المتصفح بإيدك. أول مرة بيطلب منك تنزّل المتصفح نفسه: [[npx playwright install chromium]].

ده للتجربة بس. مش سيرفر إنتاج: بطيء ومفيهوش أي حماية.`,
            when: "تجربة موقع static أو build أو PWA بسرعة. أو تنقل ملف لجهاز على نفس الشبكة.",
            mistakes: R`في مشروع حقيقي الـ sw.js كان cache-first لكل حاجة، فأي تعديل في index.html مكانش بيظهر للزوار لحد ما اسم الكاش اتغير ([[const CACHE = 'myapp-v2']]). وعلى جهازك: DevTools ثم Application ثم Service Workers ثم Unregister. وكان الـ manifest بيشاور على [[icon-192.png]] و [[icon-512.png]] مش موجودين، فالـ Console مليان 404 وزرار التثبيت مش بيظهر. وتشغيله في فولدر الـ home على شبكة عامة من غير [[--bind]] بيكشف ملفاتك.`
          },
          teach: R`## المثال بيعمل إيه؟

بيشغّل web server صغير جاي مع Python، بيدّي أي متصفح الملفات اللي في فولدر زي ما هي. التلات سطور الأولى نفس الأمر بخيارات مختلفة، والأخير أداة تانية (Playwright) بتاخد صورة للصفحة. السيرفر اتجرب على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز 11 (Python 3.14)، والطلبات اتبعتت بـ [[curl]] و [[Invoke-WebRequest]].

---

## ١. [[python -m http.server 8000]]

| الحتة | معناها |
|---|---|
| [[python -m]] | شغّل موديول باسمه (الدرس الجاي) |
| [[http.server]] | موديول [[server]] جوه باكدج [[http]]، في المكتبة الأساسية، مش محتاج pip |
| [[8000]] | البورت. ولو مكتبتوش بياخد 8000 برضه |

أول ما يشتغل بيطبع:

~~~text الناتج
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
~~~

[[0.0.0.0]] مش عنوان تفتحه، معناه «بسمع على **كل** كروت الشبكة»: الجهاز نفسه، والـ Wi-Fi، وأي واجهة تانية. انت تفتح [[http://localhost:8000]].

والسيرفر بيفضل شغال وماسك الترمنال لحد ما تدوس Ctrl+C. ومع كل طلب بيطبع سطر:

~~~text الناتج بعد طلبين
127.0.0.1 - - [06/Oct/2026 17:48:14] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 17:48:14] code 404, message File not found
127.0.0.1 - - [06/Oct/2026 17:48:14] "GET /nope HTTP/1.1" 404 -
~~~

| الحتة | معناها |
|---|---|
| [[127.0.0.1]] | مين طلب (هنا الجهاز نفسه) |
| [[GET /]] | طلب الصفحة الرئيسية، فالسيرفر رجّع [[index.html]] لوحده |
| [[200]] | تمام. و [[404]] يعني الملف مش موجود |

وده شكل الرد نفسه من [[curl -i]] ([[-i]] يطبع الـ headers):

~~~text الناتج
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.13.16
Content-type: text/html
Content-Length: 14
~~~

[[Content-type]] اتحدد من امتداد الملف ([[.html]] بقت [[text/html]])، وده اللي بيخلي المتصفح يعرضها صفحة مش نص.

---

## ٢. [[--bind 127.0.0.1]]

[[--bind]] (أو [[-b]]) يعني «اسمع على العنوان ده بس». و [[127.0.0.1]] هو الجهاز نفسه (localhost)، فمحدش على الشبكة يقدر يوصل:

~~~text الناتج
Serving HTTP on 127.0.0.1 port 8001 (http://127.0.0.1:8001/) ...
~~~

من غيره، أي حد على نفس الـ Wi-Fi يقدر يفتح [[http://IP-بتاعك:8000]] ويقرا كل ملفات الفولدر.

---

## ٣. [[--directory dist]]

[[--directory]] (أو [[-d]]) يعني «قدّم الفولدر ده» بدل الفولدر اللي انت واقف فيه. عملت [[dist/index.html]] فيه [[<h1>dist</h1>]] وطلبت [[/]]:

~~~text الناتج
<h1>dist</h1>
~~~

ودي كل الخيارات من [[python -m http.server --help]]:

~~~text الناتج (مختصر)
usage: server.py [-h] [--cgi] [-b ADDRESS] [-d DIRECTORY] [-p VERSION] [port]
  port                  bind to this port (default: 8000)
  -b, --bind ADDRESS    bind to this address (default: all interfaces)
  -d, --directory DIRECTORY
                        serve this directory (default: current directory)
~~~

### البورت مشغول

شغّلت سيرفر تاني على 8000 والأول لسه شغال، على لينكس:

~~~text الناتج
OSError: [Errno 98] Address already in use
~~~

اقفل القديم أو غيّر الرقم ([[8001]]).

---

## ٤. سطر التعليق: تجربة PWA

[[# تجربة PWA ...]] تعليق، مش أمر. بيفكّرك إن الـ service worker محتاج **http://localhost** أو https، ومش بيشتغل من [[file://]] (الدبل كليك).

---

## ٥. [[npx playwright screenshot ...]]

ده من ترمنال **تاني** والسيرفر شغال:

| الحتة | معناها |
|---|---|
| [[npx]] | شغّل أداة npm من غير ما تسطّبها globally (محتاج Node) |
| [[playwright screenshot]] | افتح الصفحة في متصفح من غير شاشة وصوّرها |
| [[--viewport-size "390,844"]] | عرض × طول الشاشة بالـ pixel، ده مقاس موبايل |
| [[--full-page]] | صوّر الصفحة بطولها كلها مش اللي ظاهر بس |
| [[http://localhost:8000]] | الصفحة |
| [[shot-mobile.png]] | اسم الصورة |

السطر ده متشغّلش في المراجعة دي لأن Playwright مش متسطّب هنا (أول مرة بينزّل متصفح بحجم كبير بـ [[npx playwright install chromium]])، والناتج اللي في الحل تحت من تجربة سابقة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[python -m http.server 8000]] | قدّم الفولدر الحالي على كل الواجهات |
| [[--bind 127.0.0.1]] | جهازك بس |
| [[--directory dist]] | قدّم فولدر تاني |
| Ctrl+C | اقفله |

- للتجربة على جهازك بس، مش للإنتاج.
- افتح [[localhost]] مش [[0.0.0.0]].
- اتعوّد على [[--bind 127.0.0.1]].`,
          lines: [
            "قدّم الفولدر الحالي على بورت 8000.",
            "على جهازك بس، محدش من الشبكة.",
            "قدّم فولدر dist من غير ما تدخله.",
            "صورة للصفحة بمقاس موبايل، بطولها كلها."
          ],
          sol: R`السيرفر بيطبع [[Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...]]، ومع [[--bind 127.0.0.1]] [[Serving HTTP on 127.0.0.1 port 8000 (http://127.0.0.1:8000/) ...]]، ومع كل طلب سطر زي [[127.0.0.1 - - [02/Oct/2026 17:42:23] "GET / HTTP/1.1" 200 -]]. (جربتها على لينكس وويندوز بـ [[--bind 127.0.0.1]].)

لو الـ index.html عادي خالص (HTML و CSS بس) مش هتلاقي فرق في Console بين الاتنين. الفرق بيظهر أول ما تستخدم [[<script type="module">]] أو fetch. جربت صفحة بتعمل [[import]] من [[./m.js]]: بالدبل كليك Console طلّع [[Access to script at 'file:///.../m.js' from origin 'null' has been blocked by CORS policy]]، ومن [[http://localhost:8000]] اشتغلت عادي.

على لينكس لو البورت مشغول بيطلع [[OSError: [Errno 98] Address already in use]]، غيّر البورت. على ويندوز مفيش الـ error ده: شغّلت سيرفرين على نفس البورت والتاني قال [[Serving HTTP]] عادي، فلو الصفحة مش بتتحدّث اتأكد إن مفيش سيرفر قديم شغال في ترمنال تاني. و [[0.0.0.0]] اللي بيطبعه معناها «كل الواجهات» مش عنوان تفتحه، افتح [[localhost]].

و [[npx playwright screenshot ...]] جربته على السيرفر ده: طبع [[Navigating to ...]] و [[Capturing screenshot into shot-mobile.png]]. ولو طلع [[Executable doesn't exist]] يبقى لسه منزّلتش المتصفح ([[npx playwright install chromium]]).`
        },
        {
          cmd: "python -m",
          title: "شغّل موديول كأمر",
          desc: "[[python -m name]] بيشغّل موديول باسمه مش بمسار ملف. Python فيه موديولات جاهزة بتشتغل كأوامر (json.tool و http.server و venv و pip). وكود مشروعك نفسه: [[python -m app.seed]] بيشغّل [[app/seed.py]] كجزء من الباكدج، فالـ imports بتشتغل صح.",
          example: R`curl -sS https://api.github.com/users/octocat | python3 -m json.tool
python3 -m json.tool --no-ensure-ascii data.json
python -m app.seed
python -m pip --version
python -c "import sys; print(sys.version)"`,
          try: "اعمل فولدر app فيه [[__init__.py]] فاضي و seed.py بيعمل [[from app import config]]. شغّله بـ [[python app/seed.py]] (هيفشل) وبعدين بـ [[python -m app.seed]] (هيشتغل).",
          deep: {
            why: "[[python app/seed.py]] بيطلع [[ModuleNotFoundError: No module named 'app']] مع إن الفولدر قدامك. و JSON من API مكتوب في سطر واحد طويل مش مقروء ومفيش jq.",
            how: R`[[-m]] بيدوّر على الموديول في sys.path زي import بالظبط، وبيشغّله كبرنامج.

[[json.tool]] بينسّق JSON جاي من pipe أو ملف بمسافات. [[--no-ensure-ascii]] بيعرض العربي حروف بدل [[\u0627]]. ولو الـ JSON بايظ بيقولك السطر والعمود.

كود المشروع: لما تشغّل [[python app/seed.py]]، Python بيحط فولدر [[app/]] نفسه في sys.path، فـ [[from app.db import ...]] مش بيلاقي باكدج اسمها app. أما [[python -m app.seed]] من جذر المشروع بيحط الجذر في sys.path، فـ app باكدج عادية والـ imports النسبية ([[from .db import]]) بتشتغل.

وجوه Docker نفس الفكرة: [[docker compose exec -T app python -m app.seed ...]].

نمط مفيد من مشروع حقيقي: كل أداة تشغيل (seed، تنضيف، تقارير) الافتراضي بتاعها بيطبع بس اللي هيعمله، والتنفيذ الفعلي محتاج فلاج صريح زي [[--apply]] أو [[--post]]. غلطة في الأمر تبقى عرض مش كارثة. و argparse بيعمل الفلاجات دي و [[--help]] لوحده.

[[-c]] بيشغّل سطر Python من الترمنال على طول.`,
            when: "أي سكربت جوه باكدج. وتنسيق JSON سريع من غير jq.",
            mistakes: "ملف في مشروعك اسمه [[json.py]] أو [[http.py]] أو [[email.py]]: بيغطي على موديول Python الأصلي وتطلع errors ملهاش معنى. و [[python -m app/seed.py]] بمسار: -m بياخد اسم بنقط ومن غير .py."
          },
          teach: R`## المثال بيعمل إيه؟

[[python file.py]] بيشغّل **ملف** بمساره. و [[python -m name]] بيشغّل **موديول** باسمه، و Python هو اللي يدوّر عليه بنفس طريقة [[import]]. المثال فيه ٥ استخدامات: موديول جاهز بينسّق JSON (مرتين)، وكود مشروعك، و pip، وسطر Python من غير ملف خالص. اتجرب على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز في PowerShell 7 (Python 3.14).

---

## ١. [[curl -sS https://api.github.com/users/octocat | python3 -m json.tool]]

نفكّه من الشمال لليمين، بنفس ترتيب ما البيانات بتمشي:

### [[curl -sS URL]]

[[curl]] بيجيب الصفحة ويطبعها. [[-s]] (silent) من غير شريط التقدم، و [[-S]] (show error) بس لو حصل error اطبعه. والرابط ده API بيرجّع بيانات يوزر GitHub تجريبي اسمه octocat بصيغة JSON.

### [[|]]

الـ pipe: ناتج الأمر اللي على الشمال يدخل كـ input للأمر اللي على اليمين بدل ما يتطبع.

### [[python3 -m json.tool]]

[[json.tool]] موديول في المكتبة الأساسية: بيقرا JSON، يتأكد إنه سليم، ويطبعه منسّق بمسافات (٤ افتراضيًا):

~~~text الناتج (أول سطور)
{
    "login": "octocat",
    "id": 583231,
    "node_id": "MDQ6VXNlcjU4MzIzMQ==",
    "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
~~~

الـ API ده بالذات بيرجّع JSON منسّق أصلًا بمسافتين، فالفرق هنا إن json.tool خلاها ٤. الفرق الحقيقي بيبان مع JSON مكتوب في سطر واحد:

~~~powershell
'{"a":1,"b":[1,2]}' | python -m json.tool
~~~

~~~text الناتج (PowerShell 7)
{
    "a": 1,
    "b": [
        1,
        2
    ]
}
~~~

> في Windows PowerShell 5.1 [[curl]] مش curl: [[Get-Command curl]] هناك قال [[Alias]] لـ [[Invoke-WebRequest]]، وده خياراته مختلفة خالص. اكتب [[curl.exe]].

---

## ٢. [[python3 -m json.tool --no-ensure-ascii data.json]]

هنا json.tool بياخد اسم ملف بدل الـ pipe. والملف فيه عربي:

~~~text data.json
{"name": "علي", "tags": ["a", 1]}
~~~

من غير الخيار، أي حرف مش ASCII (الحروف الإنجليزية والأرقام والرموز الأساسية بس) بيتكتب كود:

~~~text الناتج: python3 -m json.tool data.json
{
    "name": "علي",
~~~

[[ع]] يعني «الحرف رقم 0639 في Unicode» وده حرف «ع». و [[--no-ensure-ascii]] بيقول «متحوّلش لـ ASCII»:

~~~text الناتج
{
    "name": "علي",
~~~

ولو الـ JSON بايظ (هنا [[{"a": 1,}]] بفاصلة زيادة) بيقولك فين وبيخرج بـ 1:

~~~text الناتج
Illegal trailing comma before end of object: line 1 column 8 (char 7)
~~~

---

## ٣. [[python -m app.seed]]: كود مشروعك

ده أهم سطر في الدرس. عندنا:

~~~text شكل الفولدر
app/
  __init__.py     فاضي: بيقول إن app باكدج
  config.py       NAME = "demo"
  seed.py         from app import config
~~~

### بالمسار: بيفشل

~~~text الناتج: python app/seed.py
Traceback (most recent call last):
  File "/tmp/app/seed.py", line 1, in <module>
    from app import config
ModuleNotFoundError: No module named 'app'
~~~

### بالاسم: بيشتغل

~~~text الناتج: python -m app.seed
seed ok: demo
~~~

### ليه؟ [[sys.path[0] ]]

[[sys.path]] لستة الفولدرات اللي [[import]] بيدوّر فيها، وأول عنصر فيها بيتحدد من **طريقة التشغيل**. حطيت في [[app/where.py]] سطر [[print(sys.path[0])]] وشغّلته بالطريقتين من [[/tmp]]:

~~~text الناتج
python app/where.py    →  /tmp/app
python -m app.where    →  /tmp
~~~

- بالمسار: Python بيحط **فولدر الملف** ([[/tmp/app]])، ومفيش جواه حاجة اسمها [[app]].
- بـ [[-m]]: بيحط **الفولدر اللي انت واقف فيه** ([[/tmp]])، وجواه [[app/]]، فـ [[from app import config]] لقاها.

والاسم بنقط: [[app.seed]] يعني «موديول [[seed]] جوه باكدج [[app]]»، من غير [[.py]] ومن غير [[/]]. ونفس الحاجة طلعت بالظبط على ويندوز.

---

## ٤. [[python -m pip --version]]

~~~text الناتج (لينكس)
pip 26.2.1 from /usr/local/lib/python3.13/site-packages/pip (python 3.13)
~~~

ده pip **بتاع الـ python ده بالظبط**، والسطر بيقولك هو فين وتبع أنهي Python.

---

## ٥. [[python -c "import sys; print(sys.version)"]]

[[-c]] من **command**: شغّل الكود اللي بين الـ quotes كأنه ملف. و [[;]] بتفصل جملتين في سطر واحد.

~~~text الناتج
3.13.16 (main, Oct  6 2026, 04:38:44) [GCC 14.2.0]
~~~

وعلى ويندوز: [[3.14.3 (tags/v3.14.3:323c59a, Feb  3 2026, 16:04:56) [MSC v.1944 64 bit (AMD64)] ]]. النسخة، وإمتى اتعملت، والـ compiler اللي اتبنت بيه (GCC على لينكس و MSC بتاع مايكروسوفت على ويندوز).

---

## الخلاصة

| الشكل | بيشغّل إيه | [[sys.path[0] ]] |
|---|---|---|
| [[python app/seed.py]] | ملف بمساره | فولدر الملف |
| [[python -m app.seed]] | موديول بالاسم | الفولدر الحالي |
| [[python -c "..."]] | كود من الترمنال | فاضي (يعني الفولدر الحالي) |

- كود جوه باكدج بيعمل import لحاجات من نفس المشروع؟ شغّله بـ [[-m]] من جذر المشروع.
- [[json.tool]] بديل jq السريع، و [[--no-ensure-ascii]] للعربي.`,
          lines: [
            "نسّق JSON جاي من API. (في Windows PowerShell 5.1 اكتب [[curl.exe]]، لأن [[curl]] هناك اختصار لأمر تاني.)",
            "نسّق ملف، والعربي يفضل عربي.",
            "شغّل app/seed.py كجزء من الباكدج، من الفولدر اللي فيه app/ (زي التجربة).",
            "pip بتاع الـ python ده بالظبط.",
            "سطر Python من الترمنال."
          ],
          sol: R`جربتها بالظبط على أوبونتو وعلى ويندوز (PowerShell): [[python app/seed.py]] فشل بـ [[ModuleNotFoundError: No module named 'app']]، و [[python -m app.seed]] من نفس الفولدر (اللي فيه [[app/]]) اشتغل وطبع [[seed ok: demo]].

السبب: لما تشغّل ملف بمساره، Python بيحط فولدر الملف نفسه ([[app/]]) في [[sys.path]]، فمش شايف حاجة اسمها [[app]] جواه. مع [[-m]] بيحط الفولدر الحالي، فـ [[app]] بقى package يتعمله import.

لو [[-m]] كمان فشل بنفس الغلطة، يبقى انت واقف جوه [[app/]] نفسه مش في الفولدر اللي فوقه، أو ناسي [[__init__.py]] أحيانًا، أو كتبت [[app/seed]] أو [[app.seed.py]] بدل [[app.seed]].`,
          solCode: R`# Linux و Mac:
mkdir -p app && touch app/__init__.py
echo 'NAME = "demo"' > app/config.py
printf 'from app import config\nprint("seed ok:", config.NAME)\n' > app/seed.py
python app/seed.py     # ModuleNotFoundError: No module named 'app'
python -m app.seed     # seed ok: demo
# Windows (PowerShell):
mkdir app
New-Item app\__init__.py
'NAME = "demo"' | Set-Content app\config.py
"from app import config$__btnprint('seed ok:', config.NAME)" | Set-Content app\seed.py
python app\seed.py     # ModuleNotFoundError: No module named 'app'
python -m app.seed     # seed ok: demo`
        }
      ]
    }
  ]
});
