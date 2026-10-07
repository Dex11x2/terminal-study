// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "اللغات والأخطاء والتحميل",
      l: 2,
      n: "عربي وإنجليزي و RTL، وخطأ في جزء ميوقعش الصفحة، وكود بيتحمّل وقت الحاجة، و modals",
      items: [
        {
          cmd: "react-i18next",
          title: "تطبيق بأكتر من لغة",
          desc: R`react-i18next بيحط كل النصوص في ملفات JSON لكل لغة، وفي الـ component بتنادي [[t('cart.title')]] بدل ما تكتب النص. [[useTranslation]] بيدّيك [[t]] و [[i18n]]، و [[i18n.changeLanguage('ar')]] بيغيّر اللغة وكل component بيستخدم t بيعيد الرسم.

المتغيرات بتتكتب [[{{name}}]] جوه النص، والجمع بيتظبط لوحده حسب [[count]] بلواحق زي [[_one]] و [[_other]]، والعربي ليه ٦ أشكال. وفي Next.js الأشهر next-intl، وتفاصيله في تاب Next.js.`,
          example: R`import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: { greeting: 'Hello {{name}}', items_one: '{{count}} item', items_other: '{{count}} items' } },
    ar: { translation: { greeting: 'أهلًا {{name}}', items_zero: 'مفيش حاجة', items_one: 'حاجة واحدة', items_two: 'حاجتين', items_few: '{{count}} حاجات', items_many: '{{count}} حاجة', items_other: '{{count}} حاجة' } },
  },
})
function Header({ name, count }: { name: string; count: number }) {
  const { t, i18n } = useTranslation()
  return <header>{t('greeting', { name })} · {t('items', { count })} <button onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}>EN/AR</button></header>
}`,
          try: R`[[npm i i18next react-i18next]]، وحط الـ init في [[src/i18n.ts]] واعمله import في [[main.tsx]]. جرّب count بـ 0 و 1 و 2 و 3 و 11 بالعربي وشوف الشكل بيتغير. (النتيجة: مفيش حاجة، وحاجة واحدة، وحاجتين، و 3 حاجات، و 11 حاجة.)`,
          flag: "script",
          deep: {
            why: "لو النصوص مكتوبة جوه الـ components، إضافة لغة معناها تعدّل كل ملف. ولو عملت [[lang === 'ar' ? ... : ...]] في كل حتة، الكود بيتملى شروط والجمع بيطلع غلط. ملفات ترجمة منفصلة معناها المترجم يشتغل من غير ما يلمس الكود.",
            how: R`i18next هو المحرك (مش مربوط بـ React)، و react-i18next بيربطه بـ React عن طريق [[initReactI18next]]. الـ init بيتعمل مرة واحدة في ملف لوحده ويتعمله import في [[main.tsx]] قبل App.

[[useTranslation]] بيشترك في event [[languageChanged]]، فلما تنادي changeLanguage كل component بيستخدمه بيعيد الرسم. و [[t('key')]] بيدوّر في اللغة الحالية، ولو المفتاح مش موجود يروح لـ fallbackLng، ولو مش موجود خالص يرجّع المفتاح نفسه كنص (عشان تلاحظه).

الجمع مبني على [[Intl.PluralRules]] بتاع المتصفح: للإنجليزي one و other، وللعربي zero و one و two و few (3 لـ 10) و many (11 لـ 99) و other. انت بتكتب [[t('items', { count })]] وهو بيختار اللاحقة.

[[escapeValue: false]] لأن React أصلًا بتعمل escape لأي نص، فمن غيرها هتشوف [[&amp;]] بدل [[&]].

في مشروع أكبر، الترجمات في [[public/locales/ar/common.json]] وبتتحمّل بـ i18next-http-backend وقت الحاجة، ومقسّمة namespaces (common و checkout و dashboard). والتحميل ده async، و react-i18next افتراضيًا بيستخدم Suspense، فلازم [[<Suspense>]] فوق. و i18next-browser-languagedetector بيختار اللغة من cookie أو localStorage أو المتصفح.

ولو الجملة فيها link أو bold في النص، [[<Trans>]] بيسمحلك تحط JSX جوه الترجمة. والأرقام والتواريخ بـ [[Intl.NumberFormat]] و [[Intl.DateTimeFormat]] حسب اللغة.`,
            when: "أي تطبيق هيبقى فيه أكتر من لغة، حتى لو «بعدين». نقل النصوص من الكود بعد ما يكبر أصعب بكتير.",
            mistakes: R`تبني الجملة من حتت [[t('hello') + ' ' + name]]: ترتيب الكلام في العربي مختلف، استخدم [[{{name}}]]. و [[count + ' items']] بإيدك بدل الجمع. و http backend من غير Suspense فالتطبيق يقع أو يفضل فاضي. وفي مشروع حقيقي كان [[preload]] للغتين وكل الـ ١١ namespace من أول تحميل: ٢٢ ملف JSON قبل ما الصفحة تظهر، وده عكس فكرة التحميل وقت الحاجة.`
          },
          teach: R`## الفكرة: النصوص في قاموس، والـ component بيطلبها بالمفتاح

المثال جزئين: إعداد بيتعمل مرة واحدة ([[init]])، و component اسمه [[Header]] بيطلب النصوص بالمفتاح بدل ما يكتبها. اتشغّل في Vite + React 19.3 مع i18next 26.4 و react-i18next 17.0 في Chrome headless (الـ init في [[src/i18n.ts]] والـ component في ملف تاني، زي ما الـ try بيقول)، ورسمنا [[Header]] ست مرات بـ [[count]] من 0 لـ 100.

---

## ١. الـ imports

~~~text i18n.ts
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
~~~

- [[i18next]]: المحرك نفسه. مش عارف حاجة عن React، بيشيل الترجمات ويرجّع النص المطلوب. و [[i18n]] (اختصار internationalization: حرف i، و 18 حرف، وحرف n) هو الـ instance الجاهز اللي المكتبة بتصدّره كـ default.
- [[react-i18next]]: الربط مع React. [[initReactI18next]] plugin، و [[useTranslation]] الـ hook اللي الـ components بتستخدمه.

## ٢. [[i18n.use(initReactI18next).init({...})]]

بتتقري من الشمال لليمين: [[use]] بيسجّل الـ plugin ويرجّع نفس الـ [[i18n]]، فتقدر تكمّل عليه بـ [[.init(...)]] في نفس السطر (ده اسمه chaining). والـ plugin هو اللي بيخلي [[useTranslation]] يلاقي الـ instance ده من غير ما تبعته لكل component.

جوه الـ object:

| الخانة | معناها |
|---|---|
| [[lng: 'ar']] | اللغة اللي التطبيق يبدأ بيها |
| [[fallbackLng: 'en']] | لو مفتاح مش موجود في العربي، دوّر عليه في الإنجليزي |
| [[interpolation: { escapeValue: false }]] | متحوّلش [[&]] لـ [[&amp;]]، React بتعمل كده لوحدها |
| [[resources]] | الترجمات نفسها |

### ليه [[escapeValue: false]]؟

جربنا في Node من غيرها: نص فيه [[{{x}}]] وبعتنا [[x: 'B & C']]:

~~~text الناتج (Node، escapeValue سايبينها الافتراضي)
A & B &amp; C
~~~

i18next حوّل الـ [[&]] اللي جاية من المتغير لـ [[&amp;]] عشان يحمي HTML. بس React كمان بتحمي أي نص بتعرضه، فلو سبتها المستخدم هيشوف [[&amp;]] حرفيًا على الشاشة.

### شكل [[resources]]

~~~text resources
en:  { translation: { greeting: ..., items_one: ..., items_other: ... } }
ar:  { translation: { greeting: ..., items_zero: ..., ..., items_other: ... } }
~~~

ثلاث طبقات: اللغة ([[en]] و [[ar]])، وبعدين الـ namespace (هنا [[translation]]، وده الاسم الافتراضي اللي i18next بيدوّر فيه)، وبعدين المفاتيح. في مشروع حقيقي كل لغة في ملف JSON لوحدها، بس الشكل هو هو.

---

## ٣. المتغيرات: [[{{name}}]]

~~~text resources
greeting: 'Hello {{name}}'
greeting: 'أهلًا {{name}}'
~~~

القوسين المزدوجين معناهم «هنا هيتحط متغير اسمه name». الجملة كلها في ملف الترجمة، فالمترجم يقدر يحط الاسم في أي مكان يناسب اللغة، مش لازم في الآخر.

## ٤. الجمع: [[items_one]] و [[items_other]]

انت مش بتكتب [[t('items_one')]]. انت بتكتب [[t('items', { count })]]، و i18next بيسأل المتصفح «الرقم ده في اللغة دي يبقى أنهي فئة؟» عن طريق [[Intl.PluralRules]] (الـ Intl ده جزء من JavaScript نفسها لأي حاجة ليها علاقة باللغات)، وبعدين يضيف اسم الفئة للمفتاح.

سألنا [[Intl.PluralRules]] في Node 24 مباشرة:

~~~text الناتج
ar:  0:zero  1:one  2:two  3:few  10:few  11:many  99:many  100:other  102:other
en:  0:other  1:one  2:other
فئات العربي: [ 'zero', 'one', 'two', 'few', 'many', 'other' ]
~~~

يعني الإنجليزي ليه فئتين بس (one للواحد، و other لأي حاجة تانية حتى الصفر)، والعربي ست فئات. عشان كده الإنجليزي فيه مفتاحين والعربي فيه ستة. لاحظ إن 100 و 102 «other» مش «many»: الـ many من 11 لـ 99 بس.

و [[{{count}}]] جوه النص هو نفس الـ count اللي بعته، فـ [[items_few]] بيطلع «3 حاجات».

---

## ٥. الـ component

~~~text Header
function Header({ name, count }: { name: string; count: number }) {
~~~

بياخد props اتنين. الجزء بعد [[:]] هو الـ type بتاع TypeScript: [[name]] نص و [[count]] رقم.

~~~text Header
const { t, i18n } = useTranslation()
~~~

[[useTranslation()]] بيرجّع object، وبنفكّه (destructuring) لاتنين:

- [[t]] (اختصار translate): الدالة اللي بتحوّل المفتاح لنص.
- [[i18n]]: نفس الـ instance بتاع الإعداد، عشان نقرا اللغة الحالية ونغيّرها.

والأهم: الـ hook بيشترك في تغيير اللغة، فلما اللغة تتغير الـ component ده بيعيد الرسم لوحده.

~~~text Header
{t('greeting', { name })} · {t('items', { count })}
~~~

[[{ name }]] اختصار [[{ name: name }]]. الـ object التاني في [[t]] فيه قيم المتغيرات، و [[count]] بالذات ليه معنى خاص: هو اللي بيختار شكل الجمع.

~~~text Header
<button onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}>EN/AR</button>
~~~

- [[i18n.language]]: اللغة الحالية.
- [[شرط ? أ : ب]]: لو الشرط صح خد أ، غير كده ب. يعني لو عربي روح إنجليزي والعكس.
- [[changeLanguage]]: بيغيّر اللغة ويبعت event، وكل component بيستخدم [[useTranslation]] بيعيد الرسم.

---

## ٦. اللي ظهر في المتصفح

~~~text الشاشة (Chrome headless، count = 0 و 1 و 2 و 3 و 11 و 100)
أهلًا Sara · مفيش حاجة EN/AR
أهلًا Sara · حاجة واحدة EN/AR
أهلًا Sara · حاجتين EN/AR
أهلًا Sara · 3 حاجات EN/AR
أهلًا Sara · 11 حاجة EN/AR
أهلًا Sara · 100 حاجة EN/AR
~~~

وبعد ما دوسنا EN/AR في واحد منهم بس:

~~~text الشاشة بعد الضغط
Hello Sara · 0 items EN/AR
Hello Sara · 1 item EN/AR
Hello Sara · 2 items EN/AR
Hello Sara · 3 items EN/AR
Hello Sara · 11 items EN/AR
Hello Sara · 100 items EN/AR
~~~

الست اتغيروا مع بعض، لأن اللغة واحدة لكل التطبيق مش لكل component. والصفر في الإنجليزي «0 items» لأن فئته other.

### المفتاح الناقص

~~~text الناتج (Node: bye موجودة في en بس، و nope مش موجودة خالص)
t('bye')   →  Bye
t('nope')  →  nope
~~~

[[bye]] مش في العربي، فـ [[fallbackLng]] جابها من الإنجليزي. و [[nope]] مش في أي لغة، فرجع المفتاح نفسه كنص: لو شفت اسم مفتاح على الشاشة، يبقى الترجمة ناقصة.

---

## ٧. الـ solCode: [[main.tsx]]

~~~text main.tsx
import './i18n'
~~~

import من غير أسماء: معناه «شغّل الملف ده وبس». الملف بيعمل [[init]]، فلازم يتشغّل قبل أول component. لو نسيته، [[t('items')]] هيرجّع [[items]].

~~~text main.tsx
createRoot(document.getElementById('root')!).render(<App />)
~~~

[[!]] بعد [[getElementById(...)]] بتقول لـ TypeScript «متأكد إن العنصر موجود، مش null».

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| إعداد مرة واحدة | [[i18n.use(initReactI18next).init({...})]] في ملف لوحده، import في main |
| نص في component | [[const { t } = useTranslation()]] و [[t('key')]] |
| متغير جوه النص | [[{{name}}]] في الترجمة و [[t('key', { name })]] |
| جمع | مفاتيح بـ [[_one]] و [[_other]] (والعربي ٦)، و [[t('key', { count })]] |
| تغيير اللغة | [[i18n.changeLanguage('en')]] |

> متبنيش الجملة من حتت بـ [[+]]، ومتكتبش الجمع بإيدك. خلّي الجملة كلها في الترجمة.`,
          lines: [
            "المحرك.",
            "الربط مع React، والـ hook.",
            "سجّل الربط وابدأ.",
            "اللغة الأولى.",
            "لو مفتاح ناقص في العربي، خده من الإنجليزي.",
            "React بتعمل escape لوحدها، فمنعملش مرتين.",
            "الترجمات (في مشروع حقيقي في ملفات JSON منفصلة).",
            "الإنجليزي: متغير بين {{ }}، وشكلين للجمع.",
            "العربي: ستة أشكال للجمع حسب الرقم.",
            "قفلة resources.",
            "قفلة init.",
            "component بيستخدم الترجمة.",
            "t للنصوص، و i18n لتغيير اللغة.",
            "نص بمتغير، وجمع حسب count، وزرار بيقلب اللغة فكل حاجة تعيد الرسم.",
            "قفلة."
          ],
          sol: R`بالعربي: [[0]] «مفيش حاجة»، [[1]] «حاجة واحدة»، [[2]] «حاجتين»، [[3]] «3 حاجات»، [[11]] «11 حاجة»، ولو جربت [[100]] «100 حاجة». i18next بيسأل [[Intl.PluralRules('ar')]] عن الفئة (zero و one و two و few من 3 لـ 10، و many من 11 لـ 99، و other للباقي) وبيضيف الـ suffix للـ key. ودوسة EN/AR بتقلب لـ «Hello Sara · 3 items».

لو شفت كلمة [[items]] نفسها على الشاشة، يبقى الـ init متعملوش import في [[main.tsx]]، أو مبعتش [[count]] أصلًا. ولو شفت «3 حاجة»، يبقى [[items_few]] ناقصة ووقع على other.`,
          solCode: R`// src/main.tsx
import './i18n'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />)`
        },
        {
          cmd: "RTL",
          title: "اقلب اتجاه الصفحة مع العربي",
          desc: R`لما اللغة تبقى عربي لازم [[<html dir="rtl" lang="ar">]]، والمتصفح بعدها بيقلب ترتيب النص والـ flex والـ grid لوحده. والاتجاه دايمًا محسوب من اللغة، مش state لوحده: [[i18n.dir()]] بيرجّع [[rtl]] أو [[ltr]].

والـ CSS اكتبه بالخصائص المنطقية: [[margin-inline-start]] بدل [[margin-left]]، وفي Tailwind [[ms-4]] و [[pe-2]] و [[text-start]] بدل [[ml-4]] و [[pr-2]] و [[text-left]]. كده نفس الكلاس يشتغل صح في الاتجاهين.`,
          example: R`import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useDocumentDirection() {
  const { i18n } = useTranslation()
  const dir = i18n.dir(i18n.language)
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = dir
  }, [i18n.language, dir])
  return dir
}
function PriceRow({ label, price }: { label: string; price: string }) {
  return <div className="flex justify-between gap-2 ps-4 text-start"><span>{label}</span><bdi dir="ltr">{price}</bdi></div>
}`,
          try: R`نادي الـ hook في App، واقلب اللغة، وشوف الـ flex بيتقلب لوحده. بعدين حط رقم تليفون [[+20 100 000 0000]] جوه جملة عربي من غير [[<bdi>]] وشوف العلامة بتروح فين.`,
          flag: "script",
          deep: {
            why: "العربي مش ترجمة نصوص بس: الصفحة كلها بتتقلب. لو كاتب [[margin-left]] و [[left: 0]] و [[text-align: left]] في كل حتة، هتقضي أيام تكتب overrides لـ [[[dir=rtl]]]، وكل component جديد هيتنسي.",
            how: R`[[dir]] على [[<html>]] بيحدد الاتجاه الأساسي للصفحة. الـ flex بـ [[row]] بيمشي مع اتجاه السطر، فبيتقلب لوحده، ونفس الكلام للـ grid وترتيب الأعمدة في الجداول.

الخصائص المنطقية بتقول «البداية» و «النهاية» بدل «شمال» و «يمين»: [[margin-inline-start]] بتبقى شمال في الإنجليزي ويمين في العربي. و Tailwind v4 عنده [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[start-*]] و [[end-*]] و [[text-start]]، و variant [[rtl:]] للحاجات اللي لازم تتقلب يدوي زي أيقونة سهم ([[rtl:rotate-180]]). تفاصيل CSS في تاب HTML و CSS.

الأرقام والإيميلات والأكواد جوه نص عربي ممكن تتلخبط بسبب خوارزمية الاتجاه (bidi): [[+20]] ممكن تطلع [[20+]]. [[<bdi>]] أو [[dir="ltr"]] على العنصر بيعزل اتجاهه.

الـ effect هنا مبرر، لأن [[<html>]] برا شجرة React. والاتجاه محسوب من اللغة في كل render، فمستحيل يختلفوا. و [[lang]] مهم لقارئ الشاشة والخطوط والـ hyphenation.

ومكتبات كتير محتاجة تعرف: carousels ليها prop اسمه [[rtl]]، و charts (recharts) ممكن تحتاج [[reversed]] على المحور. وفي Next.js حط [[dir]] و [[lang]] على [[<html>]] في الـ root layout من السيرفر، فمفيش وميض.`,
            when: "أي تطبيق فيه عربي. وحتى لو التطبيق عربي بس، اكتب logical properties من الأول.",
            mistakes: R`[[ml-4]] و [[left-0]] في كل حتة وبعدين patches. ونسيان [[lang]]. وأيقونات أسهم متتقلبش. وفي مشروع حقيقي كان فيه hook بيخزّن isRTL في state، و [[forceUpdate]]، و [[setTimeout]] بـ 50ms عشان «كل الـ components تعيد الرسم»، وكمان component تاني بيعمل نفس الشغل بـ [[requestAnimationFrame]]: كل ده بدل قيمة محسوبة من اللغة و effect واحد.`
          },
          teach: R`## الفكرة: الاتجاه بيتحسب من اللغة، وبيتكتب على [[<html>]]

المثال حاجتين: hook اسمه [[useDocumentDirection]] بيحط [[lang]] و [[dir]] على [[<html>]] كل ما اللغة تتغير، و component اسمه [[PriceRow]] مكتوب بكلاسات Tailwind «منطقية» بتشتغل في الاتجاهين من غير أي شرط. اتشغّل في Vite + React 19.3 + react-i18next 17 + Tailwind 4.3 في Chrome headless، بنفس إعداد i18n بتاع الدرس اللي فات (بيبدأ بالعربي)، وجوه div عرضه 400px.

---

## ١. الـ imports

~~~text useDocumentDirection.tsx
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
~~~

[[useEffect]] عشان هنعدّل حاجة برا React ([[<html>]] نفسه)، و [[useTranslation]] عشان نعرف اللغة، والأهم إن الـ component يعيد الرسم لما تتغير.

## ٢. الـ hook

~~~text useDocumentDirection.tsx
export function useDocumentDirection() {
  const { i18n } = useTranslation()
  const dir = i18n.dir(i18n.language)
~~~

- [[export]]: عشان ملفات تانية تقدر تعمله import. واسمه بيبدأ بـ [[use]] لأنه بينادي hooks جواه، وده شرط React.
- [[i18n.dir(lang)]]: دالة جاهزة في i18next بتعرف اللغات اللي بتتكتب من اليمين (العربي والعبري والفارسي وغيرهم) وبترجّع [[rtl]] أو [[ltr]]. جربناها في Node:

~~~text الناتج (i18next 26 في Node)
dir('ar') = rtl    dir('ar-EG') = rtl    dir('he') = rtl    dir('en') = ltr
~~~

[[rtl]] = right to left، و [[ltr]] = left to right. ولاحظ إن [[dir]] متغير عادي محسوب في كل render، مش [[useState]]. لو عملته state هيبقى عندك حاجتين لازم يفضلوا متطابقين (اللغة والاتجاه)، وده باب للـ bugs.

## ٣. الـ effect

~~~text useDocumentDirection.tsx
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = dir
  }, [i18n.language, dir])
  return dir
}
~~~

- [[document.documentElement]] هو عنصر [[<html>]] نفسه. React بترسم جوه [[<div id="root">]] بس، فمعندهاش طريقة تحط attribute على [[<html>]] من JSX. عشان كده effect: ده بالظبط استخدامه، مزامنة حاجة برا React.
- [[lang]] لقارئ الشاشة (عشان ينطق بالعربي) والخطوط. و [[dir]] هو اللي بيقلب الصفحة.
- [[[i18n.language, dir]]]: الـ dependencies. الـ effect بيتعاد لما واحدة منهم تتغير بس، مش كل render.
- [[return dir]]: لو component محتاج يعرف الاتجاه (زي carousel عنده prop اسمه rtl).

---

## ٤. [[PriceRow]]: الكلاسات

~~~text PriceRow
<div className="flex justify-between gap-2 ps-4 text-start">
~~~

| الكلاس | الـ CSS | في الاتجاهين |
|---|---|---|
| [[flex]] | [[display: flex]] | العناصر جنب بعض، وبتمشي مع اتجاه السطر |
| [[justify-between]] | [[justify-content: space-between]] | الأول في البداية والتاني في النهاية |
| [[gap-2]] | [[gap: 0.5rem]] | مسافة 8px بينهم |
| [[ps-4]] | [[padding-inline-start: 1rem]] | padding في «البداية»: شمال في الإنجليزي ويمين في العربي |
| [[text-start]] | [[text-align: start]] | محاذاة للبداية |

الـ s في [[ps]] = start. ولو كتبت [[pl-4]] (l = left) هتبقى شمال دايمًا حتى في العربي.

## ٥. [[<bdi dir="ltr">]]

~~~text PriceRow
<span>{label}</span><bdi dir="ltr">{price}</bdi>
~~~

[[bdi]] = Bidirectional Isolate: عنصر بيقول للمتصفح «اللي جوايا اتجاهه لوحده، متخلطوش باللي حواليه». و [[dir="ltr"]] بيحدد إن اتجاهه شمال ليمين.

---

## ٦. اللي حصل في المتصفح

قسنا مكان الـ label والسعر من شمال الصف، والـ padding المحسوب:

~~~text Chrome headless، الصف عرضه 400px
عربي:     <html lang="ar" dir="rtl">   label عند 350px   السعر عند 0px     padding-right: 16px  padding-left: 0px
إنجليزي:  <html lang="en" dir="ltr">   label عند 16px    السعر عند 342px   padding-left: 16px   padding-right: 0px
~~~

نفس الـ JSX ونفس الكلاسات، والـ flex اتقلب لوحده: الـ label بقى يمين في العربي، و [[ps-4]] بقت padding يمين. مفيش ولا [[if (rtl)]] في الكود.

### الرقم من غير [[<bdi>]]

حطينا نفس الرقم في جملتين عربي، وقرينا ترتيب الحروف على الشاشة من الشمال لليمين:

~~~text ترتيب الرقم على الشاشة (من الشمال لليمين)
من غير bdi:  0000 000 100 20+
بـ bdi:       +20 100 000 0000
~~~

ليه؟ المتصفح بيرتّب النص بخوارزمية اسمها bidi (Unicode Bidirectional Algorithm). كل رقم لوحده بيتكتب شمال ليمين، بس المسافات و [[+]] حروف «محايدة» بتاخد اتجاه اللي حواليها، واللي حواليها عربي. فالمجموعات نفسها اترتبت من اليمين للشمال، والـ [[+]] راحت ناحية اليمين. [[<bdi dir="ltr">]] بيعزل الرقم كله كحتة واحدة شمال ليمين.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الاتجاه | [[i18n.dir(i18n.language)]] محسوب، مش state |
| تطبيقه على الصفحة | effect بيكتب [[lang]] و [[dir]] على [[document.documentElement]] |
| margin و padding | [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] بدل [[ml]] و [[mr]] و [[pl]] و [[pr]] |
| محاذاة | [[text-start]] و [[text-end]] |
| رقم أو إيميل جوه عربي | [[<bdi dir="ltr">]] |

> الـ flex والـ grid بيتقلبوا لوحدهم مع [[dir]]. اللي بيبوّظ العربي هو أي حاجة مكتوب فيها left أو right صريحة.`,
          lines: [
            "useEffect للـ DOM اللي برا React.",
            "عشان نقرا اللغة الحالية.",
            "hook يظبط اتجاه الصفحة.",
            "i18n، و useTranslation بيعيد الرسم لما اللغة تتغير.",
            "الاتجاه محسوب من اللغة: rtl للعربي، ltr للإنجليزي.",
            "effect لأن html برا شجرة React:",
            "lang للقارئ والخطوط.",
            "dir يقلب الصفحة كلها.",
            "يتعاد لما اللغة تتغير.",
            "رجّعه لو component محتاجه.",
            "قفلة الـ hook.",
            "صف فيه عنوان وسعر.",
            "ps و text-start بيتقلبوا لوحدهم، و bdi بيعزل اتجاه السعر.",
            "قفلة."
          ],
          sol: R`بعد ما تقلب لعربي، في Elements هتلاقي [[<html lang="ar" dir="rtl">]]، والـ flex اتقلب لوحده: الـ label بقى يمين والسعر شمال، و [[ps-4]] بقت padding من اليمين. ولما ترجع إنجليزي كل حاجة ترجع.

الرقم من غير [[<bdi>]] في جملة عربي هيتعرض كده: [[0000 000 100 20+]]. العلامة بتروح لآخر الرقم من ناحية اليمين وترتيب المجموعات بيتقلب، لأن الـ + والمسافات بياخدوا اتجاه الكلام العربي اللي حواليهم. [[<bdi dir="ltr">]] بيعزل الرقم فيتعرض [[+20 100 000 0000]] صح.`
        },
        {
          cmd: "ErrorBoundary",
          title: "خطأ في جزء ميوقّعش الصفحة كلها",
          desc: R`لو component رمى error وهو بيترسم، React بتشيل الشجرة كلها وتسيب صفحة بيضا. الـ error boundary بيمسك الأخطاء دي في الجزء اللي تحته بس، ويعرض بديل (fallback) فيه زرار «حاول تاني».

React لسه بتطلب class component للـ boundary، فالعادي تستخدم [[react-error-boundary]]: [[<ErrorBoundary FallbackComponent={...}>]]، و [[onError]] يبعت الخطأ لخدمة logging، و [[resetKeys]] يصفّر الـ boundary لما قيمة تتغير (زي الـ route).`,
          example: R`import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return <div role="alert"><p>{message}</p><button onClick={resetErrorBoundary}>Try again</button></div>
}
export function Page() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={(err, info) => logError(err, info.componentStack)} resetKeys={[pathname]}>
      <Dashboard />
    </ErrorBoundary>
  )
}`,
          try: R`[[npm i react-error-boundary]]، واعمل component بيرمي error لو [[Math.random() > 0.5]]، ولفّه في الـ boundary. دوس Try again كذا مرة. بعدين ارمي الـ error من onClick بدل الرسم وشوف إن الـ boundary مش بيمسكه.`,
          flag: "script",
          deep: {
            why: "من غير boundaries، error واحد في chart صغير في جنب الصفحة بيشيل التطبيق كله والمستخدم يشوف شاشة بيضا. React عملت كده عن قصد: إنها تسيب واجهة مكسورة أخطر من إنها تشيلها. الـ boundary بيحدد انت عايز الكسر يقف فين.",
            how: R`الـ boundary class فيها [[static getDerivedStateFromError]] (بتحوّل الـ state لـ «فيه خطأ» فالـ render الجاي يعرض الـ fallback) و [[componentDidCatch]] (للـ logging). react-error-boundary بيلفهم في component بـ props سهلة.

بيمسك الأخطاء وقت الرسم، وفي الـ lifecycle، وفي الـ effects، في أي component تحته. ومبيمسكش: أخطاء الـ event handlers (دي try/catch عادي)، والكود الـ async (setTimeout أو promise برا React)، والـ SSR، وأخطاء الـ boundary نفسه.

عشان توصّل خطأ async أو من handler للـ boundary: [[const { showBoundary } = useErrorBoundary()]] وبعدين [[showBoundary(err)]]. ومع TanStack Query [[throwOnError: true]] بيرمي خطأ الـ query للـ boundary.

[[resetKeys]]: لو أي قيمة فيه اتغيرت، الـ boundary بيرجع يحاول يرسم الأولاد. بالـ pathname، لما المستخدم يروح صفحة تانية الخطأ بيختفي بدل ما يفضل عالق.

والتوزيع: واحد فوق خالص كآخر خط دفاع، وواحد حوالين كل route، وواحد حوالين الحاجات الخطرة (widgets، و charts، ومكتبات برا). وفي React 19 تقدر تحط [[onCaughtError]] و [[onUncaughtError]] في [[createRoot]] عشان تبعت كل الأخطاء لـ logging من مكان واحد.

في التطوير React بتطبع الخطأ في الـ console حتى لو الـ boundary مسكه، ده طبيعي. (والـ overlay بتاع Vite بيظهر لأخطاء الـ build بس، مش أخطاء الرسم.)`,
            when: "حوالي كل route، وأي جزء ممكن يقع لوحده: charts (recharts)، ومحررات، و iframes، وأي بيانات من API ممكن تيجي بشكل غير متوقع.",
            mistakes: R`تفتكر إنه بيمسك أخطاء onClick. و boundary واحد فوق بس، فأي خطأ بيشيل كل حاجة. ومفيش reset فالمستخدم عالق. وفي مشروع حقيقي كان فيه boundary متعمل بإيده فوق التطبيق كله، بيعرض رسالة الخطأ والـ component stack للمستخدمين في الإنتاج، وزراره الوحيد reload للصفحة: التفاصيل التقنية مكانها الـ logging، مش شاشة العميل.`
          },
          teach: R`## الفكرة: «لو اللي تحتي وقع، اعرض ده مكانه»

المثال حاجتين: [[ErrorFallback]] (الشاشة اللي بتظهر مكان الجزء اللي وقع)، و [[Page]] اللي بيلف [[Dashboard]] في [[<ErrorBoundary>]]. اتشغّل في Vite + React 19.3 + react-error-boundary 6.1 + React Router 8.4 في Chrome headless. ولأن [[Dashboard]] و [[logError]] مش جزء من المثال، عملناهم إحنا: [[Dashboard]] بيرمي [[new Error('Chart data is missing')]] طول ما متغير [[broken]] بـ true، وزرار Fix برا الـ boundary بيخليه false، و [[logError]] بيطبع في الـ console.

---

## ١. الـ import

~~~text Page.tsx
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
~~~

- [[ErrorBoundary]]: الـ component اللي بيمسك الأخطاء. React نفسها مفيهاش hook يعمل كده، لازم class component، والمكتبة دي بتلف الـ class دي في component سهل.
- [[type FallbackProps]]: كلمة [[type]] قبل الاسم بتقول إن ده type بس، بيتشال خالص بعد الـ build ومش بيدخل في الـ JavaScript.

## ٢. [[ErrorFallback]]

~~~text Page.tsx
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
~~~

الـ boundary هو اللي بيرسم الـ component ده ويبعتله prop اتنين:

- [[error]]: اللي اترمى.
- [[resetErrorBoundary]]: دالة بتقول للـ boundary «امسح الخطأ وحاول ترسم الأولاد تاني».

~~~text Page.tsx
const message = error instanceof Error ? error.message : 'Unknown error'
~~~

في JavaScript تقدر ترمي أي حاجة: [[throw 'oops']] أو [[throw 42]]، مش [[Error]] بس. عشان كده نوع [[error]] هو [[unknown]]، و TypeScript مش هيسمحلك تكتب [[error.message]] على طول. [[instanceof Error]] بيسأل «ده Error فعلًا؟»: لو أيوه خد رسالته، لو لأ اكتب نص ثابت.

~~~text Page.tsx
return <div role="alert"><p>{message}</p><button onClick={resetErrorBoundary}>Try again</button></div>
~~~

[[role="alert"]] بيخلي قارئ الشاشة يقرا الرسالة أول ما تظهر. والزرار بينادي [[resetErrorBoundary]] مباشرة.

---

## ٣. [[Page]]

~~~text Page.tsx
const { pathname } = useLocation()
~~~

[[useLocation]] من React Router بيرجّع المكان الحالي، و [[pathname]] هو المسار ([[/]] أو [[/other]]).

~~~text Page.tsx
<ErrorBoundary FallbackComponent={ErrorFallback} onError={(err, info) => logError(err, info.componentStack)} resetKeys={[pathname]}>
  <Dashboard />
</ErrorBoundary>
~~~

| الـ prop | بيعمل إيه |
|---|---|
| [[FallbackComponent={ErrorFallback}]] | الـ component اللي يترسم مكان الأولاد لما يقعوا. بنبعت الدالة نفسها، مش [[<ErrorFallback />]] |
| [[onError={(err, info) => ...}]] | بيتنادى مرة مع كل خطأ اتمسك، عشان تبعته لخدمة logging |
| [[info.componentStack]] | نص فيه الـ components اللي الخطأ حصل جواها، من الأعمق للأعلى |
| [[resetKeys={[pathname]}]] | array قيم: لو أي واحدة اتغيرت والـ boundary في حالة خطأ، بيصفّر لوحده |

---

## ٤. اللي حصل في المتصفح

### أول تحميل ([[Dashboard]] بيرمي)

~~~text الشاشة
Header Fix Other
Chart data is missing
Try again
~~~

~~~text الـ console
console.error: Error: Chart data is missing
  The above error occurred in the <Dashboard> component.
  React will try to recreate this component tree from scratch using the error boundary you provided, ...
console.log: logError: Chart data is missing | stack starts: at Dashboard (.../App.tsx:11:20)
~~~

الـ header فضل ظاهر لأنه برا الـ boundary، والجزء اللي جوه بس اللي اتبدّل. والـ [[console.error]] ده من React نفسها في وضع التطوير، بيطلع حتى لو الـ boundary مسك الخطأ، وده طبيعي. والسطر التاني هو [[onError]]: أول سطر في [[componentStack]] هو [[Dashboard]] اللي رمى.

### Try again والخطأ لسه موجود

~~~text الشاشة بعد Try again
Chart data is missing
Try again
~~~

[[resetErrorBoundary]] رسم الأولاد تاني، و [[Dashboard]] رمى تاني، فالـ fallback رجع و [[onError]] اتنادى مرة كمان. «حاول تاني» بتفيد بس لو السبب اتغير (شبكة رجعت، بيانات اتحدّثت).

### Fix وبعدين Try again

~~~text الشاشة
Header Fix Other
Dashboard OK
Bomb Save
~~~

---

## ٥. اللي الـ boundary مش بيمسكه

ضيفنا زرار جوه الـ boundary بيرمي من [[onClick]]:

~~~text الشاشة بعد ما دوسنا Bomb
Dashboard OK
Bomb Save
~~~

~~~text الـ console
pageerror: Click failed
~~~

الصفحة متغيرتش والـ fallback مظهرش، والخطأ طلع uncaught. السبب: الـ boundary بيمسك الأخطاء اللي بتحصل **وقت الرسم** (وفي الـ effects)، و [[onClick]] بيشتغل بعد الرسم بكتير، لما المستخدم يدوس، فـ React مش في نص رسم ساعتها.

### الـ solCode: [[useErrorBoundary]]

~~~text SaveButton
const { showBoundary } = useErrorBoundary()
return <button onClick={() => { try { throw new Error('Click failed') } catch (e) { showBoundary(e) } }}>Save</button>
~~~

- [[try { ... } catch (e) { ... }]]: لو اللي جوه [[try]] رمى، الكود بيكمّل في [[catch]] والخطأ في [[e]].
- [[showBoundary(e)]]: بيسلّم الخطأ لأقرب boundary فوقه بإيدك.

جربناه برسالة [[Save failed]]:

~~~text الشاشة بعد Save
Save failed
Try again
~~~

و [[onError]] اتنادى برضه، والـ stack بيبدأ بـ [[SaveButton]].

### [[resetKeys]]: روح صفحة تانية

والـ boundary في حالة خطأ، دوسنا على Link لـ [[/other]]:

~~~text الشاشة بعد التنقل
Dashboard OK
Bomb Save
~~~

[[pathname]] اتغير من [[/]] لـ [[/other]]، فالـ boundary صفّر لوحده من غير ما حد يدوس Try again. من غيرها، المستخدم اللي حصله خطأ في صفحة هيفضل شايف الخطأ في كل صفحة يروحها تحت نفس الـ boundary.

---

## الخلاصة

| الموقف | بيتمسك؟ | الحل |
|---|---|---|
| [[throw]] وقت الرسم أو في effect | أيوه | الـ boundary لوحده |
| [[throw]] في [[onClick]] | لأ | [[try/catch]] و [[showBoundary(e)]] |
| خطأ في promise أو [[setTimeout]] | لأ | [[catch]] و [[showBoundary]] |
| المستخدم راح صفحة تانية | | [[resetKeys={[pathname]}]] |
| تبعت الخطأ للـ logging | | [[onError]] |

> الـ fallback للمستخدم: رسالة بسيطة وزرار. الـ stack والتفاصيل مكانها [[onError]]، مش الشاشة.`,
          lines: [
            "الـ component والـ type بتاع props الـ fallback.",
            "الشاشة اللي تظهر مكان الجزء اللي وقع.",
            "الخطأ ممكن يبقى أي حاجة اترمت، فاتأكد إنه Error.",
            "رسالة، و resetErrorBoundary بيحاول يرسم الأولاد تاني.",
            "قفلة.",
            "صفحة فيها جزء ممكن يقع.",
            "المسار الحالي.",
            "بداية الـ JSX.",
            "الـ fallback، وابعت الخطأ للـ logging، وصفّر لما المسار يتغير.",
            "الجزء المحمي.",
            "قفلة الـ boundary.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`لما الـ component يرمي وقت الرسم هتلاقي الرسالة وزرار Try again مكانه بس، وباقي الصفحة شغالة. Try again بيرسم الـ children تاني، فبنسبة 50% يرجع يشتغل وبنسبة 50% يوقع تاني. في التطوير هتلاقي الـ error برضه في الـ console مع إنه اتمسك، ودا طبيعي.

الـ error اللي في onClick مش بيوصل للـ boundary: الـ fallback مش بيظهر، والـ error بيطلع في الـ console بس كـ uncaught. الـ boundaries بتمسك أخطاء الرسم والـ lifecycle بس، مش الـ event handlers ولا الكود الـ async. عشان توصله للـ boundary، امسكه بـ try/catch وابعته بـ [[showBoundary]].`,
          solCode: R`import { useErrorBoundary } from 'react-error-boundary'

function Flaky() {
  if (Math.random() > 0.5) throw new Error('Render failed')
  return <p>Loaded</p>
}
function SaveButton() {
  const { showBoundary } = useErrorBoundary()
  return <button onClick={() => { try { throw new Error('Click failed') } catch (e) { showBoundary(e) } }}>Save</button>
}`
        },
        {
          cmd: "lazy و Suspense",
          title: "قسّم الـ bundle وحمّل الصفحة وقت ما تتفتح",
          desc: R`[[lazy(() => import('./pages/Reports'))]] بيحط كود الصفحة في ملف JS لوحده مبيتحمّلش غير أول مرة الـ component يترسم. و [[<Suspense fallback={...}>]] بيعرض حاجة مكانه لحد ما الملف يوصل.

كده أول تحميل للموقع أصغر وأسرع. وأنسب مكان للتقسيم الـ routes، والحاجات التقيلة اللي مش ظاهرة على طول: محرر، أو charts، أو modal كبير.`,
          example: R`import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'

const Reports = lazy(() => import('./pages/Reports'))
const routes = [{ path: 'reports', Component: Reports }]

function AppLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </>
  )
}`,
          try: R`اعمل [[npm run build]] قبل وبعد ما تخلي صفحة تقيلة (فيها recharts مثلًا) lazy، وقارن أحجام الملفات في [[dist/assets]]. وافتح Network وروح للصفحة: هتشوف ملف JS جديد بيتطلب ساعتها.`,
          flag: "script",
          deep: {
            why: R`من غير تقسيم، المستخدم اللي فاتح صفحة الدخول بينزّل كود لوحة الأدمن والتقارير والمحرر، يعني ميجات JS لازم تتحمّل وتتقري قبل ما الصفحة تشتغل، وده بيبان على موبايل بشبكة ضعيفة.`,
            how: R`[[import()]] الـ dynamic بيقول للـ bundler (Vite) «اعمل الملف ده chunk لوحده». و [[lazy]] بيرجّع component أول ما يترسم بيطلب الـ chunk، وطول ما هو مش جاهز بيعمل «suspend»: React بتوقف رسم الجزء ده وتدوّر على أقرب [[<Suspense>]] فوقه وتعرض الـ fallback. لما الملف يوصل، React ترسم تاني. والمرة الجاية الملف متكاش، فمفيش انتظار.

مكان الـ Suspense بيفرق: جوه الـ layout حوالين الـ Outlet معناه الـ header والـ sidebar فاضلين والجزء اللي في النص بس اللي بيستنى. ولما التنقل بيحصل جوه transition (الـ router بيعمل كده)، React بتسيب الصفحة القديمة ظاهرة لحد ما الجديدة تجهز بدل ما تعرض الـ fallback.

[[lazy]] محتاج default export. لو الملف فيه named export: [[lazy(() => import('./X').then(m => ({ default: m.Reports })))]]. وفي data mode بتاع React Router فيه [[lazy]] على الـ route نفسه، بيحمّل الـ component والـ loader مع بعض.

Suspense مش للـ lazy بس: [[use(promise)]]، و [[useSuspenseQuery]] في TanStack Query، و i18next وهو بيحمّل الترجمات، كلهم بيعملوا suspend لأقرب boundary.

وبعد deploy جديد، الـ chunks القديمة ممكن تتمسح، والمستخدم اللي فاتح الموقع من ساعة يطلب ملف مش موجود. error boundary يعرض «فيه تحديث، اعمل reload»، أو سيب الملفات القديمة كام يوم على السيرفر.`,
            when: "كل route تقريبًا، ومكتبات تقيلة بتظهر في مكان واحد (محرر نصوص، وخرائط، و charts).",
            mistakes: R`[[lazy]] جوه جسم component: بيتعمل component جديد كل render فالـ state بتروح. و Suspense واحد فوق خالص، فأي تحميل بيخفي الصفحة كلها. وفي مشروع حقيقي كانت كل الصفحات lazy (كويس) بس الـ Suspense فوق الـ providers والـ router كلهم، وصفحات الدخول متحمّلة عادي «عشان hydration issues» في SPA مفيهاش hydration أصلًا. وتقسيم كل component صغير لوحده: طلبات كتير على الفاضي.`
          },
          teach: R`## الفكرة: الصفحة التقيلة في ملف لوحدها، والـ layout يعرض حاجة مكانها لحد ما توصل

المثال ٣ حاجات: [[lazy]] بيحوّل صفحة [[Reports]] لـ chunk لوحده، و [[routes]] بيحطها في الـ router زي أي component، و [[AppLayout]] فيه [[<Suspense>]] حوالين المكان اللي الصفحة بتترسم فيه. اتشغّل في Vite 8.3 + React 19.3 + React Router 8.4 (بـ [[createBrowserRouter]])، وصفحة Reports فيها chart من recharts 3.10 عشان تبقى تقيلة. [[Header]] و [[PageSkeleton]] عملناهم إحنا: header فيه لينك، و skeleton بيكتب «Loading page...».

---

## ١. الـ imports

~~~text App.tsx
import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'
~~~

- [[lazy]]: دالة بتعمل component «كسلان»، كوده مش بيتحمّل غير أول مرة يترسم.
- [[Suspense]]: component بيحدد «لو حاجة تحتي لسه بتتحمّل، اعرض الـ fallback».
- [[Outlet]]: المكان اللي الـ router بيرسم فيه الصفحة الحالية جوه الـ layout.

## ٢. [[lazy(() => import('./pages/Reports'))]]

نفكّها من جوه لبرة:

### [[import('./pages/Reports')]]

[[import]] بأقواس، زي دالة، اسمه dynamic import. بيرجّع promise بتخلص لما الملف يتحمّل. والأهم: Vite لما يشوفه وقت الـ build بيفهم إن الملف ده ومكتباته يتحطوا في ملف JS منفصل (chunk). أما [[import Reports from ...]] العادي في أول الملف فبيحطه في الملف الأساسي.

### [[() => ...]]

دالة مش بتتنفذ دلوقتي. [[lazy]] بيحتفظ بيها، ومش بينادها غير أول مرة الـ component يترسم.

### [[const Reports = lazy(...)]]

[[Reports]] بقى component عادي تستخدمه في الـ JSX أو الـ routes. والملف [[pages/Reports]] لازم يعمل [[export default]]، لأن [[lazy]] بياخد الـ default.

## ٣. الـ route

~~~text App.tsx
const routes = [{ path: 'reports', Component: Reports }]
~~~

route عادي: المسار [[reports]] يرسم [[Reports]]. الـ router ميعرفش ولا يهمه إنه lazy. في التجربة حطيناه كـ child تحت route الـ layout:

~~~text App.tsx (من التجربة)
createBrowserRouter([{ path: '/', Component: AppLayout, children: [{ index: true, Component: Home }, ...routes] }])
~~~

[[...routes]] بيفرد عناصر الـ array جوه array الـ children.

---

## ٤. [[AppLayout]]

~~~text App.tsx
<>
  <Header />
  <Suspense fallback={<PageSkeleton />}>
    <Outlet />
  </Suspense>
</>
~~~

- [[<>...</>]]: Fragment، بيجمع عنصرين من غير ما يضيف div في الـ DOM.
- [[<Header />]] **برا** الـ Suspense، فبيفضل ظاهر وقت التحميل.
- [[fallback={<PageSkeleton />}]]: اللي يتعرض مكان [[<Outlet />]] طول ما الصفحة اللي جواه بتتحمّل.

لما [[Reports]] يترسم أول مرة وكوده لسه موصلش، بيعمل «suspend»: React بتوقف رسمه، وتطلع لفوق لحد أقرب [[<Suspense>]]، وتعرض الـ fallback بتاعه. ولما الملف يوصل، ترسم تاني.

---

## ٥. الـ build: قبل وبعد

### بـ [[import]] عادي

~~~text npm run build (Reports بـ import static)
dist/assets/index-Cw86rgYn.js  612.92 kB │ gzip: 187.65 kB
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
~~~

### بـ [[lazy]]

~~~text npm run build (Reports بـ lazy)
dist/assets/Reports-DWAkx-KX.js  299.83 kB │ gzip: 89.24 kB
dist/assets/index-ILT2UrLR.js    312.82 kB │ gzip: 98.71 kB
~~~

قراية الأرقام:

- [[kB]] الحجم بعد الـ minify، و [[gzip]] الحجم اللي بيتنقل فعلًا على الشبكة لو السيرفر بيضغط.
- [[index-*.js]] نزل من حوالي 613kB لـ 313kB: ده كود React و React Router والتطبيق. الـ 300kB التانيين (recharts أساسًا) راحوا لـ [[Reports-*.js]].
- الحروف العشوائية بعد الاسم ([[DWAkx-KX]]) hash من محتوى الملف: لو الكود اتغير الاسم يتغير، فالمتصفح ميستخدمش نسخة قديمة من الكاش.
- الـ warning اختفى، لأن مفيش chunk بقى أكبر من 500kB.

---

## ٦. في المتصفح

شغّلنا [[vite preview]] على الـ build، وأخّرنا ملف Reports عمدًا عشان نشوف اللي بيحصل.

### فتح [[/reports]] على طول

~~~text الطلبات والشاشة
   50ms GET /assets/index-ILT2UrLR.js
  117ms GET /assets/Reports-DWAkx-KX.js
  413ms Shop Reports | Loading page...
 1295ms Shop Reports | Reports  Jan  Feb  Mar ...
~~~

الـ header ظهر، ومكان الصفحة «Loading page...» لحد ما الـ chunk وصل.

### من الصفحة الرئيسية ودوسة على اللينك

~~~text الطلبات والشاشة
   93ms GET /assets/index-ILT2UrLR.js
  668ms Shop Reports | Home
  943ms GET /assets/Reports-DWAkx-KX.js      (بعد الضغط على Reports)
  998ms Shop Reports | Home
 1852ms Shop Reports | Reports  Jan  Feb  Mar ...
~~~

حاجتين مهمين:

1. ملف [[Reports-*.js]] مطلبش خالص وانت في Home. اتطلب لحظة الضغط بس.
2. وقت التحميل الشاشة فضلت على «Home»، مش «Loading page...». ده لأن الـ router بيعمل التنقل جوه transition ([[startTransition]])، و React في الحالة دي بتسيب الصفحة القديمة ظاهرة لحد ما الجديدة تجهز بدل ما تخفيها بـ skeleton. الـ fallback بيظهر لما مفيش صفحة قديمة تتساب (أول تحميل).

ولما رجعنا Home ورجعنا Reports تاني بـ back و forward: مفيش طلب جديد، الملف اتحمّل مرة واحدة.

---

## الخلاصة

| الخطوة | الكود | النتيجة |
|---|---|---|
| افصل الصفحة | [[lazy(() => import('./pages/X'))]] | chunk لوحده في [[dist/assets]] |
| استخدمها | [[{ path: 'x', Component: X }]] | زي أي component |
| حدد الانتظار فين | [[<Suspense fallback={...}>]] حوالين [[<Outlet />]] | الـ header يفضل، والنص بس يستنى |

> import واحد عادي ([[import X from]]) لنفس الملف في أي مكان تاني في التطبيق بيرجّعه للـ bundle الأساسي، والتقسيم بيضيع.`,
          lines: [
            "lazy و Suspense من React.",
            "Outlet مكان الصفحة.",
            "الصفحة في chunk لوحدها، مبيتحمّلش غير لما تترسم.",
            "بتتحط في الـ routes زي أي component.",
            "الـ layout.",
            "بداية الـ JSX.",
            "Fragment.",
            "الـ header برا الـ Suspense، فبيفضل ظاهر وقت التحميل.",
            "حدود الانتظار: skeleton مكان الصفحة لحد ما الـ chunk يوصل.",
            "الصفحة الحالية.",
            "قفلة الـ Suspense.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`قبل: ملف JS واحد كبير. لما جربنا صفحة فيها recharts بـ import عادي طلع [[index-*.js]] حوالي 520kB (158kB gzip) و Vite طلّع warning إن الـ chunk أكبر من 500kB. بعد [[lazy]]: [[index-*.js]] حوالي 222kB و [[Reports-*.js]] لوحده حوالي 300kB. الأرقام عندك هتختلف، بس الفكرة إن تحميل أول صفحة بقى أخف بحجم الصفحة التقيلة.

في Network لما تروح للصفحة هتلاقي [[Reports-*.js]] بيتطلب ساعتها بس، والـ skeleton بيظهر لحظة. لو ملقيتش ملف منفصل، غالبًا الصفحة لسه معمولها import عادي في ملف تاني (import واحد static كفاية يرجّعها للـ bundle الأساسي)، أو الملف مفيهوش [[export default]].`
        },
        {
          cmd: "createPortal",
          title: "ارسم modal أو tooltip برا مكانه في الـ DOM",
          desc: R`[[createPortal(jsx, document.body)]] بيرسم الـ JSX في عنصر DOM تاني، بس الـ component بيفضل في مكانه في شجرة React: بيقرا نفس الـ context، والـ events بتطلع لأبوه في React. ده الحل لـ tooltip أو dropdown أو toast بيتقص بسبب [[overflow: hidden]] أو [[z-index]] عند الأب.

وللـ modal نفسه، أسهل طريقة accessible هي [[<dialog>]] مع [[showModal()]]: بيحبس الـ focus جواه، و Escape بيقفله، والخلفية بتبقى inert لوحدها.`,
          example: R`import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (open && dialog && !dialog.open) dialog.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])
  return createPortal(
    <dialog ref={ref} onClose={onClose} aria-label={title}>
      {children}<button onClick={onClose}>Close</button>
    </dialog>,
    document.body
  )
}`,
          try: R`افتح الـ modal من جوه div عليه [[overflow: hidden]] و [[transform]]، وشوف في Elements إن الـ dialog في آخر body. دوس Tab كذا مرة: الـ focus مش بيخرج برا. ودوس Escape وتأكد إن الـ state بقت false.`,
          flag: "script",
          deep: {
            why: "الـ modal منطقيًا تبع الزرار اللي فتحه (بيقرا نفس البيانات والـ context)، بس بصريًا لازم يبقى فوق كل حاجة. لو اترسم جوه card عليها overflow hidden، هيتقص. والـ modal المعمول بـ div بيحتاج شغل كتير عشان يبقى شغال بالكيبورد.",
            how: R`[[createPortal(children, node)]] بيقول لـ React «الأولاد دول مكانهم في الشجرة هنا، بس حطهم في الـ DOM جوه node». فالـ context شغال عادي، وأي event جوه الـ portal بيطلع (bubble) لأبو الـ component في React حتى لو في الـ DOM مش جواه. يعني [[onClick]] على div بيلف الزرار اللي فتح الـ modal هيتنادى لما تدوس جوه الـ modal. ده بيفاجئ ناس كتير.

