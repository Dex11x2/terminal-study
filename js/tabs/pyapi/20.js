// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Django: المشروع والـ ORM",
      l: 2,
      time: R`حوالي ٨ ساعات (٧ دروس، وكل درس فيه تمارين)`,
      goal: [
        R`تعمل مشروع Django من الصفر وتعرف كل ملف فيه، والإعدادات من الـ environment ولكل بيئة.`,
        R`تكتب الجداول كـ models وتدير الـ migrations في فريق: data migration، وتعارض، و squash.`,
        R`تسأل القاعدة بالـ ORM من غير SQL، وتخليها هي اللي تحسب، وتقرا الـ SQL اللي اتبعت.`,
        R`تقيس عدد الـ queries وتصلّح N+1، وتحمي المخزون من طلبين في نفس اللحظة بالـ transactions.`,
        R`تعرف إمتى signal وإمتى دالة service صريحة.`,
      ],
      use: {
        prog: R`ده الأساس اللي الـ admin والـ views و DRF مبنيين عليه في الوحدتين الجايين: كل حاجة هناك بتقرا الـ models وبتعمل QuerySets.`,
        work: R`أغلب شغل Django اليومي: model جديد أو حقل، و migration، و query لصفحة أو تقرير، وتصليح صفحة بطيئة بعدد الـ queries.`,
        cs: R`lazy evaluation في الـ QuerySet، و ACID والـ race conditions في الـ transactions، و Observer pattern في الـ signals، والـ migrations كـ graph.`,
        net: R`كل query رحلة للقاعدة على الشبكة، فعدد الـ queries هو اللي بيحدد سرعة الصفحة لما القاعدة على سيرفر تاني.`,
      },
      lab: R`mkdir -p ~/lab/django && cd ~/lab/django && python3 -m venv .venv && . .venv/bin/activate && pip install "django==6.1.2" "psycopg[binary]"`,
      projects: [
        { lvl: 'صغير', t: R`مدونة بـ model واحد`, what: R`مشروع [[blog]] فيه app [[posts]] و model [[Post]] فيه [[title]] و [[slug]] unique و [[body]] و [[published_at]] (nullable) و [[is_draft]]. الإعدادات من env (المفتاح و DEBUG)، و [[__str__]] و [[Meta.ordering]]. من دروس startproject و settings و models.`, done: R`[[python manage.py check]] بيعدّي، و [[check]] من غير [[DJANGO_SECRET_KEY]] بيقع برسالة فيها اسم المتغير، و [[sqlmigrate posts 0001]] فيه [[UNIQUE]] على الـ slug، و [[.env]] في [[.gitignore]] ومعاه [[.env.example]].` },
        { lvl: 'صغير', t: R`تقرير المخزون في أمر`, what: R`أمر إداري [[python manage.py stock_report]] (ملف في [[shop/management/commands/]]) بيطبع لكل قسم: عدد المنتجات والخلصانة وقيمة المخزون بالجنيه، بـ query واحدة ([[annotate]] و [[Count(filter=Q(...))]] و [[Sum(F*F)]]). من درس «QuerySet و filter».`, done: R`الأمر بيطبع جدول بعمدان متظبطة، و [[CaptureQueriesContext]] حوالين الحسبة بيقول [[1]]، والأرقام مطابقة لحسبة بإيدك على قسمين، والأمر بيشتغل على قاعدة فاضية من غير error (بيطبع «مفيش أقسام»).` },
        { lvl: 'متوسط', t: R`مكتبة بالعلاقات كلها`, what: R`app [[library]] فيها [[Author]] و [[Book]] (ForeignKey للمؤلف و [[ManyToManyField]] لـ [[Tag]]) و [[Loan]] (كتاب ويوزر وتاريخ إرجاع). [[BookQuerySet]] فيه [[available()]] و [[overdue()]]، وصفحة list بتعرض المؤلف والتاجز من غير N+1. من دروس models و QuerySet و select_related.`, done: R`[[Book.objects.available().select_related("author").prefetch_related("tags")]] على ٢٠٠ كتاب = [[2]] queries، واختبار بـ [[assertNumQueries(2)]] بيعدّي، و [[overdue()]] بترجّع الإعارات اللي تاريخها فات بس، ومسح مؤلف ليه كتب بيرمي [[ProtectedError]].` },
        { lvl: 'متوسط', t: R`migration آمنة على داتا حقيقية`, what: R`على قاعدة فيها ١٠٠٠ منتج: زوّد [[sku]] unique وإجباري على ٣ migrations (nullable، و [[RunPython]] بيعمل [[sku]] من القسم والـ id ومعاه reverse و [[elidable=True]]، وبعدين required)، وبعدين اعمل [[squashmigrations]] للـ app. من درس «models و makemigrations».`, done: R`كل الـ ١٠٠٠ ليهم [[sku]] مختلف، و [[migrate shop <قبل الـ sku>]] بيرجع من غير [[IrreversibleError]] وبعدها [[migrate]] بيملاهم تاني، والـ squash بيتطبّق على قاعدة Postgres **فاضية** من غير error، و [[makemigrations --check]] بيرجع [[0]].` },
        { lvl: 'كبير', t: R`محرك طلبات متجر متين`, what: R`app [[orders]] فيها [[Order]] و [[OrderItem]]، ودالة [[place_order(user, items)]] جوه [[atomic]] بتقفل المنتجات بـ [[select_for_update]] بترتيب الـ id، وبترفض لو أي منتج مش كفاية من غير ما تلمس الباقي، وبتحسب الإجمالي في القاعدة، وبتسجّل كل محاولة في لوج ([[logging]])، وبتبعت إيميل التأكيد في [[on_commit]]. وأمر [[simulate_rush]] بيشغّل ٥٠ thread على آخر ١٠ قطع. من دروس QuerySet و transaction.atomic و signals.`, done: R`على Postgres: [[simulate_rush]] بيطبع ١٠ نجحوا و ٤٠ اترفضوا، والمخزون صفر بالظبط، وعدد الإيميلات ١٠ (console backend)، واللوج فيه سطر لكل محاولة بالـ id والنتيجة. والأمر بيتشغّل مرتين ورا بعض (بيرجّع المخزون الأول) بنفس النتيجة، والاختبارات بتعدّي بـ [[django_db(transaction=True)]].`, ext: R`زوّد كوبونات بحد استخدام (نفس مشكلة السباق)، و [[skip_locked]] لطابور تجهيز الطلبات، و [[django.tasks]] للإيميل، و endpoint في DRF في الوحدة الجاية.` },
        { lvl: 'فكرة', t: R`نظام حجز من اختيارك`, what: R`اختار حاجة فيها «آخر مكان» حقيقي: كراسي سينما، أو مواعيد دكتور، أو ملاعب، أو غرف. صمّم الـ models والـ constraints ([[UniqueConstraint]] على المكان والوقت)، والـ queries بتاعة «المتاح»، ودالة حجز آمنة من السباق، وأمر بيطلّع تقرير الإشغال. انت اللي بتقرر التفاصيل.`, done: R`فيه README بيشرح الـ models والقرار في كل [[on_delete]]، واختبار بيحاول يحجز نفس المكان من ١٠ threads ومفيش غير حجز واحد بينجح، وتقرير الإشغال query واحدة، و [[check]] و [[makemigrations --check]] بيعدّوا في CI.`, ext: R`زوّد إلغاء الحجز بمهلة، وقايمة انتظار بتاخد أول مكان يفضى ([[skip_locked]])، وتذكير قبل الميعاد بـ task، ولوحة admin للموظفين في الوحدة الجاية.` },
      ],
      n: "Django framework كامل: مشروع فيه apps، وإعدادات من الـ environment ولكل بيئة، و models بتتحول جداول بـ migrations (ومعاها data migrations و squash)، و ORM بيكتب الـ SQL، وعدد الـ queries بيتقاس، و transactions بتحمي من نص عملية ومن طلبين مع بعض، و signals وإمتى متستخدمهاش",
      items: [
        {
          cmd: "django-admin startproject",
          title: "أول مشروع Django: startproject و startapp و runserver",
          desc: R`[[django-admin startproject config .]] بيعمل هيكل المشروع ([[manage.py]] وفولدر إعدادات اسمه [[config]])، و [[python manage.py startapp shop]] بيعمل app جوه المشروع، و [[migrate]] بيعمل جداول Django الأساسية، و [[runserver]] بيشغّل سيرفر التطوير على [[http://127.0.0.1:8000]].

المشروع (project) هو الموقع كله بإعداداته، والـ app حتة منه ليها models و views بتوعها (shop، accounts، blog). المشروع الواحد فيه apps كتير. والـ venv نفسه وتفعيله على كل نظام في درس «python3 -m venv .venv» في تاب Python.`,
          deep: {
            why: R`Django بيجيلك «بالبطاريات»: ORM و migrations و admin و auth و templates و forms وحماية CSRF و sessions، كلهم جوه حزمة واحدة ومتظبطين مع بعض. فمشروع فيه يوزرز ولوحة تحكم وقاعدة بيانات بيقوم في ساعات مش أيام. وهو من أقدم وأشهر frameworks الـ Python (Instagram بدأ بيه)، فهتقابله في شغل كتير.`,
            how: R`[[django-admin]] أمر بيتسطّب مع الحزمة. [[startproject config .]] بيعمل [[manage.py]] في الفولدر الحالي (النقطة)، وفولدر [[config]] فيه [[settings.py]] و [[urls.py]] و [[wsgi.py]] و [[asgi.py]]. لو شلت النقطة هيعمل فولدر زيادة بنفس الاسم فوقهم.

[[manage.py]] هو نفس [[django-admin]] بس عارف ملف الإعدادات: جواه [[DJANGO_SETTINGS_MODULE=config.settings]]. فمن هنا ورايح كل أمر بيبقى [[python manage.py ...]].

[[startapp shop]] بيعمل فولدر فيه [[models.py]] و [[views.py]] و [[admin.py]] و [[apps.py]] و [[tests.py]] وفولدر [[migrations]]. والـ app مبيشتغلش لحد ما تضيف اسمه في [[INSTALLED_APPS]] في الإعدادات.

[[migrate]] بيطبّق الـ migrations الجاهزة لـ apps Django الأساسية (auth و admin و sessions و contenttypes)، فبيعمل جداول اليوزرز والصلاحيات والـ sessions في [[db.sqlite3]]. و [[runserver]] سيرفر للتطوير بس: بيعيد التشغيل لوحده لما تحفظ ملف، ومش معمول للـ traffic الحقيقي ولا للأمان (درس «Django في الإنتاج» فيه gunicorn).`,
            when: R`موقع أو API فيه داتا كتير وعلاقات ويوزرز ولوحة تحكم للفريق: متجر، نظام حجوزات، CMS، لوحة إدارة داخلية. ولو API صغير سريع ومعظمه async، FastAPI أخف (المقارنة في درس «Flask ولا FastAPI ولا Django»).`,
            mistakes: R`تنسى النقطة في [[startproject config .]] فيبقى عندك [[config/config/settings.py]] وتتلخبط في المسارات. وتسمّي المشروع أو الـ app باسم مكتبة موجودة: [[startapp email]] و [[startapp django]] اترفضوا بـ [[CommandError: 'email' conflicts with the name of an existing Python module]]. و [[test]] اتقبل مرة على ويندوز (Python المسطّب هنا من غير package [[test]] بتاعة المكتبة) واترفض في المرة التانية لما الفولدر بقى موجود، فمتعتمدش على اسم زي ده. وتعمل [[startapp]] وتنسى تضيفه في [[INSTALLED_APPS]]، فالـ models بتاعته مبتطلعش في [[makemigrations]]. وتسطّب Django بره الـ venv. وتشغّل [[runserver]] على سيرفر حقيقي.`
          },
          teach: R`## المثال بيعمل إيه؟

سبع خطوات بتاخدك من فولدر فاضي لموقع Django شغال: venv، وتسطيب Django، والمشروع، وأول app، وجداول Django الأساسية، والسيرفر. اتشغّل بـ Django 6.1.2 على لينكس (python:3.13-slim في Docker)، وعلى ويندوز في PowerShell 7 بـ Python 3.14. وأوامر الماك نفس لينكس (من الـ docs، مفيش ماك هنا).

---

## ١. الـ venv وتسطيب Django

~~~bash
python3 -m venv .venv
source .venv/bin/activate
pip install "django==6.1.2"
~~~

- [[python3 -m venv .venv]]: بيعمل بيئة معزولة في فولدر [[.venv]]، فالحزم بتتسطب جوه المشروع مش على الجهاز كله. على ويندوز الأمر [[python -m venv .venv]].
- [[source .venv/bin/activate]]: بيفعّلها، فـ [[python]] و [[pip]] يبقوا بتوع الـ venv. على ويندوز [[.\.venv\Scripts\Activate.ps1]]. التفاصيل ومشكلة execution policy في درس «python3 -m venv .venv» في تاب Python.
- [[pip install "django==6.1.2"]]: [[==]] بتثبّت النسخة بالظبط، والعلامات [[" "]] عشان الـ shell ميفهمش [[=]] غلط. Django 6 محتاج Python 3.12 أو أحدث (الـ metadata بتاعة الحزمة بتقول [[Requires-Python >=3.12]]).

اتأكد إنه اتسطّب:

~~~bash
django-admin --version
~~~

~~~text اتشغّل فعلًا · الناتج
6.1.2
~~~

على ويندوز، بعد التفعيل، [[(Get-Command python).Source]] طلّع مسار [[...\win-dj\.venv\Scripts\python.exe]]، يعني الـ python بقى بتاع الـ venv فعلًا.

---

## ٢. [[django-admin startproject config .]]

| الحتة | معناها |
|---|---|
| [[django-admin]] | أداة Django اللي اتسطبت مع الحزمة |
| [[startproject]] | اعمل مشروع جديد |
| [[config]] | اسم فولدر الإعدادات. ناس كتير بتسمّيه باسم المشروع، و [[config]] اسم واضح بيقول هو فيه إيه |
| [[.]] | اعمله **هنا** في الفولدر الحالي، من غير فولدر زيادة فوقه |

## ٣. [[python manage.py startapp shop]]

بيعمل app اسمها [[shop]]. ودي الملفات بعد الأمرين (من لينكس):

~~~text الناتج
./config/__init__.py
./config/asgi.py
./config/settings.py
./config/urls.py
./config/wsgi.py
./manage.py
./shop/__init__.py
./shop/admin.py
./shop/apps.py
./shop/migrations/__init__.py
./shop/models.py
./shop/tests.py
./shop/views.py
~~~

| الملف | بتاع إيه |
|---|---|
| [[manage.py]] | بوابة كل الأوامر. زي [[django-admin]] بس عارف إن الإعدادات في [[config.settings]] |
| [[config/settings.py]] | كل الإعدادات: الـ apps والقاعدة والـ middleware والمفتاح السري |
| [[config/urls.py]] | أول جدول URLs، منه بيتوزع على الـ apps |
| [[config/wsgi.py]] و [[config/asgi.py]] | نقطة الدخول لسيرفر الإنتاج: WSGI (زي gunicorn) أو ASGI (زي uvicorn) |
| [[shop/models.py]] | الجداول كـ classes |
| [[shop/views.py]] | الدوال اللي بترد على الطلبات |
| [[shop/admin.py]] | تسجيل الـ models في لوحة الـ admin |
| [[shop/migrations/]] | ملفات تغييرات الجداول، بتتعمل commit مع الكود |
| [[__init__.py]] | بيخلي الفولدر package يتعمله import |

### جوه [[settings.py]]

أهم الأجزاء اللي startproject كتبها في Django 6.1.2:

~~~python
SECRET_KEY = 'django-insecure-...'
DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
ROOT_URLCONF = 'config.urls'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
~~~

- [[SECRET_KEY]]: بيوقّع الـ sessions والـ tokens. الكلمة [[django-insecure-]] في أوله تحذير: ده للتطوير بس، ودرس «settings من env» بيطلّعه من الكود.
- [[DEBUG = True]]: صفحات أخطاء فيها الكود والإعدادات. ممنوعة في الإنتاج.
- [[ALLOWED_HOSTS = []]]: أسماء الدومين اللي السيرفر يقبلها. فاضية + [[DEBUG]] شغال = [[localhost]] و [[127.0.0.1]] بس.
- [[INSTALLED_APPS]]: الـ apps المتفعّلة. لازم تزوّد [[shop]] هنا بإيدك عشان Django يشوف الـ models بتاعتها.
- [[DATABASES]]: SQLite في ملف [[db.sqlite3]] جنب [[manage.py]]. مفيش سيرفر قاعدة تسطّبه وإنت بتتعلم.

> ملحوظة: [[DEFAULT_AUTO_FIELD]] مبقاش موجود في الملف. من Django 6.0 الافتراضي بقى [[BigAutoField]] (الـ id بقى [[bigint]])، فـ startproject بطّل يكتبه.

---

## ٤. [[python manage.py migrate]]

~~~text الناتج (أوله)
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
  Applying sessions.0001_initial... OK
~~~

دي ١٨ migration جاهزين مع Django، بيعملوا جداول اليوزرز ([[auth_user]])، والصلاحيات، وسجل الـ admin، والـ sessions. لو شغّلت [[runserver]] من غير ما تعمل migrate، بيقولك:

~~~text الناتج
You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
~~~

---

## ٥. [[python manage.py runserver]]

~~~text الناتج (لينكس)
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
October 27, 2026 - 18:55:42
Django version 6.1.2, using settings 'config.settings'
Starting WSGI development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

WARNING: This is a development server. Do not use it in a production setting. Use a production WSGI or ASGI server instead.
[27/Oct/2026 18:55:44] "GET / HTTP/1.1" 200 12149
~~~

| السطر | معناه |
|---|---|
| [[Watching for file changes with StatReloader]] | بيراقب الملفات، ولما تحفظ يعيد التشغيل لوحده |
| [[System check identified no issues]] | Django فحص الإعدادات والـ models قبل ما يقوم ([[python manage.py check]] بيعمل نفس الفحص لوحده) |
| [[Starting WSGI development server at http://127.0.0.1:8000/]] | العنوان. افتحه في المتصفح |
| [[WARNING: This is a development server]] | تحذير صريح: مش للإنتاج |
| [[GET / HTTP/1.1" 200 12149]] | لوج كل طلب: الـ method والمسار والـ status وحجم الرد بالـ bytes |

الصفحة الرئيسية بتقول «The install worked successfully! Congratulations!». دي بتظهر بس وإنت لسه معملتش URLs ودي [[DEBUG]] شغال. وأي مسار تاني (زي [[/nope]]) بيرجع [[404]].

و [[runserver 0.0.0.0:8000]] بيخليه يسمع على كل الكروت، وده اللي استخدمته جوه Docker عشان أوصل له. على ويندوز اتشغّل بنفس الأمر، و [[Invoke-WebRequest http://127.0.0.1:8000/]] رجّع [[200]].

> runserver بيقوم كـ process اتنين: واحدة بتراقب الملفات وواحدة بتخدم. [[Ctrl+C]] في نفس الترمنال بيقفل الاتنين.

---

## نفس الخطوات على كل نظام

| الخطوة | لينكس والماك | ويندوز (PowerShell) |
|---|---|---|
| venv | [[python3 -m venv .venv]] | [[python -m venv .venv]] |
| تفعيل | [[source .venv/bin/activate]] | [[.\.venv\Scripts\Activate.ps1]] |
| الباقي | [[pip install]] و [[django-admin]] و [[python manage.py ...]] | نفس الأوامر بالظبط |

## الخلاصة

- [[startproject config .]] مرة واحدة للمشروع، و [[startapp]] لكل جزء، وضيف الـ app في [[INSTALLED_APPS]].
- كل الأوامر بعد كده [[python manage.py ...]].
- [[migrate]] قبل أول [[runserver]].
- [[runserver]] للتطوير بس، والإعدادات اللي startproject كتبها ([[SECRET_KEY]] و [[DEBUG]]) لازم تتغير قبل الإنتاج.`,
          example: R`# Linux and Mac:
python3 -m venv .venv
source .venv/bin/activate
pip install "django==6.1.2"
django-admin startproject config .
python manage.py startapp shop
python manage.py migrate
python manage.py runserver
# Windows (PowerShell):
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install "django==6.1.2"
django-admin startproject config .
python manage.py startapp shop
python manage.py migrate
python manage.py runserver`,
          learn: R`تعمل مشروع Django من فولدر فاضي: venv وتسطيب، و [[startproject]] و [[startapp]]، وجداول Django الأساسية، وسيرفر التطوير، وتعرف كل ملف اتعمل بتاع إيه.`,
          out: R`موقع شغال على [[http://127.0.0.1:8000/]] وصفحة دخول الـ admin، وفاهم الفرق بين المشروع والـ app.`,
          use: {
            prog: R`كل مشروع Django بيبدأ بنفس الأوامر الخمسة، وأي tutorial أو مشروع مفتوح المصدر هتلاقي فيه نفس الهيكل ([[manage.py]] وفولدر الإعدادات والـ apps).`,
            work: R`أول يوم في شغل فيه Django: تعمل clone، و venv، و [[pip install -r requirements.txt]]، و [[migrate]]، و [[runserver]]. نفس الخطوات اللي هنا.`,
          },
          lines: [
            R`لينكس والماك: [[python3 -m venv .venv]] بيعمل فولدر [[.venv]] جوه المشروع فيه نسخة Python خاصة بيه و [[pip]] خاص بيه. أي حزمة هتتسطب بعد كده تروح هنا مش على الجهاز كله، فمشروعين على نفس الجهاز يقدروا يستخدموا نسختين Django مختلفين.`,
            R`[[source .venv/bin/activate]] بيغيّر الـ PATH في الترمنال ده بس، فـ [[python]] و [[pip]] يبقوا اللي جوه [[.venv]]. هتلاقي [[(.venv)]] ظهرت في أول الـ prompt. لو قفلت الترمنال لازم تفعّلها تاني.`,
            R`[[pip install "django==6.1.2"]] بيسطّب Django بالنسخة دي بالظبط. [[==]] بتثبّت النسخة عشان كل اللي في الفريق والسيرفر يبقوا على نفس الحاجة، والعلامات [[" "]] عشان الـ shell ميفهمش [[=]] أو [[>]] كأوامر. Django 6 محتاج Python 3.12 أو أحدث.`,
            R`[[django-admin startproject config .]] بيعمل [[manage.py]] في الفولدر الحالي (ده معنى النقطة) وفولدر اسمه [[config]] فيه [[settings.py]] و [[urls.py]] و [[wsgi.py]] و [[asgi.py]]. من غير النقطة هيعمل فولدر زيادة فوقهم بنفس الاسم.`,
            R`[[python manage.py startapp shop]] بيعمل فولدر [[shop]] فيه [[models.py]] و [[views.py]] و [[admin.py]] وفولدر [[migrations]]. الـ app مش هتشتغل لحد ما تضيف [["shop"]] بإيدك في [[INSTALLED_APPS]] في [[config/settings.py]].`,
            R`[[python manage.py migrate]] بيطبّق ١٨ migration جاهزين مع Django، فبيعمل جداول اليوزرز والصلاحيات والـ sessions وسجل الـ admin في ملف [[db.sqlite3]] جنب [[manage.py]]. من غيره [[runserver]] هيشتغل بس هيحذّرك إن فيه migrations ناقصة والـ admin مش هيفتح.`,
            R`[[python manage.py runserver]] بيشغّل سيرفر تطوير على [[http://127.0.0.1:8000]]، وبيراقب الملفات فبيعيد التشغيل لوحده لما تحفظ. للتطوير بس: مش آمن ومش معمول لطلبات كتير (الإنتاج بـ gunicorn في درس «Django في الإنتاج»).`,
            R`ويندوز: [[python -m venv .venv]] نفس الأمر بس اسم البرنامج [[python]] مش [[python3]]، لأن مسطّب Python لويندوز بيسجّل الاسم ده (وفيه كمان [[py]] launcher).`,
            R`[[.\.venv\Scripts\Activate.ps1]] سكربت التفعيل بتاع PowerShell (على ويندوز الفولدر اسمه [[Scripts]] مش [[bin]]). لو طلع error عن execution policy، الحل في درس «python3 -m venv .venv» في تاب Python.`,
            R`[[pip install "django==6.1.2"]] على ويندوز نفس السطر حرف بحرف، لأن [[pip]] دلوقتي بتاع الـ venv. اتأكد بـ [[(Get-Command python).Source]] إنه بيشاور على [[.venv\Scripts\python.exe]].`,
            R`[[django-admin startproject config .]] على ويندوز بيعمل نفس الهيكل بالظبط ([[manage.py]] و [[config]])، و [[django-admin]] اتسطّب في [[.venv\Scripts]] فبيشتغل طول ما الـ venv متفعّلة.`,
            R`[[python manage.py startapp shop]] على ويندوز بيعمل نفس فولدر [[shop]] بنفس الملفات، وبرضه محتاج تضيفه في [[INSTALLED_APPS]] بإيدك.`,
            R`[[python manage.py migrate]] على ويندوز بيطبّق نفس الـ ١٨ migration ويعمل [[db.sqlite3]] في نفس فولدر المشروع.`,
            R`[[python manage.py runserver]] على ويندوز بيقوم على نفس العنوان، و [[Invoke-WebRequest http://127.0.0.1:8000/]] من ترمنال تاني بيرجّع [[200]]. اقفله بـ [[Ctrl+C]] في نفس الترمنال.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص فوق، اكتب الأوامر الستة بالترتيب من فولدر فاضي لحد صفحة «The install worked successfully!»، وبعدين نفّذها في فولدر جديد اسمه [[blog]] بـ app اسمها [[posts]].`, done: R`الصفحة بتفتح على [[http://127.0.0.1:8000/]]، و [[python manage.py showmigrations]] كل سطوره فيها [[[X]]]، و [[posts]] متضافة في [[INSTALLED_APPS]] و [[python manage.py check]] بيقول [[no issues]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب على ورقة: لو عملت [[django-admin startproject config]] (من غير النقطة) جوه فولدر [[site1]]، مسار [[settings.py]] هيبقى إيه؟ ولو شغّلت [[runserver]] قبل [[migrate]] هيطبع إيه؟ وبعدين جرّب الاتنين.`, done: R`المسار طلع [[site1/config/config/settings.py]] زي ما كتبت، و [[runserver]] طبع [[You have 18 unapplied migration(s)]] وبرضه قام، وبعد [[migrate]] نفس الأمر مبقاش بيطبع التحذير.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** زميلك عمل [[python manage.py startapp email]] وطلعله error. وواحد تاني عمل app اسمها [[store]] وكتب model فيها و [[makemigrations]] بيقول [[No changes detected]]. لاقي سبب كل واحدة وصلّحها.`, done: R`الأولى: Django رفض الاسم برسالة [[CommandError: 'email' conflicts with the name of an existing Python module]] (نفس الكلام مع [[django]])، واخترت اسم زي [[mailer]] فاتعمل. والتانية: [[store]] كانت ناقصة من [[INSTALLED_APPS]]، وبعد ما ضفتها [[makemigrations store]] عمل [[0001_initial.py]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[python manage.py help]] و [[python manage.py help runserver]] بس (من غير النت)، شغّل السيرفر على بورت [[8080]] ومن غير ما يعيد التشغيل لما تحفظ، وبعدين لاقي الأمر اللي بيطبع كل الإعدادات اللي مختلفة عن الافتراضي.`, done: R`[[python manage.py runserver 8080 --noreload]] شغال ولما تعدّل [[views.py]] مبيطبعش [[changed, reloading]]، و [[python manage.py diffsettings]] بيطبع سطور زي [[INSTALLED_APPS = [...]]] و [[ROOT_URLCONF = 'config.urls']] اللي startproject كتبها.` },
          ],
          try: R`اعمل المشروع على جهازك، وافتح [[http://127.0.0.1:8000/]] وبعدين [[http://127.0.0.1:8000/admin/]]. وبعدين جرّب [[python manage.py check]] و [[python manage.py help]] وشوف الأوامر المتاحة. وأخيرًا شيل النقطة من [[startproject]] في فولدر تاني وقارن شكل الفولدرات.`,
          sol: R`الصفحة الرئيسية بتقول [[The install worked successfully! Congratulations!]]، و [[/admin/]] بتحوّلك لـ [[/admin/login/?next=/admin/]]: صفحة دخول الـ admin (لسه مفيش يوزر، هتعمله في درس الـ admin بـ [[createsuperuser]]). و [[check]] بيطبع [[System check identified no issues (0 silenced).]]. و [[help]] بيعرض الأوامر مقسّمة حسب الـ app ([[[auth]]] فيها [[createsuperuser]] و [[changepassword]]، و [[[django]]] فيها [[migrate]] و [[makemigrations]] و [[shell]]...).

من غير النقطة، [[django-admin startproject config]] بيعمل فولدر [[config]] جواه [[manage.py]] وفولدر [[config]] تاني فيه [[settings.py]]، يعني [[config/config/settings.py]]. شغّال، بس طبقة زيادة ملهاش لازمة لو المشروع في فولدر لوحده أصلًا.`
        },
        {
          cmd: "settings من env",
          title: "SECRET_KEY و DEBUG والقاعدة من الـ environment مش من الكود",
          desc: R`[[settings.py]] ملف Python عادي، فبدل ما تكتب فيه [[SECRET_KEY]] و [[DEBUG = True]] وباسورد القاعدة، اقراهم من الـ environment variables بـ [[os.environ]]. نفس الكود يشتغل على جهازك وعلى السيرفر، والأسرار متدخلش Git.

دالة صغيرة [[env()]] بترمي [[ImproperlyConfigured]] لو متغير مهم ناقص، فالتطبيق يقع وهو بيقوم بدل ما يشتغل بمفتاح غلط. و Django نفسه مبيقراش ملف [[.env]]: إنت اللي بتحمّله في الـ shell أو بمكتبة.`,
          deep: {
            why: R`المفتاح اللي startproject كتبه بيوقّع الـ sessions وتوكنات إعادة الباسورد، ولو اتسرّب مع الكود على GitHub، أي حد يقدر يزوّر session. و [[DEBUG = True]] على سيرفر حقيقي بيعرض الكود والإعدادات لأي حد يعمل error. فالقيم دي لازم تختلف من بيئة للتانية ومتتكتبش في ملف بيتعمله commit. ده مبدأ «Config» في الـ Twelve-Factor App.`,
            how: R`[[os.environ]] dict فيه متغيرات البيئة كـ strings. عشان كده [[DEBUG]] بيتحسب بمقارنة: [[env("DJANGO_DEBUG", "0") == "1"]]، لأن أي string مش فاضي (حتى [["False"]]) قيمته True لو حطيته في if. و [[ALLOWED_HOSTS]] بيتقسم بـ [[split(",")]].

[[ImproperlyConfigured]] الـ exception اللي Django نفسه بيستخدمه لما الإعدادات غلط، فرسالته بتبان واضحة أول ما أي أمر [[manage.py]] يقوم.

القاعدة: لو [[DB_HOST]] موجود نستخدم Postgres (درايفر [[psycopg]] 3: [[pip install "psycopg[binary]"]])، ولو مش موجود SQLite. و [[CONN_MAX_AGE = 60]] بيخلي الاتصال يفضل مفتوح ٦٠ ثانية ويتعاد استخدامه بدل اتصال جديد لكل request.

تحميل [[.env]]: في bash [[set -a; . ./.env; set +a]] ([[set -a]] بيخلي كل متغير يتعمله export). في PowerShell سطر بيقرا الملف ويعمل [[Set-Item env:NAME value]] لكل سطر، وده بيأثر على الترمنال ده بس ومبيتحفظش في الجهاز. وفيه مكتبات بتعمل ده جوه Python: [[python-dotenv]] و [[django-environ]] (اللي بتفهم [[DATABASE_URL]] كمان) و [[dj-database-url]]. وفي Docker و compose بتدّيهم بـ [[env_file:]] أو [[-e]].`,
            when: R`من أول يوم في أي مشروع هيتنشر. وكل إعداد بيختلف بين جهازك والسيرفر: المفتاح، و DEBUG، والدومينات، والقاعدة، وإعدادات الإيميل، ومفاتيح الخدمات الخارجية.`,
            mistakes: R`[[DEBUG = os.environ.get("DJANGO_DEBUG")]] من غير مقارنة، فـ [["0"]] و [["False"]] الاتنين بيبقوا True. وقيمة افتراضية للـ [[SECRET_KEY]] في الكود ([[env("DJANGO_SECRET_KEY", "dev")]]) فالسيرفر يشتغل بيها لو نسيت المتغير. وتعمل commit لملف [[.env]] (ضيفه في [[.gitignore]] واعمل [[.env.example]] من غير قيم). وتغيّر [[SECRET_KEY]] على الإنتاج من غير ما تعرف إن كل اليوزرز هيخرجوا وكل لينكات إعادة الباسورد هتبوظ (استخدم [[SECRET_KEY_FALLBACKS]] وقت التغيير). و [[setx]] على ويندوز بيحفظ المتغير في الجهاز كله، وده مش اللي إنت عايزه لمشروع.`
          },
          teach: R`## المثال بيعمل إيه؟

ده الجزء اللي اتغيّر في [[config/settings.py]] بتاع درس startproject: دالة [[env()]] بتقرا متغير بيئة أو ترمي error، والمفتاح و DEBUG و الدومينات جايين منها، والقاعدة Postgres لو [[DB_HOST]] موجود و SQLite لو مش موجود. اتجرّب بـ Django 6.1.2 على لينكس في Docker (ومعاه Postgres 16 في container تاني)، والجزء بتاع SQLite على ويندوز في PowerShell 7.

---

## ١. الـ imports والدالة [[env]]

~~~python
import os
from django.core.exceptions import ImproperlyConfigured
def env(name, default=None):
    value = os.environ.get(name, default)
    if value is None:
        raise ImproperlyConfigured(f"Set the {name} environment variable")
    return value
~~~

- [[os.environ]]: dict فيه كل متغيرات البيئة بتاعة الـ process. كل القيم **strings**.
- [[.get(name, default)]]: رجّع القيمة، ولو مش موجودة رجّع [[default]]. ومن غير default بترجع [[None]].
- [[if value is None: raise ...]]: متغير مهم ناقص ومالوش default؟ وقّف كل حاجة.
- [[ImproperlyConfigured]]: exception جاهز في Django معناه «الإعدادات غلط».

جرّبت [[python manage.py check]] من غير أي متغير:

~~~text الناتج (آخر سطر)
django.core.exceptions.ImproperlyConfigured: Set the DJANGO_SECRET_KEY environment variable
~~~

ده المطلوب بالظبط: السيرفر ميقومش بمفتاح افتراضي.

---

## ٢. [[SECRET_KEY]] و [[DEBUG]] و [[ALLOWED_HOSTS]]

~~~python
SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env("DJANGO_DEBUG", "0") == "1"
ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
~~~

| السطر | ليه مكتوب كده |
|---|---|
| [[SECRET_KEY = env(...)]] | مفيش default: لازم يتحط |
| [[env("DJANGO_DEBUG", "0") == "1"]] | القيمة string. المقارنة بتحوّلها True أو False. الافتراضي [["0"]] يعني مقفول، فلو نسيته في الإنتاج يفضل آمن |
| [[.split(",")]] | [["localhost,127.0.0.1"]] تبقى [[['localhost', '127.0.0.1']]] |

### تعمل مفتاح جديد إزاي؟

~~~bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
~~~

~~~text الناتج (مفتاح تجربة اترمى)
za0x+3ts3=so2-x3e3nxv7elam+e832c6ultce=8(7+%8=g04t
~~~

- [[python -c "..."]]: شغّل الكود ده من غير ملف.
- [[get_random_secret_key()]]: دالة جوه Django بتطلّع ٥٠ حرف عشوائي من [[secrets]] (على ويندوز [[len(...)]] طلع [[50]]).

### نتأكد إن القيم اتقرت

~~~bash
python manage.py shell -v 0 -c "from django.conf import settings; print(settings.DEBUG, settings.ALLOWED_HOSTS)"
~~~

- [[manage.py shell]]: Python shell والإعدادات متحمّلة. [[-c]] ينفّذ السطر ويخرج، و [[-v 0]] بيسكّت سطر «14 objects imported automatically» اللي Django 6 بيطبعه.
- [[from django.conf import settings]]: الإعدادات النهائية بعد ما الملف اتنفّذ.

~~~text الناتج
False ['localhost', '127.0.0.1']
~~~

وبـ [[DJANGO_DEBUG=1]] قبل نفس الأمر طلع [[True]].

### [[ALLOWED_HOSTS]] بيعمل إيه فعلًا؟

شغّلت السيرفر بـ [[DJANGO_ALLOWED_HOSTS=shop.example.com]] وطلبت [[http://127.0.0.1:8001/]]:

~~~text الناتج
HTTP Error 400: Bad Request
Invalid HTTP_HOST header: '127.0.0.1:8001'. You may need to add '127.0.0.1' to ALLOWED_HOSTS.
~~~

Django بيقارن الـ [[Host]] header بالقايمة، ولو مش فيها بيرد 400. ده بيحمي من هجمات بتزوّر الـ Host (زي لينكات إعادة باسورد بدومين المهاجم). والرسالة التانية بتظهر في اللوج بس لما [[DEBUG]] شغال.

---

## ٣. القاعدة: Postgres لو فيه [[DB_HOST]]

~~~python
if "DB_HOST" in os.environ:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "HOST": env("DB_HOST"),
            "PORT": env("DB_PORT", "5432"),
            "NAME": env("DB_NAME"),
            "USER": env("DB_USER"),
            "PASSWORD": env("DB_PASSWORD"),
            "CONN_MAX_AGE": 60,
        }
    }
else:
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": BASE_DIR / "db.sqlite3"}}
~~~

- [[ENGINE]]: الـ backend. [[postgresql]] محتاج درايفر: [[pip install "psycopg[binary]"]] (psycopg 3، اتجرب 3.3.6).
- [[HOST]] و [[PORT]] و [[NAME]] و [[USER]] و [[PASSWORD]]: بيانات الاتصال، كلها من البيئة.
- [[CONN_MAX_AGE]]: الاتصال يفضل مفتوح ٦٠ ثانية ويتعاد استخدامه. [[0]] (الافتراضي) يعني اتصال جديد لكل request.
- [[else]]: من غير [[DB_HOST]]، SQLite في ملف. مريح وإنت لوحدك، بس الأحسن تطوّر على نفس نوع القاعدة اللي في الإنتاج.

بـ [[DB_HOST=b2e-pg DB_NAME=shop DB_USER=app DB_PASSWORD=...]] (container Postgres على نفس الشبكة)، [[settings.DATABASES["default"]["ENGINE"]]] طلع [[django.db.backends.postgresql]]، و [[migrate]] عمل كل الجداول في Postgres.

---

## ٤. تحمّل [[.env]] إزاي؟

ملف [[.env]] (مش بيتعمله commit):

~~~text .env
DJANGO_SECRET_KEY=dev-only-not-secret-7f3k2
DJANGO_DEBUG=1
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
~~~

Django مبيقراش الملف ده لوحده. حمّله في الترمنال قبل الأوامر:

~~~bash
set -a; . ./.env; set +a
~~~

- [[set -a]]: أي متغير هيتعرّف من دلوقتي يتعمله export (يوصل للبرامج اللي هتشتغل).
- [[. ./.env]]: نفّذ الملف في الـ shell الحالي، فكل سطر [[NAME=value]] بيتعرّف.
- [[set +a]]: رجّع الوضع العادي.

وفي PowerShell (اتجرب في pwsh 7):

~~~powershell
Get-Content .env | Where-Object { $_ -and -not $_.StartsWith('#') } | ForEach-Object { $name, $value = $_ -split '=', 2; Set-Item "env:$name" $value }
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[Get-Content .env]] | اقرا الملف سطر سطر |
| [[Where-Object { $_ -and -not $_.StartsWith('#') }]] | سيب السطور الفاضية والتعليقات. [[$_]] السطر الحالي |
| [[$_ -split '=', 2]] | قسّم عند أول [[=]] بس (الـ [[2]] = جزئين بالكتير)، عشان لو القيمة فيها [[=]] متتقطعش |
| [[$name, $value = ...]] | الجزء الأول في [[$name]] والتاني في [[$value]] |
| [[Set-Item "env:$name" $value]] | اعمل متغير بيئة للترمنال ده بس. يختفي لما تقفله |

بعدها [[$env:DJANGO_DEBUG]] طبع [[1]]، و [[python manage.py check]] عدّى، والإعدادات طلعت [[True ['localhost', '127.0.0.1'] django.db.backends.sqlite3]].

---

## ٥. ملف إعدادات لكل بيئة: [[config/settings/]]

لما الفرق بين جهازك والسيرفر يبقى أكتر من كام متغير (apps للتطوير بس زي debug-toolbar، و logging مختلف، و WhiteNoise)، بتقسم الملف لـ package. اتجرّب في نسخة من نفس المشروع على ويندوز (pwsh 7):

~~~text الشكل
config/settings/__init__.py   ← فاضي: بيخلي الفولدر package
config/settings/base.py       ← اللي كان settings.py، المشترك بين الكل
config/settings/dev.py        ← from .base import * و DEBUG = True
config/settings/prod.py       ← from .base import * و DEBUG = False والأسرار من env
~~~

~~~python
# config/settings/prod.py
import os
from .base import *
DEBUG = False
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
ALLOWED_HOSTS = os.environ["DJANGO_ALLOWED_HOSTS"].split(",")
~~~

- [[from .base import *]]: هات كل الإعدادات المشتركة، وبعدها اكتب فوقها اللي بيختلف.
- [[os.environ["..."]]] بالأقواس: لو المتغير ناقص بيرمي [[KeyError: 'DJANGO_SECRET_KEY']] والتطبيق ميقومش (نفس فكرة [[env()]] بس رسالة أقل وضوحًا).

ومين بيختار الملف؟ [[DJANGO_SETTINGS_MODULE]]. غيّر السطر في [[manage.py]] لـ [['config.settings.dev']] وفي [[wsgi.py]] لـ [['config.settings.prod']]، فجهازك يستخدم dev والسيرفر prod لوحده. ولأي أمر تاني: [[--settings config.settings.prod]].

~~~text اتشغّل فعلًا · الناتج
config.settings.dev True C:\...\proj2
KeyError: 'DJANGO_SECRET_KEY'
~~~

السطر الأول [[settings.SETTINGS_MODULE]] و [[DEBUG]] و [[BASE_DIR]] من [[manage.py shell]]، والتاني [[check --settings config.settings.prod]] من غير المفتاح.

### الفخ: [[BASE_DIR]] بقى غلط

[[base.py]] بقى فولدر أعمق بدرجة، فـ [[Path(__file__).resolve().parent.parent]] بقى بيشاور على [[config]] مش على المشروع. جربت أسيبه زي ما هو:

~~~text الناتج
django.db.utils.OperationalError: no such table: shop_product
~~~

Django عمل [[db.sqlite3]] فاضي **جديد** جوه [[config/]] ومشتكاش. الحل: [[parent]] تالت، [[Path(__file__).resolve().parent.parent.parent]]. وأي مسار تاني مبني على [[BASE_DIR]] ([[STATIC_ROOT]] والـ templates) كان هيتلخبط بنفس الطريقة.

---

## الخلاصة

| الإعداد | في التطوير | في الإنتاج |
|---|---|---|
| [[DJANGO_SECRET_KEY]] | أي قيمة في [[.env]] | مفتاح من [[get_random_secret_key()]] في أسرار السيرفر |
| [[DJANGO_DEBUG]] | [[1]] | مش موجود (يعني [[0]]) |
| [[DJANGO_ALLOWED_HOSTS]] | الافتراضي | الدومين الحقيقي، مثلًا [[shop.example.com]] |
| [[DB_HOST]] وأخواته | مش موجودين (SQLite) أو Postgres محلي | Postgres الإنتاج |

- كل قيمة سرية أو بتختلف بين البيئات من [[os.environ]].
- مفيش default للمفتاح، و DEBUG مقفول افتراضيًا.
- [[.env]] في [[.gitignore]]، و [[.env.example]] فيه الأسامي بس.`,
          example: R`import os
from pathlib import Path
from django.core.exceptions import ImproperlyConfigured
def env(name, default=None):
    value = os.environ.get(name, default)
    if value is None:
        raise ImproperlyConfigured(f"Set the {name} environment variable")
    return value
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env("DJANGO_DEBUG", "0") == "1"
ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
if "DB_HOST" in os.environ:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "HOST": env("DB_HOST"),
            "PORT": env("DB_PORT", "5432"),
            "NAME": env("DB_NAME"),
            "USER": env("DB_USER"),
            "PASSWORD": env("DB_PASSWORD"),
            "CONN_MAX_AGE": 60,
        }
    }
else:
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": BASE_DIR / "db.sqlite3"}}`,
          flag: "script",
          learn: R`تطلّع المفتاح السري و DEBUG والدومينات وبيانات القاعدة من الـ environment، وتخلّي التطبيق يقع برسالة واضحة لو حاجة مهمة ناقصة، وتقسم الإعدادات لكل بيئة.`,
          out: R`نفس الكود بيشتغل على جهازك بـ SQLite و DEBUG، وعلى السيرفر بـ Postgres ومن غير DEBUG، ومفيش سر واحد في Git.`,
          use: {
            work: R`أي سيرفر أو CI أو Docker بيدّيلك الإعدادات كـ environment variables. لو [[settings.py]] بيقراها، الديبلوي بيبقى «غيّر المتغيرات» مش «عدّل الكود».`,
            net: R`[[ALLOWED_HOSTS]] هو خط الدفاع ضد طلبات بـ [[Host]] header مزوّر، ولازم يبقى الدومين الحقيقي بتاع السيرفر.`,
          },
          lines: [
            R`[[import os]] عشان [[os.environ]]: الـ dict اللي فيه كل متغيرات البيئة بتاعة الـ process، ومنه هنقرا كل الإعدادات اللي بتختلف بين جهازك والسيرفر.`,
            R`[[from pathlib import Path]] عشان نبني المسارات بـ [[/]] بدل ما نلزق strings، وده بيشتغل صح على ويندوز ولينكس (الـ backslash والـ slash).`,
            R`[[ImproperlyConfigured]] الـ exception اللي Django نفسه بيرميه لما الإعدادات غلط. بنستخدمه عشان رسالتنا تطلع بنفس الشكل أول ما أي أمر [[manage.py]] يقوم.`,
            R`[[def env(name, default=None)]] دالة صغيرة بتقرا متغير واحد. [[default=None]] معناها «مفيش قيمة افتراضية»، فالمتغير ده لازم يتحط.`,
            R`[[os.environ.get(name, default)]] بترجّع القيمة لو المتغير موجود، أو الـ [[default]] لو مش موجود. القيمة دايمًا **string** حتى لو كتبت رقم.`,
            R`[[if value is None]]: مفيش متغير ومفيش default. بنستخدم [[is None]] مش [[not value]] عشان متغير قيمته [[""]] (فاضي عن قصد) ميتعاملش كإنه ناقص.`,
            R`[[raise ImproperlyConfigured(...)]] بيوقّف التطبيق وهو بيقوم برسالة فيها اسم المتغير الناقص: [[Set the DJANGO_SECRET_KEY environment variable]]. أحسن من إنه يقوم بمفتاح غلط وتكتشف بعد أسبوع.`,
            R`[[return value]] بترجّع الـ string زي ما هو، واللي بينادي [[env]] هو اللي يحوّله (bool أو int أو list).`,
            R`[[BASE_DIR = Path(__file__).resolve().parent.parent]]: [[__file__]] مسار [[settings.py]]، و [[resolve()]] بيخليه مسار كامل، وأول [[parent]] = فولدر [[config]] والتاني = فولدر المشروع اللي فيه [[manage.py]]. لو نقلت الإعدادات لفولدر [[config/settings/]] لازم [[parent]] تالت (تحت).`,
            R`[[SECRET_KEY = env("DJANGO_SECRET_KEY")]] من غير default عن قصد: لو حد نسي يحطه على السيرفر، التطبيق ميقومش. المفتاح ده بيوقّع الـ sessions ولينكات إعادة الباسورد.`,
            R`[[DEBUG = env("DJANGO_DEBUG", "0") == "1"]]: المقارنة بتحوّل الـ string لـ True أو False. لو كتبت [[bool(...)]] بدلها، القيمة [["0"]] و [["False"]] الاتنين هيبقوا True لأن أي string مش فاضي True. والافتراضي [["0"]] يعني لو نسيته يفضل مقفول (آمن).`,
            R`[[ALLOWED_HOSTS = env(...).split(",")]]: الدومينات في متغير واحد مفصولة بفاصلة، و [[split(",")]] بيحوّلها list. الافتراضي [[localhost]] و [[127.0.0.1]] للتطوير. خد بالك: مسافة بعد الفاصلة هتبقى جزء من الاسم.`,
            R`[[if "DB_HOST" in os.environ]]: وجود [[DB_HOST]] نفسه هو اللي بيقرر: لو موجود يبقى Postgres، ولو مش موجود SQLite. كده جهازك يشتغل من غير أي إعداد.`,
            R`[[DATABASES = {]] الـ dict اللي Django بيقرا منه كل القواعد. ممكن يبقى فيه أكتر من قاعدة باسماء مختلفة.`,
            R`[["default": {]] القاعدة اللي كل الـ models بتستخدمها لو مقلتش غير كده. لازم يبقى فيه واحدة بالاسم ده.`,
            R`[["ENGINE": "django.db.backends.postgresql"]] الـ backend بتاع Postgres. محتاج درايفر متسطّب: [[pip install "psycopg[binary]"]]، ومن غيره هتشوف [[Error loading psycopg2 or psycopg module]].`,
            R`[["HOST": env("DB_HOST")]] عنوان سيرفر القاعدة: [[localhost]] أو اسم الـ container في Docker أو عنوان الخدمة في السحابة.`,
            R`[["PORT": env("DB_PORT", "5432")]] البورت، و [[5432]] الافتراضي بتاع Postgres فمش لازم تحطه غير لو مختلف. Django بيقبله string.`,
            R`[["NAME": env("DB_NAME")]] اسم القاعدة نفسها جوه السيرفر (مش اسم السيرفر). لازم تكون اتعملت قبل [[migrate]].`,
            R`[["USER": env("DB_USER")]] يوزر القاعدة. على السيرفر الأحسن يوزر خاص بالتطبيق بصلاحيات على القاعدة دي بس، مش [[postgres]] الأدمن.`,
            R`[["PASSWORD": env("DB_PASSWORD")]] الباسورد من البيئة بس، ومن غير default، فمستحيل يتكتب في الكود بالغلط.`,
            R`[["CONN_MAX_AGE": 60]] بيخلي الاتصال بالقاعدة يفضل مفتوح ٦٠ ثانية ويتعاد استخدامه للطلبات اللي بعده. الافتراضي [[0]] يعني اتصال جديد لكل طلب، وده بطيء مع Postgres على سيرفر تاني.`,
            R`قفل dict القاعدة [["default"]].`,
            R`قفل [[DATABASES]] بتاع Postgres.`,
            R`[[else:]] لو مفيش [[DB_HOST]] خالص في البيئة، يعني إنت على جهازك ومش محتاج سيرفر قاعدة.`,
            R`SQLite في ملف [[db.sqlite3]] جنب [[manage.py]] ([[BASE_DIR / "db.sqlite3"]]). مريح وإنت بتتعلم، بس قبل الإنتاج جرّب على نفس نوع القاعدة (Postgres) لأن فيه فروق.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب قيمة [[DEBUG]] في كل حالة قبل ما تشغّل: [[DJANGO_DEBUG]] مش موجود، و [[1]]، و [[True]]، و [[0]]. وبعدين اطبعها بـ [[python manage.py shell -v 0 -c "from django.conf import settings; print(settings.DEBUG)"]] في كل حالة.`, done: R`الناتج [[False]] و [[True]] و [[False]] و [[False]] بالترتيب، وكاتب جنب [[True]] ليه طلعت [[False]] (المقارنة بـ [["1"]] بس).` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** زميلك كتب [[DEBUG = bool(os.environ.get("DJANGO_DEBUG", False))]] و [[ALLOWED_HOSTS = os.environ.get("HOSTS", "").split(", ")]]، وعلى السيرفر حط [[DJANGO_DEBUG=False]] و [[HOSTS=shop.example.com,www.shop.example.com]]. قول إيه اللي هيحصل، وصلّح السطرين.`, done: R`عرفت إن DEBUG هيبقى True على السيرفر، وإن [[ALLOWED_HOSTS]] هيبقى عنصر واحد فيه الاسمين والفاصلة فكل طلب يرجع 400. وبعد التصليح [[settings.DEBUG]] بقت [[False]] و [[ALLOWED_HOSTS]] بقت list فيها اسمين.` },
            { lvl: 'تطبيق', t: R`**ابني:** قسّم الإعدادات لفولدر [[config/settings/]] فيه [[base.py]] و [[dev.py]] و [[prod.py]] (القسم الأخير في الشرح)، وخلّي [[manage.py]] يستخدم [[dev]] افتراضيًا و [[wsgi.py]] يستخدم [[prod]].`, done: R`[[python manage.py check]] بيعدّي، و [[settings.SETTINGS_MODULE]] بيطبع [[config.settings.dev]]، و [[python manage.py check --settings config.settings.prod]] من غير [[DJANGO_SECRET_KEY]] بيقع بـ error فيه اسم المتغير، و [[db.sqlite3]] لسه في نفس مكانه جنب [[manage.py]].` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبار بـ pytest (أو سكربت بـ [[subprocess]]) بيشغّل [[python manage.py check]] مرة من غير [[DJANGO_SECRET_KEY]] ومرة بيه، وبيتأكد من الـ exit code والرسالة. ده اختبار إن الإعدادات بتقفل صح.`, done: R`من غير المفتاح: exit code [[1]] والـ stderr فيه [[Set the DJANGO_SECRET_KEY environment variable]]. وبيه: exit code [[0]] و [[no issues]]. والاختبار بيعدّي مرتين ورا بعض من غير ما يسيب متغير في الترمنال.` },
          ],
          try: R`حط الكود ده في [[settings.py]] بتاعك، وجرّب [[python manage.py check]] من غير متغيرات وشوف الرسالة. وبعدين اعمل مفتاح بـ [[get_random_secret_key()]]، وحطه في [[.env]] مع [[DJANGO_DEBUG=1]]، وحمّله بطريقة نظامك، واطبع [[settings.DEBUG]]. وأخيرًا جرّب [[DJANGO_DEBUG=False]] وشوف DEBUG بقى إيه.`,
          sol: R`من غير المتغيرات: [[django.core.exceptions.ImproperlyConfigured: Set the DJANGO_SECRET_KEY environment variable]]. بعد تحميل [[.env]]: [[System check identified no issues (0 silenced).]] و [[settings.DEBUG]] بـ [[True]].

و [[DJANGO_DEBUG=False]] بيدّي [[False]]، لأن المقارنة [[== "1"]] وأي قيمة غير [["1"]] يعني مقفول. لو كنت كتبت [[DEBUG = bool(os.environ.get("DJANGO_DEBUG"))]] كانت [["False"]] هتبقى True، لأن أي string مش فاضي قيمته True. على ويندوز اتجرب بنفس الملف في pwsh 7: [[$env:DJANGO_DEBUG = '0']] طلّع [[False]].`
        },
        {
          cmd: "models و makemigrations",
          title: "الجداول كـ classes، و migrations بتتولد من الفرق",
          desc: R`كل جدول في Django class بيورث من [[models.Model]]، وكل عمود attribute: [[CharField]] و [[PositiveIntegerField]] و [[ForeignKey]]... و [[python manage.py makemigrations]] بيقارن الـ models بآخر migration ويكتب ملف Python بالفرق، و [[migrate]] بينفّذه على القاعدة.

ملفات الـ migrations جزء من الكود: بتتعمله commit، وكل بيئة (جهازك و CI والسيرفر) بتطبّق نفس الملفات بنفس الترتيب. نفس فكرة Alembic في درس «alembic»، بس جوه Django من غير أداة تانية.`,
          deep: {
            why: R`من غير migrations، كل تغيير في الجداول بيتعمل بإيدك على كل قاعدة، ومحدش عارف الإنتاج شكله إيه. و Django بيولّد الـ migration من الـ models نفسها، فالـ model هو المصدر الوحيد لشكل الجدول، والـ admin والـ forms والـ serializers بيقروا منه.`,
            how: R`Django بيعمل اسم الجدول [[<app>_<model>]] بحروف صغيرة ([[shop_product]])، ويضيف [[id]] لوحده ([[BigAutoField]] من Django 6.0). و [[ForeignKey(Category)]] بيبقى عمود [[category_id]] عليه index، و [[on_delete]] بيحدد يحصل إيه لما الصف الأب يتمسح: [[CASCADE]] امسحهم معاه، [[PROTECT]] ارفض، [[SET_NULL]] خليها null.

[[related_name="products"]] اسم الطريق العكسي: [[category.products.all()]]. ومن غيره بيبقى [[product_set]].

[[makemigrations]] بيبني «حالة» الـ models من كل الـ migrations اللي قبل كده، ويقارنها بالـ models الحالية، ويكتب الفرق كـ operations ([[CreateModel]] و [[AddField]]...). و [[migrate]] بيسجّل كل migration اتطبق في جدول [[django_migrations]]. و [[sqlmigrate]] بيوريك الـ SQL من غير ما ينفّذ، وبيختلف حسب القاعدة: SQLite بتعيد بناء الجدول كله عشان تضيف عمود، و Postgres بتعمل [[ALTER TABLE ADD COLUMN]].

و [[makemigrations --check]] بيرجع exit code 1 لو فيه تغيير في الـ models ملوش migration، فتحطه في CI. ولتغيير الداتا نفسها (مش الشكل) فيه [[RunPython]] في migration بتكتبه بـ [[makemigrations --empty shop]].`,
            when: R`أي تغيير في الـ models: [[makemigrations]] على جهازك، تقرا الملف، commit، وفي الديبلوي [[migrate]] قبل ما الكود الجديد يستقبل traffic.`,
            mistakes: R`تعدّل migration اتطبق خلاص على الإنتاج بدل ما تعمل واحد جديد. وتمسح فولدر الـ migrations «عشان تبدأ من الأول» في مشروع شغال. وتنسى [[makemigrations]] فالكود بيدوّر على عمود مش موجود ([[column ... does not exist]]). و [[on_delete=CASCADE]] على حاجة زي الطلبات فمسح يوزر يمسح كل فواتيره. وعمود جديد [[null=False]] من غير default على جدول فيه داتا: [[makemigrations]] هيسألك تحط قيمة. وفلوس بـ [[FloatField]] (استخدم [[DecimalField]] أو سنتات [[int]]).`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف جدولين في [[shop/models.py]]: أقسام ومنتجات، كل منتج تبع قسم. وبعدين بنولّد الـ migrations ونطبّقها. اتشغّل بـ Django 6.1.2 على لينكس في Docker: مرة على SQLite ومرة على Postgres 16. والمثال آخر نسخة، بعد ما زوّدنا [[is_active]] في migration تانية.

---

## ١. [[Category]]

~~~python
from django.db import models
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name
~~~

- [[models.Model]]: الأب. أي class بيورث منه = جدول.
- [[CharField(max_length=100)]]: نص بحد أقصى. في القاعدة [[varchar(100)]]. و [[max_length]] إجباري.
- [[unique=True]]: مفيش قسمين بنفس الاسم (constraint في القاعدة نفسها).
- [[__str__]]: النص اللي بيظهر لما تطبع الـ object، وفي الـ admin. من غيره هتشوف [[Category object (1)]].

## ٢. [[Product]]

~~~python
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    name = models.CharField(max_length=200)
    price_cents = models.PositiveIntegerField()
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
~~~

| الحقل | في القاعدة | ليه |
|---|---|---|
| [[ForeignKey(Category, ...)]] | [[category_id bigint]] + index | كل منتج تبع قسم |
| [[on_delete=models.PROTECT]] | — | ممنوع تمسح قسم فيه منتجات |
| [[related_name="products"]] | — | من القسم: [[category.products.all()]] |
| [[PositiveIntegerField()]] | [[integer]] + [[CHECK (price_cents >= 0)]] | السعر بالقروش، فمفيش مشاكل كسور |
| [[default=0]] | — | لو مبعتهوش يبقى صفر |
| [[BooleanField(default=True)]] | [[boolean]] | منتج ظاهر ولا متخبّي |
| [[DateTimeField(auto_now_add=True)]] | [[timestamp with time zone]] في Postgres | Django بيحط الوقت لوحده أول ما الصف يتعمل |

جرّبت [[PROTECT]]: [[Category.objects.get(name="Books").delete()]] رمت:

~~~text الناتج
ProtectedError ("Cannot delete some instances of model 'Category' because they are referenced through protected foreign keys: 'Product.category'.", ...
~~~

## ٣. [[class Meta]] و [[__str__]]

~~~python
    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["category", "price_cents"])]
    def __str__(self):
        return self.name
~~~

- [[class Meta]]: إعدادات الجدول نفسه مش عمود.
- [[ordering = ["-created_at"]]]: الترتيب الافتراضي لأي query. الـ [[-]] يعني من الأحدث للأقدم ([[DESC]]).
- [[models.Index(fields=[...])]]: index مركّب على القسم والسعر، لـ queries زي «منتجات القسم ده بسعر أقل من كذا».

---

## ٤. [[makemigrations]]

ضيف [[shop]] في [[INSTALLED_APPS]] الأول، وبعدين:

~~~bash
python manage.py makemigrations shop
~~~

~~~text الناتج (أول مرة، قبل is_active)
Migrations for 'shop':
  shop/migrations/0001_initial.py
    + Create model Category
    + Create model Product
~~~

الملف اللي اتعمل (مختصر):

~~~python
class Migration(migrations.Migration):
    initial = True
    dependencies = [
    ]
    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        ...
~~~

- [[dependencies]]: الـ migrations اللي لازم تتطبق قبله. فاضية لأنه أول واحد.
- [[operations]]: الخطوات. [[CreateModel]] = اعمل جدول.
- [[id]] اتضاف لوحده كـ [[BigAutoField]].

## ٥. [[sqlmigrate]]: إيه الـ SQL؟

~~~bash
python manage.py sqlmigrate shop 0001
~~~

~~~text الناتج (SQLite، مختصر)
CREATE TABLE "shop_category" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(100) NOT NULL UNIQUE);
CREATE TABLE "shop_product" (... "price_cents" integer unsigned NOT NULL CHECK ("price_cents" >= 0), ... "category_id" bigint NOT NULL REFERENCES "shop_category" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "shop_product_category_id_14d7eea8" ON "shop_product" ("category_id");
CREATE INDEX "shop_produc_categor_6e2dd8_idx" ON "shop_product" ("category_id", "price_cents");
~~~

لاحظ: index على [[category_id]] اتعمل لوحده مع الـ ForeignKey، والتاني اللي طلبناه في [[Meta.indexes]] باسم Django ولّده.

## ٦. [[migrate]] و [[showmigrations]]

~~~text الناتج
shop
 [ ] 0001_initial
Operations to perform:
  Apply all migrations: shop
Running migrations:
  Applying shop.0001_initial... OK
shop
 [X] 0001_initial
~~~

[[ ]] يعني لسه، و [[X]] يعني اتطبق (متسجّل في جدول [[django_migrations]]).

---

## ٧. تغيير: زوّدنا [[is_active]]

بعد ما زوّدت السطر في الـ model:

~~~bash
python manage.py makemigrations --check --dry-run
~~~

~~~text الناتج
Migrations for 'shop':
  shop/migrations/0002_product_is_active.py
    + Add field is_active to product
exit=1
~~~

- [[--dry-run]]: قولي هتعمل إيه من غير ما تكتب ملف.
- [[--check]]: اخرج بـ exit code 1 لو فيه تغيير ملوش migration. ده اللي تحطه في CI. وبعد ما عملت الملف وطبقته، نفس الأمر طبع [[No changes detected]] و [[exit=0]].

وعملته باسم واضح: [[python manage.py makemigrations shop -n product_is_active]]. والـ SQL بيختلف حسب القاعدة:

~~~text sqlmigrate shop 0002 على Postgres 16
ALTER TABLE "shop_product" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;
ALTER TABLE "shop_product" ALTER COLUMN "is_active" DROP DEFAULT;
~~~

Postgres بيضيف العمود بقيمة [[true]] للصفوف الموجودة، وبعدين بيشيل الـ default من القاعدة (Django بيحط الـ default من Python). أما SQLite فطلّعت [[CREATE TABLE "new__shop_product"]] و [[INSERT ... SELECT]] و [[DROP TABLE]] و [[RENAME]]: بتبني الجدول من الأول، لأن [[ALTER TABLE]] فيها محدود.

## ٨. الرجوع

~~~bash
python manage.py migrate shop 0001
~~~

~~~text الناتج
  Unapplying shop.0002_product_is_active... OK
~~~

بيرجّع القاعدة لحد [[0001]] (العمود اتمسح بالداتا اللي فيه). على جهازك بس، مش على الإنتاج.

---

## ٩. data migration: تملى عمود جديد للصفوف الموجودة

عايز تزوّد [[slug]] للأقسام، وهو لازم يبقى [[unique]] ومش فاضي. لو زوّدته على طول بالشكل ده، [[makemigrations]] هيسألك عن قيمة واحدة لكل الصفوف، وده مستحيل مع [[unique]]. الطريقة الصح ٣ migrations (اتجرّبت على SQLite و Postgres 16):

**(أ)** الحقل nullable الأول: [[slug = models.SlugField(max_length=100, null=True)]] وبعدين [[makemigrations shop -n category_slug]].

**(ب)** migration فاضية تملاه:

~~~bash
python manage.py makemigrations shop --empty -n fill_category_slug
~~~

~~~python
from django.db import migrations
from django.utils.text import slugify
def fill_slugs(apps, schema_editor):
    Category = apps.get_model("shop", "Category")
    for c in Category.objects.filter(slug__isnull=True):
        c.slug = slugify(c.name)
        c.save(update_fields=["slug"])
def clear_slugs(apps, schema_editor):
    apps.get_model("shop", "Category").objects.update(slug=None)
class Migration(migrations.Migration):
    dependencies = [("shop", "0002_category_slug")]
    operations = [migrations.RunPython(fill_slugs, clear_slugs, elidable=True)]
~~~

| الحتة | ليه |
|---|---|
| [[apps.get_model("shop", "Category")]] | الـ model **بشكله وقت الـ migration دي**، مش اللي في [[models.py]] النهارده. لو عملت [[from shop.models import Category]] وبعد شهر حد زوّد عمود، الـ migration دي هتقع على أي قاعدة جديدة بـ [[OperationalError: no such column: shop_category.code]] (جربتها) |
| [[slugify(c.name)]] | [["Books"]] تبقى [["books"]]، و [["Phone Cases"]] تبقى [["phone-cases"]] |
| [[RunPython(fill_slugs, clear_slugs)]] | التانية هي الرجوع. من غيرها [[migrate shop 0002]] بيقع بـ [[IrreversibleError: Operation <RunPython ...> in shop.0003_fill_category_slug is not reversible]] |
| [[elidable=True]] | «الخطوة دي ينفع تتشال لما تعمل squash»، لأن على قاعدة جديدة مفيش صفوف تتملى (تحت في ٩-ج ليه ده مهم) |

~~~text اتشغّل فعلًا · الناتج
Applying shop.0002_category_slug... OK
Applying shop.0003_fill_category_slug... OK
[('Books', 'books'), ('Cables', 'cables'), ('Laptops', 'laptops')]
~~~

**(ج)** خلّيه إجباري: [[slug = models.SlugField(max_length=100, unique=True)]]. [[makemigrations]] هيسألك تاني ([[It is impossible to change a nullable field 'slug' on category to non-nullable without providing a default]])، واختار [[2) Ignore for now]] لأن الـ migration اللي قبلها ملت الصفوف فعلًا.

