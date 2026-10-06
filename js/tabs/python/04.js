// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "الاختبارات و FastAPI",
      l: 2,
      n: "pytest للاختبارات، و uvicorn يشغّل API وانت بتطوّر، و Python جوه سكربتات bash",
      items: [
        {
          cmd: "pytest",
          title: "شغّل الاختبارات",
          desc: "[[pytest]] بيدوّر على ملفات [[test_*.py]] والدوال اللي بتبدأ بـ [[test_]] ويشغّلها. [[-q]] ناتج مختصر، و [[-x]] يقف عند أول فشل، و [[-k]] يختار اختبارات بالاسم.",
          example: R`pip install pytest
pytest -q
pytest -x
pytest -k "login and not slow"
pytest tests/test_api.py::test_health -v
python -m pytest -q --lf`,
          try: "اكتب [[def test_add(): assert 1 + 1 == 3]] في [[tests/test_math.py]] وشغّل pytest، وشوف إزاي بيوريك القيمتين. وبعدين صلّحه.",
          deep: {
            why: "بتعدّل دالة وعايز تعرف إنك مكسرتش حاجة تانية. pytest بيشغّل كل الاختبارات في ثواني ويقولك بالظبط إيه اللي وقع.",
            how: R`الاختبار دالة عادية فيها [[assert]]. لو الشرط غلط، pytest بيعرض القيمتين والفرق بينهم، من غير ما تكتب رسايل.

[[-q]] سطر واحد بالنقط والنتيجة. [[-v]] اسم كل اختبار. [[-x]] أول فشل يوقف (مفيد لما فيه ٥٠ فشل من نفس السبب). [[-s]] يطبع الـ print.

[[-k]] تعبير على أسماء الاختبارات: [["login and not slow"]]. والـ node id [[file::function]] يشغّل اختبار واحد بعينه.

[[--lf]] (last failed) يشغّل اللي فشل المرة اللي فاتت بس. وانت بتصلّح، دي بتوفّر وقت كتير.

[[python -m pytest]] بدل [[pytest]]: بيحط الفولدر الحالي في sys.path، فـ [[from app.main import app]] بيشتغل من غير إعدادات. في مشروع حقيقي أمر الاختبار كان [[cd app && python -m pytest tests -q]].

الـ exit code مش صفر لو أي اختبار فشل، فـ CI بيتعلّم أحمر لوحده. و [[conftest.py]] فيه الـ fixtures اللي بتتشارك بين الملفات (قاعدة بيانات تجربة، client للـ API).`,
            when: "قبل كل commit. وفي CI.",
            mistakes: "pytest من Python بره الـ venv فيطلع [[No module named fastapi]]. واختبارات بتعتمد على بعض أو على بيانات فضلت من run قبلها، فبتنجح مع بعض وتفشل لوحدها."
          },
          teach: R`## الفكرة: pytest بيدوّر على الاختبارات ويشغّلها ويقولك مين وقع

المثال ٦ أوامر: سطر بيسطّب pytest، والباقي طرق مختلفة تشغّل بيها نفس الاختبارات. جربناهم كلهم على ويندوز (Python 3.14 جوه venv، و pytest 9.1.1) وعلى لينكس (صورة [[python:3.13-slim]] في Docker)، على مشروع صغير شكله كده:

~~~text المشروع اللي جربنا عليه
app/__init__.py
app/main.py          تطبيق FastAPI فيه /health
tests/test_api.py    test_health و test_login_ok و test_login_slow
tests/test_math.py   def test_add(): assert 1 + 1 == 3   (غلط عن قصد)
~~~

---

## ١. [[pip install pytest]]

[[pip]] (package installer for Python) بيسطّب المكتبة جوه الـ venv المتفعّل. وبعدها عندك أمر جديد اسمه [[pytest]]:

~~~bash
pytest --version
~~~

~~~text الناتج
pytest 9.1.1
~~~

### pytest بيلاقي الاختبارات إزاي؟

من غير ما تقوله حاجة، بيلف على الفولدر الحالي واللي جواه ويجمع (collect) اللي ماشي على القواعد دي:

| الحاجة | لازم اسمها |
|---|---|
| الملف | [[test_*.py]] أو [[*_test.py]] |
| الدالة | تبدأ بـ [[test]] |
| الكلاس (لو بتجمّع اختبارات فيه) | يبدأ بـ [[Test]] ومفيهوش [[__init__]] |

والاختبار نفسه دالة عادية فيها [[assert]]: كلمة في Python معناها «اتأكد إن الشرط ده صح، ولو غلط ارمي [[AssertionError]]».

---

## ٢. [[pytest -q]]

### أول مفاجأة: [[No module named 'app']]

شغّلنا [[pytest -q]] على المشروع زي ما هو، ووقع قبل ما يشغّل أي اختبار (نفس الكلام على ويندوز ولينكس):

~~~text الناتج
E   ModuleNotFoundError: No module named 'app'
ERROR tests/test_api.py
!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!
1 error in 0.65s
~~~

ليه؟ [[test_api.py]] فيه [[from app.main import app]]، و Python بيدوّر على [[app]] في لستة فولدرات اسمها [[sys.path]]. و [[pytest]] لوحده بيحط في [[sys.path]] فولدر [[tests]] مش جذر المشروع، فمش شايف [[app]].

الحل يا [[python -m pytest]] (بيضيف الفولدر الحالي لـ [[sys.path]])، يا سطر [[pythonpath = .]] في [[pytest.ini]] (الدرس الجاي). هنا هنستخدم [[python -m pytest]].

### الناتج وإزاي تقراه

~~~bash
python -m pytest -q
~~~

~~~text الناتج على ويندوز
...F                                                                     [100%]
================================== FAILURES ===================================
__________________________________ test_add ___________________________________

>   def test_add(): assert 1 + 1 == 3
                    ^^^^^^^^^^^^^^^^^
E   assert (1 + 1) == 3

tests\test_math.py:1: AssertionError
=========================== short test summary info ===========================
FAILED tests/test_math.py::test_add - assert (1 + 1) == 3
1 failed, 3 passed in 0.54s
~~~

[[-q]] اختصار quiet: من غير الهيدر الطويل (نسخة Python و pytest والـ plugins)، وكل اختبار حرف واحد:

| الحرف | معناه |
|---|---|
| [[.]] | passed: عدّى |
| [[F]] | failed: الـ assert وقع |
| [[E]] | error: حاجة وقعت قبل أو بعد الاختبار نفسه (في fixture مثلًا) |
| [[s]] | skipped: اتخطى عن قصد |
| [[x]] | xfail: متوقع إنه يقع ووقع فعلًا |

وتحت FAILURES تفاصيل كل واحد وقع: السطر اللي عليه [[>]] هو الكود، والسطر اللي بيبدأ بـ [[E]] هو الشرح. وآخر سطر الحصيلة.

### pytest بيوريك القيم لوحده

لو الـ assert فيه نداء دالة، pytest بيكتبلك هي رجّعت إيه. غيّرنا الاختبار لـ [[assert add(1, 1) == 3]] (و [[add]] بترجّع [[a + b]]) وده الناتج على لينكس:

~~~text الناتج
    def test_add():
>       assert add(1, 1) == 3
E       assert 2 == 3
E        +  where 2 = add(1, 1)
~~~

[[where 2 = add(1, 1)]] يعني: الـ 2 اللي على الشمال دي جاية من [[add(1, 1)]]. pytest بيعمل كده عن طريق إنه بيعيد كتابة الـ [[assert]] وهو بيقرا الملف (assertion rewriting)، فمش محتاج تكتب رسالة خطأ بإيدك.

ولاحظ الفرق الصغير بين النظامين: مسار الملف في الـ traceback بيطلع [[tests\test_math.py:1]] على ويندوز و [[tests/test_math.py:4]] على لينكس، لكن الـ node id في سطر FAILED بيتكتب بـ [[/]] دايمًا.

### الـ exit code

| الكود | معناه | شفناه فين |
|---|---|---|
| 0 | كل الاختبارات عدّت | بعد ما صلّحنا [[== 2]] |
| 1 | اختبار أو أكتر وقع | الناتج اللي فوق |
| 2 | التشغيل اتقطع (error في الـ collection) | marker غلط في الدرس الجاي |
| 5 | مفيش اختبارات خالص | فولدر فاضي: [[no tests ran]] |

ده اللي بيخلي CI يعرف لوحده: أي رقم غير 0 يبقى الـ job أحمر.

---

## ٣. [[pytest -x]]

[[-x]] اختصار [[--exitfirst]]: أول اختبار يقع، وقّف التشغيل كله. آخر الناتج:

~~~text الناتج
FAILED tests/test_math.py::test_add - assert (1 + 1) == 3
!!!!!!!!!!!!!!!!!!!!!!!!!! stopping after 1 failures !!!!!!!!!!!!!!!!!!!!!!!!!!
========================= 1 failed, 3 passed in 0.50s =========================
~~~

هنا الاختبار الواقع كان آخر واحد فمفرقتش. الفايدة لما يبقى عندك ٥٠ اختبار واقعين من نفس السبب: تشوف أول واحد بس وتصلّحه.

---

## ٤. [[pytest -k "login and not slow"]]

[[-k]] بيختار اختبارات بتعبير على أسمائها: كل كلمة بتدوّر على جزء من الاسم (من غير ما يفرق capital و small)، وتربطهم بـ [[and]] و [[or]] و [[not]]. علامات التنصيص عشان الشيل يبعت التعبير كله كـ argument واحد.

~~~bash
python -m pytest -k "login and not slow" -v
~~~

~~~text الناتج
collecting ... collected 4 items / 3 deselected / 1 selected
tests/test_api.py::test_login_ok PASSED                                  [100%]
======================= 1 passed, 3 deselected in 0.41s =======================
~~~

| الاختبار | فيه login؟ | فيه slow؟ | اتشغّل؟ |
|---|---|---|---|
| test_health | لأ | لأ | لأ |
| test_login_ok | آه | لأ | آه |
| test_login_slow | آه | آه | لأ |
| test_add | لأ | لأ | لأ |

و deselected يعني «اتلم بس اتشال من التشغيل».

---

## ٥. [[pytest tests/test_api.py::test_health -v]]

ده **node id**: مسار الملف، وبعده [[::]]، وبعده اسم الاختبار. بيشغّل الاختبار ده بس. و [[-v]] (verbose) بيكتب اسم كل اختبار ونتيجته بدل النقط:

~~~text الناتج
tests/test_api.py::test_health PASSED                                    [100%]

============================== 1 passed in 0.51s ==============================
~~~

---

## ٦. [[python -m pytest -q --lf]]

[[--lf]] اختصار [[--last-failed]]. pytest بيحفظ بعد كل تشغيل أسماء اللي وقعوا في فولدر [[.pytest_cache]] جنب المشروع، و [[--lf]] بيشغّلهم هما بس. من غير [[-q]] بيقولك عمل إيه:

~~~text الناتج
collected 1 item
run-last-failure: rerun previous 1 failure (skipped 1 file)
~~~

يعني لقى اختبار واحد وقع المرة اللي فاتت، وتخطى ملف [[test_api.py]] كله لأن مفيهوش حد وقع. وبعدها:

~~~text الناتج
FAILED tests/test_math.py::test_add - assert (1 + 1) == 3
1 failed in 0.08s
~~~

و [[.pytest_cache]] حطه في [[.gitignore]].

---

## الفلاجات كلها

| الفلاج | الاسم الطويل | بيعمل إيه |
|---|---|---|
| [[-q]] | [[--quiet]] | حرف لكل اختبار |
| [[-v]] | [[--verbose]] | اسم كل اختبار ونتيجته |
| [[-x]] | [[--exitfirst]] | وقّف عند أول فشل |
| [[-k EXPR]] | | اختار بالاسم |
| [[file::name]] | | اختبار واحد بعينه |
| [[--lf]] | [[--last-failed]] | اللي وقع المرة اللي فاتت بس |
| [[-s]] | | اعرض الـ print بدل ما pytest يمسكه |

## الخلاصة

- الاختبار دالة اسمها يبدأ بـ [[test]] في ملف [[test_*.py]]، وجواها [[assert]].
- لو طلع [[No module named 'app']]: شغّل [[python -m pytest]] أو حط [[pythonpath = .]] في [[pytest.ini]].
- اقرا سطر [[E]]: فيه القيمتين، و [[where]] بيقولك جم منين.
- وانت بتصلّح: [[-x]] و [[--lf]] و [[-k]] بيوفروا وقت. وفي CI: الـ exit code هو اللي بيحكم.`,
          lines: [
            "سطّب pytest في الـ venv.",
            "شغّل الكل بناتج مختصر.",
            "وقّف عند أول فشل.",
            "الاختبارات اللي اسمها فيه login ومش slow.",
            "اختبار واحد بعينه بالتفصيل.",
            "اللي فشل المرة اللي فاتت بس."
          ],
          sol: R`[[pytest]] بيطبع [[F]] وتحته حاجة زي:

[[>   def test_add(): assert 1 + 1 == 3]]
[[E   assert (1 + 1) == 3]]
[[FAILED tests/test_math.py::test_add - assert (1 + 1) == 3]]
[[1 failed in 0.02s]]

السطر اللي بيبدأ بـ [[E]] هو المفيد: pytest بيعيد كتابة الـ [[assert]] العادي عشان يوريك الطرفين. مع متغيرات بيكتبلك قيمهم، زي [[assert 2 == 3]] ومعاها [[where 2 = add(1, 1)]]. بعد ما تصلّحه لـ [[== 2]] هتلاقي [[.]] و [[1 passed]].

لو طلع [[no tests ran]] يبقى اسم الملف أو الدالة مش بيبدأ بـ [[test_]]. ولو [[pytest: command not found]] يبقى الـ venv مش متفعل، استخدم [[python -m pytest]].`
        },
        {
          cmd: "pytest.ini",
          title: "إعدادات pytest في ملف",
          desc: "بدل ما تكتب نفس الفلاجات كل مرة: [[pytest.ini]] في جذر المشروع. بيقول فين الاختبارات، ويحط المشروع في مسار الاستيراد، ويشغّل الدوال async، ويسجّل الـ markers.",
          example: R`[pytest]
pythonpath = .
testpaths = tests
addopts = -q --strict-markers
asyncio_mode = auto
markers =
    slow: tests that take more than a second`,
          try: "حط الملف ده، وعلّم اختبار بـ [[@pytest.mark.slow]]، وشغّل [[pytest -m \"not slow\"]]. وبعدين اكتب [[@pytest.mark.slwo]] غلط وشوف --strict-markers بيمسكها.",
          flag: "script",
          deep: {
            why: "ImportError في الاختبارات لأن pytest مش شايف الباكدج، واختبارات async مش بتشتغل، وكل واحد في الفريق بيشغّل بفلاجات مختلفة. ملف واحد بيحل التلاتة.",
            how: R`pytest بيدوّر على pytest.ini في الفولدر الحالي واللي فوقه، والفولدر اللي فيه الملف بيبقى الـ rootdir.

[[pythonpath = .]] بيضيف جذر المشروع لـ sys.path، فـ [[from app.main import app]] يشتغل مهما شغّلت pytest منين.

[[testpaths = tests]] بيدوّر في tests بس، مش في .venv و node_modules.

[[addopts]] فلاجات بتتضاف لكل تشغيل. [[--strict-markers]] أي marker مش متسجّل يبقى error بدل ما يتجاهل بهدوء.

[[asyncio_mode = auto]] (من مكتبة pytest-asyncio) بيخلي [[async def test_...]] تشتغل من غير decorator على كل واحدة. مفيد مع FastAPI و asyncpg.

[[markers]] تسجيل للعلامات، وبعدين [[pytest -m "not slow"]] يشغّل السريع بس.

نفس الإعدادات ممكن تتحط في [[pyproject.toml]] تحت [[[tool.pytest.ini_options] ]].`,
            when: "أول ما يبقى عندك فولدر tests.",
            mistakes: "asyncio_mode من غير ما تسطّب pytest-asyncio: pytest بيحذّر بـ Unknown config option، والاختبارات async بتفشل (في النسخ قبل pytest 8.4 كانت بتتخطى بتحذير بس). وإعدادات في pytest.ini و pyproject.toml الاتنين: pytest.ini بيكسب والتاني بيتجاهل من غير ما يقولك."
          },
          teach: R`## الفكرة: الفلاجات اللي بتكتبها كل مرة تتكتب مرة واحدة في ملف

[[pytest.ini]] ملف نصي بتحطه في جذر المشروع (جنب فولدر [[app]] و [[tests]]). pytest بيقراه لوحده في أول كل تشغيل. صيغته INI: قسم بين قوسين مربعين، وتحته سطور [[key = value]]. جربناه على ويندوز (pytest 9.1.1 و pytest-asyncio 1.4.0) وعلى لينكس ([[python:3.13-slim]] في Docker)، على ملف اختبار فيه ٣ اختبارات: واحد عادي، وواحد عليه [[@pytest.mark.slow]]، وواحد [[async def]].

---

## ١. [[[pytest] ]]

اسم القسم. pytest بيقرا اللي تحت السطر ده بس. أول ما يلاقي الملف بيكتب في الهيدر:

~~~text أول الناتج (من غير -q)
rootdir: C:\Users\ali\proj
configfile: pytest.ini
testpaths: tests
~~~

[[rootdir]] هو الفولدر اللي فيه الملف، وكل المسارات اللي في الإعدادات بتتحسب منه.

---

## ٢. [[pythonpath = .]]

النقطة [[.]] معناها «الفولدر ده» (الـ rootdir). السطر بيضيفه لـ [[sys.path]]، اللستة اللي Python بيدوّر فيها على أي [[import]]. ده بالظبط حل [[No module named 'app']] من الدرس اللي فات: بعد السطر ده [[pytest]] لوحده (من غير [[python -m]]) شغال.

---

## ٣. [[testpaths = tests]]

لو كتبت [[pytest]] من غير مسار، يدوّر في فولدر [[tests]] بس. من غيره هيلف على المشروع كله، ومنه [[.venv]] اللي فيه آلاف الملفات.

---

## ٤. [[addopts = -q --strict-markers]]

addopts يعني «add options»: فلاجات بتتضاف لوحدها لكل تشغيل، كأنك كاتبها في الأمر.

- [[-q]] ناتج مختصر (من الدرس اللي فات).
- [[--strict-markers]]: أي marker مش متسجّل في [[markers]] تحت يبقى error مش warning.

جربنا نكتب [[@pytest.mark.slwo]] غلط:

~~~text الناتج مع --strict-markers
_____________________ ERROR collecting tests/test_math.py _____________________
'slwo' not found in $__btmarkers$__bt configuration option
ERROR tests/test_math.py - Failed: 'slwo' not found in $__btmarkers$__bt configuratio...
!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!
1 error in 0.18s
~~~

والـ exit code طلع 2 (التشغيل اتقطع). ولما شلنا [[--strict-markers]] على لينكس:

~~~text الناتج من غيره (مختصر)
...                                                                      [100%]
PytestUnknownMarkWarning: Unknown pytest.mark.slwo - is this a typo?
3 passed, 1 warning in 0.01s
~~~

كله «عدّى»، والـ warning بيضيع وسط الناتج. ده اللي [[--strict-markers]] بيمنعه.

---

## ٥. [[asyncio_mode = auto]]

السطر ده **مش** من pytest نفسه، ده إعداد لـ plugin اسمه [[pytest-asyncio]]. معناه: أي [[async def test_...]] شغّلها جوه event loop لوحدك، من غير ما أحط [[@pytest.mark.asyncio]] على كل واحدة. والهيدر بيأكد:

~~~text الناتج
asyncio: mode=Mode.AUTO, ...
~~~

ولو الـ plugin مش متسطّب، جربنا على لينكس بـ pytest بس:

~~~text الناتج (مختصر)
async def functions are not natively supported.
You need to install a suitable plugin for your async framework, for example:
  - anyio
  - pytest-asyncio
PytestConfigWarning: Unknown config option: asyncio_mode
FAILED tests/test_math.py::test_async - Failed: async def functions are not n...
1 failed, 2 passed, 1 warning in 0.01s
~~~

حاجتين: الاختبار الـ async وقع، و pytest قال إنه مش فاهم [[asyncio_mode]]. الحل [[pip install pytest-asyncio]].

---

## ٦. [[markers =]] و [[slow: ...]]

قيمة على كذا سطر: السطر الأول [[markers =]] فاضي، وكل سطر بعده **متزاح بمسافات** يبقى جزء من نفس القيمة. كل سطر: اسم الـ marker، ونقطتين، ووصف. الوصف بيظهر في [[pytest --markers]]:

~~~text الناتج
@pytest.mark.slow: tests that take more than a second
~~~

وبعد ما سجّلته، [[-m]] بيختار بالـ markers (زي [[-k]] بس على العلامات مش الأسماء):

~~~bash
pytest -m "not slow"
~~~

~~~text الناتج
..                                                                       [100%]
2 passed, 1 deselected in 0.01s
~~~

---

## الملف كله

| السطر | بيعمل إيه |
|---|---|
| [[[pytest] ]] | قسم إعدادات pytest |
| [[pythonpath = .]] | جذر المشروع في [[sys.path]]، فالـ import يشتغل |
| [[testpaths = tests]] | دوّر في tests بس |
| [[addopts = -q --strict-markers]] | فلاجات لكل تشغيل، والـ marker الغلط error |
| [[asyncio_mode = auto]] | الاختبارات async تشتغل لوحدها (محتاج pytest-asyncio) |
| [[markers =]] + [[slow: ...]] | تسجيل العلامات المسموحة |

## الخلاصة

- [[pytest.ini]] في جذر المشروع، وأول سطر [[[pytest] ]]. ونفس الإعدادات ممكن تتحط في [[pyproject.toml]] تحت [[[tool.pytest.ini_options] ]]، بس متحطهاش في الاتنين.
- [[pythonpath = .]] بيخلّص من [[No module named]].
- [[--strict-markers]] بيحوّل غلطة الإملاء في الـ marker لـ error بدل warning محدش بيقراه.
- [[asyncio_mode]] إعداد plugin: من غير [[pytest-asyncio]] هيطلع [[Unknown config option]] والاختبارات async هتقع.`,
          lines: [
            "قسم إعدادات pytest.",
            "جذر المشروع في مسار الاستيراد.",
            "دوّر على الاختبارات في tests بس.",
            "فلاجات لكل تشغيل: مختصر، و markers متسجّلة بس.",
            "الدوال async تشتغل لوحدها (pytest-asyncio).",
            "العلامات المسموحة:",
            "slow للاختبارات البطيئة."
          ],
          sol: R`مع اختبارين واحد منهم [[@pytest.mark.slow]]، [[pytest -m "not slow"]] بيطلّع [[1 passed, 1 deselected]]. ولما كتبت [[@pytest.mark.slwo]] وقفت الـ collection كلها بـ:

[[ERROR tests/test_math.py - Failed: 'slwo' not found in $__btmarkers$__bt configuration option]]
[[Interrupted: 1 error during collection]]

من غير [[--strict-markers]] كان هيعدّي بـ warning بس، والاختبار «البطيء» هيفضل شغال في كل مرة من غير ما تاخد بالك. وخد بالك من حاجتين: سطر [[asyncio_mode = auto]] بيطلّع [[PytestConfigWarning: Unknown config option: asyncio_mode]] لو [[pytest-asyncio]] مش متسطبة. ولو عدّلت ملف الاختبار وشغّلت pytest على طول والنتيجة ما اتغيرتش، امسح [[__pycache__]] وجرّب تاني.`
        },
        {
          cmd: "uvicorn --reload",
          title: "شغّل FastAPI وانت بتطوّر",
          desc: "FastAPI مكتبة بتكتب بيها الـ API، و [[uvicorn]] السيرفر اللي بيشغّلها. [[uvicorn app.main:app --reload]] يعني: في ملف [[app/main.py]] فيه متغير اسمه [[app]]، شغّله، وأعد التشغيل لوحدك مع كل حفظ.",
          example: R`pip install "fastapi==0.115.5" "uvicorn[standard]==0.32.1"
uvicorn app.main:app --reload
uvicorn app.main:app --reload --port 8001
curl -s localhost:8000/health
# التوثيق التفاعلي: http://localhost:8000/docs`,
          try: "اعمل [[app/main.py]] فيه [[app = FastAPI()]] و endpoint [[/health]] بيرجّع [[{\"ok\": True}]]. شغّله، وعدّل الرد واحفظ، وشوف uvicorn بيعيد لوحده.",
          deep: {
            why: "كل تعديل تقفل السيرفر وتفتحه تاني: بطيء ومملّ. و --reload بيعمل ده لوحده، و FastAPI بيديك صفحة تجرّب فيها الـ API من غير Postman.",
            how: R`أصغر تطبيق: [[from fastapi import FastAPI]] وبعدين [[app = FastAPI()]] وبعدين دالة فوقها [[@app.get("/health")]] بترجّع dict، و FastAPI بيحوّله JSON.

[[app.main:app]]: قبل النقطتين مسار الموديول بنقط (app/main.py)، وبعدها اسم المتغير جوه الملف.

[[--reload]] بيراقب ملفات .py، وأول ما تحفظ بيعيد تشغيل السيرفر. [[uvicorn[standard] ]] بيجيب معاه watchfiles (مراقبة أسرع) و uvloop و httptools (أداء أحسن).

الافتراضي [[127.0.0.1:8000]]: جهازك بس. من موبايل أو من ويندوز لـ WSL محتاج [[--host 0.0.0.0]].

[[/docs]] صفحة Swagger بتتولد لوحدها من الكود: كل endpoint وبياناته وزرار Try it out.`,
            when: "وانت بتطوّر API بـ FastAPI.",
            mistakes: "[[--reload]] في الإنتاج: بيراقب الملفات على الفاضي وبيعيد التشغيل لو حاجة اتغيرت. وتشغّله من فولدر غلط فيطلع [[Could not import module \"app.main\"]]: شغّله من جذر المشروع. والبورت مشغول بسيرفر قديم فيطلع [[Address already in use]]."
          },
          teach: R`## الفكرة: مكتبة بتكتب بيها الـ API، وسيرفر بيشغّلها

FastAPI مش سيرفر. هي مكتبة بتكتب بيها الـ endpoints، والناتج object اسمه [[app]]. اللي بيفتح بورت ويستقبل الـ requests ويسلّمها للـ [[app]] ده هو [[uvicorn]]. فالمثال: سطّب الاتنين، شغّل، جرّب.

جربنا المثال على لينكس ([[python:3.13-slim]] في Docker) وعلى ويندوز (Python 3.14 في venv) بالنسخ المثبّتة دي بالظبط، على أصغر تطبيق:

~~~python app/main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}
~~~

ومعاه ملف [[app/__init__.py]] فاضي، عشان Python يعامل [[app]] كباكدج.

---

## ١. [[pip install "fastapi==0.115.5" "uvicorn[standard]==0.32.1"]]

### [[==0.115.5]]

[[==]] بيثبّت نسخة بعينها. من غيرها pip بيجيب آخر نسخة، ولو آخر نسخة اتغير فيها حاجة الكود بتاعك ممكن يقع بعد شهر من غير ما تغيّر فيه حرف.

### [[uvicorn[standard] ]]

الأقواس المربعة اسمها **extras**: «سطّب uvicorn ومعاه مجموعة مكتبات إضافية اسمها standard». اتسطّب معاه على لينكس:

~~~text pip list (لينكس)
httptools         0.8.0
python-dotenv     1.2.4
PyYAML            6.0.3
uvloop            0.23.0
watchfiles        1.3.0
websockets        17.2
~~~

[[watchfiles]] هي اللي بتراقب الملفات لـ [[--reload]]، و [[uvloop]] و [[httptools]] بيسرّعوا السيرفر. وعلى ويندوز نفس اللستة **من غير uvloop** (مش بيشتغل على ويندوز)، وزيادة [[colorama]] للألوان في الترمنال.

### ليه علامات التنصيص؟

في zsh (الماك) [[ [standard] ]] من غير تنصيص بيتفهم pattern للملفات ويطلع [[no matches found]]. التنصيص بيضمن إن pip ياخد الاسم زي ما هو في أي شيل.

---

## ٢. [[uvicorn app.main:app --reload]]

### [[app.main:app]]

| الحتة | معناها |
|---|---|
| [[app.main]] | الموديول: ملف [[app/main.py]]، والنقطة مكان الـ [[/]] |
| [[:]] | فاصل |
| [[app]] | اسم المتغير جوه الملف ([[app = FastAPI()]]) |

يعني «روح [[app/main.py]] وهات المتغير اللي اسمه [[app]]». والمسار بيتحسب من الفولدر اللي انت واقف فيه: لما شغّلناه من [[/]] بدل جذر المشروع طلع [[ModuleNotFoundError: No module named 'app']].

### اللوج وانت بتشغّل

~~~text الناتج (ويندوز)
INFO:     Will watch for changes in these directories: ['C:\\Users\\ali\\proj']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [42776] using WatchFiles
INFO:     Started server process [43892]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
~~~

سطر بسطر:

- **Will watch**: الفولدر اللي [[--reload]] بيراقبه، وهو الفولدر الحالي.
- **[[127.0.0.1:8000]]**: الافتراضي. [[127.0.0.1]] يعني الجهاز ده بس (localhost)، و 8000 البورت. أي جهاز تاني على الشبكة مش هيوصل، ودي حاجة كويسة وانت بتطوّر.
- **reloader process** و **server process**: مع [[--reload]] فيه بروسيسين. الأول بيراقب الملفات بس، والتاني هو اللي بيرد على الـ requests. الرقم بين القوسين PID (رقم البروسيس في نظام التشغيل).
- **startup complete**: التطبيق جاهز.

### إيه اللي بيحصل لما تحفظ

عدّلنا الرد لـ [[{"ok": True, "v": 2}]] وحفظنا. على لينكس:

~~~text الناتج
WARNING:  WatchFiles detected changes in 'app/main.py'. Reloading...
INFO:     Shutting down
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [378]
INFO:     Started server process [384]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
~~~

الـ reloader قفل بروسيس السيرفر القديم (378) وفتح واحد جديد (384) بالكود الجديد. وبعدها [[curl]] رجّع [[{"ok":true,"v":2}]].

---

## ٣. [[--port 8001]]

نفس الكلام على بورت تاني. مفيد لو 8000 مشغول بمشروع تاني، أو عايز تشغّل نسختين. جربنا نشغّل سيرفر تاني على 8000 وهو مشغول:

~~~text الناتج (لينكس)
ERROR:    [Errno 98] error while attempting to bind on address ('127.0.0.1', 8000): address already in use
~~~

bind يعني «احجز البورت ده». بورت واحد ميتحجزش لبروسيسين. على 8001 اشتغل ورد عادي.

> وعلى ويندوز خد بالك: لو فضل بروسيس سيرفر قديم شغال في الخلفية، ممكن يفضل هو اللي بيرد على البورت ده، وتفتكر إن تعديلك ما اشتغلش. لو الرد مش بيتغير، اقفل السيرفر بـ Ctrl+C واتأكد إن مفيش واحد قديم قبل ما تشغّل تاني.

---

## ٤. [[curl -s localhost:8000/health]]

[[curl]] بيبعت HTTP request ويطبع الرد. [[-s]] (silent) بيشيل شريط التقدم. ومن غير [[http://]] curl بيفترضها لوحده.

~~~text الناتج
{"ok":true}
~~~

FastAPI حوّل الـ dict بتاع Python لـ JSON: [[True]] بقت [[true]]، والمسافات اتشالت. واللوج بيسجّل كل request:

~~~text الناتج
INFO:     127.0.0.1:54436 - "GET /health HTTP/1.1" 200 OK
~~~

مين طلب (العنوان والبورت بتاعه)، والـ method والمسار، والـ status (200 يعني تمام).

### على ويندوز

| الشيل | اكتب |
|---|---|
| PowerShell 7 | [[curl -s localhost:8000/health]] (curl الحقيقي) |
| Windows PowerShell 5.1 | [[curl.exe -s localhost:8000/health]] |
| CMD | [[curl -s localhost:8000/health]] |

في 5.1 كلمة [[curl]] اختصار لـ [[Invoke-WebRequest]]، وجربناها:

~~~text الناتج (PowerShell 5.1)
Invoke-WebRequest : Cannot process command because of one or more missing mandatory parameters: Uri.
~~~

---

## ٥. [[/docs]]

السطر الأخير comment بس: افتح [[http://localhost:8000/docs]] في المتصفح. FastAPI بيبني الصفحة دي لوحده (Swagger UI) من الكود: كل endpoint، وبياخد إيه، وزرار Try it out. جربنا [[curl]] عليها رجّع [[200 text/html]]، والوصف اللي الصفحة بتقراه موجود في [[/openapi.json]]:

~~~text الناتج (أوله)
{"openapi":"3.1.0","info":{"title":"FastAPI","version":"0.1.0"},"paths":{"/health":{"get":{...
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[pip install "fastapi==..." "uvicorn[standard]==..."]] | المكتبة والسيرفر بنسخ ثابتة، ومعاه watchfiles لـ reload |
| [[uvicorn app.main:app]] | شغّل المتغير [[app]] اللي في [[app/main.py]] |
| [[--reload]] | أعد التشغيل مع كل حفظ (للتطوير بس) |
| [[--port 8001]] | بورت تاني |
| [[curl -s localhost:8000/health]] | جرّب endpoint |
| [[/docs]] | صفحة تجرّب منها الـ API |

- شغّله من جذر المشروع، وإلا [[No module named 'app']].
- الافتراضي [[127.0.0.1]]: جهازك بس.
- [[--reload]] مكانه جهازك، مش الإنتاج.`,
          lines: [
            "سطّب FastAPI و uvicorn بنسخ ثابتة.",
            "شغّل مع إعادة تشغيل تلقائية مع كل حفظ.",
            "على بورت تاني.",
            "جرّب endpoint."
          ],
          sol: R`[[curl -s localhost:8000/health]] بيرجع [[{"ok":true}]] (JSON بيكتب [[true]] مش [[True]]). لما تعدّل الرد وتحفظ، اللوج بيطبع:

[[WARNING:  WatchFiles detected changes in 'app/main.py'. Reloading...]]
وبعدها [[Started server process [...]]] و [[Application startup complete.]]

والـ curl التاني بيرجع الرد الجديد. جربتها على لينكس بالنسخ المثبّتة دي وبآخر نسخة (uvicorn 0.54) وده اللي حصل بالظبط.

وعلى ويندوز (Python 3.14 في PowerShell 7) نفس الكلام، والنسخ المثبّتة اتسطبت عادي. الفرق إن اللوج بيكتب المسار [['app\main.py']]. وفي Windows PowerShell 5.1 اكتب [[curl.exe -s localhost:8000/health]]، لأن [[curl]] هناك اختصار لـ Invoke-WebRequest وبيطلع [[Cannot process command because of one or more missing mandatory parameters: Uri]].

لو ما عملش reload: انت شغّله من غير [[--reload]]، أو الملف بره الفولدر اللي بيراقبه (أول سطر في اللوج [[Will watch for changes in these directories]]). ولو طلع [[Error loading ASGI app. Could not import module "app.main"]] يبقى انت مش واقف في الفولدر اللي فيه [[app/]]. وافتح [[/docs]] هتلاقي [[/health]] ظاهر لوحده.`,
          solCode: R`# app/main.py  (plus an empty app/__init__.py)
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}`
        },
        {
          cmd: "python3 - <<'PY'",
          title: "Python جوه سكربت bash",
          desc: "في سكربت bash محتاج تكتب JSON من متغيرات بيئة. بـ echo هيبوظ مع أول علامة تنصيص في القيمة. [[python3 -]] بيقرا البرنامج من الـ stdin، والـ heredoc بيدّيهوله، و [[json.dump]] بيعمل JSON سليم دايمًا.\n\nالـ heredoc ده bash (لينكس وماك و WSL و Git Bash). في PowerShell نفس الفكرة بـ here-string: النص بين [[@'...'@]] بيتبعت لـ [[python -]] بـ pipe، والنسخة الكاملة في الحل.",
          example: R`OUT=creds.json
python3 - "$OUT" <<'PY'
import json, os, sys
creds = [{"name": "internal", "value": "Bearer " + os.environ["INTERNAL_TOKEN"]}]
json.dump(creds, open(sys.argv[1], "w"), indent=2)
PY`,
          try: "اعمل [[export INTERNAL_TOKEN='ab\"c']] (فيها علامة تنصيص) وشغّل السكربت، وشوف الـ JSON سليم. وجرّب تعمله بـ echo وشوف الفرق. ولو على ويندوز، جرّب نسخة PowerShell اللي في الحل.",
          flag: "script",
          deep: {
            why: "JSON بـ [[echo \"{\\\"token\\\": \\\"$TOKEN\\\"}\"]] بيبوظ لو التوكن فيه علامة تنصيص أو backslash أو سطر جديد. Python بيعمل escape صح لوحده.",
            how: R`[[python3 -]]: الشرطة معناها «اقرا الكود من الـ stdin». وأي حاجة بعدها ([["$OUT"]]) بتوصل لـ [[sys.argv[1] ]].

[[<<'PY']] heredoc: كل السطور لحد سطر [[PY]] بتروح للـ stdin. علامات التنصيص حوالين PY مهمة: الشيل مش هيفك أي [[$]] جوه، فالكود بيوصل Python زي ما كتبته بالظبط.

المتغيرات بتعدّي بطريقتين: argument ([[sys.argv]]) أو متغير بيئة ([[os.environ]]). المتغير لازم يبقى [[export]]، وإلا Python مش هيشوفه.

[[json.dump(..., indent=2)]] بيكتب JSON منسّق وبيعمل escape لأي حرف محتاجه.

البديل من غير Python: [[jq -n --arg t "$TOKEN" '{value: $t}']]، بس Python غالبًا موجود على أي سيرفر.`,
            when: "سكربت bash محتاج يبني JSON أو يعمل حسبة أو يقرا YAML، والـ bash لوحده هيبقى معقد.",
            mistakes: R`[[<<PY]] من غير علامات تنصيص: الشيل بيفك [[$]] جوه كود Python ويبوّظه. والمتغير مش متعمله export فيطلع [[KeyError: 'INTERNAL_TOKEN']]. وسطور الكود جوه الـ heredoc متزاحة بمسافات عشان «شكلها أحلى» فيطلع [[IndentationError]]: Python محتاج الكود يبدأ من أول السطر.`
          },
          teach: R`## الفكرة: سكربت bash بيستلف Python عشان يكتب JSON صح

bash شاطر في تشغيل الأوامر، ووحش في بناء JSON. فبدل ما تلزّق النص بإيدك، بتكتب كام سطر Python **جوه** سكربت الـ bash نفسه، و Python هو اللي يكتب الملف. المثال فيه ٣ حاجات: متغير shell، وأمر [[python3 -]]، وheredoc فيه الكود.

جربناه على لينكس ([[ubuntu:24.04]] في Docker، Python 3.12.3) بـ [[INTERNAL_TOKEN='ab"c']]، يعني قيمة فيها علامة تنصيص عن قصد.

---

## ١. [[OUT=creds.json]]

متغير shell عادي اسمه [[OUT]]: اسم الملف اللي هيتكتب. مفيش مسافات حوالين [[=]] (في bash [[OUT = x]] معناها «شغّل أمر اسمه OUT»).

---

## ٢. [[python3 - "$OUT" <<'PY']]

السطر ده ٣ حتت:

### [[python3 -]]

الشرطة [[-]] مكان اسم الملف معناها «اقرا البرنامج من الـ stdin» (standard input: المدخل اللي بيتبعت للبرنامج، من الكيبورد أو من أمر تاني). يعني بدل [[python3 script.py]] الكود هييجي من تحت.

### [["$OUT"]]

أي حاجة بعد [[-]] بتوصل للكود في [[sys.argv]]. جربنا نشوفها:

~~~bash
python3 - a b <<'PY'
import sys; print(sys.argv)
PY
~~~

~~~text الناتج
['-', 'a', 'b']
~~~

[[sys.argv[0] ]] هي [[-]] نفسها، و [[sys.argv[1] ]] أول argument. فـ [["$OUT"]] بيوصل [[sys.argv[1] ]] = [[creds.json]]. وعلامات التنصيص حوالين [[$OUT]] عشان لو اسم الملف فيه مسافة يفضل argument واحد.

### [[<<'PY']]

ده **heredoc**: «اعتبر السطور اللي جاية لحد سطر فيه [[PY]] لوحده هي الـ stdin بتاع الأمر». و [[PY]] مجرد كلمة بتختارها انت للنهاية.

علامات التنصيص حوالين [['PY']] أهم حتة: بتقول لـ bash «متلمسش اللي جوه». من غيرها bash بيفك أي [[$]] جوه الكود قبل ما Python يشوفه. جربنا:

~~~bash
python3 - <<PY
x = "$HOME"
print(x)
PY
~~~

~~~text الناتج
/root
~~~

[[$HOME]] اتبدّل بقيمته قبل ما Python يشتغل. هنا مفيش ضرر، بس كود فيه [[$]] لأي سبب تاني هيتبوظ.

---

## ٣. كود Python (٣ سطور)

### [[import json, os, sys]]

٣ مكتبات جاية مع Python: [[json]] للكتابة، و [[os]] لمتغيرات البيئة، و [[sys]] للـ arguments.

### [[creds = [{"name": "internal", "value": "Bearer " + os.environ["INTERNAL_TOKEN"]}] ]]

من جوه لبرة:

1. [[os.environ["INTERNAL_TOKEN"] ]]: [[os.environ]] شبه dict فيه متغيرات البيئة. بتجيب قيمة [[INTERNAL_TOKEN]]، ولو مش موجود بيرمي [[KeyError]].
2. [["Bearer " + ...]]: بيلزّق كلمة Bearer (الشكل المعتاد لتوكن في هيدر Authorization) قبل التوكن.
3. [[{"name": ..., "value": ...}]]: dict فيه مفتاحين.
4. [[[ ... ] ]]: لستة فيها الـ dict ده.

### [[json.dump(creds, open(sys.argv[1], "w"), indent=2)]]

- [[open(sys.argv[1], "w")]]: افتح [[creds.json]] للكتابة ([["w"]] = write، وبيمسح القديم).
- [[json.dump(data, file)]]: اكتب البيانات JSON في الملف.
- [[indent=2]]: كل مستوى متزاح مسافتين، عشان يتقري.

### [[PY]]

نهاية الـ heredoc. لازم يبقى لوحده في أول السطر.

---

## الناتج

~~~text cat creds.json
[
  {
    "name": "internal",
    "value": "Bearer ab\"c"
  }
]
~~~

شوف [[ab\"c]]: [[json.dump]] حط [[\]] قبل علامة التنصيص لوحده (ده اسمه escape)، فالـ JSON سليم. و [[python3 -m json.tool creds.json]] قراه من غير مشاكل.

وقارن بـ [[echo]]:

~~~bash
echo "[{\"name\":\"internal\",\"value\":\"Bearer $INTERNAL_TOKEN\"}]" > bad.json
python3 -m json.tool bad.json
~~~

~~~text الناتج
Expecting ',' delimiter: line 1 column 40 (char 39)
~~~

الملف طلع [[[{"name":"internal","value":"Bearer ab"c"}] ]]: علامة التنصيص اللي جوه التوكن قفلت النص بدري، والـ JSON اتكسر.

---

## الأخطاء اللي جربناها

| عملت إيه | طلع إيه | ليه |
|---|---|---|
| [[TOK=x]] من غير [[export]] | Python شاف [[None]] | المتغير للشيل بس، مش للبرامج اللي بيشغّلها |
| المتغير مش موجود خالص | [[KeyError: 'INTERNAL_TOKEN']] | [[os.environ[...] ]] بيقع لو مش لاقي |
| سطر الكود متزاح بمسافات | [[IndentationError: unexpected indent]] | Python محتاج أول سطر يبدأ من أول العمود |
| [[<<PY]] من غير تنصيص | [[$]] اتفك قبل Python | bash بيفك المتغيرات في heredoc مش متنصّص |

[[export INTERNAL_TOKEN]] هو اللي بيخلي المتغير يتورّث للبرامج اللي بتشغّلها، ومنها [[python3]].

---

## نفس الفكرة في PowerShell

الحل فيه نسخة PowerShell، وجربناها في PowerShell 7 و Windows PowerShell 5.1 (بـ Python 3.14) وطلّعت نفس الملف بالظبط:

| bash | PowerShell | بيعمل إيه |
|---|---|---|
| [[export INTERNAL_TOKEN='ab"c']] | [[$env:INTERNAL_TOKEN = 'ab"c']] | متغير بيئة |
| [[<<'PY']] ... [[PY]] | [[@']] ... [['@]] | نص على كذا سطر من غير فك متغيرات |
| الـ heredoc بيروح للـ stdin | [[| python - creds.json]] | الـ pipe بيبعت النص للـ stdin |
| [[python3]] | [[python]] | اسم Python المعتاد على كل نظام |

والـ here-string ليه قاعدة زي [[PY]]: سطر [['@]] اللي بيقفله لازم يبقى في أول السطر.

## الخلاصة

- [[python3 -]] يقرا الكود من الـ stdin، والـ arguments بعد [[-]] بتوصل [[sys.argv[1] ]] وما بعده.
- [[<<'PY']] بعلامات تنصيص: الكود يوصل Python زي ما هو.
- القيم بتعدّي يا arguments يا متغيرات بيئة متعملها [[export]].
- أي JSON فيه قيم من بره: خلّي [[json.dump]] يكتبه، متبنيهوش بـ [[echo]].`,
          lines: [
            "اسم الملف اللي هيتكتب.",
            "شغّل Python من الـ stdin، وادّيله اسم الملف كـ argument.",
            "المكتبات.",
            "البيانات، والتوكن من متغير بيئة.",
            "اكتبها JSON سليم في الملف.",
            "نهاية كود Python."
          ],
          sol: R`جربتها بـ [[INTERNAL_TOKEN='ab"c']] والـ [[creds.json]] طلع سليم، و [[json.dump]] هرّب علامة التنصيص لوحده:

[[    "value": "Bearer ab\"c"]]

و [[python3 -m json.tool creds.json]] قراه من غير مشاكل. أما بـ echo:

[[echo "[{\"name\":\"internal\",\"value\":\"Bearer $INTERNAL_TOKEN\"}]" > bad.json]]

طلع [[[{"name":"internal","value":"Bearer ab"c"}]]] وده JSON مكسور، و json.tool قال [[Expecting ',' delimiter: line 1 column 40 (char 39)]].

وعلامات التنصيص حوالين [[<<'PY']] مهمة: بتمنع bash إنه يغيّر [[$]] أو [[$__bt]] جوه كود Python. ولو نسيت تعمل [[export]] هيطلع [[KeyError: 'INTERNAL_TOKEN']].

ونسخة PowerShell (تحت) جربتها في PowerShell 7 و 5.1 وطلّعت نفس [[creds.json]] بالظبط. الـ here-string بعلامة تنصيص مفردة [[@'...'@]] زي [[<<'PY']]: PowerShell مش بيفك أي [[$]] جواه. وسطر [['@]] اللي بيقفله لازم يبقى في أول السطر.`,
          solCode: R`# Windows (PowerShell):
$env:INTERNAL_TOKEN = 'ab"c'
@'
import json, os, sys
creds = [{"name": "internal", "value": "Bearer " + os.environ["INTERNAL_TOKEN"]}]
json.dump(creds, open(sys.argv[1], "w"), indent=2)
'@ | python - creds.json
Get-Content creds.json`
        }
      ]
    }
]);
