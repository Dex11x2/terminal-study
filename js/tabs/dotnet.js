// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
    },
    {
      t: "الدوال و lambdas و pattern matching",
      l: 1,
      n: "Func و Action و events، و extension methods، و switch expressions، و exceptions و using",
      items: [
        {
          cmd: "Func و Action",
          title: "Lambdas و Func و Action و events: الدوال كقيم زي JS",
          desc: R`في JS الدالة قيمة عادية. في C# برضه، بس ليها نوع: [[Func<int, int, int>]] دالة بتاخد intين وترجع int (آخر نوع هو اللي بيرجع)، و [[Action<string>]] دالة بتاخد string ومبترجعش حاجة (void). والـ lambda نفس سهم JS: [[(a, b) => a + b]].

الـ lambdas بتمسك المتغيرات اللي حواليها (closures) زي JS بالظبط. والـ delegate هو الاسم الرسمي لنوع الدالة، و [[Func]] و [[Action]] delegates جاهزة.

و [[event]] نسخة محمية من الفكرة دي: قايمة دوال تشترك فيها بـ [[+=]] وتلغي بـ [[-=]]، زي [[addEventListener]]. هتشوفها في UI و Blazor أكتر من الـ APIs.`,
          example: R`Func<int, int, int> add = (a, b) => a + b;
Action<string> log = msg => Console.WriteLine($"[log] {msg}");
Predicate<int> isEven = n => n % 2 == 0;
Console.WriteLine(add(2, 3));
log("started");
Console.WriteLine(isEven(4));
var counter = 0;
Action inc = () => counter++;
inc(); inc();
Console.WriteLine(counter);
var cart = new Cart();
cart.ItemAdded += (sender, name) => Console.WriteLine($"added {name}");
cart.ItemAdded += (_, name) => Console.WriteLine($"analytics: {name}");
cart.Add("pen");
public class Cart
{
    public event EventHandler<string>? ItemAdded;
    public void Add(string name) => ItemAdded?.Invoke(this, name);
}`,
          try: R`اكتب دالة [[Retry<T>(Func<T> action, int times)]] بتنادي [[action]] ولو رمت exception تحاول تاني لحد [[times]] مرات، وجرّبها بـ lambda بتفشل أول مرتين وتنجح التالتة (استخدم متغير عداد برّه الـ lambda).`,
          flag: "script",
          deep: {
            why: R`LINQ كله lambdas، و ASP.NET Core minimal APIs كل endpoint فيها lambda، والـ middleware lambda، والإعدادات [[o => o.UseNpgsql(...)]] lambda. لازم تبقى مرتاح إنك تبعت دالة كـ parameter وتقرا [[Func<HttpContext, Task>]] من غير ما تتوه.`,
            how: R`الـ lambda بتتحول لـ delegate instance. لو بتمسك متغيرات من برّه، الـ compiler بيعمل class مخفية شايلة المتغيرات دي (زي closure في JS)، فالتعديل على [[counter]] جوه الـ lambda بيعدّل المتغير الأصلي.

[[Func<T1, ..., TResult>]] لحد ١٦ parameter، و [[Action<T1, ...>]] للـ void، و [[Predicate<T>]] = [[Func<T, bool>]]. و [[_]] كـ parameter معناها «مش محتاجه» (discard).

الـ lambda ممكن تتحول لحاجتين: delegate (كود بيتنفذ) أو [[Expression<Func<...>>]] (شجرة بتوصف الكود). EF Core بياخد الـ Expression ويحوّلها SQL، وده ليه نفس الـ lambda بتشتغل على List وعلى الداتابيز (آخر category).

الـ event: [[event]] بيمنع اللي برّه إنه ينادي الـ delegate أو يمسحه بـ [[=]]، يقدر بس يعمل [[+=]] و [[-=]]. و [[?.Invoke]] لأن لو مفيش مشتركين القيمة null.`,
            when: R`Func و Action لأي API بياخد سلوك (callback، strategy، retry). events في UI والـ domain events البسيطة جوه process واحد. للتواصل بين services أو إشعارات مستقلة استخدم queue أو [[IHostedService]] مش events.`,
            mistakes: R`تنسى [[-=]] على event من object عايش طول عمر التطبيق فيحصل memory leak (الـ publisher ماسك reference للـ subscriber). وclosure جوه loop بيمسك نفس المتغير. و [[async void]] lambda في event handler: الـ exceptions بتوقع البروسيس (درس async).`
          },
          lines: [
            "دالة بتاخد intين وترجع int.",
            "دالة مبترجعش حاجة.",
            R`[[Predicate<int>]] = [[Func<int, bool>]].`,
            R`[[5]].`,
            R`[[[log] started]].`,
            R`[[True]].`,
            "متغير برّه الـ lambda.",
            "closure بتعدّل المتغير الأصلي.",
            "نداءين.",
            R`[[2]].`,
            "object فيه event.",
            R`اشتراك زي [[addEventListener]].`,
            R`مشترك تاني، و [[_]] يعني مش محتاج الـ sender.`,
            R`بينادي الاتنين بالترتيب: [[added pen]] ثم [[analytics: pen]].`,
            "class فيها event.",
            "بداية.",
            R`[[EventHandler<string>]] = دالة بتاخد (sender, string).`,
            R`[[?.Invoke]]: لو مفيش مشتركين مش هيعمل حاجة.`,
            "نهاية."
          ],
          sol: R`الناتج: [[attempt 1 failed]] و [[attempt 2 failed]] وبعدين [[ok on attempt 3]]. الـ lambda بتمسك [[attempts]] من برّه (closure) وبتزوّده كل نداء، فبتعرف هي في أنهي محاولة.

لاحظ إن [[Retry]] بترمي الـ exception الأصلي بـ [[throw;]] لو خلصت المحاولات، مش [[throw ex;]]، عشان الـ stack trace يفضل زي ما هو (درس exceptions). ولو [[times]] 2 بدل 3 هتلاقي [[InvalidOperationException: flaky]] بعد المحاولة التانية. في الإنتاج متكتبهاش بإيدك: مكتبة Polly أو [[Microsoft.Extensions.Http.Resilience]] بتعمل retry مع backoff (المستوى ٣).`,
          solCode: R`var attempts = 0;
var result = Retry(() =>
{
    attempts++;
    if (attempts < 3)
    {
        Console.WriteLine($"attempt {attempts} failed");
        throw new InvalidOperationException("flaky");
    }
    return $"ok on attempt {attempts}";
}, times: 3);
Console.WriteLine(result);
static T Retry<T>(Func<T> action, int times)
{
    for (var i = 1; ; i++)
    {
        try { return action(); }
        catch when (i < times) { }
    }
}`
        },
        {
          cmd: "extension methods",
          title: "extension methods: تضيف method لنوع مش بتاعك (زي LINQ بالظبط)",
          desc: R`تقدر تكتب [[static]] method في [[static class]] وأول parameter فيها [[this string s]]، فتتنادى كأنها method على الـ string: [[name.ToTitle()]]. ده اسمه extension method، وده بالظبط إزاي LINQ شغال: [[Where]] و [[Select]] extensions على [[IEnumerable<T>]].

وفي ASP.NET Core كل [[builder.Services.AddXxx()]] و [[app.MapXxx()]] extension methods. وانت هتعمل زيهم عشان تنظّم [[Program.cs]]: [[app.MapProducts()]] بدل ١٠٠ سطر.

وفي C# 14 (مع .NET 10) فيه صيغة جديدة: بلوك [[extension(IEnumerable<T> source) { ... }]] وجواه تقدر تعمل extension properties كمان، مش methods بس.`,
          example: R`Console.WriteLine("hello world from cairo".ToTitle());
Console.WriteLine("sara".IsBlank());
Console.WriteLine("  ".IsBlank());
int[] nums = [4, 8, 15];
Console.WriteLine(nums.IsEmpty);
public static class StringExtensions
{
    public static string ToTitle(this string s) =>
        string.Join(' ', s.Split(' ').Select(w => char.ToUpper(w[0]) + w[1..]));
    public static bool IsBlank(this string? s) => string.IsNullOrWhiteSpace(s);
}
public static class SeqExtensions
{
    extension<T>(IEnumerable<T> source)
    {
        public bool IsEmpty => !source.Any();
    }
}`,
          try: R`اعمل extension method [[Paginate<T>(this IEnumerable<T> items, int page, int size)]] بترجع الصفحة المطلوبة ([[Skip]] و [[Take]])، وجرّبها على الأرقام من 1 لـ 25 صفحة 3 حجم 10. وبعدين اكتبها بصيغة C# 14 جوه بلوك [[extension]].`,
          flag: "script",
          deep: {
            why: R`بتخليك تضيف helpers على أنواع مش بتاعتك (string، IEnumerable، IServiceCollection) من غير وراثة ولا wrapper، وتخلي الكود يتقري من الشمال لليمين: [[orders.Paid().Recent().Paginate(2, 20)]] بدل [[Paginate(Recent(Paid(orders)), 2, 20)]].`,
            how: R`الموضوع syntax بس: [[name.ToTitle()]] بيتحول وقت الـ compile لـ [[StringExtensions.ToTitle(name)]]. مفيش تعديل حقيقي على [[string]]، ومتقدرش توصل للـ private members. ولازم الـ namespace بتاع الـ static class يبقى متعمله [[using]] عشان الـ methods تظهر.

لو النوع نفسه عنده method بنفس الاسم، الـ instance method بتكسب. وتقدر تنادي extension على null ([[IsBlank]] على [[string?]]) لأنها method static عادية، بعكس الـ instance methods.

صيغة C# 14: [[extension<T>(IEnumerable<T> source) { ... }]] جوه [[static class]]، والأعضاء جوه البلوك بتستخدم [[source]] على طول. بتسمح بـ extension properties و static members، والصيغة القديمة لسه شغالة ومتوافقة.

و [[w[1..]]] اسمه range: من index 1 للآخر، زي [[slice(1)]].`,
            when: R`لتنظيم الـ DI والـ endpoints ([[AddShopServices]] و [[MapProducts]])، و helpers صغيرة بتتكرر على أنواع مش بتاعتك، و query helpers على [[IQueryable<T>]]. متعملش extension لكل حاجة: لو الـ method محتاجة state أو dependencies خليها service.`,
            mistakes: R`extension بتعمل I/O أو ليها side effects مخفية ورا شكل method بريئة. و [[ToTitle]] على string فاضي ([[w[0]]] بيرمي [[IndexOutOfRangeException]]). وتنسى الـ [[using]] فالـ method «مش موجودة» (CS1061) مع إنها مكتوبة.`
          },
          lines: [
            R`[[Hello World From Cairo]]: كأنها method على string.`,
            R`[[False]].`,
            R`[[True]]: بتشتغل كمان على null.`,
            "array.",
            R`[[False]]: extension property من C# 14.`,
            R`لازم [[static class]].`,
            "بداية.",
            R`[[this string s]]: ده اللي بيخليها extension.`,
            R`كل كلمة: أول حرف كبير + الباقي ([[w[1..]]] زي [[slice(1)]]).`,
            R`extension على [[string?]]: آمنة مع null.`,
            "نهاية.",
            "static class تانية.",
            "بداية.",
            R`بلوك C# 14: [[source]] هو الـ receiver.`,
            "بداية البلوك.",
            R`extension property، مش method.`,
            "نهاية البلوك.",
            "نهاية."
          ],
          sol: R`[[Enumerable.Range(1, 25).Paginate(3, 10)]] بيرجع [[21, 22, 23, 24, 25]]: الصفحة التالتة فيها ٥ بس لأن المجموع ٢٥. المعادلة [[Skip((page - 1) * size).Take(size)]]، وأشهر غلطة إنك تكتب [[Skip(page * size)]] فتبدأ من الصفحة الرابعة وترجع فاضي.

بصيغة C# 14 الـ method جوه [[extension<T>(IEnumerable<T> items) { public IEnumerable<T> Paginate(int page, int size) => items.Skip(...).Take(...); }]]، والنداء زي ما هو بالظبط. ولو الـ SDK أقدم من .NET 10 هيطلع error على كلمة [[extension]]، فالصيغة الكلاسيك بـ [[this]] هي اللي تشتغل في كل النسخ.`,
          solCode: R`Console.WriteLine(string.Join(", ", Enumerable.Range(1, 25).Paginate(3, 10)));
Console.WriteLine(string.Join(", ", Enumerable.Range(1, 25).Page(1, 10)));
public static class PagingExtensions
{
    public static IEnumerable<T> Paginate<T>(this IEnumerable<T> items, int page, int size) =>
        items.Skip((page - 1) * size).Take(size);
}
public static class PagingExtensions14
{
    extension<T>(IEnumerable<T> items)
    {
        public IEnumerable<T> Page(int page, int size) => items.Skip((page - 1) * size).Take(size);
    }
}`
        },
        {
          cmd: "switch expression",
          title: "pattern matching و switch expression: if طويلة في سطور قليلة",
          desc: R`الـ [[switch]] expression بيرجع قيمة، وكل فرع pattern: نوع ([[int n]])، أو شرط ([[when n < 0]])، أو شكل properties ([[Order { Total: > 1000 }]])، أو مقارنة ([[>= 200]])، أو [[or]] و [[and]] و [[not]]. و [[_]] هو الـ default.

ده أقوى بكتير من switch في JS، وقريب من narrowing في TS: جوه الفرع [[string s]] المتغير [[s]] نوعه string. وتقدر تعمل switch على tuple: [[(order.Total, country) switch { ... }]] وده بيحل جداول القرارات.

و [[is]] نفس الفكرة في if: [[if (x is Order { Total: > 1000 } big)]].`,
          example: R`object[] inputs = [42, -3, "hi", 3.5, new Order(1, 0m), new Order(2, 1500m)];
foreach (var x in inputs) Console.WriteLine(Describe(x));
Console.WriteLine(Shipping(new Order(3, 250m), "EG"));
Console.WriteLine(Shipping(new Order(4, 250m), "SA"));
static string Describe(object? x) => x switch
{
    null => "null",
    int n when n < 0 => $"negative int {n}",
    int n => $"int {n}",
    string { Length: 0 } => "empty string",
    string s => $"string of {s.Length}",
    Order { Total: > 1000 } o => $"big order #{o.Id}",
    Order o => $"order #{o.Id}",
    _ => $"something else: {x.GetType().Name}"
};
static decimal Shipping(Order order, string country) => (order.Total, country) switch
{
    (>= 200, "EG") => 0m,
    (_, "EG") => 30m,
    (_, "SA" or "AE") => 120m,
    _ => 200m
};
record Order(int Id, decimal Total);`,
          try: R`اعمل [[enum OrderStatus { Pending, Paid, Shipped, Cancelled }]] ودالة [[CanCancel(OrderStatus s, DateTime paidAt)]] بـ switch expression: Pending ينفع دايمًا، و Paid ينفع لو عدى أقل من ٢٤ ساعة، والباقي لأ. وبعدين امسح فرع [[_]] وشوف الـ compiler بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`منطق الـ business مليان «لو كذا وكذا يبقى كذا»: الشحن، والخصومات، والصلاحيات، وتحويل status لـ HTTP code. الـ switch expression بيخلي الجدول ده باين في مكان واحد، والـ compiler بيحذرك لو نسيت حالة.`,
            how: R`الفروع بتتفحص بالترتيب من فوق لتحت، وأول واحد يطابق يكسب. عشان كده [[int n when n < 0]] لازم قبل [[int n]]، ولو عكست الـ compiler بيقولك error CS8510 (الفرع ده مستحيل يتوصل له).

لو الـ patterns مش مغطية كل الحالات بيطلع warning CS8509 (not exhaustive)، ومع enum متغطية أسماؤه كلها بيطلع CS8524 عشان القيم اللي ملهاش اسم، ولو ولا فرع طابق وقت التشغيل بيرمي [[SwitchExpressionException]]. مع enum الـ compiler بيعرف القيم، بس لأن أي int ممكن يتعمله cast لـ enum، لازم [[_]] برضه عشان التحذير يختفي.

الأنواع: type pattern ([[int n]])، و property pattern ([[{ Length: 0 }]]، ممكن تتداخل [[{ Customer: { City: "Cairo" } }]])، و relational ([[> 1000]])، و logical ([[or]] و [[and]] و [[not null]])، و positional للـ tuples والـ records، و list patterns ([[[1, 2, ..]]]).`,
            when: R`تحويلات بقيم (status لنص، نوع لـ handler)، وجداول قرارات بشرطين أو تلاتة، وفحص الأنواع. لو كل فرع فيه ١٠ سطور منطق، يبقى if عادي أو polymorphism أوضح.`,
            mistakes: R`ترتيب غلط (العام قبل الخاص). وتتجاهل تحذير CS8509 فتاخد exception في الإنتاج. وتكتب [[x == null]] بدل [[x is null]]. وفي switch على tuple تنسى إن الترتيب مهم: [[(_, "EG")]] قبل [[(>= 200, "EG")]] هيخلي الشحن المجاني ميحصلش أبدًا.`
          },
          lines: [
            R`array من [[object]] فيه أنواع مختلفة.`,
            R`[[int 42]] و [[negative int -3]] و [[string of 2]] و [[something else: Double]] و [[order #1]] و [[big order #2]].`,
            R`[[0]]: الشحن مجاني.`,
            R`[[120]].`,
            R`[[switch]] كـ expression بيرجع قيمة.`,
            "بداية الفروع.",
            "null pattern.",
            R`type pattern + [[when]]: لازم قبل [[int n]].`,
            "أي int تاني.",
            R`property pattern: string طولها صفر.`,
            "أي string تاني.",
            "record فيه Total أكبر من 1000.",
            "أي Order تاني.",
            R`[[_]]: أي حاجة تانية.`,
            "نهاية.",
            "switch على tuple من قيمتين.",
            "بداية.",
            R`relational pattern + قيمة: مصر وفوق 200.`,
            "مصر وأقل.",
            R`[[or]] pattern.`,
            "الباقي.",
            "نهاية.",
            "record بسيط."
          ],
          sol: R`[[CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-2))]] بيرجع [[True]]، و [[AddHours(-30)]] بيرجع [[False]]، و Pending دايمًا [[True]]، و Shipped [[False]].

لما تمسح [[_]] الـ build بينجح مع [[warning CS8524: The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value. For example, the pattern '(OrderStatus)4' is not covered.]] لاحظ إنه مش CS8509 العادي، وبيقولك [[(OrderStatus)4]] مش Shipped: الأسماء الأربعة متغطية، بس أي int ممكن يتحول لـ enum. عشان كده خلي [[_ => false]] أو فرع صريح بيرمي exception.`,
          solCode: R`Console.WriteLine(CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-2)));
Console.WriteLine(CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-30)));
Console.WriteLine(CanCancel(OrderStatus.Pending, DateTime.UtcNow));
Console.WriteLine(CanCancel(OrderStatus.Shipped, DateTime.UtcNow));
static bool CanCancel(OrderStatus s, DateTime paidAt) => s switch
{
    OrderStatus.Pending => true,
    OrderStatus.Paid when DateTime.UtcNow - paidAt < TimeSpan.FromHours(24) => true,
    OrderStatus.Paid or OrderStatus.Shipped or OrderStatus.Cancelled => false,
    _ => throw new ArgumentOutOfRangeException(nameof(s))
};
enum OrderStatus { Pending, Paid, Shipped, Cancelled }`
        },
        {
          cmd: "exceptions و using",
          title: "try و catch و finally و using: الأخطاء وقفل الـ resources",
          desc: R`الـ exceptions في C# زي JS: [[throw]] و [[try]] و [[catch]] و [[finally]]. الفرق إن الـ catch بيتكتب بالنوع: [[catch (NotFoundException ex)]] بيمسك النوع ده وأولاده بس، وتقدر تحط كذا catch من الخاص للعام، وتضيف شرط بـ [[when]].

و [[throw;]] لوحدها جوه catch بترمي نفس الـ exception من غير ما تمسح الـ stack trace.

و [[using]] بيقفل أي حاجة بتطبق [[IDisposable]] (ملف، connection، HttpResponse) أول ما تخلص حتى لو حصل exception. [[using var x = ...;]] بيقفلها في آخر الـ block اللي هي فيه. زي [[try/finally]] من غير ما تكتبه.`,
          example: R`try
{
    var order = Load(7);
}
catch (NotFoundException ex) when (ex.Id > 5)
{
    Console.WriteLine($"not found: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"unexpected: {ex.GetType().Name}");
    throw;
}
finally
{
    Console.WriteLine("finally runs always");
}
using (var res = new Resource("file"))
{
    Console.WriteLine("using the resource");
}
using var conn = new Resource("conn");
Console.WriteLine("end of program");
static string Load(int id) => throw new NotFoundException(id);
public class NotFoundException(int id) : Exception($"order {id} not found")
{
    public int Id { get; } = id;
}
public class Resource(string name) : IDisposable
{
    public void Dispose() => Console.WriteLine($"disposed {name}");
}`,
          try: R`غيّر [[Load(7)]] لـ [[Load(3)]]: أنهي catch هيمسك؟ وبعدين غيّر [[throw;]] لـ [[throw ex;]] وخلّي البرنامج يقع، وقارن الـ stack trace في الحالتين (أنهي سطر بيظهر كمصدر للخطأ؟).`,
          flag: "script",
          deep: {
            why: R`الـ API لازم يفرّق بين «المستخدم طلب حاجة مش موجودة» (404) و «الداتابيز وقعت» (500)، والـ exceptions المتنوعة هي الطريقة. والـ resources اللي متقفلتش (connections، file handles) بتخلص من السيرفر بعد ساعات من التشغيل، و [[using]] بيمنع ده.`,
            how: R`كل exception بيورث من [[System.Exception]]. المهمين: [[ArgumentException]] و [[ArgumentNullException]] (parameter غلط)، و [[InvalidOperationException]] (العملية مش مسموحة في الحالة دي)، و [[KeyNotFoundException]]، و [[NullReferenceException]] (bug)، و [[OperationCanceledException]] (إلغاء).

الـ catch بيتفحص بالترتيب، ولو حطيت [[catch (Exception)]] الأول الباقي مستحيل يتوصله (error CS0160). و [[when]] (exception filter) بيتفحص قبل ما الـ stack يتفك، فلو false الـ exception بيكمّل كأن الـ catch مش موجود.

[[throw ex;]] بتبدأ stack trace جديد من السطر ده فتضيع مكان الخطأ الأصلي. [[throw;]] بتحافظ عليه. ولو عايز تلف الـ exception في نوع تاني: [[throw new ShopException("...", ex)]] والأصلي بيبقى في [[InnerException]].

[[using var]] بينادي [[Dispose()]] بترتيب عكسي في آخر الـ scope. وللـ async resources فيه [[IAsyncDisposable]] و [[await using]]. والـ [[finally]] بيتنفذ حتى مع [[return]] جوه الـ try.`,
            when: R`exceptions للحالات الاستثنائية فعلًا. للحالات المتوقعة (validation، «مش لاقي») رجّع قيمة ([[null]] أو [[Result<T>]] أو [[bool TryX]])، لأن الـ exception أبطأ ومبيبانش في توقيع الدالة. وفي ASP.NET Core متعملش try/catch في كل endpoint: فيه exception handler مركزي (المستوى ٢، درس ProblemDetails).`,
            mistakes: R`[[catch (Exception) { }]] فاضي بيبلع كل حاجة. و [[throw ex;]]. و [[catch]] وتعمل log وترمي تاني في كل طبقة فالخطأ يتسجل ٥ مرات. وتنسى [[using]] مع [[HttpResponseMessage]] أو [[FileStream]]. وفي الانترفيو: «الفرق بين [[throw]] و [[throw ex]]؟» و «إمتى finally مبيتنفذش؟» (لو البروسيس اتقتل أو [[Environment.FailFast]]).`
          },
          lines: [
            "بداية الـ try.",
            "بداية.",
            "بترمي exception.",
            "نهاية.",
            R`catch بالنوع + شرط [[when]].`,
            "بداية.",
            R`[[not found: order 7 not found]].`,
            "نهاية.",
            "أي exception تاني.",
            "بداية.",
            "log.",
            R`[[throw;]]: نفس الـ exception بنفس الـ stack trace.`,
            "نهاية.",
            "finally.",
            "بداية.",
            R`[[finally runs always]].`,
            "نهاية.",
            R`[[using]] بـ block: Dispose في آخر البلوك.`,
            "بداية.",
            R`[[using the resource]].`,
            R`نهاية البلوك: [[disposed file]].`,
            R`[[using var]]: Dispose في آخر الـ scope (هنا آخر البرنامج).`,
            R`[[end of program]] ثم [[disposed conn]].`,
            "دالة بترمي.",
            "exception خاص بيورث من Exception ويبعت الرسالة للأب.",
            "بداية.",
            "property إضافية.",
            "نهاية.",
            R`بتطبق [[IDisposable]].`,
            "بداية.",
            R`[[Dispose]]: هنا بتقفل الـ resource.`,
            "نهاية."
          ],
          sol: R`مع [[Load(3)]] الـ [[when (ex.Id > 5)]] بيطلع false، فالـ catch الأول بيتعدّى كأنه مش موجود، والتاني [[catch (Exception)]] بيمسك ويطبع [[unexpected: NotFoundException]] وبعدين [[throw;]] بترميه تاني، والبرنامج يقع بـ [[Unhandled exception. NotFoundException: order 3 not found]]. هتلاحظ إن [[finally runs always]] اتطبعت بعد رسالة الوقوع: الـ runtime بيطبع الـ exception الأول وبعدين بيفك الـ stack وينفذ الـ finally.

الـ stack trace مع [[throw;]] أول سطر فيه [[at Program.<<Main>$>g__Load|0_0(Int32 id) ... line 24]]، يعني الدالة اللي رمت فعلًا. مع [[throw ex;]] أول سطر بقى [[at Program.<Main>$(String[] args) ... line 12]]: سطر الـ [[throw ex]] نفسه، و [[Load]] اختفت من الـ trace. في مشروع حقيقي ده الفرق بين إنك تلاقي الـ bug في دقيقة أو في ساعة.`
        }
      ]
    },
    {
      t: "async و await",
      l: 1,
      n: "Task بدل Promise، و WhenAll، و CancellationToken اللي JS معندوش زيه",
      items: [
        {
          cmd: "Task و async",
          title: "Task و async و await: Promise بتاع C#",
          desc: R`[[Task<T>]] هو [[Promise<T>]]، و [[async]] و [[await]] نفس الكلمات بنفس المعنى. [[Task]] من غير نوع = [[Promise<void>]]. و [[Task.WhenAll]] = [[Promise.all]]، و [[Task.WhenAny]] = [[Promise.race]]، و [[Task.Delay]] = [[setTimeout]] في Promise.

الاسم بالعرف بيخلص بـ [[Async]]: [[GetUserAsync]]. وفي ASP.NET Core كل حاجة فيها I/O (داتابيز، HTTP، ملفات) async.

الفرق الكبير عن JS: .NET عنده threads حقيقية. الـ [[await]] بيرجّع الـ thread للـ pool وهو مستني، والكمالة ممكن تكمل على thread تاني. فالسيرفر بيخدم آلاف الـ requests بعدد threads قليل.`,
          example: R`using System.Diagnostics;
var sw = Stopwatch.StartNew();
var user = await GetUserAsync(1);
var orders = await GetOrdersAsync(1);
Console.WriteLine($"sequential: {sw.ElapsedMilliseconds}ms");
sw.Restart();
var userTask = GetUserAsync(1);
var ordersTask = GetOrdersAsync(1);
await Task.WhenAll(userTask, ordersTask);
Console.WriteLine($"parallel: {sw.ElapsedMilliseconds}ms -> {userTask.Result}, {ordersTask.Result.Length} orders");
static async Task<string> GetUserAsync(int id)
{
    await Task.Delay(300);
    return $"user{id}";
}
static async Task<int[]> GetOrdersAsync(int userId)
{
    await Task.Delay(500);
    return [1, 2, 3];
}`,
          try: R`اعمل 5 tasks بـ [[Task.Delay]] بأوقات مختلفة، واستنى أول واحدة تخلص بـ [[Task.WhenAny]]، واطبع الوقت. وبعدين اعمل دالة [[async Task<int> FailAsync()]] بترمي exception، وناديها من غير [[await]]: البرنامج هيقع؟ وبعدين بـ [[await]].`,
          flag: "script",
          deep: {
            why: R`السيرفر بيقضي أغلب وقته مستني: الداتابيز، و APIs تانية، والملفات. لو الـ thread فضل واقف مستني، هتحتاج thread لكل request والسيرفر هيقع بعد كام مية. الـ async بيخلي الـ thread يروح يخدم request تاني وهو مستني.`,
            how: R`الـ compiler بيحوّل الـ [[async]] method لـ state machine: بتشتغل عادي لحد أول [[await]] على حاجة لسه مخلصتش، فترجع Task للي ناداها، ولما العملية تخلص الكمالة بتتجدول على الـ thread pool.

لو فيه exception جوه الـ async method، مش بيترمي وقت النداء، بيتخزن في الـ Task وبيترمي لما تعمل [[await]]. عشان كده Task منسية من غير await = exception ضايع (زي unhandled rejection في JS، بس .NET مبيقعش البرنامج افتراضيًا).

[[.Result]] و [[.Wait()]] بيوقفوا الـ thread لحد ما الـ Task تخلص (blocking). بعد [[await Task.WhenAll]] استخدام [[.Result]] آمن لأنها خلصت خلاص. قبل كده ممنوع (sync over async، أسئلة الانترفيو).

[[async void]] ممنوعة إلا في event handlers: مفيش Task ترجع، فمحدش يقدر يستناها ولا يمسك الـ exception بتاعها، والـ exception بيوقع البروسيس.

و [[ValueTask<T>]] نسخة أخف لما النتيجة غالبًا جاهزة (cache hit)، وهتشوفها في APIs زي [[IExceptionHandler]].`,
            when: R`أي I/O: async من أول الـ controller لحد الـ DbContext («async all the way»). حسابات CPU بحتة متعملهاش async. ولو عندك كذا عملية مستقلة، ابدأهم الأول وبعدين [[await Task.WhenAll]].`,
            mistakes: R`[[async void]]. و [[.Result]] أو [[.Wait()]] في كود async. وتنسى [[await]] (warning CS4014) فالعملية تشتغل في الخلفية من غير ما حد يستناها. و [[await]] جوه [[foreach]] على ١٠٠ عنصر مستقلين (بطيء، استخدم WhenAll بحدود أو [[Parallel.ForEachAsync]]). و WhenAll على DbContext واحد: الـ DbContext مش thread-safe وبيرمي exception.`
          },
          lines: [
            "للقياس.",
            "ابدأ الساعة.",
            R`استنى الأولى (300ms).`,
            R`وبعدها التانية (500ms).`,
            R`[[sequential: 811ms]] تقريبًا: المجموع.`,
            "صفّر.",
            R`ابدأ الأولى من غير [[await]]: الـ Task شغالة.`,
            "وابدأ التانية معاها.",
            R`استنى الاتنين = [[Promise.all]].`,
            R`[[parallel: 499ms]]: وقت الأطول بس. [[.Result]] آمن هنا لأنهم خلصوا.`,
            R`[[async Task<string>]] = [[async (): Promise<string>]].`,
            "بداية.",
            R`[[Task.Delay]]: انتظار من غير ما يحجز thread.`,
            R`بترجع string والـ compiler بيلفها في Task.`,
            "نهاية.",
            "دالة تانية.",
            "بداية.",
            "انتظار أطول.",
            "array.",
            "نهاية."
          ],
          sol: R`مع [[Task.WhenAny]] الوقت بيبقى قد أقصر delay (مثلًا [[first done after 101ms]] لو أقصرهم 100)، و [[WhenAny]] بيرجع الـ Task اللي خلصت نفسها، فتعمل [[await]] عليها تاني عشان تاخد قيمتها. الباقيين لسه شغالين في الخلفية، ولو عايز توقفهم محتاج CancellationToken (الدرس الجاي).

[[FailAsync()]] من غير [[await]]: البرنامج مش هيقع، والـ exception بيتخزن في الـ Task ومحدش بيشوفه (وفيه warning CS4014). مع [[await FailAsync()]] الـ exception بيترمي في السطر ده بالظبط وتقدر تمسكه بـ try/catch. وده الفرق بين async method والـ sync: الـ exception مش بيحصل وقت النداء، بيحصل وقت الـ await.`,
          solCode: R`using System.Diagnostics;
var sw = Stopwatch.StartNew();
int[] delays = [400, 100, 300, 500, 200];
var tasks = delays.Select(async d => { await Task.Delay(d); return d; }).ToList();
var first = await Task.WhenAny(tasks);
Console.WriteLine($"first done after {sw.ElapsedMilliseconds}ms: delay {await first}");
_ = FailAsync();
Console.WriteLine("still running");
try { await FailAsync(); }
catch (InvalidOperationException ex) { Console.WriteLine($"caught: {ex.Message}"); }
static async Task<int> FailAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("boom");
}`
        },
        {
          cmd: "CancellationToken",
          title: "CancellationToken: توقف شغل async في النص (اللي JS معندوش زيه بسهولة)",
          desc: R`في JS عشان تلغي fetch محتاج [[AbortController]]. في .NET الفكرة دي في كل حتة: [[CancellationToken]] بيتبعت لأي method async كآخر parameter، ولما حد يلغي، العملية بتقف بـ [[OperationCanceledException]].

في ASP.NET Core كل request ليه token جاهز: لو المستخدم قفل الصفحة أو الـ client عمل timeout، الـ token بيتلغي. لو بعته لـ EF Core و HttpClient، الـ query التقيلة بتتلغي بدل ما تكمل على الفاضي.

و [[CancellationTokenSource]] هو اللي بيعمل الـ token ويلغيه، ممكن بعد وقت معين: [[new CancellationTokenSource(TimeSpan.FromSeconds(5))]] = timeout.`,
          example: R`using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(250));
try
{
    await SlowReportAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("cancelled after 250ms");
}
static async Task SlowReportAsync(CancellationToken ct)
{
    for (var i = 1; i <= 10; i++)
    {
        ct.ThrowIfCancellationRequested();
        Console.WriteLine($"step {i}");
        await Task.Delay(100, ct);
    }
}`,
          try: R`خلي [[SlowReportAsync]] ترجع عدد الخطوات اللي خلصت، واعمل الإلغاء يدوي بـ [[cts.CancelAfter(350)]] بدل الـ constructor. وبعدين اعمل token تاني بيتلغي لما تدوس Ctrl+C ([[Console.CancelKeyPress]]) واربطه بالأول بـ [[CancellationTokenSource.CreateLinkedTokenSource]].`,
          flag: "script",
          deep: {
            why: R`من غير إلغاء، كل request المستخدم قفله بيفضل شغال لحد الآخر: query تقيلة، أو API بطيء، أو report. تحت الضغط ده بيضاعف الحمل على الداتابيز وقت ما هي أصلًا تعبانة. الـ token بيخلي الشغل يقف أول ما محدش محتاجه.`,
            how: R`الإلغاء تعاوني: الـ token مجرد علم. الكود لازم يفحصه ([[ThrowIfCancellationRequested]] أو [[IsCancellationRequested]]) أو يبعته لـ API بيفحصه ([[Task.Delay]] و [[ToListAsync]] و [[HttpClient.GetAsync]]). لو method مبتبعتش الـ token لحد، الإلغاء مش هيوصل.

[[OperationCanceledException]] (وابنه [[TaskCanceledException]]) هو الطريقة القياسية لإعلان الإلغاء. في ASP.NET Core لو الـ request اتلغى والـ exception طلع، الـ framework بيفهم إنه إلغاء ومش بيعامله كـ 500.

في minimal APIs أي parameter نوعه [[CancellationToken]] بياخد [[HttpContext.RequestAborted]] أوتوماتيك، ونفس الكلام في الـ controllers. و [[CreateLinkedTokenSource(a, b)]] بيعمل token بيتلغي لو أي واحد من الاتنين اتلغى (مثلًا request token + timeout خاص بيك).

[[CancellationTokenSource]] نفسه [[IDisposable]] عشان فيه timer لما تستخدم timeout.`,
            when: R`دايمًا خد [[CancellationToken ct = default]] كآخر parameter في أي method async عامة، وابعته لتحت. و timeout بـ [[CancelAfter]] على أي نداء لسيستم برّه. والـ background services بياخدوا [[stoppingToken]] بيتلغي لما التطبيق يقفل (المستوى ٣).`,
            mistakes: R`تاخد الـ token ومتبعتهوش لـ [[ToListAsync(ct)]]. وتمسك [[Exception]] عام فتبلع الإلغاء وتسجله كـ error. وتلغي في النص عملية كتابة مش atomic (نص الداتا اتحفظ): الإلغاء قبل الكتابة، أو الكتابة في transaction. وتستخدم [[CancellationToken.None]] في كل حتة عشان «أسهل».`
          },
          lines: [
            R`source بيلغي نفسه بعد 250ms، و [[using]] عشان يقفل الـ timer.`,
            "try.",
            "بداية.",
            R`ابعت الـ [[Token]] للـ method.`,
            "نهاية.",
            "الإلغاء بيطلع كـ exception.",
            "بداية.",
            R`[[cancelled after 250ms]].`,
            "نهاية.",
            R`الـ token آخر parameter بالعرف.`,
            "بداية.",
            "10 خطوات.",
            "بداية.",
            "افحص قبل كل خطوة.",
            R`[[step 1]] و [[step 2]] و [[step 3]] بس.`,
            R`وابعته كمان لـ [[Delay]] فيتلغي في نص الانتظار.`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`مع [[CancelAfter(350)]] الناتج [[step 1]] لحد [[step 4]] وبعدين الإلغاء، وعدد الخطوات اللي خلصت ٣ (الرابعة بدأت واتلغت في نص الـ [[Delay]]). عشان ترجع العدد لازم تمسك الـ exception جوه الـ method أو تخزّن العداد برّه، لأن الـ exception بيقطع الـ return.

مع الـ linked token: [[using var linked = CancellationTokenSource.CreateLinkedTokenSource(cts.Token, ctrlC.Token);]] وابعت [[linked.Token]]. لو دست Ctrl+C قبل الـ timeout هيتلغي فورًا، وفي [[CancelKeyPress]] لازم [[e.Cancel = true]] عشان البرنامج ميتقفلش قبل ما تطبع. ده بالظبط اللي بتعمله في API: token الـ request مربوط بـ timeout بتاعك.`,
          solCode: R`using var cts = new CancellationTokenSource();
cts.CancelAfter(350);
using var ctrlC = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) => { e.Cancel = true; ctrlC.Cancel(); };
using var linked = CancellationTokenSource.CreateLinkedTokenSource(cts.Token, ctrlC.Token);
var done = 0;
try
{
    for (var i = 1; i <= 10; i++)
    {
        linked.Token.ThrowIfCancellationRequested();
        Console.WriteLine($"step {i}");
        await Task.Delay(100, linked.Token);
        done++;
    }
}
catch (OperationCanceledException)
{
    Console.WriteLine($"cancelled, finished {done} steps");
}`
        }
      ]
    },
    {
      t: "أول Web API",
      l: 2,
      n: "Program.cs و minimal APIs و routing و model binding، وإمتى controllers",
      items: [
        {
          cmd: "dotnet new webapi",
          title: "تفهم Program.cs: الـ builder والـ services والـ pipeline",
          desc: R`[[dotnet new webapi -o Shop.Api]] بيعمل API شغال. كل حاجة في [[Program.cs]] وبتمشي على ٣ مراحل: (١) [[WebApplication.CreateBuilder(args)]] بيجهز الإعدادات واللوج. (٢) [[builder.Services.AddXxx()]] بتسجّل الـ services في الـ DI container. (٣) [[builder.Build()]] وبعدها [[app.UseXxx()]] (الـ middleware بالترتيب) و [[app.MapXxx()]] (الـ endpoints)، وآخر حاجة [[app.Run()]].

لو جاي من Express: [[app.MapGet("/x", handler)]] = [[app.get("/x", handler)]]، و [[app.Use...]] = [[app.use(...)]]. الفرق إن الـ services بتتسجل الأول، والـ handler بياخد اللي محتاجه كـ parameters بدل [[req]] و [[res]].

من .NET 9 القالب بيعمل OpenAPI document على [[/openapi/v1.json]] في Development بس، من غير Swagger UI. لو عايز UI ضيف Scalar أو Swagger UI (شوف «تاب APIs متقدمة»: درس OpenAPI).`,
          example: R`var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapGet("/health", () => TypedResults.Ok(new { status = "ok" }));
app.MapGet("/hello/{name}", (string name) => $"Hello {name}");
app.Run();`,
          try: R`اعمل المشروع بـ [[dotnet new webapi -o Shop.Api --no-https]] وشغّله بـ [[dotnet watch]]. اعرف البورت من الـ log ([[Now listening on]]) أو من [[Properties/launchSettings.json]]. جرّب [[curl localhost:PORT/weatherforecast]] و [[/openapi/v1.json]]. وبعدين شغّله بـ [[ASPNETCORE_ENVIRONMENT=Production dotnet run]] وجرّب الـ openapi تاني.`,
          flag: "script",
          deep: {
            why: R`كل مشروع ASP.NET Core هتفتحه في شغلك هيبدأ بـ Program.cs. لو فهمت المراحل التلاتة، هتعرف فين تضيف داتابيز (services)، وفين تضيف auth (services + middleware)، وفين تضيف endpoint (Map). وأغلب مشاكل المبتدئين بتيجي من ترتيب غلط بينهم.`,
            how: R`[[CreateBuilder]] بيقرا الـ configuration من [[appsettings.json]] ثم [[appsettings.{Environment}.json]] ثم user secrets (في Development) ثم env vars ثم command line، وبيجهز logging للـ console، وبيحدد الـ environment من [[ASPNETCORE_ENVIRONMENT]] (الافتراضي Production).

[[builder.Services]] هو [[IServiceCollection]]: قايمة تسجيلات. [[Build()]] بيقفلها ويعمل الـ [[IServiceProvider]]، وبعدها مينفعش تضيف services.

[[app]] هو [[WebApplication]]: بيشغّل Kestrel (السيرفر المدمج، مكتوب بـ C# وسريع جدًا). الـ endpoints بتتسجل كـ routes، والـ routing middleware بيختار الـ endpoint المناسب لكل request.

الـ handler ممكن يرجع أي حاجة: string بتطلع [[text/plain]]، و object بيطلع JSON ([[System.Text.Json]] بـ camelCase افتراضيًا)، و [[IResult]] ([[TypedResults.Ok]] و [[NotFound]] إلخ) لو عايز تتحكم في الـ status. و [[launchSettings.json]] بيستخدمه [[dotnet run]] بس: فيه البورت والـ environment للتطوير، ومش بيتنشر.`,
            when: R`minimal APIs هي الافتراضي من .NET 6 ومناسبة لأغلب الـ APIs الجديدة. لما الملف يكبر قسّمه بـ extension methods و [[MapGroup]] (الدرس الجاي)، مش تحط ٥٠٠ endpoint في Program.cs.`,
            mistakes: R`تضيف service بعد [[Build()]]: [[InvalidOperationException: The service collection cannot be modified because it is read-only]]. وتستنى الـ OpenAPI يشتغل في Production. وتفتكر إن [[launchSettings.json]] بيأثر على السيرفر: في الإنتاج البورت بيتحدد بـ [[ASPNETCORE_URLS]] أو [[ASPNETCORE_HTTP_PORTS]] (الافتراضي 8080 في Docker و 5000 من غيره).`
          },
          lines: [
            "مرحلة ١: الإعدادات واللوج والـ environment.",
            "مرحلة ٢: تسجيل services. OpenAPI document.",
            R`أخطاء بشكل [[application/problem+json]] (category الجاية).`,
            "مرحلة ٣: بناء التطبيق. بعدها الـ services اتقفلت.",
            R`[[Development]] من [[launchSettings.json]] أو [[ASPNETCORE_ENVIRONMENT]].`,
            "بداية.",
            R`[[/openapi/v1.json]] في التطوير بس.`,
            "نهاية.",
            R`endpoint بيرجع JSON [[{"status":"ok"}]] بـ 200.`,
            R`route parameter: [[{name}]] بيتربط بـ [[string name]] بالاسم.`,
            "شغّل Kestrel واستنى الـ requests."
          ],
          sol: R`الـ log بيقول [[Now listening on: http://localhost:5281]] (البورت بيتختار عشوائي وقت إنشاء المشروع ومتخزن في [[launchSettings.json]]، فعندك هيبقى رقم تاني). [[/weatherforecast]] بيرجع array فيها ٥ أيام، و [[/openapi/v1.json]] بيرجع document فيه [["openapi": "3.1.1"]] ومسار [[/weatherforecast]].

مع [[ASPNETCORE_ENVIRONMENT=Production dotnet run]]: [[dotnet run]] لسه بيقرا الـ launchSettings، والـ profile فيه [[Development]]، فممكن تلاقي البيئة لسه Development! عشان تجرب Production صح: [[dotnet run --no-launch-profile]] مع الـ env var، والبورت هيبقى 5000. ساعتها [[/openapi/v1.json]] بيرجع 404 لأن [[MapOpenApi]] جوه الـ if.`
        },
        {
          cmd: "MapGet و MapGroup",
          title: "routing و model binding: الـ parameters بتيجي منين؟",
          desc: R`في minimal APIs الـ handler بياخد parameters، و ASP.NET Core بيعرف يجيبها منين: اسم في الـ route ([[{id:int}]]) = route value، ونوع بسيط مش في الـ route = query string ([[?q=pen&page=2]])، و object معقد = JSON body، ونوع متسجل في الـ DI ([[ShopDb]] مثلًا) = service، و [[CancellationToken]] = إلغاء الـ request.

و [[MapGroup("/api/products")]] بيجمع endpoints تحت prefix واحد وتقدر تحط عليهم إعدادات مشتركة (auth، tags). وبتحطهم في extension method في ملف لوحده.

و [[TypedResults]] + [[Results<Ok<T>, NotFound>]] كنوع رجوع بيخلي الـ status codes الممكنة جزء من الـ signature، فالـ OpenAPI بيطلع صح والـ compiler بيمنعك ترجع حاجة مش مكتوبة.`,
          example: R`public static class ProductEndpoints
{
    public static RouteGroupBuilder MapProducts(this IEndpointRouteBuilder app)
    {
        var g = app.MapGroup("/api/products").WithTags("Products");
        g.MapGet("/", async (ShopDb db, string? q, int page = 1, int size = 20) =>
            await db.Products.AsNoTracking()
                .Where(p => q == null || p.Name.Contains(q))
                .OrderBy(p => p.Id)
                .Skip((page - 1) * size).Take(size)
                .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
                .ToListAsync());
        g.MapGet("/{id:int}", async Task<Results<Ok<ProductDto>, NotFound>> (int id, ShopDb db) =>
        {
            var p = await db.Products.AsNoTracking()
                .Where(p => p.Id == id)
                .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
                .FirstOrDefaultAsync();
            return p is null ? TypedResults.NotFound() : TypedResults.Ok(p);
        });
        return g;
    }
}
public record ProductDto(int Id, string Name, decimal Price, string Category);`,
          try: R`بعد ما تعمل الداتابيز (category الـ EF Core) أو حتى بـ list في الذاكرة: جرّب [[curl "localhost:PORT/api/products?q=pen"]]، و [[/api/products/99]]، و [[/api/products/abc]]. ليه الأخير 404 مش 400؟ وضيف endpoint [[GET /api/products/by-sku/{sku}]] بـ route constraint من نوع regex بيقبل ٣ حروف أو أرقام وشرطة و٤ أرقام بس (زي [[PEN-0001]]).`,
          flag: "script",
          deep: {
            why: R`في Express بتكتب [[Number(req.params.id)]] و [[req.query.page ?? 1]] وتفحص بإيدك. هنا الـ binding بيحوّل الأنواع ويطلّع 400 لو القيمة مش صالحة، والـ handler بيبقى دالة عادية بأنواع واضحة تقدر تختبرها. وكل endpoint بتعلن اللي محتاجاه، مش بتدوّر عليه في [[req]].`,
            how: R`قواعد الـ binding (من غير attributes): اسم موجود في الـ route template = route. نوع بسيط (int و string و Guid و DateTime و enum، وأي نوع فيه [[TryParse]]) = query. نوع متسجل في DI = service. [[HttpContext]] و [[CancellationToken]] و [[ClaimsPrincipal]] خاصين. أي نوع معقد تاني = body من JSON (واحد بس لكل endpoint). وتقدر تحدد صراحة بـ [[[FromQuery]]] و [[[FromRoute]]] و [[[FromBody]]] و [[[FromHeader]]] و [[[FromServices]]] و [[[AsParameters]]] (يجمّع كذا parameter في record).

الـ route constraints زي [[{id:int}]] و [[{slug:alpha}]] و [[{id:guid}]] و [[{n:min(1)}]] بتأثر على الـ matching: لو القيمة مطابقتش الـ route مش بيتختار أصلًا فيطلع 404، مش 400. الـ constraints للتفرقة بين routes، مش للـ validation.

parameter nullable ([[string? q]]) أو ليه default ([[int page = 1]]) اختياري. غير كده إجباري ولو مش موجود = 400. و [[TypedResults.Ok(x)]] بيرجع [[Ok<T>]] نوع حقيقي، و [[Results<A, B>]] union type للـ OpenAPI.`,
            when: R`[[MapGroup]] + extension method لكل resource ([[MapProducts]] و [[MapOrders]]) من أول يوم. [[TypedResults]] بدل [[Results]] عشان الأنواع. ولما الـ handler يطول، طلّعه method static أو حطّ المنطق في service.`,
            mistakes: R`تعتمد على [[{id:int}]] كـ validation وتستغرب الـ 404. وتحط كذا parameter معقد وتستنى الاتنين من الـ body. وترجع الـ entity نفسها (بالـ navigation properties) بدل DTO فيطلع JSON ضخم أو circular reference exception. وتنسى [[AsNoTracking]] في القراية (category الـ EF Core).`
          },
          lines: [
            R`[[static class]] للـ extension method.`,
            "بداية.",
            R`extension على [[IEndpointRouteBuilder]] (الـ [[app]])، فتتنادى [[app.MapProducts()]].`,
            "بداية.",
            R`group: كل الـ routes تحته بتبدأ بـ [[/api/products]]، و [[WithTags]] للـ OpenAPI.`,
            R`[[ShopDb]] من DI، و [[q]] و [[page]] و [[size]] من الـ query، والاختياري nullable أو ليه default.`,
            R`[[AsNoTracking]]: قراية بس.`,
            R`فلتر اختياري: لو [[q]] null الشرط بيتشال.`,
            "ترتيب ثابت (لازم قبل Skip).",
            "pagination.",
            "projection لـ DTO: بيجيب الأعمدة المطلوبة بس.",
            "تنفيذ الـ query.",
            R`[[{id:int}]] constraint، ونوع الرجوع بيعلن الحالتين.`,
            "بداية.",
            "query.",
            "بالـ id.",
            "نفس الـ projection.",
            R`[[null]] لو مش موجود.`,
            R`404 أو 200 بـ JSON. الـ compiler مش هيسمح بحالة تالتة.`,
            "نهاية.",
            "رجّع الـ group عشان اللي بينادي يضيف عليه إعدادات.",
            "نهاية.",
            "نهاية.",
            "DTO: شكل الرد، مستقل عن شكل الجدول."
          ],
          sol: R`[[?q=pen]] بيرجع [[[{"id":1,"name":"Blue pen","price":5.50,"category":"Pens"},{"id":2,"name":"Red pen","price":6.00,"category":"Pens"}]]]. و [[/api/products/99]] بيرجع 404 بـ [[application/problem+json]] (لأن [[AddProblemDetails]] متسجلة). و [[/api/products/abc]] برضه 404: [[abc]] مش int فالـ route [[{id:int}]] مطابقش أصلًا، ومفيش route تاني يطابق. لو شلت [[:int]] هيبقى 400 لأن الـ binding فشل يحوّل abc لـ int.

الـ sku: [[g.MapGet("/by-sku/{sku:regex(^\\w{{3}}-\\d{{4}}$)}", (string sku) => ...)]]. جرّبناها: [[PEN-0001]] بيرجع 200 و [[AB-12]] بيرجع 404. خد بالك من حاجتين: الـ [[{]] و [[}]] جوه الـ regex لازم يتكتبوا مضاعفين [[{{3}}]] لأن الـ route template بيستخدمهم، والـ backslash مضاعف في الـ C# string. ولأن الـ constraint مش validation، الـ sku الغلط بيرجع 404 مش 400. لو عايز رسالة واضحة: [[{sku}]] من غير constraint وافحص الشكل جوه الـ handler وارجع [[TypedResults.ValidationProblem]].`
        },
        {
          cmd: "controllers",
          title: "Controllers و [ApiController]: الطريقة التانية وإمتى تختارها",
          desc: R`قبل minimal APIs كل الـ APIs كانت controllers: class بتورث [[ControllerBase]]، وكل action method عليها [[[HttpGet]]] أو [[[HttpPost]]]، والـ route بـ [[[Route("api/[controller]")]]]. لسه موجودة ومدعومة بالكامل، وأغلب المشاريع القديمة في الشركات بيها.

[[[ApiController]]] بيفعّل حاجات مهمة: body binding تلقائي، و 400 تلقائي لو الـ validation فشل، و ProblemDetails للأخطاء. والـ dependencies بتيجي في الـ constructor (primary constructor أسهل).

ترجع [[ActionResult<T>]]: يا الـ object نفسه (200) يا [[NotFound()]] أو [[CreatedAtAction(...)]]. ولازم [[builder.Services.AddControllers()]] و [[app.MapControllers()]].`,
          example: R`[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController(IOrderService orders, ILogger<OrdersController> logger) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderSummary>> Get(int id, CancellationToken ct)
    {
        var order = await orders.GetAsync(id, ct);
        return order is null ? NotFound() : order;
    }
    [HttpPost]
    public async Task<ActionResult<OrderSummary>> Place(PlaceOrder body, CancellationToken ct)
    {
        var summary = await orders.PlaceAsync(body, ct);
        logger.LogInformation("Order {OrderId} placed by {Email}", summary.Id, body.CustomerEmail);
        return CreatedAtAction(nameof(Get), new { id = summary.Id }, summary);
    }
}`,
          try: R`ضيف action [[[HttpDelete("{id:int}")]]] بترجع [[204 NoContent]] لو اتمسح و 404 لو مش موجود. وبعدين اعمل نفس الـ endpoint بـ minimal API في [[MapGroup]] وقارن عدد السطور والـ OpenAPI اللي طلع للاتنين.`,
          flag: "script",
          deep: {
            why: R`هتشتغل على الاتنين: مشاريع قديمة كلها controllers، وجديدة كلها minimal. وأسئلة الانترفيو بتسأل «الفرق إيه وتختار إيه؟». والفرق مش في القدرة: الاتنين بيعملوا نفس الحاجة وبيشاركوا نفس الـ middleware والـ DI والـ auth.`,
            how: R`[[AddControllers()]] بيسجّل الـ MVC services، و [[MapControllers()]] بيدوّر على كل class بتورث [[ControllerBase]] (أو اسمها بيخلص بـ Controller وعليها [[[ApiController]]]) ويعمل routes من الـ attributes. [[[controller]]] في الـ route بيتبدل باسم الـ class من غير Controller ([[api/Orders]]).

الـ controller بيتعمل جديد مع كل request (scoped عمليًا)، فالـ dependencies في الـ constructor بتتحقن كل مرة. و [[ActionResult<T>]] بيسمحلك ترجع [[T]] مباشرة (implicit conversion) أو أي [[ActionResult]].

[[[ApiController]]] بيعمل model validation filter: قبل ما الـ action تشتغل، لو [[ModelState]] مش valid بيرجع 400 [[ValidationProblemDetails]] على طول. وفيه filters (زي middleware بس على مستوى MVC) للـ auth والـ exceptions والـ caching.

[[CreatedAtAction(nameof(Get), new { id }, body)]] بيرجع 201 وبيحط [[Location]] header بالـ URL الصح للـ Get action.`,
            when: R`minimal APIs للمشاريع الجديدة والـ microservices، وهي أسرع شوية وأقرب لـ Express. controllers لو الفريق متعود عليها، أو المشروع كبير ومحتاج conventions و filters كتير، أو بتكمّل مشروع قايم. متخلطش الاتنين في نفس الـ resource.`,
            mistakes: R`تنسى [[AddControllers()]] أو [[MapControllers()]] فالـ routes ترجع 404 من غير أي error. وتنسى [[[ApiController]]] فالـ validation متشتغلش والـ body يتربط من الـ form. وتحط business logic كتير جوه الـ controller: الـ controller يستقبل ويرد، والمنطق في service.`
          },
          lines: [
            R`بيفعّل الـ binding والـ validation التلقائي و ProblemDetails.`,
            R`[[api/Orders]]: اسم الـ class من غير Controller.`,
            "كل الـ actions محتاجة user مسجل دخول (category الـ Auth).",
            R`primary constructor: الـ service واللوجر من الـ DI.`,
            "بداية.",
            R`[[GET api/Orders/5]].`,
            R`[[ActionResult<T>]]: يا T يا result تاني.`,
            "بداية.",
            R`الـ token بتاع الـ request اتبعت للـ service.`,
            R`[[NotFound()]] = 404، و [[order]] لوحده = 200 بـ JSON.`,
            "نهاية.",
            R`[[POST api/Orders]]، والـ body JSON بيتربط بـ [[PlaceOrder]].`,
            "action تانية.",
            "بداية.",
            "المنطق في الـ service.",
            R`structured logging: [[{OrderId}]] و [[{Email}]] حقول، مش string interpolation.`,
            R`201 + [[Location: .../api/Orders/1]].`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`الـ action: [[[HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id, CancellationToken ct) => await orders.DeleteAsync(id, ct) ? NoContent() : NotFound();]] (مع [[DeleteAsync]] بترجع bool في الـ service). [[curl -X DELETE]] بيرجع [[204]] من غير body أول مرة، وتاني مرة [[404]] بـ problem+json.

نسخة الـ minimal: [[g.MapDelete("/{id:int}", async Task<Results<NoContent, NotFound>> (int id, IOrderService orders, CancellationToken ct) => await orders.DeleteAsync(id, ct) ? TypedResults.NoContent() : TypedResults.NotFound());]] سطر واحد تقريبًا. في الـ OpenAPI الاتنين بيطلعوا بـ 204 و 404، بس الـ controller محتاج [[[ProducesResponseType(204)]]] و [[[ProducesResponseType(404)]]] عشان يظهروا صح، والـ minimal بياخدهم من نوع الرجوع [[Results<...>]] لوحده.`
        }
      ]
    },
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

المنتج مرتين: التانية بترجع 500 [["title":"An error occurred while processing your request."]] لأن [[IX_Products_Name]] unique والداتابيز رفضت ([[DbUpdateException]] جواها [[PostgresException 23505]]). ده مكانه الدرس الجاي: تحوّله لـ 409 Conflict.`
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
            how: R`[[UseExceptionHandler()]] middleware بيلف الـ pipeline كله في try/catch. لما exception يحصل، بيمسح الـ response، ويجرب الـ [[IExceptionHandler]]s بالترتيب: أول واحد يرجع true خلاص. لو محدش مسكه، [[IProblemDetailsService]] بيكتب 500 عام. وكل ده بيتسجل في اللوج بالـ exception الكامل.

[[UseStatusCodePages()]] بيملى الـ responses الفاضية اللي status بتاعها 400-599 (زي 404 من الـ routing و 401 من الـ auth) بـ ProblemDetails. و [[TypedResults.NotFound()]] من غير body بيتملى برضه.

في Development لو مفيش [[UseExceptionHandler]]، الـ Developer Exception Page بيشتغل تلقائي وبيطلع الـ stack trace، مفيد وانت بتطور بس لازم ميبقاش في Production.

تقدر تعدّل كل الـ ProblemDetails من مكان واحد: [[AddProblemDetails(o => o.CustomizeProblemDetails = ctx => ctx.ProblemDetails.Extensions["requestId"] = ...)]]. والـ [[traceId]] بيربط الرد باللوج: المستخدم يبعتلك الـ id وانت تدوّر بيه.`,
            when: R`دايمًا في أي API. exceptions مخصصة لحالات الـ domain المعروفة ([[NotFoundException]] و [[ConflictException]] و [[OutOfStockException]]) مع handler واحد يحوّلها، أو [[Result<T>]] وترجع الـ status من الـ endpoint، الاتنين مقبولين وتمسك في واحد. قارن بـ «استراتيجية الأخطاء» في «تاب Backend بـ Node» و [[problem+json]] في «تاب APIs متقدمة».`,
            mistakes: R`try/catch في كل endpoint بيرجع [[BadRequest(ex.Message)]] (بيسرّب تفاصيل داخلية، وبيخلي كل خطأ 400). وترجع 200 وجواه [[{ success: false }]]. وتنسى إن الـ middleware اللي قبل [[UseExceptionHandler]] مش محمي، فحطه أول واحد. ونسيت [[return false]] للأنواع اللي مش بتاعتك فالـ handler يبلع كل حاجة.`
          },
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
    },
    {
      t: "DI و middleware و الإعدادات",
      l: 2,
      n: "Singleton و Scoped و Transient، وترتيب الـ pipeline، و appsettings و IOptions، و ILogger",
      items: [
        {
          cmd: "DI و lifetimes",
          title: "Dependency Injection: Singleton و Scoped و Transient الفرق بينهم إيه؟",
          desc: R`في ASP.NET Core مبتعملش [[new OrderService(new ShopDb(...))]] بإيدك. بتسجّل الـ service مرة ([[builder.Services.AddScoped<IOrderService, OrderService>()]])، وأي حد محتاجه يطلبه في الـ constructor أو كـ parameter، والـ container بيعمله ويحقن الـ dependencies بتاعته.

الـ lifetime بيحدد كام نسخة: [[Singleton]] نسخة واحدة لكل التطبيق طول عمره. [[Scoped]] نسخة لكل request (كل اللي بيطلبوه في نفس الـ request بياخدوا نفس النسخة). [[Transient]] نسخة جديدة كل ما حد يطلب.

الـ [[DbContext]] Scoped (مع [[AddDbContext]])، والـ caches والـ clients اللي بيتشاركوا Singleton، والحاجات الخفيفة من غير state Transient أو Scoped.`,
          example: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<SingletonId>();
builder.Services.AddScoped<ScopedId>();
builder.Services.AddTransient<TransientId>();
var app = builder.Build();
app.MapGet("/ids", (SingletonId s, ScopedId sc1, ScopedId sc2, TransientId t1, TransientId t2) =>
    new { singleton = s.Id, scoped1 = sc1.Id, scoped2 = sc2.Id, transient1 = t1.Id, transient2 = t2.Id });
app.Run();
public class SingletonId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class ScopedId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class TransientId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }`,
          try: R`شغّل الملف ده بـ [[dotnet run di.cs]] واعمل [[curl localhost:5000/ids]] مرتين. مين اتغير ومين ثابت؟ وبعدين اعمل class [[PriceCache]] singleton بتاخد [[ScopedId]] في الـ constructor، وشغّل مرة بـ [[ASPNETCORE_ENVIRONMENT=Development]] ومرة Production.`,
          flag: "script",
          deep: {
            why: R`الـ DI بيفصل «مين محتاج إيه» عن «مين بيعمل إيه»: الـ OrderService محتاج [[IPaymentGateway]] ومش مهم له Stripe ولا Paymob ولا fake في الاختبار. والـ lifetime الغلط بيعمل bugs من أصعب ما يكون: داتا user بتتسرب لـ user تاني، أو DbContext بيتستخدم من threads كتير.`,
            how: R`الـ container بيبني شجرة: لما حد يطلب [[OrderService]]، بيبص على الـ constructor، ويحل كل parameter بنفس الطريقة، لحد الآخر. لو نوع مش متسجل: [[InvalidOperationException: Unable to resolve service for type ...]].

كل request ليه scope: الـ Scoped services بتتعمل أول مرة حد يطلبها في الـ request ده، وبتتعمل [[Dispose]] لما الـ request يخلص. الـ Singleton بيتعمل مرة ويعيش لحد ما التطبيق يقفل، فلازم يبقى thread-safe لأن كل الـ requests بتستخدمه مع بعض.

القاعدة الذهبية: service متعيشش أطول من الـ dependencies بتاعتها. Singleton بياخد Scoped = الـ Scoped اتمسك جوه الـ Singleton للأبد (captive dependency): نفس الـ DbContext لكل الـ requests. في Development الـ container بيفحص ده ([[ValidateScopes]]) وبيرمي exception وقت الـ startup. في Production الفحص مقفول افتراضيًا (عشان الأداء) فالـ bug بيعدّي بهدوء.

لو Singleton محتاج Scoped فعلًا (زي BackgroundService محتاج DbContext): خد [[IServiceScopeFactory]] واعمل scope بإيدك (المستوى ٣). وفيه كمان keyed services ([[AddKeyedSingleton<IPayment, Stripe>("stripe")]] و [[[FromKeyedServices("stripe")]]]) لو عندك كذا implementation لنفس الـ interface.`,
            when: R`Scoped افتراضي لأي service بتتعامل مع الداتابيز أو بيانات الـ request. Singleton لحاجات مكلفة في الإنشاء و thread-safe (cache، HttpClient factory، configuration، [[TimeProvider]]). Transient لخدمات خفيفة من غير state. ولو مش متأكد: Scoped.`,
            mistakes: R`Singleton بياخد DbContext (captive). و Singleton فيه state متغير من غير lock. و [[new]] لـ service متسجل فالـ dependencies متتحقنش. و [[app.Services.GetService<ShopDb>()]] برّه scope: [[Cannot resolve scoped service from root provider]]. وفي الانترفيو ده سؤال ثابت (آخر category، درس captive dependency).`
          },
          lines: [
            "builder.",
            "نسخة واحدة للتطبيق كله.",
            "نسخة لكل request.",
            "نسخة لكل طلب.",
            "build.",
            R`بنطلب الـ scoped مرتين والـ transient مرتين في نفس الـ request.`,
            "JSON بالـ IDs.",
            "run.",
            R`كل class بتاخد ID عشوائي (أول ٤ حروف من Guid) وقت إنشائها.`,
            "نفس الفكرة.",
            "نفس الفكرة."
          ],
          sol: R`أول request: [[{"singleton":"c7b8","scoped1":"3258","scoped2":"3258","transient1":"0a98","transient2":"7824"}]]. التاني: [[{"singleton":"c7b8","scoped1":"d18d","scoped2":"d18d","transient1":"850c","transient2":"bc6b"}]]. الـ singleton ثابت في الاتنين، والـ scoped واحد جوه الـ request الواحد ومتغير بين الـ requests، والـ transient مختلف حتى جوه نفس الـ request.

مع [[PriceCache(ScopedId id)]] singleton: في Development التطبيق بيقع وقت [[Build()]] بـ [[Cannot consume scoped service 'ScopedId' from singleton 'PriceCache'.]]. في Production بيشتغل عادي من غير أي تحذير، والـ [[ScopedId]] اللي جوه الـ cache هيفضل نفسه للأبد. ده ليه لازم تشغّل التطبيق في Development قبل ما ترفع، أو تفعّل [[ValidateScopes]] و [[ValidateOnBuild]] في كل البيئات.`,
          solCode: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<ScopedId>();
builder.Services.AddSingleton<PriceCache>();
builder.Host.UseDefaultServiceProvider(o => { o.ValidateScopes = true; o.ValidateOnBuild = true; });
var app = builder.Build();
app.MapGet("/", (PriceCache c) => c.Describe());
app.Run();
public class ScopedId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class PriceCache(ScopedId id) { public string Describe() => $"captured {id.Id}"; }`
        },
        {
          cmd: "middleware pipeline",
          title: "الـ middleware pipeline: الترتيب هو كل حاجة",
          desc: R`كل request بيعدي على سلسلة middleware بالترتيب اللي كتبته بـ [[app.Use...]]، وكل واحد بيعمل حاجة قبل ما ينادي [[next]] وحاجة بعده، والرد بيرجع بالترتيب العكسي. زي Express بالظبط، والفرق إن الـ middleware async وبياخد [[HttpContext]].

الترتيب المعتاد: [[UseExceptionHandler]] (أول واحد عشان يمسك كل حاجة)، [[UseForwardedHeaders]] (لو ورا Nginx)، [[UseHttpsRedirection]]، [[UseStaticFiles]]، [[UseCors]]، [[UseAuthentication]]، [[UseAuthorization]]، وبعدين الـ endpoints. الـ routing بيحصل لوحده قبل الـ middleware اللي محتاجاه.

تقدر تكتب middleware inline بـ [[app.Use(async (ctx, next) => { ... })]] أو class فيها [[InvokeAsync(HttpContext ctx)]].`,
          example: R`app.UseExceptionHandler();
app.UseStatusCodePages();
app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    ctx.Response.Headers["X-Request-Id"] = ctx.TraceIdentifier;
    await next(ctx);
    app.Logger.LogInformation("{Method} {Path} -> {Status} in {Ms}ms",
        ctx.Request.Method, ctx.Request.Path, ctx.Response.StatusCode, sw.ElapsedMilliseconds);
});
app.UseAuthentication();
app.UseAuthorization();
app.MapProducts();
app.MapControllers();`,
          try: R`ضيف middlewareين A و B كل واحد بيطبع «before» و «after» حوالين [[next]] وشوف الترتيب. وبعدين خلّي endpoint ترمي exception: هل سطر اللوج بتاع الـ timing اتطبع؟ صلّحه بـ try/finally. وأخيرًا انقل [[UseAuthorization]] قبل [[UseAuthentication]] وجرّب endpoint محمية بتوكن سليم.`,
          flag: "script",
          deep: {
            why: R`نص مشاكل ASP.NET Core اللي بتلاقيها على Stack Overflow سببها ترتيب: الـ CORS مش شغال، والـ auth بيرجع 401 لتوكن سليم، والـ exception handler مش ماسك، والـ HTTPS redirect بيعمل loop ورا Nginx. لو فهمت إن الـ pipeline سلسلة بتتنفذ بالترتيب، هتحل كل ده في دقيقة.`,
            how: R`[[app.Use]] بيضيف delegate بياخد [[(HttpContext, RequestDelegate next)]]. لو منادتش [[next]] الـ pipeline بيقف عندك (short-circuit)، وده اللي بيعمله static files لما يلاقي الملف، والـ auth لما يرجع 401.

بعد ما [[next]] يرجع، الـ response ممكن يكون ابتدى يتبعت، فمتقدرش تغيّر headers ساعتها (استخدم [[ctx.Response.OnStarting]]). و [[ctx.TraceIdentifier]] ID فريد للـ request بيظهر في اللوج و ProblemDetails.

لو exception حصل تحت، هيطلع من [[await next(ctx)]] عندك، وأي كود بعده مش هيتنفذ إلا لو في [[finally]]. الـ [[UseExceptionHandler]] فوق هو اللي هيمسكه.

[[UseAuthentication]] بيقرا الـ token ويملى [[ctx.User]]. [[UseAuthorization]] بيبص على الـ endpoint المختار ويشوف policy بتاعه ويقارن بـ [[ctx.User]]. لو عكستهم، الـ authorization بيشوف user فاضي فيرجع 401 حتى للتوكن السليم. وفي .NET الحديث [[WebApplication]] بيضيف الاتنين لوحده لو سجلت auth services ومحطتهمش، بس الأوضح تكتبهم صريح.`,
            when: R`middleware لحاجات بتتعمل لكل request: logging، و correlation IDs، و headers أمنية، و tenant resolution. لحاجة خاصة بـ endpoints معينة استخدم endpoint filters ([[AddEndpointFilter]]) أو policies مش middleware.`,
            mistakes: R`middleware بيكتب في الـ response بعد [[next]] ويستغرب [[Headers are read-only, response has already started]]. ولوج بعد [[await next]] من غير finally فالـ requests اللي وقعت مش بتظهر (حصل في مشروع التاب ده فعلًا: الـ 409 مكانش بيتسجل). وترتيب auth غلط. قارن بدرس «ترتيب الـ middleware» في «تاب Backend بـ Node».`
          },
          lines: [
            "أول واحد: بيلف كل اللي تحته في try/catch.",
            "الردود الفاضية تبقى ProblemDetails.",
            "middleware inline.",
            "بداية.",
            "ساعة لكل request.",
            R`header قبل [[next]] (بعده ممكن يبقى متأخر).`,
            "كمّل للي بعده، وارجع لما الرد يخلص.",
            "بعد الرد: سطر لوج واحد لكل request.",
            "القيم.",
            "نهاية.",
            R`بيقرا الـ JWT ويملى [[ctx.User]].`,
            "بيفحص الصلاحيات على الـ endpoint المختار (لازم بعد الـ authentication).",
            "الـ minimal endpoints.",
            "الـ controllers."
          ],
          sol: R`الترتيب: [[A before]] ثم [[B before]] ثم الـ handler ثم [[B after]] ثم [[A after]]، زي البصلة. لو الـ endpoint رمت، [[A after]] و [[B after]] مش هيتطبعوا، وسطر الـ timing مش هيظهر (الـ 409 والـ 500 بيختفوا من لوجك بالظبط لما تكون محتاجهم). الحل: [[try { await next(ctx); } finally { log... }]]، والـ status جوه الـ finally ممكن يبقى لسه 200 لأن الـ exception handler فوق هو اللي هيحطه 500، فسجّل الـ exception كمان أو اعتمد على لوج الـ exception handler.

مع [[UseAuthorization]] قبل [[UseAuthentication]]: endpoint عليها [[RequireAuthorization]] بترجع 401 حتى مع توكن سليم، لأن وقت الفحص [[ctx.User]] لسه فاضي.`,
          solCode: R`app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    try
    {
        await next(ctx);
    }
    finally
    {
        app.Logger.LogInformation("{Method} {Path} -> {Status} in {Ms}ms",
            ctx.Request.Method, ctx.Request.Path, ctx.Response.StatusCode, sw.ElapsedMilliseconds);
    }
});`
        },
        {
          cmd: "configuration و options",
          title: "appsettings.json و env vars و IOptions: الإعدادات من غير process.env في كل حتة",
          desc: R`الإعدادات بتيجي من طبقات، واللي بعد بيكسب: [[appsettings.json]] ثم [[appsettings.Development.json]] (حسب الـ environment) ثم user secrets (في التطوير بس) ثم environment variables ثم command-line args. الـ hierarchy بـ [[:]] في الكود ([[Shop:PageSize]]) و [[__]] (اتنين underscore) في الـ env vars ([[Shop__PageSize=50]]).

