// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "OIDC و SSO",
      l: 3,
      n: "الدخول بجوجل أو بحساب الشركة من جوه: الـ discovery، والتحقق من id_token بالمفاتيح العامة، و nonce، وخدمات بتكلّم بعض من غير مستخدم",
      items: [
        {
          cmd: "discovery document",
          title: "اعرف كل عناوين الـ IdP من URL واحد",
          desc: R`OIDC (OpenID Connect) طبقة فوق OAuth2: OAuth بيدّيك access token «مسموحلك تعمل كذا»، و OIDC بيضيف [[id_token]] «ده مين». وأي IdP (جوجل، أو Microsoft Entra، أو Okta، أو Keycloak، أو Auth0) بينشر ملف JSON على عنوان ثابت: [[/.well-known/openid-configuration]] تحت الـ issuer بتاعه.

الملف ده فيه كل اللي محتاجه: عنوان صفحة الدخول، وعنوان تبديل الـ code بـ tokens، وعنوان المفاتيح العامة (JWKS)، والخوارزميات المدعومة. فالكود بتاعك يشتغل مع أي IdP بتديله الـ issuer بس.`,
          example: R`curl -s https://accounts.google.com/.well-known/openid-configuration | jq '{issuer, authorization_endpoint, token_endpoint, jwks_uri, id_token_signing_alg_values_supported}'
curl -s https://www.googleapis.com/oauth2/v3/certs | jq -c '.keys[] | {kid, alg, kty, use}'
curl -s https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration | jq -r '.issuer, .jwks_uri'`,
          try: R`شغّل الأوامر، وبعدين اعمل decode محلي لأي id_token عندك (من تجربة درس [[OAuth]] في تاب «بناء مشروع كامل») بـ [[node -e]] و [[Buffer.from(part, "base64url")]]، مش على موقع أونلاين لأن التوكن ده بيدخّل: قارن الـ [[kid]] اللي في الـ header بالمفاتيح اللي رجعت من الأمر التاني، والـ [[iss]] باللي في الـ discovery.`,
          deep: {
            why: "من غيره بتكتب عناوين جوجل بإيدك في الكود (زي درس OAuth في «بناء مشروع كامل»)، ولما تضيف Microsoft أو IdP بتاع شركة عميل، تكتب عناوين تانية. والمفاتيح بتتغير كل كام يوم، فلو نسختها بإيدك، الدخول هيقع فجأة يوم ما جوجل تبدّلها.",
            how: R`أهم الحقول:

[[issuer]]: هوية الـ IdP. لازم يطابق [[iss]] في أي id_token بالظبط. وده اللي بتتحقق بيه إن التوكن جاي من المكان الصح.

[[authorization_endpoint]]: الصفحة اللي بتودّي المستخدم ليها. [[token_endpoint]]: السيرفر بتاعك بيعمل POST هنا يبدّل الـ code بـ tokens. [[userinfo_endpoint]]: بيانات إضافية بالـ access token. [[end_session_endpoint]] (لو موجود): تسجيل الخروج من الـ IdP.

[[jwks_uri]]: المفاتيح العامة اللي بيوقّع بيها الـ id_tokens، بصيغة JWKS (JSON Web Key Set). كل مفتاح ليه [[kid]] (key id)، والـ id_token فيه [[kid]] في الـ header بيقول اتوقّع بأنهي مفتاح. الـ IdP بينشر أكتر من مفتاح في نفس الوقت عشان يبدّلهم من غير ما حاجة تقع: المفتاح الجديد بيتنشر الأول، وبعد فترة يبدأ يوقّع بيه، وبعدها القديم يتشال.

[[id_token_signing_alg_values_supported]]: الخوارزميات. RS256 (RSA + SHA-256) الأشهر، و ES256 كمان منتشر. الاتنين asymmetric: الـ IdP بيوقّع بالمفتاح الخاص، وأي حد يتحقق بالعام. عكس HS256 (درس [[jwt.sign و jwt.verify]] في تاب «Backend بـ Node») اللي فيه نفس السر للتوقيع والتحقق، فمينفعش بين طرفين مختلفين.

Microsoft [[common]]: الـ issuer فيه [[{tenantid}]] حرفيًا، لأن كل شركة (tenant) ليها issuer مختلف. ده معناه إنك لازم تتحقق من الـ tenant في التوكن بنفسك، ودي نقطة بتقع فيها تطبيقات كتير (الدرس الأخير في الكاتيجوري دي).

الملف ده بيتكاش: بتجيبه مرة وقت التشغيل أو كل كام ساعة، مش في كل login.`,
            when: "أي تكامل مع IdP. والمكتبات (openid-client، و Auth.js، و Better Auth) بتقرا الملف ده لوحدها لما تدّيها الـ issuer.",
            mistakes: R`تنسخ الـ JWKS في ملف عندك. وتقارن الـ issuer بـ [[includes]] أو [[startsWith]] بدل مساواة. وتجيب الـ discovery في كل طلب. وتثق في issuer بتاع Microsoft [[common]] كأنه issuer واحد، فأي حساب Microsoft في الدنيا يدخل. وسؤال انترفيو: «إيه الفرق بين OAuth2 و OIDC؟»: OAuth2 للـ authorization (صلاحية على API)، و OIDC للـ authentication (مين المستخدم) بالـ id_token.`
          },
          teach: R`## ملف واحد بيقولك كل عناوين الـ IdP

الـ IdP (Identity Provider، يعني الجهة اللي بتقول «ده مين»: جوجل أو Microsoft أو Okta) بينشر ملف JSON على عنوان ثابت. التلات أوامر في المثال بيقروا الملف ده من جوجل ومن Microsoft، وبيقروا المفاتيح العامة اللي جوجل بتوقّع بيها. هنفك كل أمر، وبعدين نعمل نفس الحاجة على IdP محلي ونفك id_token حقيقي.

اتجرّب: الأوامر على [[ubuntu:24.04]] في Docker (curl 8.5 و jq 1.7، اتسطبوا بـ [[apt-get install curl jq]])، و PowerShell 7.6 و Windows PowerShell 5.1 على ويندوز 11. والـ IdP المحلي هو مكتبة [[oidc-provider]] 9.12 على Node 24.19 (بورت ٦٠١٠)، مكان جوجل. لوحات التحكم بتاعة جوجل و Microsoft نفسها (اللي بتعمل فيها الـ client) مش متجرّبة هنا، والكلام عنها من الـ docs بتاعتهم.

---

## ١. الأمر الأول: الـ discovery بتاع جوجل

~~~bash
curl -s https://accounts.google.com/.well-known/openid-configuration | jq '{issuer, authorization_endpoint, token_endpoint, jwks_uri, id_token_signing_alg_values_supported}'
~~~

### الحتة الأولى: [[curl -s URL]]

[[curl]] بيعمل طلب GET ويطبع الرد. و [[-s]] (silent) بيخفي شريط التقدم والأخطاء الصغيرة، عشان اللي يطلع يبقى الـ JSON بس.

والعنوان نفسه: [[https://accounts.google.com]] ده الـ **issuer** (الجهة اللي بتصدر التوكنات)، و [[/.well-known/openid-configuration]] مسار ثابت في مواصفة OIDC Discovery. أي IdP بيدعم OIDC لازم يحط الملف هنا. [[.well-known]] فولدر متفق عليه في الويب للملفات اللي البرامج بتدوّر عليها لوحدها.

### الحتة التانية: [[jq '{...}']]

الـ [[|]] (pipe) بتاخد ناتج [[curl]] وتديه لـ [[jq]] كمدخل.

[[jq]] أداة بتقرا JSON وتفلتره. و [[{issuer, authorization_endpoint}]] معناها «اعمل object جديد فيه الحقول دي بس بنفس أساميها». الملف الأصلي فيه ١٧ حقل، واحنا عايزين ٥:

~~~text الناتج
{
  "issuer": "https://accounts.google.com",
  "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
  "token_endpoint": "https://oauth2.googleapis.com/token",
  "jwks_uri": "https://www.googleapis.com/oauth2/v3/certs",
  "id_token_signing_alg_values_supported": [
    "RS256"
  ]
}
~~~

| الحقل | يعني إيه | مين بيستخدمه |
|---|---|---|
| [[issuer]] | اسم الـ IdP الرسمي | انت، بتقارنه بـ [[iss]] في كل توكن |
| [[authorization_endpoint]] | صفحة الدخول | المتصفح، بتودّي المستخدم ليها |
| [[token_endpoint]] | المكان اللي بتبدّل فيه الـ code بتوكنات | السيرفر بتاعك بـ POST |
| [[jwks_uri]] | المفاتيح العامة | السيرفر بتاعك عشان يتحقق من التوقيع |
| [[id_token_signing_alg_values_supported]] | خوارزميات التوقيع | بتحددلك تقبل أنهي [[alg]] |

لاحظ إن العناوين مش كلها على نفس الدومين: صفحة الدخول على [[accounts.google.com]] والتوكنات على [[oauth2.googleapis.com]]. عشان كده مبتخمّنش العناوين، بتقراها من الملف.

ولو عايز تشوف أسامي كل الحقول: [[jq 'keys']]. عند جوجل طلعوا ١٧، ومنهم [[userinfo_endpoint]] و [[revocation_endpoint]] و [[code_challenge_methods_supported]]. ومفيش [[end_session_endpoint]] عند جوجل، فتسجيل الخروج من جوجل نفسها مش جزء من الـ discovery بتاعها.

---

## ٢. الأمر التاني: المفاتيح العامة (JWKS)

~~~bash
curl -s https://www.googleapis.com/oauth2/v3/certs | jq -c '.keys[] | {kid, alg, kty, use}'
~~~

JWKS اختصار JSON Web Key Set: object فيه array اسمها [[keys]]، كل عنصر مفتاح عام.

- [[.keys[]]]: «لف على كل عنصر في [[keys]]». الـ [[[]]] من غير رقم معناها كلهم.
- [[| {kid, alg, kty, use}]]: من كل مفتاح خد ٤ حقول بس (المفتاح نفسه رقم طويل في حقل [[n]]، مش محتاجينه نشوفه).
- [[-c]] (compact): كل object في سطر واحد.

~~~text الناتج
{"kid":"943a3a5d7d919625a454e489b75c29adab57acba","alg":"RS256","kty":"RSA","use":"sig"}
{"kid":"f10f87405a979c1df36df26606734f33cd85c271","alg":"RS256","kty":"RSA","use":"sig"}
~~~

| الحقل | معناه |
|---|---|
| [[kid]] | Key ID: اسم المفتاح. كل id_token بيقول في الـ header بتاعه اتوقّع بأنهي [[kid]] |
| [[alg]] | [[RS256]] = توقيع RSA مع SHA-256 |
| [[kty]] | Key Type: نوع المفتاح، هنا [[RSA]] |
| [[use]] | [[sig]] = للتوقيع (مش للتشفير) |

ليه مفتاحين؟ عشان التبديل: جوجل بتنشر المفتاح الجديد قبل ما توقّع بيه، فالتطبيقات تلحق تجيبه، وبعدين القديم يتشال. ولو شغّلت الأمر بعد أسبوع غالبًا هتلاقي [[kid]] مختلف.

والـ headers بتاعة الرد بتقولك قد إيه تكاش المفاتيح:

~~~bash
curl -sI https://www.googleapis.com/oauth2/v3/certs | grep -iE "cache-control|expires"
~~~

~~~text الناتج
expires: Thu, 08 Oct 2026 15:22:29 GMT
cache-control: public, max-age=22678, must-revalidate, no-transform
~~~

[[-I]] بيجيب الـ headers بس. و [[max-age=22678]] ثانية = حوالي ٦ ساعات وربع: جوجل بتقولك «المفاتيح دي صالحة الوقت ده».

---

## ٣. الأمر التالت: Microsoft و [[{tenantid}]]

~~~bash
curl -s https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration | jq -r '.issuer, .jwks_uri'
~~~

- [[common]] في المسار: endpoint بيقبل أي حساب Microsoft من أي شركة.
- [[.issuer, .jwks_uri]]: الفاصلة في jq معناها «اطبع الاتنين ورا بعض».
- [[-r]] (raw): اطبع النص من غير علامات التنصيص.

~~~text الناتج
https://login.microsoftonline.com/{tenantid}/v2.0
https://login.microsoftonline.com/common/discovery/v2.0/keys
~~~

الـ issuer فيه [[{tenantid}]] **حرفيًا**، مش قيمة. لأن كل شركة (tenant) بيطلعلها توكنات بـ issuer مختلف فيه الـ id بتاعها. فلو قارنت [[iss]] بالنص ده بالظبط، مفيش توكن هيعدّي. ولو قبلت أي issuer بيبدأ بـ [[login.microsoftonline.com]]، أي موظف في أي شركة في الدنيا يدخل. الحل في درس [[SSO للشركات]]: تتحقق من [[tid]] اللي في التوكن.

---

## ٤. نفس الأوامر من PowerShell

[[jq]] مش موجود على ويندوز افتراضيًا، بس PowerShell بيعمل parse للـ JSON لوحده:

~~~powershell
$d = Invoke-RestMethod https://accounts.google.com/.well-known/openid-configuration
$d | Select-Object issuer, jwks_uri, id_token_signing_alg_values_supported | Format-List
(Invoke-RestMethod $d.jwks_uri).keys | Select-Object kid, alg, kty, use | Format-Table
(Invoke-RestMethod https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration).issuer
~~~

- [[Invoke-RestMethod]] بيعمل الطلب ويحوّل الـ JSON لـ object.
- [[$d]] متغير شايل الـ object، و [[$d.jwks_uri]] حقل منه، فالأمر التاني بيستخدم العنوان اللي جه من الأول بدل ما تكتبه بإيدك. وده بالظبط فكرة الـ discovery.
- [[Select-Object]] زي [[jq '{...}']]: خد حقول معينة. و [[Format-List]] حقل في كل سطر، و [[Format-Table]] جدول.

~~~text الناتج (PowerShell 7.6)
issuer                                : https://accounts.google.com
jwks_uri                              : https://www.googleapis.com/oauth2/v3/certs
id_token_signing_alg_values_supported : {RS256}

kid                                      alg   kty use
---                                      ---   --- ---
943a3a5d7d919625a454e489b75c29adab57acba RS256 RSA sig
f10f87405a979c1df36df26606734f33cd85c271 RS256 RSA sig

https://login.microsoftonline.com/{tenantid}/v2.0
~~~

ونفس الأوامر اشتغلت في Windows PowerShell 5.1 وطلّعت نفس الـ issuer.

---

## ٥. على IdP محلي: نفس الملف بالظبط

عشان نجرّب من غير حساب جوجل، شغّلنا IdP حقيقي على الجهاز بمكتبة [[oidc-provider]] (issuer [[http://localhost:6010]]، وفيه client اسمه [[my-client]]). نفس السؤال:

~~~bash
curl -s localhost:6010/.well-known/openid-configuration
~~~

~~~text أهم الحقول
"issuer": "http://localhost:6010",
"authorization_endpoint": "http://localhost:6010/auth",
"token_endpoint": "http://localhost:6010/token",
"jwks_uri": "http://localhost:6010/jwks",
"end_session_endpoint": "http://localhost:6010/session/end",
"id_token_signing_alg_values_supported": ["RS256"],
"grant_types_supported": ["implicit", "authorization_code", "client_credentials"]
~~~

نفس الحقول، بأسامي مسارات مختلفة. ده الهدف: الكود بتاعك ياخد الـ issuer بس، ويقرا الباقي.

---

## ٦. الـ try: فك id_token محليًا

دخلنا بالـ IdP المحلي (الفلو كامل في درس [[id_token و nonce]])، وأخدنا الـ id_token. التوكن ٣ حتت مفصولين بنقطة: header و payload و signature، وأول اتنين base64url (base64 بحروف آمنة في الـ URL: [[-]] و [[_]] بدل [[+]] و [[/]]، ومن غير [[=]] في الآخر):

~~~bash
node -e 'const [h,p]=process.argv[1].split(".");console.log(Buffer.from(h,"base64url").toString());console.log(Buffer.from(p,"base64url").toString())' "$TOKEN"
~~~

- [[process.argv[1]]]: أول argument بعد الكود، يعني التوكن.
- [[.split(".")]] بيقسمه، و [[const [h,p] =]] بياخد أول حتتين.
- [[Buffer.from(h, "base64url")]] بيفك الـ base64url لبايتات، و [[.toString()]] بيحوّلها نص.

~~~text الناتج
{"alg":"RS256","kid":"k1"}
{"sub":"mona","email":"mona@acme.com","email_verified":true,"name":"Mona","nonce":"lfgW_2lpNsxY7qnP4Ldorw","aud":"my-client","exp":1791454049,"iat":1791450449,"iss":"http://localhost:6010"}
~~~

دلوقتي قارن:

- [[kid]] في الـ header هو [[k1]]، وده نفس الـ [[kid]] اللي في [[localhost:6010/jwks]].
- [[iss]] هو [[http://localhost:6010]]، نفس [[issuer]] في الـ discovery بالحرف.
- [[aud]] هو الـ client_id بتاعنا، و [[exp]] و [[iat]] ثواني من ١٩٧٠ (iat = issued at). الفرق بينهم ٣٦٠٠ = التوكن عايش ساعة.

> ده **decode** مش تحقق. أي حد يقدر يكتب JSON زي ده. التحقق بالتوقيع في الدرس الجاي. ومتحطش توكن حقيقي في موقع decode أونلاين: التوكن ده بيدخّل.

---

## الخلاصة

| الأمر | بيجيب إيه | أهم حاجة فيه |
|---|---|---|
| [[/.well-known/openid-configuration]] | كل عناوين الـ IdP | [[issuer]] و [[jwks_uri]] و [[token_endpoint]] |
| [[jwks_uri]] | المفاتيح العامة | كل مفتاح ليه [[kid]]، وغالبًا أكتر من واحد |
| Microsoft [[common]] | issuer فيه [[{tenantid}]] | لازم تتحقق من الـ tenant بنفسك |

- الكود ياخد الـ issuer بس، والباقي من الملف، ويكاشه.
- [[iss]] في التوكن = [[issuer]] بالحرف، مش [[startsWith]].
- المفاتيح بتتبدل، فمتنسخهاش في الكود.`,
          lines: [
            "هات الـ discovery بتاع جوجل واعرض أهم الحقول: الـ issuer، وصفحة الدخول، وعنوان التوكنات، وعنوان المفاتيح، والخوارزميات.",
            "هات المفاتيح العامة: كل مفتاح بـ kid ونوعه (RSA) واستخدامه (sig = توقيع). غالبًا هتلاقي اتنين عشان التبديل.",
            "Microsoft: لاحظ إن الـ issuer فيه {tenantid}، لأن كل شركة ليها issuer."
          ],
          sol: R`الأمر الأول بيطلع issuer [[https://accounts.google.com]] و jwks_uri [[https://www.googleapis.com/oauth2/v3/certs]] والخوارزمية [[RS256]]. التاني بيطلع مفتاحين (أو أكتر) كل واحد بـ [[kid]] مختلف و [["alg":"RS256","kty":"RSA","use":"sig"]]. والتالت بيطلع [[https://login.microsoftonline.com/{tenantid}/v2.0]].

لما تعمل decode لـ id_token من جوجل: الـ header فيه [[{"alg":"RS256","kid":"..."}]] والـ kid ده لازم يبقى واحد من اللي في الأمر التاني (لو التوكن قديم ممكن تلاقيه اتشال، وده عادي بعد أيام). والـ payload فيه [[iss]] و [[aud]] (الـ client_id بتاعك) و [[sub]] و [[exp]] و [[nonce]] لو بعته.

ملحوظة: جوجل ممكن ترجّع [[iss]] بـ [[accounts.google.com]] من غير https، ووثايقها بتقول الاتنين صح. فلو بتتحقق من جوجل بالذات، اقبل القيمتين (الدرس الجاي).`
        },
        {
          cmd: "jose و JWKS",
          title: "اتحقق من id_token بالمفاتيح العامة صح",
          desc: R`التحقق من id_token مش decode. لازم ٤ حاجات: التوقيع صح بمفتاح من JWKS الـ IdP، و [[iss]] هو الـ IdP، و [[aud]] هو الـ client_id بتاعك، والتوكن مخلصش ([[exp]]). ومعاهم [[nonce]] (الدرس الجاي).

مكتبة [[jose]] بتعمل ده في سطرين: [[createRemoteJWKSet]] بيجيب المفاتيح ويكاشها ويعيد جلبها لو ظهر [[kid]] جديد، و [[jwtVerify]] بيعمل كل الفحوصات.`,
          example: R`import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
const discovery = await fetch("https://accounts.google.com/.well-known/openid-configuration").then((r) => r.json());
const JWKS = createRemoteJWKSet(new URL(discovery.jwks_uri));
export type IdClaims = JWTPayload & { email?: string; email_verified?: boolean; name?: string; nonce?: string };
export async function verifyIdToken(idToken: string, expectedNonce: string): Promise<IdClaims> {
  const { payload } = await jwtVerify<IdClaims>(idToken, JWKS, {
    issuer: [discovery.issuer, "accounts.google.com"],
    audience: config.GOOGLE_CLIENT_ID,
    algorithms: ["RS256"],
    clockTolerance: 30,
  });
  if (!expectedNonce || payload.nonce !== expectedNonce) throw new Error("nonce mismatch");
  return payload;
}`,
          try: R`اعمل IdP مزيف في نفس الملف: [[generateKeyPair("RS256")]]، واعرض المفتاح العام بـ [[exportJWK]] على [[/jwks]] من سيرفر صغير، ووقّع توكنات بـ [[SignJWT]]. جرّب ٥ توكنات: سليم، و aud غلط، ومتوقّع بمفتاح تاني، و [[alg: HS256]]، ومنتهي. كل واحد لازم يترفض بسبب مختلف.`,
          flag: "script",
          deep: {
            why: "id_token اللي مش متحقق منه صح = أي حد يدخل بأي حساب. أشهر الأخطاء: decode من غير تحقق، أو تحقق من التوقيع بس من غير aud (فتوكن اتعمل لتطبيق تاني عند نفس الـ IdP يدخل عندك)، أو قبول أي alg.",
            how: R`[[createRemoteJWKSet(url)]] بيرجّع دالة. أول تحقق بيجيب الـ JWKS ويحفظه. التحقق بيدوّر على المفتاح بالـ [[kid]] اللي في header التوكن. لو ملقاهوش (الـ IdP بدّل المفاتيح)، بيجيب الـ JWKS تاني. وفيه حمايتين: [[cooldownDuration]] (افتراضي ٣٠ ثانية) مبيعيدش الجلب أسرع من كده حتى لو جاله kid غريب (عشان حد ميبعتلكش توكنات بـ kid عشوائي يخليك تضرب الـ IdP)، و [[cacheMaxAge]] (افتراضي ١٠ دقايق) بيجدد المفاتيح دوريًا. والـ JWKS بيعيش في الذاكرة، فاعمله مرة على مستوى الـ module، مش جوه الدالة.

[[jwtVerify]] بيتحقق من:

التوقيع: بالمفتاح العام اللي الـ kid بيشاور عليه.

[[algorithms]]: الـ alg اللي في الـ header لازم يبقى من القايمة. ده بيقفل هجوم alg confusion: حد يبعت توكن بـ [[alg: HS256]] أو [[none]] ويخلي المكتبة تتحقق بطريقة غلط. jose مبتقبلش [[none]] أصلًا، ومبتسمحش باستخدام مفتاح RSA كسر HMAC، بس القايمة الصريحة بتقفل الباب تمامًا.

[[issuer]] و [[audience]]: لازم يطابقوا بالظبط. ينفع array لو فيه أكتر من قيمة صح (زي جوجل هنا). و [[aud]] في id_token هو الـ client_id بتاعك.

[[exp]] و [[nbf]]: jose بيتحقق منهم تلقائيًا. [[clockTolerance]] بيسمح بفرق ساعة صغير بين سيرفرك والـ IdP.

الأخطاء ليها [[code]]: [[ERR_JWT_EXPIRED]]، و [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]]، و [[ERR_JWT_CLAIM_VALIDATION_FAILED]]، و [[ERR_JOSE_ALG_NOT_ALLOWED]]. سجّلها في الـ logs عشان تفهم ليه الدخول بيفشل، بس رد على المستخدم برسالة عامة.

jose شغالة على Node و Bun و Deno و Edge و المتصفح (Web Crypto). ونفس الكود بيتحقق من access tokens جاية من IdP لـ API بتاعك (الـ audience ساعتها اسم الـ API مش الـ client_id)، ومن توكنات Supabase أو Clerk أو Auth0 بتوع مشروعك، كل واحد بالـ JWKS بتاعه.`,
            when: "أي مكان بيستقبل JWT اتوقّع من حد تاني: id_token في callback، أو من تطبيق موبايل بيبعت id_token من Google Sign-In، أو access token لـ API. التوكنات اللي انت بتعملها لنفسك بـ HS256 ليها درسها في تاب «Backend بـ Node».",
            mistakes: R`[[jwt.decode]] بدل verify. ومفيش audience. و [[createRemoteJWKSet]] جوه الدالة فكل login بيجيب المفاتيح من الأول. وتنسخ المفتاح العام في الكود فيقع يوم التبديل. وتقبل الـ alg اللي في الـ header من غير قايمة. وسؤال انترفيو: «إزاي الـ IdP بيبدّل مفاتيحه من غير ما التطبيقات تقع؟»: بينشر الجديد في JWKS قبل ما يوقّع بيه، والـ kid بيقول أنهي مفتاح، والعملاء بيعيدوا جلب الـ JWKS لما يشوفوا kid جديد.`
          },
          teach: R`## التحقق = التوقيع + ٤ أسئلة

الدالة [[verifyIdToken]] بتاخد الـ id_token اللي رجع من الـ IdP، وبتتأكد إنه متوقّع بمفتاح من مفاتيحه، ومعمول لتطبيقنا، ومن الـ IdP الصح، ولسه مخلصش، وإن الـ nonce بتاعه هو اللي احنا بعتناه. لو أي حاجة غلط بترمي error، ولو كله تمام بترجّع الـ claims (البيانات اللي جوه التوكن).

اتجرّب على ويندوز 11: Node 24.19 و [[jose]] 6.2. المثال نفسه اشتغل مع IdP محلي ([[oidc-provider]] على بورت ٦٠١٠، مكان جوجل، والتغيير الوحيد عنوان الـ discovery)، والـ solCode اشتغل زي ما هو بس على بورت ٦٠١٢ بدل ٤٧٥٠. Node 24 بيشغّل ملفات [[.ts]] على طول (بيشيل الأنواع)، فمحتجناش build.

---

## ١. الـ import

~~~ts
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
~~~

- [[createRemoteJWKSet]]: بتعمل «مصدر مفاتيح» من URL.
- [[jwtVerify]]: بتتحقق من التوكن.
- [[type JWTPayload]]: نوع TypeScript بس (شكل الـ claims القياسية زي [[iss]] و [[exp]])، وكلمة [[type]] بتقول إنه بيتشال وقت التشغيل.

---

## ٢. الـ discovery والمفاتيح، مرة واحدة

~~~ts
const discovery = await fetch("https://accounts.google.com/.well-known/openid-configuration").then((r) => r.json());
const JWKS = createRemoteJWKSet(new URL(discovery.jwks_uri));
~~~

- [[await]] على مستوى الـ module (برا أي دالة): مسموح في ES modules، والملف بيستنى الـ discovery قبل ما يكمّل. يعني بيتجاب **مرة** وقت تشغيل السيرفر.
- [[.then((r) => r.json())]]: الرد → JSON.
- [[new URL(...)]]: [[createRemoteJWKSet]] عايزة object من نوع URL مش نص.

[[JWKS]] هنا مش المفاتيح نفسها، ده **دالة** بتجيب المفاتيح أول ما تحتاجها وتكاشها. جرّبنا: عملنا ٥ تحققات ورا بعض وعدّينا الطلبات على [[/jwks]]:

~~~text الناتج
jwks hits 1
~~~

طلب واحد لكل التجارب. ولو حطيت [[createRemoteJWKSet]] جوه الدالة، كل login هيعمل كاش جديد ويجيب المفاتيح من الأول.

---

## ٣. نوع الـ claims

~~~ts
export type IdClaims = JWTPayload & { email?: string; email_verified?: boolean; name?: string; nonce?: string };
~~~

[[&]] في الأنواع معناها «الاتنين مع بعض»: الحقول القياسية + حقول جوجل. و [[?]] بعد الاسم: الحقل ممكن ميبقاش موجود. ده نوع للمحرر بس، مش تحقق: لو التوكن مفيهوش [[email]]، TypeScript مش هيعرف.

---

## ٤. الدالة و [[jwtVerify]]

~~~ts
export async function verifyIdToken(idToken: string, expectedNonce: string): Promise<IdClaims> {
  const { payload } = await jwtVerify<IdClaims>(idToken, JWKS, {
~~~

- [[Promise<IdClaims>]]: الدالة async، فبترجّع Promise لما يخلص يبقى فيه [[IdClaims]].
- [[jwtVerify<IdClaims>]]: الـ [[<...>]] بتقول لـ TypeScript شكل الـ payload اللي راجع.
- [[const { payload } =]]: [[jwtVerify]] بترجّع object فيه [[payload]] و [[protectedHeader]]، واحنا عايزين الأول بس.

والـ options، كل سطر فحص:

~~~ts
    issuer: [discovery.issuer, "accounts.google.com"],
    audience: config.GOOGLE_CLIENT_ID,
    algorithms: ["RS256"],
    clockTolerance: 30,
  });
~~~

| الخيار | بيفحص إيه | لو غلط |
|---|---|---|
| [[issuer]] | [[iss]] لازم يساوي واحدة من القيم دي بالظبط | [[ERR_JWT_CLAIM_VALIDATION_FAILED]] |
| [[audience]] | [[aud]] لازم يبقى الـ client_id بتاعنا | [[ERR_JWT_CLAIM_VALIDATION_FAILED]] |
| [[algorithms]] | الـ [[alg]] في الـ header لازم يبقى من القايمة | [[ERR_JOSE_ALG_NOT_ALLOWED]] |
| [[clockTolerance]] | سماح بالثواني في فحص [[exp]] و [[nbf]] | [[ERR_JWT_EXPIRED]] |

والتوقيع نفسه بيتفحص دايمًا: [[jwtVerify]] بتقرا [[kid]] من الـ header، وتطلب المفتاح ده من [[JWKS]]، وتتحقق بيه.

[[issuer]] هنا array لأن جوجل بتطلّع [[iss]] أحيانًا من غير [[https://]]، ووثايقها بتقول الشكلين صح.

---

## ٥. الـ nonce والرجوع

~~~ts
  if (!expectedNonce || payload.nonce !== expectedNonce) throw new Error("nonce mismatch");
  return payload;
}
~~~

[[!expectedNonce]] الأول: لو احنا نسينا نبعت nonce (فاضي أو [[undefined]])، والتوكن كمان مفيهوش، المقارنة [[undefined !== undefined]] هتطلع [[false]] وهيعدّي. السطر ده بيقفل الحالة دي. والـ nonce بالتفصيل في الدرس الجاي.

### المثال على IdP حقيقي محلي

الـ callback (الدرس الجاي) نادى [[verifyIdToken]] على توكن طالع من [[oidc-provider]]، ورجّعت:

~~~text الـ payload بعد التحقق
{"sub":"mona","email":"mona@acme.com","email_verified":true,"name":"Mona","nonce":"lfgW_2lpNsxY7qnP4Ldorw","aud":"my-client","exp":1791454049,"iat":1791450449,"iss":"http://localhost:6010"}
~~~

---

## ٦. الـ solCode: IdP مزيف و ٥ توكنات

### المفاتيح والـ JWKS

~~~ts
const { publicKey, privateKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256", use: "sig" };
http.createServer((req, res) => res.end(JSON.stringify({ keys: [jwk] }))).listen(4750);
~~~

- [[generateKeyPair("RS256")]]: مفتاح خاص (بيوقّع، بيفضل عند الـ IdP) ومفتاح عام (بيتحقق، بيتنشر).
- [[exportJWK(publicKey)]]: بيحوّل العام لـ JSON (فيه [[n]] و [[e]]، أرقام الـ RSA).
- [[{ ...x, kid: "k1" }]]: الـ [[...]] (spread) بتنسخ كل حقول الـ object، وبعدين بنضيف [[kid]] و [[alg]] و [[use]]. ده نفس شكل اللي شفناه عند جوجل.
- السيرفر بيرد بـ [[{ keys: [jwk] }]] على أي مسار: JWKS فيه مفتاح واحد.

### دالة توقيع مشتركة

~~~ts
const base = (aud = "my-client") => new SignJWT({ nonce: "n1" }).setIssuer(ISS).setAudience(aud).setSubject("u1");
~~~

[[SignJWT]] بتبني توكن: الـ object الأولاني claims، وكل [[.setX]] بيضيف claim. و [[aud = "my-client"]] قيمة افتراضية: [[base()]] صح، و [[base("other")]] لتطبيق تاني.

### الـ ٥ حالات

| الحالة | اتعمل إزاي |
|---|---|
| [[ok]] | [[alg: RS256]] و [[kid: k1]] وبالمفتاح الخاص الصح، وبيخلص بعد ٥ دقايق |
| [[wrongAud]] | [[base("other")]] |
| [[otherKey]] | نفس [[kid: k1]] بس متوقّع بمفتاح خاص **تاني** اتولّد ساعتها |
| [[hs256]] | [[alg: HS256]] بسر نصي ٣٢ حرف (HMAC، مش RSA) |
| [[expired]] | [[exp]] من دقيقتين ([[Date.now() / 1000 - 120]]) |

### اللفة

~~~ts
for (const [name, t] of Object.entries(cases)) {
  try { await verify(t); console.log(name, "OK"); } catch (e) { console.log(name, e.code); }
}
~~~

[[Object.entries]] بتحوّل الـ object لأزواج [[[name, token]]]. وطبعنا كمان [[e.message]] جنب الكود:

~~~text الناتج
ok OK
wrongAud ERR_JWT_CLAIM_VALIDATION_FAILED | unexpected "aud" claim value
otherKey ERR_JWS_SIGNATURE_VERIFICATION_FAILED | signature verification failed
hs256 ERR_JOSE_ALG_NOT_ALLOWED | "alg" (Algorithm) Header Parameter value not allowed
expired ERR_JWT_EXPIRED | "exp" claim timestamp check failed
jwks hits 1
~~~

- [[otherKey]]: الـ [[kid]] موجود، فالمكتبة جابت المفتاح، بس الحسبة مطلعتش. ده اللي بيحصل لو حد زوّر توكن.
- [[hs256]]: اترفض قبل أي حسبة، من [[algorithms]]. من غير القايمة دي فيه مكتبات قديمة كانت بتستخدم المفتاح العام كسر HMAC، وده هجوم معروف (alg confusion).
- [[expired]]: دقيقتين أكبر من الـ ٣٠ ثانية سماح.

### توكن بـ [[kid]] مش موجود

جرّبنا كمان توكن بـ [[kid: "k9"]]:

~~~text الناتج
unknownKid ERR_JWKS_NO_MATCHING_KEY | no applicable key found in the JSON Web Key Set
jwks hits 1
~~~

العداد فضل ١: المكتبة مرجعتش تجيب المفاتيح لأن آخر جلب كان من أقل من ٣٠ ثانية ([[cooldownDuration]]). ده اللي بيمنع حد يبعتلك توكنات بـ kid عشوائي عشان تضرب الـ IdP.

### فخ لقيناه: نفس الـ kid بمفتاح جديد

لما عملنا restart للـ IdP المحلي، ولّد مفتاح جديد بنفس الاسم [[k1]]، والتطبيق كان لسه مكاش القديم: التوكنات الجديدة طلعت [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]] لحد ما التطبيق اتعمله restart، لأن الـ [[kid]] لاقى مفتاح (القديم) فمفيش سبب يعيد الجلب. عشان كده الـ IdPs الحقيقية بتدّي كل مفتاح جديد [[kid]] جديد.

---

## الخلاصة

| الفحص | الخيار | الكود لو فشل |
|---|---|---|
| التوقيع | [[JWKS]] بالـ [[kid]] | [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]] |
| [[kid]] مش موجود | (تلقائي) | [[ERR_JWKS_NO_MATCHING_KEY]] |
| [[alg]] | [[algorithms]] | [[ERR_JOSE_ALG_NOT_ALLOWED]] |
| [[iss]] و [[aud]] | [[issuer]] و [[audience]] | [[ERR_JWT_CLAIM_VALIDATION_FAILED]] |
| [[exp]] | [[clockTolerance]] | [[ERR_JWT_EXPIRED]] |
| [[nonce]] | بإيدك بعد [[jwtVerify]] | [[nonce mismatch]] |

- [[createRemoteJWKSet]] مرة واحدة برا الدالة.
- decode بس = مفيش أمان. لازم [[jwtVerify]] بالأربع خيارات.
- سجّل [[e.code]] في الـ logs، ورد على المستخدم برسالة عامة.`,
          lines: [
            "الدوال اللي محتاجينها من jose.",
            "هات الـ discovery مرة وقت التشغيل.",
            "مصدر المفاتيح: بيجيبها ويكاشها، ويعيد جلبها لو ظهر kid جديد. مرة واحدة للـ module كله.",
            "شكل الـ claims اللي متوقعينها.",
            "دالة التحقق: التوكن والـ nonce اللي احنا بعتناه.",
            "اتحقق من التوقيع والـ claims:",
            "الـ issuer: جوجل بتستخدم الشكلين، فالاتنين مقبولين، وأي حاجة تانية لأ.",
            "الـ audience: التوكن لازم يكون معمول لتطبيقنا احنا.",
            "RS256 بس. أي alg تاني (HS256 أو none) مرفوض.",
            "سماح ٣٠ ثانية لفرق الساعة.",
            "قفلة.",
            "الـ nonce لازم يطابق اللي بعتناه في طلب الدخول ده بالظبط.",
            "رجّع الـ claims بعد ما اتأكدنا من كل حاجة.",
            "قفلة."
          ],
          sol: R`التوكن السليم بيعدّي ويرجّع الـ claims. والباقي بيترفض كده:

aud غلط: [[ERR_JWT_CLAIM_VALIDATION_FAILED]] و [[unexpected "aud" claim value]].
مفتاح تاني: [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]].
HS256: [[ERR_JOSE_ALG_NOT_ALLOWED]]، من غير ما يحاول يتحقق أصلًا.
منتهي (exp من دقيقتين، أكبر من الـ ٣٠ ثانية سماح): [[ERR_JWT_EXPIRED]].

ولو عدّيت عداد على [[/jwks]]، هتلاقيه اتنادى مرة واحدة لكل التجارب، لأن الـ JWKS متكاش. لو توكن بـ kid مش موجود، هيعيد الجلب مرة (لو فات ٣٠ ثانية على آخر جلب) وبعدين يرفض.`,
          solCode: R`import http from "node:http";
import { generateKeyPair, exportJWK, SignJWT, createRemoteJWKSet, jwtVerify } from "jose";
const { publicKey, privateKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256", use: "sig" };
const ISS = "http://localhost:4750";
http.createServer((req, res) => res.end(JSON.stringify({ keys: [jwk] }))).listen(4750);
const JWKS = createRemoteJWKSet(new URL(ISS + "/jwks"));
const verify = (t) => jwtVerify(t, JWKS, { issuer: ISS, audience: "my-client", algorithms: ["RS256"], clockTolerance: 30 });
const base = (aud = "my-client") => new SignJWT({ nonce: "n1" }).setIssuer(ISS).setAudience(aud).setSubject("u1");
const cases = {
  ok: await base().setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime("5m").sign(privateKey),
  wrongAud: await base("other").setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime("5m").sign(privateKey),
  otherKey: await base().setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime("5m").sign((await generateKeyPair("RS256")).privateKey),
  hs256: await base().setProtectedHeader({ alg: "HS256" }).setExpirationTime("5m").sign(new TextEncoder().encode("x".repeat(32))),
  expired: await base().setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime(Math.floor(Date.now() / 1000) - 120).sign(privateKey),
};
for (const [name, t] of Object.entries(cases)) {
  try { await verify(t); console.log(name, "OK"); } catch (e) { console.log(name, e.code); }
}
process.exit(0);`
        },
        {
          cmd: "id_token و nonce",
          title: "الـ callback كامل: من الـ code لحد الـ session",
          desc: R`[[nonce]] قيمة عشوائية بتعملها مع كل محاولة دخول، وتبعتها في رابط الدخول جنب [[state]] (الـ state والـ PKCE في درس [[OAuth]] في تاب «بناء مشروع كامل»)، وتحفظها في كوكي. الـ IdP بيحطها جوه الـ id_token. ولما يرجع، لازم تلاقيها هي هي.

الـ state بيحمي الـ callback من CSRF، والـ nonce بيربط الـ id_token نفسه بالمحاولة دي، فتوكن اتسرق من محاولة تانية ميتقبلش. والمثال الـ callback كامل: قارن الـ state، وبدّل الـ code، واتحقق من الـ id_token (الدرس اللي فات)، واعمل session.`,
          example: R`router.get("/auth/google/callback", async (req, res) => {
  const saved = req.signedCookies.oidc ? JSON.parse(req.signedCookies.oidc) : null;
  res.clearCookie("oidc");
  if (!saved || typeof req.query.code !== "string" || req.query.state !== saved.state) return res.status(400).send("Invalid login attempt");
  const tokenRes = await fetch(discovery.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code: req.query.code, redirect_uri: config.GOOGLE_REDIRECT_URI, client_id: config.GOOGLE_CLIENT_ID, client_secret: config.GOOGLE_CLIENT_SECRET, code_verifier: saved.verifier }),
  });
  if (!tokenRes.ok) return res.status(401).send("Login failed");
  const { id_token } = await tokenRes.json();
  const claims = await verifyIdToken(id_token, saved.nonce);
  if (claims.email_verified !== true) return res.status(403).send("Email not verified");
  const user = await upsertUserFromProvider({ provider: "google", subject: claims.sub!, email: claims.email!, name: claims.name });
  await startSession(res, user.id);
  res.redirect("/");
});`,
          try: R`كمّل على IdP المزيف من الدرس اللي فات: ضيف [[/token]] بيرجّع id_token فيه الـ nonce اللي جاله. جرّب الـ callback مرة سليم، ومرة الـ IdP بيرجّع nonce تاني، ومرة الـ state في الـ URL مختلف عن الكوكي. وبعدين حاول تفتح نفس لينك الـ callback مرتين.`,
          flag: "script",
          deep: {
            why: "الـ callback هو المكان اللي بيتقرر فيه «الشخص ده هو مين» في السيستم بتاعك. كل خطوة ناقصة فيه ثغرة معروفة: من غير state = login CSRF، ومن غير nonce = replay لـ id_token قديم، ومن غير تحقق من email_verified = حد يعمل حساب عند IdP بإيميلك ويدخل على حسابك.",
            how: R`الكوكي: [[state]] و [[nonce]] و [[verifier]] (PKCE) اتحفظوا في كوكي httpOnly عمرها ١٠ دقايق لحظة ما المستخدم داس «ادخل بجوجل». [[signed: true]] مع [[cookie-parser]] بسر بيخلي الكوكي متتعدلش. وأول حاجة في الـ callback: امسح الكوكي، عشان نفس المحاولة متتعادش (فتح اللينك مرتين يفشل التانية).

[[sub]] هو هوية المستخدم الثابتة عند الـ IdP، مش الإيميل. الإيميل بيتغير، وممكن حساب جديد ياخد إيميل قديم. فالربط في جدول الـ accounts بـ [[(provider, sub)]]، والإيميل معلومة جنبه.

تبديل الـ code: POST للـ [[token_endpoint]] من السيرفر، فيه الـ client_secret (مبيروحش للمتصفح أبدًا) والـ [[code_verifier]]. الرد فيه [[id_token]] و [[access_token]] (لو محتاج تكلّم APIs جوجل باسم المستخدم) وأحيانًا [[refresh_token]]. لو مش محتاج الـ access token، متخزّنهوش.

لما الـ id_token جاي مباشرة من الـ token endpoint على HTTPS، المواصفة بتقول التحقق من التوقيع ممكن يتجاوز. بس التحقق الكامل بـ jose مش مكلّف، وبيحميك لو حد غيّر الكود بعدين ونقل الـ id_token لمسار تاني (زي تطبيق موبايل بيبعته لك).

[[email_verified]]: لو هتربط بحساب موجود بالإيميل، لازم الإيميل يبقى متأكد عند الـ IdP، وكمان عندك (الفخ اللي في درس [[OAuth]] في «بناء مشروع كامل»).

بعد كل ده بتعمل الـ session بتاعتك العادية (كوكي، أو access + refresh). الـ id_token نفسه مش session ومتبعتهوش للفرونت يستخدمه كـ Bearer.

وفي الإنتاج: مكتبة زي [[openid-client]] (بتاعة نفس مؤلف jose) أو Auth.js أو Better Auth بتعمل الخطوات دي. المثال ده عشان لما حاجة تبوظ تعرف فين.`,
            when: "أي «ادخل بـ ...». ونفس الـ callback لأي IdP OIDC، بس بالـ discovery والـ client بتوعه.",
            mistakes: R`الإيميل هو المفتاح بدل sub. ومتمسحش الكوكي فالـ callback يتفتح مرتين. وتقارن الـ state من غير ما تتأكد إن الكوكي موجودة ([[undefined === undefined]] = true!). والـ nonce في localStorage أو في الـ URL. ورسايل خطأ مفصّلة للمستخدم («الـ nonce مش مطابق») بدل رسالة عامة و log مفصّل.`
          },
          teach: R`## الـ callback: ٥ خطوات بالترتيب

لما المستخدم يدخل عند الـ IdP، الـ IdP بيرجّعه على الـ callback بتاعك ومعاه [[code]] و [[state]] في الـ URL. الـ route ده بيعمل ٥ حاجات بالترتيب: يتأكد إن المحاولة دي بتاعتنا (الكوكي والـ state)، ويبدّل الـ code بتوكنات، ويتحقق من الـ id_token والـ nonce، ويتأكد من الإيميل، ويعمل session.

اتجرّب على ويندوز 11: Express 5.2.1 و [[cookie-parser]] 1.4.7 و [[jose]] 6.2 على Node 24.19 (بورت ٦٠١١)، قدام IdP حقيقي محلي ([[oidc-provider]] 9.12 على ٦٠١٠، مكان جوجل). والـ callback منسوخ زي ما هو، ومعاه route بداية بيعمل الـ state والـ nonce والـ PKCE ويحطهم في الكوكي، و «متصفح» صغير بـ [[fetch]] بيتبع الـ redirects ويملا فورم الدخول بتاع الـ IdP.

---

## الرحلة كاملة قبل الكود

~~~text اللي حصل في التجربة (كل سطر طلب)
GET  localhost:6011/auth/google/start          -> 302  localhost:6010/auth?client_id=my-client&...&state=...&nonce=...&code_challenge=...
GET  localhost:6010/auth?...                    -> 303  /interaction/IvZQ...   (صفحة الدخول)
POST localhost:6010/interaction/IvZQ...         -> 303  (اسم المستخدم اتبعت)
GET  localhost:6010/interaction/qm1b...         -> 200  (صفحة الموافقة)
POST localhost:6010/interaction/qm1b...         -> 303
GET  localhost:6010/auth/qm1b...                -> 303  localhost:6011/auth/google/callback?code=wQdB...&state=YRnl...&iss=...
GET  localhost:6011/auth/google/callback?...    -> 302  /
GET  localhost:6011/                            -> 200  home, sid=session-for-u1
~~~

الكود اللي في المثال هو السطر قبل الأخير بس. والـ [[iss]] اللي في آخر الـ URL، الـ IdP بيبعته عشان تتأكد إن الرد جاي من الـ IdP اللي بعتّله (RFC 9207). جوجل مش بتبعته، فالمثال مش بيعتمد عليه.

---

## ١. الكوكي

~~~ts
router.get("/auth/google/callback", async (req, res) => {
  const saved = req.signedCookies.oidc ? JSON.parse(req.signedCookies.oidc) : null;
  res.clearCookie("oidc");
~~~

- [[router.get(path, async (req, res) => {...})]]: route بيستقبل GET. وفي Express 5 لو الدالة الـ async رمت error، Express بيوصّله للـ error handler لوحده (في Express 4 كان بيضيع).
- [[req.signedCookies]]: [[cookie-parser]] بسر ([[cookieParser("secret")]]) بيحط هنا الكوكيز الموقّعة **بعد** ما يتأكد من التوقيع. لو حد عدّل الكوكي، قيمتها بتبقى [[false]]، فمش هتعدّي.
- [[a ? b : null]]: لو الكوكي موجودة اعمل parse، لو لأ [[null]].
- [[res.clearCookie("oidc")]]: امسحها على طول، قبل أي فحص. المحاولة دي تتستخدم مرة.

شكل الكوكي في المتصفح ([[s:]] معناها signed، وبعد آخر نقطة التوقيع):

~~~text الكوكي
oidc=s:{"state":"cUMdr1dMc2gbHTyEx4zqxQ","nonce":"UVZCZ1Z9l-wmkx2...","verifier":"..."}.<توقيع>
~~~

---

## ٢. الفحص الأول: من غير ما نكلّم الـ IdP

~~~ts
  if (!saved || typeof req.query.code !== "string" || req.query.state !== saved.state) return res.status(400).send("Invalid login attempt");
~~~

تلات شروط، أي واحد فيهم = 400:

1. [[!saved]]: مفيش كوكي. لازم ده الأول: من غيره [[req.query.state !== saved.state]] هيرمي، ولو [[saved]] كان [[{}]] المقارنة [[undefined === undefined]] تعدّي.
2. [[typeof req.query.code !== "string"]]: [[req.query]] ممكن يبقى array لو حد كتب [[?code=a&code=b]]، فبنتأكد إنه نص واحد.
3. الـ state مختلف: ده الـ CSRF. حد بيحاول يدخّلك بحسابه هو.

جرّبنا نغيّر [[state]] في الـ URL:

~~~text الناتج
GET localhost:6011/auth/google/callback?code=umlI...&state=attacker&iss... -> 400
Invalid login attempt
~~~

---

## ٣. تبديل الـ code بتوكنات

~~~ts
  const tokenRes = await fetch(discovery.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code: req.query.code, redirect_uri: config.GOOGLE_REDIRECT_URI, client_id: config.GOOGLE_CLIENT_ID, client_secret: config.GOOGLE_CLIENT_SECRET, code_verifier: saved.verifier }),
  });
~~~

- [[discovery.token_endpoint]]: من الـ discovery (أول درس في الكاتيجوري).
- [[x-www-form-urlencoded]]: المواصفة بتقول الطلب ده form زي فورم HTML ([[a=1&b=2]])، مش JSON.
- [[new URLSearchParams({...})]]: بيحوّل الـ object لنص form، وبيعمل encode للرموز، و [[fetch]] بيبعته كـ body.

| الحقل | ليه |
|---|---|
| [[grant_type: authorization_code]] | نوع العملية: «معايا code» |
| [[code]] | اللي رجع في الـ URL |
| [[redirect_uri]] | لازم نفس اللي في طلب الدخول بالحرف، وإلا الـ IdP يرفض |
| [[client_id]] و [[client_secret]] | هوية التطبيق. السر من السيرفر بس |
| [[code_verifier]] | PKCE: الـ IdP بيحسب SHA-256 ليه ويقارنه بالـ [[code_challenge]] اللي اتبعت في البداية |

~~~ts
  if (!tokenRes.ok) return res.status(401).send("Login failed");
  const { id_token } = await tokenRes.json();
~~~

[[tokenRes.ok]] بيبقى [[true]] لو الـ status من 200 لـ 299. الرد الناجح كان فيه:

~~~text مفاتيح الرد
[ 'access_token', 'expires_in', 'id_token', 'scope', 'token_type' ]   Bearer 3600 openid email profile
~~~

وبعتنا نفس الـ code مرة تانية للـ token endpoint بإيدنا:

~~~text الناتج
400 {"error":"invalid_grant","error_description":"grant request is invalid"}
~~~

الـ code بيتستخدم مرة واحدة. فلو حد سرقه بعد ما انت استخدمته، ملوش لازمة.

---

## ٤. التحقق من الـ id_token والـ nonce

~~~ts
  const claims = await verifyIdToken(id_token, saved.nonce);
~~~

[[verifyIdToken]] من الدرس اللي فات: التوقيع و [[iss]] و [[aud]] و [[exp]]، وبعدين الـ nonce مقابل اللي في **الكوكي**. الـ IdP بيحط في التوكن الـ nonce اللي جاله في رابط الدخول بالظبط.

جرّبنا نخلي رابط الدخول يبعت [[other-nonce]] والكوكي فيها الأصلي (كأن التوكن ده من محاولة تانية):

~~~text الناتج
500 Internal Server Error
~~~

وفي لوج السيرفر: [[ERROR nonce mismatch]]. الـ error وصل للـ error handler العام (Express 5)، فرجع 500. الأحسن تمسكه ([[try/catch]]) وترجّع 401 برسالة عامة، والسبب يتسجّل في اللوج بس.

---

## ٥. الإيميل والمستخدم والـ session

~~~ts
  if (claims.email_verified !== true) return res.status(403).send("Email not verified");
~~~

[[!== true]] مش [[!claims.email_verified]]: بنقبل [[true]] بس، مش [["true"]] كنص ولا أي قيمة truthy.

ودي حصلت فعلًا في التجربة: أول مرة الـ IdP المحلي مكانش بيحط [[email]] في الـ id_token (إعداد [[conformIdTokenClaims]] الافتراضي في [[oidc-provider]] بيحطهم في [[userinfo]] بس)، فالحقل كان [[undefined]] والرد كان [[403 Email not verified]]. الكود رفض لأنه مش متأكد، وده الصح. جوجل بتحط [[email]] و [[email_verified]] في الـ id_token لو طلبت scope [[email]].

~~~ts
  const user = await upsertUserFromProvider({ provider: "google", subject: claims.sub!, email: claims.email!, name: claims.name });
  await startSession(res, user.id);
  res.redirect("/");
});
~~~

- [[claims.sub!]]: الـ [[!]] في TypeScript (non-null assertion) معناها «أنا متأكد إنه مش [[undefined]]». مالهاش أي أثر وقت التشغيل.
- [[upsert]] = update لو موجود، insert لو لأ. والمفتاح [[(provider, sub)]]، مش الإيميل.
- [[startSession]]: الـ session بتاعتك (كوكي [[sid]] في التجربة). الـ id_token نفسه بيترمي بعد كده.
- [[res.redirect("/")]]: 302 للصفحة الرئيسية.

~~~text الناتج (الدخول السليم)
GET localhost:6011/auth/google/callback?code=j82E...&state=e_tc... -> 302 /
GET localhost:6011/ -> 200
home, sid=session-for-u1
~~~

---

## ٦. فتح نفس اللينك مرتين

~~~text الناتج
GET localhost:6011/auth/google/callback?code=P9W7...&state=uTX1... -> 302 /
GET localhost:6011/auth/google/callback?code=P9W7...&state=uTX1... -> 400
Invalid login attempt
~~~

المرة التانية: الكوكي اتمسحت في الأولى، فـ [[!saved]] رجّع 400 من غير ما نكلّم الـ IdP.

---

## الخلاصة

| الحالة | فين اتمسكت | الرد |
|---|---|---|
| مفيش كوكي، أو state مختلف، أو code مش نص | السطر الرابع | [[400]] |
| الـ code مستخدم أو الـ verifier غلط | الـ IdP ([[invalid_grant]]) | [[401]] |
| توقيع أو [[aud]] أو [[exp]] غلط | [[verifyIdToken]] | error (الأحسن 401) |
| nonce مختلف | [[verifyIdToken]] | error (الأحسن 401) |
| الإيميل مش متأكد أو مش موجود | [[email_verified !== true]] | [[403]] |
| كله تمام | session و redirect | [[302]] |

- امسح الكوكي أول حاجة: المحاولة تتستخدم مرة.
- [[state]] ضد CSRF على الـ callback، و [[nonce]] بيربط التوكن نفسه بالمحاولة.
- المستخدم بـ [[(provider, sub)]]، مش بالإيميل.`,
          lines: [
            "الـ callback اللي الـ IdP بيرجّع عليه.",
            "هات state و nonce و verifier من الكوكي الموقّعة (لو مش موجودة يبقى null).",
            "امسحها فورًا: المحاولة دي تتستخدم مرة واحدة بس.",
            "مفيش كوكي، أو مفيش code، أو الـ state مختلف: ارفض.",
            "بدّل الـ code بـ tokens...",
            "...POST...",
            "...form مش JSON (المواصفة كده)...",
            "...ومعاه الـ redirect_uri نفسه، والـ client secret (من السيرفر بس)، والـ verifier بتاع PKCE.",
            "قفلة.",
            "الـ IdP رفض (code مستخدم أو منتهي، أو verifier غلط): فشل عام.",
            "خد الـ id_token.",
            "اتحقق منه كامل، ومعاه الـ nonce اللي في الكوكي.",
            "الإيميل مش متأكد عند الـ IdP: متربطهوش بحاجة.",
            "لاقي أو اعمل المستخدم بـ (provider, sub)، مش بالإيميل.",
            "ابدأ الـ session بتاعتك العادية.",
            "رجّعه للموقع.",
            "قفلة."
          ],
          sol: R`السليم: بيعمل session ويعمل redirect لـ [[/]] (302).

nonce مختلف: [[verifyIdToken]] بيرمي [[nonce mismatch]]، والطلب بيطلع 500 لو مفيش error handler. الأصح تمسكه وترجّع 401 برسالة عامة وتسجّل السبب. ده معناه إن الـ id_token ده مش بتاع المحاولة دي.

state مختلف: 400 من السطر الرابع، من غير ما تكلّم الـ IdP خالص.

فتح اللينك مرتين: التانية بتطلع 400 لأن الكوكي اتمسحت في الأولى. ولو كانت الكوكي فضلت، الـ IdP نفسه كان هيرفض الـ code (بيتستخدم مرة واحدة)، فكنت هتاخد 401.`
        },
        {
          cmd: "client credentials",
          title: "خدمة بتكلّم خدمة من غير مستخدم",
          desc: R`مش كل طلب وراه مستخدم. خدمة الفواتير بتكلّم خدمة الطلبات كل ساعة، أو cron job بيكلّم API شريك. هنا بيتستخدم grant اسمه [[client_credentials]]: الخدمة بتبعت الـ client_id والـ secret بتوعها للـ token endpoint، وتاخد access token بصلاحيات محددة (scopes)، وتستخدمه كـ Bearer لحد ما يخلص.

مفيش redirect ولا متصفح ولا id_token، لأن مفيش «مين المستخدم». والتوكن بيتكاش لحد قبل ما يخلص بشوية.`,
          example: R`let cached: { token: string; expiresAt: number } | null = null;
export async function getServiceToken(): Promise<string> {
  if (cached && cached.expiresAt - 60_000 > Date.now()) return cached.token;
  const basic = Buffer.from($__bt$__{encodeURIComponent(config.CLIENT_ID)}:$__{encodeURIComponent(config.CLIENT_SECRET)}$__bt).toString("base64");
  const res = await fetch(config.TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: $__btBasic $__{basic}$__bt },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "invoices:write" }),
  });
  if (!res.ok) throw new Error($__bttoken endpoint $__{res.status}: $__{await res.text()}$__bt);
  const { access_token, expires_in } = await res.json();
  cached = { token: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}
const res = await fetch("https://billing.internal/v1/invoices", { method: "POST", headers: { Authorization: $__btBearer $__{await getServiceToken()}$__bt, "Content-Type": "application/json" }, body: JSON.stringify(invoice) });`,
          try: R`اعمل token endpoint مزيف بيتأكد من Basic auth و [[grant_type]]، ويرجّع توكن رقمه بيزيد مع كل طلب و [[expires_in: 3600]]. نادي [[getServiceToken()]] مرتين ورا بعض واطبع عدد التوكنات اللي اتعملت. وبعدين نادي ١٠ مرات مع بعض بـ [[Promise.all]] من أول مرة، وعدّ تاني.`,
          flag: "script",
          deep: {
            why: "البديل الشائع API key ثابت بين الخدمات مبيخلصش ومحدش بيغيّره، ولو اتسرب من log واحد الخدمة مكشوفة للأبد. client credentials بيدّي توكن عمره دقايق، بـ scopes محددة، والـ IdP بيسجّل مين طلب إيه، وتقدر تقفل خدمة واحدة من مكان واحد.",
            how: R`الطلب: POST للـ [[token_endpoint]] (من الـ discovery)، form-encoded، و [[grant_type=client_credentials]]، و scopes. والـ client بيعرّف نفسه بـ HTTP Basic (الـ id والـ secret متعمل لهم URL-encode، دي تفصيلة في المواصفة بتفرق لو فيهم رموز). وفيه IdPs بتقبلهم في الـ body كمان. والأقوى من الـ secret: [[private_key_jwt]] (الخدمة بتوقّع JWT بمفتاح خاص بدل ما تبعت سر) أو mTLS، ودول منتشرين في البنوك وفي الشركات الكبيرة.

الرد: [[access_token]] و [[expires_in]] بالثواني. غالبًا JWT، والـ API اللي بيستقبله بيتحقق منه بـ jose والـ JWKS بتاع الـ IdP (الدرس اللي فات بالظبط)، بس الـ [[audience]] بيبقى معرّف الـ API (زي [[https://billing.internal]])، ويتأكد من الـ [[scope]]. مفيش [[sub]] لمستخدم، الـ sub هو الخدمة نفسها أو الـ client_id.

الكاش: متطلبش توكن لكل request، الـ IdP عنده rate limit. خزّنه لحد قبل الانتهاء بدقيقة (عشان ميخلصش وهو في النص). ولو فيه طلبات كتير في نفس اللحظة والتوكن مش موجود، كلهم هيطلبوا توكن مع بعض. الحل تخزّن الـ Promise نفسه مش النتيجة، فكل اللي جم في نفس الوقت يستنوا نفس الطلب.

ولو الـ API رد 401، امسح الكاش واطلب توكن جديد مرة واحدة (ممكن الـ IdP لغاه قبل ميعاده).

فين الـ secret؟ في secret manager أو env على السيرفر، ويتغير دوريًا. وفي Kubernetes و Cloud فيه workload identity: المنصة نفسها بتدّي الخدمة هوية من غير secret خالص (تاب «Cloud و DevOps»).`,
            when: "أي خدمة بتكلّم خدمة من غير مستخدم: cron، و workers، و microservices، و B2B integrations. ولو فيه مستخدم، مرر هويته (أو استخدم token exchange) بدل ما الخدمة تشتغل بصلاحياتها هي.",
            mistakes: R`الـ secret في الكود أو في الفرونت (ده للسيرفر بس، دايمًا). وتطلب توكن مع كل request. وكاش بيرجّع توكن هيخلص بعد ثانية. و scopes واسعة ([[*]]) لكل خدمة. والـ API اللي بيستقبل بيتحقق من التوقيع بس ومش بيبص على aud و scope، فتوكن معمول لخدمة تانية يعدّي.`
          },
          teach: R`## توكن للخدمة نفسها، متكاش لحد قبل ما يخلص

[[getServiceToken]] بترجّع access token صالح للخدمة دي (مش لمستخدم). لو عندها واحد في الذاكرة لسه قدامه أكتر من دقيقة، بترجّعه على طول. لو لأ، بتطلب واحد جديد من الـ token endpoint بالـ client_id والـ secret بتوعها، وتخزّنه. والسطر الأخير استخدامه في طلب لخدمة تانية.

اتجرّب على ويندوز 11، Node 24.19: مرة قدام IdP حقيقي محلي ([[oidc-provider]] 9.12 على بورت ٦٠١٠، فيه client اسمه [[billing-cron]] بسر فيه رموز [[svc-secret+/=]] عشان نشوف أثر الـ encode)، ومرة قدام token endpoint مزيف على ٦٠١٣ بيعدّ التوكنات (عشان الـ try). إعداد الـ client في لوحة Auth0 أو Entra أو Okta نفسها من الـ docs بتاعتهم، مش متجرّب هنا.

---

## ١. الكاش

~~~ts
let cached: { token: string; expiresAt: number } | null = null;
~~~

متغير على مستوى الـ module: بيعيش طول ما الـ process شغالة. نوعه يا object فيه التوكن ووقت انتهاؤه بالملّي ثانية، يا [[null]] (لسه مفيش). و [[|]] في الأنواع معناها «يا ده يا ده».

~~~ts
export async function getServiceToken(): Promise<string> {
  if (cached && cached.expiresAt - 60_000 > Date.now()) return cached.token;
~~~

- [[60_000]]: نفس [[60000]]، والـ [[_]] بس عشان القراية. يعني دقيقة.
- [[cached.expiresAt - 60_000 > Date.now()]]: «لو لسه فاضل أكتر من دقيقة». ليه مش لحد آخر لحظة؟ عشان التوكن ميخلصش وهو في الطريق للخدمة التانية.

---

## ٢. هوية الخدمة: HTTP Basic

~~~ts
  const basic = Buffer.from($__bt$__{encodeURIComponent(config.CLIENT_ID)}:$__{encodeURIComponent(config.CLIENT_SECRET)}$__bt).toString("base64");
~~~

من جوه لبرة:

| الحتة | بتعمل إيه | الناتج في التجربة |
|---|---|---|
| [[encodeURIComponent(secret)]] | أي رمز بيتحوّل لـ [[%XX]] (المواصفة OAuth بتطلب ده قبل الـ Basic) | [[svc-secret%2B%2F%3D]] |
| [[id:secret]] | الاتنين بنقطتين بينهم | [[billing-cron:svc-secret%2B%2F%3D]] |
| [[Buffer.from(...).toString("base64")]] | base64 | [[YmlsbGluZy1jcm9uOnN2Yy1zZWNyZXQlMkIlMkYlM0Q=]] |

> base64 مش تشفير. أي حد يشوف الـ header يفكه. عشان كده HTTPS إجباري.

وجرّبنا من غير [[encodeURIComponent]] بنفس السر:

~~~text الناتج
no encodeURIComponent: 401 {"error":"invalid_client","error_description":"client authentication failed"}
~~~

الـ IdP عمل decode للـ [[+]] فبقت مسافة، فالسر مبقاش هو. التفصيلة دي بتوقع ناس كتير لما السر فيه [[+]] أو [[/]] أو [[:]].

---

## ٣. الطلب

~~~ts
  const res = await fetch(config.TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: $__btBasic $__{basic}$__bt },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "invoices:write" }),
  });
~~~

- form-encoded زي أي طلب للـ token endpoint.
- [[Authorization: Basic ...]]: هوية الخدمة.
- [[grant_type: client_credentials]]: «انا الخدمة نفسها، مفيش مستخدم».
- [[scope: invoices:write]]: الصلاحية اللي محتاجها بس.

نفس الطلب من curl (عشان تشوفه من غير كود): [[-u]] بيعمل الـ Basic header لوحده، و [[-d]] بيبعت form:

~~~bash
curl -s -u 'billing-cron:svc-secret%2B%2F%3D' -d grant_type=client_credentials -d scope=invoices:write localhost:6010/token
curl -s -u 'billing-cron:wrong' -d grant_type=client_credentials -d scope=invoices:write localhost:6010/token
~~~

~~~text الناتج
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6ImsxIn0.eyJqdGkiOi...","expires_in":3600,"token_type":"Bearer"}
{"error":"invalid_client","error_description":"client authentication failed"}
~~~

---

## ٤. الرد والتخزين

~~~ts
  if (!res.ok) throw new Error($__bttoken endpoint $__{res.status}: $__{await res.text()}$__bt);
  const { access_token, expires_in } = await res.json();
  cached = { token: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}
~~~

- الرفض بيترمي بالتفاصيل: ده لوج سيرفر، مفيش مستخدم هيشوفه.
- [[expires_in]] بالثواني ([[3600]] = ساعة)، و [[Date.now()]] بالملّي، عشان كده [[* 1000]].

### التوكن نفسه من جوه

شغّلنا الدالة قدام الـ IdP المحلي وفكّينا التوكن:

~~~text الناتج
header { alg: 'RS256', typ: 'at+jwt', kid: 'k1' }
payload {
  jti: 'BMVgbX--Vl0iOwF8xtq41bvMDg6t6coLdFalG2aAkyO',
  sub: 'billing-cron',
  iat: 1791450488,
  exp: 1791454088,
  scope: 'invoices:write',
  client_id: 'billing-cron',
  iss: 'http://localhost:6010',
  aud: 'https://billing.internal'
}
second call same token: true
~~~

- [[typ: at+jwt]]: نوع «access token» (RFC 9068)، عشان محدش يستخدم id_token مكانه.
- [[sub]] هو الخدمة نفسها، ومفيش email ولا name.
- [[aud]]: الـ API اللي التوكن معمول له.
- النداء التاني رجّع نفس التوكن من الكاش.

وفي خدمة الفواتير، التحقق بـ jose زي الدرس اللي فات بالظبط، بس الـ audience اسم الـ API:

~~~ts
await jwtVerify(t, JWKS, { issuer: "http://localhost:6010", audience: "https://billing.internal", algorithms: ["RS256"] });
~~~

~~~text الناتج
verified, scope = invoices:write
other API: ERR_JWT_CLAIM_VALIDATION_FAILED unexpected "aud" claim value
~~~

التوكن ده لو اتبعت لخدمة الطلبات ([[https://orders.internal]]) بيترفض. وكمان لازم الخدمة تبص على [[scope]] قبل ما تنفّذ.

وحاجة تانية لاحظناها: لما طلبنا [[scope=admin]] (مش مسموح للـ client)، الـ IdP مرفضش، رجّع توكن من غير [[scope]] خالص. فمتفترضش إن الرد فيه اللي طلبته: الخدمة اللي بتستقبل هي اللي لازم تفحص.

---

## ٥. الاستخدام

~~~ts
const res = await fetch("https://billing.internal/v1/invoices", { method: "POST", headers: { Authorization: $__btBearer $__{await getServiceToken()}$__bt, "Content-Type": "application/json" }, body: JSON.stringify(invoice) });
~~~

[[await getServiceToken()]] جوه الـ template: هات التوكن (من الكاش غالبًا) وحطه بعد [[Bearer]].

---

## ٦. الـ try: كام توكن اتعمل؟

الـ token endpoint المزيف بيتأكد من الـ Basic و [[grant_type]]، ويستنى ٥٠ ملّي ثانية، ويرجّع [[tok1]] و [[tok2]]... مع [[expires_in: 3600]].

~~~ts
const a = await getServiceToken(); const b = await getServiceToken();
const ten = await Promise.all(Array.from({ length: 10 }, () => getServiceToken()));
~~~

[[Array.from({ length: 10 }, fn)]] بيعمل array من ١٠ عناصر كل واحد ناتج [[fn]]، يعني ١٠ نداءات بدأوا مع بعض. و [[Promise.all]] بيستناهم كلهم. (قبل التانية فضّينا الكاش.)

~~~text الناتج
tok1 tok1 issued: 1
Promise.all x10: tok1 tok3 tok2 tok4 tok6 tok5 tok7 tok9 tok8 tok10 issued: 10
getServiceTokenOnce x10: tok1 tok1 tok1 tok1 tok1 tok1 tok1 tok1 tok1 tok1 issued: 1
~~~

الـ ١٠ كلهم شافوا [[cached]] بـ [[null]]، لأن محدش رجع لسه، فكل واحد طلب توكن. وده تحت الضغط بيوصلك للـ rate limit بتاع الـ IdP.

### الـ solCode: خزّن الـ Promise نفسه

~~~ts
let inflight: Promise<string> | null = null;
export function getServiceTokenOnce() {
  if (cached && cached.expiresAt - 60_000 > Date.now()) return Promise.resolve(cached.token);
  inflight ??= getServiceToken().finally(() => { inflight = null; });
  return inflight;
}
~~~

- [[inflight]]: الطلب اللي **لسه شغال**.
- [[??=]]: «لو [[inflight]] بـ [[null]] أو [[undefined]]، حط فيه». فأول نداء بيبدأ الطلب، والتسعة التانيين بياخدوا نفس الـ Promise ويستنوه.
- [[.finally(...)]]: لما الطلب يخلص (نجح أو فشل) امسح [[inflight]]، عشان لو فشل، النداء الجاي يحاول تاني بدل ما ياخد نفس الفشل.
- [[Promise.resolve(x)]]: Promise خلصان فيه [[x]]، عشان الدالة ترجّع نفس النوع دايمًا.

والناتج فوق: [[issued: 1]].

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| عندي توكن قدامه أكتر من دقيقة؟ | [[cached.expiresAt - 60_000 > Date.now()]] |
| هوية الخدمة | Basic بـ [[encodeURIComponent]] للاتنين |
| الطلب | form، [[grant_type=client_credentials]]، و [[scope]] محدد |
| التخزين | [[Date.now() + expires_in * 1000]] |
| نداءات كتير مع بعض | خزّن الـ Promise ([[inflight ??=]]) |

- الخدمة اللي بتستقبل التوكن بتتحقق من التوقيع و [[aud]] و [[scope]]، مش التوقيع بس.
- الـ secret للسيرفر بس، و [[encodeURIComponent]] قبل الـ base64.`,
          lines: [
            "كاش في الذاكرة: التوكن وإمتى بيخلص.",
            "دالة بترجّع توكن صالح.",
            "لو عندنا واحد قدامه أكتر من دقيقة، رجّعه من غير طلب.",
            "Basic auth: id:secret بعد URL-encode، و base64.",
            "اطلب توكن جديد...",
            "...POST...",
            "...form، ومعاه هوية الخدمة...",
            "...النوع client_credentials، والصلاحية اللي محتاجينها بس.",
            "قفلة.",
            "رفض؟ ارمي بالتفاصيل (دي logs سيرفر، مش رد لمستخدم).",
            "التوكن ومدته بالثواني.",
            "خزّنه ومعاه وقت الانتهاء.",
            "رجّعه.",
            "قفلة.",
            "الاستخدام: Bearer في أي طلب لخدمة تانية."
          ],
          sol: R`مرتين ورا بعض: توكن واحد اتعمل ([[tok1 tok1 issued: 1]])، التانية جت من الكاش.

١٠ مع بعض من أول مرة: هتلاقي ١٠ توكنات اتعملت، لأن كل النداءات شافت الكاش فاضي قبل ما أول واحد يرجع. الحل تخزّن الـ Promise:`,
          solCode: R`let inflight: Promise<string> | null = null;
export function getServiceTokenOnce() {
  if (cached && cached.expiresAt - 60_000 > Date.now()) return Promise.resolve(cached.token);
  inflight ??= getServiceToken().finally(() => { inflight = null; });
  return inflight;
}
// Promise.all من ١٠ نداءات = توكن واحد`
        },
        {
          cmd: "SSO للشركات",
          title: "كل شركة عميلة تدخل بالـ IdP بتاعها",
          desc: R`لما تبيع لشركات، أول طلب من IT عندهم: «موظفينا يدخلوا بحساب الشركة (Entra أو Okta أو Google Workspace)، ولما حد يمشي يتقفل حسابه عندكم لوحده». ده SSO للشركات.

كل شركة (tenant) ليها «connection»: الـ issuer بتاع الـ IdP بتاعهم، و client_id و secret عملوهم لتطبيقك، والدومين بتاعهم. المستخدم يكتب إيميله، وانت تشوف الدومين، وتودّيه للـ IdP بتاع شركته. والبروتوكول يا OIDC (الدروس اللي فاتت)، يا SAML (أقدم، XML، ولسه منتشر جدًا في الشركات).`,
          example: R`router.post("/auth/sso/start", async (req, res) => {
  const email = z.email().parse(req.body.email).toLowerCase();
  const conn = await db.ssoConnection.findUnique({ where: { domain: email.split("@")[1] } });
  if (!conn?.enabled) return res.json({ method: "password" });
  const idp = await getDiscovery(conn.issuer);
  const { url, state, nonce, verifier } = buildAuthRequest(idp, { clientId: conn.clientId, redirectUri: $__bt$__{config.API_ORIGIN}/auth/sso/callback$__bt, loginHint: email });
  res.cookie("oidc", JSON.stringify({ state, nonce, verifier, connectionId: conn.id }), { httpOnly: true, secure: true, sameSite: "lax", maxAge: 600e3, signed: true });
  res.json({ method: "sso", redirectTo: url });
});
async function onSsoLogin(conn: SsoConnection, claims: IdClaims) {
  const email = String(claims.email).toLowerCase();
  if (!email.endsWith("@" + conn.domain)) throw new Error("email outside connection domain");
  return db.user.upsert({
    where: { ssoConnectionId_subject: { ssoConnectionId: conn.id, subject: claims.sub! } },
    create: { email, name: claims.name ?? email, orgId: conn.orgId, ssoConnectionId: conn.id, subject: claims.sub!, role: "member" },
    update: { email, name: claims.name ?? undefined },
  });
}`,
          try: R`صمم جدول [[SsoConnection]] (orgId، و domain فريد، و issuer، و clientId، و clientSecret متشفّر، و enabled) وجدول users فيه [[@@unique([ssoConnectionId, subject])]]. وبعدين اكتب ٣ حالات: إيميل دومينه ملوش connection، وإيميل دومينه عليه connection، وإيميل من دومين تاني رجع من IdP الشركة.`,
          flag: "script",
          deep: {
            why: "الشركات مبتشتريش أداة موظفينها لازم يعملوا فيها باسورد جديد: ده خطر أمني عندهم (باسوردات ضعيفة، وموظف مشي ولسه داخل). عشان كده SSO غالبًا شرط في أي صفقة enterprise، وناس كتير بتحطه في الخطة الأغلى.",
            how: R`الفلو: صفحة login فيها خانة إيميل الأول. السيرفر بيدوّر على الدومين: لو له connection مفعّل، بيبني رابط دخول للـ IdP بتاع الشركة (بنفس state و nonce و PKCE) ويرجّعه للواجهة تعمل redirect. [[login_hint]] بيملى الإيميل في صفحة الـ IdP. الـ callback هو هو، بس بيجيب الـ connection من الكوكي، ويتحقق من الـ id_token بالـ issuer والـ JWKS والـ client_id بتوع الشركة دي بالذات.

الأمان: التوكن الجاي من IdP شركة «أ» لازم ميقدرش يدخل حد على شركة «ب». عشان كده: التحقق بـ issuer الـ connection، والمستخدم بيترابط بـ [[(connection, sub)]] مش بالإيميل، والإيميل لازم يبقى من دومين الـ connection. وملكية الدومين نفسه: قبل ما تفعّل connection لـ [[acme.com]]، اتأكد إن العميل يملك الدومين (DNS TXT record)، وإلا أي حد يعمل connection لدومين شركة تانية ويستقبل موظفينها. وفي Microsoft [[common]] (multi-tenant) لازم تتأكد من الـ [[tid]] في التوكن، لأن الـ issuer بيتغير مع كل tenant.

JIT provisioning: أول دخول بيعمل المستخدم في الـ org تلقائيًا، زي المثال. وفيه شركات عايزة العكس (بس اللي IT ضافهم يدخلوا).

SCIM: بروتوكول (REST + JSON) الـ IdP بيكلّمك بيه لما موظف يتضاف أو يتشال أو يتغير. من غيره، الموظف اللي اتفصل يفضل حسابه عندك شغال لحد ما session بتاعته تخلص. SCIM هو اللي بيحقق «يتقفل لوحده».

SAML: نفس الفكرة بـ XML موقّع: الـ IdP بيبعت Assertion فيها المستخدم. التحقق من XML signatures صعب وكان ليه ثغرات كتير على مر السنين (XML signature wrapping)، فمتكتبهوش بنفسك أبدًا: استخدم مكتبة مشهورة ومحدّثة، أو خدمة.

خدمات جاهزة: WorkOS و Auth0 و Okta و Clerk و Keycloak (مفتوح المصدر، تشغّله بنفسك) بيدّوك OIDC و SAML و SCIM لكل عملائك من خلال integration واحدة، وبيدّوا IT عند العميل صفحة يعملوا منها الإعداد. وده غالبًا القرار الصح للفرق الصغيرة.

وتسجيل الخروج: logout من تطبيقك بيمسح الـ session بتاعتك بس. الخروج من الـ IdP كمان ([[end_session_endpoint]]) أو Single Logout موضوع تاني ومش كل IdP بيدعمه كويس.`,
            when: "أول عميل enterprise يطلبه. قبلها كفاية Google و Microsoft كـ «ادخل بـ». ولو هتدعم أكتر من ٢-٣ connections أو SAML، فكّر في خدمة بدل ما تبنيه.",
            mistakes: R`تربط بالإيميل فموظف من شركة تانية بنفس الإيميل (أو IdP بيرجّع أي إيميل) ياخد حساب حد. وتفعّل connection لدومين من غير إثبات ملكية. وتقبل multi-tenant issuer من غير فحص tid. ومفيش SCIM ولا مدة قصيرة للـ session، فالموظف المفصول لسه داخل. وتكتب SAML parser بنفسك.`
          },
          teach: R`## من الإيميل للـ IdP بتاع شركته

المثال جزئين. الأول route بياخد إيميل المستخدم، ويشوف الدومين بتاعه عليه SSO ولا لأ، ولو عليه يبنيله رابط دخول للـ IdP بتاع الشركة دي بالذات. والتاني دالة بتتنادى بعد ما الـ callback اتحقق من التوكن: بتتأكد إن الإيميل من دومين الشركة، وتلاقي المستخدم أو تعمله.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 و jose 6.2 على Node 24.19 (بورت ٦٠١١)، و **اتنين** IdP محليين بمكتبة [[oidc-provider]]: واحد لشركة [[acme.com]] على ٦٠١٠، وواحد لشركة [[globex.com]] على ٦٠١٢ متظبط يرجّع إيميل من برّه الشركة ([[x@other.com]]، زي guest user). الـ [[db]] كان object في الذاكرة بنفس دوال Prisma ([[findUnique]] و [[upsert]])، مش Prisma حقيقي. و [[getDiscovery]] و [[buildAuthRequest]] مش في المثال، فكتبناهم: الأولى بتجيب الـ discovery وتكاشه، والتانية بتعمل state و nonce و PKCE وتبني الرابط زي درس [[id_token و nonce]]. وصفحات الإعداد عند Entra و Okta و WorkOS من الـ docs.

---

## ١. البداية: الإيميل بس

~~~ts
router.post("/auth/sso/start", async (req, res) => {
  const email = z.email().parse(req.body.email).toLowerCase();
~~~

- [[z.email()]]: schema في Zod 4 لإيميل. [[.parse(x)]] بترجّع القيمة لو صح، وبترمي [[ZodError]] لو لأ.
- [[.toLowerCase()]]: [[Mona@ACME.com]] و [[mona@acme.com]] نفس الشخص، فبنوحّد.

جرّبنا [[not-an-email]]: Zod رمت [[ZodError]] بكود [[invalid_format]] و [[format: "email"]]، والـ error handler رجّع 400.

---

## ٢. الدومين عليه connection؟

~~~ts
  const conn = await db.ssoConnection.findUnique({ where: { domain: email.split("@")[1] } });
  if (!conn?.enabled) return res.json({ method: "password" });
~~~

- [[email.split("@")[1]]]: اللي بعد الـ [[@]]، يعني الدومين. آمن هنا لأن Zod اتأكدت إن فيه [[@]] واحدة.
- [[findUnique]] بالدومين: عشان كده [[domain]] لازم [[@unique]] في الـ schema.
- [[conn?.enabled]]: الـ [[?.]] (optional chaining): لو [[conn]] بـ [[null]]، النتيجة [[undefined]] بدل ما يرمي. فـ [[!conn?.enabled]] صح في الحالتين: مفيش connection، أو موجود ومقفول.

~~~text الناتج
ahmed@gmail.com -> 200 {"method":"password"}
~~~

الواجهة تشوف [[password]] فتعرض خانة الباسورد العادية.

---

## ٣. فيه connection: رابط للـ IdP بتاعهم

~~~ts
  const idp = await getDiscovery(conn.issuer);
  const { url, state, nonce, verifier } = buildAuthRequest(idp, { clientId: conn.clientId, redirectUri: $__bt$__{config.API_ORIGIN}/auth/sso/callback$__bt, loginHint: email });
~~~

- [[conn.issuer]]: كل شركة ليها issuer، وكل حاجة تانية (صفحة الدخول، والمفاتيح) بتيجي من الـ discovery بتاعه.
- [[clientId: conn.clientId]]: الـ client اللي IT في الشركة عملوه لتطبيقك عندهم، مش client واحد لكل الناس.
- [[loginHint]]: بيتحط في الرابط كـ [[login_hint]]، فصفحة الـ IdP تملا الإيميل لوحدها.

~~~ts
  res.cookie("oidc", JSON.stringify({ state, nonce, verifier, connectionId: conn.id }), { httpOnly: true, secure: true, sameSite: "lax", maxAge: 600e3, signed: true });
  res.json({ method: "sso", redirectTo: url });
});
~~~

| خيار الكوكي | معناه |
|---|---|
| [[httpOnly]] | JavaScript في الصفحة ميقدرش يقراها |
| [[secure]] | بتتبعت على HTTPS بس (والمتصفحات بتعتبر [[localhost]] آمن) |
| [[sameSite: "lax"]] | بتتبعت لما الـ IdP يرجّع المستخدم بـ redirect عادي، ومش بتتبعت مع طلبات POST جاية من موقع تاني |
| [[maxAge: 600e3]] | [[600e3]] = 600 × 1000 ملّي = ١٠ دقايق |
| [[signed]] | [[cookie-parser]] بيوقّعها، فمحدش يغيّر [[connectionId]] |

[[connectionId]] في الكوكي هو أهم حاجة: الـ callback هيتحقق من التوكن بالـ issuer والمفاتيح والـ client بتوع **الشركة دي**، مش أي شركة.

~~~text الناتج
Mona@ACME.com -> 200 {"method":"sso","redirectTo":"http://localhost:6010/auth?client_id=my-client&redirect_uri=http%3A%2F%2Flocalhost%3A6011%2Fauth%2Fsso%2Fcallback&response_type=code&scope=openid+email+profile&state=dNis...&nonce=...&login_hint=mona%40acme.com&code_challenge=...&code_challenge_method=S256"}
  set-cookie: oidc=s%3A%7B%22state%22...  Max-Age=600; Path=/; Expires=Thu, 08 Oct 2026 09:19:13 GMT; HttpOnly; Secure; SameSite=Lax
~~~

---

## ٤. بعد الـ callback: [[onSsoLogin]]

الـ callback اللي كتبناه للتجربة هو نفس خطوات درس [[id_token و nonce]]، بفرق واحد: بيجيب الـ connection من [[connectionId]] اللي في الكوكي، ويتحقق بـ [[issuer: conn.issuer]] و [[audience: conn.clientId]]. وبعدين بينادي:

~~~ts
async function onSsoLogin(conn: SsoConnection, claims: IdClaims) {
  const email = String(claims.email).toLowerCase();
  if (!email.endsWith("@" + conn.domain)) throw new Error("email outside connection domain");
~~~

- [[String(claims.email)]]: لو مش موجود بيبقى [["undefined"]] كنص، فالفحص اللي بعده هيرفض. مفيش crash.
- [[endsWith("@" + conn.domain)]]: الـ [[@]] مهمة: من غيرها [[x@evilacme.com]] كانت هتعدّي على [[acme.com]].

~~~ts
  return db.user.upsert({
    where: { ssoConnectionId_subject: { ssoConnectionId: conn.id, subject: claims.sub! } },
    create: { email, name: claims.name ?? email, orgId: conn.orgId, ssoConnectionId: conn.id, subject: claims.sub!, role: "member" },
    update: { email, name: claims.name ?? undefined },
  });
}
~~~

| الجزء | معناه |
|---|---|
| [[where.ssoConnectionId_subject]] | Prisma بيسمّي الـ unique المركّب [[@@unique([ssoConnectionId, subject])]] بالاسمين بينهم [[_]] (من docs Prisma) |
| [[create]] | أول دخول (JIT provisioning): المستخدم يتعمل جوه الـ org بتاعة الشركة بدور [[member]] |
| [[update]] | الدخول اللي بعده: الإيميل والاسم يتحدّثوا لو اتغيروا عند الشركة |
| [[claims.name ?? email]] | [[??]]: لو مفيش اسم، استخدم الإيميل |
| [[claims.name ?? undefined]] | [[undefined]] في Prisma update معناها «متلمسش الحقل ده»، فالاسم القديم يفضل |

### الدخول السليم

~~~text الناتج
login: 200 {"loggedIn":{"id":"user1","email":"mona@acme.com","name":"Mona","orgId":"org_acme","ssoConnectionId":"c1","subject":"mona","role":"member"}}
~~~

### IdP الشركة رجّع إيميل من برّه

[[sara@globex.com]] دخلت، والـ IdP بتاع globex رجّع [[x@other.com]]:

~~~text الناتج
sara@globex.com -> 200 {"method":"sso","redirectTo":"http://localhost:6012/auth?..."}
  login: 403 Login failed
SSO REJECT globex.com x@other.com email outside connection domain
~~~

التوكن نفسه سليم وموقّع، بس [[onSsoLogin]] رفضت. من غير السطر ده، IdP أي شركة كان يقدر يدخّل حد بإيميل شركة تانية.

---

## ٥. الـ try: الـ schema

~~~text الـ schema (Prisma، من الـ docs، مش متجرّب)
model SsoConnection {
  id           String  @id @default(cuid())
  orgId        String
  domain       String  @unique
  issuer       String
  clientId     String
  clientSecret String  // متشفّر قبل ما يتحفظ
  enabled      Boolean @default(false)
}
model User {
  id              String  @id @default(cuid())
  email           String
  ssoConnectionId String?
  subject         String?
  @@unique([ssoConnectionId, subject])
}
~~~

[[enabled]] افتراضيًا [[false]]: الـ connection ميتفعّلش غير بعد ما العميل يثبت إنه بيملك الدومين (DNS TXT record).

---

## الخلاصة

| الحالة | النتيجة |
|---|---|
| دومين ملوش connection أو مقفول | [[{"method":"password"}]] |
| دومين عليه connection | [[redirectTo]] للـ IdP بتاعهم، وكوكي فيها [[connectionId]] |
| الـ IdP رجّع إيميل من دومين تاني | [[onSsoLogin]] بترمي، والدخول بيفشل |
| أول دخول سليم | مستخدم جديد في الـ org (JIT) |

- التحقق بالـ issuer والـ client بتوع الـ connection اللي في الكوكي.
- المستخدم بـ [[(connection, sub)]]، والإيميل لازم من دومين الـ connection.
- اثبت ملكية الدومين قبل ما تفعّل.`,
          lines: [
            "بداية الدخول: الواجهة بتبعت الإيميل بس.",
            "اتحقق إنه إيميل، وحروف صغيرة.",
            "فيه connection للدومين ده؟",
            "لأ، أو مقفول: الواجهة تكمّل بالباسورد العادي.",
            "الـ discovery بتاع IdP الشركة دي (متكاش).",
            "ابني رابط الدخول بنفس state و nonce و PKCE، وبالـ client بتاع الشركة، والإيميل كـ hint.",
            "خزّن المحاولة ومعاها أنهي connection، عشان الـ callback يتحقق بمفاتيح الشركة دي بالذات.",
            "الواجهة تعمل redirect.",
            "قفلة.",
            "بعد ما الـ callback اتحقق من التوكن:",
            "الإيميل.",
            "لازم من دومين الشركة دي. IdP شركة «أ» ميدخلش حد على دومين «ب».",
            "لاقي أو اعمل المستخدم (JIT provisioning)...",
            "...بـ (connection, sub)، مش بالإيميل...",
            "...أول مرة: جوه الـ org بتاعة الشركة، بدور عادي...",
            "...بعد كده: حدّث الإيميل والاسم لو اتغيروا عند الشركة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الحالات التلاتة:

١. [[ahmed@gmail.com]] ومفيش connection لـ gmail.com: الرد [[{"method":"password"}]] والواجهة تعرض خانة الباسورد.

٢. [[mona@acme.com]] وفيه connection مفعّل: الرد [[{"method":"sso","redirectTo":"https://login.microsoftonline.com/..."}]]، وكوكي فيها الـ connectionId.

٣. IdP بتاع acme رجّع [[email: x@other.com]]: [[onSsoLogin]] بترمي، والدخول بيفشل. ده ممكن يحصل لو الـ IdP بيسمح بضيوف (guest users) من برّه الشركة.

والـ schema: [[domain String @unique]] في SsoConnection، و [[@@unique([ssoConnectionId, subject])]] في User، وده اللي بيدّي Prisma الاسم [[ssoConnectionId_subject]] اللي في الـ upsert. والـ clientSecret متشفّر في القاعدة، مش نص عادي.`
        }
      ]
    },
    {
      t: "Rate limiting موزّع",
      l: 3,
      n: "حدود بتشتغل صح على أكتر من سيرفر: token bucket و sliding window في Redis، و quota لكل خطة، والـ headers اللي بتقول للعميل يستنى قد إيه",
      items: [
        {
          cmd: "token bucket في Redis",
          title: "اسمح بـ burst وحافظ على متوسط ثابت",
          desc: R`كل عميل عنده «جردل» فيه tokens (مثلًا ١٠). كل طلب بياخد token، والجردل بيتملى بمعدل ثابت (مثلًا ٢ في الثانية) لحد الحد الأقصى. الجردل فاضي؟ 429.

النتيجة: العميل يقدر يبعت ١٠ طلبات مرة واحدة (burst)، بس على المدى الطويل ميعدّيش ٢ في الثانية. ولأن السيرفرات كتير، الجردل لازم يبقى في Redis، والقراية والتعديل لازم يحصلوا في خطوة واحدة atomic: عشان كده Lua script.`,
          example: R`redis.defineCommand("takeToken", {
  numberOfKeys: 1,
  lua: $__bt
    local capacity = tonumber(ARGV[1])
    local rate = tonumber(ARGV[2])
    local t = redis.call("TIME")
    local now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
    local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
    local tokens = math.min(capacity, (tonumber(b[1]) or capacity) + (now - (tonumber(b[2]) or now)) * rate / 1000)
    local allowed = 0
    if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
    redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
    redis.call("PEXPIRE", KEYS[1], math.ceil(capacity / rate * 1000))
    local waitMs = allowed == 1 and 0 or math.ceil((1 - tokens) * 1000 / rate)
    return { allowed, math.floor(tokens), waitMs }
  $__bt,
});
export async function takeToken(key: string, capacity: number, perSecond: number) {
  const [allowed, remaining, waitMs] = await (redis as any).takeToken($__btrl:tb:$__{key}$__bt, capacity, perSecond);
  return { allowed: allowed === 1, remaining, retryAfter: Math.ceil(waitMs / 1000) };
}`,
          try: R`نادي [[takeToken("k1", 10, 2)]] ١٢ مرة ورا بعض واطبع النتايج، واستنى ثانية ونادي ٣ كمان. وبعدين افتح key جديد ونادي ٥٠ مرة بالتوازي بـ [[Promise.all]] بـ capacity ١٠ ومعدل صغير جدًا: كام واحد اتسمح؟`,
          flag: "script",
          deep: {
            why: R`[[express-rate-limit]] بالـ store الافتراضي (تاب «Backend بـ Node») بيعدّ في ذاكرة كل process. مع ٣ سيرفرات ورا load balancer، الحد الحقيقي بقى ٣ أضعاف، وبيختلف حسب أنهي سيرفر الطلب وقع عليه. والـ APIs محتاجة سماح بـ burst (موبايل بيفتح وبيعمل ٨ طلبات مع بعض) من غير ما تسيب حد يعمل ألف طلب في الدقيقة.`,
            how: R`الفكرة إنك مش محتاج «تزوّد» tokens كل ثانية بـ timer. بتخزّن عدد الـ tokens ووقت آخر تحديث، ومع كل طلب بتحسب اللي اتملى من ساعتها: [[(now - ts) * rate / 1000]]، ومتعدّيش الـ capacity.

ليه Lua؟ لو عملت [[HMGET]] في Node وبعدين حسبت وبعدين [[HSET]]، طلبين على سيرفرين ممكن يقروا نفس القيمة (token واحد باقي) والاتنين ياخدوه. Redis بينفّذ الـ script كله من غير ما أي أمر تاني يدخل في النص، فالقراية والكتابة atomic. و [[defineCommand]] في ioredis بيبعت الـ script مرة ويناديه بالـ SHA بعد كده ([[EVALSHA]]).

الوقت من [[redis.call("TIME")]] مش من Node: كل السيرفرات بتستخدم ساعة واحدة (ساعة Redis)، فمفيش مشكلة لو ساعة سيرفر متأخرة ثانيتين.

[[PEXPIRE]]: بعد الوقت اللي الجردل بيتملى فيه كله، الـ key مالوش لازمة (لو اتشال، أول طلب جاي هيلاقيه مليان، وده نفس النتيجة). فالـ keys مبتتراكمش في Redis.

[[waitMs]]: لو مرفوض، قد إيه لحد ما يبقى فيه token واحد. ده اللي بيروح في [[Retry-After]].

المفتاح بيتحدد بإيه؟ الـ API key أو الـ user id للطلبات المسجّلة، والـ IP للمجهولين (والـ IP الحقيقي لو ورا proxy، مع [[trust proxy]] صح). وممكن حدود متعددة مع بعض: لكل مستخدم، ولكل endpoint غالي (login، أو AI، أو SMS)، و global.

بدايل: [[rate-limit-redis]] كـ store لـ express-rate-limit (fixed window في Redis)، ومكتبات زي [[rate-limiter-flexible]] فيها algorithms كتير جاهزة. والكود هنا عشان تفهم اللي جوه وتقدر تعدّل. وفي Nginx أو الـ API gateway فيه rate limit برضه (بالـ IP غالبًا)، وده خط دفاع أول مش بديل.`,
            when: "أي API عام أو فيه أكتر من سيرفر، وأي endpoint بيكلّف فلوس (AI، أو SMS، أو إيميل). token bucket مناسب لما عايز تسمح بـ burst.",
            mistakes: R`GET وبعدين SET من Node (race condition، وبيعدّي أكتر من الحد تحت الضغط). والوقت من [[Date.now()]] على كل سيرفر. ومفيش expire فالـ keys بتملى Redis. و [[capacity]] كبيرة جدًا فالـ burst نفسه هو الهجوم. وتعمل rate limit بالـ IP بس لـ API بيستخدمه شركات ورا NAT واحد. وسؤال انترفيو كلاسيكي: «صمم rate limiter موزّع»، والإجابة: algorithm (token bucket أو sliding window)، ومخزن مشترك (Redis)، وعملية atomic (Lua)، وحدود لكل key، وheaders، وإيه اللي يحصل لو Redis وقع (fail open ولا fail closed).`
          },
          teach: R`## جردل في Redis، و script بيتنفّذ مرة واحدة من غير مقاطعة

المثال بيعرّف أمر جديد في ioredis اسمه [[takeToken]]، الأمر ده Lua script بيتنفّذ **جوه Redis**: بيقرا الجردل، ويحسب اتملى قد إيه من آخر مرة، وياخد token لو فيه، ويكتب الحالة الجديدة. وبعده دالة TypeScript بتناديه وترجّع نتيجة مريحة.

اتجرّب على ويندوز 11: ioredis 6.0 على Node 24.19، و Redis 8.10 حقيقي في Docker ([[redis:8-alpine]]).

---

## ١. تعريف الأمر

~~~ts
redis.defineCommand("takeToken", {
  numberOfKeys: 1,
  lua: $__bt ... $__bt,
});
~~~

- [[defineCommand]]: بيضيف دالة [[redis.takeToken(...)]]. أول مرة بيبعت الـ script لـ Redis، وبعد كده بيناديه بالـ SHA بتاعه ([[EVALSHA]]) عشان ميبعتش النص كل مرة. اتأكدنا: [[SCRIPT EXISTS <sha>]] رجّع [[1]].
- [[numberOfKeys: 1]]: أول argument هيبقى key (بيوصل في Lua كـ [[KEYS[1]]])، والباقي arguments عادية ([[ARGV[1]]] و [[ARGV[2]]]). Redis Cluster محتاج يعرف الـ keys عشان يبعت الأمر للـ node الصح.

---

## ٢. الـ script سطر سطر

### المدخلات

~~~lua
    local capacity = tonumber(ARGV[1])
    local rate = tonumber(ARGV[2])
~~~

[[local]] متغير في Lua. و [[tonumber]] لأن كل حاجة بتوصل للـ script **نص**. السعة القصوى، والمعدل (tokens في الثانية).

### الوقت من Redis

~~~lua
    local t = redis.call("TIME")
    local now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
~~~

[[TIME]] بيرجّع اتنين: ثواني، وميكروثواني جوه الثانية. ففي Lua [[t[1]]] الثواني (الـ arrays في Lua بتبدأ من 1 مش 0)، و [[t[2]]] الميكرو. الثواني × ١٠٠٠ + الميكرو ÷ ١٠٠٠ = الوقت بالملّي ثانية. ليه مش [[Date.now()]] من Node؟ عشان كل السيرفرات تستخدم ساعة واحدة.

### الحالة الحالية

~~~lua
    local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
    local tokens = math.min(capacity, (tonumber(b[1]) or capacity) + (now - (tonumber(b[2]) or now)) * rate / 1000)
~~~

الجردل hash فيه حقلين: [[tokens]] و [[ts]] (آخر تحديث). [[HMGET]] بيجيبهم.

السطر التاني من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[tonumber(b[1]) or capacity]] | الـ tokens اللي كانت. أول مرة (الـ key مش موجود) [[b[1]]] = false، فـ [[or]] بتدّي السعة كاملة: جردل جديد مليان |
| [[now - (tonumber(b[2]) or now)]] | ملّي ثواني من آخر تحديث (أول مرة صفر) |
| [[* rate / 1000]] | اللي اتملى في المدة دي |
| [[math.min(capacity, ...)]] | الجردل مبيفيضش |

### خد token لو فيه

~~~lua
    local allowed = 0
    if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
~~~

### اكتب الحالة والمدة

~~~lua
    redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
    redis.call("PEXPIRE", KEYS[1], math.ceil(capacity / rate * 1000))
~~~

[[PEXPIRE]] مدة بالملّي ثانية. [[capacity / rate]] = الثواني اللي الجردل الفاضي بيتملى فيها. بـ ١٠ و ٢: ٥ ثواني. بعدها الـ key مالوش لازمة (لو اتمسح، أول طلب هيلاقيه مليان، نفس النتيجة).

### كام يستنى، والنتيجة

~~~lua
    local waitMs = allowed == 1 and 0 or math.ceil((1 - tokens) * 1000 / rate)
    return { allowed, math.floor(tokens), waitMs }
~~~

[[a and b or c]] في Lua زي [[a ? b : c]]. لو مرفوض: ناقصنا [[1 - tokens]] عشان نوصل لـ token واحد، وده بياخد [[(1 - tokens) / rate]] ثانية. والـ [[return]] بيرجّع array، و Redis بيحوّل أرقام Lua لـ integers (بيقص الكسور)، عشان كده [[math.floor]] صريحة.

---

## ٣. الدالة

~~~ts
export async function takeToken(key: string, capacity: number, perSecond: number) {
  const [allowed, remaining, waitMs] = await (redis as any).takeToken($__btrl:tb:$__{key}$__bt, capacity, perSecond);
  return { allowed: allowed === 1, remaining, retryAfter: Math.ceil(waitMs / 1000) };
}
~~~

- [[(redis as any)]]: TypeScript ميعرفش إن [[takeToken]] اتضافت، فبنقوله «سيبني».
- [[rl:tb:key]]: prefix عشان الـ keys تبان مين بتاعها ([[rl]] = rate limit، [[tb]] = token bucket).
- [[const [a, b, c] =]]: بياخد التلات عناصر من الـ array.
- [[retryAfter]] بالثواني، مقرّب لفوق: ٤٩٣ ملّي تبقى ١ ثانية، عشان [[Retry-After]] header مبيقبلش كسور.

---

## ٤. الـ try

### ١٢ ورا بعض (سعة ١٠، معدل ٢)

~~~ts
const fmt = (r) => (r.allowed ? "✓" + r.remaining : "✗" + r.retryAfter + "s");
for (let i = 0; i < 12; i++) out.push(fmt(await takeToken("k1", 10, 2)));
~~~

~~~text الناتج
✓9 ✓8 ✓7 ✓6 ✓5 ✓4 ✓3 ✓2 ✓1 ✓0 ✗1s ✗1s
~~~

الـ ١٠ الأولانيين خدوا الجردل كله (burst)، والـ ٢ الأخيرين اترفضوا. وبصينا على الـ script نفسه وجوه Redis:

~~~text الناتج
raw: [0,0,493]
HGETALL { tokens: '0.015999999999999567', ts: '1791450573612' } PTTL 4999
~~~

- [[493]] ملّي: الطلبات خدت حوالي ٨ ملّي، فاتملى [[0.016]] token، والباقي لحد token كامل [[(1 - 0.016) / 2]] ثانية ≈ ٤٩٣ ملّي.
- [[tokens]] متخزنة بكسور، عشان كده المعدل بيبقى دقيق.
- [[PTTL]] الملّي الباقية للـ key، تقريبًا ٥٠٠٠.

### بعد ثانية

~~~text الناتج
after 1s: ✓1 ✓0 ✗1s
~~~

ثانية × ٢ في الثانية = ٢ tokens، وبعدهم رفض.

### ٥٠ مع بعض (سعة ١٠، معدل صغير جدًا)

~~~ts
const par = await Promise.all(Array.from({ length: 50 }, () => takeToken("k2", 10, 0.001)));
~~~

~~~text الناتج
50 parallel, allowed: 10 retryAfter of a rejected: 1000
~~~

١٠ بالظبط، لأن Redis بينفّذ الـ script كله قبل أي أمر تاني. و [[retryAfter]] ١٠٠٠ ثانية لأن المعدل ٠.٠٠١ في الثانية.

### نفس الفكرة من غير Lua

عشان نشوف ليه Lua، كتبنا نفس المنطق بـ [[GET]] في Node وبعدين [[SET]]، وشغّلناه ٥٠ مع بعض ٣ مرات:

~~~text الناتج
naive GET/SET, allowed out of 50 (3 runs): 50, 50, 50
~~~

الـ ٥٠ قروا [[null]] (جردل مليان) قبل ما أي واحد يكتب، فالكل عدّى. ده الـ race condition اللي الـ script بيقفله.

---

## الخلاصة

| الخطوة | في الـ script |
|---|---|
| الوقت | [[TIME]] من Redis، بالملّي |
| الحالة | [[HMGET tokens ts]]، وأول مرة جردل مليان |
| الملي | [[(now - ts) * rate / 1000]] بحد أقصى السعة |
| القرار | فيه token؟ خده |
| الكتابة | [[HSET]] و [[PEXPIRE]] بمدة الملي الكامل |
| الرد | [[allowed, remaining, waitMs]] |

- القراية والحسبة والكتابة في script واحد = atomic.
- الوقت من Redis، مش من كل سيرفر.
- الـ key بيمسح نفسه، فمبيتراكمش.`,
          lines: [
            "عرّف أمر جديد في ioredis من Lua script.",
            "بياخد key واحد (الجردل).",
            "الـ script:",
            "السعة القصوى.",
            "المعدل: tokens في الثانية.",
            "الوقت من ساعة Redis (ثواني وميكروثواني)...",
            "...بالملّي ثانية.",
            "هات الـ tokens ووقت آخر تحديث.",
            "الحالي = اللي كان + اللي اتملى من ساعتها، بحد أقصى السعة. أول مرة: الجردل مليان.",
            "مرفوض افتراضيًا.",
            "فيه token؟ خده واسمح.",
            "خزّن الحالة الجديدة.",
            "امسح الـ key بعد ما يتملى كله (مالوش لازمة بعدها).",
            "لو مرفوض: قد إيه لحد token واحد.",
            "رجّع: مسموح؟ وكام باقي، وقد إيه يستنى.",
            "قفلة الـ script.",
            "قفلة.",
            "الدالة اللي هتستخدمها.",
            "نادي الأمر بالـ key والإعدادات.",
            "رجّع النتيجة بشكل مريح، و retryAfter بالثواني.",
            "قفلة."
          ],
          sol: R`١٢ ورا بعض بـ capacity ١٠ ومعدل ٢: أول ١٠ مسموحين والباقي بينزل من ٩ لـ ٠، والـ ٢ الأخيرين مرفوضين بـ [[retryAfter: 1]]:

[[✓9 ✓8 ✓7 ✓6 ✓5 ✓4 ✓3 ✓2 ✓1 ✓0 ✗1s ✗1s]]

بعد ثانية: اتملى حوالي ٢ tokens، فأول ٢ مسموحين والتالت مرفوض: [[✓1 ✓0 ✗1s]].

الـ ٥٠ بالتوازي: ١٠ بالظبط اتسمحوا. ده دليل إن الـ Lua script atomic. لو عملتها GET/SET من Node هتلاقي الرقم أكبر من ١٠ وبيتغير من مرة للتانية.

ولو كل الطلبات مرفوضة من الأول: غالبًا [[ARGV]] بتوصل نص ومش متحولة بـ [[tonumber]]، أو الـ rate صفر.`
        },
        {
          cmd: "sliding window",
          title: "حد لكل دقيقة من غير ثغرة حدود النافذة",
          desc: R`أبسط rate limit: fixed window. عداد لكل دقيقة ([[INCR]] على key فيه رقم الدقيقة)، ولو عدّى الحد 429. المشكلة: ١٠٠ طلب في آخر ثانية من دقيقة، و ١٠٠ في أول ثانية من الدقيقة اللي بعدها = ٢٠٠ في ثانيتين والحد ١٠٠.

الـ sliding window counter بيحل ده بتقريب ذكي: بيبص على عداد الدقيقة الحالية وعداد اللي فاتت، ويحسب «كام طلب في آخر ٦٠ ثانية» بوزن العداد القديم حسب الجزء اللي لسه جوه النافذة.`,
          example: R`export async function slidingWindow(key: string, limit: number, windowSec: number) {
  const nowSec = Date.now() / 1000;
  const w = Math.floor(nowSec / windowSec);
  const cur = $__btrl:sw:$__{key}:$__{w}$__bt;
  const prev = $__btrl:sw:$__{key}:$__{w - 1}$__bt;
  const [[, count], , [, prevCount]] = (await redis.multi().incr(cur).expire(cur, windowSec * 2).get(prev).exec())!;
  const elapsed = (nowSec % windowSec) / windowSec;
  const estimated = Number(prevCount ?? 0) * (1 - elapsed) + Number(count);
  if (estimated > limit) await redis.decr(cur);
  return { allowed: estimated <= limit, remaining: Math.max(0, Math.floor(limit - estimated)), resetSec: Math.ceil(windowSec - (nowSec % windowSec)) };
}`,
          try: R`نادي [[slidingWindow("u1", 5, 2)]] ٧ مرات ورا بعض، واستنى ٣ ثواني ونادي ٤ كمان. وبعدين شيل سطر الـ [[decr]] وكرر، وقارن التانية.`,
          flag: "script",
          deep: {
            why: "الحد «١٠٠ في الدقيقة» معناه عند العميل «في أي ٦٠ ثانية». الـ fixed window بيسمح بضعف الحد عند حدود الدقايق، والمهاجم بيعرف كده ويوقّت طلباته. والـ sliding log الكامل (تخزين وقت كل طلب) دقيق بس بياكل ذاكرة مع كل طلب.",
            how: R`التقريب: لو احنا في الثانية ١٥ من الدقيقة الحالية، يبقى آخر ٦٠ ثانية = ١٥ ثانية من الحالية + ٤٥ ثانية (٧٥٪) من اللي فاتت. فالتقدير = عداد الحالية + عداد اللي فاتت × ٠.٧٥. ده بيفترض إن طلبات الدقيقة اللي فاتت كانت موزعة بالتساوي، وفي الواقع الخطأ صغير (Cloudflare بتستخدم الطريقة دي وبتقول إن الخطأ في أقل من ١٪ من الطلبات تقريبًا).

[[MULTI]] هنا (مش Lua): الـ [[INCR]] نفسه atomic ويرجّع العدد بعد الزيادة، فكل طلب واخد رقمه الخاص، ومفيش اتنين بياخدوا نفس الرقم. [[EXPIRE]] بضعف النافذة عشان عداد الدقيقة الحالية لسه هيتقري كـ «اللي فاتت» في الدقيقة الجاية.

الـ [[DECR]] على الرفض: من غيره الطلبات المرفوضة بتتعد، والعميل اللي بيضرب بسرعة بيفضل مقفول حتى لو بطّل، لأن عداده بيكبر من الرفض نفسه. فيه ناس عايزين ده عمدًا (عقاب للي بيضرب). اختار عن قصد.

المقارنة:

fixed window: أبسط وأرخص، بس فيه burst الحدود.
sliding window counter: رخيص (عدادين)، ودقيق كفاية، ومفيش burst حقيقي.
sliding log (sorted set بوقت كل طلب): دقيق تمامًا، بس الذاكرة بتكبر مع عدد الطلبات.
token bucket: بيسمح بـ burst محدد عمدًا، وأنسب لـ «متوسط + سماح».

والـ fail mode: لو Redis وقع، تسمح بكل الطلبات (fail open، الخدمة شغالة بس من غير حماية) ولا ترفضها (fail closed)؟ لأغلب الـ APIs fail open مع alert، وللـ login والحاجات الغالية fail closed.`,
            when: "حدود «X في الدقيقة أو الساعة» على endpoints عامة، وحماية login و signup و reset password من التخمين.",
            mistakes: R`fixed window على login («٥ محاولات في الدقيقة» تبقى ١٠ في ثانيتين). والوقت من ساعة كل سيرفر في الحسبة ([[Date.now()]] هنا بيحدد النافذة، فساعات السيرفرات لازم تبقى متزامنة بـ NTP، أو انقل الحسبة لـ Lua بـ TIME). ونسيان expire. وتحسب بـ GET وبعدين INCR منفصلين.`
          },
          teach: R`## عدادين وحسبة صغيرة بدل ما تخزّن كل طلب

الدالة بتقسم الوقت لنوافذ ثابتة (كل [[windowSec]] ثانية نافذة ليها رقم)، وبتزوّد عداد النافذة الحالية، وتقرا عداد اللي قبلها. وبعدين بتقدّر «كام طلب في آخر [[windowSec]] ثانية» = كل الحالية + جزء من القديمة على قد ما لسه داخل في النافذة المتزحلقة.

اتجرّب على ويندوز 11: ioredis 6.0 على Node 24.19، و Redis 8.10 في Docker ([[redis:8-alpine]]). عشان النتايج تتكرر، التجربة بتستنى لحد أول نافذة جديدة قبل ما تبدأ، وطبعنا الحسبة من جوه في كل نداء.

---

## ١. رقم النافذة

~~~ts
export async function slidingWindow(key: string, limit: number, windowSec: number) {
  const nowSec = Date.now() / 1000;
  const w = Math.floor(nowSec / windowSec);
~~~

- [[nowSec]]: الثواني من ١٩٧٠ بكسور (مثلًا [[1791450593.072]]).
- [[Math.floor(nowSec / windowSec)]]: رقم النافذة. بنافذة ثانيتين: كل الأوقات من [[...592.000]] لـ [[...593.999]] بتدّي نفس الرقم [[895725296]].

~~~ts
  const cur = $__btrl:sw:$__{key}:$__{w}$__bt;
  const prev = $__btrl:sw:$__{key}:$__{w - 1}$__bt;
~~~

اسم عداد الحالية واللي قبلها، مثلًا [[rl:sw:u1:895725296]] و [[rl:sw:u1:895725295]] ([[sw]] = sliding window).

---

## ٢. أمر واحد لـ Redis

~~~ts
  const [[, count], , [, prevCount]] = (await redis.multi().incr(cur).expire(cur, windowSec * 2).get(prev).exec())!;
~~~

### من جوه: [[multi()...exec()]]

[[multi()]] بيبدأ transaction: الأوامر بتتجمّع وتتبعت مرة واحدة، و Redis بينفّذهم ورا بعض من غير ما حاجة تدخل في النص:

| الأمر | بيعمل | بيرجّع |
|---|---|---|
| [[INCR cur]] | زوّد عداد الحالية ١ (لو مش موجود يبدأ من ٠) | العدد بعد الزيادة |
| [[EXPIRE cur windowSec*2]] | خليه يعيش نافذتين | ١ |
| [[GET prev]] | عداد اللي قبلها | رقم كنص، أو [[null]] |

ليه نافذتين؟ عداد الحالية هيتقري كـ «اللي فاتت» طول النافذة الجاية.

### من برّه: الـ destructuring

[[exec()]] في ioredis بيرجّع array فيها لكل أمر [[[error, result]]]:

~~~text شكل ناتج exec
[ [null, 3], [null, 1], [null, "5"] ]
~~~

و [[[[, count], , [, prevCount]]]] بيفك ده:

- [[[, count]]]: من أول عنصر، سيب الأول (الـ error) وخد التاني.
- الفاصلة لوحدها [[, ,]]: سيب العنصر التاني كله (نتيجة EXPIRE).
- [[[, prevCount]]]: من التالت، خد النتيجة.
- [[!]] في الآخر: TypeScript بيقول إن [[exec()]] ممكن يرجّع [[null]] (لو الـ transaction اتلغت بـ WATCH)، و [[!]] بتقوله «مش هنا».

---

## ٣. التقدير

~~~ts
  const elapsed = (nowSec % windowSec) / windowSec;
  const estimated = Number(prevCount ?? 0) * (1 - elapsed) + Number(count);
~~~

- [[nowSec % windowSec]]: [[%]] باقي القسمة، يعني الثواني اللي عدّت جوه النافذة الحالية. قسمتها على طول النافذة = نسبة من ٠ لـ ١.
- [[1 - elapsed]]: الجزء من النافذة اللي فاتت اللي لسه جوه آخر [[windowSec]] ثانية.
- [[prevCount ?? 0]]: لو مفيش نافذة قبلها، صفر. و [[Number()]] لأن [[GET]] بيرجّع نص.

مثال حقيقي من التجربة (الحد ٥ في ثانيتين):

~~~text نداء من التجربة
{ nowSec: '1791450593.072', w: 895725296, count: 1, prevCount: '5', elapsed: '0.536', estimated: '3.320' }
~~~

[[5 × (1 - 0.536) + 1 = 2.32 + 1 = 3.32]]: احنا في نص النافذة الحالية تقريبًا، فنص طلبات اللي فاتت لسه محسوبة.

---

## ٤. القرار

~~~ts
  if (estimated > limit) await redis.decr(cur);
  return { allowed: estimated <= limit, remaining: Math.max(0, Math.floor(limit - estimated)), resetSec: Math.ceil(windowSec - (nowSec % windowSec)) };
}
~~~

- مرفوض؟ [[DECR]] بيشيل الزيادة اللي عملناها، فالرفض ميتحسبش.
- [[remaining]]: الباقي مقرّب لتحت، ومش أقل من صفر.
- [[resetSec]]: الثواني لحد ما النافذة الحالية تخلص.

---

## ٥. الـ try

### ٧ ورا بعض (حد ٥ في ثانيتين)

~~~text الناتج
7 calls: ✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0
keys: [ 'rl:sw:u1:895725295' ] count: 5 ttl: 4
~~~

العداد ٥ مش ٧: الاتنين المرفوضين اتشالوا بالـ [[DECR]]. و [[ttl]] ٤ ثواني = نافذتين.

### بعد ٣ ثواني، ٤ كمان

~~~text الناتج (الحسبة لكل نداء)
count: 1  prevCount: 5  elapsed: 0.536  estimated: 3.320   ✓1
count: 2  prevCount: 5  elapsed: 0.537  estimated: 4.315   ✓0
count: 3  prevCount: 5  elapsed: 0.537  estimated: 5.315   ✗0   (اتعمل DECR)
count: 3  prevCount: 5  elapsed: 0.538  estimated: 5.310   ✗0
after wait: ✓1 ✓0 ✗0 ✗0
~~~

طلبين بس، لأن النافذة القديمة لسه داخلة بـ [[2.32]] طلب. لو كنا في آخر النافذة (elapsed قريب من ١)، كان هيتسمح بأكتر.

### من غير سطر الـ [[decr]]

~~~text الناتج
7 calls: ✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0
keys: [ 'rl:sw:u1:895725297' ] count: 7 ttl: 4
count: 1  prevCount: 7  elapsed: 0.538  estimated: 4.237   ✓0
count: 2  prevCount: 7  elapsed: 0.538  estimated: 5.231   ✗0
count: 3  prevCount: 7  elapsed: 0.539  estimated: 6.227   ✗0
count: 4  prevCount: 7  elapsed: 0.539  estimated: 7.224   ✗0
after wait: ✓0 ✗0 ✗0 ✗0
~~~

القديمة بقت ٧ (المرفوضين اتعدّوا)، والجديدة كمان بتكبر مع كل رفض. فطلب واحد بس عدّى بدل اتنين. ولما جرّبنا بعد ثانيتين بس (أول النافذة الجديدة)، الحالتين اترفضوا كلهم، لأن القديمة لسه داخلة بحوالي ٩٦٪ من وزنها.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| رقم النافذة | [[Math.floor(nowSec / windowSec)]] |
| زوّد وهات القديمة | [[multi().incr().expire().get().exec()]] |
| نسبة اللي عدّى | [[(nowSec % windowSec) / windowSec]] |
| التقدير | [[prev × (1 - elapsed) + count]] |
| مرفوض | [[DECR]] عشان الرفض ميتعدّش |

- عدادين لكل key بدل وقت كل طلب.
- [[EXPIRE]] بنافذتين، مش واحدة.
- [[Date.now()]] هنا من ساعة السيرفر، فالسيرفرات لازم ساعاتها متزامنة (NTP).`,
          lines: [
            "الحد لكل key في نافذة بالثواني.",
            "الوقت دلوقتي بالثواني (بكسور).",
            "رقم النافذة الحالية.",
            "عداد النافذة الحالية.",
            "عداد اللي فاتت.",
            "في أمر واحد لـ Redis: زوّد الحالية وخد عددها، وخلّيها تعيش نافذتين، وهات عداد اللي فاتت.",
            "قد إيه عدّى من النافذة الحالية (من ٠ لـ ١).",
            "التقدير: الجزء اللي لسه جوه النافذة من القديمة + كل الحالية.",
            "مرفوض؟ متحسبوش، عشان الرفض نفسه ميطوّلش القفل.",
            "رجّع: مسموح؟ وكام باقي، وإمتى النافذة الحالية تخلص.",
            "قفلة."
          ],
          sol: R`أول ٧ بحد ٥ في ثانيتين: [[✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0]].

بعد ٣ ثواني: النافذة اتغيرت، والقديمة (فيها ٥ بس لأن المرفوضين اتشالوا بالـ decr) بتتحسب بجزء من وزنها، فيتسمح بطلبين أو تلاتة حسب اللحظة بالظبط. في تجربتنا كنا في نص النافذة الجديدة تقريبًا، فطلع [[✓1 ✓0 ✗0 ✗0]].

من غير الـ decr: القديمة فيها ٧ (المرفوضين اتعدّوا)، فالتقدير بيبدأ أعلى، وفي نفس اللحظة عدّى طلب واحد بس ([[✓0 ✗0 ✗0 ✗0]])، ولو جربت بعد ثانيتين بس كل التانية بتترفض. ده اللي قصدنا بـ «الرفض بيطوّل القفل».`
        },
        {
          cmd: "quota لكل plan",
          title: "حدود مختلفة لكل خطة، وheaders بتقول للعميل وضعه",
          desc: R`في API بتبيعه، الحدود جزء من المنتج: الخطة المجانية ١٠ طلبات في الثانية و ١٠٠٠ في الشهر، والـ Pro أكتر بكتير. فيه نوعين: rate limit قصير (حماية السيرفر، burst) و quota طويلة (شهرية، مربوطة بالفلوس).

والعميل لازم يعرف هو فين من غير ما يخمّن: headers في كل رد بتقول الحد وكام باقي، و 429 معاها [[Retry-After]].`,
          example: R`const PLANS = {
  free: { burst: 10, perSecond: 1, monthly: 1_000 },
  pro: { burst: 100, perSecond: 20, monthly: 1_000_000 },
} as const;
export async function planLimits(req: Request, res: Response, next: NextFunction) {
  const plan = PLANS[req.apiKey.plan];
  const rl = await takeToken(req.apiKey.id, plan.burst, plan.perSecond);
  res.set("RateLimit-Policy", $__bt"burst";q=$__{plan.burst};w=$__{Math.ceil(plan.burst / plan.perSecond)}$__bt);
  res.set("RateLimit", $__bt"burst";r=$__{rl.remaining};t=$__{rl.retryAfter}$__bt);
  if (!rl.allowed) return res.status(429).set("Retry-After", String(rl.retryAfter)).json({ title: "Too Many Requests", status: 429 });
  const qKey = $__btquota:$__{req.apiKey.id}:$__{new Date().toISOString().slice(0, 7)}$__bt;
  const [[, used]] = (await redis.multi().incr(qKey).expire(qKey, 32 * 86400, "NX").exec())!;
  res.set("X-Quota-Remaining", String(Math.max(0, plan.monthly - Number(used))));
  if (Number(used) > plan.monthly) return res.status(429).json({ title: "Monthly quota exceeded", status: 429, detail: $__btPlan $__{req.apiKey.plan}: $__{plan.monthly} requests/month$__bt });
  next();
}`,
          try: R`حط الـ middleware على endpoint، وابعت ١٢ طلب بمفتاح free بسرعة ([[for i in $(seq 12); do curl -s -o /dev/null -w '%{http_code} ' ...; done]]). وبعدين [[curl -i]] وشوف الـ headers في حالة 429، واطلب بمفتاح pro وقارن.`,
          flag: "script",
          deep: {
            why: "من غير headers، العميل بيكتشف الحد لما يقع فيه، وبيعمل retry فوري فيتقفل أكتر. ومن غير quota مربوطة بالخطة، مفيش فرق بين المجاني والمدفوع، ومفيش سبب حد يرقّي. وأي API فيه AI أو SMS لازم quota، وإلا عميل مجاني واحد يصرف ميزانية الشهر في يوم.",
            how: R`طبقتين بسبب مختلف:

rate limit (token bucket من درسين فاتوا): بيحمي السيرفر من الضغط اللحظي. الرفض مؤقت، و [[Retry-After]] بالثواني.

quota شهرية: عداد لكل مفتاح لكل شهر ([[quota:key:2026-09]]). [[INCR]] atomic، و [[EXPIRE ... NX]] (Redis 7 وأحدث) بيحط مدة للـ key أول مرة بس، فالعداد بيتمسح لوحده بعد الشهر. الرفض هنا مش «استنى ثانية»، ده «رقّي أو استنى الشهر الجاي»، عشان كده الرسالة مختلفة.

الـ headers: فيه draft في IETF لـ headers موحّدة: [[RateLimit-Policy]] بيوصف السياسة ([[q]] الحصة، و [[w]] النافذة بالثواني)، و [[RateLimit]] بيوصف الحالة ([[r]] الباقي، و [[t]] الثواني لحد ما يتجدد). الشكل اتغير بين نسخ الـ draft (النسخ القديمة كانت [[RateLimit-Limit]] و [[RateLimit-Remaining]] و [[RateLimit-Reset]] منفصلين، ودي اللي GitHub وغيره بيبعتوها بـ [[X-]] قبلها)، فاختار شكل وثبّته في التوثيق. [[Retry-After]] نفسه standard قديم ومفهوم لكل المكتبات.

فين تخزّن الـ usage للفواتير؟ Redis للعدّ السريع والحد، بس الأرقام اللي بتحاسب بيها لازم تتسجل في القاعدة (job كل ساعة ينقل العدادات، أو event لكل طلب في جدول usage). Redis مش مصدر الحقيقة للفلوس.

الحد لكل endpoint: [[GET /things]] رخيص، و [[POST /reports]] غالي. ممكن تدّي كل endpoint «تكلفة» وتسحب من الجردل أكتر من token، أو quota منفصلة للحاجات الغالية.

وافصل الـ quota عن الـ rate limit في الـ monitoring: عميل بيوصل للـ quota = فرصة بيع، وعميل بيوصل للـ rate limit كتير = يمكن الـ SDK بتاعه بيعمل retry غلط.`,
            when: "أي API ليه خطط أو عملاء خارجيين، أو أي ميزة بتكلّفك فلوس لكل استخدام.",
            mistakes: R`429 من غير [[Retry-After]]، فالعميل بيعيد فورًا. ورسالة واحدة للـ rate limit والـ quota فالعميل ميعرفش يستنى ثانية ولا شهر. والـ quota في Redis بس من غير سجل في القاعدة، ويوم Redis يقع تضيع أرقام الفواتير. وتعدّ الطلبات اللي فشلت بـ 5xx من عندك في quota العميل. و EXPIRE من غير NX فكل طلب بيمدّ عمر الـ key ومبيتمسحش أبدًا.`
          },
          teach: R`## طبقتين في middleware واحد: ثانية بثانية، وشهر بشهر

[[planLimits]] middleware بيشتغل بعد التحقق من الـ API key. بيجيب حدود خطة العميل، وبيعدّي الطلب على حاجتين: token bucket للسرعة اللحظية (من درسين فاتوا)، وعداد شهري للـ quota. وفي الطريق بيحط headers بتقول للعميل هو فين.

اتجرّب على ويندوز 11: Express 5.2.1 و ioredis 6.0 على Node 24.19 (بورت ٦٠١٢)، و Redis 8.10 في Docker. [[takeToken]] هي بتاعة درس [[token bucket في Redis]] بالظبط، و [[req.apiKey]] كان بيتحط من middleware صغير بيقرا [[Bearer sk_free]] أو [[Bearer sk_pro]] (المفاتيح الحقيقية في درس [[API keys]]). و curl 8.22 من Git Bash، و PowerShell 7.6.

---

## ١. الخطط

~~~ts
const PLANS = {
  free: { burst: 10, perSecond: 1, monthly: 1_000 },
  pro: { burst: 100, perSecond: 20, monthly: 1_000_000 },
} as const;
~~~

- [[burst]]: سعة الجردل (كام طلب مرة واحدة).
- [[perSecond]]: معدل الملي.
- [[monthly]]: الـ quota الشهرية. و [[1_000_000]] = مليون، الـ [[_]] للقراية بس.
- [[as const]]: بيخلي TypeScript يعامل القيم كثابتة، فـ [[PLANS["free"]]] نوعه بالظبط القيم دي، و [[req.apiKey.plan]] لازم يبقى [["free"]] أو [["pro"]].

---

## ٢. الـ rate limit والـ headers

~~~ts
export async function planLimits(req: Request, res: Response, next: NextFunction) {
  const plan = PLANS[req.apiKey.plan];
  const rl = await takeToken(req.apiKey.id, plan.burst, plan.perSecond);
~~~

[[next]] الدالة اللي بتعدّي للـ middleware أو الـ handler اللي بعده. والجردل باسم الـ key ([[rl:tb:key_free]] في Redis)، مش الـ IP.

~~~ts
  res.set("RateLimit-Policy", $__bt"burst";q=$__{plan.burst};w=$__{Math.ceil(plan.burst / plan.perSecond)}$__bt);
  res.set("RateLimit", $__bt"burst";r=$__{rl.remaining};t=$__{rl.retryAfter}$__bt);
~~~

شكل الـ headers من draft الـ IETF ([[draft-ietf-httpapi-ratelimit-headers]]):

| الجزء | معناه | free |
|---|---|---|
| [["burst"]] | اسم السياسة (ممكن يبقى فيه أكتر من واحدة) | |
| [[q=10]] | quota: الحصة | ١٠ |
| [[w=10]] | window: الثواني اللي الحصة بتتملى فيها كلها ([[10 / 1]]) | ١٠ |
| [[r=]] | remaining: الباقي دلوقتي | |
| [[t=]] | الثواني لحد ما يبقى فيه تاني | |

~~~ts
  if (!rl.allowed) return res.status(429).set("Retry-After", String(rl.retryAfter)).json({ title: "Too Many Requests", status: 429 });
~~~

[[Retry-After]] header قديم ومعروف لكل المكتبات: «استنى كام ثانية». و [[String(...)]] لأن قيم الـ headers نصوص.

---

## ٣. الـ quota الشهرية

~~~ts
  const qKey = $__btquota:$__{req.apiKey.id}:$__{new Date().toISOString().slice(0, 7)}$__bt;
~~~

[[new Date().toISOString()]] بيرجّع [[2026-10-08T09:13:43.272Z]]، و [[.slice(0, 7)]] أول ٧ حروف: [[2026-10]]. فالـ key [[quota:key_free:2026-10]]، وأول الشهر الجاي key جديد يبدأ من صفر. (ده بتوقيت UTC.)

~~~ts
  const [[, used]] = (await redis.multi().incr(qKey).expire(qKey, 32 * 86400, "NX").exec())!;
~~~

- [[INCR]]: زوّد ورجّع العدد الجديد. و [[[[, used]]]] بياخد نتيجة أول أمر من [[[[null, 7], [null, 1]]]].
- [[EXPIRE key 2764800 NX]]: [[32 * 86400]] = ٣٢ يوم بالثواني. و [[NX]] (Redis 7 وأحدث): حط المدة **بس لو مفيش مدة**. فالمدة بتتحط مع أول طلب في الشهر ومتتمدّش مع كل طلب. ليه ٣٢؟ أطول شهر ٣١ يوم، والزيادة سماح.

~~~ts
  res.set("X-Quota-Remaining", String(Math.max(0, plan.monthly - Number(used))));
  if (Number(used) > plan.monthly) return res.status(429).json({ title: "Monthly quota exceeded", status: 429, detail: $__btPlan $__{req.apiKey.plan}: $__{plan.monthly} requests/month$__bt });
  next();
}
~~~

[[>]] مش [[>=]]: الطلب رقم ١٠٠٠ مسموح، والـ ١٠٠١ لأ. والرد هنا من غير [[Retry-After]] ورسالته مختلفة، لأن الحل مش «استنى ثانية».

---

## ٤. الـ try

~~~bash
for i in $(seq 12); do curl -s -o /dev/null -w '%{http_code} ' -H 'Authorization: Bearer sk_free' localhost:6012/v1/orders; done; echo
~~~

- [[$(seq 12)]]: الأرقام من ١ لـ ١٢، فالـ loop بيلف ١٢ مرة.
- [[-o /dev/null]]: ارمي الـ body.
- [[-w '%{http_code} ']]: اطبع الـ status بس ومسافة.

~~~text الناتج
200 200 200 200 200 200 200 200 200 200 429 429
~~~

وبعدها على طول [[curl -si]] ([[-i]] بيطبع الـ headers):

~~~text الناتج
HTTP/1.1 429 Too Many Requests
RateLimit-Policy: "burst";q=10;w=10
RateLimit: "burst";r=0;t=1
Retry-After: 1
Content-Type: application/json; charset=utf-8
Content-Length: 42

{"title":"Too Many Requests","status":429}
~~~

وبمفتاح pro:

~~~text الناتج
HTTP/1.1 200 OK
RateLimit-Policy: "burst";q=100;w=5
RateLimit: "burst";r=99;t=0
X-Quota-Remaining: 999999
~~~

[[w=5]] لأن [[100 / 20]]. وجوه Redis:

~~~bash
docker exec teach-apis0304-redis redis-cli get quota:key_free:2026-10
docker exec teach-apis0304-redis redis-cli ttl quota:key_free:2026-10
~~~

~~~text الناتج
10
2764799
~~~

العداد ١٠ مش ١٣: الطلبات اللي اترفضت من الـ rate limit مبتوصلش للـ quota. و [[ttl]] حوالي ٣٢ يوم.

### الـ quota نفسها

شغّلنا السيرفر بـ [[monthly: 3]] للخطة المجانية عشان نوصل للحد بسرعة:

~~~text الناتج
X-Quota-Remaining: 2 [{"id":"9001"}] 200
X-Quota-Remaining: 1 [{"id":"9001"}] 200
X-Quota-Remaining: 0 [{"id":"9001"}] 200
X-Quota-Remaining: 0 {"title":"Monthly quota exceeded","status":429,"detail":"Plan free: 3 requests/month"} 429
~~~

و [[ttl]] بعد ٤ طلبات فضل [[2764800]]: الـ [[NX]] منعت كل طلب إنه يمدّ المدة.

### من PowerShell

~~~powershell
$h = @{ Authorization = 'Bearer sk_free' }
1..12 | % { (Invoke-WebRequest http://localhost:6012/v1/orders -Headers $h -SkipHttpErrorCheck).StatusCode } | Join-String -Separator ' '
$r = Invoke-WebRequest http://localhost:6012/v1/orders -Headers $h -SkipHttpErrorCheck
$r.Headers['Retry-After']; $r.Headers['RateLimit']
~~~

- [[@{ }]] hashtable للـ headers. و [[%]] اختصار [[ForEach-Object]].
- [[-SkipHttpErrorCheck]] (PowerShell 7 بس): من غيره 429 بيرمي error بدل ما يرجّع الرد.
- [[Join-String]] بيلزق النتايج في سطر.

~~~text الناتج (PowerShell 7.6)
200 200 200 200 200 200 200 200 200 200 429 429
1
"burst";r=0;t=1
~~~

---

## الخلاصة

| الطبقة | الحد | الـ key في Redis | الرد لو عدّى |
|---|---|---|---|
| rate limit | [[burst]] و [[perSecond]] | [[rl:tb:<id>]] | 429 + [[Retry-After]] |
| quota | [[monthly]] | [[quota:<id>:2026-10]] | 429 + «رقّي أو استنى الشهر» |

- الـ headers في كل رد، مش في الرفض بس.
- [[EXPIRE ... NX]] عشان المدة تتحط مرة.
- Redis للعدّ، والأرقام اللي بتحاسب بيها تتسجل في القاعدة.`,
          lines: [
            "الخطط في مكان واحد.",
            "المجانية: burst ١٠، وواحد في الثانية، وألف في الشهر.",
            "Pro.",
            "قفلة.",
            "middleware بعد الـ auth بالـ API key (req.apiKey موجود).",
            "حدود خطة العميل ده.",
            "rate limit قصير بالـ token bucket.",
            "headers السياسة: الحصة ومدة ما الجردل يتملى.",
            "headers الحالة: كام باقي، وبعد كام ثانية.",
            "مرفوض؟ 429 و Retry-After، بشكل problem+json.",
            "key الـ quota: المفتاح والشهر (2026-09).",
            "زوّد العداد، وحط له مدة أول مرة بس (NX).",
            "قول للعميل كام باقي في الشهر.",
            "خلص الشهر؟ 429 برسالة مختلفة: دي مش «استنى ثانية».",
            "كمّل.",
            "قفلة."
          ],
          sol: R`بمفتاح free: [[200]] عشر مرات وبعدين [[429 429]]. و [[curl -i]] في حالة 429 بيطلّع:

[[RateLimit-Policy: "burst";q=10;w=10]]
[[RateLimit: "burst";r=0;t=1]]
[[Retry-After: 1]]

وبمفتاح pro: [[RateLimit-Policy: "burst";q=100;w=5]] و [[RateLimit: "burst";r=99;t=0]] و [[X-Quota-Remaining: 999999]].

لو [[expire ... NX]] رمى [[ERR syntax error]]، الـ Redis عندك أقدم من 7. يا ترقّيه (الـ lab بتاع التاب ده redis:8)، يا تعمل [[EXPIRE]] بس لما [[used === 1]].`
        }
      ]
    },
    {
      t: "Queues والأحداث",
      l: 3,
      n: "queue ولا pub/sub ولا stream، ولما الـ job تفشل كل المحاولات تروح فين، وإزاي تحفظ في القاعدة وتنشر event من غير ما واحد منهم يضيع",
      items: [
        {
          cmd: "queue ولا pub/sub ولا stream",
          title: "تلات طرق لتوصيل رسالة، وكل واحدة لحاجة",
          desc: R`queue: كل رسالة بيستلمها worker واحد بس، ولو محدش فاضي بتستنى. ده شغل لازم يتعمل مرة (إيميل، أو صورة). BullMQ (درس [[background jobs]] في تاب «بناء مشروع كامل») queue فوق Redis.

pub/sub: كل المشتركين دلوقتي بيستلموا الرسالة، واللي مش متصل لحظتها ضاعت عليه. ده للإشعارات اللحظية (الـ Redis adapter في المستوى ٢).

stream: log متخزن بالترتيب، وكل مجموعة مستهلكين (consumer group) ليها مكانها فيه. كل مجموعة بتشوف كل الرسايل، وجوه المجموعة كل رسالة لواحد بس. ولو حد وقع، رسايله بتفضل pending لحد ما حد يأكدها. Redis Streams و Kafka من النوع ده.`,
          example: R`redis-cli PUBLISH order.paid '{"orderId":9001}'
redis-cli LPUSH jobs '{"type":"receipt","orderId":9001}'
redis-cli BRPOP jobs 5
redis-cli XADD orders '*' type paid orderId 9001
redis-cli XGROUP CREATE orders emails 0
redis-cli XGROUP CREATE orders analytics 0
redis-cli XREADGROUP GROUP emails worker-1 COUNT 10 STREAMS orders '>'
redis-cli XREADGROUP GROUP analytics a-1 COUNT 10 STREAMS orders '>'
redis-cli XPENDING orders emails
redis-cli XACK orders emails 1790714741624-0`,
          try: R`شغّل الأوامر بالترتيب (مع Redis من الـ lab). لاحظ رقم الـ PUBLISH، وإن BRPOP رجّع الـ job. وبعد الـ XADD خد الـ id اللي رجع واستخدمه في XACK. وبعدين افتح terminal تاني فيه [[redis-cli SUBSCRIBE order.paid]] وكرر الـ PUBLISH.`,
          deep: {
            why: "اختيار النوع الغلط بيعمل bugs مبتبانش غير تحت الضغط: إيميلات بتتبعت مرتين لأن كل السيرفرات مشتركة في pub/sub، أو أحداث بتضيع وقت deploy لأن pub/sub مبيخزّنش، أو خدمة جديدة محتاجة الأحداث القديمة ومفيش مكان فيه تاريخ.",
            how: R`queue ([[LPUSH]] و [[BRPOP]]، أو BullMQ): الرسالة بتتشال لما worker ياخدها. عشرة workers = الشغل بيتقسم عليهم. BullMQ بيضيف retries، و delays، وأولويات، وحالة لكل job، وبيحمي من إن الـ job تضيع لو الـ worker وقع في النص (بترجع للـ queue بعد ما الـ lock بتاعها يخلص).

pub/sub ([[PUBLISH]] و [[SUBSCRIBE]]): fire-and-forget. الرقم اللي PUBLISH بيرجّعه = عدد المشتركين اللي استلموا. صفر يعني الرسالة راحت في الفاضي. سريع جدًا ومناسب لـ «ابعت لكل السيرفرات دلوقتي» (امسح الكاش المحلي، أو وصّل socket)، ومش مناسب لأي حاجة لازم تتعمل.

stream ([[XADD]] و [[XREADGROUP]] و [[XACK]]): الرسايل متخزنة بـ ids متزايدة (الـ id فيه الوقت بالملّي ثانية). كل consumer group بيعرف آخر حاجة اتسلمتله. الـ [[>]] معناها «رسايل جديدة محدش في المجموعة استلمها». الرسالة بتفضل في الـ PEL (pending entries list) لحد [[XACK]]. لو worker وقع، رسالته pending، وحد تاني ياخدها بـ [[XAUTOCLAIM]] بعد مدة. والمجموعة الجديدة تقدر تبدأ من الأول (الـ [[0]] في XGROUP CREATE) وتقرا التاريخ كله. و [[MAXLEN]] مع XADD بيحدد الحجم عشان الـ stream ميكبرش للأبد.

Kafka و Redpanda: نفس فكرة الـ stream على نطاق ضخم، بـ partitions وتخزين على disk لأيام أو أسابيع. RabbitMQ: queues و exchanges (routing مرن) وفيه streams كمان. و SQS/SNS في AWS: SQS queue و SNS pub/sub. ومعظم المشاريع الصغيرة والمتوسطة BullMQ أو Redis Streams كفاية.

القاعدة: «لازم يتعمل مرة» = queue. «كل اللي مهتم يعرف، ولو فاته مش مهم» = pub/sub. «كل خدمة لازم تشوف كل حدث، بالترتيب، حتى لو كانت واقعة» = stream.

وكل التلاتة at-least-once في أحسن الأحوال: الرسالة ممكن توصل مرتين (worker عمل الشغل ووقع قبل الـ ACK). فالمستهلك لازم يبقى idempotent (نفس فكرة Idempotency-Key في المستوى ١، بالـ event id).`,
            when: "queue للشغل في الخلفية. pub/sub للإشارات اللحظية بين السيرفرات. stream لما أكتر من خدمة محتاجة نفس الأحداث، أو محتاج replay، أو event sourcing.",
            mistakes: R`pub/sub لإرسال إيميلات (كل سيرفر مشترك بيبعت، أو محدش مشترك وقت الـ deploy فمحدش بيبعت). و stream من غير XACK فالـ PEL بيكبر، ومن غير MAXLEN فالذاكرة بتكبر. وتفتكر إن أي واحد فيهم exactly-once. وسؤال انترفيو: «الفرق بين Kafka و RabbitMQ؟»: Kafka log متخزن والمستهلك بيحدد مكانه ويقدر يرجع، و RabbitMQ broker بيوزّع الرسايل ويشيلها بعد الـ ACK.`
          },
          teach: R`## نفس الرسالة، ٣ طرق توصيل في Redis

الأوامر بتبعت نفس الحدث «الطلب ٩٠٠١ اتدفع» بالتلات طرق: [[PUBLISH]] (pub/sub)، و [[LPUSH]] و [[BRPOP]] (queue بسيطة على list)، و [[XADD]] و [[XREADGROUP]] و [[XACK]] (stream بمجموعات مستهلكين). هنشغّلهم بالترتيب ونشوف كل واحد بيعمل إيه في الرسالة.

اتجرّب على Redis 8.10 في Docker ([[redis:8-alpine]])، والأوامر اتبعتت بـ [[docker exec -t <container> redis-cli ...]] من Git Bash على ويندوز 11 (الـ [[-t]] بيخلي [[redis-cli]] يطبع الشكل المقروء زي [[(integer) 1]]). نفس الأوامر بالظبط بتشتغل من PowerShell بـ [[docker exec]]، ولو [[redis-cli]] متسطب عندك اكتبها من غير [[docker exec]].

---

## ١. pub/sub: [[PUBLISH]]

~~~bash
redis-cli PUBLISH order.paid '{"orderId":9001}'
~~~

[[PUBLISH channel message]]: ابعت الرسالة لكل اللي مشتركين في الـ channel دلوقتي. [[order.paid]] اسم الـ channel (أي اسم، والنقطة مجرد عادة). والـ JSON بين [[' ']] عشان الـ shell ميلمسش علامات التنصيص اللي جواه.

~~~text الناتج
(integer) 0
~~~

[[0]] = عدد المشتركين اللي استلموا. محدش كان مشترك، فالرسالة راحت ومحدش هيشوفها أبدًا. Redis مبيخزّنهاش.

### ومع مشترك

فتحنا [[SUBSCRIBE]] في الخلفية جوه الـ container، وبعد ثانية عملنا نفس الـ PUBLISH:

~~~bash
redis-cli SUBSCRIBE order.paid
~~~

~~~text الناتج (الـ PUBLISH، وبعده اللي طبعه المشترك)
1
subscribe
order.paid
1
message
order.paid
{"orderId":9001}
~~~

الـ PUBLISH رجّع [[1]]. والمشترك طبع تأكيد الاشتراك ([[subscribe]] والـ channel وعدد اشتراكاته)، وبعدين الرسالة: النوع [[message]]، والـ channel، والمحتوى.

---

## ٢. queue: [[LPUSH]] و [[BRPOP]]

~~~bash
redis-cli LPUSH jobs '{"type":"receipt","orderId":9001}'
redis-cli BRPOP jobs 5
~~~

- [[LPUSH list value]]: حط في **أول** الـ list (L = left). الرد طول الـ list بعدها.
- [[BRPOP list timeout]]: خد من **آخر** الـ list (R = right)، و [[B]] = blocking: لو فاضية استنى لحد [[5]] ثواني. اليمين والشمال مع بعض = أول واحد دخل أول واحد يطلع (FIFO).

~~~text الناتج
(integer) 1
1) "jobs"
2) "{\"type\":\"receipt\",\"orderId\":9001}"
~~~

[[BRPOP]] بيرجّع اسم الـ list (عشان ممكن تستنى على أكتر من list) والقيمة. والـ [[\"]] دي طريقة [[redis-cli]] في عرض علامة تنصيص جوه نص.

وكررنا [[BRPOP jobs 5]]:

~~~text الناتج (بعد ٥ ثواني بالظبط، real 0m5.253s)
(nil)
~~~

الـ job اتشالت أول مرة. لو عندك ١٠ workers بيعملوا BRPOP، واحد بس هياخدها.

---

## ٣. stream: الحدث

~~~bash
redis-cli XADD orders '*' type paid orderId 9001
~~~

[[XADD stream id field value ...]]: ضيف entry للـ stream اسمه [[orders]] (بيتعمل لوحده أول مرة). و [[*]] معناها «Redis يولّد الـ id»، وبين [[' ']] عشان الـ shell ميحوّلهاش لأسامي ملفات. وبعدها أزواج: [[type=paid]] و [[orderId=9001]].

~~~text الناتج
"1791450694847-0"
~~~

الـ id جزئين: الوقت بالملّي ثانية ([[1791450694847]] = 2026-10-08 09:11:34 UTC)، ورقم تسلسل لو اتضاف أكتر من واحد في نفس الملّي.

---

## ٤. مجموعتين مستهلكين

~~~bash
redis-cli XGROUP CREATE orders emails 0
redis-cli XGROUP CREATE orders analytics 0
~~~

[[XGROUP CREATE stream group start]]: مجموعة اسمها [[emails]] وتانية [[analytics]]. و [[0]] = ابدأوا من أول الـ stream (يعني هيشوفوا الحدث اللي اتضاف قبلهم). لو كتبت [[$]] بدل [[0]]، المجموعة تشوف اللي هيتضاف بعد كده بس.

~~~text الناتج
OK
OK
~~~

---

## ٥. القراية

~~~bash
redis-cli XREADGROUP GROUP emails worker-1 COUNT 10 STREAMS orders '>'
redis-cli XREADGROUP GROUP analytics a-1 COUNT 10 STREAMS orders '>'
~~~

| الحتة | معناها |
|---|---|
| [[GROUP emails worker-1]] | أنا [[worker-1]] في مجموعة [[emails]] (اسم الـ consumer أي اسم، وبيتعمل أول مرة) |
| [[COUNT 10]] | لحد ١٠ رسايل |
| [[STREAMS orders]] | من الـ stream ده |
| [[>]] | الرسايل اللي محدش في المجموعة استلمها لسه. بين [[' ']] عشان [[>]] في الـ shell معناها «اكتب في ملف» |

~~~text الناتج (الاتنين نفس الشكل)
1) 1) "orders"
   2) 1) 1) "1791450694847-0"
         2) 1) "type"
            2) "paid"
            3) "orderId"
            4) "9001"
