// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "خطة ٩٠ يوم: ٢٠ دقيقة في اليوم",
      l: 3,
      n: "روتين يومي صغير (قراية ومراجعة كلمات وكتابة)، ومراجعة متباعدة للكلمات، و «اختبرني» في الموقع ده، وتقيس تقدمك كل ٣٠ يوم",
      items: [
        {
          cmd: "٢٠ دقيقة في اليوم",
          title: "الخطة اليومية: صفحة docs و ١٠ كلمات ورسالة واحدة في ٢٠ دقيقة",
          desc: R`الإنجليزي بيتحسن بالتكرار اليومي الصغير، مش بكورس مكثف أسبوع وبعدين تبطّل. ٢٠ دقيقة كل يوم لمدة ٩٠ يوم = ٣٠ ساعة، وده كفاية تفرق جدًا في القراية والكتابة التقنية، لأنك بتتعلم الـ ٣٠٠ كلمة اللي بتتكرر، مش اللغة كلها.

الـ ٢٠ دقيقة متقسمة ٣ أجزاء: ١) [[8 دقايق قراية]]: صفحة docs واحدة (أو جزء منها) لأداة بتستخدمها فعلًا، بطريقة الـ skimming وبعدين تقرا الجزء المهم كويس. ٢) [[5 دقايق كلمات]]: مراجعة الكلمات القديمة اللي عليها الدور وإضافة كلمات جديدة من القراية (الدرس الجاي). ٣) [[7 دقايق كتابة]]: حاجة واحدة حقيقية بالإنجليزي: commit، أو وصف PR، أو رسالة، أو standup، أو ٣ جمل عن اللي قريته. وبعدين تصحيح (درس «تصحيح كتابتك»).

والمهم: نفس الميعاد كل يوم (مثلًا أول ما تفتح اللابتوب قبل الشغل)، ولو فوّت يوم متعوّضوش بساعة: كمّل عادي بكرة.`,
          example: R`Daily routine (20 min)
08:00-08:08  Read: one docs page for a tool I use (skim, then read the key part)
08:08-08:13  Words: review today's due cards in words.md + add up to 10 new words
08:13-08:20  Write: one real text in English (commit, PR, message, or 3-sentence summary)
Weekly (Friday, 15 min)
- Re-read mistakes.md and pick one mistake to focus on next week
- Count: pages read, words added, texts written
Month 1: docs of tools I use daily (npm, git, the framework)
Month 2: error messages + GitHub issues + one PR description a day
Month 3: RFC/spec sections, changelogs, and writing a README or blog post`,
          try: R`اعمل ملف [[plan.md]] في فولدر [[english]] وانسخ فيه الروتين ده بمواعيدك انت. حط تذكير يومي في موبايلك بنفس الميعاد. وسجّل النهارده أول يوم: الصفحة اللي قريتها، والكلمات، والنص اللي كتبته.`,
          flag: "script",
          deep: {
            why: "المشكلة مش إنك مش ذكي في اللغات، المشكلة إن محدش علّمك إنجليزي «المبرمج» بشكل مباشر. والطريقة دي بتركز على اللي هتستخدمه فعلًا بكرة الصبح في شغلك. والـ ٢٠ دقيقة صغيرة كفاية إنك متبطّلش.",
            how: R`اختيار صفحة القراية: حاجة محتاجها الأسبوع ده (مكتبة بتستخدمها، أو خطأ قابلك). القراية اللي ليها هدف بتتفهم وبتتفتكر أكتر بكتير من القراية العامة.

الكتابة: لازم تبقى حاجة حقيقية هتتبعت أو هتتحفظ، مش تمارين: commit فعلي، أو PR فعلي، أو رسالة فعلية. ولو مفيش شغل النهارده، اكتب ٣ جمل عن الصفحة اللي قريتها: [[Today I read about ... The key idea is ... I didn't know that ...]].

الشهور: الشهر الأول الأدوات اللي بتستخدمها كل يوم (المفردات الأساسية). التاني الأخطاء والـ issues والـ PRs (قراية سريعة وكتابة قصيرة). التالت الـ specs والـ changelogs والكتابة الطويلة (README أو blog).

ولو عندك وقت زيادة: اسمع talk تقني (YouTube أو podcast) بترجمة إنجليزي (مش عربي) ١٠ دقايق. ده بيجهزك للمكالمات والانترفيو (شوف درس [[English وانجليزيتك مش قوية]] في «تاب الانترفيو»).`,
            when: "ابدأ النهارده. أحسن وقت: قبل الشغل أو المذاكرة على طول، مش آخر اليوم وانت تعبان.",
            mistakes: R`تبدأ بساعتين في اليوم وتبطّل بعد أسبوع. وتقرا حاجات مش محتاجها (رواية أو أخبار) وتسيب الـ docs. وتكتب تمارين مش حاجات حقيقية. وتعوّض الأيام الفايتة بيوم طويل: الانتظام أهم من الكمية. وتقيس نفسك كل يوم: قيس كل ٣٠ يوم (آخر درس).`
          },
          teach: R`## الجدول ٣ أجزاء يومية و ٢ أسبوعية و ٣ شهور

| الوقت | الجزء | بيبني إيه |
|---|---|---|
| ٨ دقايق | [[Read: one docs page for a tool I use]] | القراية والمفردات |
| ٥ دقايق | [[Words: review today's due cards ... + add up to 10 new words]] | الحفظ |
| ٧ دقايق | [[Write: one real text in English]] | الكتابة |

---

## الكلمات في الجدول

- [[skim, then read the key part]] = اقرا بسرعة، وبعدين الجزء المهم كويس (درس «skimming»).
- [[today's due cards]] = البطاقات اللي عليها الدور النهارده. [[due]] = مستحق.
- [[up to 10]] = لحد ١٠، مش لازم ١٠.
- [[one real text]] = نص حقيقي هيتبعت أو هيتحفظ، مش تمرين.
- [[3-sentence summary]] = ملخص ٣ جمل.

---

## الأسبوعي

~~~text
- Re-read mistakes.md and pick one mistake to focus on next week
- Count: pages read, words added, texts written
~~~

[[Re-read]] = اقرا تاني. و [[pick one]] = اختار واحدة. و [[focus on]] = ركّز على.

## الشهور

| الشهر | المصادر | ليه بالترتيب ده |
|---|---|---|
| ١ | docs الأدوات اليومية | المفردات الأساسية الأول |
| ٢ | رسايل أخطاء و issues ووصف PR | قراية سريعة وكتابة قصيرة |
| ٣ | specs و changelogs و README أو مقال | نصوص أصعب وكتابة أطول |

---

## الحساب

٢٠ دقيقة × ٩٠ يوم = ١٨٠٠ دقيقة = ٣٠ ساعة. صغيرة كفاية إنك متبطّلش، وكبيرة كفاية تفرق.

---

## الخلاصة

- نفس الميعاد كل يوم، وقراية لها هدف.
- كتابة حقيقية، مش تمارين.
- فوّت يوم؟ كمّل بكرة عادي، متعوّضش بساعة.`,
          lines: [
            "عنوان: الروتين اليومي.",
            R`٨ دقايق قراية: صفحة docs واحدة لأداة بستخدمها.`,
            R`٥ دقايق كلمات: مراجعة اللي عليها الدور + لحد ١٠ جديدة. due = عليها الدور.`,
            R`٧ دقايق كتابة: نص حقيقي واحد.`,
            "عنوان: الأسبوعي.",
            R`اقرا mistakes.md واختار غلطة واحدة للأسبوع الجاي.`,
            R`عدّ: صفحات، وكلمات، ونصوص.`,
            R`الشهر ١: docs أدوات يومية.`,
            R`الشهر ٢: رسايل أخطاء و issues ووصف PR كل يوم.`,
            R`الشهر ٣: specs و changelogs و README أو مقال.`
          ],
          sol: R`[[plan.md]] صح بيبقى فيه: ميعاد ثابت (مثلًا [[07:30]])، والتلات أجزاء بالدقايق، وسطر لكل يوم بالشكل ده:
[[Day 1 — Read: Vite "Getting Started" (Scaffolding section). Words: scaffold, template, preset. Wrote: commit "docs: add setup steps to README".]]
[[Day 2 — Read: MDN fetch() Exceptions. Words: abort, resolve, reject. Wrote: 3-sentence summary of when fetch rejects.]]

اختبار إن الخطة واقعية: لو اليوم الأول خد أكتر من ٢٥ دقيقة، قلّل القراية لنص صفحة. الهدف إن اليوم ٤٠ يبقى سهل زي اليوم ١. ولو فوّت يومين ورا بعض، مفيش مشكلة: الـ plan.md بيوريك إنك عملت كذا يوم قبلهم، وده بيشجع ترجع.`
        },
        {
          cmd: "مراجعة الكلمات",
          title: "١٠ كلمات في اليوم بمراجعة متباعدة (spaced repetition): بعد ١ و ٣ و ٧ و ٢١ يوم",
          desc: R`الكلمة اللي بتشوفها مرة بتتنسى في أيام. اللي بتراجعها في الوقت الصح بتفضل. الفكرة اسمها [[spaced repetition]] (المراجعة المتباعدة): تراجع الكلمة بعد يوم، وبعدين ٣ أيام، وبعدين أسبوع، وبعدين ٣ أسابيع. كل مرة تفتكرها صح، المسافة بتزيد. ولو نسيتها، ترجع للأول.

ملف [[words.md]] بسيط يكفي، أو تطبيق زي Anki لو بتحب. كل كلمة ليها: الكلمة، والمعنى بكلامك (عربي أو إنجليزي بسيط)، والجملة الحقيقية اللي شفتها فيها (ومنين)، وجملة من عندك، وتاريخ المراجعة الجاية.

القاعدة الذهبية: الكلمة من غير جملة متتحفظش. [[deprecated = مهمل]] هتتنسى. [[deprecated: "request has been deprecated" (npm warning) = still works but will be removed; use X instead]] هتفضل.`,
          example: R`| word          | meaning (my words)                    | real sentence (source)                               | my sentence                               | next review |
| deprecated    | still works, will be removed; move on | "request has been deprecated" (npm warn)             | "This method is deprecated; use fetch()." | Oct 3       |
| idempotent    | same effect if you repeat it          | "All safe methods are idempotent, as well as PUT and DELETE" (MDN) | "Our payment endpoint must be idempotent."| Oct 1       |
| take precedence over | wins when both are set         | "CLI flags take precedence over the config file"     | "Env vars take precedence over defaults." | Oct 7       |
| stale         | old, needs refresh                    | "by default consider cached data as stale" (TanStack Query docs) | "The cache was stale after the deploy."   | Oct 21      |
Review rule: correct -> next gap (1 -> 3 -> 7 -> 21 -> 60 days). Wrong -> back to 1 day.`,
          try: R`اعمل [[words.md]] بالجدول ده. ضيف ١٠ كلمات من أي درس في المستوى ١ من التاب ده، ولكل واحدة جملة حقيقية (انسخها من الـ docs أو من رسالة خطأ شفتها) وجملة من عندك عن مشروعك. حط مراجعة بكرة. وبكرة: غطّي عمود المعنى، وحاول تفتكر، وحدّث التاريخ.`,
          flag: "script",
          deep: {
            why: "الكلمات هي أكبر عائق في القراية: لو ٣ كلمات في كل جملة مش معروفة، الفقرة مستحيلة. ولو عارف الـ ٣٠٠ كلمة المتكررة، أغلب الـ docs بتبقى مفهومة. والمراجعة المتباعدة من أكتر طرق الحفظ المدروسة والفعالة.",
            how: R`إزاي تختار الكلمات: من القراية اليومية بس، واللي بتتكرر أو في عنوان أو وقفتك عن الفهم. متضيفش كل كلمة جديدة: ١٠ في اليوم كحد أقصى، وأقل عادي.

إزاي تراجع: بص على الكلمة، وقول معناها واعمل جملة بصوت عالي، وبعدين اكشف. صح؟ المسافة الجاية أكبر ([[1 → 3 → 7 → 21 → 60]] يوم). غلط؟ ارجع ليوم ١. المراجعة كلها ٥ دقايق لأن كل يوم عليه عدد محدود.

ولو بتستخدم Anki: الوجه الأمامي الجملة الحقيقية والكلمة متعلّم عليها، والخلفي المعنى وجملتك. Anki بيحسب المواعيد لوحده.

وبعد ٩٠ يوم بـ ٥ كلمات في المتوسط = حوالي ٤٥٠ كلمة. أغلبهم هيبقوا جزء منك، مش محفوظين بس.`,
            when: "كل يوم في الـ ٥ دقايق بتوع الكلمات. والكلمات الجديدة بتيجي من الـ ٨ دقايق بتوع القراية.",
            mistakes: R`تضيف ٥٠ كلمة في يوم وتبطّل. وتكتب الكلمة ومعناها من غير جملة. وتراجع كل الكلمات كل يوم (بيبقى ممل وطويل). وتحفظ كلمات عامة من قايمة «أشهر ١٠٠٠ كلمة إنجليزي» بدل الكلمات اللي في شغلك فعلًا.`
          },
          teach: R`## الجدول ٥ أعمدة، وكل عمود ليه سبب

| العمود | ليه |
|---|---|
| [[word]] | الكلمة |
| [[meaning (my words)]] | بكلامك انت، مش من القاموس |
| [[real sentence (source)]] | الكلمة في سياقها الحقيقي، ومنين |
| [[my sentence]] | استخدامك ليها عن مشروعك |
| [[next review]] | إمتى تراجعها |

---

## نقرا صف

~~~text
| deprecated    | still works, will be removed; move on | "request has been deprecated" (npm warn)             | "This method is deprecated; use fetch()." | Oct 3       |
~~~

- المعنى بالإنجليزي البسيط: [[still works, will be removed; move on]] = «لسه شغالة، هتتشال، انقل».
- الجملة الحقيقية من تحذير npm اللي شفناه في المستوى ١.
- جملتك: [[use fetch()]] بديل حقيقي.

---

## قاعدة المراجعة

~~~text
Review rule: correct -> next gap (1 -> 3 -> 7 -> 21 -> 60 days). Wrong -> back to 1 day.
~~~

| لو | يحصل إيه |
|---|---|
| افتكرتها صح | المسافة الجاية أكبر: ١ ثم ٣ ثم ٧ ثم ٢١ ثم ٦٠ يوم |
| نسيتها | ترجع ليوم واحد |

[[gap]] = المسافة. يعني الكلمة اللي بتعرفها بتختفي من المراجعة اليومية بسرعة، واللي بتنساها بتفضل قدامك. عشان كده المراجعة اليومية ٥ دقايق بس.

---

## إزاي تراجع

1. بص على الكلمة، وغطّي المعنى.
2. قول المعنى وجملة بصوت عالي.
3. اكشف وقارن.
4. حدّث [[next review]].

---

## الخلاصة

- مفيش كلمة من غير جملة حقيقية.
- ١٠ في اليوم بالكتير، من القراية بس.
- صح = مسافة أكبر، غلط = يوم واحد.`,
          lines: [
            R`عناوين الأعمدة: الكلمة، المعنى بكلامك، جملة حقيقية ومصدرها، جملتك، المراجعة الجاية.`,
            R`deprecated: جملة من تحذير npm اللي شفناه في المستوى ١.`,
            R`idempotent: من MDN. وجملتك عن مشروعك.`,
            R`take precedence over: من README (درس README و Getting started).`,
            R`stale: من docs React Query. مراجعتها بعد ٣ أسابيع لأنك افتكرتها ٣ مرات.`,
            R`قاعدة المراجعة: صح ← المسافة الجاية. غلط ← ارجع ليوم واحد.`
          ],
          sol: R`[[words.md]] صح بعد اليوم الأول: ١٠ صفوف، كل صف فيه جملة حقيقية بين علامات تنصيص ومصدرها ([[(npm warn)]]، [[(MDN)]]، [[(git hint)]])، وجملة من عندك فيها اسم حاجة من مشروعك، وتاريخ بكرة.

مثال صف كويس:
[[| pending | still waiting, not done yet | "Your payment is still pending." (Stripe docs) | "The order stays pending until the webhook arrives." | Oct 1 |]]

مثال صف ضعيف:
[[| pending | معلق | - | - | - |]] ← مفيش جملة حقيقية ولا جملة ليك ولا ميعاد. هتتنسى.

وبكرة في المراجعة: لو افتكرت ٧ من ١٠، ممتاز. الـ ٣ اللي نسيتهم ميعادهم بعد يوم تاني، والـ ٧ بعد ٣ أيام.`
        },
        {
          cmd: "اختبرني للكلمات",
          title: "تستخدم «اختبرني» و «راجع اللي نسيته» و «اكتب ملاحظة» في الموقع ده للإنجليزي",
          desc: R`الموقع ده نفسه فيه أدوات مراجعة تنفع جدًا مع التاب ده:

«اختبرني» (الزرار جنب المستويات): بيطلعلك بطاقات عشوائية من التاب والمستوى اللي انت فيهم. البطاقة بتوريك عنوان الدرس كسؤال (زي «الفرق بين get و fetch و load و return و send»). قبل ما تكشف، قول بصوت عالي كل كلمة ومعناها وجملة إنجليزي بيها. وبعدين اكشف (مسافة) وقارن بالمثال، واختار «عرفتها» (1) أو «لسه» (2). البطاقات اللي بتقول عليها «لسه» بتطلعلك أكتر.

«راجع اللي نسيته» (فوق الصفحة): بيجمع البطاقات اللي نسيتها أكتر ما افتكرتها من كل التابات. ودي فعليًا مراجعة متباعدة جاهزة. والبطاقة بتخرج من الكومة لما تفتكرها أكتر ما نسيتها.

«اكتب ملاحظة» تحت كل درس: اكتب فيها كلماتك وجملك انت عن الدرس ده. والملاحظات بتدخل في البحث، فلو كتبت [[stale]] في ملاحظة، البحث عن stale هيلاقيها.`,
          example: R`Card: "الفرق بين get و fetch و load و return و send"
Say before you reveal:
  get = take a value that already exists: "Get the current user from the session."
  fetch = bring it from outside, takes time: "Fetch the orders from the API."
  load = bring and prepare: "Load the config file on startup."
  return = a function gives back a result: "This function returns the total."
  send = "Send a confirmation email to the user."
Reveal -> compare with the example -> press 1 (knew it) or 2 (not yet)
Daily: 5 cards from this tab + "راجع اللي نسيته" once
Note on the lesson: "My sentence: My app fetches products from Supabase and returns them sorted."`,
          try: R`افتح «اختبرني» على المستوى ١ من التاب ده، وجاوب ١٠ بطاقات بالطريقة دي (قول الكلمات وجملة لكل واحدة بصوت عالي قبل ما تكشف). لكل بطاقة قلت عليها «لسه»، افتح الدرس واكتب ملاحظة فيها جملة من عندك. وبكرة اعمل «راجع اللي نسيته».`,
          flag: "script",
          deep: {
            why: "انت هنا خلاص كل يوم عشان التابات التانية، فالمراجعة مش محتاجة أداة جديدة. و «اختبرني» مبني على نفس فكرة المراجعة المتباعدة: اللي بتنساه بيرجعلك أكتر.",
            how: R`ليه «قول بصوت عالي قبل ما تكشف»: التذكر الفعلي (active recall) هو اللي بيثبت، مش إنك تقرا الإجابة وتقول «آه عارفها». لو مقدرتش تقول جملة بالكلمة، اضغط «لسه» حتى لو فاكر معناها بالعربي.

قسّم المستويات: المستوى ١ (الكلمات ورسايل الأخطاء) بطاقاته أنسب للكلمات. المستوى ٢ بطاقاته أنسب لـ «اكتب commit/رسالة من دماغك قبل ما تكشف». المستوى ٣ للأفكار والخطة.

والبطاقات بتتحفظ في المتصفح بتاعك، فلو غيّرت جهاز، استخدم تصدير التقدم (backup) لو متاح في الصفحة عندك.

و «جربتها» (الـ checkbox): علّم عليه لما تعمل الـ try فعلًا، مش لما تقرا الدرس. و زرار «اللي فاضل بس» بيخبّي اللي علّمت عليه.`,
            when: "كل يوم ٥ دقايق (جزء الكلمات في الخطة اليومية)، ومرة في الأسبوع «راجع اللي نسيته» لكل التابات.",
            mistakes: R`تكشف على طول وتضغط «عرفتها» لأن الإجابة «شكلها مألوف». وتعمل ٥٠ بطاقة مرة واحدة في الأسبوع بدل ٥ كل يوم. وتسيب الملاحظات فاضية: جملة واحدة منك أحسن من قراية الدرس ٣ مرات.`
          },
          teach: R`## البطاقة سؤال، والإجابة جمل بصوت عالي

المثال خطوات استخدام «اختبرني» في الموقع ده على درس «get / set / fetch / return»:

| السطر | الخطوة |
|---|---|
| [[Card: "الفرق بين get و fetch ..."]] | البطاقة بتعرض عنوان الدرس كسؤال |
| [[Say before you reveal:]] | قول **قبل** ما تكشف |
| [[get = take a value that already exists: "..."]] | الكلمة + معنى بإنجليزي بسيط + جملة |
| [[Reveal -> compare with the example -> press 1 (knew it) or 2 (not yet)]] | اكشف وقارن واختار |
| [[Daily: 5 cards from this tab + "راجع اللي نسيته" once]] | الروتين اليومي |
| [[Note on the lesson: "My sentence: ..."]] | ملاحظة فيها جملتك |

---

## الجمل اللي بتتقال

| الكلمة | المعنى البسيط | الجملة |
|---|---|---|
| [[get]] | [[take a value that already exists]] | [[Get the current user from the session.]] |
| [[fetch]] | [[bring it from outside, takes time]] | [[Fetch the orders from the API.]] |
| [[load]] | [[bring and prepare]] | [[Load the config file on startup.]] |
| [[return]] | [[a function gives back a result]] | [[This function returns the total.]] |

[[already exists]] = موجودة خلاص. و [[gives back]] = بترجّع.

---

## ليه «قبل ما تكشف»

ده اسمه [[active recall]]: إنك تطلّع المعلومة من دماغك. لو قريت الإجابة الأول، هتحس إنك عارفها لأنها «مألوفة»، وده إحساس كداب. ولو مقدرتش تقول جملة بالكلمة، اضغط 2 حتى لو فاكر المعنى بالعربي.

---

## الملاحظة

~~~text
"My sentence: My app fetches products from Supabase and returns them sorted."
~~~

[[fetches]] و [[returns]] بالـ s، و [[them]] = المنتجات. والملاحظات بتدخل في بحث الموقع، فبتلاقي جملتك بعدين.

---

## الخلاصة

- قول الكلمة والمعنى وجملة بصوت عالي، وبعدين اكشف.
- 1 = عرفتها، 2 = لسه. اللي بـ 2 بتطلعلك أكتر.
- ٥ بطاقات كل يوم أحسن من ٥٠ مرة في الأسبوع.`,
          lines: [
            R`البطاقة: عنوان الدرس كسؤال.`,
            R`قبل ما تكشف، قول:`,
            R`get + جملة.`,
            R`fetch + جملة.`,
            R`load + جملة.`,
            R`return + جملة.`,
            R`send + جملة.`,
            R`اكشف وقارن واختار 1 أو 2.`,
            R`يوميًا: ٥ بطاقات من التاب + «راجع اللي نسيته» مرة.`,
            R`ملاحظة على الدرس فيها جملتك انت.`
          ],
          sol: R`اللي المفروض يحصل: من ١٠ بطاقات في المستوى ١، طبيعي في الأول تقول «لسه» على ٤–٦. البطاقات الصعبة غالبًا: «الكلمات الصغيرة اللي بتقلب المعنى» ([[unless]] و [[respectively]] و [[i.e.]])، و «valid و invalid و required ... deprecated و legacy»، ورسايل الأخطاء (لأن فيها كذا جملة).

ملاحظة كويسة على درس «if / unless / instead of»:
[[unless = if not. "The cache is used unless you pass --no-cache." My sentence: "The page is public unless the user is banned."]]

وبكرة في «راجع اللي نسيته» هتلاقي البطاقات دي. لو افتكرتها وضغطت 1، بتقرب تخرج من الكومة. ولو زرار «راجع اللي نسيته» مش ظاهر، ده معناه إن مفيش بطاقات منسية لسه (بيظهر لما تضغط «لسه» على بطاقة).`
        },
        {
          cmd: "تقيس تقدمك",
          title: "تقيس تقدمك كل ٣٠ يوم: نفس الصفحة ونفس الرسالة، وقارن",
          desc: R`من غير قياس، هتحس إنك مش بتتحسن (لأن التحسن اليومي صغير ومش باين)، وممكن تبطّل. الحل: اختبار بسيط تعمله يوم ١ ويوم ٣٠ ويوم ٦٠ ويوم ٩٠، بنفس الحاجات، وتقارن الأرقام.

الاختبار (٣٠ دقيقة): ١) [[Reading]]: صفحة docs ثابتة تختارها يوم ١ (متقراهاش في النص). عدّ الكلمات اللي مش فاهمها، واحسب الوقت اللي خدته عشان تكتب ملخص ٣ جمل. ٢) [[Errors]]: ٥ رسايل خطأ جديدة (من التاب ده أو من شغلك): كام واحدة فهمتها وعرفت حلها من غير بحث؟ ٣) [[Writing]]: نفس المهمة كل مرة (مثلًا: «اكتب وصف PR لميزة بحث في موقع»)، ١٠ دقايق، من غير مساعدة. وبعدين عدّ الغلطات بالتصحيح. ٤) [[Words]]: عدد الكلمات في [[words.md]] اللي بقت «٢١ يوم أو أكتر».`,
          example: R`| Check                         | Day 1   | Day 30  | Day 60  | Day 90  |
| Unknown words in test page    | 23      | 14      | 8       | 4       |
| Time to 3-sentence summary    | 25 min  | 15 min  | 10 min  | 7 min   |
| Error messages solved (of 5)  | 2       | 3       | 4       | 5       |
| Mistakes in PR description    | 9       | 6       | 4       | 2       |
| Words at 21+ days             | 0       | 60      | 150     | 260     |
Notes Day 30: still forgetting third-person -s; articles better.
Notes Day 60: reading faster; writing still slow. Focus: PR templates.`,
          try: R`اعمل الاختبار ده النهارده (يوم ١) وسجّل الأرقام في [[progress.md]]. اختار الصفحة الثابتة ومهمة الكتابة الثابتة واكتبهم في الملف عشان تستخدمهم يوم ٣٠. وحط تذكير بعد ٣٠ يوم.`,
          flag: "script",
          deep: {
            why: R`الأرقام بتحميك من إحساس «مفيش فايدة». لما تشوف إن الكلمات المش مفهومة نزلت من ٢٣ لـ ١٤ في شهر، ده دليل. وكمان بتوريك فين الضعف بالظبط (القراية اتحسنت والكتابة لأ؟ يبقى الشهر الجاي ركّز على الكتابة).`,
            how: R`الأرقام في المثال للتوضيح، أرقامك هتختلف، والمهم الاتجاه.

اختيار صفحة الاختبار: صفحة متوسطة الصعوبة لأداة بتستخدمها، مش سهلة جدًا (مش هتقيس حاجة) ولا صعبة جدًا (هتحبطك). مثلًا صفحة من react.dev أو Node docs عن حاجة بتستخدمها.

عدّ غلطات الكتابة: استخدم الـ prompt من درس «تصحيح كتابتك» وعدّ الغلطات اللي طلعت. وبص على نوعها: هل نفس النوع بيتكرر؟ ده «موضوع الشهر الجاي».

بعد ٩٠ يوم: كمّل بنفس الروتين بس غيّر المصادر (مكتبات جديدة، specs، مقالات تقنية طويلة)، وابدأ تكتب حاجة أطول (مقال تقني قصير، أو README كامل، أو رد على issue في open source). وده بيبني جزء الـ English اللي في الانترفيو والـ CV كمان.`,
            when: "يوم ١، ويوم ٣٠، ويوم ٦٠، ويوم ٩٠. ومش أكتر من كده: القياس اليومي بيخلي التقلبات الصغيرة تحبطك.",
            mistakes: R`تغيّر صفحة الاختبار أو مهمة الكتابة كل مرة (مبقتش بتقيس نفس الحاجة). وتقرا صفحة الاختبار في النص (بقت محفوظة). وتستخدم AI أو قاموس في الاختبار نفسه. وتقارن نفسك بحد تاني بدل نفسك من شهر.`
          },
          teach: R`## الجدول ٥ مقاييس، كل واحد بيقيس مهارة

| المقياس | بيقيس | المفروض |
|---|---|---|
| [[Unknown words in test page]] | المفردات | ينزل |
| [[Time to 3-sentence summary]] | سرعة الفهم | ينزل |
| [[Error messages solved (of 5)]] | قراية الأخطاء | يطلع |
| [[Mistakes in PR description]] | الكتابة | ينزل |
| [[Words at 21+ days]] | الحفظ طويل المدى | يطلع |

الأرقام اللي في المثال للتوضيح، والمهم الاتجاه.

---

## الكلمات

- [[of 5]] = من ٥.
- [[21+ days]] = كلمات وصلت لمسافة مراجعة ٢١ يوم أو أكتر في [[words.md]]، يعني اتثبتت.
- [[still forgetting third-person -s]] = لسه بنسى الـ s مع الفاعل المفرد.
- [[articles better]] = الـ a و the اتحسنوا.
- [[reading faster; writing still slow]] = القراية أسرع، والكتابة لسه بطيئة.
- [[Focus: PR templates]] = التركيز الجاي.

---

## ليه نفس الصفحة ونفس المهمة

لو غيّرت صفحة الاختبار، الرقم هيتغير بسبب الصفحة مش بسببك. الثبات هو اللي بيخلي المقارنة صادقة. وعشان كده متقراش صفحة الاختبار بين المرات.

---

## الخلاصة

- يوم ١ و ٣٠ و ٦٠ و ٩٠، مش كل يوم.
- من غير قاموس ولا AI وقت الاختبار.
- الرقم اللي متحسنش = موضوع الشهر الجاي، مش فشل.`,
          lines: [
            R`عناوين: الاختبار، ويوم ١ و ٣٠ و ٦٠ و ٩٠.`,
            R`عدد الكلمات المش مفهومة في صفحة الاختبار: المفروض ينزل.`,
            R`وقت كتابة ملخص ٣ جمل: المفروض ينزل.`,
            R`رسايل الأخطاء اللي فهمتها وحليتها من ٥: المفروض يطلع.`,
            R`غلطات وصف الـ PR: المفروض ينزل.`,
            R`الكلمات اللي وصلت لمراجعة ٢١ يوم أو أكتر: المفروض يطلع.`,
            R`ملاحظات يوم ٣٠: فين لسه ضعيف وفين اتحسنت.`,
            R`ملاحظات يوم ٦٠: وتحديد التركيز الجاي.`
          ],
          sol: R`[[progress.md]] يوم ١ صح فيه: اسم صفحة الاختبار ولينكها (مثلًا [[react.dev: "You Might Not Need an Effect"]])، ومهمة الكتابة الثابتة ([[Write a PR description for adding search to a product list]])، و ٥ رسايل أخطاء اخترتهم، والأرقام:
[[Unknown words: 19 | Summary time: 22 min | Errors solved: 2/5 | Writing mistakes: 11 | Words at 21+ days: 0]]
وتذكير على الموبايل بعد ٣٠ يوم.

الأرقام العالية يوم ١ مش مشكلة خالص: ده خط البداية. المهم إنها تبقى حقيقية (من غير قاموس ولا AI). ولو يوم ٣٠ رقم منهم متحسنش، ده مش فشل: ده تحديد لمكان التركيز في الشهر الجاي.

ولو خلصت الـ ٩٠ يوم: ارجع للتاب ده من الأول وعدّي على الـ try بتاع كل درس بسرعة. هتلاقي حاجات كانت صعبة بقت عادية، وده أحسن قياس.`
        }
      ]
    },
    {
      t: "إنجليزي الفريلانس والتعامل مع العملاء الأجانب",
      l: 2,
      n: "proposal على Upwork أول سطرين فيه عن مشكلة العميل، والكلام في السعر والـ milestones، وكلمات الـ sprint والـ backlog في الاجتماعات",
      items: [
        {
          cmd: "كتابة Proposal مقنع على Upwork",
          title: "تكتب proposal على Upwork إزاي عشان العميل يفتحه أصلًا؟",
          desc: R`على Upwork العميل ممكن يوصله عشرات الـ proposals على نفس الوظيفة، وفي القايمة بيشوف أول سطرين تقريبًا من كل واحد قبل ما يقرر يفتحه. يعني أول سطرين هما اللي بيتحكم عليهم، ولو بدأوا بـ [[Hi, I'm a full stack developer with 5 years of experience]] شكلهم زي مية proposal تانيين.

شكل بسيط من ٤ أجزاء، وكل جزء جملة أو اتنين:
١) الـ hook: أول سطر بيقول مشكلته هو بكلامك انت، عشان يعرف إنك قريت الوظيفة.
٢) الحل: هتحلها إزاي، في جملة واضحة من غير شرح طويل.
٣) الدليل: شغل مشابه عملته، بلينك (portfolio أو GitHub أو demo).
٤) خطوة جاية سهلة: سؤال صغير يرد عليه في دقيقة، مش «Let's have a call» من أول رسالة.

كلمات هتحتاجها: [[I noticed]] (لاحظت)، و [[I'd]] (= I would، هعمل كذا لو اشتغلنا)، و [[the same issue]] (نفس المشكلة)، و [[fixed price]] (سعر ثابت للمشروع)، و [[within a day]] (في خلال يوم).

الدرس ده عن الصياغة بالإنجليزي. أول عميل والتسعير والـ scope مشروحين بالتفصيل في تاب الشغل والكارير، قسم «الفريلانس».`,
          example: R`Hi, your login page shows the wrong user for a second after refresh. That's a hydration mismatch, and it's usually a small fix.
I'd read the session on the server, so the first render is the same on the server and in the browser.
I fixed the same issue last month in a Next.js dashboard: https://example.com/portfolio/dashboard
Could you share the error from the browser console? I can confirm the fix and give you a fixed price within a day.`,
          try: R`افتح Upwork ودوّر على وظيفة في الـ stack بتاعك، واكتب proposal بالـ ٤ أجزاء دول في أقل من ١٢٠ كلمة. لو مش عايز تفتح Upwork دلوقتي، استخدم الوظيفة دي: [[I need a developer to add Stripe payments to my Express + PostgreSQL app. Orders should only be confirmed after payment.]] بعد ما تكتب، اقرا أول سطرين لوحدهم: فيهم مشكلة العميل نفسها ولا كلام عنك؟`,
          flag: "script",
          deep: {
            why: R`العميل مش بيدوّر على أحسن CV، بيدوّر على حد يحل مشكلته من غير ما يشرحها مرتين. لما أول سطر يكون عن مشكلته بالتحديد، ده لوحده بيفرّقك عن الـ proposals المنسوخة اللي بتبدأ بـ [[Dear Sir]].`,
            how: R`اكتب بـ «you» أكتر من «I»: بدل [[I am an expert in React]] اكتب نتيجة تخصه، زي [[Your users won't see the wrong account after refresh]]. ومتوعدش بأرقام مش متأكد منها ([[2x faster]]) لأنها هتتحسب عليك.

خلي السؤال الأخير صغير ومحدد ([[Could you share the error?]] أو [[Is the app on Vercel or a VPS?]])، لأن الرد عليه سهل، وأول ما العميل يرد بقى فيه محادثة.

قبل ما تبعت: امسح أي جملة تنفع تتبعت لأي وظيفة تانية من غير تعديل.`,
            when: R`كل ما تقدّم على وظيفة على Upwork أو منصة شبهها، أو تبعت رسالة لعميل محتمل مش عارفك (cold outreach).`,
            mistakes: R`تبدأ بـ [[Dear Sir/Madam]] أو بعدد سنين خبرتك. تبعت نفس النص لكل الوظايف. تكتب صفحة كاملة عن كل التكنولوجيز اللي تعرفها. وتحط سعر من غير ما تفهم المطلوب: اسأل الأول، أو قول [[I can give you a fixed price once I see ...]].`
          },
          teach: R`## الـ proposal ٤ جمل، كل جملة جزء

| الجزء | الجملة | شغلتها |
|---|---|---|
| ١. الـ hook | [[Hi, your login page shows the wrong user for a second after refresh. That's a hydration mismatch, and it's usually a small fix.]] | مشكلته هو، واسمها، وإنها مش مستحيلة |
| ٢. الحل | [[I'd read the session on the server, so the first render is the same on the server and in the browser.]] | هتعمل إيه، في جملة |
| ٣. الدليل | [[I fixed the same issue last month in a Next.js dashboard: <link>]] | عملتها قبل كده |
| ٤. خطوة سهلة | [[Could you share the error from the browser console? I can confirm the fix and give you a fixed price within a day.]] | سؤال يترد عليه في دقيقة |

---

## الـ grammar في كل جملة

### الـ hook

- [[your login page shows]]: present simple بالـ s، بيوصف حاجة بتحصل كل مرة.
- [[for a second after refresh]] = لثانية بعد الـ refresh.
- [[That's a hydration mismatch]]: [[That's]] = That is. والمصطلح التقني بعد ما وصفت المشكلة بكلام بسيط.
- [[it's usually a small fix]]: [[usually]] بتطمّن من غير ما توعد.

### الحل

- [[I'd]] = [[I would]]: «ده اللي هعمله لو اشتغلنا». أنعم من [[I will]] لأنك لسه متعاقدتش.
- [[so the first render is the same ...]]: [[so]] = عشان كده. السبب والنتيجة في جملة واحدة.

### الدليل

- [[I fixed the same issue last month]]: ماضي، حاجة حصلت فعلًا، ومعاها لينك.

### الخطوة الجاية

- [[Could you share ...?]] طلب مؤدب.
- [[I can confirm the fix]] = أقدر أتأكد من الحل.
- [[a fixed price]] = سعر ثابت للمشروع. و [[within a day]] = في خلال يوم.

---

## you أكتر من I

| بيتكلم عن نفسه | بيتكلم عن العميل |
|---|---|
| [[I am an expert in React]] | [[Your users won't see the wrong account after refresh]] |
| [[I have 5 years of experience]] | [[your login page shows the wrong user]] |

---

## الخلاصة

- أول سطرين هما اللي بيظهروا في القايمة: خليهم عن مشكلته.
- hook، وحل، ودليل بلينك، وسؤال صغير.
- امسح أي جملة تنفع لأي وظيفة تانية.`,
          lines: [
            R`الـ hook: مشكلته هو بكلام بسيط، واسمها التقني، وإنها مش مستحيلة. [[hydration mismatch]] = الصفحة اللي اتعملت على السيرفر مختلفة عن اللي اتعملت في المتصفح.`,
            R`الحل في جملة. [[I'd]] = I would: «ده اللي هعمله».`,
            R`الدليل: نفس المشكلة اتحلت قبل كده، بلينك.`,
            R`خطوة جاية سهلة: سؤال صغير، ووعد واضح ([[within a day]]).`
          ],
          sol: R`proposal كويس للوظيفة اللي في الـ try:

[[Hi, you want orders confirmed only after Stripe confirms the payment, not when the user clicks "Pay".]]
[[I'd create the order as "pending", then mark it "paid" from a Stripe webhook, so a closed tab or a failed card never confirms an order.]]
[[I built the same flow for a small online store last year: https://example.com/portfolio/store]]
[[Are you using Stripe Checkout or your own payment form? I can give you a fixed price once I know that.]]

لاحظ إن أول سطر بيكرر طلبه بكلام أدق (مش «I'm a Stripe expert»)، وإن الحل فيه كلمة واحدة تقنية ([[webhook]]) بس مفهومة من السياق، والسؤال الأخير الرد عليه كلمتين.

لو أول سطرين عندك فيهم [[I]] أكتر من [[you]]، أو مفيهمش أي حاجة من نص الوظيفة، ابدأ تاني من الـ hook.`
        },
        {
          cmd: "مراسلات وتفاوض السعر مع العميل",
          title: "تتكلم في السعر والـ milestones والطلبات الزيادة مع عميل أجنبي إزاي؟",
          desc: R`بعد ما العميل يرد، الكلام بيبقى عن ٣ حاجات: السعر، والمواعيد، والمطلوب بالظبط. ودي الكلمات اللي هتتكرر:
• [[scope]] = المطلوب اللي اتفقتوا عليه. و [[out of scope]] = حاجة مش جواه.
• [[scope creep]] = المشروع بيكبر طلب صغير ورا طلب صغير من غير ما السعر أو الميعاد يتغيروا.
• [[milestone]] = مرحلة ليها تسليم وفلوس. على Upwork في المشاريع بالسعر الثابت، العميل بيحط فلوس كل milestone قبل ما تبدأها، ويوافق عليها ([[approve]]) بعد التسليم فتوصلك.
• [[deadline]] و [[timeline]] = الميعاد النهائي، والجدول كله.
• [[budget]] = الفلوس اللي العميل حاططها. و [[rate]] = سعرك (بالساعة غالبًا).
• [[MVP]] = أول نسخة فيها الأساسي بس.

القاعدة في الرسايل دي: رقم واضح، وميعاد واضح، وسؤال واحد في الآخر. بدل [[It will cost a bit more]] اكتب [[It will add $120 and two days]].

الدرس ده عن الجمل بالإنجليزي. إزاي تحسب السعر وتمنع الـ scope creep أصلًا في تاب الشغل والكارير (دروس «التسعير» و «scope creep»)، وإزاي تقول لأ في درس «تقول لأ بأدب»، وشكل الإيميل الرسمي في درس «إيميل لعميل».`,
          example: R`My fixed price for the scope in your post is $600, split into two milestones: $300 for the API and $300 for the admin panel.
If the budget is tight, I can deliver the API first for $300, and we can add the admin panel later.
Export to PDF wasn't part of the original scope. I can add it for $120, and it will add two days to the timeline.
Shall I create a separate milestone for it?
What is your target date for launching the MVP?
The first milestone is ready on staging. Could you test the checkout flow and let me know if anything needs changing before you approve it?`,
          try: R`العميل بعتلك: [[Great work! Can you also add a dark mode? Should be quick.]] والـ dark mode مش في الاتفاق، وهياخد يوم. اكتب رد من ٣ جمل: موافقة، وإنه برا الـ scope بسعر وميعاد، وسؤال. وبعدين اكتب رسالة تانية تعرض فيها سعر مشروع بـ $400 مقسوم على milestones.`,
          flag: "script",
          deep: {
            why: R`أغلب الخسارة في الفريلانس مش من سعر قليل، من شغل زيادة اتعمل ببلاش لأنك اتكسفت تقول رقم. ولما تقول الرقم بدري وبأدب، العميل المحترف بيعتبره طبيعي.`,
            how: R`جمل بتلطّف من غير ما تضيّع الرقم: [[I'd be happy to add that]] (موافق مبدئيًا)، و [[Since it's outside our original scope]] (السبب)، و [[Would it be possible to ...?]] و [[Could you please ...?]] (طلب مؤدب).

اتجنب الأوامر الناشفة: [[Send me the API key]] تبقى [[Could you share the API key so I can test the integration?]]. و [[You must pay first]] تبقى [[I'll start as soon as the milestone is funded.]] ([[funded]] = العميل حط فلوسها).

[[Shall I ...?]] سؤال مؤدب معناه «أعمل كذا؟»، وبيخلي العميل يرد بـ yes أو no بسرعة.`,
            when: "أي رسالة فيها فلوس أو مواعيد أو طلب جديد: العرض الأول، والطلبات الزيادة، وتسليم كل milestone.",
            mistakes: R`توافق على طلب جديد في الشات ([[Sure, no problem!]]) وبعدين تكتشف إنه ياخد أسبوع. تكتب رقم من غير ميعاد أو ميعاد من غير رقم. وتستخدم [[ASAP]] كميعاد: قول يوم بعينه ([[by Thursday]]).`
          },
          teach: R`## كل رسالة فيها رقم، وميعاد أو مرحلة، وسؤال

نفك الـ ٦ جمل:

~~~text
My fixed price for the scope in your post is $600, split into two milestones: $300 for the API and $300 for the admin panel.
~~~

| الحتة | معناها |
|---|---|
| [[My fixed price]] | سعري الثابت |
| [[for the scope in your post]] | للمطلوب اللي في إعلانك (مش أكتر) |
| [[split into two milestones]] | مقسوم على مرحلتين. [[split]] هنا تصريف تالت |
| [[:]] | وبعدها التفاصيل |

~~~text
If the budget is tight, I can deliver the API first for $300, and we can add the admin panel later.
~~~

[[If the budget is tight]] = لو الميزانية ضيقة. بديل بيخلي الرقم مقبول من غير ما تنزّل سعرك.

~~~text
Export to PDF wasn't part of the original scope. I can add it for $120, and it will add two days to the timeline.
Shall I create a separate milestone for it?
~~~

طلب زيادة في ٣ حتت: برا الـ scope ([[wasn't part of the original scope]])، وسعره ([[for $120]])، وأثره على الميعاد ([[add two days to the timeline]]). وبعدين [[Shall I ...?]] = «أعمل ...؟»: سؤال بيترد عليه بـ yes أو no.

~~~text
What is your target date for launching the MVP?
~~~

[[target date]] = الميعاد المستهدف. و [[MVP]] = Minimum Viable Product: أول نسخة فيها الأساسي بس. و [[for launching]]: بعد preposition الفعل بـ [[ing]].

~~~text
The first milestone is ready on staging. Could you test the checkout flow and let me know if anything needs changing before you approve it?
~~~

[[let me know if ...]] = قولّي لو. و [[needs changing]] = محتاج يتغير. و [[approve]] = يوافق على الـ milestone، فالفلوس توصلك.

---

## غامض ولا واضح

| غامض | واضح |
|---|---|
| [[It will cost a bit more]] | [[It will add $120 and two days]] |
| [[ASAP]] | [[by Thursday]] |
| [[Send me the API key]] | [[Could you share the API key so I can test the integration?]] |
| [[You must pay first]] | [[I'll start as soon as the milestone is funded.]] |

[[funded]] = العميل حط فلوس المرحلة على المنصة.

---

## الخلاصة

- رقم واضح، وميعاد واضح، وسؤال واحد في الآخر.
- الطلب الجديد: برا الـ scope، وسعره، وأثره، و [[Shall I ...?]].
- [[maybe]] و [[soon]] و [[a little extra]] تتبدّل برقم أو يوم.`,
          lines: [
            R`العرض: السعر الكلي، ومقسوم على ٢ milestones، وكل واحدة فيها إيه.`,
            R`بديل لو الفلوس قليلة: جزء دلوقتي وجزء بعدين. [[If the budget is tight]] = لو الميزانية ضيقة.`,
            R`طلب زيادة: برا الـ scope، وسعره، وتأثيره على الميعاد.`,
            R`[[Shall I ...?]]: سؤال بيطلب موافقة.`,
            R`تسأل على الميعاد النهائي. [[target date]] = الميعاد المستهدف.`,
            R`التسليم: فين، وإيه اللي يجربه، وطلب مراجعة قبل الموافقة على الـ milestone.`
          ],
          sol: R`رد على طلب الـ dark mode:
[[Thanks! I'd be happy to add dark mode. Since it's outside our original scope, it will add $80 and one day to the timeline. Shall I create a separate milestone for it?]]

رسالة العرض:
[[My fixed price for this project is $400, split into two milestones: $250 for the booking flow and $150 for the admin dashboard. I can start as soon as the first milestone is funded.]]

الأرقام نفسها مش مهمة هنا، المهم إن كل رسالة فيها رقم وميعاد أو مرحلة واضحة. لو ردك فيه [[maybe]] أو [[a little extra]] أو [[soon]]، بدّلها برقم أو يوم.`
        },
        {
          cmd: "مصطلحات الـ Agile والـ Scrum في فرق العمل الأجنبية",
          title: "يعني إيه sprint و backlog و story points و retro، وتستخدمهم في جملة إزاي؟",
          desc: R`أغلب الفرق اللي هتشتغل معاها (في شركة أو remote) ماشية بـ Agile، وغالبًا بشكل اسمه Scrum. الكلمات دي هتسمعها من أول أسبوع:
• [[sprint]] = فترة شغل ثابتة (غالبًا أسبوعين، و Scrum بيقول شهر بالكتير) الفريق بيتفق في أولها هيخلّص إيه.
• [[backlog]] = ليستة كل الشغل المطلوب، مترتبة بالأهمية. و [[product backlog]] الليستة كلها، و [[sprint backlog]] اللي اتختار للـ sprint ده بس.
• [[ticket]] أو [[story]] أو [[issue]] = مهمة واحدة في الليستة (في Jira أو Linear أو GitHub).
• [[story points]] = رقم بيقدّر حجم المهمة وصعوبتها مقارنة بغيرها، مش عدد ساعات. غالبًا من الأرقام 1 و 2 و 3 و 5 و 8 و 13.
• [[sprint planning]] = اجتماع أول الـ sprint بتختاروا فيه المهام وتقدّروها.
• [[refinement]] (أو grooming) = اجتماع بتوضّحوا فيه المهام الجاية قبل ما تتختار.
• [[acceptance criteria]] = الشروط اللي لو اتحققت المهمة تعتبر خلصت.
• [[daily standup]] = اجتماع يومي قصير (حوالي ١٥ دقيقة). جمله مشروحة في درس «status update».
• [[blocker]] = حاجة موقفاك ومش هتعرف تكمل من غيرها.
• [[retro]] (retrospective) = اجتماع آخر الـ sprint عن طريقة الشغل نفسها: إيه اللي مشي كويس وإيه نغيّره.
• [[product owner]] = اللي بيرتّب الـ backlog ويقرر الأولوية. و [[scrum master]] = اللي بيسهّل الاجتماعات ويساعد يشيل الـ blockers، وهو مش مدير الفريق.`,
          example: R`In sprint planning: I'd estimate this ticket at 3 points. The API is ready, but we still need tests.
This one feels like an 8 to me. Can we split it into smaller tickets?
In refinement: What are the acceptance criteria for this story? Should guests be able to check out?
During the sprint: I'm blocked on push notifications because we don't have the FCM keys yet.
This won't fit in the current sprint. Can we move it back to the backlog?
In the retro: Code reviews were fast this sprint. One thing to improve: the scope changed in the middle of the sprint.`,
          try: R`اختار مشروع من مشاريعك واعمله backlog صغير فيه ٥ tickets بالإنجليزي (عنوان كل واحد بيبدأ بفعل، زي [[Add password reset]]). قدّر كل واحد بـ story points، واكتب لواحد منهم acceptance criteria من سطرين. وبعدين اكتب جملتين retro: حاجة مشيت كويس وحاجة تتحسن.`,
          flag: "script",
          deep: {
            why: R`لو مش فاهم الكلمات دي، هتقعد في الاجتماع ساكت حتى لو فاهم الشغل التقني كويس. ولو فاهمها، هتقدر تقول «المهمة دي كبيرة، نقسّمها» أو «أنا متعطل» في جملة واحدة، ودي حاجات الفريق محتاجها منك بدري.`,
            how: R`الـ story points نسبية: مهمة بـ 2 تقريبًا ضعف مهمة بـ 1، ومهمة بـ 8 كبيرة وفيها حاجات مش معروفة، فغالبًا الأحسن تتقسم. عشان كده الأرقام بتكبر بفجوات (5 وبعدها 8 وبعدها 13): كل ما المهمة تكبر، التقدير الدقيق بيبقى أصعب.

الجمل اللي هتحتاجها: [[I'd estimate this at ...]] (أقدّرها بـ)، و [[Can we split it?]] (نقسمها؟)، و [[I'm blocked on X because Y]] (متعطل في X بسبب Y)، و [[This won't fit in the sprint]] (مش هتلحق)، و [[What went well]] و [[One thing to improve]] (في الـ retro).

في الـ retro الكلام عن طريقة الشغل مش عن أشخاص: [[the scope changed mid-sprint]] مش [[Ahmed kept changing things]].`,
            when: "أول ما تدخل فريق بيشتغل بـ sprints: الـ planning والـ refinement والـ standup اليومي والـ retro، وكمان في أسئلة الانترفيو عن «اشتغلت إزاي مع فريق».",
            mistakes: R`تعتبر الـ story points ساعات ([[3 points = 3 hours]]). تسكت على الـ blocker يومين عشان متبانش مش عارف: قوله في الـ standup اللي بعده على طول. وتقول [[What is the acceptance criteria]]: الـ criteria جمع، فالصح [[What are the acceptance criteria]].`
          },
          teach: R`## الكلمات دي بتتقال في اجتماعات، فالنطق مهم

| الكلمة | النطق تقريبًا | معناها |
|---|---|---|
| [[sprint]] | سبرِنت | فترة شغل ثابتة |
| [[backlog]] | باك-لوج | ليستة الشغل المطلوب |
| [[estimate]] (فعل) | إستِمِيت | يقدّر |
| [[estimate]] (اسم) | إستِمِت | تقدير |
| [[acceptance criteria]] | أكسِبتانس كرايتيريا | شروط إن المهمة تخلص |
| [[refinement]] | ريفاينمِنت | توضيح المهام الجاية |
| [[retro]] | ريترو | اجتماع آخر الـ sprint |
| [[blocked]] | بلوكت (الـ ed بتتنطق «ت») | متعطل |

---

## الجمل حتة حتة

| الجملة | الاجتماع | المهم فيها |
|---|---|---|
| [[I'd estimate this ticket at 3 points. The API is ready, but we still need tests.]] | planning | [[estimate X at N]]، والسبب بعدها |
| [[This one feels like an 8 to me. Can we split it into smaller tickets?]] | planning | [[an 8]] (إيت: صوت علّة)، و [[split into]] |
| [[What are the acceptance criteria for this story? Should guests be able to check out?]] | refinement | [[are]] لأن [[criteria]] جمع، وسؤال بمثال محدد |
| [[I'm blocked on push notifications because we don't have the FCM keys yet.]] | standup | [[blocked on X because Y]] |
| [[This won't fit in the current sprint. Can we move it back to the backlog?]] | أثناء الـ sprint | [[won't fit]] = مش هتلحق |
| [[Code reviews were fast this sprint. One thing to improve: the scope changed in the middle of the sprint.]] | retro | عن طريقة الشغل، مش عن أشخاص |

---

## story points نسبية

الأرقام بتكبر بفجوات: ١ و ٢ و ٣ و ٥ و ٨ و ١٣. مهمة بـ ٨ مش ٨ ساعات، هي «كبيرة وفيها مجهول»، وعشان كده الجملة التانية في المثال بتقترح تتقسم. و [[3 points = 3 hours]] غلط شائع.

---

## criteria جمع

| مفرد | جمع |
|---|---|
| [[criterion]] | [[criteria]] |

عشان كده [[What are the acceptance criteria]] مش [[is]].

---

## الخلاصة

| عايز تقول | الجملة |
|---|---|
| أقدّرها بـ | [[I'd estimate this at ...]] |
| كبيرة، نقسمها | [[Can we split it?]] |
| متعطل | [[I'm blocked on X because Y]] |
| مش هتلحق | [[This won't fit in the sprint]] |
| في الـ retro | [[What went well]] و [[One thing to improve]] |`,
          lines: [
            R`في الـ planning: تقدير بالنقط، والسبب.`,
            R`مهمة كبيرة: [[split]] = نقسم.`,
            R`في الـ refinement: سؤال عن شروط إن المهمة تخلص، ومثال محدد.`,
            R`أثناء الـ sprint: [[I'm blocked on]] + السبب.`,
            R`مش هتلحق: نرجّعها للـ backlog بدل ما الـ sprint يتأخر.`,
            R`في الـ retro: حاجة مشيت كويس، وحاجة تتحسن، عن طريقة الشغل مش عن حد.`
          ],
          sol: R`backlog لمشروع متجر صغير:
[[Add password reset by email — 3 points]]
[[Show order history on the profile page — 2 points]]
[[Add Stripe payments — 8 points (split into: create checkout session, handle webhook, show payment status)]]
[[Fix wrong total when a coupon is removed — 1 point]]
[[Add product search — 5 points]]

acceptance criteria لـ password reset:
[[The user receives a reset link within a minute. The link expires after 30 minutes and works only once.]]

retro:
[[What went well: I wrote tests before fixing bugs. What could be better: I started tickets before writing acceptance criteria.]]

لو أي ticket عندك أكبر من 8، أو عنوانه مش بيبدأ بفعل ([[Login]] بدل [[Add login with Google]])، قسّمه أو وضّحه.`
        }
      ]
    }
]);
