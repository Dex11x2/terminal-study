// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Accessibility",
      l: 3,
      n: "الموقع لازم يشتغل بالكيبورد وقارئ الشاشة ولمن نظره ضعيف، ومعظم ده ببلاش لو الـ HTML صح",
      projects: [
        { lvl: 'صغير', t: R`زراير أيقونات ليها اسم`, what: R`toolbar فيه ٦ زراير أيقونة بس (بحث، ومفضلة، وسلة، ومشاركة، وثيم، ولغة): كل واحد [[<button>]] حقيقي بـ [[aria-label]] عربي، والأيقونة [[aria-hidden]]، والمفضلة [[aria-pressed]]، والثيم [[role="switch"]] بـ [[aria-checked]]، و tooltip بيظهر مع [[:hover]] و [[:focus-visible]]. من درسين aria و focus-visible.`, done: R`DevTools › Accessibility بيدّي لكل زرار role و name عربي، والضغط بـ Space بيقلب [[aria-pressed]] و [[aria-checked]]، والـ tooltip بيظهر بالكيبورد زي الماوس، و axe صفر مشاكل.` },
        { lvl: 'صغير', t: R`palette بتعدّي AA`, what: R`خد ألوان موقع (أو ٨ ألوان من عندك) واعمل جدول بكل تركيبة كلام على خلفية بتتستخدم فعلًا، مع النسبة، وعدّل اللي ساقط لأقرب درجة بتعدّي من نفس العيلة. من درس contrast ratio.`, done: R`كل تركيبة كلام عادي 4.5:1 أو أكتر، والحدود والأيقونات المهمة 3:1 أو أكتر، والجدول فيه النسبة قبل وبعد لكل تعديل.` },
        { lvl: 'متوسط', t: R`مكتبة alerts و badges`, what: R`٤ حالات (نجاح، وتحذير، وخطر، ومعلومة) في شكلين: soft (خلفية فاتحة وكلام غامق من نفس اللون) و solid. كل حالة فيها أيقونة وكلمة مش لون بس، والـ alert اللي بيظهر بعد فعل بيتحط في منطقة [[role="status"]] (أو [[role="alert"]] للخطر) موجودة في الصفحة من الأول، وفي الثيمين. بيجمع الدروس التلاتة.`, done: R`الـ ١٦ تركيبة (٤ حالات × شكلين × ثيمين) كلامها 4.5:1 أو أكتر، والصفحة بالأبيض والأسود (Rendering › Emulate vision deficiencies › Achromatopsia) لسه مفهومة، و NVDA أو Narrator بيقرا الرسالة لما تظهر من غير ما الـ focus يتحرك.` },
        { lvl: 'متوسط', t: R`navbar بالكيبورد بس`, what: R`navbar فيه لوجو، و mega menu بيفتح بـ [[:hover]] و [[:focus-within]] من غير JavaScript، وزرار منيو للموبايل بـ [[aria-expanded]] و [[aria-controls]]، و skip link، و [[aria-current="page"]]، و [[scroll-padding-top]] بارتفاع الهيدر الـ sticky عشان العنصر اللي عليه focus ميستخباش تحته.`, done: R`تقدر توصل لكل لينك في الـ mega menu بـ Tab والماوس بعيد، والمنيو بتتقفل بـ Escape والـ focus بيرجع للزرار، ومفيش عنصر عليه focus مستخبي تحت الهيدر (الـ top بتاعه أكبر من ارتفاع الهيدر)، والـ outline باين في الثيمين.` },
        { lvl: 'كبير', t: R`صفحة حجز لعيادة أسنان متخيلة «ابتسامة» من غير عوائق`, what: R`صفحة فيها هيرو، وخدمات بكروت، وslider قبل وبعد (صورتين فوق بعض و [[<input type="range">]] شفاف فوقهم بيكتب [[--pos]] والصورة العليا [[clip-path: inset(0 0 0 var(--pos))]]، فالكيبورد وقارئ الشاشة شغالين ببلاش)، و FAQ، وفورم حجز بأخطاء مربوطة بـ [[aria-describedby]] و [[aria-invalid]]، و toast بعد الإرسال في [[role="status"]]، و dialog تأكيد بـ [[showModal()]] بيرجّع الـ focus. الألوان توكنز بثيمين (من وحدة الثيم).`, done: R`axe صفر مشاكل في الثيمين، وLighthouse Accessibility ‏100، والـ slider بيتحرك بالأسهم وقارئ الشاشة بيقول القيمة، والحجز كله يخلص بالكيبورد بس، و Escape بيقفل الـ dialog والـ focus بيرجع للزرار اللي فتحه (اتقاس: [[document.activeElement]] هو الزرار)، وكل كلام 4.5:1 أو أكتر.`, ext: R`زوّد [[prefers-contrast: more]] بألوان أغمق، وجرّب الصفحة بـ [[forced-colors: active]] (Windows High Contrast) وصلّح أي حاجة اختفت، واكتب صفحة «إعلان الـ accessibility» فيها اللي اتعمل واللي لسه.` },
        { lvl: 'فكرة', t: R`صلّح موقع حقيقي (بإذن صاحبه)`, what: R`اختار موقع صغير لحد تعرفه (محل، أو جمعية، أو مشروع صاحبك) أو موقع قديم ليك، واعمل لستة بكل مشكلة accessibility فيه: أزرار من غير اسم، وتباين، و focus مختفي، ومنيو مبتتفتحش بالكيبورد. وصلّح أهم ٥ بـ pull request أو نسخة محلية.`, done: R`فيه لستة قبل وبعد بلقطة لكل مشكلة، وعدد مشاكل axe نزل، وكل تصليح مكتوب جنبه بند WCAG بتاعه.`, ext: R`حوّل اللستة لـ checklist تستخدمها في أي مشروع جاي، وشاركها مع صاحب الموقع كاقتراح.` },
      ],
      items: [
        {
          cmd: "aria",
          title: "لما HTML لوحده ميكفيش: قول لقارئ الشاشة الحالة",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه الـ role والاسم، وهل بيتوصل بـ Tab، لكل واحد: [[<button aria-label="القايمة"><svg aria-hidden="true">…</svg></button>]]، و [[<div role="button">حفظ</div>]]، و [[<a>الأسعار</a>]] من غير href، و [[<img src="logo.png" alt="">]]. اكتب، وبعدين افتح DevTools › Elements › Accessibility لكل واحد.`, done: R`الأول button اسمه «القايمة» وبيتوصل، والتاني button اسمه «حفظ» بس مش بيتوصل بـ Tab ولا Enter بيشغّله، والتالت مش link أصلًا (generic) ومش بيتوصل، والرابع ignored (زخرفة). وفهمت ليه [[<button>]] أحسن من [[role="button"]].`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>مين اسمه إيه؟</title></head>
<body>
<main>
  <h1>شجرة الـ accessibility</h1>
  <button id="one" aria-label="القايمة"><svg aria-hidden="true" width="16" height="16"><path d="M0 8h16"/></svg></button>
  <div id="two" role="button">حفظ</div>
  <a id="three">الأسعار</a>
  <img id="four" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="">
</main>
</body>
</html>
~~~

**الإجابة:**

| العنصر | الـ role | الاسم | Tab؟ |
|---|---|---|---|
| [[<button aria-label>]] | button | القايمة | أيوه |
| [[<div role="button">]] | button | حفظ | لأ |
| [[<a>]] من غير href | generic | فاضي | لأ |
| [[<img alt="">]] | ignored | مفيش | لأ |

**ليه:**

- [[role="button"]] بيغيّر اللي القارئ بيقوله بس. مبيديش Tab ولا Enter ولا Space ولا click بالكيبورد. لازم تضيف [[tabindex="0"]] و [[keydown]] بإيدك.
- [[<a>]] من غير [[href]] مش لينك، ده مجرد نص.
- [[alt=""]] معناها «زينة، اتجاهلها». وده مختلف عن مفيش [[alt]] خالص.

**الغلطة الشائعة:** تثق في الـ role وتنسى الكيبورد. [[<button>]] بيجيب كل ده ببلاش، فمفيش سبب لـ [[div]].

~~~text الناتج
#one    role button    name «القايمة»
#two    role button    name «حفظ»
#three  role generic   name فاضي
#four   ignored

Tab: one ، BODY ، one ، BODY   (الزرار الحقيقي بس)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة عربي فيها زرار تغيير اللغة بـ [[aria-label="Switch language"]] إنجليزي، وزرار منيو موبايل من غير [[aria-expanded]]، وأزرار مشاركة جواها emoji بس، وحالة الطلب بتتعرض بنقطة حمرا أو خضرا من غير كلام. صلّح الأربعة.`, done: R`الـ labels بقت عربي، و [[aria-expanded]] بيتقلب [[true]] و [[false]] مع الفتح والقفل، والـ emoji عليها [[aria-hidden]] والزرار ليه اسم، والحالة جنبها كلمة («اتشحن»)، و axe صفر مشاكل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>طلباتي</title>
<style>
  .dot { display: inline-block; width: .75rem; height: .75rem; border-radius: 50%; background: #16a34a; }
</style>
</head>
<body>
<header>
  <button aria-label="EN: بدّل اللغة للإنجليزية">EN</button>
  <button id="menu-btn" aria-label="القايمة" aria-expanded="false" aria-controls="menu">☰</button>
  <nav id="menu" aria-label="الرئيسية" hidden><a href="/">الرئيسية</a></nav>
</header>
<main>
  <h1>طلباتي</h1>
  <button aria-label="شارك على واتساب"><span aria-hidden="true">📤</span></button>
  <button aria-label="انسخ الرابط"><span aria-hidden="true">🔗</span></button>
  <p>طلب 1042 <span class="dot" aria-hidden="true"></span> اتشحن</p>
</main>
<script>
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });
$__lt/script>
</body>
</html>
~~~

| المشكلة | التصليح |
|---|---|
| [[aria-label="Switch language"]] | اسم عربي، وفيه [[EN]] المكتوبة على الزرار |
| منيو من غير حالة | [[aria-expanded]] و [[aria-controls]]، والـ JavaScript بيقلبها |
| زرار جواه emoji | [[aria-label]] وصفي، و [[aria-hidden="true"]] على الـ emoji |
| نقطة لون | كلمة «اتشحن» جنبها، والنقطة [[aria-hidden]] |

**ليه كل واحدة مشكلة:** قارئ الشاشة بيقرا الـ label باللغة العربي بصوت عربي، فالإنجليزي بيطلع مكسّر. والـ emoji بيتقري «outbox tray»، وده مش بيقول الزرار بيعمل إيه. واللون لوحده مش بيوصل لمستخدم القارئ ولا لمن عنده عمى ألوان.

**ليه [[EN]] جوه الـ label:** أول تصليح كتبت فيه «بدّل اللغة للإنجليزية» بس، و axe طلّع [[label-content-name-mismatch]]. اللي بيستخدم التحكم بالصوت بيقول اللي شايفه: «EN»، فلازم الاسم يحتوي الكلام الظاهر (بند 2.5.3).

**الغلطة الشائعة:** تثق إن axe شاف كل ده. على الصفحة البايظة طلّع مشكلة واحدة بس، والمشاكل التانية محتاجة عين بني آدم.

~~~text الناتج
axe على البايظة:  label-content-name-mismatch (1)
axe بعد التصليح:  صفر (والمنيو مفتوح برضه)

aria-expanded:  false ← true ← false

ariaSnapshot:
- button "القايمة": ☰
- heading "طلباتي" [level=1]
- button "شارك على واتساب"
- button "انسخ الرابط"
- paragraph: طلب 1042 اتشحن
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** نظام toast: حاوية [[<div role="status" aria-live="polite">]] موجودة فاضية في الصفحة من أول ما تفتح، ورسالة «اتحفظ» بتتحط جواها بعد الحفظ وتختفي بعد ٤ ثواني، ورسايل الخطأ في حاوية تانية [[role="alert"]].`, done: R`NVDA أو Narrator بيقول «اتحفظ» من غير ما الـ focus يتحرك ([[document.activeElement]] قبل وبعد نفس العنصر)، والخطأ بيتقري على طول حتى لو فيه كلام شغال. وجرّبت تعمل الحاوية والرسالة مع بعض في نفس اللحظة ولاحظت إن القارئ ممكن ميقولش حاجة، فعرفت ليه الحاوية لازم تبقى موجودة قبل الرسالة.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toast</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  .toasts { position: fixed; inset-block-end: 1rem; inset-inline-end: 1rem; display: grid; gap: .5rem; }
  .toasts p { margin: 0; padding: .75rem 1rem; border-radius: .5rem; background: #0f172a; color: #fff; }
  #errors p { background: #b91c1c; }
</style>
</head>
<body>
<main>
  <h1>إعدادات الحساب</h1>
  <label for="name">الاسم</label>
  <input id="name" value="سارة">
  <button id="save" type="button">احفظ</button>
  <button id="fail" type="button">جرّب خطأ</button>
</main>

<!-- الحاويتين موجودين فاضيين من أول ما الصفحة تفتح -->
<div id="status" class="toasts" role="status" aria-live="polite"></div>
<div id="errors" class="toasts" role="alert"></div>

<script>
  function toast(box, text, ms = 4000) {
    const p = document.createElement("p");
    p.textContent = text;
    box.append(p);
    if (ms) setTimeout(() => p.remove(), ms);
  }
  document.getElementById("save").onclick = () => toast(document.getElementById("status"), "اتحفظ");
  document.getElementById("fail").onclick = () => toast(document.getElementById("errors"), "الحفظ فشل، جرّب تاني", 0);
$__lt/script>
</body>
</html>
~~~

**ليه الحاوية موجودة من الأول:** قارئ الشاشة بيبدأ يراقب الـ live region لما يشوفه في الصفحة. لو الحاوية والرسالة اتحطوا مع بعض في نفس اللحظة، ممكن ميعتبرش ده «تغيير» فميقولش حاجة.

- [[role="status"]] مع [[aria-live="polite"]]: بيستنى لحد ما القارئ يخلص جملته، مناسب لـ «اتحفظ».
- [[role="alert"]]: بيقطع الكلام، للأخطاء بس.
- الـ focus متحركش: المستخدم بيكمل شغله.
- [[ms = 0]] للخطأ: مبيختفيش لوحده، عشان يلحق يقراه.

**اتجرّب بإيه:** DOM والـ focus في Chrome. النطق نفسه محتاج NVDA أو Narrator، فشغّله بنفسك على صفحتك. ده مكنش ممكن في المعمل الأوتوماتيك.

**الغلطة الشائعة:** تستخدم [[role="alert"]] لكل حاجة، فكل رسالة بسيطة تقطع القارئ.

~~~text الناتج
activeElement قبل وبعد الحفظ: name (نفس الحقل)
#status بعد الضغطة: «اتحفظ»
#status بعد 4.2 ثانية: فاضي
#errors: «الحفظ فشل، جرّب تاني» (بيفضل)
axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** بـ Testing Library اكتب اختبار لزرار المنيو: [[getByRole("button", { name: "القايمة" })]]، واضغط عليه بـ user-event، واتأكد إن [[aria-expanded]] بقى [[true]] وإن [[getByRole("navigation")]] ظاهرة، واضغط تاني واتأكد إنها اتقفلت.`, done: R`الاختبار بيعدّي، ولو مسحت [[aria-label]] أو [[aria-expanded]] من الكود بيقع برسالة واضحة (مش لاقي الزرار أو القيمة غلط).`, sol: R`~~~jsx Menu.jsx
import { useState } from "react";

export function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <button aria-label="القايمة" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>☰</button>
      {open && (
        <nav id="menu" aria-label="الرئيسية">
          <a href="/">الرئيسية</a>
        </nav>
      )}
    </header>
  );
}
~~~

~~~jsx Menu.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Menu } from "./Menu";

test("زرار القايمة بيفتح ويقفل", async () => {
  const user = userEvent.setup();
  render(<Menu />);

  const button = screen.getByRole("button", { name: "القايمة" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

  await user.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("navigation")).toBeVisible();

  await user.click(button);
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
});
~~~

~~~js vitest.config.mjs
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom" },
});
~~~

~~~bash
npm i -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
npx vitest run
~~~

**ليه [[getByRole]]:** بيدوّر زي ما قارئ الشاشة بيشوف. لو الزرار فقد اسمه، الاختبار يقع، فالاختبار بيحرس الـ accessibility كمان.

- [[queryByRole]] لما بنتأكد إن حاجة **مش** موجودة: بيرجع [[null]]، أما [[getByRole]] بيرمي error.
- [[userEvent]] بدل [[fireEvent]]: بيعمل تسلسل حقيقي (hover و focus و click).

**الغلطة الشائعة:** تعمل [[expect(button.getAttribute("aria-expanded")).toBe(true)]]. الـ attribute نص، فالمقارنة بـ [[true]] هتقع.

~~~text الناتج
Test Files  1 passed (1)
     Tests  1 passed (1)

لما شلت aria-label:
TestingLibraryElementError: Unable to find an accessible element
with the role "button" and name "القايمة"

لما شلت aria-expanded:
Error: expect(element).toHaveAttribute("aria-expanded", "false")
Expected the element to have attribute: aria-expanded="false"
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من WAI-ARIA Authoring Practices (APG) قارن نمط «Disclosure» بنمط «Menu Button». أنهي واحد المفروض لزرار منيو الموقع؟ وليه [[role="menu"]] غلط هنا؟`, done: R`كتبت ٣ سطور: Disclosure زرار بـ [[aria-expanded]] و Enter أو Space بيفتح، و Menu Button بيطلب أسهم و Home و End وهو لمنيوهات البرامج (زي File و Edit)، فمنيو لينكات الموقع Disclosure، و [[role="menu"]] بيخلّي القارئ يستنى أسهم مش موجودة.`, sol: R`**إجابة نموذجية من WAI-ARIA Authoring Practices (APG):**

> **Disclosure:** زرار عليه [[aria-expanded]] و [[aria-controls]] بيفتح ويقفل قسم. Enter و Space بيقلبوه، والـ Tab العادي بيمشي على اللينكات جواه.
> **Menu Button:** زرار بيفتح [[role="menu"]] فيه [[menuitem]]. الأسهم بتتنقل، و Home و End لأول وآخر عنصر، و Escape بيقفل. ده سلوك منيوهات البرامج زي File و Edit.
> منيو لينكات الموقع Disclosure. [[role="menu"]] هنا غلط لأنه بيوعد القارئ بسلوك برنامج، فالمستخدم يدوّس أسهم ومفيش حاجة تتحرك، ولينكات الـ Tab بتختفي من الترتيب المعتاد.

**شكل الـ Disclosure في الكود:** زرار [[aria-expanded]] و [[aria-controls]] زي الـ navbar في حل تمرين [[variants]]، ولينكات عادية جوه [[<nav>]].

**الغلطة الشائعة:** تشوف كلمة «menu» وتحط [[role="menu"]]. الكلمة في الديزاين مش معناها الـ role. لو الصفحة موقع، خليه [[<nav>]] فيه لينكات.

~~~text الناتج
القرار: Disclosure.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
          ],
          desc: R`القاعدة الأولى: لو فيه عنصر HTML بيعمل الحاجة، استخدمه ومتحطش aria. [[<button>]] أحسن من [[<div role="button">]].

aria للحاجات اللي HTML مش بيوصفها: [[aria-label]] اسم لعنصر ملوش كلام، و [[aria-expanded]] المنيو مفتوحة ولا لأ، و [[aria-controls]] الزرار ده بيتحكم في أنهي عنصر، و [[aria-current="page"]] اللينك ده الصفحة الحالية، و [[aria-describedby]] رسالة خطأ مربوطة بالحقل، و [[aria-live]] منطقة بتتغير ولازم تتقري.`,
          example: R`<button aria-expanded={open} aria-controls="mobile-menu" aria-label="القايمة" onClick={() => setOpen(!open)}>
  <Menu className="size-6" />
</button>
<nav id="mobile-menu" hidden={!open}>
  <a href="/" aria-current={pathname === "/" ? "page" : undefined}>الرئيسية</a>
</nav>
<input id="email" aria-invalid={!!error} aria-describedby="email-error" />
<p id="email-error">{error}</p>
<div role="status" aria-live="polite">{saved && "اتحفظ"}</div>`,
          try: R`شغّل قارئ الشاشة (Narrator على ويندوز بـ Ctrl+Win+Enter، أو VoiceOver على الماك بـ Cmd+F5) وافتح المنيو واقفلها بالكيبورد، واسمع بيقول إيه مع وبدون [[aria-expanded]].`,
          flag: "script",
          deep: {
            why: "قارئ الشاشة بيقرا شجرة الـ accessibility: لكل عنصر role (زرار، لينك، حقل)، و name (اسمه)، و state (مفتوح، متعلّم، غلط). الـ HTML الصح بيملاهم لوحده. بس الحاجات الديناميكية (منيو بتفتح، حفظ نجح، خطأ ظهر) محتاجة حد يقول لقارئ الشاشة، ودا شغل aria.",
            how: R`aria مبتغيّرش أي سلوك: [[role="button"]] على div مش بيخليه ياخد focus ولا يشتغل بـ Enter، بيغيّر اللي قارئ الشاشة بيقوله بس. عشان كده القاعدة المشهورة «no ARIA is better than bad ARIA»: aria غلط أسوأ من مفيش.

الاسم (accessible name) بيتحسب بالترتيب: [[aria-labelledby]]، وبعدين [[aria-label]]، وبعدين الـ [[<label>]] أو [[alt]] أو محتوى العنصر، وآخر حاجة [[title]]. فلو فيه كلام ظاهر، هو الاسم، ومتحطش [[aria-label]] مختلف عنه (اللي بيستخدم التحكم بالصوت بيقول الكلام اللي شايفه).

[[aria-live="polite"]] بيستنى قارئ الشاشة يخلص كلامه ويقرا التغيير، و [[assertive]] بيقاطع (للأخطاء المهمة بس). والمنطقة لازم تبقى موجودة في الصفحة قبل ما المحتوى يتغير، مش تتعمل مع الرسالة.

و [[aria-hidden="true"]] بيخفي عنصر وأولاده عن قارئ الشاشة، للزينة بس. متحطوش على حاجة بتاخد focus.`,
            when: "مكونات بتفتح وتقفل (منيو، و accordion، و tabs)، ورسايل بتظهر (toast، وأخطاء فورم، وحفظ)، وأزرار الأيقونات. وقبل ما تكتبها: فيه primitive (Radix) بيعملها؟",
            mistakes: R`[[role="button"]] على div بدل button. [[aria-label]] على [[<div>]] عادي (غالبًا مش بيتقري لأن الـ div ملوش role). [[aria-hidden]] على عنصر فيه لينك أو زرار. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه aria-label بس ومن غير [[aria-expanded]] و [[aria-controls]]، والمنيو [[{open && ...}]] من غير id.`
          },
          teach: R`## قارئ الشاشة بيقرا شجرة، و aria بتكتب فيها

المتصفح بيبني من الـ HTML شجرة تانية جنب الـ DOM اسمها **accessibility tree**. كل عنصر فيها ليه ٣ حاجات: **role** (هو إيه: زرار، لينك، حقل)، و **name** (اسمه اللي بيتقري)، و **state** (حالته: مفتوح، غلط، متعلّم). قارئ الشاشة مبيشوفش الشاشة، بيقرا الشجرة دي بس. و aria (اختصار Accessible Rich Internet Applications) attributes بتكتب في الشجرة دي ومبتغيّرش أي حاجة في الشكل ولا السلوك.

عشان نشوف ده بعينينا، حطينا المثال في صفحة React (Vite) وفتحناها في Chrome، وقرينا الشجرة من Chrome DevTools Protocol (نفس اللي بيظهر في DevTools › Elements › Accessibility). وضفنا زرارين للتجربة بس: واحد بيحط رسالة خطأ، وواحد بيعمل «اتحفظ».

---

## ١. زرار المنيو

~~~text JSX
<button aria-expanded={open} aria-controls="mobile-menu" aria-label="القايمة" onClick={() => setOpen(!open)}>
  <Menu className="size-6" />
</button>
~~~

نفكّه حتة حتة:

- [[<button>]]: زرار HTML حقيقي. بياخد focus بالـ Tab، وبيشتغل بـ Enter و Space، و role بتاعه button من غير ما تكتب حاجة. ده ليه القاعدة الأولى «استخدم العنصر الصح الأول».
- [[aria-label="القايمة"]]: الزرار جواه أيقونة بس، فملوش كلام يتقري. الـ attribute ده بيدّيله اسم.
- [[aria-expanded={open}]]: [[open]] متغير state في React (true أو false). React بيكتبه في الـ HTML كـ [[aria-expanded="true"]] أو [[="false"]]، فالحالة بتتحدّث مع كل ضغطة.
- [[aria-controls="mobile-menu"]]: «الزرار ده بيتحكم في العنصر اللي الـ id بتاعه mobile-menu».
- [[onClick={() => setOpen(!open)}]]: [[!open]] = عكس القيمة الحالية، فكل ضغطة بتقلبها.
- [[<Menu className="size-6" />]]: أيقونة من lucide-react. و [[size-6]] من Tailwind = عرض وارتفاع 1.5rem (24px).

الشجرة اللي Chrome طلّعها للزرار أول ما الصفحة فتحت:

~~~text accessibility tree (Chrome)
button name="القايمة" expanded=false
~~~

وبعد Tab ثم Enter:

~~~text accessibility tree (Chrome)
button name="القايمة" focused=true expanded=true controls="mobile-menu"
~~~

لاحظ إن [[controls]] مظهرش غير لما المنيو اتفتحت: وهي مقفولة العنصر نفسه مش موجود في الشجرة (تحت هتعرف ليه)، فمفيش حاجة يشاور عليها.

### الأيقونة اتخفت لوحدها

قرينا الـ attributes بتاعة الـ [[<svg>]] اللي lucide-react (نسخة 1.52) طلّعه:

~~~text
class=lucide lucide-menu size-6 aria-hidden=true
~~~

[[aria-hidden="true"]] معناها «شيل العنصر ده وكل اللي جواه من الشجرة». الأيقونة زينة، والاسم جاي من [[aria-label]] على الزرار، فمش محتاجين قارئ الشاشة يقول «graphic» قبله.

### الاسم بيتحسب منين؟

Chrome بيقول هو جاب الاسم منين، وده اللي طلع للينك «الرئيسية»:

| الترتيب | المصدر | النتيجة |
|---|---|---|
| ١ | [[aria-labelledby]] | مش موجود |
| ٢ | [[aria-label]] | مش موجود |
| ٣ | contents (الكلام اللي جوه) | «الرئيسية» ← ده الاسم |
| ٤ | [[title]] | اتجاهل (superseded) |

يعني أول مصدر موجود بيكسب. وده ليه مينفعش تحط [[aria-label]] مختلف عن كلام ظاهر: هيغطي عليه.

---

## ٢. المنيو نفسها

~~~text JSX
<nav id="mobile-menu" hidden={!open}>
  <a href="/" aria-current={pathname === "/" ? "page" : undefined}>الرئيسية</a>
</nav>
~~~

- [[<nav>]]: role بتاعه navigation (landmark)، وقارئ الشاشة يقدر يقفز له.
- [[id="mobile-menu"]]: نفس القيمة اللي في [[aria-controls]]، وده الربط بينهم.
- [[hidden={!open}]]: الـ attribute [[hidden]] بيخلّي [[display: none]]، فالعنصر بيختفي من الشاشة ومن الـ Tab ومن الشجرة مرة واحدة. قسناه: بعد الفتح [[nav.hidden]] بقت [[false]] و [[display]] بقى [[block]].
- [[aria-current={... ? "page" : undefined}]]: الـ [[? :]] اسمه ternary: لو المسار [[/]] القيمة [[page]]، وإلا [[undefined]]، و React مبيكتبش attribute قيمته undefined خالص. في الـ DOM طلع [[<a href="/" aria-current="page">الرئيسية</a>]]. قارئ الشاشة بيقول معاه «current page» (ده من docs قارئات الشاشة، الـ CDP مبيعرضش الخاصية دي في قايمته).

شكل الشجرة كلها بعد الفتح (من [[ariaSnapshot]] بتاع Playwright):

~~~text
- button "القايمة" [expanded]
- navigation:
  - link "الرئيسية":
    - /url: /
~~~

---

## ٣. الحقل ورسالة الخطأ

~~~text JSX
<input id="email" aria-invalid={!!error} aria-describedby="email-error" />
<p id="email-error">{error}</p>
~~~

- [[!!error]]: علامتين [[!]] بيحوّلوا أي قيمة لـ true أو false. نص فاضي [[""]] يبقى false، و «اكتب الإيميل» يبقى true.
- [[aria-invalid]]: الحقل ده قيمته غلط.
- [[aria-describedby="email-error"]]: الكلام اللي في العنصر ده هو **وصف** الحقل، بيتقري بعد اسمه.

قبل الخطأ وبعده:

~~~text accessibility tree (Chrome)
قبل:  textbox name="" desc=""             invalid="false"
بعد:  textbox name="" desc="اكتب الإيميل" invalid="true"
~~~

> لاحظ [[name=""]]: المثال مركّز على aria، فالحقل ملوش [[<label>]]. في الحقيقة لازم [[<label for="email">الإيميل</label>]]، وإلا قارئ الشاشة هيقول «edit text» من غير اسم. (درس «form و label».)

---

## ٤. منطقة الإعلان

~~~text JSX
<div role="status" aria-live="polite">{saved && "اتحفظ"}</div>
~~~

- [[role="status"]]: منطقة رسايل حالة.
- [[aria-live="polite"]]: أي تغيير في الكلام جواها يتقري لما قارئ الشاشة يخلص اللي بيقوله.
- [[{saved && "اتحفظ"}]]: لو [[saved]] true يتعرض الكلام، ولو false مبيتعرضش حاجة.

Chrome طلّعها كده من أول ما الصفحة فتحت وهي فاضية:

~~~text accessibility tree (Chrome)
status live="polite" atomic=true relevant="additions text"
~~~

[[atomic=true]] جت من الـ role لوحده: بتتقري كلها كوحدة. والمهم إن المنطقة **موجودة من الأول** فاضية، وبعد الضغط بقت [[status: اتحفظ]]. لو كانت بتتعمل مع الرسالة، قارئات شاشة كتير مش هتلحق تراقبها.

---

## ملخص الـ attributes

| attribute | بيكتب في الشجرة | مثال القيمة |
|---|---|---|
| [[aria-label]] | name | «القايمة» |
| [[aria-expanded]] | state | true / false |
| [[aria-controls]] | علاقة بعنصر تاني | id |
| [[aria-current]] | state | page |
| [[aria-invalid]] | state | true / false |
| [[aria-describedby]] | description | id الرسالة |
| [[aria-live]] | المنطقة تعلن تغييرها | polite / assertive |
| [[aria-hidden]] | يشيل العنصر من الشجرة | true |

## الخلاصة

- العنصر الصح الأول ([[<button>]] و [[<nav>]] و [[<label>]])، و aria للي HTML ميعرفش يقوله: الحالة والعلاقات.
- aria بتغيّر الشجرة بس، مش السلوك: [[role="button"]] على div مش هياخد focus.
- القيمة لازم تتحدّث مع الـ state ([[aria-expanded={open}]] مش ثابتة).
- منطقة [[aria-live]] تبقى موجودة قبل الرسالة.`,
          lines: [
            "زرار المنيو: بيقول مفتوحة ولا لأ، وبيتحكم في أنهي عنصر، واسمه إيه.",
            "الأيقونة (lucide v1 بيخفيها عن قارئ الشاشة لوحده).",
            R`قفلة الزرار: جواه الأيقونة بس، فالاسم اللي بيتقري جاي من [[aria-label]] مش من محتواه.`,
            R`المنيو نفسها. [[hidden]] بيشيلها من الشاشة ومن الـ Tab ومن قارئ الشاشة.`,
            "لينك الصفحة الحالية: قارئ الشاشة بيقول «current page».",
            R`قفلة الـ nav؛ الـ [[id]] بتاعها هو اللي [[aria-controls]] في الزرار بيشاور عليه.`,
            "الحقل: غلط ولا لأ، ورسالة الخطأ بتاعته فين.",
            "الرسالة. قارئ الشاشة بيقراها بعد اسم الحقل.",
            "منطقة بتعلن التغييرات: لما «اتحفظ» تظهر بتتقري من غير ما الـ focus يتحرك."
          ],
          sol: R`مع [[aria-expanded]]: لما توصل للزرار بـ Tab، قارئ الشاشة بيقول حاجة زي «القايمة، زرار، مقفول» (Narrator بيقول collapsed، و VoiceOver بيقول «collapsed» أو «مطوي» حسب اللغة). اضغط Enter: بيقول «متفتح / expanded»، ولما تنزل بـ Tab تلاقي لينك «الرئيسية» ومعاه «current page» لو انت فيها. اضغط تاني: «مقفول».

من غير [[aria-expanded]]: بيقول «القايمة، زرار» بس، ولما تدوس مفيش أي كلام بيقولك إن حاجة اتفتحت؛ المستخدم مش عارف إن المنيو ظهرت ولا لأ غير لو كمّل Tab بالصدفة. ولو شلت [[aria-label]] كمان هيقول «زرار» من غير اسم، لأن الأيقونة لوحدها ملهاش كلام.

الصياغة بالظبط بتختلف من قارئ لقارئ ومن لغة لأخرى، المهم إن الحالة (expanded/collapsed) تتقال وتتغير. لو سمعت الحالة مش بتتغير، يبقى القيمة مش بتتحدّث مع الـ state (مثلًا كاتبها [[aria-expanded="true"]] ثابتة).`
        },
        {
          cmd: "focus-visible",
          title: "الموقع بيشتغل بالكيبورد لوحده؟",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[:focus-visible]] هيطابق ولا لأ في الحالات دي: دوست على [[<button>]] بالماوس، ودوست على [[<input>]] بالماوس، ووصلت للزرار بـ Tab؟ اكتب، وبعدين جرّب بـ [[document.activeElement.matches(":focus-visible")]] في الكونسول.`, done: R`الزرار بالماوس [[false]]، والـ input بالماوس [[true]] (حقول الكتابة بتبيّن الـ focus دايمًا)، والزرار بـ Tab [[true]]. اتقاس كده في Chrome 156.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>focus-visible</title></head>
<body>
<main>
  <h1>مين بيطابق؟</h1>
  <button id="b">زرار</button>
  <input id="i" aria-label="حقل">
</main>
</body>
</html>
~~~

~~~js console
document.activeElement.matches(":focus-visible")
~~~

**الإجابة:** زرار بالماوس [[false]]، و input بالماوس [[true]]، وزرار بـ Tab [[true]].

**المنطق:** المتصفح بيسأل «المستخدم محتاج يعرف الـ focus فين؟». اللي ضغط زرار بالماوس عارف، فمفيش حلقة. أما حقل الكتابة فهيكتب جواه، فلازم يعرف. والكيبورد دايمًا محتاج.

**الغلطة الشائعة:** تفتكر إن [[:focus-visible]] معناها «كيبورد بس». الـ input بالماوس بيطابق كمان، وده صح.

~~~text الناتج
زرار بالماوس:   false
input بالماوس:  true
زرار بـ Tab:    true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الموقع فيه [[*:focus { outline: none }]] عشان «شكله وحش»، وفيه [[:focus-visible { border-radius: 4px }]] بيغيّر شكل الزراير المدورة وقت الـ focus. شيل الاتنين واعمل حلقة focus واحدة بتبان على الفاتح والغامق: [[outline: 2px solid var(--ring)]] و [[outline-offset: 2px]].`, done: R`Tab على كل عنصر بيطلّع حلقة 2px أو أكتر، تباينها مع اللي جنبها 3:1 أو أكتر في الثيمين (من مربع اللون في DevTools)، وشكل الزرار المدوّر مبيتغيرش، وبالماوس مفيش حلقة على الزراير.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حلقة focus</title>
<style>
  :root { --bg: #ffffff; --fg: #0f172a; --ring: #0f766e; color-scheme: light; }
  :root[data-theme="dark"] { --bg: #0b1120; --fg: #f1f5f9; --ring: #2dd4bf; color-scheme: dark; }
  body { margin: 0; padding: 2rem; background: var(--bg); color: var(--fg); font-family: system-ui, sans-serif; }
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
  .pill { padding: .5rem 1.25rem; border: 1px solid currentColor; border-radius: 999px; background: none; color: inherit; font: inherit; }
</style>
</head>
<body>
<main>
  <h1>الحلقة</h1>
  <button class="pill" id="a">زرار مدوّر</button>
  <a id="b" href="#x">لينك</a>
</main>
</body>
</html>
~~~

**ليه شغال:**

- [[:focus-visible]] بيغطي كل عنصر، فمش محتاج تكتبها لكل كومبوننت.
- [[--ring]] توكن ليه قيمة لكل ثيم.
- [[outline]] مبيغيّرش الـ layout، و [[outline-offset]] بيبعّده عشان يبان.
- مسحنا [[border-radius]] من قاعدة الـ focus، فالـ pill فضل مدوّر. و [[outline]] في المتصفحات الحديثة بيتبع الـ radius.
- مسحنا [[*:focus { outline: none }]] خالص. دي كانت بتشيل الحلقة من كل الناس.

**التباين:** 3:1 مطلوب بين الحلقة واللي حواليها (بند 1.4.11): [[#0f766e]] على الأبيض 5.47، و [[#2dd4bf]] على الغامق 10.12.

**الغلطة الشائعة:** تسيب [[outline: none]] وتضيف [[box-shadow]] بس. الظل بيختفي في وضع Forced Colors بتاع ويندوز، و outline لأ.

~~~text الناتج
Tab على الزرار:   solid 2px ، offset 2px ، rgb(15, 118, 110) ، radius 999px
Tab على اللينك:   solid 2px ، offset 2px ، rgb(15, 118, 110)
ضغطة ماوس:        outline-style none ، radius 999px
الثيم الغامق:     solid 2px ، rgb(45, 212, 191)
axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** skip link و [[<main id="main" tabindex="-1">]] في صفحة طويلة بهيدر sticky ارتفاعه 64px. امشي بـ Tab لتحت: لينكات بتستخبى تحت الهيدر. صلّحها بـ [[scroll-padding-top: 72px]] على html (WCAG 2.4.11 Focus Not Obscured).`, done: R`أول Tab بيطلّع لينك التخطي و Enter بينقل الـ focus لـ main، ولما تمشي بـ Tab للآخر [[document.activeElement.getBoundingClientRect().top]] دايمًا أكبر من 64، يعني مفيش عنصر عليه focus تحت الهيدر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سكرول تحت هيدر ثابت</title>
<style>
  html { scroll-padding-top: 72px; }
  body { margin: 0; font-family: system-ui, sans-serif; }
  .skip { position: absolute; inset-inline-start: 1rem; inset-block-start: -4rem; z-index: 2; padding: .5rem 1rem; background: #fff; }
  .skip:focus { inset-block-start: .5rem; }
  header { position: sticky; top: 0; z-index: 1; height: 64px; display: flex; align-items: center; gap: 1rem; padding-inline: 1rem; background: #0f172a; }
  header a { color: #fff; }
  main { padding: 1rem; }
  main:focus { outline: none; }
  p { margin-block: 2.5rem; }
</style>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header><a href="/">الرئيسية</a><a href="/about">عن الموقع</a></header>
<main id="main" tabindex="-1">
  <h1>المقال</h1>
  <p><a href="#1">لينك 1</a></p><p><a href="#2">لينك 2</a></p><p><a href="#3">لينك 3</a></p><p><a href="#4">لينك 4</a></p>
  <p><a href="#5">لينك 5</a></p><p><a href="#6">لينك 6</a></p><p><a href="#7">لينك 7</a></p><p><a href="#8">لينك 8</a></p>
  <p><a href="#9">لينك 9</a></p><p><a href="#10">لينك 10</a></p><p><a href="#11">لينك 11</a></p><p><a href="#12">لينك 12</a></p>
</main>
</body>
</html>
~~~

**ليه شغال:**

- **لينك التخطي:** مستخبي فوق الشاشة وبيظهر مع [[:focus]]، وأول Tab بيوصله. Enter بينقل الـ focus لـ [[main]]، و [[tabindex="-1"]] بيخلي العنصر ياخد focus بالكود من غير ما يدخل ترتيب Tab.
- **[[scroll-padding-top: 72px]]:** المتصفح لما يعمل scroll لعنصر عليه focus بيسيب 72px فاضية فوق: ارتفاع الهيدر 64 وهامش 8.

المشكلة بتبان أكتر لما ترجع بـ Shift+Tab: العنصر بيطلع من فوق، تحت الهيدر.

**الغلطة الشائعة:** تجرّب لتحت بس. Tab لقدام غالبًا بيخلي العنصر تحت، و Shift+Tab هو اللي بيكشف المشكلة.

~~~text الناتج
Tab الأول:  «اتخطى للمحتوى» ظاهر عند top = 8
Enter:      activeElement = main

Tab لتحت على 12 لينك: أصغر top = 184.4

Shift+Tab بـ scroll-padding-top: 72px:
423.4 ، 362.4 ، 301.4 ، 240.4 ، 179.4 ، 118.4 ، 72.4
كله أكبر من 64.

Shift+Tab من غيره:
239.4 ، 178.4 ، 117.4 ، 56.4 ، 21.5
آخر رقمين تحت الهيدر.
axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** مودال بـ [[<dialog>]] و [[showModal()]]: فيه حقل وزرار «قفل». افتحه بزرار، وامشي جواه بـ Tab، واقفله بـ Escape.`, done: R`أول ما يفتح الـ focus على الحقل، و Tab بيلف بين الحقل والزرار (وممكن يعدّي على شريط المتصفح) ومبيوصلش لأي عنصر ورا المودال، وبعد Escape [[document.activeElement]] هو زرار الفتح. اتقاس في Chrome 156: الترتيب حقل ← قفل ← المتصفح ← حقل، وبعد Escape رجع للزرار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>dialog</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  dialog { padding: 1.5rem; border: 0; border-radius: .75rem; }
  dialog::backdrop { background: #0008; }
</style>
</head>
<body>
<main>
  <h1>الملف الشخصي</h1>
  <button id="open" type="button">عدّل الاسم</button>
  <a id="behind" href="#x">لينك ورا المودال</a>
</main>
<dialog id="dlg" aria-labelledby="dlg-title">
  <h2 id="dlg-title">الاسم الجديد</h2>
  <label for="name">الاسم</label>
  <input id="name">
  <button id="close" type="button">قفل</button>
</dialog>
<script>
  const dlg = document.getElementById("dlg");
  document.getElementById("open").onclick = () => dlg.showModal();
  document.getElementById("close").onclick = () => dlg.close();
$__lt/script>
</body>
</html>
~~~

**[[showModal()]] بيعمل إيه:** بيحط المودال في top layer، وبيعمل الصفحة ورا [[inert]]، فمفيش ضغط ولا Tab يوصلها. بينقل الـ focus لأول عنصر، و Escape بيقفل، والـ focus بيرجع لوحده للزرار اللي فتحه. ده كله من غير ولا سطر trap.

**[[aria-labelledby]]:** بيدّي المودال اسم من العنوان.

**[[BODY]] في الترتيب:** ده شريط المتصفح، مش عنصر ورا المودال. المودال الأصلي مبيحبسش المستخدم جوه الصفحة، وده مسموح.

**الغلطة الشائعة:** تستخدم [[dlg.show()]]. ده بيفتحه عادي من غير modal، فلا فيه backdrop ولا inert ولا Escape.

~~~text الناتج
بعد الفتح:      name
Tab 1:          close
Tab 2:          BODY (شريط المتصفح)
Tab 3:          name
بعد Escape:     open (زرار الفتح) ، dialog.open = false
axe صفر
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها بالترتيب: [[<button>]] ثم [[<input>]] ثم [[<div tabindex="2">]] ثم [[<div tabindex="1">]] ثم [[<a href="#">]]. ترتيب Tab هيبقى إيه؟ وليه الـ tabindex الموجب ممنوع تقريبًا؟`, done: R`الترتيب: [[tabindex="1"]] ثم [[tabindex="2"]] ثم الزرار ثم الـ input ثم اللينك (الموجب بيتنط قبل كل الصفحة)، واتأكدت بالضغط على Tab. وكتبت إن الحل [[0]] أو [[-1]] بس، والترتيب ييجي من ترتيب الـ HTML.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>ترتيب Tab</title></head>
<body>
<main>
  <h1>الترتيب</h1>
  <button id="btn">زرار</button>
  <input id="inp" aria-label="حقل">
  <div id="two" tabindex="2">tabindex 2</div>
  <div id="one" tabindex="1">tabindex 1</div>
  <a id="lnk" href="#">لينك</a>
</main>
</body>
</html>
~~~

**الإجابة:** [[tabindex="1"]] ثم [[tabindex="2"]] ثم الزرار ثم الـ input ثم اللينك.

**القاعدة:** المتصفح بياخد كل الأرقام الموجبة الأول بترتيبها، وبعدين كل اللي عليهم 0 أو طبيعي، بترتيب الـ HTML.

**ليه الموجب ممنوع تقريبًا:** عنصر واحد بـ [[tabindex="1"]] بيتنط قبل الصفحة كلها، حتى الهيدر. ولو حد زوّد عنصر جديد، الترتيب كله بيتلخبط، وصيانة أرقام على موقع كامل مستحيلة.

- [[0]]: اعمل العنصر يتوصله بـ Tab، بترتيب الـ HTML.
- [[-1]]: بالكود بس.

**الغلطة الشائعة:** تصلّح ترتيب غريب بـ tabindex موجب. السبب غالبًا إن ترتيب الـ HTML مش مطابق الشكل، فصلّح الـ HTML.

~~~text الناتج
Tab: one ← two ← btn ← inp ← lnk
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** mega menu بيفتح بـ [[:hover]] بس، فبالكيبورد اللينكات اللي جواه مخفية ومبتتوصلش. خليه يفتح بالكيبورد كمان من غير JavaScript بـ [[:focus-within]]، ويفضل مفتوح وانت ماشي جواه بـ Tab، ويتقفل لما تخرج منه.`, done: R`بالماوس بعيد: Tab على عنوان القسم بيفتح المنيو، و Tab جواه بيعدّي على كل لينك وهو باين، و Tab بعد آخر لينك بيقفله. والـ outline باين على كل لينك.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>mega menu</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  nav > ul { display: flex; gap: 1rem; margin: 0; padding: 1rem; list-style: none; }
  .has-mega { position: relative; }
  .mega { position: absolute; inset-block-start: 100%; inset-inline-start: 0; min-inline-size: 14rem; margin: 0; padding: 1rem; list-style: none;
          background: #fff; box-shadow: 0 .5rem 1rem #0003; visibility: hidden; opacity: 0; }
  .has-mega:hover .mega,
  .has-mega:focus-within .mega { visibility: visible; opacity: 1; }
  a:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
</style>
</head>
<body>
<nav aria-label="الرئيسية">
  <ul>
    <li class="has-mega">
      <a id="top" href="/products">المنتجات</a>
      <ul class="mega">
        <li><a id="m1" href="/products/audio">سماعات</a></li>
        <li><a id="m2" href="/products/watches">ساعات</a></li>
        <li><a id="m3" href="/products/bags">شنط</a></li>
      </ul>
    </li>
    <li><a id="next" href="/offers">العروض</a></li>
  </ul>
</nav>
<main><h1>الرئيسية</h1></main>
</body>
</html>
~~~

**ليه شغال:**

- [[:focus-within]] على الأب بيطابق لو أي حد جواه عليه focus، فالـ selector الواحد بيغطي الماوس والكيبورد.
- [[visibility: hidden]]، مش [[display: none]] لوحده، بتشيل اللينكات من Tab وهي مقفولة. ولما الأب ياخد focus تبقى [[visible]]، فـ Tab اللي بعدها يدخل.
- لما الـ focus يخرج من الـ [[li]]، الـ selector مبيطابقش، فبتقفل لوحدها.

**ملاحظة من 1.4.13:** المحتوى اللي بيظهر بالـ hover لازم الماوس يقدر يتحرك عليه، وعشان كده [[.mega]] جوه الـ [[li]].

**الغلطة الشائعة:** تخبّي بـ [[opacity: 0]] بس، فالمنيو يبان مقفول بس Tab يمشي جوه لينكات مش شايفها.

~~~text الناتج
الماوس بعيد:
Tab 1  top   (المنتجات)   القايمة visible
Tab 2  m1                 visible
Tab 3  m2                 visible
Tab 4  m3                 visible
Tab 5  next               hidden

scripts: 0 ، axe صفر
~~~` },
          ],
          desc: R`جرّب موقعك بـ Tab و Shift+Tab و Enter و Space و Escape بس. كل حاجة بتتضغط لازم يتوصلها، والـ focus لازم يبقى باين، والترتيب منطقي.

[[:focus-visible]] بيظهر الـ outline لما المستخدم ماشي بالكيبورد بس، فمفيش سبب تشيله. و [[tabindex="0"]] بيدخّل عنصر في الـ Tab (نادرًا تحتاجه)، و [[tabindex="-1"]] بيخليه ياخد focus من الكود بس. ولينك «تخطى للمحتوى» كأول حاجة في الصفحة بيوفّر على مستخدم الكيبورد 20 Tab.`,
          example: R`<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
  تخطى للمحتوى
</a>
<main id="main" tabIndex={-1}>...</main>
<button className="rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
// globals.css
:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }`,
          try: R`سيب الماوس وامشي في موقعك بالكيبورد بس: سجّل دخول، وافتح منيو، واقفل مودال. كل مرة الـ focus يختفي أو يروح مكان غريب اكتبها. وبعدين دوس Tab أول ما الصفحة تفتح وشوف لينك التخطي.`,
          flag: "script",
          deep: {
            why: R`ناس كتير مش بتستخدم ماوس: إعاقة حركية، أو نظر ضعيف مع قارئ شاشة، أو مبرمج بيحب الكيبورد. وأشهر غلطة [[outline: none]] على كل حاجة عشان «شكلها وحش»، فالموقع يبقى مستحيل من الكيبورد.`,
            how: R`الـ Tab بيمشي على العناصر اللي بتاخد focus لوحدها (a بـ href، و button، و input، و select، و textarea، و summary) بترتيبها في الـ HTML. [[tabindex="0"]] بيضيف أي عنصر للترتيب ده في مكانه الطبيعي. [[tabindex="-1"]] بيخليه يقبل [[element.focus()]] من غير ما يدخل الـ Tab. وأي رقم موجب ([[tabindex="3"]]) بيعمل ترتيب منفصل ويلخبط كل حاجة: متستخدموش.

[[:focus]] بتتطبق مع أي focus (ماوس أو كيبورد). [[:focus-visible]] المتصفح هو اللي بيقرر: لما تدوس بالماوس على زرار مبتظهرش، ولما تيجي بـ Tab بتظهر، وفي حقول الكتابة دايمًا بتظهر (لأنك هتكتب). فالـ outline موجود للي محتاجه ومش بيضايق الباقي.

إدارة الـ focus: لما تفتح مودال حط الـ focus جواه، ولما يقفل رجّعه للزرار. لما تمسح عنصر من قايمة، ودّي الـ focus للي بعده. لما تتنقل لصفحة في SPA، ودّيه للعنوان أو الـ main. و Radix بيعمل أول اتنين لوحده.

و attribute [[inert]] بيخلي جزء كامل من الصفحة مش بيتوصله ولا بيتقري، مفيد للمحتوى اللي ورا drawer مفتوح.`,
            when: R`مع كل مكون تفاعلي بتعمله: اختبره بالكيبورد قبل ما تقول خلص. و [[focus-visible:]] على كل زرار ولينك شكله مخصص.`,
            mistakes: R`[[outline: none]] من غير بديل. [[tabindex]] موجب. div بيتضغط ومش بيتوصله. مودال بيتقفل والـ focus يرجع لأول الصفحة. وفي Tailwind v4 [[outline-none]] بقى بيشيل الـ outline فعلًا، و [[outline-hidden]] هو اللي بيسيب outline شفاف يبان في وضع التباين العالي (forced colors) بتاع ويندوز.`
          },
          teach: R`## ٣ حاجات: لينك تخطي، ومكان يستقبل الـ focus، و outline يبان بالكيبورد بس

المثال فيه لينك «تخطى للمحتوى» مستخبي لحد ما ياخد focus، و [[<main>]] يقدر يستقبل الـ focus لما اللينك يتداس، وزرار عليه outline بلون البراند. حطيناه في صفحة React + Tailwind 4.3.3 (Vite) بـ [[dir="rtl"]] وشاشة 800×600، وضفنا قبل الـ main هيدر فيه لينكين عشان نشوف التخطي بيعدّي عليهم، ومشينا فيها بالكيبورد من Playwright في Chrome، وقسنا كل خطوة بـ [[getComputedStyle]] و [[getBoundingClientRect]].

---

## ١. لينك التخطي

~~~text JSX
<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
  تخطى للمحتوى
</a>
~~~

[[href="#main"]]: الـ [[#]] معناها «عنصر في نفس الصفحة الـ id بتاعه main». الضغط عليه بينزل للعنصر ده من غير تحميل صفحة.

### [[sr-only]]: مستخبي من الشاشة بس

sr = screen reader. القاعدة اللي Tailwind طلّعها (من ملف الـ CSS بعد الـ build):

~~~text CSS ناتج
.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}
~~~

يعني العنصر بقى ١×١ بكسل، و [[clip-path: inset(50%)]] قصّه لحد ما مفيش حاجة باينة. بس هو لسه موجود في الـ DOM، فقارئ الشاشة بيقراه والـ Tab بيوصله. ولو كنا استخدمنا [[display: none]] كان اختفى من الاتنين.

### [[focus:]]: كل اللي بعدها يتطبق وقت الـ focus بس

[[focus:X]] بتطلّع قاعدة على [[:focus]]. القواعد اللي طلعت:

| الكلاس | القاعدة |
|---|---|
| [[focus:not-sr-only]] | يرجّع كل حاجة: [[clip-path:none]] و [[width:auto]] و [[height:auto]] و [[position:static]]... |
| [[focus:fixed]] | [[position:fixed]]: مثبّت في الشاشة فوق أي حاجة |
| [[focus:top-2]] | [[top: calc(var(--spacing) * 2)]] = 0.5rem = 8px |
| [[focus:inset-s-2]] | [[inset-inline-start]] = 8px. الـ s = start: بداية السطر، يمين في العربي وشمال في الإنجليزي |
| [[focus:z-50]] | [[z-index: 50]]: فوق باقي الصفحة |
| [[focus:rounded]] | [[border-radius: .25rem]] |
| [[focus:bg-white]] | خلفية بيضا |
| [[focus:p-3]] | padding = 12px |

ليه [[fixed]] بيكسب [[static]] اللي جاي من [[not-sr-only]]؟ لأن Tailwind بيرتّب القواعد في الملف، و [[focus:fixed]] جاية بعدها.

### القياس

~~~text اتقاس في Chrome
وقت التحميل:   rect x=800 y=-1  1×1          position=absolute  clip=inset(50%)
بعد أول Tab:   rect x=667 y=8   124.6×48     position=fixed     clip=none  bg=rgb(255,255,255)  padding=12px  z=50
~~~

أول Tab اللينك ظهر فوق على اليمين: [[y=8]] من [[top-2]]، وحافته اليمين عند 792 يعني 8px من حافة الشاشة (800) من [[inset-s-2]]. والارتفاع 48 = سطر الكلام + 12px فوق و 12px تحت.

---

## ٢. الـ main

~~~text JSX
<main id="main" tabIndex={-1}>...</main>
~~~

- [[id="main"]]: الهدف بتاع [[#main]].
- [[tabIndex={-1}]]: في JSX بيتكتب [[tabIndex]] بحرف I كبير، وهو [[tabindex]] في HTML. القيمة [[-1]] معناها «يقبل focus من الكود أو من لينك، بس الـ Tab ميقفش عنده».

بعد Enter على لينك التخطي، ثم Tab:

~~~text اتقاس في Chrome
Enter:  activeElement = MAIN#main   location.hash = #main   (لينك التخطي رجع 1×1)
Tab:    activeElement = BUTTON#save
~~~

يعني الـ focus نفسه بقى على الـ main، والـ Tab اللي بعده بدأ من جواه وعدّى لينكين الهيدر.

وجربنا نفس الصفحة من غير [[tabIndex]] (HTML عادي): بعد Enter الصفحة نزلت، بس [[document.activeElement]] فضل [[BODY]]، يعني مفيش عنصر عليه focus وقارئ الشاشة مش هيقول إنه وصل حاجة. (الـ Tab الجاي في Chrome كمّل من الـ main برضه، لأن المتصفح بيفتكر «نقطة البداية»، بس ده مش كفاية لقارئ الشاشة.) فـ [[tabIndex={-1}]] هو اللي بيخلّي الـ focus يتنقل فعلًا.

---

## ٣. الزرار

~~~text JSX
<button className="rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
~~~

- [[rounded-lg]] تدوير 8px، و [[px-4]] padding 16px يمين وشمال، و [[py-2]] 8px فوق وتحت.
- [[focus-visible:]] زي [[focus:]] بس على [[:focus-visible]]. والقواعد اللي طلعت:

~~~text CSS ناتج
.focus-visible\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}
.focus-visible\:outline-offset-2:focus-visible{outline-offset:2px}
.focus-visible\:outline-brand:focus-visible{outline-color:var(--color-brand)}
~~~

[[outline-brand]] اشتغلت لأن الـ CSS فيه [[@theme { --color-brand: oklch(0.55 0.2 265); }]] (درس [[@theme]]). و [[outline-offset]] = مسافة بين الزرار والخط حواليه.

القياس بعد ما وصلنا للزرار بالـ Tab، وبعد ما دسنا عليه بالماوس:

| إزاي الـ focus جه | [[:focus]] | [[:focus-visible]] | الـ outline |
|---|---|---|---|
| Tab | true | true | [[solid 2px oklch(0.55 0.2 265)]] و offset 2px |
| ضغطة ماوس | true | false | [[none]] |

وده الفرق كله: المتصفح هو اللي بيقرر [[:focus-visible]]، وبيقول «أيوه» مع الكيبورد و «لأ» مع الماوس على الزراير. وفي حقول الكتابة بيقول «أيوه» دايمًا.

---

## ٤. نفس الفكرة بـ CSS عادي

~~~text globals.css
:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }
~~~

سطر [[// globals.css]] في المثال مجرد اسم الملف، والسطر اللي بعده CSS. الـ selector هنا [[:focus-visible]] لوحده من غير عنصر قبله، يعني «أي عنصر». [[outline]] اختصار لـ 3 خصائص مرة واحدة: العرض (2px) والشكل (solid) واللون. وبيطبق على الموقع كله، فمش محتاج تكتب كلاسات على كل زرار.

وجربنا كمان: الـ main لما بياخد focus من الكود بعد ضغطة ماوس، [[:focus-visible]] بتطلع false والـ outline [[none]]. ولو اتنقل له بالكيبورد (Enter على اللينك) بيبقى عليه outline، فلو مش عايزه على عنصر مش تفاعلي زي main أو h1 اشيله منه هو بس.

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[sr-only]] | يخبي من الشاشة ويسيب العنصر لقارئ الشاشة والـ Tab |
| [[focus:not-sr-only focus:fixed ...]] | يظهر لينك التخطي فوق في ركن البداية وقت الـ focus بس |
| [[tabIndex={-1}]] | الـ main يستقبل الـ focus من اللينك، والـ Tab الجاي يكمّل من جواه |
| [[focus-visible:outline-*]] | outline بالكيبورد بس |
| [[:focus-visible { outline: ... }]] | نفس الكلام للموقع كله بقاعدة واحدة |

ومتشيلش الـ outline من غير بديل: [[:focus-visible]] أصلًا مش هيضايق اللي بيستخدم الماوس.`,
          lines: [
            R`لينك التخطي: مخفي بـ [[sr-only]]، وأول ما ياخد focus بيظهر فوق في ركن البداية.`,
            R`نص اللينك بالعربي، وهو اللي بيتقري وبيبان لما الـ focus يوصله.`,
            R`قفلة اللينك؛ لازم يبقى أول عنصر بياخد focus في الصفحة عشان أول Tab يوصله.`,
            R`المحتوى. [[tabIndex={-1}]] عشان الـ focus يتنقل له فعلًا لما تدوس اللينك.`,
            "زرار عليه outline واضح بلون البراند، لما ييجي من الكيبورد بس.",
            "أو قاعدة واحدة للموقع كله: أي عنصر ياخد focus من الكيبورد عليه outline."
          ],
          sol: R`دي تجربة ملهاش إجابة واحدة، بس النتيجة الكويسة شكلها قايمة زي دي: «بعد ما فتحت المودال الـ focus فضل ورا على الصفحة»، «زرار إغلاق المنيو مش بيتوصله»، «الـ dropdown بيفتح بالماوس بس»، «بعد ما المودال يقفل الـ focus بيروح لأول الصفحة»، «الـ outline مختفي على الزراير لأن فيه [[outline: none]] في الـ CSS»، «ترتيب الـ Tab بيقفز من الهيدر للفوتر بسبب [[tabindex]] موجب». كل واحدة منهم bug حقيقي تصلّحه.

أول ما الصفحة تفتح وتدوس Tab: لينك «تخطى للمحتوى» بيظهر فوق في الركن ناحية بداية السطر (يمين في العربي) على خلفية بيضا. Enter: الصفحة بتنزل للـ main والـ focus نفسه بيبقى عليه (ده سبب [[tabIndex={-1}]]: من غيره [[document.activeElement]] بيفضل الـ body)، والـ Tab اللي بعده بيبدأ من جوه المحتوى مش من الهيدر. ولو دوست عليه بالماوس (نادر) مش هيبان outline، بالكيبورد هتلاقي outline الـ brand بـ offset 2px.

لو لينك التخطي مظهرش، اتأكد إنه أول عنصر في الـ body فعلًا وإن مفيش حاجة قبله بتاخد الـ focus (زي بانر الكوكيز)، وإن [[focus:not-sr-only]] مكتوبة صح.`
        },
        {
          cmd: "contrast ratio",
          title: "الكلام الرمادي الفاتح اللي محدش بيعرف يقراه",
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** احسب بالمعادلة بإيدك (أو في الكونسول) تباين [[#777777]] و [[#767676]] على الأبيض. الفرق بينهم درجة واحدة في كل قناة: الاتنين بيعدّوا AA؟`, done: R`[[#777777]] = 4.48:1 ساقط، و [[#767676]] = 4.54:1 ناجح. عرفت إن الحد بالظبط 4.5 مفيهوش تقريب، وإن «قريب من 4.5» مش كفاية.`, sol: R`~~~js console
const ch = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const L = (v) => { const c = ch(v); return 0.2126 * c + 0.7152 * c + 0.0722 * c; };   // رمادي: القنوات متساوية
const ratio = (v) => 1.05 / (L(v) + 0.05);
console.log(ratio(0x77).toFixed(2), ratio(0x76).toFixed(2));
~~~

**بالإيد:** الأبيض إضاءته 1، فالمعادلة [[(1 + 0.05) / (L + 0.05)]]. و [[0x77]] = 119، فالقناة 119 ÷ 255 = 0.4667، وبعد المنحنى ≈ 0.184. فالنسبة 1.05 ÷ 0.234 ≈ 4.48.

**القراية:** المطلوب في AA للكلام العادي 4.5:1. درجة واحدة في كل قناة نقلتك من ساقط لناجح.

**الغلطة الشائعة:** تقرّب 4.48 لـ 4.5. WCAG مفيهاش تقريب: الحد 4.5 بالظبط، و 4.499 ساقط.

~~~text الناتج
#777777 على الأبيض: 4.48:1  ساقط
#767676 على الأبيض: 4.54:1  ناجح
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اكتب [[contrast(a, b)]] بتاخد لونين hex وترجّع النسبة بحرفين بعد العلامة (luminance لكل قناة، و [[(L1 + 0.05) / (L2 + 0.05)]]). واكتب اختبارات: أسود وأبيض = 21، ونفس اللون = 1، والترتيب مبيفرقش، و [[#777777]] على الأبيض = 4.48.`, done: R`الأربع اختبارات بيعدّوا، والدالة بترجّع نفس رقم DevTools لـ ٣ ألوان من موقعك.`, sol: R`~~~js contrast.mjs
function channel(v) {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}
~~~

~~~js contrast.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { contrast } from "./contrast.mjs";

test("أسود وأبيض = 21", () => assert.equal(contrast("#000000", "#ffffff"), 21));
test("نفس اللون = 1", () => assert.equal(contrast("#123456", "#123456"), 1));
test("الترتيب مبيفرقش", () => assert.equal(contrast("#777777", "#ffffff"), contrast("#ffffff", "#777777")));
test("#777777 على الأبيض = 4.48", () => assert.equal(contrast("#777777", "#ffffff"), 4.48));
~~~

~~~bash
node --test contrast.test.mjs
~~~

**الخطوات:**

1. [[channel]]: يحوّل القناة لقيمة خطية، لأن العين مش بتشوف الدرجات بالتساوي.
2. [[luminance]]: الأخضر وزنه 0.7152 لأن العين أحسست بيه.
3. [[contrast]]: الأفتح فوق، و 0.05 بتمنع القسمة على صفر. و [[sort]] بتخلي الترتيب ميفرقش.

**الغلطة الشائعة:** تستخدم [[0.03928]] بدل [[0.04045]]. دي قيمة قديمة في نص WCAG، والفرق مش بيأثر على ألوان 8-bit، بس الثانية هي الصح في sRGB. أو تنسى [[Number]]، فـ [[toFixed]] ترجّع نص.

~~~text الناتج
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في كارت منتج: الكلام الباهت [[#8a8f98]] على أبيض، و badge «عرض» خلفيته [[#f59e0b]] (كهرماني) والكلام عليه أبيض. قيس الاتنين وصلّحهم من غير ما الكهرماني يتغير.`, done: R`قبل: 3.25:1 للباهت و 2.15:1 للـ badge. بعد: الباهت [[#6b7280]] (‏4.83:1)، والـ badge فضل كهرماني بس الكلام عليه غامق [[#1f2937]] (‏6.83:1)، و axe مبيطلّعش [[color-contrast]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت منتج</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; background: #fff; }
  .muted { color: #6b7280; }
  .badge { display: inline-block; padding: .125rem .625rem; border-radius: 1rem; background: #f59e0b; color: #1f2937; }
</style>
</head>
<body>
<main>
  <h1>سماعة لاسلكية</h1>
  <p class="muted">بطارية 30 ساعة</p>
  <span class="badge">عرض</span>
</main>
</body>
</html>
~~~

**التصليح:**

- الباهت: [[#8a8f98]] فاتح زيادة، فنغمّقه لـ [[#6b7280]].
- الـ badge: الكهرماني لازم يفضل. الأبيض عليه ساقط، فنغيّر لون الكلام مش الخلفية: الكهرماني فاتح، فالكلام الغامق هو الحل.

**القاعدة:** لما الخلفية ثابتة، حرّك لون الكلام.

**الغلطة الشائعة:** تكبّر الخط أو تعمله bold. الكلام الكبير (24px، أو 18.66px عريض) بس اللي بياخد 3:1، و 2.15 ساقط حتى كده.

~~~text الناتج
                       قبل       بعد
الكلام الباهت          3.25:1    4.83:1
الـ badge              2.15:1    6.83:1

axe قبل: color-contrast (1)
axe بعد: صفر
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** لون الـ placeholder الافتراضي في Chrome كام؟ ([[getComputedStyle(input, "::placeholder").color]]). وتباينه كام على الأبيض؟ وقارنه بـ [[#a9a9a9]] اللي ديزاينر حطه «عشان أنعم».`, done: R`Chrome 156 بيدّي [[rgb(117, 117, 117)]] = [[#757575]] ‏4.61:1 ناجح، و [[#a9a9a9]] ‏2.35:1 ساقط. فالتغيير «الناعم» كسر حاجة كانت سليمة.`, sol: R`~~~js console
const input = document.querySelector("input");
getComputedStyle(input, "::placeholder").color;
~~~

**القراية:** الافتراضي في Chrome 156 [[rgb(117, 117, 117)]] = [[#757575]]، وده معمول عشان يعدّي 4.5:1 على الأبيض. لون الديزاينر [[#a9a9a9]] بيقع.

**الـ placeholder بيتحسب؟** أيوه، كلام وبيتقري، فـ 4.5:1 مطلوبة.

**الغلطة الشائعة:** axe مطلّعش حاجة على [[#a9a9a9]] في التجربة، فالتقرير نضيف والمشكلة موجودة. قس بإيدك. وكمان الـ placeholder مش بديل لـ label.

~~~text الناتج
Chrome:    rgb(117, 117, 117) = #757575 = 4.61:1  ناجح
الديزاينر: #a9a9a9 = 2.35:1  ساقط
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** شغّل axe على صفحة (من الـ extension أو [[@axe-core/playwright]]) وخد الـ JSON. في [[violations]] دوّر على [[color-contrast]]، وطلّع من كل [[nodes[i].any[0].data]] الـ [[fgColor]] و [[bgColor]] و [[contrastRatio]] و [[expectedContrastRatio]] في جدول متترتب من الأسوأ.`, done: R`جدول بكل عنصر ساقط ونسبته والمطلوب، والأسوأ فوق، وكل لون مكرر في أكتر من عنصر بقى صف واحد بعدد مرات ظهوره، فعرفت أنهي توكن واحد لو اتصلّح هيحل أكتر مشاكل.`, sol: R`~~~js report.mjs
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch({ channel: "chrome" });
const page = await (await browser.newContext()).newPage();
await page.goto(process.argv[2]);

const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
await browser.close();

const rows = new Map();
for (const v of violations) {
  for (const node of v.nodes) {
    const d = node.any[0].data;
    const key = $__bt$__{d.fgColor} على $__{d.bgColor}$__bt;
    const row = rows.get(key) ?? { key, ratio: d.contrastRatio, need: d.expectedContrastRatio, count: 0 };
    row.count++;
    rows.set(key, row);
  }
}

const sorted = [...rows.values()].sort((a, b) => a.ratio - b.ratio);
for (const r of sorted) console.log(r.ratio, "المطلوب", r.need, "×" + r.count, r.key);
~~~

~~~bash
npm i -D playwright-core @axe-core/playwright
node report.mjs http://localhost:4000/page
~~~

**ليه [[Map]]:** المفتاح هو الزوج (لون الكلام على الخلفية). لو ٣ عناصر بنفس الزوج، ده صف واحد بعدد ٣، وده معناه توكن واحد يتصلّح ويحل ٣ مشاكل.

**ليه الترتيب مش كفاية:** الأسوأ رقمًا هو اللي فوق، بس ابدأ بأكبر عدد. هنا 2.14 مرة واحدة، و 2.32 تلات مرات.

**[[node.any[0].data]]:** axe بيحط تفاصيل كل فحص هناك، ومعاه [[fgColor]] و [[bgColor]] و [[contrastRatio]] و [[expectedContrastRatio]].

**الغلطة الشائعة:** تلف على [[violations]] بس وتنسى [[nodes]]. كل violation هو rule واحدة، والعناصر جواها.

~~~text الناتج
2.14 المطلوب 4.5:1 ×1 #ffffff على #f59e0b
2.32 المطلوب 4.5:1 ×3 #aaaaaa على #ffffff
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من WCAG 2.2 بند 1.4.11 Non-text Contrast: إيه اللي محتاج 3:1 غير الكلام؟ وإيه المستثنى؟`, done: R`لستة: حدود الحقول، وحلقة الـ focus، والأيقونات اللي ليها معنى، وخطوط الرسوم البيانية، وحالة الـ checkbox. والمستثنى: العناصر الـ disabled، واللوجوهات، والحاجات اللي شكلها من المتصفح ومحدش غيّره.`, sol: R`**إجابة نموذجية من WCAG 2.2، بند 1.4.11 Non-text Contrast:**

3:1 مطلوب لـ:

- حدود الحقول، لو الحد هو اللي بيعرّف إن ده حقل.
- حلقة الـ focus.
- الأيقونات اللي ليها معنى.
- خطوط الرسوم البيانية.
- حالة الـ checkbox والـ radio.

المستثنى:

- العناصر الـ disabled.
- اللوجوهات.
- الحاجات اللي شكلها من المتصفح ومحدش غيّره.
- لو الشكل لازم يبقى كده عشان يوصّل المعلومة (زي علم أو صورة حقيقية).

**مثال سريع:** حد الـ input [[#d1d5db]] على الأبيض 1.47:1، وده ساقط لأن البند بيطلب 3:1. اتحسب بدالة [[contrast]] اللي فاتت.

**الغلطة الشائعة:** تطبّق 4.5:1 على الأيقونات أو 3:1 على الكلام. دول بندين مختلفين.

~~~text الناتج
لستة ٥ بنود مطلوبة ، و ٤ مستثناة.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
          ],
          desc: R`التباين نسبة بين إضاءة لون الكلام ولون الخلفية، من 1:1 (نفس اللون) لـ 21:1 (أسود على أبيض). WCAG AA بيطلب [[4.5:1]] للكلام العادي، و [[3:1]] للكلام الكبير (حوالي 24px، أو 18.5px bold) ولحدود الحقول والأيقونات المهمة.

أشهر مشكلة: [[text-gray-400]] على أبيض عشان «شيك». نسبته حوالي 2.6:1، يعني ساقط.`,
          example: R`.muted { color: var(--color-gray-500); }
.hint { color: var(--color-gray-400); }
.dark .muted { color: var(--color-gray-400); }
.input { border: 1px solid var(--color-gray-500); }
.btn-primary { background: var(--color-indigo-600); color: white; }
.on-image { background: rgb(0 0 0 / 0.55); color: white; }
@media (prefers-contrast: more) {
  .muted { color: var(--color-gray-700); }
}`,
          try: R`في Chrome DevTools اختار أي كلام، وفي Styles دوس على مربع اللون: هيقولك Contrast ratio وعلامة صح أو غلط لـ AA و AAA. وكمان Lighthouse › Accessibility بيطلّع كل العناصر اللي ساقطة.`,
          flag: "script",
          deep: {
            why: "مش بس لضعاف النظر: أي حد ماسك موبايل في الشمس، أو شاشة رخيصة، أو كبير في السن. الكلام الباهت أشهر مشكلة accessibility في المواقع (موجود في أغلب الصفحات حسب مسح WebAIM السنوي)، وأسهل واحدة تتحل.",
            how: R`النسبة = (L1 + 0.05) / (L2 + 0.05)، حيث L الـ relative luminance: إضاءة اللون محسوبة بأوزان للأحمر والأخضر والأزرق حسب حساسية العين. الأبيض 1 والأسود 0، فأقصى نسبة 21.

الحدود: AA للكلام العادي 4.5، وللكبير 3. وللعناصر اللي مش كلام (حدود حقل، أو أيقونة لوحدها بتعني حاجة، أو شكل الـ focus) 3. و AAA أعلى (7 و 4.5). الزراير الـ disabled مستثناة، بس الـ placeholder كلام ولازم يتقري.

الألوان بـ oklch بتسهّل: الـ L فيها قريبة من اللي العين شايفاه، ففرق كبير في L = تباين كبير غالبًا. في الرماديات (gray و slate و zinc و neutral و stone) على خلفية بيضا: 600 و 700 للكلام بأمان، و 500 على الحافة، و 400 وأفتح للزينة بس. أما الألوان الفاتحة بطبيعتها (yellow و amber و lime و green و emerald و teal و cyan و sky و orange) فحتى 600 بيسقط (بين 3:1 و 4:1 تقريبًا)، ومحتاجة 700 أو أغمق، فاتأكد بالأداة.

وفي الـ dark mode متقلبش الألوان بالظبط: أبيض صافي على أسود صافي بيتعب العين، الأحسن رمادي فاتح على رمادي غامق جدًا، ولسه فوق 4.5.`,
            when: "وقت اختيار الـ palette، ومع كل لون كلام جديد، وفي الوضعين الفاتح والغامق.",
            mistakes: "تختار الألوان من التصميم على شاشة غالية وتفتكرها واضحة. تعدّي الوضع الفاتح وتنسى الغامق. وتعتمد على اللون بس (حقل أحمر من غير رسالة، أو لينك لونه مختلف من غير underline): اللي عنده عمى ألوان مش هيشوف الفرق."
          },
          teach: R`## رقم واحد بيقولك الكلام مقروء ولا لأ

التباين (contrast ratio) رقم بين 1 و 21 بيقارن إضاءة لونين. المثال فيه ٦ قواعد CSS لونها مختار عشان تعدّي الحد، وواحدة ([[.hint]]) ساقطة عمدًا. حطينا المثال في صفحة HTML بقيم ألوان Tailwind v4 (من [[tailwindcss/theme.css]] نسخة 4.3.3)، وفي Chrome حوّلنا كل لون لـ RGB عن طريق canvas، وحسبنا النسبة بمعادلة WCAG نفسها.

---

## ١. المعادلة في سطرين

~~~text المعادلة
L = 0.2126 × R + 0.7152 × G + 0.0722 × B      (بعد ما R و G و B يتحوّلوا لقيم «خطية» من 0 لـ 1)
النسبة = (L الأفتح + 0.05) ÷ (L الأغمق + 0.05)
~~~

- [[L]] = relative luminance، يعني الإضاءة زي ما العين شايفاها. الأخضر واخد 0.7152 لأن العين أحسّ بيه، والأزرق 0.0722 بس.
- الأبيض L = 1 والأسود L = 0، فأقصى نسبة (1 + 0.05) ÷ (0 + 0.05) = **21**.
- الـ 0.05 موجودة عشان القسمة متبقاش على صفر.

والحدود في WCAG AA:

| العنصر | لازم يبقى على الأقل |
|---|---|
| كلام عادي | 4.5 |
| كلام كبير (حوالي 24px، أو 18.5px bold) | 3 |
| حدود حقل، أيقونة بتعني حاجة، شكل الـ focus | 3 |

---

## ٢. القواعد واحدة واحدة

### [[.muted { color: var(--color-gray-500); }]]

- [[var(--color-gray-500)]]: [[var()]] بتجيب قيمة متغير CSS، والمتغير ده من Tailwind قيمته [[oklch(55.1% 0.027 264.364)]].
- oklch طريقة لكتابة اللون بـ 3 أرقام: L الإضاءة (55.1%)، و C التشبع (0.027 = رمادي تقريبًا)، و H درجة اللون (264 = مايل للأزرق).

~~~text اتقاس في Chrome
gray-500  →  rgb(106, 114, 130)  →  على أبيض 4.84:1   ✓ AA للكلام العادي
~~~

### [[.hint { color: var(--color-gray-400); }]]

~~~text اتقاس في Chrome
gray-400  →  rgb(153, 161, 175)  →  على أبيض 2.6:1   ✗ حتى للكلام الكبير (محتاج 3)
~~~

ده «الرمادي الشيك» اللي في عنوان الدرس.

### [[.dark .muted { color: var(--color-gray-400); }]]

المسافة بين [[.dark]] و [[.muted]] معناها «[[.muted]] اللي جوه عنصر عليه [[.dark]]». القاعدة دي أتقل من [[.muted]] لوحدها (كلاسين مش واحد)، فبتكسب في الوضع الغامق. وعلى خلفية [[gray-950]]:

~~~text اتقاس في Chrome
gray-400 على gray-950 rgb(3, 7, 18)  →  7.74:1   ✓ (حتى AAA)
~~~

نفس اللون اللي ساقط على أبيض ناجح على غامق. التباين دايمًا **بين لونين**، مش صفة في لون لوحده.

### [[.input { border: 1px solid var(--color-gray-500); }]]

[[border]] اختصار: سُمك 1px، وشكل [[solid]] (خط متصل)، واللون. حد الحقل مش كلام، فمحتاج 3 بس، و gray-500 عامل 4.84. لو كان gray-400 (2.6) الحقل كان هيبان كأنه مش موجود.

### [[.btn-primary { background: var(--color-indigo-600); color: white; }]]

~~~text اتقاس في Chrome
indigo-600 → rgb(79, 57, 246)  مع أبيض  →  6.46:1   ✓
~~~

هنا الخلفية هي الغامقة والكلام هو الفاتح، والمعادلة مش فارق معاها مين فوق مين.

### [[.on-image { background: rgb(0 0 0 / 0.55); color: white; }]]

- [[rgb(0 0 0 / 0.55)]]: أسود، و [[/ 0.55]] = شفافية 55% (alpha). يعني طبقة سودا نص شفافة ورا الكلام.
- أسوأ حالة إن الصورة اللي تحتها بيضا خالص. خلطنا الطبقة على أبيض:

~~~text اتقاس في Chrome
فوق صورة بيضا:  rgb(115, 115, 115)  مع كلام أبيض  →  4.74:1  ✓
فوق صورة سودا:  rgb(0, 0, 0)        مع كلام أبيض  →  21:1    ✓
~~~

فمهما كانت الصورة الكلام فوق 4.5. لو قللت الـ 0.55 لـ 0.4 مثلًا، الحالة البيضا هتسقط.

### [[@media (prefers-contrast: more)]]

[[@media]] = طبّق القواعد اللي جوه لو الشرط اتحقق. و [[prefers-contrast: more]] بيتحقق لما المستخدم يطلب تباين أعلى من إعدادات النظام (زي Increase contrast في إعدادات الماك، حسب الـ docs؛ و DevTools › Rendering بيعمله emulate). عملنا emulate للإعداد ده من Playwright:

~~~text اتقاس في Chrome
عادي:              .muted = gray-500 → 4.84:1
prefers-contrast:  .muted = gray-700 → rgb(54, 65, 83) → 10.3:1
~~~

---

## ملخص الأرقام

| القاعدة | اللون | الخلفية | النسبة | الحكم |
|---|---|---|---|---|
| [[.muted]] | gray-500 | أبيض | 4.84 | AA ✓ |
| [[.hint]] | gray-400 | أبيض | 2.6 | ✗ |
| [[.dark .muted]] | gray-400 | gray-950 | 7.74 | AAA ✓ |
| [[.input]] (حد) | gray-500 | أبيض | 4.84 | ✓ (محتاج 3) |
| [[.btn-primary]] | أبيض | indigo-600 | 6.46 | AA ✓ |
| [[.on-image]] | أبيض | أسود 55% على أبيض | 4.74 | AA ✓ |
| [[prefers-contrast]] | gray-700 | أبيض | 10.3 | AAA ✓ |

## الخلاصة

- 4.5 للكلام العادي، و 3 للكبير وللحدود والأيقونات.
- النسبة بين لونين: gray-400 ساقط على أبيض وناجح على gray-950.
- كلام فوق صورة: طبقة غامقة نص شفافة، واحسب على أسوأ صورة (بيضا).
- متخمّنش: DevTools بيوريك الرقم لما تدوس على مربع اللون في Styles.`,
          lines: [
            "رمادي 500 على أبيض: حوالي 4.8:1، عدّى للكلام العادي.",
            "رمادي 400 على أبيض: حوالي 2.6:1، ساقط. حتى الـ placeholder المفروض يبقى مقروء.",
            "في الغامق الموضوع بيتقلب: 400 على خلفية شبه سودا بيعدّي.",
            "حدود الحقل محتاجة 3:1 عشان الحقل نفسه يبان: 500 على أبيض بيعدّي، و 400 لأ.",
            "زرار غامق وكلام أبيض: حوالي 6:1.",
            "كلام فوق صورة: طبقة غامقة ورا الكلام تضمن التباين مهما كانت الصورة.",
            "لو المستخدم طالب تباين أعلى من إعدادات النظام...",
            "...خلّي الكلام الباهت أغمق.",
            "قفلة."
          ],
          sol: R`الأرقام اللي هتشوفها على خلفية بيضا (بألوان Tailwind v4، قستها): [[gray-500]] حوالي 4.8:1، يعني AA ✓ للكلام العادي (محتاج 4.5) و AAA ✗ (محتاج 7). [[gray-400]] حوالي 2.6:1، ساقط في الاتنين، وحتى للكلام الكبير (محتاج 3). [[gray-700]] حوالي 10:1 وناجح في كله. والزرار [[indigo-600]] مع أبيض حوالي 6.5:1 ناجح AA. وفي الـ dark: [[gray-400]] على [[gray-950]] حوالي 7.7:1 وده ليه المثال بيستخدمه هناك.

Chrome بيوريك الرقم مع علامة ✓ أو ⚠ جنب AA و AAA، وخط أو اتنين على لوحة الألوان: أي لون تحت الخط ناجح. اسحب اللون لتحت الخط وشوف الرقم بيتغير. Lighthouse › Accessibility بيطلّع «Background and foreground colors do not have a sufficient contrast ratio» ومعاه كل العناصر الساقطة.

الغلط الشائع: تقيس placeholder أو كلام disabled وتفتكره مشكلة لازم تتحل؛ الـ disabled مستثنى من القاعدة، لكن الـ placeholder لو هو الـ label الوحيد يبقى لازم يعدّي. وبرضه Lighthouse مش بيعرف يقيس الكلام اللي فوق صورة، فده لازم تبص عليه بعينك. وفي موقع عربي خلي بالك: axe-core (اللي جوه Lighthouse) بيتخطى الكلام العربي المتصل في فحص التباين (بيفتكره أيقونة، شوف درس «axe و Lighthouse»)، فقيس بـ DevTools على العنصر نفسه.`
        }
      ]
    }
]);
