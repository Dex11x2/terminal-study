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
          teach: R`## الأوامر دي بتعمل إيه؟

الأربع أوامر الأولى أسئلة بتسألها للـ CLI اللي اسمه [[dotnet]]: انت مسطّب أنهي SDK؟ وأنهي runtime؟ وعلى أنهي نظام؟ والأمر الأخير بيسطّب .NET على Ubuntu. كل الناتج اللي تحت حقيقي من image مايكروسوفت الرسمية [[mcr.microsoft.com/dotnet/sdk:10.0]] (جواها Ubuntu 24.04)، وأمر [[apt]] اتجرّب في [[ubuntu:24.04]] عادي.

---

## ١. الكلمات قبل الأوامر

| الكلمة | معناها |
|---|---|
| C# | اللغة نفسها (بتتنطق «سي شارب») |
| .NET | المنصة: runtime + مكتبات + أدوات |
| SDK | اختصار Software Development Kit: الـ compiler والـ CLI والقوالب. ده اللي بتبني بيه |
| runtime | اللي بيشغّل البرنامج بعد ما اتبنى. السيرفر محتاجه هو بس |
| CLR | اختصار Common Language Runtime: قلب الـ runtime اللي بينفّذ الكود |
| IL | اختصار Intermediate Language: الشكل اللي الـ compiler بيحوّل الكود ليه جوه ملف [[.dll]] |
| JIT | اختصار Just-In-Time: الـ CLR بيحوّل الـ IL لكود المعالج وقت التشغيل |
| CLI | اختصار Command Line Interface: الأمر [[dotnet]] نفسه |

يعني الرحلة: انت بتكتب C#، والـ SDK بيحوّله IL في [[.dll]]، والـ runtime بيشغّل الـ dll ده ويحوّله لكود الجهاز بالـ JIT.

---

## ٢. [[dotnet --version]]

~~~bash
dotnet --version
~~~

~~~text الناتج
10.0.401
~~~

ده رقم الـ **SDK** (مش الـ runtime) اللي هيتستخدم في الفولدر اللي انت فيه. والـ [[--]] قبل [[version]] معناها إن دي option مش أمر فرعي.

### الرقم ده بيتقري إزاي؟

| الحتة | المعنى |
|---|---|
| [[10]] | الـ major: .NET 10 |
| [[0]] | الـ minor: دايمًا 0 في .NET الحديث |
| [[4]] | الـ feature band: [[1xx]] بتنزل مع النسخة في نوفمبر، و [[2xx]] و [[3xx]] و [[4xx]] بتنزل خلال السنة وفيها مميزات للأدوات |
| [[01]] | رقم الـ patch جوه الـ band |

ولو فيه ملف [[global.json]] في الفولدر أو فوقه بيثبّت نسخة SDK معينة، الأمر ده هيطلّع النسخة دي.

---

## ٣. [[dotnet --list-sdks]] و [[dotnet --list-runtimes]]

~~~bash
dotnet --list-sdks
dotnet --list-runtimes
~~~

~~~text الناتج
10.0.401 [/usr/share/dotnet/sdk]
Microsoft.AspNetCore.App 10.0.12 [/usr/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 10.0.12 [/usr/share/dotnet/shared/Microsoft.NETCore.App]
~~~

- كل سطر فيه النسخة، وبين [[[ ]]] مكان التسطيب.
- SDK واحد ([[10.0.401]]) و runtimes رقمهم [[10.0.12]]. لاحظ إن الرقمين مختلفين: الـ SDK ليه ترقيم، والـ runtime ليه ترقيم تاني.
- [[Microsoft.NETCore.App]]: الـ runtime الأساسي لأي برنامج C#.
- [[Microsoft.AspNetCore.App]]: فوقه، بيضيف حاجات الويب (السيرفر Kestrel والـ middleware). أي API محتاجه.

ولو عندك كذا نسخة متسطبة جنب بعض (8 و 9 و 10) هتلاقيهم كلهم هنا، وده عادي: كل برنامج بيشتغل على النسخة اللي اتبنى ليها.

---

## ٤. [[dotnet --info]]

ده كل حاجة مع بعض. ده أهم جزء من الناتج:

~~~text الناتج (مختصر)
.NET SDK:
 Version:           10.0.401
 Commit:            e34a38d2ae
 MSBuild version:   18.9.11+e34a38d2a

Runtime Environment:
 OS Name:     ubuntu
 OS Version:  24.04
 OS Platform: Linux
 RID:         linux-x64
 Base Path:   /usr/share/dotnet/sdk/10.0.401/

Host:
  Version:      10.0.12
  Architecture: x64

global.json file:
  Not found
~~~

| السطر | معناه |
|---|---|
| [[MSBuild version]] | MSBuild هو الأداة اللي بتعمل الـ build فعلًا ([[dotnet build]] بيناديها) |
| [[RID]] | اختصار Runtime Identifier: النظام والمعالج في كلمة واحدة. هتشوفه تاني في [[dotnet publish -r linux-x64]] |
| [[Base Path]] | فولدر الـ SDK اللي شغال |
| [[Host]] | الـ [[dotnet]] نفسه، ورقمه رقم أحدث runtime |
| [[global.json file]] | هل فيه ملف بيثبّت نسخة SDK؟ هنا لأ |

وفي آخره بيعيد القايمتين بتوع [[--list-sdks]] و [[--list-runtimes]]. ده الأمر اللي تلزقه لما تسأل حد عن مشكلة.

---

## ٥. التسطيب على Ubuntu: [[sudo apt install -y dotnet-sdk-10.0]]

- [[sudo]]: نفّذ كـ admin، لأن التسطيب بيكتب في ملفات النظام.
- [[apt install]]: سطّب باكدج من الـ repo بتاع Ubuntu.
- [[-y]]: وافق على السؤال «هتسطّب؟» من غير ما تسأل.
- [[dotnet-sdk-10.0]]: اسم الباكدج. وفيه كمان [[dotnet-runtime-10.0]] و [[aspnetcore-runtime-10.0]] لو عايز runtime بس (للسيرفر).

سألت الـ repo بتاع Ubuntu 24.04 عن الباكدج من غير ما أسطّبه:

~~~bash
apt-get update && apt-cache policy dotnet-sdk-10.0
~~~

~~~text الناتج
dotnet-sdk-10.0:
  Installed: (none)
  Candidate: 10.0.112-0ubuntu1~24.04.1
~~~

يعني لو سطّبت من Ubuntu هتاخد SDK [[10.0.112]] (الـ band [[1xx]])، ومن Microsoft (زي الـ image اللي فوق) [[10.0.401]]. الاتنين بيبنوا لنفس الـ runtime 10، فمتقلقش من الفرق. والباكدج حجمها بعد التسطيب حوالي ٣٤٠ ميجا.

> على ويندوز والماك مفيش [[apt]]: نزّل الـ installer من dot.net، أو على ويندوز [[winget install Microsoft.DotNet.SDK.10]] (اتأكدت إن الاسم موجود بـ [[winget show]] وإن النسخة [[10.0.401]]، من غير ما أسطّب).

---

## ٦. LTS و STS

| | LTS | STS |
|---|---|---|
| معناها | Long Term Support | Standard Term Support |
| النسخ | الزوجية: 8 و 10 | الفردية: 9 و 11 |
| الدعم | ٣ سنين | سنتين |
| تستخدمها إمتى | أي مشروع إنتاج | لو عايز ميزة جديدة ومستعد تعمل upgrade |

---

## الخلاصة

- [[--version]] رقم الـ SDK، و [[--list-runtimes]] أرقام الـ runtimes، والاتنين مختلفين.
- جهازك محتاج SDK عشان تبني. السيرفر محتاج runtime بس ([[Microsoft.AspNetCore.App]] لو API).
- [[dotnet --info]] هو الأمر اللي تبدأ بيه لما حاجة مش شغالة.`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