---

## ١٠. اتنين في الفريق عملوا migration في نفس الوقت

سارة عملت [[0005_product_sku]] وعمر عمل [[0005_product_weight]] في branch تاني، والاتنين [[dependencies]] بتاعتهم [[0004]]. بعد الـ merge في git:

~~~text python manage.py migrate
CommandError: Conflicting migrations detected; multiple leaf nodes in the migration graph: (0005_product_sku, 0005_product_weight in shop).
To fix them run 'python manage.py makemigrations --merge'
~~~

~~~bash
python manage.py makemigrations --merge --noinput
~~~

~~~text الناتج
Merging shop
  Branch 0005_product_sku
    + Add field sku to product
  Branch 0005_product_weight
    + Add field weight_grams to product
Created new merge migration ...\shop\migrations\0006_merge_0005_product_sku_0005_product_weight.py
~~~

الـ merge migration مفيهاش operations: [[dependencies]] بتاعتها الاتنين، فبتقفل الـ graph على طرف واحد. ده آمن طول ما الاتنين بيلمسوا حاجات مختلفة. لو الاتنين غيّروا **نفس الحقل**، اقرا الملفين وقرر بإيدك.

---

## ١١. [[squashmigrations]]: ٥٠ ملف يبقوا واحد

مع الوقت الـ app بيبقى فيها migrations كتير، و [[migrate]] على قاعدة جديدة (CI والاختبارات) بيبطأ. [[squashmigrations]] بيجمعهم في ملف واحد:

