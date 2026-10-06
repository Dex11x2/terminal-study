// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
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
          teach: R`## الفكرة: الاختبار يطلب اللي محتاجه بالاسم، و pytest يجهّزه وينضّفه

المثال ملفين: [[tests/conftest.py]] فيه ٢ fixtures (دالة بتجهّز حاجة)، و [[tests/test_users.py]] فيه اختبارين بيستخدموهم. جربناهم على ويندوز (Python 3.14، pytest 9.1.1) وعلى لينكس ([[python:3.13-slim]] في Docker) وطلعوا نفس النتيجة.

---

## ١. [[tests/conftest.py]]

اسم الملف ده محجوز: pytest بيقراه لوحده قبل الاختبارات، وأي fixture فيه بيبقى متاح لكل ملفات الاختبار في نفس الفولدر واللي تحته، **من غير import**.

### [[import sqlite3]] و [[import pytest]]

[[sqlite3]] قاعدة بيانات في ملف واحد، جاية مع Python، فمش محتاج سيرفر عشان المثال. و [[pytest]] عشان الـ decorator.

### [[@pytest.fixture(scope="session")]]

[[@]] قبل اسم فوق دالة اسمه **decorator**: بيلف الدالة ويغيّر تعاملها. هنا بيقول لـ pytest «الدالة دي fixture». و [[scope="session"]] يعني اعملها **مرة واحدة** للتشغيل كله، وكل الاختبارات تاخد نفس القيمة.

### [[def db_url(tmp_path_factory):]]

اسم الدالة ([[db_url]]) هو اسم الـ fixture. وهي نفسها طالبة fixture تاني بالاسم: [[tmp_path_factory]]، ده جاهز في pytest وبيعمل فولدرات مؤقتة، وscope بتاعه session برضه.

### [[return str(tmp_path_factory.mktemp("data") / "test.db")]]

من جوه لبرة:

1. [[tmp_path_factory.mktemp("data")]]: اعمل فولدر مؤقت جديد اسمه يبدأ بـ data. بيرجّع [[Path]].
2. [[/ "test.db"]]: مع [[Path]] علامة [[/]] بتركّب مسار، يعني «ملف test.db جوه الفولدر ده».
3. [[str(...)]]: حوّله نص.

### [[@pytest.fixture]] و [[def db(db_url):]]

fixture تاني من غير scope، يعني الافتراضي [[function]]: نسخة جديدة لكل اختبار. وطالب [[db_url]]، فـ pytest بيجهّز [[db_url]] الأول.

### [[conn = sqlite3.connect(db_url)]]

افتح اتصال بالقاعدة (وبيعمل الملف لو مش موجود).

### [[conn.execute("CREATE TABLE IF NOT EXISTS users (name TEXT)")]]

اعمل جدول [[users]] فيه عمود [[name]] نصي. [[IF NOT EXISTS]] عشان الاختبار التاني ميقعش لأن الجدول موجود من الأول (الملف واحد للـ session كلها).

### [[yield conn]]

هنا قلب الفكرة. [[yield]] بيقسم الدالة نصين:

| الجزء | امتى بيشتغل |
|---|---|
| قبل [[yield]] | قبل الاختبار (setup) |
| القيمة بعد [[yield]] | دي اللي بتوصل للاختبار في الباراميتر [[db]] |
| بعد [[yield]] | بعد ما الاختبار يخلص، حتى لو وقع (teardown) |

### التنضيف: [[DELETE]] و [[commit]] و [[close]]

[[conn.execute("DELETE FROM users")]] امسح كل الصفوف، و [[conn.commit()]] احفظ المسح فعلًا في الملف (sqlite3 مش بيحفظ التعديلات غير بعد commit)، و [[conn.close()]] اقفل الاتصال.

---

## ٢. [[tests/test_users.py]]

### [[def test_add_user(db):]]

الاختبار بيطلب [[db]] بإنه يكتبه اسم باراميتر. مفيش [[import]] ولا نداء: pytest بيشوف الاسم، يلاقي fixture بنفس الاسم في conftest، يشغّله لحد الـ [[yield]]، ويدّي الاختبار الـ [[conn]].

### [[db.execute("INSERT INTO users VALUES ('sara')")]]

ضيف صف فيه [[sara]].

### [[assert db.execute("SELECT count(*) FROM users").fetchone()[0] == 1]]

من جوه لبرة: [[SELECT count(*)]] عد الصفوف، و [[.fetchone()]] هات أول صف من النتيجة كـ tuple زي [[(1,)]]، و [[[0] ]] أول خانة فيه، يعني الرقم.

### [[def test_starts_empty(db):]]

اختبار تاني بيتأكد إن الجدول فاضي. ده بيعدّي بس لأن التنضيف بتاع الاختبار الأول اشتغل.

---

## ٣. التشغيل بـ [[--setup-show]]

~~~bash
pytest tests/test_users.py --setup-show
~~~

~~~text الناتج (لينكس)
SETUP    S tmp_path_factory
SETUP    S db_url (fixtures used: tmp_path_factory)
        SETUP    F db (fixtures used: db_url)
        tests/test_users.py::test_add_user (fixtures used: db, db_url, request, tmp_path_factory) .
        TEARDOWN F db
        SETUP    F db (fixtures used: db_url)
        tests/test_users.py::test_starts_empty (fixtures used: db, db_url, request, tmp_path_factory) .
        TEARDOWN F db
TEARDOWN S db_url
TEARDOWN S tmp_path_factory

============================== 2 passed in 0.06s ===============================
~~~

- [[S]] يعني session و [[F]] يعني function. والإزاحة بتوريك مين جوه مين.
- [[db_url]] اتعمل **مرة** واتقفل في الآخر. [[db]] اتعمل واتقفل **مرتين**، مرة حوالين كل اختبار.
- [[request]] fixture داخلي في pytest بيوصف الاختبار الحالي، بيظهر لوحده.

وعلى ويندوز نفس الناتج، بس لو [[pytest-asyncio]] متسطّب هتلاقي سطر زيادة [[SETUP S event_loop_policy]] جاي منه. عادي.

---

## ٤. ليه [[scope="module"]] بيوقّع اختبار

غيّرنا [[db]] لـ [[@pytest.fixture(scope="module")]]:

~~~text الناتج (ويندوز، مختصر)
    def test_starts_empty(db):
>       assert db.execute("SELECT count(*) FROM users").fetchone()[0] == 0
E       assert 1 == 0
FAILED tests/test_users.py::test_starts_empty - assert 1 == 0
1 failed, 1 passed in 0.11s
~~~

module يعني مرة للملف كله، فالتنضيف (اللي بعد [[yield]]) مبقاش يشتغل بين الاختبارين، والتاني لاقى [[sara]] اللي الأول ضافها. والحل في الـ solCode: الغالي (الاتصال) session، والتنضيف في fixture تاني function. جربناه وعدّى ([[2 passed]])، و [[--setup-show]] بقى يوري [[SETUP S conn]] مرة و [[SETUP F db]] مرتين.

---

## ٥. غلطتين pytest بيمسكهم

جربناهم على لينكس:

~~~text fixture بـ session بيطلب fixture بـ function
ScopeMismatch: You tried to access the function scoped fixture small with a session scoped request object.
~~~

القاعدة: الـ fixture يطلب fixture في نفس الـ scope أو أوسع. اللي بيعيش طول التشغيل ميقدرش يعتمد على حاجة بتتمسح بعد كل اختبار.

~~~text نداء الـ fixture كدالة: d()
Fixture "d" called directly. Fixtures are not meant to be called directly,
but are created automatically when test functions request them as parameters.
~~~

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[@pytest.fixture]] | الدالة دي بتجهّز حاجة للاختبارات |
| اسم الباراميتر | الاختبار بيطلب الـ fixture بالاسم |
| [[yield]] | قبله تجهيز، بعده تنضيف بيشتغل حتى لو الاختبار وقع |
| [[scope]] | [[function]] (افتراضي) أو [[module]] أو [[session]] |
| [[conftest.py]] | مكان الـ fixtures المشتركة، من غير import |
| [[--setup-show]] | يوريك امتى كل fixture اتعمل واتقفل |

- اللي بيتغير (بيانات) scope بتاعه function. الغالي اللي مبيتغيرش (اتصال، مسار) session.
- متناديش fixture بإيدك، اطلبه كباراميتر.`,
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
          teach: R`## الفكرة: اختبار واحد، وجدول حالات، و pytest يلف عليه

بدل ٤ دوال اختبار شبه بعض، بتكتب دالة واحدة بباراميترات، وفوقها جدول قيم. pytest بيشغّل الدالة مرة لكل صف في الجدول، وكل مرة بتطلع اختبار لوحده باسم لوحده. والجزء التاني من المثال بيختبر إن الكود **بيرفض** قيمة غلط.

جربنا المثال على ويندوز (pytest 9.1.1) وعلى لينكس ([[python:3.13-slim]] في Docker) مع [[app/pricing.py]] بالمقارنة الحرفية [[coupon == "SAVE10"]] زي ما «جرّب» بيقول.

---

## ١. الـ imports

[[import pytest]] عشان [[pytest.mark]] و [[pytest.param]] و [[pytest.raises]]. و [[from app.pricing import final_price]] الدالة اللي بنختبرها: بتاخد سعر وكوبون وترجّع السعر النهائي.

---

## ٢. [[@pytest.mark.parametrize(...)]]

decorator (الـ [[@]] فوق الدالة) بياخد حاجتين:

### الأول: [[("price", "coupon", "expected")]]

أسماء الباراميترات، بنفس أسماء باراميترات دالة الاختبار تحت. tuple فيه ٣ نصوص. (ينفع تكتبها نص واحد [["price,coupon,expected"]]، زي الجدول التاني تحت.)

### التاني: اللستة

كل عنصر tuple فيه ٣ قيم **بنفس الترتيب**:

| الصف | price | coupon | expected | بيختبر إيه |
|---|---|---|---|---|
| [[(200, None, 200)]] | 200 | [[None]] (مفيش كوبون) | 200 | من غير خصم |
| [[(200, "SAVE10", 180)]] | 200 | SAVE10 | 180 | خصم ١٠٪ |
| [[(0, "SAVE10", 0)]] | 0 | SAVE10 | 0 | حالة طرفية: صفر |
| [[pytest.param(...)]] | 200 | save10 | 180 | كوبون بحروف صغيرة |

### [[pytest.param(200, "save10", 180, id="lowercase-coupon")]]

نفس الصف بس ملفوف في [[pytest.param]] عشان تدّيه [[id]]: اسم مقروء بيظهر في الناتج بدل القيم.

---

## ٣. [[def test_final_price(price, coupon, expected):]]

دالة الاختبار باراميتراتها نفس الأسماء اللي في الجدول. pytest بيناديها ٤ مرات، كل مرة بقيم صف. وجواها سطر واحد: [[assert final_price(price, coupon) == expected]].

---

## ٤. الجدول التاني و [[pytest.raises]]

### [[@pytest.mark.parametrize("price", [-1, -100])]]

باراميتر واحد، فالأسماء نص واحد والقيم لستة أرقام عادية (مش tuples).

### [[with pytest.raises(ValueError, match="negative"):]]

[[with]] بيفتح بلوك. [[pytest.raises]] بيقول: «الكود اللي جوه البلوك ده **لازم** يرمي [[ValueError]]». لو رماه، الاختبار يعدّي. و [[match]] regex (نمط بحث) لازم يتلاقي في رسالة الـ exception.

### [[final_price(price, None)]]

النداء اللي المفروض يقع. الدالة فيها [[raise ValueError("price can't be negative")]]، والرسالة فيها negative.

---

## ٥. الناتج

~~~bash
pytest -v
~~~

~~~text الناتج (ويندوز، مختصر)
tests/test_pricing.py::test_final_price[200-None-200] PASSED             [ 16%]
tests/test_pricing.py::test_final_price[200-SAVE10-180] PASSED           [ 33%]
tests/test_pricing.py::test_final_price[0-SAVE10-0] PASSED               [ 50%]
tests/test_pricing.py::test_final_price[lowercase-coupon] FAILED         [ 66%]
tests/test_pricing.py::test_negative_price_rejected[-1] PASSED           [ 83%]
tests/test_pricing.py::test_negative_price_rejected[-100] PASSED         [100%]

price = 200, coupon = 'save10', expected = 180
>       assert final_price(price, coupon) == expected
E       AssertionError: assert 200 == 180
E        +  where 200 = final_price(200, 'save10')
========================= 1 failed, 5 passed in 0.10s =========================
~~~

اقراه كده:

- ٦ اختبارات من دالتين: ٤ صفوف + ٢ أرقام.
- الاسم بين [[[ ] ]] هو الـ id. التلقائي بيتعمل من القيم مفصولة بـ [[-]] ([[200-None-200]])، والصف اللي ادّيناه id ظهر باسمه.
- [[price = 200, coupon = 'save10', expected = 180]]: pytest كاتبلك قيم الصف اللي وقع.
- [[where 200 = final_price(200, 'save10')]]: الدالة رجّعت 200 يعني الخصم ماتعملش. فهمنا السبب من غير ما نفتح الكود: الحروف الصغيرة.

---

## ٦. بعد التصليح

صلّحنا الشرط لـ [[if coupon and coupon.upper() == "SAVE10":]] ([[coupon and]] الأول عشان [[None.upper()]] كان هيقع)، وضفنا [[(99, "SAVE10", 89)]]:

~~~text الناتج (لينكس)
tests/test_pricing.py::test_final_price[99-SAVE10-89] PASSED             [ 57%]
tests/test_pricing.py::test_final_price[lowercase-coupon] PASSED         [ 71%]
============================== 7 passed in 0.01s ===============================
~~~

ليه 89؟ [[99 * 0.9]] في Python بيطلع [[89.10000000000001]] (الكسور العشرية في الكمبيوتر مش دقيقة ١٠٠٪)، و [[round]] بيقرّبه [[89]].

و [[pytest -q -k lowercase]] شغّل الصف ده لوحده: [[1 passed, 6 deselected]]، لأن الـ id جزء من اسم الاختبار.

---

## ٧. إمتى [[pytest.raises]] بيوقع

جربنا حالتين على لينكس:

~~~text الكود مارماش خالص
E       Failed: DID NOT RAISE ValueError
~~~

(غيّرنا الشرط مؤقتًا لـ [[price < -50]]، فـ [[-1]] عدّى من غير exception.)

~~~text رمى ValueError بس الرسالة مش مطابقة لـ match
E       AssertionError: Regex pattern did not match.
E         Expected regex: 'positive'
E         Actual message: "price can't be negative"
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[@pytest.mark.parametrize(names, rows)]] | شغّل الاختبار مرة لكل صف |
| [[pytest.param(..., id="...")]] | صف باسم مقروء |
| [[test_x[id] ]] | كل صف اختبار لوحده في الناتج، وتختاره بـ [[-k]] |
| [[pytest.raises(Error, match=...)]] | الكود لازم يرمي الـ exception ده والرسالة فيها النمط |

- اكتب الـ expected رقم بإيدك، متحسبهوش بنفس معادلة الكود.
- أي bug تصلّحه: ضيفه صف في الجدول.`,
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
          teach: R`## الفكرة: كل اختبار ياخد فولدر فاضي بتاعه لوحده

[[tmp_path]] fixture جاهز في pytest، مش محتاج تكتبه ولا تعمله import. أي اختبار يكتب [[tmp_path]] في باراميتراته ياخد فولدر جديد فاضي، يكتب فيه ويقرا منه، ومحدش تاني بيلمسه.

المثال بيختبر دالة [[load_config]] مش مكتوبة في الدرس. جربناه بالنسخة البسيطة دي:

~~~python app/config.py
import json
from pathlib import Path

DEFAULTS = {"port": 8000, "debug": False}

def load_config(path: Path) -> dict:
    if not path.exists():
        return dict(DEFAULTS)
    return {**DEFAULTS, **json.loads(path.read_text(encoding="utf-8"))}
~~~

يعني: لو الملف مش موجود رجّع الافتراضي، ولو موجود اقراه JSON وخلّي قيمه تغطي الافتراضي. ([[{**a, **b}]] بيدمج dict-ين، واللي في [[b]] بيكسب.) جربنا على ويندوز (Python 3.14) ولينكس ([[python:3.13-slim]]).

---

## ١. الـ imports

[[import json]] عشان نكتب ملف JSON في الاختبار، و [[from app.config import load_config]] الدالة اللي بنختبرها.

---

## ٢. [[def test_reads_config(tmp_path):]]

الاختبار بيطلب [[tmp_path]] بالاسم (زي أي fixture). pytest بيعمل فولدر ويدّيه قيمته كـ [[pathlib.Path]]، مش نص.

### [[cfg = tmp_path / "config.json"]]

[[/]] مع [[Path]] بتركّب مسار (على ويندوز ولينكس بنفس الكتابة). [[cfg]] دلوقتي مسار ملف جوه الفولدر المؤقت، والملف **لسه مش موجود**.

### [[cfg.write_text(json.dumps({"port": 9000}), encoding="utf-8")]]

من جوه لبرة:

1. [[json.dumps({"port": 9000})]]: حوّل الـ dict لنص JSON: [[{"port": 9000}]]. (الـ s في آخر [[dumps]] يعني string، و [[dump]] من غيرها بتكتب في ملف.)
2. [[cfg.write_text(..., encoding="utf-8")]]: اعمل الملف واكتب فيه النص ده. و [[encoding]] صريح عشان ويندوز ميستخدمش ترميز تاني.

### [[assert load_config(cfg) == {"port": 9000, "debug": False}]]

الملف فيه [[port]] بس، فـ [[port]] جه من الملف و [[debug]] جه من الافتراضي.

---

## ٣. [[def test_missing_file_uses_defaults(tmp_path):]]

اختبار تاني بياخد فولدر **تاني** فاضي. [[tmp_path / "nope.json"]] مسار ملف مش موجود، فالدالة لازم ترجّع الافتراضي من غير ما تقع.

---

## ٤. الفولدر ده فين؟

[[-s]] بيخلي pytest يسيب الـ print يظهر (من غيره بيمسكه). وده ناتج اختبار الـ solCode اللي بيعمل [[print(tmp_path)]]:

~~~text الناتج (لينكس)
tests/test_config.py::test_reads_config PASSED
tests/test_config.py::test_missing_file_uses_defaults PASSED
tests/test_report_csv.py::test_save_report /tmp/pytest-of-root/pytest-0/test_save_report0
PASSED
============================== 3 passed in 0.02s ===============================
~~~

~~~text نفس السطر على ويندوز
C:\Users\ali\AppData\Local\Temp\pytest-of-ali\pytest-4\test_save_report0
~~~

المسار ٣ حتت:

| الحتة | معناها |
|---|---|
| [[/tmp]] أو [[...\AppData\Local\Temp]] | فولدر الملفات المؤقتة في النظام |
| [[pytest-of-root]] | فولدر لكل يوزر (في Docker اليوزر root) |
| [[pytest-0]] | رقم التشغيل، بيزيد كل مرة |
| [[test_save_report0]] | فولدر للاختبار ده، باسمه |

شغّلنا ٤ مرات تانيين على لينكس وبصينا:

~~~text ls /tmp/pytest-of-root/
pytest-2
pytest-3
pytest-4
pytest-current
~~~

pytest بيسيب آخر ٣ تشغيلات بس ويمسح الأقدم ([[pytest-0]] و [[pytest-1]] راحوا). و [[pytest-current]] اختصار بيشاور على آخر واحد. وجوه آخر تشغيل لسه [[report.csv]] موجود، فلو اختبار وقع تقدر تفتح الملف وتشوف كان كاتب إيه. (ولاحظ إن pytest بيقص الأسامي الطويلة: الفولدر طلع [[test_missing_file_uses_default0]] من غير الـ s.)

---

## ٥. الـ solCode: [[save_report]]

- [[out = out_dir / "report.csv"]]: الدالة **بتاخد الفولدر كباراميتر**. ده اللي بيخليها قابلة للاختبار: الاختبار يدّيها [[tmp_path]]، والكود الحقيقي يدّيها فولدر المشروع.
- [[out.open("w", newline="", encoding="utf-8")]]: [[newline=""]] لازم مع [[csv]]. جربنا من غيرها على ويندوز وقرينا الملف bytes: [[b'a,b\r\r\n1,2\r\r\n']]. مكتبة [[csv]] بتكتب [[\r\n]] لوحدها، وويندوز بيحوّل [[\n]] لـ [[\r\n]] تاني، فيطلع سطر فاضي بين الصفوف في Excel.
- [[csv.DictWriter(f, fieldnames=[...])]] بيكتب dict-ات، و [[writeheader()]] سطر العناوين، و [[writerows(rows)]] صف لكل dict.
- [[return out]]: يرجّع المسار عشان الاختبار يتأكد منه.

وفي الاختبار: [[read_text(...).splitlines()]] بيقسم الملف سطور، و [[csv.DictReader]] بيرجّع كل القيم نصوص، عشان كده [["12"]] مش [[12]]. الـ ٣ اختبارات عدّوا على الاتنين.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[tmp_path]] | فولدر فاضي جديد لكل اختبار، نوعه [[Path]] |
| [[tmp_path / "x"]] | مسار جواه |
| [[write_text]] و [[read_text]] | اكتب واقرا ملف نصي في سطر |
| [[tmp_path_factory]] | نفس الفكرة لـ fixture بـ session scope |
| [[pytest -s]] | اعرض الـ print، ومنه مسار الفولدر |

- خلّي الدالة تاخد المسار كباراميتر، متكتبش مسار ثابت جواها.
- pytest بيسيب آخر ٣ تشغيلات عشان تفتح الملفات لو حاجة وقعت.
- [[encoding="utf-8"]] دايمًا، و [[newline=""]] مع [[csv]].`,
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
          teach: R`## الفكرة: غيّر حاجة للاختبار ده بس، و pytest يرجّعها لوحده

[[monkeypatch]] fixture جاهز (زي [[tmp_path]]). أي تغيير بتعمله بيه (متغير بيئة، دالة، قيمة) بيتسجّل، وبعد الاختبار pytest بيرجّع كل حاجة زي ما كانت، حتى لو الاختبار وقع.

المثال ملفين: [[conftest.py]] فيه fixture بيمنع الشبكة في كل الاختبارات، و [[test_env_time.py]] فيه ٣ اختبارات. الموديولات اللي بيختبرها مش في الدرس، فجربنا بالنسخ البسيطة دي:

~~~python app/settings.py
import os

def is_debug() -> bool:
    return os.environ.get("APP_DEBUG") == "1"
~~~

~~~python app/clock.py
from datetime import datetime

def current_hour() -> int:
    return datetime.now().hour

def greeting() -> str:
    return "صباح الخير" if current_hour() < 12 else "مساء الخير"
~~~

[[os.environ.get("APP_DEBUG")]] بيرجّع قيمة المتغير أو [[None]] لو مش موجود. و [[datetime.now().hour]] الساعة دلوقتي من 0 لـ 23.

---

## ١. [[conftest.py]]: منع الشبكة

### [[@pytest.fixture(autouse=True)]]

[[autouse=True]] يعني الـ fixture ده يشتغل لكل اختبار لوحده، من غير ما حد يكتب اسمه في الباراميترات.

### [[def no_network(monkeypatch):]]

fixture بيطلب fixture تاني: [[monkeypatch]].

### [[def guard(*args, **kwargs):]] و [[raise RuntimeError(...)]]

دالة جوه دالة. [[*args]] يعني «اقبل أي عدد باراميترات بالترتيب»، و [[**kwargs]] «وأي عدد بالاسم». يعني [[guard]] تقبل أي نداء، وأول ما تتنادى ترمي [[RuntimeError]] برسالة واضحة.

### [[monkeypatch.setattr("socket.socket.connect", guard)]]

[[setattr]] بيبدّل اسم بقيمة تانية. والصيغة بنص: pytest بيعمل import لـ [[socket]]، ويروح لكلاس [[socket.socket]]، ويبدّل الدالة [[connect]] فيه بـ [[guard]]. و [[connect]] هي اللي أي مكتبة شبكة بتناديها في الآخر عشان تفتح اتصال.

جربنا اختبار بيحاول يتصل فعلًا:

~~~text الناتج (ويندوز، مختصر)
>       s.connect(("127.0.0.1", 9))
    def guard(*args, **kwargs):
>       raise RuntimeError("network call in a test!")
E       RuntimeError: network call in a test!
FAILED tests/test_net.py::test_tries_network - RuntimeError: network call in ...
~~~

---

## ٢. [[test_debug_from_env]]: [[setenv]]

[[from app import clock, settings]] بيجيب الموديولين.

[[monkeypatch.setenv("APP_DEBUG", "1")]] بيحط [[APP_DEBUG=1]] في [[os.environ]] للاختبار ده بس. والقيمة لازم نص: جربنا [[setenv("PORT", 8000)]] برقم، pytest حوّله [["8000"]] بس طلّع تحذير:

~~~text الناتج
PytestWarning: Value of environment variable PORT type should be str, but got 8000 (type: int); converted to str implicitly
~~~

بعدها [[assert settings.is_debug() is True]]. و [[is True]] أدق من [[== True]]: بيتأكد إنها [[True]] نفسها، مش أي قيمة «بتتحسب صح» زي [[1]].

---

## ٣. [[test_debug_off_by_default]]: [[delenv]]

[[monkeypatch.delenv("APP_DEBUG", raising=False)]] بيشيل المتغير. ليه؟ لو انت عامل [[APP_DEBUG=1]] في الترمنال بتاعك، الاختبار هيقع عندك ويعدّي عند غيرك. و [[raising=False]] يعني «لو مش موجود أصلًا متقعش».

وعشان نتأكد إن التغيير اترجع، ضفنا اختبار بعدهم فيه [[assert "APP_DEBUG" not in os.environ]]، وعدّى: الـ [[setenv]] اللي في الاختبار الأول اتشال لوحده.

---

## ٤. [[test_greeting_morning]]: تثبيت الساعة

### [[monkeypatch.setattr(clock, "current_hour", lambda: 9)]]

صيغة [[setattr]] التانية: object، واسم، وقيمة جديدة. «جوه الموديول [[clock]] خلّي [[current_hour]] تبقى الدالة دي».

[[lambda: 9]] دالة من غير اسم، من غير باراميترات، بترجّع 9 دايمًا. يعني كأن الساعة ٩ الصبح.

### ليه بيشتغل؟

[[greeting()]] بتنادي [[current_hour()]] كل مرة، و Python بيدوّر على الاسم [[current_hour]] جوه موديول [[clock]] **وقت النداء**. فبيلاقي الـ lambda. وقت ما شغّلنا كانت الساعة ٨ بالليل، ومن غير الـ patch كان [[greeting()]] هيرجّع [[مساء الخير]] والاختبار يقع.

~~~text الناتج (ويندوز)
tests/test_env_time.py::test_debug_from_env PASSED                       [ 20%]
tests/test_env_time.py::test_debug_off_by_default PASSED                 [ 40%]
tests/test_env_time.py::test_greeting_morning PASSED                     [ 60%]
~~~

---

## ٥. «جرّب»: لما القيمة بتتقري وقت الـ import

غيّرنا [[settings.py]] لـ [[DEBUG = os.environ.get("APP_DEBUG") == "1"]] في أول الملف، و [[is_debug]] بترجّع [[DEBUG]]. على لينكس:

~~~text الناتج
E       assert False is True
E        +  where False = <function is_debug at 0x7eee7a0f3920>()
1 failed, 2 passed in 0.02s
~~~

السطر اللي في أول الملف بيتنفّذ **مرة واحدة** لما pytest يعمل import لـ [[settings]]، قبل أي اختبار. ساعتها المتغير مكانش موجود، فـ [[DEBUG]] بقى [[False]] واتثبّت. [[setenv]] بعدها غيّر [[os.environ]] بس، محدش رجع يقراه. والحل في الـ solCode إنك تبدّل الثابت نفسه: [[monkeypatch.setattr(settings, "DEBUG", True)]]، وعدّى ([[1 passed]]).

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[setenv(name, "value")]] | متغير بيئة للاختبار ده (نص) |
| [[delenv(name, raising=False)]] | شيل متغير، ومتقعش لو مش موجود |
| [[setattr(obj, "name", value)]] | بدّل اسم جوه موديول أو object |
| [[setattr("pkg.mod.name", value)]] | نفس الكلام بمسار نصي |
| [[autouse=True]] | الـ fixture لكل الاختبارات من غير ما حد يطلبه |

- كل تغيير بيترجع بعد الاختبار لوحده.
- [[setattr]] بيأثر على الاسم وقت النداء. اللي اتحسب وقت الـ import لازم تبدّله هو نفسه.
- خلّي الوقت ييجي من دالة صغيرة بتاعتك، عشان تثبّتها بسطر.`,
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
          teach: R`## الفكرة: بدّل الدالة اللي بتكلّم الإنترنت بـ «ممثل» بيرد اللي انت عايزه

[[Mock]] object بيقبل أي نداء، ويرجّع اللي تقوله، ويسجّل اتنادى بإيه. و [[patch]] بيحط Mock مكان اسم حقيقي جوه بلوك [[with]]، وبعد البلوك يرجّع الأصلي. كده تختبر الكود بتاعك من غير ما يكلّم API حقيقي.

المثال ٣ اختبارات لموديولين مش مكتوبين في الدرس. جربنا بالنسخ دي:

~~~python app/weather.py
import httpx

def fetch_temp(city: str) -> float:
    r = httpx.get(f"https://api.example.com/weather/{city}", timeout=5)
    return r.json()["temp"]
~~~

~~~python app/report.py
from app.weather import fetch_temp

def daily_report(city: str) -> str:
    t = fetch_temp(city)
    return f"{city}: {t}°C " + ("حر" if t > 35 else "معتدل")
~~~

[[weather]] بيكلّم API بـ [[httpx]] (مكتبة HTTP)، و [[report]] بيستخدم [[fetch_temp]] ويكتب جملة. الـ ٣ اختبارات عدّوا على ويندوز (Python 3.14) ولينكس ([[python:3.13-slim]]).

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[from unittest.mock import Mock, patch]] | جاية مع Python، مش محتاج تسطّب حاجة |
| [[import httpx]] | عشان [[httpx.Response]] و [[httpx.ReadTimeout]] |
| [[import pytest]] | عشان [[pytest.raises]] |
| [[from app.report import daily_report]] | الدالة اللي بتستخدم fetch_temp |
| [[from app.weather import fetch_temp]] | الدالة اللي بتكلّم الـ API |

---

## ٢. [[test_report_hot]]: [[patch]] و [[return_value]]

### [[with patch("app.report.fetch_temp", return_value=40) as fake:]]

- [[patch("app.report.fetch_temp", ...)]]: جوه موديول [[app.report]]، بدّل الاسم [[fetch_temp]] بـ Mock.
- [[return_value=40]]: أي نداء للـ Mock يرجّع 40.
- [[as fake]]: الـ Mock نفسه في متغير اسمه [[fake]] عشان نسأله بعدين.

### ليه [[app.report]] مش [[app.weather]]؟

دي أهم حتة في الدرس. السطر [[from app.weather import fetch_temp]] جوه [[report.py]] بيعمل **اسم جديد** [[fetch_temp]] جوه [[app.report]]، بيشاور على نفس الدالة. فيه دلوقتي اسمين:

| الاسم | مين بيستخدمه |
|---|---|
| [[app.weather.fetch_temp]] | محدش في المثال ده |
| [[app.report.fetch_temp]] | [[daily_report]] |

الـ patch بيغيّر **اسم واحد**. لازم تغيّر اللي [[daily_report]] بتقراه. جربنا نغيّره لـ [["app.weather.fetch_temp"]]: [[daily_report]] نادت الدالة الحقيقية، اللي حاولت توصل [[api.example.com]]:

~~~text الناتج
ويندوز:  E           httpx.ConnectError: [Errno 11001] getaddrinfo failed
لينكس:   E           httpx.ConnectError: [Errno -2] Name or service not known
~~~

الاتنين معناهم «الدومين ده ملوش عنوان» (getaddrinfo هي الدالة اللي بتحوّل اسم الدومين لـ IP).

### [[assert daily_report("Aswan") == "Aswan: 40°C حر"]]

40 أكبر من 35، فالجملة فيها «حر». ده بيختبر منطق [[report]] بس.

### [[fake.assert_called_once_with("Aswan")]]

بعد البلوك (الـ Mock لسه فاكر كل حاجة): اتأكد إنه اتنادى **مرة واحدة** بالباراميتر [["Aswan"]] بالظبط. لو اتنادى مرتين أو بمدينة تانية، بيرمي [[AssertionError]].

---

## ٣. [[test_fetch_temp_parses_json]]: نزيّف الـ response

هنا بنختبر [[fetch_temp]] نفسها، فالمزيّف هو [[httpx.get]].

### [[resp = Mock(spec=httpx.Response)]]

Mock شكله شكل [[httpx.Response]]. [[spec]] بيقول «اسمح بس بالأسماء اللي موجودة في Response». جربنا [[resp.jsn()]] بغلطة إملاء:

~~~text الناتج
AttributeError: Mock object has no attribute 'jsn'
~~~

من غير [[spec]] كان هيرجّع Mock تاني بهدوء.

### [[resp.json.return_value = {"temp": 22.5}]]

[[resp.json]] نفسه Mock، و [[return_value]] هو اللي يرجع لما تناديه. يعني [[resp.json()]] يرجّع الـ dict ده.

### [[with patch("app.weather.httpx.get", return_value=resp) as get:]]

[[weather.py]] كاتب [[import httpx]] وبينادي [[httpx.get]]، فالاسم اللي بيتقري: [[httpx]] جوه [[app.weather]]، وجواه [[get]]. أي نداء لـ [[httpx.get]] جوه البلوك يرجّع [[resp]].

### [[assert fetch_temp("Cairo") == 22.5]]

الدالة نادت [[httpx.get]] (المزيّف)، وخدت [[resp]]، ونادت [[.json()]] وطلّعت [["temp"]].

### [[get.assert_called_once_with("https://api.example.com/weather/Cairo", timeout=5)]]

اتأكد إن الطلب اتبعت على الـ URL الصح، و [[timeout=5]] موجود. لو حد شال الـ timeout من الكود، الاختبار ده يقع.

---

## ٤. [[test_timeout_bubbles_up]]: [[side_effect]]

### [[patch("app.report.fetch_temp", side_effect=httpx.ReadTimeout("slow"))]]

[[side_effect]] بدل [[return_value]]: لو exception، الـ Mock **يرميه** لما يتنادى. كأن الـ API اتأخر.

### [[with pytest.raises(httpx.ReadTimeout):]] و [[daily_report("Cairo")]]

[[daily_report]] لازم تسيب الخطأ يطلع لبره، متبلعهوش وترجّع جملة غلط.

ولو [[side_effect]] لستة، كل نداء ياخد العنصر اللي عليه الدور. جربنا [[Mock(side_effect=[TimeoutError("t"), 5])]]: أول نداء رمى [[TimeoutError('t')]]، والتاني رجّع [[5]]. ده بالظبط اللي تحتاجه عشان تختبر retry.

---

## ٥. الـ solCode: [[patch.object]] و [[autospec]]

[[patch.object(report, "fetch_temp", ...)]] بياخد الموديول نفسه بدل نص، فلو غلطت في الاسم يقع فورًا. و [[autospec=True]] بيخلي الـ Mock يرفض نداء بعدد باراميترات غلط. جربنا نناديه بـ [[fake("Aswan", "extra")]] على لينكس:

~~~text الناتج
E                   TypeError: too many positional arguments
~~~

والاختبار الأصلي بالـ solCode عدّى.

---

## ٦. فخ الـ assert اللي مش assert

~~~text الناتج (ويندوز، Python 3.14)
f.called_once_with('Aswan')   →  AttributeError: 'called_once_with' is not a valid assertion. ...
f.was_called_with('x')        →  <Mock name='mock.was_called_with()' id='...'>
~~~

أي اسم بتناديه على Mock بيرجّع Mock جديد ومبيقعش. Python الحديث بيمسك أسماء قريبة من [[assert_]] زي [[called_once_with]]، بس [[was_called_with]] عدّى بهدوء، والاختبار «نجح» من غير ما يختبر حاجة. اكتب دايمًا [[assert_called_...]] بالظبط.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[patch("mod.name", return_value=x)]] | بدّل الاسم بـ Mock بيرجّع x جوه with |
| [[side_effect=Exc(...)]] | الـ Mock يرمي الخطأ ده |
| [[side_effect=[a, b] ]] | كل نداء ياخد اللي عليه الدور |
| [[Mock(spec=Class)]] | بس الأسماء الموجودة في الكلاس |
| [[patch.object(mod, "name", autospec=True)]] | نفس patch، ويتأكد من الباراميترات |
| [[assert_called_once_with(...)]] | اتنادى مرة واحدة بالقيم دي |

- اعمل patch **في المكان اللي الاسم بيتقري منه**: [[from x import f]] جوه [[mod]] يبقى [[mod.f]].
- زيّف حدود النظام (HTTP، إيميل، دفع)، مش كودك كله.`,
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
          teach: R`## الفكرة: اختبر الـ API من غير ما تشغّل سيرفر، وكل اختبار ببيانات نضيفة

[[TestClient]] بيبعت requests للتطبيق مباشرة جوه نفس البروسيس، من غير uvicorn ولا بورت. و [[app.dependency_overrides]] بيخليك تبدّل dependency (هنا مكان التخزين) بحاجة تانية في الاختبار. والمثال بيجمع الاتنين في fixtures جوه [[conftest.py]]، زي ما شفنا في درس [[@pytest.fixture]].

التطبيق نفسه هو اللي في الـ solCode (تحت): [[_STORE]] dict عالمي، و [[get_store()]] بترجّعه، و [[POST /items]] و [[GET /items/{item_id}]] بياخدوه بـ [[Depends(get_store)]]، وضفنا عليه [[/health]] من درس uvicorn. جربنا على ويندوز (Python 3.14، FastAPI 0.142، pytest-asyncio 1.4) وعلى لينكس ([[python:3.13-slim]]).

---

## ١. [[tests/conftest.py]]

### الـ imports

[[from fastapi.testclient import TestClient]] الـ client. و [[from app.main import app, get_store]] التطبيق، والدالة اللي هنبدّلها (بنحتاج الدالة نفسها كمفتاح، مش اسمها).

### [[def store(): return {}]]

fixture بـ function scope (الافتراضي)، فكل اختبار ياخد dict **جديد فاضي**.

### [[def client(store):]]

بيطلب [[store]]، فـ pytest بيجهّزه الأول، والاختبار اللي يطلب الاتنين ياخد **نفس** الـ dict.

### [[app.dependency_overrides[get_store] = lambda: store]]

[[dependency_overrides]] dict جوه التطبيق: المفتاح الدالة الأصلية، والقيمة الدالة البديلة. FastAPI قبل ما ينادي أي dependency بيبص فيه. [[lambda: store]] دالة صغيرة من غير باراميترات بترجّع الـ dict بتاع الاختبار. فأي route فيه [[Depends(get_store)]] هياخد ده بدل [[_STORE]].

### [[with TestClient(app) as c:]] و [[yield c]]

[[with]] بيفتح الـ client ويشغّل الـ lifespan (كود الـ startup)، و [[yield c]] بيدّيه للاختبار والـ with لسه مفتوحة. لما الاختبار يخلص، الكود يكمّل: الـ with تقفل (shutdown).

### [[app.dependency_overrides.clear()]]

شيل التبديل. من غيره يفضل لباقي الاختبارات في نفس التشغيل.

---

## ٢. [[tests/test_items.py]]

### [[def test_create_then_get(client, store):]]

بيطلب الاتنين بالاسم.

### [[r = client.post("/items", json={"name": "pen", "price": 5})]]

[[client.post]] زي [[httpx.post]] بالظبط بس من غير شبكة. [[json=]] بيحوّل الـ dict لـ JSON ويحط الهيدر المناسب. وجربنا نشوف الرد نفسه:

~~~text الناتج
201 {'id': 1, 'name': 'pen', 'price': 5}
~~~

### الـ ٣ asserts

| السطر | بيتأكد من إيه |
|---|---|
| [[r.status_code == 201]] | اتعمل (201 Created، من [[status_code=201]] في الـ route) |
| [[store == {1: {"name": "pen", "price": 5}}]] | اتكتب في الـ store بالظبط كده |
| [[client.get("/items/1").json() == ...]] | ويتقري تاني صح |

التاني هو اللي الـ override بيخليه ممكن: الاختبار شايف جوه التخزين نفسه، مش الرد بس.

### [[@pytest.mark.asyncio]] و [[async def test_health_async():]]

اختبار async بيحتاج plugin يشغّله في event loop. الـ mark ده من [[pytest-asyncio]].

### [[transport = httpx.ASGITransport(app=app)]]

ASGI هو «البروتوكول» اللي بيه السيرفر (uvicorn) بيكلّم التطبيق. [[ASGITransport]] بيخلي [[httpx]] يكلّم التطبيق مباشرة بالبروتوكول ده بدل الشبكة.

### [[async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:]]

client async بيستخدم الـ transport ده. [[base_url]] لازم يتكتب بس قيمته مش مهمة، مفيش شبكة أصلًا. و [[async with]] زي [[with]] بس للحاجات async.

### [[r = await ac.get("/health")]]

[[await]] يعني «استنى النتيجة». وبعدها [[assert r.json() == {"ok": True}]].

---

## ٣. الناتج

~~~text الناتج (ويندوز)
tests/test_items.py::test_create_then_get PASSED                         [ 25%]
tests/test_items.py::test_health_async PASSED                            [ 50%]
tests/test_items_errors.py::test_invalid_price_422 PASSED                [ 75%]
tests/test_items_errors.py::test_missing_item_404 PASSED                 [100%]
============================== 4 passed in 0.08s ==============================
~~~

(التالت والرابع من الـ solCode.) ومن غير [[pytest-asyncio]] على لينكس:

~~~text الناتج (مختصر)
async def functions are not natively supported.
PytestUnknownMarkWarning: Unknown pytest.mark.asyncio - is this a typo?
1 failed, 3 passed, 2 warnings in 0.03s
~~~

وكمان على لينكس ظهر تحذير [[StarletteDeprecationWarning: Using $__bthttpx$__bt with $__btstarlette.testclient$__bt is deprecated; install $__bthttpx2$__bt instead.]] لأننا ماسطّبناش [[httpx2]]. الاختبارات شغالة عادي، وعلى ويندوز سطّبناه فاختفى.

---

## ٤. الـ solCode: [[422]] و [[404]]

### [[client.post("/items", json={"name": "pen", "price": "abc"})]]

[[price]] في الموديل [[int]]، و [["abc"]] مش رقم. FastAPI (عن طريق pydantic) بيرفض **قبل** ما ينادي الدالة:

~~~text الناتج
422 {'detail': [{'type': 'int_parsing', 'loc': ['body', 'price'], 'msg': 'Input should be a valid integer, unable to parse string as an integer', 'input': 'abc'}]}
~~~

[[loc]] (location) بيقول الغلط فين: في الـ [[body]]، الخانة [[price]]. عشان كده [[store == {}]]: الدالة ما اتنادتش أصلًا.

### [[client.get("/items/99")]]

مفيش عنصر 99، فالـ route بيرمي [[HTTPException(404, "item not found")]] والرد [[404 {'detail': 'item not found'}]].

---

## ٥. «جرّب»: من غير الـ override

شلنا سطر [[dependency_overrides]] وشغّلنا [[pytest -k create_then_get]] لوحده على لينكس:

~~~text الناتج
E       AssertionError: assert {} == {1: {'name': ..., 'price': 5}}
~~~

الـ route كتب في [[_STORE]] العالمي، والـ [[store]] اللي الاختبار بيبص فيه dict تاني فاضي.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[TestClient(app)]] | requests للتطبيق من غير سيرفر |
| [[with TestClient(app) as c: yield c]] | يفتح ويشغّل الـ lifespan، ويقفل بعد الاختبار |
| [[app.dependency_overrides[dep] = fn]] | بدّل dependency في الاختبارات |
| [[dependency_overrides.clear()]] | رجّع الأصلي في التنضيف |
| [[httpx.AsyncClient(transport=ASGITransport(app=app))]] | نفس الفكرة لاختبار async |
| [[@pytest.mark.asyncio]] | محتاج [[pytest-asyncio]] |

- fixture للـ store وfixture للـ client بيطلبه، والاختبار ياخد الاتنين ويبص جوه الـ store.
- اتأكد من البيانات اللي اتكتبت، مش من [[status_code]] بس.`,
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
          teach: R`## الفكرة: شغّل الاختبارات وعدّ السطور اللي اتنفذت

coverage (التغطية) بتجاوب سؤال واحد: وانت بتشغّل الاختبارات، أنهي سطور في الكود اتنفذت وأنهي لأ؟ [[pytest-cov]] plugin بيضيف فلاجات [[--cov]] لـ pytest، وتحته مكتبة اسمها [[coverage]] هي اللي بتعد.

جربنا الأوامر على مشروع الدروس اللي فاتت ([[app/main.py]] بتاع TestClient، و [[app/clock.py]] بتاع monkeypatch، و ٥ اختبارات) على ويندوز (Python 3.14، pytest-cov 7.1.0) وعلى لينكس ([[python:3.13-slim]]).

---

## ١. [[pip install pytest-cov]]

بيسطّب [[pytest-cov]] ومعاه [[coverage]]. ومحتاج [[pythonpath = .]] في [[pytest.ini]] (درس «pytest.ini») عشان [[pytest]] لوحده يلاقي [[app]].

---

## ٢. [[pytest --cov=app --cov-report=term-missing]]

- [[--cov=app]]: قيس الباكدج [[app]] بس. من غير اسم بيقيس كل حاجة اتنفذت، ومنها الاختبارات نفسها، والرقم يطلع مضلل.
- [[--cov-report=term-missing]]: اطبع الجدول في الترمنال ([[term]])، ومعاه أرقام السطور الناقصة ([[missing]]).

~~~text الناتج (ويندوز)
_______________ coverage: platform win32, python 3.14.3-final-0 _______________

Name              Stmts   Miss  Cover   Missing
-----------------------------------------------
app\__init__.py       0      0   100%
app\clock.py          5      1    80%   4
app\main.py          20      1    95%   8
-----------------------------------------------
TOTAL                25      2    92%
============================== 5 passed in 0.10s ==============================
~~~

### إزاي تقرا الجدول

| العمود | معناه |
|---|---|
| Stmts | statements: عدد السطور اللي بتتنفذ في الملف (من غير الفاضي والكومنتات) |
| Miss | منهم كام ما اتنفذش ولا مرة |
| Cover | النسبة: [[(Stmts - Miss) / Stmts]] |
| Missing | أرقام السطور اللي ما اتنفذتش |

- [[clock.py]] سطر 4 هو [[return datetime.now().hour]] جوه [[current_hour]]: كل الاختبارات مزيّفاها بـ monkeypatch، فالحقيقية عمرها ما اتنادت. 4 من 5 = 80٪.
- [[main.py]] سطر 8 هو [[return _STORE]] جوه [[get_store]]: الـ override بيبدّلها دايمًا.
- [[__init__.py]] فاضي، فـ 0 من 0 بيتحسب 100٪.

وعلى لينكس (Python 3.13) نفس السطور ناقصة، بس [[main.py]] طلع 22 statement بدل 20: كل نسخة Python بتعد السطور اللي «بتتنفذ» بشكل مختلف شوية، فمتقارنش أرقام من نسختين.

---

## ٣. [[pytest --cov=app --cov-branch --cov-fail-under=90]]

### [[--cov-branch]]

بيقيس الفروع كمان، مش السطور بس. فرع يعني: عند [[if]] الكود ممكن يروح طريقين. جربنا دالة صغيرة:

~~~python app/b.py
def bump(x):
    if x > 0:
        x += 1
    return x
~~~

واختبار واحد بـ [[bump(1)]]. كل السطور اتنفذت، بس:

~~~text الناتج
Name              Stmts   Miss Branch BrPart  Cover   Missing
-------------------------------------------------------------
app\b.py              4      0      2      1    83%   2->4
~~~

- Branch: [[if]] واحد = فرعين (الشرط صح، الشرط غلط).
- BrPart: partial، [[if]] واحد بس جرّب فرع منهم.
- [[2->4]]: النط من سطر 2 لسطر 4 مباشرة (يعني الشرط غلط) محصلش أبدًا. محدش جرّب [[bump]] برقم سالب أو صفر.
- 83٪ = (4 سطور + فرع واحد) من (4 سطور + فرعين) = 5 من 6.

### [[--cov-fail-under=90]]

لو المجموع أقل من 90٪، pytest يخرج بـ exit code 1 حتى لو كل الاختبارات عدّت. على المشروع طلع:

~~~text الناتج
Required test coverage of 90% reached. Total coverage: 92.59%
~~~

وبـ [[--cov-fail-under=99]] (بعد ما غيّرنا [[greeting]] لـ [[if]] و [[else]] على سطرين، ففرع بالليل بقى ناقص):

~~~text الناتج
FAIL Required test coverage of 99% not reached. Total coverage: 87.10%
5 passed in 0.10s
~~~

والـ exit code طلع 1: الاختبارات «نجحت» بس الـ CI هيبقى أحمر.

---

## ٤. [[pytest --cov=app --cov-report=html]]

~~~text الناتج
Coverage HTML written to dir htmlcov
~~~

فولدر [[htmlcov]] فيه [[index.html]] (جدول بكل الملفات) وصفحة لكل ملف بالكود ملوّن: أخضر اتنفذ، أحمر لأ، أصفر فرع ناقص. وجنبه ملف مخفي [[.coverage]] فيه البيانات الخام. الاتنين حطهم في [[.gitignore]].

---

## ٥. [[uv add --dev pytest pytest-cov]] و [[uv run pytest ...]]

نفس الكلام بـ uv. جربناه على ويندوز في نسخة من المشروع بعد [[uv init --bare]] (بيعمل [[pyproject.toml]] بس). [[uv add --dev]] بيضيفهم في مجموعة dev:

~~~text pyproject.toml بعدها
[dependency-groups]
dev = [
    "pytest>=9.1.1",
    "pytest-cov>=7.1.0",
]
~~~

يعني مكتبات للتطوير بس، مش للإنتاج. و [[uv run]] بيشغّل الأمر جوه الـ venv بتاع uv ([[.venv]]) من غير ما تفعّله. طلع نفس الجدول.

وحاجتين وقعنا فيهم:

- من غير [[pytest.ini]] فيه [[pythonpath = .]]: [[E   ModuleNotFoundError: No module named 'app']].
- FastAPI الجديدة من غير [[httpx2]]: [[RuntimeError: The starlette.testclient module requires the httpx2 package to be installed.]] الحل [[uv add --dev httpx2]].

---

## ٦. فتح التقرير

| النظام | الأمر |
|---|---|
| لينكس و WSL | [[xdg-open htmlcov/index.html]] |
| ماك | [[open htmlcov/index.html]] |
| ويندوز (PowerShell) | [[start htmlcov/index.html]] |

كلهم بيفتحوا الملف بالبرنامج الافتراضي (المتصفح). [[start]] في PowerShell اختصار لـ [[Start-Process]] (اتأكدنا بـ [[Get-Alias start]] في 7 و 5.1). و [[xdg-open]] مش موجود في صورة Docker الصغيرة (مفيش desktop)، بيبقى موجود على لينكس بواجهة. ماك من التوثيق.

---

## ٧. الـ solCode: لحد 100٪

٣ اختبارات: واحد بينادي [[current_hour]] الحقيقية ويقارنها بـ [[datetime.now().hour]]، وواحد بيثبّت الساعة 20 ويتأكد من [[مساء الخير]]، وواحد بينادي [[get_store()]] الحقيقية:

~~~text الناتج (ويندوز)
app\clock.py          5      0      0      0   100%
app\main.py          20      0      2      0   100%
TOTAL                25      0      2      0   100%
Required test coverage of 100% reached. Total coverage: 100.00%
8 passed in 0.11s
~~~

---

## الخلاصة

| الفلاج | بيعمل إيه |
|---|---|
| [[--cov=app]] | قيس الباكدج دي بس |
| [[--cov-report=term-missing]] | جدول وأرقام السطور الناقصة |
| [[--cov-branch]] | قيس الفروع كمان ([[2->4]] = نطة ما حصلتش) |
| [[--cov-fail-under=N]] | exit code 1 لو أقل من N٪ |
| [[--cov-report=html]] | تقرير ملوّن في [[htmlcov/]] |

- التغطية بتقولك السطر اتنفذ، مش إن نتيجته اتفحصت.
- عمود Missing هو المفيد: بيوريك بالظبط أنهي حالة محدش جربها.`,
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
    }
]);