بتعمل مشروع C# جديد، وتبص على ملف الإعدادات بتاعه، وتشغّله بـ ٣ طرق، وتعمله [[.gitignore]]. كل الناتج تحت حقيقي من [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401 على Ubuntu 24.04). على ويندوز والماك الأوامر هي هي، والفرق بس في شكل المسارات ([[\]] بدل [[/]]) وإن [[cat]] في PowerShell اسمها [[Get-Content]] (و [[cat]] شغالة كاختصار ليها).

---

## ١. [[dotnet new console -o Hello]]

- [[dotnet new]]: اعمل حاجة جديدة من قالب (template).
- [[console]]: اسم القالب: برنامج بيشتغل في الترمنال.
- [[-o Hello]]: اختصار output: حط الملفات في فولدر اسمه [[Hello]]، ولو مش موجود اعمله. واسم المشروع بياخد اسم الفولدر.

~~~text الناتج
The template "Console App" was created successfully.

Processing post-creation actions...
Restoring /w/l2/Hello/Hello.csproj:
  Determining projects to restore...
  Restored /w/l2/Hello/Hello.csproj (in 125 ms).
Restore succeeded.
~~~

الـ **restore** يعني «نزّل المكتبات اللي المشروع محتاجها» (زي [[npm install]]). القالب بيعمله لوحده في الآخر. وجوه الفولدر طلع:

~~~text ls -la
-rw-r--r-- 1 root root  243 Oct  7 16:42 Hello.csproj
-rw-r--r-- 1 root root   39 Oct  7 16:42 Program.cs
drwxr-xr-x 1 root root 4096 Oct  7 16:42 obj
~~~

ملفين وفولدر [[obj]] (اتعمل من الـ restore).

---

## ٢. [[cd Hello]] ثم [[cat Hello.csproj]]

~~~xml Hello.csproj
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
~~~

ده XML، يعني كل إعداد بين tag فاتح [[<Name>]] و tag قافل [[</Name>]].

| السطر | معناه |
|---|---|
| [[Sdk="Microsoft.NET.Sdk"]] | هات الإعدادات الافتراضية بتاعة مشروع .NET عادي. عشان كده الملف صغير |
| [[<PropertyGroup>]] | مجموعة إعدادات |
| [[<OutputType>Exe</OutputType>]] | الناتج برنامج بيتشغّل (Executable). من غيره يبقى مكتبة |
| [[<TargetFramework>net10.0</TargetFramework>]] | المشروع مكتوب لـ .NET 10. الاسم ده اسمه TFM (Target Framework Moniker) |
| [[<ImplicitUsings>enable</ImplicitUsings>]] | import تلقائي لأشهر الـ namespaces |
| [[<Nullable>enable</Nullable>]] | شغّل تحذيرات null (ليها درس في القسم الجاي) |

### الـ ImplicitUsings بتعمل import لإيه بالظبط؟

الـ SDK بيكتب ملف مخفي في [[obj]]، فتحته:

~~~csharp obj/Debug/net10.0/Hello.GlobalUsings.g.cs
// <auto-generated/>
global using System;
global using System.Collections.Generic;
global using System.IO;
global using System.Linq;
global using System.Net.Http;
global using System.Threading;
global using System.Threading.Tasks;
~~~

