// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
    {
      t: "Server و Client Components",
      l: 1,
      n: "الافتراضي بيشتغل على السيرفر بس، و use client للحتت التفاعلية، وقواعد التوصيل بينهم",
      items: [
        {
          cmd: "Server Components",
          title: "كومبوننت بيشتغل على السيرفر بس: يقدر يعمل إيه وميقدرش إيه",
          desc: R`أي كومبوننت في [[app]] هو Server Component إلا لو قلت غير كده. بيشتغل على السيرفر بس (وقت الـ build أو مع الطلب)، فيقدر يبقى [[async]] ويكلّم الداتابيز ويقرا ملفات ويستخدم أسرار، والكود بتاعه والمكتبات اللي بيستخدمها مبيوصلوش للمتصفح خالص.

التمن: مفيش تفاعل. مفيش [[useState]] ولا [[useEffect]] ولا [[onClick]] ولا [[window]] ولا [[localStorage]]. الحتة اللي محتاجة ده بتبقى client component صغير جوه الـ server component.`,
          example: R`// app/products/page.tsx (Server Component: من غير أي directive)
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "./add-to-cart";
export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { published: true },
    select: { id: true, name: true, priceCents: true },
  });
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name}: {formatPrice(p.priceCents)}
          <AddToCart productId={p.id} />
        </li>
      ))}
    </ul>
  );
}`,
          try: R`حط [[console.log("render ProductsPage")]] في أول الكومبوننت وافتح الصفحة: هتلاقي الرسالة في ترمنال [[npm run dev]]. وهتلاقيها برضه في console المتصفح بس جنبها علامة «Server»: دي React بتعيد عرضها هناك في dev بس عشان الـ debugging، والكود نفسه اتنفذ على السيرفر. اعمل [[npm run build]]: هتلاقي الرسالة اتطبعت في ترمنال الـ build (الصفحة static فبتترسم وقت الـ build)، وبعد [[npm start]] افتح الصفحة: مش هتظهر في console المتصفح خالص. وبعدين جرّب تضيف [[useState]] جواه واقرا الخطأ اللي Next بيطلّعه.`,
          flag: "script",
          deep: {
            why: R`في SPA عادي، عشان تعرض ليستة منتجات: المتصفح بينزّل JS الصفحة كلها، وبعدين يبعت طلب لـ API، والـ API يكلّم الداتابيز، وبعدين يرسم. يعني loading spinner، و API لازم تكتبه وتحميه، و bundle فيه مكتبات التنسيق. الـ Server Component بيشيل الخطوات دي: الداتا بتتجاب جنب الداتابيز، والنتيجة HTML جاهز.`,
            how: R`React بيرسم الـ server components على السيرفر ويطلّع حاجة اسمها RSC payload: وصف للشجرة فيه ناتج الـ server components (عناصر جاهزة)، وأماكن الـ client components ومعاها الـ props بتاعتها ومسار ملف الـ JS بتاعها. Next بيستخدم الـ payload ده عشان يطلّع HTML لأول تحميل، وبيبعته نفسه في التنقل بين الصفحات.

المتصفح بيحمّل JS الـ client components بس، ويعملها hydration. أما الـ server components فمالهاش أي JS، فمكتبة markdown بحجم ١٠٠ كيلو بتستخدمها في server component بتكلّف صفر على المتصفح.

الـ server component ممكن يترسم وقت الـ build (static) أو مع كل طلب (dynamic) حسب اللي بيستخدمه، ودي تفاصيل المستوى التاني.

وفيه خلط شائع: «server component» مش معناها SSR. الـ client components كمان بتترسم HTML على السيرفر في أول تحميل. الفرق إن الـ server component بيشتغل على السيرفر بس ومبيتبعتش (سؤال في الانترفيو في آخر التاب).`,
            when: "الافتراضي لكل حاجة: الصفحات، و layouts، والحتت اللي بتعرض داتا. انقل لـ client بس الجزء اللي محتاج تفاعل أو APIs المتصفح.",
            mistakes: R`تحط [[use client]] فوق الصفحة كلها عشان زرار واحد، فكل الكود والمكتبات تروح للمتصفح. وتفتكر إن [[console.log]] في server component اتنفذ في المتصفح عشان شفته في الـ console: في dev بيتعاد عرضه هناك بعلامة «Server» بس، وهو اتنفذ على السيرفر، وفي الإنتاج بيظهر في لوجات السيرفر بس. وترجّع object فيه [[passwordHash]] من الداتابيز وتعدّيه لـ client component: الـ props بتتكتب في الصفحة وأي حد يقدر يقراها في View Source. استخدم [[select]].`
          },
          teach: R`## الفكرة: الكومبوننت ده بيتنفذ على السيرفر، واللي بيوصل للمتصفح ناتجه بس

المثال صفحة منتجات: بتكلّم الداتابيز مباشرة، وبتنسّق السعر، وجوه كل منتج زرار تفاعلي صغير. الملف مفيهوش أي directive، فهو Server Component. شغّلناه على Next 16.4، مع [[db]] تجريبي (array في الذاكرة بنفس شكل Prisma، فيه منتج مش منشور وعمود [[passwordHash]])، و [[formatPrice]] بـ [[Intl.NumberFormat]]، و [[AddToCart]] من الدرس الجاي.

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[import { db } from "@/lib/db";]] | الداتابيز مباشرة. مفيش API في النص، لأن الكود ده على السيرفر أصلًا |
| [[import { formatPrice } from "@/lib/format";]] | دالة تنسيق. هي وأي مكتبة بتستخدمها بيفضلوا على السيرفر |
| [[import { AddToCart } from "./add-to-cart";]] | client component (الملف بتاعه أوله [[use client]]). [[./]] يعني «في نفس الفولدر» |

---

## ٢. [[export default async function ProductsPage()]]

[[async]]: الكومبوننت بيستنى داتا قبل ما يرجّع JSX. ده مسموح في Server Components بس.

---

## ٣. الـ query

### [[const products = await db.product.findMany({...});]]

[[findMany]] (شكل Prisma) بيرجّع كل الصفوف اللي بتطابق:

- [[where: { published: true }]]: المنشور بس. المنتج التالت عندنا [[published: false]] فمش هيرجع.
- [[select: { id: true, name: true, priceCents: true }]]: التلات أعمدة دول بس. [[passwordHash]] مش هيرجع.

[[priceCents]] السعر بالقروش (٣٥٠٠٠ = ٣٥٠ جنيه): الفلوس بتتخزن أرقام صحيحة عشان الكسور العشرية في الكمبيوتر مش دقيقة.

---

## ٤. الـ JSX

### [[{products.map((p) => (]] و [[<li key={p.id}>]]

لف على المنتجات، وكل منتج [[<li>]] ليه [[key]] فريد.

### [[{p.name}: {formatPrice(p.priceCents)}]]

الاسم والسعر. [[formatPrice]] اتنفذت على السيرفر، فاللي وصل نص جاهز.

### [[<AddToCart productId={p.id} />]]

ده الحتة الوحيدة اللي هيبقى ليها JavaScript في المتصفح.

---

## ٥. اللي طلع: HTML

[[curl localhost:5820/products]] بعد [[next build]] و [[next start]]:

~~~text الناتج
<li>كتاب Next<!-- -->: <!-- -->‏٣٥٠٫٠٠ ج.م.‏<div class="flex gap-2"><input type="number" min="1" value="1"/><button>ضيف للسلة</button></div></li>
~~~

- منتجين بس (المسودة اتشالت بالـ [[where]]).
- [[٣٥٠٫٠٠ ج.م.]]: [[Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]] نسّق [[35000 / 100]] بالأرقام العربي والعملة المصري.
- الزرار نفسه ([[AddToCart]]) اترسم HTML كمان: الـ client components برضه بتترسم على السيرفر في أول تحميل.
- دوّرنا على [[passwordHash]] في الصفحة كلها: صفر. الـ [[select]] منعه من البداية.

## ٦. اللي طلع: RSC payload

جوه نفس الصفحة فيه الـ RSC payload (وصف الشجرة اللي React بيستخدمه). ده الجزء بتاع الليستة:

~~~text الناتج
["$","ul",null,{"children":[["$","li","p1",{"children":["كتاب Next",": ","‏٣٥٠٫٠٠ ج.م.‏",["$","$L18",null,{"productId":"p1"}]]}], ...
~~~

- [[["$","li","p1",...]]]: عنصر [[li]] بـ key [[p1]]، جاهز.
- [[["$","$L18",null,{"productId":"p1"}]]]: «هنا client component رقم [[L18]]، وخد الـ props دي». يعني المتصفح بياخد مكانه والـ props بتاعته، وبيحمّل الـ JS بتاعه.
- مفيش أي أثر لـ [[ProductsPage]] ولا [[formatPrice]] ولا [[db]]: النتيجة بس.

وفي [[.next/static/chunks]] (ملفات المتصفح) لقينا الـ AddToCart:

~~~text الناتج
e.s(["AddToCart",0,function({productId:e}){let[n,s]=(0,i.useState)(1),[u,a]=(0,i.useState)(!1); ...
~~~

ودوّرنا على [[ProductsPage]] و [[formatPrice]] في نفس الفولدر: مش موجودين.

---

## ٧. الـ [[console.log]] اتطبع فين؟

حطينا [[console.log("render ProductsPage")]] في أول الكومبوننت:

| فين | اللي ظهر |
|---|---|
| [[next dev]]: الترمنال | [[render ProductsPage]] ثم [[GET /products 200]] |
| [[next dev]]: console المتصفح | نفس السطر وجنبه badge مكتوب فيه [[Server]] |
| [[next build]] | [[render ProductsPage]] وسط سطور [[Generating static pages]] |
| [[next start]]: الترمنال والمتصفح | ولا حاجة |

- في dev الكود اتنفذ على السيرفر، و React **بيعيد عرض** اللوج في المتصفح بعلامة [[Server]] عشان يسهّل عليك.
- في الـ build اتطبع لأن الصفحة اترسمت وقتها: الجدول قال [[○ /products]] (Static)، لأنها مبتقراش حاجة من الطلب.
- في [[next start]] مفيش حاجة، لأن الصفحة HTML جاهز من وقت الـ build، والكومبوننت مبيتنفذش تاني أصلًا.

---

## ٨. [[useState]] في Server Component

زودنا [[import { useState } from "react"]] و [[const [x] = useState(0);]] في الصفحة:

~~~text الناتج: next build
./src/app/products/page.tsx:1:10
Error: You're importing a module that depends on $__btuseState$__bt into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the $__bt"use client"$__bt directive.
~~~

الرسالة بتقترح [[use client]] على الملف، بس الحل الصح إنك تفصل الحتة اللي محتاجة state في كومبوننت لوحده، زي [[AddToCart]].

## الخلاصة

| Server Component يقدر | Server Component ميقدرش |
|---|---|
| [[async]] و [[await]] | [[useState]] و [[useEffect]] |
| الداتابيز والملفات والأسرار | [[onClick]] و [[onChange]] |
| مكتبات تقيلة من غير تكلفة على المتصفح | [[window]] و [[localStorage]] |

- اللي بيوصل للمتصفح: HTML + الـ RSC payload (الناتج)، و JS الـ client components بس.
- أي حاجة بتعدّيها لـ client component كـ prop بتتكتب في الصفحة، فاختار الأعمدة بـ [[select]].`,
          lines: [
            R`الداتابيز مباشرة (Prisma مثلًا، تفاصيله في تاب «SQL و Prisma»). مفيش API في النص.`,
            "دالة تنسيق. هي ومكتباتها بيشتغلوا على السيرفر ومش بيتبعتوا للمتصفح.",
            "client component صغير للزرار (الدرس الجاي).",
            R`كومبوننت [[async]]: ده مينفعش في client component.`,
            "query عادي، بيتنفذ على السيرفر وقت الطلب أو وقت الـ build.",
            "المنشور بس.",
            R`[[select]] للأعمدة اللي هتتعرض بس. أي حاجة ترجعها ممكن توصل للمتصفح لو عدّيتها لـ client component.`,
            "قفلة الـ query.",
            "بداية الـ JSX.",
            "ليستة.",
            "لف على المنتجات.",
            "عنصر لكل منتج.",
            "الاسم والسعر: HTML عادي، صفر JS في المتصفح.",
            R`هنا بس فيه JS هيروح للمتصفح: الزرار، ومعاه [[productId]] كـ prop.`,
            "قفلة العنصر.",
            "قفلة الـ map.",
            "قفلة الليستة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`في dev: السطر بيطلع في ترمنال [[npm run dev]]، وفي console المتصفح بيظهر وجنبه badge رمادي مكتوب فيه Server: دي إعادة عرض من React، مش تنفيذ في المتصفح.

في [[npm run build]] هتلاقي [[render ProductsPage]] وسط سطور [[Generating static pages]]، يعني الصفحة اترسمت وقت الـ build (وفي الجدول [[○]]). وبعد [[npm start]] الـ console فاضي، والترمنال كمان مش هيطبع حاجة مع الطلبات، لأن الصفحة static والكومبوننت مبيتنفذش تاني أصلًا.

و [[useState]]: الـ build بيقع برسالة [[You're importing a module that depends on useState into a React Server Component module. This API is only available in Client Components.]] ومعاها اقتراح إنك تعلّم الملف بـ [[use client]]. الحل الصح مش تحطها فوق الصفحة: اعمل الحتة اللي محتاجة state كومبوننت client لوحده (الدرس الجاي).`
        },
        {
          cmd: "use client",
          title: R`"use client" بتعمل إيه بالظبط، وتحطها فين؟`,
          desc: R`[[use client]] في أول الملف بتقول لـ Next: «الملف ده وكل اللي بيعمله import بيتبعتوا للمتصفح». هنا تقدر تستخدم state و effects و events و [[window]].

هي حد (boundary) مش علامة على كومبوننت واحد: اللي تحتها في شجرة الـ imports كله بيبقى client. عشان كده حطها في أصغر حتة تفاعلية (الزرار، أو الـ form)، مش فوق الصفحة. والـ client component برضه بيترسم HTML على السيرفر في أول تحميل، وبعدين المتصفح بيعمله hydration.`,
          example: R`// app/products/add-to-cart.tsx
"use client";
import { useState } from "react";
export function AddToCart({ productId }: { productId: string }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-2">
      <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
      <button onClick={() => setAdded(true)} disabled={added}>
        {added ? "اتضاف للسلة" : "ضيف للسلة"}
      </button>
    </div>
  );
}`,
          try: R`اعمل [[npm run build]] و [[npm start]] وافتح الصفحة، وفي DevTools > Sources دوّر على [[AddToCart]]: هتلاقيه في ملف JS جوه [[_next/static/chunks]]. ودوّر على [[ProductsPage]]: مش هتلاقيها. (في [[npm run dev]] هتلاقي ملف [[add-to-cart]] باسمه، وممكن تلاقي [[ProductsPage]] كمان تحت [[about://React/Server]]: دي معلومات debugging و source maps بيبعتها React و Next في dev بس.) وبعدين امسح [[use client]] واقرا الخطأ اللي Next بيطلّعه (إنك بتستخدم [[useState]] في كومبوننت مش client).`,
          flag: "script",
          deep: {
            why: "لازم يبقى فيه حد واضح بين الكود اللي بيشتغل على السيرفر والكود اللي بيتبعت للمتصفح، لأن الغلط في الاتجاهين وحش: كود سيرفر في المتصفح معناه أسرار مكشوفة ومكتبات تقيلة، و hooks على السيرفر معناها crash.",
            how: R`الـ bundler بيمشي على الـ imports من الـ server component. أول ما يقابل ملف فيه [[use client]]، بيعتبره نقطة دخول لـ bundle المتصفح، وكل ملف بيتعمله import من جواه بيدخل نفس الـ bundle، حتى لو مفيهوش directive. عشان كده مش محتاج تكتبها في كل ملف، ومش المفروض.

الـ client component بيتنفذ مرتين في أول تحميل: مرة على السيرفر عشان يطلّع HTML (SSR)، ومرة في المتصفح عشان يربط الـ events (hydration). وده سبب إن [[window]] و [[localStorage]] مينفعوش في جسم الكومبوننت: على السيرفر مش موجودين. حطهم جوه [[useEffect]] أو event handler.

الـ props اللي بتعدّي من server لـ client لازم serializable: strings وأرقام و booleans و objects و arrays و [[Date]] و [[Map]] و [[Set]] و Promises و JSX. الدوال العادية لأ، والاستثناء Server Actions (المستوى التاني).

و [[use client]] مش معناها «متترسمش على السيرفر». لو محتاج كومبوننت ميترسمش على السيرفر خالص (مكتبة خرايط بتلمس [[window]] أول ما تتعمل import)، استخدم [[next/dynamic]] بـ [[ssr: false]] (المستوى التالت).`,
            when: R`لما الكومبوننت محتاج: state، أو effects، أو event handlers، أو APIs المتصفح، أو مكتبة بتستخدم الحاجات دي (أغلب مكتبات الـ UI والـ charts والـ animation)، أو context.`,
            mistakes: R`[[use client]] فوق [[page.tsx]] أو [[layout.tsx]] فكل الموقع يبقى client. وتكتبها في كل ملف «احتياطي». و [[localStorage.getItem]] في جسم الكومبوننت فيطلع «localStorage is not defined» على السيرفر. وتعدّي [[onClick={() => ...}]] من server component لـ client component فيطلع خطأ إن الدوال مينفعش تتبعت لـ Client Components.`
          },
          teach: R`## الفكرة: سطر واحد بيقول «الملف ده بيروح المتصفح»

المثال هو الزرار اللي الدرس اللي فات استخدمه: خانة كمية وزرار «ضيف للسلة». فيه state و events، فلازم يبقى client component. هنقراه سطر سطر، وبعدين نشوف على Next 16.4 (dev و build و start، و Chrome حقيقي بـ playwright) هو بيشتغل فين وإيه اللي بيحصل لو شلنا السطر الأول.

---

## ١. [["use client";]]

- لازم يبقى **أول سطر** في الملف، قبل أي import.
- string عادي بين علامتين، مش دالة ولا import. اسمه directive: تعليمة للـ bundler.
- معناه: «الملف ده، وكل ملف بيعمله import، يدخلوا الـ JavaScript اللي بيتبعت للمتصفح».

---

## ٢. [[import { useState } from "react";]]

[[useState]] hook من React، وهو سبب إن الملف لازم يبقى client (تاب «React» فيه الدرس بتاعه).

---

## ٣. [[export function AddToCart({ productId }: { productId: string })]]

- [[export function]] مش [[export default]]: ده كومبوننت عادي مش صفحة، فبيتعمله import باسمه [[{ AddToCart }]].
- [[productId]] جاي من الـ server component. والـ props اللي بتعدّي من server لـ client لازم تبقى **serializable** (تتحوّل نص وترجع زي ما هي): string ورقم و boolean و object و array و Date و Promise و JSX.

جربنا نعدّي دالة من الصفحة (server) للزرار: [[<AddToCart productId={p.id} onAdd={() => console.log("x")} />]]:

~~~text الناتج: next build
Error occurred prerendering page "/products".
Error: Event handlers cannot be passed to Client Component props.
  {productId: "p1", onAdd: function onAdd}
~~~

الدالة كود على السيرفر، ومينفعش تتكتب في الصفحة وتتبعت.

---

## ٤. الـ state

| السطر | معناه |
|---|---|
| [[const [qty, setQty] = useState(1);]] | الكمية، وأولها ١ |
| [[const [added, setAdded] = useState(false);]] | اتضاف ولا لأ، وأوله لأ |

[[useState]] بيرجّع حاجتين: القيمة، ودالة بتغيّرها وبتخلي React يرسم تاني.

---

## ٥. الـ JSX

### [[<input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />]]

من جوه لبرة:

1. [[e.target.value]]: اللي اتكتب في الخانة، ودايمًا string حتى لو [[type="number"]].
2. [[Number(...)]]: حوّله رقم.
3. [[setQty(...)]]: خزّنه في الـ state.

و [[value={qty}]] بيخلي الخانة تعرض الـ state (controlled input).

### [[<button onClick={() => setAdded(true)} disabled={added}>]]

- [[onClick]]: لما يتضغط، [[added]] تبقى [[true]].
- [[disabled={added}]]: بعد الضغط الزرار يتقفل.

### [[{added ? "اتضاف للسلة" : "ضيف للسلة"}]]

[[? :]] (ternary): لو [[added]] اعرض الأول، غير كده التاني.

---

## ٦. شغّلناه

### في المتصفح (next start)

كتبنا ٣ في خانة أول منتج وضغطنا الزرار:

~~~text الناتج
before: ضيف للسلة disabled: false
after: اتضاف للسلة disabled: true qty: 3
~~~

### الـ HTML جاي جاهز من السيرفر

[[curl]] لنفس الصفحة فيه:

~~~text الناتج
<div class="flex gap-2"><input type="number" min="1" value="1"/><button>ضيف للسلة</button></div>
~~~

يعني الكومبوننت **اتنفذ على السيرفر كمان** وطلّع HTML بالقيم الأولى. وبعدين في المتصفح، الـ JS بتاعه بيوصل ويربط الـ [[onClick]] و [[onChange]] بالـ HTML الموجود (ده الـ hydration). عشان كده [[window]] و [[localStorage]] مينفعوش في جسم الكومبوننت: في المرة الأولى على السيرفر مش موجودين.

### الكود في ملفات المتصفح

| | الملف اللي فيه [[AddToCart]] |
|---|---|
| [[next start]] | ملف باسم عشوائي في [[_next/static/chunks]]، وجواه [[e.s(["AddToCart",0,function({productId:e}){let[n,s]=(0,i.useState)(1) ...]] |
| [[next dev]] | ملف باسمه: [[src_app_products_add-to-cart_tsx_1f-z9dp-xib9i._.js]] |

في الإنتاج الكود متصغّر (أسماء المتغيرات بقت [[e]] و [[n]] و [[s]])، بس اسم الـ export [[AddToCart]] والنصوص فضلوا. و [[ProductsPage]] (الصفحة الـ server) مش موجودة في أي ملف هناك.

---

## ٧. من غير [[use client]]

مسحنا السطر الأول من الملف:

~~~text الناتج: next build
./src/app/products/add-to-cart.tsx:1:10
Error: You're importing a module that depends on $__btuseState$__bt into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the $__bt"use client"$__bt directive.
~~~

أي ملف من غير directive بيبقى server component، و [[useState]] مش مسموح هناك. و [[1:10]] = السطر ١ العمود ١٠، مكان [[useState]] في الـ import.

---

## الخلاصة

- [[use client]] أول سطر، وبتحدد **حد**: الملف ده وكل اللي بيعمله import بقوا client.
- الـ client component بيترسم HTML على السيرفر الأول، وبعدين بيعمل hydration في المتصفح.
- الـ props من server لـ client لازم serializable، والدوال العادية لأ.
- حطها في أصغر كومبوننت تفاعلي، مش فوق الصفحة.`,
          lines: [
            "أول سطر في الملف، قبل أي import. من هنا وتحت كله client.",
            "hooks مسموحة هنا.",
            "الـ props لازم تبقى serializable: string ورقم و boolean و object و array و Date و Promise و JSX. مينفعش دالة عادية من server component.",
            "state للكمية.",
            "state للحالة.",
            "بداية الـ JSX.",
            "div.",
            "input بـ onChange: ده سبب إن الملف client.",
            "زرار بـ onClick.",
            "النص بيتغير مع الـ state.",
            "قفلة الزرار.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`في الإنتاج: البحث في Sources عن [[AddToCart]] بيلاقيه جوه ملف في [[_next/static/chunks]]، لأن اسم الـ export بيفضل موجود حتى بعد الـ minify، ومعاه النصوص «ضيف للسلة» و «اتضاف للسلة». و [[ProductsPage]] مش موجودة في أي ملف هناك، لأنها server component.

ولما تمسح [[use client]]: نفس خطأ الدرس اللي فات، [[You're importing a module that depends on useState into a React Server Component module]]، والرسالة نفسها بتقولك علّم الملف بـ [[use client]]. لو لقيت [[ProductsPage]] في chunks الإنتاج: انت حاطط [[use client]] فوق [[page.tsx]] نفسها.`
        },
        {
          cmd: "children من السيرفر",
          title: "تحط server component جوه client component إزاي؟",
          desc: R`client component مينفعش يعمل [[import]] لـ server component: اللي بيتعمله import من ملف client بيبقى client هو كمان. بس ينفع يستلمه جاهز كـ [[children]] أو أي prop من نوع JSX، والـ server component اللي فوق هو اللي يركّبهم.

ودي نفس الطريقة اللي بتحط بيها providers (theme و React Query و i18n): كومبوننت client صغير بياخد [[children]]، وتحطه في الـ root layout. الـ provider بيبقى client، واللي جواه يفضل server.`,
          example: R`// app/providers.tsx
"use client";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
// app/layout.tsx (server)
import { Providers } from "./providers";
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}`,
          try: R`اعمل client component اسمه [[Toggle]] بيعرض [[children]] أو يخبيها بزرار. حط جواه server component [[async]] بيجيب داتا، مرة كـ children من الصفحة (هيشتغل)، ومرة بـ [[import]] جوه ملف الـ Toggle نفسه (هيطلع خطأ إن async component مش مدعوم في client).`,
          flag: "script",
          deep: {
            why: "الواجهة الحقيقية متداخلة: modal تفاعلي جواه محتوى من الداتابيز، وتابات جوه كل تاب داتا. لو كل حاجة جوه client component بقت client، التطبيق كله هيبقى client ويرجع SPA. الـ composition بيخليك تحط الجزء التفاعلي برّه والداتا جوه.",
            how: R`الـ server component اللي فوق بيترسم الأول، وبيطلّع ناتج كل الـ server components (بما فيهم اللي اتبعتوا كـ children) عناصر جاهزة جوه الـ RSC payload. الـ client component بيستلم [[children]] دي كعناصر خلاص اترسمت، فمبيعرفش ولا يهمه إنها جت من السيرفر، ومبيحتاجش الكود بتاعها.

إنما لو ملف client عمل [[import]] لملف كومبوننت، الـ bundler بيضم الملف ده للـ bundle بتاع المتصفح، فيتحوّل client. ولو كان [[async]] أو بيستخدم الداتابيز، يطلع خطأ.

نفس الفكرة لأي prop: [[<Tabs details={<ProductDetails />} reviews={<Reviews />} />]]، كل تاب server component والـ Tabs نفسه client.

والـ context: [[createContext]] و [[useContext]] client بس. الـ server components مبتقراش context. لو محتاج داتا مشتركة على السيرفر (المستخدم الحالي مثلًا)، ناديها في كل مكان محتاجها، و [[cache()]] من React بيخليها تتنفذ مرة واحدة في الطلب (درس DAL).`,
            when: "Providers في الـ layout، و modals و tabs و accordions جواها محتوى من السيرفر، وأي wrapper تفاعلي حوالين داتا.",
            mistakes: R`تعمل [[import ServerThing from "./server-thing"]] جوه client component وتستغرب إن فيه خطأ أو إن الكود بقى بيتبعت للمتصفح. وتحط الـ providers في [[layout.tsx]] نفسه وتكتب فوقه [[use client]]. وتعمل [[new QueryClient()]] على مستوى الملف فالكاش يتشارك بين مستخدمين على السيرفر.`
          },
          teach: R`## الفكرة: الـ client component بيستلم الـ server component جاهز، مبيستوردوش

القاعدة: اللي بيتعمله [[import]] من ملف [[use client]] بيبقى client هو كمان. بس الـ client component يقدر **يستلم** server components جاهزين في [[children]]. المثال بيطبّق ده على أشهر حالة: الـ providers في الـ root layout. شغّلناه على Next 16.4 (مع [[@tanstack/react-query]] 5 و [[next-themes]] 0.4)، وجربنا الـ solCode (Toggle و Data) بالطريقتين.

---

## ١. [[app/providers.tsx]] سطر سطر

### [["use client";]]

الـ providers بتستخدم context و state، ودول client بس.

### [[import { useState, type ReactNode } from "react";]]

- [[useState]]: هنستخدمه بطريقة خاصة تحت.
- [[type ReactNode]]: نوع «أي حاجة تترسم» (عنصر، نص، null، ليستة). كلمة [[type]] جوه الـ import معناها «ده نوع بس، متدخلوش في الـ JS».

### [[import { QueryClient, QueryClientProvider } from "@tanstack/react-query";]]

React Query: [[QueryClient]] هو الكاش، و [[QueryClientProvider]] بيوصّله لكل الكومبوننتات اللي تحته.

### [[import { ThemeProvider } from "next-themes";]]

مكتبة الـ dark mode.

### [[export function Providers({ children }: { children: ReactNode })]]

بياخد [[children]] من غير ما يعرف هي إيه.

### [[const [queryClient] = useState(() => new QueryClient());]]

- [[useState(() => ...)]]: لما تدّي [[useState]] دالة، React بينفّذها **مرة واحدة بس** أول ما الكومبوننت يتعمل، ويحتفظ بالنتيجة.
- [[const [queryClient] =]]: بناخد القيمة بس، ومش محتاجين دالة التغيير.
- ليه مش [[const queryClient = new QueryClient()]] برّه الكومبوننت؟ لأن الملف ده بيتنفذ على السيرفر كمان (SSR)، وأي متغير على مستوى الملف هناك بيتشارك بين **كل** الطلبات، يعني كاش مستخدم يبان لمستخدم تاني. جوه [[useState]] كل مستخدم ليه نسخة.

### الـ JSX

~~~text الشكل
<QueryClientProvider client={queryClient}>
  <ThemeProvider attribute="class">{children}</ThemeProvider>
</QueryClientProvider>
~~~

provider جوه provider، وفي الآخر [[children]]. و [[attribute="class"]] معناها «حط اسم الثيم كـ class على [[<html>]]».

---

## ٢. [[app/layout.tsx]] (server)

### [[import { Providers } from "./providers";]]

الـ layout server component، وبيعمل import لـ client component. ده مسموح: server يقدر يستورد client، العكس هو اللي فيه مشكلة.

### [[<html lang="ar" dir="rtl" suppressHydrationWarning>]]

[[next-themes]] بيحط class على [[<html>]] قبل ما React يعمل hydration. فالـ HTML اللي جه من السيرفر هيبقى مختلف عن اللي في المتصفح في الـ attribute ده، و React هيطلّع تحذير. [[suppressHydrationWarning]] بيقوله «عارف، متحذرش»، وبيأثر على العنصر ده بس، مش اللي جواه. ولما شغّلنا الصفحة، [[<html>]] كان عليه [[class="light"]].

### [[<body><Providers>{children}</Providers></body>]]

الصفحات بتدخل في [[Providers]] كـ [[children]]. مين اللي ركّبهم؟ الـ layout، وهو server. فالصفحات بتفضل server components مع إنها جوه client component.

---

## ٣. التجربة: Toggle و Data

[[Toggle]] client بيعرض [[children]] أو يخبيها، و [[Data]] server component [[async]] بيستنى نص ثانية ويرجّع [[<p>داتا من السيرفر</p>]].

### الطريقة الصح: [[<Toggle><Data /></Toggle>]] في الصفحة

~~~text الناتج (next start)
html class: light | main: خبّيداتا من السيرفر
after click: اعرض
after 2nd click: خبّيداتا من السيرفر
~~~

الزرار شغال، والداتا بتختفي وترجع. ودوّرنا على [[داتا من السيرفر]] في ملفات [[_next/static/chunks]]: ولا ملف. يعني [[Data]] اتنفذ على السيرفر بس، ووصل للـ Toggle عنصر خلاص اترسم جوه الـ RSC payload.

### الطريقة الغلط: [[import { Data } from "./data"]] جوه [[toggle.tsx]]

الـ build عدّى، والـ HTML نفسه كان فيه الداتا:

~~~text الناتج: curl
<main><div><button>خبّي</button><p>داتا من السيرفر</p></div>...
~~~

بس في المتصفح:

~~~text الناتج (next start)
html class: light | main: خبّيداتا من السيرفر
after click: خبّيداتا من السيرفر
after 2nd click: خبّيداتا من السيرفر
~~~

الزرار مبيعملش حاجة، و [[داتا من السيرفر]] بقت موجودة في ملف واحد في [[_next/static/chunks]]: [[Data]] دخل bundle المتصفح. وفي [[next dev]] الـ console قال السبب:

~~~text الناتج في console المتصفح (dev)
<Data> is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding $__bt'use client'$__bt to a module that was originally written for the server.
~~~

[[Data]] ملوش [[use client]]، بس لأنه اتعمله import من ملف client بقى client، والـ client components مينفعش تبقى [[async]]. وفي الإنتاج مفيش رسالة خالص، الزرار بس بيبطّل يرد، ودي أصعب في الاكتشاف.

---

## الخلاصة

| | [[<Client><Server /></Client>]] من ملف server | [[import Server]] جوه ملف client |
|---|---|---|
| [[Server]] بيتنفذ فين | السيرفر بس | المتصفح كمان (بقى client) |
| الكود بتاعه في bundle المتصفح | لأ | أيوة |
| [[async]] والداتابيز | شغالين | خطأ |

- الـ client component يستلم server components في [[children]] أو أي prop من نوع JSX.
- الـ providers: كومبوننت client صغير بياخد [[children]]، وتحطه في الـ root layout.
- [[new QueryClient()]] جوه [[useState(() => ...)]]، مش على مستوى الملف.`,
          lines: [
            "الـ providers بتستخدم context و state، فلازم client.",
            R`[[ReactNode]] نوع أي حاجة تترسم.`,
            R`React Query (تفاصيله في تاب «React»).`,
            R`الـ dark mode (تاب «HTML و CSS»).`,
            R`بياخد [[children]] من غير ما يعرف هي إيه.`,
            R`client واحد لكل مستخدم. [[useState]] مش [[new QueryClient()]] برّه الكومبوننت، عشان على السيرفر ميتشاركش بين الطلبات.`,
            "بداية الـ JSX.",
            "provider الـ React Query.",
            R`provider الثيم، وجواه [[children]].`,
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "الـ root layout، server component.",
            "layout عادي.",
            "بداية الـ JSX.",
            R`[[suppressHydrationWarning]] عشان next-themes بيحط class على [[<html>]] قبل الـ hydration.`,
            R`الصفحات جوه [[Providers]] كـ children، فبتفضل server components.`,
            "قفلة html.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`مرة الـ children: الـ Toggle بيعرض الداتا ويخبيها عادي، و [[Data]] اترسم على السيرفر ووصل للـ Toggle عنصر جاهز. الـ Toggle مبيعرفش إنه async أصلًا.

مرة الـ import جوه ملف الـ Toggle: الـ build عدّى عندي والـ HTML اترسم، بس الزرار مبقاش بيعمل حاجة. وفي [[npm run dev]] أول ما الصفحة تفتح بيطلع في الـ console (في الإنتاج مفيش رسالة، الزرار بس بيبطّل يرد): [[<Data> is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding 'use client' to a module that was originally written for the server.]] يعني [[Data]] دخل الـ bundle بتاع المتصفح وبقى client، والـ client components مينفعش تبقى async. ولو [[Data]] كان بيستخدم الداتابيز أو عليه [[server-only]]، الـ build نفسه كان هيقع.`,
          solCode: R`// app/toggle.tsx
"use client";
import { useState, type ReactNode } from "react";
export function Toggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{open ? "خبّي" : "اعرض"}</button>
      {open && children}
    </div>
  );
}
// app/data.tsx (server component)
export async function Data() {
  await new Promise((r) => setTimeout(r, 500));
  return <p>داتا من السيرفر</p>;
}
// app/page.tsx
import { Toggle } from "./toggle";
import { Data } from "./data";
export default function Page() {
  return <Toggle><Data /></Toggle>;
}`
        },
        {
          cmd: "server-only",
          title: "تمنع كود السيرفر والأسرار إنهم يوصلوا للمتصفح",
          desc: R`[[import "server-only"]] في أول ملف بتقول «الملف ده للسيرفر بس»، ولو أي client component عمله import بالغلط، الـ build يقع برسالة واضحة بدل ما الكود (وأي سر جواه) يتبعت للمتصفح. حطه في ملفات الداتابيز والـ auth والمكتبات اللي بتستخدم مفاتيح.

ومتغيرات البيئة: اللي بتبدأ بـ [[NEXT_PUBLIC_]] بس هي اللي بتوصل للمتصفح، وبتتحط جوه الـ JS وقت الـ build. أي متغير تاني بيبقى [[undefined]] في المتصفح، وده حماية، مش bug.`,
          example: R`// lib/payments.ts
import "server-only";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// lib/public-config.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
// components/checkout-button.tsx
"use client";
import { siteUrl } from "@/lib/public-config";
import { stripe } from "@/lib/payments"; // الـ build بيقع هنا، وده المطلوب`,
          try: R`اعمل [[lib/secret.ts]] فيه [[export const key = process.env.MY_SECRET]] من غير [[server-only]]، واستخدمه في client component واطبعه: في console المتصفح هتلاقيه undefined (Next مبيبعتش المتغير للـ JS)، بس اعمل View Source: هتلاقي القيمة الحقيقية مكتوبة في الـ HTML، لأن الـ client component اترسم على السيرفر الأول (ومعاها hydration error). بعدين ضيف [[import "server-only"]] وشوف الـ build بيقع بإيه. وجرّب [[NEXT_PUBLIC_MY_SECRET]] وافتح ملف الـ JS في DevTools ودوّر على القيمة.`,
          flag: "script",
          deep: {
            why: "الحد بين السيرفر والمتصفح في Next بقى مجرد import. سطر import واحد غلط في client component ممكن يسحب ملف فيه مفتاح أو اتصال داتابيز للمتصفح. والمتغيرات: مطوّر بيحط NEXT_PUBLIC_ على مفتاح API عشان «كان undefined في المتصفح»، فالمفتاح يتنشر لكل زائر.",
            how: R`باكدج [[server-only]] فاضي تقريبًا، بس معمول بحيث لو اتعمل import في بيئة الـ client، Next يطلّع خطأ وقت الـ build إنك بتستورد حاجة محتاجة server-only في Client Component. وفيه عكسه [[client-only]] للملفات اللي بتلمس [[window]].

متغيرات البيئة: وقت الـ build، Next بيدوّر على [[process.env.NEXT_PUBLIC_X]] مكتوبة بالنص كده ويبدّلها بالقيمة. عشان كده [[process.env[name]]] أو destructuring [[const { NEXT_PUBLIC_X } = process.env]] مبيشتغلوش في المتصفح. ولو غيّرت قيمة [[NEXT_PUBLIC_]] على السيرفر، لازم build جديد.

المتغيرات من غير البادئة بتتقري من [[process.env]] على السيرفر، ومبتتبعتش للمتصفح إلا لو انت عدّيتها بإيدك كـ prop. وده بيحصل بالغلط: [[<Client config={process.env} />]].

وفيه React Taint API تجريبي ([[experimental.taint]]) بيمنع object معيّن إنه يتعدّى لـ client component، بس [[server-only]] و [[select]] بالأعمدة اللي محتاجها أبسط وكفاية غالبًا. وفحص المتغيرات بـ Zod في تاب «TypeScript»، وتفاصيلها في فئة النشر.`,
            when: R`[[server-only]] في كل ملف فيه اتصال بالداتابيز، أو مفاتيح، أو منطق auth، أو data access layer. و [[NEXT_PUBLIC_]] لحاجات عامة فعلًا: URL الموقع، ومفتاح Stripe الـ publishable، و Sentry DSN.`,
            mistakes: R`[[NEXT_PUBLIC_OPENAI_KEY]] عشان «الـ fetch من المتصفح مش شغال». الحل تعمل الطلب من السيرفر (Server Action أو Route Handler)، مش تكشف المفتاح. وتتوقع إن تغيير [[NEXT_PUBLIC_API_URL]] في [[.env]] على السيرفر هيتطبق من غير build. وتعدّي object الـ user كله لـ client component وفيه token أو hash.`
          },
          teach: R`## الفكرة: قفل على ملفات السيرفر، وبادئة للمتغيرات العامة

المثال ٣ ملفات: ملف دفع فيه مفتاح سري ومقفول بـ [[server-only]]، وملف فيه متغير عام بـ [[NEXT_PUBLIC_]]، وزرار client بيعمل import للاتنين. شغّلنا الملفات دي بالظبط على Next 16.4 (مع [[stripe]] 23)، وجربنا كمان التجربة اللي في «جرّب» خطوة خطوة. المتغيرات كانت في [[.env.local]]، والـ build قال إنه قراه: [[- Environments: .env.local]].

---

## ١. [[lib/payments.ts]]

### [[import "server-only";]]

import من غير اسم لباكدج [[server-only]] ([[npm i server-only]]). الباكدج مفيهاش كود تقريبًا، وشغلتها إنها توقّع الـ build لو الملف ده دخل bundle المتصفح.

### [[import Stripe from "stripe";]]

مكتبة الدفع.

### [[export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);]]

- [[process.env]]: object فيه متغيرات البيئة، و Next بيملاه من [[.env]] و [[.env.local]].
- [[STRIPE_SECRET_KEY]]: من غير [[NEXT_PUBLIC_]]، فموجود على السيرفر بس.
- [[!]] في الآخر لـ TypeScript: «أنا متأكد إنه مش [[undefined]]» (نوع أي متغير بيئة [[string | undefined]]).

---

## ٢. [[lib/public-config.ts]]

### [[export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;]]

[[NEXT_PUBLIC_]] في أول الاسم معناها «ده عام». وقت الـ build، Next بيدوّر على النص [[process.env.NEXT_PUBLIC_SITE_URL]] في الكود اللي رايح للمتصفح ويبدّله بالقيمة نفسها.

---

## ٣. [[components/checkout-button.tsx]]

| السطر | النتيجة |
|---|---|
| [["use client";]] | الملف ده وكل اللي بيستورده رايحين المتصفح |
| [[import { siteUrl } from "@/lib/public-config";]] | مسموح: قيمة عامة |
| [[import { stripe } from "@/lib/payments";]] | ممنوع: [[payments.ts]] عليه [[server-only]] |

حطينا الزرار في صفحة وعملنا [[next build]]:

~~~text الناتج
> Build error occurred
Error: Turbopack build failed with 2 errors:
./src/lib/payments.ts:1:1
Error: You're importing a module that depends on "server-only". This API is only available in Server Components in the App Router, but you are using it in the Pages Router.
> 1 | import "server-only";
    | ^^^^^^^^^^^^^^^^^^^^^

Import traces:
  Client Component Browser:
    ./src/lib/payments.ts [Client Component Browser]
    ./src/components/checkout-button.tsx [Client Component Browser]
    ./src/components/checkout-button.tsx [Server Component]
~~~

- الجملة [[but you are using it in the Pages Router]] غلط (إحنا في App Router)، متقفش عندها.
- المهم الـ **Import trace**: بيتقري من تحت لفوق. الصفحة (server) استوردت [[checkout-button.tsx]]، وده client، فاستورد [[payments.ts]] في bundle المتصفح ([[Client Component Browser]]). فعرفت بالظبط أنهي import تشيله.
- [[2 errors]]: التاني نفس المشكلة في [[Client Component SSR]] (نسخة الـ client component اللي بتترسم على السيرفر)، ومعاه رسالة أوضح: [['server-only' cannot be imported from a Client Component module]].

الـ build وقع **قبل** ما أي ملف يتبعت. ده المطلوب.

---

## ٤. التجربة: من غير [[server-only]]

ملف [[lib/secret.ts]] فيه [[export const key = process.env.MY_SECRET;]] (و [[MY_SECRET=sk_test_123456]] في [[.env.local]])، و client component بيطبعه ويعرضه.

~~~text الناتج: curl (View Source)
<p id="k">المفتاح: <!-- -->sk_test_123456</p>
~~~

~~~text الناتج في المتصفح (next start)
[console log] key in component: undefined
[pageerror] Minified React error #418; ... args[]=HTML ...
on screen: المفتاح:
~~~

اللي حصل خطوة خطوة:

1. على السيرفر، الـ client component اترسم HTML، وهناك [[process.env.MY_SECRET]] موجود، فالقيمة الحقيقية اتكتبت في الـ HTML.
2. في المتصفح، Next مبيحطش المتغيرات اللي من غير [[NEXT_PUBLIC_]] في الـ JS، فـ [[key]] بقى [[undefined]].
3. الـ HTML قال حاجة، والمتصفح رسم حاجة تانية، فـ React طلّع خطأ #418 (hydration mismatch: الـ HTML مش مطابق) ورسم نسخة المتصفح.

النتيجة: الشاشة فاضية، **بس السر اتسرّب في الـ HTML** لأي حد يعمل View Source. ودوّرنا على [[sk_test_123456]] في ملفات [[_next/static/chunks]]: مش موجود. التسريب كان في الـ HTML بس.

## ٥. نفس الملف مع [[server-only]]

نفس الخطأ اللي في القسم ٣، والـ trace: [[secret.ts]] ثم [[show.tsx]] ثم [[page.tsx]].

## ٦. نفس الملف بـ [[NEXT_PUBLIC_MY_SECRET]]

~~~text الناتج
[console log] key in component: pub_789
on screen: المفتاح: pub_789
~~~

ومن ملفات [[_next/static/chunks]]:

~~~text الناتج
let t="pub_789";o.s(["Show",0,func...
~~~

القيمة مكتوبة **حرفيًا** في الـ JS. يعني أي حاجة [[NEXT_PUBLIC_]] عامة لأي زائر، ولو غيّرتها لازم build جديد.

---

## الخلاصة

| | من غير بادئة | [[NEXT_PUBLIC_]] |
|---|---|---|
| على السيرفر | موجود | موجود |
| في JS المتصفح | [[undefined]] | مكتوب حرفيًا وقت الـ build |
| يتسرّب لو | client component عرضه (HTML) أو عدّيته prop | دايمًا عام |

- [[import "server-only"]] في أول أي ملف فيه داتابيز أو مفاتيح أو auth: الغلط يبقى build واقع بدل سر متسرّب.
- اقرا الـ Import trace من تحت لفوق عشان تلاقي الـ import الغلط.
- متحطش [[NEXT_PUBLIC_]] على مفتاح سري عشان «كان undefined في المتصفح».`,
          lines: [
            R`باكدج صغير ([[npm i server-only]]) ملوش أي كود وقت التشغيل: شغلته إنه يوقّع الـ build لو اتعمله import من client.`,
            "مكتبة Stripe.",
            R`مفتاح سري من غير [[NEXT_PUBLIC_]]: موجود على السيرفر بس.`,
            "متغير عام: قيمته بتتكتب حرفيًا جوه الـ JS وقت الـ build.",
            "كومبوننت client.",
            "مسموح: حاجة عامة.",
            R`ممنوع: الملف عليه [[server-only]]، فالـ build بيقع قبل ما المفتاح يتسرّب.`
          ],
          sol: R`من غير [[server-only]]: في console المتصفح [[key]] بـ undefined، بس View Source فيه القيمة الحقيقية، لأن الـ client component اترسم HTML على السيرفر الأول، وهناك [[process.env.MY_SECRET]] موجود. وبعدها المتصفح بيرسم undefined فيطلع hydration error (#418 في الإنتاج). يعني السر اتسرّب في الـ HTML، ودي بالظبط المشكلة اللي [[server-only]] بيقفلها.

مع [[import "server-only"]]: الـ build بيقع قبل أي حاجة: [[You're importing a module that depends on "server-only"]]، ومعاه import trace بيوريك السلسلة: [[lib/secret.ts]] ثم [[show.tsx]] (Client Component) ثم [[page.tsx]]. (الرسالة بتقول «Pages Router» غلط، بس الـ trace هو المهم.)

ومع [[NEXT_PUBLIC_MY_SECRET]]: القيمة بتظهر في المتصفح، ولو دوّرت عليها في ملفات [[_next/static/chunks]] هتلاقيها مكتوبة حرفيًا. أي حاجة [[NEXT_PUBLIC_]] عامة لأي زائر.`
        }
      ]
    }
]);
