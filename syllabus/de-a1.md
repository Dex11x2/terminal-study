# منهج الألماني A1

اتولّد بـ `node tools/syllabus-gen/de-a1.js`. **Goethe بيحدد اللي بيتمتحن** (الامتحان والكلمات والقواعد، نسخة ٢٠٢٢)، والباقي بيكمّل اللي Goethe مبيغطيهوش: امتحانين A1 التانيين (ÖSD و telc)، ومنهج كورسات الاندماج الرسمي في ألمانيا (Rahmencurriculum)، وجمل CEFR. كل بند تحته مرجعه ورقم صفحته.

| الجزء | عدد البنود | المرجع |
|---|---|---|
| الامتحانات | 41 | Goethe و ÖSD و telc |
| المواقف: أهداف A1 في منهج كورسات الاندماج (Rahmencurriculum) | 185 | Rahmencurriculum (BAMF) |
| المهارات: جمل A1 في CEFR | 101 | CEFR Companion volume 2020 |
| الأفعال الكلامية (Sprachhandlungen) | 48 | Goethe |
| الاستراتيجيات | 15 | Goethe |
| المفاهيم العامة (Notionen) | 27 | Goethe |
| المواضيع (Themen) | 48 | Goethe |
| القواعد | 65 | Goethe |
| مجموعات الكلمات | 20 | Goethe |
| الكلمات | 742 (628 أساسية و 59 مشتقة من Goethe، و 55 زيادة من ÖSD و telc) | Goethe، والزيادة من ÖSD و telc |
| **المجموع** | **1292** | |

**فحص الكلمات على Wiktionary:** 732 من 742 اتلاقوا، و 706 ليهم IPA، و 731 ليهم تسجيل بصوت حقيقي على Wikimedia Commons. أداة وجمع كل أسماء Goethe (331) متطابقين مع Wiktionary (`node tools/syllabus-gen/de-wikt.js`)، وأداة وجمع الأسماء الزيادة جايين منه. اللي ملهوش مدخل (بيتراجع بالإيد): auf sein، aus sein، best-، jed-، sich kümmern، auf sein، weg sein، zu sein، was für ein، der Antwortbogen, die Antwortbögen.

**مستبعد بسبب:**

- **Deutsch-Test für Zuwanderer**: امتحان A2 و B1، مش A1: بيدخل في منهج A2.
- **Signing competences (14 scales)**: مقاييس لغة الإشارة: الكورس للغة المنطوقة والمكتوبة.
- **جمل Pre-A1 في CEFR:** مش بنود لوحدها، لأن كل واحدة خطوة أسهل من جملة A1 في نفس المقياس، فبتتغطى معاها.
- **telc «Start Deutsch 1»:** نفس امتحان Goethe A1 (اتعمل من الجهتين سوا)، فبنوده هي بنود Goethe.

**المطلوب منك قبل أي كتابة:** تراجع القايمة دي. لو فيه موقف أو مهارة مش عايزها في الكورس، أو حاجة ناقصة، قول، وهتتعلّم «مستبعد» بالسبب أو تتضاف.

## الامتحانات

### Goethe-Zertifikat A1

- **Hören Teil 1** (ص 27): كلام قصير بين اتنين في الحياة اليومية، بيتسمع مرتين، واختيار من ٣
- **Hören Teil 2** (ص 28): إعلانات في الأماكن العامة (محطة، مطار، سوبرماركت)، بتتسمع مرة واحدة، صح ولا غلط
- **Hören Teil 3** (ص 29): رسايل على الأنسرماشين، بتتسمع مرتين، واختيار من ٣
- **Lesen Teil 1** (ص 32): نصين قصيرين (ملاحظة، إيميل، رسالة)، صح ولا غلط
- **Lesen Teil 2** (ص 33): إعلانات صغيرة: ١٠ إعلانات و ٥ مواقف، تختار الإعلان المناسب
- **Lesen Teil 3** (ص 34): يافطات ولافتات قصيرة، صح ولا غلط
- **Schreiben Teil 1** (ص 37): تكمّل ٥ خانات ناقصة في استمارة (تسجيل، طلب…) من معلومات نص
- **Schreiben Teil 2** (ص 38): رسالة قصيرة (اعتذار، طلب معلومة، دعوة) فيها ٣ نقط مطلوبة، حوالي ٣٠ كلمة
- **Sprechen Teil 1** (ص 44): تعرّف نفسك، وتتهجّى كلمة، وتقول رقم
- **Sprechen Teil 2** (ص 44): تسأل وتجاوب عن موضوع من كروت كلمات
- **Sprechen Teil 3** (ص 44): تطلب حاجة وترد على طلب من كروت صور
- **Bewertung Schreiben** (ص 42): معايير تصحيح الكتابة: النقط المطلوبة، ومناسبة النص لنوعه (التحية والختام)، وأمثلة إجابات بدرجاتها
- **Bewertung Sprechen** (ص 45): معايير تصحيح الكلام في الأجزاء التلاتة (٣ و ٦ و ٦ نقط)
- **Bestehen** (ص 9): الامتحان ١٠٠ نقطة: سمع وقراية وكتابة وكلام ٢٥ لكل واحد. النجاح من ٦٠ نقطة

### ÖSD Zertifikat A1

- **Lesen Aufgabe 1** (ص 21): ٥ مواقف و ٦ إعلانات: تختار الإعلان المناسب لكل موقف (واحد زيادة)
- **Lesen Aufgabe 2** (ص 21): ٣ نصوص قصيرة، وعلى كل واحد سؤالين: Ja ولا Nein
- **Lesen Aufgabe 3** (ص 21): ٥ نصوص و ٦ صور: توصّل كل نص بصورته
- **Hören Aufgabe 1** (ص 22): ٥ نصوص مسموعة و ٦ صور، مرة واحدة: توصّل كل نص بصورته
- **Hören Aufgabe 2** (ص 22): رسالة مسجّلة (أنسرماشين أو خدمة تليفون) بتتسمع مرتين: تكتب ٥ معلومات ناقصة وإنت بتسمع (أرقام، مواعيد، أسامي متهجّية)
- **Hören Aufgabe 3** (ص 22): ٥ مقابلات قصيرة، مرة واحدة: تختار الإجابة الصح
- **Schreiben Aufgabe 1** (ص 24): تملا استمارة من معلومات جاهزة (١٠ خانات: اختيار وكتابة)
- **Schreiben Aufgabe 2** (ص 24): ترد على إيميل شخصي فيه ٣ أسئلة، حوالي ٣٠ كلمة
- **Sprechen Aufgabe 1** (ص 24): تعرّف نفسك: تختار ٤ مواضيع من ٦ وتتكلم عنهم
- **Sprechen Aufgabe 2** (ص 24): تختار صورة من ٣ (موقف يومي) وتوصفها بمساعدة ٤ أسئلة
- **Sprechen Aufgabe 3** (ص 24): حوار مع الممتحن (رول بلاي) على نفس الصورة: تبادل الكلام، و Du ولا Sie
- **Bestehen** (ص 33): جزئين: المكتوب (قراية وسمع وكتابة) ٧٥ نقطة والنجاح من ٣٨، بحد أدنى ٦ في القراية و ٦ في السمع و ٤ في الإيميل؛ والكلام ٢٥ نقطة والنجاح من ١٢، وقبله ١٠ دقايق تحضير
- **Plurizentrik** (ص 22): النصوص والأصوات من النمسا وألمانيا وسويسرا: كلمات زي Jänner و Grüß Gott لازم تتعرف

### telc Deutsch A1 für Zuwanderer

- **Sprachbausteine** (ص 5): ١٠ أسئلة اختيار على الكلمات والقواعد: تختار الكلمة المناسبة لكل فراغ في نصين
- **Hören Teil A** (ص 5): ٤ أسئلة صح ولا غلط: تلقط معلومة محددة
- **Hören Teil B** (ص 5): ٥ أسئلة اختيار على التفاصيل، خصوصًا الأرقام والحروف
- **Hören und antworten Teil A** (ص 5): تسمع ٣ كلامات قصيرة وتختار الرد المناسب لكل واحد
- **Hören und antworten Teil B** (ص 5): نفس الفكرة مع ٤ كلامات
- **Lesen Teil A** (ص 5): ٣ نصوص توصّلها بعناوينها (الفكرة العامة)
- **Lesen Teil B** (ص 5): نص و ٣ جمل صح ولا غلط (التفاصيل)
- **Lesen Teil C** (ص 5): ٣ أسئلة اختيار: تلاقي معلومة محددة (إعلانات جرنال)
- **Schreiben Teil A** (ص 5): تملا استمارة لحد تاني من معلومات نص
- **Schreiben Teil B** (ص 5): رسالة قصيرة (إيميل) فيها ٣ نقط، حوالي ٣٠ كلمة
- **Sprechen Teil A** (ص 25): تعرّف نفسك من ورقة كلمات، وتتهجّى، وتقول أرقام (٣ دقايق)
- **Sprechen Teil B** (ص 25): تسأل وتجاوب عن موضوعين يوميين بالكروت (٤ دقايق)
- **Sprechen Teil C** (ص 25): تطلب وتقترح وتعرض وتنصح، وترد على ده (٤ دقايق)، ومفيش وقت تحضير
- **Bestehen** (ص 27): الامتحان ١٠٠ نقطة والنجاح من ٦٠: كلمات وقواعد ١٥، وسمع ٣١، وقراية ٢٤، وكتابة ١٠، وكلام ٢٠


