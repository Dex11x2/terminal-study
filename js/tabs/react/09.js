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
            R`بيجيب المكتبة الأساسية [[i18next]]: هي اللي شايلة الترجمات واللغة الحالية وبتعرف تختار شكل الجمع المناسب للرقم. هي نفسها مش تبع React، فنفس الإعداد ينفع في Node أو أي framework.`,
            R`[[initReactI18next]] هو الـ plugin اللي بيوصّل الـ instance بتاع i18next بـ React، فأي component يلاقيه من غير ما تبعته props. و [[useTranslation]] هو الـ hook اللي الـ component بيستخدمه عشان ياخد دالة الترجمة [[t]].`,
            R`[[use]] بيسجّل الـ plugin، و [[init]] بيشغّل المحرك بالإعدادات اللي في الـ object. الكود ده بيتكتب مرة واحدة في ملف لوحده (زي [[i18n.ts]]) وتعمله import في [[main.tsx]] قبل ما ترسم التطبيق، عشان أول render يلاقي الترجمة جاهزة.`,
            R`اللغة اللي التطبيق يبدأ بيها. في مشروع حقيقي غالبًا بتيجي من اختيار المستخدم المحفوظ أو من لغة المتصفح بدل ما تبقى مكتوبة ثابتة.`,
            R`لو مفتاح مش موجود في ترجمة العربي، i18next بيدوّر عليه في الإنجليزي بدل ما يعرض اسم المفتاح نفسه (زي [[greeting]]) للمستخدم. ده بيحميك لما تضيف نص جديد وتنسى تترجمه: يظهر إنجليزي بدل كلمة غريبة.`,
            R`i18next افتراضيًا بيعمل escape للمتغيرات (يحوّل [[<]] لـ [[&lt;]]). React أصلًا بتعمل escape لأي نص في JSX، فلو سبتها شغالة اسم فيه [[<]] هيظهر على الشاشة [[&lt;]] حرفيًا. قفلها آمن هنا بس عشان النتيجة رايحة لـ JSX مش لـ [[innerHTML]].`,
            R`الترجمات نفسها، مقسومة بكود اللغة وجوه كل لغة namespace اسمه [[translation]] (الافتراضي). مكتوبة هنا جوه الكود عشان المثال يبقى ملف واحد؛ في مشروع حقيقي بتبقى ملف JSON لكل لغة، وممكن تتحمّل من السيرفر بـ backend plugin.`,
            R`ترجمة الإنجليزي: [[{{name}}]] مكان فاضي بيتملي بالقيمة وقت النداء. والجمع ليه مفتاحين بس: [[items_one]] للرقم 1، و [[items_other]] لأي رقم تاني حتى الصفر. i18next بيختار اللاحقة ([[_one]] ولا [[_other]]) لوحده من قواعد [[Intl.PluralRules]] للغة.`,
            R`ترجمة العربي ليها ستة أشكال جمع: [[_zero]] للصفر، و [[_one]] للواحد، و [[_two]] للاتنين، و [[_few]] من 3 لـ 10، و [[_many]] من 11 لـ 99، و [[_other]] لـ 100 وما بعدها. لو نسيت شكل منهم، الرقم ده هيروح للـ [[fallbackLng]] ويطلع «3 items» بالإنجليزي وسط صفحة عربي.`,
            R`قفلة [[resources]].`,
            R`قفلة الـ object وقفلة نداء [[init]].`,
            R`component عادي بياخد [[name]] و [[count]] كـ props. النص اللي هيظهر بيتبني من الترجمة مش من كلام مكتوب في الـ JSX، فنفس الـ component يشتغل بأي لغة من غير تعديل.`,
            R`[[t]] هي دالة الترجمة: تديها المفتاح ترجعلك النص باللغة الحالية. و [[i18n]] هو الـ instance نفسه، بتستخدمه عشان تغيّر اللغة أو تقرا [[i18n.language]]. الـ hook ده مشترك في حدث تغيير اللغة، فأي component بيستخدمه بيعيد الرسم لوحده أول ما اللغة تتغير.`,
            R`[[t('greeting', { name })]] بيحط الاسم مكان [[{{name}}]]، و [[t('items', { count })]] بيختار شكل الجمع حسب الرقم (لازم اسم الخاصية يبقى [[count]] بالظبط، غيره i18next مش هيعرف إنه جمع). والزرار بينادي [[changeLanguage]] جوه arrow function، فبيتنفذ وقت الضغط مش وقت الرسم، وكل component بيستخدم [[useTranslation]] بيعيد الرسم باللغة الجديدة.`,
            R`قفلة [[Header]].`,
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
            R`[[useEffect]] هو المكان الصح عشان تعدّل حاجة برا شجرة React، زي عنصر [[<html>]] نفسه: React مش بترسمه، فمحدش هيغيّر الـ attributes بتاعته غيرك.`,
            R`منه هناخد [[i18n]] عشان نعرف اللغة الحالية. والأهم إن الـ hook ده بيخلي الـ component اللي بيستخدمه يعيد الرسم لما اللغة تتغير، فالاتجاه يتحسب من جديد.`,
            R`custom hook اسمه بيبدأ بـ [[use]] عشان قواعد الـ hooks تنطبق عليه وتقدر تنادي جواه hooks تانية. بتناديه مرة واحدة في أعلى التطبيق (زي [[App]])، فيفضل يزامن اتجاه الصفحة مع اللغة طول ما التطبيق مفتوح.`,
            R`بناخد الـ instance بس من غير [[t]] لأننا مش بنترجم نص هنا. ولأن [[useTranslation]] مشترك في تغيير اللغة، الـ component اللي نادى الـ hook بيعيد الرسم مع [[changeLanguage]] والسطور اللي تحت بتتنفذ تاني باللغة الجديدة.`,
            R`[[i18n.dir]] بترجّع [[rtl]] للغات اللي بتتكتب من اليمين زي العربي والعبري، و [[ltr]] لغيرها، وبتفهم كمان أكواد زي [[ar-EG]]. أحسن من إنك تكتب [[language === 'ar']] بإيدك وتنسى لغة تانية.`,
            R`بنعدّل الـ DOM جوه effect مش في جسم الـ component، لأن جسم الـ component المفروض يحسب ويرجّع JSX بس. الـ effect بيتنفذ بعد ما React تحط التغييرات في الصفحة، وده المكان المسموح فيه side effects.`,
            R`بيحط [[lang]] على عنصر [[<html>]]. قارئ الشاشة بيستخدمه عشان ينطق بالنطق العربي الصح، والمتصفح بيستخدمه في اختيار الخط وتقسيم الكلام، ومحركات البحث بتعرف لغة الصفحة منه.`,
            R`[[dir="rtl"]] على [[<html>]] بيقلب اتجاه الصفحة كلها مرة واحدة: النص بيبدأ من اليمين، والـ flex بيرتب من اليمين، والخصائص المنطقية زي [[padding-inline-start]] بتتقلب لوحدها. من غيره هتحتاج تعكس كل عنصر بإيدك.`,
            R`الـ dependency array: الـ effect بيتعاد بس لما اللغة أو الاتجاه يتغيروا، مش مع كل render. لو شلت الـ array خالص هيتنفذ بعد كل render على الفاضي، ولو خليتها فاضية هيتنفذ مرة واحدة بس وتغيير اللغة بعد كده مش هيقلب الصفحة.`,
            R`بنرجّع الاتجاه عشان لو component محتاجه في حساباته (يقلب أيقونة سهم مثلًا، أو يبعته لمكتبة charts) ياخده من هنا من غير ما يحسبه تاني.`,
            R`قفلة الـ hook [[useDocumentDirection]].`,
            R`component صغير لصف فيه عنوان على ناحية وسعر على الناحية التانية، بياخد الاتنين كـ props نصوص.`,
            R`كلاسات Tailwind: [[ps-4]] يعني padding-inline-start (يمين في RTL وشمال في LTR)، و [[text-start]] يعني محاذاة لبداية السطر، فالاتنين بيتقلبوا لوحدهم مع [[dir]] بعكس [[pl-4]] و [[text-left]] الثابتين. و [[<bdi dir="ltr">]] بيعزل السعر عن اتجاه الكلام اللي حواليه، عشان رقم زي [[EGP 1,250.00]] أو علامة سالب ميتلخبطش ترتيبها وسط جملة عربي.`,
            R`قفلة [[PriceRow]].`,
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
            R`[[ErrorBoundary]] component جاهز من مكتبة [[react-error-boundary]] بدل ما تكتب class component بنفسك (React لسه مفيهاش طريقة تمسك errors الرسم غير class فيه [[getDerivedStateFromError]]). و [[FallbackProps]] هو شكل الـ props اللي الـ fallback هياخدها، وكلمة [[type]] معناها إنه نوع بس وبيتشال وقت الـ build.`,
            R`الشاشة اللي بتظهر مكان الجزء اللي وقع بدل ما الصفحة كلها تبقى بيضا. بتاخد [[error]] (الحاجة اللي اترمت) و [[resetErrorBoundary]] (دالة بتمسح حالة الخطأ وتجرّب ترسم الأولاد تاني).`,
            R`في JavaScript ممكن ترمي أي حاجة، string أو object مش [[Error]]، عشان كده المكتبة بتدي [[error]] نوعه [[unknown]]. من غير الشرط TypeScript هيرفض [[error.message]] لأن النوع [[unknown]]، ولو اترمى [[null]] قراية [[message]] نفسها هترمي error جوه الـ fallback. الشرط بيضمن رسالة دايمًا: [[Unknown error]] لو اللي اترمى مش [[Error]].`,
            R`[[role="alert"]] بيخلي قارئ الشاشة يعلن الرسالة أول ما تظهر. والزرار بياخد [[resetErrorBoundary]] نفسها من غير أقواس، فبتتنادى وقت الضغط بس، والـ boundary يرسم الأولاد من الأول؛ لو المشكلة لسه موجودة هيقع تاني ويرجع الـ fallback.`,
            R`قفلة [[ErrorFallback]].`,
            R`صفحة فيها جزء ممكن يقع ([[Dashboard]])، وعايزين لو وقع يتبدل بالـ fallback لوحده والباقي (الـ header والقوايم) يفضل شغال.`,
            R`[[useLocation]] من react-router بيرجّع المكان الحالي، ومنه بناخد [[pathname]] (زي [[/reports]]). الـ component بيعيد الرسم لما المسار يتغير، وهنستخدمه عشان نصفّر الخطأ لما المستخدم يروح صفحة تانية.`,
            R`بداية الـ JSX. القوس بيخلي [[return]] تكمّل للسطور اللي بعدها؛ من غيره JavaScript بتعتبر [[return]] لوحدها في آخر السطر وترجّع [[undefined]].`,
            R`[[FallbackComponent]] بياخد اسم الـ component نفسه (مش [[<ErrorFallback />]])، والمكتبة هي اللي بترسمه وتديله الـ props. [[onError]] بيتنادى مع كل خطأ ومعاه [[info.componentStack]] (أنهي components كان فيها)، فتبعته لخدمة logging. و [[resetKeys]]: لما أي قيمة فيه تتغير والـ boundary في حالة خطأ بيصفّر لوحده، فالخطأ القديم ميفضلش لازق لما المستخدم يروح صفحة تانية.`,
            R`الجزء المحمي: أي error يترمي وقت الرسم جواه أو في الـ effects بتوعه بيتمسك هنا ويظهر الـ fallback. بس errors الـ event handlers زي [[onClick]] والكود الـ async مش بتوصل للـ boundary لوحدها؛ دي محتاجة [[try/catch]] أو [[showBoundary]] من [[useErrorBoundary]].`,
            R`قفلة الـ boundary: أي حاجة برّاها مش محمية بيها، ولو وقعت هتوصل لـ boundary أعلى أو تشيل الصفحة كلها.`,
            R`قفلة قوس الـ JSX.`,
            R`قفلة [[Page]].`,
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
            R`[[lazy]] بتحوّل import ديناميكي لـ component تقدر ترسمه عادي، و [[Suspense]] هو اللي بيعرض حاجة مؤقتة ([[fallback]]) لحد ما الـ component ده يجهز.`,
            R`[[Outlet]] من react-router هو المكان اللي الـ route الحالي بيترسم فيه جوه الـ layout. لو المستخدم على [[/reports]]، صفحة [[Reports]] بتترسم مكان [[Outlet]].`,
            R`[[import()]] اللي شكله دالة بيخلي Vite يحط الصفحة دي وكل اللي بتستخدمه في chunk (ملف JS منفصل) مش بيتحمّل مع أول فتح للموقع. و [[lazy]] بتنادي الدالة دي أول مرة [[Reports]] يترسم بس. الملف لازم يعمل [[export default]] للـ component، والسطر لازم يبقى برا أي component؛ لو جوه component هيتعمل [[lazy]] جديد مع كل render والـ state بتاعة الصفحة هتتمسح.`,
            R`الـ component الـ lazy بيتحط في الـ routes زي أي component عادي، والـ router مش محتاج يعرف إنه lazy: أول ما المستخدم يروح [[/reports]] الـ chunk بيتطلب.`,
            R`الـ layout المشترك بين الصفحات: الـ header ثابت، والصفحة اللي بتتغير بتترسم مكان [[Outlet]].`,
            R`بداية الـ JSX، والقوس عشان الـ JSX اللي على كذا سطر يتقري كله كقيمة [[return]].`,
            R`Fragment: بيلم [[Header]] و [[Suspense]] تحت أب واحد (الـ component لازم يرجّع عنصر واحد) من غير ما يضيف [[div]] زيادة في الـ DOM ممكن يبوّظ الـ CSS.`,
            R`الـ header **برا** الـ Suspense، فلما صفحة بتتحمّل الـ fallback بيظهر مكان الصفحة بس والـ header يفضل ظاهر وشغال. لو كان جوه، كان هيختفي مع كل تنقل لصفحة لسه متحمّلتش.`,
            R`حدود الانتظار: لما أي حاجة جوه الـ Suspense بتستنى (هنا الـ chunk بتاع [[Reports]])، React بتعرض [[<PageSkeleton />]] مكان كل اللي جواه لحد ما يجهز. بعد ما الـ chunk يتحمّل مرة، المتصفح والـ [[lazy]] بيحفظوه، فالرجوع لنفس الصفحة بعد كده فوري من غير skeleton.`,
            R`الصفحة الحالية بتترسم هنا، ولأنها جوه الـ Suspense، أي صفحة lazy لسه بتتحمّل بتعرض الـ skeleton بدل ما الشاشة تفضى أو التطبيق يقع.`,
            R`قفلة الـ Suspense: اللي بعدها مش متغطي بالـ fallback ده.`,
            R`قفلة الـ Fragment اللي لامم الـ header والـ Suspense.`,
            R`قفلة قوس الـ JSX.`,
            R`قفلة [[AppLayout]].`,
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
            R`[[useEffect]] عشان نفتح ونقفل الـ dialog بعد الرسم، و [[useRef]] عشان نوصل لعنصر الـ [[<dialog>]] الحقيقي في الـ DOM، و [[ReactNode]] هو نوع أي حاجة تتحط كـ children (نص، عناصر، array، أو [[null]]).`,
            R`[[createPortal]] جاية من [[react-dom]] مش [[react]]، لأنها خاصة بالـ DOM: بترسم JSX جوه عنصر DOM تاني غير مكان الـ component في الصفحة.`,
            R`modal «controlled»: الأب هو اللي شايل هل هو مفتوح ولا لأ ([[open]])، والـ modal بيبلّغه لما المستخدم يقفله ([[onClose]]) عشان الأب يحدّث الـ state بتاعته. [[title]] للاسم اللي قارئ الشاشة يقوله، و [[children]] للمحتوى اللي الأب عايز يحطه جوه.`,
            R`[[useRef]] بيدّي object ثابت بين الـ renders، و React بتحط في [[ref.current]] عنصر الـ [[<dialog>]] بعد ما يترسم (عن طريق [[ref={ref}]] تحت). محتاجينه لأن [[showModal()]] و [[close()]] دوال على عنصر الـ DOM، ومفيش prop في JSX بيعمل كده.`,
            R`الـ effect ده بيزامن الـ prop [[open]] مع حالة الـ dialog الحقيقية في المتصفح. لازم يبقى effect لأن [[ref.current]] بيبقى فيه العنصر بعد ما React تحطه في الصفحة بس، مش وقت حساب الـ JSX.`,
            R`بنحفظ العنصر في متغير عشان السطرين اللي جايين. ممكن يبقى [[null]] لو العنصر مش مترسوم، عشان كده الشرطين تحت بيتأكدوا منه قبل ما يستخدموه.`,
            R`لو المفروض يتفتح، والعنصر موجود، ومش مفتوح أصلًا: نادي [[showModal()]]. الشرط [[!dialog.open]] بيمنع إننا نفتحه تاني وهو مفتوح. و [[showModal]] (مش [[show]]) هو اللي بيحطه في الـ top layer فوق كل حاجة، ويقفل الصفحة اللي ورا، ويحرّك الـ focus جواه، ويخلي Escape يقفله.`,
            R`لو المفروض يتقفل وهو لسه مفتوح: نادي [[close()]]، و [[?.]] بتحمي لو [[dialog]] لسه [[null]]. ده اللي بيحصل لما الأب يغيّر [[open]] لـ [[false]] من عنده، زي بعد ما الحفظ يخلص.`,
            R`الـ effect بيتعاد بس لما [[open]] يتغير. الـ [[ref]] مش محتاج يتحط في الـ array لأن الـ object بتاعه ثابت طول عمر الـ component. لو شلت الـ array الـ effect هيتنفذ بعد كل render؛ مش هيكسر حاجة هنا بسبب الشروط، بس شغل على الفاضي.`,
            R`بدل ما نرجّع الـ JSX عادي، بنلفّه في [[createPortal]] فيترسم جوه [[document.body]] مش جوه الأب، فـ [[overflow: hidden]] أو [[transform]] على أي أب مش بيقصّوه. والـ events زي [[onClick]] بتطلع (bubble) في شجرة React مش شجرة الـ DOM، فـ [[onClick]] على أب في الـ JSX هيستقبل clicks من جوه الـ modal.`,
            R`[[ref={ref}]] بيوصّل العنصر بالـ ref اللي فوق. [[onClose]] بيتنادى مع أي قفلة للـ dialog، سواء Escape أو [[close()]]، فالأب دايمًا يعرف ويخلي [[open]] بـ [[false]]؛ من غيره المستخدم يقفل بـ Escape والأب لسه فاكره مفتوح، ومرة الجاية [[setOpen(true)]] مش هيغيّر حاجة فمش هيتفتح. و [[aria-label]] بيدّي الـ dialog اسم يقوله قارئ الشاشة.`,
            R`المحتوى اللي الأب بعته، وبعده زرار قفل بينادي [[onClose]]، فالأب يخلي [[open]] بـ [[false]] والـ effect يقفل الـ dialog. [[onClick={onClose}]] بتدّي الدالة نفسها؛ لو كتبت [[onClick={onClose()}]] هتتنادى وقت الرسم مش وقت الضغط.`,
            R`قفلة الـ [[<dialog>]]، والفاصلة لأن الـ JSX ده أول argument لـ [[createPortal]].`,
            R`تاني argument: عنصر الـ DOM اللي الـ JSX هيترسم جواه. لازم يكون موجود وقت الرسم، فده بيشتغل في المتصفح؛ في SSR مفيش [[document]] فمحتاج تأجّل الـ portal لبعد الـ mount.`,
            R`قفلة نداء [[createPortal]].`,
            R`قفلة [[Modal]].`,
          ],
          sol: R`في Elements هتلاقي [[<dialog>]] آخر حاجة في [[body]] مش جوه الـ div، فالـ [[overflow: hidden]] والـ [[transform]] مش بيقصّوه. وبما إن [[showModal()]] بيحطه في الـ top layer، باقي الصفحة بتبقى inert: Tab بيلف على الزراير اللي جوه الـ dialog (وممكن يروح لشريط المتصفح) بس عمره ما يوصل لعنصر في الصفحة ورا.

Escape بيقفل الـ dialog، والـ [[close]] event بينادي [[onClose]]، ففي React DevTools هتلاقي [[open]] عند الأب بقت [[false]]. لو قفل بـ Escape والـ state فضلت true، يبقى onClose مش متوصّل، والمرة الجاية [[open]] مش هتتغير فالـ effect مش هيشتغل والـ modal مش هيفتح. ولو Tab خرج للصفحة، يبقى استخدمت [[show()]] بدل [[showModal()]].`
        }
      ]
    }
]);
