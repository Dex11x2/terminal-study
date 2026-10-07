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
          teach: R`## الفكرة: ٤ ملفات، كل واحد ليه شغلانة

المثال مش صفحة، ده **التجهيز**: ٤ ملفات بيخلّوا اللغة جزء من الـ URL. واحد بيعرّف اللغات، وواحد بيحوّل الطلبات، وواحد بيحمّل الرسايل، وواحد بيربط المكتبة بـ Next. كله اتشغّل في مشروع Next 16.4 و next-intl 4.14 (اتعمل بـ create-next-app وفولدر [[src]])، بـ [[next build]] و [[next start]]، والطلبات بـ [[curl]] من Git Bash.

---

## ١. [[src/i18n/routing.ts]]: اللغات إيه والافتراضية مين

~~~text src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({ locales: ["ar", "en"], defaultLocale: "ar" });
~~~

- [[defineRouting]] دالة من next-intl بتاخد object إعدادات وترجّعه متظبط ومعاه الأنواع.
- [[locales]]: الـ locale هو كود اللغة (وممكن معاه البلد زي [[ar-EG]]). هنا لغتين: [[ar]] و [[en]]، ودول اللي هيبقوا أول جزء في الـ URL.
- [[defaultLocale]]: اللغة اللي بيروح لها أي حد مش عارفين لغته.
- [[export const routing]]: بنصدّره لأن التلات ملفات التانيين (والـ layout في الدرس الجاي) بيستوردوه. الإعدادات في مكان واحد، فلو ضفت [[fr]] بتضيفها هنا بس.

---

## ٢. [[src/proxy.ts]]: اللي بيوقف كل طلب ويحط اللغة

[[proxy.ts]] ملف Next بيشتغل **قبل** أي صفحة، مع كل طلب (في Next 15 كان اسمه [[middleware.ts]]). ولازم يبقى جنب فولدر [[app]]: في [[src/proxy.ts]] لو المشروع فيه [[src]].

### [[import createMiddleware from "next-intl/middleware";]]

next-intl بيصدّر دالة جاهزة (export default، فبتسميها أي اسم). [[createMiddleware]] بتاخد الإعدادات وترجّع دالة proxy كاملة.

### [[export default createMiddleware(routing);]]

Next بيدوّر في [[proxy.ts]] على الدالة اللي هيناديها: export default أو دالة اسمها [[proxy]]. هنا الـ default هو اللي رجع من [[createMiddleware]]. سطر واحد، بس جواه الشغل كله:

1. الـ URL فيه لغة مدعومة ([[/ar/...]] أو [[/en/...]])؟ يسيبه يكمّل.
2. مفيهوش؟ يختار لغة بالترتيب ده: cookie اسمها [[NEXT_LOCALE]] من زيارة قديمة، وبعدين header [[Accept-Language]] (اللغات اللي المتصفح بيقول إن صاحبه بيفهمها)، وبعدين [[defaultLocale]].
3. يرد بـ redirect للـ URL نفسه بعد ما يحط اللغة قدامه.

### [[export const config = { matcher: ... }]]

[[config]] اسم محجوز: Next بيقرا منه [[matcher]]، يعني «الـ proxy يشتغل على أنهي مسارات بس». ولو مفيش matcher بيشتغل على كل حاجة، حتى ملفات الـ JS والصور.

الـ matcher هنا regex، نفكّه حتة حتة:

~~~text الـ matcher
/(  (?!api|trpc|_next|_vercel|.*\\..*)  .*  )
~~~

| الحتة | معناها |
|---|---|
| [[/]] | المسار بيبدأ بـ / |
| [[(?! ... )]] | negative lookahead: «اللي جاي بعد الـ / **ميبدأش** بأي حاجة من دول». مبياكلش حروف، بيبص بس |
| [[api]] و [[trpc]] | طلبات الـ API: ملهاش لغة |
| [[_next]] | ملفات Next نفسها ([[/_next/static/...]]) |
| [[_vercel]] | مسارات خاصة بـ Vercel |
| الخط الرأسي بينهم | «أو» |
| [[.*\\..*]] | أي مسار فيه نقطة: [[favicon.ico]] و [[logo.png]] |
| [[.*]] الأخيرة | لو الشرط عدّى، امسك باقي المسار كله |

ليه [[\\.]] بشرطتين؟ النقطة في الـ regex معناها «أي حرف»، فعشان تبقى نقطة حرفية بنكتب [[\.]]. والـ regex مكتوب جوه string في JavaScript، والـ string نفسها بتاكل شرطة، فبنكتب اتنين عشان توصل واحدة.

وده مش كلام نظري: لما كتبناه غلط بشرطة واحدة، Next فهمه [[.*..*]] (يعني «أي حرفين»)، فكل المسارات اتعتبرت ملفات واتستثنت. الـ [[/]] لوحدها بس اتحوّلت، و [[/about]] رجعت 404 من غير ما الـ proxy يشوفها. ودي النتيجة بعد ما صلحناها:

~~~text الناتج (curl)
/          307  location: /ar
/about     307  location: /ar/about
/products  307  location: /ar/products
/api/x     404  (الـ proxy مشافهاش)
/logo.png  404  (الـ proxy مشافهاش)
~~~

[[/api/x]] و [[/logo.png]] رجعوا 404 لأنهم مش موجودين في المشروع، بس المهم إنهم متحوّلوش لـ [[/ar/api/x]].

---

## ٣. [[src/i18n/request.ts]]: رسايل اللغة دي بس

ده الملف اللي next-intl بيناديه **مرة مع كل طلب** على السيرفر عشان يعرف اللغة ويجيب نصوصها.

### [[export default getRequestConfig(async ({ requestLocale }) => { ... });]]

[[getRequestConfig]] بتلف دالة [[async]] (يعني جواها [[await]]). الدالة بتستلم object، و [[{ requestLocale }]] destructuring: بنطلّع منه خانة واحدة. [[requestLocale]] هي اللغة اللي جاية من [[[locale]]] في الـ URL.

### [[const requested = await requestLocale;]]

[[requestLocale]] مش string، ده Promise (قيمة هتوصل بعدين)، فلازم [[await]]. والنتيجة ممكن تبقى [["ar"]]، أو أي حاجة غريبة، أو [[undefined]] لو الطلب جه من مكان مفيهوش [[[locale]]].

### [[const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;]]

- [[hasLocale(قايمة, قيمة)]] بترجّع [[true]] لو القيمة واحدة من اللغات المدعومة.
- [[شرط ? أ : ب]] اسمه ternary: لو الشرط صح خد أ، غير كده خد ب.

يعني: لو اللغة مدعومة خليها، ولو لأ خد العربي. ده بيحمي السطر اللي بعده من إنه يحاول يفتح [[messages/fr.json]] مش موجود.

### [[return { locale, messages: (await import(...)).default };]]

- [[{ locale, ... }]] اختصار لـ [[locale: locale]].
- [[import(...)]] بأقواس (مش [[import]] اللي فوق الملف) اسمه dynamic import: بيحمّل الملف وقت التشغيل ويرجّع Promise. والمسار template literal فيه [[$__{locale}]]، فبيبقى [[../../messages/ar.json]].
- [[../../]]: من [[src/i18n]] اطلع فولدرين لفوق، يعني لأول المشروع، وبعدين [[messages]].
- [[.default]]: ملف JSON لما يتعمله import بيبقى module، والمحتوى نفسه في خانة [[default]].

ليه dynamic مش import عادي للملفين؟ عشان الطلب العربي يحمّل [[ar.json]] بس، مش كل اللغات.

---

## ٤. [[next.config.ts]]: اربط المكتبة بـ Next

~~~text next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({});
~~~

- [[createNextIntlPlugin()]] من غير arguments بيدوّر على [[src/i18n/request.ts]] (أو [[i18n/request.ts]]) لوحده. لو حطيته في مكان تاني ابعت مساره.
- [[withNextIntl({})]]: بياخد الـ config بتاعك ويرجّعه بعد ما يضيف عليه. [[{}]] هنا config فاضي. في مشروع حقيقي بتحط جوه القوسين الإعدادات اللي كانت موجودة (create-next-app 16.4 بيحط [[cacheComponents]] وغيرها)، متمسحهاش.

---

## ٥. شغّلناه: إيه اللي رجع

بعد [[next build]] و [[next start]]، والصفحات في [[src/app/[locale]/]]. الـ solCode بالظبط:

~~~bash
curl -s -o /dev/null -D - localhost:3000/ | grep -i "location\|set-cookie"
~~~

- [[-s]] silent: من غير شريط التقدم.
- [[-o /dev/null]]: ارمي الـ body، مش محتاجينه.
- [[-D -]]: اطبع الـ headers على الشاشة ([[-]] يعني الـ stdout).
- [[grep -i]]: دوّر من غير ما تفرّق بين الحروف الكبيرة والصغيرة، و [[\|]] يعني «أو».

~~~text الناتج
location: /ar
set-cookie: NEXT_LOCALE=ar; Path=/; SameSite=lax
~~~

وبـ [[-H "Accept-Language: en-US,en;q=0.9"]] ([[-H]] بيضيف header، و [[q=0.9]] أولوية الإنجليزي العام بعد الأمريكي):

~~~text الناتج
location: /en
~~~

### الـ cookie بتتكتب إمتى؟

لاحظ إن الطلب التاني ملوش [[set-cookie]]. جرّبنا حالات كتير، والقاعدة في next-intl 4: الـ cookie بتتكتب بس لما اللغة تبقى **مختلفة** عن اللي كان هيختارها من [[Accept-Language]]، أو مختلفة عن cookie قديمة.

| الطلب | الرد |
|---|---|
| [[/]] من غير Accept-Language | 307 لـ [[/ar]] ومعاه cookie [[ar]] |
| [[/]] و Accept-Language: en | 307 لـ [[/en]] من غير cookie |
| [[/]] و Accept-Language: fr | 307 لـ [[/ar]] (مش مدعومة، فالافتراضية) |
| [[/]] و cookie [[en]] | 307 لـ [[/en]]: الـ cookie كسبت |
| [[/en]] و Accept-Language: en | 200 من غير cookie |
| [[/en]] و cookie [[ar]] | 200 والـ cookie بقت [[en]] |
| [[/fr]] | 307 لـ [[/ar/fr]]، وبعدين 404 |

آخر سطر مهم: [[fr]] مش لغة مدعومة، فالـ proxy اعتبرها صفحة اسمها fr وحط قبلها [[/ar]].

---

## ملخص الملفات

| الملف | بيعمل إيه | بيتنادى إمتى |
|---|---|---|
| [[i18n/routing.ts]] | اللغات والافتراضية | بيتستورد في الباقي |
| [[proxy.ts]] | يحط اللغة في الـ URL لو ناقصة | قبل كل طلب بيطابق الـ matcher |
| [[i18n/request.ts]] | يختار اللغة ويحمّل رسايلها | مرة مع كل طلب على السيرفر |
| [[next.config.ts]] | يربط الـ plugin | وقت الـ build والتشغيل |

## الخلاصة

- اللغة أول جزء في الـ URL، والصفحات كلها جوه [[app/[locale]]].
- الـ proxy بيختار: cookie، وبعدين [[Accept-Language]]، وبعدين الافتراضية، ويعمل 307.
- الـ matcher بيستثني الـ API والملفات اللي فيها نقطة، و [[\\.]] لازم بشرطتين جوه الـ string.
- [[request.ts]] بيحمّل ملف اللغة الحالية بس بـ dynamic import.`,
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
          teach: R`## الفكرة: الـ layout بيقول اللغة صراحة، فالصفحة تفضل static

المثال ملفين: الـ root layout بتاع اللغة، وصفحة About. الاتنين بيعملوا نفس الحركة: ياخدوا اللغة من الـ URL ويقولوها لـ next-intl بـ [[setRequestLocale]]. اتشغّل في Next 16.4 و next-intl 4.14 فوق تجهيز الدرس اللي فات، بـ [[next build]] و [[next start]].

---

## ١. الـ imports

| السطر | جاي منين | ليه |
|---|---|---|
| [[NextIntlClientProvider]] و [[hasLocale]] | [[next-intl]] | الـ provider للـ client components، ودالة «اللغة دي مدعومة؟» |
| [[setRequestLocale]] | [[next-intl/server]] | للسيرفر بس. [[/server]] معناها مينفعش تتستورد في client component |
| [[notFound]] | [[next/navigation]] | يوقف الرسم ويعرض 404 |
| [[routing]] | [[@/i18n/routing]] | ملف اللغات من الدرس اللي فات. [[@/]] اختصار لـ [[src/]] |

---

## ٢. [[generateStaticParams]]: قايمة النسخ اللي تتبني

~~~text src/app/[locale]/layout.tsx
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
~~~

الفولدر [[[locale]]] dynamic، يعني Next ميعرفش لوحده القيم الممكنة. الدالة دي بتقوله: «ابني الصفحات دي وقت الـ build بالقيم دي».

- [[routing.locales]] هي [[["ar", "en"]]].
- [[.map(...)]] بيلف على كل عنصر ويرجّع array جديدة.
- [[(locale) => ({ locale })]]: لكل لغة اعمل object. القوسين حوالين [[{ locale }]] لازمين، من غيرهم الـ arrow function هتفهم [[{]] إنها بداية جسم الدالة. و [[{ locale }]] اختصار [[{ locale: locale }]].

النتيجة: [[[{ locale: "ar" }, { locale: "en" }]]]. اسم الخانة [[locale]] لازم يطابق اسم الفولدر.

ولأنها في الـ layout، كل الصفحات تحت [[[locale]]] بتورثها: About اتبنت لـ [[ar]] و [[en]] من غير ما نكتبلها واحدة.

---

## ٣. الـ layout نفسه سطر سطر

### [[export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">)]]

- [[async]] عشان جواها [[await]].
- [[children]]: الصفحة (أو الـ layout) اللي جوه.
- [[params]]: الأجزاء المتغيرة في الـ URL.
- [[LayoutProps<"/[locale]">]]: نوع Next بيولّده من شكل الفولدرات، فـ TypeScript عارف إن [[params]] جواها [[locale: string]]. ومش محتاج تستورده: Next بيعمله global.

### [[const { locale } = await params;]]

[[params]] Promise (من Next 15)، فلازم [[await]]. و [[{ locale }]] destructuring: هات خانة [[locale]] منها. من [[/ar/about]] القيمة [["ar"]].

### [[if (!hasLocale(routing.locales, locale)) notFound();]]

[[!]] معناها «مش». يعني: لو اللغة **مش** واحدة من المدعومة، 404. امتى ده بيحصل؟ قليل، لأن الـ proxy بيحوّل [[/fr]] لـ [[/ar/fr]] قبل ما يوصل هنا. السطر ده حماية لأي طلب يوصل من غير ما يعدّي على الـ proxy (مسار الـ matcher بيستثنيه مثلًا).

### [[setRequestLocale(locale);]]

ده قلب الدرس. next-intl محتاج يعرف لغة الطلب من جوه أي كومبوننت. لو محدش قاله، بيعرفها من header بيحطه الـ proxy، وقراية headers الطلب معناها إن الصفحة **لازم** تترسم مع كل طلب (dynamic). [[setRequestLocale]] بتحط اللغة في مكان خاص بالطلب ده، فـ next-intl ياخدها من هناك من غير ما يلمس الـ headers.

### الـ JSX

~~~text الـ return
<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
  <body>
    <NextIntlClientProvider>{children}</NextIntlClientProvider>
  </body>
</html>
~~~

- ده **الـ root layout**: هو اللي فيه [[<html>]] و [[<body>]]، فلازم يبقى مفيش [[app/layout.tsx]] فوقه (اتمسح، وإلا يبقى html جوه html).
- [[lang]]: لغة الصفحة، لقارئ الشاشة وجوجل والخطوط.
- [[dir]]: اتجاه الكتابة. [[===]] مقارنة صارمة، و [[? :]] ternary: عربي يبقى [[rtl]] (من اليمين للشمال)، غيره [[ltr]].
- الاتنين بيتكتبوا على السيرفر في الـ HTML نفسه، فالصفحة بتظهر بالاتجاه الصح من أول لحظة.
- [[NextIntlClientProvider]] بيوصّل اللغة والرسايل لأي client component تحت. من next-intl 4 بياخدها من السيرفر لوحده من غير ما تبعتلها [[messages]].

اللي رجع من [[curl]]:

~~~text الناتج
/ar/about   <html lang="ar" dir="rtl">   <h1>مين إحنا
/en/about   <html lang="en" dir="ltr">   <h1>About us
~~~

---

## ٤. صفحة About

~~~text src/app/[locale]/about/page.tsx
const { locale } = await params;
setRequestLocale(locale);
const t = await getTranslations("About");
return <h1>{t("title")}</h1>;
~~~

- نفس أول سطرين بتوع الـ layout. ليه نكررها؟ Next ممكن يرسم الصفحة لوحدها من غير الـ layout (في التنقل مثلًا)، فمتعتمدش إن الـ layout سبقها.
- [[getTranslations("About")]]: بترجّع دالة ترجمة لـ namespace اسمه [[About]] في ملف الرسايل. [[await]] لأنها بتشتغل في async server component.
- [[t("title")]]: هات [[About.title]] من [[messages/ar.json]] أو [[en.json]].

---

## ٥. جدول الـ build: الدليل

~~~text next build (الكود زي المثال)
Route (app)
┌ ○ /_not-found
├   /[locale]
│ ├ ● /ar
│ └ ● /en
└   /[locale]/about
  ├ ● /ar/about
  └ ● /en/about

ƒ Proxy (Middleware)

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
~~~

- [[●]] (SSG): اتبنت HTML وقت الـ build بالقيم اللي رجعت من [[generateStaticParams]]. وتحت كل route النسخ اللي اتبنت.
- [[ƒ Proxy]]: الـ proxy نفسه بيشتغل مع كل طلب، ودي حاجة منفصلة عن الصفحات.

والرد نفسه بيأكد إنها جاهزة: [[curl -D -]] على [[/ar/about]] رجّع [[x-nextjs-cache: HIT]] و [[Cache-Control: s-maxage=31536000]] (يعني CDN يقدر يخزنها سنة). وصفحة dynamic زي السلة رجعت [[Cache-Control: private, no-cache, no-store]].

### امسحها من About بس

~~~text الناتج
└   /[locale]/about
  ├ ● /ar/about
  └ ● /en/about
~~~

لسه [[●]]، لأن الـ layout قالها وهم اترسموا مع بعض وقت الـ build. بس الوثائق بتقول حطها في الاتنين، فمتعتمدش على الصدفة دي.

### امسحها من الـ layout كمان

~~~text الناتج
├   /[locale]
│ ├ ● /ar
│ └ ● /en
└ ƒ /[locale]/about

ƒ  (Dynamic)  server-rendered on demand
~~~

About بقت [[ƒ]] ومفيش نسخ تحتها: next-intl رجع يقرا اللغة من الـ headers. والصفحة الرئيسية فضلت [[●]] لأنها لسه فيها [[setRequestLocale]].

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[generateStaticParams]] في الـ layout | Next يعرف يبني نسخة لكل لغة |
| [[hasLocale]] و [[notFound()]] | لغة مش مدعومة تبقى 404 |
| [[setRequestLocale(locale)]] في كل layout وكل page | next-intl ميقراش الـ headers، فالصفحة تفضل [[●]] |
| [[lang]] و [[dir]] على [[<html>]] من السيرفر | الاتجاه صح من أول لحظة |
| [[NextIntlClientProvider]] | الـ client components تلاقي الرسايل |`,
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
            R`لغة مش مدعومة؟ 404. (الـ proxy بيحوّل [[/fr]] لـ [[/ar/fr]] قبلها، فده حماية لأي طلب يوصل من غيره.)`,
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
          teach: R`## الفكرة: النص في ملف JSON، والكود بيطلبه بمفتاح

المثال ٣ حتت: ملف الرسايل العربي، وصفحة server بتستخدمه، وكومبوننت client بيستخدمه ومعاه تنسيق فلوس. اتشغّل في Next 16.4 و next-intl 4.14 بـ [[next build]] و [[next start]]، و [[getCartItems]] عملناها دالة بترجّع ٣ عناصر.

---

## ١. ملف الرسايل: [[messages/ar.json]]

~~~text messages/ar.json
{
  "Cart": {
    "title": "السلة",
    "items": "{count, plural, =0 {...} one {...} two {...} few {...} many {...} other {...}}",
    "greeting": "أهلًا يا {name}"
  }
}
~~~

- [[Cart]] اسمه **namespace**: مجموعة نصوص شاشة واحدة مع بعض. والمفتاح الكامل بيتكتب [[Cart.title]].
- [[title]]: نص عادي.
- [[greeting]]: فيه [[{name}]]، ده متغير بيتبدل وقت العرض.
- [[en.json]] لازم فيه نفس المفاتيح بالظبط بالإنجليزي.

### رسالة الجمع حتة حتة

الصيغة دي اسمها **ICU MessageFormat** (معيار لكتابة الرسايل المترجمة):

| الحتة | معناها |
|---|---|
| [[{count, plural, ...}]] | خد المتغير [[count]] واختار نص حسب قاعدة الجمع |
| [[=0 {السلة فاضية}]] | لو الرقم صفر **بالظبط**. بيتفحص قبل القواعد |
| [[one]] و [[two]] و [[few]] و [[many]] و [[other]] | فئات الجمع في اللغة. العربي فيه الست، والإنجليزي [[one]] و [[other]] بس |
| [[#]] | مكان الرقم نفسه جوه النص |

مين بيحدد إن ٥ «few» و ١١ «many»؟ مش next-intl، دي [[Intl.PluralRules]] المبنية في JavaScript. سألناها في Node:

~~~text new Intl.PluralRules("ar").select(n)
0:zero  1:one  2:two  3:few  5:few  10:few  11:many  99:many
100:other  101:other  102:other  103:few  111:many
~~~

القاعدة بتبص على آخر رقمين: ١٠٣ آخرها ٠٣ فترجع few، و ١١١ آخرها ١١ فترجع many.

---

## ٢. الصفحة (server component)

### [[import { getTranslations } from "next-intl/server";]]

النسخة اللي بتشتغل في server component [[async]].

### [[const t = await getTranslations("Cart");]]

بترجّع دالة اسمها [[t]] (اختصار translate) مربوطة بالـ namespace [[Cart]]. فـ [[t("title")]] يعني [[Cart.title]].

### [[return <h1>{t("title")}: {t("items", { count: items.length })}</h1>;]]

- [[t("title")]] بيرجّع «السلة».
- [[t("items", { count: ... })]]: التاني object فيه قيم المتغيرات. [[items.length]] عدد العناصر.

~~~text الناتج (curl /ar/cart)
<h1>السلة: 3 منتجات</h1>
~~~

٣ عناصر يعني few، فطلع «3 منتجات». والصفحة دي في الجدول [[ƒ]] لأنها مفيهاش [[setRequestLocale]]، وده مقصود: السلة شخصية فهي dynamic كده كده.

---

## ٣. الكومبوننت (client component)

### [["use client"]] و [[useTranslations]]

[["use client"]] في أول الملف: الكومبوننت ده بيتبعت للمتصفح. وفي المتصفح مفيش [[await]] في الـ render، فبنستخدم الـ hook: [[useTranslations("Cart")]]، نفس [[t]] بالظبط بس من غير [[await]]. الرسايل جاية من [[NextIntlClientProvider]] اللي في الـ layout.

### [[{ totalCents, name }: { totalCents: number; name: string }]]

destructuring للـ props، والنوع بعد [[:]]: رقم ونص. الفلوس بالقروش (cents) لأن الحسابات بأرقام صحيحة مبتغلطش زي الكسور.

### [[const format = useFormatter();]]

أداة تنسيق أرقام وتواريخ حسب اللغة الحالية، مبنية على [[Intl]].

### [[format.number(totalCents / 100, { style: "currency", currency: "EGP" })]]

- [[/ 100]]: من قروش لجنيه.
- [[style: "currency"]]: اعرضه فلوس.
- [[currency: "EGP"]]: كود الجنيه المصري (ISO 4217).

بعتنا [[totalCents={1234550}]] و [[name="سارة"]]:

~~~text الناتج
/ar/cart   <p>أهلًا يا سارة: 12,345.50 ج.م.</p>
/en/cart   <p>Hi سارة: EGP 12,345.50</p>
~~~

نفس الرقم، شكلين: العربي حط [[ج.م.]] بعد الرقم، والإنجليزي حط [[EGP]] قبله. والنسخة العربي فيها كمان علامتين مش ظاهرين (U+200F، Right-to-Left Mark) بيظبطوا الاتجاه. والأرقام طلعت 1 2 3 مش ١ ٢ ٣ لأن اللغة [[ar]] بس، ولو اللغة [[ar-EG]] بتطلع هندي: [[new Intl.NumberFormat("ar-EG").format(3)]] رجّعت [[٣]].

---

## ٤. التجربة: كل الأرقام

عملنا صفحة بتعرض [[t("items", { count: n })]] لكل رقم، وجنبها رسالة تانية من غير [[many]] ونص [[other]] فيه كلمة OTHER عشان نشوفه:

~~~text الناتج (curl /ar/cart)
0   = السلة فاضية   | السلة فاضية
1   = منتج واحد     | منتج واحد
2   = منتجين        | منتجين
5   = 5 منتجات      | 5 منتجات
11  = 11 منتج       | OTHER 11 منتج
100 = 100 منتج      | OTHER 100 منتج
103 = 103 منتجات    | 103 منتجات
111 = 111 منتج      | OTHER 111 منتج
~~~

لما [[many]] اتشالت، 11 و 111 راحوا لـ [[other]] من غير أي error. عشان كده لو [[many]] و [[other]] نفس النص مش هتحس بالفرق، ولو نسيت [[two]] هتطلع «2 منتج» في صمت.

---

## الخلاصة

| فين | تستخدم إيه |
|---|---|
| server component [[async]] | [[await getTranslations("Cart")]] من [[next-intl/server]] |
| client component أو server component مش async | [[useTranslations("Cart")]] |
| متغير جوه النص | [[{name}]] في الرسالة و [[t("greeting", { name })]] |
| جمع | [[{count, plural, ...}]] والعربي ٦ حالات و [[#]] مكان الرقم |
| فلوس وتواريخ | [[useFormatter()]] أو [[getFormatter()]] |

ومتلزقش كلام ببعض في الكود: الجملة كلها في الرسالة، والرقم متغير جواها.`,
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
          teach: R`## الفكرة: نسخ من أدوات التنقل بتحط اللغة لوحدها

المثال ٣ ملفات: ملف بيطلّع نسخ «فاهمة اللغة» من [[Link]] و [[useRouter]] وأخواتهم، وزرار بيبدّل اللغة، وسطر metadata بيقول لجوجل فين الترجمة. اتشغّل في Next 16.4 و next-intl 4.14 بـ [[next build]] و [[next start]]، والضغط على الزراير في Chrome headless (playwright-core) والمتصفح لغته عربي.

---

## ١. [[src/i18n/navigation.ts]]

~~~text src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
~~~

- [[createNavigation(routing)]] بتاخد إعدادات اللغات وترجّع object فيه ٥ أدوات.
- [[export const { ... } = ...]]: destructuring وتصدير في سطر واحد. كل اسم بين القوسين بقى export لوحده، فتكتب في أي ملف [[import { Link } from "@/i18n/navigation"]].

| الأداة | زي بتاعة Next، بس |
|---|---|
| [[Link]] | بيحط اللغة الحالية قبل الـ [[href]] |
| [[redirect]] | للسيرفر، وبياخد [[{ href, locale }]] |
| [[usePathname]] | بيرجّع المسار **من غير** اللغة |
| [[useRouter]] | [[push]] و [[replace]] بيقبلوا [[{ locale }]] |
| [[getPathname]] | للسيرفر: يطلّع الـ URL لأي لغة (للـ sitemap والـ metadata) |

الفرق بانت في الـ HTML. حطينا ٣ لينكات في صفحة [[/ar/about]]:

~~~text الناتج (curl /ar/about)
<a id="intl" href="/ar/about">intl about</a>      ← Link من @/i18n/navigation، href="/about"
<a id="intlhome" href="/ar">intl home</a>         ← نفس الـ Link، href="/"
<a id="plain" href="/about">plain about</a>       ← Link من next/link، href="/about"
~~~

كتبنا [[href="/about"]] في الاتنين، والمترجم بس هو اللي حط [[/ar]].

---

## ٢. زرار اللغة: [[LocaleSwitcher]]

### [["use client"]]

الكومبوننت فيه hooks و [[onClick]]، ودول بيشتغلوا في المتصفح بس، فلازم يبقى client component.

### [[const locale = useLocale();]]

[[useLocale]] من [[next-intl]]: اللغة الحالية، [["ar"]] أو [["en"]].

### [[const pathname = usePathname();]]

لازم تكون من [[@/i18n/navigation]] (السطر اللي فوقه في الـ import). في [[/ar/about]] بترجّع [[/about]]. ولو استوردتها من [[next/navigation]] هترجّع [[/ar/about]]، ولما تحط قبلها اللغة التانية هيبقى [[/en/ar/about]].

### [[const other = locale === "ar" ? "en" : "ar";]]

ternary: لو عربي يبقى التانية إنجليزي، والعكس.

### [[router.replace(pathname, { locale: other })]]

- [[replace]] مش [[push]]: بيبدّل الـ URL الحالي في الـ history بدل ما يضيف خطوة، فزرار Back ميرجعكش للغة القديمة. اتأكدنا: [[history.length]] فضل زي ما هو بعد الضغط.
- [[{ locale: other }]]: نفس المسار باللغة التانية.

### [[{other === "ar" ? "عربي" : "English"}]]

الزرار بيعرض اسم اللغة **التانية مكتوب بلغتها**: في الصفحة العربي مكتوب English، عشان اللي مش فاهم عربي يلاقيه.

### اللي حصل لما ضغطناه

~~~text الناتج (Chrome)
قبل:  /ar/about   «مين إحنا»   cookies: []
بعد:  /en/about   «About us»   lang=en  dir=ltr   cookies: NEXT_LOCALE=en
~~~

الـ cookie اتكتبت [[en]] لأنها مختلفة عن لغة المتصفح (عربي)، وده اللي هيفتكره الـ proxy بعدين.

---

## ٣. الـ hreflang

~~~text src/app/[locale]/about/page.tsx
export const metadata = { alternates: { languages: { ar: "/ar/about", en: "/en/about", "x-default": "/ar/about" } } };
~~~

- [[metadata]] اسم محجوز: Next بيحوّله tags في [[<head>]].
- [[alternates.languages]]: لكل لغة الـ URL بتاعها.
- [[x-default]]: النسخة اللي تظهر لو لغة الزائر مش من دول. والاسم فيه شرطة فلازم بين علامات تنصيص.

~~~text الناتج (في الـ head)
<link rel="alternate" hrefLang="ar" href="/ar/about"/>
<link rel="alternate" hrefLang="en" href="/en/about"/>
<link rel="alternate" hrefLang="x-default" href="/ar/about"/>
~~~

لاحظ إن الـ href نسبي، لأن المشروع ده مفيهوش [[metadataBase]]. جوجل عايز URLs كاملة، فحط [[metadataBase: new URL("https://example.com")]] في الـ root layout (درس metadata).

---

## ٤. ليه [[next/link]] العادي غلط هنا

بعد ما الزرار ودّانا [[/en/about]] (والـ cookie [[en]])، ضغطنا اللينك العادي [[href="/about"]]:

~~~text الناتج (Chrome، اتكرر مرتين ونفس النتيجة)
بدّلنا بالزرار وبعدين ضغطنا next/link    → /ar/about  (رجع عربي!)
فتحنا /en/about من الأول وضغطنا next/link → /en/about
بدّلنا بالزرار وبعدين ضغطنا Link المترجم   → /en
~~~

ليه الأولى راحت عربي والـ cookie [[en]]؟ Next بيعمل **prefetch** للينكات اللي ظاهرة. وإحنا لسه في الصفحة العربي، اتطلب [[/about]] في الخلفية والـ proxy رد [[307]] لـ [[/ar/about]]، و Next احتفظ بالرد ده. ولما ضغطنا بعد التبديل، استخدم المحفوظ. فاللينك اللي من غير لغة بيعتمد على الصدفة: الـ cookie، ولغة المتصفح، وإمتى حصل الـ prefetch. واللينك المترجم مفيهوش الكلام ده: الـ href فيه اللغة من الأول.

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| [[Link]] و [[useRouter]] و [[usePathname]] | من [[@/i18n/navigation]] في كل المشروع، مش من [[next/link]] و [[next/navigation]] |
| زرار اللغة | [[router.replace(pathname, { locale })]] واسم اللغة بلغتها |
| [[usePathname]] بتاع next-intl | المسار من غير اللغة |
| hreflang | [[alternates.languages]] و [[x-default]]، ومع [[metadataBase]] |`,
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

ولينك [[next/link]] العادي بيطلب [[/about]] من غير لغة، فالـ proxy بيرد [[307]] ويحوّل، وده طلب زيادة مع كل ضغطة. والتحويل حسب cookie [[NEXT_LOCALE]] (آخر لغة فتحتها)، فغالبًا هتوصل للغة الصح. بس مش دايمًا: جربناها في Chrome، بدّلنا من [[/ar/about]] لـ [[/en/about]] بالزرار وبعدين ضغطنا اللينك العادي، فراح [[/ar/about]] والـ cookie [[en]]، لأن Next كان عمل prefetch للينك وإحنا في الصفحة العربي واحتفظ بالتحويل القديم. ولو الـ cookie مش موجودة أو اتمسحت، الاختيار بيبقى من [[Accept-Language]]: تكون في [[/en]] ومتصفحك عربي فتروح [[/ar/about]]. لو الزرار وداك URL غلط: انت مستخدم [[usePathname]] من [[next/navigation]] (بيرجّع المسار باللغة) مش من [[@/i18n/navigation]].`
        }
      ]
    }
]);