## المواقف: أهداف A1 في منهج كورسات الاندماج (Rahmencurriculum)

185 هدف A1 من 654 هدف في المنهج كله (A1 و A2 و B1). الأرقام دي متطابقة مع جدول الإحصائيات في آخر الـ PDF (ص ١٦٦–١٧١). مجال «Aus- und Weiterbildung» مفيهوش أهداف A1 (بيبدأ من A2). العلامة 🛈 معناها إن الهدف ليه ملاحظة «Fokus Landeskunde» (معلومة عن الحياة في ألمانيا) في المرجع.

### A Umgang mit der Migrationssituation

- يتكلم ببساطة عن نفسه وحياته في بلده (العيلة، الشغل اللي اتعلّمه) _(A 1.1، sprechen، ص 31)_
- يرفض بأدب يتكلم عن حاجات حصلت له في بلده أو في الطريق 🛈 _(A 1.1، am Gespräch teilnehmen، ص 31)_
- يسأل حد يعرفه أو مكتب استشارة: التصرف ده مناسب هنا؟ (المواعيد، Du ولا Sie) _(A 2.1، am Gespräch teilnehmen، ص 32)_
- يجاوب ببساطة: الحاجة دي عادية في بلدي ولا لأ _(A 2.1، am Gespräch teilnehmen، ص 32)_
- يجاوب على أسئلة بسيطة عن اللي يقدر يعمله _(A 3.1، am Gespräch teilnehmen، ص 34)_
- يقول إنه مش عارف الحاجة اسمها إيه بالألماني _(A 4.1، am Gespräch teilnehmen، ص 35)_
- يسأل تاني لما ميفهمش 🛈 _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يطلب إن الكلام يتعاد _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يطلب من اللي بيكلمه (موظف، زميل، دكتور، حتى في التليفون) يقولها بكلام تاني _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يطلب من اللي بيكلمه يتكلم أبطأ _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يطلب مساعدة عشان يقول طلبه صح _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يسأل لو الورق ده (جواب المدرسة، الطلبات) موجود بلغته أو بلغة يعرفها _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يطلب من الموظف يساعده يملا استمارة _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يقول للموظف إن فيه حد هيترجم له (حد من العيلة أو مترجم) 🛈 _(A 4.2، am Gespräch teilnehmen، ص 36)_
- يقول بيتكلم لغات إيه _(A 5.2، sprechen، ص 37)_

### B Realisierung von Gefühlen, Haltungen und Meinungen

- يقول الحاجة عجبته ولا لأ _(B 1.5، am Gespräch teilnehmen، ص 42)_
- يقول إن السؤال يهمه أو مش فارق معاه _(B 2.1، am Gespräch teilnehmen، ص 43)_
- يقول موافق أو مش موافق _(B 2.2، am Gespräch teilnehmen، ص 43)_
- يقول بيحب إيه ومبيحبش إيه _(B 2.3، am Gespräch teilnehmen، ص 43)_

### C Umgang mit Dissens und Konflikten

- يقول إن رأيه مختلف _(C 1.1، am Gespräch teilnehmen، ص 49)_
- وقت الخلاف (مع زميل أو مدرس) يسأل: أنا فهمت صح؟ _(C 1.2، am Gespräch teilnehmen، ص 49)_
- يعترض بكلام بسيط ومناسب (على كرسي محجوز، أو اتهام، أو طلب) 🛈 _(C 1.4، am Gespräch teilnehmen، ص 50)_
- في مشكلة، يوافق أو يرفض حل اتعرض عليه 🛈 _(C 2.4، am Gespräch teilnehmen، ص 51)_

### D Gestaltung sozialer Kontakte

- يسلّم بالطريقة المناسبة 🛈 _(D 1.1، am Gespräch teilnehmen، ص 55)_
- يرد السلام 🛈 _(D 1.1، am Gespräch teilnehmen، ص 55)_
- يعرّف نفسه 🛈 _(D 1.2، am Gespräch teilnehmen، ص 55)_
- يعرّف حد تاني _(D 1.2، am Gespräch teilnehmen، ص 55)_
- يرد بأدب لما حد يتعرّف عليه 🛈 _(D 1.2، am Gespräch teilnehmen، ص 55)_
- يطلب من حد يعرّف نفسه _(D 1.2، am Gespräch teilnehmen، ص 55)_
- يفتح كلام مع حد ويطلب أو يسأل عن حاجة يومية _(D 1.3، am Gespräch teilnehmen، ص 56)_
- يعرض على زميل أو ضيف يقولوا لبعض Du 🛈 _(D 1.4، am Gespräch teilnehmen، ص 56)_
- يرد لما حد يعرض عليه Du _(D 1.4، am Gespräch teilnehmen، ص 56)_
- يطلب من موظف حكومي يكلمه بالطريقة المناسبة _(D 1.4، am Gespräch teilnehmen، ص 56)_
- ينهي الكلام ببساطة وبأدب _(D 1.5، am Gespräch teilnehmen، ص 56)_
- يفهم كلام الوداع _(D 1.6، am Gespräch teilnehmen، ص 57)_
- يودّع بالطريقة المناسبة 🛈 _(D 1.6، am Gespräch teilnehmen، ص 57)_
- يسأل حد عامل إيه (معارف، مدرس ولاده) _(D 2.1، am Gespräch teilnehmen، ص 57)_
- يرد على «عامل إيه؟» 🛈 _(D 2.1، am Gespräch teilnehmen، ص 57)_
- يسأل زميل أو صاحب: فاضي نعمل حاجة سوا؟ _(D 2.5، am Gespräch teilnehmen، ص 58)_
- يقول فاضي في الميعاد ده ولا لأ _(D 2.5، am Gespräch teilnehmen، ص 58)_
- يعتذر عن حاجة مشتركة لأنه مش فاضي _(D 2.6، am Gespräch teilnehmen، ص 59)_
- يجامل أو يمدح بكلمتين _(D 2.7، am Gespräch teilnehmen، ص 59)_
- يشكر على المجاملة 🛈 _(D 2.7، am Gespräch teilnehmen، ص 59)_
- يعتذر بكلام بسيط _(D 2.8، am Gespräch teilnehmen، ص 59)_
- يقبل اعتذار حد _(D 2.8، am Gespräch teilnehmen، ص 59)_
- يهنّي حد (عيد ميلاد، جواز…) _(D 2.11، am Gespräch teilnehmen، ص 60)_
- يهنّي في إيميل أو كارت _(D 2.11، schreiben، ص 60)_
- يشكر على التهنئة _(D 2.11، am Gespräch teilnehmen، ص 60)_
- يتمنى لحد حاجة حلوة (سلامتك، أجازة سعيدة) 🛈 _(D 2.12، am Gespräch teilnehmen، ص 60)_
- يشكر على الأمنيات ويردها _(D 2.12، am Gespräch teilnehmen، ص 60)_

### E Umgang mit dem eigenen Sprachenlernen

- يسأل: الكلمة أو الجملة دي صح؟ 🛈 _(E 1.1، am Gespräch teilnehmen، ص 63)_
- يطلب من اللي بيكلمه يصحّح له _(E 1.1، am Gespräch teilnehmen، ص 63)_
- يطلب ترشيح مواد تعلّم زيادة 🛈 _(E 1.1، am Gespräch teilnehmen، ص 63)_
- يسأل فيه كورس ألماني قريب؟ 🛈 _(E 1.1، am Gespräch teilnehmen، ص 63)_
- يعمل قاموس شخصي (كروت) 🛈 _(E 2.1، schreiben، ص 65)_
- يقسّم الكلمات على مواضيع 🛈 _(E 2.1، schreiben، ص 65)_
- يستخدم طرق للحفظ 🛈 _(E 2.1، schreiben، ص 65)_
- يكتب الكلمات بإيده عشان تتحفظ _(E 2.1، schreiben، ص 65)_
- يطلّع من النصوص الكلمات المهمة له ويضيفها لقاموسه 🛈 _(E 2.1، schreiben، ص 65)_
- يتمرّن على السمع لوحده بتسجيلات الكورس 🛈 _(E 2.2، hören، ص 66)_
- يمسك في الكلمات الدولية والأرقام والأسامي كـ«جزر» يفهم منها 🛈 _(E 2.2، hören، ص 66)_
- يتوقع الكلام هيبقى عن إيه قبل ما يسمع (من الوقت ومين بيتكلم) ويستخدم ده في الفهم _(E 2.2، hören، ص 66)_
- يستخدم الترجمة اللي على الشاشة في الأفلام والفيديو للتمرين 🛈 _(E 2.3، sehen und hören، ص 67)_
- يستخدم الصورة في التلفزيون عشان يفهم 🛈 _(E 2.3، sehen und hören، ص 67)_
- يفهم الفكرة العامة من الفيديو ويعدّي الكلمات اللي مش فاهمها _(E 2.3، sehen und hören، ص 67)_
- يتمرّن على القراية بنصوص الحياة (إعلانات، جرايد، كتالوجات) 🛈 _(E 2.4، lesen، ص 68)_
- يخمّن معنى الكلمة من الأسامي والتواريخ والكلمات الدولية والكلمات الشبه الإنجليزي وقواعد تكوين الكلمة 🛈 _(E 2.4، lesen، ص 68)_
- يستخدم شكل النص (نوعه، العناوين، التنسيق) عشان يفهم _(E 2.4، lesen، ص 68)_
- يلاحظ الكلمات اللي بتربط النص (er، dort، dann) ويمشي وراها 🛈 _(E 2.4، lesen، ص 68)_
- يحفظ جمل وتعبيرات جاهزة عشان يتكلم أسلس 🛈 _(E 2.5، sprechen، ص 69)_
- يعمل كروت تعبيرات (حتى ديجيتال) 🛈 _(E 2.5، sprechen، ص 69)_
- يعوّض الكلمة الناقصة (كلمة من لغة تانية، أو يوصفها) 🛈 _(E 2.5، sprechen، ص 69)_
- يعوّض من غير كلام (إشارة، رسم، يشاور) _(E 2.5، sprechen، ص 69)_
- ينقل نصوص بإيده عشان كتابته تتحسن 🛈 _(E 2.6، schreiben، ص 70)_
- يستخدم المدقق الإملائي وهو بيكتب 🛈 _(E 2.6، schreiben، ص 70)_
- يربط مصطلحات القواعد بلغته أو بلغة تانية يعرفها 🛈 _(E 2.7، —، ص 71)_
- يرسم القاعدة أو يفهمها من رسم _(E 2.7، —، ص 71)_
- يكتشف القاعدة بنفسه (يعلّم، يجمع، يرتّب) ويصيغها 🛈 _(E 2.7، —، ص 71)_
- يستخدم جمل حفظ (Merkverse) للقواعد 🛈 _(E 2.7، —، ص 71)_
- يستخدم الحركة واللمس عشان القاعدة تثبت _(E 2.7، —، ص 71)_
- يعمل تمارين قواعد لزمايله ويساعدهم يحلّوها _(E 2.7، —، ص 71)_