[[showModal()]] بيحط الـ dialog في الـ top layer بتاع المتصفح: فوق أي z-index ومش بيتقص بـ overflow، والباقي بيبقى inert (مفيش click ولا focus)، و Escape بيقفله (event اسمه cancel وبعده close)، ولما يتقفل المتصفح بيرجّع الـ focus للعنصر اللي كان عليه. و [[::backdrop]] في CSS للخلفية. بصراحة، مع showModal الـ portal مش ضروري للـ dialog نفسه، بس بيفضل مفيد لأي overlay تاني (tooltip و dropdown و toast) مالوش top layer.

الـ effect بيزامن prop [[open]] مع حالة الـ dialog الحقيقية (DOM برا React). و [[onClose]] بيخلي Escape يرجّع الـ state لـ false، فالاتنين ميختلفوش.

وفي SSR (Next.js) مفيش [[document]] على السيرفر، فالـ portal لازم يترسم بعد ما الصفحة تشتغل في المتصفح.`,
            when: "Modals و dialogs للتأكيد، و tooltips و dropdowns جوه containers بتقص، و toasts في ركن الشاشة.",
            mistakes: R`modal بـ div من غير focus trap: المستخدم بالكيبورد بيعمل Tab ويروح للصفحة ورا. و state بتقول مفتوح والـ dialog اتقفل بـ Escape (نسيت onClose). وحروب z-index: 9999 و 99999. ونسيان إن الـ events بتطلع للأب في React: stopPropagation لو ده بيعمل مشكلة.`
          },
          teach: R`## الفكرة: الـ component مكانه هنا، والـ DOM بتاعه هناك

