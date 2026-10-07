// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "Validation و الأخطاء",
      l: 2,
      n: "DataAnnotations و AddValidation في .NET 10، و ProblemDetails و exception handler مركزي",
      items: [
        {
          cmd: "validation",
          title: "تفحص الـ request قبل ما يوصل للمنطق: DataAnnotations و AddValidation",
          desc: R`أبسط طريقة: attributes على الـ DTO: [[[Required]]] و [[[StringLength(200, MinimumLength = 2)]]] و [[[Range(0.01, 100000)]]] و [[[EmailAddress]]] و [[[MinLength(1)]]] (للـ lists). زي Zod schema بس ملزوقة في الـ type نفسه.

في الـ controllers بـ [[[ApiController]]] الـ validation شغال من زمان. في minimal APIs كان لازم تعمله بإيدك أو بمكتبة، ومن .NET 10 بقى built-in: [[builder.Services.AddValidation()]] وخلاص. أي parameter عليه attributes بيتفحص، ولو فشل بيرجع 400 [[ValidationProblemDetails]] فيه كل الأخطاء مرة واحدة.

الـ validation اللي محتاجة داتابيز («الـ category موجودة؟»، «الإيميل متكرر؟») مكانها الـ handler أو الـ service، وترجع [[TypedResults.ValidationProblem]] بنفس الشكل.`,
          example: R`public record CreateProduct(
    [Required, StringLength(200, MinimumLength = 2)] string Name,
    [Range(0.01, 100000)] decimal Price,
    [Range(0, int.MaxValue)] int Stock,
    int CategoryId);
builder.Services.AddValidation();
g.MapPost("/", async Task<Results<Created<ProductDto>, ValidationProblem>> (CreateProduct body, ShopDb db) =>
{
    var category = await db.Categories.FindAsync(body.CategoryId);
    if (category is null)
        return TypedResults.ValidationProblem(new Dictionary<string, string[]>
        {
            ["categoryId"] = [$"Category {body.CategoryId} does not exist."]
        });
    var product = new Product { Name = body.Name, Price = body.Price, Stock = body.Stock, CategoryId = category.Id };
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/api/products/{product.Id}", new ProductDto(product.Id, product.Name, product.Price, category.Name));
});`,
          try: R`ابعت [[{"name":"x","price":0,"stock":-1,"categoryId":1}]] وشوف كام خطأ رجع. وبعدين اعمل attribute خاص [[[NoProfanity]]] (class بتورث [[ValidationAttribute]] وتعمل override لـ [[IsValid]]) وحطه على [[Name]]. وأخيرًا ابعت نفس المنتج مرتين: إيه اللي بيرجع التانية؟`,
          flag: "script",
          deep: {
            why: R`كل حاجة جاية من برّه مش مضمونة. من غير validation: سعر سالب في الداتابيز، أو اسم ١٠ ميجا، أو exception من الداتابيز بـ 500 بدل رسالة واضحة. والـ validation في مكان واحد وبشكل موحد ([[errors]] بالحقل) بيخلي الـ frontend يعرض الخطأ جنب الحقل الصح.`,
            how: R`[[AddValidation()]] في .NET 10 بيستخدم source generator بيلاقي الأنواع المستخدمة كـ parameters في الـ endpoints وبيولّد كود فحص ليها، وبيضيف endpoint filter بيشغّله قبل الـ handler. بيفحص nested objects و collections كمان. ولو عايز endpoint معين من غير validation: [[.DisableValidation()]].

الـ attributes على positional record بتتكتب على الـ parameter ([[[Required] string Name]]). لو الـ property [[string]] non-nullable و [[Nullable]] enable، الـ JSON اللي مفيهوش الحقل بيتربط بـ null وبيفشل الـ [[Required]]. و [[[Range]]] على decimal بياخد double في الـ attribute بس بيقارن صح.

الـ response: [[400]] بـ [[application/problem+json]] وفيه [["errors": {"Name": ["..."], "Price": ["..."]}]]. أسماء الحقول بتطلع بنفس casing الـ property.

للقواعد المعقدة (حقل يعتمد على حقل تاني، قواعد async) الناس بتستخدم FluentValidation: class لكل DTO فيها [[RuleFor(x => x.Price).GreaterThan(0)]]. أو [[IValidatableObject]] على الـ DTO نفسه.`,
            when: R`DataAnnotations للقواعد البسيطة (مطلوب، طول، مدى، شكل). FluentValidation لما القواعد تكتر أو تحتاج منطق. الفحص اللي محتاج داتابيز في الـ service. والـ constraints في الداتابيز نفسها (unique، foreign key، check) كخط دفاع أخير.`,
            mistakes: R`تنسى [[AddValidation()]] في minimal API وتفتكر إن الـ attributes شغالة لوحدها (مش هيحصل أي فحص). وتعتمد على validation الـ frontend بس. وتسيب unique constraint من الداتابيز يطلع كـ 500: امسك [[DbUpdateException]] وحوّلها 409، أو افحص قبلها (مع العلم إن الفحص قبلها فيه race condition).`
          },
          teach: R`## الكود ده بيعمل إيه؟

endpoint بيعمل منتج جديد ([[POST /api/products]])، والـ request بيتفحص على مرحلتين: (١) قواعد بسيطة مكتوبة كـ attributes على الـ DTO، بتتفحص **قبل** ما الـ handler يشتغل، و (٢) قاعدة محتاجة الداتابيز («الـ category موجودة؟») جوه الـ handler. والاتنين بيرجعوا 400 بنفس الشكل.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401، .NET 10) في نفس مشروع الدرسين اللي فاتوا، مع PostgreSQL 16 فيها category رقم 1 اسمها Pens، والـ [[Name]] عليه unique index. والـ requests بـ [[curl]] من Git Bash على 5925.

---

## ١. الـ DTO بالـ attributes

~~~csharp Extra.cs
public record CreateProduct(
    [Required, StringLength(200, MinimumLength = 2)] string Name,
    [Range(0.01, 100000)] decimal Price,
    [Range(0, int.MaxValue)] int Stock,
    int CategoryId);
~~~

- positional record (درس record): كل parameter بيبقى property. والـ attributes بتتكتب **قبل الـ parameter** جوه الأقواس.
- الـ attributes دي من namespace [[System.ComponentModel.DataAnnotations]]، فالملف محتاج [[using System.ComponentModel.DataAnnotations;]] فوقه.
- [[[Required, StringLength(...)]]]: كذا attribute في نفس الأقواس بفاصلة.

| الـ attribute | القاعدة |
|---|---|
| [[[Required]]] | لازم موجود ومش null |
| [[[StringLength(200, MinimumLength = 2)]]] | الطول من 2 لـ 200. [[MinimumLength = 2]] اسمها named property في الـ attribute |
| [[[Range(0.01, 100000)]]] | من 0.01 لـ 100000 |
| [[[Range(0, int.MaxValue)]]] | مش سالب. [[int.MaxValue]] أكبر int = 2147483647 |
| مفيش | [[CategoryId]] أي int، وهنفحصه بالداتابيز |

ده نفس فكرة Zod schema، بس القواعد ملزوقة في الـ type نفسه.

---

## ٢. [[AddValidation()]]

~~~csharp Program.cs
builder.Services.AddValidation();
~~~

من .NET 10: source generator بيلاقي الأنواع اللي بتستخدمها كـ parameters في الـ minimal endpoints، وبيولّد كود فحص ليها، وبيحط filter قبل كل handler. لو الفحص فشل الـ handler مش بيشتغل أصلًا.

**من غيره؟** علّقت السطر ده وبعت نفس الـ request الغلط اللي تحت:

~~~text الناتج
HTTP/1.1 201 Created
Location: /api/products/4

{"id":4,"name":"x","price":0,"category":"Pens"}
~~~

منتج اسمه حرف واحد وسعره صفر اتحفظ في الداتابيز. الـ attributes لوحدها مجرد كلام مكتوب، محدش بيقراها.

---

## ٣. الـ endpoint

~~~csharp Extra.cs
g.MapPost("/", async Task<Results<Created<ProductDto>, ValidationProblem>> (CreateProduct body, ShopDb db) =>
{
~~~

- [[g]] الـ group بتاع [[/api/products]] (درس MapGroup)، فده [[POST /api/products]].
- نوع الرجوع: [[Created<ProductDto>]] (201) أو [[ValidationProblem]] (400 بشكل الأخطاء)، وبس.
- [[CreateProduct body]]: نوع معقد فبيتقري من الـ JSON body، و [[ShopDb db]] من الـ DI.

### فحص محتاج داتابيز

~~~csharp Extra.cs
var category = await db.Categories.FindAsync(body.CategoryId);
if (category is null)
    return TypedResults.ValidationProblem(new Dictionary<string, string[]>
    {
        ["categoryId"] = [$"Category {body.CategoryId} does not exist."]
    });
~~~

- [[FindAsync(id)]]: هات الصف بالـ primary key، أو null.
- [[Dictionary<string, string[]>]]: قاموس المفتاح فيه اسم الحقل، والقيمة array رسايل (الحقل الواحد ممكن يبقى فيه كذا غلطة).
- [[["categoryId"] = [...]]]: صيغة تملى بيها القاموس وانت بتعمله. الـ [[[ ]]] الأولى المفتاح، والتانية collection expression فيها رسالة واحدة.
- [[TypedResults.ValidationProblem(...)]]: 400 بنفس شكل أخطاء الـ attributes بالظبط، فالـ frontend يتعامل مع نوع واحد.

### الحفظ

~~~csharp Extra.cs
var product = new Product { Name = body.Name, Price = body.Price, Stock = body.Stock, CategoryId = category.Id };
db.Products.Add(product);
await db.SaveChangesAsync();
return TypedResults.Created($"/api/products/{product.Id}", new ProductDto(product.Id, product.Name, product.Price, category.Name));
~~~

- [[new Product { ... }]]: object initializer: اعمل object واملى الـ properties.
- [[db.Products.Add(product)]]: EF يعرف إن ده صف جديد، ولسه مفيش حاجة اتبعتت.
- [[SaveChangesAsync()]]: هنا بس الـ [[INSERT]] بيتنفذ، والداتابيز بترجع الـ [[Id]] الجديد وEF بيحطه في [[product.Id]].
- [[TypedResults.Created(url, body)]]: 201 و [[Location]] بالـ URL.

---

## ٤. التجارب

### ٣ أخطاء مرة واحدة

~~~bash
curl -si -H "Content-Type: application/json" -d '{"name":"x","price":0,"stock":-1,"categoryId":1}' localhost:5925/api/products
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"Name":["The field Name must be a string with a minimum length of 2 and a maximum length of 200."],"Price":["The field Price must be between 0.01 and 100000."],"Stock":["The field Stock must be between 0 and 2147483647."]},"traceId":"00-9f3cd6a765c6e1ebf92d78ef53f41c48-606b75a4f285104d-00"}
~~~

- [[errors]]: كل حقل غلط ورسايله. الـ attributes كلها اتفحصت، مش أول غلطة بس.
- أسماء الحقول [[Name]] و [[Price]] بنفس casing الـ property، مش camelCase.
- الـ category مش اتفحصت: الـ handler مشتغلش أصلًا.

### من غير [[name]] خالص

~~~text الناتج
{"type":"...","title":"One or more validation errors occurred.","status":400,"errors":{"Name":["The Name field is required."]},...}
~~~

الـ [[string Name]] اتربط بـ null، و [[[Required]]] مسكه.

### category مش موجودة

~~~text الناتج: categoryId 42
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"categoryId":["Category 42 does not exist."]},"traceId":"..."}
~~~

نفس الشكل، بس جاي من جوه الـ handler.

### صح

~~~text الناتج: {"name":"Green pen","price":7,"stock":5,"categoryId":1}
HTTP/1.1 201 Created
Location: /api/products/4

{"id":4,"name":"Green pen","price":7,"category":"Pens"}
~~~

---

## ٥. الحل

### [[[NoProfanity]]]

~~~csharp Extra.cs
public class NoProfanityAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext ctx) =>
        value is string s && s.Contains("badword", StringComparison.OrdinalIgnoreCase)
            ? new ValidationResult("Name contains blocked words.")
            : ValidationResult.Success;
}
~~~

- [[: ValidationAttribute]]: الأب بتاع كل الـ attributes اللي فوق.
- اسم الـ class بيخلص بـ [[Attribute]]، وبتستخدمها من غيره: [[[NoProfanity]]].
- [[override IsValid]]: الـ method اللي الـ validator بيناديها. بترجع [[ValidationResult]] فيه الرسالة لو غلط، أو [[ValidationResult.Success]] (اللي هي null) لو تمام.
- [[value is string s]]: pattern (درس switch expression). و [[StringComparison.OrdinalIgnoreCase]]: قارن من غير ما يفرق كابيتال وسمول.

حطيتها جنب التانيين [[[Required, StringLength(200, MinimumLength = 2), NoProfanity]]] وبعت [["my BadWord pen"]]:

~~~text الناتج
HTTP/1.1 400 Bad Request

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"Name":["Name contains blocked words."]},"traceId":"..."}
~~~

### نفس المنتج مرتين

الـ [[Name]] عليه unique index في الداتابيز ([[IX_Products_Name]])، والـ validation مبتعرفش ده. التانية:

~~~text الناتج: Production مع app.UseExceptionHandler()
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.6.1","title":"An error occurred while processing your request.","status":500,"traceId":"00-b301d510762f2b064af7d5751e46952c-00bfe44672e8fab0-00"}
~~~

وفي لوج السيرفر السبب الحقيقي:

~~~text الناتج
Microsoft.EntityFrameworkCore.DbUpdateException: An error occurred while saving the entity changes. See the inner exception for details.
 ---> Npgsql.PostgresException (0x80004005): 23505: duplicate key value violates unique constraint "IX_Products_Name"
~~~

- [[DbUpdateException]] من EF، وجواه ([[--->]] = inner exception) [[PostgresException]] بكود [[23505]] (unique violation في PostgreSQL).
- في Development الرد نفسه كان فيه [["title":"Microsoft.EntityFrameworkCore.DbUpdateException"]] والـ stack trace كامل. مفيد وانت بتطوّر، وخطر لو اتسرب للإنتاج.
- 500 غلط هنا: ده مش خطأ في السيرفر، ده تعارض (409). الدرس الجاي بيحوّله.

---

## الخلاصة

| المرحلة | فين | بيرجع |
|---|---|---|
| قواعد بسيطة (مطلوب، طول، مدى) | attributes + [[AddValidation()]] | 400 قبل الـ handler، كل الأخطاء مرة واحدة |
| قواعد محتاجة داتابيز | جوه الـ handler | [[TypedResults.ValidationProblem]] بنفس الشكل |
| unique و foreign key | الداتابيز نفسها | exception لازم يتحوّل (الدرس الجاي) |

- من غير [[AddValidation()]] في minimal API، الـ attributes مبتعملش أي حاجة.
- attribute خاص = class بتورث [[ValidationAttribute]] وتعمل override لـ [[IsValid]].
- الـ controllers بـ [[[ApiController]]] بيعملوا نفس الفحص من غير [[AddValidation]].`,
          lines: [
            "DTO بـ attributes على الـ parameters.",
            "مطلوب وطوله بين 2 و 200.",
            "سعر موجب.",
            "مخزون مش سالب.",
            "مفيش attribute: أي int.",
            R`.NET 10: validation built-in لـ minimal APIs (في Program.cs).`,
            R`الـ body بيتفحص قبل ما الـ handler يشتغل. نوع الرجوع: 201 أو 400.`,
            "بداية.",
            "فحص محتاج داتابيز: جوه الـ handler.",
            "مش موجودة؟",
            R`400 بنفس شكل أخطاء الـ attributes.`,
            "بداية الـ dictionary.",
            "الحقل ورسايله.",
            "نهاية.",
            "entity جديدة.",
            "ضيفها للـ context.",
            R`[[INSERT]] فعلي.`,
            R`201 + [[Location]] + الـ DTO.`,
            "نهاية."
          ],
          sol: R`الـ request الغلط بيرجع 400 وفيه ٣ أخطاء مرة واحدة: [["Name":["The field Name must be a string with a minimum length of 2 and a maximum length of 200."],"Price":["The field Price must be between 0.01 and 100000."],"Stock":["The field Stock must be between 0 and 2147483647."]]]. الـ category مش بتتفحص لأن الـ handler مشتغلش أصلًا.

الـ attribute: [[public class NoProfanityAttribute : ValidationAttribute { protected override ValidationResult? IsValid(object? value, ValidationContext ctx) => value is string s && s.Contains("badword", StringComparison.OrdinalIgnoreCase) ? new ValidationResult("Name contains blocked words.") : ValidationResult.Success; }]].

المنتج مرتين: التانية بترجع 500 [["title":"An error occurred while processing your request."]] (ده في Production مع [[app.UseExceptionHandler()]]؛ في Development الـ title بيبقى اسم الـ exception نفسه ومعاه الـ stack trace كامل) لأن [[IX_Products_Name]] unique والداتابيز رفضت ([[DbUpdateException]] جواها [[PostgresException 23505]]). ده مكانه الدرس الجاي: تحوّله لـ 409 Conflict.`
        },
        {
          cmd: "ProblemDetails",
          title: "كل الأخطاء بشكل واحد: ProblemDetails و IExceptionHandler",
          desc: R`ProblemDetails (RFC 9457) شكل JSON قياسي للأخطاء: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]، وأي حقول زيادة. ASP.NET Core بيدعمه built-in: [[builder.Services.AddProblemDetails()]] + [[app.UseExceptionHandler()]] + [[app.UseStatusCodePages()]]، فأي exception أو 404 أو 401 بيطلع بالشكل ده بـ [[application/problem+json]] ومعاه [[traceId]].

للأخطاء اللي انت عارفها (المخزون خلص، الطلب اتلغى) اعمل class بتطبق [[IExceptionHandler]] بتحوّل الـ exception لـ status مناسب (409، 422) بدل 500. والـ handlers بتتفحص بالترتيب اللي اتسجلت بيه.

الـ stack trace مبيظهرش للمستخدم أبدًا في Production، بيتسجل في اللوج بس.`,
          example: R`public class DomainExceptionHandler(IProblemDetailsService problems) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext http, Exception ex, CancellationToken ct)
    {
        if (ex is not OutOfStockException oos) return false;
        http.Response.StatusCode = StatusCodes.Status409Conflict;
        return await problems.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = http,
            Exception = ex,
            ProblemDetails = new ProblemDetails
            {
                Title = "Out of stock",
                Detail = ex.Message,
                Status = StatusCodes.Status409Conflict,
                Extensions = { ["productId"] = oos.ProductId }
            }
        });
    }
}
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<DomainExceptionHandler>();
app.UseExceptionHandler();
app.UseStatusCodePages();`,
          try: R`اعمل handler تاني [[DbConflictHandler]] بيمسك [[DbUpdateException]] اللي جواها [[PostgresException]] بـ [[SqlState == "23505"]] (unique violation) ويرجع 409 بـ title [["Duplicate"]]. سجّله وجرّب تضيف نفس المنتج مرتين. وبعدين شيل [[AddProblemDetails]] وشوف شكل الـ 404 بقى إيه.`,
          flag: "script",
          deep: {
            why: R`من غير شكل موحد، كل endpoint بيرجع الخطأ بطريقة: مرة string، ومرة [[{ error: }]]، ومرة [[{ message: }]]، ومرة HTML. الـ frontend بيتعب، والـ stack traces بتتسرب للمستخدم (ثغرة). ProblemDetails بيحل ده مرة واحدة وفي كل الـ framework.`,
            how: R`[[UseExceptionHandler()]] middleware بيلف الـ pipeline كله في try/catch. لما exception يحصل، بيمسح الـ response، ويجرب الـ [[IExceptionHandler]]s بالترتيب: أول واحد يرجع true خلاص. لو محدش مسكه، [[IProblemDetailsService]] بيكتب 500 عام، والـ exception الكامل بيتسجل في اللوج ([[fail: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]]]). أما الـ exception اللي handler بتاعك رجّع له true، فمن .NET 10 الـ middleware مبيسجلوش افتراضيًا (جرّبناها: الـ 409 بتاع OutOfStock مطلعش في اللوج)، فلو عايزه سجّله انت جوه الـ handler.

[[UseStatusCodePages()]] بيملى الـ responses الفاضية اللي status بتاعها 400-599 (زي 404 من الـ routing و 401 من الـ auth) بـ ProblemDetails. و [[TypedResults.NotFound()]] من غير body بيتملى برضه.

في Development لو مفيش [[UseExceptionHandler]]، الـ Developer Exception Page بيشتغل تلقائي وبيطلع الـ stack trace، مفيد وانت بتطور بس لازم ميبقاش في Production.

تقدر تعدّل كل الـ ProblemDetails من مكان واحد: [[AddProblemDetails(o => o.CustomizeProblemDetails = ctx => ctx.ProblemDetails.Extensions["requestId"] = ...)]]. والـ [[traceId]] بيربط الرد باللوج: المستخدم يبعتلك الـ id وانت تدوّر بيه.`,
            when: R`دايمًا في أي API. exceptions مخصصة لحالات الـ domain المعروفة ([[NotFoundException]] و [[ConflictException]] و [[OutOfStockException]]) مع handler واحد يحوّلها، أو [[Result<T>]] وترجع الـ status من الـ endpoint، الاتنين مقبولين وتمسك في واحد. قارن بـ «استراتيجية الأخطاء» في «تاب Backend بـ Node» و [[problem+json]] في «تاب APIs متقدمة».`,
            mistakes: R`try/catch في كل endpoint بيرجع [[BadRequest(ex.Message)]] (بيسرّب تفاصيل داخلية، وبيخلي كل خطأ 400). وترجع 200 وجواه [[{ success: false }]]. وتنسى إن الـ middleware اللي قبل [[UseExceptionHandler]] مش محمي، فحطه أول واحد. ونسيت [[return false]] للأنواع اللي مش بتاعتك فالـ handler يبلع كل حاجة.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيخلي **كل** الأخطاء في الـ API تطلع بشكل JSON واحد (ProblemDetails)، وبيحوّل exception معروف ([[OutOfStockException]]: المخزون خلص) لـ 409 Conflict بدل 500. فيه حتتين: class بتطبق [[IExceptionHandler]]، و ٤ سطور في Program.cs بتربط كل حاجة.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في نفس مشروع الدروس اللي فاتت مع PostgreSQL 16. ضفت endpoint تجربة [[POST /api/cart/{productId}]] بيرمي [[OutOfStockException]] لو المنتج رقم 3، و [[GET /boom]] بيرمي exception عادي رسالته فيها «سر». والـ requests بـ [[curl]] من Git Bash على 5925.

---

## ١. شكل ProblemDetails

ده الشكل القياسي (RFC 9457) اللي كل الأخطاء هتطلع بيه:

~~~text مثال من التجربة
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.10",
  "title": "Out of stock",
  "status": 409,
  "detail": "Product 3 is out of stock",
  "productId": 3,
  "traceId": "00-4016b09f326b307bcf5b1f581ff57830-3b4ca8bd745f907e-00"
}
~~~

| الحقل | معناه |
|---|---|
| [[type]] | لينك بيشرح نوع المشكلة (ASP.NET بيحط لينك الـ status في RFC 9110) |
| [[title]] | عنوان قصير ثابت لنوع المشكلة |
| [[status]] | نفس الـ HTTP status |
| [[detail]] | تفاصيل الحالة دي بالذات |
| [[productId]] | حقل زيادة بتاعنا (extension) |
| [[traceId]] | ID الـ request، بيربط الرد بسطور اللوج |

والـ Content-Type بيبقى [[application/problem+json]].

---

## ٢. الـ exception نفسه

مش في الدرس، بس الـ handler بيستخدمه، فكتبته كده (زي [[NotFoundException]] في درس exceptions):

~~~csharp DomainHandler.cs
public class OutOfStockException(int productId) : Exception($"Product {productId} is out of stock")
{
    public int ProductId { get; } = productId;
}
~~~

---

## ٣. الـ handler

~~~csharp DomainHandler.cs
public class DomainExceptionHandler(IProblemDetailsService problems) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext http, Exception ex, CancellationToken ct)
    {
~~~

- [[: IExceptionHandler]]: interface فيها method واحدة [[TryHandleAsync]]. الملف محتاج [[using Microsoft.AspNetCore.Diagnostics;]] (فيه الـ interface) و [[using Microsoft.AspNetCore.Mvc;]] (فيه [[ProblemDetails]]).
- [[IProblemDetailsService problems]]: service بيكتب ProblemDetails في الرد، جاي من الـ DI (بيتسجل بـ [[AddProblemDetails()]]).
- [[ValueTask<bool>]]: زي [[Task<bool>]] بس أخف لما النتيجة غالبًا جاهزة على طول. والـ bool معناه «مسكته ولا لأ».
- الـ parameters: [[http]] الـ request والـ response، و [[ex]] الـ exception اللي حصل، و [[ct]] token الإلغاء.

### مش بتاعي؟ سيبه

~~~csharp DomainHandler.cs
if (ex is not OutOfStockException oos) return false;
~~~

- [[ex is not OutOfStockException oos]]: pattern (درس switch expression): «لو مش من النوع ده». ولو هو من النوع ده، بيتحط في [[oos]] بنوعه الحقيقي ونكمل بيه تحت.
- [[return false]]: «مش أنا»، فالـ middleware يجرب الـ handler اللي بعدي. لو نسيت السطر ده، الـ handler هيمسك **كل** الأخطاء ويرجعها 409.

### الرد

~~~csharp DomainHandler.cs
http.Response.StatusCode = StatusCodes.Status409Conflict;
return await problems.TryWriteAsync(new ProblemDetailsContext
{
    HttpContext = http,
    Exception = ex,
    ProblemDetails = new ProblemDetails
    {
        Title = "Out of stock",
        Detail = ex.Message,
        Status = StatusCodes.Status409Conflict,
        Extensions = { ["productId"] = oos.ProductId }
    }
});
~~~

- [[StatusCodes.Status409Conflict]]: ثابت قيمته 409. أوضح من كتابة الرقم.
- [[TryWriteAsync(...)]]: اكتب الـ ProblemDetails في الرد، وبترجع true لو كتبته. وبنرجّع نفس الـ bool.
- [[new ProblemDetailsContext { ... }]]: object initializer فيه الـ request والـ exception والمحتوى.
- [[Extensions = { ["productId"] = oos.ProductId }]]: [[Extensions]] قاموس الحقول الزيادة، والصيغة دي بتضيف عليه من غير ما تعمل قاموس جديد. والـ [[traceId]] بيتضاف لوحده.

---

## ٤. الربط في Program.cs

~~~csharp Program.cs
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<DomainExceptionHandler>();
app.UseExceptionHandler();
app.UseStatusCodePages();
~~~

| السطر | بيعمل إيه |
|---|---|
| [[AddProblemDetails()]] | يسجّل [[IProblemDetailsService]]: أي خطأ يتكتب بالشكل ده |
| [[AddExceptionHandler<T>()]] | يسجّل الـ handler (كـ Singleton). ممكن أكتر من واحد، وبيتجربوا بترتيب التسجيل |
| [[UseExceptionHandler()]] | middleware بيلف كل اللي بعده في try/catch، ولما يمسك exception يجرب الـ handlers |
| [[UseStatusCodePages()]] | الردود الـ 4xx و 5xx اللي من غير body (زي 404 من الـ routing و 401 من الـ auth) تتملى ProblemDetails |

الأولين قبل [[builder.Build()]] (services)، والتانيين بعده (middleware)، و [[UseExceptionHandler]] أول واحد في الـ pipeline عشان يحمي كل اللي بعده (درس middleware).

---

## ٥. التجارب

### exception معروف: 409

~~~bash
curl -si -X POST localhost:5925/api/cart/3
~~~

~~~text الناتج
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.10","title":"Out of stock","status":409,"detail":"Product 3 is out of stock","productId":3,"traceId":"00-4016b09f326b307bcf5b1f581ff57830-3b4ca8bd745f907e-00"}
~~~

### exception مش معروف: 500 من غير تفاصيل

~~~text الناتج: curl -si localhost:5925/boom
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.6.1","title":"An error occurred while processing your request.","status":500,"traceId":"00-1549c0b7c2a8fa7321f98bba9dfd26bf-01c31ef4766c50d5-00"}
~~~

الـ handler بتاعنا رجّع false، فالـ middleware كتب 500 عام. الرسالة (اللي فيها «السر») **مظهرتش** للـ client، ولا الـ stack trace، حتى في Development، لأن [[UseExceptionHandler]] موجود. بس في اللوج:

~~~text الناتج: لوج السيرفر
fail: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]
      An unhandled exception has occurred while executing the request.
      System.InvalidOperationException: secret db password is 123
~~~

والمستخدم يبعتلك الـ [[traceId]]، وانت تدوّر بيه في اللوج. ملاحظة: الـ 409 بتاع OutOfStock **مطلعش** في اللوج خالص: من .NET 10 الـ exception اللي handler رجّع له true مبيتسجلش افتراضيًا.

### مسار مش موجود

~~~text الناتج: curl -si localhost:5925/nope
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-a345351dc55fb2c411fe917d14e49180-0e104a0366321e9b-00"}
~~~

ده شغل [[UseStatusCodePages]].

---

## ٦. الحل: [[DbConflictHandler]]

~~~csharp DbConflictHandler.cs
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
~~~

[[Npgsql]] فيه [[PostgresException]]، و [[Microsoft.EntityFrameworkCore]] فيه [[DbUpdateException]].

~~~csharp DbConflictHandler.cs
if (ex is not DbUpdateException { InnerException: PostgresException { SqlState: "23505" } pg }) return false;
~~~

pattern متداخل، نقراه من برّه لجوه:

1. [[DbUpdateException { ... }]]: الـ exception من النوع ده، و...
2. [[InnerException: PostgresException { ... }]]: الـ exception اللي جواه من النوع ده، و...
3. [[SqlState: "23505"]]: كود الخطأ في PostgreSQL = unique violation.
4. [[pg]]: لو كله طابق، الـ PostgresException يتحط في [[pg]].

وباقي الكود زي الـ DomainExceptionHandler، مع [[Title = "Duplicate"]] و [[Detail = $"Value violates {pg.ConstraintName}"]]. وسجلته تاني:

~~~csharp Program.cs
builder.Services.AddExceptionHandler<DbConflictHandler>();
~~~

نفس المنتج مرتين (درس validation كان بيطلّع 500):

~~~text الناتج
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.10","title":"Duplicate","status":409,"detail":"Value violates IX_Products_Name","traceId":"00-2716257dfe7f4178b93f3fe5ac2351e9-e636d6f99956dfc9-00"}
~~~

### لو شلت [[AddProblemDetails]]

التطبيق مقامش أصلًا:

~~~text الناتج
Unhandled exception. System.AggregateException: Some services are not able to be constructed (Error while validating the service descriptor 'ServiceType: Microsoft.AspNetCore.Diagnostics.IExceptionHandler Lifetime: Singleton ImplementationType: DomainExceptionHandler': Unable to resolve service for type 'Microsoft.AspNetCore.Http.IProblemDetailsService' while attempting to activate 'DomainExceptionHandler'.) ...
~~~

- الـ handlers بتوعنا بيطلبوا [[IProblemDetailsService]] في الـ constructor، ومحدش سجله.
- [[Lifetime: Singleton]]: [[AddExceptionHandler]] بيسجّل الـ handler Singleton، فمينفعش يطلب [[ShopDb]] أو أي Scoped service (درس DI و lifetimes).

ولما شلت الـ handlers كمان وسبت [[UseExceptionHandler()]] لوحده:

~~~text الناتج
System.InvalidOperationException: An error occurred when configuring the exception handler middleware. Either the 'ExceptionHandlingPath' or the 'ExceptionHandler' property must be set in 'UseExceptionHandler()'. ... or configure to generate a 'ProblemDetails' response in 'service.AddProblemDetails()'.
~~~

ولما شلته هو كمان، الـ 404 رجع من [[UseStatusCodePages]] كنص عادي:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: text/plain

Status Code: 404; Not Found
~~~

(والـ body بعده مسافات كتير: ASP.NET بيطوّله لـ 512 byte عشان متصفحات قديمة متعرضش صفحة الخطأ بتاعتها بداله.)

---

## الخلاصة

- [[AddProblemDetails()]] + [[UseExceptionHandler()]] + [[UseStatusCodePages()]] = كل الأخطاء [[application/problem+json]].
- [[IExceptionHandler]]: [[return false]] لو مش نوعك، وغير كده اكتب الـ status والـ ProblemDetails وارجع true.
- الـ handlers بتتجرب بترتيب التسجيل، وهي Singleton.
- الـ 500 مبيظهرش فيه الرسالة ولا الـ stack trace، والـ [[traceId]] بيوصلك للّوج.
- [[UseExceptionHandler]] أول middleware.`,
          lines: [
            R`handler بياخد [[IProblemDetailsService]] من الـ DI.`,
            "بداية.",
            R`بيتنادى لأي exception. [[ValueTask]] لأنه غالبًا بيخلص بسرعة.`,
            "بداية.",
            R`مش النوع بتاعي؟ [[false]] = سيبه للـ handler اللي بعدي.`,
            "409.",
            R`اكتب ProblemDetails بالشكل القياسي (ومعاه [[traceId]]).`,
            "بداية.",
            "الـ context.",
            "الـ exception للّوج.",
            "المحتوى.",
            "بداية.",
            "عنوان قصير ثابت لنوع المشكلة.",
            "التفاصيل للحالة دي.",
            "الـ status.",
            R`حقل زيادة: [["productId": 2]].`,
            "نهاية.",
            "نهاية.",
            "نهاية.",
            "نهاية.",
            "تسجيل: ProblemDetails للكل.",
            "تسجيل الـ handler (ممكن أكتر من واحد، بالترتيب).",
            R`الـ middleware: أول حاجة في الـ pipeline.`,
            "الـ responses الفاضية 4xx و 5xx تبقى ProblemDetails."
          ],
          sol: R`الـ handler: [[if (ex is not DbUpdateException { InnerException: PostgresException { SqlState: "23505" } pg }) return false;]] وبعدين نفس الكود بـ 409 و [[Title = "Duplicate"]] و [[Detail = pg.ConstraintName]] (بيطلع [[IX_Products_Name]]). المنتج التاني بقى يرجع [[409]] بدل 500، والـ pattern المتداخل ده (property pattern جوه property pattern) من درس switch expression.

ولما تشيل [[AddProblemDetails]] التطبيق مش هيقوم أصلًا: [[Unable to resolve service for type 'Microsoft.AspNetCore.Http.IProblemDetailsService' while attempting to activate 'Shop.Api.Services.DomainExceptionHandler']]، لأن الـ handlers بتوعك بتطلبه في الـ constructor. ولاحظ من نفس الرسالة إن [[AddExceptionHandler<T>]] بيسجّل الـ handler كـ Singleton، يعني مينفعش تطلب فيه [[ShopDb]] أو أي Scoped service (درس DI و lifetimes). ولو مكانش عندك handlers خاصة، [[app.UseExceptionHandler()]] من غير [[AddProblemDetails]] ولا path هو نفسه بيرمي أول ما الـ pipeline يتبني: [[An error occurred when configuring the exception handler middleware. Either the 'ExceptionHandlingPath' or the 'ExceptionHandler' property must be set]]. ولو شلته أو اديته path، الـ 404 بيرجع من [[UseStatusCodePages]] كنص عادي [[Status Code: 404; Not Found]] بـ [[text/plain]]، مش JSON.`,
          solCode: R`using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

public class DbConflictHandler(IProblemDetailsService problems) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext http, Exception ex, CancellationToken ct)
    {
        if (ex is not DbUpdateException { InnerException: PostgresException { SqlState: "23505" } pg }) return false;
        http.Response.StatusCode = StatusCodes.Status409Conflict;
        return await problems.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = http,
            Exception = ex,
            ProblemDetails = new ProblemDetails
            {
                Title = "Duplicate",
                Detail = $"Value violates {pg.ConstraintName}",
                Status = StatusCodes.Status409Conflict
            }
        });
    }
}`
        }
      ]
    }
]);
