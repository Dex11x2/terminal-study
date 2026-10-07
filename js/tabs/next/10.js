// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
    {
      t: "Auth",
      l: 2,
      n: "session في cookie، والحماية جنب الداتا مش في الـ proxy، و Next كـ BFF قدام API منفصل",
      items: [
        {
          cmd: "session cookie",
          title: "تسجيل الدخول: session في cookie من السيرفر",
          desc: R`بعد ما تتأكد من الإيميل والباسورد في Server Action، اعمل session وحطها في cookie [[httpOnly]] (الـ JS في المتصفح ميقدرش يقراها) و [[secure]] و [[sameSite: "lax"]]. الـ session يا توكن موقّع (JWT بمكتبة [[jose]]) فيه الـ user id، يا id عشوائي لصف في جدول sessions.

[[cookies()]] من [[next/headers]] (async من Next 15) بتقرا في أي server component، بس الكتابة ([[set]] و [[delete]]) في Server Actions و Route Handlers و proxy بس. وفيه مكتبات بتعمل كل ده: Auth.js و Better Auth و Clerk و Supabase Auth، بس لازم تفهم اللي بيحصل تحت.`,
          example: R`// app/actions/auth.ts
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
const key = new TextEncoder().encode(process.env.SESSION_SECRET);
export async function login(_prev: { error?: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").toLowerCase();
  const user = await db.user.findUnique({ where: { email } });
  const ok = user && (await bcrypt.compare(String(formData.get("password") ?? ""), user.passwordHash));
  if (!user || !ok) return { error: "الإيميل أو الباسورد غلط" };
  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key);
  (await cookies()).set("session", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  redirect("/dashboard");
}
export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}`,
          try: R`اعمل الـ login بمستخدم ثابت (من غير داتابيز)، وادخل، وافتح DevTools > Application > Cookies: هتلاقي [[session]] وعليها HttpOnly. اكتب [[document.cookie]] في الـ console: مش هتلاقيها. وخد التوكن والصقه في jwt.io: هتقدر تقرا الـ payload (موقّع مش مشفّر، فمتحطش فيه أسرار).`,
          flag: "script",
          deep: {
            why: "التوكن في localStorage أي script في الصفحة يقدر يقراه (XSS، أو مكتبة npm مخترقة). والـ cookie الـ httpOnly المتصفح بيبعتها لوحده مع كل طلب، والـ JS ميقدرش يلمسها. وفي Next الـ server components بتقرا الـ cookie مباشرة، فالصفحة بتترسم وهي عارفة المستخدم من أول لحظة، من غير وميض «مش داخل» وبعدين «داخل».",
            how: R`فيه نوعين sessions. stateless: JWT موقّع فيه الـ user id والدور والمدة. مفيش داتابيز مع كل طلب، بس مينفعش تلغيه قبل ما يخلص (لو غيّرت الدور أو عملت logout من كل الأجهزة). و database sessions: الـ cookie فيها id عشوائي، والبيانات في جدول. كل طلب query، بس تقدر تمسح الـ session فورًا. وممكن تجمع: JWT قصير والـ DAL يراجع الداتابيز في العمليات المهمة.

الكتابة في الـ cookies مسموحة بس في Server Actions و Route Handlers و proxy، لأن الـ server component بيترسم وممكن يكون الـ response بدأ يتبعت (streaming) والـ headers خلاص اتبعتت. عشان كده refresh للتوكن مكانه proxy أو Route Handler، مش صفحة.

[[sameSite: "lax"]] بيمنع المتصفح يبعت الـ cookie في POST جاي من موقع تاني. ومع حماية Next للـ Server Actions (بيقارن الـ Origin)، ده بيقفل CSRF.

المكتبات: Auth.js (NextAuth v5) مشهورة ومرنة مع OAuth، و Better Auth أحدث و TypeScript-first وفيه plugins كتير، و Clerk و Supabase Auth خدمات جاهزة بواجهات. كلهم بيعملوا نفس الفكرة: cookie، وطريقة تقرا بيها الـ session على السيرفر. والـ hashing وقواعد الباسورد في تاب «الأمان».`,
            when: "أي تطبيق فيه login وواجهته Next. ولو فيه API منفصل بيعمل الـ auth، Next بيخزّن التوكن بتاعه في cookie httpOnly برضه (درس BFF).",
            mistakes: R`تحط التوكن في localStorage وتبعته من المتصفح. و cookie من غير [[httpOnly]]. و [[SESSION_SECRET]] قصير أو مكتوب في الكود. وتحط بيانات حساسة في الـ JWT payload (هو base64 مش تشفير). وتحاول [[cookies().set]] في server component فيطلع خطأ. وتنسى [[await]] قبل [[cookies()]] في Next 15 و 16.`
          },
          teach: R`## الفكرة: ٣ خطوات بعد ما الباسورد يطلع صح

الملف ده فيه دالتين بيتنادوا من الفورم: [[login]] بتتأكد من الإيميل والباسورد، وتعمل توكن موقّع، وتحطه في cookie، وتحوّل. و [[logout]] بتمسح الـ cookie. كل الناتج تحت حقيقي: مشروع [[create-next-app]] جديد (Next.js 16.4.0، React 19.3، من غير [[cacheComponents]]) على ويندوز، و [[jose]] 6.2 و [[bcryptjs]] 3.0، والسيرفر [[next start]] على بورت 5830 بدل 3000، والمتصفح Chrome headless. ومكان [[db]] الحقيقي (Prisma) عملنا ملف صغير فيه مستخدمين في الذاكرة بنفس شكل [[db.user.findUnique]]، والباسورد متخزن hash بـ bcrypt.

---

## ١. السطور الأولى: [[use server]] والـ imports

~~~text app/actions/auth.ts
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
~~~

- [[use server]] في أول الملف معناها: كل دالة [[export]] هنا **Server Action**، يعني دالة بتتنفذ على السيرفر بس، والمتصفح بيناديها بطلب POST من غير ما يشوف كودها.
- [[cookies]] من [[next/headers]]: بتقرا وتكتب الـ cookies بتاعة الطلب الحالي.
- [[redirect]] من [[next/navigation]]: يحوّل المستخدم لصفحة تانية.
- [[SignJWT]] من [[jose]]: بيعمل JWT (اختصار JSON Web Token): نص فيه داتا وتوقيع. و [[jose]] اختيرت لأنها شغالة في Node وفي الـ Edge runtime، عكس [[jsonwebtoken]] اللي محتاجة Node.
- [[bcrypt]]: بيقارن الباسورد بالـ hash المتخزن.

---

## ٢. السر: [[const key = new TextEncoder().encode(process.env.SESSION_SECRET)]]

- [[process.env.SESSION_SECRET]]: متغير بيئة، حطيناه في [[.env.local]] (ملف Next بيقراه لوحده ومبيتبعتش للمتصفح لأن اسمه مش بادئ بـ [[NEXT_PUBLIC_]]).
- [[new TextEncoder().encode(...)]]: [[jose]] عايزة السر bytes ([[Uint8Array]]) مش نص، فده بيحوّل النص لـ bytes.

والسر نفسه عملناه كده (Git Bash):

~~~bash
echo "SESSION_SECRET=$(openssl rand -base64 32)" > .env.local
~~~

[[openssl rand -base64 32]] بيطلّع ٣٢ byte عشوائي مكتوبين base64 (٤٤ حرف). أي حد يعرف السر ده يقدر يعمل توكن لأي مستخدم، فمكانه متغيرات البيئة مش الكود.

---

## ٣. توقيع الدالة: [[login(_prev, formData)]]

~~~text
export async function login(_prev: { error?: string }, formData: FormData) {
~~~

الدالة دي معمولة عشان تتنادى من [[useActionState]] في صفحة الـ login:

~~~text app/login/page.tsx (الجزء المهم)
const [state, action, pending] = useActionState(login, {});
<form action={action}> ... {state.error && <p role="alert">{state.error}</p>}
~~~

[[useActionState]] بيبعت للـ action حاجتين: الـ state اللي فاتت (أول مرة [[{}]]) والفورم. فأول باراميتر [[_prev]] (الـ [[_]] في أوله عادة معناها «مش هستخدمه»)، والتاني [[formData]] من نوع [[FormData]]: كل [[input]] في الفورم باسمه.

> ولما شغّلنا [[tsc]] على المثال زي ما هو، طلع خطأ: [[Argument of type '{}' is not assignable to parameter of type '{ error: string; }'. Property 'error' is missing]]. السبب: [[redirect]] نوعه [[never]] (مبيرجعش)، فـ TypeScript استنتج إن الدالة بترجّع [[{ error: string }]] دايمًا، والـ [[{}]] مفيهوش [[error]]. الحل: اكتب نوع الرجوع بإيدك [[: Promise<{ error?: string }>]] بعد الأقواس، وبعدها عدّى.

---

## ٤. التحقق من الإيميل والباسورد

~~~text
const email = String(formData.get("email") ?? "").toLowerCase();
const user = await db.user.findUnique({ where: { email } });
const ok = user && (await bcrypt.compare(String(formData.get("password") ?? ""), user.passwordHash));
if (!user || !ok) return { error: "الإيميل أو الباسورد غلط" };
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[formData.get("email")]] | قيمة الـ input اللي اسمه [[email]]، أو [[null]] لو مش موجود |
| [[?? ""]] | لو [[null]] خليها نص فاضي (بدل ما تبقى الكلمة [["null"]]) |
| [[String(...)]] | [[get]] ممكن يرجّع ملف ([[File]])، فبنحوّلها نص |
| [[.toLowerCase()]] | [[SARA@example.com]] و [[sara@example.com]] نفس الحساب |
| [[user && (...)]] | لو مفيش مستخدم، متقارنش أصلًا ([[ok]] تبقى [[null]]) |
| [[bcrypt.compare(pw, hash)]] | بيعمل hash للباسورد اللي اتكتب بنفس الـ salt ويقارن. بيرجّع [[true]] أو [[false]] |

والرسالة واحدة للحالتين، عشان محدش يعرف من الرد إن الإيميل ده متسجل. جرّبنا باسورد غلط من المتصفح:

~~~text الناتج
wrong pw -> الإيميل أو الباسورد غلط
~~~

والـ [[return { error }]] ده هو اللي [[useActionState]] بيحطه في [[state]]، فالفورم بتعرض الرسالة. وجرّبنا كمان [[SARA@example.com]] بحروف كبيرة والباسورد الصح: دخل، بسبب [[toLowerCase]].

---

## ٥. عمل التوكن: سلسلة [[SignJWT]]

~~~text
const token = await new SignJWT({ userId: user.id, role: user.role })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("7d")
  .sign(key);
~~~

كل سطر بيرجّع نفس الـ object، فبتكمّل عليه بنقطة (method chaining):

1. [[new SignJWT({...})]]: الـ **payload**، يعني الداتا اللي جوه التوكن: مين المستخدم ودوره.
2. [[.setProtectedHeader({ alg: "HS256" })]]: الـ **header** بيقول التوقيع معمول بإيه. [[HS256]] = HMAC بـ SHA-256: توقيع بسر واحد هو نفسه اللي بيتحقق بيه.
3. [[.setExpirationTime("7d")]]: بيضيف [[exp]] للـ payload: وقت الانتهاء بعد ٧ أيام، بالثواني من ١٩٧٠.
4. [[.sign(key)]]: بيحسب التوقيع بالسر، ويرجّع (Promise) النص النهائي: ٣ أجزاء بينهم نقط [[header.payload.signature]].

خدنا التوكن من المتصفح وفكّينا أول جزئين من base64:

~~~text الناتج
header  {"alg":"HS256"}
payload {"userId":"u_1","role":"USER","exp":1791962530}
~~~

يعني أي حد معاه التوكن **يقدر يقراه**. التوقيع بيمنع التعديل بس: لو غيّرت [[USER]] لـ [[ADMIN]]، التوقيع مش هيطابق والسيرفر هيرفضه (درس [[DAL]]). فمتحطش في الـ payload حاجة سرية.

---

## ٦. حط الـ cookie: [[(await cookies()).set(...)]]

~~~text
(await cookies()).set("session", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
~~~

- [[cookies()]] من Next 15 بقت async، فلازم [[await]]، والأقواس حواليها عشان نستنى الأول وبعدين ننادي [[.set]].
- [[.set(name, value, options)]]: الاسم [[session]] والقيمة التوكن، والخيارات:

| الخيار | معناه |
|---|---|
| [[httpOnly: true]] | الـ JavaScript في الصفحة ميقدرش يقراها. لو فيه XSS، التوكن مش هيتسرق |
| [[secure: true]] | تتبعت على HTTPS بس ([[localhost]] المتصفح بيعتبره آمن، فشغالة في التطوير) |
| [[sameSite: "lax"]] | متتبعتش مع POST جاي من موقع تاني، وده بيقفل أغلب CSRF |
| [[path: "/"]] | تتبعت مع كل صفحات الموقع |
| [[maxAge]] | عمرها بالثواني: ٦٠ × ٦٠ × ٢٤ × ٧ = 604800 = أسبوع، زي التوكن |

ده اللي Chrome حطه فعلًا بعد الدخول، وبعده [[document.cookie]] من الصفحة نفسها:

~~~text الناتج
{ name: 'session', httpOnly: true, secure: true, sameSite: 'Lax', days: '7.00' }
document.cookie = ""
~~~

الـ cookie موجودة والمتصفح بيبعتها مع كل طلب، بس الـ JS شايفها فاضية.

> الكتابة في الـ cookies مسموحة هنا لأننا جوه Server Action. في server component (صفحة بتترسم) مش مسموح، لأن الرد ممكن يكون بدأ يتبعت.

---

## ٧. [[redirect("/dashboard")]]

بيرمي exception خاص Next بيفهمه ويحوّل المتصفح. عشان كده بيتكتب **برّه** أي [[try]]، وإلا الـ [[catch]] هيمسكه. بعد الدخول المتصفح راح على:

~~~text الناتج
url http://localhost:5830/dashboard
h1 dash u_1
~~~

---

## ٨. [[logout]]

~~~text
export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}
~~~

[[delete]] بيبعت [[Set-Cookie]] بتاريخ قديم فالمتصفح يمسحها. ربطناها بزرار [[<form action={logout}>]] في الـ dashboard، وبعد الضغط:

~~~text الناتج
after logout http://localhost:5830/login []
~~~

القوسين الفاضيين في الآخر هما قايمة الـ cookies بعد الخروج: مفيش ولا واحدة.

> ده JWT stateless: لو حد نسخ التوكن قبل الخروج، هيفضل صالح لحد [[exp]]، لأن السيرفر مش شايل ليستة بالتوكنات. ده الفرق عن database sessions (درس [[getSession]]).

---

## الخلاصة

| الخطوة | الكود | ليه |
|---|---|---|
| تحقق | [[bcrypt.compare]] | الباسورد متخزن hash مش نص |
| رسالة واحدة | [[{ error: "الإيميل أو الباسورد غلط" }]] | محدش يعرف مين متسجل |
| توكن | [[SignJWT]] + [[HS256]] + [[7d]] | موقّع (ميتعدلش) بس مقروء |
| cookie | [[httpOnly]] و [[secure]] و [[lax]] | JS ميقراهاش، HTTPS بس، مش من مواقع تانية |
| تحويل | [[redirect]] برّه try | بيرمي exception |
| خروج | [[cookies().delete]] | بيمسح من المتصفح، مش بيلغي التوكن نفسه |`,
          lines: [
            "Server Actions.",
            R`[[cookies]]: async من Next 15.`,
            "التحويل بعد الدخول.",
            R`[[jose]] بتشتغل في أي runtime (Node و Edge)، عكس [[jsonwebtoken]].`,
            "مقارنة الباسورد بالـ hash.",
            R`السر من البيئة كـ bytes. لازم ٣٢ حرف عشوائي على الأقل ([[openssl rand -base64 32]]).`,
            R`بيتنادى من [[useActionState]]، فبياخد الـ state اللي فاتت الأول.`,
            "الإيميل بحروف صغيرة زي ما اتخزن.",
            "هات المستخدم.",
            "قارن الباسورد لو المستخدم موجود.",
            "نفس الرسالة للحالتين: متقولش «الإيميل مش موجود» عشان محدش يعرف مين متسجل.",
            "اعمل توكن فيه الـ id والدور...",
            "...بخوارزمية HS256...",
            "...بيخلص بعد أسبوع...",
            "...وموقّع بالسر.",
            R`حط الـ cookie: [[httpOnly]] ضد XSS، و [[secure]] على HTTPS بس، و [[lax]] ضد أغلب CSRF، وعمرها أسبوع زي التوكن.`,
            R`روح للـ dashboard. [[redirect]] برّه أي try.`,
            "قفلة.",
            "الخروج.",
            "امسح الـ cookie.",
            "روح للـ login.",
            "قفلة."
          ],
          sol: R`بعد الدخول: في Application > Cookies صف [[session]] عليه HttpOnly و Secure و SameSite Lax وعمره ٧ أيام. و [[document.cookie]] بيرجّع [[""]] (أو cookies تانية مش هي)، لأن HttpOnly بيخبيها من الـ JS خالص. و Secure بتشتغل على [[http://localhost]] لأن المتصفح بيعتبره آمن، بس على IP أو دومين تاني من غير HTTPS الـ cookie مش هتتحط.

والتوكن في jwt.io (أو [[atob]] على الجزء التاني): الـ header [[{"alg":"HS256"}]] والـ payload [[{"userId":"u_1","role":"USER","exp":...}]] مقروء لأي حد. التوقيع بيمنع التعديل، مش القراية. ولو TypeScript اعترض على [[useActionState(login, {})]]: حدد نوع رجوع الـ action [[Promise<{ error?: string }>]]، لأن الـ redirect بترمي فـ TS فاكر إن الدالة بترجّع [[{ error: string }]] دايمًا.`
        },
        {
          cmd: "DAL",
          title: "تحمي الصفحات والداتا فين بالظبط؟ (Data Access Layer)",
          desc: R`الـ proxy بيعمل فحص سريع ومتفائل، والـ layout ممكن ميترسمش تاني. الحماية الحقيقية تبقى جنب الداتا: ملف (أو فولدر) [[lib/dal.ts]] عليه [[server-only]]، فيه [[verifySession()]] بتتحقق من الـ cookie بجد، وكل query بتجيب داتا خاصة بتناديها الأول وتفلتر بالـ userId.

و [[verifySession]] ملفوفة في [[cache()]] من React، فلو الصفحة و ٣ كومبوننتات نادوها في نفس الطلب، بتتنفذ مرة واحدة.`,
          example: R`// lib/dal.ts
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { jwtVerify } from "jose";
const key = new TextEncoder().encode(process.env.SESSION_SECRET);
export const verifySession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) redirect("/login");
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return { userId: String(payload.userId), role: String(payload.role) };
  } catch {
    redirect("/login");
  }
});
export async function getMyOrders() {
  const { userId } = await verifySession();
  return db.order.findMany({ where: { userId }, select: { id: true, status: true, totalCents: true } });
}
export async function requireAdmin() {
  const session = await verifySession();
  if (session.role !== "ADMIN") notFound();
  return session;
}`,
          try: R`حط [[console.log("verify")]] جوه [[verifySession]]، ونادها من الصفحة ومن الـ layout ومن كومبوننت: هتطبع مرة واحدة في الطلب. وبعدين شيل [[cache]] وعدّ. وجرّب تفتح صفحة الـ dashboard بـ cookie مزوّرة (اللي عدّت من الـ proxy في درس [[proxy.ts]]): المرة دي هتتحول للـ login.`,
          flag: "script",
          deep: {
            why: "لو الحماية في مكان واحد بعيد عن الداتا (الـ proxy أو الـ layout)، أي مسار تاني للداتا بيعدّي من غيرها: Server Action، أو Route Handler، أو صفحة جديدة حد نسي يحطها تحت الـ layout. لما كل query خاص بيسأل «مين؟» بنفسه، مستحيل تنسى.",
            how: R`الفكرة من وثائق Next نفسها: طبقة واحدة هي اللي بتكلّم الداتابيز للداتا الخاصة، وكل دالة فيها بتعمل ٣ حاجات: تتحقق من الـ session، وتتحقق من الصلاحية على الحاجة دي بالذات، وترجّع DTO (الأعمدة اللي الواجهة محتاجاها بس، مش الـ row كله). والصفحات والـ actions والـ route handlers بينادوا الـ DAL، ومبيلمسوش [[db]] مباشرة.

[[cache()]] من React بيعمل memoization طول الطلب الواحد بس (per request). ده مش كاش بين المستخدمين، فآمن تمامًا لبيانات المستخدم. عكس [[use cache]] اللي مشترك.

ليه الـ layout مش كفاية؟ Next بيعمل partial rendering: في التنقل بين صفحتين تحت نفس الـ layout، الـ layout مبيتنفذش تاني. ولو الـ session انتهت، الصفحة الجديدة هتترسم من غير ما حد يتحقق. وكمان الصفحة ممكن تتطلب لوحدها (RSC request) من غير الـ layout.

الـ proxy مكمّل: redirect سريع قبل ما أي حاجة تترسم (تجربة أحسن)، وبيقرا الـ cookie بس من غير داتابيز. والـ DAL هو الحماية.

وفيه [[forbidden()]] و [[unauthorized()]] من [[next/navigation]] بيرجّعوا 403 و 401 بصفحات خاصة، بس لسه تجريبيين ومحتاجين [[experimental.authInterrupts]]. لحد ما يبقوا stable، [[notFound()]] أو [[redirect]] كفاية.`,
            when: "أي مشروع فيه داتا خاصة بالمستخدم. ابدأ بالـ DAL من أول يوم: نقله بعدين معناه تلف على كل query في المشروع.",
            mistakes: R`الـ auth في الـ layout بس، أو في الـ proxy بس. و [[db.order.findUnique({ where: { id } })]] من غير userId، فأي حد يغيّر الـ id في الـ URL يشوف طلبات غيره (IDOR). وترجّع الـ user row كله للكومبوننت بالـ passwordHash. و [[use cache]] على دالة بتقرا الـ session. وتنسى [[server-only]] فحد يعمل import للـ DAL من client component.`
          },
          teach: R`## الفكرة: دالة واحدة بتسأل «مين؟» قبل أي داتا خاصة

[[verifySession]] بتقرا الـ cookie وتتحقق من التوقيع بجد، ولو فيه مشكلة بتحوّل للـ login. و [[getMyOrders]] و [[requireAdmin]] مبنيين عليها. اتشغّل في نفس مشروع درس [[session cookie]] (Next.js 16.4.0 من غير [[cacheComponents]]، [[next start]] على بورت 5830)، ومعاه [[proxy.ts]] بيشوف الـ cookie موجودة ولا لأ بس، وصفحة [[/dashboard]] فيها layout وصفحة وكومبوننت صغير، التلاتة بينادوا [[verifySession]]، والصفحة كمان بتنادي [[getMyOrders]]. وحطينا [[console.log("verify")]] أول سطر في [[verifySession]].

---

## ١. [[import "server-only"]]

سطر من غير أسماء: بيستورد package اسمها [[server-only]] (اتسطبت بـ [[npm i server-only]]). لو أي client component عمل import للملف ده (حتى بشكل غير مباشر)، الـ build بيقع. ده بيضمن إن السر وكود الداتابيز عمرهم ما يتبعتوا للمتصفح.

---

## ٢. الـ imports الباقية

| الـ import | من فين | بيعمل إيه هنا |
|---|---|---|
| [[cache]] | [[react]] | يخلي الدالة تتنفذ مرة واحدة في الطلب |
| [[cookies]] | [[next/headers]] | يقرا الـ cookie |
| [[notFound]] و [[redirect]] | [[next/navigation]] | 404، وتحويل |
| [[jwtVerify]] | [[jose]] | يتحقق من توقيع التوكن ومدته |

و [[key]] نفس السر اللي اتوقّع بيه التوكن في درس [[session cookie]]: لازم يبقى هو هو، وإلا كل التوكنات هتترفض.

---

## ٣. [[verifySession]] من جوه لبرة

### [[cache(async () => {...})]]

[[cache]] بتاخد دالة وترجّع نسخة منها بتفتكر النتيجة **طول الطلب الواحد بس**. أول نداء بينفذ، وأي نداء تاني في نفس الطلب بياخد نفس النتيجة. والطلب اللي بعده بيبدأ من الأول، فمفيش داتا مستخدم بتوصل لمستخدم تاني.

### [[(await cookies()).get("session")?.value]]

- [[.get("session")]] بيرجّع object فيه [[name]] و [[value]]، أو [[undefined]] لو مفيش cookie بالاسم ده.
- [[?.]] (optional chaining): لو اللي قبلها [[undefined]]، متكمّلش ورجّع [[undefined]] بدل ما يطلع خطأ.

### [[if (!token) redirect("/login")]]

مفيش cookie خالص؟ روح سجّل دخول.

### [[jwtVerify(token, key, { algorithms: ["HS256"] })]]

بيعمل ٣ حاجات: يتأكد إن التوقيع معمول بنفس السر، وإن [[exp]] لسه مجاش، وإن الخوارزمية من اللي في [[algorithms]]. لو أي واحدة غلط بيرمي error. و [[algorithms]] بتقفل هجمة قديمة: توكن header بتاعه [[{"alg":"none"}]] (من غير توقيع خالص).

ولو نجح بيرجّع object فيه [[payload]]، و [[const { payload } = ...]] بتطلّع الخانة دي بس (destructuring).

### [[return { userId: String(payload.userId), role: String(payload.role) }]]

[[payload]] نوعه عام (أي حاجة)، فـ [[String()]] بتضمن إنهم نصوص. والدالة بترجّع الحاجتين دول بس.

### [[catch { redirect("/login") }]]

أي توكن مزوّر أو منتهي يوصل هنا. والـ [[redirect]] هنا جوه [[catch]] مش جوه [[try]]، فمحدش هيمسكه.

---

## ٤. جرّبنا ٦ حالات بـ curl

[[curl -s -o /dev/null -w "%{http_code} %{redirect_url}"]] يعني: متطبعش الصفحة، اطبع الـ status والمكان اللي بيحوّل عليه بس. و [[-H "Cookie: ..."]] بيبعت cookie بإيدنا. والتوكنات الحقيقية عملناها بسكربت صغير بـ [[SignJWT]] بنفس السر.

~~~text الناتج
بدون cookie                          307 http://localhost:5830/login
session=anything                     307 http://localhost:5830/login
توكن صحيح (u_1)                      200
توكن صحيح بس منتهي من ساعة            307 http://localhost:5830/login
توكن header بتاعه alg: none ودوره ADMIN   307 http://localhost:5830/login
~~~

مين وقف مين؟ عدّينا سطور [[verify]] في لوج السيرفر: الطلب الأول (من غير cookie) مطبعش [[verify]]، يعني الـ proxy هو اللي حوّله قبل ما الصفحة تترسم. الباقيين كلهم طبعوا [[verify]]: الـ proxy عدّاهم (فيه cookie اسمها [[session]]، وهو مش بيتحقق من حاجة)، و [[jwtVerify]] هو اللي رفض. ده بالظبط معنى «الـ proxy متفائل والـ DAL هو الحماية».

---

## ٥. [[cache]] بيوفّر إيه فعلًا؟

في طلب [[/dashboard]] واحد بتوكن صحيح، [[verifySession]] اتنادت ٤ مرات: الـ layout، والصفحة، والكومبوننت، و [[getMyOrders]].

~~~text لوج السيرفر لطلب واحد
مع cache      verify                      (مرة واحدة)
من غير cache  verify verify verify verify  (٤ مرات)
~~~

مع JWT ده ٤ مرات فك توكن (رخيص). ومع database sessions ده ٤ queries على الداتابيز في كل صفحة.

---

## ٦. [[getMyOrders]]: الفلتر جوه الـ query

~~~text
const { userId } = await verifySession();
return db.order.findMany({ where: { userId }, select: { id: true, status: true, totalCents: true } });
~~~

- [[where: { userId }]] (اختصار [[userId: userId]]): طلبات المستخدم ده بس. مفيش طريقة تجيب طلبات حد تاني من الدالة دي.
- [[select]]: الأعمدة دي بس. الجدول الوهمي عندنا فيه عمود [[secretNote]]، والناتج اللي اتعرض في الصفحة:

~~~text الناتج
[{"id":"o_1","status":"PAID","totalCents":25000}]
~~~

طلب واحد من اتنين (التاني بتاع الأدمن)، ومن غير [[secretNote]]. ده اسمه DTO: الواجهة بتاخد اللي محتاجاه بس.

---

## ٧. [[requireAdmin]]

~~~text
const session = await verifySession();
if (session.role !== "ADMIN") notFound();
return session;
~~~

عملنا صفحة [[/admin]] بتناديها:

~~~text الناتج
/admin بتوكن USER    404
/admin بتوكن ADMIN   <h1>admin u_2</h1>
~~~

[[notFound()]] بدل 403 عشان المستخدم العادي ميعرفش إن الصفحة موجودة أصلًا. والدور جاي من التوكن الموقّع، فمحدش يقدر يغيّره (حالة [[alg: none]] فوق كانت محاولة لده واترفضت).

> لو [[cacheComponents: true]] شغال في [[next.config.ts]] (وقالب [[create-next-app]] 16.4 بيشغّله لوحده)، الـ build وقع عندنا على [[/admin]] بـ [[Next.js encountered uncached or runtime data during prerendering]]، لأن [[cookies()]] اتقرت برّه [[<Suspense>]]. الحل اللي الرسالة بتقترحه: الجزء اللي بينادي الـ DAL يبقى جوه [[<Suspense fallback={...}>]] (فئة Cache Components).

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[server-only]] | الملف ميوصلش للمتصفح |
| [[cache()]] | تحقق واحد في الطلب مهما اتنادت |
| [[jwtVerify]] + [[algorithms]] | التوقيع والمدة والخوارزمية |
| [[redirect("/login")]] | مفيش توكن أو بايظ |
| [[where: { userId }]] + [[select]] | الملكية جوه الـ query، وأعمدة قليلة |
| [[notFound()]] | مش أدمن = الصفحة «مش موجودة» |
| الـ proxy | فحص سريع للوجود بس، مش حماية |`,
          lines: [
            "لو client component عمله import بالغلط، الـ build يقع.",
            R`[[cache]] من React: نفس النتيجة طول الطلب الواحد.`,
            "الـ cookies.",
            "redirect و notFound.",
            "التحقق من التوقيع.",
            "نفس السر اللي اتوقّع بيه.",
            R`الدالة كلها جوه [[cache]]، فأي عدد نداءات في نفس الطلب = تحقق واحد.`,
            "اقرا الـ cookie.",
            "مفيش؟ روح login.",
            "جرّب...",
            R`...تتحقق من التوقيع والمدة. [[algorithms]] بتقفل هجمات تغيير الخوارزمية.`,
            "رجّع المستخدم.",
            "توكن مزوّر أو خلص...",
            "...روح login.",
            "قفلة.",
            R`قفلة الـ [[cache]].`,
            "أي داتا خاصة بتعدّي من هنا.",
            "المستخدم الأول.",
            "الفلتر بالـ userId جوه الـ query، والأعمدة المطلوبة بس (DTO).",
            "قفلة.",
            "للصفحات والـ actions بتاعة الأدمن.",
            "المستخدم.",
            "مش أدمن؟ 404 كأن الصفحة مش موجودة أصلًا.",
            "رجّعه عشان تستخدم الـ id.",
            "قفلة."
          ],
          sol: R`مع [[cache]]: [[verify]] بتطبع مرة واحدة في الطلب، حتى لو الـ layout والصفحة وكومبوننت جواها التلاتة نادوها (جربتها وطلعت مرة). من غير [[cache]]: ٣ مرات، يعني ٣ مرات فك توكن، أو ٣ queries لو database sessions.

والـ cookie المزوّرة ([[session=anything]]): المرة دي [[/dashboard]] بترجع [[307]] لـ [[/login]]، لأن [[jwtVerify]] رمت والـ catch عمل [[redirect]]. الـ proxy عدّاها زي ما هو، والـ DAL وقفها. لو الصفحة فتحت بالـ cookie المزوّرة: الصفحة مش بتنادي [[verifySession]]، أو فيه مكان بيقرا الـ cookie بنفسه من غير تحقق.`
        },
        {
          cmd: "BFF",
          title: "Next قدام API منفصل: التوكن يفضل على السيرفر (BFF)",
          desc: R`لو الـ backend منفصل (Express أو FastAPI)، ممكن تخلي Next «Backend For Frontend»: الـ server components والـ actions هما اللي بيكلّموا الـ API، والتوكن بتاع الـ API متخزن في cookie [[httpOnly]] عند Next، وعمره ما بيوصل للـ JavaScript في المتصفح.

الطلب بيبقى: المتصفح ← Next (معاه الـ cookie) ← الـ API (بـ [[Authorization: Bearer]]). والـ client components اللي محتاجة داتا بتكلّم Server Action أو Route Handler في Next، مش الـ API مباشرة.`,
          example: R`// lib/api.ts
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) redirect("/login");
  const res = await fetch($__bt$__{process.env.API_URL}$__{path}$__bt, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: $__btBearer $__{token}$__bt },
    cache: "no-store",
  });
  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error($__btAPI $__{res.status} $__{path}$__bt);
  return (await res.json()) as T;
}
// app/orders/page.tsx
const orders = await api<Order[]>("/orders");
// app/actions/orders.ts ("use server")
await api("/orders/" + id + "/cancel", { method: "POST" });`,
          try: R`لو عندك API من تاب «Backend بـ Node»، اعمل login action بيكلّمه ويحط الـ access token في cookie، وبعدين صفحة بتعرض الطلبات بـ [[api()]]. افتح DevTools > Network: مش هتلاقي أي طلب للـ API من المتصفح، ولا التوكن في أي مكان يقدر JS يوصله.`,
          flag: "script",
          deep: {
            why: "لما المتصفح بيكلّم الـ API مباشرة، التوكن لازم يبقى في JS (localStorage أو memory)، وده معرّض لـ XSS، ولازم CORS، والـ server components مش هتقدر تستخدمه. الـ BFF بيحل الاتنين: التوكن على السيرفر، والصفحات بتترسم بالداتا من أول لحظة.",
            how: R`الـ login: Server Action بيبعت الإيميل والباسورد للـ API، ياخد access و refresh tokens، ويحطهم في cookies [[httpOnly]]. من هنا المتصفح مش شايف غير cookie بتاعة Next.

المشكلة الصعبة: الـ refresh. الـ server component يقدر يقرا الـ cookie بس ميقدرش يكتبها. فلو الـ access token خلص وانت بترسم صفحة، مش هتقدر تحط الجديد. الحلول: الـ proxy يشيك على مدة التوكن (لو قربت تخلص يعمل refresh ويحط الـ cookie الجديدة في الرد) قبل ما الصفحة تترسم، أو Route Handler للـ refresh والـ client يناديه، أو access token عمره أطول شوية.

الـ client components: لو محتاجة داتا بتتغير (بحث live)، تنادي Server Action أو Route Handler في Next، وده بيعمل [[api()]]. متخليش الـ client يعرف URL الـ API.

والتكلفة: رحلة زيادة (المتصفح ← Next ← API)، فخلي Next والـ API في نفس الـ datacenter أو الشبكة. والـ API نفسه لسه لازم يتحقق من التوكن والصلاحيات: الـ BFF مش بديل عن الحماية في الـ API. وتفاصيل التصميم ده في تاب «بناء مشروع كامل».`,
            when: "Next واجهة لـ API منفصل (Express أو FastAPI أو Laravel) عندك أو عند فريق تاني، وعايز SSR وتوكن مش مكشوف. لو Next هو الـ backend نفسه، مش محتاج ده: الـ DAL كفاية.",
            mistakes: R`تحط الـ access token في [[NEXT_PUBLIC_]] أو في localStorage «عشان الـ client components». و [[cache: "force-cache"]] أو [[use cache]] على طلب فيه توكن مستخدم، فالداتا تتشارك. وتحاول تعمل refresh للتوكن جوه server component وتكتب cookie فيطلع خطأ. وتعمل proxy لكل الـ API بـ rewrites من غير ما تضيف التوكن، فمفيش فرق عن إن المتصفح يكلّمه مباشرة.`
          },
          teach: R`## الفكرة: دالة واحدة في Next هي الوحيدة اللي بتكلّم الـ API

[[api()]] بتاخد مسار زي [[/orders]]، وتجيب التوكن من الـ cookie، وتبعت الطلب للـ API ومعاه التوكن، وترجّع الـ JSON. والصفحات والـ actions بينادوها. اتشغّل في مشروع Next.js 16.4.0 ([[next start]] على بورت 5830)، ومكان الـ API الحقيقي عملنا سيرفر Node صغير على بورت 5833 فيه ٣ مسارات: [[POST /login]] بيرجّع [[accessToken]]، و [[GET /orders]]، و [[POST /orders/:id/cancel]]، وبيرجّع 401 لأي طلب من غير [[Authorization: Bearer]] صح، وبيطبع سطر لكل طلب جاله.

---

## ١. السطور الأولى

- [[import "server-only"]]: الملف ده فيه التوكن، فلو client component استورده الـ build يقع.
- [[cookies]] و [[redirect]]: زي الدرسين اللي فاتوا.

---

## ٢. توقيع الدالة: [[api<T>(path, init = {}): Promise<T>]]

| الحتة | معناها |
|---|---|
| [[<T>]] | generic: نوع بيتحدد وقت النداء. [[api<Order[]>("/orders")]] يعني «الرد array من Order» |
| [[path: string]] | المسار في الـ API |
| [[init: RequestInit = {}]] | نفس خيارات [[fetch]] ([[method]] و [[body]]...)، والافتراضي object فاضي |
| [[Promise<T>]] | بترجّع (بعد [[await]]) حاجة من النوع [[T]] |

---

## ٣. التوكن

~~~text
const token = (await cookies()).get("access_token")?.value;
if (!token) redirect("/login");
~~~

الـ cookie [[access_token]] اتحطت وقت الـ login بـ [[httpOnly]]. وعملنا Server Action للـ login بيبعت الإيميل والباسورد لـ [[POST /login]] في الـ API، وياخد [[accessToken]] ويحطه:

~~~text app/actions/orders.ts (جزء)
(await cookies()).set("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
~~~

---

## ٤. الطلب نفسه: [[fetch(...)]]

~~~text
const res = await fetch(API_URL + path, {
  ...init,
  headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
  cache: "no-store",
});
~~~

(في المثال الـ URL والـ header مكتوبين template string، وده نفس الكلام.)

- [[process.env.API_URL]]: عنوان الـ API ([[http://localhost:5833]] عندنا في [[.env.local]]). من غير [[NEXT_PUBLIC_]]، فالقيمة دي مبتتحطش في كود المتصفح أصلًا.
- [[...init]]: spread: انسخ كل اللي اتبعت (زي [[method: "POST"]]) جوه الـ object ده.
- [[headers]]: بعد الـ spread، فلو [[init]] فيه [[headers]] هيتبدّل بدول. و [[Authorization: Bearer <token>]] هو الشكل القياسي لبعت توكن.
- [[cache: "no-store"]]: متكاشش الرد. ده داتا مستخدم معيّن، ولو اتكاش ممكن يتعرض لغيره.

---

## ٥. الرد

~~~text
if (res.status === 401) redirect("/login");
if (!res.ok) throw new Error("API " + res.status + " " + path);
return (await res.json()) as T;
~~~

- [[401]] (Unauthorized): التوكن خلص أو اتلغى، فارجع login.
- [[res.ok]] بيبقى [[true]] لو الـ status بين 200 و 299. غير كده [[throw]]، فأقرب [[error.tsx]] بيعرض صفحة الخطأ.
- [[as T]]: بتقول لـ TypeScript «صدّقني، ده T». مش فحص حقيقي: لو الـ API رجّع شكل تاني، TS مش هيعرف.

جرّبنا بـ curl، cookie قديمة ومن غير cookie خالص:

~~~text الناتج
access_token=old   307 http://localhost:5830/login
بدون cookie        307 http://localhost:5830/login
~~~

ولوج الـ API في الحالة الأولى: [[GET /orders auth=Bearer old]]، يعني الطلب وصل للـ API، رجع 401، و [[api()]] حوّلت.

---

## ٦. النداء من صفحة ومن action

~~~text
const orders = await api<Order[]>("/orders");                 // server component
await api("/orders/" + id + "/cancel", { method: "POST" });   // Server Action
~~~

عملنا صفحة [[/orders]] بتعرض الطلبات وجنب كل واحد زرار «إلغاء» بيشغّل Server Action فيه السطر التاني و [[revalidatePath("/orders")]] (عشان الصفحة تترسم تاني بالحالة الجديدة). Chrome headless دخل وضغط إلغاء على [[o_1]]:

~~~text الناتج في الصفحة
o_1: PAID  o_2: PAID
o_1: CANCELLED  o_2: PAID
~~~

ولوج الـ API (مين كلّمه):

~~~text الناتج
POST /login auth=none ua=node
GET /orders auth=Bearer tok_sara_123 ua=node
POST /orders/o_1/cancel auth=Bearer tok_sara_123 ua=node
GET /orders auth=Bearer tok_sara_123 ua=node
~~~

[[ua=node]] (أول حروف الـ User-Agent): كل الطلبات جت من سيرفر Node (اللي هو Next)، مش من Chrome. والـ [[GET]] الأخير هو الرسم التاني بعد الإلغاء.

---

## ٧. المتصفح شاف إيه؟

جمّعنا كل الطلبات اللي Chrome عملها طول التجربة:

~~~text الناتج
[ 'localhost:5830 GET', 13 ], [ 'localhost:5830 POST', 2 ]
document.cookie ""   localStorage keys []
html has 5833? false   has token? false
~~~

- كل الطلبات لـ Next نفسه (الصفحات والـ JS والـ RSC، و ٢ POST هما الـ login والإلغاء). ولا طلب واحد لبورت 5833.
- الـ cookie [[access_token]] موجودة وعليها HttpOnly، بس [[document.cookie]] فاضي، و localStorage فاضي.
- الـ HTML النهائي مفيهوش عنوان الـ API ولا التوكن.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[server-only]] | الملف اللي فيه التوكن ميوصلش للمتصفح |
| التوكن في cookie [[httpOnly]] عند Next | JS ميقراهوش |
| [[API_URL]] من غير [[NEXT_PUBLIC_]] | المتصفح ميعرفش عنوان الـ API |
| [[Authorization: Bearer]] من السيرفر | الـ API بيتحقق زي ما هو |
| [[cache: "no-store"]] | داتا مستخدم متتكاشش |
| 401 → [[redirect("/login")]] | التوكن خلص (أو refresh في الـ proxy) |
| [[as T]] | وعد مش فحص: Zod لو الـ API مش بتاعك |`,
          lines: [
            "على السيرفر بس: فيه التوكن.",
            "الـ cookies.",
            "التحويل.",
            R`helper واحد لكل طلبات الـ API، و [[T]] نوع الرد.`,
            R`التوكن من cookie [[httpOnly]] اتحطت وقت الـ login.`,
            "مفيش؟ login.",
            R`عنوان الـ API من متغير بيئة سيرفر (من غير [[NEXT_PUBLIC_]]): المتصفح مش محتاج يعرفه أصلًا.`,
            "الخيارات اللي اتبعتت.",
            "التوكن في الـ header من السيرفر.",
            "داتا المستخدم متتكاشش.",
            "قفلة.",
            "التوكن خلص؟ login (أو refresh، في الشرح).",
            "أي خطأ تاني يروح لـ error.tsx.",
            R`الـ JSON. الـ [[as T]] وعد مش فحص: لو الـ API مش بتاعك افحصه بـ Zod.`,
            "قفلة.",
            "server component بيجيب الداتا مباشرة.",
            "Server Action بيعمل تعديل: المتصفح بينادي الـ action، والـ action بيكلّم الـ API."
          ],
          sol: R`في Network هتلاقي كل الطلبات رايحة لـ [[localhost:3000]] (الصفحة، وطلبات الـ RSC، و POST الـ actions)، ومفيش أي طلب لعنوان الـ API. الطلب للـ API بيحصل من سيرفر Next، فهتشوفه في لوج الـ API نفسه مش في المتصفح.

والتوكن: في Application > Cookies هتلاقي [[access_token]] عليها HttpOnly، و [[document.cookie]] مش بيرجّعها، ومش موجودة في localStorage. ولو دوّرت في Sources على عنوان الـ API أو قيمة التوكن: مش هتلاقيهم. لو لقيت طلبات من المتصفح للـ API مباشرة: فيه client component بيعمل fetch بنفسه، حوّله لـ Server Action أو Route Handler.`
        }
      ]
    }
]);
