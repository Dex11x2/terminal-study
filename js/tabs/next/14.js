// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
          teach: R`## الفكرة: انت بتكتب [[<Image>]]، و Next بيكتب [[<img>]] أذكى

المثال إعداد في [[next.config.ts]] و ٣ صور: صورة hero محلية، وصورة منتج من سيرفر تاني، وصورة غلاف بتملا حاوية. اتشغّل في Next 16.4 بـ [[next build]] و [[next start]]. والـ CDN عملناه سيرفر صغير على [[localhost:5837]] بدل [[cdn.example.com]] (وده احتاج [[dangerouslyAllowLocalIP: true]] في [[images]]، لأن Next 16 بيرفض يجيب صور من عناوين محلية افتراضيًا). والمتصفح Chrome headless (playwright-core).

---

## ١. الإعدادات: [[images]] في [[next.config.ts]]

~~~text next.config.ts
images: { remotePatterns: [new URL("https://cdn.example.com/products/**")], formats: ["image/avif", "image/webp"] },
~~~

### [[remotePatterns]]

Next هو اللي بيحمّل الصورة من الدومين التاني ويصغّرها، فلازم تقوله «مسموح تجيب من فين». [[new URL("...")]] بيعمل object من الـ URL، و [[**]] في الآخر معناها «أي حاجة تحت [[/products/]]، بأي عمق».

جربنا نطلب صورة من دومين مش في القايمة:

~~~text الناتج
/_next/image?url=https://evil.example.org/x.jpg&w=384&q=75
"url" parameter is not allowed
~~~

### [[formats]]

الصيغ اللي يجرّبها بالترتيب. AVIF أصغر من WebP بس أبطأ في التحويل. المتصفح بيبعت في header [[Accept]] الصيغ اللي بيفهمها، و Next بيختار أول واحدة مشتركة. نفس الصورة بـ [[curl]] و [[Accept]] مختلف:

~~~text الناتج
Accept: image/avif,image/webp,*/*   →  Content-Type: image/avif
Accept: image/webp,*/*              →  Content-Type: image/webp
Accept: */*                         →  Content-Type: image/jpeg
~~~

ومن غير [[formats]] الافتراضي WebP بس.

---

## ٢. صورة الـ hero

~~~text app/page.tsx
import hero from "@/assets/hero.jpg";
<Image src={hero} alt="كتب على رف" placeholder="blur" fetchPriority="high" loading="eager" sizes="100vw" className="h-auto w-full" />
~~~

| الـ prop | بيعمل إيه |
|---|---|
| [[import hero from ...]] | صورة محلية بـ import: Next بيقرا مقاسها وقت الـ build (طلع [[width="4000" height="2667"]] لوحده) |
| [[alt]] | وصف الصورة لقارئ الشاشة وجوجل. إجباري |
| [[placeholder="blur"]] | صورة صغيرة جدًا مموهة بتظهر لحد ما الحقيقية تحمّل. Next عملها لوحده وحطها في [[style]] كـ [[background-image]] |
| [[fetchPriority="high"]] | «الصورة دي أهم من الباقي»، للصورة الكبيرة اللي فوق (LCP) |
| [[loading="eager"]] | حمّلها على طول، مش lazy |
| [[sizes="100vw"]] | الصورة بعرض الشاشة كلها. [[vw]] = viewport width، و ١٠٠vw = ١٠٠٪ من عرض الشاشة |
| [[className="h-auto w-full"]] | Tailwind: العرض ١٠٠٪ والطول بالنسبة |

### الـ HTML اللي طلع (مختصر)

~~~text الناتج
<img fetchPriority="high" loading="eager" width="4000" height="2667" sizes="100vw"
  srcSet="/_next/image?url=...hero.jpg&w=640&q=75 640w, ...&w=750 750w, ... , ...&w=3840 3840w"
  src="/_next/image?url=...hero.jpg&w=3840&q=75"/>
<link rel="preload" as="image" imageSrcSet="..." imageSizes="100vw" fetchPriority="high"/>
~~~

- [[srcSet]]: قايمة نسخ، كل واحدة URL وجنبها عرضها ([[640w]] يعني ٦٤٠ بكسل). المتصفح بيختار واحدة حسب [[sizes]] وكثافة الشاشة.
- [[/_next/image?url=...&w=640&q=75]]: سيرفر Next نفسه بيصغّر الصورة. [[w]] العرض، و [[q]] الجودة (quality).
- [[<link rel="preload">]]: Next ضافه في الـ head عشان [[fetchPriority="high"]]، فالمتصفح يبدأ ينزّلها قبل ما يوصل للـ [[<img>]].

### الأرقام دي جاية منين؟

~~~text الـ defaults في Next 16.4
deviceSizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
imageSizes:  32, 48, 64, 96, 128, 256, 384
qualities:   75
minimumCacheTTL: 14400
~~~

- العروض المسموحة بس هي اللي في القايمتين. طلبنا [[w=500]]: [["w" parameter (width) of 500 is not allowed]].
- الجودة [[75]] بس. طلبنا [[q=50]]: [["q" parameter (quality) of 50 is not allowed]]. لو عايز غيرها ضيفها في [[qualities]].
- [[14400]] ثانية = ٤ ساعات، وظهرت في الرد: [[Cache-Control: public, max-age=14400, must-revalidate]].

---

## ٣. صورة المنتج من الـ CDN

~~~text app/page.tsx
<Image src={p.imageUrl} alt={p.name} width={400} height={400} sizes="(max-width: 768px) 50vw, 25vw" />
~~~

- صورة من URL، فـ Next ميعرفش مقاسها: [[width]] و [[height]] لازم. دول للنسبة وحجز المكان (عشان الصفحة متتنططش)، مش للحجم المعروض.
- [[sizes]] بتتقري زي if: «لو الشاشة لحد ٧٦٨ بكسل ([[max-width: 768px]])، الصورة نص العرض ([[50vw]])، غير كده ربعه ([[25vw]])».
- ومن غير [[loading]]: الافتراضي [[loading="lazy"]]، يعني متتحمّلش غير لما تقرّب من الشاشة.

---

## ٤. صورة الغلاف بـ [[fill]]

~~~text app/page.tsx
<div className="relative aspect-video">
  <Image src={cover} alt="" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
</div>
~~~

- [[fill]]: من غير [[width]] و [[height]]، الصورة بتملا الأب. Next حط عليها [[style="position:absolute;height:100%;width:100%;left:0;top:0;..."]].
- عشان كده الأب لازم [[relative]] (عشان الـ absolute يتقاس منه) وليه ارتفاع. [[aspect-video]] بيدّيه نسبة ١٦:٩.
- [[object-cover]]: الصورة تقص الزيادة بدل ما تتمط.
- [[alt=""]]: فاضي عمدًا، معناه «ديكور، قارئ الشاشة يتجاهلها».

---

## ٥. المتصفح اختار إيه فعلًا

فتحنا الصفحة بمقاسين: موبايل عرضه ٣٩٠ وكثافته ٣ (DPR 3، يعني كل بكسل CSS = ٣ بكسل حقيقي)، وديسكتوب ١٤٤٠ و DPR 1. وضفنا صورتين للمقارنة بـ [[width={1200}]]: واحدة من غير [[sizes]] وواحدة بيها.

| الصورة | موبايل ٣٩٠ × ٣ | ديسكتوب ١٤٤٠ |
|---|---|---|
| hero ([[100vw]]) | [[w=1200]] | [[w=1920]] |
| المنتج ([[50vw, 25vw]]) | [[w=640]] | [[w=384]] |
| الغلاف ([[100vw, 800px]]) | [[w=1200]] | [[w=828]] |
| [[width={1200}]] من غير [[sizes]] | [[w=3840]] | [[w=1200]] |
| [[width={1200}]] و [[sizes]] | [[w=640]] | [[w=384]] |

اقرا الحسبة على الموبايل: المنتج ٥٠vw = ١٩٥ بكسل، × ٣ = ٥٨٥، فالمتصفح خد أقرب نسخة أكبر: ٦٤٠. ومن غير [[sizes]]، Next كتب [[srcSet]] فيه نسختين بس: [[w=1200 1x, w=3840 2x]]، والموبايل كثافته عالية فخد [[2x]]: صورة ٣٨٤٠ بكسل لمكان عرضه ٣٩٠.

### والحجم؟

صورة المنتج الأصلية (JPEG ٢٠٠٠×٢٠٠٠) نزلت بـ [[<img>]] عادي **405,610 byte**، ونسخة [[w=640]] نزلت AVIF أقل من كيلو. الصورة دي متولدة للتجربة (لون واحد وتشويش خفيف) فبتتضغط أكتر من صورة حقيقية، بس الفكرة واحدة: مقاس صح وصيغة حديثة.

---

## ٦. [[priority]] بقت قديمة

في تعريفات Next 16.4 نفسها:

~~~text next/dist/shared/lib/get-img-props.d.ts
preload?: boolean;
/**
 * @deprecated Use $__btpreload$__bt prop instead.
 */
priority?: boolean;
~~~

فصورة الـ LCP: [[fetchPriority="high"]] (زي المثال) أو [[preload]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| صورة محلية | [[import]] وابعتها لـ [[src]]، المقاس بيتعرف لوحده |
| صورة من دومين تاني | [[width]] و [[height]]، والدومين في [[remotePatterns]] |
| صورة تملا حاوية | [[fill]]، والأب [[relative]] وليه ارتفاع |
| المتصفح ينزّل المقاس الصح | [[sizes]] (وإلا الموبايل ياخد ٣٨٤٠) |
| صورة الـ LCP | [[fetchPriority="high"]] و [[loading="eager"]]، لصورة واحدة بس |`,
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
          teach: R`## الفكرة: الخط بيتنزّل وقت الـ build ويتقدّم من دومينك

المثال root layout بيعرّف ٣ خطوط (اتنين من Google Fonts وواحد ملف عندك)، وبيحط كل واحد في CSS variable على [[<html>]]، وسطر CSS بيربطهم بـ Tailwind. اتشغّل في Next 16.4 و Tailwind v4 بـ [[next build]] و [[next start]]، وخط [[Brand.woff2]] استخدمنا مكانه ملف Geist اللي جاي مع Next. والقياس في Chrome headless.

---

## ١. الـ imports

~~~text app/layout.tsx
import { Cairo, Inter } from "next/font/google";
import localFont from "next/font/local";
~~~

- [[next/font/google]]: كل خط في Google Fonts ليه دالة باسمه، والمسافة بتبقى [[_]]: [[Cairo]] و [[Inter]] و [[IBM_Plex_Sans_Arabic]].
- [[next/font/local]]: دالة واحدة [[localFont]] لأي ملف خط عندك.

---

## ٢. تعريف الخطوط

### [[const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });]]

| الخيار | معناه |
|---|---|
| [[subsets]] | نزّل حروف اللغات دي بس. [[arabic]] للعربي و [[latin]] للإنجليزي |
| [[variable]] | اعمل CSS variable بالاسم ده. الـ [[--]] في أوله شرط في CSS لأي متغير |
| [[display: "swap"]] | اعرض النص بخط احتياطي على طول، وبدّله لما الخط يحمّل (ده الافتراضي أصلًا) |

ومفيش [[weight]] لأن Cairo خط variable: ملف واحد فيه كل الأوزان من ٢٠٠ لـ ١٠٠٠.

### [[const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });]]

نفس الفكرة، للإنجليزي بس.

### [[const brand = localFont({ src: "./fonts/Brand.woff2", variable: "--font-brand" });]]

[[src]] مسار الملف **بالنسبة للملف ده** ([[./]] يعني نفس فولدر الـ layout). و [[woff2]] صيغة خطوط مضغوطة للويب.

والتلاتة [[const]] على مستوى الملف، برا أي كومبوننت: Next بيعالجهم وقت الـ build، فلازم يكونوا قيم ثابتة في أول الملف.

---

## ٣. الـ JSX

### [[className={$__bt$__{cairo.variable} $__{inter.variable} $__{brand.variable}$__bt}]]

كل خط بيرجّع object، و [[.variable]] فيه اسم class بيعرّف الـ CSS variable. والـ template literal بيلزق التلاتة بمسافات. اللي طلع في الـ HTML:

~~~text الناتج (curl)
<html lang="ar" dir="rtl" class="pW5XIG_variable ec5Qua_variable tpJRwa_variable">
~~~

أسماء الـ classes دي Next ولّدها، ومكتوب في الـ CSS اللي اتعمل:

~~~text من ملف الـ CSS
.pW5XIG_variable { --font-cairo: "Cairo", "Cairo Fallback" }
.ec5Qua_variable { --font-inter: "Inter", "Inter Fallback" }
.tpJRwa_variable { --font-brand: "brand", "brand Fallback" }
~~~

يعني الـ class مبيغيّرش الخط، بيعرّف متغير بس. والخط بيتطبق لما حد يستخدم المتغير.

### [[<body className="font-sans">]]

[[font-sans]] class من Tailwind. وهو اللي بيستخدم المتغيرات، بالسطر اللي في [[globals.css]]:

~~~text app/globals.css
@theme inline { --font-sans: var(--font-cairo), var(--font-inter), sans-serif; }
~~~

- [[@theme]] في Tailwind v4: بيعرّف قيم التصميم. [[--font-sans]] هي اللي [[font-sans]] بيستخدمها.
- [[inline]]: حط القيمة نفسها في الـ class بدل ما تشاور على متغير، عشان [[var(--font-cairo)]] تتقري من [[<html>]] صح.
- [[var(--font-cairo)]]: هات قيمة المتغير. والترتيب: Cairo الأول، ولو حرف مش فيه (أو لسه بيحمّل) Inter، وبعدين أي خط sans.

في المثال السطر ده مكتوب كتعليق [[//]] لأنه CSS مش TypeScript، مكانه ملف [[globals.css]].

النتيجة في Chrome:

~~~text الناتج (getComputedStyle على <p>)
font-family: Cairo, "Cairo Fallback", Inter, "Inter Fallback", sans-serif
~~~

---

## ٤. الخط جه منين؟

~~~text الناتج (الطلبات في Chrome)
/_next/static/media/9ff27b8a0a8f3dc0-s.p.40_3w74kn95bo.woff2   (Cairo عربي)
/_next/static/media/d41831e24743a3c1-s.p.08tn9snzkmifr.woff2   (Cairo لاتيني)
/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2   (Inter لاتيني)
/_next/static/media/Brand-s.p.3rd3ws2mg35i0.woff2
~~~

كله من [[/_next/static/media]]، وصفر طلبات لـ [[fonts.googleapis.com]] أو [[fonts.gstatic.com]]. الملفات اتنزلت من جوجل مرة واحدة وقت [[next build]] واتحطت مع ملفات الموقع.

وفي الـ HTML:

~~~text الناتج
<link rel="preload" href="/_next/static/media/9ff27b8a0a8f3dc0-s.p....woff2" as="font" crossorigin="" type="font/woff2"/>
~~~

[[preload]] معناها «نزّل ده بدري، هتحتاجه»، فالخط بيبدأ يتحمّل مع الـ HTML. و [[.p.]] في اسم الملف علامة إنه بيتعمله preload.

### ليه ٣ ملفات لـ Cairo في الـ CSS واتنين بس اتنزلوا؟

[[subsets: ["arabic", "latin"]]] طلّع ٣ ملفات: عربي، و latin-ext (حروف أوروبية زيادة)، و latin. وكل [[@font-face]] عليه [[unicode-range]]:

~~~text من ملف الـ CSS (مختصر)
@font-face{font-family:Cairo;font-weight:200 1000;font-display:swap;src:url(...9ff27b8a...woff2);unicode-range:U+6??,...}
~~~

[[U+6??]] يعني الحروف من [[U+0600]] لـ [[U+06FF]]، ودي الحروف العربي. المتصفح بينزّل الملف بس لو الصفحة فيها حرف من المدى بتاعه.

---

## ٥. الخط الاحتياطي اللي بيمنع القفزة

~~~text من ملف الـ CSS
@font-face{font-family:Cairo Fallback;src:local(Arial);ascent-override:137.65%;descent-override:60.32%;line-gap-override:0.0%;size-adjust:94.66%}
~~~

- [[local(Arial)]]: خط موجود على الجهاز أصلًا، فمش محتاج تحميل.
- [[size-adjust:94.66%]]: صغّر Arial لـ ٩٤.٦٦٪ عشان عرض الحروف يقرّب من Cairo.
- [[ascent-override]] و [[descent-override]]: المسافة فوق وتحت السطر، عشان ارتفاع السطر يبقى زي Cairo.

فلحد ما Cairo يوصل، النص بيترسم بـ Arial متظبط على مقاس Cairo، ولما يتبدل السطور متتحركش تقريبًا.

### قسناها

عملنا صفحتين بنفس النص (فقرة عربي طويلة وتحتها صندوق): واحدة بـ next/font، وواحدة بـ [[<link>]] لـ Google Fonts زي زمان، وقسنا الـ CLS (Cumulative Layout Shift: مجموع حركة العناصر وهي بتتحمّل، كل ما يقل أحسن، وجوجل بيعتبر تحت 0.1 كويس) بـ PerformanceObserver في Chrome، ومعاه تبطيء للشبكة قريب من Slow 4G:

~~~text الناتج
next/font            CLS = 0.0098
<link> Google Fonts  CLS = 0.0669
~~~

حوالي ٧ أضعاف، والسبب إن صفحة الـ [[<link>]] اترسمت بخط النظام العادي، ولما Cairo وصل من [[fonts.gstatic.com]] السطور اتغيرت والصندوق اتزق.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[next/font/google]] | الخط بيتنزّل وقت الـ build، فمفيش طلب لجوجل من الزائر |
| [[subsets]] | ملفات أصغر، ولازم [[arabic]] للعربي |
| [[variable]] و [[@theme inline]] | تربط الخط بـ [[font-sans]] في Tailwind |
| الخط الاحتياطي ([[size-adjust]]) | النص ميتنططش لما الخط يحمّل |
| [[const]] على مستوى الملف | Next بيعالجها وقت الـ build. عرّفها مرة وصدّرها لو هتستخدمها في أكتر من مكان |`,
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
          teach: R`## الفكرة: الرسم البياني ومكتبته في ملف لوحده، بيتحمّل لما يتطلب

المثال client component فيه زرار. الرسم البياني ([[SalesChart]]) مش بيتحمّل مع الصفحة: بيتحمّل أول ما الزرار يتداس. اتشغّل في Next 16.4 بـ [[next build]] و [[next start]]، و [[sales-chart.tsx]] عملناه رسم بـ recharts، والقياس في Chrome headless.

---

## ١. [[import dynamic from "next/dynamic";]]

[[dynamic]] دالة من Next بتلف الكومبوننت التقيل وترجّع كومبوننت جديد بيتحمّل وقت ما يترسم.

والملف كله عليه [["use client"]] في أوله، لأن جواه [[useState]] و [[onClick]]، ولأن [[ssr: false]] مسموح في client component بس.

---

## ٢. [[const SalesChart = dynamic(() => import("./sales-chart"), {...});]]

نفكّها من جوه لبرة:

### [[import("./sales-chart")]]

[[import]] بأقواس، مش اللي فوق الملف. ده dynamic import: بيحمّل الملف **وقت التشغيل** ويرجّع Promise. والـ bundler لما يشوفه بيفهم إن الملف ده ومكتباته يتحطوا في ملف JS منفصل (ده اسمه code splitting).

والملف لازم يعمل [[export default]] للكومبوننت، لأن [[dynamic]] بياخد الـ default.

### [[() => import(...)]]

دالة بترجّع الـ import، مش الـ import نفسه. الفرق: لو كتبت [[import(...)]] على طول هيتنفذ دلوقتي. الدالة بتأجله لحد ما [[dynamic]] يناديها، يعني لحد ما الكومبوننت يترسم أول مرة.

### [[ssr: false]]

SSR = Server-Side Rendering. Next عادة بيرسم الـ client components على السيرفر كمان عشان الـ HTML الأول. [[false]] معناها «متحاولش ترسمه على السيرفر خالص». مفيد لمكتبات بتلمس [[window]] أو [[document]] أول ما تتعمل import، لأن دول مش موجودين على السيرفر.

### [[loading: () => <div className="h-80 animate-pulse rounded bg-gray-100" />]]

اللي يظهر لحد ما الملف يوصل. كلاسات Tailwind: [[h-80]] ارتفاع ٢٠ rem (٣٢٠ بكسل) قد الرسم، و [[animate-pulse]] بينوّر ويطفي، و [[rounded]] حواف مدورة، و [[bg-gray-100]] رمادي فاتح. نفس الارتفاع عشان الصفحة متتنططش لما الرسم يحل مكانه.

---

## ٣. الكومبوننت

~~~text sales-panel.tsx
export function SalesPanel({ data }: { data: { day: string; total: number }[] }) {
  const [open, setOpen] = useState(false);
  ...
      <button onClick={() => setOpen(true)}>اعرض الرسم</button>
      {open && <SalesChart data={data} />}
~~~

- [[{ day: string; total: number }[]]]: الـ [[[]]] في الآخر معناها array من objects بالشكل ده.
- [[useState(false)]]: الرسم مقفول في الأول.
- [[{open && <SalesChart ... />}]]: [[&&]] في JSX معناها «لو اللي على الشمال true، اعرض اللي على اليمين». فطول ما [[open]] بـ [[false]]، [[SalesChart]] مش في الصفحة، فـ [[dynamic]] مطلبش الملف.

الـ HTML اللي جه من السيرفر:

~~~text الناتج (curl /dashboard)
<section><button>اعرض الرسم</button></section>
~~~

الزرار بس. الرسم مش موجود، ولا حتى الـ loading.

---

## ٤. القياس: قبل وبعد الضغط

عدّينا ملفات الـ JS اللي اتحمّلت في Chrome (الحجم بعد فك الضغط، و Next بيبعتها gzip):

~~~text الناتج (مع dynamic)
on load:     6 files, 136 KB transferred (gzip), 450 KB uncompressed | chart in DOM: 0
after click: 1 files,  96 KB transferred (gzip), 336 KB uncompressed
~~~

وبعدين بدّلنا السطر لـ [[import SalesChart from "./sales-chart"]] عادي، وعملنا build تاني:

~~~text الناتج (import عادي)
on load:     6 files, 230 KB transferred (gzip), 781 KB uncompressed | chart in DOM: 0
after click: 0 files,   0 KB transferred (gzip),   0 KB uncompressed
~~~

| | مع الفتح | بعد الضغط |
|---|---|---|
| [[dynamic]] | 450 KB | 336 KB (ملف واحد) |
| [[import]] عادي | 781 KB | ولا حاجة |

نفس الكود تقريبًا، بس كل زائر مبيدوسش الزرار وفّر ٣٣٦ كيلو (٩٦ كيلو على الشبكة). والـ ٤٥٠ اللي فاضلين هم React و Next نفسهم: صفحة فاضية في نفس المشروع كانت ٤٥٥,٨٠٣ byte.

الأرقام دي كمان Next بيكتبها في [[.next/diagnostics/route-bundle-stats.json]] بعد كل build:

~~~text الناتج
dynamic:      /dashboard  firstLoadUncompressedJsBytes: 460933
import عادي:  /dashboard  firstLoadUncompressedJsBytes: 799730
~~~

---

## ٥. [[ssr: false]] في server component

جربنا نحط نفس السطر في [[page.tsx]] (server component، من غير [["use client"]]):

~~~text الناتج (next build)
Error: $__btssr: false$__bt is not allowed with $__btnext/dynamic$__bt in Server Components. Please move it into a Client Component.
~~~

الـ build وقع. ده سبب إن الـ [[dynamic]] في المثال جوه [[sales-panel.tsx]] اللي عليه [["use client"]].

---

## ٦. تقيس الأول: [[next experimental-analyze]]

~~~bash
npx next experimental-analyze
~~~

بيعمل build للتحليل بس، ويفتح واجهة على بورت 4000 ([[--port]] يغيّره) فيها كل route وملفاته وأحجامها. وفي 16.4 نفس الأمر اسمه كمان [[next analyze]] (الـ help بيقول [[Usage: next analyze|experimental-analyze]]). ولو عايز الملفات بس من غير سيرفر، [[-o]]:

~~~text الناتج
✓ Analyze completed in 4.7s. Results written to ...\.next\diagnostics\analyze.
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[dynamic(() => import("./x"))]] | ملف JS منفصل بيتحمّل أول ما الكومبوننت يترسم |
| [[ssr: false]] | ميترسمش على السيرفر. client component بس |
| [[loading]] | مكان بنفس المقاس لحد ما يوصل |
| [[{open && ...}]] | طول ما مش معروض، الملف مش متطلب |
| [[next experimental-analyze]] | قيس قبل ما تحسّن |`,
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

قستها بـ recharts: مع [[dynamic]] الصفحة حمّلت حوالي ٤٥٠ كيلو JS (من غير ضغط) وقت الفتح، ولما دوست الزرار اتحمّل ملف تاني حوالي ٣٣٠ كيلو والرسم ظهر. ومع [[import]] العادي: حوالي ٧٨٠ كيلو كلهم مع الفتح، وصفر بعد الضغط. يعني الـ ٣٣٠ كيلو اتنقلوا لبعد الضغط بدل ما كل زائر يدفعهم. لو ملف الـ chart اتحمّل مع الصفحة رغم [[dynamic]]: فيه ملف تاني بيعمل [[import]] عادي لنفس الكومبوننت أو للمكتبة.`
        }
      ]
    }
]);