~~~

الشكل متداخل: الـ stream، وجواه الرسايل، وكل رسالة id وأزواج. المجموعتين استلموا **نفس** الرسالة: كل مجموعة ليها مكانها في الـ stream.

وكررنا القراية لـ [[emails]]:

~~~text الناتج
(nil)
~~~

جوه المجموعة الواحدة، الرسالة بتتسلم مرة.

---

## ٦. الـ pending والتأكيد

~~~bash
redis-cli XPENDING orders emails
~~~

~~~text الناتج
1) (integer) 1
2) "1791450694847-0"
3) "1791450694847-0"
4) 1) 1) "worker-1"
      2) "1"
~~~

عدد الرسايل اللي اتسلمت ومتأكدتش ([[1]])، وأصغر وأكبر id فيهم، وكل consumer عنده كام. الرسالة دي في الـ PEL (Pending Entries List): لو [[worker-1]] وقع دلوقتي، حد تاني ياخدها بـ [[XAUTOCLAIM]].

~~~bash
redis-cli XACK orders emails 1790714741624-0
redis-cli XACK orders emails 1791450694847-0
redis-cli XPENDING orders emails
~~~

~~~text الناتج
(integer) 0
(integer) 1
1) (integer) 0
2) (nil)
3) (nil)
4) (nil)
~~~

