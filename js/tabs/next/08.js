// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
    {
      t: "Server Actions",
      l: 2,
      n: "دالة على السيرفر بتناديها من فورم أو زرار، من غير ما تكتب API، وبتتحمي زي أي endpoint",
      items: [
        {
          cmd: "use server",
          title: "تبعت فورم للسيرفر من غير ما تكتب API",
          desc: R`Server Action دالة [[async]] عليها [[use server]]، بتتنفذ على السيرفر، وتقدر تناديها من المتصفح كأنها دالة عادية. أشهر استخدام: [[<form action={createPost}>]]، والدالة بتستلم [[FormData]] فيها كل الخانات بالـ [[name]].

حطهم في ملف لوحده عليه [[use server]] فوق (زي [[app/actions/posts.ts]])، فتقدر تستوردهم في server و client components. وبعد التعديل، [[revalidatePath]] أو [[updateTag]] عشان الصفحة تعرض الجديد.`,
          example: R`// app/actions/posts.ts
"use server";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
export async function createPost(formData: FormData) {
  const { userId } = await verifySession();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  await db.post.create({ data: { title, authorId: userId } });
  revalidatePath("/posts");
}
// app/posts/new/page.tsx (server component)
import { createPost } from "@/app/actions/posts";
export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required maxLength={120} />
      <button type="submit">انشر</button>
    </form>
  );
}`,
          try: R`اعمل الـ action والصفحة، واقفل JavaScript من DevTools (Settings > Debugger > Disable JavaScript) وابعت الفورم: هتلاقيه اشتغل برضه. وبعدين شغّل JS تاني وافتح Network وابعته: هتلاقي طلب POST على نفس الصفحة وفيه header اسمه [[Next-Action]].`,
          flag: "script",
          deep: {
            why: "عشان تحفظ فورم في SPA لازم: route في API، و fetch في الواجهة، و loading state، و error handling، وأنواع للطلب والرد في مكانين. الـ Server Action بيشيل كل ده: دالة واحدة، و TypeScript شايف الأنواع من الناحيتين.",
            how: R`وقت الـ build، Next بيدّي كل Server Action ID ويعمل endpoint مخفي. في الـ client، الدالة بتتحول لـ reference: لما تناديها، بيتبعت POST للصفحة الحالية فيه الـ ID في header [[Next-Action]] والـ arguments في الـ body. السيرفر بينفذ الدالة، ويرجّع النتيجة ومعاها الـ RSC payload الجديد لو فيه revalidate، فالصفحة بتتحدث في نفس الرحلة.

[[<form action={fn}>]] بيشتغل حتى قبل ما الـ JS يتحمّل (progressive enhancement): الفورم بيتبعت POST عادي، وبعد الـ hydration React بيمسكه ويبعته من غير reload. وبعد ما الـ action يخلص، React بيفضّي الفورم لوحده.

الـ actions بتتنفذ ورا بعض واحد واحد من نفس الصفحة، فمش مناسبة لجلب داتا بالتوازي. وحد حجم الـ body الافتراضي ١ ميجا ([[experimental.serverActions.bodySizeLimit]] في next.config لو رافع ملفات).

وتقدر تنادي الـ action من غير فورم: [[onClick={() => deletePost(id)}]] جوه client component (مع [[startTransition]] لو عايز pending state)، أو تعدّيها prop لـ client component، وده الاستثناء الوحيد للدوال في الـ props.`,
            when: R`أي mutation من الواجهة بتاعتك: فورمات، وأزرار حذف وإعجاب، وتغيير إعدادات. ومش للي بيناديه حد من برّه (تطبيق موبايل، أو webhook): ده Route Handler.`,
            mistakes: R`تثق في [[required]] و [[maxLength]] وتنسى الفحص على السيرفر. وتاخد [[authorId]] أو [[price]] من FormData. وتنسى [[revalidatePath]] فالحفظ نجح والصفحة لسه قديمة. وتكتب [[use server]] فوق ملف فيه دوال مساعدة مش المفروض تبقى endpoints، فكلهم بقوا قابلين للنداء من برّه.`
          },
          teach: R`## الفكرة: دالة على السيرفر، والفورم بيناديها

ملفين: ملف [[actions]] فيه دالة [[createPost]] بتشتغل على السيرفر بس، وصفحة فيها [[<form action={createPost}>]]. مفيش [[fetch]] ولا [[/api/...]]: React و Next بيعملوا الطلب لوحدهم.

اتشغّل في مشروع Next.js 16.4.0 على ويندوز. [[verifySession]] نسخة صغيرة بتقرا cookie اسمها [[uid]] (ولو مش موجودة تحوّل لـ [[/login]])، و [[db]] جدول في الذاكرة بيطبع سطر مع كل حفظ. ومتصفح Chrome headless (playwright-core) بعت الفورم مرة والـ JavaScript مقفول ومرة مفتوح، وسجّل الطلبات.

---

## ١. ملف الـ actions

~~~text app/actions/posts.ts
"use server";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
~~~

- [["use server"]] **أول سطر في الملف**: كل دالة [[async]] مصدّرة من الملف ده بقت Server Action. يعني الكود بتاعها مش هيتبعت للمتصفح أبدًا، والمتصفح ياخد «رقم» يناديها بيه.
- [[revalidatePath]]: عشان صفحة الليستة تتحدث بعد الحفظ.
- [[verifySession]]: من الـ DAL بتاعك (فئة Auth): بترجّع المستخدم أو تحوّله للـ login.

## ٢. الدالة سطر سطر

~~~text app/actions/posts.ts
export async function createPost(formData: FormData) {
  const { userId } = await verifySession();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  await db.post.create({ data: { title, authorId: userId } });
  revalidatePath("/posts");
}
~~~

| السطر | ليه |
|---|---|
| [[formData: FormData]] | لما الدالة تتحط في [[action]] بتاع فورم، React بيبعتلها كل الخانات في object من نوع [[FormData]] (Web API عادي) |
| [[await verifySession()]] | الدالة دي URL عام زي أي API: لازم تعرف مين بيبعت **جواها**، مش في الصفحة |
| [[formData.get("title")]] | قيمة الخانة اللي [[name]] بتاعها [[title]]. بترجع string أو File أو null |
| [[?? ""]] | لو null خليها نص فاضي ([[??]] = لو اللي قبلي null أو undefined خد اللي بعدي) |
| [[String(...).trim()]] | حوّلها نص وشيل المسافات من الأول والآخر |
| [[if (!title) return]] | فاضي؟ اخرج ومتحفظش (الدرس الجاي بيرجّع رسالة) |
| [[authorId: userId]] | صاحب البوست من الـ session، **مش** من الفورم. أي حاجة في الفورم المستخدم يقدر يغيّرها |
| [[revalidatePath("/posts")]] | امسح كاش صفحة [[/posts]]، فلما حد يفتحها يلاقي الجديد |

---

## ٣. الصفحة

~~~text app/posts/new/page.tsx
import { createPost } from "@/app/actions/posts";
export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required maxLength={120} />
      <button type="submit">انشر</button>
    </form>
  );
}
~~~

- الصفحة server component عادية، مفيهاش [["use client"]].
- [[action={createPost}]]: الدالة نفسها، مش URL. ده المكان الوحيد اللي React بيقبل فيه دالة في [[action]].
- [[name="title"]]: ده المفتاح اللي [[formData.get("title")]] بيدوّر عليه.
- [[required]] و [[maxLength={120}]]: المتصفح بيمنع الإرسال لو فاضي أو أطول من ١٢٠. ده للراحة بس: أي حد يقدر يبعت طلب من غير المتصفح، فالفحص الحقيقي في الـ action.

---

## ٤. التجربة: من غير JavaScript

الصفحة اتبنت [[○ /posts/new]] (static). بصينا على الفورم في الـ HTML:

~~~text الناتج
[noJS] hidden inputs: [ '$ACTION_ID_40a32b723f3a2c3277dbacad087cd1e1c3a048165e' ]
~~~

Next حط جوه الفورم **hidden input** اسمه فيه ID الـ action. فالفورم ده فورم HTML حقيقي، بيشتغل من غير أي JavaScript:

~~~text الناتج
[noJS] POST http://localhost:5825/posts/new content-type: multipart/form-data next-action: (none)
[noJS] response 200 text/html; charset=utf-8
[noJS] url after: http://localhost:5825/posts/new
~~~

- الطلب [[POST]] على **نفس URL الصفحة**، مش endpoint منفصل.
- [[multipart/form-data]]: الشكل اللي المتصفح بيبعت بيه الفورمات.
- الرد [[text/html]]: صفحة كاملة، يعني الصفحة عملت reload.

ده اسمه progressive enhancement: الفورم شغال قبل ما الـ JS يتحمّل، أو لو مقفول.

## ٥. التجربة: مع JavaScript

~~~text الناتج
[JS] POST http://localhost:5825/posts/new content-type: multipart/form-data next-action: 40a32b723f3a2c3277dbacad087cd1e1c3a048165e
[JS] response 200 text/x-component
~~~

- نفس الـ POST ونفس الـ URL، بس دلوقتي فيه header اسمه [[Next-Action]] قيمته نفس الـ ID. ده اللي السيرفر بيعرف بيه أنهي دالة ينفّذ.
- الرد [[text/x-component]]: ده الـ RSC payload (React Server Components)، مش HTML. React بيستخدمه يحدّث الشاشة من غير reload.

اتأكدنا إن مفيش reload: حطينا متغير في الصفحة قبل الإرسال ([[window.__marker = 42]]) ولقيناه لسه [[42]] بعده. والخانة رجعت فاضية ([[""]]): React بيعمل reset للفورم لوحده بعد ما الـ action يخلص.

وبعدين [[/posts]]:

~~~text الناتج
/posts: بوست من غير JS (u1)بوست بـ JS (u1)
~~~

~~~text الناتج (لوج السيرفر)
post.create {"id":1,"title":"بوست من غير JS","authorId":"u1"}
post.create {"id":2,"title":"بوست بـ JS","authorId":"u1"}
~~~

الاتنين اتحفظوا، و [[authorId]] جه من الـ cookie مش من الفورم.

---

## الخلاصة

| | من غير JS | مع JS |
|---|---|---|
| الطلب | [[POST]] على URL الصفحة | [[POST]] على URL الصفحة |
| الـ ID بتاع الـ action | hidden input [[$ACTION_ID_...]] | header [[Next-Action]] |
| الرد | [[text/html]] (reload) | [[text/x-component]] (من غير reload) |
| بعد ما يخلص | صفحة جديدة | React بيفضّي الفورم |

> [["use server"]] = endpoint عام. فيه: مين المستخدم، وافحص الـ input، و [[revalidatePath]] في الآخر.`,
          lines: [
            "كل الدوال المصدّرة من الملف ده بقت Server Actions.",
            "مسح كاش الصفحة بعد التعديل.",
            "دالة بتتأكد من المستخدم (درس DAL في فئة Auth).",
            R`بتستلم [[FormData]] لما تتحط في [[action]] بتاع فورم.`,
            "مين اللي بيبعت؟ لازم تسأل في كل action.",
            R`القيمة بالـ [[name]]. [[get]] بترجع [[FormDataEntryValue | null]]، فبنحوّلها string.`,
            "فاضي؟ متعملش حاجة (الدرس الجاي بيرجّع رسالة خطأ).",
            R`احفظ، والـ [[authorId]] من الـ session مش من الفورم.`,
            "خلي صفحة الليستة تتجدد.",
            "قفلة.",
            "استورد الـ action.",
            "صفحة server component عادية، مفيهاش use client.",
            "بداية الـ JSX.",
            R`[[action]] بياخد الدالة مباشرة، مش URL.`,
            R`[[name="title"]] هو المفتاح في FormData. و [[required]] حماية في المتصفح بس.`,
            "إرسال.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`من غير JS: الفورم بيتبعت POST عادي ([[multipart/form-data]]) والصفحة بتعمل reload وترجع بالداتا الجديدة. الـ action اشتغل، لأن [[<form action={fn}>]] بيطلّع فورم HTML حقيقي جواه hidden input فيه ID الـ action.

ومع JS: مفيش reload، وفي Network طلب [[POST]] على نفس URL الصفحة (مش [[/api/...]])، وفي الـ request headers [[Next-Action]] قيمته ID طويل، والرد RSC payload فيه الصفحة بعد [[revalidatePath]]. لو مفيش [[Next-Action]]: الـ JS لسه متحمّلش أو مقفول. ولو الحفظ نجح والليستة قديمة: نسيت [[revalidatePath]].`
        },
        {
          cmd: "useActionState",
          title: "ترجّع أخطاء الفورم وتعرض «جاري الحفظ»",
          desc: R`[[useActionState(action, initialState)]] من React 19 بيلف الـ action ويدّيك ٣ حاجات: آخر نتيجة رجعت منها ([[state]])، ونسخة من الـ action تحطها في الفورم، و [[pending]] وهي شغالة. الـ action هنا بياخد الـ state اللي فاتت كأول argument و FormData تاني.

الأخطاء المتوقعة (إيميل غلط، أو باسورد قصير، أو إيميل متسجل قبل كده) متترميش: رجّعها كقيمة، والفورم يعرضها جنب الخانة. والفحص بـ Zod على السيرفر ([[safeParse]] و [[z.flattenError]]، تفاصيلهم في تاب «TypeScript»).`,
          example: R`// app/actions/signup.ts
"use server";
import * as z from "zod";
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
export type SignupState = { errors?: { email?: string[]; password?: string[] }; message?: string; email?: string };
export async function signup(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get("email") ?? "");
  const parsed = Signup.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { email, errors: z.flattenError(parsed.error).fieldErrors };
  if (await emailTaken(parsed.data.email)) return { email, errors: { email: ["الإيميل ده متسجل"] } };
  await createUser(parsed.data);
  return { message: "اتسجلت، شوف إيميلك" };
}
// app/signup/signup-form.tsx
"use client";
import { useActionState } from "react";
import { signup } from "@/app/actions/signup";
export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, {});
  return (
    <form action={formAction}>
      <input name="email" type="email" defaultValue={state.email} />
      {state.errors?.email && <p className="text-red-600">{state.errors.email[0]}</p>}
      <input name="password" type="password" />
      {state.errors?.password && <p className="text-red-600">{state.errors.password[0]}</p>}
      <button disabled={pending}>{pending ? "بنسجّل..." : "سجّل"}</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`,
          try: R`ابعت الفورم فاضي، وبعدين بإيميل غلط، وبعدين صح. وبعدين شيل [[defaultValue={state.email}]] وابعت باسورد قصير: الإيميل هيتمسح. وحط [[await new Promise((r) => setTimeout(r, 2000))]] في الـ action عشان تشوف الـ pending.`,
          flag: "script",
          deep: {
            why: "الفورم الحقيقي محتاج ٣ حاجات: يعرض الأخطاء جنب كل خانة، ويقفل الزرار وهو بيبعت، ويحتفظ باللي المستخدم كتبه. من غير useActionState بتكتب state لكل واحدة وتعمل try/catch وتنسى حالة.",
            how: R`[[useActionState]] بيعمل wrapper: لما الفورم يتبعت، بينادي الـ action بالـ state الحالية و FormData، ويحط [[pending]] بـ true، ولما النتيجة ترجع يحطها في [[state]] ويعمل render. وكل ده جوه transition، فالواجهة مبتتقفلش.

ليه الأخطاء ترجع قيمة مش throw؟ لأن اللي بيترمي من الـ action بيروح لأقرب [[error.tsx]]، والمستخدم يشوف «حصلت مشكلة» بدل «الإيميل مش صحيح». الـ throw للحاجات اللي مش متوقعة بس (الداتابيز وقعت).

[[useFormStatus()]] من [[react-dom]] بيدّي [[pending]] لأي كومبوننت جوه الفورم (زرار submit منفصل)، من غير ما تعدّيه props. لازم يبقى في كومبوننت ابن للـ [[<form>]]، مش في نفس الكومبوننت اللي فيه الفورم.

والفحص على السيرفر إجباري حتى لو فيه فحص في المتصفح (react-hook-form + zod في تاب «React»)، لأن الـ action endpoint وأي حد يقدر يبعتله أي حاجة. وتقدر تستخدم نفس الـ schema في الناحيتين.

والاسم القديم [[useFormState]] من react-dom بقى deprecated، وبداله [[useActionState]] من [[react]].`,
            when: "أي فورم بيبعت لـ Server Action ومحتاج يعرض نتيجة: تسجيل، ودخول، وإضافة منتج، وتعديل بروفايل.",
            mistakes: R`ترمي [[throw new Error("إيميل غلط")]] من الـ action. وتنسى إن React بيفضّي الفورم بعد الـ action. وتحط [[useFormStatus]] في نفس الكومبوننت اللي فيه [[<form>]] فـ [[pending]] دايمًا false. وترجّع الـ [[ZodError]] كله أو الـ user كله في الـ state: كل اللي بترجّعه بيتبعت للمتصفح.`
          },
          teach: R`## الفكرة: الـ action بيرجّع رد، والفورم بيعرضه

نفس فكرة الدرس اللي فات، بس دلوقتي الـ action بيرجّع **نتيجة** (أخطاء لكل خانة، أو رسالة نجاح)، والفورم client component بيستخدم [[useActionState]] عشان يمسك النتيجة دي ويعرف إمتى الـ action شغال.

اتشغّل في مشروع Next.js 16.4.0 (React 19.3) مع Zod 4.6 على ويندوز. [[emailTaken]] و [[createUser]] نسخ صغيرة: [[taken@example.com]] بس متسجل. وزوّدنا في نسخة التجربة checkbox بيأخر الـ action ثانيتين (عشان الـ pending)، و Chrome headless (playwright-core) ملا الفورم وقرا الشاشة بعد كل إرسال.

---

## ١. الـ schema

~~~text app/actions/signup.ts
"use server";
import * as z from "zod";
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
~~~

- [[import * as z]]: هات كل اللي في المكتبة تحت اسم [[z]].
- [[z.object({...})]]: الشكل المتوقع: object فيه خانتين.
- [[z.email()]]: نص بشكل إيميل (في Zod 4 بقت على [[z]] مباشرة، مش [[z.string().email()]]). و [[{ error: "..." }]] الرسالة لو غلط.
- [[z.string().min(8)]]: نص ٨ حروف على الأقل.

## ٢. شكل النتيجة

~~~text app/actions/signup.ts
export type SignupState = { errors?: { email?: string[]; password?: string[] }; message?: string; email?: string };
~~~

ده النوع اللي الـ action هيرجّعه. كل خانة فيها [[?]] يعني اختيارية: ممكن يرجّع أخطاء بس، أو رسالة بس. و [[string[]]] array نصوص، لأن الخانة الواحدة ممكن يبقى ليها أكتر من خطأ. وتصدير [[type]] مسموح في ملف [[use server]] لأنه بيتمسح وقت الـ compile.

## ٣. الـ action

~~~text app/actions/signup.ts
export async function signup(_prev: SignupState, formData: FormData): Promise<SignupState> {
~~~

**أول argument** هو الـ state اللي فاتت، و FormData **تاني**. ده الشكل اللي [[useActionState]] بيناديه بيه. و [[_]] في أول [[_prev]] اتفاق معناه «مش هستخدمه». و [[Promise<SignupState>]]: دالة async بترجّع النوع ده.

~~~text app/actions/signup.ts
  const email = String(formData.get("email") ?? "");
  const parsed = Signup.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { email, errors: z.flattenError(parsed.error).fieldErrors };
~~~

- [[safeParse]]: افحص من غير ما ترمي error. بيرجّع [[{ success: true, data }]] أو [[{ success: false, error }]].
- [[z.flattenError(parsed.error)]]: بيحوّل الخطأ لشكل بسيط. جربناه على خانتين فاضيين في Node:

~~~text الناتج
{"formErrors":[],"fieldErrors":{"email":["إيميل مش صحيح"],"password":["٨ حروف على الأقل"]}}
~~~

[[.fieldErrors]] بالظبط شكل [[errors]] في [[SignupState]]. ورجّعنا [[email]] كمان عشان الخانة متتمسحش (تحت).

> لو حد بعت الطلب من غير خانة password خالص، [[formData.get]] بترجع [[null]] والرسالة بتبقى رسالة Zod الإنجليزي: [[Invalid input: expected string, received null]]. من المتصفح الخانة الفاضية بتتبعت [[""]] فبتطلع رسالتك.

~~~text app/actions/signup.ts
  if (await emailTaken(parsed.data.email)) return { email, errors: { email: ["الإيميل ده متسجل"] } };
  await createUser(parsed.data);
  return { message: "اتسجلت، شوف إيميلك" };
}
~~~

- خطأ من الداتابيز بنفس الشكل، فالفورم بيعرضه في نفس المكان.
- [[parsed.data]]: الداتا بعد الفحص، ونوعها معروف ([[{ email: string; password: string }]]).
- النجاح: رسالة بس، ومن غير [[email]]، فالخانة تفضى.

> الأخطاء المتوقعة **بتترجع** مش بتترمي. أي [[throw]] من الـ action بيروح لأقرب [[error.tsx]]، والمستخدم يشوف صفحة خطأ بدل «الإيميل مش صحيح».

---

## ٤. الفورم

~~~text app/signup/signup-form.tsx
"use client";
import { useActionState } from "react";
import { signup } from "@/app/actions/signup";
export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, {});
~~~

- [["use client"]]: الـ hooks بتشتغل في client components بس.
- [[useActionState]] من [[react]] (مش من Next). بياخد الـ action والحالة الأولى ([[{}]] = مفيش أخطاء ولا رسالة)، وبيرجّع ٣ حاجات:

| اللي راجع | معناه |
|---|---|
| [[state]] | آخر حاجة الـ action رجّعها (في الأول [[{}]]) |
| [[formAction]] | نسخة من الـ action تحطها في الفورم |
| [[pending]] | [[true]] وهو شغال |

~~~text app/signup/signup-form.tsx
    <form action={formAction}>
      <input name="email" type="email" defaultValue={state.email} />
      {state.errors?.email && <p className="text-red-600">{state.errors.email[0]}</p>}
~~~

- [[action={formAction}]] **مش** [[signup]]: لو حطيت [[signup]] مباشرة، [[state]] و [[pending]] مش هيتحدثوا.
- [[defaultValue={state.email}]]: القيمة الأولى للخانة. React بيفضّي الفورم بعد كل action، فمن غيرها الإيميل يتمسح مع كل غلط.
- [[state.errors?.email && <p>...</p>]]: لو فيه خطأ للإيميل اعرض أول واحد ([[[0]]]). و [[&&]] في JSX: لو الشمال false مفيش حاجة تترسم.

~~~text app/signup/signup-form.tsx
      <button disabled={pending}>{pending ? "بنسجّل..." : "سجّل"}</button>
      {state.message && <p>{state.message}</p>}
~~~

وهو شغال: الزرار مقفول ومكتوب عليه «بنسجّل...»، فمفيش ضغطتين ورا بعض.

---

## ٥. التجربة

~~~text الناتج (Chrome headless)
empty                     | email error: إيميل مش صحيح   | pass error: ٨ حروف على الأقل | email box: ""
sara@example + 8 chars    | email error: إيميل مش صحيح   | pass error: -               | email box: "sara@example"
taken email               | email error: الإيميل ده متسجل | pass error: -               | email box: "taken@example.com"
short password            | email error: -               | pass error: ٨ حروف على الأقل | email box: "sara@example.com"
valid                     | msg: اتسجلت، شوف إيميلك                                     | email box: ""
~~~

- **فاضي**: الخطأين من Zod.
- **[[sara@example]]**: المتصفح بيقبله (فيه [[@]])، بس [[z.email()]] عايز دومين كامل.
- **متسجل**: عدّى Zod، ووقف عند [[emailTaken]].
- **باسورد قصير**: الإيميل **فضل في الخانة**: ده [[defaultValue={state.email}]].
- **صح**: الرسالة، والخانة فضيت لأن النجاح مبيرجّعش [[email]].

### الـ input نوعه [[email]]

جربنا نكتب [[sara]] من غير [[@]]: المتصفح بيرفض قبل ما الطلب يتبعت أصلًا:

~~~text الناتج
browser validity for 'sara': false Please include an '@' in the email address. 'sara' is missing an '@'.
~~~

### من غير [[defaultValue]]

~~~text الناتج
short pw, no defaultValue | pass error: ٨ حروف على الأقل | email box: ""
~~~

الإيميل اتمسح مع الغلط.

### الـ pending

~~~text الناتج
during slow action: button text: بنسجّل... disabled: true
after: button text: سجّل disabled: false
~~~

---

## الخلاصة

| الحاجة | فين |
|---|---|
| الفحص | السيرفر، بـ [[safeParse]] |
| الأخطاء المتوقعة | [[return]] بشكل [[{ errors }]]، مش [[throw]] |
| الـ action ياخد | [[(prevState, formData)]] |
| الفورم يستخدم | [[formAction]] من [[useActionState]] |
| اللي المستخدم كتبه | يرجع في الـ state ويتحط في [[defaultValue]] |
| منع الضغط مرتين | [[disabled={pending}]] |

> كل اللي الـ action بيرجّعه بيتبعت للمتصفح: رجّع رسايل بس، مش الـ user ولا الـ error كله.`,
          lines: [
            "ملف actions.",
            "Zod 4.",
            "الـ schema.",
            "إيميل برسالة بالعربي.",
            "باسورد ٨ حروف على الأقل.",
            "قفلة.",
            R`شكل النتيجة اللي بترجع للفورم. تصدير [[type]] مسموح في ملف [[use server]] لأنه بيتمسح.`,
            R`مع [[useActionState]] الـ action بياخد الـ state اللي فاتت الأول، و FormData تاني.`,
            "الإيميل اللي اتكتب، عشان نرجّعه للخانة لو فيه غلط.",
            R`افحص. [[safeParse]] مبيرميش.`,
            "فيه غلط؟ رجّع الأخطاء لكل خانة، ورجّع الإيميل عشان ميتمسحش.",
            "خطأ من الداتابيز بنفس الشكل.",
            "كل حاجة تمام.",
            "رسالة نجاح.",
            "قفلة.",
            "الـ hook ده في client component.",
            R`من [[react]] مش من Next.`,
            "الـ action.",
            "الفورم.",
            R`[[state]] آخر نتيجة، و [[formAction]] تحطها في الفورم، و [[pending]] وهي شغالة. و [[{}]] الحالة الأولى.`,
            "بداية الـ JSX.",
            R`[[formAction]] مش [[signup]] مباشرة.`,
            R`[[defaultValue]] من الـ state: React بيفضّي الفورم بعد كل action، فمن غير ده الإيميل يتمسح مع كل غلط.`,
            "أول خطأ للإيميل.",
            "الباسورد (مبنرجّعهوش أبدًا).",
            "أول خطأ للباسورد.",
            "الزرار مقفول وبيقول «بنسجّل» وهي شغالة، فمفيش ضغطتين.",
            "رسالة النجاح.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`فاضي: رسالتين تحت الخانتين، «إيميل مش صحيح» و «٨ حروف على الأقل». وخد بالك: الـ input نوعه [[email]]، فالمتصفح نفسه بيمنع الإرسال لـ [[sara]] أو [[sara@]] قبل ما يوصل للسيرفر. عشان تشوف رسالة Zod جرّب [[sara@example]]: المتصفح بيقبله و [[z.email()]] بيرفضه. والإيميل الصح مع باسورد ٨ حروف: «اتسجلت، شوف إيميلك» والخانات فضيت.

من غير [[defaultValue={state.email}]]: مع أي غلط الإيميل بيتمسح، لأن React بيعمل reset للفورم بعد كل action. ومع الـ delay: الزرار مقفول ومكتوب «بنسجّل...» ثانيتين. لو الـ pending مش ظاهر: انت حاطط [[signup]] مباشرة في [[action]] بدل [[formAction]].`
        },
        {
          cmd: "redirect و useOptimistic",
          title: "بعد الحفظ: تحوّل لصفحة، أو تعرض النتيجة قبل ما السيرفر يرد",
          desc: R`بعد ما الـ action يخلص، يا إما تحوّل المستخدم ([[redirect("/posts/" + id)]] من [[next/navigation]])، يا إما تسيبه في مكانه والصفحة تتحدث بـ [[revalidatePath]] أو [[updateTag]]. و [[redirect]] بيرمي error خاص عشان يوقف التنفيذ، فمتحطهاش جوه [[try]]، ونادي الـ revalidate قبلها.

وللحاجات السريعة (like، أو checkbox في todo)، [[useOptimistic]] بيغيّر الشاشة فورًا كأن السيرفر رد، ولما الـ action يخلص الشاشة بترجع تعرض الداتا الحقيقية لوحدها.`,
          example: R`// app/actions/todos.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createTodo(formData: FormData) {
  const { userId } = await verifySession();
  let todo;
  try {
    todo = await db.todo.create({ data: { title: String(formData.get("title")), userId } });
  } catch {
    return;
  }
  revalidatePath("/todos");
  redirect($__bt/todos/$__{todo.id}$__bt);
}
export async function toggleTodo(id: string, done: boolean) {
  const { userId } = await verifySession();
  await db.todo.update({ where: { id, userId }, data: { done } });
  revalidatePath("/todos");
}
// app/todos/todo-list.tsx
"use client";
import { useOptimistic, startTransition } from "react";
export function TodoList({ todos }: { todos: Todo[] }) {
  const [shown, setOptimistic] = useOptimistic(todos, (state, id: string) =>
    state.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  );
  function toggle(t: Todo) {
    startTransition(async () => {
      setOptimistic(t.id);
      await toggleTodo(t.id, !t.done);
    });
  }
  return <ul>{shown.map((t) => <li key={t.id}><input type="checkbox" checked={t.done} onChange={() => toggle(t)} /> {t.title}</li>)}</ul>;
}`,
          try: R`حط [[await new Promise((r) => setTimeout(r, 1500))]] في [[toggleTodo]]: الـ checkbox بيتقلب فورًا. وبعدين امسح سطر الـ update من [[toggleTodo]] (يعني السيرفر مش هيغيّر حاجة) واضغط: هيتقلب، وبعد ثانية ونص يرجع زي ما كان لوحده. وجرّب [[redirect]] جوه الـ try وشوف إن التحويل مبيحصلش.`,
          flag: "script",
          deep: {
            why: "بعد «انشر» المستخدم مستني يروح لصفحة الحاجة الجديدة، مش يفضل على فورم فاضي. والـ like اللي بياخد نص ثانية عشان يبان بيخلي التطبيق يحس إنه تقيل، مع إن ٩٩٪ من المرات السيرفر هيقول أيوة.",
            how: R`[[redirect()]] بترمي error اسمه [[NEXT_REDIRECT]]. Next بيمسكه ويرد بتحويل: في Server Action بيقول للمتصفح يروح للصفحة الجديدة، ومعاه الـ RSC payload بتاعها في نفس الرد. لو الـ throw ده وقع في [[catch]] بتاعك، التحويل مات. عشان كده الترتيب: الشغل جوه try، والـ revalidate والـ redirect بعده. و [[permanentRedirect]] زيها بس 308.

[[useOptimistic(state, updateFn)]] بيرجّع نسخة من الـ state. وانت جوه transition، [[setOptimistic(x)]] بيطبّق [[updateFn]] على النسخة دي فورًا. أول ما الـ transition يخلص (الـ action رجع والـ props الجديدة وصلت من الـ revalidate)، React بيرمي النسخة المتفائلة ويعرض الـ props الحقيقية. فلو السيرفر محصلش عنده تغيير، الشاشة بترجع لوحدها من غير ما تكتب rollback.

ولو الـ action رمى error، الخطأ بيروح لأقرب error boundary. فالأحسن الـ action يرجّع [[{ ok: false }]] وانت تعرض toast.

الفرق عن optimistic update في React Query (تاب «React»): هنا مفيش cache تعدّله وترجّعه بإيدك. الحقيقة دايمًا الـ props اللي جاية من السيرفر.`,
            when: R`[[redirect]] بعد الإنشاء (روح للحاجة الجديدة) والدخول والخروج. [[useOptimistic]] للتفاعلات السريعة اللي غالبًا بتنجح: like، و checkbox، وترتيب، ورسالة في chat. ومش للدفع أو أي حاجة لو فشلت المستخدم لازم يعرف قبل ما يكمّل.`,
            mistakes: R`[[redirect]] جوه try/catch. و [[redirect]] قبل [[revalidatePath]] فالسطر اللي بعدها مبيتنفذش. و [[setOptimistic]] برّه [[startTransition]] أو برّه action فيطلع تحذير والقيمة ترجع على طول. وتعمل optimistic للدفع.`
          },
          teach: R`## الفكرة: حاجتين بعد الحفظ

المثال ٣ حتت: [[createTodo]] بيحفظ ويحوّل المستخدم لصفحة الحاجة الجديدة بـ [[redirect]]، و [[toggleTodo]] بيقلب done، و [[TodoList]] client component بيقلب الـ checkbox **قبل** ما السيرفر يرد بـ [[useOptimistic]].

اتشغّل في مشروع Next.js 16.4.0 (React 19.3) على ويندوز. الجدول في الذاكرة فيه todo واحدة ([[اشتري لبن]])، و [[toggleTodo]] فيها تأخير ثانية ونص (زي الـ try)، و Chrome headless (playwright-core) ضغط وقرا حالة الـ checkbox كل شوية.

---

## ١. [[createTodo]]

~~~text app/actions/todos.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createTodo(formData: FormData) {
  const { userId } = await verifySession();
  let todo;
  try {
    todo = await db.todo.create({ data: { title: String(formData.get("title")), userId } });
  } catch {
    return;
  }
  revalidatePath("/todos");
  redirect($__bt/todos/$__{todo.id}$__bt);
}
~~~

- [[redirect]] من [[next/navigation]] (مش [[next/cache]]).
- [[let todo;]] **برّه** الـ try: لو اتعرّف جواه بـ [[const]] مش هيبقى موجود بعد ما الـ try يقفل.
- [[try { ... } catch { return; }]]: لو الحفظ فشل اخرج من غير تحويل. و [[catch]] من غير [[(e)]] مسموح لو مش هتستخدم الخطأ.
- [[revalidatePath("/todos")]] **قبل** [[redirect]].
- [[redirect(...)]] برّه الـ try، والـ URL template literal فيه الـ id.

### ليه [[redirect]] برّه الـ try؟

[[redirect]] مبترجعش: بترمي error خاص اسمه [[NEXT_REDIRECT]]، و Next بيمسكه ويحوّل. ولو اترمى جوه try، الـ [[catch]] بتاعك هو اللي هيمسكه ويبلعه. وعشان كده كمان [[revalidatePath]] قبلها: أي سطر بعد [[redirect]] مش هيتنفذ.

---

## ٢. [[toggleTodo]]

~~~text app/actions/todos.ts
export async function toggleTodo(id: string, done: boolean) {
  const { userId } = await verifySession();
  await db.todo.update({ where: { id, userId }, data: { done } });
  revalidatePath("/todos");
}
~~~

- بياخد arguments عادية ([[id]] و [[done]]) مش FormData، لأنه هيتنادى من كود مش من فورم.
- [[where: { id, userId }]]: الـ todo دي **وبتاعتك**. لو حد بعت id بتاع حد تاني، مفيش صف يطابق.

---

## ٣. [[TodoList]] و [[useOptimistic]]

~~~text app/todos/todo-list.tsx
"use client";
import { useOptimistic, startTransition } from "react";
export function TodoList({ todos }: { todos: Todo[] }) {
  const [shown, setOptimistic] = useOptimistic(todos, (state, id: string) =>
    state.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  );
~~~

[[useOptimistic(القيمة الحقيقية, دالة)]] بيرجّع حاجتين:

| اللي راجع | معناه |
|---|---|
| [[shown]] | اللي هيتعرض: نفس [[todos]]، إلا وانت جوه transition وعامل تغيير متفائل |
| [[setOptimistic(id)]] | «اعرض كأن ده حصل». بينادي الدالة بالحالة الحالية والـ [[id]] |

والدالة: [[state.map(...)]] بتلف على الـ todos، واللي الـ id بتاعها هو المطلوب ترجع نسخة منها [[{ ...t, done: !t.done }]] ([[...t]] انسخ كل الخانات، و [[!t.done]] اقلب)، والباقي زي ما هو.

~~~text app/todos/todo-list.tsx
  function toggle(t: Todo) {
    startTransition(async () => {
      setOptimistic(t.id);
      await toggleTodo(t.id, !t.done);
    });
  }
~~~

1. [[startTransition(async () => {...})]]: الـ optimistic بيعيش جوه transition بس. و React 19 بيقبل دالة async هنا.
2. [[setOptimistic(t.id)]]: الشاشة تتغير **دلوقتي**.
3. [[await toggleTodo(...)]]: نادي السيرفر (Server Action، بيتبعت POST زي ما شفنا في درس use server).
4. لما الـ transition يخلص (الـ action رجع، والـ props الجديدة وصلت من [[revalidatePath]])، React بيرمي النسخة المتفائلة ويعرض [[todos]] الحقيقية.

~~~text app/todos/todo-list.tsx
  return <ul>{shown.map((t) => <li key={t.id}><input type="checkbox" checked={t.done} onChange={() => toggle(t)} /> {t.title}</li>)}</ul>;
~~~

بتعرض [[shown]] مش [[todos]].

---

## ٤. التجربة: الـ checkbox

~~~text الناتج (السيرفر بيحفظ عادي)
+0ms     before click           checked: false
+924ms   100ms after click      checked: true
+1734ms  900ms                  checked: true
+2947ms  2100ms (action done)   checked: true
~~~

الأرقام في الشمال من أول السكربت، والضغطة نفسها بتاخد مئات الملّي ثانية في playwright، فالمهم السطر التاني: بعد الضغطة بـ ١٠٠ ملّي ثانية. اتقلب على طول وهو الطلب لسه شغال (الـ action بياخد ١.٥ ثانية)، وفضل كده بعد ما رجع لأن السيرفر حفظ ([[todo.update t1 true]] في اللوج).

### لو السيرفر محفظش

شغّلنا السيرفر تاني بنسخة من [[toggleTodo]] مبتعملش update (زي الـ try):

~~~text الناتج
+0ms     before click           checked: false
click returned after 594 ms
+702ms   100ms after click      checked: true
+1511ms  900ms                  checked: true
+2728ms  2100ms (action done)   checked: false
~~~

اتقلب، وبعد ما الـ action خلص **رجع لوحده** [[false]]. مكتبناش أي rollback: الـ props الحقيقية لسه false، و React رجع ليها.

---

## ٥. التجربة: [[redirect]]

~~~text الناتج
createTodo -> url: /todos/25977ab0 | h1: todo مهمة جديدة
~~~

اتحفظت والمتصفح راح لصفحتها.

ونسخة تانية فيها [[redirect]] **جوه** الـ try:

~~~text app/actions/todos.ts (النسخة الغلط)
  try {
    const todo = await db.todo.create({ data: { title: String(formData.get("title")), userId } });
    redirect($__bt/todos/$__{todo.id}$__bt);
  } catch {
    return;
  }
~~~

~~~text الناتج
createTodoBad -> url: /todos
~~~

~~~text الناتج (لوج السيرفر)
todo.create b4cba5b1
~~~

الـ todo اتحفظت، بس الـ URL فضل [[/todos]]: الـ [[catch]] بلع [[NEXT_REDIRECT]].

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| [[redirect]] | برّه try، وآخر سطر (اللي بعدها مبيتنفذش) |
| [[revalidatePath]] | قبل [[redirect]] |
| [[setOptimistic]] | جوه [[startTransition]] أو action |
| الرجوع لو فشل | لوحده: الحقيقة هي الـ props من السيرفر |
| متستخدمش optimistic لـ | الدفع، وأي حاجة لازم المستخدم يعرف إنها فشلت قبل ما يكمّل |`,
          lines: [
            "ملف actions.",
            R`[[revalidatePath]].`,
            R`[[redirect]] من [[next/navigation]].`,
            "إضافة todo من فورم.",
            "المستخدم.",
            R`[[todo]] برّه الـ try عشان نستخدمه بعدها.`,
            "جرّب...",
            "...تحفظ.",
            "لو فشل...",
            "...متحوّلش. (في فورم حقيقي رجّع رسالة بـ useActionState.)",
            "قفلة.",
            "حدّث الليستة قبل الـ redirect.",
            R`[[redirect]] برّه الـ try: هي بترمي error خاص، والـ catch كان هيبلعه.`,
            "قفلة.",
            "action بيتنادى من زرار مش من فورم، فبياخد arguments عادية.",
            "المستخدم.",
            R`[[userId]] في الـ where: متعدّلش todo مش بتاعك حتى لو الـ id صح.`,
            "حدّث الصفحة.",
            "قفلة.",
            "client component.",
            R`[[useOptimistic]] و [[startTransition]] من React 19.`,
            "الـ todos الحقيقية جاية props من server component.",
            R`[[shown]] نسخة للعرض. الدالة بتحسب الشكل المتفائل من الحالة الحالية والـ id.`,
            "اقلب done للعنصر ده بس.",
            "قفلة.",
            "لما يضغط...",
            R`...ابدأ transition. [[setOptimistic]] لازم جواه.`,
            "الشاشة تتغير فورًا.",
            R`نادي السيرفر. لما يخلص والـ props الجديدة توصل، [[shown]] بيرجع يساوي الحقيقة.`,
            "قفلة الـ transition.",
            "قفلة.",
            "اعرض النسخة المتفائلة.",
            "قفلة."
          ],
          sol: R`مع الـ delay: الـ checkbox بيتقلب لحظة الضغط، والطلب لسه شغال ثانية ونص في Network، ولما يرجع الحالة بتفضل زي ما هي لأن السيرفر رجّع نفس القيمة.

من غير سطر الـ update: الـ checkbox بيتقلب، وبعد ثانية ونص بيرجع لوحده للحالة الأصلية من غير ما تكتب أي rollback. الـ transition خلص، و React رمى النسخة المتفائلة ورجع للـ props الحقيقية اللي لسه زي ما هي.

و [[redirect]] جوه [[try]] مع [[catch { return; }]]: الـ todo بيتحفظ بس مفيش تحويل، لأن [[redirect]] بترمي [[NEXT_REDIRECT]] والـ catch بلعه. لو التحويل حصل رغم كده: الـ catch بتاعك بيرمي الخطأ تاني.`
        },
        {
          cmd: "action = endpoint عام",
          title: "Server Action زي أي API: أي حد يقدر يناديه",
          desc: R`كل Server Action بيبقى endpoint على السيرفر، وأي حد عنده الـ ID يقدر يبعتله أي arguments، حتى لو الزرار مخفي عنده في الواجهة. عشان كده جوه كل action: اتأكد مين المستخدم (authentication)، ومسموحله بالحاجة دي بالذات ولا لأ (authorization)، وافحص كل input.

والحاجات اللي ليها علاقة بالأمان (السعر، و [[userId]]، والدور) متاخدهاش من الـ arguments أبدًا: السعر من الداتابيز، والمستخدم من الـ session.`,
          example: R`// app/actions/orders.ts
"use server";
import * as z from "zod";
import { verifySession } from "@/lib/dal";
const Input = z.object({ orderId: z.uuid() });
export async function cancelOrder(input: unknown) {
  const { orderId } = Input.parse(input);
  const { userId } = await verifySession();
  const result = await db.order.updateMany({
    where: { id: orderId, userId, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
  if (result.count === 0) return { ok: false as const, error: "الطلب مش موجود أو مينفعش يتلغي" };
  revalidatePath("/orders");
  return { ok: true as const };
}`,
          try: R`افتح Network في DevTools وانت بتلغي طلب، وخد الطلب (Copy as cURL). غيّر الـ orderId في الـ body لطلب مستخدم تاني وابعته من الترمنال: لازم يرجع ok: false. وبعدين امسح [[userId]] من الـ where وجرّب تاني: هتلغي طلب غيرك.`,
          flag: "script",
          deep: {
            why: "الـ Server Action بيتكتب كأنه دالة عادية جوه الكومبوننت، فسهل تنسى إنه endpoint على الإنترنت. «الزرار مش ظاهر غير للأدمن» مش حماية، والأنواع بتاعة TypeScript مش حماية. وأي action من غير فحص صلاحيات هو ثغرة IDOR جاهزة.",
            how: R`Next بيعمل حاجات بتحميك جزئيًا: الـ IDs بتاعة الـ actions مش متوقعة، والـ actions اللي مش مستخدمة في أي مكان بتتشال من الـ build، والـ POST لازم ييجي من نفس الـ origin (بيقارن [[Origin]] بـ [[Host]]، ولو ورا proxy بدومين تاني فيه [[experimental.serverActions.allowedOrigins]])، وده بيقفل CSRF. والـ closures (متغيرات من الكومبوننت بتستخدمها action معرّفة جواه) بتتشفر قبل ما تتبعت للمتصفح.

بس ده كله مش authorization. الـ ID بيظهر في الـ JS اللي أي حد بينزّله، وبعد كده يقدر يبعت أي arguments. فالقاعدة زي أي API: الـ action بيعامل الـ input كأنه جاي من عدو.

والرد كمان: اللي بترجّعه بيتبعت للمتصفح كله. مترجّعش الـ user object بالـ hash، ولا error الداتابيز بتفاصيله.

وافتكر إن [[use server]] على ملف معناها إن كل الدوال المصدّرة منه endpoints. الدوال المساعدة (queries و helpers) مكانها ملف تاني عليه [[server-only]].`,
            when: R`كل Server Action من غير استثناء. واعمل helpers زي [[verifySession()]] و [[requireAdmin()]] في الـ DAL عشان السطر يبقى قصير ومحدش يكسل يكتبه.`,
            mistakes: R`action بياخد [[{ orderId, userId }]] ويثق في الـ userId. و action بياخد [[price]] من الواجهة ويعمل order بيه. وفحص الصلاحية في الصفحة اللي فيها الزرار بس، والـ action نفسه مفتوح. وترجّع [[error.message]] بتاع Prisma للمستخدم. وفي ديسمبر ٢٠٢٥ ثغرة React2Shell (CVE-2025-55182) في بروتوكول الـ Server Components نفسه سمحت بتنفيذ كود على السيرفر من غير login، فالتحديث الأمني لـ Next و React جزء من الأمان هنا كمان (درس الترقية في المستوى التالت).`
          },
          teach: R`## الفكرة: نادينا الـ action من الترمنال

[[cancelOrder]] بيلغي طلب (order). المثال مكتوب على افتراض إن **أي حد** هيبعتله أي حاجة: بيفحص شكل الـ input، وبعدين مين المستخدم، وبعدين بيحط شرط الملكية جوه الـ query نفسه. وعشان نثبت إن ده لازم، نسخنا الطلب اللي المتصفح بعته وبعتناه تاني من [[curl]] بـ id طلب مستخدم تاني.

اتشغّل في مشروع Next.js 16.4.0 مع Zod 4.6 على ويندوز. جدول الطلبات في الذاكرة فيه طلبين [[PENDING]]: [[1111...]] بتاع [[u1]]، و [[2222...]] بتاع [[u2]]. و [[verifySession]] بتقرا المستخدم من cookie اسمها [[uid]]. وزرار «cancel» في صفحة [[/orders]] بينادي [[cancelOrder({ orderId })]] من client component.

---

## ١. الـ imports والـ schema

~~~text app/actions/orders.ts
"use server";
import * as z from "zod";
import { verifySession } from "@/lib/dal";
const Input = z.object({ orderId: z.uuid() });
~~~

[[z.uuid()]]: نص بشكل UUID (زي [[11111111-1111-4111-8111-111111111111]]: ٣٢ حرف hex في ٥ مجموعات). أي حاجة تانية مرفوضة قبل ما نلمس الداتابيز.

## ٢. الـ action

~~~text app/actions/orders.ts
export async function cancelOrder(input: unknown) {
  const { orderId } = Input.parse(input);
  const { userId } = await verifySession();
~~~

- [[input: unknown]] مش [[{ orderId: string }]]: TypeScript بيفحص وقت الكتابة بس. الطلب جاي من الشبكة، والنوع ملوش أي تأثير عليه. [[unknown]] بيجبرك تفحص قبل ما تستخدم.
- [[Input.parse(input)]]: [[parse]] (مش [[safeParse]]) بيرمي لو الشكل غلط. ده مقبول هنا: واجهتنا عمرها ما هتبعت شكل غلط، فلو حصل يبقى حد بيلعب، و 500 كفاية.
- [[verifySession()]]: المستخدم من الـ cookie. مش من الـ input أبدًا.

~~~text app/actions/orders.ts
  const result = await db.order.updateMany({
    where: { id: orderId, userId, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
~~~

- [[updateMany]] مش [[update]]: في Prisma [[update]] بيقبل where على حاجة unique بس (الـ id)، و [[updateMany]] بيقبل أي شروط، وبيرجّع **عدد** الصفوف اللي اتغيرت ([[{ count }]]).
- الشروط التلاتة مع بعض: الطلب ده، **وبتاعك**، **ولسه** pending. كلهم في query واحد، فمفيش لحظة بين «اتأكدت» و «عدّلت» حد يغيّر فيها حاجة.

~~~text app/actions/orders.ts
  if (result.count === 0) return { ok: false as const, error: "الطلب مش موجود أو مينفعش يتلغي" };
  revalidatePath("/orders");
  return { ok: true as const };
}
~~~

- [[count === 0]]: يا الطلب مش موجود، يا مش بتاعك، يا اتشحن. **رسالة واحدة** للتلاتة، عشان اللي بيجرّب ids ميعرفش إن الطلب ده موجود عند حد تاني.
- [[as const]]: بيخلي نوع [[ok]] هو [[false]] بالظبط مش [[boolean]]، فالكود اللي بينادي يقدر يفرّق بين النجاح والفشل بـ [[if (res.ok)]].

---

## ٣. الطلب اللي المتصفح بعته

دوسنا cancel على طلب [[u1]] من Chrome headless وسجّلنا الطلب:

~~~text الناتج
button: cancel {"ok":true}
"url": "http://localhost:5825/orders",
"next-action": "401a0c57b869e449ecd00fc83ab0b007554ab8b6e3",
"accept": "text/x-component",
"content-type": "text/plain;charset=UTF-8"
"body": "[{\"orderId\":\"11111111-1111-4111-8111-111111111111\"}]"
~~~

- POST على URL الصفحة، والـ ID في [[Next-Action]] (درس use server).
- الـ body **array** فيه الـ arguments بالترتيب: [[[{ "orderId": "..." }]]].

الـ ID ده موجود في ملفات الـ JS اللي أي زائر بينزّلها، فهو مش سر.

## ٤. نبعته من الترمنال بطلب حد تاني

~~~bash
curl -s -i -X POST http://localhost:5825/orders \
  -H "Next-Action: 401a0c57b869e449ecd00fc83ab0b007554ab8b6e3" \
  -H "Accept: text/x-component" \
  -H "Content-Type: text/plain;charset=UTF-8" \
  -H "Origin: http://localhost:5825" \
  -b "uid=u1" \
  --data '[{"orderId":"22222222-2222-4222-8222-222222222222"}]'
~~~

- [[-H]] header، و [[-b "uid=u1"]] cookie (انت داخل كـ u1)، و [[--data]] الـ body. و [[\]] في آخر السطر معناه «الأمر مكمّل في السطر اللي جاي».
- [[Origin]]: زي ما المتصفح بيبعته. Next بيقارنه بالـ Host.

> على ويندوز: اكتبه سطر واحد بـ [[curl.exe]] (من غير [[\]]). في PowerShell 7 الـ JSON بين [[' ']] زي ما هو اشتغل، وفي Windows PowerShell 5.1 علامات التنصيص اللي جوه الـ JSON بتضيع، فلازم تتكتب [[\"]]: [[--data '[{\"orderId\":\"2222...\"}]']]. جربنا الاتنين ورجعوا نفس سطر [[ok:false]].

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/x-component

0:{"a":"$@1","q":"","i":false,"b":"CZ5QngpAQKQD8_HqeQNiI"}
1:{"ok":false,"error":"الطلب مش موجود أو مينفعش يتلغي"}
~~~

~~~text الناتج (لوج السيرفر)
order.updateMany {"id":"22222222-2222-4222-8222-222222222222","userId":"u1","status":"PENDING"} count 0
~~~

الـ action **اتنفذ** (مفيش حاجة منعت الطلب)، بس الـ query مالقاش طلب [[2222]] بتاع [[u1]]، فـ [[count 0]] و [[ok:false]]. والرد مش JSON نضيف: ده RSC payload، والقيمة اللي الدالة رجعتها في السطر [[1:]].

### لو شلنا [[userId]] من الـ where

شغّلنا نسخة من غير شرط الملكية، ونفس الـ curl بالظبط:

~~~text الناتج
1:{"ok":true}
~~~

~~~text الناتج (لوج السيرفر)
order.updateMany {"id":"22222222-2222-4222-8222-222222222222","status":"PENDING"} count 1
~~~

[[u1]] لغى طلب [[u2]]. ده IDOR (Insecure Direct Object Reference): المستخدم داخل فعلًا (authentication سليم)، بس محدش سأل «مسموحلك بالطلب **ده**؟» (authorization).

---

## ٥. اللي Next بيحميه لوحده

نفس الطلب بحاجتين مختلفين:

~~~text الناتج (orderId = "abc")
HTTP/1.1 500 Internal Server Error
1:E{"digest":"2490580099"}
~~~

~~~text الناتج (لوج السيرفر)
Error [ZodError]: ... "format": "uuid" ... "message": "Invalid UUID"
~~~

[[Input.parse]] رمى، والمستخدم شاف 500 من غير تفاصيل (الـ [[digest]] رقم تدوّر بيه في اللوج)، والتفاصيل في لوج السيرفر بس.

~~~text الناتج (Origin: https://evil.example)
HTTP/1.1 500 Internal Server Error
~~~

~~~text الناتج (لوج السيرفر)
x-forwarded-host header with value localhost:5825 does not match origin header with value evil.example from a forwarded Server Actions request. Aborting the action.
Error: Invalid Server Actions request.
~~~

الطلب من موقع تاني اترفض قبل ما الـ action يشتغل: دي حماية CSRF. بس لاحظ: الـ curl بتاعنا حط Origin صح بسهولة. الحماية دي بتمنع موقع تاني يستخدم **متصفحك**، مش بتمنع حد يبعت طلب بنفسه.

---

## الخلاصة

| الحماية | مين بيعملها | بتمنع إيه |
|---|---|---|
| مقارنة [[Origin]] بالـ Host | Next لوحده | موقع تاني يبعت باسمك (CSRF) |
| [[Input.parse]] | انت | input بشكل غلط |
| [[verifySession()]] | انت | حد مش داخل (authentication) |
| [[userId]] في الـ where | انت | حد داخل يلمس حاجة مش بتاعته (authorization) |

> الـ action بيتعامل مع الـ input كأنه جاي من عدو، والسعر والمستخدم والدور من السيرفر، مش من الـ arguments.`,
          lines: [
            "كل export هنا endpoint.",
            "Zod.",
            "الـ session.",
            R`الـ input المتوقع: id بشكل uuid بس.`,
            R`النوع [[unknown]] مش [[{ orderId: string }]]: TS مبيحميش حاجة جاية من الشبكة، فبنفحص.`,
            R`[[parse]] بيرمي لو الشكل غلط. ده مش متوقع من واجهتنا، فمقبول يروح لـ error.tsx.`,
            R`مين؟ لو مفيش session، [[verifySession]] بتحوّل للـ login.`,
            R`[[updateMany]] عشان نقدر نحط شروط زيادة في الـ where.`,
            "الملكية والحالة في نفس الـ query: الطلب بتاعه، ولسه pending. مفيش فحص منفصل ممكن يتسابق مع تعديل تاني.",
            "التغيير.",
            "قفلة.",
            "صفر صفوف؟ يا مش بتاعه يا اتشحن. رسالة واحدة للحالتين عشان ميعرفش الطلب موجود ولا لأ.",
            "حدّث الصفحة.",
            "نجاح.",
            "قفلة."
          ],
          sol: R`الطلب المنسوخ هيبقى [[POST]] على URL الصفحة، وفيه header [[Next-Action]] (الـ ID) و [[Cookie]] بتاعتك و [[Origin]] بتاع الموقع (فحماية الـ Origin بتعدّيه عادي)، والـ body فيه الـ arguments. لما تغيّر الـ orderId لطلب مستخدم تاني وتبعته: الـ action بيتنفذ، بس [[updateMany]] مش بيلاقي صف فيه الـ id ده ومعاه [[userId]] بتاعك، فـ [[count]] بـ 0، والرد (RSC payload مش JSON نضيف) جواه [[ok:false]] ورسالة «الطلب مش موجود أو مينفعش يتلغي».

بعد ما تشيل [[userId]] من الـ where: نفس الطلب بيلغي طلب المستخدم التاني ويرجّع [[ok:true]]. دي IDOR: الـ authentication سليم (انت داخل فعلًا)، والـ authorization هي اللي اختفت. والدرس: شرط الملكية جوه الـ query نفسه، مش في إن الزرار مش ظاهر.`
        }
      ]
    }
]);