بدل ما تقرا [[config["Shop:PageSize"]]] كـ string في كل حتة، اعمل class واربطها: [[AddOptions<ShopOptions>().BindConfiguration("Shop")]]، واطلب [[IOptions<ShopOptions>]] في أي service. ومعاها [[ValidateDataAnnotations()]] و [[ValidateOnStart()]] فالتطبيق ميقومش أصلًا لو الإعدادات غلط.

الأسرار (connection strings، مفاتيح JWT) مش في [[appsettings.json]] اللي في git: في التطوير [[dotnet user-secrets]]، وفي الإنتاج env vars أو secret store.`,
          example: R`builder.Services.AddOptions<ShopOptions>()
    .BindConfiguration("Shop")
    .ValidateDataAnnotations()
    .ValidateOnStart();
app.MapGet("/settings", (IOptions<ShopOptions> o, IConfiguration cfg) =>
    new { o.Value.PageSize, o.Value.SupportEmail, raw = cfg["Shop:PageSize"] });
public class ShopOptions
{
    [Range(1, 100)] public int PageSize { get; set; }
    [Required, EmailAddress] public string SupportEmail { get; set; } = "";
}
# appsettings.json: { "Shop": { "PageSize": 20, "SupportEmail": "help@shop.test" } }
# Shop__PageSize=50 dotnet run         -> {"pageSize":50,...}
# Shop__PageSize=500 dotnet run        -> OptionsValidationException وقت الـ startup`,
          try: R`اعمل [[dotnet user-secrets init]] ثم [[dotnet user-secrets set "ConnectionStrings:Shop" "Host=localhost;..."]] وشيل الـ connection string من [[appsettings.Development.json]]. التطبيق لسه شغال؟ السر اتخزن فين؟ وجرّب نفس المفتاح كـ env var [[ConnectionStrings__Shop]]: مين كسب؟`,
          flag: "script",
          deep: {
            why: R`نفس الكود بيشتغل في التطوير والـ staging والإنتاج بإعدادات مختلفة، ومن غير ما الأسرار تدخل git. والـ options المتفحوصة بتحوّل «الإيميلات مش بتتبعت من أسبوع لأن الـ SMTP port غلط» لـ «التطبيق مقامش والسبب مكتوب في أول سطر لوج».`,
            how: R`[[IConfiguration]] قاموس مسطح بمفاتيح زي [[Shop:PageSize]]، وكل مصدر بيكتب فوق اللي قبله. الـ env var [[Shop__PageSize]] بيتحول لـ [[Shop:PageSize]] (لأن [[:]] مش مسموحة في أسماء env vars على كل الأنظمة). و [[GetConnectionString("Shop")]] اختصار لـ [[ConnectionStrings:Shop]].

[[BindConfiguration]] بيملى الـ class بالاسم (case-insensitive) ويحوّل الأنواع. [[IOptions<T>]] singleton بيتقري مرة. [[IOptionsSnapshot<T>]] scoped بيعيد القراية كل request (لو الملف اتغير). [[IOptionsMonitor<T>]] singleton وبيبلغك بالتغيير.

[[dotnet user-secrets]] بيخزن JSON في [[~/.microsoft/usersecrets/<id>/secrets.json]] برّه فولدر المشروع، والـ id متخزن في الـ csproj ([[UserSecretsId]]). بيتقري في Development بس، فمينفعش يبقى حل للإنتاج.

الـ environment من [[ASPNETCORE_ENVIRONMENT]] (أو [[DOTNET_ENVIRONMENT]]): Development أو Staging أو Production أو أي اسم، و [[appsettings.{Name}.json]] بيتقري حسبه.`,
            when: R`[[appsettings.json]] للقيم الافتراضية الغير سرية. [[appsettings.Development.json]] لإعدادات التطوير (connection string محلي بباسورد تافه مقبول). user secrets لمفاتيح API الحقيقية وانت بتطوّر. env vars أو Docker secrets أو Key Vault في الإنتاج. وقارن بـ «config.js بـ zod» في «تاب Backend بـ Node»: نفس الفكرة.`,
            mistakes: R`سر حقيقي في [[appsettings.json]] ويترفع على GitHub. و [[:]] في env var بدل [[__]]. وتنسى إن [[dotnet publish]] بينسخ [[appsettings.Development.json]] للناتج (لو فيه أسرار شيله أو امنعه). وتقرا [[IConfiguration]] string في ٢٠ مكان بدل options class واحدة متفحوصة.`
          },
          lines: [
            "سجّل options class.",
            R`اربطها بقسم [[Shop]] في الإعدادات.`,
            "افحص الـ attributes.",
            "وقت الـ startup مش أول ما حد يستخدمها.",
            R`[[IOptions<T>]] من الـ DI، و [[IConfiguration]] للقراية الخام.`,
            R`[[{"pageSize":20,"supportEmail":"help@shop.test","raw":"20"}]].`,
            "الـ options class.",
            "بداية.",
            R`بين 1 و 100.`,
            "مطلوب وإيميل صالح.",
            "نهاية."
          ],
          sol: R`بعد [[user-secrets set]] التطبيق شغال عادي والـ connection string اتقرا. السر في [[~/.microsoft/usersecrets/<UserSecretsId>/secrets.json]] (على Windows في [[%APPDATA%\Microsoft\UserSecrets]])، برّه المشروع خالص، فمستحيل يترفع مع الكود. و [[dotnet user-secrets list]] بيعرضه.

الـ env var [[ConnectionStrings__Shop]] بيكسب على الـ user secrets، لأن env vars بتتقري بعدهم. الترتيب الكامل من الأضعف للأقوى: appsettings.json، appsettings.Development.json، user secrets، env vars، command line. ولو شغلت بـ [[ASPNETCORE_ENVIRONMENT=Production]] الـ user secrets مش هتتقري خالص والـ connection string هيبقى null، وده المقصود.`
        },
        {
          cmd: "ILogger",
          title: "ILogger و structured logging: لوج تقدر تدوّر فيه",
          desc: R`اطلب [[ILogger<OrdersController>]] في الـ constructor واكتب [[logger.LogInformation("Order {OrderId} placed by {Email}", id, email)]]. لاحظ: مش [[$"..."]]. الـ [[{OrderId}]] ده placeholder بيتخزن كحقل منفصل، فلما اللوج يروح لـ Seq أو Elastic أو Loki تقدر تدوّر بـ [[OrderId = 42]].

المستويات: [[Trace]] و [[Debug]] و [[Information]] و [[Warning]] و [[Error]] و [[Critical]]. وبتتحكم فيها من [[appsettings.json]] لكل category (الـ category = اسم الـ class): [[Microsoft.AspNetCore]] على Warning عشان ميزحمش، و [[Microsoft.EntityFrameworkCore.Database.Command]] على Information لو عايز تشوف الـ SQL.

للـ exceptions: [[logger.LogError(ex, "Payment failed for {OrderId}", id)]]، الـ exception أول parameter.`,
          example: R`public class OrderService(ShopDb db, ILogger<OrderService> logger)
{
    public async Task CancelAsync(int orderId, CancellationToken ct)
    {
        using var _ = logger.BeginScope(new Dictionary<string, object> { ["OrderId"] = orderId });
        logger.LogInformation("Cancelling order {OrderId}", orderId);
        try
        {
            await db.Orders.Where(o => o.Id == orderId).ExecuteDeleteAsync(ct);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Cancel failed for order {OrderId}", orderId);
            throw;
        }
    }
}
# appsettings.json
# "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning",
#   "Microsoft.EntityFrameworkCore.Database.Command": "Information" } }`,
          try: R`شغّل الـ API وخلّي [[Microsoft.EntityFrameworkCore.Database.Command]] على Information، واعمل request واحد لـ [[/api/products]]: هتشوف الـ SQL بالظبط. وبعدين خلّي اللوج JSON: [[builder.Logging.AddJsonConsole()]] (وشيل الـ console العادي بـ [[ClearProviders]]) وشوف شكل السطر بقى إيه.`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوج هو عينك الوحيدة. لوج نصي بـ interpolation بيبقى مليون سطر مختلف ومتقدرش تجمّع «كام طلب فشل للعميل ده». الـ structured logging بيخلي كل سطر record فيه حقول، والأدوات بتفلتر وتجمّع عليها.`,
            how: R`[[ILogger<T>]] بيتسجل تلقائي، و T بيبقى الـ category. الـ message template بيتخزن ثابت ([[Order {OrderId} placed]])، والقيم منفصلة، فالأداة تجمّع كل السطور اللي ليها نفس الـ template.

لو كتبت [[$"Order {id}"]] كل سطر template مختلف، والقيمة اتحولت نص وضاعت، وكمان الـ string اتبنى حتى لو المستوى مقفول (allocation على الفاضي). الـ analyzers بتحذرك (CA2254).

[[BeginScope]] بيضيف حقول لكل السطور جوه الـ using (زي OrderId أو TenantId). والـ providers: Console (الافتراضي)، و Debug، و EventSource، وأي حاجة من برّه (Serilog شهير جدًا، و OpenTelemetry للإرسال لأي backend).

للأداء العالي فيه [[[LoggerMessage]]] source generator بيولّد methods logging من غير allocations. والـ console provider في Production بيكتب بشكل مقروء، و [[AddJsonConsole]] بيكتب JSON سطر لكل log، وده اللي أدوات جمع اللوج بتحبه (Docker و Loki و CloudWatch).`,
            when: R`Information للأحداث المهمة في الـ business (طلب اتعمل، دفع نجح). Warning لحاجة غريبة بس اتعاملنا معاها (retry). Error لفشل محتاج حد يبص. Debug للتفاصيل وقت التطوير. ومتسجلش في كل method «دخلت» و «خرجت».`,
            mistakes: R`string interpolation في اللوج. وتسجيل passwords أو tokens أو بيانات كروت أو PII (شوف «تاب الأمان»: PII بره اللوج). و [[LogError(ex.Message)]] بدل [[LogError(ex, "...")]] فالـ stack trace يضيع. وتسيب EF Command على Information في الإنتاج تحت ضغط.`
          },
          lines: [
            R`[[ILogger<OrderService>]]: الـ category اسم الـ class.`,
            "بداية.",
            "method.",
            "بداية.",
            R`scope: كل سطر لوج جوه الـ using بياخد [[OrderId]] كحقل.`,
            R`template ثابت + قيمة كحقل منفصل.`,
            "try.",
            "بداية.",
            R`[[DELETE]] مباشر من غير تحميل (category الـ EF).`,
            "نهاية.",
            "catch.",
            "بداية.",
            "الـ exception أول parameter عشان الـ stack trace يتسجل.",
            "ارمي تاني للـ exception handler.",
            "نهاية.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`مع EF Command على Information هتشوف لكل query سطر زي [[Executed DbCommand (2ms) [Parameters=[@q_contains='?' ...], CommandType='Text', CommandTimeout='30']]] وتحته الـ SQL: [[SELECT p0."Id", p0."Name", p0."Price", c."Name" FROM (...) WHERE p."Name" LIKE @q_contains ... LIMIT @p2 OFFSET @p]]. لاحظ إن قيم الـ parameters بتطلع [[?]]: EF بيخبيها افتراضيًا عشان متتسربش، ولو عايزها في التطوير بس فعّل [[EnableSensitiveDataLogging()]].

مع [[AddJsonConsole]] كل log سطر JSON زي [[{"EventId":0,"LogLevel":"Information","Category":"Program","Message":"Page size is 20 for Production","State":{"PageSize":20,"Env":"Production","{OriginalFormat}":"Page size is {PageSize} for {Env}"}}]]. مفيش وقت افتراضيًا: ضيفه بـ [[AddJsonConsole(o => o.TimestampFormat = "O")]]، وغالبًا أداة جمع اللوج (Docker أو Loki) بتضيفه. الحقول المنفصلة هي اللي بتفرق عن النص. لو لسه شايف الشكل القديم، يبقى الـ console provider العادي لسه متسجل جنبه: [[builder.Logging.ClearProviders()]] الأول.`
        }
      ]
    },
    {
      t: "EF Core: الأساس",
      l: 2,
      n: "DbContext مع PostgreSQL أو SQL Server، و migrations، و العلاقات، و LINQ اللي بيتحول SQL",
      items: [
        {
          cmd: "DbContext و Npgsql",
          title: "DbContext و DbSet: توصّل EF Core بـ PostgreSQL",
          desc: R`EF Core هو الـ ORM الرسمي (زي Prisma في «تاب SQL و Prisma»). بتكتب classes عادية (entities)، و [[DbContext]] فيه [[DbSet<Product>]] لكل جدول، وبتكتب LINQ فبيتحول SQL.

الـ provider بيتحدد بالمكتبة: [[Npgsql.EntityFrameworkCore.PostgreSQL]] لـ Postgres و [[UseNpgsql]]، أو [[Microsoft.EntityFrameworkCore.SqlServer]] و [[UseSqlServer]] لـ SQL Server، أو SQLite للتجارب. باقي الكود زي ما هو تقريبًا.

الـ conventions: property اسمها [[Id]] = primary key بـ identity، و [[CategoryId]] + [[Category]] = foreign key وعلاقة، و [[string]] non-nullable = [[NOT NULL]]. والباقي بتظبطه في [[OnModelCreating]] (Fluent API): أطوال، و precision للفلوس، و indexes.`,
          example: R`dotnet package add Npgsql.EntityFrameworkCore.PostgreSQL
dotnet package add Microsoft.EntityFrameworkCore.Design
# Data/ShopDb.cs
public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
public class ShopDb(DbContextOptions<ShopDb> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Product>().Property(p => p.Name).HasMaxLength(200);
        b.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);
        b.Entity<Product>().HasIndex(p => p.Name).IsUnique();
    }
}
# Program.cs + appsettings.Development.json
builder.Services.AddDbContext<ShopDb>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("Shop")));
# "ConnectionStrings": { "Shop": "Host=localhost;Database=shop_dev;Username=shop;Password=shop" }`,
          try: R`اعمل الـ entities دي في [[Shop.Api]] (ضيف [[Category]] بـ [[Id]] و [[Name]] و [[List<Product> Products]]) و Order و OrderItem، وسجّل الـ DbContext. ولو معندكش Postgres شغّله بـ Docker ([[docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=shop postgres:17-alpine]]). الخطوة الجاية: migrations.`,
          flag: "script",
          deep: {
            why: R`أغلب شغل .NET backend بيعدي على EF Core. فهمه كويس (إيه اللي بيتحول SQL وإمتى، وإيه اللي بيتتبع) هو الفرق بين API سريع و API بيعمل ٥٠٠ query في الصفحة.`,
            how: R`الـ [[DbContext]] بيمثل unit of work: جلسة مع الداتابيز فيها connection وقايمة بالـ entities اللي حمّلتها وحالتها (change tracker). [[AddDbContext]] بيسجله Scoped، فكل request ليه context منفصل، وده مهم لأن الـ DbContext مش thread-safe.

[[DbSet<T>]] بيطبق [[IQueryable<T>]]: كل LINQ عليه بيتبني كـ expression tree ومش بيتنفذ لحد [[ToListAsync]] أو [[FirstOrDefaultAsync]] أو [[foreach]].

الـ model بيتبني مرة من الـ conventions والـ attributes والـ Fluent API، ويتكاش. الـ navigation property ([[Category]]) بـ [[= null!]] لأنها non-nullable في الـ model (كل منتج ليه category) بس مش بتتحمل لوحدها، فالـ [[!]] بيسكّت التحذير. وجدول من غير DbSet (زي OrderItem لو مليهوش DbSet) بياخد اسم الـ class ([[OrderItem]]) بدل الجمع.

Postgres و SQL Server: الفروق بتظهر في الأنواع ([[text]] مقابل [[nvarchar(max)]]، و [[timestamp with time zone]] مقابل [[datetime2]])، والـ identity، و [[Contains]] ([[LIKE]] في الاتنين)، وحاجات Postgres الخاصة زي arrays و jsonb و [[ILike]] عبر [[EF.Functions]].`,
            when: R`EF Core للـ CRUD والـ queries العادية، وده ٩٠٪ من الشغل. للـ reports المعقدة أو الأداء الحرج: [[FromSql]] أو Dapper جنبه. و SQL Server لو الشركة على Microsoft stack و Azure، و Postgres لأغلب الباقي، والكود تقريبًا واحد.`,
            mistakes: R`نسخ مختلفة من حزم EF (Npgsql 10.0.3 بيعتمد على EF 10.0.4، و Design 10.0.12): تحذير [[MSB3277]] ووقوع وقت التشغيل في الاختبارات بـ [[Could not load file or assembly 'Microsoft.EntityFrameworkCore.Relational, Version=10.0.12.0']]، حصلت هنا وحلها إضافة [[Microsoft.EntityFrameworkCore.Relational]] بنفس النسخة صراحة. و [[double]] للأسعار بدل [[decimal]] + [[HasPrecision]]. و DbContext Singleton. والـ connection string في appsettings.json المرفوع.`
          },
          lines: [
            "الـ provider بتاع Postgres (بيجيب EF Core معاه).",
            R`أدوات design-time عشان [[dotnet ef]] يشتغل.`,
            "entity: class عادية.",
            "بداية.",
            R`[[Id]]: primary key بـ identity بالـ convention.`,
            R`[[NOT NULL]] لأنها non-nullable.`,
            R`[[numeric]] (هنحدد الـ precision تحت).`,
            R`foreign key بالـ convention ([[<Navigation>Id]]).`,
            R`navigation property. [[null!]] لأن EF هو اللي بيملاها.`,
            "نهاية.",
            "الـ context بياخد الإعدادات من الـ DI.",
            "بداية.",
            R`جدول [[Products]].`,
            R`جدول [[Categories]].`,
            "Fluent API.",
            "بداية.",
            R`[[character varying(200)]].`,
            R`[[numeric(10,2)]]: فلوس.`,
            R`unique index على الاسم.`,
            "نهاية.",
            "نهاية.",
            R`تسجيل Scoped، والـ connection string من الإعدادات.`
          ],
          sol: R`لو كله تمام [[dotnet build]] بينجح والتطبيق بيقوم (EF مش بيكلم الداتابيز غير أول query، فلو الـ connection string غلط مش هتعرف غير مع أول request: [[Npgsql.NpgsqlException: Failed to connect to 127.0.0.1:5432]] أو [[28P01: password authentication failed for user "shop"]]).

Order و OrderItem: [[public class Order { public int Id { get; set; } public required string CustomerEmail { get; set; } public DateTime CreatedAt { get; set; } = DateTime.UtcNow; public List<OrderItem> Items { get; set; } = []; }]] و [[OrderItem]] فيها [[OrderId]] و [[ProductId]] و [[Product]] و [[Quantity]] و [[UnitPrice]] (السعر وقت الطلب، مش السعر الحالي). و [[DateTime.UtcNow]] مش [[Now]]: Npgsql بيرفض [[DateTime]] من نوع Local في عمود [[timestamp with time zone]].`
        },
        {
          cmd: "dotnet ef migrations",
          title: "migrations: تغيّر الـ schema بأوامر متسجلة في git",
          desc: R`بعد ما تعدّل الـ entities، [[dotnet ef migrations add Initial]] بيقارن الـ model بآخر snapshot ويطلّع ملف C# فيه [[Up]] (التغيير) و [[Down]] (الرجوع). و [[dotnet ef database update]] بيطبّق اللي ماتطبقش على الداتابيز ويسجله في جدول [[__EFMigrationsHistory]].

الأداة نفسها [[dotnet-ef]] بتتسطب كـ tool: [[dotnet new tool-manifest]] ثم [[dotnet tool install dotnet-ef]]، فتتسجل في [[dotnet-tools.json]] مع المشروع (زي devDependency) وكل الفريق ياخد نفس النسخة بـ [[dotnet tool restore]].

في الإنتاج متشغّلش [[database update]] من جهازك: طلّع SQL script ([[dotnet ef migrations script --idempotent]]) وراجعه، أو migration bundle (ملف تنفيذي)، وشغّله في الـ CI أو الـ deploy.`,
          example: R`dotnet new tool-manifest
dotnet tool install dotnet-ef
dotnet ef migrations add Initial
dotnet ef database update
dotnet ef migrations list
dotnet ef migrations add AddTagsAndSku
dotnet ef migrations script --idempotent -o migrate.sql
dotnet ef migrations bundle -o efbundle
dotnet ef migrations remove`,
          try: R`ضيف لـ [[Product]] property [[public string? Sku { get; set; }]] واعمل migration اسمها [[AddSku]]. افتح الملف واقرا [[Up]] و [[Down]]. وبعدين شغّل التطبيق وجرّب endpoint قبل ما تعمل [[database update]]: إيه الخطأ؟`,
          deep: {
            why: R`الـ schema جزء من الكود: لازم يتراجع في PR، ويتطبق بنفس الترتيب على جهازك والـ staging والإنتاج. من غير migrations كل واحد بيعدّل الجداول بإيده والبيئات بتختلف. نفس فكرة [[prisma migrate]] في «تاب SQL و Prisma».`,
            how: R`كل migration ليها ملفين: [[<timestamp>_Name.cs]] (الـ Up و Down بـ [[MigrationBuilder]])، و [[.Designer.cs]] (الـ model وقتها)، وفيه ملف [[ShopDbModelSnapshot.cs]] بيتحدث مع كل migration وبيمثل الـ model الحالي. [[migrations add]] بيقارن الـ model من الكود بالـ snapshot.

[[dotnet ef]] محتاج يعمل الـ DbContext وقت الـ design: بيشغّل [[Program.cs]] لحد [[Build()]] ويطلب الـ context من الـ DI، فلازم الـ connection string موجود في البيئة اللي هو فيها ([[ASPNETCORE_ENVIRONMENT=Development]]).

[[--idempotent]] بيلف كل migration في [[IF NOT EXISTS]] على جدول الـ history، فالـ script ينفع يتشغل على أي نسخة من الداتابيز. والـ bundle ملف تنفيذي فيه الـ migrations، بتشغّله بـ connection string من غير SDK.

[[migrations remove]] بيشيل آخر migration لو لسه مطبقتهاش. لو طبقتها: [[database update PreviousName]] الأول. وفي الـ many-to-many من غير join entity، EF بيعمل جدول [[ProductTag]] بأعمدة [[ProductsId]] و [[TagsId]] لوحده.`,
            when: R`migration صغيرة لكل تغيير منطقي، باسم واضح ([[AddSkuToProducts]] مش [[Update3]]). في الإنتاج: script أو bundle في خطوة deploy منفصلة قبل ما التطبيق الجديد يقوم. و [[Database.Migrate()]] وقت الـ startup بس للمشاريع الصغيرة بـ instance واحدة (لو كذا instance قاموا مع بعض ممكن يتخانقوا).`,
            mistakes: R`تعدّل migration اتطبقت خلاص بدل ما تعمل واحدة جديدة. وتمسح ملفات الـ migrations وتعمل Initial جديدة على داتابيز فيها داتا. و rename property فـ EF يفهمها drop + add فتضيع الداتا: راجع الـ Up دايمًا وحوّلها [[RenameColumn]]. وتغييرات بتقفل جداول كبيرة في الإنتاج (شوف «تاب PostgreSQL»: تغييرات آمنة في الإنتاج).`
          },
          lines: [
            R`[[dotnet-tools.json]]: tools خاصة بالمشروع.`,
            R`سطّب [[dotnet-ef]] بنسخة متسجلة في الملف.`,
            R`أول migration: فولدر [[Migrations]] فيه الـ Up و Down والـ snapshot.`,
            R`طبّق على الداتابيز (من الـ connection string في Development).`,
            R`كل الـ migrations، والمش مطبقة عليها [[(Pending)]].`,
            "migration تانية بعد تعديل الـ entities.",
            "SQL script آمن يتشغل على أي نسخة، تراجعه وتشغّله في الإنتاج.",
            "ملف تنفيذي فيه الـ migrations للـ CI و Docker.",
            "شيل آخر migration (لو لسه متطبقتش)."
          ],
          sol: R`الـ Up فيها [[migrationBuilder.AddColumn<string>(name: "Sku", table: "Products", type: "text", nullable: true);]] والـ Down فيها [[DropColumn]]. nullable لأن [[string?]]؛ لو كانت [[string]] كان هيحط [[nullable: false, defaultValue: ""]] عشان الصفوف القديمة.

قبل [[database update]] أي query على Products بتقع: [[Npgsql.PostgresException: 42703: column p.Sku does not exist]] والـ API بيرجع 500. لأن EF بيعمل [[SELECT]] بكل الأعمدة اللي في الـ model. ده حصل فعلًا وإحنا بنجرب الـ tab ده. بعد [[dotnet ef database update]] وتشوف [[migrations list]] مفيهاش Pending، كله يرجع يشتغل. الدرس: الـ migration لازم تتطبق قبل أو مع نشر الكود اللي بيعتمد عليها.`
        },
        {
          cmd: "العلاقات في EF",
          title: "one-to-many و many-to-many: navigation properties و foreign keys",
          desc: R`العلاقة بتتكتب بـ navigation properties: [[Category]] فيها [[List<Product> Products]] و [[Product]] فيها [[Category Category]] و [[int CategoryId]] = one-to-many. و [[Product]] فيها [[List<Tag> Tags]] و [[Tag]] فيها [[List<Product> Products]] = many-to-many، و EF بيعمل جدول الربط لوحده.

الإضافة بالـ navigation: [[order.Items.Add(new OrderItem { ... })]] و [[SaveChanges]] بيعمل الـ INSERTs بالترتيب الصح ويملى الـ foreign keys. أو بالـ Id مباشرة: [[new Product { CategoryId = 1 }]] من غير ما تحمّل الـ category.

الـ [[OnDelete]] بيتحدد تلقائي: required relationship = [[CASCADE]]. غيّره لـ [[Restrict]] لو مش عايز مسح الـ category يمسح منتجاتها.`,
          example: R`public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Product> Products { get; set; } = [];
}
public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Product> Products { get; set; } = [];
}
b.Entity<Product>()
    .HasOne(p => p.Category)
    .WithMany(c => c.Products)
    .HasForeignKey(p => p.CategoryId)
    .OnDelete(DeleteBehavior.Restrict);
var pens = new Category { Name = "Pens" };
pens.Products.Add(new Product { Name = "Blue pen", Price = 5.5m });
db.Categories.Add(pens);
await db.SaveChangesAsync();`,
          try: R`ضيف [[Tags]] لـ Product و [[Tag]] entity واعمل migration، وافتحها: الجدول الوسيط اسمه إيه وأعمدته إيه؟ وبعدين ضيف tag «sale» لمنتج موجود من غير ما تحمّل كل الـ tags بتاعته.`,
          flag: "script",
          deep: {
            why: R`أي app حقيقي علاقات: طلبات فيها أصناف، ومنتجات في أقسام، ومستخدمين ليهم أدوار. EF بيخليك تتعامل معاها كـ objects عادية، بس لازم تعرف هو بيعمل إيه في SQL عشان متتفاجئش بالـ cascade أو بـ query ناقصة.`,
            how: R`EF بيكتشف العلاقة من الـ navigations في الناحيتين، ولو فيه [[CategoryId]] بيستخدمه كـ FK (لو مش موجود بيعمل shadow property بنفس الاسم). الـ Fluent API ([[HasOne]]/[[WithMany]]) مطلوب بس لما الـ conventions متكفيش (اسمين غريبين، أو تغيير الـ delete behavior).

الـ many-to-many من غير class للربط: EF بيعمل جدول [[ProductTag]] بأعمدة [[ProductsId]] و [[TagsId]] ومفتاح مركب. لو محتاج أعمدة زيادة في الربط (زي [[AddedAt]]) اعمل entity للربط صريحة ([[ProductTag]]) بعلاقتين one-to-many.

الـ navigations مش بتتحمل لوحدها: [[product.Category]] بيبقى null لحد ما تعمل [[Include]] أو projection (الـ category الجاية). وفيه lazy loading بس مقفول افتراضيًا ومش مستحسن في APIs.

[[DeleteBehavior.Cascade]] بيحط [[ON DELETE CASCADE]] في الـ FK، و [[Restrict]] بيمنع المسح لو فيه أولاد. و [[SetNull]] للعلاقات الاختيارية.`,
            when: R`one-to-many لأغلب العلاقات. many-to-many بسيطة للـ tags والـ roles. entity وسيطة لو الربط ليه داتا. و [[Restrict]] للـ lookups (Category، Country) عشان مسحة غلط متمسحش آلاف الصفوف. قارن بـ «one-to-many» و «many-to-many» و «ON DELETE» في «تاب SQL و Prisma».`,
            mistakes: R`تحمّل الـ category كلها عشان تضيف منتج (استخدم [[CategoryId]]). وتسيب الـ cascade الافتراضي على علاقات مهمة. و navigation في الناحيتين وترجع الـ entity في JSON: [[A possible object cycle was detected]]. رجّع DTOs.`
          },
          lines: [
            "الناحية الـ one.",
            "بداية.",
            "PK.",
            "اسم.",
            R`collection navigation: الـ many. [[= []]] عشان متبقاش null.`,
            "نهاية.",
            "tag.",
            "بداية.",
            "PK.",
            "اسم.",
            R`many-to-many مع [[Product.Tags]]: EF بيعمل جدول [[ProductTag]].`,
            "نهاية.",
            "Fluent API للعلاقة (في OnModelCreating).",
            "المنتج ليه category واحدة.",
            "والـ category ليها منتجات كتير.",
            R`الـ FK صريح.`,
            R`[[ON DELETE RESTRICT]] بدل CASCADE.`,
            "category جديدة.",
            "منتج جوه الـ navigation.",
            "ضيف الـ category (والمنتج معاها).",
            R`[[INSERT]] للـ category الأول، وبعدين المنتج بالـ [[CategoryId]] الجديد.`
          ],
          sol: R`الـ migration فيها [[CreateTable(name: "Tag", ...)]] و [[CreateTable(name: "ProductTag", columns: ProductsId, TagsId)]] بـ [[PrimaryKey("PK_ProductTag", x => new { x.ProductsId, x.TagsId })]] واتنين FK بـ Cascade، و index على [[TagsId]]. الجدول اسمه [[Tag]] مش [[Tags]] لأن مفيش [[DbSet<Tag>]]؛ ضيف DbSet أو [[ToTable("Tags")]] لو عايز الجمع.

عشان تضيف tag من غير ما تحمّل tags المنتج: [[var product = await db.Products.FindAsync(1); var sale = await db.Set<Tag>().SingleAsync(t => t.Name == "sale"); product!.Tags.Add(sale); await db.SaveChangesAsync();]] الـ [[Tags]] فاضية في الذاكرة بس EF بيعمل [[INSERT INTO "ProductTag"]] للصف الجديد بس، مش بيمسح القديم، لأنه بيتتبع الإضافة مش الحالة الكاملة. لو الـ tag موجودة أصلًا على المنتج هتاخد duplicate key: حمّلها بـ [[Include]] الأول لو مش متأكد.`
        },
        {
          cmd: "LINQ لـ SQL",
          title: "الـ LINQ بيتحول SQL إزاي؟ projection و ToQueryString و الـ client evaluation",
          desc: R`[[db.Products.Where(p => p.Price > 10).Select(p => new { p.Name })]] مش بيتنفذ في C#: EF بياخد الـ lambda كـ expression tree ويحوّلها لـ [[SELECT p."Name" FROM "Products" AS p WHERE p."Price" > 10]]. عشان كده مش أي C# ينفع جوه الـ Where: methods انت كاتبها أو حاجات ملهاش مقابل في SQL بترمي [[could not be translated]].

أهم عادة: [[Select]] لـ DTO (projection). بيجيب الأعمدة المطلوبة بس، وبيعمل الـ JOINs لوحده لو استخدمت navigation ([[p.Category.Name]])، ومش بيتتبع حاجة. و [[ToQueryString()]] بيوريك الـ SQL من غير ما ينفذ.

والـ async: [[ToListAsync]] و [[FirstOrDefaultAsync]] و [[CountAsync]] و [[AnyAsync]] من [[Microsoft.EntityFrameworkCore]].`,
          example: R`var q = db.Products
    .Where(p => p.Price > 5 && p.Name.Contains("pen"))
    .OrderBy(p => p.Price)
    .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name));
Console.WriteLine(q.ToQueryString());
var list = await q.ToListAsync(ct);
var total = await db.Products.CountAsync(p => p.Stock < 5, ct);
var exists = await db.Products.AnyAsync(p => p.Name == "Blue pen", ct);
var avgByCategory = await db.Products
    .GroupBy(p => p.Category.Name)
    .Select(g => new { Category = g.Key, Avg = g.Average(p => p.Price) })
    .ToListAsync(ct);`,
          try: R`اعمل method عادية [[static bool IsCheap(Product p) => p.Price < 10;]] واستخدمها جوه [[db.Products.Where(p => IsCheap(p))]]. إيه اللي حصل؟ صلّحها بطريقتين. وبعدين قارن الـ SQL بتاع [[db.Products.Select(p => p.Name)]] بـ [[db.Products.ToList().Select(p => p.Name)]].`,
          flag: "script",
          deep: {
            why: R`الـ ORM بيخبي الـ SQL، وده مريح لحد ما الـ query تبقى بطيئة أو تقع في الإنتاج. لازم تبقى عارف تقرا LINQ وتتخيل الـ SQL، وتتأكد بـ [[ToQueryString]] أو اللوج.`,
            how: R`[[DbSet<T>]] هو [[IQueryable<T>]]، و [[Where]] على [[IQueryable]] بتاخد [[Expression<Func<T, bool>>]] مش [[Func]]: شجرة بتوصف الكود مش كود متجمّع. الـ provider بيلف على الشجرة ويترجمها. [[Contains]] على string بقت [[LIKE]]، و [[ids.Contains(p.Id)]] بقت [[= ANY(@ids)]] في Postgres أو [[IN]]، و [[p.Category.Name]] بقت JOIN.

الـ parameters: القيم من C# بتبقى parameters ([[@q_contains]]) مش بتتلزق في النص، فمفيش SQL injection. و [[FromSql($"... {x}")]] برضه بيحوّل الـ interpolation لـ parameters، أما [[FromSqlRaw]] مع string concatenation ففيه injection.

EF Core بيسمح بـ client evaluation في آخر [[Select]] بس (مثلًا تنادي method على النتيجة). في Where أو OrderBy بيرمي [[InvalidOperationException: The LINQ expression ... could not be translated]]، أحسن من إنه يحمّل الجدول كله بهدوء زي EF6 زمان.

أول ما تعمل [[AsEnumerable()]] أو [[ToList()]] الباقي بيتنفذ في الذاكرة. ده الفرق بين [[IQueryable]] و [[IEnumerable]] (سؤال انترفيو ثابت، آخر category).`,
            when: R`projection لـ DTO في أي endpoint بيرجع داتا. تحميل الـ entity كاملة لما هتعدّل فيها و [[SaveChanges]]. SQL خام ([[FromSql]] أو [[SqlQuery]]) للـ reports والـ window functions اللي LINQ مبيعبّرش عنها كويس.`,
            mistakes: R`[[ToList()]] بدري فالفلترة تحصل في الذاكرة. و method بتاعتك جوه Where. و [[Count()]] الـ sync بدل [[CountAsync]] في API. و [[FromSqlRaw("... " + input)]] (SQL injection). و [[string.Equals(a, b, StringComparison.OrdinalIgnoreCase)]] جوه Where (مش بيتترجم: استخدم [[EF.Functions.ILike]] في Postgres أو collation).`
          },
          lines: [
            "query لسه متنفذتش.",
            R`بيتحول [[WHERE p."Price" > 5.0 AND p."Name" LIKE '%pen%']]: الثوابت بتتكتب في الـ SQL، والمتغيرات بتبقى parameters.`,
            R`[[ORDER BY]].`,
            R`projection: [[p.Category.Name]] بيعمل [[INNER JOIN]] لوحده، والأعمدة المطلوبة بس.`,
            "اطبع الـ SQL من غير تنفيذ.",
            R`هنا بس بيروح للداتابيز، والـ token بيلغي الـ query لو الـ request اتلغى.`,
            R`[[SELECT count(*)]] مش تحميل الصفوف.`,
            R`[[SELECT EXISTS (...)]].`,
            R`[[GROUP BY]] في SQL.`,
            "التجميع.",
            R`[[avg()]] في SQL.`,
            "تنفيذ."
          ],
          sol: R`[[Where(p => IsCheap(p))]] بيرمي وقت التنفيذ: [[InvalidOperationException: The LINQ expression 'DbSet<Product>().Where(p => Program.IsCheap(p))' could not be translated. Either rewrite the query in a form that can be translated, or switch to client evaluation explicitly by inserting a call to 'AsEnumerable', 'AsAsyncEnumerable', 'ToList', or 'ToListAsync'.]] EF مش شايف جوه الـ method، شايف نداء بس.

الحل الأول: اكتب الشرط inline [[Where(p => p.Price < 10)]]. التاني: خلي الـ method ترجع [[Expression<Func<Product, bool>>]]: [[static Expression<Func<Product, bool>> IsCheap => p => p.Price < 10;]] و [[Where(IsCheap)]]. (الـ AsEnumerable اللي الرسالة بتقترحه بيشتغل بس بيحمّل الجدول كله، فمش حل.)

[[db.Products.Select(p => p.Name)]] الـ SQL [[SELECT p."Name" FROM "Products" AS p]]. و [[ToList().Select(...)]] الـ SQL [[SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock" FROM "Products"]]: كل الأعمدة وكل الصفوف، والـ Select في الذاكرة.`
        }
      ]
    },
    {
      t: "EF Core: الأداء والـ transactions",
      l: 2,
      n: "N+1 و Include، و AsNoTracking، و SaveChanges كـ transaction، و ExecuteUpdate",
      items: [
        {
          cmd: "Include و N+1",
          title: "N+1 queries: ليه الصفحة بتعمل ١٠١ query وإزاي Include بيحلها",
          desc: R`N+1: query تجيب N عنصر، وبعدين query لكل عنصر عشان تجيب حاجة مرتبطة بيه. ١٠٠ category = ١٠١ query. في EF بيحصل لما تلف على نتيجة وتحمّل الـ navigation جوه الـ loop، أو مع lazy loading.

الحلول: [[Include(c => c.Products)]] بيجيب الاتنين في query واحدة بـ JOIN. أو الأحسن غالبًا: projection بـ [[Select]] لشكل الرد اللي محتاجه، فـ EF يعمل الـ JOIN ويجيب الأعمدة المطلوبة بس. و [[AsSplitQuery()]] لو عندك كذا Include لـ collections والـ JOIN بقى بيضرب الصفوف في بعض (cartesian explosion).`,
          example: R`var cats = await db.Categories.ToListAsync();
foreach (var c in cats)
    await db.Entry(c).Collection(x => x.Products).LoadAsync();
var withProducts = await db.Categories
    .Include(c => c.Products)
    .AsNoTracking()
    .ToListAsync();
var summary = await db.Categories
    .Select(c => new { c.Name, Count = c.Products.Count, MaxPrice = c.Products.Max(p => (decimal?)p.Price) })
    .ToListAsync();
var orders = await db.Orders
    .Include(o => o.Items).ThenInclude(i => i.Product)
    .AsSplitQuery()
    .ToListAsync();`,
          try: R`فعّل لوج [[Microsoft.EntityFrameworkCore.Database.Command]] على Information، واعمل endpoint بالنسخة الأولى (الـ loop) وعِد الـ [[Executed DbCommand]] في اللوج لـ request واحد. وبعدين بالـ Include، وبعدين بالـ projection. قارن عدد الـ queries والأعمدة.`,
          flag: "script",
          deep: {
            why: R`N+1 هو أشهر مشكلة أداء في أي ORM. على جهازك بـ ١٠ صفوف مش هتحس بيها، وفي الإنتاج بـ ١٠٠٠ صف والداتابيز على سيرفر تاني (كل query فيها round trip) الصفحة بتاخد ثواني. وسؤال انترفيو ثابت (شوف «N+1» في «تاب SQL و Prisma» و «DataLoader و N+1» في «تاب APIs متقدمة»).`,
            how: R`[[Include]] بيضيف LEFT JOIN و ORDER BY على الـ keys، و EF بيجمّع الصفوف لـ objects. [[ThenInclude]] للمستوى اللي بعده. ولو فيه أكتر من collection Include في نفس الـ query، الصفوف بتتضرب (١٠ items × ٥ payments = ٥٠ صف لكل order)، و EF بيحذرك في اللوج. [[AsSplitQuery]] بيعمل query لكل collection بدل JOIN واحد كبير.

الـ projection: [[c.Products.Count]] بيتحول subquery [[(SELECT count(*) ...)]] جوه نفس الـ SELECT. ومفيش tracking لأن النتيجة مش entities. و [[(decimal?)p.Price]] في [[Max]] عشان لو category فاضية [[MAX]] بيرجع NULL وبدون الـ cast هترمي exception.

الـ explicit loading ([[Entry(...).Collection(...).LoadAsync()]]) والـ lazy loading الاتنين بيعملوا query لكل مرة، ودول مصدر الـ N+1.`,
            when: R`projection للـ reads اللي بترجع JSON (الأغلب). [[Include]] لما محتاج الـ entities نفسها (هتعدّل فيها، أو هتبني منها domain logic). [[AsSplitQuery]] مع كذا collection. وافحص عدد الـ queries في الـ integration tests أو باللوج.`,
            mistakes: R`[[Include]] لكل حاجة «احتياطي» فتجيب نص الداتابيز. وتنسى الـ Include فالـ navigation تبقى null أو فاضية من غير error (ده أخطر من الـ exception). و lazy loading في API. وتفتكر إن Include بيفلتر: [[Include(c => c.Products.Where(p => p.Stock > 0))]] (filtered include) موجود بس بتفلتر الـ children مش الـ parents.`
          },
          lines: [
            "query ١: كل الـ categories.",
            "لكل واحدة...",
            "...query لمنتجاتها: N query كمان. ده الـ N+1.",
            R`query واحدة بـ [[LEFT JOIN]].`,
            R`[[Include]] للـ collection.`,
            "قراية بس، من غير tracking.",
            "تنفيذ.",
            "projection: query واحدة وأعمدة قليلة.",
            R`[[Count]] و [[Max]] بيبقوا subqueries في SQL. الـ cast لـ [[decimal?]] عشان الـ category الفاضية.`,
            "تنفيذ.",
            "مستويين.",
            R`[[Include]] ثم [[ThenInclude]] للمنتج جوه كل item.`,
            "query لكل collection بدل JOIN كبير.",
            "تنفيذ."
          ],
          sol: R`بـ ٢ category: الـ loop عمل ٣ queries ([[SELECT ... FROM "Categories"]] ثم [[SELECT ... FROM "Products" WHERE "CategoryId" = @p]] مرتين). مع ١٠٠ category هتبقى ١٠١. الـ Include عمل query واحدة: [[SELECT c."Id", c."Name", p."Id", p."CategoryId", p."Name", p."Price", p."Stock" FROM "Categories" AS c LEFT JOIN "Products" AS p ON c."Id" = p."CategoryId" ORDER BY c."Id"]]. والـ projection query واحدة برضه بس بترجع ٣ أعمدة بس لكل category وصف واحد لكل category مش صف لكل منتج.

لو عدد الـ queries في اللوج مش مطابق، اتأكد إن [[Microsoft.EntityFrameworkCore.Database.Command]] على Information، وإنك بتعد سطور [[Executed DbCommand]] للـ request ده بس (الـ background service ممكن يضيف سطور في النص). و EF مفيهوش cache للـ queries: كل [[LoadAsync]] بيروح للداتابيز.`
        },
        {
          cmd: "AsNoTracking و change tracking",
          title: "change tracking: EF بيعرف منين إنك عدّلت حاجة؟ وإمتى AsNoTracking",
          desc: R`أي entity بتتحمل من query عادية بتتسجل في الـ change tracker بتاع الـ DbContext مع نسخة من قيمها الأصلية. لما تعدّل property وتنادي [[SaveChangesAsync]]، EF بيقارن ويعمل [[UPDATE]] للأعمدة اللي اتغيرت بس. مفيش [[db.Update(p)]] ولا [[save(p)]] محتاجهم.

الـ tracking ليه تكلفة (ذاكرة ومقارنة). لو بتقرا بس عشان ترجع JSON: [[AsNoTracking()]]، أو projection بـ [[Select]] (مش بيتتبع أصلًا). وفيه [[UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)]] على الـ context كله لو أغلب شغلك قراية.

والـ entity اللي جاية من برّه (مش من query في الـ context ده) مش متتبعة: لو عدّلتها و SaveChanges مش هيحصل حاجة.`,
          example: R`var p = await db.Products.FirstAsync(p => p.Id == 1);
p.Price += 1;
var tracked = db.ChangeTracker.Entries().Count();
var state = db.Entry(p).State;
var p2 = await db.Products.AsNoTracking().FirstAsync(p => p.Id == 2);
p2.Price += 1;
var saved = await db.SaveChangesAsync();
Console.WriteLine($"{tracked} {state} {saved}");`,
          try: R`شغّل الكود ده في endpoint وبص على اللوج: كام [[UPDATE]] اتعمل وأنهي أعمدة؟ وبعدين اعمل endpoint [[PUT /api/products/{id}]] بياخد DTO ويعدّل الاسم والسعر: مرة بتحميل الـ entity وتعديلها، ومرة بـ [[ExecuteUpdateAsync]] من غير تحميل. قارن الـ SQL.`,
          flag: "script",
          deep: {
            why: R`اللي جاي من Prisma أو Mongoose متعود إن كل update صريح. في EF التعديل «السحري» ده مريح بس بيعمل مفاجآت: حاجات بتتحفظ من غير ما تقصد، أو مش بتتحفظ وانت فاكرها اتحفظت. وفي الـ reads التقيلة الـ tracking بيضيع ذاكرة ووقت على الفاضي.`,
            how: R`كل entity متتبعة ليها state: [[Unchanged]] بعد التحميل، [[Modified]] لما تتغير property، [[Added]] بعد [[Add]]، [[Deleted]] بعد [[Remove]]، [[Detached]] لو مش متتبعة. [[SaveChanges]] بيعمل [[DetectChanges]] (يقارن القيم الحالية بالـ snapshot) وبعدين يولّد الـ SQL بالترتيب ويشغّله في transaction.

الـ identity resolution: جوه نفس الـ context، نفس الصف بيرجع نفس الـ object. لو حمّلت منتج 1 مرتين هتاخد نفس الـ reference. مع [[AsNoTracking]] كل query بترجع objects جديدة (فيه [[AsNoTrackingWithIdentityResolution]] لو محتاج الاتنين).

[[db.Update(entity)]] على entity مش متتبعة بيعلّمها كلها Modified ويعمل UPDATE لكل الأعمدة، وده مقبول لو جاية كاملة، بس بيكتب فوق تغييرات حد تاني. الأدق: حمّل وعدّل، أو [[ExecuteUpdateAsync]] مباشرة.

الـ context عمره قصير (scoped = request): متخليهوش يعيش طويل لأن الـ tracker بيكبر وبيبطأ.`,
            when: R`[[AsNoTracking]] أو projection لكل الـ GET endpoints. tracking لما هتعدّل: حمّل، عدّل، [[SaveChangesAsync]]. و [[ExecuteUpdateAsync]] و [[ExecuteDeleteAsync]] لتعديلات جماعية أو بسيطة من غير ما تحتاج الـ entity (الدرس الجاي).`,
            mistakes: R`تعدّل entity اتحملت بـ [[AsNoTracking]] وتستنى الحفظ. و DbContext Singleton أو static فالـ tracker يكبر للأبد ويبقى stale. وتحمّل ١٠٠٠٠ entity بـ tracking عشان تعرضهم بس. و [[db.Update()]] على object جاي من الـ request كما هو فتكتب null فوق أعمدة الـ client مبعتهاش.`
          },
          lines: [
            "query عادية: الـ entity متتبعة.",
            R`تعديل في الذاكرة. الحالة بقت [[Modified]].`,
            R`[[1]]: entity واحدة في الـ tracker.`,
            R`[[Modified]].`,
            R`[[AsNoTracking]]: مش متتبعة.`,
            "التعديل ده EF مش شايفه.",
            R`[[1]]: UPDATE واحد بس، للمنتج 1، لعمود [[Price]] بس.`,
            R`[[1 Modified 1]].`
          ],
          sol: R`اللوج فيه [[UPDATE]] واحد: [[UPDATE "Products" SET "Price" = @p0 WHERE "Id" = @p1;]] للمنتج 1 بس، وعمود [[Price]] بس، والـ endpoint رجّع [[{"tracked":1,"state":3,"saved":1}]] (الـ [[3]] هو [[EntityState.Modified]]: الـ enum بيطلع رقم في JSON افتراضيًا، ولو عايز الاسم رجّع [[state.ToString()]]). المنتج 2 اتعدّل في الذاكرة بس ومحدش حفظه.

الـ PUT بالتحميل: [[SELECT ... WHERE "Id" = @id LIMIT 1]] ثم [[UPDATE "Products" SET "Name" = @p0, "Price" = @p1 WHERE "Id" = @p2]] (لو القيم اتغيرت فعلًا؛ لو بعت نفس القيم مفيش UPDATE خالص). بـ [[ExecuteUpdateAsync(s => s.SetProperty(p => p.Name, dto.Name).SetProperty(p => p.Price, dto.Price))]] query واحدة [[UPDATE "Products" AS p SET "Name" = @p, "Price" = @p0 WHERE p."Id" = @id]]، وبترجع عدد الصفوف، فلو 0 ترجع 404.`
        },
        {
          cmd: "transactions و ExecuteUpdate",
          title: "SaveChanges و BeginTransaction و ExecuteUpdate: عمليات لازم تنجح كلها أو تفشل كلها",
          desc: R`[[SaveChangesAsync]] لوحده transaction: كل الـ INSERT و UPDATE اللي فيه بينجحوا مع بعض أو يترجعوا مع بعض. فأغلب الوقت مش محتاج أكتر من إنك تعمل كل تعديلاتك وتنادي SaveChanges مرة واحدة.

لو محتاج كذا SaveChanges أو SQL خام في نفس العملية: [[await using var tx = await db.Database.BeginTransactionAsync()]] وفي الآخر [[CommitAsync]]. لو حصل exception قبل الـ commit، الـ [[using]] بيعمل rollback لوحده.

[[ExecuteUpdateAsync]] و [[ExecuteDeleteAsync]] (من EF Core 7) بيعملوا UPDATE أو DELETE مباشر في SQL من غير تحميل entities ومن غير change tracker. أسرع بكتير للعمليات الجماعية، بس مش بيعدّوا على [[SaveChanges]] فمحتاجين transaction صريحة لو معاهم حاجة تانية.`,
          example: R`public async Task<OrderSummary> PlaceAsync(PlaceOrder cmd, CancellationToken ct)
{
    await using var tx = await db.Database.BeginTransactionAsync(ct);
    var ids = cmd.Lines.Select(l => l.ProductId).ToList();
    var products = await db.Products.Where(p => ids.Contains(p.Id)).ToDictionaryAsync(p => p.Id, ct);
    var order = new Order { CustomerEmail = cmd.CustomerEmail };
    foreach (var line in cmd.Lines)
    {
        if (!products.TryGetValue(line.ProductId, out var p) || p.Stock < line.Quantity)
            throw new OutOfStockException(line.ProductId);
        p.Stock -= line.Quantity;
        order.Items.Add(new OrderItem { ProductId = p.Id, Quantity = line.Quantity, UnitPrice = p.Price });
    }
    db.Orders.Add(order);
    await db.SaveChangesAsync(ct);
    await tx.CommitAsync(ct);
    return new OrderSummary(order.Id, order.CustomerEmail, order.Items.Sum(i => i.UnitPrice * i.Quantity), order.Items.Count);
}
await db.Products.Where(p => p.Stock < 5)
    .ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock + 10), ct);`,
          try: R`اطلب أوردر فيه منتجين، التاني مخزونه مش كفاية: اتأكد إن مخزون الأول متخصمش. وبعدين فكّر: لو طلبين جم في نفس اللحظة على آخر قطعة، الكود ده بيمنع إن الاتنين ينجحوا؟ جرّب تحل ده بـ atomic UPDATE: [[ExecuteUpdateAsync]] بشرط [[p.Stock >= qty]] وتفحص عدد الصفوف.`,
          flag: "script",
          deep: {
            why: R`الطلب ده بيعمل ٣ حاجات: يخصم مخزون، ويعمل order، ويعمل items. لو واحدة فشلت والباقي اتحفظ، عندك مخزون ناقص من غير أوردر، أو أوردر من غير items. الـ transaction بتخلي العملية كلها atomic.`,
            how: R`[[SaveChanges]] بيفتح transaction لو مفيش واحدة مفتوحة، ويبعت كل الـ statements (batched)، ويعمل commit. لو فيه transaction مفتوحة بـ [[BeginTransaction]] بيستخدمها. وأي exception قبل [[CommitAsync]] مع [[await using]] = rollback.

الـ isolation الافتراضي في Postgres [[Read Committed]]: الـ transaction مش بتمنع اتنين يقروا نفس المخزون (5) ويخصموا الاتنين. الحلول: (١) atomic UPDATE بشرط: [[UPDATE ... SET "Stock" = "Stock" - @q WHERE "Id" = @id AND "Stock" >= @q]] وتشوف عدد الصفوف. (٢) optimistic concurrency: عمود version (في Postgres [[xmin]] عبر [[IsConcurrencyToken]] أو [[[Timestamp]]] في SQL Server) و EF بيرمي [[DbUpdateConcurrencyException]] لو حد عدّل قبلك. (٣) [[SELECT ... FOR UPDATE]] بـ [[FromSql]]. (٤) [[IsolationLevel.Serializable]] مع retry.

[[ExecuteUpdateAsync]] بيتحول لـ UPDATE واحد، ومش بيحدّث الـ entities اللي في الذاكرة. و EF 10 بيسمح تبعتله lambda عادية فيها if بدل الـ expression بس.

ولو بتستخدم retry strategy ([[EnableRetryOnFailure]]) لازم تلف الـ transaction اليدوية في [[db.Database.CreateExecutionStrategy().ExecuteAsync(...)]].`,
            when: R`SaveChanges واحد يكفي لأغلب الحالات. [[BeginTransaction]] لما عندك كذا SaveChanges أو Execute أو SQL خام لازم يبقوا مع بعض. atomic UPDATE أو concurrency token لأي عداد أو مخزون أو رصيد. وقارن بـ «transaction» و «atomic UPDATE» و «SELECT FOR UPDATE» و «isolation levels» في «تاب SQL و Prisma».`,
            mistakes: R`SaveChanges جوه loop (transaction و round trip لكل عنصر). وتفتكر إن الـ transaction بتحل race condition على المخزون (مش في Read Committed). وتعمل transaction طويلة فيها HTTP call لـ payment gateway: الـ locks بتفضل ماسكة. وتنسى [[CommitAsync]] فكله يترجع بهدوء.`
          },
          lines: [
            "method في الـ OrderService.",
            "بداية.",
            R`transaction صريحة، و [[await using]] بيعمل rollback لو محصلش commit.`,
            "IDs المنتجات المطلوبة.",
            R`query واحدة بـ [[= ANY(@ids)]] بدل query لكل منتج، في dictionary.`,
            "الأوردر الجديد.",
            "لكل سطر.",
            "بداية.",
            "المنتج مش موجود أو المخزون مش كفاية؟",
            "ارمي: الـ handler بيحوّله 409، والـ transaction بتترجع.",
            "خصم في الذاكرة (متتبع).",
            "item بسعر وقت الطلب.",
            "نهاية.",
            "ضيف الأوردر.",
            "INSERTs و UPDATEs كلهم في نفس الـ transaction.",
            "commit: من هنا بس التغييرات بقت حقيقية.",
            "الملخص.",
            "نهاية.",
            R`UPDATE جماعي مباشر: [[SET "Stock" = p."Stock" + 10 WHERE p."Stock" < 5]].`,
            "من غير تحميل ومن غير SaveChanges."
          ],
          sol: R`طلب [[{"lines":[{"productId":1,"quantity":2},{"productId":2,"quantity":5}]}]] والمنتج 2 مخزونه 3 بيرجع 409 [["title":"Out of stock","detail":"Product 2 is out of stock","productId":2]]، ومخزون المنتج 1 فضل زي ما هو (98 قبل وبعد). الخصم كان في الذاكرة بس، ومحصلش SaveChanges، والـ transaction اترجعت.

الـ race: لأ، الكود ده مش بيمنعها. طلبين بيقروا [[Stock = 1]] مع بعض، والاتنين بيعدّوا الفحص، والاتنين بيكتبوا [[Stock = 0]]، فبعت قطعتين وعندك واحدة. الحل: [[var rows = await db.Products.Where(p => p.Id == id && p.Stock >= qty).ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock - qty), ct); if (rows == 0) throw new OutOfStockException(id);]] الداتابيز بتقفل الصف وقت الـ UPDATE، فالتاني بيستنى ويشوف القيمة الجديدة والشرط بيفشل. خليه جوه نفس الـ transaction مع إنشاء الأوردر.`
        }
      ]
    },
    {
      t: "Auth",
      l: 2,
      n: "JWT bearer، و roles و policies، و ASP.NET Core Identity",
      items: [
        {
          cmd: "JWT bearer",
          title: "JWT bearer: تتحقق من التوكن في كل request",
          desc: R`[[AddAuthentication().AddJwtBearer(...)]] من حزمة [[Microsoft.AspNetCore.Authentication.JwtBearer]] بيقرا [[Authorization: Bearer <token>]] من كل request، ويتحقق من التوقيع والـ issuer والـ audience والصلاحية، ولو سليم بيملى [[HttpContext.User]] بالـ claims. وبعدين [[RequireAuthorization()]] على الـ endpoint أو [[[Authorize]]] على الـ controller.

التوكن نفسه بيتعمل في endpoint الـ login (أو من identity provider برّه زي Auth0 أو Entra أو Keycloak، وده الأفضل في الشركات). المثال بيعمله بـ [[JsonWebTokenHandler]] ومفتاح HMAC من الـ config.

401 = مش عارفك (مفيش توكن أو غلط)، 403 = عارفك بس مش مسموحلك (الدرس الجاي).`,
          example: R`builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = jwt.Issuer,
        ValidAudience = jwt.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
    });
public string Create(string userId, string email, IEnumerable<string> roles)
{
    var claims = new List<Claim> { new(JwtRegisteredClaimNames.Sub, userId), new(JwtRegisteredClaimNames.Email, email) };
    claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));
    var now = clock.GetUtcNow().UtcDateTime;
    return new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
    {
        Issuer = _o.Issuer,
        Audience = _o.Audience,
        Subject = new ClaimsIdentity(claims),
        NotBefore = now,
        Expires = now.AddMinutes(_o.MinutesValid),
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_o.Key)), SecurityAlgorithms.HmacSha256)
    });
}`,
          try: R`اعمل endpoint [[/dev/token]] (في Development بس) بيرجع توكن، وفكّ الـ payload بـ [[cut -d. -f2 | base64 -d]]. وبعدين: (١) ابعت request من غير توكن، (٢) بتوكن توقيعه متغير حرف، (٣) بتوكن منتهي (خلي [[MinutesValid]] سالب). بص على header الـ [[WWW-Authenticate]] في كل حالة.`,
          flag: "script",
          deep: {
            why: R`أغلب APIs اللي بيكلمها SPA أو موبايل بتستخدم JWT. وفهم إيه اللي بيتفحص وفين بيخليك تعرف ليه الـ 401 طالع، وإيه الإعدادات اللي لو غلطت فيها يبقى أي حد يعمل توكن. الأساس في «jwt.sign و jwt.verify» في «تاب Backend بـ Node» وشكل التوكن في «تاب الانترفيو».`,
            how: R`الـ JwtBearer handler بيشتغل من [[UseAuthentication]]. بيفك التوكن، ويتحقق من التوقيع بالمفتاح، ومن [[iss]] و [[aud]] (افتراضيًا [[ValidateIssuer]] و [[ValidateAudience]] و [[ValidateLifetime]] كلهم true)، ومن [[exp]] و [[nbf]] مع سماحية ٥ دقايق ([[ClockSkew]]). لو نجح بيعمل [[ClaimsPrincipal]].

لو فشل، الـ endpoint المحمية بترجع 401 و [[WWW-Authenticate: Bearer error="invalid_token", error_description="The token expired at '...'"]] أو [["The signature key was not found"]] (دي اللي بتطلع لما التوقيع ميطابقش أي مفتاح عنده، مش رسالة أوضح زي «التوقيع غلط»). من غير توكن خالص: [[WWW-Authenticate: Bearer]] بس.

الـ claims: [[ClaimTypes.Role]] اسمه URI طويل، و [[JsonWebTokenHandler]] بيكتبه في التوكن زي ما هو (مش بيختصره لـ [[role]]). عند القراية الـ JwtBearer بيحوّل الأسماء القصيرة المعروفة ([[role]] و [[sub]] و [[email]]) للـ URIs (لأن [[MapInboundClaims]] true افتراضيًا)، فـ [[RequireRole]] و [[User.IsInRole]] بيشتغلوا سواء التوكن فيه [[role]] (من identity provider) أو الـ URI. ونفس الكلام [[sub]] بيبقى [[ClaimTypes.NameIdentifier]].

مع identity provider برّه متحطش مفتاح: [[o.Authority = "https://login.example.com"]] و [[o.Audience = "shop-api"]]، والـ handler بيجيب المفاتيح العامة من [[/.well-known/openid-configuration]] (JWKS) ويحدّثها لوحده.

[[HMAC]] (مفتاح واحد للتوقيع والتحقق) مناسب لو نفس الـ API بيعمل ويتحقق. لو كذا service بتتحقق، RSA أو ECDSA (مفتاح خاص للتوقيع وعام للتحقق).`,
            when: R`JWT للـ APIs اللي بيكلمها موبايل أو SPA على domain تاني أو services تانية. لـ SPA على نفس الـ domain، الـ cookie (HttpOnly) بـ Identity أبسط وأأمن ضد XSS. وقارن «JWT ولا session» في «تاب Backend بـ Node».`,
            mistakes: R`مفتاح قصير أو في git (HMAC-SHA256 محتاج 32 byte على الأقل، والـ handler بيرمي لو أقصر). و [[ValidateLifetime = false]] أو [[ValidateIssuer = false]] عشان «الـ 401 يختفي». وتوكن صلاحيته شهور من غير refresh. وتحط داتا حساسة في الـ payload (مش مشفّر، مجرد base64). وتنسى [[UseAuthentication]] قبل [[UseAuthorization]].`
          },
          lines: [
            R`الـ scheme الافتراضي: Bearer.`,
            "إعدادات التحقق.",
            "بداية.",
            R`لازم [[iss]] يساوي ده.`,
            R`و [[aud]].`,
            "المفتاح اللي اتوقّع بيه.",
            "نهاية.",
            R`method في [[TokenService]]: بتعمل التوكن.`,
            "بداية.",
            R`[[sub]] و [[email]] claims.`,
            R`كل role كـ claim (بيطلع في الـ JSON باسم الـ URI الطويل، مش [[role]]).`,
            R`[[TimeProvider]] بدل [[DateTime.UtcNow]] عشان تقدر تتحكم فيه في الاختبارات.`,
            R`[[JsonWebTokenHandler]]: الـ handler الحديث (أسرع من [[JwtSecurityTokenHandler]] القديم).`,
            "بداية.",
            "المصدر.",
            "الجمهور.",
            "الـ claims.",
            R`[[nbf]].`,
            R`[[exp]].`,
            R`توقيع HMAC-SHA256.`,
            "بالمفتاح من الإعدادات.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`الـ payload بعد الفك: [[{"aud":"shop-api","iss":"shop-dev","exp":1790745678,"nbf":1790742078,"sub":"sara@x.com","email":"sara@x.com","iat":1790742078}]] (ومع admin بيبقى فيه [["http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"admin"]]، لأن [[ClaimTypes.Role]] بيتكتب زي ما هو). أي حد يقدر يقراه، فمتحطش فيه أسرار.

(١) من غير توكن: 401 و [[WWW-Authenticate: Bearer]]. (٢) توقيع متغير: 401 و [[WWW-Authenticate: Bearer error="invalid_token", error_description="The signature key was not found"]] (الرسالة مش «signature invalid»: الـ handler بيدور على مفتاح يطابق التوقيع ومبيلاقيش). (٣) منتهي: 401 و [[error_description="The token expired at '09/30/2026 03:54:30'"]]. لو التوكن المنتهي لسه شغال، افتكر الـ [[ClockSkew]] الافتراضي ٥ دقايق: خلي [[MinutesValid = -10]] أو [[ClockSkew = TimeSpan.Zero]]. ولو الـ token سليم ولسه 401، بص على ترتيب [[UseAuthentication]] و [[UseAuthorization]] (درس middleware).`
        },
        {
          cmd: "authorization policies",
          title: "roles و policies: مين مسموحله يعمل إيه",
          desc: R`بعد ما عرفت المستخدم (authentication)، الـ authorization بيقرر. أبسط شكل: [[RequireAuthorization()]] = أي حد مسجل. بالـ role: [[.RequireAuthorization(p => p.RequireRole("admin"))]]. والأنضف: policies باسم بتتعرف مرة في [[AddAuthorizationBuilder().AddPolicy("Admin", p => p.RequireRole("admin"))]] وتستخدمها [[RequireAuthorization("Admin")]] أو [[[Authorize(Policy = "Admin")]]].

الـ policy ممكن تبقى على claim ([[RequireClaim("plan", "pro")]])، أو شرط مخصص ([[RequireAssertion(ctx => ...)]])، أو handler كامل بياخد services من الـ DI.

وملكية الـ resource («الأوردر ده بتاعك؟») مش role: بتفحصها جوه الـ endpoint أو بـ resource-based authorization ([[IAuthorizationService.AuthorizeAsync(User, order, "OwnsOrder")]]).`,
          example: R`builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", p => p.RequireRole("admin"))
    .AddPolicy("ProPlan", p => p.RequireClaim("plan", "pro", "enterprise"));
g.MapPost("/", CreateProduct).RequireAuthorization("Admin");
g.MapGet("/reports", GetReports).RequireAuthorization("ProPlan");
app.MapGet("/me", (ClaimsPrincipal user) => new
{
    id = user.FindFirstValue(ClaimTypes.NameIdentifier),
    email = user.FindFirstValue(ClaimTypes.Email),
    isAdmin = user.IsInRole("admin")
}).RequireAuthorization();
app.MapGet("/api/orders/{id:int}", async (int id, ClaimsPrincipal user, ShopDb db) =>
{
    var order = await db.Orders.FindAsync(id);
    if (order is null) return Results.NotFound();
    return order.CustomerEmail == user.FindFirstValue(ClaimTypes.Email) || user.IsInRole("admin")
        ? Results.Ok(order) : Results.NotFound();
}).RequireAuthorization();`,
          try: R`بتوكن user عادي جرّب [[POST /api/products]] (المتوقع 403)، وبتوكن admin (201). وبعدين جرّب تجيب أوردر بتاع user تاني. ليه المثال بيرجع 404 مش 403 في الحالة دي؟`,
          flag: "script",
          deep: {
            why: R`أشهر ثغرة في APIs (رقم ١ في OWASP API Top 10) هي Broken Object Level Authorization: المستخدم يغيّر الـ id في الـ URL فيشوف داتا حد تاني. الـ roles مش بتحل دي. لازم تفهم الفرق بين «هل مسموحلك بالعملية» و «هل مسموحلك بالـ object ده». شوف «ownership (IDOR)» في «تاب Backend بـ Node» و «1. Broken Access Control» في «تاب الأمان».`,
            how: R`[[UseAuthorization]] بيبص على الـ metadata بتاعة الـ endpoint المختار (policies و roles و [[AllowAnonymous]])، ويشغّل الـ requirements على [[HttpContext.User]]. مفيش user = 401 (challenge). فيه user بس الـ policy فشلت = 403 (forbid).

الـ policy = قايمة requirements، كلهم لازم ينجحوا. [[RequireRole("a", "b")]] = أي واحد منهم. ولو حطيت [[RequireAuthorization]] مرتين بـ policies مختلفة، الاتنين لازم ينجحوا.

تقدر تحط policy على الـ group كله: [[app.MapGroup("/admin").RequireAuthorization("Admin")]]، وتستثني endpoint بـ [[AllowAnonymous()]]. أو تعمل [[FallbackPolicy]] بتطلب auth لكل حاجة إلا المستثنى (أأمن: الافتراضي مقفول).

[[ClaimsPrincipal user]] كـ parameter بياخد [[HttpContext.User]]. و [[FindFirstValue]] من [[System.Security.Claims]].`,
            when: R`roles للأدوار الواسعة (admin، support). claims و policies للخطط والصلاحيات الدقيقة. فحص الملكية في كل endpoint بيجيب أو يعدّل resource بـ id. و [[FallbackPolicy]] مع [[RequireAuthenticatedUser]] في أي API داخلي.`,
            mistakes: R`تعتمد على إن الـ frontend بيخبي الزرار. وتفحص الـ role بس وتنسى الملكية. وترجع 403 لـ object مش بتاعه فتأكدله إنه موجود (404 أأمن غالبًا). وتحط الـ roles في التوكن وتنسى إنها مش هتتحدث لحد ما التوكن يخلص.`
          },
          lines: [
            "بيسجّل الـ authorization ويعرّف policies.",
            R`policy باسم [[Admin]]: لازم role admin.`,
            R`policy على claim: [[plan]] قيمته pro أو enterprise.`,
            R`الـ endpoint محتاج الـ policy: user عادي = 403، مفيش توكن = 401.`,
            "endpoint تاني بـ policy تانية.",
            R`[[ClaimsPrincipal]]: الـ user الحالي من التوكن.`,
            "بداية الـ anonymous object.",
            R`[[sub]] بيتقري كـ [[NameIdentifier]].`,
            "الإيميل.",
            "role.",
            R`أي user مسجل (من غير policy).`,
            "فحص الملكية.",
            "بداية.",
            "هات الأوردر.",
            "مش موجود.",
            "بتاعه أو admin؟",
            R`لو لأ: 404 كأنه مش موجود (مش 403).`,
            "لازم يكون مسجل دخول الأول."
          ],
          sol: R`user عادي: [[POST /api/products]] بترجع 403 بـ ProblemDetails [["title":"Forbidden"]]، و admin بترجع 201 و [[Location: /api/products/4]]. من غير توكن خالص 401. ده اللي بيتفحص في الـ integration test في المستوى ٣.

أوردر حد تاني بيرجع 404 عمدًا: لو رجعت 403 انت كده قلت للمهاجم «الأوردر رقم 1234 موجود، بس مش بتاعك»، فيقدر يعد الأوردرات ويعرف حجم البيزنس. 404 مبتكشفش حاجة. الأنضف إنك تحط الشرط في الـ query نفسها: [[db.Orders.Where(o => o.Id == id && o.CustomerEmail == email)]] فالـ object مش بيتحمل أصلًا.`
        },
        {
          cmd: "ASP.NET Core Identity",
          title: "ASP.NET Core Identity: تسجيل ودخول وباسوردات من غير ما تكتبهم بإيدك",
          desc: R`Identity هو نظام المستخدمين الجاهز: جداول users و roles و claims في EF Core، و hashing للباسوردات (PBKDF2)، وقواعد قوة الباسورد، و lockout بعد محاولات فاشلة، وتأكيد الإيميل، و 2FA.

من .NET 8 فيه [[MapIdentityApi<IdentityUser>()]] بيضيف endpoints جاهزة للـ APIs: [[/register]] و [[/login]] و [[/refresh]] و [[/confirmEmail]] و [[/forgotPassword]] و [[/manage/2fa]]. الـ login بيرجع يا cookie يا bearer token.

مهم: الـ bearer token بتاع Identity مش JWT. ده token مشفّر بـ Data Protection بيفهمه نفس التطبيق بس. لو محتاج JWT يتفهم من services تانية، اعمله انت (الدرس اللي فات) أو استخدم identity provider.`,
          example: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
#:package Microsoft.AspNetCore.Identity.EntityFrameworkCore@10.0.12
#:package Npgsql.EntityFrameworkCore.PostgreSQL@10.0.3
#:package Microsoft.EntityFrameworkCore.Relational@10.0.12
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDb>(o => o.UseNpgsql("Host=localhost;Database=shop_identity;Username=shop;Password=shop"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AppDb>();
var app = builder.Build();
using (var scope = app.Services.CreateScope())
    scope.ServiceProvider.GetRequiredService<AppDb>().Database.EnsureCreated();
app.MapGroup("/account").MapIdentityApi<IdentityUser>();
app.MapGet("/me", (ClaimsPrincipal user) => new { name = user.Identity!.Name }).RequireAuthorization();
app.Run();
class AppDb(DbContextOptions<AppDb> o) : IdentityDbContext<IdentityUser>(o);`,
          try: R`شغّل الملف ده، وسجّل بباسورد ضعيف [["weak"]] واقرا الأخطاء. وبعدين سجّل بباسورد قوي، واعمل login، وخد الـ [[accessToken]] وجرّب [[/me]]. وفكّ التوكن بـ [[base64 -d]] زي JWT: بيطلع إيه؟`,
          flag: "script",
          deep: {
            why: R`كتابة نظام users من الصفر (hashing صح، و lockout، و reset password، و 2FA) مكان ممتاز لثغرات. Identity متختبر من سنين. وفي الشركات هتلاقيه في أغلب مشاريع .NET اللي مش بتستخدم identity provider خارجي.`,
            how: R`[[IdentityDbContext<IdentityUser>]] بيضيف جداول [[AspNetUsers]] و [[AspNetRoles]] و [[AspNetUserRoles]] و [[AspNetUserClaims]] و [[AspNetUserLogins]] و [[AspNetUserTokens]]، وبتعمل ليها migrations عادي. [[UserManager<T>]] و [[SignInManager<T>]] الـ services اللي بتستخدمها لو عايز endpoints بتاعتك.

[[AddIdentityApiEndpoints]] بيسجّل Identity + cookie scheme + bearer token scheme. [[/login]] بيرجع [[{"tokenType":"Bearer","accessToken":"...","expiresIn":3600,"refreshToken":"..."}]]، أو cookie لو بعت [[?useCookies=true]]. الـ tokens محمية بـ Data Protection keys: لو عندك كذا instance لازم يتشاركوا نفس المفاتيح (تخزنها في Redis أو DB أو ملف مشترك)، وإلا التوكن اللي طلع من instance مش هيتفهم في التانية. ونفس الكلام لو المفاتيح اتمسحت مع الـ container.

قواعد الباسورد والـ lockout بتتظبط في [[builder.Services.Configure<IdentityOptions>(o => ...)]].

[[EnsureCreated]] في المثال للتجربة بس: بيعمل الجداول من غير migrations، ومينفعش تعمل migrations بعده. في مشروع حقيقي [[dotnet ef migrations add Identity]].`,
            when: R`Identity لو التطبيق بيدير مستخدميه بنفسه (B2C صغير، لوحة تحكم). identity provider (Keycloak، Auth0، Entra ID، Cognito) لو فيه كذا تطبيق أو SSO أو متطلبات أمان عالية، والـ API ساعتها بيتحقق من JWT بس بـ [[Authority]]. وشوف «SSO للشركات» و «jose و JWKS» في «تاب APIs متقدمة».`,
            mistakes: R`تعمل hashing بإيدك بـ SHA256 من غير salt. وتفتكر توكن Identity JWT وتحاول تتحقق منه في service تانية. وتنسى Data Protection keys في Docker فكل restart يطلّع المستخدمين (فيه warning في اللوج: [[Storing keys in a directory ... that may not be persisted outside of the container]]). و [[EnsureCreated]] في الإنتاج.`
          },
          lines: [
            "claims.",
            "Identity.",
            "EF Identity stores.",
            "EF Core.",
            "builder.",
            R`الـ DbContext بتاع Identity (connection string مكتوب هنا للتجربة بس).`,
            "authorization.",
            "Identity + bearer tokens + cookies.",
            "الـ users في EF Core.",
            "build.",
            "scope مؤقت عشان الـ DbContext Scoped.",
            R`بيعمل الجداول لو مش موجودة (للتجربة، مش migrations).`,
            R`[[/account/register]] و [[/account/login]] وغيرهم.`,
            "endpoint محمية بتقرا اسم الـ user.",
            "run.",
            R`[[IdentityDbContext]] فيه جداول AspNetUsers وأخواتها.`
          ],
          sol: R`الباسورد الضعيف: 400 و [["errors":{"PasswordTooShort":["Passwords must be at least 6 characters."],"PasswordRequiresNonAlphanumeric":[...],"PasswordRequiresDigit":[...],"PasswordRequiresUpper":[...]}]]. بباسورد [[Str0ng!Pass]] الـ register بيرجع 200 من غير body، والـ login بيرجع [[{"tokenType":"Bearer","accessToken":"CfDJ8F6H...","expiresIn":3600,"refreshToken":"..."}]]. و [[/me]] بالتوكن بيرجع [[{"name":"sara@x.com"}]]، ومن غيره 401.

والفك بـ base64: مش هيطلع JSON. التوكن بيبدأ بـ [[CfDJ8]] (علامة Data Protection) وهو bytes مشفرة، مش header.payload.signature. عشان كده service تانية مش هتعرف تتحقق منه، والتطبيق نفسه لو اتعمله restart في container من غير ما تحفظ الـ keys، كل التوكنات القديمة هتبقى 401.`
        }
      ]
    },
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

