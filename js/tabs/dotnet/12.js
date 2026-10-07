// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
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
          try: R`اعمل endpoint [[/dev/token]] (في Development بس) بيرجع توكن، وفكّ الـ payload بـ [[cut -d. -f2 | base64 -d]]. وبعدين: (١) ابعت request من غير توكن، (٢) بتوكن توقيعه متغير حرف، (٣) بتوكن منتهي (خلي [[MinutesValid]] سالب، و [[NotBefore]] قبل الـ [[Expires]]). بص على header الـ [[WWW-Authenticate]] في كل حالة.`,
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
          teach: R`## المثال ده بيعمل إيه؟

جزئين: الأول بيقول للـ API «أي request جاي فيه توكن، اتحقق منه كده»، والتاني method بتعمل التوكن نفسه وقت الـ login. جرّبناهم في API حقيقي على .NET 10 (حزمة [[Microsoft.AspNetCore.Authentication.JwtBearer]] 10.0.12) جوه Docker، و endpoint [[/dev/token]] بيرجّع توكن، وكلمناه بـ [[curl]]. الإعدادات في [[appsettings.json]]:

~~~text appsettings.json
"Jwt": { "Issuer": "shop-dev", "Audience": "shop-api", "Key": "dev-only-key-dev-only-key-dev-only-key-1234", "MinutesValid": 60 }
~~~

---

## ١. التحقق: [[AddAuthentication]] و [[AddJwtBearer]]

~~~csharp Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = jwt.Issuer,
        ValidAudience = jwt.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
    });
~~~

- [[AddAuthentication(...)]]: سجّل نظام الـ authentication. الـ argument هو الـ **scheme** الافتراضي: الطريقة اللي بيها بنعرف المستخدم. [[JwtBearerDefaults.AuthenticationScheme]] قيمته النص [["Bearer"]].
- [[.AddJwtBearer(o => ...)]]: ضيف الـ handler اللي بيقرا header [[Authorization: Bearer <token>]].
- [[TokenValidationParameters]]: قواعد قبول التوكن:
  - [[ValidIssuer]]: الـ claim [[iss]] (مين أصدر التوكن) لازم يساوي [["shop-dev"]].
  - [[ValidAudience]]: الـ claim [[aud]] (التوكن معمول لمين) لازم يساوي [["shop-api"]].
  - [[IssuerSigningKey]]: المفتاح اللي التوقيع بيتفحص بيه.
- [[Encoding.UTF8.GetBytes(jwt.Key)]]: المفتاح نص، والتوقيع محتاج bytes. و [[SymmetricSecurityKey]] = مفتاح **متماثل**: نفس المفتاح بيوقّع وبيتحقق (HMAC).
- [[jwt]]: object الإعدادات اللي قريناه قبلها بـ [[builder.Configuration.GetSection("Jwt").Get<JwtOptions>()]].

اللي مش مكتوب ومفعّل افتراضيًا: [[ValidateIssuer]] و [[ValidateAudience]] و [[ValidateLifetime]] كلهم [[true]].

وعشان ده يشتغل لازم في الـ pipeline: [[app.UseAuthentication()]] ثم [[app.UseAuthorization()]]، وعلى الـ endpoint [[.RequireAuthorization()]].

---

## ٢. عمل التوكن: [[Create]]

~~~csharp TokenService.cs
public string Create(string userId, string email, IEnumerable<string> roles)
{
    var claims = new List<Claim> { new(JwtRegisteredClaimNames.Sub, userId), new(JwtRegisteredClaimNames.Email, email) };
    claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));
    var now = clock.GetUtcNow().UtcDateTime;
    ...
}
~~~

- **claim** = معلومة عن المستخدم جوه التوكن: اسم وقيمة.
- [[JwtRegisteredClaimNames.Sub]] = النص [["sub"]] (subject: المستخدم مين). و [[.Email]] = [["email"]].
- [[new(...)]]: target-typed new، النوع [[Claim]] معروف من الـ list.
- [[roles.Select(r => new Claim(ClaimTypes.Role, r))]]: كل role يبقى claim. و [[AddRange]] بيضيفهم كلهم.
- [[clock]]: [[TimeProvider]] جاي من الـ DI. [[GetUtcNow()]] الوقت دلوقتي، و [[.UtcDateTime]] بيحوّله [[DateTime]]. ميزته إن الاختبار يقدر يبعت ساعة مزيفة.

~~~csharp TokenService.cs
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
~~~

| الخانة | بتبقى في التوكن |
|---|---|
| [[Issuer]] | [[iss]] |
| [[Audience]] | [[aud]] |
| [[Subject = new ClaimsIdentity(claims)]] | الـ claims ([[sub]] و [[email]] والـ roles) |
| [[NotBefore = now]] | [[nbf]]: مش صالح قبل كده |
| [[Expires = now.AddMinutes(...)]] | [[exp]]: بيخلص إمتى |
| [[SigningCredentials(..., HmacSha256)]] | التوقيع بـ HMAC-SHA256 |

[[_o]] هو [[JwtOptions]] (اتقرا من [[IOptions<JwtOptions>]] في الـ constructor). و [[CreateToken]] بيرجّع string.

---

## ٣. التوكن من جوه

طلبنا توكن لـ sara:

~~~text الناتج (أول ٦٠ حرف)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzaG9wLWFwaSI...
~~~

٣ أجزاء بينهم نقط: header.payload.signature. فكّينا أول جزئين بـ [[base64 -d]] (على لينكس):

~~~bash
echo "$T" | cut -d. -f1 | base64 -d
echo "$T" | cut -d. -f2 | tr '_-' '/+' | base64 -d
~~~

- [[cut -d. -f2]]: قسّم على النقطة وخد الجزء التاني.
- [[tr '_-' '/+']]: الـ JWT بيستخدم base64url ([[_]] و [[-]] بدل [[/]] و [[+]])، فبنرجّعهم عشان [[base64 -d]] يفهم.

~~~text الناتج
{"alg":"HS256","typ":"JWT"}
{"aud":"shop-api","iss":"shop-dev","exp":1791397386,"nbf":1791393786,"sub":"sara@x.com","email":"sara@x.com","iat":1791393786}
~~~

- [[exp]] و [[nbf]] و [[iat]] (issued at) بالثواني من ١ يناير ١٩٧٠ (Unix time). الفرق بين [[exp]] و [[nbf]] = 3600 = ٦٠ دقيقة.
- أي حد معاه التوكن يقرا ده: **مش متشفّر**، متوقّع بس.

وتوكن admin فيه زيادة:

~~~text الناتج
"http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"admin"
~~~

[[ClaimTypes.Role]] اسمه URI طويل، و [[JsonWebTokenHandler]] كتبه زي ما هو.

---

## ٤. التحقق في الواقع: ٤ حالات

| الحالة | الـ status | [[WWW-Authenticate]] |
|---|---|---|
| من غير توكن | 401 | [[Bearer]] |
| آخر حرف في التوكن متغير | 401 | [[Bearer error="invalid_token", error_description="The signature key was not found"]] |
| توكن سليم | 200 | |
| [[MinutesValid = -10]] | 401 | [[error_description="The token lifetime is invalid; NotBefore: '10/07/2026 17:23:27', Expires: '10/07/2026 17:13:27'"]] |

- التوقيع: الـ handler بيحسب التوقيع بالمفتاح بتاعه ويقارنه. لما ميطابقش، الرسالة «مفتاح التوقيع مش موجود» (ملقاش مفتاح يطابق)، مش «التوقيع غلط».
- [[MinutesValid]] سالب لوحده بيخلي [[nbf]] (دلوقتي) بعد [[exp]]، فالرسالة عن الـ lifetime كله. لما رجّعنا [[NotBefore]] لورا ٢٠ دقيقة كمان:

~~~text WWW-Authenticate
Bearer error="invalid_token", error_description="The token expired at '10/07/2026 17:13:48'"
~~~

- وتوكن منتهي من ٣ دقايق بس رجع **200**: الـ [[ClockSkew]] الافتراضي ٥ دقايق سماحية لفرق الساعات بين السيرفرات.

---

## ٥. الـ claims بعد التحقق

endpoint بيطبع [[User.Claims]] بتوكن admin:

~~~text الناتج
aud = shop-api
iss = shop-dev
http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier = admin@x.com
http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress = admin@x.com
http://schemas.microsoft.com/ws/2008/06/identity/claims/role = admin
...
~~~

الـ handler حوّل [[sub]] لـ [[ClaimTypes.NameIdentifier]] و [[email]] لـ [[ClaimTypes.Email]] (ده [[MapInboundClaims]]، مفعّل افتراضيًا). عشان كده في الدرس الجاي [[user.FindFirstValue(ClaimTypes.NameIdentifier)]] بيرجّع الـ [[sub]].

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[AddAuthentication("Bearer")]] | الـ scheme الافتراضي |
| [[AddJwtBearer]] + [[TokenValidationParameters]] | issuer و audience و المفتاح، والـ lifetime مفعّل لوحده |
| [[UseAuthentication]] ثم [[UseAuthorization]] | الترتيب في الـ pipeline |
| [[JsonWebTokenHandler.CreateToken]] | يعمل التوكن من [[SecurityTokenDescriptor]] |
| [[401]] + [[WWW-Authenticate]] | السبب مكتوب في الـ header |

- الـ payload مقروء لأي حد: متحطش فيه أسرار.
- المفتاح HMAC-SHA256 لازم ٣٢ byte على الأقل، ومكانه secrets مش git.
جرّبنا مفتاح ١٦ حرف بس، والـ [[/dev/token]] رجع 500:

~~~text اللوج
System.ArgumentOutOfRangeException: IDX10720: Unable to create KeyedHashAlgorithm for algorithm 'HS256', the key size must be greater than: '256' bits, key has '128' bits. (Parameter 'keyBytes')
~~~

١٦ حرف = ١٦ byte = ١٢٨ bit. والمطلوب ٢٥٦ bit على الأقل: جرّبنا مفتاح ٣٢ حرف بالظبط واشتغل (200)، رغم إن الرسالة بتقول greater than.`,
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