~~~bash
python manage.py squashmigrations shop 0006 --noinput
~~~

### الفخ الأول: الملف مبيشتغلش

أول مرة (من غير [[elidable]]) الأمر قال [[No optimizations possible]] و [[Manual porting required]]، وأي أمر بعدها وقع:

~~~text الناتج
    code=shop.migrations.0003_fill_category_slug.fill_slugs,
                             ^
SyntaxError: invalid decimal literal
~~~

Django مبينسخش كود الـ [[RunPython]]، فبيكتب مساره، وأي اسم module بيبدأ برقم مش Python صح. لازم تنسخ الدالتين للملف الجديد بإيدك.

### الفخ التاني: بيشتغل على SQLite وبيقع على Postgres

بعد ما نسخت الدوال، الملف اشتغل على SQLite. وعلى قاعدة Postgres 16 **جديدة**:

~~~text الناتج
django.db.utils.ProgrammingError: relation "shop_category_slug_4508178e_like" already exists
~~~

الـ [[RunPython]] في النص منعت الـ optimizer يدمج [[AddField]] و [[AlterField]] بتوع [[slug]]، والاتنين في migration واحدة عملوا نفس الـ index مرتين. (الـ migrations الأصلية منفصلة كانت بتعدّي على نفس الـ Postgres.)

