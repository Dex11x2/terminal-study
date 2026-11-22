MORE("dea1", [
    {
      t: "السكن (Wohnen)",
      l: 2,
      pre: ["dea1/Sein Bruder, ihre Schwester", "dea1/Wo finde ich Reis?"],
      n: R`شقتك فيها كام أوضة وشكلها إيه، وفين كل حاجة فيها، وإزاي تقرا إعلان شقة وتتصل تسأل عليها، وتتعرف على جيرانك وتطلب منهم مساعدة، وتفهم قواعد العمارة واليافطات. والقواعد الكبيرة هنا اتنين: **Dativ للمكان** ([[im Wohnzimmer]]، [[auf dem Tisch]]: كنت بتقولها كده من غير ما تعرف ليه، ودلوقتي هتعرف)، والأفعال المساعدة [[können]] و [[müssen]] و [[dürfen]]. والوحدة بتنتهي بـ Lesen Teil 2 (إعلانات ومواقع: تختار المناسب) و Lesen Teil 3 (يافطات: صح ولا غلط).`,
      goal: [R`توصف شقتك وأوضها ([[Meine Wohnung hat drei Zimmer]]، [[Die Küche ist klein, aber hell]])`, R`تقول فين كل حاجة بـ Dativ ([[Das Sofa steht im Wohnzimmer]]، [[Der Schlüssel liegt auf dem Tisch]])`, R`تقرا إعلان شقة باختصاراته، وتتصل تسأل عن الإيجار والمعاينة بـ [[können]] ([[Kann ich die Wohnung sehen?]])`, R`تتعرّف على جيرانك وتطلب مساعدة وتشكر ([[Können Sie mir helfen?]]، [[Danke, das ist nett von Ihnen!]])`, R`تفهم قواعد العمارة واليافطات بـ [[müssen]] و [[dürfen]] و [[man]] ([[Hier darf man nicht rauchen]])`, R`تحل Lesen Teil 2 و Teil 3 بطريقة الامتحان`],
      time: "حوالي ١٠ ساعات",
      projects: [
        { lvl: 'صغير', t: R`ارسم شقتك ووصفها`, what: R`ارسم رسمة بسيطة لشقتك (أو شقة أحلامك) من فوق، واكتب اسم كل أوضة بالألماني بأداتها. وبعدين اكتب ٦ جمل: الشقة فيها كام أوضة، وفي أنهي دور، وكل أوضة شكلها إيه (كبيرة؟ منوّرة؟ هادية؟).`,
          done: R`الرسمة فيها ٥ أماكن على الأقل بأداتها، و ٦ جمل فيهم [[hat]] و [[ist]] + صفة، وجملة فيها الدور ([[im … Stock]] أو [[im Erdgeschoss]])`,
          sol: R`**نسخة نموذجية:**

~~~text Grundriss
+-----------+----------+---------+
| Wohnzimmer| Küche    | Balkon  |
+-----------+----+-----+---------+
| Schlafzimmer   | Bad | Flur    |
+----------------+-----+---------+
~~~

~~~de
Meine Wohnung ist im dritten Stock.
Sie hat zwei Zimmer, eine Küche und ein Bad.
Das Wohnzimmer ist groß und hell.
Das Schlafzimmer ist klein, aber sehr ruhig.
Die Küche ist neu.
Wir haben auch einen Balkon.
~~~

**ليه كده:** [[im dritten Stock]] = في الدور التالت ([[im]] = [[in dem]]، والرقم ترتيبي زي التاريخ). و [[zwei Zimmer]] هنا الأوض اللي بتقعد فيها وتنام فيها، **من غير** المطبخ والحمّام، وده الحساب الألماني. و [[Sie hat]] لأن [[die Wohnung]] مؤنث. و [[einen Balkon]] بعد [[haben]] لأن [[der Balkon]] مذكر.` },
        { lvl: 'صغير', t: R`أوضتك: كل حاجة فين؟`, what: R`بص حواليك في أوضتك واكتب ٨ جمل: كل قطعة أثاث أو حاجة فين بالظبط، بـ [[steht]] أو [[liegt]] و [[in]]/[[auf]]/[[an]] + Dativ.`,
          done: R`٨ جمل، و [[dem]] مع المذكر والمحايد و [[der]] مع المؤنث، و [[steht]] للحاجات الواقفة و [[liegt]] للحاجات النايمة، و [[im]]/[[am]] في مكانهم`,
          sol: R`**نسخة نموذجية:**

~~~de
Das Bett steht links an der Wand.
Der Schrank steht rechts in der Ecke.
Der Tisch steht am Fenster.
Mein Handy liegt auf dem Tisch.
Das Buch liegt auf dem Bett.
Der Schlüssel liegt im Schrank.
Das Bild hängt an der Wand.
Meine Tasche liegt unter dem Tisch.
~~~

**ليه كده:** [[die Wand]] و [[die Ecke]] مؤنث ← [[an der Wand]]، [[in der Ecke]]. و [[der Tisch]] و [[das Bett]] ← [[auf dem]]. و [[am Fenster]] = [[an dem Fenster]]، و [[im Schrank]] = [[in dem Schrank]]. و [[steht]] للحاجات الواقفة (سرير، دولاب، ترابيزة)، و [[liegt]] للنايمة (موبايل، كتاب، مفتاح)، و [[hängt]] للمتعلّقة (صورة). [[das Fenster]] و [[die Wand]] و [[die Tasche]] مش في قايمة A1 بس هتحتاجهم.` },
        { lvl: 'متوسط', t: R`اتصل عشان شقة`, what: R`اختار الإعلان ده واكتب مكالمة تليفون (١٠–١٢ سطر) مع صاحب الشقة: تسأل لسه فاضية؟ والإيجار شامل المصاريف ولا لأ؟ وفيه بلكونة؟ وتقدر تشوفها إمتى؟ وسجّل الدورين. الإعلان: [[2-Zi.-Whg., 55 m², 2. OG, Blk., KM 620 €, NK 150 €, Kaution 3 KM, ab 1.3. frei]].`,
          done: R`المكالمة فيها تحية وتعريف بالاسم، و [[Ist die Wohnung noch frei?]]، وسؤال عن [[Nebenkosten]]، وسؤالين بـ [[können]] (الفعل في التاني والمصدر في الآخر)، وميعاد معاينة بيوم وساعة`,
          sol: R`**نسخة نموذجية:**

~~~de Vermieter=m Sara=f
Vermieter: Wagner, guten Tag! || واجنر، أهلًا!
Sara: Guten Tag, hier ist Sara Ali. Ich rufe wegen der Wohnung an. Ist sie noch frei? || أهلًا، أنا سارة علي. بكلّم حضرتك بخصوص الشقة. لسه فاضية؟
Vermieter: Ja, sie ist noch frei. || آه، لسه فاضية.
Sara: Wie hoch sind die Nebenkosten? || المصاريف قد إيه؟
Vermieter: Hundertfünfzig Euro im Monat. Die Warmmiete ist also siebenhundertsiebzig Euro. || ١٥٠ يورو في الشهر. يعني الإيجار شامل ٧٧٠.
Sara: Hat die Wohnung einen Balkon? || الشقة فيها بلكونة؟
Vermieter: Ja, einen kleinen Balkon. || آه، بلكونة صغيرة.
Sara: Kann ich die Wohnung sehen? || ممكن أشوف الشقة؟
Vermieter: Ja, gern. Können Sie am Samstag um elf Uhr kommen? || آه طبعًا. تقدري تيجي يوم السبت الساعة ١١؟
Sara: Ja, das passt. Vielen Dank! Auf Wiederhören! || آه، مناسب. شكرًا جدًا! مع السلامة!
~~~

**ليه كده:** في التليفون الألمان بيرّدوا باسم العيلة ([[Wagner]])، وإنت بتقول [[hier ist …]]. و [[Ich rufe wegen der Wohnung an]] = بتصل بخصوص الشقة (خدها كده). والحساب: [[KM]] ٦٢٠ + [[NK]] ١٥٠ = [[Warmmiete]] ٧٧٠. و [[Kann ich … sehen?]]: [[kann]] في المكان التاني (أو الأول في السؤال) و [[sehen]] في الآخر. و [[Auf Wiederhören!]] = مع السلامة في التليفون بس (مش [[Auf Wiedersehen]] لأنكم مش بتشوفوا بعض).` },
        { lvl: 'متوسط', t: R`ورقة للجيران وردّ`, what: R`إنت لسه ساكن جديد. اكتب ورقة تعلّقها على لوحة العمارة (٥–٦ جمل): تعرّف نفسك وشقتك فين، وتقول إنك هتعزّل (تنقل العفش) يوم السبت وممكن يبقى فيه دوشة، وتعتذر، وتطلب مساعدة صغيرة. وبعدين اكتب ردّ جار بيرحّب بيك وبيعرض المساعدة.`,
          done: R`الورقة فيها اسمك و [[im … Stock]]، و [[umziehen]] مقسوم صح، و [[Entschuldigung]] أو [[Tut mir leid]]، وطلب بـ [[Können Sie …?]]، والرد فيه ترحيب و [[helfen]] + Dativ`,
          sol: R`**نسخة نموذجية:**

~~~de
Liebe Nachbarn,
ich heiße Karim Hassan und wohne jetzt im zweiten Stock links.
Am Samstag ziehe ich ein. Es ist vielleicht ein bisschen laut. Das tut mir leid!
Mein Auto steht von neun bis zwölf Uhr vor dem Haus.
Können Sie bitte die Haustür offen lassen?
Vielen Dank und viele Grüße
Karim Hassan
~~~

~~~de
Lieber Herr Hassan, herzlich willkommen im Haus!
Das ist kein Problem.
Ich wohne im Erdgeschoss. Ich kann Ihnen gern helfen.
Viele Grüße
Petra Lang
~~~

**ليه كده:** [[einziehen]] = يسكن في مكان جديد (ينقل العفش جوه)، وهو فعل بيتقسم زي [[umziehen]] (ينقل من مكان لمكان): [[Am Samstag ziehe ich ein]]. و [[vor dem Haus]] = قدام البيت (Dativ). و [[Können Sie bitte …?]] طلب مؤدّب. و [[Ihnen]] = لحضرتك (Dativ من [[Sie]]) لأن [[helfen]] دايمًا بياخد Dativ. والورقة دي بالظبط هدف في منهج الاندماج: يعرّف نفسه لجيرانه كساكن جديد.` },
        { lvl: 'كبير', t: R`اكتب Hausordnung وحوّلها لامتحان`, what: R`اكتب قواعد لعمارة متخيّلة: ٨ قواعد بـ [[Man muss …]] و [[Man darf … nicht …]] (الدوشة، الزبالة، العجل، التدخين، السلم، الضيوف…)، وبعدين ٥ يافطات قصيرة زي اللي على الأبواب. وأخيرًا اعمل منهم امتحان Lesen Teil 3: لكل يافطة جملة صح ولا غلط، و ٣ منهم غلط.`,
          done: R`٨ قواعد الفعل المساعد فيهم في المكان التاني والمصدر في الآخر، و ٥ يافطات بشكل اليافطات (من غير فاعل: [[Bitte … schließen]]، [[… verboten]])، و ٥ جمل امتحان بإجاباتها`,
          sol: R`**القواعد:**

~~~de
Von zweiundzwanzig bis sechs Uhr muss man leise sein.
Man darf im Haus nicht rauchen.
Man muss den Müll trennen.
Man darf die Fahrräder nicht in den Flur stellen.
Jede Woche muss eine Familie die Treppe putzen.
Am Sonntag darf man keine Wäsche waschen.
Kinder dürfen im Hof spielen.
Man muss die Haustür um zweiundzwanzig Uhr abschließen.
~~~

**اليافطات وأسئلة الامتحان:**

~~~read Lesen Teil 3 من عندك
Bitte Haustür immer schließen!
? Die Haustür muss zu sein.
- Richtig *
- Falsch
Rauchen im Treppenhaus verboten
? Im Treppenhaus darf man rauchen.
- Richtig
- Falsch *
Fahrräder bitte in den Keller!
? Die Fahrräder sollen im Flur stehen.
- Richtig
- Falsch *
Ruhezeit: 13 bis 15 Uhr und 22 bis 6 Uhr
? Um vierzehn Uhr muss man leise sein.
- Richtig *
- Falsch
Spielplatz nur für Kinder bis 12 Jahre
? Ein Kind mit vierzehn Jahren darf hier spielen.
- Richtig
- Falsch *
~~~

**ليه كده:** في القواعد [[muss]] و [[darf]] في المكان التاني و [[sein]] و [[rauchen]] و [[trennen]]… في الآخر (Satzklammer). و [[Kinder dürfen]] من غير [[man]] لأن الفاعل جمع. واليافطات بالمصدر من غير فاعل ([[Bitte … schließen]]) أو [[… verboten]]، وده شكل اليافطات الحقيقي. وفي أسئلة الامتحان كل غلط مبني على حاجة **موجودة** في اليافطة واتعكست: [[verboten]] ← [[darf]]، و [[Keller]] ← [[Flur]]، و [[bis 12]] ← ١٤ سنة.` },
        { lvl: 'فكرة', t: R`فك إعلان شقة حقيقي`, what: R`ادخل على موقع إعلانات شقق ألماني (ImmobilienScout24 أو WG-Gesucht) واختار إعلانين. اكتب لكل واحد بالعربي: كام أوضة، وكام متر، والإيجار من غير مصاريف وبيها، والتأمين، ومتاحة من إمتى. وبعدين اكتب ٣ أسئلة بالألماني هتسألهم لصاحب الشقة.`,
          done: R`الإعلانين متفكّكين صح (خصوصًا [[Kaltmiete]] و [[Warmmiete]] و [[Kaution]])، و ٣ أسئلة بالفعل في المكان الصح`,
          sol: R`**كلمات واختصارات هتلاقيها في أي إعلان:**

| مكتوب | معناه |
|---|---|
| [[2-Zi.-Whg.]] / [[2 Zimmer]] | شقة أوضتين (من غير مطبخ وحمّام) |
| [[m²]] / [[qm]] | متر مربع |
| [[KM]] / [[Kaltmiete]] | الإيجار من غير مصاريف |
| [[NK]] / [[Nebenkosten]] | المصاريف (مية، تدفئة، زبالة…) |
| [[WM]] / [[Warmmiete]] | الإيجار بالمصاريف |
| [[Kaution]] | تأمين، غالبًا ٢ أو ٣ شهور [[KM]] |
| [[EG]]، [[1. OG]] | الدور الأرضي، الدور الأول |
| [[EBK]] | مطبخ مركّب جاهز |
| [[ab sofort]] | فاضية من دلوقتي |
| [[WG]] | شقة مشتركة، كل واحد ليه أوضة |

**أسئلة جاهزة:**

~~~de
Ist die Wohnung noch frei?
Sind die Nebenkosten in der Miete?
Wann kann ich die Wohnung sehen?
~~~

**ليه كده:** الأرقام اللي في الإعلان أول رقم فيها غالبًا [[Kaltmiete]]، والمبلغ اللي هتدفعه فعلًا [[Warmmiete]]، فاسأل دايمًا عليه. و [[Kaution]] بتدفعها مرة واحدة وبترجعلك لما تسيب الشقة سليمة. والكلمات دي أغلبها مش في قايمة A1، بس هتقابلها أول ما تدوّر على سكن، وفي امتحان ÖSD فيه إعلان شقة في القراية.` },
      ],
      items: [
        {
          cmd: "Meine Wohnung hat drei Zimmer",
          title: "شقتي فيها ٣ أوض: الأوض والأدوار، وتوصف السكن",
          pre: ["dea1/Hast du Geschwister?"],
          desc: R`[[Wie ist deine Wohnung?]] (شقتك عاملة إزاي؟). [[Sie hat drei Zimmer. Sie ist groß und hell, aber ein bisschen teuer.]]

وهنا هتعرف إن الألمان بيعدّوا الأوض غير ما إحنا بنعدّها، وإزاي الكلمات المركّبة بتتعمل ([[Wohn]] + [[Zimmer]] = [[Wohnzimmer]])، وإزاي تقول الدور ([[im zweiten Stock]]).`,
          teach: R`## الموقف

زميلك في الكورس لسه عزّل، وبتسأله عن الشقة الجديدة. (Goethe: «Wohnung» و «Räume»، و Rahmencurriculum: يتكلم عن سكنه.)

~~~de Nora=f Omar=m
Nora: Du hast eine neue Wohnung, oder? Wie ist sie? || إنت عندك شقة جديدة، صح؟ عاملة إزاي؟
Omar: Sie ist super! Sie hat drei Zimmer, eine Küche und ein Bad. || حلوة جدًا! فيها ٣ أوض ومطبخ وحمّام.
Nora: Ist sie groß? || كبيرة؟
Omar: Ja, sie hat achtzig Quadratmeter. Und sie ist sehr hell. || آه، ٨٠ متر. ومنوّرة جدًا.
Nora: In welchem Stock wohnst du? || ساكن في أنهي دور؟
Omar: Im vierten Stock. Leider gibt es keinen Aufzug. || في الدور الرابع. وللأسف مفيش أسانسير.
Nora: Und ist die Miete teuer? || والإيجار غالي؟
Omar: Nicht so teuer. Aber die Straße ist ein bisschen laut. || مش أوي. بس الشارع دوشة شوية.
~~~

## الأوض: Zimmer + حاجة

كلمة [[das Zimmer]] (أوضة) بتتركّب مع كلمة قبلها تقول الأوضة لإيه:

| الكلمة | من | المعنى |
|---|---|---|
| [[das Wohnzimmer]] | [[wohnen]] + [[Zimmer]] | الصالة / أوضة القعدة |
| [[das Schlafzimmer]] | [[schlafen]] + [[Zimmer]] | أوضة النوم |
| [[das Kinderzimmer]] | [[Kinder]] + [[Zimmer]] | أوضة العيال |
| [[das Arbeitszimmer]] | [[Arbeit]] + [[Zimmer]] | أوضة المكتب |
| [[das Badezimmer]] / [[das Bad]] | [[baden]] + [[Zimmer]] | الحمّام |

- **الأداة من الكلمة الأخيرة:** [[das Zimmer]] ← كل دول [[das]]. (Goethe: Wortbildung، Komposita.)
- ونفس الفكرة في كلمات كتير: [[der Kühlschrank]] = [[kühl]] (بارد) + [[der Schrank]] (دولاب)، فـ [[der]].

## الحساب الألماني للأوض ⚠

| في مصر | في ألمانيا |
|---|---|
| «شقة ٣ أوض وصالة» | [[eine 4-Zimmer-Wohnung]] |
| الصالة مش أوضة | [[das Wohnzimmer]] **أوضة** وبتتعد |
| المطبخ والحمّام مش بيتعدّوا | المطبخ والحمّام مش بيتعدّوا برده |

يعني لو إعلان قال [[2-Zimmer-Wohnung]]، دي أوضة نوم وصالة، ومعاهم مطبخ وحمّام. ودي حاجة بتلخبط ناس كتير أول ما يدوّروا على شقة.

## الأدوار: im Erdgeschoss, im ersten Stock

~~~de
Ich wohne im Erdgeschoss. || أنا ساكن في الدور الأرضي.
Wir wohnen im ersten Stock. || إحنا ساكنين في الدور الأول.
Meine Wohnung ist im dritten Stock. || شقتي في الدور التالت.
~~~

- [[im]] + الدور، والرقم ترتيبي ([[ersten]]، [[zweiten]]، [[dritten]]، [[vierten]]) زي التاريخ [[am dritten Mai]].
- [[im]] = [[in dem]]، ودي Dativ، وهتتشرح كويس في الدرس الجاي. خدها دلوقتي كده.
- [[der Aufzug]] = الأسانسير، و [[die Treppe]] = السلم. وفي البيوت القديمة في ألمانيا كتير مفيش أسانسير.

## توصف الشقة: الصفة بعد sein

زي ما اتعلمت في وصف الناس: بعد [[sein]] الصفة من غير نهاية.

| | | |
|---|---|---|
| [[groß]] كبير | ↔ | [[klein]] صغير |
| [[hell]] منوّر | ↔ | [[dunkel]] ضلمة |
| [[ruhig]] هادي | ↔ | [[laut]] دوشة |
| [[teuer]] غالي | ↔ | [[billig]] / [[günstig]] رخيص |
| [[neu]] جديد | ↔ | [[alt]] قديم |

~~~de
Die Küche ist klein, aber hell. || المطبخ صغير بس منوّر.
Das Schlafzimmer ist sehr ruhig. || أوضة النوم هادية جدًا.
Die Wohnung ist günstig. || الشقة رخيصة.
Das Haus ist alt, aber schön. || البيت قديم بس حلو.
~~~

- [[günstig]] أحسن من [[billig]] لما بتتكلم عن سعر: [[billig]] ممكن تتفهم «رخيصة ومش كويسة».
- [[aber]] بيربط حاجتين عكس بعض، والفعل بعده في مكانه العادي: [[…, aber die Straße ist laut]].

## Wie viele …? و es gibt

~~~de
Wie viele Zimmer hat die Wohnung? || الشقة فيها كام أوضة؟
Die Wohnung hat zwei Zimmer und einen Balkon. || الشقة فيها أوضتين وبلكونة.
Gibt es einen Garten? || فيه جنينة؟
Nein, es gibt keinen Garten. || لأ، مفيش جنينة.
~~~

[[Die Wohnung hat …]] (الشقة عندها) أو [[Es gibt …]] (فيه): الاتنين بعدهم Akkusativ، فالمذكر [[einen]]/[[keinen]]: [[einen Balkon]]، [[keinen Aufzug]].

## الكلمات: البيت والأوض

~~~words البيت والأوض
die Wohnung, die Wohnungen | الشقة | Meine Wohnung ist klein.
das Haus, die Häuser | البيت | Das Haus hat vier Stockwerke.
das Zimmer, die Zimmer | الأوضة | Die Wohnung hat drei Zimmer.
das Wohnzimmer, die Wohnzimmer | الصالة، أوضة القعدة | Das Wohnzimmer ist groß.
das Schlafzimmer, die Schlafzimmer | أوضة النوم | Das Schlafzimmer ist ruhig.
die Küche, die Küchen | المطبخ | Die Küche ist neu.
das Bad, die Bäder | الحمّام | Das Bad ist klein.
die Toilette, die Toiletten | التواليت | Wo ist die Toilette?
die Dusche, die Duschen | الدُش | Das Bad hat eine Dusche.
der Balkon, die Balkone | البلكونة | Wir haben einen Balkon.
der Garten, die Gärten | الجنينة | Der Garten ist schön.
der Stock, die Stockwerke | الدور | Ich wohne im zweiten Stock.
das Erdgeschoss, die Erdgeschosse | الدور الأرضي | Die Wohnung ist im Erdgeschoss.
der Aufzug, die Aufzüge | الأسانسير | Es gibt keinen Aufzug.
die Treppe, die Treppen | السلم | Die Treppe ist rechts.
~~~

**[[der Stock]] في الجمع [[die Stockwerke]]** (من [[das Stockwerk]]). وفي الكلام بنقول عدد الأدوار كده: [[Das Haus hat vier Stockwerke]].

## الكلمات: الوصف

~~~words وصف السكن
hell | منوّر | Die Küche ist sehr hell.
dunkel | ضلمة | Der Flur ist dunkel.
ruhig | هادي | Die Straße ist ruhig.
laut | دوشة، صوته عالي | Die Wohnung ist leider laut.
teuer | غالي | Die Miete ist zu teuer.
billig | رخيص | Das Zimmer ist billig.
günstig | رخيص (سعر كويس) | Die Wohnung ist günstig.
neu | جديد | Das Bad ist neu.
~~~

[[zu teuer]] = غالي **زيادة** (مش مناسب)، و [[sehr teuer]] = غالي جدًا بس. فـ [[Die Miete ist zu teuer]] معناها مش هاخدها.

## قول بصوتك

~~~speak
Meine Wohnung hat drei Zimmer. || شقتي فيها ٣ أوض.
Ich wohne im zweiten Stock. || أنا ساكن في الدور التاني.
Die Küche ist klein, aber hell. || المطبخ صغير بس منوّر.
Es gibt leider keinen Aufzug. || للأسف مفيش أسانسير.
Wie viele Zimmer hat die Wohnung? || الشقة فيها كام أوضة؟
~~~

## سمع: الشقة عاملة إزاي؟

~~~hear
f: Meine Wohnung hat zwei Zimmer, eine Küche und ein Bad. Sie ist im dritten Stock.
? In welchem Stock ist die Wohnung? || الشقة في أنهي دور؟
- im zweiten Stock
- im dritten Stock *
- im Erdgeschoss

m: Die Wohnung ist schön und groß, aber leider ist sie sehr laut.
? Was ist nicht gut? || إيه اللي مش كويس؟
- Die Wohnung ist klein.
- Die Wohnung ist laut. *
- Die Wohnung ist dunkel.

f: Wir haben keinen Garten, aber wir haben einen großen Balkon.
? Was hat die Wohnung? || الشقة فيها إيه؟
- einen Garten
- einen Balkon *
- einen Aufzug
~~~

## إملا

~~~dictate
Die Wohnung hat drei Zimmer.
f: Die Küche ist sehr hell.
Ich wohne im ersten Stock.
f: Es gibt keinen Aufzug.
~~~

## فيديو: الحي

~~~yt qSGUD9WYRwE Walk Through Our Neighborhood in Slow German
- **قبل ما تشغّله:** اكتب ٣ جمل عن الشارع أو الحي اللي ساكن فيه ([[ruhig]]؟ [[laut]]؟ فيه سوبرماركت؟).
- **وإنت بتتفرج:** اكتب كل مكان بيعدّوا عليه (محل، بيت، جنينة…) بأداته.
- **بعده:** اختار ٣ أماكن منهم وقول جملة عن كل واحد بـ [[Es gibt …]].
~~~`,
          deep: {
            why: R`السكن من أول المواضيع في أي امتحان A1: في Goethe Sprechen Teil 2 «Wohnen» من الموضوعات، وفي ÖSD القراية فيها إعلان شقة، وفي منهج الاندماج «Wohnen» مجال كامل (التدوير على شقة، والجيران، وقواعد العمارة). وفي الحياة: أول حاجة هتعملها لما توصل ألمانيا إنك تدوّر على سكن.`,
            how: R`[[Die Wohnung hat …]] + عدد الأوض والحاجات (Akkusativ: [[einen Balkon]]). [[Die Wohnung ist …]] + صفة من غير نهاية. والدور: [[im]] + رقم ترتيبي + [[Stock]]، أو [[im Erdgeschoss]]. والأوض كلمات مركّبة أداتها من [[das Zimmer]].`,
            when: R`[[Wie ist deine Wohnung?]] لما حد عزّل. [[Wie viele Zimmer …?]] وإنت بتدوّر على شقة. [[zu teuer]] لما ترفض. و [[günstig]] لما تمدح سعر.`,
            mistakes: R`- [[Die Wohnung hat ein Balkon]]: [[der Balkon]] مذكر مفعول ← [[einen Balkon]].
- [[im zwei Stock]]: الرقم ترتيبي ← [[im zweiten Stock]].
- [[der Wohnzimmer]]: الأداة من الكلمة الأخيرة ← [[das Wohnzimmer]].
- تفتكر [[3-Zimmer-Wohnung]] = ٣ أوض نوم: لأ، الصالة من التلاتة.
- [[Die Küche ist kleine]]: بعد [[sein]] من غير نهاية ← [[klein]].
- [[Es gibt nicht Aufzug]]: النفي هنا [[keinen Aufzug]].`
          },
          try: R`وصف شقتك بصوت عالي في ٦ جمل: فيها كام أوضة (بالحساب الألماني)، وفي أنهي دور، وكل أوضة عاملة إزاي، وفيه إيه ومفيش إيه. وحل السمع والإملا.`,
          practice: [
            { lvl: 'سريع', t: R`**الأداة والمعنى:** (١) ___ Schlafzimmer (٢) ___ Küche (٣) ___ Balkon (٤) ___ Kühlschrank (٥) ___ Kinderzimmer (٦) ___ Treppe. وقول معنى كل واحدة.`,
              done: R`الستة صح، والكلمات المركّبة أداتها من آخر كلمة`,
              sol: R`~~~de
das Schlafzimmer
die Küche
der Balkon
der Kühlschrank
das Kinderzimmer
die Treppe
~~~

**ليه:** [[Schlafzimmer]] و [[Kinderzimmer]] آخرهم [[das Zimmer]] ← [[das]]. و [[Kühlschrank]] آخره [[der Schrank]] ← [[der]]. والمعاني: أوضة نوم، مطبخ، بلكونة، تلاجة، أوضة عيال، سلم.` },
            { lvl: 'تطبيق', t: R`**احسبها بالألماني:** حوّل الإعلانات المصرية دي لكلام ألماني (عدد [[Zimmer]] صح): (١) شقة أوضتين نوم وصالة ومطبخ وحمّامين. (٢) ستوديو أوضة واحدة بمطبخ صغير. (٣) شقة ٣ أوض وصالة، في الدور الخامس، فيها أسانسير.`,
              done: R`الصالة اتعدّت أوضة، والمطبخ والحمّام لأ، والدور ترتيبي`,
              sol: R`~~~de
Das ist eine 3-Zimmer-Wohnung mit Küche und zwei Bädern.
Das ist eine 1-Zimmer-Wohnung mit einer kleinen Küche.
Das ist eine 4-Zimmer-Wohnung im fünften Stock. Es gibt einen Aufzug.
~~~

**ليه:** (١) أوضتين + صالة = ٣ [[Zimmer]]. (٢) أوضة واحدة = [[1-Zimmer-Wohnung]]. (٣) ٣ + صالة = ٤، و [[im fünften Stock]]. و [[mit]] بعده Dativ ([[mit einer kleinen Küche]]، [[mit zwei Bädern]]): خدها كده، و [[mit]] جاي في وحدة المواصلات.` },
            { lvl: 'تطبيق', t: R`**العكس:** اكتب العكس في جملة كاملة: (١) Die Wohnung ist hell. (٢) Die Straße ist laut. (٣) Das Haus ist neu. (٤) Die Miete ist teuer. (٥) Das Bad ist groß.`,
              done: R`الخمسة صح، والصفة من غير نهاية`,
              sol: R`~~~de
Die Wohnung ist dunkel.
Die Straße ist ruhig.
Das Haus ist alt.
Die Miete ist günstig.
Das Bad ist klein.
~~~

**ليه:** كل صفة ليها عكس في جدول الدرس. و [[günstig]] أحسن من [[billig]] للإيجار. والصفة بعد [[ist]] زي ما هي في المذكر والمؤنث والمحايد.` },
            { lvl: 'تحدي', t: R`**قارن شقتين:** اكتب ٦ جمل تقارن فيهم شقتك الحالية بشقة بتحلم بيها، بـ [[aber]] مرتين على الأقل، وجملة فيها [[zu]] + صفة.`,
              done: R`٦ جمل، و [[aber]] بيربط حاجتين عكس بعض، والفعل بعد [[aber]] في المكان التاني، وجملة بـ [[zu]]`,
              sol: R`**نسخة نموذجية:**

~~~de
Meine Wohnung hat zwei Zimmer, aber ich möchte drei Zimmer.
Meine Küche ist klein und dunkel.
Meine Traumwohnung hat eine große, helle Küche.
Ich wohne im fünften Stock, und es gibt keinen Aufzug.
Meine Traumwohnung hat einen Garten.
Meine Wohnung ist günstig, aber sie ist zu laut.
~~~

**ليه كده:** [[aber]] و [[und]] بيربطوا جملتين والفعل بعدهم في مكانه ([[aber ich möchte]]، [[und es gibt]]). و [[Traumwohnung]] = شقة الأحلام ([[Traum]] + [[Wohnung]] ← [[die]]). و [[eine große, helle Küche]] صفات قبل الاسم بنهاية، دي A2، فلو مش متأكد قول [[Die Küche ist groß und hell]]. و [[zu laut]] = دوشة زيادة عن اللزوم.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortliste، Wohnen (ص ٧٦) و Wortbildung (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Wohnen (ص ١٥٥–١٥٨)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: Wohnung", url: "https://www.dwds.de/wb/Wohnung" },
            { t: "DWDS: Zimmer", url: "https://www.dwds.de/wb/Zimmer" },
            { t: "DWDS: günstig", url: "https://www.dwds.de/wb/g%C3%BCnstig" },
          ],
        },
        {
          cmd: "Das Sofa steht im Wohnzimmer",
          title: "فين الحاجة؟ العفش، و in/auf/an + Dativ، و stehen/liegen",
          pre: ["dea1/Meine Wohnung hat drei Zimmer", "dea1/Wo finde ich Reis?"],
          desc: R`[[Wo ist mein Schlüssel?]] — [[Er liegt auf dem Tisch.]] و [[Das Sofa steht im Wohnzimmer.]]

بعد [[in]] و [[auf]] و [[an]] لما بتقول **فين** حاجة، الأداة بتتغيّر: [[der Tisch]] ← [[auf dem Tisch]]، و [[die Küche]] ← [[in der Küche]]. ده الـ **Dativ**، وكنت بتقوله من الأول من غير ما تعرف: [[im Kühlschrank]]، و [[am Bahnhof]]، و [[im zweiten Stock]]. والنهارده هتعرف القاعدة كلها.`,
          teach: R`## الموقف

عمر بيدوّر على مفتاحه، ونورا بتساعده. (Goethe: «Einrichtung/Möbel»، و in/auf/an + Dativ في قايمة القواعد.)

~~~de Omar=m Nora=f
Omar: Wo ist mein Schlüssel? || فين مفتاحي؟
Nora: Ist er auf dem Tisch? || على الترابيزة؟
Omar: Nein, auf dem Tisch liegt nur mein Handy. || لأ، على الترابيزة موبايلي بس.
Nora: Vielleicht in der Küche? || يمكن في المطبخ؟
Omar: Nein, da ist er auch nicht. || لأ، مش هناك برده.
Nora: Und im Schlafzimmer, neben dem Bett? || وفي أوضة النوم، جنب السرير؟
Omar: Ja, da ist er! Danke! || آه، أهو! شكرًا!
~~~

## Wo? + in, auf, an + Dativ

لما السؤال [[Wo?]] (فين؟)، الأداة بعد [[in]] و [[auf]] و [[an]] بتبقى Dativ:

| الكلمة | Nominativ | Dativ (بعد in/auf/an) |
|---|---|---|
| مذكر | [[der Tisch]] | [[auf dem Tisch]] |
| محايد | [[das Bett]] | [[auf dem Bett]] |
| مؤنث | [[die Küche]] | [[in der Küche]] |
| جمع | [[die Zimmer]] | [[in den Zimmern]] |

- **المذكر والمحايد:** [[dem]]. **المؤنث:** [[der]] (أيوه، زي أداة المذكر في الأصل، وده بيلخبط). **الجمع:** [[den]] والاسم بياخد [[-n]] لو مش آخره n أو s.
- ونفس الكلام مع [[ein]]: [[in einem Haus]]، و [[in einer Wohnung]]. ومع [[mein]]: [[in meinem Zimmer]]، و [[in meiner Küche]].

## im و am: اختصار

| | | |
|---|---|---|
| [[in dem]] | ← | [[im]]: [[im Wohnzimmer]]، [[im Schrank]] |
| [[an dem]] | ← | [[am]]: [[am Fenster]]، [[am Bahnhof]] |

ده نفس [[im]] بتاع [[im Januar]] و [[am]] بتاع [[am Montag]]: كانوا Dativ من الأول.

## in ولا auf ولا an؟

| | معناها | أمثلة |
|---|---|---|
| [[in]] | جوه | [[im Schrank]]، [[in der Küche]]، [[im Kühlschrank]] |
| [[auf]] | فوق (لازق في السطح) | [[auf dem Tisch]]، [[auf dem Sofa]]، [[auf dem Balkon]] |
| [[an]] | جنب (لازق في الجنب) | [[an der Wand]]، [[am Fenster]]، [[an der Tür]] |

~~~de
Die Milch ist im Kühlschrank. || اللبن في التلاجة.
Das Buch liegt auf dem Bett. || الكتاب على السرير.
Das Bild hängt an der Wand. || الصورة متعلّقة على الحيطة.
Der Tisch steht am Fenster. || الترابيزة جنب الشباك.
~~~

**مقارنة بالعربي:** «على» في العربي بتنفع لـ [[auf]] و [[an]]: «على الترابيزة» = [[auf dem Tisch]]، بس «على الحيطة» = [[an der Wand]] (الصورة مش فوق الحيطة، هي لازقة في جنبها). وكلمات مكان تانية هتسمعها كتير بنفس القاعدة: [[unter]] (تحت)، و [[über]] (فوق من غير ما تلمس)، و [[neben]] (جنب)، و [[vor]] (قدام)، و [[hinter]] (ورا): [[unter dem Bett]]، [[neben dem Sofa]].

## stehen ولا liegen ولا hängen؟

الألماني بيقول **الحاجة قاعدة إزاي**، مش بس «موجودة»:

| الفعل | للحاجة | أمثلة |
|---|---|---|
| [[stehen]] | الواقفة | [[Das Sofa steht im Wohnzimmer]]، [[Die Flasche steht auf dem Tisch]] |
| [[liegen]] | النايمة / المفروشة | [[Das Handy liegt auf dem Tisch]]، [[Der Teppich liegt im Flur]] |
| [[hängen]] | المتعلّقة | [[Das Bild hängt an der Wand]]، [[Die Lampe hängt über dem Tisch]] |

ولو مش متأكد، [[ist]] بتنفع دايمًا: [[Der Schlüssel ist im Schrank]]. والمكان (الشقة، المدينة) بيتقال بـ [[liegen]] كمان: [[Die Wohnung liegt im Zentrum]].

## Wo ist …? والضمير

~~~de
Wo ist der Schlüssel? Er liegt auf dem Tisch. || فين المفتاح؟ على الترابيزة.
Wo ist die Lampe? Sie steht neben dem Sofa. || فين اللمبة؟ جنب الكنبة.
Wo ist das Buch? Es liegt im Regal. || فين الكتاب؟ في الرف.
~~~

الضمير بيتبع أداة الحاجة، مش هي إيه: [[der Schlüssel]] ← [[er]]، و [[die Lampe]] ← [[sie]]، و [[das Buch]] ← [[es]]. ودي نفس قاعدة الوحدة اللي فاتت.

## الكلمات: العفش والحاجات

~~~words العفش
die Möbel (Plural) | العفش | Die Möbel sind neu.
der Tisch, die Tische | الترابيزة | Der Tisch steht in der Küche.
der Stuhl, die Stühle | الكرسي | Die Stühle stehen in der Küche.
das Bett, die Betten | السرير | Das Bett steht im Schlafzimmer.
der Schrank, die Schränke | الدولاب | Der Schrank ist sehr groß.
das Sofa, die Sofas | الكنبة | Das Sofa steht im Wohnzimmer.
der Kühlschrank, die Kühlschränke | التلاجة | Die Milch ist im Kühlschrank.
der Herd, die Herde | البوتاجاز | Der Herd ist in der Küche.
die Lampe, die Lampen | اللمبة، الأباجورة | Die Lampe steht neben dem Bett.
das Bild, die Bilder | الصورة، اللوحة | Das Bild hängt an der Wand.
das Fenster, die Fenster | الشباك | Der Tisch steht am Fenster.
die Tür, die Türen | الباب | Die Tür ist offen.
die Wand, die Wände | الحيطة | Das Bild hängt an der Wand.
die Ecke, die Ecken | الركن | Der Schrank steht in der Ecke.
~~~

[[die Möbel]] جمع بس (زي [[die Eltern]]): [[Die Möbel sind neu]]. ولقطعة واحدة: [[das Möbelstück]]. و [[der Stuhl]] و [[die Lampe]] و [[das Fenster]] و [[die Tür]] و [[die Wand]] مش في قايمة Goethe، بس مستحيل توصف أوضة من غيرهم.

## الكلمات: المكان

~~~words فين؟
stehen | واقف (حاجة واقفة) | Das Sofa steht im Wohnzimmer.
liegen | نايم (حاجة نايمة) | Das Handy liegt auf dem Tisch.
oben | فوق | Das Bad ist oben.
unten | تحت | Die Küche ist unten.
links | على الشمال | Das Bett steht links.
rechts | على اليمين | Der Schrank steht rechts.
die Mitte | النص | Der Tisch steht in der Mitte.
unter | تحت (حاجة) | Die Tasche liegt unter dem Tisch.
~~~

## قول بصوتك

~~~speak
Wo ist mein Schlüssel? || فين مفتاحي؟
Er liegt auf dem Tisch. || على الترابيزة.
Das Sofa steht im Wohnzimmer. || الكنبة في الصالة.
Das Bild hängt an der Wand. || الصورة متعلّقة على الحيطة.
Die Milch ist im Kühlschrank. || اللبن في التلاجة.
~~~

## سمع: فين؟

~~~hear
f: Das Handy liegt nicht auf dem Tisch. Es liegt auf dem Sofa.
? Wo ist das Handy? || الموبايل فين؟
- auf dem Tisch
- auf dem Sofa *
- im Schrank

m: Die Küche ist unten, und das Bad ist oben neben dem Schlafzimmer.
? Wo ist das Bad? || الحمّام فين؟
- unten
- oben *
- in der Küche

f: Die Schlüssel sind nicht in meiner Tasche. Sind sie vielleicht in der Küche?
? Wo sucht die Frau jetzt? || الست هتدوّر فين دلوقتي؟
- in der Tasche
- im Auto
- in der Küche *
~~~

## إملا

~~~dictate
Das Sofa steht im Wohnzimmer.
f: Der Schlüssel liegt auf dem Tisch.
Das Bild hängt an der Wand.
f: Die Milch ist im Kühlschrank.
~~~

## فيديو: حاجات البيت

~~~yt eKLtI48rvtw Top 50 Everyday Objects in Slow German
- **قبل ما تشغّله:** اكتب ١٠ حاجات في بيتك بأداتها من غير ما تبص.
- **وإنت بتتفرج:** علّم على حاجاتك لما تسمعها، وصحّح الأداة لو غلطت.
- **بعده:** اختار ٥ حاجات منهم وقول فين هي في بيتك ([[Der Fernseher steht im Wohnzimmer]]).
~~~`,
          deep: {
            why: R`الـ Dativ بعد [[in]] و [[auf]] و [[an]] من أهم قواعد A1: Goethe حاطه بالاسم في قايمة القواعد، و telc بيسأل عليه في Sprachbausteine، و ÖSD Sprechen Aufgabe 2 بتوصف فيها صورة («فين الناس؟»). وكل كلامك عن مكان أي حاجة محتاجه.`,
            how: R`[[Wo?]] ← [[in]]/[[auf]]/[[an]] + Dativ: [[dem]] (مذكر ومحايد)، [[der]] (مؤنث)، [[den]] + [[-n]] (جمع). و [[in dem]] = [[im]]، و [[an dem]] = [[am]]. والفعل حسب الحاجة: [[stehen]] و [[liegen]] و [[hängen]]، أو [[ist]] لو مش متأكد.`,
            when: R`[[in]] لما الحاجة جوه، و [[auf]] فوق سطح، و [[an]] لازقة في جنب (حيطة، شباك، باب، محطة). و [[liegen]] كمان للأماكن على الخريطة ([[Die Wohnung liegt im Zentrum]]).`,
            mistakes: R`- [[auf der Tisch]]: [[der Tisch]] مذكر ← [[auf dem Tisch]].
- [[in die Küche]] لما تقول فين: ده لما تقول **رايح** فين. لـ «فين» ← [[in der Küche]].
- [[in dem Schrank]] في الكلام: صح بس الطبيعي [[im Schrank]].
- [[auf der Wand]]: الصورة على جنب الحيطة ← [[an der Wand]].
- [[Das Handy steht auf dem Tisch]]: الموبايل نايم ← [[liegt]].
- [[in den Zimmer]]: جمع Dativ ← [[in den Zimmern]].`
          },
          try: R`لف في شقتك وقول بصوت عالي فين ١٠ حاجات بـ [[steht]] و [[liegt]] و [[hängt]]. وبعدين خلّي حد يخبّي حاجة وانت تسأله [[Ist sie auf dem …? In der …?]] لحد ما تلاقيها.`,
          practice: [
            { lvl: 'سريع', t: R`**dem ولا der ولا den؟** (١) auf ___ Tisch (٢) in ___ Küche (٣) an ___ Wand (٤) auf ___ Bett (٥) in ___ Zimmern (٦) unter ___ Sofa`,
              done: R`الستة صح، و [[der]] مع المؤنث بس، و [[den]] + [[-n]] مع الجمع`,
              sol: R`~~~de
auf dem Tisch
in der Küche
an der Wand
auf dem Bett
in den Zimmern
unter dem Sofa
~~~

**ليه:** [[der Tisch]] و [[das Bett]] و [[das Sofa]] ← [[dem]]. و [[die Küche]] و [[die Wand]] ← [[der]]. و [[die Zimmer]] جمع ← [[den Zimmern]].` },
            { lvl: 'تطبيق', t: R`**in ولا auf ولا an؟** (١) Die Butter ist ___ Kühlschrank. (٢) Die Katze schläft ___ Sofa. (٣) Der Kalender hängt ___ Wand. (٤) Die Kleider sind ___ Schrank. (٥) Wir sitzen ___ Balkon. (٦) Der Tisch steht ___ Fenster.`,
              done: R`الستة صح بالأداة كمان، و [[im]]/[[am]] في مكانهم`,
              sol: R`~~~de
Die Butter ist im Kühlschrank.
Die Katze schläft auf dem Sofa.
Der Kalender hängt an der Wand.
Die Kleider sind im Schrank.
Wir sitzen auf dem Balkon.
Der Tisch steht am Fenster.
~~~

**ليه:** التلاجة والدولاب جوه ← [[im]]. الكنبة والبلكونة سطح بتقعد عليه ← [[auf dem]]. الحيطة والشباك جنب ← [[an der]] و [[am]]. وخلي بالك: [[auf dem Balkon]] مش «in».` },
            { lvl: 'تطبيق', t: R`**stehen ولا liegen ولا hängen؟** (١) Das Buch ___ auf dem Bett. (٢) Der Schrank ___ in der Ecke. (٣) Die Lampe ___ über dem Tisch. (٤) Der Teppich ___ im Wohnzimmer. (٥) Die Flasche ___ im Kühlschrank. (٦) Die Bilder ___ an der Wand.`,
              done: R`الستة صح، و [[hängen]] في الجمع مع [[Bilder]]`,
              sol: R`~~~de
Das Buch liegt auf dem Bett.
Der Schrank steht in der Ecke.
Die Lampe hängt über dem Tisch.
Der Teppich liegt im Wohnzimmer.
Die Flasche steht im Kühlschrank.
Die Bilder hängen an der Wand.
~~~

**ليه:** الكتاب والسجادة نايمين ← [[liegt]]. الدولاب والإزازة واقفين ← [[steht]]. اللمبة والصور متعلّقين ← [[hängt]]/[[hängen]]. و [[über dem Tisch]] = فوق الترابيزة من غير ما تلمسها.` },
            { lvl: 'تحدي', t: R`**صلّح واشرح:** (١) [[Das Handy steht auf der Tisch.]] (٢) [[Die Milch ist in die Kühlschrank.]] (٣) [[Das Bild hängt auf der Wand.]] (٤) [[Die Schuhe sind unter dem Betten.]] (٥) [[Wo ist die Lampe? Er steht im Ecke.]]`,
              done: R`الخمسة صح، وكل واحدة فيها كام غلط اتصلح`,
              sol: R`~~~de
Das Handy liegt auf dem Tisch.
Die Milch ist im Kühlschrank.
Das Bild hängt an der Wand.
Die Schuhe sind unter dem Bett.
Wo ist die Lampe? Sie steht in der Ecke.
~~~

**ليه:** (١) غلطتين: الموبايل نايم ([[liegt]])، و [[der Tisch]] مذكر ([[dem]]). (٢) «فين» مش «رايح فين» ← Dativ: [[im]]. (٣) الحيطة جنب ← [[an]]. (٤) سرير واحد ← [[dem Bett]]، ولو جمع يبقى [[den Betten]]. (٥) غلطتين: [[die Lampe]] ← [[sie]]، و [[die Ecke]] مؤنث ← [[in der Ecke]].` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Präposition lokal (an، auf، in + Dativ، و unter + Dativ) (ص ١٠٠)، و Einrichtung/Möbel (ص ٧٦)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "ÖSD Zertifikat A1: Modellsatz (Sprechen Aufgabe 2: وصف صورة)", url: "https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf" },
            { t: "DWDS: liegen", url: "https://www.dwds.de/wb/liegen" },
            { t: "DWDS: stehen", url: "https://www.dwds.de/wb/stehen" },
            { t: "DWDS: Möbel", url: "https://www.dwds.de/wb/M%C3%B6bel" },
          ],
        },
        {
          cmd: "Ist die Wohnung noch frei?",
          title: "تدوّر على شقة: الإعلان، والإيجار، والمكالمة، و können",
          pre: ["dea1/Meine Wohnung hat drei Zimmer", "dea1/Die Zahlen 0–100", "dea1/Hast du am Samstag Zeit?"],
          desc: R`إعلان فيه [[2-Zi.-Whg., KM 620 €, NK 150 €]]: يعني إيه؟ وإزاي تتصل وتسأل: [[Ist die Wohnung noch frei?]] و [[Kann ich die Wohnung sehen?]]

وهنا أول فعل مساعد: [[können]] (يقدر). وليه قاعدة مهمة: [[kann]] في المكان التاني، والفعل التاني **في آخر الجملة** بالمصدر: [[Ich kann am Samstag kommen.]]`,
          teach: R`## الموقف

سارة شافت إعلان على النت وبتتصل بصاحب الشقة. (Rahmencurriculum: يدوّر على شقة ويسأل عنها، و Goethe: «Miete/Mietverhältnis».)

~~~text Anzeige
Schöne 2-Zimmer-Wohnung, 55 m², 2. OG
Küche, Bad, Balkon
Kaltmiete 620 €, Nebenkosten 150 €
Kaution: zwei Monatsmieten
Frei ab 1. März. Tel. 0176 1234567
~~~

~~~de Vermieter=m Sara=f
Vermieter: Wagner, guten Tag! || واجنر، أهلًا!
Sara: Guten Tag! Mein Name ist Sara Ali. Ist die Wohnung noch frei? || أهلًا! اسمي سارة علي. الشقة لسه فاضية؟
Vermieter: Ja, ab März. || آه، من مارس.
Sara: Wie hoch ist die Miete mit Nebenkosten? || الإيجار بالمصاريف قد إيه؟
Vermieter: Siebenhundertsiebzig Euro im Monat. || ٧٧٠ يورو في الشهر.
Sara: Kann ich die Wohnung sehen? || ممكن أشوف الشقة؟
Vermieter: Ja, natürlich. Können Sie morgen um fünf Uhr kommen? || آه طبعًا. تقدري تيجي بكرة الساعة ٥؟
Sara: Morgen kann ich leider nicht. Geht es auch am Freitag? || بكرة للأسف مش هقدر. ينفع يوم الجمعة؟
Vermieter: Ja, am Freitag um fünf. Bis dann! || آه، الجمعة الساعة ٥. أشوفك!
~~~

## können: يقدر

| [[ich kann]] | [[du kannst]] | [[er/sie kann]] | [[wir können]] | [[ihr könnt]] | [[sie/Sie können]] |
|---|---|---|---|---|---|

- [[ich kann]] و [[er kann]] **نفس الشكل** ومن غير [[-t]] (زي [[ich mag]] و [[er mag]]).
- [[können]] بيقول ٣ حاجات: تقدر (مهارة: [[Ich kann kochen]])، وممكن (فيه إمكانية: [[Ich kann am Freitag kommen]])، وطلب مؤدّب ([[Können Sie mir helfen?]]).

## الجملة بفعلين: الإطار (Satzklammer)

| ١ | ٢ (الفعل المساعد) | … | الآخر (المصدر) |
|---|---|---|---|
| [[Ich]] | [[kann]] | [[am Freitag]] | [[kommen]]. |
| [[Am Freitag]] | [[kann]] | [[ich]] | [[kommen]]. |
| [[Kann]] | [[ich]] | [[die Wohnung]] | [[sehen]]? |
| [[Wann]] | [[können]] | [[Sie]] | [[kommen]]? |

- [[können]] بيتصرّف ويقعد في المكان التاني (أو الأول في سؤال نعم/لأ).
- الفعل التاني **مبيتصرّفش** ويروح آخر الجملة: [[Ich kann kommen]] (مش «Ich kann komme»).
- ده نفس شكل [[Ich stehe um sieben Uhr auf]]: حاجة في المكان التاني، وحاجة في الآخر، والكلام في النص. وهتشوفه تاني مع [[müssen]] و [[dürfen]] و [[möchten]].
- و [[Ich kann leider nicht]] من غير فعل تاني = مش هقدر (الفعل مفهوم).

## الإعلان: الكلمات والاختصارات

| مكتوب | معناه |
|---|---|
| [[2-Zimmer-Wohnung]] / [[2-Zi.-Whg.]] | شقة أوضتين (صالة + أوضة) |
| [[55 m²]] | ٥٥ متر مربع ([[fünfundfünfzig Quadratmeter]]) |
| [[2. OG]] | الدور التاني ([[Obergeschoss]]) |
| [[Kaltmiete]] / [[KM]] | الإيجار من غير مصاريف |
| [[Nebenkosten]] / [[NK]] | المصاريف: مية، وتدفئة، وزبالة، ونضافة السلم |
| [[Warmmiete]] | الإيجار بالمصاريف (اللي هتدفعه فعلًا) |
| [[Kaution]] | تأمين بتدفعه مرة وبيرجع |
| [[frei ab 1. März]] | فاضية من أول مارس |

**ليه ده مهم:** في مصر غالبًا الإيجار رقم واحد. في ألمانيا الرقم الكبير في الإعلان ممكن يبقى [[Kaltmiete]]، والمصاريف بتزوّد ٢٠٪ أو أكتر. فاسأل دايمًا: [[Wie hoch ist die Warmmiete?]] أو [[Sind die Nebenkosten inklusive?]] والكهربا ([[Strom]]) غالبًا برّه الاتنين وبتدفعها لوحدك.

## الإيجار والفلوس بالكلام

~~~de
Die Miete ist sechshundertzwanzig Euro. || الإيجار ٦٢٠ يورو.
Die Nebenkosten sind hundertfünfzig Euro im Monat. || المصاريف ١٥٠ يورو في الشهر.
Die Wohnung kostet siebenhundertsiebzig Euro warm. || الشقة بـ ٧٧٠ يورو بالمصاريف.
~~~

الأرقام فوق المية: [[hundert]] + الباقي ([[hundertfünfzig]] = ١٥٠)، و [[sechshundert]] + [[zwanzig]] = ٦٢٠، كلمة واحدة. و [[im Monat]] = في الشهر.

## المكالمة: جمل جاهزة

~~~de
Ich rufe wegen der Anzeige an. || بتصل بخصوص الإعلان.
Ist die Wohnung noch frei? || الشقة لسه فاضية؟
Wie hoch ist die Kaution? || التأمين قد إيه؟
Kann ich die Wohnung sehen? || ممكن أشوف الشقة؟
Wann kann ich kommen? || أقدر آجي إمتى؟
Können Sie das bitte wiederholen? || ممكن تعيد ده لو سمحت؟
~~~

- [[mieten]] = يأجّر (إنت الساكن)، و [[vermieten]] = يأجّر لحد (صاحب الشقة)، و [[der Vermieter]] = صاحب الشقة.
- [[Können Sie das bitte wiederholen?]] أهم جملة في أي تليفون. ولو بيتكلم بسرعة: [[Bitte langsam!]]

## الكلمات

~~~words الإيجار
die Miete, die Mieten | الإيجار | Die Miete ist hoch.
mieten | يأجّر (ساكن) | Wir möchten eine Wohnung mieten.
vermieten | يأجّر لحد | Herr Wagner vermietet eine Wohnung.
der Vermieter, die Vermieter | صاحب الشقة | Der Vermieter heißt Wagner.
die Anzeige, die Anzeigen | الإعلان | Ich lese die Anzeigen.
frei | فاضي | Ist die Wohnung noch frei?
sofort | حالًا، على طول | Die Wohnung ist ab sofort frei.
können | يقدر | Kann ich die Wohnung sehen?
der Strom | الكهربا | Der Strom ist nicht in der Miete.
~~~

[[ab sofort]] = من دلوقتي، و [[ab März]] = من مارس. و [[ab]] زي اللي اتعلمته مع المواعيد ([[ab acht Uhr]]).

## قول بصوتك

~~~speak
Ist die Wohnung noch frei? || الشقة لسه فاضية؟
Wie hoch sind die Nebenkosten? || المصاريف قد إيه؟
Kann ich die Wohnung sehen? || ممكن أشوف الشقة؟
Ich kann am Freitag kommen. || أقدر آجي يوم الجمعة.
Können Sie das bitte wiederholen? || ممكن تعيد ده لو سمحت؟
~~~

## سمع: المكالمة

~~~hear
m: Die Kaltmiete ist fünfhundert Euro, und die Nebenkosten sind hundertzwanzig Euro.
? Wie hoch ist die Warmmiete? || الإيجار بالمصاريف قد إيه؟
- 500 €
- 620 € *
- 120 €

f: Die Wohnung ist leider nicht mehr frei. Aber im Mai ist eine Wohnung im dritten Stock frei.
? Wann ist eine Wohnung frei? || إمتى فيه شقة فاضية؟
- jetzt
- im März
- im Mai *

m: Sie können die Wohnung am Donnerstag um sechs Uhr sehen. Am Mittwoch kann ich leider nicht.
? Wann kann man die Wohnung sehen? || ممكن تتشاف إمتى؟
- am Mittwoch
- am Donnerstag *
- am Dienstag
~~~

## إملا

~~~dictate
Ist die Wohnung noch frei?
f: Kann ich die Wohnung sehen?
Die Miete ist sehr hoch.
f: Ich kann am Freitag kommen.
~~~

## فيديو: können

~~~yt 6lTltCmgrCk German Verbs: Können (Full Conjugation for Beginners)
- **قبل ما تشغّله:** اكتب تصريف [[können]] من دماغك (٦ أشكال).
- **وإنت بتتفرج:** اكتب ٣ جمل من الفيديو، وعلّم على مكان المصدر في كل جملة.
- **بعده:** اكتب ٣ جمل عنك: حاجة بتقدر تعملها، وحاجة مبتقدرش، وطلب بـ [[Kannst du …?]].
~~~`,
          deep: {
            why: R`التدوير على شقة هدف واضح في منهج الاندماج، وإعلانات الشقق بتيجي في القراية (ÖSD Lesen فيها إعلان شقة بأسئلة «ممكن …؟»، و Goethe Lesen Teil 2 فيها مواقع سكن). و [[können]] من أكتر الأفعال استخدامًا في الألماني: أي طلب، وأي «ينفع؟»، وأي «أقدر».`,
            how: R`[[können]] يتصرّف في المكان التاني، والفعل التاني مصدر في الآخر. الطلب: [[Können Sie …?]]. والإعلان: [[Kaltmiete]] + [[Nebenkosten]] = [[Warmmiete]]، و [[Kaution]] مرة واحدة.`,
            when: R`[[Ist … noch frei?]] أول سؤال في أي مكالمة عن شقة أو أوضة. [[Kann ich … sehen?]] لميعاد معاينة. [[Können Sie das bitte wiederholen?]] لما متفهمش في التليفون. و [[Geht es auch am …?]] لما تقترح يوم تاني.`,
            mistakes: R`- [[Ich kann komme am Freitag]]: الفعل التاني مصدر في الآخر ← [[Ich kann am Freitag kommen]].
- [[er kannt]]: الصح [[er kann]].
- [[Kann ich sehen die Wohnung?]]: المصدر في الآخر ← [[Kann ich die Wohnung sehen?]]
- تقارن [[Kaltmiete]] شقة بـ [[Warmmiete]] شقة تانية: قارن الحاجة بنفسها.
- [[Ich vermiete eine Wohnung]] وإنت الساكن: الساكن [[mietet]].
- [[Auf Wiedersehen]] في التليفون: الأدق [[Auf Wiederhören]].`
          },
          try: R`اقرا الإعلان اللي فوق تاني، وقول بصوت عالي كل اللي فيه بالكلام (الإيجار، والمساحة، والدور، وإمتى فاضية). وبعدين قول ٥ جمل بـ [[können]]: ٣ عنك واتنين طلبات.`,
          practice: [
            { lvl: 'سريع', t: R`**صرّف können:** (١) ___ du kochen? (٢) Ich ___ heute nicht. (٣) Wir ___ am Montag kommen. (٤) ___ Sie das wiederholen? (٥) Er ___ gut Deutsch. (٦) ___ ihr morgen helfen?`,
              done: R`الستة صح، و [[kann]] من غير [[-t]] مع [[ich]] و [[er]]`,
              sol: R`~~~de
Kannst du kochen?
Ich kann heute nicht.
Wir können am Montag kommen.
Können Sie das wiederholen?
Er kann gut Deutsch.
Könnt ihr morgen helfen?
~~~

**ليه:** [[ich kann]] و [[er kann]] نفس الشكل. و [[du kannst]]، و [[ihr könnt]]. و [[Er kann gut Deutsch]] = بيعرف ألماني كويس (اللغة مع [[können]] من غير فعل تاني، مفهومة إنها «يتكلم»).` },
            { lvl: 'تطبيق', t: R`**رتّب الجملة:** (١) kann / ich / am Samstag / kommen (٢) die Wohnung / Sie / sehen / können / wann (سؤال) (٣) helfen / du / mir / kannst (سؤال) (٤) nicht / heute / ich / kann / arbeiten`,
              done: R`الأربعة صح، و [[können]] في التاني (أو الأول في السؤال)، والمصدر في الآخر`,
              sol: R`~~~de
Ich kann am Samstag kommen.
Wann können Sie die Wohnung sehen?
Kannst du mir helfen?
Heute kann ich nicht arbeiten.
~~~

**ليه:** دايمًا [[können]] في المكان التاني والمصدر في الآخر. وفي (٤) لما بدأت بـ [[Heute]]، الفاعل [[ich]] راح بعد [[kann]]، و [[nicht]] قبل المصدر. وفي (٣) سؤال نعم/لأ ← [[Kannst]] الأول.` },
            { lvl: 'تطبيق', t: R`**فك الإعلان:** [[1-Zi.-Whg., 32 m², EG, KM 410 €, NK 90 €, Kaution 820 €, frei ab sofort]]. جاوب بجمل ألماني: (١) كام أوضة؟ (٢) في أنهي دور؟ (٣) الإيجار بالمصاريف كام؟ (٤) التأمين كام شهر؟ (٥) فاضية إمتى؟`,
              done: R`الخمسة صح، والحساب ٥٠٠ والتأمين شهرين`,
              sol: R`~~~de
Die Wohnung hat ein Zimmer.
Sie ist im Erdgeschoss.
Die Warmmiete ist fünfhundert Euro.
Die Kaution ist zwei Monatsmieten.
Die Wohnung ist ab sofort frei.
~~~

**ليه:** [[EG]] = [[Erdgeschoss]]. و ٤١٠ + ٩٠ = ٥٠٠. و ٨٢٠ = ٢ × ٤١٠، يعني التأمين شهرين [[Kaltmiete]] (وده الشائع). و [[ab sofort]] = من دلوقتي.` },
            { lvl: 'تحدي', t: R`**مكالمة فيها مشكلة:** اكتب مكالمة (٨ سطور) صاحب الشقة فيها بيقترح ميعاد إنت مش فاضي فيه، وانت بتعتذر وتقترح ميعاد تاني، وفي الآخر بتطلب منه يعيد العنوان.`,
              done: R`٨ سطور، و [[Ich kann leider nicht]]، واقتراح بـ [[Geht es auch …?]] أو [[Kann ich … kommen?]]، و [[Können Sie das bitte wiederholen?]]`,
              sol: R`~~~de Vermieterin=f Paul=m
Vermieterin: Können Sie heute um vier Uhr kommen? || تقدر تيجي النهارده الساعة ٤؟
Paul: Heute kann ich leider nicht. Ich arbeite bis sechs. || النهارده للأسف مش هقدر. بشتغل لحد ٦.
Vermieterin: Und morgen? || وبكرة؟
Paul: Geht es auch morgen um sieben Uhr? || ينفع بكرة الساعة ٧؟
Vermieterin: Ja, das geht. Die Adresse ist Lindenstraße zwölf. || آه، ينفع. العنوان شارع ليندن ١٢.
Paul: Können Sie das bitte wiederholen? || ممكن تعيدي ده لو سمحتي؟
Vermieterin: Lindenstraße zwölf, im zweiten Stock. || شارع ليندن ١٢، الدور التاني.
Paul: Danke! Bis morgen! || شكرًا! أشوفك بكرة!
~~~

**ليه كده:** [[Heute kann ich leider nicht]]: بدأ بـ [[Heute]] فـ [[kann]] قبل [[ich]]، ومن غير مصدر لأن [[kommen]] مفهومة. و [[Geht es auch …?]] أسهل طريقة تقترح ميعاد. و [[Lindenstraße zwölf]]: في ألمانيا رقم البيت بعد اسم الشارع، مش قبله زي ما بنقول «١٢ شارع…».` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Modalverben (können) و Satzklammer (ص ١٠٠)، و Miete/Mietverhältnis (ص ٧٦)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "ÖSD Zertifikat A1: Modellsatz (Lesen Aufgabe 2: إعلان شقة بأسئلة Ja/Nein)", url: "https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Wohnen، Wohnungssuche (ص ١٥٥)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: können", url: "https://www.dwds.de/wb/k%C3%B6nnen" },
            { t: "DWDS: Miete", url: "https://www.dwds.de/wb/Miete" },
          ],
        },
        {
          cmd: "Können Sie mir helfen?",
          title: "الجيران والعزال: تتعرّف، وتطلب مساعدة، و mir/dir/Ihnen",
          pre: ["dea1/Ist die Wohnung noch frei?", "dea1/Ich stehe um sieben Uhr auf"],
          desc: R`أول يوم في الشقة الجديدة: بتعرّف نفسك لجارتك ([[Ich bin Ihr neuer Nachbar]])، وبتطلب منها مساعدة ([[Können Sie mir bitte helfen?]])، وبتشكرها ([[Vielen Dank, das ist sehr nett von Ihnen!]]).

و [[helfen]] و [[danken]] بياخدوا **Dativ**: [[mir]] (ليّا)، و [[dir]] (ليك)، و [[Ihnen]] (لحضرتك). مش [[mich]] و [[dich]] و [[Sie]] زي [[einladen]].`,
          teach: R`## الموقف

كريم بيعزّل، وقابل جارته على السلم. (Rahmencurriculum: يعرّف نفسه لجيرانه كساكن جديد، ويطلب منهم مساعدة.)

~~~de Karim=m Frau_Lang=f
Karim: Guten Tag! Ich bin Karim Hassan. Ich bin Ihr neuer Nachbar. || أهلًا! أنا كريم حسن. أنا جارك الجديد.
Frau_Lang: Ah, guten Tag! Ich heiße Petra Lang. Herzlich willkommen! || آه، أهلًا! أنا بيترا لانج. أهلًا بيك!
Karim: Danke! Ich ziehe heute ein. Entschuldigung, es ist ein bisschen laut. || شكرًا! أنا بنقل النهارده. آسف، فيه دوشة شوية.
Frau_Lang: Kein Problem. Kann ich Ihnen helfen? || مفيش مشكلة. أقدر أساعدك؟
Karim: Das ist sehr nett. Können Sie mir bitte die Tür aufhalten? || ده لطف منك. ممكن تمسكي لي الباب لو سمحتي؟
Frau_Lang: Ja, gern. || آه، طبعًا.
Karim: Vielen Dank! Ich danke Ihnen sehr. || شكرًا جدًا! متشكر جدًا.
~~~

## helfen و danken: + Dativ

أغلب الأفعال بياخدوا Akkusativ ([[Ich besuche dich]]، [[Ich lade dich ein]]). بس فيه أفعال قليلة بياخدوا **Dativ**، وأشهرهم في A1: [[helfen]] و [[danken]] و [[gehören]] و [[gefallen]] و [[schmecken]].

| | Nominativ | Akkusativ | Dativ |
|---|---|---|---|
| أنا | [[ich]] | [[mich]] | [[mir]] |
| إنت | [[du]] | [[dich]] | [[dir]] |
| هو | [[er]] | [[ihn]] | [[ihm]] |
| هي | [[sie]] | [[sie]] | [[ihr]] |
| إحنا | [[wir]] | [[uns]] | [[uns]] |
| إنتو | [[ihr]] | [[euch]] | [[euch]] |
| حضرتك | [[Sie]] | [[Sie]] | [[Ihnen]] |

~~~de
Kannst du mir helfen? || تقدر تساعدني؟
Ich helfe dir gern. || أساعدك بكل سرور.
Kann ich Ihnen helfen? || أقدر أساعد حضرتك؟
Ich danke Ihnen. || متشكر لحضرتك.
~~~

- في A1 كفاية تحفظ [[mir]] و [[dir]] و [[Ihnen]]، وده اللي Goethe بيطلبه ([[es geht mir gut]] من أول الكورس كانت Dativ برده!).
- **مقارنة بالعربي:** «يساعد**ني**» في العربي مفعول عادي، فالمصري بيقول [[Kannst du mich helfen?]]. في الألماني [[helfen]] بياخد Dativ، فـ [[mir]].
- [[Das gehört mir]] = ده بتاعي. و [[Das Essen schmeckt mir]] = الأكل عاجبني. ونفس الـ Dativ.

## können للطلب: من الأدب للأمر

| | الطلب |
|---|---|
| مع صاحب | [[Kannst du mir bitte helfen?]] |
| مع جار أو حد غريب | [[Können Sie mir bitte helfen?]] |
| أدب أكتر | [[Könnten Sie mir bitte helfen?]] (هتسمعها كتير، A2) |

والرد: [[Ja, gern!]]، [[Natürlich!]]، [[Kein Problem!]]، أو [[Tut mir leid, ich habe jetzt keine Zeit.]]

## العزال: umziehen, einziehen, ausziehen

| الفعل | المعنى | مثال |
|---|---|---|
| [[umziehen]] | ينقل من سكن لسكن | [[Wir ziehen im Mai um.]] |
| [[einziehen]] | يدخل يسكن | [[Ich ziehe heute ein.]] |
| [[ausziehen]] | يسيب الشقة | [[Die Nachbarn ziehen aus.]] |

الأفعال التلاتة بيتقسموا زي [[aufstehen]]: [[Ich ziehe … um]]. ومع [[können]] بيرجعوا كلمة واحدة في الآخر: [[Wann kannst du umziehen?]]

## الجيران في ألمانيا

- لما تسكن، بيتوقّعوا تعرّف نفسك لجيرانك أو تعلّق ورقة صغيرة على لوحة العمارة.
- الجيران بيستلموا الطرود لبعض: [[Können Sie bitte mein Paket annehmen?]] (ممكن تستلم الطرد بتاعي؟). ودي حاجة عادية جدًا.
- مع الجيران [[Sie]] لحد ما حد يعرض [[du]]، حتى لو قريبين منك في السن، خصوصًا في العماير الكبيرة.

## ورقة على لوحة العمارة

~~~read ورقة من جار
Liebe Nachbarn, || الجيران الأعزاء،
am Samstag ziehe ich aus. || يوم السبت هسيب الشقة.
Ich verkaufe meine Möbel: ein Sofa, einen Tisch und zwei Stühle. || ببيع عفشي: كنبة وترابيزة وكرسيين.
Alles ist sehr günstig! || كله رخيص جدًا!
Sie können am Freitag ab achtzehn Uhr kommen. || تقدروا تيجوا الجمعة من الساعة ٦ بالليل.
Wohnung 7, zweiter Stock || شقة ٧، الدور التاني
Jonas Becker || يوناس بيكر
? Jonas zieht am Samstag ein. || يوناس هيسكن يوم السبت
- Richtig
- Falsch *
? Man kann am Freitagabend Möbel kaufen. || ممكن تشتري عفش الجمعة بالليل
- Richtig *
- Falsch
~~~

## الكلمات

~~~words الجيران والعزال
der Nachbar, die Nachbarn | الجار | Mein Nachbar ist sehr nett.
die Nachbarin, die Nachbarinnen | الجارة | Die Nachbarin heißt Frau Lang.
helfen | يساعد (+ Dativ) | Kannst du mir helfen?
danken | يشكر (+ Dativ) | Ich danke Ihnen.
umziehen | ينقل (من سكن لسكن) | Wir ziehen im Mai um.
der Schlüssel, die Schlüssel | المفتاح | Hier ist Ihr Schlüssel.
das Paket, die Pakete | الطرد | Ich habe ein Paket für Sie.
willkommen | أهلًا بيك | Herzlich willkommen!
~~~

## قول بصوتك

~~~speak
Guten Tag, ich bin Ihr neuer Nachbar. || أهلًا، أنا جارك الجديد.
Können Sie mir bitte helfen? || ممكن تساعدني لو سمحت؟
Ich helfe dir gern. || أساعدك بكل سرور.
Vielen Dank, das ist sehr nett von Ihnen! || شكرًا جدًا، ده لطف منك!
Wir ziehen im Mai um. || هننقل في مايو.
~~~

## سمع: مين بيساعد مين؟

~~~hear
m: Frau Lang, können Sie mir bitte helfen? Mein Paket ist sehr schwer.
? Was möchte der Mann? || الراجل عايز إيه؟
- Er möchte ein Paket kaufen.
- Er möchte Hilfe. *
- Er möchte umziehen.

f: Am Montag ziehen wir aus. Unsere neue Wohnung ist in der Bergstraße.
? Was passiert am Montag? || إيه اللي هيحصل يوم الاتنين؟
- Die Familie zieht ein.
- Die Familie zieht aus. *
- Die Familie macht eine Party.

m: Ich bin nicht zu Hause. Kannst du bitte mein Paket annehmen? Danke dir!
? Was soll der Nachbar machen? || الجار المفروض يعمل إيه؟
- das Paket annehmen *
- die Tür öffnen
- den Schlüssel bringen
~~~

## إملا

~~~dictate
Können Sie mir helfen?
f: Ich helfe dir gern.
Ich danke Ihnen sehr.
f: Wir ziehen im Mai um.
~~~`,
          deep: {
            why: R`منهج الاندماج فيه أهداف بالاسم: يعرّف نفسه لجيرانه، ويطلب منهم مساعدة، ويفهم ورقة جار على لوحة العمارة. و Goethe حاطط Dativ بعد [[helfen]] و [[danken]] (mir، dir، Ihnen) في قايمة القواعد. وطلب المساعدة بـ [[Können Sie …?]] هو بالظبط Sprechen Teil 3.`,
            how: R`طلب: [[Können Sie mir bitte …?]] / [[Kannst du mir bitte …?]]. و [[helfen]] و [[danken]] + [[mir]]/[[dir]]/[[Ihnen]]. والعزال: [[umziehen]] و [[einziehen]] و [[ausziehen]]، وكلهم بيتقسموا.`,
            when: R`[[Ich bin Ihr neuer Nachbar]] أول ما تقابل حد في العمارة. [[Kann ich Ihnen helfen?]] لما تشوف حد شايل حاجة تقيلة. [[Ich danke Ihnen]] أرسمية شوية من [[Danke]]، و [[Danke dir!]] مع صاحب.`,
            mistakes: R`- [[Kannst du mich helfen?]]: [[helfen]] + Dativ ← [[mir]].
- [[Ich danke Sie]]: ← [[Ich danke Ihnen]].
- [[Ich umziehe im Mai]]: الفعل بيتقسم ← [[Ich ziehe im Mai um]].
- [[Wann kannst du ziehst um?]]: مع [[können]] المصدر كلمة واحدة في الآخر ← [[Wann kannst du umziehen?]]
- [[einziehen]] و [[ausziehen]] بالعكس: [[ein]] = جوه (بتسكن)، [[aus]] = برّه (بتسيب).
- تقول [[du]] لجار كبير من أول مرة: استنى لما يعرضها.`
          },
          try: R`مثّل الموقف ده بصوتك: إنت ساكن جديد، بتعرّف نفسك لجار، وبتطلب منه حاجة (يستلم طرد، أو يمسك الباب، أو يقولك فين الزبالة)، وبتشكره. ٦ جمل على الأقل.`,
          practice: [
            { lvl: 'سريع', t: R`**mir ولا mich؟ dir ولا dich؟** (١) Kannst du ___ helfen? (أنا) (٢) Ich lade ___ ein. (إنت) (٣) Ich danke ___. (إنت) (٤) Besuchst du ___? (أنا) (٥) Kann ich ___ helfen? (حضرتك) (٦) Das Essen schmeckt ___. (أنا)`,
              done: R`الستة صح: Dativ بعد [[helfen]] و [[danken]] و [[schmecken]]، و Akkusativ بعد [[einladen]] و [[besuchen]]`,
              sol: R`~~~de
Kannst du mir helfen?
Ich lade dich ein.
Ich danke dir.
Besuchst du mich?
Kann ich Ihnen helfen?
Das Essen schmeckt mir.
~~~

**ليه:** [[helfen]] و [[danken]] و [[schmecken]] من الأفعال القليلة اللي بتاخد Dativ ([[mir]]، [[dir]]، [[Ihnen]]). و [[einladen]] و [[besuchen]] زي أغلب الأفعال Akkusativ ([[mich]]، [[dich]]).` },
            { lvl: 'تطبيق', t: R`**اطلب بأدب:** حوّل دول لطلبات بـ [[können]]: (١) لجارة: تستلم الطرد. (٢) لصاحبك: يساعدك يوم السبت. (٣) لصاحب الشقة: يدّيك المفتاح. (٤) لجار: يقفل الباب.`,
              done: R`٤ طلبات، [[Sie]] مع الجيران وصاحب الشقة و [[du]] مع الصاحب، و [[bitte]]، والمصدر في الآخر`,
              sol: R`~~~de
Können Sie bitte mein Paket annehmen?
Kannst du mir am Samstag helfen?
Können Sie mir bitte den Schlüssel geben?
Können Sie bitte die Tür schließen?
~~~

**ليه:** [[annehmen]] و [[schließen]] و [[geben]] و [[helfen]] كلهم مصدر في الآخر. و [[mir]] مع [[helfen]] (Dativ)، ومع [[geben]] كمان ([[mir den Schlüssel geben]]: اديني المفتاح، [[mir]] Dativ للشخص و [[den Schlüssel]] Akkusativ للحاجة).` },
            { lvl: 'تطبيق', t: R`**um ولا ein ولا aus؟** (١) Die Familie Becker ___ im Juni ___. (بتسيب الشقة) (٢) Ich ___ morgen in meine neue Wohnung ___. (بتسكن) (٣) Wir ___ nach Berlin ___. (بتنقلوا) (٤) Wann ___ du ___? (بتنقل)`,
              done: R`الأربعة صح والفعل مقسوم`,
              sol: R`~~~de
Die Familie Becker zieht im Juni aus.
Ich ziehe morgen in meine neue Wohnung ein.
Wir ziehen nach Berlin um.
Wann ziehst du um?
~~~

**ليه:** [[ziehen]] بيتصرّف في المكان التاني والجزء ([[aus]]، [[ein]]، [[um]]) في الآخر. و [[in meine neue Wohnung]] Akkusativ لأنه «لفين» (حركة)، مش «فين»: ده الفرق اللي هتتعلمه بعدين بين [[in die]] و [[in der]].` },
            { lvl: 'تحدي', t: R`**ورقة جار وردّك:** على لوحة العمارة: [[Liebe Nachbarn, am Samstag feiern wir den Geburtstag von unserem Sohn. Es ist vielleicht bis 22 Uhr laut. Das tut uns leid! Familie Özdemir, 3. Stock]]. اكتب ردّ قصير (٣–٤ جمل) تهنّي فيه وتقول إن مفيش مشكلة وتعرض مساعدة.`,
              done: R`تحية للعيلة، وتهنئة لابنهم ([[Alles Gute für …]])، و [[Kein Problem]]، وعرض مساعدة بـ [[Kann ich … helfen?]] و Dativ صح`,
              sol: R`~~~de
Liebe Familie Özdemir,
alles Gute für Ihren Sohn! Kein Problem.
Brauchen Sie noch Stühle? Ich kann Ihnen gern helfen.
Viele Grüße, Karim Hassan, 2. Stock
~~~

**ليه كده:** [[Liebe Familie …]] لما تكتب لعيلة. و [[Ihren Sohn]] لأنك بتكلمهم بـ [[Sie]] ([[Ihr]] بحرف كبير، و [[-en]] بعد [[für]] لأن [[der Sohn]] مذكر و [[für]] بعده Akkusativ). و [[Ich kann Ihnen helfen]]: [[helfen]] + Dativ. وفي ألمانيا الدوشة بعد الساعة ١٠ بالليل ممنوعة في أغلب العماير، فالجيران بيعتذروا قبلها، وده اللي الدرس الجاي بيشرحه.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Personalpronomen im Dativ (helfen، danken: mir، dir، Ihnen) و Modalverben (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Wohnen، الجيران (12.4، ص ١٥٨)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: helfen", url: "https://www.dwds.de/wb/helfen" },
            { t: "DWDS: umziehen", url: "https://www.dwds.de/wb/umziehen" },
            { t: "DWDS: Nachbar", url: "https://www.dwds.de/wb/Nachbar" },
          ],
        },
        {
          cmd: "Hier darf man nicht rauchen",
          title: "قواعد العمارة: müssen و dürfen و man، واليافطات",
          pre: ["dea1/Ist die Wohnung noch frei?"],
          desc: R`في كل عمارة ألماني فيه ورقة اسمها [[Hausordnung]] (قواعد العمارة): [[Von 22 bis 6 Uhr muss man leise sein.]] و [[Im Treppenhaus darf man nicht rauchen.]]

هنا فعلين مساعدين زي [[können]]: [[müssen]] (لازم) و [[dürfen]] (مسموح). ومعاهم [[man]] (الواحد، أي حد)، اللي بتقول بيها قواعد للكل. وفي الآخر هتقرا اليافطات القصيرة اللي على الأبواب، ودي Lesen Teil 3.`,
          teach: R`## الموقف

يوناس ساكن جديد، والجارة بتشرحله القواعد. (Rahmencurriculum: يفهم أهم حاجة في قواعد العمارة واليافطات فيها، ويسأل عن الاتفاقات بين السكان.)

~~~de Jonas=m Frau_Lang=f
Jonas: Frau Lang, gibt es hier eine Hausordnung? || يا مدام لانج، فيه قواعد للعمارة هنا؟
Frau_Lang: Ja, sie hängt unten an der Tür. Von zweiundzwanzig bis sechs Uhr muss man leise sein. || آه، متعلّقة تحت على الباب. من ١٠ بالليل لـ ٦ الصبح لازم الواحد يبقى هادي.
Jonas: Darf man im Treppenhaus rauchen? || ينفع الواحد يدخّن على السلم؟
Frau_Lang: Nein, das ist verboten. || لأ، ده ممنوع.
Jonas: Und wer putzt die Treppe? || ومين بيمسح السلم؟
Frau_Lang: Jede Woche eine Familie. Nächste Woche müssen Sie putzen. || كل أسبوع عيلة. الأسبوع الجاي لازم حضرتك تمسح.
Jonas: Ah, okay. Und wo muss ich den Müll hinbringen? || آه، ماشي. والزبالة لازم أوديها فين؟
Frau_Lang: Die Mülltonnen sind im Hof. Sie müssen den Müll trennen! || الصناديق في الحوش. لازم تفصل الزبالة!
~~~

## müssen و dürfen

| | [[müssen]] (لازم) | [[dürfen]] (مسموح) |
|---|---|---|
| [[ich]] | [[muss]] | [[darf]] |
| [[du]] | [[musst]] | [[darfst]] |
| [[er/sie/man]] | [[muss]] | [[darf]] |
| [[wir]] | [[müssen]] | [[dürfen]] |
| [[ihr]] | [[müsst]] | [[dürft]] |
| [[sie/Sie]] | [[müssen]] | [[dürfen]] |

- زي [[können]] بالظبط: [[ich]] و [[er]] نفس الشكل من غير [[-t]]، والحرف اللي فوق النقطتين بيختفي في المفرد ([[müssen]] ← [[muss]]، [[dürfen]] ← [[darf]]).
- ونفس الإطار: الفعل المساعد في التاني، والمصدر في الآخر: [[Man muss den Müll trennen.]]

## الفخ: muss nicht ≠ darf nicht ⚠

| | المعنى |
|---|---|
| [[Man darf hier nicht rauchen.]] | ممنوع تدخّن هنا |
| [[Man muss hier nicht rauchen.]] | مش لازم تدخّن هنا (لو عايز، براحتك) |
| [[Du musst nicht kommen.]] | مش مضطر تيجي |
| [[Du darfst nicht kommen.]] | ممنوع تيجي |

**الممنوع = [[nicht dürfen]]**، مش [[nicht müssen]]. وده عكس الإنجليزي ([[must not]] = ممنوع)، فلو بتعرف إنجليزي خلي بالك.

## man: الواحد، أي حد

[[man]] = «الواحد» أو «الناس»، وبتستخدمها للقواعد والحاجات العامة. والفعل معاها زي [[er]]:

~~~de
Hier darf man nicht parken. || ممنوع الركن هنا.
Man muss die Haustür schließen. || لازم تقفل باب العمارة.
Wie schreibt man das? || بتتكتب إزاي؟
In Deutschland trennt man den Müll. || في ألمانيا الناس بتفصل الزبالة.
~~~

[[man]] بحرف صغير وبـ [[n]] واحدة. و [[der Mann]] (الراجل) بـ [[nn]] وحرف كبير: كلمتين مختلفين.

## قواعد العمارة الشائعة

~~~de
Die Ruhezeit ist von zweiundzwanzig bis sechs Uhr. || وقت الراحة من ١٠ بالليل لـ ٦ الصبح.
Man darf keine laute Musik machen. || ممنوع المزيكا العالية.
Man darf die Fahrräder nicht in den Flur stellen. || ممنوع تحط العجل في الطرقة.
Man muss die Treppe putzen. || لازم تمسح السلم.
Kinder dürfen im Hof spielen. || العيال مسموح لهم يلعبوا في الحوش.
~~~

- **[[die Ruhezeit]]** (وقت الراحة): غالبًا من ١٠ بالليل لـ ٦ الصبح، وطول يوم الحد. ممنوع غسالة أو مزيكا عالية أو شنيور.
- **الزبالة:** ألمانيا بتفصل الزبالة في صناديق بألوان: ورق ([[Papier]])، وبلاستيك وعلب ([[Gelber Sack]] أو [[Gelbe Tonne]])، وأكل ([[Bio]])، والباقي ([[Restmüll]])، والإزاز بيتحط في صناديق في الشارع. والجيران بياخدوا بالهم جدًا من ده.
- **[[der Hausmeister]]** = البوّاب أو المسؤول عن صيانة العمارة.

## اليافطات: من غير فاعل

اليافطات بتتكتب مختصرة، غالبًا بالمصدر أو باسم:

| اليافطة | معناها | بالجملة |
|---|---|---|
| [[Rauchen verboten]] | ممنوع التدخين | [[Hier darf man nicht rauchen.]] |
| [[Bitte Tür schließen!]] | من فضلك اقفل الباب | [[Man muss die Tür schließen.]] |
| [[Ruhezeit: 22–6 Uhr]] | وقت الراحة | [[Von 22 bis 6 Uhr muss man leise sein.]] |
| [[Fahrräder abstellen verboten]] | ممنوع ركن العجل | [[Hier darf man keine Fahrräder abstellen.]] |
| [[Kein Zutritt]] | ممنوع الدخول | [[Hier darf man nicht hineingehen.]] |
| [[geöffnet]] / [[geschlossen]] | مفتوح / مقفول | [[Die Tür ist offen / zu.]] |

ودي بالظبط مهارة Lesen Teil 3: تقرا يافطة قصيرة وتقرر جملة عنها صح ولا غلط، والجملة دايمًا مكتوبة بـ [[man]] و [[müssen]] و [[dürfen]] و [[können]].

## الكلمات

~~~words قواعد العمارة
müssen | لازم | Ich muss heute arbeiten.
dürfen | مسموح | Darf man hier rauchen?
rauchen | يدخّن | Hier darf man nicht rauchen.
verboten | ممنوع | Rauchen ist hier verboten.
die Ordnung | النظام | Hier muss alles in Ordnung sein.
leise | هادي، بصوت واطي | Bitte seien Sie leise!
der Müll | الزبالة | Wo ist der Müll?
die Hausordnung, die Hausordnungen | قواعد العمارة | Die Hausordnung hängt im Flur.
der Hof, die Höfe | الحوش | Die Kinder spielen im Hof.
putzen | يمسح، ينضّف | Wir putzen die Treppe.
~~~

[[Alles in Ordnung?]] = كله تمام؟ — وده أشهر استخدام لكلمة [[Ordnung]]. و [[Bitte seien Sie leise!]] = اهدى لو سمحت (أمر مؤدّب، الأمر جاي في وحدة الصحة).

## قول بصوتك

~~~speak
Hier darf man nicht rauchen. || ممنوع التدخين هنا.
Man muss den Müll trennen. || لازم تفصل الزبالة.
Ab zweiundzwanzig Uhr muss man leise sein. || من ١٠ بالليل لازم تبقى هادي.
Darf ich mein Fahrrad in den Hof stellen? || ينفع أحط عجلتي في الحوش؟
Du musst nicht kommen. || مش لازم تيجي.
~~~

## سمع: مسموح ولا لأ؟

~~~hear
f: Im Hof dürfen die Kinder spielen, aber sie dürfen dort nicht Fußball spielen.
? Was dürfen die Kinder im Hof nicht? || العيال ممنوع يعملوا إيه في الحوش؟
- spielen
- Fußball spielen *
- laut sein

m: Sie müssen die Treppe nicht putzen. Das macht der Hausmeister.
? Wer putzt die Treppe? || مين بيمسح السلم؟
- der Mann
- die Nachbarin
- der Hausmeister *

f: Am Sonntag ist Ruhezeit. Da darf man keine Waschmaschine benutzen.
? Was ist am Sonntag verboten? || إيه الممنوع يوم الحد؟
- Musik hören
- waschen *
- kochen
~~~

## إملا

~~~dictate
f: Hier darf man nicht rauchen.
Man muss den Müll trennen.
Rauchen ist verboten.
f: Du musst nicht kommen.
~~~

## فيديو: شغل البيت

~~~yt kcixi0Vfg-I Our Daily Chores in Slow German
- **قبل ما تشغّله:** اكتب ٣ حاجات **لازم** تعملها في البيت كل أسبوع بـ [[Ich muss …]].
- **وإنت بتتفرج:** اكتب كل شغلانة بيت بتسمعها (تنضيف، غسيل، زبالة…).
- **بعده:** اكتب ٣ جمل: حاجة لازم، وحاجة مش لازم ([[muss nicht]])، وحاجة ممنوعة في عمارتك ([[darf nicht]]).
~~~`,
          deep: {
            why: R`قواعد العمارة واليافطات أهداف بالاسم في منهج الاندماج (يفهم الـ Hausordnung والتحذيرات). و Goethe Lesen Teil 3 كله يافطات، والجمل اللي عليها مكتوبة بـ [[müssen]] و [[dürfen]] و [[können]]. و ÖSD Lesen بيسأل «Darf man …? Muss man …?». وفي الحياة: مخالفة الـ Ruhezeit أو فصل الزبالة أكتر سبب مشاكل مع الجيران.`,
            how: R`[[müssen]] (لازم) و [[dürfen]] (مسموح) بيتصرّفوا في التاني، والمصدر في الآخر. الممنوع: [[nicht dürfen]] أو [[verboten]]. ومش لازم: [[nicht müssen]]. و [[man]] للقواعد العامة، والفعل معاها زي [[er]].`,
            when: R`[[Darf ich …?]] لما تستأذن. [[Muss ich …?]] لما تسأل هل حاجة إجبارية. [[Man darf nicht …]] لما تشرح قاعدة. و [[Sie müssen nicht …]] لما تطمّن حد إن حاجة مش مطلوبة منه.`,
            mistakes: R`- [[Man muss nicht rauchen]] وإنت قصدك ممنوع: ← [[Man darf nicht rauchen]].
- [[er muss]] → «er musst»: ← [[er muss]] من غير [[-t]].
- [[Ich muss arbeite heute]]: المصدر في الآخر ← [[Ich muss heute arbeiten]].
- [[Man müssen]]: [[man]] زي [[er]] ← [[man muss]].
- [[Der Mann darf nicht rauchen]] وإنت قصدك قاعدة عامة: ← [[Man darf nicht rauchen]].
- [[Darf ich rauchen hier?]]: ← [[Darf ich hier rauchen?]]`
          },
          try: R`اكتب ٦ قواعد لبيتك إنت ([[Bei uns muss man …]]، [[Bei uns darf man nicht …]])، وقولهم بصوت عالي. وبعدين حوّل ٣ منهم ليافطات قصيرة زي اللي في الجدول.`,
          practice: [
            { lvl: 'سريع', t: R`**muss ولا darf؟** (١) Im Kino ___ man nicht telefonieren. (٢) Man ___ den Müll trennen. (٣) Kinder ___ hier spielen. (٤) ___ ich hier parken? (٥) Du ___ nicht kommen, es ist kein Problem. (٦) Ab 22 Uhr ___ man leise sein.`,
              done: R`الستة صح، والفرق بين (١) و (٥) واضح`,
              sol: R`~~~de
Im Kino darf man nicht telefonieren.
Man muss den Müll trennen.
Kinder dürfen hier spielen.
Darf ich hier parken?
Du musst nicht kommen, es ist kein Problem.
Ab 22 Uhr muss man leise sein.
~~~

**ليه:** (١) ممنوع ← [[darf nicht]]. (٢) و (٦) إجباري ← [[muss]]. (٣) مسموح ← [[dürfen]] (جمع). (٤) استئذان ← [[Darf ich]]. (٥) مش مضطر ← [[musst nicht]].` },
            { lvl: 'تطبيق', t: R`**حوّل اليافطة لجملة بـ man:** (١) [[Rauchen verboten]] (٢) [[Bitte leise sein!]] (٣) [[Hunde erlaubt]] (٤) [[Bitte Schuhe ausziehen]] (٥) [[Parken verboten]]`,
              done: R`٥ جمل بـ [[man]]، والممنوع بـ [[darf nicht]]، والمسموح بـ [[darf]]، والمطلوب بـ [[muss]]`,
              sol: R`~~~de
Hier darf man nicht rauchen.
Hier muss man leise sein.
Hier darf man Hunde mitbringen.
Hier muss man die Schuhe ausziehen.
Hier darf man nicht parken.
~~~

**ليه:** [[verboten]] ← [[darf nicht]]، و [[erlaubt]] (مسموح) ← [[darf]]، و [[Bitte …]] ← [[muss]]. و [[ausziehen]] هنا = يقلع (الجزمة)، مش يسيب الشقة: نفس الفعل بمعنيين، والسياق بيفرّق.` },
            { lvl: 'تطبيق', t: R`**يافطات زي الامتحان:**

~~~read
Im Treppenhaus
Liebe Hausbewohner, der Aufzug ist bis Freitag kaputt. Bitte benutzen Sie die Treppe.
? Man kann bis Freitag mit dem Aufzug fahren.
- Richtig
- Falsch *
An der Haustür
Paketannahme: Familie Weber, Erdgeschoss links
? Man kann Pakete im Erdgeschoss abholen.
- Richtig *
- Falsch
Am Fahrradkeller
Nur für Bewohner. Schlüssel beim Hausmeister.
? Den Schlüssel für den Keller bekommt man beim Hausmeister.
- Richtig *
- Falsch
~~~`,
              done: R`التلاتة صح، وعارف لكل واحدة الكلمة اللي بتثبتها`,
              sol: R`**الإجابات:** Falsch، Richtig، Richtig.

**ليه:** (١) [[kaputt]] = بايظ، و [[Bitte benutzen Sie die Treppe]] = استخدموا السلم، فمش ممكن تركب الأسانسير. (٢) [[Paketannahme]] = استلام الطرود، عند عيلة Weber في الأرضي، فتقدر تاخد طردك من هناك. (٣) [[Schlüssel beim Hausmeister]] = المفتاح عند البوّاب. وخلي بالك إن مكان اليافطة ([[Im Treppenhaus]]، [[An der Haustür]]) مكتوب فوقها، زي الامتحان.` },
            { lvl: 'تحدي', t: R`**اكتب Hausordnung لسكن طلبة:** ٦ قواعد: ٢ بـ [[muss]]، و ٢ بـ [[darf nicht]]، وواحدة بـ [[darf]]، وواحدة بـ [[muss nicht]]. وكل قاعدة لازم تبقى منطقية لسكن طلبة.`,
              done: R`٦ قواعد بالتوزيع المطلوب، والفعل المساعد في التاني والمصدر في الآخر، وقاعدة [[muss nicht]] معناها «مش لازم» مش «ممنوع»`,
              sol: R`~~~de
In der Küche muss jeder sein Geschirr spülen.
Jede Woche muss eine Person den Müll rausbringen.
Nach zweiundzwanzig Uhr darf man keine laute Musik hören.
In den Zimmern darf man nicht rauchen.
Gäste dürfen bis Mitternacht bleiben.
Man muss nicht jeden Tag die Küche putzen, aber am Sonntag schon.
~~~

**ليه كده:** [[jeder]] = كل واحد (زي [[man]]، والفعل مفرد). و [[keine laute Musik]]: النفي بـ [[kein]] لأنها حاجة من غير أداة. و [[Gäste dürfen]] جمع. والقاعدة الأخيرة بتقول «مش لازم كل يوم» (براحتك)، وبعدها [[aber am Sonntag schon]] (بس يوم الحد آه). [[das Geschirr]] (المواعين) و [[spülen]] (يغسل) مش في قايمة A1 بس طبيعيين في الموضوع.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Modalverben (müssen، dürfen) و Indefinitpronomen man (ص ١٠٠)، و Lesen Teil 3 (ص ٣٢)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Wohnen، الـ Hausordnung واليافطات (12.3.2، ص ١٥٧)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: dürfen", url: "https://www.dwds.de/wb/d%C3%BCrfen" },
            { t: "DWDS: müssen", url: "https://www.dwds.de/wb/m%C3%BCssen" },
            { t: "DWDS: Hausordnung", url: "https://www.dwds.de/wb/Hausordnung" },
          ],
        },
        {
          cmd: "Prüfung: Lesen Teil 2 und 3",
          title: "تدريب الامتحان: إعلانات ومواقع (a ولا b)، ويافطات (صح ولا غلط)",
          pre: ["dea1/Ist die Wohnung noch frei?", "dea1/Hier darf man nicht rauchen", "dea1/Prüfung: Lesen Teil 1, Hören Teil 1"],
          desc: R`**Lesen Teil 2 في Goethe:** ٥ مواقف، ولكل موقف إعلانين أو موقعين (a و b)، وإنت تختار أنهي واحد فيه المعلومة اللي بتدوّر عليها.

**Lesen Teil 3:** ٥ يافطات أو ورق متعلّق (على باب، في فندق، عند ماكينة تذاكر)، وعلى كل واحدة جملة: صح ولا غلط.

ومع Teil 1 اللي اتدربت عليه في الوحدة اللي فاتت، كده شفت القراية كلها.`,
          teach: R`## Lesen كله في جدول

| | Teil 1 | Teil 2 | Teil 3 |
|---|---|---|---|
| النص | إيميل أو ملاحظة | إعلانات ومواقع | يافطات وورق متعلّق |
| الأسئلة | ٥ صح ولا غلط | ٥ مواقف، كل واحد a ولا b | ٥ صح ولا غلط |
| المهارة | تفاصيل | تلاقي المكان الصح | تفهم يافطة قصيرة |

١٥ سؤال، ١٥ نقطة، حوالي ٢٥ دقيقة، ومن غير قاموس.

## Teil 2: الطريقة

1. **اقرا الموقف كويس:** إنت بتدوّر على **إيه بالظبط**؟ (شقة للأجازة؟ ولا للسكن؟ تشتري ولا تأجّر؟)
2. **دوّر على الكلمة المفتاح** في الإعلانين. الاتنين غالبًا عن نفس الموضوع.
3. **الفخ:** إعلان فيه نفس الكلمات بس مش نفس الحاجة: الموقف عايز **يأجّر** والإعلان **بيبيع** ([[kaufen]] ولا [[mieten]])، أو الموقف عايز **دلوقتي** والإعلان من الشهر الجاي، أو الموقف عايز **مطبخ** والإعلان مكتوب فيه [[keine Küche]].

## تدريب: Teil 2

~~~read Lesen Teil 2
a: www.wohnen-heute.de — Wohnungen kaufen: Häuser und Wohnungen in Köln, gute Preise, Beratung kostenlos.
b: www.zimmer-koeln.de — Zimmer und Wohnungen mieten: möblierte Zimmer ab 350 € im Monat, sofort frei.
? Sie sind Student und suchen ein Zimmer in Köln. Sie möchten es mieten. || إنت طالب وبتدوّر على أوضة في كولونيا للإيجار
- a
- b *
a: Möbelhaus Kraft — Sofas, Betten, Schränke. Lieferung am nächsten Tag. Montag bis Samstag 9–20 Uhr.
b: Flohmarkt im Hof — alte Möbel, Bücher, Kleidung. Nur am Sonntag, 10–16 Uhr.
? Sie brauchen am Sonntag einen Schrank. Er darf alt sein. || محتاج دولاب يوم الحد، وعادي يكون قديم
- a
- b *
a: Umzug Schnell — Wir helfen beim Umzug in Berlin. Auto mit Fahrer ab 49 € pro Stunde.
b: Auto-Vermietung Berlin — Kleine Autos ab 29 € pro Tag. Nur mit Führerschein.
? Sie ziehen um und haben keinen Führerschein. Sie brauchen Hilfe. || بتعزّل ومعاكش رخصة، ومحتاج مساعدة
- a *
- b
~~~

**ليه الإجابات كده:** (١) [[a]] **بيبيع** ([[kaufen]])، و [[b]] بيأجّر أوض ([[mieten]]، [[Zimmer]]). (٢) المحل [[a]] مقفول يوم الحد، و [[b]] سوق حاجات قديمة **يوم الحد بس**. (٣) [[b]] محتاج رخصة ([[Nur mit Führerschein]])، و [[a]] عربية **بسواق** ([[mit Fahrer]]). في كل سؤال الإعلانين عن نفس الموضوع، والفرق في تفصيلة.

## Teil 3: الطريقة

1. **بص على المكان المكتوب فوق اليافطة** ([[An der Tür vom Supermarkt]]، [[Im Hotel]]): بيقولك الموقف.
2. **اقرا الجملة** وحدد هي بتسأل عن إيه: وقت؟ ممنوع ولا مسموح؟ لازم؟
3. **ترجم اليافطة لجملة:** [[Rauchen verboten]] = [[Man darf nicht rauchen]]. وبعدين قارن.

**الفخاخ:** وقت جوه الفترة ولا برّه ([[Mo–Fr 8–18 Uhr]] والجملة عن السبت)، و [[muss]] ولا [[darf]] ولا [[kann]]، ورقم اتغيّر.

## تدريب: Teil 3

~~~read Lesen Teil 3
An der Tür einer Arztpraxis
Sprechzeiten: Mo, Di, Do 8–12 Uhr und 15–18 Uhr. Mittwoch und Freitag nur vormittags.
? Am Freitagnachmittag kann man zum Arzt gehen. || ممكن تروح للدكتور الجمعة بعد الضهر
- Richtig
- Falsch *
Im Supermarkt
Heute alle Getränke 20 % billiger!
? Getränke kosten heute weniger. || المشروبات أرخص النهارده
- Richtig *
- Falsch
Am Schwimmbad
Kinder unter 10 Jahren nur mit Eltern.
? Ein Kind mit acht Jahren darf allein schwimmen. || عيل عنده ٨ سنين مسموح يعوم لوحده
- Richtig
- Falsch *
An der Haustür
Bitte klingeln! Die Tür ist ab 20 Uhr geschlossen.
? Um einundzwanzig Uhr muss man klingeln. || الساعة ٩ بالليل لازم ترن الجرس
- Richtig *
- Falsch
In der Sprachschule
Der Deutschkurs A1 ist heute nicht in Raum 3, sondern in Raum 5.
? Der Kurs ist heute in Raum 3. || الكورس النهارده في أوضة ٣
- Richtig
- Falsch *
~~~

**ليه الإجابات كده:** (١) الجمعة [[nur vormittags]] (الصبح بس). (٢) [[20 % billiger]] = أرخص، يعني [[weniger]]. (٣) تحت ١٠ سنين لازم مع الأهل، و ٨ تحت ١٠. (٤) ٩ بالليل بعد ٨، والباب مقفول، فلازم ترن. (٥) [[nicht in Raum 3, sondern in Raum 5]]: فخ [[sondern]] اللي شفته قبل كده.

## ÖSD و telc: نفس المهارة بشكل تاني

- **ÖSD Lesen Aufgabe 1:** ٥ مواقف و ٦ إعلانات (واحد زيادة): بتوصّل كل موقف بإعلان. نفس طريقة Teil 2.
- **ÖSD Lesen Aufgabe 2:** نصوص قصيرة (زي إعلان شقة)، وعلى كل واحد سؤالين [[Ja]] ولا [[Nein]]، والأسئلة غالبًا [[Kann man …?]] و [[Darf man …?]] و [[Muss man …?]].
- **telc Lesen Teil C:** إعلانات جرنال وتلاقي معلومة محددة.

## اطلب تدريب أكتر بموديل AI

~~~prompt اطلب تدريب Lesen Teil 2 و Teil 3
Du bist Prüfer für das Goethe-Zertifikat A1 (Start Deutsch 1).
Schreib mir 3 Aufgaben für Lesen Teil 2 (Thema Wohnen: Situation + zwei kurze Anzeigen a und b, nur eine passt; die falsche Anzeige ist zum gleichen Thema, aber ein Detail passt nicht) und 3 Aufgaben für Lesen Teil 3 (ein Ort, ein kurzes Schild, eine Aussage Richtig/Falsch).
Nur A1-Wörter. Zeig die Lösungen noch nicht. Ich schreibe meine Antworten, dann korrigierst du sie auf Ägyptisch-Arabisch und zeigst das Wort im Text, das die Antwort beweist.
~~~

موديلات الـ AI ممكن تغلط في الإجابة نفسها، فلو حسّيت إنها غلط، ارجع للنص وقرّر بنفسك.`,
          deep: {
            why: R`Teil 2 و Teil 3 مع بعض ١٠ نقط من ١٥ في القراية. والنصوص فيهم أقصر من Teil 1، بس محتاجة دقة: كلمة واحدة ([[kaufen]] ولا [[mieten]]، [[vormittags]] ولا [[nachmittags]]) بتغيّر الإجابة. وفي الحياة: دي بالظبط المهارة اللي محتاجها قدام أي يافطة أو إعلان في ألمانيا.`,
            how: R`Teil 2: الموقف الأول ← الكلمة المفتاح ← الإعلانين ← التفصيلة اللي بتفرّق. Teil 3: المكان ← الجملة ← ترجم اليافطة لجملة بـ [[man]] + [[müssen]]/[[dürfen]]/[[können]] ← قارن.`,
            when: R`بعد كل وحدة، اقرا يافطات وإعلانات حقيقية على موضوعها (صور من النت لـ [[Hausordnung]]، [[Öffnungszeiten]]، [[Wohnungsanzeigen]]). وقبل الامتحان بأسبوعين حل Übungssatz 01 و 02 بالوقت.`,
            mistakes: R`- تختار الإعلان اللي فيه نفس كلمات الموقف من غير ما تشوف التفصيلة.
- تخلط [[kaufen]] و [[mieten]]، أو [[verkaufen]] و [[vermieten]].
- تنسى إن [[nur]] بتقفل الباقي: [[nur am Sonntag]] = مش أي يوم تاني.
- [[unter 10 Jahren]] = أقل من ١٠، مش «١٠ وأكتر».
- تقرا [[nicht … sondern …]] وتاخد أول رقم.
- متبصّش على المكان المكتوب فوق اليافطة.`
          },
          try: R`حل التلات مواقف والخمس يافطات من غير ما تفتح الترجمة، وبعدين اكتب لكل غلط نوع الفخ. وبعدها حل Lesen Teil 2 و Teil 3 من Übungssatz 01 الرسمي.`,
          practice: [
            { lvl: 'سريع', t: R`**الكلمة اللي بتفرّق:** قول معنى كل زوج: (١) kaufen / mieten (٢) verkaufen / vermieten (٣) vormittags / nachmittags (٤) geöffnet / geschlossen (٥) erlaubt / verboten (٦) mit / ohne`,
              done: R`الستة أزواج صح`,
              sol: R`**المعاني:** (١) يشتري / يأجّر. (٢) يبيع / يأجّر لحد. (٣) الصبح / بعد الضهر. (٤) مفتوح / مقفول. (٥) مسموح / ممنوع. (٦) بـ / من غير.

**ليه دول:** دي الكلمات اللي الامتحان بيبني عليها أغلب الفخاخ في Teil 2 و Teil 3: الإعلانين أو اليافطة والجملة بيبقوا نفس الموضوع، والفرق في كلمة من دول.` },
            { lvl: 'تطبيق', t: R`**Teil 2 زيادة:**

~~~read
a: www.ferienwohnung-ostsee.de — Ferienwohnungen am Meer, 2–6 Personen, mit Küche, ab 60 € pro Nacht.
b: www.hotel-ostsee.de — Hotel am Meer, Einzel- und Doppelzimmer mit Frühstück, ab 80 € pro Nacht.
? Sie machen mit Ihrer Familie (5 Personen) Urlaub und möchten selbst kochen.
- a *
- b
a: Sprachschule Lingua — Deutschkurse am Abend, Montag und Mittwoch, 18–20 Uhr.
b: Volkshochschule — Deutschkurse am Vormittag, Montag bis Freitag, 9–12 Uhr.
? Sie arbeiten von 8 bis 17 Uhr und möchten Deutsch lernen.
- a *
- b
~~~`,
              done: R`الاتنين صح، وعارف التفصيلة اللي فرّقت`,
              sol: R`**الإجابات:** a، a.

**ليه:** (١) عيلة ٥ أفراد وعايزين يطبخوا: [[a]] لحد ٦ أفراد و [[mit Küche]]، و [[b]] فندق بأوض فردي ومزدوج. (٢) بتشتغل الصبح لحد ٥: [[b]] الصبح (وإنت في الشغل)، و [[a]] بالليل ٦–٨.` },
            { lvl: 'تطبيق', t: R`**Teil 3 زيادة:**

~~~read
Am Bahnhof
Toiletten: 0,50 €. Für Kinder kostenlos.
? Kinder müssen für die Toilette nichts bezahlen.
- Richtig *
- Falsch
In der Bibliothek
Bitte nicht essen und trinken. Wasser ist erlaubt.
? In der Bibliothek darf man Wasser trinken.
- Richtig *
- Falsch
Im Park
Hunde bitte an die Leine! Spielplatz: keine Hunde.
? Hunde dürfen auf den Spielplatz.
- Richtig
- Falsch *
~~~`,
              done: R`التلاتة صح`,
              sol: R`**الإجابات:** Richtig، Richtig، Falsch.

**ليه:** (١) [[kostenlos]] = ببلاش، يعني [[nichts bezahlen]]. (٢) الأكل والشرب ممنوع، **بس** [[Wasser ist erlaubt]]: الاستثناء هو الإجابة. (٣) [[Spielplatz: keine Hunde]] = ممنوع الكلاب في الملعب. و [[an die Leine]] = بالسلسلة (هتفهمها من السياق).` },
            { lvl: 'تحدي', t: R`**اعمل سؤال Teil 2:** اكتب موقف وإعلانين (a و b) عن السكن، الاتنين عن نفس الموضوع، وواحد بس مناسب. والإعلان الغلط لازم يفشل في تفصيلة واحدة بس. واكتب الإجابة وسببها.`,
              done: R`موقف واضح، وإعلانين عن نفس الموضوع، والغلط بيفشل في تفصيلة واحدة (وقت، أو سعر، أو mieten/kaufen، أو حاجة ناقصة)، والإجابة بسببها`,
              sol: R`**نسخة نموذجية:**

~~~read
a: Wohnung in Bonn — 3 Zimmer, Küche, Balkon, 850 € warm. Haustiere nicht erlaubt.
b: Wohnung in Bonn — 3 Zimmer, Küche, Garten, 870 € warm. Hunde und Katzen willkommen.
? Sie suchen eine 3-Zimmer-Wohnung in Bonn. Sie haben einen Hund.
- a
- b *
~~~

**الإجابة:** [[b]]. الإعلانين ٣ أوض في بون والسعر قريب، والفرق الوحيد إن [[a]] مكتوب فيه [[Haustiere nicht erlaubt]] (ممنوع الحيوانات). ودي طريقة Goethe بالظبط: الإعلان الغلط مش بعيد عن الموقف، هو قريب جدًا ومعاه تفصيلة واحدة بتمنعه. ولو خليت الإعلان الغلط بعيد خالص (عربيات مثلًا)، السؤال هيبقى سهل زيادة عن اللزوم.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Lesen Teil 2 و Teil 3 (ص ٣٢–٣٤)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Goethe-Zertifikat A1: Übungssatz 01 (امتحان تجريبي رسمي ببلاش)", url: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf" },
            { t: "ÖSD Zertifikat A1: Modellsatz (Lesen Aufgabe 1 و 2)", url: "https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf" },
            { t: "telc Deutsch A1 für Zuwanderer: Übungstest (Lesen Teil C)", url: "https://shop.telc.net/media/catalog/product/file//2/0/20201225_5069-b00-010104_web.pdf" },
          ],
        },
      ],
    },
]);
