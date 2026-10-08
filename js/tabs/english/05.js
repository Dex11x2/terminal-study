// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "commit messages",
      l: 2,
      n: "سطر عنوان قصير بالـ imperative، وجسم بيقول ليه، و Conventional Commits، و ٢٤ مثال قبل وبعد",
      items: [
        {
          cmd: "commit message كويس",
          title: "شكل الـ commit message الكويس: عنوان قصير وسطر فاضي وجسم بيقول ليه",
          desc: R`الـ commit message ليها شكل ثابت متفق عليه من أيام git الأولى: سطر عنوان قصير (حوالي ٥٠ حرف، وأقصى حد مقبول تقريبًا ٧٢)، وبعده سطر فاضي، وبعده جسم (اختياري) بيشرح [[why]] (ليه) مش [[what]] (إيه)، لأن «إيه» باين في الـ diff.

الـ git tutorial الرسمي بيقول بالنص: [[it's a good idea to begin the commit message with a single short (no more than 50 characters) line summarizing the change, followed by a blank line and then a more thorough description]]. والسطر الأول ده هو الـ title اللي بيظهر في [[git log --oneline]] وفي GitHub وفي أي أداة.

قواعد العنوان: فعل imperative في الأول ([[Fix]] و [[Add]] و [[Remove]] و [[Update]] و [[Rename]] و [[Refactor]])، من غير نقطة في الآخر، ومحدد (فين وإيه). والجسم: جمل عادية بالـ present أو past، سطور حوالي ٧٢ حرف.`,
          example: R`Fix cart total when a coupon is removed

The total was computed once when the coupon was applied and never
recalculated, so removing the coupon kept the discount. Recalculate
the total in the cart reducer instead of in the coupon handler.

Closes #42`,
          try: R`خد تغيير عملته قريب (أو اعمل تغيير صغير) واكتب commit بالشكل ده: [[git commit]] من غير [[-m]] عشان يفتحلك المحرر، واكتب عنوان أقل من ٥٠ حرف، وسطر فاضي، وجملتين «ليه». بعدها [[git log -1]] وشوف الشكل. ولو غلطت في الرسالة: [[git commit --amend]] (قبل الـ push بس).`,
          flag: "script",
          deep: {
            why: "بعد ٦ شهور، الـ commit message هي الحاجة الوحيدة اللي هتقولك (أو لزميلك) ليه الكود ده كده. [[git log]] و [[git blame]] بيوصلوك للـ commit، ولو الرسالة «fix» مش هتفيدك بحاجة. وفي الانترفيو وفي GitHub profile، الـ history بيبان.",
            how: R`الجسم بيجاوب ٣ أسئلة: المشكلة كانت إيه؟ ليه حصلت؟ الحل ده ليه؟ مثال: [[The total was computed once ... and never recalculated]] (السبب)، [[so removing the coupon kept the discount]] (الأثر)، [[Recalculate the total in ...]] (الحل بالـ imperative).

كلمات مفيدة للجسم: [[Previously, ...]] = قبل كده، و [[Now, ...]] = دلوقتي، و [[so that ...]] = عشان، و [[instead of]] = بدل، و [[This caused ...]] = ده سبب، و [[This avoids ...]] = ده بيتجنب، و [[Note that ...]] = خد بالك إن.

والـ footer في الآخر: [[Closes #42]] يربط الـ issue ويقفلها لما يتدمج (درس [[Closes #12]] في «تاب Git»)، و [[Co-authored-by:]] لو حد شاركك.

ومحتاج جسم إمتى؟ لما التغيير مش واضح من العنوان: bug fix، أو قرار تصميم، أو حاجة غريبة. تغيير تافه ([[Fix typo in README]]) عنوان كفاية.`,
            when: "كل commit. ولو الفريق بيعمل squash merge، عنوان الـ PR بيبقى هو الـ commit، فنفس القواعد على عنوان الـ PR.",
            mistakes: R`[[fix]] و [[update]] و [[wip]] و [[changes]] و [[asdf]] و [[final]] و [[final2]]: مفيش معلومة. وعنوان طويل جدًا فيه كل حاجة. وتشرح «إيه» في الجسم (غيّرت السطر ده) بدل «ليه». و [[Fixed a bug where the user was not able to see the cart when he was logged in]] طويل وبالماضي؛ الأحسن [[Show cart for logged-in users]].`
          },
          teach: R`## الرسالة ٣ أجزاء ومفصولين بسطر فاضي

~~~text
Fix cart total when a coupon is removed          ← العنوان (subject)
                                                 ← سطر فاضي
The total was computed once when the coupon ...  ← الجسم (body): ليه
                                                 ← سطر فاضي
Closes #42                                       ← الـ footer
~~~

---

## العنوان

| القاعدة | في المثال |
|---|---|
| فعل imperative في الأول | [[Fix]] |
| محدد: إيه وإمتى | [[cart total when a coupon is removed]] |
| قصير | ٣٩ حرف (أقل من ٥٠) |
| من غير نقطة | |

و [[when a coupon is removed]]: passive، «لما كوبون يتشال».

---

## الجسم: ٣ أسئلة

| السؤال | الجملة |
|---|---|
| حصل إيه وليه؟ | [[The total was computed once when the coupon was applied and never recalculated,]] |
| الأثر؟ | [[so removing the coupon kept the discount.]] |
| الحل؟ | [[Recalculate the total in the cart reducer instead of in the coupon handler.]] |

- [[was computed]] و [[was applied]]: passive ماضي، لأن المهم إيه اللي حصل للإجمالي.
- [[never recalculated]]: [[re-]] = تاني.
- [[so]] = «فـ» (نتيجة).
- [[instead of]] = بدل.
- السطور مكسورة حوالي ٧٠ حرف عشان تتقري في الترمنال.

---

## نشوفه في git

عملت الـ commit ده في repo تجريبي (Git 2.56 على ويندوز):

~~~text الناتج: git log -1
commit f4b8a41b4092c17c52dfc568ef23c572be78a478
Author: Sara <sara@example.com>

    Fix cart total when a coupon is removed

    The total was computed once when the coupon was applied and never
    recalculated, so removing the coupon kept the discount. Recalculate
    the total in the cart reducer instead of in the coupon handler.

    Closes #42
~~~

~~~text الناتج: git log --oneline
f4b8a41 Fix cart total when a coupon is removed
160643e Add cart
~~~

[[--oneline]] بيعرض العنوان بس. عشان كده العنوان لازم يكفي لوحده، والسطر الفاضي هو اللي بيفصله عن الجسم.

---

## الخلاصة

- عنوان imperative قصير، وسطر فاضي، وجسم بيقول ليه.
- [[Closes #42]] في الـ footer بيقفل الـ issue لما يتدمج.
- تغيير تافه؟ عنوان كفاية.`,
          lines: [
            R`العنوان: imperative، أقل من ٥٠ حرف، من غير نقطة. «صلّح إجمالي السلة لما الكوبون يتشال».`,
            R`السبب: «الإجمالي كان بيتحسب مرة واحدة لما الكوبون يتطبّق ومكانش بيتحسب تاني،»`,
            R`الأثر: «فشيل الكوبون كان بيسيب الخصم». وبعدين الحل بالـ imperative: «احسب الإجمالي...»`,
            R`«... في الـ reducer بتاع السلة بدل الـ handler بتاع الكوبون».`,
            R`footer: يربط الـ issue رقم ٤٢ ويقفلها لما يتدمج في الـ default branch.`
          ],
          sol: R`شكل صح في [[git log -1]]:
[[Validate email format on the signup form]]
(سطر فاضي)
[[Invalid emails reached the API and returned a 500 from the database.]]
[[Check the format on the client so the user sees the error immediately.]]

راجع: العنوان [[Validate email format on the signup form]] = ٤٠ حرف، فعل imperative، من غير نقطة. والجسم بيقول ليه (كانت بتوصل للـ API وتعمل 500) مش إيه (ضفت regex).

لو [[git log -1]] ورّاك العنوان والجسم لازقين من غير سطر فاضي، git هيعتبرهم عنوان واحد طويل. صلّح بـ [[git commit --amend]] (لو لسه معملتش push).`
        },
        {
          cmd: "Conventional Commits",
          title: "Conventional Commits: feat و fix و chore و الـ scope و ! للـ breaking change",
          desc: R`Conventional Commits مواصفة (الإصدار 1.0.0) بتضيف «نوع» في أول الرسالة، عشان الأدوات تفهم الـ history: تعمل changelog لوحدها، وتحدد الإصدار الجاي (semver). الشكل من المواصفة:

[[<type>[optional scope]: <description>]] وبعدين سطر فاضي وجسم اختياري وسطر فاضي و footers اختيارية.

المواصفة بتعرّف نوعين بس: [[feat]] (ميزة جديدة، يقابلها MINOR) و [[fix]] (تصليح bug، يقابلها PATCH). وبتقول إن أنواع تانية مسموحة زي [[build]] و [[chore]] و [[ci]] و [[docs]] و [[style]] و [[refactor]] و [[perf]] و [[test]]. والـ breaking change (MAJOR) بيتعلّم بـ [[!]] قبل الـ [[:]] مباشرة، أو بـ footer اسمه [[BREAKING CHANGE:]] بحروف كبيرة.

والـ config المشهور [[@commitlint/config-conventional]] بيسمح بالأنواع دي بالظبط: [[build]] و [[chore]] و [[ci]] و [[docs]] و [[feat]] و [[fix]] و [[perf]] و [[refactor]] و [[revert]] و [[style]] و [[test]]، وبيطلب النوع بحروف صغيرة، والعنوان مش أكتر من ١٠٠ حرف، والوصف ميبدأش بحرف كبير ومينتهيش بنقطة.`,
          example: R`feat: add password reset by email
fix(auth): handle expired refresh token
docs: explain how to run migrations locally
refactor(cart): extract price calculation into a pure function
perf: cache product list for 60 seconds
test: add e2e test for checkout
ci: run tests on Node 22 and 24
chore: bump eslint to v9
feat!: drop support for Node 18
fix(api): return 409 when email is already registered
BREAKING CHANGE: the /users endpoint now requires authentication.`,
          try: R`في فولدر تجربة: [[npm i -D @commitlint/cli @commitlint/config-conventional]]، واعمل [[commitlint.config.mjs]] فيه [[export default { extends: ["@commitlint/config-conventional"] };]]. وبعدين جرّب: [[echo "Added login page" | npx commitlint]] و [[echo "feat: Added login page." | npx commitlint]] و [[echo "Feat: add x" | npx commitlint]] و [[echo "feat: add login page" | npx commitlint]]. اقرا كل رسالة خطأ وصلّح الـ commit لحد ما يعدّي.`,
          flag: "script",
          deep: {
            why: "مشاريع ومكتبات كتير بتطلبها (وبتفحصها في CI أو hook)، وأدوات زي release-please و semantic-release بتعتمد عليها. وحتى لو مش مطلوبة، النوع في الأول بيخلي الـ history سهل تقراه.",
            how: R`اختيار النوع: اليوزر هيحس بحاجة جديدة؟ [[feat]]. bug اتصلح؟ [[fix]]. الكود اتغير من غير ما السلوك يتغير؟ [[refactor]]. أسرع؟ [[perf]]. اختبارات بس؟ [[test]]. docs بس؟ [[docs]]. تنسيق (مسافات، فواصل)؟ [[style]] (مش CSS!). CI؟ [[ci]]. أدوات البناء أو الـ dependencies؟ [[build]] أو [[chore]]. غير كده؟ [[chore]].

الـ scope اختياري بين قوسين: اسم الجزء اللي اتغير ([[auth]] و [[cart]] و [[api]]). الفريق بيتفق على الأسماء.

الوصف بعد [[: ]] بحرف صغير (في config-conventional) وبالـ imperative ومن غير نقطة: [[feat: add ...]] مش [[feat: Added ...]].

إعداد الـ hook نفسه (husky و commitlint) في درس [[commitlint]] في «تاب فحص الكود».`,
            when: "لو المشروع بيستخدمها (بص على الـ history أو CONTRIBUTING.md)، أو في مشاريعك انت عشان الـ changelog.",
            mistakes: R`[[style]] بمعنى CSS: لأ، style = تنسيق الكود من غير تغيير معناه. تغيير CSS بيغيّر شكل الموقع = [[feat]] أو [[fix]]. و [[Feat:]] بحرف كبير. و [[feat: Added ...]] بالماضي. و [[fix: fix bug]]: مكرر ومفيهوش معلومة، [[fix(cart): keep discount after page reload]]. و [[BREAKING CHANGES:]] بالجمع أو بحروف صغيرة: المواصفة بتقول [[BREAKING CHANGE]] (و [[BREAKING-CHANGE]] مرادفها).`
          },
          teach: R`## الشكل: type(scope)!: description

~~~text
fix(auth): handle expired refresh token
~~~

| الحتة | في المثال | معناها |
|---|---|---|
| [[type]] | [[fix]] | نوع التغيير |
| [[(scope)]] | [[(auth)]] | الجزء اللي اتغير (اختياري) |
| [[!]] | (مش موجودة هنا) | breaking change |
| [[: ]] | | نقطتين ومسافة |
| [[description]] | [[handle expired refresh token]] | imperative، حرف صغير، من غير نقطة |

---

## الأنواع

| النوع | إمتى | يأثر على الإصدار (semver) |
|---|---|---|
| [[feat]] | ميزة جديدة | MINOR |
| [[fix]] | تصليح bug | PATCH |
| [[!]] أو [[BREAKING CHANGE:]] | حاجة هتكسر حد | MAJOR |
| [[docs]] و [[test]] و [[ci]] و [[perf]] و [[refactor]] و [[style]] و [[build]] و [[chore]] | الباقي | مش بالضرورة |

[[style]] = تنسيق الكود (مسافات وفواصل)، **مش** CSS.

---

## commitlint بيقول إيه

جرّبت [[@commitlint/cli@21.2.3]] مع [[config-conventional]] في Docker ([[node:22-slim]]) على ٤ رسايل:

~~~text الناتج: "Added login page"
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
~~~

[[subject]] = الوصف، و [[may not be empty]] = مينفعش يبقى فاضي. مفيش [[type:]] خالص، فالسطر كله متفهمش.

~~~text الناتج: "feat: Added login page."
✖   subject must not be sentence-case [subject-case]
✖   subject may not end with full stop [subject-full-stop]
~~~

[[sentence-case]] = أول حرف كبير زي أول جملة، و [[full stop]] = نقطة (بريطاني).

~~~text الناتج: "Feat: add x"
✖   type must be lower-case [type-case]
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]
~~~

[[lower-case]] = حروف صغيرة، و [[must be one of]] = لازم يبقى واحد من.

و [["feat: add login page"]] عدّت من غير أي سطر (exit code 0).

لاحظ إن رسايل commitlint نفسها بتستخدم [[must]] و [[may not]] و [[must not]].

---

## الخلاصة

- [[feat]] و [[fix]] أهم نوعين، و [[!]] للـ breaking.
- الوصف: imperative، حرف صغير، من غير نقطة.
- [[BREAKING CHANGE:]] بحروف كبيرة في الـ footer.`,
          lines: [
            R`feat = ميزة. «ضيف reset للباسورد بالإيميل».`,
            R`fix + scope (auth). «اتعامل مع refresh token خلصت مدته».`,
            R`docs. «اشرح إزاي تشغّل الـ migrations على جهازك».`,
            R`refactor. «طلّع حساب السعر في دالة pure». extract = تطلّع/تفصل.`,
            R`perf. «خزّن ليستة المنتجات ٦٠ ثانية».`,
            R`test. «ضيف اختبار e2e للـ checkout».`,
            R`ci. «شغّل الاختبارات على Node 22 و 24».`,
            R`chore. «رقّي eslint لـ v9». bump = ترفع رقم الإصدار.`,
            R`! = breaking change. «وقف دعم Node 18». drop = تبطّل.`,
            R`fix + scope api. «رجّع 409 لما الإيميل متسجل قبل كده».`,
            R`footer: BREAKING CHANGE بحروف كبيرة. «الـ /users دلوقتي محتاج تسجيل دخول».`
          ],
          sol: R`اللي هيطلعلك (commitlint 21، سبتمبر ٢٠٢٦):
[[Added login page]] ← [[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]]. «الوصف والنوع مينفعش يبقوا فاضيين». يعني مفيش [[type:]] في الأول.
[[feat: Added login page.]] ← [[✖ subject must not be sentence-case [subject-case]]] و [[✖ subject may not end with full stop [subject-full-stop]]]. «الوصف مينفعش يبدأ بحرف كبير» و «مينفعش ينتهي بنقطة».
[[Feat: add x]] ← [[✖ type must be lower-case [type-case]]] و [[✖ type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]]].
[[feat: add login page]] ← مفيش أي خطأ.

لاحظ إن رسايل commitlint نفسها بتستخدم [[must]] و [[may not]] و [[must not]]: درس «optional و defaults to». و [[full stop]] = نقطة (بريطاني)، و [[sentence-case]] = أول حرف كبير زي الجملة.`
        },
        {
          cmd: "٢٤ commit قبل وبعد",
          title: "٢٤ commit message حقيقي: الغلط والصح",
          desc: R`أحسن طريقة تتعلم بيها: تشوف commits وحشة وتشوف نسختها الكويسة، لحد ما عينك تتعود. دي أشهر أنماط الغلط عند المبتدئين (مش بس المصريين)، وجنب كل واحد النسخة الصح بشكل Conventional Commits.

الأنماط: رسالة فاضية من المعنى ([[fix]] و [[update]] و [[wip]])، وماضي بدل imperative ([[Added]] و [[Fixed]])، ورسالة طويلة جدًا في السطر الأول، ورسالة بتقول «إيه» مش «فين»، وعربي مكتوب بحروف إنجليزي، وكذا تغيير في commit واحد (قسّمه).`,
          example: R`Before: fix                              After: fix(cart): keep discount after page reload
Before: update                           After: docs: add setup steps to README
Before: wip                              After: feat(profile): add avatar upload (UI only)
Before: Added login page                 After: feat(auth): add login page
Before: Fixed the bug                    After: fix(api): return 404 for unknown product IDs
Before: changes                          After: refactor: rename getData to fetchOrders
Before: final version                    After: chore: remove debug logs
Before: final2                           After: fix: correct typo in checkout button
Before: fixed bug in login when user enters wrong password he gets 500 error instead of 401
After:  fix(auth): return 401 instead of 500 on wrong password
Before: sala7t el moshkla                After: fix(search): handle empty query
Before: Updated package.json             After: build: add zod dependency
Before: css                              After: fix(navbar): stop overlap on small screens
Before: tests                            After: test(cart): cover coupon removal
Before: fix eslint                       After: style: apply eslint autofix
Before: new feature                      After: feat(orders): export orders as CSV
Before: Merge fixes and new UI and API   After: split into three commits: fix(api) / feat(ui) / refactor(api)
Before: README                           After: docs: document environment variables
Before: speed                            After: perf(products): add index on category_id
Before: remove stuff                     After: chore: remove unused lodash dependency
Before: fix CI                           After: ci: use npm ci instead of npm install
Before: Update index.js                  After: fix(server): read PORT from environment
Before: added dark mode.                 After: feat(theme): add dark mode toggle
Before: hotfix!!!                        After: fix(payments): verify webhook signature
Before: security                         After: fix(auth): hash passwords with bcrypt instead of md5`,
          try: R`شغّل [[git log --oneline -30]] في أكبر مشروع عندك. اختار أوحش ١٠ رسايل واكتبلهم نسخة «After» بنفس الطريقة (افتح الـ commit بـ [[git show <hash>]] عشان تعرف اتغير إيه فعلًا). متعدّلش الـ history القديم على الـ main، ده تمرين كتابة بس.`,
          flag: "script",
          deep: {
            why: R`الـ history بتاعك على GitHub بيتقري: من الـ recruiters، ومن زمايلك، ومنك انت بعد سنة. و [[git log --oneline]] فيه رسايل واضحة = تقدر تلاقي أي تغيير في ثواني.`,
            how: R`الوصفة: [[type(scope): verb + what + (where/when)]].

أفعال بتنفع في الوصف: [[add]] و [[remove]] و [[fix]] مش كفاية لوحدها بس مع التفاصيل تنفع، و [[handle]] (تتعامل مع حالة)، و [[prevent]] (تمنع)، و [[allow]] (تسمح)، و [[show]] و [[hide]]، و [[rename]]، و [[move]]، و [[extract]]، و [[replace X with Y]]، و [[use X instead of Y]]، و [[return]]، و [[validate]]، و [[support]]، و [[cover]] (في الاختبارات)، و [[bump]] (إصدار)، و [[drop]] (وقف دعم)، و [[document]] (تكتب docs).

والـ bug fix الأحسن يوصف السلوك الصح الجديد مش الـ bug: [[return 401 instead of 500 on wrong password]] أحسن من [[fix 500 error]].

ولو محتاج «و» في العنوان ([[fix X and add Y]]) غالبًا دول commitين.`,
            when: "كل commit، وخصوصًا قبل ما تعمل push لـ branch هيتعمله review.",
            mistakes: R`تكتب commits كويسة في مشاريعك الشخصية بس وتكسل في الشغل (أو العكس). وتعدّل history الـ main بـ rebase عشان تجمّل الرسايل: متعملش كده على branch مشترك. وتكتب بالعربي بحروف إنجليزي ([[sala7t el moshkla]]): محدش هيعرف يدوّر بيها، وأي حد مش مصري مش هيفهمها.`
          },
          teach: R`## الوصفة: type(scope): فعل + إيه + (فين/إمتى)

كل «After» في الجدول ماشي على نفس الوصفة. نقسم الـ ٢٤ على نوع الغلط:

| نوع الغلط | أمثلة Before | الحل |
|---|---|---|
| مفيهاش معلومة | [[fix]] و [[update]] و [[wip]] و [[changes]] و [[final2]] | قول إيه اتغير فعلًا |
| ماضي بدل أمر | [[Added login page]] و [[Fixed the bug]] و [[added dark mode.]] | [[add]] و [[fix]] |
| اسم ملف أو أداة بس | [[Updated package.json]] و [[css]] و [[README]] | السلوك اللي اتغير |
| طويلة جدًا | [[fixed bug in login when user enters wrong password ...]] (٨٣ حرف) | [[fix(auth): return 401 instead of 500 on wrong password]] (٥٤ حرف) |
| عربي بحروف إنجليزي | [[sala7t el moshkla]] | [[fix(search): handle empty query]] |
| كذا حاجة في commit | [[Merge fixes and new UI and API]] | ٣ commits |
| النوع غلط | [[hotfix!!!]] | [[!]] = breaking، مش «مستعجل» |

---

## نفك ٣ أمثلة

~~~text
Before: css                              After: fix(navbar): stop overlap on small screens
~~~

CSS اتغيّر عشان يصلّح شكل بايظ، فالنوع [[fix]] مش [[style]]. و [[overlap]] = تداخل. و [[on small screens]] = إمتى.

~~~text
Before: fix eslint                       After: style: apply eslint autofix
~~~

هنا التنسيق بس اتغير من غير ما المعنى يتغير، فده [[style]] فعلًا.

~~~text
Before: security                         After: fix(auth): hash passwords with bcrypt instead of md5
~~~

[[hash X with Y instead of Z]]: الفعل والحاجة والأداة والبديل القديم.

---

## أفعال الوصف

| الفعل | معناه |
|---|---|
| [[handle]] | تتعامل مع حالة |
| [[prevent]] | تمنع |
| [[keep]] | تحافظ على |
| [[extract]] | تطلّع في حتة لوحدها |
| [[cover]] | تغطي (اختبارات) |
| [[bump]] | ترفع رقم إصدار |
| [[drop]] | توقف دعم |
| [[document]] | تكتب docs |

---

## الخلاصة

- الـ bug fix يوصف السلوك الصح الجديد، مش الـ bug.
- محتاج «and» في العنوان؟ غالبًا دول commitين.
- مش فاكر الـ commit عمل إيه؟ ده دليل إن رسالته كانت وحشة.`,
          lines: [
            "fix لوحدها ← فين وإيه.",
            "update ← النوع docs وإيه اللي اتضاف.",
            "wip = شغل مش خلصان ← قول اللي خلص فعلًا.",
            R`Added (ماضي) ← add (imperative) + scope.`,
            "Fixed the bug ← أنهي bug؟ السلوك الصح.",
            "changes ← الـ refactor بالظبط.",
            "final version ← اللي اتعمل فعلًا.",
            "final2 ← وصف التغيير.",
            "عنوان طويل جدًا بالماضي ومن غير فواصل...",
            "... ← نسخة قصيرة بتوصف السلوك الصح (٥٥ حرف تقريبًا).",
            "عربي بحروف إنجليزي ← إنجليزي واضح.",
            R`اسم ملف ← build + إيه اتضاف.`,
            R`css ← fix + الـ component + المشكلة. (مش style!)`,
            "tests ← test + بيغطي إيه. cover = يغطي.",
            R`fix eslint ← style (تنسيق من غير تغيير معنى). autofix = تصليح أوتوماتيك.`,
            "new feature ← أنهي feature.",
            "٣ حاجات في commit ← قسّمهم ٣ commits.",
            "README ← docs + اتوثّق إيه.",
            "speed ← perf + التغيير.",
            "stuff ← اسم الحاجة. unused = مش مستخدمة.",
            "fix CI ← ci + التغيير.",
            "Update index.js (رسالة GitHub الافتراضية) ← وصف حقيقي.",
            "ماضي ونقطة ← imperative من غير نقطة.",
            R`hotfix!!! ← الـ ! في Conventional Commits يعني breaking، مش «مستعجل». قول المشكلة.`,
            R`security ← إيه بالظبط. instead of = بدل.`
          ],
          sol: R`أمثلة لتحويل رسايل حقيقية بتتكرر:
[[Update App.jsx]] ← تفتح [[git show]] وتلاقي إنه ضاف loading spinner ← [[feat(ui): show spinner while products load]].
[[fix bug]] ← كان بيصلّح إن الفورم بيتبعت مرتين ← [[fix(checkout): prevent double submit]].
[[.]] أو [[..]] ← كان بيغيّر الـ port ← [[fix(server): read PORT from environment]].
[[responsive]] ← [[fix(layout): stack cards on screens under 640px]].
[[first commit]] على مشروع جديد: دي مقبولة فعلًا ([[chore: initial commit]] أو [[Initial commit]]).

لو لقيت نفسك مش عارف تكتب After لأنك مش فاكر الـ commit عمل إيه: ده بالظبط سبب إن الرسالة الأصلية كانت وحشة. ودي أحسن حجة تقنع بيها نفسك.`
        }
      ]
    },
    {
      t: "PRs و code review",
      l: 2,
      n: "عنوان ووصف PR بـ template، وتعليقات review مؤدبة وواضحة (سؤال ولا اقتراح ولا blocker)، وإزاي ترد على review",
      items: [
        {
          cmd: "وصف PR",
          title: "عنوان PR ووصفه: template فيه What و Why و How to test",
          desc: R`الـ PR هو «طلب» إن كودك يتدمج، والوصف هو اللي بيقنع المراجع ويوفر وقته. المراجع محتاج يعرف في دقيقة: إيه اتغير؟ ليه؟ يجرّبه إزاي؟ فيه حاجة خطيرة؟

العنوان: نفس قواعد الـ commit (imperative، محدد، وممكن Conventional Commits). لو الفريق بيعمل squash merge، العنوان ده هو اللي هيفضل في الـ history.

الوصف بقالب بسيط: [[## What]] إيه اتغير (نقط)، و [[## Why]] ليه (والـ issue)، و [[## How to test]] خطوات المراجع يجرّب، و [[## Screenshots]] لو فيه UI، و [[## Notes]] أي حاجة المراجع لازم يعرفها (حاجة مش متأكد منها، أو حاجة سبتها عن قصد لـ PR تاني). وجملة [[This PR ...]] بالـ present simple (مع الـ s).`,
          example: R`feat(orders): export orders as CSV
## What
- Add an "Export CSV" button to the orders page
- Add GET /api/orders/export, which streams a CSV file
## Why
Admins copy orders into Excel by hand every week (#118).
## How to test
1. Log in as admin@example.com
2. Open /admin/orders and click "Export CSV"
3. Open the file: it should have one row per order
## Notes
- Large exports are streamed, so memory stays flat.
- Filters are not applied yet; I'll add them in a follow-up PR.`,
          try: R`خد آخر PR عملته (أو branch عندك) واكتبله وصف بالقالب ده. وبعدين اعمل ملف [[.github/pull_request_template.md]] في repo بتاعك فيه العناوين دي بس، عشان GitHub يحطها لوحده في أي PR جديد.`,
          flag: "script",
          deep: {
            why: "المراجع مشغول، و PR من غير وصف بيستنى أيام أو بياخد review سطحي. الوصف الكويس = review أسرع وأدق، وبيبيّن إنك فاهم تغييرك. وفي الـ open source، PR من غير وصف ممكن يتقفل من غير ما حد يبص عليه.",
            how: R`جمل جاهزة:
[[This PR adds / fixes / removes / refactors ...]]
[[Closes #118]] أو [[Part of #118]] (لو مش بيخلّصها كلها).
[[No UI changes.]] أو [[No behavior change; this is a pure refactor.]]
[[I'm not sure about ...; happy to change it.]] = مش متأكد من كذا، ومعنديش مشكلة أغيّره.
[[Out of scope: ...]] = مش جزء من الـ PR ده.
[[Follow-up: ...]] = هيتعمل في PR جاي.
[[Breaking change: ...]] = حاجة هتكسر حد.
[[Reviewers: please focus on ...]] = ركزوا على كذا.

و [[Draft PR]] لما لسه مش جاهز بس عايز رأي بدري (شوف [[draft PR و التقسيم]] في «تاب هندسة البرمجيات»). و [[gh pr create]] بيفتح المحرر بالـ template (درس [[gh pr]] في «تاب Git»).`,
            when: "كل PR، حتى في مشاريعك الشخصية (بيبان في GitHub profile وبيتعلمك العادة).",
            mistakes: R`وصف فاضي أو «as discussed». و [[Please review my code]] من غير أي معلومة. وقايمة بكل ملف اتغير (ده باين في الـ diff). و PR فيه ٣٠ ملف و ٣ مواضيع مختلفة: قسّمه. و [[This PR add]] من غير s.`
          },
          teach: R`## الـ PR ده عنوان و ٤ أقسام

| الجزء | السؤال اللي في دماغ المراجع |
|---|---|
| العنوان | إيه ده في سطر؟ |
| [[## What]] | إيه اللي اتغير؟ |
| [[## Why]] | ليه؟ |
| [[## How to test]] | أجرّبه إزاي؟ |
| [[## Notes]] | فيه حاجة لازم أعرفها؟ |

---

## الجمل حتة حتة

~~~text
feat(orders): export orders as CSV
~~~

نفس قواعد الـ commit، لأنه لو الفريق بيعمل squash merge، ده اللي هيفضل في الـ history.

~~~text
- Add an "Export CSV" button to the orders page
- Add GET /api/orders/export, which streams a CSV file
~~~

نقط imperative. و [[, which streams]] = «اللي بيعمل stream»: [[which]] بتوصف اللي قبلها، والـ s لأن الفاعل مفرد.

~~~text
Admins copy orders into Excel by hand every week (#118).
~~~

السبب بالـ present simple (حاجة بتحصل كل أسبوع). و [[by hand]] = يدوي، و [[(#118)]] رقم الـ issue.

~~~text
1. Log in as admin@example.com
2. Open /admin/orders and click "Export CSV"
3. Open the file: it should have one row per order
~~~

خطوات imperative، وآخر خطوة فيها **النتيجة المتوقعة** بـ [[should]]: «المفروض يبقى فيه». و [[per order]] = لكل أوردر.

~~~text
- Large exports are streamed, so memory stays flat.
- Filters are not applied yet; I'll add them in a follow-up PR.
~~~

- [[are streamed]] passive. و [[stays flat]] = بتفضل ثابتة مش بتزيد.
- [[not ... yet]] = لسه لأ. و [[follow-up PR]] = PR بعده. و [[;]] بتربط جملتين مرتبطين.

---

## جمل جاهزة

| الجملة | معناها |
|---|---|
| [[This PR adds ...]] | الـ PR ده بيضيف (بالـ s) |
| [[Closes #118]] / [[Part of #118]] | بيقفل الـ issue / جزء منها |
| [[No behavior change; this is a pure refactor.]] | مفيش تغيير في السلوك |
| [[I'm not sure about ...; happy to change it.]] | مش متأكد، ومعنديش مانع أغيّر |

---

## الخلاصة

- What و Why و How to test و Notes.
- How to test فيه نتيجة متوقعة، مش خطوات بس.
- [[.github/pull_request_template.md]] بيخلي GitHub يحط القالب لوحده.`,
          lines: [
            "العنوان: Conventional Commits، imperative، محدد.",
            R`«ضيف زرار Export CSV في صفحة الأوردرات».`,
            R`«ضيف endpoint بيعمل stream لملف CSV». which = اللي.`,
            R`السبب ورقم الـ issue: «الأدمنز بينسخوا الأوردرات لـ Excel بإيدهم كل أسبوع». by hand = يدوي.`,
            R`خطوة ١: «سجّل دخول بالأدمن».`,
            R`خطوة ٢: «افتح الصفحة ودوس Export CSV».`,
            R`خطوة ٣ ومعاها النتيجة المتوقعة: «المفروض يبقى فيه صف لكل أوردر». should = المتوقع.`,
            R`«الـ exports الكبيرة بتتعمل stream، فالذاكرة بتفضل ثابتة». flat = مش بتزيد.`,
            R`«الفلاتر لسه مش مطبّقة، هضيفها في PR بعده». follow-up = متابعة.`
          ],
          sol: R`مثال على PR صغير:
[[fix(auth): return 401 instead of 500 on wrong password]]
[[## What]]
[[- Catch InvalidPasswordError in the login route and return 401]]
[[- Add a test for the wrong-password case]]
[[## Why]]
[[Wrong passwords crashed the handler and returned a 500 (#57).]]
[[## How to test]]
[[1. npm test]]
[[2. POST /api/login with a wrong password: the response should be 401 {"error": "Invalid email or password"}]]
[[## Notes]]
[[- The message is the same for a wrong email, so we don't reveal which emails exist.]]

والـ template في [[.github/pull_request_template.md]] فيه العناوين بس ([[## What]] و [[## Why]] و [[## How to test]] و [[## Notes]])، و GitHub بيحطه في خانة الوصف أوتوماتيك لما تفتح PR.

راجع: كل جملة فيها s لو الفاعل مفرد، والـ How to test فيه نتيجة متوقعة ([[should be 401]]) مش خطوات بس.`
        },
        {
          cmd: "تعليقات review",
          title: "تكتب تعليق review مؤدب وواضح: nit و suggestion و blocker و سؤال",
          desc: R`تعليق الـ review الكويس بيقول ٣ حاجات: المشكلة، وليه مهمة، وقد إيه مهمة (لازم تتصلح قبل الدمج، ولا رأي). وبيتكتب بلغة بتتكلم عن الكود مش عن الشخص.

كتير من الفرق بتستخدم «labels» في أول التعليق عشان الدرجة تبان: [[nit:]] (nitpick) حاجة صغيرة جدًا ومش لازمة، و [[suggestion:]] اقتراح، و [[question:]] سؤال بجد مش هجوم، و [[issue:]] أو [[blocking:]] لازم تتصلح قبل الدمج، و [[praise:]] مدح لحاجة حلوة. (فيه مواصفة اسمها Conventional Comments بتقترح الشكل ده.)

الأسلوب: أسئلة واقتراحات بدل أوامر ([[What do you think about ...?]] بدل [[Change this]])، و [[we]] بدل [[you]] ([[We could ...]])، واقتراح الحل مع المشكلة. التفاصيل غير اللغوية في درس [[تعليق review]] في «تاب هندسة البرمجيات».`,
          example: R`nit: typo in the variable name, "recieve" -> "receive".
suggestion: What do you think about extracting this into a helper? It's used in three places.
question: Is there a reason we fetch the user twice here? I might be missing something.
blocking: This query builds SQL from user input, so it's open to SQL injection. Could we use a parameterized query instead?
issue: If the API returns 404, $__btuser$__bt is undefined and the page crashes. Should we handle that case?
praise: Nice test coverage on the edge cases!
Wrong: Why did you do this? This is wrong.
Right: I'm not sure this handles an empty list. What happens if items is []?
Wrong: Change it to map.
Right: Could we use map() here? It would avoid mutating the array.`,
          try: R`خد PR لزميل (أو PR قديم بتاعك، أو PR في مشروع open source) واكتب ٣ تعليقات: واحد [[nit:]] وواحد [[question:]] وواحد [[suggestion:]] أو [[blocking:]]. كل واحد فيه المشكلة وليه والحل المقترح، ومن غير ولا جملة فيها [[you are wrong]].`,
          flag: "script",
          deep: {
            why: "النص في الـ review بيتقري من غير نبرة صوت ولا تعبيرات وش، فجملة عادية بالعربي ممكن تتقري بالإنجليزي كأنها هجوم. والإنجليزي المهني بيعتمد على «التلطيف» (softening) بشكل كبير. لو اتعلمته، زمايلك هيحبوا الـ reviews بتاعتك.",
            how: R`عبارات التلطيف:
[[Could we ...?]] و [[What do you think about ...?]] و [[Have you considered ...?]] = اقتراح.
[[I might be missing something, but ...]] = يمكن أنا اللي فاتني حاجة.
[[I'm not sure ...]] و [[I wonder if ...]] = شك مؤدب.
[[It might be worth ...]] = ممكن يستاهل.
[[Not a blocker, but ...]] و [[Optional:]] = مش لازم.
[[Feel free to ignore]] = لو مش عاجبك سيبه.
[[Happy to discuss]] = نتكلم لو حابب.

وعبارات الحزم (لما الموضوع مهم بجد): [[This needs to be fixed before we merge because ...]] و [[This will break ... in production]]. الحزم مش قلة أدب لو فيه سبب واضح.

و [[LGTM]] = Looks Good To Me (موافقة). و [[PTAL]] = Please Take Another Look. و [[WDYT]] = What Do You Think. و [[IMO]] / [[IMHO]] = In My (Humble) Opinion. و [[FYI]] = For Your Information. و [[TL;DR]] = الخلاصة.

لاحظ في المثال: الـ [[issue:]] كاتب السيناريو ([[If the API returns 404]]) والنتيجة ([[the page crashes]]). ده بيخلي التعليق مقنع مش رأي.`,
            when: "أي review، وكمان في تعليقات الـ issues والـ design docs.",
            mistakes: R`[[Why you did this?]]: غلط grammar ([[Why did you do this?]]) وكمان بيتقري هجومي. و [[This is wrong]] من غير سبب. و [[Please fix]] على كل حاجة من غير ما تفرّق بين nit و blocker، فالمراجَع بيتوه. و [[Kindly]] كتير: بتبان رسمية زيادة. وتعليقات بالـ ALL CAPS: بتتقري زعيق.`
          },
          teach: R`## التعليق = label + المشكلة + ليه + اقتراح

~~~text
blocking: This query builds SQL from user input, so it's open to SQL injection. Could we use a parameterized query instead?
~~~

| الحتة | في المثال |
|---|---|
| الدرجة (label) | [[blocking:]] |
| المشكلة | [[This query builds SQL from user input]] |
| ليه مهمة | [[so it's open to SQL injection]] |
| الاقتراح كسؤال | [[Could we use a parameterized query instead?]] |

---

## الـ labels بالترتيب من الأخف للأتقل

| الـ label | معناه | لازم يتصلح؟ |
|---|---|---|
| [[praise:]] | مدح | لأ |
| [[nit:]] | حاجة صغيرة جدًا (nitpick) | لأ |
| [[suggestion:]] | اقتراح | لأ |
| [[question:]] | سؤال حقيقي | رد |
| [[issue:]] | مشكلة | غالبًا |
| [[blocking:]] | لازم قبل الدمج | آه |

---

## أدوات التلطيف في الجمل

| الجملة | الأداة | بتعمل إيه |
|---|---|---|
| [[What do you think about extracting this into a helper?]] | [[What do you think about + ing]] | اقتراح كسؤال |
| [[I might be missing something.]] | [[might]] | «يمكن أنا اللي فاتني» |
| [[Could we use map() here?]] | [[Could we]] | [[we]] بدل [[you]] |
| [[Should we handle that case?]] | [[Should we]] | سؤال بدل أمر |
| [[It would avoid mutating the array.]] | [[would]] | الفايدة |

---

## غلط وصح

| غلط | ليه | صح |
|---|---|---|
| [[Why did you do this? This is wrong.]] | هجوم ومن غير سبب | [[I'm not sure this handles an empty list. What happens if items is empty?]] |
| [[Change it to map.]] | أمر من غير سبب | [[Could we use map() here? It would avoid mutating the array.]] |

و [[issue:]] اللي في المثال بيكتب سيناريو ([[If the API returns 404]]) ونتيجة ([[the page crashes]]): ده بيخلي التعليق حقيقة مش رأي.

---

## الخلاصة

- label عشان الدرجة تبان.
- المشكلة وليه واقتراح، بـ [[we]] وأسئلة.
- [[LGTM]] = Looks Good To Me، و [[PTAL]] = Please Take Another Look.`,
          lines: [
            R`nit = حاجة صغيرة. «غلطة إملائية في اسم المتغير». -> = تبقى.`,
            R`suggestion بسؤال: «إيه رأيك نطلّع ده في helper؟ مستخدم في ٣ أماكن».`,
            R`question حقيقي: «فيه سبب إننا بنجيب اليوزر مرتين؟ يمكن فاتني حاجة».`,
            R`blocking + السبب + الحل: «ده بيبني SQL من إدخال اليوزر فمعرّض لـ SQL injection. ممكن نستخدم parameterized query؟»`,
            R`issue + سيناريو: «لو الـ API رجّع 404، user هيبقى undefined والصفحة هتقع. نتعامل مع الحالة دي؟»`,
            R`praise = مدح. «تغطية حلوة للحالات الطرفية». edge cases = الحالات النادرة.`,
            R`غلط: هجومي ومن غير سبب.`,
            R`صح: شك مؤدب + سيناريو محدد.`,
            R`غلط: أمر من غير سبب.`,
            R`صح: اقتراح + فايدته. mutate = تعدّل الأصل.`
          ],
          sol: R`أمثلة لـ ٣ تعليقات صح:
[[nit: "lenght" -> "length" in line 24.]]
[[question: Is the setTimeout here needed? I might be missing something, but the data is already loaded at this point.]]
[[suggestion: What do you think about moving the price formatting into a formatPrice() helper? The same logic is in Cart.tsx and Checkout.tsx.]]
أو لو فيه مشكلة حقيقية:
[[blocking: The API key is hardcoded in this file and will end up in the client bundle. Could we move it to the backend and call it through our API?]]

راجع كل تعليق: فيه المشكلة؟ فيه ليه مهمة؟ فيه اقتراح؟ باين قد إيه مهم (nit/blocking)؟ مفيش [[you]] كتير؟ لو كتبت [[You forgot to handle errors]]، خليها [[It looks like errors aren't handled here. Should we add a try/catch?]].`
        },
        {
          cmd: "ترد على review",
          title: "ترد على تعليقات الـ review: Done و Good catch و تختلف بأدب",
          desc: R`لما حد يراجع كودك، كل تعليق محتاج رد (حتى لو كلمة)، عشان المراجع يعرف إنك شفته وعملت إيه. الردود بتتقسم ٤ أنواع: وافقت وصلّحت، أو وافقت بس هتعمله بعدين، أو عندك سؤال، أو مختلف معاه وعندك سبب.

والاختلاف عادي ومطلوب، بس بسبب مش بإحساس: [[I'd prefer to keep it because ...]] مع سبب تقني، أو اقتراح حل وسط. ولو النقاش طول (أكتر من ردين تلاتة)، اقترح مكالمة: [[Happy to jump on a quick call]].`,
          example: R`Good catch, thanks! Fixed in a1b2c3d.
Done.
Makes sense. I extracted it into formatPrice() in the latest commit.
Good point. I'll handle that in a follow-up PR (#131) to keep this one small.
I'm not sure I understand. Do you mean moving the check to the middleware?
I'd prefer to keep it inline, because it's only used here and a helper would hide the query.
You're right, I missed that case. Added a test for it.
I tried that first, but it caused a re-render loop. Happy to discuss if you see another way.
Thanks for the review! I addressed all comments. PTAL.`,
          try: R`تخيّل إن جالك التعليقات الـ ٦ اللي في درس «تعليقات review» على PR بتاعك. اكتب رد لكل واحد: اتنين موافقة وتصليح، وواحد «هعمله في PR تاني»، وواحد سؤال توضيح، وواحد اختلاف بسبب تقني، وآخر رسالة للمراجع بعد ما خلصت.`,
          flag: "script",
          deep: {
            why: "الرد بيقفل الحلقة: المراجع ميضطرش يدوّر إذا كنت صلحت ولا لأ. والطريقة اللي بترد بيها على النقد بتبني سمعتك في الفريق أكتر من الكود نفسه.",
            how: R`عبارات:
موافقة: [[Good catch!]] و [[Good point.]] و [[Makes sense.]] و [[You're right.]] و [[Done.]] و [[Fixed in <commit>.]] و [[Updated.]].
تأجيل: [[I'll handle that in a follow-up.]] و [[Created #131 to track it.]] و [[Out of scope for this PR, but good idea.]]
سؤال: [[Could you clarify ...?]] و [[Do you mean ...?]] و [[Just to make sure I understand: ...]]
اختلاف: [[I see your point, but ...]] و [[I'd prefer to ... because ...]] و [[I considered that, but ...]] و [[I tried that, but ...]]
خلصت: [[I addressed all comments.]] و [[Ready for another look.]] و [[PTAL]].

و [[address]] هنا مش «عنوان»، دي «اتعاملت مع». و [[resolve]] الـ thread على GitHub: خليه للمراجع لو التعليق مهم (شوف عادة الفريق). وتفاصيل التعامل مع الـ review نفسه في درس [[تستقبل review]] في «تاب هندسة البرمجيات».`,
            when: "بعد أي review، قبل ما تطلب المراجعة تاني.",
            mistakes: R`تصلّح من غير ما ترد. أو ترد [[ok]] على كل حاجة حتى اللي مش موافق عليها. أو تاخدها شخصي وترد بدفاع طويل. و [[I will fix it later]] من غير issue: «later» بتبقى «never». و [[I have fixed]] من غير مفعول: [[I fixed it]] أو [[Fixed.]].`
          },
          teach: R`## ٤ أنواع ردود

| النوع | من المثال |
|---|---|
| وافقت وصلّحت | [[Good catch, thanks! Fixed in a1b2c3d.]] و [[Done.]] و [[You're right, I missed that case. Added a test for it.]] |
| وافقت بس بعدين | [[Good point. I'll handle that in a follow-up PR (#131) to keep this one small.]] |
| سؤال | [[I'm not sure I understand. Do you mean moving the check to the middleware?]] |
| مختلف بسبب | [[I'd prefer to keep it inline, because it's only used here ...]] |

---

## الجمل حتة حتة

- [[Good catch]] = «لقطة حلوة»: لما المراجع لقى حاجة فاتتك.
- [[Fixed in a1b2c3d.]]: الفاعل محذوف ([[It was fixed]])، والـ hash عشان يلاقيه.
- [[Makes sense.]] = «منطقي» (الفاعل [[It]] محذوف، والـ s موجودة).
- [[to keep this one small]] = «عشان ده يفضل صغير». [[this one]] = الـ PR ده.
- [[Do you mean + ing?]] = «تقصد ...؟».
- [[I'd prefer to ... because ...]]: [[I'd]] = [[I would]]، أنعم من [[I want]]، والسبب لازم.
- [[I tried that first, but ...]]: الاختلاف بتجربة، مش برأي.
- [[Happy to discuss if you see another way.]] = «نتكلم لو شايف طريقة تانية».
- [[I addressed all comments.]]: [[address]] هنا = «اتعاملت مع»، مش «عنوان».

---

## الخلاصة

- كل تعليق ليه رد، حتى لو [[Done.]].
- التأجيل معاه issue: «later» من غير issue بتبقى «never».
- الاختلاف بسبب تقني، والقرار الأخير ممكن تسيبه: [[if you feel strongly]].`,
          lines: [
            R`«ملاحظة حلوة، شكرًا! اتصلحت في الـ commit ده». اكتب الـ hash عشان يلاقيه.`,
            R`كلمة واحدة كفاية للـ nits.`,
            R`«منطقي. طلّعته في formatPrice في آخر commit».`,
            R`«نقطة حلوة. هعملها في PR بعده (#131) عشان ده يفضل صغير».`,
            R`سؤال توضيح: «مش متأكد إني فاهم. تقصد ننقل الـ check للـ middleware؟»`,
            R`اختلاف بسبب: «أفضّل أسيبه هنا، لأنه مستخدم هنا بس والـ helper هيخبّي الـ query».`,
            R`«عندك حق، فاتتني الحالة دي. ضفت اختبار ليها».`,
            R`«جربت ده الأول بس عمل loop في الـ render. نتكلم لو شايف طريقة تانية».`,
            R`الرسالة الأخيرة: «اتعاملت مع كل التعليقات. بص تاني لو سمحت».`
          ],
          sol: R`ردود صح على التعليقات الـ ٦:
nit (recieve) ← [[Fixed, thanks!]]
suggestion (helper) ← [[Good idea. Extracted it into getUserName() in 4f5e6a7.]]
question (fetch twice) ← [[Good catch, the second fetch was left over from debugging. Removed.]]
blocking (SQL injection) ← [[You're right, thanks for catching this. Switched to a parameterized query and added a test with a malicious input.]]
issue (404) ← [[I'll handle the 404 case in a follow-up to keep this PR small: #140.]] (بس لو هي فعلًا مش هتوقع الإنتاج، وإلا صلّحها دلوقتي)
اختلاف (على أي واحد) ← [[I considered a helper, but it's only used here and I think inline is easier to read. Happy to change it if you feel strongly.]]
وفي الآخر: [[Thanks for the review! I addressed all comments except the 404 one (#140). Ready for another look.]]

لاحظ: [[if you feel strongly]] = «لو انت شايف إنها مهمة» (بتسيبله القرار بأدب). ولو كتبت رد فيه [[but you are wrong]]، شيل النص ده وخلي السبب التقني يتكلم.`
        }
      ]
    },
    {
      t: "issues و bug reports",
      l: 2,
      n: "bug report فيه steps to reproduce و expected و actual، و feature request وسؤال لمشروع open source من غير ما حد يقفله",
      items: [
        {
          cmd: "bug report",
          title: "bug report: Steps to reproduce و Expected و Actual و Environment",
          desc: R`الـ bug report الكويس بيخلي أي حد يشوف الـ bug بعينه في دقيقتين. والشكل ده ثابت في كل الفرق وكل مشاريع الـ open source تقريبًا (وأغلبها عندها issue template بيطلبه):

[[Title]] جملة بتوصف السلوك الغلط ومكانه، و [[Steps to reproduce]] خطوات مرقمة بالـ imperative، و [[Expected behavior]] كان المفروض يحصل إيه، و [[Actual behavior]] حصل إيه فعلًا (ومعاه رسالة الخطأ بالنص، و screenshot)، و [[Environment]] الإصدارات (OS و browser و Node و المكتبة)، و [[Additional context]] أي حاجة تانية (بيحصل دايمًا ولا ساعات؟ بدأ إمتى؟).

الكلمة المفتاحية: [[reproduce]] = تخلي الـ bug يحصل تاني عمدًا. و [[repro]] اختصارها. و [[minimal reproduction]] = أصغر كود ممكن بيطلّع الـ bug.`,
          example: R`Title: Cart total ignores coupon after page reload
Steps to reproduce
1. Add any product to the cart.
2. Apply the coupon SAVE10.
3. Reload the page.
Expected behavior
The total still includes the 10% discount.
Actual behavior
The discount disappears, but the coupon is still shown as applied.
No error in the console.
Environment
- Chrome 140 on Windows 11
- Production (shop.example.com), commit 3f2a1bc
Additional context
It happens every time. It started after the cart was moved to localStorage (#97).`,
          try: R`اختار bug حقيقي في مشروع عندك (أو في موقع بتستخدمه) واكتبله report بالشكل ده بالإنجليزي. وبعدين ادّيه لحد تاني من غير ما تشرحله: لو قدر يعمل reproduce من الخطوات بس، الـ report ناجح.`,
          flag: "script",
          deep: {
            why: "bug report غامض ([[the cart is broken]]) بيضيع ساعات في «بيحصل إزاي؟» و «عندك إيه؟». والـ report الكويس نصه الحل: لما تكتب الخطوات والفرق بين expected و actual، كتير بتلاقي السبب وانت بتكتب.",
            how: R`عنوان كويس = [[what + where + when]]: [[Cart total ignores coupon after page reload]]. مش [[Cart bug]] ولا [[URGENT!!! not working]].

الخطوات: imperative ومرقّمة وكل خطوة حاجة واحدة. ابدأ من حالة معروفة ([[Log in as a new user]]).

Expected و Actual: جملتين بالـ present simple. الفرق بينهم هو الـ bug. [[Actual]] فيه رسالة الخطأ منسوخة كنص (مش صورة بس)، عشان حد يقدر يدوّر بيها.

كلمات مفيدة: [[consistently]] / [[every time]] = دايمًا، و [[intermittently]] / [[sometimes]] = ساعات، و [[regression]] = حاجة كانت شغالة وباظت، و [[workaround]] = حل مؤقت، و [[It started after ...]] = بدأ بعد، و [[I can't reproduce it locally]] = مش بيحصل عندي.

تفاصيل الـ issue في GitHub (labels و [[gh issue create]]) في «تاب Git».`,
            when: "أي bug في شغلك (Jira أو GitHub Issues أو Linear)، وأي bug في مكتبة open source.",
            mistakes: R`[[It doesn't work]] من غير تفاصيل. وصورة للخطأ بدل النص. ونسيان الإصدارات. وخلط كذا bug في issue واحد. و [[Expected: it works]]: ده مش expected، قول بيعمل إيه بالظبط. و [[I think the problem is in the useEffect]] في مكان Actual: التخمين مكانه Additional context.`
          },
          teach: R`## الـ report ٦ أقسام، كل قسم بيوفّر سؤال

| القسم | السؤال اللي بيوفّره |
|---|---|
| [[Title]] | الـ bug ده عن إيه؟ |
| [[Steps to reproduce]] | أشوفه إزاي بعيني؟ |
| [[Expected behavior]] | كان المفروض يحصل إيه؟ |
| [[Actual behavior]] | حصل إيه فعلًا؟ |
| [[Environment]] | عندك إيه بالظبط؟ |
| [[Additional context]] | دايمًا؟ بدأ إمتى؟ |

[[reproduce]] = تخلّي الـ bug يحصل تاني عمدًا.

---

## الجمل حتة حتة

~~~text
Title: Cart total ignores coupon after page reload
~~~

إيه ([[Cart total ignores coupon]]) + إمتى ([[after page reload]]). و [[ignores]] بالـ s.

~~~text
1. Add any product to the cart.
2. Apply the coupon SAVE10.
3. Reload the page.
~~~

imperative، ومرقّمة، وكل خطوة حاجة واحدة. و [[any product]] = أي منتج: يعني الـ bug مش مرتبط بمنتج معيّن.

~~~text
The total still includes the 10% discount.
The discount disappears, but the coupon is still shown as applied.
No error in the console.
~~~

Expected و Actual بالـ present simple. الفرق بينهم هو الـ bug. و [[is still shown as applied]] passive: «لسه ظاهر إنه متطبّق». و [[No error in the console]] معلومة مفيدة حتى وهي سلبية.

~~~text
- Chrome 140 on Windows 11
- Production (shop.example.com), commit 3f2a1bc
~~~

المتصفح والنظام والبيئة والـ commit بالظبط.

~~~text
It happens every time. It started after the cart was moved to localStorage (#97).
~~~

[[every time]] = دايمًا (عكس [[intermittently]] = ساعات). و [[It started after]] بيشاور على السبب: ده [[regression]] (حاجة كانت شغالة وباظت).

---

## الخلاصة

- العنوان: إيه + فين + إمتى.
- الخطوات imperative مرقّمة، ورسالة الخطأ كنص.
- التخمين مكانه Additional context، مش Actual.`,
          lines: [
            R`العنوان: إيه + فين + إمتى. «إجمالي السلة بيتجاهل الكوبون بعد reload».`,
            "عنوان قسم: خطوات تكرار الـ bug.",
            "خطوة ١ بالـ imperative.",
            "خطوة ٢. apply = تطبّق.",
            "خطوة ٣. reload = تعمل تحديث للصفحة.",
            "عنوان قسم: المتوقع.",
            R`«الإجمالي لسه فيه خصم ١٠٪». still = لسه.`,
            "عنوان قسم: اللي حصل فعلًا.",
            R`«الخصم بيختفي، بس الكوبون لسه ظاهر إنه متطبق». disappears = يختفي.`,
            R`«مفيش خطأ في الـ console». معلومة مهمة حتى لو سلبية.`,
            "عنوان قسم: البيئة.",
            "المتصفح والنظام.",
            "البيئة والـ commit بالظبط.",
            "عنوان قسم: معلومات إضافية.",
            R`«بيحصل كل مرة. بدأ بعد ما السلة اتنقلت لـ localStorage». ده غالبًا مكان السبب (regression).`
          ],
          sol: R`مثال صح:
[[Title: Signup form accepts emails without a domain]]
[[Steps to reproduce]]
[[1. Open /signup.]]
[[2. Enter "sara@" as the email and fill in the other fields.]]
[[3. Click "Create account".]]
[[Expected behavior]]
[[The form shows "Enter a valid email address" and does not submit.]]
[[Actual behavior]]
[[The form submits and the API returns 500: "invalid input syntax" in the server logs.]]
[[Environment]]
[[- Firefox 143 on macOS; local dev, commit 8e1d2f0]]

الاختبار الحقيقي: حد غيرك عمل reproduce من غير أسئلة. لو سألك «أنهي صفحة؟» أو «بإيه سجلت؟»، الإجابة لازم تدخل في الخطوات. (أرقام إصدارات المتصفحات في الأمثلة للتوضيح، اكتب اللي عندك من [[about:]] أو [[chrome://version]].)`
        },
        {
          cmd: "issue لمشروع open source",
          title: "تسأل أو تطلب feature في مشروع open source من غير ما الـ issue يتقفل",
          desc: R`الـ maintainers متطوعين غالبًا وعندهم مئات الـ issues. الـ issue اللي بيتقفل بسرعة هو اللي مكرر، أو سؤال مكانه مش هنا، أو من غير repro. واللي بياخد رد هو اللي بيوفّر وقتهم.

قبل ما تكتب: ١) دوّر في الـ issues (المفتوحة والمقفولة) بكلمات الخطأ. ٢) اقرا [[CONTRIBUTING.md]] والـ issue templates. ٣) شوف لو فيه Discussions أو Discord للأسئلة (مش كل سؤال bug). ٤) جرّب آخر إصدار.

وفي الـ feature request: ابدأ بالمشكلة مش بالحل ([[I'm trying to ... but ...]])، وقول بتعمل إيه دلوقتي كـ workaround، واقترح API لو عندك فكرة، واعرض تساعد ([[I'd be happy to open a PR]]).`,
          example: R`Title: Support custom headers in the retry hook
Is your feature request related to a problem?
I need to refresh the auth token before retrying a 401, but the retry hook
doesn't let me change the request headers.
Describe the solution you'd like
Pass the request options to the hook so they can be modified, e.g.
retry: { onRetry: (req) => { req.headers.set("Authorization", newToken) } }
Describe alternatives you've considered
Wrapping every call in my own retry loop, which duplicates the library logic.
Additional context
I searched existing issues and found #412, which is related but only covers timeouts.
I'd be happy to open a PR if this sounds good.`,
          try: R`اختار مكتبة بتستخدمها وافتح تاب Issues بتاعها. دوّر على مشكلة قابلتك فعلًا (بكلمات رسالة الخطأ) واقرا ٣ issues: واحد اتحل، وواحد اتقفل من غير حل، وواحد لسه مفتوح. اكتب لكل واحد ليه أخد النتيجة دي. وبعدين اكتب (من غير ما تنشر) issue لحاجة عايزها بالقالب اللي فوق.`,
          flag: "script",
          deep: {
            why: "الـ open source أحسن مكان تتعلم فيه إنجليزي تقني حقيقي، وأول PR أو issue مقبول في مكتبة مشهورة حاجة بتتحط في الـ CV. بس issue مكتوب وحش بيتقفل وبيزعّل.",
            how: R`عبارات جاهزة:
[[I searched the existing issues and couldn't find this.]]
[[This might be related to #412.]]
[[Here's a minimal reproduction: <link to StackBlitz / CodeSandbox / repo>]]
[[I'm not sure if this is a bug or expected behavior.]]
[[Is this something you'd accept a PR for?]]
[[Thanks for maintaining this library!]] (في الآخر، مش مبالغ فيه)

كلمات هتشوفها من الـ maintainers: [[duplicate of #]] = مكرر، و [[wontfix]] = مش هنعمله، و [[needs repro]] = محتاج reproduction، و [[good first issue]] = مناسب لأول مساهمة، و [[stale]] = اتقفل لأن محدش رد، و [[upstream]] = المشكلة في مكتبة تانية، و [[by design]] = السلوك ده مقصود، و [[PRs welcome]] = اعمله انت.

وقوالب GitHub الافتراضية للـ feature request بتسأل بالظبط الأسئلة اللي في المثال ([[Is your feature request related to a problem?]] و [[Describe the solution you'd like]] و [[Describe alternatives you've considered]]).`,
            when: "أي مشكلة في مكتبة: دوّر الأول، واكتب issue لو متأكد إنه جديد.",
            mistakes: R`[[+1]] أو [[any update?]] على issue قديم: استخدم reaction (علامة الإبهام) بدل تعليق. وسؤال «إزاي أعمل كذا» كـ bug. و [[This library is garbage]] أو زعيق. و [[please fix ASAP]]: محدش مدينلك بحاجة. ولصق ٢٠٠ سطر من الكود بتاعك بدل minimal reproduction.`
          },
          teach: R`## قالب الـ feature request: ٤ أسئلة

القالب ده هو أسئلة القالب الافتراضي اللي GitHub بيقترحه للـ feature requests، وكل سؤال ليه شغلانة:

| السؤال | بيتجاوب بـ |
|---|---|
| [[Is your feature request related to a problem?]] | المشكلة، مش الحل |
| [[Describe the solution you'd like]] | الحل اللي في دماغك |
| [[Describe alternatives you've considered]] | البدائل والـ workaround |
| [[Additional context]] | دوّرت فين، وهل تقدر تساعد |

---

## الجمل حتة حتة

~~~text
Title: Support custom headers in the retry hook
~~~

imperative ومحدد: [[Support]] + إيه + فين.

~~~text
I need to refresh the auth token before retrying a 401, but the retry hook
doesn't let me change the request headers.
~~~

المشكلة: عايز إيه ([[I need to ...]]) و [[but]] إيه اللي مانعك. و [[before retrying]]: بعد [[before]] الفعل بـ [[ing]]. و [[let me + فعل]] = يسمحلي.

~~~text
Pass the request options to the hook so they can be modified, e.g.
~~~

[[so they can be modified]] = «عشان تتعدّل» (passive مع can). و [[e.g.]] = مثلًا.

~~~text
Wrapping every call in my own retry loop, which duplicates the library logic.
~~~

البديل وعيبه. و [[which duplicates]] = «وده بيكرر».

~~~text
I searched existing issues and found #412, which is related but only covers timeouts.
I'd be happy to open a PR if this sounds good.
~~~

[[I searched existing issues]] بتقفل أول سؤال في دماغ الـ maintainer («مكرر؟»). و [[I'd be happy to open a PR]] بتفرق جدًا.

---

## كلمات الـ maintainers

| الكلمة | معناها |
|---|---|
| [[duplicate of #]] | مكرر |
| [[needs repro]] | محتاج reproduction |
| [[wontfix]] | مش هنعمله |
| [[by design]] | مقصود |
| [[upstream]] | المشكلة في مكتبة تانية |
| [[stale]] | اتقفل لأن محدش رد |
| [[good first issue]] | مناسب لأول مساهمة |

---

## الخلاصة

- دوّر الأول (مفتوح ومقفول)، واقرا [[CONTRIBUTING.md]].
- المشكلة قبل الحل، و workaround، وعرض للمساعدة.
- [[+1]] و [[any update?]]: استخدم reaction بدلهم.`,
          lines: [
            R`العنوان: الـ feature بالظبط. «ادعم headers مخصصة في الـ retry hook».`,
            "سؤال القالب: الطلب ده مرتبط بمشكلة؟",
            R`المشكلة: «محتاج أجدد الـ token قبل ما أعيد طلب رجّع 401، بس...»`,
            R`«... الـ hook مش بيسمحلي أغيّر الـ headers».`,
            "سؤال القالب: الحل اللي عايزه.",
            R`«ابعت options الطلب للـ hook عشان تتعدّل، مثلًا:»`,
            "اقتراح API بالكود.",
            "سؤال القالب: البدائل اللي فكرت فيها.",
            R`«إني ألف كل نداء في retry loop بتاعي، وده بيكرر منطق المكتبة». duplicates = بيكرر.`,
            "سؤال القالب: معلومات إضافية.",
            R`«دوّرت في الـ issues ولقيت #412، مرتبط بس بيغطي الـ timeouts بس».`,
            R`«أكون مبسوط أعمل PR لو الفكرة كويسة». ده بيفرق جدًا مع الـ maintainers.`
          ],
          sol: R`الأنماط اللي المفروض تلاقيها:
الـ issue اللي اتحل: فيه repro واضح (لينك أو كود صغير)، والإصدارات، والـ maintainer قدر يشوف المشكلة بسرعة.
اللي اتقفل من غير حل: غالبًا [[duplicate]]، أو [[needs repro]] ومحدش رد فبقى [[stale]]، أو السلوك [[by design]]، أو المشكلة [[upstream]] في مكتبة تانية.
اللي لسه مفتوح: ممكن يكون صعب، أو مستني حد يعمل PR ([[help wanted]] أو [[PRs welcome]]).

والـ issue اللي كتبته صح لو: العنوان محدد، والمشكلة قبل الحل، وفيه workaround، وقلت إنك دوّرت، ومفيش [[ASAP]] ولا [[any update]]. ولو ملقتش قالب في الـ repo، استخدم نفس الأسئلة دي.`
        }
      ]
    }
]);