- أول [[XACK]] بالـ id اللي في المثال: [[0]]، لأن الـ id ده مش عندنا. لازم تستخدم الـ id اللي رجع من الـ XADD بتاعك.
- التاني بالـ id الصح: [[1]] = اتأكدت رسالة واحدة.
- [[XPENDING]] بقى صفر.

ومجموعة [[analytics]] لسه عندها الرسالة pending، لأنها مأكدتش. كل مجموعة مستقلة.

---

## الخلاصة

| | pub/sub | queue (list) | stream |
|---|---|---|---|
| الأوامر | [[PUBLISH]] و [[SUBSCRIBE]] | [[LPUSH]] و [[BRPOP]] | [[XADD]] و [[XREADGROUP]] و [[XACK]] |
| مين بيستلم | كل المشتركين **دلوقتي** | worker واحد | كل مجموعة، وواحد جوه المجموعة |
| لو محدش موجود | الرسالة ضاعت ([[0]]) | بتستنى في الـ list | بتستنى في الـ stream |
| بعد الاستلام | خلاص | اتشالت | pending لحد [[XACK]] |
| تاريخ | لأ | لأ | أيوه، مجموعة جديدة تبدأ من [[0]] |

- الرقم اللي PUBLISH بيرجّعه = كام واحد سمع.
- [[XACK]] بالـ id بتاعك، و [[0]] معناها الـ id غلط.`,
          lines: [
            "pub/sub: انشر. الرقم اللي بيرجع = كام مشترك استلم (غالبًا ٠ دلوقتي، فالرسالة ضاعت).",
            "queue بسيطة: حط job في list.",
            "worker بياخدها (ويستنى لحد ٥ ثواني لو فاضية). اتشالت من الـ list، ومحدش تاني هياخدها.",
            "stream: ضيف حدث. الـ * معناها Redis يولّد id فيه الوقت.",
            "مجموعة مستهلكين للإيميلات، تبدأ من أول الـ stream.",
            "ومجموعة تانية للتحليلات: هتشوف نفس الأحداث بشكل مستقل.",
            "worker في مجموعة الإيميلات ياخد الرسايل الجديدة.",
            "ومجموعة التحليلات تاخد نفس الرسالة.",
            "الرسايل اللي اتسلمت لمجموعة الإيميلات ولسه محدش أكدها.",
            "أكّد إن الرسالة خلصت (بالـ id اللي رجع من XADD عندك). بعدها بتتشال من الـ pending."
          ],
          sol: R`الـ PUBLISH بيرجّع [[0]] لو مفيش حد عامل SUBSCRIBE: الرسالة اتنشرت ومحدش سمعها، وخلاص ضاعت. ولما تفتح terminal بـ SUBSCRIBE وتعيد، بيرجّع [[1]] والـ terminal التاني يطبعها.