[[using System;]] زي [[import]] في JS: بيخليك تكتب [[Console]] بدل [[System.Console]]. و [[global]] معناها «للمشروع كله، مش للملف ده بس». عشان كده [[Console]] و LINQ و [[List]] شغالين من غير ما تكتب [[using]].

---

## ٣. [[Program.cs]] و [[dotnet run]]

~~~csharp Program.cs
Console.WriteLine("Hello, World!");
~~~

- [[Console]]: الـ class بتاعة الترمنال.
- [[.WriteLine(...)]]: اطبع النص وبعده سطر جديد (زي [[console.log]]).
- [[;]]: آخر كل جملة في C# إجباري.

مفيش class ولا [[Main]]: ده اسمه **top-level statements**. الـ compiler بيلف الكود ده لوحده في [[class Program]] جواها [[static void Main(string[] args)]]، ومن هنا جه المتغير [[args]] اللي هنستخدمه تحت.

~~~bash
dotnet run
~~~

~~~text الناتج
Hello, World!
~~~

[[dotnet run]] عمل ٣ حاجات: restore، ثم build (حوّل الكود لـ IL في [[bin/Debug/net10.0/Hello.dll]])، ثم شغّله. أول مرة خدت حوالي ٥ ثواني. وده اللي اتعمل في [[bin]]:

~~~text ls bin/Debug/net10.0
Hello
Hello.deps.json
Hello.dll
Hello.pdb
Hello.runtimeconfig.json
~~~

| الملف | إيه ده |
|---|---|
| [[Hello.dll]] | الكود بتاعك بعد ما بقى IL |
| [[Hello]] | ملف تشغيل صغير (apphost)، على ويندوز اسمه [[Hello.exe]] |
| [[Hello.deps.json]] | المكتبات اللي البرنامج معتمد عليها |
| [[Hello.runtimeconfig.json]] | محتاج أنهي runtime (هنا 10.0) |
| [[Hello.pdb]] | معلومات للـ debugger: أرقام السطور في الـ exceptions |

---

## ٤. [[dotnet watch]]

بيعمل build ويشغّل، وبيفضل مراقب الملفات: أول ما تحفظ تعديل بيطبّقه (hot reload) أو يعيد التشغيل. زي [[nodemon]].

~~~text الناتج (أول سطور)
dotnet watch Polling file watcher is enabled
dotnet watch Hot reload enabled. For a list of supported edits, see https://aka.ms/dotnet/hot-reload.
dotnet watch Press Ctrl+R to restart.
  Hello -> /w/l2/Hello/bin/Debug/net10.0/Hello.dll

Build succeeded.
~~~

(السطر الأول ظاهر لأننا جوه Docker. على جهازك مش هيظهر.) [[Ctrl+R]] يعيد التشغيل، و [[Ctrl+C]] يوقفه.

---

## ٥. [[dotnet build -c Release]]

- [[build]]: حوّل الكود لـ dll من غير ما تشغّل.
- [[-c]] اختصار [[--configuration]]: نوع الـ build. الافتراضي [[Debug]] (سهل الـ debugging)، و [[Release]] فيه optimizations، وده اللي بيتنشر.

~~~text الناتج (آخره)
Build succeeded.
    0 Warning(s)
    0 Error(s)
~~~

وبقى في [[bin]] فولدرين: [[Debug]] و [[Release]].

---

## ٦. [[dotnet new gitignore]]

قالب تاني بيعمل ملف [[.gitignore]] جاهز. جواه السطرين المهمين:

~~~text grep في .gitignore
33:[Bb]in/
34:[Oo]bj/
~~~

[[[Bb]in/]] معناها [[bin/]] أو [[Bin/]] (الحرف الأول كبير أو صغير). يعني ناتج الـ build والملفات المؤقتة مش هيروحوا git.

---

## ٧. التجربة: args و [[--]]

غيّرت [[Program.cs]] للـ solCode:

~~~csharp Program.cs
var name = "Sara";
Console.WriteLine($"Hi, I'm {name}, got {args.Length} args");
~~~

- [[var name = "Sara";]]: متغير، ونوعه [[string]] اتفهم من القيمة.
- [[$"..."]]: الـ [[$]] قبل النص بتخليه interpolated string، يعني [[{name}]] بيتبدّل بقيمة المتغير (زي template string في JS).
- [[args]]: array بالكلام اللي اتكتب بعد اسم البرنامج، و [[.Length]] عدده.

