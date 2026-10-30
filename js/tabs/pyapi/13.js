// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Pydantic v2",
      l: 2,
      time: R`حوالي ٥ ساعات`,
      goal: [
        R`توصف أي داتا داخلة أو طالعة بموديل Pydantic v2 بقيوده، وتقرا أخطاءه ([[type]] و [[loc]] و [[msg]]).`,
        R`تحوّل بين موديل و dict و JSON في الاتجاهين ([[model_validate]] و [[model_dump]] و [[model_dump_json]])، ومن objects الـ ORM.`,
        R`تكتب قواعدك انت: على حقل ([[field_validator]] و [[AfterValidator]])، وبين أكتر من حقل ([[model_validator]])، وتعرف الترتيب بيفرق إزاي.`,
        R`تجمع إعدادات التطبيق في [[BaseSettings]] مفحوص، والأسرار في [[SecretStr]]، والتطبيق يقع وهو بيقوم لو حاجة ناقصة.`,
      ],
      use: {
        prog: R`Pydantic هو الحتة اللي بتفحص في FastAPI، وبيتستخدم برّه كمان: قراية ملفات config، وردود API خارجية، ورسايل queue.`,
        work: R`نص الباجات في الـ backend داتا شكلها غلط: سعر سالب، وتاريخ نهاية قبل البداية، ورقم موبايل بأرقام عربي. الموديل بيمسكها على الباب.`,
        cs: R`الموديل «عقد» بين جزئين من السيستم. والـ JSON Schema اللي بيطلع منه هو نفس العقد بصيغة أي لغة تانية تفهمها (TypeScript و Go).`,
      },
      lab: R`cd shop-api && .venv/Scripts/activate && pip install pydantic-settings && python -c "import pydantic; print(pydantic.VERSION)"`,
      projects: [
        { lvl: 'صغير', t: R`فاحص ملف عملاء`, what: R`سكربت بيقرا [[customers.json]] (list عملاء) ويفحص كل واحد بموديل [[Customer]] من درس «BaseModel و Field»، ويطبع الصفوف الغلط برقمها وأول خطأ فيها.`, done: R`ملف فيه ١٠ عملاء منهم ٣ غلط (موبايل بأرقام عربي، واسم حرف واحد، و city ناقصة) بيطبع ٣ سطور بالظبط فيها رقم الصف والـ [[loc]] والـ [[msg]]، وكود الخروج 1 لو فيه غلط و 0 لو لأ.` },
        { lvl: 'صغير', t: R`API بـ camelCase`, what: R`موديل رد [[OrderOut]] حقوله snake_case في Python ([[created_at]] و [[total_cents]]) وبيطلع camelCase للـ frontend بـ [[alias_generator=to_camel]]، وبيقبل الاتنين في الإدخال. من درس «model_dump و model_validate».`, done: R`الرد فيه [[createdAt]] و [[totalCents]]، و POST بـ [[{"totalCents": 500}]] و [[{"total_cents": 500}]] الاتنين بيعدّوا، و [[/docs]] بيعرض الأسماء الـ camelCase.` },
        { lvl: 'متوسط', t: R`موديل حجز بقواعده`, what: R`[[BookingIn]] فيه [[email]] و [[start]] و [[end]] و [[guests]] و [[room]]: الإيميل بيتنضّف، والأرقام العربي في الموبايل بتتحوّل إنجليزي بـ [[BeforeValidator]]، و [[end]] بعد [[start]] بـ [[model_validator]] وبـ [[PydanticCustomError]] بنوع [[date_order]]، و [[nights]] حقل محسوب. ومعاه endpoint [[POST /bookings]].`, done: R`٨ اختبارات بتعدّي: حجز سليم بـ [[nights]] صح، وموبايل [[٠١٠١٢٣٤٥٦٧٨]] بيتقبل ويتخزن [[01012345678]]، وتواريخ مقلوبة بترجع 422 والـ [[type]] [[date_order]]، وتاريخ [[2026-02-30]] بيترفض، و [[nights]] اللي العميل بعتها بتتجاهل.` },
        { lvl: 'متوسط', t: R`إعدادات لكل بيئة`, what: R`[[Settings]] بـ [[env_prefix="SHOP_"]] و [[env_nested_delimiter="__"]] وموديل [[Db]] جواه، و [[cors_origins]] بتتقري مفصولة بفاصلة، و [[jwt_secret: SecretStr]]. وملف [[.env.example]] فيه كل الأسماء من غير قيم، و [[get_settings()]] بتتنادى في الـ lifespan.`, done: R`من غير [[SHOP_JWT_SECRET]] التطبيق مبيقومش ورسالة الخطأ فيها اسم الحقل، و [[SHOP_DB__PORT=6543]] بيوصل [[settings.db.port == 6543]]، و [[print(settings)]] مبيطلعش السر، واختبار بيغيّر الإعدادات بـ [[dependency_overrides]] من غير ما يلمس [[.env]].` },
        { lvl: 'كبير', t: R`مستورد طلبات من CSV`, what: R`endpoint [[POST /imports/orders]] بياخد CSV (من تاب Python: [[csv.DictReader]] على نص الـ body) ويفحص كل صف بموديل [[OrderRow]] بقواعده (تاريخ، وكمية موجبة، وسعر بالقروش int، وكود منتج بـ pattern)، ويرجّع تقرير: كام صف سليم، والصفوف الغلط برقم السطر واسم العمود والرسالة. والسليم بيتخزن في الذاكرة، والملف كله بيترفض لو الغلط أكتر من ١٠٪.`, done: R`ملف ١٠٠ صف فيه ٥ غلط بيرجّع 200 و [[{"ok": 95, "errors": [...]}]] فيها ٥ عناصر بأرقام السطور الحقيقية، وملف فيه ٢٠ غلط بيرجّع 422 ومفيش ولا صف اتخزّن، وملف فاضي أو أعمدته ناقصة بيرجّع 400 برسالة واضحة. وفيه لوج لكل import بعدد الصفوف والوقت، والاختبارات بتعدّي مرتين ورا بعض.`, ext: R`زوّد [[?dry_run=true]] بيرجّع التقرير من غير ما يخزّن، وحد أقصى لحجم الملف، وبعد قسم قاعدة البيانات خزّن الصفوف كلها في transaction واحدة.` },
        { lvl: 'فكرة', t: R`عقد مشترك مع الـ frontend`, what: R`طلّع [[model_json_schema()]] لكل موديلات الرد في ملف [[schemas.json]]، وحوّله لأنواع TypeScript بأداة زي [[json-schema-to-typescript]] (تاب TypeScript). انت اللي بتقرر إمتى يتولّد (يدوي، أو في الـ CI).`, done: R`لما تزوّد حقل في موديل Python وتعيد التوليد، الـ frontend بيطلّع خطأ type في المكان اللي محتاج يتعدّل، من غير ما حد يقولك.`, ext: R`خلّي الـ CI يرفض الـ PR لو [[schemas.json]] مش متحدّث (نفس فكرة «dist is up to date»).` },
      ],
      n: "موديلات بتفحص وتحوّل الداتا وقت التشغيل، و validators بتاعتك، والإعدادات من env",
      items: [
        {
          cmd: "BaseModel و Field",
          title: "موديل بيفحص الداتا بجد وقت التشغيل",
          desc: R`Pydantic بيعمل اللي Zod بيعمله في TypeScript: موديل بتوصف فيه الشكل بالـ type hints، ولما تعمل منه object بيفحص ويحوّل، ولو فيه غلط بيرمي [[ValidationError]] فيه كل المشاكل مع بعض. ومن نفس الموديل بيطلع JSON Schema (اللي FastAPI بيستخدمه للتوثيق).

[[Field(...)]] للقيود والـ defaults، و [[Annotated]] عشان تعمل نوع بقيوده وتستخدمه في كذا مكان. والنسخة الحالية Pydantic v2 (الـ core بتاعها مكتوب بـ Rust)، و FastAPI الحديث مبيقبلش v1 خالص.`,
          example: R`from datetime import date
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
Price = Annotated[float, Field(gt=0, le=1_000_000)]
class Address(BaseModel):
    city: str
    street: str | None = None
class Customer(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r"^01[0125]\d{8}$")
    tier: Literal["free", "pro"] = "free"
    birthday: date | None = None
    budget: Price = 100
    address: Address
c = Customer(name="  Sara ", phone="01012345678", birthday="1999-05-01", address={"city": "Cairo"})
print(c.name, c.birthday.year, c.address.city)
try:
    Customer(name="S", phone="123", address={}, role="admin")
except ValidationError as e:
    print(e.error_count())
    print(e.errors()[0]["loc"], e.errors()[0]["msg"])`,
          try: R`اطبع [[e.errors()]] كله وشوف كل خطأ فيه [[loc]] و [[msg]] و [[type]]. وبعدين اطبع [[Customer.model_json_schema()]]: ده اللي بيظهر في [[/docs]]. وجرّب [[budget="50"]] مرة، ومرة مع [[ConfigDict(strict=True)]].`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الحقل ده بـ Pydantic: «كمية رقم صحيح من ١ لـ ٥٠، والافتراضي ١»، و«كود خصم ٦ حروف كابيتال وأرقام»، و«نوع شحن واحد من [[standard]] و [[express]]».`, done: R`كتبت [[qty: int = Field(1, ge=1, le=50)]] و [[code: str = Field(pattern=r"^[A-Z0-9]{6}$")]] و [[shipping: Literal["standard", "express"]]]، وجرّبت كل واحد بقيمة سليمة وقيمة غلط وشفت الـ [[type]] الصح ([[less_than_equal]] و [[string_pattern_mismatch]] و [[literal_error]]).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[Customer]] من المثال، اكتب OK ولا ERR ونوع الخطأ لكل واحد: [[name="  س  "]]، و [[phone=1012345678]] (رقم مش نص)، و [[tier="PRO"]]، و [[birthday="2026-02-30"]]، و [[budget="inf"]].`, done: R`شغّلتهم وطابقوا: الخمسة ERR، بالترتيب [[string_too_short]] (المسافات اتشالت الأول)، و [[string_type]] (Pydantic مبيحوّلش int لـ str)، و [[literal_error]]، و [[date_from_datetime_parsing]]، و [[less_than_equal]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موديل [[Product]] فيه [[price: float = Field(gt=0)]] بس. ابعتله [["inf"]] و [[float("nan")]] واتفرّج: أنهي واحد عدّى؟ وصلّحه بطريقتين.`, done: R`[["inf"]] عدّت ([[inf > 0]] صح)، و NaN اترفضت ([[nan > 0]] غلط) بس بخطأ ملخبط. والتصليحين: [[allow_inf_nan=False]] بيرجّع [[finite_number]]، أو [[le]] بحد أقصى منطقي، وكتبت إن الأحسن للفلوس [[price_cents: int]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** مستخدمين بيكتبوا الموبايل من كيبورد عربي. خلّي [[phone]] يقبل [[٠١٠١٢٣٤٥٦٧٨]] و [[010 1234 5678]] و [[+201012345678]] ويخزّنهم كلهم [[01012345678]]، بـ [[BeforeValidator]] قبل الـ pattern.`, done: R`التلاتة بيطلعوا [[01012345678]]، و [[0101234567]] (ناقص رقم) لسه بيترفض بـ [[string_pattern_mismatch]]، والـ validator بيستخدم [[str.translate]] بجدول من [[٠١٢٣٤٥٦٧٨٩]] لـ [[0123456789]].` },
            { lvl: 'تحدي', t: R`**قارن:** اعمل نفس الموديل مرة بـ [[ConfigDict(strict=True)]] ومرة من غيرها، وابعت [[{"budget": "50", "birthday": "1999-05-01"}]] لـ [[model_validate]] ولـ [[model_validate_json]]. اكتب جدول: أنهي عدّى في أنهي وضع، وليه.`, done: R`الجدول فيه ٤ خانات مجرّبة، ولقيت إن strict في [[model_validate]] رفض [["50"]] وكمان رفض التاريخ كنص، وفي [[model_validate_json]] التاريخ عدّى لأن JSON مفيهوش نوع تاريخ أصلًا، وكتبت الرسالة الحقيقية لكل رفض.` },
          ],
          deep: {
            why: "الـ type hints العادية مبتفحصش حاجة، و Pydantic هو اللي بيخليها حقيقية: أي داتا جاية من برّه (request، API خارجي، ملف، env، ناتج AI) بتعدّي على الموديل، وجوه الكود بتتعامل مع objects مضمونة الشكل.",
            how: R`الموديل class بيورث من [[BaseModel]]، والـ annotations هي الحقول. ووقت الإنشاء، pydantic-core (Rust) بيفحص كل حقل ويحوّل. في الوضع الافتراضي (lax) بيحوّل الحاجات المنطقية: [["1999-05-01"]] لـ date، و [["100"]] لـ float، و dict لموديل متداخل. و [[strict=True]] بيمنع التحويل.

الحقل من غير default إجباري، و [[X | None = None]] اختياري. (ولو كتبت [[X | None]] من غير default، يبقى إجباري بس مسموح يبقى null.)

[[model_config = ConfigDict(...)]] إعدادات الموديل (كانت [[class Config]] في v1): [[extra="forbid"]] بيرفض الحقول الزيادة (الافتراضي [[ignore]] بيشيلها بهدوء)، و [[str_strip_whitespace]] بيشيل المسافات، و [[frozen=True]] بيمنع التعديل.

[[Annotated[float, Field(...)]]] بيعمل نوع بقيوده (Price) تستخدمه في أي موديل. وفيه أنواع جاهزة: [[EmailStr]] و [[HttpUrl]] و [[SecretStr]] (مبيطبعش قيمته في اللوج) و [[PositiveInt]].

والـ ValidationError بيجمع كل الأخطاء مش أول واحد بس، وكل خطأ فيه [[loc]] (المسار، زي [[('address', 'city')]]).`,
            when: "كل حدود التطبيق: request و response و env و APIs خارجية وملفات JSON ورسايل queue. وجوه الكود بين دوالك: dataclass، أو نفس الموديل لو جاهز.",
            mistakes: R`أمثلة v1 في مشروع v2 ([[class Config]] و [[.dict()]] و [[@validator]] و [[orm_mode]]): بعضها شغال بتحذير وبعضها اتشال. و [[float]] للفلوس (استخدم [[Decimal]] و Pydantic بيدعمه، أو قروش int). وتفتكر إن [[extra]] الافتراضي بيرفض الزيادة.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف موديل عميل [[Customer]] فيه قيود على كل حقل (طول، regex، قيم محددة، تاريخ، رقم في مدى، وموديل جوه موديل). وبعدين بيعمل منه object بداتا سليمة (فيتحوّل ويتنضّف)، ومرة بداتا غلط (فيترمي [[ValidationError]] فيه ٤ أخطاء). اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز ([[python main.py]]).

---

## ١. الـ imports

~~~python
from datetime import date
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[date]] | نوع التاريخ (يوم وشهر وسنة) |
| [[Annotated]] | نوع + معلومات زيادة |
| [[Literal]] | قيم محددة بس |
| [[BaseModel]] | الأب اللي أي موديل بيورث منه |
| [[ConfigDict]] | إعدادات الموديل كله مرة واحدة، زي رفض الحقول الزيادة وشيل المسافات، بدل ما تكررها في كل حقل |
| [[Field]] | قيود و default لحقل |
| [[ValidationError]] | الخطأ اللي بيترمي لو الداتا غلط |

---

## ٢. نوع بقيوده: [[Price]]

~~~python
Price = Annotated[float, Field(gt=0, le=1_000_000)]
~~~

[[Price]] مش موديل، ده **اسم لنوع**: float أكبر من صفر ([[gt]]) وأقل من أو يساوي مليون ([[le]]). تكتبه مرة وتستخدمه في أي موديل.

## ٣. موديل صغير: [[Address]]

~~~python
class Address(BaseModel):
    city: str
    street: str | None = None
~~~

- [[city: str]] من غير [[=]]: **إجباري**.
- [[street: str | None = None]]: نص أو None، والـ default None، يعني اختياري.

---

## ٤. الموديل الأساسي: [[Customer]]

~~~python
class Customer(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r"^01[0125]\d{8}$")
    tier: Literal["free", "pro"] = "free"
    birthday: date | None = None
    budget: Price = 100
    address: Address
~~~

### [[model_config]]

اسم محجوز: إعدادات الموديل كله، مش حقل.

- [[extra="forbid"]]: أي حقل زيادة مش متعرّف = خطأ. (الافتراضي [[ignore]]: بيتشال بهدوء.)
- [[str_strip_whitespace=True]]: شيل المسافات من أول وآخر أي string.

### الحقول

| الحقل | القيد | يعني |
|---|---|---|
| [[name]] | [[min_length=2]] | حرفين على الأقل، **بعد** شيل المسافات |
| [[phone]] | [[pattern=r"..."]] | لازم يطابق الـ regex |
| [[tier]] | [[Literal["free", "pro"]]] | واحدة من الاتنين، والافتراضي free |
| [[birthday]] | [[date | None]] | تاريخ أو مفيش |
| [[budget]] | [[Price]] | النوع اللي عملناه، والافتراضي 100 |
| [[address]] | [[Address]] | موديل جوه موديل، إجباري |

### الـ regex بتاع الموبايل

[[r"..."]] raw string: الـ [[\]] تفضل زي ما هي. والـ pattern [[^01[0125]\d{8}$]]:

| الحتة | معناها |
|---|---|
| [[^]] | أول النص: من غيرها [[abc01012345678]] كانت هتعدّي لأن الـ regex بيدوّر في أي حتة |
| [[01]] | يبدأ بـ 01 |
| [[[0125]]] | رقم واحد من دول (فودافون واتصالات وأورانج ووي) |
| [[\d{8}]] | ٨ أرقام بالظبط ورا بعض، و [[{8}]] معناها العدد |
| [[$]] | آخر النص (مفيش حاجة زيادة) |

---

## ٥. داتا سليمة

~~~python
c = Customer(name="  Sara ", phone="01012345678", birthday="1999-05-01", address={"city": "Cairo"})
print(c.name, c.birthday.year, c.address.city)
~~~

~~~text الناتج
Sara 1999 Cairo
~~~

اللي حصل وقت الإنشاء:

- [["  Sara "]] اتنضّفت [[Sara]] ([[str_strip_whitespace]]).
- [["1999-05-01"]] string اتحوّل [[date]] حقيقي، فـ [[.year]] اشتغلت. ده الوضع العادي (lax): بيحوّل اللي ليه معنى.
- [[{"city": "Cairo"}]] dict اتحوّل object من [[Address]]، فـ [[c.address.city]] اشتغلت.

> لاحظ: [[c.budget]] طلع [[100]] (int) مش [[100.0]]. Pydantic **مبيفحصش الـ defaults** افتراضيًا، فالقيمة بتفضل زي ما كتبتها. لو بعتّ [[budget="50"]] بيتحوّل [[50.0]] لأنه اتفحص.

---

## ٦. داتا غلط

~~~python
try:
    Customer(name="S", phone="123", address={}, role="admin")
except ValidationError as e:
    print(e.error_count())
    print(e.errors()[0]["loc"], e.errors()[0]["msg"])
~~~

~~~text الناتج
4
('name',) String should have at least 2 characters
~~~

- [[e.error_count()]] عدد الأخطاء.
- [[e.errors()]] list فيها كل خطأ كـ dict، و [[[0]]] أولهم.

ولو طبعت [[e.errors()]] كلها (التجربة):

~~~text الناتج
{'type': 'string_too_short', 'loc': ('name',), 'msg': 'String should have at least 2 characters', 'input': 'S', 'ctx': {'min_length': 2}, 'url': '...'}
{'type': 'string_pattern_mismatch', 'loc': ('phone',), 'msg': "String should match pattern '^01[0125]\\d{8}$'", 'input': '123', ...}
{'type': 'missing', 'loc': ('address', 'city'), 'msg': 'Field required', 'input': {}, ...}
{'type': 'extra_forbidden', 'loc': ('role',), 'msg': 'Extra inputs are not permitted', 'input': 'admin', ...}
~~~

| الخانة | معناها |
|---|---|
| [[type]] | كود ثابت للخطأ (للكود: ترجمة الرسايل مثلًا) |
| [[loc]] | المكان: [[('address', 'city')]] يعني جوه address، حقل city |
| [[msg]] | رسالة للبني آدمين |
| [[input]] | القيمة اللي اتبعتت |
| [[ctx]] | تفاصيل القيد اللي اتكسر، زي [[{"min_length": 2}]]، عشان تبني رسالة بالعربي |

Pydantic **مبيقفش عند أول خطأ**: بيجمعهم كلهم. و [[print(e)]] نفسه بيطبعهم بشكل مقروء (أول سطر [[4 validation errors for Customer]]).

---

## ٧. [[model_json_schema()]]

~~~python
Customer.model_json_schema()
~~~

~~~text الناتج (مختصر)
"required": ["name", "phone", "address"]
"additionalProperties": false
"phone":  {"pattern": "^01[0125]\\d{8}$", "type": "string"}
"tier":   {"enum": ["free", "pro"], "default": "free"}
"budget": {"exclusiveMinimum": 0, "maximum": 1000000, "default": 100, "type": "number"}
"address": {"$ref": "#/$defs/Address"}
~~~

نفس القيود، بس بلغة JSON Schema: [[gt]] بقت [[exclusiveMinimum]]، و [[le]] بقت [[maximum]]، و [[extra="forbid"]] بقت [[additionalProperties: false]]، و [[Address]] اتحط في [[$defs]]. ده اللي FastAPI بيعرضه في [[/docs]].

## ٨. [[strict=True]]

| | [[budget="50"]] |
|---|---|
| الوضع العادي (lax) | بيعدّي ويبقى [[50.0]] |
| [[ConfigDict(strict=True)]] | النص [['50']] اترفض ومبقاش بيتحوّل رقم: [[1 validation error ... Input should be a valid number [type=float_type, input_value='50', input_type=str]]] |

---

---

## اتشغّل فعلًا: العربي واللانهاية والأرقام

جربنا على نفس [[Customer]] (Pydantic 2.14 و Python 3.14)، وكل مرة غيّرنا حقل واحد بس من الداتا السليمة:

~~~text الناتج
name="  س  "                 → ERR string_too_short          ← المسافات اتشالت الأول فبقى حرف واحد
name="سارة"                  → OK  سارة                       ← الطول بالحروف مش بالـ bytes
budget="inf"                 → ERR less_than_equal           ← [[le=1_000_000]] هو اللي مسكها
budget=float("nan")          → ERR less_than_equal
phone="٠١٠١٢٣٤٥٦٧٨"          → ERR string_pattern_mismatch   ← الأرقام العربي مش [[01]]
phone=1012345678             → ERR string_type               ← رقم مش نص، ومفيش تحويل int لـ str
birthday="2026-02-30"        → ERR date_from_datetime_parsing  day value is outside expected range
birthday="01/05/1999"        → ERR date_from_datetime_parsing  invalid character in year
tier="PRO"                   → ERR literal_error             ← حساس لحالة الحروف
~~~

| الحالة | ليه | لو عايز تقبلها |
|---|---|---|
| [["inf"]] و NaN | Pydantic بيقبل اللانهاية في [[float]] افتراضيًا، و [[le]] بس اللي رفضها هنا | [[Field(allow_inf_nan=False)]]. ومن غير [[le]] و [[allow_inf_nan]] السعر اللانهائي بيعدّي (درس «request body») |
| موبايل بأرقام عربي | الـ pattern بيقارن حروف، و [[٠]] حرف تاني غير [[0]] | [[BeforeValidator]] بيعمل [[translate]] للأرقام قبل الـ pattern (درس «field_validator و model_validator») |
| [[phone=1012345678]] | الوضع lax بيحوّل [["5"]] لـ int، بس مش بيحوّل int لـ str | [[coerce_numbers_to_str=True]] في [[ConfigDict]]، بس الموبايل كرقم بيضيّع الصفر اللي في الأول أصلًا |
| [["01/05/1999"]] | التاريخ لازم ISO، ومفيش تخمين للصيغة (يوم/شهر ولا شهر/يوم؟) | الـ frontend يبعت ISO، أو [[BeforeValidator]] بـ [[datetime.strptime]] بصيغة انت محددها |

## الخلاصة

- الموديل = class بيورث [[BaseModel]]، والحقول = type hints.
- من غير default = إجباري، و [[X | None = None]] = اختياري.
- [[Field(...)]] للقيود، و [[Annotated[T, Field(...)]]] لنوع بقيوده تعيد استخدامه.
- [[ValidationError]] فيه **كل** الأخطاء، وكل واحد فيه [[loc]] و [[msg]] و [[type]].
- الـ extra الافتراضي [[ignore]] مش [[forbid]]، والـ defaults مبتتفحصش.`,
          lines: [
            R`نوع [[date]] من Python نفسها: الحقل اللي نوعه [[date]] بيقبل [["1999-05-01"]] ويحوّله object تقدر تعمل عليه [[.year]] وتطرح منه.`,
            R`[[Annotated]] عشان نعمل نوع ومعاه قيوده مرة واحدة، و [[Literal]] لحقل بيقبل كلمات محددة بس.`,
            R`[[BaseModel]] أساس أي موديل، و [[ConfigDict]] لإعدادات الموديل كله، و [[Field]] لقيود حقل واحد، و [[ValidationError]] الـ exception اللي بيترمي لما الداتا غلط.`,
            R`نوع جديد اسمه [[Price]]: float أكبر من صفر وأقصاه مليون. تكتبه مرة وتستخدمه في أي موديل، و [[le]] هنا كمان بيرفض [["inf"]] (اتجرب تحت).`,
            R`موديل صغير للعنوان. هيتحط جوه [[Customer]]، فالـ dict اللي جاي في [[address]] بيتفحص بيه.`,
            R`[[city]] نص من غير default، يعني **إجباري**: لو [[address]] جه [[{}]] الخطأ بيقول [[('address', 'city')]].`,
            R`[[street]] اختياري: [[str | None]] و default [[None]]، فلو مبعتهوش الموديل بيكمّل عادي.`,
            R`الموديل الأساسي: كل حقل تحته بنوعه وقيده، والترتيب هنا هو ترتيب المفاتيح في [[model_dump()]].`,
            R`[[extra="forbid"]] بيرفض أي حقل مش متعرّف ([[role]] مثلًا) بخطأ [[extra_forbidden]]، و [[str_strip_whitespace=True]] بيشيل المسافات من أول وآخر **كل** نص قبل الفحص.`,
            R`[[min_length=2]] بيتحسب **بعد** شيل المسافات، فـ [["  س  "]] بقت [["س"]] واترفضت. والطول بالحروف، فـ [["سارة"]] أربعة حروف عادي.`,
            R`[[pattern]] regex لرقم موبايل مصري: [[01]] وبعدها [[0]] أو [[1]] أو [[2]] أو [[5]]، وبعدها ٨ أرقام. الـ [[r]] قبل النص عشان [[\d]] متبقاش escape. والأرقام العربي ([[٠١٠...]]) بتترفض لأن [[01]] في الأول حروف إنجليزي بالظبط.`,
            R`[[Literal["free", "pro"]]] بيقبل الكلمتين دول بالظبط وحساس لحالة الحروف، فـ [["PRO"]] بترجع [[literal_error]]. والـ default [["free"]].`,
            R`تاريخ اختياري: الـ string بصيغة ISO ([[YYYY-MM-DD]]) بيتحوّل [[date]]، و [["2026-02-30"]] أو [["01/05/1999"]] بيترفضوا برسالة.`,
            R`نستخدم النوع [[Price]] اللي عملناه فوق، و default 100. القيد بيتطبق على أي قيمة تتبعت، مش على الـ default.`,
            R`حقل نوعه موديل تاني: الـ dict اللي جاي بيتفحص بـ [[Address]] ويبقى object، فتقدر تكتب [[c.address.city]].`,
            R`داتا سليمة: [[name]] فيها مسافات، و [[birthday]] نص، و [[address]] dict. Pydantic بينضّف ويحوّل كل ده وهو بيعمل الـ object.`,
            R`بيطبع [[Sara 1999 Cairo]]: الاسم من غير مسافات، و [[.year]] اشتغلت لأن [[birthday]] بقت [[date]]، و [[address]] بقى object.`,
            R`بنجرّب داتا غلط جوه [[try]] عشان نشوف الخطأ من غير ما البرنامج يقع.`,
            R`٤ مشاكل في سطر واحد: اسم حرف واحد، وموبايل [["123"]]، و [[address]] من غير [[city]]، و [[role]] حقل مش متعرّف.`,
            R`[[ValidationError]] بيترمي **مرة واحدة** وفيه كل الأخطاء، مش أول واحد بس.`,
            R`[[error_count()]] بيطبع [[4]]: Pydantic كمّل فحص كل الحقول بعد أول غلط، وده اللي بيخلي الـ 422 في FastAPI فيه كل الأخطاء مع بعض.`,
            R`كل خطأ dict فيه [[loc]] (المكان: [[('name',)]]) و [[msg]] (الرسالة) و [[type]] (كود ثابت تقدر تعتمد عليه في الكود بدل الرسالة).`,
          ],
          sol: R`[[e.errors()]] فيها ٤ أخطاء، كل واحد dict فيه [[type]] و [[loc]] و [[msg]] (و [[input]] و [[url]]): [[string_too_short ('name',)]]، و [[string_pattern_mismatch ('phone',)]]، و [[missing ('address', 'city')]] (الـ loc بيوصل لجوه الموديل المتداخل)، و [[extra_forbidden ('role',)]] (بسبب [[extra="forbid"]]). والـ [[type]] ثابت ومناسب للكود (تترجم منه الرسائل مثلًا)، والـ [[msg]] للبني آدمين.

[[model_json_schema()]] بيرجع JSON Schema فيه [[required: ['name', 'phone', 'address']]]، و [[phone]] جواه [[pattern]]، و [[budget]] جواه [[exclusiveMinimum: 0]] و [[maximum: 1000000]]، و [[Address]] في [[$defs]]. و [[budget="50"]] بيعدّي ويبقى [[50.0]] (float)، لكن مع [[strict=True]] بيترفض: [[float_type]] و [[Input should be a valid number]]. الـ strict مفيد لما البيانات جاية من كود تاني مش من JSON أو فورم.`
        },
        {
          cmd: "model_dump و model_validate",
          title: "من موديل لـ dict و JSON، ومن ORM لموديل",
          desc: R`في Pydantic v2 كل الـ methods بتبدأ بـ [[model_]]: [[model_dump()]] لـ dict، و [[model_dump_json()]] لـ JSON string، و [[model_validate(data)]] من dict أو object، و [[model_validate_json(raw)]] من JSON string على طول (أسرع من [[json.loads]] وبعدين validate)، و [[model_copy(update=...)]] لنسخة معدّلة.

ولو عايز تفحص حاجة مش موديل ([[list[Item]]] مثلًا): [[TypeAdapter]].`,
          example: R`from datetime import datetime
from pydantic import BaseModel, ConfigDict, TypeAdapter
class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    note: str | None = None
    created_at: datetime
item = Item.model_validate({"id": 1, "name": "Tea", "created_at": "2026-01-10T09:00:00Z"})
print(item.model_dump())
print(item.model_dump(mode="json", exclude_none=True))
print(item.model_dump_json(include={"id", "name"}))
raw = '{"id": 2, "name": "Coffee", "created_at": "2026-01-10T10:00:00Z"}'
item2 = Item.model_validate_json(raw)
renamed = item.model_copy(update={"name": "Green tea"})
items = TypeAdapter(list[Item]).validate_python([{"id": 3, "name": "Cake", "created_at": "2026-01-10T11:00:00Z"}])
class Row:
    id, name, note, created_at = 4, "Juice", None, datetime(2026, 1, 1)
from_orm = Item.model_validate(Row())`,
          try: R`قارن [[item.model_dump()]] بـ [[item.model_dump(mode="json")]] واطبع نوع [[created_at]] في الاتنين. وبعدين جرّب [[Item.model_validate(Row())]] من غير [[from_attributes]] واقرا الخطأ.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب مقابل v2 لكل دالة v1 من غير ما تبص: [[parse_obj]] و [[parse_raw]] و [[dict()]] و [[json()]] و [[copy()]] و [[from_orm]] و [[orm_mode]].`, done: R`كتبت [[model_validate]] و [[model_validate_json]] و [[model_dump]] و [[model_dump_json]] و [[model_copy]] و [[model_validate]] مع [[from_attributes]]، وقارنت بجدول الدرس وطلعوا كلهم صح، وجربت إن [[item.dict()]] لسه شغالة بس بتطلّع [[PydanticDeprecatedSince20]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الناتج بالظبط (أنواع القيم) لـ [[item.model_dump()]] و [[item.model_dump(mode="json")]] و [[item.model_dump_json(exclude={"created_at"})]] على [[Item(id=1, name="Tea", created_at="2026-01-10T09:00:00Z")]].`, done: R`الأول فيه [[datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))]] و [[note: None]]، والتاني فيه [['2026-01-10T09:00:00Z']] نص، والتالت نص [['{"id":1,"name":"Tea","note":null}']] من غير مسافات. وطابقوا ورقتك.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[cached = redis.get("item:1"); item = Item(**json.loads(cached))]] و [[redis.set("item:1", json.dumps(item.model_dump()))]] بيقع بـ [[TypeError: Object of type datetime is not JSON serializable]]. صلّحه بسطرين.`, done: R`بقى [[redis.set(..., item.model_dump_json())]] و [[Item.model_validate_json(cached)]]، والـ round trip بيرجّع موديل مساوي للأصل ([[==]] بيطبع [[True]]) من غير [[json]] خالص.` },
            { lvl: 'تطبيق', t: R`**ابني:** موديل [[OrderOut]] بـ [[alias_generator=to_camel]] و [[populate_by_name=True]] (أو [[validate_by_name=True]] في 2.11+)، ورجّعه من endpoint FastAPI. الـ frontend عايز [[createdAt]] و [[totalCents]].`, done: R`[[model_dump()]] بيطلّع [[created_at]]، و [[model_dump(by_alias=True)]] بيطلّع [[createdAt]]، والـ endpoint بيرجّع camelCase من غير ما تكتب [[by_alias]] (FastAPI بيعملها لوحده في الرد)، والموديل بيتعمل من الاسمين.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** list فيها ١٠٠ ألف [[Item]] كنص JSON. قيس بـ [[time.perf_counter]] مرتين لكل طريقة: [[TypeAdapter(list[Item]).validate_json(raw)]] مقابل [[[Item.model_validate(x) for x in json.loads(raw)]]].`, done: R`عندك ٤ أرقام حقيقية مكتوبة في تعليق، والفرق بالنسبة (مثلًا «أسرع ٣ مرات»)، وكتبت ليه: الأولى parse وفحص في Rust من غير objects وسيطة، والتانية بتعمل dicts في Python الأول.` },
          ],
          deep: {
            why: "الموديل بيتنقل بين طبقات كتير: من JSON جاي، لـ dict تحطه في القاعدة، لـ JSON راجع، أو لـ Redis. لازم تعرف تحوّل في كل اتجاه من غير ما تخسر الفحص. والأسماء اتغيرت بين v1 و v2، فأمثلة النت القديمة بتلخبط.",
            how: R`جدول التحويل من v1: [[.dict()]] بقت [[model_dump()]]، و [[.json()]] بقت [[model_dump_json()]]، و [[parse_obj]] بقت [[model_validate]]، و [[parse_raw]] بقت [[model_validate_json]]، و [[.copy()]] بقت [[model_copy()]]، و [[orm_mode]] بقت [[from_attributes]]، و [[schema()]] بقت [[model_json_schema()]]. والقديمة بعضها لسه موجود بـ DeprecationWarning.