الـ BRPOP بيرجّع اسم الـ list والـ job. لو عملته تاني، هيستنى ٥ ثواني ويرجع [[(nil)]]: الـ job اتاخدت مرة واحدة.

الـ XADD بيرجّع id زي [[1790714741624-0]]. المجموعتين كل واحدة بتستلم نفس الرسالة. XPENDING لمجموعة الإيميلات بيقول [[1]] ومعاه اسم الـ worker. بعد XACK بالـ id بتاعك (مش اللي في المثال)، XPENDING يرجع [[0]]. ولو XACK رجّع [[0]]، الـ id غلط.`
        },
        {
          cmd: "dead-letter queue",
          title: "الـ job اللي فشلت كل محاولاتها تروح فين",
          desc: R`الـ job بتتعاد لحد [[attempts]] (درس [[background jobs]] في «بناء مشروع كامل»). بس لو فشلت كل المحاولات؟ لو سبتها في failed وخلاص، محدش هيبص عليها. الـ dead-letter queue (DLQ) مكان منفصل للرسايل «الميتة»: بتروحله بكل تفاصيلها وسبب الفشل، وفيه alert، وحد يبص ويصلّح ويرجّعها (redrive).

وفيه أخطاء ملهاش لازمة تتعاد أصلًا (العميل مسح الـ endpoint، أو الداتا بايظة): دي ترمي [[UnrecoverableError]] فتفشل فورًا من غير retries.`,
          example: R`import { Queue, Worker, UnrecoverableError } from "bullmq";
