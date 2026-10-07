// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "الاختبارات",
      l: 3,
      n: "xUnit، و NSubstitute و Moq للـ mocks، و WebApplicationFactory لاختبار الـ API كله",
      items: [
        {
          cmd: "xUnit",
          title: "xUnit: Fact و Theory و dotnet test",
          desc: R`xUnit أشهر test framework في .NET (فيه كمان NUnit و MSTest). الاختبار method عليها [[[Fact]]]، ولو نفس الاختبار بقيم مختلفة [[[Theory]]] مع [[[InlineData(...)]]]. والفحص بـ [[Assert.Equal(expected, actual)]] و [[Assert.True]] و [[Assert.ThrowsAsync<T>]] و [[Assert.Contains]].

الـ SDK فيه قالب [[dotnet new xunit]] (xUnit v2). النسخة الحالية xUnit v3، وليها قالب [[xunit3]] من حزمة [[xunit.v3.templates]]، ومشروع الاختبار فيها بيبقى exe وبيشتغل على Microsoft Testing Platform. الكود نفسه تقريبًا زي ما هو.

[[dotnet test]] بيبني ويشغّل كل الاختبارات، ولكل class instance جديد لكل اختبار (فمفيش state بيتسرب بين الاختبارات)، والـ setup بيبقى في الـ constructor.`,
          example: R`dotnet new install xunit.v3.templates
dotnet new xunit3 -o Shop.Tests -f net10.0
dotnet sln add Shop.Tests
dotnet reference add Shop.Api --project Shop.Tests
dotnet test
dotnet test --project Shop.Tests --filter-method "*Unknown*"`,
          try: R`اعمل مشروع الاختبار واكتب [[Theory]] لـ [[PriceFormatter.Format]] (من درس sln و NuGet) بـ ٣ قيم. وبعدين اكسر اختبار عمدًا وشوف شكل الفشل في الـ terminal.`,
          deep: {
            why: R`الـ API اللي مفيهوش اختبارات بيتكسر في كل refactor ومحدش بيعرف غير من المستخدمين. وفي الشركات الـ PR مش هيتدمج من غير اختبارات، والـ CI بيشغّل [[dotnet test]] على كل push (شوف «تاب GitHub Actions»).`,
            how: R`[[dotnet test]] بيبني مشروع الاختبار (اللي عامل reference للمشروع الأصلي)، والـ test runner بيدوّر على الـ methods اللي عليها [[[Fact]]] أو [[[Theory]]] ويشغّلها. الـ classes المختلفة ممكن تشتغل بالتوازي، والاختبارات جوه نفس الـ class بالترتيب.

في xUnit v3 بـ Microsoft Testing Platform: فيه [[global.json]] بيقول [["test": { "runner": "Microsoft.Testing.Platform" }]]، والفلترة بقت [[--filter-method]] و [[--filter-class]] بدل [[--filter]] القديمة. و [[TestContext.Current.CancellationToken]] بيتلغي لو الاختبار اتلغى، والـ analyzer بيحذرك (xUnit1051) لو مش بتبعته للـ async methods.

الـ setup المشترك الغالي (داتابيز، سيرفر) بيبقى في fixture: [[IClassFixture<T>]] لكل الاختبارات في class، و [[ICollectionFixture<T>]] لكذا class. والـ async setup بـ [[IAsyncLifetime]] ([[InitializeAsync]] و [[DisposeAsync]]).

الأسماء بالعرف بتوصف السلوك: [[Sends_receipt_when_payment_succeeds]] مش [[Test1]].`,
            when: R`unit tests لمنطق الـ domain والـ services (سريعة، من غير I/O). integration tests للـ endpoints مع داتابيز حقيقية (درس WebApplicationFactory). ومتختبرش الـ framework نفسه (إن [[[Required]]] بيشتغل).`,
            mistakes: R`[[async void]] في اختبار (الفشل مش بيتشاف): لازم [[async Task]]. و [[Assert.Equal(actual, expected)]] بالعكس فرسالة الفشل تلخبطك. واختبارات بتعتمد على بعض أو على الترتيب. واختبار بيستخدم [[DateTime.Now]] فينجح الصبح ويفشل بالليل: استخدم [[TimeProvider]] و [[FakeTimeProvider]].`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

بتعمل مشروع اختبارات بـ xUnit v3 جنب الـ API، وتربطه بيه، وتشغّل الاختبارات كلها أو جزء منها. كل الناتج هنا حقيقي من [[mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في Docker، على solution فيها [[Shop.Core]] (فيه [[PriceFormatter]]) و [[Shop.Api]].

---

## ١. القوالب: [[dotnet new install xunit.v3.templates]]

~~~text الناتج
Success: xunit.v3.templates@4.0.1 installed the following templates:
Template Name                   Short Name        Language    Tags
------------------------------  ----------------  ----------  ----------------------
xUnit.net v3 Extension Project  xunit3-extension  [C#],F#,VB  Test/xUnit
xUnit.net v3 Test Project       xunit3            [C#],F#,VB  Test/xUnit/Desktop/Web
~~~

- [[dotnet new install]]: بيسطّب **قوالب** جديدة لـ [[dotnet new]] من NuGet. مرة واحدة على الجهاز، مش في المشروع.
- الـ SDK فيه [[xunit]] (v2) جاهز، واحنا عايزين [[xunit3]].

---

## ٢. المشروع: [[dotnet new xunit3 -o Shop.Tests -f net10.0]]

- [[-o Shop.Tests]]: output: فولدر ومشروع بالاسم ده.
- [[-f net10.0]]: الـ framework. من غيرها القالب بيختار .NET 8 ([[--help]] بيقول [[Default: net8.0]]).

اتعمل:

~~~text الملفات
Shop.Tests/Shop.Tests.csproj
Shop.Tests/UnitTest1.cs
Shop.Tests/xunit.runner.json
global.json
~~~

والـ [[.csproj]]:

~~~text Shop.Tests.csproj (مختصر)
<OutputType>Exe</OutputType>
<TargetFramework>net10.0</TargetFramework>
<Using Include="Xunit" />
<PackageReference Include="xunit.v3.mtp-v2" Version="4.0.1" />
~~~

- [[OutputType Exe]]: مشروع الاختبار في v3 برنامج بيتشغّل لوحده، مش DLL محتاج runner برّه.
- [[Using Include="Xunit"]]: global using، فمش محتاج تكتب [[using Xunit;]] في كل ملف.
- [[xunit.v3.mtp-v2]]: xUnit v3 على **Microsoft Testing Platform** (MTP) v2.

و [[global.json]] اتعمل في الفولدر اللي شغّلنا منه:

~~~text global.json
{
  "test": {
    "runner": "Microsoft.Testing.Platform"
  }
}
~~~

ده بيقول لـ [[dotnet test]] «استخدم MTP مش VSTest القديم». وده اللي بيغيّر شكل الـ flags تحت.

---

## ٣. الربط: [[dotnet sln add]] و [[dotnet reference add]]

~~~text الناتج
Project $__btShop.Tests/Shop.Tests.csproj$__bt added to the solution.
Reference $__bt..\Shop.Api\Shop.Api.csproj$__bt added to the project.
~~~

- [[dotnet sln add Shop.Tests]]: ضيفه لملف الـ solution. في .NET 10 [[dotnet new sln]] بيعمل [[Shop.slnx]] (XML بسيط) بدل [[.sln]] القديم:

~~~text Shop.slnx
<Solution>
  <Project Path="Shop.Api/Shop.Api.csproj" />
  <Project Path="Shop.Core/Shop.Core.csproj" />
  <Project Path="Shop.Tests/Shop.Tests.csproj" />
</Solution>
~~~

- [[dotnet reference add Shop.Api --project Shop.Tests]]: مشروع الاختبار يقدر يشوف كود [[Shop.Api]] (وكمان [[Shop.Core]] اللي [[Shop.Api]] بيعتمد عليه). [[--project]] = «ضيف الـ reference في المشروع ده».

---

## ٤. الاختبار نفسه (الـ solCode)

~~~csharp Shop.Tests/PriceFormatterTests.cs
using Shop.Core;

namespace Shop.Tests;

public class PriceFormatterTests
{
    [Theory]
    [InlineData(19.5, "19.50 EGP")]
    [InlineData(0, "0.00 EGP")]
    [InlineData(1234.567, "1234.57 EGP")]
    public void Formats_prices(decimal price, string expected) =>
        Assert.Equal(expected, PriceFormatter.Format(price));
}
~~~

- [[public class]]: لازم [[public]] عشان xUnit يلاقيها.
- [[[Theory]]]: اختبار بياخد parameters. ولو مش بياخد: [[[Fact]]].
- [[[InlineData(19.5, "19.50 EGP")]]]: مجموعة قيم. كل سطر = اختبار لوحده. القيم بتتبعت بالترتيب لـ [[price]] و [[expected]].
  - [[19.5]] مكتوبة double مش [[19.5m]]: الـ attributes في C# مبتقبلش decimal، و xUnit بيحوّلها لـ [[decimal]] لوحده.
- [[=>]]: body من سطر واحد.
- [[Assert.Equal(expected, actual)]]: المتوقع **الأول**. لو عكستهم رسالة الفشل هتقول العكس.

---

## ٥. التشغيل: [[dotnet test]]

~~~text الناتج
Running tests from /w/shop/Shop.Tests/bin/Debug/net10.0/Shop.Tests.dll (net10.0|x64)
/w/shop/Shop.Tests/bin/Debug/net10.0/Shop.Tests.dll (net10.0|x64) passed (789ms)

Test run summary: Passed!
  total: 4
  failed: 0
  succeeded: 4
  skipped: 0
  duration: 1s 443ms
~~~

[[total: 4]]: الـ Theory = ٣ اختبارات (واحد لكل [[InlineData]]) + [[Test1]] اللي في [[UnitTest1.cs]] من القالب.

### لما يفشل

ضفنا اختبار بيتوقع [["19.5 EGP"]]:

~~~text الناتج
failed Shop.Tests.BrokenTests.Formats_without_trailing_zero (19ms)
  Assert.Equal() Failure: Strings differ
                 ↓ (pos 4)
  Expected: "19.5 EGP"
  Actual:   "19.50 EGP"
                 ↑ (pos 4)
    at Shop.Tests.BrokenTests.Formats_without_trailing_zero() in /w/shop/Shop.Tests/BrokenTests.cs:6

Test run summary: Failed!
  total: 5
  failed: 1
  succeeded: 4
Test run completed with non-success exit code: 2 (see: https://aka.ms/testingplatform/exitcodes)
~~~

- اسم الاختبار كامل (namespace.class.method)، والسهمين بيشاوروا على أول حرف مختلف (المكان رقم 4، العد من 0).
- الملف ورقم السطر ([[BrokenTests.cs:6]]).
- [[exit code: 2]]: فيه اختبارات فشلت. أي رقم غير 0 بيوقّع خطوة الـ CI.

---

## ٦. الفلترة: [[--filter-method]]

~~~bash
dotnet test --project Shop.Tests --filter-method "*Formats_prices*"
~~~

~~~text الناتج
Test run summary: Passed!
  total: 3
~~~

- [[--project Shop.Tests]]: شغّل المشروع ده بس.
- [[--filter-method "*Formats_prices*"]]: الـ methods اللي اسمها فيه الكلمة دي. [[*]] = أي حروف.

والسطر اللي في المثال [["*Unknown*"]] بيدوّر على اختبار درس WebApplicationFactory. قبل ما تكتبه:

~~~text الناتج
Test run summary: Zero tests ran
  total: 0
Test run completed with non-success exit code: 8 (see: https://aka.ms/testingplatform/exitcodes)
~~~

[[8]] = مفيش ولا اختبار اتشغّل، وده بيتحسب فشل (عشان فلتر غلط ميعدّيش في الـ CI كأنه نجاح).

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[dotnet new install xunit.v3.templates]] | قوالب xUnit v3 (مرة على الجهاز) |
| [[dotnet new xunit3 -o X -f net10.0]] | مشروع اختبار exe على MTP، و [[global.json]] |
| [[dotnet sln add X]] | يضيفه للـ [[.slnx]] |
| [[dotnet reference add Shop.Api --project X]] | يشوف كود الـ API |
| [[dotnet test]] | يبني ويشغّل الكل، و exit code غير 0 لو فيه فشل |
| [[--filter-method "*name*"]] | جزء من الاختبارات |

- [[[Fact]]] من غير parameters، و [[[Theory]]] + [[[InlineData]]] لكذا قيمة.
- [[Assert.Equal(expected, actual)]]: المتوقع الأول.`,
          lines: [
            "قوالب xUnit v3 (مرة واحدة على الجهاز).",
            R`مشروع اختبار v3 على .NET 10 (الافتراضي في القالب net8.0).`,
            "ضيفه للـ solution.",
            "يقدر يشوف كود الـ API.",
            R`كل الاختبارات: [[Test run summary: Passed! total: 8]].`,
            "اختبارات معينة بالاسم (فلترة Microsoft Testing Platform)."
          ],
          sol: R`[[[Theory] [InlineData(19.5, "19.50 EGP")] [InlineData(0, "0.00 EGP")] [InlineData(1234.567, "1234.57 EGP")] public void Formats_prices(decimal price, string expected) => Assert.Equal(expected, PriceFormatter.Format(price));]]. خد بالك: [[InlineData]] مبيقبلش decimal literals ([[19.5m]]) لأن الـ attributes في C# مبتقبلش decimal، فبتكتب double والـ xUnit بيحوّل للـ parameter. جرّبناها: التلات حالات عدّوا (والمجموع بقى [[total: 11]] مع باقي اختبارات المشروع).

الفشل شكله: [[failed Shop.Tests.ProductApiTests.Creating_a_product_needs_the_admin_role (270ms)]] وتحته [[Assert.Equal() Failure: Values differ]] و [[Expected: Created]] و [[Actual: Forbidden]] واسم الملف ورقم السطر، وفي الآخر [[Test run summary: Failed!]] و exit code غير صفر (فالـ CI بيقع). لو [[dotnet test]] مش لاقي اختبارات: اتأكد إن الـ class [[public]] والـ method [[public]] وعليها [[[Fact]]].`,
          solCode: R`using Shop.Core;

namespace Shop.Tests;

public class PriceFormatterTests
{
    [Theory]
    [InlineData(19.5, "19.50 EGP")]
    [InlineData(0, "0.00 EGP")]
    [InlineData(1234.567, "1234.57 EGP")]
    public void Formats_prices(decimal price, string expected) =>
        Assert.Equal(expected, PriceFormatter.Format(price));
}`
        },
        {
          cmd: "NSubstitute و Moq",
          title: "mocks: تختبر service من غير payment gateway ولا إيميلات حقيقية",
          desc: R`الـ service اللي بتاخد [[IPaymentGateway]] و [[IEmailSender]] في الـ constructor تقدر تختبرها بـ implementations مزيفة: بتقولها «لو اتنادت بالقيم دي رجّع true»، وبعدين تتأكد «اتنادت مرة بالقيم دي؟».

NSubstitute: [[Substitute.For<IPaymentGateway>()]]، و [[.Returns(true)]]، و [[.Received(1).SendAsync(...)]]. Moq: [[new Mock<IPaymentGateway>()]]، و [[.Setup(...).ReturnsAsync(true)]]، و [[.Verify(..., Times.Once)]]. الاتنين بيعملوا نفس الحاجة، و NSubstitute syntax بتاعه أقصر. واللي بيخلي ده ممكن أصلًا هو إن الـ dependencies interfaces (درس interface).`,
          example: R`public class CheckoutServiceTests
{
    private readonly IPaymentGateway _payments = Substitute.For<IPaymentGateway>();
    private readonly IEmailSender _email = Substitute.For<IEmailSender>();
    private readonly CheckoutService _sut;
    public CheckoutServiceTests() => _sut = new CheckoutService(_payments, _email);
    [Fact]
    public async Task Sends_receipt_when_payment_succeeds()
    {
        _payments.ChargeAsync("sara@x.com", 150m, Arg.Any<CancellationToken>()).Returns(true);
        var ok = await _sut.PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken);
        Assert.True(ok);
        await _email.Received(1).SendAsync("sara@x.com", "Paid 150.00 EGP", Arg.Any<CancellationToken>());
    }
    [Fact]
    public async Task No_email_when_payment_fails()
    {
        _payments.ChargeAsync(default!, default, default).ReturnsForAnyArgs(false);
        Assert.False(await _sut.PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken));
        await _email.DidNotReceiveWithAnyArgs().SendAsync(default!, default!, default);
    }
}`,
          try: R`اكتب [[CheckoutService]] (بتشحن الفلوس، ولو نجحت تبعت إيميل) وشغّل الاختبارين. وبعدين اكتب اختبار تالت: لو الـ payment رمى [[HttpRequestException]]، الـ service لازم ترمي نفس الـ exception ومتبعتش إيميل. استخدم [[.ThrowsAsync(...)]] من [[NSubstitute.ExceptionExtensions]]. واكتب واحد منهم بـ Moq للمقارنة.`,
          flag: "script",
          deep: {
            why: R`الـ unit test لازم يبقى سريع ومحدد: لو بيكلم Stripe فعلًا هيبقى بطيء ومكلف وبيفشل لأسباب ملهاش علاقة بالكود. الـ mocks بتعزل الـ service وبتخليك تختبر حالات صعب تعملها في الحقيقة (الـ gateway واقع، أو رجّع رفض).`,
            how: R`الاتنين بيولّدوا class وقت التشغيل (بـ Castle DynamicProxy) بتطبق الـ interface وبتسجل كل نداء. [[Returns]] بيحدد الرد لـ arguments معينة، و [[Arg.Any<T>()]] (أو [[It.IsAny<T>()]] في Moq) لأي قيمة. أي نداء مش متعرّف بيرجع default (false أو null أو Task مكتمل).

[[Received(1)]] بيفحص إن النداء حصل مرة بالظبط بالقيم دي، ولو محصلش بيرمي exception فيه النداءات اللي حصلت فعلًا. [[DidNotReceiveWithAnyArgs]] إن محصلش نداء خالص.

[[_sut]] (system under test) بيتعمل في الـ constructor، و xUnit بيعمل instance جديد لكل اختبار، فكل اختبار بـ mocks نضيفة.

للـ classes (مش interfaces) الـ mocking بيشتغل على [[virtual]] members بس، وده سبب إضافي إن الـ dependencies تبقى interfaces. و [[DbContext]] متعملوش mock: استخدم داتابيز حقيقية في integration test (أو SQLite in-memory لو لازم).`,
            when: R`mocks للـ dependencies اللي برّه حدودك: payment، email، SMS، HTTP APIs، الوقت ([[FakeTimeProvider]]). مش لكل حاجة: لو الـ service بتنادي class حسابات بحتة، استخدم الحقيقية. وكتير من الفرق بتفضّل integration tests للـ API وتقلل الـ mocks.`,
            mistakes: R`تعمل mock للـ DbContext أو [[IQueryable]] (بيعدّي في الاختبار ويقع مع SQL الحقيقي). و verify على كل نداء فالاختبار يتكسر مع أي refactor (اختبر النتيجة، و verify على الـ side effects المهمة بس). ومعلومة بتتسأل: في ٢٠٢٣ Moq 4.20 ضاف SponsorLink (بيقرا إيميل الـ git وقت الـ build) واتشال بعد اعتراضات، وده خلى فرق كتير تنقل لـ NSubstitute.`
          },
          teach: R`## المثال ده بيعمل إيه؟

[[CheckoutService]] (في الـ solCode) بتشحن الفلوس من [[IPaymentGateway]]، ولو نجحت تبعت إيميل من [[IEmailSender]]. الاختبارين بيختبروها من غير gateway ولا إيميل حقيقي: بنعمل نسخ مزيفة (**mocks**) من الـ interfaces، نقولها ترد بإيه، ونفحص اتنادت إزاي. الناتج حقيقي: الملفين في مشروع [[Shop.Tests]] (xUnit v3) مع NSubstitute 6.2.0 و Moq 4.21.0، و [[dotnet test]] جوه [[mcr.microsoft.com/dotnet/sdk:10.0]].

---

## ١. الـ service اللي بنختبرها (الـ solCode)

~~~csharp Shop.Api/Services/CheckoutService.cs
public interface IPaymentGateway { Task<bool> ChargeAsync(string email, decimal amount, CancellationToken ct); }
public interface IEmailSender { Task SendAsync(string to, string subject, CancellationToken ct); }

public class CheckoutService(IPaymentGateway payments, IEmailSender email)
{
    public async Task<bool> PayAsync(string customer, decimal total, CancellationToken ct = default)
    {
        if (total <= 0) throw new ArgumentOutOfRangeException(nameof(total));
        var ok = await payments.ChargeAsync(customer, total, ct);
        if (ok) await email.SendAsync(customer, $"Paid {total:0.00} EGP", ct);
        return ok;
    }
}
~~~

- الـ interfaces: «عقد» بس من غير كود. الـ gateway الحقيقي (Stripe مثلًا) بيطبقه في الإنتاج، والـ mock بيطبقه في الاختبار.
- [[CheckoutService(IPaymentGateway payments, IEmailSender email)]]: primary constructor: الـ dependencies جاية من برّه (DI). ده اللي بيخلي الاختبار ممكن.
- [[CancellationToken ct = default]]: parameter اختياري، و [[default]] = token مبيتلغيش.
- [[nameof(total)]]: النص [["total"]]، بس لو غيّرت اسم الـ parameter الـ compiler يغيّره.
- [[$"Paid {total:0.00} EGP"]]: [[:0.00]] format: رقمين بعد العلامة دايمًا. فـ 150 تبقى [["Paid 150.00 EGP"]].

---

## ٢. الـ class والـ fields

~~~csharp Shop.Tests/CheckoutServiceTests.cs
public class CheckoutServiceTests
{
    private readonly IPaymentGateway _payments = Substitute.For<IPaymentGateway>();
    private readonly IEmailSender _email = Substitute.For<IEmailSender>();
    private readonly CheckoutService _sut;
    public CheckoutServiceTests() => _sut = new CheckoutService(_payments, _email);
~~~

- [[Substitute.For<IPaymentGateway>()]]: NSubstitute بيعمل **وقت التشغيل** class بتطبق الـ interface، وبتسجّل كل نداء، وأي نداء مش متظبط بترجّع default ([[false]] لـ [[Task<bool>]]).
- [[private readonly]]: field متتغيرش بعد الـ constructor.
- [[_sut]]: اختصار **System Under Test**: الحاجة اللي بنختبرها. اسم متعارف عليه.
- الـ constructor بيعمل الـ service بالـ mocks. و xUnit بيعمل **instance جديد من الـ class لكل اختبار**، فكل اختبار بياخد mocks نضيفة.

---

## ٣. الاختبار الأول: الدفع نجح

~~~csharp
[Fact]
public async Task Sends_receipt_when_payment_succeeds()
{
    _payments.ChargeAsync("sara@x.com", 150m, Arg.Any<CancellationToken>()).Returns(true);
    var ok = await _sut.PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken);
    Assert.True(ok);
    await _email.Received(1).SendAsync("sara@x.com", "Paid 150.00 EGP", Arg.Any<CancellationToken>());
}
~~~

الاختبار ٣ خطوات، اسمهم Arrange و Act و Assert:

**Arrange:** [[_payments.ChargeAsync(...).Returns(true)]]
- شكلها نداء، بس NSubstitute فاهم إنك بتظبط: «لما يتنادى بالقيم دي، رجّع [[true]]».
- [[Arg.Any<CancellationToken>()]]: أي token. لأننا مش فارق معانا هو أنهي.
- [[.Returns(true)]]: رغم إن الـ method بترجّع [[Task<bool>]]، NSubstitute بيلف الـ [[true]] في Task لوحده.

**Act:** [[await _sut.PayAsync(...)]]
- [[TestContext.Current.CancellationToken]]: token بتاع xUnit v3 بيتلغي لو الاختبار اتلغى (timeout أو Ctrl+C).

**Assert:**
- [[Assert.True(ok)]]: النتيجة.
- [[_email.Received(1).SendAsync(...)]]: «اتأكد إن [[SendAsync]] اتنادت **مرة واحدة بالظبط** بالقيم دي». لو لأ بيرمي ويفشّل الاختبار. والـ [[await]] قبلها عشان الـ method بترجّع Task.

---

## ٤. الاختبار التاني: الدفع فشل

~~~csharp
[Fact]
public async Task No_email_when_payment_fails()
{
    _payments.ChargeAsync(default!, default, default).ReturnsForAnyArgs(false);
    Assert.False(await _sut.PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken));
    await _email.DidNotReceiveWithAnyArgs().SendAsync(default!, default!, default);
}
~~~

- [[ReturnsForAnyArgs(false)]]: «رجّع false مهما كانت القيم». فالقيم اللي في النداء مجرد مكان فاضي: [[default!]] (null لـ string، والـ [[!]] يسكّت تحذير الـ nullable) و [[default]] (0 للـ decimal، و token فاضي).
- [[DidNotReceiveWithAnyArgs()]]: «اتأكد إنها **ماتنادتش خالص** بأي قيم».

ملحوظة من التشغيل: الـ analyzer بتاع xUnit طلّع warning على السطرين دول:

~~~text الناتج
warning xUnit1051: Calls to methods which accept CancellationToken should use TestContext.Current.CancellationToken to allow test cancellation to be more responsive.
~~~

هو شايف [[default]] في مكان [[CancellationToken]]. هنا ده نداء ظبط مش نداء حقيقي، فالتحذير ملوش لازمة، والاختبار شغال.

---

## ٥. [[dotnet test]]

بعد ما ضفنا اختبار الـ exception (التجربة، تحت) و [[Theory]] بقيمتين لـ [[total <= 0]] ونسخة Moq:

~~~text الناتج
Test run summary: Passed!
  total: 9
  failed: 0
  succeeded: 9
~~~

الـ ٩ = ٦ اختبارات checkout (الاتنين اللي في المثال، والـ exception، والـ Theory بقيمتين، و Moq) + ٣ من [[PriceFormatter]] بتاع الدرس اللي فات.

### ولو الـ [[Received]] فشل؟

غيّرنا النص المتوقع لـ [["Paid 150 EGP"]]:

~~~text الناتج
failed Shop.Tests.CheckoutServiceTests.Wrong_text_on_purpose (9ms)
  NSubstitute.Exceptions.ReceivedCallsException : Expected to receive exactly 1 call matching:
  	SendAsync("sara@x.com", "Paid 150 EGP", any CancellationToken)
  Actually received no matching calls.
  Received 1 non-matching call (non-matching arguments indicated with '*' characters):
  	SendAsync("sara@x.com", *"Paid 150.00 EGP"*, System.Threading.CancellationToken)
~~~

الرسالة بتقولك المتوقع، واللي حصل فعلًا، والنجوم حوالين الـ argument المختلف بالظبط.

---

## ٦. التجربة: الـ gateway رمى exception

~~~csharp
_payments.ChargeAsync(default!, default, default).ThrowsAsyncForAnyArgs(new HttpRequestException("gateway down"));
await Assert.ThrowsAsync<HttpRequestException>(() => _sut.PayAsync("a@b.c", 10m, TestContext.Current.CancellationToken));
await _email.DidNotReceiveWithAnyArgs().SendAsync(default!, default!, default);
~~~

- [[ThrowsAsyncForAnyArgs]]: من [[using NSubstitute.ExceptionExtensions;]]: الـ Task اللي راجع بيفشل بالـ exception دي.
- [[Assert.ThrowsAsync<T>(() => ...)]]: بياخد lambda بترجّع Task، ويتأكد إنها رمت [[T]] بالظبط. نجح.

---

## ٧. نفس الكلام بـ Moq

~~~csharp
var payments = new Mock<IPaymentGateway>();
var email = new Mock<IEmailSender>();
payments.Setup(p => p.ChargeAsync("sara@x.com", 150m, It.IsAny<CancellationToken>())).ReturnsAsync(true);
var ok = await new CheckoutService(payments.Object, email.Object).PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken);
email.Verify(e => e.SendAsync("sara@x.com", It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
~~~

| | NSubstitute | Moq |
|---|---|---|
| الـ mock | [[Substitute.For<T>()]] (هو نفسه الـ T) | [[new Mock<T>()]] و [[.Object]] |
| ظبط الرد | [[.Returns(true)]] | [[.Setup(lambda).ReturnsAsync(true)]] |
| أي قيمة | [[Arg.Any<T>()]] | [[It.IsAny<T>()]] |
| اتنادت مرة؟ | [[.Received(1).Method(...)]] | [[.Verify(lambda, Times.Once)]] |
| ماتنادتش | [[.DidNotReceiveWithAnyArgs()]] | [[.Verify(..., Times.Never)]] |

---

## الخلاصة

- الـ mock بيشتغل لأن الـ service بتاخد **interfaces** في الـ constructor.
- Arrange ([[Returns]]) ثم Act (نادي الـ [[_sut]]) ثم Assert (النتيجة + [[Received]] على الـ side effects المهمة).
- [[ForAnyArgs]] لما القيم مش فارقة، و [[Arg.Any<T>()]] لـ argument واحد.
- متعملش mock لـ [[DbContext]]: داتابيز حقيقية في integration test (الدرس الجاي).`,
          lines: [
            "class الاختبارات.",
            "بداية.",
            "mock للـ payment.",
            "mock للإيميل.",
            "الـ service اللي بنختبرها.",
            "instance جديد لكل اختبار = mocks جديدة.",
            "اختبار.",
            R`[[async Task]] مش void.`,
            "بداية.",
            "Arrange: الـ payment هيرجع true للقيم دي.",
            R`Act: نادي الـ service بالـ token بتاع الاختبار.`,
            "Assert: النتيجة.",
            "Assert: الإيميل اتبعت مرة بالنص ده بالظبط.",
            "نهاية.",
            "اختبار تاني.",
            "method.",
            "بداية.",
            "أي arguments = false.",
            "رجّع false.",
            "ومفيش إيميل خالص.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`[[dotnet test]] بيطلع [[total: 5, succeeded: 5]] (الاختبارين + [[Theory]] بقيمتين لـ [[total <= 0]] + نسخة Moq). اختبار الـ exception: [[_payments.ChargeAsync(default!, default, default).ThrowsAsyncForAnyArgs(new HttpRequestException("gateway down"));]] ثم [[await Assert.ThrowsAsync<HttpRequestException>(() => _sut.PayAsync("a@b.c", 10m));]] و [[await _email.DidNotReceiveWithAnyArgs().SendAsync(default!, default!, default);]].

بـ Moq: [[payments.Setup(p => p.ChargeAsync("sara@x.com", 150m, It.IsAny<CancellationToken>())).ReturnsAsync(true);]] و [[email.Verify(e => e.SendAsync("sara@x.com", It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);]]، والـ object بيتبعت بـ [[payments.Object]]. ولو الـ Received فشل (جرّبنا نغيّر النص المتوقع لـ [["Paid 150 EGP"]]) الرسالة: [[Expected to receive exactly 1 call matching: SendAsync("sara@x.com", "Paid 150 EGP", any CancellationToken) Actually received no matching calls.]] وتحتها [[Received 1 non-matching call (non-matching arguments indicated with '*' characters): SendAsync("sara@x.com", *"Paid 150.00 EGP"*, ...)]]. النجوم بتوريك الـ argument اللي مختلف بالظبط.`,
          solCode: R`namespace Shop.Api.Services;

public interface IPaymentGateway { Task<bool> ChargeAsync(string email, decimal amount, CancellationToken ct); }
public interface IEmailSender { Task SendAsync(string to, string subject, CancellationToken ct); }

public class CheckoutService(IPaymentGateway payments, IEmailSender email)
{
    public async Task<bool> PayAsync(string customer, decimal total, CancellationToken ct = default)
    {
        if (total <= 0) throw new ArgumentOutOfRangeException(nameof(total));
        var ok = await payments.ChargeAsync(customer, total, ct);
        if (ok) await email.SendAsync(customer, $"Paid {total:0.00} EGP", ct);
        return ok;
    }
}`
        },
        {
          cmd: "WebApplicationFactory",
          title: "WebApplicationFactory: تختبر الـ API كله بـ HTTP وداتابيز حقيقية",
          desc: R`[[WebApplicationFactory<Program>]] (حزمة [[Microsoft.AspNetCore.Mvc.Testing]]) بيشغّل التطبيق بتاعك كله في الذاكرة، بنفس [[Program.cs]] ونفس الـ middleware والـ DI، ويديك [[HttpClient]] تبعت بيه requests حقيقية. مفيش بورت ولا شبكة، فسريع.

بتعدّل فيه اللي محتاجه للاختبار: environment اسمه [[Testing]]، و connection string لداتابيز اختبار، و [[ConfigureTestServices]] تشيل الـ background services أو تبدّل الـ payment gateway بـ fake.

الـ factory محتاجة توصل لـ [[Program]]. الـ top-level statements بتعمل [[Program]] internal، بس من .NET 10 الـ Web SDK بيولّد [[public partial class Program]] لوحده، فمش محتاج تكتب حاجة (لو كتبت [[public partial class Program;]] بإيدك الـ analyzer بيقولك إنها زيادة: ASP0027). في .NET 8 و 9 لازم تكتبها في آخر [[Program.cs]].`,
          example: R`public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("ConnectionStrings:Shop", "Host=localhost;Database=shop_test;Username=shop;Password=shop");
        builder.UseSetting("Jwt:Key", "test-key-test-key-test-key-test-key-1234");
        builder.ConfigureTestServices(services => services.RemoveAll<IHostedService>());
    }
    public async ValueTask InitializeAsync()
    {
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
        await db.Database.EnsureDeletedAsync();
        await db.Database.EnsureCreatedAsync();
        db.Products.Add(new Product { Name = "Blue pen", Price = 5.5m, Stock = 10, Category = new Category { Name = "Pens" } });
        await db.SaveChangesAsync();
    }
}
public class ProductApiTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    [Fact]
    public async Task Unknown_product_returns_problem_details_404()
    {
        var res = await factory.CreateClient().GetAsync("/api/products/9999", TestContext.Current.CancellationToken);
        Assert.Equal(HttpStatusCode.NotFound, res.StatusCode);
        Assert.Equal("application/problem+json", res.Content.Headers.ContentType?.MediaType);
    }
}`,
          try: R`اكتب اختبار [[Creating_a_product_needs_the_admin_role]]: نفس الـ POST تلات مرات (من غير توكن، وبتوكن user، وبتوكن admin) وتتأكد من 401 و 403 و 201. التوكن اعمله من [[TokenService]] اللي في [[factory.Services]]. وبعدين ضيف في آخر [[Program.cs]] سطر [[partial class Program { }]] (من غير [[public]]) وشوف الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ unit tests مش بتختبر الـ routing والـ binding والـ validation والـ auth والـ EF mapping مع بعض، ودول مكان أغلب الـ bugs في API. اختبار integration واحد بيعدي على كل الطبقات بيمسك حاجات عشر unit tests مش هيمسكوها. نفس فكرة supertest في «تاب Backend بـ Node».`,
            how: R`الـ factory بيشغّل [[Program.cs]] بـ [[TestServer]] بدل Kestrel: الـ [[HttpClient]] اللي بيرجع من [[CreateClient()]] بيبعت الـ requests في الذاكرة مباشرة للـ pipeline.

[[UseSetting]] بيحط قيم configuration بدري كفاية إن [[Program.cs]] يشوفها وهو بيسجّل الـ services (زي [[GetConnectionString]] اللي بيتقري وقت [[AddDbContext]]). [[ConfigureTestServices]] بيشتغل بعد تسجيلات [[Program.cs]]، فتقدر تشيل أو تبدّل ([[RemoveAll<T>]] ثم [[AddSingleton<T>(fake)]]).

[[IClassFixture<ApiFactory>]] بيعمل factory واحدة لكل الاختبارات في الـ class (التطبيق بيقوم مرة). و [[IAsyncLifetime]] على الـ factory بيجهّز الداتابيز قبل أول اختبار. [[factory.Services]] هو الـ DI container الحقيقي، فتقدر تطلب منه services (بـ scope للـ scoped).

الداتابيز: Postgres حقيقي أحسن من in-memory provider (اللي مبيعملش constraints ولا SQL حقيقي). في CI: service container في GitHub Actions، أو Testcontainers ([[Testcontainers.PostgreSql]]) بيقوّم Postgres في Docker لكل test run.`,
            when: R`اختبار أو اتنين لكل endpoint: الحالة السعيدة، والـ validation، والـ auth (401 و 403)، و 404. الـ edge cases الكتير في unit tests على الـ service. وخلي الداتابيز تتعمل من الأول في كل run عشان الاختبارات متعتمدش على داتا قديمة.`,
            mistakes: R`تستخدم in-memory provider وتفتكر إن الـ unique indexes اتختبرت. وتنسى [[public partial class Program;]] على .NET 8 أو 9، أو تكتب [[partial class Program]] من غير [[public]] فتقفله. وتسيب الـ BackgroundService شغال في الاختبارات فيعمل queries عشوائية. واختبارات بتعدّل نفس الصفوف بالتوازي من classes مختلفة. ونسخ EF مختلفة في مشروع الاختبار فيقع بـ [[ReflectionTypeLoadException]] (حصلت هنا: شوف درس DbContext).`
          },
          teach: R`## المثال ده بيعمل إيه؟

بيشغّل الـ API كله جوه الاختبار (نفس [[Program.cs]] ونفس الـ middleware والـ auth و EF)، بإعدادات اختبار وداتابيز اختبار، ويبعتله HTTP request حقيقي ويفحص الرد. جرّبناه في مشروع [[Shop.Tests]] (xUnit v3 و [[Microsoft.AspNetCore.Mvc.Testing]] 10.0.12) على [[Shop.Api]] (.NET 10) مع [[postgres:18]] حقيقي، و [[dotnet test]] جوه [[mcr.microsoft.com/dotnet/sdk:10.0]].

الحزمة: [[dotnet package add Microsoft.AspNetCore.Mvc.Testing --project Shop.Tests]].

---

## ١. الـ factory

~~~csharp Shop.Tests/ProductApiTests.cs
public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
~~~

- [[WebApplicationFactory<Program>]]: class جاهزة بتشغّل التطبيق اللي فيه [[Program]] في الذاكرة. [[Program]] هي الـ class اللي الـ compiler بيعملها من الـ top-level statements في [[Program.cs]]، وهي اللي بتعرّف الـ factory «أنهي تطبيق».
- [[, IAsyncLifetime]]: interface من xUnit فيها [[InitializeAsync]] (قبل الاختبارات) و [[DisposeAsync]]. الـ factory بتطبق [[DisposeAsync]] أصلًا، فاحنا كتبنا [[InitializeAsync]] بس.

---

## ٢. تعديل التطبيق قبل ما يقوم: [[ConfigureWebHost]]

~~~csharp
protected override void ConfigureWebHost(IWebHostBuilder builder)
{
    builder.UseEnvironment("Testing");
    builder.UseSetting("ConnectionStrings:Shop", "Host=localhost;Database=shop_test;Username=shop;Password=shop");
    builder.UseSetting("Jwt:Key", "test-key-test-key-test-key-test-key-1234");
    builder.ConfigureTestServices(services => services.RemoveAll<IHostedService>());
}
~~~

- [[override]]: الـ factory بتنادي الـ method دي وهي بتبني التطبيق.
- [[UseEnvironment("Testing")]]: [[app.Environment.EnvironmentName]] بقى [["Testing"]]. فـ [[appsettings.Development.json]] مش بيتقري، وأي [[if (app.Environment.IsDevelopment())]] مش بيشتغل.
- [[UseSetting("مفتاح", "قيمة")]]: إعداد بيكسب على appsettings. الـ [[:]] في المفتاح = مستوى في الـ JSON ([[ConnectionStrings]] ثم [[Shop]]). وبيتحط بدري كفاية إن [[GetConnectionString("Shop")]] جوه [[Program.cs]] يشوفه.
  - داتابيز [[shop_test]] منفصلة، عشان الاختبار بيمسحها.
  - [[Jwt:Key]] مفتاح للاختبار. والـ Issuer والـ Audience جم من [[appsettings.json]] بتاع [[Shop.Api]] (الـ factory بيستخدم فولدر المشروع ده كـ content root).
- [[ConfigureTestServices(services => ...)]]: بيشتغل **بعد** كل تسجيلات [[Program.cs]]، فتقدر تشيل أو تبدّل.
  - [[RemoveAll<IHostedService>()]]: شيل كل الـ background services (زي [[LowStockReporter]] في الدرس الجاي) عشان متعملش queries في نص الاختبار. [[RemoveAll]] من [[Microsoft.Extensions.DependencyInjection.Extensions]].

---

## ٣. تجهيز الداتابيز: [[InitializeAsync]]

~~~csharp
public async ValueTask InitializeAsync()
{
    using var scope = Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
    await db.Database.EnsureDeletedAsync();
    await db.Database.EnsureCreatedAsync();
    db.Products.Add(new Product { Name = "Blue pen", Price = 5.5m, Stock = 10, Category = new Category { Name = "Pens" } });
    await db.SaveChangesAsync();
}
~~~

- [[ValueTask]]: زي [[Task]] بس أخف. xUnit v3 بيطلبها في [[IAsyncLifetime]].
- [[Services]]: الـ DI container **الحقيقي** بتاع التطبيق. أول ما تلمسه الـ factory بتقوّم التطبيق.
- [[CreateScope()]]: [[ShopDb]] Scoped، فلازم scope.
- [[EnsureDeletedAsync()]] ثم [[EnsureCreatedAsync()]]: امسح الداتابيز واعملها من الـ model. كل run بيبدأ من الصفر، فالاختبارات متعتمدش على داتا قديمة.
- منتج واحد ([[Id]] = 1) في category جديدة: EF هيعمل الـ category الأول.

---

## ٤. الاختبار

~~~csharp
public class ProductApiTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    [Fact]
    public async Task Unknown_product_returns_problem_details_404()
    {
        var res = await factory.CreateClient().GetAsync("/api/products/9999", TestContext.Current.CancellationToken);
        Assert.Equal(HttpStatusCode.NotFound, res.StatusCode);
        Assert.Equal("application/problem+json", res.Content.Headers.ContentType?.MediaType);
    }
}
~~~

- [[IClassFixture<ApiFactory>]]: «اعمل [[ApiFactory]] **واحدة** لكل اختبارات الـ class دي، وابعتها في الـ constructor». التطبيق بيقوم مرة، مش مع كل اختبار.
- [[(ApiFactory factory)]]: primary constructor، و xUnit هو اللي بيبعتها.
- [[factory.CreateClient()]]: [[HttpClient]] بيبعت للتطبيق **في الذاكرة** ([[TestServer]])، من غير بورت ولا شبكة.
- [[GetAsync("/api/products/9999", ...)]]: GET عادي.
- [[HttpStatusCode.NotFound]]: enum بـ 404.
- [[res.Content.Headers.ContentType?.MediaType]]: الـ Content-Type من غير [[; charset=...]]. والـ [[?.]] لو مفيش header.

~~~text الناتج (dotnet test --project Shop.Tests --filter-method "*Unknown*")
Test run summary: Passed!
  total: 1
  failed: 0
  succeeded: 1
  skipped: 0
  duration: 2s 737ms
~~~

الـ ٢.٧ ثانية أغلبها قيام التطبيق وعمل الداتابيز مرة واحدة.

---

## ٥. التجربة: 401 و 403 و 201 (الـ solCode)

~~~csharp
var ct = TestContext.Current.CancellationToken;
var client = factory.CreateClient();
var body = new CreateProduct("Red pen", 6m, 5, 1);
var anonymous = await client.PostAsJsonAsync("/api/products", body, ct);
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: false));
var user = await client.PostAsJsonAsync("/api/products", body, ct);
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: true));
var admin = await client.PostAsJsonAsync("/api/products", body, ct);
~~~

