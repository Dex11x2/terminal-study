// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Modules والمشروع",
      l: 1,
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
            "مكتبة من الـ venv.",
            "import مطلق من جذر المشروع: الأوضح.",
            "import نسبي: config.py في الـ package اللي فوق.",
            "متغير على مستوى الـ module: بيتعمل مرة واحدة مع أول import.",
            "دالة.",
            "الجسم.",
            R`الملف اتشغّل مباشرة ([[python -m app.routers.users]])؟`,
            "يبقى شغّل main. لو اتعمله import، ده مش هيشتغل."
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
            "سطّب uv (مرة واحدة على الجهاز).",
            R`مشروع جديد فيه [[pyproject.toml]]، وادخل فيه.`,
            R`ثبّت نسخة Python في [[.python-version]]، و uv بينزّلها لو مش موجودة.`,
            "ضيف مكتبات: بتتكتب في pyproject، وتتقفل في uv.lock، وتتسطّب في .venv.",
            "أدوات التطوير في مجموعة لوحدها.",
            "شغّل جوه الـ venv من غير activate (بعد ما تكتب التطبيق في main.py).",
            "سطّب من الـ lock بالظبط، ويفشل لو مش متزامن: لـ CI و Docker.",
            "requirements.txt لو حاجة لسه محتاجاه."
          ],
          sol: R`بعد [[uv init shop-api]] و [[uv add "fastapi[standard]"]] هتلاقي في [[pyproject.toml]] قسم [[[project]]] فيه [[name]] و [[version]] و [[requires-python]] (على حسب نسخة Python اللي uv لقاها أو اللي عملتلها pin) و [[dependencies = ["fastapi[standard]>=0.1xx.x"]]]، يعني uv كتب اللي إنت طلبته بس بحد أدنى. أما [[uv.lock]] فطويل جدًا: فيه كل الـ packages (الـ dependencies وdependencies بتاعتها، حوالي ٦٠ واحدة لـ fastapi[standard])، كل واحدة بنسختها الدقيقة ورابط تحميلها و [[hash]] بتاعها.

وبعد [[rm -rf .venv]] و [[uv sync]] الوقت هيبقى صغير جدًا (في تجربتنا أقل من ثانية)، لأن uv بيجيب الـ packages من الـ cache بتاعه ويعمل links بدل ما ينزّل وينسخ. الفرق ده هو سبب إن الناس نقلت من pip. ولو [[uv sync]] أخد وقت طويل، يبقى الـ cache فاضي (أول مرة على الجهاز) أو في CI من غير cache. والـ [[pyproject.toml]] بتكتبه إنت، والـ [[uv.lock]] uv بيكتبه، والاتنين يتعملهم commit.`
        }
      ]
    },
    {
      t: "ملفات وداتا وتواريخ",
      l: 1,
      n: "pathlib للمسارات، و csv و json من ملف لملف، و datetime بتوقيت صح، و re للنصوص",
      items: [
        {
          cmd: "pathlib",
          title: "المسارات والملفات بـ pathlib بدل os.path",
          desc: R`[[pathlib.Path]] بيمثّل مسار كـ object: تبنيه بـ [[/]] ([[base / "reports" / "sales.csv"]])، وتسأله [[exists()]] و [[is_file()]]، وتاخد منه [[name]] و [[stem]] و [[suffix]] و [[parent]]، وتقرا وتكتب بـ [[read_text]] و [[write_text]]، وتدوّر بـ [[glob]] و [[rglob]].

وبيشتغل صح على لينكس وويندوز وماك من غير ما تفكر في [[/]] ولا [[\]]. الطريقة القديمة ([[os.path.join]] و [[os.listdir]]) لسه شغالة وهتشوفها في كود قديم، بس الجديد بيتكتب بـ pathlib.`,
          example: R`from pathlib import Path
base = Path("data")
reports = base / "reports" / "2026"
reports.mkdir(parents=True, exist_ok=True)
f = reports / "sales.csv"
f.write_text("id,total\n1,150\n", encoding="utf-8")
print(f)                                        # data/reports/2026/sales.csv
print(f.name, f.stem, f.suffix, f.parent.name)  # sales.csv sales .csv 2026
print(f.exists(), f.is_file(), f.stat().st_size)
print(f.read_text(encoding="utf-8").splitlines())
for p in sorted(base.rglob("*.csv")):
    print(p.relative_to(base))
backup = f.with_suffix(".bak")
f.rename(backup)
print(Path.cwd() / "data", Path.home())
here = Path(__file__).resolve().parent
config = here / "config.toml"
backup.unlink(missing_ok=True)`,
          try: R`اعمل فولدر [[inbox]] فيه ملفات فاضية ([[touch inbox/cv.pdf inbox/photo.JPG inbox/logo.png inbox/notes.txt inbox/archive.tar.gz]]). اكتب [[organize(folder, dry_run=True)]] بتنقل كل ملف لفولدر فرعي حسب الامتداد (docs للـ pdf و txt، و images للـ jpg و png، و other للباقي)، وفي وضع الـ dry run تطبع بس هتعمل إيه. وترجع dict بعدد الملفات في كل مجموعة.`,
          sol: R`الـ dry run بيطبع [[[dry-run] cv.pdf -> docs/]] وأخواتها ومبيحركش حاجة، والتشغيل الحقيقي بيطلّع نفس السطور من غير البادئة، والنتيجة [[{'other': 1, 'docs': 2, 'images': 2}]]، والملفات في [[docs/cv.pdf]] و [[images/photo.JPG]] و [[other/archive.tar.gz]] إلخ.

٣ نقط بيقع فيها الناس: [[photo.JPG]] امتداده كبير، فلازم [[p.suffix.lower()]] وإلا هيروح other. و [[archive.tar.gz]] الـ suffix بتاعه [[.gz]] بس (لو محتاج الاتنين: [[p.suffixes]]). و [[sorted(folder.iterdir())]] مش [[folder.iterdir()]] مباشرة وانت بتنقل جوه نفس الفولدر، لأنك بتعدّل الفولدر وانت بتلف عليه، و [[if not p.is_file(): continue]] عشان متنقلش الفولدرات اللي عملتها. والـ dry run عادة لازم تبقى الافتراضي في أي سكربت بينقل أو يمسح.`,
          solCode: R`from pathlib import Path
GROUPS = {".pdf": "docs", ".txt": "docs", ".jpg": "images", ".png": "images"}
def organize(folder: Path, dry_run: bool = True) -> dict[str, int]:
    moved: dict[str, int] = {}
    for p in sorted(folder.iterdir()):
        if not p.is_file():
            continue
        group = GROUPS.get(p.suffix.lower(), "other")
        target = folder / group / p.name
        print(("[dry-run] " if dry_run else "") + f"{p.name} -> {group}/")
        if not dry_run:
            target.parent.mkdir(exist_ok=True)
            p.rename(target)
        moved[group] = moved.get(group, 0) + 1
    return moved
print(organize(Path("inbox")))
print(organize(Path("inbox"), dry_run=False))
print(sorted(str(p.relative_to("inbox")) for p in Path("inbox").rglob("*") if p.is_file()))`,
          flag: "script",
          deep: {
            why: R`سكربتات الأتمتة كلها ملفات: نظّف فولدر، اجمع تقارير، انقل صور، اقرا إعدادات. وكود زي [[os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")]] بقى [[Path(__file__).resolve().parent.parent / "data"]]: أقصر وأوضح وأقل غلط.`,
            how: R`[[Path("data")]] نسبي للفولدر الحالي (اللي شغّلت منه الأمر، مش فولدر السكربت). عشان توصل لملف جنب السكربت نفسه: [[Path(__file__).resolve().parent]]. و [[Path.cwd()]] و [[Path.home()]] للفولدر الحالي والـ home.

[[/]] بيبني المسار ([[Path]] عرّف [[__truediv__]]، درس «dunder methods»). و [[mkdir(parents=True, exist_ok=True)]] زي [[mkdir -p]]. و [[with_suffix]] و [[with_name]] بيرجّعوا Path جديد (الـ Path immutable). و [[rename]] بينقل، و [[unlink(missing_ok=True)]] بيمسح من غير ما يرمي لو مش موجود، و [[shutil.copy]] و [[shutil.rmtree]] للنسخ ومسح فولدر كامل.

[[glob("*.csv")]] في الفولدر ده بس، و [[rglob("*.csv")]] في كل اللي تحته. والاتنين generators، فلو هتعدّل وانت بتلف، حوّلهم list الأول. و [[relative_to]] بيطلّع المسار نسبةً لفولدر.

[[read_text]] و [[write_text]] للملفات الصغيرة (بيقروا الملف كله مرة واحدة). للملفات الكبيرة: [[with p.open(encoding="utf-8") as f: for line in f]] (درس «generators و yield»). و [[encoding="utf-8"]] دايمًا عشان ويندوز.`,
            when: R`أي كود بيلمس ملفات أو فولدرات. و FastAPI نفسه بيقبل [[Path]] في [[FileResponse]] و [[StaticFiles]]. والملفات اللي المستخدم بيرفعها: اسم الملف من الـ request مينفعش يتحط في مسار مباشرة (path traversal: [[../../etc/passwd]])، اعمل اسم جديد بـ uuid.`,
            mistakes: R`مسارات نسبية في سكربت بيتشغّل من cron أو من فولدر تاني (بيدوّر في مكان غلط). و [[str + "/" + str]] بدل [[/]]. و [[p.suffix == ".jpg"]] من غير [[lower()]]. و [[rmtree]] على متغير ممكن يبقى فاضي أو [[/]]. وتنسى [[encoding]] فالعربي يبوظ على ويندوز.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل فولدرات [[data/reports/2026]]، ويكتب فيها ملف CSV صغير، ويسأله عن اسمه وحجمه، ويقراه، ويدوّر على كل ملفات الـ CSV، ويغيّر اسمه، وفي الآخر يمسحه. كل ده بـ object واحد اسمه [[Path]]. اتشغّل كملف [[ex.py]] على ويندوز (Python 3.14.3) وعلى لينكس ([[docker run --rm python:3.13-slim]])، والنواتج كانت مختلفة في حاجتين مهمين هتشوفهم.

---

## ١. [[from pathlib import Path]]

[[pathlib]] module في المكتبة الأساسية (مش محتاج pip)، و [[Path]] هو النوع اللي بيمثّل مسار. على ويندوز بيبقى [[WindowsPath]] وعلى لينكس [[PosixPath]]، و Python بيختار لوحده:

~~~text الناتج: print(repr(f)) على ويندوز
WindowsPath('data/reports/2026/sales.csv')
~~~

---

## ٢. بناء المسار بـ [[/]]

~~~python
base = Path("data")
reports = base / "reports" / "2026"
~~~

- [[Path("data")]]: مسار **نسبي**، يعني نسبةً للفولدر اللي انت واقف فيه في الترمنال وقت التشغيل (مش فولدر السكربت).
- [[/]] هنا مش قسمة. [[Path]] معرّف العلامة دي (الـ method اللي اسمها [[__truediv__]]) إنها «ضيف جزء للمسار». فـ [[base / "reports" / "2026"]] بيتنفّذ من الشمال: [[data]] ثم [[data/reports]] ثم [[data/reports/2026]].
- Python بيحط الفاصل الصح للنظام: [[\]] على ويندوز و [[/]] على لينكس. ولو جرّبت تجمع بـ [[+]]:

~~~text الناتج: Path("data") + "/x"
TypeError: unsupported operand type(s) for +: 'WindowsPath' and 'str'
~~~

---

## ٣. [[reports.mkdir(parents=True, exist_ok=True)]]

[[mkdir]] = make directory. الباراميترين:

| الباراميتر | من غيره | معاه |
|---|---|---|
| [[parents=True]] | [[FileNotFoundError]] لو [[data]] أو [[reports]] مش موجودين | بيعمل كل الفولدرات اللي فوق |
| [[exist_ok=True]] | [[FileExistsError]] لو الفولدر موجود | بيعدّي بهدوء |

الاتنين مع بعض = [[mkdir -p]] في bash. فالسكربت ينفع يتشغّل مرة واتنين وعشرة.

---

## ٤. [[f.write_text(..., encoding="utf-8")]]

~~~python
f = reports / "sales.csv"
f.write_text("id,total\n1,150\n", encoding="utf-8")
~~~

- [[f]] لسه مسار بس، الملف مش موجود. [[write_text]] بيفتح الملف، يكتب النص، ويقفله، في سطر واحد. ولو الملف موجود بيمسح اللي فيه.
- [[\n]] = سطر جديد. فالنص ده سطرين: [[id,total]] و [[1,150]].
- [[encoding="utf-8"]]: إزاي الحروف تتحوّل bytes. من غيره ويندوز ممكن يستخدم encoding قديم والعربي يبوظ.

---

## ٥. الطباعة وأجزاء الاسم

~~~python
print(f)
print(f.name, f.stem, f.suffix, f.parent.name)
~~~

~~~text الناتج: ويندوز ثم لينكس
data\reports\2026\sales.csv
data/reports/2026/sales.csv
~~~

التعليق في المثال مكتوب بشكل لينكس. على ويندوز نفس المسار بيتطبع بـ [[\]]، والكود نفسه مش محتاج يتغير.

~~~text الناتج (الاتنين)
sales.csv sales .csv 2026
~~~

| الخاصية | القيمة | معناها |
|---|---|---|
| [[name]] | [[sales.csv]] | آخر جزء كامل |
| [[stem]] | [[sales]] | الاسم من غير الامتداد |
| [[suffix]] | [[.csv]] | الامتداد بالنقطة |
| [[parent]] | [[data/reports/2026]] | الفولدر اللي فوقه (Path كمان) |
| [[parent.name]] | [[2026]] | اسم الفولدر اللي فوقه |

دي خصائص من غير [[()]] لأنها قيم جاهزة مش أفعال. وخلي بالك: [[Path("a.tar.gz").suffix]] بيدّي [[.gz]] بس، و [[.suffixes]] بيدّي [[['.tar', '.gz'] ]] (جربناها).

---

## ٦. [[exists()]] و [[is_file()]] و [[stat().st_size]]

~~~text الناتج: ويندوز ثم لينكس
True True 17
True True 15
~~~

- [[exists()]]: المسار موجود؟ و [[is_file()]]: موجود **وملف** (مش فولدر)؟ دول بأقواس لأنهم بيسألوا الديسك.
- [[stat()]] بيرجّع معلومات الملف من النظام، و [[st_size]] الحجم بالـ byte.

**ليه ١٧ على ويندوز و ١٥ على لينكس؟** النص فيه ١٣ حرف و ٢ [[\n]] = ١٥. على ويندوز [[write_text]] بيفتح الملف في text mode، فبيحوّل كل [[\n]] لـ [[\r\n]] (نهاية السطر بتاعة ويندوز)، فكل سطر زاد byte: ١٥ + ٢ = ١٧. ولو عايز [[\n]] على كل الأنظمة: [[write_text(..., newline="\n")]] (3.10+).

---

## ٧. [[read_text().splitlines()]]

~~~text الناتج (الاتنين)
['id,total', '1,150']
~~~

[[read_text]] بيقرا الملف كله string، وفي القراية [[\r\n]] بترجع [[\n]] لوحدها، فالناتج واحد على النظامين. و [[splitlines()]] بيقسّمه list سطور ومن غير علامة السطر الجديد.

---

## ٨. [[rglob]] و [[relative_to]]

~~~python
for p in sorted(base.rglob("*.csv")):
    print(p.relative_to(base))
~~~

- [[rglob("*.csv")]]: r = recursive، دوّر تحت [[data]] بأي عمق على أي اسم آخره [[.csv]]. و [[*]] يعني «أي حروف». و [[glob]] من غير r بيدوّر في الفولدر نفسه بس.
- [[rglob]] بيرجّع generator (بيطلّع النتايج واحدة واحدة)، و [[sorted]] بيجمعهم ويرتّبهم عشان الترتيب يبقى ثابت.
- [[relative_to(base)]]: شيل [[data]] من أول المسار.

~~~text الناتج: ويندوز ثم لينكس
reports\2026\sales.csv
reports/2026/sales.csv
~~~

---

## ٩. [[with_suffix]] و [[rename]]

~~~python
backup = f.with_suffix(".bak")
f.rename(backup)
~~~

- [[with_suffix(".bak")]]: Path **جديد** بنفس المسار وامتداد تاني: [[data\reports\2026\sales.bak]]. [[f]] نفسه مبيتغيرش (الـ Path immutable)، ولا الملف على الديسك اتلمس.
- [[f.rename(backup)]]: هنا بس الملف على الديسك اتنقل للاسم الجديد.

---

## ١٠. [[Path.cwd()]] و [[Path.home()]]

~~~text الناتج: ويندوز ثم لينكس
C:\Users\ali\...\l3\data C:\Users\ali
/s/l3/data /root
~~~

- [[cwd]] = current working directory: الفولدر اللي انت شغّال منه. و [[home]] فولدر اليوزر. ودول بيتنادوا على [[Path]] نفسه مش على مسار.
- في Docker اليوزر [[root]]، فالـ home هو [[/root]].

---

## ١١. [[Path(__file__).resolve().parent]]

~~~python
here = Path(__file__).resolve().parent
config = here / "config.toml"
~~~

نفكّها من جوه لبرة:

1. [[__file__]]: متغير Python بيحطه في كل ملف، فيه مسار الملف ده نفسه.
2. [[Path(...)]]: حوّله Path.
3. [[.resolve()]]: خليه مسار كامل (من أول [[C:\]] أو [[/]]) وفك أي [[..]] أو link.
4. [[.parent]]: الفولدر اللي فيه الملف.

جربناه في ملف [[here.py]] وشغّلناه من فولدره ومن الفولدر اللي فوقه، والناتج واحد في الحالتين:

~~~text الناتج
C:\Users\ali\...\l3
C:\Users\ali\...\l3\config.toml
~~~

ده الفرق المهم عن [[Path("data")]]: اللي بيبدأ بـ [[__file__]] مرتبط بمكان السكربت، و [[Path("data")]] مرتبط بمكان التشغيل. فملف إعدادات جنب السكربت يتجاب بالطريقة دي.

---

## ١٢. [[backup.unlink(missing_ok=True)]]

[[unlink]] = امسح الملف. و [[missing_ok=True]] = «لو مش موجود متعملش [[FileNotFoundError]]». الفولدرات [[data/reports/2026]] بتفضل موجودة فاضية.

---

## ١٣. الحل: [[organize]]

~~~python solCode (القلب)
GROUPS = {".pdf": "docs", ".txt": "docs", ".jpg": "images", ".png": "images"}
for p in sorted(folder.iterdir()):
    if not p.is_file():
        continue
    group = GROUPS.get(p.suffix.lower(), "other")
    target = folder / group / p.name
~~~

- [[GROUPS]]: dict من الامتداد لاسم الفولدر. والاسم كابيتال عرف معناه «ثابت».
- [[iterdir()]]: كل اللي جوه الفولدر مباشرة (ملفات وفولدرات). و [[sorted]] بيحوّله list الأول، عشان احنا هننقل ملفات جوه نفس الفولدر وإحنا بنلف عليه.
- [[if not p.is_file(): continue]]: سيب الفولدرات (زي [[docs]] بعد ما تتعمل).
- [[p.suffix.lower()]]: [[.JPG]] تبقى [[.jpg]].
- [[GROUPS.get(key, "other")]]: لو الامتداد مش في الـ dict رجّع [["other"]] بدل [[KeyError]].
- [[mkdir(exist_ok=True)]] و [[p.rename(target)]] بيتنفّذوا بس لو [[dry_run]] بـ False.
- [[moved.get(group, 0) + 1]]: عدّاد لكل مجموعة يبدأ من صفر.

~~~text الناتج (ويندوز، بعد touch للـ ٥ ملفات)
[dry-run] archive.tar.gz -> other/
[dry-run] cv.pdf -> docs/
[dry-run] logo.png -> images/
[dry-run] notes.txt -> docs/
[dry-run] photo.JPG -> images/
{'other': 1, 'docs': 2, 'images': 2}
archive.tar.gz -> other/
...
{'other': 1, 'docs': 2, 'images': 2}
['docs\\cv.pdf', 'docs\\notes.txt', 'images\\logo.png', 'images\\photo.JPG', 'other\\archive.tar.gz']
~~~

[[archive.tar.gz]] راح other لأن الـ suffix بتاعه [[.gz]]. والسطر الأخير على لينكس طلع [['docs/cv.pdf', ...]]، وعلى ويندوز [['docs\\cv.pdf']]: الـ [[\\]] دي [[\]] واحدة، بس Python بيكتبها مرتين لما يطبع string جوه list.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تبني مسار | [[base / "a" / "b.csv"]] |
| فولدر بكل اللي فوقه | [[mkdir(parents=True, exist_ok=True)]] |
| تكتب وتقرا ملف صغير | [[write_text(s, encoding="utf-8")]] و [[read_text(encoding="utf-8")]] |
| أجزاء الاسم | [[name]] و [[stem]] و [[suffix]] و [[parent]] |
| تدوّر | [[glob]] (الفولدر ده) و [[rglob]] (بأي عمق) |
| تغيّر الاسم أو تمسح | [[rename]] و [[unlink(missing_ok=True)]] |
| ملف جنب السكربت | [[Path(__file__).resolve().parent / "x"]] |

- [[Path("x")]] نسبي لمكان التشغيل، مش لمكان السكربت.
- نفس الكود بيشتغل على ويندوز ولينكس، بس الطباعة بتبان بفاصل النظام، و [[write_text]] على ويندوز بيكتب [[\r\n]].`,
          lines: [
            "import.",
            R`مسار نسبي للفولدر الحالي.`,
            R`[[/]] بيبني المسار: data/reports/2026.`,
            R`زي [[mkdir -p]]: اعمل الفولدرات اللي فوقه، ومتعترضش لو موجود.`,
            "مسار ملف.",
            "اكتب نص في الملف (وبيتقفل لوحده).",
            "بيطبع المسار.",
            R`الاسم، ومن غير امتداد، والامتداد، واسم الفولدر اللي فوقه.`,
            "موجود؟ ملف؟ والحجم بالبايت.",
            "اقرا الملف كله وقسّمه سطور.",
            R`[[rglob]]: كل ملفات الـ csv تحت data بأي عمق.`,
            "المسار نسبةً لـ data.",
            "Path جديد بامتداد تاني (الأصلي مبيتغيرش).",
            "انقل/غيّر الاسم.",
            "الفولدر الحالي والـ home.",
            "الفولدر اللي فيه السكربت نفسه، مهما كان مكان التشغيل.",
            "ملف جنب السكربت.",
            "امسح، ومترميش لو مش موجود."
          ]
        },
        {
          cmd: "csv و json",
          title: "من CSV لـ JSON وبالعكس: من ملف لملف",
          desc: R`[[csv.DictReader]] بيقرا كل صف كـ dict بأسماء الأعمدة من أول سطر، و [[csv.DictWriter]] بيكتب list of dicts. وافتح ملفات الـ CSV دايمًا بـ [[newline=""]] و [[encoding="utf-8"]]. وكل القيم اللي بتيجي من CSV strings، فحوّل الأرقام بنفسك.

و [[json.loads]] و [[json.dumps]] بيحوّلوا بين string و dict/list، و [[json.load]] و [[json.dump]] نفس الكلام مع ملف مفتوح. و [[ensure_ascii=False]] عشان العربي يتكتب عربي مش [[\u0633]]، و [[indent=2]] للقراية.`,
          example: R`import csv
import json
from datetime import date
from pathlib import Path
with open("orders.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
print(rows[2])                        # {'id': '3', 'name': 'Ali, Jr.', 'city': 'Cairo', 'total': '45'}
for r in rows:
    r["id"] = int(r["id"])
    r["total"] = float(r["total"])
Path("orders.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
data = json.loads(Path("orders.json").read_text(encoding="utf-8"))
cairo = [o for o in data if o["city"] == "Cairo"]
with open("cairo.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "name", "total"], extrasaction="ignore")
    writer.writeheader()
    writer.writerows(cairo)
with open("events.jsonl", "w", encoding="utf-8") as f:
    for o in data:
        f.write(json.dumps({"order": o["id"], "city": o["city"]}) + "\n")
payload = {"day": date(2026, 9, 29), "count": len(data)}
print(json.dumps(payload, default=str))   # {"day": "2026-09-29", "count": 3}
json.dumps(payload)                       # TypeError: Object of type date is not JSON serializable`,
          try: R`من نفس [[orders.csv]] (أعمدة id و name و city و total)، اعمل ملخص لكل مدينة: عدد الطلبات والإجمالي، مترتب بالإجمالي تنازلي. اكتبه في [[summary.json]] و [[summary.csv]]. خلي في الـ CSV صف فيه فاصلة جوه الاسم ([["Ali, Jr."]]) وصف المدينة فيه مسافة زيادة ([[ Cairo]]).`,
          sol: R`مع الـ ٣ صفوف: [[[{'city': 'Cairo', 'orders': 2, 'total': 195.5}, {'city': 'Alex', 'orders': 1, 'total': 80.0}]]]، والـ [[summary.csv]] فيه [[city,orders,total]] وبعدين [[Cairo,2,195.5]] و [[Alex,1,80.0]].

الاسم اللي فيه فاصلة بيتقري صح لأن CSV بيحطه بين علامات تنصيص ([["Ali, Jr."]])، ودي بالظبط اللي بتبوظ لو قسّمت السطر بـ [[line.split(",")]] بإيدك. و [[row["city"].strip()]] عشان [[" Cairo"]] و [["Cairo"]] ميبقوش مدينتين. و [[float(row["total"])]] لازم، وإلا [["150.5" + "45"]] هيبقى string. و [[round]] بعد كل جمع عشان أخطاء الـ float ([[0.1 + 0.2]])، ولو دي فلوس حقيقية استخدم [[Decimal]] أو قروش كـ int. و [[setdefault]] بيعمل الـ dict الفاضي أول مرة بس.`,
          solCode: R`import csv
import json
from pathlib import Path
def summarize(src: Path) -> list[dict]:
    by_city: dict[str, dict] = {}
    with src.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            city = row["city"].strip()
            s = by_city.setdefault(city, {"city": city, "orders": 0, "total": 0.0})
            s["orders"] += 1
            s["total"] = round(s["total"] + float(row["total"]), 2)
    return sorted(by_city.values(), key=lambda s: s["total"], reverse=True)
summary = summarize(Path("orders.csv"))
Path("summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
with open("summary.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["city", "orders", "total"])
    w.writeheader()
    w.writerows(summary)
print(summary)
print(Path("summary.csv").read_text(encoding="utf-8"))`,
          flag: "script",
          deep: {
            why: R`«العميل بعت Excel، حمّله في النظام» و «طلّع تقرير CSV للمحاسب» و «حوّل ملف JSON من API قديم»: من أكتر المهام اللي هتتطلب منك، وأغلبها سكربت ٢٠ سطر لو عارف الـ csv و json صح، وساعات كتير ضايعة لو بتقسّم بـ split بإيدك.`,
            how: R`[[newline=""]] لأن الـ csv module بيتعامل مع نهايات السطور بنفسه (وبيكتب [[\r\n]] افتراضيًا زي المعيار)، ومن غيره هتلاقي سطور فاضية بين الصفوف على ويندوز، والقيم اللي فيها newline تبوظ. و Excel بيحب [[encoding="utf-8-sig"]] (فيه BOM) عشان يفتح العربي صح؛ لو الملف جاي من Excel وأول عمود اسمه [[﻿id]]، ده السبب.

[[DictWriter(fieldnames=...)]] بيحدد الأعمدة وترتيبها، و [[extrasaction="ignore"]] بيتجاهل المفاتيح الزيادة بدل ما يرمي [[ValueError]].

JSON وأنواع Python: object ↔ dict، و array ↔ list، و string ↔ str، و number ↔ int/float، و true/false/null ↔ True/False/None. وأي حاجة تانية ([[datetime]] و [[Decimal]] و [[set]] و [[UUID]]) بترمي [[TypeError: Object of type date is not JSON serializable]]. الحل السريع [[default=str]]، والحل الصح إنك تحوّلها بنفسك أو تسيب Pydantic يعمل ده ([[model_dump(mode="json")]]، المستوى ٢).

JSON Lines ([[.jsonl]]): كل سطر JSON لوحده، فتقدر تكتب وتقرا سطر سطر من غير ما تحمّل الملف كله. ده الشكل المعتاد للّوج والـ exports الكبيرة.`,
            when: R`csv لأي داتا جدولية بتتبادل مع ناس أو Excel. json للإعدادات والـ APIs والداتا المتداخلة. jsonl للّوج والملفات الكبيرة. ولو محتاج تحليل (group by و join و pivot) على ملفات كبيرة: pandas أو polars، بس الأساس ده الأول.`,
            mistakes: R`[[line.split(",")]] بدل الـ csv module (أي فاصلة جوه قيمة بتبوظ كل حاجة). ونسيان [[newline=""]]. ونسيان إن كل القيم strings ([["10" > "9"]] False!). و [[json.dumps]] من غير [[ensure_ascii=False]] والعربي يطلع [[\u....]]. و [[default=str]] على كل حاجة من غير ما تفكر، فـ Decimal يطلع string والطرف التاني يستنى رقم.`
          },
          teach: R`## المثال بيعمل إيه؟

بياخد ملف [[orders.csv]] فيه ٣ طلبات، ويقراه، ويحوّل الأرقام، ويكتبه JSON، ويرجع يقراه، ويطلّع طلبات القاهرة في CSV جديد، ويكتب ملف JSON Lines، وفي الآخر يوريك المشكلة الوحيدة اللي هتقابلها مع JSON: التواريخ. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) على الملف ده:

~~~text orders.csv
id,name,city,total
1,Sara,Cairo,150.5
2,Omar,Alex,80
3,"Ali, Jr.",Cairo,45
~~~

CSV = Comma-Separated Values: أول سطر أسماء الأعمدة (header)، وكل سطر بعده صف، والقيم بينها فاصلة. ولو القيمة نفسها فيها فاصلة ([[Ali, Jr.]]) بتتحط بين علامتين تنصيص.

---

## ١. الـ imports

~~~python
import csv
import json
from datetime import date
from pathlib import Path
~~~

الأربعة من المكتبة الأساسية: [[csv]] لقراية وكتابة CSV، و [[json]] للـ JSON، و [[date]] نوع التاريخ (هنحتاجه في الآخر)، و [[Path]] للملفات (الدرس اللي فات).

---

## ٢. القراية: [[csv.DictReader]]

~~~python
with open("orders.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
print(rows[2])
~~~

- [[open("orders.csv", ...)]]: افتح الملف للقراية (الافتراضي). و [[with ... as f:]] بيقفله لوحده أول ما البلوك يخلص.
- [[newline=""]]: «متلمسش نهايات السطور، سيبها للـ csv module». الـ module بيفهم [[\r\n]] و [[\n]] لوحده، وبيعرف يقرا قيمة فيها سطر جديد جوه التنصيص.
- [[csv.DictReader(f)]]: بيقرا أول سطر كأسماء أعمدة، وكل سطر بعده بيطلّعه dict مفاتيحه الأسماء دي.
- [[list(...)]]: الـ reader بيقرا سطر سطر وقت ما تطلب، فلو استنيت لبعد الـ [[with]] الملف هيبقى مقفول. [[list]] بيقرا الكل دلوقتي.
- [[rows[2] ]]: العنصر التالت (العدّ من صفر).

~~~text الناتج
{'id': '3', 'name': 'Ali, Jr.', 'city': 'Cairo', 'total': '45'}
~~~

حاجتين: الاسم اللي فيه فاصلة اتقري قيمة واحدة صح، و **كل القيم strings**: [['3']] و [['45']] مش أرقام. CSV مفيهوش أنواع، كله نص. ولو قسّمت السطر بإيدك:

~~~text الناتج: '3,"Ali, Jr.",Cairo,45'.split(',')
['3', '"Ali', ' Jr."', 'Cairo', '45']
~~~

خمس قيم بدل أربعة، وده سبب إنك متقسّمش CSV بـ [[split]] أبدًا.

---

## ٣. تحويل الأنواع

~~~python
for r in rows:
    r["id"] = int(r["id"])
    r["total"] = float(r["total"])
~~~

- [[int("3")]] بيحوّل النص لرقم صحيح، و [[float("150.5")]] لرقم عشري.
- [[r["id"] = ...]]: بيغيّر القيمة جوه نفس الـ dict، فالـ [[rows]] نفسها اتعدّلت.

ليه لازم؟ لأن المقارنة بين strings بتمشي حرف حرف: [['10' > '9']] طلعت [[False]] لأن [['1']] أصغر من [['9']].

---

## ٤. الكتابة JSON: [[json.dumps]]

~~~python
Path("orders.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
~~~

من جوه لبرة:

1. [[json.dumps(rows, ...)]]: dumps = dump **s**tring، بيحوّل الـ list of dicts لـ string بصيغة JSON.
2. [[indent=2]]: كل مستوى بمسافتين وكل خانة في سطر، عشان يتقري. من غيره كله سطر واحد.
3. [[ensure_ascii=False]]: سيب الحروف غير الإنجليزي زي ما هي:

~~~text الناتج: json.dumps({'name': 'سارة'}) ثم مع ensure_ascii=False
{"name": "سارة"}
{"name": "سارة"}
~~~

4. [[write_text(..., encoding="utf-8")]]: اكتب الـ string في ملف.

~~~text orders.json (أوله)
[
  {
    "id": 1,
    "name": "Sara",
    "city": "Cairo",
    "total": 150.5
  },
~~~

لاحظ: [[1]] و [[150.5]] من غير تنصيص، يعني أرقام، لأننا حوّلناهم. والـ quotes بقت [["]] (JSON مبيقبلش [[']]).

---

## ٥. القراية من JSON والفلترة

~~~python
data = json.loads(Path("orders.json").read_text(encoding="utf-8"))
cairo = [o for o in data if o["city"] == "Cairo"]
~~~

- [[json.loads]]: load **s**tring، العكس: من string JSON لـ list و dicts.
- [[[o for o in data if ...] ]]: list comprehension: «كل [[o]] في [[data]] لو مدينته Cairo». الناتج طلبين (1 و 3).

| JSON | Python |
|---|---|
| object [[{}]] | dict |
| array [[[]]] | list |
| string | str |
| number | int أو float |
| [[true]] / [[false]] / [[null]] | [[True]] / [[False]] / [[None]] |

---

## ٦. الكتابة CSV: [[csv.DictWriter]]

~~~python
with open("cairo.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "name", "total"], extrasaction="ignore")
    writer.writeheader()
    writer.writerows(cairo)
~~~

- [["w"]]: افتح للكتابة (ويمسح القديم).
- [[newline=""]] هنا أهم: الـ csv module بيكتب [[\r\n]] في آخر كل صف (ده المعيار). لو نسيته على ويندوز، Python هيحوّل الـ [[\n]] اللي فيها لـ [[\r\n]] تاني. جربناها: الملف طلع [[b'a,b\r\r\n1,2\r\r\n']]، وExcel بيشوف سطر فاضي بين كل صفين.
- [[fieldnames]]: الأعمدة وترتيبها.
- [[extrasaction="ignore"]]: الـ dicts فيها [[city]] وهو مش في [[fieldnames]]. الافتراضي [["raise"]] يعني [[ValueError]]، و [["ignore"]] بيسيبه.
- [[writeheader()]] سطر الأسماء، و [[writerows(cairo)]] كل الصفوف.

~~~text cairo.csv (بـ cat -A: ^M هي \r و $ آخر السطر)
id,name,total^M$
1,Sara,150.5^M$
3,"Ali, Jr.",45.0^M$
~~~

الـ writer حط التنصيص لوحده حوالين [[Ali, Jr.]]. و [[45]] بقت [[45.0]] لأنها بقت float في الخطوة ٣.

---

## ٧. JSON Lines: [[events.jsonl]]

~~~python
with open("events.jsonl", "w", encoding="utf-8") as f:
    for o in data:
        f.write(json.dumps({"order": o["id"], "city": o["city"]}) + "\n")
~~~

لكل طلب: dict صغير، يتحوّل string JSON، ونضيف [["\n"]] في الآخر. فكل سطر JSON كامل لوحده:

~~~text events.jsonl
{"order": 1, "city": "Cairo"}
{"order": 2, "city": "Alex"}
{"order": 3, "city": "Cairo"}
~~~

الميزة: تقدر تضيف سطر في الآخر وتقرا سطر سطر من غير ما تحمّل الملف كله، عشان كده اللوجات بتتكتب كده.

---

## ٨. التواريخ و [[default=str]]

~~~python
payload = {"day": date(2026, 9, 29), "count": len(data)}
print(json.dumps(payload, default=str))
json.dumps(payload)
~~~

- [[date(2026, 9, 29)]]: object تاريخ. و [[len(data)]] = 3.
- [[default=str]]: «أي نوع مش عارف تكتبه JSON، ناديله [[str()]]». و [[str(date(2026, 9, 29))]] = [['2026-09-29']].

~~~text الناتج
{"day": "2026-09-29", "count": 3}
~~~

ومن غير [[default]]:

~~~text الناتج: ويندوز (3.14)، آخر سطور
TypeError: Object of type date is not JSON serializable
when serializing dict item 'day'
~~~

JSON مفيهوش نوع تاريخ، فـ Python بيرفض بدل ما يخمّن. والسطر التاني ([[when serializing dict item 'day']]) جديد في 3.14 وبيقولك الخانة اللي عملت المشكلة؛ على لينكس بـ 3.13 طلع السطر الأول بس.

---

## ٩. الحل: ملخص لكل مدينة

~~~python solCode (القلب)
for row in csv.DictReader(f):
    city = row["city"].strip()
    s = by_city.setdefault(city, {"city": city, "orders": 0, "total": 0.0})
    s["orders"] += 1
    s["total"] = round(s["total"] + float(row["total"]), 2)
return sorted(by_city.values(), key=lambda s: s["total"], reverse=True)
~~~

- [[strip()]]: بيشيل المسافات من الأطراف، فـ [[" Cairo"]] تبقى [["Cairo"]].
- [[setdefault(key, default)]]: لو المفتاح موجود رجّع قيمته، ولو لأ حط الـ default ورجّعه. فأول مرة المدينة تتعمل بأصفار، وبعد كده بنزوّد على نفس الـ dict.
- [[round(..., 2)]]: [[0.1 + 0.2]] بتطلع [[0.30000000000000004]] (الـ float بيتخزن binary ومش كل الكسور العشرية ليها تمثيل مظبوط)، فبنقرّب بعد كل جمع.
- [[sorted(..., key=lambda s: s["total"], reverse=True)]]: رتّب بالإجمالي، و [[reverse=True]] من الكبير للصغير. و [[lambda s: s["total"]]] دالة صغيرة من غير اسم بترجّع الخانة اللي نرتّب بيها.

~~~text الناتج (ملف فيه " Cairo" بمسافة في الصف التالت)
[{'city': 'Cairo', 'orders': 2, 'total': 195.5}, {'city': 'Alex', 'orders': 1, 'total': 80.0}]
city,orders,total
Cairo,2,195.5
Alex,1,80.0
~~~

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقرا CSV | [[csv.DictReader(f)]] والملف مفتوح بـ [[newline=""]] و [[encoding="utf-8"]] |
| تكتب CSV | [[csv.DictWriter(f, fieldnames=[...])]] و [[writeheader()]] و [[writerows()]] |
| من وإلى string JSON | [[json.loads]] و [[json.dumps]] |
| من وإلى ملف مفتوح | [[json.load(f)]] و [[json.dump(obj, f)]] |
| عربي مقروء ومنظّم | [[ensure_ascii=False, indent=2]] |
| تاريخ جوه JSON | حوّله بنفسك أو [[default=str]] |

- كل قيمة من CSV string: حوّلها بـ [[int]] و [[float]] بنفسك.
- متقسّمش CSV بـ [[split(",")]].`,
          lines: [
            "import csv.",
            "import json.",
            "للتاريخ.",
            "المسارات.",
            R`افتح الـ CSV بـ [[newline=""]] و utf-8.`,
            R`كل صف dict، و [[list]] عشان نقرا الكل قبل ما الملف يتقفل.`,
            "الاسم اللي فيه فاصلة اتقري صح، وكل القيم strings.",
            "لف على الصفوف.",
            "حوّل id لرقم بنفسك.",
            "والإجمالي.",
            R`اكتب JSON: [[ensure_ascii=False]] للعربي و [[indent=2]] للقراية.`,
            R`[[loads]]: من string لـ list of dicts.`,
            "فلتر.",
            "افتح ملف CSV للكتابة.",
            R`الأعمدة وترتيبها، و [[extrasaction="ignore"]] بيتجاهل city.`,
            "سطر العناوين.",
            "كل الصفوف مرة واحدة.",
            "ملف JSON Lines.",
            "لف على الطلبات.",
            "كل سطر JSON كامل لوحده.",
            R`dict فيه [[date]].`,
            R`[[default=str]]: أي نوع مش معروف يتحول string.`,
            R`من غيره: [[TypeError]].`
          ]
        },
        {
          cmd: "datetime و zoneinfo",
          title: "تواريخ بتوقيت صح: خزّن UTC واعرض بتوقيت القاهرة",
          desc: R`فيه نوعين [[datetime]]: naive (ملوش timezone، [[tzinfo]] بـ None) و aware (عارف هو توقيت إيه). الـ naive هو مصدر أغلب bugs الوقت: [[datetime.now()]] بيرجع وقت السيرفر، والسيرفر ممكن يبقى UTC والمستخدم في القاهرة.

القاعدة: جوه البرنامج وفي القاعدة كل حاجة aware بـ UTC ([[datetime.now(UTC)]]، و [[timestamptz]] في Postgres). وبس وقت العرض حوّل لتوقيت المستخدم بـ [[astimezone(ZoneInfo("Africa/Cairo"))]]. و [[zoneinfo]] في المكتبة الأساسية من 3.9 وبيقرا قاعدة التوقيتات بتاعة النظام، فبيعرف التوقيت الصيفي لوحده. وويندوز مفيهوش القاعدة دي، فهناك لازم [[pip install tzdata]] في الـ venv، وإلا [[ZoneInfoNotFoundError]].`,
          example: R`from datetime import UTC, date, datetime, timedelta
from zoneinfo import ZoneInfo
CAIRO = ZoneInfo("Africa/Cairo")
now = datetime.now(UTC)
print(now.isoformat())                         # 2026-09-29T09:15:00.123456+00:00
naive = datetime.now()
print(naive.tzinfo)                            # None: مش عارف هو توقيت إيه
created = datetime(2026, 9, 29, 21, 30, tzinfo=UTC)
local = created.astimezone(CAIRO)
print(local)                                   # 2026-09-30 00:30:00+03:00: اليوم اتغير!
print(local.strftime("%d/%m/%Y %I:%M %p"))     # 30/09/2026 12:30 AM
winter = datetime(2026, 1, 15, 12, tzinfo=UTC).astimezone(CAIRO)
print(winter.utcoffset())                      # 2:00:00: الشتا +2 والصيف +3
meeting = datetime(2026, 10, 5, 10, 0, tzinfo=CAIRO)
print(meeting.astimezone(UTC))                 # 2026-10-05 07:00:00+00:00
parsed = datetime.fromisoformat("2026-09-29T10:00:00Z")
print(parsed.tzinfo, parsed + timedelta(days=30))
day_start = datetime.combine(local.date(), datetime.min.time(), tzinfo=CAIRO).astimezone(UTC)
print(day_start)                               # 2026-09-29 21:00:00+00:00
print(date(2026, 12, 25) - date(2026, 9, 29))  # 87 days, 0:00:00
naive < now                                    # TypeError: can't compare offset-naive and offset-aware datetimes`,
          try: R`عندك طلبات بأوقات UTC: [["2026-09-29T20:59:00Z"]] و [["2026-09-29T21:00:00Z"]] و [["2026-09-30T12:00:00Z"]] و [["2026-09-30T20:59:59Z"]] و [["2026-09-30T21:00:00Z"]]. اكتب [[cairo_day_range(d)]] بترجع بداية ونهاية يوم بتوقيت القاهرة كـ UTC، واستخدمها تعد «طلبات يوم 30 سبتمبر» زي ما المحل في القاهرة شايفها. وبعدين اطبع التاريخ المحلي لكل طلب.`,
          sol: R`يوم 30 سبتمبر في القاهرة (التوقيت الصيفي، +3) من [[2026-09-29 21:00:00+00:00]] لحد [[2026-09-30 21:00:00+00:00]]، فالطلبات [[3]]: التاني والتالت والرابع. والتواريخ المحلية: [[['2026-09-29', '2026-09-30', '2026-09-30', '2026-09-30', '2026-10-01']]].

الغلط المشهور إنك تعد بتاريخ UTC ([[o.startswith("2026-09-30")]])، فتطلع ٢ بس: الطلب اللي الساعة 9 بالليل UTC (12 بعد نص الليل في القاهرة) هيتحسب على اليوم اللي قبله. والفترة نصها مفتوح ([[start <= t < end]]) عشان مفيش طلب يتحسب في يومين. ومتحسبش الفرق بإيدك ([[timedelta(hours=3)]])، لأن مصر بترجع +2 في الشتا: من 2023 التوقيت الصيفي من آخر جمعة في أبريل لآخر خميس في أكتوبر (في 2026 من 24 أبريل لـ 29 أكتوبر)، و [[ZoneInfo]] بيعرف ده لوحده من قاعدة tzdata.`,
          solCode: R`from datetime import UTC, date, datetime, time, timedelta
from zoneinfo import ZoneInfo
CAIRO = ZoneInfo("Africa/Cairo")
orders = ["2026-09-29T20:59:00Z", "2026-09-29T21:00:00Z", "2026-09-30T12:00:00Z",
          "2026-09-30T20:59:59Z", "2026-09-30T21:00:00Z"]
def cairo_day_range(d: date) -> tuple[datetime, datetime]:
    start = datetime.combine(d, time.min, tzinfo=CAIRO)
    end = datetime.combine(d + timedelta(days=1), time.min, tzinfo=CAIRO)
    return start.astimezone(UTC), end.astimezone(UTC)
start, end = cairo_day_range(date(2026, 9, 30))
print(start, end)
todays = [o for o in orders if start <= datetime.fromisoformat(o) < end]
print(len(todays), todays)
by_local_day = [datetime.fromisoformat(o).astimezone(CAIRO).date().isoformat() for o in orders]
print(by_local_day)`,
          flag: "script",
          deep: {
            why: R`«طلبات النهارده» و «الكوبون ينتهي آخر اليوم» و «الحجز الساعة 10»: كلهم وقت، وكلهم بيبوظوا لو السيرفر في منطقة زمنية والمستخدم في منطقة تانية، أو لما التوقيت الصيفي يبدأ. والـ bugs دي بتظهر مرتين في السنة أو لعميل في بلد تاني، فبتبقى صعبة جدًا تلاقيها.`,
            how: R`[[datetime.now(UTC)]] aware، و [[datetime.now()]] و [[datetime.utcnow()]] naive (الأخيرة deprecated من 3.12 لأنها بترجع وقت UTC من غير ما تقول إنه UTC). و [[UTC]] اختصار لـ [[timezone.utc]] من 3.11.

[[astimezone(tz)]] بيحوّل نفس اللحظة لتوقيت تاني: الساعة بتتغير واللحظة زي ما هي. أما [[replace(tzinfo=tz)]] فبيلزق timezone على نفس الساعة، ودي لحظة تانية خالص، فمتستخدمهاش للتحويل. و [[datetime(..., tzinfo=CAIRO)]] صح مع ZoneInfo (بعكس pytz القديمة).

[[fromisoformat]] بيقرا ISO 8601 بما فيها [[Z]] (من 3.11)، و [[isoformat()]] بيكتبها: ده الشكل اللي تبعته في JSON. و [[strftime]] للعرض ([[%d/%m/%Y %I:%M %p]])، و [[strptime]] للقراية بشكل معين.

[[timedelta]] للفروق والإضافة. و [[date - date]] بيرجع timedelta. والمقارنة بين naive و aware بترمي [[TypeError]]، ودي حماية مفيدة.

ZoneInfo بيقرا [[/usr/share/zoneinfo]]. في Docker images الصغيرة (slim و alpine) ممكن متكونش موجودة، فـ [[ZoneInfoNotFoundError]]: سطّب [[tzdata]] من pip أو apt. وعلى ويندوز مفيش قاعدة توقيتات من النظام خالص، فـ [[tzdata]] من pip لازم في أي مشروع بيستخدم ZoneInfo. وفي ساعة التغيير فيه أوقات بتتكرر (فصل الشتا) والـ [[fold]] بيفرّق بينهم.`,
            when: R`UTC aware في كل حتة جوه الكود والقاعدة والـ APIs. التوقيت المحلي بس في العرض، أو لما «اليوم» نفسه ليه معنى محلي (تقرير يومي، مواعيد عمل، حجز). ولو المستخدمين في أكتر من بلد، خزّن timezone كل مستخدم ([["Africa/Cairo"]]) واستخدمه في العرض. وفي JS نفس القاعدة (تاب JavaScript درس «UTC و Intl.DateTimeFormat»).`,
            mistakes: R`[[datetime.now()]] على السيرفر. و [[+ timedelta(hours=2)]] كتوقيت مصر (بيبوظ نص السنة). و [[replace(tzinfo=...)]] للتحويل. وتقارن تاريخ UTC بتاريخ محلي. و [[timestamp]] من غير timezone في Postgres. وتخزّن الوقت كـ string بشكل محلي ([["30/09/2026 12:30 AM"]]) مش ISO.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل أوقات بـ UTC، ويحوّلها لتوقيت القاهرة وبالعكس، ويوريك إن الفرق +3 في الصيف و +2 في الشتا، ويقرا وقت من نص ISO، ويحسب بداية اليوم، وفي الآخر يوريك الـ TypeError اللي بيحميك من خلط النوعين. اتشغّل على ويندوز (Python 3.14.3 في venv فيه [[tzdata]]) وعلى لينكس ([[python:3.13-slim]] في Docker)، والنواتج واحدة غير أول سطر (الوقت الحالي).

> على ويندوز من غير [[tzdata]]، أول سطر [[ZoneInfo("Africa/Cairo")]] بيقع: [[ZoneInfoNotFoundError: 'No time zone found with key Africa/Cairo']]. لينكس فيه القاعدة في [[/usr/share/zoneinfo]]، وويندوز لأ، فلازم [[pip install tzdata]] (أو [[uv add tzdata]]).

---

## ١. الـ imports والمنطقة الزمنية

~~~python
from datetime import UTC, date, datetime, timedelta
from zoneinfo import ZoneInfo
CAIRO = ZoneInfo("Africa/Cairo")
~~~

| الاسم | هو إيه |
|---|---|
| [[datetime]] | تاريخ ووقت مع بعض: 2026-09-29 21:30 |
| [[date]] | تاريخ بس: 2026-09-29 |
| [[timedelta]] | مدة: ٣٠ يوم، ٣ ساعات |
| [[UTC]] | المنطقة الزمنية UTC (موجود من 3.11، قبلها [[timezone.utc]]) |
| [[ZoneInfo("Africa/Cairo")]] | منطقة القاهرة بكل قواعدها: إمتى +2 وإمتى +3 |

- UTC = Coordinated Universal Time: الساعة المرجعية للعالم كله، ملهاش توقيت صيفي.
- [["Africa/Cairo"]] اسم من قاعدة اسمها IANA tz database (أو tzdata)، فيها تاريخ كل التغييرات في توقيت كل بلد. والـ [[tzdata]] اللي اتسطّب هنا نسخة [[2026e]].
- [[CAIRO]] بحروف كبيرة: عرف للثوابت.

---

## ٢. aware و naive

~~~python
now = datetime.now(UTC)
print(now.isoformat())
naive = datetime.now()
print(naive.tzinfo)
~~~

~~~text الناتج
2026-10-07T09:07:44.241526+00:00
None
~~~

- [[datetime.now(UTC)]]: الوقت دلوقتي، **ومعاه** إنه UTC. ده اسمه **aware** (عارف هو توقيت إيه).
- [[isoformat()]]: يكتبه بصيغة ISO 8601: التاريخ، وبعدين [[T]] تفصل الوقت، والثواني بكسورها (microseconds)، وفي الآخر [[+00:00]] يعني «فرق صفر عن UTC». ده الشكل اللي تبعته في JSON.
- [[datetime.now()]] من غير حاجة: وقت الجهاز، من غير أي معلومة عن المنطقة. ده **naive**، و [[tzinfo]] بتاعه [[None]]. الرقم نفسه بيختلف حسب الجهاز: على لاب توب في مصر ساعة مصر، وجوه Docker كان UTC. فنفس الكود بيدّي أوقات مختلفة على جهازك وعلى السيرفر.

---

## ٣. [[astimezone]]: نفس اللحظة بساعة تانية

~~~python
created = datetime(2026, 9, 29, 21, 30, tzinfo=UTC)
local = created.astimezone(CAIRO)
print(local)
print(local.strftime("%d/%m/%Y %I:%M %p"))
~~~

~~~text الناتج
2026-09-30 00:30:00+03:00
30/09/2026 12:30 AM
~~~

- [[datetime(2026, 9, 29, 21, 30, tzinfo=UTC)]]: سنة، شهر، يوم، ساعة، دقيقة، و [[tzinfo=UTC]] بيقول إن الساعة دي UTC.
- [[astimezone(CAIRO)]]: «نفس اللحظة دي، الساعة كام في القاهرة؟». سبتمبر صيفي، فـ +3: 21:30 + 3 = 00:30 **يوم 30**. التاريخ نفسه اتغير، وده سبب إن «طلبات النهارده» بتطلع غلط لو عدّيت بتاريخ UTC.
- [[strftime]] = string format time: حوّله نص بالشكل اللي تحدده:

| الرمز | معناه | هنا |
|---|---|---|
| [[%d]] | اليوم برقمين | 30 |
| [[%m]] | الشهر برقمين | 09 |
| [[%Y]] | السنة كاملة | 2026 |
| [[%I]] | الساعة من 01 لـ 12 | 12 |
| [[%M]] | الدقيقة | 30 |
| [[%p]] | AM أو PM | AM |

([[%H]] الساعة من 00 لـ 23.) خلي بالك: [[%M]] كابيتال دقيقة و [[%m]] صغيرة شهر.

> الغلط المشهور [[replace(tzinfo=CAIRO)]] بدل [[astimezone]]. جربناه على نفس [[created]]: طلع [[2026-09-29 21:30:00+03:00]]، يعني لزق «القاهرة» على نفس الساعة، ودي لحظة تانية خالص (18:30 UTC، فرق ٣ ساعات).

---

## ٤. الصيف والشتا

~~~python
winter = datetime(2026, 1, 15, 12, tzinfo=UTC).astimezone(CAIRO)
print(winter.utcoffset())
~~~

~~~text الناتج
2:00:00
~~~

[[utcoffset()]] الفرق عن UTC كـ timedelta: ساعتين في يناير. لفّينا على كل ساعات 2026 ودورنا إمتى الفرق بيتغير:

~~~text الناتج
change at 2026-04-23 22:00:00+00:00 -> 2026-04-24 01:00:00+03:00
change at 2026-10-29 21:00:00+00:00 -> 2026-10-29 23:00:00+02:00
~~~

يعني الساعة بتتقدم أول يوم 24 أبريل (جمعة) وبترجع آخر يوم 29 أكتوبر (خميس). [[ZoneInfo]] عارف ده لوحده، و [[timedelta(hours=3)]] الثابتة هتغلط نص السنة.

---

## ٥. من القاهرة لـ UTC

~~~python
meeting = datetime(2026, 10, 5, 10, 0, tzinfo=CAIRO)
print(meeting.astimezone(UTC))
~~~

~~~text الناتج
2026-10-05 07:00:00+00:00
~~~

ميعاد الساعة 10 الصبح بتوقيت القاهرة. مع [[ZoneInfo]] ينفع تحطه في [[tzinfo=]] على طول، وهو بيحسب الفرق الصح لليوم ده (5 أكتوبر لسه صيفي، +3). والعكس بـ [[astimezone(UTC)]]: ده اللي يتخزن في القاعدة.

---

## ٦. [[fromisoformat]] و [[timedelta]]

~~~python
parsed = datetime.fromisoformat("2026-09-29T10:00:00Z")
print(parsed.tzinfo, parsed + timedelta(days=30))
~~~

~~~text الناتج
UTC 2026-10-29 10:00:00+00:00
~~~

- [[fromisoformat]]: العكس بتاع [[isoformat]]، بيقرا النص. و [[Z]] في الآخر (اختصار Zulu) يعني UTC، فالناتج aware. (قراية [[Z]] اتضافت في 3.11.) ولو النص من غير [[Z]] ولا [[+03:00]]، الناتج naive: [["2026-09-29T10:00:00"]] طلع [[2026-09-29 10:00:00]] من غير offset.
- [[+ timedelta(days=30)]]: زوّد ٣٠ يوم.

---

## ٧. بداية اليوم في القاهرة كـ UTC

~~~python
day_start = datetime.combine(local.date(), datetime.min.time(), tzinfo=CAIRO).astimezone(UTC)
~~~

من جوه لبرة:

1. [[local.date()]]: التاريخ بس من [[local]]: [[2026-09-30]].
2. [[datetime.min.time()]]: الساعة صفر ([[00:00:00]]). ونفس القيمة اسمها [[time.min]] (اللي في الحل).
3. [[datetime.combine(date, time, tzinfo=CAIRO)]]: ركّب تاريخ وساعة في datetime واحد بتوقيت القاهرة: [[2026-09-30 00:00+03:00]].
4. [[.astimezone(UTC)]]: نفس اللحظة بـ UTC.

~~~text الناتج
2026-09-29 21:00:00+00:00
~~~

يوم 30 في القاهرة بيبدأ الساعة 9 بالليل يوم 29 بـ UTC. ده الرقم اللي تحطه في [[WHERE created_at >= ...]].

---

## ٨. الفرق بين تاريخين، والمقارنة الممنوعة

~~~text الناتج: print(date(2026, 12, 25) - date(2026, 9, 29))
87 days, 0:00:00
~~~

طرح تاريخين بيرجّع [[timedelta]]، وده شكل طباعته: أيام، وبعدين ساعات:دقايق:ثواني. ولو عايز الرقم بس: [[.days]].

~~~text الناتج: naive < now
TypeError: can't compare offset-naive and offset-aware datetimes
~~~

offset-naive = من غير فرق عن UTC، و offset-aware = معاه. Python بيرفض يقارنهم لأنه مش عارف [[naive]] ده ساعة أنهي بلد. ده حماية: لو شفت الخطأ ده يبقى فيه وقت naive داخل الكود، دوّر عليه.

---

## ٩. الحل: طلبات يوم في القاهرة

~~~python solCode (القلب)
def cairo_day_range(d: date) -> tuple[datetime, datetime]:
    start = datetime.combine(d, time.min, tzinfo=CAIRO)
    end = datetime.combine(d + timedelta(days=1), time.min, tzinfo=CAIRO)
    return start.astimezone(UTC), end.astimezone(UTC)
start, end = cairo_day_range(date(2026, 9, 30))
todays = [o for o in orders if start <= datetime.fromisoformat(o) < end]
~~~

- البداية نص ليل اليوم، والنهاية نص ليل **اليوم اللي بعده**، والاتنين بيتحوّلوا UTC.
- [[-> tuple[datetime, datetime] ]]: الدالة بترجّع اتنين، و [[start, end = ...]] بيفكّهم.
- [[start <= t < end]]: الفترة مقفولة من الأول ومفتوحة من الآخر، فطلب الساعة 21:00:00 بالظبط بيتحسب في يوم واحد بس.

~~~text الناتج (ويندوز ولينكس)
2026-09-29 21:00:00+00:00 2026-09-30 21:00:00+00:00
3 ['2026-09-29T21:00:00Z', '2026-09-30T12:00:00Z', '2026-09-30T20:59:59Z']
['2026-09-29', '2026-09-30', '2026-09-30', '2026-09-30', '2026-10-01']
~~~

السطر الأخير: كل طلب اتحوّل لتوقيت القاهرة وخدنا تاريخه بس ([[.date().isoformat()]]). الطلب [[2026-09-30T21:00:00Z]] تاريخه UTC يوم 30، بس في القاهرة بقى يوم 1 أكتوبر.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الوقت دلوقتي للتخزين | [[datetime.now(UTC)]] |
| نفس اللحظة بتوقيت تاني | [[dt.astimezone(ZoneInfo("Africa/Cairo"))]] |
| ميعاد مكتوب بتوقيت القاهرة | [[datetime(..., tzinfo=CAIRO)]] |
| نص ISO ← datetime ← نص ISO | [[fromisoformat]] و [[isoformat]] |
| شكل للعرض | [[strftime("%d/%m/%Y %I:%M %p")]] |
| بداية يوم محلي | [[datetime.combine(d, time.min, tzinfo=CAIRO)]] |

- متستخدمش [[datetime.now()]] من غير UTC، ولا [[replace(tzinfo=...)]] للتحويل، ولا [[timedelta(hours=3)]] كتوقيت مصر.
- على ويندوز سطّب [[tzdata]].`,
          lines: [
            R`[[UTC]] (3.11+) و [[date]] و [[timedelta]].`,
            "قاعدة التوقيتات.",
            "توقيت القاهرة، بالتوقيت الصيفي.",
            "الوقت دلوقتي aware بـ UTC: ده اللي تخزّنه.",
            R`ISO 8601 بـ [[+00:00]]: الشكل اللي تبعته في JSON.`,
            "naive: وقت السيرفر من غير timezone.",
            "None: مفيش حاجة تقول ده توقيت إيه.",
            "طلب اتعمل 9:30 بالليل UTC.",
            "نفس اللحظة بتوقيت القاهرة.",
            "بقى 12:30 بعد نص الليل، يوم 30 مش 29.",
            "للعرض.",
            "تاريخ في الشتا.",
            "الفرق +2، مش +3.",
            "ميعاد مكتوب بتوقيت القاهرة.",
            "حوّله لـ UTC للتخزين.",
            R`اقرا ISO، و [[Z]] يعني UTC.`,
            "aware، والإضافة بـ timedelta.",
            "بداية يوم 30 في القاهرة، كـ UTC: للاستعلام من القاعدة.",
            "9 بالليل يوم 29 UTC.",
            "الفرق بين تاريخين.",
            "naive و aware مينفعش يتقارنوا: TypeError."
          ]
        },
        {
          cmd: "re",
          title: "regex في Python: search و findall و sub و groups",
          desc: R`[[re]] مكتبة الـ regex في Python. نفس اللغة اللي اتشرحت في تاب JavaScript (درس «regex: classes و quantifiers» ودرس «groups و flags»)، والفروق في طريقة النداء: [[re.search]] أول تطابق في أي حتة، و [[re.match]] من أول الـ string بس، و [[re.fullmatch]] الـ string كلها، و [[re.findall]] كل التطابقات، و [[re.sub]] استبدال، و [[re.split]] تقسيم.

واكتب الـ pattern دايمًا raw string: [[r"\d+"]]، عشان الـ backslash يوصل للـ regex زي ما هو. ولو هتستخدم نفس الـ pattern كتير: [[re.compile]] مرة واحدة.`,
          example: R`import re
PHONE = re.compile(r"^01[0125]\d{8}$")
print(bool(PHONE.match("01012345678")), bool(PHONE.match("0101234567")))   # True False
print(re.fullmatch(r"\d{4}-\d{2}-\d{2}", "2026-09-29") is not None)        # True
line = '10.0.0.7 - - [29/Sep/2026:10:00:01 +0000] "GET /api/users HTTP/1.1" 500 12'
m = re.search(r'"(?P<method>[A-Z]+) (?P<path>\S+) [^"]*" (?P<status>\d{3})', line)
if m:
    print(m["method"], m["path"], int(m["status"]))                        # GET /api/users 500
text = "كلمني على 01012345678 أو 01298765432"
print(re.findall(r"01\d{9}", text))
print(re.sub(r"(01\d)\d{5}(\d{3})", r"\1*****\2", text))
print(re.split(r"\s*[,;]\s*", "tea , coffee;juice"))                     # ['tea', 'coffee', 'juice']
slug = re.sub(r"[^a-z0-9]+", "-", "Hello, FastAPI World!".lower()).strip("-")
print(slug)                                                                 # hello-fastapi-world
print(re.findall(r"<.+?>", "<b>hi</b>"), re.findall(r"<.+>", "<b>hi</b>"))
print(re.escape("price (EGP)?"))`,
          try: R`عندك سطور لوج بالشكل اللي في المثال (IP وبعدين التاريخ وبعدين [["GET /path HTTP/1.1"]] وبعدين الـ status). اكتب pattern بـ named groups يطلّع الـ IP والـ method والـ path (من غير query string) والـ status، وعدّ أخطاء الـ 5xx لكل path، وعدّ السطور اللي مطابقتش بدل ما توقّع البرنامج. خلي في الداتا [[/api/users?page=2]] وسطر بايظ.`,
          sol: R`الناتج: [[{'/api/users': 2} skipped: 1]]. الطلبين على [[/api/users]] و [[/api/users?page=2]] اتحسبوا path واحد لأن الـ group بتاع الـ path [[[^ ?"]+]] بيقف عند [[?]]، والسطر البايظ اتعد في [[skipped]] بدل ما [[m["status"]]] ترمي [[TypeError: 'NoneType' object is not subscriptable]].

دي أشهر غلطة مع [[re]]: [[search]] و [[match]] بيرجعوا [[None]] لو مفيش تطابق، فلازم [[if m:]] قبل ما تستخدم الـ groups. والتانية [[.*]] الطماعة: [[".*"]] على السطر كله ممكن تبلع من أول علامة تنصيص لآخر واحدة، فاستخدم [[.*?]] أو class محدد زي [[[^"]*]]. ولاحظ إن [[m["status"]]] string، فلو هتقارن بأرقام حوّلها [[int]].`,
          solCode: R`import re
LOG = """10.0.0.7 - - [29/Sep/2026:10:00:01 +0000] "GET /api/users HTTP/1.1" 500 12
10.0.0.8 - - [29/Sep/2026:10:00:02 +0000] "POST /api/orders HTTP/1.1" 201 88
10.0.0.7 - - [29/Sep/2026:10:00:03 +0000] "GET /api/users?page=2 HTTP/1.1" 502 0
bad line here
10.0.0.9 - - [29/Sep/2026:10:00:04 +0000] "GET /health HTTP/1.1" 200 2"""
LINE = re.compile(r'^(?P<ip>\S+) .*?"(?P<method>[A-Z]+) (?P<path>[^ ?"]+)\S* [^"]*" (?P<status>\d{3}) ')
errors: dict[str, int] = {}
skipped = 0
for line in LOG.splitlines():
    m = LINE.match(line)
    if not m:
        skipped += 1
        continue
    if m["status"].startswith("5"):
        errors[m["path"]] = errors.get(m["path"], 0) + 1
print(errors, "skipped:", skipped)`,
          flag: "script",
          deep: {
            why: R`تحليل لوج، وتنضيف داتا جاية من CSV، وفحص شكل رقم تليفون أو كود، و slug من عنوان: كلها regex. و Pydantic نفسه بيقبل [[pattern=]] في [[Field]] (المستوى ٢) بنفس الصيغة.`,
            how: R`[[re.match]] بيطابق من أول الـ string بس (مش لازم لآخرها)، و [[re.fullmatch]] لازم الـ string كلها تطابق: ده اللي عايزه في الـ validation بدل [[^...$]]، لأن [[$]] في Python بيقبل newline في الآخر ([[re.match(r"^\d+$", "12\n")]] بتنجح!).

الـ match object: [[m.group(1)]] أو [[m["name"]]] للـ named group [[(?P<name>...)]] (في JS الصيغة [[(?<name>...)]] من غير P، و Python بيرفضها بـ [[unknown extension]]، فافتكر الـ P). و [[m.groupdict()]] dict بكل الـ named groups.

[[findall]] بيرجع list strings، ولو فيه groups بيرجع الـ groups مش التطابق كله (فخ مشهور). و [[finditer]] بيرجع match objects واحد واحد. و [[sub]] بيقبل [[\1]] في الاستبدال، أو دالة بتاخد الـ match وترجع النص.

الـ flags: [[re.IGNORECASE]] و [[re.MULTILINE]] ([[^]] و [[$]] لكل سطر) و [[re.VERBOSE]] (تكتب الـ pattern على كذا سطر بتعليقات). و [[\d]] في Python بيطابق الأرقام العربية ([[٣]]) كمان لأن الـ strings Unicode؛ لو عايز 0-9 بس: [[[0-9]]] أو [[re.ASCII]].

[[re.escape(s)]] لما بتحط input من المستخدم جوه pattern، عشان [[(]] و [[?]] ميتفهموش كـ regex.`,
            when: R`نمط في نص: فحص شكل، استخراج، استبدال. لكن لو فيه أداة متخصصة استخدمها: [[str.startswith]] و [[in]] و [[split]] للحاجات البسيطة، و [[json]] و [[csv]] و [[urllib.parse]] و [[email.utils]] للصيغ المعروفة، و HTML parser للـ HTML. وتاب JavaScript فيه درس «إمتى regex غلط» بنفس الكلام.`,
            mistakes: R`pattern من غير [[r""]] ([["\d"]] بتطلّع SyntaxWarning، و [["\b"]] بتبقى backspace مش word boundary). و [[re.match]] وانت قصدك search أو fullmatch. ونسيان [[if m:]]. و [[.*]] طماعة. و regex للإيميل طوله ٣ سطور (فحص بسيط + إيميل تأكيد أحسن). و regex متداخل زي [[(a+)+]] على input من المستخدم: ممكن ياخد وقت أُسّي (ReDoS).`
          },
          teach: R`## المثال بيعمل إيه؟

١٠ استخدامات لـ [[re]] ورا بعض: فحص رقم موبايل وتاريخ، واستخراج أجزاء من سطر لوج، ولقط كل الأرقام من نص، وتنجيمها، وتقسيم بفواصل مختلفة، وعمل slug، والفرق بين الطماع والكسول، و [[escape]]. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) وطلع نفس الناتج.

لغة الـ regex نفسها ([[\d]] و [[+]] و [[[...]]] و groups) مشروحة بالتفصيل في تاب JavaScript، فهنا هنركّز على إزاي Python بيناديها، ونشرح الرموز بسرعة أول ما تظهر.

---

## ١. [[re.compile]] و [[match]]

~~~python
import re
PHONE = re.compile(r"^01[0125]\d{8}$")
print(bool(PHONE.match("01012345678")), bool(PHONE.match("0101234567")))
~~~

~~~text الناتج
True False
~~~

### الـ pattern حتة حتة

| الحتة | معناها |
|---|---|
| [[^]] | أول الـ string |
| [[01]] | الحرفين دول بالظبط |
| [[[0125]]] | حرف واحد من دول: 0 أو 1 أو 2 أو 5 |
| [[\d]] | رقم (digit) |
| [[{8}]] | اللي قبلي ٨ مرات بالظبط |
| [[$]] | آخر الـ string |

يعني ١١ رقم: 01 وبعدين 0 أو 1 أو 2 أو 5 وبعدين ٨ أرقام. الرقم التاني فيه ١٠ أرقام بس فـ False.

### [[r"..."]]

[[r]] قبل التنصيص = **raw string**: الـ backslash يفضل backslash. من غيرها Python نفسه بيحاول يفهم [[\d]] كـ escape قبل ما توصل للـ regex. جربنا [[re.findall("\d", "a1")]] من غير r:

~~~text الناتج
SyntaxWarning: "\d" is an invalid escape sequence. Such sequences will not work in the future. Did you mean "\\d"? A raw string is also an option.
['1']
~~~

اشتغلت المرة دي بالصدفة، بس [["\b"]] مثلًا بتبقى حرف backspace مش word boundary من غير ما يقولك.

### [[compile]] و [[match]] و [[bool]]

- [[re.compile]]: حوّل الـ pattern لـ object مرة واحدة، وبعدين استخدمه كتير.
- [[.match(s)]]: جرّب من **أول** الـ string. بيرجّع match object لو نجح، أو [[None]].
- [[bool(...)]]: match object يبقى True و None يبقى False.

> [[$]] في Python بيقبل [[\n]] واحدة في الآخر: [[PHONE.match("01012345678\n")]] طلعت True. عشان كده الـ deep بيقول للـ validation استخدم [[fullmatch]].

---

## ٢. [[re.fullmatch]]

~~~python
print(re.fullmatch(r"\d{4}-\d{2}-\d{2}", "2026-09-29") is not None)
~~~

~~~text الناتج
True
~~~

[[fullmatch]] = الـ string **كلها** لازم تطابق، فمش محتاج [[^]] و [[$]]. والـ pattern: ٤ أرقام، شرطة، رقمين، شرطة، رقمين. و [[is not None]] بيقول «لقى تطابق؟». وجربنا [[re.fullmatch(r"\d+", "12\n")]]: طلعت [[None]]، يعني الـ newline اتمسكت.

| الدالة | بتدوّر فين |
|---|---|
| [[re.match]] | من أول الـ string (والباقي مش مهم) |
| [[re.fullmatch]] | الـ string كلها |
| [[re.search]] | أي حتة |

---

## ٣. [[re.search]] و named groups: سطر لوج

~~~python
line = '10.0.0.7 - - [29/Sep/2026:10:00:01 +0000] "GET /api/users HTTP/1.1" 500 12'
m = re.search(r'"(?P<method>[A-Z]+) (?P<path>\S+) [^"]*" (?P<status>\d{3})', line)
if m:
    print(m["method"], m["path"], int(m["status"]))
~~~

الـ string بـ [[']] من برّه عشان جواها [["]]. والـ pattern:

| الحتة | معناها | مسكت |
|---|---|---|
| [["]] | علامة التنصيص اللي قبل GET | |
| [[(?P<method>[A-Z]+)]] | group اسمه method: حرف كبير أو أكتر ([[+]] = مرة أو أكتر) | [[GET]] |
| مسافة | | |
| [[(?P<path>\S+)]] | group اسمه path: أي حاجة مش مسافة ([[\S]]) | [[/api/users]] |
| [[ [^"]*"]] | مسافة، وبعدين أي حاجة مش [["]] صفر مرة أو أكتر ([[*]])، وبعدين [["]] | [[ HTTP/1.1"]] |
| [[(?P<status>\d{3})]] | group اسمه status: ٣ أرقام | [[500]] |

- [[(...)]] = group: بيمسك الجزء ده عشان تاخده بعدين. و [[?P<name>]] بيدّيه اسم. الـ P دي خاصة بـ Python: صيغة JavaScript [[(?<name>...)]] جربناها في Python وطلعت [[error: unknown extension ?<n at position 1]].
- [[re.search]]: الـ pattern مش في أول السطر (أوله IP)، فـ [[match]] كانت هترجع None.
- [[if m:]]: لو مفيش تطابق [[m]] بـ None، و [[None["method"]]] بيرمي TypeError.
- [[m["method"]]]: قيمة الـ group بالاسم. ونفس الحاجة [[m.group("method")]]، وبالرقم [[m[1]]]، و [[m.group(0)]] التطابق كله.
- [[int(m["status"])]]: كل اللي بيطلع من regex strings.

~~~text الناتج
GET /api/users 500
~~~

---

## ٤. [[findall]] و [[sub]]

~~~python
text = "كلمني على 01012345678 أو 01298765432"
print(re.findall(r"01\d{9}", text))
print(re.sub(r"(01\d)\d{5}(\d{3})", r"\1*****\2", text))
~~~

~~~text الناتج
['01012345678', '01298765432']
كلمني على 010*****678 أو 012*****432
~~~

- [[findall]]: كل التطابقات في list of strings.
- [[re.sub(pattern, replacement, text)]]: استبدل كل تطابق. الـ pattern فيه groupين: [[(01\d)]] أول ٣ أرقام، و [[(\d{3})]] آخر ٣، و [[\d{5}]] اللي في النص من غير group. والاستبدال [[\1]] يعني «حط اللي group 1 مسكه»، وبعدين ٥ نجوم، وبعدين [[\2]]. والاستبدال نفسه raw string كمان عشان [[\1]].

> فخ [[findall]]: لو الـ pattern فيه groups بيرجّع الـ groups مش التطابق كله. [[re.findall(r"(01\d)\d{8}", ...)]] على نفس الرقمين طلّعت [[['010', '012'] ]] بس.

---

## ٥. [[re.split]] و slug

~~~python
print(re.split(r"\s*[,;]\s*", "tea , coffee;juice"))
slug = re.sub(r"[^a-z0-9]+", "-", "Hello, FastAPI World!".lower()).strip("-")
~~~

~~~text الناتج
['tea', 'coffee', 'juice']
hello-fastapi-world
~~~

- [[\s*[,;]\s*]]: مسافات (أي عدد)، وبعدين فاصلة أو semicolon، وبعدين مسافات. فالفاصل بيتشال هو والمسافات اللي حواليه.
- الـ slug من جوه لبرة: [[.lower()]] الأول ([["hello, fastapi world!"]])، وبعدين [[[^a-z0-9]+]] (الـ [[^]] **جوه** القوسين معناها «مش»: أي حاجة مش حرف صغير أو رقم، مرة أو أكتر) تبقى شرطة واحدة: [["hello-fastapi-world-"]]، وبعدين [[.strip("-")]] بيشيل الشرط من الطرفين.

---

## ٦. طماع وكسول

~~~text الناتج: re.findall(r"<.+?>", "<b>hi</b>") و re.findall(r"<.+>", "<b>hi</b>")
['<b>', '</b>'] ['<b>hi</b>']
~~~

- [[.]] أي حرف، و [[.+]] **طماعة** (greedy): بتاخد أكتر حاجة ممكنة، فمن أول [[<]] لآخر [[>]] في السطر كله.
- [[.+?]] **كسولة** (lazy): الـ [[?]] بعد [[+]] بتقول «أقل حاجة ممكنة»، فبتقف عند أول [[>]].

---

## ٧. [[re.escape]]

~~~text الناتج: print(re.escape("price (EGP)?"))
price\ \(EGP\)\?
~~~

بيحط [[\]] قبل أي رمز ليه معنى في الـ regex ([[(]] و [[)]] و [[?]] والمسافة)، فالنص يتدوّر عليه زي ما هو. استخدمه لما تحط كلام من المستخدم جوه pattern.

---

## ٨. الحل: لوج بـ named groups

~~~python solCode (الـ pattern)
LINE = re.compile(r'^(?P<ip>\S+) .*?"(?P<method>[A-Z]+) (?P<path>[^ ?"]+)\S* [^"]*" (?P<status>\d{3}) ')
~~~

| الحتة | بتمسك |
|---|---|
| [[^(?P<ip>\S+)]] | أول كلمة في السطر: الـ IP |
| [[ .*?"]] | أي حاجة لحد أول [["]] (كسولة عشان متعدّيش للتانية) |
| [[(?P<method>[A-Z]+)]] | GET أو POST |
| [[(?P<path>[^ ?"]+)]] | الـ path لحد مسافة أو [[?]] أو [["]]: من غير query string |
| [[\S*]] | الـ query string لو موجودة ([[?page=2]])، بيبلعها من غير ما يمسكها |
| [[ [^"]*" ]] | ما بعد الـ path لحد [["]] |
| [[(?P<status>\d{3})]] | الـ status |

و [[m.groupdict()]] على السطر التالت:

~~~text الناتج
{'ip': '10.0.0.7', 'method': 'GET', 'path': '/api/users', 'status': '502'}
~~~

والـ loop: [[if not m:]] عدّ السطر في [[skipped]] و [[continue]]، ولو الـ status بيبدأ بـ 5 زوّد عدّاد الـ path.

~~~text الناتج
{'/api/users': 2} skipped: 1
~~~

---

## الخلاصة

| الدالة | بترجّع |
|---|---|
| [[re.match]] / [[re.search]] / [[re.fullmatch]] | match object أو [[None]] |
| [[re.findall]] | list strings (أو الـ groups لو فيه groups) |
| [[re.sub(p, repl, s)]] | string جديدة، و [[\1]] بيرجّع group |
| [[re.split(p, s)]] | list |
| [[re.compile(p)]] | pattern جاهز بنفس الدوال |

- دايمًا [[r"..."]]، ودايمًا [[if m:]] قبل الـ groups.
- [[(?P<name>...)]] بـ P في Python، و [[.*?]] لما [[.*]] تبلع زيادة.`,
          lines: [
            "import.",
            R`[[compile]] مرة واحدة: موبايل مصري ١١ رقم يبدأ بـ 010 أو 011 أو 012 أو 015.`,
            R`[[match]] بيرجع match object أو None، و [[bool]] بيحوّله.`,
            R`[[fullmatch]]: الـ string كلها لازم تطابق.`,
            "سطر لوج.",
            R`[[search]] في أي حتة، و [[(?P<name>...)]] named groups.`,
            R`لازم [[if m]]: لو مفيش تطابق m بـ None.`,
            R`[[m["name"]]] بيجيب الـ group، والناتج strings فحوّل الرقم.`,
            "نص فيه رقمين.",
            R`[[findall]]: كل التطابقات في list.`,
            R`[[sub]] بـ groups: [[\1]] و [[\2]] بيرجّعوا اللي اتمسك، والنص بينجّم الوسط.`,
            R`[[split]] بـ regex: فاصلة أو semicolon بمسافات أو من غير.`,
            "slug: أي حاجة مش حرف أو رقم تبقى شرطة، وشيل الشرط من الأطراف.",
            "hello-fastapi-world.",
            R`[[.+?]] كسولة: أقصر تطابق. و [[.+]] طماعة: بلعت الكل.`,
            R`[[escape]]: لما بتحط نص من المستخدم جوه pattern.`
          ]
        }
      ]
    },
    {
      t: "collections و itertools و functools",
      l: 1,
      n: "أدوات جاهزة في المكتبة الأساسية بتوفّر عليك loops و dicts بتكتبها بإيدك",
      items: [
        {
          cmd: "collections",
          title: "Counter و defaultdict و deque و namedtuple",
          desc: R`[[collections]] فيها أنواع جاهزة لمشاكل بتتكرر: [[Counter]] للعد (dict قيمه أعداد، و [[most_common]])، و [[defaultdict]] للتجميع (المفتاح الجديد بياخد قيمة افتراضية لوحده)، و [[deque]] طابور سريع من الناحيتين وممكن يبقى بحد أقصى ([[maxlen]])، و [[namedtuple]] tuple بأسماء.

درس «dict» فرّج على Counter و defaultdict بسرعة؛ هنا بالتفصيل ومعاهم deque اللي هو أساس أي طابور أو «آخر N حاجة».`,
          example: R`from collections import Counter, defaultdict, deque, namedtuple
words = "tea coffee tea juice tea coffee".split()
c = Counter(words)
print(c.most_common(2))                        # [('tea', 3), ('coffee', 2)]
print(c["water"])                              # 0: مفيش KeyError
c.update(["water", "tea"])
print(c + Counter(juice=4), c.total())
orders = [("Cairo", "sara"), ("Alex", "omar"), ("Cairo", "ali")]
by_city = defaultdict(list)
for city, user in orders:
    by_city[city].append(user)
print(dict(by_city))                           # {'Cairo': ['sara', 'ali'], 'Alex': ['omar']}
tree = defaultdict(lambda: defaultdict(int))
tree["Cairo"]["tea"] += 2
recent = deque(maxlen=3)
for page in ["/", "/a", "/b", "/c"]:
    recent.append(page)
print(recent)                                  # deque(['/a', '/b', '/c'], maxlen=3)
queue = deque(["job1", "job2"])
queue.appendleft("urgent")
print(queue.popleft(), queue.pop())            # urgent job2
Point = namedtuple("Point", ["lat", "lng"])
p = Point(30.04, 31.23)
print(p.lat, p)`,
          try: R`(١) من list عناوين IP، طلّع أكتر اتنين بيبعتوا طلبات بسطر واحد. (٢) اكتب rate limiter بسيط: [[allow(ip, now)]] بترجع True لو الـ IP ده بعت أقل من ٣ طلبات في آخر ١٠ ثواني، بـ [[defaultdict(deque)]]. جرّبها على IP واحد في الأوقات [[0, 1, 2, 3, 9.9, 10.5, 11]].`,
          sol: R`(١) [[Counter(ips).most_common(2)]] بترجع [[[('1.1.1.1', 3), ('2.2.2.2', 2)]]].

(٢) المتوقع [[[True, True, True, False, False, True, True]]]: أول ٣ مسموحين، و 3 و 9.9 مرفوضين (لسه فيه ٣ في آخر ١٠ ثواني)، وعند 10.5 الطلب اللي كان عند 0 خرج من الشباك فيتسمح، وعند 11 اللي عند 1 خرج. و IP تاني ليه deque لوحده فأول طلب ليه True.

الـ [[deque]] هنا بيدّيك [[popleft()]] بـ O(1)؛ لو استخدمت list و [[pop(0)]] كل شيل بيزق العناصر كلها. ولاحظ إن الطلب المرفوض مبيتسجّلش، وإلا الـ IP اللي بيضرب باستمرار هيفضل مقفول للأبد. والنسخة دي في الذاكرة، فمع كذا worker كل واحد شايف عدّ مختلف؛ النسخة الحقيقية في Redis (درس «redis rate limit» في المستوى ٣).`,
          solCode: R`from collections import Counter, defaultdict, deque
ips = ["1.1.1.1", "2.2.2.2", "1.1.1.1", "3.3.3.3", "1.1.1.1", "2.2.2.2"]
print(Counter(ips).most_common(2))
LIMIT, WINDOW = 3, 10.0
hits: defaultdict[str, deque[float]] = defaultdict(deque)
def allow(ip: str, now: float) -> bool:
    q = hits[ip]
    while q and q[0] <= now - WINDOW:
        q.popleft()
    if len(q) >= LIMIT:
        return False
    q.append(now)
    return True
print([allow("1.1.1.1", t) for t in [0, 1, 2, 3, 9.9, 10.5, 11]])
print(allow("2.2.2.2", 3))`,
          flag: "script",
          deep: {
            why: R`عدّ الكلمات، وتجميع الطلبات حسب المستخدم، و «آخر ١٠٠ سطر لوج»، و BFS في الـ graphs، و طابور jobs: كلها بتتكتب بإيدك بـ dict و if و list، وبتطلع أطول وأبطأ. وفي انترفيوهات الـ DSA، [[Counter]] و [[deque]] بيختصروا نص الحل.`,
            how: R`[[Counter]] dict عادي بس [[c["x"]]] بترجع 0 لو مش موجود (من غير ما تضيف المفتاح). وبيتجمع ويتطرح ([[c1 + c2]] و [[c1 - c2]] وبيشيل الصفر والسالب)، و [[update]] بتزوّد، و [[total()]] (3.10+) مجموع العدّ.

[[defaultdict(factory)]]: لما تطلب مفتاح مش موجود بينادي الـ factory ([[list]] أو [[int]] أو [[set]] أو lambda) ويحط الناتج. خلي بالك: مجرد القراية [[d["x"]]] بتضيف المفتاح، فلو عايز تسأل «موجود؟» استخدم [[in]]. و [[dict(d)]] قبل ما ترجعه من API عشان يبقى dict عادي.

[[deque]]: [[append]] و [[appendleft]] و [[pop]] و [[popleft]] كلهم O(1)، بعكس [[list.insert(0)]] و [[list.pop(0)]] اللي O(n). و [[maxlen]] بيشيل من الناحية التانية لوحده لما يتملى. والوصول بالـ index في النص O(n)، فمش بديل للـ list في كل حاجة.

[[namedtuple]] tuple immutable بأسماء، خفيف وبيتفك زي tuple. للكود الجديد غالبًا [[dataclass(frozen=True)]] أو [[typing.NamedTuple]] (نفس الفكرة بـ type hints) أوضح.`,
            when: R`Counter لأي عدّ. defaultdict لأي «group by» في الذاكرة. deque لأي طابور، أو «آخر N»، أو BFS. وللطابور بين threads: [[queue.Queue]]، وبين coroutines: [[asyncio.Queue]].`,
            mistakes: R`[[list.pop(0)]] في loop على list كبيرة (O(n²)). و [[defaultdict]] وتفتكر إن [[if d[k]:]] مش هتضيف مفتاح. وترجع defaultdict في JSON response وتستغرب من الـ type. و [[Counter]] بتاع حروف لما انت قصدك كلمات ([[Counter("hello world")]] بيعد الحروف؛ محتاج [[.split()]]).`
          },
          teach: R`## المثال بيعمل إيه؟

٤ أنواع جاهزة من [[collections]]، كل واحد في حتة من المثال: [[Counter]] بيعد كلمات، و [[defaultdict]] بيجمّع طلبات حسب المدينة، و [[deque]] بيحتفظ بآخر ٣ صفحات وبيشتغل طابور، و [[namedtuple]] بيعمل نقطة بـ lat و lng. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) بنفس الناتج.

~~~python
from collections import Counter, defaultdict, deque, namedtuple
~~~

[[collections]] module في المكتبة الأساسية، والسطر ده بيجيب الأربعة.

---

## ١. [[Counter]]: العدّ

~~~python
words = "tea coffee tea juice tea coffee".split()
c = Counter(words)
print(c.most_common(2))
print(c["water"])
~~~

~~~text الناتج
[('tea', 3), ('coffee', 2)]
0
~~~

- [[.split()]] من غير حاجة بيقسّم على المسافات: [[['tea', 'coffee', 'tea', 'juice', 'tea', 'coffee'] ]].
- [[Counter(words)]]: لف على الـ list وعدّ كل عنصر. الناتج dict المفتاح فيه الكلمة والقيمة عددها: [[{'tea': 3, 'coffee': 2, 'juice': 1}]].
- [[most_common(2)]]: أكتر اتنين، list of tuples (الكلمة، العدد) مترتبة من الأكتر.
- [[c["water"]]]: مش موجودة، ومع ذلك رجّعت [[0]] مش [[KeyError]]. وكمان مبتضيفش المفتاح: بعدها [["nothing" in c]] لسه False.

### الطريقة اليدوية اللي Counter بيوفّرها

~~~python
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
~~~

### [[update]] و [[+]] و [[total()]]

~~~python
c.update(["water", "tea"])
print(c + Counter(juice=4), c.total())
~~~

~~~text الناتج
Counter({'juice': 5, 'tea': 4, 'coffee': 2, 'water': 1}) 8
~~~

- [[update([...])]]: **زوّد** العدّ (مش استبدال زي dict العادي): tea بقت 4، و water اتضافت بـ 1.
- [[Counter(juice=4)]]: Counter من keyword arguments.
- [[c + ...]]: جمع العدّين: juice بقت 1 + 4 = 5. والجمع بيرجّع Counter جديد مترتب من الأكتر، و [[c]] نفسه مبيتغيرش.
- [[c.total()]] (من 3.10): مجموع كل الأعداد في [[c]]: 4 + 2 + 1 + 1 = 8.

والطرح بيشيل الصفر والسالب: [[Counter(a=3, b=1) - Counter(a=1, b=5)]] طلعت [[Counter({'a': 2})]] بس.

---

## ٢. [[defaultdict]]: التجميع

~~~python
orders = [("Cairo", "sara"), ("Alex", "omar"), ("Cairo", "ali")]
by_city = defaultdict(list)
for city, user in orders:
    by_city[city].append(user)
print(dict(by_city))
~~~

~~~text الناتج
{'Cairo': ['sara', 'ali'], 'Alex': ['omar']}
~~~

- [[for city, user in orders:]]: كل عنصر tuple من اتنين، فبنفكّه في متغيرين.
- [[defaultdict(list)]]: dict عادي، بس لما تطلب مفتاح مش موجود بينادي [[list()]] (اللي بتعمل list فاضية) ويحطها، وبعدين يرجّعها. [[list]] هنا اسمها **factory**: دالة بتصنع القيمة الافتراضية، ومن غير أقواس لأننا بنبعت الدالة نفسها مش نتيجتها.
- [[by_city[city].append(user)]]: أول مرة لـ Cairo: اتعملت [[[] ]] وبعدين ضفنا sara. تاني مرة: موجودة، ضفنا ali.

مع dict عادي نفس السطر بيقع:

~~~text الناتج: d = {}; d['k'].append(1)
KeyError: 'k'
~~~

- [[dict(by_city)]]: حوّله dict عادي. طباعة الـ defaultdict نفسه شكلها [[defaultdict(<class 'list'>, {'Cairo': [...], ...})]].

> الفخ: مجرد قراية مفتاح بتضيفه. [[d = defaultdict(list); d["x"]]] وبعدها [["x" in d]] طلعت True و [[dict(d)]] بقى [[{'x': []}]]. عشان تسأل «موجود؟» استخدم [[in]].

### متداخل: [[defaultdict(lambda: defaultdict(int))]]

~~~python
tree = defaultdict(lambda: defaultdict(int))
tree["Cairo"]["tea"] += 2
~~~

- [[lambda: ...]]: دالة صغيرة من غير اسم ومن غير باراميترات، بترجّع [[defaultdict(int)]] جديد.
- [[int()]] بترجّع [[0]]، فـ [[defaultdict(int)]] أي مفتاح جديد فيه بيبدأ صفر.
- [[tree["Cairo"]]] اتعمل dict داخلي، و [[["tea"]]] جواه بدأ 0، و [[+= 2]] خلاه 2. من غير ولا if.

---

## ٣. [[deque]]: آخر N وطابور

~~~python
recent = deque(maxlen=3)
for page in ["/", "/a", "/b", "/c"]:
    recent.append(page)
print(recent)
~~~

~~~text الناتج
deque(['/a', '/b', '/c'], maxlen=3)
~~~

[[deque]] (بتتنطق «ديك»، اختصار double-ended queue): list بتضيف وتشيل من الناحيتين بسرعة. و [[maxlen=3]]: أقصاه ٣، فلما الرابع ([["/c"]]) دخل، الأقدم ([["/"]]) طلع من الناحية التانية لوحده.

~~~python
queue = deque(["job1", "job2"])
queue.appendleft("urgent")
print(queue.popleft(), queue.pop())
~~~

~~~text الناتج
urgent job2
~~~

| خطوة | الطابور |
|---|---|
| البداية | [[job1, job2]] |
| [[appendleft("urgent")]] | [[urgent, job1, job2]] |
| [[popleft()]] رجّعت [[urgent]] | [[job1, job2]] |
| [[pop()]] رجّعت [[job2]] | [[job1]] |

ليه مش list؟ [[list.pop(0)]] و [[list.insert(0, x)]] بيزقّوا كل العناصر خطوة، يعني وقتهم بيكبر مع حجم الـ list (O(n)). في deque الأربع عمليات [[append]] و [[appendleft]] و [[pop]] و [[popleft]] وقتهم ثابت (O(1)) مهما كان الحجم.

---

## ٤. [[namedtuple]]

~~~python
Point = namedtuple("Point", ["lat", "lng"])
p = Point(30.04, 31.23)
print(p.lat, p)
~~~

~~~text الناتج
30.04 Point(lat=30.04, lng=31.23)
~~~

- [[namedtuple("Point", ["lat", "lng"])]]: بيعمل **نوع جديد** اسمه Point، tuple خانتها الأولى اسمها lat والتانية lng. الاسم الأول [["Point"]] بيظهر في الطباعة، فبنسمّي المتغير بنفس الاسم.
- [[p.lat]] بالاسم، و [[p[0]]] بالرقم برضه شغالة، و [[lat, lng = p]] بتتفك زي أي tuple.
- immutable: [[p.lat = 1]] مش هتنفع.

---

## ٥. الحل: أكتر IP و rate limiter

~~~python solCode (القلب)
LIMIT, WINDOW = 3, 10.0
hits: defaultdict[str, deque[float]] = defaultdict(deque)
def allow(ip: str, now: float) -> bool:
    q = hits[ip]
    while q and q[0] <= now - WINDOW:
        q.popleft()
    if len(q) >= LIMIT:
        return False
    q.append(now)
    return True
~~~

- [[hits]]: لكل IP deque فيه أوقات طلباته. [[defaultdict(deque)]] بيعمل deque فاضي لأي IP جديد. والجزء اللي بعد [[hits:]] type hint بس: dict مفاتيحه str وقيمه deque فيه floats.
- [[while q and q[0] <= now - WINDOW:]]: [[q[0]]] أقدم وقت. طول ما فيه أوقات وأقدمها عدّى عليه ١٠ ثواني أو أكتر، شيله من الشمال.
- [[if len(q) >= LIMIT: return False]]: لسه فيه ٣ في الشباك: ارفض، **ومن غير ما تسجّل** الطلب ده.
- وإلا سجّله ورجّع True.

~~~text الناتج
[('1.1.1.1', 3), ('2.2.2.2', 2)]
[True, True, True, False, False, True, True]
True
~~~

| الوقت | الشباك قبل | النتيجة |
|---|---|---|
| 0 و 1 و 2 | فاضي، ثم 0، ثم 0 و 1 | True ×3 |
| 3 | 0 و 1 و 2 | False |
| 9.9 | 0 و 1 و 2 (و 0 لسه جوه: 0 > 9.9 - 10) | False |
| 10.5 | 0 خرج (0 <= 0.5) | True |
| 11 | 1 خرج (1 <= 1) | True |

وطباعة [[hits]] في الآخر: [[{'1.1.1.1': deque([2, 10.5, 11]), '2.2.2.2': deque([3])}]].

---

## الخلاصة

| النوع | استخدمه لـ | أهم حاجة |
|---|---|---|
| [[Counter]] | العدّ | [[most_common(n)]]، والمفتاح الناقص بصفر |
| [[defaultdict(factory)]] | group by | القراية بتضيف المفتاح |
| [[deque(maxlen=n)]] | طابور، أو آخر N | الناحيتين O(1) |
| [[namedtuple]] | tuple بأسماء | immutable |

- [[Counter("hello world")]] بيعد **حروف** ([[('l', 3)]] أولهم)، فللكلمات اعمل [[.split()]] الأول.`,
          lines: [
            "import الأربعة.",
            "list كلمات.",
            "عدّ في سطر.",
            "أكتر اتنين.",
            "مفتاح مش موجود: صفر، ومن غير KeyError.",
            "زوّد عدّ.",
            R`[[+]] بين Counters، و [[total()]] المجموع.`,
            "أزواج (مدينة، مستخدم).",
            "أي مدينة جديدة بتبدأ بـ list فاضية.",
            "لف.",
            R`من غير [[if city not in by_city]].`,
            R`[[dict()]] عشان يتطبع ويترجع كـ dict عادي.`,
            R`متداخل: مدينة ← صنف ← عدد.`,
            "المفتاحين اتعملوا لوحدهم.",
            R`طابور بحد أقصى ٣.`,
            "٤ صفحات.",
            "لما يتملى، الأقدم بيطلع لوحده.",
            "آخر ٣ بس.",
            "طابور عادي.",
            "ضيف في الأول: O(1).",
            R`[[popleft]] و [[pop]]: من الناحيتين O(1).`,
            "namedtuple: tuple بأسماء.",
            "object.",
            "بالاسم، والطباعة واضحة."
          ]
        },
        {
          cmd: "itertools",
          title: "itertools: chain و batched و groupby و pairwise",
          desc: R`[[itertools]] أدوات بتشتغل على أي iterable وبترجع iterators (lazy، مبتحسبش غير لما تطلب): [[chain]] بيوصّل كذا حاجة ورا بعض، و [[batched]] (3.12+) بيقسّم لحتت بحجم ثابت، و [[pairwise]] أزواج متتالية، و [[accumulate]] مجموع متراكم، و [[product]] كل التوافيق، و [[count]] عدّاد مالوش آخر، و [[islice]] قطع من iterator، و [[groupby]] تجميع للعناصر المتجاورة.`,
          example: R`from itertools import accumulate, batched, chain, count, groupby, islice, pairwise, product
from operator import itemgetter
print(list(chain([1, 2], (3, 4), range(5, 7))))       # [1, 2, 3, 4, 5, 6]
print(list(batched(range(7), 3)))                     # [(0, 1, 2), (3, 4, 5), (6,)]
print(list(pairwise([100, 120, 90])))                 # [(100, 120), (120, 90)]
print(list(accumulate([100, -30, 50])))               # [100, 70, 120]: رصيد متراكم
print(list(product(["S", "M"], ["red", "blue"])))
ids = count(start=1000)
print(next(ids), next(ids))                           # 1000 1001
print(list(islice(ids, 3)))                           # [1002, 1003, 1004]
sales = [("Alex", 80), ("Cairo", 150), ("Cairo", 45), ("Alex", 20)]
sales.sort(key=itemgetter(0))
for city, group in groupby(sales, key=itemgetter(0)):
    print(city, sum(amount for _, amount in group))   # Alex 100 ثم Cairo 195`,
          try: R`(١) عندك قراءات حرارة [[[20, 21, 25, 24, 30, 29, 29]]]: طلّع التغيير بين كل قراية واللي بعدها وأكبر زيادة بـ [[pairwise]]. (٢) [[groupby]] على تواريخ [[["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]]] مرة من غير ترتيب ومرة بعد [[sorted]]، وقارن. (٣) قسّم [[range(1, 11)]] لدفعات من ٤ كأنك بتعمل INSERT على دفعات.`,
          sol: R`(١) [[[1, 4, -1, 6, -1, 0]]] وأكبر زيادة [[6]]. (٢) من غير ترتيب: [[[('2026-09-01', 2), ('2026-09-02', 1), ('2026-09-01', 1)]]]، اليوم الأول ظهر مرتين! وبعد [[sorted]]: [[[('2026-09-01', 3), ('2026-09-02', 1)]]]. (٣) [[(1, 2, 3, 4)]] و [[(5, 6, 7, 8)]] و [[(9, 10)]]: آخر دفعة أصغر، وده طبيعي.

الـ groupby هو الفخ المشهور: بيجمّع العناصر المتجاورة بس (زي [[uniq]] في bash)، فلازم ترتّب بنفس الـ key الأول. ولو مش عايز ترتّب، [[defaultdict(list)]] أسهل. والـ [[g]] اللي بيرجع من groupby بيتستهلك أول ما تتحرك للمجموعة اللي بعدها، عشان كده [[len(list(g))]] جوه نفس اللفة.`,
          solCode: R`from itertools import batched, groupby, pairwise
readings = [20, 21, 25, 24, 30, 29, 29]
changes = [b - a for a, b in pairwise(readings)]
print(changes, max(changes))
days = ["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]
print([(d, len(list(g))) for d, g in groupby(days)])
print([(d, len(list(g))) for d, g in groupby(sorted(days))])
ids = list(range(1, 11))
for chunk in batched(ids, 4):
    print("INSERT batch:", chunk)`,
          flag: "script",
          deep: {
            why: R`دفعات لـ API بيقبل ١٠٠ عنصر في الطلب، و «الفرق عن امبارح»، و «رصيد بعد كل عملية»، و «كل مقاسات ×كل ألوان»: كلها loops فيها indexes و off-by-one. و itertools بيقولها في كلمة، ومن غير ما يحمّل الداتا كلها في الذاكرة.`,
            how: R`كل دوال itertools بترجع iterators: بتتلف عليها مرة واحدة ومبتحسبش حاجة غير لما تطلب. فـ [[count()]] مالوش آخر ومينفعش تعمل منه list، بس ينفع مع [[islice]] أو [[zip]] أو [[next]].

[[batched(it, n)]] بيرجع tuples، ومن 3.13 فيه [[strict=True]] بيرمي لو آخر دفعة ناقصة. و [[pairwise]] (3.10+) زي [[zip(a, a[1:])]] بس لأي iterable. و [[accumulate]] الافتراضي جمع، وتقدر تديله دالة ([[accumulate(xs, max)]] أعلى قيمة لحد دلوقتي).

[[groupby(it, key)]] بيرجع أزواج (المفتاح، iterator للمجموعة)، وبيعمل مجموعة جديدة كل ما الـ key يتغير عن اللي قبله. و [[operator.itemgetter(0)]] دالة جاهزة بتساوي [[lambda x: x[0]]].

وفيه كمان [[combinations]] و [[permutations]] (مفيدين في DSA)، و [[zip_longest]]، و [[takewhile]]/[[dropwhile]]، و [[tee]].`,
            when: R`لما الـ loop بتاعك بيعمل حاجة ليها اسم في itertools. بس متعملش سلسلة ٥ دوال متداخلة عشان تبان شاطر؛ لو loop عادي أوضح، اكتبه loop.`,
            mistakes: R`[[groupby]] من غير ترتيب. وتلف على iterator مرتين (التانية فاضية). و [[list(count())]] (بيلف للأبد). وتحتفظ بمجموعة من groupby لبعدين ([[groups = list(groupby(...))]]) فتلاقي المجموعات فاضية.`
          },
          teach: R`## المثال بيعمل إيه؟

كل سطر [[print]] بيجرّب أداة واحدة من [[itertools]] على list صغيرة، وفي الآخر [[groupby]] بيجمع المبيعات لكل مدينة. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) وطلع نفس الناتج بالحرف. ([[batched]] محتاج 3.12 أو أحدث.)

---

## ١. الـ imports و فكرة الـ iterator

~~~python
from itertools import accumulate, batched, chain, count, groupby, islice, pairwise, product
from operator import itemgetter
~~~

حاجة لازم تفهمها قبل أي أداة: كل دوال [[itertools]] بترجّع **iterator**، مش list. الـ iterator بيطلّع القيم واحدة واحدة وقت ما تطلبها (lazy)، ومرة واحدة بس:

~~~text الناتج: c = chain([1, 2], [3]); print(c, list(c), list(c))
<itertools.chain object at 0x00000121B82E06A0> [1, 2, 3] []
~~~

- طباعته مباشرة بتطلّع اسم الـ object مش القيم، عشان كده المثال بيلف كل حاجة في [[list(...)]].
- أول [[list(c)]] استهلكت كل القيم، والتانية لقته فاضي.

و [[operator]] module فيه العمليات كدوال جاهزة. [[itemgetter(0)]] دالة بتاخد حاجة وترجّع عنصرها رقم 0: [[itemgetter(0)(('Alex', 80))]] طلعت [['Alex']]. يعني نفس [[lambda x: x[0]]].

---

## ٢. [[chain]]: وصّل ورا بعض

~~~text الناتج: list(chain([1, 2], (3, 4), range(5, 7)))
[1, 2, 3, 4, 5, 6]
~~~

list و tuple و [[range(5, 7)]] (يعني 5 و 6، الآخر مش داخل)، اتلف عليهم ورا بعض كأنهم حاجة واحدة، من غير ما يتعمل list جديدة في الذاكرة.

---

## ٣. [[batched]]: دفعات

~~~text الناتج: list(batched(range(7), 3))
[(0, 1, 2), (3, 4, 5), (6,)]
~~~

قسّم 0 لـ 6 لحتت كل واحدة ٣. الأخيرة فيها عنصر واحد، و [[(6,)]] بالفاصلة دي طريقة كتابة tuple فيه عنصر واحد. ومن 3.13 لو عايز ترفض الدفعة الناقصة: [[batched(range(7), 3, strict=True)]] طلّعت [[ValueError: batched(): incomplete batch]].

---

## ٤. [[pairwise]]: كل عنصر واللي بعده

~~~text الناتج: list(pairwise([100, 120, 90]))
[(100, 120), (120, 90)]
~~~

٣ عناصر بيدّوا زوجين: (الأول، التاني) و (التاني، التالت). ده اللي تحتاجه لأي «الفرق عن اللي قبله».

---

## ٥. [[accumulate]]: مجموع متراكم

~~~text الناتج: list(accumulate([100, -30, 50]))
[100, 70, 120]
~~~

| الخطوة | الحساب | الناتج |
|---|---|---|
| ١ | 100 | 100 |
| ٢ | 100 + (-30) | 70 |
| ٣ | 70 + 50 | 120 |

زي رصيد حساب بعد كل عملية.

---

## ٦. [[product]]: كل التوافيق

~~~text الناتج: list(product(["S", "M"], ["red", "blue"]))
[('S', 'red'), ('S', 'blue'), ('M', 'red'), ('M', 'blue')]
~~~

كل عنصر من الأولى مع كل عنصر من التانية: ٢ × ٢ = ٤. زي loop جوه loop.

---

## ٧. [[count]] و [[next]] و [[islice]]

~~~python
ids = count(start=1000)
print(next(ids), next(ids))
print(list(islice(ids, 3)))
~~~

~~~text الناتج
1000 1001
[1002, 1003, 1004]
~~~

- [[count(start=1000)]]: عدّاد بيبدأ من 1000 **وملوش آخر**. [[list(count())]] هيلف للأبد.
- [[next(ids)]]: هات القيمة الجاية من أي iterator. مرتين: 1000 ثم 1001.
- [[islice(ids, 3)]]: slice لـ iterator: خد أول ٣ من اللي **فاضل**. ولاحظ إنها كمّلت من 1002، لأن العدّاد افتكر هو وقف فين.

---

## ٨. [[groupby]]: تجميع المتجاور

~~~python
sales = [("Alex", 80), ("Cairo", 150), ("Cairo", 45), ("Alex", 20)]
sales.sort(key=itemgetter(0))
for city, group in groupby(sales, key=itemgetter(0)):
    print(city, sum(amount for _, amount in group))
~~~

~~~text الناتج
Alex 100
Cairo 195
~~~

- [[sales.sort(key=itemgetter(0))]]: رتّب الـ list نفسها بالمدينة. بعدها: Alex 80، Alex 20، Cairo 150، Cairo 45.
- [[groupby(sales, key=itemgetter(0))]]: لف، وكل ما المدينة **تتغير عن اللي قبلها** ابدأ مجموعة جديدة. بيرجّع أزواج: المفتاح ([[city]])، و iterator فيه عناصر المجموعة ([[group]]).
- [[sum(amount for _, amount in group)]]: لف على عناصر المجموعة، وكل عنصر tuple بنفكّه: [[_]] للمدينة (مش محتاجينها) و [[amount]] للرقم، واجمع.

ليه الترتيب لازم؟ جربنا نفس الـ groupby من غير [[sort]]:

~~~text الناتج
[('Alex', 80), ('Cairo', 195), ('Alex', 20)]
~~~

Alex ظهرت مرتين، لأن groupby بيبص على العنصر اللي جنبه بس (زي [[uniq]] في bash).

---

## ٩. الحل

~~~python solCode
readings = [20, 21, 25, 24, 30, 29, 29]
changes = [b - a for a, b in pairwise(readings)]
print(changes, max(changes))
days = ["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]
print([(d, len(list(g))) for d, g in groupby(days)])
print([(d, len(list(g))) for d, g in groupby(sorted(days))])
for chunk in batched(ids, 4):
    print("INSERT batch:", chunk)
~~~

- [[[b - a for a, b in pairwise(readings)] ]]: كل زوج متتالي، اطرح الأول من التاني.
- [[groupby(days)]] من غير [[key]]: المفتاح هو العنصر نفسه.
- [[len(list(g))]]: عدد عناصر المجموعة. [[g]] iterator ملوش [[len]]، فبنحوّله list الأول. ولازم جوه نفس اللفة، لأن أول ما groupby يتحرك للمجموعة اللي بعدها، الـ [[g]] القديم بيفضى.

~~~text الناتج
[1, 4, -1, 6, -1, 0] 6
[('2026-09-01', 2), ('2026-09-02', 1), ('2026-09-01', 1)]
[('2026-09-01', 3), ('2026-09-02', 1)]
INSERT batch: (1, 2, 3, 4)
INSERT batch: (5, 6, 7, 8)
INSERT batch: (9, 10)
~~~

وعشان تتأكد من فخ «الـ g بيفضى»: [[gs = list(groupby(...))]] وبعدين بصينا جوه المجموعات: [[[('Alex', []), ('Cairo', [])] ]]. المفاتيح موجودة والمجموعات فاضية.

---

## الخلاصة

| الأداة | بتعمل إيه | مثال |
|---|---|---|
| [[chain(a, b)]] | ورا بعض | [[1, 2, 3, 4]] |
| [[batched(it, n)]] | دفعات بحجم n | [[(0, 1, 2), (3, 4, 5), (6,)]] |
| [[pairwise(it)]] | أزواج متتالية | [[(100, 120), (120, 90)]] |
| [[accumulate(it)]] | مجموع متراكم | [[100, 70, 120]] |
| [[product(a, b)]] | كل التوافيق | ٤ أزواج |
| [[count(start)]] | عدّاد ملوش آخر | مع [[next]] أو [[islice]] |
| [[groupby(it, key)]] | تجميع المتجاور | رتّب بنفس الـ key الأول |

- كله iterators: بتتلف مرة واحدة، و [[list()]] عشان تشوف القيم.`,
          lines: [
            "الأدوات.",
            R`[[itemgetter(0)]] = [[lambda x: x[0]]].`,
            "وصّل كذا iterable ورا بعض.",
            "دفعات بحجم ٣، والأخيرة أصغر.",
            "أزواج متتالية: مفيد للفروق.",
            "مجموع متراكم.",
            "كل التوافيق: مقاسات × ألوان.",
            "عدّاد مالوش آخر يبدأ من 1000.",
            R`[[next]] بتاخد القيمة الجاية.`,
            R`[[islice]] بتاخد ٣ من iterator مالوش آخر.`,
            "مبيعات.",
            R`رتّب بالمدينة الأول: [[groupby]] بيجمّع المتجاور بس.`,
            "لف على كل مجموعة.",
            "اجمع مبيعات المجموعة."
          ]
        },
        {
          cmd: "functools",
          title: "lru_cache و partial و cached_property و reduce",
          desc: R`[[functools]] أدوات للدوال: [[@lru_cache]] بيحفظ ناتج الدالة لكل مجموعة باراميترات (memoization)، و [[partial]] بيثبّت باراميترات في دالة ويرجّع دالة جديدة، و [[@cached_property]] خاصية بتتحسب مرة واحدة لكل object، و [[reduce]] بيطبّق دالة على عناصر بالتراكم، و [[wraps]] اللي شفناه في درس «decorators».`,
          example: R`import time
from functools import cached_property, lru_cache, partial, reduce
@lru_cache(maxsize=256)
def exchange_rate(currency: str) -> float:
    time.sleep(0.5)
    return {"USD": 48.5, "EUR": 56.9}[currency]
exchange_rate("USD")
exchange_rate("USD")
print(exchange_rate.cache_info())      # CacheInfo(hits=1, misses=1, maxsize=256, currsize=1)
exchange_rate.cache_clear()
def price_with_tax(amount: float, rate: float) -> float:
    return round(amount * (1 + rate), 2)
egypt_vat = partial(price_with_tax, rate=0.14)
print(egypt_vat(100), list(map(egypt_vat, [10, 20])))   # 114.0 [11.4, 22.8]
print_err = partial(print, "ERROR:", sep=" | ")
print_err("disk full")                                 # ERROR: | disk full
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4], 1))  # 24
class Report:
    def __init__(self, rows: list[int]):
        self.rows = rows
    @cached_property
    def total(self) -> int:
        print("بحسب...")
        return sum(self.rows)
r = Report([1, 2, 3])
print(r.total, r.total)                                 # بحسب... مرة واحدة ثم 6 6
exchange_rate(["USD"])                                  # TypeError: unhashable type: 'list'`,
          try: R`(١) اكتب [[ways(n)]] عدد طرق طلوع سلم n درجة بخطوة أو خطوتين ([[ways(n-1) + ways(n-2)]]) بـ [[@lru_cache(maxsize=None)]] واطبع [[ways(80)]] وعدد النداءات الفعلية و [[cache_info()]]. جرّب تشيل الـ cache على [[ways(35)]] وقارن الوقت. (٢) من دالة [[fmt(amount, currency, decimals=2)]] اعمل [[egp]] و [[usd]] بـ [[partial]]، و [[usd]] من غير كسور.`,
          sol: R`(١) [[ways(80)]] = [[37889062373143906]] في أجزاء من الثانية، والدالة اتنفّذت [[81]] مرة بس (مرة لكل n من 0 لـ 80)، و [[cache_info()]] بيقول [[hits=78, misses=81]]. من غير الـ cache، [[ways(35)]] لوحدها بتعمل حوالي ٣٠ مليون نداء وبتاخد ثواني، و [[ways(80)]] مش هتخلص. ده الفرق بين O(n) و O(2^n)، ونفس فكرة الـ dynamic programming في تاب DSA.

(٢) [[egp(12500.5)]] = [[12,500.50 EGP]]، و [[usd(99.6)]] = [[100 USD]]، و [[egp(3, decimals=0)]] = [[3 EGP]]: الباراميتر اللي partial ثبّته بالاسم ينفع يتغير وقت النداء. الغلطة الشائعة: [[partial(fmt, "EGP")]] بالمكان، فالـ EGP تروح لـ [[amount]] مش [[currency]].`,
          solCode: R`import time
from functools import lru_cache, partial
calls = 0
@lru_cache(maxsize=None)
def ways(n: int) -> int:
    global calls
    calls += 1
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)
start = time.perf_counter()
print(ways(80), calls, f"{time.perf_counter() - start:.4f}s")
print(ways.cache_info())
def fmt(amount: float, currency: str, decimals: int = 2) -> str:
    return f"{amount:,.{decimals}f} {currency}"
egp = partial(fmt, currency="EGP")
usd = partial(fmt, currency="USD", decimals=0)
print(egp(12500.5), usd(99.6), egp(3, decimals=0))`,
          flag: "script",
          deep: {
            why: R`[[lru_cache]] بيحوّل حسبة متكررة غالية (إعدادات، سعر صرف، recursion) لـ lookup. و [[partial]] بتلاقيه في كود callbacks ومع [[map]] ومع [[run_in_executor]] اللي مبيقبلش keyword arguments. و [[@lru_cache]] على [[get_settings]] هو الـ pattern الرسمي في FastAPI (درس «pydantic-settings»).`,
            how: R`[[@lru_cache(maxsize=256)]] بيعمل dict من الباراميترات للناتج، ولما يتملى بيشيل الأقدم استخدامًا (Least Recently Used). [[maxsize=None]] أو [[@cache]] (3.9+) من غير حد. والباراميترات لازم hashable (مفيش list ولا dict)، و [[f(1)]] و [[f(x=1)]] بيتخزنوا كمفتاحين مختلفين. و [[cache_info()]] و [[cache_clear()]] للمتابعة والمسح.

الـ cache ده في ذاكرة الـ process: مفيش TTL (القيمة مبتنتهيش)، ومش مشترك بين الـ workers، وبيتمسح لما الـ process يقفل. للداتا اللي بتتغير: Redis (المستوى ٣). ولو الدالة async، [[lru_cache]] هيخزّن الـ coroutine نفسه مش الناتج، والنداء التاني هيقع بـ [[cannot reuse already awaited coroutine]]، فمينفعش.

[[partial(f, *args, **kwargs)]] بيرجع callable لما تناديه بيضيف الباراميترات المتثبتة. و [[cached_property]] بتحسب أول مرة وتحط الناتج في [[__dict__]] بتاع الـ object، فبعد كده بتتقري كخاصية عادية (ومش شغالة مع [[slots=True]]).

[[reduce(f, items, initial)]] بتطبّق [[f(acc, x)]] على كل عنصر. غالبًا [[sum]] و [[max]] و [[math.prod]] و loop أوضح منها، وده سبب إنها اتنقلت من الـ built-ins لـ functools.`,
            when: R`[[lru_cache]] لدوال pure (نفس الباراميترات = نفس الناتج دايمًا) وغالية. [[cached_property]] لحسبة تقيلة على object مبيتغيرش. [[partial]] لما تحتاج تبعت دالة بباراميترات متثبتة لحد تاني.`,
            mistakes: R`[[lru_cache]] على دالة بتقرا من القاعدة أو الوقت (الداتا القديمة تفضل راجعة). وعلى method ([[self]] بيبقى جزء من المفتاح والـ object مبيتمسحش من الذاكرة). وعلى دالة async. وباراميتر list: [[TypeError: unhashable type: 'list']]. و [[maxsize=None]] على دالة باراميتراتها جاية من المستخدمين (الذاكرة بتكبر من غير حد).`
          },
          teach: R`## المثال بيعمل إيه؟

٤ أدوات من [[functools]] في ٤ حتت: [[lru_cache]] بيحفظ سعر صرف بدل ما يستنى كل مرة، و [[partial]] بيعمل نسخة من دالة باراميتر فيها متثبت، و [[reduce]] بيضرب أرقام بالتراكم، و [[cached_property]] بيحسب خاصية مرة واحدة. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) بنفس الناتج.

~~~python
import time
from functools import cached_property, lru_cache, partial, reduce
~~~

[[time]] عشان [[time.sleep]] (استنى) و [[time.perf_counter]] (ساعة دقيقة لقياس الوقت). و [[functools]] = function tools، أدوات بتشتغل على الدوال.

---

## ١. [[@lru_cache]]

~~~python
@lru_cache(maxsize=256)
def exchange_rate(currency: str) -> float:
    time.sleep(0.5)
    return {"USD": 48.5, "EUR": 56.9}[currency]
~~~

- [[@...]] فوق [[def]] = decorator (درس «decorators»): بيلف الدالة بدالة تانية. هنا اللفافة بتحفظ الناتج.
- [[time.sleep(0.5)]]: استنى نص ثانية، كأن الدالة بتسأل API بطيء.
- [[{"USD": 48.5, "EUR": 56.9}[currency] ]]: dict وبنطلب منه المفتاح على طول.
- LRU = Least Recently Used: لما الـ cache يتملى (256 قيمة)، اللي بيتشال هو **أقدم واحد محدش طلبه**.

~~~python
exchange_rate("USD")
exchange_rate("USD")
print(exchange_rate.cache_info())
exchange_rate.cache_clear()
~~~

~~~text الناتج
CacheInfo(hits=1, misses=1, maxsize=256, currsize=1)
~~~

| الخانة | معناها | ليه القيمة دي |
|---|---|---|
| [[misses=1]] | مرات اتحسبت فعلًا | أول نداء: مش موجود، اتنفّذت ونامت نص ثانية |
| [[hits=1]] | مرات رجعت من الـ cache | تاني نداء بنفس الباراميتر |
| [[maxsize=256]] | الحد الأقصى | اللي كتبناه |
| [[currsize=1]] | المحفوظ دلوقتي | قيمة واحدة: USD |

قسنا الوقت: النداء الأول [[0.5004s]] والتاني [[0.0000s]]. و [[cache_clear()]] بيفضّي الـ cache كله (لما السعر يتغير مثلًا).

> المفتاح بيتعمل من الباراميترات **زي ما اتكتبت**: [[f("USD")]] وبعدها [[f(c="USD")]] اتحسبوا مرتين ([[misses=2]]).

---

## ٢. [[partial]]

~~~python
def price_with_tax(amount: float, rate: float) -> float:
    return round(amount * (1 + rate), 2)
egypt_vat = partial(price_with_tax, rate=0.14)
print(egypt_vat(100), list(map(egypt_vat, [10, 20])))
~~~

~~~text الناتج
114.0 [11.4, 22.8]
~~~

- [[partial(f, rate=0.14)]]: دالة جديدة لما تناديها بتنادي [[f]] وتضيف [[rate=0.14]] لوحدها. فـ [[egypt_vat(100)]] = [[price_with_tax(100, rate=0.14)]].
- [[round(..., 2)]] ليه؟ [[10 * 1.14]] لوحدها طلعت [[11.399999999999999]]: الـ float مبيخزنش الكسور العشرية بالظبط. التقريب بيرجّعها [[11.4]].
- [[map(egypt_vat, [10, 20])]]: نادي الدالة على كل عنصر. [[map]] بتبعت باراميتر واحد بس، وده بالظبط سبب الـ partial هنا: الدالة الأصلية محتاجة اتنين.

~~~python
print_err = partial(print, "ERROR:", sep=" | ")
print_err("disk full")
~~~

~~~text الناتج
ERROR: | disk full
~~~

هنا ثبّتنا باراميتر **بالمكان** ([["ERROR:"]] أول واحد) وواحد بالاسم ([[sep]]: اللي [[print]] بيحطه بين الحاجات بدل المسافة). فالنداء بقى [[print("ERROR:", "disk full", sep=" | ")]].

---

## ٣. [[reduce]]

~~~python
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4], 1))
~~~

~~~text الناتج
24
~~~

[[reduce(f, items, initial)]]: ابدأ بـ [[acc = initial]]، ولكل عنصر [[acc = f(acc, x)]]:

| الخطوة | [[acc]] | [[x]] | [[acc * x]] |
|---|---|---|---|
| ١ | 1 | 1 | 1 |
| ٢ | 1 | 2 | 2 |
| ٣ | 2 | 3 | 6 |
| ٤ | 6 | 4 | 24 |

[[acc]] اختصار accumulator (المتراكم). ونفس النتيجة أوضح بـ [[math.prod([1, 2, 3, 4])]].

---

## ٤. [[@cached_property]]

~~~python
class Report:
    def __init__(self, rows: list[int]):
        self.rows = rows
    @cached_property
    def total(self) -> int:
        print("بحسب...")
        return sum(self.rows)
r = Report([1, 2, 3])
print(r.total, r.total)
~~~

~~~text الناتج
بحسب...
6 6
~~~

- [[@cached_property]] بيخلّي [[total]] تتقري كخاصية من غير أقواس ([[r.total]] مش [[r.total()]])، وتتحسب أول مرة بس.
- ليه [[بحسب...]] اتطبعت **قبل** [[6 6]]؟ لأن Python بيحسب كل الباراميترات اللي جوه [[print(...)]] الأول، وبعدين يطبع. أول [[r.total]] حسبت وطبعت، والتانية رجعت 6 من غير حساب.
- اتحفظت فين؟ في [[__dict__]] بتاع الـ object نفسه. جربنا على class صغير: قبل القراية [[{}]] وبعدها [[{'t': 6}]]. فكل object ليه نسخته.

---

## ٥. السطر الأخير: باراميتر list

~~~text الناتج: exchange_rate(["USD"])
TypeError: unhashable type: 'list'
~~~

الـ cache dict، ومفاتيح الـ dict لازم تبقى **hashable**: قيمة مبتتغيرش (str و int و tuple). الـ list ممكن تتغير بعد ما تتخزن، فـ Python بيرفضها. حوّلها [[tuple(...)]] لو محتاج.

---

## ٦. الحل: السلم و [[partial]] بالاسم

~~~python solCode (ways)
@lru_cache(maxsize=None)
def ways(n: int) -> int:
    global calls
    calls += 1
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)
~~~

- [[maxsize=None]]: من غير حد.
- [[global calls]]: عشان نعدّل المتغير اللي برّه الدالة. [[calls]] بيزيد بس لما الدالة تتنفّذ فعلًا (miss)، مش لما ترجع من الـ cache.

~~~text الناتج
37889062373143906 81 0.0003s
CacheInfo(hits=78, misses=81, maxsize=None, currsize=81)
12,500.50 EGP 100 USD 3 EGP
~~~

- [[81]] تنفيذ = n من 0 لـ 80، كل واحد مرة.
- [[hits=78]]: كل [[ways(n)]] من 3 لـ 80 بتنادي [[ways(n - 2)]] بعد ما [[ways(n - 1)]] حسبتها، فبترجع من الـ cache: ٧٨ مرة. (عند [[ways(2)]] الـ [[ways(0)]] كانت لسه أول مرة.)
- ومن غير الـ cache، [[ways(35)]] لوحدها:

~~~text الناتج: نفس الدالة من غير lru_cache
14930352 29860703 2.9s
~~~

حوالي ٣٠ مليون نداء في ٣ ثواني لـ n = 35، والعدد بيتضاعف تقريبًا مع كل زيادة في n، فـ 80 مش هتخلص.

~~~python solCode (fmt)
def fmt(amount: float, currency: str, decimals: int = 2) -> str:
    return f"{amount:,.{decimals}f} {currency}"
egp = partial(fmt, currency="EGP")
usd = partial(fmt, currency="USD", decimals=0)
~~~

- [[{amount:,.2f}]]: [[,]] فاصلة كل ٣ أرقام، و [[.2f]] رقمين بعد العلامة. و [[{decimals}]] جوه الـ format نفسه بيحط الرقم من المتغير.
- [[egp(3, decimals=0)]] طلعت [[3 EGP]]: الباراميتر اللي partial ثبّته بالاسم ينفع يتغير وقت النداء.
- لو ثبّت [["EGP"]] بالمكان ([[partial(fmt, "EGP")]])، هيروح لـ [[amount]]، وجربناها: [[ValueError: Unknown format code 'f' for object of type 'str']].

---

## الخلاصة

| الأداة | بتعمل إيه | خلي بالك |
|---|---|---|
| [[@lru_cache(maxsize=n)]] | تحفظ الناتج لكل باراميترات | للدوال pure بس، والباراميترات hashable |
| [[cache_info()]] و [[cache_clear()]] | إحصائيات ومسح | |
| [[partial(f, k=v)]] | دالة جديدة بباراميتر متثبت | ثبّت بالاسم |
| [[@cached_property]] | خاصية بتتحسب مرة لكل object | |
| [[reduce(f, items, init)]] | تراكم | [[sum]] و [[math.prod]] غالبًا أوضح |`,
          lines: [
            "للتأخير.",
            "الأدوات.",
            "cache بحد أقصى ٢٥٦ قيمة.",
            "دالة غالية (كأنها بتنادي API).",
            "نص ثانية.",
            "القيمة.",
            "أول مرة: بتتحسب (miss).",
            "تاني مرة: من الـ cache على طول (hit).",
            "إحصائيات الـ cache.",
            "امسح الـ cache (لما الداتا تتغير).",
            "دالة عامة.",
            "الحسبة.",
            R`[[partial]]: نسخة منها الـ rate فيها متثبت.`,
            "بتتنادى بباراميتر واحد، وتنفع مع map.",
            R`[[partial]] على [[print]] نفسها.`,
            "بتطبع بالبادئة والفاصل.",
            R`[[reduce]]: حاصل ضرب بالتراكم (وفيه [[math.prod]] أوضح).`,
            "class.",
            "الـ init.",
            "خزّن.",
            "خاصية بتتحسب أول مرة بس.",
            "method.",
            "علامة إن الحسبة حصلت.",
            "الحسبة.",
            "object.",
            "بحسب... مرة واحدة، وبعدين 6 و 6.",
            R`list مش hashable: [[lru_cache]] بيرمي.`
          ]
        }
      ]
    },
    {
      t: "سكربتات وأوامر النظام",
      l: 1,
      n: "سكربت بـ arguments بـ argparse أو typer، وتشغّل أوامر النظام بـ subprocess بأمان",
      items: [
        {
          cmd: "argparse و typer",
          title: "سكربت بياخد arguments و --flags و --help",
          desc: R`بدل ما تعدّل الكود كل مرة تغيّر ملف أو رقم، خلّي السكربت ياخدهم من سطر الأوامر: [[python report.py orders.csv --top 3 -v]]. [[argparse]] في المكتبة الأساسية: بتعرّف الـ arguments، وهو بيعمل الـ parsing والتحويل للأنواع ورسايل الخطأ و [[--help]] لوحده.

و [[typer]] (من نفس صاحب FastAPI) بيعمل نفس الحاجة من الـ type hints بتاعة الدالة، زي ما FastAPI بيعمل الـ API من الـ type hints. محتاج [[pip install typer]]، وبيطلّع help ملوّن.`,
          example: R`import argparse
import sys
from pathlib import Path
def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="تقرير مبيعات من ملف CSV")
    parser.add_argument("src", type=Path, help="ملف الـ CSV")
    parser.add_argument("-o", "--out", type=Path, default=Path("report.json"))
    parser.add_argument("--city", action="append", help="فلتر، وينفع يتكرر")
    parser.add_argument("--top", type=int, default=5, metavar="N")
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args(argv)
    if not 1 <= args.top <= 50:
        parser.error("--top must be between 1 and 50")
    if not args.src.exists():
        print(f"error: {args.src} not found", file=sys.stderr)
        return 2
    if args.verbose:
        print(args)
    print(f"reading {args.src} -> {args.out}, cities={args.city}, top={args.top}")
    return 0
if __name__ == "__main__":
    sys.exit(main())`,
          try: R`شغّل المثال بـ [[-h]]، ومن غير ملف، وبـ [[--top 99]]، وبـ [[--top abc]]، وبـ [[echo $?]] بعد كل واحدة. وبعدين اكتب نفس السكربت بـ typer ([[typer.Typer()]] و [[Annotated]] و [[typer.Option(min=1, max=50)]] و [[typer.Argument(exists=True)]]) وجرّب نفس الحالات.`,
          sol: R`بـ argparse: [[-h]] بيطبع الـ usage والوصف ويخرج بـ 0. من غير ملف: [[error: the following arguments are required: src]] وكود 2. [[--top 99]]: [[error: --top must be between 1 and 50]] وكود 2 (من [[parser.error]]). و [[--top abc]]: [[argument --top: invalid int value: 'abc']] وكود 2، لأن [[type=int]] بيحوّل ويرفض لوحده. وملف مش موجود: الرسالة بتاعتك على stderr وكود 2 من [[return 2]].

بـ typer نفس الحالات بتطلع في مربع [[Error]]، مثلًا [[Invalid value for '--top': 99 is not in the range 1<=x<=50]] و [[File 'nope.csv' does not exist]]، وكود 2 برضه، من غير ولا سطر فحص في الكود. لاحظ إن [[--city]] اللي بيتكرر بقى [[list[str] | None]]، و [[--verbose]] بقى bool flag لأن النوع bool. الغلطة الشائعة إنك تخلّي السكربت يخرج بـ 0 وهو فشل: الـ cron والـ CI والـ [[&&]] في bash بيعتمدوا على الـ exit code.`,
          solCode: R`from pathlib import Path
from typing import Annotated
import typer
app = typer.Typer(help="تقرير مبيعات من ملف CSV")
@app.command()
def report(
    src: Annotated[Path, typer.Argument(exists=True, dir_okay=False, help="ملف الـ CSV")],
    out: Annotated[Path, typer.Option("--out", "-o")] = Path("report.json"),
    city: Annotated[list[str] | None, typer.Option(help="فلتر، وينفع يتكرر")] = None,
    top: Annotated[int, typer.Option(min=1, max=50)] = 5,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    if verbose:
        typer.echo(f"src={src} out={out} city={city} top={top}")
    typer.echo(f"reading {src} -> {out}, cities={city}, top={top}")
if __name__ == "__main__":
    app()`,
          flag: "script",
          deep: {
            why: R`سكربت الـ seed، و import من CSV، وتقرير شهري، و cleanup: كلها بتتشغّل من الترمنال أو cron أو CI، ومحتاجة ملفات وخيارات مختلفة كل مرة. ومن غير arguments الناس بتعدّل الكود قبل كل تشغيل، أو بتقرا [[sys.argv[1]]] من غير أي فحص فتطلع [[IndexError]] بدل رسالة مفهومة.`,
            how: R`[[add_argument("src")]] من غير شرط positional وإجباري. و [[-o]]/[[--out]] option اختياري ليه default. و [[type=Path]] أو [[type=int]] بيحوّل ولو فشل بيطلّع رسالة ويخرج بـ 2. و [[action="store_true"]] flag من غير قيمة، و [[action="append"]] بيجمع التكرار في list، و [[choices=[...]]] قيم محددة، و [[nargs="+"]] واحد أو أكتر. والناتج [[Namespace]] بتوصل لقيمه بـ [[args.top]] (الشرطة في الاسم بتبقى underscore).

[[main(argv=None)]] و [[parse_args(argv)]]: في التشغيل العادي [[argv]] بـ None فبيقرا [[sys.argv]]، وفي الاختبار تبعت list بإيدك ([[main(["orders.csv", "--top", "3"])]]). و [[sys.exit(main())]] بيخلّي الـ return هو الـ exit code. والأخطاء تتطبع على [[sys.stderr]] عشان متختلطش بالـ output لو حد عمل pipe.

typer: كل باراميتر في الدالة من غير default بيبقى argument، واللي ليه default بيبقى option، والنوع بيحدد التحويل والفحص، و [[Annotated[..., typer.Option(...)]]] للتفاصيل. و [[@app.command()]] على كذا دالة بيعمل subcommands زي [[git commit]] و [[git push]].

ومن الترمنال: [[uv run report.py ...]] أو تضيفه في [[[project.scripts]]] في [[pyproject.toml]] فيبقى أمر باسمه بعد التسطيب.`,
            when: R`argparse لسكربت من غير dependencies أو هيتشغّل في مكان مفيهوش venv. typer لأدوات أكبر فيها subcommands ولو المشروع أصلًا فيه dependencies (مشروع FastAPI مثلًا). ولأي سكربت هيعيش أكتر من يوم.`,
            mistakes: R`[[sys.argv[1]]] من غير فحص. و exit code 0 بعد فشل. وطباعة الأخطاء على stdout. وكل الكود على مستوى الملف من غير [[main()]] و [[if __name__ == "__main__"]] فمينفعش تعمله import أو تختبره. و [[type=bool]] في argparse ([[bool("False")]] بـ True! استخدم [[store_true]]).`
          },
          teach: R`## المثال بيعمل إيه؟

سكربت [[report.py]] بياخد اسم ملف CSV من سطر الأوامر، ومعاه خيارات ([[--out]] و [[--city]] و [[--top]] و [[-v]])، ويفحصهم، ويطبع رسالة واضحة ويخرج بـ exit code صح لو حاجة غلط. الشغل الحقيقي (قراية الـ CSV) مش مكتوب، عشان التركيز على الـ arguments. اتشغّل على ويندوز (Python 3.14.3 في Git Bash) وعلى لينكس ([[python:3.13-slim]] في Docker)، وفي نفس الفولدر ملف [[orders.csv]] موجود.

### كلمتين قبل ما نبدأ

| الكلمة | معناها | مثال |
|---|---|---|
| argument | أي كلمة بعد اسم السكربت | [[orders.csv]] و [[--top]] و [[3]] |
| positional | بيتعرف من مكانه، من غير اسم | [[orders.csv]] |
| option | ليه اسم بيبدأ بـ [[--]] (أو [[-]] لاختصار حرف واحد) وبعده قيمة | [[--top 3]] |
| flag | option من غير قيمة: موجود أو لأ | [[-v]] |
| exit code | رقم البرنامج بيرجّعه لما يخلص: 0 نجاح، وغيره فشل | [[echo $?]] في bash |

---

## ١. الـ imports و [[main(argv=None)]]

~~~python
import argparse
import sys
from pathlib import Path
def main(argv: list[str] | None = None) -> int:
~~~

- [[argparse]]: argument parser، في المكتبة الأساسية.
- [[sys]]: عشان [[sys.stderr]] و [[sys.exit]].
- [[argv: list[str] | None = None]]: الباراميتر list of strings **أو** None ([[|]] في type hint معناها «أو»)، والافتراضي None. في التشغيل العادي مش هنبعته، وفي الاختبار نبعت list بإيدنا (تحت).
- [[-> int]]: main بترجّع رقم، وده هيبقى الـ exit code.

---

## ٢. تعريف الـ arguments

~~~python
parser = argparse.ArgumentParser(description="تقرير مبيعات من ملف CSV")
parser.add_argument("src", type=Path, help="ملف الـ CSV")
parser.add_argument("-o", "--out", type=Path, default=Path("report.json"))
parser.add_argument("--city", action="append", help="فلتر، وينفع يتكرر")
parser.add_argument("--top", type=int, default=5, metavar="N")
parser.add_argument("-v", "--verbose", action="store_true")
~~~

| السطر | نوعه | الباراميترات |
|---|---|---|
| [["src"]] | positional، إجباري | [[type=Path]]: النص يتحوّل Path. و [[help]] بيظهر في [[-h]] |
| [["-o", "--out"]] | option باسمين | [[default]] لو محدش كتبه |
| [["--city"]] | option بيتكرر | [[action="append"]]: كل مرة القيمة تتضاف لـ list |
| [["--top"]] | option رقم | [[type=int]] بيحوّل ويرفض اللي مش رقم، و [[metavar="N"]] الاسم اللي يظهر في الـ help بدل [[TOP]] |
| [["-v", "--verbose"]] | flag | [[action="store_true"]]: True لو موجود، و False لو لأ |

الاسم من غير شرطة = positional، وبشرطة = option. واسم الخانة اللي هتقراها بعدين بييجي من الاسم الطويل من غير الشرط: [[args.out]] و [[args.verbose]].

---

## ٣. [[parse_args]] و [[--help]]

~~~python
args = parser.parse_args(argv)
~~~

[[parse_args(None)]] بيقرا [[sys.argv[1:] ]] (الكلمات اللي بعد اسم السكربت). بيفحص، ويحوّل الأنواع، ولو فيه مشكلة بيطبع رسالة ويخرج بـ 2 لوحده. ولو لقى [[-h]] بيطبع الـ help ويخرج بـ 0:

~~~text الناتج: python report.py -h
usage: report.py [-h] [-o OUT] [--city CITY] [--top N] [-v] src

تقرير مبيعات من ملف CSV

positional arguments:
  src            ملف الـ CSV

options:
  -h, --help     show this help message and exit
  -o, --out OUT
  --city CITY    فلتر، وينفع يتكرر
  --top N
  -v, --verbose
~~~

في سطر الـ usage: [[[ ]]] حوالين الحاجة معناها اختيارية، و [[src]] من غير أقواس إجباري. وده كله اتعمل من الـ [[add_argument]] اللي فوق، من غير ما نكتب سطر help بإيدنا.

لو نسيت الملف:

~~~text الناتج: python report.py
usage: report.py [-h] [-o OUT] [--city CITY] [--top N] [-v] src
report.py: error: the following arguments are required: src
~~~

و exit code 2. ولو كتبت حروف بدل رقم:

~~~text الناتج: python report.py orders.csv --top abc
report.py: error: argument --top: invalid int value: 'abc'
~~~

برضه 2، و [[type=int]] هو اللي رفض.

---

## ٤. فحص زيادة: [[parser.error]]

~~~python
if not 1 <= args.top <= 50:
    parser.error("--top must be between 1 and 50")
~~~

- [[1 <= args.top <= 50]]: Python بيسمح بالمقارنة المتسلسلة: «1 أصغر من أو يساوي top، و top أصغر من أو يساوي 50».
- [[parser.error(msg)]]: اطبع الـ usage والرسالة بنفس شكل أخطاء argparse، واخرج بـ 2.

~~~text الناتج: python report.py orders.csv --top 99
usage: report.py [-h] [-o OUT] [--city CITY] [--top N] [-v] src
report.py: error: --top must be between 1 and 50
~~~

---

## ٥. خطأ بإيدك: stderr و [[return 2]]

~~~python
if not args.src.exists():
    print(f"error: {args.src} not found", file=sys.stderr)
    return 2
~~~

- [[args.src]] بقى Path بسبب [[type=Path]]، فـ [[.exists()]] شغالة على طول.
- [[file=sys.stderr]]: اطبع على قناة الأخطاء مش الناتج العادي (stdout). لو حد عمل [[python report.py ... > out.txt]]، الأخطاء هتفضل ظاهرة على الشاشة ومش هتدخل الملف.
- [[return 2]]: الرقم ده هيبقى الـ exit code.

~~~text الناتج: python report.py nope.csv
error: nope.csv not found
~~~

---

## ٦. الشغل، و [[Namespace]]

~~~python
if args.verbose:
    print(args)
print(f"reading {args.src} -> {args.out}, cities={args.city}, top={args.top}")
return 0
~~~

~~~text الناتج: python report.py orders.csv --city Cairo --city Alex --top 3 -v (ويندوز)
Namespace(src=WindowsPath('orders.csv'), out=WindowsPath('report.json'), city=['Cairo', 'Alex'], top=3, verbose=True)
reading orders.csv -> report.json, cities=['Cairo', 'Alex'], top=3
~~~

- [[args]] object من نوع [[Namespace]]: كل argument خانة فيه.
- [[city=['Cairo', 'Alex'] ]]: [[--city]] اتكتب مرتين فبقى list. ولو متكتبش خالص بيبقى [[None]] (جربناه على لينكس: [[cities=None]]).
- [[top=3]] رقم مش [['3']]، و [[out]] خد الـ default.
- على لينكس نفس السطر بيطلع [[PosixPath('orders.csv')]].

---

## ٧. آخر سطرين: [[sys.exit(main())]]

~~~python
if __name__ == "__main__":
    sys.exit(main())
~~~

- الـ if: شغّل main بس لو الملف ده اتشغّل مباشرة (درس «import و packages»).
- [[sys.exit(n)]]: اخرج من البرنامج بالرقم ده. من غيره البرنامج بيخرج بـ 0 دايمًا حتى لو main رجّعت 2.

وعشان main بتاخد [[argv]]، الاختبار بيناديها من غير terminal:

~~~text الناتج: python -c "import report; print(report.main(['orders.csv', '--top', '3']))"
reading orders.csv -> report.json, cities=None, top=3
0
~~~

والـ exit code هو اللي الأدوات التانية بتبص عليه. على لينكس:

~~~bash
python report.py orders.csv --top 99 && echo next-command-ran
echo $?
~~~

~~~text الناتج
report.py: error: --top must be between 1 and 50
2
~~~

[[echo next-command-ran]] متنفّذش لأن [[&&]] بيشغّل اللي بعده بس لو اللي قبله خرج بـ 0. و [[$?]] الـ exit code بتاع آخر أمر. (في PowerShell نفس الرقم في [[$LASTEXITCODE]].)

| الحالة | الناتج | exit |
|---|---|---|
| [[-h]] | الـ help | 0 |
| من غير ملف | [[the following arguments are required: src]] | 2 |
| [[--top abc]] | [[invalid int value: 'abc']] | 2 |
| [[--top 99]] | رسالة [[parser.error]] | 2 |
| ملف مش موجود | رسالتنا على stderr | 2 |
| كله تمام | [[reading ...]] | 0 |

> الفخ: [[type=bool]] في argparse. [[bool("False")]] بتطلع [[True]] (أي نص مش فاضي True)، فـ [[--debug False]] هيبقى True. للـ flags استخدم [[action="store_true"]].

---

## ٨. الحل: نفس السكربت بـ typer

~~~python solCode (أهم سطور)
app = typer.Typer(help="تقرير مبيعات من ملف CSV")
@app.command()
def report(
    src: Annotated[Path, typer.Argument(exists=True, dir_okay=False, help="ملف الـ CSV")],
    out: Annotated[Path, typer.Option("--out", "-o")] = Path("report.json"),
    city: Annotated[list[str] | None, typer.Option(help="فلتر، وينفع يتكرر")] = None,
    top: Annotated[int, typer.Option(min=1, max=50)] = 5,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
~~~

typer (اتسطّب في venv محلي، نسخة 0.27.3) بيقرا الدالة نفسها:

- باراميتر **من غير default** ([[src]]) = positional إجباري. و **بـ default** = option.
- [[Annotated[Path, ...] ]]: النوع [[Path]]، ومعاه معلومات زيادة لـ typer. [[Annotated]] من [[typing]]، وبتلزق بيانات على النوع من غير ما تغيّره.
- [[typer.Argument(exists=True, dir_okay=False)]]: typer نفسه يتأكد إن الملف موجود ومش فولدر. ده بدل الـ if اللي كتبناه بإيدنا.
- [[typer.Option(min=1, max=50)]]: بدل [[parser.error]].
- [[list[str] | None]]: النوع list فـ typer يخلّيه يتكرر، زي [[append]].
- [[bool]] بـ default False: يبقى flag لوحده.
- [[app()]] في الآخر بيشغّل كل ده.

~~~text الناتج: python report_typer.py orders.csv --top 99
Usage: report_typer.py [OPTIONS] {src}
Try 'report_typer.py --help' for help.
┌─ Error ─────────────────────────────────────────────────────────────────────┐
│ Invalid value for '--top': 99 is not in the range 1<=x<=50.                 │
└─────────────────────────────────────────────────────────────────────────────┘
~~~

والباقي اتجرّب بنفس الطريقة، وكله exit 2:

| الحالة | رسالة typer |
|---|---|
| من غير ملف | [[Missing argument 'src'.]] |
| [[--top abc]] | [[Invalid value for '--top': 'abc' is not a valid int range.]] |
| [[nope.csv]] | [[Invalid value for 'src': File 'nope.csv' does not exist.]] |

ومع [[--city Cairo --city Alex --top 3 -v]]:

~~~text الناتج
src=orders.csv out=report.json city=['Cairo', 'Alex'] top=3
reading orders.csv -> report.json, cities=['Cairo', 'Alex'], top=3
~~~

و [[--help]] بيطلّع جدول بإطار فيه الـ arguments والـ options والـ defaults و [[[1<=x<=50]]]، وكمان [[--install-completion]] اللي typer بيضيفه لوحده.

---

## الخلاصة

| argparse | typer |
|---|---|
| [[add_argument("src")]] | باراميتر من غير default |
| [[add_argument("--top", type=int, default=5)]] | [[top: int = 5]] |
| [[action="store_true"]] | [[bool = False]] |
| [[action="append"]] | النوع [[list[str]]] والـ default [[None]] |
| فحص بإيدك + [[parser.error]] | [[min=]] و [[max=]] و [[exists=True]] |
| مكتبة أساسية | [[pip install typer]] |

- [[main(argv=None) -> int]] و [[sys.exit(main())]]: قابل للاختبار، والـ exit code صح.
- الأخطاء على stderr، و 2 لـ «استخدام غلط».`,
          lines: [
            "import.",
            "للـ stderr و exit.",
            "المسارات.",
            R`[[argv]] بـ None في التشغيل العادي، و list في الاختبار.`,
            R`الـ parser، والوصف بيظهر في [[--help]].`,
            R`positional: إجباري، و [[type=Path]] بيحوّله.`,
            "option بشكلين وقيمة افتراضية.",
            R`[[append]]: [[--city A --city B]] بيبقوا list.`,
            R`رقم، و [[metavar]] الاسم اللي يظهر في الـ help.`,
            "flag: True لو موجود.",
            R`اقرا [[sys.argv]] أو الـ list اللي اتبعتت.`,
            "فحص زيادة...",
            R`...[[parser.error]] بيطبع الـ usage والرسالة ويخرج بـ 2.`,
            "الملف موجود؟",
            "الخطأ على stderr مش stdout.",
            "exit code غير صفر = فشل.",
            "لو verbose...",
            "اطبع كل الـ arguments.",
            "الشغل الحقيقي.",
            "نجح.",
            "لما يتشغّل مباشرة بس.",
            R`الـ return بتاع main بقى الـ exit code.`
          ]
        },
        {
          cmd: "subprocess",
          title: "تشغّل أمر من Python بأمان: subprocess.run",
          desc: R`[[subprocess.run(["git", "status"], capture_output=True, text=True)]] بيشغّل برنامج تاني ويستنى يخلص، ويرجّع object فيه [[returncode]] و [[stdout]] و [[stderr]]. و [[check=True]] بيرمي [[CalledProcessError]] لو الأمر فشل، و [[timeout=]] بيقفله لو اتأخر.

القاعدة الذهبية: ابعت الأمر list، كل argument عنصر لوحده، ومن غير [[shell=True]]. كده الـ argument بيوصل للبرنامج زي ما هو حتى لو فيه مسافات أو [[;]] أو [[$]]، ومفيش shell يفسّره. [[shell=True]] مع أي قيمة جاية من برّه = command injection.`,
          example: R`import shutil
import subprocess
import sys
r = subprocess.run(["git", "--version"], capture_output=True, text=True, check=True)
print(r.stdout.strip(), r.returncode)
filename = "my file; rm -rf ~.txt"
r = subprocess.run(["ls", "-l", "--", filename], capture_output=True, text=True)
print(r.returncode, r.stderr.strip())
try:
    subprocess.run([sys.executable, "-c", "import sys; sys.exit(3)"], check=True)
except subprocess.CalledProcessError as e:
    print("فشل بكود", e.returncode)
try:
    subprocess.run(["sleep", "5"], timeout=1)
except subprocess.TimeoutExpired:
    print("اتأخر فاتقفل")
if shutil.which("pg_dump") is None:
    print("pg_dump مش متسطّب")
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True, cwd=".")
print(r.stdout if r.returncode == 0 else "الفولدر ده مش git repo")
# subprocess.run(f"ls {filename}", shell=True)   ممنوع: الـ ; هتشغّل rm -rf`,
          try: R`اكتب [[git_info(repo)]] بترجع dict فيه الـ branch وآخر commit وعدد الملفات المتغيرة، بـ [[git rev-parse --abbrev-ref HEAD]] و [[git log -1 --format=%h %s]] و [[git status --porcelain]]، و [[cwd=repo]] و [[timeout]]. لو git مش متسطّب أو الفولدر مش repo، السكربت يطبع الخطأ على stderr ويخرج بـ 1. جرّبه على repo وعلى [[/tmp]].`,
          sol: R`على repo بيطبع حاجة زي [[{'branch': 'main', 'last': '87185bb آخر رسالة commit', 'dirty': 5}]]. وعلى [[/tmp]]: [[error: fatal: not a git repository (or any of the parent directories): .git]] على stderr و [[echo $?]] بيطلع 1.

لاحظ إن [[--format=%h %s]] عنصر واحد في الـ list مع إن فيه مسافة: مفيش shell يقسّمه، فمش محتاج علامات تنصيص. و [[cwd=repo]] بدل [[os.chdir]] أو [[cd repo && git ...]]، فالسكربت نفسه مبيتنقلش. و [[shutil.which("git")]] قبل النداء بيدّيك رسالة واضحة بدل [[FileNotFoundError]]. والغلطة الشائعة: [[subprocess.run(f"git -C {repo} status", shell=True)]]: يشتغل لحد ما حد يبعت مسار فيه مسافة أو [[;]].`,
          solCode: R`import shutil
import subprocess
import sys
from pathlib import Path
def git(args: list[str], repo: Path) -> str:
    r = subprocess.run(["git", *args], capture_output=True, text=True, cwd=repo, timeout=10)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()
def git_info(repo: Path) -> dict[str, str | int]:
    if shutil.which("git") is None:
        raise RuntimeError("git مش متسطّب")
    return {
        "branch": git(["rev-parse", "--abbrev-ref", "HEAD"], repo),
        "last": git(["log", "-1", "--format=%h %s"], repo),
        "dirty": len(git(["status", "--porcelain"], repo).splitlines()),
    }
if __name__ == "__main__":
    repo = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    try:
        print(git_info(repo))
    except RuntimeError as e:
        print("error:", e, file=sys.stderr)
        sys.exit(1)`,
          flag: "script",
          deep: {
            why: R`سكربتات الأتمتة كتير بتنادي أدوات: [[pg_dump]] للـ backup، و [[git]] في deploy، و [[ffmpeg]] للفيديو، و [[convert]] للصور. و command injection من [[shell=True]] مع اسم ملف أو input من المستخدم ثغرة حقيقية ومشهورة (تاب «الأمان»).`,
            how: R`مع list، Python بينادي البرنامج مباشرة ([[execve]] على لينكس) وكل عنصر بيوصل argument منفصل. مع [[shell=True]] و string، بيشغّل [[/bin/sh -c "..."]]، فالـ shell بيفسّر [[;]] و [[&&]] و [[$()]] و [[*]] والمسافات. فـ [[filename = "x; rm -rf ~"]] في المثال وصل لـ [[ls]] كاسم ملف غريب، مش كأمر تاني.

[[--]] قبل اسم الملف بيقول للبرنامج «اللي بعد كده مش options»، عشان اسم ملف بيبدأ بـ [[-]] (زي [[-rf]]) ميتفهمش flag.

[[capture_output=True]] بيمسك stdout و stderr بدل ما يطبعوا، و [[text=True]] بيحوّلهم str بدل bytes (وتقدر تحدد [[encoding="utf-8"]]). و [[check=True]] بيرمي لو الكود مش صفر، وإلا لازم تفحص [[returncode]] بنفسك. و [[timeout]] بيقتل الأمر ويرمي [[TimeoutExpired]]. و [[cwd]] الفولدر اللي الأمر يتشغّل فيه، و [[env={**os.environ, "PGPASSWORD": ...}]] لمتغيرات بيئة إضافية (أحسن من تحط الباسورد في الـ args لأنها بتظهر في [[ps]]).

[[sys.executable]] مسار الـ Python الحالي (نفس الـ venv)، استخدمه بدل [["python"]]. ولو محتاج pipe بين أمرين: شغّل الاتنين من Python ومرر الـ stdout، أو فكّر لو فيه مكتبة Python تعمل الشغل نفسه. وفي كود async: [[asyncio.create_subprocess_exec]] بدل [[subprocess.run]] اللي بيقفل الـ loop.`,
            when: R`لما الأداة الخارجية هي الطريقة الصح (pg_dump، git، ffmpeg). لو فيه مكتبة Python بتعمل نفس الشغل ([[shutil.copy]] بدل [[cp]]، و [[pathlib]] بدل [[ls]]، و [[httpx]] بدل [[curl]])، استخدمها: أسرع، ومفيش parsing لـ output نصي، وبتشتغل على ويندوز.`,
            mistakes: R`[[shell=True]] مع f-string فيها input. و [[os.system]] (نفس المشكلة، ومن غير output). ومن غير [[check]] ولا فحص [[returncode]] فالفشل يعدّي. ومن غير [[timeout]] فالسكربت يفضل مستني للأبد. و [[subprocess.run]] جوه route [[async def]] في FastAPI (بيقفل الـ event loop، درس «blocking في async»).`
          },
          teach: R`## المثال بيعمل إيه؟

بيشغّل برامج تانية من جوه Python بـ [[subprocess.run]]: [[git]] و [[ls]] و Python نفسه و [[sleep]]، ويمسك الناتج والـ exit code، ويوريك ٣ طرق الفشل (كود غير صفر، وتأخير، وبرنامج مش موجود)، وإزاي اسم ملف فيه [[;]] مبيقدرش يشغّل أمر تاني. اتشغّل على لينكس ([[python:3.13]] في Docker، فيه git) وعلى ويندوز (PowerShell 7، Python 3.14.3).

> [[ls]] و [[sleep]] برامج لينكس. على ويندوز اشتغلوا هنا بس لأن Git for Windows حاططهم في الـ PATH ([[C:\Program Files\Git\usr\bin\ls.exe]]). على ويندوز من غيره هيطلع [[FileNotFoundError]].

---

## ١. الـ imports

~~~python
import shutil
import subprocess
import sys
~~~

- [[subprocess]]: تشغيل process تاني (برنامج) والكلام معاه. process = برنامج شغال.
- [[shutil]]: أدوات ملفات، ومنها [[which]] (تحت).
- [[sys]]: منه [[sys.executable]].

---

## ٢. أول نداء: [[git --version]]

~~~python
r = subprocess.run(["git", "--version"], capture_output=True, text=True, check=True)
print(r.stdout.strip(), r.returncode)
~~~

~~~text الناتج: لينكس ثم ويندوز
git version 2.47.3 0
git version 2.56.0.windows.1 0
~~~

| الحتة | معناها |
|---|---|
| [[["git", "--version"]]] | الأمر **list**: أول عنصر البرنامج، وكل عنصر بعده argument لوحده |
| [[capture_output=True]] | امسك stdout و stderr في الـ object بدل ما يتطبعوا على الشاشة |
| [[text=True]] | رجّعهم str. من غيره bytes: [[b'1\n']] |
| [[check=True]] | لو الـ exit code مش صفر ارمي exception |

[[run]] بيستنى البرنامج يخلص ويرجّع object من نوع [[CompletedProcess]] فيه:

- [[r.stdout]]: الناتج، وآخره [[\n]]، فبنشيله بـ [[strip()]].
- [[r.returncode]]: الـ exit code، و 0 = نجح.
- [[r.stderr]]: الأخطاء.

---

## ٣. اسم ملف «خطير»

~~~python
filename = "my file; rm -rf ~.txt"
r = subprocess.run(["ls", "-l", "--", filename], capture_output=True, text=True)
print(r.returncode, r.stderr.strip())
~~~

~~~text الناتج
2 ls: cannot access 'my file; rm -rf ~.txt': No such file or directory
~~~

- الاسم فيه مسافات و [[;]] و [[rm -rf ~]]. لو shell شافه، [[;]] معناها «خلّص الأمر ده وابدأ أمر جديد»، و [[rm -rf ~]] بيمسح الـ home كله.
- لكن مع list **مفيش shell خالص**: Python بيشغّل [[ls]] مباشرة وبيدّيه الـ string كلها argument واحد. فـ [[ls]] دوّر على ملف اسمه بالحرف [[my file; rm -rf ~.txt]] وملقاهوش.
- [[--]]: عرف عند أغلب البرامج معناه «اللي بعدي مش options». من غيره اسم ملف زي [[-rf]] بيتفهم flags: [[ls -l -rf]] اشتغل وطلع listing (exit 0)، و [[ls -- -rf]] قال [[cannot access '-rf']].
- [[2]]: الـ exit code بتاع [[ls]] لما الملف مش موجود. ومن غير [[check=True]] مفيش exception، فلازم تبص على [[returncode]] بنفسك.

### نفس الحاجة بـ [[shell=True]] (اتجرّبت في Docker بأمر آمن)

السطر الأخير في المثال متعلّق عليه عشان خطير. جربنا الفكرة بـ [[echo]] بدل [[rm]]:

~~~python
filename = "my file; echo INJECTED"
r = subprocess.run(f"ls {filename}", shell=True, capture_output=True, text=True)
~~~

~~~text الناتج: repr(r.stdout) و repr(r.stderr)
'INJECTED\n' "ls: cannot access 'my': No such file or directory\nls: cannot access 'file': No such file or directory\n"
~~~

الـ shell قسّم على المسافات ([[my]] و [[file]] بقوا ملفين)، وبعدين نفّذ [[echo INJECTED]] كأمر تاني. لو مكانها [[rm -rf ~]] كان اتنفّذ. ده اسمه **command injection**.

---

## ٤. [[check=True]] و [[CalledProcessError]]

~~~python
try:
    subprocess.run([sys.executable, "-c", "import sys; sys.exit(3)"], check=True)
except subprocess.CalledProcessError as e:
    print("فشل بكود", e.returncode)
~~~

~~~text الناتج
فشل بكود 3
~~~

- [[sys.executable]]: المسار الكامل لـ Python اللي شغّال دلوقتي (نفس الـ venv). أضمن من [["python"]] اللي ممكن يلاقي نسخة تانية في الـ PATH.
- [["-c", "import sys; sys.exit(3)"]]: Python صغير بيخرج بكود 3. والـ [[;]] هنا جوه كود Python، مش shell.
- [[check=True]] شاف 3 فرمى [[CalledProcessError]]، و [[e.returncode]] فيه الرقم.

---

## ٥. [[timeout]] و [[TimeoutExpired]]

~~~python
try:
    subprocess.run(["sleep", "5"], timeout=1)
except subprocess.TimeoutExpired:
    print("اتأخر فاتقفل")
~~~

~~~text الناتج
اتأخر فاتقفل
~~~

[[sleep 5]] بيستنى ٥ ثواني. [[timeout=1]]: بعد ثانية Python بيقتل البرنامج ويرمي [[TimeoutExpired]]. السكربت كله على لينكس خلص في [[real 0m1.260s]] مش ٥ ثواني. من غير timeout، أمر واقف (مستني باسورد مثلًا) بيوقّف السكربت للأبد.

---

## ٦. [[shutil.which]]

~~~python
if shutil.which("pg_dump") is None:
    print("pg_dump مش متسطّب")
~~~

~~~text الناتج
pg_dump مش متسطّب
~~~

[[which]] بيدوّر على البرنامج في الـ PATH زي أمر [[which]] في bash: بيرجّع مساره أو [[None]]. لو ناديت برنامج مش موجود مباشرة:

~~~text الناتج: subprocess.run(["nosuchcmd"])
FileNotFoundError: [Errno 2] No such file or directory: 'nosuchcmd'
~~~

فالفحص قبلها بيدّيك رسالة مفهومة بدل الـ exception ده.

---

## ٧. [[cwd]] وفحص [[returncode]] بإيدك

~~~python
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True, cwd=".")
print(r.stdout if r.returncode == 0 else "الفولدر ده مش git repo")
~~~

- [[cwd]] = current working directory: الفولدر اللي الأمر يتشغّل فيه. [["."]] الفولدر الحالي. السكربت نفسه مبيتنقلش.
- [[--short]]: كل ملف متغير في سطر قصير.
- [[A if cond else B]]: لو الكود صفر اطبع الناتج، وإلا الرسالة.

| مكان التشغيل | الناتج |
|---|---|
| فولدر التجربة (مش repo) | [[الفولدر ده مش git repo]] |
| repo نضيف | سطر فاضي ([[stdout]] فاضي) |
| repo فيه ملف جديد [[a.txt]] | [[?? a.txt]] ([[??]] = ملف git مش متابعه) |

---

## ٨. الحل: [[git_info]]

~~~python solCode (القلب)
def git(args: list[str], repo: Path) -> str:
    r = subprocess.run(["git", *args], capture_output=True, text=True, cwd=repo, timeout=10)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()
~~~

- [[["git", *args]]]: الـ [[*]] بيفرد عناصر الـ list جوه list جديدة: [[*["log", "-1"]]] تبقى [["git", "log", "-1"]].
- لو فشل: [[raise RuntimeError(...)]] برسالة git نفسها.
- [[["log", "-1", "--format=%h %s"]]]: [[-1]] آخر commit بس، و [[%h]] الـ hash القصير و [[%s]] العنوان. فيه مسافة ومع ذلك عنصر واحد من غير تنصيص، لأن مفيش shell يقسّمه.
- [[len(git(["status", "--porcelain"], repo).splitlines())]]: [[--porcelain]] شكل ثابت للسكربتات، سطر لكل ملف متغير، فعدد السطور = عدد الملفات.
- في الـ main: [[except RuntimeError as e]] يطبع على stderr و [[sys.exit(1)]].

~~~text الناتج: لينكس، repo فيه commit و a.txt متعدّل و b.txt جديد
{'branch': 'main', 'last': '3734806 first commit', 'dirty': 2}
~~~

~~~text الناتج: python sol.py /tmp
error: fatal: not a git repository (or any of the parent directories): .git
~~~

و exit 1. وعلى ويندوز نفس الشكل: [[{'branch': 'main', 'last': '85fec8f first commit', 'dirty': 1}]]، وعلى فولدر مش repo نفس رسالة الـ fatal و exit 1.

---

## الخلاصة

| الباراميتر | ليه |
|---|---|
| الأمر list | كل argument بيوصل زي ما هو، ومفيش shell |
| [[capture_output=True, text=True]] | الناتج في [[r.stdout]] و [[r.stderr]] كـ str |
| [[check=True]] | الفشل يبقى [[CalledProcessError]] |
| [[timeout=n]] | [[TimeoutExpired]] بدل ما يقف للأبد |
| [[cwd=folder]] | شغّل في فولدر تاني من غير [[cd]] |
| [[sys.executable]] | نفس Python ونفس الـ venv |
| [[shutil.which(name)]] | البرنامج موجود؟ |

- متكتبش [[shell=True]] مع أي حاجة جاية من برّه، ومتستخدمش [[os.system]].`,
          lines: [
            R`[[which]] للبحث عن برنامج في الـ PATH.`,
            "import.",
            R`[[sys.executable]].`,
            R`list: البرنامج والـ arguments، و [[check=True]] يرمي لو فشل.`,
            "الناتج والكود.",
            "اسم ملف فيه ; و rm: كأنه جاي من المستخدم.",
            R`بيوصل لـ [[ls]] كـ argument واحد، و [[--]] يمنع إنه يتفهم flag.`,
            "ls بيقول الملف مش موجود، ومفيش حاجة اتمسحت.",
            "try.",
            "Python بيخرج بكود 3.",
            R`[[check=True]] حوّل الفشل لـ exception.`,
            "الكود.",
            "try.",
            "أمر بياخد ٥ ثواني.",
            R`[[timeout=1]]: اتقفل ورمى.`,
            "اطبع.",
            "البرنامج متسطّب؟",
            "رسالة واضحة بدل FileNotFoundError.",
            R`[[cwd]]: الفولدر اللي الأمر يتشغّل فيه.`,
            R`افحص [[returncode]] بنفسك لو مش مستخدم check.`
          ]
        }
      ]
    }
]);
