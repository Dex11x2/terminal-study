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
    },
    {
      t: "مكتبات الـ auth",
      l: 2,
      n: "Better Auth مع Prisma: تسجيل ودخول، و session في السيرفر، و Google و GitHub، وأدوار وصلاحيات",
      items: [
        {
          cmd: "better-auth",
          title: "تركّب Better Auth مع Prisma في مشروع Next",
          desc: R`الفئة اللي فاتت عملت الـ auth بإيدك عشان تفهمه. في الشغل الحقيقي أغلب مشاريع Next في ٢٠٢٦ بتستخدم مكتبة. التاب ده بيستخدم Better Auth: مكتبة TypeScript مفتوحة المصدر بتتخزن في داتابيزك انت، وفيها plugins لكل حاجة (أدوار، و 2FA، و organizations). وفريقها هو اللي ماسك Auth.js (NextAuth) من سبتمبر ٢٠٢٥، وهم نفسهم بينصحوا بـ Better Auth لأي مشروع جديد. و Auth.js v5 لسه beta على npm (النسخة المستقرة v4).

التركيب ٤ خطوات: [[npm i better-auth]]، ومتغيرين في [[.env]]: [[BETTER_AUTH_SECRET]] (من [[openssl rand -base64 32]]) و [[BETTER_AUTH_URL]] (عنوان الموقع). وبعدين [[lib/auth.ts]] فيه الإعدادات، و [[npx auth@latest generate]] بيضيف الجداول لـ [[schema.prisma]]، وبعده [[npx prisma migrate dev]]. وآخر حاجة route handler واحد بيستقبل كل طلبات الـ auth على [[/api/auth/*]].`,
          example: R`// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  plugins: [nextCookies()],
});
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
export const { GET, POST } = toNextJsHandler(auth);
// lib/auth-client.ts (للـ client components)
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();`,
          try: R`في مشروع الـ lab (مع Prisma من تاب «SQL و Prisma») ركّب المكتبة واعمل الملفات التلاتة، وشغّل [[npx auth@latest generate]] وبص على [[schema.prisma]]: إيه الـ models اللي اتضافت؟ وبعد الـ migrate اعمل حساب بـ curl: [[curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara@example.com","password":"long-password-1"}']]. وافتح [[npx prisma studio]] وشوف الباسورد اتخزن فين. وجرّب تاني بباسورد ٥ حروف.`,
          flag: "script",
          deep: {
            why: "الـ auth من الصفر فيه حاجات كتير لازم تتعمل صح: hashing، و sessions بتتلغي، و OAuth بـ state و PKCE، وربط الحسابات، وتأكيد الإيميل، وإعادة تعيين الباسورد، و rate limit على الدخول. أي غلطة في أي واحدة منهم ثغرة. المكتبة بتدّيك الحاجات دي متجرّبة على آلاف المشاريع، وانت بتركّز على الصلاحيات والداتا بتاعتك.",
            how: R`[[betterAuth()]] بيعمل object واحد فيه كل حاجة: [[auth.handler]] (اللي [[toNextJsHandler]] بيلفه لـ GET و POST) و [[auth.api]] (نفس الـ endpoints كدوال تناديها من السيرفر مباشرة).

الجداول: [[npx auth@latest generate]] بيقرا [[lib/auth.ts]] ويكتب ٤ models في الـ schema: [[User]] و [[Session]] و [[Account]] و [[Verification]]. الباسورد مش في جدول [[User]]: بيتخزن في [[Account]] على إنه حساب [[providerId: "credential"]]، و Google و GitHub حسابات تانية لنفس المستخدم. وده اللي بيخلي ربط الحسابات سهل. والـ hash افتراضيًا scrypt. ولو ضفت plugin بيحتاج أعمدة (زي admin)، شغّل generate تاني و migrate. (الـ CLI محتاج Prisma client متولّد، فلو بيقول module مش موجود اعمل [[npx prisma generate]] الأول.)

الـ session: database session في جدول [[Session]]، و cookie اسمها [[better-auth.session_token]] (و [[__Secure-]] قبلها على HTTPS) عليها HttpOnly و SameSite=Lax. بتعيش ٧ أيام افتراضيًا وبتتجدد مع الاستخدام. يعني نفس اللي عملته بإيدك في درس [[session cookie]]، بس بجدول تقدر تمسح منه.

[[nextCookies()]]: لما تنادي [[auth.api.signInEmail]] من Server Action، المكتبة بترجّع [[Set-Cookie]] في الرد الداخلي، والـ plugin ده بيحطها في [[cookies()]] بتاعة Next. من غيره الدخول بينجح والـ cookie متتحطش. ولازم يبقى آخر plugin في الـ array.

وفيه حماية CSRF لوحدها: أي POST معاه cookies لازم يبقى [[Origin]] بتاعه هو [[BETTER_AUTH_URL]] أو في [[trustedOrigins]]، وإلا [[INVALID_ORIGIN]].`,
            when: R`أي مشروع Next الـ backend بتاعه Next نفسه وعايز الداتا في داتابيزك. لو عايز واجهات جاهزة وإدارة مستخدمين من غير ما تشيل هم، خدمة زي Clerk (بتدفع مع عدد المستخدمين). ولو شغال على Supabase أصلًا، Supabase Auth. ولو الـ auth في API منفصل، درس [[BFF]] مش ده.`,
            mistakes: R`تنسى [[BETTER_AUTH_SECRET]] في الإنتاج أو تحطه قصير. و [[BETTER_AUTH_URL]] غلط (http بدل https، أو localhost على السيرفر) فكل الطلبات ترجع [[INVALID_ORIGIN]] و OAuth يرجع على عنوان غلط. وتعدّل جداول الـ auth بإيدك بدل generate. وتنسى [[nextCookies()]] أو تحطه قبل plugins تانية فالدخول من Server Action «بينجح» والمستخدم مش داخل. وتفتكر إن تركيب المكتبة كفاية: الصلاحيات والفلترة بالـ userId لسه شغلك (الدرسين الجايين). وفي الانترفيو: «ليه مكتبة؟» الإجابة الكويسة مش «أسهل»، هي «الحاجات الصعبة (OAuth و sessions بتتلغي وربط الحسابات) متجرّبة، وانا فاهم اللي تحت».`
          },
          lines: [
            R`[[betterAuth]] بيعمل الـ instance اللي فيه كل حاجة.`,
            "الـ adapter اللي بيخلي المكتبة تكتب وتقرا بـ Prisma.",
            R`plugin بيخلي الـ cookies تتحط لما تنادي المكتبة من Server Action.`,
            R`نفس Prisma client بتاع المشروع ([[lib/db.ts]]). Better Auth مش بيعمل اتصال لوحده.`,
            R`[[auth]] ده اللي هتستورده في كل مكان على السيرفر.`,
            "الداتابيز: Prisma على PostgreSQL.",
            "دخول بالإيميل والباسورد، وأقل طول ١٠ (الافتراضي ٨).",
            "آخر plugin في الليستة لازم يبقى ده.",
            "قفلة.",
            "الـ instance.",
            "بيحوّل الـ handler لـ route handler بتاع Next.",
            R`GET و POST لكل المسارات تحت [[/api/auth]]: sign-up و sign-in و get-session و callback بتاع OAuth وغيرهم.`,
            R`الـ client بتاع React (فيه [[useSession]] و [[signIn]] و [[signOut]]).`,
            "بيكلّم نفس الموقع افتراضيًا، فمش محتاج URL."
          ],
          sol: R`بعد generate هتلاقي ٤ models اتضافوا: [[User]] (الاسم والإيميل و [[emailVerified]])، و [[Session]] (فيها [[token]] و [[expiresAt]] و [[ipAddress]] و [[userAgent]])، و [[Account]]، و [[Verification]]، وكل واحد عليه [[@@map]] لاسم جدول صغير زي [[user]].

الـ curl الأول بيرجّع JSON فيه [[token]] و [[user]] ([[emailVerified: false]])، لأن التسجيل بيعمل دخول لوحده. وفي Prisma Studio: صف في [[user]]، وصف في [[session]]، والباسورد مش في [[user]] خالص: هتلاقيه في [[account]] في عمود [[password]] بشكل [[salt:hash]] طويل، والـ [[providerId]] بتاعه [[credential]].

الباسورد القصير بيرجّع [[{"message":"Password too short","code":"PASSWORD_TOO_SHORT"}]]. ولو نفس الإيميل تاني: [[USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL]].

لو generate قال [[Cannot find module]] لـ Prisma client: اعمل [[npx prisma generate]] الأول. ولو الـ curl رجّع [[INVALID_ORIGIN]] أو [[MISSING_OR_NULL_ORIGIN]]: انت باعت cookie أو Origin مش مطابق لـ [[BETTER_AUTH_URL]]، وده الحماية شغالة صح.`,
          solCode: R`npm i better-auth
echo "BETTER_AUTH_SECRET=$(openssl rand -base64 32)" >> .env
echo "BETTER_AUTH_URL=http://localhost:3000" >> .env
npx prisma generate
npx auth@latest generate
npx prisma migrate dev --name auth
curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara@example.com","password":"long-password-1"}'
# {"token":"...","user":{"name":"Sara","email":"sara@example.com","emailVerified":false,...}}
curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara2@example.com","password":"short"}'
# {"message":"Password too short","code":"PASSWORD_TOO_SHORT"}`
        },
        {
          cmd: "signUpEmail و signInEmail",
          title: "تسجيل ودخول وخروج من Server Actions بالمكتبة",
          desc: R`[[auth.api]] فيه كل endpoint كدالة: [[signUpEmail]] و [[signInEmail]] و [[signOut]]. بتناديهم من Server Action وتبعتلهم [[headers: await headers()]] (عشان الـ IP والـ cookies)، و [[nextCookies()]] بيحط الـ cookie. ولو حصل خطأ (باسورد غلط، أو إيميل متسجل) بيرموا [[APIError]] من [[better-auth/api]] فيه [[status]] و [[body.code]].

والفورم نفسها زي فئة Server Actions بالظبط: [[useActionState]] والـ action بترجّع [[{ error }]]. وفيه طريق تاني من المتصفح: [[authClient.signIn.email()]]، بس الـ Server Action بيشتغل من غير JavaScript وبيخلي الـ redirect على السيرفر.`,
          example: R`// app/actions/auth.ts
"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
type State = { error?: string };
export async function signUp(_prev: State, formData: FormData): Promise<State> {
  try {
    await auth.api.signUpEmail({
      body: { name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") },
      headers: await headers(),
    });
  } catch (e) {
    if (!(e instanceof APIError)) throw e;
    return { error: e.body?.code === "PASSWORD_TOO_SHORT" ? "الباسورد لازم ١٠ حروف على الأقل" : "مش قادرين نعمل الحساب ده" };
  }
  redirect("/dashboard");
}
export async function signIn(_prev: State, formData: FormData): Promise<State> {
  try {
    await auth.api.signInEmail({
      body: { email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") },
      headers: await headers(),
    });
  } catch (e) {
    if (e instanceof APIError) return { error: "الإيميل أو الباسورد غلط" };
    throw e;
  }
  redirect("/dashboard");
}
export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}`,
          try: R`اعمل صفحة [[/login]] فيها فورم بـ [[useActionState(signIn, {})]] وزرار خروج بيستخدم [[signOut]]. ادخل وافتح DevTools > Application > Cookies: إيه اسم الـ cookie وعليها إيه؟ وبعدين علّق [[nextCookies()]] في [[lib/auth.ts]] وجرّب تدخل تاني. وآخر حاجة: اعمل خروج وبص على جدول [[session]] في Prisma Studio.`,
          flag: "script",
          deep: {
            why: R`الـ Server Action بيخلي فورم الدخول تشتغل حتى قبل ما الـ JS يحمّل، والـ redirect بيحصل على السيرفر، والأخطاء بترجع بنفس شكل أي فورم تانية في التطبيق. والمكتبة بتعمل الجزء الحساس: مقارنة الـ hash في وقت ثابت، وإنشاء session في الداتابيز، و cookie بالخيارات الصح.`,
            how: R`[[auth.api.signInEmail({ body, headers })]] بيعمل نفس اللي بيعمله [[POST /api/auth/sign-in/email]]، بس من غير HTTP: بيدوّر على المستخدم، ويقارن الباسورد، ويعمل صف في [[session]]، ويرجّع [[Set-Cookie]]. و [[nextCookies()]] عبارة عن hook بعد كل endpoint: لو فيه [[Set-Cookie]] بيكتبها بـ [[cookies().set]] بتاع Next، وده مسموح لأننا جوه Server Action.

[[headers]]: المكتبة محتاجاها عشان تعرف الـ IP والـ User-Agent (بيتخزنوا في الـ session) وعشان الـ rate limit. وفي [[signOut]] إجباري، لأنه بيقرا الـ cookie من الـ headers عشان يعرف أنهي session يمسح.

الأخطاء: [[APIError]] فيه [[status]] كنص ([[UNAUTHORIZED]] أو [[UNPROCESSABLE_ENTITY]]) و [[body]] فيه [[message]] و [[code]]. المكتبة نفسها بترجّع رسالة واحدة للإيميل الغلط والباسورد الغلط ([[INVALID_EMAIL_OR_PASSWORD]])، فحافظ على ده في رسالتك.

[[redirect]] برّه الـ try، لأنه بيرمي exception خاص، ولو جوه try هيتمسك كأنه خطأ. نفس القاعدة من فئة Server Actions.

والتسجيل بيعمل دخول لوحده ([[autoSignIn]] افتراضيًا true). لو عايز تأكيد إيميل قبل الدخول: [[emailAndPassword.requireEmailVerification]] مع [[emailVerification.sendVerificationEmail]] (تاب «بناء مشروع كامل» فيه تصميم الإيميلات دي).`,
            when: R`فورم التسجيل والدخول في أي تطبيق Next. استخدم [[authClient.signIn.email]] لو الفورم جوه client component معقدة (خطوات أو modal) ومحتاج [[onSuccess]] و [[onError]] في المتصفح.`,
            mistakes: R`[[redirect("/dashboard")]] جوه الـ try فيتمسك وترجع «الإيميل أو الباسورد غلط» مع إن الدخول نجح. وتنسى [[headers]] في [[signOut]] فالخروج مبيعملش حاجة. وتطبع [[e.message]] للمستخدم كما هو. وتقول «الإيميل ده مش متسجل» في الدخول فحد يعرف مين عنده حساب. ونسيان [[nextCookies()]] (أشهر سؤال في الـ issues: «الدخول نجح بس الـ session فاضية»). وتعمل rate limit لوحدك وتنسى إن المكتبة عندها واحد شغال افتراضيًا في الإنتاج بس.`
          },
          lines: [
            "ملف Server Actions.",
            R`[[headers()]] عشان نبعت الطلب للمكتبة.`,
            "التحويل بعد النجاح.",
            R`نوع الخطأ اللي المكتبة بترميه.`,
            R`الـ instance من [[lib/auth.ts]].`,
            R`الـ state اللي بترجع لـ [[useActionState]].`,
            "التسجيل: بياخد الـ state اللي فاتت والفورم، وبيرجّع state جديدة.",
            "جرّب...",
            R`[[signUpEmail]]: نفس [[POST /api/auth/sign-up/email]] من غير HTTP.`,
            R`الاسم والإيميل والباسورد من الفورم، و [[?? ""]] عشان [[null]] ميبقاش "null".`,
            "الـ headers: الـ IP والـ User-Agent بيتخزنوا مع الـ session.",
            "قفلة الطلب.",
            "لو رمى...",
            "أي خطأ مش من المكتبة (الداتابيز وقعت مثلًا) يروح لـ error.tsx.",
            R`خطأ معروف: رسالة واضحة للباسورد القصير، ورسالة عامة لأي حاجة تانية.`,
            "قفلة.",
            R`نجح: الـ cookie اتحطت بـ [[nextCookies]]، فحوّل. برّه الـ try.`,
            "قفلة.",
            "الدخول بنفس الشكل.",
            "جرّب...",
            R`[[signInEmail]]: بيقارن الباسورد ويعمل session.`,
            "الإيميل والباسورد.",
            "الـ headers.",
            "قفلة.",
            "لو رمى...",
            "رسالة واحدة للإيميل الغلط والباسورد الغلط.",
            "غير كده ارمي.",
            "قفلة.",
            "داخل.",
            "قفلة.",
            "الخروج.",
            R`بيمسح الـ session من الداتابيز والـ cookie. الـ headers إجبارية عشان يعرف أنهي session.`,
            "روح الـ login.",
            "قفلة."
          ],
          sol: R`بعد الدخول هتلاقي cookie اسمها [[better-auth.session_token]] (على localhost من غير [[__Secure-]])، عليها HttpOnly و SameSite=Lax وعمرها ٧ أيام. قيمتها token ونقطة وتوقيع، مش JWT تقدر تقراه.

لما تعلّق [[nextCookies()]]: الـ action بيعدّي من غير خطأ، والـ redirect يحصل، بس الـ dashboard يرجّعك للـ login، لأن الـ Set-Cookie فضل جوه نتيجة الدالة ومحدش حطه في الرد. ودي بالظبط أشهر مشكلة.

بعد الخروج: الصف بتاع الـ session اتمسح من جدول [[session]] (أو قل عددهم واحد)، والـ cookie اختفت. ولو نسخت قيمة الـ cookie القديمة وحطيتها بإيدك، [[getSession]] هيرجّع [[null]]، لأن الـ session مش موجودة في الداتابيز. ده الفرق عن الـ JWT اللي في درس [[session cookie]]: هناك التوكن القديم كان هيفضل صالح لحد ما يخلص.

الغلط الشائع: تحط [[redirect]] جوه الـ try فتشوف «الإيميل أو الباسورد غلط» مع إن الـ cookie اتحطت.`,
          solCode: R`// app/login/page.tsx
"use client";
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="grid max-w-sm gap-3">
      <input name="email" type="email" autoComplete="email" required />
      <input name="password" type="password" autoComplete="current-password" required />
      <button disabled={pending}>{pending ? "بيدخل..." : "دخول"}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}`
        },
        {
          cmd: "getSession",
          title: "تعرف المستخدم في server components والـ actions والـ proxy",
          desc: R`على السيرفر: [[auth.api.getSession({ headers: await headers() })]] بيرجّع [[{ user, session }]] أو [[null]]. ده بيعمل query للداتابيز، فلفّه في [[cache()]] جوه الـ DAL زي درس [[DAL]] بالظبط، والصفحات والـ actions بتنادي [[requireUser()]]. وفي client components: [[authClient.useSession()]].

وفي [[proxy.ts]]: [[getSessionCookie(request)]] من [[better-auth/cookies]] بيشوف الـ cookie موجودة ولا لأ بس، من غير داتابيز. ده الفحص المتفائل السريع، والحماية الحقيقية في الـ DAL.`,
          example: R`// lib/dal.ts
import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session.user;
}
export async function getMyOrders() {
  const user = await requireUser();
  return db.order.findMany({ where: { userId: user.id }, select: { id: true, status: true, totalCents: true } });
}
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/account/:path*"] };`,
          try: R`اعمل [[app/dashboard/page.tsx]] بيعرض [[user.name]] من [[requireUser()]] والطلبات من [[getMyOrders()]]. جرّب ٣ حالات: من غير cookie، و cookie اسمها [[better-auth.session_token]] بقيمة عشوائية (من DevTools)، و cookie حقيقية. في كل حالة: مين وقفك، الـ proxy ولا الـ DAL؟ وبعدين امسح صف الـ session من Prisma Studio وانت داخل واعمل refresh.`,
          flag: "script",
          deep: {
            why: R`نفس درس الـ DAL: الحماية جنب الداتا عشان مفيش طريق للداتا يعدّي من غيرها. الفرق إن المكتبة بقت هي اللي بتتحقق من الـ session، وانت بتبني فوقها. ولأن الـ session في الداتابيز، لو مسحتها (خروج من كل الأجهزة، أو حساب اتقفل) أول طلب بعدها بيتقفل، عكس JWT.`,
            how: R`[[getSession]] بيقرا الـ cookie من الـ headers، ويتحقق من التوقيع، ويجيب الـ session والمستخدم من الداتابيز، ولو الـ session عدّى عليها يوم ([[updateAge]]) بيمد مدتها. في server component مينفعش يكتب cookie، فالتجديد بيحصل في الداتابيز والـ cookie بتتحدث في أول action أو طلب لـ [[/api/auth]].

[[cache()]] بيخلي كل النداءات في نفس الطلب (layout وصفحة و ٣ كومبوننتات) query واحد. ولو عايز تقلل الـ queries أكتر: [[session.cookieCache]] بيحط نسخة موقّعة من الـ session في cookie تانية لدقايق، وده معناه إن إلغاء الـ session بياخد لحد ما الكاش يخلص. وللعمليات الحساسة (تغيير الباسورد) ابعت [[query: { disableCookieCache: true }]].

الـ proxy: في Next 16 بيشتغل على Node، فممكن تنادي [[auth.api.getSession]] جواه كمان، والوثائق بتقول كده. بس ده query مع كل طلب مطابق، بما فيهم الـ prefetch. [[getSessionCookie]] أسرع بكتير، وبيعرف اسم الـ cookie بـ [[__Secure-]] ومن غيرها. والـ [[matcher]] هنا على المسارات المحمية بس، عكس درس [[proxy.ts]].

والـ server actions: نفس [[requireUser()]] أول سطر. والـ route handlers كمان. ومتستخدمش [[use cache]] على أي حاجة بتنادي [[getSession]].`,
            when: R`[[requireUser]] في كل صفحة و action و route فيه داتا خاصة. [[useSession]] في الـ client بس للعرض (اسم في الـ navbar)، مش للحماية. و [[getSessionCookie]] في الـ proxy لتجربة أحسن (redirect قبل ما حاجة تترسم).`,
            mistakes: R`تعتمد على [[getSessionCookie]] في الـ proxy كحماية: أي cookie بالاسم ده بتعدّي (وجرّبتها في التجربة). وتنادي [[getSession]] من غير [[headers]] فيرجع [[null]] دايمًا. وتنادي [[getSession]] مباشرة في ١٠ أماكن من غير [[cache]] فالصفحة تعمل ١٠ queries. و [[useSession]] في client component تخبي بيه زرار الأدمن وتفتكر إن ده حماية. وتشغّل [[cookieCache]] وتستغرب إن الـ ban مأثّرش لخمس دقايق.`
          },
          lines: [
            "الملف ده عمره ما يروح للمتصفح.",
            R`[[cache]] من React: مرة واحدة في الطلب.`,
            "الـ headers فيها الـ cookie.",
            "التحويل.",
            "الـ instance.",
            R`الـ session أو [[null]]، ومتكاشة طول الطلب.`,
            "الدالة اللي أي حاجة محمية بتناديها.",
            "هات الـ session.",
            "مفيش؟ login.",
            R`رجّع المستخدم ([[id]] و [[name]] و [[email]] وأي عمود ضافه plugin).`,
            "قفلة.",
            "داتا خاصة بتعدّي من الـ DAL.",
            "مين؟",
            "الفلتر بالـ userId جوه الـ query، والأعمدة المطلوبة بس.",
            "قفلة.",
            "الـ proxy.",
            R`[[getSessionCookie]]: بيدوّر على الـ cookie بالاسم بس.`,
            "الدالة.",
            "مفيش cookie؟ login قبل ما أي حاجة تترسم.",
            "فيه؟ كمّل. والصفحة هتتحقق بجد.",
            "قفلة.",
            "المسارات المحمية بس."
          ],
          sol: R`من غير cookie: الـ proxy هو اللي بيحوّلك لـ [[/login]]، والصفحة متترسمش خالص.

cookie بقيمة عشوائية: الـ proxy بيعدّيها (هو بيشوف الاسم بس)، والصفحة بتنادي [[requireUser]]، و [[getSession]] بيرجّع [[null]] لأن التوقيع غلط، فالـ DAL هو اللي بيحوّلك. ده الدليل إن الـ proxy مش حماية.

cookie حقيقية: الصفحة بتعرض اسمك وطلباتك بس.

لما تمسح صف الـ session من Prisma Studio وتعمل refresh: بتتحوّل للـ login فورًا، حتى والـ cookie لسه في المتصفح. الـ session اتلغت من السيرفر. (لو شغّلت [[cookieCache]]، هتفضل داخل لحد ما الكاش يخلص، وده المتوقع.)

الغلط الشائع: تحط [[console.log]] في الـ proxy وتفتكر إن الحالة التانية اتقفلت هناك.`,
          solCode: R`// app/dashboard/page.tsx
import { requireUser, getMyOrders } from "@/lib/dal";
export default async function Dashboard() {
  const user = await requireUser();
  const orders = await getMyOrders();
  return (
    <main>
      <h1>أهلًا {user.name}</h1>
      <ul>{orders.map((o) => <li key={o.id}>{o.id}: {o.status}</li>)}</ul>
    </main>
  );
}`
        },
        {
          cmd: "social login",
          title: "دخول بـ Google و GitHub وربط الحسابات",
          desc: R`[[socialProviders]] في الإعدادات: لكل provider [[clientId]] و [[clientSecret]] من لوحة المطورين (Google Cloud Console و GitHub OAuth Apps)، وتسجّل عندهم الـ callback: [[http://localhost:3000/api/auth/callback/google]] للتطوير، ونفسه بالدومين الحقيقي للإنتاج. وفي المتصفح: [[authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })]].

ربط الحسابات: المستخدم ممكن يبقى عنده باسورد و Google و GitHub، كلهم صفوف في [[Account]] لنفس [[User]]. وفيه طريقتين: ضمني (دخل بـ Google بنفس إيميل حساب موجود)، ودي المكتبة بتعملها بشروط أمان، وصريح: وهو داخل، يدوس «اربط GitHub» فيتنادي [[authClient.linkSocial]].`,
          example: R`// lib/auth.ts (نفس الـ imports بتاعة درس better-auth)
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
  },
  account: { accountLinking: { enabled: true } },
  plugins: [nextCookies()],
});
// app/login/social-buttons.tsx
"use client";
import { authClient } from "@/lib/auth-client";
export function SocialButtons() {
  return (
    <div className="flex gap-2">
      <button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })}>ادخل بـ Google</button>
      <button onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/login" })}>ادخل بـ GitHub</button>
    </div>
  );
}
// app/settings/link-github.tsx ("use client")
<button onClick={() => authClient.linkSocial({ provider: "github", callbackURL: "/settings" })}>اربط GitHub</button>`,
          try: R`اعمل GitHub OAuth App (Settings > Developer settings > OAuth Apps) و callback [[http://localhost:3000/api/auth/callback/github]]، وحط الـ id والـ secret في [[.env]]. ادخل بـ GitHub وبص على جدول [[account]]. وبعدين: اعمل حساب بالإيميل والباسورد بنفس إيميل GitHub بتاعك (من غير ما تأكده)، واخرج، وادخل بـ GitHub. حصل إيه؟ وآخر حاجة: وانت داخل بالباسورد، استخدم [[linkSocial]] واربط GitHub.`,
          flag: "script",
          deep: {
            why: "ناس كتير مش هتعمل حساب بباسورد جديد، لكن بتدوس «ادخل بـ Google» في ثانية. وكمان انت مش شايل باسورد لهم. بس الـ OAuth نفسه (state و PKCE وتبادل الـ code وقراية الإيميل) سهل تغلط فيه، والمكتبة بتعمله. والجزء اللي فعلًا محتاج تفهمه هو ربط الحسابات، لأن غلطه بيدّي حد تاني حسابك.",
            how: R`الرحلة: [[signIn.social]] بيطلب [[/api/auth/sign-in/social]] فيرجع URL بتاع Google فيه state، والمتصفح يروح هناك. المستخدم يوافق، و Google يرجّعه على [[/api/auth/callback/google?code=...]]. المكتبة تتحقق من الـ state، وتبدّل الـ code بتوكنات، وتقرا الإيميل، وتعمل أو تلاقي [[User]]، وتضيف صف [[Account]] بـ [[providerId: "google"]]، وتعمل session وتحوّل على [[callbackURL]]. تفاصيل OAuth نفسه في تاب «بناء مشروع كامل» (درس OAuth).

الربط الضمني: لو حد دخل بـ Google بإيميل موجود في [[User]] ومش مربوط بـ Google، Better Auth مبيربطش إلا لو: الـ provider قال الإيميل verified (أو الـ provider في [[trustedProviders]])، و الحساب المحلي نفسه [[emailVerified]] (الإعداد [[requireLocalEmailVerified]]، وافتراضيًا true). غير كده بيرجع خطأ [[account_not_linked]].

ليه الشرط التاني؟ هجمة اسمها pre-account takeover: المهاجم يعمل حساب بإيميلك انت وباسورد يعرفه، من غير تأكيد. بعدين انت تدخل بـ Google، فلو اتربط تلقائي، المهاجم لسه معاه الباسورد وداخل على حسابك. فلو التسجيل بالباسورد عندك، شغّل تأكيد الإيميل.

الربط الصريح: [[linkSocial]] من مستخدم داخل بيعمل نفس الرحلة، ويضيف الـ [[Account]] للمستخدم الحالي. [[listAccounts()]] بيرجّع الحسابات المربوطة، و [[unlinkAccount({ accountId })]] بيفكّ واحد (ومبيرضاش يفك آخر حساب، عشان المستخدم ميتقفلش برّه).

والإنتاج: كل provider محتاج الـ callback بالدومين الحقيقي، و [[BETTER_AUTH_URL]] صح، وإلا Google يرجع [[redirect_uri_mismatch]].`,
            when: "أي تطبيق للجمهور العام: Google تقريبًا دايمًا، و GitHub لأدوات المطورين. وسيب الإيميل والباسورد كاختيار لو فيه ناس معندهاش حساب Google أو مش عايزة تربطه.",
            mistakes: R`[[trustedProviders]] فيها provider مبيتحققش من الإيميل (أو [[allowDifferentEmails: true]]) فحد يربط حسابك بإيميل مش بتاعه. وتسجيل بالباسورد من غير تأكيد إيميل مع ربط ضمني. وتنسى callback الإنتاج في لوحة Google. و [[clientSecret]] في متغير [[NEXT_PUBLIC_]]. وتستخدم نفس OAuth App للتطوير والإنتاج. وفي الانترفيو: «ليه منربطش الحسابات بالإيميل على طول؟» الإجابة pre-account takeover، والحل إن الإيميل يبقى متأكد في الناحيتين.`
          },
          lines: [
            "الإعدادات بتاعة الدرس اللي فات، وفوقها حاجتين.",
            "نفس الداتابيز.",
            "الباسورد لسه موجود كاختيار.",
            "الـ providers.",
            "Google: الـ id والـ secret من Google Cloud Console.",
            "GitHub: من OAuth App في إعدادات GitHub.",
            "قفلة.",
            R`الربط مسموح بالشروط الافتراضية (إيميل متأكد في الناحيتين). وده الافتراضي أصلًا، مكتوب عشان يبان.`,
            R`[[nextCookies]] آخر واحد.`,
            "قفلة.",
            "الزراير لازم client component عشان onClick.",
            "الـ client.",
            "الكومبوننت.",
            "بداية الـ JSX.",
            "حاوية.",
            R`[[signIn.social]]: بيحوّل المتصفح لـ Google، وبعد الموافقة يرجع على [[callbackURL]].`,
            R`نفس الحاجة لـ GitHub، ولو حصل خطأ (رفض، أو [[account_not_linked]]) يرجع على [[errorCallbackURL]] ومعاه [[?error=]].`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`في صفحة الإعدادات لمستخدم داخل: [[linkSocial]] بيضيف GitHub لنفس المستخدم، بشرط إن إيميل GitHub هو نفس إيميله (إلا لو [[allowDifferentEmails]]).`
          ],
          sol: R`بعد أول دخول بـ GitHub: صف في [[user]] بإيميلك على GitHub، وصف في [[account]] فيه [[providerId: "github"]] و [[accountId]] هو رقم حسابك على GitHub، و [[accessToken]] بتاع GitHub، و [[password]] فاضي.

التجربة التانية (حساب بالباسورد بنفس الإيميل ومش متأكد، وبعدين دخول بـ GitHub): الدخول بيفشل وبترجع على [[/login?error=account_not_linked]]. ده مش bug: المكتبة رافضة تربط لأن الحساب المحلي [[emailVerified: false]]، فممكن يكون حد تاني عامله بإيميلك. لو غيّرت [[emailVerified]] لـ true في Prisma Studio وجرّبت تاني، هيتربط ويبقى عندك صفين في [[account]] لنفس الـ [[userId]].

الربط الصريح بـ [[linkSocial]] وانت داخل: بيرجعك على [[/settings]] وفيه صف [[account]] جديد لنفس المستخدم. ولو إيميل GitHub مختلف عن إيميل حسابك، الربط بيفشل بخطأ [[email_does_not_match]]، لأن افتراضيًا لازم نفس الإيميل، والمختلف محتاج [[allowDifferentEmails: true]]. وده قرار أمان مش ذوق.

الغلط الشائع: [[redirect_uri_mismatch]] من GitHub أو Google، لأن الـ callback في اللوحة مش [[/api/auth/callback/github]] بالظبط أو فيه [[/]] زيادة.`
        },
        {
          cmd: "أدوار وصلاحيات",
          title: "أدوار وصلاحيات فوق المكتبة (admin plugin و access control)",
          desc: R`الـ auth بيقولك «مين». الصلاحيات بتقولك «يقدر يعمل إيه». في Better Auth: [[createAccessControl]] بتعرّف الموارد والأفعال ([[order: ["read", "refund"]]])، و [[ac.newRole]] بيعمل دور من مجموعة أفعال، و plugin الـ [[admin]] بيضيف عمود [[role]] للمستخدم (ومعاه ban و impersonation). وعلى السيرفر: [[auth.api.userHasPermission]] بترجّع [[{ success }]].

والفحص يبقى في الـ DAL جنب [[requireUser]]: [[requirePermission({ order: ["refund"] })]]. والصلاحية مش بديل عن الملكية: «support يقدر يشوف الطلبات» غير «العميل يشوف طلباته هو بس».`,
          example: R`// lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
const statement = { ...defaultStatements, product: ["create", "update", "delete"], order: ["read", "refund"] } as const;
export type Permissions = { [K in keyof typeof statement]?: (typeof statement)[K][number][] };
export const ac = createAccessControl(statement);
export const customer = ac.newRole({ order: ["read"] });
export const support = ac.newRole({ order: ["read", "refund"] });
export const admin = ac.newRole({ ...adminAc.statements, product: ["create", "update", "delete"], order: ["read", "refund"] });
// lib/auth.ts: import { admin as adminPlugin } from "better-auth/plugins";
// plugins: [adminPlugin({ ac, roles: { admin, customer, support }, defaultRole: "customer" }), nextCookies()]
// lib/dal.ts (جنب requireUser)
export async function requirePermission(permissions: Permissions) {
  const user = await requireUser();
  const { success } = await auth.api.userHasPermission({ body: { userId: user.id, permissions } });
  if (!success) notFound();
  return user;
}
// app/actions/orders.ts ("use server")
export async function refundOrder(orderId: string) {
  await requirePermission({ order: ["refund"] });
  await db.order.update({ where: { id: orderId, status: "PAID" }, data: { status: "REFUNDED" } });
  updateTag("orders");
}`,
          try: R`ضيف الـ plugin، وشغّل [[npx auth@latest generate]] و migrate وبص على الأعمدة الجديدة في [[user]] و [[session]]. اعمل ٣ مستخدمين، وخلي واحد [[support]] وواحد [[admin]] من Prisma Studio (عمود [[role]]). جرّب [[refundOrder]] بكل واحد فيهم. وبعدين في سكربت: [[auth.api.userHasPermission({ body: { role: "support", permissions: { product: ["delete"] } } })]].`,
          flag: "script",
          deep: {
            why: R`[[if (user.role === "admin")]] متفرّق في ٣٠ مكان بيبوّظ أول ما يبقى عندك دور تالت: «support يقدر يرجّع فلوس بس ميقدرش يمسح منتجات». لما الأدوار معرّفة كصلاحيات في مكان واحد، والكود بيسأل عن الفعل مش عن اسم الدور، تغيير دور بيبقى سطر واحد، ومفيش action اتنسى.`,
            how: R`[[statement]] هو كل الموارد والأفعال اللي في التطبيق. [[defaultStatements]] فيها موارد الـ admin plugin نفسه ([[user]] و [[session]]: create و list و set-role و ban و impersonate...)، و [[adminAc.statements]] هي صلاحيات الأدمن الافتراضية عليهم. لازم تحطهم في دور الأدمن بتاعك، وإلا الأدمن مش هيقدر يستخدم endpoints زي [[setRole]] و [[banUser]].

[[userHasPermission]] بـ [[userId]] بيجيب دور المستخدم من الداتابيز ويشوفه في التعريف. وتقدر تبعت [[role]] بدل [[userId]] لو معاك الدور من الـ session. والدور بيتخزن في [[user.role]] كنص، وممكن أكتر من دور بفاصلة.

الـ plugin بيضيف: [[role]] و [[banned]] و [[banReason]] و [[banExpires]] في [[user]]، و [[impersonatedBy]] في [[session]]. والمستخدم الـ banned مبيقدرش يدخل، والـ sessions بتاعته بتتمسح. وأول أدمن تعمله بإيدك (Prisma Studio أو seed)، وبعده الأدمن يقدر يدّي أدوار بـ [[auth.api.setRole]].

في الواجهة: [[authClient.admin.checkRolePermission({ role, permissions })]] بيحسب محليًا من غير طلب، عشان تخبي زرار «استرجاع». ده UX بس، والسيرفر لسه بيفحص.

الملكية: [[customer]] عنده [[order: ["read"]]]، بس [[getMyOrders]] لسه بتفلتر بـ [[userId]]. والـ support عنده read على كل الطلبات، فدالة تانية في الـ DAL من غير فلتر وعليها [[requirePermission]]. ولو فيه «فرق» أو «متاجر» (كل مستخدم دوره مختلف في كل متجر)، ده plugin [[organization]] مش admin.`,
            when: R`أول ما يبقى فيه أكتر من نوعين مستخدمين (عميل وأدمن). لو دورين بس وعمرهم ما هيزيدوا، [[user.role === "ADMIN"]] في [[requireAdmin]] زي درس [[DAL]] كفاية. ولو صلاحيات لكل صف (المستخدم ده يعدّل المقال ده بس)، ده منطق ملكية في الـ query أو ABAC، مش أدوار.`,
            mistakes: R`تخبي الزرار في الواجهة وتنسى الفحص في الـ action. وتعرّف دور [[admin]] من غير [[adminAc.statements]] فالأدمن ميقدرش يغيّر أدوار. وتدّي [[customer]] صلاحية [[order: ["read"]]] وتفتكر إنها بتفلتر بالملكية. وتفحص [[role === "admin"]] في مكان و [[userHasPermission]] في مكان تاني فيتناقضوا. وتنسى generate و migrate بعد ما تضيف الـ plugin فالـ [[role]] يطلع [[undefined]]. وفي الانترفيو: الفرق بين authentication و authorization، و RBAC مقابل ABAC، وليه «deny by default».`
          },
          lines: [
            R`[[createAccessControl]] بتعرّف الموارد والأفعال.`,
            "صلاحيات الـ admin plugin الافتراضية.",
            R`كل حاجة في التطبيق: موارد الـ plugin، و [[product]] و [[order]] بأفعالهم. [[as const]] عشان الأنواع تبقى حرفية.`,
            R`نوع بيتولد من الـ statement: [[{ order?: ("read" | "refund")[] ... }]]، فالغلط في اسم فعل بيطلع وقت الكتابة.`,
            "الـ access controller.",
            "العميل: يقرا الطلبات بس (والملكية في الـ query).",
            "الدعم: يقرا ويرجّع فلوس.",
            R`الأدمن: صلاحيات إدارة المستخدمين الافتراضية، وكل حاجة على المنتجات والطلبات.`,
            "الدالة اللي الـ actions بتناديها.",
            "داخل؟",
            "دوره يقدر يعمل الفعل ده؟ (بيجيب الدور من الداتابيز).",
            "لأ؟ 404، كأن الحاجة مش موجودة.",
            "رجّع المستخدم.",
            "قفلة.",
            "action استرجاع الفلوس.",
            "أول سطر: الصلاحية. مش الدور بالاسم.",
            R`الحالة جوه الـ where: مينفعش ترجّع طلب مش مدفوع أو اترجع قبل كده.`,
            R`حدّث كاش الطلبات (فئة Cache Components).`,
            "قفلة."
          ],
          sol: R`بعد generate و migrate: [[user]] فيها [[role]] و [[banned]] و [[banReason]] و [[banExpires]]، و [[session]] فيها [[impersonatedBy]]. والمستخدمين الجداد [[role]] بتاعهم [[customer]].

[[refundOrder]] بالـ customer: 404 (أو صفحة not-found)، والطلب متغيرش. بالـ support: الطلب بقى [[REFUNDED]]. بالأدمن: نفس الحاجة. ولو ناديته تاني على نفس الطلب، Prisma بيرمي [[P2025]] لأن مفيش صف [[PAID]]، وده المطلوب (مفيش استرجاع مرتين).

السكربت بيرجّع [[{ error: null, success: false }]] لأن support مالوش [[product: ["delete"]]]. و [[{ role: "support", permissions: { order: ["refund"] } }]] بيرجّع [[success: true]].

لو غيّرت الدور في Prisma Studio والمستخدم داخل، أول طلب بعدها بياخد الدور الجديد (لأن [[userHasPermission]] بـ [[userId]] بيقرا من الداتابيز). الغلط الشائع: تعرّف [[admin]] من غير [[...adminAc.statements]] وتستغرب إن [[setRole]] بيرجّع ممنوع للأدمن.`,
          solCode: R`// scripts/check-roles.ts   (npx tsx scripts/check-roles.ts)
import { auth } from "@/lib/auth";
import type { Permissions } from "@/lib/permissions";
const cases: { role: "customer" | "support" | "admin"; permissions: Permissions }[] = [
  { role: "customer", permissions: { order: ["refund"] } },
  { role: "support", permissions: { order: ["refund"] } },
  { role: "support", permissions: { product: ["delete"] } },
  { role: "admin", permissions: { product: ["delete"] } },
];
for (const c of cases) {
  const { success } = await auth.api.userHasPermission({ body: { role: c.role, permissions: c.permissions } });
  console.log(c.role, JSON.stringify(c.permissions), success);
}
// customer {"order":["refund"]} false
// support {"order":["refund"]} true
// support {"product":["delete"]} false
// admin {"product":["delete"]} true`
        }
      ]
    },
    {
      t: "SEO و metadata",
      l: 3,
      n: "title و description لكل صفحة، وصور المشاركة، و sitemap و robots، كلهم من ملفات في app",
      items: [
        {
          cmd: "metadata",
          title: "title و description وصورة المشاركة لكل صفحة",
          desc: R`في App Router مش بتكتب [[<head>]]: بتعمل [[export const metadata]] في أي [[layout.tsx]] أو [[page.tsx]] (server components بس)، و Next بيحوّلها لـ tags. الـ layout بيحط الافتراضي، والصفحة بتكمّل عليه أو تغيّره.

أهم الحقول: [[title]] (ومعاه [[template]] عشان كل صفحة تبقى «اسمها | اسم الموقع»)، و [[description]]، و [[openGraph]] لشكل اللينك في واتساب وفيسبوك، و [[alternates.canonical]]، و [[metadataBase]] اللي بيخلي كل اللينكات النسبية كاملة. شرح الـ tags نفسها وليه مهمة في تاب «HTML و CSS».`,
          example: R`// app/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://books.example.com"),
  title: { default: "متجر الكتب", template: "%s | متجر الكتب" },
  description: "كتب عربي وإنجليزي بتوصل لحد باب البيت.",
  openGraph: { siteName: "متجر الكتب", locale: "ar_EG", type: "website" },
  twitter: { card: "summary_large_image" },
};
// app/about/page.tsx
export const metadata: Metadata = {
  title: "مين إحنا",
  alternates: { canonical: "/about" },
};
// الناتج: <title>مين إحنا | متجر الكتب</title> و <link rel="canonical" href="https://books.example.com/about">`,
          try: R`حط الـ metadata دي، وافتح [[/about]] واعمل View Source ودوّر على [[<title>]] و [[og:]]. وبعدين امسح [[metadataBase]] واعمل build وافتح View Source: هتلاقي الـ canonical بقى [[/about]] نسبي مش URL كامل. (التحذير بيطلع بس لما يكون فيه صورة OG أو twitter بمسار نسبي أو ملف opengraph-image.) وجرّب تحط [[export const metadata]] في ملف عليه [[use client]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "جوجل بيعرض الـ title والـ description في النتايج، وواتساب وفيسبوك بيعرضوا صورة وعنوان من الـ og tags. صفحة من غيرهم بتظهر «Create Next App» أو لينك أزرق عريان، والناس مبتضغطش.",
            how: R`Next بيجمع الـ metadata من الـ root layout لتحت لحد الصفحة، وكل مستوى بيعمل merge سطحي: لو الصفحة كتبت [[openGraph]]، بيبدّل الـ [[openGraph]] بتاع الـ layout كله، مش بيدمج جواه. فلو عايز تحتفظ بحاجات مشتركة، حطها في متغير واعمله spread.

[[title.template]] بيتطبق على الصفحات اللي تحت الـ layout ده بس، مش على الـ layout نفسه. و [[title.absolute]] بيتجاهل الـ template.

Next بيحط لوحده [[<meta charset>]] و [[<meta name="viewport">]]. ولو عايز تغيّر الـ viewport أو [[themeColor]]، ده في [[export const viewport]] منفصل.

وفيه ملفات بأسماء خاصة بتتحول metadata لوحدها: [[favicon.ico]] (في [[app]] بس)، و [[icon.png]] و [[apple-icon.png]] و [[opengraph-image.png]] جوه [[app]] أو أي فولدر تحته، و Next بيحط الـ tags الصح.`,
            when: "الـ layout: الافتراضي والـ template و metadataBase. كل صفحة ثابتة: title و description على الأقل. والصفحات الـ dynamic: الدرس الجاي.",
            mistakes: R`تكتب [[<head>]] و [[<title>]] بإيدك في layout.tsx فيطلع مكرر أو يتجاهل. وتنسى [[metadataBase]] فصور المشاركة تطلع بـ localhost. وتحط [[metadata]] في client component (مش مسموح). ونفس الـ description لكل الصفحات: جوجل بيتجاهله ويكتب من عنده.`
          },
          lines: [
            "النوع بيكمّلك الحقول ويمسك الغلط.",
            "الافتراضي لكل الموقع.",
            "الدومين. من غيره الـ canonical النسبي بيفضل نسبي، وصور الـ OG النسبية بتطلع بـ localhost (وده اللي بيطلّع تحذير في الـ build).",
            R`[[default]] للصفحات اللي ملهاش title، و [[template]] للي ليها: [[%s]] مكان اسم الصفحة.`,
            "وصف بيظهر تحت اللينك في جوجل.",
            "شكل المشاركة. الصورة ممكن تيجي من ملف (درس opengraph-image).",
            "كارت كبير في X.",
            "قفلة.",
            "صفحة بتكمّل على الـ layout.",
            "اسمها بس، والـ template بيكمّل.",
            R`الرابط الأصلي للصفحة، عشان النسخ بـ [[?utm=]] متتحسبش صفحات مكررة.`,
            "قفلة."
          ],
          sol: R`View Source على [[/about]]: [[<title>مين إحنا | متجر الكتب</title>]]، و [[<link rel="canonical" href="https://books.example.com/about"/>]]، و [[og:title]] بنفس الـ title، و [[og:description]] و [[og:site_name]] و [[og:locale]] بـ [[ar_EG]] جايين من الـ layout، و [[twitter:card]] بـ [[summary_large_image]].

من غير [[metadataBase]]: الـ canonical بقى [[href="/about"]] نسبي، ومفيش تحذير لأن مفيش صور. ولو الصفحة فيها صورة OG (زي درس opengraph-image) هتلاقي في اللوج [[metadataBase property in metadata export is not set]] ومعاه إنه هيستخدم localhost. و [[metadata]] في ملف عليه [[use client]]: الـ build بيقع بـ [[You are attempting to export "metadata" from a component marked with "use client", which is disallowed.]]`
        },
        {
          cmd: "generateMetadata",
          title: "metadata من الداتابيز لكل منتج ومقال",
          desc: R`لما الـ title بيعتمد على الداتا (اسم المنتج)، بدل [[metadata]] بتعمل [[export async function generateMetadata({ params })]] وترجّع نفس الشكل. بتاخد نفس [[params]] و [[searchParams]] بتوع الصفحة.

والصفحة و [[generateMetadata]] الاتنين محتاجين المنتج: لف دالة الجلب في [[cache()]] من React عشان الـ query يتنفذ مرة واحدة (ولو عليها [[use cache]] أو fetch، الـ dedupe بيحصل لوحده).`,
          example: R`// app/products/[slug]/page.tsx
import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
const getProduct = cache((slug: string) => db.product.findUnique({ where: { slug } }));
export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "المنتج مش موجود" };
  return {
    title: product.name,
    description: product.summary.slice(0, 155),
    alternates: { canonical: $__bt/products/$__{slug}$__bt },
    openGraph: { images: [{ url: product.imageUrl, width: 1200, height: 630 }] },
  };
}
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}`,
          try: R`حط [[console.log("query")]] جوه [[getProduct]] وافتح الصفحة: هتطبع مرة واحدة. شيل [[cache]]: مرتين. وبعدين بعد ما ترفع الموقع، ابعت اللينك لنفسك على واتساب أو جرّبه في أي أداة OG preview.`,
          flag: "script",
          deep: {
            why: "صفحات المنتجات والمقالات هي اللي بتجيب زوار من جوجل ومن المشاركات. لو كلها title واحد («متجر الكتب»)، جوجل مش هيعرف يفرّق بينها، والمشاركة هتبان نفس الشكل لكل منتج.",
            how: R`Next بينادي [[generateMetadata]] قبل ما يرسم الصفحة أو معاها. ومن Next 15.2 الـ metadata بقت بتتبعت streaming: للمتصفحات العادية، الصفحة مبتستناش [[generateMetadata]] وتبدأ تترسم، والـ tags بتتحط لما تجهز. وللـ bots اللي مبتنفذش JS (واتساب وفيسبوك و X و Bing، بتتعرف من الـ User-Agent)، Next بيستنى الـ metadata الأول عشان تبقى في [[<head>]]. أما Googlebot فبينفذ JS، فبياخد الـ metadata streaming عادي وبيقراها.