### الحل: [[elidable=True]]

حطيت [[elidable=True]] على الـ [[RunPython]] (زي المثال فوق) وعملت squash تاني:

~~~text الناتج
Optimizing...
  Optimized from 10 operations to 8 operations.
...
Applying shop.0001_squashed_0006_merge_0005_product_sku_0005_product_weight... OK
~~~

مفيش نسخ بإيدك، والقاعدة الجديدة على Postgres اتعملت. وعلى القاعدة القديمة [[showmigrations]] بيقول [[[X] 0001_squashed_... (7 squashed migrations)]]: Django عارف إنهم اتطبقوا.

### بعد الـ squash

- الملف الجديد فيه [[replaces = [...] ]]: القواعد القديمة مش هتطبّقه تاني، والجديدة هتطبّقه بس.
- **سيب الملفات القديمة** لحد ما كل بيئة (كل سيرفر وكل جهاز في الفريق) تعمل [[migrate]]. بعدها امسحهم وشيل [[replaces]].
- ومتمسحش ملف الـ squash نفسه بعد ما migrations جديدة اعتمدت عليه: جربتها، و [[migrate]] وقع بـ [[NodeNotFoundError: Migration shop.0007_order dependencies reference nonexistent parent node ('shop', '0001_squashed_...')]].
- جرّب الـ squash على قاعدة **فاضية من نفس نوع الإنتاج** قبل الـ commit، مش SQLite.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[makemigrations]] | يكتب ملف بالفرق بين الـ models وآخر migration |
| [[sqlmigrate app 000X]] | يوريك الـ SQL من غير ما ينفّذ |
| [[migrate]] | يطبّق اللي لسه |
| [[showmigrations]] | مين اتطبق ومين لأ |
| [[makemigrations --check]] | في CI: يفشل لو حد نسي migration |
| [[migrate app 000X]] | يرجع لـ migration معين |
| [[makemigrations --empty app]] + [[RunPython]] | data migration بتملى أو تنقل داتا، وليها reverse |
| [[makemigrations --merge]] | يقفل تعارض migrations جم من branches مختلفة |
| [[squashmigrations app 000X]] | يجمع migrations كتير في ملف واحد (جرّبه على قاعدة فاضية) |

- الـ model هو المصدر، والـ migration ملف بيتقري ويتعمله commit.
- [[on_delete]] قرار مهم: [[PROTECT]] للحاجات اللي مينفعش تختفي.`,
          example: R`from django.db import models
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    name = models.CharField(max_length=200)
    price_cents = models.PositiveIntegerField()
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["category", "price_cents"])]
    def __str__(self):
        return self.name
