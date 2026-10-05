// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("dotnet", {
  label: "C# و .NET",
  prompt: "$ ",
  lab: R`dotnet --info
dotnet new webapi -o Shop.Api
cd Shop.Api && dotnet watch`,
  labText: "سطّب .NET 10 SDK (الـ LTS) من dot.net أو من apt على Ubuntu (dotnet-sdk-10.0). أسرع تجربة للغة: اكتب ملف hello.cs وشغّله بـ dotnet run hello.cs من غير مشروع.",
  levels: {"1":["اللغة","C# لحد جاي من TypeScript: الأنواع و null و classes و records و generics و LINQ و async"],"2":["ASP.NET Core و EF Core","Web API بـ minimal APIs و controllers، و validation و DI و config، و EF Core مع PostgreSQL، و JWT"],"3":["الإنتاج والانترفيو","xUnit و WebApplicationFactory، و background services و caching، والنشر بـ Docker و Nginx، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "C# و .NET: الصورة الكبيرة",
      l: 1,
      n: "يعني إيه .NET و SDK و runtime، وأول مشروع، والـ CLI اللي هتعيش بيه",
      items: [
        {
          cmd: "dotnet --info",
          title: "يعني إيه .NET و C#، وأنهي نسخة تستخدم؟",
          desc: R`C# هي اللغة، و .NET هي المنصة اللي بتشغّلها: runtime (زي Node بالظبط بالنسبة لـ JS) ومكتبة ضخمة جاهزة، و SDK فيه الـ compiler والـ CLI اسمه [[dotnet]]. الكود بتاعك بيتحول لـ IL (زي bytecode)، والـ runtime (اسمه CLR) بيحوّله لكود الجهاز وقت التشغيل بالـ JIT.

النسخ: كل نوفمبر فيه نسخة جديدة. الزوجي LTS (دعم ٣ سنين)، والفردي STS (دعم سنتين). دلوقتي (سبتمبر ٢٠٢٦) النسخة اللي تبني عليها هي .NET 10 LTS ومعاها C# 14، و .NET 11 لسه RC وهتنزل نوفمبر ٢٠٢٦ كـ STS. و .NET 8 و 9 الاتنين دعمهم بيخلص ١٠ نوفمبر ٢٠٢٦، فلو عندك مشروع عليهم انقله لـ 10.

.NET ده cross-platform ومفتوح المصدر: بيشتغل على Linux و Mac و Windows، والسيرفرات في الغالب Linux. (الـ .NET Framework القديم اللي على Windows بس حاجة تانية خالص، ومتبدأش بيه.)`,
          example: R`dotnet --version
dotnet --list-sdks
dotnet --list-runtimes
dotnet --info
sudo apt install -y dotnet-sdk-10.0`,
          try: R`شغّل [[dotnet --list-runtimes]] وعِد عندك كام runtime. هتلاقي اتنين على الأقل: [[Microsoft.NETCore.App]] و [[Microsoft.AspNetCore.App]]. فكّر: السيرفر اللي هيشغّل API محتاج أنهي واحد فيهم، ومحتاج SDK ولا لأ؟`,
          deep: {
            why: R`لما تيجي من Node، أول لخبطة هي الأسماء: .NET و .NET Core و .NET Framework و ASP.NET و C#. لو فهمت إن C# لغة، و .NET منصة (runtime + مكتبات + أدوات)، و ASP.NET Core هو الـ framework بتاع الويب اللي فوقها، باقي التاب هيبقى مفهوم. واختيار النسخة مهم لأن الـ STS بيخلص بسرعة، والشركات غالبًا بتمشي على LTS.`,
            how: R`الـ SDK هو اللي بتطوّر بيه: فيه [[dotnet build]] و [[dotnet new]] و الـ compiler (Roslyn). الـ runtime هو اللي بيشغّل: [[Microsoft.NETCore.App]] للكود العادي، و [[Microsoft.AspNetCore.App]] لتطبيقات الويب (Kestrel والـ middleware وكده). السيرفر محتاج الـ runtime بس، والـ SDK بيتحط على جهازك وفي مرحلة الـ build في Docker.

رقم الـ SDK غير رقم الـ runtime: SDK 10.0.1xx بيطلّع تطبيقات لـ runtime 10.0.x. والتحديثات الأمنية بتنزل كل شهر (Patch Tuesday)، فالـ runtime بيبقى 10.0.12 مثلًا بعد سنة.

على Ubuntu 24.04 الـ SDK موجود في الـ repo الرسمي بتاع Ubuntu ([[dotnet-sdk-10.0]])، أو بسكربت [[dotnet-install.sh]] من dot.net، أو من موقع Microsoft. وعلى Mac و Windows installer عادي.`,
            when: R`اختار LTS لأي مشروع هيعيش في الإنتاج. الـ STS لو عايز ميزة جديدة ومستعد تعمل upgrade كل سنة. ولو لقيت مشروع قديم عليه [[net48]] أو [[.NET Framework]] ده ويندوز بس، وغالبًا محتاج migration.`,
            mistakes: R`تفتكر إن .NET ويندوز بس (ده كان زمان). تسطّب runtime بس وتستغرب إن [[dotnet new]] مش شغال (محتاج SDK). وفي الانترفيو: «إيه الفرق بين .NET Framework و .NET؟» الإجابة: Framework القديم ويندوز بس ووقف تطويره عند 4.8، و .NET (اللي كان اسمه Core) هو الحالي، cross-platform وأسرع، وبينزل كل سنة.`
          },
          lines: [
            "نسخة الـ SDK اللي هتستخدمها في الفولدر ده (ممكن global.json يثبّت نسخة معينة).",
            "كل الـ SDKs المتسطبة.",
            "كل الـ runtimes: الـ NETCore للكود العادي و الـ AspNetCore للويب.",
            "كل حاجة مع بعض: النسخ والـ OS والـ RID ومكان التسطيب.",
            R`تسطيب .NET 10 على Ubuntu 24.04 من الـ repo الرسمي بتاع Ubuntu.`
          ],
          sol: R`على جهاز فيه .NET 10 بس هتلاقي سطرين: [[Microsoft.AspNetCore.App 10.0.12]] و [[Microsoft.NETCore.App 10.0.12]] (رقم الـ patch عندك ممكن يختلف). و [[dotnet --version]] بيطلع رقم SDK زي [[10.0.112]].

السيرفر اللي هيشغّل API محتاج [[Microsoft.AspNetCore.App]] (وهو بيعتمد على الـ NETCore)، ومش محتاج SDK خالص، لأنك بتبني على جهازك أو في CI وتنقل الناتج. عشان كده في Docker بتبني في image الـ sdk وتشغّل في image الـ aspnet الأصغر (المستوى ٣). لو [[dotnet --list-sdks]] مطلعش حاجة يبقى انت مسطّب runtime بس.`
        },
        {
          cmd: "dotnet new console",
          title: "تعمل أول مشروع وتفهم الـ csproj و Program.cs",
          desc: R`[[dotnet new console -o Hello]] بيعمل فولدر فيه ملفين: [[Hello.csproj]] (زي package.json: النسخة والإعدادات والمكتبات) و [[Program.cs]] فيه سطر واحد. مفيش [[static void Main]]: من C# 9 فيه top-level statements، يعني تكتب الكود على طول في أول ملف زي سكربت JS.

[[dotnet run]] بيعمل build ويشغّل. [[dotnet watch]] بيعيد التشغيل مع كل حفظ (زي nodemon). والناتج بيتحط في [[bin/]] والملفات المؤقتة في [[obj/]]، والاتنين في الـ gitignore.

أهم سطرين في الـ csproj: [[<Nullable>enable</Nullable>]] (المستوى ده، درس null) و [[<ImplicitUsings>enable</ImplicitUsings>]] اللي بيعمل import تلقائي لـ [[System]] و [[System.Linq]] وغيرهم، عشان كده [[Console]] شغال من غير [[using]].`,
          example: R`dotnet new console -o Hello
cd Hello
cat Hello.csproj
dotnet run
dotnet watch
dotnet build -c Release
dotnet new gitignore`,
          try: R`اعمل المشروع، وغيّر [[Program.cs]] يطبع اسمك وعدد الـ arguments اللي اتبعتت ([[args.Length]]). شغّله بـ [[dotnet run -- a b c]]. وبعدين غيّر [[<Nullable>]] لـ [[disable]] وشوف هل حاجة اتغيرت في الناتج.`,
          deep: {
            why: R`في Node الملف لوحده بيشتغل. في .NET الوحدة هي المشروع (الـ csproj): هو اللي بيحدد نوع الناتج (exe ولا مكتبة)، والـ target framework، والمكتبات. لو فهمته هتعرف تقرا أي مشروع .NET.`,
            how: R`الـ csproj ملف MSBuild (XML). [[Sdk="Microsoft.NET.Sdk"]] بيجيب إعدادات افتراضية كتير، فالملف بيبقى صغير. مش محتاج تكتب أسماء ملفات الكود: أي [[.cs]] في الفولدر وتحته بيدخل الـ build لوحده.

[[TargetFramework]] قيمته [[net10.0]]: ده الـ TFM، يعني المشروع ده مكتوب لـ .NET 10. و [[OutputType]] [[Exe]] يعني تطبيق بيشتغل، ومن غيره يبقى مكتبة ([[.dll]]).

الـ top-level statements بيتحولوا وقت الـ compile لـ [[class Program]] فيها [[Main]]، والمتغير [[args]] موجود لوحده. ينفع ملف واحد بس في المشروع يبقى فيه top-level statements، والـ classes تتعرّف تحتهم في نفس الملف أو في ملفات تانية.

[[dotnet run]] = restore (تنزيل المكتبات) + build + تشغيل [[bin/Debug/net10.0/Hello.dll]]. و [[-c Release]] بيعمل build فيه optimizations، وده اللي تنشره.`,
            when: R`[[console]] للسكربتات والأدوات. [[webapi]] و [[web]] للـ APIs (المستوى ٢). [[classlib]] لكود مشترك بين كذا مشروع. و [[xunit]] للاختبارات. شوف كل القوالب بـ [[dotnet new list]].`,
            mistakes: R`تضيف [[bin]] و [[obj]] لـ git (اعمل [[dotnet new gitignore]] من أول يوم). وتكتب top-level statements في ملفين فيطلع error CS8802. وتنسى [[--]] قبل الـ arguments في [[dotnet run -- a b]] فالـ CLI يفتكرها options ليه.`
          },
          lines: [
            R`اعمل مشروع console في فولدر [[Hello]] (اسم المشروع = اسم الفولدر).`,
            "ادخل الفولدر.",
            R`الـ csproj: فيه [[OutputType]] و [[TargetFramework]] [[net10.0]] و [[ImplicitUsings]] و [[Nullable]].`,
            R`build وتشغيل. أول مرة بتاخد ثواني عشان الـ restore.`,
            "تشغيل مع إعادة تلقائية لما تحفظ، و Ctrl+C يوقفه.",
            R`build بإعدادات الإنتاج في [[bin/Release/net10.0]].`,
            R`[[.gitignore]] جاهز فيه bin و obj وملفات VS.`
          ],
          sol: R`[[Program.cs]] بقى سطرين، و [[dotnet run -- a b c]] بيطبع [[Hi, I'm Sara, got 3 args]]. الـ [[--]] بيفصل options بتاعة [[dotnet run]] عن الـ arguments بتاعة برنامجك، ولو شلته هتلاقي [[args.Length]] بـ 3 برضه هنا لأن a و b و c مش options معروفة، بس مع حاجة زي [[-c]] الـ CLI هياخدها لنفسه.

لما تخلي [[Nullable]] بـ [[disable]] الناتج مش هيتغير، لأن الـ nullable reference types تحذيرات وقت الـ compile بس، مش بتغيّر الكود اللي بيشتغل (زي أنواع TS بالظبط). الفرق هيبان في الدرس بتاع null لما التحذيرات تختفي.`,
          solCode: R`var name = "Sara";
Console.WriteLine($"Hi, I'm {name}, got {args.Length} args");`
        },
        {
          cmd: "dotnet run app.cs",
          title: "تشغّل ملف .cs لوحده من غير مشروع",
          desc: R`من .NET 10 تقدر تكتب ملف [[hello.cs]] وتشغّله على طول بـ [[dotnet run hello.cs]]، زي [[node hello.js]]. الـ SDK بيعمل مشروع وهمي من وراك. وده أسرع طريقة تتعلم بيها اللغة: كل أمثلة المستوى ده ملف واحد تشغّله كده.

ولو محتاج مكتبة أو إعداد بتكتبه في أول الملف: [[#:package Humanizer@3.0.10]] أو [[#:sdk Microsoft.NET.Sdk.Web]] لو عايز تعمل API صغير. ولما الملف يكبر [[dotnet project convert hello.cs]] بيحوّله لمشروع عادي.`,
          example: R`cat > hello.cs <<'EOF'
var name = args.Length > 0 ? args[0] : "world";
Console.WriteLine($"Hello, {name}! .NET {Environment.Version}");
EOF
dotnet run hello.cs -- Sara
dotnet project convert hello.cs`,
          try: R`اعمل ملف [[api.cs]] أوله [[#:sdk Microsoft.NET.Sdk.Web]]، وفيه API بـ endpoint واحد [[/]] بيرجع [[new { ok = true }]]. شغّله وافتح [[localhost:5000]]. لو طلعلك exception عن [[JsonTypeInfo]] اقرا الـ sol.`,
          deep: {
            why: R`زمان عشان تجرّب سطرين C# كنت محتاج مشروع كامل بـ csproj وفولدرات. ده كان بيخلي الناس اللي جاية من Python و JS تحس إن اللغة تقيلة. الـ file-based apps بتشيل الحاجز ده: سكربت، أو تجربة، أو أداة صغيرة في ملف واحد.`,
            how: R`الـ SDK بيعمل csproj افتراضي في مكان مؤقت، ويعمل build ويكاشه، فأول تشغيل بياخد كام ثانية والباقي أسرع. التوجيهات اللي بتبدأ بـ [[#:]] بتتحول لإعدادات في المشروع ده: [[#:package]] لمكتبة، و [[#:sdk]] للـ SDK، و [[#:property]] لأي خاصية MSBuild.

نقطة مهمة: الـ file-based apps بتشتغل افتراضيًا بـ [[PublishAot=true]]، وده بيقفل الـ JSON اللي بيعتمد على reflection. عشان كده API بيرجع anonymous object هيوقع بـ [[JsonTypeInfo metadata ... was not provided]]. الحل للتجارب: [[#:property PublishAot=false]]. وعلى Linux و Mac ممكن تحط [[#!/usr/bin/env dotnet]] في أول سطر وتعمل الملف executable.`,
            when: "للتعلم والتجارب والسكربتات الصغيرة (بدل bash لو السكربت فيه منطق). أي حاجة هتكبر أو هيبقى ليها tests حوّلها لمشروع.",
            mistakes: R`تحط الملف جوه فولدر فيه csproj تاني، فالـ SDK يتلخبط. وتنسى إن الـ AOT شغال افتراضيًا وتستغرب الـ JSON exception. وتفتكر إنها بتشغّل C# كـ interpreter: لأ، ده build كامل بيتكاش.`
          },
          lines: [
            R`اكتب ملف [[hello.cs]] (الـ heredoc ده bash عادي).`,
            R`أول argument لو موجود، ولو لأ [[world]]. [[args]] موجودة لوحدها.`,
            R`[[$"..."]] زي template string في JS، و [[{name}]] زي [[$__{name}]].`,
            "نهاية الـ heredoc.",
            R`build وتشغيل الملف، واللي بعد [[--]] بيروح لـ [[args]].`,
            R`لما يكبر: حوّله لفولدر فيه csproj و Program.cs.`
          ],
          sol: R`بعد ما تشغّل [[dotnet run api.cs]] هتلاقي [[Now listening on: http://localhost:5000]]، وأول request لـ [[/]] هيرجع 500 والـ log فيه [[System.NotSupportedException: JsonTypeInfo metadata for type '<>f__AnonymousType0...' was not provided]]. السبب إن الـ file-based apps معمولة AOT افتراضيًا، والـ AOT مبيسمحش بالـ JSON اللي بيعتمد على reflection.

ضيف [[#:property PublishAot=false]] تحت سطر الـ sdk وشغّل تاني: [[curl localhost:5000]] هيرجع [[{"ok":true}]]. في المشاريع العادية ([[dotnet new webapi]]) المشكلة دي مش موجودة لأن الـ AOT مقفول افتراضيًا.`,
          solCode: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
var app = WebApplication.CreateBuilder(args).Build();
app.MapGet("/", () => new { ok = true });
app.Run();`
        },
        {
          cmd: "sln و NuGet",
          title: "كذا مشروع في solution، ومكتبات من NuGet",
          desc: R`المشروع الحقيقي بيبقى كذا csproj: API، ومكتبة فيها الـ domain، ومشروع tests. اللي بيجمعهم solution: ملف [[.slnx]] (من .NET 10 ده الافتراضي، XML بسيط، بدل [[.sln]] القديم). [[dotnet build]] في فولدر الـ solution بيبني الكل بالترتيب الصح.

المكتبات بتيجي من NuGet (زي npm): [[dotnet package add Humanizer]] بيضيف [[<PackageReference>]] في الـ csproj. ومشروع يستخدم مشروع تاني بـ [[dotnet reference add]]. ومفيش [[node_modules]]: المكتبات بتتنزّل مرة في كاش عام ([[~/.nuget/packages]]) وكل المشاريع بتشاركها.`,
          example: R`dotnet new sln -n Shop
dotnet new webapi -o src/Shop.Api
dotnet new classlib -o src/Shop.Core
dotnet sln add src/Shop.Api src/Shop.Core
dotnet reference add src/Shop.Core --project src/Shop.Api
dotnet package add Humanizer --project src/Shop.Core
dotnet package list --project src/Shop.Core
dotnet build`,
          try: R`اعمل الـ solution ده، وفي [[Shop.Core]] اعمل class اسمها [[PriceFormatter]] فيها method [[static string Format(decimal p) => $"{p:0.00} EGP"]]، وناديها من [[Program.cs]] بتاع الـ API. وبعدين جرّب تنادي حاجة من الـ API جوه الـ Core وشوف يحصل إيه.`,
          deep: {
            why: R`التقسيم لمشاريع بيفرض حدود حقيقية: الـ Core مش شايف ASP.NET ولا EF، فمينفعش حد يكتب SQL جوه الـ domain بالغلط. وده أساس Clean Architecture اللي هتلاقيه في أغلب مشاريع .NET في الشركات.`,
            how: R`[[dotnet sln add]] بيكتب المسار جوه الـ [[.slnx]]. الـ [[ProjectReference]] بيقول لـ MSBuild «ابني ده الأول وحط الـ dll بتاعه جنبي». والمراجع اتجاه واحد: لو A بيشاور على B، مينفعش B يشاور على A (circular reference ممنوع).

NuGet: [[dotnet restore]] (بيحصل لوحده مع build) بيقرا كل الـ PackageReference، ويحل الـ dependencies، ويكتب النتيجة في [[obj/project.assets.json]] (زي package-lock). ولو عايز lock file حقيقي فعّل [[RestorePackagesWithLockFile]]. ولو عندك مشاريع كتير وعايز نسخ موحدة استخدم [[Directory.Packages.props]] (Central Package Management) بدل ما تكتب النسخة في كل csproj.

في .NET 10 الأوامر بقت «اسم ثم فعل»: [[dotnet package add]] و [[dotnet reference add]]، والقديمة [[dotnet add package]] لسه شغالة.`,
            when: R`مشروع صغير: API + tests كفاية. مشروع كبير أو فريق: Api و Core (أو Domain و Application) و Infrastructure و Tests. متقسمش بزيادة من أول يوم: تلات مشاريع فاضيين أسوأ من واحد منظم.`,
            mistakes: R`نسخ مختلفة من نفس المكتبة في مشروعين (مثلًا EF Core 10.0.4 في واحد و 10.0.12 في التاني): بيطلع تحذير [[MSB3277]] وممكن تقع وقت التشغيل بـ [[Could not load file or assembly]]. ده حصل فعلًا في مشروع التاب ده، والحل إن كل حزم EF تبقى نفس النسخة (أو Central Package Management). وتعمل reference دايري بين مشروعين.`
          },
          lines: [
            R`solution فاضي: ملف [[Shop.slnx]].`,
            "مشروع الـ API.",
            "مكتبة للـ domain (مفيهاش Program.cs، بتطلّع dll).",
            "ضيف الاتنين للـ solution.",
            R`الـ API يقدر يستخدم الـ Core (مش العكس).`,
            R`مكتبة من NuGet، بتتكتب في [[Shop.Core.csproj]].`,
            "المكتبات المستخدمة ونسخها.",
            "بيبني كل المشاريع بالترتيب."
          ],
          sol: R`لو كله تمام [[dotnet run --project src/Shop.Api]] بيشتغل والـ API بيقدر يستخدم [[Shop.Core.PriceFormatter.Format(19.5m)]] ويرجع [[19.50 EGP]]. لازم الـ class تبقى [[public]]، لأن الافتراضي لأي class من غير كلمة هو [[internal]] (مرئية جوه نفس المشروع بس)، وده أشهر سبب لـ error CS0122 أو CS0246 هنا.

ولما تحاول تستخدم حاجة من الـ API جوه الـ Core هيطلع [[error CS0246: The type or namespace name ... could not be found]]، لأن الـ Core مش عامل reference للـ API. ولو حاولت تضيف reference عكسي، MSBuild هيرفض عشان ده circular. وده بالظبط المقصود: الـ domain ميعرفش حاجة عن الويب.`,
          solCode: R`namespace Shop.Core;

public static class PriceFormatter
{
    public static string Format(decimal price) => $"{price:0.00} EGP";
}`
        },
        {
          cmd: "ASP.NET Core و Blazor",
          title: "C# بيتعمل بيه إيه غير الـ APIs؟ وفين Blazor؟",
          desc: R`نفس اللغة ونفس الـ runtime بيعملوا كذا حاجة: ASP.NET Core للويب (Web API و MVC و Razor Pages و Blazor و SignalR للـ real-time و gRPC)، و Worker Service للشغل في الخلفية، و .NET MAUI لتطبيقات Mobile و Desktop، و Unity للألعاب، و Azure Functions وأمثالها للـ serverless.

Blazor هو «React بـ C#»: components بتتكتب بـ Razor (HTML + C#) في ملفات [[.razor]]، وبيشتغل يا على السيرفر (الـ UI بيتحدّث عبر SignalR websocket) يا في المتصفح بـ WebAssembly، يا الاتنين (Auto). بيتستخدم كتير في dashboards و admin panels الداخلية لما الفريق كله C#. للمواقع العامة والـ SPA الكبيرة، React و Next لسه الاختيار الأشهر، وهما اللي في «تاب React» و «تاب Next.js».

التاب ده بيركّز على API بـ ASP.NET Core، لأن ده أكتر شغل .NET مطلوب، وبيتكلم مع أي frontend.`,
          example: R`dotnet new list --tag Web
dotnet new webapi -o Api
dotnet new webapi --use-controllers -o ApiMvc
dotnet new blazor -o Dashboard --interactivity Server
dotnet new worker -o Jobs`,
          try: R`اعمل [[dotnet new blazor -o Dashboard]] وشغّله بـ [[dotnet watch]]، وافتح [[Components/Pages/Counter.razor]]. قارنه بـ component الـ Counter في «تاب React»: فين الـ state، وفين الـ event handler، وإيه اللي بيحصل في الـ Network tab لما تدوس على الزرار.`,
          deep: {
            why: R`في الانترفيو وفي الشغل هتسمع أسماء كتير (MVC و Razor Pages و Blazor و MAUI)، ولازم تعرف كل واحد مكانه إيه عشان تقول «ده مش محتاجه» بثقة. وناس كتير بتسأل: أتعلم Blazor بدل React؟ الإجابة بتعتمد على السوق اللي عايز تشتغل فيه.`,
            how: R`كلهم فوق نفس الأساس: [[WebApplication]] و DI و middleware و configuration (المستوى ٢). MVC و Razor Pages بيرندروا HTML على السيرفر (زي PHP أو EJS). Blazor Server بيمسك الـ state على السيرفر وبيبعت الفرق في الـ DOM عبر websocket، فكل ضغطة زرار round trip للسيرفر، ولو النت فصل الصفحة بتقف. Blazor WebAssembly بينزّل الـ runtime للمتصفح (تحميل أول مرة أتقل) ويشتغل offline. و [[--interactivity Auto]] بيبدأ Server وبعدين ينقل لـ WASM لما يتحمّل.`,
            when: R`API لـ React أو موبايل: minimal API أو controllers. لوحة تحكم داخلية والفريق C#: Blazor. موقع بسيط فيه فورمات: Razor Pages. real-time (شات، إشعارات): SignalR. شغل مجدول أو queue consumer: worker.`,
            mistakes: R`تعمل Blazor Server لموقع عام عليه آلاف المستخدمين من غير ما تحسب إن كل مستخدم ماسك اتصال وذاكرة على السيرفر. وتفتكر إن MVC و Web API حاجتين منفصلين: في ASP.NET Core هما نفس الـ framework ونفس الـ controllers.`
          },
          lines: [
            "القوالب الخاصة بالويب.",
            "Web API بـ minimal APIs (الافتراضي من .NET 6).",
            "نفس الـ API بس بـ controllers.",
            "Blazor Web App، والتفاعل على السيرفر عبر SignalR.",
            "خدمة في الخلفية من غير HTTP (queue، cron، إلخ)."
          ],
          sol: R`في [[Counter.razor]] هتلاقي [[private int currentCount = 0;]] جوه بلوك [[@code]]، وزرار [[@onclick="IncrementCount"]]، والـ method بتعمل [[currentCount++]]. مفيش [[setState]]: Blazor بيعيد الـ render لوحده بعد أي event handler.

في الـ Network tab مع [[--interactivity Server]] (والافتراضي بتاع القالب فعلًا Server) هتلاقي websocket اسمه [[_blazor]]، وكل ضغطة بتبعت رسالة صغيرة وترجع فرق الـ DOM، ومفيش fetch ولا تحميل صفحة. ده الفرق الأساسي عن React: الـ state عايش على السيرفر مش في المتصفح. ولو قفلت السيرفر هتظهر رسالة reconnecting.`
        }
      ]
    },
    {
      t: "الأنواع و null",
      l: 1,
      n: "أنواع ثابتة زي TS بس بتفضل موجودة وقت التشغيل، و value ولا reference، و null من غير مفاجآت",
      items: [
        {
          cmd: "var و الأنواع الأساسية",
          title: "int و decimal و string و var: إيه اللي مختلف عن number في JS؟",
          desc: R`في JS كل الأرقام [[number]]. في C# لكل استخدام نوع: [[int]] (32-bit) للعدادات والـ IDs، و [[long]] للأرقام الكبيرة، و [[double]] للحسابات العلمية، و [[decimal]] للفلوس (مفيش مشكلة [[0.1 + 0.2]])، و [[bool]] و [[char]] و [[string]].

[[var]] مش زي [[var]] في JS: ده type inference زي [[let x = 5]] في TS. النوع بيتحدد من القيمة ومبيتغيرش. والفرق الكبير عن TS: الأنواع دي بتفضل موجودة وقت التشغيل، والـ compiler مش هيطلّع برنامج لو فيه خطأ نوع.`,
          example: R`var name = "Sara";
int age = 27;
decimal price = 19.99m;
double ratio = 0.1 + 0.2;
Console.WriteLine($"Hi {name}, {age + 1}, {price * 2}");
Console.WriteLine(ratio);
Console.WriteLine(0.1m + 0.2m);
Console.WriteLine(7 / 2);
Console.WriteLine(7 / 2.0);
int big = int.MaxValue;
Console.WriteLine(big + 1);
age = "28"; // error CS0029: Cannot implicitly convert type 'string' to 'int'`,
          try: R`احسب إجمالي فاتورة: ٣ منتجات بأسعار [[0.10]] و [[0.20]] و [[0.30]]، مرة بـ [[double]] ومرة بـ [[decimal]]، واطبع الاتنين. وبعدين اعمل [[int.Parse("12a")]] وشوف بيحصل إيه، وقارنه بـ [[int.TryParse]].`,
          flag: "script",
          deep: {
            why: R`في JS [[7 / 2]] بـ 3.5 و [["5" * 2]] بـ 10، وده بيعدي بهدوء. في C# كل عملية ليها قواعد واضحة، والغلط بيبان وقت الـ build. وأشهر مكان ده بيفرق: الفلوس. [[double]] بيخزن تقريب ثنائي، فحسابات الأسعار بتطلع [[0.30000000000000004]]؛ [[decimal]] عشري فبيطلع [[0.3]] بالظبط.`,
            how: R`[[7 / 2]] بين intين = قسمة صحيحة = 3. لو واحد منهم double يبقى 3.5. وده أشهر bug لحد جاي من JS: [[average = sum / count]] وهما int.

الـ literals ليها لاحقة: [[19.99m]] decimal، و [[2.5f]] float، و [[10L]] long، ومن غيرها الرقم العشري double. ومينفعش تحط double في decimal من غير cast.

الـ overflow: [[int.MaxValue + 1]] بيلف لـ [[-2147483648]] بهدوء (unchecked افتراضيًا). لو كتبتها كثوابت الـ compiler بيمسكها (CS0220)، ولو عايز exception وقت التشغيل استخدم [[checked(big + 1)]] أو فعّل [[CheckForOverflowUnderflow]].

التحويل: [[int.Parse]] بيرمي [[FormatException]] لو النص غلط، و [[int.TryParse(s, out var n)]] بيرجع bool من غير exception، وده اللي تستخدمه مع input المستخدم. و [[string]] immutable زي JS، وبيتقارن بالقيمة بـ [[==]].`,
            when: R`[[int]] للعدادات والـ IDs، و [[long]] لو ممكن تعدي ٢ مليار، و [[decimal]] لأي فلوس أو كميات دقيقة، و [[double]] للقياسات والإحصاء. و [[var]] لما النوع واضح من الشمال ([[var list = new List<int>()]])، والنوع صريح لما يوضّح.`,
            mistakes: R`[[double]] للأسعار. وقسمة intين وتستنى كسر. و [[int.Parse]] على input مستخدم من غير try. وتفتكر إن [[var]] معناها dynamic: لأ، [[var x = 5; x = "a";]] خطأ compile. وفي الانترفيو: «decimal ولا double للفلوس وليه؟» decimal: base-10 ودقته ٢٨ رقم، أبطأ شوية بس مفيش أخطاء تقريب في الكسور العشرية.`
          },
          lines: [
            R`[[var]]: النوع اتستنتج [[string]] ومش هيتغير.`,
            "int صريح.",
            R`decimal: لازم [[m]] في الآخر.`,
            "double: تقريب ثنائي.",
            R`interpolation: [[{...}]] جوه [[$"..."]]. الناتج [[Hi Sara, 28, 39.98]].`,
            R`[[0.30000000000000004]] زي JS بالظبط.`,
            R`[[0.3]]: الـ decimal عشري.`,
            R`[[3]]: قسمة صحيحة بين intين.`,
            R`[[3.5]]: واحد منهم double.`,
            "أكبر int.",
            R`[[-2147483648]]: overflow بيلف بهدوء.`,
            "خطأ compile: مفيش تحويل ضمني من string لـ int، والبرنامج مش هيتبني أصلًا."
          ],
          sol: R`بـ double الناتج [[0.6000000000000001]]، وبـ decimal [[0.60]] بالظبط (الـ decimal بيحتفظ بعدد الخانات العشرية اللي كتبتها). مش كل حسبة double بتبان غلط في الطباعة: [[19.99 + 5.50 + 0.10]] بتطبع [[25.59]] لأن .NET بيطبع أقصر رقم بيرجع لنفس القيمة، بس الغلط موجود جوه وبيتراكم مع الجمع والمقارنة. ده السبب إن أي حاجة فيها فلوس تبقى decimal، وفي قاعدة البيانات [[numeric]] (شوف «تاب SQL و Prisma»: درس numeric للفلوس).

[[int.Parse("12a")]] بيرمي [[System.FormatException: The input string '12a' was not in a correct format.]] والبرنامج بيقع لو محدش مسكه. و [[int.TryParse("12a", out var n)]] بيرجع [[False]] و [[n]] بـ 0 من غير exception. القاعدة: Parse لما تكون متأكد إن النص صح (مثلًا config)، و TryParse لأي حاجة جاية من برّه.`,
          solCode: R`double[] pricesD = [0.10, 0.20, 0.30];
decimal[] pricesM = [0.10m, 0.20m, 0.30m];
Console.WriteLine(pricesD.Sum());
Console.WriteLine(pricesM.Sum());
Console.WriteLine(int.TryParse("12a", out var n) ? n : "not a number");
Console.WriteLine(int.Parse("12a"));`
        },
        {
          cmd: "value و reference types",
          title: "ليه تعديل نسخة مرة بيغيّر الأصل ومرة لأ؟ (struct و class)",
          desc: R`في JS الـ primitives بتتنسخ والـ objects بتتشارك. C# نفس الفكرة بس انت اللي بتختار: [[class]] = reference type (المتغير بيشاور على object واحد في الـ heap، والنسخ بينسخ العنوان)، و [[struct]] = value type (المتغير هو القيمة نفسها، والنسخ بينسخ كل الحقول).

[[int]] و [[double]] و [[decimal]] و [[bool]] و [[DateTime]] و [[Guid]] كلهم structs. [[string]] و arrays و [[List<T>]] وأي class بتعملها reference types.`,
          example: R`var p1 = new PointS(1, 2);
var p2 = p1;
p2.X = 99;
Console.WriteLine($"struct: p1.X={p1.X} p2.X={p2.X}");
var c1 = new PointC { X = 1, Y = 2 };
var c2 = c1;
c2.X = 99;
Console.WriteLine($"class:  c1.X={c1.X} c2.X={c2.X}");
Console.WriteLine(new PointC { X = 1 } == new PointC { X = 1 });
Console.WriteLine(new PointS(1, 2).Equals(new PointS(1, 2)));
struct PointS(int x, int y) { public int X = x; public int Y = y; }
class PointC { public int X; public int Y; }`,
          try: R`اعمل [[static class Points]] فيها method [[public static void Reset(PointS p) => p.X = 0;]] ونسخة تانية لـ [[PointC]] (overload بنفس الاسم)، وناديهم وشوف الأصل اتغيّر في أنهي حالة. وبعدين ضيف overload تالت [[Reset(ref PointS p)]] وناديه بـ [[Points.Reset(ref p1)]].`,
          flag: "script",
          deep: {
            why: R`ده أساس ناس كتير بتتلخبط فيه: تعديل object جوه method بيأثر على الأصل ولا لأ، وليه [[==]] بين objectين متطابقين بيرجع false. وسؤال انترفيو ثابت في أي وظيفة .NET (شوف آخر category).`,
            how: R`الـ class: [[new]] بيحجز object في الـ managed heap، والمتغير فيه reference. [[c2 = c1]] بينسخ الـ reference، فالاتنين بيشاوروا على نفس الـ object. و [[==]] للـ classes بيقارن الـ references (نفس الـ object ولا لأ) إلا لو الـ class عاملة override (زي string و record).

الـ struct: القيمة نفسها بتتخزن جوه المتغير (على الـ stack لو local، أو جوه الـ object اللي شايلها لو field). [[p2 = p1]] نسخة كاملة. و [[Equals]] الافتراضي بيقارن الحقول، بس [[==]] مش موجود للـ struct بتاعتك إلا لو عرّفته.

الـ arguments بتتبعت by value افتراضيًا في الحالتين: الـ struct بيتنسخ، والـ class الـ reference بيتنسخ (فتقدر تعدّل الـ object بس متقدرش تخلي المتغير الأصلي يشاور على object تاني). [[ref]] بيبعت المتغير نفسه.`,
            when: R`[[class]] هو الافتراضي لأي حاجة. [[struct]] لقيم صغيرة (أقل من ١٦ byte تقريبًا) immutable بتتعمل كتير، زي Point و Money، وعشان تقلل الـ allocations في كود حساس للأداء. و [[record struct]] لو عايز value semantics مع كتابة أقل.`,
            mistakes: R`struct كبيرة أو mutable: كل نسخة بتكلّف، والتعديل على نسخة مش بيأثر على الأصل فتتوه (أشهرها تعديل عنصر struct جوه [[List<T>]] عن طريق [[foreach]] أو indexer: error CS1612). وتفتكر إن «value types على الـ stack دايمًا»: لأ، field من نوع int جوه class عايش في الـ heap مع الـ object.`
          },
          lines: [
            "struct جديدة.",
            R`نسخة كاملة من القيم، مش reference.`,
            "التعديل على النسخة بس.",
            R`[[p1.X=1 p2.X=99]]: الأصل متأثرش.`,
            "object من class.",
            R`[[c2]] بيشاور على نفس الـ object.`,
            "التعديل على الـ object المشترك.",
            R`[[c1.X=99 c2.X=99]]: الاتنين اتغيروا.`,
            R`[[False]]: objectين مختلفين حتى لو القيم زي بعض.`,
            R`[[True]]: [[Equals]] بتاع الـ struct بيقارن الحقول.`,
            "struct بـ primary constructor (C# 12): الـ parameters بتتحط في الحقول.",
            "class عادية بحقلين."
          ],
          sol: R`الناتج [[1 0]] وبعدين [[0]]. [[Reset(p1)]] مع الـ struct مش بيغيّر [[p1.X]] (فضل 1)، لأن الـ method خدت نسخة. [[Reset(c1)]] مع الـ class غيّرت [[c1.X]] لـ 0، لأن النسخة اللي اتبعتت هي الـ reference، والاتنين بيشاوروا على نفس الـ object.

مع [[ref]]: [[Points.Reset(ref p1)]] بيغيّر الأصل لـ 0، لأن الـ method بقت شايلة المتغير نفسه مش نسخة. لو نسيت [[ref]] عند النداء هيطلع error CS1620. وليه static class مش local functions؟ لأن الـ local functions (اللي بتتكتب تحت الـ top-level statements) مينفعش يبقى ليها overloads بنفس الاسم: error CS0128. ولو عملت الـ method بـ [[c = new PointC()]] للـ class version (من غير ref)، الأصل مش هيتغير: غيّرت النسخة المحلية من الـ reference بس.`,
          solCode: R`var p1 = new PointS(1, 2);
var c1 = new PointC { X = 1 };
Points.Reset(p1);
Points.Reset(c1);
Console.WriteLine($"{p1.X} {c1.X}");
Points.Reset(ref p1);
Console.WriteLine(p1.X);
static class Points
{
    public static void Reset(PointS p) => p.X = 0;
    public static void Reset(PointC c) => c.X = 0;
    public static void Reset(ref PointS p) => p.X = 0;
}
struct PointS(int x, int y) { public int X = x; public int Y = y; }
class PointC { public int X; public int Y; }`
        },
        {
          cmd: "nullable reference types",
          title: "string و string? وعلامة ! : إزاي C# بيحميك من null",
          desc: R`مع [[<Nullable>enable</Nullable>]] (الافتراضي في أي مشروع جديد) [[string]] معناها «مش هتبقى null»، و [[string?]] معناها «ممكن تبقى null». زي [[string]] و [[string | null]] في TS بالظبط.

الأدوات نفس اللي في JS: [[?.]] و [[??]] و [[??=]]، و [[is not null]] للفحص. و [[!]] بعد القيمة (null-forgiving) زي [[!]] في TS: بتقول للـ compiler «صدقني مش null».

الفرق المهم: دي تحذيرات مش أخطاء. البرنامج بيتبني وبيشتغل، ولو تجاهلت التحذير هتاخد [[NullReferenceException]] وقت التشغيل. عشان كده في المشاريع الجد بنخلي تحذيرات null أخطاء.`,
          example: R`string? FindName(int id) => id == 1 ? "Sara" : null;
string? name = FindName(2);
Console.WriteLine(name.Length); // warning CS8602: Dereference of a possibly null reference
Console.WriteLine(name?.Length);
Console.WriteLine(name?.Length ?? 0);
string safe = name ?? "guest";
if (name is not null) Console.WriteLine(name.Length);
int? maybe = null;
Console.WriteLine(maybe.HasValue);`,
          try: R`شغّل المثال زي ما هو وشوف التحذير والـ exception. وبعدين ضيف في الـ csproj [[<WarningsAsErrors>nullable</WarningsAsErrors>]] (أو في file-based app: [[#:property WarningsAsErrors=nullable]]) وشوف الفرق.`,
          flag: "script",
          deep: {
            why: R`الـ null reference هو أشهر exception في تاريخ .NET (ومخترع الـ null نفسه سماه «غلطة المليار دولار»). الـ nullable reference types (من C# 8) بتنقل الغلطة دي من وقت التشغيل لوقت الكتابة، بنفس فكرة [[strictNullChecks]] في TS.`,
            how: R`فيه نوعين null مختلفين تمامًا. الأول [[int?]] (أي value type بـ [[?]]): ده نوع حقيقي اسمه [[Nullable<int>]] فيه [[HasValue]] و [[Value]]، وموجود وقت التشغيل. التاني [[string?]] (reference type بـ [[?]]): ده annotation للـ compiler بس، ووقت التشغيل [[string]] و [[string?]] نفس النوع. عشان كده التحذيرات بس.

الـ compiler بيعمل flow analysis زي narrowing في TS: بعد [[if (name is not null)]] بيعرف إن name مش null. و [[is null]] أحسن من [[== null]] لأن [[==]] ممكن يبقى متعرّفله override.

الحقول الـ non-nullable لازم تتعمل initialize في الـ constructor أو يبقى ليها قيمة أو تبقى [[required]]، وإلا warning CS8618. وفي EF Core هتشوف [[= null!;]] على الـ navigation properties: معناها «EF هيملاها، متقلقش».

[[ArgumentNullException.ThrowIfNull(x)]] للفحص وقت التشغيل على حدود الـ public API.`,
            when: R`سيبه enable دايمًا، وفي المشاريع الجديدة [[WarningsAsErrors]] لـ nullable. [[!]] بس لما تكون متأكد وفيه سبب مش واضح للـ compiler (زي EF navigations أو بعد validation). وعلّم الـ return بـ [[?]] لما الدالة ممكن متلاقيش حاجة ([[FindAsync]] بترجع [[T?]]).`,
            mistakes: R`ترش [[!]] في كل حتة عشان التحذيرات تختفي، زي [[as any]] في TS. وتتجاهل الـ warnings لحد ما يبقوا ٥٠٠ ومحدش يبص عليهم. وتفتكر إن [[string?]] بتعمل حاجة وقت التشغيل. وفي الانترفيو: «إيه الفرق بين [[int?]] و [[string?]]؟» الأول نوع [[Nullable<T>]] حقيقي، والتاني annotation للـ compiler بس.`
          },
          lines: [
            R`دالة بترجع [[string?]]: ممكن null.`,
            "القيمة هنا null فعلًا.",
            R`تحذير CS8602 وقت الـ build، و [[NullReferenceException]] وقت التشغيل (امسحه عشان الباقي يشتغل).`,
            R`[[?.]]: لو null النتيجة null (بيطبع سطر فاضي).`,
            R`[[??]]: قيمة بديلة، فبيطبع [[0]].`,
            R`[[safe]] نوعه [[string]] ومضمون مش null.`,
            R`بعد الفحص الـ compiler عارف إنها مش null (narrowing)، وهنا مش هيطبع حاجة.`,
            R`[[int?]] = [[Nullable<int>]]: نوع حقيقي وقت التشغيل.`,
            R`[[False]].`
          ],
          sol: R`زي ما هو: الـ build بينجح مع [[warning CS8602: Dereference of a possibly null reference]] على السطر ٣، والتشغيل بيقع على نفس السطر بـ [[System.NullReferenceException: Object reference not set to an instance of an object.]]. التحذير كان قايلك قبلها.

بعد [[WarningsAsErrors=nullable]] نفس الرسالة بقت [[error CS8602]] والبرنامج مش بيتبني أصلًا. ده اللي عايزه في مشروع حقيقي: نفس فكرة [[tsc --noEmit]] في الـ CI. صلّح السطر بـ [[name?.Length ?? 0]] أو امسحه والباقي هيشتغل ويطبع سطر فاضي و [[0]] و [[False]].`
        }
      ]
    },
    {
      t: "Classes و records و interfaces",
      l: 1,
      n: "properties و constructors، و records للداتا، و interfaces اسمية مش شكلية زي TS",
      items: [
        {
          cmd: "class و properties",
          title: "تعمل class فيها properties و constructor وتحمي الـ state بتاعها",
          desc: R`الـ class في C# شبه TS بس أصرم. الحقول بتبقى [[private]] عادة، والبيانات بتظهر برّه عن طريق properties: [[public decimal Balance { get; private set; }]] يعني أي حد يقرا، بس التعديل من جوه الـ class بس.

[[init]] بدل [[set]] يعني تتحط مرة وقت الإنشاء بس (زي [[readonly]] في TS). و [[required]] يعني اللي بيعمل object لازم يدّيها قيمة. والـ primary constructor [[class Account(string owner, decimal opening)]] (C# 12) بيوفر عليك كتابة constructor كامل.

الـ access modifiers: [[public]] للكل، و [[private]] للـ class بس (الافتراضي للأعضاء)، و [[protected]] للي بيورثوا، و [[internal]] للمشروع ده بس (الافتراضي للـ classes).`,
          example: R`var acc = new Account("Sara", 100m);
acc.Deposit(50m);
Console.WriteLine(acc);
var u = new User { Email = "sara@x.com" };
Console.WriteLine(u.Name);
acc.Balance = 0; // error CS0272: the set accessor is inaccessible
var bad = new User(); // error CS9035: Required member 'User.Email' must be set
public class Account(string owner, decimal opening)
{
    public string Owner { get; } = owner;
    public decimal Balance { get; private set; } = opening;
    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }
    public override string ToString() => $"{Owner}: {Balance:0.00}";
}
public class User
{
    public required string Email { get; init; }
    public string Name { get; set; } = "guest";
}`,
          try: R`ضيف لـ [[Account]] method اسمها [[Withdraw(decimal amount)]] بترمي [[InvalidOperationException]] لو الرصيد مش كفاية، و property محسوبة [[public bool IsEmpty => Balance == 0;]]. وجرّب تسحب أكتر من الرصيد.`,
          flag: "script",
          deep: {
            why: R`الـ encapsulation مش كلام نظري: لو [[Balance]] ليها [[public set]]، أي حد في الكود يقدر يكتب [[acc.Balance = 1_000_000]] ويتخطى كل قواعد [[Deposit]]. الـ properties بتخليك تفتح القراية وتقفل الكتابة، وتضيف منطق بعدين من غير ما تكسر اللي بيستخدمها.`,
            how: R`[[{ get; set; }]] اسمها auto-property: الـ compiler بيعمل private field مخفي و getter و setter. تقدر تكتب منطق فيهم لو محتاج، ومن C# 14 فيه كلمة [[field]] بتشاور على الـ field المخفي ده: [[set => field = value.Trim();]].

الـ object initializer [[new User { Email = "..." }]] بيشتغل مع [[set]] و [[init]]. وبعد الإنشاء [[init]] بيقفل. و [[required]] بيفرض إن الـ initializer يحط القيمة، وده بيحل مشكلة التحذير CS8618 للـ non-nullable properties من غير constructor.

الـ primary constructor parameters ([[owner]] و [[opening]]) موجودة في كل الـ class، ولو استخدمتها في method بتتحول لـ field مخفي. هنا بنحطهم في properties مرة واحدة. و [[override ToString]] زي [[toString]] في JS: اللي بيطلع لما تطبع الـ object.

و [[nameof(amount)]] بيرجع [[amount]] كـ string، ولو غيّرت اسم الـ parameter بالـ refactor الاسم بيتغير معاه.`,
            when: R`class عادية لأي حاجة ليها سلوك وقواعد (Account، Order، Cart). [[init]] و [[required]] للـ DTOs والـ config. [[private set]] لأي state المفروض يتغير عن طريق methods بس.`,
            mistakes: R`كل حاجة [[public { get; set; }]] (anemic model) والمنطق متفرق في services. وتنسى إن الافتراضي للـ class هو [[internal]] فمش باينة من مشروع تاني. وتعمل public fields بدل properties: الـ serializers و EF Core بيتعاملوا مع properties، والحقول العامة بتتجاهل غالبًا.`
          },
          lines: [
            R`[[new]] بالـ primary constructor.`,
            "method بتغيّر الـ state بقواعدها.",
            R`بيستخدم [[ToString]]: [[Sara: 150.00]].`,
            R`object initializer: [[Email]] إجباري لأنها [[required]].`,
            R`[[guest]]: القيمة الافتراضية.`,
            R`خطأ compile: الـ setter [[private]].`,
            R`خطأ compile: [[Email]] required ومتحطتش.`,
            R`primary constructor: [[owner]] و [[opening]] متاحين في كل الـ class.`,
            "بداية الـ class.",
            R`property للقراية بس (مفيش set)، قيمتها من الـ constructor.`,
            R`أي حد يقرا، والكتابة من جوه بس.`,
            "method عامة.",
            "بداية الـ method.",
            R`guard: رمي exception لو القيمة غلط. [[nameof]] بيطلّع اسم الـ parameter.`,
            R`التعديل الوحيد المسموح على [[Balance]].`,
            "نهاية الـ method.",
            R`expression-bodied member بـ [[=>]]، و [[:0.00]] format لرقمين عشريين.`,
            "نهاية الـ class.",
            "class تانية.",
            "بداية.",
            R`[[required]] + [[init]]: لازم تتحط وقت الإنشاء ومتتغيرش بعده.`,
            "property عادية ليها default.",
            "نهاية."
          ],
          sol: R`[[Withdraw(500m)]] على رصيد 150 بترمي [[System.InvalidOperationException: Insufficient funds: balance 150.00, requested 500.00]] (بالرسالة اللي كتبتها). و [[Withdraw(150m)]] بعدها بتخلي [[IsEmpty]] بـ [[True]].

لاحظ إن [[IsEmpty]] مفيهاش [[{ get; }]]: الـ [[=>]] معناها property محسوبة بتتحسب كل مرة تتقري، مش متخزنة. ولو كتبت [[= Balance == 0;]] بدل [[=>]] هتبقى قيمة اتحسبت مرة وقت الإنشاء وفضلت [[False]] للأبد، وده غلط شائع.`,
          solCode: R`var acc = new Account("Sara", 150m);
try { acc.Withdraw(500m); }
catch (InvalidOperationException ex) { Console.WriteLine(ex.Message); }
acc.Withdraw(150m);
Console.WriteLine(acc.IsEmpty);
public class Account(string owner, decimal opening)
{
    public string Owner { get; } = owner;
    public decimal Balance { get; private set; } = opening;
    public bool IsEmpty => Balance == 0;
    public void Withdraw(decimal amount)
    {
        if (amount > Balance)
            throw new InvalidOperationException($"Insufficient funds: balance {Balance:0.00}, requested {amount:0.00}");
        Balance -= amount;
    }
}`
        },
        {
          cmd: "record",
          title: "record: object للداتا بيتقارن بالقيمة وبيتنسخ بـ with",
          desc: R`[[public record Money(decimal Amount, string Currency);]] سطر واحد بيعملك class فيها properties للقراية بس ([[init]])، و constructor، و [[==]] بيقارن القيم مش الـ references، و [[ToString]] مقروء، و deconstruction.

و [[with]] بيعمل نسخة معدّلة: [[a with { Amount = 250m }]] زي [[{ ...a, amount: 250 }]] في JS بالظبط. الأصل مبيتغيرش.

الـ records هي الاختيار الطبيعي للـ DTOs (اللي بيدخل ويطلع من الـ API)، والـ value objects، ونتايج الدوال.`,
          example: R`var a = new Money(100m, "EGP");
var b = new Money(100m, "EGP");
Console.WriteLine(a == b);
Console.WriteLine(ReferenceEquals(a, b));
var c = a with { Amount = 250m };
Console.WriteLine(c);
Console.WriteLine(a);
var (amount, currency) = c;
Console.WriteLine($"{amount} {currency}");
public record Money(decimal Amount, string Currency);`,
          try: R`اعمل [[record Address(string City, string Street)]] و [[record Customer(string Name, Address Address, List<string> Tags)]]. اعمل عميلين بنفس القيم وقارنهم بـ [[==]]. هل النتيجة زي ما توقعت؟ وبعدين اعمل [[with]] وغيّر الـ Tags في النسخة وشوف الأصل.`,
          flag: "script",
          deep: {
            why: R`في JS بتقارن objects بـ [[JSON.stringify]] أو lodash، وبتنسخ بالـ spread. في C# الـ class العادية [[==]] بتاعها بيقارن الـ reference، فكتابة DTO بـ Equals و GetHashCode و ToString كانت ٥٠ سطر. الـ record بيعملهم كلهم، وبيشجّع immutability.`,
            how: R`الـ compiler بيولّد: properties بـ [[get; init;]]، و constructor، و [[Deconstruct]]، و [[Equals]] و [[GetHashCode]] على كل الحقول، و [[==]] و [[!=]]، و [[ToString]] بالشكل [[Money { Amount = 250, Currency = EGP }]]، و method مخفية للنسخ بيستخدمها [[with]].

الـ equality بتقارن كل property بـ [[Equals]] بتاعها. لو property نوعها record تانية يبقى المقارنة بالقيمة، لو [[List<T>]] يبقى بالـ reference. و [[with]] نسخة shallow: الـ list نفسها بتتشارك بين الأصل والنسخة.

[[record]] لوحدها = [[record class]] (reference type). و [[record struct]] نسخة value type. وتقدر تضيف methods و properties جوه الـ record عادي، وتعمل validation في constructor.`,
            when: R`DTOs و requests و responses في الـ API، و events و messages، و value objects (Money، DateRange)، ونتايج زي [[Result<T>]]. مش للـ entities في EF Core: الـ entity ليها identity (Id) وبتتغير، والـ record equality بالقيمة بتلخبط الـ change tracker.`,
            mistakes: R`record فيها [[List]] وتستنى إن [[==]] يقارن محتوى الـ list. و [[with]] وتفتكر إنها deep copy. واستخدام record كـ EF entity. وفي الانترفيو: «الفرق بين record و class؟» الـ equality بالقيمة، والـ immutability افتراضيًا، و [[with]]، و ToString جاهز.`
          },
          lines: [
            "record بـ positional parameters.",
            "نفس القيم، object تاني.",
            R`[[True]]: مقارنة بالقيمة.`,
            R`[[False]]: هما objectين مختلفين في الذاكرة فعلًا.`,
            R`[[with]]: نسخة جديدة بـ Amount مختلف.`,
            R`[[Money { Amount = 250, Currency = EGP }]].`,
            "الأصل زي ما هو: 100.",
            R`deconstruction زي [[const { amount, currency } = c]].`,
            R`[[250 EGP]].`,
            "التعريف كله: سطر واحد."
          ],
          sol: R`العميلين هيطلعوا [[False]] مع إن كل القيم زي بعض. السبب: [[Address]] record فبتتقارن بالقيمة (تمام)، بس [[Tags]] نوعها [[List<string>]] وده class عادي، فبيتقارن بالـ reference، وكل عميل عنده list مختلفة. لو خليت الاتنين يشاوروا على نفس الـ list هتطلع [[True]].

وبعد [[var copy = c1 with { Name = "Omar" }; copy.Tags.Add("vip");]] هتلاقي [[c1.Tags]] فيها [[vip]] كمان، لأن [[with]] shallow: النسخة والأصل شايلين نفس الـ list. الحل: [[c1 with { Tags = [.. c1.Tags, "vip"] }]] يعمل list جديدة، أو تستخدم [[IReadOnlyList<string>]] وتمنع التعديل أصلًا.`,
          solCode: R`var tags = new List<string> { "new" };
var c1 = new Customer("Sara", new Address("Cairo", "Tahrir"), tags);
var c2 = new Customer("Sara", new Address("Cairo", "Tahrir"), new List<string> { "new" });
Console.WriteLine(c1 == c2);
Console.WriteLine(c1.Address == c2.Address);
var copy = c1 with { Name = "Omar" };
copy.Tags.Add("vip");
Console.WriteLine(string.Join(",", c1.Tags));
var safe = c1 with { Tags = [.. c1.Tags, "gold"] };
Console.WriteLine($"{c1.Tags.Count} {safe.Tags.Count}");
record Address(string City, string Street);
record Customer(string Name, Address Address, List<string> Tags);`
        },
        {
          cmd: "interface",
          title: "interface في C# غير TS: لازم الـ class تقول صراحة إنها بتطبقه",
          desc: R`في TS أي object ليه نفس الشكل بيعدّي (structural typing). في C# لأ: الـ class لازم تكتب [[: INotifier]] صراحة (nominal typing). لو فيه class عندها نفس الـ methods بالظبط بس مكتبتش كده، مش هتعدّي.

الـ interface عقد: أسماء methods و properties من غير تنفيذ. والكود بيعتمد على الـ interface مش على الـ class، فتقدر تبدّل التنفيذ (Email بـ SMS، أو fake في الاختبار). ودي الفكرة اللي الـ DI كله مبني عليها في المستوى ٢. الاسم بيبدأ بـ [[I]] بالعرف.

والـ [[enum]] قايمة قيم ثابتة بأسماء، ووراها أرقام.`,
          example: R`INotifier n = new EmailNotifier();
n.Send("sara@x.com", "hi");
Notify(new SmsNotifier(), "010", "code 1234");
Notify(new Duck(), "x", "y"); // error CS1503: cannot convert from 'Duck' to 'INotifier'
Console.WriteLine(Status.Paid);
Console.WriteLine((int)Status.Paid);
Console.WriteLine(Enum.Parse<Status>("Shipped"));
static void Notify(INotifier notifier, string to, string msg) => notifier.Send(to, msg);
public interface INotifier { void Send(string to, string message); }
public class EmailNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"email to {to}: {message}");
}
public class SmsNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"sms to {to}: {message}");
}
public class Duck { public void Send(string to, string message) { } }
public enum Status { Pending, Paid, Shipped }`,
          try: R`اعمل [[abstract class Shape]] فيها [[abstract double Area()]] و method عادية [[Describe()]] بترجع [[$"{GetType().Name}: {Area():0.00}"]]، وورّثها لـ [[Circle]] و [[Rect]]. اعمل [[List<Shape>]] فيها الاتنين واطبع [[Describe()]] لكل واحد. إمتى تختار abstract class بدل interface؟`,
          flag: "script",
          deep: {
            why: R`اللي جاي من TS بيتوقع إن أي حاجة بنفس الشكل تعدّي، ويتفاجئ بـ CS1503. الـ nominal typing قصده إن تطبيق العقد قرار واعي، مش صدفة إن اسمين اتشابهوا. والـ interfaces هي اللي بتخلي الـ DI والـ mocking في الاختبارات ممكنين.`,
            how: R`الـ class تقدر تورث class واحدة بس ([[: BaseClass]]) وتطبق أي عدد interfaces ([[: Base, IA, IB]]). الـ interface ممكن يبقى فيها default implementation (من C# 8) بس نادرًا ما بتستخدم في كود التطبيقات.

الـ [[abstract class]] ممكن يبقى فيها state (حقول) وكود مشترك و methods [[abstract]] لازم تتعمل [[override]]. و [[virtual]] method ليها تنفيذ افتراضي ممكن يتعمله [[override]]. و [[sealed]] بيمنع الوراثة. وفي C# الـ methods مش virtual افتراضيًا زي Java: لازم تكتب [[virtual]].

الـ [[enum]] وراه [[int]] (0 و 1 و 2 بالترتيب)، والـ cast [[(Status)5]] مسموح حتى لو القيمة مش موجودة، فافحص بـ [[Enum.IsDefined]]. ولما يتبعت JSON بيطلع رقم افتراضيًا، إلا لو استخدمت [[JsonStringEnumConverter]].`,
            when: R`interface لأي dependency ممكن يتبدل أو يتعمله mock (repository، email sender، payment gateway، clock). abstract class لما فيه كود مشترك حقيقي بين أنواع قريبة من بعض. ومتعملش interface لكل class «احتياطي»: class بتعمل حسابات بحتة ومالهاش side effects مش محتاجة.`,
            mistakes: R`interface لكل class بتطابقها واحد لواحد من غير سبب. ووراثة عميقة ٥ مستويات بدل composition. وتنسى [[override]] فتعمل method جديدة بتخبّي القديمة (warning CS0114). وفي الانترفيو: «interface ولا abstract class؟» interface عقد من غير state وتقدر تطبق كذا واحد، و abstract class فيها state وكود مشترك ووراثة واحدة بس.`
          },
          lines: [
            "المتغير نوعه الـ interface، والـ object من class بتطبقه.",
            "بينادي تنفيذ الـ Email.",
            "أي class بتطبق INotifier تعدّي.",
            R`خطأ compile: [[Duck]] عندها نفس الـ method بس مكتبتش [[: INotifier]].`,
            R`[[Paid]]: اسم القيمة.`,
            R`[[1]]: الرقم اللي وراها.`,
            R`من string لـ enum: [[Shipped]].`,
            R`local function بتاخد الـ interface مش class معينة.`,
            "العقد: method من غير تنفيذ.",
            R`[[: INotifier]] صراحة.`,
            "بداية.",
            "التنفيذ.",
            "نهاية.",
            "تنفيذ تاني لنفس العقد.",
            "بداية.",
            "التنفيذ.",
            "نهاية.",
            "نفس الشكل بس مش بتطبق الـ interface.",
            "enum: Pending=0 و Paid=1 و Shipped=2."
          ],
          sol: R`الناتج: [[Circle: 78.54]] و [[Rect: 6.00]] (لو Circle بنص قطر 5 و Rect أبعاده 2 في 3). [[GetType().Name]] بيجيب اسم الـ class الحقيقية وقت التشغيل حتى لو المتغير نوعه [[Shape]]، و [[Area()]] بينادي الـ override الصح (polymorphism).

لو نسيت [[override]] في [[Circle]] هيطلع error CS0534: 'Circle' does not implement inherited abstract member. ولو حاولت [[new Shape()]] هيطلع CS0144 لأن الـ abstract مينفعش يتعمل منه object.

الـ abstract class هنا منطقية لأن [[Describe]] كود مشترك. لو مفيش كود مشترك، interface [[IShape]] أبسط، والـ class تقدر تطبق كذا interface لكن تورث class واحدة بس.`,
          solCode: R`List<Shape> shapes = [new Circle(5), new Rect(2, 3)];
foreach (var s in shapes) Console.WriteLine(s.Describe());
public abstract class Shape
{
    public abstract double Area();
    public string Describe() => $"{GetType().Name}: {Area():0.00}";
}
public class Circle(double r) : Shape
{
    public override double Area() => Math.PI * r * r;
}
public class Rect(double w, double h) : Shape
{
    public override double Area() => w * h;
}`
        }
      ]
    },
    {
      t: "Collections و generics و LINQ",
      l: 1,
      n: "List و Dictionary بدل arrays و objects، و generics زي TS، و LINQ بدل map و filter",
      items: [
        {
          cmd: "List و Dictionary",
          title: "List و Dictionary و HashSet: إيه اللي بيقابل array و object و Set في JS؟",
          desc: R`الـ array في C# ([[int[]]]) حجمه ثابت. اللي بيقابل array الـ JS هو [[List<T>]]: بيكبر ويصغر، و [[Add]] بدل [[push]] و [[Count]] بدل [[length]]. و [[Dictionary<TKey, TValue>]] بيقابل [[Map]] أو object بتستخدمه كـ lookup. و [[HashSet<T>]] بيقابل [[Set]].

من C# 12 فيه collection expressions: [[List<string> names = ["sara", "omar"];]] و [[int[] scores = [90, 75];]] زي JS بالظبط، و [[[.. a, .. b]]] زي الـ spread.

أهم فرق: [[dict["x"]]] لمفتاح مش موجود بيرمي [[KeyNotFoundException]] مش بيرجع undefined. استخدم [[TryGetValue]].`,
          example: R`List<string> names = ["sara", "omar"];
names.Add("mona");
int[] scores = [90, 75, 88];
var stock = new Dictionary<string, int> { ["apple"] = 5, ["pear"] = 0 };
stock["kiwi"] = 12;
if (stock.TryGetValue("apple", out var qty)) Console.WriteLine($"apple: {qty}");
Console.WriteLine(stock.ContainsKey("mango"));
var tags = new HashSet<string> { "c#", "dotnet" };
Console.WriteLine(tags.Add("c#"));
Console.WriteLine($"{names.Count} {scores.Length} {stock.Count} {tags.Count}");
Console.WriteLine(string.Join(", ", names));
Console.WriteLine(stock["mango"]);`,
          try: R`اكتب برنامج بيعد تكرار كل كلمة في جملة ([["the cat and the hat and the bat"]]) في [[Dictionary<string, int>]]، واطبع الكلمات مرتبة من الأكتر للأقل. جرّب تكتبه بـ [[TryGetValue]]، وبعدين بـ [[CollectionsMarshal.GetValueRefOrAddDefault]] لو عايز تتحدى نفسك.`,
          flag: "script",
          deep: {
            why: R`هتستخدم الأنواع دي في كل endpoint: نتايج queries في List، و lookup بالـ Id في Dictionary عشان تتجنب لوب جوه لوب، و HashSet لفحص «موجود ولا لأ» بسرعة. واختيار الغلط هو أشهر سبب لكود بطيء (O(n²)).`,
            how: R`[[List<T>]] من جوه array بيتضاعف حجمه لما يتملى، فالـ [[Add]] في المتوسط O(1)، والبحث بـ [[Contains]] O(n). [[Dictionary]] و [[HashSet]] hash tables: البحث والإضافة O(1) في المتوسط، والمفتاح لازم يكون ليه [[GetHashCode]] و [[Equals]] سليمين (الـ string و int و record تمام).

[[TryGetValue(key, out var value)]] بيعمل lookup واحد ويرجع bool، أحسن من [[ContainsKey]] ثم [[dict[key]]] (lookupين). و [[GetValueOrDefault]] بيرجع default لو مش موجود. والإضافة بـ [[dict[key] = v]] بتكتب فوق القديم، و [[dict.Add(key, v)]] بترمي لو المفتاح موجود.

الترتيب: [[Dictionary]] مش بيضمن ترتيب (عمليًا بيحافظ على ترتيب الإضافة لو مفيش حذف، بس متعتمدش عليه). لو محتاج ترتيب: [[SortedDictionary]] أو رتّب بـ LINQ. وفيه كمان [[Queue<T>]] و [[Stack<T>]] و [[PriorityQueue]] جاهزين.

وللقيم اللي مش هتتغير: [[IReadOnlyList<T>]] كنوع رجوع، أو [[FrozenDictionary]] للـ lookups الثابتة اللي بتتقري كتير.`,
            when: R`List للقوايم العادية، و array لما الحجم ثابت أو للأداء، و Dictionary لأي lookup بمفتاح، و HashSet للعضوية وشيل التكرار. وكنوع parameter خد [[IEnumerable<T>]] أو [[IReadOnlyList<T>]] بدل [[List<T>]] عشان تقبل أي collection.`,
            mistakes: R`[[dict[key]]] على مفتاح ممكن ميبقاش موجود. و [[list.Contains]] جوه loop على list كبيرة (حوّلها HashSet). وتعدّل List وانت بتلف عليها بـ foreach: [[InvalidOperationException: Collection was modified]]. وتنسى إن [[List]] reference type فلو رجعتها من class أي حد يقدر يعدّل فيها.`
          },
          lines: [
            R`collection expression بيعمل List.`,
            R`زي [[push]].`,
            "array: حجمه ثابت.",
            "Dictionary بـ initializer.",
            "إضافة أو كتابة فوق.",
            R`lookup آمن: [[apple: 5]].`,
            R`[[False]].`,
            "HashSet: من غير تكرار.",
            R`[[False]]: كان موجود فمتضافش.`,
            R`[[3 3 3 2]]: List بـ Count و array بـ Length.`,
            R`زي [[names.join(", ")]].`,
            R`[[KeyNotFoundException]]: مفيش undefined في C#.`
          ],
          sol: R`الناتج: [[the: 3]] و [[and: 2]] و [[cat: 1]] و [[hat: 1]] و [[bat: 1]] (الكلمات اللي ليها نفس العدد ترتيبها بيمشي على ترتيب ظهورها، لأن [[OrderByDescending]] stable).

الفكرة: [[counts[word] = counts.TryGetValue(word, out var c) ? c + 1 : 1;]] lookup للقراية وواحد للكتابة. النسخة بـ [[CollectionsMarshal.GetValueRefOrAddDefault(counts, word, out _)++]] بتعمل lookup واحد بس وبتزوّد الرقم مكانه (ref)، ودي اللي بتتكتب في الكود الحساس للأداء. لو استخدمت [[counts[word]++]] على طول هتاخد [[KeyNotFoundException]] أول مرة.`,
          solCode: R`using System.Runtime.InteropServices;
var text = "the cat and the hat and the bat";
var counts = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
    counts[word] = counts.TryGetValue(word, out var c) ? c + 1 : 1;
foreach (var (word, n) in counts.OrderByDescending(kv => kv.Value))
    Console.WriteLine($"{word}: {n}");
var fast = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
    CollectionsMarshal.GetValueRefOrAddDefault(fast, word, out _)++;
Console.WriteLine(fast["the"]);`
        },
        {
          cmd: "generics",
          title: "Generics و where: نفس فكرة <T> في TS بس بتفضل موجودة وقت التشغيل",
          desc: R`[[List<T>]] و [[Dictionary<TKey, TValue>]] generics. وتقدر تعمل بتوعك: [[Result<T>]] بيشيل قيمة من أي نوع، و [[Repo<T>]] بيتعامل مع أي entity.

الـ constraints بـ [[where]] بدل [[extends]] في TS: [[where T : IComparable<T>]] يعني T لازم تقدر تتقارن، و [[where T : class]] reference type، و [[where T : new()]] ليها constructor فاضي.

الفرق عن TS: الـ generics مش بتتمسح. [[List<int>]] و [[List<string>]] نوعين مختلفين فعلًا وقت التشغيل، و [[typeof(T)]] بيشتغل.`,
          example: R`var r1 = Result<int>.Ok(42);
var r2 = Result<int>.Fail("not found");
Console.WriteLine(r1);
Console.WriteLine(r2);
Console.WriteLine(Max([3, 9, 2]));
Console.WriteLine(Max(["b", "z", "a"]));
var repo = new Repo<Product>();
repo.Add(new Product { Id = 1, Name = "Pen" });
Console.WriteLine(repo.Find(1)?.Name);
static T Max<T>(IEnumerable<T> items) where T : IComparable<T>
{
    T best = items.First();
    foreach (var x in items) if (x.CompareTo(best) > 0) best = x;
    return best;
}
public record Result<T>(bool Success, T? Value, string? Error)
{
    public static Result<T> Ok(T value) => new(true, value, null);
    public static Result<T> Fail(string error) => new(false, default, error);
}
public interface IEntity { int Id { get; } }
public class Product : IEntity { public int Id { get; init; } public string Name { get; init; } = ""; }
public class Repo<T> where T : class, IEntity
{
    private readonly Dictionary<int, T> _items = [];
    public void Add(T item) => _items[item.Id] = item;
    public T? Find(int id) => _items.GetValueOrDefault(id);
}`,
          try: R`بص على ناتج [[r2]]: [[Value = 0]] مش null مع إن النوع [[T?]]. ليه؟ وبعدين جرّب [[Max(new[] { new object(), new object() })]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`من غير generics كنت هتكتب [[IntResult]] و [[StringResult]]، أو تستخدم [[object]] وتعمل cast في كل حتة وتخسر الفحص. الـ generics بتديك كود واحد مع أنواع كاملة، وده اللي [[List<T>]] و [[Task<T>]] و [[DbSet<T>]] و [[ILogger<T>]] بيعملوه في كل حتة.`,
            how: R`الـ CLR بيعرف الـ generics (reification). لـ value types زي [[int]] بيعمل نسخة كود مخصصة، فمفيش boxing و [[List<int>]] سريعة. ولـ reference types بيشارك نسخة واحدة.

[[T?]] محتاجة انتباه: لو T غير مقيدة، [[T?]] على [[int]] مش بتبقى [[int?]]، هي [[int]] عادي، و [[default]] = 0. لأن الـ compiler مش عارف T هتبقى value ولا reference. لو عايز null حقيقي للـ value types اعمل constraint [[where T : struct]] وابقى استخدم [[T?]]، أو خليه [[where T : class]].

الـ constraints بتفتحلك methods على T: من غير [[IComparable<T>]] مينفعش تنادي [[CompareTo]]. و [[default]] (أو [[default(T)]]) بيرجع 0 أو null حسب النوع. والـ type inference بيستنتج T من الـ arguments، فـ [[Max([3, 9, 2])]] من غير [[Max<int>]].`,
            when: R`لما تلاقي نفسك بتنسخ class أو method وبتغيّر النوع بس. [[Result<T>]] و repositories و helpers للـ pagination ([[PagedResult<T>]]). ومتعملش generic لحاجة ليها نوع واحد بس «احتياطي».`,
            mistakes: R`تفتكر إن [[T?]] دايمًا nullable. و generic repository فوق EF Core بيخبّي LINQ ويخليك تكتب methods لكل query (الـ DbSet نفسه repository). وتنسى الـ constraint وتحاول تنادي method على T فيطلع CS1061.`
          },
          lines: [
            "generic record بـ int.",
            "نفس النوع بحالة فشل.",
            R`[[Result { Success = True, Value = 42, Error =  }]].`,
            R`[[Value = 0]]: شوف الـ try.`,
            R`[[9]]: T اتستنتج int.`,
            R`[[z]]: نفس الدالة مع string.`,
            "repo لنوع معيّن.",
            "إضافة.",
            R`[[Pen]].`,
            R`generic method، و [[where]] بيضمن إن T فيها [[CompareTo]].`,
            "بداية.",
            "أول عنصر كبداية.",
            "loop و مقارنة.",
            "الأكبر.",
            "نهاية.",
            R`generic record: [[T?]] للقيمة.`,
            "بداية.",
            R`factory method: [[new(...)]] من غير اسم النوع (target-typed).`,
            R`[[default]]: صفر أو null حسب T.`,
            "نهاية.",
            "interface فيه Id.",
            "entity بتطبقه.",
            R`قيدين: reference type وبيطبق IEntity.`,
            "بداية.",
            R`[[readonly]]: المتغير ميتغيرش بعد الإنشاء (المحتوى يتغير عادي).`,
            R`[[item.Id]] مسموح بسبب الـ constraint.`,
            R`[[GetValueOrDefault]]: null لو مش موجود.`,
            "نهاية."
          ],
          sol: R`[[Value = 0]] لأن [[T?]] مع T غير مقيدة، لما T تبقى [[int]]، معناها [[int]] عادي مش [[int?]]. الـ [[?]] هنا annotation للـ reference types بس، و [[default]] لـ int هو 0. لو غيّرت الـ record لـ [[Result<int?>]] أو قيدته [[where T : struct]] مع [[T?]] هتلاقي [[Value = ]] (null).

[[Max(new[] { new object(), new object() })]] بيطلّع [[error CS0311: The type 'object' cannot be used as type parameter 'T' in the generic type or method 'Max<T>(IEnumerable<T>)'. There is no implicit reference conversion from 'object' to 'System.IComparable<object>'.]] الـ constraint بيمنعك في الـ compile، مش وقت التشغيل.`
        },
        {
          cmd: "LINQ",
          title: "LINQ: Where و Select و GroupBy بدل filter و map و reduce",
          desc: R`LINQ هو map و filter و reduce بتوع JS، بس أكتر بكتير ومتاح على أي collection. الأسماء مختلفة: [[Where]] = filter، و [[Select]] = map، و [[Aggregate]] = reduce، و [[OrderBy]] = sort من غير ما يعدّل الأصل، و [[Any]] = some، و [[All]] = every، و [[FirstOrDefault]] = find.

وفيه حاجات مش موجودة في JS جاهزة: [[GroupBy]] و [[Sum]] و [[Max]] و [[DistinctBy]] و [[Chunk]] و [[ToDictionary]]. ونفس الكلام بيشتغل على قاعدة البيانات مع EF Core وبيتحول لـ SQL (المستوى ٢).`,
          example: R`Order[] orders =
[
    new(1, "sara", 120m, "Paid"),
    new(2, "omar", 80m, "Pending"),
    new(3, "sara", 45m, "Paid"),
    new(4, "mona", 300m, "Paid"),
];
var bigPaid = orders
    .Where(o => o.Status == "Paid" && o.Total > 50)
    .OrderByDescending(o => o.Total)
    .Select(o => new { o.Id, o.Customer });
foreach (var o in bigPaid) Console.WriteLine(o);
var perCustomer = orders
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Count = g.Count(), Sum = g.Sum(o => o.Total) });
foreach (var row in perCustomer) Console.WriteLine(row);
Console.WriteLine(orders.Any(o => o.Total > 250));
Console.WriteLine(orders.FirstOrDefault(o => o.Customer == "ali")?.Id ?? -1);
Console.WriteLine(orders.Sum(o => o.Total));
record Order(int Id, string Customer, decimal Total, string Status);`,
          try: R`بنفس الـ orders: (١) اطبع أعلى عميل في المدفوع ([[Paid]]) وإجماليه. (٢) اعمل [[Dictionary<string, decimal>]] من العميل لإجمالي طلباته بـ [[ToDictionary]]. (٣) قسّم الطلبات لصفحات كل صفحة ٢ بـ [[Chunk(2)]] واطبع كل صفحة.`,
          flag: "script",
          deep: {
            why: R`أغلب كود الـ backend تحويل داتا: فلترة وتجميع وتحويل لـ DTO. LINQ بيخليه declarative ومقروء، ونفس الأسلوب بيشتغل على List في الذاكرة وعلى جدول في Postgres. لو اتعلمته كويس هنا هتكتب queries الـ EF Core من غير ما تفكر.`,
            how: R`LINQ عبارة عن extension methods على [[IEnumerable<T>]] (الدرس الجاي بيشرح يعني إيه). كل method بترجع [[IEnumerable]] جديد، فبتسلسلهم. و [[new { o.Id, o.Customer }]] اسمه anonymous type: نوع بيتعمل وقت الـ compile بالخصائص دي، زي object literal في JS بس بنوع ثابت، ومينفعش ترجعه من method عامة (استخدم record).

[[First]] بيرمي لو مفيش عناصر، و [[FirstOrDefault]] بيرجع null أو default. ونفس الفكرة [[Single]] (بيرمي لو أكتر من واحد) و [[SingleOrDefault]].

فيه كمان query syntax: [[from o in orders where o.Total > 50 select o.Id]] وبيتحول لنفس الـ methods. أغلب الكود الحديث بيستخدم method syntax، والـ query syntax مريحة في الـ joins المعقدة.

الـ [[OrderBy]] stable، وبتضيف ترتيب تاني بـ [[ThenBy]]. و [[.NET 9+]] ضاف [[CountBy]] و [[AggregateBy]] و [[Index]].`,
            when: R`أي تحويل على collection. للوبات اللي فيها side effects (طباعة، حفظ) استخدم [[foreach]] عادي. وفي كود حساس للأداء جدًا LINQ فيه allocations صغيرة، فقيس قبل ما تغيّر.`,
            mistakes: R`[[First()]] على نتيجة ممكن تبقى فاضية. و [[Count() > 0]] بدل [[Any()]]. وتنادي [[orders.Where(...)]] وتنسى إن النتيجة مش بتتحسب لحد ما تلف عليها (الدرس الجاي). وتعمل [[ToList()]] في نص السلسلة من غير داعي.`
          },
          lines: [
            "array من records.",
            "بداية الـ collection expression.",
            R`[[new(...)]]: النوع معروف من الـ array.`,
            "طلب.",
            "طلب.",
            "طلب.",
            "نهاية.",
            "سلسلة LINQ.",
            R`زي [[filter]].`,
            R`ترتيب تنازلي (مش بيعدّل الأصل).`,
            R`زي [[map]] لـ anonymous type.`,
            R`[[{ Id = 4, Customer = mona }]] ثم [[{ Id = 1, Customer = sara }]].`,
            "تجميع.",
            R`مجموعات بالعميل: كل مجموعة ليها [[Key]].`,
            "لكل مجموعة: العدد والإجمالي.",
            R`[[{ Customer = sara, Count = 2, Sum = 165 }]] وهكذا.`,
            R`[[True]]: زي [[some]].`,
            R`[[-1]]: مفيش ali، فـ [[?.]] و [[??]].`,
            R`[[545]].`,
            "الـ record."
          ],
          sol: R`(١) [[mona 300]]: [[orders.Where(o => o.Status == "Paid").GroupBy(o => o.Customer).Select(g => new { g.Key, Total = g.Sum(o => o.Total) }).MaxBy(x => x.Total)]]. [[MaxBy]] بيرجع العنصر نفسه مش القيمة، وده أحسن من [[OrderByDescending(...).First()]].

(٢) [[sara: 165]] و [[omar: 80]] و [[mona: 300]]. لو كتبت [[orders.ToDictionary(o => o.Customer, o => o.Total)]] على طول هيرمي [[ArgumentException: An item with the same key has already been added. Key: sara]] لأن sara ليها طلبين، فلازم [[GroupBy]] الأول.

(٣) [[Chunk(2)]] بيرجع arrays: صفحة ١ فيها 1 و 2، وصفحة ٢ فيها 3 و 4.`,
          solCode: R`Order[] orders = [new(1, "sara", 120m, "Paid"), new(2, "omar", 80m, "Pending"), new(3, "sara", 45m, "Paid"), new(4, "mona", 300m, "Paid")];
var top = orders.Where(o => o.Status == "Paid")
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Total) })
    .MaxBy(x => x.Total);
