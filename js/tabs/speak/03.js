// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "الـ standup والكلام اليومي",
      l: 1,
      n: "الـ standup بصوتك (١٠ أمثلة)، وتطلب مساعدة وتفهم بـ «Could you walk me through» و «Just to confirm»، وتقول مش فاهم بأدب، والـ small talk في أول الاجتماع",
      items: [
        {
          cmd: "standup بالكلام",
          title: "الـ standup بصوتك: ١٠ updates جاهزة (yesterday / today / blockers)",
          desc: R`الـ standup المكتوب شرحناه في درس [[status update]] في «تاب إنجليزي للمبرمج: قراية وكتابة». هنا الكلام: انت في مكالمة، الدور جالك، وعندك ٣٠–٦٠ ثانية.

الفرق بين المكتوب والمتكلم: ١) جمل أقصر. ٢) contractions: [[I'm]] و [[I'll]] و [[I've]] و [[didn't]] بدل [[I am]] و [[I will]] (الكلام من غير contractions بيبان آلي). ٣) كلمات ربط بدل العناوين: [[So yesterday...]] و [[Today I'm going to...]] و [[And no blockers.]] ٤) ممكن تبدأ بـ [[Hi everyone]] أو على طول.

ونصيحة للي إنجليزيته ضعيفة: اكتب الـ ٣ سطور قبل الاجتماع بـ ٥ دقايق، واقراهم مرة بصوت واطي. مش هتقراهم في الاجتماع كلمة بكلمة، بس هيبقوا في دماغك.`,
          example: R`1. So yesterday I finished the signup form. Today I'm adding validation. No blockers.
2. Yesterday I was stuck on a CORS error most of the day. I fixed it this morning. Today I'll open the PR.
3. I reviewed Omar's PR and left a few comments. Today I'm back on the search page.
4. Yesterday I paired with Sara on the payment webhook. Today I'll write the tests for it.
5. I'm still working on the dashboard. It's taking longer than I expected, probably until Thursday.
6. Today I'm going to investigate the slow orders page. I think it's a missing index.
7. I'm blocked on the staging database: I don't have access yet. Omar, could you help me after the call?
8. Quick one from me: I merged the cart PR. Today I'm starting on checkout. That's it.
9. I don't have much to share. I spent yesterday reading the auth code, so I'm ready to start on the refresh token today.
10. Nothing blocking, but I'd like 10 minutes with someone who knows the email service. Can we sync after standup?`,
          try: R`حضّر standup حقيقي عن امبارح والنهارده (شغل أو مذاكرة)، واكتبه في ٣ سطور. وبعدين سجّله بصوتك من غير ما تبص على الورقة، وخلّيه أقل من ٤٥ ثانية. كرر كل يوم لمدة أسبوع، وفي كل يوم استخدم جملة جديدة من الـ ١٠.`,
          flag: "script",
          deep: {
            why: R`الـ standup هو أكتر موقف كلام بيتكرر في شغلك: كل يوم. ولو اتعلمت تقوله بثقة في ٣٠ ثانية، ده بيبني ثقتك في الكلام في باقي الاجتماعات. وهو كمان المكان اللي المدير بيعرف منه إنك شغال ومتعلّق ولا لأ.`,
            how: R`الشكل الثابت: [[Yesterday I...]] (ماضي) + [[Today I'm going to / I'll...]] (مستقبل) + [[No blockers]] أو [[I'm blocked on...]].

للتأخير من غير ما تبان مقصر: [[It's taking longer than I expected]]، و [[I underestimated it]]، و [[I should be done by...]]. وقول السبب في جملة لو فيه ([[the API docs were wrong]]).

للـ blockers: وجّهه لشخص واطلب حاجة محددة: [[Omar, could you give me access after the call?]]. و [[Can we sync after standup?]] أو [[Can we take this offline?]] = نتكلم فيها بعد الاجتماع (عشان متطوّلش على الكل).

ولو مش عندك حاجة كبيرة: [[Not much to report]] أو [[Quick one from me]] وبعدين جملة. ده عادي، متخترعش.

والصوت: اتكلم أبطأ من طبيعتك شوية. الناس اللي بتتوتر بتسرّع، والسرعة بتبوّظ النطق.`,
            when: "كل يوم في الـ daily، وفي أي «round the table» في اجتماع («let's go around and give a quick update»).",
            mistakes: R`تحكي تفاصيل تقنية ٣ دقايق (الـ standup مش مكان حل مشاكل: [[let's take this offline]]). و [[Yesterday I am working]] (الصح [[I worked]] أو [[I was working]]). و [[I will finish it today inshallah]] كل يوم وهي مبتخلصش (قول الحقيقة بدري). و «no blockers» وانت متعلّق فعلًا. وتقرا من ورقة بصوت رتيب.`
          },
          teach: R`## الفكرة: ٣ أجزاء ثابتة في ٣٠ ثانية

الـ ١٠ أمثلة كلها مبنية على نفس الشكل: [[Yesterday]] (ماضي) + [[Today]] (مستقبل أو حاضر مستمر) + [[blockers]] (حاجة موقفاك). هنفك المثال الأول، وبعدين نشوف كل مثال بيعلّمك إيه زيادة.

---

## ١. المثال الأول: الهيكل

~~~text 1
So yesterday I finished the signup form. Today I'm adding validation. No blockers.
~~~

| الحتة | الزمن | ليه كده |
|---|---|---|
| [[So yesterday I finished...]] | ماضي بسيط | خلص امبارح. [[So]] كلمة بداية طبيعية في الكلام |
| [[Today I'm adding...]] | حاضر مستمر | شغال عليه النهارده |
| [[No blockers.]] | | مفيش حاجة موقفاني. جملة كاملة لوحدها |

[[finished]] = «فِنِشْت» من غير مقطع زيادة (درس «-ed و -s»). و [[I'm]] مش [[I am]]: الكلام من غير contractions بيبان آلي.

## ٢. كل مثال بيضيف إيه

| رقم | الجملة المفيدة | معناها | تستخدمها لما |
|---|---|---|---|
| ٢ | [[I was stuck on a CORS error]] | كنت متعلّق في | يوم ضاع في مشكلة |
| ٣ | [[I'm back on the search page]] | راجع لـ | بترجع لتاسك قديمة |
| ٤ | [[I paired with Sara on...]] | اشتغلت جنب سارة | شغل مشترك |
| ٥ | [[It's taking longer than I expected]] | واخد وقت أكتر من المتوقع | تأخير بصراحة |
| ٦ | [[I'm going to investigate...]] | هبحث في | تاسك لسه بتفهمها |
| ٧ | [[I'm blocked on... could you help me after the call?]] | متعطّل + طلب لشخص | blocker حقيقي |
| ٨ | [[Quick one from me... That's it.]] | حاجة سريعة... بس كده | يوم عادي |
| ٩ | [[I don't have much to share]] | مفيش كتير | يوم من غير إنجاز كبير |
| ١٠ | [[Can we sync after standup?]] | نتكلم بعد الـ standup | محتاج نقاش طويل |

## ٣. الـ blocker الصح (مثال ٧)

~~~text 7
I'm blocked on the staging database: I don't have access yet. Omar, could you help me after the call?
~~~

٣ حتت: المشكلة ([[blocked on]])، والسبب ([[I don't have access yet]])، وطلب لشخص بالاسم بميعاد ([[Omar, could you help me after the call?]]). مش [[I have a problem]] وتسكت.

## ٤. التأخير من غير ما تبان مقصّر (مثال ٥)

[[It's taking longer than I expected, probably until Thursday.]]: بتقول الحقيقة وتدّي ميعاد جديد. [[probably]] = غالبًا (أمانة). أحسن من [[I will finish it today]] كل يوم.

---

## ٥. نطق كلمات بتتكرر

[[validation]] «ڤا-لِ-**ديْ**-شَن»، و [[blockers]] «**بلو**-كَرز»، و [[CORS]] «كورز»، و [[investigate]] «إن-**ڤِس**-تِ-گيْت»، و [[dashboard]] «**داش**-بورد».

---

## الخلاصة

| الجزء | الشكل |
|---|---|
| امبارح | [[Yesterday I + ماضي]] |
| النهارده | [[Today I'm + ing]] أو [[Today I'll]] |
| مشاكل | [[No blockers.]] أو [[I'm blocked on X. Name, could you...?]] |

٣٠–٤٥ ثانية، contractions، واتكلم أبطأ من طبيعتك شوية.`,
          lines: [
            R`الشكل الأساسي: خلصت الفورم، النهارده validation، مفيش blockers.`,
            R`«كنت متعلق في CORS أغلب اليوم، صلحته الصبح، هفتح الـ PR النهارده». stuck on = متعلق في.`,
            R`«راجعت PR عمر وسبت كام تعليق، والنهارده راجع لصفحة البحث». back on = راجع لـ.`,
            R`«اشتغلت مع سارة على الـ webhook، والنهارده هكتب الاختبارات». paired with = اشتغلت جنب.`,
            R`تأخير بصراحة: «لسه شغال على الـ dashboard، واخد وقت أكتر من المتوقع، غالبًا لحد الخميس».`,
            R`«النهارده هبحث في بطء صفحة الأوردرات، أظن ناقص index». investigate = أبحث في.`,
            R`blocker بطلب محدد لشخص: «متعلّق في داتابيز الـ staging، معنديش access. عمر، ممكن تساعدني بعد المكالمة؟»`,
            R`update قصير: «حاجة سريعة: عملت merge للـ cart، وبادئ في الـ checkout. بس كده».`,
            R`يوم مفيهوش إنجاز كبير: «مفيش كتير، قريت كود الـ auth امبارح، فجاهز أبدأ الـ refresh token».`,
            R`«مفيش حاجة موقفاني، بس عايز ١٠ دقايق مع حد فاهم خدمة الإيميل. نتكلم بعد الـ standup؟» sync = نتكلم ونتفق.`
          ],
          sol: R`نموذج لـ standup متسجّل (حوالي ٢٥ ثانية):
[[Hi everyone. So yesterday I finished the product filters and opened a PR. Today I'm going to fix the review comments and start on pagination. And no blockers.]]

راجع التسجيل على ٤ حاجات: ١) أقل من ٤٥ ثانية. ٢) الماضي في yesterday ([[finished]] و [[opened]] بنطق [[-ed]] الصح من درس «-ed و -s»). ٣) contractions ([[I'm]] مش [[I am]]). ٤) مفيش سكوت طويل في النص.

علامة التحسن بعد أسبوع: بتقول الجمل من غير ما تفكر في الترتيب، وبتبدأ تغيّر فيها (مش نفس الجملة كل يوم). والتسجيل الضعيف: بتقرا من الورقة بنبرة واحدة، أو فيه [[ehh... ehh]] بين كل جملة.`
        },
        {
          cmd: "Could you walk me through",
          title: "تطلب شرح وتتأكد إنك فهمت: «Could you walk me through...» و «Just to confirm...»",
          desc: R`لما حد يشرحلك حاجة في مكالمة (تاسك جديدة، أو كود، أو bug)، عندك مهمتين: تطلب الشرح بطريقة محترمة، وتتأكد إنك فهمت صح قبل ما تقفل. والمهمة التانية أهم: أغلب المشاكل في الشغل مع فريق من برا مش إن حد مفهمش، إن حد فاكر إنه فهم.

لطلب الشرح: [[Could you walk me through...]] = ممكن تمشّيني في... خطوة خطوة (الجملة الذهبية). و [[Could you show me where...]] و [[How does X work?]] و [[What's the best way to...?]] و [[Could you give me an example?]].

للتأكد: [[Just to confirm, ...]] أو [[Just to make sure I understood: ...]] وبعدين تقول اللي فهمته بكلامك. أو [[So what you're saying is ...]] و [[So the next step is ... right?]]. والـ [[right?]] أو [[correct?]] في الآخر بتحول الجملة لسؤال بسهولة من غير ما تغيّر ترتيبها.

والتفاصيل المكتوبة (إزاي تكتب رسالة طلب مساعدة) في درس [[تطلب مساعدة]] في «تاب إنجليزي للمبرمج: قراية وكتابة»، وإمتى تسأل أصلًا في درس [[تسأل صح]] في «تاب الشغل والكارير».`,
          example: R`Could you walk me through how the deployment works?
Could you show me where the payment logic lives?
I'm not familiar with this part of the codebase. Where should I start?
Could you give me an example of a request that fails?
Just to confirm: I should branch off develop, not main, right?
Just to make sure I understood: the bug only happens for users with two accounts?
So what you're saying is the cache is fine, and the problem is the query?
So the next step is for me to write a test that reproduces it. Correct?
Sorry, one more question before we hang up: who should review the PR?`,
          try: R`اطلب من صاحب (أو من AI بالصوت) يشرحلك حاجة في ٢ دقيقة بالإنجليزي: مثلًا إزاي الـ git rebase بيشتغل. وخلال الشرح استخدم على الأقل: جملة [[Could you walk me through]]، وجملة [[Just to confirm]]، وفي الآخر لخّص اللي فهمته في جملتين بـ [[So ...]]. لو مفيش حد، سجّل نفسك وانت بتسأل ٣ أسئلة وبتلخّص فيديو قصير اتفرجت عليه.`,
          flag: "script",
          deep: {
            why: R`الـ junior اللي بيسأل كويس بيتعلم أسرع، واللي بيأكّد فهمه بيغلط أقل. والجملتين دول ([[walk me through]] و [[just to confirm]]) بيدّوا انطباع إنك منظم ومحترم لوقت اللي قدامك، حتى لو إنجليزيتك بسيطة.`,
            how: R`الأسئلة المهذبة في الإنجليزي بتبدأ بـ [[Could you ...]] أو [[Would you mind ...ing]] ([[Would you mind showing me...]]). و [[Can you]] مقبولة مع الزملاء. أما [[Explain me]] فغلط (الصح [[Explain it to me]] أو [[Walk me through it]]).

التأكيد بكلامك (paraphrase) أقوى من [[Yes, I understand]]: لأنه بيدّي فرصة للي قدامك يصحّحك. واختصره: [[So basically, X, right?]].

ولو الشرح سريع جدًا: [[Could you slow down a bit? I want to make sure I get this.]] (ودا مش ضعف، ده حرص).

ولو عايز تتعلم لوحدك الأول: [[Is there any documentation I can read first?]] أو [[I'll look into it and come back to you if I'm stuck.]]

وقبل ما تقفل: [[Is there anything else I should know?]] = سؤال بيطلّع معلومات محدش كان هيقولها.`,
            when: "أول يوم في تاسك جديدة، و onboarding، و pair programming، وأي مكالمة فيها تعليمات.",
            mistakes: R`[[Yes yes, I understand]] وانت مفهمتش (أغلى غلطة). و [[Explain me]]. و [[Can you repeat everything?]] (حدد الجزء: [[Could you repeat the part about the migration?]]). و [[What you mean?]] (الصح [[What do you mean?]]). وإنك متلخّصش في الآخر وتكتشف بعد يومين إنك فاهم غلط.`
          },
          teach: R`## الفكرة: نوعين جمل: تطلب الشرح، وتأكد إنك فهمت

المثال ٩ جمل: أول ٤ لطلب الشرح، والـ ٤ اللي بعدهم للتأكيد، والأخيرة قبل ما تقفل.

---

## ١. تطلب الشرح (أول ٤ سطور)

| الجملة | معناها | الحتة المهمة |
|---|---|---|
| [[Could you walk me through how the deployment works?]] | ممكن تمشّيني في الـ deployment خطوة خطوة؟ | [[walk me through]] = اشرحلي وانا ماشي معاك |
| [[Could you show me where the payment logic lives?]] | ممكن توريني الـ payment logic فين؟ | [[lives]] = موجود (عن الكود) |
| [[I'm not familiar with this part of the codebase. Where should I start?]] | مش عارف الجزء ده. أبدأ منين؟ | [[not familiar with]] ألطف من [[I don't know]] |
| [[Could you give me an example of a request that fails?]] | ممكن مثال لـ request بيفشل؟ | المثال بيوضح أسرع من الشرح |

[[Could you]] أدب من [[Can you]]، وبتتقال سريعة «كُدجو». وبعدها **فعل من غير to**: [[Could you show]] مش [[Could you to show]].

## ٢. تأكد إنك فهمت (السطر ٥ لـ ٨)

| البداية | اللي بعدها | مثال |
|---|---|---|
| [[Just to confirm:]] | اللي فهمته + [[right?]] | [[I should branch off develop, not main, right?]] |
| [[Just to make sure I understood:]] | اللي فهمته كسؤال | [[the bug only happens for users with two accounts?]] |
| [[So what you're saying is...]] | إعادة صياغة | [[the cache is fine, and the problem is the query?]] |
| [[So the next step is...]] | الخطوة الجاية + [[Correct?]] | [[for me to write a test that reproduces it.]] |

السر في [[right?]] و [[Correct?]] في الآخر: بيحولوا أي جملة عادية لسؤال من غير ما تغيّر الترتيب. ده أسهل من [[Should I branch off develop?]] لو مش متأكد من الـ grammar.

[[branch off develop]] = اعمل branch من develop. و [[reproduces it]] = يطلّع المشكلة تاني (يكررها).

## ٣. قبل ما تقفل (آخر سطر)

~~~text 9
Sorry, one more question before we hang up: who should review the PR?
~~~

[[before we hang up]] = قبل ما نقفل المكالمة. [[one more question]] بتدّي إشارة إنك عارف إن الوقت خلص وبتحترمه.

---

## ٤. الغلطات

[[Explain me]] ← الصح [[Explain it to me]] أو [[Walk me through it]]. و [[What you mean?]] ← [[What do you mean?]]. و [[Yes, I understand]] من غير تأكيد بكلامك: ده مش تأكيد.

---

## الخلاصة

- اطلب: [[Could you walk me through...?]].
- أكّد بكلامك: [[Just to confirm: ..., right?]] (أقوى من [[I understand]] لأنه بيدّي فرصة يصحّحك).
- اقفل: [[So the next step is ...]] + سؤال أخير.`,
          lines: [
            R`«ممكن تمشّيني في طريقة الـ deployment؟» walk me through = اشرحلي خطوة خطوة.`,
            R`«ممكن توريني الـ payment logic فين؟» lives = موجود (تعبير شائع عن الكود).`,
            R`«مش متعود على الجزء ده من الكود. أبدأ منين؟» not familiar with = مش عارفه كويس.`,
            R`«ممكن مثال لـ request بيفشل؟»`,
            R`«بس أتأكد: أعمل branch من develop مش main، صح؟»`,
            R`«عشان أتأكد إني فهمت: الـ bug بيحصل بس لليوزرز اللي عندهم حسابين؟»`,
            R`«يعني قصدك إن الـ cache تمام، والمشكلة في الـ query؟»`,
            R`«يعني الخطوة الجاية إني أكتب test يطلّع المشكلة. صح؟» reproduce = يكرر حدوث المشكلة.`,
            R`«آسف، سؤال أخير قبل ما نقفل: مين هيراجع الـ PR؟» hang up = نقفل المكالمة.`
          ],
          sol: R`مثال لمحادثة كويسة عن [[git rebase]]:
[[Could you walk me through what rebase actually does?]] ... [[Just to confirm: it takes my commits and puts them on top of the latest main, right?]] ... [[And that's why the commit hashes change?]] ... [[So basically, rebase rewrites my branch history to make it linear, and I shouldn't do it on a branch other people are using. Is that correct?]]

علامات النجاح: التلخيص بكلامك مش تكرار جمل اللي شرح، وفيه [[right?]] أو [[correct?]] في الآخر، وسألت عن حاجة محددة مش [[repeat everything]].

الإجابة الضعيفة: ساكت طول الشرح وفي الآخر [[OK, thank you]]. ولو صاحبك سألك سؤال في الآخر ومعرفتش ترد، يبقى التأكيد مكانش كفاية.`
        },
        {
          cmd: "مش فاهم بأدب",
          title: "تقول «مفهمتش» بأدب من غير ما تتكسف: Sorry, I didn't catch that",
          desc: R`هتحصل كتير: حد بيتكلم بسرعة، أو بلكنة مش متعود عليها (هندي، أو اسكتلندي، أو أمريكي من الجنوب)، أو النت وحش، أو كلمة مش عارفها. والحل مش إنك تهز راسك: الحل ٣ جمل جاهزة حسب السبب.

١) مسمعتش (صوت أو سرعة): [[Sorry, I didn't catch that.]] أو [[Sorry, could you say that again?]] أو [[You cut out for a second.]] (النت).
٢) سمعت بس مش فاهم كلمة: [[Sorry, what does X mean?]] أو [[I'm not familiar with that term.]]
٣) فاهم الكلام بس مش فاهم الفكرة: [[I'm not sure I follow.]] أو [[Could you explain that in a different way?]] أو [[Could you give me an example?]]

والحيلة: كرر آخر جزء فهمته عشان هو يكمّل من عنده: [[Sorry, you said the job runs every night, and then...?]]`,
          example: R`Sorry, I didn't catch that. Could you say it again?
Sorry, you cut out for a second. Could you repeat the last part?
Could you say that a bit more slowly? I want to make sure I get it right.
Sorry, what does "idempotent" mean in this context?
I'm not familiar with that tool. Is it something we use internally?
I'm not sure I follow. Could you give me an example?
Sorry, you said the job runs every night, and then what happens?
Let me repeat it back to make sure: we retry three times, then we alert. Right?
Would you mind typing that in the chat? I want to get the name right.`,
          try: R`شغّل فيديو تقني سريع على YouTube (مثلًا من Fireship) من غير subtitles. كل ما تفوّتك جملة، وقّف الفيديو وقول بصوت عالي الجملة المناسبة من الـ ٣ أنواع، كأنك في مكالمة. وبعدين اكتب ٣ جمل من الـ ٩ في [[phrases.md]] واحفظهم.`,
          flag: "script",
          deep: {
            why: R`أكبر خطر مش إنك متفهمش، إنك تتظاهر إنك فهمت. هتقول [[yes]] وتروح تعمل حاجة غلط يومين. والـ native speakers نفسهم بيقولوا [[Sorry, I didn't catch that]] كل يوم. ولو طلبت يعيد، ده بيبان «حريص»، مش «ضعيف».`,
            how: R`اسم الحاجة اللي مسمعتهاش: [[Could you repeat the part about the database?]] أحسن من [[Repeat please]].

[[Would you mind typing that in the chat?]] جملة ذهبية لأسماء الأدوات والـ URLs والأرقام والأسماء الأجنبية: محدش بيتضايق منها، وبتديك نسخة مكتوبة ترجعلها.

اللكنات: الإنجليزي في الشغل بيتقال بلكنات كتير جدًا (هندي، وأوروبي، وأفريقي، وأمريكي، وبريطاني). ودنك هتتعود على لكنة الفريق بتاعك بعد أسبوعين تلاتة. والحل طويل المدى: اسمع talks بلكنات مختلفة (درس «listening بالمستوى»).

ولو الموضوع اتكرر مع نفس الشخص: متقولش [[your accent is hard]]، قول [[Sorry, my connection isn't great today; could you speak a bit more slowly?]] أو ببساطة [[I'm still getting used to the terms; could you slow down a little?]]`,
            when: "أي مكالمة، وخصوصًا أول أسابيع في فريق جديد، أو مع عميل أول مرة.",
            mistakes: R`[[Yes]] على سؤال مفهمتوش (وممكن يكون السؤال «is it OK if we cancel your task?»). و [[What?]] لوحدها (ناشفة، قول [[Sorry?]] أو [[Pardon?]]). و [[Repeat]] بصيغة الأمر. و [[I didn't understood]] (الصح [[I didn't understand]]). وإنك تعتذر عن إنجليزيتك في كل مرة: [[Sorry, my English is bad]] مرة واحدة ولا حاجة.`
          },
          teach: R`## الفكرة: ٣ أسباب لعدم الفهم، ولكل سبب جملة

المثال ٩ جمل. الحيلة إنك تعرف **ليه** مفهمتش، وتقول الجملة المناسبة، بدل [[What?]] لكل حاجة.

---

## ١. مسمعتش (أول ٣ سطور)

| الجملة | السبب | الحتة المهمة |
|---|---|---|
| [[Sorry, I didn't catch that. Could you say it again?]] | سرعة أو صوت | [[catch]] = ألقط الكلام |
| [[Sorry, you cut out for a second. Could you repeat the last part?]] | النت | [[cut out]] = الصوت قطع؛ [[the last part]] = حدد الجزء |
| [[Could you say that a bit more slowly? I want to make sure I get it right.]] | سرعة | السبب بعدها بيخليها حرص مش شكوى |

[[didn't catch]] = «دِدِنْت كاتش» (هنا [[catch]] بـ «تش» فعلًا). و [[a bit more slowly]] مش [[more slow]].

## ٢. سمعت بس مش فاهم كلمة (السطر ٤ و ٥)

[[Sorry, what does "idempotent" mean in this context?]]: [[in this context]] = في السياق ده، لأن كلمات تقنية كتير معناها بيتغير حسب المكان. و [[I'm not familiar with that tool. Is it something we use internally?]]: [[internally]] = جوه الشركة (أداة داخلية).

[[What does X mean?]] فيها [[does]]، والفعل [[mean]] من غير s. الغلط المشهور: [[What means X?]].

## ٣. فاهم الكلام بس مش فاهم الفكرة (السطر ٦ و ٧)

[[I'm not sure I follow. Could you give me an example?]]: [[follow]] هنا = أتابع الفكرة. و [[Sorry, you said the job runs every night, and then what happens?]]: بتكرر آخر حتة فهمتها، فهو يكمّل من عندها بدل ما يعيد كله.

## ٤. تتأكد أو تطلب مكتوب (آخر سطرين)

[[Let me repeat it back to make sure: we retry three times, then we alert. Right?]]: [[repeat it back]] = أعيده عليك. و [[Would you mind typing that in the chat? I want to get the name right.]]: [[Would you mind + ing]] = ممكن لو مش هيضايقك. الجملة دي ذهبية للأسماء والـ URLs والأرقام.

---

## الخلاصة

| السبب | الجملة |
|---|---|
| مسمعتش | [[Sorry, I didn't catch that.]] |
| كلمة جديدة | [[Sorry, what does X mean here?]] |
| الفكرة مش واضحة | [[I'm not sure I follow. Could you give me an example?]] |
| اسم أو رقم | [[Would you mind typing that in the chat?]] |

[[What?]] لوحدها ناشفة؛ [[Sorry?]] أطبع لو مستعجل.`,
          lines: [
            R`«آسف، ملحقتش. ممكن تقولها تاني؟» catch = ألقط الكلام.`,
            R`«آسف، صوتك قطع ثانية. ممكن تعيد آخر جزء؟» cut out = الصوت قطع.`,
            R`«ممكن أبطأ شوية؟ عايز أتأكد إني فهمت صح».`,
            R`«آسف، idempotent معناها إيه في السياق ده؟»`,
            R`«مش عارف الأداة دي. هي حاجة داخلية عندنا؟» internally = جوه الشركة.`,
            R`«مش متأكد إني ماشي معاك. ممكن مثال؟» follow = أتابع الفكرة.`,
            R`كرر آخر جزء فهمته: «قلت الـ job بيشتغل كل ليلة، وبعدين إيه اللي بيحصل؟»`,
            R`«خليني أعيدها عشان أتأكد: بنعيد ٣ مرات، وبعدين نبعت alert. صح؟»`,
            R`«ممكن تكتبها في الشات؟ عايز الاسم يبقى صح».`
          ],
          sol: R`المتوقع: في فيديو Fireship (سريع جدًا) هيفوتك جمل كتير، ودا طبيعي. الجمل اللي المفروض استخدمتها أكتر: [[Sorry, I didn't catch that]] (للسرعة)، و [[What does X mean?]] (للكلمات الجديدة).

الـ ٣ جمل اللي تحفظهم لو هتحفظ ٣ بس:
[[Sorry, I didn't catch that. Could you say it again?]]
[[I'm not sure I follow. Could you give me an example?]]
[[Would you mind typing that in the chat?]]

لو لقيت إنك فهمت الفيديو كله تقريبًا، جرّب فيديو بلكنة مختلفة (مثلًا talk من مؤتمر في الهند أو اسكتلندا) أو podcast من غير فيديو، لأن الشفايف بتساعد في الفهم أكتر ما تتخيل.`
        },
        {
          cmd: "small talk",
          title: "أول ٢ دقيقة في الاجتماع: small talk بجمل بسيطة (How's it going?)",
          desc: R`أغلب الاجتماعات مع فرق من برا بتبدأ بدقيقة أو اتنين كلام خفيف لحد ما الكل يدخل: [[How's it going?]] و [[How was your weekend?]]. والمصري بيتوتر في الحتة دي أكتر من الكلام التقني، لأن مفيش سكريبت. الحل: سكريبت صغير.

الأسئلة اللي هتتسأل تقريبًا دايمًا: [[How are you?]] / [[How's it going?]] (بترد [[Good, thanks! How about you?]] مش شرح لحالتك الصحية)، و [[How was your weekend?]] (جملة عن حاجة عملتها + سؤال راجع)، و [[What's the weather like there?]] (الناس بتحب تسأل عن مصر)، و [[Any plans for the weekend?]].

القاعدة الذهبية: رد قصير + حاجة صغيرة عنك + سؤال راجع. [[Pretty good, thanks. It's been a busy week. How about you?]]. كده انت شاركت ورجعت الكرة.`,
          example: R`A: Hey, how's it going?
B: Good, thanks! A bit busy, but good. How about you?
A: How was your weekend?
B: Nice and quiet. I went to the beach in Alexandria with my family. How was yours?
A: What's the weather like in Cairo right now?
B: Still hot, around 33 degrees. I'm jealous of your autumn!
A: Any plans for the holiday?
B: Not really, just resting. Maybe I'll finally finish a side project.
B: Oh, I think everyone's here. Should we get started?`,
          try: R`اكتب ردك الحقيقي على الـ ٤ أسئلة (How's it going، و How was your weekend، و weather، و plans)، كل رد جملتين بالكتير وفي آخره سؤال راجع. سجّلهم. وحضّر كمان جملة واحدة عن حاجة في مصر ممكن تحكيها لو حد سأل (أكلة، أو مكان، أو مناسبة جاية).`,
          flag: "script",
          deep: {
            why: R`الـ small talk بيبني علاقة مع الفريق، وده مهم جدًا في الشغل remote لأنه البديل عن الكلام في المطبخ. واللي بيرد بـ [[fine]] وبس ويسكت بيبان بارد، حتى لو هو بس متوتر. وجملتين جاهزين بيحلّوا المشكلة.`,
            how: R`الردود على [[How are you?]]: [[Good, thanks]]، و [[Pretty good]]، و [[Not bad]]، و [[Can't complain]]، و [[A bit tired, but good]]. وبعدها دايمًا [[How about you?]] أو [[And you?]].

المواضيع الآمنة: الويك إند، والجو، والأجازات، والأكل، والرياضة (لو بتتابع)، والسفر، ومشاريع جانبية، وحاجات تقنية جديدة ([[Did you see the new release of X?]]). المواضيع اللي تبعد عنها في الشغل: السياسة، والدين، والفلوس، والشكوى من الشركة أو زميل.

الويك إند في مصر جمعة وسبت، وأغلب الفرق برا سبت وحد. فلو اتسألت يوم الاتنين [[How was your weekend?]]، رد عادي. ولو حد سأل ليه بتشتغل يوم الأحد، ده موضوع small talk لطيف: [[Our weekend in Egypt is Friday and Saturday.]]

وإنهاء الـ small talk: [[I think everyone's here. Should we get started?]] أو [[Shall we dive in?]]. لو انت اللي منظم الاجتماع، دي مسؤوليتك.`,
            when: "أول دقيقتين في أي اجتماع، و 1:1 مع مديرك، ومكالمة مع عميل.",
            mistakes: R`[[I'm fine, thank you, and you?]] بنبرة كتاب المدرسة (مش غلط، بس [[Good, thanks! You?]] أطبع). وإنك تحكي مشاكل حقيقية ([[Actually I'm sick and my internet is bad and...]]). و [[What did you do in the weekend?]] (الصح [[on the weekend]] أمريكي، أو [[at the weekend]] بريطاني، أو [[over the weekend]]). وتسكت بعد ردك من غير سؤال راجع.`
          },
          teach: R`## الفكرة: رد قصير + حاجة صغيرة عنك + سؤال راجع

المثال حوار قصير بين A و B: أربع أسئلة متكررة وردودها، وجملة بتنهي الـ small talk. الـ B هو انت.

---

## ١. السؤال والرد، واحد واحد

| السؤال (A) | الرد (B) | التركيبة |
|---|---|---|
| [[Hey, how's it going?]] | [[Good, thanks! A bit busy, but good. How about you?]] | رد + حاجة صغيرة + سؤال راجع |
| [[How was your weekend?]] | [[Nice and quiet. I went to the beach in Alexandria with my family. How was yours?]] | وصف + حاجة عملتها + سؤال راجع |
| [[What's the weather like in Cairo right now?]] | [[Still hot, around 33 degrees. I'm jealous of your autumn!]] | معلومة + هزار خفيف |
| [[Any plans for the holiday?]] | [[Not really, just resting. Maybe I'll finally finish a side project.]] | رد + تفصيلة |

## ٢. كلمات في الحوار

- [[How's it going?]] = إزيك. مش سؤال حرفي عن حالتك؛ الرد [[Good, thanks]] مش تقرير.
- [[How was yours?]] = والويك إند بتاعك؟ [[yours]] بدل ما تكرر [[your weekend]].
- [[What's the weather like?]] = الجو عامل إيه؟ (مش [[How is the weather like?]]).
- [[I'm jealous of...]] = غيران (بهزار لطيف).
- [[finally]] = أخيرًا.

## ٣. نهاية الـ small talk (آخر سطر)

~~~text الجملة
Oh, I think everyone's here. Should we get started?
~~~

[[everyone's here]] = الكل وصل. [[Should we get started?]] = نبدأ؟ لو انت منظم الاجتماع، دي مسؤوليتك.

---

## ٤. الغلطات

| الغلط | الصح |
|---|---|
| [[I'm fine, thank you, and you?]] بنبرة الكتاب | [[Good, thanks! You?]] |
| [[What did you do in the weekend?]] | [[on the weekend]] (أمريكي) أو [[at the weekend]] (بريطاني) أو [[over the weekend]] |
| رد [[Fine.]] وتسكت | رد + سؤال راجع |

---

## الخلاصة

- القاعدة: رد قصير + حاجة صغيرة + [[How about you?]].
- مواضيع آمنة: الويك إند والجو والأكل والأجازات. بعيد عن السياسة والدين والفلوس.
- انت اللي بتنهيها: [[Should we get started?]].`,
          lines: [
            R`«إزيك، أخبارك إيه؟» How's it going = إزيك (مش سؤال حرفي).`,
            R`«تمام، شكرًا! مشغول شوية بس تمام. وانت؟» رد قصير + سؤال راجع.`,
            R`«الويك إند كان عامل إيه؟»`,
            R`«هادي ولطيف. رحت البحر في إسكندرية مع العيلة. وانت؟» How was yours = والويك إند بتاعك؟`,
            R`«الجو عامل إيه في القاهرة دلوقتي؟»`,
            R`«لسه حر، حوالي ٣٣ درجة. غيران من الخريف عندكم!» jealous = غيران (بهزار).`,
            R`«عندك خطط للأجازة؟»`,
            R`«مش أوي، هرتاح. يمكن أخلّص أخيرًا side project».`,
            R`نهاية الـ small talk: «أظن الكل وصل. نبدأ؟»`
          ],
          sol: R`نماذج ردود كويسة:
[[Pretty good, thanks! It's been a productive week. How about you?]]
[[It was nice. I watched the match with friends on Friday. How was yours?]]
[[It's still warm, around 30 degrees, but the evenings are getting nicer. What about there?]]
[[Nothing big, maybe a short trip to Ain Sokhna. Do you have any plans?]]

وجملة عن مصر: [[It's Ramadan next month, so everyone's schedule changes a bit. People eat at sunset and stay up late.]] أو [[You should try koshari if you ever visit. It's our national street food.]]

راجع: كل رد فيه سؤال راجع؟ أقل من ١٥ كلمة تقريبًا؟ لو ردك جملة واحدة [[Fine]] من غير أي حاجة، ده اللي بيخلّي الكلام يقف.`
        }
      ]
    },
    {
      t: "غلطات الكلام عند المصريين",
      l: 1,
      n: "ترجمة حرفية من العربي بتطلع في الكلام: I am agree و open the mic و make a meeting و since 2 days، وأزمنة الكلام وترتيب السؤال (What you mean? ← What do you mean?)",
      items: [
        {
          cmd: "غلطات الكلام",
          title: "«open the mic» و «make a meeting» و «I am agree»: ١٥ غلطة كلام والصح",
          desc: R`في درس [[غلطات المصريين]] في «تاب إنجليزي للمبرمج: قراية وكتابة» اتكلمنا عن غلطات الكتابة ([[discuss about]] و [[explain me]] و [[since 2 days]]). هنا الغلطات اللي بتطلع في الكلام أكتر، خصوصًا في المكالمات: مكالمة، ومايك، وكاميرا، ونت، ومواعيد.

السبب واحد: الترجمة الحرفية من العامية. «افتح المايك» ← [[open the mic]] والصح [[unmute]] أو [[turn on your mic]]. «اعمل ميتينج» ← [[make a meeting]] والصح [[set up a meeting]] أو [[schedule a call]]. «أنا موافق» ← [[I am agree]] والصح [[I agree]]. «النت بيقطع» ← [[the internet is cutting]] والصح [[my connection keeps dropping]].

الحل زي ما قلنا قبل كده: متحفظش قاعدة، احفظ الجملة الصح كاملة وقولها ٥ مرات بصوت عالي.`,
          example: R`Wrong: Open your mic / close your camera.     Right: Unmute yourself / turn off your camera.
Wrong: Let's make a meeting tomorrow.         Right: Let's set up a call tomorrow.
Wrong: I am agree with you.                   Right: I agree with you.
Wrong: The internet is cutting.               Right: My connection keeps dropping.
Wrong: I'm in the way.                        Right: I'm on my way. / I'll join in a minute.
Wrong: Tomorrow I will not come.              Right: I'll be off tomorrow. / I'm taking tomorrow off.
Wrong: What is the problem? (to a teammate)   Right: What's going on? / What seems to be the issue?
Wrong: He don't know.                         Right: He doesn't know.
Wrong: I have 3 years experience in React.    Right: I have three years of experience with React.
Wrong: I finished my graduation in 2024.      Right: I graduated in 2024.
Wrong: I'm working in Vodafone.               Right: I work at Vodafone.
Wrong: Can you hear me good?                  Right: Can you hear me OK? / Can you hear me well?
Wrong: I will send you the link now now.      Right: I'll send you the link right away.
Wrong: Yes, I didn't do it. (= answering "You didn't push it?")   Right: No, I didn't. / Right, I haven't pushed it yet.
Wrong: Welcome! (to end a thank you)          Right: You're welcome! / No problem! / Sure!`,
          try: R`اقرا كل صف بصوت عالي: الغلط مرة (بصوت واطي) والصح مرتين (بصوت عالي). وبعدين اختار ٥ غلطات بتعملها فعلًا، وحطهم في [[mistakes.md]] أو [[phrases.md]]. وأسبوع كامل، كل ما تتكلم إنجليزي، ركز على غلطة واحدة منهم بس.`,
          flag: "script",
          deep: {
            why: R`الغلطات دي مش بتمنع الفهم غالبًا، بس بتتكرر كل يوم فبتلفت النظر، وبعضها بيعمل لخبطة حقيقية: [[Yes, I didn't]] بتخلي اللي قدامك مش عارف انت عملت ولا لأ. و [[I'm in the way]] معناها «أنا معطّل الطريق»!`,
            how: R`المكالمات: [[mute]] / [[unmute]]، و [[turn on / turn off your camera]]، و [[share your screen]]، و [[drop off the call]]، و [[join the call]]، و [[my connection is unstable]].

الاجتماعات: [[set up]] أو [[schedule]] أو [[book]] a meeting، و [[join]] (مش [[enter]]) a meeting، و [[attend]] رسمية أكتر.

الإجابة بـ yes و no على سؤال منفي: الإنجليزي بيجاوب على الحقيقة مش على السؤال. [[You didn't push it?]] لو مدفعتش: [[No, I didn't]]. لو دفعت: [[Yes, I did]]. العربي بيقول «أيوه، مدفعتش» وده بيلخبط جدًا. والأضمن: متقولش yes أو no لوحدها، قول الجملة كاملة.

الخبرة والشغل: [[three years of experience with/in React]]، و [[I work at Google]] (الشركة) و [[I work in marketing]] (المجال)، و [[I work on the payments team]] (الفريق أو المشروع).

الشكر: [[You're welcome]] أو [[No problem]] أو [[Sure]] أو [[Anytime]] أو [[No worries]]. و [[Welcome]] لوحدها معناها «أهلًا بيك» (لضيف جديد).`,
            when: "كل مكالمة. ركز على أول ٣ صفوف (mic و meeting و agree) الأسبوع الأول لأنهم الأكتر تكرار.",
            mistakes: R`الغلطة الأكبر هنا إنك تعرف الصح وتفضل تقول الغلط من العادة. الحل: التركيز على غلطة واحدة في الأسبوع، مش كلهم مرة واحدة. وخلي حد في الفريق (أو AI بعد المكالمة من الـ transcript) يقولك لو قلتها.`
          },
          teach: R`## الفكرة: ١٥ ترجمة حرفية، والصح جملة كاملة تحفظها

المثال ١٥ سطر بنفس الشكل: [[Wrong:]] وبعدين [[Right:]]. الغلط في كل سطر جاي من ترجمة كلمة بكلمة من العامية. هنجمعهم حسب الموقف.

---

## ١. المكالمة والاجتماع

| بالعامية | الترجمة الحرفية (غلط) | الصح |
|---|---|---|
| افتح المايك | [[Open your mic]] | [[Unmute yourself]] |
| اقفل الكاميرا | [[close your camera]] | [[turn off your camera]] |
| نعمل ميتينج | [[make a meeting]] | [[set up a call]] أو [[schedule a meeting]] |
| النت بيقطع | [[The internet is cutting]] | [[My connection keeps dropping]] |
| أنا في السكة | [[I'm in the way]] | [[I'm on my way]] |
| بتسمعني كويس؟ | [[Can you hear me good?]] | [[Can you hear me OK?]] |

[[I'm in the way]] بالذات خطيرة: معناها «أنا معطّل الطريق». و [[keeps dropping]] = بيفضل يقع ([[keep + ing]] = بيفضل).

## ٢. الشغل والخبرة

| الغلط | الصح | ليه |
|---|---|---|
| [[I am agree with you.]] | [[I agree with you.]] | [[agree]] فعل مش صفة |
| [[He don't know.]] | [[He doesn't know.]] | he/she/it + doesn't |
| [[I have 3 years experience in React.]] | [[I have three years of experience with React.]] | لازم [[of]] |
| [[I finished my graduation in 2024.]] | [[I graduated in 2024.]] | الفعل جاهز |
| [[I'm working in Vodafone.]] | [[I work at Vodafone.]] | [[at]] للشركة، و [[in]] للمجال |
| [[Tomorrow I will not come.]] | [[I'll be off tomorrow.]] | [[off]] = أجازة |

## ٣. الردود الصغيرة

| الغلط | الصح | ليه |
|---|---|---|
| [[What is the problem?]] | [[What's going on?]] | الأولى ممكن تتسمع هجومية |
| [[I will send you the link now now.]] | [[I'll send you the link right away.]] | «دلوقتي حالًا» = [[right away]] |
| [[Yes, I didn't do it.]] | [[No, I didn't.]] | الإنجليزي بيجاوب على الحقيقة مش على السؤال |
| [[Welcome!]] (رد على شكرًا) | [[You're welcome!]] أو [[No problem!]] | [[Welcome]] لوحدها = أهلًا بيك |

## ٤. السؤال المنفي (أصعب سطر)

السؤال: [[You didn't push it?]] (مدفعتهوش؟). بالعربي بنقول «أيوه، مدفعتهوش». بالإنجليزي:
- لو **مدفعتش**: [[No, I didn't.]] أو [[Right, I haven't pushed it yet.]]
- لو **دفعت**: [[Yes, I did.]]

الأضمن: متقولش yes أو no لوحدها، قول الجملة كاملة بعدها.

---

## الخلاصة

- الأكتر تكرار: [[unmute]]، و [[set up a call]]، و [[I agree]]. ابدأ بيهم.
- غلطة واحدة في الأسبوع؛ لو صلّحت نفسك في نص الجملة، ده معناه إن المخ بدأ يلاحظ.`,
          lines: [
            R`المايك والكاميرا: unmute و turn on/off. مش open و close.`,
            R`الاجتماع: set up أو schedule. مش make.`,
            R`agree فعل مش صفة: I agree. مش I am agree.`,
            R`النت: my connection keeps dropping. keeps = بيفضل.`,
            R`on my way = في السكة. in the way = معطّل الطريق!`,
            R`الأجازة: I'll be off أو I'm taking tomorrow off.`,
            R`«إيه المشكلة؟» ممكن تتسمع هجومية. What's going on أو What seems to be the issue ألطف.`,
            R`he / she / it + doesn't. مش don't.`,
            R`three years of experience with React. لازم of.`,
            R`graduated = اتخرجت. مش finished my graduation.`,
            R`work at + شركة. مش in.`,
            R`hear me OK أو well. مش good.`,
            R`right away = حالًا. «now now» ترجمة من «دلوقتي حالًا».`,
            R`سؤال منفي: جاوب على الحقيقة. «No, I didn't» لو معملتش.`,
            R`رد الشكر: You're welcome أو No problem. و Welcome لوحدها = أهلًا بيك.`
          ],
          sol: R`الـ ٥ الأكتر شيوعًا عند الناس اللي بتبدأ شغل remote: [[open the mic]]، و [[make a meeting]]، و [[I am agree]]، و [[I have 3 years experience]] (من غير of)، و [[Yes, I didn't]].

شكل [[phrases.md]] الصح:
[[Unmute yourself — (بدل open your mic) — كل مكالمة]]
[[Let's set up a call — (بدل make a meeting)]]
[[I agree — (بدل I am agree)]]

الأسبوع الأول: اختار [[I agree]] بس. هتلاقي نفسك بتقول [[I am agr...]] وتصلّح في النص: ده بالظبط اللي المفروض يحصل، ده معناه إن المخ بدأ يلاحظ. بعد أسبوعين هتطلع صح من الأول.`
        },
        {
          cmd: "أزمنة الكلام",
          title: "الأزمنة وترتيب السؤال في الكلام: What you mean? ← What do you mean?",
          desc: R`في الكلام السريع، غلطتين بيتكرروا أكتر من أي حاجة: الأزمنة، وترتيب الكلام في السؤال.

الأزمنة: انت محتاج ٥ بس في الشغل: ١) [[I work on X]] (عادة، كل يوم). ٢) [[I'm working on X]] (دلوقتي، الأيام دي). ٣) [[I worked on X]] أو [[I fixed X]] (خلص، وقت معروف: yesterday). ٤) [[I've fixed X]] (خلص، والنتيجة مهمة دلوقتي، من غير وقت محدد). ٥) [[I'll do X]] أو [[I'm going to do X]] (المستقبل). والأشهر في الغلط: [[Yesterday I fix]] (الصح [[fixed]])، و [[I am work on it]] (الصح [[I'm working]]).

السؤال: العربي بيسأل بنفس ترتيب الجملة + نبرة ([[What you mean?]])، والإنجليزي محتاج فعل مساعد قبل الفاعل: [[What do you mean?]]، و [[Why does it fail?]] (مش [[Why it fails?]])، و [[Where is the config?]] (مش [[Where the config is?]])، و [[Did you push it?]] (مش [[You pushed it?]] رغم إنها بتتقال في الكلام السريع بنبرة استغراب).`,
          example: R`Habit:  I usually work on the backend.
Now:  I'm working on the login page this week.
Finished + time:  I fixed the bug yesterday.
Finished + result now:  I've fixed the bug, so you can test it.
Future:  I'll push it after lunch. / I'm going to refactor it next sprint.
Wrong: What you mean?          Right: What do you mean?
Wrong: Why it fails?           Right: Why does it fail?
Wrong: Where the config is?    Right: Where is the config?
Wrong: How I can run it?       Right: How can I run it?
Wrong: You tested it?          Right: Did you test it?
Indirect (polite):  Do you know where the config is?   Could you tell me why it fails?`,
          try: R`اكتب ٦ أسئلة هتسألهم في أول أسبوع شغل (عن الكود، والـ deploy، والفريق)، وبعدين سجّلهم. اسمع وشوف: كل سؤال فيه فعل مساعد (do / does / did / is / can) قبل الفاعل؟ وبعدين اعمل ٢ منهم بصيغة غير مباشرة ([[Do you know where...]]).`,
          flag: "script",
          deep: {
            why: R`الأسئلة هي أكتر حاجة هتقولها كـ junior. و [[What you mean?]] و [[Why it fails?]] من أوضح العلامات إن الإنجليزي «مترجم». والأزمنة بتفرق في المعنى: [[I fixed it]] (خلاص) و [[I'm fixing it]] (لسه) معلومتين مختلفتين للمدير.`,
            how: R`القاعدة للسؤال: كلمة السؤال + فعل مساعد + الفاعل + الفعل. [[What]] + [[do]] + [[you]] + [[mean]]. ولو فيه [[is]] أو [[can]] أو [[should]]، هو نفسه الفعل المساعد ويتقدم: [[Where is the config?]] و [[How can I run it?]] و [[Should I use main?]].

الأسئلة غير المباشرة (المؤدبة) بترجّع الترتيب العادي: [[Do you know where the config is?]] (مش [[where is the config]]). ودي حيلة حلوة: لو مش متأكد من الترتيب، ابدأ بـ [[Do you know...]] أو [[Could you tell me...]] وكمّل بترتيب الجملة العادي.

[[I fixed]] vs [[I've fixed]]: لو فيه وقت (yesterday، last week، in 2024) لازم الماضي البسيط. لو مفيش وقت والمهم النتيجة ([[I've fixed it, you can test now]]) الـ present perfect. وفي الأمريكي الكلام بيستخدم الماضي البسيط في الحالتين كتير، فلو اتلخبطت، [[I fixed it]] أأمن.

[[will]] vs [[going to]]: [[I'll]] لقرار دلوقتي ([[I'll check it now]])، و [[going to]] لخطة ([[I'm going to refactor it next sprint]]). محدش هيوقف عند الفرق، الاتنين مفهومين.`,
            when: "كل سؤال في كل مكالمة، والـ standup (الأزمنة)، وقصص الانترفيو (ماضي بسيط).",
            mistakes: R`[[Yesterday I fix]]. و [[I am work]]. و [[I have fixed it yesterday]] (مع yesterday لازم [[fixed]]). و [[What you mean?]]. و [[Why it doesn't work?]] (الصح [[Why doesn't it work?]]). و [[Do you know where is the config?]] (في غير المباشر الترتيب عادي: [[where the config is]]).`
          },
          teach: R`## الفكرة: ٥ أزمنة كفاية، وفعل مساعد قبل الفاعل في السؤال

المثال جزئين: ٥ سطور أزمنة، وبعدين ٥ أسئلة غلط وصح، وفي الآخر الأسئلة غير المباشرة.

---

## ١. الأزمنة الخمسة (أول ٥ سطور)

| السطر | الزمن | الشكل | إمتى |
|---|---|---|---|
| [[I usually work on the backend.]] | present simple | فعل عادي | عادة / دايمًا |
| [[I'm working on the login page this week.]] | present continuous | am/is/are + ing | دلوقتي / الفترة دي |
| [[I fixed the bug yesterday.]] | past simple | فعل ماضي | خلص + وقت معروف |
| [[I've fixed the bug, so you can test it.]] | present perfect | have + past participle | خلص + النتيجة مهمة دلوقتي |
| [[I'll push it after lunch.]] / [[I'm going to refactor it next sprint.]] | future | will / going to | مستقبل |

الفرق بين [[I fixed]] و [[I've fixed]]: لو فيه وقت ([[yesterday]]) لازم [[fixed]]. لو مفيش وقت والمهم «تقدر تختبر دلوقتي»، [[I've fixed]]. ولو اتلخبطت، [[I fixed it]] أأمن في الكلام. و [[I'll]] لقرار دلوقتي، و [[going to]] لخطة.

## ٢. ترتيب السؤال (السطر ٦ لـ ١٠)

القاعدة: كلمة السؤال + **فعل مساعد** + الفاعل + الفعل.

| الغلط | الصح | الفعل المساعد |
|---|---|---|
| [[What you mean?]] | [[What do you mean?]] | do |
| [[Why it fails?]] | [[Why does it fail?]] | does (والفعل من غير s) |
| [[Where the config is?]] | [[Where is the config?]] | is اتقدّم |
| [[How I can run it?]] | [[How can I run it?]] | can اتقدّم |
| [[You tested it?]] | [[Did you test it?]] | did (والفعل من غير ed) |

[[You tested it?]] بتتقال في الكلام السريع بنبرة استغراب، بس كسؤال عادي [[Did you test it?]].

## ٣. السؤال غير المباشر (آخر سطر)

~~~text Indirect
Do you know where the config is?   Could you tell me why it fails?
~~~

هنا الترتيب **بيرجع عادي**: [[where the config is]] مش [[where is the config]]، و [[why it fails]] مش [[why does it fail]]. ودي حيلة: لو مش متأكد من الترتيب، ابدأ بـ [[Do you know...]] أو [[Could you tell me...]] وكمّل بترتيب الجملة العادي. وكمان ألطف.

---

## الخلاصة

| عايز | قول |
|---|---|
| امبارح | [[I fixed]] |
| دلوقتي | [[I'm working on]] |
| خلص والنتيجة مهمة | [[I've fixed]] |
| سؤال مباشر | [[What do you mean?]] (فعل مساعد قبل الفاعل) |
| سؤال مؤدب | [[Do you know where it is?]] (ترتيب عادي) |`,
          lines: [
            R`عادة: usually + present simple.`,
            R`دلوقتي / الفترة دي: am/is/are + ing.`,
            R`خلص + وقت محدد: ماضي بسيط.`,
            R`خلص + النتيجة مهمة دلوقتي: have + past participle.`,
            R`المستقبل: I'll لقرار دلوقتي، و going to لخطة.`,
            R`What do you mean: do قبل you.`,
            R`Why does it fail: does قبل it، والفعل من غير s.`,
            R`Where is the config: is قبل الفاعل.`,
            R`How can I run it: can قبل I.`,
            R`Did you test it: did في الأول، والفعل من غير ed.`,
            R`السؤال غير المباشر: ابدأ بـ Do you know أو Could you tell me، وكمّل بترتيب الجملة العادي.`
          ],
          sol: R`٦ أسئلة صح:
[[How do I run the project locally?]]
[[Where are the environment variables stored?]]
[[Which branch should I use for new features?]]
[[Who reviews the PRs on this team?]] (هنا [[who]] هو الفاعل فمفيش do)
[[How often do we deploy?]]
[[Is there a staging environment?]]

غير مباشر: [[Do you know where the environment variables are stored?]] و [[Could you tell me how often we deploy?]] (لاحظ [[we deploy]] مش [[do we deploy]]).

لو كتبت [[Who does review the PRs?]] فده غلط شائع: لما [[who]] أو [[what]] يكون هو الفاعل، مفيش فعل مساعد: [[Who reviews]] و [[What happened?]] (مش [[What did happen?]]).`
        }
      ]
    },
    {
      t: "مكالمات الفيديو والـ screen share",
      l: 2,
      n: "you're on mute و can you hear me، وتشارك شاشتك وتشاور على حاجة، ولما النت يقطع أو تدخل متأخر أو تمشي بدري",
      items: [
        {
          cmd: "you're on mute",
          title: "«You're on mute» و «Can you hear me?»: جمل المكالمة من أولها لآخرها",
          desc: R`كل مكالمة Zoom أو Google Meet أو Teams فيها نفس الـ ١٠ مواقف: حد بيتكلم وهو mute، وحد صوته واطي، وحد مش سامع، وصدى، وحد عايز يتكلم، ونهاية المكالمة. ولو الجمل دي جاهزة في دماغك، أول دقيقة في أي مكالمة هتعدّي من غير توتر.

أهم ٥: [[Can you hear me?]] (أول ما تدخل)، و [[You're on mute.]] (لحد بيتكلم ومحدش سامعه)، و [[Sorry, I was on mute.]] (لما تكون انت)، و [[You're breaking up.]] (صوته بيقطع)، و [[I'll drop off now, thanks everyone.]] (وانت خارج).

وفيه مواقف بتتقال بجمل ثابتة محدش بيغيّرها، فاحفظها زي ما هي: [[Go ahead]] (اتفضل اتكلم)، و [[Sorry, go ahead]] (لما اتنين يتكلموا مع بعض)، و [[You first]]، و [[Let's give it a minute for others to join]].`,
          example: R`Can you hear me OK?
Yes, I can hear you. / Sorry, I can't hear you. Could you check your mic?
You're on mute.
Sorry, I was on mute. As I was saying, the build is green now.
You're breaking up a little. Could you repeat that?
There's an echo. I think someone's mic is on; could everyone else mute?
Your voice is a bit low. Could you move closer to the mic?
Sorry, go ahead. / No, you go first.
Let's give it a minute for others to join.
I have a hard stop at 4, so I'll need to drop off then.
I'll drop off now. Thanks, everyone!`,
          try: R`افتح Google Meet لوحدك (ابدأ اجتماع وادخله من الموبايل واللابتوب مع بعض) وقول كل جملة بصوت عالي في مكانها: اعمل mute واتكلم وبعدين قول [[Sorry, I was on mute]]، وهكذا. وبعدين اكتب في [[phrases.md]] أهم ٥ جمل ليك، وحطهم في sticky note جنب الشاشة أول أسبوعين.`,
          flag: "script",
          deep: {
            why: R`المواقف دي بتحصل في أول دقيقة من كل مكالمة تقريبًا، ولو اتلخبطت فيها، التوتر بيكمّل معاك باقي الاجتماع. والجمل ثابتة جدًا، يعني ٣٠ دقيقة تدريب بتحل المشكلة للأبد.`,
            how: R`[[hard stop]] = لازم أمشي في الميعاد ده بالظبط (عندي حاجة بعدها). قولها في أول المكالمة مش في آخرها: [[Just so you know, I have a hard stop at 4.]]

[[breaking up]] = صوتك بيقطع (للنت). [[cut out]] = قطع ثانية. [[frozen]] = الصورة واقفة: [[You're frozen]]. [[lag]] = تأخير: [[There's a bit of a lag.]]

لما اتنين يتكلموا في نفس الوقت (بيحصل كتير مع الـ lag): [[Sorry, go ahead]] أو [[After you]]. ولو انت كنت عايز تقول حاجة مهمة: [[Sorry, just one quick thing...]].

في الآخر: [[Thanks, everyone. Talk soon.]] أو [[Have a good one!]] أو [[Have a great weekend!]] (يوم الخميس أو الجمعة حسب فريقك). و [[I'll drop off]] أو [[I'll hop off]] = هخرج من المكالمة.`,
            when: "أول وآخر دقيقة في كل مكالمة، وأي مشكلة صوت.",
            mistakes: R`[[Open your mic]] (الصح [[unmute]]). و [[I can't hear you good]]. و [[Your voice is cutting]] (الصح [[You're breaking up]] أو [[Your audio is cutting out]]). و [[I will go now bye]] فجأة من غير شكر. وتفضل تتكلم ٢ دقيقة وانت mute ومحدش يقولك: لما تبدأ تتكلم، بص على أيقونة المايك.`
          },
          teach: R`## الفكرة: المكالمة ليها «سكريبت» ثابت من أولها لآخرها

المثال ١١ جملة مترتبين زي المكالمة: الدخول، ومشاكل الصوت، والكلام في نفس الوقت، والخروج. الجمل دي محدش بيغيّرها، فاحفظها زي ما هي.

---

## ١. الدخول (أول سطرين)

| الجملة | معناها | ملاحظة |
|---|---|---|
| [[Can you hear me OK?]] | سامعني كويس؟ | [[OK]] مش [[good]] |
| [[Yes, I can hear you.]] | آه سامعك | |
| [[Sorry, I can't hear you. Could you check your mic?]] | مش سامعك، شوف المايك | [[can't]] «كانْت» (أمريكي «كانْت» بفتحة قصيرة) |

## ٢. الـ mute (السطر ٣ و ٤)

[[You're on mute.]] = انت عامل mute (لحد بيتكلم ومحدش سامعه). لاحظ [[on mute]] بـ [[on]].

[[Sorry, I was on mute. As I was saying, the build is green now.]]: [[As I was saying]] = زي ما كنت بقول، بترجع بيها للكلام من غير ما تعيد كله. و [[the build is green]] = الـ CI عدّى.

## ٣. مشاكل الصوت (السطر ٥ و ٦ و ٧)

| المشكلة | الجملة | الكلمة المفتاحية |
|---|---|---|
| صوته بيقطع | [[You're breaking up a little. Could you repeat that?]] | [[breaking up]] = بيتقطع |
| صدى | [[There's an echo. I think someone's mic is on; could everyone else mute?]] | [[echo]] «إيكو» |
| صوته واطي | [[Your voice is a bit low. Could you move closer to the mic?]] | [[a bit]] بتليّن الطلب |

[[mic]] بتتقال «مايك» (اختصار microphone).

## ٤. اتنين بيتكلموا مع بعض (السطر ٨)

[[Sorry, go ahead.]] = آسف، اتفضل. و [[No, you go first.]] = لا، انت الأول. ده بيحصل كتير مع الـ lag، ومتكمّلش فوق كلامه.

## ٥. الانتظار والخروج (آخر ٣ سطور)

[[Let's give it a minute for others to join.]] = نستنى دقيقة لحد ما الباقي يدخل.

[[I have a hard stop at 4, so I'll need to drop off then.]]: [[hard stop]] = ميعاد لازم أمشي فيه بالظبط. قولها في **أول** المكالمة. و [[drop off]] = أخرج من المكالمة.

[[I'll drop off now. Thanks, everyone!]] = هخرج دلوقتي، شكرًا يا جماعة. أحسن من إنك تختفي.

---

## الخلاصة

| الموقف | الجملة |
|---|---|
| أول ما تدخل | [[Can you hear me OK?]] |
| حد mute | [[You're on mute.]] |
| انت كنت mute | [[Sorry, I was on mute.]] |
| الصوت بيقطع | [[You're breaking up.]] |
| اتنين اتكلموا | [[Sorry, go ahead.]] |
| خارج | [[I'll drop off now. Thanks, everyone!]] |

والغلط المصري: [[open your mic]] (الصح [[unmute]])، و [[your voice is cutting]] (الصح [[you're breaking up]]).`,
          lines: [
            R`«سامعني كويس؟» أول جملة لما تدخل.`,
            R`«آه سامعك» أو «مش سامعك، ممكن تشوف المايك؟»`,
            R`«انت على mute». بتقولها لحد بيتكلم ومحدش سامعه.`,
            R`«آسف، كنت mute. زي ما كنت بقول، الـ build بقى أخضر». As I was saying = نرجع للي كنت بقوله.`,
            R`«صوتك بيقطع شوية، ممكن تعيد؟» breaking up = بيقطع.`,
            R`«فيه صدى. أظن مايك حد مفتوح؛ ممكن الباقي يعمل mute؟»`,
            R`«صوتك واطي شوية، ممكن تقرّب من المايك؟»`,
            R`لما اتنين يتكلموا مع بعض: «آسف، اتفضل» أو «لا، انت الأول».`,
            R`«نستنى دقيقة لحد ما الباقي يدخل».`,
            R`«لازم أمشي الساعة ٤ بالظبط، فهخرج ساعتها». hard stop = ميعاد مقفول.`,
            R`«هخرج دلوقتي. شكرًا يا جماعة!» drop off = أخرج من المكالمة.`
          ],
          sol: R`لو عملت التمرين صح، المفروض تكون قلت كل جملة مرة على الأقل في موقفها الحقيقي (mute حقيقي، صدى حقيقي لو الجهازين جنب بعض). ده أهم من الحفظ: المخ بيربط الجملة بالموقف.

أهم ٥ للـ sticky note (لو هتختار):
[[Can you hear me OK?]]
[[Sorry, I was on mute.]]
[[You're breaking up. Could you repeat that?]]
[[Sorry, go ahead.]]
[[I'll drop off now. Thanks, everyone!]]

لو حاسس إنك مش محتاج الورقة بعد أسبوع، شيلها. ولو لسه بتبص عليها، سيبها: ده مش غش، ده نفس فكرة الـ cheat sheet اللي المبرمجين بيستخدموها لأي أداة جديدة.`
        },
        {
          cmd: "can you see my screen",
          title: "تشارك شاشتك وتشاور: «Can you see my screen?» و «Let me zoom in»",
          desc: R`الـ screen share هو نص الشغل التقني في المكالمات: تشرح كود، أو bug، أو تعمل demo، أو حد بيساعدك. والمشكلة إنك بتعمل حاجتين مع بعض: بتحرّك الماوس، وبتتكلم إنجليزي. فالجمل لازم تبقى أوتوماتيك.

البداية: [[Let me share my screen.]] وبعدين [[Can you see my screen?]] أو [[Can everyone see my screen?]]. ولو شاركت الشاشة الغلط: [[Oops, wrong window. One sec.]]

التشاور: [[As you can see here...]]، و [[If you look at line 42...]]، و [[This part here...]] (والماوس على الحتة)، و [[On the left / on the right / at the top / at the bottom]]، و [[Let me zoom in.]] (الخط صغير: دايمًا كبّر الخط في VS Code قبل ما تشارك).

النهاية: [[I'll stop sharing now.]] أو [[Let me stop sharing.]]`,
          example: R`Let me share my screen. Can you see it?
Can you see my VS Code, or is it still showing the browser?
Oops, wrong window. One second.
Is the font big enough? Let me zoom in.
As you can see here, the request fails with a 401.
If you look at line 42, we never await this promise.
This part on the left is the request, and on the right is the response.
Let me scroll down a bit. OK, here.
Could you share your screen? It'll be easier to see the error.
I'll stop sharing now.`,
          try: R`اعمل فيديو ٢ دقيقة بـ OBS أو Loom أو حتى Zoom recording لنفسك، بتشارك فيه شاشتك وتشرح ملف كود من مشروعك. استخدم ٥ جمل على الأقل من المثال. وبعدين اتفرج على الفيديو: كام مرة سكتّ وانت بتدوّر على حاجة؟ الماوس كان بيشاور على اللي بتقوله؟`,
          flag: "script",
          deep: {
            why: R`في الـ remote، الـ screen share هو الـ «تعالى اقعد جنبي» بتاع المكتب. ولو إنت سلس فيه، الناس هتحب تشتغل معاك pair، ودي أسرع طريقة تتعلم بيها. وفي الانترفيو، الـ live coding كله screen share.`,
            how: R`قبل ما تشارك: اقفل الإشعارات (Slack والواتساب)، واقفل التابات اللي فيها حاجة شخصية، وكبّر الخط في VS Code ([[Ctrl + =]]) والمتصفح. وشارك نافذة واحدة بدل الشاشة كلها لو ممكن.

وانت بتشارك: اتكلم قبل ما تحرك الماوس: [[I'm going to open the user service now]] وبعدين افتح. كده الناس بتلحقك. والسكوت وانت بتدوّر: [[Let me find it... one sec... here it is.]] أحسن من صمت ١٠ ثواني.

كلمات الأماكن: [[at the top]]، و [[at the bottom]]، و [[on the left / right]]، و [[in the sidebar]]، و [[in the terminal]]، و [[in the console]]، و [[in the Network tab]]، و [[line 42]]، و [[this function here]]. وأفعال: [[scroll up / down]]، و [[click on]]، و [[hover over]]، و [[open]]، و [[switch to]] (تنقل لنافذة تانية).

لو حد تاني بيشارك وعايز يشاور على حاجة: [[Could you scroll up a bit?]]، و [[Could you go back to the previous file?]]، و [[Could you zoom in? It's a bit small on my side.]]`,
            when: "شرح bug لزميل، و code walkthrough، و demo، و live coding، و pair programming.",
            mistakes: R`تشارك الشاشة كلها وعليها إشعار واتساب شخصي. وخط صغير جدًا ([[Can you zoom in?]] أول تعليق هتسمعه). و [[Do you see my screen?]] (مقبولة، بس [[Can you see]] أشهر). وتحرك الماوس بسرعة وتقول [[here... and here... and here]] من غير ما تقول إيه اللي هناك. وتنسى تعمل [[stop sharing]].`
          },
          teach: R`## الفكرة: اتكلم قبل ما تحرّك الماوس

المثال ١٠ جمل بترتيب الـ screen share: تبدأ، وتتأكد إنهم شايفين، وتشاور، وتطلب من غيرك يشارك، وتقفل.

---

## ١. البداية (أول ٤ سطور)

| الجملة | معناها | ليه |
|---|---|---|
| [[Let me share my screen. Can you see it?]] | خليني أشارك. شايفينها؟ | دايمًا اسأل |
| [[Can you see my VS Code, or is it still showing the browser?]] | شايفين VS Code ولا لسه المتصفح؟ | لو غيّرت نافذة |
| [[Oops, wrong window. One second.]] | نافذة غلط، ثانية | بتحصل للكل |
| [[Is the font big enough? Let me zoom in.]] | الخط كبير كفاية؟ هكبّر | [[zoom in]] = كبّر |

[[Let me]] = خليني، وبعدها الفعل على طول من غير to. و [[One second]] أو [[One sec]] = ثانية.

## ٢. التشاور (السطر ٥ لـ ٨)

| الجملة | الأداة اللغوية |
|---|---|
| [[As you can see here, the request fails with a 401.]] | [[As you can see]] = زي ما انتوا شايفين. و [[401]] = four oh one |
| [[If you look at line 42, we never await this promise.]] | [[If you look at line...]] = مكان محدد |
| [[This part on the left is the request, and on the right is the response.]] | [[on the left]] و [[on the right]] |
| [[Let me scroll down a bit. OK, here.]] | [[scroll down]] = انزل |

القاعدة: اسم الحاجة + مكانها. مش [[here... and here... and this]]. [[line 42]] = «لاين فورتي-تو».

## ٣. تطلب من غيرك (السطر ٩)

[[Could you share your screen? It'll be easier to see the error.]]: الطلب + السبب. و [[It'll]] = It will.

وجمل لما حد تاني بيشارك: [[Could you scroll up a bit?]] و [[Could you zoom in? It's a bit small on my side.]] ([[on my side]] = عندي).

## ٤. القفلة (آخر سطر)

[[I'll stop sharing now.]] = هوقف المشاركة. متنساهاش.

---

## الخلاصة

- قبل المشاركة: كبّر الخط واقفل الإشعارات.
- أثناءها: قول قبل ما تدوس ([[Now I'll open the routes file]])، وسمّي المكان ([[line 42]]، [[on the left]]).
- لو بتدوّر: [[Let me find it... one sec]] أحسن من صمت.`,
          lines: [
            R`«خليني أشارك شاشتي. شايفينها؟»`,
            R`«شايفين الـ VS Code ولا لسه ظاهر المتصفح؟»`,
            R`«أوبس، نافذة غلط. ثانية واحدة».`,
            R`«الخط كبير كفاية؟ خليني أكبّر». zoom in = تكبير.`,
            R`«زي ما انتوا شايفين هنا، الـ request بيفشل بـ 401».`,
            R`«لو بصيتوا على سطر ٤٢، إحنا مش بنعمل await للـ promise دي».`,
            R`«الجزء اللي على الشمال ده الـ request، واللي على اليمين الـ response».`,
            R`«خليني أنزل شوية. أيوه، هنا».`,
            R`«ممكن تشارك شاشتك؟ هيبقى أسهل نشوف الخطأ».`,
            R`«هوقف المشاركة دلوقتي».`
          ],
          sol: R`الفيديو الكويس:
١) بيبدأ بجملة بتقول هتشرح إيه: [[I'm going to walk you through the auth middleware in my project.]]
٢) الخط كبير ومقروء.
٣) قبل كل حركة جملة: [[Now I'll open the routes file.]]
٤) الماوس بيشاور على اللي بيتقال: [[This line here checks the token.]]
٥) بيخلص بـ [[That's it. I'll stop sharing now.]]

المتوقع في أول فيديو: ٢–٤ فترات سكوت وانت بتدوّر على ملف. الحل: [[Let me find it... one sec]]، وجهّز الملفات مفتوحة في tabs قبل ما تبدأ. والفيديو الضعيف: كله [[here]] و [[this]] من غير أسماء، فاللي بيتفرج مش عارف انت فين.`
        },
        {
          cmd: "النت قطع",
          title: "النت قطع، واتأخرت، ومحتاج تمشي بدري: جمل الطوارئ",
          desc: R`في مصر النت والكهربا مش مضمونين ١٠٠٪، وده بيحصل للكل. المهم إزاي تتعامل معاه باحترافية: تبلّغ بسرعة، ومن غير اعتذار طويل، وتقول الحل.

قبل المكالمة لو متوقع مشكلة: [[Heads-up: my internet is a bit unstable today, so I might keep my camera off.]] (heads-up = تنبيه مسبق).

لو وقعت ورجعت: [[Sorry, I got disconnected. What did I miss?]] أو [[Sorry about that, my connection dropped. Where were we?]]. ولو مش قادر ترجع: ابعت في الشات أو Slack على طول: [[My internet is down. I'll join from my phone in 2 minutes.]]

التأخير: ابعت قبل الميعاد مش بعده: [[Running 5 minutes late, sorry! Please start without me.]]. والمشي بدري: قوله في الأول: [[I need to leave 10 minutes early today.]]`,
          example: R`Heads-up: my internet is a bit unstable today, so I'll keep my camera off.
Sorry, I got disconnected. What did I miss?
Sorry about that, my connection dropped. Where were we?
I think I lost you for a second. Could you repeat the last part?
My internet is down. I'll join from my phone in two minutes.
There's a power cut in my area. I'll be back online in about 30 minutes.
Running five minutes late, sorry! Please start without me.
Sorry I'm late. Please don't let me interrupt; I'll catch up.
I need to leave ten minutes early today, so could we cover my part first?`,
          try: R`اكتب ٣ رسايل Slack جاهزة وحطها في Notes على الموبايل (عشان لو النت وقع تبعتها من الموبايل): (١) النت وقع وهتدخل من الموبايل. (٢) الكهربا قطعت ومش عارف هترجع إمتى. (٣) متأخر ١٠ دقايق. وبعدين قول بصوت عالي جملة [[Sorry, I got disconnected. What did I miss?]] بـ ٣ نبرات: مرتبك، وعادي، وواثق. خلّي الأخيرة هي نبرتك.`,
          flag: "script",
          deep: {
            why: R`اللي بيختفي من مكالمة من غير ما يقول، أو بيرجع ويعتذر دقيقتين، بيبان مش محترف. واللي بيبعت سطر في الشات ويرجع ويقول [[What did I miss?]] ويكمل عادي، محدش بيفتكر إنه وقع أصلًا. والشركات اللي بتوظف من مصر عارفة إن الموضوع ده بيحصل؛ اللي بيفرق إزاي بتتعامل معاه.`,
            how: R`[[What did I miss?]] = فاتني إيه؟ و [[Where were we?]] = كنا فين؟ و [[I'll catch up]] = هلحق/هفهم لوحدي بعدين (من الـ notes أو التسجيل).

تجهيزات: خلي الموبايل فيه تطبيق Zoom/Meet/Teams متسجّل دخول، وباقة نت احتياطي، وشاحن. ولو الكهربا بتقطع في منطقتك في مواعيد معروفة، ده سبب كويس تطلب مواعيد اجتماعات مناسبة: [[Could we move the standup 30 minutes earlier? There are scheduled power cuts in my area at that time.]]

الاعتذار: جملة واحدة ([[Sorry about that]]) وبعدين كمّل. متحكيش القصة كلها.

ولو فاتك جزء مهم وانت مكسوف تطلب إعادة: [[Is there a recording, or could someone share the notes?]]`,
            when: "أي مشكلة نت أو كهربا أو تأخير. جهّز الرسايل من قبلها.",
            mistakes: R`تختفي من غير رسالة. و [[Sorry sorry sorry, the internet in Egypt is very bad...]] وقصة طويلة. و [[The electricity is cut]] (الأوضح [[There's a power cut]] أو [[power outage]]). و [[I'm late 5 minutes]] (الصح [[I'm running 5 minutes late]] أو [[I'll be 5 minutes late]]). وتقول إنك هتمشي بدري في آخر الاجتماع بدل أوله.`
          },
          teach: R`## الفكرة: بلّغ في جملة، واعتذر في كلمة، وقول الحل

المثال ٩ جمل لـ ٤ مواقف: قبل المكالمة، ولما تقع وترجع، ولما متقدرش ترجع، والتأخير والمشي بدري.

---

## ١. قبل المكالمة (السطر الأول)

~~~text 1
Heads-up: my internet is a bit unstable today, so I'll keep my camera off.
~~~

[[Heads-up]] = تنبيه مسبق. و [[unstable]] «أن-**ستيْ**-بل» (من غير «إ»). و [[keep my camera off]] = هسيب الكاميرا مقفولة.

## ٢. وقعت ورجعت (السطر ٢ و ٣ و ٤)

| الجملة | معناها |
|---|---|
| [[Sorry, I got disconnected. What did I miss?]] | اتقطعت. فاتني إيه؟ |
| [[Sorry about that, my connection dropped. Where were we?]] | آسف، النت وقع. كنا فين؟ |
| [[I think I lost you for a second. Could you repeat the last part?]] | (لو هو اللي قطع) فقدتك ثانية |

[[got disconnected]] = «گوت دِس-كَ-**نِك**-تِد». و [[What did I miss?]] و [[Where were we?]] جمل جاهزة بترجعك للكلام من غير قصة.

## ٣. مش قادر ترجع (السطر ٥ و ٦)

[[My internet is down. I'll join from my phone in two minutes.]]: [[down]] = واقع. و [[There's a power cut in my area. I'll be back online in about 30 minutes.]]: [[power cut]] = قطع كهربا (والأمريكان [[power outage]]). ابعتهم في الشات أو Slack من الموبايل.

## ٤. التأخير والمشي بدري (آخر ٣ سطور)

| الجملة | الحتة المهمة |
|---|---|
| [[Running five minutes late, sorry! Please start without me.]] | [[running late]] = متأخر. ابعتها **قبل** الميعاد |
| [[Sorry I'm late. Please don't let me interrupt; I'll catch up.]] | [[catch up]] = ألحق لوحدي |
| [[I need to leave ten minutes early today, so could we cover my part first?]] | [[cover]] = نتكلم في. قولها في **أول** الاجتماع |

---

## ٥. الغلطات

| الغلط | الصح |
|---|---|
| [[I'm late 5 minutes]] | [[I'm running 5 minutes late]] |
| [[The electricity is cut]] | [[There's a power cut]] |
| [[Sorry sorry, the internet in Egypt...]] وقصة | [[Sorry about that.]] وكمّل |

---

## الخلاصة

- جهّز ٣ رسايل على الموبايل: النت وقع، والكهربا قطعت، ومتأخر.
- لما ترجع: [[Sorry, I got disconnected. What did I miss?]] بنبرة عادية، وكمّل.
- اعتذار جملة واحدة. محدش هيفتكر إنك وقعت لو رجعت بهدوء.`,
          lines: [
            R`تنبيه مسبق: «النت مش مستقر النهارده، فهقفل الكاميرا». heads-up = تنبيه.`,
            R`«آسف، اتقطعت. فاتني إيه؟»`,
            R`«آسف، النت وقع. كنا فين؟»`,
            R`«أظن فقدتك ثانية. ممكن تعيد آخر جزء؟» (لو الطرف التاني اللي قطع).`,
            R`«النت واقع. هدخل من الموبايل في دقيقتين».`,
            R`«الكهربا قاطعة في منطقتي. هرجع أونلاين في حوالي نص ساعة». power cut = قطع كهربا.`,
            R`«هتأخر ٥ دقايق، آسف! ابدأوا من غيري». running late = متأخر.`,
            R`«آسف على التأخير. كملوا متوقفوش عشاني؛ هلحق». catch up = ألحق.`,
            R`«محتاج أمشي بدري ١٠ دقايق النهارده، ممكن نبدأ بالجزء بتاعي؟» cover = نغطي/نتكلم في.`
          ],
          sol: R`الرسايل الجاهزة:
(١) [[My internet just went down. Joining from my phone in 2 minutes.]]
(٢) [[Power cut in my area, not sure how long it'll take. I'll catch up from the notes and update you on Slack.]]
(٣) [[Running about 10 minutes late, sorry! Please start without me.]]

النبرة الواثقة: [[Sorry, I got disconnected. What did I miss?]] بسرعة عادية، ونبرة نازلة في [[disconnected]]، وطالعة في [[miss?]]، ومن غير ضحكة متوترة. التسجيل الضعيف: الجملة متقطعة بـ [[ehh]] أو بتبدأ بـ [[Sorry, sorry...]] مكررة.`
        }
      ]
    }
]);
