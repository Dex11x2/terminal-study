// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
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
| [[@testing-library/react]] | بيدّيك [[render]] اللي بيرسم الـ component، و [[screen]] اللي بيدوّر في الصفحة، و [[fireEvent]] اللي بيبعت events |
| [[@testing-library/dom]] | الأساس اللي react بيعتمد عليه (لازم يتركّب معاه) |
| [[@testing-library/jest-dom]] | بيضيف لـ [[expect]] matchers خاصة بالـ DOM زي [[toBeInTheDocument]] و [[toHaveTextContent]] |
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
| [[document is not defined]] | خانة [[environment: 'jsdom']] ناقصة من [[vitest.config.ts]]، فالاختبار شغال في Node من غير DOM |
| [[Invalid Chai property: toBeInTheDocument]] | ملف الـ setup مش متسجّل أو ناقصه import الـ jest-dom |
| [[Found multiple elements]] بين اختبارين | الـ cleanup ناقص |`,
          lines: [
            R`بنجيب [[defineConfig]] من [[vitest/config]] مش من [[vite]]، عشان TypeScript يعرف خانة [[test]] ويكمّلها لك. ده ملف [[vitest.config.ts]] جنب [[package.json]]، وبيتقري قبل أي اختبار.`,
            R`نفس الـ plugin اللي Vite بيستخدمه عشان يحوّل JSX و TSX. من غيره ملف الاختبار اللي فيه [[<Counter />]] مش هيتفهم، أو هيتحوّل بإعدادات مختلفة عن التطبيق الحقيقي.`,
            R`[[plugins]] زي التطبيق. [[environment: 'jsdom']] بيدّي كل اختبار [[document]] و [[window]] وهميين جوه Node؛ من غيرها [[render]] هيرمي [[document is not defined]]. و [[setupFiles]] ملف بيتنفذ قبل كل ملف اختبار، فيه الإعداد اللي كل الاختبارات محتاجاه.`,
            R`ده أول سطر في ملف الـ setup: بيضيف لـ [[expect]] matchers للـ DOM زي [[toBeInTheDocument]] و [[toHaveTextContent]] و [[toBeDisabled]]. لازم المسار اللي آخره [[/vitest]] عشان يتسجّل في expect بتاع Vitest؛ من غيره هتشوف [[Invalid Chai property: toBeInTheDocument]].`,
            R`[[cleanup]] بيشيل كل اللي [[render]] رسمه من الـ [[document]]. Testing Library بتناديه لوحدها بس لو [[afterEach]] موجودة كـ global (يعني [[globals: true]] في الإعداد)؛ هنا مش مفعّلة فبننادي إحنا.`,
            R`[[afterEach]] بتسجّل دالة تتنفذ بعد كل اختبار. لازم import صريح من [[vitest]] لأننا مش مفعّلين [[globals]].`,
            R`بعد كل اختبار الـ DOM يرجع فاضي. من غيره الـ components من الاختبار اللي فات بتفضل مرسومة، فاختبار تاني بيدوّر على نفس الزرار يلاقي اتنين ويرمي [[Found multiple elements]].`,
            R`ده أول ملف الاختبار نفسه. [[render]] بيرسم الـ component في الـ document الوهمي، و [[screen]] فيه دوال البحث على الصفحة كلها ([[getByText]] و [[getByRole]] وغيرهم)، و [[fireEvent]] بيبعت event واحد لعنصر زي click.`,
            R`[[it]] بتعرّف اختبار واحد باسم ودالة، و [[expect]] بتاخد قيمة وتتأكد منها بـ matcher؛ لو مطلعتش زي المتوقع الاختبار يفشل ويقولك المتوقع والفعلي.`,
            R`الـ component اللي بنختبره، بنعمله import زي ما التطبيق بيعمل. الاختبار بيتعامل معاه من برا بس: يرسمه ويدوس عليه ويبص على الشاشة، من غير ما يقرا الـ state بتاعته.`,
            R`اسم الاختبار جملة بتوصف السلوك اللي المستخدم يشوفه، فلما يفشل تقرا في الـ output بالظبط إيه اللي اتكسر. والدالة اللي بعده هي جسم الاختبار.`,
            R`بيرسم [[Counter]] بـ prop [[start]] قيمته 5 جوه [[document.body]]. [[render]] ملفوف في [[act]]، فبعد السطر ده العنصر موجود والـ effects اتنفذت.`,
            R`[[getByText]] بيدوّر على عنصر نصه [[Count: 5]] بالظبط، ولو ملقاهوش بيرمي error فورًا فالاختبار يفشل هنا ومعاه شكل الـ DOM في الرسالة. و [[toBeInTheDocument]] بتأكد إنه فعلًا جوه الصفحة.`,
            R`[[getByRole]] بيلاقي الزرار بدوره ([[button]]) واسمه اللي قارئ الشاشة بيقوله، زي ما المستخدم بيلاقيه، مش بـ class أو id ممكن يتغيروا. و [[fireEvent.click]] بيبعت click واحد عليه، فالـ handler يشتغل والـ state يتغير.`,
            R`بعد الضغط بندوّر من جديد على النص الجديد. [[fireEvent]] ملفوف في [[act]]، فالـ re-render خلص قبل السطر ده ومش محتاج تستنى.`,
            R`قفلة الاختبار [[it]].`,
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
            R`[[screen]] فيه كل دوال البحث ([[getBy]] و [[queryBy]] و [[findBy]]) على الـ document كله، و [[waitFor]] بتعيد تنفيذ دالة لحد ما تعدّي من غير error، للحاجات اللي مش عنصر بتدوّر عليه.`,
            R`[[it]] و [[expect]] زي أي اختبار، و [[vi]] هو object أدوات Vitest، ومنه [[vi.fn()]] اللي بيعمل دالة وهمية تسجّل كل نداء عليها.`,
            R`الاختبار [[async]] لأن البيانات بتيجي من fetch (اللي MSW بيرد عليه في الاختبارات)، فهنحتاج [[await]] نستنى العناصر تظهر.`,
            R`بيرسم [[Products]] جوه QueryClientProvider و router (الدالة دي في الدرس الجاي)، لأن [[Products]] بيستخدم [[useQuery]] و [[Link]]، ومن غير الـ providers دول بيرمي error.`,
            R`أول لحظة بعد الرسم الطلب لسه مرجعش، فالـ component عارض [[Loading...]]. [[getByText]] مناسب هنا لأن النص موجود دلوقتي؛ لو مش موجود كان هيرمي فورًا.`,
            R`[[findByRole]] بترجّع promise بتدوّر كل شوية لحد ما لينك اسمه [[Mug]] يظهر أو ثانية تعدّي (بعدها ترفض والاختبار يفشل). [[await]] لازم، من غيرها [[expect]] هيشتغل على promise مش على عنصر. و [[toHaveAttribute]] بتأكد إن اللينك رايح للمسار الصح.`,
            R`بعد ما أول عنصر ظهر تبقى البيانات وصلت كلها، فـ [[getAllByRole]] من غير انتظار. بيرجّع array بكل العناصر اللي دورها [[listitem]] (كل [[<li>]])، وبيرمي لو ملقاش ولا واحد.`,
            R`عشان تتأكد إن حاجة **مش** موجودة استخدم [[queryByText]]: بترجّع [[null]] بدل ما ترمي. لو استخدمت [[getByText]] هنا هيرمي قبل ما [[not.toBeInTheDocument]] تتنفذ أصلًا.`,
            R`قفلة الاختبار الأول.`,
            R`اختبار تاني بيستنى دالة تتنادى مش عنصر يظهر، فـ [[findBy]] مش هينفع هنا ومحتاجين [[waitFor]].`,
            R`دالة وهمية بتسجّل كل نداء والـ arguments بتاعته، فنقدر نسألها بعدين اتنادت ولا لأ وبإيه، من غير ما نبعت حاجة حقيقية لأي analytics.`,
            R`بنرسم [[Products]] وبنبعتله [[track]] كـ prop [[onLoaded]]؛ الـ component هيناديها بعدد المنتجات لما البيانات توصل.`,
            R`[[waitFor]] بتنفذ الدالة كل 50ms لحد ما الـ [[expect]] اللي جواها يعدّي، أو ثانية تخلص فترمي آخر error. هنا بتستنى لحد ما [[track]] تتنادى بـ 2. خلي جوه [[waitFor]] assertion بس، متحطش جواه actions زي click لأنها هتتكرر مع كل محاولة.`,
            R`قفلة الاختبار التاني.`,
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
            R`[[render]] بيرسم الفورم في الـ document الوهمي، و [[screen]] بيدوّر فيه زي المستخدم (بالـ label والدور والنص). مش محتاجين [[renderWithProviders]] لأن الفورم مش محتاج providers.`,
            R`default export (من غير [[{ }]]). المكتبة دي بتحاكي المستخدم الحقيقي: الكتابة بتعمل focus و keydown و input و keyup لكل حرف، مش event واحد زي [[fireEvent]].`,
            R`[[it]] للاختبار، و [[expect]] للتأكيد، و [[vi]] عشان [[vi.fn()]] اللي هنعمل بيها دالة وهمية نراقبها.`,
            R`الفورم اللي بنختبره (react-hook-form و zod)، بنعمله import زي ما التطبيق بيعمل. الاختبار بيتعامل معاه من برا بس: يكتب ويدوس ويبص على الشاشة.`,
            R`اسم بيوصف السلوك المتوقع، والدالة [[async]] لأن كل دوال [[user]] بترجّع promises ولازم نستناها.`,
            R`بيعمل «جلسة» مستخدم واحدة: الكيبورد والماوس مشتركين بين النداءات (لو Shift اتداس يفضل مضغوط في اللي بعده). بتتعمل في أول الاختبار قبل [[render]]، وكل اختبار يعمل جلسته.`,
            R`دالة وهمية مكان اللي الأب عايز يعمله بعد التسجيل الناجح. هنسألها في الآخر اتنادت ولا لأ، فنعرف الفورم اتبعت ولا لأ.`,
            R`بيرسم الفورم وبيبعتله الدالة الوهمية كـ prop [[onDone]].`,
            R`[[getByLabelText]] بيلاقي الخانة عن طريق الـ [[<label>]] المربوط بيها؛ لو ملقاهاش يبقى الـ label مش مربوط وده bug accessibility حقيقي. و [[user.type]] بيدوس على الخانة ويكتب حرف حرف، و [[await]] لازم وإلا الاختبار يكمّل قبل ما الكتابة تخلص.`,
            R`باسورد 3 حروف بس، أقل من الـ 8 اللي الـ schema طالبها، عشان نشوف رسالة الطول تظهر.`,
            R`بيلاقي زرار الإرسال بدوره واسمه ويدوس عليه زي المستخدم. ده بيبعت submit للفورم، و react-hook-form بيشغّل الـ validation بـ zod قبل أي إرسال.`,
            R`الـ validation في react-hook-form async، فالرسالة ممكن متكونش ظهرت لحظة ما الـ click يخلص. [[findByText]] بتستنى لحد ثانية، و [[getByText]] هنا كان ممكن يفشل مرة وينجح مرة.`,
            R`لما الرسالة الأولى ظهرت تبقى الـ validation خلصت، والرسالتين بيظهروا في نفس الـ render، فـ [[getByText]] كفاية من غير انتظار.`,
            R`بيأكد إن الفورم متبعتش ولا نادى [[onDone]] طالما البيانات غلط. ده الجزء الأهم: إن الـ validation فعلًا منعت الإرسال، مش بس عرضت رسالة.`,
            R`قفلة الاختبار الأول.`,
            R`اختبار تاني: البيانات سليمة بس السيرفر بيرفضها، وعايزين نتأكد إن رسالته بتظهر تحت الخانة الصح.`,
            R`جلسة جديدة للاختبار ده، عشان ميورثش أي حالة كيبورد أو focus من اللي قبله.`,
            R`هنا مش هنسأل عن [[onDone]]، فبنبعت [[vi.fn()]] على طول بس عشان الـ prop المطلوب يبقى موجود.`,
            R`الإيميل ده بالذات الـ handler الوهمي بتاع MSW بيرد عليه بـ 409 و [[fieldErrors]]، زي الـ API الحقيقي لما الإيميل يبقى متسجّل قبل كده.`,
            R`باسورد سليم، و [[{Enter}]] مش بيتكتب كنص: user-event بيدوس Enter، والمتصفح بيبعت الفورم لما Enter يتداس جوه خانة في فورم فيه زرار submit. كده بنختبر الإرسال من الكيبورد كمان.`,
            R`الطلب بيروح لـ MSW ويرجع، فلازم [[findByRole]] تستنى. الرسالة ليها [[role="alert"]] عشان قارئ الشاشة يعلنها، و [[toHaveTextContent]] بتأكد إن النص فيها هو اللي السيرفر رجّعه.`,
            R`الفورم بيحط [[aria-invalid]] على الخانة لما يكون فيها خطأ، والسطر ده بيتأكد إنه اتحط بعد خطأ السيرفر كمان مش بس أخطاء zod، فقارئ الشاشة يقول إن الخانة غلط.`,
            R`قفلة الاختبار التاني.`,
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
            R`أنواع TypeScript بس، و [[import type]] بيتشال وقت الـ build: [[ReactElement]] لعنصر JSX واحد زي [[<Products />]]، و [[ReactNode]] لأي حاجة تتحط كـ children.`,
            R`[[render]] الأصلي من Testing Library؛ هنلفّه في دالة بتاعتنا بدل ما نكرر الـ providers في كل اختبار.`,
            R`[[QueryClient]] هو الكاش اللي شايل نتايج الـ queries، و [[QueryClientProvider]] بيدّيه لأي component تحته عن طريق context. أي component بيستخدم [[useQuery]] من غير provider فوقه بيرمي [[No QueryClient set]].`,
            R`router بيحفظ المسار في الذاكرة بدل شريط العنوان، فيشتغل في jsdom وتقدر تبدأ من أي مسار. من غيره أي [[Link]] أو [[useNavigate]] في الـ component هيرمي error لأنه مش جوه router.`,
            R`الدالة بتاخد الـ JSX اللي هيترسم، و object اختياري فيه [[route]] قيمته الافتراضية [[/]]. الـ [[= {}]] الأخيرة عشان لو ناديتها بـ argument واحد بس، الـ destructuring ميقعش على [[undefined]].`,
            R`client جديد **جوه** الدالة، فكل اختبار ياخد كاش فاضي؛ لو كان واحد برا الدالة بيانات اختبار هتظهر في اللي بعده. و [[retry: false]] لأن React Query افتراضيًا بيعيد الـ query الفاشلة 3 مرات بتأخير بيزيد (حوالي 7 ثواني)، فاختبار حالة الخطأ هيفشل بالـ timeout قبل ما الخطأ يظهر.`,
            R`component بياخد [[children]] ويلفّهم بالـ providers. Testing Library هي اللي هترسمه وتحط الـ [[ui]] بتاعك مكان [[children]].`,
            R`الـ provider اللي برا خالص، بيدّي الـ client اللي اتعمل فوق لكل اللي جواه، فأي [[useQuery]] في الصفحة أو جوه الـ router يلاقي الكاش.`,
            R`[[initialEntries]] قايمة المسارات اللي الـ history بتبدأ بيها، وآخر واحد فيها هو المسار الحالي، فالاختبار يقدر يبدأ من [[/products/1]] مثلًا. و [[{children}]] جواه هو الـ component اللي بنختبره.`,
            R`قفلة [[QueryClientProvider]]: كل اللي جواه بيشوف نفس الكاش.`,
            R`قفلة قوس الـ JSX بتاع [[Wrapper]].`,
            R`[[wrapper]] بيخلي Testing Library تلف الـ [[ui]] بـ [[Wrapper]] لوحدها، حتى لما تنادي [[rerender]] بعدين (لو كنت لفيت بإيدك، [[rerender]] كان هيرسم من غير providers). وبنرجّع كل اللي [[render]] بيرجّعه ومعاه [[queryClient]]، عشان الاختبار يقدر يجهّز الكاش أو يبص فيه.`,
            R`قفلة [[renderWithProviders]].`,
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
            R`[[http]] بيعرّف handler لطلب HTTP بالـ method والمسار، و [[HttpResponse]] بيبني الرد (JSON أو نص أو status)، و [[delay]] بيأخّر الرد عشان يبان زي شبكة حقيقية.`,
            R`array واحدة فيها كل الـ handlers، في ملف لوحده زي [[handlers.ts]]. نفس الـ array بتتسجّل في الاختبارات (Node) وفي المتصفح وقت التطوير، فالـ API الوهمي واحد في المكانين.`,
            R`أي [[GET]] رايح لـ [[/api/products]] من الكود (fetch أو axios) MSW بيمسكه قبل ما يطلع للشبكة وينفذ الدالة دي بداله. الدالة [[async]] عشان هنستنى جواها.`,
            R`يستنى 50ms قبل الرد. من غيره الرد ممكن يوصل بسرعة لدرجة إن حالة [[Loading...]] متتشافش، فاختبار الـ loading ميبقاش مضمون.`,
            R`بيرجّع رد [[200]] جسمه JSON (array فيها منتجين) ومعاه header [[Content-Type: application/json]] لوحده. الكود بتاعك بيعمل [[res.json()]] عادي كأنه سيرفر حقيقي.`,
            R`قفلة handler الـ GET.`,
            R`handler لـ [[POST]] على [[/api/signup]]. الدالة بتاخد object فيه [[request]]، وده [[Request]] عادي زي اللي في fetch، فتقدر تقرا منه الـ body والـ headers.`,
            R`[[request.json()]] بتقرا الـ body اللي الفورم بعته وتحوّله object (async فلازم [[await]]). و [[as { email: string }]] بتقول لـ TypeScript شكله بس، مش بتتأكد منه وقت التشغيل.`,
            R`لو الإيميل ده بالذات، رجّع [[409 Conflict]] وجسم فيه [[fieldErrors]] بنفس شكل أخطاء الـ API الحقيقي. كده الاختبار يتأكد إن الفورم بيقرا الشكل ده ويحط الرسالة تحت الخانة الصح.`,
            R`أي إيميل تاني ينجح: رد [[201 Created]] فيه [[id]] المستخدم الجديد، زي ما الـ API بيرجّع لما يعمل حساب.`,
            R`قفلة handler الـ POST.`,
            R`قفلة الـ array.`,
            R`ده في ملف الـ setup. [[msw/node]] هي النسخة اللي بتشتغل في Node (الاختبارات)، بتمسك الطلبات من جوه الـ process من غير service worker. في المتصفح بتستخدم [[setupWorker]] من [[msw/browser]].`,
            R`بيعمل server وهمي بالـ handlers كلها ([[...]] بتفرد الـ array كـ arguments). مش سيرفر حقيقي ومش بيفتح port؛ بيعترض الطلبات بس.`,
            R`قبل أول اختبار في الملف ابدأ تمسك الطلبات. [[onUnhandledFrame: 'error']] (الاسم في msw 3) بتخلي أي طلب مالوش handler يبقى error واضح، بدل ما يروح للشبكة الحقيقية أو يعدّي بصمت، فتعرف إنك نسيت handler.`,
            R`بعد كل اختبار: [[cleanup]] يمسح الـ DOM، و [[resetHandlers]] يشيل أي handler اتضاف بـ [[server.use]] جوه اختبار ويرجّع الأساسيين. من غيره الـ 500 اللي اختبار حطه هيفضل يبوّظ الاختبارات اللي بعده.`,
            R`بعد آخر اختبار، [[close]] بيبطّل يعترض الطلبات ويرجّع fetch زي ما كان.`,
            R`اختبار حالة الخطأ: عايزين نتأكد إن الصفحة بتعرض رسالة لما الـ API يقع، وده صعب تعمله بسيرفر حقيقي.`,
            R`[[server.use]] بيضيف handler لـ [[/api/products]] قدّام الأساسيين، فبيكسب عليهم لحد [[resetHandlers]] في [[afterEach]]. و [[new HttpResponse(null, { status: 500 })]] رد من غير body بـ status 500، زي سيرفر وقع.`,
            R`نرسم الصفحة بعد ما ظبطنا الـ handler، عشان أول طلب يلاقي الـ 500. ومع [[retry: false]] في الـ wrapper الخطأ يظهر على طول من غير إعادة محاولات.`,
            R`بنستنى عنصر [[role="alert"]] يظهر، ونتأكد إن نصه فيه [[HTTP 500]]، الرسالة اللي [[Products]] بيرميها لما [[res.ok]] يبقى [[false]].`,
            R`قفلة الاختبار.`,
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
            R`[[renderHook]] بيرسم component وهمي صغير بيناديلك الـ hook، فتختبر الـ hook لوحده من غير ما تكتب component. و [[act]] بتلف أي حاجة بتغيّر state، فـ React تطبّق التحديث وتعيد الرسم قبل ما السطر اللي بعدها يتنفذ.`,
            R`[[vi]] فيه [[vi.useFakeTimers()]] اللي بيستبدل [[setTimeout]] بساعة وهمية إنت اللي بتقدّمها، و [[afterEach]] عشان نرجّع الساعة الحقيقية بعد كل اختبار.`,
            R`الاتنين hooks اللي بنختبرهم: [[useCounter]] عداد فيه increment و reset، و [[useDebounce]] بيرجّع القيمة بعد ما تبطّل تتغير فترة معينة.`,
            R`بعد كل اختبار رجّع [[setTimeout]] الحقيقي. لو اختبار شغّل fake timers ونسي، الاختبارات اللي بعده هتستنى ساعة وهمية محدش بيقدّمها وتعلق.`,
            R`اختبار عادي مش [[async]]، لأن تحديثات [[useCounter]] كلها sync ومفيش حاجة نستناها.`,
            R`الدالة اللي بتديها لـ [[renderHook]] بتتنادى جوه الـ component الوهمي مع كل render، فبتنادي الـ hook بالقيمة الأولى 5. و [[result.current]] فيه دايمًا آخر حاجة الـ hook رجّعها.`,
            R`[[increment]] بتغيّر الـ state، فلازم تتنادى جوه [[act]] عشان React تعيد الرسم و [[result.current]] يتحدّث قبل السطر اللي بعده. من غير [[act]] هتلاقي warning والقيمة ممكن تبقى قديمة.`,
            R`بنقرا [[result.current]] من جديد بعد التحديث فنلاقي 6. لو كنت حفظت [[result.current]] في متغير قبل الـ act كان هيفضل شايل القيمة القديمة 5، لأن كل render بيرجّع object جديد.`,
            R`نفس الفكرة: [[reset]] بتغيّر الـ state فبتتنادى جوه [[act]].`,
            R`بعد reset العداد رجع للقيمة الأولى اللي اتبعتت للـ hook (5) مش للصفر، وده بالظبط اللي عايزين نتأكد منه.`,
            R`قفلة الاختبار الأول.`,
            R`اختبار الـ debounce: القيمة لازم متتغيرش غير بعد 500ms من آخر تغيير، والقيم اللي في النص تتلغي ومتظهرش.`,
            R`من هنا [[setTimeout]] اللي جوه [[useDebounce]] مش هيخلص لوحده؛ هيستنى لما إحنا نقدّم الوقت. كده الاختبار سريع ومضمون من غير ما يستنى نص ثانية حقيقية.`,
            R`المرة دي الدالة بتاخد props ([[{ value }]]) وبتبعتها للـ hook. [[initialProps]] هي الـ props في أول render، و [[rerender]] بيرسم تاني بـ props جديدة، زي أب بيبعت قيمة جديدة.`,
            R`كأن المستخدم كتب حرف: الـ hook اتنادى بـ [[ab]]، والـ effect بتاعه لغى الـ timer القديم وبدأ timer جديد.`,
            R`حرف تاني قبل ما الـ 500ms تخلص، فالـ timer اتلغى تاني وبدأ من الأول بالقيمة [[abc]].`,
            R`قدّم الساعة الوهمية 499ms، أقل من المدة بـ 1ms. جوه [[act]] لأن لو timer خلص هيغيّر state.`,
            R`لسه القيمة الأولى [[a]]: الـ timer الأخير لسه مخلصش، والقيم اللي في النص عمرها ما ظهرت.`,
            R`آخر 1ms، فالـ timer بتاع [[abc]] يخلص والـ state جوه الـ hook يتحدّث جوه [[act]].`,
            R`دلوقتي القيمة آخر حاجة اتكتبت بس، و [[ab]] اتلغت ومظهرتش خالص، وده تعريف الـ debounce.`,
            R`قفلة الاختبار.`,
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
            R`دالة الـ business logic بتاعة إنشاء الطلب، مفصولة عن الـ Server Action. بتاخد [[input]] نوعه [[unknown]] (جاي من المستخدم ومحدش ضامن شكله)، و [[deps]] فيها المستخدم الحالي والداتابيز. لأنهم arguments، الاختبار يقدر يبعت بدايل وهمية من غير Next ولا داتابيز حقيقية.`,
            R`لو مفيش مستخدم داخل، ارجع فورًا بـ [[unauthorized]] قبل أي حاجة تانية. [[as const]] بتخلي نوع [[ok]] هو [[false]] بالظبط مش [[boolean]]، فاللي بينادي يقدر يفرّق بين النجاح والفشل في TypeScript.`,
            R`[[safeParse]] بتتأكد من الـ input بنفس الـ zod schema اللي الفورم بيستخدمها، ومبترميش: بترجّع [[success]] ومعاها يا البيانات يا الخطأ.`,
            R`لو البيانات غلط رجّع [[invalid]] ومعاها [[fieldErrors]]: object فيه رسايل الأخطاء لكل خانة (زي [[qty]])، بيطلّعه [[z.flattenError]] من خطأ zod، فالفورم يعرض كل رسالة تحت خانتها.`,
            R`هنا بس بنكتب في الداتابيز، بالبيانات اللي zod نضّفها ([[parsed.data]]) ومعاها [[userId]] من الـ session مش من الـ input، عشان محدش يبعت [[userId]] حد تاني.`,
            R`نجح: رجّع [[ok: true]] و [[id]] الطلب الجديد، عشان الـ Server Action يحوّل لصفحة الطلب مثلًا.`,
            R`قفلة [[placeOrder]].`,
            R`اختبار Vitest عادي بينادي الدالة مباشرة، من غير Next ولا سيرفر ولا متصفح، فبيخلص في مللي ثواني.`,
            R`داتابيز وهمية فيها [[create]] بس كدالة وهمية بتسجّل النداءات، لأن ده كل اللي [[placeOrder]] بتستخدمه من الداتابيز.`,
            R`بيانات سليمة بس [[userId: null]] (ضيف): لازم ترجّع [[unauthorized]] بالظبط. [[toEqual]] بتقارن الـ object بالقيمة مش بالمرجع، فلو اترجّعت خاصية زيادة أو ناقصة الاختبار يفشل.`,
            R`مستخدم داخل بس [[qty: 0]] ومن غير [[productId]]: الـ schema لازم ترفض. بنبص على [[ok]] بس، لأن نص رسايل zod ممكن يتغير ومش هو اللي بنختبره.`,
            R`في الحالتين ولا مرة اتكتب في الداتابيز. ده بيضمن إن الشروط فعلًا بتوقف قبل [[create]]، مش بترجّع خطأ بعد ما الطلب اتعمل.`,
            R`قفلة اختبار Vitest.`,
            R`ده ملف تاني خالص: اختبار Playwright بيشغّل متصفح حقيقي على التطبيق وهو شغال. [[page]] هو الـ tab اللي Playwright بيديهولك، والاختبار ده بيغطي اللي الـ unit test مش بيشوفه: الـ proxy والـ redirect والـ cookies مع بعض.`,
            R`افتح صفحة الدفع من غير ما تعمل login، كأن ضيف كتب اللينك بإيده.`,
            R`[[toHaveURL]] بتستنى (لحد 5 ثواني افتراضيًا) لحد ما عنوان الصفحة يطابق الـ regex، فالتحويل لصفحة الدخول بيتأكد من غير sleep. والـ [[\/]] عشان الشرطة المايلة جوه regex لازم تتعمل escape.`,
            R`قفلة اختبار Playwright.`,
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
