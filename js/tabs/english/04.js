// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
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
