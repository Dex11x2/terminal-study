// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
    {
      t: "i18n بـ next-intl",
      l: 3,
      n: "عربي وإنجليزي في الـ URL، وترجمة في server و client components، وروابط بتحافظ على اللغة",
      items: [
        {
          cmd: "next-intl",
          title: "تجهّز next-intl: اللغات والـ proxy والرسايل",
          desc: R`next-intl هي المكتبة الأشهر للترجمة في App Router. الفكرة: اللغة جزء من الـ URL ([[/ar/products]] و [[/en/products]])، والصفحات كلها جوه [[app/[locale]]]، والنصوص في [[messages/ar.json]] و [[messages/en.json]].

التجهيز ٤ ملفات: [[i18n/routing.ts]] فيه اللغات والافتراضية، و [[proxy.ts]] بيحوّل اللي مفيش لغة في الـ URL بتاعه للغة المناسبة، و [[i18n/request.ts]] بيحمّل رسايل اللغة لكل طلب، و [[next.config.ts]] بيضيف الـ plugin. والـ layout نفسه في الدرس الجاي.`,
          example: R`// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({ locales: ["ar", "en"], defaultLocale: "ar" });
// src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
export default createMiddleware(routing);
export const config = { matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)" };
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: (await import($__bt../../messages/$__{locale}.json$__bt)).default };
});
// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({});`,
          try: R`[[npm i next-intl]]، واعمل الملفات دي و [[messages/ar.json]] فيه [[{"Home": {"title": "أهلًا"}}]] و [[en.json]] بالإنجليزي، وانقل [[app/page.tsx]] لـ [[app/[locale]/page.tsx]]. افتح [[localhost:3000]]: هيتحول لـ [[/ar]]. وبعدين غيّر لغة المتصفح للإنجليزي، وامسح cookies الموقع، وافتح تاني.`,
          flag: "script",
          deep: {
            why: "الترجمة بـ state في المتصفح (زرار بيغيّر اللغة من غير ما الـ URL يتغير) معناها جوجل بيشوف لغة واحدة بس، واللينك اللي بتبعته بيفتح بلغة غير اللي شفتها، والصفحة بتترسم بلغة وبعدين تتقلب. اللغة في الـ URL بتحل التلاتة: كل لغة صفحات لوحدها، بتترسم على السيرفر، وبتتأرشف.",
            how: R`الطلب: [[/products]] بيوصل الـ proxy. next-intl بيشوف مفيش لغة، فيختار (من cookie زيارة قديمة، وبعدين [[Accept-Language]] بتاع المتصفح، وبعدين الافتراضية) ويعمل redirect لـ [[/ar/products]]. الطلب الجديد بيعدّي الـ proxy ويوصل لـ [[app/[locale]/products/page.tsx]] و [[locale]] قيمتها [["ar"]].

[[i18n/request.ts]] بيتنادى مرة لكل طلب، وأي [[getTranslations]] أو [[useTranslations]] في server component بياخد الرسايل منه. والـ client components بتاخدها من [[NextIntlClientProvider]] في الـ layout (من next-intl 4 بيورث الرسايل من السيرفر لوحده).

[[localePrefix]] في [[defineRouting]]: [["always"]] (الافتراضي، كل الـ URLs فيها اللغة)، أو [["as-needed"]] (الافتراضية من غير prefix: [[/products]] عربي و [[/en/products]] إنجليزي). و [[pathnames]] لو عايز الـ URL نفسه مترجم.

وفي Next 15 الملف كان [[middleware.ts]]، ونفس الكود بالظبط. والـ matcher ده مهم: من غيره الـ proxy هيحاول يضيف لغة لطلبات الصور والـ API.`,
            when: "أي موقع بلغتين أو أكتر. ولو التطبيق كله ورا login ومش محتاج SEO، ممكن اللغة تبقى في الـ cookie بس من غير routing (next-intl بيدعم ده كمان)، بس الـ URL أحسن غالبًا.",
            mistakes: R`تنسى تنقل الصفحات جوه [[app/[locale]]] فتلاقي 404. و matcher بيمسك [[/api]] فالـ API يتحول لـ [[/ar/api]]. وتحمّل كل اللغات في كل طلب بدل اللغة الحالية بس. وتفتكر إنك محتاج [[middleware.ts]] عشان next-intl في Next 16: [[proxy.ts]] شغال معاه عادي.`
          },
          lines: [
            "دالة تعريف الـ routing.",
            R`لغتين، والعربي الافتراضي. وفيه [[localePrefix]] لو عايز الافتراضية من غير [[/ar]] في الـ URL.`,
            R`الـ middleware بتاع next-intl. بيشتغل في [[proxy.ts]] في Next 16 عادي.`,
            "نفس الإعدادات.",
            R`الـ proxy كله: لو الـ URL من غير لغة، بيختار من الـ cookie أو [[Accept-Language]] ويحوّل.`,
            "كل المسارات ما عدا الـ API والملفات اللي فيها نقطة (صور و favicon).",
            "الإعدادات اللي بتتحمّل مع كل طلب على السيرفر.",
            "دالة بتتأكد إن اللغة مدعومة.",
            "اللغات.",
            R`[[requestLocale]] غالبًا جاية من [[[locale]]] في الـ URL.`,
            "استناها (Promise).",
            "لو مش مدعومة (أو مفيش)، الافتراضية.",
            R`رجّع اللغة ورسايلها بس ([[import]] dynamic، فكل لغة ملف لوحده).`,
            "قفلة.",
            "الـ plugin.",
            R`بيدوّر على [[i18n/request.ts]] لوحده.`,
            R`لف الـ config بتاعك (اللي فيه [[images]] أو [[cacheComponents]]) بيه.`
          ],
          sol: R`[[localhost:3000]] بيرجّع [[307]] لـ [[/ar]] ومعاه [[set-cookie: NEXT_LOCALE=ar]]، والصفحة بتعرض «أهلًا». ولو فتحت [[/en]] بتعرض الإنجليزي، والـ cookie بتتحدث لـ [[en]].

بعد ما تغيّر لغة المتصفح للإنجليزي وتمسح الـ cookies: [[/]] بيروح [[/en]]، لأن الاختيار من [[Accept-Language]] لما مفيش cookie. ولو مامسحتش الـ cookies هيفضل يوديك آخر لغة زرتها. لو [[/ar]] طلعت 404: الصفحة لسه في [[app/page.tsx]] مش [[app/[locale]/page.tsx]]، أو فيه [[app/layout.tsx]] قديم لسه موجود.`,
          solCode: R`curl -s -o /dev/null -D - localhost:3000/ | grep -i "location\|set-cookie"
# location: /ar
# set-cookie: NEXT_LOCALE=ar; Path=/; SameSite=lax
curl -s -o /dev/null -D - -H "Accept-Language: en-US,en;q=0.9" localhost:3000/ | grep -i location
# location: /en`
        },
        {
          cmd: "setRequestLocale",
          title: "الـ layout بتاع اللغة: lang و dir وصفحات static",
          desc: R`[[app/[locale]/layout.tsx]] هو الـ root layout: بيتأكد إن اللغة مدعومة، ويحط [[lang]] و [[dir]] على [[<html>]] من السيرفر، ويلف الصفحات بـ [[NextIntlClientProvider]]. نفس الـ layout ده مشروح من ناحية RTL والتصميم في تاب «بناء مشروع كامل».

الجديد هنا: [[generateStaticParams]] بترجّع اللغات، و [[setRequestLocale(locale)]] في الـ layout وفي كل صفحة. من غيرهم next-intl بيقرا اللغة من الـ headers، وده بيخلي كل الصفحات dynamic.`,
          example: R`// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
// src/app/[locale]/about/page.tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  return <h1>{t("title")}</h1>;
}`,
          try: R`اعمل build واقرا الجدول: [[/[locale]/about]] المفروض ● وتحتها [[/ar/about]] و [[/en/about]]. امسح [[setRequestLocale]] من صفحة About ومن الـ layout كمان، واعمل build تاني وشوف الرمز اتغير لـ ƒ.`,
          flag: "script",
          deep: {
            why: R`صفحة «مين إحنا» مش بتتغير مع كل زائر، بس لو next-intl مش عارف اللغة غير من الـ headers، Next مضطر يرسمها مع كل طلب. [[setRequestLocale]] بتقول اللغة صراحة من الـ params، فالصفحة تتبني مرة لكل لغة.`,
            how: R`next-intl محتاج يعرف لغة الطلب الحالي من جوه أي كومبوننت. الطريقة الافتراضية إن الـ proxy بيحط header و [[getRequestConfig]] بيقراه، بس قراية الـ headers بتخلي الـ route dynamic. [[setRequestLocale]] بتخزن اللغة في كاش خاص بالطلب، فالـ [[requestLocale]] بياخدها من هناك.

لازم تتنادى في كل layout وكل page قبل أي [[useTranslations]] أو [[getTranslations]]، لأن Next ممكن يرسم الـ layout والصفحة بشكل منفصل، فمتعتمدش إن الـ layout سبق.

وفي [[generateMetadata]] ابعت اللغة صراحة: [[getTranslations({ locale, namespace: "Metadata" })]].

ومع Cache Components (Next 16)، [[generateStaticParams]] للغات مهمة عشان الـ [[params]] تبقى معروفة وقت الـ build، والصفحات اللي فيها أجزاء dynamic تانية تتعامل زي أي صفحة (Suspense).

وتفاصيل RTL: الـ CSS المنطقي ([[ms-4]] بدل [[ml-4]]) والأيقونات المقلوبة في تاب «HTML و CSS» وتاب «بناء مشروع كامل».`,
            when: "أي موقع مترجم فيه صفحات static (تسويق، ومقالات، ومنتجات). الصفحات اللي ورا login (dashboard) كده كده dynamic، بس برضه حطها عشان تمشي على نفس القاعدة.",
            mistakes: R`تحطها في الـ layout بس وتنسى الصفحات. وتسيب [[app/layout.tsx]] فيه [[<html lang="ar">]] وتضيف [[app/[locale]/layout.tsx]] تحته فيبقى فيه html جوه html. وتحط [[dir]] بـ JavaScript في effect فالصفحة تترعش.`
          },
          lines: [
            "الـ provider ودالة التحقق.",
            R`[[setRequestLocale]] من جزء السيرفر.`,
            "404.",
            "اللغات.",
            "ابني نسخة من كل صفحة لكل لغة وقت الـ build.",
            R`بترجّع [[[{ locale: "ar" }, { locale: "en" }]]].`,
            "قفلة.",
            R`الـ root layout (مفيش [[app/layout.tsx]] فوقه بـ html تاني).`,
            "اللغة من الـ URL.",
            R`لغة مش مدعومة ([[/fr]])؟ 404.`,
            "قول لـ next-intl اللغة كام، عشان ميقراش الـ headers والصفحة تفضل static.",
            "بداية الـ JSX.",
            "اللغة والاتجاه من السيرفر، فمفيش ترعيشة LTR وبعدين RTL.",
            "body.",
            "الرسايل للـ client components.",
            "قفلة body.",
            "قفلة html.",
            "قفلة.",
            "قفلة.",
            R`[[getTranslations]] للـ async server components، و [[setRequestLocale]].`,
            "صفحة About.",
            "اللغة.",
            "لازم في كل صفحة كمان، مش الـ layout بس.",
            R`نصوص الـ namespace [[About]] من ملف الرسايل.`,
            "اعرض.",
            "قفلة."
          ],
          sol: R`الجدول: [[/[locale]/about]] وتحتها [[● /ar/about]] و [[● /en/about]]، يعني نسخة static لكل لغة. ولما تمسحها من الصفحة والـ layout: [[ƒ /[locale]/about]] ومن غير نسخ تحتها، لأن next-intl رجع يعرف اللغة من الـ headers.

ملحوظة من التجربة: لو مسحتها من صفحة About بس وسبتها في الـ layout، الجدول لسه ● (Next 16.3 و next-intl 4)، لأن الـ layout والصفحة اترسموا في نفس الـ render. بس متعتمدش على ده: الوثائق بتقول حطها في كل layout وكل page، لأن Next ممكن يرسمهم منفصلين. ولو الكل ƒ وهي موجودة: فيه حاجة تانية dynamic زي [[cookies()]] في الـ layout، أو [[generateStaticParams]] ناقصة.`
        },
        {
          cmd: "useTranslations",
          title: "تترجم نص في server و client components، والجمع بالعربي",
          desc: R`[[useTranslations("Cart")]] بيرجّع دالة [[t]]: [[t("title")]] بيجيب [[Cart.title]] من ملف اللغة الحالية. بتشتغل في client components وفي server components العادية (مش async). وفي server component [[async]] استخدم [[await getTranslations("Cart")]] من [[next-intl/server]].

الرسايل بصيغة ICU: متغيرات [[{name}]]، والجمع بـ [[plural]]، والعربي فيه ٦ حالات ([[zero]] و [[one]] و [[two]] و [[few]] و [[many]] و [[other]])، فمتلزقش كلام ببعض في الكود. ولتنسيق التواريخ والأرقام والفلوس فيه [[useFormatter]].`,
          example: R`// messages/ar.json
{
  "Cart": {
    "title": "السلة",
    "items": "{count, plural, =0 {السلة فاضية} one {منتج واحد} two {منتجين} few {# منتجات} many {# منتج} other {# منتج}}",
    "greeting": "أهلًا يا {name}"
  }
}
// app/[locale]/cart/page.tsx (server)
import { getTranslations } from "next-intl/server";
export default async function CartPage() {
  const t = await getTranslations("Cart");
  const items = await getCartItems();
  return <h1>{t("title")}: {t("items", { count: items.length })}</h1>;
}
// components/cart-total.tsx (client)
"use client";
import { useFormatter, useTranslations } from "next-intl";
export function CartTotal({ totalCents, name }: { totalCents: number; name: string }) {
  const t = useTranslations("Cart");
  const format = useFormatter();
  return <p>{t("greeting", { name })}: {format.number(totalCents / 100, { style: "currency", currency: "EGP" })}</p>;
}`,
          try: R`اعمل صفحة فيها [[t("items", { count })]] مع [[count]] بـ 0 و 1 و 2 و 5 و 11 و 100، وشوف كل واحدة طلعت إزاي. وبعدين امسح حالة [[many]] من الرسالة وشوف 11 طلعت إيه (هتروح لـ [[other]]).`,
          flag: "script",
          deep: {
            why: R`[[count + " منتجات"]] بتطلع «1 منتجات» و «11 منتجات»، والعربي فيه قواعد جمع مختلفة حسب الرقم. وكل نص مكتوب في الكومبوننت نفسه لازم يتلف عليه واحد واحد لو قررت تضيف لغة. ملفات الرسايل بـ ICU بتحل الاتنين.`,
            how: R`next-intl بيستخدم [[Intl.PluralRules]] المبني في JavaScript عشان يختار الحالة. في العربي: صفر zero، وواحد one، واتنين two، ومن ٣ لـ ١٠ few، ومن ١١ لـ ٩٩ many، و ١٠٠ و ١٠١ و ١٠٢ (وأي مية كاملة) other. والقاعدة بتتحسب على آخر رقمين، فـ ١٠٣ ترجع few و ١١١ ترجع many تاني. و [[=0]] بيطابق الرقم بالظبط قبل القواعد.

الـ namespaces بتقسّم الملف حسب الشاشة ([[Cart]] و [[Checkout]])، وتقدر تستخدم [[t.rich]] لنص فيه لينك أو bold: [[t.rich("terms", { link: (chunks) => <Link href="/terms">{chunks}</Link> })]].

الأنواع: لو عرّفت نوع الرسايل في [[AppConfig]] (next-intl 4)، TypeScript بيمسك [[t("titel")]] الغلط وبيكمّلك المفاتيح.

الـ client components بتاخد كل الرسايل من الـ provider. لو الملف كبير، ممكن تبعت namespaces معينة بس للـ client، وتسيب الباقي للسيرفر.

والتنسيق: [[useFormatter]] أو [[getFormatter]] للأرقام والفلوس والتواريخ والوقت النسبي («من ٥ دقايق») حسب اللغة، مبنية على [[Intl]].`,
            when: "أي نص بيظهر للمستخدم في موقع مترجم: عناوين، وأزرار، ورسايل أخطاء، وإيميلات. والنصوص اللي جاية من الداتابيز (اسم المنتج) مش مكانها ملفات الرسايل: دي أعمدة باللغتين (تاب «بناء مشروع كامل»).",
            mistakes: R`[[t("count") + " " + t("items")]]: لزق كلام ببعض بيبوّظ الترتيب والجمع. ونسيان حالة [[two]] أو [[few]] فتطلع «2 منتج». ومفتاح موجود في [[ar.json]] ومش في [[en.json]]: اعمل فحص في CI بيقارن المفاتيح. و [[useTranslations]] في server component [[async]] (استخدم [[getTranslations]]).`
          },
          lines: [
            "بداية ملف الرسايل العربي.",
            R`namespace اسمه [[Cart]]: نصوص الحتة دي مع بعض.`,
            "نص عادي.",
            R`الجمع: [[=0]] للصفر بالظبط، و [[#]] مكان الرقم، وكل حالة من حالات العربي بالنص المناسب.`,
            "متغير.",
            "قفلة.",
            "قفلة.",
            R`للـ async server components.`,
            "صفحة السلة (dynamic أصلًا، فمش محتاجة setRequestLocale).",
            "دالة الترجمة للـ namespace ده.",
            "الداتا.",
            R`[[count]] بيختار حالة الجمع: ١ «منتج واحد»، و ٢ «منتجين»، و ٥ «٥ منتجات»، و ١١ «١١ منتج».`,
            "قفلة.",
            "client component.",
            R`نفس الـ API في المتصفح، والرسايل جاية من [[NextIntlClientProvider]].`,
            "بياخد الإجمالي والاسم.",
            "الترجمة.",
            "أداة تنسيق الأرقام والتواريخ حسب اللغة الحالية.",
            "المتغير جوه الجملة، والفلوس بتتنسق بالأرقام والعملة حسب اللغة.",
            "قفلة."
          ],
          sol: R`الناتج بالعربي: 0 «السلة فاضية»، و 1 «منتج واحد»، و 2 «منتجين»، و 5 «5 منتجات»، و 11 «11 منتج»، و 100 «100 منتج» (حالتها [[other]]). وكمان 103 بترجع «103 منتجات» (few تاني) و 111 «111 منتج».

لما تمسح [[many]]: 11 بتروح لـ [[other]] من غير أي خطأ، بس النص هو هو «11 منتج»، لأن [[many]] و [[other]] في الرسالة نفس النص، فمش هتشوف فرق. عشان تتأكد، غيّر نص [[other]] مؤقتًا لحاجة مميزة: هتلاقي 11 و 100 و 111 طلعوا بيها. ولو طلعلك «11 منتجات» أو «2 منتج»: الرسالة ناقصة حالة، أو انت بتلزق الرقم بالكلمة بإيدك.`
        },
        {
          cmd: "createNavigation",
          title: "روابط بتحافظ على اللغة، وزرار تغيير اللغة",
          desc: R`[[Link]] العادي بتاع Next مش عارف حاجة عن اللغة: [[href="/cart"]] هيوديك [[/cart]] من غير [[/ar]]. [[createNavigation(routing)]] بيطلّع نسخ من [[Link]] و [[redirect]] و [[usePathname]] و [[useRouter]] بتضيف اللغة الحالية لوحدها، فتكتب [[href="/cart"]] وتروح [[/ar/cart]].

وزرار تغيير اللغة: [[router.replace(pathname, { locale: "en" })]] بيفتح نفس الصفحة باللغة التانية. ولجوجل، [[alternates.languages]] في الـ metadata بيقوله إن الصفحتين ترجمة لبعض (hreflang).`,
          example: R`// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
// src/components/locale-switcher.tsx
"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";
  return <button onClick={() => router.replace(pathname, { locale: other })}>{other === "ar" ? "عربي" : "English"}</button>;
}
// src/app/[locale]/about/page.tsx
export const metadata = { alternates: { languages: { ar: "/ar/about", en: "/en/about", "x-default": "/ar/about" } } };`,
          try: R`حط [[LocaleSwitcher]] في الـ layout واضغطه من [[/ar/about]]: المفروض يروح [[/en/about]]. وبعدين اعمل لينك لـ [[/about]] بـ [[Link]] من [[next/link]] بدل النسخة المترجمة واضغطه من صفحة إنجليزي: هيروح من غير لغة، والـ proxy يحوّله بطلب زيادة، وممكن للغة غير اللي كنت فيها.`,
          flag: "script",
          deep: {
            why: R`في موقع مترجم، كل لينك في الكود لازم يفتكر يضيف اللغة: [[href={$__bt/$__{locale}/cart$__bt}]]. سهل تنساه في مكان، فالمستخدم الإنجليزي يدوس لينك يلاقي نفسه بالعربي. الـ navigation المترجم بيشيل الموضوع ده من دماغك.`,
            how: R`[[createNavigation]] بيعمل wrappers خفيفة: [[Link]] بياخد الـ href ويحط قبله اللغة الحالية (أو [[locale]] prop لو عايز لغة معينة: [[<Link href="/" locale="en">]]). و [[usePathname]] بيرجّع المسار من غير prefix اللغة، عشان تقارن بيه لينك active أو تغيّر اللغة. و [[redirect]] على السيرفر بياخد [[{ href, locale }]].

لو مستخدم [[pathnames]] (URLs مترجمة)، الـ href بيبقى الاسم الداخلي، و next-intl بيحوّله للـ URL باللغة المطلوبة، والصفحات الـ dynamic بتاخد [[{ pathname: "/products/[slug]", params: { slug } }]].

[[getPathname]] على السيرفر بيطلّع الـ URL لأي لغة، مفيد للـ sitemap و [[alternates.languages]] في [[generateMetadata]].

و hreflang: جوجل بيستخدمه عشان يعرض لكل مستخدم النسخة بلغته، ومبيعتبرش الصفحتين محتوى مكرر. و [[x-default]] للنسخة اللي تظهر لو لغة المستخدم مش من اللغات دي.`,
            when: "كل لينك داخلي في موقع مترجم، وزرار اللغة في الـ header، و alternates في كل صفحة عامة.",
            mistakes: R`[[import Link from "next/link"]] في نص المشروع وتنسى تغيّره. وزرار اللغة بيوديك الرئيسية بدل نفس الصفحة. واسم اللغة بلغة الصفحة («Arabic» في النسخة الإنجليزي): اللي مش فاهم اللغة الحالية لازم يلاقي لغته مكتوبة بلغتها. و hreflang بـ URLs نسبية من غير [[metadataBase]].`
          },
          lines: [
            "الدالة من next-intl.",
            "إعدادات اللغات.",
            R`نسخ بتفهم اللغة. في كل الموقع استورد [[Link]] من هنا مش من [[next/link]].`,
            "hooks، فـ client.",
            R`[[useLocale]] بيقولك اللغة الحالية.`,
            R`[[usePathname]] و [[useRouter]] بتوع next-intl مش بتوع Next.`,
            "زرار اللغة.",
            R`[["ar"]] أو [["en"]].`,
            R`المسار من غير اللغة: [[/about]] مش [[/ar/about]].`,
            "الراوتر.",
            "اللغة التانية.",
            R`نفس المسار باللغة التانية. [[replace]] عشان التبديل ميبقاش خطوة في الـ history. واسم اللغة مكتوب بلغتها هي.`,
            "قفلة.",
            R`hreflang: الصفحة بتقول لجوجل فين النسخة العربي وفين الإنجليزي. مع [[metadataBase]] بتبقى URLs كاملة.`
          ],
          sol: R`من [[/ar/about]] الزرار (مكتوب عليه English) بيوديك [[/en/about]] بنفس الصفحة بالإنجليزي، والـ cookie [[NEXT_LOCALE]] بقت [[en]]. واللينك من [[@/i18n/navigation]] بـ [[href="/about"]] من صفحة عربي بيروح [[/ar/about]] على طول.

ولينك [[next/link]] العادي بيطلب [[/about]] من غير لغة، فالـ proxy بيرد [[307]] ويحوّل، وده طلب زيادة مع كل ضغطة. والتحويل حسب cookie [[NEXT_LOCALE]] (آخر لغة فتحتها)، فغالبًا هتوصل للغة الصح. بس لو الـ cookie مش موجودة أو اتمسحت، الاختيار بيبقى من [[Accept-Language]]: تكون في [[/en]] ومتصفحك عربي فتروح [[/ar/about]]. لو الزرار وداك URL غلط: انت مستخدم [[usePathname]] من [[next/navigation]] (بيرجّع المسار باللغة) مش من [[@/i18n/navigation]].`
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "صور وخطوط من غير ما الصفحة تتنطط، و JavaScript أقل في المتصفح",
      items: [
        {
          cmd: "next/image",
          title: "صور سريعة ومقاسها صح بـ next/image",
          desc: R`[[<Image>]] من [[next/image]] بيحوّل الصورة لـ WebP أو AVIF بالمقاس اللي الشاشة محتاجاه، ويكتب [[srcset]]، ويعمل lazy loading، ويحجز مكانها عشان الصفحة متتنططش. محتاج [[width]] و [[height]] (أو [[fill]] جوه حاوية ليها مقاس)، و [[sizes]] بيقوله الصورة هتاخد قد إيه من الشاشة.

الصور من دومين تاني لازم تسمح بيها في [[images.remotePatterns]]. وفي Next 16 [[priority]] بقت deprecated: لصورة الـ LCP استخدم [[fetchPriority="high"]] (أو [[preload]]). وتفاصيل الصور في HTML نفسه في تاب «HTML و CSS».`,
          example: R`// next.config.ts
const nextConfig: NextConfig = {
  images: { remotePatterns: [new URL("https://cdn.example.com/products/**")], formats: ["image/avif", "image/webp"] },
};
// app/page.tsx
import Image from "next/image";
import hero from "@/assets/hero.jpg";
<Image src={hero} alt="كتب على رف" placeholder="blur" fetchPriority="high" loading="eager" sizes="100vw" className="h-auto w-full" />
<Image src={p.imageUrl} alt={p.name} width={400} height={400} sizes="(max-width: 768px) 50vw, 25vw" />
<div className="relative aspect-video">
  <Image src={cover} alt="" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
</div>`,
          try: R`حط صورة منتج بـ [[<img>]] عادي وجنبها [[<Image>]] بنفس المصدر، وافتح Network: قارن الحجم والصيغة. وبعدين شيل [[sizes]] من صورة المنتج وشوف أنهي مقاس اتحمّل على موبايل (من DevTools device mode). وشغّل Lighthouse وشوف الـ LCP قبل وبعد [[fetchPriority]].`,
          flag: "script",
          deep: {
            why: "الصور غالبًا أتقل حاجة في الصفحة، وأكبر سبب إن LCP وحش و CLS عالي. صورة 4000 بكسل بـ ٣ ميجا بتتعرض 300 بكسل على موبايل معناها ثواني ضايعة. next/image بيعمل الشغل ده (مقاسات وصيغ وأبعاد) من غير ما تجهّز كل صورة بإيدك.",
            how: R`[[<Image>]] بيطلّع [[<img>]] عادي فيه [[srcset]] بمقاسات من [[deviceSizes]] و [[imageSizes]]، وكل واحد URL لـ [[/_next/image?url=...&w=640&q=75]]. أول ما مقاس يتطلب، سيرفر Next بيحوّل الصورة (بمكتبة sharp) ويكاشها على الديسك.

[[sizes]] هو اللي بيخلي المتصفح يختار صح. من غيره مع [[fill]] أو صورة responsive، المتصفح بيفترض 100vw وينزّل أكبر مقاس. و [[width]] و [[height]] للنسبة والحجز مش للمقاس المعروض: الـ CSS هو اللي بيحدد العرض الفعلي.

Next 16 غيّر defaults: [[qualities]] بقت [[[75]]] بس (أي quality تانية بتتقرب ليها إلا لو ضفتها)، و [[minimumCacheTTL]] بقى ٤ ساعات، و 16 اتشالت من [[imageSizes]]، والصور المحلية اللي فيها query string محتاجة [[localPatterns]].

على VPS الـ optimization بياخد CPU ورام. لو الموقع فيه صور كتير، CDN للصور (Cloudinary أو Cloudflare Images) بـ [[loader]] مخصص، أو [[unoptimized]] للصور اللي متظبطة أصلًا. وفي [[output: "export"]] الـ optimization مش موجود.`,
            when: R`أي صورة محتوى: منتجات، وأغلفة، وصور بروفايل. الأيقونات SVG الصغيرة مش محتاجاه. وصورة الـ LCP اللي فوق الشاشة بس هي اللي تاخد [[fetchPriority]].`,
            mistakes: R`[[fetchPriority="high"]] أو [[preload]] على كل الصور فمبقاش فيه أولوية. و [[fill]] جوه div من غير [[relative]] أو ارتفاع فالصورة تختفي. ومن غير [[sizes]] فالموبايل ينزّل صورة الديسكتوب. و [[remotePatterns: [{ hostname: "**" }]]] عشان «الصور مش ظاهرة»: كده أي حد يستخدم سيرفرك يحوّل صور من أي مكان.`
          },
          lines: [
            "إعدادات Next.",
            "اسمح بالصور من الـ CDN ده والمسار ده بس، واطلب AVIF الأول (أصغر) وبعده WebP.",
            "قفلة.",
            "الكومبوننت.",
            R`صورة محلية بـ import: Next عارف مقاسها لوحده ويعمل منها blur صغير.`,
            R`صورة الـ hero (الـ LCP): [[fetchPriority="high"]] و [[eager]] عشان تحمّل على طول، و [[sizes="100vw"]] لأنها بعرض الشاشة.`,
            R`صورة منتج من الـ CDN: المقاس لازم يتكتب، و [[sizes]] بيقول «نص الشاشة على الموبايل، وربعها على الكبير»، فالموبايل مياخدش صورة الديسكتوب.`,
            R`حاوية ليها نسبة ثابتة و [[relative]].`,
            R`[[fill]]: الصورة تملا الحاوية، و [[object-cover]] تقص بدل ما تمط. و [[alt=""]] لأنها ديكور.`,
            "قفلة."
          ],
          sol: R`في Network: الـ [[<img>]] العادي بينزّل الملف الأصلي زي ما هو (JPEG بالحجم الكامل)، و [[<Image>]] بينزّل [[/_next/image?url=...&w=384&q=75]] بصيغة [[image/webp]] (أو AVIF لو فعّلتها في [[formats]]) وحجم أصغر بكتير. وفي الـ HTML هتلاقي [[srcset]] بمقاسات من 256 لـ 3840 والمتصفح بيختار.

من غير [[sizes]]: Next بيكتب srcset بـ [[1x]] و [[2x]] على حسب الـ [[width]]، فالموبايل اللي الـ DPR بتاعه 3 بياخد مقاس كبير. جربتها على شاشة عرضها 390: صورة [[width={1200}]] من غير sizes نزّلت [[w=3840]]، وصورة بـ [[sizes="(max-width: 768px) 50vw, 25vw"]] نزّلت [[w=640]]. وفي Lighthouse صورة الـ hero بـ [[fetchPriority="high"]] بتبدأ تحمّل قبل الباقي، والفرق في الـ LCP بيبان أكتر مع throttling. لو صورة من دومين تاني طلّعت خطأ إن الـ hostname مش configured: ضيفه في [[remotePatterns]].`
        },
        {
          cmd: "next/font",
          title: "خطوط من غير ما النص يتنطط ومن غير طلب لجوجل",
          desc: R`[[next/font/google]] بينزّل الخط وقت الـ build ويقدّمه من دومينك، فمفيش طلب لـ Google Fonts من متصفح الزائر. وبيعمل خط احتياطي بنفس المقاسات تقريبًا ([[size-adjust]])، فلما الخط الحقيقي يحمّل النص مبيتزقش (CLS).

للعربي: [[Cairo]] أو [[Tajawal]] أو [[IBM Plex Sans Arabic]] مع [[subsets: ["arabic"]]]. واستخدم [[variable]] عشان يبقى CSS variable تربطه بـ Tailwind.`,
          example: R`// app/layout.tsx
import { Cairo, Inter } from "next/font/google";
import localFont from "next/font/local";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const brand = localFont({ src: "./fonts/Brand.woff2", variable: "--font-brand" });
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={$__bt$__{cairo.variable} $__{inter.variable} $__{brand.variable}$__bt}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
// app/globals.css (Tailwind v4):
// @theme inline { --font-sans: var(--font-cairo), var(--font-inter), sans-serif; }`,
          try: R`افتح الموقع و DevTools > Network > Font: هتلاقي الخطوط جاية من [[/_next/static/media]] مش من [[fonts.gstatic.com]]. وبعدين جرّب [[<link>]] لـ Google Fonts بالطريقة القديمة، وشغّل Network throttling على Slow 4G، وشوف النص بيتنطط لما الخط يحمّل.`,
          flag: "script",
          deep: {
            why: "الخط الخارجي معناه طلب لدومين تاني (DNS و TLS)، والنص بيظهر بخط وبعدين يتبدل بخط مقاساته مختلفة فالسطور تتزق. وجوجل فونتس بيعرف IP كل زائر، ودي مشكلة خصوصية في أوروبا (GDPR).",
            how: R`وقت الـ build، [[next/font/google]] بينزّل ملفات الخط للـ subsets المطلوبة بس ويحطها مع الـ static files، ويولّد [[@font-face]] وكلاس. والخط بيتعمله preload للصفحات اللي بتستخدمه. وكل ده من غير أي طلب لجوجل وقت التشغيل.

الخط الاحتياطي: Next بيحسب [[size-adjust]] و [[ascent-override]] لخط النظام (Arial مثلًا) عشان ياخد نفس مساحة الخط الحقيقي، فلما يتبدل مفيش قفزة.

[[subsets]] بتصغر الملف: خط كامل بكل اللغات ممكن يبقى أضعاف. والخطوط الـ variable (زي Cairo) ملف واحد لكل الأوزان، فمش محتاج [[weight]]، وغير الـ variable لازم تحدد الأوزان.

واعمل الخط مرة واحدة في ملف ([[app/fonts.ts]]) وصدّره، لأن كل استدعاء لـ [[Cairo()]] في مكان جديد بيعمل نسخة جديدة. وربطه بـ Tailwind v4 في تاب «HTML و CSS».`,
            when: "أي مشروع Next فيه خطوط مخصصة. وده الافتراضي في create-next-app (خط Geist).",
            mistakes: R`[[<link href="https://fonts.googleapis.com/...">]] في الـ layout. ونسيان [[subsets: ["arabic"]]] فالعربي يظهر بخط النظام. وتحميل ٦ أوزان مش variable ومش مستخدم غير اتنين. واستدعاء [[Cairo()]] جوه كومبوننت مش على مستوى الملف فيطلع خطأ (لازم const على مستوى الـ module).`
          },
          lines: [
            "خطين من Google Fonts. كل خط بيتعمله import باسمه.",
            "خط محلي (ملف عندك).",
            R`Cairo بالحروف العربي واللاتيني، و CSS variable اسمه [[--font-cairo]].`,
            "Inter للإنجليزي بس.",
            "خط الـ brand من ملف في المشروع.",
            "الـ root layout.",
            "بداية الـ JSX.",
            R`كل [[variable]] بيحط class بيعرّف الـ CSS variable على [[<html>]].`,
            R`[[font-sans]] في Tailwind متربوطة بالـ variables في globals.css (السطرين اللي تحت).`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Network > Font هتلاقي ملفات [[woff2]] جاية من [[/_next/static/media/...]] (عندي ملفين لـ Cairo: عربي ولاتيني)، ومفيش أي طلب لـ [[fonts.googleapis.com]] ولا [[fonts.gstatic.com]]. وفي View Source [[<link rel="preload" as="font" type="font/woff2">]] لنفس الملفات: الخط بيبدأ يتحمّل مع الـ HTML.

بالطريقة القديمة ([[<link>]] لـ Google Fonts) ومع Slow 4G: الصفحة بتظهر بخط النظام الأول، وبعد ثواني الخط يتبدل والسطور تتحرك، وفي Performance panel هتلاقي Layout Shift. مع next/font الحركة أقل بكتير لأن الخط الاحتياطي متظبط بـ [[size-adjust]]. لو لقيت الخطوط جاية من gstatic: فيه [[<link>]] أو [[@import]] قديم لسه في الـ CSS.`
        },
        {
          cmd: "next/dynamic",
          title: "تقلل الـ JavaScript اللي بيروح للمتصفح",
          desc: R`كل client component ومكتباته بيتحمّلوا مع الصفحة. [[next/dynamic]] بيفصل كومبوننت تقيل (chart، أو محرر نصوص، أو خريطة) في ملف لوحده بيتحمّل لما يترسم فعلًا، مع loading. و [[ssr: false]] للمكتبات اللي بتلمس [[window]] أول ما تتعمل import (مسموح في client components بس).

وقبل ما تحسّن، قيس: [[npx next experimental-analyze]] (Next 16.1 وأحدث مع Turbopack) بيوريك كل route فيه إيه وحجمه، أو [[@next/bundle-analyzer]] مع webpack.`,
          example: R`// app/dashboard/sales-panel.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const SalesChart = dynamic(() => import("./sales-chart"), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded bg-gray-100" />,
});
export function SalesPanel({ data }: { data: { day: string; total: number }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen(true)}>اعرض الرسم</button>
      {open && <SalesChart data={data} />}
    </section>
  );
}`,
          try: R`شغّل [[npx next experimental-analyze]] وافتح الصفحة اللي فيها الـ chart وشوف حجم المكتبة. وبعدين حوّل الـ import لـ [[import SalesChart from "./sales-chart"]] عادي وقارن حجم الـ JS بتاع الصفحة. وفي Network اتأكد إن ملف الـ chart بيتحمّل بس لما تضغط الزرار.`,
          flag: "script",
          deep: {
            why: "كل كيلوبايت JS بيتنزّل ويتحلل ويتنفذ على موبايل الزائر قبل ما الصفحة تبقى تفاعلية، وده اللي بيبوّظ INP. مكتبة charts ممكن تبقى ٢٠٠ كيلو، ولو في صفحة ٩٠٪ من الناس مبيفتحوش الرسم فيها، دول ٢٠٠ كيلو ضايعين على الكل.",
            how: R`أكبر مكسب في App Router جاي من Server Components: أي حاجة مش تفاعلية تفضل server، ومكتباتها متروحش للمتصفح أصلًا. بعد كده [[next/dynamic]] للحاجات التفاعلية التقيلة اللي مش ظاهرة أول ما الصفحة تفتح.

[[dynamic(() => import(...))]] بيعمل code splitting: ملف منفصل بيتحمّل أول ما الكومبوننت يترسم. في client component بيترسم على السيرفر عادي (SSR) إلا لو [[ssr: false]]. وفي server component، [[dynamic]] بيقسّم الـ client components اللي جواه بس، و [[ssr: false]] مش مسموح هناك.

المكتبات الكبيرة: [[optimizePackageImports]] في next.config بيخلي [[import { X } from "big-lib"]] يجيب X بس، و Next بيعمله لوحده لمكتبات مشهورة ([[lucide-react]] و [[date-fns]] وغيرهم). ولو مكتبة بتتقل الـ bundle، دوّر على بديل أصغر أو استخدمها في server component.

وفي Next 16 دعم React Compiler بقى stable ([[reactCompiler: true]])، وبيعمل memoization لوحده، بس ده بيقلل الـ re-renders مش حجم الـ JS. وقياس LCP و INP و CLS من زوار حقيقيين في تاب «بناء مشروع كامل».`,
            when: "مكونات تقيلة مش ظاهرة أول ما الصفحة تفتح: charts في تاب، ومحرر rich text، وخرايط، و modals كبيرة، ومكتبات PDF. وقيس قبل وبعد.",
            mistakes: R`[[dynamic]] لكل كومبوننت صغير فالصفحة تعمل ٣٠ طلب. و [[ssr: false]] في server component فيطلع خطأ. و [[ssr: false]] على محتوى مهم للـ SEO فجوجل ميشوفوش في الـ HTML. وتحسّن حجم JS وانت حاطط [[use client]] فوق الصفحة كلها: ابدأ من هنا.`
          },
          lines: [
            R`[[ssr: false]] مسموح بس في client component.`,
            R`[[dynamic]] زي [[React.lazy]] مع Suspense، وفوقهم خيارات Next.`,
            "state.",
            R`[[import()]] جوه دالة: الـ bundler بيعمل ملف JS لوحده للـ chart ومكتبته.`,
            R`متترسمش على السيرفر خالص (المكتبة بتستخدم [[window]] أو canvas).`,
            "مكان بنفس المقاس لحد ما يحمّل، فمفيش قفزة.",
            "قفلة.",
            "اللوحة.",
            "الرسم مقفول في الأول.",
            "بداية الـ JSX.",
            "section.",
            "زرار يفتحه.",
            R`أول مرة [[open]] تبقى true، ملف الـ chart يتحمّل. قبلها صفر bytes منه.`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[npx next experimental-analyze]] بيحلل الـ bundle ويفتح واجهة على [[localhost:4000]] (غيّر البورت بـ [[--port]] لو مشغول) بتوريك كل route وملفاتها وأحجامها، ومكتبة الـ charts هتبان من أكبر الحاجات.

قستها بـ recharts: مع [[dynamic]] الصفحة حمّلت حوالي ٤٥٠ كيلو JS (من غير ضغط) وقت الفتح، ولما دوست الزرار اتحمّل ملف تاني حوالي ٣٠٠ كيلو والرسم ظهر. ومع [[import]] العادي: حوالي ٧٦٠ كيلو كلهم مع الفتح، وصفر بعد الضغط. يعني الـ ٣٠٠ كيلو اتنقلوا لبعد الضغط بدل ما كل زائر يدفعهم. لو ملف الـ chart اتحمّل مع الصفحة رغم [[dynamic]]: فيه ملف تاني بيعمل [[import]] عادي لنفس الكومبوننت أو للمكتبة.`
        }
      ]
    },
    {
      t: "CSP والسكربتات الخارجية",
      l: 3,
      n: "CSP بـ nonce من proxy.ts، و next/script لسكربتات الطرف التالت، و analytics بعد موافقة الكوكيز",
      items: [
        {
          cmd: "CSP nonce",
          title: "CSP بـ nonce في proxy.ts: Report-Only الأول وبعدين تقفل",
          desc: R`Content-Security-Policy header بيقول للمتصفح «مفيش script يتنفذ غير اللي أنا سامح بيه». أقوى صيغة: [[script-src 'nonce-XYZ' 'strict-dynamic']]، والـ nonce قيمة عشوائية جديدة مع كل طلب. أي [[<script>]] من غير نفس الـ nonce مبيتنفذش، فحتى لو حد عرف يحقن [[<script>]] في الصفحة (XSS)، هيتقفل.

في Next: [[proxy.ts]] بيولّد الـ nonce، ويحط الـ CSP في الـ request headers (Next بيقراه من هناك) وفي الـ response. و Next بيطلّع الـ nonce من الـ header ويحطه لوحده على كل scripts الـ framework والـ bundles. وابدأ دايمًا بـ [[Content-Security-Policy-Report-Only]]: المتصفح بيبلّغ عن اللي كان هيتقفل من غير ما يقفله، ولما التقارير تنضف تغيّر اسم الـ header.`,
          example: R`// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    $__btscript-src 'self' 'nonce-$__{nonce}' 'strict-dynamic' https:$__{isDev ? " 'unsafe-eval'" : ""}$__bt,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://cdn.example.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
  ].join("; ");
  const header = process.env.CSP_ENFORCE === "1" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(header, csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(header, csp);
  return response;
}
export const config = {
  matcher: [{
    source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    missing: [{ type: "header", key: "next-router-prefetch" }, { type: "header", key: "purpose", value: "prefetch" }],
  }],
};`,
          try: R`حط الـ proxy ده، واعمل [[npm run build && npm start]]، وشوف [[curl -sI localhost:3000]]: فيه [[content-security-policy-report-only]]؟ اعمل View Source ودوّر على [[nonce=]]: مين عليه nonce؟ وبعدين حط في صفحة [[<script dangerouslySetInnerHTML={{ __html: "console.log('inline')" }} />]] وافتح الـ Console. وآخر حاجة: شغّل بـ [[CSP_ENFORCE=1]] وجرّب نفس الصفحة، وجرّب صفحة static (مفيهاش حاجة dynamic خالص).`,
          flag: "script",
          deep: {
            why: R`الـ CSP هو خط الدفاع التاني ضد XSS: تاب «الأمان» بيقول إن الـ escaping هو الأول، بس أي [[dangerouslySetInnerHTML]] أو مكتبة markdown فيها ثغرة أو سكربت طرف تالت مخترق كفاية. سياسة allowlist قديمة ([[script-src 'self' https://cdn.x.com]]) طلعت ضعيفة: أي JSONP أو ملف قديم على الدومين المسموح بيعدّيها. الـ nonce بيقلب الفكرة: مش «الدومينات دي مسموحة»، لكن «السكربتات اللي أنا حاطتها بإيدي في الطلب ده بس».`,
            how: R`الـ nonce لازم يبقى غير متوقع وجديد مع كل طلب، عشان كده في الـ proxy مش في [[next.config]]. Next وقت الـ SSR بيقرا [[Content-Security-Policy]] (أو [[-Report-Only]]) من الـ request headers، ويطلّع القيمة من [[script-src]] (أو [[default-src]])، ويحطها على scripts الـ framework والـ chunks والـ inline scripts بتاعته، وعلى أي [[<Script nonce>]]. و [[x-nonce]] عشان انت تقراه بـ [[headers()]] وتبعته لـ [[next/script]] أو [[GoogleAnalytics]].

[[strict-dynamic]]: أي script عليه nonce يقدر يحمّل scripts تانية (ده اللي بيعمله Next مع الـ chunks، و Google Tag Manager، و Stripe.js)، والمتصفح بيتجاهل الـ allowlists و [[self]] و [[https:]]. الاتنين دول موجودين بس fallback للمتصفحات القديمة اللي مبتفهمش strict-dynamic.

إيه اللي بيتكسر:
١- أي [[<script>]] inline من غير nonce: سكربت الـ dark mode اللي بيتحط في الـ layout، أو snippet الـ analytics المنسوخ. الحل: [[<Script nonce>]] أو تقرا [[x-nonce]] وتحطه على الـ tag.
٢- [[onclick="..."]] كـ HTML attribute و [[javascript:]] links (الـ onClick بتاع React مش مشكلة).
٣- سكربتات بتستخدم [[eval]] أو [[new Function]]، أو tag managers فيها «Custom HTML» بتحقن scripts من غير nonce.
٤- الطرف التالت محتاج أكتر من script-src: Stripe محتاج [[frame-src https://js.stripe.com https://hooks.stripe.com]] و [[connect-src https://api.stripe.com]]، و GA محتاج [[connect-src]] لدومينات google-analytics. التقارير هي اللي هتقولك.
٥- الـ style: [[style-src]] بـ nonce بيقفل [[style="..."]] attributes اللي بتطلع في الـ HTML (زي اللي next/image بيطلّعها مع fill)، والـ nonce مبيتطبقش على attributes. عشان كده [[unsafe-inline]] للـ style هو الحل العملي، وخطره أقل بكتير من الـ scripts.

التكلفة الكبيرة: الـ nonce بيتحط وقت الـ render، فكل الصفحات لازم dynamic. الصفحة الـ static اتعملت وقت الـ build من غير nonce، فأول ما تقفل، الـ scripts بتاعتها تتقفل والصفحة تبقى من غير تفاعل. وده معناه مفيش static ولا ISR ولا CDN caching للـ HTML، والوثائق بتقول صراحة إن Partial Prerendering (الـ static shell بتاع Cache Components) مش متوافق مع nonce. البديل لو محتاج static: CSP من غير nonce في [[headers()]] بتاع next.config، أو SRI التجريبي ([[experimental.sri]]).

وفي dev لازم [[unsafe-eval]] لأن React بيستخدم eval لرسايل الأخطاء، ومش محتاجه في الإنتاج.`,
            when: R`تطبيقات فيها بيانات حساسة (دفع، وحسابات، ولوحات أدمن) أو فيها محتوى من المستخدمين بيتعرض كـ HTML، أو compliance بيطلب CSP صارم. لموقع تسويقي static كله، CSP من next.config من غير nonce أنسب. وابدأ Report-Only أسبوع أو اتنين على الإنتاج قبل ما تقفل.`,
            mistakes: R`تقفل على طول من غير Report-Only فالـ checkout يقع يوم الإطلاق. وتحط الـ CSP على الـ response بس فـ Next ميعرفش الـ nonce ومفيش script عليه nonce. و nonce ثابت أو [[Math.random()]]. وتسيب صفحات static وتستغرب إنها بقت ميتة بعد ما قفلت. و [[unsafe-inline]] في [[script-src]] مع nonce (المتصفحات الحديثة بتتجاهله لما فيه nonce، بس ده معناه إنك مش فاهم السياسة). وتنسى [[frame-ancestors]] أو [[object-src 'none']]. وفي الانترفيو: «ليه nonce أحسن من allowlist؟» و «ليه الـ CSP مش بديل عن الـ escaping؟».`
          },
          lines: [
            R`[[NextResponse]] للرد و [[NextRequest]] نوع الطلب.`,
            R`الـ proxy (في Next 15 كان [[middleware]]).`,
            R`nonce جديد مع كل طلب: UUID عشوائي من [[crypto]] ومحوّل base64.`,
            R`dev؟ React محتاج [[unsafe-eval]] هناك بس.`,
            "السياسة كـ array عشان تبقى مقروءة...",
            "أي نوع مش متحدد: من نفس الدومين بس.",
            R`الـ scripts: اللي عليها الـ nonce، والسكربتات اللي هي بتحمّلها ([[strict-dynamic]]). و [[self]] و [[https:]] للمتصفحات القديمة بس.`,
            R`الـ style: [[unsafe-inline]] عشان [[style=""]] attributes (الـ nonce مبيغطيهاش).`,
            "الصور: الموقع و blob و data و الـ CDN.",
            R`fetch و WebSocket لنفس الدومين. هتزود عليه دومينات الـ analytics و Stripe.`,
            R`مفيش [[<object>]] ولا [[<embed>]] خالص.`,
            R`يمنع [[<base>]] المحقون من تغيير كل الـ URLs النسبية.`,
            "الفورمات تتبعت لنفس الموقع بس.",
            "محدش يحط الموقع في iframe (clickjacking).",
            R`فين تتبعت التقارير (route handler بيعمل log). الأحدث [[report-to]] مع [[Reporting-Endpoints]].`,
            "...ونجمعها بـ ; .",
            R`Report-Only افتراضيًا، والقفل بمتغير بيئة لما التقارير تنضف.`,
            "نسخة من headers الطلب.",
            R`[[x-nonce]] عشان server components تقراه بـ [[headers()]].`,
            R`الـ CSP في الطلب نفسه: من هنا Next بيعرف الـ nonce ويحطه على scripts بتاعته.`,
            "كمّل بالـ headers الجديدة.",
            "والـ CSP في الرد: ده اللي المتصفح بينفّذه.",
            "رجّع.",
            "قفلة.",
            "الـ matcher.",
            "مصفوفة.",
            "كل الصفحات ما عدا الـ API والملفات الثابتة.",
            R`ومش على طلبات الـ prefetch: مش محتاجة CSP ولا nonce.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[curl -sI]] بيطلّع [[content-security-policy-report-only: default-src 'self'; script-src 'self' 'nonce-...' 'strict-dynamic' https:; ...]]، والـ nonce بيتغير مع كل طلب.

في View Source: كل [[<script src="/_next/static/chunks/...">]] و الـ inline scripts بتاعة Next عليهم [[nonce="..."]] (القيمة نفسها اللي في الـ header). الـ script اللي كتبته بـ [[dangerouslySetInnerHTML]] هو الوحيد اللي مفيش عليه nonce. (وفي DevTools > Elements ممكن تلاقي الـ nonce فاضي: المتصفحات بتخبي قيمته من الـ DOM عمدًا لما يكون فيه CSP، عشان سكربت محقون ميقراهاش. استخدم View Source.)

في Report-Only: الـ console بيطبع [[inline]] عادي، وجنبه رسالة [[Report Only]] إنه كان هيتقفل، وطلب POST لـ [[/api/csp-report]] (404 لو لسه معملتش الـ route، ومش مشكلة).

بـ [[CSP_ENFORCE=1]]: الـ [[inline]] مبيطبعش، والرسالة بقت «Refused to execute inline script». وباقي الصفحة شغالة لأن scripts Next عليها nonce. والصفحة الـ static: لو [[npm run build]] علّمها ○ (Static)، الـ HTML بتاعها اتعمل من غير nonce، فكل الـ scripts اتقفلت والزراير مبتعملش حاجة. الحل: [[await connection()]] أو قراية [[headers()]] في الـ root layout عشان كل الصفحات تبقى ƒ.

الغلط الشائع: تحط الـ header على الـ response بس، فمتلاقيش [[nonce=]] في أي حتة والصفحة كلها تتقفل.`,
          solCode: R`// app/api/csp-report/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  console.warn("[csp]", request.headers.get("content-type"), body.slice(0, 2000));
  return new Response(null, { status: 204 });
}
// app/layout.tsx: قراية x-nonce بتخلي كل الصفحات dynamic، والـ nonce متاح لأي Script
import { headers } from "next/headers";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body data-nonce-ready={nonce ? "yes" : "no"}>{children}</body>
    </html>
  );
}`
        },
        {
          cmd: "next/script",
          title: "سكربتات الطرف التالت بـ next/script: امتى تحمّل كل واحد",
          desc: R`[[<Script>]] من [[next/script]] بيحمّل سكربت خارجي مرة واحدة حتى لو الكومبوننت اترسم كذا مرة، ويحدد إمتى بـ [[strategy]]:
[[afterInteractive]] (الافتراضي): بعد ما جزء من الصفحة يعمل hydration. للـ analytics و tag managers.
[[lazyOnload]]: وقت فراغ المتصفح بعد ما كل حاجة تحمّل. للشات، وأزرار السوشيال، والـ widgets.
[[beforeInteractive]]: في الـ [[<head>]] قبل كود Next، ومكانه الـ root layout بس. لحاجات نادرة جدًا (bot detection أو consent manager).
[[worker]]: تجريبي و بـ Partytown، والوثائق بتقول إنه لسه مبيشتغلش مع App Router، فمتعتمدش عليه.

و [[onLoad]] و [[onReady]] و [[onError]] في client components بس. والـ inline script لازم [[id]].`,
          example: R`// app/layout.tsx
import Script from "next/script";
import { headers } from "next/headers";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Script src="https://plausible.io/js/script.js" data-domain="books.example.com" strategy="afterInteractive" nonce={nonce} />
        <Script src="https://widget.example-chat.com/loader.js" strategy="lazyOnload" nonce={nonce} />
      </body>
    </html>
  );
}
// app/stores/map.tsx
"use client";
import Script from "next/script";
export function StoresMap() {
  return (
    <>
      <div id="map" className="h-96" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onReady={() => drawMap("map")} onError={() => console.error("الخريطة محمّلتش")} />
    </>
  );
}`,
          try: R`حط سكربت الشات بـ [[<script src>]] عادي في الـ layout وشغّل Lighthouse على موبايل وسجّل الـ Total Blocking Time. وبعدين غيّره لـ [[<Script strategy="lazyOnload">]] وقارن. وفي Network > JS اتفرج على ترتيب التحميل للاستراتيجيتين. وآخر حاجة: روح لصفحة الخريطة، ورجع للرئيسية، وارجع للخريطة: [[onReady]] اتنادى كام مرة؟ والسكربت اتحمّل كام مرة؟`,
          flag: "script",
          deep: {
            why: "سكربتات الطرف التالت (analytics و pixels و chat و A/B testing) من أكبر أسباب إن INP و LCP وحشين، وأغلب المواقع اللي «بطيئة من غير سبب» فيها ٨ سكربتات متحطة في الـ head. انت مش متحكم في الكود ده، بس متحكم إمتى يتحمّل وإنه ميتحمّلش مرتين.",
            how: R`[[afterInteractive]] و [[lazyOnload]] بيتحطوا من الـ client: Next بيضيف الـ [[<script>]] للـ DOM بعد الـ hydration أو في [[requestIdleCallback]] بعد الـ load، فمبيعطلوش رسم الصفحة. وبيتسجلوا بالـ src (أو الـ id)، فلو الكومبوننت اترسم تاني في تنقل، السكربت مبيتحمّلش تاني.

[[onLoad]] بيتنادى مرة واحدة لما السكربت يحمّل. [[onReady]] بيتنادى أول مرة وكل ما الكومبوننت يتركّب تاني (بعد تنقل)، وده المطلوب للخرايط والـ widgets اللي محتاجة تتعمل على div جديد. والاتنين محتاجين [[use client]] لأنهم دوال.

[[beforeInteractive]] بيتحط في الـ HTML من السيرفر في الـ head، ومبيتنفذش تاني في التنقل. واستخدامه تقريبًا دايمًا غلط: بيأخر كل حاجة.

CSP: مع nonce لازم تبعت [[nonce]] لكل [[<Script>]]، وبـ [[strict-dynamic]] أي سكربت يحمّله هو بيعدّي.

و [[@next/third-parties]] (لسه experimental) فيه [[GoogleAnalytics]] و [[GoogleTagManager]] و [[YouTubeEmbed]] و [[GoogleMapsEmbed]] جاهزين بالاستراتيجية الصح. و JSON-LD مش سكربت بيتنفذ، فمكانه [[<script type="application/ld+json">]] عادي (درس JSON-LD).`,
            when: R`[[afterInteractive]] للـ analytics اللي محتاج أول page view. [[lazyOnload]] لأي حاجة المستخدم مش محتاجها أول ثانيتين. وحط السكربت في الـ layout أو الصفحة اللي محتاجاه بس، مش في الـ root layout لكل الموقع: خريطة الفروع مالهاش لازمة في صفحة الـ checkout.`,
            mistakes: R`[[<script>]] عادي في الـ layout فيتحمّل ويتنفذ مع كل تنقل أو يعطل الـ render. و [[beforeInteractive]] للـ analytics. و [[onLoad]] في server component فيطلع خطأ. و [[onLoad]] لحاجة محتاجة تتعمل بعد كل تنقل (الصح [[onReady]]). و inline [[<Script>]] من غير [[id]]. و [[strategy="worker"]] في App Router. وتحط ١٠ tags في GTM وتقيس الأداء من غيرهم.`
          },
          lines: [
            "الكومبوننت.",
            "عشان الـ nonce.",
            "الـ root layout.",
            "الـ nonce من الـ proxy (لو مفيش CSP بيبقى undefined وده عادي).",
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة.",
            R`analytics بعد الـ hydration، و [[data-domain]] بيتنقل للـ tag زي أي attribute.`,
            "الشات في وقت الفراغ بعد ما الصفحة كلها تحمّل.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`[[onReady]] دالة، فلازم client component.`,
            "الكومبوننت.",
            "الخريطة.",
            "بداية الـ JSX.",
            "Fragment.",
            "المكان اللي الخريطة هتترسم فيه.",
            R`[[onReady]]: أول مرة وكل ما الكومبوننت يتركّب تاني. [[onError]]: السكربت متحمّلش (adblock أو شبكة).`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بـ [[<script src>]] عادي في الـ head: الـ Total Blocking Time أعلى، والسكربت بيتحمّل بدري بيزاحم الـ JS بتاع الصفحة. بـ [[lazyOnload]]: في Network هتلاقيه آخر حاجة، بعد الـ chunks والصور وبعد حدث [[load]]، والـ TBT بيقل (الرقم نفسه بيختلف حسب السكربت والجهاز، المهم الاتجاه). و [[afterInteractive]] بيظهر بعد الـ chunks الأساسية وقبل الـ lazy.

الخريطة: السكربت اتحمّل مرة واحدة بس (هتلاقي طلب واحد لـ leaflet.js في Network طول الجلسة)، و [[onReady]] اتنادى مرتين: مرة أول ما حمّل، ومرة لما رجعت للصفحة، ودي اللحظة اللي محتاج ترسم فيها الخريطة على الـ div الجديد. لو كنت استخدمت [[onLoad]]، الخريطة كانت هتظهر أول مرة بس، وبعد الرجوع الـ div فاضي.

الغلط الشائع: تشوف leaflet.js مش بيتحمّل تاني وتفتكر إن فيه مشكلة كاش.`
        },
        {
          cmd: "analytics و consent",
          title: "analytics بعد موافقة الكوكيز: متحمّلش التتبع قبل ما المستخدم يوافق",
          desc: R`في أوروبا (GDPR و ePrivacy) وقوانين تانية كتير، كوكيز التتبع و pixels الإعلانات محتاجة موافقة قبل ما تتحط. «قبل» معناها السكربت نفسه ميتحمّلش، مش إنه يتحمّل وانت تخبي البانر.

الطريقة في Next: الموافقة في cookie ([[consent=granted]] أو [[denied]]). الـ root layout بيقراها بـ [[cookies()]]: لو موافق يرسم [[<GoogleAnalytics>]]، ولو لسه مردش يرسم البانر، ولو رفض ولا ده ولا ده. والبانر بينادي Server Action بتكتب الـ cookie، و Next بيعيد رسم الصفحة لوحده بعد أي تغيير في الـ cookies من action.`,
          example: R`// app/actions/consent.ts
"use server";
import { cookies } from "next/headers";
export async function setConsent(choice: "granted" | "denied") {
  (await cookies()).set("consent", choice, { maxAge: 60 * 60 * 24 * 180, sameSite: "lax", path: "/" });
}
// app/consent-banner.tsx
"use client";
import { setConsent } from "@/app/actions/consent";
export function ConsentBanner() {
  return (
    <div role="dialog" aria-label="الكوكيز" className="fixed inset-x-0 bottom-0 bg-white p-4 shadow">
      <p>بنستخدم Google Analytics عشان نعرف أنهي صفحات بتتقري. موافق؟</p>
      <button onClick={() => setConsent("granted")}>موافق</button>
      <button onClick={() => setConsent("denied")}>لأ، شكرًا</button>
    </div>
  );
}
// app/layout.tsx
import { cookies, headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ConsentBanner } from "./consent-banner";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const consent = (await cookies()).get("consent")?.value;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        {consent === "granted" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} nonce={nonce} />}
        {consent === undefined && <ConsentBanner />}
      </body>
    </html>
  );
}`,
          try: R`[[npm i @next/third-parties]]، وحط الملفات، وافتح الموقع في نافذة Incognito ومعاك Network مفلتر على [[google]]: فيه أي طلب قبل ما تدوس؟ دوس «لأ، شكرًا» واعمل refresh. امسح الـ cookie من DevTools ودوس «موافق»: إيه اللي اتحمّل ومن غير refresh؟ وآخر حاجة: فين المستخدم يغيّر رأيه بعدين؟ ضيف لينك «إعدادات الكوكيز» في الـ footer.`,
          flag: "script",
          deep: {
            why: R`الـ analytics بيتطلب في كل مشروع تقريبًا، وأشهر غلطة إنه يتحمّل في الـ layout من أول ثانية والبانر مجرد ديكور. ده مخالف للقانون في أوروبا (وفيه غرامات حقيقية)، وكمان بيخسرك أداء على ناس رافضين أصلًا. ولما القرار على السيرفر، الـ HTML نفسه مفيهوش السكربت، فمفيش حتى طلب واحد يتبعت قبل الموافقة.`,
            how: R`الـ layout بيقرا [[cookies()]]، فكل الصفحات بقت dynamic (لو عندك CSP بـ nonce هي كده كده dynamic). والـ Server Action اللي بتعمل [[cookies().set]]: Next بيعيد رسم الـ route الحالي في نفس الرد، فالبانر بيختفي و [[<GoogleAnalytics>]] بيظهر ويحمّل السكربت من غير refresh.

[[GoogleAnalytics]] من [[@next/third-parties/google]] بيحمّل [[gtag.js]] بعد الـ hydration، وبياخد [[nonce]]، وفيه [[sendGAEvent]] للأحداث. والـ page views في التنقل بتتسجل لوحدها من history events (لازم «Enhanced measurement» شغال في لوحة GA).

Google Consent Mode v2: بديل إنك «متحمّلش خالص». بتحمّل gtag بـ [[gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" })]]، فمبيحطش كوكيز وبيبعت pings من غير هوية، وبعد الموافقة [[gtag("consent", "update", ...)]]. ده اللي جوجل بيطلبه للإعلانات في أوروبا، بس لسه بيبعت طلبات قبل الموافقة، فراجع مع اللي مسؤول عن الخصوصية. ولو المشروع كبير، CMP جاهز (Cookiebot أو OneTrust أو Klaro).

والبديل الأبسط: analytics من غير كوكيز (Plausible أو Umami أو Vercel Analytics)، وناس كتير بتعتبرها مش محتاجة بانر، بس ده قرار قانوني مش تقني.

الـ cookie نفسها: مش httpOnly مش مشكلة هنا، ومدتها ٦ شهور تقريبًا عشان تسأل تاني. ولازم طريقة يغيّر بيها رأيه (زرار في الـ footer بيمسح الـ cookie).`,
            when: R`أي موقع فيه analytics بكوكيز أو pixels إعلانات (Meta و TikTok و Google Ads) وزواره ممكن يكونوا من أوروبا أو أي مكان عنده قانون مشابه. لو الـ analytics من غير كوكيز ومن غير بيانات شخصية، البانر غالبًا مش ضروري، بس اتأكد.`,
            mistakes: R`السكربت في الـ layout والبانر بيخبي نفسه بس. و «رفض» بيخفي البانر ومبيحفظش الرفض فيطلع تاني كل صفحة. وزرار «موافق» كبير و «رفض» مستخبي في إعدادات (ده في حد ذاته مخالف في أوروبا). وتقرا الـ consent في client component بـ [[document.cookie]] جوه [[useEffect]] فالصفحة ترسم وبعدين تحمّل، ويطلع hydration mismatch. وتحط GA و GTM الاتنين فكل page view يتحسب مرتين. وتنسى الـ nonce لما يكون فيه CSP.`
          },
          lines: [
            "Server Action.",
            "الـ cookies.",
            R`بتاخد الاختيار بنوع محدد، فمحدش يبعت قيمة غريبة من الـ client.`,
            R`تكتب الـ cookie ٦ شهور. أي كتابة cookies من action بتعيد رسم الصفحة.`,
            "قفلة.",
            "البانر محتاج onClick.",
            "الـ action.",
            "الكومبوننت.",
            "بداية الـ JSX.",
            R`[[role="dialog"]] و [[aria-label]] عشان قارئ الشاشة يعرف ده إيه.`,
            "الرسالة: بتقول بالظبط إيه اللي بيتحمّل.",
            "موافق: الـ action يكتب الـ cookie والصفحة تتعاد.",
            "رفض بنفس الحجم والمكان.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "الـ cookies والـ headers.",
            R`الكومبوننت الجاهز من [[@next/third-parties]].`,
            "البانر.",
            "الـ root layout.",
            R`الموافقة: [[granted]] أو [[denied]] أو [[undefined]] (لسه مردش).`,
            "الـ nonce لو فيه CSP.",
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة.",
            R`موافق بس؟ ارسم GA، فيتحمّل [[gtag.js]]. غير كده السكربت مش موجود في الـ HTML أصلًا.`,
            R`لسه مردش؟ البانر. ولو رفض، ولا ده ولا ده.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Incognito قبل ما تدوس: Network مفلتر على google فاضي خالص، و View Source مفيهوش [[googletagmanager]]. البانر ظاهر.

بعد «لأ، شكرًا»: البانر اختفى (الصفحة اتعاد رسمها من الـ action)، وفي Cookies هتلاقي [[consent=denied]]، وبعد refresh مفيش بانر ولا طلبات لجوجل.

بعد ما تمسح الـ cookie وتدوس «موافق»: من غير refresh هتلاقي طلب لـ [[googletagmanager.com/gtag/js?id=G-...]] وبعده طلبات [[collect]] لـ google-analytics، والبانر اختفى. ده لأن كتابة الـ cookie في الـ Server Action خلّت Next يرسم الـ layout تاني بـ [[consent === "granted"]].

إعدادات الكوكيز: زرار في الـ footer (client component) بينادي action بتعمل [[(await cookies()).delete("consent")]]، فالبانر يرجع. ولو المستخدم كان موافق وغيّر لرفض، [[gtag.js]] المحمّل مش هيختفي من الصفحة الحالية، فالأسلم [[window.location.reload()]] بعد الرفض. وكوكيز GA نفسها ([[_ga]]) بتتحط غالبًا على الدومين الأب ([[.example.com]])، فمسحها لازم يبقى بنفس الـ domain، وإلا بتفضل لحد ما تخلص.

الغلط الشائع: تختبر في نافذة عادية فيها consent قديمة وتفتكر إن GA بيتحمّل قبل الموافقة.`,
          solCode: R`// app/actions/consent.ts (زيادة)
export async function resetConsent() {
  (await cookies()).delete("consent");
}
// app/cookie-settings-link.tsx
"use client";
import { resetConsent } from "@/app/actions/consent";
export function CookieSettingsLink() {
  return <button onClick={async () => { await resetConsent(); window.location.reload(); }}>إعدادات الكوكيز</button>;
}`
        }
      ]
    },
    {
      t: "النشر",
      l: 3,
      n: "تختار تنشر فين، ومتغيرات البيئة وقت الـ build ووقت التشغيل، و Next على أكتر من نسخة، والترقية",
      items: [
        {
          cmd: "فين تنشر",
          title: "تنشر Next فين: Vercel ولا VPS ولا Docker ولا static؟",
          desc: R`٤ طرق: Vercel (أسهل حاجة، وكل ميزة شغالة من غير إعداد، والتفاصيل والحدود في تاب «Cloud و DevOps»). أو VPS بـ [[next build]] و [[next start]] ورا Nginx و PM2 (تاب «VPS» وتاب «Nginx»). أو Docker بـ [[output: "standalone"]] (تاب «Docker»). أو [[output: "export"]]: ملفات HTML static بتترفع على أي hosting، بس من غير سيرفر.

الـ static export بيمنع كل حاجة محتاجة سيرفر: Server Actions، و proxy، و Route Handlers غير الـ GET الثابتة، والصفحات الـ dynamic، و ISR، و image optimization الافتراضي.`,
          example: R`npm run build
npm start -- -p 3000
pm2 start npm --name shop -- start
npx vercel --prod
# Docker: output "standalone" في next.config (تاب Docker)
# static: output "export" والناتج في فولدر out
npx serve out`,
          try: R`اعمل build و start لمشروع الـ lab على جهازك. وبعدين جرّب [[output: "export"]] في next.config واعمل build: لو فيه Server Action أو صفحة بتقرا cookies هتلاقي خطأ بيقولك إيه اللي مش مدعوم. وافتح فولدر [[out]] وبص على الملفات.`,
          deep: {
            why: "Next مش ملفات static بس: فيه سيرفر Node بيرسم الصفحات وينفّذ الـ actions ويحوّل الصور ويخزّن الكاش. فالمكان اللي هتنشر فيه بيحدد إيه اللي هيشتغل وبكام، والاختيار الغلط بيبان بعد الإطلاق.",
            how: R`Vercel: الشركة اللي بتعمل Next، فكل ميزة جديدة شغالة يوم نزولها: CDN، و functions، و ISR موزّع، و preview لكل PR. العيب: السعر مع الترافيك العالي، وحدود الـ functions (المدة وحجم الطلب)، ومش مناسب لشغل طويل أو WebSockets.

VPS (أو أي سيرفر Node): [[next start]] سيرفر كامل، كل الميزات شغالة. انت مسؤول عن HTTPS و Nginx والـ restart والـ logs والـ scaling، ومناسب جدًا لمشروع متوسط بتكلفة ثابتة. و Next 16 محتاج Node 20.9 على الأقل.

Docker: نفس الـ VPS بس في image، و [[standalone]] بيصغّرها جدًا. ومناسب لـ Kubernetes و ECS و Fly و Railway.

وبين Vercel والـ VPS العريان فيه منصات بتشغّل Next كسيرفر Node كامل (كل الميزات شغالة) من غير ما تدير السيرفر بإيدك، وكلها في تاب «Cloud و DevOps»: Render بملف [[render.yaml]] (درس [[render.yaml]])، و Railway (درس [[railway]])، و Fly.io بالـ Dockerfile و [[fly.toml]] (درس [[fly launch]])، ولو عندك VPS وعايز تجربة زي Render عليه: Coolify أو Dokploy (درس [[Coolify / Dokploy]]).

Static export: [[next build]] بيطلّع [[out/]] فيه HTML لكل صفحة، بيترفع على S3 أو GitHub Pages أو أي CDN (تاب «Cloud و DevOps»). مناسب لمواقع محتوى أو docs أو landing من غير login. و [[next/image]] محتاج [[unoptimized: true]] أو loader خارجي.

وفيه adapters لمنصات تانية (Netlify و Cloudflare عن طريق OpenNext)، وفي Next 16 بدأ Build Adapters API (تجريبي) عشان المنصات تدعم Next رسميًا. بس دايمًا اختبر الميزات اللي بتستخدمها (ISR والـ proxy والصور) على المنصة دي بالذات.`,
            when: "Vercel لفريق صغير عايز يركز على المنتج أو MVP. VPS أو Docker لما التكلفة تفرق أو محتاج تحكم (نفس السيرفر فيه API وداتابيز). و static export لموقع ملوش أي حاجة dynamic.",
            mistakes: R`[[next dev]] على السيرفر «عشان الأخطاء تبان». و static export وبعدين تكتشف إن الفورم محتاج Server Action. و Next مكشوف على بورت 3000 للإنترنت من غير Nginx و HTTPS. و build على VPS فيه ١ جيجا رام فيقع (ابني في CI، أو زوّد swap، تاب «Node و npm»).`
          },
          lines: [
            R`ابني. نفس الأمر في كل الطرق (تفاصيل الجدول في تاب «Node و npm»).`,
            "شغّل على بورت 3000. على VPS بيبقى ورا Nginx مش مكشوف مباشرة.",
            R`خليه شغال بعد ما تقفل الـ SSH ويقوم لوحده لو وقع (PM2 في تاب «VPS»).`,
            "أو ارفع على Vercel من الترمنال (أو اربط الـ repo وكل push بيعمل deploy).",
            R`لو [[output: "export"]]: جرّب فولدر [[out]] محليًا بأي static server.`
          ],
          sol: R`[[npm run build]] وبعده [[npm start]] بيشغّلوا نسخة الإنتاج على [[localhost:3000]]: أسرع من dev بكتير، ومفيش overlay.

مع [[output: "export"]] الـ build بيقع على أول حاجة محتاجة سيرفر: صفحة بتقرا cookies بتطلّع [[Route /me with dynamic = "error" couldn't be rendered statically because it used cookies()]]، و Server Action بتطلّع [[Server Actions are not supported with static export.]] ولو مفيش حاجة من دول، هتلاقي فولدر [[out]] فيه [[index.html]] و HTML لكل صفحة، وملف [[.txt]] لكل صفحة (الـ RSC payload للتنقل)، و [[_next/static]]، و [[404.html]].

وخد بالك من [[next/image]]: الـ build عدّى عندي عادي، بس الـ HTML فيه [[/_next/image?url=...]] ودي مش موجودة على أي static server، فالصور بترجع 404. الحل [[images: { unoptimized: true }]] أو loader خارجي.`
        },
        {
          cmd: "env في Next",
          title: "متغيرات البيئة: وقت الـ build ولا وقت التشغيل؟",
          desc: R`Next بيقرا [[.env]] و [[.env.local]] و [[.env.production]] و [[.env.development]] لوحده من غير dotenv. [[.env.local]] للأسرار على جهازك ومبيترفعش على git، و [[.env]] للقيم الافتراضية اللي مش سرية.

المهم: [[NEXT_PUBLIC_*]] بتتكتب جوه الـ JS وقت الـ build، فتغييرها محتاج build جديد. والمتغيرات التانية بتتقري على السيرفر وقت التشغيل، بس لو صفحة static اتبنت وقت الـ build بتستخدم متغير، القيمة اللي كانت وقت الـ build هي اللي في الـ HTML.`,
          example: R`# .env.local (مبيترفعش)
DATABASE_URL="postgresql://app:secret@localhost:5432/shop"
SESSION_SECRET="change-me-32-random-bytes-base64"
# .env (بيترفع، قيم عامة)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
// lib/env.ts
import "server-only";
import * as z from "zod";
export const env = z.object({ DATABASE_URL: z.url(), SESSION_SECRET: z.string().min(32) }).parse(process.env);
// أي client component
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const bad = process.env["NEXT_PUBLIC_" + "SITE_URL"];`,
          try: R`حط [[NEXT_PUBLIC_SITE_URL]] واعمل build، وبعدين غيّرها في [[.env]] واعمل [[npm start]] من غير build: القيمة القديمة لسه في المتصفح. وبعدين اعمل صفحة static بتعرض [[process.env.GREETING]]، واعمل build، وغيّر GREETING وشغّل start: الصفحة لسه بالقديم لأنها اتبنت. خليها dynamic (بـ [[await connection()]] من [[next/server]] في أولها) وجرّب تاني.`,
          flag: "script",
          deep: {
            why: "«غيّرت المتغير على السيرفر وعملت restart والموقع لسه بالقيمة القديمة» من أشهر المشاكل في Next. السبب إن فيه وقتين مختلفين: الـ build والتشغيل، وكل متغير بيتقري في وقت منهم حسب هو فين وإزاي بيتستخدم.",
            how: R`ترتيب القراية (الأعلى بيكسب): [[process.env]] الحقيقي من النظام، وبعدين [[.env.$(NODE_ENV).local]]، وبعدين [[.env.local]] (مش بيتقري في test)، وبعدين [[.env.$(NODE_ENV)]]، وبعدين [[.env]]. و [[next dev]] بيبقى development، و [[next build]] و [[next start]] production.

[[NEXT_PUBLIC_]]: وقت الـ build بيتبدل نصيًا في كود المتصفح وكود السيرفر. فالـ Docker image اللي اتبنت بـ [[NEXT_PUBLIC_API_URL]] بتاع staging هتفضل staging في الإنتاج. لو محتاج نفس الـ image لكذا بيئة، اقرا القيمة على السيرفر وعدّيها للـ client (prop أو context)، أو اعمل route بيرجّع config.

المتغيرات العادية: بتتقري من [[process.env]] على السيرفر وقت تنفيذ الكود. في صفحة dynamic ده مع كل طلب. في صفحة static الكود اتنفذ وقت الـ build وخلاص.

والأسرار في Docker: وقت التشغيل من env_file أو secrets، مش [[ARG]] في الـ build (بتتحفظ في طبقات الـ image، تاب «Docker»). وفحص المتغيرات بـ Zod (أو t3-env اللي بيفصل server و client) في تاب «TypeScript».`,
            when: R`كل مشروع. واعمل [[.env.example]] فيه أسماء المتغيرات من غير قيم وارفعه، عشان اللي يعمل clone يعرف محتاج إيه.`,
            mistakes: R`ترفع [[.env.local]] على git. وتحط سر في [[NEXT_PUBLIC_]]. وتغيّر [[NEXT_PUBLIC_]] على السيرفر من غير build. وتعمل [[const { API_KEY } = process.env]] في client component وتستغرب إنه undefined. وتبعت كل المتغيرات كـ build args في Docker.`
          },
          lines: [
            "رابط الداتابيز: سر، على جهازك بس.",
            "سر الـ sessions.",
            "عام: بيتحط في الـ JS وقت الـ build، وأي حد يقدر يشوفه.",
            "الأسرار في ملف سيرفر بس.",
            "Zod.",
            "افحص المتغيرات مرة واحدة أول ما السيرفر يقوم: لو حاجة ناقصة يقع برسالة واضحة، مش بعد ساعة في نص طلب.",
            "في المتصفح: Next بدّل السطر ده بالقيمة الحرفية وقت الـ build.",
            R`مش هيشتغل: Next بيدوّر على [[process.env.NEXT_PUBLIC_X]] مكتوبة بالنص، فالاسم المركّب بيطلع undefined.`
          ],
          sol: R`بعد تغيير [[NEXT_PUBLIC_SITE_URL]] في [[.env]] وتشغيل [[npm start]] من غير build: المتصفح لسه بيعرض القيمة القديمة، لأنها اتكتبت جوه الـ JS وقت الـ build.

والصفحة الـ static اللي بتعرض [[process.env.GREETING]]: لسه بالقيمة القديمة بعد التغيير والـ restart، لأن الـ HTML اتبنى وقت الـ build وخلاص. وبعد [[await connection()]] الجدول بيقول [[ƒ]]، والصفحة بقت تعرض القيمة الجديدة من غير build، لأن الكود بيتنفذ مع كل طلب ويقرا [[process.env]] ساعتها. لو القيمة الجديدة مش ظاهرة حتى في الـ dynamic: نفس المتغير موجود في [[.env.local]] (وده بيكسب على [[.env]])، أو في متغيرات النظام.`
        },
        {
          cmd: "أكتر من نسخة",
          title: "Next على أكتر من سيرفر: الكاش ومفتاح الـ actions والـ streaming",
          desc: R`على Vercel ده محلول. لما تنشر بنفسك أكتر من نسخة ورا load balancer (أو حتى نسخة واحدة ورا Nginx)، فيه ٣ حاجات لازم تظبطها. الكاش (ISR و [[use cache]]): كل نسخة ليها واحد في الذاكرة والديسك، فمحتاج cache handler مشترك (Redis). ومفتاح تشفير الـ Server Actions لازم يبقى واحد في كل النسخ والـ builds ([[NEXT_SERVER_ACTIONS_ENCRYPTION_KEY]]). و [[deploymentId]] عشان المتصفح اللي فاتح نسخة قديمة وقت الـ deploy يعرف إن فيه جديدة.

ولو Nginx قدام Next، الـ buffering بيبوّظ الـ streaming: header [[X-Accel-Buffering: no]] من Next بيحلها.`,
          example: R`// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId: process.env.GIT_SHA,
  async headers() {
    return [{ source: "/:path*{/}?", headers: [{ key: "X-Accel-Buffering", value: "no" }] }];
  },
};
export default nextConfig;
# في CI: المفتاح بيتعمل مرة واحدة ويتحفظ secret، وكل build بيستخدمه
openssl rand -base64 32
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$ACTIONS_KEY" GIT_SHA=$(git rev-parse --short HEAD) npm run build`,
          try: R`شغّل نسختين من نفس المشروع على بورتين ([[PORT=3001 node server.js]] و [[PORT=3002]]) واعمل صفحة ISR فيها وقت الرسم. اعمل [[revalidatePath]] من نسخة وافتح التانية: لسه قديمة، لأن كل نسخة ليها كاش. وبعدين جرّب صفحة فيها Suspense بطيء من ورا Nginx من غير الـ header وشوف الصفحة كلها بتستنى.`,
          flag: "script",
          deep: {
            why: "كل حاجة شغالة على نسخة واحدة على جهازك، وبعد ما تكبّر لنسختين: الأدمن يعدّل منتج والزوار يشوفوا القديم نص الوقت، ومستخدمين يلاقوا «Failed to find Server Action» بعد كل deploy، وصفحات الـ streaming بتستنى كلها مرة واحدة ورا Nginx.",
            how: R`الكاش: Next بيحفظ ISR والـ fetch cache في الذاكرة و [[.next/cache]]. في النموذج القديم [[cacheHandler]] (مفرد) في next.config بيشاور على ملف بيخزّن في Redis أو غيره، و [[cacheMaxMemorySize: 0]] بيقفل كاش الذاكرة المحلي. ومع Cache Components فيه [[cacheHandlers]] (جمع) لـ [[use cache]]. وفيه مكتبات جاهزة لـ Redis. والبديل الأبسط: نسخة واحدة أكبر، أو كاش أقل وداتابيز سريعة.

الـ Server Actions: الـ closures والـ arguments المشفرة بتتشفر بمفتاح بيتعمل عشوائي مع كل build. لو النسخ من builds مختلفة، أو بنيت كل نسخة لوحدها، نسخة مش هتفك تشفير التانية. المفتاح الثابت بيحل ده.

الـ version skew: بعد deploy، المستخدم اللي الصفحة مفتوحة عنده معاه JS قديم بيطلب chunks أو actions مبقتش موجودة. [[deploymentId]] بيخلي Next يكتشف ده ويعمل reload كامل. واحتفظ بملفات [[.next/static]] القديمة شوية على الـ CDN لو تقدر.

والـ streaming: Nginx بيعمل buffer للـ response قبل ما يبعته. [[X-Accel-Buffering: no]] بيقفله للردود دي بس. وإعدادات Nginx نفسها في تاب «Nginx» (ومعاها WebSocket لو محتاج HMR ورا Nginx في التطوير).`,
            when: "أول ما تشغّل أكتر من نسخة (PM2 cluster، أو ٢ containers، أو Kubernetes)، أو أول ما تحط Nginx أو CDN قدام Next.",
            mistakes: R`تشغّل [[pm2 start -i max]] وتفتكر إن الكاش مشترك. وتبني image لكل سيرفر لوحده بمفاتيح مختلفة. وتنسى الـ buffering فتفتكر إن Suspense مش شغال. ومن غير [[deploymentId]] تلاقي أخطاء JS غريبة في Sentry بعد كل deploy.`
          },
          lines: [
            "النوع.",
            "الإعدادات.",
            R`image صغيرة لـ Docker (تاب «Docker»).`,
            "id لكل deploy (هنا الـ git commit). المتصفح اللي معاه نسخة قديمة بيعمل reload كامل بدل ما يطلب ملفات مبقتش موجودة.",
            "headers لكل الردود.",
            R`قول لـ Nginx ميعملش buffer، فالـ streaming و Suspense يوصلوا على دفعات.`,
            "قفلة.",
            "قفلة.",
            "تصدير.",
            "اعمل مفتاح مرة واحدة واحفظه في secrets الـ CI. متعملش واحد جديد مع كل build.",
            "البناء بنفس المفتاح في كل مرة، فكل النسخ وكل الـ builds يفهموا الـ actions بتاعة بعض."
          ],
          sol: R`شغّلت نسختين [[standalone]] على 3001 و 3002، وصفحة فيها [[revalidate = 3600]] ووقت الرسم. الاتنين في الأول نفس الوقت (وقت الـ build). بعد [[revalidatePath("/isr")]] من route على 3001: الـ 3001 بقت بوقت جديد، والـ 3002 لسه بالقديم، مع إن الاتنين شغالين من نفس الفولدر، لأن كل نسخة معاها كاش في الذاكرة. وده اللي الزوار هيشوفوه ورا load balancer: جزء من الطلبات قديم.

وتجربة Nginx: من غير [[X-Accel-Buffering: no]] (و [[proxy_buffering]] على الافتراضي on)، الصفحة اللي فيها Suspense بطيء بتوصل مرة واحدة بعد أبطأ جزء بدل ما الـ shell ييجي الأول، ومع الـ header الدفعات بترجع. لو النسختين بيعرضوا نفس الوقت الجديد: غالبًا بتضرب نفس البورت مرتين.`,
          solCode: R`npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
cd .next/standalone
# api/revalidate: route.ts بـ POST بينادي revalidatePath("/isr")
PORT=3001 node server.js &
PORT=3002 node server.js &
curl -s -X POST localhost:3001/api/revalidate
curl -s localhost:3001/isr | grep -o '<p id="t">[^<]*'
curl -s localhost:3002/isr | grep -o '<p id="t">[^<]*'`
        },
        {
          cmd: "next upgrade",
          title: "ترقّي Next من غير ما تكسر المشروع، وليه التحديث الأمني مش اختياري",
          desc: R`[[npx @next/codemod@canary upgrade latest]] بيرقّي Next و React ويشغّل الـ codemods اللي بتعدّل الكود لوحدها (async params، و middleware لـ proxy، وغيرهم). بعدها [[npm run build]] واقرا كل تحذير، واختبر الصفحات المهمة.

وخليك على آخر patch من النسخة اللي انت عليها. في مارس ٢٠٢٥ ثغرة في الـ middleware (CVE-2025-29927) خلّت الحماية اللي فيه تتخطى بـ header، وفي ديسمبر ٢٠٢٥ ثغرة React2Shell (CVE-2025-55182) في Server Components سمحت بتنفيذ كود على السيرفر من غير login، وأثرت على Next 15 و 16. والحل في الاتنين كان تحديث.`,
          example: R`npx next info
npm outdated next react react-dom
npx @next/codemod@canary upgrade latest
npx @next/codemod@canary middleware-to-proxy .
npx next typegen
npm run build
npm audit --omit=dev`,
          try: R`على branch جديد، رقّي مشروع قديم (Next 14 أو 15) بالأمر التالت، واقرا الـ diff اللي الـ codemods عملته قبل ما تعمل commit. دوّر على [[@next-codemod-error]]: ده معناه إن الـ codemod ملقاش طريقة يحوّل الكود ومحتاج تعدّله بإيدك.`,
          deep: {
            why: R`كل major في Next بيغيّر حاجات أساسية: 15 خلّى params و cookies async وقفل الكاش الافتراضي، و 16 غيّر اسم الـ middleware وشال [[next lint]] و AMP والوصول الـ sync للـ params. لو فضلت متأخر نسختين، الترقية بتبقى مشروع لوحدها. والأسوأ: الثغرات بتتصلح في النسخ المدعومة بس.`,
            how: R`[[@next/codemod]] بيقرا الكود ويعدّله بالـ AST: يحط [[await]] قبل [[params]] و [[cookies()]]، ويغيّر imports اتنقلت، ويغيّر أسماء config. واللي مش قادر يحوّله أوتوماتيك بيعلّم عليه بتعليق [[@next-codemod-error]] أو نوع [[UnsafeUnwrapped...]] عشان تعدّله بإيدك.

أهم تغييرات Next 16: Turbopack افتراضي، و [[proxy.ts]]، و Cache Components (اختياري)، و [[revalidateTag]] بـ profile، و [[default.tsx]] إجباري للـ parallel routes، و [[next lint]] اتشال، وتغييرات في defaults الصور، و Node 20.9 على الأقل، و React 19.2.

الترتيب الآمن: branch، وترقية، وقراية الـ diff، و build، واختبار الـ flows المهمة (login، ودفع، وفورم)، ولو فيه E2E tests (Playwright) شغّلها، وبعدين staging، وبعدين الإنتاج.

والأمان: تابع الـ security advisories على GitHub بتاع Next و React، وفعّل Dependabot. ثغرة React2Shell كانت خطيرة لدرجة إن أي تطبيق App Router كان معرّض حتى لو مش كاتب Server Actions، والحل كان التحديث لآخر patch فورًا.`,
            when: "الـ patches (زي 16.2.x) فورًا وخصوصًا الأمنية. الـ minor (16.x) كل شهر أو اتنين. والـ major بعد ما يطلع بشهر أو اتنين والمكتبات اللي بتستخدمها (next-intl والـ auth) تدعمه.",
            mistakes: R`[[npm i next@latest]] بس من غير codemods ومن غير ما تقرا دليل الترقية. وتفضل على Next 13 سنتين «عشان شغال». وتعمل ترقية major يوم خميس قبل إطلاق. وتتجاهل التحذيرات في الـ build لحد ما تبقى أخطاء في النسخة الجاية.`
          },
          lines: [
            "نسخ Next و React و Node الحالية.",
            "النسخة الحالية، والأحدث المسموح بيها، والأحدث خالص.",
            "الترقية: بيحدّث الباكدجات ويسألك على الـ codemods اللي تشغّلها.",
            R`لو جاي من Next 15: [[middleware.ts]] لـ [[proxy.ts]] والدالة لـ [[proxy]].`,
            R`ولّد أنواع [[PageProps]] و [[LayoutProps]] و [[RouteContext]] من غير ما تشغّل dev.`,
            R`ابني. أخطاء TS في [[params]] أو [[cookies()]] من غير await هتطلع هنا.`,
            R`دوّر على ثغرات معروفة في باكدجات الإنتاج (تفاصيل npm audit في تاب «Node و npm»).`
          ],
          sol: R`الـ diff المتوقع لو جاي من 15: [[function Page({ params }: { params: { id: string } })]] بقت [[async function Page(props: { params: Promise<{ id: string }> })]] وتحتها [[const params = await props.params]]، و [[cookies().get(...)]] بقت [[(await cookies()).get(...)]]، و [[middleware.ts]] بقى [[proxy.ts]] والدالة اسمها [[proxy]]، و [[package.json]] فيه نسخ Next و React الجديدة.

و [[@next-codemod-error]] بيظهر في الأماكن اللي الـ codemod مقدرش يخليها async لوحده، زي دالة helper عادية (مش كومبوننت) بتنادي [[cookies()]]. جربتها على [[getTheme()]] sync: الـ codemod لف النداء بـ [[cookies() as unknown as UnsafeUnwrappedCookies]] وحط فوقه تعليق [[@next-codemod-error Await this API and update its callers]]. الحل بإيدك: خلي [[getTheme]] async واعمل await في كل مكان بيناديها، وامسح الـ cast. ودوّر على [[UnsafeUnwrapped]] في المشروع كله قبل الـ merge.`,
          solCode: R`grep -rn "@next-codemod-error\|UnsafeUnwrapped" src app lib --include=*.ts --include=*.tsx`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Next.js، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "RSC مش SSR",
          title: "Server Components هي هي SSR؟ (RSC vs SSR)",
          desc: R`لأ. SSR إن الكومبوننت يترسم HTML على السيرفر في أول تحميل، وبعدين نفس الكود يتبعت للمتصفح ويعمل hydration، وده بيحصل للـ client components كمان. Server Components بتشتغل على السيرفر بس، ومبتتبعتش للمتصفح خالص: ملهاش JS ولا hydration، وتقدر تبقى async وتكلّم الداتابيز. في App Router الاتنين مع بعض: الـ server components بتطلّع RSC payload، و Next بيستخدمه مع SSR الـ client components عشان يطلّع HTML أول مرة. والتنقل بعد كده بيجيب RSC payload بس، مش HTML.`,
          example: R`// server component: HTML بس، وصفر JS
export default async function Page() { const posts = await db.post.findMany(); return <PostList posts={posts} />; }
// client component: HTML من SSR، والكود كمان بيتبعت ويعمل hydration
"use client";
export function LikeButton() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>{n}</button>; }`,
          try: R`افتح صفحة فيها الاتنين، و View Source: الاتنين موجودين HTML. وبعدين DevTools > Sources: هتلاقي [[LikeButton]] ومش هتلاقي [[Page]].`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الفرق بين «فين الكود بيترسم» و «فين الكود بيشتغل»، وإنك مش بتقول مصطلحات وخلاص.",
            how: R`نقط لو اتسألت أكتر: الـ RSC payload تنسيق خاص (Flight) فيه ناتج الـ server components ومراجع للـ client components والـ props بتاعتها. والـ server components بتترسم وقت الـ build (static) أو مع الطلب (dynamic). والـ client component مينفعش يعمل import لـ server component، بس ينفع ياخده children. والـ props بين الاتنين لازم serializable.`,
            when: "«إزاي الـ server component بيوصل للمتصفح لو مفيش JS؟» (RSC payload)، و «إمتى تستخدم use client؟»، و «الـ client component بيترسم على السيرفر؟» (أيوة، SSR)، و «Server Components ينفع فيها useState؟» (لأ).",
            mistakes: R`«Server Components هي SSR باسم جديد». و «use client يعني مبيترسمش على السيرفر». و «server components أسرع دايمًا» من غير ما تقول ليه (JS أقل، وداتا جنب الداتابيز).`
          },
          lines: [
            "بيشتغل على السيرفر بس، والكود ده مش في الـ bundle بتاع المتصفح (بيتبني في bundle السيرفر بس).",
            "حد client.",
            "بيترسم على السيرفر (SSR) وبيشتغل في المتصفح كمان."
          ],
          sol: R`View Source: الليستة ونص الزرار ([[0]]) الاتنين في الـ HTML، لأن الاتنين اترسموا على السيرفر: الـ server component عشان ده مكانه، والـ client component بالـ SSR. وفي Sources (بعد build و start) [[LikeButton]] موجود في ملف تحت [[_next/static/chunks]]، و [[Page]] ومكتبة الداتابيز مش موجودين.

الإجابة لو اتسألت: «الاتنين بيطلعوا HTML. الفرق إن كود الـ client component بيتبعت للمتصفح ويعمل hydration فالزرار يشتغل، وكود الـ server component مبيتبعتش أصلًا، والمتصفح بياخد ناتجه بس جوه الـ RSC payload». لو لقيت [[Page]] في Sources: انت على dev (source maps للـ debugging)، أو الصفحة عليها [[use client]].`
        },
        {
          cmd: "SSG و SSR و ISR و CSR",
          title: "الفرق بين SSG و SSR و ISR و CSR؟ وتعمل كل واحد إزاي في App Router؟",
          desc: R`الفرق في «إمتى وفين الـ HTML بيتعمل». SSG: وقت الـ build، مرة واحدة، أسرع حاجة (مقالات و landing). SSR: مع كل طلب على السيرفر، للداتا الشخصية أو اللي بتتغير كل ثانية. ISR: static بس بيتجدد كل فترة أو عند حدث، للمنتجات والأسعار. CSR: الـ HTML فاضي والمتصفح بيجيب الداتا ويرسم، للوحات تحكم ورا login. في App Router مفيش دوال منفصلة: الصفحة static افتراضيًا، وبتبقى dynamic لو قرت cookies أو searchParams، و ISR بـ [[revalidate]] أو [[cacheLife]]، و CSR بـ client component بيجيب داتا. ومع Cache Components الصفحة الواحدة ممكن تجمع الأنواع دي (Partial Prerendering).`,
          example: R`export const revalidate = 3600;
const posts = await fetch(url, { next: { revalidate: 60 } });
const session = (await cookies()).get("session");`,
          try: R`اعمل ٣ صفحات بالتلات طرق، و build، وقارن الرموز في الجدول، والـ TTFB بتاع كل واحدة بـ [[curl -o /dev/null -s -w "%{time_starttransfer}" URL]].`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار طريقة الرسم حسب الداتا مش بالعادة، وإنك عارف التمن: السرعة، وتكلفة السيرفر، وقدم الداتا.",
            how: R`قارن بـ ٣ أسئلة: الداتا بتتغير قد إيه؟ شخصية ولا للكل؟ محتاجة SEO؟ مقال: SSG أو ISR. صفحة منتج: ISR، والسلة جواها dynamic. الـ dashboard: SSR أو CSR. ومن Pages Router: [[getStaticProps]] = SSG، و [[getServerSideProps]] = SSR، و [[revalidate]] جوه getStaticProps = ISR. والـ streaming بيقلل عيب SSR: الـ shell بيوصل قبل الداتا البطيئة.`,
            when: "«ليه صفحتي dynamic مع إني مش عايز؟»، و «ISR بيشتغل إزاي على أكتر من سيرفر؟»، و «يعني إيه stale-while-revalidate؟»، و «Partial Prerendering يعني إيه؟».",
            mistakes: R`«SSR أحسن للـ SEO من SSG» (الاتنين HTML كامل). و «CSR مينفعش للـ SEO خالص» (جوجل بيشغّل JS، بس أبطأ وأقل ضمان). ونسيان إن [[next dev]] بيرسم كل حاجة مع كل طلب.`
          },
          lines: [
            "ISR على الصفحة كلها (النموذج القديم).",
            "ISR على طلب واحد.",
            "قراية cookie بتخلي الصفحة SSR (dynamic)."
          ],
          sol: R`الجدول: صفحة الـ SSG [[○]]، والـ ISR [[○]] برضه بس جنبها رقم في عمود Revalidate (زي [[1h]])، والـ SSR [[ƒ]]. ولو عملت صفحة CSR (client component بيجيب الداتا في useEffect) هتلاقيها ○ هي كمان، لأن الـ HTML الفاضي بتاعها static والداتا بتيجي بعدين في المتصفح.

والـ TTFB على جهازك: ○ بتاخد ملّي ثواني قليلة (ملف جاهز)، و ƒ أكتر حسب شغلها، وممكن مئات الملّي ثواني لو فيها query بطيء. و CSR الـ TTFB بتاعها صغير زي SSG، بس الداتا بتظهر متأخر، والـ curl مش بيقيس ده. الإجابة: «SSG و ISR أسرع وأرخص، و SSR بيدفع مع كل طلب، و CSR الـ TTFB صغير بس المحتوى متأخر ومش في الـ HTML».`
        },
        {
          cmd: "action ولا route",
          title: "Server Action ولا Route Handler؟ (Server Actions vs Route Handlers)",
          desc: R`Server Action للـ mutations اللي جاية من الواجهة بتاعتي: فورم أو زرار. بيشتغل من غير JS (progressive enhancement)، والأنواع متشاركة، وبيعمل revalidate ويرجّع الصفحة الجديدة في نفس الرحلة. Route Handler لما حد تاني محتاج URL ثابت و HTTP عادي: تطبيق موبايل، و webhook، و API عام، و RSS، أو GET بيتكاش. والاتنين endpoints عامة، فالـ auth والـ validation جوه كل واحد. ومش بستخدم الاتنين لجلب داتا لـ server component: بنادي الدالة مباشرة.`,
          example: R`// app/actions.ts
"use server";
export async function like(postId: string) { const { userId } = await verifySession(); await db.like.create({ data: { postId, userId } }); revalidatePath("/posts"); }
// app/api/posts/route.ts
export async function GET() { return Response.json(await db.post.findMany({ take: 20 })); }`,
          try: R`اعمل like بالطريقتين، وقارن في Network: الـ action طلب POST على نفس الصفحة ورجع معاه الـ UI الجديد، والـ route رجّع JSON وانت اللي لازم تحدّث الشاشة.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الأدوات الجديدة ومش بتعمل API لكل حاجة بعادة الـ SPA، ولا بتستخدم Server Actions في مكان محتاج API حقيقي.",
            how: R`حاجات تقولها: الـ actions بتتنفذ واحد ورا التاني من نفس الـ client، فمش مناسبة لجلب داتا بالتوازي. والـ ID بتاعها بيتغير مع كل build (مشكلة لو client قديم). والـ route handlers بتدعم كل الـ methods و streaming responses و headers كاملة. ولو التطبيق هيبقى ليه تطبيق موبايل، API منفصل أو route handlers من الأول بيوفّر إعادة كتابة.`,
            when: "«إزاي Server Action بيتحمي من CSRF؟» (POST بس، ومقارنة Origin بـ Host)، و «ينفع تنادي Server Action من تطبيق موبايل؟» (تقنيًا آه بس مش API ثابت)، و «إيه مشكلة fetch لـ /api من server component؟».",
            mistakes: R`«Server Actions بديل كامل للـ API». و «Route Handlers قديمة». و fetch لـ [[/api/...]] من server component في نفس التطبيق.`
          },
          lines: [
            "ملف actions.",
            "mutation من الواجهة: session، وتعديل، وتحديث الصفحة.",
            "endpoint عام بـ URL ثابت لأي client."
          ],
          sol: R`الـ like بالـ action: طلب [[POST]] على URL الصفحة نفسها، فيه header [[Next-Action]]، والرد [[text/x-component]] (RSC payload) فيه الصفحة بعد [[revalidatePath]]، فالعدد اتحدث من غير ما تكتب أي كود تحديث. والـ route: طلب لـ [[/api/posts]] ورده [[application/json]]، ولازم انت تعمل fetch وتحط النتيجة في state (أو [[router.refresh()]]).

الإجابة: «الـ action أقل كود للواجهة بتاعتي والصفحة بتتحدث في نفس الرحلة، والـ route هو اللي ينفع لأي client تاني». لو الـ action رجع ومفيش تحديث: نسيت [[revalidatePath]].`
        },
        {
          cmd: "hydration mismatch",
          title: "يعني إيه hydration، وإيه اللي بيطلّع hydration error؟",
          desc: R`الـ hydration إن React في المتصفح ياخد الـ HTML اللي جه من السيرفر، ويرسم نفس الكومبوننتات، ويربط الـ events بالـ DOM الموجود بدل ما يعمله من الأول. لو اللي اترسم في المتصفح أول مرة مختلف عن HTML السيرفر، يطلع hydration error. الأسباب المشهورة: قيم بتختلف بين الاتنين ([[Date.now()]] و [[Math.random()]] والتوقيت والـ locale)، و [[typeof window !== "undefined"]] جوه الـ render، و localStorage، و HTML مش صالح ([[<div>]] جوه [[<p>]])، و extensions في المتصفح بتعدّل الـ DOM. والحل: القيم اللي تخص المتصفح بس تتحط في [[useEffect]] بعد الـ hydration، أو الجزء ده ميترسمش على السيرفر ([[dynamic]] بـ [[ssr: false]])، و [[suppressHydrationWarning]] لحالات قليلة معروفة زي الثيم على [[<html>]].`,
          example: R`"use client";
export function Now() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => setTime(new Date().toLocaleTimeString("ar-EG")), []);
  return <span>{time ?? "--:--"}</span>;
}`,
          try: R`اكتب [[<span>{new Date().toLocaleTimeString()}</span>]] في client component مباشرة وافتح الصفحة واقرا الخطأ في الـ console. وبعدين حط [[<div>]] جوه [[<p>]] وشوف الخطأ التاني.`,
          flag: "script",
          deep: {
            why: "أكتر خطأ بيقابل الناس في Next، وبيختبر إنك فاهم إن الكومبوننت بيترسم مرتين في مكانين مختلفين.",
            how: R`React 19 بيطلّع رسالة فيها diff بالفرق. ولو حصل mismatch، React بيرمي الـ HTML بتاع الجزء ده ويرسمه من الأول في المتصفح، يعني خسرت فايدة SSR فيه وممكن يحصل وميض. والـ server components مبتعملش hydration أصلًا، فالمشكلة في الـ client components بس. والتواريخ: السيرفر غالبًا UTC والمستخدم في القاهرة، فحتى [[toLocaleDateString]] ممكن يختلف: ابعت التاريخ منسّق من السيرفر أو حدد [[timeZone]].`,
            when: "«ليه useEffect بيحل المشكلة؟» (بيشتغل بعد الـ hydration بس)، و «إمتى suppressHydrationWarning مقبول؟»، و «Server Components بتعمل hydration؟» (لأ).",
            mistakes: R`«بحط suppressHydrationWarning على كل حاجة». و [[if (typeof window !== "undefined")]] في الـ render نفسه (ده بيعمل الـ mismatch مش بيحله). وتجاهل التحذير لأن «الصفحة شغالة».`
          },
          lines: [
            "client component.",
            "ساعة.",
            R`القيمة الأولى [[null]] على السيرفر وفي المتصفح، فالاتنين يطلّعوا نفس HTML.`,
            "بعد الـ hydration بس، احسب الوقت الحقيقي بتوقيت الجهاز.",
            "placeholder لحد ما الوقت يتحسب.",
            "قفلة."
          ],
          sol: R`الوقت: في dev الـ console فيها [[Hydration failed because the server rendered text didn't match the client]] ومعاها ليستة بالأسباب ([[typeof window]]، و [[Date.now()]]، والـ locale) و diff. بس ممكن متشوفوش خالص: لو السيرفر والمتصفح في نفس الـ timezone ورسموا في نفس الثانية، النص بيطابق بالصدفة. جربتها والمتصفح على [[Africa/Cairo]] والسيرفر UTC: الخطأ طلع على طول. وده بالظبط ليه الـ bug ده بيظهر عند المستخدمين ومش عندك.

و [[<div>]] جوه [[<p>]]: [[In HTML, <div> cannot be a descendant of <p>. This will cause a hydration error.]] وبعدها [[Hydration failed because the server rendered HTML didn't match the client]]، لأن المتصفح بيقفل الـ [[<p>]] قبل الـ [[<div>]] وهو بيقرا الـ HTML، فالـ DOM بقى مختلف عن اللي React متوقعه. الحل: [[<div>]] بدل [[<p>]]، والوقت في [[useEffect]] زي المثال.`
        },
        {
          cmd: "proxy مش حماية",
          title: "ليه الـ auth في الـ middleware (proxy) لوحده مش كفاية؟",
          desc: R`لأن الـ proxy طبقة واحدة قدام التطبيق، وأي مسار للداتا مش بيعدّي منها، أو بيعدّي بطريقة مش متوقعة، بيبقى مكشوف. Server Actions و Route Handlers و RSC requests كلها مسارات، والـ matcher ممكن يفوّت حاجة. والـ layout كمان مش كفاية لأنه مبيترسمش تاني في التنقل. وفيه مثال حقيقي: CVE-2025-29927 في مارس ٢٠٢٥، header واحد ([[x-middleware-subrequest]]) كان بيخلي Next يتخطى الـ middleware خالص في النسخ المستضافة ذاتيًا. فبستخدم الـ proxy لفحص متفائل سريع (redirect للي مفيش معاه cookie)، والحماية الحقيقية في Data Access Layer: كل query للداتا الخاصة بيتحقق من الـ session والملكية بنفسه.`,
          example: R`export async function getOrder(id: string) {
  const { userId } = await verifySession();
  return db.order.findFirst({ where: { id, userId } });
}`,
          try: R`في مشروعك، دوّر على كل [[db.]] في server actions و route handlers وشوف: كام واحد مبيتحققش من المستخدم بنفسه ومعتمد إن «الصفحة محمية»؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفكر في الحماية كـ defense in depth، ومتابع التغييرات والثغرات مش حافظ توتوريال قديم.",
            how: R`الاسم نفسه اتغير في Next 16 لـ proxy عشان يبعد الناس عن فكرة «middleware بيحمي route» بتاعة Express. والـ proxy بيشتغل مع كل طلب بما فيهم الـ prefetch، فعمل query للداتابيز فيه بيبطّأ كل حاجة. والـ DAL فيه [[server-only]] و [[cache()]] و DTOs. والصلاحيات (الدور) بتتقري من الداتابيز للعمليات الحساسة، مش من التوكن بس.`,
            when: "«إزاي تعمل role-based access في Next؟»، و «فين بتتحقق في Server Action؟»، و «إيه هو IDOR وإزاي تمنعه؟»، و «إيه اللي اتغير في middleware في Next 16؟».",
            mistakes: R`«الـ middleware بيحمي كل حاجة». و «الـ layout بيتحقق فالصفحات تحته آمنة». ونسيان الـ Server Actions تمامًا في الإجابة.`
          },
          lines: [
            "دالة في الـ DAL.",
            "التحقق جنب الداتا.",
            "والملكية جوه الـ query نفسه.",
            "قفلة."
          ],
          sol: R`الناتج المتوقع: ليستة بكل مكان فيه [[db.]] جوه ملف عليه [[use server]] أو في [[route.ts]]، وجنب كل واحد سؤالين: فيه [[verifySession()]] (أو [[requireAdmin()]]) قبله؟ والـ where فيه [[userId]] أو فحص ملكية؟ أي واحد ناقصه حاجة من دول وبيلمس داتا خاصة ده ثغرة، حتى لو «الصفحة محمية بالـ proxy».

الأوامر اللي تحت بتبدأك: التالت بيطلّع ملفات الـ actions اللي مفيهاش [[verifySession]] ولا [[requireAdmin]] خالص. والإجابة في الانترفيو: «الـ proxy فحص متفائل للـ UX، والحماية في الـ DAL جنب الداتا، لأن الـ actions والـ route handlers endpoints عامة، والـ matcher ممكن يفوّت مسار، و CVE-2025-29927 وراني إن الطبقة دي نفسها ممكن تتخطى».`,
          solCode: R`grep -rl '"use server"' src app | xargs grep -n "db\."
find src app -name "route.ts" | xargs grep -n "db\."
grep -rl '"use server"' src app | xargs grep -L "verifySession\|requireAdmin"`
        },
        {
          cmd: "صفحة بطيئة",
          title: "صفحة Next بطيئة: هتبدأ منين؟ (Debugging a slow Next.js page)",
          desc: R`أول حاجة أقيس وأعرف البطء فين: السيرفر (TTFB عالي) ولا المتصفح (LCP أو INP). لو السيرفر: أشوف الصفحة static ولا dynamic في جدول الـ build، ولو dynamic من غير سبب (cookies في الـ layout) أصلّحها، وأدوّر على waterfalls (await ورا await) وأحوّلها لـ [[Promise.all]]، وأكاش الـ queries اللي نتيجتها واحدة للكل، وأعزل الجزء البطيء في Suspense عشان الباقي يوصل. لو المتصفح: صورة الـ LCP بـ [[next/image]] و [[fetchPriority]]، والخطوط بـ [[next/font]]، وحجم الـ JS: [[use client]] في أصغر مكان و [[next/dynamic]] للتقيل، وأشوف الـ bundle بـ [[next experimental-analyze]]. وأقيس تاني بعد كل تغيير، ومن زوار حقيقيين مش Lighthouse بس.`,
          example: R`npm run build
curl -o /dev/null -s -w "TTFB %{time_starttransfer}s\n" https://shop.example.com/products
npx next experimental-analyze`,
          try: "خد أبطأ صفحة في مشروعك وامشي على الخطوات بالترتيب، واكتب الرقم قبل وبعد كل خطوة.",
          deep: {
            why: "بيختبر إن عندك منهج: بتقيس قبل ما تغيّر، وبتفرّق بين مشاكل السيرفر ومشاكل المتصفح، مش بتقول «هحط useMemo» وخلاص.",
            how: R`الأدوات: جدول [[next build]]، و Network tab (TTFB والـ waterfall)، و Lighthouse و Performance panel للمتصفح، و web-vitals أو Vercel Speed Insights من زوار حقيقيين، و OpenTelemetry ([[instrumentation.ts]]) أو Sentry لتتبع الـ queries على السيرفر. وأسباب شائعة: N+1 queries في الـ DAL، و index ناقص (تاب «SQL و Prisma»)، و fetch لـ API بطيء من غير كاش ولا timeout، و Nginx بيعمل buffer للـ streaming، وسيرفر في منطقة بعيدة عن الداتابيز.`,
            when: "«إزاي تعرف الصفحة static ولا dynamic؟»، و «إيه هو LCP و INP و CLS؟»، و «إزاي تمنع waterfall؟»، و «إمتى تستخدم Suspense؟».",
            mistakes: R`تبدأ بـ [[useMemo]] و [[memo]] في كل حتة من غير قياس. وتقيس على جهازك ونت البيت بس. وتحسّن رقم Lighthouse وتسيب TTFB بتاع السيرفر ثانيتين.`
          },
          lines: [
            "اقرا الجدول: الصفحة ○ ولا ƒ؟",
            "قيس TTFB من الترمنال: لو عالي، المشكلة على السيرفر.",
            "شوف إيه اللي تقيل في الـ JS."
          ],
          sol: R`مفيش ناتج واحد صح، بس الورقة اللي المفروض تطلع بيها شكلها كده: الرقم قبل (TTFB من curl، و LCP و INP من Lighthouse على موبايل)، وبعدين كل خطوة ورقمها. أمثلة لسلسلة منطقية: الجدول قال ƒ والصفحة عامة، لقيت [[cookies()]] في الـ layout عشان الثيم، نقلتها لـ client component، الصفحة بقت ○ والـ TTFB نزل. أو TTFB عالي، لقيت ٣ await ورا بعض، حوّلتهم [[Promise.all]]، الـ TTFB بقى قد أبطأ واحد بس. أو TTFB كويس و LCP وحش، صورة الـ hero [[<img>]] كبيرة، حوّلتها [[next/image]] بـ [[fetchPriority]].

المهم تغيّر حاجة واحدة وتقيس، عشان تعرف أنهي تغيير عمل الفرق، وتقيس على [[build]] و [[start]] مش dev. ولو الأرقام بتتنطط بين القياسات: قيس ٣ مرات وخد الوسط، واقفل الـ extensions في المتصفح.`
        }
      ]
    }
]);
