// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Django: admin و views و auth",
      l: 2,
      n: "لوحة تحكم جاهزة من الـ models، و views بترد HTML أو JSON على URLs ليها أسامي، ونظام يوزرز وصلاحيات جاهز",
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

~~~text الناتج
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

## الخلاصة

| عايز | اكتب |
|---|---|
| تسجّل model | [[@admin.register(Model)]] |
| أعمدة | [[list_display]] (حقول أو دوال) |
| بحث وفلاتر | [[search_fields]] و [[list_filter]] |
| تمنع N+1 | [[list_select_related]] و [[get_queryset]] + [[annotate]] |
| أمر على صفوف كتير | [[actions]] + [[@admin.action]] |
| أول يوزر | [[createsuperuser]] |

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
          lines: [
            "الـ admin.",
            "[[Count]] للعدّ في القاعدة.",
            "الـ models من نفس الـ app.",
            "سجّل الإعدادات دي لـ [[Category]].",
            "إعدادات صفحة الأقسام.",
            "عمودين: الاسم وعدد المنتجات.",
            "بحث بالاسم (ومطلوب لـ autocomplete).",
            "عدّل الـ query الأساسي...",
            "...وضيف عدد المنتجات لكل قسم في نفس الـ query.",
            "عنوان العمود، ويترتب بـ [[n]].",
            "دالة العمود.",
            "العدد اللي اتحسب.",
            "سجّل الإعدادات دي لـ [[Product]].",
            "إعدادات صفحة المنتجات.",
            "الأعمدة.",
            "الفلاتر.",
            "البحث في اسم المنتج واسم القسم.",
            "تعديل المخزون والحالة من الجدول.",
            "JOIN مع القسم: query واحدة للصفحة.",
            "اختيار القسم بالبحث.",
            "أمر على الصفوف المختارة.",
            "عنوان العمود، ويترتب باسم القسم.",
            "دالة العمود.",
            "اسم القسم (من غير N+1 بفضل [[list_select_related]]).",
            "عنوان الأمر في القايمة، ويظهر بس لصاحب صلاحية change.",
            "الأمر نفسه.",
            "[[UPDATE]] واحد للمختارين.",
            "رسالة فوق الصفحة."
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

## الخلاصة

| الحتة | دورها |
|---|---|
| [[path("<int:pk>/", view, name=...)]] | URL → دالة، ورقم بس |
| [[include("app.urls")]] و [[app_name]] | توزيع على الـ apps وأسامي من غير تصادم |
| [[get_object_or_404]] | 404 بدل 500 |
| [[JsonResponse]] / [[render]] | JSON / HTML |
| [[ListView]] + [[paginate_by]] | list بصفحات من غير كود |
| [[reverse]] / [[{% url %}]] | URLs من أساميها |`,
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
          lines: [
            "رد JSON.",
            "اختصارات: 404 تلقائي، و HTML من template.",
            "decorator بيرفض غير GET.",
            "class جاهزة للـ lists.",
            "الـ model.",
            "GET بس، وغيره 405.",
            "view بتاخد الطلب و [[pk]] من الـ URL.",
            "المنتج الظاهر بالـ id ده ومعاه قسمه، أو 404.",
            "رجّع JSON.",
            "صفحة HTML.",
            "المنتجات الظاهرة ومعاها أقسامها.",
            "كلمة البحث من [[?q=]].",
            "لو فيه بحث...",
            "...فلتر بالاسم من غير ما يهم الـ capital.",
            "املى الـ template بأول ٢٠ منتج وكلمة البحث.",
            "view كـ class.",
            "المنتجات الرخيصة.",
            "نفس الـ template.",
            "اسم الـ list جوه الـ template.",
            "صفحات من ٢.",
            "[[path]] لربط المسار بالدالة.",
            "الـ views بتاعة نفس الـ app.",
            "namespace: الأسامي بتبقى [[shop:...]].",
            "جدول المسارات.",
            "[[/shop/]] → البحث والـ list.",
            "[[/shop/7/]] → JSON المنتج. [[int]] يعني رقم بس.",
            "[[/shop/cheap/]] → الـ ListView. [[as_view()]] بتحوّلها دالة.",
            "قفل الـ list."
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

## الخلاصة

| عايز | استخدم |
|---|---|
| User بحقولك | [[class User(AbstractUser)]] + [[AUTH_USER_MODEL]] قبل أول migrate |
| تعمل يوزر | [[create_user]] (مش [[create]]) |
| تجيب الـ class | [[get_user_model()]] |
| صفحات دخول وخروج | [[include("django.contrib.auth.urls")]] |
| view للداخلين بس | [[@login_required]] |
| view بصلاحية | [[@permission_required("app.codename", raise_exception=True)]] |
| صلاحيات لمجموعة | [[Group]] + [[user.groups.add]] |`,
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
          lines: [
            "الأب اللي فيه كل حقول اليوزر.",
            "الحقول.",
            "الـ User بتاعك. جدوله [[accounts_user]].",
            "حقل زيادة، مش إجباري في الفورم.",
            "قول لـ Django يستخدم الـ User ده في كل حتة.",
            "بعد الدخول روح [[/me/]].",
            "decorators الحماية.",
            "رد JSON.",
            "لو مش داخل: تحويل لصفحة الدخول ومعاه [[?next=]].",
            "view بتاعة اليوزر الحالي.",
            "[[request.user]] جاي من الـ session.",
            "لازم صلاحية [[view_user]]، وإلا 403.",
            "تقرير للفريق.",
            "عدد اليوزرز."
          ],
          try: R`في مشروع جديد: اعمل [[accounts.User]] قبل أي migrate، واعمل يوزر بـ [[create_user]] من [[manage.py shell]] واطبع [[user.password]]. وبعدين اعمل يوزر تاني بـ [[User.objects.create(username="x", password="123")]] وجرّب [[check_password("123")]]. وافتح [[/me/]] من المتصفح من غير دخول وشوف التحويل (محتاج template [[registration/login.html]]، أو سطّب الـ admin وادخل منه).`,
          sol: R`[[create_user]] بيخزّن [[pbkdf2_sha256$1500000$...]]. أما [[User.objects.create(..., password="123")]] بيخزّن [[123]] زي ما هو، و [[check_password("123")]] بيرجّع [[False]]، لأن Django بيتوقع hash ومش لاقيه، فاليوزر ده مش هيقدر يدخل أبدًا. صلّحه بـ [[user.set_password("123"); user.save()]].

[[/me/]] من غير دخول بيحوّلك لـ [[/accounts/login/?next=/me/]]. والـ view الجاهزة بتدوّر على template اسمه [[registration/login.html]]: لو مش موجود هتشوف [[TemplateDoesNotExist]]. اعمله في [[templates/registration/login.html]] فيه [[<form method="post">{% csrf_token %}{{ form }}<button>Login</button></form>]]. أو ادخل من [[/admin/login/]] بيوزر [[is_staff]]: نفس الـ session، فـ [[/me/]] هيشتغل بعدها.`
        },
      ]
    }
]);