المثال component واحد اسمه [[Modal]]: الأب بيتحكم فيه بـ [[open]] و [[onClose]]، وهو بيرسم [[<dialog>]] جوه [[document.body]] بـ [[createPortal]]، ويفتحه بـ [[showModal()]]. اتشغّل في Vite + React 19.3 في Chrome headless: حطينا الـ Modal جوه div عليه [[overflow: hidden]] و [[transform]] وعرضه 200px وطوله 40px (يعني أي حاجة جواه هتتقص)، وجنبه زرار Delete بيفتحه، وزرار تاني برا اسمه «Page button».

---

## ١. الـ imports

~~~text Modal.tsx
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
~~~

- [[useRef]]: عشان نمسك عنصر الـ [[<dialog>]] الحقيقي في الـ DOM وننادي عليه دوال.
- [[ReactNode]]: الـ type بتاع أي حاجة ينفع تترسم (نص، JSX، array، null). ده نوع [[children]].
- [[createPortal]] من [[react-dom]] مش [[react]]، لأنه خاص بالـ DOM.

## ٢. الـ props

~~~text Modal.tsx
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
~~~

| الـ prop | النوع | ليه |
|---|---|---|
| [[open]] | [[boolean]] | الأب بيقول مفتوح ولا لأ |
| [[onClose]] | [[() => void]] | دالة من غير arguments ومش بترجّع حاجة: الـ Modal بينادها لما يتقفل |
| [[title]] | [[string]] | اسم الـ dialog لقارئ الشاشة |
| [[children]] | [[ReactNode]] | المحتوى |

يعني الـ state في الأب، والـ Modal «controlled» (الأب هو اللي بيقرر).

## ٣. الـ ref

~~~text Modal.tsx
const ref = useRef<HTMLDialogElement>(null)
~~~

[[<HTMLDialogElement>]] بيقول لـ TypeScript إن الـ ref هيشاور على [[<dialog>]]، فيعرف إن عليه [[showModal()]] و [[close()]] و [[open]]. وبيبدأ [[null]] لحد ما React ترسم العنصر.

---

## ٤. الـ effect: زامن [[open]] مع الـ dialog

~~~text Modal.tsx
useEffect(() => {
  const dialog = ref.current
  if (open && dialog && !dialog.open) dialog.showModal()
  if (!open && dialog?.open) dialog.close()
}, [open])
~~~

الـ [[<dialog>]] عنده حالة جوه المتصفح (مفتوح ولا مقفول) و React مش بتتحكم فيها. الـ effect بيخلي الحالة دي تمشي ورا [[open]]:

- [[open && dialog && !dialog.open]]: لازم يتفتح، والعنصر موجود، ومش مفتوح أصلًا. جربنا في Chrome: [[showModal()]] مرتين ورا بعض مش بيعمل حاجة، بس لو الـ dialog مفتوح بـ [[show()]] العادي بيرمي [[InvalidStateError]] («already open as a non-modal dialog»)، فالشرط بيحمي من الحالة دي.
- [[dialog?.open]]: [[?.]] معناها «لو dialog مش null اقرا open، غير كده undefined».
- [[[open]]]: الـ effect يتعاد لما [[open]] بس يتغير.

### [[showModal()]] بيعمل إيه؟

قبل الفتح وبعده:

~~~text Chrome headless
قبل:   dialog.open = false
بعد:   dialog.open = true    matches(':modal') = true
~~~

[[:modal]] معناها إن الـ dialog اتحط في الـ **top layer**: طبقة فوق الصفحة كلها، مش بيأثر عليها z-index ولا overflow، وكل اللي ورا بيبقى inert (مش بيستقبل click ولا focus). جربنا ندوس على «Page button» والـ modal مفتوح:

~~~text Playwright
click #before: blocked
~~~

---

## ٥. [[createPortal(jsx, document.body)]]

~~~text Modal.tsx
return createPortal(
  <dialog ref={ref} onClose={onClose} aria-label={title}>
    {children}<button onClick={onClose}>Close</button>
  </dialog>,
  document.body
)
~~~

- أول argument: الـ JSX اللي هيترسم.
- تاني argument: عنصر DOM هيترسم **جواه**. هنا [[document.body]].
- [[onClose={onClose}]]: الـ dialog بيطلع event اسمه [[close]] كل ما يتقفل بأي طريقة (زرار، أو Escape، أو [[close()]])، فالأب يعرف دايمًا.
- [[aria-label={title}]]: الاسم اللي قارئ الشاشة بيقوله لما الـ dialog يفتح.

اللي حصل في الـ DOM:

~~~text Chrome headless
dialog parent = BODY
body children: DIV#root, SCRIPT, DIALOG
~~~

الـ dialog آخر حاجة في [[body]]، مش جوه الـ div اللي عليه [[overflow: hidden]]، مع إن الـ component مكتوب جواه في الـ JSX. ومقاسه 146×109px، يعني أكبر من الـ div الصغير وما اتقصّش.

---

## ٦. حاجتين بيفاجئوا

### الـ events بتطلع للأب في React، مش في الـ DOM

حطينا [[onClick]] على الـ div اللي حوالين الـ Modal بيطبع سطر. ودوسنا على زرار «Yes» **جوه** الـ modal:

~~~text الـ console
card onClick (React parent) fired
~~~

في الـ DOM الزرار مش جوه الـ div خالص، بس React بتطلّع الـ event على شجرة الـ components بتاعتها، والـ Modal ابن الـ div هناك. لو ده عامل مشكلة: [[e.stopPropagation()]] جوه الـ modal.

### الـ focus والكيبورد

[[showModal()]] حط الـ focus على أول زرار جوه. ودوسنا Tab ست مرات:

~~~text الـ focus بعد كل Tab
BUTTON (Close) -> BODY -> yes -> BUTTON (Close) -> BODY -> yes
~~~

الـ focus بيلف على زرارين الـ dialog، و [[BODY]] معناها إنه راح لشريط المتصفح نفسه، ورجع. عمره ما وصل لـ «Page button» اللي ورا.

### Escape

~~~text بعد Escape
console: onClose
dialog.open = false    open عند الأب = false    الـ focus على: openBtn
~~~

المتصفح قفل الـ dialog، وبعت [[close]]، فـ [[onClose]] اتنادى والأب خلّى [[open]] بـ false، فالاتنين متطابقين. والـ focus رجع لزرار Delete اللي فتحه، من غير ولا سطر كود مننا.

---

## الخلاصة

| المشكلة | الحل في المثال |
|---|---|
| الـ modal بيتقص أو تحت حاجة | [[showModal()]] (top layer)، و [[createPortal]] لأي overlay تاني |
| الـ focus بيهرب للصفحة | [[showModal()]] بيخلي الباقي inert |
| Escape قفله والـ state لسه true | [[onClose]] على الـ [[<dialog>]] |
| [[open]] اتغير والـ dialog لأ | effect بيزامنهم بـ [[showModal]] و [[close]] |

> الـ portal بيغيّر مكان الـ DOM بس. الـ context والـ events لسه ماشيين على شجرة React.`,
          lines: [
            "hooks والـ type.",
            "createPortal من react-dom.",
            "modal بيتحكم فيه الأب بـ open و onClose.",
            "ref للـ dialog.",
            "زامن open مع حالة الـ dialog الحقيقية:",
            "العنصر.",
            "لازم يتفتح ومش مفتوح: showModal (top layer، و focus جواه، و Escape).",
            "لازم يتقفل وهو مفتوح: اقفله.",
            "يتعاد لما open يتغير.",
            "ارسمه في body بدل مكانه:",
            "onClose بيتنادى مع Escape كمان، فالأب يعرف. و aria-label عشان قارئ الشاشة يقول اسمه.",
            "المحتوى وزرار قفل.",
            "قفلة الـ dialog.",
            "المكان في الـ DOM.",
            "قفلة createPortal.",
            "قفلة."
          ],
          sol: R`في Elements هتلاقي [[<dialog>]] آخر حاجة في [[body]] مش جوه الـ div، فالـ [[overflow: hidden]] والـ [[transform]] مش بيقصّوه. وبما إن [[showModal()]] بيحطه في الـ top layer، باقي الصفحة بتبقى inert: Tab بيلف على الزراير اللي جوه الـ dialog (وممكن يروح لشريط المتصفح) بس عمره ما يوصل لعنصر في الصفحة ورا.

Escape بيقفل الـ dialog، والـ [[close]] event بينادي [[onClose]]، ففي React DevTools هتلاقي [[open]] عند الأب بقت [[false]]. لو قفل بـ Escape والـ state فضلت true، يبقى onClose مش متوصّل، والمرة الجاية [[open]] مش هتتغير فالـ effect مش هيشتغل والـ modal مش هيفتح. ولو Tab خرج للصفحة، يبقى استخدمت [[show()]] بدل [[showModal()]].`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "اختبر الكومبوننت زي ما المستخدم بيستخدمه: Vitest و Testing Library و user-event، و API وهمي بـ MSW",
      items: [
        {
          cmd: "Vitest + Testing Library",
          title: "أول اختبار لكومبوننت: ارسمه، ودوّر عليه، واتأكد",
          desc: R`اختبار الكومبوننت بيعمل تلات حاجات: يرسمه في DOM وهمي ([[jsdom]] أو [[happy-dom]] جوه Node)، ويدوّر على العناصر زي ما المستخدم بيشوفها ([[screen.getByRole('button', { name: 'Increment' })]])، ويتأكد من النتيجة ([[toBeInTheDocument]] و [[toHaveTextContent]]).

الأدوات: Vitest بيشغّل الاختبارات ويفهم إعدادات Vite نفسها، و [[@testing-library/react]] بيرسم ويدّيك [[screen]]، و [[@testing-library/jest-dom]] بيضيف matchers للـ DOM. أوامر [[vitest]] نفسها (watch و run و coverage) في تاب «فحص الكود».`,
          example: R`// npm i -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] } })
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
afterEach(() => cleanup())
// src/components/Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Counter } from './Counter'
it('starts at the given number and increments on click', () => {
  render(<Counter start={5} />)
  expect(screen.getByText('Count: 5')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
  expect(screen.getByText('Count: 6')).toBeInTheDocument()
})`,
          try: R`في مشروع الـ lab اعمل [[Counter]] بياخد [[start]] ويعرض [[Count: {count}]] وزرار Increment. ركّب الأدوات، واعمل الملفات التلاتة، وضيف [[scripts.test: "vitest"]]، وشغّل [[npm test]]. بعدين غيّر النص في الكومبوننت لـ [[Total: ]] واقرا رسالة الفشل: Testing Library بيطبع الـ DOM كله عشان تشوف إيه اللي اترسم فعلًا.`,
          flag: "script",
          deep: {
            why: R`الـ components بتتغير كل يوم: refactor، أو مكتبة جديدة، أو حد بيصلّح bug في مكان ويكسر مكان. اختبار بيرسم الكومبوننت ويضغط عليه بيقولك في ثواني إن «الزرار لسه بيزوّد» من غير ما تفتح المتصفح. وفي الـ take-home assignments، الاختبارات من أول الحاجات اللي المراجع بيدوّر عليها.`,
            how: R`Vitest بيشغّل كل ملف [[*.test.tsx]] في Node. [[environment: 'jsdom']] بيعمل [[window]] و [[document]] وهميين (مفيش رسم حقيقي ولا layout: أحجام العناصر كلها صفر). و [[happy-dom]] بديل أسرع بس أقل اكتمالًا، والاتنين بيتركّبوا لوحدهم كـ package. وبيقرا [[vite.config]] أو [[vitest.config.ts]]، فالـ aliases والـ plugin بتاع React شغالين من غير إعداد تاني.

[[render(<Counter />)]] بيعمل root جديد في [[document.body]] ويرسم فيه، و [[screen]] بيدوّر في [[document.body]] كله. و [[fireEvent.click]] بيبعت event واحد بس (الدرس الجاي بعد الجاي فيه user-event الأدق). و React Testing Library بيلف الـ render والـ events في [[act()]] لوحده، فالتحديثات بتتطبق قبل السطر اللي بعده.

ملف الـ setup بيتنفذ قبل كل ملف اختبار: [[@testing-library/jest-dom/vitest]] بيضيف [[toBeInTheDocument]] و [[toHaveValue]] و [[toBeDisabled]] و [[toHaveAttribute]] لـ expect. و [[cleanup()]] بيشيل اللي اترسم بعد كل اختبار: Testing Library بيعمل ده لوحده لو [[globals: true]]، ومن غيرها لازم تكتبه، وإلا عناصر الاختبار الأول هتفضل موجودة في التاني وتلاقي «Found multiple elements».

ولو هتستخدم [[describe]] و [[it]] من غير import، ضيف [[globals: true]] في الـ config و [["types": ["vitest/globals", "@testing-library/jest-dom"]]] في tsconfig.`,
            when: R`أي component فيه منطق: شروط عرض، أو فورم، أو حالات loading و error، أو حسابات. الكومبوننت اللي بيعرض props وخلاص ممكن ميستاهلش. وابدأ بالأجزاء اللي لو باظت هتكلّف فلوس (الـ checkout، والتسجيل، والصلاحيات).`,
            mistakes: R`تختبر تفاصيل التنفيذ: قيمة state جوه الكومبوننت أو اسم دالة داخلية، فأي refactor يكسر الاختبار والسلوك لسه صح. وتنسى [[environment: 'jsdom']] فتاخد [[document is not defined]]. وتنسى ملف الـ setup فـ [[toBeInTheDocument]] مش موجودة. و [[container.querySelector('.btn-primary')]] بدل [[getByRole]]: الكلاس بيتغير مع كل تعديل ديزاين. وتفتكر إن jsdom بيرسم: أي حاجة معتمدة على الأحجام (virtual lists، و charts، و IntersectionObserver) مش هتشتغل فيه، ودي مكانها اختبار في متصفح حقيقي.`
          },
          teach: R`## الفكرة: ٣ ملفات، وكل اختبار ٣ خطوات

المثال فيه ٣ ملفات ورا بعض: إعداد Vitest ([[vitest.config.ts]])، وملف بيتنفذ قبل الاختبارات ([[src/test/setup.ts]])، والاختبار نفسه ([[Counter.test.tsx]]). والكومبوننت [[Counter]] موجود في الـ solCode. اتشغّل في مشروع Vite + React 19.3 بـ Vitest 5.0 و jsdom 30 و @testing-library/react 16.3 و @testing-library/jest-dom 7.0، على ويندوز.

---

## ١. التركيب: [[npm i -D ...]]

~~~powershell
npm i -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
~~~

[[-D]] = [[--save-dev]]: المكتبات دي بتتسجّل في [[devDependencies]]، يعني للتطوير بس ومش بتدخل في الموقع اللي بيتنشر.

| المكتبة | دورها |
|---|---|
| [[vitest]] | بيلاقي ملفات الاختبار ويشغّلها ويطبع النتيجة |
| [[jsdom]] | متصفح «وهمي» مكتوب بـ JavaScript: فيه [[document]] و [[window]] جوه Node |
| [[@testing-library/react]] | [[render]] و [[screen]] و [[fireEvent]] |
| [[@testing-library/dom]] | الأساس اللي react بيعتمد عليه (لازم يتركّب معاه) |
| [[@testing-library/jest-dom]] | matchers زي [[toBeInTheDocument]] |
| [[@testing-library/user-event]] | للدرس بعد الجاي |

---

## ٢. [[vitest.config.ts]]

~~~text vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] } })
~~~

- [[defineConfig]] من [[vitest/config]] (مش من [[vite]]): نفس دالة Vite بس TypeScript بيعرف فيها خانة [[test]].
- [[plugins: [react()]]]: نفس الـ plugin بتاع Vite، عشان JSX يتحوّل صح.
- [[environment: 'jsdom']]: شغّل الاختبارات جوه DOM وهمي. الافتراضي [[node]]، ومفيهوش [[document]].
- [[setupFiles]]: ملفات تتنفذ قبل كل ملف اختبار.

جربنا نشغّل نفس الاختبار بـ [[--environment node]]:

~~~text الناتج
× starts at the given number and increments on click
ReferenceError: document is not defined
~~~

## ٣. [[setup.ts]]

~~~text src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
afterEach(() => cleanup())
~~~

- السطر الأول import من غير أسماء: بيشغّل ملف بيضيف matchers جديدة لـ [[expect]] بتاع Vitest. من غيره:

~~~text الناتج (من غير setupFiles)
× starts at the given number and increments on click
Error: Invalid Chai property: toBeInTheDocument
~~~

Chai هي مكتبة الـ assertions اللي جوه [[expect]] بتاع Vitest، وبتقولك إنها متعرفش الـ matcher ده.

- [[afterEach(() => cleanup())]]: بعد كل اختبار ([[it]]) شيل كل اللي [[render]] رسمه. عملنا ملف فيه اختبارين كل واحد بيرسم Counter، من غير الـ cleanup:

~~~text الناتج (من غير cleanup)
× second
TestingLibraryElementError: Found multiple elements with the role "button"
~~~

الـ Counter بتاع الاختبار الأول لسه في الـ DOM، فبقى فيه زرارين.

---

## ٤. الاختبار سطر سطر

~~~text Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Counter } from './Counter'
~~~

- [[render]]: يرسم component في [[document.body]].
- [[screen]]: object فيه دوال بحث بتدوّر في [[document.body]] كله.
- [[fireEvent]]: يبعت event للعنصر.
- [[it(name, fn)]]: اختبار واحد. الاسم جملة بتوصف السلوك، وهي اللي بتظهر في الناتج.
- [[expect(x)]]: «اتأكد إن x ...»، وبعده الـ matcher.

~~~text Counter.test.tsx
render(<Counter start={5} />)
~~~

**الخطوة ١: ارسم.** نفس الـ JSX اللي هتكتبه في التطبيق.

~~~text Counter.test.tsx
expect(screen.getByText('Count: 5')).toBeInTheDocument()
~~~

**الخطوة ٢: دوّر واتأكد.** [[getByText]] بيدوّر على عنصر النص بتاعه كله «Count: 5». ولو ملقاش بيرمي error على طول، فالاختبار يفشل هنا. و [[toBeInTheDocument()]] بيتأكد إنه جوه الصفحة.

> في الـ DOM الـ [[<p>]] ده فيه text nodes اتنين: «Count: » و «5» (لأن [[{count}]] حتة لوحدها في JSX). [[getByText]] بيقارن بالنص الكامل للعنصر، فبيلاقيه عادي.

~~~text Counter.test.tsx
fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
expect(screen.getByText('Count: 6')).toBeInTheDocument()
~~~

**الخطوة ٣: اعمل حاجة واتأكد من النتيجة.** [[getByRole('button', { name: 'Increment' })]] يعني «زرار اسمه Increment»، زي ما المستخدم أو قارئ الشاشة يشوفه. [[fireEvent.click]] بيدوسه، و Testing Library بيستنى React تطبّق التحديث قبل السطر اللي بعده، فالنص بقى 6.

---

## ٥. التشغيل

~~~powershell
npx vitest run src/components/Counter.test.tsx --reporter=verbose
~~~

[[run]]: شغّل مرة واحدة واخرج (من غيرها [[vitest]] بيفضل شغال ويعيد مع كل حفظ: watch). و [[--reporter=verbose]]: اعرض كل اختبار باسمه.

~~~text الناتج
 ✓ src/components/Counter.test.tsx > starts at the given number and increments on click 118ms
 Test Files  1 passed (1)
      Tests  1 passed (1)
   Duration  1.26s (environment 69%, setup 15%, tests 11%, transform 4%, import 1%)
~~~

اللي يلفت النظر في [[Duration]]: ٦٩٪ من الوقت راح في تجهيز jsdom، والاختبار نفسه ١١٪.

### لما الاختبار يفشل

غيّرنا النص في الكومبوننت لـ [[Total: ]]:

~~~text الناتج
 FAIL  src/components/Counter.test.tsx > starts at the given number and increments on click
TestingLibraryElementError: Unable to find an element with the text: Count: 5. ...
<body>
  <div>
    <div>
      <p>
        Total:
        5
      </p>
      <button>
        Increment
      </button>
    </div>
  </div>
</body>
 ❯ src/components/Counter.test.tsx:6:17
      6|   expect(screen.getByText('Count: 5')).toBeInTheDocument()
       |                 ^
~~~

Testing Library طبع الـ DOM اللي اترسم فعلًا، و Vitest شاور على السطر اللي فشل. الـ [[<div>]] الخارجي ده اللي [[render]] عمله وحط الكومبوننت جواه.

---

## ٦. الـ solCode

[[Counter]] نفسه: [[useState(start)]] بقيمة أولى من الـ prop، و [[{ start = 0 }]] معناها لو الـ prop مجاش خده 0، و [[start?: number]] الـ [[?]] معناها إن الـ prop اختياري. و [[setCount(c => c + 1)]] بياخد القيمة الحالية ويزوّدها.

وفي [[package.json]]: [["test": "vitest"]] بيخلي [[npm test]] يشغّله في وضع watch، و [["test:run": "vitest run"]] للـ CI.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| ارسم | [[render(<Counter start={5} />)]] |
| دوّر زي المستخدم | [[screen.getByRole('button', { name: 'Increment' })]] و [[getByText]] |
| اعمل حاجة | [[fireEvent.click(...)]] |
| اتأكد | [[expect(...).toBeInTheDocument()]] |

| الخطأ | السبب |
|---|---|
| [[document is not defined]] | [[environment: 'jsdom']] ناقصة |
| [[Invalid Chai property: toBeInTheDocument]] | ملف الـ setup مش متسجّل أو ناقصه import الـ jest-dom |
| [[Found multiple elements]] بين اختبارين | الـ cleanup ناقص |`,
          lines: [
            "defineConfig من vitest/config عشان خانة test تتعرف.",
            "نفس plugin الـ React اللي في Vite.",
            "DOM وهمي، وملف يتنفذ قبل كل ملف اختبار.",
            "matchers زي toBeInTheDocument.",
            "cleanup بيشيل اللي اترسم.",
            "hooks بتاعة vitest.",
            "بعد كل اختبار ابدأ من DOM فاضي.",
            "render يرسم، و screen يدوّر، و fireEvent يبعت event.",
            "it و expect.",
            "الكومبوننت اللي بنختبره.",
            "اسم الاختبار جملة بتوصف السلوك.",
            "ارسمه ببداية 5.",
            "اتأكد إن النص ظاهر.",
            "لاقي الزرار بدوره واسمه، واضغطه.",
            "النص اتغير.",
            "قفلة."
          ],
          sol: R`[[npm test]] المفروض يطبع ملف واحد واختبار واحد passed، ويفضل شغال (watch). لما تغيّر النص لـ [[Total:]]، الاختبار بيفشل بـ «Unable to find an element with the text: Count: 5» وتحته الـ DOM اللي اترسم فعلًا ([[<p>Total: 5</p>]])، فتعرف على طول هل المشكلة في الكومبوننت ولا في الاختبار.

لو شفت «document is not defined» فالـ environment ناقصة. ولو «Invalid Chai property: toBeInTheDocument» فالـ setup file مش متسجّل أو مش بيعمل import لـ [[jest-dom/vitest]].`,
          solCode: R`// src/components/Counter.tsx
import { useState } from 'react'