### 1 Ämter und Behörden

- يطلّع معلومات عن جهة حكومية من الإنترنت أو دليل التليفون _(1.1.1، lesen، ص 77)_
- يملا بياناته في استمارة (زي استمارة تسجيل السكن) 🛈 _(1.2.2، schreiben، ص 77)_
- يفهم اليافطات اللي بتوجّهه جوه المبنى 🛈 _(1.3.1، lesen، ص 78)_
- يسأل في شباك الاستعلامات 🛈 _(1.3.1، am Gespräch teilnehmen، ص 78)_
- يجاوب على أسئلة الموظف البسيطة _(1.3.1، am Gespräch teilnehmen، ص 78)_
- يطلب مساعدة من الموظف 🛈 _(1.3.2، am Gespräch teilnehmen، ص 78)_
- يعرّف بنفسه في مكتب استشارة 🛈 _(1.3.4، sprechen، ص 79)_

### 2 Arbeit

- يسأل زمايله عن الإجازات وتوزيع الشغل ومين مسؤول عن إيه 🛈 _(2.1.1، am Gespräch teilnehmen، ص 83)_
- يفهم المطلوب في شغل بسيط متعود عليه _(2.1.2، hören، ص 84)_
- يقول إنه فهم المطلوب وهيعمله _(2.1.2، am Gespräch teilnehmen، ص 84)_
- يسأل تاني ويطلب إعادة لما ميفهمش _(2.1.2، am Gespräch teilnehmen، ص 84)_
- يبلّغ في التليفون إنه عيان 🛈 _(2.1.3، sprechen، ص 85)_
- يبلّغ كتابة إنه عيان 🛈 _(2.1.3، schreiben، ص 85)_
- يفهم تحذير بالكلام (كهربا، مكنة بايظة) _(2.1.3، hören، ص 85)_
- يفهم معلومة مكتوبة بسيطة (عِدّة، خامات، كميات) _(2.1.3، lesen، ص 85)_
- يحذّر زمايله من خطر بكلمتين _(2.1.3، sprechen، ص 85)_
- يفهم أهم حاجة في تعليمات الأمان في الشغل لو فيها صور 🛈 _(2.1.4، lesen، ص 86)_
- يتفق مع مديره على تفاصيل جدول الشغل 🛈 _(2.1.5، am Gespräch teilnehmen، ص 86)_
- يقترح ميعاد ويرد على ميعاد مقترح _(2.1.5، am Gespräch teilnehmen، ص 86)_
- يملا checklist أو استمارة متابعة بسيطة _(2.2.2، schreiben، ص 89)_
- يفهم جداول الشغل (الأسبوع، الورديات) _(2.2.2، lesen، ص 89)_
- يجاوب، حتى في التليفون، عن مكان أو ميعاد أو مين المسؤول _(2.3.1، am Gespräch teilnehmen، ص 90)_

### 3 Arbeitssuche

- يقول إيه اللي بيعمله كويس أو بيحب يعمله _(3.1.3، am Gespräch teilnehmen، ص 96)_
- يدوّر، حتى على الإنترنت، على أماكن استشارة الشغل _(3.2.1، lesen، ص 97)_
- يفهم أهم حاجة في إعلان وظيفة (جرنال، إنترنت، لوحة إعلانات) 🛈 _(3.4.1، lesen، ص 99)_
- يكتب رسالة بسيطة جدًا فيها معلومات مهمة عن نفسه _(3.4.2، schreiben، ص 99)_

### 5 Banken und Versicherungen

- يطلب من معارفه ترشيح بنك أو تأمين 🛈 _(5.1.1، am Gespräch teilnehmen، ص 111)_
- يطلّع معلومات عن البنوك والتأمين من الإنترنت أو دليل التليفون _(5.1.1، lesen، ص 111)_
- يفهم أهم حاجة في يافطات البنك _(5.2.1، lesen، ص 111)_
- يفهم خطوات مكنة الـ ATM أو جهاز الخدمة الذاتية 🛈 _(5.2.1، lesen، ص 111)_
- يدخّل البيانات المطلوبة في المكنة _(5.2.1، schreiben، ص 111)_
- يفهم أهم حاجة في كشف الحساب _(5.2.2، lesen، ص 112)_
- يبلّغ البنك كتابة بمعلومة مهمة (زي تغيير العنوان) _(5.2.2، schreiben، ص 112)_
- يملا استمارات الدفع المهمة (تحويل) 🛈 _(5.2.3، schreiben، ص 112)_
- يطلب من موظف البنك أو التأمين ورق معلومات _(5.4.1، am Gespräch teilnehmen، ص 113)_
- يطلب خدمة في شباك البنك أو من مندوب التأمين 🛈 _(5.4.2، am Gespräch teilnehmen، ص 113)_

### 6 Betreuung und Ausbildung der Kinder

- يسأل الأهالي أو المعارف عن حضانات وروضات 🛈 _(6.1.1، am Gespräch teilnehmen، ص 117)_
- يطلّع عناوين وأرقام تليفونات من الدليل أو الإنترنت 🛈 _(6.1.1، lesen، ص 117)_
- يملا الجزء اللي بيرجع من جوابات المدرسة 🛈 _(6.2.2، schreiben، ص 118)_
- يبلّغ بالكلام بحاجة بسيطة (زي إن ابنه عيان) 🛈 _(6.2.2، sprechen، ص 118)_
- يملا ورقة غياب أو مرض الطفل للمدرسة _(6.2.3، schreiben، ص 118)_
- يحكي ببساطة عن دراسة ابنه في بلده _(6.3.1، sprechen، ص 119)_
- يجاوب على أسئلة بسيطة في مقابلة استشارة عن ابنه 🛈 _(6.3.4، am Gespräch teilnehmen، ص 120)_

### 7 Einkaufen

- يسأل معارفه أو جيرانه عن منتج بيدوّر عليه (الماركة، المحل، السعر) 🛈 _(7.1.1، am Gespräch teilnehmen، ص 125)_
- يطلّع معلومات من إعلانات الجرايد والكتالوجات واليافطات 🛈 _(7.1.1، lesen، ص 125)_
- يفهم أهم حاجة على المنتج (تاريخ الصلاحية، الحفظ، المكونات) 🛈 _(7.1.1، lesen، ص 125)_
- يسأل ويجاوب عن منتج: السعر، المقاس، الرف، القسم _(7.2.1، am Gespräch teilnehmen، ص 125)_
- يقول الأرقام بوضوح (يكرر السعر، يقول مقاسه) _(7.2.1، sprechen، ص 125)_
- يسأل لو فيه خصم (مثلًا على حاجة فيها عيب) 🛈 _(7.2.1، am Gespräch teilnehmen، ص 125)_
- يطلب أوردر، حتى أونلاين، ويملا البيانات (المقاس، العدد، العنوان) 🛈 _(7.2.2، schreiben، ص 126)_

### 8 Gesundheit