- [[CreateProduct("Red pen", 6m, 5, 1)]]: الـ DTO اللي الـ endpoint بياخده (الاسم، السعر، المخزون، [[CategoryId]] = 1 اللي عملناها في الـ seed).
- [[PostAsJsonAsync]]: POST والـ body JSON. من [[System.Net.Http.Json]].
- [[DefaultRequestHeaders.Authorization]]: header بيتبعت مع كل request بعد كده من الـ client ده.
- [[new AuthenticationHeaderValue("Bearer", token)]]: بيعمل [[Authorization: Bearer <token>]].

~~~csharp
private string Token(bool admin)
{
    using var scope = factory.Services.CreateScope();
    var tokens = scope.ServiceProvider.GetRequiredService<TokenService>();
    return tokens.Create("u1", "u1@test.com", admin ? ["admin"] : []);
}
~~~

- بنعمل التوكن بنفس [[TokenService]] اللي في التطبيق (Scoped، فـ scope)، فهو موقّع بنفس مفتاح الاختبار.
- [[admin ? ["admin"] : []]]: collection expressions: يا role admin يا مفيش roles.

~~~text الناتج (dotnet test كله)
Running tests from /w/shop/Shop.Tests/bin/Debug/net10.0/Shop.Tests.dll (net10.0|x64)
/w/shop/Shop.Tests/bin/Debug/net10.0/Shop.Tests.dll (net10.0|x64) passed (2s 596ms)

