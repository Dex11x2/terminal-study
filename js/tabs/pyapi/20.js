// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Django: المشروع والـ ORM",
      l: 2,
      n: "Django framework كامل: مشروع فيه apps، وإعدادات من الـ environment، و models بتتحول جداول بـ migrations، و ORM بيكتب الـ SQL، ولازم تعرف تقيس عدد الـ queries",
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
            mistakes: R`تنسى النقطة في [[startproject config .]] فيبقى عندك [[config/config/settings.py]] وتتلخبط في المسارات. وتسمّي المشروع أو الـ app باسم مكتبة موجودة ([[django]] أو [[test]] أو [[email]])، فـ Django يرفض أو الـ imports تبوظ. وتعمل [[startapp]] وتنسى تضيفه في [[INSTALLED_APPS]]، فالـ models بتاعته مبتطلعش في [[makemigrations]]. وتسطّب Django بره الـ venv. وتشغّل [[runserver]] على سيرفر حقيقي.`
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

~~~text الناتج
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
          lines: [
            "لينكس والماك: اعمل venv في فولدر [[.venv]] جوه المشروع.",
            "فعّلها: [[python]] و [[pip]] بقوا بتوع الـ venv.",
            "سطّب Django بنسخة ثابتة. [[==]] يعني النسخة دي بالظبط.",
            "اعمل المشروع في الفولدر الحالي: [[manage.py]] وفولدر إعدادات اسمه [[config]]. النقطة معناها «هنا».",
            "اعمل app اسمها [[shop]]، وبعدها ضيف [[\"shop\"]] في [[INSTALLED_APPS]].",
            "اعمل جداول Django الأساسية (اليوزرز والصلاحيات والـ sessions) في [[db.sqlite3]].",
            "شغّل سيرفر التطوير على [[http://127.0.0.1:8000]]، وبيعيد التشغيل لما تحفظ.",
            "ويندوز: نفس الـ venv بأمر [[python]].",
            "التفعيل في PowerShell بالسكربت [[Activate.ps1]].",
            "نفس التسطيب.",
            "نفس عمل المشروع.",
            "نفس الـ app.",
            "نفس الـ migrate.",
            "نفس السيرفر. اقفله بـ [[Ctrl+C]]."
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
          lines: [
            "[[os]] عشان [[os.environ]].",
            "[[Path]] للمسارات.",
            "الـ exception بتاع «الإعدادات غلط».",
            "دالة صغيرة تقرا متغير بيئة.",
            "القيمة أو الـ default.",
            "لو مفيش قيمة ولا default...",
            "...وقّف التطبيق برسالة واضحة.",
            "رجّع القيمة (string دايمًا).",
            "فولدر المشروع: اتنين [[parent]] فوق [[settings.py]].",
            "المفتاح من البيئة، ومن غير default.",
            "DEBUG شغال بس لو القيمة [[\"1\"]] بالظبط.",
            "الدومينات مفصولة بفاصلة، وتتحول list.",
            "لو فيه [[DB_HOST]] يبقى Postgres.",
            "dict القواعد.",
            "القاعدة الافتراضية.",
            "درايفر Postgres في Django (محتاج psycopg).",
            "عنوان السيرفر.",
            "البورت، والافتراضي 5432.",
            "اسم القاعدة.",
            "اليوزر.",
            "الباسورد، من البيئة بس.",
            "اتصال يتعاد استخدامه ٦٠ ثانية.",
            "قفل الـ dict.",
            "قفل dict القواعد.",
            "من غير [[DB_HOST]]...",
            "...SQLite في ملف جنب [[manage.py]]."
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

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[makemigrations]] | يكتب ملف بالفرق بين الـ models وآخر migration |
| [[sqlmigrate app 000X]] | يوريك الـ SQL من غير ما ينفّذ |
| [[migrate]] | يطبّق اللي لسه |
| [[showmigrations]] | مين اتطبق ومين لأ |
| [[makemigrations --check]] | في CI: يفشل لو حد نسي migration |
| [[migrate app 000X]] | يرجع لـ migration معين |

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
          lines: [
            "[[models]] فيها كل أنواع الحقول.",
            "جدول الأقسام ([[shop_category]]).",
            "اسم القسم: نص لحد ١٠٠ حرف، ومش متكرر.",
            "النص اللي يظهر لما تطبع القسم.",
            "اسمه.",
            "جدول المنتجات ([[shop_product]]).",
            "كل منتج تبع قسم، وممنوع تمسح قسم فيه منتجات، ومن القسم توصل لمنتجاته بـ [[products]].",
            "اسم المنتج.",
            "السعر بالقروش، ومينفعش سالب.",
            "المخزون، والافتراضي صفر.",
            "ظاهر ولا متخبّي.",
            "وقت الإنشاء، Django بيحطه لوحده.",
            "إعدادات الجدول.",
            "الترتيب الافتراضي: الأحدث الأول.",
            "index مركّب على القسم والسعر.",
            "النص اللي يظهر لما تطبع المنتج.",
            "اسمه."
          ],
          try: R`اعمل الـ models دي في app [[shop]]، وضيفها في [[INSTALLED_APPS]]، واعمل [[makemigrations]] و [[migrate]]. وبعدين زوّد حقل [[description = models.TextField(blank=True)]]، واعمل [[makemigrations --check --dry-run]] الأول، وبعدين الـ migration نفسه، واقرا الـ SQL بـ [[sqlmigrate]]. وأخيرًا جرّب تمسح قسم فيه منتجات من [[python manage.py shell]].`,
          sol: R`[[makemigrations --check --dry-run]] بيطبع [[+ Add field description to product]] ويرجع exit code 1. وبعد [[makemigrations]] هيتعمل [[0003_product_description.py]] (أو الرقم اللي بعد آخر واحد عندك). و [[blank=True]] قاعدة للـ forms والـ admin (الحقل مش إجباري في الفورم)، مش للقاعدة. عشان كده [[makemigrations]] مش هيسألك عن default: [[TextField]] و [[CharField]] ليهم default ضمني [[""]]، فالـ SQL على Postgres بيبقى [[ADD COLUMN "description" text DEFAULT '' NOT NULL]] وبعدها [[DROP DEFAULT]].

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
| [[category__name="Books"]] | [[INNER JOIN shop_category]] و [[name = ...]] |
| [[.exclude(stock=0)]] | [[NOT (stock = 0)]] |
| [[.order_by("price_cents")]] | [[ORDER BY price_cents ASC]]، وبيلغي [[Meta.ordering]] |
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
          lines: [
            "دوال التجميع، و F و Q.",
            "الـ models.",
            "QuerySet للمنتجات الأرخص من ٢٠٠ جنيه والظاهرة. لسه مفيش query.",
            "اطبع الـ SQL اللي هيتبعت.",
            "[[COUNT]] في القاعدة، وأسامي المنتجات بس كـ list.",
            "منتجات قسم Books (JOIN لوحده)، من غير الخلصانة، الأرخص الأول، أول اتنين.",
            "هنا بس بيتنفّذ.",
            "OR: خلصان أو غالي جدًا.",
            "قلّل المخزون في القاعدة نفسها: [[stock = stock - 1]].",
            "اقراه تاني: ١٤.",
            "لكل قسم: عدد منتجاته ومتوسط سعرها.",
            "اطبع كل صف كـ dict.",
            "قيمة المخزون كله في رقم واحد.",
            "فيه منتج خلصان؟ [[SELECT 1 ... LIMIT 1]].",
            "جرّب تجيب صف مش موجود.",
            "[[get]] بيرمي لو مفيش صف.",
            "اللي بيوصل هنا لما مفيش.",
            "اطبع الرسالة.",
            "هات القسم أو اعمله لو مش موجود.",
            "[[Books False]]: كان موجود."
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
- قيس بعدد الـ queries مش بالإحساس، واكتب اختبار يثبّت العدد (درس «pytest-django»).`,
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
          lines: [
            "عشان نقيس الوقت.",
            "الاتصال بالقاعدة.",
            "[[Prefetch]] للتحميل بفلتر.",
            "بيسجّل كل query جوه الـ with.",
            "الـ models.",
            "دالة بتقيس أي دالة تانية.",
            "ابدأ التسجيل.",
            "ابدأ الساعة.",
            "شغّل الكود.",
            "الوقت بالملّي ثانية.",
            "اطبع الاسم وعدد الـ queries والوقت كجدول.",
            "الطريقة الغلط.",
            "query واحدة للمنتجات...",
            "...وكل [[p.category]] query لوحدها: N+1.",
            "الطريقة الصح للـ ForeignKey.",
            "JOIN واحد بيجيب المنتج وقسمه.",
            "القسم جاهز، مفيش query.",
            "العكسي بالطريقة الغلط.",
            "query للأقسام...",
            "...وquery لمنتجات كل قسم.",
            "العكسي بالطريقة الصح.",
            "query للأقسام وواحدة لكل المنتجات بـ IN.",
            "بيقرا من اللي اتحمّل.",
            "تحميل بفلتر.",
            "المنتجات اللي ليها مخزون بس، في [[in_stock]].",
            "لف على الأقسام.",
            "[[in_stock]] list عادية جاهزة.",
            "1001 query.",
            "query واحدة.",
            "51 query.",
            "2 query.",
            "2 query."
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
      ]
    }
]);