- يسأل معارفه أو مكتب استشارة عن نظام العلاج (دكتور العيلة، التأمين) _(8.1.1، am Gespräch teilnehmen، ص 131)_
- يسأل عن ترشيحات وعناوين دكاترة _(8.1.1، am Gespräch teilnehmen، ص 131)_
- يطلّع معلومات العلاج المهمة من الإنترنت أو الدليل 🛈 _(8.1.1، lesen، ص 131)_
- يدّي بياناته في استقبال الدكتور أو المستشفى _(8.2.2، am Gespräch teilnehmen، ص 132)_
- يقول حاسس بإيه وفين بيوجعه (حتى بالإشارة) 🛈 _(8.2.2، am Gespräch teilnehmen، ص 132)_
- يفهم المعلومات المهمة في كلام الدكتور أو الصيدلي _(8.2.2، hören، ص 132)_
- يسمّي أجزاء الجسم للدكتور _(8.2.2، sprechen، ص 132)_
- يفهم أهم حاجة في النشرة اللي جوه علبة الدوا 🛈 _(8.2.4، lesen، ص 132)_
- يفهم تعليمات الدكتور أو الصيدلي البسيطة _(8.2.4، hören، ص 132)_
- يملا بياناته في استمارة عند الدكتور 🛈 _(8.2.5، schreiben، ص 133)_
- يطلب الإسعاف في التليفون ويقول أهم المعلومات (فين، إيه اللي حصل) 🛈 _(8.2.6، am Gespräch teilnehmen، ص 133)_
- يسأل معارف أو زمايل أو جيران عاملين إيه _(8.3.1، am Gespräch teilnehmen، ص 133)_
- يرد على «عامل إيه؟» _(8.3.1، am Gespräch teilnehmen، ص 133)_

### 9 Mediennutzung

- يطلّع المهم من جدول برامج التلفزيون _(9.1.1، lesen، ص 139)_
- يسأل معارفه يلاقي معلومات فين 🛈 _(9.1.1، am Gespräch teilnehmen، ص 139)_
- يفهم إعلانات الحفلات والفعاليات _(9.1.1، lesen، ص 139)_
- يطلّع معلومات من الإعلانات المطبوعة 🛈 _(9.2.1، lesen، ص 139)_
- يكتب كلمات بحث على الإنترنت عن حاجات تهمه _(9.3.1، schreiben، ص 140)_
- يفهم تعليمات بسيطة على المواقع _(9.3.1، lesen، ص 140)_
- يفهم قوايم الموبايل البسيطة ويستخدمها _(9.3.1، lesen، ص 140)_

### 10 Mobilität

- يسأل معارفه عن طرق السفر _(10.1.1، am Gespräch teilnehmen، ص 143)_
- يفهم يافطات المحطة والمطار والشارع _(10.1.1، lesen، ص 143)_
- يطلّع من جدول المواعيد اللي يهمه 🛈 _(10.1.1، lesen، ص 143)_
- يسأل أو يجاوب في الشباك أو التليفون عن معلومات معظمها أرقام (الميعاد، الرصيف، السعر) _(10.2.1، am Gespräch teilnehmen، ص 144)_
- يفهم توجيهات موظف الشباك لما يكون معاها إشارة _(10.2.3، am Gespräch teilnehmen، ص 145)_
- يفهم تعليمات مكنة التذاكر لو فيها صور 🛈 _(10.2.4، lesen، ص 145)_
- يسأل اللي جنبه: الكرسي ده فاضي؟ ويرد على نفس السؤال 🛈 _(10.3.1، am Gespräch teilnehmen، ص 146)_
- يسأل عن الطريق ويفهم أهم حاجة في الوصف _(10.3.1، am Gespräch teilnehmen، ص 146)_

### 11 Unterricht

- يفهم معلومات تنظيمية بسيطة عن الكورس (حتى في التليفون) _(11.1.1، am Gespräch teilnehmen، ص 149)_
- يفهم إعلانات وورق الكورس والامتحانات _(11.1.1، lesen، ص 149)_
- يفهم تعليمات المدرس الشفوية _(11.1.2، hören، ص 149)_
- يفهم التعليمات المكتوبة في ورق التمارين والكتب والامتحان _(11.1.2، lesen، ص 149)_
- يفهم شرح المدرس البسيط _(11.1.3، hören، ص 149)_
- يسأل لما ميفهمش حاجة في الحصة أو الواجب _(11.1.3، am Gespräch teilnehmen، ص 149)_
- يطلب إن الكلام يتعاد _(11.1.3، am Gespräch teilnehmen، ص 149)_
- يبلّغ إنه عيان (حتى في التليفون) 🛈 _(11.1.4، am Gespräch teilnehmen، ص 150)_
- يعتذر عن التأخير أو المشي بدري ويقول السبب 🛈 _(11.1.4، am Gespräch teilnehmen، ص 150)_
- يسأل بعد غيابه: أخدتوا إيه والواجب إيه 🛈 _(11.2.1، am Gespräch teilnehmen، ص 151)_
- يقول لزميل غاب أخدنا إيه والواجب إيه _(11.2.1، am Gespräch teilnehmen، ص 151)_
- يتفق مع زمايله يذاكروا سوا _(11.2.2، am Gespräch teilnehmen، ص 151)_
- يسلّم على الممتحن ويعرّف نفسه صح 🛈 _(11.3.1، am Gespräch teilnehmen، ص 151)_
- يفهم تعليمات الممتحن ويتصرف _(11.3.1، am Gespräch teilnehmen، ص 151)_
- يطلب من الممتحن يعيد السؤال أو يشرحه _(11.3.1، am Gespräch teilnehmen، ص 151)_

### 12 Wohnen

- يسأل معارفه إزاي يدوّر على شقة _(12.1.1، am Gespräch teilnehmen، ص 155)_
- يسأل عن سكن رخيص أو مساعدة في الإيجار 🛈 _(12.1.1، am Gespräch teilnehmen، ص 155)_
- يفهم رسايل بسيطة من إدارة العمارة أو صاحب الشقة (حتى في التليفون) _(12.3.1، am Gespräch teilnehmen، ص 157)_
- يفهم المبلغ المطلوب في فاتورة 🛈 _(12.3.1، lesen، ص 157)_
- يفهم أهم حاجة في قواعد العمارة (Hausordnung) 🛈 _(12.3.2، lesen، ص 157)_
- يفهم التحذيرات واليافطات في العمارة _(12.3.2، lesen، ص 157)_
- يسأل عن الاتفاقات اللي بين السكان (مين بيمسح السلم مثلًا) 🛈 _(12.3.2، am Gespräch teilnehmen، ص 157)_
- يملا أهم بياناته في استمارة 🛈 _(12.3.3، schreiben، ص 158)_
- يعرّف نفسه لجيرانه كساكن جديد _(12.4.1، am Gespräch teilnehmen، ص 158)_
- يفهم رسالة جار على لوحة الإعلانات _(12.4.2، lesen، ص 158)_
- يطلب مساعدة من الجيران _(12.4.3، am Gespräch teilnehmen، ص 158)_


## المهارات: جمل A1 في CEFR

101 جملة A1 في 62 مقياس (رقم كل جملة هو رقمها في ملف الـ Excel الرسمي). المقاييس اللي مفيهاش جملة A1 أصلًا (زي التقارير والمقالات والاجتماعات الرسمية) مش هنا.

### Reception

- **Overall oral comprehension:** يتابع كلام بطيء جدًا ومنطوق بعناية، وفيه وقفات طويلة عشان يلحق يفهم _(12)_؛ يلقط معلومة محددة (مكان، ميعاد) في موضوع يومي لو الكلام بطيء وواضح _(13)_
- **Understanding conversation between other people:** يفهم شوية تعبيرات لما ناس بيتكلموا عنه وعن عيلته وهواياته، لو الكلام بطيء _(29)_؛ يفهم كلمات وجمل قصيرة في حوار بسيط (زبون وبياع) لو الكلام بطيء جدًا _(30)_
- **Understanding as a member of a live audience:** يفهم معلومة بسيطة جدًا بتتشرح في موقف متوقع (جولة سياحية) لو الكلام بطيء وفيه وقفات _(49)_
- **Understanding announcements and instructions:** يفهم تعليمات موجهة له ببطء وينفّذ توجيهات قصيرة _(64)_؛ يفهم لما حد يقول له ببطء الحاجة فين، لو هي قريبة _(65)_؛ يفهم أرقام وأسعار ومواعيد في إعلان بالميكروفون (محطة، محل) _(66)_
- **Understanding audio (or signed) media and recordings:** يلقط معلومة محددة (مكان، ميعاد) من تسجيل قصير بطيء _(80)_
- **Watching TV, film and video:** يعرف كلمات مألوفة ويحدد موضوع عناوين الأخبار والمنتجات في الإعلانات بمساعدة الصورة _(95)_
- **Overall reading comprehension:** يفهم نصوص قصيرة جدًا جملة جملة، ويرجع يقرا تاني لو احتاج _(105)_
- **Reading correspondence:** يفهم رسايل قصيرة بسيطة على كارت بوستال _(121)_؛ يفهم رسايل قصيرة على السوشيال أو الإيميل (نعمل إيه، فين، إمتى) _(122)_
- **Reading for orientation:** يعرف الأسامي والكلمات والجمل البسيطة على يافطات الحياة اليومية _(141)_؛ يفهم دليل الأدوار في المول (القسم في أنهي دور) والاتجاهات (الأسانسير فين) _(142)_؛ يفهم معلومات الفندق الأساسية (مواعيد الأكل) _(143)_؛ يلاقي المعلومة المهمة في إعلان أو برنامج حفلة أو بروشور (إيه، بكام، إمتى، فين) _(144)_
- **Reading for information and argument:** ياخد فكرة عن محتوى نص معلومات بسيط، خصوصًا لو فيه صور _(170)_؛ يفهم نصوص قصيرة عن حاجة تهمه (رياضة، مزيكا، سفر) بلغة بسيطة جدًا ومعاها صور _(171)_
- **Reading instructions:** يمشي ورا توجيهات مكتوبة قصيرة (من مكان لمكان) _(186)_
- **Reading as a leisure activity:** يفهم قصص قصيرة مصوّرة عن أنشطة يومية _(204)_؛ يفهم الفكرة العامة لقصص مصوّرة لو الصور بتساعده يخمّن _(205)_
- **Identifying cues and inferring (spoken, signed and written):** يستنتج معنى كلمة جديدة (فعل أو حاجة) من نص بسيط جدًا في موضوع يومي _(223)_؛ يخمّن معنى كلمة جديدة شبه كلمة في لغة يعرفها _(224)_

