// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "الاختبارات واللغات والـ accessibility",
      l: 2,
      n: "Vitest و Vue Test Utils، و vue-i18n مع RTL والجمع العربي، و a11y تتقاس بـ axe",
      items: [
        {
          cmd: "Vitest + Vue Test Utils",
          title: "تختبر component: mount و trigger و emitted و stub للـ fetch",
          desc: R`Vitest بيشغّل الاختبارات، و [[@vue/test-utils]] (النسخة 2.5) بيرسم الـ component في DOM وهمي (jsdom): [[mount(Comp, { props })]] بيرجّع [[wrapper]] تدوّر فيه بـ [[get]] و [[find]]، وتضغط بـ [[trigger('click')]]، وتشوف الـ events اللي اتبعتت بـ [[emitted()]].

ولـ Pinia فيه [[createTestingPinia]] من [[@pinia/testing]] بيحط state جاهز ويحوّل الـ actions لـ spies، ولـ [[fetch]] بتعمل [[vi.stubGlobal('fetch', vi.fn())]] و [[flushPromises()]] تستنى الـ Promises.`,
          example: R`import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CartRow from '@/components/CartRow.vue'
import CartBadge from '@/components/CartBadge.vue'
import { useCartStore } from '@/stores/cart'
import Products from '@/views/Products.vue'

describe('CartRow', () => {
  it('emits update:qty when + is clicked', async () => {
    const wrapper = mount(CartRow, { props: { id: 7, name: 'ماوس', qty: 2 } })
    expect(wrapper.text()).toContain('ماوس')
    await wrapper.get('.plus').trigger('click')
    expect(wrapper.emitted('update:qty')).toEqual([[3]])
  })

  it('emits remove with the id', async () => {
    const wrapper = mount(CartRow, { props: { id: 7, name: 'ماوس', qty: 1 } })
    expect(wrapper.get('.minus').attributes('disabled')).toBeDefined()
    await wrapper.get('.rm').trigger('click')
    expect(wrapper.emitted('remove')?.[0]).toEqual([7])
  })
})

describe('CartBadge', () => {
  it('reads the store and calls clear', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: { cart: { items: [{ id: 1, name: 'ماوس', price: 350, qty: 3 }] } },
    })
    const wrapper = mount(CartBadge, { global: { plugins: [pinia] } })
    expect(wrapper.text()).toContain('3 | 1050 EGP')
    await wrapper.get('button').trigger('click')
    expect(useCartStore().clear).toHaveBeenCalledTimes(1)
  })
})

describe('Products.vue', () => {
  it('shows loading, then the list', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => [{ id: 1, name: 'شاشة', price: 4200 }] })
    vi.stubGlobal('fetch', fetchMock)
    const wrapper = mount(Products)
    expect(wrapper.text()).toContain('بيحمّل')
    await flushPromises()
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/products?q=', expect.anything())
  })

  it('shows the error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    const wrapper = mount(Products)
    await flushPromises()
    expect(wrapper.get('[role=alert]').text()).toBe('حصل خطأ: HTTP 500')
  })
})`,
          try: R`[[npm i -D @pinia/testing]]، وحط الملف في [[src/components/__tests__/cart.spec.ts]] وشغّل [[npm run test:unit -- --run]]. بعدين غيّر [[[[3]]]] لـ [[[[4]]]] واقرا الـ diff. وشيل أول [[await flushPromises()]]: إيه اللي بيقع وليه؟`,
          flag: "script",
          deep: {
            why: R`كل ما المشروع يكبر، أي تعديل ممكن يكسر حاجة في صفحة تانية. الاختبار بيتأكد إن الـ component بيعمل اللي المفروض يعمله (بيعرض، وبيبعت events، وبيتعامل مع الخطأ) في ثانيتين، من غير ما تفتح المتصفح وتضغط بإيدك. و create-vue بيجهّز Vitest و jsdom لو اخترت [[--vitest]].`,
            how: R`[[mount]] بيعمل app صغير ويرسم الـ component في [[document]] بتاع jsdom (DOM مكتوب بـ JavaScript، من غير متصفح). [[wrapper.get(selector)]] بيرجّع العنصر أو يرمي خطأ لو مش موجود، و [[find]] بيرجّع wrapper فاضي ([[exists()]] = false). [[trigger]] بيبعت event ويرجّع Promise بتخلص بعد ما Vue يحدّث الـ DOM، عشان كده [[await]].

[[emitted('x')]] array فيه array لكل مرة الـ event اتبعت: [[[[3]]]] يعني مرة واحدة بـ argument واحد هو 3. و [[createTestingPinia]] بيعمل pinia كل actions فيها [[vi.fn()]] (مش بتتنفّذ فعلًا)، و [[createSpy: vi.fn]] لازم لو [[globals]] مش مفعّلة في Vitest (من غيرها بيرمي [[PINIA_TESTING_C0001]]). و [[global.plugins]] بيركّب plugins (pinia أو router أو i18n) للـ app الصغير ده.

[[vi.stubGlobal('fetch', ...)]] بيبدّل [[fetch]] بنسخة مزيّفة بترجّع اللي انت عايزه، و [[flushPromises()]] بيستنى كل الـ Promises اللي مستنية تخلص. ولـ API حقيقية أكتر، MSW بيمسك الطلبات على مستوى الشبكة (شوف درس MSW في «تاب React»، نفس الإعداد).`,
            when: R`components فيها منطق (شروط، events، حسابات، حالات loading و error)، والـ stores، والـ composables. ومتختبرش إن Vue بيرسم [[{{ name }}]]. ولـ flows كاملة (login ثم شراء) في متصفح حقيقي استخدم Playwright (create-vue بيعرض [[--playwright]]).`,
            mistakes: R`تنسى [[await]] قبل [[trigger]] فتشيّك قبل ما الـ DOM يتحدّث. وتنسى [[flushPromises]] مع الـ fetch. وتختبر تفاصيل داخلية ([[wrapper.vm.count]]) بدل اللي المستخدم شايفه، فأي refactor يكسر الاختبار. وتسيب [[vi.stubGlobal]] من غير [[vi.unstubAllGlobals()]] في [[afterEach]] فتأثر على اختبارات تانية (أو فعّل [[unstubGlobals: true]] في الـ config).`
          },
          teach: R`## الفكرة: ارسم، اعمل حاجة، اتأكد

شغّلنا الملف في مشروع create-vue (Vitest 4.1.11، @vue/test-utils 2.5.1، @pinia/testing 2.0.2، jsdom 30.1). الـ components هي نفس اللي في دروس [[defineEmits و defineModel]] و [[Pinia]] و [[loading و error]].

---

## ١. الأدوات

| الاسم | منين | شغلته |
|---|---|---|
| [[describe]] و [[it]] و [[expect]] | vitest | مجموعة، واختبار، وتأكيد |
| [[vi]] | vitest | mocks و spies و stubs |
| [[mount]] | @vue/test-utils | ارسم الـ component |
| [[flushPromises]] | @vue/test-utils | استنى كل الـ Promises |
| [[createTestingPinia]] | @pinia/testing | pinia للاختبار |

---

## ٢. [[CartRow]]: الـ events

~~~text cart.spec.ts
const wrapper = mount(CartRow, { props: { id: 7, name: 'ماوس', qty: 2 } })
await wrapper.get('.plus').trigger('click')
expect(wrapper.emitted('update:qty')).toEqual([[3]])
~~~

- [[mount(..., { props })]]: الـ props اللي الأب كان هيبعتها.
- [[trigger('click')]] على «+»: الـ [[defineModel]] بيبعت [[update:qty]] بـ 3.
- [[toEqual]] بـ array جواها array فيها 3: الـ event اتبعت مرة واحدة، والـ argument بتاعه 3.

والتاني: [[attributes('disabled')]] موجودة لما [[qty = 1]]، و «امسح» بعت [[remove]] بـ 7.

---

## ٣. [[CartBadge]]: store للاختبار

| السطر | معناه |
|---|---|
| [[createSpy: vi.fn]] | كل action تبقى [[vi.fn()]] |
| [[initialState: { cart: {...} }]] | state الـ store اللي اسمه [[cart]] |
| [[global: { plugins: [pinia] }]] | ركّب الـ pinia دي |
| [[toContain(...)]] | النص فيه العدد 3 والإجمالي [[1050 EGP]]: الـ getters اتحسبت من الـ state ده (3 × 350) |
| [[useCartStore().clear]] | spy، و [[toHaveBeenCalledTimes(1)]] اتنادت مرة |

من غير [[createSpy]]، أول تشغيل وقع:

~~~text الناتج
PINIA_TESTING_C0001: You must configure the "createSpy" option.
~~~

---

## ٤. [[Products]]: fetch مزيّف

~~~text cart.spec.ts
const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => [...] })
vi.stubGlobal('fetch', fetchMock)
const wrapper = mount(Products)
expect(wrapper.text()).toContain('بيحمّل')
await flushPromises()
~~~

- [[mockResolvedValue]]: الدالة بترجّع Promise بالقيمة دي (شكل [[Response]] بسيط).
- أول ما اترسم: «بيحمّل» (الطلب لسه).
- [[flushPromises()]]: الـ fetch والـ [[json()]] خلصوا، فالـ list ظهرت.
- [[toHaveBeenCalledWith('/api/products?q=', expect.anything())]]: اتنادت بالـ URL ده وأي حاجة تانية (الـ signal).

---

## ٥. الناتج

~~~text الناتج (--reporter=verbose)
 ✓ src/components/__tests__/cart.spec.ts > CartRow > emits update:qty when + is clicked 25ms
 ✓ src/components/__tests__/cart.spec.ts > CartRow > emits remove with the id 3ms
 ✓ src/components/__tests__/cart.spec.ts > CartBadge > reads the store and calls clear 6ms
 ✓ src/components/__tests__/cart.spec.ts > Products.vue > shows loading, then the list 9ms
 ✓ src/components/__tests__/cart.spec.ts > Products.vue > shows the error 4ms
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  1.23s
~~~

---

## ٦. لما يقع

غيّرنا [[[[3]]]] لـ [[[[4]]]]:

~~~text الناتج
AssertionError: expected [ [ 3 ] ] to deeply equal [ [ 4 ] ]

- Expected
+ Received

  [
    [
-     4,
+     3,
    ],
  ]
~~~

[[-]] اللي انت متوقعه، و [[+]] اللي حصل فعلًا.

ومن غير أول [[flushPromises]]:

~~~text الناتج
AssertionError: expected [] to have a length of 1 but got +0
~~~

الاختبار شيّك والـ [[fetch]] لسه مخلصش، فمفيش [[<li>]].

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[mount(C, { props })]] | ارسم الـ component في DOM وهمي ورجّع [[wrapper]] |
| [[get]] و [[find]] و [[findAll]] | دوّر على عناصر: [[get]] بيرمي لو ملقاش، و [[find]] بيرجّع wrapper فاضي، و [[findAll]] بيرجّعهم كلهم |
| [[await trigger('click')]] | اضغط واستنى التحديث |
| [[emitted('x')]] | الـ events اللي اتبعتت: array فيها عنصر لكل مرة |
| [[global: { plugins }]] | pinia و router و i18n |
| [[createTestingPinia({ createSpy: vi.fn })]] | store بـ state جاهز و actions مزيّفة |
| [[vi.stubGlobal('fetch', ...)]] + [[flushPromises]] | API مزيّفة من غير سيرفر، واستنى ردها |`,
          lines: [
            R`بيستورد من Vitest أدوات الاختبار: [[describe]] بيجمّع اختبارات تحت اسم واحد، و [[it]] اختبار واحد، و [[expect]] بيتأكد من قيمة، و [[vi]] بيعمل دوال مزيّفة (mocks و spies). من غير السطر ده الملف مش هيعرف الكلمات دي، إلا لو [[globals: true]] متفعّلة في الـ config.`,
            R`بيستورد من Vue Test Utils: [[mount]] اللي بيرسم الـ component في DOM وهمي (jsdom) ويرجّع [[wrapper]] تتعامل بيه، و [[flushPromises]] اللي بتستنى كل الـ Promises اللي لسه مخلصتش (زي [[fetch]]).`,
            R`[[createTestingPinia]] بيعمل نسخة Pinia مخصوصة للاختبار: تحط فيها state جاهز، وكل الـ actions بتبقى دوال مزيّفة بتسجّل إنها اتنادت من غير ما تنفّذ الكود الحقيقي.`,
            R`أول component هنختبره: صف في السلة فيه «-» و «+» و «امسح» (من درس [[defineEmits و defineModel]]). الـ [[@]] اختصار لفولدر [[src]] متعرّف في إعدادات Vite.`,
            R`الـ badge اللي بيعرض عدد السلة وإجماليها من الـ Pinia store (من درس [[Pinia]])، وفيه زرار «فضّي».`,
            R`بنستورد الـ store نفسه عشان بعد الضغط نوصل لـ [[clear]] ونسأل: اتنادت؟ في الاختبار [[useCartStore()]] بيرجّع الـ store بتاع الـ pinia المزيّفة.`,
            R`صفحة المنتجات اللي بتجيب البيانات بـ [[fetch]] وتعرض «بيحمّل...» أو الـ list أو رسالة خطأ (من درس [[loading و error]]).`,
            R`[[describe]] بيفتح مجموعة اسمها [[CartRow]] فيها كل اختبارات الصف ده، فلما حاجة تقع الناتج يقولك «CartRow > ...» وتعرف المشكلة فين على طول.`,
            R`[[it]] اختبار واحد، واسمه بيوصف السلوك المطلوب: «لما تضغط + يبعت [[update:qty]]». الدالة [[async]] عشان هنعمل [[await]] جواها.`,
            R`[[mount]] بيرسم [[CartRow]] لوحده، و [[props]] هي اللي كان الأب هيبعتها: id واسم وكمية 2. اللي بيرجع [[wrapper]]: منه بتدوّر على العناصر وتضغط وتشوف الـ events.`,
            R`[[wrapper.text()]] كل النص الظاهر في الـ component، و [[toContain]] بيتأكد إن «ماوس» جواه. ده بيثبت إن الـ prop وصل واتعرض.`,
            R`[[get('.plus')]] بيلاقي زرار «+» بالـ class بتاعه (ولو مش موجود بيرمي خطأ على طول)، و [[trigger('click')]] بيضغطه. الـ [[await]] بتستنى Vue يحدّث الـ DOM، ومن غيرها ممكن تشيّك قبل التحديث.`,
            R`[[emitted('update:qty')]] بيرجّع array فيها عنصر لكل مرة الـ event اتبعت، وكل عنصر array بالـ arguments بتاعة المرة دي. فالمتوقع array جواها array فيها 3: اتبعت مرة واحدة، والقيمة الجديدة 2 + 1.`,
            R`قفلة الاختبار الأول.`,
            R`اختبار تاني: زرار «امسح» لازم يبعت event اسمه [[remove]] ومعاه id الصف.`,
            R`المرة دي الكمية 1، عشان نختبر كمان إن «-» بيتقفل لما الكمية توصل 1 (مينفعش تنزل لصفر).`,
            R`[[attributes('disabled')]] بيرجّع قيمة الـ attribute: نص فاضي لو الزرار متعطّل، و [[undefined]] لو لأ. و [[toBeDefined()]] بيتأكد إنها مش [[undefined]]، يعني «-» متقفل فعلًا مع كمية 1.`,
            R`اضغط «امسح» واستنى التحديث، زي ما عملنا مع «+».`,
            R`أول عنصر في [[emitted('remove')]] (الـ arguments بتاعة أول مرة) لازم يبقى array فيها 7، يعني الـ id اتبعت صح. والـ [[?.]] عشان لو الـ event مااتبعتش خالص، النتيجة [[undefined]] والاختبار يقع برسالة واضحة بدل ما يرمي error.`,
            R`قفلة الاختبار التاني.`,
            R`قفلة مجموعة [[CartRow]].`,
            R`مجموعة جديدة لـ [[CartBadge]]: الـ component ده مش بياخد props، بياخد بياناته من الـ store.`,
            R`الاختبار: الـ badge بيعرض اللي في الـ store صح، وزرار «فضّي» بينادي [[clear]].`,
            R`بنعمل pinia للاختبار بدل الحقيقية، عشان نتحكم في الـ state من غير ما نضيف منتجات بإيدنا.`,
            R`[[createSpy]] بيقول لـ pinia تعمل كل action بـ [[vi.fn]]، فتقدر تسأل «اتنادت كام مرة؟». ولو [[globals]] مش متفعّلة في Vitest لازم تكتبه، وإلا بيرمي [[PINIA_TESTING_C0001]].`,
            R`[[initialState]] بيحط state جاهز للـ store اللي اسمه [[cart]] (نفس الاسم اللي في [[defineStore('cart', ...)]]): منتج واحد كميته 3 وسعره 350.`,
            R`قفلة [[createTestingPinia]].`,
            R`[[global.plugins]] بيركّب الـ pinia دي على الـ app الصغير اللي [[mount]] بيعمله، زي [[app.use(pinia)]] في [[main.ts]]، فالـ component يلاقيها لما ينادي [[useCartStore()]].`,
            R`الـ getters اتحسبت من الـ state اللي حطيناه: العدد 3، والإجمالي 3 × 350 = 1050. الـ getters في [[createTestingPinia]] بتشتغل عادي، الـ actions بس هي اللي بتبقى مزيّفة.`,
            R`[[get('button')]] بيجيب أول زرار في الـ badge («فضّي»)، وبنضغطه ونستنى.`,
            R`[[useCartStore()]] هنا بيرجّع نفس الـ store اللي الـ badge استخدمه، و [[clear]] فيه spy. [[toHaveBeenCalledTimes(1)]] بيتأكد إن الضغطة نادتها مرة واحدة بالظبط. ولأنها مزيّفة السلة نفسها مااتفضّتش، وده مقصود: هنا بنختبر الـ badge مش الـ store.`,
            R`قفلة الاختبار.`,
            R`قفلة مجموعة [[CartBadge]].`,
            R`مجموعة صفحة المنتجات: التحدي هنا إن الصفحة بتعمل [[fetch]]، وإحنا مش عايزين نكلّم سيرفر حقيقي في الاختبار.`,
            R`الاختبار الأول: أول ما الصفحة تترسم تبيّن «بيحمّل»، وبعد ما البيانات توصل تبيّن الـ list.`,
            R`[[vi.fn()]] دالة مزيّفة، و [[mockResolvedValue]] بيخليها ترجّع Promise بالـ object ده: [[ok: true]] و [[json()]] بترجّع منتج واحد. ده أقل شكل من [[Response]] الصفحة محتاجاه.`,
            R`[[vi.stubGlobal]] بيحط الدالة المزيّفة مكان [[fetch]] العالمية، فأي [[fetch]] في الصفحة بيوصل لها بدل الشبكة. خلي بالك: بتفضل كده للاختبارات اللي بعدها لحد ما تعمل [[vi.unstubAllGlobals()]].`,
            R`ارسم الصفحة من غير props. الـ [[watchEffect]] اللي جوه الـ composable بيبدأ الـ [[fetch]] على طول.`,
            R`الـ Promise لسه مخلصتش، فالصفحة لازم تكون بتعرض «بيحمّل...». ده بيختبر حالة التحميل اللي ناس كتير بتنساها.`,
            R`[[flushPromises()]] بيستنى كل الـ Promises المستنية: الـ [[fetch]] المزيّف و [[json()]]، و Vue يحدّث الـ DOM. من غير السطر ده السطر اللي بعده بيلاقي 0 عنصر ويقع.`,
            R`[[findAll('li')]] بيرجّع كل عناصر [[<li>]]، و [[toHaveLength(1)]] بيتأكد إنهم واحد: المنتج اللي رجّعه الـ fetch المزيّف اتعرض.`,
            R`بيتأكد إن الصفحة طلبت الـ URL الصح ([[q]] فاضي في الأول)، و [[expect.anything()]] معناها «وأي argument تاني مش null ولا undefined»، وهنا ده الـ [[{ signal }]] بتاع الـ AbortController.`,
            R`قفلة الاختبار.`,
            R`الاختبار التاني: لو السيرفر رجّع خطأ، الصفحة تعرض رسالة الخطأ بدل الـ list.`,
            R`المرة دي الـ fetch المزيّف بيرجّع [[ok: false]] و status 500، فالـ composable بيرمي [[Error('HTTP 500')]] ويحط رسالته في [[error]].`,
            R`ارسم الصفحة من جديد، فتعمل الطلب بالـ fetch المزيّف الجديد.`,
            R`استنى الطلب يخلص والخطأ يتسجّل والـ DOM يتحدّث.`,
            R`[[get('[role=alert]')]] بيلاقي رسالة الخطأ بالـ role بتاعها (نفس الطريقة اللي الـ screen reader بيعرفها بيها)، و [[toBe]] بيقارن النص كله بالظبط.`,
            R`قفلة الاختبار.`,
            R`قفلة مجموعة صفحة المنتجات.`
          ],
          sol: R`[[5 passed]]. مع [[[[4]]]] بيطلع [[expected [ [ 3 ] ] to deeply equal [ [ 4 ] ]]] والـ diff ([[- 4]] و [[+ 3]]).

ومن غير [[flushPromises]]: [[expected [] to have a length of 1 but got +0]]، لأن الـ [[fetch]] حتى المزيّف async: بيرجّع Promise، والاختبار شيّك قبل ما تخلص.`
        },
        {
          cmd: "vue-i18n و RTL",
          title: "عربي وإنجليزي: vue-i18n، و dir=rtl، والجمع العربي",
          desc: R`[[vue-i18n]] (النسخة 11.4) بيحط كل النصوص في ملفات رسايل لكل لغة، و [[t('hello', { name })]] بيرجّع النص باللغة الحالية. تغيير [[locale.value]] بيغيّر كل الصفحة على طول.

العربي محتاج حاجتين زيادة: [[dir="rtl"]] على [[<html>]] (مع CSS بـ logical properties زي [[margin-inline-start]])، وقواعد جمع عربي (صفر ومفرد ومثنى وجمع ومن ١١ لفوق) لأن الافتراضي بتاع vue-i18n معمول للإنجليزي.`,
          example: R`// src/i18n.ts
import { createI18n } from 'vue-i18n'

const arForms = ['zero', 'one', 'two', 'few', 'many', 'other']

export const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'en',
  pluralRules: {
    ar: (n: number) => arForms.indexOf(new Intl.PluralRules('ar').select(n)),
  },
  messages: {
    ar: { hello: 'أهلا يا {name}', items: 'مفيش منتجات | منتج واحد | منتجين | {n} منتجات | {n} منتج | {n} منتج' },
    en: { hello: 'Hello {name}', items: 'no items | one item | {n} items' },
  },
})

// src/App.vue
<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

watchEffect(() => {
  document.documentElement.lang = locale.value
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
})
</script>

<template>
  <h1>{{ t('hello', { name: 'Sara' }) }}</h1>
  <p v-for="n in [0, 1, 2, 5, 11, 100]" :key="n">{{ t('items', n) }}</p>
  <p class="price">{{ (1234.5).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US', { style: 'currency', currency: 'EGP' }) }}</p>
  <button @click="locale = locale === 'ar' ? 'en' : 'ar'">{{ locale === 'ar' ? 'English' : 'عربي' }}</button>
</template>

<style scoped>
.price {
  margin-inline-start: 1rem;
  border-inline-start: 3px solid #42b883;
}
</style>`,
          try: R`[[npm i vue-i18n]]، وفي [[main.ts]] [[app.use(i18n)]]. شغّل وبدّل اللغة: الخط الأخضر جنب السعر اتنقل من ناحية لناحية؟ بعدين شيل [[pluralRules]]: [[t('items', 5)]] بقى بيقول إيه؟`,
          flag: "script",
          deep: {
            why: R`أغلب المشاريع في مصر والخليج لازم تبقى عربي وإنجليزي. لو النصوص مكتوبة جوه الـ templates، الترجمة معناها تعدّل كل ملف. ولو الـ CSS بـ [[left]] و [[right]]، العربي هيبقى مقلوب. والجمع العربي ليه ٦ أشكال: «منتجين» و «٥ منتجات» و «١١ منتج»، والمكتبة مبتعرفش ده لوحدها.`,
            how: R`[[legacy: false]] معناها Composition API ([[useI18n()]]) بدل [[this.$t]] بتاع Options API. [[t('items', n)]]: الرسالة مقسومة بـ [[ | ]] لأشكال، والمكتبة بتختار رقم الشكل. الافتراضي بيختار 0 لصفر و 1 للمفرد و 2 لأي حاجة أكبر، فـ ٥ و ١٠٠ بيبقوا «منتجين». و [[pluralRules.ar]] بيستخدم [[Intl.PluralRules('ar')]] اللي جوه المتصفح ويرجّع واحد من [[zero]] و [[one]] و [[two]] و [[few]] (٣ لـ ١٠) و [[many]] (١١ لـ ٩٩) و [[other]] (١٠٠ وغيرها)، وإحنا بنحوّل الاسم لرقم الشكل.

[[dir="rtl"]] على [[<html>]] بيقلب اتجاه الصفحة كلها: النص، و flex، و grid. والـ logical properties ([[margin-inline-start]] و [[padding-inline-end]] و [[border-inline-start]] و [[inset-inline-start]]) معناها «بداية السطر» مش «الشمال»، فبتتقلب لوحدها (شوف درس «logical properties» في «تاب HTML و CSS»). و [[toLocaleString('ar-EG', ...)]] (Intl) بيكتب الأرقام والعملة بشكل كل بلد.`,
            when: R`من أول يوم لو المشروع ممكن يبقى بلغتين، لأن نقل النصوص بعدين متعب. وفي Nuxt فيه [[@nuxtjs/i18n]] بيعمل routes لكل لغة ([[/en/products]]) و SEO.`,
            mistakes: R`تكتب [[margin-left]] و [[text-align: left]] في كل حتة فالعربي يبوظ. وتنسى [[lang]] على [[<html>]] فالـ screen reader يقرا العربي بنطق إنجليزي. وتجمع النصوص بإيدك ([[n + ' منتجات']]). وتقلب الأيقونات اللي ليها اتجاه (سهم «التالي») وتنسى اللي مالهاش (علامة صح). وتحط الأرقام والتواريخ في الرسايل كنص بدل [[n()]] و [[d()]] أو Intl.`
          },
          teach: R`## الفكرة: النصوص في ملف لكل لغة، والاتجاه من الـ locale

شغّلنا في Chrome headless (Vue 3.5.44، vue-i18n 11.4.16)، وطبعنا [[<html>]] والنصوص وناحية الـ border قبل وبعد ما بدّلنا اللغة.

---

## ١. [[createI18n]]

| الخانة | معناها |
|---|---|
| [[legacy: false]] | Composition API ([[useI18n]]) |
| [[locale: 'ar']] | اللغة اللي الصفحة بتبدأ بيها، وبتتغير بعدين من [[locale.value]] |
| [[fallbackLocale: 'en']] | لو رسالة ناقصة في العربي، خدها من الإنجليزي |
| [[pluralRules.ar]] | إزاي نختار شكل الجمع في العربي |
| [[messages]] | النصوص، و [[{name}]] مكان قيمة |

### الجمع العربي

[[new Intl.PluralRules('ar').select(n)]] بيرجّع اسم الفئة، و [[arForms.indexOf]] بيحوّلها لرقم الشكل في الرسالة:

| n | الفئة | الشكل | النص |
|---|---|---|---|
| 0 | zero | 0 | مفيش منتجات |
| 1 | one | 1 | منتج واحد |
| 2 | two | 2 | منتجين |
| 5 | few | 3 | 5 منتجات |
| 11 | many | 4 | 11 منتج |
| 100 | other | 5 | 100 منتج |

---

## ٢. الـ component

- [[useI18n()]]: [[t]] للترجمة، و [[locale]] ref اللغة.
- [[watchEffect]]: كل ما [[locale]] يتغير حط [[lang]] و [[dir]] على [[<html>]] ([[document.documentElement]]).
- [[t('hello', { name: 'Sara' })]]: [[{name}]] بتتبدّل.
- [[t('items', n)]]: الرقم التاني بيختار الشكل، و [[{n}]] بيتحط.
- [[toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })]]: عملة بشكل مصر.
- [[border-inline-start]]: border على «بداية السطر».

---

## ٣. الناتج

~~~text الناتج (عربي)
<html lang="ar" dir="rtl">
أهلا يا Sara / مفيش منتجات / منتج واحد / منتجين / 5 منتجات / 11 منتج / 100 منتج / ‏١٬٢٣٤٫٥٠ ج.م.‏
border on: right
~~~

~~~text الناتج (بعد English)
<html lang="en" dir="ltr">
Hello Sara / no items / one item / 2 items / 5 items / 11 items / 100 items / EGP 1,234.50
border on: left
~~~

- [[١٬٢٣٤٫٥٠ ج.م.]]: أرقام هندية وفاصلة آلاف عربي ([[٬]]) وعشري ([[٫]]) و «ج.م.» من Intl لوحده. ولو عايز أرقام إنجليزي في العربي: [['ar-EG-u-nu-latn']].
- الـ border اتنقل من اليمين للشمال لوحده: [[border-inline-start]] = بداية السطر.

---

## ٤. من غير [[pluralRules]]

أول تشغيل كان من غيرها بـ ٤ أشكال:

~~~text الناتج
مفيش منتجات / منتج واحد / منتجين / منتجين
~~~

الـ 5 طلعت «منتجين»: الافتراضي بيختار [[min(n, 2)]]، فأي رقم أكبر من 2 بياخد الشكل التالت.

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| النصوص | [[messages]] و [[t('key')]] |
| قيم جوه النص | [[{name}]] و [[t('k', { name })]] |
| الجمع العربي | [[pluralRules]] + [[Intl.PluralRules('ar')]] + ٦ أشكال |
| الاتجاه | [[dir]] و [[lang]] على [[<html>]] |
| الـ CSS | logical properties ([[*-inline-start]] و [[*-inline-end]]) |
| الأرقام والعملة | [[toLocaleString]] أو [[Intl.NumberFormat]] |`,
          lines: [
            R`[[createI18n]] الدالة اللي بتعمل الـ i18n instance: فيها كل الرسايل واللغة الحالية، وبعدين بتركّبه على الـ app بـ [[app.use(i18n)]] في [[main.ts]].`,
            R`أسامي فئات الجمع اللي [[Intl.PluralRules]] بيرجّعها، بنفس ترتيب الأشكال في الرسالة. مكان الاسم في الـ array هو رقم الشكل: [[zero]] = 0 و [[few]] = 3 وهكذا.`,
            R`بنعمل الـ instance ونعمله [[export]]، عشان [[main.ts]] يستورده ويركّبه، وأي ملف برا الـ components (زي router guard) يقدر يترجم بـ [[i18n.global.t]].`,
            R`[[legacy: false]] معناها Composition API mode: بتستخدم [[useI18n()]] و [[locale]] كـ ref. الافتراضي لسه legacy (طريقة Options API: [[this.$t]])، وفي v11 بيطلّع warning إنه deprecated، فاكتبها [[false]] صريحة.`,
            R`اللغة اللي الصفحة بتبدأ بيها. بعدين بتتغير من [[locale.value]]، وكل [[t()]] في الصفحة بيتعاد حسابه لوحده لأن [[locale]] ref.`,
            R`لو مفتاح ناقص في العربي، خده من الإنجليزي بدل ما يظهر اسم المفتاح نفسه للمستخدم. وفي التطوير بيطلّع warning في الـ console يقولك الرسالة ناقصة فين.`,
            R`[[pluralRules]] بيخليك تتحكم إزاي الرقم بيختار شكل الجمع لكل لغة. لازم للعربي، لأن القاعدة الافتراضية معمولة للإنجليزي (صفر ومفرد وجمع بس).`,
            R`القاعدة للعربي: [[Intl.PluralRules('ar')]] المدمج في المتصفح و Node بيقول الرقم ده فئته إيه ([[select(5)]] = [[few]])، و [[indexOf]] بيحوّل الاسم لرقم الشكل في الرسالة. فالـ 5 بتاخد الشكل رقم 3: «5 منتجات».`,
            R`قفلة [[pluralRules]].`,
            R`[[messages]] فيه object لكل لغة، والمفاتيح نفسها ([[hello]] و [[items]]) في كل لغة. الـ template بيستخدم المفتاح بس، فإضافة لغة مش بتغيّر ولا component.`,
            R`العربي: [[{name}]] مكان قيمة بتتبعت وقت الترجمة، و [[items]] فيها ٦ أشكال مفصولة بـ [[|]] بالترتيب: صفر، مفرد، مثنى، من ٣ لـ ١٠، من ١١ لـ ٩٩، وباقي الأرقام. و [[{n}]] بيتبدّل بالرقم لوحده.`,
            R`الإنجليزي ٣ أشكال بس (صفر، مفرد، جمع)، والقاعدة الافتراضية كفاية ليه، فمحتاجش [[pluralRules]].`,
            R`قفلة [[messages]].`,
            R`قفلة [[createI18n]].`,
            R`بداية الـ script بتاع [[App.vue]] بـ [[setup]] و TypeScript.`,
            R`[[watchEffect]] بيشغّل دالة على طول، ويعيد تشغيلها كل ما أي ref اتقرا جواها يتغير. هنستخدمه عشان [[<html>]] يتبع اللغة.`,
            R`[[useI18n]] بيوصّلك لـ [[t]] و [[locale]] جوه الـ component. بيشتغل بس لأن [[app.use(i18n)]] اتعمل في [[main.ts]].`,
            R`[[t]] دالة الترجمة: تديها مفتاح ترجّعلك النص باللغة الحالية. و [[locale]] ref فيه اسم اللغة ([['ar']])، بتقراه وتغيّره بـ [[.value]] في الـ script، ومن غير [[.value]] في الـ template.`,
            R`كل ما [[locale]] يتغير الدالة دي بتتنفّذ تاني، وبتتنفّذ أول مرة كمان، فالصفحة بتبدأ بالاتجاه الصح.`,
            R`[[document.documentElement]] هو [[<html>]]. بنحط عليه [[lang]] عشان الـ screen reader ينطق بالعربي، وجوجل يعرف لغة الصفحة، والمتصفح يختار الخط المناسب.`,
            R`و [[dir]]: [[rtl]] للعربي بيقلب اتجاه الصفحة كلها (النص و flex و grid)، و [[ltr]] للإنجليزي. من غيره العربي بيبقى مكتوب صح، بس الصفحة كلها ماشية من الشمال.`,
            R`قفلة [[watchEffect]].`,
            R`قفلة الـ script بتاع [[App.vue]].`,
            R`بداية الـ template اللي بيعرض الترجمات.`,
            R`[[t('hello', { name: 'Sara' })]] بتجيب رسالة [[hello]] وتحط Sara مكان [[{name}]]، فتطلع «أهلا يا Sara» أو «Hello Sara» حسب اللغة.`,
            R`[[v-for]] على أرقام مختلفة عشان تشوف كل أشكال الجمع، و [[:key]] الرقم نفسه لأنه مش بيتكرر. و [[t('items', n)]]: الرقم التاني بيختار شكل الجمع، وكمان بيتحط مكان [[{n}]].`,
            R`[[toLocaleString]] (Intl) بيكتب الرقم كعملة بشكل البلد: [[ar-EG]] بيطلّع أرقام عربي و «ج.م.»، و [[en-US]] بيطلّع [[EGP 1,234.50]]. و [[locale]] هنا من غير [[.value]] لأن الـ template بيفك الـ ref لوحده.`,
            R`[[@click]] بيقلب [[locale]] بين العربي والإنجليزي، فكل [[t()]] والـ [[watchEffect]] بيتعادوا لوحدهم. ونص الزرار باللغة التانية، عشان اللي مش فاهم اللغة الحالية يلاقيه.`,
            R`قفلة الـ template بتاع [[App.vue]].`,
            R`[[<style scoped>]]: الـ CSS ده بيأثر على عناصر الـ component ده بس، مش الصفحة كلها.`,
            R`قاعدة لعنصر السعر اللي عليه [[class="price"]].`,
            R`[[margin-inline-start]] مسافة من «بداية السطر»: يمين في العربي وشمال في الإنجليزي. لو كتبت [[margin-left]] كانت هتفضل شمال في الاتنين وتبوظ في العربي.`,
            R`[[border-inline-start]] خط أخضر على بداية السطر، وده اللي بتشوفه بيتنقل من اليمين للشمال لما تبدّل اللغة، من غير أي CSS زيادة.`,
            R`قفلة قاعدة [[.price]].`,
            R`قفلة الـ style، ونهاية الملف.`
          ],
          sol: R`الخط الأخضر بيبقى يمين في العربي وشمال في الإنجليزي من غير أي CSS زيادة، لأن [[border-inline-start]] معناها «بداية السطر».

ومن غير [[pluralRules]]: [[t('items', 5)]] بيطلع «منتجين»، لأن القاعدة الافتراضية بتختار شكل رقم [[min(n, 2)]]. والـ 11 و 100 كمان «منتجين». العربي محتاج القاعدة بتاعته.`
        },
        {
          cmd: "a11y",
          title: "accessibility في Vue: label و aria و focus، وتقيسها بـ axe",
          desc: R`الـ accessibility (a11y) معناها إن أي حد يقدر يستخدم الصفحة: بالكيبورد بس، أو بـ screen reader، أو بنظر ضعيف. في Vue نفس قواعد HTML: [[<label for>]] لكل input، و [[<button>]] للحاجات اللي بتتضغط، و [[alt]] للصور، و [[aria-invalid]] و [[aria-describedby]] لرسايل الأخطاء.

و Vue 3.5 فيه [[useId()]] بيعمل id فريد لكل نسخة من الـ component، فتربط الـ label بالـ input حتى لو الـ component اتكرر. وأداة [[axe-core]] بتفحص الصفحة وتطلّع الغلطات.`,
          example: R`// src/components/TextField.vue
<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ label: string; error?: string }>()
const model = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input :id="id" v-model="model" :aria-invalid="!!error" :aria-describedby="error ? id + '-err' : undefined" />
    <p v-if="error" :id="id + '-err'" class="err">{{ error }}</p>
  </div>
</template>

// src/App.vue
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import TextField from './components/TextField.vue'

const email = ref('')
const error = ref('')
const status = ref('')

async function save() {
  error.value = email.value.includes('@') ? '' : 'اكتب إيميل صحيح'
  status.value = error.value ? '' : 'اتحفظ'
  if (error.value) {
    await nextTick()
    document.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus()
  }
}
</script>

<template>
  <TextField v-model="email" label="الإيميل" :error="error" />
  <button type="button" @click="save">احفظ</button>
  <img src="/favicon.ico" alt="لوجو المحل" />
  <p aria-live="polite">{{ status }}</p>
</template>`,
          try: R`افتح الصفحة واستخدم Tab و Enter بس، من غير ماوس: توصل للزرار وتحفظ؟ بعدين اكتب [[<div @click="save">احفظ</div>]] بدل الزرار: Tab بيوصله؟ وشغّل Lighthouse (DevTools ← Lighthouse ← Accessibility) على الصفحة.`,
          flag: "script",
          deep: {
            why: R`ناس كتير بتستخدم الويب بطرق مختلفة: كيبورد بس (إيد مصابة أو مستخدم متقدم)، أو screen reader (كفيف)، أو تكبير ٢٠٠٪. وكمان فيه قوانين في دول كتير (الاتحاد الأوروبي من ٢٠٢٥) بتلزم المواقع، والشركات بتسأل عنها في الانترفيو. ومعظمها ببلاش لو استخدمت HTML صح من الأول.`,
            how: R`الـ screen reader بيقرا الـ accessibility tree اللي المتصفح بيبنيه من الـ HTML: [[<button>]] بيتقري «زرار» وبيتوصل بـ Tab ويشتغل بـ Enter و Space، و [[<div @click>]] مش بيتقري ولا بيتوصل (axe مبيقدرش يمسك ده لوحده لأنه مش عارف إن الـ div بيتضغط). و [[<label for="x">]] بيربط النص بالـ input، فالضغط على النص بيركّز في الـ input والـ screen reader بيقول اسمه.

[[aria-invalid="true"]] بيقول «الخانة دي غلط»، و [[aria-describedby]] بيشاور على id العنصر اللي فيه الرسالة فبتتقري بعد اسم الخانة. و [[aria-live="polite"]] على عنصر معناها «لما الكلام اللي جوايا يتغير اقراه» (رسالة «اتحفظ»). وفي SPA لما الصفحة تتغير بالـ router، الـ focus بيفضل مكانه والـ screen reader مش بيعرف، فحط focus على الـ [[<h1>]] الجديد أو استخدم announcer (Nuxt فيه [[<NuxtRouteAnnouncer>]] جاهز).

[[useId()]] بيرجّع [[v-0]] و [[v-1]]... فريدة في الـ app، وثابتة بين السيرفر والمتصفح في SSR.`,
            when: R`في كل component من الأول، خصوصًا الفورمات والـ modals والـ dropdowns والـ tabs. و [[eslint-plugin-vuejs-accessibility]] بيمسك حاجات وانت بتكتب، و axe في الاختبارات أو Playwright (شوف درس «@axe-core/playwright» في «تاب فحص الكود»)، و Lighthouse قبل الرفع. ومكتبات زي Reka UI (Radix لـ Vue) بتدّيك components صعبة (dialog و combobox) accessible جاهزة.`,
            mistakes: R`[[<div @click>]] أو [[<span @click>]] بدل [[<button>]]. و [[placeholder]] بدل [[<label>]] (بيختفي وانت بتكتب ولونه باهت). و ids ثابتة جوه component بيتكرر ([[id="email"]] مرتين في الصفحة). و [[outline: none]] من غير بديل فمحدش يعرف الـ focus فين. و modal مفيهوش focus trap ولا Esc. وتفتكر إن axe لو قال «none» تبقى خلصت: الأدوات بتمسك حوالي نص المشاكل بس، والباقي بالتجربة بالكيبورد والـ screen reader.`
          },
          teach: R`## الفكرة: HTML صح + aria للحالات + focus في المكان الصح

شغّلنا صفحتين في Chrome headless (Vue 3.5.44) وفحصناهم بـ [[axe-core]] 4.14 (قواعد WCAG 2 مستوى A و AA): صفحة غلط، وصفحة المثال. وفي صفحة المثال ضغطنا «احفظ» والإيميل فاضي.

---

## ١. الصفحة الغلط

~~~text A11yBad.vue
<div class="field"><span>الإيميل</span><input /></div>
<div @click="() => {}" class="btn">احفظ</div>
<img src="/favicon.ico" />
~~~

~~~text الناتج (axe)
axe violations: [ 'image-alt (critical): 1', 'label (critical): 1' ]
~~~

| القاعدة | المشكلة |
|---|---|
| [[image-alt]] | صورة من غير [[alt]]: الـ screen reader بيقرا اسم الملف أو «صورة» |
| [[label]] | input ملوش label مربوط ([[<span>]] جنبه مش label) |

ولاحظ إن الـ [[<div @click>]] **مطلعش**: axe مش عارف إنه بيتضغط. ده مثال على حاجة لازم تلاقيها بالكيبورد بإيدك.

---

## ٢. [[TextField]]

| السطر | معناه |
|---|---|
| [[useId()]] | id فريد للنسخة دي ([[v-0]]) |
| [[<label :for="id">]] | الـ label مربوط بالـ input |
| [[:aria-invalid="!!error"]] | [[true]] لو فيه غلط |
| [[:aria-describedby="error ? id + '-err' : undefined"]] | لو فيه غلط، الرسالة اللي id بتاعها [[v-0-err]] بتوصف الخانة. و [[undefined]] بيشيل الـ attribute خالص |
| [[defineModel<string>({ default: '' })]] | [[v-model]] على الـ component |

---

## ٣. [[save()]] والـ focus

- لو مفيش [[@]]: رسالة غلط، و [[await nextTick()]] نستنى الـ DOM يتحدّث (الـ [[aria-invalid]] يبقى [[true]])، وبعدين [[focus()]] على أول خانة غلط. فاللي بيستخدم كيبورد أو screen reader بيلاقي نفسه عند الغلطة.
- [[document.querySelector<HTMLInputElement>(...)]]: الـ [[<...>]] بيقول لـ TypeScript نوع العنصر.
- لو صح: [[status = 'اتحفظ']] في عنصر [[aria-live="polite"]] بيتقري لوحده.

---

## ٤. الناتج

~~~text الناتج (صفحة المثال)
axe violations: none
focused: <input id="v-0" aria-invalid="true" aria-describedby="v-0-err">
~~~

~~~text الناتج (الـ DOM بعد الضغط)
<div class="field">
  <label for="v-0">الإيميل</label>
  <input id="v-0" aria-invalid="true" aria-describedby="v-0-err">
  <p id="v-0-err" class="err">اكتب إيميل صحيح</p>
</div>
<button type="button">احفظ</button>
<img src="/favicon.ico" alt="لوجو المحل">
<p aria-live="polite"></p>
~~~

- axe: مفيش غلطات.
- الـ focus راح للـ input الغلط، والـ screen reader هيقرا «الإيميل، invalid، اكتب إيميل صحيح».
- [[type="button"]] على الزرار: من غيرها، الزرار جوه form بيعمل submit.

---

## الخلاصة

| بدل | استخدم |
|---|---|
| [[<div @click>]] | [[<button>]]: بيتوصل بـ Tab ويشتغل بـ Enter و Space لوحده |
| placeholder بس | [[<label :for>]] |
| id ثابت في component بيتكرر | [[useId()]] |
| رسالة غلط جنب الخانة وخلاص | [[aria-invalid]] + [[aria-describedby]] + focus |
| رسالة نجاح | [[aria-live="polite"]] |
| صورة | [[alt]] (أو [[alt=""]] لو زينة) |
| تقيس | axe و Lighthouse، وبعدين كيبورد بإيدك |`,
          lines: [
            R`بداية الـ script بتاع [[TextField]]: component خانة إدخال بيتكرر في الفورمات، وفيه label ورسالة خطأ مربوطين صح.`,
            R`[[useId]] (من Vue 3.5) بيرجّع id فريد لكل نسخة من الـ component. محتاجينه عشان نربط الـ label والرسالة بالـ input من غير id ثابت يتكرر لو الـ component اتحط مرتين في نفس الصفحة.`,
            R`[[defineProps]] بيعرّف الـ props بالـ TypeScript: [[label]] نص إجباري، و [[error]] اختياري (علامة [[?]]). مش محتاجين نحفظه في متغير لأن الـ template بيشوف الـ props بأساميها على طول.`,
            R`[[defineModel]] بيخلي الأب يكتب [[v-model="email"]] على الـ component: [[model]] ref، قرايته بتجيب قيمة الأب، والكتابة فيه بتبعت [[update:modelValue]] للأب. و [[default: '']] لو الأب مبعتش قيمة.`,
            R`[[useId()]] بيرجّع حاجة زي [[v-0]] للنسخة الأولى و [[v-1]] للتانية. وفي SSR نفس الـ id بيطلع على السيرفر والمتصفح، فمفيش hydration mismatch.`,
            R`قفلة الـ script بتاع [[TextField]].`,
            R`بداية الـ template بتاع [[TextField]].`,
            R`[[div]] بيلف الـ label والـ input والرسالة مع بعض، عشان يتعملهم style كوحدة واحدة.`,
            R`[[:for="id"]] بيربط الـ label بالـ input اللي ليه نفس الـ id: الضغط على الكلمة بيركّز في الخانة، والـ screen reader بيقول اسم الخانة لما توصلها. و [[{{ label }}]] النص اللي جاي من الأب.`,
            R`[[:id]] نفس id الـ label، و [[v-model="model"]] بيوصّل الكتابة للأب. [[:aria-invalid="!!error"]] بيطلّع [[true]] أو [[false]] (الـ [[!!]] بتحوّل النص لـ boolean)، و [[aria-describedby]] بيشاور على id الرسالة لو فيه غلط، ولما يبقى [[undefined]] Vue بيشيل الـ attribute خالص.`,
            R`[[v-if]] بيرسم الرسالة بس لو فيه غلط، و id بتاعها ([[v-0-err]]) هو اللي [[aria-describedby]] بيشاور عليه، فالـ screen reader بيقرا الرسالة بعد اسم الخانة.`,
            R`قفلة الـ [[div]] اللي بيلف الحقل.`,
            R`قفلة الـ template بتاع [[TextField]].`,
            R`بداية الـ script بتاع [[App.vue]]: الصفحة اللي بتستخدم [[TextField]] وفيها زرار الحفظ.`,
            R`[[ref]] للـ state، و [[nextTick]] عشان نستنى Vue يحدّث الـ DOM قبل ما ندوّر على الخانة الغلط.`,
            R`بنستورد الـ component. في [[<script setup>]] أي حاجة بتتعمل import بتبقى متاحة في الـ template على طول من غير تسجيل.`,
            R`الإيميل اللي المستخدم بيكتبه، ومربوط بـ [[v-model]] على الـ [[TextField]].`,
            R`رسالة الغلط: نص فاضي يعني مفيش غلط، وبتتبعت للـ [[TextField]] كـ prop اسمه [[error]].`,
            R`رسالة النجاح اللي بتتحط في عنصر [[aria-live]] تحت، فالـ screen reader يقراها لوحده.`,
            R`دالة الحفظ [[async]] عشان جواها [[await nextTick()]].`,
            R`لو الإيميل فيه [[@]] الغلط بيبقى نص فاضي، ولو لأ بنحط الرسالة. (التحقق ده بسيط للدرس، الحقيقي بيبقى بـ schema زي zod.)`,
            R`لو مفيش غلط اكتب «اتحفظ»، ولو فيه غلط فضّي رسالة النجاح عشان متتقريش رسالة قديمة.`,
            R`لو فيه غلط، هننقل الـ focus للخانة اللي فيها المشكلة.`,
            R`[[nextTick()]] بيستنى Vue يحدّث الـ DOM: من غيره [[aria-invalid]] لسه [[false]] في الـ DOM، والـ [[querySelector]] اللي بعده مش هيلاقي حاجة.`,
            R`بيدوّر على أول عنصر عليه [[aria-invalid="true"]] ويعمله [[focus()]]، فاللي بيستخدم كيبورد أو screen reader بيلاقي نفسه عند الغلطة على طول. و [[<HTMLInputElement>]] بيقول لـ TypeScript نوع العنصر، و [[?.]] عشان لو ملقاش حاجة ميرميش error.`,
            R`قفلة [[if]].`,
            R`قفلة [[save]].`,
            R`قفلة الـ script بتاع الصفحة.`,
            R`بداية الـ template بتاع الصفحة.`,
            R`الخانة: [[v-model="email"]] بيربط الإيميل، و [[label]] نص ثابت، و [[:error]] بيبعت الغلط (بالـ [[:]] لأن قيمته متغير، مش نص ثابت).`,
            R`[[<button>]] حقيقي بيتوصل بـ Tab ويشتغل بـ Enter و Space لوحده. و [[type="button"]] عشان لو اتحط جوه [[<form>]] ميعملش submit ويعيد تحميل الصفحة.`,
            R`[[alt]] بيوصف الصورة للـ screen reader ولو الصورة موقعتش. ولو الصورة زينة بس، اكتب [[alt=""]] عشان يتجاهلها.`,
            R`[[aria-live="polite"]]: لما النص اللي جوه العنصر ده يتغير، الـ screen reader بيقراه بعد ما يخلّص اللي بيقوله. فرسالة «اتحفظ» بتوصل للكفيف من غير ما يدوّر عليها.`,
            R`قفلة الـ template بتاع الصفحة.`
          ],
          sol: R`بالـ Tab بتوصل للـ input ثم الزرار، و Enter على الزرار بيحفظ. لكن الـ [[<div @click>]] Tab بيعدّيه خالص ومينفعش تضغطه بالكيبورد، و axe مش بيطلّعه غلطة (جربناها: [[image-alt]] و [[label]] بس). عشان كده [[<button>]] دايمًا.`
        }
      ]
    }
]);