[[model_dump()]] الافتراضي (mode python) بيسيب الـ datetime و Decimal و UUID objects زي ما هي. و [[mode="json"]] بيحوّلها لأنواع JSON (strings و numbers)، ودي اللي محتاجها لو هتبعت الـ dict لـ [[json.dumps]] أو Redis. و [[exclude_unset]] و [[exclude_none]] و [[include]] و [[exclude]] و [[by_alias]] للتحكم.

[[model_validate_json]] بيعمل parse و validate في خطوة واحدة جوه Rust: أسرع وبياكل ذاكرة أقل.

[[from_attributes=True]] بيخلي [[model_validate]] يقرا attributes من أي object (زي صف SQLAlchemy). و Record بتاع asyncpg حوّله [[dict(record)]] الأول.

[[TypeAdapter]] بيعمل validate و dump و JSON schema لأي نوع: [[list[Item]]] و [[dict[str, int]]] و [[int | None]]. اعمله مرة على مستوى الـ module، مش جوه loop، لأن بناؤه مكلف.

و [[model_copy(update=...)]] مبيفحصش القيم الجديدة: لو محتاج فحص، اعمل [[model_validate]] على dict جديد.`,
            when: R`[[model_dump(exclude_unset=True)]] للـ PATCH. و [[mode="json"]] قبل أي تخزين كـ JSON. و [[model_validate_json]] لما القيمة جاية string (Redis، queue، ملف). و [[from_attributes]] مع الـ ORMs.`,
            mistakes: R`[[json.dumps(item.model_dump())]] فيطلع [[TypeError: Object of type datetime is not JSON serializable]]: استخدم [[model_dump_json()]] أو [[mode="json"]]. و [[TypeAdapter(...)]] جوه دالة بتتنادى مع كل request. و [[dict(item)]] بدل [[model_dump]] (سطحي: الموديلات المتداخلة بتفضل objects).`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل موديل [[Item]] ويحوّل بيه في كل اتجاه: من dict لموديل، ومن موديل لـ dict ولـ JSON، ومن JSON string لموديل، ونسخة معدّلة، وليستة موديلات مرة واحدة، ومن object عادي (زي صف ORM) لموديل. اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز، وضفنا [[print]] بعد كل خطوة.

---

## ١. الموديل

~~~python
from datetime import datetime
from pydantic import BaseModel, ConfigDict, TypeAdapter
class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    note: str | None = None
    created_at: datetime
~~~

- [[from_attributes=True]]: اسمح للموديل يتبني من أي object عنده attributes بنفس الأسماء (مش dict بس). هنحتاجها في آخر خطوة.
- [[note]] اختياري، و [[created_at]] من نوع [[datetime]] (تاريخ ووقت).
- [[TypeAdapter]] للخطوة ٧.

---

## ٢. [[model_validate]]: من dict لموديل

~~~python
item = Item.model_validate({"id": 1, "name": "Tea", "created_at": "2026-01-10T09:00:00Z"})
~~~

نفس [[Item(**data)]]، بس بياخد الـ dict كما هو. بيفحص ويحوّل:

~~~text الناتج (repr(item))
Item(id=1, name='Tea', note=None, created_at=datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0)))
~~~

[[2026-01-10T09:00:00Z]] صيغة ISO 8601: [[T]] بتفصل التاريخ عن الوقت، و [[Z]] يعني UTC، فبقت [[tzinfo=TzInfo(0)]] (فرق صفر عن UTC).

---

## ٣. [[model_dump]]: من موديل لـ dict

~~~python
print(item.model_dump())
print(item.model_dump(mode="json", exclude_none=True))
~~~

~~~text الناتج
{'id': 1, 'name': 'Tea', 'note': None, 'created_at': datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))}
{'id': 1, 'name': 'Tea', 'created_at': '2026-01-10T09:00:00Z'}
~~~

| الخيار | بيعمل إيه |
|---|---|
| (الافتراضي) [[mode="python"]] | الـ objects تفضل objects: [[created_at]] نوعه [[<class 'datetime.datetime'>]] |
| [[mode="json"]] | كل حاجة تبقى نوع JSON: [[created_at]] بقى [[<class 'str'>]] |
| [[exclude_none=True]] | شيل الحقول اللي قيمتها None ([[note]] اختفت) |

ليه ده مهم؟ جربنا [[json.dumps(item.model_dump())]]:

~~~text الناتج
TypeError: Object of type datetime is not JSON serializable
~~~

[[json]] بتاعة Python متعرفش datetime. فلو هتحفظ الـ dict كـ JSON (Redis مثلًا)، استخدم [[mode="json"]].

## ٤. [[model_dump_json]]: من موديل لـ JSON string

~~~python
print(item.model_dump_json(include={"id", "name"}))
~~~

~~~text الناتج
{"id":1,"name":"Tea"}
~~~

string جاهز يتبعت، ومتعمل جوه Rust (أسرع من [[json.dumps]]). و [[include={...}]] set بأسماء الحقول اللي عايزها بس (وعكسها [[exclude]]).

---

## ٥. [[model_validate_json]]: من JSON string لموديل

~~~python
raw = '{"id": 2, "name": "Coffee", "created_at": "2026-01-10T10:00:00Z"}'
item2 = Item.model_validate_json(raw)
~~~

~~~text الناتج
Item(id=2, name='Coffee', note=None, created_at=datetime.datetime(2026, 1, 10, 10, 0, tzinfo=TzInfo(0)))
~~~

بدل [[json.loads(raw)]] وبعدين [[model_validate]]: خطوة واحدة جوه Rust، أسرع وذاكرة أقل.

## ٦. [[model_copy]]: نسخة معدّلة

~~~python
renamed = item.model_copy(update={"name": "Green tea"})
~~~

~~~text الناتج
renamed: Green tea | original: Tea
~~~

الأصل متغيرش. بس خد بالك: [[update]] **مبيفحصش**. جربنا [[model_copy(update={"id": "not-a-number"})]] وعدّت، و [[id]] بقى [[not-a-number]] string. لو محتاج فحص: [[Item.model_validate({**item.model_dump(), "id": ...})]].

---

## ٧. [[TypeAdapter]]: فحص أي نوع

~~~python
items = TypeAdapter(list[Item]).validate_python([{"id": 3, "name": "Cake", "created_at": "2026-01-10T11:00:00Z"}])
~~~

[[model_validate]] موجودة على الموديلات بس. لو عايز تفحص [[list[Item]]] (أو [[dict[str, int]]] أو أي نوع)، [[TypeAdapter(النوع)]] بيدّيك [[validate_python]] و [[validate_json]] و [[dump_python]] و [[json_schema]].

~~~text الناتج
[Item(id=3, name='Cake', note=None, created_at=datetime.datetime(2026, 1, 10, 11, 0, tzinfo=TzInfo(0)))]
~~~

بناء الـ TypeAdapter مكلف، فاعمله مرة على مستوى الـ module، مش جوه دالة بتتنادى كتير.

---

## ٨. [[from_attributes]]: من object لموديل

~~~python
class Row:
    id, name, note, created_at = 4, "Juice", None, datetime(2026, 1, 1)
from_orm = Item.model_validate(Row())
~~~

[[Row]] class عادي، والسطر التاني بيعمل ٤ class attributes مرة واحدة. [[Row()]] object منه زي صف راجع من SQLAlchemy:

~~~text الناتج
Item(id=4, name='Juice', note=None, created_at=datetime.datetime(2026, 1, 1, 0, 0))
~~~

ومن غير [[from_attributes]] (التجربة):

~~~text الناتج
Input should be a valid dictionary or instance of Item [type=model_type, input_value=<__main__.Row object at 0x...>, input_type=Row]
~~~

---

## الجدول كله (ومقابله في v1)

| عايز | v2 | v1 القديم |
|---|---|---|
| dict → موديل | [[model_validate(d)]] | [[parse_obj]] |
| JSON → موديل | [[model_validate_json(s)]] | [[parse_raw]] |
| موديل → dict | [[model_dump()]] | [[.dict()]] |
| موديل → JSON | [[model_dump_json()]] | [[.json()]] |
| نسخة | [[model_copy(update=...)]] | [[.copy()]] |
| من ORM | [[from_attributes=True]] | [[orm_mode]] |
| أي نوع | [[TypeAdapter(T)]] | [[parse_obj_as]] |

---

## اتشغّل فعلًا: أسامي مختلفة برّه وجوه (aliases)

الـ frontend (JavaScript) بيكتب [[createdAt]]، و Python بيكتب [[created_at]]. بدل ما تكتب كل حقل مرتين، الـ alias بيترجم. اتجرب على Pydantic 2.14:

~~~python
from pydantic.alias_generators import to_camel
class Api(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    first_name: str
    created_at: date
a = Api.model_validate({"firstName": "Sara", "createdAt": "2026-01-02"})
print(a.model_dump(), a.model_dump(by_alias=True))
print(Api(first_name="Omar", created_at="2026-01-02").first_name)
~~~

~~~text الناتج
{'first_name': 'Sara', 'created_at': datetime.date(2026, 1, 2)} {'firstName': 'Sara', 'createdAt': datetime.date(2026, 1, 2)}
Omar
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[alias_generator=to_camel]] | بيعمل لكل حقل اسم تاني: [[first_name]] بيبقى [[firstName]]. ده الاسم اللي بيتقري من الـ input |
| [[populate_by_name=True]] | يقبل اسم Python كمان، عشان كودك جوه يقدر يكتب [[Api(first_name=...)]]. في 2.11+ ليه اسم أوضح: [[validate_by_name=True]] (اتجرب، نفس النتيجة) |
| [[model_dump()]] | بالأسامي بتاعة Python، للاستخدام جوه السيستم |
| [[model_dump(by_alias=True)]] | بالأسامي الـ camelCase. و FastAPI بيعمل [[by_alias]] لوحده في الرد، فالعميل بيشوف [[firstName]] |
| [[Field(alias="X")]] | لحقل واحد اسمه برّه مختلف خالص، زي [[Field(alias="ID")]] لـ API قديم |

ولما الحقل ناقص، الـ [[loc]] بيبقى بالاسم الـ camelCase: [[{"first_name": "x"}]] رجعت خطأ [[missing]] و [[loc: ('createdAt',)]]. ده كويس للـ frontend، لأنه بيشوف نفس الاسم اللي بعته.

## الخلاصة

- كل حاجة في v2 بتبدأ بـ [[model_]].
- [[model_dump()]] بيسيب datetime كـ object، و [[mode="json"]] بيحوّله string.
- [[model_validate_json]] أحسن من [[json.loads]] + validate.
- [[model_copy(update=...)]] مبيفحصش.`,
          lines: [
            R`[[datetime]] عشان حقل [[created_at]]: هيستقبل نص ISO ويخزّنه object فيه المنطقة الزمنية.`,
            R`[[BaseModel]] للموديل، و [[ConfigDict]] للإعدادات، و [[TypeAdapter]] عشان نفحص أنواع مش موديلات زي [[list[Item]]].`,
            R`الموديل اللي هنحوّل منه وإليه في كل السطور اللي جاية.`,
            R`[[from_attributes=True]] بيخلي [[model_validate]] تقرا الحقول من attributes أي object (صف SQLAlchemy مثلًا)، مش من dict بس. اسمها القديم [[orm_mode]] في v1.`,
            R`[[id]] رقم إجباري. لو جه [["1"]] نص بيتحوّل [[1]] في الوضع العادي.`,
            R`[[name]] نص إجباري، والموديل مش هيتعمل من غيره.`,
            R`[[note]] اختياري، و [[exclude_none=True]] تحت هتشيله من الناتج لو قيمته [[None]].`,
            R`[[created_at]] نوعه [[datetime]]: [["2026-01-10T09:00:00Z"]] بيتحوّل object و [[Z]] بتبقى منطقة UTC.`,
            R`[[model_validate(dict)]]: فحص وتحويل من dict لموديل (كانت [[parse_obj]] في v1). لو فيه غلط بترمي [[ValidationError]] زي الـ constructor بالظبط.`,
            R`[[model_dump()]] بيرجّع dict Python عادي، و [[created_at]] فيه لسه [[datetime]] object، فمينفعش يتكتب [[json.dumps]] على طول.`,
            R`[[mode="json"]] بيحوّل كل قيمة لنوع JSON (التاريخ بقى [["2026-01-10T09:00:00Z"]])، و [[exclude_none=True]] بيشيل [[note]] لأنها [[None]].`,
            R`[[model_dump_json]] بيرجّع **نص** JSON جاهز يتبعت أو يتخزن، و [[include]] بيختار حقول معينة بس. ده أسرع من [[json.dumps(model_dump())]] لأنه في Rust.`,
            R`نص JSON جاي من برّه (Redis أو queue أو ملف) ولسه متفحصش.`,
            R`[[model_validate_json]] بيعمل parse وفحص في خطوة واحدة جوه Rust، من غير ما يعمل dict في النص. أسرع وبيطلّع أخطاء JSON البايظ في نفس الـ [[ValidationError]].`,
            R`[[model_copy(update=...)]] بيعمل نسخة بتعديل والأصل زي ما هو. خد بالك: القيم في [[update]] **مبتتفحصش**، فلو حطيت [[name=5]] هتعدّي.`,
            R`[[TypeAdapter(list[Item])]] بيفحص list موديلات من غير ما تعمل موديل wrapper، وبيرجّع [[list[Item]]] عادية. اعمله مرة برّه الدالة لو بتستخدمه كتير.`,
            R`class عادي مش Pydantic، زي الصف اللي بيرجع من ORM، عشان نجرّب [[from_attributes]].`,
            R`الـ attributes على مستوى الـ class، فـ [[Row()]] هيبقى عنده [[id]] و [[name]] و [[note]] و [[created_at]] من غير constructor.`,
            R`[[model_validate(Row())]] بيقرا الـ attributes بفضل [[from_attributes]]. من غير الإعداد ده بيرمي [[model_type]]: «Input should be a valid dictionary or instance of Item».`,
          ],
          sol: R`[[model_dump()]] بيرجع [[created_at]] كـ [[datetime]] حقيقي ([[datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))]] ونوعه [[<class 'datetime.datetime'>]])، و [[model_dump(mode="json")]] بيرجعه string: [[2026-01-10T09:00:00Z]] ونوعه [[<class 'str'>]]. الأول لو هتكمّل شغل في Python، والتاني لو هتبعته لحاجة مبتفهمش غير JSON (Redis أو [[json.dumps]]).

ومن غير [[from_attributes]]: [[Input should be a valid dictionary or instance of Item [type=model_type, input_value=<__main__.Row object at 0x...>, input_type=Row]]]. Pydantic افتراضيًا بيقبل dict أو object من نفس الموديل بس، و [[from_attributes=True]] بيخليه يقرا [[obj.id]] و [[obj.name]]، ودي اللي بتحتاجها مع صفوف SQLAlchemy.`
        },
        {
          cmd: "field_validator و model_validator",
          title: "قواعد فحص بتاعتك: حقل لوحده أو حقول مع بعض",
          desc: R`لو القيود الجاهزة مش كفاية: [[@field_validator("field")]] دالة بتفحص أو تعدّل حقل واحد، و [[@model_validator(mode="after")]] بتفحص الموديل كله بعد ما كل حقل اتفحص (زي «تاريخ النهاية بعد البداية»). ارمي [[ValueError]] برسالة، و Pydantic بيحوّلها لخطأ في الـ ValidationError في المكان الصح.

و [[@computed_field]] حقل محسوب بيظهر في [[model_dump]] وفي الـ JSON.`,
          example: R`from datetime import date
from typing import Self
from pydantic import BaseModel, computed_field, field_validator, model_validator
class Booking(BaseModel):
    email: str
    start: date
    end: date
    guests: int
    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not v.endswith("@company.com"):
            raise ValueError("لازم إيميل الشركة")
        return v
    @model_validator(mode="after")
    def check_dates(self) -> Self:
        if self.end <= self.start:
            raise ValueError("end لازم بعد start")
        return self
    @computed_field
    @property
    def nights(self) -> int:
        return (self.end - self.start).days
b = Booking(email=" Sara@Company.com ", start="2026-03-01", end="2026-03-04", guests=2)
print(b.model_dump())`,
          try: R`ابعت [[end]] قبل [[start]] واقرا مكان الخطأ في [[e.errors()]] (هيبقى على الموديل كله مش على حقل). وبعدين ضيف [[@field_validator("guests")]] بيرفض أكتر من 6، وقارنه بإنك تكتب [[Field(le=6)]] (الأبسط دايمًا أحسن).`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** لكل قاعدة اكتب هتستخدم إيه ([[Field]] ولا [[field_validator]] ولا [[model_validator]]): «الكمية من ١ لـ ٥٠»، و«الإيميل يتصغّر»، و«سعر الخصم أقل من السعر الأصلي»، و«الكود يتحوّل كابيتال قبل الـ pattern».`, done: R`كتبت [[Field]] للأولى، و [[field_validator]] (after) للتانية، و [[model_validator]] للتالتة، و [[mode="before"]] أو [[BeforeValidator]] للرابعة، وكتبت جنب كل واحد ليه في جملة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** نوعين: [[U1 = Annotated[str, Field(min_length=3), BeforeValidator(low)]]] و [[U2 = Annotated[str, BeforeValidator(low), Field(min_length=3)]]]، و [[low]] بتعمل [[strip().lower()]]. ابعت [[" Ab "]] للاتنين: هيطلع نفس الخطأ؟`, done: R`جرّبت: U1 طلّع [[string_too_short]] و [[String should have at least 3 characters]]، و U2 طلّع [[too_short]] و [[Value should have at least 3 items after validation, not 2]]. الاتنين رفضوا، بس النوع والرسالة اختلفوا حسب ترتيب الحاجات جوه [[Annotated]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** validator فيه [[v = v.strip().lower()]] ونسي [[return v]]، وتاني اسمه [[def check(self, v)]] تحت [[@field_validator]] من غير [[@classmethod]]. شغّل كل واحد واكتب اللي حصل.`, done: R`الأول عدّى من غير خطأ والإيميل بقى [[None]] (أخطر نوع باج: صامت)، والتاني وقع والكلاس بيتعرّف بـ [[PydanticUserError]] ورسالته فيها [[cannot be applied to instance methods]]. صلّحت الاتنين، واختبار بيتأكد إن الإيميل اتخزن متنضّف.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[POST /bookings]] بالموديل ده، وخلّي خطأ التواريخ يطلع بـ [[PydanticCustomError("date_order", "end لازم بعد start")]] بدل [[ValueError]]. وابعت تواريخ مقلوبة واقرا الـ 422.`, done: R`الـ 422 فيها [[type: "date_order"]] و [[msg: "end لازم بعد start"]] من غير [[Value error, ]] قدامها، و [[loc: ["body"]]]. والـ frontend يقدر يعتمد على [[date_order]] كنص ثابت.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** ٦ اختبارات pytest على [[Booking]] من غير FastAPI: إيميل بمسافات بيتنضّف، و gmail بيترفض، وتواريخ متساوية بتترفض، وإيميل غلط مع تواريخ غلط (كام خطأ؟)، و [[nights]] صح، و [[nights=99]] في الإدخال بيتجاهل.`, done: R`الستة بيعدّوا، والرابع بيتأكد إن فيه خطأ **واحد** بس (الإيميل) لأن الـ model validator مبيشتغلش لو حقل فشل، والاختبارات بتستخدم [[pytest.raises(ValidationError)]] و [[e.value.errors()]].` },
          ],
          deep: {
            why: "قواعد الـ business الحقيقية مش دايمًا «رقم أكبر من صفر»: إيميل من دومين معين، تاريخين مرتبطين، حقل إجباري لو حقل تاني اتبعت. لو فحصتها جوه الـ route هتتكرر وتتنسى. في الموديل بتتطبّق في كل حتة وبتطلع 422 بنفس الشكل.",
            how: R`[[field_validator]] الافتراضي [[mode="after"]]: بيشتغل بعد ما Pydantic حوّل القيمة للنوع، فـ [[v]] مضمون str. و [[mode="before"]] بيشتغل على القيمة الخام قبل التحويل (مفيد لو هتحوّل [["a,b,c"]] لـ list). ولازم [[@classmethod]] تحته، ولازم ترجّع القيمة حتى لو معدّلتهاش.

[[model_validator(mode="after")]] بياخد [[self]] بعد ما كل الحقول اتفحصت، ولازم يرجّع [[self]]. و [[mode="before"]] بياخد الداتا الخام (غالبًا dict).

ارمي [[ValueError]] (أو [[PydanticCustomError]] لو عايز type خاص بيك). ومتستخدمش [[assert]] للفحص، لأنها بتتشال لو Python اشتغل بـ [[-O]].

وفيه طريقة أخف بـ Annotated: [[Annotated[str, AfterValidator(fn)]]] بتعمل نوع ومعاه الـ validator بتاعه وتستخدمه في كذا موديل.

[[@computed_field]] فوق [[@property]] بيضيف الحقل للـ dump والـ JSON schema، بس مبيتقبلش كـ input.

والـ validators بتشتغل وقت الإنشاء بس. لو عدّلت حقل بعدها ([[b.guests = 100]]) مفيش فحص، إلا لو [[validate_assignment=True]] في الـ config.`,
            when: "قاعدة بتخص الداتا نفسها (شكلها وعلاقة الحقول ببعض). أما اللي محتاج قاعدة بيانات («الإيميل متسجل قبل كده؟») فمكانه الـ service أو dependency، مش الـ validator.",
            mistakes: R`تنسى [[return v]] أو [[return self]]. و [[@validator]] و [[@root_validator]] بتوع v1. و validator بيعمل query على القاعدة (sync، وجوه تطبيق async، ومش مكانه). و validator لحاجة [[Field]] بيعملها أصلًا ([[ge]] و [[max_length]] و [[pattern]]).`
          },
          teach: R`## المثال بيعمل إيه؟

موديل حجز [[Booking]] فيه ٣ إضافات بتاعتك: validator على حقل الإيميل (ينضّفه ويتأكد إنه إيميل الشركة)، و validator على الموديل كله (تاريخ النهاية بعد البداية)، وحقل محسوب [[nights]] (عدد الليالي). اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز.

---

## ١. الـ imports

~~~python
from datetime import date
from typing import Self
from pydantic import BaseModel, computed_field, field_validator, model_validator
~~~

- [[Self]] (من Python 3.11): نوع معناه «object من نفس الكلاس ده». هنكتبه نوع رجوع للـ model validator.
- الباقي ٣ decorators هنشرحهم تحت.

## ٢. الحقول

~~~python
class Booking(BaseModel):
    email: str
    start: date
    end: date
    guests: int
~~~

كلهم إجباريين. و [[start]] و [[end]] هيتحوّلوا من [["2026-03-01"]] لـ [[date]].

---

## ٣. [[@field_validator]]: حقل واحد

~~~python
@field_validator("email")
@classmethod
def normalize_email(cls, v: str) -> str:
    v = v.strip().lower()
    if not v.endswith("@company.com"):
        raise ValueError("لازم إيميل الشركة")
    return v
~~~

| السطر | معناه |
|---|---|
| [[@field_validator("email")]] | الدالة دي تشتغل على حقل [[email]] |
| [[@classmethod]] | لازم تحته: الدالة بتاخد الكلاس [[cls]] مش object (الـ object لسه مااتعملش) |
| [[v: str]] | القيمة، **بعد** ما Pydantic اتأكد إنها str (الوضع الافتراضي [[mode="after"]]) |
| [[v.strip().lower()]] | شيل المسافات وحوّل لحروف صغيرة |
| [[raise ValueError(...)]] | ارفض، و Pydantic بيحوّلها لخطأ عادي في الـ ValidationError |
| [[return v]] | **لازم**: اللي بترجعه هو اللي بيتخزن. لو نسيته الحقل يبقى None |

## ٤. [[@model_validator(mode="after")]]: الموديل كله

~~~python
@model_validator(mode="after")
def check_dates(self) -> Self:
    if self.end <= self.start:
        raise ValueError("end لازم بعد start")
    return self
~~~

- [[mode="after"]]: بعد ما **كل** الحقول اتفحصت واتحوّلت، فـ [[self.start]] و [[self.end]] أكيد [[date]] وتقدر تقارنهم.
- مفيش [[@classmethod]] هنا: بياخد [[self]] (الـ object نفسه).
- [[<=]] بين تاريخين: [[end]] قبل أو يساوي [[start]] = غلط.
- [[return self]] **لازم**.

## ٥. [[@computed_field]]: حقل محسوب

~~~python
@computed_field
@property
def nights(self) -> int:
    return (self.end - self.start).days
~~~

- [[@property]]: دالة بتتقري كأنها attribute ([[b.nights]] من غير أقواس).
- [[@computed_field]] فوقها: ضيفها لـ [[model_dump]] وللـ JSON.
- [[self.end - self.start]]: طرح تاريخين بيدّي [[timedelta]] (مدة)، و [[.days]] عدد الأيام فيها.

---

## ٦. التشغيل

~~~python
b = Booking(email=" Sara@Company.com ", start="2026-03-01", end="2026-03-04", guests=2)
print(b.model_dump())
~~~

~~~text الناتج
{'email': 'sara@company.com', 'start': datetime.date(2026, 3, 1), 'end': datetime.date(2026, 3, 4), 'guests': 2, 'nights': 3}
~~~

- الإيميل اتنضّف ([[sara@company.com]]): الـ validator رجّع القيمة المعدّلة.
- [[nights: 3]] ظهر في الـ dump مع إنه مش حقل اتبعت (من ١ لـ ٤ مارس = ٣ ليالي).

---

## ٧. التجارب

جربنا ٣ حالات غلط وطبعنا [[type]] و [[loc]] و [[msg]] لكل خطأ:

~~~text الناتج
إيميل gmail                 → value_error ('email',) Value error, لازم إيميل الشركة
end قبل start               → value_error () Value error, end لازم بعد start
الاتنين غلط مع بعض           → value_error ('email',) Value error, لازم إيميل الشركة
~~~

نقرا:

- [[loc: ()]] tuple فاضي: الخطأ على **الموديل كله** مش حقل معين، لأنه من model validator.
- Pydantic بيزوّد [[Value error, ]] قبل رسالتك. خد بالك لو بتعرضها للمستخدم.
- في الحالة التالتة ظهر خطأ الإيميل **بس**: لو أي حقل فشل، الـ [[model_validator(mode="after")]] مبيشتغلش أصلًا (مفيش موديل سليم يفحصه).

وكمان:

| جربنا | النتيجة |
|---|---|
| [[b.guests = 100]] بعد الإنشاء | عدّت من غير فحص (إلا لو [[validate_assignment=True]]) |
| بعتنا [[nights=99]] | اتجاهلت: الـ computed field مبيتقبلش كـ input |
| [[model_json_schema(mode="serialization")]] | [[nights]] ظهر في شكل الرد وعليه [[readOnly: True]]، يعني بيطلع بس ومبيتبعتش |

### [[field_validator]] ولا [[Field(le=6)]]؟ (الـ solCode)

الـ solCode بيعمل نفس القاعدة (أقصى ٦ ضيوف) بطريقتين:

~~~text الناتج مع guests=7
WithValidator: {'type': 'value_error', 'loc': ('guests',), 'msg': 'Value error, max 6 guests', ...}
WithField:     {'type': 'less_than_equal', 'loc': ('guests',), 'msg': 'Input should be less than or equal to 6', 'ctx': {'le': 6}, ...}
~~~

وفي الـ JSON Schema: [[WithField]] فيه [[maximum: 6]]، و [[WithValidator]] مفيهوش حاجة. يعني [[Field]] أقصر، ورسالته ونوعه أوضح، وبيظهر في [[/docs]]. خلّي الـ validator للقواعد اللي [[Field]] ميعرفش يعبّر عنها.

---

---

## اتشغّل فعلًا: [[mode="before"]] والـ validators جوه [[Annotated]]

الـ validator العادي ([[mode="after"]]) بيستلم القيمة **بعد** ما Pydantic حوّلها لنوعها. ساعات محتاج تشتغل **قبل** التحويل: الـ frontend بيبعت [["a,b"]] وانت عايز [[list[str]]]. اتجرب على Pydantic 2.14 و FastAPI 0.162:

~~~python
def no_spaces(v: str) -> str:
    if " " in v: raise ValueError("مفيش مسافات")
    return v
Username = Annotated[str, Field(min_length=3), BeforeValidator(lambda v: v.strip().lower() if isinstance(v, str) else v), AfterValidator(no_spaces)]
class Signup(BaseModel):
    username: Username
    tags: list[str]
    @field_validator("tags", mode="before")
    @classmethod
    def split(cls, v):
        return v.split(",") if isinstance(v, str) else v
print(Signup(username="  SaraA ", tags="a,b"))
~~~

~~~text الناتج
username='saraa' tags=['a', 'b']
~~~

| الحتة | إمتى بتشتغل | ليه هنا |
|---|---|---|
| [[BeforeValidator(f)]] | قبل التحويل والقيود: [[v]] ممكن تبقى أي حاجة، فبنتأكد إنها [[str]] الأول | ننضّف المسافات والحروف قبل ما [[min_length]] يعدّ |
| [[AfterValidator(f)]] | بعد التحويل والقيود: [[v]] أكيد [[str]] | قاعدة بتاعتنا: مفيش مسافات في النص |
| [[Field(min_length=3)]] | جوه فحص النوع نفسه | الطول بعد التنضيف |
| [[field_validator(..., mode="before")]] | قبل تحويل الحقل ده بس | [["a,b"]] تبقى list قبل ما Pydantic يرفضها كـ [[list_type]] |

ميزة [[Annotated]] إن [[Username]] نوع بتستخدمه في أي موديل (Signup و Profile و Admin) من غير ما تكرر الـ validators.

### الترتيب جوه [[Annotated]] بيفرق

نفس النوع مرتين، والفرق مكان [[Field]] بس، وبعتنا [[" Ab "]]:

~~~text الناتج
Field قبل BeforeValidator   → string_too_short  String should have at least 3 characters
Field بعد BeforeValidator   → too_short         Value should have at least 3 items after validation, not 2
~~~

الاتنين رفضوا، بس التاني بنوع عام ورسالة ملخبطة («items»)، لأن القيد اتطبق كـ validator منفصل بعد الـ BeforeValidator مش جوه فحص الـ string. حط [[Field]] أول حاجة بعد النوع.

### الأخطاء في FastAPI

~~~text الناتج (POST بـ 422)
username="sa ra"   → {"type":"value_error","loc":["body","username"],"msg":"Value error, مفيش مسافات","input":"sa ra","ctx":{"error":{}}}
end قبل start      → {"type":"value_error","loc":["body"],"msg":"Value error, end لازم بعد start",...}
~~~

خطأ الـ [[model_validator]] الـ [[loc]] بتاعه [[["body"]]] بس، فالـ frontend ميعرفش يحطه تحت أنهي خانة. وعشان [[type]] ثابت بتاعك من غير [[Value error, ]]:

~~~python
from pydantic_core import PydanticCustomError
raise PydanticCustomError("date_order", "end لازم بعد start", {"start": str(self.start)})
~~~

~~~text الناتج
[{'type': 'date_order', 'loc': (), 'msg': 'end لازم بعد start', 'input': {...}, 'ctx': {'start': '2026-03-04'}}]
~~~

التالت argument هو [[ctx]]: تفاصيل يقدر الـ frontend يبني منها رسالته.

## الخلاصة

| عايز | استخدم |
|---|---|
| قيد بسيط (رقم، طول، regex) | [[Field(...)]] |
| تنضيف أو قاعدة على حقل | [[@field_validator("x")]] + [[@classmethod]] + [[return v]] |
| قاعدة بين حقلين | [[@model_validator(mode="after")]] + [[return self]] |
| قيمة محسوبة في الـ JSON | [[@computed_field]] + [[@property]] |

- ارمي [[ValueError]] مش [[assert]].
- الـ validators بتشتغل وقت الإنشاء بس.`,
          lines: [
            R`[[date]] لحقلين [[start]] و [[end]]: Pydantic هيحوّل النص ISO لتاريخ قبل ما الـ validators بتاعتك تشتغل.`,
            R`[[Self]] نوع بيقول «بترجّع نفس نوع الكلاس»، بنكتبه نوع رجوع للـ model validator. موجود في [[typing]] من Python 3.11.`,
            R`الأدوات التلاتة: [[field_validator]] لحقل واحد، و [[model_validator]] لأكتر من حقل مع بعض، و [[computed_field]] لحقل محسوب بيطلع في الرد.`,
            R`موديل حجز: هنحط عليه قاعدة على الإيميل، وقاعدة بين تاريخين، وحقل محسوب.`,
            R`[[email]] نص عادي، والـ validator تحت هينضّفه ويتأكد من الدومين.`,
            R`[[start: date]]: النص [["2026-03-01"]] بيتحوّل [[date]] **قبل** أي validator بتاعك، فـ [[self.start]] تحت date مش string.`,
            R`[[end]] نفس الكلام. لو أي واحد فيهم تاريخ بايظ، الـ [[model_validator]] اللي تحت مش هيشتغل أصلًا.`,
            R`عدد الضيوف رقم صحيح. مفيش عليه قيد هنا، وفي الـ solCode بنقارن قيده بـ validator مقابل [[Field(le=6)]].`,
            R`[[@field_validator("email")]] بيربط الدالة اللي تحت بحقل [[email]]. ينفع تديله كذا اسم ([[("email", "backup_email")]]) أو [[("*")]] لكل الحقول.`,
            R`لازم [[@classmethod]] تحت الـ decorator: الدالة بتشتغل **قبل** ما الـ object يتعمل، فمفيش [[self]] لسه.`,
            R`[[v]] القيمة **بعد** ما Pydantic حوّلها [[str]] (ده الوضع [[mode="after"]] الافتراضي). ونوع الرجوع [[str]] لأن اللي هترجّعه هو اللي هيتخزن.`,
            R`بننضّف القيمة: [[strip()]] بيشيل المسافات و [[lower()]] بيصغّر الحروف، عشان [[" Sara@Company.com "]] و [["sara@company.com"]] يبقوا نفس المستخدم.`,
            R`قاعدة بتاعتك مش موجودة في [[Field]]: الإيميل لازم يخلص بدومين الشركة. الفحص على القيمة **بعد** التنضيف.`,
            R`[[ValueError]] جوه validator بيبقى خطأ Pydantic عادي نوعه [[value_error]]، ورسالته قدامها [[Value error, ]]. في FastAPI ده 422 مش 500.`,
            R`لازم ترجّع القيمة. لو نسيت [[return]] الحقل هيبقى [[None]] من غير أي خطأ، ودي غلطة بتعدّي في صمت.`,
            R`[[model_validator(mode="after")]] بيشتغل **بعد** ما كل الحقول اتفحصت واتحوّلت، فتقدر تقارن بين حقلين.`,
            R`بياخد [[self]]: الـ object جاهز بكل حقوله، ونوع الرجوع [[Self]].`,
            R`القاعدة بين الحقلين: النهاية لازم بعد البداية. التاريخين هنا [[date]] فالمقارنة بالأيام صح، مش مقارنة نصوص.`,
            R`بيرمي [[ValueError]]، والخطأ بيطلع بـ [[loc: ()]] (الموديل كله)، وفي FastAPI [[loc: ["body"]]] من غير اسم حقل. [[PydanticCustomError]] بيدّيك [[type]] بتاعك بدل [[value_error]] (اتجرب تحت).`,
            R`ترجّع [[self]] في الآخر زي ما الوثائق بتطلب. في Pydantic 2.14 لو نسيته الموديل رجع عادي من غير تحذير (اتجرب)، بس ده مش مضمون في نسخ تانية، فمتعتمدش عليه.`,
            R`[[@computed_field]] بيخلي الـ property تظهر في [[model_dump()]] والـ JSON والـ schema، كأنها حقل. من غيره الـ property موجودة في Python بس ومش بتطلع في الرد.`,
            R`[[@property]] عادية من Python: بتتحسب كل مرة حد يقراها، ومبتتخزنش. ولازم تيجي تحت [[@computed_field]] بالترتيب ده.`,
            R`عدد الليالي، ونوع الرجوع [[int]] بيدخل في الـ JSON Schema كـ [[readOnly]].`,
            R`طرح تاريخين بيدّي [[timedelta]]، و [[.days]] عدد الأيام: من ١ لـ ٤ مارس = ٣ ليالي.`,
            R`بنعمل حجز بإيميل فيه مسافات وحروف كابيتال، وتواريخ نصوص. الـ field validator هينضّف، والتحويل للتاريخ بيحصل لوحده.`,
            R`بيطبع [[{'email': 'sara@company.com', 'start': ..., 'end': ..., 'guests': 2, 'nights': 3}]]: الإيميل اتنضّف، و [[nights]] ظهر مع إنه مش حقل اتبعت.`,
          ],
          sol: R`لما [[end]] قبل [[start]]: [[e.errors()]] فيها خطأ واحد بـ [[loc: ()]] (tuple فاضي، يعني على الموديل كله)، و [[type: 'value_error']]، و [[msg: 'Value error, end لازم بعد start']]. Pydantic بيضيف [[Value error, ]] قبل رسالتك، فخد بالك لو بتعرض الرسالة للمستخدم. ولو عايز الخطأ يتربط بحقل معين، اعمل الفحص في field validator.

الـ [[@field_validator("guests")]] بيطلّع [[loc: ('guests',)]] و [[Value error, max 6 guests]]، و [[Field(le=6)]] بيطلّع [[less_than_equal]] و [[Input should be less than or equal to 6]] ومعاه [[ctx: {'le': 6}]]، وبيظهر كـ [[maximum]] في [[/docs]]. فـ [[Field(le=6)]] أقصر وأوضح وموثّق، والـ validator خليه للمنطق اللي Field ميعرفش يعبّر عنه.`,
          solCode: R`from pydantic import BaseModel, Field, field_validator
class WithValidator(BaseModel):
    guests: int
    @field_validator("guests")
    @classmethod
    def max_guests(cls, v: int) -> int:
        if v > 6:
            raise ValueError("max 6 guests")
        return v
class WithField(BaseModel):
    guests: int = Field(le=6)`
        },
        {
          cmd: "pydantic-settings",
          title: "الإعدادات من env و .env بأنواعها",
          desc: R`[[pydantic-settings]] (مكتبة منفصلة عن Pydantic، و [[fastapi[standard]]] الحديث بيسطّبها معاه) فيها [[BaseSettings]]: موديل بيملّي حقوله من متغيرات البيئة ومن ملف [[.env]]، ويفحصها ويحوّلها. لو [[DATABASE_URL]] ناقص وانت بتنادي [[get_settings()]] مرة وقت الـ startup (في الـ lifespan)، التطبيق يقع وهو بيقوم برسالة واضحة، مش بعد ساعة في أول request.

واعمل الإعدادات مرة واحدة ([[@lru_cache]] على دالة)، واستخدمها كـ dependency عشان تعرف تغيّرها في الاختبارات.`,
          example: R`from functools import lru_cache
from typing import Annotated, Literal
from fastapi import Depends, FastAPI
from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")
    env: Literal["dev", "test", "prod"] = "dev"
    database_url: PostgresDsn
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: SecretStr
    cors_origins: list[str] = ["http://localhost:5173"]
    db_pool_size: int = 10
@lru_cache
def get_settings() -> Settings:
    return Settings()
SettingsDep = Annotated[Settings, Depends(get_settings)]
app = FastAPI()
@app.get("/info")
async def info(settings: SettingsDep):
    return {"env": settings.env, "pool": settings.db_pool_size}
# .env:
# DATABASE_URL=postgresql://app:secret@localhost:5432/shop
# JWT_SECRET=change-me-please-32-chars-minimum
# CORS_ORIGINS=["https://shop.example.com"]`,
          try: R`شغّل التطبيق من غير [[.env]] وافتح [[/info]]: هيرجع 500، واقرا الخطأ في الترمنال: فيه اسم كل متغير ناقص. (ولو عايزه يقع وهو بيقوم، نادي [[get_settings()]] في الـ lifespan.) وبعدين اطبع [[settings.jwt_secret]] و [[settings.jwt_secret.get_secret_value()]] وقارن. وجرّب [[DB_POOL_SIZE=abc]].`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** رتّب من الأعلى للأقل: [[.env]]، و default الحقل، و [[Settings(x=...)]]، ومتغير البيئة الحقيقي. وقول إيه اللي بيحصل لـ [[DB_POOL_SIZE=abc]].`, done: R`كتبت [[Settings(x=...)]] ثم البيئة ثم [[.env]] ثم الـ default، وجربت بـ [[$env:DB_POOL_SIZE]] غير اللي في [[.env]] وشفت البيئة كسبت، و [[abc]] طلّعت [[int_parsing]] باسم [[db_pool_size]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[env_prefix="SHOP_"]] و [[env_nested_delimiter="__"]] وحقل [[db: Db]] (فيه [[host]] و [[port]]) وحقل [[debug: bool]]. في البيئة [[SHOP_DB__PORT=6543]] و [[SHOP_DEBUG=yes]] و [[DEBUG=0]]. إيه قيمة [[settings.db.port]] و [[settings.debug]]؟`, done: R`جرّبت وطلع [[6543]] (int) و [[True]]: [[DEBUG=0]] اتجاهلت لأن البادئة [[SHOP_]] بقت إجبارية، و [[yes]] بقت [[True]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اختبار بيعمل [[os.environ["SHOP_DB__PORT"] = "7777"]] وبعدين [[get_settings()]] ومستني 7777، بس بيلاقي القيمة القديمة. اعرف ليه وصلّحه بطريقتين.`, done: R`السبب [[@lru_cache]] (رجّع الـ object القديم)، والتصليحين: [[get_settings.cache_clear()]] قبل النداء، أو [[app.dependency_overrides[get_settings] = lambda: Settings(...)]] من غير ما تلمس البيئة، والاختبار بقى يعدّي.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** الـ DevOps بيكتب [[SHOP_CORS_ORIGINS=https://a.com, https://b.com]] بفاصلة ومسافات، مش JSON. خلّي الحقل يقبل الشكل ده بـ [[Annotated[list[str], NoDecode]]] و validator [[mode="before"]].`, done: R`[[Settings().cors_origins]] بيرجّع [[['https://a.com', 'https://b.com']]] من غير مسافات، والمتغير الفاضي بيرجّع [[[]]]، ومن غير [[NoDecode]] نفس القيمة بتقع بـ [[SettingsError]].` },
            { lvl: 'تحدي', t: R`**ابني:** خلّي التطبيق يرفض يقوم لو الإعدادات ناقصة: [[get_settings()]] جوه الـ lifespan، و [[.env.example]] فيه كل الأسماء، وسكربت [[check_env.py]] بيقارن [[.env.example]] بـ [[Settings.model_fields]] ويطبع الناقص.`, done: R`من غير [[JWT_SECRET]]، [[fastapi run]] بيقف قبل [[Application startup complete]] والخطأ فيه [[jwt_secret Field required]]، و [[check_env.py]] بيطبع اسم أي حقل مش في [[.env.example]] ويخرج بكود 1.` },
          ],
          deep: {
            why: R`[[os.environ["DB_URL"]]] متفرقة في ٢٠ ملف: متغير ناقص يظهر بعد الديبلوي في أول request بيحتاجه، و [["10"]] string بيتقارن برقم، والسر بيطلع في اللوج. BaseSettings بيجمع الإعدادات في مكان واحد مفحوص، وأول ما تتقري بيطلع خطأ واحد فيه كل المتغيرات الناقصة (ولو ناديت get_settings() في الـ lifespan، ده بيحصل وقت الـ startup).`,
            how: R`كل حقل بيدوّر على متغير بيئة بنفس الاسم، من غير حساسية لحالة الحروف افتراضيًا: [[database_url]] بياخد [[DATABASE_URL]]. والأولوية: الـ arguments اللي بتديها لـ [[Settings()]]، وبعدين متغيرات البيئة، وبعدين [[.env]]، وبعدين الـ default. يعني متغير البيئة الحقيقي على السيرفر بيكسب على [[.env]].

الأنواع المعقدة ([[list]] و [[dict]] والموديلات) بتتقري كـ JSON من المتغير. و [[env_prefix="APP_"]] لو عايز كل المتغيرات تبدأ ببادئة. و [[env_nested_delimiter="__"]] للموديلات المتداخلة ([[DB__HOST]]).

[[SecretStr]] بيطبع [[**********]] في اللوج والـ repr، والقيمة الحقيقية بـ [[get_secret_value()]]. و [[PostgresDsn]] بيفحص الـ URL، ولما تبعته لـ asyncpg اعمل [[str(settings.database_url)]].

[[@lru_cache]] بيخلي [[Settings()]] يتعمل مرة واحدة (مش مع كل request يقرا .env). ولأن الإعدادات dependency، في الاختبارات تقدر تعمل [[app.dependency_overrides[get_settings] = lambda: Settings(env="test", ...)]].

و [[.env]] في [[.gitignore]] دايمًا، ومعاه [[.env.example]] فيه الأسماء من غير قيم. وفي Docker الـ env بييجي من compose أو secrets (تاب Docker).`,
            when: R`أي تطبيق، من أول يوم، قبل ما تكتب أول [[os.environ]].`,
            mistakes: R`[[Settings()]] على مستوى الـ module في ملف بيتعمله import في الاختبارات، فالاختبارات تقع لو مفيش .env. و [[.env]] في Git. و [[print(settings)]] وفيه سر من غير [[SecretStr]]. و [[from pydantic import BaseSettings]] (ده v1؛ في v2 اتنقلت لمكتبة منفصلة).`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف كل إعدادات التطبيق في class واحد [[Settings]]: كل حقل بيتملي من متغير بيئة بنفس الاسم أو من ملف [[.env]]، وبيتفحص ويتحوّل لنوعه. وبعدين بيعمل دالة بترجّع الإعدادات مرة واحدة (cache)، ويستخدمها كـ dependency في route. اتجرب بـ pydantic-settings 2.15 و FastAPI 0.142 و Python 3.14 على ويندوز.

---

## ١. الـ imports

~~~python
from functools import lru_cache
from typing import Annotated, Literal
from fastapi import Depends, FastAPI
from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
~~~

| الاسم | منين | بيعمل إيه |
|---|---|---|
| [[lru_cache]] | functools | بيحفظ ناتج الدالة، فتتنفّذ مرة واحدة |
| [[Depends]] | fastapi | يخلّي باراميتر ييجي من دالة (dependency) |
| [[PostgresDsn]] | pydantic | URL لازم يبدأ بـ [[postgresql://]] أو زيه |
| [[SecretStr]] | pydantic | string مبيتطبعش |
| [[BaseSettings]] | pydantic_settings | زي BaseModel بس بيقرا من البيئة |
| [[SettingsConfigDict]] | pydantic_settings | إعداداته |

[[pydantic_settings]] مكتبة **منفصلة** ([[pip install pydantic-settings]])، وجاية مع [[fastapi[standard]]].

---

## ٢. الكلاس

~~~python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")
~~~

- [[env_file=".env"]]: اقرا الملف ده كمان (لو موجود) من الفولدر اللي شغّلت منه.
- [[env_file_encoding="utf-8"]]: الملف UTF-8.
- [[extra="ignore"]]: لو [[.env]] فيه متغيرات ملهاش حقل، تجاهلها.

### الحقول

~~~python
    env: Literal["dev", "test", "prod"] = "dev"
    database_url: PostgresDsn
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: SecretStr
    cors_origins: list[str] = ["http://localhost:5173"]
    db_pool_size: int = 10
~~~

| الحقل | بيقرا من | إجباري؟ |
|---|---|---|
| [[env]] | [[ENV]]، وقيمه ٣ بس | لأ (dev) |
| [[database_url]] | [[DATABASE_URL]] | **أيوه** |
| [[redis_url]] | [[REDIS_URL]] | لأ |
| [[jwt_secret]] | [[JWT_SECRET]] | **أيوه** |
| [[cors_origins]] | [[CORS_ORIGINS]] كـ **JSON** | لأ |
| [[db_pool_size]] | [[DB_POOL_SIZE]] | لأ (10) |

اسم الحقل بالحروف الصغيرة بيلاقي المتغير بالكبيرة: المطابقة مش حساسة لحالة الحروف افتراضيًا.

---

## ٣. مرة واحدة: [[@lru_cache]]

~~~python
@lru_cache
def get_settings() -> Settings:
    return Settings()
~~~

[[Settings()]] من غير arguments = «اقرا كل حاجة من البيئة و .env وافحص». و [[@lru_cache]] بيحفظ الناتج: أول نداء بيقرا، والباقي بيرجّع نفس الـ object (جربنا [[get_settings() is get_settings()]] طلعت [[True]]).

## ٤. كـ dependency

~~~python
SettingsDep = Annotated[Settings, Depends(get_settings)]
app = FastAPI()
@app.get("/info")
async def info(settings: SettingsDep):
    return {"env": settings.env, "pool": settings.db_pool_size}
~~~

- [[Annotated[Settings, Depends(get_settings)]]]: «النوع Settings، والقيمة تيجي من نداء [[get_settings]]». بنديله اسم [[SettingsDep]] عشان نكرره بسهولة.
- [[settings: SettingsDep]]: FastAPI بينادي [[get_settings()]] ويديك الناتج. وفي الاختبارات تقدر تبدّلها ([[app.dependency_overrides]]).

---

## ٥. من غير [[.env]]

شغّلنا [[fastapi run main.py]] وطلبنا [[/info]]:

~~~text الناتج
Internal Server Error          ← 500 للعميل
~~~

~~~text اللي في الترمنال
INFO:     Application startup complete.
ERROR:    Exception in ASGI application
pydantic_core._pydantic_core.ValidationError: 2 validation errors for Settings
database_url
  Field required [type=missing, input_value={}, input_type=dict]
jwt_secret
  Field required [type=missing, input_value={}, input_type=dict]
~~~

السيرفر **قام عادي** ([[startup complete]])، والخطأ ظهر مع أول طلب، لأن [[get_settings()]] مبتتناداش غير ساعتها. عشان كده الأحسن تناديها في الـ lifespan (اللي بيشتغل وقت القيام): السيرفر يرفض يقوم بدل ما يقع مع أول مستخدم. والحلو إن الرسالة فيها **كل** المتغيرات الناقصة مرة واحدة.

---

## ٦. مع [[.env]]

~~~text .env
DATABASE_URL=postgresql://app:secret@localhost:5432/shop
JWT_SECRET=change-me-please-32-chars-minimum
CORS_ORIGINS=["https://shop.example.com"]
~~~

سطر لكل متغير، [[NAME=value]] من غير مسافات حوالين [[=]]. وطبعنا:

~~~text الناتج
/info                         → {'env': 'dev', 'pool': 10}
s.database_url                → PostgresDsn('postgresql://app:secret@localhost:5432/shop')
str(s.database_url)           → postgresql://app:secret@localhost:5432/shop
s.cors_origins                → ['https://shop.example.com']
s.db_pool_size                → 10  (int)
~~~

- [[database_url]] نوعه [[PostgresDsn]] مش str: لما تبعته لـ asyncpg اعمل [[str(...)]].
- [[cors_origins]] اتقرا JSON واتحوّل list.

### [[SecretStr]]

~~~text الناتج
print(s.jwt_secret)                  → **********
repr(s.jwt_secret)                   → SecretStr('**********')
s.jwt_secret.get_secret_value()      → change-me-please-32-chars-minimum
print(s)                             → ... jwt_secret=SecretStr('**********') ...
~~~

لو اللوج طبع الـ settings كلها، السر مش هيطلع. بس لاحظ إن [[database_url]] **طالع بالباسورد** ([[app:secret]]): [[PostgresDsn]] مش سر. لو مش عايزه يتطبع، خلّيه [[SecretStr]] وافحصه بنفسك، أو اقسمه لحقول.

---

## ٧. التجارب

متغير البيئة بيتحط **للأمر ده بس** في Git Bash كده: [[DB_POOL_SIZE=abc python ...]]. وفي PowerShell: [[$env:DB_POOL_SIZE = "abc"]] قبل الأمر (بيفضل لحد ما تقفل الترمنال بس، مش دايم).

| جربنا | النتيجة |
|---|---|
| [[DB_POOL_SIZE=abc]] | الإعدادات وقعت والخطأ فيه اسم الحقل: [[db_pool_size Input should be a valid integer, unable to parse string as an integer]] |
| [[DB_POOL_SIZE=25 ENV=prod]] | [[25 prod]]: [[25]] اتحوّل int |
| [[ENV=staging]] | اترفضت والرسالة بتقول القيم المسموحة: [[Input should be 'dev', 'test' or 'prod']] |
| [[DATABASE_URL=mysql://x@h/db]] | [[PostgresDsn]] رفض أي URL مش Postgres: [[URL scheme should be 'postgres', 'postgresql', 'postgresql+asyncpg', ...]] |
| [[CORS_ORIGINS=https://a.com]] (مش JSON) | المكتبة حاولت تقراها JSON وفشلت: [[SettingsError: error parsing value for field "cors_origins" from source "EnvSettingsSource"]]، والحل [[NoDecode]] (تحت) |
| [[$env:DATABASE_URL]] غير اللي في .env | متغير البيئة **كسب** |
| [[Settings(db_pool_size=3)]] | [[3]]: الـ argument كسب على الكل |

### الأولوية

~~~text
Settings(x=...)  >  متغيرات البيئة  >  .env  >  الـ default
~~~

يعني على السيرفر حط المتغيرات الحقيقية في البيئة (Docker أو systemd)، و [[.env]] لجهازك بس.

---

---

## اتشغّل فعلًا: بادئة، وإعدادات متداخلة، وقايمة بفاصلة

على السيرفر الواحد ممكن يبقى فيه ٣ تطبيقات، وكل واحد عايز [[DEBUG]] بتاعه. البادئة بتحل ده، و [[__]] بيوصل للموديلات المتداخلة. اتجرب على pydantic-settings 2.16 و Python 3.14:

~~~python
class Db(BaseModel):
    host: str = "localhost"
    port: int = 5432
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="SHOP_", env_nested_delimiter="__")
    db: Db = Db()
    debug: bool = False
    cors_origins: Annotated[list[str], NoDecode] = []
    @field_validator("cors_origins", mode="before")
    @classmethod
    def split(cls, v):
        return [x.strip() for x in v.split(",") if x.strip()] if isinstance(v, str) else v
~~~

والبيئة: [[SHOP_DB__HOST=db]] و [[SHOP_DB__PORT=6543]] و [[SHOP_DEBUG=yes]] و [[DEBUG=0]] و [[SHOP_CORS_ORIGINS=https://a.com, https://b.com]].

~~~text الناتج
db=Db(host='db', port=6543) debug=True cors_origins=['https://a.com', 'https://b.com']
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[env_prefix="SHOP_"]] | كل حقل بيدوّر على اسمه وقدامه [[SHOP_]]، فـ [[DEBUG=0]] اتجاهل خالص و [[SHOP_DEBUG]] بس اللي اتقري |
| [[env_nested_delimiter="__"]] | [[SHOP_DB__PORT]] معناها «حقل [[port]] جوه [[db]]»، والنص [["6543"]] اتحوّل [[int]] |
| [[NoDecode]] | بيقول للمكتبة متحاولش تقرا القيمة كـ JSON، وسيبها نص للـ validator |
| validator [[mode="before"]] | بيقسم على الفاصلة ويشيل المسافات، والقيمة الفاضية بقت [[[]]] (اتجرب) |

### فخ الـ cache في الاختبارات

~~~text الناتج
get_settings().db.port                 → 6543
SHOP_DB__PORT=7777 ثم get_settings()  → 6543   ← [[lru_cache]] رجّع القديم
get_settings.cache_clear() ثم تاني    → 7777
~~~

الاختبار اللي بيغيّر البيئة وبيستنى قيمة جديدة لازم [[cache_clear()]]، والأحسن أصلًا [[dependency_overrides]] (درس «dependency_overrides») عشان الاختبار ميلمسش البيئة خالص.

## الخلاصة

- [[BaseSettings]] = موديل بيتملي من البيئة و [[.env]]، بنفس الفحص.
- حقل من غير default = متغير لازم يتعرّف، والخطأ بيقول اسمه.
- list و dict بيتكتبوا JSON في المتغير.
- [[SecretStr]] للأسرار، و [[get_secret_value()]] وقت الاستخدام بس.
- [[@lru_cache]] + [[Depends]]: مرة واحدة، وسهل تبدّلها في الاختبار.
- [[.env]] في [[.gitignore]] دايمًا.`,
          lines: [
            R`[[lru_cache]] بيحفظ نتيجة الدالة أول مرة، فـ [[get_settings()]] بتقرا البيئة و [[.env]] مرة واحدة بس مش مع كل request.`,
            R`[[Annotated]] عشان نعمل [[SettingsDep]] تحت، و [[Literal]] لحقل [[env]] اللي بيقبل ٣ قيم بس.`,
            R`[[Depends]] عشان الإعدادات توصل للـ routes كـ dependency (تتبدّل في الاختبارات)، و [[FastAPI]] للتطبيق.`,
            R`[[PostgresDsn]] نوع بيفحص إن الـ URL فعلًا Postgres ([[postgresql://...]])، و [[SecretStr]] بيخبي القيمة لما تتطبع: [[**********]].`,
            R`[[BaseSettings]] موديل بيملّي حقوله من متغيرات البيئة، و [[SettingsConfigDict]] إعداداته. المكتبة منفصلة: [[pip install pydantic-settings]] (جاية مع [[fastapi[standard]]] الحديث).`,
            R`كل الإعدادات في class واحد. كل حقل بيدوّر على متغير بيئة بنفس الاسم من غير حساسية لحالة الحروف: [[database_url]] بياخد [[DATABASE_URL]].`,
            R`[[env_file=".env"]] بيقرا الملف ده كمان لو موجود (ومش بيقع لو مش موجود)، و [[extra="ignore"]] بيتجاهل أي سطر في [[.env]] ملوش حقل بدل ما يرفض.`,
            R`[[env]] من [[ENV]]، وبيقبل [[dev]] و [[test]] و [[prod]] بس. [[ENV=staging]] بيوقّع الإعدادات برسالة فيها القيم المسموحة.`,
            R`إجباري: ملوش default، ولو [[DATABASE_URL]] ناقص أو مش Postgres أول ما الإعدادات تتقري بيطلع خطأ فيه اسم الحقل بالظبط.`,
            R`ليه default، فلو متعرّفش في البيئة بيستخدم Redis المحلي. الـ defaults للتطوير بس، والإنتاج بيكتبها في البيئة.`,
            R`السر نوعه [[SecretStr]]: [[print]] و [[repr]] واللوج بيطبعوا نجوم، والقيمة الحقيقية بـ [[get_secret_value()]] في المكان اللي محتاجها بس.`,
            R`[[list[str]]] بتتقري من المتغير كـ **JSON**: [[CORS_ORIGINS=["https://a.com"]]]. لو كتبتها مفصولة بفاصلة بس بتقع بـ [[SettingsError]] (والحل [[NoDecode]] تحت).`,
            R`[[DB_POOL_SIZE=25]] في البيئة نص، و Pydantic بيحوّله [[int]]. و [[abc]] بترجع خطأ [[int_parsing]] باسم الحقل.`,
            R`[[@lru_cache]] على الدالة: أول نداء بيعمل [[Settings()]]، والباقي بيرجّع نفس الـ object. وفي الاختبارات لو غيّرت البيئة محتاج [[get_settings.cache_clear()]].`,
            R`الدالة اللي بترجّع الإعدادات. استخدمها هي بدل [[Settings()]] في كل مكان، عشان تبقى نقطة واحدة تتبدّل في الاختبار.`,
            R`هنا بيحصل كل الشغل: قراية البيئة و [[.env]] والفحص والتحويل. لو حاجة ناقصة بيرمي [[ValidationError]] فيها كل الأخطاء مرة واحدة.`,
            R`نوع جاهز للـ dependency: [[settings: SettingsDep]] في أي route بدل ما تكتب [[Annotated[Settings, Depends(get_settings)]]] كل مرة (القسم الجاي).`,
            R`التطبيق. في مشروع حقيقي نادي [[get_settings()]] في الـ lifespan، عشان الإعدادات الناقصة توقّع التطبيق وهو بيقوم.`,
            R`route بيرجّع جزء من الإعدادات، عشان تشوف القيم اتقرت منين.`,
            R`الإعدادات وصلت كـ dependency، فالاختبار يقدر يعمل [[app.dependency_overrides[get_settings]]] بإعدادات تانية من غير ما يلمس البيئة.`,
            R`بيرجّع [[env]] و [[db_pool_size]] بس. متكتبش [[return settings]] كلها: حتى مع [[SecretStr]] بتكشف URL القاعدة وأسماء الخدمات.`,
          ],
          sol: R`من غير [[.env]]، [[/info]] بترجع [[500 Internal Server Error]]، والترمنال فيه [[2 validation errors for Settings]] وتحتها [[database_url Field required]] و [[jwt_secret Field required]]. التطبيق قام عادي لأن [[get_settings()]] مبتتناداش غير مع أول طلب، وده سبب إنك تناديها في الـ lifespan: الأحسن السيرفر يرفض يقوم بدل ما يقوم ويقع مع أول مستخدم.

بعد ما تعمل [[.env]]: [[print(settings.jwt_secret)]] بيطبع [[**********]] و [[repr]] بيطبع [[SecretStr('**********')]]، و [[get_secret_value()]] بس هي اللي بترجع القيمة الحقيقية، فلو اللوج طبع الـ settings كلها السر مش هيتسرّب. و [[CORS_ORIGINS=["https://shop.example.com"]]] بيتقري كـ JSON ويبقى list. و [[DB_POOL_SIZE=abc]] بيطلّع [[db_pool_size Input should be a valid integer, unable to parse string as an integer]]. ومتغيرات البيئة الحقيقية بتكسب على [[.env]].`
        }
      ]
    }
]);