[[cache()]] من React بيحفظ النتيجة لنفس الـ arguments طول الطلب الواحد. ولو الدالة عليها [[use cache]] (Cache Components)، ده كاش أقوى بين الطلبات، و [[cache()]] مش ضروري.

وللـ hreflang في موقع بلغتين: [[alternates.languages]] (فئة i18n).

ومع Cache Components، لو [[generateMetadata]] بتقرا حاجة dynamic (cookies)، لازم الصفحة يبقى فيها جزء dynamic جوه Suspense، وإلا Next بيطلّع خطأ. فخلي الـ metadata معتمدة على params وداتا متكاشة بس.`,
            when: "أي صفحة dynamic segment: منتج، ومقال، وبروفايل عام، وقسم.",
            mistakes: R`نفس الـ query مرتين من غير [[cache]]. وترمي error من [[generateMetadata]] لما المنتج مش موجود فالصفحة تقع بـ 500 بدل 404. وتقرا [[cookies]] في [[generateMetadata]] فالصفحة تبقى dynamic من غير لازمة. و description فاضي لما الداتا فيها [[null]].`
          },
          lines: [
            "النوع.",
            R`[[cache]] من React.`,
            "404.",
            "نفس الـ slug في نفس الطلب = query واحد، حتى لو اتنادت من الـ metadata والصفحة.",
            R`[[async]] وبترجّع [[Metadata]]، وبتاخد نفس props الصفحة.`,
            "الـ slug.",
            "المنتج (من الكاش لو اتجاب).",
            "مش موجود: title بسيط، والصفحة هي اللي هتنادي notFound.",
            "metadata المنتج.",
            "الاسم، والـ template بتاع الـ layout بيكمّل.",
            "أول ١٥٥ حرف تقريبًا، لأن جوجل بيقص الباقي.",
            "الرابط الأصلي.",
            "صورة المشاركة بالمقاس المناسب.",
            "قفلة.",
            "قفلة.",
            "الصفحة.",
            "الـ slug.",
            R`نفس النداء: [[cache]] بيرجّع نفس النتيجة.`,
            "404.",
            "اعرض.",
            "قفلة."
          ],
          sol: R`مع [[cache]]: الـ log بيطلع مرة واحدة لكل فتحة صفحة، مع إن [[generateMetadata]] والصفحة الاتنين نادوا [[getProduct]]. من غير [[cache]]: مرتين. والـ title في View Source [[<title>اسم المنتج | متجر الكتب</title>]]، لأن الـ template بتاع الـ layout كمّل. والمنتج اللي مش موجود: 404 والـ title «المنتج مش موجود | متجر الكتب».

