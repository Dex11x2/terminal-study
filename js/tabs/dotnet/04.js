// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "النشر",
      l: 3,
      n: "dotnet publish، و Dockerfile multi-stage، و Kestrel ورا Nginx على Linux",
      items: [
        {
          cmd: "dotnet publish",
          title: "dotnet publish: framework-dependent ولا self-contained ولا AOT؟",
          desc: R`[[dotnet publish -c Release -o ./publish]] بيطلّع فولدر فيه الـ dll بتاعك والمكتبات و [[appsettings.json]]، وده اللي بتنقله للسيرفر وتشغّله بـ [[dotnet Shop.Api.dll]]. ده framework-dependent: السيرفر محتاج ASP.NET Core runtime متسطب، والناتج صغير (حوالي ٩ ميجا هنا).

[[--self-contained -r linux-x64]] بيحط الـ runtime نفسه جوه الفولدر (أكتر من ١٠٠ ميجا)، فمش محتاج تسطب .NET على السيرفر. و Native AOT ([[PublishAot=true]]) بيطلّع ملف واحد native بيقوم في ملي ثواني وذاكرته أقل، بس مش كل المكتبات بتدعمه (EF Core لسه عليه قيود، والـ JSON لازم source generation).

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
          teach: R`## الأوامر دي بتعمل إيه؟

بتحوّل المشروع لفولدر جاهز يتنقل للسيرفر (publish)، وتبص جواه، وتشغّله من غير [[dotnet run]]، وبعدين تطلّع نسخة تانية فيها الـ runtime نفسه. كل الناتج تحت حقيقي من [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) على مشروع [[Shop.Api]] تجريبي معمول بـ [[dotnet new webapi]] ومضاف له EF Core بتاع Postgres و JWT، وفيه endpoint اسمه [[/health]] بيرجع [[{"status":"ok"}]].

---

## ١. [[dotnet publish -c Release -o ./publish]]

- [[publish]]: اعمل build وجهّز كل اللي التطبيق محتاجه عشان يشتغل على جهاز تاني: الـ dll بتاعك، والمكتبات (NuGet packages)، وملفات الإعدادات.
- [[-c Release]]: اختصار [[--configuration]]. الـ Release فيه optimizations ومن غير كود الـ debug. (في .NET 8 وما بعده [[publish]] بيستخدم Release افتراضيًا، بس كتابتها صريحة أوضح.)
- [[-o ./publish]]: اختصار output: حط الناتج في فولدر [[publish]] جنب المشروع. من غيرها بيروح لمسار طويل جوه [[bin/Release/net10.0/publish/]].

~~~text الناتج
  Determining projects to restore...
  Restored /w/Shop.Api/Shop.Api.csproj (in 852 ms).
  Shop.Api -> /w/Shop.Api/bin/Release/net10.0/Shop.Api.dll
  Shop.Api -> /w/Shop.Api/publish/
~~~

سطرين [[->]]: الأول الـ build العادي في [[bin/Release]]، والتاني النسخ لفولدر الـ publish.

---

## ٢. [[ls ./publish]]

[[ls]] بيعرض الملفات (على PowerShell [[ls]] شغالة برضه كاختصار لـ [[Get-ChildItem]]). الناتج 25 ملف، أهمهم:

~~~text ls ./publish (مختصر)
Microsoft.AspNetCore.Authentication.JwtBearer.dll
Microsoft.EntityFrameworkCore.dll
Npgsql.dll
Npgsql.EntityFrameworkCore.PostgreSQL.dll
...
Shop.Api
Shop.Api.deps.json
Shop.Api.dll
Shop.Api.pdb
Shop.Api.runtimeconfig.json
appsettings.Development.json
appsettings.json
web.config
~~~

| الملف | إيه ده |
|---|---|
| [[Shop.Api.dll]] | الكود بتاعك بعد ما بقى IL. ده اللي بيتشغّل |
| [[Shop.Api]] | launcher صغير (apphost) بيشغّل الـ dll، على ويندوز اسمه [[Shop.Api.exe]] |
| [[Npgsql.dll]] وأخواتها | المكتبات اللي نزلت من NuGet، اتنسخت جنبك عشان السيرفر مفيهوش NuGet cache |
| [[Shop.Api.deps.json]] | وصف المكتبات دي ونسخها (deps = dependencies) |
| [[Shop.Api.runtimeconfig.json]] | التطبيق محتاج أنهي runtime |
| [[Shop.Api.pdb]] | معلومات للـ debugger: بتخلي الـ stack trace فيه أرقام سطور |
| [[appsettings*.json]] | الإعدادات |
| [[web.config]] | لـ IIS على ويندوز بس، على Linux ملوش لازمة |

### الـ runtimeconfig بيقول إيه؟

~~~json Shop.Api.runtimeconfig.json (جزء)
"frameworks": [
  { "name": "Microsoft.NETCore.App", "version": "10.0.0" },
  { "name": "Microsoft.AspNetCore.App", "version": "10.0.0" }
],
"configProperties": {
  "System.GC.Server": true,
~~~

يعني: «أنا محتاج .NET runtime و ASP.NET Core runtime نسخة 10.0.0 أو أحدث patch». ده معنى **framework-dependent**: الـ runtime مش جوه الفولدر، لازم يكون متسطب على الجهاز. و [[System.GC.Server]] بـ [[true]] لأن مشاريع الويب بتشغّل Server GC (ليه درس في «أسئلة انترفيو»).

### خد بالك: [[appsettings.Development.json]] اتنسخ

الملف ده عندنا فيه connection string فيه password التطوير، و [[publish]] نسخه زي ما هو. هو مش بيتقري في Production، بس موجود على السيرفر أو في الـ image. الحل في الـ csproj:

~~~xml Shop.Api.csproj
<ItemGroup>
  <Content Update="appsettings.Development.json" CopyToPublishDirectory="Never" />
</ItemGroup>
~~~

- [[Content Update]]: عدّل إعدادات ملف موجود أصلًا في المشروع (مش ضيف ملف جديد).
- [[CopyToPublishDirectory="Never"]]: متنسخهوش وقت الـ publish.

جربناها: بعدها [[ls publish | grep appsettings]] طلّع [[appsettings.json]] بس.

---

## ٣. [[du -sh ./publish]]

[[du]] = disk usage، و [[-s]] = summary (رقم واحد للفولدر كله)، و [[-h]] = human readable (K و M بدل bytes).

~~~text الناتج
8.8M	./publish
~~~

٨.٨ ميجا، وأغلبها مكتبات EF Core و Npgsql. لما جربنا نفس المشروع قبل ما نضيف الـ packages دي كان [[896K]] بس. الرقم صغير لأن الـ runtime نفسه مش جوه.

---

## ٤. [[ASPNETCORE_URLS=http://127.0.0.1:5000 dotnet ./publish/Shop.Api.dll]]

### [[ASPNETCORE_URLS=...]] قبل الأمر

في bash، [[NAME=value command]] معناها «شغّل الأمر ده والمتغير ده موجود في البيئة بتاعته هو بس». و [[ASPNETCORE_URLS]] بيقول لـ Kestrel (السيرفر اللي جوه ASP.NET Core) يسمع على أنهي عنوان:

- [[127.0.0.1]]: الجهاز نفسه بس، محدش من برة يوصل (ده اللي هنحتاجه ورا Nginx).
- [[5000]]: البورت.

### [[dotnet ./publish/Shop.Api.dll]]

[[dotnet]] هنا مش الـ SDK، ده الـ host: بيقرا الـ runtimeconfig، يدوّر على الـ runtime المناسب، ويشغّل الـ dll. على السيرفر ده كل اللي محتاجه، من غير SDK ولا [[dotnet run]].

~~~text الناتج
warn: Microsoft.AspNetCore.Hosting.Diagnostics[15]
      Overriding HTTP_PORTS '8080' and HTTPS_PORTS ''. Binding to values defined by URLS instead 'http://127.0.0.1:5000'.
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://127.0.0.1:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Production
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /w/Shop.Api
~~~

- الـ [[warn]] الأول ظهر لأن images الـ .NET فيها [[ASPNETCORE_HTTP_PORTS=8080]] متعرّف، و [[ASPNETCORE_URLS]] غلبه. على VPS عادي مش هتشوفه.
- [[Hosting environment: Production]]: محدش قال environment، فالافتراضي Production. يعني [[appsettings.Development.json]] مش بيتقري، و [[/openapi/v1.json]] (اللي متفعّل في Development بس) رجع 404.
- [[Content root path]]: الفولدر اللي كنا واقفين فيه، ومنه بيقرا [[appsettings.json]]. عشان كده على السيرفر بتعمل [[cd]] لفولدر الـ publish أو بتحدد [[WorkingDirectory]] في systemd.

~~~bash
curl -s 127.0.0.1:5000/health
~~~

~~~text الناتج
{"status":"ok"}
~~~

الـ runtimes اللي كانت متسطبة في الـ container (عشان تفهم مين شغّل الـ dll):

~~~text dotnet --list-runtimes
Microsoft.AspNetCore.App 10.0.12 [/usr/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 10.0.12 [/usr/share/dotnet/shared/Microsoft.NETCore.App]
~~~

الـ runtimeconfig طالب 10.0.0، والموجود 10.0.12، فالـ host بياخد أحدث patch من نفس الـ major (roll forward).

---

## ٥. [[dotnet publish -c Release -r linux-x64 --self-contained -o ./publish-sc]]

- [[-r linux-x64]]: اختصار [[--runtime]]، والقيمة اسمها RID (Runtime Identifier): النظام والمعالج اللي هتشتغل عليه. أمثلة: [[linux-x64]] و [[linux-arm64]] و [[linux-musl-x64]] (Alpine) و [[win-x64]] و [[osx-arm64]].
- [[--self-contained]]: حط الـ runtime نفسه جوه الفولدر.
- [[-o ./publish-sc]]: فولدر تاني عشان نقارن.

~~~text الناتج
  Restored /w/Shop.Api/Shop.Api.csproj (in 18.81 sec).
  Shop.Api -> /w/Shop.Api/bin/Release/net10.0/linux-x64/Shop.Api.dll
  Shop.Api -> /w/Shop.Api/publish-sc/
~~~

الـ restore خد ١٩ ثانية لأنه نزّل runtime packs الـ linux-x64. والحجم:

~~~text du -sh publish-sc ; ls publish-sc | wc -l
114M	publish-sc
353
~~~

| | framework-dependent | self-contained |
|---|---|---|
| الحجم عندنا | 8.8M | 114M |
| عدد الملفات | 25 | 353 |
| محتاج .NET على السيرفر؟ | آه (ASP.NET Core runtime) | لأ |
| مربوط بنظام معيّن؟ | لأ، نفس الفولدر على Linux وويندوز | آه، الـ RID اللي اخترته |

---

## ٦. [[./publish-sc/Shop.Api]]

[[./]] معناها «الملف ده في الفولدر ده»، فبيشغّل الـ launcher مباشرة من غير [[dotnet]] قبله. جوه container الـ SDK اشتغل ورجع [[{"status":"ok"}]].

بس الاختبار الحقيقي على Linux مفيهوش .NET خالص. شغّلناه في [[ubuntu:24.04]] نضيف:

~~~text الناتج على ubuntu:24.04
Process terminated.
Couldn't find a valid ICU package installed on the system. Please install libicu (or icu-libs) using your package manager and try again. Alternatively you can set the configuration flag System.Globalization.Invariant to true if you want to run with no globalization support. Please see https://aka.ms/dotnet-missing-libicu for more information.
~~~

يعني self-contained مش معناه «مش محتاج أي حاجة»: الـ runtime جوه، بس فيه مكتبات نظام لازم تكون موجودة، أشهرها **ICU** (International Components for Unicode: مكتبة اللغات والتواريخ وترتيب الحروف). الحلين:

- تسطّبها: [[apt-get install libicu74]] على Ubuntu 24.04 (أغلب السيرفرات فيها أصلًا).
- أو تقول للتطبيق ميستخدمهاش: [[<InvariantGlobalization>true</InvariantGlobalization>]] في الـ csproj، أو المتغير [[DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1]]. جربنا المتغير على نفس الـ ubuntu وقام: [[Now listening on: http://127.0.0.1:5000]]. العيب إن الـ cultures كلها بتبقى invariant (تنسيق التواريخ والأرقام بالإنجليزي بس).

---

## ٧. Native AOT (من الـ docs)

مش في المثال، بس هو الشكل التالت. بتضيف [[<PublishAot>true</PublishAot>]] في الـ csproj وتعمل [[dotnet publish -r linux-x64]]: الـ IL بيتحول لكود native قبل التشغيل، فبيطلع ملف واحد بيقوم في ملي ثواني. محتاج build tools (clang) على جهاز الـ build، ومكتبات كتير مبتدعمهوش كامل (أي حاجة بتعتمد على reflection). مجربناهوش هنا.

---

## على ويندوز

نفس الأوامر بالظبط في PowerShell، والفرق في الشكل بس (من الـ docs، مفيش SDK على جهاز التجربة):

| bash | PowerShell |
|---|---|
| [[ASPNETCORE_URLS=... dotnet x.dll]] | [[$env:ASPNETCORE_URLS="http://127.0.0.1:5000"; dotnet .\publish\Shop.Api.dll]] |
| [[-r linux-x64]] | [[-r win-x64]] والناتج [[Shop.Api.exe]] |

وبدل [[du -sh]]: [[(Get-ChildItem .\publish -Recurse | Measure-Object Length -Sum).Sum / 1MB]] بيجمع أحجام الملفات بالميجا.

وتقدر تعمل publish لـ [[linux-x64]] من ويندوز عادي، وتنقل الفولدر للسيرفر.

---

## الخلاصة

| الشكل | الأمر | الحجم عندنا | السيرفر محتاج |
|---|---|---|---|
| framework-dependent | [[dotnet publish -c Release -o ./publish]] | 8.8M | ASP.NET Core runtime |
| self-contained | [[... -r linux-x64 --self-contained]] | 114M | Linux x64 + libicu |
| Native AOT | [[PublishAot=true]] + [[-r]] | (مجربناهوش) | Linux x64 |

- الـ publish بينسخ [[appsettings.Development.json]]: امنعه بـ [[CopyToPublishDirectory="Never"]].
- التشغيل على السيرفر [[dotnet Shop.Api.dll]] مش [[dotnet run]]، والبورت من [[ASPNETCORE_URLS]].
- الـ environment الافتراضي Production.`,
          lines: [
            R`build بـ Release وانسخ كل حاجة في [[./publish]].`,
            R`[[Shop.Api.dll]] و [[Shop.Api]] (launcher) والمكتبات و [[appsettings*.json]].`,
            R`[[8.9M]] عندنا: من غير الـ runtime.`,
            R`تشغيل: محتاج [[Microsoft.AspNetCore.App]] runtime على الجهاز.`,
            "نسخة فيها الـ runtime لـ Linux x64.",
            R`بيشتغل على Linux x64 من غير تسطيب .NET، بس محتاج مكتبة [[libicu]] من النظام (أو [[InvariantGlobalization]]).`
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
          teach: R`## الملف ده بيعمل إيه؟

ده Dockerfile: وصفة بيقراها [[docker build]] سطر سطر عشان يعمل image فيها التطبيق جاهز يشتغل. فيه مرحلتين (multi-stage): واحدة بتبني بالـ SDK، وواحدة بتشغّل بالـ runtime بس. كل الناتج تحت حقيقي: حطينا الملف في فولدر مشروع [[Shop.Api]] تجريبي (webapi + EF Core بتاع Postgres + JWT، وفيه [[/health]])، وبنيناه بـ Docker Desktop على ويندوز. الأوامر نفسها هي هي على Linux والماك.

قبل ما نبدأ، جنب الـ Dockerfile فيه [[.dockerignore]] فيه سطرين:

~~~text .dockerignore
bin/
obj/
~~~

ده بيقول لـ Docker «متبعتش الفولدرات دي للـ build». ليه؟ هنعرف تحت عند [[COPY . .]].

---

## المرحلة الأولى: البناء

### ١. [[FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build]]

- [[FROM]]: ابدأ من image جاهزة.
- [[mcr.microsoft.com]]: الـ registry بتاع مايكروسوفت (MCR = Microsoft Container Registry)، مش Docker Hub.
- [[dotnet/sdk:10.0]]: الـ image اللي فيها الـ SDK كامل (compiler و NuGet و [[dotnet publish]]). الـ tag [[10.0]] بيتحدّث لآخر patch.
- [[AS build]]: سمّي المرحلة دي [[build]] عشان نرجعلها بالاسم بعدين.

الـ image دي كبيرة: عندنا [[1.3GB]]. عشان كده مش عايزينها في الناتج النهائي.

### ٢. [[WORKDIR /src]]

اعمل فولدر [[/src]] جوه الـ image (لو مش موجود) وادخله. كل الأوامر اللي بعده بتشتغل منه، زي [[cd]] بس دايم.

### ٣. [[COPY Shop.Api.csproj .]]

انسخ ملف المشروع **لوحده** من جهازك للـ [[.]] (يعني الفولدر الحالي [[/src]]). ليه لوحده؟ عشان الخطوة الجاية.

### ٤. [[RUN dotnet restore]]

[[RUN]] بينفّذ أمر جوه الـ image وقت الـ build. و [[restore]] بيقرا الـ [[PackageReference]] من الـ csproj وينزّل المكتبات من NuGet.

~~~text الناتج (أول build)
#11 [build 4/6] RUN dotnet restore
#11 1.062   Determining projects to restore...
#11 9.337   Restored /src/Shop.Api.csproj (in 7.96 sec).
#11 DONE 9.5s
~~~

### فكرة الـ layer cache

كل سطر في الـ Dockerfile بيعمل **layer** (طبقة)، و Docker بيحفظها. في الـ build الجاي، لو السطر نفسه متغيرش **والملفات اللي داخلة فيه** متغيرتش، بياخد الطبقة القديمة على طول ([[CACHED]]) من غير ما ينفّذ. وأول ما طبقة تتغير، كل اللي بعدها بيتعاد.

فلما نسخنا الـ csproj لوحده، طبقة الـ restore مربوطة بيه بس. جربنا: غيّرنا سطر في [[Program.cs]] وبنينا تاني:

~~~text الناتج (build تاني بعد تعديل الكود)
#8 [build 3/6] COPY Shop.Api.csproj .
#8 CACHED
#10 [build 4/6] RUN dotnet restore
#10 CACHED
#11 [build 5/6] COPY . .
#12 [build 6/6] RUN dotnet publish -c Release -o /app --no-restore
~~~

الـ restore ([[CACHED]]) مااتعادش، والكود بس اللي اتنسخ واتبنى. لو كنا عملنا [[COPY . .]] الأول، أي تعديل في أي ملف كان هيعيد تنزيل المكتبات كلها.

### ٥. [[COPY . .]]

انسخ كل الفولدر (أول [[.]] = فولدر المشروع على جهازك، وهو الـ build context) لـ [[/src]] (التانية). هنا [[.dockerignore]] بيفرق: من غيره [[bin/]] و [[obj/]] بتوعك كانوا هيدخلوا. و [[obj]] فيه [[project.assets.json]] بمسارات جهازك (زي [[C:\Users\...]] على ويندوز)، فالـ publish جوه Linux ممكن يتلخبط أو يفشل.

### ٦. [[RUN dotnet publish -c Release -o /app --no-restore]]

- [[-c Release]]: build الإنتاج.
- [[-o /app]]: الناتج في [[/app]] جوه مرحلة الـ build.
- [[--no-restore]]: متعملش restore تاني، إحنا عملناه في طبقته.

~~~text الناتج
#13 4.111   Shop.Api -> /src/bin/Release/net10.0/Shop.Api.dll
#13 4.166   Shop.Api -> /app/
#13 DONE 4.3s
~~~

---

## المرحلة التانية: التشغيل

### ٧. [[FROM mcr.microsoft.com/dotnet/aspnet:10.0]]

[[FROM]] تاني = مرحلة جديدة بتبدأ من الصفر. [[dotnet/aspnet]] فيها .NET runtime و ASP.NET Core runtime بس، من غير SDK. عندنا [[340MB]] (Ubuntu 24.04 + الـ runtime). كل اللي في مرحلة [[build]] (الـ SDK والكود والـ obj) مش هيدخل الـ image النهائية، إلا اللي هننسخه صراحة.

### ٨. [[WORKDIR /app]]

فولدر الشغل في الـ image النهائية.

### ٩. [[COPY --from=build /app .]]

[[--from=build]] معناها «انسخ من مرحلة [[build]] مش من جهازك». بننسخ [[/app]] بتاعها (ناتج الـ publish) لـ [[.]] (اللي هو [[/app]] هنا). اتأكدنا جوه الـ container: [[ls /app]] فيه الـ dlls و [[appsettings*.json]] ومفيش ولا ملف [[.cs]].

### ١٠. [[ENV ASPNETCORE_HTTP_PORTS=8080]]

[[ENV]] بيعرّف متغير بيئة يفضل موجود وقت التشغيل. [[ASPNETCORE_HTTP_PORTS]] بيقول لـ Kestrel يسمع على البورت ده على كل الـ interfaces. الـ image أصلًا فيها نفس القيمة:

~~~text docker run --rm mcr.microsoft.com/dotnet/aspnet:10.0 sh -c 'env | grep ASPNETCORE'
ASPNETCORE_HTTP_PORTS=8080
~~~

فالسطر ده توضيح بس.

### ١١. [[EXPOSE 8080]]

توثيق: «التطبيق ده بيسمع على 8080». مش بيفتح بورت على جهازك. اللي بيفتح فعلًا هو [[-p]] في [[docker run]].

### ١٢. [[USER $APP_UID]]

[[USER]] بيغيّر الـ user اللي هيشغّل الأمر الأخير. [[$APP_UID]] متغير جاهز في الـ image:

~~~text docker run --rm mcr.microsoft.com/dotnet/aspnet:10.0 sh -c 'echo $APP_UID; grep app /etc/passwd'
1654
app:x:1654:1654::/home/app:/bin/sh
~~~

يعني user اسمه [[app]] رقمه 1654، مش root (رقمه 0). لو حد لقى ثغرة في التطبيق، مش هيبقى root جوه الـ container. وده شغال لأن 8080 أكبر من 1024: البورتات تحت 1024 محتاجة root.

### ١٣. ENTRYPOINT

~~~text
ENTRYPOINT ["dotnet", "Shop.Api.dll"]
~~~

الأمر اللي بيشتغل لما الـ container يقوم. مكتوب كـ JSON array (exec form): Docker بيشغّل [[dotnet]] مباشرة من غير shell، فالتطبيق بيستلم إشارة الإيقاف ([[SIGTERM]] من [[docker stop]]) ويقفل بهدوء.

---

## البناء والتشغيل

~~~bash
docker build -t teach-dotnet04-api .
docker images
~~~

- [[-t]] = tag: اسم الـ image.
- [[.]] في الآخر: الـ build context، الفولدر اللي بيتبعت لـ Docker.

~~~text docker images (المهم)
teach-dotnet04-api:latest              352MB
mcr.microsoft.com/dotnet/aspnet:10.0   340MB
mcr.microsoft.com/dotnet/sdk:10.0      1.3GB
~~~

الـ image بتاعتنا = الـ aspnet (340) + التطبيق (حوالي ١٢ ميجا). ولو كنا شغلنا على image الـ SDK من غير multi-stage كانت هتبقى فوق الـ 1.3GB. وحجمها مضغوط (اللي بيتنقل للـ registry) [[99074424]] byte يعني حوالي 99MB، من [[docker image inspect --format '{{.Size}}']].

~~~bash
docker run -d --name teach-dotnet04-c1 -p 5935:8080 -e "ConnectionStrings__Shop=Host=host.docker.internal;..." teach-dotnet04-api
curl localhost:5935/health
~~~

- [[-d]]: شغّل في الخلفية (detached).
- [[-p 5935:8080]]: بورت 5935 على جهازك يروح لـ 8080 جوه الـ container.
- [[-e]]: متغير بيئة. [[__]] (two underscores) في الاسم = [[:]] في الإعدادات، فـ [[ConnectionStrings__Shop]] هو [[ConnectionStrings:Shop]] اللي بيقراه [[GetConnectionString("Shop")]]. كده الأسرار مش جوه الـ image.

~~~text الناتج
{"status":"ok"}
~~~

~~~text docker logs teach-dotnet04-c1
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://[::]:8080
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Production
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /app
~~~

[[http://[::]:8080]]: [[::]] هو «كل العناوين» في IPv6، وبيشمل IPv4 كمان. ده معنى [[ASPNETCORE_HTTP_PORTS]]: اسمع من أي مكان، وده اللازم جوه container (لو سمع على [[127.0.0.1]] بس، الـ [[-p]] مش هيوصله).

~~~text docker exec teach-dotnet04-c1 id
uid=1654(app) gid=1654(app) groups=1654(app)
~~~

و [[curl localhost:5935/openapi/v1.json]] رجع [[404]] لأن [[MapOpenApi]] في Development بس.

---

## ملخص الملف

| السطر | المرحلة | ليه |
|---|---|---|
| [[FROM ...sdk:10.0 AS build]] | build | فيها أدوات البناء |
| [[COPY *.csproj]] + [[RUN dotnet restore]] | build | طبقة مكتبات بتتكاش |
| [[COPY . .]] + [[RUN dotnet publish]] | build | الكود والناتج في [[/app]] |
| [[FROM ...aspnet:10.0]] | run | runtime بس، ٣٤٠ ميجا |
| [[COPY --from=build /app .]] | run | الناتج بس، من غير SDK ولا source |
| [[ENV]] / [[EXPOSE]] | run | البورت 8080 |
| [[USER $APP_UID]] | run | مش root |
| [[ENTRYPOINT]] | run | exec form عشان الـ graceful shutdown |

## الخلاصة

- مرحلتين: SDK للبناء، و aspnet للتشغيل. الـ image النهائية فيها ناتج الـ publish بس.
- الـ csproj والـ restore قبل [[COPY . .]] عشان الـ cache، و [[.dockerignore]] فيه [[bin/]] و [[obj/]].
- الـ images دي بتسمع على 8080 على كل العناوين، وفيها user [[app]] جاهز.
- الأسرار بـ [[-e]] وقت التشغيل، مش في الـ Dockerfile.`,
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
          sol: R`الـ image عندنا [[352MB]] على الديسك ([[99.1MB]] مضغوطة). من غير multi-stage (لو شغلت على image الـ sdk) كانت هتبقى أكبر من ٨٠٠ ميجا. [[docker run -d -p 8080:8080 -e "ConnectionStrings__Shop=Host=...;..." -e Jwt__Issuer=shop -e Jwt__Audience=shop-api -e Jwt__Key=... shop-api]] و [[curl localhost:8080/health]] بيرجع [[{"status":"ok"}]]، واللوج بيقول [[Hosting environment: Production]] و [[Now listening on: http://[::]:8080]] (يعني كل العناوين).

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
          teach: R`## المثال ده فيه إيه؟

٣ حتت في ٣ أماكن: سطرين C# في [[Program.cs]] بيخلوا التطبيق يصدّق Nginx، وإعداد Nginx (جوه تعليقات [[#]]) بيبعت الطلبات للتطبيق، وملف systemd (برضه تعليقات) بيشغّل التطبيق كخدمة. السطور اللي بتبدأ بـ [[#]] مش C#: دي محتوى ملفين تانيين على السيرفر، اسم كل ملف في أول سطر.

جربنا الجزء بتاع C# و Nginx بجد: التطبيق [[Shop.Api]] في container بيسمع على [[127.0.0.1:5000]]، و [[nginx:alpine]] في container شايل نفس الشبكة ([[--network container:...]])، فـ [[127.0.0.1]] عند الاتنين واحد، بالظبط زي VPS فيه الاتنين. وضفنا endpoint اسمه [[/whoami]] بيرجع اللي التطبيق شايفه:

~~~csharp
app.MapGet("/whoami", (HttpContext ctx) => new
{
    ip = ctx.Connection.RemoteIpAddress?.ToString(),
    scheme = ctx.Request.Scheme,
    host = ctx.Request.Host.ToString()
});
~~~

- [[HttpContext ctx]]: كل حاجة عن الـ request الحالي.
- [[Connection.RemoteIpAddress]]: الـ IP اللي الاتصال جاي منه. [[?.]] معناها «لو مش null نادي [[ToString]]، ولو null رجّع null».
- [[Request.Scheme]]: [[http]] ولا [[https]].
- [[Request.Host]]: الدومين اللي العميل طلبه.

systemd مقدرناش نجربه (الـ containers هنا مفيهاش systemd)، فالجزء ده من الـ docs.

---

## ١. المشكلة الأول: من غير forwarded headers

شغّلنا التطبيق **من غير** [[UseForwardedHeaders]] وطلبنا من ورا Nginx:

~~~text curl -H "Host: api.shop.test" localhost:5936/whoami
{"ip":"127.0.0.1","scheme":"http","host":"api.shop.test"}
~~~

الـ IP بقى [[127.0.0.1]] لأن اللي فاتح الاتصال مع Kestrel هو Nginx نفسه، مش العميل. فاللوج و rate limiting بالـ IP بيشوفوا كل الناس واحد. ولو Nginx بيستقبل HTTPS، التطبيق برضه شايف [[http]] لأن الكلام بين Nginx والتطبيق http عادي. الـ [[host]] بس صح، لأن Nginx باعته (هنشوف ليه).

---

## ٢. الـ C#: السطر الأول والتاني

~~~csharp
builder.Services.Configure<ForwardedHeadersOptions>(o =>
    o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);
~~~

- [[builder.Services.Configure<T>(...)]]: سجّل إعدادات من نوع [[T]] في الـ DI، والـ middleware هيقراها بعدين.
- [[ForwardedHeadersOptions]]: إعدادات middleware الـ forwarded headers (في namespace [[Microsoft.AspNetCore.HttpOverrides]]، فمحتاج [[using Microsoft.AspNetCore.HttpOverrides;]] فوق).
- [[o =>]]: lambda بتاخد الـ options وتعدّل فيها.
- [[o.ForwardedHeaders = ...]]: أنهي headers تصدّقها. افتراضيًا [[None]]، يعني مفيش حاجة، فلازم تقول.
- [[ForwardedHeaders.XForwardedFor]]: الـ header اللي فيه IP العميل الحقيقي.
- [[|]]: الـ enum ده flags، و [[|]] (bitwise OR) بيجمع قيمتين في قيمة واحدة: «الاتنين».
- [[ForwardedHeaders.XForwardedProto]]: الـ header اللي فيه البروتوكول الأصلي (http أو https).

## ٣. السطر التالت: [[app.UseForwardedHeaders();]]

بيحط الـ middleware في الـ pipeline. اللي بيعمله مع كل request:

1. يبص الـ request جاي منين. لو من proxy موثوق (افتراضيًا loopback بس: [[127.0.0.1]] و [[::1]])، يكمّل. لو لأ، يتجاهل الـ headers.
2. ياخد آخر IP في [[X-Forwarded-For]] ويحطه في [[Connection.RemoteIpAddress]].
3. ياخد [[X-Forwarded-Proto]] ويحطه في [[Request.Scheme]].

ولازم يبقى **أول** middleware، لأن اللي قبله (HTTPS redirection أو auth أو logging) هيشوف القيم القديمة.

بعد ما ضفناه، نفس الطلب:

~~~text curl -H "Host: api.shop.test" localhost:5936/whoami
{"ip":"172.17.0.1","scheme":"http","host":"api.shop.test"}
~~~

الـ IP بقى [[172.17.0.1]]: ده IP جهازنا زي ما الـ container شايفه (الـ gateway بتاع شبكة Docker). يعني IP العميل الحقيقي وصل. والـ scheme لسه [[http]] لأننا طلبنا http فعلًا.

عشان نجرب HTTPS من غير شهادة، عملنا server تاني في Nginx على بورت 81 بيبعت [[X-Forwarded-Proto https]] ثابت (كأنه هو اللي فك الـ TLS):

~~~text curl -H "Host: api.shop.test" localhost:5937/whoami
{"ip":"172.17.0.1","scheme":"https","host":"api.shop.test"}
~~~

ومن غير [[UseForwardedHeaders]] نفس البورت رجّع [[{"ip":"127.0.0.1","scheme":"http",...}]]: الـ header وصل بس محدش قراه.

والطلب المباشر على 5000 (من جوه نفس الشبكة بـ [[wget]]، من غير Nginx) رجّع [[{"ip":"127.0.0.1","scheme":"http","host":"127.0.0.1:5000"}]].

### فخ الـ KnownProxies: جربناه

حطينا Nginx في container تاني على شبكة Docker عادية (مش نفس الـ network namespace)، فالطلب بيوصل للتطبيق من IP [[172.18.0.3]] مش loopback:

~~~text الناتج من ورا Nginx في container منفصل (مع UseForwardedHeaders)
{"ip":"172.18.0.3","scheme":"http","host":"localhost"}
~~~

الـ IP هو IP الـ Nginx container، والـ scheme [[http]] مع إن Nginx باعت [[https]]: الـ middleware اتجاهل الـ headers **من غير أي error ولا warning**، لأن الـ IP ده مش في القايمة الموثوقة. الحل: تضيفه في الإعدادات:

~~~csharp
o.KnownProxies.Add(IPAddress.Parse("172.18.0.3"));
~~~

أو الشبكة كلها: [[o.KnownIPNetworks.Add(IPNetwork.Parse("172.18.0.0/16"))]]. في .NET 10 الاسم [[KnownIPNetworks]]، والقديم [[KnownNetworks]] لسه شغال بس بيطلّع warning وقت الـ build (جربناه): [[ASPDEPR005: ForwardedHeadersOptions.KnownNetworks is obsolete: Please use KnownIPNetworks instead.]] ومتمسحش القوايم دي عشان «تشتغل وخلاص»: ساعتها أي حد يقدر يبعت [[X-Forwarded-For]] مزوّر.

---

## ٤. إعداد Nginx

~~~text /etc/nginx/sites-available/shop
location / {
  proxy_pass http://127.0.0.1:5000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
~~~

| السطر | معناه |
|---|---|
| [[location / { ... }]] | أي path يبدأ بـ [[/]] (يعني كله) يتعامل بالقواعد دي |
| [[proxy_pass http://127.0.0.1:5000;]] | ابعت الطلب لـ Kestrel ورجّع رده للعميل |
| [[proxy_set_header Host $host;]] | ابعت الدومين اللي العميل طلبه. من غيره التطبيق كان هيشوف [[127.0.0.1:5000]] |
| [[X-Forwarded-For $proxy_add_x_forwarded_for]] | IP العميل، مضاف لأي قايمة جاية قبله (لو فيه proxies أكتر) |
| [[X-Forwarded-Proto $scheme]] | [[http]] أو [[https]] حسب العميل وصل لـ Nginx إزاي |

الحاجات اللي بتبدأ بـ [[$]] متغيرات Nginx بيملاها لكل request، و [[;]] في آخر كل أمر إجباري. الملف ده في [[sites-available]]، وبتفعّله بـ link في [[sites-enabled]] وبعدين [[nginx -t]] (اختبار الإعداد) و [[systemctl reload nginx]]. في [[nginx:alpine]] اللي جربنا عليه المكان [[/etc/nginx/conf.d/default.conf]] وجوه [[server { listen 80; ... }]].

---

## ٥. ملف systemd (من الـ docs، مش متجرّب هنا)

~~~text /etc/systemd/system/shop.service
[Service]
WorkingDirectory=/var/www/shop
ExecStart=/usr/bin/dotnet /var/www/shop/Shop.Api.dll
Restart=always
User=www-data
Environment=ASPNETCORE_URLS=http://127.0.0.1:5000
EnvironmentFile=/etc/shop.env
~~~

| السطر | معناه |
|---|---|
| [[Service]] بين قوسين مربعين | قسم «إزاي تشغّل البرنامج». الملف الكامل فيه كمان قسم [[Unit]] (وصف) وقسم [[Install]] ([[WantedBy=multi-user.target]] عشان [[enable]] يشتغل مع البوت) |
| [[WorkingDirectory]] | فولدر الـ publish، ومنه بيتقري [[appsettings.json]] (الـ content root) |
| [[ExecStart]] | الأمر، بمسار كامل لـ [[dotnet]] |
| [[Restart=always]] | لو البروسيس وقف لأي سبب، شغّله تاني |
| [[User=www-data]] | شغّله بـ user مش root |
| [[Environment=...]] | متغير بيئة: هنا البورت على loopback بس، فمحدش يوصل لـ Kestrel إلا من Nginx |
| [[EnvironmentFile]] | ملف فيه سطور [[NAME=value]] للأسرار (زي [[ConnectionStrings__Shop=...]])، بصلاحيات [[600]] |

وبعدها: [[systemctl daemon-reload]] (اقرا الملفات الجديدة)، و [[systemctl enable --now shop]] (فعّلها مع البوت وشغّلها دلوقتي)، و [[journalctl -u shop -f]] (تابع اللوج، [[-u]] = unit و [[-f]] = follow).

---

## الخلاصة

| | من غير UseForwardedHeaders | معاه، Nginx على loopback | معاه، Nginx على IP مش موثوق |
|---|---|---|---|
| ip | [[127.0.0.1]] | [[172.17.0.1]] (العميل) | [[172.18.0.3]] (الـ proxy) |
| scheme (Nginx باعت https) | [[http]] | [[https]] | [[http]] |

- Kestrel على [[127.0.0.1:5000]]، و Nginx قدامه بيبعت [[Host]] و [[X-Forwarded-For]] و [[X-Forwarded-Proto]].
- [[Configure<ForwardedHeadersOptions>]] بتختار الـ headers، و [[UseForwardedHeaders()]] أول middleware.
- الـ proxy لازم يكون موثوق (loopback افتراضيًا)، وإلا الـ headers بتتجاهل في صمت.
- systemd بيشغّل ويرجّع التطبيق، والأسرار في [[EnvironmentFile]].`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيقيس بالـ bytes تمن الـ boxing: بيحط ١٠٠٠ رقم في متغير [[object]]، وبعدين يحط نفس الأرقام في [[List<int>]]، ويقارن الـ memory اللي اتحجزت في الحالتين. الأرقام تحت حقيقية من ملف واحد [[box.cs]] اتشغّل بـ [[dotnet run box.cs]] (file-based app في .NET 10، من غير csproj) جوه [[mcr.microsoft.com/dotnet/sdk:10.0]]، واتشغّل مرتين وطلع نفس الرقم بالظبط.

---

## ١. [[var before = GC.GetAllocatedBytesForCurrentThread();]]

- [[GC]]: الـ class بتاعة الـ Garbage Collector.
- [[GetAllocatedBytesForCurrentThread()]]: عدد الـ bytes اللي الـ thread ده حجزها في الـ heap من أول ما بدأ. رقم بيزيد بس، مش بيقل لما الـ GC يلم.
- [[var before]]: بنحفظه عشان نطرح منه بعدين. الفرق = اللي اتحجز في النص.

---

## ٢. [[object boxed = 0;]]

[[0]] هنا [[int]]: value type، يعني القيمة نفسها (٤ bytes) مش reference. لكن المتغير نوعه [[object]]، و [[object]] reference type: لازم يشاور على حاجة في الـ heap. فالـ runtime بيعمل **box**: object جديد في الـ heap، يحط جواه نسخة من الـ ٤ bytes، ويخلي [[boxed]] يشاور عليه.

~~~text اللي بيحصل في الذاكرة
stack:  boxed ──►  heap: [ header 8 | type pointer 8 | int 4 + padding 4 ]  = 24 byte
~~~

على 64-bit كل object في الـ heap فيه ١٦ byte زيادة (header + pointer للنوع)، والحجم بيتقرب لمضاعفات الـ 8. فالـ int اللي حجمه ٤ بقى ٢٤.

---

## ٣. [[for (var i = 0; i < 1_000; i++) boxed = i;]]

- [[for (...; ...; ...)]]: loop: البداية، والشرط، واللي يحصل بعد كل لفة.
- [[1_000]]: نفس [[1000]]، الـ [[_]] فاصل للقراية بس.
- [[i++]]: زوّد [[i]] واحد.
- [[boxed = i]]: كل لفة box جديد، لأن الـ box القديم مينفعش يتعدل (الـ boxes immutable). القديم بيبقى garbage.

## ٤. السطر اللي بيطبع

~~~csharp
Console.WriteLine($"boxing 1000 ints allocated ~{GC.GetAllocatedBytesForCurrentThread() - before} bytes");
~~~

[[$"..."]] string interpolation: اللي بين [[{ }]] بيتحسب ويتحط مكانه. هنا بيحسب الفرق.

~~~text الناتج
boxing 1000 ints allocated ~25488 bytes
~~~

الحساب: ١٠٠١ box (واحد من سطر [[= 0]] و ١٠٠٠ من الـ loop) × ٢٤ = ٢٤٠٢٤ byte، والباقي (حوالي ١٤٦٤) allocations جانبية صغيرة. يعني تقريبًا **٢٤ byte لكل box**.

---

## ٥. [[int n = (int)boxed;]]

ده **unboxing**: [[(int)]] cast بيقول «اللي جوه الـ box ده int، طلّعه». الـ runtime بيتأكد إن الـ box فعلًا جواه [[int]] وينسخ القيمة على الـ stack. لازم نفس النوع بالظبط، جربنا:

~~~csharp
object boxed = 42;
int a = (int)boxed;
long b = (long)boxed;
~~~

~~~text الناتج
42
Unhandled exception. System.InvalidCastException: Unable to cast object of type 'System.Int32' to type 'System.Int64'.
~~~

مع إن [[int]] بيتحول لـ [[long]] عادي، الـ box مش بيعمل تحويل. الصح: [[(long)(int)boxed]].

---

## ٦. [[var list = new List<int>();]] والـ loop التاني

- [[List<int>]]: generic: الـ [[<int>]] بيقول للـ runtime يعمل نسخة من [[List]] مخصوصة للـ int. جواها array حقيقية من [[int]]، فكل [[Add(i)]] بيكتب ٤ bytes في الـ array من غير أي box.
- [[before = ...]]: صفّرنا نقطة البداية.

~~~text الناتج
List<int> allocated ~8392 bytes
~~~

طب ليه مش صفر؟ الـ array الداخلية بتبدأ بـ ٤ أماكن، ولما تتملى الـ List بتعمل array ضعفها وتنسخ: ٤ ثم ٨ ثم ١٦ ... لحد ١٠٢٤. يعني ٩ arrays:

| الحاجة | الحساب | bytes |
|---|---|---|
| الأماكن كلها | (4+8+16+32+64+128+256+512+1024) × 4 byte | 8176 |
| header كل array (٢٤ byte) | 9 × 24 | 216 |
| المجموع | | **8392** |

مطابق بالظبط. يعني الـ allocations هنا ٩ مرات بس (مش ١٠٠٠)، وحجمهم تلت الـ boxing.

---

## ٧. الـ solCode: interface و [[string.Format]] و interpolation

~~~text الناتج
interface boxing: 25488
string.Format: 55920
interpolation: 31920
~~~

- [[IComparable c = i;]]: [[IComparable]] interface، والـ interfaces reference types، فـ [[int]] جواها لازم يتعمله box. نفس رقم [[object]] بالظبط: [[25488]].
- [[_ = string.Format("{0}", i);]]: [[_]] (discard) يعني «مش عايز النتيجة». [[string.Format]] بياخد الـ arguments كـ [[object]]، فكل [[i]] بيتعمله box، وبعدين يتعمل string.
- [[_ = $"{i}";]]: الـ compiler في C# 10 وما بعده بيحوّلها لـ [[DefaultInterpolatedStringHandler]] اللي فيه [[AppendFormatted<int>(i)]] generic، فمفيش box. اللي اتحجز هو الـ strings الناتجة بس.

والفرق: 55920 − 31920 = **24000** = ١٠٠٠ × ٢٤. ده بالظبط ١٠٠٠ box.

---

## الخلاصة

| الكود | box؟ | اتحجز عندنا |
|---|---|---|
| [[object boxed = i]] | آه، كل مرة | ~24 byte لكل int |
| [[IComparable c = i]] | آه، interface = reference | نفس الرقم |
| [[List<int>.Add(i)]] | لأ، generic | arrays بتتضاعف بس |
| [[string.Format("{0}", i)]] | آه، params [[object]] | +24 byte لكل نداء |
| [[$"{i}"]] | لأ (C# 10+) | الـ string بس |

- value type في متغير [[object]] أو interface = object جديد في الـ heap.
- الـ unboxing لنفس النوع بالظبط وإلا [[InvalidCastException]].
- الـ generics هي اللي بتمنع الـ boxing.`,
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
          teach: R`## المثال ده بيعمل إيه؟

جزئين: أول ٤ سطور بيوروك إن [[IQueryable]] شايل «وصف» للكود (expression tree) و [[IEnumerable]] شايل كود بيتنفذ. وآخر ٤ سطور نفس الـ query على EF Core مرتين، والفرق الوحيد نوع الرجوع، والـ SQL اللي بيتبعت مختلف. الناتج تحت حقيقي من file-based app ([[dotnet run q.cs]]) جوه [[mcr.microsoft.com/dotnet/sdk:10.0]]، والجزء التاني على [[postgres:16-alpine]] في container جنبه، بـ EF Core 10 و Npgsql، ولوج الـ SQL شغال.

---

## الجزء الأول: في الذاكرة

### ١. [[IEnumerable<int> e = Enumerable.Range(1, 5);]]

- [[IEnumerable<T>]]: أي حاجة تقدر تلف عليها بـ [[foreach]]. الـ [[<int>]] نوع العناصر.
- [[Enumerable.Range(1, 5)]]: بيطلّع 1، 2، 3، 4، 5 (البداية والعدد). مش array: بيطلّعهم واحد واحد وانت بتلف.

### ٢. [[IQueryable<int> q = Enumerable.Range(1, 5).AsQueryable().Where(n => n > 2);]]

من الشمال لليمين:

1. [[Enumerable.Range(1, 5)]]: نفس الأرقام.
2. [[.AsQueryable()]]: لفّها في [[IQueryable]]. دلوقتي أي LINQ بعدها بيروح لـ class اسمها [[Queryable]] مش [[Enumerable]].
3. [[.Where(n => n > 2)]]: [[n => n > 2]] lambda: «خد [[n]] ورجّع هل هو أكبر من 2». بس لأن الـ [[Where]] هنا بتاعة [[Queryable]] وبتاخد [[Expression<Func<int, bool>>]]، الـ compiler **مبيحوّلش** الـ lambda لكود، بيحوّلها لشجرة objects بتوصفها: «parameter اسمه n، أكبر من، ثابت 2».

### ٣. [[Console.WriteLine(q.Expression);]]

[[q.Expression]] هي الشجرة دي، وطباعتها بتوريك هي فيها إيه:

~~~text الناتج
System.Linq.Enumerable+RangeIterator$__bt1[System.Int32].Where(n => (n > 2))
~~~

اقرا من الشمال: «الـ source (الـ RangeIterator، و [[$__bt1[System.Int32]]] معناها generic بـ type واحد هو int)، وعليه [[Where]] بالشرط [[n > 2]]». الشرط محفوظ كوصف ممكن تقراه، وده اللي بيخلي EF Core يقدر يترجمه لـ SQL.

### ٤. [[Console.WriteLine(e.Where(n => n > 2).GetType().Name);]]

هنا [[e]] نوعه [[IEnumerable]]، فالـ compiler اختار [[Enumerable.Where]] اللي بياخد [[Func<int, bool>]] (delegate: كود جاهز يتنفذ). و [[.GetType().Name]] بيطبع اسم الـ class الحقيقي اللي رجع:

~~~text الناتج
IEnumerableWhereIterator$__bt1
~~~

iterator عادي: لما تلف عليه بينادي الـ lambda على كل عنصر. مفيش شجرة ولا وصف. (للمقارنة: [[q.GetType().Name]] طلع [[EnumerableQuery$__bt1]]، ولما لفينا على [[q]] طلع [[3,4,5]] زي المتوقع.)

> ملاحظة من التشغيل: الـ file-based app افتراضيًا [[PublishAot=true]]، فـ [[AsQueryable]] طلّع warnings وقت الـ build ([[IL2026]] و [[IL3050]]) إنه مش آمن مع الـ trimming والـ AOT. ده تحذير بس، والبرنامج اشتغل.

---

## الجزء التاني: مع EF Core

الـ [[ShopDb]] فيه [[DbSet<Product>]] اسمه [[Products]]، و [[DbSet]] نفسه بيطبّق [[IQueryable<Product>]]. حطينا صفين: [[Pen]] بـ 5 و [[Book]] بـ 50.

### ٥. [[IEnumerable<Product> AllProducts(ShopDb db) => db.Products;]]

local function: [[=>]] هنا معناها «الـ method دي بترجع ده» (expression-bodied). الـ object اللي راجع هو الـ [[DbSet]] نفسه، بس **النوع المعلن** [[IEnumerable<Product>]].

### ٦. [[var cheap = AllProducts(db).Where(p => p.Price < 10).ToList();]]

الـ compiler بيختار الـ [[Where]] حسب النوع المعلن وقت الـ compile، مش حسب الـ object الحقيقي وقت التشغيل. النوع [[IEnumerable]]، فاختار [[Enumerable.Where]]: الشرط بقى كود C#، و EF مش شايفه خالص. [[ToList()]] بيلف، فـ EF بيتنفذ من غير شرط:

~~~text SQL اللي اتبعت
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
~~~

الجدول **كله** اتحمّل في الذاكرة، والـ [[Where]] اشتغل في C# بعدها. النتيجة صح ([[cheap: 1]])، بس لو الجدول مليون صف، اتحمّلوا كلهم عشان ترجع واحد.

### ٧ و ٨. نفس الكلام بـ [[IQueryable<Product>]]

~~~csharp
IQueryable<Product> AllProductsQ(ShopDb db) => db.Products;
var cheapQ = AllProductsQ(db).Where(p => p.Price < 10).ToList();
~~~

النوع المعلن [[IQueryable]]، فالـ compiler اختار [[Queryable.Where]] والـ lambda بقت شجرة. EF ترجمها:

~~~text SQL اللي اتبعت
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."Price" < 10.0
~~~

الداتابيز هي اللي فلترت ورجّعت صف واحد. ([[10.0]] لأن [[Price]] نوعه [[decimal]].)

---

## التجربة: method بتاعتك جوه الـ Where

عملنا [[static class Rules { public static bool IsCheap(Product p) => p.Price < 10; }]] واستخدمناها في الاتنين:

~~~text مع IQueryable
InvalidOperationException: The LINQ expression 'DbSet<Product>()
    .Where(p => Rules.IsCheap(p))' could not be translated. Either rewrite the query in a form that can be translated, or switch to client evaluation explicitly by inserting a call to 'AsEnumerable', 'AsAsyncEnumerable', 'ToList', or 'ToListAsync'.
~~~

الشجرة فيها «نادي [[Rules.IsCheap]]»، و EF مش عارف جواها إيه (هي compiled code مش شجرة)، فمش عارف يكتبها SQL. وبيقترح [[AsEnumerable]]: كمّل في الذاكرة عن قصد.

ومع [[IEnumerable]] نفس الكود اشتغل ([[IEnumerable + own method: 1]]) بعد ما حمّل الجدول كله. عشان كده الغلطة دي بتستخبى.

> ملاحظتين من التشغيل: لو [[IsCheap]] كانت local function (معمولة جوه الملف من غير class) الـ compiler نفسه بيرفض: [[error CS8110: An expression tree may not contain a reference to a local function]]. ولو بتجرب EF Core في file-based app لازم تضيف [[#:property PublishAot=false]] فوق، وإلا أول استخدام للـ context بيقع بـ [[InvalidOperationException: Model building is not supported when publishing with NativeAOT. Use a compiled model.]]

---

## الخلاصة

| | [[IEnumerable<T>]] | [[IQueryable<T>]] |
|---|---|---|
| الـ [[Where]] بتاع | [[Enumerable]] | [[Queryable]] |
| الـ lambda بتبقى | [[Func]]: كود بيتنفذ | [[Expression]]: شجرة بتتقري |
| الفلترة فين | في الذاكرة (C#) | في الداتابيز (SQL) |
| method بتاعتك جوه الشرط | بتشتغل | [[could not be translated]] |
| lazy؟ | آه | آه |

- النوع **المعلن** (للمتغير أو لرجوع الـ method) هو اللي بيحدد مين يتنفذ، مش الـ object الحقيقي.
- method بترجع [[IEnumerable]] من [[DbSet]] = أي فلترة بعدها بتحمّل الجدول كله.
- [[AsEnumerable()]] لما تحب تكمل في الذاكرة عن قصد، بعد ما تفلتر في SQL.`,
          lines: [
            "sequence في الذاكرة.",
            R`[[AsQueryable]] بيحوّله IQueryable، والـ Where بقى جزء من شجرة.`,
            R`بيطبع الشجرة: [[System.Linq.Enumerable+RangeIterator$__bt1[System.Int32].Where(n => (n > 2))]].`,
            R`[[IEnumerableWhereIterator$__bt1]]: iterator عادي في الذاكرة، مفيش شجرة.`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيسجّل service عمرها قصير ([[Cart]]: Scoped) وجوه service عمرها طويل ([[PriceCache]]: Singleton) بتاخدها، وده الغلط اللي اسمه captive dependency. وبعدين [[GoodCache]] بتوري الطريقة الصح. عشان نشغّله حطيناه في file-based web app ([[#:sdk Microsoft.NET.Sdk.Web]]) جوه [[mcr.microsoft.com/dotnet/sdk:10.0]]، وضفنا [[ShopDb]] على Postgres في container جنبه، و endpoints بتطبع [[Id]] عشوائي لكل [[Cart]] عشان نعرف هي نفس النسخة ولا لأ.

---

## الأول: الـ ٣ lifetimes

لما تسجّل service في الـ DI container، بتقوله «اعمل منها نسخة جديدة إمتى»:

| الـ lifetime | نسخة جديدة كل | مثال |
|---|---|---|
| Singleton | عمر التطبيق كله (نسخة واحدة) | cache، [[TimeProvider]]، config |
| Scoped | scope، وفي ASP.NET Core الـ scope = request | [[DbContext]]، اليوزر الحالي، سلة الطلب |
| Transient | كل ما حد يطلبها | حاجات صغيرة من غير state |

---

## ١. [[builder.Services.AddScoped<Cart>();]]

- [[builder.Services]]: قايمة التسجيلات (الـ [[IServiceCollection]]).
- [[AddScoped<Cart>()]]: «لما حد يطلب [[Cart]]، اعمل واحدة لكل request، وكل اللي في نفس الـ request ياخدوا نفس النسخة».

## ٢. [[builder.Services.AddSingleton<PriceCache>();]]

«[[PriceCache]] نسخة واحدة للتطبيق كله». المشكلة مش في السطر ده لوحده، المشكلة في الـ constructor بتاعها (سطر ٥).

## ٣. [[var app = builder.Build();]]

هنا الـ container بيتبني. وفي Development بس، [[Build()]] بيفحص كل التسجيلات ([[ValidateOnBuild]]) ويتأكد إن مفيش Singleton بياخد Scoped ([[ValidateScopes]]). شغّلناه بـ [[ASPNETCORE_ENVIRONMENT=Development]]:

~~~text الناتج (Development)
Unhandled exception. System.AggregateException: Some services are not able to be constructed (Error while validating the service descriptor 'ServiceType: PriceCache Lifetime: Singleton ImplementationType: PriceCache': Cannot consume scoped service 'Cart' from singleton 'PriceCache'.)
 ---> System.InvalidOperationException: Cannot consume scoped service 'Cart' from singleton 'PriceCache'.
~~~

اقرا الرسالة: «مقدرش أستهلك (consume) scoped service اسمها Cart من جوه singleton اسمها PriceCache». التطبيق مقامش أصلًا، وده كويس: الغلطة اتمسكت قبل ما توصل لحد.

## ٤ و ٥. [[public class Cart { }]] و [[public class PriceCache(Cart cart) { }]]

- [[class Cart { }]]: class فاضية (احنا ضفنالها [[Id]] عشوائي عشان نتابعها).
- [[PriceCache(Cart cart)]]: ده **primary constructor** (C# 12): الـ parameters جنب اسم الـ class على طول، يعني «عشان تعمل [[PriceCache]] لازم تدّيني [[Cart]]». الـ DI بيشوف ده ويجيب [[Cart]] لوحده.

المشكلة: الـ [[PriceCache]] بتتعمل مرة واحدة، فبتاخد [[Cart]] مرة واحدة (من أول request) وتمسكها للأبد. الـ Cart بقت «أسيرة» (captive) جوه الـ Singleton.

### نفس الكود في Production

في Production الفحص مقفول، فالتطبيق قام عادي. طلبنا [[/cart]] ٣ مرات (بيطبع الـ Cart اللي جوه [[PriceCache]] والـ Cart بتاعة الـ request):

~~~text الناتج (Production)
cart in singleton: b339fb9a, cart in request: 7fa03474
cart in singleton: b339fb9a, cart in request: 71e45ec7
cart in singleton: b339fb9a, cart in request: 88756243
~~~

كل request ليه Cart جديدة (الرقم التاني بيتغير)، بس اللي جوه الـ Singleton هي هي ([[b339fb9a]]) في الـ ٣. لو [[Cart]] دي فيها حاجات يوزر، كل اليوزرز بيشوفوا سلة أول واحد. ولو بدلها [[DbContext]]، نفس الـ context بيتستخدم من requests كتير في نفس الوقت، وهو مش thread-safe.

---

## ٦ لـ ١٤. الحل: [[GoodCache]]

~~~csharp
public class GoodCache(IServiceScopeFactory scopes)
{
    public async Task RefreshAsync()
    {
        await using var scope = scopes.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
        await db.Products.CountAsync();
    }
}
~~~

- [[IServiceScopeFactory scopes]]: بدل ما ناخد الـ [[ShopDb]] نفسه، بناخد «مصنع scopes». ده Singleton أصلًا، فمفيش مشكلة نمسكه.
- [[public async Task RefreshAsync()]]: method async ([[Task]] = عملية هتخلص بعدين).
- [[scopes.CreateAsyncScope()]]: اعمل scope جديد دلوقتي، زي اللي ASP.NET Core بيعمله لكل request.
- [[await using var scope = ...]]: لما الـ method تخلص، اعمل [[DisposeAsync]] للـ scope، وده بيعمل dispose لكل اللي اتعمل جواه (الـ DbContext والـ connection بتاعه).
- [[scope.ServiceProvider.GetRequiredService<ShopDb>()]]: هات [[ShopDb]] **من الـ scope ده**. [[Required]] يعني لو مش متسجّلة ارمي exception بدل ما ترجع null.
- [[await db.Products.CountAsync()]]: استخدمه. ([[CountAsync]] من EF Core، فمحتاج [[using Microsoft.EntityFrameworkCore;]].)

سجّلنا [[GoodCache]] Singleton وطلبناها من endpoint: رجّعت [[products: 2]] (عدد الصفوف في الجدول عندنا). كل نداء DbContext جديد، وعمره قد العملية بس.

---

## أسئلة الـ try: جربناها

سجّلنا كمان [[Checkout(Cart cart)]] كـ Transient و [[Basket(TimeProvider time)]] كـ Scoped و [[TimeProvider]] كـ Singleton، وشغّلنا في Development: الفحص طلّع غلطة [[PriceCache]] بس، يعني التانيين مسموحين.

| مين بياخد مين | مسموح؟ | ليه |
|---|---|---|
| Singleton ← Scoped | لأ (captive) | الـ Scoped هتعيش عمر التطبيق |
| Transient ← Scoped | آه | الـ Transient بتتعمل جوه الـ request: [[checkout cart: 6cb3d1ad, request cart: 6cb3d1ad]] نفس الـ Cart |
| Scoped ← Singleton | آه | العمر الأطول مفيهوش مشكلة |
| Singleton ← Transient | بيعدّي الفحص، بس الـ Transient بتتمسك | زي typed [[HttpClient]] جوه Singleton |

وطلب Scoped من الـ root provider مباشرة ([[app.Services.GetRequiredService<Cart>()]]) في Development:

~~~text الناتج
Unhandled exception. System.InvalidOperationException: Cannot resolve scoped service 'Cart' from root provider.
~~~

الـ root مفيهوش scope، فاعمل scope الأول بـ [[app.Services.CreateScope()]].

---

## الخلاصة

- القاعدة: service تاخد بس اللي عمره قد عمرها أو أطول.
- Singleton محتاج حاجة Scoped (زي DbContext)؟ خد [[IServiceScopeFactory]] واعمل scope لكل عملية، أو [[IDbContextFactory<T>]].
- الفحص ([[ValidateScopes]] و [[ValidateOnBuild]]) شغال في Development بس. في Production الغلطة بتعدّي بهدوء.`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيعمل deadlock حقيقي في console app عادي: بيركّب [[SynchronizationContext]] بيقلّد الـ UI thread، وبعدين يستنى عملية async بـ [[Wait]]، فالاتنين يفضلوا مستنيين بعض. وبعدها نفس الحكاية بـ [[ConfigureAwait(false)]] فتخلص. الناتج حقيقي من [[dotnet run dl.cs]] (file-based app) جوه [[mcr.microsoft.com/dotnet/sdk:10.0]].

---

## الأول: يعني إيه [[SynchronizationContext]]؟

لما تكتب [[await]]، الـ method بتقف لحد ما العملية تخلص، والكود اللي بعد الـ [[await]] (اسمه **continuation** أو «الكمالة») لازم يتنفذ على thread ما. السؤال: أنهي thread؟

الـ [[SynchronizationContext]] هو اللي بيجاوب. الـ [[await]] بيبص على [[SynchronizationContext.Current]]:

- لو فيه context (زي WinForms و WPF و ASP.NET القديم): بيبعتله الكمالة بـ [[Post]]، وهو يقرر. الـ UI context بيحطها في طابور (queue) الـ UI thread، عشان الكود اللي بعد الـ await يقدر يلمس الشاشة.
- لو مفيش (null، زي console و ASP.NET Core): الكمالة بتروح للـ thread pool، أي thread فاضي.

---

## ١. [[using System.Collections.Concurrent;]]

عشان [[BlockingCollection]] اللي هنعمل بيها الطابور.

## ٢. [[SynchronizationContext.SetSynchronizationContext(new UiLikeContext());]]

ركّب الـ context بتاعنا على الـ thread الحالي (الـ main thread). من هنا [[SynchronizationContext.Current]] بقى [[UiLikeContext]]، يعني الـ main thread بقى بيتصرف كأنه UI thread.

## ١٢ لـ ١٦. الـ class: [[UiLikeContext]]

~~~csharp
class UiLikeContext : SynchronizationContext
{
    private readonly BlockingCollection<(SendOrPostCallback, object?)> _queue = new();
    public override void Post(SendOrPostCallback d, object? state) => _queue.Add((d, state));
}
~~~

- [[: SynchronizationContext]]: بنورث منه ونغيّر سلوكه.
- [[BlockingCollection<(SendOrPostCallback, object?)>]]: طابور thread-safe. كل عنصر فيه tuple ([[( , )]]: قيمتين مع بعض): الكمالة نفسها ([[SendOrPostCallback]]، delegate) والـ state بتاعها. [[object?]] يعني ممكن تبقى null.
- [[= new()]]: target-typed new: النوع معروف من الشمال.
- [[override void Post(...)]]: ده اللي الـ [[await]] بينادي عليه. بدل ما ينفّذ الكمالة، بيحطها في الطابور وخلاص.

في UI حقيقي فيه loop على الـ UI thread بيسحب من الطابور وينفّذ. هنا **مفيش** حد بيسحب، إلا الـ main thread نظريًا، وهو هيبقى واقف.

---

## ٧ لـ ١١. الـ method: [[LoadAsync]]

~~~csharp
static async Task<string> LoadAsync(bool configureAwait)
{
    await Task.Delay(100).ConfigureAwait(configureAwait);
    return "data";
}
~~~

- [[static async Task<string>]]: method async بترجع [[Task]] هتطلّع string لما تخلص.
- [[Task.Delay(100)]]: عملية بتخلص بعد 100ms (بتمثّل HTTP call أو query).
- [[.ConfigureAwait(configureAwait)]]: [[true]] (الافتراضي، زي ما تكون مكتبتهاش) = «ارجع على الـ context». [[false]] = «متهتمش بالـ context، كمّل على أي thread».
- [[return "data";]]: ده الكمالة، الكود اللي بعد الـ [[await]].

---

## ٣ و ٤. الـ deadlock

~~~csharp
var t1 = LoadAsync(configureAwait: true);
Console.WriteLine($"with context:    finished = {t1.Wait(2000)}");
~~~

- [[configureAwait: true]]: named argument، بنكتب اسم الـ parameter للوضوح.
- [[t1.Wait(2000)]]: اقف هنا (block) لحد ما [[t1]] تخلص أو تعدّي ٢٠٠٠ ms. بترجع [[true]] لو خلصت و [[false]] لو الوقت خلص. (عملناها بـ timeout عشان البرنامج يكمّل. [[.Result]] أو [[Wait()]] من غير رقم كانوا هيفضلوا واقفين للأبد.)

اللي بيحصل بالترتيب:

1. [[LoadAsync]] بتبدأ، وتوصل للـ [[await]]، وتمسك الـ context ([[UiLikeContext]])، وترجع [[Task]] لسه مخلصتش.
2. الـ main thread يوصل لـ [[Wait]] ويقف.
3. بعد 100ms الـ delay خلص، فالـ runtime ينادي [[Post]] على الـ context بالكمالة ([[return "data"]]).
4. [[Post]] حطها في الطابور. محدش هيسحبها غير الـ main thread، وهو واقف مستني [[t1]].
5. [[t1]] مش هتخلص لأن كمالتها في الطابور. والـ main thread مش هيتحرك لأن [[t1]] مخلصتش. **deadlock.**

~~~text الناتج (بعد ثانيتين)
with context:    finished = False
~~~

## ٥ و ٦. نفس الكلام بـ [[ConfigureAwait(false)]]

~~~text الناتج (على طول)
ConfigureAwait(false): finished = True
~~~

الـ await مامسكش الـ context، فبعد الـ 100ms الكمالة راحت لـ thread من الـ pool، خلصت [[t2]]، والـ [[Wait]] رجع [[True]]. البرنامج كله خد حوالي ٢.٤ ثانية (الـ ٢ ثانية timeout بتاعة الأولى + بدء التشغيل).

---

## الـ try: من غير [[SetSynchronizationContext]]

شلنا السطر التاني:

~~~text الناتج
with context:    finished = True
ConfigureAwait(false): finished = True
~~~

والبرنامج خد ٠.٧ ثانية. [[SynchronizationContext.Current]] بقى null، فالكمالة في الحالتين بتروح للـ pool، و [[ConfigureAwait]] ملوش أي تأثير. **ده وضع ASP.NET Core والـ console apps بالظبط**: مفيش context، فمفيش الـ deadlock ده.

بس الـ [[Wait]] لسه حاجز الـ main thread 100ms من غير شغل. في سيرفر، كل request بيعمل [[.Result]] بيحجز thread من الـ pool. لو جالك ١٠٠ request مع بعض، الـ pool بيتملى بـ threads واقفة، وبيزوّد threads جديدة ببطء، فكل حاجة تبطأ. ده اسمه **thread pool starvation**.

---

## الخلاصة

| البيئة | [[SynchronizationContext.Current]] | [[.Result]] / [[.Wait()]] |
|---|---|---|
| WinForms / WPF / ASP.NET القديم | فيه context بـ thread واحد | deadlock (لو مفيش [[ConfigureAwait(false)]]) |
| ASP.NET Core / console | null | مفيش deadlock، بس thread محجوز ← starvation تحت الضغط |

- الـ [[await]] بيرجّع الكمالة للـ context لو موجود، و [[ConfigureAwait(false)]] بيلغي ده.
- الـ deadlock = الـ thread الوحيد اللي ينفّذ الكمالة واقف مستنيها.
- الحل الحقيقي: async all the way ([[await]] مش [[.Result]]). و [[ConfigureAwait(false)]] مكانه كود المكتبات.`,
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
          teach: R`## المثال ده بيعمل إيه؟

جزئين: الأول بيوريك الـ generations بعينك: object صغير بيبدأ في Gen0 ويترقى مع كل GC، و object كبير بيبدأ في Gen2 على طول. والتاني بيفتح connection لـ Postgres جوه [[await using]] عشان يتقفل في وقت معروف، مش لما الـ GC يفتكره. الناتج حقيقي من [[dotnet run gc.cs]] (file-based app) جوه [[mcr.microsoft.com/dotnet/sdk:10.0]]، و Postgres في container [[postgres:16-alpine]] جنبه (فالـ [[Host]] عندنا كان اسم الـ container بدل [[localhost]]).

---

## ١. [[#:package Npgsql@10.0.3]]

ده مش C#: directive للـ file-based apps في .NET 10. معناه «نزّل الـ NuGet package دي بالنسخة دي واستخدمها» (زي [[PackageReference]] في الـ csproj). [[Npgsql]] هو الـ driver بتاع Postgres.

## ٢ و ٣. [[new byte[1_000]]] و [[new byte[100_000]]]

- [[order]]: array من ١٠٠٠ byte. صغيرة، فبتتحجز في Gen0.
- [[bigReport]]: ١٠٠,٠٠٠ byte. أي object من **85,000 byte فأكتر** بيروح Large Object Heap (LOH) على طول، لأن نسخ objects كبيرة من مكان لمكان (الـ compaction) غالي.

## ٤. [[GC.GetGeneration(...)]]

بيرجع رقم الـ generation اللي الـ object فيه دلوقتي:

~~~text الناتج
small: gen 0, big: gen 2
~~~

الـ LOH بيتحسب Gen2 من الأول، فالـ object الكبير بيتلم بس لما يحصل Gen2 collection (نادر).

## ٥ لـ ٨. [[GC.Collect()]] مرتين

[[GC.Collect()]] بيجبر الـ GC يعدّي دلوقتي على كل الـ generations. (للتجربة بس، في كود الإنتاج سيبه يقرر.)

~~~text الناتج
after 1 GC: small gen 1
after 2 GCs: small gen 2
~~~

الـ GC بيبدأ من الـ roots (المتغيرات اللي لسه شغالة، والـ static fields) ويعلّم كل اللي يوصله. [[order]] لسه متغير مستخدم، فهو «عايش»، والعايش بيترقى generation. الفكرة: اللي عاش collection غالبًا هيعيش كتير، فمش لازم يتفحص كل مرة. Gen0 صغير وبيتلم كتير وبسرعة، و Gen2 كبير وبيتلم نادرًا. و Gen2 آخر واحد، مفيش Gen3.

## ٩. [[System.Runtime.GCSettings.IsServerGC]]

~~~text الناتج
server GC: False
~~~

- **Workstation GC** (الافتراضي للـ console): heap واحد، مناسب لبرنامج واحد على جهاز.
- **Server GC**: heap و GC thread لكل core، throughput أعلى وذاكرة أكتر. مشاريع الويب ([[Microsoft.NET.Sdk.Web]]) بتفعّله: في درس «dotnet publish» شفنا [[System.GC.Server: true]] في [[runtimeconfig.json]] بتاع [[Shop.Api]]. وشغّلنا نفس الملف بـ [[DOTNET_gcServer=1]] فطلع [[server GC: True]].

---

## ١٠ لـ ١٣. [[await using (...) { ... }]]

~~~csharp
await using (var conn = new Npgsql.NpgsqlConnection("Host=localhost;Username=shop;Password=shop;Database=shop_dev"))
{
    await conn.OpenAsync();
}
~~~

- [[new NpgsqlConnection("...")]]: connection string: [[Host]] السيرفر، و [[Username]] و [[Password]]، و [[Database]] اسم الداتابيز. لسه مش متصل.
- [[await conn.OpenAsync()]]: افتح الاتصال فعلًا (TCP + login). ده **unmanaged resource**: socket عند نظام التشغيل و session عند Postgres، والـ GC مش شايفهم، هو شايف object صغير في الـ heap بس.
- [[await using (...) { }]]: لما البلوك يخلص (حتى لو حصل exception)، نادي [[await conn.DisposeAsync()]]. الـ Dispose بيرجّع الاتصال للـ connection pool بتاع Npgsql.

الـ [[await using]] لأن [[NpgsqlConnection]] بيطبّق [[IAsyncDisposable]] (قفل الاتصال ممكن يحتاج network). و [[using]] العادي بينادي [[Dispose()]] الـ sync.

---

## الـ try: ٢٠٠ connection من غير Dispose (الـ solCode)

~~~csharp
var cs = "Host=localhost;...;Timeout=3";
var leaked = new List<Npgsql.NpgsqlConnection>();
~~~

- [[cs]]: connection string واحد للتجربتين. [[Timeout=3]] يعني لو مفيش connection متاح استنى ٣ ثواني بس (الافتراضي ١٥).
- [[leaked]]: list بنحط فيها الـ connections عشان نقفلها في الآخر، ونمنع الـ GC يلمها أثناء التجربة.

~~~csharp
try { for (...) { var conn = new ...(cs); await conn.OpenAsync(); leaked.Add(conn); } }
catch (Exception ex) { Console.WriteLine($"after {leaked.Count}: {ex.Message}"); }
~~~

[[try]] / [[catch]]: لو حصل exception جوه [[try]]، روح على [[catch]] بدل ما البرنامج يقع، و [[ex.Message]] نص الخطأ.

~~~text الناتج (Postgres جديد)
after 100: The connection pool has been exhausted, either raise 'Max Pool Size' (currently 100) or 'Timeout' (currently 3 seconds) in your connection string.
~~~

الـ pool بتاع Npgsql حده 100 ([[Max Pool Size]]). الـ 100 محجوزين ومحدش رجّعهم، فالـ 101 استنى ٣ ثواني ورمى. لو Postgres نفسه عنده connections تانية، ممكن يقع قبلها بخطأ من Postgres ([[53300]]، شوف الـ sol).

~~~csharp
foreach (var c in leaked) await c.DisposeAsync();
for (var i = 0; i < 200; i++) { await using var conn = new ...(cs); await conn.OpenAsync(); }
~~~

- الأول بنقفل الـ 100 (بيرجعوا للـ pool وهم لسه متصلين).
- [[await using var conn = ...]] (من غير أقواس وبلوك): الـ dispose بيحصل في آخر الـ scope اللي هو جسم الـ loop، يعني كل لفة.

~~~text الناتج
200 with await using: ok (0ms)
~~~

[[0ms]] لأن كل لفة بتاخد connection جاهز من الـ pool وترجّعه، من غير ما تفتح اتصال جديد.

> غلطة لقيناها وصلحناها في الـ solCode: لو الـ connection string في التجربة التانية مختلف ولو بحرف (كان من غير [[Timeout=3]])، Npgsql بيعمل له pool تاني، والـ 100 القديمة لسه فاتحة عند Postgres، فوقع بـ [[Npgsql.PostgresException: 53300: sorry, too many clients already]] ([[max_connections]] عندنا 100). عشان كده المتغير [[cs]].

---

## الخلاصة

| الحاجة | مين بيديرها | إمتى بتتحرر |
|---|---|---|
| الذاكرة (objects في الـ heap) | الـ GC | لما يحس إن الذاكرة محتاجة، وقت مش معروف |
| connection، ملف، socket | انت، بـ [[Dispose]] | أول ما البلوك يخلص مع [[using]] |

- Gen0 ← Gen1 ← Gen2 مع كل collection يعيشها الـ object، و 85,000 byte فأكتر بيبدأ في LOH (Gen2).
- الـ GC مش بيقفل connections في وقتها: [[using]] / [[await using]] مع أي [[IDisposable]].
- مشاريع الويب Server GC، والـ console Workstation.`,
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

من غير Dispose: عندنا وقف بعد [[87]] connection بـ [[53300: remaining connection slots are reserved for roles with the SUPERUSER attribute]]: Postgres نفسه خلصت الـ slots بتاعته ([[max_connections]] الافتراضي 100، وفيه connections تانية مفتوحة). لو Postgres عنده slots أكتر، الحد اللي بعده هو [[Max Pool Size]] بتاع Npgsql (100 افتراضيًا)، والـ OpenAsync بيستنى الـ [[Timeout]] ويرمي [[The connection pool has been exhausted]]. في الحالتين الـ GC مش هيلحق يلم الـ objects دي لأن الذاكرة مش مزنوقة، فالـ connections فاضلة محجوزة، وأي request تاني للـ API هيقع بنفس الخطأ. بـ [[await using]] الـ ٢٠٠ بيخلصوا في أقل من ثانية لأنهم بيستخدموا نفس الـ connections من الـ pool. وخلي بالك إن الـ pool مربوط بالـ connection string بالحرف: لو التانية مختلفة (حتى من غير [[Timeout=3]]) يبقى pool تاني بيفتح connections جديدة، والـ ١٠٠ القديمة لسه فاتحة في الأول، فبيقع بـ [[53300: sorry, too many clients already]]. عشان كده الاتنين بيستخدموا نفس [[cs]].`,
          solCode: R`#:package Npgsql@10.0.3
var cs = "Host=localhost;Username=shop;Password=shop;Database=shop_dev;Timeout=3";
var leaked = new List<Npgsql.NpgsqlConnection>();
try
{
    for (var i = 0; i < 200; i++)
    {
        var conn = new Npgsql.NpgsqlConnection(cs);
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
    await using var conn = new Npgsql.NpgsqlConnection(cs);
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
          teach: R`## المثال ده بيعمل إيه؟

بيبني نفس النص (٢٠ ألف حرف [[x]]) بطريقتين ويقيس الوقت: مرة بـ [[s += "x"]] في loop، ومرة بـ [[StringBuilder]]. وفي الآخر بيتأكد إن الناتج واحد. الأرقام تحت من [[dotnet run sb.cs]] (file-based app) جوه [[mcr.microsoft.com/dotnet/sdk:10.0]] على جهاز التجربة، والأرقام عندك هتختلف، بس الفرق بينهم ثابت.

---

## ١ و ٢. الـ [[using]]

- [[using System.Diagnostics;]]: عشان [[Stopwatch]].
- [[using System.Text;]]: عشان [[StringBuilder]].

## ٣. [[var sw = Stopwatch.StartNew();]]

[[Stopwatch]] ساعة إيقاف دقيقة، و [[StartNew()]] بيعمل واحدة ويشغّلها في نفس الوقت.

## ٤. [[var s = "";]]

string فاضي. ومهم تفتكر: [[string]] في .NET **immutable**، يعني بعد ما يتعمل محدش يقدر يغيّر حروفه.

## ٥. [[for (var i = 0; i < 20_000; i++) s += "x";]]

[[s += "x"]] اختصار [[s = s + "x"]]. ولأن الـ string مينفعش يتعدل، ده اللي بيحصل فعلًا كل لفة:

1. اعمل string جديد طوله (القديم + 1).
2. انسخ كل حروف القديم فيه، وبعدين [[x]].
3. خلي [[s]] يشاور على الجديد. القديم بقى garbage.

اللفة الأولى بتنسخ حرف، والتانية ٢، ... والأخيرة ٢٠,٠٠٠. المجموع 1 + 2 + ... + 20,000 = حوالي **٢٠٠ مليون حرف** اتنسخوا، و ٢٠ ألف string اترموا للـ GC. ده اسمه O(n²): لو العدد اتضاعف، الشغل بيتضرب في ٤.

## ٦. السطر اللي بيطبع

[[sw.ElapsedMilliseconds]]: الوقت من ساعة البداية بالملي ثانية. والمسافات جوه النص للمحاذاة بس.

~~~text الناتج
string +=      37ms
~~~

(تشغيل تاني: [[28ms]]. الـ sol فيه [[137ms]] من جهاز تاني.)

## ٧. [[sw.Restart();]]

صفّر الساعة وشغّلها تاني.

## ٨. [[var sb = new StringBuilder();]]

[[StringBuilder]] جواه buffer (array حروف) **قابل للتعديل**. بيبدأ صغير (١٦ حرف)، ولما يتملى بيضيف chunk جديد أكبر، من غير ما ينسخ اللي فات.

## ٩. [[sb.Append('x')]]

بيكتب الحرف في المكان الفاضي الجاي في الـ buffer. [['x']] بـ single quotes = [[char]] (حرف واحد)، و [["x"]] = [[string]]. الاتنين شغالين مع [[Append]]، والـ char أخف شوية. كل إضافة O(1) تقريبًا، فالـ loop كله O(n).

## ١٠. [[var result = sb.ToString();]]

دلوقتي بس بيتعمل string واحد ويتنسخ فيه الـ ٢٠ ألف حرف، مرة واحدة.

## ١١. الطباعة والمقارنة

~~~text الناتج
StringBuilder  0ms, same = True
~~~

- [[0ms]]: أقل من ملي ثانية، فـ [[ElapsedMilliseconds]] (رقم صحيح) طلّعه صفر.
- [[result == s]]: [[==]] على string بيقارن **المحتوى** (الـ operator ده متعرّف لـ string)، فالـ [[True]] معناها الطريقتين طلّعوا نفس النص بالظبط.

---

## الـ try: ١٠٠ ألف

غيّرنا [[20_000]] لـ [[100_000]]:

~~~text الناتج
string +=      902ms
StringBuilder  0ms, same = True
~~~

| العدد | [[+=]] | [[StringBuilder]] |
|---|---|---|
| 20,000 | 28–37ms | 0ms |
| 100,000 | 902ms | 0ms |

العدد ×٥ والوقت حوالي ×٢٥ لـ ×٣٠، زي ما O(n²) بيقول (٥² = ٢٥). الـ sol فيه ×١٠ من جهاز تاني: الرقم بيتأثر بالـ GC والـ cache، بس دايمًا أكبر بكتير من ×٥.

## الـ try: [[==]] و [[ReferenceEquals]] و [[Intern]] (الـ solCode)

~~~csharp
var a = "abc";
var b = new string("abc".ToCharArray());
var c = string.Intern(b);
Console.WriteLine($"{a == b} {ReferenceEquals(a, b)} {ReferenceEquals(a, c)}");
~~~

- [[a = "abc"]]: literal. الـ literals بتتحط في **intern pool**: جدول جوه الـ runtime فيه نسخة واحدة من كل literal، وأي [["abc"]] في البرنامج كله بيشاور على نفس الـ object.
- [["abc".ToCharArray()]]: حوّله array حروف، و [[new string(...)]] اعمل منها string **جديد** في الـ heap. نفس الحروف، object تاني.
- [[string.Intern(b)]]: «دوّر في الـ pool على string بنفس المحتوى، ولو لقيته رجّعه». لقى الـ literal.
- [[ReferenceEquals(x, y)]]: هل الاتنين نفس الـ object في الذاكرة؟ (مش المحتوى.)

~~~text الناتج
True False True
~~~

| المقارنة | النتيجة | ليه |
|---|---|---|
| [[a == b]] | [[True]] | نفس المحتوى |
| [[ReferenceEquals(a, b)]] | [[False]] | objectين مختلفين |
| [[ReferenceEquals(a, c)]] | [[True]] | [[Intern]] رجّع الـ literal نفسه من الـ pool |

---

## الخلاصة

- [[string]] immutable: كل [[+=]] = string جديد ونسخ كامل، وفي loop ده O(n²).
- [[StringBuilder]] للبناء في loop، و [[ToString()]] مرة في الآخر. لإضافات قليلة [[+]] أو [[$"..."]] كفاية، ولقايمة [[string.Join]].
- [[==]] على string بيقارن المحتوى، و [[ReferenceEquals]] بيقارن الـ object.`,
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
]);