# في الترمنال:
# python manage.py makemigrations shop
# python manage.py sqlmigrate shop 0001
# python manage.py migrate
# python manage.py showmigrations shop
# python manage.py makemigrations --check --dry-run`,
          flag: "script",
          learn: R`تكتب الجداول كـ classes بالحقول والعلاقات والـ constraints، وتولّد الـ migrations وتقراها وترجع فيها، وتعمل data migration، وتحل تعارض migrations بين اتنين في الفريق، وتعمل squash من غير ما تكسر قاعدة جديدة.`,
          out: R`أي تغيير في شكل الداتا بيبقى ملف migration بيتعمله commit ويتطبّق بنفس الطريقة على كل جهاز وسيرفر، حتى لو فيه داتا موجودة.`,
          use: {
            prog: R`الـ model هو المصدر الوحيد لشكل الجدول: الـ admin والـ forms و DRF كلهم بيقروا منه، فتعديل حقل في مكان واحد بيوصل لكله.`,
            work: R`كل PR فيه تعديل model لازم يبقى معاه ملف migration، والـ CI بيرفض الـ PR لو ناسيه ([[makemigrations --check]]).`,
            cs: R`الـ migrations هي «تاريخ» القاعدة كـ graph: كل ملف عارف اللي قبله، و Django بيبني الحالة بإنه يمشي في الـ graph ده بالترتيب.`,
          },
          lines: [
            R`[[from django.db import models]]: الـ module اللي فيه [[Model]] وكل أنواع الحقول ([[CharField]] و [[ForeignKey]]...) والـ [[Index]] والـ constraints.`,
            R`[[class Category(models.Model)]]: أي class بيورث من [[models.Model]] بيبقى جدول، و Django بيسمّيه [[shop_category]] (اسم الـ app وبعده اسم الـ class بحروف صغيرة) ويضيف عمود [[id]] لوحده.`,
            R`[[name = models.CharField(max_length=100, unique=True)]]: عمود نص [[varchar(100)]]، و [[max_length]] إجباري في [[CharField]]. و [[unique=True]] بيعمل constraint في القاعدة نفسها، فمحاولة قسم بنفس الاسم بترمي [[IntegrityError]] حتى لو جت من بره Django.`,
            R`[[def __str__(self)]]: النص اللي بيظهر لما تطبع الـ object، وفي الـ admin وفي الـ dropdowns. من غيرها هتشوف [[Category object (1)]] في كل حتة.`,
            R`[[return self.name]]: بنرجّع اسم القسم. لازم ترجّع string، ولو رجّعت [[None]] الـ admin هيرمي [[TypeError]].`,
            R`[[class Product(models.Model)]]: جدول المنتجات [[shop_product]]، وهو اللي بيشاور على القسم.`,
            R`[[ForeignKey(Category, on_delete=models.PROTECT, related_name="products")]]: عمود [[category_id]] عليه index بيشاور على [[shop_category]]. [[PROTECT]] بيرفض مسح قسم لسه فيه منتجات ([[ProtectedError]])، و [[related_name]] بيخليك تكتب [[category.products.all()]] بدل [[product_set]].`,
            R`[[name = models.CharField(max_length=200)]]: اسم المنتج لحد ٢٠٠ حرف. مش [[unique]] لأن منتجين في قسمين ممكن يبقى ليهم نفس الاسم.`,
            R`[[price_cents = models.PositiveIntegerField()]]: السعر بالقروش كرقم صحيح، فـ [[0.1 + 0.2]] ومشاكل الكسور مش هتحصل. [[Positive]] بيضيف [[CHECK (price_cents >= 0)]] في القاعدة. ومن غير default، فلازم يتبعت.`,
            R`[[stock = models.PositiveIntegerField(default=0)]]: المخزون، ولو متبعتش يبقى صفر. الـ default ده Django بيحطه من Python، مش القاعدة (لاحظه في الـ SQL تحت: [[DROP DEFAULT]]).`,
            R`[[is_active = models.BooleanField(default=True)]]: منتج ظاهر ولا متخبّي. الأحسن من المسح: بتخبّي المنتج والطلبات القديمة لسه بتشاور عليه.`,
            R`[[DateTimeField(auto_now_add=True)]]: Django بيحط الوقت الحالي (UTC لو [[USE_TZ = True]]) أول ما الصف يتعمل، وبعدها مبيتغيرش ومبيظهرش في الـ forms. ولو عايز «آخر تعديل» فيه [[auto_now=True]].`,
            R`[[class Meta]]: إعدادات الجدول نفسه، مش عمود: الترتيب والـ indexes والـ constraints واسم الجدول لو عايز تغيّره.`,
            R`[[ordering = ["-created_at"]]]: أي query على المنتجات من غير [[order_by]] هيترتب الأحدث الأول ([[ORDER BY created_at DESC]]). خد بالك إن ده بيتضاف لكل query، حتى اللي مش محتاجه.`,
            R`[[indexes = [models.Index(fields=["category", "price_cents"])]]]: index مركّب على العمودين بالترتيب ده، فبيسرّع «منتجات القسم ده بسعر أقل من كذا». Django بيولّد اسم ليه زي [[shop_produc_categor_6e2dd8_idx]].`,
            R`[[def __str__(self)]] بتاعة المنتج: نفس فكرة القسم، عشان المنتج يظهر باسمه في الـ shell والـ admin.`,
            R`[[return self.name]]: اسم المنتج، فـ [[print(product)]] بتطبع [[Clean Code]] و [[list(qs)]] بتطبع [[<Product: Clean Code>]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الأوامر الستة لدورة حياة migration: اعمل، اقرا الـ SQL، طبّق، شوف الحالة، افحص في CI، ارجع لورا. وبعدين جرّبهم على حقل [[description = models.TextField(blank=True)]].`, done: R`[[makemigrations --check --dry-run]] رجّع exit code [[1]] وبعد ما عملت الـ migration رجّع [[No changes detected]] و [[0]]، و [[showmigrations shop]] فيه [[[X]]] للجديد، و [[migrate shop 0002]] (أو اللي قبله) شال العمود.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** عندك جدول فيه ١٠ منتجات. توقّع [[makemigrations]] هيعمل إيه مع كل حقل من دول لوحده: [[sku = models.CharField(max_length=30, blank=True)]]، و [[barcode = models.CharField(max_length=30)]]، و [[weight = models.PositiveIntegerField()]]. وبعدين جرّبهم واحد واحد (ولو سألك اختار [[3]] عشان يخرج).`, done: R`[[sku]] اتعمل من غير أسئلة ([[blank=True]] بيخلي [[""]] قيمة مقبولة فبيحطها للصفوف القديمة)، و [[barcode]] و [[weight]] الاتنين سألوك [[It is impossible to add a non-nullable field ... without specifying a default]]، وكتبت إن السؤال عن الصفوف الموجودة مش عن الصفوف الجديدة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك [[Category]] فيها ٣ أقسام ومفيهاش [[slug]]. زوّد [[slug]] على ٣ migrations: حقل nullable، و data migration بـ [[RunPython]] بتملاه بـ [[slugify(name)]] وليها reverse، وبعدين [[unique=True]] من غير null (القسم «data migration» في الشرح).`, done: R`بعد [[migrate]] الأقسام كلها ليها slug ([[books]] و [[cables]] و [[laptops]])، و [[migrate shop 0002]] رجّعهم [[None]] من غير [[IrreversibleError]]، و [[migrate]] تاني ملاهم من جديد.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** data migration مكتوب فيها [[from shop.models import Category]] فوق، وبتعمل [[Category.objects.filter(...)]]. شغّالة النهارده. بعد شهر حد زوّد حقل جديد إجباري في [[Category]]، و [[migrate]] على قاعدة جديدة وقع. اشرح ليه، وصلّحها بـ [[apps.get_model]].`, done: R`كتبت إن الـ import بيجيب الـ model **الحالي** (فيه العمود الجديد) والقاعدة وقت الـ migration دي لسه معندهاش العمود، و [[apps.get_model("shop", "Category")]] بيجيب الـ model بشكله وقت الـ migration. وشوفت الـ error بنفسك ([[OperationalError: no such column: shop_category.code]] لو الحقل اسمه [[code]])، وبعد التصليح [[migrate]] على قاعدة فاضية بيعدّي.` },
            { lvl: 'تحدي', t: R`**محاكاة فريق:** اعمل migration [[0005_product_sku]] و [[0005_product_weight]] الاتنين معتمدين على نفس الـ [[0004]] (كأن اتنين عملوهم في branches)، وشوف [[migrate]] بيقول إيه، وحلها بـ [[--merge]]، وبعدين اعمل [[squashmigrations]] واتأكد إنه بيشتغل على Postgres فاضي.`, done: R`[[migrate]] رفض بـ [[Conflicting migrations detected; multiple leaf nodes]]، و [[makemigrations --merge]] عمل [[0006_merge_...]]، و [[showmigrations]] كله [[[X]]]. والـ squash اتطبّق على قاعدة Postgres جديدة من غير [[already exists]] (عشان الـ [[RunPython]] فيها [[elidable=True]]).` },
          ],
          try: R`اعمل الـ models دي في app [[shop]]، وضيفها في [[INSTALLED_APPS]]، واعمل [[makemigrations]] و [[migrate]]. وبعدين زوّد حقل [[description = models.TextField(blank=True)]]، واعمل [[makemigrations --check --dry-run]] الأول، وبعدين الـ migration نفسه، واقرا الـ SQL بـ [[sqlmigrate]]. وأخيرًا جرّب تمسح قسم فيه منتجات من [[python manage.py shell]].`,
          sol: R`[[makemigrations --check --dry-run]] بيطبع [[+ Add field description to product]] ويرجع exit code 1. وبعد [[makemigrations]] هيتعمل [[0003_product_description.py]] (أو الرقم اللي بعد آخر واحد عندك). و [[blank=True]] قاعدة للـ forms والـ admin (الحقل مش إجباري في الفورم)، مش للقاعدة. عشان كده [[makemigrations]] مش هيسألك عن default: [[TextField]] و [[CharField]] اللي عليهم [[blank=True]] ليهم default ضمني [[""]] (من غير [[blank]] بيسأل: جربتها بـ [[CharField(max_length=30)]] وطلع [[It is impossible to add a non-nullable field]])، فالـ SQL على Postgres بيبقى [[ADD COLUMN "description" text DEFAULT '' NOT NULL]] وبعدها [[DROP DEFAULT]].

ومسح القسم: [[Category.objects.get(name="Books").delete()]] بيرمي [[ProtectedError]] برسالة [[Cannot delete some instances of model 'Category' because they are referenced through protected foreign keys: 'Product.category'.]]. لو كانت [[CASCADE]] كان هيمسح القسم ومنتجاته كلها من غير ما يسألك.`
        },
        {
          cmd: "QuerySet و filter",
          title: "تسأل القاعدة بـ Python: filter و Q و F و annotate",
          desc: R`[[Product.objects.filter(...)]] بيرجّع QuerySet: وصف لـ query لسه متنفذش. بتكمّل عليه بـ [[exclude]] و [[order_by]] و [[[:10]]]، وأول ما تلف عليه أو تعمل [[list()]] أو [[count()]] بيتبعت SQL واحد.

الشروط بتتكتب [[field__lookup=value]] ([[price_cents__lt=20000]] و [[name__icontains="usb"]] و [[category__name="Books"]] اللي بتعمل JOIN لوحدها). و [[Q]] للـ OR، و [[F]] لعمود في نفس الصف، و [[annotate]] و [[aggregate]] للـ COUNT و SUM و AVG.`,
          deep: {
            why: R`أغلب كود أي تطبيق Django بيكلّم القاعدة. لو فاهم الـ QuerySet وبيطلّع SQL إيه، هتكتب query واحدة بدل loop بيعمل مية، وهتسيب القاعدة تحسب ([[Count]] و [[Sum]]) بدل ما تجيب الصفوف كلها لـ Python. والـ ORM بيمنع SQL injection لأن القيم بتتبعت parameters مش نص متلزّق.`,
            how: R`الـ QuerySet lazy: كل [[filter]] بيرجّع QuerySet جديد ومفيش query. التنفيذ بيحصل عند: الـ loop، و [[list()]]، و [[len()]]، و [[bool()]]، والـ slicing بـ step، و [[repr]] في الـ shell. وبعد التنفيذ النتيجة بتتخزن جوه الـ QuerySet نفسه، فلو لفيت عليه تاني مفيش query.

الـ lookups بعد [[__]]: [[exact]] (الافتراضي) و [[iexact]] و [[contains]] و [[icontains]] و [[startswith]] و [[in]] و [[gt]]/[[gte]]/[[lt]]/[[lte]] و [[range]] و [[isnull]]. و [[__]] بين أسماء حقول بيمشي في العلاقات: [[category__name]] يعني JOIN على [[shop_category]].

[[filter(a, b)]] يعني AND. [[Q(a) | Q(b)]] يعني OR، و [[~Q(a)]] يعني NOT. [[F("stock")]] بيشاور على العمود في القاعدة، فـ [[update(stock=F("stock") - 1)]] بيبقى [[UPDATE ... SET stock = stock - 1]]: القاعدة بتطرح، فمفيش race condition لو طلبين جم مع بعض.

[[annotate]] بيضيف عمود محسوب لكل صف (GROUP BY)، و [[aggregate]] بيرجّع dict برقم واحد للكل. و [[values()]] و [[values_list(flat=True)]] بيرجّعوا dicts أو قيم بدل objects (أخف). و [[get()]] لصف واحد بالظبط: بيرمي [[DoesNotExist]] لو مفيش، و [[MultipleObjectsReturned]] لو أكتر من واحد. و [[exists()]] أسرع من [[count() > 0]].`,
            when: R`في كل view و service. و [[print(qs.query)]] وإنت بتطوّر عشان تشوف الـ SQL. ولما الـ query تبقى معقدة جدًا (window functions تقيلة، CTE)، فيه [[raw()]] أو [[connection.cursor()]] بـ SQL صريح وparameters.`,
            mistakes: R`[[len(qs)]] عشان تعدّ (بيجيب كل الصفوف) بدل [[qs.count()]] لو مش هتستخدم الصفوف. و [[if qs:]] على QuerySet كبير. و [[Product.objects.get(name=...)]] على حقل مش unique ([[MultipleObjectsReturned]]). و [[p.stock -= 1; p.save()]] في طلبين مع بعض فواحد بيضيع (استخدم [[F]]). وتفتكر [[print(qs.query)]] هو الـ SQL بالظبط: القيم فيه من غير علامات تنصيص ([[= Books]])، فمتنسخهوش وتشغّله. وتلزّق input اليوزر في [[raw()]] بـ f-string.`
          },
          teach: R`## المثال بيعمل إيه؟

مجموعة queries على نفس الـ models بتاعة الدرس اللي فات، شغالة في [[python manage.py shell]] على ٣ أقسام و ١٠ منتجات. اتشغّل بـ Django 6.1.2 على Postgres 16 في Docker، والنواتج تحت حقيقية من التشغيل.

---

## ١. الـ imports

~~~python
from django.db.models import Avg, Count, F, Q, Sum
from shop.models import Category, Product
~~~

[[Avg]] و [[Count]] و [[Sum]] دوال تجميع، و [[F]] و [[Q]] لبناء الشروط. وكل model ليه [[objects]]: الـ manager اللي منه بتبدأ أي query.

---

## ٢. [[filter]] و [[.query]]

~~~python
cheap = Product.objects.filter(price_cents__lt=20000, is_active=True)
print(cheap.query)
~~~

- [[price_cents__lt=20000]]: العمود [[price_cents]]، والـ lookup [[lt]] (less than) يعني [[<]].
- [[is_active=True]]: من غير lookup يبقى [[exact]] يعني [[=]].
- الاتنين في نفس [[filter]] يعني AND.

~~~text الناتج
SELECT "shop_product"."id", ... FROM "shop_product" WHERE ("shop_product"."is_active" AND "shop_product"."price_cents" < 20000) ORDER BY "shop_product"."created_at" DESC
~~~

الـ [[ORDER BY ... DESC]] جاي من [[Meta.ordering]] في الـ model.

### الـ QuerySet مش بيتنفذ لحد ما تحتاجه

قست عدد الـ queries بـ [[CaptureQueriesContext]] (الدرس الجاي بيشرحه):

~~~text الناتج
after building: 0
after list(): 1 5
loop again: 1
count(): 1
new qs count(): 2
~~~

بناء [[filter]] و [[exclude]] = صفر queries. [[list(qs)]] = query واحدة. اللف تاني و [[count()]] على نفس الـ QuerySet مبيعملوش query لأن النتيجة متخزنة جواه. لكن QuerySet جديد بيعمل query جديدة.

---

## ٣. [[count]] و [[values_list]]

~~~python
print(cheap.count(), list(cheap.values_list("name", flat=True)))
~~~

~~~text الناتج
4 ['USB-C 2m', 'Ethernet 5m', 'USB-C 1m', 'SQL Basics']
~~~

- [[count()]]: [[SELECT COUNT(*)]] في القاعدة، مش بيجيب الصفوف.
- [[values_list("name", flat=True)]]: هات عمود [[name]] بس كـ قيم، مش objects. و [[flat=True]] عشان عمود واحد ميبقاش tuples.

---

## ٤. علاقة + [[exclude]] + ترتيب + LIMIT

~~~python
books = Product.objects.filter(category__name="Books").exclude(stock=0).order_by("price_cents")[:2]
print(list(books))
~~~

~~~text الناتج
[<Product: SQL Basics>, <Product: Clean Code>]
~~~

والـ SQL:

~~~text الناتج
... FROM "shop_product" INNER JOIN "shop_category" ON ("shop_product"."category_id" = "shop_category"."id") WHERE ("shop_category"."name" = Books AND NOT ("shop_product"."stock" = 0)) ORDER BY "shop_product"."price_cents" ASC LIMIT 2
~~~

| الكود | الـ SQL |
|---|---|
| [[category__name="Books"]] | [[INNER JOIN shop_category]] و [[name = ...]]: الـ [[__]] مشي في العلاقة وعمل الـ JOIN لوحده |
| [[.exclude(stock=0)]] | [[NOT (stock = 0)]]: عكس الشرط كله، مش «stock مش صفر» بس (مع الـ NULL بيفرق) |
| [[.order_by("price_cents")]] | [[ORDER BY price_cents ASC]]، وبيلغي [[Meta.ordering]] خالص بدل ما يزوّد عليه |
| [[[:2]]] | [[LIMIT 2]]. الـ slicing في Django بيتحول LIMIT و OFFSET |

> لاحظ [[= Books]] من غير علامات: [[.query]] للقراية بس. القيمة الحقيقية بتتبعت parameter منفصل.

---

## ٥. [[Q]] للـ OR

~~~python
Product.objects.filter(Q(stock=0) | Q(price_cents__gte=5000000))
~~~

~~~text الناتج (الأسامي)
['Ethernet 5m', 'Dell XPS', 'MacBook Air', 'ThinkPad X1', 'Python Tricks']
~~~

[[|]] بين اتنين [[Q]] = OR: «خلصان من المخزون **أو** سعره ٥٠ ألف جنيه أو أكتر». و [[&]] = AND، و [[~Q(...)]] = NOT.

---

## ٦. [[F]]: القاعدة هي اللي تحسب

~~~python
Product.objects.filter(name="HDMI 2m").update(stock=F("stock") - 1)
~~~

[[update()]] بيعمل [[UPDATE]] واحد من غير ما يجيب الصف، و [[F("stock") - 1]] بيتحول [[stock = stock - 1]]. كان ١٥ وبقى:

~~~text الناتج
14
~~~

لو كتبت [[p.stock = p.stock - 1; p.save()]] واتنين اشتروا في نفس اللحظة، الاتنين هيقروا ١٥ ويكتبوا ١٤. مع [[F]] القاعدة بتطرح مرتين صح.

---

## ٧. [[annotate]] و [[aggregate]]

~~~python
Category.objects.annotate(n=Count("products"), avg=Avg("products__price_cents")).order_by("name").values("name", "n", "avg")
~~~

~~~text الناتج
{'name': 'Books', 'n': 3, 'avg': 31000.0}
{'name': 'Cables', 'n': 4, 'avg': 16250.0}
{'name': 'Laptops', 'n': 3, 'avg': 5866666.666666667}
~~~

- [[annotate(n=Count("products"))]]: لكل قسم، عدّ منتجاته. [[products]] هو الـ [[related_name]]. ده [[LEFT OUTER JOIN]] و [[GROUP BY]].
- [[Avg("products__price_cents")]]: متوسط السعر لكل قسم.
- [[values(...)]]: dicts بالأعمدة دي بس.

~~~python
Product.objects.aggregate(stock_value=Sum(F("price_cents") * F("stock")))
~~~

~~~text الناتج
{'stock_value': 33313000}
~~~

[[aggregate]] رقم واحد للجدول كله: قيمة المخزون = مجموع (السعر × الكمية)، محسوبة في القاعدة.

---

## ٨. [[exists]] و [[get]] و [[get_or_create]]

~~~text الناتج
True
DoesNotExist: Product matching query does not exist.
Books False
~~~

- [[filter(stock=0).exists()]]: [[True]]. بيعمل [[SELECT 1 ... LIMIT 1]].
- [[Product.objects.get(pk=999999)]]: مفيش صف فبيرمي [[Product.DoesNotExist]]. في الـ views بتستخدم [[get_object_or_404]] بدلها.
- [[get_or_create(name="Books")]]: رجّع [[(object, created)]]. القسم موجود فـ [[created]] بـ [[False]].

---

## ٩. QuerySet بتاعك: [[active()]] بدل [[filter(is_active=True)]] في كل حتة

لما نفس الشرط يتكرر في ١٠ views، حطه في الـ model مرة واحدة. اتجرّب على SQLite:

~~~python
class ProductQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_active=True)
    def in_stock(self):
        return self.filter(stock__gt=0)
class Product(models.Model):
    objects = ProductQuerySet.as_manager()
    ...
~~~

- [[models.QuerySet]]: الأب بتاع أي QuerySet. أي method بتضيفها بترجّع [[self.filter(...)]] عشان تتكمّل بعدها بسلسلة.
- [[as_manager()]]: بيعمل manager فيه نفس الـ methods، فـ [[Product.objects.active()]] بيشتغل.

~~~python
Product.objects.active().in_stock().filter(category__name="Books")
~~~

~~~text اتشغّل فعلًا · الناتج (آخر الـ SQL)
WHERE ("shop_product"."is_active" = True AND "shop_product"."stock" > 0 AND "shop_category"."name" = Books)
~~~

تلات شروط في [[WHERE]] واحدة، و [[.count()]] على [[active().in_stock()]] رجّع [[8]]. والاسم بيقول المعنى («منتجات ظاهرة ومتاحة») مش التفاصيل.

---

## ١٠. حاجات بتوفّر queries وذاكرة

| الأداة | بتعمل إيه | اللي اتقاس |
|---|---|---|
| [[only("name")]] | بيجيب الأعمدة دي بس (و [[id]]) | لو قريت عمود مش فيها بعد كده: query **زيادة** لكل object. [[only("name")]] وبعدين [[p.stock]] = queryين: [[SELECT "id", "name"]] وبعدين [[SELECT "id", "stock" ... WHERE id = 6]] |
| [[defer("description")]] | عكس [[only]]: كل الأعمدة ما عدا دي | مفيد لعمود نص كبير مش بتعرضه في الـ list |
| [[bulk_update(objs, ["stock"])]] | [[UPDATE]] واحد فيه [[CASE WHEN id = ... THEN ...]] لكل الصفوف | ٤ منتجات: [[BEGIN]] و [[UPDATE]] واحد و [[COMMIT]]، مقابل ٤ [[UPDATE]] بـ [[save()]] في loop |
| [[update_or_create(name=..., defaults={...})]] | بيدوّر، ولو لقى بيحدّث بـ [[defaults]]، ولو ملقاش بيعمل | [[create_defaults]] (من Django 5.0) للقيم اللي تتحط وقت الإنشاء بس. رجّع [[20 False]]: لقاه وحدّثه |
| [[iterator(chunk_size=4)]] | بيلف على النتايج من غير ما يخزّنهم كلهم في الـ QuerySet | ١٠ صفوف = query واحدة. مفيد لملايين الصفوف في سكربت، ومبيشتغلش مع [[prefetch_related]] من غير [[chunk_size]] |
| [[in_bulk([1, 2])]] | dict من الـ id للـ object في query واحدة | [[{2: <Product: USB-C 2m>, 1: <Product: HDMI 2m>}]] |
| [[explain()]] | خطة القاعدة للـ query | على SQLite: [[SCAN shop_product]] و [[USE TEMP B-TREE FOR ORDER BY]]، يعني بيقرا الجدول كله ويرتّب |

### حاجة مش موجودة: الـ index السالب

~~~python
Product.objects.all()[-1]
~~~

~~~text الناتج
ValueError: Negative indexing is not supported.
~~~

الـ SQL مفيهوش «آخر صف». اعكس الترتيب واخد الأول: [[Product.objects.order_by("-id").first()]]، أو [[.last()]] اللي بيعمل نفس الحاجة.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| شرط | [[filter(field__lookup=value)]] |
| عكسه | [[exclude(...)]] |
| OR | [[Q(a) | Q(b)]] |
| عمود في نفس الصف | [[F("field")]] |
| عدد/مجموع لكل صف | [[annotate(Count(...))]] |
| رقم واحد للكل | [[aggregate(Sum(...))]] |
| موجود ولا لأ | [[exists()]] |
| الـ SQL | [[print(qs.query)]] |

- الـ QuerySet lazy، ومتخزّن بعد أول تنفيذ.
- خلّي القاعدة تحسب: [[count]] و [[F]] و [[annotate]] بدل loops في Python.`,
          example: R`from django.db.models import Avg, Count, F, Q, Sum
from shop.models import Category, Product
cheap = Product.objects.filter(price_cents__lt=20000, is_active=True)
print(cheap.query)
print(cheap.count(), list(cheap.values_list("name", flat=True)))
books = Product.objects.filter(category__name="Books").exclude(stock=0).order_by("price_cents")[:2]
print(list(books))
print(list(Product.objects.filter(Q(stock=0) | Q(price_cents__gte=5000000)).values_list("name", flat=True)))
Product.objects.filter(name="HDMI 2m").update(stock=F("stock") - 1)
print(Product.objects.get(name="HDMI 2m").stock)
for row in Category.objects.annotate(n=Count("products"), avg=Avg("products__price_cents")).order_by("name").values("name", "n", "avg"):
    print(row)
print(Product.objects.aggregate(stock_value=Sum(F("price_cents") * F("stock"))))
print(Product.objects.filter(stock=0).exists())
try:
    Product.objects.get(pk=999999)
except Product.DoesNotExist as e:
    print("DoesNotExist:", e)
cat, created = Category.objects.get_or_create(name="Books")
print(cat, created)`,
          flag: "script",
          learn: R`تكتب أي سؤال للقاعدة بالـ ORM: شروط و OR و NOT، وعلاقات، وترتيب وصفحات، وعدّ وتجميع في القاعدة، وتحديث من غير race condition، و QuerySet بتاعك بأسامي زي [[active()]]، وتعرف إمتى الـ query بتتبعت فعلًا.`,
          out: R`query واحدة بدل loop بيعمل مية، والقاعدة هي اللي بتحسب، وتقدر تقرا الـ SQL اللي Django بعته.`,
          use: {
            prog: R`أغلب كود أي view أو serializer أو أمر إداري هو QuerySet. فهم الـ laziness والـ lookups بيفرق بين صفحة بتاخد ١٠ ملّي ثانية وصفحة بتاخد ثانيتين.`,
            work: R`تقارير زي «عدد الطلبات لكل قسم» أو «قيمة المخزون» بتتكتب في سطر [[annotate]] أو [[aggregate]] بدل ما تجيب الجدول كله لـ Python.`,
            cs: R`الـ QuerySet مثال على lazy evaluation و builder pattern: كل method بترجّع object جديد بيوصف الـ query، والتنفيذ بيتأجل لحد ما حد يحتاج النتيجة.`,
          },
          lines: [
            R`[[from django.db.models import Avg, Count, F, Q, Sum]]: [[Avg]] و [[Count]] و [[Sum]] دوال تجميع بتتحول [[AVG()]] و [[COUNT()]] و [[SUM()]] في الـ SQL، و [[F]] بيشاور على عمود، و [[Q]] بيبني شرط ينفع يتجمع بـ OR و NOT.`,
            R`[[from shop.models import Category, Product]]: الـ models من درس «models و makemigrations». كل model ليه [[objects]]، وده الـ manager اللي منه بتبدأ أي query.`,
            R`[[Product.objects.filter(price_cents__lt=20000, is_active=True)]]: [[__lt]] يعني «أقل من» ([[<]])، والشرطين في نفس [[filter]] يعني AND. السطر ده **مبيبعتش أي query**: بيرجّع QuerySet بيوصفها بس.`,
            R`[[print(cheap.query)]]: بيطبع الـ SQL اللي هيتبعت، للقراية بس، لأن القيم فيه من غير علامات تنصيص ([[= Books]]). والـ [[ORDER BY ... DESC]] اللي هتشوفه جاي من [[Meta.ordering]].`,
            R`[[cheap.count()]] بيعمل [[SELECT COUNT(*)]] في القاعدة من غير ما يجيب الصفوف، و [[values_list("name", flat=True)]] بيجيب عمود [[name]] بس كقيم مش objects. و [[list()]] حواليه هو اللي بيبعت الـ query.`,
            R`[[filter(category__name="Books")]]: الـ [[__]] بين اسمين بيمشي في العلاقة، فبيعمل [[INNER JOIN shop_category]] لوحده. و [[.exclude(stock=0)]] = [[NOT (stock = 0)]]، و [[.order_by("price_cents")]] بيلغي [[Meta.ordering]]، و [[[:2]]] = [[LIMIT 2]].`,
            R`[[print(list(books))]]: هنا بس الـ query بتتبعت، لأن [[list()]] محتاج الصفوف. لو كنت كتبت [[print(books)]] كانت برضه هتتبعت (الـ [[repr]] بتاع الـ QuerySet بيجيب أول ٢١ صف).`,
            R`[[Q(stock=0) | Q(price_cents__gte=5000000)]]: [[|]] بين اتنين [[Q]] = OR، يعني «خلصان من المخزون أو سعره ٥٠ ألف جنيه أو أكتر». من غير [[Q]] مفيش طريقة تكتب OR في [[filter]].`,
            R`[[.update(stock=F("stock") - 1)]]: [[UPDATE]] واحد من غير ما يجيب الصف لـ Python، و [[F("stock") - 1]] بيتكتب [[stock = stock - 1]] فالقاعدة هي اللي بتطرح. لو طلبين جم في نفس اللحظة الاتنين بيتحسبوا، عكس [[p.stock -= 1; p.save()]] (درس «transaction.atomic» بيقيس الفرق).`,
            R`[[Product.objects.get(name="HDMI 2m").stock]]: بنقرا الصف تاني من القاعدة عشان نشوف القيمة بعد الـ [[update]]: كانت ١٥ وبقت [[14]]. أي object كان معاك قبل الـ [[update]] لسه فيه ١٥ لحد ما تعمل [[refresh_from_db()]].`,
            R`[[annotate(n=Count("products"), avg=Avg("products__price_cents"))]]: لكل قسم بيضيف عمودين محسوبين في نفس الـ query ([[LEFT OUTER JOIN]] و [[GROUP BY]]): عدد منتجاته ومتوسط سعرها. [[products]] هو الـ [[related_name]]. و [[.values("name", "n", "avg")]] بيرجّع dicts بالأعمدة دي بس.`,
            R`[[print(row)]]: كل صف dict زي [[{'name': 'Books', 'n': 3, 'avg': 31000.0}]]. الـ [[avg]] بيرجع float حتى لو الأسعار أرقام صحيحة.`,
            R`[[aggregate(stock_value=Sum(F("price_cents") * F("stock")))]]: رقم واحد للجدول كله بيرجع في dict: مجموع (السعر × الكمية) محسوب في القاعدة. لو مفيش صفوف القيمة بتبقى [[None]] مش صفر.`,
            R`[[filter(stock=0).exists()]]: بيعمل [[SELECT 1 ... LIMIT 1]] ويرجّع [[True]] أو [[False]]. أسرع من [[count() > 0]] لأن القاعدة بتقف عند أول صف.`,
            R`[[try:]] بنجرّب حاجة عارفين إنها ممكن ترمي: نجيب صف مش موجود.`,
            R`[[Product.objects.get(pk=999999)]]: [[get]] لصف **واحد بالظبط**. لو مفيش بيرمي [[Product.DoesNotExist]]، ولو أكتر من واحد [[MultipleObjectsReturned]].`,
            R`[[except Product.DoesNotExist as e]]: كل model ليه [[DoesNotExist]] خاص بيه، فبتمسك الخطأ ده بالظبط من غير ما تمسك أي error تاني بالغلط. في الـ views بتستخدم [[get_object_or_404]] بدل الـ try ده.`,
            R`[[print("DoesNotExist:", e)]]: الرسالة [[Product matching query does not exist.]]. مفيهاش القيمة اللي دوّرت بيها، فلو بتسجّلها في لوج زوّد الـ [[pk]] بإيدك.`,
            R`[[Category.objects.get_or_create(name="Books")]]: بيدوّر بالشروط، ولو ملقاش بيعمل صف بيها. بيرجّع tuple [[(object, created)]]، فبنفكّه في متغيرين. خد بالك إن الشروط لازم تبقى على حقل [[unique]] وإلا طلبين مع بعض ممكن يعملوا صفين.`,
            R`[[print(cat, created)]]: [[Books False]]: القسم كان موجود فـ [[created]] بـ [[False]] ومفيش [[INSERT]] اتعمل.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الـ lookup لكل واحدة من غير ما تبص: الاسم فيه «usb» بأي حروف، والسعر بين ١٠٠ و ٢٠٠ جنيه، والقسم واحد من Books أو Cables، ومن غير تاريخ إنشاء، والاسم بيبدأ بـ «Dell». وجرّبهم في [[manage.py shell]].`, done: R`استخدمت [[name__icontains]] و [[price_cents__range=(10000, 20000)]] و [[category__name__in=[...]]] و [[created_at__isnull=True]] و [[name__startswith]]، وكل واحدة رجّعت الصفوف اللي توقّعتها على الداتا بتاعة الدرس.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع عدد الـ queries:** لف بـ [[CaptureQueriesContext]] حوالين ده واكتب الرقم قبل ما تشغّل: [[qs = Product.objects.filter(stock__gt=0)]] وبعدين [[qs.count()]] وبعدين [[list(qs)]] وبعدين [[qs.count()]] تاني وبعدين [[qs.filter(price_cents__lt=20000).count()]].`, done: R`الرقم طلع [[3]] زي ورقتك: أول [[count()]] query، و [[list(qs)]] query، والـ [[count()]] التانية صفر لأن النتيجة اتخزنت في [[qs]]، و [[qs.filter(...)]] QuerySet جديد فيه query.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** في ٣ سطور لزميل: ليه [[p.stock -= 1; p.save()]] غلط في صفحة دفع، و [[update(stock=F("stock") - 1)]] صح؟ وإيه اللي [[print(qs.query)]] بيطبعه لكل واحدة؟`, done: R`الشرح فيه كلمة «اتنين بيقروا نفس القيمة»، والـ SQL اللي طبعته للتانية فيه [[SET "stock" = ("shop_product"."stock" - 1)]]، والأولى بتعمل [[SELECT]] وبعدين [[UPDATE]] بيكتب **كل** الأعمدة والـ stock فيه رقم ثابت (زي [["stock" = 13]]) مش معادلة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** تقرير بـ query واحدة: لكل قسم، عدد المنتجات، وعدد الخلصانة، وقيمة المخزون بالجنيه، مترتّب من الأعلى قيمة. استخدم [[annotate]] و [[Count(..., filter=Q(...))]] و [[Sum(F(...) * F(...))]].`, done: R`[[CaptureQueriesContext]] بيقول [[1]]، و Laptops أول واحد، و Books فيها [[1]] خلصان، والأرقام مطابقة لحسبتك بإيدك على ٣ منتجات على الأقل.` },
            { lvl: 'تطبيق', t: R`**refactor:** الكود ده شغال بس وحش ومكرر في ٤ views: [[Product.objects.filter(is_active=True).filter(stock__gt=0)]]. اعمل [[ProductQuerySet]] فيه [[active()]] و [[in_stock()]] و [[cheaper_than(cents)]]، وخلّيه الـ manager بـ [[as_manager()]] (القسم «QuerySet بتاعك» في الشرح).`, done: R`[[Product.objects.active().in_stock().cheaper_than(20000).count()]] بيرجّع نفس الرقم اللي كان بيرجعه الكود القديم، و [[print(...query)]] فيه الشروط التلاتة في [[WHERE]] واحدة، ومفيش [[filter(is_active=True)]] متكرر في الـ views.` },
            { lvl: 'تحدي', t: R`**صلّح البايظ:** الكود ده بطيء جدًا على ١٠٠ ألف منتج ووقع مرة بـ [[MultipleObjectsReturned]]: [[if len(Product.objects.filter(stock=0)) > 0: p = Product.objects.get(name=request.GET["name"]); names = [x.name for x in Product.objects.all()]]]. لاقي التلات مشاكل وصلّحهم.`, done: R`[[len()]] بقت [[exists()]] (الـ SQL فيه [[LIMIT 1]])، و [[get(name=...)]] بقت [[filter(name=...).first()]] أو [[get]] على حقل [[unique]]، و الـ list بقت [[values_list("name", flat=True)]] (الـ SQL بقى فيه عمود [[name]] بس بدل كل الأعمدة).` },
          ],
          try: R`في [[python manage.py shell]]: هات المنتجات اللي اسمها فيه [[usb]] (من غير ما تهتم بالـ capital) واطبع الـ SQL. وبعدين عدّ المنتجات الخلصانة في كل قسم بـ [[annotate]] و [[Count]] مع [[filter=Q(...)]]. وأخيرًا جرّب [[Product.objects.get(category__name="Books")]] وشوف الـ exception.`,
          solCode: R`from django.db.models import Count, Q
from shop.models import Category, Product
print(Product.objects.filter(name__icontains="usb").query)
for c in Category.objects.annotate(out=Count("products", filter=Q(products__stock=0))).order_by("name"):
    print(c.name, c.out)
Product.objects.get(category__name="Books")`,
          sol: R`[[icontains]] على Postgres بيتحول [[WHERE UPPER("shop_product"."name"::text) LIKE UPPER(%usb%)]]: الطرفين capital، فـ [[USB]] و [[usb]] نفس الحاجة.

الخلصان في كل قسم (على نفس الداتا): [[Books 1]] و [[Cables 1]] و [[Laptops 1]]. و [[Count(..., filter=Q(...))]] بيعدّ الصفوف اللي بتحقق الشرط بس، في نفس الـ GROUP BY.

و [[get(category__name="Books")]] بيرمي [[shop.models.Product.MultipleObjectsReturned: get() returned more than one Product -- it returned 3!]]، لأن [[get]] لصف واحد بالظبط. استخدم [[filter]] لو ممكن يرجع أكتر من واحد.`
        },
        {
          cmd: "select_related و prefetch_related",
          title: "مشكلة N+1 في Django: قيسها وصلّحها",
          desc: R`لو لفيت على ١٠٠٠ منتج وقريت [[p.category.name]]، Django بيعمل query للمنتجات وبعدين query لكل منتج يجيب قسمه: ١٠٠١ query. ده اسمه N+1. و [[select_related("category")]] بيجيب الاتنين في JOIN واحد، و [[prefetch_related("products")]] للعلاقات العكسية والـ many-to-many بيجيبهم في query تانية واحدة بـ [[IN]].

متخمّنش: قيس بـ [[CaptureQueriesContext]] (أو [[django_assert_num_queries]] في الاختبارات). نفس المشكلة في كل ORM: شوف «with() و N+1» في تاب PHP و «Include و N+1» في تاب .NET.`,
          deep: {
            why: R`الـ N+1 أشهر سبب لبطء صفحات Django، ومبيبانش وإنت بتطوّر بـ ١٠ صفوف على SQLite محلي. على الإنتاج بـ ألف صف وقاعدة على سيرفر تاني، كل query فيها رحلة على الشبكة، فالصفحة بتاخد ثواني. والحل سطر واحد لو عرفت تشوفها.`,
            how: R`الـ ForeignKey في Django lazy: [[p.category]] بيعمل query أول مرة تقراه لكل object لوحده. [[select_related]] بيضيف [[INNER JOIN]] (أو [[LEFT OUTER JOIN]] لو الحقل nullable) ويملى [[p.category]] من نفس الصف. ده ينفع للعلاقات اللي ناحيتها صف واحد: ForeignKey و OneToOne.

[[prefetch_related]] للعلاقات اللي ناحيتها صفوف كتير (العكسي [[category.products]] و ManyToMany): بيعمل query للأب، وبعدها query واحدة [[WHERE category_id IN (...)]]، ويوزّع النتيجة على الـ objects في Python. ولو عايز تفلتر المحمّل: [[Prefetch("products", queryset=..., to_attr="in_stock")]]، والنتيجة في list اسمها [[in_stock]].

[[CaptureQueriesContext(connection)]] بيسجّل كل query جوه الـ [[with]] حتى لو [[DEBUG]] مقفول. وفي الاختبارات [[assertNumQueries]] أو fixture [[django_assert_num_queries]] من pytest-django بيفشّل الاختبار لو العدد زاد، فالمشكلة متقعش تاني. و django-debug-toolbar بيوريك عدد الـ queries لكل صفحة وإنت بتطوّر.`,
            when: R`أي list بتعرض حاجة من علاقة: صفحة منتجات فيها اسم القسم، serializer فيه nested object، [[list_display]] في الـ admin فيه حقل من جدول تاني، template بيلف ويقرا [[order.user.email]].`,
            mistakes: R`[[prefetch_related]] على ForeignKey عادي (شغال، بس query زيادة بدل JOIN). و [[select_related]] على علاقة عكسية (بيرمي [[FieldError]]: Invalid field name). وبعد الـ prefetch تكتب [[c.products.filter(stock__gt=0)]]: الـ filter بيعمل query جديدة ويتجاهل اللي اتحمّل (استخدم [[Prefetch(..., queryset=...)]]). و [[select_related]] على سلسلة علاقات طويلة كلها one-to-many فالـ JOIN بيكبّر الصفوف جدًا. والأسوأ: تصلّح الصفحة ومتكتبش اختبار بعدد الـ queries، فحد يرجّعها من غير ما ياخد باله.`
          },
          teach: R`## المثال بيعمل إيه؟

بيقيس ٥ طرق لقراية العلاقات: عدد الـ queries والوقت. اتشغّل بـ Django 6.1.2 على Postgres 16 في container على نفس شبكة Docker، بـ ٥٠ قسم و ١٠٠٠ منتج (اتعملوا بـ [[bulk_create]])، من [[python manage.py shell]].

---

## ١. دالة القياس

~~~python
def measure(label, fn):
    with CaptureQueriesContext(connection) as ctx:
        start = time.perf_counter()
        fn()
        ms = (time.perf_counter() - start) * 1000
    print(f"{label:<28} {len(ctx.captured_queries):>4} queries  {ms:7.1f} ms")
~~~

- [[CaptureQueriesContext(connection)]]: جوه الـ [[with]]، كل query بتتسجّل في [[ctx.captured_queries]] (list فيها dict لكل query: [[sql]] و [[time]]). [[connection]] الاتصال الافتراضي من [[django.db]].
- [[time.perf_counter()]]: ساعة دقيقة للقياس. الفرق × ١٠٠٠ = ملّي ثانية.
- [[f"{label:<28}"]]: اكتب الاسم في ٢٨ خانة محاذاة شمال، و [[:>4]] الرقم في ٤ خانات محاذاة يمين، و [[:7.1f]] رقم عشري بخانة واحدة بعد العلامة. عشان النتايج تطلع جدول.

---

## ٢. ForeignKey: من غير ومع [[select_related]]

~~~python
def naive():
    for p in Product.objects.all():
        p.category.name
def joined():
    for p in Product.objects.select_related("category"):
        p.category.name
~~~

~~~text الناتج
FK naive                     1001 queries    511.5 ms
FK select_related               1 queries     15.0 ms
~~~

- **naive**: query للـ ١٠٠٠ منتج، وبعدين كل [[p.category]] بيعمل [[SELECT ... FROM shop_category WHERE id = ...]] لوحده. يعني ١ + ١٠٠٠. ده الـ N+1.
- **select_related**: query واحدة فيها JOIN:

~~~text الناتج (آخر الـ SQL)
... "shop_category"."id", "shop_category"."name" FROM "shop_product" INNER JOIN "shop_category" ON ("shop_product"."category_id" = "shop_category"."id") ORDER BY "shop_product"."created_at" DESC
~~~

٥١١ ملّي ثانية بقت ١٥: أسرع ٣٠ مرة، والفرق كله رحلات للقاعدة (كل query حوالي نص ملّي ثانية رايح جاي، × ١٠٠٠). ولو القاعدة على سيرفر تاني الرحلة أطول والفرق أكبر. وتشغيل تاني طلّع [[496.6 ms]] و [[13.7 ms]]: نفس الصورة.

---

## ٣. العلاقة العكسية: [[prefetch_related]]

~~~python
def per_category_naive():
    for c in Category.objects.all():
        [p.name for p in c.products.all()]
def per_category_prefetch():
    for c in Category.objects.prefetch_related("products"):
        [p.name for p in c.products.all()]
~~~

~~~text الناتج
reverse naive                  51 queries     48.7 ms
reverse prefetch_related        2 queries     10.2 ms
~~~

- **naive**: query للأقسام، و query لمنتجات كل قسم: ١ + ٥٠.
- **prefetch_related**: query للأقسام، وواحدة بس لكل المنتجات:

~~~text الناتج (التانية، آخرها)
... FROM "shop_product" WHERE "shop_product"."category_id" IN (4, 5, 6) ORDER BY "shop_product"."created_at" DESC
~~~

(ده من تجربة على ٣ أقسام عشان السطر يبقى قصير.) Django بياخد الـ ids من الـ query الأولى ويحطهم في [[IN]]، وبعدين يوزّع المنتجات على أقسامها في Python. و [[c.products.all()]] بعدها بيقرا من اللي اتحمّل.

ليه مش [[select_related("products")]]؟ لأن القسم ليه منتجات **كتير**، و JOIN هيكرر القسم مع كل منتج. [[select_related]] للعلاقات اللي ناحيتها صف واحد بس.

---

## ٤. [[Prefetch]] بفلتر

~~~python
def in_stock_only():
    qs = Category.objects.prefetch_related(Prefetch("products", queryset=Product.objects.filter(stock__gt=0), to_attr="in_stock"))
    for c in qs:
        [p.name for p in c.in_stock]
~~~

~~~text الناتج
Prefetch(to_attr)               2 queries      8.7 ms
~~~

- [[Prefetch("products", queryset=...)]]: حمّل العلاقة دي بس بالـ queryset ده (المنتجات اللي ليها مخزون).
- [[to_attr="in_stock"]]: حط النتيجة في list اسمها [[c.in_stock]] بدل [[c.products]]، عشان محدش يفتكرها كل المنتجات.

لو كتبت [[c.products.filter(stock__gt=0)]] بعد [[prefetch_related("products")]]، الـ filter بيعمل query جديدة لكل قسم، ويرجع الـ N+1.

---

## ٥. طريقتين تانيين تعدّ بيهم: [[connection.queries]] و [[assertNumQueries]]

### [[connection.queries]]: أسرع حاجة في الـ shell

~~~python
from django.db import connection, reset_queries
reset_queries()
for p in Product.objects.all():
    p.category.name
print(len(connection.queries))
print(connection.queries[1])
~~~

- [[reset_queries()]]: صفّر اللستة، لأن Django بيجمّع فيها كل query من أول ما الـ process قامت.
- [[connection.queries]]: list فيها dict لكل query: [[sql]] و [[time]] بالثواني كـ string.

~~~text اتشغّل فعلًا · الناتج (SQLite، ١٠ منتجات، DEBUG = True)
11
{'sql': 'SELECT "shop_category"."id", "shop_category"."name", "shop_category"."slug" FROM "shop_category" WHERE "shop_category"."id" = 6 LIMIT 21', 'time': '0.000'}
~~~

والفخ: نفس الكود بـ [[DEBUG = False]] طبع [[0]] والـ list فاضية، من غير أي تحذير. Django بيسجّل في [[connection.queries]] لما DEBUG شغال بس. فلو بتقيس بإعدادات قريبة من الإنتاج، استخدم [[CaptureQueriesContext]] (شغال دايمًا).

### [[assertNumQueries]]: في اختبارات Django نفسها

~~~python
from django.test import TestCase
from shop.models import Category, Product
class ProductListQueries(TestCase):
    @classmethod
    def setUpTestData(cls):
        c = Category.objects.create(name="Cables", slug="cables")
        for i in range(5):
            Product.objects.create(category=c, name=f"Cable {i}", price_cents=1000 + i, stock=i)
    def test_html_list_uses_one_query(self):
        with self.assertNumQueries(1):
            r = self.client.get("/shop/")
        self.assertContains(r, "Cable 4")
~~~

- [[setUpTestData]]: بيعمل الداتا مرة واحدة للـ class كله (أسرع من [[setUp]] اللي بيتنادى قبل كل اختبار)، وكل اختبار بيشتغل جوه transaction بترجع.
- [[self.assertNumQueries(1)]]: لو الطلب عمل عدد مختلف، الاختبار يفشل ويطبع الـ queries.
- [[self.client.get("/shop/")]]: صفحة HTML بتاعة درس «views و urls» اللي فيها [[select_related("category")]].

[[python manage.py test shop]] عدّى. وشلت [[select_related]] من الـ view:

~~~text الناتج
AssertionError: 6 != 1 : 6 queries executed, 1 expected
Captured queries were:
1. SELECT "shop_product"."id", ... FROM "shop_product" WHERE "shop_product"."is_active" ORDER BY "shop_product"."created_at" DESC LIMIT 20
2. SELECT "shop_category"."id", "shop_category"."name", "shop_category"."slug" FROM "shop_category" WHERE "shop_category"."id" = 1 LIMIT 21
...
~~~

١ للمنتجات + ٥ للأقسام (واحدة لكل منتج، حتى لو كلهم نفس القسم: Django مبيفتكرش إنه جابه قبل كده). ونفس الفكرة في pytest اسمها [[django_assert_num_queries]] (درس «pytest-django»).

---

## النتيجة كلها

| الطريقة | queries | ms |
|---|---|---|
| FK من غير حاجة | 1001 | 511.5 |
| [[select_related("category")]] | 1 | 15.0 |
| عكسي من غير حاجة | 51 | 48.7 |
| [[prefetch_related("products")]] | 2 | 10.2 |
| [[Prefetch(..., to_attr=...)]] | 2 | 8.7 |

## الخلاصة

- ForeignKey أو OneToOne (ناحيته واحد) → [[select_related]]: JOIN.
- عكسي أو ManyToMany (ناحيته كتير) → [[prefetch_related]]: query تانية بـ [[IN]].
- عايز تفلتر المحمّل → [[Prefetch(queryset=..., to_attr=...)]].
- قيس بعدد الـ queries مش بالإحساس: [[CaptureQueriesContext]] في أي مكان، و [[connection.queries]] بس لو DEBUG شغال.
- اكتب اختبار يثبّت العدد ([[assertNumQueries]] هنا، و [[django_assert_num_queries]] في درس «pytest-django»).`,
          example: R`import time
from django.db import connection
from django.db.models import Prefetch
from django.test.utils import CaptureQueriesContext
from shop.models import Category, Product
def measure(label, fn):
    with CaptureQueriesContext(connection) as ctx:
        start = time.perf_counter()
        fn()
        ms = (time.perf_counter() - start) * 1000
    print(f"{label:<28} {len(ctx.captured_queries):>4} queries  {ms:7.1f} ms")
def naive():
    for p in Product.objects.all():
        p.category.name
def joined():
    for p in Product.objects.select_related("category"):
        p.category.name
def per_category_naive():
    for c in Category.objects.all():
        [p.name for p in c.products.all()]
def per_category_prefetch():
    for c in Category.objects.prefetch_related("products"):
        [p.name for p in c.products.all()]
def in_stock_only():
    qs = Category.objects.prefetch_related(Prefetch("products", queryset=Product.objects.filter(stock__gt=0), to_attr="in_stock"))
    for c in qs:
        [p.name for p in c.in_stock]
measure("FK naive", naive)
measure("FK select_related", joined)
measure("reverse naive", per_category_naive)
measure("reverse prefetch_related", per_category_prefetch)
measure("Prefetch(to_attr)", in_stock_only)`,
          flag: "script",
          learn: R`تشوف مشكلة N+1 بالأرقام بثلاث طرق ([[CaptureQueriesContext]] و [[connection.queries]] و [[assertNumQueries]])، وتصلّحها بـ [[select_related]] للعلاقات اللي ناحيتها صف واحد و [[prefetch_related]] و [[Prefetch]] للعلاقات اللي ناحيتها صفوف كتير، وتثبّت العدد باختبار.`,
          out: R`صفحة كانت بتعمل ١٠٠١ query بقت بتعمل واحدة، ووقتها نزل من نص ثانية لـ ١٥ ملّي ثانية، والاختبار بيفشل لو حد رجّعها.`,
          use: {
            prog: R`أي list فيها حاجة من جدول تاني (اسم القسم، اسم الكاتب، عدد التعليقات) هي مكان N+1 محتمل: في الـ templates والـ serializers والـ admin.`,
            net: R`كل query رحلة رايح جاي للقاعدة على الشبكة. ١٠٠٠ رحلة × نص ملّي ثانية على نفس الجهاز = نص ثانية، وعلى سيرفر قاعدة في datacenter تاني بيبقوا ثواني.`,
            work: R`أول حاجة بتبص عليها لما حد يقول «الصفحة دي بطيئة»: عدد الـ queries، قبل الـ cache وقبل ما تكبّر السيرفر.`,
          },
          lines: [
            R`[[import time]] عشان [[time.perf_counter()]]: ساعة عالية الدقة للقياس، مش ساعة الحيطة، فمبتتأثرش لو وقت الجهاز اتغيّر.`,
            R`[[from django.db import connection]]: الاتصال الافتراضي بالقاعدة ([["default"]] في [[DATABASES]]). [[CaptureQueriesContext]] محتاجه عشان يعرف يسجّل queries أنهي اتصال.`,
            R`[[from django.db.models import Prefetch]]: object بيوصف علاقة هتتحمّل بـ queryset انت اللي بتحدده (بفلتر أو ترتيب)، بدل التحميل العادي لكل الصفوف.`,
            R`[[from django.test.utils import CaptureQueriesContext]]: context manager بيسجّل كل query بتتبعت جوه الـ [[with]]، وبيشتغل حتى لو [[DEBUG = False]] (عكس [[connection.queries]]).`,
            R`[[from shop.models import Category, Product]]: نفس الـ models بتاعة الدروس اللي فاتت: المنتج فيه [[ForeignKey]] للقسم، والقسم ليه [[products]] عكسي.`,
            R`[[def measure(label, fn)]]: دالة بتاخد اسم ودالة تانية، وبتشغّلها وتطبع عدد الـ queries والوقت، عشان نقارن ٥ طرق بنفس المقياس.`,
            R`[[with CaptureQueriesContext(connection) as ctx]]: من هنا لآخر البلوك كل query بتتحط في [[ctx.captured_queries]]: list فيها dict لكل query فيه [[sql]] و [[time]].`,
            R`[[start = time.perf_counter()]]: بنسجّل اللحظة قبل الكود. الرقم نفسه ملوش معنى، الفرق بين رقمين هو اللي بيتقاس.`,
            R`[[fn()]]: بنشغّل الكود اللي بنقيسه. أي query بيعملها (حتى من جوه [[p.category]]) بتتسجّل.`,
            R`[[ms = (time.perf_counter() - start) * 1000]]: الفرق بالثواني، و [[* 1000]] بيحوّله ملّي ثانية.`,
            R`[[print(f"{label:<28} {len(...):>4} queries  {ms:7.1f} ms")]]: [[:<28]] الاسم في ٢٨ خانة محاذاة شمال، و [[:>4]] العدد في ٤ خانات محاذاة يمين، و [[:7.1f]] الوقت برقم عشري واحد، فالنتايج تطلع عمدان تحت بعض.`,
            R`[[def naive()]]: الطريقة اللي أي حد بيكتبها أول مرة، ومفيهاش أي غلط ظاهر.`,
            R`[[for p in Product.objects.all()]]: query واحدة بتجيب الـ ١٠٠٠ منتج، بس من غير بيانات القسم: كل منتج فيه [[category_id]] رقم بس.`,
            R`[[p.category.name]]: أول ما بتقرا [[p.category]]، Django بيعمل [[SELECT ... FROM shop_category WHERE id = ...]] للمنتج ده لوحده. ١٠٠٠ منتج = ١٠٠٠ query زيادة، والإجمالي ١٠٠١. ده الـ N+1.`,
            R`[[def joined()]]: نفس اللفة بالظبط، والفرق في سطر الـ queryset بس.`,
            R`[[Product.objects.select_related("category")]]: بيضيف [[INNER JOIN shop_category]] للـ query الأولى، فكل صف راجع فيه أعمدة المنتج والقسم مع بعض.`,
            R`[[p.category.name]]: القسم اتملى من نفس الصف، فمفيش ولا query زيادة. الإجمالي query واحدة.`,
            R`[[def per_category_naive()]]: الاتجاه العكسي: من القسم لمنتجاته (علاقة ناحيتها صفوف كتير).`,
            R`[[for c in Category.objects.all()]]: query واحدة للـ ٥٠ قسم.`,
            R`[[[p.name for p in c.products.all()]]]: [[c.products.all()]] بيعمل [[SELECT ... WHERE category_id = ...]] لكل قسم: ٥٠ query زيادة، والإجمالي ٥١.`,
            R`[[def per_category_prefetch()]]: نفس العكسي بالطريقة الصح.`,
            R`[[Category.objects.prefetch_related("products")]]: query للأقسام، وبعدها query **واحدة** [[WHERE category_id IN (...)]] بكل الـ ids، و Django بيوزّع المنتجات على أقسامها في Python. الإجمالي ٢ مهما كان عدد الأقسام.`,
            R`[[[p.name for p in c.products.all()]]]: [[all()]] هنا بيقرا من اللي اتحمّل، مش query جديدة. لكن [[c.products.filter(...)]] كانت هتعمل query (تحت).`,
            R`[[def in_stock_only()]]: عايزين منتجات كل قسم اللي ليها مخزون بس، من غير ما نرجع للـ N+1.`,
            R`[[Prefetch("products", queryset=Product.objects.filter(stock__gt=0), to_attr="in_stock")]]: حمّل العلاقة دي بالـ queryset ده، وحط النتيجة في list اسمها [[c.in_stock]]. الاسم المختلف بيمنع حد يفتكر إن [[c.products]] فيها كل المنتجات.`,
            R`[[for c in qs]]: هنا الـ queryين بيتبعتوا (الأقسام والمنتجات المفلترة).`,
            R`[[[p.name for p in c.in_stock]]]: [[in_stock]] list Python عادية جاهزة، مش QuerySet، فمفيش [[.all()]] ومفيش queries.`,
            R`[[measure("FK naive", naive)]]: طبع [[1001 queries]] في حوالي [[511 ms]] على Postgres 16 في Docker.`,
            R`[[measure("FK select_related", joined)]]: طبع [[1 queries]] في حوالي [[15 ms]]: نفس الداتا أسرع ٣٠ مرة.`,
            R`[[measure("reverse naive", per_category_naive)]]: طبع [[51 queries]] (قسم + ٥٠).`,
            R`[[measure("reverse prefetch_related", per_category_prefetch)]]: طبع [[2 queries]] مهما زاد عدد الأقسام: واحدة للأقسام وواحدة بـ [[IN]] لكل المنتجات.`,
            R`[[measure("Prefetch(to_attr)", in_stock_only)]]: طبع [[2 queries]] برضه، والمنتجات الخلصانة مش في القايمة.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** لكل علاقة قول [[select_related]] ولا [[prefetch_related]] واكتب السطر: المنتج ← القسم، والقسم ← منتجاته، والـ review ← كاتبه، والمنتج ← reviews بتاعته، والـ review ← المنتج ← القسم بتاعه.`, done: R`[[select_related("category")]] و [[prefetch_related("products")]] و [[select_related("author")]] و [[prefetch_related("reviews")]] و [[select_related("product__category")]]، وكل واحدة جرّبتها وعدد الـ queries طلع ١ لـ [[select_related]] و ٢ لـ [[prefetch_related]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع عدد الـ queries:** ١٠ أقسام وكل قسم فيه ٥ منتجات وكل منتج فيه ٢ review. كام query لـ: [[for c in Category.objects.all(): for p in c.products.all(): p.reviews.count()]]؟ وكام لو [[prefetch_related("products__reviews")]] واستخدمت [[len(p.reviews.all())]]؟`, done: R`كتبت [[61]] (١ + ١٠ + ٥٠) و [[3]] قبل التشغيل، و [[CaptureQueriesContext]] طلّع نفس الرقمين. وجرّبت كمان [[p.reviews.count()]] بعد الـ prefetch: فضلت [[3]] (Django بيعدّ من اللي اتحمّل)، لكن [[p.reviews.filter(rating=3).count()]] طلّعت [[53]] (query لكل منتج من الـ ٥٠).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل نفس الـ ٥ قياسات مرة بـ [[connection.queries]] (بـ [[DEBUG = True]] و [[reset_queries()]]) ومرة بـ [[DEBUG = False]]. وبعدين اكتب في سطرين ليه [[CaptureQueriesContext]] أحسن.`, done: R`بـ DEBUG شغال الأرقام نفس أرقام [[CaptureQueriesContext]] ([[11]] على ١٠ منتجات naive و [[1]] مع [[select_related]])، وبـ DEBUG مقفول [[len(connection.queries)]] طلع [[0]] للاتنين من غير أي error.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[TestCase]] بـ [[setUpTestData]] فيه قسم و ٥ منتجات، و [[self.assertNumQueries(1)]] حوالين [[self.client.get("/shop/")]] بتاعة درس «views و urls». وبعدين شيل [[select_related]] من الـ view وشغّل [[python manage.py test shop]].`, done: R`مع [[select_related]]: [[OK]]. ومن غيره: [[AssertionError: 6 != 1 : 6 queries executed, 1 expected]] وتحته الـ ٦ queries مترقمة، ورجّعت السطر والاختبار عدّى تاني.` },
            { lvl: 'تحدي', t: R`**صلّح البايظ:** template بيعرض كل قسم ومنتجاته المتاحة: [[{% for c in categories %}{% for p in c.products.all %}{% if p.stock %}...]] والـ view فيها [[Category.objects.prefetch_related("products")]]. زميلك غيّر الـ template لـ [[c.products.filter(stock__gt=0)]] عن طريق method في الـ model عشان «أنضف»، والصفحة بقت بطيئة. لاقي السبب وصلّحه بـ [[Prefetch(to_attr=...)]].`, done: R`الـ queries كانت ٢ ورجعت ٢ بعد التصليح (كانت ١ + عدد الأقسام + ١ مع الـ filter)، والـ template بقى بيلف على [[c.available]]، والمنتجات الخلصانة مش ظاهرة في الحالتين.` },
          ],
          try: R`اعمل ٥٠ قسم و ١٠٠٠ منتج بـ [[bulk_create]]، وشغّل الكود ده في [[python manage.py shell]] على SQLite وبعدين على Postgres، وقارن الأوقات. وبعدين جرّب [[select_related("products")]] على [[Category]] وشوف الـ error. وأخيرًا جرّب [[c.products.filter(stock__gt=0)]] بعد [[prefetch_related("products")]] وعدّ الـ queries.`,
          solCode: R`from shop.models import Category, Product
Product.objects.all().delete(); Category.objects.all().delete()
cats = Category.objects.bulk_create([Category(name=f"Category {i}") for i in range(50)])
Product.objects.bulk_create([Product(category=cats[i % 50], name=f"Product {i}", price_cents=1000 + i, stock=i % 7) for i in range(1000)])
print(Category.objects.count(), Product.objects.count())`,
          sol: R`الكود ده بيطبع [[50 1000]]. على Postgres الإنشاء كله كان [[INSERT]] واحد للأقسام وواحد للمنتجات (Django 6 بيستخدم [[UNNEST]] على Postgres)، و ١٢ query بالمسح والعدّ، بدل ١٠٥٠ [[INSERT]] لو استخدمت [[create()]] في loop. على SQLite كانوا ١٠.

عدد الـ queries هو هو على القاعدتين: [[1001]] و [[1]] و [[51]] و [[2]] و [[2]]. الوقت بيختلف: على Postgres في Docker الـ naive أخد حوالي نص ثانية، وعلى SQLite (الملف كان على فولدر ويندوز متشارك مع الـ container، والقراية منه بطيئة) أخد [[2075.3 ms]] مقابل [[13.6 ms]] بـ [[select_related]]. يعني الوقت بيعتمد على مكان القاعدة، لكن العدد ثابت، وعشان كده بنقيس العدد.

[[Category.objects.select_related("products")]] بيرمي [[FieldError: Invalid field name(s) given in select_related: 'products'. Choices are: (none)]]: [[select_related]] للعلاقات اللي ناحيتها صف واحد بس. و [[c.products.filter(stock__gt=0)]] بعد الـ prefetch عمل [[52]] query: الأقسام، والـ prefetch اللي مبقاش ليه لازمة، و query جديدة لكل قسم من الـ ٥٠.`
        },
        {
          cmd: "transaction.atomic",
          title: "كله أو ولا حاجة: atomic و select_for_update و on_commit",
          learn: R`تلف أكتر من تعديل في [[transaction.atomic]] فيا يتحفظوا كلهم يا ولا واحد، وتمنع طلبين في نفس اللحظة يبوّظوا المخزون بـ [[select_for_update]] أو [[F]]، وتبعت الإيميل بعد ما الداتا تتحفظ فعلًا بـ [[on_commit]].`,
          out: R`دالة شراء متينة: مفيش طلب من غير ما المخزون يقل، ومفيش مخزون بيقل مرتين بنفس القيمة، ومفيش إيميل «اتأكد طلبك» لطلب اترجع.`,
          use: {
            prog: R`أي عملية فيها أكتر من كتابة واحدة (طلب + مخزون، تحويل فلوس بين حسابين، يوزر + profile) لازم تبقى transaction، وإلا أي error في النص بيسيب داتا نصها اتكتب.`,
            work: R`أشهر باج في صفحات الدفع: منتج آخر قطعة اتباع لاتنين. اتقاس تحت: ١٠ طلبات مع بعض على مخزون ١٠٠ سابوه ٩٩ بدل ٩٠.`,
            cs: R`ده الـ A في ACID (Atomicity)، والـ race condition مثال على مشكلة الـ concurrency الكلاسيك «lost update»، والحل بالـ row lock أو بعملية atomic في القاعدة.`,
          },
          desc: R`[[with transaction.atomic():]] بيفتح transaction: كل اللي جوه البلوك بيتحفظ مع بعض لما البلوك يخلص، ولو حصل exception جواه كله بيترجع (rollback) كإنه محصلش. من غيره، Django بيعمل commit بعد كل query لوحدها (autocommit)، فلو الكود وقع في النص، اللي اتكتب قبل الوقعة بيفضل.

ولما اتنين بيشتروا نفس المنتج في نفس اللحظة، الاتنين ممكن يقروا نفس المخزون ويكتبوا نفس الرقم (lost update). الحل: [[select_for_update()]] بيقفل الصف لحد آخر الـ transaction (على Postgres و MySQL، مش SQLite)، أو [[update(stock=F("stock") - qty)]] اللي بيخلّي القاعدة تحسب.

و [[transaction.on_commit(fn)]] بيأجّل حاجة زي إرسال إيميل لحد ما الـ commit يحصل فعلًا، ولو حصل rollback مبتتنفذش.`,
          deep: {
            why: R`الكود اللي بيكتب في جدولين من غير transaction بيشتغل تمام لحد أول error في النص: بوابة دفع عملت timeout بعد ما الطلب اتعمل، فبقى عندك طلب من غير دفع ومخزون مش متظبط، وحد لازم يصلّحه بإيده. والـ race condition مبيبانش وانت بتجرّب لوحدك، بيبان يوم العروض لما ١٠٠ واحد يدوسوا في نفس الثانية.`,
            how: R`[[atomic()]] أول مرة بيعمل [[BEGIN]]، ولما البلوك يخلص من غير exception بيعمل [[COMMIT]]، ولو طلع منه exception بيعمل [[ROLLBACK]] ويسيب الـ exception يكمّل. و [[atomic]] جوه [[atomic]] بيعمل **savepoint**: لو البلوك الداخلي وقع بيرجع لحد الـ savepoint بس، والخارجي يكمّل.

لو مسكت [[IntegrityError]] **جوه** نفس البلوك من غير savepoint، Postgres بيعتبر الـ transaction كلها بايظة، و Django بيرفض أي query بعدها بـ [[TransactionManagementError]] لحد ما البلوك يخلص. عشان كده الكود اللي ممكن يفشل وانت عايز تكمّل بعده يتلف في [[atomic()]] لوحده.

[[select_for_update()]] بيضيف [[FOR UPDATE]] للـ [[SELECT]]: أي transaction تانية عايزة نفس الصف بتستنى لحد الـ commit. و [[nowait=True]] بيخليها ترمي error بدل ما تستنى، و [[skip_locked=True]] بيعدّي الصفوف المقفولة (مفيد لطابور شغل). ولازم يبقى جوه [[atomic]]. وعلى SQLite الـ [[FOR UPDATE]] مش موجود و Django بيتجاهله ساكت.

[[on_commit(fn)]] بيسجّل الدالة في الاتصال، وبينفّذها بعد الـ [[COMMIT]] بتاع أبعد [[atomic]]. ولو مفيش transaction مفتوحة بينفّذها على طول. و [[ATOMIC_REQUESTS = True]] في إعدادات القاعدة بيلف كل view في transaction (من الـ docs، مجرّبتهوش هنا)، بس ده بيطوّل وقت الـ locks على كل طلب.`,
            when: R`أي view أو service بيكتب في أكتر من صف أو جدول ولازم يبقوا متسقين. [[select_for_update]] لما محتاج تقرا القيمة وتقرر بيها قبل ما تكتب (فيه مخزون كفاية؟ الرصيد يكفي؟). [[F]] لما التعديل نفسه حسبة بسيطة ومش محتاج تقرر حاجة قبله. و [[on_commit]] لأي حاجة بتطلع بره القاعدة: إيميل، webhook، task في طابور، مسح cache.`,
            mistakes: R`تعمل [[p.stock -= qty; p.save()]] وتفتكر إن [[atomic]] لوحده بيحمي من السباق (لأ: بيحمي من النص، مش من الاتنين مع بعض؛ لازم lock أو [[F]]). وتمسك [[IntegrityError]] جوه البلوك وتكمّل queries ([[TransactionManagementError]]). وتبعت الإيميل جوه البلوك قبل الـ commit، فالـ rollback يحصل والعميل وصله «طلبك اتأكد». وتختبر الـ race على SQLite وتفتكر [[select_for_update]] شغال (اتجاهل ساكت والنتيجة طلعت ٩٩). و transaction طويلة فيها طلب HTTP لخدمة بره والصف مقفول طول الوقت ده.`,
          },
          teach: R`## المثال بيعمل إيه؟

دالة [[buy(product_id, qty)]] بتعمل طلب وتقلل المخزون: يا الاتنين يحصلوا يا ولا واحد، والصف مقفول وهي شغالة، والإيميل بيتبعت بعد الحفظ. وقبلها نسخة بايظة من غير transaction عشان نشوف المشكلة. اتشغّل بـ Django 6.1.2 على Postgres 16 ([[postgres:16-alpine]] في Docker) و Python 3.14 على ويندوز، وجزء SQLite للمقارنة. الـ model الجديد في [[shop/models.py]]:

~~~python
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="orders")
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
~~~

و [[makemigrations shop -n order]] و [[migrate]]. ومنتج [[Clean Code]] مخزونه ٣.

---

## ١. من غير transaction: نص عملية

~~~python
def buy_broken(product_id, qty):
    p = Product.objects.get(pk=product_id)
    Order.objects.create(product=p, quantity=qty)
    raise RuntimeError("payment gateway timeout")
~~~

- [[Order.objects.create(...)]]: الطلب اتكتب واتعمله commit **على طول** (Django في وضع autocommit: كل query لوحدها transaction).
- [[raise RuntimeError(...)]]: كأن بوابة الدفع وقعت بعد الطلب.

~~~text الناتج
RuntimeError: payment gateway timeout
orphan orders 2
~~~

عدد الطلبات زاد واحد رغم إن العملية فشلت: طلب «يتيم» مفيش دفع وراه.

---

## ٢. [[atomic]]: كله أو ولا حاجة

~~~python
with transaction.atomic():
    p = Product.objects.select_for_update().get(pk=product_id)
    if p.stock < qty:
        raise OutOfStock(f"{p.name}: only {p.stock} left")
    Order.objects.create(product=p, quantity=qty)
    Product.objects.filter(pk=p.pk).update(stock=F("stock") - qty)
~~~

| السطر | بيعمل إيه |
|---|---|
| [[with transaction.atomic():]] | [[BEGIN]]. لو البلوك خلص عادي [[COMMIT]]، ولو طلع منه exception [[ROLLBACK]] والـ exception يكمّل لبره |
| [[select_for_update().get(...)]] | [[SELECT ... FOR UPDATE]]: الصف ده مقفول لحد الـ commit، وأي حد تاني عايز يقفله بيستنى |
| [[if p.stock < qty: raise OutOfStock(...)]] | القرار مبني على قيمة محدش يقدر يغيّرها دلوقتي |
| [[Order.objects.create(...)]] | الطلب، بس لسه مش متحفظ نهائي |
| [[update(stock=F("stock") - qty)]] | القاعدة بتطرح، فحتى من غير الـ lock مفيش رقم قديم بيتكتب |

~~~text الناتج
before 3 0
email: order confirmed for Clean Code
Clean Code
after 1 1
OutOfStock: Clean Code: only 1 left
after fail 1 1
~~~

- أول شراء (٢ قطعة): المخزون من ٣ لـ ١ والطلبات من ٠ لـ ١. وسطر الإيميل اتطبع **قبل** ما الدالة ترجّع الاسم، لأن [[on_commit]] بيتنفّذ لحظة ما البلوك يعمل commit (القسم ٥).
- تاني شراء (٥ قطع): [[OutOfStock]] اترمت جوه البلوك، فمفيش طلب اتعمل والمخزون زي ما هو ([[1 1]]).

---

## ٣. السباق: ١٠ طلبات في نفس اللحظة

جرّبت ١٠ threads، كل واحد بيشتري قطعة من [[HDMI 2m]] ومخزونه ١٠٠، وكل واحد بيستنى ٠.٢ ثانية بين القراية والكتابة (كأنه بيكلّم بوابة دفع). كل thread ليه اتصال قاعدة خاص بيه ([[connection.close()]] في الآخر).

~~~python
def naive():
    p = Product.objects.get(pk=pk)
    time.sleep(0.2)
    p.stock -= 1
    p.save(update_fields=["stock"])
def locked():
    with transaction.atomic():
        p = Product.objects.select_for_update().get(pk=pk)
        time.sleep(0.2)
        p.stock -= 1
        p.save(update_fields=["stock"])
def with_f():
    Product.objects.filter(pk=pk).update(stock=F("stock") - 1)
~~~

~~~text اتشغّل فعلًا · الناتج (Postgres 16، اتشغّل مرتين ونفس الأرقام)
naive    100 - 10 = 99      254 ms
locked   100 - 10 = 90     2078 ms
with_f   100 - 10 = 90       48 ms
~~~

| الطريقة | النتيجة | ليه |
|---|---|---|
| [[naive]] | ٩٩ (٩ بيعات ضاعت) | العشرة قروا ١٠٠ في نفس الوقت وكتبوا ٩٩ |
| [[locked]] | ٩٠ صح، بس ٢ ثانية | كل واحد استنى اللي قبله يعمل commit: ١٠ × ٠.٢ ثانية |
| [[with_f]] | ٩٠ صح في ٤٨ ملّي ثانية | مفيش قراية في Python أصلًا، القاعدة بتطرح |

الخلاصة: لو محتاج تقرر حاجة بالقيمة (فيه مخزون كفاية؟) استخدم [[select_for_update]] وخلّي البلوك قصير. ولو مجرد حسبة، [[F]] أسرع.

### نفس التجربة على SQLite

~~~text الناتج
naive    100 - 10 = 99      413 ms
locked   100 - 10 = 99      257 ms
with_f   100 - 10 = 90      160 ms
~~~

[[locked]] طلع ٩٩ برضه: SQLite مفيهاش [[FOR UPDATE]]، و Django شاله من الـ SQL ساكت (اتأكدت بـ [[print(qs.query)]]: الـ SQL من غير [[FOR UPDATE]]). وفي تشغيلة منهم thread وقع بـ [[OperationalError: database is locked]]. اختبر الـ concurrency على نفس القاعدة اللي في الإنتاج.

---

## ٤. [[select_for_update]] وأشكاله

~~~text آخر الـ SQL على Postgres
... ORDER BY "shop_product"."created_at" DESC FOR UPDATE
... ORDER BY "shop_product"."created_at" DESC FOR UPDATE NOWAIT
... ORDER BY "shop_product"."created_at" DESC FOR UPDATE SKIP LOCKED
~~~

| الشكل | لو الصف مقفول |
|---|---|
| [[select_for_update()]] | استنى لحد ما يتفك |
| [[select_for_update(nowait=True)]] | ارمي [[DatabaseError]] على طول، وانت قرر (رسالة «حاول تاني») |
| [[select_for_update(skip_locked=True)]] | عدّي الصف ده وهات اللي بعده، مفيد لـ workers بياخدوا شغل من جدول |

ومن بره [[atomic]]:

~~~text الناتج
TransactionManagementError: select_for_update cannot be used outside of a transaction.
~~~

---

## ٥. [[IntegrityError]] جوه الـ transaction

~~~python
with transaction.atomic():
    try:
        Category.objects.create(name="Books", slug="books2")
    except IntegrityError:
        print("caught duplicate")
    Category.objects.count()
~~~

~~~text الناتج
caught duplicate
TransactionManagementError: An error occurred in the current transaction. You can't execute queries until the end of the 'atomic' block.
~~~

[[name]] عليه [[unique]]، فالـ [[INSERT]] فشل. مسكناه، بس الـ transaction نفسها بقت بايظة، وأي query بعدها اترفضت. الحل: [[atomic]] تاني حوالين الحتة اللي ممكن تفشل (savepoint):

~~~python
with transaction.atomic():
    try:
        with transaction.atomic():
            Category.objects.create(name="Books", slug="books3")
    except IntegrityError:
        print("caught duplicate, savepoint rolled back")
    print("still works:", Category.objects.count())
~~~

~~~text الناتج
caught duplicate, savepoint rolled back
still works: 3
~~~

البلوك الداخلي رجع لحد الـ savepoint بس، والخارجي كمّل عادي.

---

## ٦. [[on_commit]]: اللي بيطلع بره القاعدة يستنى الـ commit

~~~python
try:
    with transaction.atomic():
        transaction.on_commit(lambda: print("NEVER printed"))
        raise ValueError("boom")
except ValueError:
    print("rolled back, on_commit skipped")
~~~

~~~text الناتج
rolled back, on_commit skipped
~~~

الإيميل (أو الـ webhook أو الـ task) مبيتبعتش لطلب اترجع. ولو بعته بـ [[send_mail]] مباشرة جوه البلوك، كان هيتبعت والطلب اتلغى. وفي الاختبارات خد بالك: [[@pytest.mark.django_db]] بيلف كل اختبار في transaction بترجع، فـ [[on_commit]] مبيتنفّذش خالص إلا لو استخدمت [[django_capture_on_commit_callbacks]] (درس «pytest-django»).

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| كتابتين لازم يحصلوا مع بعض | [[with transaction.atomic():]] |
| تقرا وتقرر وتكتب واتنين مع بعض | [[select_for_update()]] جوه [[atomic]]، وبلوك قصير |
| حسبة بسيطة على عمود | [[update(col=F("col") - n)]] |
| حاجة ممكن تفشل وعايز تكمّل | [[atomic]] جوه [[atomic]] (savepoint) |
| إيميل أو webhook بعد الحفظ | [[transaction.on_commit(fn)]] |

- [[atomic]] بيحمي من «نص عملية»، والـ lock أو [[F]] بيحموا من «اتنين مع بعض». محتاج الاتنين.
- اختبر الـ concurrency على Postgres، مش SQLite.`,
          example: R`# shop/services.py:
from django.db import transaction
from django.db.models import F
from .models import Order, Product
class OutOfStock(Exception):
    pass
def buy(product_id, qty):
    with transaction.atomic():
        p = Product.objects.select_for_update().get(pk=product_id)
        if p.stock < qty:
            raise OutOfStock(f"{p.name}: only {p.stock} left")
        Order.objects.create(product=p, quantity=qty)
        Product.objects.filter(pk=p.pk).update(stock=F("stock") - qty)
        transaction.on_commit(lambda: print("email: order confirmed for", p.name))
    return p.name`,
          flag: "script",
          lines: [
            R`[[from django.db import transaction]]: فيه [[atomic]] و [[on_commit]] و [[set_rollback]]، كل أدوات التحكم في الـ transactions.`,
            R`[[from django.db.models import F]]: عشان نطرح من المخزون في القاعدة نفسها ([[stock = stock - 2]]) بدل رقم محسوب في Python.`,
            R`[[from .models import Order, Product]]: الـ [[Order]] الجديد (منتج وكمية) والـ [[Product]] اللي فيه [[stock]].`,
            R`[[class OutOfStock(Exception)]]: exception خاص بينا للحالة دي، عشان الـ view تمسكه بالاسم وترد ٤٠٠ برسالة واضحة، من غير ما تمسك كل الأخطاء.`,
            R`[[pass]]: الـ class مش محتاج أي كود زيادة، كفاية إنه نوع مختلف عن [[Exception]].`,
            R`[[def buy(product_id, qty)]]: الدالة اللي الـ view بتناديها: بتاخد الـ id والكمية، وبترجّع اسم المنتج أو ترمي [[OutOfStock]].`,
            R`[[with transaction.atomic():]]: [[BEGIN]]. كل اللي تحت جوه transaction واحدة: يا يتحفظ كله لما البلوك يخلص، يا يترجع كله لو طلع exception.`,
            R`[[Product.objects.select_for_update().get(pk=product_id)]]: [[SELECT ... FOR UPDATE]]: بنقرا المنتج ونقفل الصف ده لحد آخر الـ transaction، فأي [[buy]] تانية لنفس المنتج بتستنى هنا. على SQLite القفل ده بيتجاهل.`,
            R`[[if p.stock < qty:]]: القرار مبني على المخزون اللي قريناه وهو مقفول، فمحدش يقدر يغيّره بين القراية والكتابة.`,
            R`[[raise OutOfStock(f"...")]]: الـ exception بيطلع من البلوك، فـ [[atomic]] بيعمل [[ROLLBACK]] (مكانش فيه حاجة اتكتبت أصلًا) ويسيب الـ exception يوصل للي نادى. الرسالة فيها الاسم والكمية الموجودة: [[Clean Code: only 1 left]].`,
            R`[[Order.objects.create(product=p, quantity=qty)]]: [[INSERT]] للطلب. لسه مش نهائي: لو أي حاجة وقعت بعده لحد آخر البلوك، الطلب ده بيتمسح كإنه متعملش.`,
            R`[[Product.objects.filter(pk=p.pk).update(stock=F("stock") - qty)]]: [[UPDATE ... SET stock = stock - 2]]. القاعدة هي اللي بتطرح، فحتى لو حد شال الـ [[select_for_update]] بعدين، المخزون مش هيرجع لرقم قديم.`,
            R`[[transaction.on_commit(lambda: print(...))]]: سجّل الدالة دي تتنفّذ **بعد** الـ [[COMMIT]]. هنا [[print]] بدل إيميل حقيقي. ولو البلوك عمل rollback مبتتنفذش أبدًا.`,
            R`[[return p.name]]: بعد ما البلوك خلص والـ commit حصل والـ [[on_commit]] اتنفّذت، بنرجّع اسم المنتج. عشان كده سطر الإيميل اتطبع قبل الاسم في الناتج.`,
          ],
          try: R`زوّد [[Order]] و [[migrate]]، وحط [[buy]] في [[shop/services.py]]، وجرّبها من [[manage.py shell]] على منتج مخزونه ٣: اشتري ٢ وبعدين ٥. وبعدين اكتب [[buy_broken]] اللي من غير transaction وعدّ الطلبات قبل وبعد. وأخيرًا جرّب تمسك [[IntegrityError]] جوه [[atomic]] وتعمل query بعدها، وصلّحها بـ [[atomic]] تاني.`,
          solCode: R`from django.db import IntegrityError, transaction
from shop.models import Category
with transaction.atomic():
    try:
        with transaction.atomic():
            Category.objects.create(name="Books", slug="books3")
    except IntegrityError:
        print("duplicate skipped")
    print(Category.objects.count())`,
          sol: R`[[buy(cc.pk, 2)]] بيطبع سطر الإيميل وبعده [[Clean Code]]، والمخزون بقى ١ والطلبات ١. و [[buy(cc.pk, 5)]] بيرمي [[OutOfStock: Clean Code: only 1 left]] ومفيش أي تغيير. و [[buy_broken]] بيزوّد طلب رغم الـ [[RuntimeError]].

و [[IntegrityError]] جوه نفس البلوك وبعدها query: [[TransactionManagementError: An error occurred in the current transaction. You can't execute queries until the end of the 'atomic' block.]] والحل اللي فوق: الـ [[atomic]] الداخلي بيعمل savepoint، فالفشل بيرجع لحدّه بس، و [[count()]] بعده اشتغل وطبع [[3]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** لكل حالة قول [[atomic]] ولا [[select_for_update]] ولا [[F]] ولا [[on_commit]] (أو أكتر من واحد): تحويل فلوس بين حسابين، وعدّاد مشاهدات، وإيميل بعد التسجيل، وحجز آخر كرسي في رحلة، ومسح cache بعد تعديل منتج.`, done: R`التحويل [[atomic]] + [[select_for_update]] على الحسابين، والعداد [[F]]، والإيميل والـ cache [[on_commit]]، والكرسي [[atomic]] + [[select_for_update]]، وكاتب جنب كل واحدة جملة ليه.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب الناتج بالترتيب قبل ما تشغّل: [[with transaction.atomic(): transaction.on_commit(lambda: print("A")); print("B")]] وبعده [[print("C")]]. وبعدين نفس الكود بس فيه [[raise ValueError]] بعد [[print("B")]] وملفوف في [[try/except]] بيطبع [[D]].`, done: R`الأول طبع [[B]] و [[A]] و [[C]] بالترتيب ده، والتاني طبع [[B]] و [[D]] بس ومفيش [[A]]، وكاتب ليه.` },
            { lvl: 'تطبيق', t: R`**محاكاة بنك:** model [[Account]] فيه [[balance]]، ودالة [[transfer(a, b, amount)]] بترمي [[InsufficientFunds]] لو الرصيد مش كفاية، وبتقفل الحسابين بترتيب الـ id (عشان اتنين بيحوّلوا لبعض ميعملوش deadlock).`, done: R`تحويل ١٠٠ من حساب فيه ٥٠ بيرمي والرصيدين زي ما هما، وتحويل صح بيغيّر الاتنين، و [[Account.objects.aggregate(Sum("balance"))]] مبيتغيرش أبدًا بعد ٢٠ تحويل عشوائي.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل تجربة الـ ١٠ threads (القسم ٣) على Postgres بنفسك، وبعدين زوّد [[nowait=True]] في [[locked]] ومسك [[DatabaseError]] وعدّ كام واحد فشل.`, done: R`عندك نفس الأرقام تقريبًا ([[99]] و [[90]] و [[90]])، ومع [[nowait=True]] واحد بس نجح والتسعة التانيين رموا [[DatabaseError]] بـ [[could not obtain lock on row]]، والمخزون بقى [[99]] بالظبط.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** view بتعمل [[order = Order.objects.create(...)]] وبعدين [[send_mail("Order confirmed", ...)]] وبعدين [[charge_card(...)]] اللي ممكن ترمي، والكل جوه [[atomic]]. العملاء بيشتكوا إن الإيميل بيوصل والطلب مش موجود. صلّحها.`, done: R`[[send_mail]] بقت جوه [[transaction.on_commit(lambda: send_mail(...))]]، ولما خليت [[charge_card]] ترمي عن قصد: مفيش طلب في القاعدة ومفيش إيميل اتبعت (شوفته بـ [[mailoutbox]] في اختبار أو بالـ console backend).` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبار بـ [[@pytest.mark.django_db(transaction=True)]] (لازم: الـ threads بتفتح اتصالات تانية مش شايفة الـ transaction بتاعة الاختبار العادي) بيشغّل ٥ threads بيعملوا [[buy(pk, 1)]] على منتج مخزونه ٣، وبيتأكد إن ٣ نجحوا و ٢ رموا [[OutOfStock]] والمخزون صفر. شغّله على Postgres.`, done: R`الاختبار بيعدّي ١٠ مرات ورا بعض ([[@pytest.mark.parametrize("i", range(10))]])، والنتيجة كل مرة [[ ["ok", "ok", "ok", "out", "out"] ]] والمخزون [[0]] والطلبات [[3]]. ولو شلت [[select_for_update]] وسيبت [[F]] وحطيت [[time.sleep(0.05)]] بعد القراية: الطلبات برضه ٣، بس الاتنين الزيادة رموا [[IntegrityError]] (الـ [[CHECK]] بتاع [[PositiveIntegerField]] رفض المخزون السالب) بدل [[OutOfStock]]، يعني ٥٠٠ بدل رسالة مفهومة.` },
          ],
        },
        {
          cmd: "signals",
          title: "pre_save و post_save و receiver، وإمتى متستخدمهاش",
          learn: R`تشغّل كود لوحده قبل أو بعد حفظ أو مسح أي model بـ [[@receiver]]، وتسجّله صح في [[AppConfig.ready()]]، وتعرف العمليات اللي مبتبعتش signals خالص، والفخاخ: الـ recursion، والـ rollback، والكود المستخبي.`,
          out: R`slug بيتملى لوحده لأي قسم جديد من أي مكان في الكود، وعارف تقرر إمتى signal وإمتى دالة service صريحة.`,
          use: {
            prog: R`أشهر استخدام: تعمل [[Profile]] لكل يوزر جديد، لأن model اليوزر مش بتاعك ومينفعش تعدّل [[save()]] بتاعه. وكمان مسح cache أو كتابة audit log لما أي حاجة تتغير.`,
            work: R`لما حاجة بتحصل «لوحدها» في مشروع مش بتاعك (حقل بيتغير، إيميل بيتبعت) ومش لاقي الكود في الـ view، دوّر على [[@receiver]] و [[post_save.connect]].`,
            cs: R`ده الـ Observer pattern (زي EventEmitter في Node): اللي بيبعت مش عارف مين سامع. ميزته إن الـ apps مش مربوطة ببعض، وعيبه إن السير بقى مستخبي.`,
          },
          desc: R`Django بيبعت **signals** في لحظات معينة: [[pre_save]] قبل أي [[save()]]، و [[post_save]] بعده (ومعاه [[created]] بـ True لو صف جديد)، و [[pre_delete]] و [[post_delete]]، و [[m2m_changed]]. وانت بتسجّل دالة تسمع بـ [[@receiver(post_save, sender=Product)]].

الدالة بتتسجّل لما الملف بتاعها يتعمله import، فبتعمل [[import]] لملف [[signals.py]] جوه [[ready()]] في [[apps.py]]. من غيره الدالة موجودة بس محدش سامعها، ومفيش أي error.

والأهم: [[QuerySet.update()]] و [[bulk_create()]] و [[bulk_update()]] **مبيبعتوش** [[pre_save]] ولا [[post_save]]. فأي منطق مهم في signal بيتعدّى ساكت من أي كود بيستخدمهم.`,
          deep: {
            why: R`أحيانًا عايز رد فعل على حدث في model مش بتاعك (اليوزر بتاع Django، أو model من مكتبة)، أو عايز app تعرف إن حاجة اتحفظت في app تانية من غير ما الاتنين يعملوا import لبعض. الـ signals بتعمل ده من غير ما تلمس كود الـ model الأصلي.`,
            how: R`[[post_save]] object من نوع [[Signal]]. [[@receiver(post_save, sender=Product)]] بيعمل [[post_save.connect(fn, sender=Product)]]، يعني يحط الدالة في لستة الـ signal ده للـ model ده بس. و [[Model.save()]] من جوه بينادي [[pre_save.send(...)]] قبل الـ [[INSERT]] أو [[UPDATE]] و [[post_save.send(...)]] بعده، وبيبعت [[sender]] و [[instance]] و [[created]] و [[update_fields]] و [[raw]]، فلازم دالتك تاخد [[**kwargs]] عشان أي باراميتر جديد في نسخة جاية ميكسرهاش.

الدوال بتشتغل **في نفس الطلب ونفس الـ transaction**، بالترتيب اللي اتسجّلت بيه. لو واحدة رمت exception الـ [[save()]] كله بيرمي. ولو الـ transaction اترجعت، [[post_save]] كان اتبعت خلاص، فأي حاجة عملتها بره القاعدة (إيميل) حصلت لطلب مش موجود؛ الحل [[transaction.on_commit]] جوه الـ receiver.

[[QuerySet.update()]] بيبعت [[UPDATE]] واحد من غير objects في Python، فمفيش [[instance]] يتبعت، فمفيش signal. و [[bulk_create]] نفس الكلام. أما [[QuerySet.delete()]] **بيبعت** [[post_delete]] لكل صف (بيجيبهم الأول عشان كده). و [[ready()]] بتاع كل app بيتنادى مرة واحدة لما Django يقوم، وده المكان الآمن للـ import لأن كل الـ models اتحمّلت.`,
            when: R`استخدمها لما الحدث جاي من model مش بتاعك، أو لما app عايزة تسمع app تانية من غير ما تربطهم ببعض (مسح cache، audit log، Profile لليوزر). ومتستخدمهاش لمنطق الـ business الأساسي في app بتاعتك (خصم مخزون، حساب الإجمالي): دالة service صريحة زي [[buy()]] في درس «transaction.atomic» أوضح، وبتتلاقي بالبحث، وبتتنادى من [[update()]] و [[bulk_create()]] كمان لأنك انت اللي بتناديها.`,
            mistakes: R`تكتب الـ receiver في [[signals.py]] وتنسى الـ [[import]] في [[ready()]]، فمحدش سامع والـ slug بيفضل [[""]]. وتعمل [[instance.save()]] جوه [[post_save]] لنفس الـ model فيعمل recursion لحد [[RecursionError]] (اتقاس: ٢٤٥ نداء). وتعتمد على signal وفيه كود تاني بيعمل [[bulk_create]] أو [[update()]]. وتبعت إيميل جوه [[post_save]] من غير [[on_commit]]. وتحط منطق تقيل (طلب HTTP) في signal فكل [[save()]] في المشروع يبطأ. وتنسى [[**kwargs]] في الدالة.`,
          },
          teach: R`## المثال بيعمل إيه؟

اتنين receivers في [[shop/signals.py]]: واحد بيملى [[slug]] القسم من اسمه قبل الحفظ لو فاضي، وواحد بيطبع سطر بعد حفظ أي منتج ويقول جديد ولا تعديل. والتسجيل في [[shop/apps.py]]. اتشغّل بـ Django 6.1.2 على SQLite في Python 3.14 على ويندوز، من سكربت بيعمل [[django.setup()]].

---

## ١. [[pre_save]]: عدّل قبل ما يتحفظ

~~~python
@receiver(pre_save, sender=Category)
def fill_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)
~~~