Console.WriteLine($"{top!.Customer} {top.Total}");
var totals = orders.GroupBy(o => o.Customer).ToDictionary(g => g.Key, g => g.Sum(o => o.Total));
foreach (var (customer, total) in totals) Console.WriteLine($"{customer}: {total}");
var page = 1;
foreach (var chunk in orders.Chunk(2))
    Console.WriteLine($"page {page++}: {string.Join(", ", chunk.Select(o => o.Id))}");
record Order(int Id, string Customer, decimal Total, string Status);`
        },
        {
          cmd: "IEnumerable و yield",
          title: "ليه الـ LINQ query بيتنفذ مرتين؟ (deferred execution و yield)",
          desc: R`[[orders.Where(...)]] مش بيفلتر حاجة وقت ما يتكتب. بيرجع «وصفة» ([[IEnumerable<T>]]) بتتنفذ لما حد يلف عليها: [[foreach]] أو [[Count()]] أو [[ToList()]]. وكل مرة تلف عليها بتتنفذ من الأول. ده اسمه deferred execution، وشبه الـ generators في JS.

و [[yield return]] بيخليك تكتب method بترجع [[IEnumerable]] عنصر عنصر، بالظبط زي [[function*]] و [[yield]] في JS.

القاعدة: لو هتستخدم النتيجة أكتر من مرة، أو المصدر ممكن يتغير، أو المصدر قاعدة بيانات، اعمل [[ToList()]] مرة واحدة.`,
          example: R`var numbers = new List<int> { 1, 2, 3 };
