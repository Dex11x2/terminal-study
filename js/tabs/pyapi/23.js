// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Flask",
      l: 2,
      n: "Flask صغير ومن غير ORM ولا admin: app factory و blueprints، و request و response، و Jinja للـ HTML، و Flask-SQLAlchemy للقاعدة، وإمتى تختاره بدل FastAPI أو Django",
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

package اسمه [[shop]] فيه [[create_app()]]: بيعمل التطبيق، ويحمّل الإعدادات من قيم افتراضية والـ environment، ويربط قاعدة البيانات، ويسجّل blueprint المنتجات على [[/products]]، ويضيف [[/health]]. اتشغّل بـ Flask 3.1.3 و Werkzeug 3.1.9 على لينكس (python:3.13-slim في Docker)، وعلى ويندوز في PowerShell 7 بـ Python 3.14.

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
            "الكلاس الأساسي.",
            "الـ extension بتاع القاعدة، متعمل من غير تطبيق.",
            "الـ factory، و [[test_config]] للاختبارات.",
            "تطبيق جديد. [[__name__]] بيحدد مكان templates و static.",
            "قيم افتراضية للتطوير.",
            "واكتب فوقها أي [[FLASK_*]] من الـ environment.",
            "لو اختبار...",
            "...إعداداته فوق الكل.",
            "اربط القاعدة بالتطبيق ده.",
            "الـ blueprint، import جوه الدالة.",
            "سجّله تحت [[/products]].",
            "route على التطبيق: GET [[/health]].",
            "الدالة.",
            "dict يتحول JSON.",
            "رجّع التطبيق.",
            "الكلاس.",
            "blueprint اسمه [[products]]."
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

٣ routes في blueprint المنتجات: list ببحث وصفحات (JSON أو HTML حسب الـ [[Accept]])، ومنتج واحد، وإنشاء منتج بفحص يدوي، و error handler بيخلي الأخطاء JSON. اتشغّل بـ Flask 3.1.3 و Flask-SQLAlchemy 3.1.1 على لينكس في Docker بـ SQLite و ٧ منتجات، والطلبات بـ [[curl]].

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

| الطلب | الرد |
|---|---|
| [[GET /products/999]] | [[404]] [[{"detail":"The requested URL was not found on the server. ...","error":"Not Found"}]] |
| [[POST]] بـ [[price_cents: 50]] | [[400]] [[{"detail":"name is required and price_cents must be an int >= 100","error":"Bad Request"}]] |
| [[POST]] بـ [[category: "Toys"]] | [[400]] [[{"detail":"unknown category","error":"Bad Request"}]] |
| [[POST]] فورم مش JSON | [[400]] نفس رسالة الفحص (بسبب [[silent=True]]) |
| [[POST]] صح | [[201]] [[{"category":"Cables","id":9,"name":"DP cable 2","price_cents":25000}]] |
| [[DELETE /products/1]] | [[405 METHOD NOT ALLOWED]] و [[Allow: HEAD, GET, OPTIONS]] |
| [[GET /nope]] | [[404]] **HTML**: بره الـ blueprint، فالـ handler بتاعه مش بيمسكه |

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
            "أدوات Flask.",
            "تحميل العلاقة في JOIN.",
            "القاعدة.",
            "الـ models.",
            "الـ blueprint.",
            "GET [[/products/]].",
            "الـ list.",
            "كلمة البحث أو فاضي.",
            "رقم الصفحة، و 1 لو مش رقم.",
            "المنتجات ومعاها أقسامها، بترتيب ثابت.",
            "لو فيه بحث...",
            "...فلتر بالاسم من غير ما يهم الـ capital.",
            "صفحة من ٣.",
            "لو العميل طالب JSON...",
            "...رد dict.",
            "غير كده HTML.",
            "GET [[/products/<رقم>]].",
            "منتج واحد.",
            "الصف أو 404.",
            "dict يتحول JSON.",
            "POST [[/products/]].",
            "الإنشاء.",
            "الـ body أو dict فاضي.",
            "الاسم من غير مسافات.",
            "السعر.",
            "فحص يدوي...",
            "...ولو غلط 400 برسالة.",
            "القسم بالاسم أو [[None]].",
            "مش موجود؟",
            "400.",
            "object جديد.",
            "ضيفه للـ session.",
            "INSERT.",
            "201 و [[Location]] بلينك المنتج.",
            "امسك 400...",
            "...و 404 في الـ blueprint ده.",
            "handler واحد للاتنين.",
            "رد JSON بنفس الـ status."
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

قالب أساسي [[base.html]] فيه الهيكل، وصفحة المنتجات بتورث منه وبتلف على المنتجات بتنسيق للسعر واسم القسم ولينك للصفحة الجاية، و filter بتاعك للسعر. اتشغّل بـ Flask 3.1.3 و Jinja2 3.1.6 على لينكس في Docker، على نفس التطبيق بتاع الدرسين اللي فاتوا.

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
            "تعليق Jinja: اسم الملف (مبيطلعش في الـ HTML).",
            "نوع الصفحة.",
            "بداية الـ HTML.",
            "الـ head.",
            "block للعنوان، و Shop لو الابن مملاهوش.",
            "لينك الـ CSS من فولدر static.",
            "قفل الـ head.",
            "الـ body.",
            "block المحتوى.",
            "قفل الـ body.",
            "قفل الـ HTML.",
            "تعليق: الملف التاني.",
            "الصفحة دي بتورث من base.",
            "العنوان: Products.",
            "بداية المحتوى.",
            "العنوان، وكلمة البحث لو موجودة.",
            "list.",
            "لف على المنتجات.",
            "لينك المنتج، والسعر بالجنيه، والقسم capital.",
            "لو الـ list فاضية...",
            "...السطر ده.",
            "قفل الـ loop.",
            "قفل الـ list.",
            "لينك الصفحة الجاية لو فيه.",
            "قفل المحتوى."
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