| الحتة | معناها |
|---|---|
| [[@receiver(pre_save, sender=Category)]] | الدالة دي تتنادى قبل أي [[save()]] لـ [[Category]] بس. من غير [[sender]] بتتنادى لكل الـ models في المشروع |
| [[sender]] | الـ class نفسه ([[Category]])، مفيد لو نفس الدالة بتسمع أكتر من model |
| [[instance]] | الـ object اللي هيتحفظ. أي تعديل عليه هنا بيتحفظ معاه، لأننا لسه قبل الـ [[INSERT]] |
| [[**kwargs]] | باقي الباراميترات ([[raw]] و [[using]] و [[update_fields]]). لازم يبقى موجود |

## ٢. [[post_save]]: اتحفظ، اعمل حاجة

~~~python
@receiver(post_save, sender=Product)
def log_product(sender, instance, created, **kwargs):
    print("post_save:", instance.name, "created" if created else "updated")
~~~

[[created]] بـ [[True]] لو الـ [[save()]] عمل [[INSERT]]، و [[False]] لو [[UPDATE]]. ده الفرق اللي بتستخدمه عشان تعمل Profile مرة واحدة بس.

## ٣. التسجيل في [[ready()]]

~~~python
class ShopConfig(AppConfig):
    name = "shop"
    def ready(self):
        from . import signals