var evens = numbers.Where(n => { Console.WriteLine($"  checking {n}"); return n % 2 == 0; });
Console.WriteLine("query built");
numbers.Add(4);
Console.WriteLine($"count = {evens.Count()}");
Console.WriteLine($"count again = {evens.Count()}");
var snapshot = evens.ToList();
foreach (var n in Countdown(3)) Console.WriteLine(n);
static IEnumerable<int> Countdown(int from)
{
    for (var i = from; i > 0; i--)
    {
        Console.WriteLine($"  yield {i}");
        yield return i;
    }
}`,
          try: R`اعمل method [[ReadNumbers()]] بـ [[yield return]] بترجع أرقام من 1 لـ 1,000,000 وبتطبع «reading» أول مرة بس، وخد منها [[.Where(n => n % 7 == 0).Take(3)]]. كام رقم اتقرا فعلًا؟ وإيه اللي هيحصل لو حطيت [[ToList()]] قبل الـ [[Take]]؟`,
          flag: "script",
          deep: {
            why: R`ده مصدر bugs حقيقية: query بتتنفذ مرتين فتكلم الداتابيز مرتين، أو نتيجة بتتغير لأن الـ list الأصلية اتغيرت بعد ما عملت الـ query، أو [[IEnumerable]] بيترجع من method والـ DbContext اتقفل قبل ما حد يلف عليه. وبرضه هو اللي بيخلي LINQ يشتغل على داتا ضخمة من غير ما يحمّلها في الذاكرة.`,
            how: R`[[IEnumerable<T>]] فيه method واحدة: [[GetEnumerator()]] بترجع [[IEnumerator<T>]] فيه [[MoveNext()]] و [[Current]]. الـ [[foreach]] بينادي دول. و [[Where]] بترجع object ماسك المصدر والـ lambda، ولما تنادي [[MoveNext]] بيسحب من المصدر لحد ما يلاقي عنصر يعدّي.

