// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Django REST Framework والاختبار والإنتاج",
      l: 3,
      n: "DRF بيحوّل الـ models لـ API: serializers للفحص والتحويل، و viewsets و router للـ CRUD، وصلاحيات وصفحات، و pytest-django يثبّت السلوك وعدد الـ queries، وبعدين gunicorn ورا proxy",
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
| [[model = Product]] | الـ model |
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

## الخلاصة

| الملف | فيه |
|---|---|
| [[serializers.py]] | الحقول + الفحص |
| [[api.py]] (أو [[views.py]]) | الـ viewset: queryset و serializer وصلاحيات |
| [[urls.py]] | [[DefaultRouter]] + [[register]] |

- [[fields]] قايمة صريحة دايمًا.
- الفحص في الـ serializer، مش في الـ view.
- [[select_related]] لأي حقل [[source]] من علاقة، و [[order_by]] مع الصفحات.`,
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
          lines: [
            "أدوات الـ serializers.",
            "الـ model.",
            "serializer مبني على الـ model.",
            "اسم القسم من العلاقة، للقراية بس.",
            "إعدادات الـ serializer.",
            "الـ model.",
            "الحقول اللي تطلع وتدخل، بالاسم.",
            "[[created_at]] بيطلع بس.",
            "فحص حقل السعر.",
            "أقل من جنيه؟",
            "ارفض برسالة تحت اسم الحقل (400).",
            "تمام: رجّع القيمة.",
            "الصلاحيات والـ viewsets.",
            "الـ model.",
            "الـ serializer.",
            "CRUD كامل في class.",
            "المنتجات ومعاها أقسامها، بترتيب ثابت.",
            "مين يحوّل ويفحص.",
            "القراية للكل، والكتابة بصلاحيات Django.",
            "[[include]] و [[path]].",
            "الـ router.",
            "الـ viewset.",
            "router بيعمل الـ URLs وصفحة root.",
            "[[/products/]] و [[/products/<id>/]].",
            "جدول المسارات.",
            "كل الـ API تحت [[/api/]].",
            "قفل الـ list."
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
| sara: [[POST /api/reviews/]] [[{"product":2082,"rating":5,"body":"Works"}]] | [[201]] [[{"id":1,"product":2082,"author_name":"sara","rating":5,...}]] |
| sara نفس المنتج تاني | [[400]] [[{"non_field_errors":["The fields product, author must make a unique set."]}]] |
| omar: [[rating: 9]] | [[{"rating":["Rating must be between 1 and 5."]}]] |
| omar: [[PATCH /api/reviews/1/]] | [[403]] [[You do not have permission to perform this action.]] |
| من غير توكن: [[POST]] | [[403]] [[Authentication credentials were not provided.]] |
| توكن غلط | [[403]] [[{"detail":"Invalid token."}]] |
| sara: [[DELETE /api/reviews/1/]] | [[204]] |
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

## الخلاصة

| السؤال | الحتة |
|---|---|
| مين ده؟ | [[DEFAULT_AUTHENTICATION_CLASSES]]: Session و/أو Token |
| داخل ولا لأ؟ | [[IsAuthenticatedOrReadOnly]] |
| صاحبها ولا لأ؟ | [[has_object_permission]] |
| الـ author مين؟ | [[HiddenField(default=CurrentUserDefault())]] |
| كام صف في الرد؟ | [[DEFAULT_PAGINATION_CLASS]] + [[PAGE_SIZE]] |

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
          lines: [
            "أدوات الصلاحيات.",
            "permission بتاعتك.",
            "بتتنادى على object واحد (retrieve و update و destroy).",
            "GET و HEAD و OPTIONS...",
            "...مسموحين للكل.",
            "الكتابة لصاحب الـ review بس.",
            "serializer الـ reviews.",
            "الـ author هو اليوزر الحالي، ومحدش يبعته.",
            "اسم الكاتب في الرد.",
            "إعدادات الـ serializer.",
            "الـ model.",
            "الحقول. [[author]] موجود (مخفي) عشان فحص الـ unique.",
            "فحص التقييم.",
            "بره ١ لـ ٥؟",
            "ارفض بـ 400.",
            "تمام.",
            "viewset الـ reviews.",
            "الأحدث الأول، ومعاه الكاتب في JOIN.",
            "الـ serializer.",
            "الداخل يكتب، وصاحبها بس يعدّل.",
            "DRF وجدول التوكنات.",
            "إعدادات DRF.",
            "مين ده: بالترتيب.",
            "الـ session بتاعة Django.",
            "header [[Authorization: Token ...]].",
            "قفل الـ list.",
            "صفحات بـ [[?page=]].",
            "٣ صفوف في الصفحة.",
            "قفل الـ dict."
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

## الخلاصة

| عايز | استخدم |
|---|---|
| pytest يعرف Django | [[DJANGO_SETTINGS_MODULE]] في [[pytest.ini]] |
| اختبار بيلمس القاعدة | [[@pytest.mark.django_db]] |
| طلبات للـ API | [[APIClient]] + [[format="json"]] |
| يوزر من غير توكن | [[force_authenticate(user)]] أو [[admin_user]] |
| تثبّت عدد الـ queries | [[django_assert_num_queries(n)]] |
| أسرع | [[--reuse-db]]، و [[--create-db]] بعد migration |`,
          example: R`# pytest.ini:
# [pytest]
# DJANGO_SETTINGS_MODULE = config.settings
# python_files = test_*.py
# addopts = --reuse-db
# shop/tests/test_api.py:
import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from shop.models import Category, Product
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
          lines: [
            "pytest.",
            "اليوزرز.",
            "client بيفهم JSON و force_authenticate.",
            "الـ models.",
            "fixture...",
            "...اسمها [[api]].",
            "client جديد لكل اختبار.",
            "fixture تانية...",
            "...اسمها [[cables]].",
            "قسم.",
            "٥ مرات...",
            "...منتج بسعر ومخزون.",
            "رجّع القسم.",
            "مسموح يكلّم القاعدة.",
            "اختبار الصفحات.",
            "اطلب الـ list.",
            "الطلب نجح.",
            "العدد الكلي ٥.",
            "الصفحة الأولى ٣ ([[PAGE_SIZE]]).",
            "مسموح يكلّم القاعدة.",
            "اختبار عدد الـ queries.",
            "لو مش ٢ بالظبط، فشل...",
            "...في الطلب ده.",
            "مسموح يكلّم القاعدة.",
            "الضيف ميكتبش.",
            "POST من غير يوزر.",
            "لازم 403.",
            "مسموح يكلّم القاعدة.",
            "فحص السعر، ومعاه fixture [[admin_user]].",
            "الطلبات من الـ admin.",
            "سعر أقل من جنيه.",
            "لازم 400.",
            "والغلط تحت اسم الحقل.",
            "مسموح يكلّم القاعدة.",
            "صاحب الـ review بس يعدّله.",
            "يوزر أول.",
            "يوزر تاني.",
            "منتج من الـ fixture.",
            "الطلبات من sara.",
            "sara تكتب review وناخد الـ id.",
            "دلوقتي من omar.",
            "omar يحاول يعدّل: لازم 403."
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

## الخلاصة: قايمة الديبلوي

| الخطوة | الأمر أو الإعداد |
|---|---|
| ١. الأسرار من env | [[DJANGO_SECRET_KEY]] و [[DJANGO_ALLOWED_HOSTS]] و [[DB_*]]، و DEBUG مقفول |
| ٢. الفحص | [[python manage.py check --deploy]] |
| ٣. القاعدة | [[python manage.py migrate]] (خطوة لوحدها) |
| ٤. الـ static | [[python manage.py collectstatic --noinput]] |
| ٥. السيرفر | [[gunicorn config.wsgi:application --workers N]] |
| ٦. قدامه | nginx أو load balancer بـ HTTPS، وبيبعت [[X-Forwarded-Proto]] |`,
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
          lines: [
            "الفولدر اللي [[collectstatic]] بيجمع فيه.",
            "WhiteNoise بعد SecurityMiddleware على طول.",
            "أنواع التخزين.",
            "ملفات اليوزرز: على الديسك.",
            "الـ static: مضغوطة وأساميها فيها hash.",
            "قفل الـ dict.",
            "الدومينات المسموح منها POST على https.",
            "لما DEBUG مقفول:",
            "صدّق [[X-Forwarded-Proto: https]] من الـ proxy.",
            "حوّل http لـ https، وتتقفل بـ env في الاختبارات.",
            "cookie الـ session على https بس.",
            "cookie الـ CSRF على https بس.",
            "HSTS: ساعة كبداية.",
            "الإيميل في Django 6.1.",
            "الـ mailer الافتراضي.",
            "SMTP حقيقي.",
            "السيرفر والبورت و TLS من env.",
            "قفل الـ default.",
            "قفل الـ dict."
          ],
          try: R`في مشروعك: شغّل [[check --deploy]] بإعدادات التطوير وعدّ التحذيرات، وبعدين ضيف الإعدادات دي وشغّله تاني بمفتاح عشوائي. اعمل [[collectstatic]] وافتح فولدر [[staticfiles/admin/css]]. وعلى لينكس أو Docker شغّل gunicorn واطلب [[/api/products/]] بـ [[curl]] مرة من غير [[X-Forwarded-Proto]] ومرة معاه. على ويندوز جرّب waitress.`,
          sol: R`أول مرة: ٦ مشاكل (error الإيميل و ٥ تحذيرات أمان). بعد الإعدادات: تحذيرين بس ([[W005]] و [[W021]] عن HSTS) و [[exit=0]].

في [[staticfiles/admin/css]] هتلاقي كل ملف ٤ مرات: [[base.css]] و [[base.css.gz]] و [[base.6398cd16ee3d.css]] و [[base.6398cd16ee3d.css.gz]] (الاسم بالـ hash، والرقم بيختلف حسب النسخة). والـ templates بتطلب النسخة اللي بالـ hash لوحدها لما تكتب [[{% static 'admin/css/base.css' %}]].

[[curl]] من غير الـ header: [[301]] لـ [[https://...]]. ومعاه: [[200]] و [[Strict-Transport-Security: max-age=3600]]. ولو بعت [[Host]] مش في [[ALLOWED_HOSTS]]: [[400]]. وعلى ويندوز gunicorn بيقع بـ [[ModuleNotFoundError: No module named 'fcntl']]، و [[python -m waitress --listen=127.0.0.1:8010 config.wsgi:application]] بيطبع [[Serving on http://127.0.0.1:8010]].`
        },
      ]
    }
]);
