// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
          teach: R`## الفكرة: ٣ ملفات صغيرة، والمكتبة تعمل الباقي

[[lib/auth.ts]] فيه الإعدادات (الداتابيز، والدخول بالباسورد)، و [[route.ts]] بيفتح كل endpoints المكتبة على [[/api/auth/*]]، و [[auth-client.ts]] للمتصفح. كل الناتج تحت حقيقي: مشروع Next.js 16.4.0 على ويندوز، و [[better-auth]] 1.7.7، و Prisma 7.10 مع PostgreSQL 16 في Docker (container اسمه [[teach-next03-pg]] على بورت 55832)، والسيرفر [[next start]] على بورت 5831 فـ [[BETTER_AUTH_URL=http://localhost:5831]].

---

## ١. التركيب والمتغيرات

~~~bash
npm i better-auth
echo "BETTER_AUTH_SECRET=$(openssl rand -base64 32)" >> .env
echo "BETTER_AUTH_URL=http://localhost:3000" >> .env
~~~

- [[BETTER_AUTH_SECRET]]: السر اللي بيتوقّع بيه الـ cookies. [[openssl rand -base64 32]] = ٣٢ byte عشوائي. و [[>>]] يعني ضيف سطر في آخر الملف (مش امسح اللي فيه).
- [[BETTER_AUTH_URL]]: عنوان الموقع. المكتبة بتستخدمه في روابط OAuth وفي حماية الـ Origin (تحت).

---

## ٢. [[lib/auth.ts]] سطر سطر

~~~text
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  plugins: [nextCookies()],
});
~~~

| الحتة | معناها |
|---|---|
| [[betterAuth({...})]] | بيعمل الـ instance: object فيه [[auth.handler]] (للـ HTTP) و [[auth.api]] (نفس الـ endpoints كدوال) |
| [[prismaAdapter(db, ...)]] | «اكتب واقرا بـ Prisma client ده». [[db]] هو نفس الـ client بتاع المشروع من [[lib/db.ts]] |
| [[provider: "postgresql"]] | نوع الداتابيز، عشان الـ adapter يعرف يكتب queries مناسبة |
| [[emailAndPassword.enabled]] | شغّل التسجيل والدخول بالإيميل والباسورد |
| [[minPasswordLength: 10]] | أقل طول (الافتراضي ٨) |
| [[plugins: [nextCookies()]]] | لما تنادي [[auth.api]] من Server Action، يحط الـ cookies في رد Next. لازم آخر واحد |

و [[lib/db.ts]] عندنا (Prisma 7 محتاج driver adapter):

~~~text lib/db.ts
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const db = new PrismaClient({ adapter });
~~~

---

## ٣. [[route.ts]]: فولدر اسمه [[[...all]]]

~~~text app/api/auth/[...all]/route.ts
export const { GET, POST } = toNextJsHandler(auth);
~~~

- [[[...all]]] اسمه **catch-all segment**: الفولدر ده بيمسك أي مسار تحت [[/api/auth/]] مهما كان طوله: [[/api/auth/sign-up/email]] و [[/api/auth/get-session]] وكله.
- [[toNextJsHandler(auth)]] بيرجّع object فيه دالتين [[GET]] و [[POST]] بالشكل اللي Next عايزه في route handler.
- [[export const { GET, POST } = ...]]: destructuring و export في سطر واحد.

وفي جدول الـ build ظهر كده:

~~~text الناتج
└ ƒ /api/auth/[...all]
~~~

[[ƒ]] = dynamic: بيشتغل مع كل طلب.

---

## ٤. [[auth-client.ts]]

[[createAuthClient()]] من [[better-auth/react]] بيعمل client للمتصفح فيه [[signIn]] و [[signUp]] و [[signOut]] و hook اسمه [[useSession]]. من غير URL لأنه بيكلّم نفس الموقع.

---

## ٥. الجداول: [[npx auth@latest generate]]

أول مرة شغّلناه، وقع:

~~~text الناتج
[#better-auth]: Couldn't read your auth config. Error: Cannot find module '@/lib/generated/prisma/client'
~~~

الـ CLI بيشغّل [[lib/auth.ts]] فعلًا عشان يقرا الإعدادات، و [[lib/auth.ts]] بيستورد [[lib/db.ts]]، وده بيستورد Prisma client لسه متولّدش. فالترتيب: [[npx prisma generate]] الأول، وبعدها:

~~~bash
npx prisma generate
npx auth@latest generate
~~~

[[auth@latest]] يعني «شغّل آخر نسخة من package الـ CLI اسمها [[auth]]» (كانت 1.7.7). وضاف ٤ models في آخر [[schema.prisma]]:

~~~text اللي اتضاف (مختصر)
model User          id  name  email (unique)  emailVerified  image  createdAt  updatedAt   @@map("user")
model Session       id  expiresAt  token (unique)  ipAddress  userAgent  userId → User      @@map("session")
model Account       id  accountId  providerId  userId → User  accessToken  refreshToken ... password   @@map("account")
model Verification  id  identifier  value  expiresAt                                        @@map("verification")
~~~

[[@@map("user")]] معناها: الـ model اسمه [[User]] في الكود، والجدول في الداتابيز اسمه [[user]].

---

## ٦. [[npx prisma migrate dev --name auth]]

بيقارن الـ schema بالداتابيز، ويكتب ملف SQL في [[prisma/migrations/<تاريخ>_auth/migration.sql]] وينفذه. أهم سطوره:

~~~text migration.sql (مختصر)
CREATE TABLE "user" (...)
CREATE TABLE "session" (...)
CREATE TABLE "account" (...)
CREATE TABLE "verification" (...)
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" ... ON DELETE CASCADE
~~~

[[ON DELETE CASCADE]]: لو المستخدم اتمسح، الـ sessions والـ accounts بتاعته بيتمسحوا معاه.

> في Prisma 7، [[migrate dev]] مبقاش بيعمل generate لوحده، فشغّل [[npx prisma generate]] بعده (اتضافت للحل تحت).

---

## ٧. أول حساب بـ curl

~~~bash
curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara@example.com","password":"long-password-1"}'
~~~

- [[-X POST]] نوع الطلب، و [[-H]] header بيقول إن الـ body JSON، و [[-d]] الـ body نفسه.

بـ [[-i]] (اطبع الـ headers كمان) على بورت 5831:

~~~text الناتج
HTTP/1.1 200 OK
set-cookie: better-auth.session_token=1k6Mob...kSoFIs...%3D; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax

{"token":"1k6MobA3DIzbg9WQfs8PWRxTodRNGfLs","user":{"name":"Sara","email":"sara@example.com","emailVerified":false,"image":null,...}}
~~~

- التسجيل عمل **دخول** كمان: رجّع [[token]] وحط cookie.
- اسم الـ cookie [[better-auth.session_token]]، وقيمتها التوكن ونقطة وتوقيع ([[%3D]] هي [[=]] مكتوبة URL-encoded).
- [[Max-Age=604800]] = ٧ أيام بالثواني، و [[HttpOnly]] و [[SameSite=Lax]] زي اللي عملناه بإيدنا في درس [[session cookie]].
- مفيش [[Secure]] لأن الـ URL [[http://localhost]]. على HTTPS الاسم بيبقى [[__Secure-better-auth.session_token]].

---

## ٨. الداتابيز من جوه

بدل Prisma Studio سألنا Postgres مباشرة بـ [[psql]]:

~~~text الناتج: جدول account
 providerId | accountId = userId |   password (أول ٤٠ حرف)                  | length
 credential | t                  | abfe22fc3ee7bf8bd8193e45b879c857:3776318 |    161
~~~

~~~text الناتج: جدول session
 tok      | life   | userAgent   | ipAddress
 1k6MobA3 | 7 days | curl/8.22.0 | 0000:0000:...:0000
~~~

- الباسورد مش في [[user]]: في [[account]] بـ [[providerId: credential]]. كل طريقة دخول (باسورد، Google، GitHub) صف في [[account]] لنفس المستخدم.
- شكل الباسورد [[salt:hash]] بـ scrypt: ٣٢ حرف hex للـ salt (16 byte)، ونقطتين، و ١٢٨ حرف للـ hash (64 byte) = ١٦١.
- الـ session في جدول: مدتها ٧ أيام، ومعاها الـ User-Agent والـ IP (هنا [[::1]] مكتوب كامل، يعني localhost على IPv6). ولأنها صف، مسحه = خروج فوري.

---

## ٩. الأخطاء

~~~text الناتج
باسورد "short"                    400 {"message":"Password too short","code":"PASSWORD_TOO_SHORT"}
نفس الإيميل تاني                    422 {"message":"User already exists. Use another email.","code":"USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"}
طلب رابع في أقل من ١٠ ثواني         429 {"message":"Too many requests. Please try again later."}
Origin غريب ومعاه cookie           403 {"message":"Invalid origin","code":"INVALID_ORIGIN"}
~~~

- الـ 429: [[next start]] = production، والمكتبة بتشغّل rate limit في الإنتاج لوحدها، وعلى مسارات التسجيل والدخول ٣ طلبات كل ١٠ ثواني. بعد ما استنينا ١١ ثانية الطلب عدّى للفحص اللي بعده.
- الـ 403: بعتنا [[Origin: https://evil.example]] ومعاه cookie. أي POST فيه cookies لازم الـ Origin بتاعه يبقى [[BETTER_AUTH_URL]] أو في [[trustedOrigins]]. ده حماية CSRF.

---

## الخلاصة

| الخطوة | الأمر أو الملف | بيعمل إيه |
|---|---|---|
| ١ | [[npm i better-auth]] + المتغيرين | المكتبة والسر والعنوان |
| ٢ | [[lib/auth.ts]] | الإعدادات: Prisma، باسورد ≥ ١٠، [[nextCookies]] آخر plugin |
| ٣ | [[npx prisma generate]] ثم [[npx auth@latest generate]] | ٤ models في الـ schema |
| ٤ | [[migrate dev]] ثم [[prisma generate]] | الجداول في الداتابيز والـ client محدّث |
| ٥ | [[app/api/auth/[...all]/route.ts]] | كل الـ endpoints على [[/api/auth/*]] |
| ٦ | [[lib/auth-client.ts]] | للـ client components |

والباسورد في [[account]] مش [[user]]، والـ session صف في جدول، و 429 و 403 معناهم إن الحماية شغالة.`,
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
npx prisma generate
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
          teach: R`## الفكرة: ٣ Server Actions بينادوا المكتبة كدوال

[[signUp]] و [[signIn]] بياخدوا الفورم ويبعتوها لـ [[auth.api]]، ولو المكتبة رمت خطأ بيرجّعوا رسالة، ولو نجح بيحوّلوا. و [[signOut]] بيمسح الـ session. اتشغّل في نفس مشروع درس [[better-auth]] (Next.js 16.4.0، و [[better-auth]] 1.7.7، و Postgres في Docker، و [[next start]] على بورت 5831)، ومعاه صفحة [[/login]] من الحل تحت وصفحة [[/signup]] بنفس الشكل، والمتصفح Chrome headless. وحطينا [[console.log]] في الـ catch عشان نشوف شكل الخطأ.

---

## ١. الـ imports والنوع

| السطر | ليه |
|---|---|
| [[use server]] | كل الدوال هنا Server Actions |
| [[headers]] من [[next/headers]] | headers الطلب الحالي (فيها الـ cookies والـ IP والـ User-Agent) |
| [[redirect]] | التحويل |
| [[APIError]] من [[better-auth/api]] | نوع الخطأ اللي المكتبة بترميه، عشان نفرّقه عن أي خطأ تاني |
| [[auth]] | الـ instance من [[lib/auth.ts]] |
| [[type State = { error?: string }]] | شكل الـ state: يا فاضي يا فيه رسالة. و [[?]] معناها الخانة اختيارية |

و [[: Promise<State>]] بعد كل دالة بيقول لـ TypeScript إنها بترجّع [[State]] صراحة، عشان [[useActionState(signIn, {})]] يقبل [[{}]] كأول قيمة (من غيره بيستنتج [[{ error: string }]]، زي ما شفنا في درس [[session cookie]]).

---

## ٢. [[signUp]] من جوه لبرة

### [[auth.api.signUpEmail({ body, headers })]]

نفس [[POST /api/auth/sign-up/email]] اللي جربناه بـ curl، بس نداء دالة عادي من غير HTTP. بياخد:

- [[body]]: [[name]] و [[email]] و [[password]]. كل واحد [[String(formData.get("x") ?? "")]]: هات قيمة الـ input، ولو [[null]] خليها نص فاضي، وحوّلها نص.
- [[headers: await headers()]]: المكتبة بتاخد منها الـ IP والـ User-Agent وتحطهم في الـ session، وبتستخدمهم في الـ rate limit.

### [[try { ... } catch (e) { ... }]]

لو التسجيل فشل، المكتبة **بترمي** [[APIError]]. الـ [[catch]]:

~~~text
if (!(e instanceof APIError)) throw e;
return { error: e.body?.code === "PASSWORD_TOO_SHORT" ? "الباسورد لازم ١٠ حروف على الأقل" : "مش قادرين نعمل الحساب ده" };
~~~

- [[instanceof APIError]]: هل الخطأ من المكتبة؟ لو لأ (الداتابيز وقعت مثلًا) [[throw e]] تاني، فيروح لـ [[error.tsx]].
- [[e.body?.code]]: كود الخطأ. و [[? :]] (ternary): لو الكود ده، الرسالة الأولى، وإلا التانية.

سجّلنا بباسورد [[short]] من الفورم. اللوج على السيرفر، وبعده اللي ظهر في الصفحة:

~~~text الناتج
signUp APIError BAD_REQUEST 400 {"message":"Password too short","code":"PASSWORD_TOO_SHORT"}
signup short -> الباسورد لازم ١٠ حروف على الأقل
~~~

يعني [[APIError]] فيه [[status]] كنص ([[BAD_REQUEST]])، و [[statusCode]] كرقم (400)، و [[body]] فيه [[message]] و [[code]].

### [[redirect("/dashboard")]] برّه الـ try

لو التسجيل نجح، المكتبة عملت session، و [[nextCookies()]] حط الـ cookie، فنحوّل.

---

## ٣. [[signIn]]: نفس الشكل، ورسالة واحدة

~~~text
} catch (e) {
  if (e instanceof APIError) return { error: "الإيميل أو الباسورد غلط" };
  throw e;
}
~~~

باسورد غلط:

~~~text الناتج
signIn APIError UNAUTHORIZED 401 {"message":"Invalid email or password","code":"INVALID_EMAIL_OR_PASSWORD"}
wrong pw -> الإيميل أو الباسورد غلط
~~~

المكتبة نفسها مش بتفرّق بين «الإيميل مش موجود» و «الباسورد غلط» (نفس الكود)، ورسالتنا كمان.

> بين كل تجربة والتانية استنينا ١١ ثانية: [[next start]] = production، والمكتبة بتشغّل rate limit على الدخول والتسجيل (٣ طلبات كل ١٠ ثواني).

---

## ٤. الدخول الصح: الـ cookie

الباسورد الصح، والمتصفح راح [[/dashboard]] وظهر [[أهلًا Sara]]. الـ cookie في Chrome:

~~~text الناتج
{ name: 'better-auth.session_token', httpOnly: true, secure: false, sameSite: 'Lax', days: '7.00', value: 'mfx6IIWAlIw4...' }
~~~

[[secure: false]] لأننا على [[http://localhost]]. على HTTPS المكتبة بتحط [[Secure]] وبتغيّر الاسم لـ [[__Secure-better-auth.session_token]].

---

## ٥. [[nextCookies()]]: جرّبنا من غيره

علّقنا السطر في [[lib/auth.ts]] ([[plugins: [/* nextCookies() */]]])، وعملنا build تاني، ودخلنا بنفس الباسورد الصح:

~~~text الناتج
url after login http://localhost:5831/dashboard   form? 1   h1? 0
NO COOKIE
proxy /dashboard cookie? false
~~~

وعدد صفوف جدول [[session]] زاد واحد. يعني الدخول **نجح** في الداتابيز، والـ action مرماش خطأ، بس الـ cookie متحطتش: الـ proxy لقى مفيش cookie ورجّع صفحة الـ login (الفورم ظاهرة، ومفيش [[h1]] الـ dashboard). [[auth.api.signInEmail]] بيرجّع الـ [[Set-Cookie]] جوه نتيجة الدالة، و [[nextCookies()]] هو اللي بياخده ويكتبه بـ [[cookies().set]] بتاع Next.

---

## ٦. [[signOut]]

~~~text
await auth.api.signOut({ headers: await headers() });
redirect("/login");
~~~

الـ [[headers]] هنا إجبارية: منها المكتبة بتقرا الـ cookie وتعرف أنهي session تمسح. بعد الضغط على «خروج»:

~~~text الناتج
after signOut http://localhost:5831/login []
عدد صفوف session: قبل الدخول 1، بعد الخروج 1
~~~

القوسين الفاضيين: مفيش cookies. والصف اللي اتعمل في الدخول اتمسح (الصف الباقي session تانية من تجربة curl).

ولو حد احتفظ بالقيمة القديمة للـ cookie؟ بعتناها بنفسنا لـ [[/api/auth/get-session]]:

~~~text الناتج
old cookie get-session: 200 null
~~~

[[null]] = مفيش session، لأن الصف اتمسح. ده الفرق عن JWT في درس [[session cookie]].

---

## ٧. ليه [[redirect]] برّه الـ try؟

عملنا نسخة غلط فيها [[redirect]] جوه الـ [[try]] و [[catch]] من غير فحص، ودخلنا بالباسورد الصح:

~~~text الناتج
url http://localhost:5831/login-bad   alert: الإيميل أو الباسورد غلط   cookies: [ 'better-auth.session_token' ]
~~~

الـ cookie اتحطت (الدخول نجح)، بس [[redirect]] بيرمي exception خاص، والـ [[catch]] مسكه وفكره خطأ، فظهرت «الإيميل أو الباسورد غلط».

---

## ٨. صفحة الـ login (الحل)

- [[useActionState(signIn, {})]] بيرجّع ٣ حاجات: [[state]] (آخر حاجة رجعت من الـ action)، و [[action]] (تتحط في [[<form action>]])، و [[pending]] ([[true]] وهو بيبعت).
- [[autoComplete="current-password"]]: بيخلي مدير الباسوردات في المتصفح يملا الخانة.
- [[{state.error && <p role="alert">...}]]: لو فيه رسالة اعرضها. و [[role="alert"]] بيخلي قارئ الشاشة يقراها.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[auth.api.*]] من Server Action | نفس الـ endpoints من غير HTTP، والفورم تشتغل من غير JS |
| [[headers: await headers()]] | الـ IP والـ cookies (وإجبارية في [[signOut]]) |
| [[instanceof APIError]] | خطأ معروف = رسالة، غيره = [[throw]] |
| رسالة واحدة في الدخول | محدش يعرف مين متسجل |
| [[nextCookies()]] | من غيره الدخول بينجح والـ cookie متتحطش |
| [[redirect]] برّه الـ try | وإلا الـ catch يمسكه |
| [[signOut]] | بيمسح الصف، فالـ cookie القديمة متنفعش |`,
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
          teach: R`## الفكرة: طبقتين، واحدة سريعة وواحدة بجد

في [[lib/dal.ts]]: [[getSession]] بتسأل المكتبة (والمكتبة بتسأل الداتابيز)، و [[requireUser]] بتحوّل للـ login لو مفيش، و [[getMyOrders]] بتجيب طلبات المستخدم ده بس. وفي [[proxy.ts]]: فحص سريع إن الـ cookie موجودة، من غير داتابيز. اتشغّل في نفس مشروع الدرسين اللي فاتوا ([[better-auth]] 1.7.7، و Postgres في Docker، و [[next start]] على بورت 5831)، وفيه صفحة [[/dashboard]] من الحل تحت ومعاها layout بينادي [[requireUser]] كمان. وحطينا [[console.log]] جوه [[getSession]] وجوه الـ proxy عشان نعرف مين اشتغل، وضفنا طلب [[o_sara]] لـ Sara وطلب [[o_other]] لمستخدم تاني.

---

## ١. [[getSession]]: سطر واحد فيه ٣ حاجات

~~~text
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));
~~~

من جوه لبرة:

1. [[await headers()]]: headers الطلب الحالي، وفيها الـ cookie.
2. [[auth.api.getSession({ headers })]]: المكتبة بتطلّع الـ cookie، وتتحقق من توقيعها، وتدوّر على الـ session في جدول [[session]]، وترجّع [[{ user, session }]] أو [[null]].
3. [[cache(...)]]: نفس النتيجة لأي نداء تاني في نفس الطلب.

---

## ٢. [[requireUser]]

~~~text
const session = await getSession();
if (!session) redirect("/login");
return session.user;
~~~

بترجّع [[session.user]] (فيه [[id]] و [[name]] و [[email]] و [[emailVerified]]...). وبعد السطر التاني TypeScript عارف إن [[session]] مش [[null]]، لأن [[redirect]] مبيرجعش.

---

## ٣. [[getMyOrders]]

[[where: { userId: user.id }]] جوه الـ query، و [[select]] بـ ٣ أعمدة. زي درس [[DAL]] بالظبط، الفرق إن [[user.id]] جاي من المكتبة.

---

## ٤. [[proxy.ts]]

~~~text
if (!getSessionCookie(request)) return NextResponse.redirect(new URL("/login", request.url));
return NextResponse.next();
~~~

- [[getSessionCookie(request)]] من [[better-auth/cookies]]: بيدوّر على cookie اسمها [[better-auth.session_token]] (أو بـ [[__Secure-]] قبلها) ويرجّع قيمتها أو [[null]]. **مش** بيتحقق من حاجة.
- [[new URL("/login", request.url)]]: بيعمل URL كامل لـ [[/login]] على نفس الدومين، لأن [[NextResponse.redirect]] عايز URL كامل.
- [[NextResponse.next()]]: كمّل للصفحة.
- [[matcher: ["/dashboard/:path*", "/account/:path*"]]]: الـ proxy يشتغل على المسارين دول وأي حاجة تحتهم بس ([[:path*]] = صفر أو أكتر من الأجزاء).

---

## ٥. التلات حالات

دخلنا بـ [[POST /api/auth/sign-in/email]] وخدنا الـ cookie الحقيقية، وبعدين طلبنا [[/dashboard]] ٣ مرات بـ [[fetch]] من Node و [[redirect: "manual"]] (متتبعش التحويل، وريني هو).

~~~text الناتج
no cookie      307 /login
random         307 /login
real           200  <h1>أهلًا Sara</h1> <li>o_sara: PAID</li>
~~~

ولوج السيرفر لنفس الطلبات بالترتيب:

~~~text الناتج
proxy /dashboard cookie? false
proxy /dashboard cookie? true
getSession
proxy /dashboard cookie? true
getSession
~~~

| الحالة | الـ proxy | [[getSession]] | مين وقفه |
|---|---|---|---|
| مفيش cookie | [[false]]، حوّل | متنداش | الـ proxy |
| [[abc123.fake]] | [[true]]، عدّاها | [[null]] | الـ DAL |
| cookie حقيقية | [[true]] | المستخدم | محدش: الصفحة ظهرت |

الحالة التانية هي الدليل: أي حد يحط cookie بالاسم ده يعدّي من الـ proxy. الحماية الحقيقية في [[requireUser]].

وفي الحالة التالتة: الـ layout والصفحة و [[getMyOrders]] نادوا [[requireUser]] ٣ مرات، و [[getSession]] اتطبعت **مرة واحدة**، يعني query واحد على الداتابيز بفضل [[cache]]. وطلب [[o_other]] مظهرش لأنه مش بتاع Sara.

---

## ٦. امسح الـ session وانت داخل

دخلنا تاني، وطلبنا الصفحة، ومسحنا صف الـ session بـ [[psql]]، وطلبنا تاني بنفس الـ cookie:

~~~text الناتج
before delete: 200
DELETE 1
after delete:  307 /login
~~~

الـ cookie لسه سليمة وتوقيعها صح، بس الـ session مش في الداتابيز، فـ [[getSession]] رجّع [[null]]. ده اللي بيخلي «اخرج من كل الأجهزة» أو قفل حساب يشتغل فورًا. (لو [[session.cookieCache]] شغال، المكتبة بتصدّق نسخة في cookie لحد ما مدتها تخلص، فالمسح ياخد وقت.)

---

## ٧. في الـ client: [[authClient.useSession()]]

hook بيرجّع [[{ data, isPending }]]، و [[data]] فيه [[user]] و [[session]]. بيعمل طلب لـ [[/api/auth/get-session]] من المتصفح. استخدمه للعرض بس (اسم المستخدم في الـ navbar)، لأن أي حد يقدر يغيّر كود المتصفح.

---

## الخلاصة

| المكان | الأداة | بيعمل إيه | حماية؟ |
|---|---|---|---|
| [[proxy.ts]] | [[getSessionCookie]] | الـ cookie موجودة؟ من غير داتابيز | لأ، تجربة أسرع بس |
| الـ DAL | [[getSession]] + [[cache]] | تحقق كامل، query واحد في الطلب | أيوه |
| الصفحات والـ actions | [[requireUser()]] | أول سطر | أيوه |
| الـ query | [[where: { userId }]] | الملكية | أيوه |
| client component | [[useSession()]] | العرض | لأ |`,
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
          teach: R`## الفكرة: زرار بيودّيك لـ Google، و Google بيرجّعك بكود

[[socialProviders]] في [[lib/auth.ts]] بيعرّف المكتبة على Google و GitHub، والزراير بتنادي [[authClient.signIn.social]]. اتشغّل في نفس مشروع [[better-auth]] 1.7.7 ([[next start]] على بورت 5831) بـ [[clientId]] وهمي (مفيش OAuth App حقيقي هنا)، فجرّبنا الجزء اللي عندنا لحد ما المتصفح يخرج لـ GitHub أو Google، ووقفناه قبل ما يوصل هناك. الجزء اللي بعد كده (الموافقة والرجوع بالكود الحقيقي والربط) مكتوب من وثائق Better Auth.

---

## ١. الإعدادات الجديدة

~~~text
socialProviders: {
  google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
  github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
},
account: { accountLinking: { enabled: true } },
~~~

| الحتة | معناها |
|---|---|
| [[clientId]] | رقم التطبيق بتاعك عند Google أو GitHub. مش سر، بيظهر في الـ URL |
| [[clientSecret]] | السر: بيتبعت من السيرفر بس وقت تبديل الكود. مكانه [[.env]] من غير [[NEXT_PUBLIC_]] |
| [[!]] بعد [[process.env.X]] | non-null assertion: «يا TypeScript، القيمة دي موجودة». لو المتغير مش متحط، TS مش هيقولك |
| [[accountLinking.enabled]] | اسمح إن مستخدم واحد يبقى ليه أكتر من طريقة دخول (الافتراضي أصلًا [[true]]) |

---

## ٢. الزراير: [["use client"]] و [[onClick]]

الزراير محتاجة [[onClick]]، والـ events بتشتغل في client components بس، فأول سطر [[use client]].

~~~text
authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/login" })
~~~

- [[provider]]: أنهي واحد.
- [[callbackURL]]: يروح فين في موقعك بعد ما الدخول ينجح.
- [[errorCallbackURL]]: يروح فين لو فشل، ومعاه [[?error=...]].

---

## ٣. اللي حصل لما دوسنا الزرار

Chrome headless داس «ادخل بـ GitHub». أول حاجة، طلب لسيرفرنا:

~~~text الناتج
REQ POST http://localhost:5831/api/auth/sign-in/social {"provider":"github","callbackURL":"/dashboard","errorCallbackURL":"/login"}
~~~

والرد (جرّبناه بـ curl كمان) JSON فيه [[url]]، ومعاه cookie:

~~~text الناتج
set-cookie: better-auth.state=hiSy9B...%3D; Max-Age=300; Path=/; HttpOnly; SameSite=Lax
{"url":"https://github.com/login/oauth/authorize?response_type=code&client_id=Iv1.demo123&state=hiSy9B...
~~~

والمتصفح راح على الـ URL ده. فكّينا الـ query string:

~~~text الناتج: GitHub
https://github.com/login/oauth/authorize
    response_type = code
    client_id = Iv1.demo123
    state = 1tVODE6ul4QJskiY8f5cWxCdRpesM27J
    scope = read:user user:email
    redirect_uri = http://localhost:5831/api/auth/callback/github
    code_challenge_method = S256
    code_challenge = _afpVuV4izHopF14-ZffSlepo-JAZBO1A_M7kSXWsws
~~~

كل خانة ليها سبب:

| الخانة | معناها |
|---|---|
| [[response_type=code]] | «رجّعلي كود» مش توكن. الكود بيتبدّل بتوكن من السيرفر بالسر |
| [[client_id]] | مين التطبيق اللي بيطلب |
| [[state]] | رقم عشوائي، المكتبة هتتأكد إنه رجع زي ما هو (ضد CSRF) |
| [[scope]] | الصلاحيات: [[read:user]] (البروفايل) و [[user:email]] (الإيميل، حتى لو مخفي) |
| [[redirect_uri]] | يرجّع فين. لازم يطابق اللي متسجل في لوحة GitHub **حرف بحرف** |
| [[code_challenge]] + [[S256]] | PKCE: hash لرقم سري ([[codeVerifier]]) متخزن عند السيرفر بس. وقت التبديل بيتبعت الرقم نفسه، فلو حد سرق الكود من الـ URL ميقدرش يستخدمه |

ونفس الكلام مع Google: [[https://accounts.google.com/o/oauth2/v2/auth]] و [[scope = email profile openid]] و [[redirect_uri = .../api/auth/callback/google]].

### الـ state متخزن فين؟

في جدول [[verification]] (ومعاه الـ cookie [[better-auth.state]] عمرها ٥ دقايق):

~~~text الناتج
 identifier    | value                                                        | life
 auth-state:h… | {"callbackURL":"/dashboard","codeVerifier":"fzXod1pYnQ...    | 00:10:00
~~~

يعني الـ [[codeVerifier]] بتاع PKCE والـ [[callbackURL]] متخزنين عند السيرفر ١٠ دقايق.

### لو حد بعت callback مزوّر

~~~bash
curl -i "localhost:5831/api/auth/callback/github?code=fake&state=forged"
~~~

~~~text الناتج
HTTP/1.1 302 FOUND
location: http://localhost:5831/api/auth/error?error=state_mismatch
~~~

الـ [[state]] مش موجود عندنا، فاترفض من غير ما المكتبة تكلّم GitHub أصلًا.

---

## ٤. الرجوع الحقيقي (من الوثائق)

لما المستخدم يوافق، GitHub بيرجّعه على [[/api/auth/callback/github?code=...&state=...]]. المكتبة: تتأكد من الـ state، تبدّل الـ code بـ access token (بالـ [[clientSecret]] و [[codeVerifier]])، تجيب الإيميل، تلاقي أو تعمل [[User]]، تضيف صف في [[account]] بـ [[providerId: "github"]] و [[accountId]] رقم حسابه على GitHub، تعمل session، وتحوّل على [[callbackURL]].

---

## ٥. الربط بالإيميل (من الوثائق)

| الحالة | النتيجة |
|---|---|
| إيميل جديد | [[User]] جديد + [[account]] بـ github |
| إيميل موجود ومتأكد ([[emailVerified: true]]) والـ provider بيقول إن الإيميل متأكد | يتربط: صف [[account]] جديد لنفس المستخدم |
| إيميل موجود ومش متأكد | يرفض: [[errorCallbackURL]] ومعاه [[?error=account_not_linked]] |

الحالة التالتة هي الحماية من pre-account takeover: حد سجّل بإيميلك وباسورد يعرفه قبلك، فلو اتربط تلقائي هيفضل معاه باسورد لحسابك.

والربط الصريح: [[authClient.linkSocial({ provider: "github", callbackURL: "/settings" })]] من مستخدم داخل. نفس الرحلة، والـ [[account]] بيتضاف للمستخدم الحالي، وافتراضيًا لازم إيميل GitHub يبقى نفس إيميله.

---

## ٦. قبل الإنتاج

- في لوحة GitHub (OAuth App) و Google Cloud Console: الـ callback بالدومين الحقيقي، نفس اللي ظهر في [[redirect_uri]] فوق بالظبط. أي اختلاف = [[redirect_uri_mismatch]].
- [[BETTER_AUTH_URL]] هو اللي بيتبني منه [[redirect_uri]]، فلازم يبقى الدومين الحقيقي بـ https.
- OAuth App منفصل للتطوير وللإنتاج.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[socialProviders]] | الـ id والسر لكل provider |
| [[signIn.social]] | طلب لسيرفرك يرجّع URL، والمتصفح يروح له |
| [[state]] + cookie [[better-auth.state]] | الرجوع لازم يكون لنفس الطلب ([[state_mismatch]] غير كده) |
| [[code_challenge]] (PKCE) | الكود المسروق ميتبدّلش |
| [[redirect_uri]] | لازم يطابق اللوحة حرف بحرف |
| الربط | بإيميل متأكد في الناحيتين بس، وإلا [[account_not_linked]] |`,
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
          teach: R`## الفكرة: الأدوار متعرّفة في ملف واحد، والكود بيسأل عن الفعل

[[lib/permissions.ts]] بيقول إيه الموارد والأفعال، وكل دور يقدر يعمل إيه. والـ admin plugin بيضيف عمود [[role]] للمستخدم. و [[requirePermission]] في الـ DAL بتسأل: «المستخدم ده دوره يسمح بالفعل ده؟». اتشغّل في نفس مشروع [[better-auth]] 1.7.7 (Postgres في Docker، و [[next start]] على بورت 5831)، و ٣ مستخدمين: Sara (اتعملت قبل الـ plugin)، و Sam ([[support]])، و Adam ([[admin]]). وحطينا [[console.log]] في [[requirePermission]].

---

## ١. [[statement]]: كل الموارد والأفعال

~~~text
const statement = { ...defaultStatements, product: ["create", "update", "delete"], order: ["read", "refund"] } as const;
~~~

- [[...defaultStatements]]: موارد الـ admin plugin نفسه ([[user]] و [[session]] بأفعال زي [[set-role]] و [[ban]] و [[impersonate]]). الـ [[...]] بينسخهم جوه الـ object.
- [[product]] و [[order]]: مواردنا احنا، وكل واحد ليه array أفعال.
- [[as const]]: من غيره TypeScript بيشوف [[order]] على إنه [[string[]]] (أي نص). معاه بيشوفه [["read" | "refund"]] بالظبط، فلو كتبت [["refnud"]] بالغلط يطلع خطأ وقت الكتابة.

---

## ٢. النوع [[Permissions]]

~~~text
export type Permissions = { [K in keyof typeof statement]?: (typeof statement)[K][number][] };
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[typeof statement]] | نوع الـ object اللي فوق |
| [[keyof ...]] | أسماء المفاتيح: [["user" | "session" | "product" | "order"]] |
| [[[K in ...]]] | mapped type: لف على كل مفتاح [[K]] |
| [[?:]] | كل مفتاح اختياري |
| [[(typeof statement)[K]]] | الـ array بتاع المفتاح ده، مثلًا [[readonly ["read", "refund"]]] |
| [[[number]]] | نوع أي عنصر فيه: [["read" | "refund"]] |
| [[[]]] في الآخر | array منهم |

النتيجة: [[{ order?: ("read" | "refund")[]; product?: ("create" | "update" | "delete")[]; ... }]].

---

## ٣. الأدوار

~~~text
export const ac = createAccessControl(statement);
export const customer = ac.newRole({ order: ["read"] });
export const support = ac.newRole({ order: ["read", "refund"] });
export const admin = ac.newRole({ ...adminAc.statements, product: [...], order: ["read", "refund"] });
~~~

- [[createAccessControl]] بيعمل «المتحكم» من الـ statement، و [[ac.newRole]] بيعمل دور بمجموعة أفعال منه.
- [[...adminAc.statements]]: صلاحيات الأدمن الافتراضية على [[user]] و [[session]]. من غيرها الأدمن مش هيقدر يستخدم [[setRole]] و [[banUser]].

والربط في [[lib/auth.ts]]:

~~~text
plugins: [adminPlugin({ ac, roles: { admin, customer, support }, defaultRole: "customer" }), nextCookies()]
~~~

[[import { admin as adminPlugin }]]: الـ plugin اسمه [[admin]]، وعندنا دور اسمه [[admin]] برضه، فـ [[as]] بيدّي الـ import اسم تاني. و [[defaultRole]] دور أي مستخدم جديد.

---

## ٤. الأعمدة الجديدة: generate و migrate

~~~bash
npx auth@latest generate
npx prisma migrate dev --name admin
npx prisma generate
~~~

قبل ما الـ schema يتحدّث، المكتبة نفسها طبعت تحذير لما اتحمّلت:

~~~text الناتج
ERROR [Better Auth]: Prisma schema mismatch
  Missing columns
    user.role
    user.banned
    user.banReason
    user.banExpires
    session.impersonatedBy
~~~

وبعد generate، الفرق في [[schema.prisma]]:

~~~text الناتج
>   role       String?
>   banned     Boolean?  @default(false)
>   banReason  String?
>   banExpires DateTime?
>   impersonatedBy String?
~~~

[[String?]] يعني ممكن يبقى [[null]]. وسجّلنا Sam و Adam بعد الـ plugin، فالرد رجّع [[role: customer]] لكل واحد (الـ [[defaultRole]])، وغيّرنا أدوارهم بـ SQL:

~~~text الناتج
 adam@example.com | admin   | f
 sam@example.com  | support | f
 sara@example.com |         | f
~~~

Sara فاضية ([[null]]) لأنها اتعملت قبل العمود.

---

## ٥. [[requirePermission]]

~~~text
const user = await requireUser();
const { success } = await auth.api.userHasPermission({ body: { userId: user.id, permissions } });
if (!success) notFound();
~~~

[[userHasPermission]] بـ [[userId]] بيجيب دور المستخدم من الداتابيز ويشوف الدور ده فيه **كل** الأفعال المطلوبة. وبيرجّع [[{ error, success }]]، و [[const { success } = ...]] بتاخد [[success]] بس.

---

## ٦. [[refundOrder]]

~~~text
await requirePermission({ order: ["refund"] });
await db.order.update({ where: { id: orderId, status: "PAID" }, data: { status: "REFUNDED" } });
updateTag("orders");
~~~

- أول سطر الصلاحية: الكود بيسأل عن **الفعل** [[refund]] مش عن اسم الدور.
- [[where: { id, status: "PAID" }]]: حدّث الطلب ده **لو** حالته [[PAID]] بس.
- [[updateTag("orders")]]: أي كاش متعلم بـ [[orders]] يتحدّث (فئة Cache Components).

عملنا صفحة فيها زرار بيشغّل [[refundOrder]] على طلب، ودخلنا بكل مستخدم:

~~~text الناتج
sara@example.com   o_r1  POST 404  | db: PAID
sam@example.com    o_r1  POST 200  | db: REFUNDED
sam@example.com    o_r1  POST 500  | db: REFUNDED
adam@example.com   o_r2  POST 200  | db: REFUNDED
~~~

~~~text لوج السيرفر
requirePermission sara@example.com {"order":["refund"]} false
requirePermission sam@example.com {"order":["refund"]} true
requirePermission sam@example.com {"order":["refund"]} true
~~~

- Sara: [[false]]، فـ [[notFound()]] والطلب متغيرش. (دورها [[null]]، وده بيترفض زي [[customer]].)
- Sam أول مرة: اترجع.
- Sam تاني مرة على نفس الطلب: الصلاحية [[true]]، بس الـ [[where]] ملقاش صف [[PAID]]، فـ Prisma رمى:

~~~text الناتج
Error [PrismaClientKnownRequestError]: Invalid prisma.order.update() invocation:
No record was found for an update.
  code: 'P2025'
~~~

يعني مفيش استرجاع مرتين. في التطبيق الحقيقي امسك [[P2025]] ورجّع رسالة بدل 500.

---

## ٧. السكربت (الحل): فحص الأدوار من غير مستخدمين

[[userHasPermission]] بـ [[role]] بدل [[userId]] بيحسب من التعريف بس، من غير داتابيز:

~~~text الناتج
customer {"order":["refund"]} false
support {"order":["refund"]} true
support {"product":["delete"]} false
admin {"product":["delete"]} true
~~~

والرد الخام لواحد منهم: [[{"error":null,"success":false}]].

> شغّلناه أول مرة بـ [[npx tsx scripts/check-roles.ts]] ووقع: [[Top-level await is currently not supported with the "cjs" output format]]. مشروع [[create-next-app]] مفيش في [[package.json]] بتاعه [[type: module]]، فـ [[.ts]] بيتعامل كـ CommonJS، و [[await]] برّه أي دالة مش مسموح. الحل: امتداد [[.mts]] (TypeScript بنظام ES modules). ومن غير [[--env-file=.env]] السكربت اشتغل بس طبع تحذيرات إن [[BETTER_AUTH_URL]] ومفاتيح Google و GitHub مش موجودة، و [[DATABASE_URL]] كمان مش هيبقى موجود لأي فحص بـ [[userId]]. فالأمر الصح: [[npx tsx --env-file=.env scripts/check-roles.mts]] (اتعدّل في الحل).

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[statement]] + [[as const]] | كل الموارد والأفعال، بأنواع حرفية |
| [[ac.newRole]] | الدور = مجموعة أفعال |
| [[adminAc.statements]] | لازم في دور الأدمن عشان إدارة المستخدمين |
| generate + migrate + generate | أعمدة [[role]] و [[banned]]... |
| [[requirePermission]] | أول سطر في أي action حساس، وبيقرا الدور من الداتابيز |
| [[where]] فيها الحالة | العملية متتكررش |
| الملكية | لسه في الـ query ([[where: { userId }]])، الصلاحية مش بديل عنها |`,
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
          solCode: R`// scripts/check-roles.mts   (npx tsx --env-file=.env scripts/check-roles.mts)
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
    }
]);