~~~

[[ready()]] بيتنادى مرة واحدة لما Django يحمّل كل الـ apps، و [[import]] الملف هو اللي بيشغّل الـ [[@receiver]] ويسجّل الدوال. ولازم [[INSTALLED_APPS]] فيها [["shop"]] (أو [["shop.apps.ShopConfig"]])، و Django بيلاقي [[ShopConfig]] لوحده لو هو الـ AppConfig الوحيد في [[apps.py]].

---

## ٤. نشغّل

~~~python
c = Category.objects.create(name="Phone Cases")
print("slug:", c.slug)
p = Product.objects.create(category=c, name="Clear Case", price_cents=9900)
p.stock = 5
p.save()
Product.objects.filter(pk=p.pk).update(stock=6)
Product.objects.bulk_create([Product(category=c, name="Red Case", price_cents=9900)])
c2 = Category.objects.bulk_create([Category(name="Chargers")])[0]
print(repr(Category.objects.get(name="Chargers").slug))
~~~

~~~text اتشغّل فعلًا · الناتج
slug: phone-cases
post_save: Clear Case created
post_save: Clear Case updated
--- update():
--- bulk_create:
--- Category.bulk_create slug:
''
~~~

| السطر | الـ signal اتبعت؟ |
|---|---|
| [[Category.objects.create(name="Phone Cases")]] | أيوه: [[pre_save]] اتبعت قبل الـ [[INSERT]] وملى [[phone-cases]] |
| [[Product.objects.create(...)]] | أيوه: [[post_save]] اتبعت و [[created]] كانت [[True]] |
| [[p.save()]] بعد تعديل | أيوه: [[post_save]] اتبعت تاني و [[created]] كانت [[False]] |
| [[QuerySet.update(stock=6)]] | **لأ**: مفيش سطر اتطبع، لأن مفيش object في Python يتبعت |
| [[bulk_create([...])]] | **لأ**: لا [[pre_save]] ولا [[post_save]]، حتى للمنتجات الجديدة |
| [[Category.bulk_create(...)]] | **لأ**: الـ slug فضل [[""]]، وتاني [[bulk_create]] لقسم من غير slug وقع بـ [[IntegrityError: UNIQUE constraint failed: shop_category.slug]] |

