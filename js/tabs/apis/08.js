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
    }
]);
