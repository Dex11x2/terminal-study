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

بعد ثانية ونص تقريبًا: اتملى ٢ tokens، فأول ٢ مسموحين والتالت مرفوض.

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

بعد ٣ ثواني: النافذة اتغيرت، والقديمة (فيها ٥ بس لأن المرفوضين اتشالوا بالـ decr) بتتحسب بجزء من وزنها، فيتسمح بطلبين أو تلاتة حسب اللحظة بالظبط، زي [[✓2 ✓1 ✓0 ✗0]].

من غير الـ decr: القديمة فيها ٧ (المرفوضين اتعدّوا)، فالتقدير بيبدأ فوق الحد، وممكن كل التانية تترفض. ده اللي قصدنا بـ «الرفض بيطوّل القفل».`
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

لو شلت [[SKIP LOCKED]]: الـ relays التانيين بيستنوا الأول يخلص، وبعدين ياخدوا الـ ١٠٠ اللي بعدهم، فالنتيجة صح بس أبطأ. ولو شلت [[FOR UPDATE]] كلها: هتلاقي نفس الـ ids اتنشرت أكتر من مرة.

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