(١) من غير توكن: 401 و [[WWW-Authenticate: Bearer]]. (٢) توقيع متغير: 401 و [[WWW-Authenticate: Bearer error="invalid_token", error_description="The signature key was not found"]] (الرسالة مش «signature invalid»: الـ handler بيدور على مفتاح يطابق التوقيع ومبيلاقيش). (٣) منتهي: لو خليت [[MinutesValid]] سالب بس، الـ [[nbf]] (دلوقتي) بيبقى بعد الـ [[exp]]، والرد 401 بس الرسالة [[error_description="The token lifetime is invalid; NotBefore: '10/07/2026 17:23:27', Expires: '10/07/2026 17:13:27'"]]. عشان تشوف رسالة الانتهاء نفسها رجّع [[NotBefore]] لورا كمان (مثلًا [[now.AddMinutes(-20)]] مع [[MinutesValid = -10]]): [[error_description="The token expired at '10/07/2026 17:13:48'"]]. ولو التوكن المنتهي لسه شغال، افتكر الـ [[ClockSkew]] الافتراضي ٥ دقايق: توكن منتهي من ٣ دقايق بس لسه بيرجع 200، فخليه منتهي من أكتر من ٥ أو [[ClockSkew = TimeSpan.Zero]]. ولو الـ token سليم ولسه 401، بص على ترتيب [[UseAuthentication]] و [[UseAuthorization]] (درس middleware).`
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
          teach: R`## المثال ده بيعمل إيه؟