### Production

- **Overall oral production:** يقول جمل بسيطة متفرقة عن ناس وأماكن _(232)_
- **Sustained monologue: describing experience:** يوصف نفسه، وبيعمل إيه، وساكن فين _(258)_؛ يوصف حاجات بسيطة من يومه في جمل بسيطة ورا بعض، لو جهّز قبلها _(259)_
- **Sustained monologue: giving information:** يسمّي حاجة ويقول شكلها ولونها وهو بيوريها، لو جهّز قبلها _(272)_
- **Addressing audiences:** يقول كلمة قصيرة جاهزة ومتحضّرة (يقدّم حد، أو نخب) _(314)_
- **Overall written production:** يكتب معلومات عن حاجات تخصه (بيحب إيه، عيلته، حيوانه) بكلمات بسيطة _(322)_؛ يكتب جمل بسيطة متفرقة _(323)_
- **Creative writing:** يكتب جمل بسيطة عن نفسه وعن ناس متخيّلين: ساكنين فين وبيعملوا إيه _(346)_؛ يوصف أوضة بلغة بسيطة جدًا _(347)_؛ يوصف حاجات يومية بكلمات بسيطة (لون العربية، كبيرة ولا صغيرة) _(348)_
- **Compensating:** يستخدم الإشارة مع الكلمات البسيطة عشان يطلب حاجة _(389)_

### Interaction

- **Overall oral interaction:** يتعامل ببساطة لكن الكلام معتمد على الإعادة والبطء والإصلاح؛ يسأل ويجاوب أسئلة بسيطة عن احتياجاته المباشرة _(411)_
- **Understanding an interlocutor:** يفهم التعبيرات اليومية لاحتياجاته البسيطة لما حد متعاون يقولها له ببطء ويكررها _(420)_؛ يفهم الأسئلة والتعليمات الموجهة له ببطء وينفّذ توجيهات قصيرة _(421)_
- **Conversation:** يفهم التعبيرات اليومية لاحتياجاته لما حد متعاون يكلمه ببطء ويكرر _(449)_؛ يشارك في حوار بسيط عن موضوع متوقع (بلده، عيلته، مدرسته) _(450)_؛ يعرّف بنفسه ويستخدم كلام التحية والوداع _(451)_؛ يسأل الناس عاملين إيه ويرد على الأخبار _(452)_
- **Informal discussion (with friends):** يتبادل بيحب إيه ومبيحبش إيه (رياضة، أكل) بتعبيرات قليلة _(480)_
- **Goal-oriented co-operation (cooking together, discussing a document, organising an event, etc.):** يفهم الأسئلة والتعليمات الموجهة له ببطء وينفّذ توجيهات قصيرة (في شغل مشترك) _(520)_؛ ينفّذ تعليمات فيها مواعيد وأماكن وأرقام _(521)_؛ يطلب حاجة من حد ويدّي حد حاجة _(522)_
- **Obtaining goods and services:** يطلب حاجة ويدّي حاجة _(546)_؛ يطلب أكل وشرب بتعبيرات بسيطة _(547)_؛ يتعامل مع الأرقام والكميات والأسعار والمواعيد _(548)_
- **Information exchange:** يفهم الأسئلة والتعليمات الموجهة له ببطء وينفّذ توجيهات قصيرة _(573)_؛ يسأل ويجاوب ويبدأ ويرد على جمل بسيطة في احتياجاته أو مواضيع مألوفة جدًا _(574)_؛ يسأل ويجاوب عن نفسه وعن غيره: ساكنين فين، يعرفوا مين، عندهم إيه _(575)_؛ يقول الوقت بتعبيرات ثابتة («الأسبوع الجاي»، «الجمعة اللي فاتت»، «في نوفمبر»، «الساعة تلاتة») _(576)_؛ يقول أرقام وكميات وأسعار بشكل محدود _(577)_؛ يقول لون الهدوم والحاجات ويسأل عن لونها _(578)_
- **Interviewing and being interviewed:** يجاوب في مقابلة على أسئلة مباشرة بطيئة عن بياناته _(599)_؛ يقول للدكتور مشكلته ببساطة ويجاوب «بيوجعك هنا؟» حتى لو بالإشارة _(600)_
- **Overall written interaction:** يطلب بيانات شخصية أو يديها كتابة _(621)_
- **Correspondence:** يكتب رسايل وبوستات جمل قصيرة جدًا عن هواياته وبيحب إيه، بمساعدة قاموس _(647)_؛ يكتب كارت بوستال قصير بسيط _(648)_؛ يكتب رسالة قصيرة جدًا (SMS) لأصحابه فيها معلومة أو سؤال _(649)_
- **Notes, messages and forms:** يملا الأرقام والتواريخ واسمه وجنسيته وعنوانه وسنه وتاريخ ميلاده أو وصوله في استمارة (فندق) _(661)_؛ يسيب رسالة بسيطة: راح فين وراجع إمتى («في السوق، راجع ٥») _(662)_
- **Online conversation and discussion:** يكتب رسايل وبوستات بسيطة جدًا عن هواياته بمساعدة أداة ترجمة _(684)_؛ يرد على بوستات بسيطة بتعبيرات جاهزة (إعجاب أو اعتراض) ويرد على الأسئلة اللي بعدها _(685)_
- **Goal-oriented online transactions and collaboration:** يكمّل شرا أونلاين أو طلب بسيط جدًا بالبيانات الأساسية (اسم، إيميل، تليفون) _(708)_
- **Asking for clarification:** يوضّح بكلمة ونبرة وإشارة إنه مش فاهم _(747)_؛ يقول ببساطة إنه مش فاهم _(748)_

### Mediation

- **Overall mediation:** يوصّل معلومة بسيطة متوقعة من يافطة أو بوستر أو برنامج قصير، ويظهر اهتمامه بفكرة بكلمات وإشارات _(758)_
- **Relaying specific information in speech or sign:** ينقل (بالعربي) مواعيد وأماكن بسيطة اتقالت بالألماني (أو العكس) _(771)_
- **Relaying specific information in writing:** يكتب (بلغة تانية) أسامي وأرقام وأسعار ومعلومات بسيطة سمعها، لو الكلام بطيء ومتكرر _(787)_
- **Processing text in speech or sign:** يقول (بلغة تانية) معلومة بسيطة من يافطة أو بوستر أو برنامج _(833)_
- **Processing text in writing:** ينقل (بلغة تانية، بالقاموس) معنى جمل بسيطة في مواضيع يومية _(850)_؛ ينقل كلمات ونصوص قصيرة مطبوعة بإيده _(851)_
- **Translating a written text in speech or sign:** يترجم شفوي ترجمة تقريبية لكلمات وجمل بسيطة على يافطات وبوسترات وبرامج _(861)_
- **Translating a written text in writing:** يترجم كتابة كلمات وجمل بسيطة بالقاموس، حتى لو مش دايمًا بيختار المعنى الصح _(870)_
- **Expressing a personal response to creative texts (including literature):** يقول بكلمات بسيطة عمل فني خلّاه حاسس بإيه _(904)_
- **Facilitating collaborative interaction with peers:** يطلب مشاركة الناس في مهمة بسيطة بجمل جاهزة، ويقول إنه فاهم ويسأل هم فاهمين _(936)_
- **Collaborating to construct meaning:** يقول فكرة ويسأل الناس رأيهم بكلمات بسيطة، لو جهّز قبلها _(955)_
- **Encouraging conceptual talk:** يستخدم كلمات متفرقة وإشارات عشان يبيّن إنه مهتم بفكرة _(984)_
- **Facilitating pluricultural space:** يسهّل التعارف بين ثقافتين بترحيب واهتمام وكلمات بسيطة _(1001)_
- **Acting as an intermediary in informal situations (with friends and colleagues):** ينقل (بلغة تانية) بيانات حد ومعلومات بسيطة متوقعة، لو حد ساعده في الصياغة _(1012)_
- **Facilitating communication in delicate situations and disagreements:** يلاحظ إن فيه خلاف أو حد عنده مشكلة، ويقول جملة محفوظة («فاهمك»، «إنت كويس؟») _(1028)_

### Plurilingual and pluricultural competence

- **Building on pluricultural repertoire:** يلاحظ اختلاف طريقة العد والمسافات والساعة بين البلاد _(1103)_
- **Plurilingual comprehension:** يعرف الكلمات الدولية والمشتركة بين اللغات (Haus/house) ويستخدمها يفهم يافطات ورسايل بسيطة _(1117)_
- **Building on plurilingual repertoire:** يستخدم كلمات من لغات مختلفة عشان يخلّص حاجة بسيطة جدًا مع حد متعاون _(1136)_

