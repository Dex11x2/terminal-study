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
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف متغيرات من أنواع مختلفة، ويعمل عليها حسابات، ويوريك ٤ حاجات بتفاجئ اللي جاي من JS: [[double]] بيغلط في الكسور و [[decimal]] لأ، وقسمة رقمين صحيحين بتشيل الكسر، و [[int]] ليه سقف ولما يعدّيه بيلف، والنوع مبيتغيرش. كل الناتج تحت حقيقي من [[dotnet run types.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12). السطر الأخير اتشال وقت التشغيل لأنه بيمنع البرنامج يتبني، وجرّبته لوحده.

---

## ١. التعريفات

~~~csharp types.cs
var name = "Sara";
int age = 27;
decimal price = 19.99m;
double ratio = 0.1 + 0.2;
~~~

كل سطر: **النوع** ثم **الاسم** ثم [[=]] ثم القيمة ثم [[;]].

| السطر | النوع | ليه |
|---|---|---|
| [[var name = "Sara";]] | [[string]] | [[var]] = «استنتج النوع من القيمة». القيمة نص، فالنوع [[string]] للأبد |
| [[int age = 27;]] | [[int]] | رقم صحيح 32-bit |
| [[decimal price = 19.99m;]] | [[decimal]] | رقم عشري بالنظام العشري (للفلوس). الـ [[m]] في الآخر إجبارية |
| [[double ratio = 0.1 + 0.2;]] | [[double]] | رقم عشري بالنظام الثنائي، زي [[number]] في JS بالظبط |

### ليه [[m]] بعد [[19.99]]؟

أي رقم فيه علامة عشرية C# بيعتبره [[double]] لوحده. ولو حطيته في [[decimal]] من غير [[m]]:

~~~text الناتج: build
error CS0664: Literal of type double cannot be implicitly converted to type 'decimal'; use an 'M' suffix to create a literal of this type
~~~

الـ compiler مش هيحوّل من نفسه، لأن التحويل ممكن يغيّر القيمة. وفيه لواحق تانية: [[10L]] لـ [[long]]، و [[2.5f]] لـ [[float]].

### اتأكدت من الأنواع وقت التشغيل

[[x.GetType()]] بيرجع النوع الحقيقي، وده موجود لأن الأنواع في C# بتفضل وقت التشغيل (مش زي TS اللي بتتمسح):

~~~text الناتج
System.String
System.Decimal
System.Double
~~~

[[string]] و [[decimal]] و [[double]] أسماء مختصرة لـ [[System.String]] و [[System.Decimal]] و [[System.Double]].

---

## ٢. الطباعة بالـ interpolation

~~~csharp types.cs
Console.WriteLine($"Hi {name}, {age + 1}, {price * 2}");
~~~

- [[$"..."]]: نص فيه [[{ }]]، وأي حاجة جواها بتتحسب.
- [[{age + 1}]]: 27 + 1.
- [[{price * 2}]]: 19.99 × 2، والنتيجة [[decimal]].

~~~text الناتج
Hi Sara, 28, 39.98
~~~

---

## ٣. [[double]] ضد [[decimal]]

~~~csharp types.cs
Console.WriteLine(ratio);
Console.WriteLine(0.1m + 0.2m);
~~~

~~~text الناتج
0.30000000000000004
0.3
~~~

### ليه الـ double غلط؟

الـ [[double]] بيخزّن الرقم بالنظام الثنائي (0 و 1). و 0.1 في الثنائي كسر مبيخلصش (زي ما ⅓ في العشري 0.333... مبيخلصش)، فبيتخزن تقريب. والتقريبين لما يتجمعوا يطلع الفرق الصغير ده في الخانة الـ 17. وده نفس اللي بيحصل في JS، لأن [[number]] هو [[double]].

### والـ decimal؟

[[decimal]] بيخزن الرقم بالنظام العشري: رقم صحيح لحد ٢٨-٢٩ خانة، ومعاه «العلامة العشرية فين». فـ 0.1 بتتخزن 1 مع «خانة واحدة بعد العلامة» بالظبط، ومفيش تقريب. التمن: أبطأ من [[double]] ومداه أصغر. أكبر قيمة طبعتها:

~~~text decimal.MaxValue
79228162514264337593543950335
~~~

---

## ٤. القسمة

~~~csharp types.cs
Console.WriteLine(7 / 2);
Console.WriteLine(7 / 2.0);
~~~

~~~text الناتج
3
3.5
~~~

- [[7 / 2]]: الاتنين [[int]]، فالنتيجة [[int]]، والكسر **بيتشال** (مش بيتقرّب: 3.5 بقت 3).
- [[7 / 2.0]]: [[2.0]] نوعه [[double]]، فالـ 7 بتتحوّل [[double]] الأول، والنتيجة 3.5.

القاعدة: نوع النتيجة بييجي من نوع الطرفين. فلو عندك [[sum / count]] والاتنين [[int]] والمفروض متوسط، اكتب [[(double)sum / count]].

---

## ٥. الـ overflow

~~~csharp types.cs
int big = int.MaxValue;
Console.WriteLine(big + 1);
~~~

- [[int.MaxValue]]: أكبر قيمة [[int]] يشيلها: [[2147483647]] (يعني 2 أس 31 ناقص 1، لأن bit واحد من الـ 32 للإشارة).
- [[big + 1]]: مفيش مكان، فبيلف لأصغر قيمة:

~~~text الناتج
-2147483648
~~~

من غير أي error. ده اسمه **unchecked** وده الافتراضي عشان السرعة. ولو عايز exception:

~~~csharp
Console.WriteLine(checked(big + 1));
~~~

~~~text الناتج
Unhandled exception. System.OverflowException: Arithmetic operation resulted in an overflow.
   at Program.<Main>$(String[] args) in /w/l6/chk.cs:line 2
~~~

ولو كتبتها ثوابت صريحة [[int.MaxValue + 1]]، الـ compiler بيحسبها بنفسه ويمسكها:

~~~text الناتج: build
error CS0220: The operation overflows at compile time in checked mode
~~~

ولو الأرقام هتكبر: [[long]] أقصاه [[9223372036854775807]].

---

## ٦. النوع مبيتغيرش

~~~csharp types.cs
age = "28";
~~~

~~~text الناتج: dotnet run
err.cs(20,7): error CS0029: Cannot implicitly convert type 'string' to 'int'
The build failed. Fix the build errors and run again.
~~~

- [[(20,7)]]: السطر 20، العمود 7 (جرّبته في نسخة من الملف اسمها [[err.cs]] فيها سطور زيادة).
- [[CS0029]]: كود الخطأ. ابحث بيه وهتلاقي صفحته في docs مايكروسوفت.
- [[implicitly]]: «لوحده من غير ما تطلب».

والمهم: **البرنامج كله مش هيتبني**، ولا سطر هيشتغل. في TS لو فيه type error الـ JS بيطلع برضه غالبًا. ونفس الخطأ مع [[var x = 5; x = "a";]]: [[var]] مش [[dynamic]].

---

## ٧. التجربة: الفاتورة و Parse

~~~csharp sol.cs
double[] pricesD = [0.10, 0.20, 0.30];
decimal[] pricesM = [0.10m, 0.20m, 0.30m];
Console.WriteLine(pricesD.Sum());
Console.WriteLine(pricesM.Sum());
Console.WriteLine(int.TryParse("12a", out var n) ? n : "not a number");
Console.WriteLine(int.Parse("12a"));
~~~

- [[double[]]]: array من [[double]]. و [[[0.10, 0.20, 0.30]]] اسمها collection expression (C# 12)، زي array في JS.
- [[.Sum()]]: من LINQ (ليه درس قدام): يجمع العناصر.

~~~text الناتج
0.6000000000000001
0.60
not a number
Unhandled exception. System.FormatException: The input string '12a' was not in a correct format.
   at System.Number.ThrowFormatException[TChar](ReadOnlySpan$__bt1 value)
   at System.Int32.Parse(String s)
   at Program.<Main>$(String[] args) in /w/l6/sol.cs:line 6
~~~

### [[0.60]] مش [[0.6]]؟

الـ [[decimal]] بيفتكر عدد الخانات اللي كتبتها: [[0.10m]] خانتين، فالمجموع خانتين. ونفس الفكرة: [[0.1m + 0.20m]] طبعت [[0.30]].

### [[int.TryParse("12a", out var n)]]

- [[TryParse]]: «حاول تحوّل النص لرقم»، وبترجع [[bool]]: نجحت ولا لأ.
- [[out var n]]: [[out]] معناها «الدالة دي هتكتب في المتغير ده». و [[var n]] بتعرّفه في نفس المكان. لو التحويل فشل [[n]] بيبقى 0.
- [[? n : "not a number"]]: ternary. فشل، فطبع [["not a number"]].

### [[int.Parse("12a")]]

نفس التحويل بس لو فشل بيرمي [[FormatException]]، ومحدش مسكها فالبرنامج وقع. السطور اللي بتبدأ بـ [[at]] اسمها stack trace: مين نادى مين، من تحت لفوق، وآخرها [[line 6]]: السطر اللي وقع.

---

## الخلاصة

| النوع | استخدمه لـ | ملاحظة |
|---|---|---|
| [[int]] | العدادات والـ IDs | أقصاه 2,147,483,647 وبيلف بهدوء |
| [[long]] | أرقام أكبر | لاحقة [[L]] |
| [[double]] | قياسات وحسابات علمية | تقريب ثنائي زي JS |
| [[decimal]] | الفلوس | لاحقة [[m]]، دقيق في الكسور العشرية |
| [[string]] | نصوص | [[$"...{x}..."]] للـ interpolation |

- [[var]] استنتاج نوع وقت الـ compile، مش متغير يقبل أي حاجة.
- int على int = int (الكسر بيتشال).
- [[TryParse]] لأي input جاي من برّه، و [[Parse]] لما تكون متأكد.`,
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
            mistakes: R`struct كبيرة أو mutable: كل نسخة بتكلّف، والتعديل على نسخة مش بيأثر على الأصل فتتوه (أشهرها تعديل عنصر struct جوه [[List<T>]]: بالـ indexer [[list[0].X = 5]] بيطلع error CS1612، وجوه [[foreach]] بيطلع error CS1654). وتفتكر إن «value types على الـ stack دايمًا»: لأ، field من نوع int جوه class عايش في الـ heap مع الـ object.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعمل نفس الحاجة مرتين: نقطة (X و Y)، ينسخها، ويعدّل في النسخة. مرة النقطة [[struct]] ومرة [[class]]، وتشوف إن الأصل اتغير في واحدة بس. وبعدين بيقارن نقطتين متطابقتين. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. التعريفات (آخر سطرين)

في الـ top-level statements الأنواع بتتكتب **بعد** الكود، فنبدأ بيهم.

~~~csharp points.cs
struct PointS(int x, int y) { public int X = x; public int Y = y; }
class PointC { public int X; public int Y; }
~~~

### [[struct PointS(int x, int y)]]

- [[struct]]: نوع **value type**: المتغير شايل القيمة نفسها.
- [[(int x, int y)]]: اسمه primary constructor (C# 12): بارامترات بتتبعت وقت [[new PointS(1, 2)]].
- [[public int X = x;]]: حقل (field) اسمه [[X]] نوعه [[int]]، مرئي للكل ([[public]])، وقيمته الأولى من [[x]]. الحرف الصغير للبارامتر والكبير للحقل.

### [[class PointC]]

- [[class]]: نوع **reference type**: المتغير شايل «عنوان» object موجود في حتة تانية في الذاكرة (الـ heap).
- حقلين من غير قيمة أولى، فبيبدأوا بـ 0 (الـ default بتاع [[int]]).

---

## ٢. الـ struct

~~~csharp points.cs
var p1 = new PointS(1, 2);
var p2 = p1;
p2.X = 99;
Console.WriteLine($"struct: p1.X={p1.X} p2.X={p2.X}");
~~~

1. [[new PointS(1, 2)]]: اعمل نقطة X=1 و Y=2، وحطها **جوه** [[p1]].
2. [[var p2 = p1;]]: انسخ **القيم** كلها لـ [[p2]]. دلوقتي فيه نقطتين منفصلين.
3. [[p2.X = 99;]]: [[.]] بتوصل لحقل جوه المتغير. غيّرنا نسخة [[p2]] بس.

~~~text الناتج
struct: p1.X=1 p2.X=99
~~~

[[p1]] متأثرش.

---

## ٣. الـ class

~~~csharp points.cs
var c1 = new PointC { X = 1, Y = 2 };
var c2 = c1;
c2.X = 99;
Console.WriteLine($"class:  c1.X={c1.X} c2.X={c2.X}");
~~~

1. [[new PointC { X = 1, Y = 2 }]]: اعمل object في الـ heap، والـ [[{ X = 1, Y = 2 }]] اسمها object initializer: بتحط قيم في الحقول بعد الإنشاء على طول. و [[c1]] شايل عنوان الـ object ده.
2. [[var c2 = c1;]]: انسخ **العنوان**. الاتنين بيشاوروا على object واحد.
3. [[c2.X = 99;]]: روح للـ object اللي [[c2]] بيشاور عليه وغيّر X. وهو نفسه بتاع [[c1]].

~~~text الناتج
class:  c1.X=99 c2.X=99
~~~

| | [[struct]] | [[class]] |
|---|---|---|
| المتغير شايل | القيمة نفسها | عنوان (reference) |
| [[a = b]] بينسخ | كل الحقول | العنوان بس |
| التعديل على النسخة | مش بيأثر على الأصل | بيأثر، لأنه نفس الـ object |
| زي إيه في JS | number و string | object و array |

---

## ٤. المقارنة

~~~csharp points.cs
Console.WriteLine(new PointC { X = 1 } == new PointC { X = 1 });
Console.WriteLine(new PointS(1, 2).Equals(new PointS(1, 2)));
~~~

~~~text الناتج
False
True
~~~

- [[==]] بين objectين من class بيسأل: «نفس الـ object؟» مش «نفس القيم؟». ودول اتنين [[new]] يعني objectين، فـ [[False]]. زي [[{x:1} === {x:1}]] في JS.
- [[.Equals(...)]] بتاع الـ struct بيقارن الحقول واحد واحد: [[True]].

### وليه مكتبناش [[==]] للـ struct؟

جرّبت:

~~~text الناتج: build
error CS0019: Operator '==' cannot be applied to operands of type 'PointS' and 'PointS'
~~~

الـ struct بتاعتك ملهاش [[==]] غير لو عرّفته بنفسك (أو استخدمت [[record struct]] اللي بيعمله لوحده).

---

## ٥. التجربة: struct و class جوه method

~~~csharp sol.cs
var p1 = new PointS(1, 2);
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
~~~

### [[static class Points]]

class مش هتعمل منها objects، شايلة methods بس. و [[public static void Reset(...)]]:

- [[public]]: مرئية برّه الـ class.
- [[static]]: بتتنادي على الـ class نفسها [[Points.Reset(...)]] مش على object.
- [[void]]: مبترجعش حاجة.
- [[=> p.X = 0;]]: جسم الـ method سطر واحد.

٣ methods بنفس الاسم وبارامترات مختلفة: ده اسمه **overloading**، والـ compiler بيختار حسب نوع الـ argument.

### [[ref PointS p]]

[[ref]] معناها «ابعت المتغير نفسه، مش نسخة منه». ولازم تتكتب في الناحيتين: في تعريف الـ method وفي النداء [[Points.Reset(ref p1)]].

~~~text الناتج
1 0
0
~~~

| النداء | اللي اتبعت | الأصل اتغير؟ |
|---|---|---|
| [[Reset(p1)]] (struct) | نسخة من النقطة | لأ، فضل 1 |
| [[Reset(c1)]] (class) | نسخة من العنوان، بس بيشاور على نفس الـ object | أيوه، بقى 0 |
| [[Reset(ref p1)]] | المتغير نفسه | أيوه، بقى 0 |

والـ build طلّع تحذير ملوش علاقة بالدرس: [[warning CS0649: Field 'PointC.Y' is never assigned to]]: الحقل Y عمره ما اتكتب فيه.

### أخطاء جرّبتها

| الكود | الخطأ |
|---|---|
| [[Points.Reset(a)]] والـ method عايزة [[ref]] | [[error CS1620: Argument 1 must be passed with the 'ref' keyword]] |
| نفس الـ methods كـ local functions تحت الكود | [[error CS0128: A local variable or function named 'Reset' is already defined in this scope]] |
| [[list[0].X = 5;]] و list من structs | [[error CS1612: Cannot modify the return value of 'List<PointS>.this[int]' because it is not a variable]] |
| [[foreach (var p in list) p.X = 5;]] | [[error CS1654: Cannot modify members of 'p' because it is a 'foreach iteration variable']] |

آخر اتنين نفس الفكرة: [[list[0]]] بيرجعلك **نسخة** من الـ struct، فالـ compiler بيمنعك تعدّل نسخة هتترمي.

ولما عملت method بتعمل [[c = new PointC { X = 7 };]] (من غير [[ref]]) وناديتها على [[c1]]، [[c1.X]] فضل [[1]]: انت غيّرت النسخة المحلية من العنوان، مش الـ object.

---

## الخلاصة

- [[class]]: المتغير عنوان، والنسخ بيشارك نفس الـ object، و [[==]] بيقارن العناوين.
- [[struct]]: المتغير هو القيمة، والنسخ نسخة كاملة، و [[Equals]] بيقارن الحقول.
- أي argument بيتبعت نسخة. الفرق إن نسخة الـ class عنوان بيوصل لنفس الـ object. [[ref]] بيبعت المتغير نفسه.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

دالة بتدوّر على اسم وممكن متلاقيش فترجع [[null]]، وبعدين ٥ طرق تتعامل بيها مع القيمة دي: واحدة غلط (والـ compiler بيحذّرك منها) وأربعة صح. وفي الآخر نوع null تاني خالص للأرقام. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12)، والـ nullable شغال افتراضيًا هناك زي أي مشروع جديد.

---

## ١. الدالة

~~~csharp t.cs
string? FindName(int id) => id == 1 ? "Sara" : null;
~~~

نقراها من الشمال:

- [[string?]]: نوع الرجوع. الـ [[?]] بعد النوع معناها «ممكن تبقى null». من غيرها [[string]] لوحدها معناها «مضمون مش null».
- [[FindName(int id)]]: اسم الدالة وبارامتر [[int]]. دي local function: دالة متعرّفة جوه الـ top-level statements.
- [[=>]]: جسمها expression واحد.
- [[id == 1 ? "Sara" : null]]: ternary: لو [[id]] بـ 1 رجّع [["Sara"]]، غير كده [[null]].

---

## ٢. القيمة null فعلًا

~~~csharp t.cs
string? name = FindName(2);
~~~

[[2]] مش 1، فـ [[name]] بقى [[null]]. ولازم نكتب النوع [[string?]]: لو كتبت [[string name = ...]] الـ compiler هيحذّر إنك بتحط حاجة ممكن تبقى null في متغير مش nullable.

---

## ٣. الغلط: [[name.Length]]

~~~csharp t.cs
Console.WriteLine(name.Length);
~~~

[[.Length]] عدد حروف النص. بس [[name]] مفيهوش نص أصلًا. شغّلت المثال زي ما هو:

~~~text الناتج: dotnet run
t.cs(3,19): warning CS8602: Dereference of a possibly null reference.
Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at Program.<Main>$(String[] args) in /w/l8/t.cs:line 3
~~~

حاجتين حصلوا ورا بعض:

1. **وقت الـ build:** [[warning CS8602]]. **Dereference** يعني «تفتح الـ reference وتوصل للي جواه» (بالـ [[.]]). يعني: «انت بتفتح حاجة ممكن تبقى null». والـ [[(3,19)]] السطر 3 العمود 19، مكان [[name]] بالظبط. وده **تحذير**، فالبرنامج اتبنى عادي.
2. **وقت التشغيل:** [[NullReferenceException]] على نفس السطر، والبرنامج وقع. الـ compiler كان قايلك.

ده الفرق المهم عن TS: الـ [[?]] على reference type مش بيغيّر حاجة في البرنامج نفسه. هي معلومة للـ compiler عشان يحذّرك بس.

---

## ٤. الطرق الصح

شلت السطر الغلط وشغّلت الباقي:

~~~csharp t.cs
Console.WriteLine(name?.Length);
Console.WriteLine(name?.Length ?? 0);
string safe = name ?? "guest";
if (name is not null) Console.WriteLine(name.Length);
~~~

~~~text الناتج
(سطر فاضي)
0
~~~

### [[name?.Length]]

[[?.]] اسمه null-conditional: «لو [[name]] null رجّع null على طول ومتكملش، غير كده هات [[Length]]». النتيجة نوعها [[int?]]، وقيمتها هنا null، و [[WriteLine]] بيطبع null كسطر فاضي.

### [[name?.Length ?? 0]]

[[??]] اسمه null-coalescing: «لو الشمال null خد اليمين». الشمال null، فطبع [[0]]. ده نفس [[??]] في JS.

### [[string safe = name ?? "guest";]]

نفس الفكرة بس النتيجة نوعها [[string]] من غير [[?]]: الـ compiler عارف إنها مستحيل تبقى null لأن اليمين [["guest"]]. طبعت [[safe]] للتأكد وطلع [[guest]]. وفيه كمان [[??=]]: [[name ??= "guest";]] يعني «لو null حط فيه guest».

### [[if (name is not null) ...]]

- [[is not null]]: فحص صريح. ويتكتب كمان [[is null]].
- جوه الـ [[if]] الـ compiler **عارف** إن [[name]] مش null، فـ [[name.Length]] من غير تحذير. ده اسمه flow analysis، زي الـ narrowing في TS.
- هنا [[name]] null، فالشرط false ومفيش طباعة.

---

## ٥. [[int?]]: null من نوع تاني

~~~csharp t.cs
int? maybe = null;
Console.WriteLine(maybe.HasValue);
~~~

~~~text الناتج
False
~~~

[[int]] عادي مينفعش يبقى null أصلًا (value type، درس value و reference). [[int?]] اختصار لنوع حقيقي اسمه [[Nullable<int>]]: صندوق فيه [[HasValue]] (فيه قيمة؟) و [[Value]] (القيمة). اتأكدت:

~~~text typeof(int?)
System.Nullable$__bt1[System.Int32]
~~~

ولو قريت [[.Value]] وهو فاضي:

~~~text الناتج
warning CS8629: Nullable value type may be null.
Unhandled exception. System.InvalidOperationException: Nullable object must have a value.
~~~

والعكس: [[string?]] **مش** نوع تاني. [[typeof(string) == t.GetType()]] لمتغير [[string? t = "a"]] طلعت [[True]].

| | [[int?]] | [[string?]] |
|---|---|---|
| إيه هو | نوع حقيقي [[Nullable<int>]] | [[string]] عادي + ملاحظة للـ compiler |
| موجود وقت التشغيل؟ | أيوه | لأ |
| تقرا القيمة | [[.Value]] أو [[?? 0]] | على طول، بعد الفحص |

---

## ٦. التحذيرات التانية اللي هتقابلها

جرّبت ٣ أخطاء شائعة:

| الكود | التحذير |
|---|---|
| [[string s = null;]] | [[CS8600: Converting null literal or possible null value to non-nullable type.]] |
| property [[string Email]] من غير قيمة | [[CS8618: Non-nullable property 'Email' must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring the property as nullable.]] |
| [[m.Value]] و [[m]] نوعه [[int?]] | [[CS8629: Nullable value type may be null.]] |

---

## ٧. التجربة: التحذير يبقى error

حطيت [[#:property WarningsAsErrors=nullable]] أول سطر في الملف (في مشروع عادي: [[<WarningsAsErrors>nullable</WarningsAsErrors>]] جوه [[<PropertyGroup>]] في الـ csproj):

~~~text الناتج: dotnet run
wae.cs(4,19): error CS8602: Dereference of a possibly null reference.
The build failed. Fix the build errors and run again.
~~~

نفس الرسالة بس بقت [[error]]، والبرنامج مش هيتبني. (نسخة من الملف اسمها [[wae.cs]]، والسطر بقى 4 لأن سطر الـ property اتضاف فوق.) و [[nullable]] هنا اسم مجموعة: كل تحذيرات null مرة واحدة.

---

## الخلاصة

| الرمز | معناه | مثال |
|---|---|---|
| [[T?]] | ممكن null | [[string? name]] |
| [[?.]] | لو null وقّف ورجّع null | [[name?.Length]] |
| [[??]] | لو null خد ده | [[name ?? "guest"]] |
| [[??=]] | لو null حط ده | [[name ??= "guest"]] |
| [[is not null]] | فحص، وبعده الـ compiler مطمن | [[if (name is not null)]] |
| [[!]] | «صدقني مش null»، بيسكّت التحذير بس | [[name!.Length]] |

- تحذيرات null بتتجاهل على مسؤوليتك: البرنامج بيتبني وبيقع وقت التشغيل.
- في أي مشروع جد خليها errors بـ [[WarningsAsErrors]].`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف class لحساب بنكي ([[Account]]) الرصيد بتاعه محمي: تقدر تقراه من أي حتة، بس متغيّروش غير عن طريق [[Deposit]] اللي بتفحص المبلغ. و class تانية ([[User]]) فيها property إجبارية. وآخر سطرين في الكود قبل التعريفات غلطات مقصودة، والـ compiler بيمسكهم. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12، C# 14).

---

## ١. [[class Account]] من فوق لتحت

~~~csharp account.cs
public class Account(string owner, decimal opening)
{
~~~

- [[public]]: مرئية من أي حتة، حتى من مشروع تاني. من غيرها تبقى [[internal]] (جوه المشروع ده بس).
- [[class Account]]: نوع جديد اسمه Account.
- [[(string owner, decimal opening)]]: primary constructor (C# 12): البارامترات اللي لازم تتبعت مع [[new]]. ومتاحة جوه الـ class كلها.
- [[{]]: بداية جسم الـ class.

### [[public string Owner { get; } = owner;]]

ده **property**: شبه field بس ليه «باب» للقراية ([[get]]) و «باب» للكتابة ([[set]]).

- [[{ get; }]]: باب قراية بس. مفيش [[set]]، فمحدش يقدر يغيّرها بعد الإنشاء.
- [[= owner;]]: القيمة الأولى من بارامتر الـ constructor.

### [[public decimal Balance { get; private set; } = opening;]]

- [[get;]] من غير كلمة قبلها: بياخد الـ [[public]] بتاع الـ property، فأي حد يقرا.
- [[private set;]]: باب الكتابة [[private]]: جوه الـ class دي بس.

ليه مش field عادي؟ لأن الـ property بتخليك تقفل الكتابة وتسيب القراية. والـ [[{ get; set; }]] الفاضية دي اسمها auto-property: الـ compiler بيعمل field مخفي يشيل القيمة.

### الـ method: [[Deposit]]

~~~csharp account.cs
    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }
~~~

- [[void]]: مبترجعش قيمة.
- [[if (amount <= 0)]]: الشرط بين أقواس، و [[<=]] أصغر من أو يساوي.
- [[throw new ArgumentOutOfRangeException(...)]]: [[throw]] زي JS: ارمي exception ووقّف. و [[ArgumentOutOfRangeException]] نوع exception جاهز معناه «البارامتر قيمته برّه المسموح».
- [[nameof(amount)]]: بيرجع النص [["amount"]]. ليه مش تكتبه بإيدك؟ لو غيّرت اسم البارامتر بالـ refactor، [[nameof]] بيتغير معاه، والنص الثابت لأ.
- [[Balance += amount;]]: زوّد الرصيد. ده مسموح لأننا جوه الـ class ([[private set]]).

جرّبت [[acc.Deposit(-5m)]]:

~~~text الناتج
Unhandled exception. System.ArgumentOutOfRangeException: Specified argument was out of the range of valid values. (Parameter 'amount')
   at Account.Deposit(Decimal amount) in /w/l9/neg.cs:line 13
~~~

لاحظ [[(Parameter 'amount')]]: ده اللي [[nameof]] جابه.

### [[public override string ToString() => $"{Owner}: {Balance:0.00}";]]

- كل object في C# عنده method اسمها [[ToString]]، والافتراضية بترجع اسم النوع ([[Account]]). [[override]] معناها «بدّل النسخة الافتراضية بدي».
- [[=>]]: الـ method سطر واحد (expression-bodied).
- [[{Balance:0.00}]]: الـ [[:0.00]] format: رقمين بعد العلامة دايمًا.

و [[Console.WriteLine(acc)]] بينادي [[ToString()]] لوحده.

---

## ٢. [[class User]]

~~~csharp account.cs
public class User
{
    public required string Email { get; init; }
    public string Name { get; set; } = "guest";
}
~~~

| الكلمة | معناها |
|---|---|
| [[required]] | اللي بيعمل [[new User]] لازم يدّي قيمة لـ [[Email]] |
| [[init]] | بدل [[set]]: الكتابة مسموحة وقت الإنشاء بس، وبعدها تقفل |
| [[{ get; set; }]] | قراية وكتابة عادي من أي حتة |
| [[= "guest"]] | قيمة افتراضية لو محدش حط قيمة |

---

## ٣. استخدام الاتنين

~~~csharp account.cs
var acc = new Account("Sara", 100m);
acc.Deposit(50m);
Console.WriteLine(acc);
var u = new User { Email = "sara@x.com" };
Console.WriteLine(u.Name);
~~~

- [[new Account("Sara", 100m)]]: [[owner]] = Sara و [[opening]] = 100.
- [[acc.Deposit(50m)]]: 100 + 50.
- [[new User { Email = "..." }]]: الـ [[{ }]] بعد [[new]] اسمها object initializer: بتحط قيم في properties وقت الإنشاء. ده المكان الوحيد اللي [[init]] بيسمح فيه.

~~~text الناتج
Sara: 150.00
guest
~~~

---

## ٤. الغلطتين المقصودتين

شغّلت الملف بالسطرين:

~~~text الناتج: dotnet run
cls.cs(6,1): error CS0272: The property or indexer 'Account.Balance' cannot be used in this context because the set accessor is inaccessible
cls.cs(7,15): error CS9035: Required member 'User.Email' must be set in the object initializer or attribute constructor.
The build failed. Fix the build errors and run again.
~~~

- [[acc.Balance = 0;]]: الـ [[set]] بتاع [[Balance]] [[private]]، وإحنا برّه الـ class. **accessor** يعني باب الـ get أو الـ set.
- [[new User()]] من غير [[Email]]: [[required]] اتكسر.

وغلطة تالتة جرّبتها: [[u.Email = "x";]] بعد الإنشاء:

~~~text الناتج: build
error CS8852: Init-only property or indexer 'User.Email' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.
~~~

الثلاثة **أخطاء compile**: البرنامج مش بيتبني أصلًا. مش محتاج تختبر عشان تكتشفهم.

---

## ٥. التجربة: Withdraw و IsEmpty

~~~csharp sol.cs
public bool IsEmpty => Balance == 0;
public void Withdraw(decimal amount)
{
    if (amount > Balance)
        throw new InvalidOperationException($"Insufficient funds: balance {Balance:0.00}, requested {amount:0.00}");
    Balance -= amount;
}
~~~

- [[IsEmpty => Balance == 0]]: property **محسوبة**: مفيش قيمة متخزنة، الـ [[=>]] بتتحسب كل مرة حد يقرا [[IsEmpty]].
- [[InvalidOperationException]]: exception معناه «العملية دي مينفعش دلوقتي بسبب حالة الـ object». مناسب هنا لأن المبلغ نفسه سليم، بس الرصيد مش كفاية.
- [[try { ... } catch (InvalidOperationException ex) { ... }]]: زي JS، بس الـ [[catch]] بيحدد نوع الـ exception اللي يمسكه، و [[ex.Message]] الرسالة.

~~~text الناتج
Insufficient funds: balance 150.00, requested 500.00
True
~~~

### [[=>]] ولا [[=]]؟

جرّبت أكتبها [[public bool IsEmpty { get; } = Balance == 0;]]:

~~~text الناتج: build
error CS0236: A field initializer cannot reference the non-static field, method, or property 'Account.Balance'
~~~

ولما خليتها [[{ get; } = opening == 0;]] وسحبت الرصيد كله، طبعت [[False]] والنسخة بـ [[=>]] طبعت [[True]]: الـ [[=]] اتحسبت مرة واحدة وقت الإنشاء.

---

## ٦. زيادة من C# 14: كلمة [[field]]

لو عايز منطق في الـ setter من غير ما تكتب field بإيدك:

~~~csharp field.cs
var t = new Tag { Name = "  dotnet  " };
Console.WriteLine($"[{t.Name}]");
class Tag { public string Name { get; set => field = value.Trim(); } = ""; }
~~~

~~~text الناتج
[dotnet]
~~~

[[field]] هو الـ field المخفي، و [[value]] القيمة اللي اتبعتت للـ set، و [[.Trim()]] بتشيل المسافات من الطرفين.

---

## الخلاصة

| الشكل | قراية | كتابة |
|---|---|---|
| [[{ get; }]] | الكل | وقت الإنشاء من جوه الـ class بس |
| [[{ get; set; }]] | الكل | الكل |
| [[{ get; private set; }]] | الكل | جوه الـ class بس |
| [[{ get; init; }]] | الكل | وقت الإنشاء بس (object initializer) |
| [[required ... { get; init; }]] | الكل | وقت الإنشاء، وإجباري |
| [[=> expr]] | الكل، بتتحسب كل مرة | مفيش |

- الـ state يتغير عن طريق methods بتفحص القواعد، مش [[public set]].
- [[override ToString]] عشان الطباعة تبقى مفهومة.`,
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

لاحظ إن [[IsEmpty]] مفيهاش [[{ get; }]]: الـ [[=>]] معناها property محسوبة بتتحسب كل مرة تتقري، مش متخزنة. ولو كتبت [[public bool IsEmpty { get; } = Balance == 0;]] بدل [[=>]] الـ compiler هيرفض بـ error CS0236 (الـ initializer مينفعش يقرا property تانية في نفس الـ object)، ولو لفّيت عليها بـ [[= opening == 0;]] هتبقى قيمة اتحسبت مرة وقت الإنشاء وفضلت [[False]] حتى بعد ما الرصيد بقى صفر، وده غلط شائع.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف نوع للفلوس ([[Money]]) في سطر واحد كـ [[record]]، وبعدين يوريك اللي الـ record بيعمله لوحده: مقارنة بالقيمة، وطباعة مقروءة، ونسخة معدّلة بـ [[with]]، وفك القيم لمتغيرات. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. التعريف (آخر سطر)

~~~csharp money.cs
public record Money(decimal Amount, string Currency);
~~~

- [[record]]: class بس الـ compiler بيكتبلك حاجات كتير جاهزة.
- [[(decimal Amount, string Currency)]]: اسمها positional parameters. كل واحد بيبقى:
  - بارامتر في الـ constructor.
  - property عامة بنفس الاسم، [[{ get; init; }]]: تتقري، وتتكتب وقت الإنشاء بس.
- [[;]] في الآخر بدل [[{ }]]: مفيش جسم، السطر ده كفاية.

جرّبت [[a.Amount = 5;]] بعد الإنشاء:

~~~text الناتج: build
error CS8852: Init-only property or indexer 'Money.Amount' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.
~~~

يعني الـ record immutable: مبيتغيرش بعد ما يتعمل.

---

## ٢. المقارنة

~~~csharp money.cs
var a = new Money(100m, "EGP");
var b = new Money(100m, "EGP");
Console.WriteLine(a == b);
Console.WriteLine(ReferenceEquals(a, b));
~~~

~~~text الناتج
True
False
~~~

- [[a == b]]: الـ record بيعرّف [[==]] بنفسه: قارن كل property بالتانية. [[100 == 100]] و [[EGP == EGP]]، فـ [[True]]. (لو [[Money]] كانت class عادية كانت هتطلع [[False]]، درس value و reference.)
- [[ReferenceEquals(a, b)]]: سؤال تاني خالص: «هما نفس الـ object في الذاكرة؟» لأ، اتنين [[new]]، فـ [[False]].

وكمان [[a.GetHashCode() == b.GetHashCode()]] طلعت [[True]]. الـ hash code رقم بيتحسب من القيم، و [[Dictionary]] و [[HashSet]] بيستخدموه، فالـ record ينفع مفتاح فيهم من غير شغل.

---

## ٣. [[with]]

~~~csharp money.cs
var c = a with { Amount = 250m };
Console.WriteLine(c);
Console.WriteLine(a);
~~~

- [[a with { ... }]]: «اعمل نسخة جديدة من [[a]]، وغيّر فيها اللي بين الأقواس». زي [[{ ...a, amount: 250 }]] في JS.
- [[a]] نفسه مبيتغيرش، ده الهدف.

~~~text الناتج
Money { Amount = 250, Currency = EGP }
Money { Amount = 100, Currency = EGP }
~~~

الشكل ده هو الـ [[ToString]] اللي الـ record كتبه: اسم النوع وبعده كل property وقيمتها. وليه [[250]] مش [[250.00]]؟ لأن [[250m]] اتكتبت من غير خانات عشرية، والـ decimal بيطبع اللي اتكتب.

---

## ٤. الـ deconstruction

~~~csharp money.cs
var (amount, currency) = c;
Console.WriteLine($"{amount} {currency}");
~~~

- [[var (amount, currency) = c;]]: فك [[c]] لمتغيرين بالترتيب بتاع التعريف: [[Amount]] ثم [[Currency]]. زي [[const { amount, currency } = c]] في JS، بس بالترتيب مش بالاسم.
- ده شغال لأن الـ record عمل method مخفية اسمها [[Deconstruct]].

~~~text الناتج
250 EGP
~~~

---

## ٥. اللي الـ compiler كتبه من السطر الواحد

| الحاجة | بتعمل إيه | جرّبناها في |
|---|---|---|
| constructor | [[new Money(100m, "EGP")]] | ٢ |
| properties بـ [[init]] | قراية، ومفيش تعديل بعد الإنشاء | ١ |
| [[==]] و [[!=]] و [[Equals]] | مقارنة بالقيم | ٢ |
| [[GetHashCode]] | hash من القيم | ٢ |
| [[ToString]] | [[Money { Amount = ..., ... }]] | ٣ |
| نسخ لـ [[with]] | نسخة معدّلة | ٣ |
| [[Deconstruct]] | [[var (x, y) = ...]] | ٤ |

---

## ٦. التجربة: record جوه record، و List جوه record

~~~csharp sol.cs
var tags = new List<string> { "new" };
var c1 = new Customer("Sara", new Address("Cairo", "Tahrir"), tags);
var c2 = new Customer("Sara", new Address("Cairo", "Tahrir"), new List<string> { "new" });
Console.WriteLine(c1 == c2);
Console.WriteLine(c1.Address == c2.Address);
...
record Address(string City, string Street);
record Customer(string Name, Address Address, List<string> Tags);
~~~

- [[new List<string> { "new" }]]: list فيها عنصر واحد (الـ [[{ }]] هنا collection initializer).
- [[Address Address]]: property نوعها [[Address]] واسمها [[Address]]. عادي في C# الاسم والنوع يبقوا زي بعض.

~~~text الناتج
False
True
~~~

### ليه [[False]]؟

[[==]] بتاع [[Customer]] بيقارن كل property بالـ [[Equals]] بتاعها:

| الـ property | نوعها | المقارنة | النتيجة |
|---|---|---|---|
| [[Name]] | [[string]] | بالقيمة | متساويين |
| [[Address]] | record | بالقيمة | متساويين (السطر التاني [[True]]) |
| [[Tags]] | [[List<string>]] | class عادية، بالـ reference | listين مختلفين، **مش** متساويين |

ولما عملت [[c3]] بنفس الـ list [[tags]] بتاعة [[c1]]، [[c1 == c3]] طلعت [[True]]. وطباعة [[c1]] بتفضح الموضوع:

~~~text الناتج
Customer { Name = Sara, Address = Address { City = Cairo, Street = Tahrir }, Tags = System.Collections.Generic.List$__bt1[System.String] }
~~~

الـ List ملهاش [[ToString]] حلو، فبيطبع اسم نوعها بس.

### [[with]] نسخة سطحية (shallow)

~~~csharp sol.cs
var copy = c1 with { Name = "Omar" };
copy.Tags.Add("vip");
Console.WriteLine(string.Join(",", c1.Tags));
var safe = c1 with { Tags = [.. c1.Tags, "gold"] };
Console.WriteLine($"{c1.Tags.Count} {safe.Tags.Count}");
~~~

~~~text الناتج
new,vip
2 3
~~~

- [[with]] نسخ الـ properties واحدة واحدة. و [[Tags]] reference، فاتنسخ **العنوان**: [[copy.Tags]] و [[c1.Tags]] list واحدة. فلما ضفنا [["vip"]] في النسخة ظهرت في الأصل.
- [[string.Join(",", ...)]]: اربط العناصر بفاصلة، زي [[join]] في JS.
- [[[.. c1.Tags, "gold"]]]: collection expression فيها spread ([[..]] زي [[...]] في JS): list **جديدة** فيها القديم + gold. فـ [[c1]] فضل 2 والنسخة 3.

---

## الخلاصة

- [[record]] = class بيتقارن بالقيمة، و immutable، وطباعته مقروءة، وبيتنسخ بـ [[with]].
- المقارنة بالقيمة بتنزل جوه الـ records التانية، بس الـ List بتتقارن بالـ reference.
- [[with]] shallow: أي reference جوه بيتشارك بين الأصل والنسخة.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف عقد اسمه [[INotifier]] («أي حد يقدر يبعت رسالة»)، واتنين بيطبقوه (Email و SMS)، ودالة بتشتغل مع أي واحد فيهم من غير ما تعرف مين. وفيه class اسمها [[Duck]] عندها نفس الـ method بالظبط بس **مقالتش** إنها بتطبق العقد، فالـ compiler بيرفضها. وفي الآخر [[enum]]. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. العقد: [[interface]]

~~~csharp notify.cs
public interface INotifier { void Send(string to, string message); }
~~~

- [[interface]]: قايمة methods (و properties) **من غير تنفيذ**. مجرد «لازم يبقى عندك كذا».
- [[INotifier]]: الـ [[I]] في الأول عرف في .NET لأي interface.
- [[void Send(string to, string message);]]: الـ method: اسمها وبارامتراتها ونوع رجوعها، وبعدها [[;]] على طول من غير [[{ }]]. ومفيش [[public]]: كل حاجة في الـ interface public لوحدها.

---

## ٢. اللي بيطبقوا العقد

~~~csharp notify.cs
public class EmailNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"email to {to}: {message}");
}
~~~

- [[: INotifier]]: الـ [[:]] بعد اسم الـ class معناها «بتطبق» (أو «بتورث» لو بعدها class). ده **التصريح** اللي الـ compiler مستنيه.
- [[public void Send(...)]]: لازم نفس الاسم والبارامترات ونوع الرجوع، ولازم [[public]]. لو نسيتها الـ compiler هيقولك إن الـ class مطبقتش العقد.

و [[SmsNotifier]] نفس الشكل بنص مختلف: تنفيذ تاني لنفس العقد.

---

## ٣. الاستخدام

~~~csharp notify.cs
INotifier n = new EmailNotifier();
n.Send("sara@x.com", "hi");
Notify(new SmsNotifier(), "010", "code 1234");
...
static void Notify(INotifier notifier, string to, string msg) => notifier.Send(to, msg);
~~~

- [[INotifier n = new EmailNotifier();]]: نوع المتغير هو الـ interface، والـ object من class بتطبقه. من خلال [[n]] تقدر تنادي اللي في العقد بس.
- [[n.Send(...)]]: الـ object الحقيقي Email، فبيتنفذ كود الـ Email.
- [[static void Notify(INotifier notifier, ...)]]: local function بتاخد **أي** [[INotifier]]. هي متعرفش ولا يهمها Email ولا SMS. و [[static]] هنا معناها إنها مش بتلمس متغيرات الكود اللي حواليها.

~~~text الناتج
email to sara@x.com: hi
sms to 010: code 1234
~~~

---

## ٤. [[Duck]]: نفس الشكل، مش نفس النوع

~~~csharp notify.cs
public class Duck { public void Send(string to, string message) { } }
Notify(new Duck(), "x", "y");
~~~

~~~text الناتج: dotnet run
i.cs(4,8): error CS1503: Argument 1: cannot convert from 'Duck' to 'INotifier'
The build failed. Fix the build errors and run again.
~~~

- [[Argument 1]]: أول argument في النداء.
- [[cannot convert from 'Duck' to 'INotifier']]: الدالة عايزة [[INotifier]]، و [[Duck]] مش واحد، حتى لو عندها [[Send]] بنفس الشكل.

| | TypeScript | C# |
|---|---|---|
| النظام | structural: الشكل هو اللي يفرق | nominal: الاسم هو اللي يفرق |
| [[Duck]] تعدّي؟ | أيوه | لأ، لازم [[: INotifier]] |

(الملف ده اسمه [[i.cs]] في التجربة، والسطر ده اتشال عشان الباقي يشتغل.)

---

## ٥. الـ [[enum]]

~~~csharp notify.cs
public enum Status { Pending, Paid, Shipped }
Console.WriteLine(Status.Paid);
Console.WriteLine((int)Status.Paid);
Console.WriteLine(Enum.Parse<Status>("Shipped"));
~~~

- [[enum]]: نوع قيمه أسماء ثابتة. ووراها أرقام [[int]] بالترتيب من 0: [[Pending = 0]] و [[Paid = 1]] و [[Shipped = 2]].
- [[Status.Paid]]: القيمة، ولما تتطبع بيطلع اسمها.
- [[(int)Status.Paid]]: الـ [[(int)]] قبل القيمة اسمه cast: «حوّلها لـ int».
- [[Enum.Parse<Status>("Shipped")]]: من نص لـ enum. والـ [[<Status>]] بتقول «لأنهي enum».

~~~text الناتج
Paid
1
Shipped
~~~

### فخّين جرّبتهم

~~~text الناتج
(Status)5                       ->  5
Enum.IsDefined((Status)5)       ->  False
Enum.Parse<Status>("Lost")      ->  System.ArgumentException: Requested value 'Lost' was not found.
~~~

الـ cast من رقم مبيفحصش أي حاجة: [[(Status)5]] اتعمل عادي وطبع [[5]]. فلو الرقم جاي من برّه افحصه بـ [[Enum.IsDefined]]. و [[Parse]] بنص غلط بيرمي exception، وفيه [[Enum.TryParse]] زي [[int.TryParse]].

---

## ٦. التجربة: [[abstract class]]

~~~csharp sol.cs
List<Shape> shapes = [new Circle(5), new Rect(2, 3)];
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
}
~~~

### [[public abstract class Shape]]

[[abstract]] على الـ class معناها «مينفعش تعمل منها object، دي أساس لغيرها». جرّبت [[new Shape()]]:

~~~text الناتج: build
error CS0144: Cannot create an instance of the abstract type or interface 'Shape'
~~~

### [[public abstract double Area();]]

method من غير جسم، وأي class بتورث لازم تكتبها. يعني جزء «عقد» زي الـ interface.

### [[public string Describe() => ...]]

method **ليها** تنفيذ، وكل الـ classes اللي بتورث بتاخدها جاهزة. ده الفرق الكبير عن الـ interface: كود مشترك.

- [[GetType().Name]]: اسم النوع الحقيقي للـ object وقت التشغيل ([[Circle]] مش [[Shape]]).
- [[{Area():0.00}]]: بينادي [[Area]]، واللي بيتنفذ نسخة الـ class الحقيقية. ده اسمه polymorphism.

### [[public class Circle(double r) : Shape]]

- [[: Shape]]: بتورث [[Shape]].
- [[public override double Area()]]: [[override]] معناها «دي نسختي من الـ method اللي في الأب». إجبارية في C#.
- [[Math.PI * r * r]]: π نق².

### [[List<Shape> shapes = [...]]]

list نوعها [[Shape]] وجواها [[Circle]] و [[Rect]]، وده مسموح لأن الاتنين [[Shape]]. و [[foreach (var s in shapes)]] بيلف عليهم واحد واحد.

~~~text الناتج
Circle: 78.54
Rect: 6.00
~~~

π × 5 × 5 = 78.539...، والـ [[:0.00]] قرّبها لـ [[78.54]]. و 2 × 3 = [[6.00]].

### لو نسيت [[override]]

كتبت [[public double Area() => r;]] في [[Circle]] من غير [[override]]:

~~~text الناتج: build
error CS0534: 'Circle' does not implement inherited abstract member 'Shape.Area()'
warning CS0114: 'Circle.Area()' hides inherited member 'Shape.Area()'. To make the current member override that implementation, add the override keyword. Otherwise add the new keyword.
~~~

الـ compiler فهمها method **جديدة** بالصدفة نفس الاسم، مش تنفيذ للـ abstract. ومع method [[virtual]] (ليها تنفيذ في الأب) بيطلع التحذير CS0114 بس، والبرنامج بيتبني، وده أخطر: نداء [[Name()]] على متغير نوعه [[Shape]] هيشغّل نسخة الأب.

---

## الخلاصة

| | [[interface]] | [[abstract class]] |
|---|---|---|
| فيها كود؟ | لأ (عمليًا) | أيوه، مشترك |
| فيها state (حقول)؟ | لأ | أيوه |
| الـ class تاخد كام واحد؟ | أي عدد | واحدة بس |
| التطبيق | [[: INotifier]] | [[: Shape]] + [[override]] |

- C# nominal: لازم تكتب [[: IName]]، الشكل لوحده مش كفاية.
- الكود يعتمد على الـ interface، فتقدر تبدّل التنفيذ.
- [[enum]] وراه أرقام، والـ cast مبيفحصش.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيستخدم الـ ٤ collections اللي هتقابلهم كل يوم: [[List]] (قايمة بتكبر)، و array (حجمها ثابت)، و [[Dictionary]] (مفتاح وقيمة)، و [[HashSet]] (قيم من غير تكرار). وفي الآخر بيوريك إيه اللي بيحصل لو طلبت مفتاح مش موجود. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. [[List<string>]]

~~~csharp collections.cs
List<string> names = ["sara", "omar"];
names.Add("mona");
~~~

- [[List<string>]]: list عناصرها [[string]]. الـ [[<string>]] اسمه type argument: بيقول نوع العناصر (ليه درس generics). وأي حاجة مش string مش هتدخل.
- [[["sara", "omar"]]]: collection expression (C# 12): نفس شكل array في JS.
- [[names.Add("mona")]]: ضيف في الآخر، زي [[push]].

---

## ٢. array: [[int[]]]

~~~csharp collections.cs
int[] scores = [90, 75, 88];
~~~

[[int[]]] array من [[int]]، وحجمها **ثابت** على ٣. مفيش [[Add]]. ولو كتبت في خانة مش موجودة:

~~~text الناتج: scores[3] = 1
IndexOutOfRangeException: Index was outside the bounds of the array.
~~~

في JS ده كان هيكبّر الـ array بهدوء.

---

## ٣. [[Dictionary<string, int>]]

~~~csharp collections.cs
var stock = new Dictionary<string, int> { ["apple"] = 5, ["pear"] = 0 };
stock["kiwi"] = 12;
~~~

- [[Dictionary<string, int>]]: المفاتيح [[string]] والقيم [[int]]. زي [[Map]] في JS.
- [[new ... { ["apple"] = 5, ... }]]: اسمه index initializer: أول قيم وقت الإنشاء.
- [[stock["kiwi"] = 12;]]: لو المفتاح مش موجود يتضاف، ولو موجود يتكتب فوقه.

### [[TryGetValue]]

~~~csharp collections.cs
if (stock.TryGetValue("apple", out var qty)) Console.WriteLine($"apple: {qty}");
~~~

- [[TryGetValue("apple", out var qty)]]: دوّر على المفتاح. لو لقيته حط القيمة في [[qty]] ورجّع [[true]]، لو لأ رجّع [[false]].
- [[out var qty]]: [[out]] معناها «الدالة هتكتب في المتغير ده»، و [[var qty]] بتعرّفه هنا.

~~~text الناتج
apple: 5
~~~

### [[ContainsKey]]

~~~csharp collections.cs
Console.WriteLine(stock.ContainsKey("mango"));
~~~

~~~text الناتج
False
~~~

بيسأل بس، من غير ما يجيب القيمة.

---

## ٤. [[HashSet<string>]]

~~~csharp collections.cs
var tags = new HashSet<string> { "c#", "dotnet" };
Console.WriteLine(tags.Add("c#"));
~~~

- [[HashSet]]: مجموعة من غير تكرار، زي [[Set]] في JS.
- [[tags.Add("c#")]]: بيرجع [[bool]]: اتضاف ولا لأ. [["c#"]] موجود أصلًا:

~~~text الناتج
False
~~~

---

## ٥. الأعداد

~~~csharp collections.cs
Console.WriteLine($"{names.Count} {scores.Length} {stock.Count} {tags.Count}");
~~~

~~~text الناتج
3 3 3 2
~~~

| المتغير | العدد | ليه |
|---|---|---|
| [[names.Count]] | 3 | sara و omar و mona |
| [[scores.Length]] | 3 | الـ array بتستخدم [[Length]] مش [[Count]] |
| [[stock.Count]] | 3 | apple و pear و kiwi |
| [[tags.Count]] | 2 | [["c#"]] التانية متضافتش |

---

## ٦. [[string.Join]]

~~~csharp collections.cs
Console.WriteLine(string.Join(", ", names));
~~~

~~~text الناتج
sara, omar, mona
~~~

اربط العناصر بالفاصل ده، زي [[names.join(", ")]] في JS.

---

## ٧. المفتاح اللي مش موجود

~~~csharp collections.cs
Console.WriteLine(stock["mango"]);
~~~

~~~text الناتج
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'mango' was not present in the dictionary.
   at System.Collections.Generic.Dictionary$__bt2.get_Item(TKey key)
   at Program.<Main>$(String[] args) in /w/l12/c.cs:line 12
~~~

في JS كان هيرجع [[undefined]]. هنا exception والبرنامج وقع. و [[get_Item]] هو الاسم الداخلي للـ [[[ ]]] (اسمه indexer).

### بدايل جرّبتها

| الكود | الناتج |
|---|---|
| [[stock.GetValueOrDefault("mango")]] | [[0]] (الـ default بتاع int) |
| [[stock.Add("apple", 1)]] والمفتاح موجود | [[ArgumentException: An item with the same key has already been added. Key: apple]] |
| [[stock["apple"] = 1]] والمفتاح موجود | بيكتب فوقه عادي |

وغلطة مشهورة: تضيف في list وانت بتلف عليها بـ [[foreach]]:

~~~text الناتج
InvalidOperationException: Collection was modified; enumeration operation may not execute.
~~~

---

## ٨. التجربة: عدّ الكلمات

~~~csharp sol.cs
var text = "the cat and the hat and the bat";
var counts = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
    counts[word] = counts.TryGetValue(word, out var c) ? c + 1 : 1;
~~~

- [[text.Split(' ')]]: قسّم النص عند كل مسافة، والنتيجة [[string[]]]. والـ [[' ']] بعلامة واحدة نوعها [[char]] (حرف واحد)، مش [[string]].
- [[foreach (var word in ...)]]: لكل كلمة.
- [[counts.TryGetValue(word, out var c) ? c + 1 : 1]]: لو الكلمة موجودة خد عددها + 1، لو لأ 1.
- [[counts[word] = ...]]: اكتب النتيجة.

~~~csharp sol.cs
foreach (var (word, n) in counts.OrderByDescending(kv => kv.Value))
    Console.WriteLine($"{word}: {n}");
~~~

- [[OrderByDescending(kv => kv.Value)]]: من LINQ: رتّب من الأكبر للأصغر حسب القيمة. كل عنصر في الـ Dictionary اسمه [[KeyValuePair]] (هنا [[kv]]) فيه [[Key]] و [[Value]].
- [[var (word, n)]]: فك الـ [[KeyValuePair]] لمتغيرين.

~~~text الناتج
the: 3
and: 2
cat: 1
hat: 1
bat: 1
~~~

[[cat]] و [[hat]] و [[bat]] نفس العدد، وفضلوا بترتيب ظهورهم لأن [[OrderByDescending]] stable (مبيبدّلش المتساويين).

### التحدي: [[CollectionsMarshal.GetValueRefOrAddDefault]]

~~~csharp sol.cs
using System.Runtime.InteropServices;
...
foreach (var word in text.Split(' '))
    CollectionsMarshal.GetValueRefOrAddDefault(fast, word, out _)++;
Console.WriteLine(fast["the"]);
~~~

- [[using System.Runtime.InteropServices;]]: الـ namespace ده مش من الـ implicit usings، فلازم يتكتب في أول الملف.
- [[GetValueRefOrAddDefault]]: لو المفتاح مش موجود ضيفه بـ 0، ورجّع **reference** للقيمة نفسها جوه الـ Dictionary (مش نسخة).
- [[out _]]: الـ method بترجع كمان bool «كان موجود؟»، و [[_]] معناها «مش محتاجه».
- [[++]]: زوّد واحد على القيمة اللي جوه الـ Dictionary على طول.

~~~text الناتج
3
~~~

الفرق: النسخة الأولى بتدوّر على الكلمة مرتين (قراية وكتابة)، ودي مرة واحدة.

---

## الخلاصة

| C# | JS | ملاحظة |
|---|---|---|
| [[List<T>]] | array | [[Add]] و [[Count]] |
| [[T[]]] | array بحجم ثابت | [[Length]] |
| [[Dictionary<K, V>]] | [[Map]] | مفتاح مش موجود = exception |
| [[HashSet<T>]] | [[Set]] | [[Add]] بيرجع bool |

- اقرا من Dictionary بـ [[TryGetValue]] أو [[GetValueOrDefault]] لو المفتاح ممكن ميبقاش موجود.
- متعدّلش collection وانت بتلف عليها بـ foreach.`,
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
            mistakes: R`تفتكر إن [[T?]] دايمًا nullable. و generic repository فوق EF Core بيخبّي LINQ ويخليك تكتب methods لكل query (الـ DbSet نفسه repository). وتنسى الـ constraint وتحاول تنادي method على T فيطلع CS1061 (ومع [[CompareTo]] بالذات على .NET 10 الرسالة بتبقى CS7036 عن [[MemoryExtensions.CompareTo]]، لأن الـ compiler بيلاقي extension method بنفس الاسم ومبتنفعش، فمتتلخبطش من الرسالة).`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٣ حاجات generic (يعني بتشتغل مع أي نوع تختاره): record اسمه [[Result<T>]] بيشيل نتيجة نجاح أو فشل، ودالة [[Max<T>]] بتجيب أكبر عنصر من أي حاجة تتقارن، و [[Repo<T>]] بيخزن أي entity بالـ Id بتاعها. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. يعني إيه [[<T>]]؟

[[T]] اسمه **type parameter**: مكان فاضي لنوع، بيتملي لما تستخدم الحاجة. زي بارامتر الدالة بالظبط، بس بدل ما يستقبل قيمة بيستقبل نوع. فـ [[Result<int>]] يعني «Result و T فيه = int». والاسم [[T]] عرف (Type)، وممكن [[TKey]] و [[TValue]] لو أكتر من واحد.

---

## ٢. [[Result<T>]]

~~~csharp generics.cs
public record Result<T>(bool Success, T? Value, string? Error)
{
    public static Result<T> Ok(T value) => new(true, value, null);
    public static Result<T> Fail(string error) => new(false, default, error);
}
~~~

- [[record Result<T>(...)]]: record (درس record) ليه type parameter.
- [[T? Value]]: القيمة، نوعها T. والـ [[?]] هنا فيها فخ، شوف القسم ٣.
- [[string? Error]]: رسالة الخطأ، ممكن null.
- [[public static Result<T> Ok(T value)]]: [[static]] بتتنادي على النوع نفسه [[Result<int>.Ok(...)]]. ودي اسمها factory method: method بتعمل object بدل ما تكتب [[new]] بإيدك.
- [[=> new(true, value, null)]]: [[new(...)]] من غير اسم النوع اسمها target-typed new: الـ compiler عارف النوع من نوع الرجوع.
- [[default]]: «القيمة الافتراضية لـ T»: [[0]] لـ int، و [[null]] لأي reference type، و [[false]] لـ bool.

~~~csharp generics.cs
var r1 = Result<int>.Ok(42);
var r2 = Result<int>.Fail("not found");
Console.WriteLine(r1);
Console.WriteLine(r2);
~~~

~~~text الناتج
Result { Success = True, Value = 42, Error =  }
Result { Success = False, Value = 0, Error = not found }
~~~

[[Error =  ]] فاضية لأنها null. بس [[Value = 0]] في الفشل؟ ده سؤال التجربة.

---

## ٣. التجربة: ليه [[Value = 0]] مش null؟

[[T?]] على T **من غير قيود** بيتعامل كده:

| T | [[T?]] بقى | [[default]] |
|---|---|---|
| [[string]] (reference) | [[string?]]: ملاحظة null للـ compiler | [[null]] |
| [[int]] (value) | [[int]] عادي، **مش** [[int?]] | [[0]] |

ليه؟ لأن [[int?]] نوع تاني خالص ([[Nullable<int>]])، و [[string?]] هو [[string]] نفسه (درس nullable). والـ compiler وهو بيكتب [[Result<T>]] مش عارف T هيبقى أنهي واحد، فـ [[?]] بيبقى ملاحظة بس ومبيغيّرش النوع. جرّبت:

~~~text الناتج
Result<string>.Fail("x")  ->  Result { Success = False, Value = , Error = x }
Result<int?>.Fail("x")    ->  Result { Success = False, Value = , Error = x }
~~~

مع [[string]] ومع [[int?]] بقت null فعلًا.

---

## ٤. [[Max<T>]] و [[where]]

~~~csharp generics.cs
static T Max<T>(IEnumerable<T> items) where T : IComparable<T>
{
    T best = items.First();
    foreach (var x in items) if (x.CompareTo(best) > 0) best = x;
    return best;
}
~~~

### السطر الأول من الشمال لليمين

- [[static T]]: بترجع قيمة من نوع T.
- [[Max<T>]]: generic method: الـ [[<T>]] بعد الاسم.
- [[IEnumerable<T> items]]: أي حاجة تتلف عليها بـ foreach وعناصرها T (list أو array أو غيرهم).
- [[where T : IComparable<T>]]: **القيد** (constraint): T لازم يطبق interface اسمه [[IComparable<T>]]، يعني عنده method [[CompareTo]]. زي [[T extends ...]] في TS.

### الجسم

- [[items.First()]]: أول عنصر (من LINQ).
- [[x.CompareTo(best)]]: بترجع رقم: أكبر من 0 لو [[x]] أكبر، و 0 لو متساويين، وأقل من 0 لو أصغر. ومسموح ننادي [[CompareTo]] بس **بسبب** القيد.

~~~csharp generics.cs
Console.WriteLine(Max([3, 9, 2]));
Console.WriteLine(Max(["b", "z", "a"]));
~~~

~~~text الناتج
9
z
~~~

مكتبناش [[Max<int>]]: الـ compiler استنتج T من الـ argument (type inference). و [[int]] و [[string]] الاتنين بيطبقوا [[IComparable]]، والـ string بتتقارن أبجديًا.

### القيد بيمنع إيه؟

~~~text الناتج: Max(new[] { new object(), new object() })
error CS0311: The type 'object' cannot be used as type parameter 'T' in the generic type or method 'Max<T>(IEnumerable<T>)'. There is no implicit reference conversion from 'object' to 'System.IComparable<object>'.
~~~

[[object]] مش بيعرف يتقارن، فاترفض **وقت الـ compile**. ولو شلت القيد خالص، الـ compiler هيرفض [[a.CompareTo(b)]] نفسها، لأن T ممكن يبقى أي حاجة. جرّبت [[a.Length]] على T من غير قيد:

~~~text الناتج
error CS1061: 'T' does not contain a definition for 'Length' ...
~~~

---

## ٥. [[Repo<T>]] بقيدين

~~~csharp generics.cs
public interface IEntity { int Id { get; } }
public class Product : IEntity { public int Id { get; init; } public string Name { get; init; } = ""; }
public class Repo<T> where T : class, IEntity
{
    private readonly Dictionary<int, T> _items = [];
    public void Add(T item) => _items[item.Id] = item;
    public T? Find(int id) => _items.GetValueOrDefault(id);
}
~~~

- [[IEntity]]: عقد: أي حاجة ليها [[Id]].
- [[where T : class, IEntity]]: قيدين بفاصلة: T لازم reference type ([[class]]) **و** بيطبق [[IEntity]].
- [[private readonly Dictionary<int, T> _items = [];]]: [[readonly]] معناها المتغير ده ميتشاورش على dictionary تاني بعد الإنشاء (بس محتواه يتغير عادي). و [[[]]] هنا dictionary فاضي. والـ [[_]] في أول الاسم عرف للحقول الـ private.
- [[item.Id]]: مسموح لأن القيد قال إن T فيه [[Id]].
- [[T? Find(...)]]: هنا الـ [[?]] معناها null فعلًا، لأن قيد [[class]] بيقول إن T reference type.

~~~csharp generics.cs
var repo = new Repo<Product>();
repo.Add(new Product { Id = 1, Name = "Pen" });
Console.WriteLine(repo.Find(1)?.Name);
~~~

~~~text الناتج
Pen
~~~

و [[repo.Find(2)?.Name ?? "null"]] طبعت [[null]]. ولو جرّبت [[new Repo<string>()]]:

~~~text الناتج: build
error CS0311: The type 'string' cannot be used as type parameter 'T' in the generic type or method 'Repo<T>'. There is no implicit reference conversion from 'string' to 'IEntity'.
~~~

---

## ٦. الـ generics موجودة وقت التشغيل

~~~csharp
Console.WriteLine(typeof(List<int>) == typeof(List<string>));
~~~

~~~text الناتج
False
~~~

[[typeof(X)]] بيرجع معلومات النوع. [[List<int>]] و [[List<string>]] نوعين مختلفين فعلًا وقت التشغيل. في TS الاتنين بيبقوا array عادي بعد الـ compile.

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[class Repo<T>]] | class ليها type parameter |
| [[T Max<T>(...)]] | method ليها type parameter |
| [[where T : IComparable<T>]] | T لازم يطبق ده |
| [[where T : class]] | T لازم reference type |
| [[where T : struct]] | T لازم value type |
| [[where T : new()]] | T ليه constructor فاضي |
| [[default]] | 0 أو null أو false حسب T |

- القيد هو اللي بيسمحلك تنادي methods على T، وبيرفض الأنواع الغلط وقت الـ compile.
- [[T?]] من غير قيد مع value type مش nullable.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

عندنا ٤ طلبات (orders)، وبنسأل عنهم أسئلة بـ LINQ: الطلبات المدفوعة الكبيرة مترتبة، وكل عميل عنده كام طلب وإجماليهم، وفيه طلب فوق 250؟ وطلب عميل اسمه ali، والإجمالي الكلي. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. الداتا

~~~csharp linq.cs
Order[] orders =
[
    new(1, "sara", 120m, "Paid"),
    new(2, "omar", 80m, "Pending"),
    new(3, "sara", 45m, "Paid"),
    new(4, "mona", 300m, "Paid"),
];
...
record Order(int Id, string Customer, decimal Total, string Status);
~~~

- [[record Order(...)]]: record بـ ٤ properties (درس record).
- [[Order[] orders = [ ... ];]]: array من [[Order]] بـ collection expression.
- [[new(1, "sara", 120m, "Paid")]]: target-typed new: النوع معروف من الـ array، فمش محتاج تكتب [[new Order(...)]].
- الفاصلة بعد آخر عنصر مسموحة، عشان لما تضيف سطر الـ diff يبقى سطر واحد.

---

## ٢. الـ lambda: [[o => ...]]

كل methods الـ LINQ بتاخد lambda: دالة صغيرة من غير اسم. [[o => o.Total > 50]] معناها «خد طلب سمّيه [[o]]، ورجّع [[o.Total > 50]]». ده نفس arrow function في JS بالظبط، والاسم [[o]] انت اللي بتختاره.

---

## ٣. السلسلة الأولى: Where ثم OrderByDescending ثم Select

~~~csharp linq.cs
var bigPaid = orders
    .Where(o => o.Status == "Paid" && o.Total > 50)
    .OrderByDescending(o => o.Total)
    .Select(o => new { o.Id, o.Customer });
foreach (var o in bigPaid) Console.WriteLine(o);
~~~

نمشي فيها خطوة خطوة، وكل خطوة بتاخد ناتج اللي قبلها:

### [[.Where(o => o.Status == "Paid" && o.Total > 50)]]

زي [[filter]]: سيب اللي الشرط بتاعه [[true]] بس. و [[&&]] «و».

| Id | Status | Total | يعدّي؟ |
|---|---|---|---|
| 1 | Paid | 120 | أيوه |
| 2 | Pending | 80 | لأ (مش Paid) |
| 3 | Paid | 45 | لأ (أقل من 50) |
| 4 | Paid | 300 | أيوه |

### [[.OrderByDescending(o => o.Total)]]

رتّب من الأكبر للأصغر حسب [[Total]]: 4 (300) ثم 1 (120). ومبيعدّلش الـ array الأصلية، زي [[toSorted]] مش [[sort]] في JS. (وللتصاعدي [[OrderBy]].)

### [[.Select(o => new { o.Id, o.Customer })]]

زي [[map]]: حوّل كل طلب لحاجة تانية. و [[new { o.Id, o.Customer }]] اسمه **anonymous type**: object بنوع ملوش اسم، والـ compiler بيعمله وقت الـ compile بخاصيتين [[Id]] و [[Customer]] (الاسم بيتاخد من الـ property). زي [[({ id: o.id, customer: o.customer })]] في JS.

~~~text الناتج
{ Id = 4, Customer = mona }
{ Id = 1, Customer = sara }
~~~

### [[bigPaid]] نوعه إيه؟

طبعت [[bigPaid.GetType().Name]]:

~~~text الناتج
IEnumerableSelectIterator$__bt2
~~~

مش list! ده object «ماسك الخطوات» ولسه هيتنفذ لما الـ [[foreach]] يلف عليه. ده موضوع الدرس الجاي (deferred execution). وعشان كده [[var]] هنا ضروري: النوع الحقيقي ملوش اسم تقدر تكتبه.

---

## ٤. التجميع: [[GroupBy]]

~~~csharp linq.cs
var perCustomer = orders
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Count = g.Count(), Sum = g.Sum(o => o.Total) });
foreach (var row in perCustomer) Console.WriteLine(row);
~~~

### [[.GroupBy(o => o.Customer)]]

قسّم الطلبات لمجموعات حسب العميل. كل مجموعة ([[g]]) فيها:

- [[g.Key]]: القيمة اللي اتجمعوا بيها (اسم العميل).
- والطلبات نفسها: تقدر تلف عليها أو تعمل عليها LINQ.

| [[g.Key]] | الطلبات |
|---|---|
| sara | 1 (120) و 3 (45) |
| omar | 2 (80) |
| mona | 4 (300) |

### [[.Select(g => new { Customer = g.Key, Count = g.Count(), Sum = g.Sum(o => o.Total) })]]

لكل مجموعة اعمل object. هنا كتبنا الأسماء بنفسنا ([[Customer =]] إلخ) لأن [[g.Key]] لوحده كان هيبقى اسمه [[Key]].

- [[g.Count()]]: عدد الطلبات.
- [[g.Sum(o => o.Total)]]: اجمع [[Total]] بتاع كل طلب.

~~~text الناتج
{ Customer = sara, Count = 2, Sum = 165 }
{ Customer = omar, Count = 1, Sum = 80 }
{ Customer = mona, Count = 1, Sum = 300 }
~~~

120 + 45 = 165. والمجموعات طالعة بترتيب أول ظهور لكل عميل.

---

## ٥. الأسئلة الصغيرة

~~~csharp linq.cs
Console.WriteLine(orders.Any(o => o.Total > 250));
Console.WriteLine(orders.FirstOrDefault(o => o.Customer == "ali")?.Id ?? -1);
Console.WriteLine(orders.Sum(o => o.Total));
~~~

~~~text الناتج
True
-1
545
~~~

- [[Any(...)]]: فيه عنصر واحد على الأقل بيحقق الشرط؟ زي [[some]]. طلب mona بـ 300.
- [[FirstOrDefault(...)]]: أول عنصر بيحقق الشرط، ولو مفيش يرجع [[default]] (هنا [[null]] لأن [[Order]] reference type). زي [[find]].
  - [[?.Id]]: لو null متكملش.
  - [[?? -1]]: لو null خد -1.
- [[Sum(...)]]: 120 + 80 + 45 + 300 = 545.

### [[First]] ولا [[FirstOrDefault]]؟

جرّبت [[orders.First(o => o.Customer == "ali")]]:

~~~text الناتج
InvalidOperationException: Sequence contains no matching element
~~~

[[First]] بيرمي لو ملقاش. استخدمه بس لما تكون متأكد إن فيه.

---

## ٦. الـ query syntax

نفس LINQ ليه شكل تاني شبه SQL:

~~~csharp linq.cs
var ids = from o in orders where o.Total > 50 select o.Id;
~~~

~~~text الناتج
1,2,4
~~~

الـ compiler بيحوّله لـ [[orders.Where(o => o.Total > 50).Select(o => o.Id)]] بالظبط. أغلب الكود بيستخدم الشكل بالـ methods.

---

## ٧. التجربة

~~~csharp sol.cs
var top = orders.Where(o => o.Status == "Paid")
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Total) })
    .MaxBy(x => x.Total);
Console.WriteLine($"{top!.Customer} {top.Total}");
~~~

- نفس الخطوات: فلتر المدفوع، جمّع بالعميل، احسب الإجمالي.
- [[MaxBy(x => x.Total)]]: رجّع **العنصر** اللي [[Total]] بتاعه أكبر (مش الرقم نفسه زي [[Max]]).
- [[top!]]: [[MaxBy]] بترجع nullable (لو الـ list فاضية)، والـ [[!]] بتقول للـ compiler «مش null». هنا مضمون لأن فيه طلبات مدفوعة.

~~~text الناتج
mona 300
~~~

~~~csharp sol.cs
var totals = orders.GroupBy(o => o.Customer).ToDictionary(g => g.Key, g => g.Sum(o => o.Total));
foreach (var (customer, total) in totals) Console.WriteLine($"{customer}: {total}");
~~~

[[ToDictionary(مفتاح, قيمة)]]: اعمل Dictionary: المفتاح [[g.Key]] والقيمة الإجمالي.

~~~text الناتج
sara: 165
omar: 80
mona: 300
~~~

ولو نسيت الـ [[GroupBy]] وعملت [[orders.ToDictionary(o => o.Customer, o => o.Total)]] على طول:

~~~text الناتج
ArgumentException: An item with the same key has already been added. Key: sara
~~~

~~~csharp sol.cs
var page = 1;
foreach (var chunk in orders.Chunk(2))
    Console.WriteLine($"page {page++}: {string.Join(", ", chunk.Select(o => o.Id))}");
~~~

- [[Chunk(2)]]: قسّم لـ arrays كل واحدة فيها ٢.
- [[page++]]: استخدم القيمة الحالية وبعدين زوّد واحد.

~~~text الناتج
page 1: 1, 2
page 2: 3, 4
~~~

---

## الخلاصة

| LINQ | JS | بيرجع |
|---|---|---|
| [[Where]] | [[filter]] | sequence |
| [[Select]] | [[map]] | sequence |
| [[OrderBy]] و [[OrderByDescending]] | [[toSorted]] | sequence |
| [[GroupBy]] | مفيش جاهز | مجموعات ليها [[Key]] |
| [[Any]] و [[All]] | [[some]] و [[every]] | bool |
| [[First]] و [[FirstOrDefault]] | [[find]] | عنصر (أو exception أو default) |
| [[Sum]] و [[Count]] و [[MaxBy]] | [[reduce]] | قيمة |
| [[ToList]] و [[ToDictionary]] | | collection جاهزة |

- كل method بتاخد lambda وبترجع حاجة تكمّل عليها.
- [[FirstOrDefault]] لما ممكن متلاقيش، و [[GroupBy]] قبل [[ToDictionary]] لو المفتاح بيتكرر.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيثبت إن الـ LINQ query مش بتشتغل وقت ما تتكتب، وبتشتغل من الأول كل مرة حد يطلب نتيجتها. الـ lambda اللي جوه [[Where]] بتطبع سطر كل مرة تتنادى، فنشوف بعينينا هي اتنادت إمتى وكام مرة. وبعدين method بـ [[yield return]] بتسلّم عناصرها واحد واحد. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. query بتطبع وهي شغالة

~~~csharp lazy.cs
var numbers = new List<int> { 1, 2, 3 };
var evens = numbers.Where(n => { Console.WriteLine($"  checking {n}"); return n % 2 == 0; });
Console.WriteLine("query built");
~~~

- [[new List<int> { 1, 2, 3 }]]: list فيها ٣ أرقام.
- الـ lambda هنا ليها جسم بين [[{ }]] فيه جملتين، فلازم [[return]] صريحة:
  - [[Console.WriteLine($"  checking {n}")]]: اطبع إن الرقم ده بيتفحص.
  - [[return n % 2 == 0;]]: [[%]] باقي القسمة. الرقم زوجي لو الباقي 0.
- [[evens]]: نتيجة [[Where]]. نوعها [[IEnumerable<int>]].

~~~text الناتج
query built
~~~

ولا سطر [[checking]]! الـ [[Where]] مفحصتش حاجة. اللي رجع «وصفة»: object شايل الـ list والـ lambda، ومستني حد يطلب منه عناصر. ده اسمه **deferred execution** (تنفيذ مؤجل).

---

## ٢. نغيّر المصدر بعد الـ query

~~~csharp lazy.cs
numbers.Add(4);
~~~

الـ query اتكتبت والـ list فيها ٣ أرقام، ودلوقتي بقوا ٤. هنشوف الـ query هتشوف أنهي نسخة.

---

## ٣. أول طلب: [[Count()]]

~~~csharp lazy.cs
Console.WriteLine($"count = {evens.Count()}");
~~~

~~~text الناتج
  checking 1
  checking 2
  checking 3
  checking 4
count = 2
~~~

- [[Count()]] محتاج يعرف العدد، فلازم يلف على كل العناصر. **هنا بس** الـ lambda اشتغلت.
- اتفحص [[4]] كمان: الـ query بتقرا المصدر وقت التنفيذ، مش وقت الكتابة.
- الزوجي 2 و 4، فـ [[count = 2]].

---

## ٤. تاني طلب: نفس الشغل من الأول

~~~csharp lazy.cs
Console.WriteLine($"count again = {evens.Count()}");
~~~

~~~text الناتج
  checking 1
  checking 2
  checking 3
  checking 4
count again = 2
~~~

[[evens]] مش شايل نتيجة، شايل خطوات. فكل مرة تطلب منه حاجة بيعيدها كلها. هنا ٤ فحوصات، بس لو المصدر query على قاعدة بيانات يبقى request تاني للداتابيز.

---

## ٥. [[ToList()]]: خلّص وخزّن

~~~csharp lazy.cs
var snapshot = evens.ToList();
~~~

~~~text الناتج
  checking 1
  checking 2
  checking 3
  checking 4
~~~

[[ToList()]] بيلف مرة تالتة، بس المرة دي بيحط النتيجة في [[List<int>]] حقيقية. بعد كده [[snapshot.Count]] أو [[foreach]] عليه مش هيطبع أي [[checking]]، ولو غيّرت [[numbers]] الـ [[snapshot]] مش هيتغير.

| النوع | | أمثلة |
|---|---|---|
| lazy: بترجع وصفة | مفيش شغل لسه | [[Where]] و [[Select]] و [[Take]] و [[Skip]] |
| eager: بتنفّذ على طول | بتلف على العناصر | [[Count]] و [[Sum]] و [[ToList]] و [[First]] و [[ToDictionary]] |

---

## ٦. [[yield return]]

~~~csharp lazy.cs
foreach (var n in Countdown(3)) Console.WriteLine(n);
static IEnumerable<int> Countdown(int from)
{
    for (var i = from; i > 0; i--)
    {
        Console.WriteLine($"  yield {i}");
        yield return i;
    }
}
~~~

- [[static IEnumerable<int> Countdown(int from)]]: local function بترجع sequence من [[int]]. و [[static]] معناها مش بتلمس متغيرات من برّه.
- [[for (var i = from; i > 0; i--)]]: loop من [[from]] لحد 1، و [[i--]] تنقّص واحد.
- [[yield return i;]]: سلّم [[i]] للي بيلف، **ووقف هنا**. لما يطلب العنصر اللي بعده، كمّل من السطر ده بالظبط. زي [[yield]] في [[function*]] بتاعة JS.

~~~text الناتج
  yield 3
3
  yield 2
2
  yield 1
1
~~~

لاحظ التبادل: [[yield 3]] (جوه الـ method) ثم [[3]] (الـ foreach طبع) ثم [[yield 2]]... الـ method مش بتجهّز الأرقام كلها الأول. بتشتغل خطوة لكل عنصر يتطلب.

### إزاي ده بيحصل؟

الـ [[foreach]] بيترجم لـ ٣ حاجات:

1. [[GetEnumerator()]]: هات حاجة أقدر أمشي بيها على العناصر.
2. [[MoveNext()]]: روح للعنصر اللي بعده. بترجع [[false]] لما يخلصوا.
3. [[Current]]: العنصر الحالي.

والـ compiler بيحوّل method الـ [[yield]] لـ class فيها [[MoveNext]] بتكمّل من آخر [[yield]] (اسمها state machine). ونفس الـ [[MoveNext]] هو اللي [[Where]] بيناديه على المصدر.

---

## ٧. التجربة: مليون رقم، كام اتقرا؟

~~~csharp sol.cs
var read = 0;
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
}
~~~

- [[ReadNumbers]] مش [[static]] عشان تقدر تزوّد المتغير [[read]] اللي برّه.
- [[1_000_000]]: الـ [[_]] جوه الرقم للقراية بس، زي [[1_000_000]] في JS.
- [[Take(3)]]: خد أول ٣ ووقف.

~~~text الناتج
reading
7, 14, 21 read: 21
~~~

الـ [[ToList()]] في الآخر طلب عناصر من [[Take]]، و [[Take]] طلب من [[Where]]، و [[Where]] طلب من [[ReadNumbers]] واحد واحد. أول ما [[Take]] خد ٣ (7 و 14 و 21) بطّل يطلب، فالـ loop وقفت عند 21. من مليون اتقرا ٢١ بس.

### ولو [[ToList()]] قبل [[Take]]؟

~~~csharp
var eager = ReadNumbers().Where(n => n % 7 == 0).ToList();
~~~

~~~text الناتج
reading
7, 14, 21 read: 1000000 count: 142857
~~~

[[ToList()]] eager: قرا المليون كله وعمل list فيها 142,857 رقم (كل مضاعفات 7 لحد مليون: 1,000,000 ÷ 7 = 142,857.1)، وبعدين أخدنا أول ٣. نفس النتيجة بشغل أكتر بكتير.

---

## الخلاصة

- [[Where]] و [[Select]] و [[Take]] مبيعملوش حاجة لحد ما حد يلف.
- كل لفّة على نفس الـ query بتعيد الشغل من الأول، وبتشوف المصدر بحالته الحالية.
- [[ToList()]] لما هتستخدم النتيجة أكتر من مرة، وفي **آخر** السلسلة مش في نصها.
- [[yield return]] بيسلّم عنصر ويقف لحد ما يتطلب اللي بعده.`,
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
