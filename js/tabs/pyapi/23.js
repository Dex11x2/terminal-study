// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Flask",
      l: 2,
      time: R`حوالي ٦ ساعات (ساعة لكل درس، والباقي للمشاريع)`,
      goal: [
        R`تبني تطبيق Flask بـ app factory و blueprints، والإعدادات من [[FLASK_*]]، وتشغّله بـ gunicorn في الإنتاج.`,
        R`تقرا الطلب وتفحصه بإيدك، وترد بالـ status والـ headers الصح، وأخطاءك كلها JSON.`,
        R`ترسم صفحات HTML بـ Jinja بـ inheritance و filters، من غير XSS ومن غير N+1.`,
        R`تستخدم Flask-SQLAlchemy و Flask-Migrate، وتكتب اختبارات pytest بـ fixtures بتعمل تطبيق وقاعدة جديدة لكل اختبار.`,
        R`تختار بين Flask و FastAPI و Django لمشروع حقيقي بأسباب مش بإحساس.`,
      ],
      use: {
        prog: R`Flask لسه في مشاريع كتير شغالة (لوحات داخلية، و services صغيرة، ومواقع بـ templates)، وأغلب الشغل عليها صيانة وإضافة. ونفس الأفكار (factory و blueprints و test client) موجودة في FastAPI و Django بأسامي تانية.`,
        work: R`أول يوم في مشروع Flask موجود: [[flask --app X routes]] عشان تشوف الـ URLs، و [[pytest]] عشان تعرف إيه اللي متغطي، و [[create_app(test_config)]] عشان تجرّب من غير ما تبوّظ القاعدة.`,
        cs: R`WSGI و request context (thread-local proxies)، والـ dependency injection اليدوي في الـ factory، و template inheritance، و autoescape كحماية من XSS، و test isolation.`,
      },
      lab: R`python -m venv .venv && source .venv/bin/activate   # ويندوز: .\.venv\Scripts\Activate.ps1
pip install flask flask-sqlalchemy flask-migrate pytest
flask --version`,
      projects: [
        { lvl: 'صغير', t: R`صفحة صحة وإعدادات`, what: R`[[create_app]] فيه [[/health]] و [[/version]] بيرجّع قيمة [[APP_VERSION]] من [[FLASK_APP_VERSION]]، و blueprint واحد. من درس «flask run و create_app».`, done: R`[[flask --app shop routes]] بيوري الـ ٣ routes، و [[FLASK_APP_VERSION=1.2 flask --app shop run]] بيخلّي [[/version]] يرجّع [[1.2]]، ومن غير المتغير بيرجّع [[dev]].` },
        { lvl: 'صغير', t: R`أخطاء JSON للتطبيق كله`, what: R`[[@app.errorhandler(HTTPException)]] واحد بيحوّل أي خطأ HTTP لـ JSON فيه [[error]] و [[detail]] و [[status]]. من درس «Flask request و response».`, done: R`[[/nope]] و [[DELETE]] على route GET و [[abort(400)]] كلهم بيرجّعوا JSON بالـ status الصح (404 و 405 و 400)، و [[Content-Type]] فيهم [[application/json]].` },
        { lvl: 'متوسط', t: R`كتالوج منتجات كامل`, what: R`blueprint منتجات فيه list بالبحث والصفحات (JSON و HTML)، و detail، و create بفحص، و delete، وصفحات Jinja بـ base و filter [[egp]]، و Flask-Migrate. من أول ٤ دروس.`, done: R`صفحة المنتجات بتعمل ٢ queries بس مهما كان عدد الأقسام (عدّيتهم بـ event listener)، و [[?q=<b>]] بيطلع escaped، و [[flask db upgrade]] على قاعدة فاضية بيعمل الجداول.` },
        { lvl: 'متوسط', t: R`اختبارات للكتالوج`, what: R`[[tests/conftest.py]] فيه [[app]] و [[client]] و [[runner]]، و ١٠ اختبارات: الإنشاء والفحص والـ 404 والصفحات والـ HTML escaping وأمر [[flask seed]]. من درس «اختبار Flask بـ pytest».`, done: R`[[pytest -q]] بيعدّي مرتين ورا بعض، وكل اختبار شغال على قاعدة في الذاكرة جديدة (اختبار بيعمل منتج والتاني بيتأكد إن العدد صفر)، والكل في أقل من ثانيتين.` },
        { lvl: 'كبير', t: R`لوحة حجوزات صغيرة`, what: R`تطبيق Flask لعيادة أو ملعب: مواعيد بحالات، وصفحات HTML للفريق بفورم إضافة وإلغاء، و API JSON للموبايل على نفس الـ models، وأمر [[flask seed]]، و Flask-Migrate، ولوج JSON، واختبارات، و Dockerfile بـ gunicorn. من الوحدة كلها ومن وحدة «الأداء والإنتاج».`, done: R`مينفعش موعدين في نفس الوقت (الـ API بيرجّع 409 والفورم بيوري رسالة)، والـ API أخطاءه JSON، والاختبارات بتعدّي مرتين ورا بعض، و [[docker run]] بيشغّله بـ gunicorn بـ ٢ workers و [[/health]] بيرد، وبيقفل في أقل من ٣ ثواني مع [[docker stop]].`, ext: R`زوّد login للفريق بـ Flask-Login، وإيميل تذكير قبل الموعد بيوم (queue مش BackgroundTasks)، وصفحة تقرير بعدد المواعيد لكل يوم.` },
        { lvl: 'فكرة', t: R`انقل حاجة صغيرة من Flask لـ FastAPI`, what: R`خد blueprint من مشروع Flask عندك (أو الكتالوج)، واعمله نسخة FastAPI بـ Pydantic و dependencies جنبه، وقارن: عدد السطور، والأخطاء، والتوثيق، والاختبارات. انت اللي بتحدد إيه اللي يتنقل.`, done: R`الاتنين بيعدّوا نفس الاختبارات السلوكية (نفس الطلبات ونفس الأكواد)، وعندك جدول مقارنة بالأرقام، وقرار مكتوب: تنقل المشروع كله ولا لأ وليه.`, ext: R`شغّل الاتنين ورا Nginx على نفس الدومين بمسارات مختلفة، وانقل route route من غير ما العميل يحس.` },
      ],
      n: "Flask صغير ومن غير ORM ولا admin: app factory و blueprints، و request و response، و Jinja للـ HTML، و Flask-SQLAlchemy للقاعدة، والاختبار بـ pytest، وإمتى تختاره بدل FastAPI أو Django",
      items: [
        {
          cmd: "flask run و create_app",
          title: "أول تطبيق Flask بـ app factory و blueprint",
          desc: R`[[pip install flask]]، وبدل [[app = Flask(__name__)]] في ملف واحد، المشاريع الحقيقية بتعمل دالة [[create_app()]] (app factory) بتعمل التطبيق وتحمّل الإعدادات وتسجّل الـ blueprints والـ extensions. و [[flask --app shop run --debug]] بيلاقي [[create_app]] لوحده ويشغّل سيرفر التطوير على [[http://127.0.0.1:5000]].

الـ blueprint مجموعة routes ليها اسم ([[products]]) بتتسجّل على prefix ([[/products]])، زي الـ app في Django أو [[APIRouter]] في FastAPI. اتجرّب بـ Flask 3.1.3.`,
          deep: {
            why: R`ملف واحد فيه [[app]] global بيبقى مشكلة أول ما تكبر: الاختبارات محتاجة تطبيق بإعدادات تانية (قاعدة في الذاكرة)، والـ imports بتلف على بعض (الـ routes محتاجة [[app]] و [[app]] محتاج الـ routes). الـ factory بيحل الاتنين: كل نداء لـ [[create_app(test_config)]] تطبيق جديد بإعداداته، والـ routes في blueprints مش محتاجة [[app]] خالص.`,
            how: R`[[Flask(__name__)]]: [[__name__]] اسم الـ package ([[shop]])، ومنه Flask بيعرف مكان [[templates/]] و [[static/]] و [[instance/]].

[[app.config]] dict فيه الإعدادات. [[from_mapping]] قيم افتراضية، و [[from_prefixed_env()]] بيقرا أي متغير بيئة أوله [[FLASK_]]: [[FLASK_SECRET_KEY]] يبقى [[SECRET_KEY]]، وبيحاول يفك القيمة كـ JSON ([[FLASK_PAGE_SIZE=20]] بيبقى int). و [[test_config]] يكتب فوق الكل في الاختبارات.

الـ extensions (زي [[db]]) بتتعمل مرة في ملف لوحدها من غير تطبيق، و [[db.init_app(app)]] جوه الـ factory بيربطها. والـ blueprint بيتعمله import **جوه** الدالة عشان مفيش import دايري.

[[flask --app shop run]]: [[--app shop]] يعني الـ package ده، و Flask بيدوّر فيه على [[app]] أو [[create_app]]. من غير [[--app]] بيدوّر على [[app.py]] أو [[wsgi.py]]. و [[--debug]] بيشغّل الـ reloader (يعيد التشغيل لما تحفظ) والـ debugger التفاعلي في المتصفح (بيشغّل Python من صفحة الخطأ، فممنوع بره جهازك). و [[flask --app shop routes]] بيعرض كل الـ routes.`,
            when: R`API صغير أو متوسط، أو موقع HTML بسيط، أو service داخلية، وإنت عايز تختار المكتبات بنفسك. ولو المشروع بيكبر، الـ factory والـ blueprints من أول يوم بيوفروا عليك إعادة كتابة.`,
            mistakes: R`ملف اسمه [[flask.py]] في المشروع (بيغطي على المكتبة). و [[--debug]] أو [[app.run(debug=True)]] على سيرفر حقيقي: الـ debugger بيدّي أي حد يوصل للصفحة تشغيل كود على السيرفر. و [[SECRET_KEY="dev"]] في الإنتاج (الـ sessions بتتوقّع بيه): حطه بـ [[FLASK_SECRET_KEY]]. و [[from shop import app]] في الـ blueprint (import دايري). و [[flask run]] في الإنتاج بدل gunicorn ([[gunicorn "shop:create_app()"]]).`
          },
          teach: R`## المثال بيعمل إيه؟

package اسمه [[shop]] فيه [[create_app()]]: بيعمل التطبيق، ويحمّل الإعدادات من قيم افتراضية والـ environment، ويربط قاعدة البيانات، ويسجّل blueprint المنتجات على [[/products]]، ويضيف [[/health]]. اتشغّل فعلًا بـ Flask 3.1.3 و Werkzeug 3.1.9 على لينكس (python:3.13-slim في Docker)، وعلى ويندوز في PowerShell 7 بـ Python 3.14.

---

## ١. التسطيب والتشغيل

| الخطوة | لينكس والماك | ويندوز (PowerShell) |
|---|---|---|
| venv | [[python3 -m venv .venv]] | [[python -m venv .venv]] |
| تفعيل | [[source .venv/bin/activate]] | [[.\.venv\Scripts\Activate.ps1]] |
| تسطيب | [[pip install flask flask-sqlalchemy]] | نفسه |
| تشغيل | [[flask --app shop run --debug]] | نفسه |

~~~bash
flask --version
~~~

~~~text الناتج
Python 3.13.18
Flask 3.1.3
Werkzeug 3.1.9
~~~

Werkzeug المكتبة اللي تحت Flask: بتعمل الـ request والـ response والـ routing وسيرفر التطوير.

---

## ٢. الـ factory

~~~python
from flask import Flask
from .extensions import db
def create_app(test_config=None):
    app = Flask(__name__)
~~~

- [[from .extensions import db]]: الـ [[.]] يعني من نفس الـ package. [[db]] اتعمل هناك من غير تطبيق (درس «Flask-SQLAlchemy»).
- [[test_config=None]]: باراميتر اختياري للاختبارات.
- [[Flask(__name__)]]: التطبيق. [[__name__]] هنا [["shop"]]، فـ Flask بيدوّر على [[shop/templates]] و [[shop/static]].

### الإعدادات

~~~python
    app.config.from_mapping(SECRET_KEY="dev", SQLALCHEMY_DATABASE_URI="sqlite:///shop.db")
    app.config.from_prefixed_env()
    if test_config:
        app.config.update(test_config)
~~~

بالترتيب، واللي بعده بيكتب فوق اللي قبله:

1. [[from_mapping]]: قيم افتراضية للتطوير.
2. [[from_prefixed_env()]]: متغيرات [[FLASK_*]]. جربت [[FLASK_SECRET_KEY=from-env FLASK_PAGE_SIZE=20]]: [[SECRET_KEY]] بقى [[from-env]]، و [[PAGE_SIZE]] بقى [[20]] من نوع [[int]] (اتفك كـ JSON).
3. [[test_config]]: للاختبارات بس.

### الربط والتسجيل

~~~python
    db.init_app(app)
    from .products import bp as products_bp
    app.register_blueprint(products_bp, url_prefix="/products")
~~~

- [[db.init_app(app)]]: اربط الـ extension بالتطبيق ده.
- الـ import جوه الدالة: [[products.py]] بيعمل import لـ [[db]] والـ models، فلو اتعمل فوق ممكن يلف على نفسه.
- [[register_blueprint(..., url_prefix="/products")]]: كل routes الـ blueprint تحت [[/products]].

### route على التطبيق نفسه

~~~python
    @app.get("/health")
    def health():
        return {"ok": True}
    return app
~~~

[[@app.get]] اختصار [[@app.route(..., methods=["GET"])]] (من Flask 2.0). ولو رجّعت dict، Flask بيحوّله JSON. و [[return app]] في الآخر: الـ factory بترجّع التطبيق.

---

## ٣. الـ blueprint

~~~python
from flask import Blueprint
bp = Blueprint("products", __name__)
~~~

- [[Blueprint("products", __name__)]]: الاسم [[products]] بيبقى أول اسم الـ endpoint ([[products.detail]])، وده اللي [[url_for]] بيستخدمه.
- الـ routes بتتكتب [[@bp.get("/")]] بدل [[@app.get]] (الدرس الجاي).

## ٤. [[flask --app shop routes]]

~~~text الناتج
Endpoint         Methods  Rule
---------------  -------  --------------------------
health           GET      /health
products.create  POST     /products/
products.detail  GET      /products/<int:product_id>
products.index   GET      /products/
static           GET      /static/<path:filename>
~~~

كل route باسمه ([[blueprint.function]]) و الـ methods والمسار. و [[static]] اتعمل لوحده لفولدر [[static/]].

## ٥. [[flask --app shop run --debug]]

~~~text الناتج
 * Serving Flask app 'shop'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 924-022-111
~~~

- [[Restarting with stat]]: الـ reloader شغال (بيراقب الملفات بـ stat).
- [[Debugger is active!]] و [[PIN]]: صفحة الخطأ فيها console Python، والـ PIN بيحميها. على جهازك بس.

[[curl http://127.0.0.1:5000/health]] رجّع [[{"ok":true}]]. وعلى ويندوز نفس الأمر في pwsh، و [[Invoke-RestMethod http://127.0.0.1:5000/health]] رجّع نفس الـ JSON.

> في الإنتاج: [[gunicorn "shop:create_app()"]]: gunicorn بينادي الـ factory بنفسه.

---

## ٦. في الإنتاج: gunicorn

اتشغّل فعلًا في [[python:3.13-slim]] بـ gunicorn 26.2.0 على نفس الـ package:

~~~bash
gunicorn "shop:create_app()" -w 2 -b 127.0.0.1:8000
~~~

~~~text الناتج
[10] [INFO] Listening at: http://127.0.0.1:8000 (10)
[12] [INFO] Booting worker with pid: 12
[13] [INFO] Booting worker with pid: 13
~~~

و [[/health]] رجّع [[{"ok":true}]]. الفرق عن FastAPI: Flask تطبيق **WSGI** (sync)، فـ gunicorn بيشغّله على طول من غير [[-k]]. كل worker process بيستقبل طلب واحد في نفس الوقت، فعدد الطلبات مع بعض = عدد الـ workers (أو [[--threads 4]] لكل worker لو الشغل I/O). والقواعد: [[--workers]] حوالي عدد الـ cores × ٢، و [[FLASK_SECRET_KEY]] من البيئة، ومفيش [[--debug]]. و gunicorn مش بيشتغل على ويندوز: هناك [[waitress-serve --call shop:create_app]] (من الـ docs).

- [[app.run()]] و [[flask run]] = سيرفر Werkzeug للتطوير: بيطبع [[WARNING: This is a development server]] لسبب.
- [[shop:create_app()]] بالأقواس: gunicorn بينادي الدالة ويستخدم الـ app اللي رجعت. من غير أقواس بيعتبر [[create_app]] نفسها هي التطبيق: gunicorn بيقوم عادي، بس كل طلب بيرجّع 500 واللوج فيه [[TypeError: create_app() takes from 0 to 1 positional arguments but 2 were given]] (اتجرّب).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[create_app()]] | تطبيق جديد لكل بيئة واختبار، ومفيش imports دايرية |
| [[from_prefixed_env()]] | الإعدادات والأسرار من [[FLASK_*]] |
| [[ext.init_app(app)]] | extensions متعملة مرة، ومربوطة جوه الـ factory |
| [[Blueprint]] + [[url_prefix]] | الـ routes متقسمة بالموضوع |
| [[flask --app shop run --debug]] | تطوير بس |
| [[flask --app shop routes]] | تشوف كل الـ URLs |`,
          example: R`# shop/__init__.py:
from flask import Flask
from .extensions import db
def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_mapping(SECRET_KEY="dev", SQLALCHEMY_DATABASE_URI="sqlite:///shop.db")
    app.config.from_prefixed_env()
    if test_config:
        app.config.update(test_config)
    db.init_app(app)
    from .products import bp as products_bp
    app.register_blueprint(products_bp, url_prefix="/products")
    @app.get("/health")
    def health():
        return {"ok": True}
    return app
# shop/products.py (أوله):
from flask import Blueprint
bp = Blueprint("products", __name__)
# في الترمنال (بعد تفعيل الـ venv):
# pip install flask flask-sqlalchemy
# flask --app shop routes
# flask --app shop run --debug`,
          flag: "script",
          lines: [
            R`[[Flask]] الكلاس اللي بيعمل التطبيق. من غير ما نعمل منه object على مستوى الـ module: الـ object هيتعمل جوه الـ factory بس.`,
            R`[[db]] اتعمل في [[extensions.py]] من غير أي تطبيق ([[SQLAlchemy(model_class=Base)]])، عشان الـ models والـ blueprints يعملوا له import من غير ما يحتاجوا [[app]]. والـ [[.]] يعني من نفس الـ package.`,
            R`الـ factory: كل نداء = تطبيق جديد بإعداداته. [[test_config=None]] باراميتر اختياري، الاختبارات بتبعت فيه قاعدة في الذاكرة و [[TESTING]].`,
            R`[[Flask(__name__)]]: [[__name__]] هنا [["shop"]]، ومنه Flask بيعرف مكان [[shop/templates]] و [[shop/static]] و [[instance/]]. لو كتبت اسم تاني، الـ templates مش هتتلاقي.`,
            R`قيم افتراضية تكفي التطوير: [[SECRET_KEY="dev"]] (بيوقّع الـ sessions، وممنوع يفضل كده في الإنتاج) و SQLite. [[sqlite:///shop.db]] نسبي، فالملف بيتعمل في [[instance/shop.db]].`,
            R`[[from_prefixed_env()]] بيقرا أي متغير أوله [[FLASK_]] ويشيل البادئة: [[FLASK_SECRET_KEY]] يبقى [[SECRET_KEY]]، وبيفك القيمة كـ JSON لو ينفع ([[FLASK_PAGE_SIZE=20]] بقى int 20). وبيكتب فوق اللي قبله.`,
            R`لو فيه إعدادات اختبار ([[None]] أو dict فاضي بيتخطوا)...`,
            R`...تتكتب فوق الكل، عشان الاختبار ميلمسش قاعدة التطوير مهما كانت متغيرات البيئة.`,
            R`[[db.init_app(app)]] بيربط الـ extension بالتطبيق ده بالذات (وبالـ URI بتاعه). الـ extension نفسه واحد، والتطبيقات كتير، وكل واحد بقاعدته.`,
            R`الـ import **جوه** الدالة: [[products.py]] بيعمل import لـ [[db]] والـ models، فلو اتعمل فوق في أول الملف ممكن يلف على نفسه (circular import) ويقع بـ [[ImportError: cannot import name]].`,
            R`[[register_blueprint]] بيضيف routes الـ blueprint للتطبيق، و [[url_prefix="/products"]] بيحط [[/products]] قبلهم، فـ [[@bp.get("/")]] بقى [[/products/]].`,
            R`route على التطبيق نفسه (مش blueprint). [[@app.get]] اختصار [[@app.route(..., methods=["GET"])]] من Flask 2.0. بيتعرّف جوه الـ factory لأن [[app]] موجود هنا بس.`,
            R`دالة الـ route. اسمها ([[health]]) بيبقى اسم الـ endpoint اللي [[url_for("health")]] بيستخدمه.`,
            R`لو رجّعت dict، Flask بيحوّله JSON بـ [[jsonify]] و [[Content-Type: application/json]] لوحده.`,
            R`الـ factory بترجّع التطبيق. [[flask --app shop]] و [[gunicorn "shop:create_app()"]] بيلاقوها وبينادوها بنفسهم.`,
            R`[[Blueprint]] من Flask: مجموعة routes ليها اسم، من غير ما تحتاج [[app]].`,
            R`[[Blueprint("products", __name__)]]: الاسم [[products]] بيبقى أول اسم كل endpoint ([[products.detail]])، و [[__name__]] عشان Flask يعرف مكان templates الـ blueprint لو ليه.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** بالترتيب، مين بيكتب فوق مين في [[app.config]]: [[from_mapping]] و [[from_prefixed_env]] و [[test_config]]؟ وجرّب: [[FLASK_SECRET_KEY=env]] و [[create_app({"SECRET_KEY": "test"})]].`, done: R`الترتيب من الأضعف للأقوى زي ما اتكتب، و [[app.config["SECRET_KEY"]]] طلع [[test]] مع الاتنين، و [[env]] من غير test_config، و [[dev]] من غير أي حاجة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[FLASK_DEBUG_TOOLBAR=true]] و [[FLASK_PAGE_SIZE=20]] و [[FLASK_NAME=shop]]. إيه نوع كل قيمة في [[app.config]] بعد [[from_prefixed_env()]]؟ اطبعهم بـ [[type()]].`, done: R`[[bool]] و [[int]] و [[str]] (أول اتنين اتفكوا كـ JSON، والتالت مش JSON صالح فبقى نص). وكاتب ليه [[FLASK_NAME=shop]] مش بيبقى error.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[products.py]] أوله [[from shop import create_app]] و [[app = create_app()]] و [[@app.get(...)]] بدل blueprint، و [[__init__.py]] بيعمل [[from .products import *]] في أوله. شغّل [[flask --app shop routes]] وانسخ الخطأ، وصلّحه بـ blueprint.`, done: R`قبل: [[ImportError]] فيه [[partially initialized module]] أو [[circular import]] (انسخ النص الحقيقي). بعد: [[routes]] بيوري [[products.index]] تحت [[/products/]]، ومفيش [[app]] في [[products.py]] خالص.` },
            { lvl: 'تطبيق', t: R`**ابني:** أمر [[flask --app shop seed --count 5]] بـ [[@app.cli.command]] و [[@click.option]] بيعمل الجداول ويضيف ٥ منتجات، وبيطبع [[seeded 5 products]].`, done: R`الأمر بيظهر في [[flask --app shop --help]]، وبعد تشغيله [[GET /products/]] بـ [[Accept: application/json]] بيرجّع [[total: 5]]، وتشغيله مرتين مبيقعش (القسم مش بيتكرر).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل التطبيق بـ [[flask run]] ومرة بـ gunicorn [[-w 4]] (في Docker لو على ويندوز)، وابعت ٢٠٠ طلب على route فيه [[time.sleep(0.1)]] بـ ٢٠ مع بعض.`, done: R`عندك رقمين بالوقت الكلي، و gunicorn أسرع بوضوح (٤ workers = ٤ طلبات مع بعض)، وكاتب ليه [[flask run]] نفسه مش واحد بس (Werkzeug بيشغّل thread لكل طلب افتراضيًا) لو الرقم طلع أقرب مما توقعت.` },
          ],
          try: R`اعمل الـ package ده (مع [[extensions.py]] و blueprint فيه route واحد)، وشغّله بـ [[flask --app shop run --debug]]، وافتح [[/health]]. اعرض الـ routes. وبعدين شغّله تاني بـ [[FLASK_SECRET_KEY]] من الـ environment واطبع [[app.config["SECRET_KEY"]]] من [[flask --app shop shell]]. وأخيرًا اعمل تطبيق اختبار بـ [[create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})]] واطلب [[/health]] بـ [[app.test_client()]].`,
          solCode: R`from shop import create_app
app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})
client = app.test_client()
print(client.get("/health").json)`,
          sol: R`[[flask --app shop shell]] بيطبع [[App: shop]] و [[Instance: .../instance]]، و [[app]] جاهز جوه الـ shell. بـ [[FLASK_SECRET_KEY=from-env]] قبل الأمر (أو [[$env:FLASK_SECRET_KEY = 'from-env']] في PowerShell)، [[app.config["SECRET_KEY"]]] بيطبع [[from-env]].

والـ test client بيطبع [[{'ok': True}]] من غير سيرفر خالص: [[test_client()]] بيبعت الطلب للتطبيق في نفس الـ process. وكل [[create_app(...)]] تطبيق مستقل بقاعدته، وده اللي بيخلي الاختبارات متتلخبطش في بعض.`
        },
        {
          cmd: "Flask request و response",
          title: "تقرا الطلب وترد: request.args و get_json و abort و errorhandler",
          desc: R`في Flask الـ [[request]] object global بيشاور على الطلب الحالي: [[request.args]] للـ query string، و [[request.get_json()]] للـ body، و [[request.form]] للفورم. والرد ممكن يبقى dict (يتحول JSON) أو string (HTML) أو tuple [[(body, status, headers)]].

[[abort(404)]] بيوقف ويرد بالـ status، و [[db.get_or_404]] بيجيب الصف أو 404، و [[@bp.errorhandler(404)]] بيخلي الأخطاء JSON بدل صفحة HTML. Flask مفيهوش فحص تلقائي للمدخلات زي Pydantic: الفحص بإيدك أو بمكتبة.`,
          deep: {
            why: R`ده كل شغل الـ API: تقرا اللي جاي، تتأكد إنه سليم، وترد بالـ status الصح. ولو الأخطاء مش JSON، الفرونت بيستقبل صفحة HTML ومش عارف يعرض الرسالة.`,
            how: R`[[request]] اسمه global بس هو proxy: Flask بيربطه بالطلب الحالي في كل thread (ده الـ request context). عشان كده بتعمل import ليه من غير ما يتبعتلك كباراميتر.

[[request.args.get("page", 1, type=int)]]: لو القيمة مش رقم بيرجّع الـ default بدل ما يرمي error. و [[request.args.getlist("tag")]] لـ [[?tag=a&tag=b]].

[[request.get_json()]] من غير [[silent]] بيرد 415 لو الـ Content-Type مش JSON، و 400 لو الـ JSON بايظ. و [[silent=True]] بيرجّع [[None]] بدل كده، فتبعت إنت رسالة أوضح.

الرد: dict أو list بيتحولوا JSON بـ [[jsonify]]. tuple [[(body, 201)]] للـ status، و [[(body, 201, {"Location": ...})]] للـ headers. و [[url_for("products.detail", product_id=8)]] بيبني الـ URL من اسم الـ endpoint.

[[abort(400, description="...")]] بيرمي [[HTTPException]] من Werkzeug. و [[@bp.errorhandler(404)]] بيمسك أخطاء routes الـ blueprint بس (الـ 404 لمسار مش موجود خالص بيتمسك على مستوى التطبيق: [[@app.errorhandler]]). والدالة بتاخد الـ error وفيه [[name]] و [[description]] و [[code]].

و [[request.accept_mimetypes.best]]: أحسن نوع العميل طالبه في [[Accept]]، فنفس الـ URL يرجع JSON لـ [[Accept: application/json]] و HTML للمتصفح.`,
            when: R`أي endpoint في Flask. ولو المدخلات كتير، استخدم Pydantic أو marshmallow للفحص بدل if ورا if. ولو عايز توثيق OpenAPI تلقائي من الكود، ده بتاع FastAPI أو extension زي [[flask-smorest]].`,
            mistakes: R`[[request.json["name"]]] من غير فحص: لو الحقل مش موجود [[KeyError]] و 500. و [[int(request.args["page"])]] بيقع على [[?page=abc]]. ونسيان الـ status في الـ create فيرجع 200 بدل 201. و [[@bp.errorhandler(404)]] وتستغرب إن [[/nope]] لسه HTML. والـ [[request]] بره طلب (في سكربت أو thread): [[RuntimeError: Working outside of request context]].`
          },
          teach: R`## المثال بيعمل إيه؟

٣ routes في blueprint المنتجات: list ببحث وصفحات (JSON أو HTML حسب الـ [[Accept]])، ومنتج واحد، وإنشاء منتج بفحص يدوي، و error handler بيخلي الأخطاء JSON. اتشغّل فعلًا بـ Flask 3.1.3 و Flask-SQLAlchemy 3.1.1 على لينكس في Docker بـ SQLite و ٧ منتجات، والطلبات بـ [[curl]].

---

## ١. [[index]]: الـ query string

~~~python
@bp.get("/")
def index():
    q = request.args.get("q", "")
    page = request.args.get("page", 1, type=int)
~~~

- [[@bp.get("/")]]: GET على [[/products/]] (الـ prefix + [[/]]).
- [[request.args]]: الـ query string كـ dict. [[?q=usb&page=2]].
- [[type=int]]: حوّل لـ int، ولو مش رقم رجّع الـ default. جربت [[?page=abc]]: طلع [[1]] من غير error.

~~~python
    stmt = db.select(Product).options(joinedload(Product.category)).order_by(Product.id)
    if q:
        stmt = stmt.where(Product.name.ilike(f"%{q}%"))
    products = db.paginate(stmt, page=page, per_page=3)
~~~

الـ query بـ SQLAlchemy (درس «Flask-SQLAlchemy»): المنتجات ومعاها أقسامها في JOIN، وفلتر بالاسم من غير ما يهم الـ capital، وصفحات من ٣.

~~~python
    if request.accept_mimetypes.best == "application/json":
        return {"items": [p.to_dict() for p in products], "total": products.total, "page": products.page}
    return render_template("products/index.html", products=products, q=q)
~~~

لو العميل طالب JSON: dict. غير كده: HTML من template.

~~~text curl -H "Accept: application/json" "http://127.0.0.1:5000/products/?page=2"
{
  "items": [
    {"category": "Cables", "id": 4, "name": "USB-C 1m", "price_cents": 15000},
    ...
  ],
  "page": 2,
  "total": 7
}
~~~

(مع [[--debug]] الـ JSON بيطلع متنسّق على سطور، ومن غيره سطر واحد.) و [[curl]] من غير [[Accept]] رجع HTML.

---

## ٢. [[detail]]: 404 جاهز

~~~python
@bp.get("/<int:product_id>")
def detail(product_id):
    product = db.get_or_404(Product, product_id)
    return product.to_dict()
~~~

- [[<int:product_id>]]: converter: رقم بس، وبيتبعت للدالة int. [[/products/abc]] = 404 من غير ما الدالة تشتغل.
- [[db.get_or_404(Model, id)]]: بالـ primary key، أو [[abort(404)]].

---

## ٣. [[create]]: الـ body والفحص

~~~python
@bp.post("/")
def create():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    price = data.get("price_cents")
    if not name or not isinstance(price, int) or price < 100:
        abort(400, description="name is required and price_cents must be an int >= 100")
~~~

- [[get_json(silent=True)]]: الـ body كـ dict، أو [[None]] لو مش JSON. و [[or {}]] عشان [[data.get]] يشتغل.
- [[(data.get("name") or "").strip()]]: لو مش موجود أو [[None]] يبقى [[""]]، وشيل المسافات.
- [[isinstance(price, int)]]: النوع int فعلًا (مش [["500"]]).
- [[abort(400, description=...)]]: وقّف ورد 400 بالرسالة دي.

من غير [[silent=True]]، طلب [[name=x]] (فورم مش JSON) بيرجع [[415 Unsupported Media Type]]، و JSON بايظ بيرجع [[400]].

~~~python
    category = db.session.execute(db.select(Category).filter_by(name=data.get("category"))).scalar_one_or_none()
    if category is None:
        abort(400, description="unknown category")
    product = Product(name=name, price_cents=price, category=category)
    db.session.add(product)
    db.session.commit()
    return product.to_dict(), 201, {"Location": url_for("products.detail", product_id=product.id)}
~~~

- [[scalar_one_or_none()]]: صف واحد أو [[None]].
- [[db.session.add]] و [[commit]]: [[INSERT]] فعلي.
- الرد tuple: الـ body، و [[201]]، و header [[Location]] بلينك المنتج الجديد. و [[url_for("products.detail", ...)]] بيبني [[/products/8]] من اسم الـ endpoint.

~~~text الناتج
HTTP/1.1 201 CREATED
Location: /products/8
~~~

---

## ٤. الأخطاء JSON

~~~python
@bp.errorhandler(400)
@bp.errorhandler(404)
def json_error(error):
    return jsonify(error=error.name, detail=error.description), error.code
~~~

- decorator مرتين: نفس الدالة لـ 400 و 404.
- [[error]]: الـ [[HTTPException]] اللي اترمى: [[name]] ([["Bad Request"]]) و [[description]] والـ [[code]].
- [[jsonify(error=..., detail=...)]]: JSON من keyword arguments.

### الطلبات كلها

| الطلب | الرد | ليه |
|---|---|---|
| [[GET /products/999]] | [[404]] [[{"detail":"The requested URL was not found on the server. ...","error":"Not Found"}]] | [[get_or_404]] عمل [[abort(404)]]، والـ handler بتاع الـ blueprint حوّله JSON |
| [[POST]] بـ [[price_cents: 50]] | [[400]] [[{"detail":"name is required and price_cents must be an int >= 100","error":"Bad Request"}]] | الفحص اليدوي رفض السعر الأقل من ١٠٠ |
| [[POST]] بـ [[category: "Toys"]] | [[400]] [[{"detail":"unknown category","error":"Bad Request"}]] | [[scalar_one_or_none()]] رجّع [[None]] فوقفنا قبل الـ INSERT |
| [[POST]] فورم مش JSON | [[400]] نفس رسالة الفحص | [[silent=True]] رجّع [[None]] بدل 415، و [[or {}]] خلّى الفحص يرفض |
| [[POST]] صح | [[201]] [[{"category":"Cables","id":9,"name":"DP cable 2","price_cents":25000}]] | اتحفظ، والرد فيه [[Location]] بلينكه |
| [[DELETE /products/1]] | [[405 METHOD NOT ALLOWED]] و [[Allow: HEAD, GET, OPTIONS]] | المسار موجود بس من غير DELETE، و Flask بيقول المسموح في [[Allow]] |
| [[GET /nope]] | [[404]] **HTML** | بره الـ blueprint، فالـ handler بتاعه مش بيمسكه: محتاج [[@app.errorhandler]] |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| query string | [[request.args.get("x", default, type=int)]] |
| JSON body | [[request.get_json(silent=True)]] + فحص |
| status و headers | [[return body, 201, {"Location": ...}]] |
| وقّف بخطأ | [[abort(code, description=...)]] |
| صف أو 404 | [[db.get_or_404(Model, id)]] |
| أخطاء JSON | [[@bp.errorhandler(code)]] أو [[@app.errorhandler]] للكل |
| URL من اسمه | [[url_for("bp.func", **params)]] |`,
          example: R`from flask import Blueprint, abort, jsonify, render_template, request, url_for
from sqlalchemy.orm import joinedload
from .extensions import db
from .models import Category, Product
bp = Blueprint("products", __name__)
@bp.get("/")
def index():
    q = request.args.get("q", "")
    page = request.args.get("page", 1, type=int)
    stmt = db.select(Product).options(joinedload(Product.category)).order_by(Product.id)
    if q:
        stmt = stmt.where(Product.name.ilike(f"%{q}%"))
    products = db.paginate(stmt, page=page, per_page=3)
    if request.accept_mimetypes.best == "application/json":
        return {"items": [p.to_dict() for p in products], "total": products.total, "page": products.page}
    return render_template("products/index.html", products=products, q=q)
@bp.get("/<int:product_id>")
def detail(product_id):
    product = db.get_or_404(Product, product_id)
    return product.to_dict()
@bp.post("/")
def create():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    price = data.get("price_cents")
    if not name or not isinstance(price, int) or price < 100:
        abort(400, description="name is required and price_cents must be an int >= 100")
    category = db.session.execute(db.select(Category).filter_by(name=data.get("category"))).scalar_one_or_none()
    if category is None:
        abort(400, description="unknown category")
    product = Product(name=name, price_cents=price, category=category)
    db.session.add(product)
    db.session.commit()
    return product.to_dict(), 201, {"Location": url_for("products.detail", product_id=product.id)}
@bp.errorhandler(400)
@bp.errorhandler(404)
def json_error(error):
    return jsonify(error=error.name, detail=error.description), error.code`,
          flag: "script",
          lines: [
            R`أدوات Flask: [[Blueprint]] للـ routes، و [[abort]] يوقّف برد خطأ، و [[jsonify]] للـ JSON، و [[render_template]] للـ HTML، و [[request]] الطلب الحالي، و [[url_for]] يبني URL من اسم الـ endpoint.`,
            R`[[joinedload]] من SQLAlchemy: يجيب المنتجات وأقسامها في query واحدة بـ JOIN، بدل query لكل قسم (N+1) لما الـ template أو [[to_dict]] يقرا [[p.category.name]].`,
            R`[[db]] نفس الـ object اللي في [[extensions.py]]، مربوط بالتطبيق الحالي، و [[db.session]] بتاعته session الطلب ده.`,
            R`الـ models من [[models.py]]. ولأن الـ blueprint بيتعمله import جوه [[create_app]]، مفيش circular import.`,
            R`blueprint اسمه [[products]]، فالـ endpoints اسمها [[products.index]] و [[products.detail]] و [[products.create]].`,
            R`[[@bp.get("/")]]: GET على [[/]] جوه الـ blueprint، ومع [[url_prefix="/products"]] بقى [[/products/]].`,
            R`الدالة اسمها [[index]]، وده اسم الـ endpoint اللي [[url_for("products.index")]] بيستخدمه في لينك «الصفحة الجاية».`,
            R`[[request.args]] الـ query string كـ dict. [[get("q", "")]]: القيمة أو نص فاضي لو مش موجودة، عشان [[if q:]] تحت يشتغل من غير [[None]].`,
            R`[[type=int]]: Flask يحوّلها رقم، ولو مش رقم يرجّع الـ default بدل ما يرمي. اتجرّب: [[?page=abc]] بقى [[1]] من غير error. (لو كتبت [[int(request.args["page"])]] كان هيبقى 500.)`,
            R`الـ query: كل المنتجات ومعاها أقسامها، و [[order_by(Product.id)]] لازم مع الصفحات: من غير ترتيب ثابت القاعدة ممكن ترجّع نفس المنتج في صفحتين.`,
            R`لو فيه كلمة بحث بس نزوّد الشرط. الـ query بتتبني خطوة خطوة ومبتتنفّذش لحد [[paginate]].`,
            R`[[ilike]] = LIKE من غير ما يفرق capital و small، و [[%q%]] = الكلمة في أي مكان في الاسم. والقيمة بتتبعت parameter، فمفيش SQL injection رغم الـ f-string (الـ f-string بيبني النمط بس، مش الـ SQL).`,
            R`[[db.paginate]] بيعمل query للعدد وواحدة للصفحة، وبيرجّع object فيه [[items]] و [[total]] و [[page]] و [[has_next]] و [[next_num]]. ولو [[page]] أكبر من الموجود بيرجّع 404 لوحده (اتجرّب: [[?page=9]] على ٤ منتجات = 404 JSON).`,
            R`[[accept_mimetypes.best]]: أحسن نوع العميل طالبه في header [[Accept]]. [[curl]] من غير header بيبعت [[*/*]] فالـ HTML يكسب، و [[-H "Accept: application/json"]] بيجيب JSON.`,
            R`رد JSON: الـ list بتتلف عليها زي list عادية ([[for p in products]] بيلف على صفحة واحدة بس)، و [[to_dict()]] دالة بتاعتنا لأن Flask مفيهوش serializers.`,
            R`غير كده: HTML من [[templates/products/index.html]]، والـ keyword arguments بيبقوا متغيرات في الـ template (درس «Jinja templates»).`,
            R`[[<int:product_id>]] converter: المسار يطابق لو الجزء ده رقم بس، ويتبعت للدالة int. [[/products/abc]] = 404 من غير ما الدالة تشتغل.`,
            R`الدالة بتاخد [[product_id]] من المسار بنفس الاسم اللي في [[<...>]]، ولو اختلف الاسم Flask يرمي [[TypeError]] مع أول طلب.`,
            R`[[db.get_or_404(Model, id)]]: بالـ primary key، أو [[abort(404)]] لو مش موجود. سطر واحد بدل [[get]] و [[if None]].`,
            R`dict، فـ Flask بيحوّله JSON و status 200.`,
            R`[[@bp.post("/")]]: POST على [[/products/]]. نفس المسار بتاع [[index]] بـ method تانية، و Flask بيفرّق بالـ method.`,
            R`دالة الإنشاء. Flask مفيهوش فحص تلقائي زي Pydantic، فكل الفحص جوه الدالة.`,
            R`[[get_json(silent=True)]] بيرجّع الـ body dict، أو [[None]] لو مش JSON أو بايظ. من غير [[silent]]: فورم بيرجّع 415 و JSON بايظ 400 برسالة HTML. و [[or {}]] عشان [[data.get]] تحت ميرميش على [[None]].`,
            R`[[(data.get("name") or "")]] بيحوّل الناقص و [[None]] لنص فاضي، و [[strip()]] بيشيل المسافات، عشان اسم كله مسافات يترفض زي الفاضي.`,
            R`السعر زي ما جه من غير تحويل، عشان نفحص نوعه بنفسنا في السطر الجاي.`,
            R`[[isinstance(price, int)]] بيرفض [["500"]] (نص) و [[None]]، و [[price < 100]] بيرفض الأسعار الصغيرة. خد بالك: [[True]] برضه [[int]] في Python ([[isinstance(True, int)]] = [[True]])، و [[price_cents: true]] بيترفض هنا بالصدفة بس لأن [[True]] = 1 أقل من ١٠٠. الأصح [[type(price) is int]].`,
            R`[[abort(400, description=...)]] بيرمي [[HTTPException]] من Werkzeug بيوقّف الدالة، والـ [[description]] بتوصل للـ error handler تحت.`,
            R`القسم بالاسم: [[filter_by(name=...)]] شرط مساواة، و [[scalar_one_or_none()]] صف واحد أو [[None]] (ولو لقى اتنين بيرمي، بس [[name]] عليه [[unique=True]]).`,
            R`مفيش قسم بالاسم ده...`,
            R`...يبقى 400 برسالة واضحة بدل [[IntegrityError]] و 500 من الـ foreign key.`,
            R`object جديد. [[category=category]] بندّي الـ object نفسه، و SQLAlchemy بيحط [[category_id]] لوحده.`,
            R`[[db.session.add]] بيضيفه للـ session بس، لسه مفيش INSERT.`,
            R`[[commit()]] بيعمل الـ INSERT فعلًا وبيملا [[product.id]]. من غيره الرد هيرجع 201 والمنتج مش في القاعدة.`,
            R`الرد tuple: الـ body، و [[201 Created]]، و header [[Location]] بلينك المنتج الجديد. و [[url_for("products.detail", product_id=...)]] بيبني [[/products/8]] من اسم الـ endpoint، فلو المسار اتغيّر اللينك يتغيّر لوحده.`,
            R`[[@bp.errorhandler(400)]]: أي 400 بيترمي جوه routes الـ blueprint ده بيوصل للدالة تحت...`,
            R`...ونفس الدالة لـ 404 كمان (decoratorين على دالة واحدة). أخطاء برّه الـ blueprint ([[/nope]]) مش بتوصل هنا.`,
            R`[[error]] هو الـ [[HTTPException]] اللي اترمى، وفيه [[name]] ([["Bad Request"]]) و [[description]] (رسالتنا) و [[code]] (400).`,
            R`[[jsonify(error=..., detail=...)]] بيعمل JSON من keyword arguments، و [[error.code]] كـ status عشان الرد ميبقاش 200. من غير الـ handler ده الأخطاء بتطلع صفحة HTML والفرونت مش هيعرف يقراها.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه الـ status والـ Content-Type لكل طلب: [[GET /products/abc]]، و [[GET /products/?page=abc]]، و [[POST /products/]] بـ [[-d "name=x"]] (فورم)، و [[GET /nope]]. اكتب وبعدين جرّب بـ [[curl -i]].`, done: R`404 HTML (المسار مطابقش فالـ blueprint handler مش شغال)، و 200 الصفحة الأولى، و 400 JSON (silent)، و 404 HTML. وكاتب ليه الأول HTML مع إنه «جوه» [[/products]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[name = request.json["name"]]] و [[page = int(request.args["page"])]]. ابعت طلب من غير [[name]]، وطلب بـ [[?page=x]]، وانسخ الـ status والخطأ في اللوج، وصلّحهم بطريقة الدرس.`, done: R`قبل: الاتنين 500 مع [[KeyError]] و [[ValueError]] في اللوج (أو [[BadRequestKeyError]] للأولى، اكتب اللي طلع). بعد: 400 JSON برسالة، و [[page]] بقت 1.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[PATCH /products/<id>]] بيعدّل [[price_cents]] بس، بنفس الفحص، ويرجّع المنتج بعد التعديل، و 404 لو مش موجود، و 400 لو مفيش [[price_cents]] في الـ body.`, done: R`٤ طلبات بـ curl: صح (200 والسعر الجديد)، ومش موجود (404 JSON)، ومن غير السعر (400)، وسعر [[true]] بيرجّع 400 برسالة إن النوع غلط مش رسالة «أقل من ١٠٠» (يعني فحصت [[type(price) is int]] قبل الحد).` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** باستخدام [[app.test_client()]]، اختبار لكل صف في جدول «الطلبات كلها» بيتأكد من الـ status و [[is_json]]، بـ [[pytest.mark.parametrize]].`, done: R`٧ اختبارات بتعدّي، والـ [[/nope]] بيتأكد إن [[is_json]] [[False]] (لحد ما تضيف [[@app.errorhandler]] فتغيّره).` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية الشكل:** endpoint [[POST /products/import]] بياخد CSV (من [[request.files["file"]]]) فيه ٢٠ صف منهم ٣ بايظين (سعر نص، وقسم مش موجود، واسم فاضي)، ويحفظ السليم ويرجّع تقرير بالصفوف المرفوضة وسبب كل واحد.`, done: R`الرد فيه [[{"created": 17, "rejected": [...]}]] بأرقام الصفوف الـ ٣ وأسبابهم، والـ ١٧ اتحفظوا في commit واحد، وملف مش CSV أو من غير [[file]] بيرجّع 400 JSON.` },
          ],
          try: R`شغّل التطبيق وجرّب كل سطر في جدول الطلبات بـ [[curl]] (أو [[Invoke-RestMethod]] على ويندوز). وبعدين ضيف [[@bp.delete("/<int:product_id>")]] بيمسح المنتج ويرجّع [[204]] من غير body. وأخيرًا خلّي [[/nope]] كمان يرجع JSON.`,
          solCode: R`@bp.delete("/<int:product_id>")
def delete(product_id):
    product = db.get_or_404(Product, product_id)
    db.session.delete(product)
    db.session.commit()
    return "", 204
# في create_app بعد register_blueprint:
#     @app.errorhandler(404)
#     def not_found(error):
#         return {"error": error.name, "detail": error.description}, 404`,
          sol: R`[[return "", 204]]: body فاضي و [[204 NO CONTENT]]. وبعدها [[GET]] على نفس المنتج [[404]]، و [[DELETE]] تاني [[404]] من [[get_or_404]]. ولاحظ إن [[DELETE /products/1]] كان بيرجع [[405]] قبل الـ route ده، ودلوقتي [[flask --app shop routes]] هيوري [[products.delete  DELETE  /products/<int:product_id>]].

و [[@app.errorhandler(404)]] جوه الـ factory بيمسك أي 404 في التطبيق كله، فـ [[/nope]] يرجع [[{"detail":"The requested URL was not found on the server. ...","error":"Not Found"}]]. والـ handler بتاع الـ blueprint ليه الأولوية جوه routes الـ blueprint.`
        },
        {
          cmd: "Jinja templates",
          title: "صفحات HTML في Flask: render_template و extends و block و filters",
          desc: R`Flask بيرسم HTML بـ Jinja: [[render_template("products/index.html", products=...)]] بيدوّر في فولدر [[templates/]]، و [[{{ ... }}]] بيطبع قيمة بعد escape، و [[{% for %}]] و [[{% if %}]] للف والشروط، و [[{% extends "base.html" %}]] و [[{% block %}]] عشان كل الصفحات تشارك نفس الهيكل.

الـ filters بعد [[|]] بتعدّل القيمة ([[|upper]] و [[|format]] و filter بتعملها إنت). والـ autoescape شغال لوحده في ملفات [[.html]]، فكلام اليوزر مبيتنفذش كـ HTML. نفس الفكرة في templates Django (درس «views و urls») بفروق صغيرة.`,
          deep: {
            why: R`لو الموقع بيرجع HTML من السيرفر (لوحة داخلية، موقع محتوى، فورمات)، الـ templates بتفصل الشكل عن الكود. والـ inheritance بيخلي الهيدر والفوتر والـ CSS في ملف واحد. والـ escape التلقائي بيقفل أشهر ثغرة في المواقع (XSS) من غير ما تفكر فيها.`,
            how: R`Jinja بيحوّل الـ template لكود Python مرة وبيعمله cache. [[{{ expr }}]] بيقيّم expression (attributes و indexes ونداء دوال)، و [[{% ... %}]] أوامر. و [[{# ... #}]] تعليق مبيطلعش في الـ HTML.

[[{% extends "base.html" %}]] لازم أول سطر: الصفحة الابن مبتكتبش HTML بره الـ blocks، هي بتملى blocks الأب بس. و [[{{ super() }}]] جوه block بيحط محتوى الأب قبل بتاعك.

[[{% for p in products %} ... {% else %} ... {% endfor %}]]: الـ [[else]] بيشتغل لو الـ list فاضية (في Django اسمها [[{% empty %}]]). وجوه الـ loop فيه [[loop.index]] و [[loop.first]] و [[loop.last]].

[[url_for]] متاح في الـ templates: [[url_for('static', filename='style.css')]] لفولدر [[static/]]، و [[url_for('products.detail', product_id=p.id)]] للـ routes.

الـ filters: [[|upper]] و [[|lower]] و [[|default("—")]] و [[|length]] و [[|join(", ")]] و [[|format]]. و [[@app.template_filter("egp")]] بيضيف filter بتاعك. و [[|safe]] بيقفل الـ escape للقيمة دي: استخدمه بس على HTML إنت متأكد منه.

متغير مش موجود [[{{ missing }}]] بيطلع فاضي في صمت، بس [[{{ missing.name }}]] بيرمي [[UndefinedError]]. ولو عايز أي متغير ناقص يرمي: [[app.jinja_env.undefined = StrictUndefined]].`,
            when: R`صفحات HTML من السيرفر في Flask، وإيميلات HTML، وملفات config بتتولد (Ansible بيستخدم Jinja). ولو الفرونت React أو Vue منفصل، الـ API بيرجع JSON والـ templates مش محتاجها غير للإيميلات.`,
            mistakes: R`[[|safe]] على حاجة اليوزر كتبها (XSS). و HTML بره الـ blocks في صفحة بتعمل [[extends]] (مبيظهرش). ولينكات مكتوبة بإيدك [[href="/products/4"]] بدل [[url_for]]. ومنطق كتير في الـ template (queries و حسابات): حضّر الداتا في الـ view. و N+1 من الـ template: [[{{ p.category.name }}]] جوه loop من غير [[joinedload]] في الـ query. وتسمية ملف [[.txt]] أو [[.j2]] وتستغرب إن الـ autoescape مش شغال (Flask بيشغّله لـ [[.html]] و [[.htm]] و [[.xml]] و [[.xhtml]] و [[.svg]] بس).`
          },
          teach: R`## المثال بيعمل إيه؟

قالب أساسي [[base.html]] فيه الهيكل، وصفحة المنتجات بتورث منه وبتلف على المنتجات بتنسيق للسعر واسم القسم ولينك للصفحة الجاية، و filter بتاعك للسعر. اتشغّل فعلًا بـ Flask 3.1.3 و Jinja2 3.1.6 على لينكس في Docker، على نفس التطبيق بتاع الدرسين اللي فاتوا.

---

## ١. الأماكن

~~~text الفولدرات
shop/
  templates/
    base.html
    products/
      index.html
  static/
    style.css
~~~

Flask بيدوّر على [[templates/]] و [[static/]] جنب الـ package (عشان [[Flask(__name__)]]). وفولدر [[products/]] جوه templates بيمنع تصادم الأسامي بين الـ blueprints.

---

## ٢. [[base.html]]: الأب

~~~text base.html
<!doctype html>
<html lang="en">
<head>
  <title>{% block title %}Shop{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <main>{% block content %}{% endblock %}</main>
</body>
</html>
~~~

- [[{% block title %}Shop{% endblock %}]]: مكان اسمه [[title]] الابن يملاه، و [[Shop]] القيمة لو الابن معملهوش.
- [[{{ url_for('static', filename='style.css') }}]]: طلع [[/static/style.css]]. لو غيرت مكان الـ static، الـ URL يتغير لوحده.
- [[{% block content %}{% endblock %}]]: مكان المحتوى.

---

## ٣. [[products/index.html]]: الابن

~~~text index.html
{% extends "base.html" %}
{% block title %}Products{% endblock %}
{% block content %}
<h1>Products{% if q %} matching "{{ q }}"{% endif %}</h1>
<ul>
{% for p in products %}
  <li><a href="{{ url_for('products.detail', product_id=p.id) }}">{{ p.name }}</a> {{ "%.2f"|format(p.price_cents / 100) }} EGP ({{ p.category.name|upper }})</li>
{% else %}
  <li>No products.</li>
{% endfor %}
</ul>
{% if products.has_next %}<a href="{{ url_for('products.index', page=products.next_num, q=q) }}">Next</a>{% endif %}
{% endblock %}
~~~

| الحتة | معناها |
|---|---|
| [[{% extends "base.html" %}]] | الصفحة دي = base + الـ blocks دي |
| [[{% if q %} ... {% endif %}]] | يظهر بس لو فيه بحث |
| [[{{ q }}]] | اطبع كلمة البحث (بعد escape) |
| [[{% for p in products %}]] | لف على صفحة المنتجات ([[Pagination]] من Flask-SQLAlchemy بيتلف عليه زي list) |
| [[url_for('products.detail', product_id=p.id)]] | [[/products/4]] |
| [[{{ "%.2f"\|format(p.price_cents / 100) }}]] | قسمة على ١٠٠، و [[%.2f]] = رقمين بعد العلامة: [[150.00]] |
| [[p.category.name\|upper]] | [[CABLES]] |
| [[{% else %}]] | لو مفيش منتجات خالص |
| [[products.has_next]] و [[next_num]] | فيه صفحة جاية؟ ورقمها |
| [[url_for(..., page=..., q=q)]] | الـ keywords اللي مش في المسار بتبقى query string: [[?page=2&q=usb]] |

ودي الـ view اللي بترسمها (من الدرس اللي فات):

~~~python
return render_template("products/index.html", products=products, q=q)
~~~

كل keyword argument بيبقى متغير في الـ template.

### الناتج

~~~text curl "http://127.0.0.1:5000/products/?q=usb"
<!doctype html>
<html lang="en">
<head>
  <title>Products</title>
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  <main>
<h1>Products matching "usb"</h1>
<ul>
  <li><a href="/products/4">USB-C 1m</a> 150.00 EGP (CABLES)</li>
  <li><a href="/products/7">USB-C 2m</a> 190.00 EGP (CABLES)</li>
</ul>
</main>
</body>
</html>
~~~

### الـ escape

[[?q=<b>]] طلّع:

~~~text الناتج
<h1>Products matching "&lt;b&gt;"</h1>
~~~

و [[{{ x|safe }}]] بـ [["<b>hi</b>"]] طلّع [[<b>hi</b>]] زي ما هي. يعني [[|safe]] بيقفل الحماية.

---

## ٤. filter بتاعك

~~~python
@app.template_filter("egp")
def egp(cents):
    return f"{cents / 100:,.2f} EGP"
~~~

- [[@app.template_filter("egp")]]: سجّل الدالة كـ filter اسمه [[egp]] (جوه [[create_app]]، أو [[@bp.app_template_filter]] في blueprint).
- [[:,.2f]]: فاصلة كل ٣ أرقام، ورقمين بعد العلامة.

[[{{ 6500000|egp }}]] طلّع [[65,000.00 EGP]]. فالسطر الطويل في الـ template يبقى [[{{ p.price_cents|egp }}]].

## ٥. المتغير الناقص

[[{{ missing }}]] طلع فاضي من غير error، لكن [[{{ missing.name }}]] رمى [[jinja2.exceptions.UndefinedError: 'missing' is undefined]]. ومع [[app.jinja_env.undefined = StrictUndefined]] حتى [[{{ missing }}]] بيرمي، وده بيمسك الغلطات في الاختبارات.

---

## الخلاصة

| Jinja | معناه | في Django templates |
|---|---|---|
| [[{{ x }}]] | اطبع بعد escape | نفسه |
| [[{% extends %}]] و [[{% block %}]] | هيكل مشترك | نفسه |
| [[{% for %} ... {% else %}]] | لف، والـ else لو فاضي | [[{% empty %}]] |
| [[url_for('bp.func', ...)]] | URL من اسمه | [[{% url 'app:name' ... %}]] |
| [[x\|filter]] | تعديل القيمة | نفسه (filters مختلفة) |
| [[\|safe]] | من غير escape: بحذر | نفسه |`,
          example: R`{# shop/templates/base.html #}
<!doctype html>
<html lang="en">
<head>
  <title>{% block title %}Shop{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <main>{% block content %}{% endblock %}</main>
</body>
</html>
{# shop/templates/products/index.html #}
{% extends "base.html" %}
{% block title %}Products{% endblock %}
{% block content %}
<h1>Products{% if q %} matching "{{ q }}"{% endif %}</h1>
<ul>
{% for p in products %}
  <li><a href="{{ url_for('products.detail', product_id=p.id) }}">{{ p.name }}</a> {{ "%.2f"|format(p.price_cents / 100) }} EGP ({{ p.category.name|upper }})</li>
{% else %}
  <li>No products.</li>
{% endfor %}
</ul>
{% if products.has_next %}<a href="{{ url_for('products.index', page=products.next_num, q=q) }}">Next</a>{% endif %}
{% endblock %}`,
          flag: "script",
          lines: [
            R`تعليق Jinja بين [[{#]] و [[#}]]: بيتشال وقت الرسم ومبيوصلش للمتصفح، عكس [[<!-- -->]] بتاع HTML اللي بيبان في «View source». هنا بيقول اسم الملف بس.`,
            R`[[<!doctype html>]] بيقول للمتصفح «HTML5»، فيرسم الصفحة بالقواعد الحديثة. من غيره المتصفح بيدخل quirks mode والـ CSS ممكن يتصرف غريب.`,
            R`[[<html lang="en">]] بداية الصفحة، و [[lang]] لغتها (قارئ الشاشة والترجمة بيستخدموها). لو الموقع عربي: [[lang="ar" dir="rtl"]].`,
            R`[[<head>]] الحاجات اللي مش بتترسم في الصفحة: العنوان، والـ CSS، والـ meta.`,
            R`[[{% block title %}Shop{% endblock %}]]: مكان اسمه [[title]] الصفحة الابن تملاه، و [[Shop]] القيمة الافتراضية لو الابن معملهوش [[block title]].`,
            R`لينك الـ CSS. [[url_for('static', filename='style.css')]] بيطلّع [[/static/style.css]]، ولو التطبيق اتنقل تحت prefix (زي [[/shop]]) اللينك بيتعدّل لوحده، عكس [[href="/static/..."]] المكتوب بإيدك.`,
            R`[[</head>]] قفل الـ head. كل اللي بعده جسم الصفحة.`,
            R`[[<body>]] بداية الجزء اللي بيترسم فعلًا في الصفحة، وكل الصفحات الابن هتتحط جواه.`,
            R`[[<main>]] جواه [[block content]]: كل صفحة ابن بتحط محتواها هنا، والهيكل (هيدر وفوتر و CSS) بيفضل في الملف ده بس.`,
            R`[[</body>]] قفل الـ body. أي سكربتات مشتركة لكل الصفحات بتتحط قبله عادةً.`,
            R`[[</html>]] قفل الصفحة. ده آخر [[base.html]].`,
            R`تعليق Jinja تاني: بداية الملف التاني [[products/index.html]]. في الحقيقة كل ملف لوحده، واتحطوا مع بعض هنا عشان المثال.`,
            R`[[{% extends "base.html" %}]] لازم أول سطر: الصفحة دي = [[base.html]] بالـ blocks اللي تحت. وأي HTML برّه الـ blocks في صفحة بتعمل extends **مبيظهرش خالص**.`,
            R`بنملى [[block title]] بـ [[Products]]، فعنوان التاب في المتصفح بقى Products بدل Shop.`,
            R`بداية [[block content]]: كل اللي لحد [[endblock]] بيتحط مكان الـ block في الأب.`,
            R`[[{% if q %}]] الجزء ده يظهر بس لو فيه كلمة بحث، و [[{{ q }}]] بيطبع الكلمة **بعد escape**: اتجرّب [[?q=<b>]] طلع [[&lt;b&gt;]] كنص مش كـ HTML، فمفيش XSS.`,
            R`[[<ul>]] بداية لستة. كل منتج هيبقى [[<li>]].`,
            R`[[{% for p in products %}]]: بيلف على الصفحة الحالية من الـ [[Pagination]] بتاع Flask-SQLAlchemy كأنها list. وجوه الـ loop متاح [[loop.index]] و [[loop.first]] و [[loop.last]].`,
            R`لينك المنتج بـ [[url_for('products.detail', product_id=p.id)]] (بيطلّع [[/products/4]])، و [[{{ p.name }}]] escaped، والسعر [[%.2f]] (رقمين بعد العلامة: [[150.00]])، و [[|upper]] بيكبّر اسم القسم. و [[p.category.name]] من غير [[joinedload]] في الـ query = query لكل قسم.`,
            R`[[{% else %}]] جوه [[for]]: بيشتغل لو اللستة **فاضية** خالص (في Django اسمها [[{% empty %}]]). مش زي [[else]] بتاع الـ for في Python.`,
            R`السطر اللي بيظهر لما مفيش منتجات، زي بحث ملقاش حاجة.`,
            R`[[{% endfor %}]] قفل الـ loop. Jinja مبيعتمدش على المسافات زي Python، فكل [[for]] و [[if]] و [[block]] ليه قفلة صريحة.`,
            R`[[</ul>]] قفل اللستة بعد ما الـ loop خلص، سواء كان فيها منتجات أو سطر «No products».`,
            R`لينك «الصفحة الجاية» بس لو [[has_next]]. و [[url_for('products.index', page=..., q=q)]]: أي keyword مش في المسار بيبقى query string ([[?page=2&q=usb]])، فالبحث بيفضل في الصفحة الجاية.`,
            R`[[{% endblock %}]] قفل [[block content]]. لو نسيته Jinja بيرمي [[TemplateSyntaxError]] فيه [[Unexpected end of template]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة الفرق بين [[{{ }}]] و [[{% %}]] و [[{# #}]]، وإيه اللي بيحصل لـ HTML برّه الـ blocks في صفحة بتعمل [[extends]]. وبعدين جرّب الأخيرة.`, done: R`التلاتة صح (طباعة، وأمر، وتعليق مبيوصلش)، وحطيت [[<p>برّه</p>]] قبل أول block في [[index.html]] واتأكدت إنه مش موجود في الـ HTML اللي رجع.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[{{ name }}]] و [[{{ name|safe }}]] و [[{{ missing }}]] و [[{{ missing.x }}]] لو [[name = "<script>alert(1)</script>"]] و [[missing]] مش متبعت. اكتب الناتج لكل واحد.`, done: R`الأول [[&lt;script&gt;...]] (escaped)، والتاني السكربت زي ما هو (XSS)، والتالت فاضي من غير error، والرابع [[UndefinedError: 'missing' is undefined]]. وجربتهم بـ [[render_template_string]].` },
            { lvl: 'تطبيق', t: R`**ابني:** filter [[timeago]] بيحوّل [[datetime]] لـ «من ٥ دقايق» أو «من ساعتين» أو «من ٣ أيام»، وسجّله بـ [[@bp.app_template_filter]] جوه الـ blueprint، واستخدمه في صفحة المنتجات على تاريخ الإضافة.`, done: R`٤ قيم تجربة (٣٠ ثانية، و ٥ دقايق، و ٢ ساعة، و ٣ أيام) بتطلع صح، والـ filter شغال من غير ما تلمس [[create_app]].` },
            { lvl: 'تحدي', t: R`**قيس:** صفحة المنتجات بـ ٩ منتجات في ٩ أقسام مختلفة: عدّ الـ queries بـ [[event.listen(db.engine, "before_cursor_execute", ...)]] مرة بـ [[joinedload]] ومرة من غيره.`, done: R`عندك رقمين: ٢ queries مع [[joinedload]]، وأكتر (العدّ + الصفحة + query لكل قسم في الصفحة) من غيره، وكاتب الرقم الحقيقي اللي طلع وليه مش ٩ لو [[per_page=3]].` },
          ],
          try: R`اعمل الـ templates دي، وافتح [[/products/]] من المتصفح وامشي في الصفحات بـ Next. وبعدين اعمل filter [[egp]] واستخدمه بدل [["%.2f"|format(...)]]. وأخيرًا اعمل [[products/detail.html]] بيورث من base، وخلّي [[detail]] يرجّعه للمتصفح و JSON لـ [[Accept: application/json]].`,
          solCode: R`{# shop/templates/products/detail.html #}
{% extends "base.html" %}
{% block title %}{{ product.name }}{% endblock %}
{% block content %}
<h1>{{ product.name }}</h1>
<p>{{ product.price_cents|egp }} · {{ product.category.name }}</p>
<a href="{{ url_for('products.index') }}">All products</a>
{% endblock %}`,
          sol: R`الـ filter بيتسجّل في [[create_app]] بـ [[@app.template_filter("egp")]]، و [[{{ 15000|egp }}]] بيطلع [[150.00 EGP]]، و [[6500000]] بيطلع [[65,000.00 EGP]].

والـ view:

[[if request.accept_mimetypes.best == "application/json": return product.to_dict()]]، وبعدها [[return render_template("products/detail.html", product=product)]]. العنوان في التاب بيبقى اسم المنتج لأن الابن ملا [[block title]]. و [[curl]] من غير [[Accept]] بيرجع الـ HTML (لأن [[*/*]] مش [[application/json]])، و [[curl -H "Accept: application/json"]] بيرجع الـ JSON.`
        },
        {
          cmd: "Flask-SQLAlchemy",
          title: "قاعدة بيانات في Flask: db.Model و db.session و paginate و Flask-Migrate",
          desc: R`Flask مفيهوش ORM. Flask-SQLAlchemy بيربط SQLAlchemy 2 بالتطبيق: [[db = SQLAlchemy(model_class=Base)]] مرة، و [[db.init_app(app)]] في الـ factory، و models بـ [[Mapped]] و [[mapped_column]] (نفس أسلوب درس «SQLAlchemy async» بس sync)، و [[db.session]] بيتقفل لوحده آخر كل طلب.

وفيه اختصارات للويب: [[db.get_or_404]] و [[db.paginate]]. و [[db.create_all()]] للتجربة بس، والتغييرات بـ Flask-Migrate ([[flask db migrate]] و [[flask db upgrade]]) اللي هو Alembic جوه أوامر [[flask]].`,
          deep: {
            why: R`أغلب تطبيقات Flask محتاجة قاعدة. SQLAlchemy لوحده محتاج تدير الـ engine والـ session لكل طلب بإيدك، و Flask-SQLAlchemy بيعمل ده: session لكل طلب بتتقفل في الآخر، وإعداد واحد [[SQLALCHEMY_DATABASE_URI]]، وأوامر للاختبارات.`,
            how: R`[[DeclarativeBase]] أساس الـ models، و [[SQLAlchemy(model_class=Base)]] بيخلي [[db.Model]] يورث منه. اسم الجدول بيتعمل لوحده من اسم الكلاس ([[Product]] → [[product]]) لو مكتبتش [[__tablename__]].

[[SQLALCHEMY_DATABASE_URI]]: [[sqlite:///shop.db]] مسار نسبي، و Flask-SQLAlchemy بيحطه في فولدر [[instance/]] بتاع التطبيق (اتعمل [[instance/shop.db]]). و Postgres: [[postgresql+psycopg://user:pass@host/db]] من [[FLASK_SQLALCHEMY_DATABASE_URI]].

الـ session: [[db.session]] بتاعة الطلب الحالي (scoped)، و Flask-SQLAlchemy بيعمل [[remove()]] لما الطلب يخلص. و [[db.select]] و [[db.func]] نفس [[sqlalchemy.select]] و [[func]]. و [[db.session.execute(stmt).scalars()]] للـ objects، و [[scalar_one_or_none()]] لصف واحد.

بره طلب (سكربت أو [[flask shell]]) محتاج [[with app.app_context():]]، وإلا [[RuntimeError: Working outside of application context]].

[[relationship()]] lazy افتراضيًا: [[p.category]] بيعمل query أول مرة. و [[joinedload]] أو [[selectinload]] في الـ query بيمنع N+1 (نفس درس Django بأسامي تانية).

Flask-Migrate: [[Migrate(app, db)]] في الـ factory، وبعدها [[flask db init]] مرة (فولدر [[migrations/]])، و [[flask db migrate -m "..."]] (autogenerate)، و [[flask db upgrade]]. نفس قواعد درس «alembic»: اقرا الملف قبل commit.`,
            when: R`أي تطبيق Flask فيه قاعدة بيانات علاقية. ولو التطبيق async، FastAPI مع SQLAlchemy async أنسب. ولو عايز admin وauth جاهزين على الـ models، ده Django.`,
            mistakes: R`[[db.create_all()]] في الإنتاج بدل migrations (مبيعدّلش جدول موجود). و [[db.session.commit()]] منسي فمفيش حاجة اتحفظت. و query جوه loop على العلاقة (N+1). و الكود القديم [[Product.query.get(5)]]: legacy API، والجديد [[db.session.get(Product, 5)]] أو [[db.get_or_404]]. ونسيان [[app_context]] في السكربتات. و [[sqlite:///shop.db]] وتدوّر على الملف جنب الكود وهو في [[instance/]].`
          },
          teach: R`## المثال بيعمل إيه؟

ملف [[extensions.py]] فيه [[db]]، و [[models.py]] فيه قسم ومنتجات بعلاقة، وسكربت بيعمل الجداول ويملاها. اتشغّل فعلًا بـ Flask-SQLAlchemy 3.1.1 و SQLAlchemy 2.1.6 على لينكس في Docker بـ SQLite، و Flask-Migrate 4.1.0 (Alembic 1.20.1). وعلى ويندوز في pwsh 7 نفس السكربت طبع [[7]].

---

## ١. [[extensions.py]]

~~~python
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)
~~~

- [[DeclarativeBase]]: أساس الـ models في SQLAlchemy 2.
- [[SQLAlchemy(model_class=Base)]]: الـ extension. لسه مش مربوط بأي تطبيق، [[db.init_app(app)]] في الـ factory هو اللي بيربطه.

## ٢. [[models.py]]

~~~python
class Category(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
~~~

- [[db.Model]]: الأب، وبيدّي اسم الجدول لوحده: [[category]].
- [[Mapped[int]]] و [[mapped_column(primary_key=True)]]: عمود int و primary key.
- [[Mapped[str]]]: [[VARCHAR]] مش null.

~~~python
class Product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    price_cents: Mapped[int]
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))
    category: Mapped[Category] = relationship()
    def to_dict(self):
        return {"id": self.id, "name": self.name, "price_cents": self.price_cents, "category": self.category.name}
~~~

- [[ForeignKey("category.id")]]: الجدول.العمود.
- [[category: Mapped[Category] = relationship()]]: مش عمود. attribute بيجيب القسم اللي [[category_id]] بيشاور عليه: [[p.category.name]]. ولو عايز العكس ([[c.products]]) بتضيف relationship في [[Category]] والاتنين بـ [[back_populates]] بيشاوروا على بعض.
- [[to_dict]]: دالة بتاعتنا للـ JSON (Flask مفيهوش serializers).

## ٣. الجداول والداتا

~~~python
app = create_app()
with app.app_context():
    db.drop_all()
    db.create_all()
    c = Category(name="Books")
    db.session.add(c)
    db.session.add(Product(name="Clean Code", price_cents=45000, category=c))
    db.session.commit()
~~~

- [[app.app_context()]]: [[db]] محتاج يعرف أنهي تطبيق (وأنهي URI). جوه الـ requests ده بيحصل لوحده.
- [[drop_all]] و [[create_all]]: امسح واعمل كل الجداول من الـ models. للتجربة بس.
- [[category=c]]: بتدّي الـ object نفسه، و SQLAlchemy بيحط [[category_id]] بعد الـ INSERT.

السكربت الكامل حط قسمين و ٧ منتجات وطبع [[7]]، والملف اتعمل في [[instance/shop.db]] مش جنب الكود.

---

## ٤. الـ queries في الـ views

| الكود | بيعمل إيه |
|---|---|
| [[db.get_or_404(Product, 5)]] | بالـ primary key أو 404 |
| [[db.session.execute(db.select(Category).filter_by(name="Books")).scalar_one_or_none()]] | صف أو [[None]] |
| [[db.paginate(stmt, page=2, per_page=3)]] | صفحة + [[total]] و [[has_next]] و [[next_num]] |
| [[db.select(Product).options(joinedload(Product.category))]] | المنتجات وأقسامها في JOIN |

### N+1

عدّيت الـ queries بـ [[event.listen(db.engine, "before_cursor_execute", ...)]]. مع [[joinedload]]: صفحة المنتجات = [[2]] queries (العدّ + SELECT فيه [[LEFT OUTER JOIN category]]). من غيره كل قسم مختلف في الصفحة بيعمل [[SELECT ... FROM category WHERE category.id = ?]] لوحده. (SQLAlchemy مبيعيدش query لقسم جابه قبل كده في نفس الـ session، فالعدد بيزيد بعدد الأقسام المختلفة.)

---

## ٥. Flask-Migrate

~~~python
from flask_migrate import Migrate
Migrate(app, db)
~~~

في الـ factory بعد [[db.init_app(app)]]. وبعدين:

~~~bash
flask --app shop db init
flask --app shop db migrate -m "products"
flask --app shop db upgrade
~~~

~~~text الناتج (مختصر)
Generating /tmp/flm/migrations/env.py ...  done
INFO  [alembic.autogenerate.compare.tables] Detected added table 'category'
INFO  [alembic.autogenerate.compare.tables] Detected added table 'product'
Generating /tmp/flm/migrations/versions/896828a9a2cf_products.py ...  done
INFO  [alembic.runtime.migration] Running upgrade  -> 896828a9a2cf, products
~~~

- [[db init]]: مرة واحدة، بيعمل فولدر [[migrations/]] (بيتعمله commit).
- [[db migrate]]: Alembic بيقارن الـ models بالقاعدة ويكتب migration.
- [[db upgrade]]: طبّق. و [[flask db current]] طبع [[896828a9a2cf (head)]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الـ extension | [[db = SQLAlchemy(model_class=Base)]] + [[db.init_app(app)]] |
| model | [[class X(db.Model)]] و [[Mapped]] و [[mapped_column]] |
| صف أو 404 | [[db.get_or_404]] |
| صفحات | [[db.paginate(stmt, ...)]] |
| علاقة من غير N+1 | [[.options(joinedload(...))]] |
| بره طلب | [[with app.app_context():]] |
| تغيير الجداول | Flask-Migrate: [[flask db migrate]] ثم [[upgrade]] |`,
          example: R`# shop/extensions.py:
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)
# shop/models.py:
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .extensions import db
class Category(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
class Product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    price_cents: Mapped[int]
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))
    category: Mapped[Category] = relationship()
    def to_dict(self):
        return {"id": self.id, "name": self.name, "price_cents": self.price_cents, "category": self.category.name}
# seed.py:
from shop import create_app
from shop.extensions import db
from shop.models import Category, Product
app = create_app()
with app.app_context():
    db.create_all()
    c = Category(name="Books")
    db.session.add(c)
    db.session.add(Product(name="Clean Code", price_cents=45000, category=c))
    db.session.commit()`,
          flag: "script",
          lines: [
            R`[[SQLAlchemy]] من Flask-SQLAlchemy: الـ extension اللي بيربط SQLAlchemy بـ Flask (engine من الإعدادات، و session لكل طلب بتتقفل في آخره).`,
            R`[[DeclarativeBase]] أساس الـ models في SQLAlchemy 2. ده الأسلوب الجديد اللي بيفهم [[Mapped[...]]]، والقديم [[declarative_base()]] لسه شغال بس legacy.`,
            R`class أساس بتاعنا. بنعمله لوحدنا عشان لو احتجنا بعدين نضيف حاجة لكل الـ models (naming convention للـ constraints مثلًا) يبقى في مكان واحد.`,
            R`[[pass]] لأن مفيش حاجة زيادة دلوقتي. الـ class لازم يبقى ليه جسم، و [[pass]] جسم فاضي.`,
            R`[[db]] بيتعمل **مرة** ومن غير تطبيق، و [[model_class=Base]] بيخلّي [[db.Model]] يورث من [[Base]]. الربط بالتطبيق بيحصل بعدين بـ [[db.init_app(app)]] في الـ factory.`,
            R`[[ForeignKey]] عشان عمود [[category_id]] يشاور على [[category.id]]، والقاعدة ترفض قسم مش موجود.`,
            R`[[Mapped]] و [[mapped_column]] لتعريف الأعمدة بالأنواع، و [[relationship]] للعلاقة كـ object.`,
            R`[[db]] من [[extensions.py]]، مش من [[shop]] نفسه، عشان الـ models ميعملوش import للـ factory (circular import).`,
            R`[[db.Model]] بيدّي اسم الجدول لوحده من اسم الكلاس: [[Category]] بقى [[category]] (و [[ProductImage]] كان هيبقى [[product_image]]).`,
            R`[[Mapped[int]]] و [[primary_key=True]]: عمود int و primary key، و SQLite و Postgres بيدّوه رقم لوحده مع كل INSERT.`,
            R`[[Mapped[str]]] = نص مش null (لأن النوع مش [[Optional]])، و [[unique=True]] = القاعدة ترفض قسمين بنفس الاسم بـ [[IntegrityError]].`,
            R`كلاس [[Product]] بيعمل جدول اسمه [[product]] لوحده من اسم الكلاس.`,
            R`نفس شكل الـ primary key: رقم بيتولّد لوحده مع كل INSERT.`,
            R`[[name: Mapped[str]]] من غير [[mapped_column]]: لما مفيش إعدادات زيادة، النوع لوحده كفاية. VARCHAR مش null.`,
            R`السعر بالقروش int عشان مفيش أخطاء تقريب الـ float في الفلوس.`,
            R`عمود [[category_id]] int بيشاور على [[category.id]] (اسم الجدول.العمود، مش اسم الكلاس).`,
            R`مش عمود: [[relationship()]] بيخلّي [[p.category]] يرجّع object القسم. افتراضيًا lazy: أول مرة تقراه بيعمل query، وده مصدر N+1 في الـ loops لو مفيش [[joinedload]].`,
            R`[[to_dict]] دالة بتاعتنا عشان الـ JSON، لأن Flask مفيهوش serializers زي DRF ولا response models زي FastAPI.`,
            R`بيرجّع الحقول واسم القسم. [[self.category.name]] هنا بيعمل query لو القسم مش محمّل، فالـ list لازم تتجاب بـ [[joinedload]].`,
            R`السكربت بياخد الـ factory عشان يعمل تطبيق بنفس إعدادات التشغيل.`,
            R`[[db]] نفسه عشان [[create_all]] و [[session]].`,
            R`الـ models، ولازم يتعملهم import قبل [[create_all]]: [[create_all]] بيعمل جداول الـ models اللي Python شافها بس.`,
            R`تطبيق بالإعدادات العادية ([[sqlite:///shop.db]])، فالملف هيتعمل في [[instance/shop.db]] مش جنب السكربت.`,
            R`[[app.app_context()]]: [[db]] لازم يعرف أنهي تطبيق (وأنهي URI). جوه الطلبات ده بيحصل لوحده، وبرّه من غيره: [[RuntimeError: Working outside of application context]].`,
            R`[[create_all]] بيعمل الجداول اللي مش موجودة بس، ومبيعدّلش جدول موجود (لو زوّدت عمود مش هيضيفه). للتجربة، والإنتاج Flask-Migrate.`,
            R`قسم جديد في الذاكرة، لسه مش في القاعدة.`,
            R`[[add]] بيضيفه للـ session، فهيتعمل INSERT مع الـ commit.`,
            R`منتج في القسم ده. [[category=c]] الـ object نفسه، و SQLAlchemy بيعمل INSERT للقسم الأول وبيحط الـ id بتاعه في [[category_id]].`,
            R`[[commit]] بيبعت الـ INSERTين في transaction واحدة. لو حاجة فشلت محدش فيهم بيتحفظ. ولو شغّلت السكربت مرتين: [[IntegrityError]] على [[UNIQUE constraint failed: category.name]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** شغّلت [[seed.py]] مرتين ورا بعض من غير [[drop_all]]. هيحصل إيه في التانية؟ وبعدين شغّلها وانسخ آخر سطر في الخطأ، وصلّح السكربت عشان يتشغّل كذا مرة.`, done: R`التانية بتقع بـ [[IntegrityError]] فيها [[UNIQUE constraint failed: category.name]]، وبعد التصليح (تدوّر على القسم الأول بـ [[scalar_one_or_none]]) السكربت بيتشغّل ٣ مرات وعدد الأقسام فاضل ١.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سكربت برّه Flask بيعمل [[from shop.extensions import db]] و [[db.session.execute(db.select(Product)).scalars().all()]] على طول. انسخ الخطأ وصلّحه.`, done: R`قبل: [[RuntimeError: Working outside of application context]]. بعد: [[app = create_app()]] و [[with app.app_context():]] حوالين الكود، والسكربت بيطبع المنتجات.` },
            { lvl: 'تطبيق', t: R`**ابني:** ضيف [[c.products]] بـ [[relationship(back_populates="category")]] في [[Category]] و [[back_populates="products"]] في [[Product]]، و route [[/categories/<id>]] بيرجّع القسم ومنتجاته بـ [[selectinload]].`, done: R`الـ route بيرجّع القسم واللستة، وعدد الـ queries للطلب ده ٢ بالظبط (القسم + منتجاته كلهم في [[IN]] واحد)، مهما كان عدد المنتجات.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** ضيف [[stock: Mapped[int] = mapped_column(default=0)]] على جدول فيه صفوف، واعمل [[flask db migrate]] و [[upgrade]]. اقرا الخطأ، وصلّحه بـ [[server_default]].`, done: R`قبل: الـ upgrade وقع بـ [[Cannot add a NOT NULL column with default value NULL]] على SQLite، وبعد [[server_default="0"]] وإعادة الـ migrate الملف فيه [[server_default]] والـ upgrade عدّى والصفوف القديمة [[stock]] بتاعها 0.` },
            { lvl: 'تحدي', t: R`**قيس:** route بيرجّع ٥٠ منتج في ٥٠ قسم ومعاهم [[p.category.name]]. عدّ الـ queries بـ [[event.listen(db.engine, "before_cursor_execute", ...)]] مرة من غير options، ومرة بـ [[joinedload]]، ومرة بـ [[selectinload]].`, done: R`عندك ٣ أرقام (حوالي ٥١، و ١، و ٢)، وكاتب إمتى تختار [[selectinload]] بدل [[joinedload]] (علاقة one-to-many كبيرة بتكرر صفوف الأب في الـ JOIN).` },
          ],
          try: R`اعمل الـ models والسكربت، وشغّله، ودوّر على ملف القاعدة. وبعدين من [[flask --app shop shell]] هات منتجات قسم Books مترتبة بالسعر. وأخيرًا ضيف Flask-Migrate، وزوّد عمود [[stock: Mapped[int] = mapped_column(default=0)]]، واعمل [[flask db migrate]] واقرا الملف قبل [[upgrade]].`,
          solCode: R`from shop.models import Category, Product
from shop.extensions import db
books = db.session.execute(db.select(Category).filter_by(name="Books")).scalar_one()
stmt = db.select(Product).where(Product.category == books).order_by(Product.price_cents)
print([(p.name, p.price_cents) for p in db.session.execute(stmt).scalars()])`,
          sol: R`الملف في [[instance/shop.db]] (مش جنب [[seed.py]]). وفي [[flask shell]] الـ app context جاهز، فالكود ده بيطبع [[[('SQL Basics', 18000), ('Python Tricks', 30000), ('Clean Code', 45000)]]] على داتا السكربت الكامل. و [[Product.category == books]] بيتحول [[WHERE :param_1 = product.category_id]] (الـ id بتاع القسم بيتبعت parameter).

و [[flask db migrate]] بعد العمود الجديد بيطبع [[Detected added column 'product.stock']] ويكتب migration فيه [[batch_op.add_column(sa.Column('stock', sa.Integer(), nullable=False))]]. خد بالك: [[default=0]] ده default في Python بس، مش في القاعدة. على جدول فيه صفوف، [[upgrade]] وقع على SQLite بـ [[Cannot add a NOT NULL column with default value NULL]]، وعلى Postgres 16 بـ [[NotNullViolation: column "stock" of relation "product" contains null values]]. الحل [[server_default="0"]] في الـ model (وتعيد الـ migrate) أو في الـ migration قبل ما تطبّقه.`
        },
        {
          cmd: "اختبار Flask بـ pytest",
          title: "تختبر تطبيق Flask: fixtures بتعمل تطبيق وقاعدة جديدة لكل اختبار، و test_client و test_cli_runner",
          learn: R`تكتب [[conftest.py]] فيه [[app]] و [[client]] و [[runner]]، وتختبر الـ routes وأوامر [[flask]] وقاعدة البيانات من غير سيرفر ومن غير ما الاختبارات تأثّر على بعض.`,
          out: R`اختبارات بتعدّي مرتين ورا بعض، كل واحد على قاعدة في الذاكرة جديدة، وبتقرا رسالة الفشل وتعرف منها المشكلة.`,
          use: {
            prog: R`الـ app factory معمول عشان اللحظة دي: كل اختبار بينادي [[create_app(test_config)]] وياخد تطبيق بقاعدته، فمفيش اختبار بيوسّخ التاني.`,
            work: R`أول حاجة في أي PR على مشروع Flask: الاختبارات بتعدّي في الـ CI؟ ولما حد يقول «الـ 201 بقت 200»، اختبار سطرين هو اللي بيمسكها قبل العميل.`,
          },
          desc: R`Flask بيدّيك [[app.test_client()]] (بيبعت طلبات للتطبيق في نفس الـ process من غير سيرفر) و [[app.test_cli_runner()]] (بيشغّل أوامر [[flask]] بتاعتك)، و pytest بيدّيك الـ fixtures. فـ [[conftest.py]] فيه ٣ fixtures: [[app]] بيعمل تطبيق بـ [[TESTING]] و SQLite في الذاكرة ويعمل الجداول، و [[client]] و [[runner]] مبنيين عليه.

والقاعدة: كل اختبار ياخد تطبيق جديد وقاعدة جديدة. لو الاختبارات شغالة على ملف قاعدة مشترك، الاختبار بيعدّي أول مرة ويقع التانية (اتجرّب تحت). والاختبار في Django بـ pytest-django (درس «pytest-django»)، و pytest نفسه في تاب Python.`,
          example: R`# tests/conftest.py:
import pytest
from shop import create_app
from shop.extensions import db
from shop.models import Category
@pytest.fixture
def app():
    app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})
    with app.app_context():
        db.create_all()
        db.session.add(Category(name="Cables"))
        db.session.commit()
    yield app
@pytest.fixture
def client(app):
    return app.test_client()
@pytest.fixture
def runner(app):
    return app.test_cli_runner()
# tests/test_products.py:
import pytest
from shop.extensions import db
from shop.models import Product
def test_create_returns_201_and_location(client, app):
    r = client.post("/products/", json={"name": "USB-C 1m", "price_cents": 15000, "category": "Cables"})
    assert r.status_code == 201
    assert r.headers["Location"] == "/products/1"
    with app.app_context():
        assert db.session.get(Product, 1).name == "USB-C 1m"
@pytest.mark.parametrize("body", [{"name": "", "price_cents": 500, "category": "Cables"}, {"name": "x", "price_cents": "500", "category": "Cables"}, {"name": "x", "price_cents": 50, "category": "Cables"}])
def test_create_rejects_bad_body(client, body):
    r = client.post("/products/", json=body)
    assert r.status_code == 400
    assert r.json["error"] == "Bad Request"
def test_missing_product_is_json_404(client):
    r = client.get("/products/999")
    assert r.status_code == 404
    assert r.is_json
def test_seed_command(runner, app):
    result = runner.invoke(args=["seed", "--count", "2"])
    assert "seeded 2 products" in result.output
    with app.app_context():
        assert db.session.scalar(db.select(db.func.count(Product.id))) == 2
# في الترمنال:
# pytest -q
# pytest -v -k create`,
          try: R`حط الملفين في مشروع الـ shop (مع أمر [[seed]] من الشرح)، وشغّل [[pytest -q]] مرتين. وبعدين غيّر [[201]] لـ [[200]] في [[create]] واقرا رسالة الفشل. وأخيرًا غيّر الـ URI في الـ fixture لـ [[sqlite:///test.db]] وشغّل مرتين وشوف إيه اللي يقع.`,
          flag: "script",
          deep: {
            why: R`Flask مش بيفحص المدخلات لوحده، فكل فحص بإيدك محتاج اختبار يثبت إنه شغال. ومن غير اختبارات، أي تعديل صغير (status، أو اسم حقل، أو error handler) بيتكسر في صمت، والفرونت هو اللي بيكتشفه.`,
            how: R`**الـ fixtures:** pytest بيشوف اسم الباراميتر في دالة الاختبار ([[client]]) ويدوّر على fixture بنفس الاسم في [[conftest.py]] (الملف ده بيتقري لوحده من غير import). و [[client]] نفسها طالبة [[app]]، فـ pytest بيعمل [[app]] الأول. والـ scope الافتراضي [[function]]: fixture جديدة لكل اختبار، وده اللي بيدّي كل اختبار قاعدة جديدة.

**[[yield app]]:** اللي قبل [[yield]] setup، واللي بعده teardown (هنا مفيش حاجة نقفلها، لأن القاعدة في الذاكرة بتموت مع الـ engine).

**[[sqlite:///:memory:]]:** قاعدة في الرام. Flask-SQLAlchemy بيستخدم connection pool ثابت (StaticPool) معاها، فكل الـ sessions في نفس التطبيق بيشوفوا نفس القاعدة، وتطبيق جديد = قاعدة جديدة فاضية. اتأكدنا: [[test_create]] بيلاقي [[Location: /products/1]] مهما اتشغّل كام مرة.

**[[TESTING=True]]:** الـ exceptions بتطلع في الاختبار بدل ما تتحوّل 500 ساكتة، فتشوف الـ traceback الحقيقي.

**[[app_context()]] في الاختبار:** [[db.session]] محتاج تطبيق. جوه [[client.get]] Flask بيعمله لوحده، لكن السطر اللي بيتأكد من القاعدة بنفسه محتاج [[with app.app_context():]]، وإلا [[RuntimeError: Working outside of application context]] (اتجرّب).

**[[r.json]] و [[r.is_json]]:** الرد في الـ test client فيه [[status_code]] و [[headers]] و [[json]] (الـ body كـ dict أو [[None]]) و [[is_json]] (الـ Content-Type JSON؟) و [[text]] و [[data]] (bytes).

**[[test_cli_runner()]]:** بيشغّل أمر Click زي [[flask seed --count 2]] في نفس الـ process، و [[result.output]] هو اللي اتطبع، و [[result.exit_code]] كود الخروج.

ولو المشروع على Postgres في الإنتاج، فيه حاجات SQLite مش هيمسكها (أنواع وقيود مختلفة): شغّل نفس الاختبارات على Postgres في الـ CI (container) كمان.`,
            when: R`أي route فيه فحص، وأي error handler، وأي أمر CLI، وأي query مهمة. والأولوية: الحالات الطرفية (body فاضي، نوع غلط، مش موجود، مكرر) قبل الحالة السعيدة.`,
            mistakes: R`[[app]] واحد على مستوى الـ module لكل الاختبارات بقاعدة ملف (الاختبار التاني بيشوف داتا الأول، والتشغيل التاني بيقع). ونسيان [[app_context]] لما تقرا من القاعدة في الاختبار. واختبار الحالة السعيدة بس. و [[assert r.status_code == 201]] من غير ما تتأكد إن الصف اتحفظ فعلًا (ممكن تكون نسيت [[commit]]). واختبارات بتعتمد على ترتيبها.`
          },
          teach: R`## المثال بيعمل إيه؟

ملف [[conftest.py]] فيه ٣ fixtures، وملف اختبارات فيه ٤ دوال (٦ اختبارات بعد الـ parametrize) على الـ shop بتاع الوحدة: الإنشاء، ورفض body غلط بـ ٣ أشكال، والـ 404 JSON، وأمر [[flask seed]].

اتشغّل فعلًا بـ pytest 9.2.0 و Flask 3.1.3 و Flask-SQLAlchemy 3.1.1 على ويندوز (Python 3.14.3)، على نفس [[create_app]] و [[products.py]] و [[models.py]] اللي في الدروس اللي فاتت، ومعاهم الأمر ده جوه [[create_app]]:

~~~python
@app.cli.command("seed")
@click.option("--count", default=3, type=int)
def seed(count):
    from .models import Category, Product
    db.create_all()
    c = db.session.execute(db.select(Category).filter_by(name="Books")).scalar_one_or_none() or Category(name="Books")
    for i in range(count):
        db.session.add(Product(name=f"Book {i+1}", price_cents=10000 + i, category=c))
    db.session.commit()
    click.echo(f"seeded {count} products")
~~~

- [[@app.cli.command("seed")]]: أمر جديد [[flask --app shop seed]]. Flask بيستخدم مكتبة Click للأوامر.
- [[@click.option("--count", default=3, type=int)]]: خيار [[--count]] رقم، والافتراضي ٣.
- [[... or Category(name="Books")]]: لو القسم موجود خده، وإلا اعمل جديد، فالأمر ينفع يتشغّل أكتر من مرة من غير [[IntegrityError]].
- [[click.echo]]: زي [[print]] بس Click بيعرف يلقطه في الاختبار.

---

## ١. [[conftest.py]]: الـ fixtures

~~~python
@pytest.fixture
def app():
    app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})
    with app.app_context():
        db.create_all()
        db.session.add(Category(name="Cables"))
        db.session.commit()
    yield app
~~~

- [[@pytest.fixture]]: الدالة دي مش اختبار، دي «مكوّن» أي اختبار يطلبه بالاسم. pytest بينفّذها **لكل اختبار** لوحده.
- [[create_app({...})]]: نفس الـ factory بتاع التشغيل، بس الـ [[test_config]] بيكتب فوق كل حاجة: [[TESTING]] و قاعدة في الذاكرة.
- [[with app.app_context():]]: عشان [[db]] يعرف التطبيق. [[create_all]] بيعمل الجداول في القاعدة الجديدة، وبنضيف قسم [[Cables]] لأن الإنشاء محتاج قسم موجود.
- [[yield app]]: سلّم التطبيق للاختبار. ولو فيه حاجة تتقفل (ملف مؤقت، اتصال)، مكانها بعد السطر ده.

~~~python
@pytest.fixture
def client(app):
    return app.test_client()
@pytest.fixture
def runner(app):
    return app.test_cli_runner()
~~~

[[client]] و [[runner]] طالبين [[app]]، فـ pytest بيعمل [[app]] الأول ويدّيهولهم. ولو اختبار طلب [[client]] و [[app]] الاتنين (زي [[test_create]])، بياخدوا **نفس** الـ [[app]] (fixture بتتعمل مرة واحدة لكل اختبار).

---

## ٢. اختبار الإنشاء

~~~python
def test_create_returns_201_and_location(client, app):
    r = client.post("/products/", json={"name": "USB-C 1m", "price_cents": 15000, "category": "Cables"})
    assert r.status_code == 201
    assert r.headers["Location"] == "/products/1"
    with app.app_context():
        assert db.session.get(Product, 1).name == "USB-C 1m"
~~~

- [[client.post(url, json=...)]]: [[json=]] بيحوّل الـ dict لـ JSON ويحط [[Content-Type: application/json]] لوحده. (و [[data=]] بيبعت فورم.)
- [[r.status_code]] و [[r.headers["Location"]]]: الرد زي ما العميل هيشوفه.
- السطر الأخير بيتأكد من **القاعدة** نفسها، مش من الرد بس: لو حد شال [[commit()]] الرد هيفضل 201 والاختبار ده بس اللي هيقع.

---

## ٣. [[parametrize]]: اختبار واحد، ٣ حالات

~~~python
@pytest.mark.parametrize("body", [{...name فاضي...}, {...price نص...}, {...price 50...}])
def test_create_rejects_bad_body(client, body):
~~~

pytest بيشغّل الدالة ٣ مرات، كل مرة [[body]] واحد من اللستة، وكل مرة بـ fixtures جديدة. وفي الناتج كل حالة ليها اسم:

~~~text الناتج: pytest -v
tests/test_products.py::test_create_returns_201_and_location PASSED      [ 16%]
tests/test_products.py::test_create_rejects_bad_body[body0] PASSED       [ 33%]
tests/test_products.py::test_create_rejects_bad_body[body1] PASSED       [ 50%]
tests/test_products.py::test_create_rejects_bad_body[body2] PASSED       [ 66%]
tests/test_products.py::test_missing_product_is_json_404 PASSED          [ 83%]
tests/test_products.py::test_seed_command PASSED                         [100%]
~~~

[[-v]] (verbose) بيطبع كل اختبار باسمه بدل نقطة. ولو عايز أسامي أوضح من [[body0]]: [[ids=["empty-name", "price-str", "price-low"]]] في الـ parametrize.

---

## ٤. الـ 404 والأمر

~~~python
def test_missing_product_is_json_404(client):
    r = client.get("/products/999")
    assert r.status_code == 404
    assert r.is_json
~~~

[[r.is_json]] بيتأكد إن الـ error handler شغال. لو حد شال [[@bp.errorhandler(404)]]، الـ status هيفضل 404 بس الرد HTML، والاختبار ده بيقع.

~~~python
def test_seed_command(runner, app):
    result = runner.invoke(args=["seed", "--count", "2"])
    assert "seeded 2 products" in result.output
~~~

[[runner.invoke(args=[...])]] زي ما تكتب [[flask seed --count 2]] في الترمنال، بس في نفس الـ process وعلى تطبيق الاختبار. و [[result.output]] كل اللي اتطبع.

~~~text الناتج: pytest -q (مرتين ورا بعض)
......                                                                   [100%]
6 passed in 0.07s
~~~

---

## ٥. لما اختبار يقع: اقرا الرسالة

غيّرنا [[201]] لـ [[200]] في [[create]]:

~~~text الناتج
E       assert 200 == 201
E        +  where 200 = <WrapperTestResponse streamed [200 OK]>.status_code
FAILED tests/test_products.py::test_create_returns_201_and_location - assert ...
1 failed, 5 passed in 0.21s
~~~

pytest بيعيد كتابة الـ [[assert]] عشان يوريك القيمتين: الحقيقية ([[200]]) والمتوقعة ([[201]])، وجات منين ([[.status_code]]). من غير ما تكتب رسالة بنفسك.

---

## ٦. الغلطتين اللي بيوقّعوا الاختبارات (اتجرّبوا)

### قاعدة ملف مشتركة

ملف اختبار عامل [[app]] واحد على مستوى الـ module بـ [[sqlite:///test.db]]:

~~~text الناتج: التشغيل التاني
E       AssertionError: assert '/products/2' == '/products/1'
~~~

أول تشغيل عدّى. التاني وقع: المنتج الأول من التشغيل اللي فات لسه في [[instance/test.db]]، فالجديد خد id رقم 2. ده اسمه test pollution، والحل الـ fixture بقاعدة في الذاكرة لكل اختبار.

### [[db]] من غير [[app_context]]

~~~text الناتج
E           RuntimeError: Working outside of application context.
~~~

سطر [[db.session.get(Product, 1)]] في اختبار من غير [[with app.app_context():]]. جوه [[client.post]] Flask بيعمل الـ context لوحده، لكن كودك انت في الاختبار لأ.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[create_app(test_config)]] في fixture | تطبيق وقاعدة جديدة لكل اختبار، فمفيش اختبار بيأثّر على التاني |
| [[sqlite:///:memory:]] | سريعة ومبتسيبش ملفات، وبتموت مع الاختبار |
| [[client.post(url, json=...)]] | طلب حقيقي للتطبيق من غير سيرفر |
| [[r.status_code]] و [[r.json]] و [[r.is_json]] | تتأكد من الرد زي ما العميل هيشوفه |
| [[with app.app_context():]] في الاختبار | لو هتقرا من القاعدة بنفسك |
| [[runner.invoke(args=[...])]] | تختبر أوامر [[flask]] بتاعتك |
| [[@pytest.mark.parametrize]] | حالات كتير بنفس الكود، كل واحدة باسمها |`,
          lines: [
            R`[[pytest]] عشان [[@pytest.fixture]]. الملف ده اسمه [[conftest.py]] بالظبط، و pytest بيقراه لوحده لأي اختبار في نفس الفولدر أو تحته، من غير import.`,
            R`الـ factory نفسه بتاع التشغيل. ده كل فايدة الـ factory: الاختبار بياخد تطبيق بإعدادات تانية من غير ما يلمس الكود.`,
            R`[[db]] عشان نعمل الجداول ونضيف داتا البداية في كل قاعدة جديدة.`,
            R`[[Category]] عشان نضيف قسم، لأن الإنشاء بيرفض قسم مش موجود.`,
            R`[[@pytest.fixture]]: الدالة اللي تحت مش اختبار، دي حاجة أي اختبار يطلبها باسمها ([[app]]) فـ pytest يعملها ويدّيهاله. الـ scope الافتراضي [[function]] = جديدة لكل اختبار.`,
            R`الاسم [[app]] هو اللي الاختبارات هتكتبه كباراميتر.`,
            R`تطبيق جديد بـ [[TESTING=True]] (الـ exceptions تطلع في الاختبار بدل 500 ساكتة) وقاعدة في الذاكرة. [[test_config]] بيكتب فوق [[FLASK_*]] كمان، فالاختبار ميلمسش قاعدة التطوير أبدًا.`,
            R`[[db]] محتاج تطبيق عشان يعرف أنهي قاعدة. برّه الطلبات لازم [[app_context]] صريح.`,
            R`[[create_all]] بيعمل الجداول في القاعدة الجديدة الفاضية. هنا مقبول (مش زي الإنتاج) لأن القاعدة بتتعمل من الصفر كل مرة.`,
            R`داتا البداية اللي كل اختبار محتاجها: قسم [[Cables]].`,
            R`[[commit]] عشان الداتا تبقى في القاعدة فعلًا ويشوفها الطلب في الاختبار (session تانية).`,
            R`[[yield app]]: سلّم التطبيق للاختبار. أي تنضيف (ملف مؤقت، اتصال) مكانه بعد السطر ده، و pytest بينفّذه حتى لو الاختبار وقع.`,
            R`fixture تانية بنفس الـ decorator، وبتتعمل جديدة لكل اختبار زي [[app]].`,
            R`[[client(app)]]: طالبة [[app]]، فـ pytest بيعمل [[app]] الأول. ولو الاختبار طلب الاتنين بياخدوا نفس الـ [[app]].`,
            R`[[test_client()]] بيبعت طلبات للتطبيق في نفس الـ process من غير سيرفر ولا بورت، فالاختبار بياخد ملّي ثواني.`,
            R`fixture تالتة، للاختبارات اللي بتشغّل أوامر [[flask]] بتاعتك.`,
            R`[[runner(app)]] مبنية على نفس [[app]] برضه.`,
            R`[[test_cli_runner()]] بيشغّل أوامر Click بتاعة التطبيق ([[flask seed]]) ويلقط اللي اتطبع.`,
            R`ملف الاختبارات بيعمل import لـ [[pytest]] لوحده عشان [[@pytest.mark.parametrize]]. الـ fixtures مش محتاجة import: pytest بيجيبها من [[conftest.py]].`,
            R`[[db]] عشان نتأكد من القاعدة نفسها، مش من الرد بس.`,
            R`الموديل [[Product]] عشان نسأل القاعدة عن المنتج اللي اتعمل ونعدّ المنتجات.`,
            R`اسم الاختبار بيبدأ بـ [[test_]] (pytest بيلاقيه كده)، وبيقول بيختبر إيه، فلو وقع تعرف من الاسم. والباراميترين fixtures.`,
            R`[[client.post(url, json=...)]]: [[json=]] بيحوّل الـ dict لـ JSON ويحط الـ Content-Type، زي ما الفرونت بيبعت.`,
            R`[[201]] مش 200: الإنشاء ليه status خاص. اتجرّب: لما غيّرناه في الكود لـ 200 الاختبار وقع بـ [[assert 200 == 201]].`,
            R`header [[Location]] فيه لينك المنتج. و [[/products/1]] بالظبط لأن القاعدة جديدة كل مرة، فده بيثبت إن الاختبارات معزولة.`,
            R`[[app_context]] عشان نقرا من القاعدة بنفسنا. من غيره: [[RuntimeError: Working outside of application context]] (اتجرّب).`,
            R`[[db.session.get(Product, 1)]] بالـ primary key: بيتأكد إن الصف اتحفظ فعلًا. لو [[commit()]] اتشال من الـ route، الرد هيفضل 201 والسطر ده بس اللي هيمسكها.`,
            R`[[parametrize("body", [...])]]: نفس الاختبار ٣ مرات، كل مرة بـ [[body]] مختلف: اسم فاضي، وسعر نص [["500"]]، وسعر أقل من ١٠٠. في الناتج بيبانوا [[body0]] و [[body1]] و [[body2]].`,
            R`[[body]] جاي من الـ parametrize، و [[client]] من الـ fixture (جديد لكل حالة من التلاتة).`,
            R`نفس طلب الإنشاء، بس بالـ body الغلط اللي جه من الـ parametrize.`,
            R`كل الحالات التلاتة لازم ترجع 400، مش 500 (لو الفحص ناقص، [[isinstance]] أو [[strip]]، حالة منهم هتوصل للقاعدة).`,
            R`[[r.json]] الـ body كـ dict. و [[error == "Bad Request"]] بيثبت إن الـ handler بتاعنا هو اللي رد مش صفحة HTML.`,
            R`اختبار بيتأكد إن المنتج المش موجود بيرجّع 404 بشكل JSON.`,
            R`رقم 999 مش موجود أكيد، لأن القاعدة جديدة وفاضية من المنتجات.`,
            R`الـ status لازم يبقى 404، وده جاي من [[get_or_404]] جوه الـ route.`,
            R`[[is_json]] = الـ Content-Type JSON. لو حد شال الـ error handler، الـ status هيفضل 404 والاختبار ده بس اللي هيقع.`,
            R`اختبار الأمر: طالب [[runner]] و [[app]]، والاتنين نفس التطبيق.`,
            R`[[invoke(args=[...])]] زي [[flask seed --count 2]] في الترمنال، بس على تطبيق الاختبار وقاعدته.`,
            R`[[result.output]] كل اللي اتطبع بـ [[click.echo]]. و [[result.exit_code]] لو عايز تتأكد إنه 0.`,
            R`[[app_context]] تاني عشان نعدّ المنتجات في القاعدة بنفسنا.`,
            R`[[db.func.count]] = [[COUNT(product.id)]]، و [[scalar]] بيرجّع الرقم. ٢ بالظبط: القاعدة كانت فاضية من المنتجات قبل الأمر.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الـ ٣ fixtures وكل واحدة بترجّع إيه، وليه [[app]] بتتعمل لكل اختبار مش مرة واحدة لكل الملف.`, done: R`الـ ٣ صح ([[app]] و [[test_client()]] و [[test_cli_runner()]])، والسبب «كل اختبار قاعدة جديدة عشان ميأثّروش على بعض»، ومعاك مثال الـ [[/products/2]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** خلّيت الـ fixture [[@pytest.fixture(scope="module")]]، وضفت اختبار بيعمل منتج تاني وبعده [[test_create]]. هيحصل إيه؟ وبعدين جرّب.`, done: R`[[test_create]] بيقع بـ [[assert '/products/2' == '/products/1']] (أو حسب الترتيب)، لأن الـ app والقاعدة اتشاركوا في الملف كله. ورجّعت الـ scope زي ما كان.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبارات لصفحة المنتجات HTML: [[client.get("/products/?q=<b>")]] بيرجّع [[&lt;b&gt;]] في [[r.text]] ومفيهوش [[<b>]]، والصفحة الأولى فيها لينك Next لما المنتجات ٤ و [[per_page=3]].`, done: R`الاختبارين بيعدّوا، والتاني بيضيف ٤ منتجات في نفسه (مش في الـ fixture)، ولو شلت الـ escape بـ [[|safe]] الأول بيقع.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اختبار [[test_count]] بيعمل [[assert Product.query.count() == 0]] برّه أي context، و [[test_create]] بيبعت [[data={...}]] مش [[json=]] وبيستغرب الـ 400. صلّحهم.`, done: R`الأول بقى [[with app.app_context():]] و [[db.session.scalar(db.select(db.func.count(Product.id)))]]، والتاني [[json=]]، والاتنين بيعدّوا، وكاتب ليه [[data=]] رجّعت 400 (فورم، و [[silent=True]] رجّع [[None]]).` },
            { lvl: 'تحدي', t: R`**قيس:** ضيف [[pytest-cov]] وشغّل [[pytest --cov=shop --cov-report=term-missing]]، ولاقي السطور اللي مفيش اختبار بيعدّي عليها في [[products.py]]، واكتب اختبارات لحد ما التغطية ٩٠٪ أو أكتر.`, done: R`الرقم قبل وبعد مكتوب، وعمود [[Missing]] في [[products.py]] بقى فاضي أو فيه سطور شرحت ليه مش مهمة، والاختبارات الجديدة بتغطي حالة [[unknown category]] و [[?page=]] أكبر من الموجود.` },
          ],
          sol: R`[[pytest -q]] بيطبع [[6 passed]] (عندنا في 0.07 ثانية)، ومرتين ورا بعض نفس النتيجة لأن كل اختبار قاعدته في الذاكرة.

لما تغيّر [[201]] لـ [[200]]: [[1 failed, 5 passed]] والرسالة [[assert 200 == 201]] ومعاها [[where 200 = <WrapperTestResponse streamed [200 OK]>.status_code]]، يعني pytest قالك القيمة الحقيقية وجات منين.

ولما تخلّي الـ URI [[sqlite:///test.db]] (اتجرّب): أول تشغيل [[1 passed, 5 errors]]، والتاني [[6 errors]]. الـ errors كلها [[sqlalchemy.exc.IntegrityError]] **في الـ fixture نفسها** مش في الاختبارات: كل اختبار بيعمل [[create_app]] جديد، بس الملف [[instance/test.db]] واحد، فالـ fixture التانية بتحاول تضيف قسم [[Cables]] تاني والاسم [[unique]]. وفي pytest «error» يعني الـ setup وقع، و «failed» يعني الـ assert وقع. ارجع لـ [[:memory:]] وامسح الملف.`
        },
        {
          cmd: "Flask ولا FastAPI ولا Django",
          title: "تختار إيه لمشروع Python backend؟ مقارنة صريحة بنفس الـ endpoint",
          desc: R`الـ ٣ بيعملوا نفس الشغل الأساسي، والفرق في اللي بييجي معاك: Django فيه كل حاجة (ORM و admin و auth و migrations) وبتمشي على طريقته، و FastAPI مبني على الأنواع (فحص و OpenAPI تلقائي و async)، و Flask صغير وإنت بتختار كل مكتبة.

مفيش واحد «الأحسن». السؤال: المشروع محتاج إيه جاهز، والفريق يعرف إيه. المثال endpoint واحد بالـ ٣، والنتايج تحت حقيقية من التشغيل.`,
          deep: {
            why: R`الاختيار ده بيتاخد مرة في أول المشروع ومش سهل تغيّره. ولو اخترت framework صغير لمشروع محتاج admin و auth وصلاحيات، هتبني نص Django بإيدك. ولو اخترت Django لـ service صغيرة async بتكلّم APIs تانية، هتشيل حاجات مش محتاجها. وسؤال «ليه اخترت X» بييجي في الانترفيوهات.`,
            how: R`Flask و Django بيشتغلوا WSGI أساسًا (Django كمان ASGI و async views، بس أغلب الـ ORM لسه sync من جوه)، و FastAPI ASGI من الأول (Starlette)، فالـ async فيه طبيعي (درس «def ولا async def»).

الفحص: FastAPI من الـ type hints بـ Pydantic (رد 422 بتفاصيل)، و DRF بالـ serializers، و Flask بإيدك أو بمكتبة. والتوثيق: FastAPI بيطلّع [[/docs]] لوحده، و DRF محتاج [[drf-spectacular]]، و Flask محتاج extension.

القاعدة: Django عنده ORM و migrations جواه. FastAPI و Flask بيستخدموا SQLAlchemy و Alembic (أو أي حاجة). والـ admin والـ auth بالـ sessions والصلاحيات: Django بس جاهزين.

الحجم (من [[pip install --dry-run --report]] على Python 3.13): [[flask]] = ٧ حزم، و [[django]] = ٣، و [[djangorestframework]] = ٤ (معاها Django)، و [[fastapi]] لوحده = ١١، و [[fastapi[standard]]] = ٥٩ (uvicorn و httpx و CLI و telemetry...). الحجم مش مقياس جودة، بس بيقولك قد إيه بييجي جاهز.`,
            when: R`Django: منتج فيه يوزرز وصلاحيات ولوحة للفريق وداتا علاقية كتير (متجر، CMS، نظام داخلي)، أو فريق عايز طريقة واحدة لكل حاجة. FastAPI: API بس (لموبايل أو SPA أو services تانية)، فيه I/O كتير و async، ومحتاج OpenAPI دقيق، وخدمات ML. Flask: service صغيرة، أو موقع بسيط بـ templates، أو مشروع قديم موجود، أو لما عايز تتحكم في كل مكتبة. والمهم كمان: الفريق يعرف إيه، والمشروع الموجود مكتوب بإيه.`,
            mistakes: R`تختار على أساس benchmark «requests per second»: في أغلب التطبيقات القاعدة والشبكة هما البطء، مش الـ framework. وتختار Flask «عشان بسيط» وبعد شهر تكون كاتب auth و admin و migrations بإيدك. وتكتب [[async def]] في FastAPI وجواها مكتبة sync بتوقف الـ event loop. وتفتكر إن Django مينفعش للـ APIs (DRF و django-ninja موجودين). وتعيد كتابة مشروع شغال عشان framework «أحدث».`
          },
          teach: R`## المثال بيعمل إيه؟

نفس الـ endpoint بالـ ٣: [[GET /items/<id>]] يرجّع item من dict، و 404 لو مش موجود. اتشغّل فعلًا الـ ٣ مع بعض في نفس الـ container (python:3.13-slim): Flask 3.1.3 على 5001 بـ [[flask run]]، و FastAPI 0.162.0 على 5002 بـ uvicorn 0.54.0، و Django 6.1.2 على 5003 بـ [[runserver]] (ملف واحد بـ [[settings.configure]]، للمقارنة بس: المشروع الحقيقي بـ [[startproject]])، وطلبت كل واحد ٣ مرات بـ [[curl]].

---

## ١. Flask

~~~python
@app.get("/items/<int:item_id>")
def get_item(item_id):
    if item_id not in ITEMS:
        abort(404)
    return {"id": item_id, "name": ITEMS[item_id]}
~~~

الـ converter [[<int:...>]] في المسار، و [[abort(404)]]، و dict بيتحول JSON.

## ٢. FastAPI

~~~python
@app.get("/items/{item_id}")
async def get_item(item_id: int) -> dict:
    if item_id not in ITEMS:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": item_id, "name": ITEMS[item_id]}
~~~

النوع [[item_id: int]] هو الفحص والتحويل والتوثيق مع بعض، و [[HTTPException]] للـ 404.

## ٣. Django

~~~python
settings.configure(DEBUG=False, ROOT_URLCONF=__name__, ALLOWED_HOSTS=["*"], SECRET_KEY="dev-only")
def get_item(request, item_id):
    if item_id not in ITEMS:
        raise Http404("Item not found")
    return JsonResponse({"id": item_id, "name": ITEMS[item_id]})
urlpatterns = [path("items/<int:item_id>", get_item)]
~~~

- [[settings.configure(...)]]: إعدادات من غير [[settings.py]]. [[ROOT_URLCONF=__name__]] يعني الـ [[urlpatterns]] في الملف ده نفسه.
- [[raise Http404]] و [[JsonResponse]] و [[path("items/<int:item_id>")]] زي درس «views و urls».
- [[execute_from_command_line(sys.argv)]] تحت: عشان [[python django_app.py runserver 5003]] يشتغل زي [[manage.py]].

---

## ٤. النتايج

~~~text الناتج (مختصر)
=== Flask 5001
1   -> {"id":1,"name":"Clean Code"}  [200 application/json]
99  -> <!doctype html>...<title>404 Not Found</title>...  [404 text/html; charset=utf-8]
abc -> <!doctype html>...<title>404 Not Found</title>...  [404 text/html; charset=utf-8]
=== FastAPI 5002
1   -> {"id":1,"name":"Clean Code"}  [200 application/json]
99  -> {"detail":"Item not found"}  [404 application/json]
abc -> {"detail":[{"type":"int_parsing","loc":["path","item_id"],"msg":"Input should be a valid integer, unable to parse string as an integer","input":"abc"}]}  [422 application/json]
=== Django 5003
1   -> {"id": 1, "name": "Clean Code"}  [200 application/json]
99  -> <!doctype html>...<title>Not Found</title>...  [404 text/html; charset=utf-8]
abc -> <!doctype html>...<title>Not Found</title>...  [404 text/html; charset=utf-8]
~~~

| الحالة | Flask | FastAPI | Django |
|---|---|---|---|
| موجود | 200 JSON | 200 JSON | 200 JSON |
| مش موجود | 404 **HTML** | 404 JSON | 404 **HTML** |
| [[abc]] | 404 (المسار مطابقش) | **422** وفيه السبب بالظبط | 404 (المسار مطابقش) |

يعني FastAPI معمول للـ APIs من الأول: الأخطاء JSON ومفصّلة لوحدها. في Flask و Django لازم error handler (درس «Flask request و response») أو DRF عشان الأخطاء تبقى JSON. وفي Django كمان [[JsonResponse]] بيكتب [[{"id": 1, ...}]] بمسافات بعد [[:]] (الافتراضي بتاع [[json.dumps]])، و Flask و FastAPI من غيرها.

---

## ٥. الجدول الكبير

| | Django (+ DRF) | FastAPI | Flask |
|---|---|---|---|
| النوع | framework كامل | framework للـ APIs | micro framework |
| ORM و migrations | جواه | SQLAlchemy و Alembic | Flask-SQLAlchemy و Flask-Migrate |
| admin | جاهز | مفيش | مفيش (Flask-Admin منفصل) |
| auth و sessions و صلاحيات | جاهز | بإيدك (dependencies) | Flask-Login وغيره |
| فحص المدخلات | DRF serializers | Pydantic من الأنواع | بإيدك أو مكتبة |
| OpenAPI و [[/docs]] | drf-spectacular | لوحده | extension |
| async | views async، والـ ORM أغلبه sync | من الأول | views async، والسيرفر WSGI |
| templates HTML | Django templates | Jinja (اختياري) | Jinja |
| الحزم ([[pip --dry-run]]) | ٣ (+١ لـ DRF) | ١١ (أو ٥٩ بـ [[standard]]) | ٧ |
| دروسه هنا | قسم Django و DRF | أول API لحد الإنتاج | قسم Flask |

---

## الخلاصة

- محتاج admin و auth وصلاحيات وداتا علاقية كتير → **Django** (+ DRF للـ API).
- API بس، async، وعايز الأنواع تعمل الفحص والتوثيق → **FastAPI**.
- حاجة صغيرة أو موقع بسيط، أو عايز تختار كل قطعة → **Flask**.
- والأهم من الـ ٣: الفريق يعرف إيه، والمشروع الموجود مكتوب بإيه.`,
          example: R`# flask_app.py:
from flask import Flask, abort
app = Flask(__name__)
ITEMS = {1: "Clean Code", 2: "SQL Basics"}
@app.get("/items/<int:item_id>")
def get_item(item_id):
    if item_id not in ITEMS:
        abort(404)
    return {"id": item_id, "name": ITEMS[item_id]}
# fastapi_app.py:
from fastapi import FastAPI, HTTPException
app = FastAPI()
ITEMS = {1: "Clean Code", 2: "SQL Basics"}
@app.get("/items/{item_id}")
async def get_item(item_id: int) -> dict:
    if item_id not in ITEMS:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": item_id, "name": ITEMS[item_id]}
# django_app.py (ملف واحد للمقارنة بس):
import sys
from django.conf import settings
from django.http import Http404, JsonResponse
from django.urls import path
settings.configure(DEBUG=False, ROOT_URLCONF=__name__, ALLOWED_HOSTS=["*"], SECRET_KEY="dev-only")
ITEMS = {1: "Clean Code", 2: "SQL Basics"}
def get_item(request, item_id):
    if item_id not in ITEMS:
        raise Http404("Item not found")
    return JsonResponse({"id": item_id, "name": ITEMS[item_id]})
urlpatterns = [path("items/<int:item_id>", get_item)]
if __name__ == "__main__":
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
# في الترمنال:
# flask --app flask_app run --port 5001
# uvicorn fastapi_app:app --port 5002
# python django_app.py runserver 5003 --noreload`,
          flag: "script",
          lines: [
            R`Flask: [[Flask]] للتطبيق و [[abort]] عشان نوقّف برد 404. مفيش حاجة تانية محتاجينها لـ endpoint واحد.`,
            R`تطبيق في ملف واحد ([[app]] على مستوى الـ module)، كفاية للمقارنة. المشروع الحقيقي بـ [[create_app]] (أول درس في الوحدة).`,
            R`الداتا: dict المفتاح فيه رقم والقيمة اسم، بدل قاعدة بيانات، عشان المقارنة تبقى على الـ framework بس.`,
            R`[[<int:item_id>]] converter في المسار: يطابق رقم بس. فـ [[/items/abc]] مش هيطابق خالص والرد 404 (مش 422)، والدالة متتناديش.`,
            R`الدالة بتاخد [[item_id]] int جاهز من الـ converter، من غير type hints ولا فحص زيادة.`,
            R`مش موجود في الـ dict؟`,
            R`[[abort(404)]] بيرمي [[NotFound]] من Werkzeug، والرد صفحة **HTML** (اتجرّب: [[text/html]]) لأن مفيش error handler.`,
            R`dict، فـ Flask بيحوّله JSON بـ [[jsonify]] لوحده، ومن غير مسافات ([[{"id":1,"name":"Clean Code"}]]).`,
            R`FastAPI: [[FastAPI]] و [[HTTPException]] للـ 404.`,
            R`التطبيق. [[/docs]] و [[/openapi.json]] بيتعملوا لوحدهم من غير سطر زيادة.`,
            R`نفس الداتا بالظبط، عشان الفرق في الرد يبقى من الـ framework بس.`,
            R`[[{item_id}]] في المسار من غير نوع. النوع جاي من الـ signature تحت.`,
            R`[[item_id: int]] هو الفحص والتحويل والتوثيق مع بعض: [[abc]] بيرجّع **422** وفيه [[int_parsing]] و [[loc: ["path","item_id"]]]. و [[-> dict]] بيقول نوع الرد (ومش بيفلتر حاجة لأنه dict).`,
            R`نفس الفحص في FastAPI: [[not in]] بيدوّر في مفاتيح الـ dict بـ O(1). لو الرقم مش مفتاح...`,
            R`[[HTTPException(404, detail=...)]]: FastAPI بيحوّلها JSON على طول [[{"detail":"Item not found"}]]، من غير error handler.`,
            R`dict بيتحوّل JSON، بس عن طريق Pydantic (في Rust) مش [[json.dumps]].`,
            R`Django في ملف واحد: [[sys]] عشان [[sys.argv]] (أوامر زي [[runserver 5003]]).`,
            R`[[settings]] بتاع Django. عادةً [[settings.py]]، وهنا [[settings.configure()]] تحت عشان كل حاجة في ملف.`,
            R`[[Http404]] exception بيرد 404، و [[JsonResponse]] رد JSON (Django مش بيحوّل dict لـ JSON لوحده زي Flask و FastAPI).`,
            R`[[path]] لتعريف المسارات بـ converters زي Flask ([[<int:item_id>]]).`,
            R`[[settings.configure(...)]] إعدادات من غير ملف: [[DEBUG=False]] عشان صفحة الـ 404 تبقى صفحة الإنتاج مش صفحة الـ debug، و [[ROOT_URLCONF=__name__]] = الـ [[urlpatterns]] في الملف ده، و [[ALLOWED_HOSTS]] لازمة مع [[DEBUG=False]] وإلا كل طلب 400.`,
            R`نفس الداتا للمرة التالتة.`,
            R`الـ view في Django بتاخد [[request]] **أول باراميتر** دايمًا، وبعده باراميترات المسار.`,
            R`ونفس الفحص في Django: [[not in]] على مفاتيح الـ dict (بـ O(1) لأنه hash table)...`,
            R`[[raise Http404]]: الرد HTML زي Flask (اتجرّب: [[text/html]] و [[<title>Not Found</title>]])، والرسالة مش بتظهر للعميل مع [[DEBUG=False]].`,
            R`[[JsonResponse]] بيستخدم [[json.dumps]] العادي، فالرد فيه مسافات بعد [[:]] و [[,]] ([[{"id": 1, ...}]]) عكس الاتنين التانيين.`,
            R`[[urlpatterns]] لستة المسارات، و Django بيدوّر عليها في [[ROOT_URLCONF]]. لاحظ مفيش [[/]] في أول المسار في Django.`,
            R`لو الملف اتشغّل مباشرة ([[python django_app.py ...]]) مش بـ import...`,
            R`...هات [[execute_from_command_line]] اللي بيعمل شغل [[manage.py]]...`,
            R`...ونفّذ الأمر من [[sys.argv]]، زي [[runserver 5003 --noreload]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** املى جدول الـ ٣ من الذاكرة لـ ٥ صفوف: ORM و migrations، و admin، والفحص، و OpenAPI، و async. وبعدين قارن بالجدول الكبير.`, done: R`الـ ١٥ خانة صح، ومعاك جملة لكل framework «هختاره لما...» فيها سبب مش «عشان أسرع».` },
            { lvl: 'تطبيق', t: R`**ابني:** خلّي Flask و Django يرجّعوا 404 JSON زي FastAPI بالظبط ([[{"detail": "Item not found"}]] و [[application/json]]): [[@app.errorhandler(404)]] في Flask، و [[handler404]] في Django.`, done: R`[[curl -i /items/99]] على الـ ٣ بيرجّع نفس الـ body ونفس الـ Content-Type، وكاتب عدد السطور اللي زوّدتها في كل واحد.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ٣ مشاريع: (١) API لتطبيق موبايل توصيل فيه tracking لحظي، (٢) لوحة داخلية للمحاسبة فيها صلاحيات كتير، (٣) service صغيرة بتحوّل صور. اختار لكل واحد framework، واكتب سببين وسبب واحد ممكن يغيّر قرارك.`, done: R`٣ إجابات، كل واحدة فيها سببين من الدرس (مش «الأشهر»)، وسبب يغيّر القرار (الفريق، أو مشروع موجود، أو مكتبة مهمة).` },
          ],
          try: R`شغّل الـ ٣ ملفات مع بعض على ٣ بورتات، واطلب [[/items/1]] و [[/items/99]] و [[/items/abc]] من كل واحد وقارن الـ status والـ Content-Type. وبعدين افتح [[http://127.0.0.1:5002/docs]]. وأخيرًا فكّر واكتب: لو هتعمل نظام حجز عيادات فيه دكاترة وسكرتارية ولوحة للإدارة، هتختار إيه وليه؟`,
          sol: R`النتايج زي الجدول: الـ ٣ بيرجّعوا [[200]] لـ [[/items/1]]. لـ [[/items/99]]: Flask و Django صفحة HTML بـ [[404]]، و FastAPI [[{"detail":"Item not found"}]]. لـ [[/items/abc]]: Flask و Django [[404]] لأن [[<int:...>]] مطابقش، و FastAPI [[422]] وفيه [[int_parsing]] و [[loc: ["path","item_id"]]]. و [[/docs]] في FastAPI بيعرض الـ endpoint ونوع [[item_id]] من غير ما تكتب حاجة، والاتنين التانيين مفيهمش [[/docs]] (404).

نظام العيادات: Django أنسب. فيه أنواع يوزرز وصلاحيات (دكتور، سكرتارية، إدارة)، ولوحة للإدارة (الـ admin جاهز)، وداتا علاقية (مواعيد ودكاترة ومرضى وفواتير) و migrations. ولو فيه تطبيق موبايل، DRF فوقه. FastAPI كان هيبقى اختيار لو هو API بس وفيه شغل async كتير، و Flask لو حاجة أصغر بكتير. ولو الفريق كله بيعرف FastAPI كويس، ده سبب حقيقي يغيّر القرار.`
        },
      ]
    }
]);