### Communicative language competences

- **General linguistic range:** عنده تعبيرات بسيطة جدًا عن بياناته واحتياجاته _(1149)_؛ يستخدم تراكيب أساسية في جملة واحدة، حتى لو ناقص منها حاجة _(1150)_
- **Vocabulary range:** عنده كلمات وتعبيرات أساسية عن مواقف محددة _(1167)_
- **Grammatical accuracy:** متحكم بشكل محدود في تراكيب وقوالب جمل بسيطة محفوظة _(1177)_
- **Overall phonological control:** نطقه لكلمات محفوظة قليلة مفهوم بمجهود لناس متعودين على متكلمين من بلده؛ يقلّد الأصوات صح لو حد وجّهه _(1193)_
- **Sound articulation:** يقلّد أصوات اللغة لو حد وجّهه بعناية _(1201)_؛ ينطق عدد محدود من الأصوات، والكلام مفهوم لو اللي قدامه بيساعده (يعيد صح ويخليه يكرر) _(1202)_
- **Prosodic features:** النبرة والإيقاع في كلمات وجمل قليلة مفهومين، رغم تأثير لغته الأم _(1210)_
- **Orthographic control:** ينقل كلمات وجمل مألوفة (يافطات، تعليمات، أسامي حاجات ومحلات) _(1220)_؛ يتهجّى عنوانه وجنسيته وبياناته _(1221)_؛ يستخدم علامات الترقيم الأساسية (النقطة، علامة الاستفهام) _(1222)_
- **Sociolinguistic appropriateness:** يعمل تواصل اجتماعي بأبسط صيغ الأدب: التحية والوداع والتعارف، و«من فضلك» و«شكرًا» و«آسف» _(1247)_
- **Coherence and cohesion:** يربط الكلمات بروابط بسيطة («و»، «بعدين») _(1309)_
- **Propositional precision:** يوصّل معلومات أساسية عن نفسه واحتياجاته ببساطة _(1321)_
- **Fluency:** يقول جمل قصيرة جدًا جاهزة، بوقفات كتير يدوّر فيها على الكلام _(1332)_


## الأفعال الكلامية (Sprachhandlungen)

- **Informationsaustausch:** benennen/definieren/identifizieren، beschreiben، erklären، berichten، Mitteilung/Ankündigung، Nachfrage، Zweck und Bestimmung angeben، Wissen/Unwissen
- **Bewertung, Kommentar:** Meinung/Ansicht، Zufriedenheit/Unzufriedenheit، Gefallen/Missfallen، Interesse/Desinteresse، Billigung/Missbilligung، Zustimmung/Ablehnung، Wunsch، Vorlieben، Wichtigkeit، verneinen/Widerspruch، Beschwerde، Rechtfertigung/Begründung
- **Gefühlsausdruck:** Freude/Bedauern، Neigung/Abneigung، Gelassenheit/Gleichgültigkeit، Mitgefühl، Erstaunen/Überraschung، Hoffnung، Sorge/Befürchtung، Enttäuschung
- **Handlungsregulierung:** Bitte/Aufforderung، Bestätigung، Hilfe anbieten/annehmen und ablehnen، Bestellung/Wunsch، Rat/Empfehlung/Warnung، Erlaubnis/Genehmigung، Vorschlag، Versprechung، Einladung، Verabredung
- **Soziale Konventionen:** Kontaktaufnahme: ansprechen، grüßen، sich/jemanden vorstellen، über das Befinden sprechen، gute Wünsche، Gratulation، eine Anerkennung aussprechen/ein Kompliment machen، Dank، Entschuldigung، Verabschiedung

## الاستراتيجيات

- **Redeorganisation:** eine Äußerung einleiten، eine Äußerung abschließen، um das Wort bitten، Zuhören signalisieren، zum Sprechen auffordern، gemeinsames Wissen andeuten، Beispiele geben، das Thema wechseln، etwas hervorheben، Vermeidung، Höflichkeit، Abschwächung
- **Verständnissicherung:** Verständnishilfen anbieten، um Verständnishilfen bitten، Kompensation

## المفاهيم العامة (Notionen)

- **Existenz, Besitz/Zugehörigkeit:** (nicht) sein، anwesend/abwesend sein، (nicht) verfügbar sein، (nicht) vorkommen، Inklusion/Exklusion، Besitz/Zugehörigkeit ausdrücken
- **Raum:** Ort، Herkunft، Richtung، Distanz
- **Zeit:** Zeitpunkt، Zeitangaben، Dauer، Häufigkeit
- **Quantität:** Zahlen/Mengenangaben، Menge، Grad، Dimension/Maßangabe
- **Art und Weise:** physisch، Wertung، Vergleich
- **Logische Verknüpfung:** Grund، Bedingung، Aufzählung/Alternative
- **Modales:** Fähigkeit، Möglichkeit، Notwendigkeit/Verpflichtung

## المواضيع (Themen)

- **Person:** Name، Adresse، Telefon، Geburtsdatum، Geburtsort، Alter، Geschlecht، Familienstand/Familie، Persönliche Beziehungen، Staatsangehörigkeit/Nationalität/Herkunft، Aussehen، Gewohnheiten/Tagesablauf
- **Wohnen:** Wohnung، Räume، Einrichtung/Möbel، Haushalt/technische Einrichtungen، Miete/Mietverhältnis، Wohnungswechsel
- **Umwelt:** Pflanzen، Tiere، Klima/Wetter
- **Reisen/Verkehr:** privater und öffentlicher Verkehr، Reisen، Unterkunft، Gepäck
- **Essen/Trinken:** Nahrungsmittel، Mahlzeiten، Speisen، Getränke، Lokale (Restaurant, Café)
- **Einkaufen/Gebrauchsartikel:** Geschäfte، Preis/Bezahlen، Lebensmittel، Kleidung
- **Dienstleistungen:** Post، Telekommunikation، Banken، Polizei
- **Erziehung/Ausbildung/Lernen:** Kinderbetreuung، Schule، Sprachen lernen
- **Arbeit/Beruf:** Arbeitsplatz، Urlaub
- **Freizeit/Unterhaltung:** Interessen، Sport treiben، Radio/Fernsehen، Internet، Lektüre/Presse

## القواعد

- **Verb:** Präsens aller Verben der Wortliste، Perfekt: arbeiten, bleiben, essen, fahren, fragen, glauben, haben, lesen, lernen, machen, schlafen, sehen, passieren, trinken, verstehen، ausgewählte Partizipien (geöffnet, geschlossen)، Präteritum von haben und sein (1. und 3. Person: hatte, war)، Indikativ، Konjunktiv II als feste Wendung: ich möchte, ich würde gern, ich hätte gern، Imperativ (du, ihr, Sie)، Modalverben im Präsens: können, wollen, müssen, dürfen, sollen, möchten، Verben mit trennbarem Präfix
- **Nomen:** Genus: der/die/das، Singular und Plural der Nomen der Wortliste، Kasus: Nominativ, Akkusativ, Dativ، Genitiv bei Eigennamen (Karls Freunde)، Genitiv rezeptiv (die Nummer des Wagens)
- **Artikelwörter:** bestimmter Artikel der/die/das/die، Demonstrativartikel dieser/diese/dieses، unbestimmter Artikel ein/eine/ein، Nullartikel (Ich esse gern Fleisch.)، Possessivartikel mein, dein, sein, ihr, Ihr, unser, euer، Negativartikel kein
- **Pronomen:** Indefinitpronomen man, etwas, nichts, mehr, alles, welch-، Personalpronomen im Nominativ، Personalpronomen im Akkusativ (mich, dich, ihn, sie, es)، Personalpronomen im Dativ bei danken, gehören, helfen, es geht (mir, dir, euch, Ihnen)، Reflexivpronomen sich/uns (Wir sehen uns morgen.)، Fragepronomen wer, was, wen, wem
- **Adjektiv:** prädikativ (Das Haus ist modern.)، adverbial (Ich lese gern.)، Komparation (gern, lieber; gut, besser)، Zahlwörter (Grund- und Ordnungszahlen)
- **Präposition temporal:** an + Dativ (am Montag)، ab + Dativ (ab Februar)، für + Akkusativ (für drei Wochen)، in + Dativ (im Sommer)، nach + Dativ (nach dem Essen)، über (über 20 Minuten)، um (um halb sieben)، von … bis، vor + Dativ (vor dem Konzert)
- **Präposition lokal:** an + Dativ/Akkusativ، auf + Dativ، aus + Dativ (aus Italien)، bei + Dativ (bei Familie Müller)، in + Dativ/Akkusativ (im Park, in die Stadt)، nach + Ländernamen (nach Paris)، von … nach، unter + Dativ (unter der Nummer)، zu + Dativ (zur Schule)
- **Präposition modal:** aus + Dativ (aus Plastik)، für + Akkusativ (für dich)، mit + Dativ (mit dem Auto)، ohne + Akkusativ (ohne Hilfe)
- **Syntax:** Verbzweitstellung، Verbergänzung: Nominativ, Akkusativ, Dativ (danken, gehören, geben, helfen), Lokal-, Qualitativergänzung، Satzklammer (trennbare Verben, Modalverb + Infinitiv, Perfekt)، Negation mit nicht und kein، Entscheidungsfrage (Ja/Nein)، Ergänzungsfrage (W-Fragen)، Satzverbindungen: und, oder, aber, denn, dann
- **Wortbildung:** Nomen auf -er (Arbeiter) und -ung (Wohnung)، feminine Formen auf -in (Kollegin)، Komposita (Reisegruppe, Zahnarzt, Passfoto)، Partizip als Nomen (Reisender)، Adjektive mit un-, -los, -bar (unbekannt, arbeitslos, erreichbar)، Farbkomposita (hellblau, dunkelblau)

