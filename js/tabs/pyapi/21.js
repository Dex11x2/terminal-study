// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Django: admin و views و auth",
      l: 2,
      time: R`حوالي ٧ ساعات (٤ دروس، وكل درس فيه تمارين)`,
      goal: [
        R`تدّي الفريق لوحة تحكم من الـ models: بحث وفلاتر وأوامر و inlines، من غير N+1 وبصلاحيات.`,
        R`تكتب views بترد HTML أو JSON على URLs ليها أسامي، وتختار بين function و class-based views وتعرف ترتيب الـ mixins.`,
        R`تستقبل إدخال اليوزر بـ forms بتفحص وترجّع الأخطاء، ومحمية من CSRF، وبتحوّل بعد الحفظ.`,
        R`تعمل نظام يوزرز من User بتاعك، ودخول وخروج، وصلاحيات و groups، ويوزر ميشوفش حاجة غيره.`,
      ],
      use: {
        prog: R`ده الموقع نفسه فوق الـ ORM: الطلب بيدخل، الـ URL يختار view، الـ view تسأل القاعدة وترد. و DRF في الوحدة الجاية نفس الدورة بس JSON.`,
        work: R`لوحة إدارة داخلية، وصفحات بفورمات، وحسابات يوزرز بصلاحيات: ده أغلب اللي الشركات الصغيرة بتطلبه من Django.`,
        net: R`كل رد هنا ليه status في HTTP ([[200]] و [[302]] و [[403]] و [[404]] و [[405]])، و cookies للـ session والـ CSRF، و headers أمان من الـ middleware.`,
        cs: R`الـ MRO في الـ class-based views، والـ hashing بـ salt و iterations للباسوردات، وهجمة CSRF وإزاي الـ token بيقفلها.`,
      },
      lab: R`cd ~/lab/django && . .venv/bin/activate && python manage.py createsuperuser && python manage.py runserver`,
      projects: [
        { lvl: 'صغير', t: R`مدونة بلوحة admin`, what: R`على مدونة الوحدة اللي فاتت: [[PostAdmin]] بأعمدة العنوان والحالة والتاريخ، وفلتر بالحالة، وبحث في العنوان والنص، و [[prepopulated_fields]] للـ slug، و action «انشر المختار» بيحط [[published_at]]. من درس «Django admin».`, done: R`المحرر بينشر ٣ مقالات بأمر واحد والرسالة بتقول [[3 posts published]] (و [[1 post]] لواحد)، والـ slug بيتكتب لوحده، و [[check]] بيعدّي، ويوزر بصلاحية view بس مش شايف الأمر.` },
        { lvl: 'صغير', t: R`صفحات المدونة العامة`, what: R`[[ListView]] للمقالات المنشورة بس بصفحات من ٥، و [[DetailView]] بالـ slug ([[<slug:slug>/]])، والمقال المسودة بيرجّع 404، وكل اللينكات بـ [[{% url %}]]. من درس «views و urls».`, done: R`[[/blog/?page=2]] بيعرض المقالات من ٦ لـ ١٠، و [[/blog/<slug مسودة>/]] بيرجّع [[404]]، و [[/blog/?page=99]] [[404]]، وتغيير [[blog/]] لـ [[posts/]] في [[config/urls.py]] مكسرش ولا لينك.` },
        { lvl: 'متوسط', t: R`فورم تواصل بيوصل فعلًا`, what: R`[[ContactForm]] (اسم وإيميل ورسالة من ٢٠ حرف) بيبعت إيميل للفريق في [[on_commit]] وبيحفظ الرسالة في model، وبيحوّل لصفحة «شكرًا»، وفيه honeypot (خانة مخفية لو اتملت يبقى bot). من دروس forms و transaction.atomic.`, done: R`داتا غلط بترجّع الفورم بالأخطاء والقيم، وداتا صح بتعمل [[302]] وصف في الجدول وإيميل في الـ console، والـ refresh بعد الحفظ مبيعملش رسالة تانية، والـ honeypot المليان بيرجّع نفس صفحة الشكر من غير ما يحفظ حاجة، و POST من غير CSRF بيرجّع [[403]].` },
        { lvl: 'متوسط', t: R`مكتبة بالحسابات والصلاحيات`, what: R`على مكتبة الوحدة اللي فاتت: [[accounts.User]] من الأول، وصفحة «كتبي المستعارة» للداخل بس، وزرار «استعير» (POST و CSRF) بيفشل لو الكتاب مش متاح، و group [[librarians]] بصلاحية تعليم الإرجاع من الـ admin. من دروس auth و forms و views.`, done: R`زائر بيتحوّل للدخول ومعاه [[next]]، ويوزر بيشوف استعاراته بس (رقم استعارة غيره [[404]])، والاستعارة المزدوجة لنفس النسخة مستحيلة حتى بطلبين مع بعض، وأمين المكتبة بيعلّم إرجاع من الـ admin واليوزر العادي مش شايف الصفحة.` },
        { lvl: 'كبير', t: R`نظام تذاكر دعم فني`, what: R`العميل بيفتح تذكرة بفورم (عنوان ووصف وأولوية ومرفق اختياري لحد ٢ ميجا)، ويشوف تذاكره بس ويرد عليها. الموظفين (group [[agents]]) بيشوفوا كل التذاكر في الـ admin بفلاتر الحالة والأولوية، و inline للردود، و action «اقفل المختار». كل تغيير حالة بيتسجّل في جدول audit بـ signal على model مش بتاعك (أو service صريحة لو بتاعك)، وإيميل للعميل في [[on_commit]]. من الوحدة كلها والوحدة اللي قبلها.`, done: R`عميل ميقدرش يفتح تذكرة غيره ولا يغيّر حالتها (اختبار بيأكد [[404]])، والمرفق الأكبر من ٢ ميجا بيترفض برسالة، وصفحة list الـ admin على ٥٠٠ تذكرة بعدد queries ثابت ([[assertNumQueries]])، والـ audit فيه سطر لكل تغيير، والاختبارات (١٥ على الأقل) بتعدّي مرتين ورا بعض.`, ext: R`زوّد SLA (تذكرة عالية الأولوية من غير رد في ساعة تتعلّم)، وتعيين تلقائي لأقل موظف عنده تذاكر، وبحث full-text، و API في الوحدة الجاية لتطبيق موبايل.` },
        { lvl: 'فكرة', t: R`لوحة إدارة لنشاط حقيقي`, what: R`اختار نشاط تعرفه (عيادة، أو جيم، أو مكتب كورسات، أو محل) واعمل نظام داخلي للموظفين: الـ models، ولوحة admin مظبوطة لكل دور (استقبال، محاسب، مدير) بـ groups، وصفحتين عامتين للعملاء بفورم حجز أو طلب. انت اللي بتقرر الأدوار والصفحات.`, done: R`فيه ٣ أدوار على الأقل كل واحد بيشوف اللي يخصه بس (اتجرّب بيوزر لكل دور)، وكل فورم عام فيه CSRF ورسايل أخطاء واضحة، و README بصور للوحة لكل دور.`, ext: R`زوّد تقارير شهرية بـ [[annotate]]، وتصدير CSV من action، وتسجيل دخول بالإيميل بدل الـ username، و 2FA للمدير.` },
      ],
      n: "لوحة تحكم جاهزة من الـ models، و views بترد HTML أو JSON على URLs ليها أسامي (function و class-based)، و forms بتفحص الإدخال ومحمية من CSRF، ونظام يوزرز وصلاحيات جاهز",
      items: [
        {
          cmd: "Django admin",
          title: "لوحة تحكم كاملة من الـ models: createsuperuser و ModelAdmin",
          desc: R`[[admin.py]] بيسجّل الـ models في لوحة جاهزة على [[/admin/]]: list و بحث وفلاتر وإضافة وتعديل ومسح، بالصلاحيات. و [[python manage.py createsuperuser]] بيعمل أول يوزر يدخلها.

[[ModelAdmin]] بيتحكم في الشكل: [[list_display]] الأعمدة، و [[search_fields]] البحث، و [[list_filter]] الفلاتر، و [[list_editable]] تعديل من الجدول، و [[actions]] أوامر على صفوف كتير. و [[list_select_related]] بيمنع N+1 في صفحة الـ list.`,
          deep: {
            why: R`أي مشروع محتاج حد من الفريق (مش مبرمج) يضيف منتج أو يعدّل طلب أو يقفل يوزر. الـ admin بيدّيك ده في عشرين سطر بدل لوحة تكتبها بإيدك أسابيع. وده من أكبر أسباب إن ناس كتير بتختار Django.`,
            how: R`[[@admin.register(Product)]] decorator بيسجّل الـ class على الـ model. الـ admin بيقرا الحقول من الـ model: الأنواع والـ choices والـ [[blank]] والعلاقات، ويعمل الفورم لوحده.

[[list_display]] ممكن فيه أسامي حقول أو دوال على الـ ModelAdmin. الدالة بتاخد [[obj]] وترجع قيمة، و [[@admin.display(ordering=..., description=...)]] بيدّيها عنوان ويخليها تترتب. و [[get_queryset]] بتعدّل الـ query الأساسي، مثلًا [[annotate(Count(...))]] عشان العدد يتحسب في القاعدة مش query لكل صف.

لو [[list_select_related]] مش متحدد، Django بيعمل select_related بس للـ ForeignKey اللي **اسمها** في [[list_display]]. دالة بتقرا [[obj.category.name]] مش بيشوفها، فلازم تقوله.

[[autocomplete_fields]] بيحوّل الـ dropdown لبحث (مهم لو الأقسام آلاف)، ومحتاج [[search_fields]] على الـ admin التاني، و [[manage.py check]] بيمسك ده. و [[actions]] بتاخد [[queryset]] بالصفوف المختارة، و [[message_user]] بتطلّع رسالة فوق.

الصلاحيات: superuser يشوف كل حاجة. يوزر عادي محتاج [[is_staff=True]] عشان يدخل، وصلاحيات [[view_]] و [[add_]] و [[change_]] و [[delete_]] لكل model (Django بيعملهم لوحده مع [[migrate]]).`,
            when: R`لوحة داخلية للفريق: إدخال داتا، دعم فني، مراجعة طلبات. مش واجهة لليوزرز العاديين، ولا بديل لـ dashboard معقد بـ workflows (ساعتها views بتاعتك).`,
            mistakes: R`تفتح [[/admin/]] للعالم على نفس المسار الافتراضي من غير 2FA ولا تحديد IP (غيّر المسار وحط حماية قدامه). وتعمل superuser لكل الفريق بدل groups بصلاحيات. و [[list_display]] فيه دالة بتقرا علاقة من غير [[list_select_related]] (اتقاس تحت: ١٠٦ query بدل ٦). و [[list_editable]] على حقل في [[list_display_links]] (error). و [[DJANGO_SUPERUSER_PASSWORD]] متكتب في سكربت بيتعمله commit.`
          },
          teach: R`## المثال بيعمل إيه؟

بيسجّل [[Category]] و [[Product]] في الـ admin بإعدادات حقيقية، وبيعمل superuser. اتشغّل بـ Django 6.1.2 على Postgres 16 في Docker بـ ١٠٠٠ منتج، والطلبات اتعملت بـ [[django.test.Client]] من [[manage.py shell]] (نفس الـ HTTP من غير متصفح).

---

## ١. [[CategoryAdmin]]

~~~python
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "product_count"]
    search_fields = ["name"]
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(n=Count("products"))
    @admin.display(ordering="n", description="Products")
    def product_count(self, obj):
        return obj.n
~~~

- [[@admin.register(Category)]]: سجّل الـ class ده كإعدادات لـ [[Category]] في الـ admin.
- [[list_display]]: أعمدة صفحة الـ list. [[product_count]] مش حقل، دي دالة تحت.
- [[search_fields = ["name"]]]: مربع بحث بيعمل [[name ILIKE %...%]].
- [[get_queryset]]: [[super()]] بيرجّع الـ query العادي، وإحنا بنضيف [[n]] = عدد المنتجات، محسوب في نفس الـ query بـ GROUP BY.
- [[@admin.display(ordering="n", description="Products")]]: عنوان العمود «Products»، ولو دوست عليه يترتب بـ [[n]].

## ٢. [[ProductAdmin]]

~~~python
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category_name", "price_cents", "stock", "is_active"]
    list_filter = ["is_active", "category"]
    search_fields = ["name", "category__name"]
    list_editable = ["stock", "is_active"]
    list_select_related = ["category"]
    autocomplete_fields = ["category"]
    actions = ["deactivate"]
~~~

| الإعداد | بيعمل إيه |
|---|---|
| [[list_filter]] | فلاتر على اليمين: ظاهر/متخبّي، وكل قسم |
| [[search_fields]] | البحث في اسم المنتج **أو** اسم القسم ([[__]] بيعمل JOIN) |
| [[list_editable]] | تعدّل المخزون والحالة من الجدول نفسه وتعمل Save مرة |
| [[list_select_related]] | JOIN مع القسم في query الـ list |
| [[autocomplete_fields]] | خانة القسم في فورم المنتج بقت بحث بدل dropdown |
| [[actions]] | أمر جديد في قايمة «Action» فوق الجدول |

## ٣. الدالة والـ action

~~~python
    @admin.display(ordering="category__name", description="Category")
    def category_name(self, obj):
        return obj.category.name
    @admin.action(description="Deactivate selected products", permissions=["change"])
    def deactivate(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} products deactivated")
~~~

- [[category_name]]: عمود بيقرا اسم القسم. وده بالظبط اللي بيعمل N+1 لو مفيش [[list_select_related]].
- [[@admin.action(..., permissions=["change"])]]: الأمر يظهر بس لليوزر اللي معاه صلاحية تعديل المنتجات. من غير [[permissions]] كان بيظهر لأي حد بيشوف الصفحة (جربتها بيوزر view بس: قايمة Action ظهرتله). و [[queryset]] فيه الصفوف اللي اخترتها، و [[update()]] بيعمل [[UPDATE]] واحد ويرجّع عددهم.
- [[message_user]]: رسالة خضرا فوق الصفحة.

### قست صفحة الـ list

~~~text اتشغّل فعلًا · الناتج
list_select_related = ['category'] -> 200 6 queries
list_select_related = False -> 200 106 queries
~~~

الصفحة بتعرض ١٠٠ منتج. من غير [[list_select_related]]، كل صف عمل query لقسمه: ١٠٠ زيادة. والـ ٦ الباقيين session واليوزر والعدّ والفلاتر.

### [[check]] بيمسك الغلط

شلت [[search_fields]] من [[CategoryAdmin]]:

~~~text الناتج
ERRORS:
<class 'shop.admin.ProductAdmin'>: (admin.E040) CategoryAdmin must define "search_fields", because it's referenced by ProductAdmin.autocomplete_fields.
~~~

---

## ٤. [[createsuperuser]]

~~~bash
python manage.py createsuperuser
~~~

بيسألك على username و email و password (مرتين). وفي سكربت أو CI من غير أسئلة:

~~~bash
DJANGO_SUPERUSER_PASSWORD='...' python manage.py createsuperuser --noinput --username admin --email admin@example.com
~~~

~~~text الناتج
Superuser created successfully.
~~~

[[--noinput]] يعني متسألش، والباسورد من [[DJANGO_SUPERUSER_PASSWORD]]. وفي PowerShell: [[$env:DJANGO_SUPERUSER_PASSWORD = '...']] في سطر قبله.

### من غير دخول

~~~text الناتج
302 /admin/login/?next=/admin/shop/product/
~~~

أي صفحة في الـ admin من غير session بتحوّلك للدخول، و [[next]] بيرجّعك لنفس الصفحة بعده.

---

## ٥. صفحة التعديل نفسها: inlines و fieldsets و readonly

لحد دلوقتي ظبطنا صفحة الـ list. صفحة التعديل (لما تدوس على منتج) ليها إعداداتها. اتجرّب بـ Django 6.1.2 على SQLite، والطلبات بـ [[django.test.Client]] بـ superuser:

~~~python
admin.site.site_header = "Shop admin"
class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    fields = ["author", "rating", "body"]
    readonly_fields = ["author"]
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    ...
    readonly_fields = ["created_at"]
    fieldsets = [(None, {"fields": ["name", "category", "price_cents"]}), ("Stock", {"fields": ["stock", "is_active", "created_at"]})]
    inlines = [ReviewInline]
~~~

| الإعداد | بيعمل إيه |
|---|---|
| [[admin.site.site_header]] | النص اللي فوق في كل صفحات الـ admin بدل «Django administration». طلع [[Shop admin]]. وعنوان التاب في المتصفح ليه [[site_title]] لوحده |
| [[TabularInline]] | جدول بالـ reviews بتاعة المنتج جوه صفحته، تعدّلهم مع المنتج في Save واحد. و [[StackedInline]] نفس الحاجة بس كل صف فورم كبير |
| [[extra = 0]] | من غير صفوف فاضية زيادة للإضافة (الافتراضي ٣) |
| [[readonly_fields = ["author"]]] | الكاتب بيظهر نص مش dropdown، فمحدش يغيّر مين كتب الـ review |
| [[readonly_fields = ["created_at"]]] | الحقل اللي [[auto_now_add]] بيظهر نص. من غيرها مكانش هيظهر خالص (حقل مش editable) |
| [[fieldsets]] | يقسّم الفورم لأقسام بعناوين. [[None]] = قسم من غير عنوان |
| [[prepopulated_fields = {"slug": ["name"]}]] | في صفحة القسم، الـ slug بيتكتب لوحده وانت بتكتب الاسم (JavaScript في الصفحة) |

اللي اتقاس على صفحة تعديل [[HDMI 2m]]: [[200]]، وجدول Reviews موجود، ومفيش input اسمه [[created_at]]، وقسم Stock ظاهر. والبحث [[?q=usb]] في الـ list طلّع [[2 results]].

> الـ inline بيعمل query لكل inline وكل dropdown فيه. لو الـ reviews بالمئات على منتج واحد، استخدم لينك لصفحة الـ reviews مفلترة بدل inline.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تسجّل model | [[@admin.register(Model)]] |
| أعمدة | [[list_display]] (حقول أو دوال) |
| بحث وفلاتر | [[search_fields]] و [[list_filter]] |
| تمنع N+1 | [[list_select_related]] و [[get_queryset]] + [[annotate]] |
| أمر على صفوف كتير | [[actions]] + [[@admin.action]] |
| أول يوزر | [[createsuperuser]] |
| جداول تابعة في صفحة التعديل | [[inlines]] + [[TabularInline]] |
| أقسام وحقول للقراية | [[fieldsets]] و [[readonly_fields]] |

- الـ admin للفريق مش للعملاء، واحميه.
- [[python manage.py check]] بعد أي تعديل في [[admin.py]].`,
          example: R`from django.contrib import admin
from django.db.models import Count
from .models import Category, Product
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "product_count"]
    search_fields = ["name"]
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(n=Count("products"))
    @admin.display(ordering="n", description="Products")
    def product_count(self, obj):
        return obj.n
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category_name", "price_cents", "stock", "is_active"]
    list_filter = ["is_active", "category"]
    search_fields = ["name", "category__name"]
    list_editable = ["stock", "is_active"]
    list_select_related = ["category"]
    autocomplete_fields = ["category"]
    actions = ["deactivate"]
    @admin.display(ordering="category__name", description="Category")
    def category_name(self, obj):
        return obj.category.name
    @admin.action(description="Deactivate selected products", permissions=["change"])
    def deactivate(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} products deactivated")
# في الترمنال:
# python manage.py check
# python manage.py createsuperuser`,
          flag: "script",
          learn: R`تعمل لوحة تحكم كاملة من الـ models: أعمدة وبحث وفلاتر وتعديل من الجدول وأوامر على صفوف كتير، و inlines و fieldsets، من غير N+1، وبصلاحيات للفريق مش superuser للكل.`,
          out: R`فريق الدعم والمحتوى بيضيف ويعدّل ويقفل منتجات من [[/admin/]]، وصفحة الـ list بـ ٦ queries مهما كان عدد المنتجات.`,
          use: {
            work: R`أول طلب من أي فريق غير المبرمجين: «عايزين نضيف ونعدّل الداتا من غير ما نكلّمكم». الـ admin بيحل ده في ساعة.`,
            prog: R`الـ admin بيقرا الـ model نفسه (الأنواع والـ choices والعلاقات)، فلو الـ model مكتوب صح، الفورم والتحقق بييجوا ببلاش.`,
          },
          lines: [
            R`[[from django.contrib import admin]]: الـ module اللي فيه [[ModelAdmin]] و [[register]] و [[display]] و [[action]] و [[site]] (اللوحة نفسها).`,
            R`[[from django.db.models import Count]]: هنستخدمه في [[get_queryset]] عشان عدد منتجات كل قسم يتحسب في القاعدة بـ [[GROUP BY]]، مش query لكل قسم.`,
            R`[[from .models import Category, Product]]: الـ models من نفس الـ app. النقطة يعني «من الـ package ده»، فلو غيّرت اسم الـ app الـ import ميبوظش.`,
            R`[[@admin.register(Category)]]: سجّل الـ class اللي تحت كإعدادات لـ [[Category]] في الـ admin. ده نفس [[admin.site.register(Category, CategoryAdmin)]] بس أقصر.`,
            R`[[class CategoryAdmin(admin.ModelAdmin)]]: كل حاجة في صفحة الأقسام بتتحدد هنا. من غير أي إعدادات، الـ admin بيعرض عمود واحد هو [[__str__]].`,
            R`[[list_display = ["name", "product_count"]]]: أعمدة جدول الأقسام: الاسم، وعمود [[product_count]] اللي هو دالة تحت مش حقل في القاعدة.`,
            R`[[search_fields = ["name"]]]: مربع بحث بيعمل [[name ILIKE '%...%']]. ومطلوب كمان عشان [[autocomplete_fields]] في صفحة المنتجات تقدر تدوّر في الأقسام.`,
            R`[[def get_queryset(self, request)]]: الـ query الأساسي اللي صفحة الـ list والـ detail بيبدأوا منه. بنعدّله هنا بدل ما نعمل query جوه الدالة لكل صف.`,
            R`[[super().get_queryset(request).annotate(n=Count("products"))]]: خد الـ query العادي وزوّد عمود [[n]] = عدد المنتجات لكل قسم، كله في query واحدة.`,
            R`[[@admin.display(ordering="n", description="Products")]]: عنوان العمود في الجدول [[Products]]، ولو دوست على العنوان يترتب بـ [[n]] في القاعدة. من غير [[ordering]] العمود مش بيترتب.`,
            R`[[def product_count(self, obj)]]: الـ admin بيناديها لكل صف، و [[obj]] هو القسم بتاع الصف ده.`,
            R`[[return obj.n]]: العدد اللي [[annotate]] حسبه وحطه على الـ object. لو كتبت [[obj.products.count()]] بدلها كانت هتبقى query لكل قسم.`,
            R`[[@admin.register(Product)]]: نفس الفكرة لصفحة المنتجات.`,
            R`[[class ProductAdmin(admin.ModelAdmin)]]: إعدادات صفحة المنتجات: الأعمدة والفلاتر والبحث والتعديل من الجدول والأوامر.`,
            R`[[list_display = [...]]]: خمس أعمدة. [[category_name]] دالة، والباقي حقول. [[is_active]] بيظهر كعلامة صح أو غلط لأنه [[BooleanField]].`,
            R`[[list_filter = ["is_active", "category"]]]: فلاتر على جنب الجدول: ظاهر/متخبّي، وكل قسم. الـ admin بيعمل اختيارات الفلتر من القيم الموجودة.`,
            R`[[search_fields = ["name", "category__name"]]]: البحث في اسم المنتج **أو** اسم القسم. [[__]] بيعمل JOIN، فكلمة [[Books]] بتجيب كل كتب القسم.`,
            R`[[list_editable = ["stock", "is_active"]]]: الخانتين دول بيبقوا inputs في الجدول نفسه وزرار Save تحت. الحقل مينفعش يبقى editable وفي نفس الوقت لينك لصفحة التعديل.`,
            R`[[list_select_related = ["category"]]]: JOIN مع القسم في query صفحة الـ list. لازم هنا لأن [[category_name]] دالة، والـ admin مش بيشوف إنها بتقرا علاقة (اتقاس: ٦ queries بدل ١٠٦).`,
            R`[[autocomplete_fields = ["category"]]]: خانة القسم في فورم المنتج بقت بحث بيكتب ويجيب نتايج، بدل dropdown بيحمّل كل الأقسام. مهم لما الجدول التاني فيه آلاف الصفوف.`,
            R`[[actions = ["deactivate"]]]: زوّد الأمر [[deactivate]] (الدالة تحت) لقايمة «Action» فوق الجدول، جنب [[delete_selected]] الجاهز.`,
            R`[[@admin.display(ordering="category__name", description="Category")]]: عنوان العمود [[Category]]، والترتيب باسم القسم من خلال العلاقة.`,
            R`[[def category_name(self, obj)]]: دالة العمود، بتاخد المنتج بتاع الصف.`,
            R`[[return obj.category.name]]: اسم القسم. من غير [[list_select_related]] السطر ده كان هيعمل query لكل صف من الـ ١٠٠ اللي في الصفحة.`,
            R`[[@admin.action(description="...", permissions=["change"])]]: النص اللي هيظهر في القايمة، والأمر يظهر بس لليوزر اللي معاه [[change_product]]. من غير [[permissions]] كان بيظهر لأي حد بيشوف الصفحة، حتى اللي معاه view بس.`,
            R`[[def deactivate(self, request, queryset)]]: [[queryset]] فيه الصفوف اللي اليوزر علّم عليها بس، و [[request]] عشان [[message_user]] تعرف تكتب لمين.`,
            R`[[updated = queryset.update(is_active=False)]]: [[UPDATE]] واحد لكل المختارين، وبيرجّع عددهم. خد بالك: [[update()]] مبيبعتش [[post_save]] (درس «signals»).`,
            R`[[self.message_user(request, f"{updated} products deactivated")]]: رسالة خضرا فوق الصفحة بعد الأمر. على منتج واحد بتطلع [[1 products deactivated]]، والتمرين التالت بيصلّحها.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** سجّل [[Review]] في الـ admin بأعمدة المنتج والكاتب والتقييم، وفلتر بالتقييم، وبحث في اسم المنتج واسم الكاتب، وترتيب افتراضي الأحدث الأول. من غير ما تبص على المثال.`, done: R`الصفحة بتفتح، والفلتر فيه القيم من ١ لـ ٥ اللي موجودة بس، والبحث بـ [[sara]] بيجيب reviews سارة، و [[python manage.py check]] بيعدّي.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شيل [[list_select_related]] من [[ProductAdmin]]، وعدّ queries صفحة [[/admin/shop/product/]] بـ [[CaptureQueriesContext]] حوالين [[client.get]] (بيوزر superuser و [[force_login]])، وبعدين رجّعه وعدّ تاني.`, done: R`عندك رقمين الفرق بينهم بالظبط عدد المنتجات في الصفحة (حتى ١٠٠)، وزي الدرس: [[106]] مقابل [[6]] على ١٠٠٠ منتج.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** الـ action بيطبع [[1 products deactivated]] على منتج واحد. صلّحها بـ [[ngettext]] من [[django.utils.translation]] عشان تبقى «1 product» و «2 products».`, done: R`منتج واحد بيطلع [[1 product deactivated]]، واتنين [[2 products deactivated]]، والأمر لسه بيظهر بس لصاحب صلاحية change.` },
            { lvl: 'تحدي', t: R`**ابني:** صفحة المنتج فيها الـ reviews كـ [[TabularInline]] (الكاتب للقراية بس)، و [[fieldsets]] بقسمين، و [[created_at]] في [[readonly_fields]]، و [[prepopulated_fields]] للـ slug في الأقسام، و [[site_header]] باسم المتجر. وبعدين يوزر [[support]] في group فيها view و change على المنتجات بس.`, done: R`صفحة المنتج فيها جدول Reviews تحت، و [[created_at]] نص مش input، والـ slug بيتكتب لوحده وانت بتكتب الاسم، والهيدر فيه اسم المتجر. ويوزر [[support]] بيشوف Products بس، ويعدّل ويقفل، ومفيش زرار Delete قدامه.` },
          ],
          try: R`سجّل الـ models دي، واعمل superuser، وادخل [[/admin/]]. ضيف منتج، وجرّب البحث بـ [[USB]]، والفلتر، وعدّل مخزون من الجدول، واعمل Deactivate لمنتجين. وبعدين اعمل يوزر عادي من الـ admin بـ [[Staff status]] وصلاحية [[shop | product | Can view product]] بس، وادخل بيه وشوف إيه اللي ظاهر.`,
          sol: R`البحث بـ [[USB]] بيطلّع [[USB-C 1m]] و [[USB-C 2m]] (لأن [[search_fields]] بيستخدم [[icontains]]). والـ action بيطلّع رسالة [[2 products deactivated]]، والاتنين بيختفوا من فلتر [[Is active: Yes]].

اليوزر بصلاحية view بس بيشوف [[Shop › Products]] لوحدها (من غير Categories)، ويفتح المنتج للقراية من غير زرار Save ولا Delete، ومش بيشوف قايمة Actions: [[delete_selected]] محتاج صلاحية delete، و [[deactivate]] محتاج change بسبب [[permissions=["change"]]]. (من غير الـ [[permissions]] دي، الأمر كان ظاهرله وبيقدر يقفل منتجات وهو معاه view بس.) ولو شلت [[Staff status]]، صفحة الدخول هترفضه حتى لو الباسورد صح.`
        },
        {
          cmd: "views و urls",
          title: "تربط URL بدالة: path و JsonResponse و render و ListView",
          desc: R`الـ view دالة بتاخد [[request]] وترجّع [[HttpResponse]]: [[JsonResponse]] لـ JSON، أو [[render()]] لـ HTML من template. و [[urls.py]] فيه [[path("<int:pk>/", view, name="...")]] بيربط المسار بالدالة، و [[include()]] بيوزّع على الـ apps.

[[get_object_or_404]] بيرجّع 404 بدل error لو الصف مش موجود، و [[reverse()]] و [[{% url %}]] بيبنوا الـ URL من اسمه، فلو غيّرت المسار مفيش لينك بيبوظ. و class-based views زي [[ListView]] للحاجات المتكررة (list بصفحات).`,
          deep: {
            why: R`ده قلب أي موقع Django: طلب يدخل، URL يتطابق، view تسأل القاعدة وترد. لو فاهم الدورة دي، الـ DRF (اللي جاي) مجرد views متخصصة للـ API.`,
            how: R`Django بيبدأ من [[ROOT_URLCONF]] ([[config/urls.py]]) ويجرّب الـ patterns بالترتيب. [[include("shop.urls")]] بيقص الجزء اللي اتطابق ([[shop/]]) ويكمّل في جدول الـ app. والـ converters: [[<int:pk>]] (رقم بس، وبيتحول int)، و [[<slug:...>]] و [[<str:...>]] و [[<uuid:...>]]. لو مفيش تطابق: 404.

[[app_name = "shop"]] بيعمل namespace، فالاسم بيبقى [[shop:product-detail]]، ومش هيتلخبط مع app تانية فيها نفس الاسم.

[[@require_GET]] بيرفض أي method غير GET بـ 405. بس خد بالك: الـ [[CsrfViewMiddleware]] بيشتغل قبل الـ view، فـ POST من غير CSRF token بيرجع 403 قبل ما يوصل للـ decorator.

[[render(request, template, context)]] بيدوّر على الـ template في فولدر [[templates]] جوه كل app ([[APP_DIRS: True]]). والـ template engine بيعمل escape لأي [[{{ متغير }}]] لوحده، فـ [[<script>]] بتطلع [[&lt;script&gt;]] (حماية من XSS).

[[ListView]] class بتعمل الشغل المتكرر: تجيب [[queryset]]، وتقسّمه صفحات بـ [[paginate_by]] (بتقرا [[?page=]])، وتبعته للـ template باسم [[context_object_name]]. و [[as_view()]] بيحوّل الـ class لدالة تتحط في [[path]].`,
            when: R`function views للحاجات البسيطة والواضحة، و class-based views (ListView و DetailView و CreateView...) لما الشغل CRUD متكرر. ولو بتعمل API كامل، DRF أحسن من [[JsonResponse]] بإيدك (فحص المدخلات والصلاحيات والصفحات جاهزين).`,
            mistakes: R`URL مكتوب بإيدك في الـ templates ([[href="/shop/7/"]]) بدل [[{% url %}]]. و [[Product.objects.get(pk=pk)]] في view فأي id غلط يطلع 500 بدل 404. و [[path("<pk>/")]] من غير [[int:]] فـ [[/shop/abc/]] يوصل للـ view ويقع. وتقفل الـ CSRF بـ [[@csrf_exempt]] عشان POST «اشتغل». وتستخدم [[|safe]] في الـ template على كلام جاي من اليوزر (XSS). وترتيب الـ patterns: [[<str:slug>/]] قبل [[cheap/]] هياكل الطلب.`
          },
          teach: R`## المثال بيعمل إيه؟

٣ views: صفحة JSON لمنتج واحد، وصفحة HTML فيها list وبحث، و [[ListView]] للمنتجات الرخيصة بصفحات. والـ URLs بتاعتهم بأسامي. اتشغّل بـ Django 6.1.2 على Postgres 16 في Docker بـ [[runserver]]، والطلبات بـ [[curl]] من جوه الـ container.

---

## ١. [[product_detail]]: JSON

~~~python
@require_GET
def product_detail(request, pk):
    p = get_object_or_404(Product.objects.select_related("category"), pk=pk, is_active=True)
    return JsonResponse({"id": p.pk, "name": p.name, "category": p.category.name, "price": p.price_cents / 100})
~~~

- [[request]]: أول باراميتر في أي view: الطلب كله (الـ method والـ headers و [[request.GET]] و [[request.user]]...).
- [[pk]]: جاي من الـ URL ([[<int:pk>]])، ومتحوّل int.
- [[get_object_or_404(queryset, ...)]]: [[get]]، ولو مفيش صف بيرمي [[Http404]]، و Django بيرد 404.
- [[select_related("category")]]: عشان [[p.category.name]] متعملش query تانية.
- [[JsonResponse(dict)]]: بيحوّله JSON بـ [[Content-Type: application/json]].

~~~bash
curl -s -i http://127.0.0.1:8000/shop/1011/
~~~

~~~text الناتج
HTTP/1.1 200 OK
Server: WSGIServer/0.2 CPython/3.13.18
Content-Type: application/json
X-Frame-Options: DENY
Content-Length: 71
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin

{"id": 1011, "name": "Clean Code", "category": "Books", "price": 450.0}
~~~

الـ headers الأمنية ([[X-Frame-Options]] و [[nosniff]] و [[Referrer-Policy]]) جاية من الـ middleware الافتراضي لوحدها.

### الحالات التانية

| الطلب | الرد | ليه |
|---|---|---|
| [[GET /shop/999999/]] | 404 | [[get_object_or_404]] |
| [[GET /shop/abc/]] | 404 | [[<int:pk>]] مبيقبلش حروف، فمفيش تطابق أصلًا |
| [[HEAD /shop/1011/]] | 405 Method Not Allowed | [[@require_GET]] |
| [[POST /shop/1011/]] | 403 Forbidden | الـ CSRF middleware رفض قبل الـ view: [[CSRF cookie not set.]] |

---

## ٢. [[product_list]]: HTML وبحث

~~~python
def product_list(request):
    products = Product.objects.filter(is_active=True).select_related("category")
    q = request.GET.get("q", "")
    if q:
        products = products.filter(name__icontains=q)
    return render(request, "shop/product_list.html", {"products": products[:20], "q": q})
~~~

- [[request.GET]]: الـ query string. [[.get("q", "")]] القيمة أو string فاضي.
- [[render(request, template, context)]]: املى الـ template بالـ dict ده ورجّعه HTML.

والـ template في [[shop/templates/shop/product_list.html]]:

~~~text product_list.html
<h1>Products{% if q %} matching "{{ q }}"{% endif %}</h1>
<ul>
{% for p in products %}
  <li><a href="{% url 'shop:product-detail' p.pk %}">{{ p.name }}</a> ({{ p.category.name }})</li>
{% empty %}
  <li>No products.</li>
{% endfor %}
</ul>
~~~

- [[{{ ... }}]]: اطبع قيمة (بعد escape).
- [[{% if %}]] و [[{% for %}]] و [[{% empty %}]]: شروط ولف، و [[empty]] لو الـ list فاضية.
- [[{% url 'shop:product-detail' p.pk %}]]: ابني الـ URL من اسمه.

~~~text curl "http://127.0.0.1:8000/shop/?q=usb"
<h1>Products matching "usb"</h1>
<ul>
  <li><a href="/shop/1020/">USB-C 2m</a> (Cables)</li>
  <li><a href="/shop/1017/">USB-C 1m</a> (Cables)</li>
</ul>
~~~

وبـ [[?q=<script>]]:

~~~text الناتج
<h1>Products matching "&lt;script&gt;"</h1>
~~~

الـ template عمل escape لوحده، فمفيش XSS.

---

## ٣. [[CheapProductList]]: class-based view

~~~python
class CheapProductList(ListView):
    queryset = Product.objects.filter(is_active=True, price_cents__lt=20000).select_related("category")
    template_name = "shop/product_list.html"
    context_object_name = "products"
    paginate_by = 2
~~~

| الإعداد | معناه |
|---|---|
| [[queryset]] | الصفوف |
| [[template_name]] | نفس الـ template |
| [[context_object_name]] | اسم الـ list في الـ template ([[products]]) |
| [[paginate_by = 2]] | صفحات من ٢، و [[?page=2]] للتانية |

[[GET /shop/cheap/?page=2]] رجّع [[USB-C 1m]] و [[SQL Basics]]: تالت ورابع أرخص منتج بالترتيب الافتراضي.

---

## ٤. الـ URLs

~~~python
app_name = "shop"
urlpatterns = [
    path("", views.product_list, name="product-list"),
    path("<int:pk>/", views.product_detail, name="product-detail"),
    path("cheap/", views.CheapProductList.as_view(), name="cheap"),
]
~~~

وفي [[config/urls.py]]: [[path("shop/", include("shop.urls"))]]. فـ [[/shop/7/]] = [[shop/]] من المشروع + [[7/]] من الـ app.

~~~python
reverse("shop:product-detail", args=[7]), reverse("shop:cheap")
~~~

~~~text الناتج
/shop/7/ /shop/cheap/
~~~

[[reverse]] في Python و [[{% url %}]] في الـ templates: غيّر [[shop/]] لـ [[store/]] في مكان واحد وكل اللينكات تتغير.

---

## ٥. function view ولا class-based view؟

الاتنين بيعملوا نفس الحاجة في الآخر: دالة بتاخد [[request]] وترجّع response. الفرق في الشغل المتكرر. اتجرّب بـ Django 6.1.2 على SQLite، والطلبات بـ [[django.test.Client]] و [[RequestFactory]]:

### [[as_view()]] بيعمل إيه؟

~~~python
class Ping(View):
    def get(self, request):
        return JsonResponse({"ok": True})
~~~

[[Ping.as_view()]] بترجّع دالة. كل طلب بيعمل object جديد من [[Ping]] ويناديله [[dispatch(request)]]، و [[dispatch]] بيدوّر على method بنفس اسم الـ HTTP method بحروف صغيرة ([[get]] و [[post]]...). مفيش [[post]]؟ يبقى [[405]]:

~~~text اتشغّل فعلًا · الناتج
GET ping 200 {'ok': True}
POST ping 405 GET, HEAD, OPTIONS
~~~

السطر التاني فيه الـ header [[Allow]]: [[View]] زوّد [[HEAD]] لوحده (بينادي [[get]]) و [[OPTIONS]]. ده بديل [[@require_GET]] في الـ classes.

### [[DetailView]] و [[CreateView]] والـ mixins

~~~python
class ProductCreate(LoginRequiredMixin, CreateView):
    form_class = ProductForm
    template_name = "shop/product_form.html"
    success_url = reverse_lazy("shop:product-list")
    def form_valid(self, form):
        messages.success(self.request, f"Saved {form.instance.name}")
        return super().form_valid(form)
class ProductDetail(DetailView):
    queryset = Product.objects.filter(is_active=True).select_related("category")
    template_name = "shop/product_detail.html"
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[LoginRequiredMixin]] | لو مش داخل: [[302]] لصفحة الدخول ومعاه [[?next=]]، زي [[@login_required]] |
| [[CreateView]] | GET بيعرض فورم فاضي، و POST بيعمل [[is_valid()]] و [[save()]] و redirect، أو يرجّع الفورم بالأخطاء. الفورم نفسه في درس «Django forms و CSRF» |
| [[success_url = reverse_lazy(...)]] | يروح فين بعد الحفظ. [[reverse_lazy]] مش [[reverse]] لأن الـ URLs لسه متحمّلتش لما الـ class بيتعرّف |
| [[form_valid(self, form)]] | نقطة تدخّل: بتتنادى لما الفورم صح، وانت بتزوّد رسالة وتنادي [[super()]] يكمّل الحفظ والتحويل |
| [[DetailView]] + [[queryset]] | بيجيب صف بالـ [[pk]] من الـ URL من الـ queryset ده، أو 404. والـ template بياخده باسم [[product]] و [[object]] |

~~~text الناتج
anon new2 302 /accounts/login/?next=/shop/new2/
detail 200 <h1>HDMI 2m</h1>
detail 404 404
create 302 /shop/
delete no perm 403
~~~

السطر الأخير من [[PermissionRequiredMixin]] و [[permission_required = "shop.delete_product"]] على view للمسح: سارة داخلة بس معاهاش الصلاحية، فـ [[403]].

### الفخ: ترتيب الـ mixins

~~~python
class Wrong(CreateView, LoginRequiredMixin):
    ...
~~~

~~~text الناتج (زائر من غير دخول)
wrong order: 200
~~~

الصفحة فتحت للزائر. Python بيدوّر على [[dispatch]] بالترتيب اللي في [[__mro__]]: [[CreateView]] جواها [[View.dispatch]] اللي مبيفحصش حاجة، فبيتنادى الأول و [[LoginRequiredMixin.dispatch]] عمره ما بيتنادى. الـ mixins **دايمًا على الشمال**:

~~~text ProductCreate.__mro__ (أول ٨)
['ProductCreate', 'LoginRequiredMixin', 'AccessMixin', 'CreateView', 'SingleObjectTemplateResponseMixin', 'TemplateResponseMixin', 'BaseCreateView', 'ModelFormMixin']
~~~

### تختار إزاي؟

| الحالة | الأحسن |
|---|---|
| CRUD عادي: list و detail و create و update و delete | class-based ([[ListView]] و [[DetailView]] و [[CreateView]]...)، ٣ سطور بدل ٢٠ |
| منطق مش CRUD: صفحة دفع، webhook، تقرير فيه شروط كتير | function view: السير قدامك من فوق لتحت من غير ما تدوّر في ٨ classes |
| نفس الحماية على views كتير | mixin (class) أو decorator (function)، بس الاتنين ميتخلطوش في نفس الـ view |
| API | DRF (الوحدة الجاية)، اللي هو class-based views متخصصة |

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[path("<int:pk>/", view, name=...)]] | URL → دالة، ورقم بس |
| [[include("app.urls")]] و [[app_name]] | توزيع على الـ apps وأسامي من غير تصادم |
| [[get_object_or_404]] | 404 بدل 500 |
| [[JsonResponse]] / [[render]] | JSON / HTML |
| [[ListView]] + [[paginate_by]] | list بصفحات من غير كود |
| [[reverse]] / [[{% url %}]] | URLs من أساميها |
| [[View]] و [[as_view()]] | [[dispatch]] بيختار [[get]] أو [[post]]، والباقي [[405]] |
| [[LoginRequiredMixin]] و [[PermissionRequiredMixin]] | الحماية في الـ classes، وعلى الشمال دايمًا |`,
          example: R`from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from django.views.generic import ListView
from .models import Product
@require_GET
def product_detail(request, pk):
    p = get_object_or_404(Product.objects.select_related("category"), pk=pk, is_active=True)
    return JsonResponse({"id": p.pk, "name": p.name, "category": p.category.name, "price": p.price_cents / 100})
def product_list(request):
    products = Product.objects.filter(is_active=True).select_related("category")
    q = request.GET.get("q", "")
    if q:
        products = products.filter(name__icontains=q)
    return render(request, "shop/product_list.html", {"products": products[:20], "q": q})
class CheapProductList(ListView):
    queryset = Product.objects.filter(is_active=True, price_cents__lt=20000).select_related("category")
    template_name = "shop/product_list.html"
    context_object_name = "products"
    paginate_by = 2
# shop/urls.py:
from django.urls import path
from . import views
app_name = "shop"
urlpatterns = [
    path("", views.product_list, name="product-list"),
    path("<int:pk>/", views.product_detail, name="product-detail"),
    path("cheap/", views.CheapProductList.as_view(), name="cheap"),
]`,
          flag: "script",
          learn: R`تربط كل URL بـ view ليها اسم، وترد JSON أو HTML من template، وترجّع 404 مش 500، وتختار بين function view و class-based view (ListView و DetailView و CreateView والـ mixins) وتعرف إزاي [[as_view()]] بيوصل للـ [[get]] و [[post]].`,
          out: R`موقع فيه صفحة list ببحث، وصفحة منتج، و JSON، وصفحات بأرقام، وكل اللينكات مبنية من أساميها فتغيير مسار مبيكسرش حاجة.`,
          use: {
            prog: R`الـ view هي النقطة اللي فيها الطلب بيقابل الـ ORM. DRF (الوحدة الجاية) مجرد class-based views متخصصة للـ API، فنفس الفهم بيتنقل.`,
            work: R`أغلب التذاكر في مشروع Django: صفحة جديدة، أو فلتر في صفحة موجودة، أو صلاحية على صفحة. كلها view و URL و template.`,
            net: R`[[405]] و [[404]] و [[403]] و [[302]] هنا مش أرقام عشوائية: كل واحد معناه في HTTP، والمتصفحات والـ proxies والـ crawlers بيتصرفوا بيه.`,
          },
          lines: [
            R`[[from django.http import JsonResponse]]: رد بيحوّل dict لـ JSON ويحط [[Content-Type: application/json]]. لو بعتله list لازم [[safe=False]].`,
            R`[[from django.shortcuts import get_object_or_404, render]]: [[get_object_or_404]] بيعمل [[get()]] ولو مفيش صف بيرمي [[Http404]]، و [[render]] بيملى template ويرجّع [[HttpResponse]] فيه HTML.`,
            R`[[from django.views.decorators.http import require_GET]]: decorator بيرفض أي method غير GET بـ [[405 Method Not Allowed]] ومعاه header [[Allow: GET]]، حتى HEAD. ولو عايز GET و HEAD الاتنين فيه [[require_safe]].`,
            R`[[from django.views.generic import ListView]]: class-based view جاهزة لصفحة فيها list: بتجيب الصفوف وتقسّمها صفحات وتبعتها للـ template.`,
            R`[[from .models import Product]]: الـ model من درس «models و makemigrations».`,
            R`[[@require_GET]]: الـ view دي للقراية بس. [[HEAD]] بيرجع [[405]] منها، أما POST من غير CSRF token فبيترفض قبل ما يوصلها أصلًا بـ [[403]] من الـ [[CsrfViewMiddleware]].`,
            R`[[def product_detail(request, pk)]]: أي view أول باراميتر فيها [[request]] (الطلب كله)، و [[pk]] جاي من الـ URL ([[<int:pk>]]) ومتحوّل لـ int خلاص.`,
            R`[[get_object_or_404(Product.objects.select_related("category"), pk=pk, is_active=True)]]: أول باراميتر ممكن يبقى model أو QuerySet، فبنبعت QuerySet فيه الـ JOIN. والمنتج المتخبّي بيرجع 404 زي اللي مش موجود، فمحدش يعرف إنه موجود.`,
            R`[[return JsonResponse({...})]]: dict فيه الحقول اللي عايزين نطلّعها بس (مش الـ object كله)، و [[price_cents / 100]] بيرجّع السعر بالجنيه كـ float.`,
            R`[[def product_list(request)]]: صفحة HTML فيها المنتجات وبحث اختياري.`,
            R`[[Product.objects.filter(is_active=True).select_related("category")]]: QuerySet لسه متنفذش، فنقدر نكمّل عليه بالبحث تحت. و [[select_related]] عشان الـ template بيعرض اسم القسم.`,
            R`[[q = request.GET.get("q", "")]]: [[request.GET]] هو الـ query string ([[?q=usb]]) كـ dict. [[.get("q", "")]] بترجّع string فاضي لو مش موجود، بدل [[KeyError]] لو كتبت [[request.GET["q"]]].`,
            R`[[if q:]]: string فاضي يبقى False، فالفلتر بيتضاف بس لو اليوزر كتب حاجة.`,
            R`[[products = products.filter(name__icontains=q)]]: QuerySet جديد فوق القديم، و [[icontains]] بيدوّر من غير ما يفرق بين capital و small. القيمة بتتبعت parameter، فمفيش SQL injection.`,
            R`[[return render(request, "shop/product_list.html", {...})]]: الـ template من [[shop/templates/shop/]]، و [[products[:20]]] = [[LIMIT 20]]، و [[q]] بيتبعت عشان الـ template يكتب «matching "usb"».`,
            R`[[class CheapProductList(ListView)]]: نفس فكرة الصفحة اللي فوق بس كـ class: بتكتب الإعدادات بس، و [[ListView]] بيعمل الباقي (الـ GET والـ pagination والـ context).`,
            R`[[queryset = Product.objects.filter(...)]]: الصفوف اللي هتتعرض. بيتنفذ من جديد في كل طلب (Django بيعمل [[.all()]] عليه)، فمش هيتخزن بين الطلبات.`,
            R`[[template_name = "shop/product_list.html"]]: نفس الـ template. من غيره [[ListView]] بيدوّر على [[shop/product_list.html]] لوحده (اسم الـ app و الـ model و [[_list]]).`,
            R`[[context_object_name = "products"]]: اسم الـ list جوه الـ template. من غيره بيبقى [[object_list]] و [[product_list]].`,
            R`[[paginate_by = 2]]: صفحات من ٢. بيقرا [[?page=2]]، وبيبعت [[page_obj]] و [[is_paginated]] للـ template، ورقم صفحة مش موجود بيرجع 404.`,
            R`[[from django.urls import path]]: [[path(route, view, name=...)]] بيربط مسار بدالة، والـ route فيه converters زي [[<int:pk>]].`,
            R`[[from . import views]]: الـ views بتاعة نفس الـ app كـ module، فبنكتب [[views.product_list]] ومش محتاجين import لكل دالة لوحدها.`,
            R`[[app_name = "shop"]]: namespace للأسامي، فالاسم الكامل بيبقى [[shop:product-detail]] ومش هيتلخبط مع [[product-detail]] في app تانية.`,
            R`[[urlpatterns = [...]]]: Django بيجرّب الـ patterns دي بالترتيب، وأول واحد يتطابق هو اللي بيكسب.`,
            R`[[path("", views.product_list, name="product-list")]]: [[""]] يعني [[/shop/]] نفسه (بعد الجزء اللي في [[config/urls.py]]).`,
            R`[[path("<int:pk>/", views.product_detail, name="product-detail")]]: [[int:]] بيقبل أرقام بس ويحوّلها int، فـ [[/shop/abc/]] مبيتطابقش أصلًا وبيرجع 404 من غير ما يوصل للـ view.`,
            R`[[path("cheap/", views.CheapProductList.as_view(), name="cheap")]]: [[as_view()]] بتحوّل الـ class لدالة: كل طلب بيعمل object جديد وينادي [[dispatch]] اللي بيختار [[get]] أو [[post]] حسب الـ method.`,
            R`قفل لستة [[urlpatterns]]: أي [[path]] بره القوس ده Django مش هيشوفه، والطلب بتاعه هيرجع 404.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الـ URL والـ view والاسم لصفحة [[/shop/category/<id>/]] بترجع JSON بأسامي منتجات القسم، و 404 لو القسم مش موجود، واستخدم [[reverse]] تطبع مسارها.`, done: R`[[reverse("shop:category-products", args=[1])]] بيطبع [[/shop/category/1/]]، و [[curl]] على قسم موجود بيرجّع [[200]] و list أسامي، وعلى [[999999]] بيرجّع [[404]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب الـ status لكل طلب قبل ما تشغّل: [[GET /shop/abc/]]، و [[HEAD /shop/1/]]، و [[POST /shop/1/]] من curl، و [[GET /shop/cheap/?page=99]]، و [[POST /shop/ping/]] (View فيها [[get]] بس، من الـ test client).`, done: R`[[404]] و [[405]] و [[403]] و [[404]] و [[405]]. الـ HEAD جه معاه [[Allow: GET]] (من [[require_GET]])، وبتاع الـ View جه معاه [[Allow: GET, HEAD, OPTIONS]] (الـ class بيزوّد HEAD لوحده لو فيه [[get]])، وكاتب سبب كل واحد في كلمتين (converter، require_GET، CSRF، pagination، dispatch).` },
            { lvl: 'تطبيق', t: R`**refactor:** حوّل [[product_detail]] لـ [[DetailView]] بيرجّع HTML من [[shop/product_detail.html]]، من غير ما الـ 404 للمنتج المتخبّي يتغيّر.`, done: R`[[GET /shop/p/<id>/]] لمنتج ظاهر بيرجّع [[200]] وفيه [[<h1>]] بالاسم، ولمنتج [[is_active=False]] أو مش موجود [[404]]، والـ class ٣ سطور بس ([[queryset]] و [[template_name]]).` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** [[class ProductCreate(CreateView, LoginRequiredMixin)]]، والمفروض الصفحة للداخلين بس، بس الزوار بيفتحوها عادي. لاقي السبب من [[ProductCreate.__mro__]] وصلّحه.`, done: R`قبل التصليح [[GET /shop/new2/]] من غير دخول رجّع [[200]]، وبعد ما بقت [[(LoginRequiredMixin, CreateView)]] رجّعت [[302]] لـ [[/accounts/login/?next=/shop/new2/]]، وكاتب إن [[dispatch]] بتاع [[View]] كان بيتنادى قبل بتاع الـ mixin.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبارات لـ [[product_list]]: البحث بـ [[usb]] بيرجّع منتجين بس، و [[?q=<script>]] بيظهر escaped، و [[?q=]] فاضي بيرجّع الكل، وعدد الـ queries ١ في كل الحالات.`, done: R`٤ اختبارات بتعدّي، واختبار الـ XSS بيدوّر على [[&lt;script&gt;]] في الرد، ولو شلت [[select_related]] من الـ view اختبار الـ queries بيفشل.` },
            { lvl: 'تحدي', t: R`**ابني:** صفحة [[/shop/search/]] بـ [[ListView]] فيها بحث بالاسم وفلتر بالقسم ([[?category=books]]) وترتيب ([[?sort=price]] أو [[-price]] بس، وأي قيمة تانية تتجاهل) وصفحات من ١٠، واللينكات بتاعة الصفحات بتحافظ على البحث والفلتر.`, done: R`[[?q=usb&sort=-price&page=1]] بيرجّع المنتجات مترتبة من الأغلى، ولينك «التالي» فيه نفس [[q]] و [[sort]]، و [[?sort=drop table]] مبيعملش error ومبيغيّرش الترتيب، والصفحة بـ query واحدة للصفوف + واحدة للعدّ.` },
          ],
          try: R`ضيف الـ views دي والـ template، و [[path("shop/", include("shop.urls"))]] في [[config/urls.py]]، وشغّل [[runserver]]. جرّب [[/shop/]] و [[/shop/?q=usb]] و [[/shop/<id>/]] و [[/shop/abc/]] و [[/shop/cheap/?page=2]]. وبعدين اعمل [[curl -X POST]] على صفحة المنتج وشوف الـ status. وأخيرًا ضيف view اسمها [[category_products]] على [[/shop/category/<int:pk>/]] بترجع JSON بأسامي منتجات القسم.`,
          solCode: R`def category_products(request, pk):
    category = get_object_or_404(Category, pk=pk)
    names = list(category.products.filter(is_active=True).values_list("name", flat=True))
    return JsonResponse({"category": category.name, "products": names})
# في shop/urls.py جوه urlpatterns:
#     path("category/<int:pk>/", views.category_products, name="category-products"),`,
          sol: R`[[/shop/abc/]] بيرجع 404 من غير ما يوصل لأي view. و [[curl -X POST]] بيرجع [[403]] مش [[405]]: الـ [[CsrfViewMiddleware]] بيرفض أي POST مفيهوش CSRF token قبل ما الـ view أو [[@require_GET]] يشتغلوا، والصفحة بتقول [[CSRF cookie not set.]]. و [[curl -I]] (يعني HEAD) بيرجع [[405 Method Not Allowed]] لأن الـ CSRF مبيفحصش HEAD.

والـ view الجديدة محتاجة [[from .models import Category, Product]]، وبترجع مثلًا [[{"category": "Books", "products": ["SQL Basics", "Python Tricks", "Clean Code"]}]] (بالترتيب الافتراضي: الأحدث الأول). و [[values_list(..., flat=True)]] بيجيب الأسامي بس، فـ query واحدة خفيفة.`
        },
        {
          cmd: "Django auth",
          title: "يوزرز ودخول وصلاحيات: custom User و login_required و groups",
          desc: R`Django فيه نظام auth كامل: جدول يوزرز بباسوردات متشفّرة، و [[authenticate()]] و [[login()]]، و sessions في cookie، وصفحات دخول وخروج جاهزة من [[django.contrib.auth.urls]]، و [[@login_required]] و [[@permission_required]] لحماية الـ views، و groups وصلاحيات لكل model.

أهم قرار في أول المشروع: اعمل [[User]] بتاعك (يورث من [[AbstractUser]]) وحط [[AUTH_USER_MODEL]] **قبل أول migrate**. تغييره بعدين صعب جدًا.`,
          deep: {
            why: R`تسجيل الدخول أخطر جزء في أي موقع: تشفير الباسورد، والـ sessions، و CSRF، وتغيير الـ session بعد الدخول، ورسائل الخطأ اللي متكشفش لو اليوزر موجود. Django عامل ده كله صح ومتراجع من سنين، فإنت بتستخدمه بدل ما تكتبه.`,
            how: R`الباسورد بيتخزن hash بـ PBKDF2-SHA256 (في Django 6.1: مليون ونص iteration)، بالشكل [[algorithm$iterations$salt$hash]]، فمحدش (ولا إنت) يقدر يرجّعه. [[create_user]] بيعمل الـ hash، و [[check_password]] بيقارن. ولما Django يزوّد الـ iterations في نسخة جديدة، الـ hash بيتحدّث لوحده أول ما اليوزر يدخل.

[[authenticate(username, password)]] بيرجّع اليوزر أو [[None]]. و [[login(request, user)]] بيحط id اليوزر في الـ session ويغيّر مفتاح الـ session (ضد session fixation). والـ [[AuthenticationMiddleware]] بيحط [[request.user]] في كل طلب ([[AnonymousUser]] لو مش داخل).

[[include("django.contrib.auth.urls")]] بيدّيك [[login/]] و [[logout/]] و [[password_change/]] و [[password_reset/]] وغيرهم. الـ [[logout]] لازم POST (من Django 5.0). و [[@login_required]] بيحوّل لـ [[LOGIN_URL]] ومعاه [[?next=]]، و [[@permission_required(..., raise_exception=True)]] بيرد 403 بدل التحويل.

الصلاحيات: مع كل model، [[migrate]] بيعمل ٤: [[add_]] و [[change_]] و [[delete_]] و [[view_]]. بتتدّي لليوزر مباشرة أو لـ [[Group]] (أحسن)، و [[user.has_perm("app.codename")]] بيفحص. والـ superuser عنده كل حاجة.

ليه custom User من الأول؟ جداول الـ admin و الـ sessions والـ migrations بتاعتهم بيشاوروا على جدول اليوزر. لو بدأت بـ [[auth.User]] وغيرت بعدين، [[migrate]] بيرفض بـ [[InconsistentMigrationHistory]].`,
            when: R`أي موقع فيه يوزرز بيدخلوا بـ session (موقع HTML أو SPA على نفس الدومين). وللـ API اللي بيكلّمه موبايل أو دومين تاني، DRF عنده tokens (درس «DRF permissions و pagination»)، أو JWT بمكتبة زي [[djangorestframework-simplejwt]]. ولو عايز تسجيل بـ Google وتأكيد إيميل جاهز: [[django-allauth]].`,
            mistakes: R`تبدأ مشروع بـ [[auth.User]] الافتراضي وبعد شهر تحتاج حقل [[phone]] أو الدخول بالإيميل. وتكتب [[User.objects.create(password="...")]] فالباسورد يتخزن نص عادي ومحدش يقدر يدخل (استخدم [[create_user]] أو [[set_password]]). وتعمل [[from django.contrib.auth.models import User]] في الكود بدل [[get_user_model()]] أو [[settings.AUTH_USER_MODEL]] في الـ ForeignKey. ولينك logout كـ GET (بقى 405 من Django 5). وتفحص [[user.is_superuser]] في كل حتة بدل صلاحيات.`
          },
          teach: R`## المثال بيعمل إيه؟

app اسمها [[accounts]] فيها [[User]] بتاعك بحقل [[phone]]، والإعدادات اللي بتخلي Django يستخدمه، و view محمية بالدخول، وواحدة محمية بصلاحية، و URLs الدخول والخروج الجاهزة. اتشغّل بـ Django 6.1.2 على لينكس في Docker في مشروع جديد بـ SQLite، والطلبات بـ [[django.test.Client]] من [[manage.py shell]].

---

## ١. الـ User بتاعك

~~~python
from django.contrib.auth.models import AbstractUser
from django.db import models
class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
~~~

- [[AbstractUser]]: كل حقول اليوزر العادي ([[username]] و [[password]] و [[email]] و [[is_staff]] و [[groups]]...) من غير جدول. إنت اللي بتعمل الجدول بالـ class ده.
- [[phone]]: حقل زيادة. ولو مش محتاج حاجة دلوقتي، اكتب [[pass]]: المهم الـ class يبقى موجود من الأول.

## ٢. الإعدادات

~~~python
AUTH_USER_MODEL = "accounts.User"
LOGIN_REDIRECT_URL = "/me/"
~~~

- [[AUTH_USER_MODEL]]: [["app.Model"]]. كل Django (الـ admin و auth و sessions) هيستخدم الجدول ده.
- [[LOGIN_REDIRECT_URL]]: يروح فين بعد الدخول لو مفيش [[?next=]].

وضيف [[accounts]] في [[INSTALLED_APPS]]، وبعدين [[makemigrations accounts]] و [[migrate]]. الجدول اسمه:

~~~text الناتج
<class 'accounts.models.User'> accounts_user
~~~

### ليه قبل أول migrate؟

جربت العكس: مشروع عمل [[migrate]] بالـ User الافتراضي، وبعدين زوّدت [[accounts.User]]:

~~~text الناتج
django.db.migrations.exceptions.InconsistentMigrationHistory: Migration admin.0001_initial is applied before its dependency accounts.0001_initial on database 'default'.
~~~

جدول الـ admin اتعمل وهو بيشاور على [[auth_user]]، ودلوقتي المفروض يشاور على جدول لسه مااتعملش. الحل في مشروع شغال صعب (نقل داتا يدوي)، فاعمله من الأول.

---

## ٣. اليوزر والباسورد

~~~python
User = get_user_model()
sara = User.objects.create_user("sara", "sara@example.com", "Correct-Horse-42", phone="0100")
print(sara.password[:40] + "...")
print(sara.check_password("Correct-Horse-42"), sara.check_password("wrong"))
~~~

- [[get_user_model()]]: هات الـ class اللي في [[AUTH_USER_MODEL]]. استخدمها بدل ما تعمل import لـ User بعينه.
- [[create_user(username, email, password, **extra)]]: بيعمل hash للباسورد ويحفظ.

~~~text الناتج
pbkdf2_sha256$1500000$ac5XlYqz99qPcMDu9n...
True False
~~~

| الحتة | معناها |
|---|---|
| [[pbkdf2_sha256]] | الخوارزمية |
| [[1500000]] | عدد مرات التكرار: كل محاولة تخمين بتاخد وقت، فالـ brute force بطيء |
| [[ac5XlYqz...]] | الـ salt: عشوائي لكل يوزر، فباسوردين زي بعض hash مختلف |
| بعد [[$]] التالت | الـ hash نفسه (اتقص هنا) |

[[check_password]] بيعمل hash للي كتبته بنفس الـ salt ويقارن.

### [[authenticate]]

~~~python
authenticate(username="sara", password="Correct-Horse-42"), authenticate(username="sara", password="nope")
~~~

~~~text الناتج
sara None
~~~

اليوزر لو صح، و [[None]] لو غلط. ونفس الرد سواء اليوزر مش موجود أو الباسورد غلط، فمحدش يعرف مين مسجّل.

---

## ٤. الـ views المحمية

~~~python
@login_required
def me(request):
    return JsonResponse({"username": request.user.username, "phone": request.user.phone})
@permission_required("accounts.view_user", raise_exception=True)
def staff_report(request):
    return JsonResponse({"users": request.user.__class__.objects.count()})
~~~

والـ URLs:

~~~python
path("accounts/", include("django.contrib.auth.urls")),
path("me/", views.me),
path("report/", views.staff_report),
~~~

### الدورة كلها

| الطلب | الناتج | ليه |
|---|---|---|
| [[GET /me/]] من غير دخول | [[302 /accounts/login/?next=/me/]] | [[@login_required]] حوّله للدخول وحفظ هو كان رايح فين |
| [[POST /accounts/login/]] بالباسورد الصح | [[302 /me/]] | الـ view الجاهزة عملت [[authenticate]] و [[login]] وحوّلت لـ [[LOGIN_REDIRECT_URL]] |
| [[GET /me/]] | [[{'username': 'sara', 'phone': '0100'}]] | [[request.user]] بقى sara من الـ session |
| [[GET /report/]] | [[403]] | داخل، بس معندوش [[accounts.view_user]] |

> الـ test client بيتجاهل CSRF افتراضيًا. من المتصفح، فورم الدخول لازم فيه [[{% csrf_token %}]] (الـ template الجاهز فيه).

---

## ٥. Groups والصلاحيات

~~~python
support = Group.objects.create(name="support")
support.permissions.add(Permission.objects.get(codename="view_user"))
sara.groups.add(support)
sara = User.objects.get(pk=sara.pk)
print(sara.has_perm("accounts.view_user"), sara.get_all_permissions())
~~~

~~~text الناتج
True {'accounts.view_user'}
~~~

- [[Group]]: مجموعة صلاحيات باسم. بتدّي اليوزر groups بدل صلاحيات واحدة واحدة.
- [[Permission.objects.get(codename="view_user")]]: صلاحية [[view]] اللي اتعملت لوحدها لـ model اليوزر.
- [[User.objects.get(pk=...)]] تاني: الصلاحيات بتتخزن cache في الـ object، فبعد التعديل هات object جديد.
- [[has_perm("accounts.view_user")]]: [["app_label.codename"]].

ودلوقتي [[GET /report/]] رجّع [[{'users': 1}]].

## ٦. الخروج

[[POST /accounts/logout/]] رجّع [[200]] (صفحة «Logged out» جاهزة لأن مفيش [[LOGOUT_REDIRECT_URL]])، وبعدها [[GET /me/]] رجع [[302]] للدخول تاني. الخروج لازم POST، فاللينك في الموقع يبقى فورم صغير فيه زرار.

---

## ٧. باسورد قوي: [[AUTH_PASSWORD_VALIDATORS]]

startproject بيكتب ٤ validators في الإعدادات. اتجرّبوا من [[manage.py shell]] على الـ User بتاعنا:

~~~python
from django.contrib.auth.password_validation import validate_password
u = User(username="sara", email="sara@example.com")
for pw in ["123", "password123", "sara2026x", "Correct-Horse-42"]:
    try:
        validate_password(pw, u); print(pw, "OK")
    except ValidationError as e:
        print(pw, e.messages)
~~~

~~~text اتشغّل فعلًا · الناتج
123 ['This password is too short. It must contain at least 8 characters.', 'This password is too common.', 'This password is entirely numeric.']
password123 ['This password is too common.']
sara2026x OK
Correct-Horse-42 OK
~~~

| الـ validator | بيرفض |
|---|---|
| [[MinimumLengthValidator]] | أقل من ٨ حروف (ينفع تغيّرها بـ [[OPTIONS: {"min_length": 12}]]) |
| [[CommonPasswordValidator]] | باسورد من لستة فيها حوالي ٢٠ ألف باسورد مشهور، زي [[password123]] |
| [[NumericPasswordValidator]] | باسورد كله أرقام |
| [[UserAttributeSimilarityValidator]] | قريب جدًا من الـ username أو الإيميل. خد بالك: [[sara2026x]] عدّى، لأن الشبه بيتحسب بنسبة (٠.٧) مش «فيه الاسم» |

والفخ: الـ validators دي بتشتغل في **الفورمات** بس ([[UserCreationForm]] و [[SetPasswordForm]] وصفحة تغيير الباسورد) وفي [[createsuperuser]]. [[create_user]] و [[set_password]] مبيفحصوش: [[u.set_password("123"); u.save()]] اتحفظ و [[check_password("123")]] رجّع [[True]]. لو بتعمل تسجيل بـ API أو فورم بتاعك، نادي [[validate_password(password, user)]] بنفسك.

---

## ٨. يوزر ميشوفش حاجة غيره

الصلاحيات ([[view_review]]) بتقول «يقدر يشوف reviews» مش «يقدر يشوف **الـ review ده**». الحماية على مستوى الصف بتبقى في الـ query نفسها:

~~~python
@login_required
def my_review(request, pk):
    review = get_object_or_404(Review, pk=pk, author=request.user)
    return JsonResponse({"id": review.pk, "rating": review.rating})
~~~

~~~text الناتج
sara 200
omar 404
missing 404
~~~

[[author=request.user]] في نفس الـ [[get]]: الـ review لو مش بتاع اللي طالبه بيبقى «مش موجود». و [[404]] أحسن من [[403]] هنا، لأن [[403]] بتقول لعمر «فيه review بالرقم ده» فيقدر يعدّ الـ ids. ونفس الفكرة في DRF اسمها [[get_queryset]] + [[has_object_permission]] (درس «DRF permissions و pagination»).

---

## الخلاصة

| عايز | استخدم |
|---|---|
| User بحقولك | [[class User(AbstractUser)]] + [[AUTH_USER_MODEL]] قبل أول migrate |
| تعمل يوزر | [[create_user]] (مش [[create]]) |
| تجيب الـ class | [[get_user_model()]] |
| صفحات دخول وخروج | [[include("django.contrib.auth.urls")]] |
| view للداخلين بس | [[@login_required]] |
| view بصلاحية | [[@permission_required("app.codename", raise_exception=True)]] |
| صلاحيات لمجموعة | [[Group]] + [[user.groups.add]] |
| باسورد قوي في فورم أو API بتاعك | [[validate_password(pw, user)]] (مش بيتنادى لوحده) |
| الصف ده بتاعه ولا لأ | الشرط في الـ query: [[get_object_or_404(..., author=request.user)]] |`,
          example: R`# accounts/models.py:
from django.contrib.auth.models import AbstractUser
from django.db import models
class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
# config/settings.py (قبل أول migrate):
AUTH_USER_MODEL = "accounts.User"
LOGIN_REDIRECT_URL = "/me/"
# accounts/views.py:
from django.contrib.auth.decorators import login_required, permission_required
from django.http import JsonResponse
@login_required
def me(request):
    return JsonResponse({"username": request.user.username, "phone": request.user.phone})
@permission_required("accounts.view_user", raise_exception=True)
def staff_report(request):
    return JsonResponse({"users": request.user.__class__.objects.count()})
# config/urls.py جوه urlpatterns:
#     path("accounts/", include("django.contrib.auth.urls")),
#     path("me/", views.me),
#     path("report/", views.staff_report),`,
          flag: "script",
          learn: R`تعمل User بتاعك من أول يوم، وتعمل يوزرز بباسوردات متشفّرة، وتحمي views بالدخول وبالصلاحيات وبالـ groups، وتمنع يوزر يشوف حاجة غيره، وتفرض باسوردات قوية.`,
          out: R`صفحات دخول وخروج جاهزة، و [[/me/]] للداخلين بس، وتقرير للفريق بصلاحية، و review مبيفتحش غير لصاحبه.`,
          use: {
            prog: R`[[request.user]] موجود في كل view وكل template، وكل حاجة في المشروع بتتربط بيه: الطلبات والتعليقات والصلاحيات.`,
            work: R`أول سؤال في أي مشروع جديد: «اليوزر هيدخل بإيه وهيبقى فيه إيه؟». لو اتجاوب بـ custom User من الأول، مفيش migration مستحيلة بعد شهر.`,
            net: R`الدخول بيحط cookie اسمها [[sessionid]] و [[csrftoken]]. لما تحط الموقع على https لازم الاتنين يبقوا [[Secure]] (درس «Django في الإنتاج»).`,
          },
          lines: [
            R`[[from django.contrib.auth.models import AbstractUser]]: class فيه كل حقول ومنطق اليوزر العادي ([[username]] و [[password]] و [[email]] و [[is_staff]] و [[groups]] و [[check_password]]...) من غير ما يعمل جدول لوحده.`,
            R`[[from django.db import models]]: عشان الحقول الزيادة اللي هنضيفها زي [[phone]].`,
            R`[[class User(AbstractUser)]]: الـ User بتاعك. بيورث كل حاجة، وجدوله اسمه [[accounts_user]]. حتى لو مش محتاج حقول زيادة النهارده، الـ class ده لازم يبقى موجود من أول migrate.`,
            R`[[phone = models.CharField(max_length=20, blank=True)]]: حقل زيادة. [[CharField]] مش رقم عشان الأصفار في الأول والـ [[+]]. و [[blank=True]] يعني مش إجباري في الفورم والـ admin.`,
            R`[[AUTH_USER_MODEL = "accounts.User"]]: [["app_label.ModelName"]]. من اللحظة دي الـ admin والـ auth والـ sessions و [[get_user_model()]] كلهم بيستخدموا الجدول ده. لازم قبل أول [[migrate]] وإلا [[InconsistentMigrationHistory]].`,
            R`[[LOGIN_REDIRECT_URL = "/me/"]]: بعد الدخول من الصفحة الجاهزة، روح هنا لو مفيش [[?next=]]. الافتراضي [[/accounts/profile/]] اللي غالبًا مش موجودة فهتشوف 404.`,
            R`[[from django.contrib.auth.decorators import login_required, permission_required]]: decorators الحماية للـ function views. للـ classes فيه [[LoginRequiredMixin]] و [[PermissionRequiredMixin]] (درس «views و urls»).`,
            R`[[from django.http import JsonResponse]]: الـ views هنا بترجع JSON عشان نشوف النتيجة بسهولة من الـ test client أو curl.`,
            R`[[@login_required]]: لو [[request.user]] مش داخل، بيرد [[302]] لـ [[LOGIN_URL]] (الافتراضي [[/accounts/login/]]) ومعاه [[?next=/me/]] عشان يرجع هنا بعد الدخول.`,
            R`[[def me(request)]]: view بترجّع بيانات اليوزر الحالي. مبتاخدش id من الـ URL، فمستحيل حد يشوف بيانات حد تاني بتغيير رقم.`,
            R`[[JsonResponse({"username": request.user.username, "phone": request.user.phone})]]: [[request.user]] حطه الـ [[AuthenticationMiddleware]] من الـ session. و [[phone]] موجود لأنه الـ User بتاعنا مش الافتراضي.`,
            R`[[@permission_required("accounts.view_user", raise_exception=True)]]: لازم اليوزر معاه صلاحية [[view_user]] (لوحده أو من group). [[raise_exception=True]] بيرد [[403]]؛ من غيرها كان بيحوّل لصفحة الدخول تاني حتى لو داخل، وده بيلخبط.`,
            R`[[def staff_report(request)]]: تقرير للفريق بس، فيه داتا عن كل اليوزرز.`,
            R`[[request.user.__class__.objects.count()]]: [[__class__]] هو نفس الـ [[User]] model، فده عدد اليوزرز كلهم. في كود حقيقي اكتب [[get_user_model().objects.count()]] أوضح.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** في مشروع جديد، اعمل [[accounts.User]] بحقل [[phone]] و [[AUTH_USER_MODEL]] **قبل** أي [[migrate]]، واعمل superuser، واتأكد إن الـ admin بيعرض حقل phone… من غير ما تبص على الدرس.`, done: R`[[python manage.py shell -c "from django.contrib.auth import get_user_model; print(get_user_model()._meta.db_table)"]] بيطبع [[accounts_user]]، و [[showmigrations accounts]] فيه [[[X] 0001_initial]] قبل [[admin.0001_initial]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب الناتج قبل ما تشغّل: [[u = User.objects.create(username="x", password="123")]] وبعدين [[u.check_password("123")]]، وبعدين [[u.set_password("123"); u.save(); u.check_password("123")]]، وبعدين [[validate_password("123", u)]].`, done: R`[[False]] وبعدين [[True]] وبعدين [[ValidationError]] فيها ٣ رسايل (قصيرة، ومشهورة، وأرقام بس)، وكاتب إن [[set_password]] نفسه مبيفحصش قوة الباسورد.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** view [[review_detail(request, pk)]] فيها [[@login_required]] و [[Review.objects.get(pk=pk)]]. عمر داخل وغيّر الرقم في الـ URL وشاف review سارة. صلّحها ووضّح ليه [[404]] أحسن من [[403]] هنا.`, done: R`بعد التصليح ([[get_object_or_404(Review, pk=pk, author=request.user)]]) سارة بتاخد [[200]] وعمر [[404]] ورقم مش موجود [[404]]، وكاتب إن [[403]] كانت هتقوله «الـ review ده موجود بس مش بتاعك».` },
            { lvl: 'تطبيق', t: R`**ابني:** group اسمها [[support]] فيها [[view_user]] و [[change_user]]، ويوزر فيها، وصفحة [[/report/]] بترجع 403 لأي حد تاني. اعملها كلها في data migration عشان أي بيئة جديدة يبقى فيها الـ group.`, done: R`على قاعدة جديدة بعد [[migrate]]: [[Group.objects.get(name="support").permissions.count()]] = [[2]]، ويوزر في الـ group بياخد [[200]] من [[/report/]] ويوزر عادي [[403]]، و [[migrate]] مرتين مبيعملش group مكررة.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبارات لدورة الدخول كلها بالـ test client: [[/me/]] من غير دخول بيحوّل ومعاه [[next]]، والدخول بباسورد غلط بيرجّع الفورم بخطأ، والدخول الصح بيوصل [[/me/]]، و session فيها [[cart]] قبل الدخول بياخد مفتاح جديد بعده (ضد session fixation)، والخروج بـ GET بيرجع [[405]] وبـ POST بيخرّج.`, done: R`٥ اختبارات بتعدّي، واختبار الـ session بيعمل [[s = client.session; s["cart"] = [1]; s.save()]] وبيقارن [[client.cookies["sessionid"].value]] قبل وبعد: مختلفين، والـ [[cart]] لسه [[[1]]]. واختبار الخروج بيتأكد إن [[/me/]] رجعت [[302]] بعده.` },
          ],
          try: R`في مشروع جديد: اعمل [[accounts.User]] قبل أي migrate، واعمل يوزر بـ [[create_user]] من [[manage.py shell]] واطبع [[user.password]]. وبعدين اعمل يوزر تاني بـ [[User.objects.create(username="x", password="123")]] وجرّب [[check_password("123")]]. وافتح [[/me/]] من المتصفح من غير دخول وشوف التحويل (محتاج template [[registration/login.html]]، أو سطّب الـ admin وادخل منه).`,
          sol: R`[[create_user]] بيخزّن [[pbkdf2_sha256$1500000$...]]. أما [[User.objects.create(..., password="123")]] بيخزّن [[123]] زي ما هو، و [[check_password("123")]] بيرجّع [[False]]، لأن Django بيتوقع hash ومش لاقيه، فاليوزر ده مش هيقدر يدخل أبدًا. صلّحه بـ [[user.set_password("123"); user.save()]].

[[/me/]] من غير دخول بيحوّلك لـ [[/accounts/login/?next=/me/]]. والـ view الجاهزة بتدوّر على template اسمه [[registration/login.html]]: لو مش موجود هتشوف [[TemplateDoesNotExist]]. اعمله في [[templates/registration/login.html]] فيه [[<form method="post">{% csrf_token %}{{ form }}<button>Login</button></form>]]. أو ادخل من [[/admin/login/]] بيوزر [[is_staff]]: نفس الـ session، فـ [[/me/]] هيشتغل بعدها.`
        },
        {
          cmd: "Django forms و CSRF",
          title: "ModelForm و is_valid و clean، و csrf_token، و redirect بعد POST",
          learn: R`تعمل فورم من الـ model بـ [[ModelForm]]، وتفحص المدخلات بـ [[is_valid()]] و [[clean_<field>]] و [[clean()]]، وتعرض الأخطاء جنب كل خانة، وتحمي الفورم من CSRF، وتحوّل بعد الحفظ عشان الـ refresh ميبعتش تاني.`,
          out: R`صفحة «منتج جديد» للداخلين بس، بترفض الاسم المكرر والسعر الغلط برسالة واضحة، ومش بتقبل POST من موقع تاني.`,
          use: {
            prog: R`الفورم هو نفس فكرة الـ serializer في DRF (الوحدة الجاية) والـ Pydantic model في FastAPI: بيحوّل نص جاي من بره لقيم Python ويرفض الغلط برسالة لكل حقل.`,
            work: R`فورم تواصل، وتسجيل، وتعديل بروفايل، وإضافة منتج للفريق: كلهم [[Form]] أو [[ModelForm]] و view بنفس الشكل.`,
            net: R`CSRF هجمة بتستغل إن المتصفح بيبعت الـ cookies لوحده: موقع تاني يعمل فورم بيبعت POST لموقعك واليوزر داخل. الـ token المخفي في الفورم هو اللي الموقع التاني ميقدرش يعرفه.`,
          },
          desc: R`الفورم في Django class بيوصف الخانات وقواعدها. [[ModelForm]] بيبني الخانات من الـ model نفسه (النوع والطول والـ choices والعلاقات)، وانت بتكتب [[fields]] بس. في الـ view: [[form = ProductForm(request.POST)]] وبعدين [[form.is_valid()]]: لو صح القيم النضيفة في [[form.cleaned_data]] و [[form.save()]] بيعمل الصف، ولو غلط [[form.errors]] فيها رسالة تحت كل حقل والـ template بيعرضها.

وأي فورم POST لازم فيه [[{% csrf_token %}]]: خانة مخفية فيها token، و [[CsrfViewMiddleware]] بيرفض أي POST من غيرها بـ [[403]] وصفحة «CSRF verification failed». وبعد الحفظ الناجح **redirect** (نمط Post/Redirect/Get)، عشان لو اليوزر عمل refresh ميبعتش الفورم تاني.`,
          deep: {
            why: R`أي حاجة جاية من اليوزر نص ممكن يبقى أي حاجة: سعر [[abc]]، أو مخزون سالب، أو اسم مكرر، أو HTML. الفورم بيجمع الفحص كله في مكان واحد، وبيرجّع للصفحة نفس اللي اليوزر كتبه ومعاه الأخطاء، فمش بيكتب كل حاجة من الأول. والـ CSRF من غير حماية معناه إن أي صفحة على النت تقدر تخلي متصفح اليوزر يضيف منتجات أو يغيّر إيميله.`,
            how: R`[[is_valid()]] بيعمل ٣ مراحل: كل حقل بيحوّل النص لنوعه ويفحص قواعده ([[to_python]] و [[validate]] و validators زي [[min_value]])، وبعدين [[clean_<اسم الحقل>()]] لو موجودة (القيمة في [[self.cleaned_data[...] ]] وترجّع القيمة النهائية)، وبعدين [[clean()]] للفحص بين حقول (الأخطاء بتاعتها بتتحط تحت [[__all__]] وبتتعرض بـ [[form.non_field_errors]]). وفي [[ModelForm]] فيه مرحلة رابعة: [[full_clean()]] بتاع الـ model (الـ [[unique]] والـ constraints).

الـ CSRF: أول GET بيحط cookie [[csrftoken]] (٣٢ حرف)، و [[{% csrf_token %}]] بيكتب خانة [[csrfmiddlewaretoken]] فيها نسخة متشفّرة من نفس السر (٦٤ حرف، بتتغير كل مرة عشان هجمات زي BREACH). الـ middleware بيقارن الاتنين في كل POST و PUT و PATCH و DELETE. ولـ JavaScript، ابعت الـ token في header [[X-CSRFToken]] من الـ cookie. وعلى https بيفحص كمان الـ [[Origin]] أو [[Referer]] مقابل [[CSRF_TRUSTED_ORIGINS]].

[[redirect("shop:product-detail", pk=...)]] بيرجّع [[302]] بـ [[Location]] مبني من اسم الـ URL. و [[messages.success]] بتحط رسالة في الـ session تظهر في الصفحة الجاية بس.`,
            when: R`أي صفحة HTML فيها إدخال من اليوزر. [[ModelForm]] لما الفورم بيحفظ model، و [[forms.Form]] عادي لما مش بيحفظ (بحث، فورم تواصل بيبعت إيميل). وللـ API (JSON) استخدم DRF serializers بدل الفورمات. و [[@csrf_exempt]] بس لـ endpoint بيستقبل من سيرفر تاني بتوقيع (webhook)، مش لفورم في موقعك.`,
            mistakes: R`تنسى [[{% csrf_token %}]] فكل POST يرجع [[403]]، فتحط [[@csrf_exempt]] «عشان يشتغل» وتفتح ثغرة. وتعمل [[render]] بعد الحفظ الناجح بدل [[redirect]]، فالـ refresh بيعمل منتج تاني. وتقرا [[request.POST["price_cents"]]] مباشرة (string، ومن غير فحص) بدل [[form.cleaned_data]]. و [[fields = "__all__"]] في [[ModelForm]] فحقل زي [[is_staff]] يتكتب من الفورم. وتفحص التكرار في [[clean_name]] من غير ما تستثني الصف نفسه وقت التعديل ([[exclude(pk=self.instance.pk)]]). وتنسى [[GET]] يرجّع فورم فاضي، فالـ view بترجّع [[None]] و Django يرمي [[ValueError]].`,
          },
          teach: R`## المثال بيعمل إيه؟

فورم «منتج جديد» من الـ [[Product]] model، بيرفض الاسم المكرر (من غير ما يفرق capital) وبيرفض منتج له مخزون وسعره أقل من جنيه، و view للداخلين بس بتحفظ وتحوّل، و template فيه الـ CSRF token. اتشغّل بـ Django 6.1.2 على SQLite في Python 3.14 على ويندوز، والطلبات بـ [[django.test.Client(enforce_csrf_checks=True)]] عشان الـ CSRF يتفحص زي المتصفح بالظبط.

> لو بتشغّل [[Client]] من سكربت أو [[manage.py shell]] (مش من [[manage.py test]])، نادي [[setup_test_environment()]] الأول. من غيرها كل طلب رجع [[DisallowedHost: Invalid HTTP_HOST header: 'testserver']]، لأن [[testserver]] بيتضاف لـ [[ALLOWED_HOSTS]] لوحده وقت الاختبارات بس.

---

## ١. الفورم

~~~python
class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["category", "name", "price_cents", "stock"]
~~~

[[ModelForm]] عمل ٤ خانات: [[category]] بقت [[<select>]] فيها الأقسام، و [[name]] نص بـ [[maxlength="200"]]، والرقمين [[<input type="number">]] بـ [[min="0"]] لأنهم [[PositiveIntegerField]]. أول اختيار في الـ select طلع [[- Select an option -]] (Django 6).

## ٢. الفحص بتاعك

~~~python
    def clean_name(self):
        name = self.cleaned_data["name"].strip()
        if Product.objects.filter(name__iexact=name).exists():
            raise forms.ValidationError("A product with this name already exists.")
        return name
    def clean(self):
        data = super().clean()
        if data.get("stock", 0) > 0 and data.get("price_cents", 0) < 100:
            raise forms.ValidationError("A product in stock needs a price of at least 100 cents.")
        return data
~~~

| الدالة | بتتنادى إمتى | الخطأ بيروح فين |
|---|---|---|
| [[clean_name]] | بعد ما [[name]] عدّى فحصه العادي (مش فاضي، ٢٠٠ حرف) | تحت خانة [[name]] |
| [[clean]] | بعد كل الحقول، للقواعد اللي فيها أكتر من حقل | [[__all__]]: فوق الفورم بـ [[non_field_errors]] |

وفي [[clean]] بنستخدم [[data.get(...)]] مش [[data[...] ]]، لأن لو حقل فشل في فحصه مش هيبقى في [[cleaned_data]] أصلًا.

~~~python
ProductForm({"category": cables.pk, "name": " hdmi 2M ", "price_cents": "50", "stock": "3"}).errors.as_json()
~~~

~~~text الناتج
False
{"name": [{"message": "A product with this name already exists.", "code": ""}], "__all__": [{"message": "A product in stock needs a price of at least 100 cents.", "code": ""}]}
~~~

[[" hdmi 2M "]] اتلاقى مكرر رغم المسافات والحروف، و [[clean]] مسك السعر. وقيم غلط من الأساس:

~~~text الناتج
False {'price_cents': ['Enter a whole number.'], 'stock': ['Ensure this value is greater than or equal to 0.']}
True DP cable 25000 int
~~~

التاني صح: [[cleaned_data["price_cents"]]] بقى [[25000]] من نوع [[int]]، مش الـ string [["25000"]] اللي جه من الفورم.

---

## ٣. الـ view: Post/Redirect/Get

~~~python
@login_required
def product_create(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            product = form.save()
            messages.success(request, f"Saved {product.name}")
            return redirect("shop:product-detail", pk=product.pk)
    else:
        form = ProductForm()
    return render(request, "shop/product_form.html", {"form": form})
~~~

- GET: فورم فاضي.
- POST صح: احفظ، ورسالة، و **redirect** ([[302]]). المتصفح بيعمل GET للصفحة الجديدة، فالـ refresh بعدها مبيبعتش الفورم تاني.
- POST غلط: نفس الـ [[render]] بالفورم اللي فيه الأخطاء والقيم اللي اليوزر كتبها، و status [[200]].

والـ template:

~~~text shop/templates/shop/product_form.html
<form method="post">
  {% csrf_token %}
  {{ form.as_div }}
  <button type="submit">Save</button>
</form>
~~~

[[{{ form.as_div }}]] بيكتب كل خانة في [[<div>]] ومعاها الـ label والأخطاء. ولو عايز تتحكم في الشكل، لف على [[{% for field in form %}]] واكتب [[{{ field.label_tag }}]] و [[{{ field }}]] و [[{{ field.errors }}]].

---

## ٤. CSRF بالأرقام

~~~text اتشغّل فعلًا · الناتج
403 b'Forbidden <span>(403)</span>' b'CSRF cookie not set.'
200 True
<input type="hidden" name="csrfmiddlewaretoken" value="Seg1y...
64 32
302 /shop/17/
200 True
header 302
~~~

| الطلب | النتيجة |
|---|---|
| POST على طول من غير ما يفتح الصفحة | [[403]]، وفي الصفحة [[Reason given for failure: CSRF cookie not set.]]، وفي اللوج [[Forbidden (CSRF cookie not set.): /shop/new/]] |
| GET للفورم | [[200]]، والرد فيه cookie [[csrftoken]] |
| الخانة المخفية | [[csrfmiddlewaretoken]] طولها [[64]]، والـ cookie [[32]]: نفس السر بس متغطّي بقناع بيتغير كل صفحة |
| POST بالـ token وداتا صح | [[302]] لـ [[/shop/17/]] |
| POST بالـ token واسم مكرر ([["dp CABLE"]]) | [[200]] والصفحة فيها [[already exists]] |
| POST من غير خانة، والـ token في header [[X-CSRFToken]] | [[302]]: ده اللي بتعمله في [[fetch]] من JavaScript |

> [[django.test.Client()]] العادي بيعدّي الـ CSRF من غير token (عشان الاختبارات أسهل). عشان تختبر الحماية نفسها لازم [[enforce_csrf_checks=True]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| فورم من model | [[class F(forms.ModelForm)]] و [[Meta.fields]] قايمة صريحة |
| فحص حقل | [[clean_<field>()]] ترجّع القيمة أو ترمي [[ValidationError]] |
| فحص بين حقول | [[clean()]] و [[data.get(...)]] |
| القيم النضيفة | [[form.cleaned_data]]، مش [[request.POST]] |
| بعد الحفظ | [[redirect(...)]]، مش [[render]] |
| حماية الفورم | [[{% csrf_token %}]] جوه كل [[<form method="post">]] |
| من JavaScript | header [[X-CSRFToken]] من cookie [[csrftoken]] |`,
          example: R`# shop/forms.py:
from django import forms
from .models import Product
class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["category", "name", "price_cents", "stock"]
    def clean_name(self):
        name = self.cleaned_data["name"].strip()
        if Product.objects.filter(name__iexact=name).exists():
            raise forms.ValidationError("A product with this name already exists.")
        return name
# shop/views.py:
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .forms import ProductForm
@login_required
def product_create(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            product = form.save()
            messages.success(request, f"Saved {product.name}")
            return redirect("shop:product-detail", pk=product.pk)
    else:
        form = ProductForm()
    return render(request, "shop/product_form.html", {"form": form})`,
          flag: "script",
          lines: [
            R`[[from django import forms]]: فيه [[Form]] و [[ModelForm]] وكل أنواع الخانات ([[CharField]] و [[IntegerField]]...) و [[ValidationError]].`,
            R`[[from .models import Product]]: الـ model اللي الفورم هيتبني منه، وكمان هنستخدمه في فحص التكرار.`,
            R`[[class ProductForm(forms.ModelForm)]]: فورم بيقرا خاناته من model. لو مش هيحفظ model (بحث، تواصل) استخدم [[forms.Form]] وتعرّف الخانات بإيدك.`,
            R`[[class Meta]]: إعدادات الفورم: أنهي model، وأنهي حقول، وممكن [[widgets]] و [[labels]] و [[help_texts]].`,
            R`[[model = Product]]: الحقول وقواعدها جاية من هنا: [[max_length]] و [[PositiveIntegerField]] (يعني [[min_value=0]]) والـ [[ForeignKey]] (يعني select فيه الأقسام).`,
            R`[[fields = ["category", "name", "price_cents", "stock"]]]: الخانات اللي اليوزر يقدر يبعتها، بالاسم. أي حقل مش هنا ([[is_active]] و [[created_at]]) مستحيل يتغير من الفورم حتى لو حد بعته في الـ POST.`,
            R`[[def clean_name(self)]]: Django بيناديها لوحده بعد الفحص العادي لخانة [[name]] بس، عشان الاسم [[clean_]] + اسم الحقل.`,
            R`[[self.cleaned_data["name"].strip()]]: القيمة بعد الفحص العادي (string). [[strip()]] بيشيل المسافات من الأول والآخر، فـ [[" HDMI 2m "]] و [[HDMI 2m]] واحد.`,
            R`[[Product.objects.filter(name__iexact=name).exists()]]: فيه منتج بنفس الاسم من غير ما نفرق capital و small؟ [[exists()]] بيعمل [[SELECT 1 ... LIMIT 1]]. وفي فورم تعديل لازم [[.exclude(pk=self.instance.pk)]] وإلا المنتج هيتلاقي مكرر مع نفسه.`,
            R`[[raise forms.ValidationError("...")]]: الرسالة بتتحط تحت خانة [[name]] في [[form.errors]]، و [[is_valid()]] بيرجّع [[False]].`,
            R`[[return name]]: القيمة اللي بترجعها هي اللي بتتحط في [[cleaned_data["name"]]] وبتتحفظ. لو نسيت الـ [[return]] الاسم هيتحفظ [[None]] ويقع.`,
            R`[[from django.contrib import messages]]: رسايل بتتحط في الـ session وبتظهر في أول صفحة بعدها ([[{% for m in messages %}]] في الـ template) وبعدين تختفي.`,
            R`[[from django.contrib.auth.decorators import login_required]]: الصفحة للداخلين بس، والزائر بيتحوّل لصفحة الدخول ومعاه [[?next=]].`,
            R`[[from django.shortcuts import redirect, render]]: [[redirect]] بيرجّع [[302]] لاسم URL أو object أو مسار، و [[render]] بيملى template.`,
            R`[[from .forms import ProductForm]]: الفورم من [[shop/forms.py]]. فصله في ملف لوحده بيخلي الـ view قصيرة وبيخليه يتستخدم في أكتر من view.`,
            R`[[@login_required]]: من غيرها أي زائر يضيف منتجات. والـ CSRF مش بديل عن الدخول: الـ token بيحمي الداخلين من مواقع تانية، مش الموقع من الزوار.`,
            R`[[def product_create(request)]]: view واحدة للـ GET والـ POST، وده الشكل المعتاد لصفحة فورم في Django.`,
            R`[[if request.method == "POST"]]: اليوزر داس Save. الـ CSRF middleware كان فحص الـ token قبل ما نوصل هنا، فلو كان ناقص مكناش هنوصل أصلًا.`,
            R`[[form = ProductForm(request.POST)]]: فورم «مربوط» (bound) بالداتا اللي جت. لسه مفيش فحص لحد ما تسأله.`,
            R`[[if form.is_valid()]]: هنا الفحص بيحصل كله: الأنواع، وقواعد الـ model، و [[clean_name]]. بيرجّع [[True]] أو [[False]] ويملى [[errors]] و [[cleaned_data]].`,
            R`[[product = form.save()]]: [[ModelForm]] بيعمل [[Product]] من [[cleaned_data]] ويحفظه ويرجّعه. ولو عايز تزوّد حاجة قبل الحفظ (زي صاحب المنتج): [[form.save(commit=False)]] وبعدين [[.save()]] بإيدك.`,
            R`[[messages.success(request, f"Saved {product.name}")]]: رسالة نجاح هتظهر في الصفحة اللي هنتحوّل لها.`,
            R`[[return redirect("shop:product-detail", pk=product.pk)]]: [[302]] لصفحة المنتج الجديد (اتقاس: [[/shop/17/]]). من غير الـ redirect، الـ refresh كان هيسأل «إعادة إرسال؟» ويعمل منتج تاني.`,
            R`[[else:]] يعني GET (أول مرة اليوزر يفتح الصفحة).`,
            R`[[form = ProductForm()]]: فورم فاضي «مش مربوط»، مفيهوش أخطاء ولا قيم.`,
            R`[[return render(request, "shop/product_form.html", {"form": form})]]: السطر ده بيتنفّذ في حالتين: GET (فورم فاضي)، و POST غلط (فورم فيه الأخطاء والقيم اللي اتكتبت). عشان كده بره الـ [[if]] و الـ [[else]].`,
          ],
          try: R`اعمل [[forms.py]] والـ view والـ template، وضيف [[path("new/", views.product_create, name="product-create")]]. افتح [[/shop/new/]] وانت داخل، وابعت اسم منتج موجود بحروف مختلفة، وبعدين سعر [[abc]]، وبعدين داتا صح واعمل refresh بعد الحفظ. وأخيرًا شيل [[{% csrf_token %}]] من الـ template وابعت تاني.`,
          solCode: R`from django.test import Client
from django.test.utils import setup_test_environment
setup_test_environment()
c = Client(enforce_csrf_checks=True)
c.login(username="sara", password="Correct-Horse-42")
r = c.post("/shop/new/", {"name": "X", "price_cents": "100", "stock": "0"})
print(r.status_code)`,
          sol: R`الاسم المكرر: الصفحة رجعت [[200]] وتحت خانة الاسم [[A product with this name already exists.]]، و [[abc]] طلّعت [[Enter a whole number.]] وباقي الخانات فاضلة بالقيم اللي كتبتها. والداتا الصح: [[302]] لصفحة المنتج، والـ refresh هناك بيعيد GET بس ومفيش منتج تاني.

ومن غير [[{% csrf_token %}]]: [[403]] وصفحة [[CSRF verification failed. Request aborted.]]. والكود اللي فوق بيوري نفس الحاجة من غير متصفح: [[enforce_csrf_checks=True]] و POST من غير token طبع [[403]]. ولو شلت [[enforce_csrf_checks=True]] نفس الطلب كان هيوصل للفورم ويرجّع [[200]] بخطأ إن [[category]] ناقصة.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب [[ContactForm(forms.Form)]] فيه [[email]] و [[message]] (أقل حاجة ١٠ حروف)، وجرّبه في الـ shell بداتا صح وداتا غلط واطبع [[errors]].`, done: R`[[ContactForm({"email": "x", "message": "hi"}).errors]] فيها [[Enter a valid email address.]] ورسالة عن الطول، وبداتا صح [[is_valid()]] بـ [[True]] و [[cleaned_data["email"]]] هو الإيميل.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب [[status_code]] لكل طلب قبل ما تشغّل، بـ [[Client(enforce_csrf_checks=True)]] وسارة داخلة: POST على [[/shop/new/]] على طول، و GET، و POST بالـ token وداتا صح، و POST بالـ token واسم مكرر، و POST من غير خانة بس الـ token في [[X-CSRFToken]].`, done: R`[[403]] و [[200]] و [[302]] و [[200]] و [[302]] زي ورقتك، وطلع منها إن الفورم الغلط بيرجّع [[200]] مش [[400]] (صفحة HTML فيها الأخطاء).` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** view تعديل منتج بتستخدم نفس [[ProductForm]] بـ [[instance=product]]، وأي Save من غير ما تغيّر الاسم بيطلع «already exists». وبعد الحفظ بترجّع [[render]] لنفس الصفحة. لاقي الباجين وصلّحهم.`, done: R`[[clean_name]] بقى فيه [[.exclude(pk=self.instance.pk)]] فالحفظ من غير تغيير بيعدّي، وتغيير الاسم لاسم منتج تاني لسه بيترفض، والحفظ الناجح بيرجّع [[302]] والـ refresh مبيعيدش الـ POST.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبارات للفورم لوحده (من غير view) بـ [[@pytest.mark.parametrize]]: سعر [[abc]] و [[-1]] و [[50]] مع مخزون و [[50]] من غير مخزون، واسم مكرر بمسافات.`, done: R`٥ حالات بتعدّي، وحالة [[50]] من غير مخزون [[is_valid()]] بـ [[True]] (القاعدة على المخزون بس)، وحالة السعر مع مخزون الخطأ في [[form.non_field_errors()]] مش تحت خانة.` },
            { lvl: 'تحدي', t: R`**ابني:** صفحة «اكتب review» على صفحة المنتج: [[ReviewForm]] فيه [[rating]] من ١ لـ ٥ و [[body]]، والـ [[author]] و [[product]] بيتحطوا في الـ view بـ [[save(commit=False)]] مش من الفورم، و review واحد لكل يوزر على المنتج برسالة واضحة، وزرار بيبعت بـ [[fetch]] و [[X-CSRFToken]] من غير reload.`, done: R`الـ review بيتحفظ بصاحبه الصح حتى لو حد زوّد [[author]] في الـ POST، والتاني من نفس اليوزر بيرجّع رسالة «انت كتبت review قبل كده» مش [[IntegrityError]]، والـ [[fetch]] من غير header بيرجّع [[403]] ومعاه بيرجّع نجاح.` },
          ],
        },
      ]
    }
]);
