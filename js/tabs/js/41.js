// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "أدوات المحترف في JS",
      l: 2,
      time: R`حوالي ساعتين ونص، ومشروع صغير متظبط بالأداتين`,
      goal: [
        R`تشغّل ESLint على أي مشروع بملف [[eslint.config.js]] (الـ flat config)، وتقرا كل سطر في الناتج: المكان، والنوع، والرسالة، واسم القاعدة، وتعرف تصلّح أو تخلي [[--fix]] يصلّح.`,
        R`تخلي Prettier يظبط شكل الكود كله بأمر واحد، وتفهم ليه ESLint و Prettier مبيتخانقوش لما تحط [[eslint-config-prettier]] في الآخر.`,
        R`تكتب اختبارات بـ Vitest: [[describe]] و [[it]] و [[expect]]، والفرق بين [[toBe]] و [[toEqual]]، وأخطاء متوقّعة، وكود async، و [[vi.fn()]] مكان أي حاجة خارجية.`,
        R`تقرا تقرير الـ coverage وتعرف إن ٧٢٪ lines ممكن تخبّي فرع كامل متجرّبش، وتحط حد أدنى يوقّع الـ CI.`,
      ],
      use: {
        prog: R`ESLint بيمسك الباج قبل ما تشغّل (متغير مكتوب غلط، [[==]] بدل [[===]])، و Prettier بيشيل نقاش الشكل خالص، والاختبار بيقولك إن التعديل الجديد مكسرش القديم. التلاتة مع بعض = تعدّل بثقة.`,
        work: R`أي repo حقيقي هتدخله فيه [[npm run lint]] و [[npm test]] والـ CI بيشغّلهم على كل PR. أول يوم شغل غالبًا «الـ CI أحمر عندك، شوف ليه». واللي بيعرف يقرا الناتج بيخلّص في دقيقة.`,
        cs: R`الـ static analysis (تحليل الكود من غير تشغيله بالـ AST)، والـ unit testing والـ test doubles (mocks و stubs)، والـ coverage كمقياس (مفيد بس مش ضمان).`,
      },
      pre: [
        { to: "js/كود غيرك: npm و CDN ونسخ ملف", why: R`[[npm i -D]] و [[npx]] و [[package.json]] و [[node_modules]]: كل أداة هنا بتتسطّب وتشتغل كده` },
        { to: "js/import و export", why: R`[[eslint.config.js]] و [[vitest.config.js]] وملفات الاختبار كلها ES modules بتعمل [[import]] و [[export default]]` },
        { to: "js/مكتبتك الصغيرة: API و exports و tests", why: R`مكتبة صغيرة ليها API واختبارات، وهنا بنزوّد عليها lint وشكل موحّد واختبارات أقوى` },
      ],
      lab: R`mkdir -p ~/lab/tools && cd ~/lab/tools && npm init -y && npm pkg set type=module && npm i -D eslint @eslint/js globals prettier eslint-config-prettier vitest @vitest/coverage-v8`,
      projects: [
        { lvl: 'صغير', t: R`نضّف مشروع قديم`, what: R`خد أي فولدر JS كتبته قبل كده (أو مشاريع الوحدات اللي فاتت)، وحط فيه [[eslint.config.js]] من درس «ESLint و Prettier»، وصلّح كل الأخطاء بإيدك واحدة واحدة، وبعدين [[prettier --write .]].`, done: R`[[npx eslint . --max-warnings 0]] و [[npx prettier --check .]] الاتنين بيخرجوا بصفر، ومفيش ولا [[eslint-disable]] في الكود، وكاتب في الـ commit message أغرب باج لقيته (متغير مكتوب غلط مثلًا).`, sol: R`## الشكل النهائي

المشروع ده ملوش شكل جديد: الشكل هو الترمنال. ده الناتج الحقيقي على مشروع ملاحظات قديم (اسمه [[old-notes]]، ٣ ملفات اتكتبوا من غير أي أداة)، قبل وبعد:

~~~text قبل: npx eslint . (ESLint 10.15.0، ٢١ نوفمبر ٢٠٢٦)
C:\Users\you\lab\old-notes\src\app.js
   1:43  error    'formatDate' is defined but never used            no-unused-vars
   2:5   warning  'notes' is never reassigned. Use 'const' instead  prefer-const
  18:12  error    Expected '===' and instead saw '=='               eqeqeq

C:\Users\you\lab\old-notes\src\store.js
   4:41  error  'e' is defined but never used        no-unused-vars
  12:23  error  Expected '===' and instead saw '=='  eqeqeq

✖ 5 problems (4 errors, 1 warning)
  0 errors and 1 warning potentially fixable with the $__bt--fix$__bt option.
~~~

~~~text قبل: npx prettier --check . (Prettier 3.10.1)
Checking formatting...
[warn] index.html
[warn] src/app.js
[warn] src/store.js
[warn] Code style issues found in 3 files. Run Prettier with --write to fix.
~~~

~~~text بعد
$ npx eslint . --max-warnings 0; echo "eslint exit=$?"
eslint exit=0
$ npx prettier --check .; echo "prettier exit=$?"
Checking formatting...
All matched files use Prettier code style!
prettier exit=0
$ grep -rn "eslint-disable" src || echo "no eslint-disable"
no eslint-disable
~~~

## هتعمل إيه بالترتيب

~~~bash
cd old-notes
npm init -y            # لو مفيش package.json
npm pkg set type=module
npm i -D eslint @eslint/js globals prettier eslint-config-prettier
# انسخ eslint.config.js و .prettierrc.json و .prettierignore من درس «ESLint و Prettier»
npx eslint .           # اقرا، وصلّح بإيدك واحدة واحدة
npx prettier --write . # الشكل في الآخر، في commit لوحده
~~~

**ليه ESLint الأول و Prettier في الآخر؟** عشان الـ commit بتاع الباجات يبقى صغير ويتقري، والـ commit بتاع الشكل (اللي بيغيّر كل سطر تقريبًا) يبقى لوحده. لو عملتهم مع بعض، محدش هيلاقي التصليح الحقيقي وسط ٢٠٠ سطر مسافات.

**تغيير واحد في الـ config:** المشروع صفحة متصفح بس، فخليت [[globals.browser]] لوحدها بدل [[...globals.browser, ...globals.node]]. كده لو حد كتب [[process.env]] في كود الصفحة هيطلع [[no-undef]].

## الملفات قبل

~~~js src/store.js (قبل)
export function loadNotes() {
  var raw = localStorage.getItem("notes")
  if (raw == null) return []
  try { return JSON.parse(raw) } catch (e) { return [] }
}
export function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes))
}
export function countDone(notes) {
  let n = 0
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].done == true) n++
  }
  return n
}
~~~

~~~js src/app.js (قبل)
import { loadNotes, saveNotes, countDone, formatDate } from './store.js'
let notes = loadNotes()
const list = document.getElementById("list")
function render() {
  list.innerHTML = ""
  for (const note of notes) {
    const li = document.createElement("li")
    li.textContent = note.text
    if (note.done) li.style.textDecoration = "line-through"
    li.onclick = () => { note.done = !note.done; saveNotes(notes); render() }
    list.append(li)
  }
  document.getElementById("count").textContent = countDone(notes) + " / " + notes.lenght
}
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault()
  const text = document.getElementById("text").value.trim()
  if (text == "") return
  notes.push({ text: text, done: false, at: Date.now() })
  saveNotes(notes)
  document.getElementById("text").value = ""
  render()
})
render()
~~~

## كل خطأ: كان هيعمل إيه، واتصلّح إزاي

| الخطأ | كان هيعمل إيه (اتجرّب) | التصليح |
|---|---|---|
| [[1:43]] [[formatDate]] مش مستخدم | **أغرب باج:** [[formatDate]] مش موجودة في [[store.js]] أصلًا. [[node src/app.js]] قال [[SyntaxError: The requested module './store.js' does not provide an export named 'formatDate']]، يعني الصفحة كلها مبتشتغلش، مش السطر ده بس | مسحتها من الـ import |
| [[2:5]] [[let notes]] | ولا حاجة، بس [[const]] بيقول للي بيقرا «المرجع ده مبيتغيّرش» ([[push]] بيعدّل جوه الـ array مش المرجع) | [[const]] |
| [[18:12]] [[text == '']] | هنا آمن، بس [[==]] عادة وحشة: [[0 == '']] بـ [[true]] | [[===]] |
| [[4:41]] [[catch (e)]] | ولا حاجة | [[catch {]] من غير متغير (مسموح من ES2019) |
| [[12:23]] [[done == true]] | [[done: 1]] أو [[done: 'true']] من داتا قديمة كانوا هيتحسبوا بطريقة ملخبطة | [[filter((note) => note.done === true)]] |

**باج ESLint مشافوش:** [[notes.lenght]] (حرفين مقلوبين). [[node -e]] على نفس الحساب طبع [[1 / undefined]]. ESLint مبيعرفش شكل الـ objects بتاعتك، فمبيقدرش يقول إن [[lenght]] مش خاصية. ده شغل TypeScript (أو [[// @ts-check]] في VS Code). لقيته وانا بقرا الملف وأنا بصلّح، فاتصلّح لـ [[length]]. **و [[var]] كمان معدّاش عليه حاجة:** [[no-var]] مش في الـ recommended. لو عايزها زوّدها في [[rules]] (المشروع «قواعدك انت»).

## الملفات بعد

~~~js src/store.js
export function loadNotes() {
  const raw = localStorage.getItem('notes');
  if (raw == null) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
export function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}
export function countDone(notes) {
  return notes.filter((note) => note.done === true).length;
}
~~~

~~~js src/app.js
import { loadNotes, saveNotes, countDone } from './store.js';
const notes = loadNotes();
const list = document.getElementById('list');
function render() {
  list.replaceChildren();
  for (const note of notes) {
    const li = document.createElement('li');
    li.textContent = note.text;
    if (note.done) li.style.textDecoration = 'line-through';
    li.onclick = () => {
      note.done = !note.done;
      saveNotes(notes);
      render();
    };
    list.append(li);
  }
  document.getElementById('count').textContent =
    countDone(notes) + ' / ' + notes.length;
}
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.getElementById('text').value.trim();
  if (text === '') return;
  notes.push({ text: text, done: false, at: Date.now() });
  saveNotes(notes);
  document.getElementById('text').value = '';
  render();
});
render();
~~~

[[raw == null]] فضلت زي ما هي: الـ config فيه [[null: 'ignore']] لأنها اختصار مقصود لـ «[[null]] أو [[undefined]]». و [[innerHTML = '']] بقت [[replaceChildren()]] بالمرة (مش خطأ lint، بس أوضح ومفيهاش HTML).

و [[prettier --write .]] غيّر [[index.html]] كمان: [[<meta charset="utf-8" />]] والمسافات. ده شكل بس، ومتغيّرش أي سلوك.

## رسالة الـ commit

~~~text
fix: import لدالة مش موجودة كان بيوقّع الصفحة كلها

formatDate كانت في الـ import ومش موجودة في store.js، فالمتصفح
كان بيرفض app.js كله (SyntaxError). ومعاها notes.lenght كانت
بتطبع "1 / undefined". و == اتشالت، و catch (e) من غير استخدام.
~~~

والشكل في commit تاني: [[style: prettier --write]].

**الغلطة الشائعة:** تحل الأخطاء بـ [[// eslint-disable-next-line]] عشان «تخلص». الـ [[done]] بيقول صفر disable، و [[grep]] بيأكد. وغلطة تانية: تشغّل [[eslint --fix]] و [[prettier --write]] قبل ما تقرا الأخطاء: [[--fix]] كان هيحوّل [[let]] لـ [[const]] بس، والباقي لسه محتاج قرار منك.` },
        { lvl: 'صغير', t: R`اختبارات لدوال الأساسيات`, what: R`خد ٥ دوال من تمارين «أساسيات البرمجة» (زي [[isPrime]] و [[reverse]] و [[charCount]]) في ملف [[utils.js]]، واكتب لكل واحدة اختبار فيه الحالة العادية وحالتين طرفيتين ([[0]]، نص فاضي، رقم سالب، عربي) بـ [[it.each]]. من درس «اختبار JS بـ Vitest».`, done: R`[[npx vitest run --coverage]] بيطلّع ١٠٠٪ في الأربع أعمدة لـ [[utils.js]]، ولما تكسر دالة عن قصد (تشيل شرط) فيه اختبار واحد على الأقل بيقع باسم واضح.`, sol: R`## الشكل النهائي

~~~text الناتج: npx vitest run --coverage (Vitest 5.1.1 و @vitest/coverage-v8 5.1.1، Node 24.22، ٢١ نوفمبر ٢٠٢٦)
 Test Files  1 passed (1)
      Tests  20 passed (20)

 % Coverage report from v8
No files with missing coverage.
1 file fully covered.

=============================== Coverage summary ===============================
Statements   : 100% ( 19/19 )
Branches     : 100% ( 10/10 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 13/13 )
================================================================================
~~~

والـ ٢٠ اختبار بيتطبعوا باساميهم لو زوّدت [[--reporter=verbose]].

## الملفات

~~~text
basics/
├── package.json       "type": "module" وسكربتين test و coverage
├── vitest.config.js   الـ coverage بحد ١٠٠٪
└── src/
    ├── utils.js       الخمس دوال
    └── utils.test.js  الاختبارات
~~~

~~~bash
npm init -y && npm pkg set type=module
npm i -D vitest @vitest/coverage-v8
npm pkg set scripts.test="vitest" scripts.coverage="vitest run --coverage"
~~~

~~~js src/utils.js
export function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

export function reverse(text) {
  return Array.from(text).reverse().join('');
}

export function charCount(text) {
  const counts = new Map();
  for (const ch of text) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  return counts;
}

export function sumDigits(n) {
  let sum = 0;
  for (const d of String(Math.abs(n))) sum += Number(d);
  return sum;
}

export function clamp(value, min, max) {
  if (min > max) throw new RangeError('min أكبر من max');
  return Math.min(Math.max(value, min), max);
}
~~~

~~~js vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      reporter: ['text', 'html'],
      thresholds: { 100: true },
    },
  },
});
~~~

[[thresholds: { 100: true }]] اختصار لـ «الأربع أعمدة ١٠٠٪». و [[include]] بيقصر التقرير على [[src/]] (ملفات الاختبار نفسها مبتتحسبش).

~~~js src/utils.test.js
import { describe, it, expect } from 'vitest';
import { isPrime, reverse, charCount, sumDigits, clamp } from './utils.js';

describe('isPrime', () => {
  it.each([
    [2, true],
    [17, true],
    [1, false],
    [0, false],
    [-7, false],
    [9, false],
    [7.5, false],
  ])('isPrime(%s) = %s', (n, expected) => {
    expect(isPrime(n)).toBe(expected);
  });
});

describe('reverse', () => {
  it.each([
    ['abc', 'cba'],
    ['', ''],
    ['سلام', 'مالس'],
    ['a👍b', 'b👍a'],
  ])('reverse(%j) = %j', (text, expected) => {
    expect(reverse(text)).toBe(expected);
  });
});

describe('charCount', () => {
  it('بيعد كل حرف', () => {
    expect(charCount('موز')).toEqual(new Map([['م', 1], ['و', 1], ['ز', 1]]));
    expect(charCount('aab').get('a')).toBe(2);
  });
  it('النص الفاضي = Map فاضية', () => {
    expect(charCount('').size).toBe(0);
  });
});

describe('sumDigits', () => {
  it.each([
    [123, 6],
    [0, 0],
    [-45, 9],
  ])('sumDigits(%i) = %i', (n, expected) => {
    expect(sumDigits(n)).toBe(expected);
  });
});

describe('clamp', () => {
  it.each([
    [5, 0, 10, 5],
    [-3, 0, 10, 0],
    [99, 0, 10, 10],
  ])('clamp(%i, %i, %i) = %i', (v, min, max, expected) => {
    expect(clamp(v, min, max)).toBe(expected);
  });
  it('بيرمي لو min أكبر من max', () => {
    expect(() => clamp(1, 10, 0)).toThrow(RangeError);
  });
});
~~~

## الاختبارات بتغطي إيه، وليه الحالات دي بالذات

| الدالة | العادي | الطرفي | ليه الطرفي ده |
|---|---|---|---|
| [[isPrime]] | [[2]] و [[17]] | [[1]] و [[0]] و [[-7]] و [[9]] و [[7.5]] | [[1]] مش أولي (أشهر غلطة)، و [[9]] أول عدد فردي مش أولي (بيمسك [[d * d < n]] بدل [[<=]])، و [[7.5]] مش عدد صحيح |
| [[reverse]] | [[abc]] | [['']] و [[سلام]] و [[a👍b]] | الإيموجي حرفين UTF-16. بـ [[split('')]] الناتج كان [[b��a]] (اتجرّب: نص بايظ) |
| [[charCount]] | [[موز]] | [['']] | العربي حرف حرف، والفاضي [[Map]] فاضية مش [[undefined]] |
| [[sumDigits]] | [[123]] | [[0]] و [[-45]] | السالب: [[String(-45)]] فيها [[-]]، و [[Number('-')]] = [[NaN]] من غير [[Math.abs]] |
| [[clamp]] | جوه الحد | تحت وفوق، و [[min > max]] | الرمي هو الفرع اللي لو نسيته الـ Branches تنزل |

- [[it.each]] بيعمل اختبار لكل صف، و [[%s]] و [[%i]] و [[%j]] (JSON) في الاسم بيتبدلوا بالقيم، فلما واحد يقع اسمه بيقولك الحالة بالظبط.
- [[charCount]] بترجّع [[Map]]، و [[toEqual]] بيقارن محتوى الـ [[Map]] بالعمق.
- [[toThrow(RangeError)]] بدالة ([[() => clamp(...)]]) مش بالنداء نفسه.

## اكسر دالة عن قصد

شلت [[|| n < 2]] من [[isPrime]]:

~~~text الناتج: npx vitest run
 ❯ src/utils.test.js (20 tests | 3 failed) 13ms
   ❯ isPrime (7)
     × isPrime(1) = false 6ms
     × isPrime(0) = false 1ms
     × isPrime(-7) = false 1ms

 FAIL  src/utils.test.js > isPrime > isPrime(1) = false
 FAIL  src/utils.test.js > isPrime > isPrime(0) = false
 FAIL  src/utils.test.js > isPrime > isPrime(-7) = false
AssertionError: expected true to be false // Object.is equality

 Test Files  1 failed (1)
      Tests  3 failed | 17 passed (20)
~~~

التلات أسامي قالوا المشكلة من غير ما تفتح الكود: [[1]] و [[0]] و [[-7]] بقوا «أوليين» (الـ loop مبيلفش خالص فبيرجّع [[true]]).

## والحد الأدنى بيشتغل

شغّلت كل الاختبارات **ما عدا** اختبار الرمي ([[-t]] بيفلتر بالاسم):

~~~text الناتج
      Tests  19 passed | 1 skipped (20)
 utils.js |   94.73 |       90 |     100 |     100 | 26
ERROR: Coverage for statements (94.73%) does not meet global threshold (100%)
ERROR: Coverage for branches (90%) does not meet global threshold (100%)
~~~

كود الخروج [[1]]، والسطر [[26]] (الـ [[throw]]) هو اللي ناقص. يعني لو حد مسح اختبار الرمي بعدين، الـ coverage هيقول.

**الغلطة الشائعة:** الأرقام المتوقّعة تتحسب بنفس الكود ([[expect(sumDigits(123)).toBe(1 + 2 + 3)]] كويس، لكن [[expect(isPrime(n)).toBe(isPrime(n))]] بيعدّي دايمًا). اكتب المتوقّع بإيدك. وغلطة تانية: [[toBe]] على الـ [[Map]]: هيقع حتى لو المحتوى زي بعضه.` },
        { lvl: 'متوسط', t: R`قالب مشروع جاهز`, what: R`فولدر [[starter]] فيه [[package.json]] بسكربتات [[lint]] و [[format]] و [[test]] و [[check]] (الكل ورا بعض)، و [[eslint.config.js]] بـ globals مختلفة للـ [[src/]] (متصفح) و [[scripts/]] (Node) و [[*.test.js]]، و [[.prettierrc.json]] و [[.prettierignore]] و [[vitest.config.js]] بحد أدنى للـ coverage. من الدرسين.`, done: R`تنسخ الفولدر لمكان جديد وتعمل [[npm i]] و [[npm run check]] فيعدّي من أول مرة. و [[window]] جوه [[scripts/]] بيطلع [[no-undef]]، و [[process]] جوه [[src/]] بيطلع [[no-undef]]، وتست بيقلل الـ coverage تحت الحد بيخلي [[npm run check]] يخرج بـ ١.`, sol: R`## الشكل النهائي

نسخت الفولدر لمكان جديد ([[my-app]])، و [[npm i]]، و [[npm run check]] من أول مرة (ESLint 10.15.0 و Prettier 3.10.1 و Vitest 5.1.1، Node 24.22، ٢١ نوفمبر ٢٠٢٦):

~~~text الناتج: npm run check
> starter@1.0.0 check
> npm run lint && npm run format:check && npm run coverage

> starter@1.0.0 lint
> eslint . --max-warnings 0

> starter@1.0.0 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!

> starter@1.0.0 coverage
> vitest run --coverage

 RUN  v5.1.1 C:/Users/you/projects/my-app
      Coverage enabled with v8

 Test Files  1 passed (1)
      Tests  5 passed (5)

 % Coverage report from v8
No files with missing coverage.
1 file fully covered.

=============================== Coverage summary ===============================
Statements   : 100% ( 3/3 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 1/1 )
Lines        : 100% ( 2/2 )
================================================================================
~~~

كود الخروج [[0]]. و [[diff -r]] بين الأصل والنسخة بعد [[prettier --write .]] مطلّعش ولا فرق: الملفات متسلّمة متظبطة.

## الملفات

~~~text
starter/
├── package.json        السكربتات والأدوات بنسخها
├── eslint.config.js    globals لكل فولدر
├── .prettierrc.json
├── .prettierignore
├── .gitignore
├── vitest.config.js    حد أدنى ٩٠٪ للأربع أعمدة
├── src/
│   ├── slug.js         مثال كود متصفح
│   └── slug.test.js
└── scripts/
    └── build-index.js  مثال سكربت Node
~~~

~~~json package.json
{
  "name": "starter",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "coverage": "vitest run --coverage",
    "check": "npm run lint && npm run format:check && npm run coverage"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@vitest/coverage-v8": "^5.1.1",
    "eslint": "^10.15.0",
    "eslint-config-prettier": "^10.1.8",
    "globals": "^17.14.0",
    "prettier": "^3.10.1",
    "vitest": "^5.1.1"
  }
}
~~~

- [[check]] بيربط التلاتة بـ [[&&]]: أول واحد يفشل بيوقّف الباقي وكود الخروج بيبقى [[1]]. ده الأمر الوحيد اللي الـ CI محتاج يشغّله.
- [[lint]] فيه [[--max-warnings 0]] جوه السكربت نفسه، عشان محدش ينساه.
- [[format]] بيكتب، و [[format:check]] بيسأل بس (للـ CI).
- [[test]] = watch وانت شغّال، و [[coverage]] = مرة واحدة بالتقرير والحد.
- [[private: true]] بيمنع [[npm publish]] بالغلط.

~~~js eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist/', 'coverage/']),
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    rules: { eqeqeq: ['error', 'always', { null: 'ignore' }] },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
    rules: { 'no-console': 'error' },
  },
  {
    files: ['scripts/**/*.js', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
    rules: { 'no-console': 'off' },
  },
  prettier,
]);
~~~

العنصر الأول من غير globals خالص، وكل فولدر بياخد بيئته بس (التفاصيل في حل تمرين «ابني» في درس «ESLint و Prettier»). و [[*.config.js]] مع Node لأن [[eslint.config.js]] و [[vitest.config.js]] بيتشغّلوا في Node.

~~~json .prettierrc.json
{ "singleQuote": true, "semi": true, "printWidth": 80 }
~~~

~~~text .prettierignore
node_modules
coverage
dist
package-lock.json
~~~

~~~text .gitignore
node_modules/
coverage/
dist/
.eslintcache
~~~

[[package-lock.json]] في [[.prettierignore]] لأن npm هو اللي بيكتبه، ولو Prettier غيّر شكله [[npm i]] الجاي هيرجّعه وتبان تغييرات ملهاش لازمة.

~~~js vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/**/*.test.js'],
      reporter: ['text', 'html'],
      thresholds: { lines: 90, branches: 90, functions: 90, statements: 90 },
    },
  },
});
~~~

~~~js src/slug.js
export function slug(title) {
  if (typeof title !== 'string') throw new TypeError('العنوان لازم نص');
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}
~~~

~~~js src/slug.test.js
import { it, expect } from 'vitest';
import { slug } from './slug.js';

it.each([
  ['Hello World', 'hello-world'],
  ['  مرحبا يا عالم  ', 'مرحبا-يا-عالم'],
  ['JS: 2026!', 'js-2026'],
  ['', ''],
])('slug(%j) = %j', (title, expected) => {
  expect(slug(title)).toBe(expected);
});

it('بيرمي لو العنوان مش نص', () => {
  expect(() => slug(42)).toThrow(TypeError);
});
~~~

~~~js scripts/build-index.js
import { writeFile } from 'node:fs/promises';
import { slug } from '../src/slug.js';

const titles = process.argv.slice(2);
const index = titles.map((t) => ({ title: t, url: '/' + slug(t) }));
await writeFile('index.json', JSON.stringify(index, null, 2) + '\n');
console.log('كتبت', index.length, 'عنوان في index.json');
~~~

[[\p{L}\p{N}]] = أي حرف أو رقم في أي لغة، فالعربي بيفضل في الـ slug (درس «regex والعربي: Unicode properties»). والسكربت بيستورد من [[src/]] عادي: الكود نفسه مش متعلّق بالمتصفح، الـ globals بس هي اللي مختلفة.

~~~text الناتج: node scripts/build-index.js "Hello World" "مرحبا يا عالم"
كتبت 2 عنوان في index.json
~~~

## الشروط الحمرا: اتجرّبوا

**١. [[window]] في [[scripts/]] و [[process]] في [[src/]]** (ملفين صغيرين اتضافوا عن قصد):

~~~text الناتج: npm run lint
C:\Users\you\projects\my-app\scripts\bad.js
  1:24  error  'window' is not defined  no-undef

C:\Users\you\projects\my-app\src\bad.js
  1:26  error  'process' is not defined  no-undef

✖ 2 problems (2 errors, 0 warnings)
~~~

**٢. تست بيقلل الـ coverage:** ملف [[src/extra.js]] فيه [[if (total === 0) return 0;]] واختبار بيجرّب الحالة العادية بس:

~~~text الناتج: npm run check (آخره)
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
All files |   83.33 |       75 |     100 |     100 |
 extra.js |   66.66 |       50 |     100 |     100 | 2
ERROR: Coverage for statements (83.33%) does not meet global threshold (90%)
ERROR: Coverage for branches (75%) does not meet global threshold (90%)
~~~

كود الخروج [[1]]. **ولاحظ:** Lines [[100%]] رغم إن [[return 0]] عمرها ما اتنفّذت، لأن الـ [[if]] والـ [[return]] على نفس السطر. عشان كده الحد على الأربع أعمدة مش [[lines]] بس: لو كان [[lines: 90]] لوحده، ده كان عدّى.

**الغلطة الشائعة:** تحط الحد في [[vitest.config.js]] وتشغّل [[vitest]] من غير [[--coverage]] في الـ CI: الحد مبيتفحصش خالص. عشان كده [[check]] بيشغّل [[coverage]] مش [[test]]. وغلطة تانية: تنسخ الفولدر **ومعاه** [[node_modules]] (٩٥ ميجا هنا): انسخ من غيره واعمل [[npm i]]، و [[package-lock.json]] بيضمن نفس النسخ.` },
        { lvl: 'متوسط', t: R`اختبر الـ fetch من غير شبكة`, what: R`خد [[request()]] من وحدة «مشروع: fetch محترم» وانقل اختباراتها من [[node --test]] لـ Vitest: [[vi.fn()]] مكان [[fetch]]، و [[rejects.toThrow]] للأخطاء، و [[vi.useFakeTimers()]] عشان الـ retry ميستناش ثواني بجد (التفاصيل في درس «vi.useFakeTimers» في تاب «فحص الكود»).`, done: R`كل الحالات اللي كانت في [[node --test]] شغالة في Vitest، والملف كله بيخلص في أقل من ثانية رغم إن فيه retry بـ backoff، و [[fetch]] الحقيقي مبيتناداش ولا مرة ([[toHaveBeenCalledTimes]] على الـ mock بيأكد العدد).`, sol: R`## الشكل النهائي

~~~text الناتج: npx vitest run --reporter=verbose (Vitest 5.1.1، Node 24.22، ٢١ نوفمبر ٢٠٢٦)
 RUN  v5.1.1 C:/Users/you/lab/fetch-vt

 ✓ request.test.js > من غير إعادة > 404 بترمي HttpError ومبتتعادش 25ms
 ✓ request.test.js > من غير إعادة > 200 من أول مرة 1ms
 ✓ request.test.js > الإعادة بـ backoff (وقت مزيّف) > 503 مرتين وبعدين 200: ٣ نداءات و onRetry مرتين 3ms
 ✓ request.test.js > الإعادة بـ backoff (وقت مزيّف) > فشل الشبكة بيبقى NetworkError بعد كل المحاولات 1ms
 ✓ request.test.js > الإعادة بـ backoff (وقت مزيّف) > 429 بـ Retry-After: 2 بيستنى ٢ ثانية بالظبط 1ms
 ✓ request.test.js > الإعادة بـ backoff (وقت مزيّف) > Retry-After أطول من الحد = مفيش إعادة 1ms
 ✓ request.test.js > backoff > attempt 0 و random 0 = 150 0ms
 ✓ request.test.js > backoff > attempt 2 و random 0 = 600 0ms
 ✓ request.test.js > backoff > attempt 0 و random 0.999999 = 300 0ms
 ✓ request.test.js > backoff > attempt 10 و random 0 = 5000 0ms
 ✓ request.test.js > المهلة (وقت حقيقي) > fetch مبيردش: TimeoutError بعد محاولتين 84ms

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Duration  307ms (tests 73%, transform 14%, import 10%, worker 3%)
~~~

الملف كله في ٣٠٧ms. اختبار «429 بـ Retry-After: 2» لوحده كان هيستنى ثانيتين بجد، واتعمل في 1ms.

## الملفات

~~~text
fetch-vt/
├── package.json      "type": "module"، و vitest في devDependencies
├── request.js        نفس ملف وحدة «مشروع: fetch محترم» من غير ولا تعديل
└── request.test.js   الاختبارات
~~~

~~~bash
npm init -y && npm pkg set type=module
npm i -D vitest
npx vitest run --reporter=verbose
~~~

[[request.js]] منسوخ زي ما هو من درس «مشروع — اختبرها من غير شبكة»، وهنا للرجوع:

~~~js request.js
// request.js: غلاف fetch بتاع الوحدة كلها (مهلة، وإلغاء، وإعادة ذكية، وأخطاء ليها نوع)
export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.url = response.url;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(cause) {
    super($__btفشل الاتصال: $__{cause?.code ?? cause?.message ?? 'سبب مش معروف'}$__bt);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}

const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const SECONDS = /^\d+$/;
const HTTP_DATE = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;

export function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null, maxRetryAfter = 60_000 } = {}) {
  if (retryAfter != null) {
    const ms = retryAfter * 1000;
    return ms <= maxRetryAfter ? ms : null;
  }
  const exp = Math.min(base * 2 ** attempt, cap);
  return Math.round(exp / 2 + Math.random() * (exp / 2));
}

export function parseRetryAfter(res) {
  const raw = res.headers.get('retry-after');
  if (!raw) return null;
  if (SECONDS.test(raw)) return Number(raw);
  if (!HTTP_DATE.test(raw)) return null;
  const when = Date.parse(raw);
  return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
}

const sleep = (ms, signal) => new Promise((resolve, reject) => {
  signal?.throwIfAborted();
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});

async function readBody(res) {
  const text = await res.text();
  if (!(res.headers.get('content-type') ?? '').includes('json')) return text;
  try { return JSON.parse(text); } catch { return text; }
}

export async function request(url, {
  timeout = 5000, retries = 2, base = 300, maxRetryAfter = 60_000,
  signal: outer, onRetry, fetchImpl = fetch, ...init
} = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    outer?.throwIfAborted();
    const timer = AbortSignal.timeout(timeout);
    const signal = outer ? AbortSignal.any([outer, timer]) : timer;
    let res = null;
    try {
      res = await fetchImpl(url, { ...init, signal });
    } catch (e) {
      if (outer?.aborted) throw outer.reason;
      lastError = e.name === 'TimeoutError' ? e : new NetworkError(e.cause ?? e);
    }
    if (res) {
      if (res.ok) return res;
      lastError = new HttpError(res, await readBody(res));
      if (!RETRY_STATUS.has(res.status)) throw lastError;
    }
    if (attempt === retries) break;
    const retryAfter = res ? parseRetryAfter(res) : null;
    const wait = backoff(attempt, { base, retryAfter, maxRetryAfter });
    if (wait == null) { lastError.retryAfter = retryAfter; break; }
    onRetry?.({ attempt, status: res?.status, error: lastError, wait });
    await sleep(wait, outer);
  }
  throw lastError;
}

export async function json(url, options) {
  const res = await request(url, options);
  return res.json();
}
~~~

~~~js request.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { request, backoff, HttpError, NetworkError } from './request.js';

const res = (status, body = '', headers = {}) => new Response(body, { status, headers });

// fetch مزيّف: vi.fn بيرجّع الردود بالترتيب (وآخر واحد بيتكرر)
function fakeFetch(...responses) {
  let i = 0;
  return vi.fn(async () => {
    const next = responses[Math.min(i++, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  });
}

let realFetch;
beforeEach(() => {
  vi.useFakeTimers();
  realFetch = vi.spyOn(globalThis, 'fetch');
});
afterEach(() => {
  expect(realFetch).not.toHaveBeenCalled();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('من غير إعادة', () => {
  it('404 بترمي HttpError ومبتتعادش', async () => {
    const f = fakeFetch(res(404, '{"e":1}', { 'content-type': 'application/json' }));
    const p = request('https://x.test/', { fetchImpl: f, retries: 3 });
    await expect(p).rejects.toThrow(HttpError);
    await expect(p).rejects.toMatchObject({ status: 404, body: { e: 1 } });
    expect(f).toHaveBeenCalledTimes(1);
  });

  it('200 من أول مرة', async () => {
    const f = fakeFetch(res(200, 'ok'));
    const r = await request('https://x.test/', { fetchImpl: f });
    expect(await r.text()).toBe('ok');
    expect(f).toHaveBeenCalledWith('https://x.test/', expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });
});

describe('الإعادة بـ backoff (وقت مزيّف)', () => {
  it('503 مرتين وبعدين 200: ٣ نداءات و onRetry مرتين', async () => {
    const f = fakeFetch(res(503), res(503), res(200, '{"ok":true}'));
    const onRetry = vi.fn();
    const p = request('https://x.test/', { fetchImpl: f, retries: 3, onRetry });
    await vi.runAllTimersAsync();
    const r = await p;
    expect(r.status).toBe(200);
    expect(f).toHaveBeenCalledTimes(3);
    expect(onRetry).toHaveBeenCalledTimes(2);
    expect(onRetry.mock.calls.map(([x]) => x.status)).toEqual([503, 503]);
  });

  it('فشل الشبكة بيبقى NetworkError بعد كل المحاولات', async () => {
    const f = fakeFetch(new TypeError('fetch failed', { cause: { code: 'ECONNREFUSED' } }));
    const p = request('https://x.test/', { fetchImpl: f, retries: 2 });
    const check = expect(p).rejects.toThrow(NetworkError);
    await vi.runAllTimersAsync();
    await check;
    await expect(p).rejects.toThrow('ECONNREFUSED');
    expect(f).toHaveBeenCalledTimes(3);
  });

  it('429 بـ Retry-After: 2 بيستنى ٢ ثانية بالظبط', async () => {
    const f = fakeFetch(res(429, '', { 'retry-after': '2' }), res(200));
    const p = request('https://x.test/', { fetchImpl: f, retries: 1 });
    await vi.advanceTimersByTimeAsync(1999);
    expect(f).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect((await p).status).toBe(200);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it('Retry-After أطول من الحد = مفيش إعادة', async () => {
    const f = fakeFetch(res(503, '', { 'retry-after': '120' }));
    const p = request('https://x.test/', { fetchImpl: f, retries: 3 });
    await expect(p).rejects.toMatchObject({ status: 503, retryAfter: 120 });
    expect(f).toHaveBeenCalledTimes(1);
  });
});

describe('backoff', () => {
  it.each([
    [0, 0, 150],
    [2, 0, 600],
    [0, 0.999999, 300],
    [10, 0, 5000],
  ])('attempt %i و random %f = %i', (attempt, r, expected) => {
    vi.spyOn(Math, 'random').mockReturnValue(r);
    expect(backoff(attempt)).toBe(expected);
  });
});

describe('المهلة (وقت حقيقي)', () => {
  it('fetch مبيردش: TimeoutError بعد محاولتين', async () => {
    vi.useRealTimers();
    const f = vi.fn((url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }));
    await expect(request('https://x.test/', { fetchImpl: f, timeout: 30, retries: 1, base: 10 }))
      .rejects.toMatchObject({ name: 'TimeoutError' });
    expect(f).toHaveBeenCalledTimes(2);
  });
});
~~~

## من [[node --test]] لـ Vitest: إيه اللي اتغيّر

| [[node --test]] | Vitest | ملاحظة |
|---|---|---|
| [[import { test } from 'node:test']] | [[import { describe, it, expect, vi } from 'vitest']] | |
| [[assert.equal(f.calls.length, 1)]] | [[expect(f).toHaveBeenCalledTimes(1)]] | [[vi.fn()]] بيسجّل النداءات لوحده، فمش محتاج [[calls]] بإيدك |
| [[assert.rejects(fn, (e) => e instanceof HttpError && e.status === 404)]] | [[rejects.toThrow(HttpError)]] و [[rejects.toMatchObject({ status: 404 })]] | [[toMatchObject]] بيقارن الخصايص اللي انت كاتبها بس |
| [[t.mock.method(Math, 'random', () => 0)]] | [[vi.spyOn(Math, 'random').mockReturnValue(0)]] | و [[vi.restoreAllMocks()]] في [[afterEach]] بيرجّعها |
| [[base: 10]] عشان الانتظار يقصر | [[vi.useFakeTimers()]] و [[vi.runAllTimersAsync()]] | الوقت نفسه مزيّف، فالكود بيستنى ٣٠٠ms «حقيقيين» في 0ms |

## الأجزاء المهمة

**[[fakeFetch(...responses)]]:** [[vi.fn]] جواه دالة بترجّع الردود بالترتيب. [[clone()]] لأن [[request]] بتقرا الـ body في كل محاولة فاشلة، والـ body بيتقرا مرة واحدة بس.

**[[beforeEach]] و [[afterEach]]:**

- [[vi.useFakeTimers()]] قبل كل اختبار: [[setTimeout]] اللي جوه [[sleep]] بقى مزيّف.
- [[vi.spyOn(globalThis, 'fetch')]]: جاسوس على [[fetch]] الحقيقي، و [[afterEach]] بيتأكد [[not.toHaveBeenCalled()]] بعد **كل** اختبار. لو حد نسي [[fetchImpl]] في اختبار، الشبكة الحقيقية هتتنادى وده هيقع.
- [[vi.restoreAllMocks()]] بيرجّع [[fetch]] و [[Math.random]] للأصل.

**الإعادة بوقت مزيّف:** [[request]] بيستنى بين المحاولات بـ [[setTimeout]]. [[vi.runAllTimersAsync()]] بيشغّل كل الـ timers اللي مستنية، **وبيستنى الـ Promises اللي بينهم**، لحد ما ميفضلش timer. جرّبت [[vi.runAllTimers()]] من غير [[Async]]: الاختبار قال [[TestTimeoutError: Test timed out in 5000ms.]]. النسخة العادية بتشغّل الـ timers اللي موجودة دلوقتي بس، والـ timer بتاع المحاولة التانية لسه متعملش لأن [[await fetchImpl]] اللي قبله مخلصش.

**[[advanceTimersByTimeAsync(1999)]] ثم [[(1)]]:** بيثبت إن الانتظار **ألفين بالظبط**: بعد 1999ms لسه نداء واحد، وبعد ms كمان التاني حصل. ده اختبار لـ [[Retry-After]] مكانش ينفع بـ [[base: 10]].

**المهلة بوقت حقيقي:** [[AbortSignal.timeout()]] بيستخدم timer جوه Node نفسه، والوقت المزيّف مبيوصلوش، فالاختبار ده رجّع [[vi.useRealTimers()]] و [[timeout: 30]] و [[base: 10]]: خلص في 84ms.

## الغلطة اللي حصلت وانا بكتبه

في اختبار الشبكة كتبت الأول:

~~~js
await vi.runAllTimersAsync();
await expect(p).rejects.toThrow(NetworkError);
~~~

~~~text الناتج
(node:19584) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 4)
⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯
NetworkError: فشل الاتصال: ECONNREFUSED
 ❯ request request.js:68:51
      Tests  1 passed | 10 skipped (11)
     Errors  1 error
~~~

[[p]] رفضت **وسط** [[runAllTimersAsync]]، قبل ما حد يكون مستنيها، فـ Node اعتبرها unhandled. الحل: تمسك الـ Promise بـ [[expect(...).rejects]] **قبل** ما تحرّك الوقت (المتغير [[check]] في الملف)، وبعدين [[await check]]. اختبار الـ 503 مفيهوش المشكلة دي لأن [[p]] هناك بتنجح.

## اتقاس

| | وقت مزيّف | وقت حقيقي (نفس الاختبارين) |
|---|---|---|
| 503 مرتين وبعدين 200 | 3ms | 798ms |
| فشل الشبكة ٣ مرات | 1ms | 607ms |

والـ ٧٩٨ms دول مش ثابتين: [[backoff]] عشوائي (بين ١٥٠ و ٣٠٠ للأولى و ٣٠٠ و ٦٠٠ للتانية)، فالاختبار بالوقت الحقيقي بطيء **و** وقته بيتغيّر من مرة للتانية.

**الغلطة الشائعة:** [[vi.useFakeTimers()]] من غير [[vi.useRealTimers()]] في [[afterEach]]: الاختبارات اللي بعدها في نفس الملف بتعلّق لأن [[setTimeout]] بتاعها مبيخلصش أبدًا. وغلطة تانية: تختبر المهلة بوقت مزيّف وتستغرب إن الاختبار معلّق ٥ ثواني (الـ timeout الافتراضي بتاع Vitest).` },
        { lvl: 'كبير', t: R`مكتبة صغيرة بجودة الشغل`, what: R`مكتبة [[money.js]]: [[parse('١٢٣٫٥٠ ج')]] و [[format(123.5)]] و [[add]] و [[split(total, parts)]] (بالقروش عشان [[0.1 + 0.2]]). معاها ESLint و Prettier واختبارات لكل دالة فيها حالات طرفية (أرقام عربي، سالب، صفر، [[split]] بباقي)، و coverage بحد ١٠٠٪ branches، و GitHub Actions بيشغّل [[npm run check]] على كل push. من الدرسين، ودرس «number و NaN»، ودرس «Intl.RelativeTimeFormat».`, done: R`الـ CI أخضر، وأي PR بيكسر قاعدة lint أو بيقلل الـ coverage بيبقى أحمر برسالة واضحة. [[split(100, 3)]] بترجّع [[ [33.34, 33.33, 33.33] ]] ومجموعها ١٠٠ بالظبط. و [[parse]] على نص بايظ بيرمي error فيه النص. والـ README فيه مثال لكل دالة منسوخ من اختبار حقيقي.`, ext: R`زوّد [[husky]] و [[lint-staged]] (درس «lint-staged» في تاب «فحص الكود») عشان الفحص يشتغل قبل كل commit، وانشرها على npm باسم scoped، أو حوّلها لـ TypeScript.`, sol: R`## الشكل النهائي

~~~text الناتج: npx vitest run --reporter=verbose (Vitest 5.1.1، Node 24.22، ٢١ نوفمبر ٢٠٢٦)
 RUN  v5.1.1 C:/Users/you/lab/money
 ✓ src/money.test.js > parse > parse("١٢٣٫٥٠ ج") = 123.5 2ms
 ✓ src/money.test.js > parse > parse("123.50") = 123.5 0ms
 ✓ src/money.test.js > parse > parse("١٬٢٥٠ ج.م.") = 1250 0ms
 ✓ src/money.test.js > parse > parse("1,250.75 EGP") = 1250.75 0ms
 ✓ src/money.test.js > parse > parse("٧ جنيه") = 7 0ms
 ✓ src/money.test.js > parse > parse("-15") = -15 0ms
 ✓ src/money.test.js > parse > parse("0") = 0 0ms
 ✓ src/money.test.js > parse > بيفهم ناتج format نفسه (فيه علامات RLM) 12ms
 ✓ src/money.test.js > parse > بيرمي على "abc" والرسالة فيها النص 1ms
 ✓ src/money.test.js > parse > بيرمي على "" والرسالة فيها النص 0ms
 ✓ src/money.test.js > parse > بيرمي على "12.345" والرسالة فيها النص 0ms
 ✓ src/money.test.js > parse > بيرمي على "1e3" والرسالة فيها النص 0ms
 ✓ src/money.test.js > parse > بيرمي على "١٢ج ٣" والرسالة فيها النص 0ms
 ✓ src/money.test.js > format > عربي افتراضيًا 0ms
 ✓ src/money.test.js > format > بلغة تانية 0ms
 ✓ src/money.test.js > format > بيقرّب لقرشين 0ms
 ✓ src/money.test.js > add > 0.1 + 0.2 = 0.3 بالظبط 1ms
 ✓ src/money.test.js > add > من غير أرقام = 0 0ms
 ✓ src/money.test.js > add > سالب 0ms
 ✓ src/money.test.js > split > 100 على 3 = 33.34 و 33.33 و 33.33 ومجموعهم 100 0ms
 ✓ src/money.test.js > split > split(0.05, 3) 0ms
 ✓ src/money.test.js > split > split(10, 1) 0ms
 ✓ src/money.test.js > split > split(0, 2) 0ms
 ✓ src/money.test.js > split > split(-10, 3) 0ms
 ✓ src/money.test.js > split > بيرمي لو parts = 0 0ms
 ✓ src/money.test.js > split > بيرمي لو parts = -1 0ms
 ✓ src/money.test.js > split > بيرمي لو parts = 2.5 0ms
 ✓ src/money.test.js > split > بيرمي لو parts = NaN 0ms
 ✓ src/money.test.js > toCents و fromCents > 19.99 = 1999 قرش (مش 1998.9999999999998) 0ms
 ✓ src/money.test.js > toCents و fromCents > بيرمي على NaN 0ms
 ✓ src/money.test.js > toCents و fromCents > بيرمي على Infinity 0ms
 ✓ src/money.test.js > toCents و fromCents > بيرمي على 5 0ms
 Test Files  1 passed (1)
      Tests  32 passed (32)
   Start at  13:30:39
   Duration  201ms (transform 33%, tests 33%, import 26%, worker 8%)
~~~

~~~text الناتج: npm run check (آخره)
> eslint . --max-warnings 0
> prettier --check .
All matched files use Prettier code style!
> vitest run --coverage
      Tests  32 passed (32)
No files with missing coverage.
1 file fully covered.
Statements   : 100% ( 26/26 )
Branches     : 100% ( 13/13 )
Functions    : 100% ( 9/9 )
Lines        : 100% ( 22/22 )
~~~

## ترتيب البناء

1. **قرار التخزين الأول:** كل حاجة جوه بالقروش، و [[toCents]] هي الباب الوحيد اللي الجنيه بيدخل منه. ده اللي بيخلي [[add(0.1, 0.2)]] = [[0.3]].
2. [[money.js]] بالأربع دوال، وكل دالة اتجرّبت في [[node -e]] قبل ما يبقى فيه اختبار.
3. الاختبارات: حالة عادية لكل دالة، وبعدين الحالات الطرفية (عربي، سالب، صفر، [[split]] بباقي، مدخل بايظ).
4. أدوات الجودة: نفس [[package.json]] و [[eslint.config.js]] و Prettier بتوع مشروع «قالب مشروع جاهز»، و [[vitest.config.js]] بحد ١٠٠٪.
5. الـ CI والـ README في الآخر، والـ README منسوخ من الاختبارات.

~~~text
money/
├── .github/workflows/check.yml   الـ CI
├── package.json                   exports و files والسكربتات
├── eslint.config.js               نفس قالب مشروع «قالب مشروع جاهز»
├── .prettierrc.json  .prettierignore  .gitignore
├── vitest.config.js               thresholds: 100
├── README.md
└── src/
    ├── money.js
    └── money.test.js
~~~

## الكود

~~~js src/money.js
// money.js: الفلوس بتتحسب بالقروش (أرقام صحيحة)، والجنيه للدخول والعرض بس
const ARABIC_DIGITS = /[٠-٩]/g;
const BIDI_MARKS = /[\u{200e}\u{200f}\u{61c}]/gu;
const CURRENCY = /^(ج\.م\.?|جنيه|ج|EGP|LE)\s*|\s*(ج\.م\.?|جنيه|ج|EGP|LE)$/giu;
const SHAPE = /^-?\d+(\.\d{1,2})?$/;

export function toCents(pounds) {
  if (!Number.isFinite(pounds)) throw new TypeError($__btمش رقم: $__{pounds}$__bt);
  return Math.round(pounds * 100);
}

export const fromCents = (cents) => cents / 100;

export function parse(text) {
  const clean = String(text)
    .replace(BIDI_MARKS, '')
    .trim()
    .replace(ARABIC_DIGITS, (d) => d.charCodeAt(0) - 0x660)
    .replace(CURRENCY, '')
    .replace('٫', '.')
    .replace(/[٬,]/g, '')
    .replace('−', '-');
  if (!SHAPE.test(clean)) throw new Error($__btمبلغ مش مفهوم: «$__{text}»$__bt);
  return fromCents(toCents(Number(clean)));
}

export function format(pounds, locale = 'ar-EG') {
  const nf = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EGP',
  });
  return nf.format(fromCents(toCents(pounds)));
}

export function add(...amounts) {
  return fromCents(amounts.reduce((sum, a) => sum + toCents(a), 0));
}

export function split(total, parts) {
  if (!Number.isInteger(parts) || parts < 1) {
    throw new RangeError($__btعدد الأجزاء لازم رقم صحيح أكبر من صفر: $__{parts}$__bt);
  }
  const cents = toCents(total);
  const sign = cents < 0 ? -1 : 1;
  const base = Math.floor(Math.abs(cents) / parts);
  const extra = Math.abs(cents) % parts;
  return Array.from({ length: parts }, (_, i) =>
    fromCents(sign * (base + (i < extra ? 1 : 0))),
  );
}
~~~

| الحتة | بتعمل إيه وليه |
|---|---|
| [[toCents]] | [[Math.round(pounds * 100)]]: [[19.99 * 100]] = [[1998.9999999999998]] و [[round]] بيرجّعه [[1999]]. وبترمي [[TypeError]] على [[NaN]] و [[Infinity]] والنص، عشان رقم بايظ ميعدّيش ساكت لحد آخر الحسبة |
| [[BIDI_MARKS]] | [[format]] بالعربي بيحط علامة RLM ([[U+200F]]) في الأول والآخر. من غير شيلها [[parse(format(x))]] كان هيقع |
| [[CURRENCY]] | العملة في **أول** النص أو **آخره** بس ([[^]] و [[$]]). شوف الغلطة تحت |
| [[SHAPE]] | زي [[validate]] في مشروع المصاريف: اسأل عن **الشكل** قبل [[Number]]. فـ [['']] و [[1e3]] و [[12.345]] بيترفضوا |
| [[parse]] | بتنضّف: علامات الاتجاه، والمسافات (و [[trim]] بيشيل الـ NBSP كمان)، والأرقام العربي، والعملة، و [[٫]] → نقطة، وفواصل الآلاف [[٬]] و [[,]]. والرسالة فيها النص الأصلي بين «» |
| [[format]] | [[Intl.NumberFormat]] بعملة [[EGP]]، والتقريب لقرشين بيحصل في [[toCents]] قبله |
| [[add]] | بيجمع قروش، ويرجّع جنيه مرة واحدة في الآخر |
| [[split]] | القسمة بالقروش: [[10000 / 3]] = ٣٣٣٣ والباقي ١، فأول جزء بياخد قرش زيادة. فالمجموع **دايمًا** = الأصل. والسالب بيتقسم كقيمة موجبة وبعدين الإشارة |

~~~js src/money.test.js
import { describe, it, expect } from 'vitest';
import { parse, format, add, split, toCents, fromCents } from './money.js';

describe('parse', () => {
  it.each([
    ['١٢٣٫٥٠ ج', 123.5],
    ['123.50', 123.5],
    ['١٬٢٥٠ ج.م.', 1250],
    ['1,250.75 EGP', 1250.75],
    ['٧ جنيه', 7],
    ['-15', -15],
    ['0', 0],
  ])('parse(%j) = %d', (text, expected) => {
    expect(parse(text)).toBe(expected);
  });

  it('بيفهم ناتج format نفسه (فيه علامات RLM)', () => {
    expect(parse(format(1250.75))).toBe(1250.75);
  });

  it.each(['abc', '', '12.345', '1e3', '١٢ج ٣'])(
    'بيرمي على %j والرسالة فيها النص',
    (text) => {
      expect(() => parse(text)).toThrow($__btمبلغ مش مفهوم: «$__{text}»$__bt);
    },
  );
});

describe('format', () => {
  it('عربي افتراضيًا', () => {
    expect(format(123.5)).toBe('\u{200f}١٢٣٫٥٠\u{a0}ج.م.\u{200f}');
  });
  it('بلغة تانية', () => {
    expect(format(1234.5, 'en-EG')).toBe('EGP\u{a0}1,234.50');
  });
  it('بيقرّب لقرشين', () => {
    expect(format(0.005, 'en-EG')).toBe('EGP\u{a0}0.01');
  });
});

describe('add', () => {
  it('0.1 + 0.2 = 0.3 بالظبط', () => {
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(add(0.1, 0.2)).toBe(0.3);
  });
  it('من غير أرقام = 0', () => {
    expect(add()).toBe(0);
  });
  it('سالب', () => {
    expect(add(10, -2.5)).toBe(7.5);
  });
});

describe('split', () => {
  it('100 على 3 = 33.34 و 33.33 و 33.33 ومجموعهم 100', () => {
    const parts = split(100, 3);
    expect(parts).toEqual([33.34, 33.33, 33.33]);
    expect(add(...parts)).toBe(100);
  });
  it.each([
    [0.05, 3, [0.02, 0.02, 0.01]],
    [10, 1, [10]],
    [0, 2, [0, 0]],
    [-10, 3, [-3.34, -3.33, -3.33]],
  ])('split(%d, %i)', (total, n, expected) => {
    expect(split(total, n)).toEqual(expected);
    expect(add(...split(total, n))).toBe(total);
  });
  it.each([0, -1, 2.5, NaN])('بيرمي لو parts = %d', (n) => {
    expect(() => split(100, n)).toThrow(RangeError);
  });
});

describe('toCents و fromCents', () => {
  it('19.99 = 1999 قرش (مش 1998.9999999999998)', () => {
    expect(19.99 * 100).not.toBe(1999);
    expect(toCents(19.99)).toBe(1999);
    expect(fromCents(1999)).toBe(19.99);
  });
  it.each([NaN, Infinity, '5'])('بيرمي على %s', (x) => {
    expect(() => toCents(x)).toThrow(TypeError);
  });
});
~~~

- كل [[split]] في [[it.each]] بيتأكد من حاجتين: الأجزاء نفسها، و **إن مجموعها = الأصل**. التانية هي القاعدة اللي المكتبة موجودة عشانها.
- [[expect(0.1 + 0.2).not.toBe(0.3)]] جوه الاختبار نفسه: بيوثّق ليه المكتبة موجودة، ولو JavaScript اتغيّرت بكره (مش هتتغيّر) الاختبار هيقول.

~~~js vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/**/*.test.js'],
      reporter: ['text', 'html'],
      thresholds: { 100: true },
    },
  },
});
~~~

~~~json package.json
{
  "name": "@you/money",
  "version": "1.0.0",
  "description": "فلوس بالجنيه من غير 0.1 + 0.2: parse و format و add و split بالقروش",
  "exports": "./src/money.js",
  "files": [
    "src/money.js"
  ],
  "type": "module",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "coverage": "vitest run --coverage",
    "check": "npm run lint && npm run format:check && npm run coverage"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@vitest/coverage-v8": "^5.1.1",
    "eslint": "^10.15.0",
    "eslint-config-prettier": "^10.1.8",
    "globals": "^17.14.0",
    "prettier": "^3.10.1",
    "vitest": "^5.1.1"
  }
}
~~~

[[exports]] بيقول مين اللي بيتستورد لما حد يكتب [[import ... from '@you/money']]، و [[files]] بيحدد اللي بيتنشر. [[npm pack --dry-run]] قال الحزمة ٣ ملفات بس ([[README.md]] و [[package.json]] و [[src/money.js]]) و [[1.7 kB]]: الاختبارات والـ config مش بتتشحن لحد.

~~~yaml .github/workflows/check.yml
name: check
on:
  push:
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run check
~~~

- [[on: push]] و [[pull_request]]: على كل push وكل PR.
- [[npm ci]] مش [[npm i]]: بيسطّب من [[package-lock.json]] بالظبط، وبيفشل لو الملفين مش متطابقين.
- [[npm run check]] هو كل الفحص. لو خرج بـ [[1]]، علامة ✗ حمرا بتظهر جنب الـ commit والـ PR.

الملف ده من وثائق GitHub Actions ومن نفس الـ actions اللي الموقع ده بيستخدمها ([[actions/checkout@v5]] و [[actions/setup-node@v4]])، **ومش متشغّل على GitHub هنا**. اللي اتشغّل محليًا هو نفس الأمرين: [[npm ci]] و [[npm run check]].

~~~md README.md
# @you/money

فلوس بالجنيه من غير مفاجآت $__bt0.1 + 0.2$__bt: كل الحسابات جوه بالقروش (أرقام صحيحة).

$__bt$__bt$__btjs
import { parse, format, add, split } from '@you/money';

parse('١٢٣٫٥٠ ج'); // 123.5
parse('1,250.75 EGP'); // 1250.75
format(1234.5, 'en-EG'); // 'EGP 1,234.50' (المسافة NBSP)
add(0.1, 0.2); // 0.3
split(100, 3); // [33.34, 33.33, 33.33] ومجموعهم 100
parse('abc'); // Error: مبلغ مش مفهوم: «abc»
$__bt$__bt$__bt

كل سطر هنا منسوخ من اختبار في $__btsrc/money.test.js$__bt.

$__bt$__bt$__btbash
npm ci
npm run check   # lint + prettier --check + vitest بـ coverage 100%
$__bt$__bt$__bt
~~~

## الـ CI بيبقى أحمر إمتى: اتجرّب محليًا

**PR بيكسر قاعدة lint** (غيّرت شرط [[toCents]] لـ [[Number.isFinite(pounds) == false]]):

~~~text الناتج: npm run check
  8:31  error  Expected '===' and instead saw '=='  eqeqeq
✖ 1 problem (1 error, 0 warnings)
~~~

كود الخروج [[1]]، والاختبارات متشغّلتش أصلًا ([[&&]] وقّف عند أول فشل).

**PR بيقلل الـ coverage** (زوّدت فرع في [[fromCents]] ملوش اختبار):

~~~text الناتج: npm run check (آخره)
 money.js |     100 |    93.33 |     100 |     100 | 12
Branches     : 93.33% ( 14/15 )
ERROR: Coverage for branches (93.33%) does not meet global threshold (100%)
~~~

## الغلطات اللي حصلت وانا ببنيه

**١. [[parse('١٢ج ٣')]] رجّعت [[123]] بدل ما ترمي.** أول نسخة من [[CURRENCY]] كانت [[/\s*(ج...)\s*/g]] من غير [[^]] و [[$]]، فكانت بتشيل الـ «ج» من **نص** الرقم و «١٢» و «٣» اتلزقوا. الاختبار قال [[expected [Function] to throw an error]]. التصليح: العملة في الطرفين بس.

**٢. [[format]] و [[toBe('EGP 1,234.50')]] وقع والاتنين شكلهم واحد:**

~~~text الناتج
AssertionError: expected 'EGP 1,234.50' to be 'EGP 1,234.50' // Object.is equality

Expected: "EGP 1,234.50"
Received: "EGP 1,234.50"
~~~

طبعت الحروف بأكوادها: [[45 47 50 a0 31 2c ...]]. الـ [[a0]] ده NBSP (مسافة مبتتكسرش)، مش المسافة العادية [[20]]. و Intl بيحطها بين العملة والرقم عشان السطر ميتقسمش في النص. التصليح: [[\u{a0}]] صريحة في المتوقّع. ونفس الحكاية في العربي: [[\u{200f}١٢٣٫٥٠\u{a0}ج.م.\u{200f}]].

**٣. اسم الاختبار طلع [[بيرمي على null]] مرتين.** [[%j]] بيطبع JSON، و [[JSON.stringify(NaN)]] و [[Infinity]] = [[null]]. الاختبار كان شغّال، بس لو وقع مكنتش هتعرف أنهي فيهم. التصليح: [[%s]].

**الغلطة الشائعة:** تخزّن الجنيه كسور وتقرّب في الآخر بـ [[toFixed(2)]]. [[toFixed]] بيرجّع **نص**، و [[(1.005).toFixed(2)]] = [['1.00']] مش [['1.01']] لأن [[1.005]] متخزنة [[1.00499...]]. القروش من الأول بتشيل المشكلة دي من جذورها.` },
        { lvl: 'كبير', t: R`بوابة جودة لمشروع الوحدة اللي فاتت`, what: R`خد الشات أو عارض اللوج من وحدة «JS في المتصفح بعمق»، وافصل المنطق (parse الرسايل، والـ backoff، وتقطيع السطور) في دوال من غير DOM، واكتب ليها اختبارات Vitest، وشغّل ESLint و Prettier على المشروع كله.`, done: R`دالة الـ backoff ليها اختبار بيأكد ٥٠٠ و ١٠٠٠ و ٢٠٠٠ والسقف ٣٠ ألف، وتقطيع السطور ليه اختبار لـ chunk بيتقطع في نص سطر وفي نص حرف عربي، والـ coverage للملفات دي فوق ٩٠٪، و [[npm run check]] بيعدّي من غير warnings.`, ext: R`زوّد اختبار e2e بـ Playwright بيفتح الصفحة ويتأكد إن الرسالة بتظهر (تاب «فحص الكود»، وحدة Playwright).`, sol: R`## الشكل النهائي

الحل ده على **الشات** (مشروع «شات صغير بيستحمل الشبكة» في وحدة «JS في المتصفح بعمق»)، ومعاه تقطيع السطور من درس «Streams» لأن عارض اللوج بيستخدمه. كل المنطق بقى في [[src/logic/]] من غير ولا [[document]] ولا [[WebSocket]]:

~~~text الناتج: npx vitest run --reporter=verbose (Vitest 5.1.1، Node 24.22، ٢١ نوفمبر ٢٠٢٦)
 RUN  v5.1.1 C:/Users/you/lab/gate
 ✓ src/logic/logic.test.js > backoff > المحاولة 0 = 500 ms 1ms
 ✓ src/logic/logic.test.js > backoff > المحاولة 1 = 1000 ms 0ms
 ✓ src/logic/logic.test.js > backoff > المحاولة 2 = 2000 ms 0ms
 ✓ src/logic/logic.test.js > backoff > المحاولة 5 = 16000 ms 0ms
 ✓ src/logic/logic.test.js > backoff > المحاولة 6 = 30000 ms 0ms
 ✓ src/logic/logic.test.js > backoff > المحاولة 50 = 30000 ms 0ms
 ✓ src/logic/logic.test.js > backoff > base و cap بتتغيّر 0ms
 ✓ src/logic/logic.test.js > backoff > بيرمي على tries = -1 0ms
 ✓ src/logic/logic.test.js > backoff > بيرمي على tries = 1.5 0ms
 ✓ src/logic/logic.test.js > backoff > بيرمي على tries = NaN 0ms
 ✓ src/logic/logic.test.js > createLineSplitter > chunk اتقطع في نص سطر 1ms
 ✓ src/logic/logic.test.js > createLineSplitter > chunk اتقطع في نص حرف عربي (بايتين) 0ms
 ✓ src/logic/logic.test.js > createLineSplitter > آخر سطر من غير 
 بيطلع في end، و 
 بتتشال 0ms
 ✓ src/logic/logic.test.js > createLineSplitter > linesStream في pipeline حقيقي 5ms
 ✓ src/logic/logic.test.js > parseMessage > رسالة سليمة (والمسافات بتتشال) 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيرفض {"type": 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيرفض null 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيرفض {"type":"hack","text":"x","at":1} 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيرفض {"type":"chat","text":"   ","at":1} 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيرفض {"type":"chat","text":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","at":1} 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيرفض {"type":"chat","text":"x","at":"امبارح"} 0ms
 ✓ src/logic/logic.test.js > parseMessage > بيقبل object جاهز كمان 0ms
 Test Files  1 passed (1)
      Tests  22 passed (22)
   Start at  13:32:58
   Duration  183ms (import 38%, transform 26%, tests 24%, worker 12%)
~~~

~~~text الناتج: npm run check (آخره)
> eslint . --max-warnings 0
> prettier --check .
All matched files use Prettier code style!
> vitest run --coverage
      Tests  22 passed (22)
3 files fully covered.
Statements   : 100% ( 37/37 )
Branches     : 100% ( 26/26 )
Functions    : 100% ( 10/10 )
Lines        : 100% ( 34/34 )
~~~

كود الخروج [[0]] ومفيش ولا warning.

## الفكرة: افصل القرار عن التنفيذ

في الشات الأصلي، [[500 * 2 ** tries++]] كان جوه [[ws.onclose]]، و [[JSON.parse]] جوه [[ws.onmessage]]. عشان تختبرهم لازم WebSocket وسيرفر وتستنى ٣٠ ثانية. بعد الفصل:

~~~text
src/
├── chat-client.js      DOM و WebSocket بس (مبيتختبرش بـ Vitest، ده شغل Playwright)
└── logic/
    ├── backoff.js      كام ms نستنى
    ├── lines.js        بايتات ← سطور
    ├── messages.js     التحقق من شكل الرسالة
    └── logic.test.js
~~~

والأدوات (ESLint و Prettier و [[package.json]]) نفس مشروع «قالب مشروع جاهز»، و [[vitest.config.js]] بيقيس [[src/logic/]] بس بحد ٩٠٪:

~~~js vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/logic/**/*.js'],
      exclude: ['src/**/*.test.js'],
      reporter: ['text', 'html'],
      thresholds: { lines: 90, branches: 90, functions: 90, statements: 90 },
    },
  },
});
~~~

## المنطق

~~~js src/logic/backoff.js
// كام ms نستنى قبل المحاولة رقم tries (من صفر): 500، 1000، 2000... لحد السقف
export function backoff(tries, { base = 500, cap = 30_000 } = {}) {
  if (!Number.isInteger(tries) || tries < 0) {
    throw new RangeError($__bttries لازم رقم صحيح من صفر: $__{tries}$__bt);
  }
  return Math.min(cap, base * 2 ** tries);
}
~~~

دالة خالصة: نفس الـ [[tries]] = نفس الرقم دايمًا. والرمي على [[-1]] أو [[1.5]] بيمسك باج زي [[tries--]] بالغلط.

~~~js src/logic/lines.js
// بيقطّع بايتات جاية حتة حتة لسطور كاملة، حتى لو الـ chunk اتقطع في نص سطر أو نص حرف عربي
export function createLineSplitter() {
  const decoder = new TextDecoder('utf-8');
  let rest = '';
  return {
    push(bytes) {
      const parts = (rest + decoder.decode(bytes, { stream: true })).split(
        '\n',
      );
      rest = parts.pop();
      return parts.map((line) => line.replace(/\r$/, ''));
    },
    end() {
      const tail = rest + decoder.decode();
      rest = '';
      return tail === '' ? [] : [tail.replace(/\r$/, '')];
    },
  };
}

// نفس المنطق كـ TransformStream للمتصفح: res.body.pipeThrough(linesStream())
export function linesStream() {
  const splitter = createLineSplitter();
  return new TransformStream({
    transform(chunk, controller) {
      for (const line of splitter.push(chunk)) controller.enqueue(line);
    },
    flush(controller) {
      for (const line of splitter.end()) controller.enqueue(line);
    },
  });
}
~~~

- **[[decoder.decode(bytes, { stream: true })]]** بنفس الـ decoder كل مرة: لو الـ chunk خلص في نص حرف عربي (بايت من اتنين)، الـ decoder بيحتفظ بالبايت لحد الـ chunk الجاي.
- **[[rest]]** آخر حتة بعد آخر [[\n]]: سطر لسه مخلصش، بيتلزق في أول الـ chunk الجاي.
- **[[end()]]** بيطلّع آخر سطر لو الملف مبيخلصش بـ [[\n]]، و [[decoder.decode()]] من غير بايتات بيقفل الـ decoder.
- **[[linesStream()]]** نفس المنطق في [[TransformStream]] للمتصفح، فالـ splitter متختبر لوحده **و** في pipeline حقيقي.

~~~js src/logic/messages.js
// رسالة الشات: { type: 'chat', text, at } ومتحققة قبل ما تتعرض أو تتبعت
const TYPES = new Set(['chat', 'join', 'leave']);
const MAX_TEXT = 500;

export function parseMessage(raw) {
  let data;
  try {
    data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return { ok: false, error: 'JSON بايظ' };
  }
  if (!data || typeof data !== 'object')
    return { ok: false, error: 'مش object' };
  if (!TYPES.has(data.type))
    return { ok: false, error: $__bttype مش معروف: $__{data.type}$__bt };
  if (typeof data.text !== 'string' || data.text.trim() === '') {
    return { ok: false, error: 'text لازم نص مش فاضي' };
  }
  if (data.text.length > MAX_TEXT)
    return { ok: false, error: $__bttext أطول من $__{MAX_TEXT}$__bt };
  if (!Number.isFinite(data.at))
    return { ok: false, error: 'at لازم وقت بالـ ms' };
  return {
    ok: true,
    value: { type: data.type, text: data.text.trim(), at: data.at },
  };
}

export const makeMessage = (text, at = Date.now()) =>
  JSON.stringify({ type: 'chat', text, at });
~~~

بترجّع [[{ ok, value }]] أو [[{ ok: false, error }]] بدل ما ترمي، زي [[validate]] في مشروع المصاريف: رسالة بايظة من عميل تاني متوقّعش الصفحة.

## الاختبارات

~~~js src/logic/logic.test.js
import { describe, it, expect } from 'vitest';
import { backoff } from './backoff.js';
import { createLineSplitter, linesStream } from './lines.js';
import { parseMessage, makeMessage } from './messages.js';

describe('backoff', () => {
  it.each([
    [0, 500],
    [1, 1000],
    [2, 2000],
    [5, 16000],
    [6, 30000],
    [50, 30000],
  ])('المحاولة %i = %i ms', (tries, ms) => {
    expect(backoff(tries)).toBe(ms);
  });
  it('base و cap بتتغيّر', () => {
    expect(backoff(3, { base: 100, cap: 500 })).toBe(500);
  });
  it.each([-1, 1.5, NaN])('بيرمي على tries = %s', (t) => {
    expect(() => backoff(t)).toThrow(RangeError);
  });
});

const bytes = (s) => new TextEncoder().encode(s);

describe('createLineSplitter', () => {
  it('chunk اتقطع في نص سطر', () => {
    const sp = createLineSplitter();
    expect(sp.push(bytes('أول سطر\nتا'))).toEqual(['أول سطر']);
    expect(sp.push(bytes('ني سطر\n'))).toEqual(['تاني سطر']);
    expect(sp.end()).toEqual([]);
  });

  it('chunk اتقطع في نص حرف عربي (بايتين)', () => {
    const all = bytes('سلام\nعليكم\n');
    expect(all.length).toBe(20);
    const sp = createLineSplitter();
    const out = [];
    for (let i = 0; i < all.length; i += 3)
      out.push(...sp.push(all.slice(i, i + 3)));
    out.push(...sp.end());
    expect(out).toEqual(['سلام', 'عليكم']);
    expect(out.join('')).not.toContain('\uFFFD');
  });

  it('آخر سطر من غير \n بيطلع في end، و \r\n بتتشال', () => {
    const sp = createLineSplitter();
    expect(sp.push(bytes('a\r\nb'))).toEqual(['a']);
    expect(sp.end()).toEqual(['b']);
  });

  it('linesStream في pipeline حقيقي', async () => {
    const source = new ReadableStream({
      start(c) {
        const all = bytes('سطر ١\nسطر ٢\nسطر ٣');
        for (let i = 0; i < all.length; i += 5) c.enqueue(all.slice(i, i + 5));
        c.close();
      },
    });
    const got = [];
    await source
      .pipeThrough(linesStream())
      .pipeTo(new WritableStream({ write: (l) => got.push(l) }));
    expect(got).toEqual(['سطر ١', 'سطر ٢', 'سطر ٣']);
  });
});

describe('parseMessage', () => {
  it('رسالة سليمة (والمسافات بتتشال)', () => {
    expect(parseMessage(makeMessage('  ازيك  ', 1000))).toEqual({
      ok: true,
      value: { type: 'chat', text: 'ازيك', at: 1000 },
    });
  });
  it.each([
    ['{"type":', 'JSON بايظ'],
    ['null', 'مش object'],
    ['{"type":"hack","text":"x","at":1}', 'type مش معروف: hack'],
    ['{"type":"chat","text":"   ","at":1}', 'text لازم نص مش فاضي'],
    [
      JSON.stringify({ type: 'chat', text: 'x'.repeat(501), at: 1 }),
      'text أطول من 500',
    ],
    ['{"type":"chat","text":"x","at":"امبارح"}', 'at لازم وقت بالـ ms'],
  ])('بيرفض %s', (raw, error) => {
    expect(parseMessage(raw)).toEqual({ ok: false, error });
  });
  it('بيقبل object جاهز كمان', () => {
    expect(parseMessage({ type: 'join', text: 'سارة', at: 5 }).ok).toBe(true);
  });
});
~~~

| المطلوب في المشروع | الاختبار |
|---|---|
| ٥٠٠ و ١٠٠٠ و ٢٠٠٠ والسقف ٣٠ ألف | [[it.each]] في [[backoff]]: [[0 → 500]] لحد [[6 → 30000]] و [[50 → 30000]] |
| chunk بيتقطع في نص سطر | «chunk اتقطع في نص سطر» |
| وفي نص حرف عربي | «chunk اتقطع في نص حرف عربي»: ٢٠ بايت متقطعين كل ٣، فالحرف التاني اتقسم بين أول chunk وتاني chunk |
| coverage فوق ٩٠٪ | ١٠٠٪ في الأربع أعمدة |

## إثبات إن الاختبار بيمسك الباج

بدّلت [[decoder.decode(bytes, { stream: true })]] بـ [[new TextDecoder().decode(bytes)]] (decoder جديد لكل chunk، الغلطة المشهورة في درس «Streams»):

~~~text الناتج
 FAIL  src/logic/logic.test.js > createLineSplitter > chunk اتقطع في نص حرف عربي (بايتين)
AssertionError: expected [ 'س\ufffd\ufffdام', …(1) ] to deeply equal [ 'سلام', 'عليكم' ]
- Expected
+ Received
  [
-   "سلام",
-   "عليكم",
+   "س��ام",
+   "ع��يك��",
  ]
 FAIL  src/logic/logic.test.js > createLineSplitter > linesStream في pipeline حقيقي
~~~

الـ [[�]] (�) هو الحرف البديل اللي الـ decoder بيحطه مكان بايتات مش مفهومة. الاختبارين وقعوا، ولما رجّعت السطر عدّوا.


## الجزء اللي فضل في المتصفح

~~~js src/chat-client.js
// الجزء اللي فيه DOM و WebSocket بس: كل قرار بيتاخد من src/logic
import { backoff } from './logic/backoff.js';
import { parseMessage, makeMessage } from './logic/messages.js';

const list = document.querySelector('#messages');
const status = document.querySelector('#status');
const queue = [];
let ws = null;
let tries = 0;

function show(msg) {
  const li = document.createElement('li');
  li.textContent = msg.text;
  list.append(li);
}

function connect() {
  ws = new WebSocket('ws://localhost:8300');
  status.textContent = 'بيحاول...';
  ws.onopen = () => {
    tries = 0;
    status.textContent = 'متصل';
    while (queue.length) ws.send(queue.shift());
  };
  ws.onmessage = (e) => {
    const result = parseMessage(e.data);
    if (result.ok) show(result.value);
    else status.textContent = 'رسالة اترفضت: ' + result.error;
  };
  ws.onclose = () => {
    const wait = backoff(tries++);
    status.textContent = $__btمقطوع، هحاول تاني بعد $__{wait / 1000} ث$__bt;
    setTimeout(connect, wait);
  };
}

export function send(text) {
  const raw = makeMessage(text);
  if (!parseMessage(raw).ok) return false;
  if (ws?.readyState === WebSocket.OPEN) ws.send(raw);
  else queue.push(raw);
  return true;
}

connect();
~~~

مفيش ولا قرار هنا: [[backoff(tries++)]] بيقول الانتظار، و [[parseMessage]] بيقول الرسالة سليمة ولا لأ. اللي فاضل اتصال وعرض، وده بيتجرّب في متصفح حقيقي (الـ ext: Playwright).

## الغلطات اللي حصلت

**١. رقم غلط في الاختبار نفسه.** كتبت [[expect(all.length).toBe(21)]] لـ [[سلام\nعليكم\n]] من دماغي، والاختبار وقع: [[expected 20 to be 21]]. ٤ حروف × ٢ + ٥ × ٢ + سطرين = ٢٠. الاختبار مسك غلطتي أنا في الحساب، وده بيحصل: لما اختبار يقع، اسأل الأول «المتوقّع نفسه صح؟».

**٢. [[console.warn]] في [[chat-client.js]]:**

~~~text الناتج: npm run lint
src\chat-client.js
  28:10  error  Unexpected console statement  no-console
~~~

القالب بيمنع [[console]] في [[src/]] عن قصد. الرسالة المرفوضة بقت تظهر في [[#status]]، وده أحسن لليوزر كمان.

**الغلطة الشائعة:** تختبر الـ backoff بإنك تقفل السيرفر وتستنى بعينك. ٥٠٠ و ١٠٠٠ و ٢٠٠٠ والسقف محتاجين أكتر من دقيقة، والسقف بالذات محدش بيستناه فمحدش بيعرف إنه غلط. الدالة الخالصة اتجرّبت كلها في 1ms.` },
        { lvl: 'فكرة', t: R`قواعدك انت`, what: R`اقرا لستة القواعد في ESLint docs واختار ٥ قواعد مش في [[recommended]] شايف إنها كانت هتمسك باجات حقيقية عملتها قبل كده (زي [[no-await-in-loop]] أو [[prefer-const]] أو [[no-param-reassign]]). شغّلها على كل مشاريعك وعدّ مسكت كام حاجة. انت اللي بتختار.`, done: R`جدول فيه القاعدة، وليه اخترتها، وكام مكان مسكته في مشاريعك، ومثال واحد حقيقي منهم كان باج فعلًا مش ذوق.`, ext: R`اكتب قاعدة ESLint بتاعتك (custom rule) بتمنع حاجة معيّنة في مشروعك، زي [[console.log]] في [[src/]]، أو اسم متغير بالعربي.`, sol: R`## الشكل النهائي: الجدول

ده **نسخة نموذجية واحدة**: الاختيار بتاعي، على ٤ «مشاريع» من الكورس (مشروع ملاحظات قديم، و [[request.js]] من «مشروع: fetch محترم»، و [[money.js]]، والشات بعد بوابة الجودة)، بـ ESLint 10.15.0 يوم ٢١ نوفمبر ٢٠٢٦. جدولك هيطلع غيره لأن مشاريعك غير دي.

| القاعدة | ليه اخترتها | مسكت كام | باج ولا ذوق؟ |
|---|---|---|---|
| [[eqeqeq]] | [[0 == '']] و [[false == '0']] بـ [[true]] | ١ | باج محتمل: [[done == true]] بيعامل [[1]] و [['1']] زي [[true]] |
| [[no-var]] | [[var]] مالوش block scope، ومشكلة closures في loop المشهورة | ١ | ذوق هنا (مفيش loop)، بس رخيص |
| [[no-await-in-loop]] | طلبات ورا بعض وهي ممكن تبقى مع بعض | ٤ (٣ منهم مقصودين) | **باج أداء حقيقي** في واحد |
| [[no-param-reassign]] بـ [[props: true]] | دالة بتعدّل object جالها فبتغيّر الحالة من ورا ضهر اللي ناداها | ٢ | **باج حقيقي** |
| [[prefer-const]] | [[let]] متغيّرتش = نية مش واضحة | ٠ | ملقتش حاجة في المشاريع دي |

**المثال اللي كان باج فعلًا:** [[markDone(note)]] بتعدّل الـ [[note]] اللي جالها وترجّعه:

~~~text الناتج: node measure.mjs
واحدة ورا التانية: 1090 ms
Promise.all: 105 ms
preview.done = true | saved[0].done = true | نفس الـ object؟ true
~~~

السطر الأخير: كنت عايز «معاينة» للملاحظة وهي متعلّمة، والنتيجة إن الملاحظة **المحفوظة** نفسها اتعلّمت. ده نفس باج [[addItem]] اللي اختبار [[not.toBe(cart)]] بيمسكه في درس Vitest. والسطرين الأولانيين: ١٠ رفعات ورا بعض أخدوا ١٠٩٠ms، ومع بعض ١٠٥ms.

## الملفات

~~~text
myrules/
├── eslint.config.js
├── measure.mjs
└── projects/
    ├── old-notes/store.js
    ├── fetch/request.js         من «مشروع: fetch محترم»
    ├── money/money.js           من مشروع «مكتبة صغيرة بجودة الشغل»
    └── chat/                    من مشروع «بوابة جودة»
~~~

~~~js eslint.config.js
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'no-await-in-loop': 'error',
      'no-param-reassign': ['error', { props: true }],
      'prefer-const': 'error',
    },
  },
  {
    // الإعادة لازم تبقى محاولة ورا محاولة: الـ await جوه الـ loop هنا مقصود
    files: ['projects/fetch/request.js'],
    rules: { 'no-await-in-loop': 'off' },
  },
]);
~~~

- [[props: true]] في [[no-param-reassign]]: من غيرها القاعدة بتمنع [[note = ...]] بس، ومبتمنعش [[note.done = true]] اللي هو الباج الحقيقي.
- العنصر التاني بيقفل [[no-await-in-loop]] في ملف واحد بسبب مكتوب، بدل ٣ تعليقات [[eslint-disable]] جوه الكود.

~~~js projects/old-notes/store.js
export function loadNotes() {
  var raw = localStorage.getItem("notes")
  if (raw == null) return []
  try { return JSON.parse(raw) } catch (e) { return [] }
}
export function countDone(notes) {
  let n = 0
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].done == true) n++
  }
  return n
}
export async function syncAll(notes, upload) {
  for (const note of notes) {
    await upload(note)
  }
}
export function markDone(note) {
  note.done = true
  note.at = Date.now()
  return note
}
~~~

~~~js measure.mjs
import { syncAll, markDone } from './projects/old-notes/store.js';
const notes = Array.from({ length: 10 }, (_, i) => ({ id: i, done: false }));
const upload = () => new Promise((r) => setTimeout(r, 100));
let t = performance.now();
await syncAll(notes, upload);
console.log('واحدة ورا التانية:', Math.round(performance.now() - t), 'ms');
t = performance.now();
await Promise.all(notes.map(upload));
console.log('Promise.all:', Math.round(performance.now() - t), 'ms');
const saved = [{ id: 1, done: false }];
const preview = markDone(saved[0]);
console.log('preview.done =', preview.done, '| saved[0].done =', saved[0].done, '| نفس الـ object؟', preview === saved[0]);
~~~

## التشغيل الأول: قبل استثنا [[request.js]]

~~~text الناتج: npx eslint projects
C:\Users\you\lab\myrules\projects\fetch\request.js
  65:13  error  Unexpected $__btawait$__bt inside a loop  no-await-in-loop
  72:38  error  Unexpected $__btawait$__bt inside a loop  no-await-in-loop
  80:5   error  Unexpected $__btawait$__bt inside a loop  no-await-in-loop

C:\Users\you\lab\myrules\projects\old-notes\store.js
   2:3   error  Unexpected var, use let or const instead             no-var
   4:41  error  'e' is defined but never used                        no-unused-vars
   9:23  error  Expected '===' and instead saw '=='                  eqeqeq
  15:5   error  Unexpected $__btawait$__bt inside a loop                     no-await-in-loop
  19:3   error  Assignment to property of function parameter 'note'  no-param-reassign
  20:3   error  Assignment to property of function parameter 'note'  no-param-reassign

✖ 9 problems (9 errors, 0 warnings)
~~~

**أهم حاجة طلعت:** [[no-await-in-loop]] مسك ٣ في [[request.js]]، والتلاتة **صح**: الإعادة معناها «استنى المحاولة دي تخلص، وبعدين قرر». لو اتعملت بـ [[Promise.all]] كانت كل المحاولات هتتبعت مع بعض، وده عكس الفكرة. يعني القاعدة دي بتمسك باج في مكان وبتغلط في مكان، فالقرار: تفضل [[error]]، والاستثنا بسبب مكتوب. ولما عدّيت النتايج بـ [[--format json]] بعد الاستثنا:

~~~text الناتج
{ 'no-var': 1, 'no-unused-vars': 1, eqeqeq: 1, 'no-await-in-loop': 1, 'no-param-reassign': 2 }
~~~

([[no-unused-vars]] من الـ recommended، مش من الخمسة.)

## ليه النسخة دي

- **اخترت القواعد من باجات حصلت مش من لستة «أحسن قواعد»:** كل قاعدة ليها سطر في عمود «ليه» بيشاور على باج ممكن يحصل.
- **[[prefer-const]] مسكت صفر وفضلت:** رخيصة و [[--fix]] بيصلّحها لوحده، والصفر هنا معناه إن المشاريع دي اتنضّفت قبل كده (مشروع «نضّف مشروع قديم»).
- **القاعدة اللي بتغلط في مكان متتشالش، بيتعمل لها استثنا ضيّق:** ملف واحد، بسبب مكتوب في الـ config.

**الغلطة الشائعة:** تشغّل [[eslint:all]] (كل القواعد) فيطلع مئات الأخطاء معظمها ذوق، فتقفل الكل. أو تقيس «مسكت كام» من غير ما تفرّق بين باج وذوق: الـ ٤ بتوع [[no-await-in-loop]] كانوا هيبانوا إنجاز، و ٣ منهم كانوا صح من الأول.` },
      ],
      n: R`الأداتين اللي في أي repo JavaScript حقيقي: ESLint و Prettier للشكل والباجات قبل التشغيل، و Vitest للاختبار. اتجرّبوا على ESLint 10.13 و Prettier 3.9 و Vitest 5.0 و Node 24.22 في مشروع تجربة على ويندوز ١١، والناتج منسوخ زي ما طلع (والمسار اتغيّر لـ [[C:\Users\you\lab]]). وللتعمق: تاب «فحص الكود» فيه وحدات كاملة عن الـ hooks والـ CI والـ mocks`,
      items: [
        {
          cmd: "ESLint و Prettier",
          title: "eslint.config.js و --fix و prettier --check، ومن غير خناق",
          learn: R`تعمل [[eslint.config.js]] (الـ flat config)، وتقرا ناتج ESLint، وتستخدم [[--fix]]، وتشغّل Prettier بـ [[--check]] و [[--write]]، وتربطهم بـ [[eslint-config-prettier]].`,
          out: R`مشروع بيمسك المتغيرات الغلط و [[==]] قبل التشغيل، وشكله موحّد مهما كتب فيه كام واحد.`,
          use: {
            prog: R`ESLint بيمسك باجات حقيقية: [[discunt]] بدل [[discount]] كانت هتبقى [[ReferenceError]] وقت التشغيل، وهو مسكها من غير ما يشغّل حاجة. و Prettier بيخليك متفكرش في المسافات والفواصل خالص.`,
            work: R`في أي فريق، الـ review مبيضيعش وقت في «حط مسافة هنا»: Prettier عملها. و [[npm run lint]] أول خطوة في الـ CI، فلو فشل الـ PR مبيتراجعش أصلًا.`,
            cs: R`ESLint بيحوّل الكود لشجرة (AST) وكل قاعدة بتمشي على الشجرة تدوّر على شكل معيّن، و Prettier بيرمي الشكل الأصلي خالص ويطبع الشجرة من جديد بقواعده. عشان كده Prettier مبيقبلش «استثناءات» زي ESLint.`,
          },
          desc: R`أداتين مختلفين بيشتغلوا مع بعض:

- **ESLint** بيدوّر على **باجات وممارسات غلط**: متغير مستخدم ومش متعرّف ([[no-undef]])، متغير متعرّف ومش مستخدم ([[no-unused-vars]])، [[==]] بدل [[===]] ([[eqeqeq]]). الإعدادات في [[eslint.config.js]] (الـ **flat config**): array من objects، كل واحد بيقول «الملفات دي، القواعد دي».
- **Prettier** بيظبط **الشكل** بس: المسافات، والفواصل المنقوطة، ونوع علامات التنصيص، وطول السطر. مبيفهمش باجات.

| | ESLint | Prettier |
|---|---|---|
| بيدوّر على | باجات وممارسات: متغير غلط، [[==]]، كود ميت | شكل: مسافات، [[;]]، علامات تنصيص |
| الأمر | [[npx eslint .]] | [[npx prettier --check .]] |
| يصلّح | [[--fix]] (اللي آمن بس) | [[--write]] (كله) |
| الإعدادات | [[eslint.config.js]] | [[.prettierrc.json]] و [[.prettierignore]] |

**ليه مبيتخانقوش؟** لو قاعدة شكل في ESLint (زي [[quotes: double]]) و Prettier بيكتب single: [[eslint --fix]] يحوّلها double، و [[prettier --write]] يرجّعها single، وكل واحد بيقول التاني غلط (اتجرّب). [[eslint-config-prettier]] بيقفل كل قواعد الشكل في ESLint، فالشكل لـ Prettier لوحده والباجات لـ ESLint لوحده. **ولازم يبقى آخر عنصر في الـ array** عشان يقفل اللي قبله.

اتجرّب على ESLint **10.13** (اللي نزل من npm النهارده، مش 9). في 10، الـ flat config هو الوحيد: [[.eslintrc.json]] بيتجاهل خالص، ومن غير [[eslint.config.js]] بيطلع «ESLint couldn't find an eslint.config.* file» وكود خروج [[2]].`,
          example: R`// eslint.config.js في فولدر المشروع (و package.json فيه "type": "module")
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
export default defineConfig([
  globalIgnores(['dist/', 'coverage/']),
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
    },
  },
  prettier,
]);`,
          lines: [
            R`[[defineConfig]] دالة من ESLint نفسه بتلف الإعدادات (بتدّيك autocomplete في VS Code وبتسمح بـ [[extends]])، و [[globalIgnores]] بتعمل قايمة تجاهل للمشروع كله. [[eslint/config]] متاح من ESLint 9.22.`,
            R`[[@eslint/js]] باكدج فيه القواعد الرسمية الموصى بيها. [[js.configs.recommended]] فيه ٦٤ قاعدة (عدّتهم من الباكدج)، كلها باجات حقيقية ومفيش قواعد شكل، ومن غيرها ESLint مش هيقول ولا حاجة لأنه مبيشغّلش أي قاعدة لوحده.`,
            R`[[globals]] باكدج فيه أسماء كل المتغيرات اللي البيئة بتعرّفها: [[window]] و [[document]] للمتصفح، و [[process]] و [[__dirname]] لـ Node. من غيره [[no-undef]] بيقول إن [[console]] نفسه مش متعرّف (اتجرّب: [[3 errors]] على [[console]] و [[window]] و [[process]]).`,
            R`[[eslint-config-prettier]] object جاهز بيقفل كل قواعد ESLint اللي ليها علاقة بالشكل (٣٥٨ قاعدة في نسخة 10.1.8، من ESLint والـ plugins المشهورة) عشان متتخانقش مع Prettier.`,
            R`[[export default]] لأن ESLint بيعمل [[import]] للملف ده وبياخد الـ default. والملف [[.js]] بصيغة ESM لأن [[package.json]] فيه [[type: module]]، ولو مش فيه سمّيه [[eslint.config.mjs]].`,
            R`أول عنصر: فولدرات ESLint ميبصّش فيها خالص. [[node_modules]] متجاهل لوحده، بس [[dist/]] (كود متبني) و [[coverage/]] (تقرير Vitest) لأ، ومن غير السطر ده ESLint هيطلّع مئات الأخطاء في كود مش بتاعك.`,
            R`عنصر الإعدادات الأساسي. كل object في الـ array بيتطبق على الملفات اللي تطابقه، واللي تحت بيكسب على اللي فوق لو اتعارضوا.`,
            R`[[files]] الملفات اللي العنصر ده عليها: [[**/*.js]] = أي ملف [[.js]] في أي فولدر. ولو عندك [[.mjs]] أو [[.jsx]] زوّدهم هنا، وإلا ESLint مش هيفحصهم.`,
            R`[[extends]] بيحط الـ recommended **جوه** نفس النطاق ده (الملفات اللي في [[files]] بس). ده أحسن من إنك تحطه كعنصر لوحده في الـ array، لأنه كان هيتطبق على كل حاجة.`,
            R`[[languageOptions.globals]]: الأسماء المعروفة. [[...]] بتفرد الاتنين في object واحد، فـ [[window]] و [[process]] الاتنين مسموحين. ولو المشروع متصفح بس، شيل [[globals.node]] عشان [[process]] في كود المتصفح يطلع error. و [[ecmaVersion]] و [[sourceType]] مش لازمين: [[--print-config]] قال [[2026]] و [[module]] لوحدهم.`,
            R`[[rules]]: هنا بتغيّر قواعد أو تزوّد. كل قاعدة قيمتها [['off']] أو [['warn']] (بتطبع ومبتوقّعش) أو [['error']] (بتخلي كود الخروج ١)، أو array أوله المستوى وبعده الخيارات.`,
            R`[[eqeqeq]]: ممنوع [[==]] و [[!=]]، و [[always]] في كل حتة، ما عدا [[== null]] ([[null: 'ignore']]) لأنه اختصار معروف لـ «[[null]] أو [[undefined]]» وآمن. من غير الخيار ده [[s == null]] كان هيطلع error.`,
            R`[[no-unused-vars]]: متغير أو import أو argument مش مستخدم = error. [[argsIgnorePattern: '^_']] بيسمح بـ arguments بتبدأ بـ [[_]] ([[(_req, res) =>]]) لأن ساعات لازم تستقبل argument عشان توصل للي بعده. والرسالة نفسها بتقولك القاعدة دي.`,
            R`[[prefer-const]]: [[let]] اتعرّف ومتغيّرش أبدًا = warning يقول «استخدم [[const]]». ده من القواعد اللي [[--fix]] بيصلّحها لوحده لأن التحويل آمن.`,
            R`نهاية الـ [[rules]].`,
            R`نهاية عنصر الإعدادات الأساسي.`,
            R`[[eslint-config-prettier]] **آخر حاجة**: لأن العناصر اللي تحت بتكسب، فهو بيقفل أي قاعدة شكل اتفعّلت فوق (حتى لو انت فعّلتها بإيدك). اتجرّب: [[quotes: double]] مع السطر ده [[--print-config]] قال [[0]] (مقفولة)، ومن غيره رجعت [[error]].`,
            R`نهاية الـ array ونهاية [[defineConfig]].`,
          ],
          try: R`اعمل الفولدر من «المعمل»، وحط الـ config وملف [[src/cart.js]] الغلط اللي في الشرح، وشغّل [[npx eslint .]] واقرا كل سطر. بعدين [[npx eslint . --fix]] وشوف إيه اللي اتصلّح وإيه لأ وليه. وبعدها شيل [[prettier]] من آخر الـ config وزوّد [[quotes: ['error', 'double']]] وشغّل [[eslint --fix]] ثم [[prettier --write]] ثم [[eslint]] تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[npx eslint --help]] بس (من غير الدرس)، لاقي: الخيار اللي بيخلي ESLint يفشل لو فيه warning واحد، والخيار اللي بيفحص الملفات المتغيّرة بس، والخيار اللي بيوريك الصلاح من غير ما يكتبه. وجرّب الأول على ملف فيه [[let]] متغيّرش.`, done: R`كاتب التلاتة ([[--max-warnings 0]] و [[--cache]] و [[--fix-dry-run]])، وعلى ملف فيه warning بس: من غيره كود الخروج [[0]]، ومعاه [[1]] ورسالة «ESLint found too many warnings (maximum: 0)».`, sol: R`**الإجابة من [[npx eslint --help]] (ESLint 10.15.0، ٢١ نوفمبر ٢٠٢٦):** الـ help متقسم أقسام بعناوين، فدوّر على العنوان الأول مش على الكلمة:

~~~text الناتج: npx eslint --help (الأجزاء اللي فيها الإجابة)
  --fix                            Automatically fix problems
  --fix-dry-run                    Automatically fix problems without saving the changes to the file system

Handle Warnings:
  --quiet                          Report errors only - default: false
  --max-warnings Int               Number of warnings to trigger nonzero exit code - default: -1

  --cache                          Only check changed files - default: false
  --cache-location path::String    Path to the cache file or directory
~~~

| المطلوب | الخيار | اتلاقى تحت |
|---|---|---|
| يفشل لو فيه warning واحد | [[--max-warnings 0]] | «Handle Warnings»: «Number of warnings to trigger nonzero exit code»، والافتراضي [[-1]] يعني من غير حد |
| يفحص المتغيّر بس | [[--cache]] | «Only check changed files»، وبيحفظ في [[.eslintcache]] |
| يوريك الصلاح من غير ما يكتبه | [[--fix-dry-run]] | «without saving the changes to the file system» |

**التجربة:** ملف فيه [[let]] متغيّرش، وكود الخروج بعد كل أمر بـ [[echo $?]] (في PowerShell [[$LASTEXITCODE]]):

~~~js src/warn.js
let greeting = 'hi';
export const hello = () => greeting;
~~~

~~~bash
npx eslint src/warn.js; echo "exit=$?"
npx eslint src/warn.js --max-warnings 0; echo "exit=$?"
~~~

~~~text الناتج
C:\Users\you\lab\lint\src\warn.js
  1:5  warning  'greeting' is never reassigned. Use 'const' instead  prefer-const

✖ 1 problem (0 errors, 1 warning)
  0 errors and 1 warning potentially fixable with the $__bt--fix$__bt option.

exit=0

C:\Users\you\lab\lint\src\warn.js
  1:5  warning  'greeting' is never reassigned. Use 'const' instead  prefer-const

✖ 1 problem (0 errors, 1 warning)
  0 errors and 1 warning potentially fixable with the $__bt--fix$__bt option.

ESLint found too many warnings (maximum: 0).
exit=1
~~~

**[[--fix-dry-run]] لوحده مبيطبعش الكود المصلّح**، بيطبع اللي هيفضل بعد الصلاح (هنا ولا حاجة، والملف متغيّرش). عشان تشوف النتيجة نفسها لازم [[--format json]]، والخاصية [[output]] فيها الملف بعد الصلاح:

~~~text الناتج: npx eslint src/warn.js --fix-dry-run --format json (الخاصية output بس)
"const greeting = 'hi';\nexport const hello = () => greeting;\n"
~~~

و [[cat src/warn.js]] بعدها لسه فيه [[let]]: الملف متلمسش.

**ليه ده مهم:** الـ CI بيقرا كود الخروج بس. warning من غير [[--max-warnings 0]] = [[0]] = أخضر، فالـ warnings بتتراكم لحد ما محدش يقراها. والغلطة الشائعة: تدوّر في الـ help على «warning» فتلاقي [[--no-warn-ignored]] الأول وتفتكره هو. اقرا العنوان «Handle Warnings» والجملة اللي جنب الخيار.`},
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف [[src/cart.js]] اللي في الشرح (٥ errors). صلّحهم بإيدك من غير ولا [[eslint-disable]]، واكتب جنب كل واحد في تعليق: كان هيعمل إيه لو اتشغّل؟`, done: R`[[npx eslint .]] بيخرج بـ [[0]]، و [[npx prettier --check .]] كمان، وعارف إن [[discunt]] كان [[ReferenceError]] أول ما الدالة تتنادى، و [[item.qty == '0']] كان بيعدّي [[0]] و [['0']] و [[false]] و [[ [0] ]] كلهم (جرّب [[0 == '0']] و [[ [0] == '0' ]] في Node).`, sol: R`**الأول شوف كل باج بيعمل إيه وهو شغّال**، عشان التعليق اللي هتكتبه يبقى من تشغيل مش من تخمين. على [[cart.js]] البايظ زي ما هو في الشرح:

~~~bash
node -e "console.log(0 == '0', false == '0', [0] == '0', '' == '0', 0 === '0')"
node -e "import('./src/cart.js').then(m => m.total([{ price: 10, qty: 2 }], 5)).catch(e => console.log(e.name + ': ' + e.message))"
~~~

~~~text الناتج (Node 24.22)
true true true false false
ReferenceError: discunt is not defined
~~~

[[==]] بيحوّل الطرفين لنفس النوع قبل المقارنة، فـ [[0]] و [[false]] و [[ [0] ]] كلهم بيبقوا «زي» [['0']]. و [[discunt]] بيوقّع الدالة أول ما تتنادى.

**الملف بعد التصليح:**

~~~js src/cart.js
// 1:10 readFile: import من تعديل قديم. اتشال (لو اتشغّل: ولا حاجة، بس تحميل على الفاضي)
export function total(items, discount = 0) {
  let sum = 0;
  for (const item of items) {
    // 6:18 كان == '0': بيعدّي 0 و '0' و false و [0]، فأصناف مش المقصودة كانت بتتشال
    if (item.qty === 0) continue;
    sum += item.price * item.qty;
  }
  // 9:9 const unused = 42: كود ميت. اتشال
  // 10:16 discunt: كان ReferenceError أول ما الدالة تتنادى، و discount (3:30) عمره ما اتطبّق
  return sum - discount;
}
~~~

| الخطأ | التصليح | ليه كده مش حاجة تانية |
|---|---|---|
| [[1:10]] [[readFile]] | مسحت السطر | مش مستخدم. لو كان هيتستخدم قريب، اكتبه وقتها |
| [[3:30]] و [[10:16]] | [[discunt]] بقت [[discount]] | الاتنين باج واحد: الحرف الناقص خلّى الـ argument «مش مستخدم» والاسم الغلط «مش متعرّف» |
| [[discount = 0]] | قيمة افتراضية | من غيرها [[total(items)]] بيرجّع [[NaN]] ([[sum - undefined]]) |
| [[6:18]] [[==]] | [[item.qty === 0]] | الكمية رقم، فقارن برقم. [[--fix]] مصلّحهاش لوحده لأن [[=== '0']] كانت هتغيّر السلوك |
| [[9:9]] [[unused]] | مسحته | كود ميت |

~~~bash
npx eslint .; echo "eslint exit=$?"
npx prettier --check .; echo "prettier exit=$?"
node -e "import('./src/cart.js').then(m => console.log(m.total([{ price: 10, qty: 2 }, { price: 99, qty: 0 }], 5), m.total([{ price: 10, qty: 2 }])))"
~~~

~~~text الناتج (ESLint 10.15.0 و Prettier 3.10.1)
eslint exit=0
Checking formatting...
All matched files use Prettier code style!
prettier exit=0
15 20
~~~

ESLint مطبعش ولا سطر (ده معنى «مفيش مشاكل»)، و [[15]] = ٢٠ − ٥ خصم والصنف اللي كميته صفر اتشال صح، و [[20]] من غير خصم بدل [[NaN]].

**الغلطة الشائعة:** تحط [[// eslint-disable-next-line no-undef]] فوق [[discunt]] عشان «الـ lint يعدّي». الـ lint هيعدّي والدالة هتوقع في الإنتاج. وغلطة تانية: تكتب [[item.qty === '0']] بنفس الشكل القديم: كده الكمية الرقم [[0]] **مبتتشالش** خالص.

**ومفاجأة ممكن تقابلك:** لو [[package.json]] اتعمل بسكربت أو بإيدك من غير سطر فاضي في الآخر، [[prettier --check]] بيعلّم عليه هو كمان (حصلت معايا لما كتبته بـ [[echo]]). [[npm init -y]] و [[npm pkg set]] في npm 11 بيكتبوه مظبوط فمبيتعلّمش.`},
            { lvl: 'تحدي', t: R`**ابني:** config لمشروع فيه [[src/]] (كود متصفح)، و [[scripts/]] (سكربتات Node)، و [[**/*.test.js]] (Vitest). كل جزء بالـ globals بتاعته بس، والاختبارات مسموح فيها [[console.log]] وفي [[src/]] لأ (قاعدة [[no-console]]).`, done: R`[[window]] في ملف تحت [[scripts/]] بيطلع [[no-undef]]، و [[process]] تحت [[src/]] بيطلع [[no-undef]]، و [[console.log]] في [[src/]] بيطلع [[no-console]] وفي [[x.test.js]] لأ، و [[npx eslint --print-config scripts/a.js]] بيأكد الـ globals.`, sol: R`**الفكرة:** عنصر لكل «بيئة» في الـ array، وكل عنصر بـ [[files]] بتاعته. ESLint بيجمّع لكل ملف كل العناصر اللي بتطابقه، واللي تحت بيكسب.

~~~js eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist/', 'coverage/']),
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    rules: { eqeqeq: ['error', 'always', { null: 'ignore' }] },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
    rules: { 'no-console': 'error' },
  },
  {
    files: ['scripts/**/*.js', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
    rules: { 'no-console': 'off' },
  },
  prettier,
]);
~~~

| العنصر | بيعمل إيه |
|---|---|
| [[**/*.js]] | القواعد الموصى بيها على كل حاجة، **من غير globals**. كده أي ملف مش في فولدر معروف مبيعرفش [[window]] ولا [[process]] |
| [[src/**/*.js]] | المتصفح بس ([[window]] و [[document]] و [[fetch]])، و [[console]] ممنوع |
| [[scripts/**/*.js]] و [[*.config.js]] | Node بس. والـ [[*.config.js]] عشان [[eslint.config.js]] و [[vitest.config.js]] نفسهم بيتشغّلوا في Node |
| [[**/*.test.js]] | Node و [[globals.vitest]] (فيه [[describe]] و [[it]] و [[expect]] و [[vi]] لو حد استخدمهم من غير import)، و [[no-console]] مقفولة |
| [[prettier]] | آخر حاجة، عشان يقفل قواعد الشكل |

**ليه [[src/x.test.js]] مسموح فيه [[console]]؟** هو بيطابق [[src/**/*.js]] (اللي بتقول [[error]]) **و** [[**/*.test.js]] (اللي بتقول [[off]])، والتاني تحت فبيكسب. لو بدّلت ترتيب العنصرين، الاختبارات هتطلع [[no-console]].

**ملفات التجربة** (كل واحد فيه غلطة عن قصد):

~~~js src/a.js
export const width = () => window.innerWidth;
export const env = () => process.env.NODE_ENV;
export const log = (x) => console.log(x);
~~~

~~~js scripts/a.js
export const env = () => process.env.NODE_ENV;
export const width = () => window.innerWidth;
~~~

~~~js src/x.test.js
import { it, expect } from 'vitest';
import { width } from './a.js';
it('width رقم', () => {
  globalThis.window = { innerWidth: 360 };
  console.log('width =', width());
  expect(width()).toBe(360);
});
~~~

~~~text الناتج: npx eslint . (ESLint 10.15.0)
C:\Users\you\lab\multi\scripts\a.js
  2:28  error  'window' is not defined  no-undef

C:\Users\you\lab\multi\src\a.js
  2:26  error  'process' is not defined      no-undef
  3:27  error  Unexpected console statement  no-console

✖ 3 problems (3 errors, 0 warnings)
~~~

الأربع شروط اتحققوا: [[window]] في [[scripts/]] غلط، و [[process]] في [[src/]] غلط، و [[console]] في [[src/]] غلط، و [[x.test.js]] مطلعش خالص.

**التأكيد بـ [[--print-config]]:** بيطبع الإعدادات النهائية لملف واحد كـ JSON. قريت منه الحتت المهمة بـ [[node -e]]:

~~~text الناتج
scripts/a.js  -> process: true  window: false  document: false  (81 اسم)  no-console: مش موجودة
src/x.test.js -> window: true  process: true  describe: true  no-console: [0,{}]
src/a.js      -> no-console: [2,{}]
~~~

[[0]] = [[off]] و [[2]] = [[error]] (ESLint بيخزّن المستوى رقم). و [[src/x.test.js]] فيه [[window]] و [[process]] مع بعض لأنه في [[src/]] وتست في نفس الوقت.

**الغلطة الشائعة:** تحط [[...globals.browser, ...globals.node]] في عنصر [[**/*.js]] زي مثال الدرس، وبعدين تزوّد عناصر الفولدرات. الـ [[globals]] بتتجمع ومبتتشالش. جرّبتها: نفس الملفات طلّعت [[✖ 1 problem]] بس ([[no-console]])، و [[process]] في [[src/]] و [[window]] في [[scripts/]] عدّوا الاتنين. ابدأ من غير globals وزوّد لكل فولدر اللي محتاجه بس.`},
          ],
          ref: [
            { t: "ESLint: Configuration Files (eslint.config.js)", url: "https://eslint.org/docs/latest/use/configure/configuration-files" },
            { t: "ESLint: Configure Language Options (globals)", url: "https://eslint.org/docs/latest/use/configure/language-options" },
            { t: "ESLint: Command Line Interface", url: "https://eslint.org/docs/latest/use/command-line-interface" },
            { t: "ESLint: Rules Reference", url: "https://eslint.org/docs/latest/rules/" },
            { t: "Prettier: CLI", url: "https://prettier.io/docs/cli" },
            { t: "Prettier: Options", url: "https://prettier.io/docs/options" },
            { t: "Prettier: Integrating with Linters", url: "https://prettier.io/docs/integrating-with-linters" },
            { t: "eslint-config-prettier", url: "https://github.com/prettier/eslint-config-prettier" },
          ],
          pre: [{ to: "js/== و ===", why: R`قاعدة [[eqeqeq]] بتمنع [[==]]، والدرس ده بيشرح ليه [[0 == '0']] بـ [[true]]` }],
          deep: {
            why: R`الباجات اللي ESLint بيمسكها هي اللي بتعدّي من العين: [[discunt]] حرف ناقص، و [[import]] نسيته من تعديل قديم، و [[==]] بيقول [[0 == '']] [[true]]. ومن غير Prettier، كل review بيتحوّل لنقاش «مسافتين ولا أربعة» وكل commit فيه سطور اتغيّرت شكل بس فالـ diff الحقيقي بيضيع. الاتنين مع بعض بيخلوا الكود «زي ما واحد كتبه» والـ review على المنطق بس.`,
            how: R`**ESLint:** بيقرا كل ملف ويحوّله لـ AST (شجرة: [[Program]] جواها [[FunctionDeclaration]] جواها [[IfStatement]]...). كل قاعدة بتقول «نادي عليا لما تقابل [[BinaryExpression]]»، و [[eqeqeq]] بتشوف لو الـ operator [[==]]. و [[no-undef]] بيبني جدول scope: كل اسم اتعرّف فين، وأي اسم مستخدم ومش في أي scope ولا في [[globals]] = error. و [[--fix]] بيطبّق التعديلات اللي القاعدة متأكدة إنها مش هتغيّر سلوك الكود بس: [[typeof s == 'string']] اتصلحت لـ [[===]] (آمنة لأن [[typeof]] بيرجّع نص دايمًا)، و [[item.qty == '0']] **متصلحتش** لأن [[===]] هنا هيغيّر النتيجة لو [[qty]] رقم.

**الـ flat config:** ESLint بيمشي على الـ array من فوق لتحت، ولكل ملف بيجمّع العناصر اللي [[files]] بتاعتها بتطابقه، واللي بعد بيكتب على اللي قبل. [[npx eslint --print-config file.js]] بيطبع النتيجة النهائية لملف معيّن: هنا قال ٤٢٣ قاعدة بعد الدمج (أغلبها [[0]] من [[eslint-config-prettier]]).

**Prettier:** بيحوّل لـ AST ويرمي الشكل الأصلي **كله**، وبعدين يطبع من جديد بقواعده ([[printWidth]] ٨٠، إلخ). عشان كده نفس الكود بأي شكل بيطلع نفس الناتج، ومفيش «اختيار» غير الخيارات القليلة في [[.prettierrc.json]].`,
            when: R`في أي مشروع JS أو TS هيتشال أكتر من أسبوع أو هيشتغل فيه أكتر من واحد: من أول يوم، لأن إضافتهم بعدين بتطلّع مئات الأخطاء مرة واحدة. شغّلهم في VS Code (extension ESLint و Prettier و «Format on Save») عشان تشوف الغلط وانت بتكتب، وفي [[npm run lint]] للـ CI، وفي git hook قبل الـ commit (درس «lint-staged» في تاب «فحص الكود»). وللمشاريع اللي محتاجة سرعة أو أداة واحدة: Biome بيعمل الاتنين (درس «Biome ولا ESLint» في تاب «فحص الكود»).`,
            mistakes: R`تحط [[eslint-config-prettier]] في الأول فمبيقفلش حاجة. أو تنسى [[globals]] فـ [[console]] يطلع [[no-undef]]. أو تحط [[.eslintrc.json]] من tutorial قديم وتستغرب إنه بيتجاهل (ESLint 10 مبيقراهوش). أو تنسى [[globalIgnores(['dist/'])]] فيفحص الكود المتبني. أو تحل الأخطاء بـ [[// eslint-disable-next-line]] بدل ما تصلّحها (استخدمه بس مع سبب جنبه). أو تشغّل [[--fix]] على مشروع قديم كله في commit واحد مع تعديلات تانية فالـ review يبقى مستحيل: خلّي commit الشكل لوحده. أو تفتكر إن [[eslint --fix]] بيصلّح كل حاجة: [[eqeqeq]] صلّح [[typeof]] بس.`,
          },
          teach: R`## أداتين، شغلتين مختلفتين

ESLint بيقول «ده **باج** أو ممارسة غلط»، و Prettier بيقول «ده **شكله** كده». كل اللي تحت اتشغّل على ويندوز ١١ في مشروع تجربة: Node 24.22، و ESLint 10.13.0، و Prettier 3.9.10، و eslint-config-prettier 10.1.8، و globals 17.13، و @eslint/js 10.0.1. والمسار في الناتج اتغيّر لـ [[C:\Users\you\lab\lint]].

---

## ١. التسطيب

~~~bash
npm init -y
npm pkg set type=module
npm i -D eslint @eslint/js globals prettier eslint-config-prettier
~~~

| الباكدج | ليه |
|---|---|
| [[eslint]] | البرنامج نفسه وأمر [[npx eslint]] |
| [[@eslint/js]] | القواعد الموصى بيها [[js.configs.recommended]] |
| [[globals]] | أسماء متغيرات المتصفح و Node، عشان [[no-undef]] ميزعّقش على [[console]] |
| [[prettier]] | البرنامج اللي بيظبط الشكل |
| [[eslint-config-prettier]] | بيقفل قواعد الشكل في ESLint عشان ميتخانقش مع Prettier |

- [[-D]] = devDependencies: أدوات تطوير مش بتتشحن مع الكود للإنتاج.
- [[npm pkg set type=module]] بيخلي ملفات [[.js]] ESM، فـ [[import]] شغّال في [[eslint.config.js]].
- كلهم **local** في المشروع، و [[npx]] بيشغّل النسخة اللي في [[node_modules/.bin]]. متسطّبش ESLint global: كل مشروع ليه نسخته.

وفيه [[npm init @eslint/config@latest]] بيسألك أسئلة ويعمل الـ config (من الـ docs، متجرّبش هنا لأنه تفاعلي).

---

## ٢. ملف فيه ٥ باجات

~~~js src/cart.js
import { readFile } from 'node:fs/promises'

export function total(items, discount) {
  let sum = 0
  for (const item of items) {
    if (item.qty == '0') continue
    sum += item.price * item.qty
  }
  const unused = 42
  return sum - discunt
}
~~~

~~~text الناتج: npx eslint .
C:\Users\you\lab\lint\src\cart.js
   1:10  error  'readFile' is defined but never used                                        no-unused-vars
   3:30  error  'discount' is defined but never used. Allowed unused args must match /^_/u  no-unused-vars
   6:18  error  Expected '===' and instead saw '=='                                         eqeqeq
   9:9   error  'unused' is assigned a value but never used                                 no-unused-vars
  10:16  error  'discunt' is not defined                                                    no-undef

✖ 5 problems (5 errors, 0 warnings)
~~~

### اقرا السطر الواحد

~~~text
  10:16  error  'discunt' is not defined   no-undef
  ↑  ↑   ↑      ↑                           ↑
سطر عمود نوعه   الرسالة                     اسم القاعدة
~~~

- **[[10:16]]**: السطر ١٠، الحرف ١٦. في VS Code اعمل Ctrl+كليك على المسار أو اكتب [[Ctrl+G]] و [[10:16]].
- **[[error]] ولا [[warning]]**: الـ error بيخلي كود الخروج [[1]] (الـ CI يقع)، والـ warning لأ (إلا مع [[--max-warnings 0]]).
- **اسم القاعدة**: دوّر عليه في [[eslint.org/docs/latest/rules/<الاسم>]] هتلاقي ليه موجودة وأمثلة صح وغلط وكل الخيارات. ده أسرع من أي بحث.

### الخمسة دول باجات حقيقية؟

| السطر | المشكلة | لو اتشغّل |
|---|---|---|
| [[1:10]] [[readFile]] | import من تعديل قديم ومحدش شاله | ولا حاجة، بس الملف بيحمّل حاجة على الفاضي وبيلخبط اللي بيقرا |
| [[3:30]] [[discount]] | الـ argument اتكتب غلط تحت | الخصم عمره ما هيتطبق |
| [[6:18]] [[==]] | [[0 == '0']] و [[false == '0']] و [[ [0] == '0' ]] كلهم [[true]] | أصناف مش المقصودة هتتشال من الحساب |
| [[9:9]] [[unused]] | كود ميت | ولا حاجة، بس دايمًا علامة إن حاجة اتنست |
| [[10:16]] [[discunt]] | حرف ناقص | [[ReferenceError: discunt is not defined]] أول ما الدالة تتنادى |

الأخير كان هيوقّع البرنامج في الإنتاج، و ESLint مسكه من غير ما يشغّل سطر.

---

## ٣. [[--fix]]: بيصلّح الآمن بس

~~~js src/fixme.js
let greeting = "hi"
export const shout = (s) => { if (typeof s == "string") return s.toUpperCase() + greeting; return s == null ? '' : s }
~~~

~~~text الناتج: npx eslint src/fixme.js
  1:5   warning  'greeting' is never reassigned. Use 'const' instead  prefer-const
  2:44  error    Expected '===' and instead saw '=='                  eqeqeq

✖ 2 problems (1 error, 1 warning)
  1 error and 1 warning potentially fixable with the $__bt--fix$__bt option.
~~~

[[s == null]] مطلعش لأن [[null: 'ignore']]. وبعد [[npx eslint src/fixme.js --fix]] (خرج بـ [[0]] ومطبعش حاجة):

~~~text الملف بعد --fix
const greeting = "hi"
export const shout = (s) => { if (typeof s === "string") return s.toUpperCase() + greeting; return s == null ? '' : s }
~~~

**ليه صلّح ده ومصلّحش [[item.qty == '0']] في [[cart.js]]؟** [[typeof]] بيرجّع نص دايمًا، فـ [[==]] و [[===]] نفس النتيجة: التصليح آمن. لكن [[item.qty == '0']] لو [[qty]] رقم [[0]]، [[===]] هيرجّع [[false]] والسلوك هيتغيّر. فالقرار ليك: [[item.qty === 0]] لو الكمية رقم. ESLint مبيغيّرش معنى كودك من وراك.

---

## ٤. [[no-undef]] و [[globals]]

ملف بيستخدم [[console]] و [[window]] و [[process]]. لما شلت [[globals]] من الـ config:

~~~text الناتج
  2:3   error  'console' is not defined  no-undef
  2:15  error  'window' is not defined   no-undef
  2:37  error  'process' is not defined  no-undef
~~~

ESLint مبيعرفش انت شغّال فين. [[globals.browser]] بيعرّفه [[window]] و [[document]] و [[fetch]]، و [[globals.node]] بيعرّفه [[process]] و [[Buffer]]. ولما رجّعتهم: [[0]] أخطاء. والسطر [[// eslint-disable-next-line no-unused-vars]] اللي كان فوق [[const keep = 1]] قفل القاعدة للسطر اللي بعده بس.

---

## ٥. Prettier: [[--check]] و [[--write]]

~~~json .prettierrc.json
{ "singleQuote": true, "semi": true, "printWidth": 80 }
~~~

~~~text .prettierignore
node_modules
coverage
dist
~~~

~~~text الناتج: npx prettier --check .
Checking formatting...
[warn] eslint.config.js
[warn] package.json
[warn] src/cart.js
[warn] src/fixme.js
[warn] Code style issues found in 4 files. Run Prettier with --write to fix.
~~~

كود الخروج [[1]]، و [[--check]] **مبيغيّرش** حاجة: ده اللي تحطه في الـ CI. و [[--write]] بيكتب:

~~~text src/fixme.js بعد npx prettier --write src/fixme.js
const greeting = 'hi';
export const shout = (s) => {
  if (typeof s === 'string') return s.toUpperCase() + greeting;
  return s == null ? '' : s;
};
~~~

السطر الطويل اتقسم (أطول من ٨٠)، وعلامات التنصيص بقت single ([[singleQuote]])، و [[;]] اتحطت ([[semi]]).

**مفاجأة صغيرة:** [[package.json]] اتعلّم عليه. السبب: السكربت اللي كتبه ماحطش سطر فاضي في آخر الملف، و [[diff]] بعد [[--write]] وراني الفرق ده بس ([[\ No newline at end of file]]). Prettier بيظبط أي JSON و CSS و Markdown و YAML كمان، مش JS بس.

---

## ٦. الخناقة، وإزاي [[eslint-config-prettier]] بيمنعها

شلت [[prettier]] من آخر الـ config وزوّدت [[quotes: ['error', 'double']]]:

~~~text الناتج: ورا بعض
1) eslint:                       3 أخطاء quotes
2) بعد eslint --fix:             const greeting = "hi";
3) prettier --check:             [warn] src/fixme.js  Code style issues found
4) بعد prettier --write:         const greeting = 'hi';
5) eslint تاني:                  ✖ 3 problems (3 errors, 0 warnings)
~~~

كل أداة بتصلّح اللي التانية عملته، للأبد. ولما رجّعت [[prettier]] آخر الـ array:

~~~text الناتج
6) with eslint-config-prettier:
Checking formatting...
All matched files use Prettier code style!
~~~

و [[npx eslint --print-config src/fixme.js]] قال [[quotes = [0,"double"] ]] و [[semi = [0] ]]: الـ [[0]] = مقفولة. **ملحوظة:** في ESLint 10 قواعد الشكل زي [[quotes]] deprecated ومش في الـ recommended أصلًا، فالخناقة بتحصل لما انت أو plugin (زي [[@stylistic]] أو configs قديمة) يفعّلوها. [[eslint-config-prettier]] بيقفلهم كلهم في الحالتين.

---

## ٧. سكربتات [[package.json]] والـ CI

~~~json package.json (جزء)
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
~~~

~~~text الناتج: npx eslint . --max-warnings 0 && npx prettier --check .
Checking formatting...
All matched files use Prettier code style!
~~~

- [[&&]]: التاني بيشتغل بس لو الأول خرج بـ [[0]].
- [[--max-warnings 0]]: warning واحد = فشل. اتجرّب على ملف فيه [[let]] بس: من غيره خرج [[0]]، ومعاه [[1]] و «ESLint found too many warnings (maximum: 0)».
- [[--cache]]: بيحفظ النتيجة في [[.eslintcache]] ويفحص المتغيّر بس في المرة الجاية (حطه في [[.gitignore]]).

| الأمر | بيعمل إيه | كود الخروج |
|---|---|---|
| [[eslint .]] | يفحص ويطبع | [[1]] لو فيه error، [[2]] لو الـ config نفسه بايظ |
| [[eslint . --fix]] | يصلّح الآمن ويطبع الباقي | [[1]] لو فضل error |
| [[prettier --check .]] | يقول مين شكله غلط من غير ما يغيّر | [[1]] لو فيه ملف |
| [[prettier --write .]] | يظبط كل الملفات | [[0]] عادةً |

---

## الخلاصة

- ESLint = باجات (AST وقواعد)، و Prettier = شكل (بيعيد الطباعة). [[eslint-config-prettier]] **آخر** حاجة في الـ config.
- ESLint 10: [[eslint.config.js]] بس، و [[defineConfig]] و [[extends]] و [[globalIgnores]] و [[globals]].
- اقرا السطر: [[سطر:عمود]] والنوع والرسالة واسم القاعدة، واسم القاعدة هو مفتاح الـ docs.
- [[--fix]] بيصلّح اللي مش هيغيّر السلوك بس، والباقي ليك.
- في الـ CI: [[eslint . --max-warnings 0 && prettier --check .]].`,
          sol: R`اتجرّب على ESLint 10.13 و Prettier 3.9:

- [[npx eslint .]] على [[cart.js]] طلّع الـ ٥ أخطاء اللي في الشرح بالظبط، و [[--fix]] مصلّحش ولا واحد منهم: تلاتة [[no-unused-vars]] و [[no-undef]] مالهمش تصليح آلي (ESLint ميعرفش انت عايز تمسح ولا تستخدم)، و [[eqeqeq]] مع [[== '0']] مش آمن يتصلح.
- من غير [[eslint-config-prettier]] ومع [[quotes: double]]: [[eslint --fix]] حوّل لـ double، و [[prettier --write]] رجّع single، و [[eslint]] تاني طلّع [[3 errors]]. ورجوع [[prettier]] لآخر الـ array قفل الخناقة.

بعد التصليح بإيدك:`,
          solCode: R`export function total(items, discount = 0) {
  let sum = 0;
  for (const item of items) {
    if (item.qty === 0) continue;
    sum += item.price * item.qty;
  }
  return sum - discount;
}
// npx eslint . ← مفيش ناتج وكود الخروج 0
// npx prettier --check . ← All matched files use Prettier code style!`,
        },
        {
          cmd: "اختبار JS بـ Vitest",
          title: "describe و it و expect، و toBe ولا toEqual، و vi.fn، والـ coverage",
          learn: R`تكتب اختبارات Vitest لدوال عادية و async، وتختار بين [[toBe]] و [[toEqual]] و [[toStrictEqual]]، وتختبر error متوقّع، وتحط [[vi.fn()]] مكان الدفع أو الشبكة، وتقرا تقرير الـ coverage.`,
          out: R`ملف اختبارات بيقولك في ٢٠٠ms إن تعديلك مكسرش حاجة، وبيشتغل مع كل حفظ.`,
          use: {
            prog: R`الاختبار هو اللي بيخليك تعدّل كود قديم من غير خوف: غيّر، والـ watch mode بيقولك في ثانية لو حاجة وقعت ومين بالظبط. ومن غيره كل تعديل محتاج تجرّب الصفحة بإيدك.`,
            work: R`أي PR في شركة بيتسأل «فين الاختبار؟»، و Vitest هو المعتاد دلوقتي في مشاريع Vite و Vue و React الجديدة (وشكله نفس Jest تقريبًا، فاللي بيعرف واحد بيعرف التاني).`,
            cs: R`الـ unit test بيعزل دالة واحدة. والـ test double ([[vi.fn()]]) بيقف مكان أي حاجة خارجية عشان الاختبار يبقى سريع ويطلع نفس النتيجة كل مرة. والـ coverage بيقيس الكود اللي اتنفّذ، مش اللي اتأكّد إنه صح.`,
          },
          desc: R`Vitest بيدوّر على أي ملف اسمه [[*.test.js]] أو [[*.spec.js]] ويشغّله. جوه الملف:

- [[describe('اسم', () => {...})]]: مجموعة اختبارات (اختياري، للتنظيم في الناتج).
- [[it('بيعمل كذا', () => {...})]] (أو [[test]]، نفس الحاجة): اختبار واحد.
- [[expect(قيمة).matcher(متوقّع)]]: التأكيد. لو مطابقش، الاختبار بيقع برسالة فيها الاتنين.

**أهم فرق:** [[toBe]] بيقارن بـ [[Object.is]] (نفس الحاجة بالظبط، ينفع للأرقام والنصوص). [[toEqual]] بيقارن **المحتوى** (للـ objects والـ arrays). جرّبتها: [[expect({ a: 1 }).toBe({ a: 1 })]] وقع وقال «If it should pass with deep equality, replace "toBe" with "toStrictEqual"». و [[toStrictEqual]] أدق من [[toEqual]]: [[{ a: 1, b: undefined }]] بيساوي [[{ a: 1 }]] في [[toEqual]] وبيقع في [[toStrictEqual]].

**الأخطاء:** [[expect(() => fn()).toThrow(...)]] لازم **دالة**، مش [[expect(fn())]]. **async:** [[await expect(promise).resolves/rejects...]]، ولو نسيت [[await]] Vitest 5 بيقع ويقولك (اتجرّب). **[[vi.fn()]]:** دالة مزيّفة بتسجّل اتنادت كام مرة وبإيه، و [[mockResolvedValue]] تخليها ترجّع Promise.

**الأوامر:** [[npx vitest]] = watch mode (بيعيد مع كل حفظ)، و [[npx vitest run]] = مرة واحدة (للـ CI)، و [[--coverage]] = تقرير الكود اللي اتنفّذ.

و Node نفسه فيه [[node --test]] من غير ولا باكدج (درس «node --test» في تاب Node، واتستخدم في درس «مشروع — اختبرها من غير شبكة»). Vitest بيزوّد عليه watch أذكى، و mocks أسهل، ورسايل فشل فيها diff، و coverage بأمر واحد، وشغل مباشر مع Vite و TS.`,
          example: R`// src/cart.test.js (والكود اللي بيتختبر في src/cart.js، في الشرح)
import { describe, it, expect, vi } from 'vitest';
import { total, addItem, checkout } from './cart.js';
describe('total', () => {
  it('بيجمع السعر في الكمية', () => {
    expect(total([{ price: 50, qty: 2 }, { price: 10, qty: 1 }])).toBe(110);
  });
  it('الخصم مبيخليش الإجمالي سالب', () => {
    expect(total([{ price: 5, qty: 1 }], 20)).toBe(0);
  });
  it('بيرمي لو items مش array', () => {
    expect(() => total('x')).toThrow(TypeError);
    expect(() => total(null)).toThrow('لازم array');
  });
});
it('addItem بترجّع سلة جديدة', () => {
  const cart = { items: [] };
  const next = addItem(cart, { price: 1, qty: 1 });
  expect(next).toEqual({ items: [{ price: 1, qty: 1 }] });
  expect(next).not.toBe(cart);
});
describe('checkout', () => {
  it('بيدفع المبلغ الصح مرة واحدة', async () => {
    const pay = vi.fn().mockResolvedValue({ id: 'r-1' });
    const result = await checkout({ items: [{ price: 30, qty: 2 }] }, pay);
    expect(result).toEqual({ ok: true, id: 'r-1' });
    expect(pay).toHaveBeenCalledTimes(1);
    expect(pay).toHaveBeenCalledWith(60);
  });
  it('لو الدفع وقع، الخطأ بيطلع', async () => {
    const pay = vi.fn().mockRejectedValue(new Error('card declined'));
    await expect(checkout({ items: [{ price: 1, qty: 1 }] }, pay)).rejects.toThrow('card declined');
  });
});`,
          lines: [
            R`بنستورد من [[vitest]] بالاسم. Vitest مبيحطش [[describe]] و [[it]] global من غير ما تطلب ([[globals: true]] في الـ config)، والـ import أوضح: ESLint مش هيقول [[no-undef]]، و VS Code بيعرف الأنواع.`,
            R`الدوال اللي هنختبرها. الاختبار بيستورد الكود الحقيقي زي أي ملف تاني، فلازم الدوال تكون [[export]]. وده بيدفعك تفصل المنطق عن الـ DOM: دالة [[total]] متقدرش تتختبر بسهولة لو بتقرا من [[document]].`,
            R`[[describe]] بيجمع اختبارات [[total]] تحت اسم واحد. في الناتج بتظهر [[total > بيجمع السعر في الكمية]]، فلما حاجة تقع تعرف هي في أنهي دالة من غير ما تفتح الملف.`,
            R`أول اختبار: الحالة العادية. الاسم جملة بتوصف السلوك، مش [[test1]]، لأنه هو اللي هيظهر لما يقع.`,
            R`٥٠×٢ + ١٠×١ = ١١٠. [[toBe]] كفاية لأن النتيجة رقم، و [[110 === 110]]. والأرقام المتوقّعة مكتوبة بإيدك مش محسوبة بنفس الكود، وإلا الاختبار هيكرر نفس الغلطة.`,
            R`نهاية أول [[it]].`,
            R`حالة طرفية: خصم أكبر من الإجمالي. ده بالظبط نوع الاختبار اللي بيمسك الباجات، لأن محدش بيجرّبه بإيده.`,
            R`٥ − ٢٠ = −١٥، بس الدالة فيها [[Math.max(0, ...)]] فالمتوقّع [[0]]. ولما شلت [[Math.max]] عن قصد في الـ watch mode، الاختبار ده وقع وقال [[expected -15 to be +0]].`,
            R`نهاية تاني [[it]].`,
            R`تالت حالة: إدخال غلط. الدالة المفروض ترمي بدل ما ترجّع رقم غلط.`,
            R`[[expect(() => total('x'))]]: **دالة** بتنادي [[total]]، مش [[total('x')]] نفسها. لو كتبت [[expect(total('x'))]] الـ error هيترمي قبل ما [[expect]] تشتغل والاختبار يقع بالـ error نفسه (اتجرّب). و [[toThrow(TypeError)]] بيتأكد من **النوع**.`,
            R`[[toThrow('لازم array')]] بنص: بيتأكد إن الرسالة **فيها** النص ده (مش لازم الرسالة كلها). و [[toThrow(/regex/)]] كمان ينفع. اختبار الرسالة مهم لو اليوزر هيشوفها.`,
            R`نهاية تالت [[it]].`,
            R`نهاية [[describe('total')]].`,
            R`[[it]] برا أي [[describe]] عادي جدًا. [[describe]] للتنظيم بس، ومش شرط.`,
            R`سلة فاضية. بنحفظها في متغير عشان نقارن بيها بعدين.`,
            R`[[addItem]] المفروض **immutable**: ترجّع object جديد ومتلمسش القديم (درس «immutability»).`,
            R`[[toEqual]] بيقارن المحتوى بالعمق: object جواه array جواه object. [[toBe]] هنا كان هيقع حتى لو المحتوى مطابق، لأنهم objects مختلفين في الذاكرة.`,
            R`[[not.toBe(cart)]]: [[.not]] بيعكس أي matcher. هنا بنتأكد إن [[next]] **مش** نفس الـ object، يعني الدالة مرجّعتش [[cart]] بعد ما عدّلته. ده الاختبار اللي بيمسك [[cart.items.push(item); return cart;]].`,
            R`نهاية الـ [[it]].`,
            R`مجموعة [[checkout]]: دالة async بتنادي دالة دفع من برا (في الحقيقة API بنك).`,
            R`[[async]] قبل الدالة عشان نقدر [[await]] جواها. Vitest بيستنى الـ Promise اللي الاختبار بيرجّعها قبل ما يقرر نجح ولا لأ.`,
            R`[[vi.fn()]] دالة مزيّفة بتسجّل كل نداء، و [[mockResolvedValue(x)]] بتخليها ترجّع [[Promise.resolve(x)]]. كده مفيش بنك حقيقي ولا شبكة، والاختبار بيخلص في ١ms وبيطلع نفس النتيجة كل مرة.`,
            R`بنمرر الـ mock مكان دالة الدفع الحقيقية. ده سبب إن [[checkout]] بتاخد [[pay]] كـ argument بدل ما تستورده: dependency injection بيخلي الكود قابل للاختبار من غير [[vi.mock]].`,
            R`النتيجة object، فـ [[toEqual]].`,
            R`[[toHaveBeenCalledTimes(1)]]: اتنادى مرة واحدة بالظبط. ده بيمسك باج «الدفع اتعمل مرتين» اللي محدش بيلاحظه غير لما اليوزر يشتكي.`,
            R`[[toHaveBeenCalledWith(60)]]: اتنادى بالمبلغ ده (٣٠×٢). وكل النداءات محفوظة في [[pay.mock.calls]]: بعد [[pay(60)]] و [[pay(15)]] كانت [[ [ [60], [15] ] ]] (اتجرّب).`,
            R`نهاية الـ [[it]].`,
            R`حالة الفشل: البنك رفض. أي كود async لازم يتختبر في الحالتين.`,
            R`[[mockRejectedValue]] بتخلي الـ mock يرجّع Promise بترفض بالـ error ده، زي ما البنك يرد بـ «card declined».`,
            R`[[await expect(promise).rejects.toThrow(...)]]: بيستنى الـ Promise ويتأكد إنها رفضت بالرسالة دي. الـ [[await]] **لازم**: من غيرها Vitest 5 بيقع ويقول «Promise returned by expect(actual).rejects.toThrow() was not awaited» (اتجرّب). و [[checkout]] نفسها لازم متبلعش الـ error.`,
            R`نهاية الـ [[it]].`,
            R`نهاية [[describe('checkout')]].`,
          ],
          try: R`اعمل المشروع من «المعمل» وحط [[src/cart.js]] و [[src/cart.test.js]] وشغّل [[npx vitest run --reporter=verbose]]. بعدين [[npx vitest]] (watch)، وفي ملف [[cart.js]] شيل [[Math.max(0, ...)]] واحفظ وشوف أنهي اختبار وقع ورسالته. وبعدها [[npx vitest run --coverage]] واقرا [[Uncovered Line #s]]: أنهي سطور مااتختبرتش، وأنهي فرع ناقص حتى لو سطره «covered».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، قول مين هيعدّي ومين هيقع: [[expect({ a: 1 }).toBe({ a: 1 })]]، و [[expect({ a: 1, b: undefined }).toEqual({ a: 1 })]]، و [[expect({ a: 1, b: undefined }).toStrictEqual({ a: 1 })]]، و [[expect(0.1 + 0.2).toBe(0.3)]]، و [[expect(0.1 + 0.2).toBeCloseTo(0.3)]]. وبعدين شغّلهم.`, done: R`توقّعك: الأول يقع، والتاني يعدّي، والتالت يقع، والرابع يقع ([[0.30000000000000004]])، والخامس يعدّي. وعارف تقول لكل واحد السبب في جملة.`, sol: R`**التوقّع قبل التشغيل:**

| # | السطر | يعدّي؟ | ليه |
|---|---|---|---|
| ١ | [[expect({ a: 1 }).toBe({ a: 1 })]] | لأ | [[toBe]] = [[Object.is]]: object اتعمل مرتين = اتنين مختلفين في الذاكرة |
| ٢ | [[toEqual]] مع [[b: undefined]] | أيوه | [[toEqual]] بيتجاهل الخصايص اللي قيمتها [[undefined]] |
| ٣ | [[toStrictEqual]] مع [[b: undefined]] | لأ | [[toStrictEqual]] بيفرّق بين «مش موجود» و «موجود وقيمته [[undefined]]» |
| ٤ | [[expect(0.1 + 0.2).toBe(0.3)]] | لأ | [[0.1 + 0.2]] = [[0.30000000000000004]] في floating point |
| ٥ | [[toBeCloseTo(0.3)]] | أيوه | بيقارن لحد رقمين بعد العلامة افتراضيًا |

**الملف** (كل سطر في اختبار لوحده عشان واحد يقع ميوقّفش الباقي):

~~~js src/predict.test.js
import { it, expect } from 'vitest';

it('1) toBe على object', () => {
  expect({ a: 1 }).toBe({ a: 1 });
});
it('2) toEqual و b: undefined', () => {
  expect({ a: 1, b: undefined }).toEqual({ a: 1 });
});
it('3) toStrictEqual و b: undefined', () => {
  expect({ a: 1, b: undefined }).toStrictEqual({ a: 1 });
});
it('4) 0.1 + 0.2 بـ toBe', () => {
  expect(0.1 + 0.2).toBe(0.3);
});
it('5) 0.1 + 0.2 بـ toBeCloseTo', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
~~~

~~~text الناتج: npx vitest run --reporter=verbose (Vitest 5.1.1، الجزء الأول)
 RUN  v5.1.1 C:/Users/you/lab/vt

 × src/predict.test.js > 1) toBe على object 6ms
   → expected { a: 1 } to be { a: 1 } // Object.is equality

If it should pass with deep equality, replace "toBe" with "toStrictEqual"

Expected: { a: 1 }
Received: serializes to the same string

 ✓ src/predict.test.js > 2) toEqual و b: undefined 0ms
 × src/predict.test.js > 3) toStrictEqual و b: undefined 2ms
   → expected { a: 1, b: undefined } to strictly equal { a: 1 }
 × src/predict.test.js > 4) 0.1 + 0.2 بـ toBe 1ms
   → expected 0.30000000000000004 to be 0.3 // Object.is equality
 ✓ src/predict.test.js > 5) 0.1 + 0.2 بـ toBeCloseTo 0ms
~~~

~~~text الناتج (آخره)
 Test Files  1 failed (1)
      Tests  3 failed | 2 passed (5)
~~~

وبين الجزئين Vitest بيطبع لكل اختبار وقع تفاصيله: diff بـ [[-]] و [[+]] وسهم تحت مكان الـ [[expect]] بالظبط. في التالت الـ diff بيوري [[+   "b": undefined,]]: ده السطر الوحيد اللي فرق.

**اقرا النصيحة اللي في الأول:** في الأول Vitest قال «replace "toBe" with "toStrictEqual"»، مش [[toEqual]]. لأن [[toStrictEqual]] هو اللي بيعدّي في الحالة دي بالظبط ومش هيخبّي فرق [[undefined]].

**الغلطة الشائعة:** تفتكر إن «serializes to the same string» معناها إن الاختبار المفروض يعدّي. معناها العكس: الشكل واحد بس مش **نفس** الـ object، و [[toBe]] بيسأل عن نفس الـ object.`},
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** الـ coverage بيقول ٧٢٪ lines و ٤٤٪ branches. اكتب اختبارات لـ [[applyCoupon]] بـ [[it.each]] (كود صح، وصغير [[save10]]، وفاضي، و [[undefined]])، ولحالة السلة الفاضية في [[checkout]] اللي بترجّع [[{ ok: false }]] ومبتنادي [[pay]]، لحد ما توصل ١٠٠٪.`, done: R`[[npx vitest run --coverage]] بيطبع [[Statements : 100%]] و [[Branches : 100%]] و [[Functions : 100%]] و [[Lines : 100%]]، وفيه [[expect(pay).not.toHaveBeenCalled()]] في اختبار السلة الفاضية.`, sol: R`**ابدأ من التقرير:** [[Uncovered Line #s]] قال [[19-21]] (جسم [[applyCoupon]]: محدش ناداها). والـ Branches ٤٤٪ بتقول إن فيه فروع تانية ناقصة سطورها «covered»: [[if (amount === 0)]] في [[checkout]] اتنفّذ بس عمره ما كان [[true]].

~~~text الناتج قبل: npx vitest run --coverage (Vitest 5.1.1 و @vitest/coverage-v8 5.1.1)
 Test Files  1 passed (1)
      Tests  6 passed (6)

 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |    62.5 |    44.44 |      80 |   72.72 |
 cart.js  |    62.5 |    44.44 |      80 |   72.72 | 19-21
----------|---------|----------|---------|---------|-------------------
Statements   : 62.5% ( 10/16 )
Branches     : 44.44% ( 4/9 )
Functions    : 80% ( 4/5 )
Lines        : 72.72% ( 8/11 )
ERROR: Coverage for lines (72.72%) does not meet global threshold (90%)
ERROR: Coverage for branches (44.44%) does not meet global threshold (80%)
~~~

**الاختبارات اللي ناقصة** في ملف جديد جنب [[cart.test.js]] (نفس [[cart.js]] و [[vitest.config.js]] اللي في الشرح):

~~~js src/more.test.js
import { describe, it, expect, vi } from 'vitest';
import { applyCoupon, checkout } from './cart.js';

describe('applyCoupon', () => {
  it.each([
    ['SAVE10', 10],
    ['HALF', 50],
    ['save10', 0],
    ['', 0],
    [undefined, 0],
  ])('%s ← %i', (code, expected) => {
    expect(applyCoupon(code)).toBe(expected);
  });
});

it('السلة الفاضية متدفعش', async () => {
  const pay = vi.fn();
  await expect(checkout({ items: [] }, pay)).resolves.toEqual({ ok: false, reason: 'empty' });
  expect(pay).not.toHaveBeenCalled();
});
~~~

- [[it.each]] بياخد جدول، وكل صف بيبقى اختبار لوحده باسمه: [[%s]] بيتبدل بالكود و [[%i]] بالرقم. الصفوف بتغطي الـ ٣ فروع في [[applyCoupon]]: [[SAVE10]] و [[HALF]] والباقي.
- [[save10]] الصغير و [['']] و [[undefined]] حالات طرفية: المقارنة بـ [[===]] حساسة للحروف الكبيرة، والكود الفاضي أو الناقص لازم يرجّع [[0]] مش يرمي.
- اختبار السلة الفاضية بيغطي الفرع اللي كان ناقص في [[checkout]]. و [[resolves.toEqual]] بيستنى الـ Promise، و [[not.toHaveBeenCalled()]] بيتأكد إن البنك متناداش خالص.

~~~text الناتج بعد: npx vitest run --coverage --reporter=verbose
 ✓ src/more.test.js > applyCoupon > SAVE10 ← 10 2ms
 ✓ src/more.test.js > applyCoupon > HALF ← 50 0ms
 ✓ src/more.test.js > applyCoupon > save10 ← 0 0ms
 ✓ src/more.test.js > applyCoupon >  ← 0 0ms
 ✓ src/more.test.js > applyCoupon > undefined ← 0 0ms
 ✓ src/more.test.js > السلة الفاضية متدفعش 2ms

 Test Files  2 passed (2)
      Tests  12 passed (12)

 % Coverage report from v8
No files with missing coverage.
1 file fully covered.

=============================== Coverage summary ===============================
Statements   : 100% ( 16/16 )
Branches     : 100% ( 9/9 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 11/11 )
================================================================================
~~~

(والستة اللي في [[cart.test.js]] اتطبعوا فوقهم بـ ✓.) كود الخروج [[0]]، والـ [[ERROR]] اختفت.

**افتح [[coverage/index.html]]** قبل وبعد: الفروع اللي مااتجرّبتش عليها علامة صفرا جنب السطر، ودي أسرع طريقة تعرف الـ ٤٤٪ دول جايين منين بدل ما تعدّهم بإيدك.

**الغلطة الشائعة:** تكتب [[it('applyCoupon', () => { applyCoupon('SAVE10'); applyCoupon('x'); })]] من غير [[expect]]. الـ coverage هيطلع ١٠٠٪ والاختبار مش بيتأكد من حاجة: لو [[applyCoupon]] رجّعت [[99]] هيعدّي برضه. الـ coverage بيقول «الكود ده اتنفّذ»، و [[expect]] هو اللي بيقول «وطلع صح».`},
            { lvl: 'تحدي', t: R`**صلّح الاختبار البايظ:** الاختبار ده بيقول «passed» رغم إن التأكيد غلط: [[checkout(cart, pay).then((r) => { expect(r.ok).toBe(false); });]] من غير [[await]] ولا [[return]]. شغّله واقرا الناتج كله، وبعدين حط [[setTimeout]] ١٠٠ms جوه الـ mock وشوف هيقول إيه، وصلّحه.`, done: R`شفت إن الناتج قال [[Tests 1 passed]] و [[Errors 1 error]] مع «Unhandled Rejection» وكود خروج [[1]]، ومع التأخير المشكلة ممكن تستخبى خالص. وبعد ما زوّدت [[await]] الاختبار بيقع صح باسمه، ولما صلّحت التأكيد لـ [[true]] بيعدّي.`, sol: R`**١. الاختبار البايظ زي ما هو** ([[cart.js]] بتاع الشرح، والسلة فيها صنف بـ ٦٠ فـ [[checkout]] بيرجّع [[ok: true]]، يعني التأكيد [[false]] غلط عن قصد):

~~~js bad/then.test.js
import { it, expect, vi } from 'vitest';
import { checkout } from '../src/cart.js';

it('checkout بيرجّع ok: false (غلط عن قصد)', () => {
  const cart = { items: [{ price: 30, qty: 2 }] };
  const pay = vi.fn().mockResolvedValue({ id: 'r-1' });
  checkout(cart, pay).then((r) => {
    expect(r.ok).toBe(false);
  });
});
~~~

~~~text الناتج: npx vitest run bad/then.test.js (Vitest 5.1.1)
⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯
AssertionError: expected true to be false // Object.is equality
 ❯ bad/then.test.js:8:18

 Test Files  1 passed (1)
      Tests  1 passed (1)
     Errors  1 error
~~~

كود الخروج [[1]] بسبب الـ [[Errors]]، بس **[[Tests 1 passed]]**. الدالة رجعت قبل ما الـ [[.then]] يشتغل، فـ Vitest علّم الاختبار ناجح، والتأكيد وقع بعدها كـ «Unhandled Rejection» Vitest لحقه بالصدفة لأنه لسه مخلّصش.

**٢. ومع تأخير ١٠٠ms جوه الـ mock** (السطر بتاع [[pay]] بس اتغيّر):

~~~js
const pay = vi.fn(() => new Promise((r) => setTimeout(() => r({ id: 'r-1' }), 100)));
~~~

~~~text الناتج
 Test Files  1 passed (1)
      Tests  1 passed (1)
   Duration  183ms
~~~

**ولا كلمة.** كود الخروج [[0]] والـ CI أخضر. Vitest خلّص الملف وقفل الـ worker قبل ما الـ ١٠٠ms يخلصوا، فالتأكيد الغلط عمره ما اتنفّذ. ده الأخطر: اختبار «بيعدّي» ومبيختبرش حاجة.

**٣. التصليح:** [[async]] و [[await]]، والتأكيد بعد الـ [[await]] على طول:

~~~js bad/then.test.js
import { it, expect, vi } from 'vitest';
import { checkout } from '../src/cart.js';

it('checkout بيرجّع ok: false (غلط عن قصد)', async () => {
  const cart = { items: [{ price: 30, qty: 2 }] };
  const pay = vi.fn(() => new Promise((r) => setTimeout(() => r({ id: 'r-1' }), 100)));
  const r = await checkout(cart, pay);
  expect(r.ok).toBe(false);
});
~~~

~~~text الناتج: بيقع صح باسمه
 ❯ bad/then.test.js (1 test | 1 failed) 113ms
   × checkout بيرجّع ok: false (غلط عن قصد) 112ms

 FAIL  bad/then.test.js > checkout بيرجّع ok: false (غلط عن قصد)
AssertionError: expected true to be false // Object.is equality
- Expected
+ Received
- false
+ true
 ❯ bad/then.test.js:8:16

 Test Files  1 failed (1)
      Tests  1 failed (1)
~~~

وبعد ما صلّحت التأكيد للحقيقة (الاسم والـ [[toBe(true)]]، وزوّدت [[toHaveBeenCalledWith(60)]]):

~~~text الناتج: npx vitest run bad/then.test.js --reporter=verbose
 ✓ bad/then.test.js > checkout بيدفع ويرجّع ok: true 106ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

الـ [[106ms]] دليل إن الاختبار استنى الـ mock فعلًا.

**ليه:** Vitest بيستنى بس الـ Promise اللي الدالة **بترجّعها**. [[async]] بيخلي الدالة ترجّع Promise، و [[await]] بيخلي الـ Promise دي متخلصش غير بعد [[checkout]]. والبديل [[return checkout(cart, pay).then(...)]] صح برضه. **الغلطة الشائعة:** تصلّح بإنك تزوّد [[async]] بس من غير [[await]] قدام [[checkout]]: الدالة هترجّع Promise بتخلص على طول، ونفس المشكلة.`},
          ],
          ref: [
            { t: "Vitest: Getting Started", url: "https://vitest.dev/guide/" },
            { t: "Vitest: expect", url: "https://vitest.dev/api/expect" },
            { t: "Vitest: vi", url: "https://vitest.dev/api/vi" },
            { t: "Vitest: Mocking", url: "https://vitest.dev/guide/mocking" },
            { t: "Vitest: Coverage", url: "https://vitest.dev/guide/coverage" },
            { t: "Vitest: CLI", url: "https://vitest.dev/guide/cli" },
          ],
          pre: [{ to: "js/مشروع — اختبرها من غير شبكة", why: R`أول اختبارات بـ [[node --test]] و [[assert]] و fetch مزيّف، وهنا نفس الفكرة بـ Vitest` }],
          deep: {
            why: R`من غير اختبارات، الطريقة الوحيدة تعرف إن تعديلك سليم إنك تجرّب كل حاجة بإيدك، وده مبيحصلش: بتجرّب اللي عدّلته بس، والباج بيطلع في حتة تانية. الاختبار بيجرّب **كل** الحالات اللي كتبتها، في أقل من ثانية، مع كل حفظ. وكتابته بتجبرك على كود أحسن: دوال صغيرة بتاخد اللي محتاجاه كـ arguments بدل ما تقرا من الـ DOM أو تنادي API مباشرة.`,
            how: R`[[vitest]] بيدوّر على [[**/*.{test,spec}.?(c|m)[jt]s?(x)]] ويشغّل كل ملف في worker لوحده (عشان ملف ميأثرش على التاني)، ويحوّل الكود بـ Vite (فـ TS و JSX شغالين من غير إعداد). [[describe]] و [[it]] بيسجّلوا الاختبارات الأول، وبعدين بتتشغّل بالترتيب. [[expect]] بيرمي [[AssertionError]] لو التأكيد فشل، والـ runner بيمسكه ويعلّم الاختبار [[×]] ويكمّل الباقي. لو الدالة رجّعت Promise بيستناها.

**watch mode:** Vitest عارف كل ملف بيستورد إيه (من Vite)، فلما [[cart.js]] اتغيّر، أعاد [[cart.test.js]] بس: الناتج قال [[RERUN src/cart.js x1]] وخلّص في 32ms.

**coverage بـ v8:** المحرك نفسه (V8) بيعدّ كل سطر وفرع اتنفّذ وانت بتشغّل الاختبارات، و [[@vitest/coverage-v8]] بيحوّل ده لتقرير. **Lines** = سطور اتنفّذت، **Branches** = كل [[if]] و [[?:]] و [[||]] اتجرّب في الاتجاهين؟ اتقاس: سطر [[if (amount === 0) return ...]] اتحسب «covered» لأن الـ [[if]] اتنفّذ، بس الـ branch بتاع [[true]] عمره ما حصل، فـ Branches كانت ٤٤٪ و Lines ٧٢٪. عشان كده الـ branches أصدق.`,
            when: R`اختبر المنطق اللي ليه قواعد: حسابات، وتحقق، وتحويل داتا، وحالات الأخطاء، وأي باج اتصلّح (اكتب اختبار بيمسكه **قبل** ما تصلّحه). متختبرش تفاصيل التنفيذ (اسم متغير داخلي) ولا مكتبات الناس. وللصفحة كلها في متصفح حقيقي: Playwright (تاب «فحص الكود»). و [[node --test]] كفاية لمكتبة Node صغيرة من غير build ومن غير باكدجات. Vitest لما المشروع فيه Vite أو TS أو React/Vue، أو محتاج mocks و coverage و watch مريحين.`,
            mistakes: R`[[toBe]] على object أو array (يقع حتى لو المحتوى زي بعضه). [[expect(fn())]] بدل [[expect(() => fn())]] مع [[toThrow]]. تنسى [[await]] قبل [[expect(...).rejects]] (Vitest 5 بيمسكها)، أو تنسى [[await]]/[[return]] قبل [[.then]] فالاختبار يقول «passed» والتأكيد بيقع بعدين كـ unhandled error. [[0.1 + 0.2]] بـ [[toBe]] (استخدم [[toBeCloseTo]]). اختبارات بتعتمد على بعض (واحد بيعدّل متغير والتاني بيقرا) فلما تشغّل واحد لوحده يقع. ومطاردة ١٠٠٪ coverage بتأكيدات فاضية: الاختبار من غير [[expect]] بيرفع الـ coverage ومش بيختبر حاجة.`,
          },
          teach: R`## ملف اختبار = كود بيشغّل كودك ويتأكد

كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 و Vitest 5.0.5 و @vitest/coverage-v8 5.0.5 في مشروع تجربة، والمسار في الناتج اتغيّر لـ [[C:/Users/you/lab/vt]].

---

## ١. التسطيب والكود اللي هيتختبر

~~~bash
npm init -y
npm pkg set type=module
npm i -D vitest @vitest/coverage-v8
~~~

- [[vitest]] الـ runner نفسه، و [[@vitest/coverage-v8]] لتقرير الـ coverage (حسب الـ docs، Vitest بيطلب تسطّبه لو شغّلت [[--coverage]] من غيره).
- في [[package.json]]: [["test": "vitest"]] و [["coverage": "vitest run --coverage"]]، فـ [[npm test]] بيشغّل watch و [[npm run coverage]] مرة واحدة.

~~~js src/cart.js
export function total(items, discount = 0) {
  if (!Array.isArray(items)) throw new TypeError('items لازم array');
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  return Math.max(0, sum - discount);
}

export function addItem(cart, item) {
  return { ...cart, items: [...cart.items, item] };
}

export async function checkout(cart, pay) {
  const amount = total(cart.items);
  if (amount === 0) return { ok: false, reason: 'empty' };
  const receipt = await pay(amount);
  return { ok: true, id: receipt.id };
}

export function applyCoupon(code) {
  if (code === 'SAVE10') return 10;
  if (code === 'HALF') return 50;
  return 0;
}
~~~

لاحظ إن [[checkout]] بتاخد [[pay]] كـ argument: ده اللي بيخلي الاختبار يحط دالة مزيّفة مكان البنك من غير أي حيلة.

---

## ٢. أول تشغيل

~~~text الناتج: npx vitest run --reporter=verbose
 RUN  v5.0.5 C:/Users/you/lab/vt

 ✓ src/cart.test.js > total > بيجمع السعر في الكمية 2ms
 ✓ src/cart.test.js > total > الخصم مبيخليش الإجمالي سالب 0ms
 ✓ src/cart.test.js > total > بيرمي لو items مش array 1ms
 ✓ src/cart.test.js > addItem بترجّع سلة جديدة 1ms
 ✓ src/cart.test.js > checkout > بيدفع المبلغ الصح مرة واحدة 1ms
 ✓ src/cart.test.js > checkout > لو الدفع وقع، الخطأ بيطلع 1ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  23:48:24
   Duration  243ms (transform 44%, import 34%, tests 12%, worker 10%)
~~~

- [[run]]: مرة واحدة واخرج (للـ CI). من غيره وفي ترمنال عادي = watch.
- [[--reporter=verbose]]: اسم كل اختبار. الافتراضي في ترمنال مش تفاعلي بيطبع الملخص بس (اتجرّب: من غيره ظهر [[Tests 7 passed]] من غير أسامي).
- [[ملف > describe > it]]: ده المسار اللي بيظهر لما حاجة تقع.
- الـ Duration كله ربع ثانية، والاختبارات نفسها ١٢٪ منه: الباقي تحويل وتحميل.

---

## ٣. اقرا الفشل: [[toBe]] و [[toEqual]] و [[toStrictEqual]]

~~~js src/fail.test.js
import { it, expect } from 'vitest';
it('toBe على object', () => {
  expect({ a: 1 }).toBe({ a: 1 });
});
it('0.1 + 0.2', () => {
  expect(0.1 + 0.2).toBe(0.3);
});
~~~

~~~text الناتج (جزء)
 FAIL  src/fail.test.js > toBe على object
AssertionError: expected { a: 1 } to be { a: 1 } // Object.is equality

If it should pass with deep equality, replace "toBe" with "toStrictEqual"

Expected: { a: 1 }
Received: serializes to the same string

 ❯ src/fail.test.js:3:20
      2| it('toBe على object', () => {
      3|   expect({ a: 1 }).toBe({ a: 1 });
       |                    ^

 FAIL  src/fail.test.js > 0.1 + 0.2
AssertionError: expected 0.30000000000000004 to be 0.3 // Object.is equality

- Expected
+ Received

- 0.3
+ 0.30000000000000004
~~~

اقرا الرسالة من فوق لتحت: **مين** وقع (المسار)، و**إيه** ([[expected X to be Y]] ونوع المقارنة [[Object.is]])، و**نصيحة** («replace toBe with toStrictEqual»)، و diff ([[-]] المتوقّع، [[+]] اللي وصل)، و**فين** بالظبط بسهم تحت الحرف.

«serializes to the same string» = شكلهم واحد بس مش **نفس** الـ object. والتاني: [[0.1 + 0.2]] في أي لغة بـ floating point = [[0.30000000000000004]] (درس «number و NaN»)، والحل [[toBeCloseTo(0.3)]].

~~~text الناتج: toEqual و toStrictEqual على { a: 1, b: undefined }
AssertionError: expected { a: 1, b: undefined } to strictly equal { a: 1 }
- Expected
+ Received
  {
    "a": 1,
+   "b": undefined,
  }
~~~

[[toEqual]] (السطر اللي قبله) **عدّى**: بيتجاهل الخصايص اللي قيمتها [[undefined]]. [[toStrictEqual]] وقع.

| الـ matcher | بيقارن إزاي | استخدمه لـ |
|---|---|---|
| [[toBe]] | [[Object.is]]: نفس القيمة أو نفس الـ object بالظبط | أرقام ونصوص و [[true]]/[[false]] و «نفس المرجع» |
| [[toEqual]] | المحتوى بالعمق، وبيتجاهل [[undefined]] | objects و arrays لما الشكل هو المهم |
| [[toStrictEqual]] | المحتوى بالعمق + [[undefined]] + نوع الـ class | لما الفرق بين «مش موجود» و «[[undefined]]» مهم |
| [[toBeCloseTo]] | أرقام عشرية بتقريب (٢ رقم بعد العلامة افتراضيًا) | فلوس ونسب وأي حساب float |
| [[toThrow]] | الدالة رمت؟ ومعاه نوع أو نص أو regex | التحقق من الإدخال |
| [[toHaveLength]] و [[toContain]] و [[toMatch]] | طول، وعنصر جوه array، ونص بـ regex | لستات ونصوص |

---

## ٤. غلطتين في الـ async والأخطاء

~~~js
it('من غير () =>', () => {
  expect(total('x')).toThrow();
});
it('من غير await', () => {
  expect(Promise.resolve(1)).rejects.toThrow();
});
~~~

~~~text الناتج (جزء)
 FAIL  src/fail.test.js > من غير () =>
TypeError: items لازم array
 ❯ total src/cart.js:2:36

 FAIL  src/fail.test.js > من غير await
AssertionError: promise resolved "1" instead of rejecting
Error: Promise returned by $__btexpect(actual).rejects.toThrow()$__bt was not awaited. This assertion is asynchronous and must be awaited; otherwise, it is not guaranteed to complete before the test finishes
~~~

1. [[total('x')]] اتنفّذت **قبل** [[expect]]، فالـ error طلع من الاختبار نفسه. الاختبار وقع، بس لسبب غلط، ولو الدالة مبترميش هيقع برضه برسالة ملهاش معنى. لازم [[() => total('x')]].
2. من غير [[await]]: Vitest 5 بيمسكها ويقولك صراحة. لكن الغلطة الأخطر [[.then]] من غير [[await]]:

~~~text الناتج: checkout(...).then(r => expect(r.ok).toBe(false)) من غير await
Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.
AssertionError: expected true to be false // Object.is equality
 Test Files  1 passed (1)
      Tests  1 passed (1)
     Errors  1 error
~~~

**[[Tests 1 passed]]** والتأكيد غلط. Vitest لحقه كـ «unhandled error» وخرج بـ [[1]]، بس لو التأكيد اتأخر شوية (setTimeout) ممكن ميلحقوش خالص. القاعدة: أي Promise في اختبار، [[await]] قبلها.

---

## ٥. [[vi.fn()]]: دالة مزيّفة بتسجّل

| الكود | بيعمل إيه |
|---|---|
| [[vi.fn()]] | دالة بترجّع [[undefined]] وبتسجّل كل نداء |
| [[vi.fn().mockReturnValue(5)]] | بترجّع [[5]] كل مرة |
| [[vi.fn().mockResolvedValue(x)]] | بترجّع [[Promise.resolve(x)]]، زي API نجح |
| [[vi.fn().mockRejectedValue(err)]] | بترجّع Promise بترفض، زي API فشل |
| [[vi.fn((a) => a * 2)]] | بتشغّل الدالة دي وبتسجّل كمان |
| [[fn.mock.calls]] | كل الـ arguments: بعد [[pay(60)]] و [[pay(15)]] كانت [[ [ [60], [15] ] ]] |

والتأكيدات: [[toHaveBeenCalled()]] و [[toHaveBeenCalledTimes(n)]] و [[toHaveBeenCalledWith(...)]] و [[not.toHaveBeenCalled()]]. ولو الكود بيستورد الحاجة الخارجية بدل ما ياخدها كـ argument، فيه [[vi.mock('./bank.js')]] و [[vi.spyOn(obj, 'method')]] (دروس «vi.fn و vi.spyOn» و «vi.mock» في تاب «فحص الكود»).

---

## ٦. watch mode

[[npx vitest --watch]] (أو [[npx vitest]] في ترمنال عادي). وقتها الملف كان فيه اختبارات [[applyCoupon]] اللي في القسم ٧ كمان، فالعدد ١١. شيلت [[Math.max(0, ...)]] من [[cart.js]] وحفظت:

~~~text الناتج
 PASS  Waiting for file changes...
       press h to show help, press q to quit

 RERUN  src/cart.js x1
 ❯ src/cart.test.js (11 tests | 1 failed) 14ms
   ❯ total (3)
     × الخصم مبيخليش الإجمالي سالب 5ms

 FAIL  src/cart.test.js > total > الخصم مبيخليش الإجمالي سالب
AssertionError: expected -15 to be +0 // Object.is equality
- 0
+ -15

 Test Files  1 failed (1)
      Tests  1 failed | 10 passed (11)
   Duration  32ms
 FAIL  Tests failed. Watching for file changes...
~~~

ورجّعت السطر وحفظت:

~~~text الناتج
 RERUN  src/cart.js x2
 Test Files  1 passed (1)
      Tests  11 passed (11)
 PASS  Waiting for file changes...
~~~

- [[RERUN src/cart.js x1]]: Vitest عارف إن [[cart.test.js]] بيستورد [[cart.js]]، فأعاده هو بس.
- [[32ms]] بدل ٢٤٣: مفيش تحميل من الأول.
- [[h]] للمساعدة، و [[q]] للخروج، و [[a]] يعيد الكل، و [[f]] الفاشل بس. وفي الـ CI (لو [[CI=true]]) [[vitest]] بيشتغل مرة واحدة لوحده.

---

## ٧. الـ coverage، والحد الأدنى

~~~js vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      reporter: ['text', 'html'],
      thresholds: { lines: 90, branches: 80 },
    },
  },
});
~~~

~~~text الناتج: npx vitest run --coverage
 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |    62.5 |    44.44 |      80 |   72.72 |
 cart.js  |    62.5 |    44.44 |      80 |   72.72 | 19-21
----------|---------|----------|---------|---------|-------------------
ERROR: Coverage for lines (72.72%) does not meet global threshold (90%)
ERROR: Coverage for branches (44.44%) does not meet global threshold (80%)
~~~

| العمود | بيعدّ إيه |
|---|---|
| [[% Stmts]] | الجمل البرمجية اللي اتنفّذت، والسطر الواحد ممكن يبقى فيه أكتر من جملة |
| [[% Branch]] | كل فرع في [[if]] و [[?:]] و [[&&]] و [[\|\|]] والقيم الافتراضية: اتجرّب في الاتجاهين؟ |
| [[% Funcs]] | الدوال اللي اتنادت ولو مرة: ٤ من ٥ ([[applyCoupon]] لأ) |
| [[% Lines]] | السطور اللي اتنفّذ منها حاجة |
| [[Uncovered Line #s]] | أرقام السطور اللي محدش نفّذها، وهنا ١٩–٢١ (جسم [[applyCoupon]]) |

**الفخ:** سطر ١٣ [[if (amount === 0) return { ok: false, ... }]] **مش** في الـ uncovered، لأن الـ [[if]] اتنفّذ. بس محدش جرّب سلة فاضية، فالفرع ده ناقص. الـ Lines قالت ٧٢٪ والـ Branches ٤٤٪، والفرق ده هو الحالات اللي مااتجرّبتش. والـ [[ERROR]] خلّى كود الخروج [[1]]: ده اللي بيوقّع الـ CI.

بعد ما زوّدت اختبارات [[applyCoupon]] بـ [[it.each]] واختبار السلة الفاضية:

~~~js
it.each([
  ['SAVE10', 10],
  ['HALF', 50],
  ['save10', 0],
  ['', 0],
])('%s ← %i', (code, expected) => {
  expect(applyCoupon(code)).toBe(expected);
});
~~~

~~~text الناتج
 ✓ src/cart.test.js > applyCoupon > SAVE10 ← 10 0ms
 ✓ src/cart.test.js > applyCoupon > HALF ← 50 0ms
 ✓ src/cart.test.js > applyCoupon > save10 ← 0 0ms
 ✓ src/cart.test.js > applyCoupon >  ← 0 0ms
 Test Files  1 passed (1)
      Tests  11 passed (11)
 % Coverage report from v8
No files with missing coverage.
1 file fully covered.
=============================== Coverage summary ===============================
Statements   : 100% ( 16/16 )
Branches     : 100% ( 9/9 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 11/11 )
================================================================================
~~~

- [[it.each(جدول)]] بيعمل اختبار لكل صف، و [[%s]] و [[%i]] في الاسم بيتبدلوا بالقيم (نص ورقم). والنص الفاضي طلع اسمه [[ ← 0]].
- **مفاجأة Vitest 5:** لما كل حاجة ١٠٠٪، جدول الملفات مبيظهرش خالص: «No files with missing coverage». والملخص اللي تحته بيبان دايمًا.
- تقرير [[html]] اتعمل في [[coverage/index.html]]: افتحه في المتصفح وهتلاقي كل سطر ملوّن، والفروع الناقصة عليها علامة. وحط [[coverage/]] في [[.gitignore]] و [[globalIgnores]] بتاع ESLint.

---

## ٨. Vitest ولا [[node --test]]؟

| | [[node --test]] | Vitest |
|---|---|---|
| التسطيب | مدمج في Node، مفيش باكدج | [[npm i -D vitest]] |
| الشكل | [[test]] و [[assert.equal]] و [[assert.deepEqual]] | [[it]] و [[expect]] بشكل Jest |
| الـ mocks | [[mock.fn()]] من [[node:test]] | [[vi.fn()]] و [[vi.mock]] للـ modules |
| TS و JSX | Node 24 بيشغّل TS بسيط بس | بـ Vite، من غير إعداد |
| watch | [[node --test --watch]] | أذكى: بيعيد اللي اتأثر بس |
| coverage | [[--experimental-test-coverage]] | [[--coverage]] بتقرير HTML وحد أدنى |

مكتبة Node صغيرة من غير build: [[node --test]] كفاية (درس «node --test» في تاب Node). مشروع Vite أو React أو Vue أو TS: Vitest.

---

## الخلاصة

- [[describe]] و [[it]] و [[expect]]، واسم الاختبار جملة بتوصف السلوك.
- [[toBe]] للقيم البسيطة ونفس المرجع، و [[toEqual]] للمحتوى، و [[toStrictEqual]] لو [[undefined]] بيفرق، و [[toBeCloseTo]] للعشري.
- [[expect(() => fn()).toThrow(...)]] بدالة، و [[await expect(p).rejects...]] بـ [[await]].
- [[vi.fn()]] مكان أي حاجة خارجية، و [[toHaveBeenCalledWith]] و [[toHaveBeenCalledTimes]].
- [[vitest]] للـ watch و [[vitest run]] للـ CI، و [[--coverage]] مع [[thresholds]]، والـ Branches أصدق من الـ Lines.`,
          sol: R`اتجرّب على Vitest 5.0.5: الستة عدّوا في 243ms. وفي الـ watch، شيل [[Math.max]] خلّى اختبار واحد بس يقع ([[الخصم مبيخليش الإجمالي سالب]]) برسالة [[expected -15 to be +0]] و [[RERUN src/cart.js x1]]، ولما رجّعته الكل عدّى في الإعادة التانية.

والـ coverage قال [[19-21]] uncovered (جسم [[applyCoupon]]، محدش ناداها)، و Branches ٤٤٪ رغم Lines ٧٢٪: الفرع الناقص التاني هو [[amount === 0]] في [[checkout]] (سلة فاضية)، سطره «covered» بس الاتجاه بتاع [[true]] عمره ما اتجرّب. الاختبارات اللي بتكمّل لـ ١٠٠٪ (اتجرّبت):`,
          solCode: R`import { describe, it, expect, vi } from 'vitest';
import { applyCoupon, checkout } from './cart.js';

it('السلة الفاضية متدفعش', async () => {
  const pay = vi.fn();
  await expect(checkout({ items: [] }, pay)).resolves.toEqual({ ok: false, reason: 'empty' });
  expect(pay).not.toHaveBeenCalled();
});

describe('applyCoupon', () => {
  it.each([
    ['SAVE10', 10],
    ['HALF', 50],
    ['save10', 0],
    ['', 0],
  ])('%s ← %i', (code, expected) => {
    expect(applyCoupon(code)).toBe(expected);
  });
});
// npx vitest run --coverage ← Statements 100% و Branches 100% و Functions 100% و Lines 100%`,
        },
      ],
    }
]);