عشان الـ factory تلاقي [[Program]]، ضيف في آخر [[Program.cs]]: [[public partial class Program;]].`,
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
          try: R`اكتب اختبار [[Creating_a_product_needs_the_admin_role]]: نفس الـ POST تلات مرات (من غير توكن، وبتوكن user، وبتوكن admin) وتتأكد من 401 و 403 و 201. التوكن اعمله من [[TokenService]] اللي في [[factory.Services]]. وبعدين شيل [[public partial class Program;]] وشوف الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ unit tests مش بتختبر الـ routing والـ binding والـ validation والـ auth والـ EF mapping مع بعض، ودول مكان أغلب الـ bugs في API. اختبار integration واحد بيعدي على كل الطبقات بيمسك حاجات عشر unit tests مش هيمسكوها. نفس فكرة supertest في «تاب Backend بـ Node».`,
            how: R`الـ factory بيشغّل [[Program.cs]] بـ [[TestServer]] بدل Kestrel: الـ [[HttpClient]] اللي بيرجع من [[CreateClient()]] بيبعت الـ requests في الذاكرة مباشرة للـ pipeline.

[[UseSetting]] بيحط قيم configuration بدري كفاية إن [[Program.cs]] يشوفها وهو بيسجّل الـ services (زي [[GetConnectionString]] اللي بيتقري وقت [[AddDbContext]]). [[ConfigureTestServices]] بيشتغل بعد تسجيلات [[Program.cs]]، فتقدر تشيل أو تبدّل ([[RemoveAll<T>]] ثم [[AddSingleton<T>(fake)]]).

