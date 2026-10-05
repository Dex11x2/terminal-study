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
    },
    {
      t: "pytest بالتفصيل",
      l: 2,
      n: "fixtures و conftest.py، و parametrize، و tmp_path، و monkeypatch و mock، واختبار FastAPI، و coverage",
      items: [
        {
          cmd: "@pytest.fixture",
          title: "تجهيز وتنضيف مشترك بين الاختبارات",
          desc: R`الـ fixture دالة عليها [[@pytest.fixture]] بتجهّز حاجة الاختبار محتاجها (اتصال بقاعدة، client، ملف). الاختبار بيطلبها بإنه يكتب اسمها كباراميتر، و pytest بيناديها ويدّيله الناتج.

لو فيها [[yield]]: اللي قبله تجهيز، واللي بعده تنضيف بيشتغل بعد الاختبار حتى لو وقع. و [[scope]] بيحدد بتتعمل كام مرة: لكل اختبار (الافتراضي)، ولا مرة للملف، ولا مرة للتشغيل كله. والـ fixtures المشتركة بتتحط في [[conftest.py]] فكل ملفات الاختبار تشوفها من غير import.`,
          example: R`# tests/conftest.py
import sqlite3
import pytest
@pytest.fixture(scope="session")
def db_url(tmp_path_factory):
    return str(tmp_path_factory.mktemp("data") / "test.db")
@pytest.fixture
def db(db_url):
    conn = sqlite3.connect(db_url)
    conn.execute("CREATE TABLE IF NOT EXISTS users (name TEXT)")
    yield conn
    conn.execute("DELETE FROM users")
    conn.commit()
    conn.close()
# tests/test_users.py
def test_add_user(db):
    db.execute("INSERT INTO users VALUES ('sara')")
    assert db.execute("SELECT count(*) FROM users").fetchone()[0] == 1
def test_starts_empty(db):
    assert db.execute("SELECT count(*) FROM users").fetchone()[0] == 0`,
          try: R`حط الملفين وشغّل [[pytest tests/test_users.py --setup-show]] وشوف امتى كل fixture بيتعمل ويتقفل. وبعدين غيّر [[@pytest.fixture]] اللي فوق [[db]] لـ [[@pytest.fixture(scope="module")]] وشغّل تاني: اختبار واحد هيقع. ليه؟`,
          flag: "script",
          deep: {
            why: "من غير fixtures كل اختبار بيبدأ بعشر سطور تجهيز متكررة، وبينسى يقفل الاتصال أو يمسح البيانات، فالاختبار التاني بيلاقي زبالة الأول. الـ fixture بيحط التجهيز والتنضيف في مكان واحد، والاختبار يفضل فيه السطرين اللي بيختبروا بس.",
            how: R`pytest بيقرا أسماء باراميترات الاختبار، ولكل اسم بيدوّر على fixture بنفس الاسم: في نفس الملف، وبعدين في [[conftest.py]] في نفس الفولدر، وبعدين في conftest.py في الفولدرات اللي فوقه، وبعدين الـ fixtures الجاهزة (زي [[tmp_path]] و [[monkeypatch]] و [[capsys]]) واللي جاية من plugins. والـ fixture نفسه ممكن يطلب fixtures تانية بنفس الطريقة: [[db]] هنا طالب [[db_url]].

[[yield]] بيقسم الدالة نصين: الجزء اللي قبله setup، والقيمة اللي بعد yield هي اللي بتوصل للاختبار، والجزء اللي بعده teardown. الـ teardown بيشتغل حتى لو الاختبار فشل، زي finally.

[[scope]]: [[function]] (الافتراضي) نسخة جديدة لكل اختبار. [[module]] مرة لكل ملف. [[session]] مرة للتشغيل كله: مناسب للحاجات الغالية اللي مبتتغيرش (مسار القاعدة، container Postgres، الـ app). القاعدة: fixture ممكن يطلب fixture في نفس الـ scope أو أوسع، مش أضيق. session مينفعش يطلب fixture بـ function scope، و pytest بيقولك [[ScopeMismatch]].

[[autouse=True]] بيخلي الـ fixture يشتغل لكل اختبار من غير ما حد يطلبه (هتشوفه في درس monkeypatch بيمنع الشبكة).

[[--setup-show]] بيطبع كل SETUP و TEARDOWN والحرف جنبه ([[S]] session و [[F]] function). و [[pytest --fixtures]] بيطبع كل الـ fixtures المتاحة ومكانها.`,
            when: "أي تجهيز بيتكرر في أكتر من اختبار: قاعدة، client للـ API، ملفات، مستخدم جاهز. وكل حاجة محتاجة تتقفل أو تتمسح بعد الاختبار.",
            mistakes: R`scope أوسع من اللازم لحاجة بتتغير: الاختبارات بتنجح لوحدها وتفشل مع بعض أو بالعكس، حسب الترتيب. و [[return]] بدل [[yield]] فالتنضيف اللي بعده مبيتنفذش أصلًا. ونداء الـ fixture كدالة عادية [[db()]] من جوه الاختبار: pytest بيرفض ويقولك fixtures مش معمولة تتنادى مباشرة. وفي الانترفيو: «إيه الفرق بين fixture و setUp في unittest؟» الإجابة: الـ fixture بيتطلب بالاسم فكل اختبار ياخد اللي محتاجه بس، وبيتركّب (fixture يطلب fixture)، وليه scope، والتنضيف جنب التجهيز بـ yield.`
          },
          lines: [
            "SQLite جاية مع Python، مناسبة للمثال.",
            "pytest.",
            "fixture بيتعمل مرة واحدة للتشغيل كله.",
            R`بيطلب [[tmp_path_factory]] (fixture جاهز للـ session scope).`,
            "مسار ملف القاعدة في فولدر مؤقت.",
            "fixture لكل اختبار (الافتراضي).",
            "بيطلب db_url، فـ pytest بيجهّزه الأول.",
            "افتح اتصال.",
            "اعمل الجدول لو مش موجود.",
            "ادّي الاتصال للاختبار، واستنى لحد ما يخلص.",
            "بعد الاختبار: امسح اللي اتكتب...",
            "...واحفظ المسح...",
            "...واقفل الاتصال.",
            "اختبار بيطلب db بالاسم.",
            "ضيف صف.",
            "في صف واحد.",
            "اختبار تاني بيطلب db.",
            "المفروض يبدأ فاضي لأن التنضيف اشتغل."
          ],
          sol: R`[[--setup-show]] بيطبع حاجة زي: [[SETUP S db_url]] مرة واحدة في الأول، وبعدين لكل اختبار [[SETUP F db]] ثم الاختبار ثم [[TEARDOWN F db]]، وفي الآخر [[TEARDOWN S db_url]]. يعني db اتعمل واتقفل مرتين، و db_url مرة. (لو عندك plugins زي pytest-asyncio هتلاقي fixtures زيادة في الناتج، عادي.)

بـ [[scope="module"]]: [[test_starts_empty]] بيقع بـ [[assert 1 == 0]]. الـ fixture بقى بيتعمل مرة واحدة للملف، فالتنضيف (DELETE) مش بيشتغل غير بعد آخر اختبار في الملف، والتاني شايف الصف اللي الأول ضافه. ولو غيّرت ترتيب الاختبارين الاتنين هينجحوا، ودي أخطر حاجة: اختبارات نتيجتها بتعتمد على الترتيب.

الحل: ارجع للـ function scope للحاجة اللي بتتغير. ولو التجهيز غالي فعلًا، خلّي الغالي (الاتصال نفسه) session، وخلّي التنضيف (rollback أو DELETE) في fixture تاني بـ function scope، زي ما db_url و db متقسمين هنا.`,
          solCode: R`# tests/conftest.py: الغالي مرة واحدة، والتنضيف لكل اختبار
import sqlite3
import pytest

@pytest.fixture(scope="session")
def conn(tmp_path_factory):
    c = sqlite3.connect(tmp_path_factory.mktemp("data") / "test.db")
    c.execute("CREATE TABLE IF NOT EXISTS users (name TEXT)")
    yield c
    c.close()

@pytest.fixture
def db(conn):
    yield conn
    conn.rollback()
    conn.execute("DELETE FROM users")
    conn.commit()`
        },
        {
          cmd: "@pytest.mark.parametrize",
          title: "اختبار واحد على جدول حالات",
          desc: R`بدل ما تكتب نفس الاختبار خمس مرات بأرقام مختلفة: [[@pytest.mark.parametrize]] بياخد أسماء الباراميترات ولستة حالات، و pytest بيشغّل الاختبار مرة لكل حالة، وكل مرة بتظهر كاختبار منفصل باسم الحالة.

و [[pytest.raises]] بيختبر إن الكود رمى exception معيّن، و [[match]] بيتأكد من الرسالة.`,
          example: R`import pytest
from app.pricing import final_price
@pytest.mark.parametrize(
    ("price", "coupon", "expected"),
    [
        (200, None, 200),
        (200, "SAVE10", 180),
        (0, "SAVE10", 0),
        pytest.param(200, "save10", 180, id="lowercase-coupon"),
    ],
)
def test_final_price(price, coupon, expected):
    assert final_price(price, coupon) == expected
@pytest.mark.parametrize("price", [-1, -100])
def test_negative_price_rejected(price):
    with pytest.raises(ValueError, match="negative"):
        final_price(price, None)`,
          try: R`اكتب [[app/pricing.py]] فيه [[final_price]] بتقارن [[coupon == "SAVE10"]] بس، وشغّل [[pytest -v]]. شوف مين وقع واسمه إيه. صلّح الدالة، وضيف حالة [[(99, "SAVE10", 89)]] وتأكد إنها بتعدّي.`,
          flag: "script",
          deep: {
            why: "الأخطاء بتستخبى في الحالات الطرفية: صفر، سالب، حروف صغيرة، قيمة فاضية. لو كل حالة محتاجة اختبار كامل هتكتب اتنين وتزهق. الجدول بيخلي إضافة حالة سطر واحد، وبيوريك في النتيجة أنهي حالة بالظبط وقعت.",
            how: R`أول argument أسماء الباراميترات (tuple أو string فيه أسماء مفصولة بفاصلة)، والتاني لستة، كل عنصر فيها tuple بنفس الترتيب. pytest بيعمل اختبار لكل عنصر، والـ id التلقائي من القيم: [[test_final_price[200-SAVE10-180] ]].

[[pytest.param(..., id="...")]] بيدّي الحالة اسم مقروء، وتقدر تضيف [[marks=pytest.mark.xfail]] لحالة معروف إنها بايظة لسه. و [[pytest -k lowercase]] يشغّل الحالة دي لوحدها.

لو حطيت أكتر من parametrize فوق بعض، pytest بيعمل كل التوافيق (2 × 3 = 6 اختبارات).

[[with pytest.raises(ValueError, match="negative")]]: لو الكود جوه الـ with مرماش ValueError، الاختبار بيفشل بـ [[DID NOT RAISE]]. و [[match]] regex بيتدوّر عليه في رسالة الـ exception. ولو محتاج الـ exception نفسه: [[with pytest.raises(ValueError) as exc:]] وبعدين [[exc.value]].

وتقدر تعمل parametrize لـ fixture كمان: [[@pytest.fixture(params=["sqlite", "postgres"])]] وجواه [[request.param]]، فكل الاختبارات اللي بتطلبه تتشغّل مرتين.`,
            when: "أي دالة ليها مدخلات ومخرجات واضحة: حسابات، validation، parsing، تحويل تواريخ. وأي bug اتصلّح: ضيفه كحالة في الجدول عشان ميرجعش.",
            mistakes: R`اختبار فيه [[for]] على الحالات بدل parametrize: أول حالة تقع بتوقف الباقي، ومش هتعرف غير أول غلطة. وحساب الـ expected بنفس المعادلة اللي في الكود ([[price * 0.9]]): لو المعادلة غلط الاختبار هيعدّي. اكتب الرقم بإيدك. و [[pytest.raises(Exception)]] عام أوي: هيعدّي حتى لو الكود وقع بـ TypeError من غلطة تانية خالص.`
          },
          lines: [
            "pytest.",
            "الدالة اللي بنختبرها.",
            "اختبار واحد على جدول حالات:",
            "أسماء الباراميترات.",
            "الحالات:",
            "من غير كوبون.",
            "كوبون صح: خصم ١٠٪.",
            "حالة طرفية: سعر صفر.",
            "حالة ليها اسم مقروء في الناتج.",
            "نهاية اللستة.",
            "نهاية الـ decorator.",
            "الاختبار بياخد الباراميترات.",
            "المقارنة.",
            "جدول بباراميتر واحد.",
            "اختبار إن السعر السالب مرفوض.",
            "لازم يرمي ValueError ورسالتها فيها negative.",
            "النداء اللي المفروض يرمي."
          ],
          sol: R`بالمقارنة الحرفية، [[pytest -v]] بيطلّع خمسة PASSED وواحد [[FAILED tests/test_pricing.py::test_final_price[lowercase-coupon] ]]، والرسالة [[assert 200 == 180]]. الاسم اللي انت ادّيته للحالة هو اللي باين، فعرفت المشكلة من غير ما تفتح الكود: الكوبون بحروف صغيرة مش متعرف عليه.

التصليح: قارن بعد [[.upper()]]، ومن غير ما تقع لو الكوبون [[None]]. بعدها الستة PASSED، والحالة الجديدة [[99]] تطلع [[89]] (لأن [[round(89.1)]] = 89).

لو ضفت الحالة الجديدة وكتبت expected [[89.1]] هتقع: الدالة بتقرّب لرقم صحيح. وده بالظبط اللي الجدول بيكشفه: قرار (نقرّب ولا لأ) لازم يبقى مكتوب في اختبار.`,
          solCode: R`# app/pricing.py
def final_price(price: int, coupon: str | None) -> int:
    if price < 0:
        raise ValueError("price can't be negative")
    if coupon and coupon.upper() == "SAVE10":
        return round(price * 0.9)
    return price

# في tests/test_pricing.py ضيف للّستة:
#     (99, "SAVE10", 89),`
        },
        {
          cmd: "tmp_path",
          title: "اختبار بيكتب ويقرا ملفات",
          desc: R`[[tmp_path]] fixture جاهز في pytest: بيدّيك فولدر فاضي جديد (كـ [[pathlib.Path]]) لكل اختبار. تكتب فيه وتقرا منه براحتك، ومش هتلمس ملفات المشروع الحقيقية ولا اختبار يشوف ملفات التاني.

ولو محتاج فولدر واحد مشترك لكذا اختبار (session scope)، في [[tmp_path_factory]].`,
          example: R`import json
from app.config import load_config
def test_reads_config(tmp_path):
    cfg = tmp_path / "config.json"
    cfg.write_text(json.dumps({"port": 9000}), encoding="utf-8")
    assert load_config(cfg) == {"port": 9000, "debug": False}
def test_missing_file_uses_defaults(tmp_path):
    assert load_config(tmp_path / "nope.json") == {"port": 8000, "debug": False}`,
          try: R`اكتب [[save_report(rows, out_dir)]] بتكتب [[report.csv]] فيه [[name,price]] وصف لكل عنصر وترجّع مسار الملف. اختبرها بـ tmp_path، واطبع [[tmp_path]] وشغّل بـ [[pytest -s]] عشان تشوف الفولدر ده فين.`,
          flag: "script",
          deep: {
            why: R`اختبار بيكتب في [[./output]] أو [[/tmp/report.csv]]: اختبارين بيكتبوا نفس الملف في نفس الوقت (مع pytest-xdist) فيبوظوا بعض، وملف فاضل من run قديم بيخلي الاختبار يعدّي غلط، وممكن تمسح ملف حقيقي بالغلط. tmp_path بيحل التلاتة.`,
            how: R`pytest بيعمل فولدر أساسي ([[/tmp/pytest-of-USER/pytest-N/]] على لينكس)، وجواه فولدر لكل اختبار باسمه ([[test_reads_config0]]). وبيحتفظ بآخر ٣ تشغيلات بس ويمسح الأقدم، فلو اختبار وقع تقدر تفتح الفولدر وتشوف الملفات اللي كان كاتبها.

[[tmp_path]] من نوع [[pathlib.Path]]: [[/]] بيركّب المسارات، و [[write_text]] و [[read_text]] و [[mkdir]] و [[exists]] جاهزين. ادّي الدالة بتاعتك [[Path]] مش string متركّب، وخلّيها تقبل المسار كباراميتر بدل ما تكون مثبتاه جواها: ده اللي بيخليها قابلة للاختبار أصلًا.

[[--basetemp=DIR]] بيغيّر المكان (وبيمسحه في أول كل تشغيل، فمتدّيهوش فولدر فيه حاجة مهمة).

fixtures جاهزة قريبة: [[capsys]] بيمسك الـ print ([[capsys.readouterr().out]])، و [[caplog]] بيمسك رسايل logging، و [[monkeypatch.chdir(tmp_path)]] لو الكود بيكتب في الفولدر الحالي.`,
            when: "أي كود بيقرا أو يكتب ملفات: config، تقارير CSV، رفع صور، cache على الديسك.",
            mistakes: R`دالة بتكتب في مسار ثابت جواها ([[open("report.csv", "w")]]) فمتقدرش تختبرها غير بإنك تكتب في فولدر المشروع. و [[open()]] من غير [[encoding="utf-8"]]: بيعدّي على لينكس ويقع على ويندوز مع العربي. واستخدام الـ [[tempfile]] بإيدك من غير تنضيف.`
          },
          lines: [
            "json.",
            "الدالة اللي بتقرا ملف الإعدادات.",
            "الاختبار بيطلب tmp_path.",
            "مسار ملف جوه الفولدر المؤقت.",
            "اكتب فيه JSON.",
            "القيم اللي في الملف غطّت الافتراضي، والباقي افتراضي.",
            "اختبار تاني بفولدر مؤقت تاني.",
            "ملف مش موجود: يرجع الافتراضي من غير ما يقع."
          ],
          sol: R`الاختبار بيعدّي، و [[-s]] بيطبع مسار زي [[/tmp/pytest-of-USER/pytest-6/test_save_report0]] على لينكس، و [[C:\Users\USER\AppData\Local\Temp\pytest-of-USER\pytest-0\test_save_report0]] على ويندوز (جربت الاتنين). افتحه بعد التشغيل هتلاقي report.csv لسه موجود (pytest بيسيب آخر ٣ تشغيلات).

الـ CSV المتوقع بالظبط: [[name,price]] ثم [[pen,5]] ثم [[cup,12]]. ولاحظ إن [[csv.DictReader]] بيرجّع كل القيم strings ([["12"]] مش [[12]])، فلو قارنت بـ int هيقع.

الغلطة الشائعة: [[open(out, "w")]] من غير [[newline=""]]: على ويندوز بيطلع سطر فاضي بين كل صف والتاني ([[\r\r\n]]). والتانية: الدالة بتكتب في [["report.csv"]] ثابت، فالاختبار مبيلاقيش الملف في tmp_path.`,
          solCode: R`# app/report_csv.py
import csv
from pathlib import Path

def save_report(rows: list[dict], out_dir: Path) -> Path:
    out = out_dir / "report.csv"
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["name", "price"])
        w.writeheader()
        w.writerows(rows)
    return out

# tests/test_report_csv.py
import csv
from app.report_csv import save_report

def test_save_report(tmp_path):
    print(tmp_path)
    out = save_report([{"name": "pen", "price": 5}, {"name": "cup", "price": 12}], tmp_path)
    assert out == tmp_path / "report.csv"
    assert out.read_text(encoding="utf-8").splitlines() == ["name,price", "pen,5", "cup,12"]
    with out.open(encoding="utf-8") as f:
        assert list(csv.DictReader(f))[1] == {"name": "cup", "price": "12"}`
        },
        {
          cmd: "monkeypatch",
          title: "تغيّر متغير بيئة أو دالة للاختبار ده بس",
          desc: R`[[monkeypatch]] fixture جاهز بيغيّر حاجات مؤقتًا: [[setenv]] و [[delenv]] لمتغيرات البيئة، و [[setattr]] يبدّل دالة أو قيمة في module أو object، و [[chdir]] يغيّر الفولدر الحالي. وبعد الاختبار كل حاجة بترجع زي ما كانت لوحدها، حتى لو الاختبار وقع.

بيه تعزل الحاجات اللي بتتغير لوحدها: الوقت، والبيئة، والشبكة.`,
          example: R`# tests/conftest.py
import pytest
@pytest.fixture(autouse=True)
def no_network(monkeypatch):
    def guard(*args, **kwargs):
        raise RuntimeError("network call in a test!")
    monkeypatch.setattr("socket.socket.connect", guard)
# tests/test_env_time.py
from app import clock, settings
def test_debug_from_env(monkeypatch):
    monkeypatch.setenv("APP_DEBUG", "1")
    assert settings.is_debug() is True
def test_debug_off_by_default(monkeypatch):
    monkeypatch.delenv("APP_DEBUG", raising=False)
    assert settings.is_debug() is False
def test_greeting_morning(monkeypatch):
    monkeypatch.setattr(clock, "current_hour", lambda: 9)
    assert clock.greeting() == "صباح الخير"`,
          try: R`اعمل [[app/settings.py]] بيقرا [[APP_DEBUG]] جوه [[is_debug()]] والاختبارات تعدّي. وبعدين غيّره يقرا المتغير مرة واحدة في أول الملف ([[DEBUG = os.environ.get("APP_DEBUG") == "1"]]) و [[is_debug]] ترجّع [[DEBUG]]، وشغّل تاني. مين وقع وليه؟ وصلّح الاختبار من غير ما ترجّع الكود.`,
          flag: "script",
          deep: {
            why: R`الكود اللي بيعتمد على [[datetime.now()]] أو [[os.environ]] أو API خارجي نتيجته بتتغير: الاختبار يعدّي الصبح ويقع بالليل، أو يعدّي عندك ويقع في CI عشان متغير مش موجود هناك. ولو غيّرت [[os.environ]] بإيدك من غير ترجيع، الاختبارات اللي بعده بتتأثر.`,
            how: R`كل عملية في monkeypatch بتتسجّل، وبعد الاختبار بيعمل undo بالعكس. [[setenv("APP_DEBUG", "1")]] بيحط القيمة (لازم string)، و [[delenv(..., raising=False)]] بيشيله ومش بيقع لو مش موجود أصلًا.

[[setattr(clock, "current_hour", lambda: 9)]] بيبدّل الاسم [[current_hour]] جوه الـ module [[clock]]. ولأن [[greeting()]] بتدوّر على [[current_hour]] في الـ module بتاعها وقت ما تتنادى، هتلاقي النسخة المزيّفة. ده أبسط وأأمن من إنك تزيّف [[datetime]] نفسه: خلّي الوقت ييجي من دالة صغيرة بتاعتك، وزيّفها هي. (وفيه مكتبات زي time-machine و freezegun لو محتاج توقّف الساعة للكود كله.)

والصيغة بـ string: [[setattr("socket.socket.connect", guard)]] بيعمل import للمسار ويبدّل آخر اسم. هنا بتبدّل [[connect]] لكل socket، فأي اختبار بيحاول يكلّم الشبكة (httpx أو requests أو asyncpg) بيقع فورًا برسالة واضحة. و [[autouse=True]] بيطبّقه على كل الاختبارات من غير ما حد يطلبه. [[TestClient]] بتاع FastAPI مش بيفتح socket، فمش بيتأثر. (ولو عايز ده جاهز بإعدادات أكتر، فيه plugin اسمه pytest-socket.)

[[monkeypatch.chdir(tmp_path)]] لكود بيكتب في الفولدر الحالي، و [[monkeypatch.setitem(d, key, value)]] لـ dict زي الإعدادات.`,
            when: "متغيرات البيئة، والوقت، والفولدر الحالي، ومنع الشبكة في كل الاختبارات. ولتبديل دالة بسيطة بقيمة ثابتة. ولو محتاج تتأكد الدالة اتنادت بإيه، استخدم mock (الدرس الجاي).",
            mistakes: R`قيمة بتتقري وقت الـ import (ثابت في أول الملف): [[setenv]] بعد كده مبيأثرش لأن القيمة اتحسبت خلاص، وده السؤال اللي في «جرّب». و [[setattr]] على المكان الغلط (نفس فكرة «patch في المكان اللي بيتقري منه» في الدرس الجاي). و [[os.environ["X"] = "1"]] بإيدك في اختبار: بيفضل لكل الاختبارات اللي بعده. و [[setenv("PORT", 8000)]] برقم مش string.`
          },
          lines: [
            "pytest.",
            "fixture بيشتغل لكل اختبار لوحده.",
            "بيطلب monkeypatch.",
            "دالة بدل connect...",
            "...بتقع برسالة واضحة.",
            "أي اتصال شبكة في أي اختبار هيقع.",
            "الموديولات اللي بنختبرها.",
            "اختبار متغير البيئة.",
            "APP_DEBUG=1 للاختبار ده بس.",
            "الكود شايفه.",
            "الحالة العكسية.",
            "اتأكد إن المتغير مش موجود حتى لو موجود عندك.",
            "الافتراضي False.",
            "اختبار بيعتمد على الساعة.",
            "الساعة ٩ الصبح دايمًا في الاختبار ده.",
            "النتيجة ثابتة مهما شغّلته امتى."
          ],
          sol: R`بعد التغيير: [[test_debug_from_env]] بيقع بـ [[assert False is True]]. الـ [[DEBUG]] اتحسب مرة واحدة لما pytest عمل import لـ settings (قبل أي اختبار)، والمتغير ساعتها مكانش موجود. [[setenv]] بعد كده غيّر [[os.environ]] بس، والثابت فضل False.

التصليح من غير ما ترجّع الكود: بدّل الثابت نفسه بـ [[monkeypatch.setattr(settings, "DEBUG", True)]].

وده درس تصميم: الكود اللي بيقرا البيئة وقت ما يتنادى (أو من object إعدادات بيتعمل بدالة، زي pydantic-settings مع [[get_settings]] في «تاب Python و FastAPI») أسهل بكتير في الاختبار من ثوابت وقت الـ import.`,
          solCode: R`# app/settings.py (القراية وقت الـ import)
import os

DEBUG = os.environ.get("APP_DEBUG") == "1"

def is_debug() -> bool:
    return DEBUG

# tests/test_settings.py
from app import settings

def test_debug_on(monkeypatch):
    monkeypatch.setattr(settings, "DEBUG", True)
    assert settings.is_debug() is True`
        },
        {
          cmd: "unittest.mock.patch",
          title: "تزيّف API خارجي وتتأكد اتنادى بإيه",
          desc: R`[[unittest.mock]] جاية مع Python. [[Mock]] object بيقبل أي نداء ويسجّله، وتحدد هو يرجّع إيه ([[return_value]]) أو يرمي إيه ([[side_effect]]). و [[patch("module.name")]] بيبدّل اسم بـ Mock جوه with، وبعدها بيرجّعه.

القاعدة الأهم: اعمل patch في المكان اللي الاسم بيتقري منه، مش المكان اللي اتعرّف فيه. لو [[app/report.py]] فيه [[from app.weather import fetch_temp]]، يبقى تعمل patch لـ [[app.report.fetch_temp]].`,
          example: R`from unittest.mock import Mock, patch
import httpx
import pytest
from app.report import daily_report
from app.weather import fetch_temp
def test_report_hot():
    with patch("app.report.fetch_temp", return_value=40) as fake:
        assert daily_report("Aswan") == "Aswan: 40°C حر"
    fake.assert_called_once_with("Aswan")
def test_fetch_temp_parses_json():
    resp = Mock(spec=httpx.Response)
    resp.json.return_value = {"temp": 22.5}
    with patch("app.weather.httpx.get", return_value=resp) as get:
        assert fetch_temp("Cairo") == 22.5
    get.assert_called_once_with("https://api.example.com/weather/Cairo", timeout=5)
def test_timeout_bubbles_up():
    with patch("app.report.fetch_temp", side_effect=httpx.ReadTimeout("slow")):
        with pytest.raises(httpx.ReadTimeout):
            daily_report("Cairo")`,
          try: R`اعمل [[app/weather.py]] فيه [[fetch_temp]] بتنادي [[httpx.get]]، و [[app/report.py]] فيه [[from app.weather import fetch_temp]] و [[daily_report]]. شغّل الاختبارات. وبعدين في [[test_report_hot]] غيّر المسار لـ [["app.weather.fetch_temp"]] وشغّل تاني. إيه اللي حصل وليه؟`,
          flag: "script",
          deep: {
            why: "اختبار بيكلّم API حقيقي: بطيء، وبيقع لما النت يقطع أو الـ API يغيّر بياناته، وممكن يبعت SMS أو يخصم فلوس بجد. والحالات المهمة (timeout، 500، رد غريب) صعب تخلّي الـ API الحقيقي يعملها وقت ما انت عايز. الـ mock بيخليك تتحكم في الرد، وتتأكد إن الكود بتاعك بعت الطلب الصح.",
            how: R`[[from app.weather import fetch_temp]] جوه report.py بيعمل اسم جديد [[fetch_temp]] في الـ namespace بتاع [[app.report]] بيشاور على نفس الدالة. [[patch("app.weather.fetch_temp")]] بيغيّر الاسم في weather بس، و report لسه ماسك الدالة الأصلية. عشان كده بتعمل patch لـ [[app.report.fetch_temp]]: الاسم اللي daily_report بتدوّر عليه فعلًا. ولو report كان كاتب [[import app.weather]] وبينادي [[app.weather.fetch_temp()]]، ساعتها الـ patch يبقى في [[app.weather]]. ونفس الفكرة في [[app.weather.httpx.get]]: الاسم httpx جوه weather.

[[return_value]] القيمة اللي النداء بيرجّعها. [[side_effect]] لو exception بيترمي، ولو لستة بيرجّع عنصر مع كل نداء (مفيد لـ retry: أول مرة timeout وتاني مرة نجاح)، ولو دالة بتتنادى بنفس الباراميترات.

[[Mock(spec=httpx.Response)]] بيسمح بس بالأسماء اللي موجودة فعلًا في Response، فلو كتبت [[resp.jsn()]] غلط هيقع بدل ما يرجّع Mock تاني بهدوء. وفي patch نفس الفكرة بـ [[autospec=True]]: بيتأكد كمان من عدد الباراميترات. وفيه [[patch.object(report, "fetch_temp", ...)]] لو عندك الـ module نفسه.

التأكيدات: [[assert_called_once_with(...)]]، و [[assert_not_called()]]، و [[call_args]] و [[call_count]] لو عايز تبص بنفسك. ولدوال async فيه [[AsyncMock]] (و patch بيستخدمه لوحده لو الدالة الأصلية async).

وفيه plugin اسمه pytest-mock بيدّيك fixture [[mocker]]: [[mocker.patch("app.report.fetch_temp", return_value=40)]] من غير with، وبيترجع لوحده بعد الاختبار.`,
            when: R`حدود النظام بس: HTTP لخدمات تانية، إيميل و SMS، بوابات دفع، الوقت. متعملش mock لكودك الداخلي كله، ولا للقاعدة بتاعتك: اختبر الـ SQL على Postgres حقيقي في Docker. ولـ HTTP كتير فيه كمان مكتبة respx اللي بتزيّف httpx على مستوى الطلبات.`,
            mistakes: R`patch في مكان التعريف بدل مكان الاستخدام: الـ mock مبيتناداش والكود الحقيقي يشتغل (وده أشهر سؤال عن mock في الانترفيو). و [[fake.called_once_with("Aswan")]] من غير assert في الأول: لحد Python 3.11 ده كان مجرد attribute على الـ Mock بيرجّع Mock تاني، فالسطر بيعدّي دايمًا ومش بيختبر حاجة. من 3.12 Python بيمسك الغلطة دي بالذات ([[AttributeError: 'called_once_with' is not a valid assertion]])، وكمان [[assert_called_once_wiht]] بإملاء غلط. بس أي اسم تاني غلط زي [[fake.was_called_with("Aswan")]] لسه بيرجّع Mock ويعدّي بهدوء (جربت الاتنين على 3.11 و 3.13). واختبارات كلها mocks بتختبر إن الكود بينادي الـ mocks بس، فتعدّي والكود بايظ.`
          },
          lines: [
            "Mock و patch من المكتبة الجاهزة.",
            "httpx (عشان نوع الـ Response والـ exceptions).",
            "pytest.",
            "الدالة اللي بتستخدم fetch_temp.",
            "الدالة اللي بتكلّم الـ API.",
            "اختبار التقرير من غير شبكة.",
            R`بدّل [[fetch_temp]] في المكان اللي report بيقراه منه، وخلّيها ترجّع 40.`,
            "40 أكبر من 35 فلازم يقول حر.",
            "واتنادت مرة واحدة بالمدينة الصح.",
            "اختبار الـ parsing نفسه.",
            "رد وهمي بنفس شكل httpx.Response.",
            "الـ json بتاعه يرجّع ده.",
            "بدّل httpx.get زي ما weather شايفه.",
            "الدالة استخرجت الرقم صح.",
            "والطلب اتبعت على الـ URL الصح وبـ timeout.",
            "اختبار الخطأ.",
            "الـ API بيعمل timeout.",
            "التقرير مش بيبلع الخطأ...",
            "...بيطلّعه للي فوقه."
          ],
          sol: R`بالمسار الصح التلاتة بيعدّوا.

بـ [["app.weather.fetch_temp"]]: [[daily_report]] لسه بتنادي الدالة الأصلية لأن [[app.report]] عنده اسم خاص بيه اتربط وقت الـ import. فالدالة الحقيقية بتحاول تكلّم [[api.example.com]] بجد. جربتها: [[test_report_hot]] وقع بـ [[httpx.ConnectError: [Errno -2] Name or service not known]] على لينكس، و [[httpx.ConnectError: [Errno 11001] getaddrinfo failed]] على ويندوز، لأن الدومين ده مالوش عنوان أصلًا. وحتى مع fixture منع الشبكة من درس monkeypatch طلع نفس الـ ConnectError، لأن البحث عن الدومين (DNS) بيفشل قبل ما يوصل لـ connect. ومع API حقيقي الوضع أسوأ: الاختبار ممكن يعدّي لو الـ API رجّع رقم، وانت فاكر إن الـ mock شغال.

القاعدة: شوف الملف اللي فيه الكود اللي بتختبره، والاسم مكتوب فيه إزاي. [[from x import f]] يبقى patch لـ [[yourmodule.f]]. و [[import x]] ثم [[x.f()]] يبقى patch لـ [[x.f]].

و [[patch.object]] مع [[autospec=True]] بيعمل نفس الحاجة وبيتأكد كمان إن النداء بعدد باراميترات صح.`,
          solCode: R`from unittest.mock import patch
from app import report

def test_report_hot():
    with patch.object(report, "fetch_temp", return_value=40, autospec=True) as fake:
        assert report.daily_report("Aswan") == "Aswan: 40°C حر"
    fake.assert_called_once_with("Aswan")`
        },
        {
          cmd: "TestClient و conftest",
          title: "اختبارات FastAPI من غير سيرفر ولا قاعدة حقيقية",
          desc: R`كل اللي فات بيتجمع هنا: fixture في [[conftest.py]] بيبدّل الـ dependency بتاعة التخزين بـ dict فاضي لكل اختبار عن طريق [[app.dependency_overrides]]، ويفتح [[TestClient]] بـ with، ويشيل الـ overrides في التنضيف. والاختبار يطلب [[client]] و [[store]] ويشتغل.

وللاختبارات async: [[httpx.AsyncClient]] مع [[ASGITransport]]. شرح TestClient و dependency_overrides نفسهم في درس [[dependency_overrides]] في «تاب Python و FastAPI». هنا إزاي تنظّمهم كـ fixtures.`,
          example: R`# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import app, get_store
@pytest.fixture
def store():
    return {}
@pytest.fixture
def client(store):
    app.dependency_overrides[get_store] = lambda: store
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
# tests/test_items.py
import httpx
import pytest
from app.main import app
def test_create_then_get(client, store):
    r = client.post("/items", json={"name": "pen", "price": 5})
    assert r.status_code == 201
    assert store == {1: {"name": "pen", "price": 5}}
    assert client.get("/items/1").json() == {"name": "pen", "price": 5}
@pytest.mark.asyncio
async def test_health_async():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        r = await ac.get("/health")
    assert r.json() == {"ok": True}`,
          try: R`اعمل [[app/main.py]] فيه [[get_store()]] بترجّع dict عالمي، و [[POST /items]] و [[GET /items/{item_id}]] بيستخدموها بـ Depends. سطّب [[pytest-asyncio]]. ضيف اختبار إن [[price: "abc"]] بيرجّع 422 والـ store فاضل فاضي، واختبار إن [[GET /items/99]] بيرجّع 404. وبعدين شيل override الـ store وشغّل [[pytest -k create_then_get]] لوحده، وبعدين الملف كله بعد ما تضيف اختبار تاني بيعمل POST قبله.`,
          flag: "script",
          deep: {
            why: "لو كل اختبار بيعمل TestClient ويبدّل الـ dependencies بإيده، هتنسى clear مرة، والـ override يفضل لباقي الاختبارات ويعدّيها غلط. الـ fixtures بتخلي ده مكتوب مرة واحدة وصح. ولو الـ store عالمي من غير override، اختبار بيسيب بيانات للي بعده.",
            how: R`[[store]] fixture بيرجّع dict جديد لكل اختبار. و [[client]] بيطلبه، ويحط [[lambda: store]] مكان [[get_store]]، فكل route بياخد الـ dict ده. والاختبار بيطلب الاتنين، فيقدر يبص جوه [[store]] بعد الـ request ويتأكد الـ route كتب إيه بالظبط، مش بس الرد.

[[with TestClient(app)]] بيشغّل الـ lifespan (startup و shutdown)، والـ yield جوه with يعني الـ client مفتوح طول الاختبار. بعد الاختبار: with بتقفل، وبعدين [[clear()]].

[[TestClient]] متزامن: بيشغّل التطبيق في thread بـ event loop خاص بيه، فالاختبار نفسه [[def]] عادي. لما الاختبار نفسه محتاج [[await]] (يكلّم قاعدة async مثلًا)، استخدم [[httpx.AsyncClient]] بـ [[ASGITransport(app=app)]]: بيكلّم التطبيق مباشرة من غير شبكة، و [[base_url]] أي حاجة. والاختبار async محتاج plugin: [[@pytest.mark.asyncio]] من pytest-asyncio (أو [[asyncio_mode = auto]] في pytest.ini من غير الـ decorator)، أو [[@pytest.mark.anyio]] من anyio اللي جاي مع FastAPI. و ASGITransport مش بيشغّل الـ lifespan.

في نسخ Starlette الحديثة ممكن تشوف تحذير إن TestClient عايز [[httpx2]] بدل httpx. الاختبارات شغالة، والتحذير بيروح لو سطّبته.

والقاعدة الحقيقية: fixture بـ session scope بيعمل الـ pool على Postgres اختبار، وfixture لكل اختبار بيفتح transaction ويعمل rollback في الآخر.`,
            when: "أي مشروع FastAPI، من أول endpoint. الـ fixtures دي بتتنسخ من مشروع للتاني تقريبًا زي ما هي.",
            mistakes: R`fixture الـ client بـ session scope والـ store بـ function: pytest يقولك ScopeMismatch، ولو خلّيت الاتنين session الاختبارات تشوف بيانات بعض. و [[return TestClient(app)]] بدل [[with ... yield]] فالـ lifespan مبيشتغلش والـ clear مالهاش مكان. واختبار async من غير plugin: pytest بيقولك [[async def functions are not natively supported]] ويفشله. واختبار بيتأكد من status_code بس: 201 بيطلع حتى لو اتكتب في الـ store حاجة غلط.`
          },
          lines: [
            "pytest.",
            "client بيكلّم التطبيق من غير سيرفر.",
            "التطبيق والـ dependency اللي هنبدّلها.",
            "fixture...",
            "...للتخزين:",
            "dict جديد فاضي لكل اختبار.",
            "fixture للـ client...",
            "...بيطلب store.",
            "أي route محتاج get_store ياخد الـ dict ده.",
            "افتح الـ client (والـ lifespan يشتغل).",
            "ادّيه للاختبار.",
            "بعد الاختبار: شيل التبديل.",
            "httpx للنسخة async.",
            "pytest.",
            "التطبيق.",
            "الاختبار بيطلب الاتنين بالاسم.",
            "اعمل عنصر.",
            "اتعمل.",
            "واتكتب في الـ store بالظبط كده.",
            "واترجع صح.",
            "اختبار async (pytest-asyncio).",
            "دالة الاختبار async.",
            "transport بيكلّم التطبيق مباشرة.",
            "client async.",
            "await على الطلب.",
            "الرد."
          ],
          sol: R`الاختبارين الجداد بيعدّوا: [[price: "abc"]] بيرجّع 422 و [[detail[0]["loc"] ]] = [[["body", "price"] ]]، والـ store فاضل [[{}]] لأن FastAPI رفض قبل ما الدالة تتنادى. و [[/items/99]] بيرجّع 404.

من غير override الـ store جربت الحالتين:

[[test_create_then_get]] وقع حتى لوحده بـ [[assert {} == {1: {'name': ..., 'price': 5}}]]: الـ route كتب في [[_STORE]] العالمي، والـ [[store]] اللي الاختبار بيبص فيه dict تاني فاضي ملوش علاقة بيه.

ولما شلت سطر [[assert store == ...]]، عدّى لوحده، ووقع لما اختبار تاني عمل POST قبله: [[assert {'name': 'x', 'price': 1} == {'name': 'pen', 'price': 5}]]، لأن العنصر رقم 1 بقى بتاع الاختبار اللي قبله. نتيجة بتعتمد على الترتيب: رجّع الـ override.

لو الاختبار async قال [[async def functions are not natively supported]]: pytest-asyncio مش متسطّب أو الـ mark ناقص.`,
          solCode: R`# tests/test_items_errors.py
def test_invalid_price_422(client, store):
    r = client.post("/items", json={"name": "pen", "price": "abc"})
    assert r.status_code == 422
    assert r.json()["detail"][0]["loc"] == ["body", "price"]
    assert store == {}

def test_missing_item_404(client):
    assert client.get("/items/99").status_code == 404

# app/main.py (الأجزاء المهمة)
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
_STORE: dict[int, dict] = {}

def get_store() -> dict[int, dict]:
    return _STORE

class Item(BaseModel):
    name: str
    price: int

@app.post("/items", status_code=201)
def create_item(item: Item, store: dict = Depends(get_store)):
    new_id = len(store) + 1
    store[new_id] = item.model_dump()
    return {"id": new_id, **store[new_id]}

@app.get("/items/{item_id}")
def get_item(item_id: int, store: dict = Depends(get_store)):
    if item_id not in store:
        raise HTTPException(404, "item not found")
    return store[item_id]`
        },
        {
          cmd: "pytest --cov",
          title: "أنهي سطور الاختبارات مش بتعدّي عليها",
          desc: R`[[pytest-cov]] بيشغّل الاختبارات ويقيس كل سطر في الكود اتنفذ ولا لأ. [[--cov-report=term-missing]] بيطبع النسبة لكل ملف وأرقام السطور اللي محدش جربها. و [[--cov-fail-under]] بيفشّل التشغيل لو النسبة قلّت عن رقم، فتحطه في CI.

ولو بتستخدم uv: [[uv add --dev pytest pytest-cov]] و [[uv run pytest]] (uv نفسه في درس [[uv و pyproject.toml]] في «تاب Python و FastAPI»).

الأوامر دي بتكتب [[pytest]] لوحده، فبتفترض إن [[pytest.ini]] فيه [[pythonpath = .]] (درس «pytest.ini»). من غيره [[uv run pytest]] وقع عندي بـ [[ModuleNotFoundError: No module named 'app']]، والحل يا السطر ده يا [[python -m pytest]].`,
          example: R`pip install pytest-cov
pytest --cov=app --cov-report=term-missing
pytest --cov=app --cov-branch --cov-fail-under=90
pytest --cov=app --cov-report=html
uv add --dev pytest pytest-cov
uv run pytest --cov=app --cov-report=term-missing
# Linux (and WSL):
xdg-open htmlcov/index.html
# Mac:
open htmlcov/index.html
# Windows (PowerShell):
start htmlcov/index.html`,
          try: R`شغّل [[pytest --cov=app --cov-branch --cov-report=term-missing]] على المشروع، وشوف الأرقام في عمود Missing. اكتب اختبارات للسطور دي لحد ما [[--cov-fail-under=100]] تعدّي. وبعدين اسأل نفسك: أنهي اختبار منهم فعلًا بيحمي من bug؟`,
          deep: {
            why: "بتفتكر إن الاختبارات مغطية الكود، وبعدين bug يطلع في فرع else محدش جربه قبل كده. التقرير بيوريك بالأرقام فين المناطق اللي محدش بيختبرها، خصوصًا مسارات الأخطاء.",
            how: R`[[--cov=app]] بيقيس الباكدج app بس، مش الاختبارات ولا المكتبات. الجدول فيه لكل ملف: Stmts (السطور)، و Miss (اللي متنفذتش)، و Cover، و Missing (أرقامها).

[[--cov-branch]] بيقيس الفروع كمان: [[if x:]] من غير else اتجرب لما x صح بس؟ السطر متغطي بس الفرع التاني لأ. بيزوّد عمودين Branch و BrPart، و [[4->6]] في Missing يعني النط من سطر 4 لـ 6 مجاش أبدًا.

[[--cov-fail-under=90]] لو المجموع أقل من 90٪: رسالة [[FAIL Required test coverage of 90% not reached]] والـ exit code مش صفر، فـ CI يبقى أحمر.

[[--cov-report=html]] بيعمل [[htmlcov/]] فيه كل ملف ملوّن: أخضر اتنفذ وأحمر لأ. أسهل بكتير من أرقام السطور. ضيف htmlcov و [[.coverage]] لـ .gitignore.

الإعدادات تتحط في [[pyproject.toml]] تحت [[[tool.coverage.run] ]] ([[branch = true]] و [[source = ["app"] ]]) و [[[tool.coverage.report] ]] ([[fail_under]] و [[show_missing]] و [[exclude_also]] لسطور زي [[if TYPE_CHECKING:]]). و [[# pragma: no cover]] جنب سطر بيستبعده.

pytest-cov بيستخدم مكتبة coverage تحت. من pytest-cov 7 قياس الـ subprocesses محتاج إعداد في coverage نفسها ([[patch = ["subprocess"] ]] تحت [[[tool.coverage.run] ]]) بدل ما كان تلقائي.`,
            when: "في CI على كل PR، بحد أدنى معقول ميقلّش. ومحليًا بـ html لما تكتب اختبارات لجزء جديد وعايز تعرف نسيت إيه.",
            mistakes: R`تطارد ١٠٠٪: تكتب اختبارات بتنادي الكود من غير assert حقيقي عشان الرقم يطلع. التغطية بتقولك السطر اتنفذ، مش إن نتيجته اتفحصت. رقم عالي مش معناه اختبارات كويسة، ورقم واطي معناه أكيد في حاجات مش مختبرة. و [[--cov]] من غير اسم الباكدج فيقيس كل حاجة ويطلع رقم مضلل. وفي الانترفيو: «الـ coverage ٩٥٪ يبقى الكود سليم؟» لأ، ووضّح ليه (branch coverage، وجودة الـ asserts، والحالات الطرفية، وmutation testing كفكرة).`
          },
          lines: [
            "سطّب الـ plugin.",
            "النسبة لكل ملف وأرقام السطور الناقصة.",
            "قيس الفروع كمان، وافشل لو أقل من ٩٠٪.",
            "تقرير HTML ملوّن.",
            "نفس الكلام بـ uv: مكتبات dev.",
            "وتشغيلها جوه الـ venv بتاع uv.",
            "افتح التقرير في المتصفح.",
            "نفس الحاجة على الماك.",
            "وعلى ويندوز ([[start]] في PowerShell اختصار لـ Start-Process)."
          ],
          sol: R`جربتها على مشروع الدروس اللي فاتت (pytest 9.1 و pytest-cov 7.1)، والجدول طلع: [[app/clock.py 80% Missing 4]] (الـ [[current_hour]] الحقيقية، لأن كل الاختبارات مزيّفاها)، و [[app/main.py 95% Missing 8]] (الـ [[get_store]] الحقيقية، لأن الـ override بيبدّلها دايمًا). ومع [[--cov-branch]] ممكن يظهر فرع [[مساء الخير]] في greeting مش متجرب، لو greeting مكتوبة بـ if و else. عندي كانت سطر واحد بـ [[... if ... else ...]] جوه return، و coverage مش بيعد ده فرعين، فمظهرش.

و [[--cov-fail-under=99]] قبل الحل طلّع [[FAIL Required test coverage of 99% not reached. Total coverage: 96.67%]]. وبعد الاختبارات اللي في الحل: [[Required test coverage of 100% reached. Total coverage: 100.00%]].

والإجابة على السؤال: اختبار [[greeting]] بالليل مفيد فعلًا (فرع حقيقي في المنطق). اختبار إن [[get_store()]] بترجّع dict مش بيحمي من حاجة تقريبًا، كتبناه عشان الرقم بس. في مشروع حقيقي الأحسن تستثني السطر ده، أو تغطيه باختبار integration حقيقي من غير override.`,
          solCode: R`# tests/test_cov_gaps.py
from datetime import datetime
from app import clock
from app.main import get_store

def test_current_hour_is_real_hour():
    assert clock.current_hour() == datetime.now().hour

def test_greeting_evening(monkeypatch):
    monkeypatch.setattr(clock, "current_hour", lambda: 20)
    assert clock.greeting() == "مساء الخير"

def test_real_store_is_a_dict():
    assert isinstance(get_store(), dict)`
        }
      ]
    },
    {
      t: "الـ debugging في Python",
      l: 2,
      n: "breakpoint() و أوامر pdb، و post-mortem بعد الـ exception، و debugpy في VS Code و Docker",
      items: [
        {
          cmd: "breakpoint()",
          title: "توقّف البرنامج وتبص جواه",
          desc: R`[[breakpoint()]] في أي سطر بيوقّف البرنامج هناك ويفتح [[pdb]] في الترمنال: تطبع أي متغير، وتمشي سطر سطر، وتدخل جوه الدوال. أسرع من print في كل حتة لأنك بتسأل البرنامج وهو واقف بدل ما تخمّن تطبع إيه وتعيد التشغيل.

الأوامر الأساسية: [[p x]] اطبع، و [[n]] السطر اللي بعده، و [[s]] ادخل جوه الدالة، و [[c]] كمّل، و [[ll]] اعرض الدالة، و [[q]] اخرج.`,
          example: R`def average(nums):
    total = 0
    for i in range(1, len(nums)):
        total += nums[i]
    breakpoint()
    return total / len(nums)
print(average([10, 20, 30]))`,
          try: R`احفظ الكود في [[average.py]] وشغّله بـ [[python average.py]]. المفروض المتوسط 20. لما يقف عند [[(Pdb)]] اكتب [[p total, len(nums)]] و [[ll]]، ولاقي الغلطة. وبعدين شيل الـ breakpoint وحط واحد جوه الـ for، واستخدم [[n]] و [[p i, nums[i] ]] كذا مرة و [[c]].`,
          flag: "script",
          deep: {
            why: "print debugging بيتحول لعشرين print، تشيلهم وتنسى واحد في الكود اللي نزل. والـ debugger بيوريك كل حاجة في اللحظة دي: كل المتغيرات، ومين نادى مين، وتقدر تجرّب تعبير على القيم الحقيقية قبل ما تعدّل الكود.",
            how: R`[[breakpoint()]] (من Python 3.7) بتنادي [[pdb.set_trace()]] بشكل افتراضي. من Python 3.13 البرنامج بيقف عند سطر الـ [[breakpoint()]] نفسه، وبيطبع [[> file.py(5)average()]] و [[-> breakpoint()]] (السهم هو السطر الحالي). في النسخ الأقدم كان بيقف على السطر اللي بعدها ([[-> return ...]]).

الأوامر:

[[p expr]] و [[pp expr]] (منسّق للـ dict الكبيرة). وأي تعبير Python بتكتبه مباشرة بيتنفذ، بس لو اسم المتغير زي أمر (زي [[n]] أو [[c]]) اكتب [[p n]] أو [[!n]].

[[n]] (next) نفّذ السطر وروح اللي بعده من غير ما تدخل الدوال. [[s]] (step) ادخل جوه الدالة اللي في السطر. [[r]] (return) كمّل لحد ما الدالة الحالية ترجع. [[c]] (continue) كمّل لحد breakpoint تاني أو النهاية. [[unt N]] كمّل لحد سطر N (مفيد تخرج من loop).

[[l]] و [[ll]] اعرض الكود (ll الدالة كلها). [[w]] (where) الـ stack: مين نادى مين. [[u]] و [[d]] اطلع وانزل في الـ stack تبص على متغيرات الدالة اللي نادت.

[[b file.py:20]] breakpoint جديد من غير ما تعدّل الكود، و [[b 20, x > 100]] مشروط. [[display expr]] يطبع التعبير كل ما يتغير. [[interact]] يفتح REPL كامل بالمتغيرات. [[q]] يخرج (والبرنامج بيقف).

[[PYTHONBREAKPOINT=0]] بيعطّل كل الـ breakpoint() من غير ما تمسحهم، و [[PYTHONBREAKPOINT=ipdb.set_trace]] يستخدم debugger تاني.

مع pytest: [[breakpoint()]] جوه اختبار شغالة عادي (pytest بيقفل الـ capture لوحده). ومع uvicorn: بتقف في الترمنال اللي شغّال فيه السيرفر والـ request مستني.`,
            when: "لما النتيجة غلط ومش عارف ليه، وعدد القيم اللي محتاج تشوفها أكتر من print أو اتنين. أو عايز تفهم كود مش بتاعك بتتبعه سطر سطر.",
            mistakes: R`تنسى [[breakpoint()]] في الكود وتعمل commit: السيرفر أو الـ CI يقف مستني input للأبد. (ruff بيمسكها بقاعدة T100.) و breakpoint جوه container شغال في الخلفية: مفيش ترمنال تكتب فيه، استخدم debugpy. ومتغير اسمه [[c]] أو [[n]] وتكتب اسمه فـ pdb ينفّذ الأمر بدل ما يطبعه.`
          },
          lines: [
            "دالة المتوسط (فيها غلطة).",
            "المجموع يبدأ صفر.",
            "لف على العناصر...",
            "...وجمّعها.",
            "وقّف هنا وافتح pdb.",
            "رجّع المتوسط.",
            "شغّل على [10, 20, 30]."
          ],
          sol: R`البرنامج بيطبع [[16.666666666666668]] مش 20. عند [[(Pdb)]]، [[p total, len(nums)]] بيطبع [[(50, 3)]]: المجموع 50 مش 60، فالقسمة سليمة والجمع هو الغلط. [[ll]] بيعرض الدالة وسهم [[->]] عند سطر الـ [[breakpoint()]] (في Python 3.13 وأحدث؛ الأقدم كان بيوقف السهم عند الـ return).

وبالـ breakpoint جوه الـ for: أول وقفة [[p i, nums[i] ]] بيطبع [[(1, 20)]]، يعني أول عنصر (10) اتفوّت خالص. الغلطة [[range(1, len(nums))]]، وصحها [[range(len(nums))]]، والأحسن من غير index أصلًا: [[sum(nums)]].

لو كتبت [[n]] عشان تطبع متغير اسمه n، pdb بينفّذ next. اكتب [[p n]].`,
          solCode: R`def average(nums):
    if not nums:
        raise ValueError("empty list")
    return sum(nums) / len(nums)

print(average([10, 20, 30]))  # 20.0`
        },
        {
          cmd: "python -m pdb",
          title: "تفتح الـ debugger مكان الـ exception بعد ما يقع",
          desc: R`post-mortem: البرنامج وقع بـ exception، وعايز تبص على المتغيرات في اللحظة اللي وقع فيها بالظبط من غير ما تعرف تحط breakpoint فين. [[python -m pdb -c continue]] بيشغّل السكربت، ولو وقع بيفتح pdb في السطر اللي رمى الـ exception.

ومع pytest: [[--pdb]] بيفتح pdb عند أول اختبار يفشل، و [[--trace]] بيوقف في أول كل اختبار.`,
          example: R`python -m pdb -c continue seed.py data.csv
pytest -x --pdb
pytest --trace tests/test_pricing.py::test_negative_price_rejected
python -i seed.py data.csv
PYTHONBREAKPOINT=0 python seed.py data.csv`,
          try: R`اعمل [[data.csv]] فيه [[pen,5]] و [[book,12]] و [[cup,ten]]، و [[seed.py]] بيقرا الملف بـ [[csv.reader]] ويحوّل العمود التاني بـ [[int()]]. شغّله عادي وشوف الـ traceback، وبعدين بـ [[python -m pdb -c continue]]، واكتب [[p row]] و [[w]]. وصلّح الـ seed يقول رقم السطر البايظ بدل ما يقع.`,
          deep: {
            why: "الـ traceback بيقولك السطر، بس مش بيقولك القيم: أنهي صف من ١٠ آلاف صف في الـ CSV كان بايظ؟ post-mortem بيوقّفك في اللحظة دي بالظبط، بكل المتغيرات زي ما هي.",
            how: R`[[python -m pdb script.py args]] بيوقف قبل أول سطر. و [[-c continue]] بيدّيله أمر [[c]] أول ما يفتح، فالبرنامج يمشي عادي، ولو حصل exception مش متمسك بيطبعه ويقولك [[Entering post mortem debugging]] ويفتح pdb عند السطر اللي رماه. من هناك [[p]] و [[w]] و [[u]] و [[d]] زي الدرس اللي فات. ([[c]] أو [[s]] بعدها بيعيد تشغيل البرنامج من الأول، و [[q]] يخرج.)

[[python -i script.py]]: بعد ما السكربت يخلص أو يقع، بيفتح Python REPL بكل المتغيرات العالمية. ولو وقع، اكتب [[import pdb; pdb.pm()]] يفتح post-mortem على آخر exception.

[[pytest --pdb]] بيفتح pdb عند أي فشل (assert أو exception) جوه الاختبار نفسه، و [[-x]] معاه عشان يقف عند أول واحد بدل ما يفتح pdb لكل فشل. [[--trace]] بيوقف في أول كل اختبار مختار، كأنك حاطط breakpoint() في أوله.

[[PYTHONBREAKPOINT=0]] بيعطّل الـ breakpoint() اللي في الكود للتشغيل ده، مفيد لو نسيت واحد وعايز تشغّل بسرعة.

وفي كود: [[pdb.post_mortem(exc.__traceback__)]] جوه except بيفتح pdb على exception مسكته. ومن Python 3.14 فيه [[python -m pdb -p PID]] يتصل ببرنامج شغال فعلًا (لسه جديد، اتأكد من نسختك).`,
            when: "سكربت أو job وقع وعايز تعرف ليه في دقيقة. واختبار بيفشل ورسالة الـ assert مش كفاية.",
            mistakes: R`[[--pdb]] في CI أو مع [[-n auto]] (pytest-xdist): مفيش ترمنال تفاعلي، فبيعلّق أو يتجاهل. و [[c]] بعد post-mortem وتستغرب إن البرنامج بدأ من الأول. وتصلّح بإنك تحط try/except بيبلع الخطأ ويكمّل بهدوء: الأحسن تقول الصف البايظ فين وتقرر (تتخطاه وتسجّله، أو توقف).`
          },
          lines: [
            "شغّل، ولو وقع افتح pdb مكان الـ exception.",
            "افتح pdb عند أول اختبار يفشل.",
            "وقّف في أول الاختبار ده وامشي سطر سطر.",
            R`بعد ما يقع افتح REPL، واكتب [[import pdb; pdb.pm()]].`,
            "شغّل من غير ما يقف عند أي breakpoint() في الكود."
          ],
          sol: R`التشغيل العادي بيقع بـ [[ValueError: invalid literal for int() with base 10: 'ten']] وسطر [[int(row[1])]]، من غير ما يقولك أنهي صف.

بـ pdb: بيطبع نفس الـ traceback وبعده [[Uncaught exception. Entering post mortem debugging]] و [[> seed.py(3)parse()]]. [[p row]] بيطبع [[['cup', 'ten'] ]]، و [[w]] بيوريك الـ stack: الـ module (سطر الـ list comprehension) نادى parse. (من Python 3.12 الـ comprehension مبقاش ليه frame لوحده في الـ stack.)

التصليح: [[enumerate(..., start=1)]] عشان رقم السطر، وتمسك [[ValueError]] وترمي رسالة واضحة فيها السطر والقيمة (أو تسجّل الصف وتكمّل لو ده المطلوب). من غير ما تبلع الخطأ بصمت.`,
          solCode: R`import csv
import sys

def parse(row: list[str], line: int) -> dict:
    try:
        return {"name": row[0], "price": int(row[1])}
    except (ValueError, IndexError) as e:
        raise ValueError(f"line {line}: bad row {row!r}") from e

with open(sys.argv[1], newline="", encoding="utf-8") as f:
    rows = [parse(r, n) for n, r in enumerate(csv.reader(f), start=1)]
print(len(rows), "rows")
# ValueError: line 3: bad row ['cup', 'ten']`
        },
        {
          cmd: "debugpy و launch.json",
          title: "breakpoints في VS Code لـ FastAPI والاختبارات و Docker",
          desc: R`[[debugpy]] هو الـ debugger اللي VS Code بيستخدمه لـ Python (من خلال إضافة Python Debugger). بتحط نقطة حمرا جنب السطر (F9)، وتشغّل من Run and Debug (F5)، والبرنامج يقف هناك وتشوف Variables و Call Stack و Watch.

[[.vscode/launch.json]] بيحدد إزاي يشغّل: uvicorn كـ module، أو pytest على الملف المفتوح، أو يتصل (attach) بـ debugpy شغال جوه container.`,
          example: R`{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--port", "8000"],
      "justMyCode": true
    },
    {
      "name": "pytest: this file",
      "type": "debugpy",
      "request": "launch",
      "module": "pytest",
      "args": ["$__{file}", "-x", "-q"]
    },
    {
      "name": "Attach to Docker",
      "type": "debugpy",
      "request": "attach",
      "connect": { "host": "localhost", "port": 5678 },
      "pathMappings": [{ "localRoot": "$__{workspaceFolder}", "remoteRoot": "/app" }]
    }
  ]
}`,
          try: R`حط الملف في [[.vscode/launch.json]]، واختار الـ interpreter بتاع الـ venv (Ctrl+Shift+P ثم Python: Select Interpreter). حط breakpoint في [[create_item]] وشغّل «FastAPI» بـ F5، وابعت POST من [[/docs]]. الـ request هيفضل مستني: بص على [[item]] في Variables واضغط F10 كذا مرة. وبعدين شغّل «pytest: this file» وانت فاتح ملف اختبار فيه breakpoint.`,
          flag: "script",
          deep: {
            why: "pdb في الترمنال كويس، بس لما تبقى الدوال كتير والـ objects كبيرة، إنك تشوف كل المتغيرات مفتوحة قدامك وتدوس على أي frame في الـ stack أسرع بكتير. والأهم: التطبيق جوه Docker مفيهوش ترمنال تكتب فيه لـ pdb، و debugpy بيخليك تتصل بيه من VS Code.",
            how: R`[[type: "debugpy"]] هو النوع الحالي (الإعدادات القديمة كانت [["python"]] وبقى deprecated). [[request: "launch"]] يعني VS Code هو اللي يشغّل البرنامج، و [[module]] زي [[python -m uvicorn]]. و [[args]] بيتبعتوا بعده. وبيستخدم الـ interpreter اللي اخترته، فلازم يبقى بتاع الـ venv.

[[--reload]] بيشغّل السيرفر في subprocess، و debugpy بيتصل بالـ subprocesses لوحده، فالـ breakpoints شغالة حتى بعد reload. الإعداد اسمه [[subProcess]]، وافتراضيه في كود debugpy نفسه true (صفحة VS Code مكتوب فيها false، بس الكود هو اللي بيتنفّذ). لو حصل ومبقتش بتقف بعد reload، حط [["subProcess": true]] صريحة.

[[justMyCode: true]] (الافتراضي) بيخلي F11 مبيدخلش جوه كود FastAPI و Starlette، وبيوقف بس على breakpoints في كودك. خليه false لو عايز تفهم المكتبة من جوه.

[[$__{file}]] الملف المفتوح دلوقتي، و [[$__{workspaceFolder}]] فولدر المشروع. وتقدر تضيف [["env": {"APP_DEBUG": "1"}]] أو [["envFile": "$__{workspaceFolder}/.env"]]. (وتبويب Testing في VS Code فيه زرار Debug Test جنب كل اختبار من غير launch.json أصلًا.)

Docker: التطبيق جوه container بيشتغل بـ [[python -m debugpy --listen 0.0.0.0:5678 -m uvicorn app.main:app --host 0.0.0.0 --port 8080]]، والبورت [[127.0.0.1:5678:5678]] في compose. [[--wait-for-client]] يخليه ميبدأش لحد ما تتصل (لو محتاج توقف على كود الـ startup). و [[request: "attach"]] بيتصل بيه. [[pathMappings]] بيقول إن [[/app]] جوه الـ container هو فولدر المشروع عندك، وإلا الـ breakpoints مش هتقف لأن المسارات مختلفة.`,
            when: "bug في FastAPI بيعدّي على كذا dependency ودالة. وأي تطبيق جوه Docker أو على سيرفر تاني (عن طريق SSH tunnel). وأول مرة تقرا كود مشروع وعايز تمشي ورا request من أوله لآخره.",
            mistakes: R`[[--listen 0.0.0.0:5678]] والبورت منشور على [[0.0.0.0]] في compose أو على سيرفر: أي حد يوصل للبورت ده يقدر ينفّذ كود على التطبيق. خليه [[127.0.0.1:5678:5678]] وللسيرفر استخدم SSH tunnel، ومتسيبوش في إعدادات الإنتاج أبدًا. و pathMappings غلط أو ناقص: VS Code يقول متصل والـ breakpoints رمادي ومبتقفش. والـ interpreter مش بتاع الـ venv فيطلع [[No module named uvicorn]].`
          },
          lines: [
            "بداية الملف.",
            "نسخة صيغة الملف.",
            "لستة طرق التشغيل (بتظهر في Run and Debug).",
            "الأولى:",
            "اسمها في القايمة.",
            "debugger بتاع Python.",
            "VS Code يشغّل البرنامج بنفسه.",
            "زي python -m uvicorn.",
            "مسار التطبيق وإعادة التشغيل مع الحفظ.",
            "وقّف في كودك بس، مش في المكتبات.",
            "نهايتها.",
            "التانية:",
            "الاسم.",
            "نفس الـ debugger.",
            "تشغيل.",
            "زي python -m pytest.",
            "على الملف المفتوح، ووقف عند أول فشل.",
            "نهايتها.",
            "التالتة:",
            "الاسم.",
            "نفس الـ debugger.",
            "اتصل ببرنامج شغال بالفعل بدل ما تشغّله.",
            "debugpy سامع على البورت ده (منشور من الـ container).",
            "فولدر المشروع عندك = /app جوه الـ container.",
            "نهايتها.",
            "نهاية اللستة.",
            "نهاية الملف."
          ],
          sol: R`الجزء بتاع VS Code (الشاشات والـ F5 و F10) من توثيق VS Code، ماجربتهوش هنا. اللي جربته: [[python -m debugpy --listen 0.0.0.0:5678 -m uvicorn app.main:app --host 0.0.0.0 --port 8080]] شغّل التطبيق عادي ورد على [[/health]]، وطبع تحذير [[Debugger warning: It seems that frozen modules are being used]].

المتوقع: لما تبعت POST من [[/docs]]، VS Code بيقف على السطر وبيعلّمه أصفر، وصفحة الـ docs تفضل «Loading» لحد ما تكمّل (F5). في Variables هتلاقي [[item]] من نوع [[Item]] بالقيم اللي بعتها، و [[store]]. و F10 بيمشي سطر سطر، و Call Stack بيوريك كود Starlette و FastAPI اللي نادى الدالة (باهت لأن justMyCode).

مع «pytest: this file» الـ breakpoint جوه الاختبار أو جوه الكود اللي الاختبار بيناديه بيقف بنفس الشكل.

لو الـ breakpoint رمادي ومبيقفش: الـ interpreter مش بتاع الـ venv، أو الملف اللي حاطط فيه النقطة مش هو اللي بيتنفذ. ولـ Docker الغلطة المعتادة pathMappings. وتحذير [[frozen modules]] اللي ممكن يطلع في الترمنال مش مشكلة في الغالب.

الحل تحت: الـ compose اللي بيشغّل التطبيق بـ debugpy للتطوير بس، ويتصل بيه «Attach to Docker».`,
          solCode: R`# compose.debug.yaml (للتطوير بس)
# docker compose -f compose.yaml -f compose.debug.yaml up
services:
  app:
# debugpy لازم يبقى متسطّب في الصورة (requirements-dev.txt مثلًا)
    command: ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678",
              "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
    ports:
      - "127.0.0.1:5678:5678"
    volumes:
      - ./:/app`
        }
      ]
    }
]);
