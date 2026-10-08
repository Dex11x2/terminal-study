// تكملة تاب sweng: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sweng/01.js (شرح حقول الدرس في أوله)
MORE("sweng", [
    {
      t: "الفريق",
      l: 3,
      n: "PR بيتراجع بسرعة، وقواعد الـ repo، وتراجع وتتراجع من غير خناق، وتقسّم الشغل، وتقدّر الوقت بصدق",
      items: [
        {
          cmd: "PR يتراجع",
          title: "PR صغير الـ reviewer يخلّصه في ربع ساعة",
          desc: R`الـ PR اللي بيتراجع بسرعة ليه ٣ صفات: صغير (غالبًا أقل من ٤٠٠ سطر، وبيعمل حاجة واحدة)، ووصفه بيقول إيه وليه وإزاي تجرّبه (ومعاه صور لو فيه UI)، وصاحبه راجعه بنفسه قبل ما يطلب من حد.

الـ self-review أهم خطوة ومحدش بيعملها: اقرا الـ diff كله كأنك الـ reviewer، قبل ما تعمل الـ PR. هتلاقي [[console.log]] منسي، وملف اتغير بالغلط، وتعليق TODO. كل حاجة تلاقيها انت هي تعليق الـ reviewer مش هيحتاج يكتبه.`,
          example: R`git diff main...HEAD --stat
git diff main...HEAD
npm run lint && npm test
git push -u origin feat/coupon-expiry
gh pr create --title "feat(coupon): reject expired coupons" --body-file pr.md --reviewer sara`,
          try: R`خد آخر تغيير عملته (أو ميزة انتهاء الكوبون من درس «red green refactor»)، واعمل self-review بـ [[git diff main...HEAD]] وصلّح كل حاجة تلاقيها. وبعدين اكتب [[pr.md]] فيه ٤ أجزاء: إيه اللي اتغير، وليه (والـ issue)، وإزاي أجرّبه (خطوات بالأرقام)، وأي حاجة عايز رأي فيها. وحط صورة قبل وبعد لو فيه UI.`,
          sol: R`الـ self-review غالبًا هيطلّع ٢ لـ ٥ حاجات في أول مرة: log منسي، وتغيير formatting في ملف مالكش دعوة بيه (رجّعه بـ [[git restore -s main -- file]])، واسم مؤقت. و [[--stat]] بيوريك لو فيه ملف مكانش المفروض يتغير خالص.

والوصف الكويس زي اللي تحت: الـ reviewer يعرف من أول سطرين هو بيراجع إيه، ويقدر يجرّب من غير ما يسألك. أهم جزء «إزاي تجرّب»، لأنه بيخلي المراجعة تجربة مش قراية بس. وجزء «عايز رأيك في» بيوجّه المراجعة للحتة اللي انت مش متأكد منها بدل ما تتوه في الأسماء.

الغلط الشائع: الوصف «fixed coupon bug» أو فاضي، أو قايمة commits منسوخة ([[--fill]] مفيد للبداية بس). ولو الـ PR عدّى ٤٠٠ سطر، فكّر تقسّمه (درس «draft PR و التقسيم») قبل ما تبعته.`,
          solCode: R`## What
Coupons with an expiry date are rejected at checkout with a clear message.

## Why
Closes #151. Expired SUMMER26 codes were still applied after the campaign ended.

## How to test
1. npm run db:seed (adds EXPIRED10, which expired yesterday)
2. Add any product to the cart and apply EXPIRED10
3. You should see "This coupon has expired" and the total unchanged
4. Apply SAVE10: it still works

## Notes for the reviewer
- applyCoupon now takes "now" as a third argument (defaults to new Date()) so tests can pass a fixed time.
- Not sure about the error message wording. Product didn't specify.

## Screenshots
| Before | After |
| --- | --- |
| ![before](before.png) | ![after](after.png) |`,
          deep: {
            why: R`الـ reviewer بيراجع PR بـ ٥٠ سطر بتركيز ويلاقي المشاكل. وبيراجع PR بـ ٢٠٠٠ سطر في نفس الوقت تقريبًا، بس بيعمل scroll ويكتب «LGTM»، لأن مفيش حد عنده ٣ ساعات تركيز. يعني الـ PR الكبير مش بيتراجع فعلًا، بياخد وقت أطول بس. والـ PR الصغير كمان بيتدمج أسرع، فبيقل الـ merge conflicts، ولو فيه bug، الـ revert بيشيل حاجة صغيرة.`,
            how: R`[[git diff main...HEAD]] (٣ نقط) بيوريك اللي اتغير في الـ branch بتاعك من ساعة ما خرجت من main، من غير التغييرات اللي حصلت في main بعدها. ده بالظبط اللي الـ PR هيعرضه. و [[--stat]] ملخص بعدد السطور في كل ملف.

وقبل الـ push: الـ lint والاختبارات عندك. متخليش الـ CI يلاقي حاجة كنت تقدر تلاقيها في ٣٠ ثانية (تاب «فحص الكود»).

وعنوان الـ PR بشكل Conventional Commits ([[feat(coupon): ...]]) لو الفريق بيستخدم squash merge: العنوان بيبقى رسالة الـ commit على main. و [[--reviewer]] بيطلب المراجعة من حد معين، ولو فيه CODEOWNERS الطلب بيروح أوتوماتيك (الدرس الجاي).

والحاجة الواحدة: refactor في PR، و feature في PR، و formatting لكل المشروع في PR. لو عملت rename لدالة بتستخدم في ٣٠ ملف وانت شغال على الميزة، ده PR لوحده قبلها.`,
            when: "كل PR، من أول يوم في الشغل. والوصف بيطول مع حجم التغيير: typo fix سطر، وميزة فيها UI فيها خطوات وصور.",
            mistakes: R`تفتح الـ PR وتروح تعمل self-review في GitHub بعد ما الـ reviewer اتبعتله إشعار. وتحط «WIP» في العنوان بدل draft. وتطلب review والـ CI أحمر. وتخلط تغيير formatting (prettier على الملف كله) مع تغيير حقيقي، فالـ diff بيبقى ٥٠٠ سطر والتغيير الحقيقي ٥ مستخبيين فيهم. وفي الانترفيو لو اتسألت «إيه اللي بيخلي PR كويس؟»: صغير وبيعمل حاجة واحدة، ووصف فيه ليه وإزاي تجرّب، و self-review قبل ما يوصل لحد.`
          },
          teach: R`## الفكرة

الأوامر الخمسة هي اللي بتعمله **قبل** ما حد غيرك يشوف الـ PR: تشوف شكل التغيير، وتقراه كله، وتشغّل الفحص، وترفع، وتفتح الـ PR. عملنا repo تجريبي فيه branch بميزة انتهاء الكوبون، و [[origin]] repo محلي (bare) بدل GitHub، وشغّلنا أول ٤ أوامر. اتشغّل بـ Git 2.56 و npm 11 في Git Bash على ويندوز. أمر [[gh pr create]] اتأكدنا من flags بتاعته من [[gh pr create --help]] (gh 2.97)، ومشغّلناهوش لأنه بيفتح PR حقيقي على GitHub.

---

## ١. [[git diff main...HEAD --stat]]

- [[git diff A...B]] (٣ نقط): اللي اتغير في [[B]] من ساعة ما خرج من [[A]]. يعني شغلك انت بس، وده بالظبط اللي الـ PR هيعرضه.
- [[HEAD]]: الـ commit اللي انت واقف عليه (آخر commit في الـ branch بتاعك).
- [[--stat]]: ملخص: كل ملف وعدد السطور اللي اتغيرت، من غير الـ diff نفسه.

~~~text الناتج
 README.md     | 2 +-
 src/coupon.ts | 4 +++-
 2 files changed, 4 insertions(+), 2 deletions(-)
~~~

[[+]] سطور اتضافت و [[-]] سطور اتشالت. وهنا أول اكتشاف: [[README.md]] اتغير، والميزة عن الكوبون. ليه؟

### ٣ نقط مش ٢

بعد ما خرجنا من main، حد زوّد [[other.txt]] على main. مع نقطتين ([[main..HEAD]]) Git بيقارن آخر main بآخر branch مباشرة:

~~~text الناتج: git diff main..HEAD --stat
 README.md     | 2 +-
 other.txt     | 1 -
 src/coupon.ts | 4 +++-
 3 files changed, 4 insertions(+), 3 deletions(-)
~~~

[[other.txt]] ظهر كأنك مسحته، وانت ملمستهوش. التلات نقط بتقارن بالنقطة اللي خرجت منها، فبتشيل شغل غيرك.

---

## ٢. [[git diff main...HEAD]]: الـ self-review

نفس الأمر من غير [[--stat]]: الـ diff كامل. اقراه كأنك الـ reviewer:

~~~text الناتج
diff --git a/README.md b/README.md
index 5361d0e..a00621b 100644
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-Shop
+# Shop
diff --git a/src/coupon.ts b/src/coupon.ts
index e766f83..0753ebb 100644
--- a/src/coupon.ts
+++ b/src/coupon.ts
@@ -1,3 +1,5 @@
-export function applyCoupon(subtotal: number) {
+export function applyCoupon(subtotal: number, expiresAt?: Date, now = new Date()) {
+  if (expiresAt && now >= expiresAt) throw new Error("COUPON_EXPIRED");
+  console.log("debug", subtotal);
   return subtotal;
 }
~~~

- [[diff --git]] بداية كل ملف، و [[index]] بيقول نسخة الملف قبل وبعد (hash).
- [[--- a/]] النسخة القديمة و [[+++ b/]] الجديدة.
- [[@@ -1,3 +1,5 @@]]: الحتة دي بتبدأ من السطر ١، كانت ٣ سطور وبقت ٥.

لقينا حاجتين كان الـ reviewer هيكتبهم: [[console.log("debug", ...)]] منسي، وتغيير في README ملوش علاقة. الـ log يتمسح، والـ README يرجع زي main:

~~~bash
git restore -s main -- README.md
~~~

[[restore]] بيرجّع ملف، و [[-s main]] (source) يعني «من نسخة main»، و [[--]] بتفصل الأوامر عن أسماء الملفات. وبعدها commit.

---

## ٣. [[npm run lint && npm test]]

[[&&]] معناها «شغّل التاني بس لو الأول نجح». فلو الـ lint وقع، الاختبارات مش هتشتغل والأمر كله يفشل. (في المشروع التجريبي الـ scripts بتطبع بس.)

~~~text الناتج
> lint
lint ok

> test
3 passed
~~~

الفكرة: متخليش الـ CI يلاقي حاجة كنت تقدر تلاقيها في ٣٠ ثانية، ومتطلبش review والـ CI أحمر.

---

## ٤. [[git push -u origin feat/coupon-expiry]]

- [[push]]: ارفع الـ commits.
- [[origin]]: اسم الـ remote (هنا repo محلي بدل GitHub).
- [[-u]] (اختصار [[--set-upstream]]): اربط الـ branch المحلية بالـ branch اللي على الـ remote، فبعد كده [[git push]] لوحدها تكفي.

~~~text الناتج
To ../prr-origin.git
 * [new branch]      feat/coupon-expiry -> feat/coupon-expiry
branch 'feat/coupon-expiry' set up to track 'origin/feat/coupon-expiry'.
~~~

---

## ٥. [[gh pr create ...]]

[[gh]] أداة GitHub الرسمية في الترمنال. (من [[gh pr create --help]].)

| الجزء | معناه |
|---|---|
| [[--title "feat(coupon): reject expired coupons"]] | العنوان. بشكل Conventional Commits لأنه بيبقى رسالة الـ commit لو الفريق بيعمل squash merge |
| [[--body-file pr.md]] | الوصف من ملف (حل التمرين تحت) |
| [[--reviewer sara]] | اطلب مراجعة من حد معين |

### الوصف (حل التمرين)

| الجزء | بيجاوب |
|---|---|
| What | اتغير إيه، في جملة |
| Why | ليه، ورقم الـ issue ([[Closes #151]] بتقفل الـ issue أوتوماتيك لما الـ PR يتدمج) |
| How to test | خطوات بالأرقام، فالـ reviewer يجرّب من غير ما يسألك |
| Notes for the reviewer | الحتة اللي عايز فيها رأي |
| Screenshots | قبل وبعد لو فيه UI |

الوصف نفسه markdown: [[##]] عناوين، و [[1.]] قايمة، و [[| Before | After |]] جدول، و [[![before](before.png)]] صورة.

---

## الخلاصة

| الأمر | ليه |
|---|---|
| [[git diff main...HEAD --stat]] | فيه ملف مكانش المفروض يتغير؟ |
| [[git diff main...HEAD]] | اقرا كل سطر قبل الـ reviewer |
| [[npm run lint && npm test]] | الفحص عندك الأول |
| [[git push -u origin <branch>]] | ارفع واربط |
| [[gh pr create ...]] | عنوان واضح، ووصف فيه ليه وإزاي تجرّب، و reviewer |

- PR صغير بيعمل حاجة واحدة، أقل من ٤٠٠ سطر غالبًا.
- التلات نقط ([[...]]) مش النقطتين: شغلك انت بس.`,
          lines: [
            "ملخص: أنهي ملفات اتغيرت وبكام سطر. لو فيه ملف مستغربه، شيله.",
            "الـ self-review: اقرا كل سطر زي ما الـ reviewer هيشوفه.",
            "الفحص عندك الأول، مش في الـ CI.",
            "ارفع الـ branch.",
            "اعمل الـ PR بعنوان واضح ووصف من ملف، واطلب review من حد معين."
          ]
        },
        {
          cmd: "CODEOWNERS و rulesets",
          title: "مين يراجع إيه، ومحدش يدمج من غير مراجعة",
          desc: R`٣ ملفات وإعدادات بتنظّم الـ PRs في أي repo جدي:

[[.github/pull_request_template.md]]: الوصف اللي بيظهر أوتوماتيك في كل PR جديد، فمحدش ينسى «إزاي تجرّب».

[[.github/CODEOWNERS]]: كل مسار ومين المسؤول عنه. لما PR يلمس الملفات دي، GitHub بيطلب مراجعتهم أوتوماتيك.

والـ rulesets (أو branch protection القديمة) في Settings: قواعد على main زي «لازم PR»، و «لازم approval واحد على الأقل»، و «لازم الـ CI يعدّي»، و «ممنوع force push».`,
          example: R`# .github/CODEOWNERS
# آخر سطر بيطابق الملف هو اللي بيكسب، فالعام الأول والخاص بعده
*                      @acme/web
/src/payments/         @acme/payments @sara
/prisma/migrations/    @acme/backend
/.github/workflows/    @acme/devops
*.md                   @acme/web @mona`,
          try: R`في repo تجربة عندك على GitHub: اعمل [[.github/pull_request_template.md]] و [[.github/CODEOWNERS]] (باسم حسابك بدل الفرق)، واعمل ruleset على main من Settings ثم Rules ثم Rulesets: Require a pull request before merging، و Require status checks to pass (اختار الـ CI بتاعك)، و Block force pushes. وبعدين جرّب [[git push origin main]] مباشرة، واعمل PR وشوف الـ template والـ checks. ولو معاك [[gh]]، [[gh ruleset check main]] بيطبع القواعد.`,
          sol: R`الـ push المباشر على main بيترفض برسالة فيها إن الـ branch محمية بـ ruleset وإن التغيير لازم ييجي من PR. والـ PR الجديد بيفتح والوصف فيه الـ template، وزرار الـ merge مقفول لحد ما الـ checks تخلص وتبقى خضرا. و [[gh ruleset check main]] بيطبع القواعد اللي بتنطبق على main.

لو انت لوحدك في الـ repo، «Required approvals» هتقفل عليك، لأن GitHub مبيسمحش إنك تعمل approve للـ PR بتاعك. في repo شخصي خليها صفر وسيب الـ status checks، أو ضيف نفسك في bypass list. وفي repo private على خطة مجانية، الـ rulesets ممكن متكونش متاحة، والكلام ده بيتغير، فشوف صفحة الـ Settings عندك.

والـ template الكويس قصير: ٤ عناوين و checklist صغيرة. الـ template الطويل (٢٠ checkbox) الناس بتعلّم عليه كله من غير ما تقرا.`,
          solCode: R`<!-- .github/pull_request_template.md -->
## What

## Why
Closes #

## How to test
1.

## Screenshots (UI changes)

- [ ] Tests added or updated
- [ ] Self-reviewed the diff`,
          flag: "script",
          deep: {
            why: R`من غير قواعد، أي حد (حتى انت الساعة ٢ بالليل) يقدر يعمل push على main، والـ CI بيبقى «اقتراح». والـ reviewers بيتختاروا بالصدفة: الـ migration بتتدمج من غير ما حد من الباك إند يشوفها. الـ CODEOWNERS والـ rulesets بيخلوا الإجراءات دي أوتوماتيك، فمحدش محتاج يفتكرها، ومحدش يقدر يتخطاها بالغلط.`,
            how: R`CODEOWNERS: ينفع يبقى في [[.github/]] أو الـ root أو [[docs/]]. كل سطر pattern (بنفس شكل [[.gitignore]] تقريبًا) وبعده users أو teams. ولو أكتر من سطر بيطابق نفس الملف، آخر واحد هو اللي بيكسب: ملف [[README.md]] جوه [[src/payments/]] هيروح لـ [[@acme/web @mona]] مش لفريق الـ payments، لأن [[*.md]] بعده. وده لوحده مش بيمنع الدمج: بيطلب المراجعة بس، إلا لو فعّلت «Require review from Code Owners» في الـ ruleset. والـ draft PRs مبيتطلبلهاش code owners غير لما تبقى ready.

الـ rulesets الأحدث من branch protection، وأهم القواعد لـ main:
Require a pull request before merging، ومعاها عدد الـ approvals.
Dismiss stale approvals: أي commit جديد بعد الـ approval بيلغيه، فمحدش يزوّد حاجة بعد الموافقة.
Require conversation resolution: كل التعليقات لازم تتقفل.
Require status checks to pass: الـ lint والاختبارات والـ build (من GitHub Actions، تاب GitHub Actions).
Block force pushes و Restrict deletions.

وتقدر تعمل bypass لناس معينين (زي bot الـ releases). وفيه برضه merge queue للـ repos الزحمة، بيتأكد إن الـ checks بتعدّي على main بعد الدمج مش على الـ branch لوحدها.`,
            when: "أي repo عليه أكتر من شخص، أو عليه deploy أوتوماتيك من main. وفي المشاريع الشخصية على الأقل «Require status checks» و «Block force pushes» عشان تحمي نفسك من نفسك.",
            mistakes: R`CODEOWNERS فيه شخص واحد لكل حاجة، فبيبقى bottleneck وكل PR مستنيه. استخدم teams. وترتيب غلط: [[*]] في الآخر بيلغي كل اللي قبله. و required checks بأسماء jobs اتغيرت، فالـ PR بيفضل مستني check عمره ما هيجي. وتدّي كل الفريق bypass «عشان الطوارئ»، فالقواعد بقت ديكور. وفي الانترفيو، إنك تعرف الفرق بين إن CODEOWNERS «بيطلب» المراجعة وإن الـ ruleset «بيفرضها» بيبيّن إنك اشتغلت في فريق فعلًا.`
          },
          teach: R`## الفكرة

المثال ملف [[CODEOWNERS]]: كل سطر فيه مسار، وبعده مين بيراجع أي PR بيلمس المسار ده. هنفك السطور واحد واحد، وأهم قاعدة فيه: **آخر سطر بيطابق الملف هو اللي بيكسب**. ملف CODEOWNERS والـ rulesets بيشتغلوا على GitHub نفسه، فالكلام هنا من docs GitHub الرسمية (مقدرناش نجرّبه من غير repo حقيقي على GitHub). اتأكدنا بس إن [[gh ruleset check]] موجود في gh 2.97.

---

## ١. الملف بيتحط فين؟

في واحد من ٣ أماكن: [[.github/CODEOWNERS]] أو الـ root أو [[docs/CODEOWNERS]]. والـ [[#]] في أول السطر تعليق.

---

## ٢. شكل السطر

~~~text .github/CODEOWNERS
/src/payments/         @acme/payments @sara
~~~

- أول حتة: pattern بنفس قواعد [[.gitignore]] تقريبًا.
  - [[/]] في الأول: من الـ root بتاع الـ repo.
  - [[/]] في الآخر: فولدر، وكل اللي جواه.
- بعدها واحد أو أكتر من المراجعين:
  - [[@sara]]: يوزر.
  - [[@acme/payments]]: team جوه organization اسمها [[acme]]. الـ team أحسن من شخص واحد، عشان لو في إجازة الـ PR ميقفش.

---

## ٣. السطور بالترتيب

| السطر | بيطابق | المراجعين |
|---|---|---|
| [[*]] | أي ملف | [[@acme/web]] (الافتراضي) |
| [[/src/payments/]] | كل اللي جوه فولدر الدفع | فريق الـ payments وسارة |
| [[/prisma/migrations/]] | تغييرات الداتابيز | الباك إند |
| [[/.github/workflows/]] | الـ CI نفسه | الـ devops، عشان محدش يشيل الاختبارات من الـ workflow بهدوء |
| [[*.md]] | أي ملف markdown في أي مكان | [[@acme/web @mona]] |

---

## ٤. آخر سطر بيكسب

لو أكتر من سطر بيطابق نفس الملف، GitHub بياخد **آخر** واحد بس. أمثلة:

| الملف | السطور اللي بتطابق | اللي بيكسب |
|---|---|---|
| [[src/app.ts]] | [[*]] | [[@acme/web]] |
| [[src/payments/paymob.ts]] | [[*]] و [[/src/payments/]] | [[@acme/payments @sara]] |
| [[src/payments/README.md]] | [[*]] و [[/src/payments/]] و [[*.md]] | [[@acme/web @mona]] |

التالت هو المفاجأة: README جوه فولدر الدفع مش بيروح لفريق الدفع، لأن [[*.md]] بعده. ولو كتبت [[*]] في **آخر** الملف بدل أوله، كان هيلغي كل السطور اللي قبله وكل حاجة تروح لـ [[@acme/web]]. عشان كده التعليق في أول المثال بيقول: العام الأول، والخاص بعده.

---

## ٥. CODEOWNERS بيطلب، الـ ruleset بيفرض

CODEOWNERS لوحده بيطلب المراجعة أوتوماتيك وبس، ومبيمنعش الدمج. اللي بيمنع قواعد في Settings ثم Rules ثم Rulesets على main:

| القاعدة | بتعمل إيه |
|---|---|
| Require a pull request before merging | مفيش push مباشر على main |
| Required approvals | عدد الموافقات |
| Require review from Code Owners | لازم واحد من أصحاب الملف يوافق |
| Dismiss stale approvals | أي commit جديد بعد الموافقة بيلغيها |
| Require status checks to pass | الـ CI لازم يعدّي |
| Block force pushes | ممنوع [[--force]] على main |

وحاجتين من الـ docs: الـ draft PRs مبيتطلبلهاش code owners غير لما تبقى ready. ولو انت لوحدك في الـ repo، Required approvals هتقفل عليك لأن GitHub مبيسمحش إنك توافق على PR بتاعك.

---

## ٦. حل التمرين: الـ template

[[.github/pull_request_template.md]] هو الوصف اللي بيظهر جاهز في كل PR جديد:

- [[<!-- ... -->]]: تعليق HTML، مبيظهرش في الـ PR.
- [[## What]] و [[## Why]] و [[## How to test]]: نفس أجزاء الوصف في الدرس اللي فات.
- [[Closes #]]: صاحب الـ PR يكمّل رقم الـ issue.
- [[- [ ] ...]]: checklist بتتعلّم بالماوس في GitHub.

وقصير: الـ template اللي فيه ٢٠ checkbox الناس بتعلّم عليه كله من غير ما تقرا.

---

## الخلاصة

- CODEOWNERS: مسار ومراجعين، والعام فوق والخاص تحت، لأن آخر سطر بيطابق بيكسب.
- teams مش أشخاص، عشان مفيش حد يبقى bottleneck.
- CODEOWNERS «بيطلب»، والـ ruleset بـ «Require review from Code Owners» هو اللي «بيفرض».
- [[gh ruleset check main]] بيطبع القواعد اللي بتنطبق على main.`,
          lines: [
            "الافتراضي: أي ملف مالوش سطر أخص، فريق الويب بيراجعه.",
            "كود الدفع: فريق الـ payments وسارة.",
            "الـ migrations: الباك إند لازم يشوف أي تغيير في الداتابيز.",
            "الـ CI نفسه: فريق الـ devops، عشان محدش يشيل الاختبارات من الـ workflow بهدوء.",
            "ملفات التوثيق في أي مكان. ولأنه آخر سطر، بيكسب حتى جوه payments."
          ]
        },
        {
          cmd: "ترتيب المراجعة",
          title: "تراجع PR بالترتيب مش من أول سطر",
          desc: R`متبدأش من أول سطر في الـ diff وتعلّق على الأسماء. الترتيب:

١. الهدف: اقرا الوصف والـ issue. التغيير ده بيحل المشكلة الصح؟ ولا المفروض يتعمل بطريقة تانية خالص؟
٢. الصحة: بيعمل اللي بيقوله؟ الحالات الحدّية والأخطاء وحالة الفشل؟ جرّبه.
٣. الأمان: input من المستخدم، والصلاحيات، والأسرار، والـ SQL.
٤. الاختبارات: فيه؟ بتختبر السلوك؟ هتقع لو الكود باظ؟
٥. الأسماء والشكل: آخر حاجة، وأغلبها nit.

لو لقيت مشكلة في الخطوة ١، وقّف واكتبها. مفيش فايدة من ٢٠ تعليق على أسماء في كود هيتكتب تاني.`,
          example: R`gh pr view 42
gh pr checks 42
gh pr diff 42 --name-only
gh pr checkout 42
npm ci && npm test
gh pr diff 42`,
          try: R`راجع PR حقيقي: لزميل، أو PR مفتوح في مشروع open source صغير بتستخدمه. امشي بالخطوات الخمسة بالترتيب، واكتب لكل خطوة سطر واحد (حتى لو «مفيش مشاكل»)، وبعدين التعليقات. قبل ما تبعت، رتّب التعليقات: الـ blockers الأول.`,
          sol: R`الناتج الكويس شكله كده: «١. الهدف: بيحل #151 (الكوبونات المنتهية)، والطريقة منطقية. ٢. الصحة: جرّبته، المنتهي بيترفض. بس لو الكوبون انتهى وهو في الكارت، الـ checkout بيعيد الحساب؟ ٣. الأمان: الكود مش بيتقري من المستخدم غير الـ code نفسه، وبيتحقق بـ zod. تمام. ٤. الاختبارات: فيه ٣، بس مفيش حالة لحظة الانتهاء بالظبط. ٥. الأسماء: [[couponData]] ممكن تبقى [[coupon]]».

ومن الخطوات دي طلع تعليق blocking واحد (إعادة الحساب في الـ checkout)، وواحد suggestion (اختبار الحد)، وواحد nit. ده review مفيد في ١٥ دقيقة.

الغلط الشائع: ١٥ تعليق على الأسماء والفواصل، ومحدش لاحظ إن الكوبون ممكن يتطبق مرتين على نفس الطلب. الـ formatting والـ lint مكانهم الأدوات (prettier و ESLint في الـ CI)، مش البني آدمين.`,
          deep: {
            why: R`الـ review ليه ٣ أهداف: يمسك bugs قبل الإنتاج، ويخلي أكتر من شخص فاهم كل جزء (فلو صاحب الكود في إجازة الشغل ميقفش)، ويخلي الكود على نفس الأسلوب. والترتيب بيضمن إن وقتك المحدود بيروح للحاجات الغالية: bug في الأمان بيتكلف أكتر بكتير من اسم متغير.`,
            how: R`[[gh pr view]] بيطبع العنوان والوصف والحالة. و [[gh pr checks]] بيقولك الـ CI عدّى ولا لأ، ولو أحمر ممكن تستنى صاحبه يصلّحه قبل ما تبدأ.

[[--name-only]] بيوريك شكل التغيير: ملفات في الـ migrations؟ في الـ auth؟ دي أماكن تبص فيها بتركيز أكتر.

[[gh pr checkout]] بينزّل الـ branch عندك (حتى من fork)، فتشغّل الاختبارات وتجرّب «إزاي تجرّب» اللي في الوصف. كتير من الـ bugs مش باينة في الـ diff وباينة في دقيقة تجربة.

وأسئلة الأمان السريعة: فيه input من المستخدم بيوصل لـ SQL أو HTML أو shell أو مسار ملف؟ فيه endpoint جديد، وبيتحقق من الصلاحية (مش بس إن المستخدم عامل login، إنه صاحب الـ order ده)؟ فيه سر في الكود أو في اللوج؟ (تاب «الأمان»).

وحاجات تبص عليها في كل PR: error handling (فيه [[catch {}]] فاضي؟)، و N+1 query جوه loop، و migration بتقفل جدول كبير، وحاجة بتتغير في API عام ممكن تكسر clients.

والوقت: حاول ترد في نفس اليوم. الـ review المتأخر بيوقف زميلك. ولو الـ PR كبير ومش هتلحق، قول كده.`,
            when: "كل PR اتطلب منك. وحتى لو انت جونيور، مراجعتك لـ PR زميل senior مفيدة: هتتعلم الكود، وأسئلتك («ليه عملت كذا؟») بتكشف حاجات كتير.",
            mistakes: R`LGTM من غير ما تشغّله أو تفهمه. وتراجع الأسماء بس لأنها أسهل. وتعيد كتابة الـ PR في دماغك بطريقتك وتطلب تغييرات «ذوق» كـ blockers. وتتأخر ٣ أيام. وفي الانترفيو سؤال «بتبص على إيه في code review؟» بيتسأل كتير: الإجابة القوية هي الترتيب ده بالظبط، مع مثال لـ bug مسكته أو اتمسك عليك.`
          },
          teach: R`## الفكرة

الأوامر الستة بتمشي بنفس ترتيب المراجعة: الهدف الأول، وبعدين الـ CI، وشكل التغيير، وبعدين تجرّب بنفسك، وفي الآخر بس تقرا الـ diff. عشان نشوفهم على حاجة حقيقية، شغّلناهم على PR رقم 43 في مكتبة open source صغيرة ([[sindresorhus/escape-string-regexp]])، PR بيضيف اختبارات. اتشغّل بـ gh 2.97 و Git 2.56 و npm 11 على ويندوز، والأوامر كلها قراية بس (مفيش تعليق اتبعت).

---

## ١. [[gh pr view 43]]: الهدف

[[gh]] أداة GitHub الرسمية. [[pr view]] بيطبع العنوان والحالة والوصف:

~~~text الناتج
title:	Add tests for input validation and edge cases
state:	CLOSED
number:	43
additions:	15
deletions:	0
--
Adds test coverage to lock in explicit input validation and ensure
correct behavior for empty strings and unicode inputs.
~~~

(شلنا سطور فاضية واسم صاحب الـ PR.) الهدف واضح: ١٥ سطر اختبارات للـ input الغلط، والنص الفاضي، والـ unicode. وده سؤال الخطوة ١: التغيير ده بيحل حاجة مطلوبة؟

---

## ٢. [[gh pr checks 43]]: الـ CI

~~~text الناتج
Node.js 12	fail	27s	https://github.com/.../job/59462002068
Node.js 14	fail	30s	https://github.com/.../job/59462002087
~~~

كل سطر job في الـ CI: اسمه، والنتيجة، والوقت، ورابطه. الاتنين [[fail]]. في شغل حقيقي ده بيقولك: صاحبه غالبًا لسه شغال، أو فيه مشكلة لازم تتفهم قبل أي حاجة.

---

## ٣. [[gh pr diff 43 --name-only]]: شكل التغيير

[[--name-only]] بيطبع أسماء الملفات بس:

~~~text الناتج
test.js
~~~

ملف واحد، اختبارات بس، مفيش migrations ولا auth ولا CI. يعني مفيش أماكن حساسة تتطلب تركيز زيادة في الأمان.

---

## ٤. [[gh pr checkout 43]]: نزّله عندك

~~~text الناتج
 * [new ref]         refs/pull/43/head -> test/lock-input-validation
Switched to branch 'test/lock-input-validation'
~~~

GitHub بيحفظ كل PR تحت [[refs/pull/<رقم>/head]]، حتى لو جاي من fork. [[gh]] جابه وعمله branch محلية باسم الـ branch الأصلية.

---

## ٥. [[npm ci && npm test]]: جرّب

[[npm ci]] بيسطّب بالظبط النسخ اللي في [[package-lock.json]] (ci اختصار clean install)، عشان تجرّب نفس اللي الـ CI جرّبه. هنا وقف:

~~~text الناتج
npm error The $__btnpm ci$__bt command can only install with an existing package-lock.json or
npm error npm-shrinkwrap.json with lockfileVersion >= 1.
~~~

المكتبة دي مفيهاش lock file، فسطّبنا بـ [[npm i]] وشغّلنا [[npx ava]] (الـ test runner بتاعها؛ [[npm test]] عندها بيشغّل lint و ava و tsd ورا بعض):

~~~text الناتج
  √ main
  √ escapes $__bt-$__bt in a way compatible with PCRE
  √ escapes $__bt-$__bt in a way compatible with the Unicode flag
  √ throws on non-string input
  √ handles empty string
  × handles unicode and surrogate pairs

  Difference:

  - '😀\\x2dtest'
  + '\\😀\\x2dtest'
~~~

لقينا السبب في دقيقة: الاختبار الجديد بتاع الـ unicode نفسه غلط. [[-]] اللي الدالة رجّعته فعلًا، و [[+]] اللي الاختبار متوقعه: الاختبار فاكر إن الإيموجي هيتعمله escape بـ backslash قبله، والدالة مبتعملش كده (ومش المفروض). وعلى [[main]] من غير الـ PR: [[3 tests passed]]. يعني الكود سليم، والـ PR هو اللي محتاج يتصلّح.

---

## ٦. [[gh pr diff 43]]: دلوقتي اقرا

~~~text الناتج (جزء)
+test('handles unicode and surrogate pairs', t => {
+	t.is(escapeStringRegexp('😀-test'), '\\😀\\x2dtest');
+});
~~~

وانت داخل الـ diff عارف الهدف، وعارف إن الـ CI أحمر، وعارف أنهي سطر بالظبط السبب. من غير الخطوات اللي فاتت، كنت هتقرا ١٥ سطر شكلهم معقول وتكتب LGTM.

---

## ٧. التعليقات اللي طلعت

| الخطوة | السطر |
|---|---|
| ١. الهدف | اختبارات للحالات الحدّية: مفيد |
| ٢. الصحة | اختبار الـ unicode متوقع نتيجة غلط، والـ CI أحمر بسببه (blocking) |
| ٣. الأمان | مفيش: اختبارات بس |
| ٤. الاختبارات | اختبار الـ input الغلط والنص الفاضي كويسين |
| ٥. الأسماء | مفيش |

تعليق blocking واحد، ومعاه دليل (ناتج [[ava]]). ده review مفيد، وأغلبه جه من إنك شغّلت الكود مش من إنك قريته.

---

## الخلاصة

| الأمر | الخطوة |
|---|---|
| [[gh pr view]] | الهدف |
| [[gh pr checks]] | الـ CI عدّى؟ |
| [[gh pr diff --name-only]] | فيه ملفات حساسة؟ |
| [[gh pr checkout]] | نزّله |
| [[npm ci && npm test]] | جرّبه |
| [[gh pr diff]] | اقرا، وانت عارف كل اللي فوق |

- الترتيب: هدف، صحة، أمان، اختبارات، أسماء. ولو الهدف غلط، وقّف هناك.
- الـ formatting والأسماء آخر حاجة، ومكانهم الأدوات (prettier و ESLint) مش البني آدمين.`,
          lines: [
            "الوصف والـ issue: الهدف الأول.",
            "الـ CI عدّى؟ لو أحمر، غالبًا صاحبه لسه شغال.",
            "شكل التغيير: أنهي ملفات، وفيها حاجات حساسة؟",
            "نزّل الـ branch عندك.",
            "ثبّت وشغّل الاختبارات، وبعدين جرّب خطوات الوصف بإيدك.",
            "دلوقتي اقرا الـ diff، وانت عارف الهدف وشايف السلوك."
          ]
        },
        {
          cmd: "تعليق review",
          title: "تعليق بيتفهم صح وبيقول قد إيه مهم",
          desc: R`تعليق الـ review الكويس بيقول ٣ حاجات: المشكلة، وليه مهمة، وقد إيه مهمة (لازم تتصلّح قبل الدمج، ولا رأي). وبيتكتب سؤال أو اقتراح مش أمر: «إيه رأيك نعمل كذا؟» أو «إيه اللي يحصل لو كذا؟» بدل «غيّر ده». لأن ممكن صاحب الـ PR عنده سبب انت مش شايفه.

أسلوب منتشر اسمه Conventional Comments: كل تعليق يبدأ بنوعه ([[question]] و [[issue]] و [[suggestion]] و [[nitpick]] و [[praise]]) وبعده [[(blocking)]] أو [[(non-blocking)]]. كده صاحب الـ PR يعرف فورًا أنهي تعليق يوقّف الدمج.`,
          example: R`question: لو الـ gateway رد بـ timeout، الطلب بيفضل pending للأبد؟ مش شايف مين بيرجّعه.
issue (blocking): الـ code داخل الـ query كنص، ده SQL injection. ينفع نستخدم parameter زي باقي الملف؟
suggestion (non-blocking): الحسبة دي نفس اللي في cart.ts، ممكن تبقى applyCoupon واحدة في lib/pricing؟
nitpick (non-blocking): couponData ممكن تبقى coupon، الـ Data مش بتضيف معلومة.
praise: اختبار الـ 200 بالظبط ممتاز، ده كان هيفوتني.`,
          try: R`خد ٥ تعليقات review كتبتها أو اتكتبت عليك (أو التعليقات دي: «غلط»، «ليه عملت كده؟؟»، «استخدم map»، «مش هيشتغل»، «rename»). أعد كتابة كل واحد بالشكل ده: النوع، و blocking ولا لأ، والمشكلة، وليه، واقتراح.`,
          sol: R`مثال لإعادة الكتابة:

«غلط» تبقى: [[issue (blocking): لو items فاضية، reduce من غير قيمة ابتدائية بترمي TypeError. ينفع نضيف 0؟]]

«ليه عملت كده؟؟» تبقى: [[question: ليه الـ retry هنا جوه الـ loop؟ خايف لو الـ API واقع نبعت 30 request.]] نفس السؤال، من غير اتهام، ومعاه السبب اللي مقلقك.

«استخدم map» تبقى: [[nitpick (non-blocking): map هنا ممكن تشيل الـ push والمتغير المؤقت.]]

«مش هيشتغل» تبقى: [[issue (blocking): جرّبته محليًا بكوبون منتهي وعدّى. خطوات: ...]] الـ blocking لازم معاه دليل أو سيناريو.

«rename» تبقى: [[nitpick: data ممكن تبقى orders؟]]

لاحظ إن كل blocker فيه سيناريو بيبوظ، وكل ذوق بقى nitpick. الغلط الشائع إنك تعلّم كل حاجة blocking، فصاحب الـ PR ميعرفش إيه المهم بجد، أو متعلّمش أي حاجة فيضطر يصلّح الـ ٢٠ تعليق عشان مش عارف.`,
          flag: "script",
          deep: {
            why: R`الكلام المكتوب بيتقري أقسى من ما اتقال. «غيّر ده» ممكن تبقى في دماغك عادية، وصاحب الـ PR يقراها إنك شايفه مش فاهم. ومع الوقت الـ reviews بتتحول لخناق، والناس بتعمل PRs أكبر عشان «يخلصوا من المراجعة مرة واحدة». والتصنيف (blocking ولا لأ) بيوفّر رايح جاي كتير: الـ PR بيتدمج بعد الـ blockers، والـ nits تتصلّح أو تتأجل.`,
            how: R`نصايح بتفرق:

علّق على الكود مش الشخص: «الدالة دي بترجّع null» مش «انت نسيت».

اسأل لما مش متأكد: «فاتني حاجة؟ ده مش بيعمل كذا؟» ساعات انت اللي غلطان، والسؤال بيخلي ده سهل.

اقترح الحل: GitHub بيخليك تكتب [[suggestion]] block في التعليق (بتكتب ٣ backticks وبعدها كلمة suggestion وتحط الكود الجديد)، وصاحب الـ PR يطبّقه بزرار «Commit suggestion».

اعمل review واحد مش ٢٠ إشعار: في GitHub «Start a review» بيجمّع التعليقات وبتتبعت مرة واحدة مع قرار: Comment أو Approve أو Request changes. ومن الترمنال: [[gh pr review 42 --request-changes --body "..."]].

الـ Approve مع nits مقبول: «Approve، والـ nits براحتك». ده بيوفّر يوم.

والمدح حقيقي مش مجاملة: لو حاجة عجبتك قولها بتحديد. بيعلّم الفريق إيه اللي عايزين منه أكتر.

ولو النقاش عدّى ٣ ردود في نفس التعليق، كلّم الشخص صوت أو في مكالمة ٥ دقايق، واكتب القرار في الـ thread.`,
            when: "كل تعليق review. وأهم ما يكون مع ناس جديدة في الفريق، ومع الـ PRs من contributors في open source، لأنهم ممكن ميرجعوش لو التعليق كان جاف.",
            mistakes: R`«?» لوحدها أو «no». وتعلّق على الـ formatting اللي المفروض prettier يعمله. و Request changes على nits بس. وتكتب «ليه مش عملت كذا؟» وانت قصدك «اعمل كذا»: قول اللي عايزه بوضوح ومعاه السبب. وفي الانترفيو لو اتسألت «لو مش موافق على كود زميل senior؟»: بتسأل بسؤال ومعاك سبب أو سيناريو، ولو فضل الخلاف، النقاش بيتنقل لمكالمة أو لحد تالت، والقرار بيتكتب.`
          },
          teach: R`## الفكرة

المثال ٥ تعليقات review مكتوبة بأسلوب Conventional Comments: كل تعليق بيبدأ بنوعه، وبعده هل بيوقّف الدمج ولا لأ، وبعدين المشكلة وليه. هنفك شكل التعليق الأول، وبعدين كل سطر من الخمسة. ده درس مفاهيم: مفيش أوامر تتشغّل.

---

## ١. شكل التعليق

~~~text الشكل
<label> (<decoration>): <subject>
~~~

| الجزء | معناه | مثال |
|---|---|---|
| label | نوع التعليق | [[question]] و [[issue]] و [[suggestion]] و [[nitpick]] و [[praise]] |
| decoration (اختياري) | بيوقّف الدمج ولا لأ | [[(blocking)]] أو [[(non-blocking)]] |
| subject | المشكلة وليه، وغالبًا اقتراح على شكل سؤال | |

الفايدة: صاحب الـ PR يعرف من أول كلمة أنهي تعليق لازم يتصلّح قبل الدمج وأنهي رأي.

---

## ٢. التعليقات الخمسة

### [[question:]]

> question: لو الـ gateway رد بـ timeout، الطلب بيفضل pending للأبد؟ مش شايف مين بيرجّعه.

سؤال حقيقي: الـ reviewer مش متأكد. فيه **سيناريو محدد** (timeout)، وفيه اللي مقلقه (محدش بيرجّع الطلب)، ومفيهوش اتهام. وممكن صاحب الـ PR يرد «فيه cron بيعمل ده» والنقاش يخلص.

### [[issue (blocking):]]

> issue (blocking): الـ code داخل الـ query كنص، ده SQL injection. ينفع نستخدم parameter زي باقي الملف؟

مشكلة لازم تتصلّح قبل الدمج. بتقول **ليه خطيرة** (SQL injection: حد يكتب كود SQL في خانة الكوبون ويتنفذ على الداتابيز)، والحل جاي كسؤال ومعاه مرجع من نفس الملف.

### [[suggestion (non-blocking):]]

> suggestion (non-blocking): الحسبة دي نفس اللي في cart.ts، ممكن تبقى applyCoupon واحدة في lib/pricing؟

اقتراح ليه سبب (تكرار، درس DRY)، بس مش شرط للدمج. ممكن يتعمل في PR تاني.

### [[nitpick (non-blocking):]]

> nitpick (non-blocking): couponData ممكن تبقى coupon، الـ Data مش بتضيف معلومة.

ذوق: صاحب الـ PR يقرر. nitpick (وبيتكتب nit اختصارًا) يعني تفصيلة صغيرة.

### [[praise:]]

> praise: اختبار الـ 200 بالظبط ممتاز، ده كان هيفوتني.

مدح **محدد**: بيقول إيه اللي كويس بالظبط، فالفريق يعرف إيه اللي عايزين منه أكتر.

---

## ٣. قبل وبعد

| قبل | بعد |
|---|---|
| غلط | [[issue (blocking): لو items فاضية، reduce من غير قيمة ابتدائية بترمي TypeError. ينفع نضيف 0؟]] |
| ليه عملت كده؟؟ | [[question: ليه الـ retry جوه الـ loop؟ خايف لو الـ API واقع نبعت 30 request.]] |
| غيّر ده | [[suggestion: ...]] ومعاه السبب |

القاعدة: كل **blocking** معاه سيناريو بيبوظ أو دليل. وكل ذوق بيبقى **nitpick**.

---

## ٤. في GitHub

| الأداة | بتعمل إيه |
|---|---|
| suggestion block | في التعليق تكتب ٣ backticks وبعدها كلمة [[suggestion]]، والكود الجديد، وتقفل. صاحب الـ PR يطبّقه بزرار «Commit suggestion» |
| Start a review | يجمّع التعليقات وتتبعت مرة واحدة بدل ٢٠ إشعار |
| القرار | Comment أو Approve أو Request changes |

---

## الخلاصة

- التعليق: النوع، و blocking ولا لأ، والمشكلة، وليه، واقتراح.
- علّق على الكود مش الشخص: «الدالة دي بترجّع null» مش «انت نسيت».
- اسأل لما مش متأكد: ممكن صاحب الـ PR عنده سبب انت مش شايفه.
- Approve مع nits مقبول، و Request changes على nits بس لأ.`,
          lines: [
            "سؤال: مش متأكد، ومعاه سيناريو محدد، ومش بيتهم.",
            "مشكلة بتوقّف الدمج: ليه خطيرة، ومعاها الحل على شكل سؤال.",
            "اقتراح مش ضروري للدمج، ومعاه السبب (تكرار).",
            "ذوق: صاحب الـ PR يقرر.",
            "مدح محدد: بيقول إيه بالظبط اللي كويس."
          ]
        },
        {
          cmd: "تستقبل review",
          title: "تعليقات كتير على الـ PR بتاعك، وبعدين؟",
          desc: R`التعليقات على الكود مش عليك. اقراها كلها الأول قبل ما ترد على أي واحد، واشكر، وبعدين لكل تعليق: يا تصلّح وتقول صلّحت فين، يا تشرح ليه لأ بهدوء ومعاك سبب، يا تسأل لو مش فاهم. ومتقفلش thread بنفسك من غير رد.

والتصليحات تبقى commits صغيرة من نوع fixup: [[git commit --fixup=<hash>]] بيعمل commit مربوط بالـ commit اللي بيصلّحه. الـ reviewer يشوف التغيير الجديد بس، وقبل الدمج [[--autosquash]] بيدمج كل fixup في الـ commit بتاعه.`,
          example: R`gh pr view 42 --comments
git commit --fixup=a1b2c3d
git push
gh pr comment 42 --body "Fixed in 9f8e7d6. Kept 3 retries, reason in the thread."
gh pr edit 42 --add-reviewer sara
git rebase -i --autosquash main
git push --force-with-lease
gh pr review 42 --approve`,
          try: R`في repo تجربة: branch فيها commitين ([[feat: add b]] و [[feat: add c]]). اعمل تعديل على ملف الأول وعمله [[git commit --fixup=<hash الأول>]]، وشوف [[git log --oneline]]. وبعدين [[git rebase -i --autosquash main]] (احفظ واقفل الـ editor من غير ما تغيّر حاجة) وشوف الـ log تاني.`,
          sol: R`قبل الـ rebase الـ log شكله: [[fixup! feat: add b]] فوق، وتحته [[feat: add c]] و [[feat: add b]]. والـ editor بيفتح والـ fixup متنقل لوحده تحت [[pick ... feat: add b]] ومكتوب قبله [[fixup]]. بعد ما تحفظ، الـ log بيرجع commitين بس، و [[git show HEAD~1]] بيوريك إن التعديل بقى جوه [[feat: add b]]. وهاشات الـ commits اتغيرت، فعشان كده الـ push بعدها لازم [[--force-with-lease]].

إمتى تعمل الـ autosquash: بعد ما الـ reviewer يوافق، مش قبلها، عشان يفضل شايف التغييرات الجديدة بس. ولو الفريق بيعمل squash merge، مش محتاجه خالص: GitHub هيدمج كل حاجة commit واحد.

الغلط الشائع: [[git push --force]] من غير lease، فتمسح commit زميلك زقّه على نفس الـ branch (ولو حد عمل «Commit suggestion» من GitHub، ده commit على الـ branch بتاعك مش عندك). و [[--force-with-lease]] بيرفض لو الـ branch على GitHub اتغير من آخر مرة شفته.`,
          deep: {
            why: R`أول review كبير على الـ PR بتاعك بيحسّسك إنك بتتحاكم، وده طبيعي. بس الـ reviewer اللي كتب ١٥ تعليق صرف ساعة يقرا كودك بتركيز، وده أحسن من إن الـ bugs دي تطلع في الإنتاج. واللي بيستقبل الـ review كويس (بيصلّح بسرعة، وبيشرح من غير ما يدافع، وبيتعلم) بيتراجعله أسرع وبيتثق فيه أسرع. وده من أسرع الطرق إنك تكبر كـ جونيور.`,
            how: R`[[gh pr view --comments]] بيطبع الوصف والتعليقات في الترمنال.

الـ fixup: [[git commit --fixup=a1b2c3d]] بيعمل commit رسالته [[fixup! <رسالة a1b2c3d>]]. وهاش الـ commit بتجيبه من [[git log --oneline]]. والـ reviewer في GitHub يقدر يشوف «changes since your last review» بس.

الرد على كل تعليق: «صلّحت في 9f8e7d6» فيها الهاش، فالـ reviewer يضغط عليه ويشوف التصليح لوحده. ولو مش موافق: «فكرت في كده، بس X لأن Y. لو لسه شايف إنه أحسن، أغيّره». وسيب الـ reviewer هو اللي يقفل الـ thread لو ده عرف الفريق.

طلب المراجعة تاني: [[gh pr edit --add-reviewer]] أو زرار re-request جنب اسمه في GitHub.

[[git rebase -i --autosquash main]] بيفتح قايمة الـ rebase وكل fixup متحط تحت الـ commit بتاعه، فبتحفظ وتقفل. وفي نسخ Git الجديدة [[--autosquash]] بيشتغل من غير [[-i]] كمان.

وده دور الـ reviewer لما يخلص: [[gh pr review 42 --approve]]، أو [[--request-changes]] أو [[--comment]] ومعاهم [[--body]]. (أساسيات [[gh pr]] و [[git rebase]] في تاب Git.)`,
            when: "كل مرة حد يراجعلك. وقاعدة معقولة: رد على الـ review في نفس اليوم، حتى لو «هصلّحهم بكرة الصبح».",
            mistakes: R`ترد على كل تعليق بدفاع («بس ده شغال»)، أو توافق على كل حاجة من غير ما تفكر، حتى الغلط. وتعمل commit واحد اسمه «address comments» فيه ٢٠ تغيير ملهمش علاقة ببعض. وتعمل force push بـ rebase في نص الـ review، فالـ reviewer يفقد مكانه ومش عارف إيه الجديد. وتقفل threads من غير رد. وفي الانترفيو لو اتسألت «احكيلي عن review اختلفت فيه مع حد»: احكي إزاي فهمت وجهة نظره، والسبب اللي شرحته، والقرار اللي وصلتوا له، ومش مهم مين كان صح.`
          },
          teach: R`## الفكرة

الأوامر بتمشي مع الـ review من أوله لآخره: تقرا التعليقات، تصلّح بـ commits من نوع fixup، ترد وتطلب المراجعة تاني، وبعد الموافقة تدمج الـ fixups في مكانها. الجزء بتاع Git عملناه بالظبط زي «جرّب» في repo تجريبي، و [[origin]] repo محلي (bare) بدل GitHub، بـ Git 2.56 على ويندوز. وأوامر [[gh]] مشغّلناهاش لأنها بتكتب على PR حقيقي، وشرحها من [[gh <command> --help]] (gh 2.97).

---

## ١. [[gh pr view 42 --comments]]

بيطبع الـ PR والتعليقات كلها في الترمنال ([[--comments]] أو [[-c]]). اقراهم **كلهم** قبل ما ترد على أي واحد: ساعات تعليق ١٢ بيغيّر رأيك في تعليق ٣.

---

## ٢. [[git commit --fixup=<hash>]]

البداية: branch فيها commitين:

~~~text الناتج: git log --oneline
d80e9bd feat: add c
c27e965 feat: add b
1e8930e init
~~~

التعليق كان على [[feat: add b]]. صلّحنا الملف، وبدل commit اسمه «address comments»:

~~~bash
git commit -a --fixup=c27e965
~~~

- [[-a]]: ضيف كل الملفات المتتبعة اللي اتغيرت.
- [[--fixup=c27e965]]: اعمل commit رسالته [[fixup!]] + رسالة الـ commit ده. الهاش بتجيبه من [[git log --oneline]].

~~~text الناتج: git log --oneline
2fef88b fixup! feat: add b
d80e9bd feat: add c
c27e965 feat: add b
1e8930e init
~~~

والـ fixup بيتعمله [[git push]] عادي: الـ reviewer يشوف التصليح لوحده («changes since your last review» في GitHub).

---

## ٣. الرد وطلب المراجعة تاني

| الأمر | بيعمل إيه |
|---|---|
| [[gh pr comment 42 --body "Fixed in 9f8e7d6. ..."]] | تعليق على الـ PR. الهاش في الرد بيبقى لينك، فالـ reviewer يضغط عليه ويشوف التصليح بس |
| [[gh pr edit 42 --add-reviewer sara]] | اطلب المراجعة من سارة تاني |

ولو مش موافق على تعليق: «فكرت في كده، بس X لأن Y». السبب، مش الدفاع.

---

## ٤. [[git rebase -i --autosquash main]]

بعد الموافقة، الـ fixups تندمج في الـ commits بتاعتها:

- [[rebase]]: إعادة كتابة الـ commits فوق [[main]].
- [[-i]] (interactive): يفتح قايمة الـ commits في الـ editor قبل ما ينفّذ.
- [[--autosquash]]: يرتّب القايمة لوحده: كل [[fixup!]] تحت الـ commit بتاعه، ومكتوب قبله [[fixup]].

القايمة اللي اتفتحت:

~~~text الناتج: الـ todo list
pick c27e965 # feat: add b
fixup 2fef88b # fixup! feat: add b
pick d80e9bd # feat: add c
~~~

[[pick]] يعني خد الـ commit زي ما هو، و [[fixup]] يعني ادمجه في اللي فوقه وارمي رسالته. الـ fixup اتنقل لوحده من فوق لمكانه. احفظ واقفل من غير ما تغيّر حاجة:

~~~text الناتج
Successfully rebased and updated refs/heads/feat.
~~~

~~~text الناتج: git log --oneline
71d3d5d feat: add c
2e09b40 feat: add b
1e8930e init
~~~

رجعوا commitين، و [[git show HEAD~1]] ([[HEAD~1]] يعني الـ commit اللي قبل الأخير) بيوري إن التعديل بقى جوه [[feat: add b]]. ولاحظ إن الهاشات **اتغيرت**: [[c27e965]] بقى [[2e09b40]]، لأن محتواه اتغير. وفي Git 2.56 جرّبنا [[git rebase --autosquash main]] من غير [[-i]] واشتغل برضه.

---

## ٥. [[git push --force-with-lease]]

الهاشات اتغيرت، فالـ branch اللي على الـ remote مبقتش جزء من تاريخك. [[git push]] العادي اترفض:

~~~text الناتج
hint: use 'git pull' before pushing again.
~~~

فلازم force. و [[--force-with-lease]] بيعمل force **بشرط** إن الـ branch على الـ remote لسه زي آخر مرة شفتها:

~~~text الناتج
 + 2fef88b...71d3d5d feat -> feat (forced update)
~~~

وجرّبنا الحالة الخطر: زميلة زقّت commit على نفس الـ branch (زي «Commit suggestion» من GitHub) وانت مشفتهوش:

~~~text الناتج: git push --force-with-lease
 ! [rejected]        feat -> feat (stale info)
error: failed to push some refs to '../fx-origin.git'
~~~

[[stale info]] يعني «معلوماتك قديمة»: الـ lease رفض، و commit زميلتك اتحمى. [[--force]] العادي كان هيمسحه من غير كلمة.

---

## ٦. [[gh pr review 42 --approve]]

ده دور الـ reviewer في الآخر. ومعاه بدايل: [[--request-changes]] و [[--comment]]، ومعاهم [[--body "..."]].

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| اقرا كل حاجة | [[gh pr view 42 --comments]] |
| صلّح | [[git commit --fixup=<hash>]] ثم [[git push]] |
| رد واطلب تاني | [[gh pr comment]] و [[gh pr edit --add-reviewer]] |
| بعد الموافقة | [[git rebase -i --autosquash main]] |
| ارفع | [[git push --force-with-lease]] (مش [[--force]]) |

- التعليقات على الكود مش عليك: صلّح وقول فين، أو اشرح ليه لأ، أو اسأل.
- الـ autosquash بعد الموافقة، مش في نص الـ review. ولو الفريق بيعمل squash merge، مش محتاجه.`,
          lines: [
            "اقرا كل التعليقات الأول، في الترمنال.",
            "التصليح commit مربوط بالـ commit اللي بيصلّحه.",
            "ارفعه عادي. الـ reviewer يشوف التغيير الجديد بس.",
            "رد على التعليق: صلّحت فين، أو ليه لأ.",
            "اطلب المراجعة تاني.",
            "بعد الموافقة: ادمج كل fixup في الـ commit بتاعه (احفظ واقفل الـ editor).",
            "الـ rebase غيّر الهاشات، فلازم force، والـ lease بيحمي شغل حد تاني على نفس الـ branch.",
            "وده اللي الـ reviewer بيعمله في الآخر: الموافقة من الترمنال."
          ]
        },
        {
          cmd: "draft PR و التقسيم",
          title: "ميزة أسبوعين من غير PR بـ ٣٠٠٠ سطر",
          desc: R`الـ draft PR بيقول «ده لسه مش جاهز للمراجعة، بس شوفوه». بتفتحه بدري (من أول يوم) عشان الـ CI يشتغل، ولو عايز رأي في الاتجاه قبل ما تكمّل. ولما يخلص، [[gh pr ready]].

والميزة الكبيرة بتتقسم لـ PRs صغيرة، كل واحد بيتدمج لوحده في main: الـ schema، وبعدين الـ API، وبعدين الـ UI. والجزء اللي لسه مش جاهز للمستخدمين يتخبّى ورا feature flag. كده مفيش branch عايشة أسبوعين بتبعد عن main كل يوم.`,
          example: R`git switch -c coupon/1-schema main
gh pr create --draft --fill
gh pr ready
git switch -c coupon/2-api
gh pr create --base coupon/1-schema --fill
gh pr list --author @me`,
          try: R`خد ميزة كبيرة عندك (أو «الكوبونات»: جدول، و API للتطبيق، و UI، وصفحة admin تعمل كوبونات). قسّمها على الورق لـ ٤ PRs أو أكتر. لكل PR اكتب: العنوان، وبيعتمد على أنهي PR، وهل ينفع يتدمج في main من غير ما المستخدم يشوف حاجة ناقصة (ولو لأ، إيه الـ flag).`,
          sol: R`تقسيم معقول:

١. [[feat(db): coupons table]]: migration وموديل Prisma بس. مش مربوط بحاجة، فآمن يتدمج.
٢. [[feat(pricing): applyCoupon]]: الدالة الـ pure واختباراتها. ولا حد بيناديها لسه.
٣. [[feat(api): POST /api/coupons/apply]]: بيعتمد على ١ و ٢. الـ endpoint موجود بس مفيش UI بيناديه.
٤. [[feat(checkout): coupon box]]: الـ UI، ورا flag [[COUPONS_ENABLED]]، فبيتدمج ومحدش بيشوفه غير فريق الـ QA.
٥. [[feat(admin): create coupons]]: ممكن يمشي بالتوازي مع ٤.
٦. [[chore: enable coupons]]: تشيل الـ flag (أو تقلبه) بعد ما الكل اتجرّب.

كل PR من دول بيتراجع في ربع ساعة، و ١ و ٢ ممكن يتدمجوا يوم ٢. الغلط الشائع إنك تقسّم على الطبقات بس من غير ما كل PR يبقى سليم لوحده: PR فيه UI بينادي endpoint لسه متدمجش هيكسر main. والتاني: flag بيفضل في الكود ٦ شهور بعد الإطلاق. الـ flag ليه PR شيل زي ما ليه PR إضافة.`,
          deep: {
            why: R`الـ branch اللي عايشة أسبوعين بتبعد عن main، فالـ merge في الآخر بيبقى conflicts كتير، والـ PR بيبقى ضخم ومحدش بيراجعه بجد. والتقسيم بيخلي كل حتة تتراجع صح، وبيكشف مشاكل التصميم بدري (الـ reviewer شاف الـ schema يوم ٢ مش يوم ١٤)، ولو حاجة باظت في الإنتاج بتعرف أنهي PR.`,
            how: R`[[--draft]]: الـ PR بيظهر رمادي، ومينفعش يتدمج، والـ code owners مبيتطلبلهمش مراجعة لحد ما يبقى ready. والـ CI بيشتغل عادي (لو الـ workflow مش مستثني الـ drafts). و [[gh pr ready]] بيقلبه، و [[gh pr ready --undo]] بيرجّعه draft.

الـ stacked PRs: PR ٢ متفرع من PR ١ مش من main، و [[--base coupon/1-schema]] بيخلي الـ diff يعرض الفرق عن PR ١ بس. لما PR ١ يتدمج والـ branch بتاعته تتمسح، GitHub غالبًا بيحوّل base الـ PR التاني لـ main لوحده. ولو استخدمتوا squash merge، ممكن تحتاج rebase للتاني على main ([[git rebase --onto main coupon/1-schema]]). فيه أدوات بتسهّل الـ stacks، بس الأسهل تخلي الـ stack قصير (٢ أو ٣).

الـ feature flag في أبسط شكل: env variable أو صف في جدول إعدادات، و [[if (flags.coupons)]] حوالين نقطة الدخول (الزرار) مش في كل مكان. وفيه خدمات flags جاهزة للـ rollout التدريجي (١٠٪ من المستخدمين)، بس ابدأ بالبسيط.

وده اللي بيخلي trunk-based development ممكن: كل الفريق بيدمج في main كل يوم أو اتنين، بدل branches طويلة و release branches.`,
            when: "أي ميزة هتاخد أكتر من ٢ أو ٣ أيام، أو هتعدّي ٤٠٠ سطر. والـ draft من أول ما تعمل push لو عايز الـ CI أو رأي بدري.",
            mistakes: R`draft بيفضل draft أسبوعين وبعدين بيتحول ready وهو ٣٠٠٠ سطر: ده نفس المشكلة بلون رمادي. و PRs مقسّمة بس كل واحد بيكسر main لوحده. و stack بـ ٧ PRs، فأي تعديل في الأول بيتطلب rebase للستة اللي بعده. وتنسى الـ flags في الكود. وفي الانترفيو لو اتسألت «هتسلّم ميزة كبيرة إزاي؟»: قسّمها لـ PRs كل واحد سليم لوحده، والـ UI الناقص ورا flag، والـ draft بدري للرأي في الاتجاه.`
          },
          teach: R`## الفكرة

الأوامر بتعمل «stack» من PRs: الجزء الأول (الـ schema) PR من main، والجزء التاني (الـ API) متفرع من الأول، والـ PR بتاعه بيقارن بالأول مش بـ main. الجزء بتاع Git عملناه في repo تجريبي بـ Git 2.56 على ويندوز. وأوامر [[gh]] مشغّلناهاش لأنها بتفتح PRs حقيقية على GitHub، وشرحها من [[gh pr create --help]] و [[gh pr ready --help]] (gh 2.97).

---

## ١. [[git switch -c coupon/1-schema main]]

- [[switch]]: انتقل لـ branch.
- [[-c]] (create): اعملها الأول.
- [[coupon/1-schema]]: الاسم. الـ [[/]] مجرد جزء من الاسم، والرقم بيقول ترتيبه في الـ stack.
- [[main]] في الآخر: اعملها من main، مش من الـ branch اللي انت عليها.

~~~text الناتج
Switched to a new branch 'coupon/1-schema'
~~~

وعملنا عليها commit: [[feat(db): coupons table]].

---

## ٢. [[gh pr create --draft --fill]]

| الجزء | معناه |
|---|---|
| [[--draft]] | الـ PR بيتفتح draft: رمادي، ومينفعش يتدمج، والـ code owners مبيتطلبوش |
| [[--fill]] | العنوان والوصف من رسايل الـ commits، عشان متكتبش حاجة دلوقتي |

الـ CI بيشتغل على الـ draft عادي، والفريق يقدر يبص على الاتجاه بدري.

---

## ٣. [[gh pr ready]]

خلصت؟ بيحوّل الـ PR من draft لـ «جاهز للمراجعة»، وساعتها الـ reviewers والـ code owners بيتطلبوا. و [[gh pr ready --undo]] بيرجّعه draft.

---

## ٤. [[git switch -c coupon/2-api]]

من غير اسم branch في الآخر، فبتتعمل من اللي انت عليه دلوقتي: [[coupon/1-schema]]. وعملنا عليها commit الـ API:

~~~text الناتج: git log --oneline --graph --all
* b1359b1 feat(api): POST /api/coupons/apply
* 39536f5 feat(db): coupons table
* dacca61 init
~~~

[[--graph]] بيرسم الفروع بـ [[*]] و [[|]]، و [[--all]] بيعرض كل الـ branches. هنا خط واحد: الـ API فوق الـ schema فوق init.

---

## ٥. [[gh pr create --base coupon/1-schema --fill]]

[[--base]] بيحدد الـ branch اللي الـ PR هيتدمج فيها، ومنها بيتحسب الـ diff. جرّبنا الفرق بنفسنا بـ git:

~~~text الناتج: git diff coupon/1-schema...coupon/2-api --stat
 api.txt | 1 +
 1 file changed, 1 insertion(+)
~~~

~~~text الناتج: git diff main...coupon/2-api --stat
 api.txt    | 1 +
 schema.sql | 1 +
 2 files changed, 2 insertions(+)
~~~

بـ base الـ schema، الـ reviewer بيشوف الـ API بس. لو كان base بتاعه main، كان هيشوف الـ schema تاني وهي متراجعة في PR تاني.

### لما PR ١ يتدمج

عملنا squash merge لـ PR ١ في main (كل الـ commits بقت commit واحد جديد). الـ commit القديم [[39536f5]] مبقاش موجود في main بنفس الهاش، فالـ branch التانية لازم تتنقل:

~~~bash
git rebase --onto main coupon/1-schema
~~~

يعني: «خد الـ commits اللي بعد [[coupon/1-schema]]، وحطها فوق [[main]]».

~~~text الناتج: git log --oneline --graph --all
* 188d49e feat(api): POST /api/coupons/apply
* 28686cb feat(db): coupons table (#41)
| * 39536f5 feat(db): coupons table
|/
* dacca61 init
~~~

الـ API بقى فوق commit الـ squash على main، والـ branch القديمة لوحدها على الجنب (بتتمسح بعد الدمج). وده سبب إن الـ stack يفضل قصير: كل PR بيتدمج بيحرّك اللي بعده.

---

## ٦. [[gh pr list --author @me]]

كل الـ PRs المفتوحة بتاعتك وحالتها. [[@me]] اختصار لحسابك انت.

---

## ٧. حل التمرين: التقسيم

| PR | فيه | يتدمج لوحده؟ |
|---|---|---|
| ١ | migration وموديل Prisma | آه، محدش بيستخدمه لسه |
| ٢ | [[applyCoupon]] الـ pure واختباراتها | آه |
| ٣ | [[POST /api/coupons/apply]] | آه، بس مفيش UI بيناديه |
| ٤ | خانة الكوبون في الـ checkout | آه، ورا flag [[COUPONS_ENABLED]] |
| ٥ | صفحة admin | بالتوازي مع ٤ |
| ٦ | شيل الـ flag | بعد ما الكل اتجرّب |

كل PR سليم لوحده: main مبيتكسرش في أي لحظة.

---

## الخلاصة

- [[--draft]] من أول push: الـ CI يشتغل والفريق يشوف الاتجاه، و [[gh pr ready]] لما يخلص.
- الميزة الكبيرة PRs صغيرة، كل واحد بيتدمج في main لوحده، والـ UI الناقص ورا flag.
- [[--base]] للـ stacked PR بيخلي الـ diff يعرض جزءه بس. والـ stack قصير (٢ أو ٣).
- بعد squash merge للأول: [[git rebase --onto main <branch الأول>]].`,
          lines: [
            "branch لأول جزء، من main.",
            "PR كـ draft من أول push: الـ CI يشتغل والفريق يشوف الاتجاه.",
            "خلص؟ حوّله ready، ودلوقتي الـ reviewers بيتطلبوا.",
            "الجزء التاني متفرع من الأول، مش من main.",
            "الـ PR التاني base بتاعه الأول، فالـ diff بيعرض الـ API بس.",
            "كل الـ PRs المفتوحة بتاعتك، وحالة كل واحد."
          ]
        },
        {
          cmd: "التقدير",
          title: "«هتخلص إمتى؟» وانت مش عارف لسه",
          desc: R`أول أسبوع في الشغل حد هيسألك «دي هتاخد قد إيه؟». الإجابة الغلط رقم من دماغك عشان تبان واثق. الإجابة الصح: قسّم المهمة لحاجات كل واحدة أقل من يوم، وقدّر كل واحدة، واكتب المجهول لوحده، واتكلم بمدى مش بوعد: «من ٣ لـ ٥ أيام».

و «مش عارف لسه» إجابة محترمة لو معاها خطة: «مش عارف لسه، هبص في الكود ساعتين وأقولك النهارده قبل الساعة ٤».`,
          example: R`Ticket: الكوبونات في الـ checkout
جدول coupons + migration ...................... نص يوم
POST /api/coupons/apply + validation + اختبارات .. يوم
UI: خانة الكوبون وحالاتها (تحميل، مرفوض، مقبول) .. يوم
e2e للمسار الأساسي ............................ نص يوم
مجهول: Paymob بياخد المبلغ بعد الخصم إزاي؟ ...... spike نص يوم
التقدير: من ٣ لـ ٥ أيام، وهأكد بكرة الضهر بعد الـ spike`,
          try: R`خد ticket حقيقي (أو «المستخدم يقدر يغيّر الإيميل بتاعه بعد ما يأكده») واكتب تقدير بنفس الشكل: كل سطر أقل من يوم، والمجهول لوحده، والإجمالي مدى، ومتى هتأكد. وبعد ما تخلص المهمة، قارن كل سطر باللي حصل فعلًا واكتب أكبر فرق وسببه.`,
          sol: R`تقدير معقول لتغيير الإيميل: endpoint بيبعت كود للإيميل الجديد (نص يوم)، وتأكيد الكود وتغيير الإيميل في transaction (نص يوم)، وإيميل تنبيه للإيميل القديم (ساعتين)، و UI للخطوتين (يوم)، واختبارات (نص يوم). المجهول: «الإيميل مستخدم في الـ login بتاع OAuth؟ لو آه، التغيير بيأثر على ربط الحساب». الإجمالي: ٣ لـ ٤ أيام، وأكد بعد ما أعرف موضوع OAuth.

لاحظ إن التقسيم نفسه طلّع حاجات كانت هتتنسي (إيميل التنبيه للقديم، ودي حاجة أمان). ده نص فايدة التقدير.

وفي المقارنة بعد الشغل، غالبًا أكبر فرق هيبقى في حاجة مكانتش في القايمة خالص (مراجعة، أو bug لقيته في الطريق، أو اجتماع)، مش في سطر اتقدّر غلط. عشان كده المدى لازم يسيب مساحة، ومع الوقت بتعرف معامل التصحيح بتاعك (ناس كتير بتضرب في ١.٥). الغلط الشائع: تقدّر وقت الكتابة بس، وتنسى الاختبارات والمراجعة والتعديلات والـ deploy.`,
          flag: "script",
          deep: {
            why: R`التقدير مش امتحان إنك سريع. الفريق محتاجه عشان يخطط: الـ PM بيوعد عميل، وحد تاني مستني الـ API بتاعك. والتقدير المتفائل اللي بيطلع غلط أسوأ بكتير من التقدير الأطول: لأن كل اللي بنوا عليه اتلخبطوا. والجونيور اللي بيقول «مش عارف، هعرف بكرة» وبيبلّغ بدري لما حاجة تتأخر، بيتثق فيه أكتر من اللي بيقول «يومين» كل مرة وبياخد أسبوع.`,
            how: R`القسمة: أي سطر أكبر من يوم، معناه إنك لسه مش فاهمه. قسّمه تاني. والسطور بتيجي من الطبقات (داتا، و API، و UI، واختبارات) ومن «إيه اللي ممكن يبوظ».

الـ acceptance criteria: قبل ما تقدّر، اتأكد إن الـ ticket فيه «إمتى نقول خلص» (زي: الكوبون المنتهي بيترفض برسالة، والمبلغ في الفاتورة بعد الخصم). لو مش موجودة، اسأل: التقدير لحاجة مش متعرّفة مالوش معنى. والـ definition of done بتاع الفريق (اختبارات، ومراجعة، و deploy على staging) جزء من الوقت.

الـ spike: وقت محدد (نص يوم مثلًا) تستكشف فيه المجهول بس، والنتيجة معلومة مش كود للإنتاج. بعده بتقدّر الجزء ده بجد.

المدى مش رقم: «٣ لـ ٥» بتقول قد إيه انت متأكد. والفرق بين الرقمين بيصغر كل ما المجهول يتحل.

التأخير: أول ما تعرف إنك هتتأخر، قول، ومعاك السبب والتقدير الجديد: «الـ Paymob طلع محتاج webhook، ده يوم زيادة، التقدير الجديد الخميس». مش آخر يوم.

وفي Scrum فيه story points (حجم نسبي مش أيام) و planning poker، والفكرة نفسها: قسّم، وقارن بحاجات عملتها قبل كده، واتكلم عن المجهول.`,
            when: "كل ما حد يسألك «قد إيه؟»، وفي الـ planning، وقبل ما تبدأ أي حاجة أكبر من يوم حتى لو محدش سأل، عشان انت تعرف انت فين.",
            mistakes: R`ترد فورًا برقم تحت الضغط. وتقدّر وقت الكتابة بس. وتسكت لما تتأخر على أمل إنك تلحق. وتعمل padding سري (تقول ١٠ وانت شايفها ٣) بدل ما تقول المجهول بصراحة. وتعامل تقديرك كوعد، أو تعامل تقدير غيرك كوعد. وفي الانترفيو لو اتسألت «لو اتسألت عن مهمة مش عارف تقدّرها؟»: هقسّمها، وهحدد المجهول، وهعمل spike قصير بوقت محدد، وهرجع بمدى وبموعد أأكد فيه، وهبلّغ بدري لو اتغير.`
          },
          teach: R`## الفكرة

المثال تقدير مكتوب لـ ticket الكوبونات: كل سطر شغلانة أقل من يوم، والمجهول في سطر لوحده، والنتيجة مدى مش رقم، ومعاها إمتى هتأكد. هنفكه سطر سطر ونجمع الأرقام. ده درس مفاهيم: مفيش أوامر تتشغّل.

---

## ١. السطور المعروفة

| السطر | التقدير | ليه موجود |
|---|---|---|
| جدول [[coupons]] + migration | نص يوم | الداتا الأول |
| [[POST /api/coupons/apply]] + validation + اختبارات | يوم | الاختبارات **جوه** السطر، مش حاجة بعده |
| UI: الخانة وحالاتها (تحميل، مرفوض، مقبول) | يوم | الحالات هي اللي بتاخد الوقت، مش الخانة |
| e2e للمسار الأساسي | نص يوم | اختبار من أول الكارت لحد الدفع |

القاعدة: أي سطر أكبر من يوم معناه إنك لسه مش فاهمه كفاية، فقسّمه تاني.

---

## ٢. المجهول

> مجهول: Paymob بياخد المبلغ بعد الخصم إزاي؟ ...... spike نص يوم

ده سؤال محدش يعرف إجابته لسه، فمينفعش يتقدّر. اللي بيتقدّر هو **الوقت اللي هتعرف فيه**: spike، يعني وقت محدد (نص يوم) تستكشف فيه السؤال ده بس. والنتيجة معلومة («Paymob محتاج المبلغ النهائي في الـ order، أو محتاج webhook»)، مش كود للإنتاج.

---

## ٣. الحسبة

| | أيام |
|---|---|
| السطور المعروفة | ٠.٥ + ١ + ١ + ٠.٥ = ٣ |
| الـ spike | ٠.٥ |
| المجموع | ٣.٥ |

> التقدير: من ٣ لـ ٥ أيام، وهأكد بكرة الضهر بعد الـ spike

- **ليه مدى؟** الـ ٣.٥ لو كل حاجة مشيت زي ما هي متخيّلة. والـ ٥ مساحة للمجهول: لو Paymob طلع محتاج webhook، ده يوم زيادة. الفرق بين الرقمين بيقول قد إيه انت متأكد.
- **ليه موعد تأكيد؟** بعد الـ spike المجهول الأكبر بيتحل، والمدى بيضيق.
- وده مش padding سري (تقول ٥ وانت شايفها ٣): المجهول مكتوب قدام الكل.

---

## ٤. حل التمرين: تغيير الإيميل

| السطر | التقدير |
|---|---|
| endpoint بيبعت كود للإيميل الجديد | نص يوم |
| تأكيد الكود وتغيير الإيميل في transaction | نص يوم |
| إيميل تنبيه للإيميل **القديم** | ساعتين |
| UI للخطوتين | يوم |
| اختبارات | نص يوم |
| مجهول: الإيميل مستخدم في OAuth؟ | سؤال |

المجموع حوالي ٣ أيام، والتقدير ٣ لـ ٤. والتقسيم نفسه طلّع سطر كان هيتنسي: تنبيه الإيميل القديم (لو حد سرق الحساب وغيّر الإيميل، صاحبه الحقيقي يعرف). ده نص فايدة التقدير.

---

## ٥. لما تتأخر

> «الـ Paymob طلع محتاج webhook، ده يوم زيادة، التقدير الجديد الخميس.»

أول ما تعرف، مش آخر يوم. ومعاها السبب والتقدير الجديد.

---

## الخلاصة

| اعمل | متعملش |
|---|---|
| قسّم لسطور أقل من يوم | رقم من دماغك تحت الضغط |
| المجهول في سطر لوحده بـ spike | padding سري |
| مدى + موعد تأكيد | وعد برقم واحد |
| الاختبارات والمراجعة جوه التقدير | وقت الكتابة بس |
| بلّغ بدري لو اتأخرت | تسكت على أمل إنك تلحق |

- «مش عارف لسه، هعرف النهارده الساعة ٤» إجابة محترمة.
- بعد ما تخلص، قارن التقدير باللي حصل: غالبًا أكبر فرق في حاجة مكانتش في القايمة خالص.`,
          lines: [
            "الـ ticket والهدف.",
            "كل سطر حاجة واحدة وأقل من يوم.",
            "الـ API، والاختبارات جزء من التقدير مش حاجة بعده.",
            "الـ UI بحالاته، لأن الحالات هي اللي بتاخد الوقت.",
            "اختبار المسار من أوله لآخره.",
            "المجهول لوحده، ومعاه وقت محدد تستكشفه (spike).",
            "مدى مش رقم، ومعاه إمتى هتأكد."
          ]
        }
      ]
    }
]);
