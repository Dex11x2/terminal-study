// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Django REST Framework والاختبار والإنتاج",
      l: 3,
      time: R`حوالي ٩ ساعات (٥ دروس، وكل درس فيه تمارين)`,
      goal: [
        R`تعمل API كامل بـ DRF: serializers بتفحص، و viewsets و router، وبحث وترتيب، من غير N+1.`,
        R`تحمي الـ API: مين داخل، ومسموحله بإيه، وعلى أنهي صف، وكام طلب في الدقيقة، وتقسّم الردود صفحات.`,
        R`توثّق الـ API لوحده بـ OpenAPI وصفحة Swagger، والـ CI يفشل لو التوثيق ناقص.`,
        R`تثبّت كل ده باختبارات pytest سريعة: الصلاحيات والفحص وعدد الـ queries والإيميلات.`,
        R`تنشر على سيرفر حقيقي: [[check --deploy]] والـ static و gunicorn ورا proxy واللوج، من غير فخاخ [[DEBUG = False]].`,
      ],
      use: {
        prog: R`ده الـ backend اللي React أو Vue أو تطبيق موبايل بيكلّمه. والأفكار (serializer، permission، pagination، throttling، OpenAPI) هي نفسها في FastAPI و Express و Spring بأسامي تانية.`,
        work: R`أغلب وظايف «Django developer» دلوقتي هي DRF: endpoints واختبارات وديبلوي. والوحدة دي هي الشغل اليومي ده من أوله لآخره.`,
        net: R`HTTP كامل: status codes و [[Retry-After]] و [[WWW-Authenticate]]، و HTTPS ورا reverse proxy و [[X-Forwarded-Proto]]، و HSTS و [[Cache-Control]].`,
        cs: R`الـ cursor pagination مقابل [[OFFSET]] (O(1) مقابل O(n))، والـ rate limiting بعدّاد في cache، ونموذج pre-fork في gunicorn، والـ content hashing للـ cache.`,
      },
      lab: R`cd ~/lab/django && . .venv/bin/activate && pip install djangorestframework pytest-django drf-spectacular whitenoise gunicorn`,
      projects: [
        { lvl: 'صغير', t: R`API للمدونة`, what: R`[[PostSerializer]] و [[PostViewSet]] قراية للكل وكتابة للـ staff، والمسودات مش بتظهر غير للـ staff ([[get_queryset]])، وبحث في العنوان، وصفحات من ١٠. من دروس serializers و permissions.`, done: R`زائر بيشوف المنشور بس و [[POST]] بيرجّعله [[403]]، و staff بيشوف المسودات ويكتب، و [[?search=django]] شغال، والـ list بـ ٢ queries.` },
        { lvl: 'صغير', t: R`docs و CI للـ API`, what: R`ضيف drf-spectacular للمشروع، و workflow في GitHub Actions بيشغّل [[pytest]] و [[spectacular --fail-on-warn]] و [[makemigrations --check]] و [[check --deploy]] بإعدادات الإنتاج. من دروس OpenAPI و pytest و الإنتاج.`, done: R`الـ workflow أخضر على [[main]]، ولما تضيف [[@api_view]] من غير [[extend_schema]] أو تنسى migration أو تكسر اختبار، الـ job بيفشل في الخطوة الصح.` },
        { lvl: 'متوسط', t: R`API لمكتبة بالحسابات والصلاحيات`, what: R`على مكتبة الوحدات اللي فاتت: [[/api/books/]] للكل، و [[/api/loans/]] لليوزر بتاعه بس، و action [[borrow]] على الكتاب بـ [[select_for_update]]، و group [[librarians]] بيشوف كل الإعارات ويعلّم إرجاع، و TokenAuthentication للموبايل و throttle على [[/api/token/]]. من الوحدة كلها ومن «transaction.atomic».`, done: R`٢٠ اختبار على الأقل بيعدّوا: يوزر بيشوف إعاراته بس ([[404]] لإعارة غيره)، والاستعارة المزدوجة بـ ٥ threads بتنجح مرة واحدة، والسادس على [[/api/token/]] في الدقيقة [[429]]، و [[assert_num_queries]] على كل list.` },
        { lvl: 'متوسط', t: R`import و export بالـ API`, what: R`[[POST /api/products/import/]] بياخد CSV (من [[request.FILES]]) أو JSON لحد ١٠٠٠ صف، بيفحص كل صف بـ [[ProductSerializer]]، ولو أي صف غلط ميحفظش حاجة ويرجّع الأخطاء بأرقام الصفوف، ولو كله صح [[bulk_create]] في transaction. و [[GET /api/products/export/]] بيرجّع CSV. من دروس serializers و transaction.atomic.`, done: R`ملف ١٠٠٠ صف صح بيتحفظ في أقل من ثانية بعدد queries ثابت، وملف فيه صف غلط رقم ٤٣٧ بيرجّع [[400]] فيه [[437]] ومفيش ولا صف اتحفظ، والـ export بيفتح في Excel بالعربي صح ([[utf-8-sig]]).` },
        { lvl: 'كبير', t: R`API متجر جاهز للإنتاج`, what: R`كل اللي فات مع بعض: منتجات وأقسام و reviews وطلبات (درس «transaction.atomic»)، بـ JWT ([[djangorestframework-simplejwt]]) للموبايل و session للويب، وصلاحيات لكل دور، و cursor pagination للمنتجات، و throttling على Redis، و OpenAPI، و ٤٠ اختبار على Postgres في CI، و Dockerfile بـ gunicorn و WhiteNoise و [[LOGGING]] على الـ stdout، و [[/healthz]] بيفحص القاعدة.`, done: R`[[docker compose up]] بيقوّم Postgres و Redis والتطبيق، و [[check --deploy]] فيه تحذيرات HSTS بس، و [[/api/docs/]] فيها كل الـ endpoints، و view بتعمل error بيطلع الـ traceback في [[docker logs]]، والاختبارات بتعدّي في أقل من ١٠ ثواني، وإعادة التشغيل من الصفر ([[down -v]] ثم [[up]]) بتشتغل من غير خطوة يدوية.`, ext: R`زوّد webhooks لبوابة دفع بتوقيع، و tasks في الخلفية للإيميلات، و Sentry للأخطاء، و rate limit مختلف لكل خطة اشتراك، وانشره على VPS ورا nginx بشهادة Let's Encrypt.` },
        { lvl: 'فكرة', t: R`API لخدمة تدفع فيها`, what: R`اختار خدمة حد ممكن يدفع اشتراك فيها (حجز مواعيد لعيادات، أو متابعة شحنات، أو إدارة اشتراكات جيم، أو طلبات مطعم) وابني الـ API بتاعها كامل لـ frontend أو موبايل: الـ models والصلاحيات لكل دور والصفحات والـ throttling والتوثيق والاختبارات والنشر. انت اللي بتقرر الـ endpoints.`, done: R`فيه README بلينك [[/api/docs/]] على سيرفر حقيقي، وجدول بالأدوار ومين يقدر يعمل إيه (وكل سطر فيه اختبار بيأكده)، والـ CI أخضر، وأي يوزر ميقدرش يوصل لداتا يوزر تاني بتغيير رقم.`, ext: R`اعمل frontend بسيط بـ React من الـ TypeScript types اللي اتولّدت من الـ schema، وزوّد multi-tenancy (كل عيادة داتاها لوحدها)، وخطط أسعار بحدود استخدام.` },
      ],
      n: "DRF بيحوّل الـ models لـ API: serializers للفحص والتحويل، و viewsets و router للـ CRUD، وصلاحيات وصفحات و throttling، وتوثيق OpenAPI لوحده، و pytest-django يثبّت السلوك وعدد الـ queries، وبعدين gunicorn ورا proxy من غير فخاخ DEBUG",
      items: [
        {
          cmd: "DRF serializers و viewsets",
          title: "API كامل بـ Django REST Framework: ModelSerializer و ModelViewSet و router",
          desc: R`[[pip install djangorestframework]] وضيف [[rest_framework]] في [[INSTALLED_APPS]]. الـ serializer بيحوّل الـ model لـ JSON وبيفحص الـ JSON اللي جاي (زي Pydantic في FastAPI)، و [[ModelViewSet]] بيدّيك list و create و retrieve و update و destroy في class واحد، و [[DefaultRouter]] بيعمل الـ URLs لوحده.

٣ ملفات صغيرة = [[GET/POST /api/products/]] و [[GET/PUT/PATCH/DELETE /api/products/<id>/]] بفحص للمدخلات ورسايل أخطاء 400 واضحة، وصفحة تجرّب منها في المتصفح.`,
          deep: {
            why: R`[[JsonResponse]] بإيدك معناه تكتب الفحص والتحويل والـ status codes ورسايل الأخطاء لكل endpoint. DRF بيعمل ده بطريقة واحدة لكل الـ API، ومتكامل مع الـ ORM والـ auth والصلاحيات بتاعة Django. وهو أشهر طريقة تعمل بيها API بـ Django.`,
            how: R`[[ModelSerializer]] بيقرا الحقول من الـ model: النوع والـ max_length والـ unique والـ ForeignKey (بيبقى id، و DRF بيتأكد إنه موجود). و [[source="category.name"]] بيجيب قيمة من علاقة، و [[read_only=True]] يعني بتطلع في الرد بس ومش بتتقري من الطلب. و [[validate_<field>]] دالة فحص لحقل، و [[validate(self, attrs)]] للفحص بين حقول.

في الـ create: [[serializer.is_valid()]] بيشغّل الفحص، ولو فيه غلط [[serializer.errors]] بيترجع 400. لو صح [[serializer.save()]] بينادي [[Model.objects.create(**validated_data)]]. والـ viewset بيعمل ده كله لوحده.

[[ModelViewSet]] = ٥ actions: [[list]] و [[create]] و [[retrieve]] و [[update]]/[[partial_update]] و [[destroy]]. ولو عايز قراية بس: [[ReadOnlyModelViewSet]]. و [[@action(detail=True, methods=["post"])]] لـ endpoint زيادة زي [[/products/5/archive/]].

[[DefaultRouter]] بيعمل route للـ list ([[^products/$]]) و route للـ detail ([[^products/(?P<pk>[^/.]+)/$]])، وصفحة root على [[/api/]] فيها لينكات الـ resources. و [[router.register("products", ProductViewSet)]] بياخد اسم الـ URL من الـ queryset.

ولو فتحت الـ endpoint من المتصفح، DRF بيرجّع «Browsable API»: صفحة HTML فيها الرد وفورم تبعت منه. ومن curl أو JS بيرجع JSON عادي (حسب الـ [[Accept]] header).`,
            when: R`API لـ frontend (React أو موبايل) فوق مشروع Django موجود، أو مشروع جديد محتاج الـ admin والـ ORM والـ auth بتوع Django مع API. ولو API جديد بس، ومحتاج async كتير و OpenAPI تلقائي، FastAPI أو [[django-ninja]] (API بأسلوب FastAPI جوه Django) اختيارات تانية.`,
            mistakes: R`[[fields = "__all__"]] فحقل زي [[is_staff]] أو [[password]] يطلع أو يتكتب من الـ API. والـ serializer فيه nested object أو [[source="category.name"]] والـ queryset من غير [[select_related]] (N+1، الاختبار في درس pytest-django بيمسكه). و [[queryset = Product.objects.all()]] من غير [[order_by]] مع pagination (DRF بيحذّرك إن الترتيب مش ثابت). وتعمل الفحص في الـ view بدل الـ serializer، فالـ create والـ update يختلفوا. وتنسى إن [[PUT]] محتاج كل الحقول و [[PATCH]] بس اللي اتغير.`
          },
          teach: R`## المثال بيعمل إيه؟

API للمنتجات: serializer بيحدد الحقول ويفحص السعر، و viewset بيعمل الـ CRUD، و router بيعمل الـ URLs. اتشغّل بـ DRF 3.18.3 و Django 6.1.2 على Postgres 16 في Docker، بـ [[runserver]] و [[curl]]. الصلاحيات والصفحات ([[PAGE_SIZE = 3]]) شرحهم في الدرس الجاي، وهنا هنستخدم توكن الـ admin للكتابة.

---

## ١. الـ serializer

~~~python
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    class Meta:
        model = Product
        fields = ["id", "name", "category", "category_name", "price_cents", "stock", "is_active", "created_at"]
        read_only_fields = ["created_at"]
~~~

| الحتة | معناها |
|---|---|
| [[ModelSerializer]] | serializer بيبني حقوله من الـ model |
| [[category_name = CharField(source="category.name", read_only=True)]] | حقل زيادة: اسم القسم من العلاقة، للقراية بس |
| [[model = Product]] | الـ model اللي الحقول وقواعدها جاية منه |
| [[fields = [...]]] | الحقول اللي تطلع وتدخل، بالاسم. قايمة صريحة، مش [["__all__"]] |
| [[category]] | ForeignKey، فبيبقى id في الـ JSON، و DRF بيتأكد إن القسم موجود |
| [[read_only_fields]] | [[created_at]] بيطلع بس، ومحدش يبعته |

### الفحص

~~~python
    def validate_price_cents(self, value):
        if value < 100:
            raise serializers.ValidationError("Price must be at least 1 EGP (100 cents).")
        return value
~~~

[[validate_<اسم الحقل>]]: DRF بيناديها بعد الفحص العادي (النوع وإنه مش سالب). ترجّع القيمة لو تمام، أو ترمي [[ValidationError]] فالرسالة تتحط تحت اسم الحقل.

---

## ٢. الـ viewset

~~~python
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").order_by("id")
    serializer_class = ProductSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
~~~

- [[queryset]]: الصفوف. [[select_related]] عشان [[category_name]] متعملش query لكل منتج، و [[order_by("id")]] عشان الصفحات تبقى ثابتة.
- [[serializer_class]]: مين يحوّل ويفحص.
- [[permission_classes]]: أي حد يقرا، والكتابة لليوزر اللي معاه صلاحيات Django ([[add_product]] و [[change_product]]...). تفاصيلها الدرس الجاي.

## ٣. الـ router

~~~python
router = DefaultRouter()
router.register("products", ProductViewSet)
urlpatterns = [
    path("api/", include(router.urls)),
]
~~~

| الـ URL | الـ method | الـ action |
|---|---|---|
| [[/api/products/]] | GET | [[list]] |
| [[/api/products/]] | POST | [[create]] |
| [[/api/products/<id>/]] | GET | [[retrieve]] |
| [[/api/products/<id>/]] | PUT / PATCH | [[update]] / [[partial_update]] |
| [[/api/products/<id>/]] | DELETE | [[destroy]] |

و [[GET /api/]] صفحة root:

~~~text الناتج
{"products":"http://127.0.0.1:8000/api/products/","reviews":"http://127.0.0.1:8000/api/reviews/"}
~~~

---

## ٤. نجرّب

### list

~~~text curl "http://127.0.0.1:8000/api/products/?page=2"
{"count":10,"next":"http://127.0.0.1:8000/api/products/?page=3","previous":"http://127.0.0.1:8000/api/products/","results":[{"id":2075,"name":"ThinkPad X1","category":123,"category_name":"Laptops","price_cents":6500000,"stock":3,"is_active":true,"created_at":"2026-10-27T22:41:06.257650Z"}, ...]}
~~~

كل منتج بالحقول اللي في [[fields]] بس، و [[category]] رقم و [[category_name]] اسم. والتاريخ ISO 8601 بـ UTC ([[Z]]).

### create بسعر غلط

~~~bash
curl -X POST http://127.0.0.1:8000/api/products/ -H "Authorization: Token <admin token>" -H "Content-Type: application/json" -d '{"name":"Cheap cable","category":124,"price_cents":50}'
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
{"price_cents":["Price must be at least 1 EGP (100 cents)."]}
~~~

الغلط تحت اسم الحقل، والفرونت يقدر يعرضه جنب الخانة.

### create صح

~~~text الناتج
HTTP/1.1 201 Created
{"id":2082,"name":"DP cable","category":124,"category_name":"Cables","price_cents":25000,"stock":8,"is_active":true,"created_at":"2026-10-27T22:41:15.288517Z"}
~~~

[[201 Created]]، والرد فيه الـ id و [[created_at]] اللي القاعدة عملتهم.

### PATCH

~~~bash
curl -X PATCH http://127.0.0.1:8000/api/products/2082/ -H "Authorization: Token <admin token>" -H "Content-Type: application/json" -d '{"stock":7}'
~~~

رجّع المنتج كله بـ [[stock: 7]]. [[PATCH]] = غيّر اللي بعته بس. [[PUT]] كان هيطلب [[name]] و [[category]] و [[price_cents]] كمان.

---

## ٥. nested و [[SerializerMethodField]]، وفخ الـ N+1

الـ frontend عايز القسم كـ object مش رقم، وعدد الـ reviews، والسعر مكتوب. اتجرّب بـ DRF 3.18.3 على SQLite، والعدّ بـ [[CaptureQueriesContext]]:

~~~python
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
class ProductReadSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    price = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "category", "price", "review_count"]
    def get_price(self, obj):
        return f"{obj.price_cents / 100:.2f} EGP"
    def get_review_count(self, obj):
        return obj.reviews.count()
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[category = CategorySerializer(read_only=True)]] | الحقل بقى object بدل id. و [[read_only]] لأن الكتابة الـ nested محتاجة [[create()]] بتاعتك |
| [[SerializerMethodField()]] | قيمته من دالة اسمها [[get_]] + اسم الحقل، وبيبقى read-only دايمًا |
| [[get_price]] | [[15000]] تبقى [["150.00 EGP"]] |
| [[get_review_count]] | [[obj.reviews.count()]]: query لكل منتج |

~~~text اتشغّل فعلًا · الناتج
{"id": 1, "name": "HDMI 2m", "category": {"id": 5, "name": "Cables"}, "price": "150.00 EGP", "review_count": 0}
queries: 4
~~~

٣ منتجات = query للمنتجات (بالـ JOIN بتاع [[select_related]]) و ٣ [[COUNT]]. الحل: العدد يتحسب في القاعدة ويبقى حقل عادي:

~~~python
class ProductReadSerializer2(ProductReadSerializer):
    review_count = serializers.IntegerField(read_only=True)
qs = Product.objects.select_related("category").annotate(review_count=Count("reviews")).order_by("id")
~~~

~~~text الناتج
{"id": 1, "name": "HDMI 2m", "category": {"id": 5, "name": "Cables"}, "price": "150.00 EGP", "review_count": 0} queries: 1
~~~

نفس الـ JSON بالحرف، و query واحدة. القاعدة: أي [[SerializerMethodField]] بيلمس علاقة = N+1 محتمل؛ يا [[annotate]] يا [[prefetch_related]].

---

## ٦. [[Serializer]] عادي و [[validate()]] بين الحقول

مش كل طلب بيعمل صف. لـ action زي «انقل مخزون» بتعمل [[Serializer]] من غير model:

~~~python
class TransferSerializer(serializers.Serializer):
    sku = serializers.CharField(max_length=30)
    from_stock = serializers.IntegerField(min_value=0)
    to_stock = serializers.IntegerField(min_value=0)
    def validate(self, attrs):
        if attrs["from_stock"] == attrs["to_stock"]:
            raise serializers.ValidationError("from_stock and to_stock must differ.")
        return attrs
~~~

~~~text الناتج
False {'non_field_errors': [ErrorDetail(string='from_stock and to_stock must differ.', code='invalid')]}
False {"sku": ["This field may not be blank."], "from_stock": ["Ensure this value is greater than or equal to 0."], "to_stock": ["This field is required."]}
True {'sku': 'A1', 'from_stock': 3, 'to_stock': 1}
~~~

- [[validate(self, attrs)]] بتتنادى بعد ما **كل** الحقول عدّت فحصها، فـ [[attrs["from_stock"]]] موجود أكيد. خطأها بيروح تحت [[non_field_errors]].
- السطر التاني: ٣ أخطاء في رد واحد، فالـ frontend يعرضهم كلهم مرة واحدة. و [[validate()]] متنادتش أصلًا لأن الحقول فشلت.
- [[validated_data]] فيها القيم بأنواعها ([[3]] رقم مش [["3"]]).

---

## ٧. [[DefaultRouter]] ولا [[SimpleRouter]]

~~~text الناتج
SimpleRouter [('^products/$', 'product-list'), ('^products/(?P<pk>[^/.]+)/$', 'product-detail')]
DefaultRouter [('^products/$', 'product-list'), ('^products\.(?P<format>[a-z0-9]+)/?$', 'product-list'), ('^products/(?P<pk>[^/.]+)/$', 'product-detail'), ('^products/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$', 'product-detail'), ('^\Z', 'api-root'), ('^(?P<format>\.[a-z0-9]+/?)\Z', 'api-root')]
~~~

[[SimpleRouter]] بيعمل اتنين بس. [[DefaultRouter]] بيزوّد صفحة الـ root ([[api-root]]) ونسخة بـ suffix ([[/api/products.json]]) لكل route. و [[[^/.]+]] في الـ pk معناه أي حاجة غير [[/]] و [[.]]، فـ [[/api/products/abc/]] بيوصل للـ viewset ويرجع [[404]] من [[get_object()]] مش من الـ URL.

---

## ٨. بحث وترتيب من غير كود

~~~python
class SearchProducts(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related("category").order_by("id")
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "category__name"]
    ordering_fields = ["price_cents", "stock"]
~~~

~~~text الناتج
200 ['USB-C 2m', 'USB-C 1m'] 2
[('Clean Code', 45000), ('Python Tricks', 29000), ('SQL Basics', 19000)]
bad ordering field ignored: 200 [1, 2, 3]
~~~

- [[?search=usb]]: [[icontains]] على [[name]] أو [[category__name]]، و [[count]] بقى [[2]].
- [[?search=books&ordering=-price_cents]]: كتب قسم Books من الأغلى. الـ [[-]] = تنازلي.
- [[?ordering=created_at]]: مش في [[ordering_fields]]، فاتجاهل والترتيب فضل بالـ id. ده بيمنع حد يرتّب بحقل فيه index ناقص أو حقل سري. ولفلاتر بالقيمة ([[?category=5&is_active=true]]) فيه مكتبة [[django-filter]] (من الـ docs، مش متجرّبة هنا).

---

## الخلاصة

| الملف | فيه |
|---|---|
| [[serializers.py]] | الحقول اللي تطلع وتدخل، والفحص بتاعها |
| [[api.py]] (أو [[views.py]]) | الـ viewset: queryset و serializer وصلاحيات |
| [[urls.py]] | [[DefaultRouter]] + [[register]]: الـ URLs بتتولد من الـ viewsets لوحدها |

- [[fields]] قايمة صريحة دايمًا.
- الفحص في الـ serializer، مش في الـ view.
- [[select_related]] لأي حقل [[source]] من علاقة، و [[order_by]] مع الصفحات.
- [[SerializerMethodField]] بيلمس علاقة = N+1: [[annotate]] أو [[prefetch_related]].
- [[validate()]] للقواعد اللي فيها أكتر من حقل، و [[Serializer]] عادي للـ actions اللي مش بتعمل صف.`,
          example: R`# shop/serializers.py:
from rest_framework import serializers
from .models import Product
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    class Meta:
        model = Product
        fields = ["id", "name", "category", "category_name", "price_cents", "stock", "is_active", "created_at"]
        read_only_fields = ["created_at"]
    def validate_price_cents(self, value):
        if value < 100:
            raise serializers.ValidationError("Price must be at least 1 EGP (100 cents).")
        return value
# shop/api.py:
from rest_framework import permissions, viewsets
from .models import Product
from .serializers import ProductSerializer
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").order_by("id")
    serializer_class = ProductSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
# config/urls.py:
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from shop.api import ProductViewSet
router = DefaultRouter()
router.register("products", ProductViewSet)
urlpatterns = [
    path("api/", include(router.urls)),
]`,
          flag: "script",
          learn: R`تحوّل الـ models لـ API كامل: serializer بيفحص ويحوّل (ModelSerializer و Serializer عادي، و nested، و SerializerMethodField، و [[validate]] بين الحقول)، و viewset و router بيعملوا الـ CRUD والـ URLs، وبحث وترتيب جاهزين، من غير N+1.`,
          out: R`[[/api/products/]] بـ GET و POST و PUT و PATCH و DELETE، بأخطاء ٤٠٠ تحت اسم كل حقل، وبحث بـ [[?search=]] وترتيب بـ [[?ordering=]]، وكل صفحة بـ ٢ queries.`,
          use: {
            prog: R`أي frontend (React أو Vue أو موبايل) فوق Django بيكلّم DRF. والـ serializer هو العقد بين الاتنين: إيه اللي بيطلع، وإيه اللي مسموح يدخل.`,
            work: R`أغلب شغل الـ backend في شركة بتستخدم Django: endpoint جديد أو حقل في serializer أو فلتر في viewset، وأشهر باج فيهم N+1 من حقل nested.`,
            net: R`الـ API ده HTTP عادي: [[201 Created]] للإنشاء و [[204]] للمسح و [[400]] للداتا الغلط، والـ [[Accept]] header بيختار JSON ولا صفحة الـ Browsable API.`,
          },
          lines: [
            R`[[from rest_framework import serializers]]: فيه [[ModelSerializer]] و [[Serializer]] وكل أنواع الحقول ([[CharField]] و [[IntegerField]] و [[SerializerMethodField]]...) و [[ValidationError]].`,
            R`[[from .models import Product]]: الـ model اللي الـ serializer هيقرا منه الحقول وقواعدها.`,
            R`[[class ProductSerializer(serializers.ModelSerializer)]]: serializer بيبني حقوله من الـ model لوحده (زي [[ModelForm]] في درس «Django forms و CSRF»): النوع والطول والـ unique والـ ForeignKey.`,
            R`[[category_name = serializers.CharField(source="category.name", read_only=True)]]: حقل زيادة مش في الـ model: قيمته من العلاقة [[product.category.name]]. [[read_only]] يعني بيطلع في الرد بس، ولو حد بعته في الطلب بيتجاهل. ولأنه بيقرا علاقة، الـ queryset لازم فيه [[select_related("category")]].`,
            R`[[class Meta]]: إعدادات الـ serializer: الـ model، والحقول، واللي للقراية بس، وممكن [[extra_kwargs]] لتغيير قواعد حقل.`,
            R`[[model = Product]]: من هنا DRF بيعرف أنواع الحقول، و [[category]] بيبقى [[PrimaryKeyRelatedField]] بيقبل id ويتأكد إنه موجود في القاعدة.`,
            R`[[fields = [...]]]: قايمة صريحة بالحقول اللي تطلع وتدخل. لو كتبت [["__all__"]] أي حقل جديد في الـ model (حتى حاجة داخلية) بيطلع في الـ API من غير ما حد ياخد باله.`,
            R`[[read_only_fields = ["created_at"]]]: [[created_at]] بيطلع في الرد ومحدش يقدر يبعته. ([[auto_now_add]] أصلًا مش editable، فـ DRF كان هيعمله read-only لوحده، بس كتابته صريحة بتوضّح القصد.)`,
            R`[[def validate_price_cents(self, value)]]: DRF بيناديها لوحده بعد الفحص العادي للحقل ده (رقم صحيح و >= 0 من [[PositiveIntegerField]])، عشان الاسم [[validate_]] + اسم الحقل.`,
            R`[[if value < 100]]: قاعدة الـ business: أقل سعر جنيه (١٠٠ قرش). [[value]] هنا [[int]] خلاص مش string.`,
            R`[[raise serializers.ValidationError("...")]]: الرسالة بتتحط تحت اسم الحقل: [[{"price_cents": ["Price must be at least 1 EGP (100 cents)."]}]] والـ viewset بيرد [[400]] لوحده.`,
            R`[[return value]]: القيمة اللي بترجعها هي اللي بتتحفظ. ممكن تعدّلها هنا (تقريب، [[strip()]]).`,
            R`[[from rest_framework import permissions, viewsets]]: [[viewsets]] فيه [[ModelViewSet]] و [[ReadOnlyModelViewSet]]، و [[permissions]] فيه كلاسات الصلاحيات الجاهزة.`,
            R`[[from .models import Product]]: الـ model عشان الـ queryset.`,
            R`[[from .serializers import ProductSerializer]]: الـ serializer اللي فوق. فصله في ملف لوحده بيخلي viewsets تانية تستخدمه.`,
            R`[[class ProductViewSet(viewsets.ModelViewSet)]]: class واحد فيه ٦ actions: [[list]] و [[create]] و [[retrieve]] و [[update]] و [[partial_update]] و [[destroy]]، كل واحد method جاهزة تقدر تكتب فوقها.`,
            R`[[queryset = Product.objects.select_related("category").order_by("id")]]: الصفوف اللي الـ API شايفها. [[select_related]] عشان [[category_name]] ميعملش query لكل منتج (اختبار درس pytest-django بيمسكها)، و [[order_by("id")]] عشان الصفحات تبقى ثابتة (من غيره DRF بيحذّر [[UnorderedObjectListWarning]]).`,
            R`[[serializer_class = ProductSerializer]]: مين يحوّل ويفحص. ولو محتاج serializer مختلف للـ list والـ create، اكتب [[get_serializer_class()]] بدله.`,
            R`[[permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]]]: القراية للكل حتى الزوار، والكتابة لليوزر اللي معاه صلاحيات Django ([[add_product]] للـ POST و [[change_product]] للـ PUT و [[delete_product]] للـ DELETE). التفاصيل الدرس الجاي.`,
            R`[[from django.urls import include, path]]: [[include]] عشان نحط كل URLs الـ router تحت [[api/]] مرة واحدة.`,
            R`[[from rest_framework.routers import DefaultRouter]]: router بيولّد الـ URLs من الـ viewsets، وبيزوّد صفحة root فيها لينكات كل الـ resources.`,
            R`[[from shop.api import ProductViewSet]]: الـ viewset من [[shop/api.py]].`,
            R`[[router = DefaultRouter()]]: object بنسجّل فيه الـ viewsets. ولو مش عايز صفحة الـ root ولا الـ [[.json]] suffix فيه [[SimpleRouter]] (القسم ٦).`,
            R`[[router.register("products", ProductViewSet)]]: بيعمل [[products/]] (list و create) و [[products/<pk>/]] (retrieve و update و destroy)، وأسامي [[product-list]] و [[product-detail]] من اسم الـ model في الـ queryset.`,
            R`[[urlpatterns = [...]]]: جدول المسارات بتاع المشروع.`,
            R`[[path("api/", include(router.urls))]]: كل الـ API تحت [[/api/]]، فـ [[/api/products/]] و [[/api/products/7/]] و [[/api/]] نفسها صفحة الـ root.`,
            R`قفل [[urlpatterns]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اعمل [[CategorySerializer]] و [[CategoryViewSet]] قراية بس ([[ReadOnlyModelViewSet]]) وسجّله في الـ router، وافتح [[/api/]].`, done: R`صفحة [[/api/]] فيها لينك [[categories]] جنب [[products]]، و [[GET /api/categories/]] بيرجّع الأقسام بصفحات، و [[POST]] عليه بيرجّع [[405]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب الـ status والرد لكل طلب قبل ما تشغّل (بتوكن الـ admin): POST من غير [[name]]، و POST بـ [[category]] رقم مش موجود، و POST بـ [[price_cents: -1]]، و POST بـ [[price_cents: "abc"]]، و PUT بـ [[{"stock": 1}]] بس، و PATCH بـ [[{"stock": 1}]].`, done: R`الخمسة الأولى [[400]] والأخيرة [[200]]، والـ [[-1]] رسالته [[Ensure this value is greater than or equal to 0.]] مش رسالتك (الفحص العادي بيوقف قبل [[validate_price_cents]])، و [[abc]] رسالته [[A valid integer is required.]]، والـ PUT قال [[This field is required.]] لـ [[name]] و [[category]] و [[price_cents]].` },
            { lvl: 'تطبيق', t: R`**قارن وعدّ الـ queries:** serializer قراية فيه [[category]] كـ nested serializer و [[review_count]] كـ [[SerializerMethodField]] بيعمل [[obj.reviews.count()]]. عدّ queries تلات منتجات، وبعدين خلّي العدد [[annotate(review_count=Count("reviews"))]] في الـ queryset وعدّ تاني.`, done: R`الأولى [[4]] (منتجات + ٣ [[COUNT]]) والتانية [[1]]، والـ JSON نفسه بالظبط في الحالتين ([[{"id": 1, "name": "HDMI 2m", "category": {"id": ..., "name": "Cables"}, ...}]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[@action(detail=True, methods=["post"])]] اسمه [[restock]] بياخد [[{"amount": 5}]] من [[Serializer]] عادي ([[amount]] من ١ لـ ١٠٠٠)، ويزوّد المخزون بـ [[F]] ويرجّع المنتج.`, done: R`[[POST /api/products/<id>/restock/]] بـ [[amount: 5]] بيرجّع [[200]] والمخزون زاد ٥، و [[amount: 0]] بيرجّع [[400]] تحت [[amount]]، ومن غير توكن [[403]]، والـ router عمل الـ URL لوحده.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** serializer لليوزرز فيه [[fields = "__all__"]] و viewset بـ [[ModelViewSet]]، وواحد عمل PATCH بـ [[{"is_staff": true}]] على نفسه. لاقي المشكلتين وصلّحهم.`, done: R`الرد على [[GET /api/users/me/]] (أو اليوزر) مفيهوش [[password]] ولا [[is_staff]] ولا [[is_superuser]]، و PATCH بـ [[is_staff: true]] بيرجّع [[200]] بس [[is_staff]] لسه [[False]] في القاعدة (read-only أو مش في [[fields]]).` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** endpoint [[POST /api/products/import/]] بياخد list فيها ٥٠ منتج JSON بـ [[ProductSerializer(data=rows, many=True)]]، ولو صف واحد غلط ميحفظش ولا واحد، ويرجّع الأخطاء بأرقام الصفوف.`, done: R`٥٠ صف صح بيعملوا ٥٠ منتج في [[bulk_create]] أو transaction واحدة، وصف رقم ١٧ فيه سعر [[50]] بيرجّع [[400]] والأخطاء dict مفتاحه رقم الصف بس ([[{"17": {"price_cents": [...]}}]]: كده DRF 3.18 بيطلّعها، الصفوف السليمة مش فيها)، و [[Product.objects.count()]] متغيرش.` },
          ],
          try: R`اعمل الـ 3 ملفات، وافتح [[http://127.0.0.1:8000/api/products/]] من المتصفح وشوف الـ Browsable API. وبعدين ضيف [[@action(detail=True, methods=["post"])]] اسمه [[archive]] بيخلي [[is_active=False]]، وجرّبه بـ [[curl -X POST .../api/products/<id>/archive/]] بتوكن الـ admin. وأخيرًا جرّب تبعت [[category]] رقم مش موجود.`,
          solCode: R`from rest_framework.decorators import action
from rest_framework.response import Response
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").order_by("id")
    serializer_class = ProductSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    @action(detail=True, methods=["post"])
    def archive(self, request, pk=None):
        product = self.get_object()
        product.is_active = False
        product.save(update_fields=["is_active"])
        return Response(self.get_serializer(product).data)`,
          sol: R`[[detail=True]] يعني الـ action على منتج واحد، فالـ router بيعمل [[/api/products/<id>/archive/]]. و [[self.get_object()]] بيجيب المنتج (أو 404) وبيشغّل [[has_object_permission]]، و [[save(update_fields=[...])]] بيعمل [[UPDATE]] للعمود ده بس. الرد [[200]] والمنتج بـ [["is_active":false]]. ومن غير توكن: [[403]] [[{"detail":"Authentication credentials were not provided."}]] (POST مش آمن، والصلاحية محتاجة يوزر).

و [[category]] مش موجود بيرجع [[400]] و [[{"category":["Invalid pk "999" - object does not exist."]}]]: الـ [[PrimaryKeyRelatedField]] اللي [[ModelSerializer]] عمله للـ ForeignKey بيدوّر عليه في القاعدة لوحده.`
        },
        {
          cmd: "DRF permissions و pagination",
          title: "مين يقرا ومين يكتب، وصاحب الحاجة بس يعدّلها، والنتايج على صفحات",
          desc: R`في DRF الـ authentication بيعرف «مين ده» (session أو token)، والـ permissions بتقرر «مسموحله؟». [[IsAuthenticatedOrReadOnly]] يعني القراية للكل والكتابة للداخلين، و permission بتاعتك فيها [[has_object_permission]] بتخلي صاحب الـ review بس يعدّله. و [[PageNumberPagination]] بـ [[PAGE_SIZE]] بيقسّم أي list لصفحات فيها [[count]] و [[next]] و [[previous]].

[[HiddenField(default=CurrentUserDefault())]] بيحط اليوزر الحالي في الـ serializer من غير ما العميل يبعته، فمحدش يكتب review باسم حد تاني، والـ [[UniqueConstraint]] بيتفحص بـ 400 بدل 500.`,
          deep: {
            why: R`أشهر ثغرة في الـ APIs اسمها BOLA أو IDOR: اليوزر يغيّر الـ id في الـ URL ويعدّل حاجة مش بتاعته. الـ permission على مستوى الـ object هي اللي بتقفلها. والصفحات بتمنع إن طلب واحد يرجّع مية ألف صف ويوقّع السيرفر.`,
            how: R`[[DEFAULT_AUTHENTICATION_CLASSES]] بيتجرّبوا بالترتيب. [[SessionAuthentication]] بيقرا الـ session بتاعة Django (للـ frontend على نفس الدومين، ومعاها CSRF)، و [[TokenAuthentication]] بيقرا header [[Authorization: Token <key>]] من جدول [[authtoken_token]] (محتاج [[rest_framework.authtoken]] في INSTALLED_APPS و migrate). و [[obtain_auth_token]] view بتاخد username و password وترجّع التوكن.

الـ permissions بتتفحص كلها (AND). [[has_permission]] على الطلب كله قبل أي حاجة، و [[has_object_permission]] على الـ object لما الـ view تنادي [[get_object()]] (retrieve و update و destroy). وفي الـ list مش بتتنادى، فلو عايز تخبّي صفوف فلتر الـ [[get_queryset]] نفسه. و [[SAFE_METHODS]] = GET و HEAD و OPTIONS.

الرد لما مفيش يوزر: لو أول authentication class فيه [[authenticate_header]] (زي Token) الرد [[401]] و [[WWW-Authenticate: Token]]. لو أوله Session الرد [[403]]. وده ترتيب الـ list بس.

[[PageNumberPagination]] بيقرا [[?page=]]، و [[LimitOffsetPagination]] بيقرا [[?limit=&offset=]]، و [[CursorPagination]] أسرع على الجداول الكبيرة لأنه مبيعملش [[COUNT]] ولا [[OFFSET]] كبير، بس محتاج ترتيب ثابت ومفيش رقم صفحة.

[[UniqueConstraint(fields=["product", "author"])]] في الـ model، و DRF بيعمل [[UniqueTogetherValidator]] لوحده لو كل الحقول في الـ serializer. [[author]] كـ [[HiddenField]] موجود في الـ serializer (مخفي)، فالفحص بيشتغل. لو كان [[read_only]] واتحط في [[perform_create]]، كان التكرار هيوصل للقاعدة ويطلع [[IntegrityError]] و 500.`,
            when: R`أي API فيه يوزرز. Token للموبايل والسكربتات، Session لـ SPA على نفس الدومين. ولـ JWT (توكنات بتنتهي و refresh) استخدم [[djangorestframework-simplejwt]]. والصفحات على كل list من أول يوم، لأن إضافتها بعدين بتكسر الـ clients.`,
            mistakes: R`[[permission_classes = [IsAuthenticated]]] وتفتكر إن كده كل يوزر بيشوف حاجته بس (ده بيتأكد إنه داخل، مش إنه صاحبها). و [[has_object_permission]] من غير ما تفلتر [[get_queryset]]، فالـ list بترجّع حاجات الناس كلها. وتحط [[author]] كحقل عادي يكتبه العميل. و [[AllowAny]] افتراضي في الإعدادات (هو ده الافتراضي فعلًا لو مكتبتش [[DEFAULT_PERMISSION_CLASSES]]). وتوكنات DRF العادية مبتنتهيش: لو اتسرّب، امسحه من الـ admin.`
          },
          teach: R`## المثال بيعمل إيه؟

API للـ reviews: أي حد يقرا، والداخل بس يكتب، وصاحب الـ review بس يعدّله أو يمسحه، و review واحد لكل يوزر على كل منتج. والإعدادات بتشغّل الـ session والـ token وصفحات من ٣. اتشغّل بـ DRF 3.18.3 و Django 6.1.2 على Postgres 16 في Docker، بيوزرين [[sara]] و [[omar]] وتوكنات تجربة (اتمسحوا بعدها).

---

## ١. الـ model

~~~python
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField()
    body = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [models.UniqueConstraint(fields=["product", "author"], name="one_review_per_user")]
~~~

- [[settings.AUTH_USER_MODEL]]: الـ ForeignKey لليوزر دايمًا كده، مش import لـ User (درس «Django auth»).
- [[UniqueConstraint]]: القاعدة نفسها بترفض review تاني من نفس اليوزر على نفس المنتج.

## ٢. الـ serializer

~~~python
class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    author_name = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Review
        fields = ["id", "product", "author", "author_name", "rating", "body", "created_at"]
    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value
~~~

- [[HiddenField]]: حقل مش بيتقري من الطلب ومش بيطلع في الرد، قيمته من الـ [[default]] بس.
- [[CurrentUserDefault()]]: [[request.user]]. فالـ author دايمًا اللي باعت الطلب.
- [[author_name]]: الاسم في الرد (للقراية).
- [[1 <= value <= 5]]: مقارنة متسلسلة في Python: الاتنين لازم يتحققوا.

## ٣. الـ permission بتاعتك

~~~python
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author_id == request.user.id
~~~

- [[BasePermission]]: الأب. فيه [[has_permission]] و [[has_object_permission]] بيرجّعوا True افتراضيًا.
- [[SAFE_METHODS]]: [[("GET", "HEAD", "OPTIONS")]]. القراية مسموحة.
- [[obj.author_id == request.user.id]]: الكتابة لصاحبه بس. [[author_id]] العمود نفسه، من غير query لليوزر.

## ٤. الـ viewset

~~~python
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related("author").order_by("-created_at")
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
~~~

[[permission_classes]] الاتنين لازم يوافقوا: الأولى بتمنع غير الداخلين من الكتابة خالص، والتانية بتمنع الداخل من تعديل حاجة غيره.

## ٥. الإعدادات

~~~python
INSTALLED_APPS += ["rest_framework", "rest_framework.authtoken"]
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 3,
}
~~~

و [[path("api/token/", obtain_auth_token)]] في الـ URLs، و [[migrate]] عشان جدول التوكنات.

---

## ٦. السيناريوهات (نواتج حقيقية)

| الطلب | الرد |
|---|---|
| sara: [[POST /api/reviews/]] [[{"product":2082,"rating":5,"body":"Works"}]] | [[201]] [[{"id":1,"product":2082,"author_name":"sara","rating":5,...}]]: اتعمل والكاتب من الـ token |
| sara نفس المنتج تاني | [[400]] [[{"non_field_errors":["The fields product, author must make a unique set."]}]] |
| omar: [[rating: 9]] | [[400]] [[{"rating":["Rating must be between 1 and 5."]}]] من [[validate_rating]] |
| omar: [[PATCH /api/reviews/1/]] | [[403]] [[You do not have permission to perform this action.]]: [[has_object_permission]] رفض |
| من غير توكن: [[POST]] | [[403]] [[Authentication credentials were not provided.]]: [[IsAuthenticatedOrReadOnly]] رفض قبل أي حاجة |
| توكن غلط | [[403]] [[{"detail":"Invalid token."}]]: الـ [[TokenAuthentication]] نفسه رفض |
| sara: [[DELETE /api/reviews/1/]] | [[204]]: صاحبته، فاتمسح ومفيش body في الرد |
| sara: [[POST /api/products/]] | [[403]]: معاهاش [[add_product]] ([[DjangoModelPermissionsOrAnonReadOnly]]) |

### ليه 403 مش 401؟

لأن أول authentication class هو [[SessionAuthentication]]، ومفيهوش [[WWW-Authenticate]]. جربت نفس الطلب و [[TokenAuthentication]] الأول:

~~~text الناتج
401 Token b'{"detail":"Authentication credentials were not provided."}'
~~~

[[401]] ومعاه header [[WWW-Authenticate: Token]]. لو الـ API بتاعك للموبايل بس، حط Token الأول.

### التوكن

~~~bash
curl -X POST http://127.0.0.1:8000/api/token/ -d "username=omar&password=..."
~~~

~~~text الناتج (توكن تجربة)
{"token":"omar-dev-token-0000000000000000000000000"}
~~~

التوكن الحقيقي ٤٠ حرف hex عشوائي. وبتبعته في كل طلب: [[-H "Authorization: Token <key>"]].

---

## ٧. الصفحات

~~~text GET /api/products/?page=2 (مختصر)
{"count":10,"next":"http://127.0.0.1:8000/api/products/?page=3","previous":"http://127.0.0.1:8000/api/products/","results":[...3 منتجات...]}
~~~

| الحقل | معناه |
|---|---|
| [[count]] | كل الصفوف (query [[COUNT]] زيادة) |
| [[next]] / [[previous]] | لينك الصفحة الجاية/اللي فاتت، أو [[null]] |
| [[results]] | الصفحة نفسها، ٣ صفوف |

[[previous]] للصفحة ١ بيتكتب من غير [[?page=1]]. والـ client يمشي ورا [[next]] لحد ما يبقى [[null]].

---

## ٨. ٣ طرق للصفحات

اتجرّبوا بـ DRF 3.18.3 على SQLite بـ ١٠ منتجات، والطلبات بـ [[APIClient]]:

~~~python
class NewestFirst(CursorPagination):
    page_size = 3
    ordering = "-created_at"
class CursorProducts(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related("category")
    serializer_class = ProductSerializer
    pagination_class = NewestFirst
class OffsetProducts(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related("category").order_by("id")
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
~~~

~~~text الناتج
['next', 'previous', 'results'] http://testserver/api/newest/?cursor=cD0yMDI2LTEwLTMwKzAzJTNBMjIlM0EzMi44NDkwMzglMkIwMCUzQTAw ['ThinkPad X1', 'MacBook Air', 'Dell XPS']
['Python Tricks', 'Clean Code', 'SQL Basics'] True
10 http://testserver/api/offset/?limit=2&offset=6 http://testserver/api/offset/?limit=2&offset=2 ['SQL Basics', 'Clean Code']
404 {'detail': 'Invalid cursor'}
~~~

| النوع | الطلب | الرد | التكلفة اللي اتقاست |
|---|---|---|---|
| [[PageNumberPagination]] | [[?page=4]] | [[count]] و [[next]] و [[previous]] | ٢ queries: [[COUNT(*)]] وبعدين [[LIMIT 3 OFFSET 9]] |
| [[LimitOffsetPagination]] | [[?limit=2&offset=4]] | نفس الشكل، و [[next]] فيه [[offset=6]] | ٢ queries برضه، والـ client بيختار الحجم |
| [[CursorPagination]] | [[?cursor=...]] | [[next]] و [[previous]] بس، من غير [[count]] | query **واحدة**: [[WHERE created_at < '2026-10-30 03:46:14.818766' ... LIMIT 4]] |

الـ cursor فيه آخر قيمة اتعرضت (مشفّرة base64)، فالقاعدة بتروح للمكان ده بالـ index بدل ما تعدّ وتتخطى آلاف الصفوف بـ [[OFFSET]]. و [[LIMIT 4]] = حجم الصفحة + ١ عشان يعرف فيه صفحة بعدها ولا لأ. التمن: مفيش «روح لصفحة ٥٠»، ولازم [[ordering]] على عمود ثابت ومتكررش كتير، و cursor متلعّب فيه بيرجّع [[404]] [[Invalid cursor]]. استخدمه للـ feeds والجداول الكبيرة.

---

## ٩. throttling: كام طلب في الدقيقة

~~~python
REST_FRAMEWORK = {
    ...
    "DEFAULT_THROTTLE_RATES": {"anon": "5/minute", "user": "100/minute"},
}
class SearchProducts(viewsets.ReadOnlyModelViewSet):
    ...
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
~~~

- [[AnonRateThrottle]]: للزوار، بيعدّ بالـ IP، بالمعدّل اللي اسمه [["anon"]].
- [[UserRateThrottle]]: للداخلين، بيعدّ بالـ user id، بمعدّل [["user"]].
- [[5/minute]]: ينفع [[second]] و [[minute]] و [[hour]] و [[day]].

~~~text اتشغّل فعلًا · الناتج (زائر، بعد cache.clear())
django.core.cache.backends.locmem.LocMemCache
[200, 200, 200, 200, 200, 429]
429 {'detail': 'Request was throttled. Expected available in 60 seconds.'} Retry-After: 60
other endpoint: 200
~~~

خمسة عدّوا، والسادس [[429 Too Many Requests]] ومعاه header [[Retry-After]] بالثواني. و [[/api/products/]] اللي مفيهوش throttle لسه [[200]].

والفخ في السطر الأول: العدّاد متخزّن في الـ cache، والافتراضي [[LocMemCache]] (ذاكرة الـ process). مع gunicorn بـ ٤ workers كل worker ليه عدّاد لوحده، فالزائر ممكن يعمل ٢٠ طلب مش ٥. في الإنتاج خلّي [[CACHES]] على Redis (درس «redis cache»). وكمان ورا proxy الـ IP هو IP الـ proxy إلا لو [[NUM_PROXIES]] متظبط، فكل الزوار بيبانوا زائر واحد. والـ throttling ده ضد الإساءة البسيطة، مش بديل عن حماية DDoS قدام السيرفر.

[[ScopedRateThrottle]] مع [[throttle_scope = "login"]] في view معينة بيدّيها معدّل لوحدها، زي ٥ محاولات دخول في الدقيقة.

---

## الخلاصة

| السؤال | الحتة |
|---|---|
| مين ده؟ | [[DEFAULT_AUTHENTICATION_CLASSES]]: Session و/أو Token |
| داخل ولا لأ؟ | [[IsAuthenticatedOrReadOnly]] |
| صاحبها ولا لأ؟ | [[has_object_permission]] |
| الـ author مين؟ | [[HiddenField(default=CurrentUserDefault())]] |
| كام صف في الرد؟ | [[DEFAULT_PAGINATION_CLASS]] + [[PAGE_SIZE]] |
| جدول كبير أو feed؟ | [[CursorPagination]]: من غير [[COUNT]] ولا [[OFFSET]] |
| كام طلب في الدقيقة؟ | [[throttle_classes]] + [[DEFAULT_THROTTLE_RATES]]، والـ cache على Redis |

- الـ object permission مبتشتغلش في الـ list: فلتر [[get_queryset]] لو الداتا خاصة.
- [[DEFAULT_PERMISSION_CLASSES]] لو مكتبتهوش = [[AllowAny]].`,
          example: R`# shop/permissions.py:
from rest_framework import permissions
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author_id == request.user.id
# shop/serializers.py:
class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    author_name = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Review
        fields = ["id", "product", "author", "author_name", "rating", "body", "created_at"]
    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value
# shop/api.py:
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related("author").order_by("-created_at")
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
# config/settings.py:
INSTALLED_APPS += ["rest_framework", "rest_framework.authtoken"]
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 3,
}`,
          flag: "script",
          learn: R`تفرق بين «مين ده» (authentication) و «مسموحله؟» (permissions)، وتكتب permission بتخلّي صاحب الحاجة بس يعدّلها، وتحط الكاتب من السيرفر مش من العميل، وتقسّم أي list لصفحات بـ ٣ طرق، وتحدد عدد الطلبات في الدقيقة (throttling).`,
          out: R`API للـ reviews: أي حد يقرا، والداخل بس يكتب، وصاحب الـ review بس يعدّل أو يمسح، و review واحد لكل يوزر على كل منتج، والزائر اللي بيعمل ٥ طلبات في الدقيقة بياخد [[429]].`,
          use: {
            prog: R`نفس الأسئلة في أي API بأي لغة: مين ده، ومسموحله بإيه، وعلى أنهي صف، وكام صف في الرد، وكام طلب في الدقيقة. DRF بيدّيلك مكان واضح لكل سؤال.`,
            net: R`[[401]] و [[403]] و [[429]] ومعاهم headers زي [[WWW-Authenticate]] و [[Retry-After]]: الـ clients والـ proxies بيتصرفوا بيهم، فلازم الرقم الصح.`,
            work: R`أشهر ثغرة في APIs الشركات (BOLA/IDOR في OWASP API Top 10): تغيّر الرقم في الـ URL فتعدّل حاجة حد تاني. الدرس ده هو الحماية منها.`,
          },
          lines: [
            R`[[from rest_framework import permissions]]: فيه [[BasePermission]] اللي بنورث منه، والجاهزين ([[IsAuthenticated]] و [[IsAuthenticatedOrReadOnly]] و [[DjangoModelPermissions]]...) و [[SAFE_METHODS]].`,
            R`[[class IsAuthorOrReadOnly(permissions.BasePermission)]]: permission بتاعتك. [[BasePermission]] فيه [[has_permission]] و [[has_object_permission]] الاتنين بيرجّعوا [[True]] افتراضيًا، فانت بتكتب اللي محتاجه بس.`,
            R`[[def has_object_permission(self, request, view, obj)]]: بتتنادى على object واحد لما الـ view تنادي [[get_object()]]، يعني في retrieve و update و destroy. **مش** بتتنادى في الـ list، فالـ list محتاجة فلتر في [[get_queryset]] لو الداتا خاصة.`,
            R`[[if request.method in permissions.SAFE_METHODS]]: [[SAFE_METHODS]] هي [[("GET", "HEAD", "OPTIONS")]]، الطلبات اللي مبتغيّرش حاجة.`,
            R`[[return True]]: القراية مسموحة لأي حد. ولو عايز الـ reviews نفسها خاصة، ده السطر اللي يتغير.`,
            R`[[return obj.author_id == request.user.id]]: الكتابة لصاحب الـ review بس. [[author_id]] العمود نفسه في الصف، فمفيش query لجدول اليوزرز. وللزائر [[request.user.id]] بيبقى [[None]] فالمقارنة [[False]].`,
            R`[[class ReviewSerializer(serializers.ModelSerializer)]]: serializer الـ reviews، مبني على الـ model اللي فيه [[UniqueConstraint]] على المنتج والكاتب.`,
            R`[[author = serializers.HiddenField(default=serializers.CurrentUserDefault())]]: [[HiddenField]] مبيتقريش من الطلب ومبيطلعش في الرد، قيمته من الـ default بس، و [[CurrentUserDefault()]] هو [[request.user]]. فلو حد بعت [[{"author": 5}]] بيتجاهل، والكاتب دايمًا اللي باعت الطلب.`,
            R`[[author_name = serializers.CharField(source="author.username", read_only=True)]]: اسم الكاتب في الرد عشان الـ frontend يعرضه، من العلاقة (ولذلك [[select_related("author")]] في الـ viewset).`,
            R`[[class Meta]]: إعدادات الـ serializer.`,
            R`[[model = Review]]: الـ model، ومنه DRF بيعرف الـ [[UniqueConstraint]] ويعمل [[UniqueTogetherValidator]] لوحده.`,
            R`[[fields = [...]]]: [[author]] لازم يبقى في القايمة (حتى وهو مخفي) عشان فحص «review واحد لكل يوزر» يشتغل في الـ serializer ويرجّع [[400]]. لو شلته وحطيته في [[perform_create]]، التكرار هيوصل للقاعدة ويطلع [[IntegrityError]] و [[500]].`,
            R`[[def validate_rating(self, value)]]: فحص حقل التقييم بعد الفحص العادي (رقم صحيح موجب من [[PositiveSmallIntegerField]]).`,
            R`[[if not 1 <= value <= 5]]: مقارنة متسلسلة في Python: [[1 <= value]] و [[value <= 5]] الاتنين لازم يتحققوا، فـ [[0]] و [[9]] بيترفضوا.`,
            R`[[raise serializers.ValidationError("Rating must be between 1 and 5.")]]: [[400]] والرسالة تحت [[rating]].`,
            R`[[return value]]: القيمة سليمة، وهي اللي هتتحفظ.`,
            R`[[class ReviewViewSet(viewsets.ModelViewSet)]]: الـ CRUD كله للـ reviews.`,
            R`[[queryset = Review.objects.select_related("author").order_by("-created_at")]]: الأحدث الأول بترتيب ثابت (لازم مع الصفحات)، والكاتب في نفس الـ query عشان [[author_name]].`,
            R`[[serializer_class = ReviewSerializer]]: الـ serializer اللي فوق، اللي بيحط الكاتب من الطلب ويفحص التقييم والتكرار.`,
            R`[[permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]]]: الاتنين لازم يوافقوا (AND). الأولى على الطلب كله: الزائر ميكتبش خالص. التانية على الـ object: الداخل ميعدّلش حاجة غيره.`,
            R`[[INSTALLED_APPS += ["rest_framework", "rest_framework.authtoken"]]]: DRF نفسه، و [[authtoken]] فيه جدول التوكنات ([[migrate]] بيعمله) و view [[obtain_auth_token]].`,
            R`[[REST_FRAMEWORK = {]]: كل إعدادات DRF في dict واحد، وأي حاجة مش مكتوبة بتاخد الافتراضي (ومنها [[AllowAny]] للصلاحيات!).`,
            R`[[DEFAULT_AUTHENTICATION_CLASSES]]: طرق التعرّف على اليوزر، بتتجرّب بالترتيب لحد واحدة تنجح. والترتيب بيحدد الرد للزائر: [[403]] لو Session الأول، و [[401]] لو Token الأول.`,
            R`[[SessionAuthentication]]: الـ session بتاعة Django (نفس cookie الدخول)، للـ frontend على نفس الدومين، ومعاها فحص CSRF على الطلبات اللي بتكتب.`,
            R`[[TokenAuthentication]]: header [[Authorization: Token <key>]] بيتدوّر عليه في جدول [[authtoken_token]]، للموبايل والسكربتات. التوكن ده مبينتهيش لوحده.`,
            R`قفل لستة الـ authentication classes.`,
            R`[[DEFAULT_PAGINATION_CLASS]]: كل list في كل viewset بتتقسّم صفحات بـ [[?page=]]، من غير ما تكتب حاجة في كل viewset.`,
            R`[[PAGE_SIZE: 3]]: ٣ صفوف في الصفحة عشان نشوف الصفحات بداتا قليلة. في الإنتاج ٢٠ لـ ١٠٠ حسب حجم الصف.`,
            R`قفل [[REST_FRAMEWORK]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** لكل endpoint اختار الـ permission_classes من غير ما تبص: كتالوج منتجات عام، وطلبات اليوزر بتاعته، ولوحة تقارير للفريق، و webhook بيستقبل من بوابة دفع (بتوقيع).`, done: R`[[AllowAny]] أو [[IsAuthenticatedOrReadOnly]] للكتالوج، و [[IsAuthenticated]] + فلتر [[get_queryset]] بالمالك للطلبات، و [[IsAdminUser]] أو [[DjangoModelPermissions]] للتقارير، و [[AllowAny]] + فحص التوقيع جوه الـ view للـ webhook، وجنب كل واحدة سبب.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب الـ status قبل ما تشغّل: زائر بيعمل [[POST /api/reviews/]]، وسارة بتعمل review، وسارة تاني على نفس المنتج، وعمر بيعمل [[PATCH]] على review سارة، وعمر بيعمل [[DELETE]] عليه، وسارة بتعمل [[DELETE]]، وسارة بتبعت [[{"author": <id عمر>}]] في review جديد.`, done: R`[[403]] و [[201]] و [[400]] و [[403]] و [[403]] و [[204]] و [[201]] والـ review الأخير [[author_name]] بتاعه [[sara]] مش عمر، يعني الـ [[HiddenField]] تجاهل اللي اتبعت.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** viewset للطلبات فيه [[permission_classes = [IsAuthenticated]]] و [[queryset = Order.objects.all()]]، وعمر بيشوف طلبات كل الناس في [[GET /api/orders/]] ويقدر يفتح [[/api/orders/<أي رقم>/]]. صلّحه بـ [[get_queryset]].`, done: R`[[GET /api/orders/]] بيرجّع طلبات عمر بس ([[count]] اتغيّر)، و [[/api/orders/<طلب سارة>/]] بيرجّع [[404]] لعمر، و [[router.register]] بقى فيه [[basename="order"]] (من غيره [[AssertionError]]).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على ١٠٠٠ منتج، قارن [[PageNumberPagination]] و [[CursorPagination]] لآخر صفحة: عدد الـ queries، و SQL كل واحدة ([[COUNT]] و [[OFFSET]])، والوقت بـ [[CaptureQueriesContext]].`, done: R`الـ page-number بيعمل [[2]] queries منهم [[COUNT(*)]] والتانية فيها [[OFFSET]] كبير، والـ cursor بيعمل [[1]] من غير [[COUNT]] ولا [[OFFSET]] (فيه [[WHERE created_at < ...]])، وكاتب الرقمين.` },
            { lvl: 'تحدي', t: R`**ابني:** [[ScopedRateThrottle]] على endpoint [[/api/token/]] بـ [[5/minute]] عشان تخمين الباسوردات، و [[UserRateThrottle]] عام [[100/minute]]، والإعدادات بتقرا الأرقام من env. واكتب اختبار بيعمل ٦ طلبات ويتأكد من [[429]] و [[Retry-After]].`, done: R`الطلب السادس على [[/api/token/]] بيرجّع [[429]] و [[Retry-After]] رقم، والـ endpoints التانية لسه [[200]]، والاختبار بيمسح الـ cache في الأول ([[cache.clear()]]) فبيعدّي مرتين ورا بعض.` },
          ],
          try: R`اعمل الـ model والـ serializer والـ permission والـ viewset، و [[migrate]]. اعمل يوزرين وتوكن لكل واحد ([[Token.objects.create(user=...)]] أو [[/api/token/]])، واكتب review بالأول، وحاول تعدّله بالتاني. وبعدين خلّي [[GET /api/reviews/]] يرجّع reviews اليوزر الحالي بس لما يبعت [[?mine=1]].`,
          solCode: R`class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    def get_queryset(self):
        qs = Review.objects.select_related("author").order_by("-created_at")
        if self.request.query_params.get("mine") == "1" and self.request.user.is_authenticated:
            qs = qs.filter(author=self.request.user)
        return qs`,
          sol: R`التعديل باليوزر التاني بيرجع [[403]] و [[{"detail":"You do not have permission to perform this action."}]]، والمسح بصاحبها [[204]].

ولما تستبدل [[queryset]] بـ [[get_queryset()]]، الـ router مبيعرفش اسم الـ URL لوحده، فلازم [[router.register("reviews", ReviewViewSet, basename="review")]]، وإلا هيرمي [[AssertionError]] إن [[basename]] مش متحدد. و [[self.request.query_params]] هو [[request.GET]] بتاع DRF. و [[?mine=1]] من غير دخول بيرجّع الكل (الشرط [[is_authenticated]] بيمنع [[filter(author=AnonymousUser)]] اللي كان هيرمي error).`
        },
        {
          cmd: "OpenAPI بـ drf-spectacular",
          title: "توثيق الـ API لوحده: schema و Swagger UI و extend_schema",
          learn: R`تولّد ملف OpenAPI 3 للـ API كله من الـ serializers والـ viewsets، وتفتح صفحة Swagger تجرّب منها، وتوصف الـ views اللي DRF ميعرفش شكل ردها بـ [[extend_schema]]، وتخلّي الـ CI يفشل لو التوثيق ناقص.`,
          out: R`[[/api/docs/]] فيها كل endpoint بحقوله وقواعده (الطول، والأقل قيمة، واللي للقراية بس)، وملف [[schema.yml]] يتعمله commit ويتولّد منه client للـ frontend.`,
          use: {
            prog: R`نفس اللي FastAPI بيعمله لوحده على [[/docs]] (درس «fastapi dev»)، هنا بمكتبة واحدة. والـ schema بيتولّد منه TypeScript client للـ React أو الموبايل، فأي تغيير في الـ API بيبان كـ error في الـ frontend مش في الإنتاج.`,
            work: R`فريق الـ frontend أو شركة تانية هتستخدم الـ API بتاعك بتسأل أول حاجة «فين الـ docs؟». لينك [[/api/docs/]] بيوفّر اجتماعات وإيميلات.`,
          },
          desc: R`[[drf-spectacular]] بيقرا الـ viewsets والـ serializers والـ permissions والـ pagination ويكتب ملف **OpenAPI 3** (الوصف القياسي للـ APIs): كل مسار، وكل method، وكل حقل بنوعه وقواعده. [[python manage.py spectacular --file schema.yml]] بيكتبه في ملف، و [[SpectacularAPIView]] بيقدّمه على [[/api/schema/]]، و [[SpectacularSwaggerView]] بيعمل صفحة Swagger UI على [[/api/docs/]] تجرّب منها الطلبات.

الـ [[ModelViewSet]] بيتوصف لوحده صح. لكن view بـ [[@api_view]] بترجّع [[Response({...})]] من غير serializer، المكتبة متعرفش شكل ردها، فبتطبع error وتكتب «No response body». الحل [[@extend_schema(responses=...)]].`,
          deep: {
            why: R`التوثيق المكتوب بإيدك بيقدم من أول PR: حد زوّد حقل ونسي يكتبه. الـ schema اللي بيتولّد من الكود نفسه مبيقدمش، وبيتعمله diff في كل PR فتشوف التغيير في الـ API بعينك، وبيتولّد منه clients واختبارات contract.`,
            how: R`[[DEFAULT_SCHEMA_CLASS = "drf_spectacular.openapi.AutoSchema"]] بيخلّي كل view في DRF ليها object بيعرف يوصفها. المكتبة بتلف على الـ URLconf، ولكل view بتسأل الـ [[serializer_class]] عن الحقول (النوع من الـ model field، و [[max_length]] بيبقى [[maxLength]]، و [[PositiveIntegerField]] بيبقى [[minimum: 0]]، و [[read_only]] بيبقى [[readOnly: true]])، والـ [[pagination_class]] عن الـ query parameters ([[page]] أو [[cursor]])، والـ authentication classes عن [[securitySchemes]] ([[cookieAuth]] و [[tokenAuth]]).

لـ [[APIView]] أو [[@api_view]] من غير serializer، مفيش حاجة تتقري، فبتطبع [[Error [stats]: unable to guess serializer]] وتكمّل. [[@extend_schema]] بيدّيلها الناقص: [[request]] و [[responses]] و [[parameters]] و [[summary]]. و [[inline_serializer(name, fields)]] بيعمل serializer على السريع للوصف بس.

و [[--fail-on-warn]] بيخلّي الأمر يخرج بـ [[1]] لو فيه أي error أو warning، فتحطه في CI. من غيره الأمر بيخرج بـ [[0]] حتى مع errors.`,
            when: R`أي API هيستخدمه حد غيرك: frontend في فريق تاني، أو موبايل، أو عميل. وكمان لو عايز تولّد client بـ [[openapi-typescript]] أو [[openapi-generator]]. ولـ API داخلي صغير بتستخدمه لوحدك، الـ Browsable API بتاع DRF ممكن يكفي.`,
            mistakes: R`تشغّل [[spectacular]] وتشوف الملف اتعمل وتفتكر كله تمام، والـ exit code [[0]] رغم [[Errors: 4]]: لازم [[--fail-on-warn]]. وتسيب [[@api_view]] من غير [[extend_schema]] فالـ docs تقول «No response body» والـ frontend يتلخبط. وتفتح [[/api/docs/]] في الإنتاج للعالم وهو API داخلي (حطها ورا [[IsAdminUser]] بـ [[SERVE_PERMISSIONS]]). وتصدّق كل حاجة في الـ schema: [[PositiveIntegerField]] طلع [[maximum: 9223372036854775807]] (int64) والعمود في القاعدة [[integer]] (أقصاه ٢١٤٧٤٨٣٦٤٧).`,
          },
          teach: R`## المثال بيعمل إيه؟

بيضيف drf-spectacular لمشروع الـ API بتاع الدروس اللي فاتت: إعدادات، و URLين (الـ schema وصفحة Swagger)، و view إحصائيات موصوفة بـ [[extend_schema]]. اتشغّل بـ drf-spectacular 0.30.0 و DRF 3.18.3 و Django 6.1.2 على SQLite في Python 3.14 على ويندوز.

~~~bash
pip install drf-spectacular
~~~

---

## ١. الإعدادات والـ URLs

~~~python
INSTALLED_APPS += ["drf_spectacular"]
REST_FRAMEWORK["DEFAULT_SCHEMA_CLASS"] = "drf_spectacular.openapi.AutoSchema"
SPECTACULAR_SETTINGS = {"TITLE": "Shop API", "VERSION": "1.0.0"}
~~~

| السطر | ليه |
|---|---|
| [[INSTALLED_APPS += ["drf_spectacular"]]] | عشان الـ templates بتاعة Swagger وأمر [[spectacular]] يتلاقوا |
| [[DEFAULT_SCHEMA_CLASS]] | كل view في DRF هتتوصف بـ [[AutoSchema]] بتاع المكتبة بدل اللي جاي مع DRF |
| [[SPECTACULAR_SETTINGS]] | العنوان والنسخة اللي بيظهروا في أول الـ schema وفوق صفحة Swagger |

~~~python
urlpatterns += [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
]
~~~

~~~text اتشغّل فعلًا · الناتج (طلبات بالـ test client)
200 True
200 application/vnd.oai.openapi; charset=utf-8 openapi: 3.0.3
200 application/vnd.oai.openapi+json
~~~

- [[/api/docs/]]: [[200]] وفيها [[swagger-ui]]: الصفحة بتحمّل الـ schema من [[url_name="schema"]] وتعرضه، وتقدر تدوس «Try it out» وتبعت طلب.
- [[/api/schema/]]: الملف YAML، وأول سطر [[openapi: 3.0.3]].
- [[?format=json]]: نفس الملف JSON.

---

## ٢. الأمر وإيه اللي اتكتب

~~~bash
python manage.py spectacular --file schema.yml
~~~

الملف فيه ١٢ مسار تحت [[/api]] (المنتجات والـ reviews والبحث والصفحات والتوكن)، والـ [[ProductSerializer]] بتاع درس «DRF serializers و viewsets» اتوصف كده:

~~~text schema.yml (مختصر)
    Product:
      type: object
      properties:
        name:
          type: string
          maxLength: 200
        category_name:
          type: string
          readOnly: true
        price_cents:
          type: integer
          maximum: 9223372036854775807
          minimum: 0
          format: int64
~~~

| في الكود | في الـ schema |
|---|---|
| [[CharField(max_length=200)]] | [[maxLength: 200]]: الـ frontend يقدر يمنع الكتابة بعد ٢٠٠ حرف |
| [[source="category.name", read_only=True]] | [[readOnly: true]]: مبيتبعتش في الـ POST |
| [[PositiveIntegerField]] | [[minimum: 0]]، بس [[maximum]] طلع رقم int64 والعمود في القاعدة [[integer]] (أقصاه ٢١٤٧٤٨٣٦٤٧). الـ schema مش دايمًا دقيق ١٠٠٪ |

وقاعدتك في [[validate_price_cents]] (أقل حاجة ١٠٠) **مش** في الـ schema: المكتبة متقدرش تقرا كود Python. لو مهمة للـ frontend اكتبها في [[help_text]] أو [[extend_schema_field]].

---

## ٣. view من غير serializer

~~~python
@api_view(["GET"])
def stats(request):
    return Response({"categories": Category.objects.count(), "products": Product.objects.count()})
~~~

~~~text الناتج
...\shop\api.py: Error [stats]: unable to guess serializer. This is graceful fallback handling for APIViews. Consider using GenericAPIView as view base class, if view is under your control. Either way you may want to add a serializer_class (or method). Ignoring view for now.

Schema generation summary:
Warnings: 0 (0 unique)
Errors:   4 (1 unique)
exit=0
~~~

والـ schema كتب للمسار ده [[description: No response body]]: كذب، الـ view بترجّع JSON. ولاحظ [[exit=0]]: الأمر نجح رغم الـ errors. بـ [[--fail-on-warn]] خرج بـ [[1]]، وده اللي تحطه في CI.

### الحل: [[extend_schema]]

~~~python
@extend_schema(responses=inline_serializer("Stats", {"categories": serializers.IntegerField(), "products": serializers.IntegerField()}))
@api_view(["GET"])
def stats(request):
    ...
~~~

~~~text schema.yml
    Stats:
      type: object
      properties:
        categories:
          type: integer
        products:
          type: integer
      required:
      - categories
      - products
~~~

دلوقتي الرد موصوف بـ object اسمه [[Stats]]. و [[@extend_schema]] لازم **فوق** [[@api_view]] (بيتطبّق على اللي [[api_view]] رجّعه).

### الأمان

الـ schema بيكتب [[securitySchemes]] من الـ authentication classes: [[cookieAuth]] (الـ session) و [[tokenAuth]] ([[Authorization]] header وفي الوصف [[Token-based authentication with required prefix "Token"]]). فزرار «Authorize» في Swagger بيعرف يبعت التوكن.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الملف | [[python manage.py spectacular --file schema.yml]] |
| CI يفشل لو ناقص | [[--fail-on-warn]] |
| صفحة تجرّب منها | [[SpectacularSwaggerView.as_view(url_name="schema")]] |
| view من غير serializer | [[@extend_schema(responses=...)]] فوق [[@api_view]] |
| رد شكله بسيط | [[inline_serializer("Name", {...})]] |

- الـ [[ModelViewSet]] بيتوصف لوحده، والـ views اليدوية لأ.
- اعمل commit للـ [[schema.yml]]، فأي تغيير في الـ API يبان في الـ diff.`,
          example: R`# config/settings.py:
INSTALLED_APPS += ["drf_spectacular"]
REST_FRAMEWORK["DEFAULT_SCHEMA_CLASS"] = "drf_spectacular.openapi.AutoSchema"
SPECTACULAR_SETTINGS = {"TITLE": "Shop API", "VERSION": "1.0.0"}
# config/urls.py:
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
urlpatterns += [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
]
# shop/api.py:
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, Product
@extend_schema(responses=inline_serializer("Stats", {"categories": serializers.IntegerField(), "products": serializers.IntegerField()}))
@api_view(["GET"])
def stats(request):
    return Response({"categories": Category.objects.count(), "products": Product.objects.count()})`,
          flag: "script",
          lines: [
            R`[[INSTALLED_APPS += ["drf_spectacular"]]]: سجّل المكتبة كـ app عشان أمر [[manage.py spectacular]] يظهر وعشان templates صفحة Swagger تتلاقي.`,
            R`[[REST_FRAMEWORK["DEFAULT_SCHEMA_CLASS"] = "drf_spectacular.openapi.AutoSchema"]]: كل view في DRF هتتوصف بالـ class ده. لو نسيته، الأمر بيقع بـ [[AssertionError: Incompatible AutoSchema used on View ...]] (جربتها).`,
            R`[[SPECTACULAR_SETTINGS = {"TITLE": "Shop API", "VERSION": "1.0.0"}]]: إعدادات المكتبة: العنوان والنسخة في [[info]] أول الملف. وفيه كمان [[SERVE_PERMISSIONS]] لو عايز الـ docs للأدمن بس.`,
            R`[[from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView]]: اتنين views جاهزين: واحد بيرجّع الـ schema، وواحد بيرجّع صفحة HTML فيها Swagger UI.`,
            R`[[urlpatterns += [...]]]: بنزوّد على المسارات اللي موجودة في [[config/urls.py]] (الـ router والـ admin).`,
            R`[[path("api/schema/", SpectacularAPIView.as_view(), name="schema")]]: الـ schema نفسه، YAML افتراضيًا ([[application/vnd.oai.openapi]]) و JSON بـ [[?format=json]]. بيتولّد من الكود مع كل طلب.`,
            R`[[path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs")]]: صفحة Swagger. [[url_name="schema"]] اسم الـ URL اللي فوق، والصفحة بتطلبه من المتصفح وتعرضه.`,
            R`قفل اللستة اللي بتتزوّد على [[urlpatterns]].`,
            R`[[from drf_spectacular.utils import extend_schema, inline_serializer]]: [[extend_schema]] decorator بيكمّل وصف view، و [[inline_serializer]] بيعمل serializer صغير للوصف بس من غير ما تكتب class.`,
            R`[[from rest_framework import serializers]]: عشان أنواع الحقول ([[IntegerField]]) اللي بنوصف بيها الرد.`,
            R`[[from rest_framework.decorators import api_view]]: بيحوّل function عادية لـ view بتاعة DRF (الـ authentication والصلاحيات و [[Response]] بيشتغلوا).`,
            R`[[from rest_framework.response import Response]]: رد DRF اللي بيتحوّل JSON أو Browsable API حسب الـ [[Accept]].`,
            R`[[from .models import Category, Product]]: الـ models اللي بنعدّها.`,
            R`[[@extend_schema(responses=inline_serializer("Stats", {...}))]]: الرد [[200]] شكله object اسمه [[Stats]] فيه رقمين إجباريين. لازم يبقى **فوق** [[@api_view]]، لأن الـ decorators بتتطبّق من تحت لفوق.`,
            R`[[@api_view(["GET"])]]: GET بس، وأي method تاني [[405]]. ومن غير [[extend_schema]] فوقها، المكتبة كانت هتطبع [[unable to guess serializer]] وتكتب [[No response body]].`,
            R`[[def stats(request)]]: view بترجّع إحصائيات للـ dashboard.`,
            R`[[return Response({"categories": ..., "products": ...})]]: [[count()]] مرتين في القاعدة. المكتبة مبتقراش السطر ده: الوصف كله من [[extend_schema]]، فلو زوّدت مفتاح هنا ونسيت تزوّده فوق، الـ docs هتبقى ناقصة.`,
          ],
          try: R`سطّب المكتبة وضيف الإعدادات والـ URLs، وافتح [[/api/docs/]] وجرّب [[GET /api/products/]] من الصفحة. وبعدين اعمل [[python manage.py spectacular --file schema.yml]] ودوّر في الملف على [[Product:]] وقارنه بالـ serializer. وأخيرًا ضيف view [[stats]] من غير [[extend_schema]] وشغّل الأمر بـ [[--fail-on-warn]] واطبع الـ exit code.`,
          sol: R`صفحة Swagger فيها كل الـ viewsets متقسمة بـ tags ([[products]] و [[reviews]]...)، والـ list فيها باراميتر [[page]] من الـ pagination. وفي [[schema.yml]] الـ [[Product]] فيه [[maxLength: 200]] و [[readOnly: true]] لـ [[category_name]] و [[created_at]]، و [[required]] فيها الحقول الإجبارية.

و [[stats]] من غير [[extend_schema]]: [[Error [stats]: unable to guess serializer]] و [[Errors: 4 (1 unique)]]، والـ exit code [[0]] من غير الـ flag و [[1]] بيه. ولما تزوّد [[@extend_schema(...)]] فوق [[@api_view]] الـ error بيختفي ويظهر [[Stats]] في [[components.schemas]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** ضيف drf-spectacular لمشروعك من غير ما تبص (التسطيب والإعدادات التلاتة والـ URLين)، وافتح [[/api/docs/]].`, done: R`[[/api/docs/]] بترجّع [[200]] وفيها كل الـ viewsets، و [[/api/schema/]] أول سطر فيها [[openapi: 3.0.3]]، و [[python manage.py spectacular --fail-on-warn --file schema.yml]] بيخرج بـ [[0]] لو كل الـ views viewsets.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** من غير ما تفتح الملف، اكتب إزاي هيتوصف كل حقل في [[ReviewSerializer]] بتاع درس «DRF permissions و pagination»: [[author]] (HiddenField)، و [[author_name]]، و [[rating]]، و [[body]] (blank). وبعدين افتح [[schema.yml]] وقارن.`, done: R`[[author]] مش موجود خالص (مخفي)، و [[author_name]] [[readOnly]]، و [[rating]] [[integer]] بـ [[minimum: 0]] و [[maximum]] رقم int64 كبير (قاعدة ١ لـ ٥ مش ظاهرة لأنها في [[validate_rating]])، و [[body]] مش في [[required]]، وكاتب أنهي توقّع كان غلط.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** الـ frontend بيشتكي إن [[/api/stats/]] في الـ docs مكتوب «No response body» وإن الـ client اللي اتولّد بيرجّع [[void]]. صلّحها، وخلّي الـ CI يمسك الحالة دي تاني.`, done: R`[[@extend_schema(responses=...)]] فوق [[@api_view]] والـ schema فيه [[Stats]]، وفي ملف الـ CI أمر [[spectacular --fail-on-warn]]، ولما تشيل الـ decorator عن قصد الـ CI بيفشل بـ exit code [[1]].` },
            { lvl: 'تحدي', t: R`**ابني:** ولّد TypeScript types من [[schema.yml]] بـ [[npx openapi-typescript schema.yml -o api.d.ts]]، واكتب دالة [[getProducts(page)]] في TypeScript بتستخدم النوع [[components["schemas"]["PaginatedProductList"]]]، وغيّر اسم حقل في الـ serializer وشوف الـ frontend بيكسر.`, done: R`[[api.d.ts]] فيه [[PaginatedProductList]] و [[Product]] بالحقول، و [[tsc --noEmit]] بيعدّي، وبعد ما غيّرت [[stock]] لـ [[quantity]] في الـ serializer وولّدت تاني، [[tsc]] طلّع error في السطر اللي بيقرا [[stock]].` },
          ],
        },
        {
          cmd: "pytest-django",
          title: "تختبر الـ API والصلاحيات وعدد الـ queries بـ pytest",
          desc: R`[[pip install pytest-django]] وملف [[pytest.ini]] فيه [[DJANGO_SETTINGS_MODULE = config.settings]]، وبعدها [[pytest]] بيعمل قاعدة اختبار فاضية ([[test_shop]])، وكل اختبار عليه [[@pytest.mark.django_db]] بيشتغل جوه transaction بتترجع في الآخر.

الـ fixtures الجاهزة: [[client]] و [[admin_user]] و [[admin_client]] و [[django_assert_num_queries]] (يفشّل الاختبار لو الـ queries زادت). ومع DRF: [[APIClient]] و [[force_authenticate]]. أساسيات pytest نفسها (fixtures و parametrize) في تاب Python.`,
          deep: {
            why: R`الصلاحيات والفحص والـ N+1 حاجات بتبوظ في صمت: حد يشيل [[select_related]] أو يغيّر permission، والصفحة لسه شغالة. اختبار بيقول «الضيف ميقدرش يكتب» و «الـ list بـ ٢ queries» بيمسكها في CI قبل ما توصل الإنتاج. و pytest أقصر من [[unittest]] اللي Django بييجي بيه ([[manage.py test]]): [[assert]] عادي و fixtures بدل [[setUp]].`,
            how: R`pytest-django بيقرا [[DJANGO_SETTINGS_MODULE]] من [[pytest.ini]] (أو [[pyproject.toml]] تحت [[[tool.pytest.ini_options]]]) ويعمل [[django.setup()]]. أول اختبار محتاج القاعدة بيعمل قاعدة باسم [[test_]] + اسمها، ويطبّق الـ migrations عليها. و [[--reuse-db]] بيسيبها بعد الـ run عشان المرة الجاية أسرع، و [[--create-db]] بيعيد عملها (بعد migration جديد).

من غير [[django_db]] أي query بترمي [[RuntimeError: Database access not allowed]]: ده قصد، عشان تعرف أنهي اختبار بيلمس القاعدة. و [[django_db(transaction=True)]] لو الكود نفسه بيعتمد على commit حقيقي ([[on_commit]] مثلًا).

[[APIClient]] من DRF زي [[Client]] بتاع Django بس بيفهم [[format="json"]]، و [[force_authenticate(user)]] بيعدّي الـ authentication (بتختبر الصلاحيات مش التوكن). و [[r.json()]] بيفك الرد.

[[django_assert_num_queries(2)]] context manager: لو عدد الـ queries جواه مختلف عن ٢، الاختبار يفشل ويقولك عملت كام (و [[-v]] بيطبعهم). و [[django_assert_max_num_queries]] لو عايز حد أقصى بس. pytest-django بيقفل [[DEBUG]] وقت الاختبارات، زي الإنتاج.`,
            when: R`اختبار لكل endpoint: الحالة العادية، والفحص (400)، والصلاحيات (401/403)، والـ object permissions، وعدد الـ queries لكل list. ويشتغلوا في CI على Postgres زي الإنتاج (service container في GitHub Actions).`,
            mistakes: R`تختبر على SQLite والإنتاج Postgres، فحاجات زي [[icontains]] على حروف عربي أو [[JSONField]] بتفرق. وتعتمد على ترتيب الاختبارات أو داتا من اختبار قبله (كل اختبار بيترجع). و [[--reuse-db]] بعد migration جديد من غير [[--create-db]] فالقاعدة القديمة ناقصها عمود. وتختبر الـ token authentication في كل اختبار بدل [[force_authenticate]]. ويوزر الاختبارات في Postgres من غير صلاحية [[CREATEDB]] ([[permission denied to create database]]).`
          },
          teach: R`## المثال بيعمل إيه؟

ملف إعدادات لـ pytest، وملف اختبارات للـ API بتاع الدرسين اللي فاتوا: صفحات، وعدد queries، وضيف ميكتبش، وفحص السعر، وصاحب الـ review بس يعدّله. اتشغّل بـ pytest 9.1.1 و pytest-django 4.14.0 و Django 6.1.2 على Postgres 16 في Docker.

---

## ١. [[pytest.ini]]

~~~text pytest.ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings
python_files = test_*.py
addopts = --reuse-db
~~~

| السطر | معناه |
|---|---|
| [[DJANGO_SETTINGS_MODULE]] | ملف الإعدادات، زي [[manage.py]] |
| [[python_files = test_*.py]] | الملفات اللي فيها اختبارات |
| [[addopts = --reuse-db]] | سيب قاعدة الاختبار بين الـ runs |

> الإعدادات بتقرا [[DJANGO_SECRET_KEY]] من الـ environment (درس «settings من env»)، فحمّله قبل [[pytest]] زي أي أمر.

---

## ٢. الـ fixtures

~~~python
@pytest.fixture
def api():
    return APIClient()
@pytest.fixture
def cables():
    category = Category.objects.create(name="Cables")
    for i in range(5):
        Product.objects.create(category=category, name=f"Cable {i}", price_cents=1000 + i, stock=i)
    return category
~~~

- [[@pytest.fixture]]: دالة بتجهّز حاجة، وأي اختبار يكتب اسمها في الباراميترز ياخدها.
- [[api]]: client جديد لكل اختبار.
- [[cables]]: قسم وفيه ٥ منتجات. الداتا دي بتتمسح بعد كل اختبار (الـ transaction بتترجع).

---

## ٣. الاختبارات

### الصفحات

~~~python
@pytest.mark.django_db
def test_list_is_paginated(api, cables):
    r = api.get("/api/products/")
    assert r.status_code == 200
    assert r.json()["count"] == 5
    assert len(r.json()["results"]) == 3
~~~

- [[@pytest.mark.django_db]]: الاختبار ده مسموحله يكلّم القاعدة.
- ٥ منتجات و [[PAGE_SIZE = 3]]، فالصفحة الأولى ٣.

### عدد الـ queries

~~~python
@pytest.mark.django_db
def test_list_query_count(api, cables, django_assert_num_queries):
    with django_assert_num_queries(2):
        api.get("/api/products/")
~~~

٢ = [[COUNT]] للصفحات + [[SELECT]] بالـ JOIN. شلت [[select_related("category")]] من الـ viewset وشغّلت:

~~~text الناتج
E               Failed: Expected to perform 2 queries but 5 were done (add -v option to show queries)
FAILED shop/tests/test_api.py::test_list_query_count - Failed: Expected to pe...
1 failed, 4 deselected in 0.92s
~~~

٥ = الـ ٢ + query لقسم كل منتج من الـ ٣ اللي في الصفحة. الاختبار مسك الـ N+1.

### الصلاحيات والفحص

~~~python
@pytest.mark.django_db
def test_anonymous_cannot_create(api, cables):
    r = api.post("/api/products/", {"name": "X", "category": cables.pk, "price_cents": 500}, format="json")
    assert r.status_code == 403
@pytest.mark.django_db
def test_price_validation(api, cables, admin_user):
    api.force_authenticate(admin_user)
    r = api.post("/api/products/", {"name": "X", "category": cables.pk, "price_cents": 50}, format="json")
    assert r.status_code == 400
    assert "price_cents" in r.json()
~~~

- [[format="json"]]: ابعت الـ dict كـ JSON بـ [[Content-Type: application/json]].
- [[admin_user]]: fixture جاهزة: superuser اسمه [[admin]].
- [[force_authenticate]]: اعتبر الطلبات جاية من اليوزر ده.

### صاحب الـ review

~~~python
@pytest.mark.django_db
def test_only_author_can_edit_review(api, cables):
    sara = User.objects.create_user("sara", password="x-test-pass")
    omar = User.objects.create_user("omar", password="x-test-pass")
    product = cables.products.first()
    api.force_authenticate(sara)
    review_id = api.post("/api/reviews/", {"product": product.pk, "rating": 5}, format="json").json()["id"]
    api.force_authenticate(omar)
    assert api.patch(f"/api/reviews/{review_id}/", {"rating": 1}, format="json").status_code == 403
~~~

sara بتكتب، و omar بيحاول يعدّل: 403. ده الاختبار اللي بيحمي من ثغرة IDOR.

---

## ٤. التشغيل

~~~bash
pytest -v
~~~

~~~text الناتج
platform linux -- Python 3.13.18, pytest-9.1.1, pluggy-1.7.0 -- /usr/local/bin/python3.13
django: version: 6.1.2, settings: config.settings (from ini)
rootdir: /work/dj
configfile: pytest.ini
plugins: django-4.14.0
collecting ... collected 5 items

shop/tests/test_api.py::test_list_is_paginated PASSED                    [ 20%]
shop/tests/test_api.py::test_list_query_count PASSED                     [ 40%]
shop/tests/test_api.py::test_anonymous_cannot_create PASSED              [ 60%]
shop/tests/test_api.py::test_price_validation PASSED                     [ 80%]
shop/tests/test_api.py::test_only_author_can_edit_review PASSED          [100%]
~~~

- [[django: version: 6.1.2, settings: config.settings (from ini)]]: pytest-django لقى الإعدادات من [[pytest.ini]].
- [[-v]]: سطر لكل اختبار. و [[-q]] مختصر: [[5 passed in 2.96s]].
- [[-k query_count]]: شغّل الاختبارات اللي اسمها فيه الكلمة دي بس.

وبعد الـ run، القواعد على السيرفر كانت [[shop]] و [[test_shop]]: دي قاعدة الاختبار اللي [[--reuse-db]] سابها. و [[pytest --create-db]] بيعيد عملها.

### من غير [[django_db]]

~~~text الناتج
E       RuntimeError: Database access not allowed, use the "django_db" mark, or the "db" or "transactional_db" fixtures to enable it.
~~~

---

## ٥. حالات طرفية بـ [[parametrize]]

بدل ٥ اختبارات شبه بعض، اختبار واحد بجدول حالات. اتجرّب بـ pytest 9.2.0 و pytest-django 4.14.0 على SQLite:

~~~python
@pytest.mark.django_db
@pytest.mark.parametrize("price, status", [(99, 400), (100, 201), (-1, 400), ("abc", 400)])
def test_price_edges(api, cables, admin_user, price, status):
    api.force_authenticate(admin_user)
    r = api.post("/api/products/", {"name": "X", "category": cables.pk, "price_cents": price}, format="json")
    assert r.status_code == status, r.json()
~~~

- [[parametrize("price, status", [...])]]: pytest بيشغّل الاختبار مرة لكل tuple، وبيدّي كل مرة اسم زي [[test_price_edges[100-201] ]].
- [[, r.json()]] بعد الـ assert: لو فشل، الرسالة فيها الرد نفسه، فتعرف السبب من غير ما تعيد التشغيل.
- الحدود: [[99]] و [[100]] بالظبط حوالين القاعدة، و [[-1]] و [["abc"]] فحص DRF نفسه قبل قاعدتك.

~~~text الناتج
9 passed in 4.95s
~~~

---

## ٦. أسرع ١٠ مرات: الباسوردات في الاختبارات

~~~text pytest --durations=3
1.20s call     test_api.py::test_only_author_can_edit_review
0.69s setup    test_api.py::test_price_edges[100-201]
0.68s setup    test_api.py::test_price_edges[-1-400]
~~~

أبطأ حاجة مش القاعدة: [[create_user]]، لأن الباسورد بيتعمله hash بـ PBKDF2 مليون ونص مرة (درس «Django auth»)، و [[admin_user]] بيعمل نفس الحاجة. في الاختبارات مش محتاج الأمان ده:

~~~python
# conftest.py
import pytest
@pytest.fixture(autouse=True)
def fast_hasher(settings):
    settings.PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
~~~

- [[conftest.py]]: pytest بيقراه لوحده، والـ fixtures اللي فيه متاحة لكل الاختبارات اللي تحته.
- [[autouse=True]]: بتشتغل مع كل اختبار من غير ما يكتب اسمها.
- [[settings]]: fixture من pytest-django بتغيّر إعداد للاختبار ده بس، وبترجّعه بعده.

~~~text اتشغّل فعلًا · الناتج
9 passed in 0.50s
~~~

من [[4.95s]] لـ [[0.50s]]. و MD5 هنا للاختبارات بس: في الإنتاج ممنوع.

---

## ٧. [[settings]] و [[mailoutbox]] و [[on_commit]]

~~~python
def notify(email):
    transaction.on_commit(lambda: mail.send_mail("Order", "Thanks", "shop@example.com", [email]))
@pytest.mark.django_db
def test_email_after_commit(mailoutbox, django_capture_on_commit_callbacks):
    with django_capture_on_commit_callbacks(execute=True) as callbacks:
        notify("sara@example.com")
    assert len(callbacks) == 1
    assert len(mailoutbox) == 1
    assert mailoutbox[0].to == ["sara@example.com"]
@pytest.mark.django_db
def test_without_capture_no_email(mailoutbox):
    notify("sara@example.com")
    assert len(mailoutbox) == 0
def test_settings_fixture(settings):
    settings.PAGE_LIMIT = 7
~~~

~~~text الناتج
4 passed in 0.23s
~~~

| الأداة | بتعمل إيه |
|---|---|
| [[mailoutbox]] | الإيميلات بتتحط في list بدل ما تتبعت. كل اختبار بيبدأ بـ list فاضية |
| [[django_capture_on_commit_callbacks(execute=True)]] | بيمسك الـ callbacks اللي اتسجّلت بـ [[on_commit]] وبينفّذها في آخر البلوك |
| الاختبار التاني | **من غير** الـ capture، الإيميل متبعتش: الاختبار جوه transaction عمرها ما بتعمل commit، فـ [[on_commit]] متنفذتش. اختبار بيقول «اتبعت» من غير الـ fixture دي بيكذب |
| [[settings]] | [[settings.PAGE_LIMIT = 7]] للاختبار ده بس. اختبار بعده اتأكد إن [[PAGE_LIMIT]] مش موجود |

> وفي [[unittest]] بتاع Django ([[manage.py test]]) نفس الأفكار اسمها [[self.assertNumQueries]] و [[self.captureOnCommitCallbacks]] و [[@override_settings]]. مثال [[assertNumQueries]] متشغّل في درس «select_related و prefetch_related».

---

## الخلاصة

| عايز | استخدم |
|---|---|
| pytest يعرف Django | [[DJANGO_SETTINGS_MODULE]] في [[pytest.ini]] |
| اختبار بيلمس القاعدة | [[@pytest.mark.django_db]] |
| طلبات للـ API | [[APIClient]] + [[format="json"]] |
| يوزر من غير توكن | [[force_authenticate(user)]] أو [[admin_user]] |
| تثبّت عدد الـ queries | [[django_assert_num_queries(n)]] |
| أسرع | [[--reuse-db]]، و [[--create-db]] بعد migration، و [[MD5PasswordHasher]] في [[conftest.py]] |
| حالات طرفية كتير | [[@pytest.mark.parametrize]] |
| إيميلات و [[on_commit]] | [[mailoutbox]] و [[django_capture_on_commit_callbacks(execute=True)]] |
| اليوزر في الاختبارات | [[get_user_model()]]، مش [[django.contrib.auth.models.User]] |`,
          example: R`# pytest.ini:
# [pytest]
# DJANGO_SETTINGS_MODULE = config.settings
# python_files = test_*.py
# addopts = --reuse-db
# shop/tests/test_api.py:
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from shop.models import Category, Product
User = get_user_model()
@pytest.fixture
def api():
    return APIClient()
@pytest.fixture
def cables():
    category = Category.objects.create(name="Cables")
    for i in range(5):
        Product.objects.create(category=category, name=f"Cable {i}", price_cents=1000 + i, stock=i)
    return category
@pytest.mark.django_db
def test_list_is_paginated(api, cables):
    r = api.get("/api/products/")
    assert r.status_code == 200
    assert r.json()["count"] == 5
    assert len(r.json()["results"]) == 3
@pytest.mark.django_db
def test_list_query_count(api, cables, django_assert_num_queries):
    with django_assert_num_queries(2):
        api.get("/api/products/")
@pytest.mark.django_db
def test_anonymous_cannot_create(api, cables):
    r = api.post("/api/products/", {"name": "X", "category": cables.pk, "price_cents": 500}, format="json")
    assert r.status_code == 403
@pytest.mark.django_db
def test_price_validation(api, cables, admin_user):
    api.force_authenticate(admin_user)
    r = api.post("/api/products/", {"name": "X", "category": cables.pk, "price_cents": 50}, format="json")
    assert r.status_code == 400
    assert "price_cents" in r.json()
@pytest.mark.django_db
def test_only_author_can_edit_review(api, cables):
    sara = User.objects.create_user("sara", password="x-test-pass")
    omar = User.objects.create_user("omar", password="x-test-pass")
    product = cables.products.first()
    api.force_authenticate(sara)
    review_id = api.post("/api/reviews/", {"product": product.pk, "rating": 5}, format="json").json()["id"]
    api.force_authenticate(omar)
    assert api.patch(f"/api/reviews/{review_id}/", {"rating": 1}, format="json").status_code == 403
# في الترمنال:
# pytest -v
# pytest -k query_count
# pytest --create-db`,
          flag: "script",
          learn: R`تختبر Django و DRF بـ pytest: قاعدة اختبار لوحدها، و fixtures للداتا واليوزرز، وطلبات JSON، والصلاحيات، وعدد الـ queries، والحالات الطرفية بـ parametrize، والإيميلات و [[on_commit]]، وتخلّي الاختبارات أسرع ١٠ مرات.`,
          out: R`ملف اختبارات بيمسك N+1 والثغرات والفحص الغلط قبل ما توصل الإنتاج، ومجموعة كاملة بتخلص في نص ثانية.`,
          use: {
            work: R`في أي شركة جد، الـ PR من غير اختبارات مبيتعملهوش merge. والـ CI بيشغّل [[pytest]] على كل push.`,
            prog: R`الاختبار بيوصف السلوك: «الزائر ميكتبش» و «القايمة بـ ٢ queries». لما حد يغيّر الكود بعد سنة، الاختبار هو اللي بيقوله إنه كسر حاجة.`,
          },
          lines: [
            R`[[import pytest]]: عشان [[@pytest.fixture]] و [[@pytest.mark.django_db]] و [[parametrize]]. أساسيات pytest نفسها في درس pytest في تاب Python.`,
            R`[[from django.contrib.auth import get_user_model]]: هات الـ User model اللي في [[AUTH_USER_MODEL]]. لو كتبت [[from django.contrib.auth.models import User]] في مشروع فيه User بتاعك (درس «Django auth»)، أول [[create_user]] بيرمي [[AttributeError: Manager isn't available; 'auth.User' has been swapped for 'accounts.User']].`,
            R`[[from rest_framework.test import APIClient]]: client بيبعت طلبات للـ API من غير سيرفر حقيقي، وبيفهم [[format="json"]] و [[force_authenticate]].`,
            R`[[from shop.models import Category, Product]]: الـ models اللي هنعمل منها داتا الاختبار.`,
            R`[[User = get_user_model()]]: الـ class الحقيقي (هنا [[accounts.User]]) في متغير، فباقي الملف يكتب [[User.objects.create_user]] عادي.`,
            R`[[@pytest.fixture]]: الدالة اللي تحت مش اختبار، دي «تجهيزة». أي اختبار يكتب اسمها في الباراميترز بياخد اللي بترجّعه.`,
            R`[[def api()]]: اسم الـ fixture هو اسم الدالة، فالاختبار بيكتب [[api]] في الباراميترز.`,
            R`[[return APIClient()]]: client جديد لكل اختبار، فـ [[force_authenticate]] في اختبار ميأثرش على اللي بعده.`,
            R`[[@pytest.fixture]]: fixture تانية للداتا.`,
            R`[[def cables()]]: قسم فيه ٥ منتجات. أي اختبار بيطلبها لازم يبقى عليه [[django_db]] لأنها بتكتب في القاعدة.`,
            R`[[Category.objects.create(name="Cables")]]: القسم. الداتا دي بتتمسح لوحدها بعد الاختبار لأن كل اختبار جوه transaction بترجع.`,
            R`[[for i in range(5)]]: خمس منتجات، أكتر من [[PAGE_SIZE = 3]] عشان نختبر إن فيه صفحة تانية.`,
            R`[[Product.objects.create(..., price_cents=1000 + i, stock=i)]]: أسعار مختلفة ومخزون من ٠ لـ ٤، فواحد منهم خلصان لو اختبار محتاجه.`,
            R`[[return category]]: الاختبار بياخد القسم، ويقدر يوصل لمنتجاته بـ [[cables.products]].`,
            R`[[@pytest.mark.django_db]]: الاختبار ده مسموحله يلمس القاعدة. من غيرها أي query بترمي [[RuntimeError: Database access not allowed]].`,
            R`[[def test_list_is_paginated(api, cables)]]: pytest بيشوف [[api]] و [[cables]] في الباراميترز ويشغّل الـ fixtures دي الأول.`,
            R`[[r = api.get("/api/products/")]]: طلب GET كزائر (مفيش [[force_authenticate]]).`,
            R`[[assert r.status_code == 200]]: [[assert]] عادي من Python. لو فشل pytest بيطبع القيمتين جنب بعض.`,
            R`[[assert r.json()["count"] == 5]]: [[r.json()]] بيفك الرد، و [[count]] من الـ pagination = كل الصفوف مش الصفحة.`,
            R`[[assert len(r.json()["results"]) == 3]]: الصفحة الأولى فيها ٣ بس ([[PAGE_SIZE]]).`,
            R`[[@pytest.mark.django_db]]: الاختبار التاني محتاج القاعدة كمان (كل اختبار ليه الـ mark بتاعه أو [[pytestmark]] للملف كله).`,
            R`[[def test_list_query_count(api, cables, django_assert_num_queries)]]: [[django_assert_num_queries]] fixture جاهزة من pytest-django.`,
            R`[[with django_assert_num_queries(2):]]: أي عدد queries غير ٢ جوه البلوك = فشل، ورسالة [[Expected to perform 2 queries but 5 were done]]. الـ ٢ هما [[COUNT]] للصفحات و [[SELECT]] بالـ JOIN.`,
            R`[[api.get("/api/products/")]]: الطلب اللي بنعدّ queries بتاعته. لو حد شال [[select_related]] من الـ viewset الاختبار ده بيفشل.`,
            R`[[@pytest.mark.django_db]]: اختبار الصلاحيات بيلمس القاعدة عشان الـ fixture بتاعة القسم.`,
            R`[[def test_anonymous_cannot_create(api, cables)]]: الزائر مينفعش يضيف منتج.`,
            R`[[api.post("/api/products/", {...}, format="json")]]: داتا سليمة تمامًا، فلو الرد [[400]] يبقى المشكلة في الداتا مش الصلاحية. [[format="json"]] بيبعتها JSON بـ [[Content-Type: application/json]].`,
            R`[[assert r.status_code == 403]]: [[DjangoModelPermissionsOrAnonReadOnly]] رفض. [[403]] مش [[401]] لأن أول authentication class هو Session.`,
            R`[[@pytest.mark.django_db]]: اختبار الفحص محتاج القاعدة عشان الـ fixtures بتعمل قسم ويوزر.`,
            R`[[def test_price_validation(api, cables, admin_user)]]: [[admin_user]] fixture جاهزة: superuser اسمه [[admin]] معاه كل الصلاحيات، فلو الطلب فشل يبقى السبب الفحص.`,
            R`[[api.force_authenticate(admin_user)]]: كل الطلبات من الـ client ده هتبقى من الـ admin، من غير توكن ولا باسورد. بتختبر الصلاحيات والفحص، مش الـ authentication.`,
            R`[[r = api.post(..., "price_cents": 50, ...)]]: سعر أقل من جنيه، المفروض [[validate_price_cents]] ترفضه.`,
            R`[[assert r.status_code == 400]]: الـ serializer رفض الداتا، مش الصلاحيات (الـ admin معاه كل حاجة).`,
            R`[[assert "price_cents" in r.json()]]: والغلط تحت اسم الحقل الصح، فالـ frontend يقدر يعرضه جنب الخانة.`,
            R`[[@pytest.mark.django_db]]: اختبار الـ object permission بيعمل يوزرين و review في القاعدة.`,
            R`[[def test_only_author_can_edit_review(api, cables)]]: ده الاختبار اللي بيحمي من ثغرة IDOR.`,
            R`[[sara = User.objects.create_user("sara", password="x-test-pass")]]: يوزر حقيقي في قاعدة الاختبار. [[create_user]] بيعمل hash للباسورد (وده بطيء، القسم ٥ بيسرّعه).`,
            R`[[omar = User.objects.create_user("omar", password="x-test-pass")]]: اليوزر التاني اللي هيحاول.`,
            R`[[product = cables.products.first()]]: منتج من الـ fixture عشان الـ review.`,
            R`[[api.force_authenticate(sara)]]: الطلبات الجاية من سارة.`,
            R`[[review_id = api.post(...).json()["id"]]]: سارة بتكتب review وبناخد الـ id من الرد.`,
            R`[[api.force_authenticate(omar)]]: نفس الـ client بقى عمر.`,
            R`[[assert api.patch(...).status_code == 403]]: عمر بيحاول يعدّل review سارة: [[has_object_permission]] لازم يرفض.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب [[pytest.ini]] ومعاه اختبار واحد بيتأكد إن [[GET /api/]] بيرجّع [[200]] وفيه مفتاح [[products]]، وشغّل [[pytest -q]].`, done: R`[[1 passed]]، وسطر [[django: version: 6.1.2, settings: config.settings (from ini)]] ظاهر مع [[pytest -v]]، ولو شلت [[@pytest.mark.django_db]] الاختبار بيعدّي برضه (الصفحة دي مبتلمسش القاعدة) وكاتب ليه.` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** ملف اختبارات قديم فيه [[from django.contrib.auth.models import User]]، والمشروع بقى فيه [[accounts.User]]، وكل الاختبارات اللي بتعمل يوزر وقعت. شوف الرسالة وصلّحها في سطرين.`, done: R`الرسالة كانت [[AttributeError: Manager isn't available; 'auth.User' has been swapped for 'accounts.User']]، وبعد [[from django.contrib.auth import get_user_model]] و [[User = get_user_model()]] الاختبارات كلها عدّت.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[@pytest.mark.parametrize]] لحالات السعر الطرفية في الـ POST: [[99]] و [[100]] و [[-1]] و [["abc"]] و [[0]]، مع الـ status المتوقع لكل واحدة، وفي رسالة الـ assert اطبع [[r.json()]].`, done: R`[[pytest -v -k price_edges]] بيطلّع ٥ سطور [[PASSED]] بأسامي زي [[test_price_edges[100-201] ]]، والحالة اللي توقعتها غلط (لو فيه) رسالتها فيها الـ JSON فعرفت السبب.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل [[pytest --durations=3]] وشوف أبطأ اختبار، وبعدين حط [[conftest.py]] فيه fixture [[autouse]] بتخلّي [[settings.PASSWORD_HASHERS]] على [[MD5PasswordHasher]]، وقيس تاني.`, done: R`أبطأ اختبار كان اللي فيه [[create_user]] (حوالي ثانية)، والمجموعة كلها نزلت من حوالي ٥ ثواني لنص ثانية (اتقاس هنا: [[4.95s]] لـ [[0.50s]] لـ ٩ اختبارات)، وكاتب ليه ده آمن في الاختبارات بس.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** دالة بتبعت إيميل في [[transaction.on_commit]]. اكتب اختبارين: واحد بـ [[mailoutbox]] لوحده، وواحد بـ [[django_capture_on_commit_callbacks(execute=True)]]، وفسّر الفرق.`, done: R`الأول [[len(mailoutbox) == 0]] (الـ transaction بتاعة الاختبار مبتعملش commit فالـ callback متنفذش)، والتاني [[len(callbacks) == 1]] و [[mailoutbox[0].to == ["sara@example.com"] ]]، والاتنين بيعدّوا.` },
          ],
          try: R`حط [[pytest.ini]] والاختبارات، وشغّل [[pytest -v]]. وبعدين شيل [[select_related]] من الـ viewset وشوف اختبار عدد الـ queries بيفشل وبيقول كام، وشغّله بـ [[-v]] تاني وشوف الـ queries نفسها. وأخيرًا ضيف اختبار إن [[DELETE]] على review بيرجّع 204 لصاحبه.`,
          solCode: R`@pytest.mark.django_db
def test_author_can_delete_review(api, cables):
    sara = User.objects.create_user("sara", password="x-test-pass")
    api.force_authenticate(sara)
    review_id = api.post("/api/reviews/", {"product": cables.products.first().pk, "rating": 4}, format="json").json()["id"]
    assert api.delete(f"/api/reviews/{review_id}/").status_code == 204
    assert not Review.objects.filter(pk=review_id).exists()`,
          sol: R`من غير [[select_related]] الفشل بيقول [[Expected to perform 2 queries but 5 were done]]، ومع [[-v]] بيطبع تحت [[Queries:]] الـ ٥: [[SELECT COUNT(*)]]، وبعدين المنتجات، وبعدين ٣ مرات [[SELECT ... FROM "shop_category" WHERE "shop_category"."id" = ... LIMIT 21]] (الـ [[LIMIT 21]] ده [[get()]] جوه Django بيدوّر على صف واحد).

الاختبار الجديد محتاج [[from shop.models import Category, Product, Review]] فوق، وبيعدّي: [[204 No Content]] والـ review مش موجود بعدها.`
        },
        {
          cmd: "Django في الإنتاج",
          title: "check --deploy و collectstatic و gunicorn ورا proxy",
          desc: R`قبل ما تنشر: [[DEBUG]] مقفول و [[SECRET_KEY]] و [[ALLOWED_HOSTS]] من الـ environment (درس «settings من env»)، و [[python manage.py check --deploy]] يطلّعلك الإعدادات الأمنية الناقصة، و [[collectstatic]] يجمع ملفات CSS و JS في فولدر واحد، و [[gunicorn config.wsgi]] بدل [[runserver]].

الملفات الثابتة بيخدمها WhiteNoise من جوه التطبيق (أو nginx)، والتطبيق ورا reverse proxy بيعمل HTTPS، فـ [[SECURE_PROXY_SSL_HEADER]] بيخليه يعرف إن الطلب الأصلي كان https. و gunicorn مبيشتغلش على ويندوز: هناك [[waitress]] للتجربة، والإنتاج لينكس أو Docker.`,
          deep: {
            why: R`الإعدادات اللي startproject بيكتبها للتطوير: DEBUG بيعرض الكود، و runserver مش معمول للأمان ولا للضغط، والـ cookies بتتبعت على http. و [[check --deploy]] بيلخّص الفرق في قايمة تقدر تمشي عليها، وتحطها في CI.`,
            how: R`[[check --deploy]] بيشغّل الفحوصات العادية + فحوصات الإنتاج: HSTS، والتحويل لـ https، والـ cookies الـ secure، وطول المفتاح. وفي Django 6.1 فيه فحص جديد للإيميل: لو [[MAILERS]] لسه console backend بيطلع **error** ([[mail.E001]])، فالإعدادات بتختار SMTP لما DEBUG مقفول. والتحذيرات مبتغيّرش الـ exit code، و [[--fail-level WARNING]] بيخليها تفشل في CI.

[[collectstatic]] بيلف على [[static/]] بتاع كل app (الـ admin و DRF) ويحطهم في [[STATIC_ROOT]]. ومع [[CompressedManifestStaticFilesStorage]] بتاع WhiteNoise بيعمل نسخة اسمها فيه hash ([[base.6398cd16ee3d.css]]) ونسخة gzip، فالمتصفح يعمل cache سنة، وأي تعديل بيطلع اسم جديد. و [[WhiteNoiseMiddleware]] لازم بعد [[SecurityMiddleware]] على طول.

gunicorn سيرفر WSGI: process رئيسية بتعمل [[--workers]] processes، كل واحدة بتخدم طلب في نفس الوقت (sync). رقم بداية شائع [[2 × CPU + 1]]. ورا nginx أو load balancer: الـ proxy بيعمل TLS ويبعت [[X-Forwarded-Proto: https]]، و [[SECURE_PROXY_SSL_HEADER]] بيقول لـ Django يصدّقه. ولازم الـ proxy **يمسح** الـ header ده لو جاي من بره، وإلا أي حد يزوّره. إعدادات nginx نفسها في درس «reverse proxy بعمق» في تاب Nginx، والـ Dockerfile لـ Python في تاب Python.

والـ migrations في الديبلوي: [[python manage.py migrate]] خطوة لوحدها قبل ما الـ workers الجديدة تقوم، مش جوه كل container.`,
            when: R`أول ما المشروع يطلع على أي سيرفر حتى لو staging. و [[check --deploy]] في الـ CI بتاع الـ main branch بنفس environment الإنتاج (من غير الأسرار الحقيقية).`,
            mistakes: R`[[DEBUG=True]] في الإنتاج «عشان الـ static files تشتغل» (الحل collectstatic و WhiteNoise). و [[SECURE_SSL_REDIRECT]] من غير [[SECURE_PROXY_SSL_HEADER]] ورا proxy: كل طلب يتحوّل https، والـ proxy يبعته http، فـ redirect loop. و [[SECURE_HSTS_SECONDS]] سنة من أول يوم: لو HTTPS وقع، المتصفحات هترفض الموقع لحد ما المدة تخلص (ابدأ بساعة وزوّد). وتنسى [[CSRF_TRUSTED_ORIGINS]] فكل فورم POST من الدومين يطلع 403. و [[gunicorn --reload]] أو [[runserver]] في الإنتاج. والاختبارات بنفس إعدادات الإنتاج من غير ما تقفل الـ SSL redirect (كل طلب فيها رجع 301 والـ 6 اختبارات فشلوا).`
          },
          teach: R`## المثال بيعمل إيه؟

الجزء الأخير في [[config/settings.py]]: الـ static files بـ WhiteNoise، وإعدادات الأمان لما DEBUG مقفول، والإيميل. وبعدين الأوامر: الفحص، وجمع الـ static، و gunicorn. اتشغّل بـ Django 6.1.2 و gunicorn 26.2.0 و whitenoise 6.12.0 على لينكس في Docker، بمفتاح عشوائي اتعمل للتجربة واترمى، و Postgres 16. وجزء ويندوز بـ waitress 3 في pwsh 7.

---

## ١. [[check --deploy]] قبل أي تعديل

بمفتاح قصير وإعدادات التطوير:

~~~text الناتج (مختصر)
ERRORS:
?: (mail.E001) Your MAILERS setting uses a development-only email backend in the 'default' entry (django.core.mail.backends.console.EmailBackend).
WARNINGS:
?: (security.W004) You have not set a value for the SECURE_HSTS_SECONDS setting. ...
?: (security.W008) Your SECURE_SSL_REDIRECT setting is not set to True. ...
?: (security.W009) Your SECRET_KEY has less than 50 characters, less than 5 unique characters, or it's prefixed with 'django-insecure-' ...
?: (security.W012) SESSION_COOKIE_SECURE is not set to True. ...
?: (security.W016) You have 'django.middleware.csrf.CsrfViewMiddleware' in your MIDDLEWARE, but you have not set CSRF_COOKIE_SECURE to True. ...
System check identified 6 issues (0 silenced).
exit=1
~~~

| الكود | معناه | الحل |
|---|---|---|
| [[mail.E001]] | الإيميل بيتطبع في الترمنال بس (جديد في Django 6.1) | [[MAILERS]] بـ SMTP |
| [[W004]] | مفيش HSTS | [[SECURE_HSTS_SECONDS]] |
| [[W008]] | مفيش تحويل لـ https | [[SECURE_SSL_REDIRECT = True]] |
| [[W009]] | المفتاح ضعيف | [[get_random_secret_key()]] |
| [[W012]] و [[W016]] | الـ cookies بتتبعت على http | [[SESSION_COOKIE_SECURE]] و [[CSRF_COOKIE_SECURE]] |

[[exit=1]] بسبب الـ error. التحذيرات لوحدها بتخرج بـ 0.

---

## ٢. الـ static files

~~~python
STATIC_ROOT = BASE_DIR / "staticfiles"
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}
~~~

- [[STATIC_ROOT]]: الفولدر اللي [[collectstatic]] هيجمع فيه. مش بيتعمله commit.
- [[MIDDLEWARE.insert(1, ...)]]: حط WhiteNoise في المكان رقم ١، يعني بعد [[SecurityMiddleware]] (رقم ٠) على طول، زي ما الـ docs بتاعته بتقول.
- [[STORAGES]]: [["default"]] للملفات اللي اليوزرز بيرفعوها، و [["staticfiles"]] للـ CSS و JS. ونوع WhiteNoise بيضغط ويحط hash في الاسم.

~~~bash
python manage.py collectstatic --noinput
~~~

~~~text الناتج
157 static files copied to '/work/dj/staticfiles', 453 post-processed.
~~~

١٥٧ ملف من الـ admin و DRF، و [[post-processed]] = النسخ بالـ hash والـ gzip. والفولدر طلع [[8.5M]]، وفيه مثلًا [[autocomplete.5a22097eaab1.css]] و [[autocomplete.5a22097eaab1.css.gz]].

---

## ٣. الأمان لما DEBUG مقفول

~~~python
CSRF_TRUSTED_ORIGINS = [f"https://{h}" for h in ALLOWED_HOSTS if h not in ("localhost", "127.0.0.1")]
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = env("DJANGO_SSL_REDIRECT", "1") == "1"
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = int(env("DJANGO_HSTS_SECONDS", "3600"))
~~~

| الإعداد | بيعمل إيه |
|---|---|
| [[CSRF_TRUSTED_ORIGINS]] | الدومينات اللي فورمات POST منها مقبولة. طلع [[['https://shop.example.com']]] |
| [[SECURE_PROXY_SSL_HEADER]] | لو header [[X-Forwarded-Proto]] قيمته [[https]]، اعتبر الطلب https. Django بيقراه باسم [[HTTP_X_FORWARDED_PROTO]] |
| [[SECURE_SSL_REDIRECT]] | أي طلب http يتحوّل https (301). من env عشان تقفله في الاختبارات |
| [[SESSION_COOKIE_SECURE]] و [[CSRF_COOKIE_SECURE]] | الـ cookies تتبعت على https بس |
| [[SECURE_HSTS_SECONDS]] | header بيقول للمتصفح «متجيش هنا غير https» للمدة دي. ابدأ بساعة |

## ٤. الإيميل (Django 6.1)

~~~python
    MAILERS = {
        "default": {
            "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
            "OPTIONS": {"host": env("SMTP_HOST", "localhost"), "port": int(env("SMTP_PORT", "587")), "use_tls": True},
        }
    }
~~~

[[MAILERS]] الإعداد اللي startproject بتاع 6.1 بيكتبه (بدل [[EMAIL_BACKEND]] و [[EMAIL_HOST]] القدام). و [[OPTIONS]] بتتبعت لـ [[EmailBackend]]: الـ host والبورت و TLS، والـ [[username]] و [[password]] كمان لو السيرفر محتاجهم (من env).

بعد كل ده، بمفتاح من [[get_random_secret_key()]] و [[DJANGO_ALLOWED_HOSTS=shop.example.com,localhost]]:

~~~text الناتج
WARNINGS:
?: (security.W005) You have not set the SECURE_HSTS_INCLUDE_SUBDOMAINS setting to True. ...
?: (security.W021) You have not set the SECURE_HSTS_PRELOAD setting to True. ...
System check identified 2 issues (0 silenced).
exit=0
~~~

الاتنين الباقيين قرارات بتاخدها بعد ما تتأكد إن كل الـ subdomains على https، مش حاجة تتصلّح على طول.

---

## ٥. gunicorn

~~~bash
gunicorn config.wsgi:application --workers 2 --bind 0.0.0.0:8000 --access-logfile -
~~~

| الحتة | معناها |
|---|---|
| [[config.wsgi:application]] | الملف [[config/wsgi.py]]، والمتغير [[application]] جواه |
| [[--workers 2]] | ٢ processes بيخدموا. البداية الشائعة [[2 × CPU + 1]] |
| [[--bind 0.0.0.0:8000]] | اسمع على كل الكروت، بورت 8000 (جوه container) |
| [[--access-logfile -]] | لوج الطلبات على الـ stdout ([[-]])، فـ Docker يجمعه |

~~~text الناتج (اللوج)
[INFO] Starting gunicorn 26.2.0
[INFO] Listening at: http://0.0.0.0:8000 (1221)
[INFO] Using worker: sync
[INFO] Booting worker with pid: 1222
[INFO] Booting worker with pid: 1223
~~~

### الطلبات

| الطلب | الرد | ليه |
|---|---|---|
| http من غير [[X-Forwarded-Proto]] | [[301 https://shop.example.com/api/products/]] | [[SECURE_SSL_REDIRECT]] |
| ومعاه [[X-Forwarded-Proto: https]] (زي ما nginx بيبعت) | [[200]] و [[Strict-Transport-Security: max-age=3600]] | Django صدّق الـ proxy |
| [[/static/admin/css/base.6398cd16ee3d.css]] | [[200]] و [[Cache-Control: max-age=315360000, public, immutable]] و [[Content-Encoding: gzip]] | WhiteNoise: cache ١٠ سنين والملف مضغوط |
| [[Host: evil.example]] | [[400]] | مش في [[ALLOWED_HOSTS]] |

> الاختبارات: بنفس الإعدادات دي، كل طلب في pytest رجع 301 والـ 6 اختبارات فشلوا. شغّلها بـ [[DJANGO_SSL_REDIRECT=0]].

---

## ٦. ويندوز

gunicorn بيعتمد على [[fcntl]] (حاجة في لينكس والماك بس)، فعلى ويندوز:

~~~text الناتج (gunicorn --version في pwsh)
    import fcntl
ModuleNotFoundError: No module named 'fcntl'
~~~

للتجربة على ويندوز فيه [[waitress]] (سيرفر WSGI مكتوب Python بس):

~~~powershell
pip install waitress
python -m waitress --listen=127.0.0.1:8010 config.wsgi:application
~~~

~~~text الناتج
INFO:waitress:Serving on http://127.0.0.1:8010
~~~

و [[Invoke-WebRequest http://127.0.0.1:8010/admin/login/]] رجّع [[200]]. والإنتاج الحقيقي لينكس (VPS أو container)، وهناك gunicorn.

---

## ٧. فخاخ [[DEBUG = False]]

اتجرّبت على ويندوز في pwsh 7 بـ [[runserver --noreload]] وملف إعدادات [[config/settings/prod.py]] (القسم ٥ في درس «settings من env»)، ومفتاح عشوائي اترمى، و [[DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost]]. و view [[/boom/]] بترجّع [[1 / 0]] عن قصد.

### (أ) [[ALLOWED_HOSTS]] فاضية

~~~text اتشغّل فعلًا · الناتج
CommandError: You must set settings.ALLOWED_HOSTS if DEBUG is False.
~~~

مع [[DEBUG = True]] القايمة الفاضية معناها [[localhost]]. مع [[False]] لازم تكتبها.

### (ب) الـ static بقى 404، والأخطاء بقت ساكتة

~~~text الناتج (لوج runserver، من غير WhiteNoise)
"GET /static/admin/css/base.css HTTP/1.1" 404 179
"GET /boom/ HTTP/1.1" 500 145
"GET /nope/ HTTP/1.1" 404 179
"GET /admin/login/ HTTP/1.1" 200 4294
~~~

- الـ CSS [[404]]: [[runserver]] بيخدم الـ static لوحده لما DEBUG شغال بس. فالـ admin بيفتح ([[200]]) بس من غير أي شكل.
- [[/boom/]] [[500]]، و **مفيش traceback خالص** في الترمنال. اللوجينج الافتراضي في Django بيبعت أخطاء الطلبات لـ [[mail_admins]] لما DEBUG مقفول، مش للـ console. يعني على السيرفر هتشوف 500 ومش هتعرف ليه.

### الحل: [[LOGGING]] على الـ stdout

~~~python
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "INFO"},
    "loggers": {"django": {"handlers": ["console"], "level": "INFO", "propagate": False}},
}
~~~

| الحتة | ليه |
|---|---|
| [[version: 1]] | إجباري: شكل الـ dictConfig بتاع Python |
| [[disable_existing_loggers: False]] | متطفيش اللوجرز اللي Django والمكتبات عاملينها |
| [[StreamHandler]] | يكتب على الـ stderr، و Docker و systemd بيجمعوه |
| [[loggers.django]] | لوجر Django نفسه (ومنه [[django.request]] اللي فيه الـ 500) يروح للـ console |

بعدها نفس الطلب طبع:

~~~text الناتج
Internal Server Error: /boom/
Traceback (most recent call last):
ZeroDivisionError: division by zero
~~~

### (ج) WhiteNoise من غير [[collectstatic]]

زوّدت WhiteNoise و [[CompressedManifestStaticFilesStorage]] ونسيت [[collectstatic]]:

~~~text الناتج
UserWarning: No directory at: ...\proj2\staticfiles\
Internal Server Error: /admin/login/
ValueError: Missing staticfiles manifest entry for 'admin/css/base.css'
~~~

صفحة الـ admin نفسها بقت [[500]]: [[{% static %}]] بيدوّر على الاسم بالـ hash في الـ manifest ومش لاقيه. بعد [[collectstatic --noinput]] ([[157 static files copied ..., 453 post-processed.]]) الصفحة [[200]] والـ HTML فيه [[href="/static/admin/css/base.6398cd16ee3d.css"]]. وطلب الاسم **من غير** hash بيرجع [[Cache-Control: max-age=60, public]] بس، والاسم بالـ hash [[max-age=315360000, public, immutable]]: عشان كده دايمًا [[{% static %}]] مش مسار مكتوب بإيدك.

---

## ٨. gunicorn: [[--timeout]] و الـ worker اللي بيعلّق

اتجرّب في [[python:3.13-slim]] بـ gunicorn 26.2.0 وتطبيق WSGI صغير فيه [[/slow]] بينام ٥ ثواني:

~~~bash
gunicorn app:application --workers 1 --timeout 2 --bind 127.0.0.1:8000
~~~

~~~text الناتج (من غير التاريخ في أول كل سطر)
[12] [CRITICAL] WORKER TIMEOUT (pid:14)
[14] [ERROR] Error handling request GET /slow
SystemExit: 1
[14] [INFO] Worker exiting (pid: 14)
[17] [INFO] Booting worker with pid: 17
HTTPError HTTP Error 500: Internal Server Error
2.1 s
b'ok\n'
~~~

- الـ process الرئيسية ([[12]]) لاحظت إن الـ worker ([[14]]) بقاله أكتر من ثانيتين في طلب واحد، فقتلته وعملت worker جديد ([[17]]).
- العميل خد [[500]] بعد [[2.1]] ثانية، والطلب اللي بعده اشتغل عادي.
- الافتراضي [[--timeout 30]]. لو عندك view بتاخد أكتر (تقرير أو تصدير)، الحل مش تكبير الـ timeout، الحل تشغّله في الخلفية (task) وترجّع على طول.

وعدد الـ workers: كل worker [[sync]] بيخدم طلب واحد في نفس الوقت، فـ ٢ workers وطلبين بطيئين = الموقع كله واقف. البداية [[2 × CPU + 1]]، وقيس.

---

## الخلاصة: قايمة الديبلوي

| الخطوة | الأمر أو الإعداد |
|---|---|
| ١. الأسرار من env | [[DJANGO_SECRET_KEY]] و [[DJANGO_ALLOWED_HOSTS]] و [[DB_*]]، و DEBUG مقفول |
| ٢. الفحص | [[python manage.py check --deploy]] |
| ٣. القاعدة | [[python manage.py migrate]] (خطوة لوحدها) |
| ٤. الـ static | [[python manage.py collectstatic --noinput]] |
| ٥. السيرفر | [[gunicorn config.wsgi:application --workers N]] |
| ٦. قدامه | nginx أو load balancer بـ HTTPS، وبيبعت [[X-Forwarded-Proto]] |
| ٧. اللوج | [[LOGGING]] على الـ stdout، وإلا الـ 500 بيبقى من غير traceback |
| ٨. الـ timeout | [[--timeout]] واضح، والشغل الطويل في task مش في الطلب |`,
          example: R`STATIC_ROOT = BASE_DIR / "staticfiles"
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}
CSRF_TRUSTED_ORIGINS = [f"https://{h}" for h in ALLOWED_HOSTS if h not in ("localhost", "127.0.0.1")]
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = env("DJANGO_SSL_REDIRECT", "1") == "1"
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = int(env("DJANGO_HSTS_SECONDS", "3600"))
    MAILERS = {
        "default": {
            "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
            "OPTIONS": {"host": env("SMTP_HOST", "localhost"), "port": int(env("SMTP_PORT", "587")), "use_tls": True},
        }
    }
# في الترمنال (لينكس أو جوه الـ container):
# python manage.py check --deploy
# python manage.py migrate
# python manage.py collectstatic --noinput
# gunicorn config.wsgi:application --workers 2 --bind 0.0.0.0:8000 --access-logfile -`,
          flag: "script",
          learn: R`تجهّز مشروع Django للإنتاج: [[check --deploy]]، والـ static بـ [[collectstatic]] و WhiteNoise، و HTTPS ورا proxy، والـ cookies الآمنة، والإيميل، و gunicorn بعدد workers و timeout، وتعرف فخاخ [[DEBUG = False]] وتشوف الأخطاء في اللوج.`,
          out: R`نفس المشروع بيشتغل على سيرفر لينكس ورا nginx بـ [[DEBUG]] مقفول، و [[check --deploy]] فيه تحذيرين بس، والـ CSS بيتخدم مضغوط بـ cache ١٠ سنين، وأي 500 بيطلع في اللوج بالـ traceback.`,
          use: {
            work: R`الديبلوي الأول لأي مشروع Django بيقع في نفس الفخاخ: الـ admin من غير CSS، و [[400 Bad Request]] من [[ALLOWED_HOSTS]]، و 500 من غير أي سطر في اللوج. القايمة دي بتخلّصك منهم قبل ما يحصلوا.`,
            net: R`الـ reverse proxy بيعمل TLS ويبعت [[X-Forwarded-Proto]]، و HSTS بيقول للمتصفح «https بس»، و [[Cache-Control: immutable]] بيخلّي المتصفح ميطلبش الملف تاني. كلها HTTP بتتظبط من Django.`,
            cs: R`gunicorn نموذج pre-fork: process رئيسية بتعمل workers وبتقتل أي واحد علّق أكتر من [[--timeout]] وتعمل غيره. والـ hash في اسم الملف (content addressing) هو اللي بيخلّي الـ cache الطويل آمن.`,
          },
          lines: [
            R`[[STATIC_ROOT = BASE_DIR / "staticfiles"]]: الفولدر اللي [[collectstatic]] هيجمع فيه CSS و JS بتوع كل الـ apps (الـ admin و DRF وبتوعك). مبيتعملهوش commit، وبيتعمل في الـ build أو الديبلوي.`,
            R`[[MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")]]: WhiteNoise بيخدم الـ static من جوه التطبيق نفسه من غير nginx. [[insert(1, ...)]] يعني بعد [[SecurityMiddleware]] (رقم ٠) على طول وقبل أي حاجة تانية، زي ما الـ docs بتاعته بتقول.`,
            R`[[STORAGES = {]]: من Django 4.2 ده المكان اللي بيحدد فين بتتخزن الملفات، بدل [[STATICFILES_STORAGE]] و [[DEFAULT_FILE_STORAGE]] القدام.`,
            R`[["default": {"BACKEND": "...FileSystemStorage"}]]: الملفات اللي اليوزرز بيرفعوها ([[FileField]] و [[ImageField]]) بتتحفظ على الديسك في [[MEDIA_ROOT]]. في الإنتاج غالبًا S3 أو مشابه، لأن الـ container بيتمسح.`,
            R`[["staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"}]]: [[collectstatic]] بيعمل لكل ملف نسخة اسمها فيه hash ([[base.6398cd16ee3d.css]]) ونسخة gzip، و ملف manifest بيربط الاسم القديم بالجديد. ولو الـ manifest مش موجود كل صفحة فيها [[{% static %}]] بترجع 500 (القسم ٧).`,
            R`قفل [[STORAGES]].`,
            R`[[CSRF_TRUSTED_ORIGINS = [f"https://{h}" ...]]]: Django بيفحص الـ [[Origin]] بتاع أي POST على https، ولازم يبقى في القايمة دي. بنبنيها من [[ALLOWED_HOSTS]] من غير [[localhost]]، فطلعت [[['https://shop.example.com']]]. من غيرها كل فورم على الموقع بيرجع [[403]].`,
            R`[[if not DEBUG:]]: الإعدادات دي للإنتاج بس. على جهازك (http) لو اتفعّلت، الـ cookies مش هتتبعت والدخول مش هيشتغل.`,
            R`[[SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")]]: لو الـ header ده قيمته [[https]]، اعتبر الطلب https. Django بيقرا الـ headers بالشكل [[HTTP_]] + الاسم بحروف كبيرة. والـ proxy لازم يمسح الـ header ده لو جاي من بره، وإلا أي حد يزوّره.`,
            R`[[SECURE_SSL_REDIRECT = env("DJANGO_SSL_REDIRECT", "1") == "1"]]: أي طلب http بيتحوّل [[301]] لـ https. من env عشان تقفله في الاختبارات أو health check على http داخلي (من غيره كل اختبار رجع [[301]]).`,
            R`[[SESSION_COOKIE_SECURE = True]]: cookie الدخول ([[sessionid]]) بتتبعت على https بس، فمحدش على نفس الـ WiFi يقدر يسرقها من طلب http.`,
            R`[[CSRF_COOKIE_SECURE = True]]: نفس الكلام لـ cookie [[csrftoken]].`,
            R`[[SECURE_HSTS_SECONDS = int(env("DJANGO_HSTS_SECONDS", "3600"))]]: header [[Strict-Transport-Security: max-age=3600]] بيقول للمتصفح «متجيش هنا غير https للمدة دي». ابدأ بساعة، ولما تتأكد إن كل حاجة شغالة كبّرها لسنة؛ لو بدأت بسنة و HTTPS وقع، المتصفحات هترفض الموقع سنة.`,
            R`[[MAILERS = {]]: إعداد الإيميل في Django 6.1 (بدل [[EMAIL_BACKEND]] و [[EMAIL_HOST]]). [[check --deploy]] بيطلّع error [[mail.E001]] لو لسه على console backend.`,
            R`[["default": {]]: الـ mailer اللي [[send_mail]] بيستخدمه لو مقلتش غير كده. ينفع يبقى فيه أكتر من واحد (واحد للإيميلات المهمة وواحد للنشرات).`,
            R`[["BACKEND": "django.core.mail.backends.smtp.EmailBackend"]]: سيرفر SMTP حقيقي (خدمة إيميل زي SES أو Mailgun أو سيرفر الشركة).`,
            R`[["OPTIONS": {"host": ..., "port": ..., "use_tls": True}]]: بيانات الاتصال من env، و [[587]] مع [[use_tls]] هو البورت المعتاد لـ STARTTLS. ولو السيرفر محتاج دخول زوّد [[username]] و [[password]] من env برضه.`,
            R`قفل الـ mailer [["default"]].`,
            R`قفل [[MAILERS]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الـ ٦ خطوات بالترتيب من «الكود على السيرفر» لحد «الموقع شغال»، وجنب كل واحدة الأمر أو الإعداد.`, done: R`القايمة فيها الأسرار من env و [[check --deploy]] و [[migrate]] و [[collectstatic --noinput]] و [[gunicorn config.wsgi:application --workers N]] و proxy بـ HTTPS بيبعت [[X-Forwarded-Proto]]، ومقارنتها بجدول الخلاصة طلعت نفس الترتيب.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** بإعدادات الإنتاج ([[DEBUG = False]]) و [[runserver]] من غير WhiteNoise: إيه اللي هيحصل لـ [[/static/admin/css/base.css]]، ولـ view بترمي [[ZeroDivisionError]] (هيطلع إيه في الترمنال؟)، ولو [[ALLOWED_HOSTS = []]]؟ اكتب، وبعدين جرّب التلاتة.`, done: R`الـ CSS [[404]]، والـ view [[500]] والترمنال فيه سطر الطلب بس ([["GET /boom/ HTTP/1.1" 500 145]]) من غير traceback، و [[runserver]] رفض يقوم بـ [[CommandError: You must set settings.ALLOWED_HOSTS if DEBUG is False.]]` },
            { lvl: 'تطبيق', t: R`**صلّح البايظ:** على السيرفر: صفحة الـ admin بترجع 500 بعد آخر ديبلوي، واللوج فاضي. صلّح الاتنين: خلّي الـ traceback يطلع على الـ stdout بـ [[LOGGING]]، وبعدين لاقي السبب (القسم ٧) وصلّحه.`, done: R`بعد الـ [[LOGGING]] اللوج بيطبع [[Internal Server Error: /admin/login/]] و [[ValueError: Missing staticfiles manifest entry for 'admin/css/base.css']]، وبعد [[collectstatic --noinput]] الصفحة [[200]] والـ HTML فيه [[base.6398cd16ee3d.css]] (أو hash نسختك).` },
            { lvl: 'تحدي', t: R`**ابني:** Dockerfile لمشروع الوحدة: [[python:3.13-slim]]، ويوزر مش root، و [[collectstatic]] وقت الـ build، و [[CMD]] بـ gunicorn بـ [[--workers]] و [[--timeout]] من env، و [[migrate]] أمر لوحده مش جوه الـ [[CMD]]. وجرّبه بـ [[docker run]] ومعاه Postgres.`, done: R`[[docker run -e DJANGO_SECRET_KEY=... -e DB_HOST=...]] بيقوم ولوج gunicorn فيه [[Booting worker]] بعدد الـ workers، و [[curl -H "X-Forwarded-Proto: https" -H "Host: shop.example.com" localhost:8000/admin/login/]] بيرجّع [[200]] والـ CSS بيرجّع [[immutable]]، و [[docker exec ... whoami]] مش [[root]]، و view بتنام أكتر من الـ timeout بتطلّع [[WORKER TIMEOUT]] في اللوج.` },
          ],
          try: R`في مشروعك: شغّل [[check --deploy]] بإعدادات التطوير وعدّ التحذيرات، وبعدين ضيف الإعدادات دي وشغّله تاني بمفتاح عشوائي. اعمل [[collectstatic]] وافتح فولدر [[staticfiles/admin/css]]. وعلى لينكس أو Docker شغّل gunicorn واطلب [[/api/products/]] بـ [[curl]] مرة من غير [[X-Forwarded-Proto]] ومرة معاه. على ويندوز جرّب waitress.`,
          sol: R`أول مرة: ٦ مشاكل (error الإيميل و ٥ تحذيرات أمان). بعد الإعدادات: تحذيرين بس ([[W005]] و [[W021]] عن HSTS) و [[exit=0]].

في [[staticfiles/admin/css]] هتلاقي كل ملف ٤ مرات: [[base.css]] و [[base.css.gz]] و [[base.6398cd16ee3d.css]] و [[base.6398cd16ee3d.css.gz]] (الاسم بالـ hash، والرقم بيختلف حسب النسخة). والـ templates بتطلب النسخة اللي بالـ hash لوحدها لما تكتب [[{% static 'admin/css/base.css' %}]].

[[curl]] من غير الـ header: [[301]] لـ [[https://...]]. ومعاه: [[200]] و [[Strict-Transport-Security: max-age=3600]]. ولو بعت [[Host]] مش في [[ALLOWED_HOSTS]]: [[400]]. وعلى ويندوز gunicorn بيقع بـ [[ModuleNotFoundError: No module named 'fcntl']]، و [[python -m waitress --listen=127.0.0.1:8010 config.wsgi:application]] بيطبع [[Serving on http://127.0.0.1:8010]].`
        },
      ]
    }
]);