[[yield return]] الـ compiler بيحوّله لـ state machine: الـ method بتقف عند كل [[yield]] وتكمّل من نفس المكان في الـ [[MoveNext]] الجاية. و [[yield break]] زي return.

الـ operators نوعين: lazy (Where و Select و Take و Skip) و eager بتلف على الكل على طول (Count و Sum و ToList و ToDictionary و First). و [[OrderBy]] lazy بس لما تبدأ تلف عليه بيقرا الكل عشان يرتب.`,
            when: R`[[yield]] للـ pipelines على داتا كبيرة أو stream (سطور ملف، صفحات API). [[ToList()]] لما هتستخدم النتيجة كذا مرة أو قبل ما ترجعها من method تستخدم resource هيتقفل. وفيه [[IAsyncEnumerable<T>]] مع [[await foreach]] للنسخة الـ async.`,
            mistakes: R`ترجع [[IEnumerable]] من method جوه [[using var db = ...]] فالـ context يتقفل والـ caller ياخد [[ObjectDisposedException]]. وتنادي [[Count()]] وبعدها [[foreach]] على query تقيل. وتفتكر إن [[IEnumerable]] معناها collection في الذاكرة: ممكن تبقى query أو ملف أو infinite sequence.`
          },
          lines: [
            "list عادية.",
            "Where بـ lambda بتطبع كل ما تتنادى. مفيش حاجة اتنفذت لسه.",
            R`بيطبع [[query built]] قبل أي [[checking]].`,
            "نعدّل المصدر بعد ما عملنا الـ query.",
            R`هنا بس بيتنفذ: بيفحص 1 و 2 و 3 و 4 (شاف العنصر الجديد)، و [[count = 2]].`,
            "بيتنفذ تاني من الأول: ٤ فحوصات كمان.",
            "مرة تالتة، والنتيجة اتثبتت في list.",
            R`[[yield 3]] ثم [[3]] ثم [[yield 2]] ثم [[2]]: بالتبادل، مش الكل الأول.`,
            R`method بترجع [[IEnumerable<int>]].`,
            "بداية.",
            "loop.",
            "بداية.",
            "بيطبع قبل ما يسلّم العنصر.",
            R`بيسلّم العنصر ويقف هنا لحد ما الـ foreach يطلب اللي بعده.`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`مع [[Where(n => n % 7 == 0).Take(3)]] اتقرا ٢١ رقم بس (7 و 14 و 21 هم أول تلاتة، فالـ Take وقف بعد 21)، و «reading» اتطبعت مرة واحدة، والناتج [[7, 14, 21]] و [[read: 21]].

لو حطيت [[ToList()]] قبل الـ [[Take]] ([[ReadNumbers().Where(...).ToList().Take(3)]]) هيقرا المليون كلهم ويعمل list فيها ١٤٢٨٥٧ رقم، وبعدين ياخد أول تلاتة. نفس الناتج بس شغل أكتر بكتير. ومع EF Core نفس الغلطة معناها تحمّل الجدول كله من الداتابيز.`,
          solCode: R`var read = 0;
var firstThree = ReadNumbers().Where(n => n % 7 == 0).Take(3).ToList();
Console.WriteLine($"{string.Join(", ", firstThree)} read: {read}");
IEnumerable<int> ReadNumbers()
{
    Console.WriteLine("reading");
    for (var i = 1; i <= 1_000_000; i++)
    {
        read++;
        yield return i;
    }
}`
        }
      ]
    }
  ]
});
