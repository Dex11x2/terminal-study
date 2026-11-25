MORE("dea1", [
    {
      t: "الشغل (Arbeit und Beruf)",
      l: 2,
      pre: ["dea1/Hier darf man nicht rauchen", "dea1/Prüfung: Sprechen Teil 1"],
      n: R`بتشتغل إيه وفين، ويوم شغلك ماشي إزاي، وتفهم تعليمات المدير وتحذيرات الأمان، وتقرا إعلان وظيفة وتقول عايز تشتغل إيه، وتحكي عملت إيه امبارح، وتبلّغ إنك عيان. والقواعد الكبيرة هنا تلاتة: **الأمر** ([[Rufen Sie bitte an!]]، [[Komm bitte!]])، و [[wollen]] و [[werden]]، وأول **ماضي** حقيقي، الـ Perfekt ([[Ich habe viel gearbeitet]]، [[Ich bin nach Hause gefahren]]). والوحدة بتنتهي بتدريب Schreiben Teil 2 (إيميل اعتذار للشغل) و Hören Teil 3 (رسايل تليفون) و Sprechen Teil 2 على موضوع «Arbeit».`,
      goal: [R`تقول شغلانتك وفين بتشتغل ([[Ich bin Krankenpfleger]]، [[Ich arbeite als Fahrer bei einer Firma]])، وتفرّق الراجل من الست ([[Lehrer]] / [[Lehrerin]])`, R`تحكي يوم شغلك ومواعيده ([[Ich arbeite von acht bis fünf]]، [[Ich habe dreißig Minuten Pause]])، وتفهم جدول ورديات`, R`تفهم تعليمات وتحذيرات بالأمر وترد عليها ([[Schicken Sie bitte die E-Mail!]] ← [[Okay, mache ich.]])، وتطلب الإعادة`, R`تقرا إعلان وظيفة، وتقول عايز تبقى إيه ([[Ich will Ärztin werden]]) وبتعرف تعمل إيه كويس`, R`تحكي عملت إيه بالـ Perfekt ([[Gestern habe ich lange gearbeitet]]، [[Ich bin zu Hause geblieben]])`, R`تكتب إيميل اعتذار للشغل (Schreiben Teil 2)، وتفهم رسايل التليفون (Hören Teil 3)، وتسأل وتجاوب عن الشغل (Sprechen Teil 2)`],
      time: "حوالي ١٠ ساعات",
      projects: [
        { lvl: 'صغير', t: R`بطاقة شغلانات عيلتك`, what: R`اكتب ٦ جمل عن شغل ناس من عيلتك وصحابك: كل واحد بيشتغل إيه، وفين ([[bei]] أو [[in]])، ومن إمتى لإمتى. ولازم يبقى فيه راجلين وستين على الأقل عشان تستخدم [[-in]].`,
          done: R`٦ جمل، الشغلانة من غير أداة بعد [[sein]]، و [[-in]] مع الستات، وجملة بـ [[als]] وجملة بـ [[bei]] + Dativ`,
          sol: R`**نسخة نموذجية:**

~~~de
Mein Vater ist Ingenieur. Er arbeitet bei einer Baufirma.
Meine Mutter ist Lehrerin. Sie arbeitet in einer Grundschule.
Mein Bruder arbeitet als Fahrer.
Meine Schwester ist Studentin. Sie studiert Medizin.
Mein Onkel hat ein Geschäft in Alexandria.
Meine Freundin Nora ist Ärztin im Krankenhaus.
~~~

**ليه كده:** بعد [[ist]] الشغلانة من غير [[ein]] ([[Er ist Ingenieur]]). و [[Lehrerin]] و [[Studentin]] و [[Ärztin]] بـ [[-in]] للست، و [[Arzt]] ← [[Ärztin]] بياخد ¨ كمان. و [[als Fahrer]] = «بشغلانة سوّاق». و [[bei einer Baufirma]] و [[in einer Grundschule]]: بعد [[bei]] و [[in]] الأداة Dativ، فـ [[eine]] ← [[einer]] (زي [[in der]]).` },
        { lvl: 'صغير', t: R`جدول أسبوعك`, what: R`اعمل جدول أسبوع شغلك أو مذاكرتك (من الاتنين للأحد)، وبعدين اكتب ٦ جمل عنه: إمتى بتبدأ وبتخلص، والبريك، واليوم الإجازة، وكام ساعة في الأسبوع.`,
          done: R`الجدول ٧ أيام، و ٦ جمل فيهم [[von … bis]] و [[Pause]] و [[frei]]، والحساب الأسبوعي صح`,
          sol: R`**نسخة نموذجية:**

~~~text Wochenplan
Mo–Do  8:00–16:30  (Pause 12:00–12:30)
Fr     8:00–13:00
Sa, So frei
~~~

~~~de
Von Montag bis Donnerstag arbeite ich von acht bis halb fünf.
Ich habe eine halbe Stunde Pause.
Am Freitag arbeite ich nur bis eins.
Am Samstag und am Sonntag habe ich frei.
Ich arbeite siebenunddreißig Stunden in der Woche.
Das ist eine Vollzeitstelle.
~~~

**ليه كده:** الحساب: ٤ أيام × ٨ ساعات (٨:٠٠–١٦:٣٠ ناقص نص ساعة بريك) = ٣٢، والجمعة ٥ (٨:٠٠–١٣:٠٠)، يبقى المجموع ٣٧ ساعة: [[siebenunddreißig Stunden]]. و [[eine halbe Stunde]] = نص ساعة. و [[frei haben]] = يبقى عنده إجازة. و [[Vollzeit]] = دوام كامل (حوالي ٣٥–٤٠ ساعة)، و [[Teilzeit]] = نص دوام.` },
        { lvl: 'متوسط', t: R`أول يوم في الشغل: تعليمات`, what: R`اكتب حوار (١٠ سطور) بين مديرة وموظف جديد في أول يوم: المديرة بتدّيله ٤ تعليمات بالأمر بـ [[Sie]]، وهو بيرد على كل واحدة، ومرة مش بيفهم وبيطلب الإعادة. وسجّل الدورين.`,
          done: R`٤ أوامر بـ [[Sie]] (الفعل الأول و [[Sie]] بعده)، ورد على كل واحد ([[Okay, mache ich]] أو [[Gern]])، وطلب إعادة، وفعل بيتقسم في أمر واحد على الأقل`,
          sol: R`**نسخة نموذجية:**

~~~de Chefin=f Ali=m
Chefin: Guten Morgen, Herr Said! Willkommen im Team. || صباح الخير يا أستاذ سعيد! أهلًا بيك في الفريق.
Ali: Guten Morgen! Danke schön. || صباح الخير! شكرًا.
Chefin: Hier ist Ihr Computer. Lesen Sie bitte zuerst die E-Mails. || ده الكمبيوتر بتاعك. اقرا الإيميلات الأول لو سمحت.
Ali: Okay, mache ich. || ماشي، هعمل كده.
Chefin: Rufen Sie dann bitte Frau Klein an. Die Nummer ist im Telefon. || وبعدين كلّم مدام كلاين. الرقم في التليفون.
Ali: Entschuldigung, wen soll ich anrufen? || آسف، أكلّم مين؟
Chefin: Frau Klein, von der Buchhaltung. || مدام كلاين، من الحسابات.
Ali: Ah, gut. Alles klar. || آه، تمام.
Chefin: Und kommen Sie um zwölf Uhr in die Küche. Wir essen zusammen. || وتعالى الساعة ١٢ المطبخ. هناكل مع بعض.
Ali: Gern, vielen Dank! || أكيد، شكرًا جدًا!
~~~

**ليه كده:** الأمر بـ [[Sie]]: الفعل الأول وبعده [[Sie]] ([[Lesen Sie]]، [[Kommen Sie]]). و [[anrufen]] بيتقسم: [[Rufen Sie … an]]. و [[Okay, mache ich]] و [[Alles klar]] = فهمت وهعمل (هدف بالاسم في منهج الاندماج). و [[Wen soll ich anrufen?]] = أكلّم مين؟ ([[wen]] = مين في المفعول). و [[von der Buchhaltung]] خدها كده.` },
        { lvl: 'متوسط', t: R`رد على إعلان وظيفة`, what: R`اقرا الإعلان ده واكتب رسالة قصيرة (٥–٦ جمل) لصاحب الشغل: إنت مين، وبتعرف تعمل إيه، وعايز تشتغل إمتى، وتسأل سؤال واحد.

الإعلان: [[Café am Markt sucht Aushilfe (m/w/d), Teilzeit, Wochenende. Deutschkenntnisse A1–A2. Bewerbung per E-Mail an Herrn Busch.]]`,
          done: R`الرسالة فيها [[Sehr geehrter Herr Busch]]، وجملة عن الإعلان، وحاجتين بتعرف تعملهم بـ [[Ich kann …]]، و [[am Wochenende]]، وسؤال، و [[Mit freundlichen Grüßen]]`,
          sol: R`**نسخة نموذجية:**

~~~de
Sehr geehrter Herr Busch,
ich habe Ihre Anzeige gelesen und möchte gern im Café arbeiten.
Ich heiße Mona Adel und bin vierundzwanzig Jahre alt.
Ich habe in Kairo zwei Jahre in einem Restaurant gearbeitet.
Ich kann gut mit Kunden sprechen und ich lerne Deutsch.
Am Samstag und am Sonntag habe ich Zeit.
Wie viele Stunden sind es pro Woche?
Mit freundlichen Grüßen
Mona Adel
~~~

**ليه كده:** [[Sehr geehrter Herr …]] لما تكتب لحد رسمي متعرفوش (لست: [[Sehr geehrte Frau …]])، وفي الآخر [[Mit freundlichen Grüßen]]. و [[ich habe … gelesen]] و [[ich habe … gearbeitet]] Perfekt، وده الدرس الخامس. و [[(m/w/d)]] في أي إعلان ألماني = راجل أو ست أو غيرهم، يعني الوظيفة للكل. و [[Aushilfe]] = حد بيساعد بالساعة، و [[Deutschkenntnisse]] = مستوى الألماني.` },
        { lvl: 'كبير', t: R`امتحان Sprechen Teil 2 بموضوع «Arbeit»`, what: R`اعمل ٨ كروت كلمات لموضوع «Arbeit» (زي [[Beruf]]، [[Kollegen]]، [[Pause]]، [[Urlaub]]، [[Chef]]، [[Feierabend]]، [[Geld]]، [[Büro]])، واقلبهم. اسحب كارت، اسأل سؤال بصوت عالي وجاوبه. سجّل الكروت كلها وصحّح بالمعايير.`,
          done: R`٨ أسئلة كلها بفعل وعن موضوع الشغل، و ٨ إجابات جمل كاملة، وكل سؤال بطريقة مختلفة (W-Frage أو الفعل الأول)`,
          sol: R`**أسئلة وإجابات نموذجية:**

~~~de
Was bist du von Beruf? Ich bin Verkäuferin. || كارت Beruf
Wie sind deine Kollegen? Sie sind sehr nett. || كارت Kollegen
Wann hast du Pause? Um zwölf Uhr. || كارت Pause
Wohin fährst du im Urlaub? Ich fahre nach Alexandria. || كارت Urlaub
Ist dein Chef freundlich? Ja, er ist sehr freundlich. || كارت Chef
Wann hast du Feierabend? Um fünf Uhr. || كارت Feierabend
Verdienst du gut? Es geht. || كارت Geld
Arbeitest du in einem Büro? Nein, ich arbeite im Geschäft. || كارت Büro
~~~

**إزاي تصحح:** كل سؤال ٢ وكل إجابة ١، والنص لو مفهوم بس فيه حاجة بتلخبط. والكارت [[Geld]] في موضوع الشغل ← سؤال عن المرتب، مش عن الأسعار. و [[Es geht]] = ماشي الحال، إجابة قصيرة بس كاملة. و [[Wohin]] (لفين) للحركة، وهتشوفه أكتر في وحدة المواصلات.` },
        { lvl: 'فكرة', t: R`اقرا إعلانات شغل حقيقية`, what: R`ادخل على موقع وظايف ألماني (زي موقع وكالة العمل الاتحادية «Jobbörse» أو StepStone) واكتب في البحث شغلانتك. اختار ٣ إعلانات واكتب لكل واحد بالعربي: الشغلانة، وكام ساعة ([[Vollzeit]] ولا [[Teilzeit]])، ومن إمتى، والمطلوب منك، ومستوى الألماني.`,
          done: R`٣ إعلانات متفكّكين بالعربي، وكلمات الإعلان المتكررة مفهومة ([[m/w/d]]، [[ab sofort]]، [[Erfahrung]]، [[Kenntnisse]])`,
          sol: R`**كلمات هتلاقيها في أي إعلان وظيفة:**

| مكتوب | معناه |
|---|---|
| [[(m/w/d)]] | راجل / ست / غيرهم: الوظيفة للكل |
| [[Vollzeit]] / [[Teilzeit]] | دوام كامل / نص دوام |
| [[ab sofort]] | من دلوقتي |
| [[befristet]] / [[unbefristet]] | عقد لمدة / عقد مفتوح |
| [[Erfahrung]] | خبرة |
| [[Deutschkenntnisse B1]] | ألماني مستوى B1 |
| [[Schichtarbeit]] | شغل ورديات |
| [[Wir bieten]] | إحنا بنقدّم (المميزات) |
| [[Ihre Aufgaben]] | المطلوب منك |

**ليه كده:** أغلب إعلانات الشغل في ألمانيا بتطلب ألماني B1 أو أكتر، فمتتخضّش. الفايدة هنا إنك تتعود على شكل الإعلان، ومنهج الاندماج بيطلب بالاسم «يفهم أهم حاجة في إعلان وظيفة». والكلمات دي أغلبها مش في قايمة A1، بس هي هي في كل إعلان.` },
      ],
      items: [
        {
          cmd: "Was sind Sie von Beruf?",
          title: "بتشتغل إيه؟ الشغلانات، و -in، و als و bei",
          pre: ["dea1/Prüfung: Sprechen Teil 1", "dea1/Das Sofa steht im Wohnzimmer"],
          desc: R`[[Was sind Sie von Beruf?]] أو [[Was machst du beruflich?]] (بتشتغل إيه؟). والإجابة: [[Ich bin Lehrerin.]] **من غير** [[eine]]، عكس الإنجليزي.

وهتعرف كمان إزاي تقول فين بتشتغل: [[bei einer Firma]] (عند شركة)، و [[in einem Krankenhaus]] (في مستشفى)، و [[als Fahrer]] (بشغلانة سواق). وإزاي كل شغلانة ليها شكل للست بـ [[-in]].`,
          teach: R`## الموقف

في أول يوم كورس، المدرّسة بتسأل كل واحد بيشتغل إيه. (Goethe: «Arbeitsplatz» وموضوع Beruf في Sprechen Teil 1، و Rahmencurriculum: يتكلم عن شغله.)

~~~de Lehrerin=f Omar=m Dina=f
Lehrerin: Herr Nabil, was sind Sie von Beruf? || أستاذ نبيل، حضرتك بتشتغل إيه؟
Omar: Ich bin Ingenieur. Ich arbeite bei einer Baufirma. || أنا مهندس. بشتغل في شركة مقاولات.
Lehrerin: Und Sie, Frau Kamal? || وحضرتك يا مدام كمال؟
Dina: Ich bin Krankenschwester. Aber hier in Deutschland arbeite ich jetzt als Pflegehelferin. || أنا ممرضة. بس هنا في ألمانيا بشتغل دلوقتي مساعدة تمريض.
Lehrerin: Wo arbeiten Sie? || بتشتغلي فين؟
Dina: In einem Krankenhaus in Köln. Und Sie? Sind Sie nur Lehrerin? || في مستشفى في كولونيا. وحضرتك؟ مدرّسة بس؟
Lehrerin: Ja, ich bin nur Lehrerin. Das ist genug Arbeit! || آه، مدرّسة بس. ده شغل كفاية!
~~~

## Ich bin Lehrer: من غير ein

| الألماني | الإنجليزي | العربي |
|---|---|---|
| [[Ich bin Lehrer.]] | I am **a** teacher. | أنا مدرّس. |
| [[Sie ist Ärztin.]] | She is **a** doctor. | هي دكتورة. |

بعد [[sein]] (وبعد [[werden]] و [[als]]) الشغلانة **من غير أداة**. [[Ich bin ein Lehrer]] مش غلط مية في المية، بس الألمان مبيقولوهاش كده، وبتبان غريبة.

وأسئلة الشغلانة:

~~~de
Was sind Sie von Beruf? || حضرتك بتشتغل إيه؟
Was bist du von Beruf? || بتشتغل إيه؟
Was machst du beruflich? || شغلك إيه؟
Ich bin Verkäufer von Beruf. || شغلتي بيّاع.
~~~

## -in: الشغلانة للست

| الراجل | الست |
|---|---|
| [[der Lehrer]] | [[die Lehrerin]] |
| [[der Verkäufer]] | [[die Verkäuferin]] |
| [[der Student]] | [[die Studentin]] |
| [[der Arzt]] | [[die Ärztin]] ⚠ (¨) |
| [[der Koch]] | [[die Köchin]] ⚠ (¨) |
| [[der Kollege]] | [[die Kollegin]] (الـ [[-e]] بتقع) |

- القاعدة: زوّد [[-in]]، والأداة بتبقى [[die]]. وفي الجمع [[-innen]]: [[die Lehrerinnen]].
- كام كلمة بتاخد ¨ كمان ([[Arzt]] ← [[Ärztin]]). اسمعها في الكروت.
- **استثناءات:** [[der Hausmann]] ← [[die Hausfrau]]، و [[der Krankenpfleger]] ← [[die Krankenschwester]] (أو [[die Krankenpflegerin]]، والاتنين مستخدمين).
- في الإعلانات بتلاقي [[(m/w/d)]] أو [[Lehrer*in]]: يعني الوظيفة لأي حد.

## Wo arbeitest du? in, bei, als

| | معناها | أمثلة |
|---|---|---|
| [[bei]] + الشركة أو الشخص | عند | [[bei einer Firma]]، [[bei Siemens]]، [[bei Familie Weber]] |
| [[in]] + المكان | في | [[in einem Büro]]، [[im Krankenhaus]]، [[in einer Schule]] |
| [[als]] + الشغلانة | بشغلانة | [[als Fahrer]]، [[als Kellnerin]] |

~~~de
Ich arbeite bei einer Firma in Berlin. || بشتغل في شركة في برلين.
Er arbeitet in einem Restaurant. || بيشتغل في مطعم.
Sie arbeitet als Verkäuferin. || بتشتغل بيّاعة.
Ich arbeite im Büro. || بشتغل في المكتب.
~~~

- [[bei]] و [[in]] بعدهم Dativ زي الدرس اللي فات في السكن: [[einer Firma]] (مؤنث)، و [[einem Büro]] (محايد)، و [[im]] = [[in dem]].
- **مقارنة بالعربي:** بنقول «بشتغل **في** شركة» و «في مكتب» بنفس الكلمة. في الألماني الشركة (كمؤسسة) بـ [[bei]]، والمكان بـ [[in]].
- مش بتشتغل؟ [[Ich bin arbeitslos.]] (مش لاقي شغل)، [[Ich bin Hausfrau.]]، [[Ich bin Rentner.]] (على المعاش)، [[Ich studiere.]] (بدرس في الجامعة).

## الكلمات: الشغلانات

~~~words الشغلانات
der Beruf, die Berufe | الشغلانة، المهنة | Was ist Ihr Beruf?
die Arbeit, die Arbeiten | الشغل | Die Arbeit ist interessant.
arbeiten | يشتغل | Ich arbeite bei einer Firma.
der Lehrer, die Lehrer | المدرّس | Mein Vater ist Lehrer.
die Lehrerin, die Lehrerinnen | المدرّسة | Unsere Lehrerin ist sehr nett.
der Arzt, die Ärzte | الدكتور | Der Arzt arbeitet im Krankenhaus.
die Ärztin, die Ärztinnen | الدكتورة | Meine Schwester ist Ärztin.
der Verkäufer, die Verkäufer | البيّاع | Der Verkäufer ist freundlich.
die Verkäuferin, die Verkäuferinnen | البيّاعة | Sie arbeitet als Verkäuferin.
der Fahrer, die Fahrer | السوّاق | Mein Bruder ist Fahrer.
der Student, die Studenten | الطالب (في الجامعة) | Er ist Student in Berlin.
die Studentin, die Studentinnen | الطالبة | Ich bin Studentin.
studieren | يدرس في الجامعة | Sie studiert Medizin.
arbeitslos | مش لاقي شغل | Er ist leider arbeitslos.
~~~

## الكلمات: أماكن الشغل

~~~words أماكن الشغل
die Firma, die Firmen | الشركة | Ich arbeite bei einer Firma.
das Büro, die Büros | المكتب | Das Büro ist im ersten Stock.
das Geschäft, die Geschäfte | المحل | Sie hat ein Geschäft.
die Praxis, die Praxen | العيادة | Die Praxis ist am Montag geschlossen.
das Krankenhaus, die Krankenhäuser | المستشفى | Er arbeitet im Krankenhaus.
die Schule, die Schulen | المدرسة | Meine Mutter arbeitet in einer Schule.
der Chef, die Chefs | المدير | Mein Chef ist sehr nett.
der Kunde, die Kunden | الزبون | Der Kunde wartet.
~~~

## كلمات زيادة: الشغل

[[kriegen]] = [[bekommen]] بس في الكلام العادي، متكتبهاش في إيميل رسمي. و [[sich kümmern um]] + Akkusativ = ياخد باله من.

~~~words الشغل
selbstständig | شغّال لحسابه | Mein Vater ist selbstständig.
abgeben | يسلّم | Geben Sie das Formular bitte am Montag ab.
holen | يجيب | Ich hole schnell einen Kaffee.
sich kümmern | ياخد باله من | Ich kümmere mich um die Kinder.
kriegen | ياخد (عامية) | Wann kriege ich mein Geld?
die Maschine, die Maschinen | المكنة | Die Maschine ist sehr laut.
~~~

[[studieren]] للجامعة بس. والمدرسة أو الكورس: [[lernen]] ([[Ich lerne Deutsch]]، [[Mein Sohn geht zur Schule]]). وده فخ للمصريين لأن «بدرس» عندنا للاتنين.

## قول بصوتك

~~~speak
Was sind Sie von Beruf? || حضرتك بتشتغل إيه؟
Ich bin Lehrerin. || أنا مدرّسة.
Ich arbeite bei einer Firma in Köln. || بشتغل في شركة في كولونيا.
Er arbeitet als Fahrer. || هو بيشتغل سوّاق.
Meine Schwester studiert Medizin. || أختي بتدرس طب.
~~~

## سمع: بيشتغلوا إيه؟

~~~hear
f: Ich bin Ärztin. Ich arbeite in einer Praxis, nicht im Krankenhaus.
? Wo arbeitet die Frau? || الست بتشتغل فين؟
- im Krankenhaus
- in einer Praxis *
- in einer Schule

m: Mein Bruder ist Lehrer, aber er arbeitet jetzt als Taxifahrer.
? Was macht der Bruder jetzt? || الأخ بيعمل إيه دلوقتي؟
- Er ist Lehrer.
- Er fährt Taxi. *
- Er ist arbeitslos.

f: Ich studiere noch. Am Wochenende arbeite ich als Kellnerin in einem Café.
? Was macht die Frau am Wochenende? || الست بتعمل إيه في الويك إند؟
- Sie studiert.
- Sie arbeitet im Café. *
- Sie hat frei.
~~~

## إملا

~~~dictate
Ich bin Lehrer von Beruf.
f: Sie arbeitet bei einer Firma.
Er arbeitet als Fahrer.
f: Meine Schwester ist Ärztin.
~~~

## فيديو: عرّف نفسك

~~~yt Yaelm87PTvg Introduce yourself in German (for absolute beginners)
- **قبل ما تشغّله:** اكتب ٣ جمل عن شغلك: شغلتك إيه، وفين، ومن إمتى لإمتى.
- **وإنت بتتفرج:** اكتب أي شغلانة أو مكان شغل بتسمعه.
- **بعده:** قول تعريف نفسك كامل (اسمك، ومنين، وساكن فين، وشغلك) في ٦ جمل وسجّله.
~~~`,
          deep: {
            why: R`[[Beruf]] كلمة ثابتة في Goethe Sprechen Teil 1 وفي ÖSD (من الـ ٦ مواضيع) وفي telc. وفي أي استمارة فيه خانة [[Beruf]]. والشغل مجال كامل في منهج الاندماج. ولو هتسافر عشان تشتغل، دي أول جملة هتتسألها في أي مقابلة.`,
            how: R`[[Ich bin]] + الشغلانة من غير أداة. الست: [[-in]] (وأحيانًا ¨). المكان: [[in]] + Dativ، والشركة: [[bei]] + Dativ، والدور: [[als]] + الشغلانة. والسؤال: [[Was sind Sie von Beruf?]]`,
            when: R`[[Was sind Sie von Beruf?]] مع حد بتقوله [[Sie]]. [[Was machst du beruflich?]] في الكلام العادي. [[als]] لما الشغل اللي بتعمله دلوقتي مش هو دراستك. و [[studieren]] للجامعة بس.`,
            mistakes: R`- [[Ich bin ein Lehrer]]: من غير [[ein]] ← [[Ich bin Lehrer]].
- [[Sie ist Lehrer]] عن ست ← [[Sie ist Lehrerin]].
- [[die Arztin]]: ← [[die Ärztin]] بالـ ¨.
- [[Ich arbeite in Siemens]]: الشركة ← [[bei Siemens]].
- [[Ich arbeite als ein Fahrer]]: بعد [[als]] من غير أداة ← [[als Fahrer]].
- [[Ich studiere Deutsch]] في كورس لغة: ← [[Ich lerne Deutsch]].`
          },
          try: R`قول ٥ جمل عن شغلك (أو دراستك) بصوت عالي: شغلتك إيه، وفين، وبشغلانة إيه لو مختلفة، والمدير والزمايل عاملين إزاي. وبعدين اسأل ٣ أسئلة لحد تاني عن شغله بـ [[Sie]].`,
          practice: [
            { lvl: 'سريع', t: R`**للست:** (١) der Lehrer (٢) der Arzt (٣) der Verkäufer (٤) der Student (٥) der Koch (٦) der Kollege (٧) der Fahrer`,
              done: R`السبعة صح بالأداة والـ ¨`,
              sol: R`~~~de
die Lehrerin
die Ärztin
die Verkäuferin
die Studentin
die Köchin
die Kollegin
die Fahrerin
~~~

**ليه:** كلهم [[-in]] و [[die]]. و [[Ärztin]] و [[Köchin]] بـ ¨. و [[Kollege]] الـ [[-e]] بتقع قبل [[-in]].` },
            { lvl: 'تطبيق', t: R`**in ولا bei ولا als؟** (١) Ich arbeite ___ einer Firma. (٢) Er arbeitet ___ Kellner. (٣) Sie arbeitet ___ Krankenhaus. (٤) Wir arbeiten ___ Familie Weber. (٥) Ich arbeite ___ einem Büro. (٦) Mona arbeitet ___ Lehrerin ___ einer Schule.`,
              done: R`الستة صح، و [[im]] في (٣)، و [[als]] من غير أداة`,
              sol: R`~~~de
Ich arbeite bei einer Firma.
Er arbeitet als Kellner.
Sie arbeitet im Krankenhaus.
Wir arbeiten bei Familie Weber.
Ich arbeite in einem Büro.
Mona arbeitet als Lehrerin in einer Schule.
~~~

**ليه:** الشركة أو العيلة اللي بتشتغل عندها ← [[bei]]. المكان ← [[in]] ([[im]] = [[in dem]]). الشغلانة ← [[als]] من غير أداة. وفي (٦) الاتنين مع بعض: بشغلانة إيه، وفين.` },
            { lvl: 'تطبيق', t: R`**صلّح الغلط:** (١) [[Ich bin eine Ärztin.]] (٢) [[Sie ist Verkäufer.]] (٣) [[Er arbeitet in Siemens.]] (٤) [[Ich studiere Deutsch in der Volkshochschule.]] (٥) [[Was bist du Beruf?]]`,
              done: R`الخمسة صح وعارف السبب`,
              sol: R`~~~de
Ich bin Ärztin.
Sie ist Verkäuferin.
Er arbeitet bei Siemens.
Ich lerne Deutsch in der Volkshochschule.
Was bist du von Beruf?
~~~

**ليه:** (١) الشغلانة من غير أداة. (٢) ست ← [[-in]]. (٣) الشركة ← [[bei]]. (٤) كورس ← [[lernen]]، و [[studieren]] للجامعة. (٥) القالب الثابت: [[von Beruf]].` },
            { lvl: 'تحدي', t: R`**قبل وبعد:** اكتب ٥ جمل عن حد (حقيقي أو متخيّل) شغلانته في مصر غير شغله في ألمانيا دلوقتي: كان بيشتغل إيه هناك ([[war]])، وبيشتغل إيه هنا بـ [[als]]، وفين، وعايز يرجع لشغلانته ولا لأ.`,
              done: R`٥ جمل، فيهم [[war]] + شغلانة، و [[als]]، و [[bei]] أو [[in]] + Dativ صح، والست بـ [[-in]] لو ست`,
              sol: R`**نسخة نموذجية:**

~~~de Samir=m
Samir: In Ägypten war ich Lehrer. || في مصر كنت مدرّس.
Samir: Hier in Deutschland arbeite ich jetzt als Fahrer. || هنا في ألمانيا بشتغل دلوقتي سوّاق.
Samir: Ich arbeite bei einer Firma in Hamburg. || بشتغل في شركة في هامبورج.
Samir: Die Arbeit ist okay, aber ich möchte wieder Lehrer sein. || الشغل ماشي، بس عايز أرجع مدرّس.
Samir: Darum lerne ich jeden Tag Deutsch. || عشان كده بذاكر ألماني كل يوم.
~~~

**ليه كده:** [[war]] اتعلمته في وحدة الوقت (ماضي [[sein]]). و [[als Fahrer]] من غير أداة. و [[wieder]] = تاني. و [[Darum]] = عشان كده، وبعدها الفعل على طول (المكان التاني). ودي حكاية ناس كتير بتهاجر: شهادتهم محتاجة اعتراف ([[Anerkennung]])، فبيشتغلوا حاجة تانية الأول.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortliste، Arbeit/Beruf (ص ٧٦)، و bei/in + Dativ (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Arbeit (ص ٨٣–٩٠)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: Beruf", url: "https://www.dwds.de/wb/Beruf" },
            { t: "DWDS: als", url: "https://www.dwds.de/wb/als" },
            { t: "DWDS: studieren", url: "https://www.dwds.de/wb/studieren" },
          ],
        },
        {
          cmd: "Ich arbeite von acht bis fünf",
          title: "يوم الشغل: المواعيد والورديات والبريك والإجازة",
          pre: ["dea1/Was sind Sie von Beruf?", "dea1/Am Montag um acht", "dea1/Ist die Wohnung noch frei?"],
          desc: R`[[Wann arbeitest du?]] — [[Von Montag bis Freitag, von acht bis fünf.]] و [[Um zwölf habe ich eine halbe Stunde Pause.]] و [[Um fünf habe ich Feierabend.]]

وهنا هتقرا جدول ورديات ([[Frühschicht]]، [[Spätschicht]])، وتتكلم عن الإجازة ([[Urlaub]])، وتقول رأيك في شغلك ([[Die Arbeit ist anstrengend, aber interessant.]]).`,
          teach: R`## الموقف

ليا بتسأل كريم عن شغله الجديد في سوبرماركت. (Rahmencurriculum: يفهم جداول الشغل والورديات، ويتفق مع مديره على المواعيد.)

~~~de Lea=f Karim=m
Lea: Na, wie ist der neue Job? || ها، الشغل الجديد عامل إزاي؟
Karim: Gut! Ich arbeite im Supermarkt, fünf Tage in der Woche. || حلو! بشتغل في سوبرماركت، ٥ أيام في الأسبوع.
Lea: Wann fängst du an? || بتبدأ إمتى؟
Karim: Das ist verschieden. Diese Woche habe ich Frühschicht, von sechs bis zwei. || بيفرق. الأسبوع ده عندي وردية الصبح، من ٦ لـ ٢.
Lea: Oh, das ist früh! Und hast du eine Pause? || آه، ده بدري! وعندك بريك؟
Karim: Ja, eine halbe Stunde. Um zehn Uhr. || آه، نص ساعة. الساعة ١٠.
Lea: Und wann hast du Urlaub? || وإمتى إجازتك؟
Karim: Im August, zwei Wochen. Ich fliege nach Kairo. || في أغسطس، أسبوعين. هسافر القاهرة.
~~~

## المواعيد: von … bis، و ab، و um

اتعلمتهم في وحدة الوقت، ودلوقتي على الشغل:

~~~de
Ich arbeite von acht bis siebzehn Uhr. || بشتغل من ٨ لـ ٥.
Von Montag bis Freitag arbeite ich. || بشتغل من الاتنين للجمعة.
Ab sechs Uhr habe ich Feierabend. || من الساعة ٦ بخلص شغل.
Um zwölf Uhr mache ich Pause. || الساعة ١٢ باخد بريك.
~~~

- [[anfangen]] (يبدأ) بيتقسم: [[Ich fange um acht an]]. و [[aufhören]] (يبطّل، يخلّص): [[Ich höre um fünf auf]].
- [[Feierabend]] = خلصت شغل اليوم ده (حرفيًا «ليلة الاحتفال»). [[Schönen Feierabend!]] بيقولوها لبعض في آخر اليوم.
- [[Pause machen]] أو [[Pause haben]] = ياخد بريك.

## الورديات (Schichten)

~~~text Dienstplan, Woche 12
         Mo     Di     Mi     Do     Fr     Sa
Karim    F      F      F      –      S      S
Lea      S      S      –      F      F      –
F = Frühschicht 6–14 Uhr   S = Spätschicht 14–22 Uhr   – = frei
~~~

~~~de
Am Montag hat Karim Frühschicht. || يوم الاتنين كريم عنده وردية الصبح.
Am Donnerstag hat Karim frei. || يوم الخميس كريم إجازة.
Am Samstag arbeitet Karim von vierzehn bis zweiundzwanzig Uhr. || يوم السبت كريم شغال من ٢ لـ ١٠.
Lea arbeitet am Mittwoch nicht. || ليا مش شغالة يوم الأربع.
~~~

- [[die Frühschicht]] (الصبح)، و [[die Spätschicht]] (بعد الضهر)، و [[die Nachtschicht]] (بالليل).
- [[der Dienstplan]] = جدول الورديات، والمدير بيعلّقه كل أسبوع. وده هدف بالاسم في منهج الاندماج: تفهم جدول الأسبوع والورديات.
- الألمان بيكتبوا الساعات في الجداول بنظام ٢٤ ساعة ([[22 Uhr]])، بس في الكلام ممكن يقولوا [[zehn Uhr abends]].

## Vollzeit, Teilzeit, Urlaub

| | المعنى |
|---|---|
| [[Vollzeit]] | دوام كامل، حوالي ٣٨–٤٠ ساعة في الأسبوع |
| [[Teilzeit]] | نص دوام، أقل من كده |
| [[der Urlaub]] | الإجازة السنوية (في ألمانيا على الأقل ٢٠ يوم شغل بالقانون، وأغلب الشركات ٢٥–٣٠) |
| [[frei haben]] | إجازة يوم أو جزء من يوم |
| [[krank sein]] | عيان (بتجيب ورقة من الدكتور: [[Krankmeldung]]) |

~~~de
Ich arbeite Teilzeit, zwanzig Stunden in der Woche. || بشتغل نص دوام، ٢٠ ساعة في الأسبوع.
Ich habe dreißig Tage Urlaub im Jahr. || عندي ٣٠ يوم إجازة في السنة.
Morgen habe ich frei. || بكرة إجازة.
~~~

## رأيك في شغلك

~~~de
Die Arbeit ist interessant. || الشغل ممتع.
Die Arbeit ist anstrengend. || الشغل مُتعب.
Meine Kollegen sind nett. || زمايلي لطاف.
Ich verdiene nicht viel. || مش بكسب كتير.
Die Arbeit ist schwer, aber ich mache sie gern. || الشغل صعب، بس بحبه.
~~~

[[schwer]] و [[leicht]] (صعب وسهل) في قايمة A1، و [[interessant]] و [[anstrengend]] (ممتع ومتعب) هتسمعهم كتير. و [[verdienen]] = يكسب فلوس من شغل.

## تفهم وتسأل في الشغل

~~~de
Wie bitte? Können Sie das noch einmal sagen? || نعم؟ ممكن تقول ده تاني؟
Ich verstehe das nicht. || مش فاهم ده.
Was bedeutet das? || يعني إيه ده؟
Ich habe eine Frage. || عندي سؤال.
Wer ist hier zuständig? || مين المسؤول هنا؟
~~~

منهج الاندماج بيطلب بالاسم إنك تقدر تقول إنك مش فاهم وتطلب الإعادة. ودي مش عيب في ألمانيا: إنك تسأل أحسن ما تعمل الحاجة غلط.

## الكلمات

~~~words يوم الشغل
die Pause, die Pausen | البريك | Um zwölf habe ich Pause.
der Feierabend | آخر الشغل | Um fünf habe ich Feierabend.
anfangen | يبدأ | Ich fange um acht an.
die Stunde, die Stunden | الساعة (مدة) | Ich arbeite acht Stunden.
der Urlaub | الإجازة | Im August habe ich Urlaub.
frei | إجازة، فاضي | Morgen habe ich frei.
verdienen | يكسب (فلوس) | Er verdient gut.
das Geld | الفلوس | Ich brauche Geld.
schwer | صعب، تقيل | Die Arbeit ist schwer.
leicht | سهل، خفيف | Die Aufgabe ist leicht.
der Kollege, die Kollegen | الزميل | Meine Kollegen sind nett.
der Computer, die Computer | الكمبيوتر | Ich arbeite am Computer.
~~~

[[die Stunde]] = ساعة كمدة ([[acht Stunden]])، و [[die Uhr]] = الساعة كوقت أو الجهاز ([[um acht Uhr]]). في العربي كلمة واحدة، وفي الألماني اتنين.

## قول بصوتك

~~~speak
Ich arbeite von acht bis fünf. || بشتغل من ٨ لـ ٥.
Um zwölf habe ich eine halbe Stunde Pause. || الساعة ١٢ عندي نص ساعة بريك.
Diese Woche habe ich Frühschicht. || الأسبوع ده عندي وردية الصبح.
Im August habe ich zwei Wochen Urlaub. || في أغسطس عندي أسبوعين إجازة.
Können Sie das noch einmal sagen? || ممكن تقول ده تاني؟
~~~

## سمع: إمتى؟

~~~hear
m: Ich arbeite von Montag bis Donnerstag. Am Freitag habe ich frei.
? Wann hat der Mann frei? || الراجل إجازة إمتى؟
- am Montag
- am Donnerstag
- am Freitag *

f: Nächste Woche habe ich Spätschicht. Ich fange um vierzehn Uhr an.
? Wann fängt die Frau an? || الست بتبدأ إمتى؟
- um vier Uhr
- um vierzehn Uhr *
- um zwölf Uhr

m: Ich arbeite Teilzeit, nur zwanzig Stunden. Aber ich verdiene genug.
? Wie viele Stunden arbeitet der Mann? || الراجل بيشتغل كام ساعة؟
- zwölf
- zwanzig *
- vierzig
~~~

## إملا

~~~dictate
Ich arbeite von acht bis fünf.
f: Um zwölf habe ich Pause.
Morgen habe ich frei.
f: Die Arbeit ist sehr interessant.
~~~

## فيديو: يوم في المكتب

~~~yt kYEBu6dG2MM A Day in our Office in Slow German
- **قبل ما تشغّله:** اكتب ٤ حاجات بتعملها في يوم شغل عادي، بالترتيب.
- **وإنت بتتفرج:** اكتب أي ساعة بتسمعها وبيعملوا فيها إيه.
- **بعده:** احكي يوم شغلك (أو مذاكرتك) في ٦ جمل بالترتيب، فيهم [[anfangen]] و [[Pause]] و [[Feierabend]].
~~~`,
          deep: {
            why: R`المواعيد والورديات والإجازة كلام يومي في أي شغل، ومنهج الاندماج بيطلب إنك تفهم جدول الورديات وتتفق مع مديرك على المواعيد. وفي Goethe Hören Teil 3 الرسايل كتير عن تغيير ميعاد أو وردية، و Sprechen Teil 2 فيه موضوع «Arbeit».`,
            how: R`[[von … bis …]] للفترة، و [[um]] للساعة، و [[ab]] من. و [[anfangen]] و [[aufhören]] بيتقسموا. والورديات: [[Frühschicht]]/[[Spätschicht]]/[[frei]]. والرأي: [[Die Arbeit ist …]].`,
            when: R`[[Wann fängst du an?]] لما تتفق على ميعاد. [[Ich habe frei]] ليوم إجازة، و [[Ich habe Urlaub]] للإجازة السنوية. [[Schönen Feierabend!]] وإنت ماشي من الشغل. و [[Können Sie das noch einmal sagen?]] أول ما متفهمش.`,
            mistakes: R`- [[Ich anfange um acht]]: الفعل بيتقسم ← [[Ich fange um acht an]].
- [[acht Uhren]] للمدة: ← [[acht Stunden]].
- [[Ich habe Urlaub morgen]] ليوم واحد: الأطبع [[Morgen habe ich frei]].
- [[Ich arbeite von acht zu fünf]]: ← [[von acht bis fünf]].
- تتكسف تقول إنك مش فاهم وتعمل الحاجة غلط: [[Ich verstehe das nicht]] جملة عادية جدًا.
- [[Die Arbeit ist schwierig]] مش غلط، بس [[schwer]] هي اللي في قايمة A1 وأكتر في الكلام.`
          },
          try: R`اكتب جدول أسبوعك (أو جدول ورديات متخيّل) وقول عنه ٦ جمل بصوت عالي. وبعدين قول ٣ جمل رأيك في شغلك أو دراستك، وجملتين بتطلب فيهم حد يعيد كلامه.`,
          practice: [
            { lvl: 'سريع', t: R`**Stunde ولا Uhr؟** (١) Ich arbeite acht ___. (٢) Der Kurs beginnt um neun ___. (٣) Die Pause dauert eine halbe ___. (٤) Um wie viel ___ hast du Feierabend? (٥) Er arbeitet zwanzig ___ in der Woche.`,
              done: R`الخمسة صح، و [[Stunde]]/[[Stunden]] للمدة و [[Uhr]] للوقت`,
              sol: R`~~~de
Ich arbeite acht Stunden.
Der Kurs beginnt um neun Uhr.
Die Pause dauert eine halbe Stunde.
Um wie viel Uhr hast du Feierabend?
Er arbeitet zwanzig Stunden in der Woche.
~~~

**ليه:** المدة (كام ساعة) ← [[Stunde]] وجمعها [[Stunden]]. الوقت (الساعة كام) ← [[Uhr]]، وملهاش جمع في الوقت ([[acht Uhr]]). و [[dauern]] = ياخد وقت قد كده.` },
            { lvl: 'تطبيق', t: R`**اقرا الجدول وجاوب:** في الجدول اللي في الدرس (Dienstplan, Woche 12): (١) Wann hat Lea frei? (٢) Wann arbeitet Karim am Freitag? (٣) Wer arbeitet am Donnerstag von sechs bis vierzehn Uhr? (٤) Wie viele Tage arbeitet Karim?`,
              done: R`الأربعة صح بجمل كاملة`,
              sol: R`~~~de
Lea hat am Mittwoch und am Samstag frei.
Am Freitag arbeitet Karim von vierzehn bis zweiundzwanzig Uhr.
Lea arbeitet am Donnerstag von sechs bis vierzehn Uhr.
Karim arbeitet fünf Tage.
~~~

**ليه:** (١) [[–]] عند ليا الأربع والسبت. (٢) الجمعة [[S]] = Spätschicht ١٤–٢٢. (٣) الخميس ليا [[F]]، وكريم [[–]]. (٤) كريم: اتنين وتلات وأربع وجمعة وسبت = ٥ أيام. ودي بالظبط المهارة اللي محتاجها قدام أي [[Dienstplan]].` },
            { lvl: 'تطبيق', t: R`**anfangen و aufhören:** (١) Wann ___ du ___? (تبدأ) (٢) Ich ___ um halb acht ___. (أبدأ) (٣) Am Freitag ___ wir um zwei ___. (نخلّص) (٤) Der Kurs ___ um neun ___. (يبدأ)`,
              done: R`الأربعة صح والفعل مقسوم`,
              sol: R`~~~de
Wann fängst du an?
Ich fange um halb acht an.
Am Freitag hören wir um zwei auf.
Der Kurs fängt um neun an.
~~~

**ليه:** [[anfangen]]: [[ich fange]]، [[du fängst]] (¨ مع [[du]] و [[er]])، و [[an]] في الآخر. و [[aufhören]]: [[wir hören … auf]]. وزي أي فعل بيتقسم، لو بدأت بالوقت الفعل يفضل في المكان التاني.` },
            { lvl: 'تحدي', t: R`**تتفق مع المدير:** اكتب حوار (٨ سطور) مع مديرك: عايز تبدّل وردية يوم الجمعة لأن عندك ميعاد، وتقترح يوم تاني، والمدير بيوافق بشرط.`,
              done: R`٨ سطور، فيهم [[Frühschicht]] أو [[Spätschicht]]، وسبب، واقتراح بـ [[Kann ich …?]] أو [[Geht es …?]]، ورد المدير فيه شرط ([[aber]])`,
              sol: R`~~~de Karim=m Chefin=f
Karim: Frau Weber, haben Sie kurz Zeit? || مدام فيبر، عندك دقيقة؟
Chefin: Ja, natürlich. || آه طبعًا.
Karim: Am Freitag habe ich Frühschicht, aber ich habe einen Termin beim Amt. || يوم الجمعة عندي وردية الصبح، بس عندي ميعاد في المصلحة.
Karim: Kann ich am Freitag Spätschicht machen? || ممكن أعمل وردية بعد الضهر يوم الجمعة؟
Chefin: Hm, am Freitag ist Lea in der Spätschicht. || همم، يوم الجمعة ليا في وردية بعد الضهر.
Karim: Geht es vielleicht am Samstag? Dann arbeite ich am Samstag früh. || ينفع يمكن السبت؟ يبقى أشتغل السبت الصبح.
Chefin: Okay, das geht. Aber fragen Sie bitte auch Lea. || ماشي، ينفع. بس اسأل ليا كمان.
Karim: Mache ich. Vielen Dank! || هعمل كده. شكرًا جدًا!
~~~

**ليه كده:** [[Haben Sie kurz Zeit?]] بداية مؤدّبة. و [[einen Termin beim Amt]] = ميعاد في مصلحة حكومية ([[beim]] = [[bei dem]]). و [[Kann ich … machen?]] طلب بـ [[können]]. و [[Fragen Sie bitte auch Lea]] أمر، وده الدرس الجاي. والحوار ده هدف في منهج الاندماج: يتفق مع مديره على تفاصيل جدول الشغل.` },
          ],
          ref: [
            { t: "Rahmencurriculum für Integrationskurse: Arbeit، جداول الشغل والورديات (2.2.2) والاتفاق على المواعيد (2.1.5)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "Goethe-Zertifikat A1: Wortliste، Arbeitsplatz و Urlaub (ص ٧٦)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "DWDS: Feierabend", url: "https://www.dwds.de/wb/Feierabend" },
            { t: "DWDS: anfangen", url: "https://www.dwds.de/wb/anfangen" },
            { t: "DWDS: Schicht", url: "https://www.dwds.de/wb/Schicht" },
          ],
        },
        {
          cmd: "Rufen Sie bitte an!",
          title: "الأمر (Imperativ): تعليمات وتحذيرات، وترد عليها",
          pre: ["dea1/Ich arbeite von acht bis fünf", "dea1/Können Sie mir helfen?"],
          desc: R`المديرة بتقول: [[Schicken Sie bitte die E-Mail!]] وزميلك بيقول: [[Gib mir bitte den Schlüssel!]] واليافطة بتقول: [[Vorsicht!]]

ده الـ **Imperativ** (الأمر)، وليه ٣ أشكال: لـ [[Sie]] و [[du]] و [[ihr]]. وكنت بتقول جمل منه من بدري ([[Gib mir bitte das Salz!]]، [[Komm ruhig später]])، ودلوقتي هتعرف تعمله من أي فعل. ومعاه الرد: [[Okay, mache ich.]]`,
          teach: R`## الموقف

أول أسبوع لكريم في مخزن. المدير بيدّيله تعليمات، وزميله بيحذّره. (Rahmencurriculum: يفهم المطلوب في شغل بسيط ويقول إنه هيعمله، ويفهم تحذير بالكلام، ويحذّر زمايله.)

~~~de Chef=m Karim=m Jonas=m
Chef: Herr Hassan, kommen Sie bitte mal! || أستاذ حسن، تعالى لو سمحت!
Karim: Ja, ich komme. || آه، جاي.
Chef: Bringen Sie bitte die Kartons ins Lager. Und schreiben Sie die Nummern auf. || ودّي الكراتين المخزن لو سمحت. واكتب الأرقام.
Karim: Okay, mache ich. Wo ist das Lager? || ماشي، هعمل كده. المخزن فين؟
Chef: Gehen Sie geradeaus und dann links. || امشي على طول وبعدين شمال.
Jonas: Karim, Vorsicht! Der Boden ist nass! || كريم، حاسب! الأرض مبلولة!
Karim: Danke! Jonas, gib mir bitte die Handschuhe. || شكرًا! يوناس، اديني الجوانتي لو سمحت.
Jonas: Hier. Und pass auf, die Kartons sind schwer! || اتفضل. وخلي بالك، الكراتين تقيلة!
~~~

## ٣ أشكال للأمر

| لمين | إزاي | مثال من [[kommen]] | مثال من [[anrufen]] |
|---|---|---|---|
| [[Sie]] (حضرتك/حضراتكم) | الفعل + [[Sie]] | [[Kommen Sie!]] | [[Rufen Sie an!]] |
| [[ihr]] (إنتو) | زي [[ihr]] من غير [[ihr]] | [[Kommt!]] | [[Ruft an!]] |
| [[du]] (إنت) | زي [[du]] من غير [[du]] ومن غير [[-st]] | [[Komm!]] | [[Ruf an!]] |

**إزاي تعمل شكل [[du]]:** خد [[du kommst]] ← شيل [[du]] و [[-st]] ← [[Komm!]]. و [[du schreibst]] ← [[Schreib!]]. و [[du arbeitest]] ← [[Arbeite!]] (لو الفعل آخره t أو d، الـ [[e]] بتفضل).

## الأفعال اللي بتتغيّر

| الفعل | [[du …]] | الأمر لـ [[du]] |
|---|---|---|
| [[geben]] | [[du gibst]] | [[Gib!]] |
| [[nehmen]] | [[du nimmst]] | [[Nimm!]] |
| [[essen]] | [[du isst]] | [[Iss!]] |
| [[sprechen]] | [[du sprichst]] | [[Sprich!]] |
| [[fahren]] | [[du fährst]] | [[Fahr!]] ⚠ (الـ ¨ بتقع) |
| [[sein]] | [[du bist]] | [[Sei!]] ⚠ |

- الـ e اللي بتبقى i بتفضل i في الأمر ([[Gib]]، [[Nimm]]). بس الـ a اللي بتبقى ä بترجع a ([[Fahr]]).
- [[sein]] شاذ: [[Sei ruhig!]] (لـ du)، و [[Seid leise!]] (لـ ihr)، و [[Seien Sie bitte pünktlich!]] (لـ Sie).

## الأفعال اللي بتتقسم في الأمر

الجزء بيروح الآخر زي العادة:

~~~de
Rufen Sie bitte Frau Klein an! || كلّم مدام كلاين لو سمحت!
Mach bitte das Fenster auf! || افتح الشباك لو سمحت!
Steht bitte auf! || قوموا لو سمحتوا!
Schreiben Sie die Nummer auf! || اكتب الرقم!
~~~

## من الأمر للطلب: bitte والأدب

| | الجملة | الإحساس |
|---|---|---|
| ١ | [[Kommen Sie!]] | أمر ناشف |
| ٢ | [[Kommen Sie bitte!]] | طلب عادي |
| ٣ | [[Kommen Sie bitte mal!]] | طلب ودّي ([[mal]] بتليّن) |
| ٤ | [[Können Sie bitte kommen?]] | طلب مؤدّب |

في الشغل والمحلات استخدم [[bitte]] دايمًا. و [[mal]] (من [[einmal]]) بتخلّي الطلب أخف: [[Warte mal!]] (استنى شوية)، [[Hör mal!]] (اسمع كده).

## التحذيرات

~~~de
Vorsicht! || حاسب!
Achtung! || انتبه!
Pass auf! || خلي بالك!
Nicht anfassen! || متلمسش!
Halt! Stopp! || قف!
~~~

- [[Vorsicht, heiß!]] (حاسب، سخن)، و [[Vorsicht, Stufe!]] (حاسب، في سلمة). دول هتشوفهم مكتوبين في كل حتة.
- اليافطات بتستخدم المصدر بدل الأمر: [[Nicht rauchen!]]، [[Bitte Tür schließen!]] (زي ما شفت في السكن).
- [[aufpassen]] = ياخد باله، وبيتقسم: [[Pass auf!]]، [[Passen Sie auf!]]

## ترد على الأمر

~~~de
Okay, mache ich. || ماشي، هعمل كده.
Alles klar! || تمام!
Ja, gern. || حاضر.
Sofort! || حالًا!
Entschuldigung, das verstehe ich nicht. || آسف، مش فاهم.
~~~

**مقارنة بالعربي:** «حاضر» عندنا ممكن تتقال حتى لو مش هتعمل حاجة دلوقتي. في الشغل الألماني [[mache ich]] معناها فعلًا هتعملها، وغالبًا هيتابعوا معاك. لو مش فاهم، قول على طول.

## الكلمات

~~~words أوامر وتحذيرات
geben | يدّي | Gib mir bitte das Buch!
nehmen | ياخد | Nimm bitte einen Stuhl!
bringen | يجيب، يودّي | Bringen Sie mir bitte einen Kaffee!
schicken | يبعت | Schicken Sie mir bitte eine E-Mail!
anrufen | يتصل | Rufen Sie mich morgen an!
aufpassen | ياخد باله | Pass auf, das ist heiß!
warten | يستنى | Warte bitte!
die Vorsicht | الحذر | Vorsicht, heiß!
die Achtung | الانتباه | Achtung, Stufe!
sofort | حالًا | Kommen Sie bitte sofort!
~~~

## كلمات زيادة: التليفون والمكتب

[[die Ansage]] الرسالة المسجّلة اللي بتسمعها لما تتصل، و [[der Anrufbeantworter]] المكنة اللي بتسجّل رسالتك. و [[anklicken]] = تدوس بالماوس.

~~~words التليفون والمكتب
der Anrufbeantworter | الأنسرماشين | Sprechen Sie bitte auf den Anrufbeantworter.
die Ansage, die Ansagen | الرسالة المسجّلة | Hören Sie die Ansage.
die Nachricht, die Nachrichten | الرسالة | m: Ich schicke dir eine Nachricht.
die Vorwahl | كود المنطقة | m: Was ist die Vorwahl von Berlin?
das Fax, die Faxe | الفاكس | Schicken Sie mir bitte ein Fax.
der Drucker, die Drucker | الطابعة | Der Drucker ist kaputt.
drucken | يطبع | m: Ich drucke das Formular.
anklicken | يدوس (بالماوس) | Klicken Sie das Bild an.
automatisch | أوتوماتيك | Die Tür öffnet automatisch.
~~~

## قول بصوتك

~~~speak
Kommen Sie bitte mal! || تعالى لو سمحت!
Gib mir bitte den Schlüssel! || اديني المفتاح لو سمحت!
Rufen Sie bitte Frau Klein an! || كلّم مدام كلاين لو سمحت!
Vorsicht, der Boden ist nass! || حاسب، الأرض مبلولة!
Okay, mache ich. || ماشي، هعمل كده.
~~~

## سمع: المطلوب إيه؟

~~~hear
m: Frau Ali, schicken Sie bitte die E-Mail an Herrn Busch. Nicht an Frau Klein!
? An wen soll Frau Ali die E-Mail schicken? || مدام علي المفروض تبعت الإيميل لمين؟
- an Frau Klein
- an Herrn Busch *
- an den Chef

f: Kinder, seid bitte leise! Papa schläft.
? Was sollen die Kinder machen? || العيال المفروض يعملوا إيه؟
- schlafen
- leise sein *
- spielen

m: Nimm bitte nicht den Aufzug. Er ist kaputt. Nimm die Treppe.
? Was soll die Person machen? || الشخص المفروض يعمل إيه؟
- den Aufzug nehmen
- die Treppe nehmen *
- warten
~~~

## إملا

~~~dictate
Kommen Sie bitte!
f: Gib mir bitte das Buch!
Rufen Sie mich an!
f: Vorsicht, heiß!
~~~

## فيديو: الأمر

~~~yt hunvSsyEeBU Imperatives: How to Phrase Orders and Requests in German
- **قبل ما تشغّله:** اكتب الأمر لـ [[du]] و [[Sie]] من [[kommen]] و [[geben]] و [[anrufen]].
- **وإنت بتتفرج:** اكتب أي أمر بتسمعه، وجنبه هو لمين ([[du]] ولا [[ihr]] ولا [[Sie]]).
- **بعده:** صحّح أوامرك الستة، واكتب ٣ أوامر مؤدّبة بـ [[bitte]] و [[mal]].
~~~`,
          deep: {
            why: R`الأمر في كل حتة: تعليمات الشغل، والدكتور ([[Nehmen Sie die Tabletten!]])، والمدرّس، واليافطات، والتحذيرات. ومنهج الاندماج بيطلب بالاسم إنك تفهم المطلوب وتقول إنك هتعمله، وتفهم التحذير. و Goethe حاطط Imperativ (du، ihr، Sie) في قايمة القواعد، وهو أسهل طريقة تطلب بيها حاجة في Sprechen Teil 3.`,
            how: R`[[Sie]]: الفعل + [[Sie]] ([[Kommen Sie!]]). [[ihr]]: شكل [[ihr]] من غير الضمير ([[Kommt!]]). [[du]]: شكل [[du]] من غير الضمير ومن غير [[-st]] ([[Komm!]]، [[Gib!]]، [[Fahr!]]). والجزء المقسوم في الآخر. و [[bitte]] و [[mal]] بيليّنوا.`,
            when: R`مع زميل أو صاحب: [[du]]. مع المدير أو زبون: [[Sie]]. مع مجموعة صحاب أو عيال: [[ihr]]. والتحذير: [[Vorsicht!]] أو [[Pass auf!]] من غير أدب، لأن السرعة أهم.`,
            mistakes: R`- [[Kommst!]]: [[-st]] بتقع ← [[Komm!]].
- [[Gebe mir das Buch!]]: ← [[Gib mir das Buch!]]
- [[Fähr langsam!]]: ← [[Fahr langsam!]] (الـ ¨ بتقع).
- [[Sie kommen bitte!]] كأمر: الفعل الأول ← [[Kommen Sie bitte!]]
- [[Anrufen Sie mich!]]: الفعل بيتقسم ← [[Rufen Sie mich an!]]
- [[Bist ruhig!]]: ← [[Sei ruhig!]]`
          },
          try: R`اكتب ٦ تعليمات لزميل جديد في شغلك أو في بيتك: ٣ بـ [[Sie]] و ٣ بـ [[du]]، ومنهم فعلين بيتقسموا وتحذير واحد. وقولهم بصوت عالي، وقول ردّ مختلف على كل واحد.`,
          practice: [
            { lvl: 'سريع', t: R`**الأمر لـ du:** (١) kommen (٢) geben (٣) nehmen (٤) schreiben (٥) fahren (٦) sein (٧) warten (٨) anrufen`,
              done: R`التمانية صح، وفيهم [[Gib]] و [[Nimm]] و [[Fahr]] و [[Sei]] و [[Warte]] و [[Ruf … an]]`,
              sol: R`~~~de
Komm!
Gib!
Nimm!
Schreib!
Fahr!
Sei!
Warte!
Ruf an!
~~~

**ليه:** شكل [[du]] من غير [[du]] و [[-st]]. [[gibst]] ← [[Gib]]، و [[nimmst]] ← [[Nimm]] (الـ i بتفضل). [[fährst]] ← [[Fahr]] (الـ ¨ بتقع). [[sein]] شاذ: [[Sei]]. و [[wartest]] ← [[Warte]] (آخره t فالـ e بتفضل). و [[anrufen]] بيتقسم: [[Ruf … an]].` },
            { lvl: 'تطبيق', t: R`**حوّل لـ Sie و ihr:** (١) Komm bitte! (٢) Gib mir das Heft! (٣) Mach das Fenster auf! (٤) Sei pünktlich! (٥) Ruf mich an!`,
              done: R`العشرة صح، و [[Seien Sie]] و [[Seid]] في (٤)`,
              sol: R`~~~de
Kommen Sie bitte! Kommt bitte!
Geben Sie mir das Heft! Gebt mir das Heft!
Machen Sie das Fenster auf! Macht das Fenster auf!
Seien Sie pünktlich! Seid pünktlich!
Rufen Sie mich an! Ruft mich an!
~~~

**ليه:** [[Sie]]: المصدر + [[Sie]]. [[ihr]]: شكل [[ihr]] ([[kommt]]، [[gebt]]، [[macht]]) من غير الضمير. و [[sein]]: [[Seien Sie]] و [[Seid]]. والجزء المقسوم ([[auf]]، [[an]]) في الآخر في الكل.` },
            { lvl: 'تطبيق', t: R`**ليّن الأمر:** دول أوامر ناشفة من مدير لموظف. خليهم مؤدّبين بطريقتين لكل واحد (بـ [[bitte]]/[[mal]]، وبـ [[Können Sie …?]]): (١) Schreiben Sie den Brief! (٢) Kommen Sie! (٣) Rufen Sie den Kunden an!`,
              done: R`٦ جمل، والشكل التاني المصدر فيه في الآخر`,
              sol: R`~~~de
Schreiben Sie bitte den Brief.
Können Sie bitte den Brief schreiben?
Kommen Sie bitte mal!
Können Sie bitte mal kommen?
Rufen Sie bitte den Kunden an.
Können Sie bitte den Kunden anrufen?
~~~

**ليه:** [[bitte]] بعد [[Sie]]، و [[mal]] بيليّن أكتر. ومع [[Können Sie …?]] الفعل التاني مصدر في الآخر، والمقسوم بيرجع كلمة واحدة ([[anrufen]]). و [[den Kunden]]: [[der Kunde]] في الـ Akkusativ بياخد [[-n]] (كلمة من الكلمات القليلة اللي بتعمل كده).` },
            { lvl: 'تحدي', t: R`**تعليمات أمان:** اكتب ٦ تعليمات أمان لمطبخ مطعم (لزمايل بتقولهم [[ihr]]): ٤ بالأمر و ٢ تحذيرات قصيرة، ومنهم فعل بيتقسم وفعل بيتغيّر ([[nehmen]] أو [[geben]]).`,
              done: R`٦ تعليمات، الأوامر بشكل [[ihr]] صح، وتحذيرين ([[Vorsicht]]، [[Achtung]])، وفعل مقسوم وفعل متغيّر`,
              sol: R`~~~de
Wascht bitte immer die Hände!
Macht den Herd nach der Arbeit aus!
Nehmt für heiße Töpfe die Handschuhe!
Lauft bitte nicht in der Küche!
Vorsicht, das Messer ist scharf!
Achtung, der Boden ist nass!
~~~

**ليه كده:** [[ihr]]: [[wascht]]، [[macht … aus]]، [[nehmt]] (مع [[ihr]] الـ e مبتبقاش i، الكلام ده مع [[du]] و [[er]] بس)، و [[lauft]]. و [[ausmachen]] = يطفي (بيتقسم). و [[heiße Töpfe]] صفة قبل اسم (A2، خدها كده). والتحذيرات قصيرة ومن غير [[bitte]] لأن الخطر محتاج سرعة. ودي هدف في منهج الاندماج: يحذّر زمايله من خطر بكلمتين.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Imperativ (du، ihr، Sie) (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Arbeit، المطلوب والتحذيرات (2.1.2 و 2.1.3)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: Vorsicht", url: "https://www.dwds.de/wb/Vorsicht" },
            { t: "DWDS: aufpassen", url: "https://www.dwds.de/wb/aufpassen" },
            { t: "DWDS: geben", url: "https://www.dwds.de/wb/geben" },
          ],
        },
        {
          cmd: "Ich will Ärztin werden",
          title: "تدوّر على شغل: wollen و werden، والإعلان، وبتعرف تعمل إيه",
          pre: ["dea1/Was sind Sie von Beruf?", "dea1/Ist die Wohnung noch frei?"],
          desc: R`[[Was willst du später werden?]] — [[Ich will Ärztin werden.]] و [[Ich möchte in Deutschland arbeiten.]]

هنا فعل مساعد جديد: [[wollen]] (عايز، ناوي)، وتفرّقه عن [[möchten]] (عايز، بأدب). ومعاه [[werden]] (يبقى): [[Ich werde Lehrer]]. وهتقرا إعلان وظيفة، وتقول بتعرف تعمل إيه كويس ([[Ich kann gut mit Kindern arbeiten]]).`,
          teach: R`## الموقف

نورا وسامي بيتكلموا عن الشغل بعد الكورس. (Rahmencurriculum: يقول بيعرف يعمل إيه كويس وبيحب يعمل إيه، ويفهم أهم حاجة في إعلان وظيفة.)

~~~de Nora=f Sami=m
Nora: Was willst du in Deutschland machen? || عايز تعمل إيه في ألمانيا؟
Sami: Ich will als Mechaniker arbeiten. In Ägypten hatte ich eine Werkstatt. || عايز أشتغل ميكانيكي. في مصر كان عندي ورشة.
Nora: Toll! Ich will Krankenschwester werden. Ich beginne im Herbst eine Ausbildung. || حلو! أنا عايزة أبقى ممرضة. هبدأ تدريب مهني في الخريف.
Sami: Super! Du kannst sehr gut mit Menschen sprechen. || حلو جدًا! إنتي بتعرفي تتكلمي مع الناس كويس أوي.
Nora: Danke! Schau mal, hier ist eine Anzeige: Eine Werkstatt sucht einen Mechaniker. || شكرًا! بص، فيه إعلان هنا: ورشة بتدوّر على ميكانيكي.
Sami: Zeig mal! Ich möchte die Firma gleich anrufen. || ورّيني! عايز أكلّم الشركة دلوقتي.
~~~

## wollen: عايز، ناوي

| [[ich will]] | [[du willst]] | [[er/sie will]] | [[wir wollen]] | [[ihr wollt]] | [[sie/Sie wollen]] |
|---|---|---|---|---|---|

- زي باقي الأفعال المساعدة: [[ich]] و [[er]] نفس الشكل من غير [[-t]]، والمصدر في الآخر: [[Ich will in Berlin arbeiten.]]
- ⚠ [[Ich will]] **مش** «I will» الإنجليزي (المستقبل). [[will]] = عايز. والمستقبل في الألماني غالبًا بالمضارع: [[Morgen arbeite ich]].

## wollen ولا möchten؟

| | [[wollen]] | [[möchten]] |
|---|---|---|
| المعنى | عايز / ناوي (قوي، خطة) | عايز (بأدب) |
| في محل أو طلب | ممكن يبان قليل الأدب: [[Ich will einen Kaffee!]] | ✓ [[Ich möchte einen Kaffee.]] |
| خطط وأحلام | ✓ [[Ich will Ärztin werden.]] | ✓ [[Ich möchte Ärztin werden.]] |

القاعدة البسيطة: لما **تطلب** حاجة من حد، [[möchte]]. لما تتكلم عن **خطتك**، الاتنين، و [[will]] أقوى. (Goethe A1: [[ich möchte]] شكل ثابت، و [[wollen]] في قايمة الأفعال المساعدة.)

## werden: يبقى

| [[ich werde]] | [[du wirst]] | [[er/sie wird]] | [[wir werden]] | [[ihr werdet]] | [[sie/Sie werden]] |
|---|---|---|---|---|---|

~~~de
Ich will Lehrerin werden. || عايزة أبقى مدرّسة.
Mein Sohn wird bald fünf. || ابني قرّب يكمّل ٥ سنين.
Es wird kalt. || الجو بيبرد.
~~~

- [[werden]] = يبقى / يتحوّل لـ. والشغلانة بعده من غير أداة زي [[sein]]: [[Er wird Arzt.]]
- [[du wirst]] و [[er wird]] شاذين، احفظهم.
- مع [[wollen]]: [[werden]] مصدر في الآخر: [[Ich will Ärztin werden]].

## بتعرف تعمل إيه؟ können + gut

~~~de
Ich kann gut kochen. || بعرف أطبخ كويس.
Ich kann gut mit Kindern arbeiten. || بعرف أتعامل مع العيال كويس.
Ich kann Auto fahren. || بعرف أسوق.
Ich spreche Arabisch, Englisch und ein bisschen Deutsch. || بتكلم عربي وإنجليزي وشوية ألماني.
Ich arbeite gern im Team. || بحب الشغل في فريق.
~~~

ودي بالظبط اللي هتقوله في أي مقابلة أو رسالة لصاحب شغل. وفي منهج الاندماج هدف بالاسم: يقول إيه اللي بيعرف يعمله كويس وبيحب يعمله.

## إعلان الوظيفة

~~~read إعلان وظيفة
Kfz-Werkstatt Becker sucht ab sofort Mechaniker (m/w/d) || ورشة عربيات بيكر بتدوّر من دلوقتي على ميكانيكي (أي حد)
Vollzeit, 40 Stunden pro Woche || دوام كامل، ٤٠ ساعة في الأسبوع
Sie haben Erfahrung mit Autos und sprechen Deutsch (A2). || عندك خبرة في العربيات وبتتكلم ألماني (A2)
Wir bieten: ein nettes Team und gutes Geld. || إحنا بنقدّم: فريق لطيف وفلوس كويسة
Rufen Sie Herrn Becker an: 0221 556677 || كلّم أستاذ بيكر: ...
? Die Werkstatt sucht einen Mechaniker für zwanzig Stunden. || الورشة بتدوّر على ميكانيكي لـ ٢٠ ساعة
- Richtig
- Falsch *
? Man muss ein bisschen Deutsch sprechen. || لازم تتكلم شوية ألماني
- Richtig *
- Falsch
? Man soll eine E-Mail schreiben. || المفروض تبعت إيميل
- Richtig
- Falsch *
~~~

**كلمات أي إعلان:** [[sucht]] (بيدوّر على)، و [[ab sofort]]، و [[(m/w/d)]]، و [[Vollzeit]]/[[Teilzeit]]، و [[Erfahrung]] (خبرة)، و [[Wir bieten]] (بنقدّم)، و [[Sie haben …]] (المطلوب منك). وفي ألمانيا الطريقة اللي الإعلان بيقولها للتقديم (تليفون، إيميل، أونلاين) مهمة: لو قال اتصل، اتصل.

## الكلمات

~~~words الشغل الجاي
wollen | عايز، ناوي | Ich will in Deutschland arbeiten.
werden | يبقى | Er will Arzt werden.
die Stelle, die Stellen | الوظيفة | Ich suche eine Stelle.
der Job, die Jobs | الشغلانة (كلام عادي) | Ich habe einen neuen Job.
suchen | يدوّر على | Die Firma sucht einen Fahrer.
das Praktikum, die Praktika | التدريب العملي | Ich mache ein Praktikum.
der Kurs, die Kurse | الكورس | Der Deutschkurs beginnt im Mai.
das Formular, die Formulare | الاستمارة | Bitte füllen Sie das Formular aus.
unterschreiben | يمضي | Bitte unterschreiben Sie hier.
~~~

## كلمات زيادة: الدراسة

[[das Studium]] = الدراسة في الجامعة، و [[studieren]] الفعل.

~~~words الدراسة
das Studium | الدراسة في الجامعة | Nach dem Studium arbeite ich als Ärztin.
~~~

[[unterschreiben]] **مش** بيتقسم ([[Ich unterschreibe]])، عكس [[ausfüllen]] (يملا) اللي بيتقسم ([[Ich fülle das Formular aus]]). والفرق في النطق: [[UNterschreiben]]؟ لأ، النبرة على [[schreiben]]، وده بيقولك إنه مش بيتقسم.

## قول بصوتك

~~~speak
Ich will als Mechaniker arbeiten. || عايز أشتغل ميكانيكي.
Ich will Krankenschwester werden. || عايزة أبقى ممرضة.
Ich kann gut mit Kindern arbeiten. || بعرف أتعامل مع العيال كويس.
Ich möchte die Firma anrufen. || عايز أكلّم الشركة.
Ich suche eine Stelle als Fahrer. || بدوّر على شغل سوّاق.
~~~

## سمع: عايزين إيه؟

~~~hear
f: Ich arbeite jetzt als Verkäuferin, aber ich will Lehrerin werden.
? Was will die Frau werden? || الست عايزة تبقى إيه؟
- Verkäuferin
- Lehrerin *
- Ärztin

m: Ich suche einen Job am Wochenende. In der Woche besuche ich einen Deutschkurs.
? Wann will der Mann arbeiten? || الراجل عايز يشتغل إمتى؟
- am Wochenende *
- in der Woche
- am Abend

f: Die Firma sucht eine Sekretärin in Teilzeit. Sie müssen gut Englisch sprechen.
? Was ist wichtig? || إيه المهم؟
- Vollzeit
- Englisch *
- Erfahrung
~~~

## إملا

~~~dictate
Ich will Ärztin werden.
f: Ich suche eine Stelle.
Er kann gut kochen.
f: Was willst du werden?
~~~

## فيديو: wollen و mögen و möchten

~~~yt OqvuldWHr_s "Wollen" vs. "Mögen" vs. "Möchten" (Confusing German Verbs)
- **قبل ما تشغّله:** اكتب ٣ جمل: واحدة بـ [[will]]، وواحدة بـ [[möchte]]، وواحدة بـ [[mag]].
- **وإنت بتتفرج:** اكتب الفرق اللي الفيديو بيقوله بين التلاتة في سطر لكل واحد.
- **بعده:** راجع جملك التلاتة: كل فعل في مكانه؟ وغيّر أي [[will]] في طلب من محل لـ [[möchte]].
~~~`,
          deep: {
            why: R`[[wollen]] و [[werden]] في قايمة A1، وأي كلام عن خططك ومستقبلك محتاجهم. والتدوير على شغل مجال كامل في منهج الاندماج (يفهم إعلان وظيفة، ويقول بيعرف يعمل إيه، ويكتب رسالة قصيرة عن نفسه). وفي الامتحانات الإعلانات بتيجي في القراية، و «Arbeit» موضوع في Sprechen Teil 2.`,
            how: R`[[wollen]] بيتصرّف في التاني والمصدر في الآخر. [[werden]] + شغلانة من غير أداة. ومع بعض: [[Ich will … werden]]. والمهارات: [[Ich kann gut …]]. والطلب المؤدّب: [[möchte]] مش [[will]].`,
            when: R`[[Ich will …]] لخطتك وأحلامك. [[Ich möchte …]] لما تطلب من حد أو في محل. [[werden]] لأي تغيير ([[Es wird spät]]، [[Er wird Vater]]). و [[Ich kann gut …]] في المقابلة.`,
            mistakes: R`- [[Ich will einen Kaffee]] في كافيه: يبان قليل الأدب ← [[Ich möchte einen Kaffee]].
- [[Ich will morgen kommen]] بمعنى «هاجي»: معناها «ناوي آجي». للمستقبل العادي: [[Morgen komme ich]].
- [[er willt]]: ← [[er will]].
- [[du werdest]]، [[er werdet]]: ← [[du wirst]]، [[er wird]].
- [[Ich will werden Arzt]]: المصدر في الآخر ← [[Ich will Arzt werden]].
- [[Ich unterschreibe … unter]]: [[unterschreiben]] مش بيتقسم.`
          },
          try: R`قول ٥ جمل عن خطتك: عايز تبقى إيه أو تشتغل إيه ([[Ich will …]])، وليه، وبتعرف تعمل إيه كويس ([[Ich kann gut …]])، ومحتاج تتعلم إيه. وبعدين اقرا الإعلان اللي فوق تاني وقول بالكلام المطلوب فيه.`,
          practice: [
            { lvl: 'سريع', t: R`**صرّف:** (١) Ich ___ (wollen) Ärztin werden. (٢) ___ (wollen) du mitkommen? (٣) Er ___ (werden) bald Vater. (٤) Du ___ (werden) sicher eine gute Lehrerin. (٥) Wir ___ (wollen) in Köln wohnen. (٦) Es ___ (werden) kalt.`,
              done: R`الستة صح، و [[will]] و [[wird]] و [[wirst]]`,
              sol: R`~~~de
Ich will Ärztin werden.
Willst du mitkommen?
Er wird bald Vater.
Du wirst sicher eine gute Lehrerin.
Wir wollen in Köln wohnen.
Es wird kalt.
~~~

**ليه:** [[ich will]] و [[er will]] من غير [[-t]]، و [[du willst]]. و [[werden]]: [[du wirst]]، [[er/es wird]] (شاذين). وفي (٤) [[eine gute Lehrerin]] مع أداة لأن فيه صفة قبلها (الشغلانة لوحدها من غير أداة، بس «مدرّسة كويسة» بأداة).` },
            { lvl: 'تطبيق', t: R`**will ولا möchte؟** (١) في كافيه: Ich ___ einen Tee, bitte. (٢) عن خطتك: Ich ___ nächstes Jahr in Deutschland studieren. (٣) في محل: ___ Sie eine Tüte? (٤) صاحبك عنيد: Er ___ nicht zum Arzt gehen! (٥) في التليفون مع شركة: Ich ___ bitte mit Frau Klein sprechen.`,
              done: R`الخمسة صح، و [[möchte]] في كل طلب مؤدّب`,
              sol: R`~~~de
Ich möchte einen Tee, bitte.
Ich will nächstes Jahr in Deutschland studieren.
Möchten Sie eine Tüte?
Er will nicht zum Arzt gehen!
Ich möchte bitte mit Frau Klein sprechen.
~~~

**ليه:** الطلبات والعروض المؤدّبة ← [[möchte]] (١، ٣، ٥). الخطة القوية ← [[will]] (٢)، و [[möchte]] كمان صح. والعِند والإصرار ← [[will]] (٤): [[Er will nicht]] = مش عايز ومصمم.` },
            { lvl: 'تطبيق', t: R`**رسالة عن نفسك:** اكتب ٥ جمل لمكتب شغل (Jobcenter) عن نفسك: شغلتك القديمة، والشغل اللي عايزه، وحاجتين بتعرف تعملهم كويس، والألماني بتاعك.`,
              done: R`٥ جمل، فيهم [[war]] أو [[habe … gearbeitet]] للقديم، و [[will]] أو [[möchte]] للجاي، و [[Ich kann gut …]] مرتين`,
              sol: R`~~~de
In Ägypten war ich Koch in einem Hotel.
Ich möchte auch hier als Koch arbeiten.
Ich kann gut kochen, auch für viele Menschen.
Ich kann gut im Team arbeiten.
Ich lerne Deutsch und bin jetzt auf Niveau A1.
~~~

**ليه كده:** [[war]] للماضي (من وحدة الوقت). و [[möchte]] في رسالة رسمية أطبع من [[will]]. و [[Ich kann gut …]] مرتين بمهارتين مختلفتين. و [[auf Niveau A1]] = في مستوى A1. ودي «رسالة بسيطة جدًا فيها معلومات مهمة عن نفسه»، هدف بالاسم في منهج الاندماج.` },
            { lvl: 'تحدي', t: R`**إعلان وأسئلة:** اقرا الإعلان ده واكتب ٣ أسئلة هتسألهم في التليفون، و ٣ جمل عن نفسك تقولهم في أول المكالمة: [[Bäckerei Sonne sucht Verkäufer/in (m/w/d), Teilzeit, Frühschicht ab 6 Uhr, auch samstags. Bitte anrufen: 0711 123456.]]`,
              done: R`٣ أسئلة مفيدة (مش متجاوبة في الإعلان)، و ٣ جمل عنك فيهم [[Ich habe Ihre Anzeige gelesen]] أو [[Ich rufe wegen der Anzeige an]]، و [[Ich kann …]]`,
              sol: R`**أول المكالمة:**

~~~de
Guten Tag, mein Name ist Lina Fawzi.
Ich rufe wegen der Anzeige an. Ist die Stelle noch frei?
Ich habe schon in einer Bäckerei gearbeitet und ich kann früh aufstehen.
~~~

**أسئلة:**

~~~de
Wie viele Stunden sind es pro Woche?
Wie viel verdient man pro Stunde?
Wann kann ich anfangen?
~~~

**ليه كده:** الإعلان قال إن الشغل نص دوام وبدري والسبت، فمتسألش عنهم. اسأل عن اللي **مش** مكتوب: الساعات، والفلوس، وإمتى تبدأ. و [[Ist die Stelle noch frei?]] نفس سؤال الشقة. و [[ich kann früh aufstehen]] بيرد على [[Frühschicht ab 6 Uhr]] من غير ما تكرره، وده بيبيّن إنك فهمت الإعلان.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Modalverben (wollen) و Konjunktiv II als feste Wendung (ich möchte) (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Arbeitssuche (3.1.3 و 3.4.1 و 3.4.2، ص ٩٦–٩٩)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: wollen", url: "https://www.dwds.de/wb/wollen" },
            { t: "DWDS: werden", url: "https://www.dwds.de/wb/werden" },
            { t: "DWDS: Stelle", url: "https://www.dwds.de/wb/Stelle" },
          ],
        },
        {
          cmd: "Was hast du gestern gemacht?",
          title: "أول ماضي: الـ Perfekt بـ haben و sein",
          pre: ["dea1/Ich will Ärztin werden", "dea1/Hast du am Samstag Zeit?"],
          desc: R`[[Was hast du gestern gemacht?]] (عملت إيه امبارح؟) — [[Ich habe lange gearbeitet. Dann bin ich nach Hause gefahren.]]

ده الـ **Perfekt**، الماضي اللي الألمان بيتكلموا بيه كل يوم. وبيتعمل من حاجتين: [[haben]] أو [[sein]] في المكان التاني، وشكل تاني من الفعل في الآخر ([[gemacht]]، [[gefahren]]). نفس الإطار اللي اتعلمته مع [[können]].`,
          teach: R`## الموقف

يوم الاتنين في الشغل. (Goethe A1: Perfekt لأفعال القايمة، و CEFR A1: يحكي حاجات بسيطة حصلت.)

~~~de Lea=f Karim=m
Lea: Hallo Karim! Wie war das Wochenende? || أهلًا كريم! الويك إند كان عامل إزاي؟
Karim: Gut! Am Samstag habe ich lange geschlafen. || حلو! يوم السبت نمت كتير.
Lea: Und was hast du dann gemacht? || وبعدين عملت إيه؟
Karim: Ich habe Deutsch gelernt und am Abend einen Film gesehen. || ذاكرت ألماني وبالليل اتفرجت على فيلم.
Lea: Und am Sonntag? || ويوم الحد؟
Karim: Am Sonntag bin ich nach Bonn gefahren. Meine Schwester wohnt da. || يوم الحد سافرت بون. أختي ساكنة هناك.
Lea: Schön! Ich bin zu Hause geblieben. Ich war ein bisschen krank. || حلو! أنا قعدت في البيت. كنت عيانة شوية.
~~~

## الإطار تاني: haben/sein + الفعل في الآخر

| ١ | ٢ ([[haben]]/[[sein]]) | … | الآخر (Partizip II) |
|---|---|---|---|
| [[Ich]] | [[habe]] | [[gestern lange]] | [[gearbeitet]]. |
| [[Gestern]] | [[habe]] | [[ich lange]] | [[gearbeitet]]. |
| [[Was]] | [[hast]] | [[du]] | [[gemacht]]? |
| [[Am Sonntag]] | [[bin]] | [[ich nach Bonn]] | [[gefahren]]. |

نفس شكل [[Ich kann am Freitag kommen]]: [[haben]] أو [[sein]] بيتصرّف في المكان التاني، والفعل التاني (اسمه **Partizip II**) في الآخر ومبيتغيّرش.

## Partizip II: الأفعال العادية

[[ge]] + الأصل + [[t]]:

| المصدر | Partizip II |
|---|---|
| [[machen]] | [[gemacht]] |
| [[arbeiten]] | [[gearbeitet]] (الأصل آخره t ← [[-et]]) |
| [[lernen]] | [[gelernt]] |
| [[fragen]] | [[gefragt]] |
| [[glauben]] | [[geglaubt]] |
| [[haben]] | [[gehabt]] |

## Partizip II: الأفعال الشاذة

[[ge]] + الأصل (وأحيانًا حرف بيتغيّر) + [[en]]. دول بيتحفظوا:

| المصدر | Partizip II |
|---|---|
| [[essen]] | [[gegessen]] |
| [[trinken]] | [[getrunken]] |
| [[lesen]] | [[gelesen]] |
| [[sehen]] | [[gesehen]] |
| [[schlafen]] | [[geschlafen]] |
| [[fahren]] | [[gefahren]] |
| [[bleiben]] | [[geblieben]] |

## من غير ge

- أفعال آخرها [[-ieren]]: [[passieren]] ← [[passiert]]، و [[telefonieren]] ← [[telefoniert]]، و [[studieren]] ← [[studiert]].
- أفعال بتبدأ بـ [[ver-]] أو [[be-]] (مبتتقسمش): [[verstehen]] ← [[verstanden]]، و [[besuchen]] ← [[besucht]].
- الأفعال اللي بتتقسم: الـ [[ge]] في النص: [[einkaufen]] ← [[eingekauft]]، و [[anrufen]] ← [[angerufen]].

## haben ولا sein؟

**أغلب الأفعال [[haben]].** و [[sein]] مع:
1. **حركة من مكان لمكان:** [[fahren]] ← [[Ich bin nach Bonn gefahren]]، و [[gehen]] ← [[Ich bin ins Kino gegangen]]، و [[kommen]] ← [[Er ist spät gekommen]].
2. **تغيير حالة:** [[werden]]، و [[passieren]] ← [[Was ist passiert?]] (إيه اللي حصل؟).
3. **و [[bleiben]]:** [[Ich bin zu Hause geblieben]] (رغم إنه مفيهوش حركة، احفظه).

| | |
|---|---|
| [[Ich habe gegessen.]] | [[Ich bin gefahren.]] |
| [[Er hat geschlafen.]] | [[Er ist geblieben.]] |
| [[Wir haben gelernt.]] | [[Was ist passiert?]] |

## الماضي بتاع sein و haben: war و hatte

مع [[sein]] و [[haben]] نفسهم، الألمان بيستخدموا [[war]] و [[hatte]] أكتر من الـ Perfekt (اتعلمتهم في وحدة الوقت):

~~~de
Ich war krank. || كنت عيان.
Ich hatte keine Zeit. || مكانش عندي وقت.
Wie war die Arbeit? || الشغل كان عامل إزاي؟
~~~

## Wie war …? تحكي يومك

~~~de
Was hast du am Wochenende gemacht? || عملت إيه في الويك إند؟
Ich habe meine Eltern besucht. || زرت أهلي.
Wir haben Pizza gegessen. || أكلنا بيتزا.
Was ist passiert? || إيه اللي حصل؟
Ich habe das nicht verstanden. || مفهمتش ده.
~~~

## الكلمات

~~~words أزمنة وكلام عن الماضي
gestern | امبارح | Gestern habe ich viel gearbeitet.
vorgestern | أول امبارح | Vorgestern war ich krank.
letzte Woche | الأسبوع اللي فات | Letzte Woche hatte ich Urlaub.
bleiben | يفضل، يقعد | Ich bin zu Hause geblieben.
glauben | يصدّق، يفتكر | Ich habe das nicht geglaubt.
verstehen | يفهم | Hast du das verstanden?
fragen | يسأل | Ich habe den Chef gefragt.
passieren | يحصل | Was ist passiert?
schlafen | ينام | Ich habe gut geschlafen.
~~~

## قول بصوتك

~~~speak
Was hast du gestern gemacht? || عملت إيه امبارح؟
Ich habe lange gearbeitet. || اشتغلت كتير.
Am Sonntag bin ich nach Bonn gefahren. || يوم الحد سافرت بون.
Ich bin zu Hause geblieben. || قعدت في البيت.
Was ist passiert? || إيه اللي حصل؟
~~~

## سمع: حصل إيه؟

~~~hear
m: Gestern habe ich nicht gearbeitet. Ich war beim Arzt und bin dann zu Hause geblieben.
? Was hat der Mann gestern gemacht? || الراجل عمل إيه امبارح؟
- Er hat gearbeitet.
- Er war beim Arzt. *
- Er ist gefahren.

f: Am Wochenende bin ich nach Hamburg gefahren. Dort habe ich meine Freundin besucht.
? Wen hat die Frau besucht? || الست زارت مين؟
- ihre Eltern
- ihre Freundin *
- ihren Bruder

m: Ich habe die E-Mail gelesen, aber ich habe sie nicht verstanden.
? Was ist das Problem? || المشكلة إيه؟
- Er hat die E-Mail nicht gelesen.
- Er hat die E-Mail nicht verstanden. *
- Er hat keine E-Mail.
~~~

## إملا

~~~dictate
Ich habe viel gearbeitet.
f: Was hast du gestern gemacht?
Ich bin nach Hause gefahren.
f: Was ist passiert?
~~~

## فيديو: الـ Perfekt

~~~yt 0q8ceeaEI68 Perfect Tense in German
- **قبل ما تشغّله:** اكتب Partizip II لـ ٦ أفعال من الجداول اللي فوق من غير ما تبص.
- **وإنت بتتفرج:** اكتب الأفعال اللي بتاخد [[sein]] اللي بيقولها الفيديو، وقارنها بالقاعدة اللي فوق.
- **بعده:** احكي الويك إند بتاعك في ٥ جمل Perfekt، ومنهم واحدة على الأقل بـ [[sein]].
~~~`,
          deep: {
            why: R`الـ Perfekt هو الماضي بتاع الكلام في ألمانيا: «عملت إيه؟»، «إيه اللي حصل؟»، «فهمت؟». و Goethe بيطلبه في A1 لأفعال بعينها (اللي في الجداول: arbeiten، bleiben، essen، fahren، fragen، glauben، haben، lesen، lernen، machen، schlafen، sehen، passieren، trinken، verstehen). وفي Sprechen و Schreiben هتحتاج تقول عملت إيه أو حصل إيه، خصوصًا في رسالة اعتذار.`,
            how: R`[[haben]] (أغلب الأفعال) أو [[sein]] (حركة، وتغيير، و [[bleiben]]) بيتصرّف في المكان التاني، و Partizip II في الآخر. العادي: [[ge-…-t]]. الشاذ: [[ge-…-en]] بيتحفظ. ومن غير [[ge]]: [[-ieren]] و [[ver-]]/[[be-]]. ومع [[sein]] و [[haben]] نفسهم: [[war]] و [[hatte]].`,
            when: R`أي حاجة حصلت وخلصت وبتحكيها: [[Ich habe … gemacht]]. [[Was ist passiert?]] لما حد شكله زعلان أو حصلت مشكلة. [[Hast du … verstanden?]] بعد ما تشرح حاجة. و [[war]]/[[hatte]] بدل [[bin gewesen]]/[[habe gehabt]] في الكلام.`,
            mistakes: R`- [[Ich habe gefahren nach Bonn]]: [[fahren]] حركة ← [[Ich bin nach Bonn gefahren]]، والـ Partizip في الآخر.
- [[Ich habe gearbeitet gestern]]: ← [[Ich habe gestern gearbeitet]].
- [[gemachen]] أو [[geschlaft]]: ← [[gemacht]] (عادي) و [[geschlafen]] (شاذ).
- [[gepassiert]] أو [[geversteht]]: ← [[passiert]] و [[verstanden]] (من غير ge).
- [[Ich habe zu Hause geblieben]]: ← [[Ich bin zu Hause geblieben]].
- [[Ich bin krank gewesen]] مش غلط، بس الأطبع [[Ich war krank]].`
          },
          try: R`احكي امبارح بصوت عالي في ٦ جمل Perfekt بالترتيب (الصبح، والشغل، والأكل، وبالليل)، واستخدم [[sein]] مرة على الأقل و [[war]] أو [[hatte]] مرة. وبعدين اسأل حد ٣ أسئلة عن الويك إند بتاعه.`,
          practice: [
            { lvl: 'سريع', t: R`**Partizip II:** (١) machen (٢) arbeiten (٣) essen (٤) sehen (٥) fahren (٦) verstehen (٧) passieren (٨) trinken (٩) lernen (١٠) bleiben`,
              done: R`العشرة صح، ومن غير [[ge]] في (٦) و (٧)`,
              sol: R`~~~de
gemacht
gearbeitet
gegessen
gesehen
gefahren
verstanden
passiert
getrunken
gelernt
geblieben
~~~

**ليه:** العاديين [[ge-…-t]]: [[gemacht]]، [[gelernt]]، و [[gearbeitet]] (الـ e عشان آخر الأصل t). الشاذين [[ge-…-en]]: [[gegessen]]، [[gesehen]]، [[gefahren]]، [[getrunken]]، [[geblieben]]. و [[verstanden]] من غير [[ge]] عشان [[ver-]]، و [[passiert]] عشان [[-ieren]].` },
            { lvl: 'تطبيق', t: R`**haben ولا sein؟** (١) Ich ___ gestern lange geschlafen. (٢) Wir ___ nach Köln gefahren. (٣) Was ___ passiert? (٤) Sie ___ zu Hause geblieben. (٥) ___ du die E-Mail gelesen? (٦) Er ___ spät nach Hause gekommen.`,
              done: R`الستة صح، و [[sein]] مع الحركة و [[passieren]] و [[bleiben]]`,
              sol: R`~~~de
Ich habe gestern lange geschlafen.
Wir sind nach Köln gefahren.
Was ist passiert?
Sie ist zu Hause geblieben.
Hast du die E-Mail gelesen?
Er ist spät nach Hause gekommen.
~~~

**ليه:** [[schlafen]] و [[lesen]] ← [[haben]] (مفيش حركة). [[fahren]] و [[kommen]] حركة ← [[sein]]. و [[passieren]] (تغيير) و [[bleiben]] ← [[sein]] (احفظهم).` },
            { lvl: 'تطبيق', t: R`**حوّل للماضي:** (١) Ich arbeite bis sechs. (٢) Wir essen im Restaurant. (٣) Er fährt nach Berlin. (٤) Ich verstehe das nicht. (٥) Sie trinkt einen Kaffee. (٦) Ich bin krank.`,
              done: R`الستة صح بالإطار، و [[war]] في (٦)`,
              sol: R`~~~de
Ich habe bis sechs gearbeitet.
Wir haben im Restaurant gegessen.
Er ist nach Berlin gefahren.
Ich habe das nicht verstanden.
Sie hat einen Kaffee getrunken.
Ich war krank.
~~~

**ليه:** الفعل الأصلي بيتحوّل لـ Partizip في الآخر، و [[haben]]/[[sein]] بياخدوا مكانه في التاني. و [[nicht]] قبل الـ Partizip. ومع [[sein]] نفسه الأطبع [[war]].` },
            { lvl: 'تحدي', t: R`**إيه اللي حصل؟** إنت اتأخرت على الشغل ساعة. اكتب ٦ جمل Perfekt تحكي فيهم للمدير إيه اللي حصل الصبح بالترتيب، ومنهم جملتين على الأقل بـ [[sein]].`,
              done: R`٦ جمل بالترتيب، كلهم Perfekt (أو [[war]]/[[hatte]])، و [[sein]] مرتين، والـ Partizip في الآخر`,
              sol: R`~~~de Karim=m
Karim: Entschuldigung, Frau Weber! Heute Morgen ist viel passiert. || آسف يا مدام فيبر! الصبح حصلت حاجات كتير.
Karim: Ich habe den Wecker nicht gehört. || مسمعتش المنبّه.
Karim: Dann habe ich schnell gefrühstückt. || وبعدين فطرت بسرعة.
Karim: Ich bin zur Haltestelle gelaufen, aber der Bus ist nicht gekommen. || جريت على المحطة، بس الأتوبيس مجاش.
Karim: Ich habe dreißig Minuten gewartet. || استنيت ٣٠ دقيقة.
Karim: Dann bin ich mit dem Taxi gefahren. Es tut mir sehr leid. || وبعدين ركبت تاكسي. آسف جدًا.
~~~

**ليه كده:** [[passiert]] و [[gelaufen]] و [[gekommen]] و [[gefahren]] مع [[sein]] (تغيير وحركة). و [[gehört]] و [[gefrühstückt]] و [[gewartet]] عاديين مع [[haben]] ([[warten]] آخره t ← [[gewartet]]). و [[mit dem Taxi]] و [[zur Haltestelle]] Dativ، هتتشرح في وحدة المواصلات. والاعتذار بالتفاصيل كده بالظبط اللي هتعمله في Schreiben Teil 2.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Perfekt (arbeiten، bleiben، essen، fahren، fragen، glauben، haben، lesen، lernen، machen، schlafen، sehen، passieren، trinken، verstehen) و Satzklammer (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "CEFR Companion volume: Sustained monologue، A1 (يحكي حاجات بسيطة)", url: "https://rm.coe.int/16809ea0d4" },
            { t: "DWDS: machen", url: "https://www.dwds.de/wb/machen" },
            { t: "DWDS: fahren", url: "https://www.dwds.de/wb/fahren" },
            { t: "DWDS: passieren", url: "https://www.dwds.de/wb/passieren" },
          ],
        },
        {
          cmd: "Prüfung: Schreiben Teil 2, Hören Teil 3, Sprechen Teil 2",
          title: "تدريب الامتحان: إيميل اعتذار للشغل، ورسايل تليفون، وأسئلة عن الشغل",
          pre: ["dea1/Prüfung: Hören Teil 3, Schreiben Teil 2", "dea1/Was hast du gestern gemacht?", "dea1/Prüfung: Sprechen Teil 2 und 3, Hören Teil 2"],
          desc: R`**Schreiben Teil 2:** رسالة قصيرة (حوالي ٣٠ كلمة) فيها ٣ نقط مطلوبة. والنهارده الموقف المشهور: **إنت عيان ومش هتقدر تروح الشغل**. كل نقطة عليها ٣، وشكل الرسالة (التحية والختام) ١: ١٠ نقط.

**Hören Teil 3:** رسايل على الأنسرماشين بتتسمع مرتين، والنهارده من الشغل (المدير، والزمايل، وشركات). **Sprechen Teil 2:** موضوع «Arbeit».`,
          teach: R`## Schreiben Teil 2: إيه اللي بيتطلب

اتدربت عليه في وحدة الوقت. فكرة سريعة:

| | |
|---|---|
| الطول | حوالي ٣٠ كلمة |
| المطلوب | ٣ نقط (Leitpunkte) مكتوبين في السؤال |
| التصحيح | كل نقطة لحد ٣، والشكل (تحية وختام مناسبين) ١: المجموع ١٠ |
| الإملا | الغلط بيتخصم بس لو بيبوّظ الفهم |

## الموقف: عيان ومش هتروح الشغل

> Sie sind krank und können morgen nicht zur Arbeit kommen. Schreiben Sie Ihrer Chefin, Frau Berger, eine E-Mail.
> - Warum schreiben Sie?
> - Wie lange sind Sie krank?
> - Wer kann Ihre Arbeit machen?

**النموذج:**

~~~de
Liebe Frau Berger,
leider bin ich krank und kann morgen nicht zur Arbeit kommen.
Der Arzt sagt, ich muss bis Freitag zu Hause bleiben.
Mein Kollege Herr Klein kann meine Termine machen.
Viele Grüße
Karim Hassan
~~~

**ليه ده بياخد ١٠:**
1. **ليه بتكتب:** [[leider bin ich krank und kann morgen nicht … kommen]] (٣).
2. **قد إيه:** [[bis Freitag]] (٣).
3. **مين يعمل الشغل:** [[Mein Kollege Herr Klein kann …]] (٣).
4. **الشكل:** [[Liebe Frau Berger]] و [[Viele Grüße]] والاسم (١).

## Liebe ولا Sehr geehrte؟

| | للمدير اللي تعرفه | لحد رسمي متعرفوش |
|---|---|---|
| البداية | [[Liebe Frau Berger,]] / [[Lieber Herr Klein,]] | [[Sehr geehrte Frau Berger,]] / [[Sehr geehrter Herr Klein,]] |
| الختام | [[Viele Grüße]] | [[Mit freundlichen Grüßen]] |
| بعد الفاصلة | السطر اللي بعدها بحرف صغير: [[leider bin ich …]] | |

## جمل جاهزة للاعتذار عن الشغل

~~~de
Leider bin ich krank. || للأسف أنا عيان.
Ich kann heute nicht kommen. || مش هقدر آجي النهارده.
Ich komme morgen wieder. || هرجع بكرة.
Ich bringe die Krankmeldung am Montag. || هجيب ورقة العيان يوم الاتنين.
Mein Kind ist krank. Ich muss zu Hause bleiben. || ابني عيان. لازم أقعد في البيت.
Der Bus ist nicht gekommen. Ich komme zwanzig Minuten später. || الأتوبيس مجاش. هتأخر ٢٠ دقيقة.
~~~

**عادة مهمة:** في ألمانيا لو عيان لازم **تبلّغ قبل ميعاد الشغل** (تليفون أو إيميل)، ومن تالت يوم غالبًا لازم ورقة من الدكتور ([[die Krankmeldung]] أو [[die Arbeitsunfähigkeitsbescheinigung]]، والكلمة الطويلة دي هتلاقيها مكتوبة كده بالظبط). ودي أهداف بالاسم في منهج الاندماج: يبلّغ بالكلام وبالكتابة إنه عيان.

## Hören Teil 3: رسايل من الشغل

بتتسمع **مرتين**، وعلى كل واحدة سؤال و ٣ اختيارات. اقرا السؤال قبل الصوت، والسمع الأول للموقف، والتاني للتفصيلة (الساعة، اليوم، الرقم).

~~~hear Hören Teil 3
f: Hallo Karim, hier ist Frau Berger. Morgen müssen Sie nicht um acht kommen, sondern erst um zehn. Wir haben am Morgen ein Meeting. Bis morgen!
? Wann soll Karim morgen kommen? || كريم المفروض ييجي بكرة إمتى؟
- um acht Uhr
- um zehn Uhr *
- am Nachmittag

m: Guten Tag, Frau Ali. Hier ist die Firma Becker. Sie können am Donnerstag um vierzehn Uhr zum Gespräch kommen. Bitte bringen Sie Ihren Lebenslauf mit.
? Was soll Frau Ali mitbringen? || مدام علي المفروض تجيب إيه معاها؟
- ihren Pass
- ihren Lebenslauf *
- ein Foto

f: Hallo Omar, hier ist Lea. Ich bin heute krank. Kannst du bitte meine Spätschicht machen? Ruf mich bitte an. Danke!
? Was möchte Lea? || ليا عايزة إيه؟
- Omar soll zum Arzt gehen.
- Omar soll ihre Schicht machen. *
- Omar soll eine E-Mail schreiben.

m: Hier ist die Praxis Doktor Wolf. Ihre Krankmeldung ist fertig. Sie können sie heute bis achtzehn Uhr abholen.
? Bis wann kann man die Krankmeldung abholen? || ممكن تاخد ورقة العيان لحد إمتى؟
- bis acht Uhr
- bis sechzehn Uhr
- bis achtzehn Uhr *
~~~

**الفخاخ:** (١) [[nicht um acht, sondern erst um zehn]]. (٢) [[Lebenslauf]] = الـ CV، و [[mitbringen]]. (٣) ليا عيانة، بس المطلوب من عمر الوردية. (٤) [[achtzehn]] و [[acht]] و [[sechzehn]] قريبين في السمع.

## Sprechen Teil 2: موضوع «Arbeit»

~~~de
Was bist du von Beruf? || كارت Beruf
Wann fängst du morgens an? || كارت Arbeitszeit
Wie lange hast du Pause? || كارت Pause
Wie viele Tage Urlaub hast du? || كارت Urlaub
Arbeitest du gern im Team? || كارت Kollegen
Was machst du nach der Arbeit? || كارت Feierabend
~~~

نفس قاعدة الوحدة التالتة: سؤال بفعل (W-Frage أو الفعل الأول)، عن الموضوع، والإجابة جملة كاملة.

## صحّح نفسك بموديل AI

~~~prompt طلب تصحيح: Goethe A1، Schreiben Teil 2
Du bist Prüfer für das Goethe-Zertifikat A1 (Start Deutsch 1), Schreiben Teil 2.
Aufgabe: Sie sind krank und können morgen nicht zur Arbeit kommen. Schreiben Sie Ihrer Chefin, Frau Berger, eine E-Mail (circa 30 Wörter). Warum schreiben Sie? Wie lange sind Sie krank? Wer kann Ihre Arbeit machen?
Bewertung: jeder Inhaltspunkt maximal 3 Punkte, Textsorte (Anrede, Gruß) maximal 1 Punkt. Orthografie nur, wenn das Verstehen gestört ist.
Antworte auf Ägyptisch-Arabisch, deutsche Wörter auf Deutsch.
1. Punkte für jeden Inhaltspunkt und die Textsorte, mit Grund.
2. Jeder Fehler: falsch, richtig, warum (ein Satz).
3. Eine bessere Version nur mit A1-Wörtern.
Mein Text:
~~~`,
          deep: {
            why: R`Schreiben Teil 2 بـ ١٠ نقط من ١٥ في الكتابة، والاعتذار للشغل أو للكورس من أشهر مواقفه. و Hören Teil 3 رسايله كتير من شغل أو عيادة أو شركة. وفي الحياة: لو عيان ومبلّغتش صح في ألمانيا، دي مشكلة حقيقية في الشغل.`,
            how: R`Schreiben: تحية مناسبة ← النقط التلاتة بالترتيب، جملة أو اتنين لكل واحدة ← ختام واسمك. Hören: السؤال قبل الصوت، والتفصيلة في السمع التاني. Sprechen Teil 2: كلمة الكارت + الموضوع ← سؤال بفعل.`,
            when: R`[[Liebe Frau …]] لمديرك اللي بتتعامل معاه كل يوم، و [[Sehr geehrte …]] لشركة لسه متعرفهاش. [[Leider …]] أول جملة في أي اعتذار. و [[Ich komme … später]] لما هتتأخر بس.`,
            mistakes: R`- تنسى نقطة من التلاتة: ٣ نقط راحوا كلهم.
- تكتب ٨٠ كلمة: مش هتاخد أكتر، وهتغلط أكتر.
- [[Lieber Frau Berger]]: ← [[Liebe Frau Berger]] (ست)، و [[Lieber Herr …]] (راجل).
- [[Leider ich bin krank]]: بعد [[Leider]] الفعل على طول ← [[Leider bin ich krank]].
- [[Ich kann nicht kommen morgen]]: ← [[Ich kann morgen nicht kommen]].
- في السمع: تختار [[acht]] لما الرسالة قالت [[nicht um acht, sondern um zehn]].`
          },
          try: R`اكتب الإيميل بتاع العيان بكلامك من غير ما تبص على النموذج، وصحّحه بالطلب الجاهز. وحل الأربع رسايل من غير ما تفتح النص، وقول أسئلة Sprechen الستة بصوت عالي مع إجاباتك.`,
          practice: [
            { lvl: 'سريع', t: R`**التحية والختام:** اكتب البداية والختام لكل واحدة: (١) لمديرتك Frau Berger اللي بتشوفها كل يوم. (٢) لشركة بتقدّم فيها على شغل، والمسؤول Herr Busch. (٣) لزميلك Jonas.`,
              done: R`التلاتة صح، و [[Liebe]]/[[Lieber]]/[[Sehr geehrter]] مظبوطين على الراجل والست`,
              sol: R`~~~de
Liebe Frau Berger, … Viele Grüße
Sehr geehrter Herr Busch, … Mit freundlichen Grüßen
Lieber Jonas, … Viele Grüße
~~~

**ليه:** مديرتك اللي تعرفها ← [[Liebe]] و [[Viele Grüße]]. شركة رسمية لسه متعرفهاش ← [[Sehr geehrter Herr]] و [[Mit freundlichen Grüßen]]. زميل ← [[Lieber]] باسمه الأول. ولزميل ممكن كمان [[Hallo Jonas]] و [[Liebe Grüße]] أو [[Bis morgen]].` },
            { lvl: 'تطبيق', t: R`**Schreiben Teil 2 تاني:** [[Ihr Kind ist krank. Sie können heute nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Lehrerin, Frau Wolf.]] النقط: ليه مش هتيجي؟ هتيجي إمتى تاني؟ اطلب الواجب.`,
              done: R`حوالي ٣٠ كلمة، والتلات نقط، وتحية وختام مناسبين، وطلب الواجب بـ [[Können Sie …?]] أو [[Bitte …]]`,
              sol: R`~~~de
Liebe Frau Wolf,
leider kann ich heute nicht zum Kurs kommen. Mein Sohn ist krank.
Am Donnerstag komme ich wieder.
Können Sie mir bitte die Hausaufgaben per E-Mail schicken?
Viele Grüße
Mona Adel
~~~

**ليه كده:** (١) [[leider kann ich … nicht … kommen. Mein Sohn ist krank.]] (٢) [[Am Donnerstag komme ich wieder.]] (٣) [[Können Sie mir bitte die Hausaufgaben … schicken?]] ([[mir]] Dativ، و [[schicken]] في الآخر). حوالي ٣٠ كلمة. و [[per E-Mail]] = بالإيميل.` },
            { lvl: 'تطبيق', t: R`**رسالة زيادة (اسمعها مرتين بس):**

~~~hear
m: Hallo, hier ist Jonas aus dem Büro. Das Meeting ist nicht am Dienstag, sondern am Mittwoch. Die Uhrzeit bleibt gleich: neun Uhr. Bis dann!
? Wann ist das Meeting? || الاجتماع إمتى؟
- am Dienstag um neun
- am Mittwoch um neun *
- am Mittwoch um zehn
~~~`,
              done: R`صح من أول أو تاني سمع، وعارف ليه الاختيارين التانيين غلط`,
              sol: R`**الإجابة:** am Mittwoch um neun.

**ليه:** [[nicht am Dienstag, sondern am Mittwoch]]: اليوم اتغيّر. و [[Die Uhrzeit bleibt gleich: neun Uhr]] = الساعة زي ما هي. والاختيار التالت فخ: اليوم صح والساعة غلط. والسؤال بيجمع حاجتين، فلازم الاتنين يبقوا صح.` },
            { lvl: 'تحدي', t: R`**بلّغ بالتليفون:** اكتب اللي هتقوله على أنسرماشين مديرك (٥–٦ جمل) لما تكون عيان: مين إنت، والمشكلة، وقد إيه، والشغل المهم النهارده، ورقمك.`,
              done: R`٥–٦ جمل، فيهم [[hier ist …]]، و [[leider]]، ومدة، وحاجة واحدة على الأقل في الـ Perfekt أو [[war]]، وطلب، والرقم مقسوم أرقام`,
              sol: R`~~~de Karim=m
Karim: Guten Morgen, Frau Berger, hier ist Karim Hassan. || صباح الخير يا مدام برجر، أنا كريم حسن.
Karim: Leider bin ich krank. Ich war heute Morgen beim Arzt. || للأسف أنا عيان. كنت عند الدكتور الصبح.
Karim: Ich muss bis Mittwoch zu Hause bleiben. || لازم أقعد في البيت لحد الأربع.
Karim: Heute um elf habe ich einen Termin mit Herrn Busch. Können Sie ihn bitte anrufen? || النهارده الساعة ١١ عندي ميعاد مع أستاذ بوش. ممكن حضرتك تكلّميه؟
Karim: Meine Nummer ist null eins sieben sechs, zwei drei vier, fünf sechs sieben. || رقمي ...
Karim: Vielen Dank und auf Wiederhören! || شكرًا جدًا ومع السلامة!
~~~

**ليه كده:** [[hier ist …]] في التليفون. و [[Ich war … beim Arzt]] ماضي. و [[bis Mittwoch]] المدة. و [[Können Sie ihn bitte anrufen?]] طلب ([[ihn]] = أستاذ بوش، Akkusativ). والأرقام بتتقال رقم رقم أو مجموعات صغيرة، زي ما اتعلمت في أول وحدة. ودي هدف بالاسم في منهج الاندماج: يبلّغ في التليفون إنه عيان.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Schreiben Teil 2 والتقييم (ص ٣٧–٣٨)، و Hören Teil 3 (ص ٢٧)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Goethe-Zertifikat A1: Übungssatz 01 (امتحان تجريبي رسمي ببلاش)", url: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Arbeit، يبلّغ إنه عيان (2.1.3.1 و 2.1.3.2، ص ٨٥)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: Krankmeldung", url: "https://www.dwds.de/wb/Krankmeldung" },
          ],
        },
      ],
    },
]);
