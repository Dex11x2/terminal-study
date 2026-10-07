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
    }
]);