[[IClassFixture<ApiFactory>]] بيعمل factory واحدة لكل الاختبارات في الـ class (التطبيق بيقوم مرة). و [[IAsyncLifetime]] على الـ factory بيجهّز الداتابيز قبل أول اختبار. [[factory.Services]] هو الـ DI container الحقيقي، فتقدر تطلب منه services (بـ scope للـ scoped).

الداتابيز: Postgres حقيقي أحسن من in-memory provider (اللي مبيعملش constraints ولا SQL حقيقي). في CI: service container في GitHub Actions، أو Testcontainers ([[Testcontainers.PostgreSql]]) بيقوّم Postgres في Docker لكل test run.`,
            when: R`اختبار أو اتنين لكل endpoint: الحالة السعيدة، والـ validation، والـ auth (401 و 403)، و 404. الـ edge cases الكتير في unit tests على الـ service. وخلي الداتابيز تتعمل من الأول في كل run عشان الاختبارات متعتمدش على داتا قديمة.`,
            mistakes: R`تستخدم in-memory provider وتفتكر إن الـ unique indexes اتختبرت. وتنسى [[public partial class Program;]]. وتسيب الـ BackgroundService شغال في الاختبارات فيعمل queries عشوائية. واختبارات بتعدّل نفس الصفوف بالتوازي من classes مختلفة. ونسخ EF مختلفة في مشروع الاختبار فيقع بـ [[ReflectionTypeLoadException]] (حصلت هنا: شوف درس DbContext).`
          },
          lines: [
            R`factory لـ [[Program]] (من [[public partial class Program;]]).`,
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

من غير [[public partial class Program;]]: [[error CS0122: 'Program' is inaccessible due to its protection level]]، لأن الـ top-level statements بتعمل [[Program]] internal. (بديل: [[InternalsVisibleTo]] في الـ csproj.)`,
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
    },
    {
      t: "شغل في الخلفية و caching و HttpClient",
      l: 3,
      n: "BackgroundService و IServiceScopeFactory، و HybridCache و output caching، و IHttpClientFactory",
      items: [
        {
          cmd: "BackgroundService",
          title: "BackgroundService: شغل دوري جوه نفس التطبيق",
          desc: R`لو محتاج حاجة تشتغل في الخلفية (تنضيف كل ساعة، تقرير مخزون، consumer لـ queue)، اعمل class بتورث [[BackgroundService]] وتعمل override لـ [[ExecuteAsync(CancellationToken stoppingToken)]]، وسجّلها بـ [[AddHostedService<T>()]]. بتقوم مع التطبيق وبتقف معاه.

الـ hosted service Singleton، فمينفعش تطلب [[ShopDb]] (Scoped) في الـ constructor. خد [[IServiceScopeFactory]] واعمل scope جديد في كل دورة.

و [[PeriodicTimer]] أنضف من [[Task.Delay]] في loop: مبيتراكمش، وبيحترم الإلغاء.`,
          example: R`public class LowStockReporter(IServiceScopeFactory scopes, ILogger<LowStockReporter> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(10));
        do
        {
            try
            {
                await using var scope = scopes.CreateAsyncScope();
                var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
                var low = await db.Products.CountAsync(p => p.Stock < 5, stoppingToken);
                logger.LogInformation("Low stock products: {Count}", low);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogError(ex, "Low stock check failed");
            }
        } while (await timer.WaitForNextTickAsync(stoppingToken));
    }
}
builder.Services.AddHostedService<LowStockReporter>();`,
          try: R`شغّل التطبيق وبص على اللوج كل ١٠ ثواني. وبعدين اطفي Postgres ([[sudo service postgresql stop]]) وشوف التطبيق بيعمل إيه، وشغّله تاني. وجرّب تشيل الـ try/catch وتعمل نفس التجربة.`,
          flag: "script",
          deep: {
            why: R`حاجات كتير مش جزء من request: إيميلات متأخرة، وتنضيف توكنات منتهية، وsync مع API تاني. في Node بتحطها في cron أو worker منفصل. في .NET تقدر تحطها جوه نفس البروسيس بسهولة، وده كفاية لحد ما الشغل يكبر.`,
            how: R`الـ host بينادي [[StartAsync]] لكل hosted service وقت الـ startup، و [[BackgroundService]] بينادي [[ExecuteAsync]] ويسيبها شغالة. وقت الإيقاف (Ctrl+C أو SIGTERM من Docker أو systemd) بيلغي [[stoppingToken]] ويستنى لحد [[HostOptions.ShutdownTimeout]] (٣٠ ثانية افتراضيًا).

من .NET 8 أي exception مش ممسوك جوه [[ExecuteAsync]] بيوقف التطبيق كله ([[BackgroundServiceExceptionBehavior.StopHost]]) وبيسجل [[BackgroundService failed]]. عشان كده الـ try/catch جوه الـ loop مهم: دورة فشلت متوقعش السيرفر. والـ [[when (ex is not OperationCanceledException)]] عشان الإلغاء وقت الإيقاف يعدّي طبيعي.

[[CreateAsyncScope]] بيعمل scope زي بتاع الـ request: DbContext جديد لكل دورة، وبيتعمله dispose في الآخر. و [[PeriodicTimer.WaitForNextTickAsync]] بيرجع false أو بيرمي لما الـ token يتلغي.

لو التطبيق شغال على كذا instance، الـ background service بيشتغل على كل واحدة: محتاج lock موزع (Redis، أو [[pg_advisory_lock]]) أو scheduler خارجي.`,
            when: R`شغل خفيف ودوري جوه API واحد. لشغل تقيل أو محتاج retries و scheduling حقيقي: queue (RabbitMQ، Azure Service Bus، SQS) مع worker منفصل ([[dotnet new worker]])، أو مكتبة زي Hangfire أو Quartz.NET. وللـ cron على السيرفر شوف «systemd timer» في «تاب VPS».`,
            mistakes: R`تطلب DbContext في الـ constructor: [[Cannot consume scoped service 'ShopDb' from singleton]]. ومفيش try/catch فأول خطأ شبكة يقفل التطبيق كله. وتتجاهل [[stoppingToken]] فالإيقاف ياخد ٣٠ ثانية ويتقتل. وشغل تقيل CPU في الـ ExecuteAsync بيسرق من الـ requests.`
          },
          lines: [
            R`بتورث [[BackgroundService]]، وبتاخد [[IServiceScopeFactory]] مش الـ DbContext.`,
            "بداية.",
            R`بتتنادى مرة وقت الـ startup، والـ token بيتلغي وقت الإيقاف.`,
            "بداية.",
            R`timer كل ١٠ ثواني، و [[using]] عشان يقفل.`,
            R`[[do]]: أول دورة على طول من غير ما تستنى.`,
            "بداية.",
            "try جوه الـ loop.",
            "بداية.",
            "scope جديد لكل دورة = DbContext جديد.",
            "الـ context من الـ scope.",
            R`[[SELECT count(*) ... WHERE "Stock" < 5]].`,
            "structured log.",
            "نهاية.",
            "أي خطأ إلا الإلغاء.",
            "بداية.",
            "سجّل وكمّل للدورة الجاية بدل ما تقع.",
            "نهاية.",
            R`استنى الـ tick الجاي، أو اخرج لما التطبيق يقف.`,
            "نهاية.",
            "نهاية.",
            "تسجيل."
          ],
          sol: R`اللوج كل ١٠ ثواني: [[info: Shop.Api.Services.LowStockReporter[0] Low stock products: 1]] ومعاه الـ SQL لو EF Command على Information. بعد ما Postgres يقف: [[fail: ... Low stock check failed]] ومعاه [[Npgsql.NpgsqlException: Failed to connect to 127.0.0.1:5432]]، والتطبيق لسه شغال، والـ API نفسه بيرجع 500 للـ endpoints اللي محتاجة الداتابيز بس. أول ما Postgres يرجع، الدورة الجاية تنجح لوحدها.

من غير الـ try/catch: أول فشل بيطلّع [[fail: Microsoft.Extensions.Hosting.Internal.Host[9] BackgroundService failed]] وبعدها [[The HostOptions.BackgroundServiceExceptionBehavior is configured to StopHost]] والتطبيق كله بيقف، حتى الـ endpoints اللي ملهاش علاقة. في الإنتاج systemd أو Docker هيعيد تشغيله، بس الأحسن متوصلش لكده.`
        },
        {
          cmd: "HybridCache و output caching",
          title: "caching: HybridCache للداتا و Output Cache للردود كاملة",
          desc: R`[[HybridCache]] (حزمة [[Microsoft.Extensions.Caching.Hybrid]]، من .NET 9) هو الـ API الموصى بيه للـ cache: [[GetOrCreateAsync(key, factory)]] بيرجع من الـ cache أو بينادي الـ factory مرة واحدة حتى لو ١٠٠ request طلبوا نفس المفتاح مع بعض (stampede protection). وبيشتغل على طبقتين: ذاكرة محلية + distributed cache (Redis) لو سجلته.

Output caching ([[AddOutputCache]] و [[.CacheOutput()]]) بيكاش الـ HTTP response كله على السيرفر: الـ endpoint مش بيتنادى أصلًا طول مدة الـ cache.

وفيه [[IMemoryCache]] القديم (ذاكرة بس، من غير stampede protection)، والـ response caching (headers للـ browser و CDN زي [[Cache-Control]]).`,
          example: R`builder.Services.AddHybridCache(o => o.DefaultEntryOptions = new() { Expiration = TimeSpan.FromMinutes(5) });
builder.Services.AddOutputCache();
app.UseOutputCache();
app.MapGet("/products/{id:int}", async (int id, HybridCache cache, ShopDb db, CancellationToken ct) =>
    await cache.GetOrCreateAsync($"product:{id}", async token =>
        await db.Products.Where(p => p.Id == id)
            .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
            .FirstOrDefaultAsync(token),
        tags: ["products"], cancellationToken: ct));
app.MapPut("/products/{id:int}/price", async (int id, decimal price, ShopDb db, HybridCache cache) =>
{
    await db.Products.Where(p => p.Id == id).ExecuteUpdateAsync(s => s.SetProperty(p => p.Price, price));
    await cache.RemoveAsync($"product:{id}");
    return Results.NoContent();
});
app.MapGet("/time", () => DateTime.UtcNow.ToString("HH:mm:ss.fff"))
    .CacheOutput(p => p.Expire(TimeSpan.FromSeconds(10)));`,
          try: R`اعمل endpoint فيه [[await Task.Delay(200)]] جوه الـ factory وعداد بيزيد مع كل نداء للـ factory، واطلبه ٣ مرات وقيس الوقت ([[curl -w "%{time_total}"]]). وبعدين امسح المفتاح واطلبه تاني. وكمان اطلب [[/time]] مرتين ورا بعض.`,
          flag: "script",
          deep: {
            why: R`أرخص query هي اللي متتعملش. صفحة المنتج بتتقري آلاف المرات وبتتغير مرة في اليوم. بس الـ cache من غير خطة invalidation بيعرض أسعار قديمة، والـ cache اللي بيفضى فجأة تحت ضغط بيخلي كل الـ requests تضرب الداتابيز مع بعض (stampede).`,
            how: R`[[GetOrCreateAsync]]: يدوّر في الـ L1 (الذاكرة)، بعدين الـ L2 (لو فيه [[IDistributedCache]] متسجل زي Redis بـ [[AddStackExchangeRedisCache]])، ولو مش لاقي ينادي الـ factory، ولو كذا request على نفس المفتاح في نفس اللحظة واحد بس بينادي والباقي بيستنوا نتيجته. القيم بتتعمل serialize لما تروح L2.

الـ tags ([["products"]]) بتخليك تمسح مجموعة مفاتيح مرة واحدة بـ [[RemoveByTagAsync("products")]]. و [[RemoveAsync(key)]] بعد أي تعديل. و [[LocalCacheExpiration]] ممكن تبقى أقصر من [[Expiration]] عشان النسخ المحلية على كذا سيرفر متفضلش قديمة كتير.

Output cache: الـ middleware بيخزن الـ status والـ headers والـ body بمفتاح من الـ path والـ query، ويرجّعه من غير ما الـ endpoint يشتغل. افتراضيًا بيكاش GET و HEAD بـ 200 بس ومش بيكاش لو الـ request فيه auth. وفيه tags و [[IOutputCacheStore.EvictByTagAsync]]، ولو كذا instance تقدر تخزنه في Redis.

الـ cache بيخزن نتيجة الـ factory حتى لو null، فمنتج مش موجود هيتكاش كـ null لنفس المدة (ده كويس ضد الـ spam، بس خليك عارف).`,
            when: R`HybridCache لداتا بتتقري كتير ومش لازم تبقى لحظية (كتالوج، إعدادات، أسعار الصرف). Output cache لـ endpoints عامة من غير auth وبتتطلب كتير. [[Cache-Control]] headers للـ CDN والمتصفح (شوف «ETag و Cache-Control» في «تاب APIs متقدمة»). ومتكاشش داتا خاصة بمستخدم بمفتاح مفيهوش الـ user id.`,
            mistakes: R`تنسى تمسح الـ cache بعد التعديل. ومفتاح cache مش فيه كل اللي بيأثر على النتيجة (اللغة، الـ tenant، الـ user). و [[IMemoryCache]] على كذا instance فكل سيرفر يعرض نسخة. وتكاش entities متتبعة من EF أو objects بتتعدّل بعد التخزين (الـ L1 بيرجع نفس الـ object لو [[ImmutableObject]]، وإلا نسخة).`
          },
          lines: [
            "HybridCache بمدة افتراضية ٥ دقايق.",
            "output cache services.",
            "output cache middleware.",
            "endpoint بيقرا من الـ cache الأول.",
            R`المفتاح [[product:1]]، والـ factory بتتنادى بس لو مش موجود.`,
            "الـ query.",
            "projection لـ DTO (مش entity متتبعة).",
            "تنفيذ بالـ token بتاع الـ factory.",
            R`tag للمسح الجماعي، و token الـ request.`,
            "تعديل.",
            "بداية.",
            "UPDATE مباشر.",
            "امسح المفتاح عشان القراية الجاية تجيب الجديد.",
            "204.",
            "نهاية.",
            "endpoint بسيط.",
            "الرد كله متكاش ١٠ ثواني: الـ handler مش بيتنادى."
          ],
          sol: R`عندنا: أول request [[0.465s]] (الـ factory اشتغلت: 200ms delay + أول مرة)، والتاني [[0.0035s]]، والتالت [[0.0016s]]، والعداد [[{"dbCalls":1}]]. بعد [[RemoveAsync]] الـ request الجاي نادى الـ factory تاني والعداد بقى 2.

[[/time]] مرتين ورا بعض بيرجع نفس الوقت بالظبط ([[04:28:34.703]] في الاتنين) لحد ما العشر ثواني يخلصوا، لأن الـ endpoint نفسه مش بيتنادى. لو لقيت الوقت بيتغير: اتأكد إن [[app.UseOutputCache()]] موجود، وإنك مش باعت [[Authorization]] header، وإن الـ middleware بعد [[UseCors]] وقبل الـ endpoints.`
        },
        {
          cmd: "IHttpClientFactory",
          title: "HttpClient صح: IHttpClientFactory و typed clients و retries",
          desc: R`[[new HttpClient()]] في كل request غلطة مشهورة: كل واحد بيفتح connections جديدة، وتحت الضغط بتخلص الـ sockets. و HttpClient واحد static للأبد مشكلته إنه مش بيشوف تغيير الـ DNS.

الحل: [[builder.Services.AddHttpClient<RatesClient>(c => c.BaseAddress = ...)]]. ده typed client: class بتاخد [[HttpClient]] في الـ constructor، والـ factory بيديها client جاهز بالإعدادات، والـ connections بتتشارك وبتتجدد لوحدها.

وللـ resilience (retries، timeout، circuit breaker) فيه [[Microsoft.Extensions.Http.Resilience]]: [[.AddStandardResilienceHandler()]] سطر واحد فوق الـ AddHttpClient.`,
          example: R`builder.Services.AddHttpClient<RatesClient>(c =>
{
    c.BaseAddress = new Uri("https://api.nuget.org/");
    c.Timeout = TimeSpan.FromSeconds(5);
});
app.MapGet("/nuget", async (RatesClient c, CancellationToken ct) => await c.GetVersionAsync(ct));
class RatesClient(HttpClient http)
{
    public async Task<string> GetVersionAsync(CancellationToken ct)
    {
        var doc = await http.GetFromJsonAsync<JsonElement>("v3/index.json", ct);
        return doc.GetProperty("version").GetString()!;
    }
}`,
          try: R`ضيف [[Microsoft.Extensions.Http.Resilience]] و [[.AddStandardResilienceHandler()]] على الـ client، وخلي الـ BaseAddress يشاور على حاجة مش موجودة ([[http://localhost:1/]]). بص على اللوج: كام محاولة اتعملت قبل ما يستسلم؟`,
          flag: "script",
          deep: {
            why: R`أي API بيكلم APIs تانية: payment، شحن، SMS، AI. التعامل الغلط مع HttpClient بيوقع السيرفر تحت الضغط، وغياب الـ timeouts والـ retries بيخلي service تانية بطيئة توقف API بتاعك كله.`,
            how: R`[[HttpClient]] نفسه wrapper خفيف، والتقيل هو الـ [[HttpMessageHandler]] (الـ connection pool). الـ factory بيعمل handlers ويعيد استخدامها لمدة (دقيقتين افتراضيًا) وبعدين يجددها عشان الـ DNS، ويدي كل typed client instance جديد من [[HttpClient]] فوق handler مشترك. الـ typed client نفسه بيتسجل Transient.

[[GetFromJsonAsync<T>]] من [[System.Net.Http.Json]]: GET + فحص إن الـ status نجاح (وإلا [[HttpRequestException]]) + deserialize. و [[c.Timeout]] للـ request كله، و [[CancellationToken]] الـ request فوقه.

[[AddStandardResilienceHandler]] (مبني على Polly v8) بيضيف: rate limiter، و timeout كلي (30 ثانية)، و retry (3 مرات بـ exponential backoff و jitter، على 5xx و 408 و 429 وأخطاء الشبكة)، و circuit breaker (لو نسبة الفشل عالية بيوقف المحاولات شوية)، و timeout لكل محاولة (10 ثواني).

وفيه named clients ([[AddHttpClient("github", ...)]] و [[IHttpClientFactory.CreateClient("github")]]) لو مش عايز class.`,
            when: R`دايمًا [[AddHttpClient]] في ASP.NET Core. typed client لكل API خارجي، والمنطق (URLs والـ DTOs) جواه مش متفرق. resilience handler على أي API برّه شبكتك، ومش على الـ POST اللي مش idempotent من غير Idempotency-Key (شوف «Idempotency-Key» في «تاب APIs متقدمة»).`,
            mistakes: R`[[using var client = new HttpClient()]] في كل request (socket exhaustion). و typed client Singleton أو تتحقن في Singleton (بيمسك handler قديم للأبد، ومش بيشوف الـ DNS). ومفيش timeout (الافتراضي 100 ثانية). و retry على POST بيدفع فلوس فيدفع مرتين.`
          },
          lines: [
            R`typed client: بيتسجل ومعاه الإعدادات.`,
            "بداية.",
            "كل الـ requests relative للـ URL ده.",
            "timeout.",
            "نهاية.",
            R`الـ endpoint بياخد الـ client من الـ DI.`,
            R`class عادية بتاخد [[HttpClient]] جاهز.`,
            "بداية.",
            "method.",
            "بداية.",
            "GET وفحص الـ status و JSON في سطر.",
            R`[[3.0.0]]: نسخة الـ NuGet API.`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`[[/nuget]] بيرجع [[3.0.0]]. مع [[AddStandardResilienceHandler]] و [[localhost:1]]: اللوج بيطلّع [[Execution attempt. Source: 'RatesClient-standard//Standard-Retry', Operation Key: '', Result: 'Connection refused (localhost:1)', Handled: 'True', Attempt: '0']] وبعدين Attempt 1 و 2 و 3 بتأخير بيزيد (٢ ثانية تقريبًا بـ jitter)، يعني ٤ محاولات (الأصلية + ٣ retries)، والـ request كله أخد حوالي ٩ ثواني عندنا، وبعدها [[HttpRequestException]] والـ endpoint بيرجع 500. خد بالك إن [[HttpClient.Timeout]] (5 ثواني في المثال) بيلف كل المحاولات، فلو سبته 5 هيقطع قبل ما الـ retries تخلص: مع الـ resilience handler كبّره أو سيب الـ handler هو اللي يتحكم في الـ timeouts.

لو الـ API التاني وقع خالص، بعد كام request الـ circuit breaker بيفتح والطلبات بتفشل فورًا بـ [[BrokenCircuitException]] من غير ما تستنى، وده اللي بيحمي API بتاعك. الأرقام الدقيقة ممكن تختلف حسب نسخة المكتبة، فبص على [[HttpStandardResilienceOptions]] لو عايز تغيرها.`
        }
      ]
    },
    {
      t: "النشر",
      l: 3,
      n: "dotnet publish، و Dockerfile multi-stage، و Kestrel ورا Nginx على Linux",
      items: [
        {
          cmd: "dotnet publish",
          title: "dotnet publish: framework-dependent ولا self-contained ولا AOT؟",
          desc: R`[[dotnet publish -c Release -o ./publish]] بيطلّع فولدر فيه الـ dll بتاعك والمكتبات و [[appsettings.json]]، وده اللي بتنقله للسيرفر وتشغّله بـ [[dotnet Shop.Api.dll]]. ده framework-dependent: السيرفر محتاج ASP.NET Core runtime متسطب، والناتج صغير (حوالي ٩ ميجا هنا).

[[--self-contained -r linux-x64]] بيحط الـ runtime نفسه جوه الفولدر (حوالي ١٠٠ ميجا)، فمش محتاج تسطب .NET على السيرفر. و Native AOT ([[PublishAot=true]]) بيطلّع ملف واحد native بيقوم في ملي ثواني وذاكرته أقل، بس مش كل المكتبات بتدعمه (EF Core لسه عليه قيود، والـ JSON لازم source generation).

في Docker غالبًا framework-dependent فوق image الـ aspnet.`,
          example: R`dotnet publish -c Release -o ./publish
ls ./publish
du -sh ./publish
ASPNETCORE_URLS=http://127.0.0.1:5000 dotnet ./publish/Shop.Api.dll
dotnet publish -c Release -r linux-x64 --self-contained -o ./publish-sc
./publish-sc/Shop.Api`,
          try: R`اعمل publish وبص على الفولدر: فيه [[appsettings.Development.json]]؟ فيه أسرار؟ وبعدين شغّله بـ [[ASPNETCORE_ENVIRONMENT=Production]] ومن غير connection string: إيه اللي بيحصل ولإمتى؟`,
          deep: {
            why: R`على السيرفر مفيش [[dotnet run]] ولا SDK. لازم تعرف تطلّع artifact نضيف، وتعرف إيه اللي فيه، وتختار شكله حسب المكان: VPS، أو Docker، أو serverless (AOT بيفرق في الـ cold start).`,
            how: R`[[publish]] = build بـ Release + نسخ كل الـ dependencies + ملفات الإعدادات + [[web.config]] (لـ IIS، مش مهم على Linux). الـ [[.runtimeconfig.json]] بيقول محتاج أنهي runtime، و [[.deps.json]] بيوصف المكتبات.

الـ RID ([[linux-x64]] و [[linux-arm64]] و [[linux-musl-x64]] لـ Alpine و [[win-x64]]) بيحدد المنصة للـ self-contained والـ AOT. وفيه [[PublishSingleFile]] (ملف واحد بس جواه IL والـ runtime) و [[PublishTrimmed]] (يشيل الكود المش مستخدم).

على السيرفر الإعدادات بتيجي من env vars: [[ASPNETCORE_ENVIRONMENT=Production]] (وده الافتراضي أصلًا)، و [[ASPNETCORE_URLS]] أو [[ASPNETCORE_HTTP_PORTS]] للبورت، و [[ConnectionStrings__Shop]] وأخواتها.

وفيه كمان [[dotnet publish /t:PublishContainer]] بيعمل Docker image من غير Dockerfile، بس محتاج يوصل لـ mcr.microsoft.com و Docker daemon أو registry.`,
            when: R`framework-dependent لـ VPS فيه .NET أو Docker. self-contained لو مش عايز تسطب .NET على السيرفر أو عندك كذا تطبيق بنسخ مختلفة. AOT لـ serverless و CLIs و microservices صغيرة لو المكتبات بتدعمه.`,
            mistakes: R`تنشر Debug. و [[appsettings.Development.json]] فيه أسرار بيتنسخ للإنتاج (بيتنسخ فعلًا افتراضيًا). وتنسى [[-r]] مع self-contained فيطلع للمنصة بتاعة جهازك. وتشغّل بـ [[dotnet run]] على السيرفر.`
          },
          lines: [
            R`build بـ Release وانسخ كل حاجة في [[./publish]].`,
            R`[[Shop.Api.dll]] و [[Shop.Api]] (launcher) والمكتبات و [[appsettings*.json]].`,
            R`[[8.9M]] عندنا: من غير الـ runtime.`,
            R`تشغيل: محتاج [[Microsoft.AspNetCore.App]] runtime على الجهاز.`,
            "نسخة فيها الـ runtime لـ Linux x64.",
            "بيشتغل على أي Linux x64 من غير تسطيب .NET."
          ],
          sol: R`أيوه، [[appsettings.Development.json]] موجود في [[./publish]] وفيه الـ connection string و JWT key بتوع التطوير. في Production مش بيتقري (الـ environment مختلف)، بس وجوده على السيرفر أو في الـ image مخاطرة. امنعه في الـ csproj: [[<Content Update="appsettings.Development.json" CopyToPublishDirectory="Never" />]]، وخلي أسرار التطوير في user secrets أصلًا.

من غير connection string: التطبيق بيقوم عادي ويقول [[Now listening on: http://127.0.0.1:5000]]، والـ background service أول دورة بتفشل وبتتسجل كـ error، وأول request لـ [[/api/products]] بيرجع 500 واللوج فيه [[System.InvalidOperationException: The ConnectionString property has not been initialized.]]. EF مش بيفحص وقت الـ startup. لو عايز تقع بدري: [[ValidateOnStart]] على options فيها الـ connection string، أو health check.`
        },
        {
          cmd: "Dockerfile لـ .NET",
          title: "Dockerfile multi-stage لـ ASP.NET Core",
          desc: R`الـ image الرسمية على mcr.microsoft.com: [[dotnet/sdk:10.0]] للـ build (كبيرة، فيها الـ SDK)، و [[dotnet/aspnet:10.0]] للتشغيل (فيها الـ runtime بس). الـ multi-stage بيبني في الأولى وينسخ ناتج الـ publish للتانية، فالـ image النهائية صغيرة ومفيهاش SDK ولا source.

نسخ الـ csproj لوحده وعمل [[dotnet restore]] قبل نسخ باقي الكود بيخلي طبقة المكتبات تتكاش: لو غيّرت كود بس، الـ restore مش هيتعاد.

الـ images دي من .NET 8 بتسمع على 8080 افتراضيًا ([[ASPNETCORE_HTTP_PORTS=8080]]) وفيها user غير root اسمه [[app]] تشغّل بيه بـ [[USER $APP_UID]].`,
          example: R`FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Shop.Api.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "Shop.Api.dll"]`,
          flag: "script",
          try: R`اعمل [[.dockerignore]] فيه [[bin/]] و [[obj/]]، وابني الـ image وشغّلها بـ env vars للـ connection string والـ JWT. اعرف حجمها، وادخلها بـ [[docker exec]] وشغّل [[id]]: شغالة بأنهي user؟ وجرّب [[/openapi/v1.json]].`,
          deep: {
            why: R`Docker هو أسهل طريقة تشحن API بكل اعتماداته، وأغلب الـ deploys (Cloud Run، ECS، Kubernetes، VPS بـ compose) بتاخد image. والـ Dockerfile الغلط بيطلع image ٩٠٠ ميجا فيها الـ SDK والكود، أو بتشتغل root.`,
            how: R`الـ stage الأولى ([[AS build]]) فيها الـ SDK: [[restore]] بينزّل NuGet packages في طبقة لوحدها، و [[publish]] بيطلّع الناتج في [[/app]]. الـ stage التانية بتبدأ من image الـ runtime النضيفة وتنسخ [[/app]] بس. كل اللي في الـ stage الأولى بيترمي.

[[$APP_UID]] متغير موجود في الـ image (قيمته 1654) للـ user [[app]]. بما إن البورت 8080 (أكبر من 1024)، الـ non-root يقدر يسمع عليه.

Tags تانية: [[aspnet:10.0-alpine]] أصغر (musl)، و [[aspnet:10.0-noble-chiseled]] (Ubuntu chiseled: من غير shell ولا package manager، أصغر وأأمن بس مفيش [[docker exec sh]])، و [[runtime-deps]] للـ self-contained و AOT.

ملاحظة من التجربة هنا: جوه شبكة الشركة ورا proxy بيعمل TLS inspection، [[dotnet restore]] جوه الـ container هيفشل لحد ما تضيف شهادة الـ proxy للـ image أو تدّيله الـ proxy. على أي جهاز عادي مش هتقابلها.`,
            when: R`أي deploy على containers. للتطوير المحلي [[dotnet watch]] أسرع، والـ compose للداتابيز بس. وشوف «multi-stage» و «USER و HEALTHCHECK» و «.dockerignore» في «تاب Docker».`,
            mistakes: R`تنسى [[.dockerignore]] فـ [[bin]] و [[obj]] من جهازك (ويندوز مثلًا) يدخلوا الـ build ويبوّظوه. وتعمل [[COPY . .]] قبل الـ restore فكل تغيير كود يعيد تنزيل المكتبات. وتشغّل على 80 بـ root. وتنسى إن الـ DataProtection keys بتضيع مع كل container جديد (warning في اللوج، ومهم لو بتستخدم cookies أو Identity).`
          },
          lines: [
            R`stage الـ build: فيها الـ SDK.`,
            "فولدر الشغل.",
            "الـ csproj لوحده الأول.",
            "طبقة المكتبات: بتتكاش طول ما الـ csproj متغيرش.",
            "باقي الكود.",
            R`publish في [[/app]] من غير restore تاني.`,
            R`stage التشغيل: runtime بس.`,
            "فولدر.",
            "انسخ ناتج الـ publish بس.",
            R`البورت (ده الافتراضي أصلًا في الـ image، بس صريح أوضح).`,
            "توثيق للبورت.",
            R`شغّل بالـ user [[app]] مش root.`,
            "الأمر."
          ],
          sol: R`الـ image عندنا [[352MB]] على الديسك ([[99.1MB]] مضغوطة). من غير multi-stage (لو شغلت على image الـ sdk) كانت هتبقى أكبر من ٨٠٠ ميجا. [[docker run -d -p 8080:8080 -e "ConnectionStrings__Shop=Host=...;..." -e Jwt__Issuer=shop -e Jwt__Audience=shop-api -e Jwt__Key=... shop-api]] و [[curl localhost:8080/health]] بيرجع [[{"status":"ok"}]]، واللوج بيقول [[Hosting environment: Production]] و [[Now listening on: http://0.0.0.0:8080]].

[[docker exec <id> id]] بيطلع [[uid=1654(app) gid=1654(app) groups=1654(app)]]: مش root. و [[/openapi/v1.json]] بيرجع 404 لأنه في Development بس. ولو الـ container مش شايف Postgres اللي على جهازك: [[localhost]] جوه الـ container هو الـ container نفسه، استخدم [[host.docker.internal]] أو شبكة compose (شوف «0.0.0.0 جوه الـ container» في «تاب Docker»).`
        },
        {
          cmd: "Kestrel ورا Nginx",
          title: "Kestrel ورا Nginx على Linux: systemd و forwarded headers",
          desc: R`على VPS الشكل المعتاد: التطبيق (Kestrel) بيسمع على [[127.0.0.1:5000]] بس، و Nginx قدامه على 80 و 443 بيعمل TLS و gzip و rate limiting ويعمل proxy للتطبيق. و systemd بيشغّل التطبيق ويعيده لو وقع.

المشكلة: التطبيق شايف كل الـ requests جاية من [[127.0.0.1]] وبـ [[http]]، فالـ IP في اللوج غلط، والـ redirects والـ links بتطلع http. الحل: Nginx يبعت [[X-Forwarded-For]] و [[X-Forwarded-Proto]]، والتطبيق يقراهم بـ [[app.UseForwardedHeaders()]] كأول middleware.`,
          example: R`builder.Services.Configure<ForwardedHeadersOptions>(o =>
    o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);
app.UseForwardedHeaders();
# /etc/nginx/sites-available/shop
# location / {
#   proxy_pass http://127.0.0.1:5000;
#   proxy_set_header Host $host;
#   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#   proxy_set_header X-Forwarded-Proto $scheme;
# }
# /etc/systemd/system/shop.service
# [Service]
# WorkingDirectory=/var/www/shop
# ExecStart=/usr/bin/dotnet /var/www/shop/Shop.Api.dll
# Restart=always
# User=www-data
# Environment=ASPNETCORE_URLS=http://127.0.0.1:5000
# EnvironmentFile=/etc/shop.env`,
          try: R`ضيف endpoint [[/whoami]] بيرجع [[ctx.Connection.RemoteIpAddress]] و [[ctx.Request.Scheme]] و [[ctx.Request.Host]]. اطلبه مباشرة على 5000 ومن خلال Nginx، مرة بـ [[UseForwardedHeaders]] ومرة من غيره. وبعدين فعّل الخدمة بـ [[systemctl enable --now shop]] وجرّب [[kill -9]] على البروسيس.`,
          flag: "script",
          deep: {
            why: R`Kestrel سريع ويقدر يواجه الإنترنت لوحده، بس Nginx (أو Caddy) بيسهّل TLS وكذا موقع على نفس السيرفر والـ static files والحماية. والـ forwarded headers لو اتنسوا بيكسروا حاجات بهدوء: rate limiting بالـ IP بيبقى على IP واحد، و OAuth redirect URIs بتطلع http فتترفض.`,
            how: R`[[UseForwardedHeaders]] بيقرا [[X-Forwarded-For]] ويحط آخر IP في [[Connection.RemoteIpAddress]]، ويقرا [[X-Forwarded-Proto]] ويحطه في [[Request.Scheme]]. بيقبلهم بس لو الـ request جاي من proxy موثوق: افتراضيًا [[KnownProxies]] فيها loopback بس (127.0.0.1)، فلو Nginx على جهاز تاني أو Docker network لازم تضيف الـ IP أو الشبكة، وإلا الـ headers بتتجاهل بهدوء. ومتفتحهاش لأي حد: ساعتها أي client يقدر يزوّر الـ IP.

لازم يبقى أول middleware (قبل الـ HTTPS redirection والـ auth واللوج) عشان الباقي يشوف القيم الصح. و [[UseHttpsRedirection]] ورا proxy بيعمل TLS: من غير الـ forwarded proto هيعمل redirect loop.

systemd: [[Restart=always]] بيرجّعه لو وقع، و [[journalctl -u shop -f]] للوج (الـ console logs بتروح هناك)، و [[EnvironmentFile]] للأسرار بصلاحيات 600. و [[KillSignal=SIGINT]] أو الافتراضي SIGTERM، و .NET بيعمل graceful shutdown عليهم (بيستنى الـ requests الجارية والـ background services).

وفيه [[app.MapHealthChecks("/healthz")]] بعد [[builder.Services.AddHealthChecks()]] (و [[AddDbContextCheck<ShopDb>()]] من حزمة [[Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore]]) عشان Nginx أو الـ load balancer أو uptime monitor يعرف التطبيق سليم.`,
            when: R`VPS فيه أكتر من موقع أو محتاج TLS سهل: Nginx أو Caddy قدام Kestrel. في Docker compose: container لـ Nginx أو Traefik قدام container الـ API. في Kubernetes: الـ ingress بيعمل ده. التفاصيل في «reverse proxy بعمق» في «تاب Nginx» و «/etc/systemd/system/myapp.service» في «تاب VPS».`,
            mistakes: R`Kestrel بيسمع على [[0.0.0.0]] فالبورت 5000 مفتوح للعالم من غير Nginx (اقفله بالـ firewall أو اسمع على 127.0.0.1). و [[UseForwardedHeaders]] مش أول واحد. و Nginx في container تاني والـ KnownProxies loopback بس. والتطبيق شغال بـ root. والأسرار في ملف الـ service نفسه اللي بيتقري لأي user ([[systemctl show]]).`
          },
          lines: [
            R`قول للتطبيق يثق في الـ headers دي (من proxy على loopback افتراضيًا).`,
            R`[[X-Forwarded-For]] للـ IP و [[X-Forwarded-Proto]] للـ scheme.`,
            "أول middleware في الـ pipeline."
          ],
          sol: R`مباشرة على 5000: [[{"ip":"127.0.0.1","scheme":"http","host":"localhost:5000"}]]. من خلال Nginx ومع [[UseForwardedHeaders]]: [[{"ip":"127.0.0.1","scheme":"https","host":"api.shop.test"}]] (عندنا Nginx كان بيبعت [[X-Forwarded-Proto https]] ثابت عشان نجرب، و IP الـ client كان نفس الجهاز). من غير [[UseForwardedHeaders]] الـ scheme بيفضل [[http]] حتى من ورا Nginx على 443. والـ [[host]] صح في الحالتين لأن Nginx باعت [[Host $host]].

بعد [[kill -9]] الـ systemd بيرجّعه في ثواني ([[systemctl status shop]] بيوريك [[Active: active (running)]] بـ PID جديد، و [[journalctl -u shop]] فيه [[Main process exited, code=killed, status=9/KILL]] ثم [[Started shop.service]]). لو مش راجع: اتأكد إن فيه [[Restart=always]] وعملت [[systemctl daemon-reload]] بعد التعديل.`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات C# و .NET، بإجابة تقولها في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "boxing و stack و heap",
          title: "value types و reference types: فين بيتخزنوا، ويعني إيه boxing؟ (Value vs reference types)",
          desc: R`الإجابة: الـ value types (int و decimal و DateTime و أي struct) المتغير فيها هو القيمة نفسها، والنسخ بينسخ القيمة. الـ reference types (class و string و arrays) المتغير فيها reference لـ object في الـ managed heap، والنسخ بينسخ الـ reference.

«الـ value types على الـ stack» نص الحقيقة: الـ local variable آه، بس value type جوه class (field) عايش في الـ heap مع الـ object، ولو اتعملها capture في lambda أو async method برضه heap.

boxing: لما value type يتحط في متغير [[object]] أو interface، الـ runtime بيعمل object في الـ heap وينسخ القيمة جواه. ده allocation مخفي، و unboxing بيحتاج cast. الـ generics ([[List<int>]]) هي اللي بتمنعه، بعكس [[ArrayList]] القديمة.`,
          example: R`var before = GC.GetAllocatedBytesForCurrentThread();
object boxed = 0;
for (var i = 0; i < 1_000; i++) boxed = i;
Console.WriteLine($"boxing 1000 ints allocated ~{GC.GetAllocatedBytesForCurrentThread() - before} bytes");
int n = (int)boxed;
var list = new List<int>();
before = GC.GetAllocatedBytesForCurrentThread();
for (var i = 0; i < 1_000; i++) list.Add(i);
Console.WriteLine($"List<int> allocated ~{GC.GetAllocatedBytesForCurrentThread() - before} bytes");`,
          try: R`شغّل المثال وقارن الرقمين. وبعدين جرّب [[IComparable c = 5;]] جوه loop: فيه boxing؟ وإيه اللي بيحصل في [[string.Format("{0}", 5)]] مقابل [[$"{5}"]]؟`,
          flag: "script",
          deep: {
            why: R`بيختبر إنك فاهم الـ memory model، مش حافظ جملة. وده بيأثر على قرارات حقيقية: struct ولا class، وليه [[List<int>]] أسرع من [[List<object>]]، وليه تعديل struct جوه List مش بيشتغل.`,
            how: R`الـ box بيبقى object عادي فيه header (حوالي ١٦ byte على 64-bit) والقيمة، فالـ int بقى ٢٤ byte في الـ heap، والـ GC هيضطر يلمّه بعدين. الـ unboxing لازم يبقى لنفس النوع بالظبط: [[(long)boxedInt]] بترمي [[InvalidCastException]].

الـ generics في .NET بتتعمل لكل value type نسخة كود مخصصة، فـ [[List<int>]] جواها [[int[]]] حقيقي من غير boxing. الـ [[List<int>]] بتعمل allocations برضه بس للـ array الداخلية وهي بتكبر (كام مرة، مش لكل عنصر).

الـ string interpolation الحديث (C# 10+) بيستخدم [[DefaultInterpolatedStringHandler]] فـ [[$"{5}"]] مبيعملش boxing للـ int، بعكس [[string.Format]] اللي بياخد [[object]] params.`,
            when: R`«struct ولا class؟» (struct صغيرة immutable وبتتعمل كتير)، و «ليه struct mutable فكرة وحشة؟»، و «إيه الفرق بين [[ref]] و [[out]] و [[in]]؟»، و «string value ولا reference؟» (reference type بس immutable وبيتقارن بالقيمة، فبيتصرف كأنه value).`,
            mistakes: R`«الـ value types دايمًا على الـ stack». و «struct أسرع دايمًا» (struct كبيرة بتتنسخ كتير فأبطأ). ومش عارف إن الـ interface على struct بيعمل boxing.`
          },
          lines: [
            R`عدد الـ bytes اللي الـ thread ده عمل لها allocation لحد دلوقتي.`,
            R`int في متغير [[object]]: box.`,
            "كل assignment = box جديد.",
            R`حوالي [[25488 bytes]]: ٢٤ byte لكل int + شوية للـ string اللي بتتطبع.`,
            "unboxing: cast لنفس النوع بالظبط.",
            "list generic.",
            "صفّر العداد.",
            "من غير boxing.",
            "allocations الـ array الداخلية بس وهي بتكبر."
          ],
          sol: R`الـ boxing عندنا [[~25488 bytes]] لـ ١٠٠٠ int، يعني حوالي ٢٤ byte لكل واحد (header + القيمة + padding). الـ [[List<int>]] عملت [[~8392 bytes]] بس (arrays بتتضاعف: 4 و 8 و 16 لحد 1024 int، و 4 bytes لكل int).

[[IComparable c = i;]] فيه boxing: [[interface boxing: 25488]] نفس رقم الـ object بالظبط، لأن الـ interface reference type. [[string.Format("{0}", i)]] عمل [[55920]] و [[$"{i}"]] عمل [[31920]]. الاتنين بيعملوا الـ string الناتج (حوالي ٣٢ byte)، والفرق (حوالي ٢٤ byte لكل نداء) هو الـ box، لأن [[string.Format]] بياخد [[object]]، أما [[$"{i}"]] في C# الحديث بيتحول لـ [[AppendFormatted<int>(i)]] generic من غير boxing.`,
          solCode: R`var before = GC.GetAllocatedBytesForCurrentThread();
IComparable c = 0;
for (var i = 0; i < 1_000; i++) c = i;
Console.WriteLine($"interface boxing: {GC.GetAllocatedBytesForCurrentThread() - before}");
before = GC.GetAllocatedBytesForCurrentThread();
for (var i = 0; i < 1_000; i++) _ = string.Format("{0}", i);
Console.WriteLine($"string.Format: {GC.GetAllocatedBytesForCurrentThread() - before}");
before = GC.GetAllocatedBytesForCurrentThread();
for (var i = 0; i < 1_000; i++) _ = $"{i}";
Console.WriteLine($"interpolation: {GC.GetAllocatedBytesForCurrentThread() - before}");`
        },
        {
          cmd: "IEnumerable ولا IQueryable",
          title: "إيه الفرق بين IEnumerable و IQueryable؟ (IEnumerable vs IQueryable)",
          desc: R`الإجابة: [[IEnumerable<T>]] بيلف على داتا في الذاكرة، والـ [[Where]] عليه بياخد [[Func]] (كود بيتنفذ في C#). [[IQueryable<T>]] بيبني expression tree، والـ [[Where]] عليه بياخد [[Expression<Func>]] (وصف للكود)، والـ provider (EF Core) بيترجم الشجرة كلها لـ SQL وينفذها في الداتابيز لما تطلب النتيجة.

النتيجة العملية: لو method بترجع [[IEnumerable<Product>]] من [[db.Products]]، أي [[Where]] بعدها بيحصل في الذاكرة بعد ما الجدول كله اتحمل. لو بترجع [[IQueryable]] الـ Where بيتضاف للـ SQL. الاتنين lazy (deferred execution).`,
          example: R`IEnumerable<int> e = Enumerable.Range(1, 5);
IQueryable<int> q = Enumerable.Range(1, 5).AsQueryable().Where(n => n > 2);
Console.WriteLine(q.Expression);
Console.WriteLine(e.Where(n => n > 2).GetType().Name);
IEnumerable<Product> AllProducts(ShopDb db) => db.Products;
var cheap = AllProducts(db).Where(p => p.Price < 10).ToList();
IQueryable<Product> AllProductsQ(ShopDb db) => db.Products;
var cheapQ = AllProductsQ(db).Where(p => p.Price < 10).ToList();`,
          try: R`في الـ API اعمل الـ methodين دول، وشغّل الاتنين مع لوج EF على Information. قارن الـ SQL. وبعدين: إيه اللي بيحصل لو [[AllProductsQ]] استخدمت method بتاعتك جوه الـ Where؟`,
          flag: "script",
          deep: {
            why: R`ده سؤال .NET رقم واحد تقريبًا، لأنه بيكشف هل فاهم إزاي EF Core شغال ولا بتكتب LINQ وخلاص. والغلطة دي بتعدّي في التطوير (١٠ صفوف) وتوقع الإنتاج (مليون صف).`,
            how: R`[[IQueryable<T>]] بيورث [[IEnumerable<T>]] وفيه [[Expression]] و [[Provider]]. الـ extension methods في [[Queryable]] (مش [[Enumerable]]) بتاخد [[Expression<Func<T, bool>>]]، فالـ compiler بيحوّل الـ lambda لشجرة بدل delegate. كل method بتضيف node للشجرة، وأول ما تلف (أو [[ToListAsync]]) الـ provider بيترجم.

الـ overload resolution بيعتمد على النوع الـ static للمتغير: لو المتغير [[IEnumerable]]، الـ compiler بيختار [[Enumerable.Where]] حتى لو الـ object الحقيقي [[DbSet]]. عشان كده نوع الرجوع بيفرق.

[[AsEnumerable()]] بيقطع عمدًا: اللي قبله SQL واللي بعده في الذاكرة. مفيد لو محتاج method مش بتتترجم بعد ما فلترت في SQL.`,
            when: R`«ليه الـ repository بيرجع IQueryable وليه ناس بتعتبرها leaky abstraction؟»، و «إيه expression tree؟»، و «الـ query بتتنفذ إمتى؟»، و «IAsyncEnumerable ده إيه؟»، و «ليه ممكن يطلع could not be translated؟».`,
            mistakes: R`«IQueryable أسرع» من غير ما تقول ليه. و «IEnumerable يعني List». ومش عارف إن نوع المتغير هو اللي بيحدد مين يتنفذ.`
          },
          lines: [
            "sequence في الذاكرة.",
            R`[[AsQueryable]] بيحوّله IQueryable، والـ Where بقى جزء من شجرة.`,
            R`بيطبع الشجرة: [[System.Linq.Enumerable+RangeIterator'1[System.Int32].Where(n => (n > 2))]].`,
            R`[[IEnumerableWhereIterator'1]]: iterator عادي في الذاكرة، مفيش شجرة.`,
            R`بترجع [[IEnumerable]] مع إن الـ object [[DbSet]].`,
            R`[[Enumerable.Where]]: SQL من غير WHERE، والفلترة في C#.`,
            R`بترجع [[IQueryable]].`,
            R`[[Queryable.Where]]: الـ WHERE في الـ SQL.`
          ],
          sol: R`[[AllProducts(db).Where(...)]] بيبعت [[SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock" FROM "Products" AS p]] من غير WHERE، ويحمّل كل الصفوف، وبعدين يفلتر في الذاكرة. [[AllProductsQ(db).Where(...)]] بيبعت نفس الـ SELECT بس معاه [[WHERE p."Price" < 10.0]]. نفس الناتج ونفس الكود تقريبًا، والفرق كله في نوع الرجوع.

ولو [[AllProductsQ]] فيها method بتاعتك جوه الـ Where: [[InvalidOperationException: The LINQ expression ... could not be translated]] وقت التنفيذ، لأن الـ provider شايف نداء method مش عارف يترجمه (درس «LINQ لـ SQL»). في نسخة الـ [[IEnumerable]] نفس الكود كان هيشتغل لأنه في الذاكرة، وده ليه الغلطة دي بتستخبى.`
        },
        {
          cmd: "captive dependency",
          title: "الفرق بين Singleton و Scoped و Transient؟ وإيه هو captive dependency؟ (DI lifetimes)",
          desc: R`الإجابة: Singleton نسخة واحدة لعمر التطبيق، Scoped نسخة لكل scope (في ASP.NET Core = كل request)، Transient نسخة جديدة كل ما حد يطلب. الـ DbContext Scoped لأنه مش thread-safe وبيتتبع entities للـ request ده بس.

الـ captive dependency: service عمرها أطول بتاخد service عمرها أقصر في الـ constructor، فالقصيرة بتتمسك جوه الطويلة وتعيش عمرها. أشهرها Singleton بياخد DbContext: نفس الـ context لكل الـ requests من threads مختلفة، فبيرمي [[A second operation was started on this context instance before a previous operation completed]] أو بيرجع داتا قديمة.

الحل: [[IServiceScopeFactory]] جوه الـ Singleton وتعمل scope لكل عملية، أو تغيّر الـ lifetime. و [[ValidateScopes]] بيمسكها وقت الـ startup في Development.`,
          example: R`builder.Services.AddScoped<Cart>();
builder.Services.AddSingleton<PriceCache>();
var app = builder.Build();
public class Cart { }
public class PriceCache(Cart cart) { }
public class GoodCache(IServiceScopeFactory scopes)
{
    public async Task RefreshAsync()
    {
        await using var scope = scopes.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
        await db.Products.CountAsync();
    }
}`,
          try: R`شغّل المثال بـ [[ASPNETCORE_ENVIRONMENT=Development]] ثم Production. وبعدين جاوب: Transient بياخد Scoped، مسموح؟ و Scoped بياخد Singleton؟ و [[IHttpClientFactory]] typed client جوه Singleton، فيه مشكلة؟`,
          flag: "script",
          deep: {
            why: R`أشهر سؤال DI في انترفيوهات .NET، لأن الغلطة بتعدّي في الاختبار وتظهر تحت الضغط في الإنتاج: داتا user بتظهر لـ user تاني، أو exceptions عشوائية من الـ DbContext.`,
            how: R`القاعدة: service تاخد بس اللي عمره قد عمرها أو أطول. Singleton ← Singleton بس. Scoped ← Scoped أو Singleton. Transient ← أي حاجة، بس لو اتحقن في Singleton هيبقى captive هو كمان.

الـ root provider (اللي في [[app.Services]]) مفيهوش scope، فطلب Scoped منه في Development بيرمي [[Cannot resolve scoped service ... from root provider]]. الـ [[ValidateScopes]] و [[ValidateOnBuild]] بيتفعلوا تلقائي في Development بس، وتقدر تفعلهم في كل مكان بـ [[builder.Host.UseDefaultServiceProvider(o => { o.ValidateScopes = true; o.ValidateOnBuild = true; })]].

الـ Transient اللي بتطبق [[IDisposable]] وبتتطلب من الـ root بتتمسك لحد ما التطبيق يقفل (memory leak)، لأن الـ container هو اللي مسؤول يعملها Dispose.`,
            when: R`«إزاي تستخدم DbContext في BackgroundService؟» (scope factory)، و «إزاي تعمل DbContext في Singleton؟» ([[IDbContextFactory<T>]] بـ [[AddDbContextFactory]])، و «إيه اللي بيحصل لو DbContext Singleton؟»، و «إيه keyed services؟».`,
            mistakes: R`«Transient أأمن دايمًا». و «Singleton أسرع فخلي كله Singleton». ومش عارف إن الفحص مقفول في Production.`
          },
          lines: [
            "Scoped.",
            "Singleton بياخد Scoped: captive.",
            R`في Development: [[Cannot consume scoped service 'Cart' from singleton 'PriceCache'.]] هنا.`,
            "class.",
            "بتمسك الـ Cart للأبد.",
            "الحل: factory.",
            "بداية.",
            "method.",
            "بداية.",
            "scope جديد لكل عملية.",
            R`DbContext جديد جواه، وبيتعمله dispose مع الـ scope.`,
            "استخدمه.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`Development: التطبيق بيقع وقت [[Build()]] بـ [[System.AggregateException: Some services are not able to be constructed (Error while validating the service descriptor 'ServiceType: PriceCache Lifetime: Singleton ImplementationType: PriceCache': Cannot consume scoped service 'Cart' from singleton 'PriceCache'.)]]. Production: بيقوم ويرد عادي، والـ Cart اتمسك في الـ cache للأبد. جربناها الاتنين.

Transient ياخد Scoped: مسموح، والـ transient بيتعمل جوه الـ scope بتاع الـ request. Scoped ياخد Singleton: مسموح وده الطبيعي (Scoped service بتاخد cache أو [[TimeProvider]]). typed client جوه Singleton: مشكلة، الـ typed client Transient فبيتمسك، ومعاه الـ handler بتاعه فمبيتجددش والـ DNS changes مش بتتشاف. استخدم [[IHttpClientFactory]] نفسه جوه الـ Singleton أو [[SocketsHttpHandler]] بـ [[PooledConnectionLifetime]].`
        },
        {
          cmd: "async deadlock",
          title: "ليه .Result ممكن تعمل deadlock؟ وإمتى ConfigureAwait(false)؟ (Async deadlocks)",
          desc: R`الإجابة: الـ deadlock الكلاسيكي بيحصل لما يبقى فيه [[SynchronizationContext]] بيسمح لـ thread واحد بس (UI في WinForms و WPF، أو ASP.NET القديم على .NET Framework). الكود بينادي [[GetAsync().Result]] فالـ thread ده بيقف مستني. جوه [[GetAsync]] الـ [[await]] بيحاول يكمّل على نفس الـ context، يعني نفس الـ thread الواقف. كل واحد مستني التاني.

ASP.NET Core مفيهوش [[SynchronizationContext]]، فالـ deadlock ده مش بيحصل فيه. بس [[.Result]] و [[.Wait()]] لسه غلط: بيحجزوا thread من الـ pool وهو مستني، وتحت الضغط الـ pool بيخلص (thread pool starvation) والسيرفر كله يبطأ.

[[ConfigureAwait(false)]] بيقول «كمّل على أي thread»، فبيكسر الـ deadlock. مكانه في كود المكتبات. في كود التطبيق على ASP.NET Core ملوش لازمة. الحل الحقيقي: async all the way.`,
          example: R`using System.Collections.Concurrent;
SynchronizationContext.SetSynchronizationContext(new UiLikeContext());
var t1 = LoadAsync(configureAwait: true);
Console.WriteLine($"with context:    finished = {t1.Wait(2000)}");
var t2 = LoadAsync(configureAwait: false);
Console.WriteLine($"ConfigureAwait(false): finished = {t2.Wait(2000)}");
static async Task<string> LoadAsync(bool configureAwait)
{
    await Task.Delay(100).ConfigureAwait(configureAwait);
    return "data";
}
class UiLikeContext : SynchronizationContext
{
    private readonly BlockingCollection<(SendOrPostCallback, object?)> _queue = new();
    public override void Post(SendOrPostCallback d, object? state) => _queue.Add((d, state));
}`,
          try: R`شغّل المثال: الأولى هتفضل واقفة لحد الـ timeout والتانية هتخلص. وبعدين شيل السطر التاني ([[SetSynchronizationContext]]) وشغّل تاني: إيه اللي اتغير، وليه ده بيوصف ASP.NET Core؟`,
          flag: "script",
          deep: {
            why: R`سؤال بيفرز اللي فاهم async من جوه. والإجابة الكاملة لازم تفرق بين الـ deadlock (UI والـ Framework القديم) والـ starvation (ASP.NET Core)، لأن ناس كتير بتقول «ConfigureAwait(false) في كل حتة» من غير ما تعرف ليه.`,
            how: R`لما تعمل [[await]]، الـ runtime بيمسك [[SynchronizationContext.Current]] (لو موجود)، ولما العملية تخلص بيبعت الكمالة لـ [[Post]] بتاعه. الـ UI context بيحط الكمالة في queue الـ UI thread. لو الـ UI thread واقف في [[.Wait()]]، الـ queue مش بتتعالج أبدًا. المثال بيقلد ده: [[Post]] بيحط في queue ومحدش بيعالجها.

مع [[ConfigureAwait(false)]] الكمالة بتروح للـ thread pool مباشرة، فالـ Task بتخلص والـ [[Wait]] يرجع.

في ASP.NET Core [[SynchronizationContext.Current]] بـ null، فالكمالة بتروح للـ pool أصلًا. المشكلة هناك: [[.Result]] بيحجز thread، والـ pool بيزود threads ببطء (حوالي واحد كل نص ثانية لما يتزنق)، فلو ١٠٠ request عملوا كده مع بعض الـ latency بيطير.`,
            when: R`«إزاي تنادي async من constructor أو من method sync؟» (متعملش: factory async، أو [[IHostedService]]، أو lazy init)، و «ConfigureAwait(false) في ASP.NET Core لازم؟» (لأ في كود التطبيق، آه في المكتبات اللي ممكن تتستخدم في UI)، و «إيه thread pool starvation وإزاي تكتشفه؟» ([[dotnet-counters]]: ThreadPool Queue Length بيزيد).`,
            mistakes: R`«ASP.NET Core بيعمل deadlock مع .Result» (مش الـ deadlock الكلاسيكي، بس starvation). و «ConfigureAwait(false) بيخلي الكود أسرع كتير». و [[Task.Run(() => X()).Result]] كحل (بيحجز threadين بدل واحد).`
          },
          lines: [
            "للـ queue.",
            R`context زي بتاع الـ UI: الكمالات بتتحط في queue محدش بيعالجها إلا الـ thread ده.`,
            R`الـ await جواه هيمسك الـ context.`,
            R`[[finished = False]]: deadlock، والـ Wait رجع بس بسبب الـ timeout.`,
            R`[[ConfigureAwait(false)]].`,
            R`[[finished = True]]: الكمالة راحت للـ pool.`,
            "async method.",
            "بداية.",
            R`[[ConfigureAwait(true)]] ده الافتراضي.`,
            "رجوع.",
            "نهاية.",
            "context بيقلد UI thread.",
            "بداية.",
            "queue.",
            R`[[Post]]: بيحط الكمالة في الـ queue بس.`,
            "نهاية."
          ],
          sol: R`الناتج: [[with context:    finished = False]] بعد ثانيتين، وبعدين [[ConfigureAwait(false): finished = True]] على طول.

من غير [[SetSynchronizationContext]] الاتنين [[True]]: مفيش context يمسكه الـ await، فالكمالة بتروح للـ thread pool، والـ [[Wait]] بيرجع لما العملية تخلص. ده بالظبط وضع ASP.NET Core: مفيش deadlock، و [[ConfigureAwait]] ملوش تأثير. بس الـ [[Wait]] لسه حاجز thread طول الـ 100ms، ولو ده بيحصل في كل request الـ pool بيتزنق. الإجابة المختصرة: async all the way، و [[ConfigureAwait(false)]] في كود المكتبات بس.`
        },
        {
          cmd: "GC و IDisposable",
          title: "الـ Garbage Collector شغال إزاي؟ وليه محتاج Dispose لو فيه GC؟ (GC and IDisposable)",
          desc: R`الإجابة: الـ GC بيلم الـ objects اللي محدش بيشاور عليها في الـ managed heap. مقسوم لـ generations: Gen0 للـ objects الجديدة وبيتلم كتير وبسرعة، واللي يعيش بيترقى لـ Gen1 ثم Gen2 (بيتلم نادرًا لأنه كبير). الفكرة إن أغلب الـ objects بتموت صغيرة. والـ objects الكبيرة (٨٥ ألف byte فأكتر) بتروح Large Object Heap وبتتحسب Gen2 من الأول.

الـ GC بيدير الذاكرة بس. الـ connections والملفات والـ sockets (unmanaged resources) لازم تتقفل في وقت معروف، والـ GC مش بيضمن إمتى هيعدي. عشان كده [[IDisposable]] و [[using]]: تقفل الـ resource أول ما تخلص.

وفي ASP.NET Core الـ GC افتراضيًا Server GC (heap لكل core، throughput أعلى) وبيبقى concurrent.`,
          example: R`#:package Npgsql@10.0.3
var order = new byte[1_000];
var bigReport = new byte[100_000];
Console.WriteLine($"small: gen {GC.GetGeneration(order)}, big: gen {GC.GetGeneration(bigReport)}");
GC.Collect();
Console.WriteLine($"after 1 GC: small gen {GC.GetGeneration(order)}");
GC.Collect();
Console.WriteLine($"after 2 GCs: small gen {GC.GetGeneration(order)}");
Console.WriteLine($"server GC: {System.Runtime.GCSettings.IsServerGC}");
await using (var conn = new Npgsql.NpgsqlConnection("Host=localhost;Username=shop;Password=shop;Database=shop_dev"))
{
    await conn.OpenAsync();
}`,
          try: R`شغّل أول ٨ سطور (الـ [[#:package]] فوق عشان [[Npgsql]] في الـ file-based app). وبعدين اعمل loop بيفتح ٢٠٠ connection لـ Postgres من غير [[using]] ولا [[Dispose]]: إيه اللي بيحصل؟ وبعدين بـ [[await using]].`,
          flag: "script",
          deep: {
            why: R`بيختبر إنك فاهم الفرق بين الذاكرة والـ resources، وليه في لغة فيها GC لسه فيه leaks. في الإنتاج: connection pool بيخلص، أو files مقفولة، أو ذاكرة بتكبر لأن حاجة Singleton ماسكة references.`,
            how: R`الـ GC بيبدأ من roots (static fields، local variables في الـ stacks الشغالة، الـ CPU registers، GC handles) ويعلّم كل اللي يوصله، والباقي بيتلم. الـ Gen0 collection سريع لأنه بيبص على حتة صغيرة، ومحتاج يعرف مين من Gen2 بيشاور على Gen0 (card table). الـ compaction بيحرك الـ objects عشان يقلل التفتت (الـ LOH مش بيتعمله compact افتراضيًا).

[[Dispose()]] بتقفل الـ resource فورًا. الـ finalizer ([[~ClassName()]]) شبكة أمان بيناديها الـ GC لو حد نسي Dispose، بس بيأخر لم الـ object لـ collection تانية. عشان كده الـ pattern الكامل فيه [[GC.SuppressFinalize(this)]] في الـ Dispose. وفي كود التطبيقات نادرًا ما تكتب finalizer: [[SafeHandle]] بيعمله.

leaks في .NET: event handlers مش متشالة، و static collections بتكبر، و caches من غير حد، و captive dependencies، و [[HttpClient]] per request.`,
            when: R`«إمتى تنادي [[GC.Collect()]]؟» (تقريبًا أبدًا في كود الإنتاج)، و «Dispose ولا finalizer؟»، و «إزاي تلاقي memory leak؟» ([[dotnet-counters]] و [[dotnet-gcdump]] و [[dotnet-dump]])، و «Workstation ولا Server GC؟».`,
            mistakes: R`«الـ GC بيقفل الـ connections». و [[GC.Collect()]] عشان «الذاكرة عالية». و «.NET مفيهوش memory leaks». وتنسى [[using]] مع [[IDisposable]] متعملهوش الـ DI (الـ DI بيعمل Dispose للي هو عمله بس).`
          },
          lines: [
            "object صغير: Gen0.",
            "أكبر من 85000 byte: LOH.",
            R`[[small: gen 0, big: gen 2]].`,
            "collection إجباري (للتجربة بس).",
            R`[[gen 1]]: عاش فاترقى.`,
            "تاني.",
            R`[[gen 2]].`,
            R`[[False]] هنا (console app). في ASP.NET Core [[True]] افتراضيًا.`,
            R`[[await using]]: الـ connection بيرجع للـ pool أول ما البلوك يخلص.`,
            "بداية.",
            "فتح.",
            R`نهاية: [[DisposeAsync]] اتنادت.`
          ],
          sol: R`الناتج: [[small: gen 0, big: gen 2]] ثم [[gen 1]] ثم [[gen 2]] و [[server GC: False]] (الـ console apps workstation GC، و ASP.NET Core بيفعّل server GC في الـ csproj بتاع Web SDK).

من غير Dispose: عندنا وقف بعد [[87]] connection بـ [[53300: remaining connection slots are reserved for roles with the SUPERUSER attribute]]: Postgres نفسه خلصت الـ slots بتاعته ([[max_connections]] الافتراضي 100، وفيه connections تانية مفتوحة). لو Postgres عنده slots أكتر، الحد اللي بعده هو [[Max Pool Size]] بتاع Npgsql (100 افتراضيًا)، والـ OpenAsync بيستنى الـ [[Timeout]] ويرمي [[The connection pool has been exhausted]]. في الحالتين الـ GC مش هيلحق يلم الـ objects دي لأن الذاكرة مش مزنوقة، فالـ connections فاضلة محجوزة، وأي request تاني للـ API هيقع بنفس الخطأ. بـ [[await using]] الـ ٢٠٠ بيخلصوا في أقل من ثانية لأنهم بيستخدموا نفس الـ connections من الـ pool.`,
          solCode: R`#:package Npgsql@10.0.3
var leaked = new List<Npgsql.NpgsqlConnection>();
try
{
    for (var i = 0; i < 200; i++)
    {
        var conn = new Npgsql.NpgsqlConnection("Host=localhost;Username=shop;Password=shop;Database=shop_dev;Timeout=3");
        await conn.OpenAsync();
        leaked.Add(conn);
    }
}
catch (Exception ex)
{
    Console.WriteLine($"after {leaked.Count}: {ex.Message}");
}
foreach (var c in leaked) await c.DisposeAsync();
for (var i = 0; i < 200; i++)
{
    await using var conn = new Npgsql.NpgsqlConnection("Host=localhost;Username=shop;Password=shop;Database=shop_dev");
    await conn.OpenAsync();
}
Console.WriteLine("200 with await using: ok");`
        },
        {
          cmd: "string و StringBuilder",
          title: "ليه string += جوه loop بطيء؟ (String immutability and StringBuilder)",
          desc: R`الإجابة: الـ [[string]] في .NET immutable. [[s += "x"]] مبيعدّلش الـ string، بيعمل string جديدة وينسخ القديمة كلها + الإضافة. في loop من n مرة ده O(n²) نسخ، وكمان n objects للـ GC. [[StringBuilder]] بيحجز buffer بيكبر ويضيف فيه، والـ [[ToString()]] مرة في الآخر.

لعدد قليل من الإضافات (٣ أو ٤) الـ interpolation أو [[+]] عادي والـ compiler بيحوّله [[string.Concat]] واحد. ولقايمة: [[string.Join]].

والـ immutability ليها فوايد: thread-safe، وينفع string تبقى مفتاح في Dictionary، و string interning للـ literals.`,
          example: R`using System.Diagnostics;
using System.Text;
var sw = Stopwatch.StartNew();
var s = "";
for (var i = 0; i < 20_000; i++) s += "x";
Console.WriteLine($"string +=      {sw.ElapsedMilliseconds}ms");
sw.Restart();
var sb = new StringBuilder();
for (var i = 0; i < 20_000; i++) sb.Append('x');
var result = sb.ToString();
Console.WriteLine($"StringBuilder  {sw.ElapsedMilliseconds}ms, same = {result == s}");`,
          try: R`كبّر العدد لـ 100,000 وشوف الفرق بيكبر إزاي (مش خطي). وقارن [[==]] و [[ReferenceEquals]] بين [["abc"]] و [[new string("abc")]] و [[string.Intern(...)]].`,
          flag: "script",
          deep: {
            why: R`سؤال كلاسيكي بيختبر فهمك للـ immutability والـ allocations والـ complexity مع بعض. وفي الشغل: بناء CSV أو report أو SQL ديناميكي بـ [[+=]] في loop بيبقى بطيء بشكل مش واضح.`,
            how: R`كل [[+=]] بيعمل string جديد طوله n وينسخ n حرف، فالمجموع 1 + 2 + ... + n = O(n²). مع 20,000 ده حوالي ٢٠٠ مليون حرف نسخ. [[StringBuilder]] بيحجز chunks وبيكبرها، فالإضافة O(1) في المتوسط. تقدر تدّيه capacity من الأول لو عارف الحجم.

[[==]] على string بيقارن المحتوى (operator overload)، و [[ReferenceEquals]] بيقارن الـ reference. الـ literals المتطابقة بتبقى نفس الـ object (interning) لأن الـ compiler والـ runtime بيحطوهم في intern pool. [[new string(...)]] دايمًا object جديد.

وفي الكود الحساس للأداء: [[string.Create]] و [[Span<char>]] و [[StringBuilder]] pooled، والـ interpolated string handlers. والمقارنة بـ [[StringComparison.Ordinal]] أو [[OrdinalIgnoreCase]] أسرع وأوضح من [[ToLower() == ...]].`,
            when: R`«إمتى StringBuilder مش أحسن؟» (إضافات قليلة: الـ overhead أكبر)، و «string reference type ولا value؟»، و «إيه string interning؟»، و «إزاي تقارن strings من غير ما تهتم بالحروف الكبيرة؟» ([[string.Equals(a, b, StringComparison.OrdinalIgnoreCase)]]).`,
            mistakes: R`«string value type لأنه بيتقارن بالقيمة». و [[StringBuilder]] لسطرين. و [[a.ToLower() == b.ToLower()]] (allocations ومشاكل ثقافية زي حرف I التركي).`
          },
          lines: [
            "Stopwatch.",
            "StringBuilder.",
            "ابدأ.",
            "string فاضي.",
            "كل لفة string جديدة ونسخ كامل.",
            R`[[138ms]] عندنا.`,
            "صفّر.",
            "buffer.",
            "إضافة في نفس الـ buffer.",
            R`string واحد في الآخر.`,
            R`[[0ms]] و [[same = True]].`
          ],
          sol: R`بـ 20,000: [[string +=  137ms]] و [[StringBuilder 0ms]] عندنا. بـ 100,000 الـ [[+=]] أخد [[1363ms]] (العدد ×5 والوقت ×10 تقريبًا: مش خطي، لأنه O(n²)، والـ GC بيلحق يلم جزء فالرقم مش ×25 بالظبط)، والـ StringBuilder لسه [[0ms]]. الأرقام حسب الجهاز، بس الشكل ثابت.

[[var a = "abc"; var b = new string("abc".ToCharArray()); var c = string.Intern(b);]]: [[a == b]] بـ [[True]] (المحتوى)، [[ReferenceEquals(a, b)]] بـ [[False]] (objectين)، [[ReferenceEquals(a, c)]] بـ [[True]] لأن [[Intern]] رجّع الـ object اللي في الـ pool، وهو نفس الـ literal.`,
          solCode: R`var a = "abc";
var b = new string("abc".ToCharArray());
var c = string.Intern(b);
Console.WriteLine($"{a == b} {ReferenceEquals(a, b)} {ReferenceEquals(a, c)}");`
        }
      ]
    }
  ]
});
