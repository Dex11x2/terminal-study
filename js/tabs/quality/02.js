// تكملة تاب quality: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/quality/01.js (شرح حقول الدرس في أوله)
MORE("quality", [
    {
      t: "الاختبارات",
      l: 2,
      n: "الكود بيعمل الصح فعلًا؟ vitest و jest، ونسبة الكود اللي اتختبر",
      items: [
        {
          cmd: "vitest",
          title: "شغّل الاختبارات مرة أو مع كل حفظ",
          desc: R`[[vitest]] لوحده بيفتح وضع watch ويعيد الاختبارات مع كل حفظ، وده وانت شغال. [[vitest run]] بيشغّلهم مرة ويقفل بـ exit code، وده للـ CI والـ hooks. وتقدر تفلتر بملف أو باسم الاختبار.

و [[--passWithNoTests]] بتخلي باكدج لسه ملهاش اختبارات متفشّلش الأمر.

الدرس ده عن تشغيل الاختبارات. كتابتها نفسها (expect و mocks والوقت المزيّف) في فئة «تكتب اختبار» اللي بعد الفئة دي.`,
          example: R`npx vitest
npx vitest run
npx vitest run src/cart
npx vitest run -t "applies discount"
npx vitest run --passWithNoTests
npx vitest run --reporter=verbose`,
          try: R`اكتب [[sum.test.ts]] فيه [[expect(sum(2, 2)).toBe(4)]]، شغّل [[vitest]]، وعدّل الدالة وشوف الاختبار بيقع قدامك من غير ما تعيد التشغيل.`,
          deep: {
            why: "lint و tsc بيقولوا الكود «سليم شكلًا». بس [[calculateTotal]] بترجع الرقم الصح؟ الخصم بيتحسب قبل الضريبة ولا بعدها؟ ده محدش يعرفه غير لو شغّلت الكود فعلًا بمدخلات معروفة وقارنت الناتج.",
            how: R`vitest بيدوّر على ملفات [[*.test.ts]] و [[*.spec.ts]] (وأخواتهم js و tsx) ويشغّلها. جوه الملف: [[describe]] مجموعة، و [[it]] أو [[test]] اختبار واحد، و [[expect(x).toBe(y)]] الشرط.

الفرق المهم: [[vitest]] من غير حاجة بيقعد شغال (watch) في ترمنال عادي، ويعيد الاختبارات المتأثرة بس لما تحفظ. بس لو لقى المتغير [[CI]] (موجود في GitHub Actions)، أو الترمنال مش تفاعلي، بيشتغل مرة ويقفل. عشان كده في السكربتات اكتب [[vitest run]] صريحة ومتعتمدش على التخمين.

وبيستخدم إعدادات Vite نفسها (aliases و plugins)، فبيفهم TypeScript و JSX من غير إعداد. ولو محتاج DOM (اختبارات React components) بتحط [[environment: 'jsdom']] في [[vitest.config.ts]].

[[-t]] بيفلتر بجزء من اسم الاختبار، والمسار بيفلتر بالملفات اللي مسارها فيه الكلمة دي. و [[--reporter=verbose]] بيطبع كل اختبار باسمه بدل ملخص لكل ملف.

ولمشروع Node صغير من غير Vite، Node نفسه فيه [[node --test]] (في تاب Node).`,
            when: "watch وانت بتكتب الكود. و [[run]] في [[scripts.test]] و CI و pre-push.",
            mistakes: R`سكربت [["test": "vitest"]] من غير run، فـ [[npm run check]] في ترمنال عادي يقعد في watch ومبيكمّلش للخطوة اللي بعده، وتفتكره علّق. واختبارات بتعتمد على بعض أو على الترتيب (واحد بيسيب داتا والتاني بيعتمد عليها)، فتنجح لوحدها وتقع مع بعض. وتنسى [[await]] قبل [[expect(promise).rejects]]: في jest والنسخ القديمة الاختبار ممكن يعدّي وهو فاشل، و vitest 5 بقى يوقّعه برسالة «was not awaited».`
          },
          teach: R`## الفكرة

[[vitest]] بيدوّر على ملفات الاختبار ويشغّلها ويقولك كام نجح وكام وقع. ليه طريقتين: يفضل شغال ويعيد مع كل حفظ (watch)، أو يشغّل مرة ويقفل ([[run]]). والباقي فلاتر وشكل الناتج.

اتجرّب بـ Vitest 5.0 في مشروع الـ lab، وفيه ملفين اختبار:

~~~text الملفات
src/sum.test.ts         test("adds two numbers")
src/cart/cart.test.ts   test("full price")  و  test("applies discount")
~~~

[[test("الاسم", () => { ... })]] بيعرّف اختبار: اسمه، ودالة جواها [[expect(...)]]. والتفاصيل في فئة «تكتب اختبار».

---

## ١. [[npx vitest]] (watch)

ده اتشغّل في ترمنال تفاعلي (لينكس [[node:22-slim]] في Docker) على [[sum.ts]] و [[sum.test.ts]] اللي في الحل:

~~~text الناتج
 DEV  v5.0.3 /w

 ✓ sum.test.ts (1 test) 3ms
   ✓ adds two numbers 2ms

 Test Files  1 passed (1)
      Tests  1 passed (1)

 PASS  Waiting for file changes...
       press h to show help, press q to quit
~~~

[[DEV]] يعني وضع watch. [[✓]] اختبار نجح. [[Test Files]] عدد الملفات و [[Tests]] عدد الاختبارات. وبعدها بيقف مستني.

غيّرت [[a + b]] لـ [[a - b]] وحفظت، ومن غير ما ألمس الترمنال:

~~~text الناتج
 RERUN  sum.ts x1

 ❯ sum.test.ts (1 test | 1 failed) 7ms
   × adds two numbers 6ms

 FAIL  sum.test.ts > adds two numbers
AssertionError: expected +0 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 0

 ❯ sum.test.ts:5:21
      3|
      4| test("adds two numbers", () => {
      5|   expect(sum(2, 2)).toBe(4);
       |                     ^
~~~

| الحتة | معناها |
|---|---|
| [[RERUN sum.ts x1]] | الملف ده اتغيّر، فبيعيد الاختبارات اللي بتعمله import |
| [[×]] | اختبار وقع |
| [[sum.test.ts > adds two numbers]] | الملف، وبعد [[>]] اسم الاختبار |
| [[expected +0 to be 4]] | كان مستني ٤ ولقى ٠. و [[+0]] صفر موجب: vitest بيكتب العلامة عشان يفرّق بينه وبين [[-0]] |
| [[Object.is equality]] | [[toBe]] بيقارن بـ [[Object.is]]، يعني نفس القيمة بالظبط |
| [[- Expected]] و [[+ Received]] | الـ [[-]] المتوقع و الـ [[+]] اللي جه فعلًا |
| [[sum.test.ts:5:21]] والسهم | السطر والعمود اللي وقع فيه |

رجّعت [[a + b]] وحفظت: [[RERUN sum.ts x2]] وبعدها [[✓]] تاني. و [[q]] بيخرج.

### ليه في السكربتات بنكتب [[run]]؟

لما الناتج مش رايح لترمنال تفاعلي (pipe، أو CI، أو المتغير [[CI]] موجود)، [[npx vitest]] بيشتغل مرة ويقفل لوحده. جرّبته على ويندوز والناتج رايح لـ pipe: طبع [[Tests 3 passed (3)]] وخرج بـ [[0]]. بس في ترمنال عادي هيفضل مستني للأبد، فـ [[npm run check]] يبان كأنه علّق. [[run]] صريحة بتشيل التخمين.

---

## ٢. [[npx vitest run]]

~~~text الناتج
 RUN  v5.0.3 ~/lab

 Test Files  2 passed (2)
      Tests  3 passed (3)
   Start at  20:11:17
   Duration  268ms (transform 47%, import 34%, worker 11%, tests 8%)
~~~

[[RUN]] بدل [[DEV]]. و [[Duration]] الوقت كله، والنسب بين القوسين اتصرفت في إيه: [[transform]] تحويل TypeScript لـ JS، و [[import]] تحميل الملفات، و [[tests]] تشغيل الاختبارات نفسها. يعني في مشروع صغير أغلب الوقت تجهيز مش اختبار. والـ exit code [[0]] لو كله نجح و [[1]] لو أي اختبار وقع.

---

## ٣. [[npx vitest run src/cart]]

أي كلام بعد [[run]] من غير [[-]] بيتعامل كجزء من مسار الملف: شغّل الملفات اللي مسارها فيه [[src/cart]] بس.

~~~text الناتج
 Test Files  1 passed (1)
      Tests  2 passed (2)
~~~

ملف واحد (cart) واختبارين.

---

## ٤. [[npx vitest run -t "applies discount"]]

[[-t]] (test name pattern) بيفلتر **باسم الاختبار** مش الملف. ضفت [[--reporter=verbose]] عشان نشوف مين اتشغّل:

~~~text الناتج
 ↓ src/cart/cart.test.ts > full price
 ✓ src/cart/cart.test.ts > applies discount 3ms
 ↓ src/sum.test.ts > adds two numbers

 Test Files  1 passed | 1 skipped (2)
      Tests  1 passed | 2 skipped (3)
~~~

[[↓]] يعني skipped: اتشاف بس متشغّلش لأن اسمه مش مطابق.

---

## ٥. [[npx vitest run --passWithNoTests]]

في مشروع مفيهوش ولا ملف اختبار:

~~~text من غير الفلاج
No test files found, exiting with code 1
~~~

~~~text بـ --passWithNoTests
No test files found, exiting with code 0
~~~

نفس الرسالة، بس الـ exit code اتغيّر. مفيد في monorepo لما باكدج جديدة لسه ملهاش اختبارات.

---

## ٦. [[npx vitest run --reporter=verbose]]

الـ reporter هو شكل الناتج. الافتراضي بيطبع ملخص، و [[verbose]] بيطبع كل اختبار في سطر:

~~~text الناتج
 ✓ src/cart/cart.test.ts > full price 2ms
 ✓ src/cart/cart.test.ts > applies discount 0ms
 ✓ src/sum.test.ts > adds two numbers 2ms

 Test Files  2 passed (2)
      Tests  3 passed (3)
~~~

---

## الخلاصة

| الأمر | بيعمل إيه | بيقفل لوحده؟ |
|---|---|---|
| [[vitest]] | watch، يعيد مع كل حفظ | لأ في ترمنال عادي، آه في CI و pipe |
| [[vitest run]] | مرة واحدة | آه |
| [[run path]] | الملفات اللي مسارها فيه الكلمة دي | آه |
| [[run -t "name"]] | الاختبارات اللي اسمها فيه الجملة دي | آه |
| [[--passWithNoTests]] | مفيش اختبارات = نجاح | آه |
| [[--reporter=verbose]] | كل اختبار في سطر | - |`,
          lines: [
            "شغّل الاختبارات وسيبها تعيد مع كل حفظ (watch).",
            "شغّلهم مرة واحدة واقفل، والـ exit code بيقول نجح ولا لأ.",
            "الملفات اللي في مسارها src/cart بس.",
            "الاختبارات اللي اسمها فيه الجملة دي بس ([[-t]]).",
            "لو مفيش ملفات اختبار أصلًا، اعتبرها نجاح.",
            "اطبع كل اختبار باسمه."
          ],
          sol: R`أول تشغيل بـ [[npx vitest]]: [[✓ src/sum.test.ts (1 test)]] و [[Test Files 1 passed (1)]] و [[Tests 1 passed (1)]]، وبعدين بيقعد مستني ([[Waiting for file changes...]]).

لما تغيّر الدالة لـ [[a - b]] وتحفظ، بيعيد الاختبار لوحده ويطبع:

[[FAIL src/sum.test.ts > adds two numbers]] و [[AssertionError: expected +0 to be 4 // Object.is equality]] وتحتها [[- 4]] و [[+ 0]]، وسهم على السطر اللي فيه [[toBe(4)]]. ترجّعها وتحفظ فيرجع أخضر.

لو ما اتعادش لما حفظت: انت شغّلت [[vitest run]] مش [[vitest]]، أو شغّال في CI (هناك بيبقى run تلقائي). ولو قال [[No test files found]]، اسم الملف لازم يخلص بـ [[.test.ts]] أو [[.spec.ts]]. واكتب [[q]] عشان تخرج.`,
          solCode: R`// src/sum.ts
export function sum(a: number, b: number) {
  return a + b;
}

// src/sum.test.ts
import { expect, test } from 'vitest';
import { sum } from './sum';

test('adds two numbers', () => {
  expect(sum(2, 2)).toBe(4);
});`
        },
        {
          cmd: "--coverage",
          title: "الاختبارات غطّت كام في المية من الكود",
          desc: R`[[--coverage]] بيعلّم كل سطر اتنفّذ وقت الاختبارات، ويطلّع جدول بالنسبة لكل ملف، وتقرير HTML تفتحه تشوف السطور الحمرا اللي محدش اختبرها.

و thresholds بتخلي الأمر يفشل لو النسبة نزلت عن حد معين.`,
          example: R`npm i -D @vitest/coverage-v8
npx vitest run --coverage
npx vitest run --coverage --coverage.thresholds.lines=80
# افتح coverage/index.html في المتصفح
npx jest --coverage`,
          try: R`شغّل [[--coverage]] على مشروع الـ lab، وافتح التقرير، وادخل على ملف فيه if واتأكد إن الاتجاهين متغطّيين.`,
          deep: {
            why: "عندك ٥٠ اختبار وحاسس إنك مغطّي. بس يمكن كلهم بيختبروا الحالة السعيدة، وفرع الـ error في [[checkout]] عمره ما اتشغّل. التقرير بيوريك الأماكن اللي محدش لمسها.",
            how: R`vitest بيستخدم V8 (محرك Node نفسه) يسجّل أنهي سطور وفروع اتنفّذت وقت الاختبارات. الناتج أربع نسب: [[Stmts]] الجمل، و [[Branch]] الفروع (كل if ليه اتجاهين)، و [[Funcs]] الدوال، و [[Lines]] السطور. والـ Branch أهمهم، لأن سطر فيه if ممكن يتحسب «متغطّي» واتجاه واحد بس اللي اتجرّب.

التقرير بيتكتب في فولدر [[coverage/]] (حطه في [[.gitignore]])، وجواه [[index.html]]: تفتحه وتدخل على أي ملف تلاقي السطور اللي متنفّذتش بالأحمر.

[[thresholds]] (في الأمر أو في [[vitest.config.ts]]) بيحوّل الرقم لشرط: لو السطور أقل من ٨٠٪، الأمر يرجع exit code 1 والـ CI يقع.

و jest فيه نفس الفكرة بـ [[--coverage]] من غير تسطيب زيادة، و [[node --test --experimental-test-coverage]] لـ test runner بتاع Node.`,
            when: "كل فترة تبص على التقرير تدوّر على كود مهم (الدفع، والصلاحيات) من غير اختبارات. و threshold في CI عشان النسبة متنزلش مع الوقت.",
            mistakes: "تطارد ١٠٠٪ فتكتب اختبارات بتنفّذ الكود من غير ما تتأكد من حاجة. التغطية بتقول السطر اتشغّل، مش إنه اتختبر صح. و threshold عالي من أول يوم على مشروع قديم، فالـ CI يفضل أحمر والناس تقفله: ابدأ بالنسبة الحالية وزوّد."
          },
          teach: R`## الفكرة

وانت بتشغّل الاختبارات، [[--coverage]] بيسجّل كل سطر وكل فرع في الكود اتنفّذ ولا لأ، وفي الآخر يطبع نسبة لكل ملف. السطر اللي محدش نفّذه = محدش اختبره.

اتجرّب على ويندوز بـ Vitest 5.0 في مشروع الـ lab، على الدالة دي واختبار واحد ليها (من غير كوبون):

~~~text src/price.ts
export function price(amount: number, coupon?: string) {
  if (coupon === "SAVE10") {
    return amount * 0.9;
  }
  return amount;
}
~~~

[[coupon?: string]]: علامة [[?]] معناها إن الـ parameter اختياري.

---

## ١. [[npm i -D @vitest/coverage-v8]]

vitest نفسه مبيعرفش يحسب التغطية: ده شغل باكدج منفصلة. [[v8]] هو محرك JavaScript اللي جوه Node و Chrome، وبيعرف يعدّ لوحده أنهي حتت كود اتنفّذت. ومن غير الباكدج:

~~~text الناتج
 MISSING DEPENDENCY  Cannot find dependency '@vitest/coverage-v8'
~~~

والأمر خرج بـ [[1]]. و [[-D]] = devDependency: محتاجها وانت بتطوّر بس، مش في الإنتاج.

---

## ٢. [[npx vitest run --coverage]]

~~~text الناتج
 RUN  v5.0.3 ~/lab
      Coverage enabled with v8

 Test Files  3 passed (3)
      Tests  4 passed (4)

 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |      75 |       50 |     100 |      75 |
 price.ts |   66.66 |       50 |     100 |   66.66 | 3
----------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 75% ( 3/4 )
Branches     : 50% ( 1/2 )
Functions    : 100% ( 2/2 )
Lines        : 75% ( 3/4 )
~~~

### الأعمدة

| العمود | بيعدّ إيه | في [[price.ts]] |
|---|---|---|
| [[% Stmts]] | الجمل (statements): كل أمر لوحده | ٢ من ٣ = 66.66: الجملة اللي في سطر ٣ ([[return amount * 0.9]]) بس اللي متنفّذتش |
| [[% Branch]] | الفروع: كل [[if]] ليه اتجاهين | ١ من ٢ = 50: اتجاه «مفيش كوبون» بس |
| [[% Funcs]] | الدوال اللي اتنادت | 100: [[price]] اتنادت |
| [[% Lines]] | السطور | نفس الـ Stmts هنا |
| [[Uncovered Line #s]] | أرقام السطور اللي متنفّذتش | سطر [[3]] |

### ليه [[sum.ts]] مش في الجدول؟

الملخص تحت بيقول [[Functions 100% ( 2/2 )]]، يعني فيه دالتين: [[price]] و [[sum]]. بس vitest 5 بيخفي من الجدول الملفات المتغطية ١٠٠٪ ويوريك الناقص بس. و [[All files]] بيجمع الكل: ٣ جمل من ٤ = 75.

---

## ٣. [[npx vitest run --coverage --coverage.thresholds.lines=80]]

[[--coverage.thresholds.lines=80]]: لو نسبة السطور أقل من ٨٠، الأمر يفشل. الإعدادات اللي جوه [[vitest.config.ts]] تقدر تكتبها في الأمر كده بالنقط.

~~~text آخر الناتج
ERROR: Coverage for lines (75%) does not meet global threshold (80%)
~~~

وخرج بـ [[1]] مع إن الأربع اختبارات نجحوا. ده اللي بيوقّع الـ CI لو حد ضاف كود من غير اختبارات.

---

## ٤. [[# افتح coverage/index.html في المتصفح]]

ده تعليق مش أمر. [[--coverage]] بيكتب فولدر [[coverage/]] فيه [[index.html]] و [[price.ts.html]] وملفات CSS و JSON. افتح [[index.html]] (دبل كليك) ودوس على [[price.ts]]: سطر ٣ بالأحمر، وجنب كل سطر اتنفّذ عدد مرات تنفيذه. وحط [[coverage]] في [[.gitignore]].

### بعد الاختبار التاني

ضفت اختبار بـ [['SAVE10']] (اللي في الحل):

~~~text الناتج
 % Coverage report from v8
No files with missing coverage.
2 files fully covered.

Statements   : 100% ( 4/4 )
Branches     : 100% ( 2/2 )
~~~

### الملف اللي محدش عمله import

عملت [[src/refund.ts]] من غير أي اختبار. [[--coverage]] العادي فضل يقول [[2 files fully covered]]: الملف مش في التقرير خالص، لأن v8 بيعدّ اللي اتحمّل بس. ومع [[--coverage.include="src/**/*.ts"]]:

~~~text الناتج
All files  |      80 |      100 |   66.66 |      80 |
 refund.ts |       0 |      100 |       0 |       0 | 2
~~~

ظهر بـ 0٪، والإجمالي نزل لـ 80. حط [[coverage.include]] في الإعدادات عشان الملفات دي متستخبّاش.

---

## ٥. [[npx jest --coverage]]

jest فيه التغطية جواه من غير تسطيب. على مشروع jest فيه [[sum.js]] متغطّي كله (Jest 30):

~~~text الناتج
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 sum.js   |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
~~~

نفس الأعمدة، و jest بيعرض الملفات المتغطية كلها كمان.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[npm i -D @vitest/coverage-v8]] | مرة واحدة، وإلا [[MISSING DEPENDENCY]] |
| [[vitest run --coverage]] | جدول في الترمنال وفولدر [[coverage/]] |
| [[--coverage.thresholds.lines=80]] | أقل من ٨٠٪ = exit code [[1]] |
| [[coverage/index.html]] | السطور الحمرا ملف ملف |
| [[jest --coverage]] | نفس الفكرة في jest |

وافتكر: Branch أهم عمود، و ١٠٠٪ معناها إن الكود اتنفّذ، مش إن الاختبار اتأكد من القيمة الصح.`,
          lines: [
            "سطّب مزوّد التغطية بتاع vitest (مرة واحدة).",
            "شغّل الاختبارات وسجّل السطور اللي اتنفّذت: جدول في الترمنال وفولدر coverage.",
            "نفسه، ويفشل لو السطور المتغطية أقل من ٨٠٪.",
            "نفس الفكرة في jest، من غير تسطيب زيادة."
          ],
          sol: R`على دالة فيها [[if (coupon === 'SAVE10')]] واختبار واحد من غير كوبون، الجدول طلّع [[price.ts | 66.66 | 50 | 100 | 66.66 | 3]]، يعني نص الـ branches بس (الـ if ما اتدخلش) وسطر 3 مش متغطي. وفي [[coverage/index.html]] لما تفتح [[price.ts]] هتلاقي السطر ده أحمر، وجنب الـ if علامة إن الاتجاه ده ما اتجربش.

بعد اختبار تاني بـ [['SAVE10']]: [[All files 100% Branches 100% ( 2/2 )]] و [[No files with missing coverage.]] والسطور كلها خضرا مع عدد مرات التنفيذ جنب كل سطر.

الأخطاء الشائعة: [[MISSING DEPENDENCY Cannot find dependency '@vitest/coverage-v8']] لو نسيت السطر الأول. وملف ما ظهرش في التقرير خالص لأن محدش عمله import في أي اختبار؛ دا أخطر من ٠٪ لأنك مش شايفه (حط [[coverage.include]] عشان يظهر). وافتكر إن ١٠٠٪ هنا معناها إن الاتجاهين اتشغلوا، مش إنك اختبرت القيمة الصح في كل واحد.`,
          solCode: R`// src/price.test.ts
import { expect, test } from 'vitest';
import { price } from './price';

test('no coupon', () => {
  expect(price(100)).toBe(100);
});

test('SAVE10 gives 10% off', () => {
  expect(price(100, 'SAVE10')).toBe(90);
});`
        },
        {
          cmd: "jest",
          title: "الاختبارات في مشروع قديم",
          desc: R`jest الأقدم والأشهر، وهتلاقيه في مشاريع كتير (خصوصًا backend و React Native). الأوامر شبه vitest: [[jest]] مرة واحدة، و [[--watch]] مع كل حفظ، و [[-t]] بالاسم.

بس jest مبيفهمش [[import]] لوحده، فمحتاج Babel أو [[--experimental-vm-modules]].`,
          example: R`npx jest
npx jest --watch
npx jest src/auth -t "rejects expired token"
npx jest --runInBand
NODE_OPTIONS=--experimental-vm-modules npx jest
npx cross-env NODE_OPTIONS=--experimental-vm-modules jest`,
          try: R`في مشروع فيه [["type": "module"]] شغّل [[jest]] وشوف الخطأ ([[Must use import to load ES Module]] في jest 30، و [[Cannot use import statement outside a module]] في النسخ الأقدم)، وبعدين شغّله بـ [[NODE_OPTIONS]].`,
          deep: {
            why: "مش كل مشروع هتشتغل عليه هيبقى vitest. jest لسه في مشاريع كتير، ولازم تعرف تشغّله وتفهم مشاكله المشهورة.",
            how: R`عكس vitest، [[jest]] من غير حاجة بيشغّل مرة ويقفل، و [[--watch]] هو اللي بيقعد، وبيعيد الاختبارات المتأثرة بالملفات اللي اتغيرت من آخر commit (عشان كده محتاج Git).

jest اتعمل أيام CommonJS ([[require]]). لو مشروعك ES Modules ([[import]] و [["type": "module"]])، إما Babel أو ts-jest يحوّلوا الكود، أو تشغّل Node بـ [[--experimental-vm-modules]] فـ jest يستخدم دعم ESM اللي في Node. والمتغير [[NODE_OPTIONS]] بيوصّل الفلاج ده لـ Node اللي jest شغال جواه.

الشكل [[VAR=value command]] بتاع bash، ومبيشتغلش في CMD ولا PowerShell. [[cross-env]] بيعمل نفس الحاجة على أي نظام، فلو في الفريق حد على ويندوز حطه في السكربت.

[[--runInBand]] بيشغّل الملفات واحد ورا التاني في نفس الـ process بدل workers متوازية. أبطأ، بس بيحل مشاكل الاختبارات اللي بتستخدم نفس الداتابيز، ومفيد في CI على ماكينة ضعيفة.`,
            when: "مشروع موجود بـ jest: كمّل بيه. مشروع جديد بـ Vite أو TypeScript: vitest أسهل (نفس الـ API تقريبًا، وبيفهم ESM و TS من غير إعداد).",
            mistakes: R`في مشروع حقيقي سكربت الاختبار كان [[NODE_OPTIONS=--experimental-vm-modules jest]]، وده شغال على لينكس وماك، بس على ويندوز بيقع بـ «'NODE_OPTIONS' is not recognized»: الحل cross-env. واختبارات بتفتح اتصال داتابيز أو server ومتقفلهوش، فـ jest يفضل معلّق بعد ما يخلص ويطبع «did not exit»: اقفل الاتصال في [[afterAll]]، و [[--detectOpenHandles]] بيقولك مين اللي فاضل مفتوح.`
          },
          teach: R`## الفكرة

[[jest]] بيعمل نفس شغل vitest: يلاقي ملفات [[*.test.js]] ويشغّلها. الفرق الكبير إنه اتعمل أيام CommonJS ([[require]])، فمشروع بـ [[import]] محتاج حاجة زيادة. وأغلب الدرس عن الحاجة دي.

اتجرّب بـ Jest 30.5 على ويندوز (Node 24.19) وعلى لينكس [[node:22-slim]] في Docker، في مشروع [[package.json]] فيه [["type": "module"]]، وملفات الحل: [[sum.js]] و [[sum.test.js]]، وزيادة عليهم [[src/auth/token.test.js]] فيه اختبارين: [["accepts fresh token"]] و [["rejects expired token"]].

---

## ١. [[npx jest]]

عكس vitest، [[jest]] من غير حاجة بيشغّل مرة ويقفل. بس على المشروع ده:

~~~text الناتج
FAIL ./sum.test.js
  ● Test suite failed to run

    Must use import to load ES Module: ~/jst/sum.test.js

    The file contains ESM syntax (import/export) that could not be executed as CommonJS. Either:
      - Configure a transform (e.g. babel-jest) that compiles this file to CommonJS
      - If the file is in "node_modules", allow it to be transformed by adjusting "transformIgnorePatterns"
      - Use Node v24.9+ where Jest supports require(esm) natively

Test Suites: 1 failed, 1 total
Tests:       0 total
~~~

[[Test suite failed to run]] معناها إن الملف نفسه ماتحمّلش، فولا اختبار اتشغّل ([[Tests: 0 total]]). jest حاول يقرا الملف كـ CommonJS ولقى [[import]]. ونفس الرسالة طلعت على لينكس (Node 22). ولاحظ إن الاقتراح التالت (Node 24.9+) ما نفعش هنا مع إن الجهاز عليه 24.19، لأن ملف الاختبار نفسه ESM.

---

## ٢. [[NODE_OPTIONS=--experimental-vm-modules npx jest]]

من جوه لبرة:

1. [[--experimental-vm-modules]]: فلاج لـ Node بيفتح دعم ES Modules في الـ VM اللي jest بيشغّل فيه كل ملف اختبار.
2. [[NODE_OPTIONS]]: متغير بيئة، أي فلاجات فيه Node بيضيفها لنفسه أول ما يشتغل. محتاجينه لأن jest هو اللي بيشغّل Node، مش احنا.
3. [[VAR=value command]]: شكل bash، يعني «حط المتغير ده للأمر ده بس».

~~~text الناتج (Git Bash ولينكس)
(node:30672) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use $__bt node --trace-warnings ...$__bt to show where the warning was created)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
~~~

الـ [[ExperimentalWarning]] تحذير عادي مش خطأ، والرقم [[30672]] هو رقم الـ process (PID) وبيتغير كل مرة.

### الشكل ده على ويندوز

~~~text PowerShell 7
NODE_OPTIONS=--experimental-vm-modules: The term 'NODE_OPTIONS=--experimental-vm-modules' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

~~~text CMD
'NODE_OPTIONS' is not recognized as an internal or external command,
operable program or batch file.
~~~

و Windows PowerShell 5.1 طلّع رسالة شبهها ([[is not recognized as the name of a cmdlet]]). يعني الشكل ده bash بس. والمكافئ في PowerShell:

~~~powershell
$env:NODE_OPTIONS = "--experimental-vm-modules"; npx jest
~~~

اشتغل وطبع [[Tests: 1 passed, 1 total]]. بس المتغير بيفضل موجود لحد ما تقفل نافذة الترمنال دي.

---

## ٣. [[npx cross-env NODE_OPTIONS=--experimental-vm-modules jest]]

[[cross-env]] باكدج صغيرة ([[npm i -D cross-env]]) بتحط المتغير وتشغّل الأمر بنفسها، فالشكل واحد على كل الأنظمة. اشتغلت في Git Bash وفي PowerShell:

~~~text الناتج
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
~~~

وده الشكل اللي يتكتب في [[scripts]] لو فيه حد في الفريق على ويندوز، لأن npm على ويندوز بيشغّل السكربتات بـ CMD.

---

## ٤. [[npx jest src/auth -t "rejects expired token"]]

(وكل اللي جاي اتشغّل والـ [[NODE_OPTIONS]] متظبط.) [[src/auth]] بيفلتر الملفات بالمسار، و [[-t]] بيفلتر الاختبارات بالاسم، زي vitest. ده في ترمنال تفاعلي بـ [[--verbose]] (كل اختبار في سطر):

~~~text الناتج
PASS src/auth/token.test.js
  ✓ rejects expired token (3 ms)
  ○ skipped accepts fresh token

Test Suites: 1 passed, 1 total
Tests:       1 skipped, 1 passed, 2 total
Ran all test suites matching src/auth with tests matching "rejects expired token".
~~~

[[○ skipped]] اختبار في نفس الملف بس اسمه مش مطابق. وآخر سطر بيأكدلك الفلترين اللي استخدمتهم.

### شكل الفشل

غيّرت [[a + b]] لـ [[a - b]]:

~~~text الناتج
FAIL ./sum.test.js
  ● adds

    expect(received).toBe(expected) // Object.is equality

    Expected: 4
    Received: 0

    > 3 |   expect(sum(2, 2)).toBe(4);
        |                     ^
~~~

[[●]] قبل اسم الاختبار اللي وقع، و [[Expected]] المتوقع و [[Received]] اللي جه، والسهم على السطر.

---

## ٥. [[npx jest --watch]]

[[--watch]] بيعيد الاختبارات المتأثرة بالملفات اللي اتغيرت من آخر commit، فمحتاج Git يعرف إيه اللي اتغير. في فولدر مش Git repo:

~~~text الناتج
--watch is not supported without git/hg, please use --watchAll
~~~

[[hg]] هو Mercurial (نظام تاني زي Git). و [[--watchAll]] بيعيد كل الاختبارات مع كل حفظ من غير Git.

---

## ٦. [[npx jest --runInBand]]

jest العادي بيفتح workers (كذا process) ويوزّع الملفات عليهم بالتوازي. [[--runInBand]] (واختصاره [[-i]]) بيشغّلهم واحد ورا التاني في process واحد:

~~~text الناتج
Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Time:        0.508 s, estimated 1 s
~~~

النتيجة نفسها، والفرق إن مفيش ملفين بيشتغلوا في نفس اللحظة. [[estimated 1 s]] تقدير jest للوقت من التشغيلات اللي فاتت.

---

## الخلاصة

| الأمر | بيعمل إيه | ملاحظة |
|---|---|---|
| [[jest]] | مرة واحدة | مشروع [[import]] بيقع بـ [[Must use import to load ES Module]] |
| [[jest --watch]] | يعيد مع كل حفظ | محتاج Git، وإلا [[--watchAll]] |
| [[jest path -t "name"]] | بالمسار وبالاسم | زي vitest |
| [[--runInBand]] | ملف ورا ملف | لما الاختبارات بتتخانق على داتابيز |
| [[NODE_OPTIONS=... jest]] | ESM في jest | bash بس |
| [[cross-env NODE_OPTIONS=... jest]] | نفسه | أي نظام |

| | vitest | jest |
|---|---|---|
| الأمر من غير حاجة | watch | مرة واحدة |
| [[import]] و TypeScript | جاهزين | محتاج Babel أو [[--experimental-vm-modules]] |
| التغطية | [[@vitest/coverage-v8]] | جواه |`,
          lines: [
            "شغّل كل الاختبارات مرة واحدة.",
            "سيبه شغال ويعيد الاختبارات المتأثرة مع كل حفظ.",
            "ملفات src/auth بس، واختبار باسم معين.",
            "شغّل الملفات واحد ورا التاني مش بالتوازي.",
            "شغّل jest على كود ES Modules (bash بس).",
            "نفسه بس بيشتغل على ويندوز كمان."
          ],
          sol: R`مع jest 30 على Node 22 في مشروع [["type": "module"]]:

[[FAIL ./sum.test.js]] و [[Test suite failed to run]] و [[Must use import to load ES Module: .../sum.test.js]]، وتحته إقتراحات: Babel، أو [[transformIgnorePatterns]]، أو Node 24.9 وأحدث. في jest 29 وأقدم الرسالة المعروفة كانت [[SyntaxError: Cannot use import statement outside a module]]. نفس السبب: jest بيحاول يشغّل الملف كـ CommonJS.

مع [[NODE_OPTIONS=--experimental-vm-modules npx jest]]: [[ExperimentalWarning: VM Modules is an experimental feature]] (عادي) وبعدها [[Tests: 1 passed, 1 total]].

الغلط الشائع إنك تحط [[NODE_OPTIONS=...]] في سكربت package.json وزميلك على ويندوز CMD يقع بـ [['NODE_OPTIONS' is not recognized]]؛ دا شغل [[cross-env]]. وفي ملفات الـ ESM لو استخدمت [[jest.fn()]] أو [[jest.mock()]] من غير import هتاخد [[jest is not defined]]: اعمل [[import { jest } from "@jest/globals";]].`,
          solCode: R`// package.json: "type": "module"
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from "./sum.js";
test("adds", () => {
  expect(sum(2, 2)).toBe(4);
});

// الترمنال
npx jest
NODE_OPTIONS=--experimental-vm-modules npx jest`
        }
      ]
    }
]);
