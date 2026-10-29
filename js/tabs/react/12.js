// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "patterns",
      l: 3,
      n: "أشكال بتتكرر في مكتبات الـ UI والكود الحقيقي: compound components، و API بـ value و defaultValue، و ref كـ prop، و URL state، و HTML آمن، و form actions، والـ patterns القديمة",
      items: [
        {
          cmd: "compound components",
          title: "Tabs و Accordion و Select: أجزاء بتشتغل مع بعض من غير props كتير",
          desc: R`الـ compound component مجموعة components صغيرة بتتشارك state من غير ما المستخدم يوصّلها: [[<Tabs>]] و [[<Tabs.List>]] و [[<Tabs.Tab value="a">]] و [[<Tabs.Panel value="a">]]. الأب بيمسك الـ state ويحطها في context، والأجزاء بتقراها. ده الشكل اللي shadcn و Radix و Headless UI مبنيين بيه.

البديل component واحد بياخد [[tabs={[{ label, content, disabled, icon }]}]]، وده بيتكسر أول ما حد يحتاج أيقونة في مكان مختلف أو badge جنب تاب معين. مع الـ compound، المستخدم بيرتّب الأجزاء ويحط اللي هو عايزه بينهم.`,
          example: R`import { createContext, useContext, useId, useState, type ReactNode } from 'react'

type TabsCtx = { active: string; setActive: (v: string) => void; baseId: string }
const Ctx = createContext<TabsCtx | null>(null)
function useTabs() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}
export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue)
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}
Tabs.Tab = function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs()
  return <button role="tab" id={$__bt$__{baseId}-tab-$__{value}$__bt} aria-selected={active === value} aria-controls={$__bt$__{baseId}-panel-$__{value}$__bt} onClick={() => setActive(value)}>{children}</button>
}
Tabs.Panel = function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabs()
  if (active !== value) return null
  return <div role="tabpanel" id={$__bt$__{baseId}-panel-$__{value}$__bt} aria-labelledby={$__bt$__{baseId}-tab-$__{value}$__bt}>{children}</div>
}
// <Tabs defaultValue="orders"><Tabs.List><Tabs.Tab value="orders">Orders</Tabs.Tab><Tabs.Tab value="returns">Returns <Badge>3</Badge></Tabs.Tab></Tabs.List><Tabs.Panel value="orders">...</Tabs.Panel></Tabs>`,
          try: R`استخدم Tabs بتلات تابات، وحط [[<Badge>]] جوه واحد منهم. اختبره بـ Testing Library: [[getByRole('tab', { name: 'Returns 3' })]] ودوس عليه واتأكد إن [[getByRole('tabpanel')]] اتغير. بعدين ضيف تنقل بالأسهم: في [[Tabs.List]] اسمع لـ [[onKeyDown]] و ArrowRight يحرّك للتاب اللي بعده.`,
          flag: "script",
          deep: {
            why: R`مكتبات الـ UI محتاجة مرونة من غير ما الـ API ينفجر. component بـ ٢٠ prop ([[renderTabLabel]] و [[tabClassName]] و [[showBadgeOn]]) صعب يتفهم وصعب يتوسع. الـ compound بيدّي المستخدم JSX عادي يرتّبه زي ما هو عايز، والمنطق (مين active، والـ ids، والـ aria) مخبّي جوه. ولما تستخدم shadcn هتلاقي كل حاجة كده ([[<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>...]])، فلازم تعرف بتشتغل إزاي.`,
            how: R`الأب ([[Tabs]]) صاحب الـ state، وبيحطها في context مع [[setActive]] و [[baseId]]. كل جزء بيقرا بـ [[useTabs()]]، اللي بيرمي error لو اتنده برا [[<Tabs>]]، فأي حد يستخدم [[<Tabs.Tab>]] لوحده يعرف فورًا.

[[Tabs.List = ...]] بيحط الأجزاء كخصائص على الدالة، فالـ import واحد والكتابة [[Tabs.Tab]] بتوضّح إنهم عيلة. shadcn بيصدّرهم أسماء منفصلة ([[TabsList]] و [[TabsTrigger]])، والاتنين نفس الفكرة. وخد بالك: في Next.js، الخصائص على الدالة ممكن تعمل مشكلة لو استخدمتها من Server Component، والأسماء المنفصلة أأمن.

[[useId()]] بيطلّع id فريد وثابت (ونفسه على السيرفر والمتصفح)، فتقدر تربط التاب بالـ panel بـ [[aria-controls]] و [[aria-labelledby]] من غير ما المستخدم يدّيك ids، ولو فيه اتنين Tabs في نفس الصفحة ميتلخبطوش.

الـ roles ([[tablist]] و [[tab]] و [[tabpanel]]) و [[aria-selected]] بيخلوا قارئ الشاشة يقول «tab 2 of 3, selected». و ARIA بيتوقع إن الأسهم تتنقل بين التابات، والـ Tab key يروح للـ panel. ده بالظبط الشغل اللي Radix بيعمله جاهز، وعشان كده في مشروع حقيقي غالبًا هتستخدم Radix أو shadcn بدل ما تكتبه بإيدك.

ولو عايز الأب يتحكم في التاب المختار (يحطه في الـ URL مثلًا)، الـ Tabs محتاج [[value]] و [[onValueChange]] كمان، ودي الدرس الجاي.`,
            when: R`أي widget مكوّن من أجزاء بتتكلم مع بعض: Tabs، و Accordion، و Select، و Menu، و Dialog (Trigger و Content)، و Stepper. ولو بتبني design system لفريق.`,
            mistakes: R`[[React.Children.map]] و [[cloneElement]] عشان تحقن [[isActive]] في كل ابن: بيبوظ أول ما حد يلف التاب في div أو component تاني. و context من غير الـ throw، فاستخدام غلط بيطلع null صامت. و ids ثابتة مكتوبة بإيد ([[id="tab-1"]])، فاتنين Tabs في الصفحة بيتخانقوا. و div بـ onClick بدل button مع role. وتعيد كتابة Tabs كاملة accessible بإيدك في مشروع شغل بدل Radix.`
          },
          teach: R`## الفكرة: الأب بيمسك الـ state، والأجزاء بتقراها من context

[[Tabs]] هنا ٤ components: [[Tabs]] (الأب، صاحب الـ state)، و [[Tabs.List]] (صف التابات)، و [[Tabs.Tab]] (زرار تاب)، و [[Tabs.Panel]] (محتوى تاب). المستخدم بيرتّبهم في JSX زي ما هو عايز، وهم بيتكلموا مع بعض من غير ما يمرر ولا prop بينهم، عن طريق context.

اتشغّل في Vite 8.3 + React 19.3 في Chrome headless (تلات تابات، وجنبهم Tabs تاني في نفس الصفحة)، والاختبار بتاع الـ solCode في Vitest 5 + Testing Library.

---

## ١. القناة المشتركة

~~~text المثال
import { createContext, useContext, useId, useState, type ReactNode } from 'react'

type TabsCtx = { active: string; setActive: (v: string) => void; baseId: string }
const Ctx = createContext<TabsCtx | null>(null)
~~~

- [[type TabsCtx]]: شكل اللي هيتشارك: [[active]] (قيمة التاب المختار)، و [[setActive]] (دالة بتاخد نص ومبترجعش حاجة)، و [[baseId]] (بادئة للـ ids).
- [[createContext<TabsCtx | null>(null)]]: context نوعه «TabsCtx أو null»، وقيمته الافتراضية [[null]]، يعني اللي هيقراه برا أي [[<Tabs>]] هياخد null.

## ٢. hook داخلي بيحمي من الاستخدام الغلط

~~~text المثال
function useTabs() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}
~~~

- [[useContext(Ctx)]]: اقرا أقرب قيمة للـ context ده فوقك في الشجرة.
- [[if (!ctx) throw]]: لو [[null]] (مفيش [[<Tabs>]] فوق)، ارمي error برسالة واضحة.
- ميزة تانية: بعد الـ [[if]]، TypeScript عارف إن [[ctx]] مش null، فاللي بينادي [[useTabs()]] بياخد [[TabsCtx]] على طول.

جرّبنا [[<Tabs.Tab>]] لوحده في اختبار: [[render]] رمى [[Tabs.* must be used inside <Tabs>]] بالظبط.

## ٣. الأب

~~~text المثال
export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue)
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
~~~

- [[useState(defaultValue)]]: التاب المختار، بيبدأ من اللي المستخدم اختاره.
- [[<Ctx value={...}>]]: في React 19 الـ context نفسه بيتكتب كـ provider (قبل كده [[<Ctx.Provider value>]]). أي حد تحته بيقرا القيمة دي.
- [[{ active, setActive, baseId: useId() }]]: object فيه التلاتة. [[{ active }]] اختصار [[{ active: active }]].
- [[useId()]]: بيطلّع id فريد وثابت للـ component ده (نفسه في كل render، ونفسه على السيرفر والمتصفح).

## ٤. الأجزاء كخصائص على الدالة

~~~text المثال
Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}
~~~

- [[Tabs.List = ...]]: الدوال في JavaScript objects، فينفع تحط عليها خصائص. كده [[import { Tabs }]] واحد بيجيب العيلة كلها.
- [[role="tablist"]]: بيقول لقارئ الشاشة «ده صف تابات».

~~~text المثال
Tabs.Tab = function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs()
  return <button role="tab" id={...} aria-selected={active === value} aria-controls={...} onClick={() => setActive(value)}>{children}</button>
}
~~~

- [[useTabs()]]: بيقرا الـ context ويفكه.
- [[role="tab"]] على [[<button>]]: زرار حقيقي (بيتدوس بالكيبورد لوحده)، وقارئ الشاشة بيقوله tab.
- [[id={$__bt$__{baseId}-tab-$__{value}$__bt}]]: template literal بيركّب id زي [[_r_0_-tab-orders]].
- [[aria-selected={active === value}]]: [[true]] لو ده التاب المختار.
- [[aria-controls]]: بيشاور على id الـ panel بتاع التاب ده.
- [[onClick={() => setActive(value)}]]: الضغطة بتغيّر الـ state في الأب، فكل الأجزاء بتعيد الرسم.

~~~text المثال
Tabs.Panel = function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabs()
  if (active !== value) return null
  return <div role="tabpanel" id={...} aria-labelledby={...}>{children}</div>
}
~~~

- [[return null]]: component بيرجّع null = مبيرسمش حاجة.
- [[aria-labelledby]]: اسم الـ panel هو نص التاب اللي الـ id بتاعه هنا.

## ٥. الاستخدام (آخر سطر في المثال)

~~~text المثال
<Tabs defaultValue="orders">
  <Tabs.List>
    <Tabs.Tab value="orders">Orders</Tabs.Tab>
    <Tabs.Tab value="returns">Returns <Badge>3</Badge></Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="orders">...</Tabs.Panel>
</Tabs>
~~~

الـ [[<Badge>]] اتحط جوه تاب واحد بس، من غير أي prop زي [[showBadgeOn]]. ده كل الفايدة.

---

## ٦. اللي اتعرض في الـ DOM

~~~text الناتج (Chrome، بعد الفتح)
tab   _r_0_-tab-orders   aria-selected=true   aria-controls=_r_0_-panel-orders
tab   _r_0_-tab-returns  aria-selected=false  aria-controls=_r_0_-panel-returns
tab   _r_0_-tab-refunds  aria-selected=false  aria-controls=_r_0_-panel-refunds
tab   _r_1_-tab-a        aria-selected=true   aria-controls=_r_1_-panel-a
panel _r_0_-panel-orders labelledby=_r_0_-tab-orders  "orders panel"
panel _r_1_-panel-a      labelledby=_r_1_-tab-a       "second tabs"
~~~

- [[_r_0_]] و [[_r_1_]]: اللي [[useId]] طلّعه لكل [[<Tabs>]]. الاتنين في نفس الصفحة وكل واحد ids بتاعته مختلفة.
- panel واحد بس لكل Tabs في الـ DOM، المختار.
- ملحوظة: [[aria-controls]] بتاع التابات المش مختارة بيشاور على panel مش مرسوم. Radix بيتعامل مع ده، ولو بتكتبه بإيدك ممكن ترسم كل الـ panels وتخبي اللي مش مختار بـ [[hidden]].

بعد دوسة [[Returns 3]]: التاب ده بقى [[aria-selected=true]] والأول false، والـ panel بقى [[_r_0_-panel-returns "returns panel"]]. والـ Tabs التاني متأثرش.

---

## ٧. الأسهم (الـ solCode)

~~~text solCode
function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const tabs = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
  const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
  const step = e.key === 'ArrowRight' ? 1 : -1
  const next = tabs[(i + step + tabs.length) % tabs.length]
  next.focus()
  next.click()
}
~~~

- [[React.KeyboardEvent<HTMLDivElement>]]: نوع حدث كيبورد على div.
- [[e.key]]: اسم الزرار ([['ArrowRight']] و [['ArrowLeft']]). أي زرار تاني: [[return]] ومتعملش حاجة.
- [[e.currentTarget]]: العنصر اللي عليه الـ listener (الـ tablist)، مش الزرار اللي جواه.
- [[querySelectorAll('[role="tab"]')]]: كل التابات جواه. [[[...]]] (spread) بيحوّل الـ NodeList لـ array عادي عشان [[indexOf]].
- [[document.activeElement]]: العنصر اللي عليه الـ focus. و [[as HTMLButtonElement]] بنقول لـ TypeScript نوعه.
- [[(i + step + tabs.length) % tabs.length]]: [[%]] باقي القسمة. بيخلي الرقم يلف: من آخر تاب (2) + 1 = 3، و 3 % 3 = 0 يعني الأول. وزيادة [[tabs.length]] عشان من الأول (0) - 1 ميطلعش سالب.
- [[next.focus()]] و [[next.click()]]: انقل الـ focus واختاره.

~~~text الناتج (Chrome)
click Returns  → selected: returns, focus: "Returns 3"
ArrowRight     → selected: refunds, focus: "Refunds"
ArrowRight     → selected: orders,  focus: "Orders"   (لف للأول)
~~~

## ٨. الاختبار (الـ solCode)

~~~text solCode
it('switches panels', async () => {
  const user = userEvent.setup()
  render(<Tabs defaultValue="orders">...</Tabs>)
  await user.click(screen.getByRole('tab', { name: 'Returns 3' }))
  expect(screen.getByRole('tabpanel')).toHaveTextContent('R')
})
~~~

- [[userEvent.setup()]]: بيعمل «مستخدم» بيدوس ويكتب زي الحقيقي (درس user-event).
- [[getByRole('tab', { name: 'Returns 3' })]]: دوّر على عنصر role بتاعه tab واسمه [[Returns 3]]. الاسم محسوب من كل النص جواه، الكلمة والـ badge.
- [[toHaveTextContent('R')]]: النص جوه الـ panel فيه R.

~~~text الناتج (Vitest)
Tests  2 passed (2)
~~~

(الاختبار التاني اللي ضفناه هو بتاع الـ [[throw]] برا [[<Tabs>]].)

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[Tabs]] | صاحب الـ state، وبيحطها في context |
| [[useTabs()]] | قراية الـ context، و error واضح برا [[<Tabs>]] |
| [[Tabs.Tab]] | زرار [[role="tab"]] و [[aria-selected]]، وبيغيّر الـ state |
| [[Tabs.Panel]] | بيرسم لو هو المختار بس |
| [[useId()]] | ids فريدة تربط التاب بالـ panel |

- المستخدم بيرتّب الأجزاء بنفسه، فمفيش props زي [[renderTabLabel]].
- في مشروع حقيقي: Radix أو shadcn (نفس الفكرة، والكيبورد و RTL جاهزين).`,
          lines: [
            R`بنجيب من React الأدوات اللي الـ pattern ده قايم عليها: [[createContext]] و [[useContext]] عشان الأب يشارك الـ state مع أجزائه من غير ما المستخدم يبعت props بإيده، و [[useId]] يولّد id فريد نربط بيه كل تاب بالـ panel بتاعه، و [[useState]] للتاب المختار. و [[type ReactNode]] نوع بس (بيتمسح وقت الـ build)، وهو نوع أي حاجة تنفع تتحط كـ children.`,
            R`شكل اللي هيتحط في الـ context، يعني اللي كل جزء ([[Tabs.Tab]] و [[Tabs.Panel]]) محتاج يعرفه: [[active]] مين التاب المختار، و [[setActive]] عشان التاب يقدر يغيّره، و [[baseId]] بادئة مشتركة للـ ids. كتابته كـ type بتخلي TypeScript يزعق لو جزء طلب حاجة مش موجودة.`,
            R`بيعمل «القناة» اللي الأب هيبعت فيها والأجزاء هتقرا منها مهما كانوا عميقين جوه الشجرة. القيمة الافتراضية [[null]] مقصودة: اللي يقرا الـ context من غير ما يكون جوه [[<Tabs>]] هياخد [[null]]، وده اللي هنستخدمه تحت عشان نطلّع error واضح بدل ما الكود يشتغل بقيم وهمية.`,
            R`hook داخلي صغير كل الأجزاء بتستخدمه بدل ما كل واحد ينادي [[useContext(Ctx)]] ويعمل الـ check بنفسه. اسمه بيبدأ بـ [[use]] عشان React والـ linter يعاملوه كـ hook ويطبّقوا عليه قواعد الـ hooks.`,
            R`بيقرا قيمة أقرب [[<Ctx value>]] فوق الـ component في الشجرة. ولما القيمة دي تتغير (التاب المختار اتغير)، كل component نادى [[useContext(Ctx)]] بيتعمله re-render لوحده، فالتابات والـ panels بتفضل متفقة مع بعض.`,
            R`لو [[ctx]] طلع [[null]] يبقى حد استخدم [[Tabs.Tab]] أو [[Tabs.Panel]] برّه [[<Tabs>]]. بدل ما يقع بعدين بـ «Cannot read properties of null» ومحدش يفهم ليه، بنرمي رسالة بتقول الغلطة بالظبط وإزاي تتصلح.`,
            R`بيرجّع القيمة. و TypeScript هنا عارف إنها [[TabsCtx]] مش [[null]] (الـ [[if]] اللي فوق شالت الاحتمال ده)، فاللي بيستخدم الـ hook مش محتاج [[?.]] ولا checks.`,
            R`قفلة الـ hook [[useTabs]].`,
            R`الـ component الأب اللي المستخدم بيلف بيه كل حاجة، وهو الوحيد اللي ماسك الـ state. بياخد [[defaultValue]] (التاب اللي يبدأ مختار) و [[children]] (الـ List والتابات والـ panels اللي المستخدم يرتّبهم زي ما هو عايز).`,
            R`state التاب المختار، و [[defaultValue]] بيتقري في أول render بس: لو الأب غيّره بعد كده مش هيأثر، وده معنى «default» (الـ component هو اللي ماسك القيمة، uncontrolled). كل [[setActive]] بتعمل re-render لـ [[Tabs]] ولكل اللي بيقرا الـ context.`,
            R`بيحط [[active]] و [[setActive]] و [[baseId]] في الـ context لكل الأولاد. من React 19 الـ context نفسه بيتكتب كـ provider ([[<Ctx value>]]) بدل [[<Ctx.Provider>]]. و [[useId()]] بيدّي نص فريد وثابت بين الـ renders، فلو فيه أكتر من [[<Tabs>]] في الصفحة الـ ids مش هتتكرر. والـ object ده بيتعمل جديد مع كل render للأب، فكل اللي بيقرا الـ context بيترسم تاني معاه، وده مقبول هنا لأنهم شوية أجزاء صغيرة.`,
            R`قفلة [[Tabs]].`,
            R`بنعلّق component على [[Tabs]] نفسه كـ property، فالمستخدم يكتب [[<Tabs.List>]] ويبان إنه جزء من [[Tabs]] من غير import زيادة، وده الشكل اللي إدّى الـ pattern اسمه «compound». واسم الدالة [[TabsList]] هو اللي بيظهر في React DevTools وفي رسايل الـ errors.`,
            R`بيلف التابات في عنصر بـ [[role="tablist"]]، فقارئ الشاشة يعرف إن الزراير دي مجموعة تابات مش زراير متفرقة. و [[children]] هنا هي الـ [[Tabs.Tab]] اللي المستخدم حطها جواه.`,
            R`قفلة [[TabsList]].`,
            R`زرار تاب واحد. [[value]] هو الاسم اللي بيربطه بالـ panel بتاعه (لازم يبقى نفس الـ [[value]] اللي في [[Tabs.Panel]])، و [[children]] النص اللي بيظهر عليه.`,
            R`بيقرا من الـ context التاب المختار ودالة التغيير والبادئة. ده اللي بيخلي التاب يعرف حالته من غير ما المستخدم يبعتله props، ولما [[active]] تتغير التاب ده بيترسم تاني.`,
            R`زرار بـ [[role="tab"]]. الـ [[id]] مبني من البادئة والـ [[value]] عشان يبقى فريد، و [[aria-selected]] بيقول لقارئ الشاشة هو المختار ولا لأ، و [[aria-controls]] بيشاور على id الـ panel اللي بيتحكم فيها. و [[onClick={() => setActive(value)}]] بيدّي React دالة تتنادى لما المستخدم يدوس؛ لو اتكتبت [[onClick={setActive(value)}]] كانت هتتنادى وقت الرسم نفسه وتغيّر الـ state قبل أي ضغطة.`,
            R`قفلة [[Tab]].`,
            R`المحتوى بتاع تاب واحد. [[value]] لازم يطابق [[value]] التاب بتاعه، وده الربط الوحيد بينهم: المستخدم مش محتاج يوصّلهم ببعض بإيده.`,
            R`بيقرا التاب المختار والبادئة بس، مش محتاج [[setActive]] لأن الـ panel مبتغيّرش حاجة. ولما المستخدم يدوس تاب، القراية دي هي اللي بتخلي الـ panel تترسم تاني وتعرف تظهر ولا تختفي.`,
            R`لو الـ panel دي مش بتاعة التاب المختار بترجّع [[null]]، فمش بيترسم منها حاجة في الـ DOM. خلي بالك: الـ panel اللي بتختفي بيتعملها unmount، فأي state جواها (زي كلام مكتوب في input) بيضيع لما ترجع لها؛ لو عايز تحتفظ بيه ارسمها دايمًا وخبّيها بـ [[hidden]].`,
            R`المحتوى في عنصر بـ [[role="tabpanel"]] و [[id]] هو نفس اللي التاب بيشاور عليه بـ [[aria-controls]]، و [[aria-labelledby]] بيشاور على id التاب، فقارئ الشاشة يقرا اسم التاب كعنوان للمحتوى ده.`,
            R`قفلة [[TabPanel]].`,
          ],
          sol: R`[[getByRole('tab', { name: 'Returns 3' })]] بيلاقي التاب لأن اسمه محسوب من كل النص جواه (الكلمة والـ badge). بعد الضغطة، [[getByRole('tabpanel')]] فيه محتوى returns، و [[aria-selected]] بقت true عليه و false على الأول.

الأسهم: [[onKeyDown]] على الـ tablist بيدوّر على كل [[button[role=tab]]] جواه، ويعرف مين عليه الـ focus، ويعمل [[focus()]] و [[click()]] على اللي بعده (ولو آخر واحد يرجع للأول). وفي RTL الـ ArrowRight المفروض يروح للي قبله، وده من الحاجات اللي Radix بيعملها لوحده بـ [[dir]].`,
          solCode: R`Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const tabs = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    const step = e.key === 'ArrowRight' ? 1 : -1
    const next = tabs[(i + step + tabs.length) % tabs.length]
    next.focus()
    next.click()
  }
  return <div role="tablist" onKeyDown={onKeyDown}>{children}</div>
}

it('switches panels', async () => {
  const user = userEvent.setup()
  render(<Tabs defaultValue="orders"><Tabs.List><Tabs.Tab value="orders">Orders</Tabs.Tab><Tabs.Tab value="returns">Returns <span>3</span></Tabs.Tab></Tabs.List><Tabs.Panel value="orders">O</Tabs.Panel><Tabs.Panel value="returns">R</Tabs.Panel></Tabs>)
  await user.click(screen.getByRole('tab', { name: 'Returns 3' }))
  expect(screen.getByRole('tabpanel')).toHaveTextContent('R')
})`
        },
        {
          cmd: "controlled ولا uncontrolled API",
          title: "component بتاعك يشتغل بـ value و onChange، أو defaultValue لوحده",
          desc: R`[[<input>]] العادي بيشتغل بطريقتين: [[defaultValue]] (هو بيمسك القيمة) أو [[value]] مع [[onChange]] (الأب بيمسكها). الـ components الكويسة بتعمل نفس الحاجة: [[<Toggle defaultChecked />]] لو الأب مش فارق معاه، و [[<Toggle checked={on} onCheckedChange={setOn} />]] لو الأب محتاج القيمة أو عايز يتحكم فيها.

القاعدة: لو [[value]] جت (مش undefined)، الـ component controlled وبيعرضها وبس، وأي تغيير بيروح لـ onChange والأب يقرر. لو مجتش، بيستخدم state داخلية بتبدأ من defaultValue. وده بيتكتب مرة واحدة في hook اسمه عادة [[useControllableState]].`,
          example: R`import { useState } from 'react'

export function useControllableState<T>({ value, defaultValue, onChange }: { value?: T; defaultValue: T; onChange?: (v: T) => void }) {
  const [inner, setInner] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : inner
  function setValue(next: T) {
    if (!isControlled) setInner(next)
    onChange?.(next)
  }
  return [current, setValue] as const
}
type ToggleProps = { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void; label: string }
export function Toggle({ checked, defaultChecked = false, onCheckedChange, label }: ToggleProps) {
  const [on, setOn] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange })
  return <button role="switch" aria-checked={on} onClick={() => setOn(!on)}>{label}</button>
}
// <Toggle label="Wi-Fi" defaultChecked />                        uncontrolled
// <Toggle label="Wi-Fi" checked={wifi} onCheckedChange={setWifi} />  controlled
// <Toggle label="Locked" checked={false} />                       الأب رافض أي تغيير`,
          try: R`استخدم Toggle بالتلات أشكال في صفحة واحدة، ودوس على كل واحد. بعدين اعمل الـ [[Tabs]] من الدرس اللي فات يقبل [[value]] و [[onValueChange]] بنفس الـ hook، وخلي الأب يحط التاب في state ويعرضه. وأخيرًا اعمل Toggle بيبدأ [[checked={undefined}]] وبعدين يبقى true، وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`component بيمسك الـ state بتاعته بس مش هيعرف الأب يتحكم فيه (يفتح الـ accordion من زرار برا، أو يحفظ التاب في الـ URL). و component controlled بس بيجبر كل مستخدم يكتب [[useState]] حتى لو مش محتاجها. الاتنين مع بعض هو الـ API اللي Radix و shadcn و MUI بيستخدموه، وبيسألوا عليه في انترفيوهات الـ frontend.`,
            how: R`[[isControlled]] بيتحسب كل render: [[value !== undefined]]. controlled: الـ component بيعرض [[value]] ومبيلمسش state داخلية، و [[setValue]] بينادي [[onChange]] بس. لو الأب محدّثش الـ state (زي «Locked»)، القيمة مبتتغيرش، زي [[<input value="x">]] من غير onChange بالظبط. uncontrolled: بيحدّث [[inner]] وبينادي onChange لو موجودة (عشان الأب يعرف من غير ما يتحكم).

التسمية المتعارف عليها: [[value]] و [[defaultValue]] و [[onValueChange]]، أو [[checked]] و [[defaultChecked]] و [[onCheckedChange]]، أو [[open]] و [[defaultOpen]] و [[onOpenChange]]. الـ [[onXChange]] بتاخد القيمة الجديدة نفسها مش event.

التحويل من uncontrolled لـ controlled وهو شغال (value كانت undefined وبقت قيمة) مشكلة: الـ state الداخلية كانت ماشية لوحدها وفجأة اتجاهلت. React بتحذّر في [[<input>]] من ده، والمكتبات بتطبع warning زيه. القرار بيتاخد مرة في أول render: الأب يبعت [[value]] دايمًا (حتى لو [[false]] أو [['']]) أو ميبعتهاش أبدًا.

و [[defaultValue]] بيتقري مرة واحدة: لو غيّرته بعدين مش هيحصل حاجة، زي [[useState(initial)]]. عشان تعمل reset لقيمة جديدة، غيّر الـ [[key]].`,
            when: R`أي component قابل لإعادة الاستخدام بيمسك قيمة: inputs مخصوصة، و toggles، و tabs، و accordions، و dialogs (open)، و selects، و date pickers. في component بتستخدمه مرة في صفحة واحدة، مش محتاج الاتنين.`,
            mistakes: R`[[value ?? inner]] بدل [[value !== undefined]]: [[null]] من الأب بتتعامل كـ «مش controlled». و component بينسخ [[value]] في state داخلية ([[useState(value)]]) ويحاول يزامنها بـ effect: القيمتين بيختلفوا. و [[onChange]] مبيتناداش في الـ uncontrolled mode، فالأب ميعرفش. و [[value={user?.name}]] بتبدأ undefined وبعدين نص، فالـ component بيتحوّل من uncontrolled لـ controlled. وسؤال انترفيو: «صمم API لـ Accordion» والإجابة الكويسة فيها compound components مع open و defaultOpen و onOpenChange.`
          },
          teach: R`## الفكرة: hook واحد بيقرر مين صاحب القيمة

[[useControllableState]] بيشتغل زي [[useState]]، بس بيبص الأول: الأب بعت [[value]]؟ يبقى الأب هو صاحب القيمة (controlled) والـ component بيعرضها وبس. مبعتش؟ يبقى الـ component بيمسكها بنفسه (uncontrolled) بادئًا من [[defaultValue]]. و [[Toggle]] مثال بيستخدمه.

اتشغّل في Vitest 5 + Testing Library + user-event (React 19.3): الـ ٣ toggles اللي في التعليقات في صفحة واحدة، وحالة التحويل من undefined لـ true، و Tabs controlled من الـ solCode.

---

## ١. الـ hook

~~~text المثال
export function useControllableState<T>({ value, defaultValue, onChange }: { value?: T; defaultValue: T; onChange?: (v: T) => void }) {
~~~

- [[<T>]]: generic. [[T]] اسم لنوع لسه مش معروف، بيتحدد من الاستخدام: مع Toggle بيبقى [[boolean]]، مع Tabs [[string]]. فالـ hook واحد لأي نوع.
- [[value?: T]]: الـ [[?]] يعني الـ prop اختيارية، ممكن تبقى [[undefined]].
- [[onChange?: (v: T) => void]]: دالة اختيارية بتاخد القيمة الجديدة.

~~~text المثال
const [inner, setInner] = useState(defaultValue)
const isControlled = value !== undefined
const current = isControlled ? value : inner
~~~

- [[inner]]: state داخلية. موجودة دايمًا (الـ hooks لازم تتنادى بنفس الترتيب كل render)، بس مستخدمة في الوضع الـ uncontrolled بس.
- [[value !== undefined]]: ده التعريف بالظبط. [[false]] و [[0]] و [['']] كلهم قيم، يعني controlled. [[undefined]] بس معناها «الأب مش بيتحكم».
- [[current]]: اللي هيتعرض: قيمة الأب، أو الداخلية.

~~~text المثال
function setValue(next: T) {
  if (!isControlled) setInner(next)
  onChange?.(next)
}
return [current, setValue] as const
~~~

- [[if (!isControlled) setInner(next)]]: في الـ uncontrolled بس حدّث الداخلية. في الـ controlled ملناش دعوة، الأب هو اللي يقرر.
- [[onChange?.(next)]]: [[?.]] مع دالة: ناديها لو موجودة، ولو [[undefined]] متعملش حاجة. وبتتنادى في الحالتين، عشان الأب يعرف حتى لو مش متحكم.
- [[as const]]: من غيرها TypeScript هيفهم الـ array إنها «array فيها T أو دالة» من غير ترتيب. [[as const]] بيخليها tuple: الأول [[T]] والتاني دالة، زي [[useState]] بالظبط.

## ٢. Toggle

~~~text المثال
type ToggleProps = { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void; label: string }
export function Toggle({ checked, defaultChecked = false, onCheckedChange, label }: ToggleProps) {
  const [on, setOn] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange })
  return <button role="switch" aria-checked={on} onClick={() => setOn(!on)}>{label}</button>
}
~~~

- الأسماء المتعارف عليها: [[checked]] و [[defaultChecked]] و [[onCheckedChange]] (زي Radix).
- [[defaultChecked = false]]: قيمة افتراضية للـ prop لو مجتش.
- بنترجم أسماء Toggle لأسماء الـ hook: [[value: checked]] إلخ.
- [[role="switch"]] و [[aria-checked]]: قارئ الشاشة بيقول «Wi-Fi, switch, on».
- [[setOn(!on)]]: [[!]] بيقلب الـ boolean.

## ٣. التلات استخدامات (التعليقات)

~~~text المثال
<Toggle label="Wi-Fi" defaultChecked />                        uncontrolled
<Toggle label="Wi-Fi" checked={wifi} onCheckedChange={setWifi} />  controlled
<Toggle label="Locked" checked={false} />                       الأب رافض أي تغيير
~~~

[[defaultChecked]] لوحدها من غير قيمة = [[defaultChecked={true}]]. رسمناهم في صفحة واحدة (الأول اسمه Free عشان نفرّقهم، والأب عنده [[wifi]] state) ودوسنا على كل واحد:

~~~text الناتج (Vitest)
start          Free=true  Wi-Fi=false Locked=false
click Free     Free=false Wi-Fi=false Locked=false
click Wi-Fi    Free=false Wi-Fi=true  Locked=false
click Locked   Free=false Wi-Fi=true  Locked=false
parent wifi=false | parent wifi=true | Locked asked true
~~~

- Free: اتقلب لوحده، والأب معملش render (في الـ log [[parent wifi]] اتطبع مرتين بس: أول مرة، وبعد دوسة Wi-Fi).
- Wi-Fi: الدوسة نادت [[setWifi(true)]]، الأب اترسم بـ [[wifi=true]]، وبعت [[checked={true}]].
- Locked: الدوسة نادت onCheckedChange بـ [[true]] ([[Locked asked true]]، ضفنا الدالة دي للتجربة)، بس الأب مغيّرش حاجة، فالقيمة فضلت false. زي [[<input value="x">]] من غير onChange.

## ٤. من undefined لـ true

Toggle بـ [[checked={c}]] و [[c]] بتبدأ [[undefined]]، وزرار في الأب بيخليها [[true]]:

~~~text الناتج (Vitest)
uncontrolled click -> true
again -> false
parent sends true -> true
click (controlled, no onChange) -> true
~~~

- أول دوستين: uncontrolled، اتقلب عادي.
- الأب بعت [[true]]: الـ component بقى controlled وبيعرض قيمة الأب، والـ [[inner]] اتنست.
- الدوسة بعدها: مفيش تغيير، لأن مفيش onChange والأب ماسك [[true]].

مفيش crash، بس الـ component غيّر سلوكه في النص. عشان كده القرار يتاخد من أول render: [[value]] دايمًا أو أبدًا.

---

## ٥. Tabs controlled (الـ solCode)

~~~text solCode
export function Tabs({ value, defaultValue = '', onValueChange, children }: {
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children: ReactNode
}) {
  const [active, setActive] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
~~~

نفس Tabs بتاع درس compound components، بس [[useState(defaultValue)]] اتبدلت بالـ hook، والباقي (الـ context والأجزاء) زي ما هو. و [[T]] هنا [[string]].

~~~text solCode
function OrdersPage() {
  const [tab, setTab] = useState('orders')
  return <Tabs value={tab} onValueChange={setTab}>...</Tabs>
}
~~~

[[onValueChange={setTab}]]: الـ setter نفسه بياخد القيمة الجديدة، فبيتبعت على طول. ضفنا [[<output>{tab}</output>]] ودوسنا Returns:

~~~text الناتج (Vitest)
parent state: returns selected: Returns
~~~

الأب عارف التاب المختار، ويقدر يحطه في الـ URL مثلًا (درس URL state).

---

## الخلاصة

| الأب بعت | الوضع | الضغطة بتعمل |
|---|---|---|
| [[defaultValue]] بس | uncontrolled | تحدّث الداخلية + تنادي onChange لو موجودة |
| [[value]] + [[onChange]] | controlled | تنادي onChange، والأب يحدّث |
| [[value]] من غير onChange | controlled ثابت | ولا حاجة تتغير |

- [[value !== undefined]] هو الاختبار، مش [[??]].
- [[defaultValue]] بيتقري مرة واحدة. ولـ reset غيّر الـ [[key]].
- التسمية: [[value / defaultValue / onValueChange]]، و [[checked]] و [[open]] بنفس الشكل.`,
          lines: [
            R`[[useState]] هو اللي هيشيل القيمة لما الأب ميبعتش [[value]]، يعني الوضع الـ uncontrolled اللي الـ component فيه ماسك القيمة بنفسه.`,
            R`hook عام ينفع لأي component (Toggle و Tabs و Select...) عايز يشتغل بالطريقتين زي [[<input>]] العادي. [[<T>]] generic عشان القيمة تبقى boolean أو string أو أي نوع. [[value]] و [[onChange]] اختياريين (عليهم [[?]])، و [[defaultValue]] إجباري عشان دايمًا يبقى فيه قيمة نبدأ بيها.`,
            R`القيمة الداخلية، بتبدأ من [[defaultValue]] في أول render بس. بيتنادى دايمًا حتى لو الـ component controlled، لأن الـ hooks لازم تتنادى بنفس الترتيب في كل render، فمينفعش يتحط جوه [[if]].`,
            R`لو الأب بعت [[value]] (حتى لو [[false]] أو [[0]]) يبقى هو اللي ماسك القيمة. بنقارن بـ [[undefined]] مش بـ [[!value]] لأن [[false]] قيمة حقيقية لـ Toggle مقفول. وبيتحسب كل render، فمتخليش الأب يبدّل بين إنه يبعت [[value]] وميبعتهاش في نص عمر الـ component، زي ما React بيحذّر في الـ input.`,
            R`القيمة اللي هتتعرض فعلًا: لو controlled بتاعة الأب، غير كده الداخلية. في الوضع الـ controlled الـ [[inner]] بتفضل موجودة بس محدش بيبص عليها.`,
            R`الدالة اللي الـ component هينادي عليها لما المستخدم يغيّر حاجة، بدل ما ينادي [[setInner]] أو [[onChange]] مباشرة ويحتار هو في أنهي وضع.`,
            R`في الوضع الـ uncontrolled بس بنحدّث القيمة الداخلية فيحصل re-render. في الوضع الـ controlled مبنلمسهاش: الأب هو اللي يقرر يغيّر [[value]] ولا لأ، ولو مغيّرهاش الشاشة مش هتتغير، زي input بـ [[value]] من غير [[onChange]].`,
            R`بنبلّغ الأب بالقيمة الجديدة في الحالتين. [[?.]] لأن [[onChange]] اختياري: لو الأب مبعتهوش مبنناديش حاجة، بدل ما نرمي «onChange is not a function».`,
            R`قفلة [[setValue]].`,
            R`بيرجّع array بنفس شكل [[useState]] (القيمة وبعدها دالة التغيير)، فالـ component يستخدمه كأنه useState عادي. [[as const]] بيخلي TypeScript يعرف إنه tuple: الأول [[T]] والتاني دالة، بدل array كل عنصر فيها نوعه خليط من الاتنين.`,
            R`قفلة الـ hook.`,
            R`الـ props بالأسماء اللي مكتبات زي Radix متعودة عليها: [[checked]] للـ controlled، و [[defaultChecked]] للـ uncontrolled، و [[onCheckedChange]] للتبليغ، و [[label]] النص. نفس التسمية بتخلي اللي بيستخدم الـ component يفهمه من غير ما يقرا الكود.`,
            R`الـ component نفسه. [[defaultChecked = false]] قيمة افتراضية لو الأب مبعتش لا [[checked]] ولا [[defaultChecked]]، فالـ Toggle يبدأ مقفول.`,
            R`بيترجم أسماء الـ Toggle لأسماء الـ hook ([[checked]] تبقى [[value]] وهكذا) وياخد [[on]] و [[setOn]]. كده منطق «مين ماسك القيمة» اتكتب مرة واحدة في الـ hook، والـ Toggle بيستخدمه كأنه useState.`,
            R`زرار بـ [[role="switch"]] و [[aria-checked]]، فقارئ الشاشة يقول إنه switch شغال أو مقفول بدل «button» وبس. و [[onClick]] بياخد دالة بتقلب القيمة الحالية؛ في الوضع الـ controlled ده بينادي [[onCheckedChange]] بس والأب يقرر.`,
            R`قفلة [[Toggle]].`,
          ],
          sol: R`الـ uncontrolled بيتقلب لوحده. الـ controlled بيتقلب لأن الأب بيحدّث [[wifi]]، ولو حطيت [[console.log(wifi)]] في الأب هتشوفه بيتغير. الـ Locked مبيتقلبش أبدًا: الضغطة بتنادي onCheckedChange (مش موجودة) والقيمة جاية من الأب ثابتة false. (ده متجرّب في اختبار بـ user-event.)

Tabs controlled: [[const [value, setValue] = useControllableState({ value: props.value, defaultValue: props.defaultValue ?? '', onChange: props.onValueChange })]] وبعدين تحط [[value]] و [[setValue]] في الـ context بدل الـ useState.

التحويل من undefined لـ true: أول render كان uncontrolled، ولو المستخدم داس القيمة الداخلية اتغيرت، وبعدين الأب بعت true فالـ component بقى يعرض true ويتجاهل الداخلية. مفيش crash، بس السلوك مربك، وده سبب الـ warning في المكتبات.`,
          solCode: R`export function Tabs({ value, defaultValue = '', onValueChange, children }: {
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children: ReactNode
}) {
  const [active, setActive] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
// الأب:
function OrdersPage() {
  const [tab, setTab] = useState('orders')
  return <Tabs value={tab} onValueChange={setTab}>...</Tabs>
}`
        },
        {
          cmd: "ref كـ prop",
          title: "الأب يوصل لـ input جوه component بتاعك، أو لدوال بتعرّفها انت",
          desc: R`في React 19 الـ [[ref]] بقى prop عادي في الـ function components: [[function TextField({ ref, ...props })]] وتحطه على الـ [[<input>]]، والأب يكتب [[<TextField ref={inputRef} />]]. [[forwardRef]] مبقاش محتاج (لسه شغال في الكود القديم، وهيتشال في نسخة جاية).

ولو عايز الأب ياخد دوال مش العنصر نفسه ([[play()]] و [[pause()]] بدل الـ [[<video>]] كله)، [[useImperativeHandle(ref, () => ({ play, pause }))]] بيحدد إيه اللي يوصل للأب.`,
          example: R`import { useImperativeHandle, useRef, type Ref, type ComponentProps } from 'react'

export function TextField({ label, ref, ...props }: { label: string; ref?: Ref<HTMLInputElement> } & ComponentProps<'input'>) {
  return <label>{label} <input ref={ref} {...props} /></label>
}
export function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  return <><TextField label="Search" ref={inputRef} /><button onClick={() => inputRef.current?.focus()}>Focus search</button></>
}
export type VideoHandle = { play: () => void; pause: () => void }
export function Video({ src, ref }: { src: string; ref?: Ref<VideoHandle> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useImperativeHandle(ref, () => ({
    play: () => { void videoRef.current?.play() },
    pause: () => videoRef.current?.pause(),
  }), [])
  return <video ref={videoRef} src={src} />
}
// القديم (React 18): const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => ...)`,
          try: R`اعمل TextField و SearchPage ودوس الزرار: الـ focus يروح للخانة. بعدين استخدمه مع react-hook-form: [[<TextField label="Email" {...register('email')} />]]، وابعت الفورم فاضي: RHF بيعمل focus على أول خانة غلط، وده شغال بس لأن الـ ref وصل للـ input. شيل [[ref={ref}]] من الـ input وجرّب تاني.`,
          flag: "script",
          deep: {
            why: R`الـ components المخصوصة (TextField و Select و Button في design system) لازم تتصرف زي العناصر العادية: RHF بيسجّل الخانة بالـ ref، والـ modal بيعمل focus على أول خانة، والـ tooltip محتاج يقيس الزرار. لو الـ component بلع الـ ref، كل ده بيبوظ. وأحيانًا مش عايز تدّي الأب العنصر كله (يقدر يغيّر أي حاجة فيه)، فبتدّيله API صغير.`,
            how: R`قبل React 19، [[ref]] و [[key]] كانوا props خاصة: React بتشيلهم قبل ما توصل للـ component، فكان لازم [[forwardRef((props, ref) => ...)]] عشان تستلمه كـ argument تاني. في React 19 الـ ref بيوصل مع الـ props عادي (الـ key لسه خاص). و TypeScript: [[Ref<HTMLInputElement>]]، و [[ComponentProps<'input'>]] بيجيب كل props الـ input (بما فيها ref) عشان الـ spread.

لما الأب يبعت [[useRef]] object، React بتحط العنصر في [[current]] بعد الـ commit وترجّعه null لما يتشال. ولو بعت دالة (callback ref)، React بتناديها بالعنصر، وفي React 19 الدالة دي ممكن ترجّع cleanup بيتنادى لما العنصر يتشال.

[[useImperativeHandle(ref, create, deps)]] بيحط اللي [[create()]] رجّعه في ref الأب بدل العنصر. الـ deps زي useMemo: [[[]]] هنا لأن الدوال بتقرا [[videoRef.current]] وقت النداء. و [[void]] قبل [[play()]] عشان play بترجّع promise (ممكن تترفض لو المتصفح منع التشغيل التلقائي) ومش عايزين linter يشتكي.

الـ imperative handle استثناء: أغلب الحاجات تتعمل بـ props ([[<Video playing={true}>]] مع effect جوه). استخدمه للحاجات اللي هي «أفعال» مش «حالة»: focus، و scrollIntoView، و play مرة، و reset لفورم.`,
            when: R`أي component بيلف عنصر HTML في design system (Input و Button و Textarea) لازم يمرر الـ ref. و useImperativeHandle لـ widgets فيها أفعال: player، ومحرر نصوص (insertText)، و canvas (clear)، و list (scrollToIndex).`,
            mistakes: R`component بيلف input وميمررش الـ ref، فـ RHF ميعرفش يعمل focus ولا يقرا القيمة. و [[forwardRef]] في كود React 19 جديد (شغال بس ملوش لازمة). و useImperativeHandle لكل حاجة بدل props، فالـ component بقى API أوامر صعب يتفهم. وتقرا [[ref.current]] وقت render الأب وتلاقيه null. وتبعت [[ref]] لـ function component في React 18 من غير forwardRef، فبيبقى null مع warning.`
          },
          teach: R`## الفكرة: الـ ref بقى prop عادي

في React 19، [[ref]] اللي الأب بيبعته بيوصل للـ function component جوه الـ props زي أي prop. فالـ component بيمرره للعنصر الحقيقي ([[<input>]])، والأب يوصل للعنصر ده. والمثال فيه حالتين: [[TextField]] بيدّي الأب الـ input نفسه، و [[Video]] بيدّيه دالتين بس ([[play]] و [[pause]]) بـ [[useImperativeHandle]].

اتشغّل في Vite 8.3 + React 19.3 + react-hook-form 7.89 + zod 4.6 في Chrome headless: الصفحة فيها SearchPage و SignupForm و Player من الـ solCode. مرة بالكود زي ما هو، ومرة شلنا [[ref={ref}]] من الـ input.

---

## ١. الـ imports

~~~text المثال
import { useImperativeHandle, useRef, type Ref, type ComponentProps } from 'react'
~~~

- [[Ref<T>]]: نوع أي ref ممكن يتبعت لعنصر نوعه T: object من [[useRef]] أو دالة (callback ref).
- [[ComponentProps<'input'>]]: نوع كل الـ props اللي [[<input>]] بياخدها ([[value]] و [[onChange]] و [[name]] و [[placeholder]] ...).

## ٢. TextField

~~~text المثال
export function TextField({ label, ref, ...props }: { label: string; ref?: Ref<HTMLInputElement> } & ComponentProps<'input'>) {
  return <label>{label} <input ref={ref} {...props} /></label>
}
~~~

- [[{ label, ref, ...props }]]: خد [[label]] و [[ref]] لوحدهم، و [[...props]] (rest) = كل الباقي في object واحد.
- [[&]] بين نوعين: intersection، يعني الـ props لازم يبقى فيها الاتنين: [[label]] و [[ref]]، وكل props الـ input.
- [[ref={ref}]]: هنا كل الشغل. الـ ref اللي جه من الأب اتحط على الـ input الحقيقي.
- [[{...props}]]: spread: حط كل الـ props الباقية على الـ input (name و onChange و onBlur ...).
- [[<label>]] حوالين النص والخانة: بيربطهم، فالضغط على الكلمة بيعمل focus للخانة، واسم الخانة لقارئ الشاشة هو [[Search]].

## ٣. SearchPage

~~~text المثال
const inputRef = useRef<HTMLInputElement>(null)
return <><TextField label="Search" ref={inputRef} /><button onClick={() => inputRef.current?.focus()}>Focus search</button></>
~~~

- [[useRef<HTMLInputElement>(null)]]: ref هيشيل عنصر input، وبيبدأ [[null]].
- [[ref={inputRef}]]: بيتبعت لـ TextField زي أي prop.
- [[inputRef.current?.focus()]]: بعد الرسم، [[current]] فيه الـ input اللي جوه TextField.

~~~text الناتج (Chrome)
after Focus search, focus in: Search
~~~

الـ focus راح للخانة اللي في الـ label بتاع [[Search]].

---

## ٤. Video و [[useImperativeHandle]]

~~~text المثال
export type VideoHandle = { play: () => void; pause: () => void }
export function Video({ src, ref }: { src: string; ref?: Ref<VideoHandle> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
~~~

- [[VideoHandle]]: شكل اللي الأب هياخده: دالتين بس.
- [[ref?: Ref<VideoHandle>]]: الـ ref اللي جاي من الأب نوعه VideoHandle، مش [[HTMLVideoElement]].
- [[videoRef]]: ref داخلي للـ [[<video>]] الحقيقي، محدش برا يشوفه.

~~~text المثال
useImperativeHandle(ref, () => ({
  play: () => { void videoRef.current?.play() },
  pause: () => videoRef.current?.pause(),
}), [])
~~~

- [[useImperativeHandle(ref, create, deps)]]: بدل ما React تحط عنصر في ref الأب، بتحط فيه اللي [[create()]] رجّعته.
- [[() => ({ ... })]]: القوسين حوالين الـ object عشان الـ arrow ترجّعه (من غيرهم الـ [[{]] تبقى جسم دالة).
- [[videoRef.current?.play()]]: [[play()]] بتاعة الـ video بترجّع promise. [[void]] قدامها معناها «أنا عارف إنها بترجّع promise ومش هستناها»، عشان أدوات الـ lint متشتكيش. بس [[void]] **مبيمسكش** الخطأ: في التجربة الملف [[/intro.mp4]] مش موجود، والصفحة طلّعت [[pageerror: The element has no supported sources.]] (promise اترفضت ومحدش مسكها). لو عايز تسكّتها: [[videoRef.current?.play().catch(() => {})]].
- [[[]]]: الـ deps. الدوال بتقرا [[videoRef.current]] وقت النداء، فمش محتاجين نعيد عملها.

~~~text solCode
function Player() {
  const ref = useRef<VideoHandle>(null)
  return <><Video src="/intro.mp4" ref={ref} /><button onClick={() => ref.current?.play()}>Play</button></>
}
~~~

~~~text الناتج (Chrome)
player ref keys: play,pause | is video element? false
~~~

[[ref.current]] في الأب فيه [[play]] و [[pause]] بس، ومش عنصر [[<video>]]. الأب ميقدرش يغيّر [[src]] ولا يقرا [[currentTime]] من برا.

---

## ٥. مع react-hook-form (الـ solCode)

~~~text solCode
const { register, handleSubmit } = useForm<{ email: string }>({ resolver: zodResolver(z.object({ email: z.email() })) })
...
<form onSubmit={handleSubmit(console.log)} noValidate>
  <TextField label="Email" {...register('email')} />
  <button>Send</button>
</form>
~~~

- [[register('email')]] بيرجّع object فيه [[name]] و [[onChange]] و [[onBlur]] و **[[ref]]**. الـ spread بيبعتهم كلهم لـ TextField، والـ ref بيوصل للـ input عن طريق [[ref={ref}]].
- [[z.email()]]: schema في zod 4 بتقول «نص شكله إيميل».
- [[noValidate]]: اقفل validation المتصفح نفسه، سيبها لـ zod.
- [[<button>]] جوه فورم من غير [[type]] = submit.

ضفنا [[<p>{errors.email?.message}</p>]] عشان نشوف الخطأ:

~~~text الناتج (بالـ ref)
submit empty:   focus in: Email | error: Invalid email address
typed a@b.com:  console.log: submitted {"email":"a@b.com"}
~~~

~~~text الناتج (من غير ref={ref} على الـ input)
after Focus search, focus in: BUTTON
submit empty:   focus in: BUTTON | error: Invalid input: expected string, received undefined
typed a@b.com:  error: Invalid input: expected string, received undefined
~~~

- بالـ ref: الفورم الفاضي حط الـ focus على الخانة الغلط لوحده، والإيميل الصح اتبعت.
- من غيره: زرار Focus search معملش حاجة (الـ focus فضل على الزرار)، و RHF مش عارف الخانة أصلًا: قرا القيمة [[undefined]] حتى بعد ما كتبنا [[a@b.com]]، والفورم مش بيتبعت خالص.

---

## ٦. القديم: [[forwardRef]]

~~~text المثال
// القديم (React 18): const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => ...)
~~~

قبل React 19، React كانت بتشيل [[ref]] من الـ props، فكان لازم تلف الـ component في [[forwardRef]] عشان تاخد الـ ref كـ argument تاني. هتلاقيه في أي كود قديم وفي مكتبات كتير.

---

## الخلاصة

| عايز الأب ياخد | تكتب |
|---|---|
| العنصر نفسه | [[ref]] في الـ props وتحطه على العنصر: [[<input ref={ref} />]] |
| دوال بتختارها انت | [[useImperativeHandle(ref, () => ({ ... }), [])]] |
| (كود React 18) | [[forwardRef((props, ref) => ...)]] |

- أي component بيلف input أو button في design system لازم يمرر الـ ref، وإلا RHF والـ focus بيبوظوا.
- [[void]] بيسكّت الـ linter بس، مبيمسكش الـ promise اللي بتترفض.`,
          lines: [
            R`[[useRef]] بيعمل ref يمسك عنصر DOM، و [[useImperativeHandle]] بيخلي الـ ref اللي الأب بعته يشاور على object إنت اللي بتختاره بدل العنصر. و [[Ref]] نوع الـ ref اللي جاي كـ prop، و [[ComponentProps<'input'>]] نوع كل الـ props بتاعة [[<input>]] العادي.`,
            R`من React 19 الـ [[ref]] بيوصل للـ function component كـ prop عادي، فمش محتاج [[forwardRef]]. بنفصل [[label]] و [[ref]]، والباقي ([[placeholder]] و [[onChange]] و [[type]]...) بيتجمّع في [[props]]. والنوع [[& ComponentProps<'input'>]] بيخلي TextField يقبل أي prop بيقبلها الـ input.`,
            R`بنحط الـ [[ref]] على الـ [[<input>]] الحقيقي، فالأب لما يقرا [[ref.current]] يلاقي عنصر الـ input نفسه. [[{...props}]] بتوزّع باقي الـ props عليه. والـ [[<label>]] اللي لافف الـ input بيربط النص بيه، فالضغط على النص بيعمل focus وقارئ الشاشة بيقرا الاسم.`,
            R`قفلة [[TextField]].`,
            R`الأب اللي محتاج يوصل لعنصر الـ input اللي جوه [[TextField]] عشان يعمل له focus، وده حاجة الـ props العادية متعرفش تعملها.`,
            R`بيعمل object شكله [[{ current: null }]] وثابت بين الـ renders. React بيحط فيه عنصر الـ input بعد ما يترسم في الـ DOM، ويرجّعه [[null]] لما يتشال. وتغيير [[current]] مبيعملش re-render.`,
            R`الأب بيبعت الـ ref لـ TextField زي أي prop. والزرار بياخد دالة بتنادي [[focus()]] على الـ input وقت الضغطة؛ [[?.]] لأن [[current]] ممكن يبقى [[null]] لو الـ input لسه مترسمش أو اتشال. و [[<>]] Fragment بيرجّع العنصرين من غير ما يزوّد عنصر في الـ DOM.`,
            R`قفلة [[SearchPage]].`,
            R`الشكل اللي الأب هيلاقيه في [[ref.current]]: دالتين بس. بدل ما نسلّمه عنصر [[<video>]] كله (يقدر يغيّر [[src]] أو يشيله)، بنسلّمه الأفعال اللي إحنا سامحين بيها.`,
            R`component بياخد [[ref]] نوعه [[Ref<VideoHandle>]]، يعني الأب هيعمل [[useRef<VideoHandle>(null)]] وينادي [[ref.current?.play()]] من غير ما يعرف حاجة عن عنصر الـ video.`,
            R`ref داخلي بيمسك عنصر الـ [[<video>]] الحقيقي، ومحدش برّه الـ component بيشوفه. ده اللي الدوال اللي تحت هتستخدمه.`,
            R`بيقول لـ React: «اللي هيتحط في [[ref.current]] بتاع الأب هو الـ object اللي الدالة دي بترجّعه، مش عنصر DOM». React بيحطه بعد الرسم ويرجّعه [[null]] لما الـ component يتشال.`,
            R`[[play()]] بتاعة الـ video بترجّع Promise (ممكن تترفض لو المتصفح منع التشغيل من غير تفاعل). [[void]] بيقول صراحةً إننا مش مستنيينها، فالـ linter ([[no-floating-promises]]) ميشتكيش، والأقواس [[{ }]] بتخلي الدالة ترجّع [[undefined]] زي ما النوع قايل.`,
            R`[[pause()]] بتوقف الفيديو ومبترجّعش Promise، فمش محتاجة [[void]]. و [[?.]] عشان لو الـ video مش موجود متقعش.`,
            R`قفلة الـ object والدالة، والـ dependency array الفاضية بتخلي الـ handle يتعمل مرة واحدة بدل ما يتبني تاني مع كل render. ده آمن لأن [[videoRef]] نفسه ثابت؛ لو الدوال بتستخدم props بتتغير لازم تحطها في الـ deps، وإلا هتشتغل بالقيم القديمة.`,
            R`عنصر الـ video الحقيقي، والـ ref المتعلّق عليه هو الداخلي [[videoRef]]، مش الـ [[ref]] اللي جاي من الأب.`,
            R`قفلة [[Video]].`,
          ],
          sol: R`الزرار بيحط الـ focus في الخانة ([[toHaveFocus]] في اختبار). مع RHF والفورم فاضي والخانة required في الـ schema، أول خانة غلط بياخدها الـ focus لوحدها. من غير [[ref={ref}]] على الـ input: الـ focus مش بيحصل، والأسوأ إن RHF مش بيقرا القيمة من الخانة خالص، فالـ validation بيقول إنها فاضية حتى لو كتبت فيها.

والـ Video: [[ref.current]] في الأب فيه [[play]] و [[pause]] بس، مش الـ [[<video>]]، فالأب مش هيقدر يغيّر [[src]] مثلًا من برا.`,
          solCode: R`function SignupForm() {
  const { register, handleSubmit } = useForm<{ email: string }>({ resolver: zodResolver(z.object({ email: z.email() })) })
  return (
    <form onSubmit={handleSubmit(console.log)} noValidate>
      <TextField label="Email" {...register('email')} />
      <button>Send</button>
    </form>
  )
}

function Player() {
  const ref = useRef<VideoHandle>(null)
  return <><Video src="/intro.mp4" ref={ref} /><button onClick={() => ref.current?.play()}>Play</button></>
}`
        },
        {
          cmd: "URL state",
          title: "الفلاتر والصفحة والترتيب في الـ URL مش في useState",
          desc: R`الـ state اللي المستخدم ممكن يحب يشاركها أو يرجعلها (البحث، والفلتر، والترتيب، ورقم الصفحة، والتاب المفتوح) مكانها الـ URL: [[/products?q=mug&sort=price-asc&page=2]]. كده الـ refresh مبيضيعهاش، والرابط بيتبعت لحد فيفتح نفس النتيجة، والـ Back بيرجع للفلتر اللي قبله.

في React Router [[useSearchParams()]] بيدّيك [[params]] (URLSearchParams) و [[setParams]]. الـ URL هو مصدر الحقيقة، وكل حاجة بتتحسب منه وقت الرسم.`,
          example: R`import { useSearchParams } from 'react-router'

const SORTS = ['newest', 'price-asc', 'price-desc'] as const
type Sort = (typeof SORTS)[number]
export function useProductFilters() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)
  const sortParam = params.get('sort')
  const sort: Sort = SORTS.includes(sortParam as Sort) ? (sortParam as Sort) : 'newest'
  function update(patch: Record<string, string | number | null>) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === '') next.delete(k)
        else next.set(k, String(v))
      }
      if (!('page' in patch)) next.delete('page')
      return next
    }, { replace: 'q' in patch })
  }
  return { q, page, sort, update }
}
// const { q, page, sort, update } = useProductFilters()
// useQuery({ queryKey: ['products', { q, page, sort }], ... })
// <input value={q} onChange={e => update({ q: e.target.value })} />`,
          try: R`اعمل صفحة فيها خانة بحث و select للترتيب وزرار «الصفحة الجاية» بالـ hook ده، واعرض [[{ q, page, sort }]]. جرّب: اختار ترتيب، وروح صفحة ٣، واعمل refresh، وانسخ الـ URL في تاب جديد، ودوس Back. وافتح [[?page=-5&sort=hack]] بإيدك. وبعدين اكتب كلمة من ٥ حروف ودوس Back: رجعت فين؟`,
          flag: "script",
          deep: {
            why: R`فلتر في [[useState]] بيضيع مع أي refresh، والمستخدم بيبعت لزميله رابط «شوف الطلبات دي» فيفتح صفحة فاضية، والـ Back بيطلّعه من الصفحة كلها بدل ما يرجّع الفلتر. ولو الفلتر في state وفي الـ URL الاتنين، هيختلفوا. الـ URL كمصدر حقيقة واحد بيحل ده، وبيخلي الصفحة قابلة للـ bookmark والـ SEO.`,
            how: R`[[params.get('page')]] بترجّع string أو null، فكل قيمة لازم تتحول وتتحقق: [[Number()]] لرقم مع حد أدنى، و list مسموحة للـ sort. أي حد يقدر يكتب أي حاجة في الـ URL، فمتثقش فيه (ولو القيم كتير، zod schema للـ search params بتعمل ده في سطر).

[[setParams(prev => next)]] بياخد دالة زي setState، فبتبني على الـ params الحالية وتغيّر اللي عايزه بس بدل ما تمسح الباقي. و [[setParams]] بيعمل navigation: الـ URL بيتغير و React Router بيعيد رسم كل اللي بيقرا الـ params.

قرارين مهمين: أي فلتر جديد بيرجّع الصفحة لـ 1 (وإلا تبقى في صفحة ٥ من نتايج بقى فيها صفحتين). و [[replace: true]] للكتابة في خانة البحث، عشان كل حرف ميعملش entry في الـ history والـ Back يرجع حرف حرف، بينما تغيير الترتيب أو الصفحة push عادي فالـ Back يرجّعه.

القيم الافتراضية مش بتتكتب في الـ URL ([[next.delete]] لما القيمة فاضية)، فالـ URL يفضل نضيف. والـ key بتاع React Query فيه نفس القيم، فكل تركيبة فلاتر ليها كاش، والـ Back بيرجّع النتيجة فورًا.

في Next.js نفس الفكرة: [[searchParams]] prop في الصفحة (Server Component) أو [[useSearchParams]] من [[next/navigation]] في client component و [[router.replace]] (تاب Next.js، درس searchParams). ومكتبة [[nuqs]] بتعمل ده بأنواع وparsers جاهزة في الاتنين.`,
            when: R`أي حاجة بتغيّر «إيه اللي معروض» والمستخدم ممكن يشاركه: بحث، وفلاتر، وترتيب، و pagination، والتاب المفتوح، والـ item المختار في master/detail. ومش لحاجات مؤقتة (dropdown مفتوح، أو hover، أو نص فورم لسه بيتكتب).`,
            mistakes: R`نسخ الـ params في [[useState]] ومزامنتها بـ effect. و [[setParams({ sort })]] بـ object فبيمسح q و page. ومفيش validation فـ [[?page=abc]] بتبعت [[NaN]] للـ API. وكل حرف في البحث بيعمل push فالـ Back بقى مستحيل. ومبترجعش لصفحة 1 مع فلتر جديد. وتحط بيانات كبيرة أو حساسة في الـ URL (بتتسجل في logs السيرفر والـ history).`
          },
          teach: R`## الفكرة: الـ URL هو الـ state

[[useProductFilters]] hook بيقرا البحث والصفحة والترتيب من الـ query string ([[?q=mug&sort=price-asc&page=2]]) بدل [[useState]]، وبيدّيك دالة [[update]] بتغيّرهم في الـ URL نفسه. الـ refresh والرابط المتبعت والـ Back كلهم بيشتغلوا لوحدهم، لأن مفيش state غير الـ URL.

اتشغّل في Vite 8.3 + React 19.3 + React Router 8.4 في Chrome headless، بالـ [[Filters]] اللي في الـ solCode جوه [[createBrowserRouter]]. ملحوظة على الـ URLs تحت: [[l=l10]] باراميتر بتاع صفحة التجربة عندنا، وسيبناه عشان تشوف إن [[update]] بيحافظ على أي param مش بتاعه.

---

## ١. الـ import والترتيب المسموح

~~~text المثال
import { useSearchParams } from 'react-router'

const SORTS = ['newest', 'price-asc', 'price-desc'] as const
type Sort = (typeof SORTS)[number]
~~~

- [[useSearchParams]]: hook من React Router للجزء اللي بعد [[?]] في الـ URL.
- [[as const]]: بيخلي TypeScript يفتكر القيم نفسها ([['newest']] ...) مش «array نصوص» وخلاص، والـ array تبقى readonly.
- [[typeof SORTS]]: نوع الـ array. و [[[number]]] بعده: «نوع أي عنصر فيها». النتيجة: [[Sort]] = [['newest' | 'price-asc' | 'price-desc']].

## ٢. القراية من الـ URL

~~~text المثال
const [params, setParams] = useSearchParams()
const q = params.get('q') ?? ''
const page = Math.max(1, Number(params.get('page')) || 1)
const sortParam = params.get('sort')
const sort: Sort = SORTS.includes(sortParam as Sort) ? (sortParam as Sort) : 'newest'
~~~

- [[params]]: object من نوع [[URLSearchParams]] (جاهز في المتصفح). [[params.get('q')]] بترجّع النص أو [[null]] لو مش موجود.
- [[?? '']]: لو [[null]] خد نص فاضي.
- الصفحة من جوه لبرة:

| الخطوة | [[?page=3]] | مفيش page | [[?page=abc]] | [[?page=-5]] |
|---|---|---|---|---|
| [[params.get('page')]] | [['3']] | [[null]] | [['abc']] | [['-5']] |
| [[Number(...)]] | 3 | 0 | [[NaN]] | -5 |
| لو falsy خد 1 | 3 | 1 | 1 | -5 |
| [[Math.max(1, ...)]] | 3 | 1 | 1 | 1 |

[[||]] بياخد اليمين لو الشمال «falsy» (0 و [[NaN]] منهم)، و [[Math.max]] بيرجّع الأكبر فبيمنع أي حاجة أقل من 1. (و [[?page=2.5]] بتعدّي 2.5، فلو عايز رقم صحيح لفّها في [[Math.floor]].)

- [[SORTS.includes(sortParam as Sort)]]: القيمة من القايمة المسموحة؟ [[as Sort]] عشان TypeScript يقبل يدوّر بنص ممكن يبقى أي حاجة. لو لأ، [['newest']].

## ٣. [[update]]

~~~text المثال
function update(patch: Record<string, string | number | null>) {
  setParams(prev => {
    const next = new URLSearchParams(prev)
~~~

- [[Record<string, string | number | null>]]: object مفاتيحه نصوص وقيمه نص أو رقم أو null. يعني [[update({ sort: 'price-asc' })]] أو [[update({ page: 3 })]] أو [[update({ q: null })]].
- [[setParams(prev => ...)]]: زي updater بتاع setState: بتاخد الـ params الحالية وترجّع الجديدة.
- [[new URLSearchParams(prev)]]: نسخة جديدة، عشان منعدّلش القديمة.

~~~text المثال
for (const [k, v] of Object.entries(patch)) {
  if (v === null || v === '') next.delete(k)
  else next.set(k, String(v))
}
~~~

- [[Object.entries(patch)]]: بيحوّل [[{ sort: 'x', page: 2 }]] لـ [[[['sort','x'], ['page',2]]]]، و [[const [k, v]]] بيفك كل زوج.
- فاضية؟ [[delete]] تشيلها من الـ URL خالص (عشان [[?q=]] متفضلش معلّقة). غير كده [[set]] بعد [[String(v)]] لأن الـ URL نصوص بس.

~~~text المثال
  if (!('page' in patch)) next.delete('page')
  return next
}, { replace: 'q' in patch })
~~~

- [['page' in patch]]: هل الـ patch فيه مفتاح اسمه page؟ لو لأ (غيّرت بحث أو ترتيب)، امسح الصفحة، فترجع 1.
- [[{ replace: 'q' in patch }]]: التاني لـ setParams. [[replace: true]] بيكتب مكان الـ entry الحالي في الـ history بدل ما يزوّد واحد. بيبقى [[true]] بس لما بنغيّر البحث.

---

## ٤. اللي حصل

~~~text الناتج (Chrome)
open            /?l=l10                          {"q":"","page":1,"sort":"newest"}
sort price-asc  /?l=l10&sort=price-asc           {"q":"","page":1,"sort":"price-asc"}
Next page       /?l=l10&sort=price-asc&page=2    {"q":"","page":2,"sort":"price-asc"}
Next page       /?l=l10&sort=price-asc&page=3    {"q":"","page":3,"sort":"price-asc"}
reload          /?l=l10&sort=price-asc&page=3    {"q":"","page":3,"sort":"price-asc"}
Back            /?l=l10&sort=price-asc&page=2    {"q":"","page":2,"sort":"price-asc"}
Forward         /?l=l10&sort=price-asc&page=3    {"q":"","page":3,"sort":"price-asc"}
typed mugs!     /?l=l10&sort=price-asc&q=mugs!   {"q":"mugs!","page":1,"sort":"price-asc"}
Back            /?l=l10&sort=price-asc&page=2    {"q":"","page":2,"sort":"price-asc"}
~~~

- الـ default ([[newest]] و page 1 و q فاضي) مش مكتوب في الـ URL.
- [[l=l10]] فضل في كل خطوة: [[update]] بيبني على [[prev]].
- الـ reload رجّع نفس الحالة بالظبط، لأنها في الـ URL.
- Back و Forward بيتنقلوا بين الصفحات والترتيب (push).
- الكتابة: ٥ حروف ومفيش ولا entry جديد ([[history.length]] فضل 5). حتى أول حرف عمل replace للـ entry اللي كنا فيه (صفحة ٣)، والصفحة اتشالت. فالـ Back ودّانا صفحة ٢، اللي قبله.

وفي تاب جديد، URL متلعوب فيه:

~~~text الناتج
?page=-5&sort=hack   {"q":"","page":1,"sort":"newest"}
?page=abc            {"q":"","page":1,"sort":"newest"}
~~~

من غير crash، والقيم الغلط رجعت للـ default.

---

## ٥. الـ solCode: الصفحة

~~~text solCode
<input aria-label="Search" value={q} onChange={e => update({ q: e.target.value })} />
<select aria-label="Sort" value={sort} onChange={e => update({ sort: e.target.value })}>
  {SORTS.map(s => <option key={s}>{s}</option>)}
</select>
<button onClick={() => update({ page: page + 1 })}>Next page</button>
<output>{JSON.stringify({ q, page, sort })}</output>
~~~

- الخانة والـ select controlled، وقيمتهم جاية من الـ URL. الـ [[onChange]] مبيعملش setState، بيعمل [[update]].
- [[<option key={s}>{s}</option>]]: من غير [[value]]، قيمة الـ option هي النص بتاعه.
- [[<output>]]: عنصر HTML لعرض ناتج. و [[JSON.stringify]] بيحوّل الـ object لنص.

والتعليقين في آخر المثال: [[queryKey: ['products', { q, page, sort }]]] يعني كل تركيبة فلاتر ليها كاش في React Query، فالـ Back بيعرض النتيجة القديمة فورًا.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| القراية | [[params.get]] + تحويل + تحقق (الـ URL مش مضمون) |
| الكتابة | [[setParams(prev => ...)]] على نسخة من القديم |
| القيمة الفاضية | [[delete]] من الـ URL |
| فلتر جديد | امسح [[page]] |
| البحث | [[replace: true]]، والباقي push |

- مصدر حقيقة واحد: الـ URL. متنسخهوش في [[useState]].
- replace بيكتب مكان الـ entry الحالي، فالـ Back بيرجّع للي قبل ما تبدأ.`,
          lines: [
            R`hook من React Router بيقرا ويكتب الـ query string (الجزء اللي بعد [[?]] في الـ URL). الفلاتر لما تتحط هناك الصفحة تفضل زي ما هي بعد refresh، واللينك يتبعت لحد فيشوف نفس النتيجة بالظبط.`,
            R`القيم الوحيدة المسموحة للترتيب. [[as const]] بيخلي TypeScript يعرف القيم التلاتة بأسمائها بدل «أي string»، وكمان بيخلي الـ array للقراية بس.`,
            R`النوع بيتطلع من الـ array نفسها، فيبقى [[newest]] أو [[price-asc]] أو [[price-desc]] بس. لو ضفت قيمة للـ array النوع بيتحدّث لوحده، فمفيش مكانين لازم تفتكر تعدّلهم.`,
            R`custom hook بيلم كل فلاتر صفحة المنتجات في مكان واحد: قراية القيم من الـ URL وتصحيحها، ودالة واحدة تغيّرها. أي component في الصفحة يناديه ياخد نفس القيم.`,
            R`[[params]] object من نوع [[URLSearchParams]] فيه القيم الحالية، و [[setParams]] بتغيّر الـ URL. لما الـ URL يتغير (من الكود أو من زرار back) الـ component اللي بينادي الـ hook بيترسم تاني بالقيم الجديدة.`,
            R`[[get]] بترجّع [[null]] لو الـ param مش موجود، و [[??]] بتحوّلها لنص فاضي. كده [[q]] دايمًا string وتنفع [[value]] لـ input من غير ما يبقى uncontrolled ساعات و controlled ساعات.`,
            R`الـ URL ممكن يتكتب بإيد المستخدم وفيه أي حاجة. [[Number]] بتحوّل النص لرقم: [[null]] بتبقى 0 و [[abc]] بتبقى [[NaN]]، والاتنين بيبقوا 1 بـ [[|| 1]]. و [[Math.max(1, ...)]] بتمنع الأرقام السالبة. الكسر زي 2.5 بيعدّي، فلو عايزه صحيح لفّه في [[Math.floor]].`,
            R`الترتيب زي ما هو مكتوب في الـ URL: نص أو [[null]]. لسه مش موثوق، فمش بنحطه في متغير نوعه [[Sort]] قبل ما نتأكد منه.`,
            R`بنتأكد إن القيمة واحدة من المسموحة، ولو لأ (حد كتب [[sort=hack]] أو مفيش sort أصلًا) بنرجع لـ [[newest]]. الـ [[as Sort]] بس عشان TypeScript يقبل يدوّر بنص عادي جوه array أنواعها محددة؛ الأمان الحقيقي جاي من الـ check نفسه وقت التشغيل.`,
            R`دالة واحدة تغيّر أي عدد من الفلاتر مرة واحدة، زي [[update({ q: 'mug' })]] أو [[update({ page: 3 })]]. و [[null]] معناها «شيل الفلتر ده».`,
            R`بنبعت لـ [[setParams]] دالة بتاخد الـ params الحالية وترجّع الجديدة، فبنعدّل على اللي موجود بدل ما نكتب الـ URL من الصفر ونمسح فلاتر تانية. خلي بالك: دي مش زي [[setState]]؛ لو ناديتها مرتين في نفس اللحظة التانية مش بتبني على نتيجة الأولى، عشان كده بنجمع التغييرات كلها في [[patch]] واحد.`,
            R`نسخة جديدة من الـ params الحالية. بنعدّل على النسخة ونرجّعها بدل ما نعدّل [[prev]] نفسه، زي قاعدة الـ immutable updates في الـ state.`,
            R`بنلف على كل مفتاح وقيمة في الـ [[patch]]، فالدالة تشتغل مع فلتر واحد أو عشرة.`,
            R`قيمة [[null]] أو نص فاضي معناها شيل الـ param خالص من الـ URL، بدل ما يفضل [[?q=]] فاضي يوسّخ اللينك.`,
            R`[[set]] بتحط القيمة أو تبدّل القديمة لو موجودة. [[String(v)]] لأن الـ URL كله نصوص، فالرقم 3 بيتكتب نص [["3"]].`,
            R`قفلة الـ [[for]].`,
            R`لو التغيير مش في رقم الصفحة نفسها (بحث جديد أو ترتيب جديد)، بنشيل [[page]] فترجع لأول صفحة. من غيره ممكن تبقى في صفحة 7 وتبحث عن حاجة نتايجها صفحة واحدة، فتشوف صفحة فاضية.`,
            R`بنرجّع الـ params الجديدة، و React Router بيكتبها في الـ URL، والـ component يترسم بالقيم الجديدة.`,
            R`التاني هو options الـ navigation. لو التغيير في البحث ([[q]]) بنعمل [[replace]]: نبدّل الـ entry الحالي في الـ history بدل ما نضيف واحد مع كل حرف، فزرار back يرجع للصفحة اللي قبل البحث مش حرف حرف. باقي التغييرات (صفحة، ترتيب) بتضيف entry جديد، فـ back يرجع خطوة واحدة.`,
            R`قفلة [[update]].`,
            R`بيرجّع القيم بعد ما اتصححت ودالة التغيير، فالـ component يستخدم [[q]] و [[page]] و [[sort]] وهو ضامن إنها سليمة ومن غير checks تانية.`,
            R`قفلة الـ hook.`,
          ],
          sol: R`بعد اختيار الترتيب والصفحة ٣: الـ URL [[?sort=price-asc&page=3]]، والـ refresh والتاب الجديد بيفتحوا نفس الحالة. Back بيرجّعك لصفحة ٢ أو للترتيب اللي قبله. [[?page=-5&sort=hack]] بيعرض [[{"q":"","page":1,"sort":"newest"}]] من غير crash (متجرّب في اختبار بـ MemoryRouter).

كتابة كلمة من ٥ حروف مبتزوّدش ولا entry في الـ history: كل حرف replace، حتى أول حرف بيكتب مكان الـ entry اللي كنت فيه. فالـ Back مش بيرجع حرف حرف، بيرجعك للـ entry اللي **قبل** اللي بدأت تكتب فيه (متجرّب في Chrome: كنت في صفحة ٣ وكتبت، فالـ Back ودّاك صفحة ٢، وصفحة ٣ نفسها اتبدلت بالبحث). وأي حرف في البحث بيشيل [[page]] من الـ URL.

لو الـ Back بيرجع حرف حرف، الـ [[replace]] ناقص. ولو اختيار الترتيب مسح البحث، انت بتبعت object بدل ما تبني على [[prev]].`,
          solCode: R`export function Filters() {
  const { q, page, sort, update } = useProductFilters()
  return (
    <>
      <input aria-label="Search" value={q} onChange={e => update({ q: e.target.value })} />
      <select aria-label="Sort" value={sort} onChange={e => update({ sort: e.target.value })}>
        {SORTS.map(s => <option key={s}>{s}</option>)}
      </select>
      <button onClick={() => update({ page: page + 1 })}>Next page</button>
      <output>{JSON.stringify({ q, page, sort })}</output>
    </>
  )
}`
        },
        {
          cmd: "dangerouslySetInnerHTML",
          title: "اعرض HTML جاي من CMS أو محرر نصوص من غير ما تفتح ثغرة XSS",
          desc: R`React بتعمل escape لأي نص، فـ [[{article.body}]] لو فيه [[<h2>]] هيظهر كنص حرفيًا. لو المحتوى HTML فعلًا (من CMS، أو محرر زي TipTap، أو Markdown اتحوّل)، [[dangerouslySetInnerHTML={{ __html: html }}]] بيحطه في الـ DOM كما هو. والاسم مقصود: أي [[<script>]] أو [[onerror]] أو [[javascript:]] جوه الـ HTML ده هيشتغل على موقعك.

القاعدة: عمرك ما تحط HTML مش انت كاتبه من غير تنضيف. [[DOMPurify.sanitize(html)]] بيشيل أي حاجة ممكن تشغّل كود ويسيب التنسيق.`,
          example: R`import DOMPurify from 'dompurify'
import { useMemo } from 'react'

export function ArticleBody({ html }: { html: string }) {
  const clean = useMemo(() => DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form'] }), [html])
  return <div className="prose" dangerouslySetInnerHTML={{ __html: clean }} />
}
// الدخل:  <h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a>
// الناتج: <h2>Hi</h2><img src="x"><a>x</a>`,
          try: R`[[npm i dompurify]]، وارسم ArticleBody بالدخل اللي في التعليق مرة من غير sanitize ومرة بيه، وشوف في Elements الفرق (ومن غيره هيطلع alert). بعدين خلي كل الروابط تفتح في تاب جديد بأمان: [[DOMPurify.addHook('afterSanitizeAttributes', ...)]] يحط [[target="_blank"]] و [[rel="noopener noreferrer"]] على أي [[<a>]].`,
          flag: "script",
          deep: {
            why: R`المحتوى الغني جاي من حتت كتير: مقالات من CMS، ووصف منتج كتبه تاجر في لوحة أدمن، وتعليقات فيها تنسيق، وإيميلات بتتعرض في التطبيق. لو أي حد من دول قدر يحط [[<img onerror>]]، الكود بتاعه هيشتغل في متصفح كل زائر: يسرق الـ session، أو يغيّر الصفحة، أو يبعت طلبات باسم المستخدم (Stored XSS، تاب الأمان).`,
            how: R`[[dangerouslySetInnerHTML]] بيعمل [[element.innerHTML = __html]]. المتصفح مش بيشغّل [[<script>]] اللي بيتحط بـ innerHTML، بس بيشغّل event handlers ([[onerror]] و [[onload]]) وروابط [[javascript:]] لما حد يدوس، و [[<iframe srcdoc>]] وحاجات تانية كتير. عشان كده فلترة [[<script>]] بـ regex مش حماية.

DOMPurify بيعمل parse للـ HTML بـ DOM المتصفح نفسه، ويمشي على كل عنصر وخاصية ويشيل أي حاجة مش في الـ allowlist: الـ event handlers كلها، و [[javascript:]] في الروابط، و [[<script>]] و [[<iframe>]] و [[<object>]]. و [[USE_PROFILES: { html: true }]] بيسمح بـ HTML بس (من غير SVG و MathML)، و [[FORBID_TAGS]] بيقفل حاجات زيادة ([[<style>]] ممكن يغيّر شكل الصفحة كلها، و [[<form>]] ممكن يعمل phishing). الـ [[style]] كـ attribute بيعدّي افتراضيًا، فلو مش عايزه [[FORBID_ATTR: ['style']]].

الـ [[useMemo]] عشان الـ sanitize مش رخيص على HTML كبير، ومفيش داعي يتعاد مع كل render للأب.

DOMPurify محتاج DOM، ففي Next.js (Server Component أو SSR) استخدم [[isomorphic-dompurify]] (بيستخدم jsdom على السيرفر)، أو نضّف مرة واحدة وقت الحفظ وخزّن النسخة النضيفة. الأأمن الاتنين: وقت الحفظ ووقت العرض، لأن المحتوى القديم في الداتابيز ممكن يكون اتحفظ قبل ما تضيف الحماية.

والبدايل الأحسن لو تقدر: Markdown بمكتبة بتطلّع React elements (react-markdown، ومبتستخدمش innerHTML أصلًا)، أو المحرر يخزّن JSON (TipTap و Lexical) وانت ترسمه components.`,
            when: R`HTML جاي من CMS أو محرر نصوص أو API خارجي أو إيميلات. ولو HTML ثابت انت كاتبه في الكود، مفيش داعي لـ dangerouslySetInnerHTML أصلًا: اكتبه JSX.`,
            mistakes: R`[[dangerouslySetInnerHTML={{ __html: post.body }}]] من غير sanitize «عشان الأدمن بس اللي بيكتب»: حساب أدمن واحد اتسرق ويبقى كل زائر في خطر. و regex بيشيل [[<script>]] وتفتكر ده كفاية. و sanitize وقت الحفظ بس. وتحط [[<script>]] بتاع widget خارجي بـ dangerouslySetInnerHTML ومستغرب إنه مش شغال: innerHTML مبيشغّلش scripts، استخدم [[<script>]] بـ effect أو [[next/script]]. و CSP (Content-Security-Policy) غايب: ده خط الدفاع التاني لو حاجة عدّت (تاب الأمان). وسؤال انترفيو: «React بتحمي من XSS؟» أيوة للنصوص في JSX، ولأ في dangerouslySetInnerHTML و [[href]] بقيمة من المستخدم ([[javascript:]]) و [[ref.current.innerHTML]].`
          },
          teach: R`## الفكرة: نضّف الأول، وبعدين حطه في الـ DOM

[[ArticleBody]] بياخد HTML جاي من برا (CMS أو محرر)، ينضّفه بـ DOMPurify من أي حاجة ممكن تشغّل كود، وبعدين يحطه في الصفحة بـ [[dangerouslySetInnerHTML]]. التعليقين تحت المثال بيوروا الدخل والناتج.

اتشغّل في Vite 8.3 + React 19.3 + dompurify 3.4 في Chrome headless: مرة حطينا الدخل من غير تنضيف، ومرة بـ ArticleBody، ومسكنا أي [[alert]] بيطلع، ودوسنا على اللينك.

---

## ١. الـ imports

~~~text المثال
import DOMPurify from 'dompurify'
import { useMemo } from 'react'
~~~

- [[dompurify]]: المكتبة ([[npm i dompurify]]). الـ default export اسمه [[DOMPurify]].

## ٢. التنضيف

~~~text المثال
const clean = useMemo(() => DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form'] }), [html])
~~~

من جوه لبرة:

- [[DOMPurify.sanitize(html, options)]]: بيعمل parse للـ HTML بالـ DOM بتاع المتصفح نفسه، ويمشي على كل عنصر وكل attribute، ويشيل أي حاجة مش في قايمة المسموح (allowlist). بيرجّع نص HTML نضيف.
- [[USE_PROFILES: { html: true }]]: اسمح بعناصر HTML بس، من غير SVG و MathML.
- [[FORBID_TAGS: ['style', 'form']]]: اقفل كمان [[<style>]] (ممكن يغيّر شكل الصفحة كلها) و [[<form>]] (ممكن يتعمل منه فورم مزيّف بيسرق باسورد).
- [[useMemo(() => ..., [html])]]: احسب التنضيف مرة لكل [[html]] جديد، مش مع كل render.

## ٣. الحطّ في الـ DOM

~~~text المثال
return <div className="prose" dangerouslySetInnerHTML={{ __html: clean }} />
~~~

- [[className]]: الـ [[class]] بتاع HTML ([[class]] كلمة محجوزة في JavaScript). [[prose]] اسم class بتاع Tailwind Typography لتنسيق المقالات.
- [[dangerouslySetInnerHTML]]: React عادة بتعمل escape لأي نص، فـ [[<h2>]] بيظهر حروف. ده بيقولها «حط الـ HTML ده زي ما هو»، وهو بيعمل [[div.innerHTML = clean]].
- [[{{ __html: clean }}]]: القوس الخارجي JSX، والداخلي object فيه مفتاح اسمه [[__html]]. الشكل الغريب ده مقصود، عشان محدش يكتبه بالغلط.
- الـ div لازم يبقى من غير children، الـ HTML هو المحتوى.

---

## ٤. الدخل المسموم

~~~text الدخل
<h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a>
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[<img src=x onerror="...">]] | الصورة [[x]] مش موجودة، فالمتصفح بينادي [[onerror]]: الكود بيشتغل لوحده من غير ما حد يدوس |
| [[<script>]] | سكريبت عادي |
| [[href="javascript:..."]] | لينك بيشغّل كود لما حد يدوس عليه |

### من غير تنضيف

~~~text الناتج (Chrome)
ALERT 1
innerHTML: <h2>Hi</h2><img src="x" onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a>
(دوسة على اللينك)
ALERT 3
~~~

- [[alert(1)]] اشتغل لوحده أول ما الصفحة اتفتحت (الـ onerror).
- [[alert(2)]] **مشتغلش**: المتصفح مبيشغّلش [[<script>]] اللي بيتحط بـ innerHTML. عشان كده شيل الـ script بـ regex مش حماية: الـ onerror عدّى.
- [[alert(3)]] اشتغل مع الدوسة.

بدل [[alert]] ده ممكن يبقى كود بيبعت الـ cookies أو الـ token لسيرفر حد تاني.

### بـ ArticleBody

~~~text الناتج (Chrome)
innerHTML: <h2>Hi</h2><img src="x"><a>x</a>
(دوسة على اللينك: ولا alert)
~~~

الـ [[onerror]] اتشال، والـ [[<script>]] اتشال، والـ [[href="javascript:..."]] اتشال. والتنسيق ([[<h2>]] والصورة واللينك) فضل.

### حاجات تانية في نفس الإعدادات

~~~text الدخل
<p style="color:red">styled</p><style>body{display:none}</style><form action="https://evil.example"><input name="pw"></form><svg><circle r="5"/></svg>
~~~

~~~text الناتج (بعد التنضيف)
<p style="color:red">styled</p><input name="pw">
~~~

- [[style]] كـ attribute عدّى (مسموح افتراضيًا). لو مش عايزه: [[FORBID_ATTR: ['style']]].
- [[<style>]] و [[<form>]] اتشالوا ([[FORBID_TAGS]])، بس الـ [[<input>]] اللي كان جوه الفورم فضل: الـ tag بيتشال ومحتواه بيفضل.
- الـ SVG اتشال كله ([[USE_PROFILES: { html: true }]]).

---

## ٥. الـ solCode: hook للروابط

~~~text solCode
DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})
~~~

- [[addHook(name, fn)]]: دالة بتتنادى على كل عنصر في مرحلة معينة. [['afterSanitizeAttributes']]: بعد ما DOMPurify شال الـ attributes الخطر، فاللي باقي آمن.
- [[node.tagName === 'A']]: اسم العنصر بحروف كبيرة في DOM الـ HTML.
- [[node.getAttribute('href')]]: لو اللينك فاضل ليه href (اللي كان [[javascript:]] اتشال خلاص فمش هيعدّي هنا).
- [[target="_blank"]]: افتح في تاب جديد. و [[rel="noopener noreferrer"]]: الصفحة الجديدة متقدرش توصل لصفحتك عن طريق [[window.opener]]، ومتعرفش جاية منين.
- الـ hook بيتسجّل مرة واحدة، برا أي component.

~~~text الناتج (console.log في Chrome)
<h2>Hi</h2><img src="x"><a>x</a><a href="https://example.com" target="_blank" rel="noopener noreferrer">ok</a>
~~~

اللينك السليم خد الـ attributes، واللينك اللي كان [[javascript:]] فضل [[<a>x</a>]] من غير حاجة.

---

## الخلاصة

| الحاجة | من غير تنضيف | بـ DOMPurify |
|---|---|---|
| [[onerror]] و [[onload]] | بيشتغلوا لوحدهم | بيتشالوا |
| [[<script>]] بـ innerHTML | مبيشتغلش، بس فاضل في الصفحة | بيتشال |
| [[href="javascript:..."]] | بيشتغل مع الدوسة | بيتشال |
| [[<style>]] و [[<form>]] | بيتحطوا | بيتشالوا بـ [[FORBID_TAGS]] |

- [[dangerouslySetInnerHTML]] = [[innerHTML]]: عمره ما ياخد HTML مش انت كاتبه من غير [[sanitize]].
- على السيرفر (SSR) محتاج [[isomorphic-dompurify]]، والأأمن تنضّف وقت الحفظ ووقت العرض.`,
          lines: [
            R`مكتبة بتنضّف HTML: بتشيل [[<script>]] والـ attributes زي [[onerror]] و [[onclick]] واللينكات اللي بتبدأ بـ [[javascript:]]، يعني أي حاجة تقدر تشغّل كود في صفحتك (XSS)، وتسيب التنسيق العادي زي [[<p>]] و [[<b>]].`,
            R`[[useMemo]] عشان التنضيف (شغل تقيل لو الـ HTML كبير) ميتعادش مع كل render للـ component، ويتعاد بس لما الـ HTML نفسه يتغير.`,
            R`component بيعرض HTML جاي من برّه (CMS أو rich text editor أو API). React عادةً بيعمل escape لأي نص، فلو كتبت [[{html}]] هتشوف الـ tags مكتوبة كنص، وعشان كده محتاجين الطريقة اللي تحت.`,
            R`[[sanitize]] بترجّع نسخة آمنة من الـ HTML. [[USE_PROFILES: { html: true }]] بيسمح بـ HTML بس (من غير SVG ولا MathML)، و [[FORBID_TAGS]] بيشيل كمان [[style]] (يقدر يغيّر شكل الصفحة كلها) و [[form]] (يقدر يعمل فورم مزيف يبعت بيانات لسيرفر تاني)؛ لاحظ إن الـ tag نفسه بيتشال وأولاده بيفضلوا. والـ deps فيها [[html]] بس، فالتنضيف يتعاد لما ييجي HTML جديد.`,
            R`[[dangerouslySetInnerHTML]] بيحط الـ HTML في الـ div زي [[innerHTML]] من غير escape، والاسم مخوّف بقصد عشان تفكر قبل ما تستخدمه. لازم يتبعت object فيه [[__html]] (عشان كده القوسين مزدوجين: واحد للـ JSX وواحد للـ object)، والـ div ده مينفعش يبقى ليه children. بنبعت [[clean]] بس، عمرك ما تبعت [[html]] الأصلي. و [[className="prose"]] class للتنسيق، و [[className]] بدل [[class]] لأن [[class]] كلمة محجوزة في JS.`,
            R`قفلة [[ArticleBody]].`,
          ],
          sol: R`من غير sanitize: الـ alert بيطلع (من [[onerror]] بتاع الصورة، مش من الـ script اللي innerHTML مبيشغّلوش)، ودوسة على اللينك بتطلّع alert تالت. بالـ sanitize الـ Elements فيها بالظبط [[<h2>Hi</h2><img src="x"><a>x</a>]]: الـ onerror والـ script والـ javascript: اتشالوا، والـ h2 فضل (متجرّب في jsdom).

الـ hook بيتسجّل مرة واحدة برا الـ component، وبعدها كل الروابط في أي HTML متنضف فيها [[target="_blank"]] و [[rel="noopener noreferrer"]].`,
          solCode: R`import DOMPurify from 'dompurify'

DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const dirty = '<h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a><a href="https://example.com">ok</a>'
console.log(DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } }))
// <h2>Hi</h2><img src="x"><a>x</a><a href="https://example.com" target="_blank" rel="noopener noreferrer">ok</a>`
        },
        {
          cmd: "form actions",
          title: "React 19: action على الفورم، و useActionState و useOptimistic من غير Next",
          desc: R`في React 19 تقدر تدّي [[<form action={fn}>]] دالة (حتى في Vite من غير سيرفر)، و React بتناديها بالـ [[FormData]] جوه transition، وبتعمل reset للفورم لما تخلص بنجاح. و [[useActionState(action, initial)]] بيدّيك الـ state اللي الـ action رجّعتها (أخطاء أو نتيجة) و [[isPending]]، و [[useFormStatus()]] في أي component جوه الفورم يعرف إنه بيتبعت.

و [[useOptimistic(value, reducer)]] بيعرض قيمة متفائلة وانت مستني الـ action، وبترجع للقيمة الحقيقية لوحدها لما الـ action تخلص، سواء نجحت أو فشلت. في Next.js نفس الـ hooks مع Server Actions (تاب Next.js، درس useActionState).`,
          example: R`import { useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'

type State = { error: string | null; saved: string | null; email: string }
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
}
export function NewsletterForm({ subscribe }: { subscribe: (email: string) => Promise<void> }) {
  const [state, formAction, isPending] = useActionState(async (_prev: State, formData: FormData): Promise<State> => {
    const email = String(formData.get('email') ?? '').trim()
    if (!email.includes('@')) return { error: 'Enter a valid email', saved: null, email }
    try {
      await subscribe(email)
      return { error: null, saved: email, email: '' }
    } catch {
      return { error: 'Server error, try again', saved: null, email }
    }
  }, { error: null, saved: null, email: '' })
  return (
    <form action={formAction}>
      <input name="email" aria-label="Email" defaultValue={state.email} />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
      {state.saved && !isPending && <p role="status">Subscribed {state.saved}</p>}
    </form>
  )
}
export function LikeButton({ likes, onLike }: { likes: number; onLike: () => Promise<void> }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (current, delta: number) => current + delta)
  async function likeAction() {
    addOptimistic(1)
    await onLike()
  }
  return <form action={likeAction}><button>♥ {optimisticLikes}</button></form>
}`,
          try: R`ارسم NewsletterForm بـ subscribe بتستنى ثانيتين. اكتب «bad» وابعت: الرسالة تظهر والنص يفضل في الخانة. امسح [[defaultValue={state.email}]] وكرّر: النص بيتمسح مع الخطأ. بعدين ارسم LikeButton جوه أب عنده [[likes]] في state، و onLike بتفشل مرة وتنجح مرة (وفي النجاح الأب يزوّد likes)، ودوس.`,
          flag: "script",
          deep: {
            why: R`الفورم العادي في React فيه كود بيتكرر: [[e.preventDefault()]]، و isSubmitting، و try/catch، و state للخطأ، و reset بعد النجاح، وزرار مقفول. الـ Actions بتعمل الدورة دي جاهزة، ومع Next.js نفس الفورم بيشتغل حتى قبل ما الـ JS يتحمّل. و useOptimistic بيدّيك الـ optimistic update من غير كاش ومن غير rollback بإيدك.`,
            how: R`[[action={fn}]] على [[<form>]]: React بتمنع الإرسال العادي وتنادي fn بـ [[FormData]] (كل خانة ليها name). وده بيحصل جوه transition، فالواجهة مبتهنّجش، وأي [[useFormStatus]] تحته بيقول [[pending: true]]. و [[useFormStatus]] بيقرا حالة الفورم الأب، فلازم يتنادى في component جوه [[<form>]] مش في الـ component اللي بيرسم الفورم نفسه.

[[useActionState(fn, initial)]] بيلف الـ action: fn بتاخد الـ state اللي فاتت والـ FormData، واللي بترجّعه بيبقى [[state]] الجديدة. الأخطاء المتوقعة (validation، وإيميل مستخدم) بترجع كقيمة مش throw: أي throw بيروح لأقرب ErrorBoundary. و [[isPending]] true طول ما شغالة، وطلبات ورا بعض بتتنفذ بالترتيب.

الـ reset: بعد ما الـ action تخلص، React بتعمل [[form.reset()]] للـ uncontrolled inputs، يعني كل خانة ترجع لـ defaultValue بتاعها. ده كويس بعد النجاح، ومزعج بعد الخطأ (المستخدم يكتب تاني من الأول). الحل في المثال: الـ state بترجّع الإيميل اللي اتكتب، و [[defaultValue={state.email}]]، فالـ reset بيرجّع الخانة لنفس النص في الخطأ، ولفاضي في النجاح (متجرّب).

[[useOptimistic(likes, reducer)]]: طول ما مفيش action شغالة، [[optimisticLikes]] = [[likes]]. جوه action، [[addOptimistic(1)]] بيعرض [[likes + 1]] فورًا. لما الـ action تخلص، React بترمي القيمة المتفائلة وترجع لـ [[likes]] الحقيقية: لو الأب زوّدها (نجاح) تفضل 11، لو لأ (فشل) ترجع 10 لوحدها. و addOptimistic لازم تتنادى جوه action أو transition، وإلا React بتطبع warning.

والفرق عن React Query: useOptimistic للحالات البسيطة اللي الـ state فيها في component واحد، و [[onMutate]] بتاع Query لما نفس البيانات معروضة في كذا مكان من الكاش.`,
            when: R`فورمات بسيطة لحد متوسطة في React 19 (اشتراك، وتعليق، وإعدادات)، وأي فورم في Next.js مع Server Actions. و useOptimistic لـ like و toggle وإضافة تعليق. ولفورم كبير بـ validation لحظي ورسايل لكل خانة، react-hook-form لسه أقوى (وممكن يتجمع مع actions).`,
            mistakes: R`[[useFormStatus]] في نفس الـ component اللي بيرسم الـ form فيرجّع دايمًا false. و throw للأخطاء المتوقعة فالصفحة تروح للـ ErrorBoundary بدل رسالة تحت الخانة. ونسيان الـ reset: المستخدم يفقد اللي كتبه بعد خطأ. و [[value]] (controlled) على الخانات مع actions، فالـ reset ملوش أثر والـ state متلخبطة. و [[addOptimistic]] برا action. و [[onSubmit]] و [[action]] الاتنين على نفس الفورم.`
          },
          teach: R`## الفكرة: الفورم بياخد دالة، و React بتعمل الباقي

[[NewsletterForm]] فورم اشتراك من غير [[onSubmit]] ولا [[preventDefault]] ولا [[useState]] للخطأ أو للتحميل: [[<form action={formAction}>]] بيبعت الـ FormData لدالة، و [[useActionState]] بيمسك اللي الدالة رجّعته، و [[useFormStatus]] بيعرف إن الفورم بيتبعت. و [[LikeButton]] بيزوّد الرقم فورًا بـ [[useOptimistic]] قبل ما الطلب يخلص.

اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، بالـ LikeHost اللي في الـ solCode، و [[subscribe]] بتستنى ثانيتين (وخلّيناها تفشل في المرة التانية عشان نشوف الـ catch).

---

## ١. الـ imports

~~~text المثال
import { useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'
~~~

[[useFormStatus]] من [[react-dom]] مش [[react]]، لأنه مربوط بعنصر [[<form>]] في الـ DOM.

## ٢. شكل الـ state

~~~text المثال
type State = { error: string | null; saved: string | null; email: string }
~~~

- [[error]]: رسالة خطأ أو [[null]].
- [[saved]]: الإيميل اللي اشترك أو [[null]].
- [[email]]: النص اللي هيرجع في الخانة بعد ما الـ action تخلص (هتفهم ليه تحت).

## ٣. زرار بيعرف حالة الفورم

~~~text المثال
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
}
~~~

- [[useFormStatus()]]: بيقرا حالة أقرب [[<form>]] **فوقه**. عشان كده هو component لوحده جوه الفورم، مش في NewsletterForm نفسه (هناك الفورم تحته مش فوقه، فـ [[pending]] هتفضل false).
- [[disabled={pending}]]: الزرار مقفول وهو بيتبعت، فمفيش ضغطتين.
- [[<button>]] من غير [[type]] جوه فورم = submit.

## ٤. الـ action

~~~text المثال
const [state, formAction, isPending] = useActionState(async (_prev: State, formData: FormData): Promise<State> => {
~~~

- [[useActionState(fn, initial)]] بيرجّع ٣ حاجات: [[state]] (آخر حاجة [[fn]] رجّعتها، أو [[initial]] في الأول)، و [[formAction]] (نسخة ملفوفة من fn تحطها على الفورم)، و [[isPending]].
- [[async]]: الدالة بترجّع promise، فينفع جواها [[await]].
- [[_prev]]: الـ state اللي فاتت (مش محتاجينها، فالـ [[_]] في أول الاسم عرف إنها مش مستخدمة).
- [[formData: FormData]]: كل خانات الفورم اللي ليها [[name]]. React بتبعتها لوحدها.
- [[: Promise<State>]]: الدالة بترجّع (بعد الانتظار) State.

~~~text المثال
const email = String(formData.get('email') ?? '').trim()
if (!email.includes('@')) return { error: 'Enter a valid email', saved: null, email }
~~~

- [[formData.get('email')]]: قيمة الخانة اللي [[name="email"]]. نوعها [[string | File | null]]، فـ [[?? '']] و [[String(...)]] بيضمنوا نص.
- [[.trim()]]: شيل المسافات من الأول والآخر.
- الخطأ المتوقع بيرجع **كقيمة** مش [[throw]]. ومعاه [[email]] اللي اتكتب.

~~~text المثال
try {
  await subscribe(email)
  return { error: null, saved: email, email: '' }
} catch {
  return { error: 'Server error, try again', saved: null, email }
}
~~~

- [[try / catch]]: لو [[subscribe]] رمت error، الـ catch بيمسكها ويرجّع رسالة بدل ما الصفحة تقع. ([[catch]] من غير [[(e)]] مسموح لو مش محتاج الـ error نفسه.)
- النجاح: [[email: '']] عشان الخانة تفضى.

~~~text المثال
}, { error: null, saved: null, email: '' })
~~~

القيمة الأولى لـ [[state]].

## ٥. الـ JSX

~~~text المثال
<form action={formAction}>
  <input name="email" aria-label="Email" defaultValue={state.email} />
  <SubmitButton />
  {state.error && <p role="alert">{state.error}</p>}
  {state.saved && !isPending && <p role="status">Subscribed {state.saved}</p>}
</form>
~~~

- [[action={formAction}]]: React بتمنع الإرسال العادي (مفيش reload)، وتنادي الدالة بالـ FormData جوه transition.
- [[defaultValue={state.email}]]: الخانة uncontrolled. بعد ما الـ action تخلص، React بتعمل [[form.reset()]]، يعني كل خانة ترجع لـ [[defaultValue]] بتاعها. وبما إن [[defaultValue]] = [[state.email]]: بعد الخطأ ترجع للنص اللي اتكتب، وبعد النجاح تفضى.
- [[role="alert"]] و [[role="status"]]: قارئ الشاشة بيقرا الرسالة لوحده لما تظهر.
- [[!isPending]]: متعرضش «Subscribed» القديمة وفيه إرسال جديد شغال.

### اللي حصل

~~~text الناتج (Chrome)
   843ms submit "bad"           input="bad"      button="Save"       disabled=false  msg="Enter a valid email"
  1110ms submit a@b.com         input="a@b.com"  button="Saving..."  disabled=true   msg="Enter a valid email"
  3221ms after 2s               input=""         button="Save"       disabled=false  msg="Subscribed a@b.com"
  5475ms c@d.com (server fails) input="c@d.com"  button="Save"       disabled=false  msg="Server error, try again"
~~~

- [[bad]]: الرسالة ظهرت والنص فضل في الخانة.
- [[a@b.com]]: الزرار بقى «Saving...» ومقفول على طول. والرسالة القديمة لسه ظاهرة لأن [[state]] مبتتغيرش غير لما الـ action تخلص.
- بعد ثانيتين: «Subscribed a@b.com» والخانة فضيت.
- الطلب اللي فشل: الـ catch رجّع الرسالة، والإيميل فضل في الخانة.

ومن غير [[defaultValue={state.email}]]:

~~~text الناتج (Chrome)
submit "bad"   input=""   msg="Enter a valid email"
~~~

الخطأ ظهر بس الخانة اتمسحت: الـ reset بيحصل بعد أي action، ناجحة أو لأ.

---

## ٦. [[useOptimistic]]

~~~text المثال
export function LikeButton({ likes, onLike }: { likes: number; onLike: () => Promise<void> }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (current, delta: number) => current + delta)
~~~

- [[useOptimistic(value, reducer)]]: بيرجّع [[optimisticLikes]] (اللي هيتعرض) و [[addOptimistic]] (تضيف تعديل متفائل).
- طول ما مفيش action شغالة: [[optimisticLikes]] = [[likes]] بالظبط.
- الـ reducer [[(current, delta) => current + delta]]: لما تنادي [[addOptimistic(1)]]، React بتنادي الـ reducer بالقيمة الحالية و [[1]].

~~~text المثال
async function likeAction() {
  addOptimistic(1)
  await onLike()
}
return <form action={likeAction}><button>♥ {optimisticLikes}</button></form>
~~~

- [[addOptimistic(1)]]: الرقم يزيد على الشاشة فورًا.
- [[await onLike()]]: الطلب الحقيقي. لما يخلص، الـ action خلصت، و React بترمي التعديل المتفائل وترجع لـ [[likes]] اللي جاية من الأب.
- [[<form action={likeAction}>]]: الـ action لازم تبقى جوه action أو transition عشان [[addOptimistic]] يشتغل، والفورم بيوفر ده.

### الـ solCode: أب بيفشل مرة وينجح مرة

~~~text solCode
const [likes, setLikes] = useState(10)
const attempt = useRef(0)
async function onLike() {
  await new Promise(r => setTimeout(r, 1000))
  attempt.current++
  if (attempt.current % 2 === 1) return // فشل: مفيش تحديث
  setLikes(l => l + 1)
}
~~~

- [[new Promise(r => setTimeout(r, 1000))]]: promise بتخلص بعد ثانية، يعني «استنى ثانية».
- [[attempt]]: ref بيعد المحاولات (مش ظاهر، فمش state).
- [[% 2 === 1]]: المحاولة الفردية (1، 3...) «تفشل»: ترجع من غير ما تزوّد. الزوجية تزوّد [[likes]].

~~~text الناتج (Chrome)
click 1: right after = ♥ 11
click 1: after 1.2s  = ♥ 10
click 2: right after = ♥ 11
click 2: after 1.2s  = ♥ 11
~~~

- الدوسة الأولى: 11 فورًا، والطلب «فشل» فالأب فضل 10، والرقم رجع 10 لوحده. مفيش rollback كتبناه.
- التانية: 11 فورًا، والأب زوّد فعلًا، فالرقم الحقيقي بقى 11 وفضل.

---

## الخلاصة

| الأداة | بتدّيك |
|---|---|
| [[<form action={fn}>]] | FormData، من غير preventDefault، جوه transition، و reset بعد ما تخلص |
| [[useActionState(fn, initial)]] | [[state]] اللي fn رجّعتها، و [[formAction]]، و [[isPending]] |
| [[useFormStatus()]] | [[pending]] للفورم اللي فوقه (في component جوه الفورم) |
| [[useOptimistic(value, reducer)]] | قيمة متفائلة وقت الـ action، وترجع للحقيقية لوحدها |

- الأخطاء المتوقعة ترجع كقيمة، مش [[throw]].
- الـ reset بيمسح الخانات: رجّع اللي اتكتب في الـ state واستخدمه [[defaultValue]].`,
          lines: [
            R`[[useActionState]] بيشغّل دالة (action) لما الفورم يتبعت ويحفظ اللي بترجّعه كـ state ومعاه [[isPending]]، و [[useOptimistic]] بيعرض قيمة مؤقتة على الشاشة لحد ما الـ action تخلص. الاتنين من React 19.`,
            R`ده من [[react-dom]] مش [[react]] لأنه خاص بعنصر [[<form>]] في الـ DOM. بيقول لأي component جوه الفورم هل الفورم ده بيتبعت دلوقتي.`,
            R`شكل اللي الـ action بترجّعه كل مرة: [[error]] رسالة خطأ أو [[null]]، و [[saved]] الإيميل اللي اتسجّل أو [[null]]، و [[email]] القيمة اللي الخانة ترجع لها بعد الإرسال.`,
            R`زرار الإرسال في component لوحده، ودي مش مسألة ترتيب وبس: [[useFormStatus]] بيقرا حالة أقرب [[<form>]] **فوقه** في الشجرة، فلازم يتنادى في component مترسوم جوه الفورم، مش في الـ component اللي بيرسم الفورم نفسه.`,
            R`[[pending]] بيبقى [[true]] من ساعة ما الفورم يتبعت لحد ما الـ action تخلص، والزرار بيترسم تاني لما يتغير. لو ناديت [[useFormStatus]] في [[NewsletterForm]] نفسه (برّه الفورم) هيرجّع [[false]] على طول.`,
            R`وقت الإرسال الزرار بيتقفل فالمستخدم ميعرفش يبعت مرتين، والنص بيتغير لـ «Saving...» عشان يعرف إن فيه حاجة شغالة. ومن غير [[type]] الزرار اللي جوه فورم بيبقى [[submit]] تلقائي، فالضغطة بتبعت الفورم.`,
            R`قفلة [[SubmitButton]].`,
            R`فورم الاشتراك. [[subscribe]] جاي من الأب، ودي الدالة اللي بتكلم السيرفر فعلًا وبترجّع Promise؛ بنستقبلها كـ prop عشان الفورم ميعرفش تفاصيل الـ API، ونقدر نختبره بدالة وهمية.`,
            R`بيرجّع تلاتة: [[state]] آخر حاجة الـ action رجّعتها، و [[formAction]] نسخة ملفوفة من الـ action هنحطها على الفورم، و [[isPending]] هل لسه شغالة. الـ action بتاخد الـ state اللي فاتت (مش محتاجينها فاسمها [[_prev]]) و [[FormData]] فيها كل خانات الفورم، واللي بترجّعه بيبقى [[state]] الجديدة ويعمل re-render.`,
            R`[[get('email')]] بتقرا الخانة اللي [[name]] بتاعها [[email]]. بترجّع [[null]] لو مش موجودة، فـ [[String(... ?? '')]] بتضمن إن معانا نص، و [[trim]] بتشيل المسافات اللي في الأول والآخر.`,
            R`خطأ متوقع (المستخدم كتب غلط) بنرجّعه كقيمة في الـ state مش بـ [[throw]]، فيظهر تحت الخانة. وبنرجّع [[email]] اللي كتبه عشان الفورم بيعمل reset بعد كل action، والخانة ترجع بنفس الكلام بدل ما تتمسح.`,
            R`بنحاول نكلم السيرفر، ولو رمى error نمسكه تحت ونحوّله لرسالة بدل ما يطلع للـ error boundary ويشيل الصفحة.`,
            R`بيستنى طلب الاشتراك يخلص. وطول ما احنا مستنيين، [[isPending]] و [[pending]] بتاع الزرار قيمتهم [[true]].`,
            R`نجح: مفيش خطأ، و [[saved]] فيه الإيميل عشان رسالة النجاح، و [[email]] فاضي فالـ reset يفضّي الخانة للاشتراك الجاي.`,
            R`لو [[subscribe]] رمت (السيرفر واقع أو النت قطع) بنيجي هنا. من غير اسم متغير بعد [[catch]] لأننا مش هنستخدم الـ error نفسه.`,
            R`رسالة للمستخدم، والإيميل يفضل في الخانة عشان يدوس Save تاني من غير ما يكتبه من الأول.`,
            R`قفلة الـ [[catch]].`,
            R`التاني لـ [[useActionState]] هو الـ state الأولى قبل أي إرسال: مفيش خطأ ولا نجاح، والخانة فاضية.`,
            R`بداية الـ JSX. القوس بيخلي الـ JSX ينفع يتكتب على كذا سطر من غير ما JS يحط [[;]] بعد [[return]] لوحده ويرجّع [[undefined]].`,
            R`بنحط [[formAction]] على [[action]] بتاع الفورم، و React بيمنع الـ reload لوحده، ويجمع الخانات في [[FormData]]، وينادي الـ action جوه transition. فمفيش [[onSubmit]] ولا [[preventDefault]]. وبعد ما الـ action تخلص React بيعمل reset للخانات الـ uncontrolled.`,
            R`[[name]] هو المفتاح اللي [[formData.get]] بتقرا بيه. الخانة uncontrolled ([[defaultValue]] مش [[value]])، فالمتصفح ماسك الكلام ومفيش re-render مع كل حرف، ولما الفورم يعمل reset بيرجّعها لـ [[state.email]] الجديدة. و [[aria-label]] اسم للخانة يقراه قارئ الشاشة، لأن مفيش label ظاهر.`,
            R`الزرار مترسوم جوه الـ [[<form>]]، فـ [[useFormStatus]] اللي جواه يقدر يشوف حالة الفورم ده.`,
            R`لو فيه خطأ بيتعرض: [[&&]] بترسم الـ [[<p>]] بس لو [[state.error]] نص مش فاضي. و [[role="alert"]] بيخلي قارئ الشاشة يقرا الرسالة أول ما تظهر.`,
            R`رسالة النجاح بتظهر لو فيه إيميل اتسجّل ومفيش إرسال جديد شغال، فمتفضلش ظاهرة وانت بتبعت تاني. و [[role="status"]] بيتقري بهدوء من غير ما يقاطع المستخدم.`,
            R`قفلة الفورم؛ أي خانة أو زرار جواه بيتبعت معاه وبيشوف حالته.`,
            R`قفلة قوس الـ [[return]].`,
            R`قفلة [[NewsletterForm]].`,
            R`زرار like بيزوّد الرقم على الشاشة فورًا قبل ما السيرفر يرد. [[likes]] القيمة الحقيقية من الأب، و [[onLike]] الطلب اللي بيسجّل الـ like.`,
            R`[[optimisticLikes]] هي اللي بنعرضها: في العادي بتساوي [[likes]]، ووقت الـ action بتبقى [[likes]] زائد كل اللي اتضاف بـ [[addOptimistic]]، والدالة التانية بتقول إزاي يتطبّق التعديل. أول ما الـ action تخلص القيمة المتفائلة بتتشال وترجع [[likes]]، فلو الأب محدّثش [[likes]] الرقم بيرجع زي ما كان.`,
            R`الـ action اللي هتتحط على الفورم. [[addOptimistic]] لازم يتنادى جوه action أو transition، وده متحقق هنا لأن React بينادي أي دالة على [[<form action>]] جوه transition.`,
            R`بيزوّد 1 على الشاشة فورًا من غير ما يستنى الشبكة، فالضغطة تحس إنها سريعة.`,
            R`بيبعت الطلب ويستنى، وطول ما هو شغال الرقم المتفائل ظاهر. لما يخلص القيمة المتفائلة بتتشال، فالمفروض الأب يكون حدّث [[likes]] بالرقم الجديد (من الكاش أو الـ state)، وإلا الرقم يرجع للقديم.`,
            R`قفلة [[likeAction]].`,
            R`فورم صغير فيه زرار بس: الضغطة بتبعت الفورم، فـ React ينادي [[likeAction]] جوه transition، وده اللي بيخلي [[useOptimistic]] يشتغل. والزرار بيعرض [[optimisticLikes]] مش [[likes]].`,
            R`قفلة [[LikeButton]].`,
          ],
          sol: R`«bad»: رسالة «Enter a valid email» والنص «bad» فاضل في الخانة. إيميل سليم: الزرار «Saving...» ومقفول ثانيتين، وبعدين «Subscribed a@b.com» والخانة فاضية. من غير [[defaultValue={state.email}]]: الخطأ بيظهر والخانة بتتمسح، لأن React بتعمل reset بعد أي action خلصت.

LikeButton: الرقم بيبقى ♥ 11 فورًا. لو onLike فشلت (والأب مزوّدش)، بيرجع ♥ 10 لوحده لما الـ promise تخلص. لو نجحت والأب زوّد، بيفضل 11. (الاتنين متجرّبين في اختبار بـ user-event.)`,
          solCode: R`function LikeHost() {
  const [likes, setLikes] = useState(10)
  const attempt = useRef(0)
  async function onLike() {
    await new Promise(r => setTimeout(r, 1000))
    attempt.current++
    if (attempt.current % 2 === 1) return // فشل: مفيش تحديث
    setLikes(l => l + 1)
  }
  return <LikeButton likes={likes} onLike={onLike} />
}
<NewsletterForm subscribe={() => new Promise(r => setTimeout(r, 2000))} />`
        },
        {
          cmd: "render props و HOCs",
          title: "اقرا الـ patterns القديمة: render props و Higher-Order Components",
          desc: R`قبل الـ hooks (٢٠١٩)، كان فيه طريقتين لمشاركة منطق بين components: الـ render prop، component بياخد دالة وينادها بالبيانات ([[<MouseTracker render={pos => <Cursor {...pos} />} />]])، والـ HOC، دالة بتاخد component وترجّع component جديد ملفوف ([[export default withAuth(Dashboard)]]).

النهارده الاتنين بيتكتبوا custom hook: [[const pos = useMousePosition()]] و [[const { user } = useAuth()]]. بس هتلاقيهم كتير في الكود القديم وفي مكتبات لسه شغالة ([[connect()]] بتاع Redux القديم، و [[withRouter]] بتاع React Router 5، و [[<Formik>{({ values }) => ...}</Formik>]])، فلازم تعرف تقراهم وتحوّلهم.`,
          example: R`// render prop
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => ReactNode }) {
  const pos = useMousePosition()
  return <>{render(pos)}</>
}
// <MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />

// HOC
function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth()
    if (isLoading) return <Spinner />
    if (!user) return <Navigate to="/login" replace />
    return <Component {...props} />
  }
}
// export default withAuth(Dashboard)

// النهارده: hook
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return pos
}`,
          try: R`خد الـ HOC ده وحوّله: بدل [[withAuth(Dashboard)]] استخدم [[RequireAuth]] (layout route من درس protected route) أو hook جوه Dashboard. وافتح React DevTools على component ملفوف في ٣ HOCs ([[withAuth(withTheme(withI18n(Page)))]]) وشوف شكل الشجرة.`,
          flag: "script",
          deep: {
            why: R`كود React عمره ٥ سنين أو أكتر مليان HOCs و render props، ولما تشتغل في شركة هتصلّح فيه أو تنقله. ولو مش فاهم إن [[withRouter(connect(mapState)(Component))]] ده component ملفوف مرتين، مش هتعرف منين الـ props جاية. وكمان الـ render prop لسه مستخدم في مكتبات حديثة لما الأب محتاج يرسم حاجة بالبيانات بتاعة الابن ([[<Controller render={({ field }) => ...}>]] في react-hook-form و [[table.Subscribe]] في TanStack).`,
            how: R`الـ render prop: الـ component صاحب المنطق مبيعرفش هيرسم إيه، فبينادي الدالة اللي جاتله بالبيانات ويرسم اللي رجع. نفس الفكرة لو الدالة جت كـ children: [[<Mouse>{pos => ...}</Mouse>]] (function as children). ومشكلتها التداخل: ٣ render props جوه بعض بيعملوا «pyramid» صعب يتقري.

الـ HOC: [[withAuth(Dashboard)]] بيرجّع component جديد بيعمل حاجة (auth check، أو بيحقن props زي [[user]]) وبعدين يرسم الأصلي. المشاكل: الـ props بتتحقن من غير ما تشوفها في الـ JSX (منين [[user]] جت؟)، وتعارض الأسماء لو اتنين HOCs حقنوا نفس الـ prop، والـ DevTools مليانة طبقات ([[WithAuth > WithTheme > Page]])، والـ types في TypeScript صعبة. والـ HOC لازم يتعمل مرة واحدة برا الـ render: [[withAuth(Page)]] جوه component بيعمل component جديد كل render فالـ state بتروح.

الـ hooks حلّت ده: المنطق في دالة، والقيم بتظهر صريحة في الـ component ([[const { user } = useAuth()]])، ومفيش طبقات. لكن الـ render prop لسه أنسب لما الـ component الأب محتاج يتحكم في «الرسم» في نقطة معينة (Controller في RHF، أو Virtualizer في بعض المكتبات)، و HOCs لسه بتتشاف في حاجات زي [[memo()]] نفسه (هو HOC) و [[observer()]] في MobX.`,
            when: R`تقرا وتعدّل كود قديم. ولما تكتب جديد: hooks دايمًا، و render prop بس لو الأب محتاج يدّي «فتحة رسم» بالبيانات بتاعته.`,
            mistakes: R`تعمل HOC جوه render. و HOC بينسى يمرر [[{...props}]] فالـ props بتضيع. وتكتب HOC جديد في ٢٠٢٦ لحاجة hook بيعملها. وتحوّل كود قديم كله مرة واحدة من غير اختبارات. وسؤال انترفيو: «HOC ولا hook؟» الـ hooks بتشارك منطق من غير ما تغيّر الشجرة ومن غير props مخفية، والـ HOC لسه مفيد لما عايز «تلف» component كامل من برا (memo مثلًا).`
          },
          teach: R`## الفكرة: ٣ طرق لمشاركة نفس المنطق

المثال فيه نفس المنطق مكتوب بالـ patterns التلاتة اللي هتقابلها: [[MouseTracker]] (render prop: بيدّي البيانات لدالة إنت بتبعتها)، و [[withAuth]] (HOC: دالة بتلف component)، و [[useMousePosition]] (custom hook: الطريقة النهارده، واللي MouseTracker نفسه بيستخدمها جواه).

اتشغّل في Vite 8.3 + React 19.3 + React Router 8.4 في Chrome headless. [[useAuth]] و [[Spinner]] مش في المثال، فعملنا [[useAuth]] وهمي: بيقول [[isLoading]] لمدة 300ms، وبعدين فيه user ([[Sara]]) لو الـ URL فيه [[user=1]].

---

## ١. render prop

~~~text المثال
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => ReactNode }) {
  const pos = useMousePosition()
  return <>{render(pos)}</>
}
// <MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />
~~~

- [[render]]: prop نوعها دالة: بتاخد [[{ x, y }]] وترجّع حاجة تترسم ([[ReactNode]]).
- MouseTracker صاحب المنطق (موقع الماوس)، بس مبيعرفش يرسم إيه. [[render(pos)]] بينادي الدالة اللي جاتله بالبيانات، ويرسم اللي رجّعته.
- [[<>...</>]]: Fragment حوالين الناتج.
- في الاستخدام: [[({ x, y }) => <p>{x}, {y}</p>]]: دالة بتفك الـ object وترجّع [[<p>]]. اللي بيستخدم MouseTracker هو اللي بيقرر الشكل.

~~~text الناتج (Chrome)
at load:                      "0, 0"
after mouse move to (120,45): "120, 45"
~~~

## ٢. HOC (Higher-Order Component)

~~~text المثال
function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth()
    if (isLoading) return <Spinner />
    if (!user) return <Navigate to="/login" replace />
    return <Component {...props} />
  }
}
// export default withAuth(Dashboard)
~~~

- [[withAuth]] دالة عادية (مش component): بتاخد component وترجّع component جديد. «Higher-order» يعني دالة بتاخد أو ترجّع دوال.
- [[<P extends object>]]: generic. [[P]] هو نوع الـ props بتاع الـ component الأصلي، و [[extends object]] يعني لازم يبقى object. كده الـ component الجديد بياخد نفس الـ props بالظبط.
- [[ComponentType<P>]]: نوع «أي component بياخد P».
- [[function WithAuth]]: الـ component الجديد، باسم (مش arrow مجهولة) عشان يظهر في React DevTools باسمه.
- جواه: لو بيحمّل اعرض Spinner. لو مفيش user، [[<Navigate to="/login" replace />]] (component من React Router بيعمل redirect أول ما يترسم، و [[replace]] عشان الـ Back ميرجعش للصفحة المحمية). غير كده ارسم الأصلي.
- [[{...props}]]: مرّر كل الـ props للأصلي. لو نسيتها، الـ props بتضيع.

لفّينا [[DashboardOld]] (بياخد [[title]]) بـ [[withAuth]] مرة واحدة برا أي component:

~~~text الناتج (Chrome)
logged in:   at load "loading..."  →  بعد 300ms "Dashboard (HOC)"   url /?l=l13&user=1
logged out:  at load "loading..."  →  بعد 300ms "login page"         url /login
~~~

- [[title]] وصل للأصلي عن طريق [[{...props}]].
- من غير user، الـ HOC ودّانا [[/login]].

## ٣. نفس المنطق كـ hook

~~~text المثال
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return pos
}
~~~

- [[use]] في أول الاسم: ده custom hook، فينفع تنادي جواه hooks تانية.
- [[useState({ x: 0, y: 0 })]]: الموقع، بيبدأ من الصفر (ده اللي ظهر [["0, 0"]] قبل ما الماوس يتحرك).
- [[useEffect(..., [])]]: مرة واحدة بعد أول رسم: سجّل listener على [[window]] لحدث [[mousemove]].
- [[e.clientX]] و [[e.clientY]]: مكان الماوس بالبكسل من فوق شمال الجزء الظاهر من الصفحة.
- [[return () => window.removeEventListener(...)]]: الـ cleanup: لما الـ component يتشال، شيل الـ listener (لازم نفس الدالة [[onMove]] بالظبط).
- [[return pos]]: الـ hook بيرجّع قيمة بس، مبيرسمش حاجة.

أي component يكتب [[const pos = useMousePosition()]] وياخد الموقع، من غير ما يتلف في حاجة ومن غير ما الشجرة تتغير.

---

## ٤. الـ solCode: من HOC لـ routes

~~~text solCode
// قبل
export default withAuth(Dashboard)

// بعد: الحماية في الـ routes
const router = createBrowserRouter([
  { Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] },
])
~~~

- [[{ Component: RequireAuth, children: [...] }]]: layout route من غير [[path]]: بيلف كل الـ children. [[RequireAuth]] (درس protected route) فيه نفس الـ if بتاعة الـ HOC، بس بدل [[<Component {...props} />]] بيرسم [[<Outlet />]] (مكان الـ route الابن).
- كل صفحة محتاجة حماية تتحط في [[children]]، من غير ما تلف ولا component بإيدك.

~~~text solCode
function Dashboard() {
  const { user } = useAuth()
  return <h1>Hi {user?.name}</h1>
}
~~~

- لو الصفحة محتاجة المستخدم نفسه: hook صريح. واضح [[user]] جاي منين، بدل prop بيحقنها HOC من غير ما تشوفها.
- [[user?.name]]: [[?.]] لو [[user]] بـ [[null]] متقعش.

~~~text الناتج (Chrome، فتح /dashboard)
logged in:   "Hi Sara"      url /dashboard?l=l13&user=1
logged out:  "login page"   url /login
~~~

---

## الخلاصة

| | render prop | HOC | hook |
|---|---|---|---|
| الشكل | [[<X render={data => ...} />]] | [[withX(Component)]] | [[const data = useX()]] |
| البيانات بتيجي منين | باراميتر الدالة | props مخفية | قيمة صريحة |
| بيغيّر الشجرة | طبقة | طبقة لكل HOC | لأ |
| النهارده | لما الأب يحتاج «فتحة رسم» (Controller في RHF) | تقراه في كود قديم، و [[memo()]] نفسه HOC | الافتراضي لأي منطق مشترك |

- الـ HOC يتعمل مرة واحدة برا الـ render، ويمرر [[{...props}]]، ودالته الداخلية ليها اسم.
- الحماية في React Router: layout route، مش HOC على كل صفحة.`,
          lines: [
            R`render prop: الـ component بياخد prop اسمها [[render]] وهي دالة بتاخد مكان الماوس وترجّع JSX. هو بيوفّر البيانات، واللي بيستخدمه بيقرر يرسم إيه. ده كان الأسلوب المعتاد لمشاركة منطق بين components قبل الـ hooks.`,
            R`المنطق الحقيقي (السماع للماوس) موجود في الـ hook اللي تحت، و [[MouseTracker]] بقى مجرد غلاف حواليه. وده بيوضّح ليه الـ hooks خلّت الـ pattern ده مش محتاجينه كتير.`,
            R`بينادي الدالة اللي جت في الـ prop بمكان الماوس ويرسم الـ JSX اللي رجعت. مع كل حركة [[pos]] بيتغير، فـ MouseTracker يترسم تاني والدالة تتنادى من جديد. والـ Fragment [[<>]] بيلف النتيجة من غير ما يزوّد عنصر في الـ DOM.`,
            R`قفلة [[MouseTracker]].`,
            R`HOC (Higher-Order Component): دالة عادية (مش component) بتاخد component وترجّع component جديد ملفوف بمنطق زيادة، وهنا المنطق «لازم تكون عامل login». [[<P>]] نوع الـ props بتاعة الأصلي، فالجديد بياخد نفس الـ props بالظبط. والاستخدام: [[const SafeDashboard = withAuth(Dashboard)]].`,
            R`الـ component الجديد اللي هيترسم مكان الأصلي، وليه اسم ([[WithAuth]]) عشان يظهر في React DevTools. ونادي [[withAuth]] مرة واحدة برّه أي component؛ لو ناديتها جوه render هيطلع component جديد كل مرة، و React يعمل unmount للقديم ويمسح الـ state بتاعته.`,
            R`المنطق المشترك اللي كل صفحة محمية محتاجاه: مين المستخدم، وهل لسه بنتأكد. بيتكتب مرة هنا بدل ما يتكرر في كل صفحة.`,
            R`لسه بنسأل السيرفر المستخدم عامل login ولا لأ، فبنعرض spinner. من غير السطر ده، أول render [[user]] هيبقى فاضي فالمستخدم يتحوّل لصفحة الدخول حتى لو هو داخل فعلًا.`,
            R`التأكد خلص ومفيش مستخدم: [[Navigate]] بيحوّل لصفحة الدخول. و [[replace]] بيبدّل الصفحة المحمية في الـ history بدل ما يضيف عليها، فزرار back ميرجعش عليها ويتحوّل تاني في loop.`,
            R`المستخدم داخل: بيرسم الـ component الأصلي ويوزّع عليه كل الـ props اللي وصلت بـ [[{...props}]]، فالـ HOC مش بيبان للي بيستخدمه.`,
            R`قفلة [[WithAuth]].`,
            R`قفلة [[withAuth]].`,
            R`نفس منطق الماوس كـ custom hook: أي component يناديه ياخد [[pos]] على طول من غير غلاف ولا دالة render. ده البديل الحديث للـ render props والـ HOCs.`,
            R`مكان الماوس، بيبدأ من 0,0 لحد أول حركة. وكل [[setPos]] بتعمل re-render للـ component اللي بينادي الـ hook.`,
            R`effect لأن السماع لحدث على [[window]] حاجة برّه React (side effect)، فمكانها بعد الرسم مش جوه الـ render نفسه.`,
            R`الدالة اللي هتتنادى مع كل حركة: بتاخد الإحداثيات بالنسبة للجزء الظاهر من الصفحة ([[clientX]] و [[clientY]]) وتحطها في الـ state. بنحطها في متغير عشان نشيلها بنفس المرجع في الـ cleanup.`,
            R`بيسجّل الدالة على الـ [[window]] كله، فأي حركة في أي حتة في الصفحة بتوصل.`,
            R`الـ cleanup: React بينادي الدالة دي لما الـ component يتشال، فالـ listener يتشال معاه. من غيرها الـ listener يفضل شغال وماسك الـ component في الذاكرة (memory leak). ولازم تبعت نفس [[onMove]]؛ دالة جديدة بنفس الكود مش هتشيل حاجة.`,
            R`الـ deps فاضية لأن مفيش قيمة من الـ render جوه الـ effect: يشتغل مرة بعد أول render، والـ cleanup مرة لما الـ component يتشال. (في Strict Mode وقت التطوير React بيشغّله ويعمل cleanup ويشغّله تاني، عشان يكشف لو الـ cleanup ناقص.)`,
            R`بيرجّع مكان الماوس للـ component اللي نادى الـ hook.`,
            R`قفلة [[useMousePosition]].`,
          ],
          sol: R`بعد التحويل: [[Dashboard]] بقى component عادي، والحماية في layout route ([[{ Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] }]]) أو [[const { user } = useAuth()]] جواه لو محتاج الـ user نفسه. [[export default withAuth(Dashboard)]] اتشالت.

في DevTools مع ٣ HOCs هتشوف ٣ طبقات فوق Page، كل واحدة بالاسم اللي انت ادّيته للدالة الداخلية (عشان كده [[function WithAuth]] بالاسم أحسن من arrow مجهولة، اللي بتظهر «Anonymous»).`,
          solCode: R`// قبل
export default withAuth(Dashboard)

// بعد: الحماية في الـ routes
const router = createBrowserRouter([
  { Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] },
])
// ولو Dashboard محتاج المستخدم:
function Dashboard() {
  const { user } = useAuth()
  return <h1>Hi {user?.name}</h1>
}`
        }
      ]
    }
]);