أما المسح: [[Product.objects.filter(...).delete()]] على ٣ منتجات بعت [[post_delete]] للتلاتة ([[ ['Tmp 2', 'Tmp 1', 'Tmp 0'] ]])، لأن Django بيجيب الصفوف الأول عشان يبعت الـ signal ويعمل الـ cascade.

### من غير الـ import في [[ready()]]

شلت [[def ready]] من [[ShopConfig]]، وعملت قسم جديد: [[c.slug]] طلع [['']]. مفيش error ولا تحذير، الدالة موجودة في الملف بس محدش سامعها.

---

## ٥. الفخاخ

### [[save()]] جوه [[post_save]] لنفس الـ model

~~~python
def bump(sender, instance, **kwargs):
    instance.name = instance.name.strip()
    instance.save()
post_save.connect(bump, sender=Product)
~~~

~~~text الناتج
RecursionError: maximum recursion depth exceeded after 245 calls
~~~

[[save()]] بيبعت [[post_save]] اللي بينادي [[save()]]... الحل: عدّل في [[pre_save]] (من غير [[save()]] خالص)، أو [[Product.objects.filter(pk=instance.pk).update(...)]] اللي مبيبعتش signal.

### الـ rollback مبيرجّعش اللي الـ signal عمله بره القاعدة

~~~python
with transaction.atomic():
    Product.objects.create(category=c, name="Ghost", price_cents=100)
    raise ValueError
~~~

~~~text الناتج
post_save: Ghost created
Ghost in db: False
~~~

الـ [[post_save]] اتبعت والمنتج مش موجود. لو الـ receiver كان بيبعت إيميل أو webhook، كان راح لحاجة اترجعت. لفّه: [[transaction.on_commit(lambda: send(...))]] (درس «transaction.atomic»).

---

## ٦. شغل في الخلفية: [[django.tasks]] (Django 6)

بدل ما الـ receiver يبعت الإيميل بنفسه ويأخر الطلب، Django 6 فيه framework للـ tasks:

~~~python
from django.tasks import task
@task
def send_order_email(order_id):
    print("sending email for order", order_id)
    return order_id
~~~

~~~text send_order_email.enqueue(7)
sending email for order 7
TaskResult SUCCESSFUL 7
~~~

[[settings.TASKS]] الافتراضي [[{'default': {'BACKEND': 'django.tasks.backends.immediate.ImmediateBackend'}}]]: بينفّذ الـ task على طول في نفس الـ process، يعني لسه مفيش خلفية فعلًا. للخلفية الحقيقية محتاج backend بـ worker منفصل (مكتبة [[django-tasks]] أو Celery)، وده من الـ docs مش متجرّب هنا. المهم إن الكود بتاعك بيبقى [[transaction.on_commit(lambda: send_order_email.enqueue(order.pk))]]، ولما تغيّر الـ backend الكود ميتغيرش.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تعدّل قبل الحفظ | [[pre_save]]، وعدّل الـ [[instance]] نفسه من غير [[save()]] |
| رد فعل بعد الحفظ، جديد ولا لأ | [[post_save]]، و [[created]] بتفرق بين الإنشاء والتعديل |
| تسجّل الـ receivers | [[from . import signals]] في [[AppConfig.ready()]] |
| حاجة بره القاعدة | [[transaction.on_commit]] جوه الـ receiver |
| منطق business أساسي | دالة service صريحة، مش signal |

- [[update()]] و [[bulk_create()]] و [[bulk_update()]] مبيبعتوش [[pre_save]] و [[post_save]]. [[QuerySet.delete()]] بيبعت [[post_delete]].
- متعملش [[save()]] لنفس الـ model جوه [[post_save]].`,
          example: R`# shop/signals.py:
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from .models import Category, Product
@receiver(pre_save, sender=Category)
def fill_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)
@receiver(post_save, sender=Product)
def log_product(sender, instance, created, **kwargs):
    print("post_save:", instance.name, "created" if created else "updated")
# shop/apps.py:
from django.apps import AppConfig
class ShopConfig(AppConfig):
    name = "shop"
    def ready(self):
        from . import signals`,
          flag: "script",
          lines: [
            R`[[from django.db.models.signals import post_save, pre_save]]: الاتنين objects من نوع [[Signal]] جاهزين في Django، و [[Model.save()]] بيبعتهم بنفسه قبل وبعد الحفظ.`,
            R`[[from django.dispatch import receiver]]: decorator بيسجّل الدالة على signal معين، بدل ما تكتب [[pre_save.connect(fill_slug, sender=Category)]] تحت الدالة.`,
            R`[[from django.utils.text import slugify]]: بتحوّل [["Phone Cases"]] لـ [["phone-cases"]]: حروف صغيرة، والمسافات [[-]]، ومن غير علامات.`,
            R`[[from .models import Category, Product]]: الـ models اللي هنسمع عليها. الـ import ده آمن هنا لأن الملف ده بيتحمّل من [[ready()]] بعد ما كل الـ models اتحمّلت.`,
            R`[[@receiver(pre_save, sender=Category)]]: سجّل الدالة اللي تحت على [[pre_save]] لـ [[Category]] بس. من غير [[sender]] كانت هتتنادى قبل حفظ أي model في المشروع كله.`,
            R`[[def fill_slug(sender, instance, **kwargs)]]: [[sender]] هو [[Category]] نفسه، و [[instance]] القسم اللي هيتحفظ، و [[**kwargs]] بيمسك الباقي ([[raw]] و [[using]] و [[update_fields]]). من غير [[**kwargs]] الدالة هترمي [[TypeError]] أول ما Django يبعت باراميتر مش متوقع.`,
            R`[[if not instance.slug]]: املاه بس لو فاضي، عشان لو حد كتب slug بإيده أو القسم موجود وبيتعدّل، منغيّرش اللينكات القديمة.`,
            R`[[instance.slug = slugify(instance.name)]]: بنعدّل الـ object نفسه، ولأننا لسه **قبل** الـ [[INSERT]]، القيمة دي هي اللي هتتكتب في القاعدة من غير [[save()]] تاني.`,
            R`[[@receiver(post_save, sender=Product)]]: سجّل الدالة اللي تحت على [[post_save]] لـ [[Product]]: بتتنادى بعد كل [[save()]] و [[create()]] للمنتجات، جوه نفس الـ transaction.`,
            R`[[def log_product(sender, instance, created, **kwargs)]]: [[created]] باراميتر خاص بـ [[post_save]]: [[True]] لو الحفظ عمل [[INSERT]] (صف جديد)، و [[False]] لو [[UPDATE]].`,
            R`[[print("post_save:", ...)]]: هنا [[print]] عشان نشوف إمتى بيتنادى. في مشروع حقيقي ده مكان audit log أو مسح cache، ولو حاجة بره القاعدة يبقى جوه [[transaction.on_commit]].`,
            R`[[from django.apps import AppConfig]]: الـ class اللي بيوصف الـ app: اسمها وإعداداتها، والـ [[ready()]] اللي بيتنادى لما Django يقوم.`,
            R`[[class ShopConfig(AppConfig)]]: إعدادات app [[shop]]. [[startapp]] بيعمله لوحده في [[apps.py]]، وانت بتزوّد عليه [[ready]].`,
            R`[[name = "shop"]]: المسار بتاع الـ app زي ما بيتكتب في [[INSTALLED_APPS]]. لازم يطابق اسم الـ package وإلا Django مش هيلاقيها.`,
            R`[[def ready(self)]]: Django بيناديها مرة واحدة بعد ما يحمّل كل الـ apps والـ models. ده المكان الصح لتسجيل الـ signals، مش [[models.py]] (ممكن يعمل import دايري).`,
            R`[[from . import signals]]: الـ import نفسه هو اللي بيشغّل الـ [[@receiver]] decorators ويسجّل الدالتين. الاسم [[signals]] مش مستخدم بعد كده، ودي حالة نادرة الـ import فيها مقصود عشان أثره الجانبي.`,
          ],
          try: R`حط الملفين في app [[shop]]، واعمل قسم [[Phone Cases]] واطبع الـ slug. وبعدين اعمل منتج واحفظه تاني وعدّ السطور اللي اتطبعت. وبعدين جرّب [[update()]] و [[bulk_create()]] وشوف اتطبع إيه. وأخيرًا شيل [[ready]] وجرّب تاني.`,
          solCode: R`from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
@receiver(post_save, sender=get_user_model())
def welcome(sender, instance, created, **kwargs):
    if created:
        transaction.on_commit(lambda: print("welcome email to", instance.email))`,
          sol: R`[[slug: phone-cases]]، وبعدها سطرين: [[post_save: Clear Case created]] و [[post_save: Clear Case updated]]. و [[update()]] و [[bulk_create()]] مطبعوش ولا حاجة، و [[Category.bulk_create]] ساب الـ slug [[""]]. ومن غير [[ready]] الـ slug بقى [[""]] حتى مع [[create()]].

والكود اللي فوق بيبعت «إيميل ترحيب» (هنا [[print]]) لأي يوزر جديد بس ([[if created]])، وبعد الـ commit بس، فلو التسجيل وقع في transaction بعدها الإيميل مبيتبعتش. وده مثال لحالة الـ signal فيها مناسب: model اليوزر مش بتاعك.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مع الـ receivers اللي في الدرس، كام سطر [[post_save:]] هيتطبع من: [[Product.objects.create(...)]] و [[p.save()]] مرتين و [[Product.objects.filter(pk=p.pk).update(stock=1)]] و [[Product.objects.bulk_create([...3 منتجات])]] و [[p.delete()]]؟`, done: R`كتبت [[3]] قبل التشغيل، والتشغيل طلّع ٣ سطور: [[created]] وبعدها [[updated]] مرتين، ومفيش سطر لـ [[update]] ولا [[bulk_create]] ولا [[delete]] (ده [[post_delete]] مش [[post_save]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** model [[Profile]] فيه [[OneToOneField]] لليوزر و [[bio]]، و receiver بيعمل Profile لأي يوزر جديد بس. واعمل migration ليوزرز القدام اللي معندهمش Profile.`, done: R`[[create_user("x")]] بيعمل Profile واحد، و [[user.save()]] بعدها مبيعملش Profile تاني (مفيش [[IntegrityError]])، و [[Profile.objects.count() == User.objects.count()]] بعد الـ migration.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** receiver على [[post_save]] للمنتج بيعمل [[instance.name = instance.name.strip(); instance.save()]]، والسيرفر بيقع بـ [[RecursionError]] أول ما حد يحفظ منتج. صلّحه بطريقتين ووضّح أنهي أحسن.`, done: R`الطريقة الأولى: نقلت التعديل لـ [[pre_save]] من غير [[save()]]، والتانية [[Product.objects.filter(pk=instance.pk).update(name=...)]] في [[post_save]]. الاتنين بيحفظوا [["Mouse"]] من [["  Mouse  "]] من غير recursion، وكاتب إن [[pre_save]] أحسن (query واحدة بدل اتنين).` },
            { lvl: 'تحدي', t: R`**refactor:** المشروع فيه ٣ signals على [[Order]] (بيقلل المخزون، وبيحسب الإجمالي، وبيبعت إيميل)، وحد عمل [[Order.objects.bulk_create]] في سكربت استيراد والمخزون مقلش. حوّلهم لدالة [[place_order()]] صريحة جوه [[atomic]]، وخلّي الإيميل بس في [[on_commit]].`, done: R`مفيش [[@receiver]] على [[Order]] خالص، والاستيراد بقى بينادي [[place_order]] لكل صف فالمخزون بيقل صح، واختبار بـ [[django_capture_on_commit_callbacks]] بيأكد إن الإيميل اتبعت مرة واحدة لكل طلب ومش بيتبعت لو [[place_order]] رمت.` },
          ],
        },
      ]
    }
]);