## مجموعات الكلمات

- **Zahlen:** Grundzahlen 0–100, hundert, tausend, Million, Milliarde، Ordnungszahlen: erste, zweite, dritte, vierte …، Bruchzahlen: ein halb, ein Viertel
- **Datum:** Jahreszahlen (neunzehnhundertneunundneunzig, zweitausendvierzehn)، Datum: der erste März, am zwölften Vierten
- **Uhrzeit:** offizielle Uhrzeit (sieben Uhr fünfzehn, dreizehn Uhr siebzehn)، umgangssprachliche Uhrzeit (Viertel vor zwei, halb drei, fünf nach eins)
- **Zeitmaße:** die Sekunde, die Minute, die Stunde, der Tag, die Woche, das Jahr
- **Wochentage:** Montag bis Sonntag, Samstag/Sonnabend, das Wochenende
- **Tageszeiten:** der Morgen, der Vormittag, der Mittag, der Nachmittag, der Abend, die Nacht
- **Monate:** Januar bis Dezember
- **Jahreszeiten:** der Frühling/das Frühjahr, der Sommer, der Herbst, der Winter
- **Währungen:** Euro, Cent
- **Maße und Gewichte:** Meter, Zentimeter, Kilometer, Quadratmeter، Grad über/unter Null, Prozent، Liter, Gramm, Pfund, Kilo
- **Länder und Nationalitäten:** Land, Bewohner, Nationalität (Deutschland, der/die Deutsche, deutsch)، Angabe der eigenen Herkunft (Ägypten, Ägypter/Ägypterin, ägyptisch)
- **Farben:** schwarz, weiß, grau, rot, blau, gelb, grün, braun
- **Himmelsrichtungen:** der Norden, der Süden, der Westen, der Osten

## الكلمات

### قايمة Goethe