Test run summary: Passed!
  total: 11
  failed: 0
  succeeded: 11
~~~

الاختبارين دول + ٩ من الدرسين اللي فاتوا.

### [[partial class Program]] من غير [[public]]

ضفنا في آخر [[Program.cs]] سطر [[partial class Program { }]]:

~~~text الناتج
/w/shop/Shop.Tests/ProductApiTests.cs(13,49): error CS0122: 'Program' is inaccessible due to its protection level
~~~

من .NET 10 الـ Web SDK بيولّد [[public partial class Program]] لوحده. لما تكتب [[partial]] من غير modifier، الـ class بقت internal، فمشروع الاختبار مش شايفها. ولو كتبت [[public partial class Program;]]: الـ build بينجح، والـ analyzer [[ASP0027]] بيقولك إنها مش محتاجة (رسالة info بتظهر في الـ editor، ومش بتظهر في [[dotnet build]] إلا لو رفعت درجتها لـ warning):

~~~text الناتج (بعد ما خليناها warning في .editorconfig)
warning ASP0027: Using public partial class Program { } to make the generated Program class public is no longer required in ASP.NET Core apps.
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[WebApplicationFactory<Program>]] | التطبيق كله في الذاكرة |
| [[UseEnvironment]] و [[UseSetting]] | environment وإعدادات للاختبار |
| [[ConfigureTestServices]] | شيل أو بدّل services بعد [[Program.cs]] |
| [[IAsyncLifetime.InitializeAsync]] | داتابيز نضيفة + seed قبل الاختبارات |
| [[IClassFixture<ApiFactory>]] | factory واحدة للـ class |
| [[CreateClient()]] | [[HttpClient]] بيكلم التطبيق من غير شبكة |