بيعرّف قاعدتين باسم (policies): «Admin» و «ProPlan»، ويحطهم على endpoints. وبعدين endpoint بيقرا المستخدم الحالي، و endpoint بيفحص «الأوردر ده بتاعك؟». جرّبناه في نفس الـ API بتاع درس JWT (.NET 10 في Docker) بـ ٤ توكنات: من غير، و sara (user عادي)، و sara بـ claim [[plan=pro]]، و admin. والأوردرات: رقم 1 بتاع sara، ورقم 2 بتاع omar.

---

## ١. تعريف الـ policies

~~~csharp Program.cs
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", p => p.RequireRole("admin"))
    .AddPolicy("ProPlan", p => p.RequireClaim("plan", "pro", "enterprise"));
~~~

- [[AddAuthorizationBuilder()]]: بيسجّل الـ authorization في الـ DI ويرجّع builder تعرّف عليه policies.
- [[.AddPolicy("Admin", p => ...)]]: policy اسمها [["Admin"]]. الـ [[p]] هو builder للقواعد.
  - [[p.RequireRole("admin")]]: لازم المستخدم يكون عنده role اسمه admin (claim من نوع [[ClaimTypes.Role]]).
- [[RequireClaim("plan", "pro", "enterprise")]]: لازم يكون فيه claim اسمه [[plan]] وقيمته واحدة من دول. القيم بعد الاسم = «أي واحدة منهم».

