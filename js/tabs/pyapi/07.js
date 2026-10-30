// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Modules والمشروع",
      l: 1,
      time: R`حوالي ٤ ساعات (درسين)`,
      goal: [
        R`تفهم Python بيلاقي الملف إزاي ([[sys.modules]] و [[sys.path]])، وتختار بين الـ import المطلق والنسبي، وتعرف كل خطأ import بيقول إيه.`,
        R`تبني package فيه [[__init__.py]] بيعمل re-export و [[__all__]]، و [[__main__.py]] بيشتغل بـ [[python -m]]، وتحمّل plugins بـ [[importlib]] بأمان.`,
        R`تعمل مشروع بـ uv: [[pyproject.toml]] و [[uv.lock]] و [[.venv]]، ومجموعات dev، وتشغّل في CI بـ [[uv sync --locked]].`,
        R`تحوّل أداة لأمر حقيقي بـ [[[project.scripts]]]، وتبنيها wheel بـ [[uv build]] وتسطّبها على جهاز تاني.`,
      ],
      use: {
        prog: R`أي مشروع أكبر من ملف واحد بيتقسم packages، و [[ModuleNotFoundError]] والـ circular import أول حاجتين هتقابلهم. الفهم هنا بيوفّر ساعات في كل مشروع FastAPI أو Django.`,
        work: R`«شغال عندي ومش شغال على السيرفر» نصها نسخ مكتبات مختلفة. الـ lock و [[sync --locked]] بيقفلوا الباب ده، والـ entry point بيخلّي أداتك تتسطّب بأمر واحد عند أي زميل.`,
        cs: R`[[sys.modules]] cache، والـ import هو تنفيذ الملف مرة واحدة وتخزين النتيجة. ومشكلة حل النسخ (dependency resolution) مسألة SAT صعبة، وده ليه الـ lock موجود: بتتحل مرة وتتحفظ.`,
      },
      projects: [
        { lvl: 'صغير', t: R`سكربت بيعرف هو اتشغّل إزاي`, what: R`[[where.py]] بيطبع [[__name__]] و [[__file__]] وأول ٣ عناصر في [[sys.path]] و [[sys.executable]]. شغّله مباشرة، وبـ [[python -m]]، وبـ [[uv run]]، ومن ملف تاني بـ import. من درس «import و packages».`, done: R`عندك جدول بالـ ٤ طرق وقيم كل واحدة، و [[__name__]] بـ [[__main__]] في التلاتة الأولى بس، و [[sys.executable]] مع [[uv run]] بيشاور على [[.venv]].` },
        { lvl: 'صغير', t: R`مشروع uv نضيف`, what: R`[[uv init]] لمشروع، وثبّت 3.14، وضيف مكتبة ومجموعة dev فيها pytest و ruff، وملف اختبار واحد، و [[uv run ruff check]] و [[uv run pytest]]. من درس «uv و pyproject.toml».`, done: R`امسح [[.venv]] و [[uv sync --locked]] بيرجّعه، والاتنين بيعدّوا، و [[git status]] مفيهوش [[.venv]]، و [[uv.lock]] متعمله commit.` },
        { lvl: 'متوسط', t: R`package أدوات نصوص`, what: R`package [[arabic_text]] فيه موديولات ([[normalize]] للهمزات والتشكيل والتطويل، و [[numbers]] بتحوّل الأرقام العربي لإنجليزي، و [[slug]])، و [[__init__.py]] بـ [[__all__]] و re-exports، و [[__main__.py]] بيقرا نص من argument ويطبع النتيجة. من الدرسين.`, done: R`[[python -m arabic_text "أَحْمَـــد ٢٠٢٦"]] بيطبع [[احمد 2026]]، و [[from arabic_text import *]] بيجيب الدوال العامة بس، و ٨ اختبارات pytest بتعدّي، والمشروع بيتعمل [[uv build]] من غير warnings.` },
        { lvl: 'متوسط', t: R`plugins بـ importlib`, what: R`أداة [[convert]] بتلاقي المحوّلات في [[converters/]] (كل ملف فيه [[NAME]] و [[convert(text)]])، وبتختار واحد من argument، وفيه allowlist من ملف config. من درس «import و packages».`, done: R`إضافة محوّل جديد بملف واحد بيشتغل من غير تعديل الكود، والاسم الغلط بيطلع رسالة فيها الأسامي المتاحة، ومحوّل فيه syntax error مبيوقّعش الباقي (بيتطبع تحذير)، واسم برّه الـ allowlist مبيتحمّلش.` },
        { lvl: 'كبير', t: R`أداة CLI حقيقية بتتسطّب`, what: R`مشروع [[uv init --package]] بأمر [[shoptools]] في [[[project.scripts]]]، فيه أوامر فرعية كل واحد موديول لوحده ([[price]] لحساب الضريبة، و [[invoice]] بيطبع فاتورة من بيانات في الكود) بيتحمّلوا بـ [[importlib]]، و [[--version]] من [[__version__]]، و [[main(argv)]] قابلة للاختبار، وأكواد خروج (٠ نجاح، ٢ استخدام غلط)، و pytest و ruff و mypy في مجموعة dev، وكل حاجة بتعدّي بـ [[uv sync --locked]]. من الوحدة دي ووحدة Classes.`, done: R`[[uv build]] بيطلّع wheel، و [[uv tool install]] منه بيخلي [[shoptools --version]] يشتغل من أي فولدر، و [[shoptools nope]] بيطبع الأوامر المتاحة ويخرج بـ ٢، و ١٠ اختبارات بتنادي [[main([...])]] مباشرة وبتعدّي، و [[uv run mypy --strict src]] نضيف، وأي حد بيعمل clone و [[uv sync --locked]] بيشغّله من غير ولا خطوة تانية.`, ext: R`لما توصل لـ «argparse و typer» حوّل الأوامر لـ typer، وزوّد [[uvx]] تشغيل من غير تسطيب، و GitHub Action بيعمل build على كل tag.` },
        { lvl: 'فكرة', t: R`مكتبة صغيرة ليك انت`, what: R`فكّر في حاجة بتكتبها في كل مشروع (لوج، أو قراية إعدادات، أو تنسيق فلوس) وحوّلها package مستقل بنسخ ([[0.1.0]] ثم [[0.2.0]])، وكل مشروع بيضيفها بـ [[uv add ../mylib]] (مسار) أو من git.`, done: R`مشروعين مختلفين بيستخدموا نفس الـ package، وتغيير في المكتبة بيوصل للاتنين بعد [[uv lock --upgrade-package]]، وفيه CHANGELOG بيقول إيه اتغيّر في كل نسخة.`, ext: R`انشرها على TestPyPI بـ [[uv publish]]، وزوّد type hints كاملة وملف [[py.typed]] عشان mypy عند اللي بيستخدمها يفحصها.` },
      ],
      n: "import بيدوّر فين، و __name__، وشكل المشروع، و pyproject.toml و uv",
      items: [
        {
          cmd: "import و packages",
          title: "import بيلاقي الملف إزاي، وإيه __name__؟",
          desc: R`كل ملف .py هو module، والفولدر اللي فيه ملفات (ومعاه [[__init__.py]]) package. و [[from app.db import pool]] بيدوّر على [[app/db.py]] في [[sys.path]]، وأول مكان فيه فولدر السكربت اللي شغّلته (أو الفولدر الحالي مع [[python -m]]).

الـ module بيتنفّذ مرة واحدة أول ما حد يعمله import، وبعدين بيتخزن في [[sys.modules]]. و [[if __name__ == "__main__":]] بيشغّل كود لما الملف يتشغّل مباشرة بس، مش لما يتعمله import. وتفاصيل [[python -m]] في تاب Python.`,
          example: R`# app/
#   __init__.py
#   main.py
#   config.py
#   db.py
#   routers/__init__.py
#   routers/users.py
# app/routers/users.py:
from fastapi import APIRouter
from app.db import get_pool
from ..config import settings
router = APIRouter()
def main() -> None:
    print("seeding...", settings.env)
if __name__ == "__main__":
    main()`,
          try: R`اعمل ملف [[a.py]] فيه [[print(__name__)]]، وشغّله مباشرة ([[python a.py]])، وبعدين من ملف تاني اعمل [[import a]]. شوف الاسم اتغير لإيه.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة الترتيب اللي Python بيدوّر بيه لما تكتب [[import x]] ([[sys.modules]] ثم [[sys.path]] وأوله إيه)، والفرق بين [[from app.db import x]] و [[from .db import x]]، وإمتى كل واحد بيقع.`, done: R`كاتب: [[sys.modules]] الأول، وبعدين [[sys.path]] اللي أوله فولدر السكربت أو الفولدر الحالي مع [[-m]]، وإن المطلق بيقع لو الجذر مش في [[sys.path]] والنسبي بيقع لو الملف اتشغّل بمساره، وطبعت [[sys.path]] بنفسك وأكدت أول عنصر.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[counter.py]] فيه [[print("loading")]] و [[count = 0]] و [[def inc(): global count; count += 1]]. في ملف تاني: [[import counter; import counter; from counter import count; counter.inc(); print(count, counter.count)]]. اكتب الناتج قبل ما تشغّل.`, done: R`[[loading]] اتطبعت **مرة واحدة** (الـ import التاني من [[sys.modules]])، والسطر الأخير [[0 1]]: [[from counter import count]] خد نسخة من الاسم وقت الـ import، و [[counter.count]] بيقرا القيمة الحالية. وشغّلته وطابق.` },
            { lvl: 'تطبيق', t: R`**صلّح:** مشروع فيه [[app/__init__.py]] و [[app/config.py]] و [[app/tools/seed.py]] اللي أوله [[from ..config import settings]]. [[python app/tools/seed.py]] بيقع. صلّح طريقة التشغيل من غير ما تغيّر الـ import، وبعدين اعمل ملف تاني اسمه [[random.py]] جنب السكربت وشوف الرسالة.`, done: R`[[python -m app.tools.seed]] من الجذر شغال (ومحتاج [[app/tools/__init__.py]]، وكاتب ليه)، وملف [[random.py]] طلّع رسالة [[consider renaming]] وشلته والسكربت رجع يشتغل.` },
            { lvl: 'تطبيق', t: R`**ابني:** package [[textkit]] فيه [[clean.py]] ([[normalize_spaces]] و [[_strip_tatweel]]) و [[count.py]] ([[word_count]])، و [[__init__.py]] بيعمل re-export للدالتين العامين و [[__all__]] و [[__version__]]، و [[__main__.py]] بحيث [[python -m textkit "  أهلًا   يا   عالم "]] يطبع النص النضيف وعدد الكلمات.`, done: R`[[python -m textkit "  أهلًا   يا   عالم "]] بيطبع [[أهلًا يا عالم]] و [[3]]، و [[from textkit import *]] بتجيب الدالتين بس من غير [[_strip_tatweel]]، و [[python -m textkit --version]] بيطبع النسخة، وتشغيل [[__main__.py]] بمساره بيطلّع خطأ الـ relative import (متوقع).` },
            { lvl: 'تطبيق', t: R`**محاكاة plugins:** فولدر [[exporters/]] فيه [[csv_exp.py]] و [[json_exp.py]] كل واحد فيه [[NAME]] و [[def export(rows)]]. اكتب [[load_exporters()]] بتلف على ملفات الفولدر بـ [[pkgutil.iter_modules]] وتعمل [[importlib.import_module]] لكل واحد وترجّع dict من [[NAME]] للدالة، مع allowlist.`, done: R`[[load_exporters()]] بترجّع مفتاحين، وإضافة [[xml_exp.py]] جديد بيظهر من غير ما تلمس الكود، وملف من غير [[NAME]] بيتساب برسالة تحذير بدل ما يوقّع البرنامج، واسم مش في الـ allowlist مبيتعملوش import أصلًا.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل [[python -X importtime -c "import fastapi"]] (في venv فيه fastapi) و [[-c "import json"]]، ورتّب أتقل ٥ modules. وبعدين اعمل سكربت فيه [[import fastapi]] فوق ودالة [[--help]] بس، وقيس وقت [[--help]] قبل وبعد ما تنقل الـ import جوه الدالة اللي محتاجاه.`, done: R`عندك رقم الوقت الكلي لـ fastapi و json بالملي ثانية من جهازك، وأتقل ٥ modules بأسمائها، ووقت [[--help]] نزل بعد الـ lazy import (الرقمين مكتوبين قبل وبعد).` },
          ],
          deep: {
            why: R`[[ModuleNotFoundError: No module named 'app']] و circular imports من أكتر الأخطاء اللي بتضيّع وقت في مشاريع FastAPI، وسببهم دايمًا إنك مش فاهم Python بيدوّر فين.`,
            how: R`[[import x]] بيدوّر في [[sys.modules]] الأول (لو اتعمله import قبل كده بيرجعه على طول)، وبعدين في [[sys.path]] بالترتيب: فولدر السكربت (أو الفولدر الحالي مع [[-m]])، وبعدين [[PYTHONPATH]]، وبعدين المكتبة الأساسية و site-packages بتاعة الـ venv.

الـ import بينفّذ الـ module كله من فوق لتحت. فأي كود على المستوى الأعلى (اتصال بقاعدة، قراية ملف) بيشتغل أول ما حد يعمل import. عشان كده الحاجات التقيلة مكانها [[lifespan]] أو دالة، مش على مستوى الملف.

[[from ..config import settings]] import نسبي: نقطة يعني نفس الـ package، ونقطتين اللي فوقه. بيشتغل بس لو الملف اتحمّل كجزء من package (بـ [[-m]] أو import)، مش لو شغّلته كسكربت مباشرة.

الـ circular import: [[a.py]] بيعمل import من [[b.py]] و [[b.py]] بيعمل import من [[a.py]]، فواحد فيهم بيتقري وهو لسه متنفّذش كله ([[ImportError: cannot import name ... (most likely due to a circular import)]]). الحل: انقل الحاجة المشتركة لـ module تالت، أو اعمل الـ import جوه الدالة.

و [[__init__.py]] بقى اختياري من Python 3.3 (namespace packages)، بس خليه موجود: الأدوات (pytest و mypy) بتتعامل أحسن مع packages عادية.`,
            when: R`من أول يوم في أي مشروع أكبر من ملف واحد. شغّل دايمًا من جذر المشروع بـ [[python -m app.x]] أو [[fastapi dev]]، واستخدم imports مطلقة من اسم الـ package ([[from app.db import ...]]).`,
            mistakes: R`ملف اسمه [[fastapi.py]] أو [[redis.py]] أو [[json.py]] في مشروعك: بيغطي على المكتبة الحقيقية. و [[from module import *]]: مش عارف الأسماء جاية منين. و [[sys.path.append("..")]] عشان تصلّح import: بيشتغل عندك ويقع على السيرفر.`
          },
          teach: R`## المثال بيعمل إيه؟

المثال مش سكربت بيطبع حاجة كبيرة، هو **شكل مشروع** وملف واحد جواه ([[app/routers/users.py]]) فيه ٣ أنواع import وسطرين [[if __name__]] في الآخر. عشان نشغّله بجد عملنا نفس الفولدرات في فولدر تجربة، وحطينا في [[config.py]] object بسيط اسمه [[settings]]، وفي [[db.py]] دالة [[get_pool]]، وعملنا venv فيه fastapi. اتشغّل على ويندوز بـ Python 3.14.3، والـ circular import في الآخر اتجرّب كمان على لينكس في Docker ([[python:3.13-slim]]).

---

## ١. شكل المشروع (أول ٧ سطور)

~~~text شجرة المشروع
app/                  package: فولدر فيه __init__.py
  __init__.py         ملف فاضي، بيقول «الفولدر ده package»
  main.py
  config.py           module اسمه app.config
  db.py               module اسمه app.db
  routers/            package جوه package
    __init__.py
    users.py          module اسمه app.routers.users
~~~

- **module** = أي ملف [[.py]]، واسمه هو اسم الملف من غير [[.py]].
- **package** = فولدر فيه modules (ومعاه [[__init__.py]]). واسم الـ module جوه package بيتكتب بالنقط: [[app/routers/users.py]] اسمه [[app.routers.users]]. النقطة هنا شغالة زي [[/]] في المسار.
- السطور دي في المثال كلها تعليقات [[#]]، Python مبيعملش بيها حاجة، هي رسم للفولدرات بس.

---

## ٢. [[from fastapi import APIRouter]]

[[from X import Y]] معناها: «هات الـ module اللي اسمه X، وخد منه الاسم Y بس وحطه عندي». بعدها تكتب [[APIRouter]] على طول من غير [[fastapi.APIRouter]].

طيب Python بيلاقي [[fastapi]] فين؟ بيدوّر بالترتيب:

1. [[sys.modules]]: dict فيه كل module اتعمله import قبل كده في البرنامج ده. لو لقاه بيرجّعه على طول.
2. [[sys.path]]: list فولدرات بيدوّر فيها واحد واحد. أولها فولدر السكربت، وبعده [[PYTHONPATH]] لو متعرّف، وبعده المكتبة الأساسية، وفي الآخر [[site-packages]] بتاعة الـ venv، وهناك fastapi متسطّبة.

~~~powershell
python -c "import sys; print(repr(sys.path[0]))"
~~~

~~~text الناتج
''
~~~

مع [[-c]] أول عنصر [['']]، يعني «الفولدر الحالي». ومع [[python file.py]] بيبقى فولدر الملف نفسه، ومع [[python -m]] الفولدر الحالي. الفرق ده هو كل حكاية الخطوة الجاية.

---

## ٣. [[from app.db import get_pool]]: import مطلق

مطلق (absolute) يعني مكتوب من اسم الـ package من فوق خالص: [[app]] وبعدين [[db]]. عشان يشتغل لازم الفولدر اللي **فيه** [[app/]] (جذر المشروع) يبقى في [[sys.path]]. وده بيحدد إزاي تشغّل الملف:

~~~powershell
python -m app.routers.users
~~~

~~~text الناتج
config.py runs
seeding... dev
~~~

(السطر الأول من [[print]] حطيناه في أول [[config.py]] عشان نشوف إمتى بيتنفّذ.)

[[-m]] اختصار module: «شغّل الـ module ده باسمه». Python بيحط الفولدر الحالي (جذر المشروع) في أول [[sys.path]]، فـ [[app]] بيتلاقي. أما لو شغّلته بمسار الملف:

~~~powershell
python app/routers/users.py
~~~

~~~text الناتج (آخر سطرين)
    from app.db import get_pool
ModuleNotFoundError: No module named 'app'
~~~

ليه؟ لأن أول [[sys.path]] بقى فولدر الملف نفسه ([[app/routers/]])، ومفيش جواه فولدر اسمه [[app]]. نفس الكود بالظبط، والفرق طريقة التشغيل بس.

---

## ٤. [[from ..config import settings]]: import نسبي

النقط في الأول معناها «نسبةً لمكاني أنا»:

| الكتابة | معناها هنا | يعني الملف |
|---|---|---|
| [[from .x import ...]] | نفس الـ package ([[app.routers]]) | [[app/routers/x.py]] |
| [[from ..config import ...]] | الـ package اللي فوقه ([[app]]) | [[app/config.py]] |

ده بيشتغل بس لو Python عارف الملف ده جزء من أنهي package، يعني اتحمّل بـ [[-m]] أو اتعمله import. عملنا ملف [[app/routers/rel.py]] فيه السطر ده و [[print(settings.env)]] بس، وشغّلناه بمساره:

~~~text الناتج: python app/routers/rel.py
ImportError: attempted relative import with no known parent package
~~~

و [[python -m app.routers.rel]] اشتغل وطبع [[dev]]. عشان كده الـ deep بينصحك بالـ imports المطلقة: أوضح، ومبتفرقش معاها مكان الملف.

---

## ٥. [[router = APIRouter()]]: كود على مستوى الـ module

أي سطر مش جوه دالة بيتنفّذ **ساعة الـ import**، مرة واحدة. ده اللي خلّى [[config.py runs]] يتطبع قبل [[seeding...]]: لما [[users.py]] عمل import لـ [[config]]، ملف [[config.py]] اتنفّذ كله من فوق لتحت.

وبعدها الـ module بيتحفظ في [[sys.modules]]، فأي import تاني بيرجّع نفس الـ object من غير ما ينفّذ الملف تاني. يعني [[APIRouter()]] هنا بيتعمل object واحد بس، وكل ملف يكتب [[from app.routers.users import router]] بياخد نفس الـ object.

---

## ٦. [[def main() -> None:]]

- [[def]] بيعرّف دالة، و [[-> None]] type hint معناه «مبترجّعش حاجة».
- [[print("seeding...", settings.env)]]: [[settings]] هو اللي جه من config، و [[.env]] خانة جواه. و [[print]] بيحط مسافة بين الحاجتين.

الدالة كده متعرّفة بس، مش بتشتغل لوحدها. اللي بيشغّلها السطرين اللي جايين.

---

## ٧. [[if __name__ == "__main__":]]

[[__name__]] متغير Python بيحطه في كل module (الشرطتين قبل وبعد = اسم خاص بـ Python). قيمته بتتحدد من **طريقة** تحميل الملف:

| طريقة التحميل | قيمة [[__name__]] |
|---|---|
| [[python -m app.routers.users]] | [["__main__"]] |
| [[import app.routers.users]] من ملف تاني | [["app.routers.users"]] |

~~~powershell
python -c "import app.routers.users as u; print(u.__name__)"
~~~

~~~text الناتج
config.py runs
app.routers.users
~~~

مفيش [[seeding...]]: الـ if طلعت False فـ [[main()]] متنادتش. فالملف ده ينفع يبقى سكربت (seed) وفي نفس الوقت حد يعمل import للـ [[router]] بتاعه من غير ما الـ seed يشتغل.

### تجربة الـ try: [[a.py]] و [[b.py]]

~~~text الملفات
a.py:  print(__name__)
b.py:  import a
       import a
~~~

~~~text الناتج
python a.py   →  __main__
python b.py   →  a
~~~

[[b.py]] عمل import مرتين والطباعة ظهرت مرة واحدة: المرة التانية رجعت من [[sys.modules]] من غير تنفيذ.

---

## ٨. الـ circular import (اللي في الـ deep)

لو [[app/orders.py]] فيه [[from app.users import get_user]]، و [[app/users.py]] فيه [[from app.orders import create]]:

~~~text الناتج: python -m app.main
ImportError: cannot import name 'create' from partially initialized module 'app.orders' (most likely due to a circular import) (...\shop\app\orders.py)
~~~

اللي حصل بالترتيب: [[orders]] بدأ يتنفّذ، وأول سطر فيه راح يحمّل [[users]]، و [[users]] طلب [[create]] من [[orders]] اللي لسه واقف في أول سطر ومعرّفش [[create]]. و partially initialized يعني «اتنفّذ نصه».

> نفس الملفات لو في فولدر عادي جنب السكربت (مش package)، Python 3.13 و 3.14 بيطلّعوا رسالة تانية: [[cannot import name 'create' from 'orders' (consider renaming '.../orders.py' if it has the same name as a library you intended to import)]]. Python بيشك إنك عامل ملف بنفس اسم مكتبة، وده بيحصل فعلًا (ملف [[json.py]] أو [[fastapi.py]] في مشروعك). اتجرّبت على ويندوز ولينكس وطلعت نفس الرسالة. في الحالتين اقرا الـ traceback: مين بيعمل import من مين.

---

## ٩. [[__init__.py]] كواجهة: re-export و [[__all__]]

[[__init__.py]] بيتنفّذ أول ما حد يعمل import للـ package. استخدامه الأهم إنه يقرر **إيه اللي الناس تستوردوه من برّه**، فيخبّي ترتيب الملفات جوه:

~~~text شكل المشروع
shop/
  __init__.py
  __main__.py
  money.py
  payments/
    __init__.py
    cash.py
    card.py
~~~

~~~python
# shop/__init__.py
from .money import Money, fmt
__all__ = ["Money", "fmt"]
__version__ = "0.1.0"
~~~

~~~python
# shop/money.py
class Money:
    def __init__(self, cents): self.cents = cents
def fmt(m): return f"{m.cents/100:.2f} EGP"
def _helper(): return "internal"
~~~

- [[from .money import Money, fmt]] جوه [[__init__.py]] = **re-export**: اللي برّه يكتب [[from shop import Money]] بدل [[from shop.money import Money]]. ولو نقلت [[Money]] لملف تاني بعدين، بتغيّر السطر ده بس، وكود الناس مبيتكسرش.
- [[__all__]] لستة الأسامي اللي [[from shop import *]] بتجيبها. اتجرّب: بعد [[from shop import *]]، [[Money]] و [[fmt]] موجودين و [[__version__]] لأ (مش في اللستة). ومن غير [[__all__]]، النجمة بتجيب كل اسم مش بادئ بـ [[_]]، فـ [[_helper]] مبيجيش.
- [[__version__]] اتفاق: نسخة الـ package كنص.
- ولو [[__init__.py]] مش موجود خالص؟ Python 3 بيعتبر الفولدر **namespace package** وبيقبل الـ import برضه، بس مفيش مكان تحط فيه re-exports، والأدوات (pytest و mypy) ساعات بتتلخبط. حط [[__init__.py]] (ولو فاضي) في كل فولدر كود.

---

## ١٠. [[__main__.py]]: [[python -m shop]]

~~~python
# shop/__main__.py
import sys
from . import Money, fmt, __version__
def main(argv=None):
    args = sys.argv[1:] if argv is None else argv
    if args[:1] == ["--version"]:
        print(__version__); return 0
    print(fmt(Money(int(args[0]) if args else 0)))
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
~~~

~~~text الناتج (اتشغّل من الفولدر اللي فيه shop/)
> python -m shop 12550
125.50 EGP
> python -m shop --version
0.1.0
> python shop/__main__.py
ImportError: attempted relative import with no known parent package
~~~

- [[python -m shop]] بيدوّر على [[shop/__main__.py]] ويشغّله **كجزء من الـ package**، فالـ import النسبي ([[from . import]]) شغال. نفس [[python -m pip]] و [[python -m venv]] و [[python -m http.server]].
- تشغيل الملف بمساره بيشيله من الـ package، فالـ [[.]] ملهاش معنى. ده نفس الخطأ اللي في القسم ٤، وحله [[-m]] من الجذر.
- [[main(argv=None)]] بتاخد الـ arguments كباراميتر عشان تختبرها ([[main(["--version"])]]) من غير ما تلمس [[sys.argv]]. و [[raise SystemExit(main())]] بتخرج بالرقم اللي رجّعته (كود الخروج، وحدة «سكربتات وأوامر النظام»).

---

## ١١. [[importlib]]: import باسم جاي وقت التشغيل

~~~python
import importlib
for name in ["cash", "card", "crypto"]:
    try:
        mod = importlib.import_module(f"shop.payments.{name}")
        print(mod.pay(100))
    except ModuleNotFoundError as e:
        print("ModuleNotFoundError:", e)
~~~

~~~text الناتج
cash 100
card 100
ModuleNotFoundError: No module named 'shop.payments.crypto'
~~~

- [[import_module("shop.payments.cash")]] زي [[import shop.payments.cash]] بالظبط، بس الاسم **نص** ممكن ييجي من ملف إعدادات أو argument. كده بتعمل plugins: تضيف [[wallet.py]] في الفولدر ويشتغل من غير ما تلمس الكود.
- **أمان**: متبعتش اسم جاي من يوزر في API على طول. [[import_module]] بينفّذ أي كود على مستوى الـ module، فاسم زي [["os"]] أو موديول فيه side effects هيتحمّل. اعمل allowlist ([[if name not in {"cash", "card"}: raise ...]]).
- [[importlib.reload(mod)]] بتعيد تنفيذ الملف بعد ما غيّرته (في الـ REPL مثلًا)، بس الـ objects القديمة اللي اتعملت قبل كده بتفضل من الـ class القديم.

---

## ١٢. ملف اسمه زي مكتبة (shadowing)

~~~python
# shadow/random.py
import random; print(random.randint(1, 6))
~~~

~~~text الناتج: python random.py (Python 3.14)
AttributeError: module 'random' has no attribute 'randint' (consider renaming '...\shadow\random.py' since it has the same name as the standard library module named 'random' and prevents importing that standard library module)
~~~

أول مكان في [[sys.path]] فولدر السكربت، فـ [[import random]] جاب **ملفك انت** مش المكتبة. ومن 3.13 الرسالة بتقولك السبب وتقترح تغيّر الاسم (قبلها كانت [[has no attribute 'randint']] بس، وناس كتير بتقعد ساعة تدوّر). نفس الكلام لو سمّيت ملف [[json.py]] أو [[fastapi.py]] أو [[test.py]]. وامسح [[__pycache__]] بعد ما تغيّر الاسم لو لسه فيه مشاكل.

---

## ١٣. الـ import بياخد وقت قد إيه؟

~~~text الناتج: python -X importtime -c "import json" (آخر ٣ سطور)
import time:       683 |       8911 |   json.decoder
import time:       509 |        509 |   json.encoder
import time:       417 |       9835 | json
~~~

[[-X importtime]] بيطبع على stderr لكل module: الوقت بتاعه لوحده، والوقت الكلي بالـ modules اللي جواه، بالميكروثانية. يعني [[json]] كله أخد حوالي ١٠ ملي ثانية أول مرة. مفيد لما أمر CLI بياخد ثانية عشان يقوم: بتلاقي مكتبة تقيلة بتتحمّل على مستوى الـ module وانت مش محتاجها غير في أمر واحد، فتنقل الـ import جوه الدالة اللي بتستخدمها (lazy import).

## الخلاصة

| الحاجة | معناها |
|---|---|
| module و package | ملف [[.py]]، وفولدر فيه [[__init__.py]] |
| [[sys.modules]] ثم [[sys.path]] | Python بيدوّر فين، بالترتيب |
| [[from app.db import ...]] | مطلق من جذر المشروع: شغّل بـ [[python -m]] من الجذر |
| [[from ..config import ...]] | نسبي: بيشتغل بس جوه package |
| كود على مستوى الملف | بيتنفّذ مرة واحدة مع أول import |
| [[if __name__ == "__main__":]] | الكود ده للتشغيل المباشر بس |

- [[ModuleNotFoundError: No module named 'app']] غالبًا معناها إنك شغّلت الملف بمساره بدل [[python -m]] من جذر المشروع.`,
          lines: [
            R`[[fastapi]] مكتبة متسطّبة في الـ venv، مش ملف في مشروعك. Python بيلاقيها في [[site-packages]] (آخر حاجة في [[sys.path]]). لو الـ venv مش متفعّل أو المكتبة مش متسطّبة: [[ModuleNotFoundError: No module named 'fastapi']]، والحل [[uv add fastapi]] أو [[uv run]] بدل [[python]] على طول.`,
            R`**import مطلق**: المسار من جذر المشروع ([[app]] ← [[db.py]] ← [[get_pool]]). أوضح نوع، لأنك تعرف الملف فين من غير ما تحسب نقط، وبيشتغل بس لو فولدر جذر المشروع في [[sys.path]]، يعني لما تشغّل من الجذر بـ [[python -m]] أو [[uv run]].`,
            R`**import نسبي**: كل نقطة = خطوة لفوق. [[.]] الـ package الحالي ([[routers]])، و [[..]] اللي فوقه ([[app]])، فـ [[..config]] = [[app/config.py]]. شغال بس جوه package؛ لو شغّلت الملف بمساره ([[python app/routers/users.py]]) بيرمي [[ImportError: attempted relative import with no known parent package]].`,
            R`كود على مستوى الـ module (مش جوه دالة) بيتنفّذ **مرة واحدة** أول مرة حد يعمل import للملف، والنتيجة بتتخزن في [[sys.modules]]. فـ [[router]] ده object واحد مشترك: كل الملفات اللي بتعمل [[from app.routers.users import router]] بتاخد نفسه.`,
            R`[[main]] دالة فيها الشغل اللي عايزه يحصل لما الملف يتشغّل لوحده بس (هنا بنملا الداتابيز بداتا تجربة). حطها جوه دالة مش على مستوى الـ module، عشان الـ import ميشغّلهاش.`,
            R`بيطبع البيئة من الإعدادات اللي اتجابت بالـ import النسبي، عشان تعرف السكربت شغال على أنهي قاعدة. في سكربت seed حقيقي، هنا كان هيبقى إدخال صفوف تجربة.`,
            R`[[__name__]] متغير Python بيحطه في كل module: بيبقى [["__main__"]] للملف اللي اتشغّل مباشرة، واسم الـ module ([["app.routers.users"]]) لو اتعمله import. فالـ [[if]] دي بتسأل «أنا البرنامج الرئيسي؟».`,
            R`[[main()]] بتتنادى بس لما الملف يتشغّل بـ [[python -m app.routers.users]]. لما FastAPI يعمل import للملف عشان ياخد [[router]]، الشرط [[False]] ومفيش seed بيحصل بالغلط في كل مرة السيرفر يقوم.`,
          ],
          sol: R`[[python a.py]] بيطبع [[__main__]]، و [[python b.py]] (اللي فيه [[import a]]) بيطبع [[a]]. الملف اللي بتشغّله مباشرة اسمه دايمًا [[__main__]]، وأي ملف بيتعمله import بياخد اسم الـ module بتاعه (ولو جوه package هيبقى [[app.routers.users]] مثلًا).

ده بالظبط اللي بيخلي [[if __name__ == "__main__":]] تشتغل: الكود اللي جواها بيتنفذ لما تشغّل الملف بس، مش لما حد يعمله import. ولو عملت [[import a]] مرتين في نفس البرنامج هتلاقي الطباعة مرة واحدة بس، لأن Python بيحفظ الـ module في [[sys.modules]] وبيرجّعه من غير ما يشغّله تاني.`
        },
        {
          cmd: "uv و pyproject.toml",
          title: "مشروع Python حديث: pyproject.toml و uv",
          desc: R`[[pyproject.toml]] ملف المشروع الحديث: اسمه، ونسخة Python، والمكتبات، وإعدادات الأدوات (ruff و pytest و mypy و FastAPI) في ملف واحد. و [[uv]] (من Astral) أداة واحدة بتعمل شغل venv و pip و pip-tools مع بعض وأسرع بكتير: [[uv add]] بتضيف المكتبة للملف وتسطّبها وتحدّث [[uv.lock]].

venv و pip و requirements.txt بالتفصيل في تاب Python، ولسه شغالين تمام؛ و uv بديل بقى منتشر جدًا، وتوثيق FastAPI نفسه بيستخدمه.`,
          example: R`curl -LsSf https://astral.sh/uv/install.sh | sh
uv init shop-api && cd shop-api
uv python pin 3.14
uv add "fastapi[standard]" asyncpg redis
uv add --dev pytest ruff mypy
uv run fastapi dev main.py
uv sync --locked
uv export --no-hashes > requirements.txt`,
          try: R`اعمل مشروع بـ [[uv init]]، وضيف fastapi، وافتح [[pyproject.toml]] و [[uv.lock]] وشوف اتكتب فيهم إيه. وبعدين امسح [[.venv]] خالص واعمل [[uv sync]] وشوف الوقت.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الفرق بين [[pyproject.toml]] و [[uv.lock]] و [[.venv]]: إيه اللي جوه كل واحد، ومين بيكتبه، وأنهي واحد بيتعمله commit.`, done: R`كاتب: pyproject فيه النطاقات وانت (أو [[uv add]]) بتكتبه، و uv.lock فيه النسخ بالظبط و uv بيكتبه، و .venv المكتبات المتسطّبة؛ والاتنين الأولانيين commit و .venv في [[.gitignore]]، وفتحت [[.gitignore]] اللي uv عمله وأكدت.` },
            { lvl: 'تطبيق', t: R`**ابني من الصفر:** مشروع [[uv init --package]] لأداة [[wordcount]] بأمر [[wc-ar]] في [[[project.scripts]]] بتاخد اسم ملف وتطبع عدد الكلمات والسطور، و [[uv add --dev pytest]] واختبار واحد. شغّلها بـ [[uv run wc-ar file.txt]] وبعدين [[uv build]].`, done: R`[[uv run wc-ar notes.txt]] بيطبع الرقمين، و [[uv run pytest -q]] بيقول [[1 passed]]، و [[dist/]] فيه [[.whl]]، وسطّبته بـ [[uv tool install]] من الـ wheel والأمر اشتغل من فولدر تاني.` },
            { lvl: 'تطبيق', t: R`**صلّح:** في مشروع فيه [[uv.lock]]، غيّر نطاق مكتبة في [[pyproject.toml]] بإيدك من غير [[uv lock]]، وشغّل [[uv sync --locked]]. اقرا الرسالة وصلّح.`, done: R`[[uv sync --locked]] فشل برسالة [[The lockfile at $__btuv.lock$__bt needs to be updated, but $__bt--locked$__bt was provided. To update the lockfile, run $__btuv lock$__bt.]] (ده نص uv 0.10 لما غيّرت [[requires-python]] بس، اتجرّب)، و [[uv lock]] بعدها صلّحه و [[uv sync --locked]] عدّى، وكاتب ليه ده بالظبط اللي عايزه يحصل في CI.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[uv help add]] و [[uv help sync]] بس (من غير نت)، لاقي: إزاي تضيف مكتبة لمجموعة اسمها [[docs]] مش [[dev]]، وإزاي تعمل sync من غير مجموعة [[dev]]، وإزاي تشيل مكتبة.`, done: R`كاتب الـ ٣ أوامر ([[--group docs]] و [[--no-dev]] و [[uv remove]]) وجرّبتهم، و [[pyproject.toml]] بعد كل واحد اتغيّر زي ما توقعت.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** في نفس المشروع، امسح [[.venv]] وقيس [[uv sync]] (الكاش سخن)، وبعدين اعمل venv عادي بـ [[python -m venv]] و [[pip install -r requirements.txt]] من [[uv export]] وقيس. استخدم [[Measure-Command]] أو [[time]].`, done: R`عندك رقمين بالثواني من جهازك (uv و pip)، والاتنين بيشغّلوا نفس [[uv run pytest]] أو [[pytest]] بنجاح، وكاتب سبب الفرق في جملة (الكاش و الـ hardlinks والتوازي).` },
          ],
          deep: {
            why: "requirements.txt من غير lock بيطلّع نسخ مختلفة كل مرة، و pip-tools أداة زيادة، والـ venv بيتعمل بإيدك، ونسخة Python نفسها حكاية تانية (pyenv). uv بيجمعهم في أداة واحدة، وأسرع ١٠ لـ ١٠٠ مرة من pip لأنه مكتوب بـ Rust وبيعمل cache ذكي.",
            how: R`[[uv init]] بيعمل [[pyproject.toml]] و [[.python-version]] و [[main.py]]. و [[uv add pkg]] بيكتب المكتبة في [[dependencies]] بنطاق نسخ ([[>=]] آخر نسخة)، ويحل كل الـ dependencies ويكتب النسخ بالظبط في [[uv.lock]]، ويسطّب في [[.venv]]. و [[--dev]] بيحطها في مجموعة dev، ومش هتتسطّب في الإنتاج لو قلت [[--no-dev]].

[[uv run cmd]] بيتأكد إن الـ venv متزامن مع الـ lock وبعدين يشغّل الأمر جواه، فمش محتاج activate. و [[uv python pin]] بيحدد نسخة Python، و uv بينزّلها لو مش موجودة.

[[uv sync --locked]] في CI و Docker: بيسطّب من الـ lock بالظبط، ويفشل لو [[pyproject.toml]] اتغير والـ lock محدّثش. وفي الـ Dockerfile الترتيب زي pip: انسخ [[pyproject.toml]] و [[uv.lock]] الأول، و [[uv sync --locked --no-dev]]، وبعدين الكود (الـ Dockerfile الكامل بـ pip في تاب Python).

و [[uv export]] بيطلّع requirements.txt لو أداة أو منصة لسه محتاجاه.

وإعدادات الأدوات في نفس الملف: [[[tool.ruff]]] و [[[tool.pytest.ini_options]]] و [[[tool.fastapi]]].`,
            when: "أي مشروع جديد. ولو المشروع قايم على pip و requirements.txt وشغال، مفيش داعي تغيّر النهارده.",
            mistakes: R`تعمل commit لـ [[pyproject.toml]] من غير [[uv.lock]] (الـ lock لازم يتعمله commit في التطبيقات). وتخلط [[pip install]] جوه venv بتاع uv فالـ lock ميعرفش عنها حاجة. وتنسى [[--locked]] في CI فالـ lock يتحدّث هناك في صمت.`
          },
          teach: R`## المثال بيعمل إيه؟

٨ أوامر بتعمل مشروع FastAPI من الصفر بـ [[uv]]: تسطّب الأداة، وتعمل المشروع، وتختار نسخة Python، وتضيف المكتبات، وتشغّل السيرفر، وفي الآخر أمرين للـ CI والمنصات القديمة. كل الأوامر من التاني للآخر اتشغّلت على ويندوز (PowerShell 7 و Git Bash) بـ uv 0.10.7 في فولدر تجربة، والنواتج تحت حقيقية (النسخ هتختلف عندك حسب يوم التسطيب).

---

## ١. تسطيب uv

~~~bash
curl -LsSf https://astral.sh/uv/install.sh | sh
~~~

ده للينكس والماك. نفكّه:

- [[curl]] بينزّل ملف من النت. و [[-L]] اتبع أي redirect، و [[-s]] silent (من غير شريط التحميل)، و [[-S]] بس اطبع الخطأ لو حصل، و [[-f]] fail: لو السيرفر رد بخطأ متطبعش صفحة الخطأ.
- [[|]] (pipe) بيدّي اللي نزل لـ [[sh]] على طول، يعني الـ shell بينفّذ سكربت التسطيب.

على ويندوز الأمر من توثيق uv الرسمي:

~~~powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
~~~

[[irm]] (Invoke-RestMethod) بينزّل السكربت و [[iex]] (Invoke-Expression) بينفّذه. السطر ده متجرّبش هنا لأن uv كان متسطّب أصلًا، والتسطيب بيغيّر الجهاز (بيحط uv في الـ PATH). اتأكد إنه موجود بـ [[uv --version]]:

~~~text الناتج
uv 0.10.7 (08ab1a344 2026-02-27)
~~~

---

## ٢. [[uv init shop-api && cd shop-api]]

- [[uv init shop-api]]: اعمل فولدر [[shop-api]] فيه مشروع جديد.
- [[&&]]: شغّل اللي بعدها بس لو اللي قبلها نجح.
- [[cd shop-api]]: ادخل الفولدر.

~~~text الناتج
Initialized project $__bt shop-api$__bt at $__bt C:\Users\ali\...\l2\shop-api$__bt
~~~

> [[&&]] شغال في bash و PowerShell 7، لكن في Windows PowerShell 5.1 القديم بيطلّع [[The token '&&' is not a valid statement separator in this version.]]. هناك اكتبهم أمرين أو حط [[;]] بينهم.

الملفات اللي اتعملت:

~~~text الملفات
.git              uv عمل git repo كمان
.gitignore        فيه .venv وحاجات تانية متتعملهاش commit
.python-version   نسخة Python للمشروع
README.md
main.py           ملف Hello صغير
pyproject.toml    ملف المشروع
~~~

و [[pyproject.toml]] في الأول:

~~~text pyproject.toml
[project]
name = "shop-api"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = []
~~~

- [[[project]]] اسمه table في صيغة TOML (اختصار Tom's Obvious Minimal Language): عنوان بين أقواس مربعة، وتحته [[key = value]].
- [[requires-python = ">=3.12"]]: المشروع محتاج 3.12 أو أحدث. uv كتب 3.12 لأنها كانت أول نسخة لقاها هنا.
- [[dependencies = []]]: list المكتبات، فاضية لسه.

---

## ٣. [[uv python pin 3.14]]

~~~text الناتج
Updated $__bt .python-version$__bt from $__bt 3.12$__bt -> $__bt 3.14$__bt
~~~

[[pin]] يعني «ثبّت». بيكتب [[3.14]] في [[.python-version]]، فأي أمر uv في الفولدر ده بيستخدم 3.14. ولو مش متسطّبة على الجهاز uv بينزّلها لوحده (هنا كانت موجودة). الملف ده بيتعمله commit، فكل اللي في الفريق بيشتغلوا على نفس النسخة.

---

## ٤. [[uv add "fastapi[standard]" asyncpg redis]]

- [[add]]: ضيف مكتبات للمشروع.
- [["fastapi[standard]"]]: الأقواس المربعة اسمها **extras**: fastapi ومعاها مجموعة إضافات اختيارية اسمها standard (uvicorn وأمر [[fastapi]] و httpx وغيرهم). والتنصيص عشان bash ممكن يفهم [[[ ]]] كـ pattern.
- [[asyncpg]] درايفر Postgres لـ async، و [[redis]] عميل Redis.

~~~text الناتج (أوله)
Using CPython 3.14.3 interpreter at: C:\Users\ali\AppData\Local\Python\pythoncore-3.14-64\python.exe
Creating virtual environment at: .venv
Resolved 60 packages in 14.18s
Prepared 50 packages in 1m 29s
Installed 58 packages in 1.22s
 + agent-detector==2.0.0
 + annotated-doc==0.0.5
 ...
~~~

أمر واحد عمل ٣ حاجات:

| الخطوة | السطر | معناها |
|---|---|---|
| ١ | [[Creating virtual environment at: .venv]] | عمل venv جوه المشروع (أول مرة بس) |
| ٢ | [[Resolved 60 packages]] | حسب كل المكتبات اللي محتاجينها، هي واللي هي محتاجاه، ونسخة كل واحدة، وكتبهم في [[uv.lock]] |
| ٣ | [[Prepared]] ثم [[Installed 58 packages]] | نزّلهم وسطّبهم في [[.venv]] |

ليه ٦٠ و ٥٨؟ الـ ٦٠ فيهم المشروع نفسه ومكتبات لأنظمة تانية (زي مكتبة بتتسطّب على ويندوز بس أو لينكس بس)، والـ lock بيحسب حساب كل الأنظمة، والتسطيب بياخد اللي يخص الجهاز ده بس. و [[Prepared ... in 1m 29s]] هو وقت التنزيل من النت، و [[Installed ... in 1.22s]] وقت التسطيب نفسه.

---

## ٥. [[uv add --dev pytest ruff mypy]]

[[--dev]]: المكتبات دي للتطوير بس (اختبارات و linter و type checker)، مش للسيرفر. بعدها [[pyproject.toml]] بقى:

~~~text pyproject.toml (الجزء اللي اتغير)
dependencies = [
    "asyncpg>=0.32.0",
    "fastapi[standard]>=0.142.2",
    "redis>=8.1.0",
]

[dependency-groups]
dev = [
    "mypy>=2.4.0",
    "pytest>=9.1.1",
    "ruff>=0.16.10",
]
~~~

- [[>=0.142.2]]: uv كتب «النسخة دي أو أحدث»، يعني نطاق مش نسخة ثابتة.
- [[[dependency-groups]]] و [[dev = [...]]]: مجموعة منفصلة اسمها dev.

أما النسخ **بالظبط** فمكتوبة في [[uv.lock]] (١٨٤٥ سطر هنا، و ٧٠ package). ده جزء منه:

~~~text uv.lock (جزء)
name = "fastapi"
version = "0.142.2"
source = { registry = "https://pypi.org/simple" }
dependencies = [
    { name = "annotated-doc" },
    { name = "pydantic" },
    { name = "starlette" },
    ...
]
sdist = { url = "https://files.pythonhosted.org/.../fastapi-0.142.2.tar.gz", hash = "sha256:0636...2570", ... }
~~~

نسخة واحدة، ومنين جت، ومحتاجة مين، و [[hash]] بيتأكد إن الملف اللي هيتنزّل بعدين هو نفسه بالبايت. [[pyproject.toml]] انت اللي بتكتبه (أو [[uv add]])، و [[uv.lock]] uv بيكتبه لوحده ومتعدّلوش بإيدك. والاتنين يتعملهم commit.

و [[uv tree --depth 1]] بيلخّصهم:

~~~text الناتج
shop-api v0.1.0
├── asyncpg v0.32.0
├── fastapi[standard] v0.142.2
├── redis v8.1.0
├── mypy v2.4.0 (group: dev)
├── pytest v9.1.1 (group: dev)
└── ruff v0.16.10 (group: dev)
~~~

---

## ٦. [[uv run fastapi dev main.py]]

[[main.py]] اللي [[uv init]] عمله فيه print بس، فكتبنا فيه تطبيق صغير:

~~~python main.py
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home() -> dict[str, str]:
    return {"msg": "hello from shop-api"}
~~~

- [[uv run]]: «اتأكد إن [[.venv]] مطابق للـ lock، وبعدين شغّل الأمر اللي بعدي جواه». فمش محتاج [[activate]].
- [[fastapi dev]]: أمر جه مع [[fastapi[standard] ]]، بيشغّل uvicorn في وضع التطوير (بيعيد التشغيل لوحده لما تعدّل ملف).
- [[main.py]]: الملف اللي فيه [[app]].

~~~text الناتج (اتشغّل على port 8765 بـ --port 8765)
 ⚡️ Starting FastAPI in development mode
 🐍 Using import string: main:app
 🌐 Server started at http://127.0.0.1:8765
    Documentation at http://127.0.0.1:8765/docs
INFO:     Will watch for changes in these directories: ['C:\\Users\\ali\\...\\shop-api']
INFO:     Uvicorn running on http://127.0.0.1:8765 (Press CTRL+C to quit)
INFO:     Started reloader process [10440] using WatchFiles
INFO:     Started server process [47328]
INFO:     Application startup complete.
INFO:     127.0.0.1:50683 - "GET / HTTP/1.1" 200 OK
~~~

- [[main:app]]: الملف [[main]] والمتغير [[app]] جواه.
- [[127.0.0.1]] يعني الجهاز ده بس. والـ port الافتراضي 8000.
- reloader process وserver process: process بيراقب الملفات، و process تاني هو السيرفر، وكل ما تحفظ ملف الأول بيقفل التاني ويشغّله من جديد.
- السطر الأخير طلب [[GET /]] بعتناه، ورد بـ [[{"msg":"hello from shop-api"}]]. وتقفله بـ Ctrl+C.

---

## ٧. [[uv sync --locked]]

[[sync]] = «خلّي [[.venv]] مطابق للـ lock بالظبط» (يسطّب الناقص ويشيل الزيادة). و [[--locked]] = «ولو الـ lock مش متوافق مع [[pyproject.toml]] متحدّثوش، افشل».

~~~text الناتج (كل حاجة متزامنة)
Resolved 70 packages in 2ms
Audited 68 packages in 7ms
~~~

[[Audited]] يعني «راجعت ومفيش حاجة تتسطّب». وجرّبنا نضيف سطر في [[pyproject.toml]] بإيدنا ([["httpx>=0.28"]]) من غير ما نحدّث الـ lock:

~~~text الناتج
The lockfile at $__bt uv.lock$__bt needs to be updated, but $__bt --locked$__bt was provided. To update the lockfile, run $__bt uv lock$__bt.
~~~

و exit code 1. ده بالظبط اللي عايزه في CI و Docker: لو حد نسي يعمل commit للـ lock الجديد، البناء يقع بدل ما يسطّب نسخ محدش جرّبها.

### تجربة الـ try: امسح [[.venv]] واعمل [[uv sync]]

~~~text الناتج (Git Bash، بـ time)
Creating virtual environment at: .venv
Installed 68 packages in 1.47s
real    0m1.969s
~~~

حوالي ثانيتين لـ ٦٨ package (المرة الأولى أخدت دقيقة ونص تنزيل). السبب: uv عنده cache على الجهاز، فمش بينزّل تاني، وبيعمل links للملفات بدل ما ينسخها.

---

## ٨. [[uv export --no-hashes > requirements.txt]]

- [[export]]: اطبع الـ lock بصيغة requirements.txt.
- [[--no-hashes]]: من غير سطور الـ hash (أقصر، بس أقل أمان).
- [[>]]: حط الناتج في ملف بدل الشاشة.

~~~text requirements.txt (أوله)
# This file was autogenerated by uv via the following command:
#    uv export --no-hashes
agent-detector==2.0.0
    # via fastapi-cloud-cli
annotated-doc==0.0.5
    # via
    #   fastapi
    #   typer
~~~

كل مكتبة بـ [[==]] نسخة ثابتة، وتعليق [[# via]] بيقول مين جابها. خلي بالك: الملف ده طلع فيه mypy و pytest كمان، لأن [[export]] بياخد مجموعة dev افتراضيًا. للإنتاج: [[uv export --no-dev --no-hashes]] (وجربناه: مفيهوش ولا سطر mypy أو pytest).

---

## ٩. أمر بتاعك: [[[project.scripts]]] و [[uv build]]

لو مشروعك أداة (مش API)، عايز اليوزر يكتب [[shopcli]] في الترمنال مش [[python -m ...]]. ده اسمه entry point:

~~~text الناتج: uv init --package --name shopcli . (uv 0.10، ويندوز)
Initialized project $__btshopcli$__bt
~~~

~~~toml
[project]
name = "shopcli"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = []

[project.scripts]
shopcli = "shopcli:main"

[build-system]
requires = ["uv_build>=0.10.7,<0.11.0"]
build-backend = "uv_build"
~~~

(شلت سطور [[description]] و [[readme]] و [[authors]] من النسخة دي. [[authors]] uv بيملاه من إعدادات git على جهازك، فبص عليه قبل ما ترفع المشروع.)

- [[--package]] بيعمل شكل [[src/shopcli/__init__.py]] (اسمه src layout) بدل [[main.py]] في الجذر، وبيضيف [[[build-system]]]. الـ src layout بيمنع إن الاختبارات تعمل import للكود من الفولدر بدل النسخة المتسطّبة، فبتكتشف ملف ناقص من الـ package قبل ما اليوزر يكتشفه.
- [[shopcli = "shopcli:main"]]: اسم الأمر = «الموديول:الدالة». وقت التسطيب، الأداة بتعمل ملف تشغيل اسمه [[shopcli]] (على ويندوز [[.venv\Scripts\shopcli.exe]]، اتشاف فعلًا) بينادي [[main()]].

~~~text الناتج: uv run shopcli
Installed 1 package in 70ms
Hello from shopcli!
~~~

~~~text الناتج: uv build
Successfully built dist\shopcli-0.1.0.tar.gz
Successfully built dist\shopcli-0.1.0-py3-none-any.whl
~~~

- [[uv build]] بيعمل ملفين في [[dist/]]: [[.tar.gz]] (السورس) و [[.whl]] (wheel: ملف جاهز يتسطّب على طول). و [[py3-none-any]] معناها «أي Python 3، من غير كود C، على أي نظام».
- الـ wheel ده تقدر تبعته لزميل يسطّبه بـ [[uv tool install dist\shopcli-0.1.0-py3-none-any.whl]] أو [[pip install ...whl]]، أو ترفعه على PyPI بـ [[uv publish]] (من الوثائق، متجرّبش هنا).
- و [[uvx ruff check]] (اختصار [[uv tool run]]) بيشغّل أداة من PyPI في venv مؤقت من غير ما تسطّبها في مشروعك (من وثائق uv؛ متشغّلش هنا عشان محتاج نت).

| الطريقة القديمة | بـ uv | الفرق |
|---|---|---|
| [[python -m venv .venv]] ثم activate | [[uv sync]] | uv بيعمل الـ venv لوحده ومش محتاج activate |
| [[pip install x]] ثم تكتبها في [[requirements.txt]] بإيدك | [[uv add x]] | بتكتبها في pyproject وتقفلها في الـ lock وتسطّبها في خطوة |
| [[pip install -r requirements.txt]] | [[uv sync --locked]] | بيشيل الزيادة كمان، وبيفشل لو الـ lock قديم |
| [[pip install -e .]] عشان الأمر يشتغل | [[uv run shopcli]] | المشروع بيتسطّب editable لوحده أول [[uv run]] |
| [[python -m build]] | [[uv build]] | مش محتاج تسطّب [[build]] كأداة منفصلة |

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[uv init name]] | مشروع جديد: [[pyproject.toml]] و [[.python-version]] و [[main.py]] و git |
| [[uv python pin 3.14]] | نسخة Python للمشروع (وينزّلها لو ناقصة) |
| [[uv add pkg]] | اكتبها في pyproject، واقفلها في uv.lock، وسطّبها في .venv |
| [[uv add --dev pkg]] | نفس الكلام في مجموعة dev |
| [[uv run cmd]] | شغّل جوه الـ venv من غير activate |
| [[uv sync --locked]] | سطّب من الـ lock بالظبط، وافشل لو مش متزامن (CI و Docker) |
| [[uv export --no-dev]] | requirements.txt للي لسه محتاجه |

- [[pyproject.toml]] بالنطاقات ([[>=]])، و [[uv.lock]] بالنسخ بالظبط، والاتنين commit. و [[.venv]] لأ.`,
          lines: [
            R`بينزّل سكربت التسطيب الرسمي ([[curl -LsSf]]: [[-L]] يتبع الـ redirects، و [[-s]] ساكت، و [[-S]] يطبع الأخطاء برضه، و [[-f]] يفشل لو السيرفر رد بخطأ بدل ما يشغّل صفحة الخطأ كسكربت) ويبعته لـ [[sh]] يشغّله. مرة واحدة على الجهاز. على ويندوز: [[powershell -c "irm https://astral.sh/uv/install.ps1 | iex"]] أو [[winget install astral-sh.uv]].`,
            R`[[uv init shop-api]] بيعمل فولدر فيه [[pyproject.toml]] و [[.python-version]] و [[main.py]] و [[README.md]] و [[.gitignore]] ومستودع git. و [[&&]] معناها «لو نجح، ادخل الفولدر» ([[cd]]). وخلي بالك: [[uv init]] بيكتب اسمك وإيميلك من إعدادات git في [[authors]] لو عملت [[--package]].`,
            R`[[uv python pin 3.14]] بيكتب [[3.14]] في [[.python-version]]، فأي [[uv run]] أو [[uv sync]] بعد كده بيستخدم النسخة دي، ولو مش موجودة على الجهاز uv بينزّلها لوحده. ده بيخلي كل الفريق والـ CI على نفس النسخة.`,
            R`[[uv add]] بيعمل ٣ حاجات في أمر: بيكتب المكتبات في [[dependencies]] في [[pyproject.toml]] بنطاق ([[>=0.135]] مثلًا)، ويحل النسخ ويقفلها بالظبط في [[uv.lock]]، ويسطّبها في [[.venv]]. و [[[standard]]] اسمها extras: مكتبات إضافية اختيارية (uvicorn و fastapi-cli مع fastapi)، والعلامات حواليها عشان الصدفة متفهمش الأقواس.`,
            R`[[--dev]] بيحطهم في مجموعة [[dev]] تحت [[[dependency-groups]]] بدل [[dependencies]]: موجودين وانت بتطوّر وفي CI، ومش بيتسطّبوا في الإنتاج لما تعمل [[uv sync --no-dev]]. pytest للاختبارات، و ruff للـ lint والتنسيق، و mypy لفحص الأنواع.`,
            R`[[uv run]] بيتأكد إن [[.venv]] مطابق للـ lock (ويزامنه لو لأ)، وبعدين يشغّل الأمر جواه، فمش محتاج [[activate]]. [[fastapi dev main.py]] بيشغّل السيرفر بالـ reload. لو كتبت [[fastapi dev]] من غير [[uv run]] ومن غير activate: [[command not found]] أو نسخة تانية من الجهاز.`,
            R`[[uv sync]] بيخلي [[.venv]] مطابق للـ lock بالظبط (يسطّب الناقص ويشيل الزيادة). و [[--locked]] بيفشل بدل ما يعدّل الـ lock لو [[pyproject.toml]] اتغيّر من غير [[uv lock]]، وده اللي عايزه في CI و Dockerfile: نفس النسخ اللي جربتها على جهازك بالظبط، أو فشل واضح.`,
            R`[[uv export]] بيطلّع النسخ المقفولة في شكل [[requirements.txt]] لأي أداة لسه محتاجاه (منصة hosting قديمة أو [[pip install -r]]). و [[--no-hashes]] بيشيل سطور [[--hash=sha256:...]] عشان الملف يبقى مقروء، و [[>]] بيكتب الناتج في ملف بدل الشاشة.`,
          ],
          sol: R`بعد [[uv init shop-api]] و [[uv add "fastapi[standard]"]] هتلاقي في [[pyproject.toml]] قسم [[[project]]] فيه [[name]] و [[version]] و [[requires-python]] (على حسب نسخة Python اللي uv لقاها أو اللي عملتلها pin) و [[dependencies = ["fastapi[standard]>=0.1xx.x"]]]، يعني uv كتب اللي إنت طلبته بس بحد أدنى. أما [[uv.lock]] فطويل جدًا: فيه كل الـ packages (الـ dependencies وdependencies بتاعتها، حوالي ٦٠ واحدة لـ fastapi[standard])، كل واحدة بنسختها الدقيقة ورابط تحميلها و [[hash]] بتاعها.

وبعد [[rm -rf .venv]] و [[uv sync]] الوقت هيبقى صغير جدًا (في تجربتنا أقل من ثانية)، لأن uv بيجيب الـ packages من الـ cache بتاعه ويعمل links بدل ما ينزّل وينسخ. الفرق ده هو سبب إن الناس نقلت من pip. ولو [[uv sync]] أخد وقت طويل، يبقى الـ cache فاضي (أول مرة على الجهاز) أو في CI من غير cache. والـ [[pyproject.toml]] بتكتبه إنت، والـ [[uv.lock]] uv بيكتبه، والاتنين يتعملهم commit.`
        }
      ]
    }
]);