| الأمر | الناتج |
|---|---|
| [[dotnet run -- a b c]] | [[Hi, I'm Sara, got 3 args]] |
| [[dotnet run a b c]] | [[Hi, I'm Sara, got 3 args]] |
| [[dotnet run -c Release a]] | [[Hi, I'm Sara, got 1 args]] |
| [[dotnet run -- -c x]] | [[Hi, I'm Sara, got 2 args]] |

الصف التالت هو المهم: [[-c Release]] الـ CLI خدها لنفسه (configuration)، ووصل للبرنامج [[a]] بس. وفي الرابع الـ [[--]] قالت «اللي بعدي كله للبرنامج»، فـ [[-c]] وصلت لـ [[args]]. عشان كده اتعوّد تكتب [[--]] دايمًا.

ولما غيّرت [[<Nullable>]] لـ [[disable]] الناتج فضل [[got 3 args]]: الإعداد ده بيأثر على التحذيرات وقت الـ build بس.

### غلطة: top-level statements في ملفين

ضفت ملف [[Other.cs]] فيه [[Console.WriteLine(1);]] وعملت build:

~~~text الناتج
/w/l2/Hello/Program.cs(1,1): error CS8802: Only one compilation unit can have top-level statements.
~~~

لأن البرنامج ليه بداية واحدة بس. الملفات التانية فيها classes بس.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[dotnet new console -o X]] | مشروع جديد في فولدر X |
| [[dotnet run]] | restore و build وتشغيل |
| [[dotnet watch]] | زي run ويعيد مع كل حفظ |
| [[dotnet build -c Release]] | build للإنتاج من غير تشغيل |
| [[dotnet new gitignore]] | [[.gitignore]] جاهز |

- الـ csproj هو قلب المشروع، والـ [[.cs]] اللي في الفولدر بتدخل الـ build لوحدها.
- [[bin]] و [[obj]] متتحطش في git أبدًا.
- [[--]] بين options الـ CLI و arguments برنامجك.`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيكتب ملف C# واحد اسمه [[hello.cs]] ويشغّله على طول من غير csproj، وبعدين يحوّله لمشروع عادي. ده اسمه **file-based app** وجه مع .NET 10. كل الناتج تحت حقيقي من [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401).

---

## ١. كتابة الملف: [[cat > hello.cs <<'EOF']]

ده bash مش C#: طريقة تكتب بيها ملف من الترمنال.

- [[cat > hello.cs]]: اللي هيدخل لـ [[cat]] اكتبه في [[hello.cs]] ([[>]] بتمسح الملف لو موجود).
- [[<<'EOF']]: اسمه heredoc: كل السطور اللي جاية لحد سطر فيه [[EOF]] لوحدها هي الـ input. و [[EOF]] بين علامتين [[']] معناها «متلمسش اللي جوه»، فـ bash مش هيحاول يفهم [[$]] و [[{ }]] اللي في كود C#.

على ويندوز اكتب الملف في أي editor (VS Code مثلًا) وخلاص، أو في PowerShell بـ [[Set-Content]].

---

## ٢. السطر الأول

~~~csharp hello.cs
var name = args.Length > 0 ? args[0] : "world";
~~~

نفكّه من جوه لبرة:

### [[args]]

array من النصوص ([[string[]]]) فيها الكلام اللي اتبعت للبرنامج. موجودة لوحدها في الـ top-level statements من غير ما تعرّفها.

### [[args.Length > 0]]

[[.Length]] عدد العناصر في الـ array، و [[> 0]] بيسأل: فيه arguments ولا لأ؟ النتيجة [[true]] أو [[false]].

### [[? args[0] : "world"]]

ده الـ ternary operator، زي JS بالظبط: [[شرط ? لو صح : لو غلط]]. و [[args[0]]] أول عنصر (الـ index بيبدأ من 0).

### [[var name = ...]]

[[var]] معناها «استنتج النوع من القيمة». القيمتين [[string]]، فـ [[name]] نوعه [[string]] ومش هيتغير.

---

## ٣. السطر التاني

~~~csharp hello.cs
Console.WriteLine($"Hello, {name}! .NET {Environment.Version}");
~~~

- [[Console.WriteLine]]: اطبع وانزل سطر.
- [[$"..."]]: interpolated string: أي حاجة بين [[{ }]] بتتحسب وتتحط مكانها.
- [[Environment.Version]]: نسخة الـ runtime اللي البرنامج شغال عليه دلوقتي.

---

## ٤. التشغيل: [[dotnet run hello.cs -- Sara]]

- [[dotnet run hello.cs]]: ابني الملف ده وشغّله.
- [[--]]: اللي بعدها للبرنامج مش للـ CLI.
- [[Sara]]: هتبقى [[args[0]]].

~~~text الناتج
Hello, Sara! .NET 10.0.12
~~~

[[10.0.12]] رقم الـ runtime. وقستّ الوقت:

| التشغيل | الوقت |
|---|---|
| أول مرة | حوالي ٣٣ ثانية (Docker على ويندوز، والـ SDK بيعمل مشروع ويبنيه) |
| تاني مرة ([[dotnet run hello.cs]] من غير args) | ربع ثانية، وطبع [[Hello, world! .NET 10.0.12]] |

ليه الفرق؟ الـ SDK بيعمل مشروع وهمي ويبنيه ويحفظ الناتج. لقيت الكاش هنا على لينكس:

~~~text ls ~/.local/share/dotnet/runfile
hello-28bed84bceb9ee0a610e7a711aface6b989c08a6441e523c9dbbedf1399c6f99
~~~

جواه [[bin]] و [[obj]] زي أي مشروع. فده مش interpreter: ده build كامل بيتكاش، وطالما الملف متغيرش بيشغّل الناتج على طول.

---

## ٥. [[dotnet project convert hello.cs]]

لما الملف يكبر وعايز مشروع عادي:

~~~text الناتج: ls -R
.:
hello
hello.cs

./hello:
hello.cs
hello.csproj
~~~

عمل فولدر [[hello]] فيه نسخة من الملف بنفس اسمه و csproj، والملف الأصلي فضل مكانه. والـ csproj اللي طلع:

~~~xml hello/hello.csproj
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <PublishAot>true</PublishAot>
    <PackAsTool>true</PackAsTool>
    <UserSecretsId>hello-b79279...</UserSecretsId>
  </PropertyGroup>

</Project>
~~~

السطور دي هي الإعدادات اللي الـ file-based app كان شغال بيها من ورا ضهرك. أهمها [[<PublishAot>true</PublishAot>]]، وهو سبب المشكلة اللي في التجربة.

---

## ٦. التجربة: API في ملف واحد

~~~csharp api.cs
#:sdk Microsoft.NET.Sdk.Web
var app = WebApplication.CreateBuilder(args).Build();
app.MapGet("/", () => new { ok = true });
app.Run();
~~~

### [[#:sdk Microsoft.NET.Sdk.Web]]

السطور اللي بتبدأ بـ [[#:]] مش C#، دي أوامر للـ SDK. دي معناها «استخدم SDK الويب» بدل العادي، فيبقى عندك ASP.NET Core.

### [[WebApplication.CreateBuilder(args).Build()]]

من جوه لبرة: [[CreateBuilder(args)]] بيجهّز الإعدادات، و [[.Build()]] بيطلّع التطبيق نفسه في [[app]]. (ده كله ليه دروس في المستوى ٢.)

### [[app.MapGet("/", () => new { ok = true })]]

- [[MapGet]]: لما ييجي GET على المسار ده نفّذ الدالة دي.
- [[() => ...]]: lambda، زي arrow function في JS.
- [[new { ok = true }]]: anonymous object (زي [[{ ok: true }]] في JS) وهيرجع JSON.

### [[app.Run()]]

شغّل السيرفر واستنى requests.

### اللي حصل لما شغّلته

الـ build طلّع ٣ تحذيرات، أولهم:

~~~text الناتج: build
api.cs(3,1): warning RDG004: Unable to resolve anonymous return type. Compile-time endpoint generation will skip this endpoint and the endpoint will be generated at runtime.
api.cs(3,1): warning IL2026: Using member '...MapGet(...)' which has 'RequiresUnreferencedCodeAttribute' can break functionality when trimming application code.
api.cs(3,1): warning IL3050: Using member '...MapGet(...)' which has 'RequiresDynamicCodeAttribute' can break functionality when AOT compiling.
~~~

والسيرفر قام، وأول request رجع [[HTTP/1.1 500 Internal Server Error]]، والـ log فيه:

~~~text الناتج: log
System.NotSupportedException: JsonTypeInfo metadata for type '<>f__AnonymousType0$__bt1[System.Boolean]' was not provided by TypeInfoResolver of type '[]'. If using source generation, ensure that all root types passed to the serializer have been annotated with 'JsonSerializableAttribute', ...
~~~

الترجمة: الـ AOT (اختصار Ahead-Of-Time: البرنامج بيتحوّل لكود الجهاز وقت الـ build مش بالـ JIT) بيقفل الـ reflection، يعني البرنامج ميقدرش «يبص» على شكل object وقت التشغيل. والـ JSON serializer محتاج يبص على الـ anonymous object عشان يحوّله JSON، فوقع. والتحذيرات كانت قايلة كده قبلها ([[IL3050]]: «ممكن يبوظ مع AOT»).

### الحل: [[#:property PublishAot=false]]

[[#:property]] بيحط أي إعداد في الـ csproj الوهمي. ضفته تحت سطر الـ sdk:

~~~text الناتج
Now listening on: http://localhost:5000
~~~

~~~text curl -s localhost:5000
{"ok":true}
~~~

والتحذيرات التلاتة اختفوا. (جوه Docker الـ image بتحط المنفذ 8080 افتراضيًا، فشلت المتغير ده عشان أشوف [[5000]] زي جهازك.)

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[dotnet run file.cs]] | build مخفي متكاش وتشغيل |
| [[#:sdk]] | أنهي SDK (العادي أو الويب) |
| [[#:package Name@ver]] | مكتبة NuGet |
| [[#:property X=Y]] | أي إعداد MSBuild |
| [[dotnet project convert]] | فولدر فيه csproj ونسخة من الملف |

- أول تشغيل بطيء، والباقي سريع طالما الملف متغيرش.
- الـ file-based app معمول AOT افتراضيًا، فـ JSON لأنواع مجهولة بيقع. [[PublishAot=false]] للتجارب.`,
          lines: [
            R`اكتب ملف [[hello.cs]] (الـ heredoc ده bash عادي).`,
            R`أول argument لو موجود، ولو لأ [[world]]. [[args]] موجودة لوحدها.`,
            R`[[$"..."]] زي template string في JS، و [[{name}]] زي [[$__{name}]].`,
            "نهاية الـ heredoc.",
            R`build وتشغيل الملف، واللي بعد [[--]] بيروح لـ [[args]].`,
            R`لما يكبر: حوّله لفولدر [[hello]] فيه [[hello.csproj]] و [[hello.cs]] (الملف بيتنقل باسمه، مش بيبقى Program.cs).`
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
          teach: R`## الأوامر دي بتعمل إيه؟

بتبني الهيكل بتاع أي مشروع .NET حقيقي: solution فيه مشروعين (API ومكتبة)، والـ API بيستخدم المكتبة، والمكتبة بتستخدم باكدج من NuGet. كل الناتج تحت حقيقي من [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401). الأوامر هي هي على ويندوز والماك.

---

## ١. [[dotnet new sln -n Shop]]

- [[sln]] اختصار solution: ملف بيجمع كذا مشروع.
- [[-n Shop]] اختصار name: اسم الملف.

~~~xml Shop.slnx
<Solution>
</Solution>
~~~

الامتداد [[.slnx]] (X عشان XML). ده الجديد في .NET 10، والقديم [[.sln]] كان ملف نصي طويل فيه GUIDs محدش بيفهمه.

---

## ٢. [[dotnet new webapi -o src/Shop.Api]] و [[dotnet new classlib -o src/Shop.Core]]

- [[webapi]]: قالب API (ليه درس في المستوى ٢).
- [[classlib]] اختصار class library: مكتبة. مفيهاش [[Program.cs]]، وناتجها [[Shop.Core.dll]] بيستخدمه مشروع تاني، مش بيتشغّل لوحده.
- [[-o src/Shop.Api]]: الفولدر. الـ [[src/]] عرف إن الكود في فولدر [[src]] والاختبارات في [[tests]].

---

## ٣. [[dotnet sln add src/Shop.Api src/Shop.Core]]

ضيف المشروعين للـ solution (تقدر تدّيه فولدر، وهو بيدوّر على الـ csproj جواه).

~~~text الناتج
Project $__btsrc/Shop.Api/Shop.Api.csproj$__bt added to the solution.
Project $__btsrc/Shop.Core/Shop.Core.csproj$__bt added to the solution.
~~~

~~~xml Shop.slnx
<Solution>
  <Folder Name="/src/">
    <Project Path="src/Shop.Api/Shop.Api.csproj" />
    <Project Path="src/Shop.Core/Shop.Core.csproj" />
  </Folder>
</Solution>
~~~

الـ solution مجرد قايمة مسارات. الـ [[<Folder>]] فولدر وهمي بيظهر في Visual Studio و Rider.

---

## ٤. [[dotnet reference add src/Shop.Core --project src/Shop.Api]]

اقراها كده: «ضيف reference لـ [[Shop.Core]]، في المشروع [[Shop.Api]]». يعني الـ API هيقدر يستخدم الـ Core.

~~~text الناتج
Reference $__bt..\Shop.Core\Shop.Core.csproj$__bt added to the project.
~~~

واتكتب في [[Shop.Api.csproj]]:

~~~xml src/Shop.Api/Shop.Api.csproj (جزء)
    <ProjectReference Include="..\Shop.Core\Shop.Core.csproj" />
~~~

- [[ProjectReference]]: «المشروع ده معتمد على المشروع ده».
- [[..]]: الفولدر اللي فوق. المسار نسبي لمكان الـ csproj نفسه.

---

## ٥. [[dotnet package add Humanizer --project src/Shop.Core]]

[[Humanizer]] مكتبة مشهورة بتحوّل حاجات لكلام مقروء (زي [["3 hours ago"]]). الأمر نزّلها من NuGet (الـ npm بتاع .NET) وكتبها في الـ csproj:

~~~text الناتج (آخره)
info : PackageReference for package 'Humanizer' version '3.0.10' added to file '/w/l4/src/Shop.Core/Shop.Core.csproj'.
info : Writing assets file to disk. Path: /w/l4/src/Shop.Core/obj/project.assets.json
log  : Restored /w/l4/src/Shop.Core/Shop.Core.csproj (in 7.04 sec).
~~~

~~~xml src/Shop.Core/Shop.Core.csproj
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Humanizer" Version="3.0.10" />
  </ItemGroup>

</Project>
~~~

- مفيش [[<OutputType>Exe</OutputType>]]: فالناتج مكتبة.
- [[<ItemGroup>]]: مجموعة عناصر (مكتبات أو ملفات).
- [[PackageReference]]: مكتبة من NuGet باسمها ونسختها. الأمر خد أحدث نسخة ([[3.0.10]]) لأنك مكتبتش [[--version]].
- [[project.assets.json]]: نتيجة حل كل الـ dependencies (زي [[package-lock.json]]).

### فين المكتبة اتنزّلت؟

مش جوه المشروع. في كاش عام: [[~/.nuget/packages]] على لينكس والماك، و [[%USERPROFILE%\.nuget\packages]] على ويندوز. لقيت فيه [[humanizer]] و [[humanizer.core]] وحوالي ٥٠ باكدج لغات زي [[humanizer.core.ar]]: [[Humanizer]] نفسه باكدج مفيهاش كود (مفيهاش فولدر [[lib]])، شغلتها إنها تجيب الباقيين (اسمها metapackage). وكل المشاريع على الجهاز بتشارك الكاش ده، فمفيش [[node_modules]] في كل مشروع.

---

## ٦. [[dotnet package list --project src/Shop.Core]]

~~~text الناتج
Project 'Shop.Core' has the following package references
   [net10.0]: 
   Top-level Package      Requested   Resolved
   > Humanizer            3.0.10      3.0.10  
~~~

| العمود | معناه |
|---|---|
| Top-level Package | المكتبات اللي انت ضفتها بنفسك (مش الـ dependencies بتاعتها) |
| Requested | النسخة المكتوبة في الـ csproj |
| Resolved | النسخة اللي اتنزّلت فعلًا (ممكن تختلف لو كتبت range) |

---

## ٧. [[dotnet build]]

في فولدر الـ solution بيبني كل المشاريع، والـ Core الأول لأن الـ API معتمد عليه:

~~~text الناتج
  Shop.Core -> /w/l4/src/Shop.Core/bin/Debug/net10.0/Shop.Core.dll
  Shop.Api -> /w/l4/src/Shop.Api/bin/Debug/net10.0/Shop.Api.dll

Build succeeded.
    0 Warning(s)
    0 Error(s)
~~~

وفي [[bin]] بتاع الـ API لقيت [[Shop.Core.dll]] و [[Humanizer.dll]] جنب [[Shop.Api.dll]]: الـ ProjectReference بينسخ المكتبة ومكتباتها جنب البرنامج.

---

## ٨. التجربة: PriceFormatter

~~~csharp src/Shop.Core/PriceFormatter.cs
namespace Shop.Core;

public static class PriceFormatter
{
    public static string Format(decimal price) => $"{price:0.00} EGP";
}
~~~

- [[namespace Shop.Core;]]: الـ namespace زي «اسم عيلة» للـ classes عشان الأسامي متتخبطش. والـ [[;]] في الآخر معناها «الملف كله جوه الـ namespace ده».
- [[public]]: مرئية من مشاريع تانية.
- [[static class]]: class مش هتعمل منها objects، فيها functions بس (زي module في JS).
- [[decimal price]]: parameter نوعه [[decimal]] (رقم للفلوس).
- [[=>]]: الـ method جسمها expression واحد بترجع قيمته.
- [[{price:0.00}]]: اللي بعد [[:]] جوه الـ interpolation هو format: رقمين بعد العلامة.

وفي أول [[Program.cs]] بتاع الـ API:

~~~csharp src/Shop.Api/Program.cs
Console.WriteLine(Shop.Core.PriceFormatter.Format(19.5m));
~~~

[[19.5m]]: الـ [[m]] بتقول إن الرقم [[decimal]]. والاسم الكامل [[Shop.Core.PriceFormatter]] = namespace ثم class.

### الأول من غير [[public]]

~~~text الناتج: dotnet build
Program.cs(1,29): error CS0122: 'PriceFormatter' is inaccessible due to its protection level
~~~

الـ class من غير كلمة بتبقى [[internal]]: مرئية جوه مشروعها بس.

### بعد [[public]]

~~~text الناتج: dotnet run --project src/Shop.Api
Using launch settings from src/Shop.Api/Properties/launchSettings.json...
Building...
19.50 EGP
~~~

### العكس: الـ Core بيستخدم حاجة من الـ API

عملت [[ApiThing]] في الـ API وحاولت أستخدمها في الـ Core بـ [[using Shop.Api;]]:

~~~text الناتج: dotnet build
Bad.cs(1,12): error CS0234: The type or namespace name 'Api' does not exist in the namespace 'Shop' (are you missing an assembly reference?)
Bad.cs(3,27): error CS0246: The type or namespace name 'ApiThing' could not be found (are you missing a using directive or an assembly reference?)
~~~

وبعدين ضفت reference عكسي بـ [[dotnet reference add src/Shop.Api --project src/Shop.Core]]. الأمر نفسه قبله، بس الـ build وقع:

~~~text الناتج: dotnet build
NuGet.targets(1298,5): error MSB4006: There is a circular dependency in the target dependency graph involving target "_GenerateRestoreProjectPathWalk".
~~~

يعني A معتمد على B و B معتمد على A، ومفيش حد يتبني الأول. والـ references اتجاه واحد بس.

---

## الخلاصة

| الأمر | بيكتب في | المعنى |
|---|---|---|
| [[dotnet new sln]] | [[Shop.slnx]] | solution فاضي |
| [[dotnet sln add]] | [[.slnx]] | ضيف مشروع للقايمة |
| [[dotnet reference add X --project Y]] | [[Y.csproj]] | Y يستخدم X |
| [[dotnet package add P --project Y]] | [[Y.csproj]] | مكتبة NuGet في Y |
| [[dotnet package list]] | | المكتبات ونسخها |
| [[dotnet build]] | [[bin/]] | كل المشاريع بالترتيب |

- الـ class اللي هتستخدمها من مشروع تاني لازم [[public]].
- الـ references اتجاه واحد: الـ API يعرف الـ Core، والـ Core ميعرفش الـ API.`,
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

ولما تحاول تستخدم حاجة من الـ API جوه الـ Core هيطلع [[error CS0246: The type or namespace name ... could not be found]] (أو CS0234 لو كتبت الاسم كامل [[Shop.Api.X]] أو [[using Shop.Api;]])، لأن الـ Core مش عامل reference للـ API. ولو ضفت reference عكسي، [[dotnet reference add]] هيقبله، بس أول [[dotnet build]] هيقع بـ [[error MSB4006: There is a circular dependency in the target dependency graph]] لأن ده circular. وده بالظبط المقصود: الـ domain ميعرفش حاجة عن الويب.`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

كل سطر بيعمل نوع مشروع مختلف من نفس الـ CLI، عشان تشوف بعينك إن API و Blazor و worker كلهم .NET واحد. الناتج تحت حقيقي من [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401). الحاجات اللي بتتشاف في المتصفح بس (الـ Network tab) من الـ docs ومن اللي السيرفر رجّعه لـ [[curl]].

---

## ١. [[dotnet new list --tag Web]]

- [[dotnet new list]]: اعرض القوالب المتسطبة.
- [[--tag Web]]: فلتر: القوالب اللي في الـ tags بتاعتها كلمة Web.

~~~text الناتج (مختصر)
Template Name                                 Short Name         Language    Tags
--------------------------------------------  -----------------  ----------  ----------------------------
ASP.NET Core Empty                            web                [C#],F#     Web/Empty
ASP.NET Core gRPC Service                     grpc               [C#]        Web/gRPC/API/Service
ASP.NET Core Web API                          webapi             [C#],F#     Web/Web API/API/Service
ASP.NET Core Web API (native AOT)             webapiaot          [C#]        Web/Web API/API/Service
ASP.NET Core Web App (Model-View-Controller)  mvc                [C#],F#     Web/MVC
ASP.NET Core Web App (Razor Pages)            webapp,razor       [C#]        Web/MVC/Razor Pages
Blazor Web App                                blazor             [C#]        Web/Blazor/WebAssembly
Blazor WebAssembly Standalone App             blazorwasm         [C#]        Web/Blazor/WebAssembly/PWA
Worker Service                                worker             [C#],F#     Common/Worker/Web
xUnit Test Project                            xunit              [C#],F#,VB  Test/xUnit/Desktop/Web
~~~

| العمود | معناه |
|---|---|
| Template Name | الاسم الكامل |
| Short Name | اللي بتكتبه بعد [[dotnet new]] |
| Language | اللغات. اللي بين [[[ ]]] هي الافتراضية، و F# و VB لغات .NET تانية |
| Tags | تصنيفات، ومنها اتعمل الفلتر |

---

## ٢. [[dotnet new webapi -o Api]]

API بـ **minimal APIs**: الـ endpoints بتتكتب كـ functions في [[Program.cs]] على طول. الملفات اللي طلعت:

~~~text ls Api
Api.csproj  Api.http  Program.cs  Properties  appsettings.Development.json  appsettings.json  obj
~~~

وده قلب [[Program.cs]]:

~~~csharp Api/Program.cs (جزء)
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
var app = builder.Build();
...
app.MapGet("/weatherforecast", () =>
{
    ...
});
~~~

[[MapGet]] بيربط GET على المسار بـ lambda. ده نفس أسلوب Express في Node ([[app.get(...)]]). و [[Api.http]] ملف requests جاهزة تبعتها من VS Code أو Visual Studio.

---

## ٣. [[dotnet new webapi --use-controllers -o ApiMvc]]

[[--use-controllers]]: نفس القالب، بس الـ endpoints في classes اسمها controllers:

~~~text ls ApiMvc ApiMvc/Controllers
ApiMvc.csproj  ApiMvc.http  Controllers  Program.cs  Properties  WeatherForecast.cs  appsettings...
WeatherForecastController.cs
~~~

الفرق في التنظيم بس: نفس الـ framework ونفس الـ runtime. الاتنين ليهم دروس في المستوى ٢.

---

## ٤. [[dotnet new blazor -o Dashboard --interactivity Server]]

- [[blazor]]: Blazor Web App.
- [[--interactivity Server]]: الـ components التفاعلية بتشتغل على السيرفر.

القيم المتاحة للـ option دي، من [[dotnet new blazor -h]]:

~~~text الناتج
  -int, --interactivity <Auto|None|Server|WebAssembly>
      None         No interactivity (static server rendering only)
      Server       Runs on the server
      WebAssembly  Runs in the browser using WebAssembly
      Auto         Uses Server while downloading WebAssembly assets, then uses WebAssembly
      Default: Server
~~~

يعني [[Server]] هو الافتراضي أصلًا، وكتابته في المثال للتوضيح بس.

### [[Counter.razor]] سطر سطر

~~~razor Dashboard/Components/Pages/Counter.razor
@page "/counter"
@rendermode InteractiveServer

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
~~~

| السطر | معناه | يقابله في React |
|---|---|---|
| [[@page "/counter"]] | الـ component ده صفحة على المسار ده | route |
| [[@rendermode InteractiveServer]] | التفاعل هنا شغال على السيرفر | مفيش مقابل |
| [[@currentCount]] | [[@]] بتطبع قيمة C# جوه الـ HTML | [[{count}]] |
| [[@onclick="IncrementCount"]] | لما تدوس نادي الـ method دي | [[onClick={...}]] |
| [[@code { ... }]] | كود C# بتاع الـ component | جسم الـ function |
| [[private int currentCount = 0;]] | الـ state: حقل عادي | [[useState(0)]] |
| [[currentCount++;]] | زوّد واحد | [[setCount(c => c + 1)]] |

مفيش [[setState]]: بعد أي event handler، Blazor بيعيد الـ render لوحده.

### إيه اللي بيحصل في الشبكة؟

شغّلت السيرفر وطلبت الصفحة بـ [[curl]]:

~~~text الناتج: curl -s localhost:8080/counter (جزء)
<p role="status">Current count: 0</p>
<button class="btn btn-primary">Click me</button><!--Blazor:{"prerenderId":"21b0..."}-->
~~~

الصفحة بتيجي HTML جاهز (prerender)، والزرار من غير أي [[onclick]] في الـ HTML. التفاعل بييجي بعدين من سكربت [[blazor.web.js]] اللي بيفتح اتصال على [[/_blazor]]. جرّبت أول خطوة في الاتصال ده:

~~~text الناتج: curl -X POST localhost:8080/_blazor/negotiate?negotiateVersion=1
{"negotiateVersion":1,"connectionId":"...","availableTransports":[{"transport":"WebSockets",...},{"transport":"ServerSentEvents",...},{"transport":"LongPolling",...}]}
~~~

ده SignalR بيقول «أقدر أكلمك بـ WebSockets، ولو مش متاح بطرق تانية». في المتصفح (من الـ docs) هتلاقي في الـ Network tab websocket على [[_blazor]]، وكل ضغطة زرار رسالة صغيرة رايحة، وراجع منها فرق الـ DOM. يعني [[currentCount]] عايش في ذاكرة السيرفر، مش في المتصفح.

---

## ٥. [[dotnet new worker -o Jobs]]

برنامج شغال في الخلفية من غير HTTP. الملف المهم:

~~~csharp Jobs/Worker.cs
public class Worker(ILogger<Worker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            ...
            logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await Task.Delay(1000, stoppingToken);
        }
    }
}
~~~

باختصار: loop بيكتب log كل ثانية لحد ما البرنامج يتقفل. كل كلمة هنا ([[BackgroundService]] و [[async]] و [[CancellationToken]] و [[ILogger]]) ليها درس في المستوى ٢ و ٣.

---

## الخلاصة

| القالب | بيعمل إيه | المستوى ده؟ |
|---|---|---|
| [[webapi]] | API بـ minimal APIs | أيوه، أساس التاب |
| [[webapi --use-controllers]] | API بـ controllers | أيوه |
| [[blazor]] | UI بـ C#، التفاعل على السيرفر أو WebAssembly | معلومة عامة |
| [[mvc]] و [[webapp]] | صفحات HTML من السيرفر | معلومة عامة |
| [[worker]] | شغل في الخلفية | المستوى ٣ |

- كله ASP.NET Core فوق نفس الـ runtime.
- Blazor Server: الـ state على السيرفر، وكل ضغطة رسالة على websocket.`,
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
    }
  ]
});
