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
]);