export function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
// package.json
// "scripts": { "test": "vitest", "test:run": "vitest run" }`
        },
        {
          cmd: "getByRole و findBy",
          title: "دوّر على العناصر زي المستخدم، واستنى البيانات اللي جاية من السيرفر",
          desc: R`Testing Library بيدّيك تلات عائلات: [[getBy*]] بيرجّع العنصر أو يرمي error فورًا، و [[queryBy*]] بيرجّع [[null]] لو مش موجود (عشان تتأكد إن حاجة مش ظاهرة)، و [[findBy*]] بيرجّع promise بتستنى لحد ما العنصر يظهر (افتراضيًا لحد ثانية). وكل واحدة ليها [[All]] للأكتر من عنصر.

والترتيب اللي تدوّر بيه: [[ByRole]] بالاسم ([[{ name: 'Save' }]]) أولًا، وبعدين [[ByLabelText]] للخانات، وبعدين [[ByText]]، و [[ByTestId]] آخر حل. و [[waitFor(() => expect(...))]] لما تستنى حاجة مش عنصر (دالة اتنادت مثلًا).`,
          example: R`import { screen, waitFor } from '@testing-library/react'
import { it, expect, vi } from 'vitest'

it('shows products from the API', async () => {
  renderWithProviders(<Products />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByRole('link', { name: 'Mug' })).toHaveAttribute('href', '/products/1')
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
it('reports the view once', async () => {
  const track = vi.fn()
  renderWithProviders(<Products onLoaded={track} />)
  await waitFor(() => expect(track).toHaveBeenCalledWith(2))
})`,
          try: R`خد [[Products]] من درس useQuery (بيعرض Loading وبعدين [[<li><Link>]] لكل منتج). اكتب الاختبار الأول، وبعدين غيّر [[findByRole]] لـ [[getByRole]] واقرا الخطأ. وبعدين افتح [[screen.logTestingPlaygroundURL()]] أو [[screen.debug()]] جوه الاختبار وشوف الـ roles المتاحة. (الـ wrapper والـ API الوهمي في الدرسين الجايين، فممكن تأجّل التشغيل لحد ما تخلصهم.)`,
          flag: "script",
          deep: {
            why: R`المستخدم مبيعرفش class ولا id: بيشوف زرار اسمه «Save» وخانة جنبها «Email». لما الاختبار بيدوّر بنفس الطريقة، بيفضل شغال مع أي تغيير في الشكل، وبيفشل لو الزرار فعلًا اختفى أو اتغير اسمه. وكمان [[getByRole]] بيختبر الـ accessibility ببلاش: لو مش لاقي الزرار بالاسم، قارئ الشاشة كمان مش هيلاقيه.`,
            how: R`[[getByRole('button', { name: 'Save' })]] بيحسب الـ accessibility tree زي المتصفح: الـ role من العنصر نفسه ([[<button>]] يبقى button، و [[<a href>]] يبقى link، و [[<li>]] يبقى listitem، و [[<input type="checkbox">]] يبقى checkbox، و [[<h1>]] يبقى heading)، والاسم من النص أو الـ label أو [[aria-label]]. والـ name ممكن يبقى regex: [[{ name: /save/i }]].

[[findBy]] = [[waitFor]] + [[getBy]]: بيجرّب كل ٥٠ms لحد ما يلاقي أو يعدّي الـ timeout (ثانية افتراضيًا، وتقدر تغيّرها في التالت argument). ده اللي بتحتاجه مع أي حاجة async: fetch، أو lazy component، أو setTimeout. أما [[getBy]] بعد الـ fetch على طول فبيفشل لأن البيانات لسه موصلتش.

[[queryBy]] مع [[not.toBeInTheDocument()]] للتأكد إن حاجة مش موجودة، لأن getBy هيرمي قبل ما يوصل للـ expect. ولو عايز تستنى حاجة تختفي: [[waitForElementToBeRemoved(() => screen.queryByText('Loading...'))]].

[[waitFor]] بيعيد الدالة لحد ما متترميش، فجواه expect واحد بس ومفيش side effects (متدوسش زرار جوه waitFor، هيدوس كذا مرة).

و [[within(row).getByRole('cell')]] بيدوّر جوه عنصر معين، مفيد في الجداول والـ lists.`,
            when: R`في كل اختبار. ابدأ دايمًا بـ ByRole، ولو مش لاقي role مناسب اسأل نفسك الأول: هل العنصر ده accessible أصلًا؟ و ByTestId لحاجات مالهاش أي معنى للمستخدم (container لـ chart مثلًا).`,
            mistakes: R`[[getBy]] بعد عملية async فيفشل «Unable to find». و [[await waitFor(() => screen.getByText(...))]] بدل [[findByText]]: شغال بس أطول. و [[findBy]] من غير await: الاختبار بيعدّي وهو مجرّبش حاجة. و [[expect(screen.getByText('x')).toBeNull()]]: getBy رمى خلاص، الصح queryBy. و [[data-testid]] على كل حاجة. و [[act()]] بإيدك حوالين render أو fireEvent: Testing Library بيعملها لوحده، ولو شفت warning بتاع act فغالبًا فيه تحديث async انت مش مستنيه بـ findBy.`
          },
          teach: R`## الفكرة: ٣ عائلات بحث، وكل واحدة ليها موقف

المثال اختبارين لـ component اسمه [[Products]]: بيعرض «Loading...»، وبعدين بيجيب المنتجات من [[/api/products]] ويعرض كل واحد [[<li>]] جواه [[<Link>]]، وبينادي [[onLoaded(عددهم)]] لو اتبعتله. اتشغّل في Vitest 5.0 + jsdom + Testing Library 16.3، بـ [[renderWithProviders]] من الدرس الجاي والـ API الوهمي من درس MSW (بيرد بعد 50ms بـ Mug و T-shirt).

---

## ١. الـ imports

~~~text Products.test.tsx
import { screen, waitFor } from '@testing-library/react'
import { it, expect, vi } from 'vitest'
~~~

- [[waitFor]]: يعيد دالة لحد ما متترميش.
- [[vi]]: الـ object اللي فيه أدوات Vitest: دوال وهمية ([[vi.fn]])، و timers وهمية، و mocks.

## ٢. العائلات التلاتة

| البداية | لو لقى | لو ملقاش | امتى |
|---|---|---|---|
| [[getBy...]] | العنصر | يرمي error فورًا | العنصر لازم يكون موجود دلوقتي |
| [[queryBy...]] | العنصر | [[null]] | عايز تتأكد إن حاجة **مش** موجودة |
| [[findBy...]] | promise بالعنصر | الـ promise تترفض بعد ثانية | العنصر هيظهر بعد شوية (fetch، lazy) |

وكل واحدة ليها نسخة [[All]] ([[getAllBy]] وهكذا) بترجّع array لو فيه أكتر من عنصر. جربنا على حاجة مش موجودة:

~~~text الناتج
queryBy: null
getBy threw: Unable to find an element with the text: Nope. ...
~~~

---

## ٣. الاختبار الأول سطر سطر

~~~text Products.test.tsx
it('shows products from the API', async () => {
  renderWithProviders(<Products />)
~~~

[[async]] قبل الدالة عشان جواها [[await]]. والرسم بالـ providers لأن [[Products]] بيستخدم [[useQuery]] و [[Link]].

~~~text Products.test.tsx
  expect(screen.getByText('Loading...')).toBeInTheDocument()
~~~

أول لحظة بعد الرسم الطلب لسه رايح، فـ «Loading...» موجودة **دلوقتي**، فـ [[getBy]] صح هنا.

~~~text Products.test.tsx
  expect(await screen.findByRole('link', { name: 'Mug' })).toHaveAttribute('href', '/products/1')
~~~

نفكّها من جوه:

1. [[findByRole('link', { name: 'Mug' })]]: دوّر على عنصر الـ role بتاعه [[link]] واسمه «Mug». الـ role بيتحسب من نوع العنصر: [[<a href>]] يبقى link، و [[<button>]] يبقى button، و [[<li>]] يبقى listitem. والاسم من النص اللي جواه.
2. [[await]]: [[findBy]] بيرجّع promise، فبنستنى. هو بيعيد البحث كل شوية (كل 50ms، وأقصى حاجة ثانية، حسب docs Testing Library) لحد ما يلاقي.
3. [[toHaveAttribute('href', '/products/1')]]: matcher من jest-dom بيتأكد من قيمة attribute.

~~~text Products.test.tsx
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
~~~

- بعد ما Mug ظهر، الباقي موجود، فـ [[getAllByRole]] بيرجّع array و [[toHaveLength(2)]] بيعدّها.
- [[queryBy]] مع [[.not]]: «Loading...» اختفت. لو كتبت [[getByText('Loading...')]] هنا هيرمي قبل ما يوصل للـ expect.

## ٤. الاختبار التاني: [[vi.fn]] و [[waitFor]]

~~~text Products.test.tsx
const track = vi.fn()
renderWithProviders(<Products onLoaded={track} />)
await waitFor(() => expect(track).toHaveBeenCalledWith(2))
~~~

- [[vi.fn()]]: دالة وهمية مش بتعمل حاجة، بس بتسجّل كل مرة اتنادت وبإيه.
- [[toHaveBeenCalledWith(2)]]: اتنادت مرة على الأقل بـ 2.
- [[waitFor(() => ...)]]: بيعيد الدالة لحد ما الـ expect جواها يعدّي أو الوقت يخلص. هنا مش بندوّر على عنصر، بندوّر على «حاجة حصلت»، عشان كده waitFor مش findBy.

---

## ٥. اللي حصل

~~~text npx vitest run --reporter=verbose
 ✓ src/components/Products.test.tsx > shows products from the API 373ms
 ✓ src/components/Products.test.tsx > reports the view once 101ms
      Tests  2 passed (2)
~~~

### لو استخدمت [[getByRole]] بدل [[findByRole]]

~~~text الناتج
× getBy too early
TestingLibraryElementError: Unable to find an accessible element with the role "link" and name "Mug"
Here are the accessible roles:
  paragraph:
  Name "":
  <p />
<body>
  <div>
    <p>
      Loading...
    </p>
  </div>
</body>
~~~

الرسالة بتقولك الـ roles الموجودة فعلًا: [[paragraph]] واحد بس (الـ [[<p>]] بتاع Loading)، لأن الـ fetch لسه مخلصش.

### [[screen.debug()]] و [[logTestingPlaygroundURL()]] (الـ solCode)

بعد ما استنينا Mug:

~~~text screen.debug()
<body>
  <div>
    <ul>
      <li>
        <a
          data-discover="true"
          href="/products/1"
        >
          Mug
        </a>
      </li>
      <li>
        ...T-shirt...
      </li>
    </ul>
  </div>
</body>
~~~

~~~text logTestingPlaygroundURL()
Open this URL in your browser
https://testing-playground.com/#markup=DwEwlgbgfMCuA2N5hgQwAQAs...
~~~

[[debug]] بيطبع الـ DOM الحالي، واللينك بيفتح موقع فيه نفس الـ DOM، ولما تدوس على عنصر يقترح أحسن query ليه. و [[data-discover]] attribute بيحطه React Router على اللينكات، ملوش علاقة بالاختبار.

---

## الخلاصة

| الموقف | استخدم |
|---|---|
| العنصر موجود دلوقتي | [[getByRole(...)]] |
| العنصر هيظهر بعد fetch | [[await findByRole(...)]] |
| اتأكد إن حاجة مش موجودة | [[expect(queryBy...(...)).not.toBeInTheDocument()]] |
| استنى حاجة مش عنصر (دالة اتنادت) | [[await waitFor(() => expect(...))]] |
| مش عارف تدوّر إزاي | [[screen.debug()]] و [[logTestingPlaygroundURL()]] |

> ترتيب الأفضلية: [[ByRole]]، وبعدين [[ByLabelText]]، وبعدين [[ByText]]، و [[ByTestId]] آخر حل.`,
          lines: [
            "screen للبحث، و waitFor للانتظار.",
            "it و expect و vi للـ mock functions.",
            "اختبار بيجيب بيانات.",
            "ارسم بالـ providers (الدرس الجاي).",
            "أول لحظة: مفيش بيانات، فـ getBy على Loading شغال.",
            "استنى لحد ما لينك اسمه Mug يظهر، واتأكد من الـ href.",
            "بعد ما ظهر، الباقي موجود: getAllBy بيرجّع array.",
            "queryBy عشان نتأكد إن Loading اختفت من غير ما يرمي.",
            "قفلة.",
            "اختبار بيستنى دالة تتنادى.",
            "دالة وهمية بتسجّل كل نداء.",
            "ارسم وابعتها.",
            "waitFor بيعيد الـ expect لحد ما يعدّي أو الوقت يخلص.",
            "قفلة."
          ],
          sol: R`مع [[findByRole]] الاختبار بيعدّي. مع [[getByRole]] بيفشل فورًا بـ «Unable to find an accessible element with the role "link" and name "Mug"» وتحته قايمة الـ roles الموجودة: هتلاقي بس [[paragraph]] أو النص «Loading...»، لأن الـ fetch لسه مخلصش.

[[screen.debug()]] بيطبع الـ DOM الحالي، و [[logTestingPlaygroundURL()]] بيطبع لينك لموقع بيقترح أحسن query لكل عنصر. لو الـ link مش ظاهر كـ role «link»، اتأكد إنه [[<a href>]] مش [[<a>]] من غير href (ده مالوش role link).`,
          solCode: R`it('shows products from the API', async () => {
  renderWithProviders(<Products />)
  screen.debug()
  expect(await screen.findByRole('link', { name: 'Mug' })).toHaveAttribute('href', '/products/1')
  screen.logTestingPlaygroundURL()
})`
        },
        {
          cmd: "user-event",
          title: "اكتب واضغط وابعت فورم في الاختبار زي مستخدم حقيقي",
          desc: R`[[@testing-library/user-event]] بيحاكي التفاعل كامل: [[user.type(input, 'hello')]] بيعمل focus وبعدين keydown و keypress و input و keyup لكل حرف، و [[user.click]] بيعمل pointerdown و mousedown و focus و mouseup و click، زي المتصفح بالظبط. [[fireEvent]] بيبعت event واحد بس، فحاجات كتير (زي validation على blur، أو submit بالـ Enter) مش بتحصل معاه.

الشكل: [[const user = userEvent.setup()]] في أول الاختبار، وكل نداء عليه [[await]].`,
          example: R`import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, expect, vi } from 'vitest'
import { SignupForm } from './SignupForm'

it('shows validation errors and does not submit', async () => {
  const user = userEvent.setup()
  const onDone = vi.fn()
  render(<SignupForm onDone={onDone} />)
  await user.type(screen.getByLabelText('Email'), 'not-an-email')
  await user.type(screen.getByLabelText('Password'), '123')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))
  expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  expect(screen.getByText('At least 8 characters')).toBeInTheDocument()
  expect(onDone).not.toHaveBeenCalled()
})
it('shows the server error under the email field', async () => {
  const user = userEvent.setup()
  render(<SignupForm onDone={vi.fn()} />)
  await user.type(screen.getByLabelText('Email'), 'taken@example.com')
  await user.type(screen.getByLabelText('Password'), 'secret123{Enter}')
  expect(await screen.findByRole('alert')).toHaveTextContent('Email already registered')
  expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
})`,
          try: R`اعمل [[SignupForm]] بـ react-hook-form و zod (الإيميل والباسورد، و [[<label htmlFor>]] لكل خانة، وبيبعت لـ [[/api/signup]] ويعمل setError من [[fieldErrors]] زي درس «zod مشتركة مع الـ API»). اكتب الاختبارين دول، وضيف تالت بيسجّل إيميل جديد ويتأكد إن [[onDone]] اتنادت. (الـ API الوهمي اللي بيرجّع 409 في درس MSW.)`,
          flag: "script",
          deep: {
            why: R`الفورمات أكتر مكان بيتكسر في أي تطبيق وأكتر مكان بيتعمله take-home. والاختبار اللي بيكتب في الخانات ويدوس Submit بيغطي كل حاجة مع بعض: الـ labels مربوطة صح، والـ validation بيشتغل، والرسايل بتظهر، والطلب بيتبعت، وأخطاء السيرفر بتتعرض. لو refactor بوّظ أي حتة منهم، الاختبار هيقولك.`,
            how: R`[[userEvent.setup()]] بيعمل «جلسة» مستخدم واحدة: الكيبورد والماوس والـ clipboard متشاركين بين النداءات، فلو ضغطت Shift في نداء بيفضل مضغوط في اللي بعده. وكل الدوال async لأنها بتستنى بين الأحداث (زي المتصفح)، فمن غير [[await]] الحروف بتتكتب بعد ما الاختبار خلص.

[[user.type(el, 'text')]] بيدوس على العنصر الأول (focus) وبعدين يكتب. والأقواس المعووجة أوامر خاصة: [[{Enter}]] و [[{Tab}]] و [[{Backspace}]] و [[{Shift>}A{/Shift}]]، فلو محتاج تكتب [[{]] نفسها اكتبها [[{{]]. و [[user.clear(el)]] يفضّي الخانة، و [[user.selectOptions(select, 'value')]] للـ select، و [[user.upload(input, file)]] للملفات، و [[user.keyboard('{Escape}')]] من غير عنصر، و [[user.tab()]] للتنقل بالكيبورد (بيختبر ترتيب الـ focus).

[[getByLabelText('Email')]] بيلاقي الخانة عن طريق [[<label htmlFor="email">]] أو [[aria-label]] أو [[aria-labelledby]]. لو مش لاقيها، يبقى الـ label مش مربوط، وده bug accessibility حقيقي مش مشكلة في الاختبار.

و [[vi.fn()]] دالة وهمية بتسجّل كل نداء، فتقدر تسأل [[toHaveBeenCalledWith({...})]] أو [[not.toHaveBeenCalled()]]. ولأن handleSubmit بتاع RHF async، استخدم [[await vi.waitFor(() => expect(onDone).toHaveBeenCalledOnce())]] أو استنى عنصر يظهر.`,
            when: R`أي تفاعل: فورمات، و dropdowns، و modals (Escape وقفل)، و tabs بالكيبورد. واستخدم fireEvent بس لـ events مالهاش مقابل عند user-event (scroll مثلًا).`,
            mistakes: R`تنسى [[await]] قبل [[user.type]]: الاختبار يعدّي أو يفشل عشوائي. و [[userEvent.type]] مباشرة من غير setup: شغال بس النسخة القديمة من الـ API. و [[fireEvent.change(input, { target: { value: 'x' } })]] لفورم RHF فيه [[mode: 'onBlur']]: مفيش blur فمفيش validation. وخانة من غير label فتلجأ لـ [[getByPlaceholderText]]: صلّح الـ label. و fake timers مع user-event من غير [[userEvent.setup({ advanceTimers: vi.advanceTimersByTime })]]: الاختبار بيعلق.`
          },
          teach: R`## الفكرة: «مستخدم» بيكتب ويدوس، والاختبار بيشوف النتيجة

المثال اختبارين لفورم تسجيل [[SignupForm]]: الأول بيكتب بيانات غلط ويتأكد إن رسايل الـ validation ظهرت والفورم متبعتش، والتاني بيكتب إيميل مسجّل قبل كده ويتأكد إن خطأ السيرفر ظهر تحت الخانة. اتشغّل في Vitest 5.0 + jsdom + user-event 14.6. والفورم عملناه زي ما الـ try بيقول: react-hook-form 7.89 و zod 4.6، و [[<label htmlFor>]] لكل خانة، والرسايل [[<p role="alert">]]، والـ submit بيبعت لـ [[/api/signup]] اللي MSW بيرد عليه (409 لـ [[taken@example.com]]).

---

## ١. الـ imports

~~~text SignupForm.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, expect, vi } from 'vitest'
import { SignupForm } from './SignupForm'
~~~

[[userEvent]] default export (من غير أقواس [[{ }]]). وهنا [[render]] العادي كفاية، لأن الفورم مش محتاج providers.

## ٢. الفرق بين [[user-event]] و [[fireEvent]]

سجلنا الـ events اللي بتوصل لخانة input في الحالتين:

~~~text الـ events اللي وصلت
user.type(el, 'a'):           pointerdown mousedown focus pointerup mouseup click keydown keypress beforeinput input keyup
fireEvent.change + click:     change click
~~~

[[user.type]] عمل اللي المتصفح بيعمله لما حد بيدوس على الخانة ويكتب حرف: ١١ event. و [[fireEvent]] بعت بالظبط اللي طلبته وبس، من غير focus ومن غير كيبورد. فأي كود معتمد على [[focus]] أو [[blur]] أو [[keydown]] (زي validation على blur، أو Enter يبعت الفورم) مش هيشتغل مع [[fireEvent]].

---

## ٣. الاختبار الأول سطر سطر

~~~text SignupForm.test.tsx
const user = userEvent.setup()
const onDone = vi.fn()
render(<SignupForm onDone={onDone} />)
~~~

- [[userEvent.setup()]]: «جلسة» مستخدم واحد. الكيبورد والماوس متشاركين بين كل النداءات.
- [[vi.fn()]]: دالة وهمية مكان اللي المفروض يحصل بعد التسجيل، عشان نسأل بعدين «اتنادت ولا لأ؟».

~~~text SignupForm.test.tsx
await user.type(screen.getByLabelText('Email'), 'not-an-email')
await user.type(screen.getByLabelText('Password'), '123')
await user.click(screen.getByRole('button', { name: 'Sign up' }))
~~~

- [[getByLabelText('Email')]]: الخانة اللي الـ label بتاعها «Email». بيلاقيها عن طريق [[htmlFor]] على الـ label اللي بيطابق [[id]] الخانة.
- [[user.type(el, text)]]: يدوس على الخانة ويكتب حرف حرف.
- [[await]] قبل كل واحدة: لأن كلها async. جربنا من غير await:

~~~text الناتج
value right after (no await): ""
~~~

الخانة لسه فاضية، لأن الكتابة لسه شغالة لما السطر اللي بعده اتنفذ.

~~~text SignupForm.test.tsx
expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
expect(screen.getByText('At least 8 characters')).toBeInTheDocument()
expect(onDone).not.toHaveBeenCalled()
~~~

- الـ validation في react-hook-form async، فأول رسالة بـ [[findByText]] (استنى). التانية بتظهر في نفس اللحظة، فـ [[getByText]] كفاية.
- [[not.toHaveBeenCalled()]]: الفورم متبعتش.

## ٤. الاختبار التاني

~~~text SignupForm.test.tsx
await user.type(screen.getByLabelText('Email'), 'taken@example.com')
await user.type(screen.getByLabelText('Password'), 'secret123{Enter}')
~~~

[[{Enter}]] جوه النص مش بيتكتب حروف: الأقواس المعووجة في [[user.type]] معناها «دوس الزرار ده». و Enter جوه خانة في فورم بيبعت الفورم، زي المتصفح. يعني من غير ما ندوس Sign up.

~~~text SignupForm.test.tsx
expect(await screen.findByRole('alert')).toHaveTextContent('Email already registered')
expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
~~~

- [[findByRole('alert')]]: الرسالة بتظهر بعد ما رد السيرفر يوصل، فلازم نستنى.
- [[toHaveTextContent]]: النص اللي جوه العنصر فيه الجملة دي.
- [[aria-invalid="true"]]: الخانة متعلّمة إنها غلط، عشان قارئ الشاشة يقول كده.

---

## ٥. اللي حصل

~~~text npx vitest run --reporter=verbose
 ✓ shows validation errors and does not submit 671ms
 ✓ shows the server error under the email field 607ms
 ✓ calls onDone after a successful signup 392ms
      Tests  3 passed (3)
~~~

التالت هو اختبار الـ solCode: إيميل جديد، فـ MSW بيرد 201، و [[onDone]] بتتنادى.

### الـ solCode: [[vi.waitFor]]

~~~text SignupForm.test.tsx
await vi.waitFor(() => expect(onDone).toHaveBeenCalledOnce())
~~~

الـ submit بيستنى fetch، فـ [[onDone]] مش بتتنادى لحظة الضغط. [[vi.waitFor]] (نسخة Vitest من [[waitFor]]) بيعيد الـ expect لحد ما يعدّي. و [[toHaveBeenCalledOnce()]] مرة واحدة بالظبط، مش مرتين.

### لو الـ label مش مربوط

عملنا [[<label>Email</label><input />]] من غير [[htmlFor]] و [[id]]:

~~~text الناتج
Found a label with the text of: Email, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.
~~~

الاختبار مسك bug حقيقي: قارئ الشاشة كمان مش هيعرف إن الخانة دي اسمها Email.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| جلسة مستخدم | [[const user = userEvent.setup()]] في أول كل اختبار |
| تكتب | [[await user.type(el, 'text')]] |
| Enter أو Tab أو Escape | [[{Enter}]] جوه النص، أو [[user.keyboard('{Escape}')]] |
| تدوس | [[await user.click(el)]] |
| الخانة | [[getByLabelText('Email')]] |
| تتأكد إن دالة اتنادت | [[vi.fn()]] و [[toHaveBeenCalled]] |

> [[await]] قبل كل نداء على [[user]]. من غيرها الاختبار بيعدّي أو يفشل بالصدفة.`,
          lines: [
            "الرسم والبحث.",
            "user-event.",
            "أدوات الاختبار.",
            "الفورم اللي بنختبره.",
            "اختبار الـ validation.",
            "جلسة مستخدم.",
            "دالة وهمية مكان اللي بيحصل بعد النجاح.",
            "ارسم.",
            "اكتب في الخانة اللي الـ label بتاعها Email، حرف حرف.",
            "باسورد قصير.",
            "دوس الزرار.",
            "الرسالة بتظهر بعد validation async، فـ findBy.",
            "والتانية ظهرت معاها.",
            "والطلب متبعتش.",
            "قفلة.",
            "اختبار خطأ السيرفر.",
            "جلسة جديدة.",
            "ارسم.",
            "إيميل الـ API الوهمي بيرفضه.",
            "باسورد سليم، و {Enter} بيبعت الفورم من الكيبورد.",
            "رسالة السيرفر ظهرت كـ alert.",
            "والخانة متعلّمة غلط لقارئ الشاشة.",
            "قفلة."
          ],
          sol: R`التلات اختبارات بيعدّوا. التالت بيكتب إيميل جديد وباسورد سليم ويدوس Sign up، والـ API الوهمي بيرجّع 201، فـ [[onDone]] بتتنادى مرة واحدة. ولأن الإرسال async، [[expect(onDone).toHaveBeenCalled()]] على طول بعد الـ click هيفشل، ولازم تستنى.

لو [[getByLabelText('Email')]] فشل بـ «Found a label with the text of: Email, however no form control was found associated to that label»، الـ [[htmlFor]] مش مطابق للـ [[id]]. ولو الاختبار التاني فشل بـ «Unable to find role alert»، اتأكد إن الـ API الوهمي شغال وإن رسالة الخطأ عليها [[role="alert"]].`,
          solCode: R`it('calls onDone after a successful signup', async () => {
  const user = userEvent.setup()
  const onDone = vi.fn()
  render(<SignupForm onDone={onDone} />)
  await user.type(screen.getByLabelText('Email'), 'new@example.com')
  await user.type(screen.getByLabelText('Password'), 'secret123')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))
  await vi.waitFor(() => expect(onDone).toHaveBeenCalledOnce())
})

// الخانة في الفورم:
// <label htmlFor="email">Email</label>
// <input id="email" type="email" aria-invalid={!!errors.email} {...register('email')} />
// {errors.email && <p role="alert">{errors.email.message}</p>}`
        },
        {
          cmd: "wrapper بالـ providers",
          title: "اختبر component بيستخدم React Query و Router",
          desc: R`أغلب الـ components الحقيقية مش بتشتغل لوحدها: بتستخدم [[useQuery]] (محتاجة QueryClientProvider)، و [[Link]] أو [[useParams]] (محتاجة router)، و [[useTranslation]]، و Redux. لو رسمتها عادي هتاخد «No QueryClient set». الحل دالة [[renderWithProviders]] مرة واحدة في [[src/test/utils.tsx]] بتلف أي component بكل الـ providers، وبتعمل QueryClient جديد لكل اختبار.`,
          example: R`// src/test/utils.tsx
import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </QueryClientProvider>
  )
  return { queryClient, ...render(ui, { wrapper: Wrapper }) }
}`,
          try: R`اعمل الملف ده، واختبر [[Products]] من درس useQuery (اللي بيعرض [[<Link to={$__bt/products/$__{p.id}$__bt}>]]). بعدين اختبر صفحة بتقرا [[useParams]]: ارسمها جوه [[<Routes><Route path="/products/:id" element={<ProductPage />} /></Routes>]] بـ [[route: '/products/7']] واتأكد إنها بتعرض 7. وأخيرًا شيل [[retry: false]] واعمل الـ API يرجّع 500: شوف الاختبار بياخد قد إيه.`,
          flag: "script",
          deep: {
            why: R`من غير wrapper مشترك، كل ملف اختبار بيكرر ١٠ سطور providers، وأول ما تضيف provider جديد للتطبيق (ثيم أو i18n) لازم تعدّل كل الاختبارات. ومن غير QueryClient جديد لكل اختبار، الكاش بيعدّي من اختبار للتاني: الاختبار التاني يلاقي البيانات جاهزة من الأول، فيعدّي لوحده ويفشل لما تشغّله مع غيره أو بترتيب تاني.`,
            how: R`[[render(ui, { wrapper })]] بيلف الـ ui بالـ Wrapper، وكمان [[rerender]] بتلف بنفسه. وبترجّع الـ queryClient مع نتيجة render عشان الاختبار يقدر يبص في الكاش ([[queryClient.getQueryData(...)]]) أو يحط بيانات جاهزة قبل الرسم ([[setQueryData]]).

[[retry: false]] ضروري: الافتراضي ٣ محاولات بتأخير بيزيد (حوالي ٧ ثواني)، فاختبار حالة الخطأ هيعدّي الـ timeout بتاع findBy (ثانية) ويفشل. وممكن كمان [[gcTime: Infinity]] عشان Vitest ميفضلش مستني timers بعد الاختبار.

[[MemoryRouter]] router بيحفظ الـ history في الذاكرة بدل الـ URL الحقيقي، و [[initialEntries]] بيحدد إنت فين. ولو الـ component بيقرا [[useParams]]، لازم يبقى جوه [[<Route path="/products/:id">]]، لأن الـ params بتيجي من مطابقة الـ route مش من الـ URL لوحده. ولو بتستخدم data mode (loaders)، [[createMemoryRouter(routes, { initialEntries })]] مع [[<RouterProvider>]] بيختبر الـ loaders كمان.

والـ providers التانية بنفس الطريقة: [[<Provider store={makeStore()}>]] لـ Redux (store جديد لكل اختبار، عشان كده [[makeStore]] دالة مش store واحد)، و [[<I18nextProvider>]] بـ instance للاختبار، والثيم.`,
            when: R`أول ما تختبر أي component بيستخدم hook من مكتبة محتاجة provider. واعمله من أول اختبار، مش لما يبقى عندك ٣٠ ملف.`,
            mistakes: R`QueryClient واحد متعرّف برا الدالة ومشترك بين كل الاختبارات. و retry شغال فاختبارات الـ error بتاخد ثواني أو تفشل. و [[BrowserRouter]] في الاختبار: بيقرا [[window.location]] الحقيقي بتاع jsdom وبيسيب أثر بين الاختبارات. و component بيقرا useParams مرسوم من غير Route فالـ id بيبقى undefined. و mock لـ [[useQuery]] نفسه بـ [[vi.mock]]: بيختبر إنك ناديت الـ hook بس، مش إن الـ component بيعرض البيانات صح. الأحسن provider حقيقي و API وهمي (الدرس الجاي).`
          },
          teach: R`## الفكرة: دالة واحدة بتلف أي component بكل اللي محتاجه

المثال ملف واحد [[src/test/utils.tsx]] فيه دالة [[renderWithProviders]]: بتعمل QueryClient جديد، وبتلف الـ component في [[QueryClientProvider]] و [[MemoryRouter]]، وترسمه. اتشغّل في Vitest 5.0 + jsdom + TanStack Query 5.104 + React Router 8.4، مع [[Products]] من الدرس اللي فات والـ API الوهمي من درس MSW.

---

## ١. ليه أصلًا؟

رسمنا [[Products]] بـ [[render]] العادي من غير wrapper:

~~~text الناتج
No QueryClient set, use QueryClientProvider to set one
~~~

[[useQuery]] بيدوّر على QueryClient في الـ context، وملقاش. ونفس الكلام لـ [[Link]] من غير router.

---

## ٢. الـ imports

~~~text src/test/utils.tsx
import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
~~~

- [[import type]]: types بس، بيتشالوا بعد الـ build. [[ReactElement]] نوع JSX جاهز زي [[<Products />]]، و [[ReactNode]] أي حاجة تترسم (نوع [[children]]).
- [[MemoryRouter]]: router بيحفظ الـ history في متغير في الذاكرة، مش في شريط العنوان. مناسب للاختبار لأن مفيش شريط عنوان أصلًا، وكل اختبار بيبدأ نضيف.

## ٣. توقيع الدالة

~~~text src/test/utils.tsx
export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
~~~

- [[ui]]: الـ component اللي هنختبره.
- [[{ route = '/' } = {}]]: argument تاني اختياري. لو اتبعت object خد منه [[route]]، ولو [[route]] مش فيه خده [[/]]، ولو الـ object كله مجاش ([[= {}]]) اعتبره فاضي. يعني تقدر تنادي [[renderWithProviders(<X />)]] أو [[renderWithProviders(<X />, { route: '/products/7' })]].

## ٤. QueryClient جديد

~~~text src/test/utils.tsx
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
~~~

- جوه الدالة، فكل نداء (كل اختبار) ليه client جديد بكاش فاضي. لو كان برا الدالة، بيانات اختبار هتفضل في الكاش للاختبار اللي بعده.
- [[retry: false]]: لو الطلب فشل، متحاولش تاني. ليه مهم؟ جربنا API بيرجّع 500 بالاتنين:

~~~text الناتج
retry: false     الـ alert ظهر بعد 26 ms
retry الافتراضي  findByRole فشل بعد 1010 ms: Unable to find role="alert"
retry الافتراضي  الـ alert ظهر بعد 7054 ms (لما زوّدنا الـ timeout لـ 10 ثواني)
~~~

الافتراضي ٣ محاولات زيادة، والانتظار بينهم بيتضاعف: ثانية، وبعدين ٢، وبعدين ٤. المجموع حوالي ٧ ثواني، وده اللي ظهر. و [[findBy]] بيستنى ثانية بس، فاختبار حالة الخطأ بيفشل.

## ٥. الـ Wrapper

~~~text src/test/utils.tsx
const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  </QueryClientProvider>
)
~~~

component عادي بياخد [[children]] ويلفهم. و [[initialEntries={[route]}]] array بالصفحات اللي في الـ history، وآخرها هي الحالية. احنا بنحط صفحة واحدة: المسار اللي الاختبار عايزه.

## ٦. الرسم والـ return

~~~text src/test/utils.tsx
return { queryClient, ...render(ui, { wrapper: Wrapper }) }
~~~

- [[render(ui, { wrapper: Wrapper })]]: Testing Library بيلف [[ui]] في [[Wrapper]] لوحده.
- [[...render(...)]]: بيفرد كل اللي [[render]] بيرجّعه ([[container]] و [[rerender]] و [[unmount]] ...) في الـ object، ومعاهم [[queryClient]].

استخدمنا الـ [[queryClient]] اللي رجع بعد ما المنتجات ظهرت:

~~~text الناتج
queryClient.getQueryData(['products'])  →  [{"id":1,"name":"Mug"},{"id":2,"name":"T-shirt"}]
~~~

فتقدر تتأكد من الكاش نفسه، أو تحط فيه بيانات قبل الرسم بـ [[setQueryData]].

---

## ٧. الـ solCode: صفحة بتقرا [[useParams]]

~~~text ProductPage.test.tsx
function ProductPage() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}
~~~

[[useParams()]] بيرجّع الأجزاء المتغيرة من المسار، زي [[:id]].

~~~text ProductPage.test.tsx
renderWithProviders(
  <Routes><Route path="/products/:id" element={<ProductPage />} /></Routes>,
  { route: '/products/7' },
)
expect(screen.getByRole('heading')).toHaveTextContent('Product 7')
~~~

الـ router واقف على [[/products/7]]، والـ Route بيطابقه بـ [[/products/:id]]، فـ [[id]] = [["7"]]. و [[heading]] هو الـ role بتاع [[<h1>]]. الاختبار عدّى. ورسمنا نفس الصفحة **من غير** [[<Routes><Route>]]:

~~~text الناتج
textContent = "Product "
~~~

[[id]] طلع undefined، لأن الـ params بتيجي من مطابقة [[path="/products/:id"]]، مش من الـ URL لوحده. فأي component بيقرا [[useParams]] لازم يترسم جوه Route بالـ path.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| QueryClient **جوه** الدالة | كاش جديد لكل اختبار |
| [[retry: false]] | الخطأ يظهر في مللي ثواني بدل ٧ ثواني |
| [[MemoryRouter initialEntries={[route]}]] | تبدأ من أي صفحة من غير URL حقيقي |
| [[render(ui, { wrapper })]] | اللف بيحصل لوحده، حتى مع [[rerender]] |
| ترجّع [[queryClient]] | تبص في الكاش أو تجهزه |
| [[<Route path="/x/:id">]] حوالين الصفحة | عشان [[useParams]] يلاقي الـ id |`,
          lines: [
            "الأنواع.",
            "render الأصلي.",
            "React Query.",
            "router في الذاكرة للاختبارات.",
            "الدالة: الـ ui، والمسار اللي نبدأ منه.",
            "client جديد لكل اختبار، ومن غير retry عشان الأخطاء تظهر فورًا.",
            "الـ wrapper اللي بيلف أي component:",
            "React Query بره.",
            "والـ router جوه، واقف على المسار المطلوب.",
            "قفلة الـ provider.",
            "قفلة الـ Wrapper.",
            "ارسم بالـ wrapper، ورجّع الـ client كمان.",
            "قفلة."
          ],
          sol: R`اختبار Products بيعدّي، و [[findByRole('link', { name: 'Mug' })]] ليه [[href="/products/1"]]. اختبار الصفحة بـ [[route: '/products/7']] جوه Route بيعرض 7، ومن غير الـ Route هيعرض فاضي أو undefined.

من غير [[retry: false]] واختبار الـ 500: [[findByRole('alert')]] بيفشل بعد ثانية لأن Query لسه بيحاول، وحتى لو زوّدت الـ timeout الاختبار هياخد حوالي ٧ ثواني. رجّعها false تاني.`,
          solCode: R`import { Routes, Route, useParams } from 'react-router'

function ProductPage() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}
it('reads the id from the route', () => {
  renderWithProviders(
    <Routes><Route path="/products/:id" element={<ProductPage />} /></Routes>,
    { route: '/products/7' },
  )
  expect(screen.getByRole('heading')).toHaveTextContent('Product 7')
})`
        },
        {
          cmd: "MSW",
          title: "API وهمي على مستوى الشبكة للاختبارات وللتطوير",
          desc: R`Mock Service Worker بيمسك الطلبات بعد ما تطلع من الكود بتاعك وقبل ما توصل للشبكة، ويرد بالرد اللي انت كاتبه. الكود بتاعك (fetch أو axios أو React Query) مبيعرفش حاجة، فانت بتختبر نفس الكود اللي هيشتغل في الإنتاج.

بتكتب الـ handlers مرة واحدة ([[http.get('/api/products', () => HttpResponse.json([...]))]])، وتستخدمها في الاختبارات بـ [[setupServer]] من [[msw/node]]، وفي المتصفح وقت التطوير بـ [[setupWorker]] من [[msw/browser]] لو الـ backend لسه مجهزش.`,
          example: R`// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw'
export const handlers = [
  http.get('/api/products', async () => {
    await delay(50)
    return HttpResponse.json([{ id: 1, name: 'Mug' }, { id: 2, name: 'T-shirt' }])
  }),
  http.post('/api/signup', async ({ request }) => {
    const body = (await request.json()) as { email: string }
    if (body.email === 'taken@example.com') return HttpResponse.json({ fieldErrors: { email: ['Email already registered'] } }, { status: 409 })
    return HttpResponse.json({ id: 'u1' }, { status: 201 })
  }),
]
// src/mocks/node.ts
import { setupServer } from 'msw/node'
export const server = setupServer(...handlers)
// src/test/setup.ts
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => { cleanup(); server.resetHandlers() })
afterAll(() => server.close())
// في اختبار: غيّر الرد للاختبار ده بس
it('shows the error when the API fails', async () => {
  server.use(http.get('/api/products', () => new HttpResponse(null, { status: 500 })))
  renderWithProviders(<Products />)
  expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500')
})`,
          try: R`[[npm i -D msw]]، واعمل الملفات، وشغّل اختبارات الدروس اللي فاتت (Products و SignupForm) من غير أي API حقيقي. بعدين اطلب [[/api/orders]] من component مفيش ليه handler واقرا الخطأ. وأخيرًا شغّل MSW في المتصفح: [[npx msw init public]] وابدأ الـ worker في [[main.tsx]] لو [[import.meta.env.DEV]]، وافتح Network.`,
          flag: "script",
          deep: {
            why: R`الاختبار اللي بيكلم API حقيقي بطيء، وبيفشل لما السيرفر واقع أو الداتا اتغيرت، ومش بيعرف يختبر حالة الـ 500 أو الـ timeout. و [[vi.mock('./api')]] بيشيل كود الـ API من الاختبار خالص، فلو الـ URL غلط أو الـ headers ناقصة أو [[res.ok]] مش متفحوص، الاختبار هيعدّي. MSW في النص: كل الكود بتاعك بيشتغل، والشبكة بس هي اللي وهمية.`,
            how: R`في Node، [[setupServer]] بيعمل patch للـ fetch والـ http modules ([[@mswjs/interceptors]])، فأي طلب بيعدّي على الـ handlers بالترتيب، وأول واحد يطابق الـ method والـ path بيرد. و [[:id]] في المسار بيتقري من [[params]]، والـ query string من [[new URL(request.url).searchParams]]، والـ body من [[await request.json()]].

الدورة في الـ setup: [[listen()]] مرة قبل كل الاختبارات، و [[resetHandlers()]] بعد كل اختبار بيشيل أي [[server.use()]] اتضاف في الاختبار ده، فالتغيير ميعديش للاختبار اللي بعده، و [[close()]] في الآخر. و [[onUnhandledFrame: 'error']] بيخلي أي طلب مالوش handler يفشل هو نفسه (الـ fetch بيرمي [[TypeError: fetch failed]]) ويطبع [[[MSW] Error]] في الـ stderr، بدل ما يروح للشبكة بصمت. فالـ component بيروح لحالة الخطأ، والاختبار اللي مستني البيانات بيفشل.

[[server.use(...)]] بيضيف handlers في الأول فبتكسب على الأساسية: كده الملف الأساسي فيه الـ happy path، وكل اختبار بيغيّر اللي محتاجه (500، أو list فاضية، أو [[await delay('infinite')]] عشان يختبر الـ loading).

في المتصفح، [[npx msw init public]] بيحط [[mockServiceWorker.js]] في public، و [[setupWorker(...handlers).start()]] بيسجّل Service Worker بيمسك الطلبات، وهتشوفها في Network بعلامة إنها من الـ worker. استنى [[start()]] قبل [[createRoot().render]] عشان أول الطلبات متعدّيش.

الـ URLs النسبية ([[/api/products]]) شغالة في الاختبار لأن jsdom عنده [[location]] ([[http://localhost:3000]]). بس مكتبات بتعمل [[new Request('/api/...')]] بنفسها (زي [[fetchBaseQuery]] بتاع RTK Query) بتقع في Node بـ «Failed to parse URL»، والحل baseUrl كامل في الاختبار. والكود هنا متجرّب على msw 3 (نزلت آخر سبتمبر ٢٠٢٦)، والأساسيات دي نفسها في msw 2، ما عدا إن الخيار اسمه هناك [[onUnhandledRequest]]. في msw 3 الاسم ده بيتجاهل بصمت (فالطلب اللي مالوش handler بيطلع warning بس)، فلازم [[onUnhandledFrame]].`,
            when: R`أي اختبار لـ component بيجيب بيانات. وفي التطوير: الفرونت بيسبق الـ backend، أو عايز تشوف شكل الصفحة مع list فاضية أو خطأ، أو Storybook. ونفس الـ handlers تنفع في Playwright كمان.`,
            mistakes: R`تنسى [[resetHandlers]] فـ [[server.use]] بتاع اختبار الـ 500 يوقّع كل اللي بعده. ومفيش [[onUnhandledFrame: 'error']] فطلب لـ URL غلط بيعدّي بصمت ويفشل بعدين برسالة مش مفهومة. و handler بـ URL كامل ([[https://api.example.com/products]]) والكود بيطلب [[/api/products]]، فمفيش مطابقة. و [[vi.mock]] للـ fetch وفي نفس الوقت MSW. وتشغيل الـ worker في build الإنتاج لأن الشرط على [[DEV]] ناقص. وسؤال انترفيو: «بتعمل mock للـ API إزاي؟» الإجابة الكويسة: على مستوى الشبكة، عشان الاختبار يغطي طبقة الـ API client كمان.`
          },
          teach: R`## الفكرة: الـ handlers بتقول «لو حد طلب كذا، رد بكذا»

المثال ٤ أجزاء: ملف الـ handlers (الردود)، و [[node.ts]] اللي بيعمل server للاختبارات، والـ setup اللي بيشغّله ويقفله، واختبار بيغيّر الرد لنفسه بس. اتشغّل بـ msw 3.0 في Vitest 5.0 + jsdom (المثال مش كاتب الـ imports بتاعة [[setup.ts]]: [[beforeAll]] و [[afterEach]] و [[afterAll]] من [[vitest]]، و [[cleanup]]، و [[server]] من [[../mocks/node]]، و [[handlers]] في [[node.ts]]). والـ solCode اتشغّل في Chrome headless على Vite dev.

---

## ١. [[handlers.ts]]

~~~text src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw'
export const handlers = [
~~~

- [[http]]: فيه دالة لكل method: [[http.get]] و [[http.post]] و [[http.put]] و [[http.delete]].
- [[HttpResponse]]: بيبني الرد.
- [[delay]]: يستنى زي الشبكة.
- [[handlers]] array واحدة بتتشارك بين الاختبارات والمتصفح.

### GET

~~~text src/mocks/handlers.ts
http.get('/api/products', async () => {
  await delay(50)
  return HttpResponse.json([{ id: 1, name: 'Mug' }, { id: 2, name: 'T-shirt' }])
}),
~~~

أول argument المسار، والتاني الدالة اللي بترجّع الرد. [[delay(50)]] بيأخر 50ms عشان حالة «Loading...» تبقى موجودة لحظة ونقدر نختبرها. و [[HttpResponse.json(data)]] رد status 200 و [[Content-Type: application/json]].

### POST

~~~text src/mocks/handlers.ts
http.post('/api/signup', async ({ request }) => {
  const body = (await request.json()) as { email: string }
  if (body.email === 'taken@example.com') return HttpResponse.json({ fieldErrors: { email: ['Email already registered'] } }, { status: 409 })
  return HttpResponse.json({ id: 'u1' }, { status: 201 })
}),
~~~

- [[({ request })]]: الدالة بتاخد object فيه الطلب. [[request]] هو Request عادي زي بتاع المتصفح.
- [[await request.json()]]: اقرا الـ body كـ JSON. و [[as { email: string }]] بتقول لـ TypeScript شكله (مفيش فحص حقيقي، مجرد type).
- التاني argument في [[HttpResponse.json]] فيه [[status]]: 409 = Conflict (موجود قبل كده)، و 201 = Created.

نادينا الـ handler ده بـ fetch مباشرة من اختبار:

~~~text الناتج
taken: 409 {"fieldErrors":{"email":["Email already registered"]}}
new:   201 {"id":"u1"}
~~~

---

## ٢. [[node.ts]]

~~~text src/mocks/node.ts
import { setupServer } from 'msw/node'
export const server = setupServer(...handlers)
~~~

[[msw/node]]: نسخة Node. [[setupServer]] بياخد الـ handlers (الـ [[...]] بيفردهم arguments)، وبيرجّع server مش شغال لسه. «server» هنا مش سيرفر بيسمع على port: هو بيمسك الـ fetch جوه نفس الـ process.

## ٣. [[setup.ts]]: دورة حياة الـ server

~~~text src/test/setup.ts
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => { cleanup(); server.resetHandlers() })
afterAll(() => server.close())
~~~

| السطر | امتى | بيعمل إيه |
|---|---|---|
| [[beforeAll]] | مرة قبل أول اختبار في الملف | يبدأ يمسك الطلبات |
| [[afterEach]] | بعد كل اختبار | يمسح الـ DOM، ويشيل أي [[server.use]] اتضاف |
| [[afterAll]] | مرة بعد آخر اختبار | يبطّل يمسك |

### [[onUnhandledFrame: 'error']]

يعني «لو طلب ملهوش handler، اعتبره خطأ». طلبنا [[/api/orders]] اللي ملوش handler:

~~~text الناتج (stderr)
[MSW] Error: intercepted a request without a matching request handler:
  • GET /api/orders
If you still wish to intercept this unhandled request, please create a request handler for it.
orders threw: TypeError fetch failed
~~~

الـ fetch نفسه رمى، فالـ component هيروح لحالة الخطأ والاختبار اللي مستني البيانات هيفشل. وجربنا الاسم القديم بتاع msw 2 ([[onUnhandledRequest: 'error']]) على msw 3:

~~~text الناتج
[MSW] Warning: intercepted a request without a matching request handler:
  • GET /api/orders
~~~

Warning بس، يعني الخيار اتجاهل من غير ما حد يقولك.

---

## ٤. اختبار بيغيّر الرد لنفسه

~~~text Products.test.tsx
server.use(http.get('/api/products', () => new HttpResponse(null, { status: 500 })))
renderWithProviders(<Products />)
expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500')
~~~

- [[server.use(...)]]: يضيف handler **قبل** الأساسيين، فبيكسب عليهم. ولأن [[resetHandlers]] في [[afterEach]]، بيتشال بعد الاختبار ده.
- [[new HttpResponse(null, { status: 500 })]]: رد من غير body بـ 500.
- [[Products]] بيرمي [[Error('HTTP 500')]] لما [[res.ok]] يبقى false، ويعرضه في [[<p role="alert">]].

شغّلنا الاختبار ده وبعده اختبار تاني عادي:

~~~text npx vitest run --reporter=verbose
 ✓ shows the error when the API fails 261ms
 ✓ back to the normal handler 141ms
~~~

التاني لقى Mug، يعني الـ 500 متعدّاش له.

### ليه [[/api/products]] من غير دومين شغال في Node؟

~~~text الناتج
location.href in jsdom: http://localhost:3000/
~~~

jsdom عامل كأن الصفحة مفتوحة على [[http://localhost:3000/]]، فالمسار النسبي بيتكمّل عليه.

---

## ٥. الـ solCode: نفس الـ handlers في المتصفح

~~~text src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
export const worker = setupWorker(...handlers)
~~~

[[msw/browser]] بيستخدم Service Worker: سكربت المتصفح بيشغّله في الخلفية ويقدر يمسك أي طلب من الصفحة. والسكربت ده لازم يتحط في [[public]]:

~~~powershell
npx msw init public
~~~

~~~text الناتج
Copying the worker script at "...\public"...
Worker script successfully copied!
~~~

~~~text src/main.tsx
async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_MOCK !== '1') return
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})
~~~

- [[import.meta.env.DEV]]: true في [[vite dev]] بس. و [[VITE_MOCK]] متغير بيئة انت بتحطه (Vite بيعرض للكود المتغيرات اللي بتبدأ بـ [[VITE_]] بس). الاتنين لازم يتحققوا، فالـ mocks عمرها ما تشتغل في الإنتاج.
- [[await import(...)]]: dynamic import، فكود MSW مش بيدخل الـ bundle الأساسي.
- [[onUnhandledFrame: 'bypass']]: في المتصفح الطلبات اللي ملهاش handler (الصور والـ CSS وكود Vite) تعدّي للشبكة عادي.
- [[.then(() => render)]]: ارسم بعد ما الـ worker يجهز، وإلا أول طلبات هتعدّي قبله.

شغّلناه بـ [[VITE_MOCK=1]] وفتحنا الصفحة:

~~~text الـ console
[MSW] Mocking enabled.
  Worker script URL: http://localhost:5807/mockServiceWorker.js
[MSW] 10:00:39 GET /api/products (200 OK)
~~~

~~~text Network
response 200 /api/products   fromServiceWorker = true
screen: Mug, T-shirt
~~~

مفيش أي backend شغال، والرد جه من الـ Service Worker.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| رد ثابت | [[http.get(path, () => HttpResponse.json(data))]] |
| تقرا الـ body | [[async ({ request }) => await request.json()]] |
| status معين | [[HttpResponse.json(data, { status: 409 })]] |
| الاختبارات | [[setupServer]] + listen و resetHandlers و close |
| رد مختلف لاختبار واحد | [[server.use(...)]] |
| طلب ناسي handler يبان | [[onUnhandledFrame: 'error']] (مش onUnhandledRequest في msw 3) |
| المتصفح | [[npx msw init public]] و [[setupWorker(...).start()]] قبل الرسم |`,
          lines: [
            "http لتعريف الـ handlers، و HttpResponse للرد، و delay للتأخير.",
            "كل الـ handlers في array واحدة تتشارك بين الاختبارات والمتصفح.",
            "GET /api/products:",
            "استنى شوية زي شبكة حقيقية، عشان حالة الـ loading تتختبر.",
            "رد JSON.",
            "قفلة.",
            "POST /api/signup:",
            "اقرا الـ body اللي الكود بعته.",
            "إيميل معين بيرجّع 409 بنفس شكل أخطاء الـ API الحقيقي.",
            "غير كده 201.",
            "قفلة.",
            "قفلة الـ array.",
            "نسخة Node للاختبارات.",
            "server بالـ handlers.",
            "قبل كل الاختبارات: ابدأ، وأي طلب مالوش handler يبقى error.",
            "بعد كل اختبار: امسح الـ DOM، ورجّع الـ handlers الأساسية.",
            "في الآخر: اقفل.",
            "اختبار حالة الخطأ.",
            "handler للاختبار ده بس، بيكسب على الأساسي لحد resetHandlers.",
            "ارسم.",
            "رسالة الخطأ ظهرت.",
            "قفلة."
          ],
          sol: R`اختبارات Products و SignupForm بتعدّي من غير أي سيرفر شغال. الطلب لـ [[/api/orders]] بيفشل: الـ fetch بيرمي [[TypeError: fetch failed]]، و MSW بيطبع «[MSW] Error: intercepted a request without a matching request handler: GET /api/orders». فالـ component بيعرض حالة الخطأ، والاختبار اللي مستني البيانات بيفشل، وده بالظبط اللي انت عايزه.

في المتصفح بعد [[worker.start()]]، الـ console بيكتب «[MSW] Mocking enabled.»، وفي Network الطلبات لـ [[/api/products]] بترد من الـ Service Worker. لو الـ worker مش بيمسك، اتأكد إن [[mockServiceWorker.js]] موجود في public وإن الموقع مش متقدّم من مسار فرعي (ساعتها محتاج [[serviceWorker.url]]).`,
          solCode: R`// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
export const worker = setupWorker(...handlers)

// src/main.tsx
async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_MOCK !== '1') return
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})`
        },
        {
          cmd: "renderHook",
          title: "اختبر custom hook لوحده",
          desc: R`[[renderHook(() => useCounter(5))]] بيرسم component صغير وهمي بينادي الـ hook، ويدّيك [[result.current]] فيه آخر قيمة رجعت. أي حاجة بتغيّر state بتتلف في [[act()]] عشان React تطبّق التحديث قبل ما تقرا النتيجة، و [[rerender(newProps)]] بيغيّر الـ arguments.

ومع timers ([[useDebounce]]) بتستخدم fake timers: [[vi.useFakeTimers()]] و [[vi.advanceTimersByTime(500)]]، فالاختبار بياخد مللي ثانية بدل ما يستنى فعلًا.`,
          example: R`import { renderHook, act } from '@testing-library/react'
import { it, expect, vi, afterEach } from 'vitest'
import { useCounter, useDebounce } from './hooks'

afterEach(() => { vi.useRealTimers() })
it('increments and resets', () => {
  const { result } = renderHook(() => useCounter(5))
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.reset())
  expect(result.current.count).toBe(5)
})
it('returns the last value after the delay', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), { initialProps: { value: 'a' } })
  rerender({ value: 'ab' })
  rerender({ value: 'abc' })
  act(() => vi.advanceTimersByTime(499))
  expect(result.current).toBe('a')
  act(() => vi.advanceTimersByTime(1))
  expect(result.current).toBe('abc')
})`,
          try: R`اكتب [[useCounter(initial)]] بيرجّع [[{ count, increment, reset }]]، واستخدم [[useDebounce]] من درس custom hook، وشغّل الاختبارين. بعدين اختبر hook بيستخدم React Query (زي [[useProducts()]]): ابعت [[{ wrapper }]] لـ renderHook، واستنى [[result.current.isSuccess]] بـ [[waitFor]].`,
          flag: "script",
          deep: {
            why: R`الـ hook اللي فيه منطق (debounce، أو pagination، أو صلاحيات، أو حسابات سلة) بيتستخدم في components كتير. اختباره لوحده أسرع وأوضح من إنك ترسم كل component بيستخدمه، ولما يفشل تعرف إن المشكلة في الـ hook نفسه.`,
            how: R`[[renderHook]] بيعمل component اسمه TestComponent بينادي الـ callback بتاعك جوه الـ render ويحفظ الناتج في [[result.current]]. «current» لأنها بتتغير مع كل render، فلازم تقراها بعد كل act مش تحفظها في متغير في الأول ([[const { count } = result.current]] بيفضل على القيمة القديمة).

[[act(() => ...)]] بيقول لـ React «نفّذ ده وطبّق كل التحديثات والـ effects الناتجة قبل ما ترجع». من غيرها React بتطبع warning والقيمة ممكن تبقى قديمة. ولو الـ callback async: [[await act(async () => ...)]].

[[initialProps]] و [[rerender(props)]] بيحاكوا الأب اللي بيبعت قيمة جديدة، وده بالظبط اللي بيحصل مع useDebounce لما المستخدم يكتب.

الـ fake timers: [[vi.useFakeTimers()]] بيستبدل [[setTimeout]] و [[Date]] بنسخة الاختبار بيتحكم فيها، و [[advanceTimersByTime(ms)]] بيشغّل أي timer وقته جه. لازم الـ advance يبقى جوه act لأنه بيعمل setState. و [[vi.useRealTimers()]] في afterEach عشان الاختبارات التانية (وخصوصًا user-event و findBy اللي بيستخدموا timers) متتأثرش.

و hook محتاج provider: [[renderHook(() => useProducts(), { wrapper })]] بنفس Wrapper بتاع [[renderWithProviders]].`,
            when: R`hooks فيها منطق حقيقي ومستخدمة في أكتر من مكان. أما hook بسيط بيلف useQuery وخلاص، فاختبار الـ component اللي بيستخدمه بيغطيه.`,
            mistakes: R`تقرا [[result.current]] مرة وتحفظها، وبعدين تستغرب إنها مبتتغيرش. وتنسى [[act]] حوالين النداء اللي بيغيّر state. و fake timers من غير ما ترجّع الـ real timers، فاختبار تاني بـ findBy يعلق للأبد. واختبار كل hook صغير لوحده حتى لو هو مجرد [[useState]] ملفوف: اختبار ملوش قيمة وبيتكسر مع أي refactor.`
          },
          teach: R`## الفكرة: component وهمي بينادي الـ hook، وانت بتقرا اللي رجع

المثال اختبارين: واحد لـ [[useCounter]] (بيزوّد ويرجع للأول)، وواحد لـ [[useDebounce]] بوقت وهمي. اتشغّل في Vitest 5.0 + jsdom + Testing Library 16.3، والـ hooks مكتوبة زي الـ solCode ودرس custom hook: [[useDebounce(value, ms)]] بيعمل [[setTimeout]] كل ما [[value]] يتغير، ويلغي القديم.

---

## ١. الـ imports وتنضيف الوقت

~~~text hooks.test.tsx
import { renderHook, act } from '@testing-library/react'
import { it, expect, vi, afterEach } from 'vitest'
import { useCounter, useDebounce } from './hooks'

afterEach(() => { vi.useRealTimers() })
~~~

- [[renderHook]]: يرسم component صغير بينادي الـ hook.
- [[act]]: «نفّذ ده وطبّق كل تحديثات React قبل ما ترجع».
- [[afterEach(() => { vi.useRealTimers() })]]: بعد كل اختبار رجّع الوقت الحقيقي، عشان لو اختبار شغّل الوقت الوهمي ميأثرش على اللي بعده.

---

## ٢. الاختبار الأول: [[useCounter]]

~~~text hooks.test.tsx
const { result } = renderHook(() => useCounter(5))
~~~

[[renderHook]] بياخد دالة بتنادي الـ hook. وراها بيعمل component اسمه [[TestComponent]]، بينادي دالتك في كل render ويحط اللي رجع في [[result.current]].

~~~text hooks.test.tsx
act(() => result.current.increment())
expect(result.current.count).toBe(6)
~~~

- [[increment]] بيعمل [[setCount]]، يعني تحديث state. [[act]] حواليه بيخلي React ترسم تاني قبل السطر اللي بعده.
- [[result.current.count]]: بنقرا من [[result.current]] **من جديد**، لأنه بيتغير مع كل render.
- [[toBe(6)]]: يساوي 6 بالظبط.

~~~text hooks.test.tsx
act(() => result.current.reset())
expect(result.current.count).toBe(5)
~~~

### ليه [[result.current]] كل مرة؟

جربنا نحفظ القيمة في متغير في الأول:

~~~text الناتج
saved count = 5 | result.current.count = 6
~~~

[[const { count } = result.current]] خد نسخة من القيمة في اللحظة دي، وفضلت 5. و [[result.current]] نفسه اتحدّث لـ 6.

### ومن غير [[act]]؟

~~~text الناتج
increment without act, result.current.count = 5
~~~

التحديث اتطلب بس React لسه مطبقتوش، فالقيمة قديمة.

---

## ٣. الاختبار التاني: [[useDebounce]] بوقت وهمي

~~~text hooks.test.tsx
vi.useFakeTimers()
~~~

بيبدّل [[setTimeout]] و [[Date]] بنسخة الاختبار بيتحكم فيها: الوقت مش بيمشي لوحده خالص، بيمشي لما انت تقول.

~~~text hooks.test.tsx
const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), { initialProps: { value: 'a' } })
~~~

- الدالة هنا بتاخد props: [[({ value })]]. ده بيحاكي component أب بيبعت [[value]].
- [[initialProps: { value: 'a' }]]: الـ props في أول render.
- [[rerender]]: دالة بترسم تاني بـ props جديدة.

~~~text hooks.test.tsx
rerender({ value: 'ab' })
rerender({ value: 'abc' })
~~~

كأن المستخدم كتب حرفين بسرعة. كل تغيير بيلغي الـ timer القديم ويبدأ واحد جديد 500ms.

~~~text hooks.test.tsx
act(() => vi.advanceTimersByTime(499))
expect(result.current).toBe('a')
act(() => vi.advanceTimersByTime(1))
expect(result.current).toBe('abc')
~~~

| الوقت الوهمي | [[result.current]] | ليه |
|---|---|---|
| 0 | [['a']] | القيمة الأولى |
| 499ms | [['a']] | الـ timer لسه مخلصش |
| 500ms | [['abc']] | الـ timer خلص، وآخر قيمة بس. [['ab']] عمرها ما ظهرت |

[[advanceTimersByTime(ms)]] بيقدّم الساعة ويشغّل أي timer وقته جه. والـ timer ده بيعمل [[setState]]، عشان كده جوه [[act]]. ومن غير [[act]]:

~~~text الناتج
without act, result.current = a
~~~

الـ timer اشتغل، بس React مطبقتش التحديث، فالاختبار هيفشل. (ولو [[globals: true]] في إعداد Vitest، React كمان بتطبع «An update to TestComponent inside a test was not wrapped in act(...)». من غيرها مفيش تحذير، والقيمة برضه قديمة.)

---

## ٤. اللي حصل

~~~text npx vitest run --reporter=verbose
 ✓ increments and resets 15ms
 ✓ returns the last value after the delay 5ms
 ✓ loads products 149ms
      Tests  3 passed (3)
~~~

اختبار الـ debounce خد 5ms مع إن فيه 500ms انتظار، لأن الوقت وهمي.

## ٥. الـ solCode: hook محتاج provider

~~~text hooks.test.tsx
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
const { result } = renderHook(() => useProducts(), { wrapper })
await waitFor(() => expect(result.current.isSuccess).toBe(true))
expect(result.current.data).toHaveLength(2)
~~~

- [[{ wrapper }]]: نفس فكرة [[render]]، الـ TestComponent بيتلف في الـ provider.
- [[waitFor]]: الطلب async (MSW بيرد بعد 50ms)، فبنستنى لحد ما [[isSuccess]] تبقى true.
- [[data]] فيها المنتجين. وده التالت في الناتج فوق.

و [[useCounter]] في الـ solCode: [[useState(initial)]]، و [[increment]] بيزوّد بـ [[c => c + 1]]، و [[reset]] بيرجّع [[initial]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| ترسم الـ hook | [[const { result } = renderHook(() => useX())]] |
| تقرا القيمة | [[result.current]] كل مرة، متحفظهاش |
| تغيّر state | [[act(() => result.current.doSomething())]] |
| props جديدة | [[initialProps]] و [[rerender({...})]] |
| وقت وهمي | [[vi.useFakeTimers()]] و [[act(() => vi.advanceTimersByTime(ms))]]، و [[vi.useRealTimers()]] في afterEach |
| hook محتاج provider | [[renderHook(..., { wrapper })]] |`,
          lines: [
            "renderHook و act.",
            "أدوات vitest، و vi للـ fake timers.",
            "الـ hooks اللي بنختبرها.",
            "بعد كل اختبار رجّع الوقت الحقيقي.",
            "اختبار العداد.",
            "ارسم الـ hook بقيمة أولى 5.",
            "نادي increment جوه act عشان التحديث يتطبق.",
            "اقرا result.current من جديد بعد التحديث.",
            "reset.",
            "رجع 5.",
            "قفلة.",
            "اختبار الـ debounce.",
            "وقت وهمي.",
            "ارسم بقيمة أولى، و rerender هيغيّرها.",
            "المستخدم كتب حرف.",
            "وحرف تاني قبل ما الوقت يخلص.",
            "قدّم الوقت 499ms.",
            "لسه القيمة القديمة.",
            "آخر 1ms.",
            "دلوقتي آخر قيمة بس، والوسطانية اتلغت.",
            "قفلة."
          ],
          sol: R`الاختبارين بيعدّوا في أقل من ثانية حتى مع delay 500ms، لأن الوقت وهمي. لو شلت الـ act من حوالين [[advanceTimersByTime]]، القيمة بتفضل [['a']] والاختبار بيفشل، لأن React لسه مطبّقتش التحديث. والـ warning «An update to TestComponent inside a test was not wrapped in act(...)» بيظهر بس لو [[globals: true]] في إعداد Vitest: من غيرها Testing Library مش بيفعّل [[IS_REACT_ACT_ENVIRONMENT]]، فمفيش تحذير خالص والقيمة برضه قديمة.

اختبار [[useProducts]] بيعدّي لما تبعت [[wrapper]] فيه QueryClientProvider (من غيره: «No QueryClient set»)، وتستنى [[await waitFor(() => expect(result.current.isSuccess).toBe(true))]]، وبعدها [[result.current.data]] فيها المنتجات من MSW.`,
          solCode: R`export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  return { count, increment: () => setCount(c => c + 1), reset: () => setCount(initial) }
}

it('loads products', async () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  const { result } = renderHook(() => useProducts(), { wrapper })
  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data).toHaveLength(2)
})`
        },
        {
          cmd: "unit ولا e2e في Next",
          title: "Next.js: إيه اللي يتختبر بـ Vitest وإيه اللي محتاج متصفح حقيقي",
          desc: R`Vitest و Testing Library بيختبروا الـ Client Components كويس، والدوال العادية (utils و schemas و DAL بـ داتابيز اختبار). بس الـ async Server Components لسه مش مدعومة في Testing Library ([[render(<Page />)]] لـ component بيعمل [[await]] مش هيشتغل)، والـ Server Actions والـ proxy والـ caching محتاجين Next نفسه شغال.

التقسيمة العملية: منطق الـ Server Action في دالة عادية تتختبر unit (بـ mock للـ session والداتابيز أو داتابيز اختبار)، والـ client components بـ Testing Library، والرحلات المهمة كاملة (تسجيل، ودخول، ودفع) بـ Playwright على [[next build && next start]]. تفاصيل Playwright والـ CI في تاب «فحص الكود».`,
          example: R`// lib/orders.ts: المنطق في دالة عادية
export async function placeOrder(input: unknown, deps: { userId: string | null; db: OrdersDb }) {
  if (!deps.userId) return { ok: false as const, error: 'unauthorized' }
  const parsed = orderSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: 'invalid', fieldErrors: z.flattenError(parsed.error).fieldErrors }
  const order = await deps.db.create({ ...parsed.data, userId: deps.userId })
  return { ok: true as const, id: order.id }
}
// app/actions.ts: الـ action رفيع، بيجمع الـ deps وينادي
// 'use server'; export async function placeOrderAction(fd: FormData) { const s = await verifySession(); return placeOrder(Object.fromEntries(fd), { userId: s?.userId ?? null, db }) }
// lib/orders.test.ts
it('rejects guests and invalid input', async () => {
  const db = { create: vi.fn() }
  expect(await placeOrder({ productId: 'p1', qty: 1 }, { userId: null, db })).toEqual({ ok: false, error: 'unauthorized' })
  expect((await placeOrder({ qty: 0 }, { userId: 'u1', db })).ok).toBe(false)
  expect(db.create).not.toHaveBeenCalled()
})
// e2e/checkout.spec.ts (Playwright)
test('guest is redirected to login at checkout', async ({ page }) => {
  await page.goto('/checkout')
  await expect(page).toHaveURL(/\/login/)
})`,
          try: R`خد Server Action عندك في مشروع Next (أو اعمل واحد للطلبات)، وطلّع منطقه في دالة زي [[placeOrder]] بتاخد الـ userId والـ db كـ arguments. اكتب ٣ اختبارات Vitest: ضيف مرفوض، و input غلط، وطلب سليم بيرجّع id. بعدين اكتب اختبار Playwright واحد للرحلة كلها.`,
          flag: "script",
          deep: {
            why: R`في Next.js جزء كبير من الكود بقى على السيرفر، ومش كله بيتختبر بنفس الطريقة. لو حاولت تختبر كل حاجة بـ Testing Library هتصطدم بـ async Server Components، ولو كل حاجة بـ e2e الاختبارات هتبقى بطيئة وهشة. التقسيم الصح بيخلي أغلب الاختبارات سريعة، وقليل منها بطيء بس بيغطي اللي مينفعش يتغطى غير كده.`,
            how: R`الـ Server Action في الآخر دالة async على السيرفر. لو حطيت فيها [[cookies()]] و [[prisma]] و [[revalidatePath]] مباشرة، اختبارها محتاج [[vi.mock]] لـ [[next/headers]] و [[next/cache]] والداتابيز. الأسهل: الـ action يبقى «رفيع» (يقرا الـ session، ويحوّل الـ FormData، وينادي، ويعمل revalidate)، والمنطق كله في دالة بتاخد اللي محتاجاه كـ arguments. دي بتتختبر زي أي دالة. وده نفس فكرة الـ DAL في تاب Next.js.

الـ Client Components: زي أي React component، بـ [[renderWithProviders]]. ولو بتستخدم [[useRouter]] من [[next/navigation]]، اعمله [[vi.mock('next/navigation', ...)]] يرجّع [[push: vi.fn()]]، أو استخدم mock جاهز زي next-router-mock. و [[next/image]] و [[next/link]] بيترسموا عادي في jsdom غالبًا.

الـ async Server Components: الـ docs بتاعة Next نفسها بتقول استخدم e2e ليها. في حالات بسيطة ناس بتعمل [[render(await Page())]] (بتنادي الدالة وتستنى الـ JSX وترسمه)، وده بيشتغل لو مفيش جواها async components تانية ولا حاجات server-only، بس هش.

الـ e2e: Playwright بيشغّل متصفح حقيقي على [[next start]] (مش dev، عشان الكاش والـ static بيتصرفوا زي الإنتاج)، و [[webServer]] في [[playwright.config.ts]] بيشغّل السيرفر قبل الاختبارات. استخدمه للرحلات اللي لو وقعت الشركة هتخسر: الدخول، والتسجيل، والدفع، والصلاحيات. والـ API الخارجي (بوابة الدفع مثلًا) بيتعمله mock بـ [[page.route]] أو بيئة sandbox.`,
            when: R`في أي مشروع Next: Vitest لكل حاجة فيها منطق (دوال، و schemas، و hooks، و client components)، و Playwright لـ ٥ لـ ١٠ رحلات مهمة، وسيب الباقي.`,
            mistakes: R`[[render(<Page />)]] لـ async Server Component وتستغرب الـ error. و Server Action ضخم كل حاجة جواه فمحدش بيختبره. و e2e لكل زرار في الموقع: ساعة CI وبيفشل عشوائي. و e2e على [[next dev]] فالسلوك مختلف عن الإنتاج (الكاش والـ static). و mock لكل حاجة في اختبار الـ action لحد ما الاختبار مبقاش بيختبر غير الـ mocks. وسؤال انترفيو: «هرم الاختبارات في Next؟» unit كتير للمنطق، و component tests للواجهة، و e2e قليل للرحلات الحرجة.`
          },
          teach: R`## الفكرة: المنطق في دالة عادية تتختبر في مللي ثواني، والرحلة كلها في متصفح حقيقي

المثال ٤ حتت: دالة [[placeOrder]] فيها كل منطق الطلب، و Server Action رفيع بينادها (في تعليق)، واختبار Vitest للدالة من غير Next خالص، واختبار Playwright بيفتح صفحة الدفع في متصفح. اتشغّل كده:

- [[placeOrder]] واختباراتها: Vitest 5.0 في Node، بـ zod 4.6. [[orderSchema]] و [[OrdersDb]] مش في المثال، فعرّفناهم: [[productId]] نص مش فاضي، و [[qty]] رقم صحيح من 1 وطالع.
- اختبار Playwright: [[@playwright/test]] 1.63 على Chrome المتسطب. ومعندناش مشروع Next هنا، فشغلناه على سيرفر Node صغير بيعمل نفس السلوك: [[/checkout]] من غير cookie اسمها session بيرد redirect لـ [[/login]]. الـ Server Action نفسه ([[verifySession]] و [[next start]]) من docs Next.js، مش متجرّب هنا.

---

## ١. [[placeOrder]]: المنطق

~~~text lib/orders.ts
export async function placeOrder(input: unknown, deps: { userId: string | null; db: OrdersDb }) {
~~~

- [[input: unknown]]: البيانات جاية من فورم، يعني من المستخدم، فمش بنثق في شكلها. [[unknown]] بيجبرك تفحصها قبل ما تستخدمها.
- [[deps]] (اختصار dependencies): الحاجات اللي الدالة بتعتمد عليها: مين المستخدم ([[string | null]]: id أو null لو ضيف)، والداتابيز. بدل ما الدالة تجيبهم بنفسها ([[cookies()]] و [[prisma]])، بتاخدهم كـ arguments. ده اللي بيخلّي الاختبار يبعت داتابيز وهمية.

~~~text lib/orders.ts
if (!deps.userId) return { ok: false as const, error: 'unauthorized' }
~~~

مفيش مستخدم؟ ارجع على طول من غير ما تلمس الداتابيز. و [[as const]] بيخلي TypeScript يعتبر [[ok]] قيمته [[false]] بالظبط مش أي boolean، فاللي بينادي يقدر يكتب [[if (result.ok)]] و TypeScript يعرف إن [[id]] موجود جوه.

~~~text lib/orders.ts
const parsed = orderSchema.safeParse(input)
if (!parsed.success) return { ok: false as const, error: 'invalid', fieldErrors: z.flattenError(parsed.error).fieldErrors }
~~~

- [[safeParse]]: يفحص من غير ما يرمي error، ويرجّع [[{ success: true, data }]] أو [[{ success: false, error }]].
- [[z.flattenError(error).fieldErrors]]: يحوّل الخطأ لـ object كل خانة فيه array رسايل. جربنا [[{ qty: 0 }]]:

~~~text الناتج
{"ok":false,"error":"invalid","fieldErrors":{"productId":["Invalid input: expected string, received undefined"],"qty":["Too small: expected number to be >=1"]}}
~~~

~~~text lib/orders.ts
const order = await deps.db.create({ ...parsed.data, userId: deps.userId })
return { ok: true as const, id: order.id }
~~~

[[...parsed.data]] بيفرد البيانات اللي اتفحصت، ونضيف عليها [[userId]] من الـ session، مش من الفورم (عشان محدش يعمل طلب باسم حد تاني).

## ٢. الـ Server Action الرفيع (تعليق في المثال)

~~~text app/actions.ts
'use server'
export async function placeOrderAction(fd: FormData) {
  const s = await verifySession()
  return placeOrder(Object.fromEntries(fd), { userId: s?.userId ?? null, db })
}
~~~

- [[Object.fromEntries(fd)]]: يحوّل الـ FormData لـ object عادي.
- [[s?.userId ?? null]]: لو مفيش session خد null.

الـ action مفيهوش أي قرار: بيجمع الـ deps وينادي. فمفيش حاجة مهمة فيه محتاجة اختبار.

---

## ٣. اختبار Vitest

~~~text lib/orders.test.ts
const db = { create: vi.fn() }
expect(await placeOrder({ productId: 'p1', qty: 1 }, { userId: null, db })).toEqual({ ok: false, error: 'unauthorized' })
expect((await placeOrder({ qty: 0 }, { userId: 'u1', db })).ok).toBe(false)
expect(db.create).not.toHaveBeenCalled()
~~~

- [[{ create: vi.fn() }]]: داتابيز وهمية، [[create]] بتسجّل النداءات بس.
- [[toEqual]]: مقارنة عميقة (نفس المفاتيح ونفس القيم)، مش [[toBe]] اللي بيقارن إنه نفس الـ object في الذاكرة.
- الأقواس في [[(await placeOrder(...)).ok]]: استنى الأول، وبعدين اقرا [[ok]].
- وفي الحالتين [[create]] متنادتش.

### الـ solCode: الطلب السليم

~~~text lib/orders.test.ts
const db = { create: vi.fn().mockResolvedValue({ id: 'o1' }) }
const result = await placeOrder({ productId: 'p1', qty: 2 }, { userId: 'u1', db })
expect(result).toEqual({ ok: true, id: 'o1' })
expect(db.create).toHaveBeenCalledWith({ productId: 'p1', qty: 2, userId: 'u1' })
~~~

[[mockResolvedValue(x)]]: الدالة الوهمية بترجّع promise بتخلص بـ x، زي الداتابيز الحقيقية. و [[toHaveBeenCalledWith]] بيتأكد إن [[userId]] اتضاف.

~~~text npx vitest run src/lib/orders.test.ts --reporter=verbose
 ✓ src/lib/orders.test.ts > rejects guests and invalid input 6ms
 ✓ src/lib/orders.test.ts > creates an order for a signed-in user 1ms
      Tests  2 passed (2)
   Duration  452ms
~~~

6ms و 1ms: مفيش Next ولا داتابيز ولا شبكة.

---

## ٤. اختبار Playwright

~~~text e2e/checkout.spec.ts
test('guest is redirected to login at checkout', async ({ page }) => {
  await page.goto('/checkout')
  await expect(page).toHaveURL(/\/login/)
})
~~~

- [[test]] و [[expect]] هنا من [[@playwright/test]]، مش Vitest.
- [[({ page })]]: Playwright بيدّيك تاب متصفح جديد ونضيف لكل اختبار.
- [[page.goto('/checkout')]]: افتح الصفحة. المسار نسبي، بيتكمّل على [[baseURL]] من الإعداد.
- [[toHaveURL(/\/login/)]]: الـ URL فيه [[/login]]. [[/.../]] regex، و [[\/]] يعني [[/]] نفسها. وبيستنى ويعيد (افتراضيًا لحد ٥ ثواني) لحد ما يتحقق، عشان الـ redirect ممكن ياخد لحظة.

~~~text npx playwright test
Running 1 test using 1 worker
  ok 1 e2e\checkout.spec.ts:2:1 › guest is redirected to login at checkout (282ms)
  1 passed (2.0s)
~~~

وعشان نشوف شكل الفشل، بعتنا cookie session فالسيرفر معملش redirect (وقللنا الـ timeout لثانيتين):

~~~text الناتج
Error: expect(page).toHaveURL(expected) failed
Expected pattern: /\/login/
Received string:  "http://localhost:5808/checkout"
Timeout: 2000ms
~~~

### الـ [[webServer]] في الإعداد (الـ solCode)

~~~text playwright.config.ts
webServer: { command: 'npm run build && npm run start', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI }
~~~

- [[command]]: Playwright بيشغّل الأمر ده قبل الاختبارات، ويقفله بعدها. [[build]] و [[start]] مش [[dev]]، عشان التطبيق يتصرف زي الإنتاج.
- [[url]]: يستنى لحد ما الرابط ده يرد، وبعدين يبدأ.
- [[reuseExistingServer: !process.env.CI]]: على جهازك لو السيرفر شغال أصلًا استخدمه، وفي الـ CI (المتغير [[CI]] موجود) شغّل واحد جديد دايمًا.

في التجربة نفس الشكل بالظبط بس [[command: 'node e2e/server.mjs']]، و Playwright شغّله وقفله لوحده: بعد الاختبار البورت مكانش فيه حد بيسمع.

---

## الخلاصة

| الكود | يتختبر بـ | ليه |
|---|---|---|
| منطق Server Action | Vitest على دالة بتاخد [[deps]] | مللي ثواني، من غير Next |
| Client Components | Vitest + Testing Library | زي أي React |
| async Server Components | Playwright | Testing Library لسه مش بيدعمها |
| رحلة كاملة (دخول، دفع) | Playwright على [[next build && next start]] | الكاش والـ redirects زي الإنتاج |

> لو الـ action فيه قرار (مين مسموح له، والبيانات صح ولا لأ)، طلّعه في دالة بتاخد اللي محتاجاه كـ arguments.`,
          lines: [
            "الدالة بتاخد الـ input والحاجات اللي بتعتمد عليها (مين المستخدم، والداتابيز).",
            "مفيش مستخدم؟ ارفض من غير ما تلمس الداتابيز.",
            "نفس الـ schema المشتركة.",
            "بيانات غلط؟ ارجع الأخطاء لكل خانة.",
            "اعمل الطلب باسم المستخدم ده.",
            "نجح.",
            "قفلة.",
            "اختبار Vitest عادي، من غير Next خالص.",
            "داتابيز وهمية: دالة بتسجّل النداءات.",
            "ضيف: مرفوض.",
            "كمية صفر: مرفوض.",
            "وفي الحالتين محدش كتب في الداتابيز.",
            "قفلة.",
            "اختبار Playwright في متصفح حقيقي على التطبيق شغال.",
            "افتح صفحة الدفع من غير دخول.",
            "اتحوّل لصفحة الدخول.",
            "قفلة."
          ],
          sol: R`الاختبارات التلاتة بيعدّوا في مللي ثواني من غير Next ولا داتابيز. الضيف: [[{ ok: false, error: 'unauthorized' }]] و [[db.create]] متناداش. الـ input الغلط: [[ok: false]] ومعاه [[fieldErrors]]. السليم: [[db.create]] اتنادى بالبيانات ومعاها [[userId]]، والنتيجة [[{ ok: true, id }]].

اختبار Playwright بيعدّي لو الـ proxy أو الصفحة بتعمل redirect للدخول. لو فشل بـ timeout على [[toHaveURL]]، غالبًا الصفحة بتعرض رسالة «سجّل دخول» من غير redirect، فغيّر الاختبار يدوّر على النص بدل الـ URL، أو قرر إيه السلوك الصح.`,
          solCode: R`it('creates an order for a signed-in user', async () => {
  const db = { create: vi.fn().mockResolvedValue({ id: 'o1' }) }
  const result = await placeOrder({ productId: 'p1', qty: 2 }, { userId: 'u1', db })
  expect(result).toEqual({ ok: true, id: 'o1' })
  expect(db.create).toHaveBeenCalledWith({ productId: 'p1', qty: 2, userId: 'u1' })
})

// playwright.config.ts
// webServer: { command: 'npm run build && npm run start', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI }`
        }
      ]
    }
]);