const webhooks = new Queue("webhooks", { connection, defaultJobOptions: { attempts: 8, backoff: { type: "exponential", delay: 30_000 } } });
const dead = new Queue("webhooks-dead", { connection });
const worker = new Worker("webhooks", async (job) => {
  const res = await deliver(job.data);
  if (res.status === 410) throw new UnrecoverableError("endpoint gone");
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
}, { connection, concurrency: 20 });
worker.on("failed", async (job, err) => {
  if (!job || (job.attemptsMade < (job.opts.attempts ?? 1) && !(err instanceof UnrecoverableError))) return;
  await dead.add("dead", { queue: job.queueName, jobId: job.id, data: job.data, error: err.message, failedAt: new Date().toISOString() });
  alerts.notify($__btwebhook job $__{job.id} is dead: $__{err.message}$__bt);
});
export async function redrive(limit = 100) {
  for (const j of await dead.getJobs(["waiting"], 0, limit - 1)) {
    await webhooks.add("deliver", j.data.data);
    await j.remove();
  }
}`,
          try: R`اعمل job بـ URL بيرجّع 500 دايمًا، بـ [[attempts: 3]] و delay ١٠٠ ملّي ثانية للتجربة. بعد ثانيتين اطبع اللي في الـ DLQ. وبعدين صلّح الـ URL (خلّي السيرفر يرجع 200) ونادي [[redrive()]].`,
          flag: "script",
          deep: {
            why: "من غير DLQ الفشل صامت: webhook لعميل مبيوصلش من أسبوع، أو إيصال دفع متبعتش، ومحدش يعرف غير لما العميل يشتكي. الـ DLQ بيحوّل «فشل» لـ «مهمة ليها صاحب»: فيه alert، وفيه مكان تشوف فيه كل الحالات، وزرار تعيدها.",
            how: R`الـ event [[failed]] على الـ Worker بيتنادى مع كل فشل، حتى لو لسه فيه محاولات. [[job.attemptsMade]] عدد المحاولات اللي حصلت، و [[job.opts.attempts]] الحد. لما يوصلوا لبعض (أو الخطأ Unrecoverable)، دي آخر مرة، فتنقلها للـ DLQ.