- داتابيز حقيقية منفصلة للاختبار، مش in-memory.
- في .NET 10 متكتبش [[partial class Program]]، وفي .NET 8 و 9 اكتبها [[public]].`,
          lines: [
            R`factory لـ [[Program]] (public لوحده من .NET 10).`,
            "بداية.",
            "تعديل الـ host قبل ما يقوم.",
            "بداية.",
            R`environment مش Development ولا Production.`,
            "داتابيز منفصلة للاختبار.",
            R`مفتاح JWT للاختبار (وبرضه [[Jwt:Issuer]] و [[Jwt:Audience]] في الكود الكامل).`,
            R`شيل الـ BackgroundServices: [[RemoveAll]] من [[Microsoft.Extensions.DependencyInjection.Extensions]].`,
            "نهاية.",
            "قبل أول اختبار.",
            "بداية.",
            "scope للـ DbContext.",
            "الـ context الحقيقي من الـ DI.",
            "امسح.",
            "واعمل الـ schema من الـ model.",
            "seed.",
            "احفظ.",
            "نهاية.",
            "نهاية.",
            R`class الاختبارات بتاخد الـ factory كـ fixture.`,
            "بداية.",
            "اختبار.",
            "method.",
            "بداية.",
            R`request حقيقي في الذاكرة.`,
            "404.",
            "و ProblemDetails.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`الاختبار:

