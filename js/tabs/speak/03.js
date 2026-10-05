// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "قصص STAR بالإنجليزي: ٥ إجابات كاملة",
      l: 3,
      n: "لغة STAR (ماضي، و I مش we، وكلمات الربط)، و ٥ إجابات كاملة: اتعلمت بسرعة، و feedback صعب، و ضغط و deadline، وخلاف، وغلطة",
      items: [
        {
          cmd: "لغة STAR",
          title: "اللغة اللي بتحتاجها في أي قصة STAR: الماضي، و I، وكلمات الربط",
          desc: R`طريقة STAR (Situation, Task, Action, Result) مشروحة بالتفصيل في درس [[STAR]] في «تاب الانترفيو». هنا اللغة بس، لأن اللي إنجليزيته ضعيفة بيقع في ٣ حاجات:

١) الأزمنة: القصة كلها ماضي بسيط. [[I noticed]] و [[I decided]] و [[I talked to]]. والسياق اللي كان مستمر: [[I was working on...]] (ماضي مستمر). والدرس في الآخر: حاضر ([[Now I always...]]).

٢) [[I]] مش [[we]]: في الـ Action، الإنترفيوير عايز يعرف انت عملت إيه. [[We fixed it]] مش بتقول حاجة. [[I found the bug, and my teammate deployed the fix]] بتقول.

٣) كلمات الربط: هي اللي بتخلي القصة تمشي من غير ما تتوه. [[At the time]] (وقتها)، و [[So]]، و [[First]] و [[Then]] و [[After that]] و [[Finally]]، و [[Because of that]]، و [[In the end]]، و [[As a result]]، و [[Looking back]] (لما أبص ورا)، و [[Since then]] (من ساعتها).`,
          example: R`Situation:  At the time, I was working on a small e-commerce site for a local shop.
Situation:  A few days before launch, the client asked for a new feature.
Task:  I was the only developer, so it was my job to decide how to handle it.
Action:  First, I estimated the feature: about three days.
Action:  Then I called the client and explained the options.
Action:  After that, we agreed to launch on time and add the feature a week later.
Result:  As a result, we launched on time, and the feature went live the following week.
Lesson:  Looking back, I learned to talk about trade-offs early. Since then, I always do it in the first call.
Wrong vs right:  "We decided to delay it." → "I suggested delaying it, and the client agreed."`,
          try: R`اكتب قصة واحدة (أي موقف حقيقي من شغل أو مشروع أو الجامعة) في ٨ جمل بنفس الشكل. علّم كل فعل ماضي، وكل كلمة ربط. لو [[we]] ظهرت في الـ Action، غيّرها لـ [[I]] أو قول مين عمل إيه. وسجّلها.`,
          flag: "script",
          deep: {
            why: R`الأسئلة السلوكية ممكن تبقى ٣٠–٥٠٪ من الانترفيو، والقصة اللي لغتها متلخبطة (أزمنة غلط، و we في كل حتة، ومفيش ربط) بتخلي الإنترفيوير مش فاهم انت عملت إيه. وده بيتحسب ضدك حتى لو القصة نفسها كويسة.`,
            how: R`الأفعال الماضي اللي هتتكرر في كل القصص (اتعلمها بنطق [[-ed]] الصح): [[noticed]] و [[realized]] (أدركت) و [[decided]] و [[suggested]] و [[explained]] و [[asked]] و [[talked to]] و [[fixed]] و [[learned]] و [[improved]] و [[reduced]]. والشاذة: [[took]] و [[made]] و [[found]] و [[told]] و [[chose]] و [[wrote]] و [[built]] و [[led]] و [[spent]].

[[At the time]] + ماضي مستمر = بتفتح القصة بسهولة: [[At the time, I was working on...]].

[[Looking back]] + [[I learned]] / [[I realized]] = بتقفل بالدرس.

[[Since then]] + present perfect أو present: [[Since then, I've always...]] أو [[Since then, I always...]]. الاتنين مقبولين في الكلام.

ولو الإنترفيوير قاطعك بسؤال، جاوب واسأل [[Should I continue with the story?]].`,
            when: "أي سؤال بيبدأ بـ «Tell me about a time...» أو «Give me an example of...» أو «Have you ever...».",
            mistakes: R`[[Yesterday... I go to the client and I tell him]] (حاضر في قصة ماضي). و [[we]] طول الـ Action. و [[and then... and then... and then...]] من غير أي ربط تاني. و [[The result was good]] من غير تفاصيل. و [[I have learned from this a lot of things]] (الأبسط [[I learned a lot from this]]، والأحسن تقول حاجة واحدة محددة).`
          },
          lines: [
            R`بداية: «وقتها، كنت شغال على موقع e-commerce صغير لمحل». At the time + was working.`,
            R`«كام يوم قبل الإطلاق، العميل طلب فيتشر جديدة».`,
            R`الـ Task: «كنت الـ developer الوحيد، فكان قراري أتعامل معاها إزاي».`,
            R`الـ Action بالترتيب: «الأول، قدّرت الفيتشر: حوالي ٣ أيام».`,
            R`«بعدين كلمت العميل وشرحتله الاختيارات».`,
            R`«بعد كده، اتفقنا نطلق في المعاد ونضيف الفيتشر بعدها بأسبوع».`,
            R`النتيجة: «والنتيجة، طلقنا في المعاد، والفيتشر نزلت الأسبوع اللي بعده».`,
            R`الدرس: «لما أبص ورا، اتعلمت أتكلم عن الـ trade-offs بدري. ومن ساعتها بعملها في أول مكالمة».`,
            R`غلط وصح: «We decided» مش بتقول انت عملت إيه. «I suggested..., and the client agreed» بتقول.`
          ],
          sol: R`مثال لقصة من الجامعة:
[[At the time, I was leading a team of four for our graduation project.]] [[Two months before the deadline, one member stopped responding.]] [[I was the team lead, so I had to solve it.]] [[First, I called him and found out he had family problems.]] [[Then I split his tasks between me and another member.]] [[After that, I set up a short weekly call to track progress.]] [[As a result, we delivered on time and got an A.]] [[Looking back, I learned to check in with people early. Since then, I always set up regular check-ins.]]

الأفعال الماضي: [[was leading]]، و [[stopped]]، و [[had to]]، و [[called]]، و [[found out]]، و [[split]]، و [[set up]]، و [[delivered]]، و [[got]]، و [[learned]]. الربط: [[At the time]]، و [[First]]، و [[Then]]، و [[After that]]، و [[As a result]]، و [[Looking back]]، و [[Since then]].

ولو القصة فيها [[we]] في الـ Action (زي [[we delivered]] في الـ Result)، ده مقبول في النتيجة، مش في الخطوات.`
        },
        {
          cmd: "STAR: اتعلمت بسرعة",
          title: "«Tell me about a time you had to learn something quickly»: إجابة كاملة",
          desc: R`سؤال مفضّل للـ juniors، لأن الشركة عارفة إنك مش هتعرف كل حاجة، وعايزة تعرف: بتتعلم إزاي؟ لما تقابل حاجة جديدة بتعمل إيه؟

الإجابة الكويسة بتوري «طريقة» مش «معجزة». مش [[I learned Docker in one day]] وخلاص. لكن: قسّمت الموضوع، وبدأت بالـ docs الرسمية، وعملت مثال صغير، وسألت حد، وطبّقت على الحاجة الحقيقية، والنتيجة. والقصة دي أحسن لو فيها حاجة جديدة فعلًا عليك (أداة، أو لغة، أو domain) وضغط وقت حقيقي.`,
          example: R`S: In my last freelance project, the client suddenly needed online payments with Stripe, and I had never used it.
T: I had one week to add it before their launch.
A: First, I read the official Stripe docs and followed their quick start in a separate test project.
A: Then I built the smallest version: one product, one checkout, test mode only.
A: The hardest part was webhooks, so I watched a talk about them and asked a question in their developer Discord.
A: After that, I added it to the real project and wrote a checklist of test cards to try every case.
R: We launched on time, and in the first month there were about 150 payments with no failed orders.
Lesson: Now, when I learn a new tool, I always build a tiny version first, outside the real project.`,
          try: R`فكّر في حاجة اتعلمتها بسرعة لسبب حقيقي (أداة، أو لغة، أو مادة في الجامعة، أو شغل). اكتبها في ٨ جمل بنفس الشكل، وركّز إن الـ Action فيه «خطوات تعلّم» (docs، و مثال صغير، و سؤال، و تطبيق). سجّلها في أقل من دقيقتين.`,
          flag: "script",
          deep: {
            why: R`الـ junior متقيّم على «هيتعلم بسرعة ولا لأ» أكتر من «يعرف إيه النهارده». والقصة دي بتوري طريقة التعلم بتاعتك، ودي بتتنقل لأي حاجة الشركة هتحتاجها.`,
            how: R`عبارات التعلم: [[I had never used X before]]، و [[I started with the official docs]]، و [[I followed the quick start]]، و [[I built a small prototype]]، و [[I asked on ...]]، و [[I compared a few options]]، و [[I took notes]]، و [[I applied it to the real project]].

الـ Result: رقم أو حقيقة (اتسلم في المعاد، وعدد اليوزرز، ومفيش أخطاء).

الـ Lesson: عادة بقت عندك: [[Now I always...]].

follow-ups متوقعة: [[What resources did you use?]] (قول أسماء حقيقية: docs رسمية، و talk، و course)، و [[How did you know you understood it well enough?]] ([[I tested every case in the checklist]])، و [[What would you do if you had even less time?]].`,
            when: "«Tell me about a time you learned something new»، و «How do you learn new technologies?»، و «What did you learn recently?».",
            mistakes: R`[[I learned it from YouTube]] وبس (مفيش طريقة). و [[I'm a fast learner]] من غير قصة. وتختار حاجة سهلة جدًا (HTML في أسبوع). و [[I have never used it before]] في قصة ماضي (الصح [[I had never used it]] لأنها قبل الماضي، ولو اتلخبطت [[I didn't know it at the time]] أسهل).`
          },
          lines: [
            R`الـ S: «في آخر مشروع فريلانس، العميل فجأة احتاج دفع أونلاين بـ Stripe، وأنا عمري ما استخدمته». had never used = ماضي الماضي.`,
            R`الـ T: «كان عندي أسبوع أضيفه قبل الإطلاق».`,
            R`الـ A1: «الأول قريت الـ docs الرسمية ومشيت على الـ quick start في مشروع تجريبي منفصل».`,
            R`الـ A2: «بعدين عملت أصغر نسخة: منتج واحد، و checkout واحد، test mode بس».`,
            R`الـ A3: «أصعب حاجة كانت الـ webhooks، فاتفرجت على talk عنها وسألت في الـ Discord بتاعهم».`,
            R`الـ A4: «بعد كده ضفته للمشروع الحقيقي وكتبت checklist بكروت اختبار لكل حالة».`,
            R`الـ R: «طلقنا في المعاد، وأول شهر كان فيه حوالي ١٥٠ دفعة من غير ولا أوردر فاشل».`,
            R`الدرس: «دلوقتي لما أتعلم أداة جديدة، دايمًا بعمل نسخة صغيرة الأول برا المشروع الحقيقي».`
          ],
          sol: R`مثال من الجامعة:
[[S: In my third year, I joined a hackathon, and our team decided to build a mobile app with Flutter. I had never used Flutter or Dart.]] [[T: I was responsible for the UI, and we had 48 hours.]] [[A: First, I spent two hours on the official Flutter codelab. Then I built one screen with fake data, to learn the layout widgets. When I got stuck on state management, I asked a mentor at the event instead of searching for an hour. After that, I built the four real screens.]] [[R: We finished the demo on time and won second place.]] [[Lesson: Since then, I always start with the official tutorial and one small screen before the real work.]]

راجع: الـ Action فيه ٣ خطوات تعلم على الأقل؟ فيه [[had never]] أو [[didn't know]]؟ فيه نتيجة محددة؟ الإجابة الضعيفة: [[I watched tutorials and learned it fast.]]`
        },
        {
          cmd: "STAR: feedback صعب",
          title: "«Tell me about a time you received critical feedback»: إجابة كاملة",
          desc: R`الإنترفيوير عايز يعرف: لما حد بينتقدك، بتدافع ولا بتسمع؟ وبتتغير فعلًا ولا بتقول «حاضر» وخلاص؟ والـ junior بالذات هياخد feedback كتير، فده مهم جدًا للشركة.

القصة الكويسة فيها: feedback حقيقي (مش «قالولي إني بشتغل كتير زيادة»)، ورد فعلك الأول (عادي تقول إنه كان صعب)، وإيه اللي عملته بعدها بالظبط، ودليل إنك اتغيرت. وآخرها إحساس إيجابي ناحية اللي انتقدك.`,
          example: R`S: In my first month at my internship, a senior developer reviewed my PR and left about 30 comments.
S: He said my PR was too big to review, and my functions were doing too many things.
T: Honestly, it was hard to hear at first, but I knew he was right, and I wanted to improve.
A: First, I thanked him and asked him to show me one example of how he would split a function.
A: Then I split my PR into three smaller ones, and I started keeping my PRs under 300 lines.
A: I also started reviewing my own diff before asking for a review, with a short checklist.
R: Two months later, my PRs were usually approved after one round, and he asked me to review a new intern's code.
Lesson: I learned that feedback on my code isn't feedback on me. Now I ask for it early, not only at the end.`,
          try: R`فكّر في feedback حقيقي اتقالك (كود، أو presentation، أو شغل، أو حتى من دكتور في الجامعة). اكتب قصتك في ٨ جمل، ولازم تحتوي على: رد فعلك الأول بصدق، وخطوتين عملتهم بعدها، ودليل إنك اتغيرت. سجّلها.`,
          flag: "script",
          deep: {
            why: R`الشركات بتخاف من الـ junior اللي بياخد النقد على شخصه، لأنه بيبطّأ الفريق كله. والقصة دي بتطمنهم. وفيه ميزة: القصة الكويسة هنا ممكن تكون بسيطة جدًا (code review)، مش محتاجة موقف درامي.`,
            how: R`عبارات رد الفعل الأول: [[Honestly, it was hard to hear at first]]، و [[My first reaction was to defend my code, but...]]، و [[I was surprised, but...]]. الصدق هنا بيخلي القصة مصدقة.

عبارات الخطوات: [[I asked for an example]]، و [[I asked what "good" looks like]]، و [[I made a checklist]]، و [[I started ...ing]]، و [[I asked him to review it again]].

الدليل: [[Two months later, ...]]، و [[He later asked me to ...]]، و [[My next performance review mentioned ...]].

الدرس: [[Feedback on my code isn't feedback on me]]، و [[Now I ask for feedback early]].

follow-ups: [[Did you ever disagree with feedback?]] → [[Yes, once. I asked questions to understand, and in the end we found a middle ground / I explained my reason with data.]]`,
            when: "«Tell me about a time you received feedback»، و «How do you handle criticism?»، و «What's the most useful feedback you've received?».",
            mistakes: R`feedback مزيف ([[They said I'm a perfectionist]]). وتلوم اللي انتقدك ([[He was very harsh]]). ومفيش تغيير حقيقي ([[I said OK and continued]]). و [[He gave me a feedback]] (الصح [[He gave me feedback]] أو [[some feedback]] من غير a: درس [[informations و a feedback]] في «تاب إنجليزي للمبرمج: قراية وكتابة»).`
          },
          lines: [
            R`الـ S: «أول شهر في التدريب، senior راجع الـ PR بتاعي وساب حوالي ٣٠ تعليق».`,
            R`«قال إن الـ PR كبير جدًا عشان يتراجع، والدوال بتعمل حاجات كتير».`,
            R`رد الفعل بصدق: «بصراحة كان صعب أسمعه في الأول، بس كنت عارف إنه صح، وكنت عايز أتحسن».`,
            R`الـ A1: «الأول شكرته وطلبت يوريني مثال واحد إزاي هو كان هيقسّم دالة».`,
            R`الـ A2: «بعدين قسّمت الـ PR لـ ٣ أصغر، وبدأت أخلّي الـ PRs تحت ٣٠٠ سطر».`,
            R`الـ A3: «وبدأت أراجع الـ diff بتاعي بنفسي قبل ما أطلب review، بـ checklist قصيرة».`,
            R`الـ R والدليل: «بعد شهرين، الـ PRs بقت بتتقبل من أول مرة غالبًا، وطلب مني أراجع كود intern جديد».`,
            R`الدرس: «اتعلمت إن النقد على الكود مش نقد ليا. ودلوقتي بطلبه بدري».`
          ],
          sol: R`مثال من presentation:
[[S: In my final year, I presented my graduation project to the committee, and one professor said my slides had too much text and nobody could follow.]] [[T: We had a second presentation two weeks later, so I needed to fix it.]] [[A: At first I felt embarrassed, but I asked him after the session what a good slide looks like. He told me one idea per slide. So I rewrote the deck: I cut it from 25 text-heavy slides to 12, with diagrams. I also practiced twice with friends and asked them to stop me when they got lost.]] [[R: In the second presentation, the committee asked more questions about the project itself, and we got the highest grade in our year.]] [[Lesson: Now I ask someone to review my slides before any presentation.]]

راجع: رد الفعل الأول صادق؟ فيه خطوتين محددتين؟ فيه دليل؟ الإجابة الضعيفة: [[I received feedback and I improved myself.]]`
        },
        {
          cmd: "STAR: ضغط ووقت",
          title: "«Tell me about a time you worked under pressure»: إجابة كاملة",
          desc: R`سؤال ضغط الوقت بييجي بصيغ كتير: [[under pressure]]، و [[tight deadline]]، و [[many tasks at once]]، و [[production issue]]. وقصة الـ deadline الفايت فيها درس كامل في «تاب الانترفيو»: [[deadline فات]]. هنا قصة مختلفة: ضغط وعدّى بنجاح، بإنجليزي كامل.

الإنترفيوير عايز يشوف: بتفكر وانت مضغوط ولا بتتوتر وتعمل أي حاجة؟ بترتّب أولويات؟ بتبلّغ الناس؟ والكلمة المفتاحية في الإجابة: [[prioritize]] (رتّبت الأولويات).`,
          example: R`S: On a Thursday evening, the client's online store went down, two days before a big sale.
T: I was the developer who built it, so I had to find the problem and fix it fast.
A: First, I told the client I was on it and would update them every hour.
A: Then I checked the logs and found that the database disk was full because of old log files.
A: I cleaned up the logs to get the site back quickly, and it was online within 40 minutes.
A: After that, I set up log rotation and a disk usage alert, so it wouldn't happen again.
R: The sale went ahead on Saturday with no problems, and the client said the hourly updates really helped.
Lesson: I learned to fix the immediate problem first, then the root cause, and to keep people updated the whole time.`,
          try: R`فكّر في موقف ضغط حقيقي (production issue، أو امتحان ومشروع مع بعض، أو تسليم مستعجل). اكتبه في ٨ جمل، ولازم فيه: إنك بلّغت حد، وإنك رتّبت الأولويات (إيه الأول وليه)، وحل سريع وبعدين حل دائم. سجّله.`,
          flag: "script",
          deep: {
            why: R`كل شغل فيه ضغط، والشركة عايزة حد يفضل يفكر بوضوح وقت الأزمة ويبلّغ الناس. والقصة اللي فيها «حل سريع وبعدين السبب الحقيقي» بتوري إنك فاهم إزاي الـ incidents بتتعامل في الشغل الحقيقي.`,
            how: R`عبارات الأولويات: [[I prioritized ... because ...]]، و [[The most urgent thing was ...]]، و [[I focused on ... first, and left ... for later]].

عبارات التبليغ: [[I told the client I was on it]] (شغال عليها)، و [[I kept them updated every hour]]، و [[I let my manager know right away]].

الحل المؤقت والدائم: [[a quick fix]] أو [[a workaround]] (حل مؤقت)، و [[the root cause]] (السبب الأساسي)، و [[a permanent fix]]، و [[so it wouldn't happen again]].

الهدوء: [[I stayed calm and ...]] (متقولهاش لوحدها، ورّيها بالخطوات).

follow-ups: [[How do you usually handle stress?]] → إجابة عملية: [[I write down the tasks and pick the most important one. And I take short breaks, even during busy weeks.]]`,
            when: "«Tell me about a time you worked under pressure / with a tight deadline / handled a production issue / juggled multiple tasks».",
            mistakes: R`[[I worked 20 hours a day]] (ده مش مهارة، ده خطر). ومفيش تبليغ لأي حد. وحل سريع من غير سبب جذري. و [[I don't get stressed]] (مش مصدقة). و [[The server was falled down]] (الصح [[went down]] أو [[crashed]]).`
          },
          lines: [
            R`الـ S: «الخميس بالليل، المتجر الأونلاين بتاع العميل وقع، قبل عرض كبير بيومين». went down = وقع.`,
            R`الـ T: «أنا اللي بنيته، فكان لازم ألاقي المشكلة وأصلّحها بسرعة».`,
            R`الـ A1 (تبليغ): «الأول قلت للعميل إني شغال عليها وهحدّثه كل ساعة». on it = شغال عليها.`,
            R`الـ A2: «بعدين شفت الـ logs ولقيت ديسك الداتابيز مليان بسبب ملفات logs قديمة».`,
            R`الـ A3 (حل سريع): «نضّفت الـ logs عشان الموقع يرجع بسرعة، ورجع في أقل من ٤٠ دقيقة».`,
            R`الـ A4 (حل دائم): «بعدها عملت log rotation و alert على مساحة الديسك، عشان متتكررش».`,
            R`الـ R: «العرض مشي يوم السبت من غير مشاكل، والعميل قال إن التحديثات كل ساعة فرقت معاه».`,
            R`الدرس: «اتعلمت أصلّح المشكلة الفورية الأول، وبعدين السبب الجذري، وأفضل مبلّغ الناس طول الوقت».`
          ],
          sol: R`مثال من الجامعة (تاسكات كتير مع بعض):
[[S: In my last semester, I had final exams and my graduation project deadline in the same week, and I was also doing a part-time freelance task.]] [[T: I couldn't do everything perfectly, so I had to choose.]] [[A: First, I listed everything with its deadline. I told my freelance client I'd deliver three days later, and he agreed. Then I focused on the project features the committee cared about most, and I skipped the extra admin page. I studied for exams in the mornings and worked on the project in the evenings.]] [[R: I passed all exams, we delivered the project on time, and the client got his task on the new date.]] [[Lesson: I learned that telling people early is better than trying to do everything at once.]]

راجع: فيه [[I told]] (تبليغ)؟ فيه اختيار أولوية بسبب؟ الإجابة الضعيفة: [[I worked very hard and slept 3 hours a day and finished everything.]]`
        },
        {
          cmd: "STAR: خلاف",
          title: "«Tell me about a disagreement with a teammate»: إجابة كاملة بالإنجليزي",
          desc: R`فيه قصة كاملة لنفس السؤال في درس [[disagree and commit]] في «تاب الانترفيو» (عن Redis والـ caching). هنا قصة تانية بموقف مختلف (خلاف مع designer على الـ UX)، عشان تشوف إزاي نفس الهيكل بيشتغل على مواقف غير تقنية بحتة.

اللغة المهمة في القصة دي: إزاي توصف رأيك ورأي الطرف التاني باحترام: [[She wanted ... because ...]] و [[I thought ... because ...]]. وإزاي توصف الحل: [[We agreed to ...]] و [[We tested both]] و [[In the end, we went with ...]]. والأهم: ولا جملة فيها لوم أو سخرية من الطرف التاني.`,
          example: R`S: On my last project, our designer wanted a multi-step signup form: five screens, one question each.
S: I thought it would be slower to build and might lose users, because every extra step is a chance to leave.
T: I was building the form, so I needed us to agree before I started.
A: First, I asked her to explain her reasons. She said long forms scare users, which is a fair point.
A: Then I suggested we look at data instead of opinions. We had analytics from the old form.
A: The data showed most users left at the phone number field, not because of the length.
A: So we agreed on a middle ground: two steps, and the phone number became optional.
R: Signups went up by about 20% in the first month, and we used the same approach for the next form.
Lesson: I learned that when two people disagree, looking at data together works better than arguing.`,
          try: R`اكتب قصة خلاف حقيقي (مع زميل، أو في مشروع جامعة، أو مع عميل) في ٩ جمل. لازم فيها: رأيه وسببه بإنصاف، ورأيك وسببك، وإزاي وصلتوا لقرار، وإيه اللي حصل. واقراها كأنك الطرف التاني: هل فيه جملة هتزعله؟ لو فيه، غيّرها. وسجّل.`,
          flag: "script",
          deep: {
            why: R`الشركة عايزة تعرف: هتقدر تشتغل مع ناس مختلفين عنك؟ والقصة اللي بتوصف فيها الطرف التاني بإنصاف بتقول «آه» بوضوح. وأحسن قصة فيها إن كل طرف كان عنده جزء من الحق.`,
            how: R`وصف الرأيين: [[She wanted X because Y]]، و [[His concern was...]]، و [[which is a fair point]] (وده نقطة منطقية). ورأيك: [[I thought...]]، و [[My concern was...]]، و [[I was worried that...]].

وسيلة الحل: [[I suggested we look at data]]، و [[We tested both]]، و [[We asked the tech lead to decide]]، و [[We agreed on a middle ground]] (حل وسط)، و [[We went with her idea, and I committed to it]].

النتيجة: رقم، أو إن العلاقة اتحسنت، أو إن الطريقة اتكررت.

ولو القرار راح عكسك: [[In the end, we went with his approach. I still had some concerns, but I committed to it and made it work.]] ودي إجابة قوية جدًا.

follow-ups: [[What would you do if you still disagreed after that?]] → [[I'd accept the decision, and suggest we review it after some time with real data.]]`,
            when: "«Tell me about a conflict / disagreement / a time you had to convince someone / worked with a difficult person».",
            mistakes: R`قصة إنك كسبت والتاني كان غلط ٪١٠٠. وصف سلبي للشخص ([[He was stubborn]] و [[She didn't understand]]). وخلاف شخصي مش مهني. و [[I convinced him that I'm right]] (الأحسن [[We agreed]]). وقصة من غير نتيجة.`
          },
          lines: [
            R`الـ S: «في آخر مشروع، الـ designer كانت عايزة فورم تسجيل على خطوات: ٥ شاشات، سؤال في كل واحدة».`,
            R`رأيك وسببه: «كنت شايف إنه أبطأ في التنفيذ وممكن نخسر يوزرز، لأن كل خطوة زيادة فرصة إنهم يمشوا».`,
            R`الـ T: «أنا اللي هبني الفورم، فكان لازم نتفق قبل ما أبدأ».`,
            R`الـ A1: «الأول طلبت منها تشرح أسبابها. قالت إن الفورم الطويل بيخوّف اليوزرز، ودي نقطة منطقية». fair point = منطقية.`,
            R`الـ A2: «بعدين اقترحت نبص على الداتا بدل الآراء. كان عندنا analytics من الفورم القديم».`,
            R`الـ A3: «الداتا ورّت إن أغلب اليوزرز بيمشوا عند خانة رقم الموبايل، مش بسبب الطول».`,
            R`الـ A4: «فاتفقنا على حل وسط: خطوتين، ورقم الموبايل بقى اختياري». middle ground = حل وسط.`,
            R`الـ R: «التسجيلات زادت حوالي ٢٠٪ أول شهر، واستخدمنا نفس الطريقة في الفورم اللي بعده».`,
            R`الدرس: «اتعلمت إن لما اتنين يختلفوا، إنهم يبصوا على الداتا مع بعض أحسن من الجدال».`
          ],
          sol: R`مثال من مشروع جامعة:
[[S: In our graduation project, my teammate wanted to use MongoDB because he already knew it. I wanted PostgreSQL, because our data was about students, courses and grades, which is very relational.]] [[T: We were the two backend developers, so we had to decide in the first week.]] [[A: First, I listened to his reasons: he was worried about learning SQL under a deadline, which was fair. So I suggested we each write the three hardest queries in both databases in one evening. The next day, we compared them together. The SQL versions were shorter and easier to read, and he agreed. I also offered to pair with him on SQL for the first two weeks.]] [[R: We used PostgreSQL, he became comfortable with SQL, and we finished the backend a week early.]] [[Lesson: A small experiment ended the discussion faster than any argument.]]

اقرا قصتك كأنك هو: [[he was worried about ..., which was fair]] بتحترمه. الإجابة الضعيفة: [[He wanted MongoDB but it's bad, so I told him to use PostgreSQL.]]`
        },
        {
          cmd: "STAR: غلطة",
          title: "«Tell me about a mistake you made»: إجابة كاملة بالإنجليزي",
          desc: R`السؤال ده مشروح في درس [[غلطة عملتها]] في «تاب الانترفيو» (بقصة migration). هنا قصة تانية بإنجليزي كامل، وتركيز على اللغة اللي بتعترف بيها من غير ما «تحرق» نفسك.

الفرق في اللغة بين اعتراف قوي واعتراف ضعيف: القوي بيقول [[I made a mistake]] أو [[It was my fault]] بوضوح، ومرة واحدة، وبعدين ينتقل للي عمله. الضعيف بيلف ([[Something happened and the data was lost]]) أو بيعتذر ١٠ مرات أو بيلوم حاجة تانية ([[the tool was bad]]).

والجزء الأطول في الإجابة لازم يكون: صلّحت الأثر إزاي، وغيّرت إيه عشان متتكررش.`,
          example: R`S: A few months ago, I was working on a client's website, and I pushed a change directly to production on a Friday afternoon.
S: I had only tested it on my laptop, and it broke the contact form. For the whole weekend, the client got no messages.
T: It was my mistake, so it was my job to fix it and make sure it didn't happen again.
A: On Monday morning, the client told me. I apologized, rolled back the change within 10 minutes, and confirmed the form worked.
A: Then I checked the server logs and found the messages that failed, and I sent them to the client, so nothing was lost.
A: After that, I set up a staging server and a simple rule for myself: no deploys on Friday, and every change goes to staging first.
R: The client stayed with me, and since then I haven't had a broken deploy on that project.
Lesson: I learned that testing on my laptop isn't enough, and that a staging environment is worth the extra hour.`,
          try: R`اكتب قصة غلطة حقيقية (ليها أثر، وانت اللي عملتها) في ٨ جمل. لازم فيها: جملة اعتراف واضحة ([[It was my mistake]])، وإصلاح الأثر، وتغيير دائم. وبعدين قول الجملة دي بصوت عالي ٥ مرات بنبرة هادية واثقة: [[It was my mistake, so it was my job to fix it.]] وسجّل القصة.`,
          flag: "script",
          deep: {
            why: R`الإنترفيوير عارف إن الكل بيغلط. هو بيقيس الـ ownership: بتعترف؟ بتصلّح؟ بتتعلم؟ والقصة الصادقة المرتبة بتدّي ثقة أكتر من ولا غلطة. والجملة الإنجليزي الواضحة للاعتراف صعبة نفسيًا على ناس كتير، فاتمرن عليها بصوت عالي.`,
            how: R`جمل الاعتراف: [[It was my mistake]]، و [[I made a mistake]]، و [[That was on me]] (دي عليا)، و [[I should have tested it on staging]] (كان المفروض). و [[should have + past participle]] = كان المفروض أعمل كذا (ومعملتش).

جمل الإصلاح: [[I apologized]]، و [[I rolled back the change]]، و [[I restored ...]]، و [[I let ... know right away]].

جمل المنع: [[After that, I set up ...]]، و [[I added a check]]، و [[I made a rule for myself]]، و [[so it wouldn't happen again]].

اختيار الغلطة: حقيقية، وليها أثر، بس مش كارثة أخلاقية أو إهمال متكرر. وقصة من مشروع شخصي أو فريلانس مقبولة جدًا.

follow-ups: [[How did the client react?]] (قول الحقيقة، حتى لو كان زعلان)، و [[What would you do differently?]] → [[I should have ...]].`,
            when: "«Tell me about a mistake / failure / something you'd do differently / a time something went wrong».",
            mistakes: R`[[My biggest mistake is that I work too hard]] (مش إجابة). وقصة الغلطة فيها لزميل. و [[The data was deleted]] (passive بيخبّي مين عمل: قول [[I deleted]]). و [[Sorry, sorry, it was very bad...]] (اعتذار زيادة في الانترفيو). و [[I should tested]] (الصح [[I should have tested]]، وبتتقال بسرعة «shoulda»).`
          },
          lines: [
            R`الـ S: «من كام شهر، كنت شغال على موقع عميل، ودفعت تغيير على الإنتاج مباشرة يوم جمعة بعد الضهر».`,
            R`«كنت جربته على اللابتوب بس، وكسر فورم التواصل. الويك إند كله العميل موصلوش رسايل».`,
            R`الـ T والاعتراف: «كانت غلطتي، فكان شغلي أصلّحها وأتأكد إنها متتكررش».`,
            R`الـ A1: «الاتنين الصبح العميل قالي. اعتذرت، ورجّعت التغيير في ١٠ دقايق، واتأكدت إن الفورم شغال». rolled back = رجّعت.`,
            R`الـ A2: «بعدين دوّرت في logs السيرفر ولقيت الرسايل اللي فشلت، وبعتها للعميل، فمفيش حاجة ضاعت».`,
            R`الـ A3 (المنع): «بعدها عملت staging server وقاعدة لنفسي: مفيش deploy يوم جمعة، وكل تغيير يروح staging الأول».`,
            R`الـ R: «العميل كمّل معايا، ومن ساعتها معنديش deploy مكسور في المشروع ده».`,
            R`الدرس: «اتعلمت إن التجربة على اللابتوب مش كفاية، وإن الـ staging يستاهل الساعة الزيادة». worth = يستاهل.`
          ],
          sol: R`مثال من فريق:
[[S: During my internship, I was asked to update the prices in the database with a script. I ran it without a WHERE condition on one query, and it set the same price for every product in staging.]] [[T: It was my mistake. Staging was shared with the QA team, so I had to fix it before they started testing.]] [[A: I told my mentor right away. We restored the table from the morning backup in about 20 minutes. Then I rewrote the script to run inside a transaction and print the number of affected rows before committing. I also suggested adding that to our team's script template.]] [[R: QA lost only half an hour, and the template is still used by the team.]] [[Lesson: Now I always run update scripts in a transaction and check the row count first. I should have done that from the start.]]

راجع: فيه [[It was my mistake]] مرة واحدة واضحة؟ فيه [[I told ... right away]]؟ فيه تغيير دائم؟ الإجابة الضعيفة بـ passive: [[The prices were changed by mistake.]]`
        }
      ]
    },
    {
      t: "تشرح مفهوم تقني ببساطة",
      l: 3,
      n: "قالب شرح أي مفهوم (تعريف ← تشبيه ← مثال ← trade-off)، وإجابات نموذجية بالإنجليزي للـ event loop و REST و الـ indexes",
      items: [
        {
          cmd: "قالب الشرح",
          title: "تشرح أي مفهوم تقني بالإنجليزي في ٤ خطوات: definition ← analogy ← example ← trade-off",
          desc: R`أسئلة «Explain X» ([[Explain the event loop]] و [[What is REST?]] و [[What's an index?]]) بتقيس حاجتين: فاهم ولا حافظ، وتعرف توصّل ولا لأ. واللي إنجليزيته ضعيفة بيحاول يقول تعريف طويل محفوظ من article، ويتوه في نصه.

القالب ده بيحل المشكلة، وكل خطوة جملة أو اتنين قصيرين:
١) Definition: جملة واحدة بسيطة. [[X is a ... that ...]]
٢) Analogy: تشبيه من الحياة. [[You can think of it like ...]]
٣) Example: مثال من الكود أو من مشروعك. [[For example, in my project, ...]]
٤) Trade-off / when: إمتى تستخدمه وإمتى لأ، أو عيبه. [[The downside is ...]] أو [[You'd use it when ...]]

وفي الآخر: [[Does that answer your question?]] أو [[Should I go deeper into any part?]]. ده بيسيب الإنترفيوير يوجّهك بدل ما تقول كل حاجة.`,
          example: R`Definition:  A cache is a fast storage layer that keeps copies of data we use often.
Analogy:  You can think of it like keeping your most-used tools on your desk instead of in the store room.
Example:  For example, in my project, I cached the product list in Redis for 60 seconds, because it was read thousands of times and changed rarely.
Trade-off:  The downside is that the data can be stale, so you need to decide how long to keep it, or clear it when the data changes.
When:  I'd use it for data that's read a lot and changes rarely, not for things like account balances.
Close:  Should I go deeper into cache invalidation?`,
          try: R`اختار مفهوم تعرفه كويس (مثلًا [[Git branch]] أو [[environment variables]] أو [[JWT]] أو [[Docker container]])، واكتب شرحه بالقالب في ٥ جمل. سجّله في أقل من دقيقة. وبعدين اسمعه واسأل: لو حد مش مبرمج سمع التشبيه، هيفهم الفكرة؟`,
          flag: "script",
          deep: {
            why: R`الإنترفيوير سمع التعريف المحفوظ ١٠٠ مرة. التشبيه والمثال من مشروعك هما اللي بيوروا إنك فاهم فعلًا. والقالب بيخلي إجابتك منظمة حتى لو الإنجليزي بسيط، ودي أهم من الإنجليزي المعقد.`,
            how: R`عبارات لكل خطوة:
التعريف: [[X is a ... that ...]]، و [[Basically, X lets you ...]]، و [[In simple terms, ...]].
التشبيه: [[You can think of it like ...]]، و [[It's similar to ...]]، و [[Imagine ...]].
المثال: [[For example, ...]]، و [[In my project, I used it to ...]]، و [[A common case is ...]].
الـ trade-off: [[The downside is ...]]، و [[The trade-off is ...]]، و [[It's great for ..., but not for ...]].
الختام: [[Does that make sense?]]، و [[Should I go deeper into ...?]].

التشبيهات: اختار تشبيه بسيط ومش مبالغ فيه، وقول حدوده لو فيه ([[The analogy isn't perfect, because ...]]). ده بيبان ناضج.

الوقت: ٤٥–٩٠ ثانية للإجابة الأولى. التفاصيل الأعمق للـ follow-ups.`,
            when: "أي «Explain X» أو «What is X?» أو «What's the difference between X and Y?» في انترفيو، وكمان وانت بتشرح لزميل أو عميل.",
            mistakes: R`تعريف محفوظ طويل بكلمات صعبة ومفيش مثال. تشبيه أطول من الشرح. تبدأ بالتفاصيل ([[So first, the V8 engine...]]). ومتقولش إمتى متستخدمهوش (الـ trade-off هو اللي بيفرق junior عن mid). و [[It's like... how to say... ehh...]]: جهّز تشبيهاتك قبلها.`
          },
          lines: [
            R`التعريف: «الـ cache طبقة تخزين سريعة بتحتفظ بنسخ من الداتا اللي بنستخدمها كتير».`,
            R`التشبيه: «زي ما تحط أكتر أدواتك استخدامًا على المكتب بدل المخزن».`,
            R`المثال: «في مشروعي، عملت cache لقايمة المنتجات في Redis لمدة ٦٠ ثانية، لأنها بتتقري آلاف المرات ونادرًا بتتغير».`,
            R`العيب: «الداتا ممكن تبقى قديمة (stale)، فلازم تحدد تحتفظ بيها قد إيه، أو تمسحها لما تتغير».`,
            R`إمتى: «أستخدمه لداتا بتتقري كتير ونادرًا بتتغير، مش لحاجة زي رصيد الحساب».`,
            R`الختام: «أدخل أعمق في الـ cache invalidation؟»`
          ],
          sol: R`مثال لـ [[environment variables]]:
[[Environment variables are settings that live outside the code, like the database URL or API keys.]] [[You can think of them like the settings on your phone: same app, different settings on each phone.]] [[For example, in my project, the app reads DATABASE_URL, so it connects to a local database on my laptop and to the real one in production, with the same code.]] [[The main reason is security: secrets don't go into Git.]] [[The downside is that if one is missing, the app can fail at runtime, so I validate them when the app starts.]]

راجع التسجيل: أقل من دقيقة؟ التشبيه بسيط؟ فيه مثال من مشروعك؟ فيه downside؟ الإجابة الضعيفة: [[Environment variables are variables of the environment.]] (تعريف بالكلمة نفسها).`
        },
        {
          cmd: "event loop بالإنجليزي",
          title: "«Explain the event loop»: إجابة نموذجية بالإنجليزي",
          desc: R`الشرح التقني الكامل للـ event loop في «تاب JavaScript»: [[event loop]]. هنا الإجابة الإنجليزي اللي تقولها في انترفيو، بالقالب الرباعي، وبجمل قصيرة.

النقط اللي لازم تتقال: JavaScript بتشغل حاجة واحدة في نفس الوقت (single-threaded، call stack واحد). الحاجات البطيئة (timers، و network، و files) بيتعامل معاها المتصفح أو Node برا الـ stack. ولما تخلص، الـ callback بتاعها بيتحط في queue. والـ event loop بيستنى الـ stack يفضى، وبعدين ياخد من الـ queue. والـ promises ليها queue أولويتها أعلى (microtasks)، بتخلص كلها قبل أي timer.

والمثال الكلاسيكي: [[setTimeout(..., 0)]] بيطبع بعد [[Promise.resolve().then(...)]] رغم إن الـ timeout صفر.`,
          example: R`Definition:  The event loop is how JavaScript handles async work even though it runs one thing at a time.
How:  JavaScript has one call stack. Slow things, like timers or network requests, are handled outside it, by the browser or by Node.
How:  When they finish, their callbacks wait in a queue. The event loop takes the next callback only when the stack is empty.
Detail:  Promise callbacks go into a separate microtask queue, and that queue is always emptied first.
Analogy:  You can think of it like a chef who cooks one dish at a time, while the oven and the timers work in the background and ring when they're done.
Example:  That's why setTimeout with zero logs after a resolved promise: the promise is a microtask, the timeout is a normal task.
Trade-off:  The downside is that a long synchronous loop blocks everything, including clicks, so heavy work should go to a worker or be split up.
Close:  Should I walk through a code example?`,
          try: R`سجّل الإجابة دي بكلامك في أقل من ٩٠ ثانية، من النقط بس ([[one stack → outside → queue → loop waits → microtasks first → blocking]]). وبعدين جاوب بصوت عالي على follow-up: [[What would this log? console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);]]`,
          flag: "script",
          deep: {
            why: R`سؤال الـ event loop من أشهر أسئلة انترفيو JavaScript و Node للـ juniors. وأغلب الناس بتحفظ رسمة ومتعرفش تشرحها بالكلام. الإجابة المنظمة بجمل بسيطة بتفرق جدًا.`,
            how: R`نطق الكلمات: [[queue]] «كيو»، و [[asynchronous]] «إيْسِنكرِنَس»، و [[synchronous]] «سِنكرِنَس»، و [[microtask]] «مايكرو-تاسك»، و [[callback]] «كول-باك»، و [[thread]] بـ ث.

كلمات لازم تبقى جاهزة: [[call stack]]، و [[single-threaded]]، و [[task queue]] أو [[callback queue]] أو [[macrotask queue]]، و [[microtask queue]]، و [[blocking]]، و [[non-blocking]]، و [[Web APIs]] (في المتصفح) و [[libuv]] (في Node).

الـ follow-up الكلاسيكي: الناتج [[1, 4, 3, 2]]. وقوله بالشرح: [[1 and 4 are synchronous, so they run first. Then the stack is empty, so the microtask runs: 3. Then the timer callback: 2.]]

ولو اتسألت عن Node بالتحديد: [[In Node, the event loop has phases, like timers, I/O callbacks and check for setImmediate, and process.nextTick runs even before promise callbacks.]] قول ده بس لو اتسألت، ولو مش متأكد من التفاصيل قول [[I'd need to check the exact order of phases]].`,
            when: "انترفيو JavaScript أو Node أو frontend، وأي سؤال عن async/await أو «why is my UI frozen?».",
            mistakes: R`[[JavaScript is multi-threaded]] (لأ، الكود بتاعك بيشتغل على thread واحد، حتى لو المتصفح و Node عندهم threads تانية). و [[setTimeout 0 runs immediately]]. ورسمة محفوظة من غير مثال. و «كويو» بدل «كيو». و [[await blocks the thread]] (لأ، بيوقف الدالة دي بس ويرجّع التحكم للـ event loop).`
          },
          lines: [
            R`التعريف: «الـ event loop هو إزاي JS بتتعامل مع الشغل الـ async رغم إنها بتشغل حاجة واحدة في المرة».`,
            R`«JS عندها call stack واحد. الحاجات البطيئة بيتعامل معاها المتصفح أو Node برا الـ stack».`,
            R`«لما تخلص، الـ callbacks بتستنى في queue. والـ event loop بياخد الجاي بس لما الـ stack يفضى».`,
            R`«الـ promises ليها microtask queue منفصلة، ودي دايمًا بتفضى الأول».`,
            R`التشبيه: «زي شيف بيطبخ طبق واحد في المرة، والفرن والتايمرز شغالين في الخلفية وبيرنّوا لما يخلصوا».`,
            R`المثال: «عشان كده setTimeout بصفر بيطبع بعد promise متحلّة».`,
            R`العيب: «loop طويل sync بيوقف كل حاجة حتى الكليكات، فالشغل التقيل يروح لـ worker أو يتقسّم».`,
            R`الختام: «أمشي في مثال كود؟»`
          ],
          sol: R`الناتج: [[1]] ثم [[4]] ثم [[3]] ثم [[2]].

الإجابة بالكلام: [[It logs 1, 4, 3, 2. One and four are synchronous, so they run first, in order. When the stack is empty, the event loop runs all microtasks first, so the promise callback logs 3. Then it takes the timer callback from the task queue, and logs 2. Even with zero milliseconds, the timeout has to wait for the stack and the microtasks.]]

الغلط الشائع: [[1, 2, 3, 4]] (فاكر إن كله بالترتيب)، أو [[1, 4, 2, 3]] (فاكر إن الـ timeout بصفر قبل الـ promise). ولو جاوبت صح بس من غير شرح، الإنترفيوير هيسأل «why?»، فالشرح هو الإجابة الحقيقية.`
        },
        {
          cmd: "REST بالإنجليزي",
          title: "«What is REST?» و «PUT vs PATCH»: إجابة نموذجية بالإنجليزي",
          desc: R`الشرح التقني في «تاب الانترفيو»: [[resources + verbs + stateless]]. هنا الإجابة المتكلمة.

النقط: REST طريقة (style) لتصميم APIs فوق HTTP. كل حاجة [[resource]] ليها URL ([[/users/42]]). بتتعامل معاها بالـ HTTP methods: GET تقرا، و POST تعمل جديد، و PUT تستبدل، و PATCH تعدّل جزء، و DELETE تمسح. والـ status codes بتقول النتيجة. و [[stateless]]: كل request فيه كل المعلومات اللي محتاجها (زي الـ token)، والسيرفر مش فاكر الـ request اللي قبله.

وأشهر follow-ups: [[PUT vs PATCH]]، و [[What does idempotent mean?]]، و [[REST vs GraphQL]].`,
          example: R`Definition:  REST is a style for designing APIs over HTTP, where everything is a resource with its own URL.
How:  You use HTTP methods as verbs: GET to read, POST to create, PUT to replace, PATCH to update part of it, and DELETE to remove it.
How:  The status code tells you the result: 200 OK, 201 Created, 404 Not Found, and so on.
Stateless:  It's stateless: every request carries everything the server needs, like the auth token, so any server can handle it.
Analogy:  You can think of resources like files in folders, and the methods like the actions you can do on a file.
Example:  In my project, GET /orders/15 returns one order, and PATCH /orders/15 with a new status updates just that field.
PUT vs PATCH:  PUT replaces the whole resource, PATCH changes only the fields you send.
Idempotent:  PUT and DELETE are idempotent: sending the same request twice gives the same result. POST isn't: it can create two orders.
Trade-off:  REST is simple and cacheable, but the client sometimes needs several requests, or gets more data than it needs. That's where GraphQL can help.`,
          try: R`صمّم بصوت عالي API لـ «blog» (posts و comments) في دقيقة: قول ٤ endpoints بالـ method والـ URL وبيعملوا إيه. وبعدين جاوب بصوت عالي على [[What's the difference between PUT and PATCH?]] و [[Is POST idempotent? Why?]]. سجّل.`,
          flag: "script",
          deep: {
            why: R`REST هو لغة الـ backend اليومية، وسؤاله بييجي في أي انترفيو backend أو full-stack. وقراية الـ URLs والـ methods بصوت عالي مهارة لوحدها ([[GET slash users slash forty-two]]).`,
            how: R`نطق: [[REST]] «رِست»، و [[resource]] «ريزورس» أو «ري-سورس» (الضغط على الأول أو التاني حسب اللهجة)، و [[idempotent]] «آيدِم-پوتِنت» (/ˌaɪdɛmˈpoʊtənt/) الضغط على [[PO]]، و [[stateless]] «ستيْت-لِس» من غير «إ».

قراية الـ URLs: [[/users/42/orders]] = [[slash users slash forty-two slash orders]]، أو في الكلام [[the orders of user forty-two]]. و [[?page=2]] = [[with page equals two]] أو [[query param page two]].

كلمات مفيدة: [[endpoint]]، و [[payload]] أو [[request body]]، و [[query parameters]]، و [[headers]]، و [[versioning]] ([[/v1/]] = [[v one]])، و [[pagination]].

[[REST vs GraphQL]] باختصار: [[With REST, the server decides the shape of the response for each endpoint. With GraphQL, the client asks for exactly the fields it needs in one request. GraphQL is more flexible, but caching and security are harder.]]`,
            when: "أي انترفيو backend أو full-stack، وتصميم API مع زميل، والكلام مع فريق mobile أو frontend.",
            mistakes: R`[[REST is a protocol]] (لأ، style؛ الـ protocol هو HTTP). و [[PUT and PATCH are the same]]. و [[GET /getUsers]] (الـ verb في الـ method مش في الـ URL). و «آيدم-بوتنت» بالضغط على الأول. و [[POST is for sending data and GET is for getting data]] وخلاص (صح بس ناقص جدًا).`
          },
          lines: [
            R`التعريف: «REST أسلوب لتصميم APIs فوق HTTP، كل حاجة فيه resource ليها URL».`,
            R`الـ methods كأفعال: GET تقرا، و POST تعمل، و PUT تستبدل، و PATCH تعدّل جزء، و DELETE تمسح.`,
            R`«الـ status code بيقول النتيجة: 200 و 201 و 404...» and so on = وهكذا.`,
            R`stateless: «كل request فيه كل اللي السيرفر محتاجه زي الـ token، فأي سيرفر يقدر يتعامل معاه».`,
            R`التشبيه: «الـ resources زي ملفات في فولدرات، والـ methods زي العمليات على الملف».`,
            R`المثال: GET بيرجّع أوردر، و PATCH بـ status جديد بيعدّل الخانة دي بس.`,
            R`PUT vs PATCH: «PUT بيستبدل الـ resource كله، و PATCH بيغيّر الخانات اللي بعتها بس».`,
            R`idempotent: «نفس الـ request مرتين = نفس النتيجة. POST لأ: ممكن يعمل أوردرين».`,
            R`العيب: «REST بسيط وبيتعمله cache، بس الـ client ساعات محتاج requests كتير أو بياخد داتا زيادة. هنا GraphQL ممكن يساعد».`
          ],
          sol: R`الـ API بصوت عالي:
[[GET slash posts: returns a list of posts.]]
[[POST slash posts: creates a new post.]]
[[GET slash posts slash id: returns one post.]]
[[POST slash posts slash id slash comments: adds a comment to that post.]]
(ولو ضفت [[PATCH slash posts slash id]] للتعديل و [[DELETE]] للمسح، أحسن.)

[[PUT vs PATCH]]: [[PUT replaces the whole post, so if I send only the title, the body could be lost. PATCH updates only the title.]]
[[Is POST idempotent?]]: [[No. If I send the same POST twice, I can get two posts. That's why payment APIs use an idempotency key.]]

الغلط الشائع: [[GET slash getPosts]] أو [[POST slash deletePost]]: الفعل مكانه الـ method.`
        },
        {
          cmd: "indexes بالإنجليزي",
          title: "«What is a database index?» و «Why not index everything?»: إجابة نموذجية",
          desc: R`الشرح التقني في «تاب PostgreSQL»: [[الـ indexes]]، والتفاصيل الأعمق في «تاب SQL و Prisma»: [[B-tree index]] و [[index trade-offs]]. هنا الإجابة المتكلمة.

النقط: الـ index هيكل بيانات إضافي (غالبًا B-tree) بيخلي الداتابيز تلاقي الصفوف من غير ما تقرا الجدول كله. من غيره: [[full table scan]] (بتقرا كل صف). معاه: بتروح للصف على طول تقريبًا (logarithmic). والتمن: مساحة زيادة، وكل INSERT و UPDATE و DELETE أبطأ شوية لأن الـ index لازم يتحدث. فبتعمل index على الأعمدة اللي بتدوّر بيها أو بتعمل بيها join أو sort كتير، مش على كل حاجة.

والتشبيه الكلاسيكي: فهرس الكتاب في آخره.`,
          example: R`Definition:  An index is an extra data structure that helps the database find rows without reading the whole table.
Analogy:  It's like the index at the back of a book: instead of reading every page, you look up the word and go to the page.
How:  Most indexes are B-trees, so a lookup takes logarithmic time instead of scanning every row.
Example:  In my project, searching orders by customer took about two seconds. After I added an index on customer_id, it took about 30 milliseconds.
Check:  I confirmed it with EXPLAIN ANALYZE: it changed from a sequential scan to an index scan.
Trade-off:  The cost is extra storage, and every insert or update is a bit slower, because the index has to be updated too.
When:  So I index columns I filter, join or sort on often, not every column.
Composite:  For a composite index on (customer_id, created_at), the order matters: it helps queries that filter by customer_id first.`,
          try: R`جاوب بصوت عالي على ٣ أسئلة وسجّل: (١) [[What is an index?]] بالقالب. (٢) [[Why not add an index to every column?]]. (٣) [[A query is slow. How would you find out if it needs an index?]]. كل إجابة أقل من دقيقة.`,
          flag: "script",
          deep: {
            why: R`الـ indexes من أشهر أسئلة الـ backend والداتابيز، ومن أحسن الأسئلة اللي تقدر تحكي فيها قصة أداء بأرقام من مشروعك. والإجابة اللي فيها «قست قبل وبعد بـ EXPLAIN» بتفرّقك جدًا.`,
            how: R`نطق: [[index]] «إندِكس» والجمع [[indexes]] «إندِكسِز» (في الداتابيز أشهر من [[indices]] «إندِسيز»، والاتنين صح)، و [[query]] «كويري» (/ˈkwɪəri/)، و [[sequential]] «سِكوِنشَل» (الضغط على [[QUEN]])، و [[logarithmic]] «لوگَ-رِذ-مِك» (الضغط على [[RITH]])، و [[EXPLAIN ANALYZE]] «إكسپلين آنَلايز».

كلمات: [[full table scan]] أو [[sequential scan]]، و [[index scan]]، و [[B-tree]] «بي-تري»، و [[composite index]] أو [[multi-column index]]، و [[unique index]]، و [[covering index]]، و [[write overhead]] (تكلفة الكتابة).

الإجابة على (٣): [[First, I'd run EXPLAIN ANALYZE on the query to see the plan. If I see a sequential scan on a big table with a filter that returns few rows, an index on that column will probably help. Then I'd add it and compare the timing.]]

ولو اتسألت [[When would an index not help?]]: [[When the query returns most of the table, or the table is tiny, the database might still prefer a full scan. Also, a function on the column, like LOWER(email), can stop a normal index from being used.]]`,
            when: "انترفيو backend أو داتابيز، وأي سؤال «this query is slow»، وقصص الأداء في STAR.",
            mistakes: R`[[Index makes everything faster]] (الكتابة أبطأ). و [[I add index on all columns]]. و [[an index is a primary key]] (الـ primary key عليه index، بس مش هو ده التعريف). وتقول إن الـ index «بيرتب الجدول» (الـ index العادي هيكل منفصل، مش بيرتب الجدول نفسه). و «إندكسيس» بنطق غريب.`
          },
          lines: [
            R`التعريف: «الـ index هيكل بيانات إضافي بيساعد الداتابيز تلاقي الصفوف من غير ما تقرا الجدول كله».`,
            R`التشبيه: «زي الفهرس في آخر الكتاب: بدل ما تقرا كل صفحة، بتدور على الكلمة وتروح للصفحة».`,
            R`«أغلب الـ indexes B-trees، فالبحث بياخد وقت logarithmic بدل ما يمسح كل صف».`,
            R`المثال بأرقام: «البحث بالعميل كان بياخد ثانيتين. بعد index على customer_id بقى حوالي ٣٠ مللي ثانية».`,
            R`القياس: «اتأكدت بـ EXPLAIN ANALYZE: اتغير من sequential scan لـ index scan».`,
            R`التمن: «مساحة زيادة، وكل insert أو update أبطأ شوية لأن الـ index لازم يتحدث».`,
            R`إمتى: «بعمل index على الأعمدة اللي بفلتر أو بعمل join أو sort بيها كتير، مش كل عمود».`,
            R`composite: «في index على عمودين، الترتيب مهم: بيساعد الـ queries اللي بتفلتر بـ customer_id الأول».`
          ],
          sol: R`(١) زي المثال بالظبط: تعريف، وتشبيه الكتاب، ومثال بأرقام.
(٢) [[Because every index has a cost. It takes extra storage, and every insert, update or delete has to update all the indexes on that table, so writes get slower. Also, the database won't use most of them anyway. So I only index columns that my real queries filter, join or sort on.]]
(٣) [[First, I'd run EXPLAIN ANALYZE to see the query plan. If there's a sequential scan on a big table, and the WHERE condition returns few rows, an index would probably help. I'd add it, run EXPLAIN ANALYZE again, and compare the time. I'd also check the query itself, because sometimes the problem is fetching too much data.]]

راجع: (٢) فيها كلمة [[writes]] أو [[insert/update]]؟ (٣) فيها [[EXPLAIN]] وقياس قبل وبعد؟ الإجابة الضعيفة لـ (٣): [[I'd add an index.]] من غير ما تقيس.`
        }
      ]
    },
    {
      t: "الـ live coding وآخر الانترفيو والمرتب",
      l: 3,
      n: "بنك جمل للتفكير بصوت عالي في كل مرحلة من الـ live coding، وأسئلتك وقفلة الانترفيو، والمرتب بالإنجليزي (gross و net و range)، ولما تتوتر أو تتلخبط في نص الكلام",
      items: [
        {
          cmd: "live coding phrases",
          title: "بنك جمل الـ live coding: من فهم المسألة لحد «I think it's done»",
          desc: R`الطريقة (تتكلم قبل ما تكتب، وتقول لما تتزنق) مشروحة في درس [[think aloud]] في «تاب الانترفيو»، والخطوات في [[clarify → examples → brute → optimize → test]]. هنا بنك جمل مترتب بالمراحل، عشان متدوّرش على الكلام وانت بتدوّر على الحل.

المشكلة عند اللي إنجليزيته ضعيفة: الدماغ مشغول بحاجتين (الحل واللغة)، فبيسكت. الحل: الجمل دي تبقى محفوظة لدرجة إنها متاخدش أي تفكير، فالدماغ كله يروح للحل. ٥ مراحل، ٣–٤ جمل لكل مرحلة، وده كفاية لأي live coding.

وكمان النطق: [[O(n)]] = [[O of n]]، و [[O(n²)]] = [[O of n squared]]، و [[O(n log n)]] = [[O of n log n]]، و [[hash map]] و [[two pointers]] و [[edge case]] «إدج كيْس».`,
          example: R`Understand:  Let me repeat the problem to make sure I got it. We need to return the indices of two numbers that add up to the target.
Understand:  Can I assume there's exactly one answer? Can the array have negative numbers?
Examples:  Let me try a small example: [2, 7, 11], target 9. The answer is 0 and 1.
Plan:  The simple way is to check every pair. That's O of n squared. Let me start with that, then improve it.
Plan:  To make it faster, I could use a hash map to remember the numbers I've seen. That would be O of n.
Coding:  I'll loop over the array. For each number, I check if target minus the number is already in the map.
Coding:  I'm naming this "seen" because it stores the numbers we've already visited.
Stuck:  Hmm, I'm stuck on the duplicates case. Let me trace it by hand with [3, 3], target 6.
Testing:  Let me test it with the example... index 0, not in the map, add it... index 1, found it. Returns 0 and 1.
Testing:  Edge cases: an empty array, one element, and duplicates. I think those all work.
Done:  I think it's done. Time is O of n and space is O of n. Would you like me to improve anything?`,
          try: R`حل مسألة [[Two Sum]] (أو أي مسألة سهلة من «تاب DSA») وانت بتسجّل صوتك، واستخدم جملة واحدة على الأقل من كل مرحلة من الـ ٦. وبعدين اسمع التسجيل وعدّ: أطول فترة سكوت كام ثانية؟ وقلت الـ complexity بصوت عالي؟`,
          flag: "script",
          deep: {
            why: R`في الـ live coding الإنترفيوير بيقيّم طريقة تفكيرك أكتر من الكود. والسكوت الطويل بيتحسب «تايه». واللي إنجليزيته ضعيفة غالبًا بيسكت مش لأنه مش عارف الحل، لكن لأنه مش لاقي الكلام. البنك ده بيشيل المشكلة دي.`,
            how: R`احفظ جملة واحدة لكل مرحلة كحد أدنى:
Understand: [[Let me repeat the problem to make sure I got it.]]
Examples: [[Let me try a small example.]]
Plan: [[The simple way is ..., that's O of ... . Let me start with that.]]
Coding: [[Now I'm going to ...]]
Stuck: [[I'm stuck on ... . Let me trace it by hand.]]
Testing: [[Let me test it with ...]]
Done: [[I think it's done. Time is O of ..., space is O of ...]]

كلمات الكود بصوت عالي: [[loop over]] (لف على)، و [[iterate through]]، و [[check if]]، و [[return early]]، و [[keep track of]] (أحتفظ بـ)، و [[increment]] و [[decrement]]، و [[swap]]، و [[sort]]، و [[the left pointer / right pointer]]، و [[off-by-one error]]، و [[base case]] (في الـ recursion).

ولما الإنترفيوير يدّي hint: [[Oh, that's a good point. So if I use a set here, I don't need the second loop.]] خده وابني عليه.

ولو محتاج وقت تفكر من غير كلام: [[Give me a moment to think about this]] وبعدين ١٥–٢٠ ثانية سكوت عادي.`,
            when: "أي جولة live coding، أو pair programming round، أو take-home بتكمله قدامهم.",
            mistakes: R`تكتب ٥ دقايق في صمت. وتقول [[ehh... so... yeah...]] بدل جمل. وتقول [[done]] من غير اختبار. و [[O n two]] (الصح [[O of n squared]]). و [[I will make a for loop]] (مفهومة، بس [[I'll loop over the array]] أطبع). وتتجاهل الـ hint.`
          },
          lines: [
            R`فهم: «خليني أعيد المسألة عشان أتأكد. محتاجين نرجّع indices رقمين مجموعهم الـ target».`,
            R`افتراضات: «أقدر أفترض إن فيه إجابة واحدة بالظبط؟ الـ array ممكن يبقى فيه سالب؟»`,
            R`مثال صغير: «خليني أجرب مثال: ٢ و ٧ و ١١، والـ target ٩. الإجابة ٠ و ١».`,
            R`خطة بسيطة: «الطريقة البسيطة إني أشيك كل زوج. ده O of n squared. أبدأ بيها وبعدين أحسّن».`,
            R`تحسين: «عشان أسرع، ممكن hash map أفتكر فيه الأرقام اللي شفتها. ده O of n».`,
            R`كتابة: «هلف على الـ array. لكل رقم، أشيك لو target ناقص الرقم موجود في الـ map».`,
            R`تسمية: «سميته seen لأنه بيخزن الأرقام اللي زرناها».`,
            R`متزنق: «امم، متزنق في حالة التكرار. خليني أمشيها بإيدي بـ ٣ و ٣ والـ target ٦». trace = أتتبع.`,
            R`اختبار: «أجرب المثال... index 0 مش في الـ map، أضيفه... index 1 لقيته. بيرجّع ٠ و ١».`,
            R`edge cases: «array فاضي، وعنصر واحد، وتكرار. أظن كلهم شغالين».`,
            R`خلاص: «أظن خلص. الوقت O of n والمساحة O of n. تحب أحسّن حاجة؟»`
          ],
          sol: R`تسجيل كويس لـ Two Sum (مدته ٨–١٥ دقيقة) فيه:
- إعادة المسألة وسؤال افتراضات في أول دقيقة.
- مثال صغير قبل أي كود.
- [[O of n squared]] للـ brute force، وبعدين [[O of n]] للـ hash map، بصوت عالي.
- كلام كل ٢٠–٣٠ ثانية على الأقل وانت بتكتب ([[Now I'm adding the number to the map]]).
- اختبار بمثال و edge cases قبل [[I think it's done]].

الحل نفسه للمرجع تحت (JavaScript).

لو أطول سكوت عندك أكتر من دقيقة، غالبًا كان وقت كتابة الـ loop: الحل إنك تقول الخطوة قبل ما تكتبها. ولو نسيت تقول الـ complexity، ضيف [[Time is... space is...]] للجملة الأخيرة وخلاص.`,
          solCode: R`function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11], 9)); // [ 0, 1 ]
console.log(twoSum([3, 3], 6));     // [ 0, 1 ]
console.log(twoSum([], 5));         // []`
        },
        {
          cmd: "آخر الانترفيو",
          title: "آخر ٥ دقايق: أسئلتك للإنترفيوير والـ next steps والـ thank-you",
          desc: R`الأسئلة نفسها (تسأل إيه ومين) في درس [[أسئلتك للإنترفيوير]] في «تاب الانترفيو». هنا اللغة: إزاي تسأل بشكل طبيعي، وإزاي تتفاعل مع الإجابة (مش تسأل وتسكت)، وإزاي تقفل.

التفاعل مع الإجابة: بعد ما يجاوب، جملة قصيرة بتبين إنك سمعت: [[That makes sense]]، و [[That sounds great]]، و [[Interesting, so ...]]، أو follow-up صغير: [[How does that work for new people?]]. ده بيحول الأسئلة لحوار.

القفلة: [[What are the next steps?]] (المراحل الجاية إيه)، و [[When can I expect to hear back?]] (إمتى أعرف)، وشكر محدد: [[Thank you for your time. I really enjoyed the technical discussion, especially the part about ...]]. وبعدها بيوم إيميل شكر قصير.`,
          example: R`Q: Do you have any questions for us?
A: Yes, a few. What would success look like in the first three months for this role?
A: That makes sense. And how do new developers usually get feedback on their code?
A: That sounds great. One more: what's the biggest technical challenge the team is working on right now?
A: Interesting. So the migration to microservices is still in progress?
A: Thanks, that's really helpful. What are the next steps in the process?
A: And when can I expect to hear back?
A: Thank you for your time. I really enjoyed the discussion, especially the part about your deployment pipeline.
Email: Hi Sara, thank you again for today's interview. I enjoyed learning about the team, and I'm excited about the role. Best, Ahmed`,
          try: R`حضّر ٣ أسئلة لشركة حقيقية، ولكل سؤال جهّز «ردة فعل» جاهزة (That makes sense و That sounds great و Interesting, so...). اعمل رول بلاي مع صاحب أو AI يجاوب عليهم، وخلّص بجملتين القفلة. وبعدين اكتب إيميل الشكر في ٣ جمل.`,
          flag: "script",
          deep: {
            why: R`آخر ٥ دقايق بتفضل في دماغ الإنترفيوير. والسؤال الذكي مع تفاعل حقيقي بيبين إنك مهتم فعلًا ومش حافظ أسئلة من النت. وسؤال الـ next steps عملي: بيوفر عليك أسابيع قلق.`,
            how: R`أسئلة جاهزة بإنجليزي طبيعي:
[[What does a typical day look like for someone in this role?]]
[[How does a change get from a PR to production here?]]
[[How do new developers get feedback and mentoring?]]
[[What do you enjoy most about working here?]]
[[Is there anything in my background you'd like me to clarify?]] (شجاعة، وبتدّيك فرصة ترد على شك).

ردود الفعل: [[That makes sense]]، و [[That sounds great]]، و [[That's good to hear]]، و [[Interesting]]، و [[I like that]]. وحاجة من الإجابة تبني عليها.

الشكر: محدد ([[especially the part about...]]) أحسن من عام. و [[It was nice meeting you]] أو [[Nice to meet you]].

إيميل الشكر: ٣ جمل، نفس اليوم أو تاني يوم. مش ضروري، بس لطيف وبيفتكّرهم بيك. ومتطلبش فيه حاجة.

ولو معندكش أسئلة فعلًا (اتجاوبت كلها): [[I think you've answered most of my questions already. Maybe just one: ...]] ومتقولش [[No]].`,
            when: "آخر كل جولة انترفيو، مع الـ recruiter أو المهندس أو المدير.",
            mistakes: R`[[No, I don't have questions]]. وتسأل عن المرتب والأجازات مع المهندس في الجولة التقنية. وتسأل ٦ أسئلة والوقت خلص. وتسأل وتسكت بعد الإجابة. و [[What is the next step?]] مقبولة، بس الأشهر [[What are the next steps?]]. وإيميل شكر طويل فيه إعادة للانترفيو كله.`
          },
          lines: [
            R`«عندك أي أسئلة لينا؟»`,
            R`«أيوه، كام سؤال. النجاح في أول ٣ شهور في الدور ده شكله إيه؟»`,
            R`ردة فعل + سؤال: «منطقي. والـ developers الجداد بياخدوا feedback على الكود إزاي؟»`,
            R`«حلو جدًا. سؤال كمان: إيه أكبر تحدي تقني الفريق شغال عليه دلوقتي؟»`,
            R`follow-up من الإجابة: «مثير للاهتمام. يعني الـ migration للـ microservices لسه شغالة؟»`,
            R`«شكرًا، مفيد جدًا. إيه الخطوات الجاية؟»`,
            R`«وإمتى أتوقع أسمع منكم؟» hear back = أسمع رد.`,
            R`شكر محدد: «شكرًا على وقتكم. استمتعت بالنقاش، خصوصًا الجزء عن الـ deployment pipeline».`,
            R`إيميل الشكر: ٣ جمل: شكر، وحاجة عجبتك، وحماسك. من غير طلبات.`
          ],
          sol: R`مثال رول بلاي:
[[Me: What does a typical week look like for a junior on your team?]]
[[Them: We do a standup every morning, and juniors pair with a senior twice a week.]]
[[Me: That sounds great. How do you choose the tasks for juniors in the first month?]]
...
[[Me: Thanks, that's really helpful. What are the next steps? ... Great. Thank you for your time, I really enjoyed hearing about the pairing sessions.]]

إيميل الشكر:
[[Hi Omar, thank you for taking the time to talk with me today. I especially enjoyed hearing about how your team pairs juniors with seniors. I'm excited about the opportunity and look forward to hearing from you. Best regards, Mona]]

راجع: فيه ردة فعل بعد كل إجابة؟ فيه follow-up واحد مبني على كلامهم؟ الشكر محدد؟`
        },
        {
          cmd: "salary بالإنجليزي",
          title: "المرتب بالإنجليزي: «What are your salary expectations?» و gross و net و range",
          desc: R`استراتيجية التفاوض (الأرقام الـ ٣، والسوق، والعرض التاني) في درس [[التفاوض]] في «تاب الشغل والكارير»، وتقييم العرض في [[تقييم العرض]]. هنا اللغة والكلمات اللي لو مفهمتهاش ممكن تخسر فلوس.

أهم فرق: [[gross]] = قبل الضرايب والتأمينات، و [[net]] = اللي بيوصل إيدك. في مصر الكلام غالبًا [[net]] و [[per month]]. برا غالبًا [[gross]] و [[per year]] ([[annual]]). فاسأل دايمًا: [[Is that gross or net? Monthly or annual?]]

كلمات: [[base salary]] (الأساسي)، و [[bonus]]، و [[benefits]] (مزايا: تأمين صحي، ولابتوب، وكورسات)، و [[health insurance]]، و [[equity]] أو [[stock options]] (أسهم)، و [[probation period]] (فترة الاختبار)، و [[notice period]] (المدة اللي لازم تبلّغ فيها قبل ما تمشي)، و [[range]] (مدى)، و [[negotiable]]، و [[total compensation]] (كل حاجة مع بعض). وللشغل remote لبرا: [[contractor]] ولا [[employee]]، و [[in USD]]، و [[paid through...]] (بتتقبض إزاي). والتفاصيل في درس [[remote لبرا]] في «تاب الشغل والكارير».`,
          example: R`Q: What are your salary expectations?
A: Based on my research for junior roles in Cairo, I'm looking for something in the range of 25 to 30 thousand pounds net per month.
A: I'm flexible, depending on the full package: benefits, learning budget, and remote days.
A: Before I give a number, could you share the budget range for this role?
A: Just to make sure: is that gross or net, and is it monthly or annual?
A: Thank you for the offer. I'm really excited about the role. Is there any flexibility on the base salary?
A: If the base is fixed, could we agree on a salary review after the probation period?
A: What's the notice period, and when would you like me to start?
A: Could you send me the offer in writing, so I can review the details?`,
          try: R`حدد رينج حقيقي لنفسك (من درس [[التفاوض]] في «تاب الشغل والكارير»). وبعدين قول بصوت عالي وسجّل: (١) إجابتك على [[What are your salary expectations?]] بالرينج. (٢) السؤال عن gross ولا net. (٣) ردك على [[That's above our budget. The maximum is 22 thousand.]] بجملة فيها شكر وطلب مراجعة بعد الـ probation.`,
          flag: "script",
          deep: {
            why: R`في كلام المرتبات بالإنجليزي، سوء فهم كلمة واحدة ([[gross]] ولا [[net]]، شهري ولا سنوي) ممكن يفرق آلاف. واللي إنجليزيته ضعيفة غالبًا بيقول [[OK]] على أول رقم عشان مش عارف يتفاوض بالإنجليزي. الجمل الجاهزة دي بتحل ده.`,
            how: R`الأرقام بصوت عالي: [[25,000]] = [[twenty-five thousand]] أو [[twenty-five K]]، و [[$2,500]] = [[twenty-five hundred dollars]] أو [[two and a half K]]، و [[$40k a year]] = [[forty K a year]]. وخلي بالك من [[fifteen]] و [[fifty]] (درس «1.5k و 99.9%»).

الرينج: [[in the range of X to Y]] أو [[between X and Y]]. وأول الرينج لازم يبقى فوق أقل رقم تقبله.

لو مش عايز تقول رقم الأول: [[I'd like to learn more about the role first. Could you share the budget range?]] ولو أصروا، قول الرينج.

الشكر والحماس قبل أي تفاوض: [[Thank you for the offer. I'm really excited about the role.]] وبعدين [[Is there any flexibility on...?]] أو [[Would it be possible to...?]].

وكل حاجة اتفقتوا عليها بالكلام: [[Could you send me the offer in writing?]].

والتوقيت: متسألش عن المرتب في أول ٥ دقايق مع المهندس. مع الـ recruiter أو الـ HR عادي، وغالبًا هما اللي بيسألوا.`,
            when: "مكالمة الـ recruiter الأولى (غالبًا بيسأل عن التوقعات)، ومرحلة العرض، ومراجعة المرتب بعد الـ probation.",
            mistakes: R`[[I want as much as possible]] أو [[Whatever you think]] (بتخسر). ورقم من غير ما تعرف gross ولا net. و [[I need more money because my rent is high]] (سبب شخصي؛ السبب الأقوى السوق أو المهارة). و [[OK]] على أول عرض بسرعة من التوتر. و [[fifty thousand]] وانت قصدك [[fifteen]].`
          },
          lines: [
            R`السؤال: «توقعاتك للمرتب إيه؟»`,
            R`رينج مبني على السوق: «بناءً على بحثي لأدوار junior في القاهرة، بدوّر على حاجة في حدود ٢٥ لـ ٣٠ ألف صافي في الشهر».`,
            R`مرونة: «مرن، حسب الـ package كله: المزايا، وميزانية التعلم، وأيام الـ remote».`,
            R`تطلب رينجهم الأول: «قبل ما أقول رقم، ممكن تقولولي ميزانية الدور ده؟»`,
            R`توضيح: «عشان أتأكد: ده قبل الضرايب ولا صافي؟ شهري ولا سنوي؟»`,
            R`بعد العرض: «شكرًا على العرض، متحمس جدًا للدور. فيه مرونة في الأساسي؟»`,
            R`بديل: «لو الأساسي ثابت، ممكن نتفق على مراجعة المرتب بعد فترة الاختبار؟»`,
            R`«فترة الإخطار كام، وتحبوا أبدأ إمتى؟» notice period = مدة الإخطار قبل ما تسيب.`,
            R`«ممكن تبعتولي العرض مكتوب عشان أراجع التفاصيل؟» in writing = مكتوب.`
          ],
          sol: R`نموذج (غيّر الأرقام لأرقامك):
(١) [[Based on what I've seen for junior full-stack roles in Cairo, I'm looking for something between 25 and 30 thousand pounds net per month, depending on the full package.]]
(٢) [[Just to make sure I understand: is that number gross or net, and monthly or annual?]]
(٣) [[I understand, thank you for being transparent. I'm still very interested in the role. If 22 is the maximum for now, could we agree in writing on a salary review after the three-month probation?]]

راجع التسجيل: الأرقام واضحة ([[twenty-five]] مش مبلوعة)؟ فيه [[net]] أو [[gross]]؟ في (٣) فيه شكر قبل الطلب؟ الإجابة الضعيفة لـ (٣): [[OK, no problem.]] على طول، أو [[No, this is too low.]] ناشفة.`
        },
        {
          cmd: "التوتر وتطلب يعيد",
          title: "اتوترت واتلخبطت في نص الجملة: جمل ترجع بيها من غير ما تنهار",
          desc: R`جمل طلب الإعادة والتوضيح الأساسية في درس [[English وانجليزيتك مش قوية]] في «تاب الانترفيو» ودرس «مش فاهم بأدب» في التاب ده. هنا حاجة مختلفة: انت اللي بتتكلم، وفجأة: نسيت الكلمة، أو الجملة اتلخبطت، أو نسيت انت كنت بتقول إيه، أو قلت حاجة غلط. ودي أكتر لحظات التوتر في الانترفيو.

الحل: جمل «رجوع» محفوظة. [[Sorry, let me start that again.]] لما الجملة تتلخبط. [[Let me rephrase that.]] لما تقول حاجة بشكل مش واضح. [[What I mean is...]] وبعدين نفس الفكرة بكلام أبسط. [[Sorry, I've lost my train of thought. Could you remind me of the question?]] لما تنسى انت فين. [[Actually, let me correct that...]] لما تقول معلومة غلط.

والـ native speakers بيقولوا الجمل دي طول الوقت. هي مش علامة ضعف، هي علامة إنك بتراقب كلامك.`,
          example: R`Sorry, let me start that again.
Let me rephrase that. What I mean is, the cache was hiding the real problem.
I'm not sure of the exact word in English, but it's when two requests change the same data at the same time... a race condition.
Sorry, I've lost my train of thought. Could you remind me of the question?
Actually, let me correct that: it was PostgreSQL, not MySQL.
Sorry, I'm a bit nervous. Give me a second.
Could I take a moment to think about that?
To sum up what I said: I added the index, measured it, and the query got 50 times faster.`,
          try: R`اطلب من حد (أو AI) يسألك ٣ أسئلة انترفيو وانت بتسجّل، وخليه يقاطعك مرة أو يغيّر السؤال فجأة. وعن قصد: وقف في نص جملة مرة، وقول [[Sorry, let me start that again]]، وكمّل. وبعدين قول [[I'm not sure of the exact word...]] ووصّف كلمة. الهدف تجرب الرجوع وانت مش متوتر، عشان يبقى أوتوماتيك وانت متوتر.`,
          flag: "script",
          deep: {
            why: R`اللي بيوقع الناس في الانترفيو مش الغلطة، لكن اللي بيحصل بعدها: بيتكسفوا، ويسرّعوا، ويغلطوا أكتر، والدوامة تكمّل. جملة رجوع واحدة محفوظة بتوقف الدوامة دي في ثانيتين.`,
            how: R`للتوتر نفسه (قبل الانترفيو): ١) حضّر الإجابات الأكيدة (about yourself، و STAR، والمشروع) لحد ما تبقى مريحة. ٢) اتكلم إنجليزي ١٠ دقايق قبل الانترفيو (سجّل نفسك أو كلم AI) عشان «تسخّن». ٣) ميّة جنبك، وورقة فيها كلمات مفتاحية (مش إجابات كاملة). ٤) نفَس بطيء قبل ما تبدأ.

وأثناء الانترفيو: اتكلم أبطأ من طبيعتك عن قصد. السرعة هي أكبر سبب للتلخبط والنطق الوحش.

[[Sorry, I'm a bit nervous]] مرة واحدة مقبولة جدًا وأغلب الإنترفيويرز بيتعاطفوا ويهدّوا الإيقاع. أكتر من مرة بتبان مشكلة.

الكلمة المنسية: وصّفها ([[It's the thing that...]]) أو قول مرادف أبسط، أو قولها بالعربي ووصفها ([[In Arabic we call it... it's like...]]) في الحالات القصوى. المهم تكمّل.

والتلخيص في الآخر ([[To sum up...]]) بينقذ أي إجابة اتلخبطت في نصها: الإنترفيوير بيفتكر الآخر.`,
            when: "أي لحظة تلخبط في انترفيو أو اجتماع أو presentation.",
            mistakes: R`تفضل تكمّل جملة متلخبطة لحد ما تبقى مش مفهومة. وتعتذر عن إنجليزيتك ٥ مرات. وتسكت دقيقة بعد الغلطة. وتضحك ضحكة متوترة وتقول [[sorry sorry]]. وتكمّل بمعلومة غلط عشان مكسوف تصلّحها ([[Actually, let me correct that]] أحسن بكتير).`
          },
          lines: [
            R`الجملة اتلخبطت: «آسف، خليني أبدأ تاني».`,
            R`«خليني أقولها بشكل تاني. قصدي إن الـ cache كان مخبّي المشكلة الحقيقية». rephrase = أعيد الصياغة.`,
            R`نسيت الكلمة: «مش متأكد من الكلمة بالإنجليزي، بس لما اتنين requests يغيروا نفس الداتا في نفس الوقت... race condition».`,
            R`نسيت انت فين: «آسف، الفكرة هربت مني. ممكن تفكرني بالسؤال؟» train of thought = سلسلة الأفكار.`,
            R`معلومة غلط: «في الحقيقة، خليني أصحح: كان PostgreSQL مش MySQL».`,
            R`«آسف، متوتر شوية. ثانية واحدة». مرة واحدة بس.`,
            R`«ممكن آخد لحظة أفكر؟»`,
            R`التلخيص بينقذ الإجابة: «ألخّص اللي قلته: ضفت index، وقسته، والـ query بقت أسرع ٥٠ مرة».`
          ],
          sol: R`التسجيل الناجح مش اللي مفيهوش غلطات. الناجح اللي فيه لحظة تلخبط، وبعدها جملة رجوع في أقل من ٣ ثواني، وبعدها كلام طبيعي.

مثال: [[So I used Redis for... sorry, let me start that again. I used Redis to cache the product list, because it was read thousands of times per minute. ... What I mean is, the database was doing the same work again and again.]]

وللكلمة المنسية: [[I'm not sure of the exact word, but it's when the server sends the data in small pieces instead of all at once.]] (الكلمة [[streaming]] أو [[chunked]]). الإنترفيوير غالبًا هيقولها لك، وده عادي جدًا.

لو لقيت إن التسجيل فيه دوامة (غلطة → اعتذار → سرعة → غلطة تانية)، اتمرن على [[Sorry, let me start that again]] لوحدها ١٠ مرات بنبرة هادية، وبعدين أعد التمرين.`
        }
      ]
    },
    {
      t: "خطة التدريب: تسمع وتقلّد وتسجّل وتتمرن",
      l: 3,
      n: "تسمع إيه حسب مستواك، والـ subtitles بالتدريج، والـ shadowing، وتسجّل نفسك وتقيّم، وخطة ٣٠ يوم ١٥ دقيقة في اليوم، و mock interview مع AI بالصوت بأمان",
      items: [
        {
          cmd: "listening بالمستوى",
          title: "تسمع إيه؟ قنوات وبودكاستات وtalks مترتبة من الأبطأ للأسرع",
          desc: R`الكلام بيبدأ من الودن: مش هتقول جملة كويس لو عمرك ما سمعتها. والغلطة المشهورة إنك تبدأ بحاجة سريعة جدًا (Fireship أو ThePrimeagen) فتفهم ٢٠٪ وتحبط. الصح: ابدأ بحاجة تفهم منها ٧٠–٨٠٪، وزوّد السرعة كل شهر.

المستوى ١ (بطيء وواضح، ومعاه نص مكتوب): BBC Learning English (فيه برنامج [[6 Minute English]] بنص كامل)، و VOA Learning English (إنجليزي بطيء)، و Programming with Mosh، و freeCodeCamp (كورسات طويلة بشرح هادي).

المستوى ٢ (سرعة عادية، مواضيع تقنية): Web Dev Simplified، و Kevin Powell (CSS)، و The Net Ninja (لكنة بريطانية واضحة)، و Traversy Media، و ByteByteGo (system design بصوت هادي)، و Hussein Nasser (backend بتفكير بصوت عالي).

المستوى ٣ (سريع، ولكنات مختلفة، ونقاش مش شرح): Fireship، و Theo، و ThePrimeagen، وبودكاستات زي Syntax و Software Engineering Daily و The Changelog، و talks من مؤتمرات (JSConf، و React Conf، و NDC، و GOTO) بلكنات من كل العالم.

والأسماء دي كانت شغالة وقت كتابة الدرس؛ القنوات بتتغير وبتقف، فلو واحدة وقفت دوّر على بديل بنفس المستوى.`,
          example: R`Level 1 (slow, with transcript):  BBC Learning English "6 Minute English", VOA Learning English, Programming with Mosh
Level 1 tip:  Watch at 0.75x speed. Read the transcript after, not before.
Level 2 (normal speed, tech):  Web Dev Simplified, Kevin Powell, The Net Ninja, Traversy Media, ByteByteGo
Level 2 tip:  Pick videos about things you already know, so your brain focuses on the English.
Level 3 (fast, discussions):  Fireship, Theo, ThePrimeagen, Syntax, Software Engineering Daily, conference talks
Level 3 tip:  Listen to different accents: Indian, German, American, British, Australian.
Pronunciation:  Rachel's English (US), English with Lucy (UK), BBC "The Sounds of English", YouGlish
Daily:  10 minutes of listening, every day, beats 2 hours once a week.
Test:  If you understand less than 60%, go down a level. More than 90%, go up.`,
          try: R`النهارده: اسمع ٥ دقايق من قناة في كل مستوى من التلاتة، وقدّر نسبة فهمك لكل واحدة (من غير subtitles). المستوى اللي فهمت فيه ٦٠–٨٠٪ هو مستواك. اكتبه في [[log.md]] مع اسم ٣ قنوات من المستوى ده هتسمعهم الشهر ده.`,
          flag: "script",
          deep: {
            why: R`الكلام الكويس بييجي من سمع كتير. والسمع لازم يبقى في المستوى الصح: صعب جدًا يحبطك، وسهل جدًا ميعلمكش. وسمع مواضيع تقنية بالذات بيعلّمك الكلمات والجمل اللي هتقولها فعلًا في الشغل (والنطق الصح لأسماء الأدوات).`,
            how: R`طريقة السمع النشط (١٠ دقايق): ١) اسمع مرة من غير توقف، وحاول تفهم الفكرة العامة. ٢) اسمع تاني مع subtitles إنجليزي، ووقّف عند كل جملة مفهمتهاش. ٣) اكتب جملتين عجبوك في [[phrases.md]]. ٤) اختار جملة وقولها بصوت عالي (أو shadowing: الدرس الجاي).

السمع السلبي (في المواصلات، أو وانت بتغسل المواعين): بودكاست من مستواك. مفيد، بس أقل من النشط بكتير. اعمل الاتنين.

السرعة: YouTube فيه تحكم في السرعة (0.75x و 1.25x). ابدأ أبطأ، وكل أسبوعين زود. ولو بقيت فاهم 1.25x، الكلام العادي هيبقى سهل.

اللكنات: في شغل remote، الفريق ممكن يبقى هندي وألماني وبرازيلي وأمريكي. اسمع talks من مؤتمرات في بلاد مختلفة (NDC في أوروبا، و JSConf India، وغيرهم) عشان ودنك تتعود.`,
            when: "كل يوم ١٠ دقايق على الأقل. والسمع السلبي أي وقت فاضي.",
            mistakes: R`تبدأ بأسرع قناة. وتسمع بـ subtitles عربي بس (بتقرا مش بتسمع). وتسمع ساعتين يوم الجمعة وبعدين تبطّل أسبوع. وتسمع حاجات مش تقنية خالص (أفلام بس): مفيدة، بس كلمات الشغل مش فيها. وتفضل في نفس المستوى سنة.`
          },
          lines: [
            R`المستوى ١: بطيء ومعاه نص مكتوب. BBC و VOA بيتكلموا ببطء مقصود.`,
            R`نصيحة: سرعة 0.75، واقرا النص بعد ما تسمع، مش قبل.`,
            R`المستوى ٢: سرعة عادية ومواضيع تقنية بشرح واضح.`,
            R`نصيحة: اختار فيديوهات عن حاجات انت عارفها، فالمخ يركز على الإنجليزي.`,
            R`المستوى ٣: سريع، ونقاشات، ولكنات مختلفة.`,
            R`نصيحة: اسمع لكنات مختلفة: هندي وألماني وأمريكي وبريطاني وأسترالي.`,
            R`للنطق: قنوات متخصصة في نطق الأصوات، و YouGlish للكلمات.`,
            R`«١٠ دقايق كل يوم أحسن من ساعتين مرة في الأسبوع».`,
            R`الاختبار: أقل من ٦٠٪ انزل مستوى، وأكتر من ٩٠٪ اطلع مستوى.`
          ],
          sol: R`النتيجة المتوقعة لمبرمج مصري إنجليزيته ضعيفة: المستوى ١ حوالي ٧٠–٩٠٪، والمستوى ٢ حوالي ٤٠–٧٠٪ (بيعتمد على الموضوع: لو عن حاجة تعرفها بتفهم أكتر)، والمستوى ٣ حوالي ١٥–٤٠٪.

فلو ده انت، مستواك ٢ في المواضيع التقنية اللي تعرفها، و ١ في الكلام العام. مثال لـ [[log.md]]:
[[Listening level: 2 (tech I know), 1 (general)]]
[[This month: Web Dev Simplified, The Net Ninja, BBC 6 Minute English]]

ولو فهمت المستوى ٣ أكتر من ٦٠٪، ممتاز: ركّز على الكلام (shadowing وتسجيل) أكتر من السمع.`
        },
        {
          cmd: "subtitles تدريجي",
          title: "الـ subtitles بالتدريج: عربي ← إنجليزي ← من غير، ونفس الفيديو ٣ مرات",
          desc: R`الـ subtitles سلاح ذو حدين. العربي بيخليك تفهم المحتوى بس ودنك مش بتشتغل (بتقرا). والإنجليزي بيساعد ودنك تربط الصوت بالكلمة. ومن غير subtitles هو الهدف.

الطريقة التدريجية: ١) لو مستواك ١ ومش فاهم حاجة: عربي مرة، عشان تفهم الفكرة. ٢) بعدها على طول نفس الفيديو بـ subtitles إنجليزي. ٣) بعدها نفس الفيديو من غير subtitles. وكل ما تتحسن، شيل الخطوة الأولى.

نفس الفيديو ٣ مرات أحسن من ٣ فيديوهات مرة واحدة. لأن المرة التالتة بتسمع الكلمات اللي قريتها في التانية، فالمخ بيربط.

وأدوات: YouTube فيه auto-generated captions إنجليزي لأغلب الفيديوهات (مش دقيقة ١٠٠٪، خصوصًا في أسماء الأدوات). وإضافات للمتصفح زي Language Reactor بتعرض subtitles بلغتين مع بعض، وتقدر تدوس على كلمة تشوف معناها.`,
          example: R`Week 1-2 (level 1):  Arabic subtitles → English subtitles → no subtitles (same 5-minute video)
Week 3-4:  English subtitles → no subtitles → shadow one minute
Month 2:  No subtitles first → English subtitles only for the parts you missed
Month 3:  No subtitles. Pause and write down any sentence you didn't catch.
YouTube:  Settings → Subtitles → English (auto-generated) → Playback speed 0.75
Rule:  Same video 3 times > 3 different videos once.
Warning:  Auto-generated captions often get tool names wrong: "next JS" may show as "next yes".`,
          try: R`اختار فيديو تقني ٥ دقايق من مستواك (من الدرس اللي فات)، واتفرج عليه ٣ مرات بالترتيب ده النهارده: subtitles إنجليزي، وبعدين من غير، وبعدين من غير مع إنك توقف وتكتب أي جملة ملقطتهاش. وقارن: فهمت كام في المرة التالتة مقارنة بالأولى؟`,
          flag: "script",
          deep: {
            why: R`أغلب الناس بتفضل على subtitles عربي سنين وبتقول «أنا بفهم إنجليزي»، وهي في الحقيقة بتفهم عربي. والطريقة التدريجية بتدرّب الودن فعلًا، وبتوري تقدمك بوضوح (من فيديو لفيديو، ومن شهر لشهر).`,
            how: R`لما تشوف جملة مكتوبة ومسمعتهاش صح، اسأل: ليه؟ غالبًا لسبب من دول: ١) كلمة متوصلة بكلمة ([[want to]] بتتقال «وانا»، و [[going to]] «گونا»، و [[kind of]] «كايندا»، و [[let me]] «لِمي»). ٢) كلمة ضعيفة اتبلعت ([[and]] بتبقى «ن»، و [[to]] بتبقى «تَ»، و [[of]] بتبقى «ڤ»). ٣) كلمة جديدة. ٤) لكنة.

النوعين الأولين هما الأكتر، ودول مش «إنجليزي صعب»، دي قواعد الكلام السريع. ولما تعرفها، هتسمعها في كل حتة: [[Do you want to]] «ديو وانا»، و [[What do you mean]] «وادِيو مين».

والـ auto-captions: كويسة جدًا للمحتوى العام، وضعيفة في الأسماء التقنية. ودي فرصة: لو الـ caption كتب [[next yes]] وانت عارف إنها [[Next.js]]، انت بتفهم أكتر من الماكينة.`,
            when: "أي فيديو تقني أو غير تقني. الشهر الأول: ٣ مرات لنفس الفيديو. بعدها حسب مستواك.",
            mistakes: R`subtitles عربي دايمًا. وتقرا الـ subtitles بدل ما تسمع (غمّض عينك في المرة التالتة). وتغيّر الفيديو كل مرة. وتتفرج على فيديو ٤٠ دقيقة مرة واحدة ومش فاهم نصه: ٥ دقايق ٣ مرات أحسن.`
          },
          lines: [
            R`أول أسبوعين: عربي، وبعدين إنجليزي، وبعدين من غير. نفس الفيديو.`,
            R`تالت ورابع أسبوع: إنجليزي، وبعدين من غير، وبعدين shadowing دقيقة.`,
            R`الشهر التاني: من غير الأول، والإنجليزي بس للأجزاء اللي فاتتك.`,
            R`الشهر التالت: من غير خالص. وقّف واكتب أي جملة ملقطتهاش.`,
            R`YouTube: الإعدادات، والـ subtitles الإنجليزي التلقائية، والسرعة 0.75.`,
            R`القاعدة: نفس الفيديو ٣ مرات أحسن من ٣ فيديوهات مرة.`,
            R`تحذير: الـ captions التلقائية بتغلط في أسماء الأدوات.`
          ],
          sol: R`النتيجة المتوقعة: المرة الأولى (بـ subtitles) بتفهم كويس بس عينك على النص. المرة التانية (من غير) بتفهم أقل بشوية، وده طبيعي. المرة التالتة (من غير، بتوقف) بتفهم أكتر من التانية، لأنك عرفت الكلمات.

الجمل اللي هتكتبها في المرة التالتة غالبًا فيها: [[gonna]] و [[wanna]] و [[kind of]] و [[a lot of]] («ألوتا»)، أو اسم أداة جديدة. اكتبهم في [[phrases.md]] بالشكل المكتوب والشكل المسموع: [[going to → "gonna"]].

لو فهمت المرة الأولى من غير subtitles ٨٠٪ أو أكتر، الفيديو ده سهل عليك: اطلع مستوى.`
        },
        {
          cmd: "shadowing",
          title: "الـ shadowing: تقلّد المتكلم وهو بيتكلم، أسرع طريقة لتحسين النطق والإيقاع",
          desc: R`الـ shadowing = بتسمع جملة وتقولها في نفس الوقت تقريبًا (متأخر ثانية أو اتنين)، زي الضل. مش بتسمع وتوقف وتعيد، لأ: بتتكلم مع المتكلم. ده بيدرّب النطق والإيقاع والنبرة والسرعة مع بعض، وده اللي مفيش كتاب بيعلّمه.

الخطوات: ١) اختار مقطع دقيقة أو اتنين، من متكلم واضح، بمستواك، ومعاه نص مكتوب (transcript). ٢) اسمعه مرتين وانت بتقرا النص. ٣) اقرا النص بصوت عالي مع الصوت (تقرا وتسمع وتتكلم). ٤) من غير النص: اتكلم مع الصوت. ٥) سجّل نفسك وانت بتعمل shadowing، وقارن.

١٠ دقايق في اليوم على نفس المقطع لمدة ٣–٥ أيام أحسن من مقطع جديد كل يوم. لما تحس إنك «بتقول» المقطع بنفس إيقاعه، غيّره.

وأحسن مصادر: talks تقنية (بتعلّمك جمل الشغل)، و BBC 6 Minute English (معاه transcript)، وحتى مقاطع من انترفيوهات mock على YouTube.`,
          example: R`Step 1:  Pick a 1-2 minute clip with a transcript. Clear speaker. Your level.
Step 2:  Listen twice while reading the transcript.
Step 3:  Read the transcript aloud together with the audio.
Step 4:  No transcript: speak together with the audio, one or two seconds behind.
Step 5:  Record yourself shadowing. Compare with the original.
Focus:  Copy the rhythm and the stress, not only the words. Where do they pause? Which words are loud?
Sample:  "So, what we're going to do today | is build a REST API | with Node and Express."
Repeat:  Same clip for 3 to 5 days, 10 minutes a day, then change it.`,
          try: R`اختار مقطع دقيقة من talk تقني أو من BBC 6 Minute English (ومعاه النص). اعمل الـ ٥ خطوات النهارده، وسجّل الخطوة الخامسة. وكرر نفس المقطع ٣ أيام وسجّل كل يوم. في اليوم التالت، اسمع تسجيل اليوم الأول والتالت ورا بعض.`,
          flag: "script",
          deep: {
            why: R`النطق والإيقاع بيتعلموا بالتقليد مش بالقواعد. والـ shadowing بيخلي بقك يتعود على حركات الإنجليزي (الـ stress، والكلمات المتوصلة، والكلمات الضعيفة) من غير ما تفكر فيها. ولأنه بيخليك تتكلم بسرعة طبيعية، بيكسر عادة «أفكر في كل كلمة قبل ما أقولها».`,
            how: R`ركّز على ٣ حاجات بالترتيب: ١) الإيقاع: فين بيوقف، وأنهي كلمات أعلى (الكلمات المهمة: أسماء وأفعال بتتقال أعلى، و [[the]] و [[to]] و [[of]] بتتقال ضعيفة). ٢) الكلمات المتوصلة ([[going to]] = «گونا»، و [[what are]] = «واتَر»). ٣) الأصوات الفردية (th و p و v).

علّم النص: حط [[|]] مكان الوقفات، وخط تحت الكلمات المضغوطة. زي المثال: [[So, what we're going to do today | is build a REST API | with Node and Express.]]

متقلدش اللكنة بالظبط لو مش عايز: الهدف الوضوح، مش إنك تبقى أمريكي. بس الإيقاع والضغط مهمين في أي لكنة.

وفي الأول هتتلخبط وتتأخر: ده طبيعي. لو صعب جدًا، اشتغل على جملة جملة (وقّف بعد كل جملة) لحد ما تقدر تمشي مع الصوت.`,
            when: "كل يوم ٥–١٠ دقايق، ويفضّل الصبح أو قبل اجتماع مهم كـ «تسخين».",
            mistakes: R`تغيّر المقطع كل يوم. وتختار مقطع سريع جدًا أو من غير نص. وتركّز على الكلمات وتنسى الإيقاع (فتطلع صح بس «آلي»). ومتسجلش نفسك (فمش هتعرف اتحسنت ولا لأ). وتعمله بصوت واطي جدًا: قوله بصوت كلام عادي.`
          },
          lines: [
            R`الخطوة ١: مقطع دقيقة أو اتنين، معاه نص، ومتكلم واضح، ومن مستواك.`,
            R`الخطوة ٢: اسمع مرتين وانت بتقرا النص.`,
            R`الخطوة ٣: اقرا النص بصوت عالي مع الصوت.`,
            R`الخطوة ٤: من غير النص: اتكلم مع الصوت، متأخر ثانية أو اتنين.`,
            R`الخطوة ٥: سجّل نفسك وقارن بالأصلي.`,
            R`التركيز: قلّد الإيقاع والضغط، مش الكلمات بس. فين بيوقف؟ أنهي كلمات أعلى؟`,
            R`مثال لنص متعلّم: الـ | مكان الوقفة. going to بتتقال «گونا».`,
            R`نفس المقطع ٣–٥ أيام، ١٠ دقايق في اليوم، وبعدين غيّره.`
          ],
          sol: R`الفرق المتوقع بين تسجيل اليوم الأول والتالت: الأول متقطع ومتأخر عن الصوت وفيه كلمات مبلوعة. التالت أقرب لإيقاع الأصلي، والوقفات في مكانها، والكلمات الضعيفة ([[to]] و [[the]]) بقت ضعيفة فعلًا.

لو ملاحظتش فرق، غالبًا المقطع صعب عليك: اختار أبطأ، أو اشتغل على نص المقطع بس (٣٠ ثانية).

علامة نجاح مهمة: لو لقيت نفسك في اجتماع أو تسجيل تاني بتقول جملة من المقطع (زي [[So, what we're going to do today is...]]) بنفس الإيقاع، ده معناه إن الـ shadowing اشتغل: الجملة بقت بتاعتك.`
        },
        {
          cmd: "تسجّل نفسك",
          title: "تسجّل نفسك وتقيّم: checklist من ٦ نقط، و transcript بالـ AI يوريك اتفهمت ولا لأ",
          desc: R`أغلب الناس بتكره تسمع صوتها. بس ده أهم تمرين في التاب كله: انت مش بتسمع نفسك وانت بتتكلم (المخ مشغول)، فمش عارف غلطاتك. التسجيل بيوريك.

الأداة: مسجّل الصوت في الموبايل كفاية. وسمّي كل ملف بالتاريخ والموضوع ([[2026-10-01 standup]]).

الـ checklist (بعد كل تسجيل، اسمع مرة وعلّم): ١) السرعة: مريحة ولا بتجري؟ ٢) السكوت و [[ehh]]: كام مرة؟ ٣) صوت أو اتنين من اللي بتشتغل عليهم (p و v و th). ٤) الكلمات التقنية: النطق والضغط؟ ٥) الأزمنة: ماضي في الماضي؟ ٦) الوضوح: لو حد مش عارفك سمعه، هيفهم؟

والحيلة: حوّل التسجيل لنص بأداة speech-to-text (زي الـ transcription في Google Docs أو الموبايل أو أي تطبيق AI). لو الأداة كتبت كلمة غلط، غالبًا نطقك للكلمة دي مش واضح. ده اختبار «اتفهمت ولا لأ» مجاني.`,
          example: R`File name:  2026-10-01 standup.m4a
1. Speed:  comfortable / too fast / too slow
2. Fillers:  "ehh" x5, long pauses x2
3. Sounds:  p/b ok, v/f 2 mistakes ("serfer"), th ok
4. Tech words:  "determine" wrong stress, "cache" ok
5. Grammar:  "Yesterday I fix" → "fixed"
6. Clear to a stranger?  mostly yes
Transcript check:  the tool wrote "queue" as "cue you" → practice "queue"
Monthly:  listen to day 1 and day 30 back to back.`,
          try: R`سجّل نفسك دقيقة واحدة بتجاوب على [[What did you work on this week?]] (من غير تحضير). اسمعه وعبّي الـ checklist في [[log.md]]. وبعدين حوّله لنص بأي أداة speech-to-text، ولقّط كل كلمة الأداة كتبتها غلط. دي قايمة الأسبوع ده في [[sounds.md]].`,
          flag: "script",
          deep: {
            why: R`من غير تسجيل، انت بتتدرب على العمى: بتكرر نفس الغلطات ومش عارف. والتسجيل الشهري هو كمان أكبر مصدر حماس: لما تسمع يوم ١ ويوم ٣٠ ورا بعض، الفرق بيبان جدًا، وده بيخليك تكمّل.`,
            how: R`متقيّمش كل حاجة كل مرة: اختار ٢–٣ نقط من الـ checklist الأسبوع ده، حسب اللي بتشتغل عليه.

الـ transcript بالـ AI: أدوات speech-to-text الحديثة شاطرة جدًا، وأحيانًا بتفهم كلام مش واضح وتكتبه صح (بتخمّن من السياق). فلو كتبت الكلمة صح، ده مش ضمان إن نطقك ممتاز. بس لو كتبتها غلط، ده دليل قوي إن فيه مشكلة. استخدمها كإشارة، مش كحكم نهائي.

ولو عايز رأي في النطق: اطلب من صاحب إنجليزيته كويسة، أو مجتمعات تعلم اللغة، أو مدرس. الـ AI ممكن يساعد في الـ grammar من الـ transcript، بس تقييم النطق منه لسه مش مضمون ١٠٠٪.

خلي التسجيلات: فولدر على الموبايل أو Google Drive. التسجيل اللي بتكرهه النهارده هو اللي هيفرّحك بعد ٣ شهور.`,
            when: "٢–٣ مرات في الأسبوع على الأقل، وقبل أي انترفيو مهم (سجّل الإجابات الأساسية).",
            mistakes: R`تسجّل ومتسمعش. وتسمع وتقول «وحش» من غير ما تحدد إيه الوحش (الـ checklist بتحل ده). وتمسح التسجيلات القديمة (هتحتاجها للمقارنة). وتحاول تصلح كل حاجة مرة واحدة. وتعتمد على تقييم AI للنطق كأنه حقيقة.`
          },
          lines: [
            R`اسم الملف بالتاريخ والموضوع، عشان تقارن بعدين.`,
            R`السرعة: مريحة، ولا سريعة، ولا بطيئة.`,
            R`الحشو: عدد ehh والسكتات الطويلة.`,
            R`الأصوات: p و v و th. هنا غلطتين في v.`,
            R`الكلمات التقنية: determine الضغط غلط، و cache تمام.`,
            R`الـ grammar: fix ← fixed.`,
            R`الوضوح لحد غريب: غالبًا آه.`,
            R`الـ transcript: الأداة كتبت queue غلط ← اتمرن عليها.`,
            R`كل شهر: اسمع يوم ١ ويوم ٣٠ ورا بعض.`
          ],
          sol: R`مثال لـ [[log.md]] بعد أول تسجيل:
[[2026-10-01 — "this week" (1 min)]]
[[Speed: too fast at the start, better after 20s]]
[[Fillers: ehh x7, one 5-second pause]]
[[Sounds: "develop" said "defelop"]]
[[Grammar: "I am work on" → "I'm working on"]]
[[Transcript: "Nginx" → "engine necks", "suite" → "suit"]]
[[This week: v sound + "I'm working on"]]

المتوقع في أول تسجيل: ٥–١٠ [[ehh]]، و ٢–٤ غلطات أصوات، و ١–٣ غلطات أزمنة. ده طبيعي جدًا. المهم إنك تختار ٢ بس تشتغل عليهم الأسبوع ده، وتسجّل نفس السؤال بعد أسبوع وتقارن.`
        },
        {
          cmd: "٣٠ يوم ١٥ دقيقة",
          title: "خطة ٣٠ يوم للكلام: ١٥ دقيقة في اليوم، أسبوع لكل هدف",
          desc: R`خطة القراية والكتابة (٢٠ دقيقة في اليوم لـ ٩٠ يوم) في درس [[٢٠ دقيقة في اليوم]] في «تاب إنجليزي للمبرمج: قراية وكتابة». دي خطة الكلام: ٣٠ يوم، ١٥ دقيقة في اليوم، وممكن تمشي مع التانية أو بعدها.

كل يوم ٣ أجزاء ثابتة: ٥ دقايق سمع (من مستواك)، و ٥ دقايق shadowing أو تكرار جمل، و ٥ دقايق كلام متسجّل (الموضوع بيتغير كل أسبوع). وكل أسبوع ليه هدف:
الأسبوع ١: الأصوات والكلمات التقنية (دروس «تسمع وتنطق» و «كلمات تقنية بننطقها غلط»).
الأسبوع ٢: الشغل اليومي: standup، وطلب مساعدة، ومكالمات.
الأسبوع ٣: الشرح: PR، و demo، ومفهوم تقني بالقالب.
الأسبوع ٤: الانترفيو: about yourself، وقصتين STAR، و mock interview.

ويوم ٣٠: نفس التسجيل بتاع يوم ١ (نفس السؤال)، وقارن.`,
          example: R`Every day (15 min):  5 listen + 5 shadow/repeat + 5 speak and record
Day 1:  Record "Tell me about yourself" with no preparation. Keep it. Don't judge it yet.
Week 1 (sounds):  p/v, th, -ed endings, stress, 20 tech words (cache, queue, Nginx, determine...)
Week 2 (daily work):  a standup every day, 5 "help / clarify" phrases, video-call phrases
Week 3 (explaining):  explain one PR, one demo, and one concept (cache, REST, index) with the template
Week 4 (interview):  about yourself (3 times), 2 STAR stories, 1 technical concept, 1 mock interview with AI
Weekly:  one 1-minute recording on the same question, and one line in log.md
Day 30:  Record "Tell me about yourself" again. Listen to day 1 and day 30 back to back.
Missed a day?  Don't double up. Just continue tomorrow.`,
          try: R`النهارده يوم ١: سجّل «Tell me about yourself» من غير أي تحضير، وسيبه من غير ما تسمعه. واكتب الخطة في [[log.md]] بمواعيدك انت (إمتى الـ ١٥ دقيقة كل يوم؟)، وحط تذكير في الموبايل. وبعدين اعمل أول ١٥ دقيقة: ٥ سمع، و ٥ shadowing، و ٥ كلام عن أصوات p و v.`,
          flag: "script",
          deep: {
            why: R`الكلام بيتحسن بالتكرار اليومي الصغير، زي الرياضة. و ١٥ دقيقة صغيرة كفاية إنك متبطّلش. والهدف الأسبوعي بيخليك تركز بدل ما تتشتت. وتسجيل يوم ١ و ٣٠ هو الدليل اللي بيخليك تكمّل الشهر التاني.`,
            how: R`الميعاد الثابت أهم من الطول: مثلًا أول ١٥ دقيقة قبل ما تفتح الإيميل، أو في المواصلات (السمع والـ shadowing بالسماعة، والكلام لما توصل).

الكلام الـ ٥ دقايق: سجّل على الموبايل. مش لازم تسمعه كل يوم؛ اسمع مرتين في الأسبوع بالـ checklist (درس «تسجّل نفسك»).

لو عندك شغل حقيقي بالإنجليزي: استخدمه كتمرين. الـ standup الحقيقي هو تمرين الأسبوع ٢. والـ PR الحقيقي هو تمرين الأسبوع ٣.

بعد الـ ٣٠ يوم: كرر الخطة بمستوى أعلى (سمع أسرع، وقصص STAR أكتر، و mock interviews أكتر)، أو ركّز على أضعف أسبوع.

والـ AI مفيد في الأسبوع ٤ (الدرس الجاي)، وفي تصحيح الـ grammar من الـ transcripts. بس الكلام لازم يطلع منك انت.`,
            when: "ابدأ النهارده. ولو عندك انترفيو بعد شهر، ده بالظبط وقتها.",
            mistakes: R`تعمل ساعتين أول يوم وتبطّل تالت يوم. وتعوّض يوم فايت بـ ٣٠ دقيقة (بتحس بذنب وتبطّل). ومتسجلش يوم ١ (مش هتشوف الفرق). وتسمع بس من غير ما تتكلم (السمع لوحده مش بيحسّن الكلام كفاية). وتقيّم نفسك كل يوم بقسوة.`
          },
          lines: [
            R`كل يوم ١٥ دقيقة: ٥ سمع، و ٥ shadowing أو تكرار، و ٥ كلام متسجّل.`,
            R`يوم ١: سجّل «about yourself» من غير تحضير، واحتفظ بيه ومتحكمش عليه.`,
            R`الأسبوع ١: الأصوات والكلمات التقنية.`,
            R`الأسبوع ٢: الشغل اليومي: standup ومساعدة ومكالمات.`,
            R`الأسبوع ٣: الشرح: PR و demo ومفهوم تقني.`,
            R`الأسبوع ٤: الانترفيو: about yourself، و STAR، ومفهوم، و mock مع AI.`,
            R`كل أسبوع: تسجيل دقيقة على نفس السؤال، وسطر في log.md.`,
            R`يوم ٣٠: نفس تسجيل يوم ١، واسمعهم ورا بعض.`,
            R`فوّت يوم؟ متضاعفش. كمّل بكرة.`
          ],
          sol: R`شكل [[log.md]] بعد أسبوع:
[[Plan: 8:00-8:15 every day, before email]]
[[Day 1: recorded "about yourself" (1:40, not listened yet)]]
[[Day 2: BBC 6 min (5) + shadowing (5) + p/v sentences (5)]]
[[Day 3: ... + th sentences]]
[[Day 5: missed]]
[[Day 6: ... + -ed endings, standup recording]]
[[Week 1 check: "determine" and "cache" fixed; v still hard]]

المتوقع يوم ٣٠ مقارنة بيوم ١: المدة أقصر وأوضح (بتقول نقط مترتبة بدل ما تلف)، و [[ehh]] أقل للنص تقريبًا، وأسماء الـ stack بتتنطق صح، والأزمنة أنضف. النطق العام بيتحسن أبطأ من الباقي: ده طبيعي، كمّل شهر تاني.`
        },
        {
          cmd: "mock interview بالـ AI",
          title: "mock interview بالصوت مع AI: سكريبت جاهز، وإزاي تستخدمه بأمان",
          desc: R`تطبيقات الـ AI الحديثة (زي ChatGPT و Gemini و Claude، حسب اللي متاح عندك) فيها voice mode: بتكلمه بصوتك ويرد بصوت. وده بديل ممتاز لشريك تدريب، خصوصًا الساعة ١ بالليل قبل انترفيو. بس لازم تستخدمه صح.

الاستخدام الصح: هو الإنترفيوير، وانت اللي بتتكلم. تديله سيناريو واضح (الدور، والشركة، ونوع الأسئلة، وقد إيه صعب)، وتطلب منه يسأل سؤال واحد في المرة ويستنى إجابتك، ويعمل follow-ups، وفي الآخر يدّيك feedback مكتوب على الإجابات والإنجليزي.

الأمان: ١) متحطش أي حاجة سرية: كود الشركة، أو بيانات عملاء، أو تفاصيل عقد عليه NDA. ٢) شوف إعدادات الخصوصية في التطبيق (هل المحادثات بتتستخدم في التدريب، وهل التسجيلات بتتحفظ). ٣) الـ AI ممكن يغلط في المعلومات التقنية وفي تقييم النطق: خد الـ feedback كرأي مش كحقيقة. ٤) ممنوع تستخدمه أثناء الانترفيو الحقيقي إلا لو الشركة سمحت صراحة. ٥) متحفظش إجاباته هو: الإجابة لازم تبقى قصتك انت.`,
          example: R`Prompt:  You are a friendly but strict interviewer for a junior full-stack developer role at a small product company.
Prompt:  Ask me one question at a time and wait for my answer. Don't answer for me.
Prompt:  Start with "Tell me about yourself", then two behavioural questions, then two technical questions about JavaScript and databases.
Prompt:  Ask one follow-up question after each answer, like a real interviewer.
Prompt:  Speak at a normal speed. If I ask you to repeat, repeat more slowly.
Prompt:  At the end, give me written feedback: for each answer, one strength, one weakness, and my English mistakes with corrections.
Prompt:  Be honest. Don't just say "great answer".
Safety:  No company code, no client data, nothing under NDA. Check the app's privacy settings.
Safety:  AI feedback on pronunciation and technical facts can be wrong. Double-check.`,
          try: R`افتح voice mode في أي تطبيق AI متاح عندك، وابعت السكريبت ده (مكتوب أو بالصوت)، واعمل mock interview ١٥–٢٠ دقيقة. في الآخر اطلب الـ feedback والـ transcript. اكتب في [[log.md]]: أحسن إجابة، وأضعف إجابة، و ٣ غلطات إنجليزي اتكررت. وقارن الـ feedback بالـ checklist بتاعتك: متفق معاها؟`,
          flag: "script",
          deep: {
            why: R`أكبر مشكلة في التدريب على الانترفيو بالإنجليزي إنك مش لاقي حد يتمرن معاك كل يوم. والـ AI بالصوت بيحل ده: متاح طول الوقت، وصبور، وبيقدر يسأل follow-ups. بس لو استخدمته غلط (يكتبلك الإجابات، أو يمدحك على كل حاجة، أو تحطله أسرار الشغل) هيضرك أكتر ما يفيدك.`,
            how: R`اجعله صعب بالتدريج: أول مرة [[friendly]] وأسئلة معروفة، وبعدين [[strict]] وأسئلة مفاجئة، وبعدين اطلب منه يقاطعك أو يتكلم أسرع، أو يعمل لكنة معينة لو التطبيق بيدعم.

بعد الـ mock: اطلب الـ transcript، واقراه وانت بتدوّر على: جمل طويلة متلخبطة، و [[ehh]] كتير، وأزمنة غلط. الـ transcript نفسه أهم من الـ feedback أحيانًا.

الـ feedback: اطلب إنه يكون محدد ([[one strength, one weakness, and English mistakes with corrections]]). ولو قال حاجة عن النطق، اتأكد منها بـ YouGlish أو القاموس قبل ما تصدّق.

كرر نفس السؤال الضعيف في mock تاني بعد يومين، وقارن.

وتفاصيل استخدام الـ AI كمساعد مش بديل في درس [[AI يشرح مش يترجم]] في «تاب إنجليزي للمبرمج: قراية وكتابة».`,
            when: "الأسبوع ٤ من الخطة، وقبل أي انترفيو حقيقي بأسبوع (٣–٤ mocks)، وأي وقت عايز تتمرن ومفيش حد.",
            mistakes: R`تطلب منه يكتبلك إجابة وتحفظها. وتحط كود أو بيانات من شغلك. وتصدّق كل feedback (خصوصًا في النطق). وتستخدمه في انترفيو حقيقي من غير إذن (ممكن يتكشف ويتلغي الترشيح). وتعمل mock مكتوب بدل صوت (التاب ده عن الكلام!). وتقبل [[Great answer!]] على كل حاجة من غير ما تطلب نقد.`
          },
          lines: [
            R`الدور: «انت إنترفيوير ودود بس صارم لدور junior full-stack في شركة منتج صغيرة».`,
            R`«اسأل سؤال واحد في المرة واستنى إجابتي. متجاوبش بدالي».`,
            R`الترتيب: about yourself، وسؤالين سلوكيين، وسؤالين تقنيين في JS والداتابيز.`,
            R`«اسأل follow-up بعد كل إجابة، زي إنترفيوير حقيقي».`,
            R`«اتكلم بسرعة عادية. لو طلبت تعيد، عيد أبطأ».`,
            R`«في الآخر feedback مكتوب: لكل إجابة نقطة قوة ونقطة ضعف، وغلطات الإنجليزي بتصحيحها».`,
            R`«كن صريح. متقولش great answer وخلاص».`,
            R`الأمان: مفيش كود شركة، ولا بيانات عملاء، ولا حاجة تحت NDA. وشوف إعدادات الخصوصية.`,
            R`الأمان: تقييم الـ AI للنطق والمعلومات التقنية ممكن يغلط. اتأكد بنفسك.`
          ],
          sol: R`شكل [[log.md]] بعد أول mock:
[[Mock 1 (AI, voice, 18 min)]]
[[Best: STAR "learned fast" — clear, had numbers]]
[[Weakest: "What is a closure?" — no example, long pause]]
[[English: "I am agree", "Yesterday I fix", "discuss about" (x2)]]
[[Next: prepare closure with the 4-step template, redo in 2 days]]

المتوقع: الـ AI هيلقط غلطات الـ grammar كويس جدًا من الـ transcript، وهيدّي feedback معقول على هيكل الإجابات (فيه مثال؟ فيه أرقام؟). بس تعليقاته على النطق ممكن تبقى عامة أو غلط، لأنه غالبًا بيشتغل على النص اللي فهمه من صوتك.

علامة إنك استخدمته صح: الإجابات كلها منك، وفيه غلطات محددة هتشتغل عليها، وناوي تكرر. وعلامة الاستخدام الغلط: عندك ملف فيه «إجابات الـ AI المثالية» بتحفظه.`
        }
      ]
    }
]);