ليه queue منفصلة ومش سيبها في failed؟ الـ failed set في BullMQ بيتنضف بـ [[removeOnFail]]، وبيختلط فيه كل حاجة. الـ DLQ ليها صلاحيات وتنبيهات ولوحة (Bull Board بيعرضها زي أي queue). وتقدر تحط فيها سياق زيادة: السبب، والوقت، ومين العميل.

[[UnrecoverableError]]: BullMQ بيفهمه وبيوقف الـ retries فورًا. استخدمه لأي خطأ الإعادة مش هتحله: 4xx من العميل (غير 408 و 429)، أو داتا مش valid، أو resource اتمسح.

الـ redrive: بعد ما تصلّح السبب، ترجّع الـ jobs للـ queue الأصلية. خليه على دفعات وبـ rate معقول، عشان ١٠ آلاف job ميتعادوش في ثانية واحدة ويوقعوا اللي لسه قايم. ولو السبب لسه موجود، هيرجعوا للـ DLQ تاني.

خلي بالك: [[worker.on("failed")]] بيشتغل في process الـ worker. لو الـ worker وقع بين الفشل والإضافة للـ DLQ، ممكن تفوتك. للحالات الحساسة [[QueueEvents]] (بيسمع من Redis لكل الـ workers)، أو تعمل الإضافة جوه الـ processor نفسه قبل ما ترمي آخر مرة.

