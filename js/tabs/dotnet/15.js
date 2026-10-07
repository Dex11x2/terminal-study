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
    }
]);