ملف [[extensions.py]] فيه [[db]]، و [[models.py]] فيه قسم ومنتجات بعلاقة، وسكربت بيعمل الجداول ويملاها. اتشغّل بـ Flask-SQLAlchemy 3.1.1 و SQLAlchemy 2.1.6 على لينكس في Docker بـ SQLite، و Flask-Migrate 4.1.0 (Alembic 1.20.1). وعلى ويندوز في pwsh 7 نفس السكربت طبع [[7]].

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
            "الـ extension.",
            "أساس الـ models.",
            "الأب بتاعنا.",
            "فاضي.",
            "[[db]] مرة واحدة، من غير تطبيق.",
            "[[ForeignKey]].",
            "أدوات الـ models.",
            "[[db]].",
            "جدول [[category]].",
            "primary key.",
            "اسم مش متكرر.",
            "جدول [[product]].",
            "primary key.",
            "اسم.",
            "السعر بالقروش.",
            "عمود بيشاور على القسم.",
            "القسم كـ object.",
            "تحويل لـ dict عشان الـ JSON.",
            "الحقول واسم القسم.",
            "الـ factory.",
            "[[db]].",
            "الـ models.",
            "تطبيق.",
            "context عشان [[db]] يعرف القاعدة.",
            "اعمل الجداول (للتجربة).",
            "قسم جديد.",
            "ضيفه.",
            "منتج في القسم ده.",
            "INSERT للاتنين."
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

نفس الـ endpoint بالـ ٣: [[GET /items/<id>]] يرجّع item من dict، و 404 لو مش موجود. شغّلتهم مع بعض في نفس الـ container (python:3.13-slim): Flask 3.1.3 على 5001 بـ [[flask run]]، و FastAPI 0.162.0 على 5002 بـ uvicorn 0.54.0، و Django 6.1.2 على 5003 بـ [[runserver]] (ملف واحد بـ [[settings.configure]]، للمقارنة بس: المشروع الحقيقي بـ [[startproject]])، وطلبت كل واحد ٣ مرات بـ [[curl]].

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
            "Flask: التطبيق و abort.",
            "التطبيق.",
            "الداتا.",
            "GET بـ id رقم.",
            "الدالة.",
            "مش موجود؟",
            "404.",
            "dict يتحول JSON.",
            "FastAPI: التطبيق و HTTPException.",
            "التطبيق.",
            "نفس الداتا.",
            "GET بـ id في المسار.",
            "النوع [[int]] هو الفحص والتوثيق.",
            "مش موجود؟",
            "404 JSON برسالة.",
            "dict يتحول JSON.",
            "Django في ملف واحد: [[sys.argv]] للأوامر.",
            "الإعدادات.",
            "404 و JSON.",
            "المسارات.",
            "إعدادات من غير settings.py، والـ URLs في الملف ده.",
            "نفس الداتا.",
            "الـ view.",
            "مش موجود؟",
            "404.",
            "JSON.",
            "المسار.",
            "لو الملف اتشغّل مباشرة...",
            "...أوامر manage.py...",
            "...زي runserver."
          ],
          try: R`شغّل الـ ٣ ملفات مع بعض على ٣ بورتات، واطلب [[/items/1]] و [[/items/99]] و [[/items/abc]] من كل واحد وقارن الـ status والـ Content-Type. وبعدين افتح [[http://127.0.0.1:5002/docs]]. وأخيرًا فكّر واكتب: لو هتعمل نظام حجز عيادات فيه دكاترة وسكرتارية ولوحة للإدارة، هتختار إيه وليه؟`,
          sol: R`النتايج زي الجدول: الـ ٣ بيرجّعوا [[200]] لـ [[/items/1]]. لـ [[/items/99]]: Flask و Django صفحة HTML بـ [[404]]، و FastAPI [[{"detail":"Item not found"}]]. لـ [[/items/abc]]: Flask و Django [[404]] لأن [[<int:...>]] مطابقش، و FastAPI [[422]] وفيه [[int_parsing]] و [[loc: ["path","item_id"]]]. و [[/docs]] في FastAPI بيعرض الـ endpoint ونوع [[item_id]] من غير ما تكتب حاجة، والاتنين التانيين مفيهمش [[/docs]] (404).

نظام العيادات: Django أنسب. فيه أنواع يوزرز وصلاحيات (دكتور، سكرتارية، إدارة)، ولوحة للإدارة (الـ admin جاهز)، وداتا علاقية (مواعيد ودكاترة ومرضى وفواتير) و migrations. ولو فيه تطبيق موبايل، DRF فوقه. FastAPI كان هيبقى اختيار لو هو API بس وفيه شغل async كتير، و Flask لو حاجة أصغر بكتير. ولو الفريق كله بيعرف FastAPI كويس، ده سبب حقيقي يغيّر القرار.`
        },
      ]
    }
]);