في الأنظمة التانية: SQS فيه redrive policy جاهزة (بعد N مرات تروح لـ queue تانية)، و RabbitMQ فيه dead-letter exchange، و Kafka مفيهوش DLQ built-in والناس بتعمل topic منفصل للرسايل البايظة.`,
            when: "أي queue فيها شغل مهم للعميل أو للفلوس: webhooks، وإيصالات، ومزامنة مع أنظمة تانية.",
            mistakes: R`retries لا نهائية على خطأ مش مؤقت (ضغط على السيرفر التاني على الفاضي). و DLQ من غير alert ولا حد بيبص عليها (بقت مقبرة). و redrive للكل مرة واحدة. وتنقل للـ DLQ مع كل فشل، مش آخر فشل بس. وتحط الـ payload كامل وفيه بيانات حساسة في DLQ مفتوحة لكل الفريق.`
          },
          teach: R`## queue للشغل، و queue تانية للي مات

المثال فيه queue أصلية للـ webhooks بمحاولات وانتظار متزايد، و worker بيوصّل. ومع كل فشل، listener بيسأل: «دي آخر مرة؟». لو أيوه، بينقل الـ job بكل تفاصيلها لـ queue تانية (الـ DLQ) وينبّه حد. وفي الآخر دالة [[redrive]] بترجّع الميتين للـ queue الأصلية بعد ما السبب يتصلّح.

اتجرّب على ويندوز 11: BullMQ 6.3 على Node 24.19، و Redis 8.10 في Docker. [[deliver]] كانت [[fetch]] POST لسيرفر تجربة على بورت ٦٠١٣ بيرجّع 500 دايمًا، ومسار [[/gone]] بيرجّع 410. و [[alerts.notify]] كانت [[console.log]]. وزي ما الـ try بيقول، خلينا [[attempts: 3]] و [[delay: 100]] بدل ٨ و ٣٠ ثانية.

---

## ١. الـ queues

~~~ts
import { Queue, Worker, UnrecoverableError } from "bullmq";
const webhooks = new Queue("webhooks", { connection, defaultJobOptions: { attempts: 8, backoff: { type: "exponential", delay: 30_000 } } });
const dead = new Queue("webhooks-dead", { connection });
~~~

- [[connection]]: إعدادات Redis، مثلًا [[{ host: "localhost", port: 6379 }]].
- [[defaultJobOptions]]: إعدادات أي job تتضاف للـ queue دي من غير ما تكررها.
- [[attempts: 8]]: المحاولة الأولى + ٧ إعادات.
- [[backoff: exponential, delay: 30_000]]: الانتظار قبل الإعادة رقم n = [[30s × 2^(n-1)]].

| بعد الفشل رقم | يستنى |
|---|---|
| ١ | ٣٠ ثانية |
| ٢ | دقيقة |
| ٣ | دقيقتين |
| ٤ | ٤ دقايق |
| ٥ | ٨ دقايق |
| ٦ | ١٦ دقيقة |
| ٧ | ٣٢ دقيقة |
| ٨ | خلاص، دي آخر محاولة |

المجموع حوالي ساعة وربع (٣٨١٠ ثانية = ٦٣.٥ دقيقة) قبل ما الـ job تموت.

[[dead]] queue عادية **محدش عامل لها Worker**، فاللي فيها بيفضل [[waiting]] لحد ما حد يبص.

---

## ٢. الـ worker

~~~ts
const worker = new Worker("webhooks", async (job) => {
  const res = await deliver(job.data);
  if (res.status === 410) throw new UnrecoverableError("endpoint gone");
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
}, { connection, concurrency: 20 });
~~~

- الدالة بتاخد [[job]]، و [[job.data]] اللي اتحط وقت [[add]].
- لو الدالة خلصت عادي = الـ job نجحت. لو رمت = فشلت، و BullMQ يقرر يعيد ولا لأ.
- [[410 Gone]]: العميل بيقول «الـ endpoint ده اتشال». [[UnrecoverableError]] بتقول لـ BullMQ «متعيدش» حتى لو فاضل محاولات.
- أي فشل تاني ([[!res.ok]] = مش 2xx): [[Error]] عادي، فيتعاد.
- [[concurrency: 20]]: الـ worker ده يشغّل ٢٠ job في نفس الوقت.

---

## ٣. الـ listener: آخر فشل بس

~~~ts
worker.on("failed", async (job, err) => {
  if (!job || (job.attemptsMade < (job.opts.attempts ?? 1) && !(err instanceof UnrecoverableError))) return;
~~~

[[failed]] بيتنادى مع **كل** فشل. الشرط بالترتيب:

- [[!job]]: في حالات نادرة BullMQ بيبعت [[job]] بـ [[undefined]]. اخرج.
- [[job.attemptsMade < (job.opts.attempts ?? 1)]]: لسه فيه محاولات. و [[?? 1]]: لو [[attempts]] مش متحطة، الافتراضي محاولة واحدة.
- [[!(err instanceof UnrecoverableError)]]: والخطأ مش نهائي.
- لو الاتنين صح: [[return]]، استنى المحاولة الجاية.

طبعنا القيم في كل فشل:

~~~text الناتج
09:12:11.921 try 1 attemptsMade before = 0
09:12:11.947 try 2 attemptsMade before = 0
  failed event: attemptsMade = 1 opts.attempts = 3 Error
  failed event: attemptsMade = 1 opts.attempts = 3 UnrecoverableError
ALERT: webhook job 2 is dead: endpoint gone
09:12:12.146 try 1 attemptsMade before = 1
  failed event: attemptsMade = 2 opts.attempts = 3 Error
09:12:12.447 try 1 attemptsMade before = 2
  failed event: attemptsMade = 3 opts.attempts = 3 Error
ALERT: webhook job 1 is dead: HTTP 500
~~~

- job ١ (بترجع 500): اتنادت ٣ مرات. جوه الـ [[failed]] الـ [[attemptsMade]] بيبقى زاد خلاص (١ ثم ٢ ثم ٣)، ولما وصل [[3]] = [[opts.attempts]]، اتنقلت.
- job ٢ (410): فشلة واحدة، و [[UnrecoverableError]] نقلها على طول.
- الانتظار: ٢٢٥ ثم ٣٠٠ ملّي تقريبًا. الـ exponential كان ١٠٠ ثم ٢٠٠، والزيادة وقت BullMQ في نقل الـ job من [[delayed]] لـ [[waiting]].

~~~ts
  await dead.add("dead", { queue: job.queueName, jobId: job.id, data: job.data, error: err.message, failedAt: new Date().toISOString() });
  alerts.notify($__btwebhook job $__{job.id} is dead: $__{err.message}$__bt);
});
~~~