وفي واتساب أو أي OG preview لازم يظهر الاسم والوصف والصورة. لو الصورة مش ظاهرة: غالبًا [[metadataBase]] مش متظبط فالـ URL طالع [[localhost]]، أو الصورة مش 1200×630، أو واتساب لسه مكاش شكل قديم للينك (جرّب اللينك وفي آخره [[?v=2]]).`
        },
        {
          cmd: "sitemap.ts و robots.ts",
          title: "sitemap.xml و robots.txt من الكود",
          desc: R`[[app/sitemap.ts]] بيرجّع array من الصفحات ([[url]] و [[lastModified]])، و Next بيطلّعها [[/sitemap.xml]]. ولأنه كود، بتجيب المنتجات والمقالات من الداتابيز، فالـ sitemap دايمًا محدّث. و [[app/robots.ts]] بيطلّع [[/robots.txt]]: مين مسموحله يأرشف إيه، وفين الـ sitemap.

الاتنين Route Handlers جاهزة: بيتكاشوا وبيتبنوا وقت الـ build زي أي route، إلا لو استخدموا حاجة dynamic.`,
          example: R`// app/sitemap.ts
import type { MetadataRoute } from "next";
const base = "https://books.example.com";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await db.product.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: $__bt$__{base}/about$__bt },
    ...products.map((p) => ({ url: $__bt$__{base}/products/$__{p.slug}$__bt, lastModified: p.updatedAt })),
  ];
}
// app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api", "/checkout"] },
    sitemap: "https://books.example.com/sitemap.xml",
  };
}`,
          try: R`اعمل الملفين وافتح [[/sitemap.xml]] و [[/robots.txt]] في المتصفح. وبعد ما ترفع الموقع، ضيف الـ sitemap في Google Search Console وشوف كام صفحة اتقرت.`,
          flag: "script",
          deep: {
            why: "جوجل بيلاقي الصفحات من اللينكات، والصفحات اللي مفيش لينك ليها أو عميقة أوي ممكن ميوصلهاش. الـ sitemap بيديله القايمة كاملة ومعاها آخر تعديل. والـ robots بيمنعه يضيّع وقته على صفحات ملهاش لازمة زي الـ dashboard.",
            how: R`[[sitemap.ts]] و [[robots.ts]] ملفات خاصة (metadata routes). Next بيحوّلهم Route Handlers بترجّع XML ونص بالـ Content-Type الصح. وزي أي route، لو مفيهمش حاجة dynamic بيتبنوا وقت الـ build. فلو المنتجات بتتضاف كل يوم، ضيف revalidate (أو [[use cache]] مع [[cacheLife]] في Cache Components)، وإلا الـ sitemap هيفضل زي ما كان وقت الـ build.

