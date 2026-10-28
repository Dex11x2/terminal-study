// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "توصل للأمر بنفسك في Python",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تسأل Python عن أي حاجة من جواه: [[help]] و [[dir]]، من غير ما تفتح متصفح.`,
        R`تستخدم [[python -m]] وتكتشف إن المكتبة القياسية فيها أدوات جاهزة.`,
        R`تجرّب أي سطر في ثانية بـ [[-c]] و [[-i]].`,
        R`تقرا الـ traceback من تحت لفوق، وتفهم الأسهم اللي Python بيرسمها.`,
      ],
      use: {
        prog: R`Python بيحمل توثيقه جواه: [[help]] بتقرا الـ docstring من الكود نفسه. يعني اللي بتكتبه في دالتك بيبقى توثيقها.`,
        work: R`[[python -m http.server]] بتشغّل سيرفر ملفات في ثانية. و [[python -m json.tool]] بتنسّق JSON. الحاجات دي موجودة من غير أي تسطيب.`,
        cs: R`الـ introspection: البرنامج بيقدر يسأل عن نفسه وقت التشغيل. و Python بيعمل ده بشكل كامل، وده أساس أدوات زي الـ debuggers والـ ORMs.`,
      },
      lab: R`mkdir -p ~/lab/plab && cd ~/lab/plab`,
      projects: [
        { t: R`جولة في المكتبة القياسية`, what: R`[[python -c "import sys; print(sorted(sys.stdlib_module_names))"]] بتطلّع ٢٩٧ وحدة. خد ٢٠ اسم متعرفهمش و [[python -m pydoc <الاسم>]] على كل واحد. هتلاقي حاجات بتسطّب مكتبات عشانها.` },
        { t: R`سيرفر في ثانية`, what: R`[[python -m http.server 8000]] بتخدم المجلد الحالي. استخدمها لما تحتاج تبعت ملف لجهاز تاني على نفس الشبكة، أو تجرّب صفحة HTML. **وقفلها بعدها** — دي بتكشف المجلد لأي حد على الشبكة.` },
        { t: R`قياس بدل تخمين`, what: R`[[python -m timeit "..."]] بتقيس سرعة سطر. قارن [[sorted(x)]] بـ [[x.sort()]]، و [[+]] على النصوص بـ [[''.join()]]. الأرقام هتفاجئك. من درس ٢.` },
      ],
      n: R`Python بيحمل توثيقه وأدواته جواه. القسم ده بيوريك تسأله إزاي، وتشغّل أدواته المدفونة، وتقرا أخطاءه`,
      items: [
        {
          cmd: "help() و dir()",
          title: "Python بيوثّق نفسه من جواه",
          learn: R`تسأل عن أي كائن أو دالة من الـ REPL أو من الترمنال.`,
          out: R`تعرف الدالة بتاخد إيه وبترجّع إيه من غير ما تفتح متصفح.`,
          use: {
            prog: R`الـ docstring اللي بتكتبه في دالتك هو اللي [[help]] بتعرضه. يعني توثيقك جزء من الكود، ومش بيبقى قديم.`,
            cs: R`[[dir]] بتسأل الكائن عن صفاته وقت التشغيل. والقدرة دي هي اللي بتخلي الـ debuggers والـ ORMs والـ serializers ممكنين أصلًا.`,
          },
          desc: R`Python فيه تلات أدوات بتجاوبك من جواه:

**[[help(x)]]** بتعرض توثيق أي حاجة: وحدة، أو كلاس، أو دالة. والتوثيق ده جاي من الـ **docstring** — النص اللي تحت تعريف الدالة. يعني اللي بتكتبه في كودك هو اللي بيظهر.

**[[dir(x)]]** بترجّع قايمة بكل صفات الكائن. ومفيدة لما تبقى عارف الكائن ومش فاكر اسم الميثود:

[[[m for m in dir(str) if 'split' in m]]]

**[[python -m pydoc <اسم>]]** نفس [[help]] بس من الترمنال مباشرة، من غير ما تدخل REPL.

وفيه حاجتين تانيين بيكملوهم:

[[type(x)]] بتقولك نوع الحاجة.
[[x.__doc__]] بترجّع الـ docstring كنص، لو عايزه في كود مش في الشاشة.

والفكرة كلها إن Python **بيسأل نفسه وقت التشغيل**. ودي مش رفاهية — دي اللي بتخلي الـ debuggers وأي أداة بتشتغل على كود غيرها ممكنة.`,
          example: R`# من الترمنال، من غير REPL
python -m pydoc str.partition
python -m pydoc pathlib.Path

# وفي الـ REPL
help(str.partition)
dir(str)

# ولما تكون عارف الكائن ومش فاكر الاسم
python -c "print([m for m in dir(str) if 'split' in m])"

# وكل وحدات المكتبة القياسية
python -c "import sys; print(len(sys.stdlib_module_names))"`,
          lines: [
            R`توثيق ميثود من الترمنال مباشرة.`,
            R`وتوثيق كلاس كامل.`,
            R`نفس الحاجة جوه الـ REPL.`,
            R`كل صفات الكائن.`,
            R`بتفلتر الأسماء — مفيدة لما تكون فاكر جزء من الاسم.`,
            R`عدد وحدات المكتبة القياسية. الرقم ده بيفاجئ ناس كتير.`,
          ],
          try: R`شغّل [[python -m pydoc pathlib.Path]] واقرا أول ١٠ سطور. وبعدين [[python -c "print([m for m in dir(list) if not m.startswith('_')])"]] وشوف list بتعمل كام حاجة.`,
          mac: ["both", R`[[help]] و [[dir]] و [[pydoc]] نفس الحاجة في كل الأنظمة. بس [[python]] على الماك ولينكس ممكن تكون Python 2 أو مش موجودة — استخدم [[python3]] هناك.`],
          deep: {
            why: R`الخروج للمتصفح بيقطع الشغل، والتوثيق اللي في موقع ممكن يكون لنسخة تانية. و [[help]] بتقرا من **النسخة المتسطبة عندك**.`,
            how: R`[[help]] بتستخدم وحدة [[pydoc]]، وبتجمع: توقيع الدالة، والـ docstring، وتوثيق الميثودز الموروثة.

والـ docstring هو أول نص في تعريف الدالة أو الكلاس:

~~~text
def f(x):
    """بتعمل كذا."""
    ...
~~~

وبيتخزّن في [[f.__doc__]]. يعني هو **بيانات**، مش تعليق — وده اللي بيخلي [[help]] تقراه.

[[dir(x)]] بترجّع أسماء الصفات مرتبة أبجديًا. والأسماء اللي بتبدأ وتنتهي بـ [[__]] دي الـ dunder methods (البروتوكولات الداخلية). فلو عايز اللي يهمك بس:

[[[m for m in dir(x) if not m.startswith('_')]]]

و [[dir()]] من غير argument بترجّع الأسماء في النطاق الحالي — مفيدة في الـ REPL.

**و [[python -m pydoc -b]]** بتفتح متصفح فيه توثيق **كل** اللي متسطب عندك، مفهرس. ودي حاجة قليل اللي يعرفها.

وفيه [[inspect]] للأسئلة الأعمق: [[inspect.signature(f)]] بترجّع التوقيع ككائن، و [[inspect.getsource(f)]] بترجّع **الكود نفسه**.

ولاحظ إن [[help]] في الـ REPL بتفتح pager (زي [[less]])، وبتخرج منه بـ [[q]]. وفي سكربت بتطبع على طول.`,
            when: R`أول ما تستخدم دالة مش متأكد من توقيعها. وقبل ما تدوّر في النت.`,
            mistakes: R`تكتب [[help(str.partition())]] بأقواس فتنادي الدالة بدل ما تسأل عنها. أو تدوّر على توثيق نسخة أحدث من اللي عندك. أو تنسى إن [[dir]] بترجّع الأسماء مش القيم.`
          },
          teach: R`## Python بيحمل توثيقه جواه

| الأداة | بتجاوب على |
|---|---|
| [[help(x)]] | الحاجة دي بتعمل إيه؟ |
| [[dir(x)]] | إيه اللي فيها؟ |
| [[type(x)]] | هي إيه أصلًا؟ |
| [[python -m pydoc x]] | نفس [[help]] من الترمنال |

---

## ١. [[help]] بتقرا الـ docstring

~~~bash Python 3.14
python -m pydoc str.partition
~~~

~~~text الناتج (اتشغّل فعلًا)
Help on method descriptor partition in str:

str.partition = partition(self, sep, /) unbound builtins.str method
    Partition the string into three parts using the given separator.
~~~

والنص ده جاي من **docstring** الدالة:

~~~python
def f(x):
    """بتعمل كذا."""
    ...
~~~

وبيتخزّن في [[f.__doc__]]. يعني هو **بيانات** مش تعليق — وده اللي بيخلي [[help]] تقراه.

> **اللي بتكتبه في دالتك هو توثيقها.** فالـ docstring مش زينة.

---

## ٢. [[dir]] لما تكون فاكر جزء من الاسم

~~~bash
python -c "print([m for m in dir(str) if 'split' in m])"
~~~

~~~text
['rsplit', 'split', 'splitlines']
~~~

~~~bash وللي يهمك بس
python -c "import pathlib; print([x for x in dir(pathlib.Path) if not x.startswith('_')][:10])"
~~~

~~~text الناتج (اتشغّل فعلًا)
['absolute', 'anchor', 'as_posix', 'as_uri', 'chmod', 'copy', 'copy_into', 'cwd', 'drive', 'exists']
~~~

الأسماء اللي بتبدأ وتنتهي بـ [[__]] دي البروتوكولات الداخلية — فلترها.

---

## ٣. وفخ بسيط

~~~python غلط: دي بتنادي الدالة
help(str.partition())
~~~

~~~python صح: من غير أقواس
help(str.partition)
~~~

انت بتسأل **عن** الدالة، مش بتشغّلها.

---

## ٤. وحاجتين قليل اللي يعرفهم

~~~bash توثيق كل اللي متسطب عندك، في متصفح مفهرس
python -m pydoc -b
~~~

~~~python والكود نفسه
import inspect
print(inspect.getsource(some_function))
~~~

[[inspect.getsource]] بترجّع **الكود**. مفيدة أوي لما تستخدم مكتبة ومش فاهم بتعمل إيه.

---

## ٥. والمكتبة القياسية أكبر من اللي فاكر

~~~bash اتشغّل فعلًا
python -c "import sys; print(len(sys.stdlib_module_names), 'وحدة في المكتبة القياسية')"
~~~

~~~text
297 وحدة في المكتبة القياسية
~~~

**٢٩٧ وحدة** جاية مع Python. وناس كتير بتسطّب مكتبات عشان حاجات موجودة فيهم.

---

## الخلاصة

- [[help]] بتقرا من كودك انت — اكتب docstrings.
- [[dir]] + فلتر لما تكون فاكر جزء من الاسم.
- [[pydoc]] من الترمنال، و [[pydoc -b]] في متصفح.
- [[inspect.getsource]] بتوريك الكود نفسه.
- من غير أقواس: بتسأل عن الدالة مش بتشغّلها.`,
          sol: R`[[dir]] على [[pathlib.Path]]، وعدد وحدات المكتبة القياسية — بناتجهم الحقيقي.`,
          solCode: R`python -c "import pathlib; print([x for x in dir(pathlib.Path) if not x.startswith('_')][:10])"
# ['absolute', 'anchor', 'as_posix', 'as_uri', 'chmod', 'copy', 'copy_into', 'cwd', 'drive', 'exists']

python -c "import sys; print(len(sys.stdlib_module_names), 'وحدة في المكتبة القياسية')"
# 297 وحدة في المكتبة القياسية

python -m pydoc str.partition
# Help on method descriptor partition in str:
#
# str.partition = partition(self, sep, /) unbound builtins.str method
#     Partition the string into three parts using the given separator.

# (اتشغّلوا فعلًا على Python 3.14.3)`
        },

        {
          cmd: "python -m pip والأدوات المدفونة",
          title: "ليه -m pip أأمن، وإيه الجاهز في المكتبة القياسية",
          learn: R`تشغّل وحدات المكتبة القياسية كبرامج، وتعرف ليه [[-m pip]] أأمن من [[pip]].`,
          out: R`سيرفر، ومنسّق JSON، ومقياس سرعة — كلهم من غير تسطيب.`,
          use: {
            prog: R`[[python -m pip]] بتضمن إن pip اللي هيشتغل هو بتاع **نفس** الـ Python. ودي بتحل أشهر مشكلة في بيئات Python.`,
            work: R`[[python -m http.server]] بتبعت ملف لجهاز تاني في ثانية، من غير أي تسطيب.`,
            cs: R`نفس الملف بيبقى مكتبة لما تعمله [[import]] وبرنامج لما تشغّله بـ [[-m]]. والفرق بينهم [[__name__]] — تجريد بسيط وقوي.`,
          },
          desc: R`درس «[[python -m]]» في المستوى الأول شرح الفكرة: الوحدة بتتشغّل كبرنامج. والدرس ده بياخدها لحتتين عمليتين: **ليه [[-m pip]] أأمن من [[pip]]**، وإيه الأدوات الجاهزة اللي ناس كتير بتسطّب مكتبات بدالها.

والوحدات اللي بتشتغل كأدوات:

[[python -m http.server 8000]] سيرفر ملفات للمجلد الحالي.
[[python -m json.tool]] بتنسّق JSON من stdin أو من ملف.
[[python -m venv .venv]] بتعمل بيئة معزولة.
[[python -m pip install x]] تسطيب.
[[python -m pydoc <اسم>]] توثيق.
[[python -m timeit "<كود>"]] بتقيس سرعة سطر.
[[python -m zipfile -c out.zip a b]] ضغط.
[[python -m compileall .]] بتتأكد إن كل الملفات بتتقري من غير أخطاء صياغة.

**وأهم واحدة فيهم: [[python -m pip]] بدل [[pip]].**

السبب إن [[pip]] أمر منفصل في الـ PATH، وممكن يكون بتاع Python تانية غير اللي انت شغال بيها. و [[python -m pip]] بتشغّل الـ pip بتاع **نفس** الـ Python اللي كتبت اسمه. ودي بتحل أشهر مشكلة في Python: «سطّبت المكتبة وبرضه بيقول مش موجودة».

ونفس الكلام مع [[python -m venv]] بدل [[virtualenv]].

وده شغّال على كودك انت كمان: أي حزمة فيها [[__main__.py]] بتتشغّل بـ [[python -m <اسمها>]].`,
          example: R`# سيرفر ملفات للمجلد الحالي
python -m http.server 8000

# نسّق JSON
python -c "import json; print(json.dumps({'b':2,'a':1}))" | python -m json.tool --sort-keys

# قيس سرعة سطر
python -m timeit -n 1000 "sorted([3,1,2])"

# بيئة معزولة
python -m venv .venv

# و pip بتاع نفس الـ Python
python -m pip --version`,
          lines: [
            R`بيخدم المجلد الحالي على البورت ده. **اقفله بعدها** — بيكشف المجلد لأي حد على الشبكة.`,
            R`بتنسّق JSON من stdin. و [[--sort-keys]] بترتّب المفاتيح.`,
            R`بتقيس متوسط زمن السطر على عدد تكرارات.`,
            R`بتعمل بيئة معزولة في فولدر [[.venv]].`,
            R`**دي المهمة**: بتشغّل pip بتاع نفس الـ Python اللي كتبت اسمه.`,
          ],
          try: R`شغّل [[python -m timeit "sorted([3,1,2])"]] و [[python -m timeit "x=[3,1,2]; x.sort()"]] وقارن. وبعدين [[python -m http.server 8000]] وافتح [[localhost:8000]] — **واقفله بعدها**.`,
          mac: ["both", R`نفس الحاجة، بس استخدم [[python3 -m]] على الماك ولينكس. و [[http.server]] بتسمع على كل الواجهات افتراضيًا — [[--bind 127.0.0.1]] بتقفلها على جهازك بس، وده الأأمن.`],
          deep: {
            why: R`أشهر مشكلة في Python هي إن عندك أكتر من نسخة، و [[pip]] بتسطّب في واحدة و [[python]] بتشغّل تانية. و [[-m]] بتقفل الباب ده.`,
            how: R`[[python -m x]] بتعمل حاجتين: بتضيف **المجلد الحالي** لأول الـ [[sys.path]]، وبتشغّل الوحدة بـ [[__name__ == "__main__"]].

والفرق ده مهم: [[python script.py]] بتضيف مجلد **السكربت**، و [[python -m script]] بتضيف المجلد **الحالي**. فلو عندك ملف اسمه زي وحدة قياسية ([[json.py]] مثلًا) في المجلد الحالي، [[-m]] هتاخده بدل القياسية.

**[[__name__]]**: لما الملف يتعمله [[import]]، [[__name__]] بتبقى اسم الوحدة. ولما يتشغّل مباشرة، بتبقى [["__main__"]]. وعشان كده السطر ده بيتكتب في آخر السكربتات:

~~~text
if __name__ == "__main__":
    main()
~~~

**وحزمة بـ [[__main__.py]]**: لو عملت فولدر [[mytool/]] فيه [[__init__.py]] و [[__main__.py]]، [[python -m mytool]] هتشغّل التاني. ودي الطريقة اللي [[pip]] و [[venv]] شغالين بيها.

**وعن [[http.server]]**: دي **للتجربة بس**. مفيهاش HTTPS، ومفيهاش تحكم في الصلاحيات، وبتخدم أي ملف في المجلد. ومكتوب ده صريح في توثيقها. وافتراضيًا بتسمع على كل الواجهات، فأي حد على الشبكة يقدر يشوف ملفاتك — [[--bind 127.0.0.1]] بتقفلها عليك.

**و [[timeit]]**: بتشغّل الكود آلاف المرات وبتاخد أحسن نتيجة من ٥ مجموعات. وبتقفل الـ garbage collector أثناء القياس عشان النتيجة تبقى مستقرة. و [[-n]] بتحدد عدد التكرارات في المجموعة.`,
            when: R`[[-m pip]] و [[-m venv]] **دايمًا**. والباقي لما تحتاجه.`,
            mistakes: R`تستخدم [[pip]] لوحدها في جهاز فيه أكتر من Python. أو تسيب [[http.server]] شغال على شبكة عامة. أو تسمّي ملف باسم وحدة قياسية فتغطي عليها.`
          },
          teach: R`## وحدات مكتوبة عشان تتشغّل

| الأمر | بيعمل إيه |
|---|---|
| [[python -m http.server 8000]] | سيرفر ملفات |
| [[python -m json.tool]] | بتنسّق JSON |
| [[python -m venv .venv]] | بيئة معزولة |
| [[python -m pip install x]] | تسطيب |
| [[python -m pydoc x]] | توثيق |
| [[python -m timeit "..."]] | قياس سرعة |
| [[python -m compileall .]] | فحص صياغة كل الملفات |

---

## ١. [[json.tool]]

~~~bash Python 3.14
python -c "import json; print(json.dumps({'b':2,'a':1}))" | python -m json.tool --sort-keys
~~~

~~~text الناتج (اتشغّل فعلًا)
{
    "a": 1,
    "b": 2
}
~~~

---

## ٢. [[timeit]]: قيس بدل ما تخمّن

~~~bash
python -m timeit -n 1000 "sorted([3,1,2])"
~~~

~~~text الناتج (اتشغّل فعلًا)
1000 loops, best of 5: 144 nsec per loop
~~~

بتشغّل الكود آلاف المرات، وبتاخد **أحسن** نتيجة من ٥ مجموعات، وبتقفل الـ garbage collector أثناء القياس.

---

## ٣. وأهم واحدة: [[python -m pip]]

~~~bash
python -m pip install requests      # ✅
pip install requests                 # ⚠️
~~~

| | بتسطّب فين |
|---|---|
| [[pip]] | **أول pip في الـ PATH** — ممكن يكون بتاع Python تانية |
| [[python -m pip]] | بتاع **نفس** الـ Python اللي كتبت اسمه |

ودي بتحل أشهر مشكلة في Python:

~~~text
$ pip install requests
Successfully installed requests
$ python -c "import requests"
ModuleNotFoundError: No module named 'requests'
~~~

لأن [[pip]] سطّبت في Python والـ [[python]] شغّلت Python تانية.

> ونفس الكلام: [[python -m venv]] بدل [[virtualenv]].

---

## ٤. [[-m]] بتشتغل على كودك كمان

~~~text حزمة قابلة للتشغيل
mytool/
  __init__.py
  __main__.py      <-- ده اللي بيتشغّل
~~~

~~~bash
python -m mytool
~~~

ودي الطريقة اللي [[pip]] و [[venv]] شغالين بيها.

---

## ٥. و [[__name__]]

~~~python آخر أي سكربت
if __name__ == "__main__":
    main()
~~~

| الملف | [[__name__]] |
|---|---|
| اتعمله [[import]] | اسم الوحدة |
| اتشغّل مباشرة | [["__main__"]] |

يعني نفس الملف بيبقى **مكتبة** و**برنامج**، والسطر ده هو الفرق.

---

## ٦. وفخ في [[sys.path]]

| | بتضيف لأول [[sys.path]] |
|---|---|
| [[python script.py]] | مجلد **السكربت** |
| [[python -m script]] | المجلد **الحالي** |

فلو عندك ملف اسمه [[json.py]] في مجلدك، [[python -m]] هتاخده بدل الوحدة القياسية. **متسميش ملفاتك بأسماء وحدات قياسية.**

---

## ٧. و [[http.server]] للتجربة بس

~~~bash آمن أكتر
python -m http.server 8000 --bind 127.0.0.1
~~~

افتراضيًا بتسمع على **كل الواجهات** — يعني أي حد على الشبكة يشوف ملفاتك. ومفيهاش HTTPS ولا صلاحيات.

---

## الخلاصة

- [[python -m pip]] و [[python -m venv]] **دايمًا**.
- المكتبة القياسية فيها أدوات جاهزة بتغنيك عن تسطيب.
- [[__name__ == "__main__"]] بيخلي الملف مكتبة وبرنامج.
- [[-m]] بتضيف المجلد **الحالي** لـ [[sys.path]].
- [[http.server]] للتجربة، وبـ [[--bind 127.0.0.1]].`,
          sol: R`الأداتين اللي هتستخدمهم كتير، بناتجهم الحقيقي.`,
          solCode: R`python -c "import json; print(json.dumps({'b':2,'a':1}))" | python -m json.tool --sort-keys
# {
#     "a": 1,
#     "b": 2
# }

python -m timeit -n 1000 "sorted([3,1,2])"
# 1000 loops, best of 5: 144 nsec per loop

# (اتشغّلوا فعلًا على Python 3.14.3)
#
# وأهم قاعدة في الدرس:
#   python -m pip install x     بدل    pip install x
# عشان pip تبقى بتاعة نفس الـ Python اللي كتبت اسمه.`
        },

        {
          cmd: "اقرا الـ traceback",
          title: "من تحت لفوق، والأسهم بتقولك فين بالظبط",
          learn: R`تقرا الخطأ من آخره، وتستفيد من الأسهم اللي Python بيرسمها تحت السطر.`,
          out: R`توصل للسطر الغلط في ثانية بدل ما تقرا الرسالة كلها.`,
          use: {
            prog: R`الـ traceback سلسلة النداءات. وقرايتها بتفرّق بين «الخطأ حصل فين» و«الخطأ سببه إيه» — ودول مش نفس السطر عادة.`,
            work: R`أول رد فعل لناس كتير هو نسخ آخر سطر في جوجل. والسطر اللي قبله بيقولك فين في كودك انت.`,
            cs: R`الـ call stack بيتقلب في العرض: Python بيعرضه من الأقدم للأحدث، فآخر سطر هو **مكان الانفجار**.`,
          },
          desc: R`الـ traceback شكله طويل، بس بنيته بسيطة:

**آخر سطر** هو **نوع الخطأ ورسالته**: [[KeyError: 'missing']].
**السطر اللي فوقه** هو **المكان اللي انفجر فيه**.
**واللي فوقهم** هي سلسلة النداءات، من الأقدم لحد الأحدث.

فالقراية بتبدأ **من تحت**: إيه الخطأ، وفين حصل. وبعدين تطلع لفوق لو محتاج تعرف مين ناداه.

ومن Python 3.11 فيه إضافة بتوفّر وقت: **الأسهم تحت السطر**. بدل ما يقولك «السطر ده فيه خطأ»، بيحدد **الجزء** اللي فيه الخطأ بالظبط:

~~~text
    return d["missing"]
           ~^^^^^^^^^^^
~~~

الـ [[~]] بتشاور على الجزء السليم، والـ [[^]] على الجزء اللي رمى. وده بيفرق جدًا في سطر فيه أكتر من عملية: [[a[i] + b[j] * c[k]]] — السهم بيقولك أنهي واحدة.

وفيه حاجة تانية مهمة: **الأسطر بتاعة كودك انت** هي اللي تبص عليها. لو الـ traceback فيه ١٥ سطر وعشرة منهم في [[site-packages]]، ابدأ من آخر سطر فيه **ملفك انت**.`,
          example: R`# tb.py
def level3(d):
    return d["missing"]
def level2(d):
    return level3(d)
def level1():
    return level2({"a": 1})
level1()`,
          lines: [
            R`الدالة اللي هترمي.`,
            R`المفتاح ده مش موجود.`,
            R`بتنادي اللي فوقها.`,
            R`نداء.`,
            R`وبتنادي.`,
            R`نداء ومعاه القاموس.`,
            R`البداية.`,
          ],
          try: R`اعمل الملف وشغّله واقرا الـ traceback من تحت لفوق. وبعدين خلي [[level3]] تعمل [[d["a"] + d["missing"]]] وشوف الأسهم بتشاور على أنهي جزء.`,
          flag: "script",
          mac: ["both", R`نفس الشكل. والأسهم موجودة من Python 3.11 في كل الأنظمة.`],
          deep: {
            why: R`أول رد فعل لناس كتير هو نسخ آخر سطر في جوجل. وآخر سطرين مع بعض بيقولوا الإجابة في أغلب الحالات.`,
            how: R`الـ traceback بيتبني من الـ call stack. وبيتعرض من **الأقدم للأحدث** — عكس بعض اللغات. فآخر إطار هو مكان الانفجار.

وكل إطار فيه: الملف، والسطر، واسم الدالة، ونص السطر.

**الأسهم** (من 3.11، واسمها fine-grained error locations) بتتخزّن في الـ bytecode نفسه. وبتظهر في:

| الرمز | معناه |
|---|---|
| [[~]] | الجزء السليم من التعبير |
| [[^]] | **الجزء اللي رمى** |

ولو السطر كله هو المشكلة، Python مبيرسمش أسهم.

**و [[raise ... from ...]]**: لما خطأ يحصل جوه [[except]]، Python بيعرض الاتنين:

[[During handling of the above exception, another exception occurred]] — الخطأ التاني حصل وانت بتعالج الأول (غالبًا بالصدفة).
[[The above exception was the direct cause]] — انت كتبت [[raise X from Y]] عن قصد.

والتفرقة دي مهمة: الأولى بتقول «فيه بق في معالجة الخطأ»، والتانية بتقول «ده مقصود».

**وتقصير الـ traceback**: [[sys.tracebacklimit]] بتحدد عدد الإطارات. و [[traceback.print_exc(limit=3)]] نفس الفكرة.

**وفي سكربت**: [[python -X dev script.py]] بتشغّل وضع التطوير، وبتطلّع تحذيرات إضافية بتكشف مشاكل بدري.

وللأخطاء اللي بتحصل عند الخروج: [[faulthandler]] بتطبع الـ traceback حتى لو Python نفسه وقع.`,
            when: R`كل خطأ. والعادة: اقرا آخر سطرين الأول.`,
            mistakes: R`تقرا من فوق وتضيع في إطارات المكتبات. أو تنسخ آخر سطر بس من غير السطر اللي فوقه. أو تتجاهل [[During handling of the above exception]] وهي بتقول إن فيه مشكلة تانية في معالجة الخطأ.`
          },
          teach: R`## البنية: اقرا من تحت

~~~python tb.py
def level3(d):
    return d["missing"]
def level2(d):
    return level3(d)
def level1():
    return level2({"a": 1})
level1()
~~~

~~~text الناتج (اتشغّل فعلًا · Python 3.14)
Traceback (most recent call last):
  File "C:\...\tb.py", line 7, in <module>
    level1()
    ~~~~~~^^
  File "C:\...\tb.py", line 6, in level1
    return level2({"a": 1})
  File "C:\...\tb.py", line 4, in level2
    return level3(d)
  File "C:\...\tb.py", line 2, in level3
    return d["missing"]
           ~^^^^^^^^^^^
KeyError: 'missing'
~~~

~~~text ترتيب القراية
١. آخر سطر:        KeyError: 'missing'        ← إيه الخطأ
٢. اللي فوقه:      line 2, in level3          ← فين انفجر
٣. واللي فوقهم:    سلسلة النداءات             ← مين ناداه
~~~

> **[[most recent call last]]** في أول سطر بتقولك ده صريح: الأحدث في الآخر.

---

## ١. الأسهم (من Python 3.11)

~~~text
    return d["missing"]
           ~^^^^^^^^^^^
~~~

| الرمز | معناه |
|---|---|
| [[~]] | الجزء **السليم** |
| [[^]] | الجزء اللي **رمى** |

وده بيفرق جدًا في سطر فيه أكتر من عملية:

~~~text
    total = a[i] + b[j] * c[k]
                   ~~~~^^^
~~~

من غير الأسهم، كنت هتجرّب التلاتة.

---

## ٢. ركّز على ملفاتك انت

~~~text traceback حقيقي من مشروع
  File "C:\...\.venv\Lib\site-packages\requests\api.py", line 59, in request
  File "C:\...\.venv\Lib\site-packages\requests\sessions.py", line 589, in request
  File "C:\...\myapp\client.py", line 22, in fetch        <-- ملفك انت
  File "C:\...\.venv\Lib\site-packages\urllib3\...", line 844
~~~

**ابدأ من آخر سطر فيه ملفك انت.** إطارات المكتبات نادرًا بتكون هي المشكلة.

---

## ٣. والخطأ جوه الخطأ

~~~text الحالة الأولى
During handling of the above exception, another exception occurred:
~~~

معناها: كان فيه خطأ، وانت بتعالجه حصل خطأ **تاني** — غالبًا بالصدفة. **دي بتقول إن فيه بق في معالجة الخطأ عندك.**

~~~text الحالة التانية
The above exception was the direct cause of the following exception:
~~~

معناها: انت كتبت [[raise X from Y]] **عن قصد**. ودي سليمة.

~~~python عشان تربط السبب صح
try:
    ...
except ValueError as e:
    raise ConfigError("الإعداد غلط") from e
~~~

---

## ٤. وأدوات تساعد

~~~bash وضع التطوير: تحذيرات بتكشف مشاكل بدري
python -X dev script.py
~~~

~~~python traceback أقصر
import sys
sys.tracebacklimit = 3
~~~

~~~python ولو Python نفسه وقع
import faulthandler
faulthandler.enable()
~~~

---

## الخلاصة

- اقرا من **تحت**: النوع، وبعدين المكان.
- [[most recent call last]] — الأحدث في الآخر.
- الأسهم بتحدد الجزء، مش السطر.
- ابدأ من آخر إطار فيه **ملفك انت**.
- [[During handling]] معناها بق في معالجة الخطأ.`,
          sol: R`الـ traceback كامل بأسهمه — ولاحظ السهم تحت [[d["missing"]]] بالظبط.`,
          solCode: R`# tb.py
def level3(d):
    return d["missing"]
def level2(d):
    return level3(d)
def level1():
    return level2({"a": 1})
level1()

# الناتج (اتشغّل فعلًا على Python 3.14.3):
# Traceback (most recent call last):
#   File "C:\...\tb.py", line 7, in <module>
#     level1()
#     ~~~~~~^^
#   File "C:\...\tb.py", line 6, in level1
#     return level2({"a": 1})
#   File "C:\...\tb.py", line 4, in level2
#     return level3(d)
#   File "C:\...\tb.py", line 2, in level3
#     return d["missing"]
#            ~^^^^^^^^^^^
# KeyError: 'missing'`
        }
      ]
    }
]);