[[dead.add(name, data)]]: job جديدة في الـ DLQ، والـ data فيها كل السياق: جت منين، ورقمها، وبياناتها، وليه ماتت، وإمتى.

~~~text الناتج (اللي في الـ DLQ بعد ثانيتين)
DLQ: [
  { queue: 'webhooks', jobId: '1', data: { url: 'http://localhost:6013/ok-later' }, error: 'HTTP 500', failedAt: '2026-10-08T09:12:12.450Z' },
  { queue: 'webhooks', jobId: '2', data: { url: 'http://localhost:6013/gone' }, error: 'endpoint gone', failedAt: '2026-10-08T09:12:12.000Z' }
]
counts webhooks: { failed: 2, completed: 0, waiting: 0, delayed: 0 }
~~~

---

## ٤. الـ redrive

~~~ts
export async function redrive(limit = 100) {
  for (const j of await dead.getJobs(["waiting"], 0, limit - 1)) {
    await webhooks.add("deliver", j.data.data);
    await j.remove();
  }
}
~~~

- [[dead.getJobs(["waiting"], 0, limit - 1)]]: هات الـ jobs اللي حالتها waiting، من رقم ٠ لـ ٩٩ (الطرفين محسوبين، عشان كده [[- 1]]).
- [[j.data.data]]: الـ [[data]] الأولى بتاعة job الـ DLQ، والتانية البيانات الأصلية جواها.
- أضف للأصلية **الأول**، وبعدين امسح من الـ DLQ. لو العكس ووقعت في النص، الـ job تضيع.

غيّرنا سيرفر التجربة يرجّع 200، ونادينا [[redrive()]]:

~~~text الناتج
09:12:13.963 try 3 attemptsMade before = 0
09:12:13.966 try 4 attemptsMade before = 0
  completed 3
  failed event: attemptsMade = 1 opts.attempts = 3 UnrecoverableError
ALERT: webhook job 4 is dead: endpoint gone
after redrive DLQ: { waiting: 1 } webhooks: { failed: 3, completed: 1 }
~~~

- الأولى رجعت بـ id جديد ([[3]]) ونجحت.
- التانية ([[/gone]]) رجعت ماتت تاني، لأن السبب لسه موجود (لسه بيرجّع 410). عشان كده الـ redrive بعد ما تصلّح، مش بدل التصليح.

---

## الخلاصة

| الجزء | الكود | الدور |
|---|---|---|
| الإعادة | [[attempts]] و [[backoff]] | فشل مؤقت يتحل لوحده |
| خطأ نهائي | [[UnrecoverableError]] | وقّف الإعادة فورًا |
| آخر فشل | [[attemptsMade >= opts.attempts]] أو Unrecoverable | انقل للـ DLQ |
| الـ DLQ | queue من غير Worker | الميتين بسياقهم + alert |
| الـ redrive | [[getJobs]] ثم [[add]] ثم [[remove]] | رجّعهم بعد التصليح، على دفعات |

- [[failed]] بيتنادى مع كل فشل، فالشرط هو اللي بيحدد «آخر مرة».
- الـ DLQ من غير alert = مقبرة محدش بيزورها.`,
          lines: [
            "BullMQ، والخطأ اللي بيوقف الـ retries.",
            "الـ queue الأصلية: ٨ محاولات بـ backoff أسّي يبدأ من ٣٠ ثانية.",
            "الـ DLQ: queue عادية محدش بيشغّلها أوتوماتيك.",
            "الـ worker:",
            "حاول توصّل.",
            "410 Gone: العميل شال الـ endpoint، الإعادة مالهاش لازمة.",
            "أي فشل تاني: ارمي عادي فيتعاد.",
            "٢٠ job بالتوازي.",
            "مع كل فشل:",
            "لسه فيه محاولات والخطأ مش نهائي؟ متعملش حاجة.",
            "آخر فشل: انقلها للـ DLQ بكل السياق.",
            "ونبّه حد.",
            "قفلة.",
            "إعادة الميتين بعد ما السبب يتصلّح...",
            "...على دفعات...",
            "...رجّعها للـ queue الأصلية...",
            "...وشيلها من الـ DLQ.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بعد ثانيتين: الـ worker اتنادى ٣ مرات للـ job البايظة، والـ DLQ فيها واحدة شكلها كده:

[[{ queue: "webhooks", jobId: "2", data: { url: ".../broken" }, error: "HTTP 500", failedAt: "..." }]]

والـ job الأصلية في failed بتاع [[webhooks]] (عدد ١). بعد الـ redrive: الـ DLQ فاضية، و job جديدة في [[webhooks]]، ولما الـ URL يرجع 200 تنجح.

لو الـ DLQ فيها ٣ نسخ من نفس الـ job: الشرط بتاع «آخر محاولة» غلط (بتنقل مع كل فشل). ولو فاضية خالص: [[attempts]] متحطتش على الـ job فالقيمة ١ والـ backoff مش شغال، أو الـ event مش متسجّل قبل ما الـ job تفشل.`
        },
        {
          cmd: "transactional outbox",
          title: "احفظ في القاعدة وانشر الحدث من غير ما واحد يضيع",
          desc: R`«الطلب اتدفع» لازم يتحفظ في القاعدة، ولازم event يروح للـ queue (إيصال، وشحن، وتحليلات). لو حفظت وبعدين نشرت، والسيرفر وقع بينهم: الطلب مدفوع ومحدش عرف. ولو نشرت الأول والـ transaction فشلت: إيصال لطلب مدفعش. مفيش transaction واحدة بتجمع Postgres و Redis.

الـ outbox: بتكتب الحدث في جدول [[outbox]] في نفس الـ transaction مع التعديل. يا الاتنين يتحفظوا يا مفيش. وبعدين process منفصلة (relay) بتقرا الأحداث اللي لسه متنشرتش، وتنشرها، وتعلّم عليها.`,
          example: R`await db.$transaction(async (tx) => {
  const order = await tx.order.update({ where: { id: orderId, status: "pending" }, data: { status: "paid", paidAt: new Date() } });
  await tx.outbox.create({ data: { topic: "order.paid", payload: { orderId: order.id, total: order.total } } });
});
export async function relayOutbox() {
  return db.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ id: bigint; topic: string; payload: unknown }[]>$__bt
      SELECT id, topic, payload FROM outbox
      WHERE published_at IS NULL ORDER BY id LIMIT 100
      FOR UPDATE SKIP LOCKED$__bt;
    for (const r of rows) await events.add(r.topic, r.payload, { jobId: $__btoutbox-$__{r.id}$__bt });
    if (rows.length) await tx.$executeRaw$__btUPDATE outbox SET published_at = now() WHERE id = ANY($__{rows.map((r) => r.id)})$__bt;
    return rows.length;
  });
}`,
          try: R`اعمل جدول outbox (id bigserial، و topic، و payload jsonb، و created_at، و published_at) و index جزئي [[WHERE published_at IS NULL]]. ضيف ٢٥٠ صف، وشغّل [[relayOutbox]] ٣ مرات بالتوازي بـ [[Promise.all]]، وعدّ: كام حدث اتنشر، وفيه تكرار؟ وبعدين جرّب transaction فيها update و outbox وبعدين [[throw]]: الاتنين لازم يترجعوا.`,
          flag: "script",
          deep: {
            why: "مشكلة الـ dual write موجودة في كل سيستم بيحفظ في قاعدة وبيبلّغ حاجة تانية (queue، أو إيميل، أو webhook، أو search index). ونادرًا ما بتبان في التطوير. في الإنتاج بتبان كطلبات مدفوعة من غير شحن، أو إيصالات لعمليات اتلغت، ومحدش يعرف يفسّرها.",
            how: R`الضمان: الـ outbox والتعديل في نفس الـ transaction، فالقاعدة بتضمن الاتنين مع بعض. والـ relay بيضمن إن أي صف في outbox هيتنشر في الآخر، حتى لو وقع ١٠ مرات. النتيجة at-least-once: الحدث ممكن يتنشر مرتين (الـ relay نشر ووقع قبل ما يعلّم)، بس عمره ما يضيع.

[[FOR UPDATE SKIP LOCKED]]: لو شغّلت أكتر من relay (أو أكتر من نسخة من السيرفر فيها relay)، كل واحد بيقفل الصفوف اللي أخدها، والتاني بيعدّيها ويا خد اللي بعدها. فمفيش اتنين بينشروا نفس الحدث في نفس الوقت، ومفيش حد بيستنى التاني.

[[jobId: outbox-id]]: BullMQ بيتجاهل job بنفس الـ jobId لو لسه موجودة، فلو الـ relay نشر ووقع قبل الـ UPDATE، وعاد، التكرار مش هيعمل job تانية (طالما الأولى لسه متشالتش). وده مش بديل عن إن المستهلك يبقى idempotent.

ليه transaction حوالين الـ relay؟ عشان الـ lock بتاع [[FOR UPDATE]] يفضل ماسك لحد الـ UPDATE. خليها قصيرة (١٠٠ صف) عشان متمسكش locks كتير. وشغّله كل ثانية أو اتنين (BullMQ job scheduler، أو loop في worker)، أو اصحى فورًا بـ LISTEN/NOTIFY في Postgres.

الـ id [[bigint]]: Prisma بيرجّعه BigInt من [[$queryRaw]]. الـ template string بتحوّله نص عادي، و Prisma بيبعت الـ array كـ Postgres array في [[ANY()]].

والتنضيف: امسح الصفوف المنشورة الأقدم من كام يوم بـ job دوري، وإلا الجدول بيكبر للأبد.

البديل: CDC (change data capture) زي Debezium بيقرا الـ WAL بتاع Postgres وينشر التغييرات، من غير جدول outbox ولا polling. أقوى وأعقد. والـ outbox بـ polling كفاية لأغلب المشاريع.

والنمط العكسي (inbox): المستهلك بيسجّل الـ event id في جدول في نفس transaction شغله، ولو جاله نفس الـ id تاني يتجاهله. ده اللي بيقفل الدايرة لـ «effectively once».`,
            when: "أي تعديل في القاعدة لازم يطلع منه event لحاجة برّه: دفع، وتسجيل، وتغيير حالة طلب. ولو الحدث مش مهم لو ضاع (analytics تقريبية)، النشر المباشر بعد الـ commit مقبول.",
            mistakes: R`تنشر جوه الـ transaction قبل الـ commit (الحدث طلع والـ transaction اترجعت). وتنشر بعد الـ commit وتفتكر إن ده كفاية. و relay من غير SKIP LOCKED فنسختين ينشروا نفس الصفوف. ومستهلك مش idempotent. وجدول outbox من غير index ولا تنضيف. وسؤال انترفيو مشهور: «إزاي تضمن إن الحفظ في القاعدة وإرسال الرسالة للـ queue يحصلوا الاتنين أو ولا واحد؟»، والإجابة: transactional outbox (أو CDC)، مش two-phase commit.`
          },
          teach: R`## اكتب الحدث في القاعدة، وحد تاني ينشره

المثال جزئين. الأول transaction بتعلّم الطلب مدفوع **وفي نفس الـ transaction** بتكتب الحدث في جدول [[outbox]]. والتاني [[relayOutbox]]: بتاخد لحد ١٠٠ حدث لسه متنشرتش، وتقفلهم عشان محدش تاني ياخدهم، وتنشرهم في BullMQ، وتعلّم عليهم.

اتجرّب على ويندوز 11: PostgreSQL 16.13 في Docker ([[postgres:16-alpine]]، بورت ٦٠١٤)، و BullMQ 6.3 و Redis 8.10. **من غير Prisma**: نفس الـ SQL بالحرف اتبعت بمكتبة [[pg]] 8.23، ودالة [[tx()]] صغيرة بتعمل [[BEGIN]] و [[COMMIT]] و [[ROLLBACK]] زي ما [[db.$transaction]] بيعمل. فاللي بيخص Prisma نفسه (نوع [[bigint]] والـ template tags) من docs Prisma.

---

## ١. الـ solCode الأول: الجدول

~~~sql
CREATE TABLE outbox (
  id bigserial PRIMARY KEY,
  topic text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
~~~

| العمود | النوع | ليه |
|---|---|---|
| [[id]] | [[bigserial]]: رقم ٦٤ bit بيزيد لوحده | الترتيب، و jobId |
| [[topic]] | نص | نوع الحدث ([[order.paid]]) |
| [[payload]] | [[jsonb]]: JSON متخزن binary | بيانات الحدث |
| [[created_at]] | وقت بالـ timezone، افتراضيًا [[now()]] | للتنضيف والمتابعة |
| [[published_at]] | فاضي ([[NULL]]) لحد ما يتنشر | ده «العلامة» |

~~~sql
CREATE INDEX outbox_unpublished ON outbox (id) WHERE published_at IS NULL;
~~~

index **جزئي**: فيه الصفوف اللي لسه متنشرتش بس. الجدول ممكن يبقى فيه ملايين صف منشور، والـ index فيه الكام صف اللي مستنيين. و [[EXPLAIN]] أكد إن الـ relay بيستخدمه:

~~~text الناتج (EXPLAIN لاستعلام الـ relay، من غير أرقام الـ cost)
 Limit
   ->  LockRows
         ->  Sort  Sort Key: id
               ->  Bitmap Heap Scan on outbox  Recheck Cond: (published_at IS NULL)
                     ->  Bitmap Index Scan on outbox_unpublished
~~~

~~~sql
INSERT INTO outbox (topic, payload)
SELECT 'order.paid', jsonb_build_object('orderId', g) FROM generate_series(1, 250) g;
~~~

[[generate_series(1, 250)]] بيطلّع الأرقام من ١ لـ ٢٥٠ كأنها جدول، و [[g]] اسم العمود، و [[jsonb_build_object('orderId', g)]] بيعمل [[{"orderId": 1}]]. يعني ٢٥٠ حدث في أمر واحد:

~~~text الناتج
INSERT 0 250
 id |   topic    |    payload     | published_at
----+------------+----------------+--------------
  1 | order.paid | {"orderId": 1} |
  2 | order.paid | {"orderId": 2} |
~~~

---

## ٢. الكتابة: transaction واحدة

~~~ts
await db.$transaction(async (tx) => {
  const order = await tx.order.update({ where: { id: orderId, status: "pending" }, data: { status: "paid", paidAt: new Date() } });
  await tx.outbox.create({ data: { topic: "order.paid", payload: { orderId: order.id, total: order.total } } });
});
~~~

- [[db.$transaction(async (tx) => {...})]]: كل اللي جوه بـ [[tx]] بيتنفّذ في transaction واحدة. لو الدالة رمت، كله بيترجع (rollback).
- [[where: { id, status: "pending" }]]: حدّث **بس** لو لسه pending. لو اتدفع قبل كده، Prisma بيرمي (مفيش صف) والحدث ميتكتبش تاني.
- السطر التاني: الحدث نفسه صف في الجدول. مفيش Redis ولا شبكة هنا.

جرّبنا ٣ حالات بنفس الخطوات (UPDATE بشرط [[status='pending']]، وبعده INSERT في outbox):

~~~text الناتج
pay 9001 ok
pay 9002: boom after outbox insert
pay 9001 again: order not pending
[ { id: 9001, status: 'paid' }, { id: 9002, status: 'pending' } ] outbox rows added: 1
~~~

- ٩٠٠١: اتدفع، وصف واحد في outbox.
- ٩٠٠٢: رمينا error **بعد** الـ INSERT في outbox. الطلب فضل [[pending]] والصف اتشال. ده الضمان: يا الاتنين يا ولا واحد.
- ٩٠٠١ تاني: الشرط منعه، ومفيش حدث مكرر.

---

## ٣. الـ relay

~~~ts
export async function relayOutbox() {
  return db.$transaction(async (tx) => {
~~~

transaction عشان الـ lock يفضل ماسك من الـ SELECT لحد الـ UPDATE.

~~~ts
    const rows = await tx.$queryRaw<{ id: bigint; topic: string; payload: unknown }[]>$__bt
      SELECT id, topic, payload FROM outbox
      WHERE published_at IS NULL ORDER BY id LIMIT 100
      FOR UPDATE SKIP LOCKED$__bt;
~~~

- [[$queryRaw]] مع template (backticks): Prisma بيحوّل أي [[$__{...}]] جوه لـ parameter آمن، فمفيش SQL injection. والـ [[<...>]] نوع الصفوف.
- [[WHERE published_at IS NULL ORDER BY id LIMIT 100]]: أقدم ١٠٠ لسه متنشرتش.
- [[FOR UPDATE]]: اقفل الصفوف دي لحد آخر الـ transaction. أي حد تاني عايز يقفلها لازم يستنى.
- [[SKIP LOCKED]]: بدل ما تستنى، عدّي الصفوف المقفولة وخد اللي بعدها.

~~~ts
    for (const r of rows) await events.add(r.topic, r.payload, { jobId: $__btoutbox-$__{r.id}$__bt });
~~~

[[events]] queue في BullMQ. و [[jobId: outbox-17]]: لو job بنفس الـ id موجودة، BullMQ بيتجاهل الإضافة. (والـ jobId مينفعش يبقى رقم بس ولا فيه [[:]]، عشان كده [[outbox-]] قبله.)

~~~ts
    if (rows.length) await tx.$executeRaw$__btUPDATE outbox SET published_at = now() WHERE id = ANY($__{rows.map((r) => r.id)})$__bt;
    return rows.length;
  });
}
~~~

- [[rows.map((r) => r.id)]]: array الـ ids، و Prisma بيبعتها كـ array واحدة.
- [[id = ANY(array)]]: يساوي أي عنصر فيها. أمر UPDATE واحد للـ ١٠٠.
- [[return rows.length]]: كام اتنشر، للـ logs.

---

## ٤. الـ try: ٣ relays مع بعض على ٢٥٠ صف

~~~ts
await Promise.all([relayOutbox(), relayOutbox(), relayOutbox()]);
~~~

كل relay ليه connection وtransaction لوحده. وعدّينا كل id اتنشر:

~~~text الناتج (FOR UPDATE SKIP LOCKED)
3 relays in parallel: [ 100, 100, 50 ] in 111 ms
again: [ 0, 0, 0 ]
published total: 250 unique: 250 jobs in queue: 250
~~~

كل relay خد صفوف مختلفة، والمجموع ٢٥٠ بالظبط من غير تكرار. والمرة التانية مفيش حاجة.

### من غير [[SKIP LOCKED]]

~~~text الناتج (FOR UPDATE بس)
3 relays in parallel: [ 100, 50, 100 ] in 253 ms
published total: 250 unique: 250 jobs in queue: 250
~~~

صح، بس أبطأ مرتين ونص: التانيين استنوا الأول يخلص، وبعدها Postgres رجع يفحص الـ WHERE فلقاهم اتنشروا، وكمّل بعدهم.

### من غير قفل خالص

~~~text الناتج (من غير FOR UPDATE)
3 relays in parallel: [ 100, 100, 100 ] in 130 ms
again: [ 100, 100, 100 ]
published total: 600 unique: 200 jobs in queue: 200
~~~

التلاتة شافوا نفس أول ١٠٠ ونشروهم، وبعدين نفس التانية. ٦٠٠ نشر لـ ٢٠٠ حدث بس، والـ ٥٠ الأخيرة لسه مستنية. و [[jobs in queue: 200]]: الـ [[jobId]] هو اللي منع التكرار يوصل للـ queue. ده بيوضح ليه الاتنين مع بعض: القفل بيمنع الشغل المكرر، والـ jobId شبكة أمان.

### نوع الـ id

مع [[pg]] الـ [[bigint]] بيرجع نص ([[typeof]] = [[string]])، ومع Prisma [[$queryRaw]] بيرجع [[BigInt]] (من docs Prisma). في الحالتين [[outbox-1]] بيطلع صح في الـ template.

---

## الخلاصة

| الجزء | الكود | الضمان |
|---|---|---|
| الكتابة | التعديل + [[outbox.create]] في transaction | يا الاتنين يا ولا واحد |
| الاختيار | [[WHERE published_at IS NULL ORDER BY id LIMIT 100]] | الأقدم الأول، بدفعات |
| القفل | [[FOR UPDATE SKIP LOCKED]] | كل relay ياخد صفوف مختلفة من غير استنى |
| النشر | [[jobId: outbox-id]] | التكرار ميعملش job تانية |
| العلامة | [[UPDATE ... published_at = now()]] | ميتنشرش تاني |

- at-least-once: ممكن حدث يتنشر مرتين (relay نشر ووقع قبل العلامة)، بس عمره ما يضيع. فالمستهلك idempotent.
- index جزئي على اللي لسه متنشرش، وتنضيف دوري للمنشور.`,
          lines: [
            "transaction واحدة:",
            "علّم الطلب مدفوع (بشرط إنه كان pending، فالتكرار ميعملش حاجة).",
            "واكتب الحدث في outbox في نفس الـ transaction: يا الاتنين يتحفظوا يا ولا واحد.",
            "قفلة.",
            "الـ relay: بيتنادى كل ثانية أو اتنين.",
            "transaction عشان الـ lock يفضل لحد التعليم.",
            "هات...",
            "...الأحداث...",
            "...اللي لسه متنشرتش، بالترتيب، ١٠٠ بس...",
            "...واقفلها، وعدّي أي صف relay تاني قافله.",
            "انشر كل واحد، والـ jobId من id الصف عشان التكرار ميعملش job تانية.",
            "علّم اللي اتنشر.",
            "رجّع العدد (للـ logs والـ metrics).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`٣ relays بالتوازي على ٢٥٠ صف: الأعداد زي [[100, 50, 100]] (الترتيب بيختلف)، والمجموع ٢٥٠ بالظبط ومفيش ولا id اتكرر. SKIP LOCKED خلى كل relay ياخد صفوف مختلفة.

لو شلت [[SKIP LOCKED]]: الـ relays التانيين بيستنوا الأول يخلص، وبعدين ياخدوا الـ ١٠٠ اللي بعدهم، فالنتيجة صح بس أبطأ. ولو شلت [[FOR UPDATE]] كلها: هتلاقي نفس الـ ids اتنشرت أكتر من مرة (في تجربتنا ٦٠٠ نشر لـ ٢٠٠ حدث بس، والـ ٥٠ الأخيرة لسه مستنية). والـ queue فيها ٢٠٠ job مش ٦٠٠، لأن [[jobId]] منع التكرار يوصلها.

والـ transaction اللي فيها throw: لا الطلب اتعلّم paid ولا صف outbox اتضاف. ده الضمان كله.`,
          solCode: R`CREATE TABLE outbox (
  id bigserial PRIMARY KEY,
  topic text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
CREATE INDEX outbox_unpublished ON outbox (id) WHERE published_at IS NULL;
INSERT INTO outbox (topic, payload)
SELECT 'order.paid', jsonb_build_object('orderId', g) FROM generate_series(1, 250) g;`
        }
      ]
    }
]);