جوجل بيقبل لحد ٥٠ ألف URL في الـ sitemap الواحد. لو أكتر، [[generateSitemaps]] بتقسّمه لكذا ملف بـ id.

والموقع اللي بلغتين: كل عنصر في الـ sitemap ممكن يبقى فيه [[alternates.languages]] بروابط اللغات التانية.

و [[robots.txt]] مش حماية: هو طلب مهذب للـ bots. الصفحات الخاصة لازم تبقى محمية بجد (auth)، و [[disallow]] مبيمنعش الأرشفة لو فيه لينكات من برّه، فللصفحات اللي متتأرشفش خالص استخدم [[robots: { index: false }]] في الـ metadata.`,
            when: "أي موقع عام عايز زوار من جوجل. اعمل الاتنين قبل الإطلاق، وضيف الـ sitemap في Search Console.",
            mistakes: R`sitemap static اتعمل مرة وقت الـ build ومبيتحدثش. و [[lastModified: new Date()]] لكل الصفحات فجوجل يبطّل يثق فيه. و [[disallow: "/"]] اتنسى من staging للإنتاج فالموقع كله يختفي من جوجل. وتحط صفحات private في الـ sitemap.`
          },
          lines: [
            "الأنواع الجاهزة.",
            "الدومين (أو من متغير بيئة).",
            R`الملف ده بيطلّع [[/sitemap.xml]].`,
            "كل المنتجات المنشورة، الـ slug وآخر تعديل بس.",
            "ليستة الصفحات.",
            R`الرئيسية. [[changeFrequency]] و [[priority]] اختياريين وجوجل غالبًا بيتجاهلهم.`,
            "صفحة ثابتة.",
            R`صفحة لكل منتج، و [[lastModified]] الحقيقي عشان جوجل يعرف يرجع لإيه.`,
            "قفلة.",
            "قفلة.",
            "الأنواع للملف التاني.",
            R`بيطلّع [[/robots.txt]].`,
            "رجّع...",
            "...كل الـ bots مسموحلها كل حاجة ما عدا الصفحات الخاصة.",
            "ومكان الـ sitemap.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[/sitemap.xml]] بيرجّع XML ([[Content-Type: application/xml]]) فيه [[<urlset>]] وجواه [[<url>]] لكل صفحة: [[<loc>]] دايمًا، و [[<changefreq>]] و [[<priority>]] للرئيسية بس، و [[<lastmod>]] بتاريخ ISO لصفحات المنتجات. و [[/robots.txt]] شكله زي اللي تحت.

وفي جدول الـ build الاتنين [[○ /sitemap.xml]] و [[○ /robots.txt]]: static اتبنوا وقت الـ build، فمنتج جديد مش هيظهر في الـ sitemap غير بـ build أو revalidate. وفي Search Console بعد إضافة الـ sitemap هتلاقي حالته Success وعدد الـ URLs اللي اكتشفها. لو اللينكات جوه الـ XML فيها [[localhost]]: الـ base جاي من متغير بيئة مش متظبط في الإنتاج.`,
          solCode: R`User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /api
Disallow: /checkout

Sitemap: https://books.example.com/sitemap.xml`
        },
        {
          cmd: "opengraph-image",
          title: "صورة مشاركة لكل منتج بتتولد بالكود",
          desc: R`ملف [[opengraph-image.tsx]] جنب الصفحة بيولّد صورة المشاركة بالكود: بترجّع [[ImageResponse]] من [[next/og]] وجواه JSX و CSS (flexbox)، و Next بيحوّله PNG ويحط [[og:image]] للصفحة لوحده. كده كل منتج ليه صورة فيها اسمه وسعره من غير ما حد يصممها.

ولو الصورة ثابتة، حط ملف [[opengraph-image.png]] (1200×630) في الفولدر وخلاص.`,
          example: R`// app/products/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "صورة المنتج";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const cairo = await readFile(join(process.cwd(), "assets/Cairo-Bold.ttf"));
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#0f172a", color: "white", fontFamily: "Cairo" }}>
        <div style={{ fontSize: 72 }}>{product?.name ?? "متجر الكتب"}</div>
        <div style={{ fontSize: 40, color: "#fbbf24" }}>{product ? $__bt$__{product.priceCents / 100} ج.م$__bt : ""}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cairo", data: cairo, weight: 700 }] },
  );
}`,
          try: R`اعمل الملف، ونزّل خط Cairo من Google Fonts وحطه في [[assets]]. افتح [[/products/x/opengraph-image]] مباشرة في المتصفح تشوف الصورة. وبعدين شيل [[fonts]] وشوف الحروف العربي بقت إيه. وجرّب جملة طويلة فيها عربي وإنجليزي وأرقام، واتأكد إن الترتيب طالع صح.`,
          flag: "script",
          deep: {
            why: "لينك من غير صورة في واتساب أو لينكدإن بيتشاف أقل بكتير. وتصميم صورة لكل منتج من ألف منتج بإيدك مستحيل. التوليد بالكود بيعمل صورة متسقة لكل صفحة، وبتتحدث لوحدها لما الاسم أو السعر يتغير.",
            how: R`[[ImageResponse]] مبنية على Satori (بيحوّل JSX و CSS لـ SVG) و Resvg (بيحوّل الـ SVG لـ PNG). مش متصفح كامل: flexbox وحاجات CSS أساسية بس، مفيش grid، وكل عنصر فيه أكتر من ابن لازم [[display: flex]]. والخطوط لازم تتبعت كـ bytes (TTF أو OTF أو WOFF، مش WOFF2).

العربي: محتاج خط فيه حروف عربي، ودعم RTL في Satori محدود، فالجمل اللي فيها عربي وإنجليزي وأرقام ممكن ترتيبها يطلع غريب. اختبر النصوص الحقيقية، ولو فيه مشكلة خلي النص قصير والتصميم بسيط.

Next بيعامل الملف كـ route: بيتبني وقت الـ build لو مفيهوش حاجة dynamic، أو مع الطلب. والـ URL اللي في [[og:image]] فيه hash، فلما المحتوى يتغير الـ URL يتغير (بس واتساب وفيسبوك نفسهم بيكاشوا الصور فترة).

وفيه [[twitter-image.tsx]] بنفس الشكل لو عايز صورة مختلفة لـ X، ولو مش موجود بيستخدم الـ OG.`,
            when: R`صفحات المنتجات والمقالات والبروفايلات العامة، وأي صفحة الناس بتشاركها. والصفحات الثابتة: ملف PNG واحد في [[app]] كفاية.`,
            mistakes: R`تستخدم grid أو CSS مش مدعوم وتستغرب إن الصورة فاضية أو فيها خطأ. وتنسى الخط العربي فتطلع الحروف مقطّعة ومعكوسة، أو مربعات لو السيرفر مش واصل لـ Google Fonts. وتحمّل الخط من URL خارجي مع كل طلب بدل ملف محلي. وتنسى إن [[params]] هنا Promise في Next 16 زي الصفحة.`
          },
          lines: [
            R`[[ImageResponse]] بتحوّل JSX لصورة.`,
            "قراية ملف الخط.",
            "المسار.",
            R`المقاس القياسي لصور المشاركة. Next بيحطه في [[og:image:width]] و [[og:image:height]].`,
            "نوع الملف.",
            R`نص بديل للصورة ([[og:image:alt]]).`,
            R`بتاخد [[params]] زي الصفحة (Promise).`,
            "الـ slug.",
            "المنتج.",
            "خط عربي كـ bytes. الخط الافتراضي مفيهوش عربي، فمن غيره Next بيجيب خط احتياطي من Google Fonts وقت الطلب والحروف بتطلع مقطّعة ومعكوسة (ولو السيرفر مش واصل للإنترنت، مربعات).",
            "رجّع صورة...",
            "قوس JSX.",
            R`حاوية بـ flexbox. [[display: "flex"]] إجباري على أي div فيه أكتر من ابن.`,
            "الاسم.",
            "السعر.",
            "قفلة.",
            "قفلة القوس.",
            "المقاس والخط.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[/products/x/opengraph-image]] بيرجّع PNG مقاسه 1200×630، والصفحة نفسها فيها [[og:image]] بـ URL الملف ده وفي آخره hash، ومعاه [[og:image:width]] و [[og:image:height]] و [[og:image:alt]] لوحدهم.

من غير [[fonts]]: الصورة بتطلع برضه، بس العربي حروفه منفصلة ومعكوسة («كتاب» بتبان «باتك»)، لأن Next جاب خط احتياطي من Google Fonts وقت الطلب و Satori مبيوصّلش الحروف العربي. ولو السيرفر مش واصل للإنترنت هتطلع مربعات. ومع Cairo الحروف متوصلة صح.

والجملة المخلوطة: كل كلمة عربي سليمة، بس ترتيب الكلمات ماشي شمال لليمين زي الإنجليزي، فـ «كتاب Next.js 16» بتتقري بالعكس، و «ج.م» طلعت «م.ج». الحل العملي: كل جزء (الاسم، والسعر، والعملة) في div لوحده وترتّبهم بـ flexbox، أو نص قصير من غير خلط. وخد بالك: [[fontFamily: undefined]] في الـ style وقّع الصورة كلها عندي (الرد اتقطع من غير status)، فمتكتبش المفتاح لو مش هتستخدمه.`
        },
        {
          cmd: "JSON-LD",
          title: "JSON-LD للمنتج والمقال عشان rich results في جوجل",
          desc: R`JSON-LD داتا منظمة بتوصف الصفحة بمفردات schema.org: «ده منتج، سعره كذا، ومتوفر، وتقييمه ٤.٦ من ٣٨ رأي». جوجل بيستخدمها في rich results: السعر والنجوم والتوفر تحت اللينك في النتايج، وتاريخ المقال وكاتبه. ومحركات الـ AI بتقراها كمان.

في Next مفيش API خاص: [[<script type="application/ld+json">]] عادي جوه الصفحة (مش [[next/script]]، لأنه مش كود بيتنفذ)، ومحتواه [[JSON.stringify]] مع استبدال [[<]] بـ [[\u003c]]، لأن الداتا جاية من الداتابيز وممكن يبقى فيها [[</script>]]. والأنواع جاهزة في مكتبة [[schema-dts]].`,
          example: R`// app/products/[slug]/page.tsx
import type { Product, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.imageUrl],
    description: product.summary,
    sku: product.isbn,
    offers: {
      "@type": "Offer",
      url: $__bthttps://books.example.com/products/$__{slug}$__bt,
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "EGP",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.reviewCount > 0 ? { "@type": "AggregateRating", ratingValue: product.ratingAvg, reviewCount: product.reviewCount } : undefined,
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductView product={product} />
    </main>
  );
}`,
          try: R`حط الـ JSON-LD في صفحة منتج، وخلّي اسم منتج في الداتابيز [[كتاب </script><script>alert(1)</script>]]. افتح الصفحة: فيه alert؟ اعمل View Source وشوف شكل الاسم جوه الـ JSON. وبعدين شيل [[.replace]] وجرّب تاني. وآخر حاجة: اعمل نسخة للمقالات بـ [[@type: "Article"]] ([[headline]] و [[datePublished]] و [[author]])، وبعد ما ترفع الموقع (أو بـ ngrok) جرّب اللينك في Rich Results Test بتاع جوجل.`,
          flag: "script",
          deep: {
            why: "نتيجة فيها السعر والنجوم و «متوفر» بتاخد ضغطات أكتر بكتير من لينك أزرق عادي، ودي حاجة بتاخدها مجانًا من داتا عندك أصلًا. ومن غيرها جوجل بيحاول يخمّن من الـ HTML، وغالبًا مبيخمّنش.",
            how: R`الـ [[<script type="application/ld+json">]] data block: المتصفح مبينفذوش، ومحدش بيقراه غير الـ crawlers. عشان كده مش محتاج [[next/script]]، ومش محتاج nonce حتى مع CSP صارم (الـ CSP بيطبّق على الـ scripts اللي بتتنفذ بس).

ليه [[.replace(/</g, "\\u003c")]]؟ [[JSON.stringify]] مبيعملش escape لـ [[</script>]]. لو اسم المنتج فيه [[</script><script>...]]، المتصفح بيقفل الـ tag عند أول [[</script>]] وينفذ اللي بعده: XSS من حقل اسم منتج. و [[\u003c]] هو نفس الحرف جوه JSON، فالـ parser بتاع جوجل بيقراه [[<]] عادي، والمتصفح مش شايف tag.

الحاجات اللي جوجل بيطلبها للـ Product rich result: [[name]]، وواحد على الأقل من [[offers]] أو [[review]] أو [[aggregateRating]]. و [[price]] رقم كنص من غير عملة، و [[priceCurrency]] كود ISO ([[EGP]])، و [[availability]] URL من schema.org. وللمقالات: [[Article]] أو [[NewsArticle]] أو [[BlogPosting]] مع [[headline]] و [[image]] و [[datePublished]] و [[author]] ([[Person]] فيه [[name]] و [[url]]). ومفيش ضمان إن جوجل يعرض الـ rich result حتى لو الداتا صح.

القاعدة الأهم: الـ JSON-LD لازم يطابق اللي ظاهر في الصفحة. سعر في الـ JSON-LD غير اللي في الصفحة، أو تقييمات مش موجودة، ده مخالف لسياسات جوجل وممكن يعمل manual action على الموقع كله.

ومكانه: الصفحة نفسها (المنتج والمقال)، و [[Organization]] و [[WebSite]] ممكن في الـ root layout أو الصفحة الرئيسية. و [[BreadcrumbList]] لمسار الصفحة.`,
            when: "صفحات المنتجات، والمقالات، والوصفات، والفعاليات، والكورسات، والأسئلة الشائعة، وأي صفحة ليها نوع في schema.org وجوجل بيدعمه في rich results.",
            mistakes: R`[[JSON.stringify]] من غير escape لـ [[<]]. و [[next/script]] أو [[<Script>]] للـ JSON-LD. و [[aggregateRating]] بـ [[reviewCount: 0]] أو تقييمات مخترعة. وسعر بالعملة جوه [[price]] ([[250 ج.م]]). وداتا مش ظاهرة في الصفحة. و [[@context]] ناقص. وتحط Product schema على صفحة قايمة فيها ٢٠ منتج (ده [[ItemList]]).`
          },
          lines: [
            R`أنواع schema.org لـ TypeScript: بتكمّلك الحقول وتمسك الغلط.`,
            "404.",
            "الصفحة.",
            "الـ slug.",
            R`المنتج ([[getProduct]] متكاشة بـ [[cache]] زي درس generateMetadata).`,
            "مش موجود؟ 404.",
            R`[[WithContext<Product>]]: object من نوع Product وفيه [[@context]].`,
            "المفردات من schema.org.",
            "النوع.",
            "الاسم زي ما هو ظاهر في الصفحة.",
            "صورة أو أكتر (URLs كاملة).",
            "الوصف.",
            R`[[sku]]: الـ ISBN للكتب.`,
            "العرض: السعر والتوفر.",
            "نوعه.",
            "لينك الصفحة.",
            R`السعر كنص رقم بس: [[250.00]].`,
            "العملة بكود ISO.",
            "متوفر ولا لأ، كـ URL من schema.org.",
            "قفلة.",
            R`التقييم لو فيه آراء حقيقية بس، وإلا [[undefined]] و [[JSON.stringify]] بيشيله.`,
            "قفلة.",
            "الـ JSX.",
            "main.",
            R`data block. الـ [[replace]] بيحوّل كل [[<]] لـ [[\u003c]] عشان محدش يقفل الـ tag من جوه الداتا.`,
            "الصفحة نفسها.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`مع [[.replace]]: مفيش alert. في View Source هتلاقي الاسم [[كتاب </script><script>alert(1)</script>]] جوه الـ JSON، والـ h1 في الصفحة بيعرضه نص عادي (React عمله escape).

من غير [[.replace]]: الـ alert بيظهر. المتصفح شاف [[</script>]] جوه الاسم فقفل الـ data block، واللي بعده بقى [[<script>]] حقيقي. ولو عندك CSP بـ nonce مقفول، السكربت المحقون مش هيتنفذ (مفيش عليه nonce)، وده بالظبط ليه الاتنين مع بعض.

نسخة المقال: [[{ "@context": "https://schema.org", "@type": "Article", headline, image: [cover], datePublished: post.publishedAt.toISOString(), dateModified: post.updatedAt.toISOString(), author: [{ "@type": "Person", name, url }] }]].

Rich Results Test بيطلّع «Product snippets» و «Merchant listings» صالحين، وممكن warnings زي [[shippingDetails]] أو [[hasMerchantReturnPolicy]] ناقصين: دول اختياريين للـ snippet ومحتاجهم لو عايز تظهر في Google Shopping. الخطأ الأحمر الشائع: [[price]] فيه عملة أو فاصلة.`,
          solCode: R`// app/blog/[slug]/page.tsx
import type { Article, WithContext } from "schema-dts";
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: [post.coverUrl],
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: [{ "@type": "Person", name: post.author.name, url: $__bthttps://books.example.com/authors/$__{post.author.slug}$__bt }],
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1>{post.title}</h1>
    </article>
  );
}`
        }
      ]
    }
]);