**ab**، **aber**، **abfahren**، die Abfahrt، **abgeben**، **abholen**، **der Absender**، **Achtung**، **die Adresse,-en**، **all-**، **allein**، **also**، **alt**، **das Alter**، **an**، **anbieten**، das Angebot, -e، **ander-**، **anfangen**، der Anfang، **anklicken**، **ankommen**، **die Ankunft**، **ankreuzen**، **anmachen**، **(sich) anmelden**، die Anmeldung، **die Anrede**، **anrufen**، **der Anruf, -e**، der Anrufbeantworter، **die Ansage, -n**، **der Anschluss**، **an sein**، **antworten**، die Antwort, -en، **die Anzeige, -n**، **(sich) anziehen**، **das Apartment, -s**، **der Apfel, -Ä**، **der Appetit**، **arbeiten**، die Arbeit, -en، **arbeitslos**، **der Arbeitsplatz, -ä, e**، **der Arm, -e**، **der Arzt, -Ä, e**، **auch**، **auf**، **die Aufgabe, -n**، **aufhören**، **auf sein**، **aufstehen**، **der Aufzug, -ü, e**، **das Auge, -n**، **aus**، **der Ausflug**، **ausfüllen**، **der Ausgang**، **die Auskunft, -ü, e**، **das Ausland**، der Ausländer, -، ausländisch، **ausmachen**، **die Aussage, -n**، **aussehen**، **aus sein**، **aussteigen**، **der Ausweis**، **(sich) ausziehen**، **das Auto, -s**، **die Autobahn, -en**، **der Automat**، **automatisch**، **das Baby, -s**، **die Bäckerei**، **das Bad**، **baden**، **die Bahn**، **der Bahnhof**، **der Bahnsteig**، **bald**، **der Balkon**، **die Banane, -n**، **die Bank**، **bar**، **der Bauch**، **der Baum, -ä, e**، **der Beamte, -n**، **bedeuten**، **beginnen**، **bei**، **beide**، **das Bein, -e**، **das Beispiel, -e**، zum Beispiel/z. B.، **bekannt**، **der/die Bekannte, -n**، **bekommen**، **benutzen**، **der Beruf, -e**، **besetzt**، **besichtigen**، **besser**، **best-**، **bestellen**، **besuchen**، **das Bett, -en**، **bezahlen**، **das Bier**، **das Bild, -er**، **billig**، **die Birne, -n**، **bis**، **bisschen**، **bitte**، die Bitte, -n، bitten، **bitter**، **bleiben**، **der Bleistift, -e**، **der Blick**، **die Blume, -n**، **der Bogen**، **böse**، **brauchen**، **breit**، **der Brief, -e**، **die Briefmarke, -n**، **bringen**، **das Brot, -e**، **das Brötchen, –**، **der Bruder, -ü**، **das Buch, -ü, er**، **der Buchstabe, -n**، **buchstabieren**، **der Bus, -se**، **die Butter**، **das Café, -s**، **die CD, -s**، **der Chef**، **circa/ca.**، **der Computer, –**، **da**، **die Dame, -n**، **daneben**، **danken**، der Dank، danke، **dann**، **das Datum**، **dauern**، **dein-**، **denn**، **der, die, das**، **dich**، **dies-**، **dir**، **die Disco**، **der Doktor**، **das Doppelzimmer**، **das Dorf, -ö, er**، **dort, -her, -hin**، **draußen**، **drucken**، der Drucker, –، **drücken**، **durch**، **die Durchsage, -n**، **dürfen**، **der Durst**، **(sich) duschen**، die Dusche، **die Ecke, -n**، **die Ehefrau, -en/**، **der Ehemann, ä, er**، **das Ei, -er**، **eilig**، **ein-**، **einfach**، **der Eingang**، **einkaufen**، **einladen**، die Einladung، **einmal**، **einsteigen**، **der Eintritt**، **das Einzelzimmer**، **die Eltern (pl.)**، **die E-Mail, -s**، **der Empfänger, –**، **empfehlen**، **enden**، das Ende، **entschuldigen**، die Entschuldigung، **er**، **das Ergebnis, -se**، **erklären**، **erlauben**، **der Erwachsene, -n**، **erzählen**، **es**، **essen**، das Essen، **euer**، **fahren**، der Fahrer، **die Fahrkarte, -n**، **das Fahrrad, -ä, er**، **falsch**، **die Familie, -n**، der Familienname، der Familienstand، **die Farbe, -n**، **das Fax, -e**، **Feier-**، **feiern**، **fehlen**، **der Fehler, –**، **fernsehen**، **fertig**، **das Feuer**، **das Fieber**، **der Film, -e**، **finden**، **die Firma**، **der Fisch, -e**، **die Flasche, -n**، **das Fleisch**، **fliegen**، abfliegen، der Abflug، **der Flughafen**، **das Flugzeug**، **das Formular, -e**، **das Foto, -s**، **fragen**، die Frage, -n، **die Frau, -en**، **frei**، **die Freizeit**، **fremd**، **(sich) freuen**، **der Freund, -e**، **früher**، **frühstücken**، das Frühstück، **die Führung**، **für**، **der Fuß, -ü, e**، **der Fußball**، **der Garten**، **der Gast, -ä, e**، **geben**، **geboren**، **das Geburtsjahr**، **der Geburtsort**، **der Geburtstag**، **gefallen**، **gegen**، **gehen**، **gehören**، **das Geld**، **das Gemüse**، **das Gepäck**، **gerade**، **geradeaus**، **gern(e)**، **das Geschäft, -e**، **das Geschenk, -e**، **die Geschwister (pl.)**، **das Gespräch, -e**، **gestern**، **gestorben**، **das Getränk, -e**، **das Gewicht**، **gewinnen**، **das Glas, -ä, er**، **glauben**، **gleich**، **das Gleis, -e**، **das Glück**، **glücklich**، **der Glückwunsch**، **Grad (Celsius)**، **gratulieren**، **grillen**، **groß**، die Größe، **die Großeltern (pl.)**، die Großmutter، der Großvater، **die Gruppe, -n**، **der Gruß, -ü, e**، **gültig**، **günstig**، **gut**، **das Haar, -e**، **haben**، **das Hähnchen, -**، **die Halbpension**، **die Halle**، **hallo**، **halten**، **die Haltestelle**، **die Hand, -ä, e**، **das Handy, -s**، **das Haus, -ä, er**، **die Hausaufgabe,-n**، **die Hausfrau, -en/**، der Hausmann، **die Heimat**، **heiraten**، **heißen**، **helfen**، **hell**، **der Herd**، **der Herr, -en**، **herzlich**، **heute**، **hier**، **die Hilfe**، **hinten**، **das Hobby, -s**، **hoch**، **die Hochzeit**، **holen**، **hören**، **das Hotel, -s**، **der Hund, -e**، **der Hunger**، **ich**، **ihr/ihm/ihn**، **immer**، **in**، **die Information, -en**، **international**، **das Internet**، **ja**، **die Jacke, -n**، **jed-**، **jetzt**، **der Job, -s**، **der Jugendliche, -n**، **jung**، **der Junge, -n**، **der Kaffee**، **kaputt**، **die Karte, -n**، (Kredit)-Karte, -n، **die Kartoffel, -n**، **die Kasse**، **kaufen**، **kein**، **kennen**، kennenlernen، **das Kind, -er**، **der Kindergarten**، **das Kino, -s**، **der Kiosk**، **klar**، **die Klasse**، **die Kleidung**، **klein**، **kochen**، **der Koffer, –**، **der Kollege, -n**، **kommen**، **können**، **das Konto**، **der Kopf**، **kosten**، **krank**، **kriegen**، **die Küche**، **der Kuchen**، **der Kugelschreiber**، **der Kühlschrank**، **kulturell**، **sich kümmern**، **der Kunde, -n**، **der Kurs, -e**، **kurz**، **lachen**، **der Laden, -ä**، **das Land, -ä, er**، **lang**، **lange**، **langsam**، **laufen**، **laut**، **leben**، das Leben، die Lebensmittel (pl.)، **ledig**، **legen**، **der Lehrer, –**، **leicht**، **leider**، **leise**، **lernen**، **lesen**، **letzt-**، **die Leute (pl.)**، **das Licht**، **lieb-**، lieben، lieber، **Lieblings-**، **das Lied, -er**، **liegen**، **links**، **der Lkw, -s**، **das Lokal**، **die Lösung, -en**، **lustig**، **machen**، **das Mädchen, –**، **man**، **der Mann, -ä, er**، männlich، **die Maschine, -n**، **das Meer**، **mehr**، **mein**، **meist-**، **der Mensch, -en**، **mieten**، die Miete، **die Milch**، **mit**، **mitbringen**، **mitkommen**، **mitmachen**، **mitnehmen**، **die Mitte**، **die Möbel (pl.)**، **möchten**، **mögen**، **möglich**، **der Moment**، **morgen**، **müde**، **der Mund**، **müssen**، **die Mutter, -ü**، **nach**، **nächst-**، **der Name, -n**، **nehmen**، **nein**، **neu**، **nicht**، **nichts**، **nie**، **noch**، **normal**، **die Nummer, -n**، **nur**، **oben**، **das Obst**، **oder**، **öffnen**، geöffnet، **oft**، **ohne**، **das Öl**، **die Oma, -s**، **der Opa, -s**، **die Ordnung**، **der Ort, -e**، **das Papier**، **die Papiere (pl.)**، **der Partner, -/**، **die Partnerin, -nen**، **die Party**، **der Pass, -ä, e**، **die Pause, -n**، **der Plan, -ä, e**، **der Platz, -ä, e**، **die Polizei**، **die Pommes frites (pl.)**، **die Post**، **die Postleitzahl**، **das Praktikum**، **die Praxis**، **der Preis, -e**، **das Problem, -e**، **der Prospekt, -e**، **die Prüfung**، **pünktlich**، **Rad fahren**، **rauchen**، **der Raum, -ä, e**، **die Rechnung, -en**، **rechts**، **regnen**، der Regen، **der Reis**، **reisen**، die Reise، das Reisebüro, -s، der Reiseführer، **reparieren**، die Reparatur، **das Restaurant, -s**، **die Rezeption**، **richtig**، **riechen**، **ruhig**، **der Saft**، **sagen**، **der Salat**، **das Salz**، **Satz, -ä, e**، **die S-Bahn**، **der Schalter**، **scheinen**، **schicken**، **das Schild, -er**، **der Schinken, –**، **schlafen**، **schlecht**، **schließen**، geschlossen، **der Schluss**، **der Schlüssel, –**، **schmecken**، **schnell**، **schon**، **schön**، **der Schrank, -ä, e**، **schreiben**، **der Schuh, -e**، **die Schule**، der Schüler, –، **schwer**، **die Schwester, -n**، **schwimmen**، das Schwimmbad، **der See**، **sehen**، **die Sehenswürdigkeit, -en**، **sehr**، **sein**، an sein، auf sein، weg sein، zu sein، **seit**، **selbstständig**، **sich**، **sie**، **Sie**، **sitzen**، **so**، **das Sofa**، **sofort**، **der Sohn, -ö, e**، **sollen**، **die Sonne**، **spät**، **später**، **die Speisekarte**، **spielen**، **der Sport**، **die Sprache, -n**، **sprechen**، **die Stadt, -ä, e**، **stehen**، **die Stelle, -n**، **stellen**، **der Stock**، **die Straße, -n**، **die Straßenbahn**، **studieren**، **das Studium**، der Student, -en، **die Stunde, -n**، **suchen**، **tanzen**، **die Tasche, -n**، **das Taxi, -s**، **der Tee**، **der Teil, -e**، **telefonieren**، das Telefon، **der Termin, -e**، **der Test**، **teuer**، **der Text, -e**، **das Thema**، **das Ticket, -s**، **der Tisch, -e**، **die Tochter, -ö**، **die Toilette, -en**، **die Tomate, -n**، **tot**، **(sich) treffen**، **die Treppe, -n**، **trinken**، **tschüss**، **tun**، **über**، **übernachten**، **überweisen**، **die Uhr**، **um**، **umziehen**، **und**، **unser-**، **unten**، **unter**، **der Unterricht**، **unterschreiben**، die Unterschrift، **der Urlaub**، **der Vater, -ä**، **verboten**، **verdienen**، **der Verein**، **verheiratet**، **verkaufen**، der Verkäufer, –، **vermieten**، der Vermieter، **verstehen**، **der Verwandte, -n**، **viel**، **vielleicht**، **von**، **vor**، **der Vorname, -n**، **die Vorsicht**، **(sich) vorstellen**، **die Vorwahl**، **wandern**، **wann**، **warten**، **warum**، **was**، **was für ein**، **(sich) waschen**، **das Wasser**، **weh tun**، **weiblich**، **der Wein**، **weit**، **weiter**، **welch-**، **die Welt**، **wenig**، **wer**، **werden**، **das Wetter**، **wichtig**، **wie**، **wiederholen**، **das Wiederhören**، **das Wiedersehen**، **wie viel**، **willkommen**، **der Wind**، **wir**، **wissen**، **wo**، **woher**، **wohin**، **wohnen**، die Wohnung, -en، **wollen**، **das Wort, -ö, er/-e**، **wunderbar**، **zahlen**، **die Zeit**، zurzeit، **die Zeitung, -en**، **die Zigarette, -n**، **das Zimmer, –**، **der Zoll**، **zu**، **zufrieden**، **der Zug, -ü, e**، **zurück**، **zusammen**، **zwischen**

### زيادة من ÖSD و telc

نص الامتحانين التجريبيين (ومعاه نصوص السمع) اتحلّل بـ spaCy، والكلمات اللي مش في قايمة Goethe اتفرزت بالإيد (`tools/syllabus-gen/de-a1-extra.js` فيه الطريقة). * = Goethe بيستخدمها في أمثلته بس، مش كلمة في القايمة.

- **لغة الأسئلة** (اللي ميعرفهاش يخسر نقط قبل ما يقرا النص): markieren _(telc)_، passend _(ÖSD)_، die Lücke, die Lücken _(telc)_، die Überschrift, die Überschriften _(telc)_، die Situation, die Situationen _(الاتنين)_، das Kreuz, die Kreuze _(ÖSD)_، der Antwortbogen, die Antwortbögen* _(telc)_، das Blatt, die Blätter _(ÖSD)_، die Zeile, die Zeilen _(ÖSD)_، der Punkt, die Punkte _(الاتنين)_، wählen _(telc)_، beantworten _(الاتنين)_، zweimal _(telc)_، die Nachricht, die Nachrichten _(الاتنين)_
- **كلمات يومية:** der Supermarkt, die Supermärkte* _(telc)_، die Fahrt, die Fahrten* _(telc)_، das Büro, die Büros* _(ÖSD)_، der Käse, die Käse* _(ÖSD)_، die Suppe, die Suppen _(ÖSD)_، die Tablette, die Tabletten _(ÖSD)_، die Medizin _(telc)_، die Temperatur, die Temperaturen _(telc)_، kalt* _(telc)_، heiß _(telc)_، nett _(telc)_، freundlich _(telc)_، täglich _(ÖSD)_، kostenlos _(telc)_، der Besuch, die Besuche* _(ÖSD)_، der Besucher, die Besucher _(الاتنين)_، der Park, die Parks* _(ÖSD)_، das Fest, die Feste _(الاتنين)_، die Idee, die Ideen _(telc)_، das Spiel, die Spiele* _(telc)_، gemeinsam _(ÖSD)_، genau _(ÖSD)_، wieder _(الاتنين)_، doch* _(telc)_، jemand _(ÖSD)_، sonst _(ÖSD)_، besonders _(telc)_، endlich _(telc)_، früh _(telc)_، die Zahl, die Zahlen _(telc)_، die Person, die Personen* _(ÖSD)_، das Interesse, die Interessen _(ÖSD)_، das Erdgeschoss, die Erdgeschosse _(ÖSD)_، der Ruhetag, die Ruhetage _(ÖSD)_، die Wäsche, die Wäschen _(ÖSD)_، voll _(telc)_، schauen _(ÖSD)_، zeigen* _(telc)_، denken _(ÖSD)_، interessieren _(telc)_، verschieden _(ÖSD)_