---

## ٢. ربطها بالـ endpoints

~~~csharp Program.cs
g.MapPost("/", CreateProduct).RequireAuthorization("Admin");
g.MapGet("/reports", GetReports).RequireAuthorization("ProPlan");
~~~

[[g]] هو [[app.MapGroup("/api/products")]]، و [[CreateProduct]] و [[GetReports]] الـ handlers (method group: اسم method بدل lambda). [[.RequireAuthorization("Admin")]] = الـ endpoint ده محتاج الـ policy دي.

~~~bash
curl -i -X POST -H "Content-Type: application/json" -d '{"name":"Red pen","price":6,"stock":5,"categoryId":1}' localhost:5931/api/products/
curl -i -X POST -H "Authorization: Bearer $USER_TOKEN" ...
curl -i -X POST -H "Authorization: Bearer $ADMIN_TOKEN" ...
~~~

~~~text الناتج
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json
{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.2","title":"Unauthorized","status":401,...}

HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.4","title":"Forbidden","status":403,...}

HTTP/1.1 201 Created
Location: /api/products/4
~~~

| الحالة | الرد | ليه |
|---|---|---|
| من غير توكن | 401 | مش عارفين انت مين (challenge) |
| sara (user) | 403 | عارفينك، بس مش admin (forbid) |
| admin | 201 | الـ policy عدّت |

(الـ ProblemDetails في 401 و 403 طالعة لأن الـ API فيه [[AddProblemDetails()]] و [[UseStatusCodePages()]]، من غيرهم الرد بيبقى فاضي.)

و [[/reports]]: sara العادية 403، و sara بـ [[plan=pro]] 200.

---

## ٣. مين المستخدم؟ [[ClaimsPrincipal]]

~~~csharp Program.cs
app.MapGet("/me", (ClaimsPrincipal user) => new
{
    id = user.FindFirstValue(ClaimTypes.NameIdentifier),
    email = user.FindFirstValue(ClaimTypes.Email),
    isAdmin = user.IsInRole("admin")
}).RequireAuthorization();
~~~

- [[ClaimsPrincipal user]]: parameter من نوع ده الـ framework بيملاه بـ [[HttpContext.User]]: المستخدم اللي الـ JWT handler عمله من التوكن.
- [[new { ... }]]: anonymous object بيرجع JSON.
- [[FindFirstValue(نوع)]]: قيمة أول claim من النوع ده، أو [[null]]. من [[System.Security.Claims]].
  - [[ClaimTypes.NameIdentifier]]: ده الـ [[sub]] بعد ما الـ handler حوّل اسمه (درس JWT).
- [[IsInRole("admin")]]: فيه claim role بالقيمة دي؟
- [[.RequireAuthorization()]] من غير اسم: أي مستخدم مسجّل.

~~~text الناتج (بتوكن sara)
{"id":"sara@x.com","email":"sara@x.com","isAdmin":false}
~~~

---

## ٤. الملكية: «الأوردر ده بتاعك؟»

~~~csharp Program.cs
app.MapGet("/api/orders/{id:int}", async (int id, ClaimsPrincipal user, ShopDb db) =>
{
    var order = await db.Orders.FindAsync(id);
    if (order is null) return Results.NotFound();
    return order.CustomerEmail == user.FindFirstValue(ClaimTypes.Email) || user.IsInRole("admin")
        ? Results.Ok(order) : Results.NotFound();
}).RequireAuthorization();
~~~

- [[{id:int}]]: route parameter، و [[:int]] constraint: لو مش رقم الـ route مش بيطابق أصلًا.
- الـ handler بياخد ٣ حاجات: [[id]] من الـ route، و [[user]]، و [[db]] من الـ DI.
- [[FindAsync(id)]]: بالـ primary key.
- [[order is null]]: pattern matching لـ null.
- [[شرط ? أ : ب]]: الـ ternary: لو الشرط صح [[أ]]، وإلا [[ب]].
- الشرط: إيميل صاحب الأوردر = إيميل المستخدم **أو** هو admin.

~~~text الناتج (بتوكن sara)
/api/orders/1   200  {"id":1,"customerEmail":"sara@x.com",...}
/api/orders/2   404  {"type":"...section-15.5.5","title":"Not Found","status":404,...}
/api/orders/99  404  {"type":"...section-15.5.5","title":"Not Found","status":404,...}
~~~

~~~text الناتج (بتوكن admin)
/api/orders/2   200  {"id":2,"customerEmail":"omar@x.com",...}
~~~

لاحظ إن أوردر omar (موجود) ورقم 99 (مش موجود) رجعوا **نفس الرد بالظبط** لـ sara. ده المقصود: لو رجّعنا 403 للأوردر 2، sara هتعرف إنه موجود. ولا policy ولا role تقدر تعمل الفحص ده، لأنه محتاج الـ object نفسه.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| أي حد مسجّل | [[.RequireAuthorization()]] |
| role معين | policy بـ [[RequireRole]] و [[.RequireAuthorization("Admin")]] |
| claim بقيمة معينة | [[RequireClaim("plan", "pro", "enterprise")]] |
| بيانات المستخدم في الـ handler | parameter [[ClaimsPrincipal user]] و [[FindFirstValue]] |
| الـ object بتاعه؟ | افحص جوه الـ handler (أو في الـ query نفسها) |

- 401 = مفيش توكن أو غلط، و 403 = التوكن سليم والـ policy فشلت.
- object مش بتاعه = 404 زي اللي مش موجود.`,
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
          teach: R`## الملف ده بيعمل إيه؟

API كامل في ملف واحد: تسجيل ودخول وتوكن، والـ users محفوظين في Postgres بـ EF Core، والباسوردات متخزنة hash، ومن غير ما نكتب ولا endpoint للـ login بإيدنا. شغّلناه بـ [[dotnet run app.cs]] جوه [[mcr.microsoft.com/dotnet/sdk:10.0]] (غيّرنا [[Host=localhost]] لاسم الـ container بتاع [[postgres:18]] بس)، وكلمناه بـ [[curl]].

---

## ١. السطور اللي بتبدأ بـ [[#:]]

~~~csharp app.cs
#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
#:package Microsoft.AspNetCore.Identity.EntityFrameworkCore@10.0.12
#:package Npgsql.EntityFrameworkCore.PostgreSQL@10.0.3
#:package Microsoft.EntityFrameworkCore.Relational@10.0.12
~~~

دي directives الـ file-based apps في .NET 10 (درس dotnet run app.cs): بدل ملف [[.csproj]].

- [[#:sdk Microsoft.NET.Sdk.Web]]: ده web app (فيه ASP.NET Core).
- [[#:property PublishAot=false]]: الـ file-based apps بتتعمل Native AOT افتراضيًا لما تنشرها، و EF Core و Identity مش بيشتغلوا كويس مع AOT، فبنقفله.
- [[#:package اسم@نسخة]]: حزمة NuGet:
  - [[Identity.EntityFrameworkCore]]: Identity بجداوله في EF.
  - [[Npgsql...]]: Postgres.
  - [[Relational@10.0.12]]: بنثبّت نسخته عشان Npgsql 10.0.3 بيعتمد على EF أقدم، و Identity على 10.0.12 (مشكلة النسخ في درس DbContext).

---

## ٢. الـ usings والـ builder

~~~csharp app.cs
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
~~~

namespaces لـ [[ClaimsPrincipal]] و [[IdentityUser]] و [[IdentityDbContext]] و [[UseNpgsql]]. وبعدين الـ builder العادي.

---

## ٣. الـ services

~~~csharp app.cs
builder.Services.AddDbContext<AppDb>(o => o.UseNpgsql("Host=localhost;Database=shop_identity;Username=shop;Password=shop"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AppDb>();
~~~

- [[AddDbContext<AppDb>]]: زي أي DbContext. الـ connection string مكتوب في الكود للتجربة بس.
- [[AddAuthorization()]]: عشان [[RequireAuthorization]] تحت.
- [[AddIdentityApiEndpoints<IdentityUser>()]]: سطر واحد بيسجّل:
  - Identity نفسه ([[UserManager]] و [[SignInManager]] وقواعد الباسورد والـ lockout).
  - الـ authentication بـ scheme للـ bearer token وscheme للـ cookie.
  - [[IdentityUser]]: الـ class الجاهزة للمستخدم (إيميل، باسورد hash، إلخ). تقدر تورث منها وتزوّد.
- [[.AddEntityFrameworkStores<AppDb>()]]: احفظ المستخدمين في الـ [[AppDb]] ده.

---

## ٤. الجداول: [[EnsureCreated]]

~~~csharp app.cs
var app = builder.Build();
using (var scope = app.Services.CreateScope())
    scope.ServiceProvider.GetRequiredService<AppDb>().Database.EnsureCreated();
~~~

- [[CreateScope()]]: الـ DbContext متسجل Scoped، ومفيش request دلوقتي، فبنعمل scope بإيدنا.
- [[GetRequiredService<AppDb>()]]: هات الـ context.
- [[Database.EnsureCreated()]]: لو الداتابيز أو الجداول مش موجودة اعملها من الـ model. للتجربة بس: مبيعرفش migrations.

ودي الجداول اللي اتعملت (من [[psql]] و [[\dt]]):

~~~text الناتج
 public | AspNetRoleClaims | table | shop
 public | AspNetRoles      | table | shop
 public | AspNetUserClaims | table | shop
 public | AspNetUserLogins | table | shop
 public | AspNetUserRoles  | table | shop
 public | AspNetUserTokens | table | shop
 public | AspNetUsers      | table | shop
~~~

جايين من [[IdentityDbContext<IdentityUser>]] في آخر سطر.

---

## ٥. الـ endpoints

~~~csharp app.cs
app.MapGroup("/account").MapIdentityApi<IdentityUser>();
app.MapGet("/me", (ClaimsPrincipal user) => new { name = user.Identity!.Name }).RequireAuthorization();
app.Run();
class AppDb(DbContextOptions<AppDb> o) : IdentityDbContext<IdentityUser>(o);
~~~

- [[MapGroup("/account")]]: كل اللي جاي يبدأ بـ [[/account]].
- [[MapIdentityApi<IdentityUser>()]]: الـ endpoints الجاهزة: [[/account/register]] و [[/account/login]] و [[/account/refresh]] وغيرهم.
- [[user.Identity!.Name]]: اسم المستخدم (هنا الإيميل). الـ [[!]] لأن [[Identity]] ممكن نظريًا تبقى null، بس بعد [[RequireAuthorization]] مش هتبقى.
- [[class AppDb(...) : IdentityDbContext<IdentityUser>(o);]]: DbContext بيورث جداول Identity. الـ [[;]] في الآخر بدل [[{}]] لأن الـ class مفيهاش body.

---

## ٦. التجربة: باسورد ضعيف

~~~bash
curl -i -X POST -H "Content-Type: application/json" -d '{"email":"sara@x.com","password":"weak"}' localhost:5932/account/register
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"PasswordTooShort":["Passwords must be at least 6 characters."],"PasswordRequiresNonAlphanumeric":["Passwords must have at least one non alphanumeric character."],"PasswordRequiresDigit":["Passwords must have at least one digit ('0'-'9')."],"PasswordRequiresUpper":["Passwords must have at least one uppercase ('A'-'Z')."]}}
~~~

القواعد الافتراضية: ٦ حروف على الأقل، ورمز، ورقم، وحرف كبير، وحرف صغير ([[weak]] فيه صغير، فمطلعتش). كلها بتتغير من [[IdentityOptions.Password]].

---

## ٧. تسجيل ودخول

بـ [[Str0ng!Pass]]:

~~~text register
HTTP/1.1 200 OK
Content-Length: 0
~~~

~~~text login
{"tokenType":"Bearer","accessToken":"...","expiresIn":3600,"refreshToken":"..."}
~~~

- [[expiresIn]]: 3600 ثانية = ساعة.
- [[refreshToken]]: تبعته لـ [[/account/refresh]] وتاخد access token جديد من غير باسورد.

والباسورد اتحفظ إزاي؟ أول bytes من [[PasswordHash]] بعد فك الـ base64:

~~~text الناتج
01 00 00 00 02 00 01 86 a0 00 00 00 10 ...   (61 byte)
~~~

| الـ bytes | معناها |
|---|---|
| [[01]] | صيغة Identity v3 |
| [[00 00 00 02]] | HMAC-SHA512 |
| [[00 01 86 a0]] | 100000 مرة (PBKDF2 iterations) |
| [[00 00 00 10]] | salt طوله 16 byte |
| الباقي | الـ salt (16) + الـ hash (32) |

الباسورد نفسه مش محفوظ في أي حتة.

---

## ٨. التوكن و [[/me]]

~~~text الناتج
/me بالتوكن       {"name":"sara@x.com"}  200
/me من غير توكن   HTTP/1.1 401 Unauthorized
login بباسورد غلط {"type":"...","title":"Unauthorized","status":401,"detail":"Failed"}
~~~

وفكّينا الـ [[accessToken]] زي JWT: طوله 710 حرف، ومفيهوش ولا نقطة (جزء واحد مش ٣)، وبيبدأ بـ [[CfDJ8]]، و [[base64 -d]] بيطلّع bytes ملهاش معنى مش JSON. ده مش JWT: ده data متشفرة بـ **Data Protection** (نظام التشفير الداخلي في ASP.NET Core)، وبس التطبيق اللي معاه المفتاح يقدر يفكها.

والمفاتيح دي فين؟ اللوج قال:

~~~text اللوج
warn: Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository[60]
      Storing keys in a directory '/root/.aspnet/DataProtection-Keys' that may not be persisted outside of the container. Protected data will be unavailable when container is destroyed.
~~~

يعني في container، لو اتمسح، المفاتيح تروح وكل التوكنات القديمة تبقى 401.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[AddIdentityApiEndpoints<IdentityUser>()]] | Identity + bearer + cookie |
| [[AddEntityFrameworkStores<AppDb>()]] | المستخدمين في EF |
| [[IdentityDbContext<IdentityUser>]] | ٧ جداول [[AspNet*]] |
| [[MapIdentityApi<IdentityUser>()]] | register و login و refresh و ... |
| [[EnsureCreated()]] | جداول من غير migrations (تجربة بس) |

- الباسورد: PBKDF2 بـ HMAC-SHA512 و ١٠٠ ألف دورة و salt.
- توكن Identity مش JWT: service تانية مش هتفهمه.
- في Docker أو كذا instance احفظ مفاتيح Data Protection في مكان مشترك.`,
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
    }
]);