[[var anonymous = await client.PostAsJsonAsync("/api/products", body, ct);]] ثم [[client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: false));]] ونفس الـ POST، ثم بتوكن admin. والـ asserts: [[Unauthorized]] و [[Forbidden]] و [[Created]]. والتوكن: [[using var scope = factory.Services.CreateScope(); scope.ServiceProvider.GetRequiredService<TokenService>().Create("u1", "u1@test.com", admin ? ["admin"] : []);]] لأن [[TokenService]] Scoped. عندنا الـ ٨ اختبارات عدّوا في ٣ ثواني تقريبًا مع Postgres حقيقي.

بعد [[partial class Program { }]] من غير [[public]]: [[error CS0122: 'Program' is inaccessible due to its protection level]] في مشروع الاختبار، لأن الـ partial بتاعك من غير modifier بيخلي الـ class كلها internal وبيلغي الـ public اللي الـ SDK بيولّده. شيله أو اكتبه [[public partial class Program;]] (وده اللي كان لازم دايمًا في .NET 8 و 9). جرّبناها على .NET 10: من غير أي سطر الـ factory شغالة. (بديل: [[InternalsVisibleTo]] في الـ csproj.)`,
          solCode: R`[Fact]
public async Task Creating_a_product_needs_the_admin_role()
{
    var ct = TestContext.Current.CancellationToken;
    var client = factory.CreateClient();
    var body = new CreateProduct("Red pen", 6m, 5, 1);
    var anonymous = await client.PostAsJsonAsync("/api/products", body, ct);
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: false));
    var user = await client.PostAsJsonAsync("/api/products", body, ct);
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: true));
    var admin = await client.PostAsJsonAsync("/api/products", body, ct);
    Assert.Equal(HttpStatusCode.Unauthorized, anonymous.StatusCode);
    Assert.Equal(HttpStatusCode.Forbidden, user.StatusCode);
    Assert.Equal(HttpStatusCode.Created, admin.StatusCode);
}

private string Token(bool admin)
{
    using var scope = factory.Services.CreateScope();
    var tokens = scope.ServiceProvider.GetRequiredService<TokenService>();
    return tokens.Create("u1", "u1@test.com", admin ? ["admin"] : []);
}`
        }
      ]
    }
]);
