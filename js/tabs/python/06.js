// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "الـ debugging في Python",
      l: 2,
      n: "breakpoint() و أوامر pdb، و post-mortem بعد الـ exception، و debugpy في VS Code و Docker",
      projects: [
        { lvl: 'صغير', t: R`صيد ٥ باجات`, what: R`اكتب (أو خلّي زميل يكتب) سكربت فيه ٥ باجات مزروعة: off-by-one، ومتغير اتكتب فوقه، وقسمة صحيحة بدل عادية، و default mutable، ومقارنة string برقم. لاقيهم بـ pdb بس من غير ولا print.`, done: R`عندك ملف ملاحظات فيه كل باج والأمر اللي مسكته بيه ([[p]] أو [[b]] بشرط أو [[display]])، والسكربت بيطلّع الناتج الصح، وفيه اختبار لكل باج.` },
        { lvl: 'صغير', t: R`تقرير الوقعة`, what: R`[[sys.excepthook]] بتاعك: أي exception محدش مسكه بيتكتب في [[crash-YYYYmmdd-HHMMSS.txt]] (الـ traceback ونسخة Python و [[sys.argv]])، والمستخدم يشوف سطر واحد مفهوم.`, done: R`سكربت بيقع بيطبع «حصل خطأ، التفاصيل في crash-...txt» والملف فيه الـ traceback كامل، والـ exit code ١، والسكربت السليم مبيعملش ملفات.` },
        { lvl: 'متوسط', t: R`[[--debug]] بيفتح pdb`, what: R`سكربت فيه [[main()]] ملفوفة بـ [[try/except]]: من غير [[--debug]] بيطبع رسالة ودية ويكتب لوج، ومع [[--debug]] بيفتح [[pdb.post_mortem()]] في مكان الوقعة.`, done: R`نفس الوقعة: عادي بتطلّع سطر واحد و exit code ١، و [[--debug]] بيوقف في السطر اللي رمى الـ exception و [[p]] بيطبع المتغيرات المحلية هناك.` },
        { lvl: 'متوسط', t: R`[[launch.json]] لمشروعك`, what: R`لمشروع من مشاريعك: config للسكربت بالـ args، و pytest على الملف المفتوح، و pytest على الاختبار اللي تحت الماوس ([[-k]])، و FastAPI بـ uvicorn، و attach على بورت ٥٦٧٨.`, done: R`الخمسة شغالين من Run and Debug، وكل واحد بيقف عند breakpoint، والملف متكومت في [[.vscode/]] وزميلك بيستخدمه من غير ما يغيّر حاجة.` },
        { lvl: 'كبير', t: R`سكربت استيراد بيستحمل البيانات البايظة`, what: R`[[import_orders.py]] بيقرا CSV طلبات ويحطها في sqlite3: كل صف بايظ بيتسجّل في [[rejects.csv]] برقم السطر والسبب بدل ما يوقّع الكل، والأخطاء اللي مش متوقعة بتكتب crash bundle (traceback والصف اللي كان بيتعالج ونسخ المكتبات)، و [[--debug]] بيفتح post-mortem، و [[logging]] لملف، والتشغيل التاني بيتخطى الطلبات اللي اتسجّلت قبل كده (مفتاح فريد)، واختبارات لكل نوع غلط.`, done: R`ملف ١٠٠٠ صف فيه ٣٠ صف بايظ: ٩٧٠ في القاعدة و ٣٠ في [[rejects.csv]] بأسبابهم، والتشغيل التاني بيقول «0 جديد»، وغلطة متعمّدة في الكود بتعمل crash bundle مفهوم، والاختبارات خضرا.`, ext: R`شغّله في Docker و attach بـ debugpy من VS Code، وزوّد [[--resume-from LINE]].` },
        { lvl: 'فكرة', t: R`دفتر الباجات`, what: R`لمدة أسبوعين، كل باج تقابله اكتبه: العَرَض، وأول حاجة شكّيت فيها، والأمر اللي وصّلك للسبب، والسبب، والتصليح، والاختبار اللي يمنعه يرجع.`, done: R`عندك ١٠ حالات على الأقل، ولقيت نمط في أكتر نوع باجات بتعمله، وكتبت قاعدة واحدة هتمشي عليها بسببه.`, ext: R`حوّل أحسن ٣ حالات لتمارين «صلّح الكود البايظ» لزميل.` },
      ],
      items: [
        {
          cmd: "breakpoint()",
          title: "توقّف البرنامج وتبص جواه",
          desc: R`[[breakpoint()]] في أي سطر بيوقّف البرنامج هناك ويفتح [[pdb]] في الترمنال: تطبع أي متغير، وتمشي سطر سطر، وتدخل جوه الدوال. أسرع من print في كل حتة لأنك بتسأل البرنامج وهو واقف بدل ما تخمّن تطبع إيه وتعيد التشغيل.

الأوامر الأساسية: [[p x]] اطبع، و [[n]] السطر اللي بعده، و [[s]] ادخل جوه الدالة، و [[c]] كمّل، و [[ll]] اعرض الدالة، و [[q]] اخرج.`,
          example: R`def average(nums):
    total = 0
    for i in range(1, len(nums)):
        total += nums[i]
    breakpoint()
    return total / len(nums)
print(average([10, 20, 30]))`,
          try: R`احفظ الكود في [[average.py]] وشغّله بـ [[python average.py]]. المفروض المتوسط 20. لما يقف عند [[(Pdb)]] اكتب [[p total, len(nums)]] و [[ll]]، ولاقي الغلطة. وبعدين شيل الـ breakpoint وحط واحد جوه الـ for، واستخدم [[n]] و [[p i, nums[i] ]] كذا مرة و [[c]].`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في مثال الدرس، لما يقف عند [[(Pdb)]] واكتب [[p total, len(nums)]] وبعدها [[c]]. هيطبع إيه في الاتنين؟`, done: R`[[p]] طبع [[(50, 3)]] و [[c]] كمّل وطبع [[16.666666666666668]]. الـ ٥٠ بدل ٦٠ بتقولك إن أول رقم ماتجمعش، يعني [[range(1, ...)]] هو الباج.` },
            { lvl: 'سريع', t: R`**محاكاة:** من غير ما تكتب في pdb بإيدك، ابعتله الأوامر بـ pipe: [[printf 'p total, len(nums)\nc\n' | python average.py]] (في PowerShell: [["p total, len(nums)", "c" | python average.py]]).`, done: R`ظهر نفس الناتج من غير ما تكتب حاجة، وفهمت إن pdb بيقرا أوامره من الـ stdin، وده اللي بيخلّي سكربت جواه [[breakpoint()]] منسي يعلّق في cron أو CI مستني أوامر.` },
            { lvl: 'تطبيق', t: R`**قارن:** شغّل [[average.py]] بـ [[PYTHONBREAKPOINT=0]] (في PowerShell [[$env:PYTHONBREAKPOINT=0]] وبعدين امسحه).`, done: R`السكربت ماوقفش وطبع [[16.666666666666668]] على طول، فـ [[PYTHONBREAKPOINT=0]] بيعطّل كل [[breakpoint()]] من غير ما تلمس الكود. ومع كده شيل الـ breakpoint قبل الـ commit.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح [[average]] بـ [[sum(nums) / len(nums)]]، وبعدين نادي [[average([])]]. إيه اللي حصل، وقرّر الدالة تعمل إيه في الحالة دي.`, done: R`[[[10, 20, 30]]] بقت [[20.0]]، و [[[]]] وقعت بـ [[ZeroDivisionError: division by zero]]، فقرّرت ترمي [[ValueError("empty list")]] برسالة واضحة (أو ترجّع [[None]])، وكتبت اختبار للحالتين.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** في [[(Pdb)]] اكتب [[help]] وبعدين [[help b]] و [[help until]] و [[help display]]. إزاي تحط breakpoint في سطر ٤ بشرط [[i == 2]] من جوه pdb؟`, done: R`[[b 4, i == 2]] وبعدين [[c]] فوقف لما [[i]] بقت ٢ بس، و [[display total]] خلّى قيمة [[total]] تتطبع لوحدها كل ما تتغيّر، و [[until]] بيخلّص الـ loop مرة واحدة.` },
            { lvl: 'تحدي', t: R`**مسألة:** لستة ١٠٠٠ رقم فيها رقم سالب واحد في مكان عشوائي، والـ loop بيحسب جذر كل رقم بـ [[math.sqrt]]. وقّف البرنامج عند السالب بس، مرة بـ [[if x < 0: breakpoint()]] ومرة بـ breakpoint بشرط من جوه pdb.`, done: R`الطريقتين وقفوا مرة واحدة والـ [[p i, x]] طبع مكانه وقيمته، ومن غير شرط كنت هتدوس [[c]] مئات المرات. وشلت السطر الشرطي من الكود في الآخر.` },
          ],
          deep: {
            why: "print debugging بيتحول لعشرين print، تشيلهم وتنسى واحد في الكود اللي نزل. والـ debugger بيوريك كل حاجة في اللحظة دي: كل المتغيرات، ومين نادى مين، وتقدر تجرّب تعبير على القيم الحقيقية قبل ما تعدّل الكود.",
            how: R`[[breakpoint()]] (من Python 3.7) بتنادي [[pdb.set_trace()]] بشكل افتراضي. من Python 3.13 البرنامج بيقف عند سطر الـ [[breakpoint()]] نفسه، وبيطبع [[> file.py(5)average()]] و [[-> breakpoint()]] (السهم هو السطر الحالي). في النسخ الأقدم كان بيقف على السطر اللي بعدها ([[-> return ...]]).

الأوامر:

[[p expr]] و [[pp expr]] (منسّق للـ dict الكبيرة). وأي تعبير Python بتكتبه مباشرة بيتنفذ، بس لو اسم المتغير زي أمر (زي [[n]] أو [[c]]) اكتب [[p n]] أو [[!n]].

[[n]] (next) نفّذ السطر وروح اللي بعده من غير ما تدخل الدوال. [[s]] (step) ادخل جوه الدالة اللي في السطر. [[r]] (return) كمّل لحد ما الدالة الحالية ترجع. [[c]] (continue) كمّل لحد breakpoint تاني أو النهاية. [[unt N]] كمّل لحد سطر N (مفيد تخرج من loop).

[[l]] و [[ll]] اعرض الكود (ll الدالة كلها). [[w]] (where) الـ stack: مين نادى مين. [[u]] و [[d]] اطلع وانزل في الـ stack تبص على متغيرات الدالة اللي نادت.

[[b file.py:20]] breakpoint جديد من غير ما تعدّل الكود، و [[b 20, x > 100]] مشروط. [[display expr]] يطبع التعبير كل ما يتغير. [[interact]] يفتح REPL كامل بالمتغيرات. [[q]] يخرج (والبرنامج بيقف).

[[PYTHONBREAKPOINT=0]] بيعطّل كل الـ breakpoint() من غير ما تمسحهم، و [[PYTHONBREAKPOINT=ipdb.set_trace]] يستخدم debugger تاني.

مع pytest: [[breakpoint()]] جوه اختبار شغالة عادي (pytest بيقفل الـ capture لوحده). ومع uvicorn: بتقف في الترمنال اللي شغّال فيه السيرفر والـ request مستني.`,
            when: "لما النتيجة غلط ومش عارف ليه، وعدد القيم اللي محتاج تشوفها أكتر من print أو اتنين. أو عايز تفهم كود مش بتاعك بتتبعه سطر سطر.",
            mistakes: R`تنسى [[breakpoint()]] في الكود وتعمل commit: السيرفر أو الـ CI يقف مستني input للأبد. (ruff بيمسكها بقاعدة T100.) و breakpoint جوه container شغال في الخلفية: مفيش ترمنال تكتب فيه، استخدم debugpy. ومتغير اسمه [[c]] أو [[n]] وتكتب اسمه فـ pdb ينفّذ الأمر بدل ما يطبعه.`
          },
          teach: R`## الفكرة: البرنامج يقف عند سطر، وانت تسأله وهو واقف

[[breakpoint()]] دالة جاهزة في Python (من 3.7)، مش محتاجة import. أول ما البرنامج يوصلها بيقف ويفتح **pdb** (Python DeBugger) في نفس الترمنال، ويستناك تكتب أوامر. تطبع متغيرات، تمشي سطر سطر، وبعدين تقوله كمّل.

المثال دالة متوسط فيها غلطة عن قصد، و [[breakpoint()]] قبل الـ return. جربناه على ويندوز (Python 3.14) وعلى لينكس ([[python:3.13-slim]] و [[python:3.12-slim]] عشان نشوف الفرق بين النسخ). وعشان نوري الناتج كتبنا أوامر pdb في ملف وبعتناها بـ pipe، وانت هتكتبها بإيدك.

---

## ١. الكود سطر سطر

| السطر | بيعمل إيه |
|---|---|
| [[def average(nums):]] | دالة بتاخد لستة أرقام |
| [[total = 0]] | المجموع يبدأ صفر |
| [[for i in range(1, len(nums)):]] | [[len(nums)]] = 3، و [[range(1, 3)]] بيطلّع 1 ثم 2. **الغلطة هنا** |
| [[total += nums[i] ]] | زوّد العنصر رقم i على المجموع |
| [[breakpoint()]] | وقّف البرنامج هنا وافتح pdb قبل الـ return |
| [[return total / len(nums)]] | المجموع على العدد |
| [[print(average([10, 20, 30]))]] | نادي الدالة واطبع الناتج، والمفروض يطلع 20 |

[[range(start, stop)]] بيبدأ من start ويقف **قبل** stop. والـ index في Python بيبدأ من 0، فـ [[range(1, ...)]] بيفوّت أول عنصر.

---

## ٢. البرنامج وقف

~~~bash
python average.py
~~~

~~~text الناتج (لينكس، Python 3.13)
> /src/dbg/average.py(5)average()
-> breakpoint()
(Pdb)
~~~

| الحتة | معناها |
|---|---|
| [[>]] | إنت فين دلوقتي |
| [[/src/dbg/average.py]] | مسار الملف اللي البرنامج واقف فيه |
| [[(5)]] | رقم السطر اللي واقف عنده جوه الملف |
| [[average()]] | جوه أنهي دالة |
| [[-> breakpoint()]] | السطر اللي **لسه هيتنفذ** |
| [[(Pdb)]] | الـ prompt: pdb مستني أمر |

وعلى ويندوز نفس الشكل بالمسار الكامل بحروف صغيرة ([[c:\users\ali\...\average.py(5)average()]]).

### الفرق بين النسخ

في Python 3.12 نفس الكود وقف على السطر **اللي بعدها**:

~~~text الناتج (Python 3.12)
> /src/dbg/average.py(6)average()
-> return total / len(nums)
~~~

من 3.13 بيقف على سطر الـ [[breakpoint()]] نفسه. مش فارقة في الشغل، بس متتلخبطش لو شفت الاتنين.

---

## ٣. [[p total, len(nums)]]

[[p]] اختصار print: اطبع قيمة أي تعبير Python. والفاصلة بتعمل tuple، فبيطبع الاتنين مع بعض:

~~~text الناتج
(Pdb) (50, 3)
~~~

المجموع 50 مش 60. يعني القسمة سليمة، والغلط في الجمع. ده اللي print واحد كان هيوصلك له، بس هنا من غير ما تعدّل الكود وتشغّل تاني.

---

## ٤. [[ll]]

اختصار longlist: اعرض الدالة اللي انت فيها كلها، والسهم عند مكانك:

~~~text الناتج
(Pdb)   1  	def average(nums):
  2  	    total = 0
  3  	    for i in range(1, len(nums)):
  4  	        total += nums[i]
  5  ->	    breakpoint()
  6  	    return total / len(nums)
~~~

([[l]] لوحدها بتعرض ١١ سطر حوالين مكانك بس.)

---

## ٥. [[c]]

continue: كمّل التشغيل لحد breakpoint تاني أو النهاية:

~~~text الناتج
(Pdb) 16.666666666666668
~~~

يعني [[50 / 3]].

---

## ٦. «جرّب»: الـ breakpoint جوه الـ loop

حطينا [[breakpoint()]] قبل [[total += nums[i] ]] وبعتنا: [[p i, nums[i] ]] ثم [[n]] ثم [[p total]] ثم [[c]] ثم [[p i, nums[i] ]] ثم [[c]]:

~~~text الناتج (لينكس)
> /src/dbg/loop.py(4)average()
-> breakpoint()
(Pdb) (1, 20)
(Pdb) > /src/dbg/loop.py(5)average()
-> total += nums[i]
(Pdb) 0
(Pdb) > /src/dbg/loop.py(4)average()
-> breakpoint()
(Pdb) (2, 30)
(Pdb) 16.666666666666668
~~~

- أول وقفة: [[i]] = 1 و [[nums[1] ]] = 20. يعني أول لفة بدأت من 20، والـ 10 اتفوّتت. هنا لقينا الغلطة.
- [[n]] (next): نفّذ السطر ده وروح اللي بعده. السهم نزل لسطر 5.
- [[p total]]: لسه 0، لأن سطر 5 **لسه** متنفذش.
- [[c]]: كمّل، فوقف عند نفس الـ breakpoint في اللفة التانية ([[i]] = 2).
- [[c]] تاني: مفيش لفات تانية، فخلص.

---

## ٧. لو المتغير اسمه زي أمر

متغير اسمه [[n]] = 5. جربنا نكتب [[n]] لوحدها في pdb على ويندوز: نفّذ **next** ونزل للسطر اللي بعده بدل ما يطبع. و [[p n]] و [[!n]] طبعوا [[5]]. [[!]] قبل أي حاجة معناها «ده كود Python، مش أمر pdb».

---

## الأوامر

| الأمر | الاسم | بيعمل إيه |
|---|---|---|
| [[p expr]] | print | اطبع قيمة |
| [[n]] | next | السطر اللي بعده (من غير ما تدخل الدوال) |
| [[s]] | step | ادخل جوه الدالة اللي في السطر |
| [[c]] | continue | كمّل لحد breakpoint تاني |
| [[ll]] | longlist | اعرض الدالة كلها |
| [[w]] | where | مين نادى مين (الـ stack) |
| [[q]] | quit | اخرج (والبرنامج بيقف) |

## الخلاصة

- [[breakpoint()]] في السطر اللي عايز تبص عنده، وشغّل عادي.
- [[p]] تسأل، [[n]] و [[s]] تمشي، [[c]] تكمّل.
- من 3.13 بيقف على سطر الـ [[breakpoint()]] نفسه، وقبلها على اللي بعده.
- [[PYTHONBREAKPOINT=0]] بيعطّلهم كلهم من غير ما تمسحهم (جربناها: البرنامج طبع النتيجة على طول). ومتنساش تمسحهم قبل الـ commit.`,
          lines: [
            R`دالة بتاخد لستة أرقام وترجّع المتوسط بتاعها. فيها غلطة عن قصد، والـ debugger هو اللي هيوريك هي فين من غير ما تخمّن.`,
            R`المجموع بيبدأ من صفر، وكل لفة هتزوّد عليه عنصر. ده من أول المتغيرات اللي هتبص عليها في pdb بـ [[p total]].`,
            R`بيلف على أرقام الـ index من 1 لحد [[len(nums)]] من غيره. **الغلطة هنا**: الـ index في Python بيبدأ من 0، فـ [[range(1, ...)]] بيفوّت أول عنصر. الصح [[range(len(nums))]]، أو أحسن [[for n in nums]] مباشرة.`,
            R`بيزوّد العنصر رقم [[i]] على المجموع. ومع الغلطة اللي فوق هيجمع 20 و 30 بس، فالمجموع يطلع 50 بدل 60.`,
            R`هنا البرنامج بيقف ويفتح [[pdb]] في الترمنال ويستناك تكتب أوامر: [[p total, len(nums)]] تطبع القيم، و [[ll]] تعرض الدالة، و [[c]] تكمّل. مش محتاجة import، ومتنساهاش في الكود قبل الـ commit، وإلا السيرفر أو الـ CI يقف مستني input.`,
            R`المجموع على عدد العناصر. لما تكتب [[c]] في pdb السطر ده بيتنفّذ: [[50 / 3]] يطلع حوالي 16.67 بدل 20، ودي النتيجة الغلط اللي بتدوّر على سببها.`,
            R`بينادي الدالة على لستة فيها 10 و 20 و 30 ويطبع الناتج. المتوسط الصح 20، فلما يطلع غير كده تعرف إن فيه غلطة، والـ breakpoint اللي جوه بيوقّفك قبل الـ return تشوف ليه.`,
          ],
          sol: R`البرنامج بيطبع [[16.666666666666668]] مش 20. عند [[(Pdb)]]، [[p total, len(nums)]] بيطبع [[(50, 3)]]: المجموع 50 مش 60، فالقسمة سليمة والجمع هو الغلط. [[ll]] بيعرض الدالة وسهم [[->]] عند سطر الـ [[breakpoint()]] (في Python 3.13 وأحدث؛ الأقدم كان بيوقف السهم عند الـ return).

وبالـ breakpoint جوه الـ for: أول وقفة [[p i, nums[i] ]] بيطبع [[(1, 20)]]، يعني أول عنصر (10) اتفوّت خالص. الغلطة [[range(1, len(nums))]]، وصحها [[range(len(nums))]]، والأحسن من غير index أصلًا: [[sum(nums)]].

لو كتبت [[n]] عشان تطبع متغير اسمه n، pdb بينفّذ next. اكتب [[p n]].`,
          solCode: R`def average(nums):
    if not nums:
        raise ValueError("empty list")
    return sum(nums) / len(nums)

print(average([10, 20, 30]))  # 20.0`
        },
        {
          cmd: "python -m pdb",
          title: "تفتح الـ debugger مكان الـ exception بعد ما يقع",
          desc: R`post-mortem: البرنامج وقع بـ exception، وعايز تبص على المتغيرات في اللحظة اللي وقع فيها بالظبط من غير ما تعرف تحط breakpoint فين. [[python -m pdb -c continue]] بيشغّل السكربت، ولو وقع بيفتح pdb في السطر اللي رمى الـ exception.

ومع pytest: [[--pdb]] بيفتح pdb عند أول اختبار يفشل، و [[--trace]] بيوقف في أول كل اختبار.`,
          example: R`python -m pdb -c continue seed.py data.csv
pytest -x --pdb
pytest --trace tests/test_pricing.py::test_negative_price_rejected
python -i seed.py data.csv
PYTHONBREAKPOINT=0 python seed.py data.csv`,
          try: R`اعمل [[data.csv]] فيه [[pen,5]] و [[book,12]] و [[cup,ten]]، و [[seed.py]] بيقرا الملف بـ [[csv.reader]] ويحوّل العمود التاني بـ [[int()]]. شغّله عادي وشوف الـ traceback، وبعدين بـ [[python -m pdb -c continue]]، واكتب [[p row]] و [[w]]. وصلّح الـ seed يقول رقم السطر البايظ بدل ما يقع.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[seed.py]] اللي في الـ «جرّب» على [[data.csv]] فيه [[cup,ten]]. آخر سطر في الـ traceback هيبقى إيه؟ وهيطبع كام سطر سليم قبلها؟`, done: R`طبع [[pen 5]] و [[book 12]] وبعدين [[ValueError: invalid literal for int() with base 10: 'ten']]. يعني الشغل اللي قبل الغلطة اتعمل، والباقي لأ.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** [[printf 'p row\nq\n' | python -m pdb -c continue seed.py data.csv]]. إيه اللي هيظهر بعد الـ traceback؟`, done: R`[[Uncaught exception. Entering post mortem debugging]] وبعدها السطر اللي وقع ([[-> print(row[0], int(row[1]))]]) و [[p row]] طبع [[['cup', 'ten']]]. يعني شفت الصف البايظ نفسه من غير ما تزوّد ولا print.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** صلّح [[seed.py]] بحيث يكمّل على الصفوف السليمة، ويطبع على stderr [[line 3: price 'ten' is not a number]] لكل صف غلط (بـ [[enumerate(..., start=1)]])، ويخرج بـ ١ لو فيه أي غلط.`, done: R`على ملف ١٠ صفوف فيه ٣ غلط: ٧ اتطبعوا، و ٣ رسايل بأرقام السطور الصح على stderr، والـ exit code ١، والسطر الفاضي في آخر الملف مبيعتبرش غلط.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبار فيه [[x = compute()]] و [[assert x == 10]] وبيفشل. شغّل [[pytest -x --pdb]] واكتب [[p x]] و [[pp locals()]].`, done: R`pytest فتح pdb مكان الـ assert اللي فشل، و [[p x]] طبع القيمة الحقيقية، و [[pp locals()]] طبع كل المتغيرات منظمة، و [[q]] قفل pytest.` },
            { lvl: 'تحدي', t: R`**قارن:** [[python -m pdb -h]] في Python 3.14 وفي [[python:3.12-slim]]. إيه الجديد؟`, done: R`3.14 فيه [[-p pid]]: تتصل بـ debugger على بروسيس Python **شغال فعلًا** بالـ PID بتاعه، و 3.12 مفيهوش. وكتبت إمتى ده يفيدك (سكربت معلّق ومش عايز تقفله).` },
          ],
          deep: {
            why: "الـ traceback بيقولك السطر، بس مش بيقولك القيم: أنهي صف من ١٠ آلاف صف في الـ CSV كان بايظ؟ post-mortem بيوقّفك في اللحظة دي بالظبط، بكل المتغيرات زي ما هي.",
            how: R`[[python -m pdb script.py args]] بيوقف قبل أول سطر. و [[-c continue]] بيدّيله أمر [[c]] أول ما يفتح، فالبرنامج يمشي عادي، ولو حصل exception مش متمسك بيطبعه ويقولك [[Entering post mortem debugging]] ويفتح pdb عند السطر اللي رماه. من هناك [[p]] و [[w]] و [[u]] و [[d]] زي الدرس اللي فات. ([[c]] أو [[s]] بعدها بيعيد تشغيل البرنامج من الأول، و [[q]] يخرج.)

[[python -i script.py]]: بعد ما السكربت يخلص أو يقع، بيفتح Python REPL بكل المتغيرات العالمية. ولو وقع، اكتب [[import pdb; pdb.pm()]] يفتح post-mortem على آخر exception.

[[pytest --pdb]] بيفتح pdb عند أي فشل (assert أو exception) جوه الاختبار نفسه، و [[-x]] معاه عشان يقف عند أول واحد بدل ما يفتح pdb لكل فشل. [[--trace]] بيوقف في أول كل اختبار مختار، كأنك حاطط breakpoint() في أوله.

[[PYTHONBREAKPOINT=0]] بيعطّل الـ breakpoint() اللي في الكود للتشغيل ده، مفيد لو نسيت واحد وعايز تشغّل بسرعة.

وفي كود: [[pdb.post_mortem(exc.__traceback__)]] جوه except بيفتح pdb على exception مسكته. ومن Python 3.14 فيه [[python -m pdb -p PID]] يتصل ببرنامج شغال فعلًا (لسه جديد، اتأكد من نسختك).`,
            when: "سكربت أو job وقع وعايز تعرف ليه في دقيقة. واختبار بيفشل ورسالة الـ assert مش كفاية.",
            mistakes: R`[[--pdb]] في CI أو مع [[-n auto]] (pytest-xdist): مفيش ترمنال تفاعلي، فبيعلّق أو يتجاهل. و [[c]] بعد post-mortem وتستغرب إن البرنامج بدأ من الأول. وتصلّح بإنك تحط try/except بيبلع الخطأ ويكمّل بهدوء: الأحسن تقول الصف البايظ فين وتقرر (تتخطاه وتسجّله، أو توقف).`
          },
          teach: R`## الفكرة: البرنامج وقع؟ ادخل جواه في لحظة الوقوع

في الدرس اللي فات كنت عارف تحط [[breakpoint()]] فين. هنا مش عارف: البرنامج بيقع بـ exception، وعايز تشوف المتغيرات في السطر اللي وقع فيه بالظبط. ده اسمه **post-mortem** (يعني «بعد الوفاة»: بتفحص البرنامج بعد ما وقع). المثال ٥ أوامر، كل واحد طريقة.

جربناهم على سكربت من «جرّب» على ويندوز (Python 3.14) وعلى لينكس ([[python:3.13-slim]]):

~~~python seed.py
import csv, sys
def parse(row):
    return {"name": row[0], "price": int(row[1])}
with open(sys.argv[1], newline="", encoding="utf-8") as f:
    rows = [parse(r) for r in csv.reader(f)]
print(len(rows), "rows")
~~~

و [[data.csv]] فيه ٣ سطور: [[pen,5]] و [[book,12]] و [[cup,ten]]. [[csv.reader]] بيدّي كل سطر لستة نصوص، و [[int("ten")]] هيقع.

التشغيل العادي:

~~~text الناتج (ويندوز، مختصر)
  File "...\seed.py", line 5, in <module>
    rows = [parse(r) for r in csv.reader(f)]
  File "...\seed.py", line 3, in parse
    return {"name": row[0], "price": int(row[1])}
ValueError: invalid literal for int() with base 10: 'ten'
~~~

بيقولك السطر، بس مش بيقولك **أنهي صف**. مع ٣ صفوف سهلة، مع ١٠ آلاف لأ.

---

## ١. [[python -m pdb -c continue seed.py data.csv]]

من برة لجوه:

| الحتة | معناها |
|---|---|
| [[python -m pdb]] | شغّل موديول [[pdb]] كبرنامج (زي [[-m pytest]]) |
| [[-c continue]] | أول أمر يتنفذ أول ما pdb يفتح: [[continue]] |
| [[seed.py data.csv]] | السكربت والـ arguments بتاعته، زي ما كنت هتشغّله |

من غير [[-c continue]] pdb بيقف قبل أول سطر ويستناك. معاه البرنامج يمشي عادي، ولو حصل exception محدش مسكه:

~~~text الناتج (لينكس)
Uncaught exception. Entering post mortem debugging
Running 'cont' or 'step' will restart the program
> /w/seed.py(3)parse()
-> return {"name": row[0], "price": int(row[1])}
(Pdb)
~~~

pdb فتح **جوه [[parse]]** عند السطر اللي رمى. ودلوقتي:

~~~text p row
(Pdb) ['cup', 'ten']
~~~

لقينا الصف البايظ. و [[w]] (where) بيطبع الـ stack، يعني سلسلة مين نادى مين، من الأقدم للأحدث:

~~~text w (لينكس، مختصر)
  /usr/local/lib/python3.13/pdb.py(2524)main()
  /usr/local/lib/python3.13/bdb.py(680)run()
  <string>(1)<module>()
  /w/seed.py(5)<module>()
-> rows = [parse(r) for r in csv.reader(f)]
> /w/seed.py(3)parse()
-> return {"name": row[0], "price": int(row[1])}
~~~

أول سطور دي pdb نفسه وهو بيشغّل السكربت، تجاهلها. بعدها [[seed.py]] سطر 5 (الـ list comprehension) نادى [[parse]] سطر 3. و [[>]] عند الـ frame اللي انت فيه. [[u]] (up) بيطلعك للـ frame اللي نادى، تشوف متغيراته.

> «Running 'cont' or 'step' will restart the program»: لو كتبت [[c]] هنا البرنامج **يبدأ من الأول**. [[q]] بيخرج.

وعلى ويندوز نفس الناتج بالظبط، بمسارات ويندوز.

---

## ٢. [[pytest -x --pdb]]

[[--pdb]]: أي اختبار يقع، افتح pdb جواه في لحظة الوقوع. و [[-x]] عشان يقف عند أول واحد بدل ما يفتح pdb لكل فشل. جربناه على اختبارات درس parametrize (والحالة [[lowercase-coupon]] لسه واقعة):

~~~text الناتج (لينكس)
>>>>>>>>>>>>>>>>>> PDB post_mortem (IO-capturing turned off) >>>>>>>>>>>>>>>>>>>
> /w/pr/tests/test_pricing.py(13)test_final_price()
-> assert final_price(price, coupon) == expected
(Pdb) 'save10'
(Pdb) 200
~~~

كتبنا [[p coupon]] ثم [[p final_price(price, coupon)]]: تقدر تنادي الدالة نفسها بالقيم دي وتجرّب. و «IO-capturing turned off» يعني pytest بطّل يمسك الـ print عشان تشوف شغلك. وبعد [[q]]:

~~~text الناتج
!!!!!!!!!!!!!!!!!!! _pytest.outcomes.Exit: Quitting debugger !!!!!!!!!!!!!!!!!!!
========================= 1 failed, 3 passed in 0.22s ==========================
~~~

---

## ٣. [[pytest --trace tests/test_pricing.py::test_negative_price_rejected]]

[[--trace]] بيوقف في **أول** كل اختبار مختار، قبل ما يقع أو يعدّي. كأنك حاطط [[breakpoint()]] في أوله:

~~~text الناتج (لينكس)
>>>>>>>>>>>>>>>>>>>> PDB runcall (IO-capturing turned off) >>>>>>>>>>>>>>>>>>>>>
> /w/pr/tests/test_pricing.py(16)test_negative_price_rejected()
-> with pytest.raises(ValueError, match="negative"):
(Pdb) -1
~~~

[[p price]] طبع [[-1]]: أول صف في الجدول. ولما كتبنا [[c]] الاختبار ده عدّى ([[.]]) ووقف تاني في أول الصف التاني ([[-100]])، لأن كل صف اختبار لوحده.

---

## ٤. [[python -i seed.py data.csv]]

[[-i]] (interactive): بعد ما السكربت يخلص **أو يقع**، افتح Python REPL ([[>>>]]) بدل ما تخرج. كل المتغيرات العالمية موجودة. وجواه:

~~~python
import pdb; pdb.pm()
~~~

[[pdb.pm()]] (post-mortem) بيفتح pdb على آخر exception حصل. جربناه على ويندوز:

~~~text الناتج (ويندوز)
ValueError: invalid literal for int() with base 10: 'ten'
>>> > c:\users\ali\...\pm\seed.py(3)parse()
-> return {"name": row[0], "price": int(row[1])}
(Pdb)
~~~

ولاحظ: [[print("rows" in dir())]] في الـ REPL طبع [[False]]. المتغير [[rows]] عمره ما اتعمل، لأن الـ comprehension وقع قبل ما يخلص ويتحط فيه.

---

## ٥. [[PYTHONBREAKPOINT=0 python seed.py data.csv]]

[[VAR=value command]] في bash بيحط متغير بيئة للأمر ده بس. و [[PYTHONBREAKPOINT=0]] بيخلي كل [[breakpoint()]] في الكود متعملش حاجة. جربناه على [[average.py]] بتاع الدرس اللي فات: طبع [[16.666666666666668]] على طول من غير ما يقف. وفي PowerShell: [[$env:PYTHONBREAKPOINT = "0"]] قبل الأمر (وبيفضل للجلسة دي لحد ما تقفلها).

---

## ٦. الـ solCode

- [[enumerate(csv.reader(f), start=1)]]: بيدّي كل صف ومعاه رقمه، من 1 مش 0، عشان يطابق رقم السطر في الملف.
- [[try:]] ... [[except (ValueError, IndexError) as e:]]: امسك النوعين ([[IndexError]] لو الصف ناقص عمود).
- [[raise ValueError(f"line {line}: bad row {row!r}") from e]]: ارمي خطأ جديد برسالة مفيدة. [[!r]] بيطبع القيمة بشكل [[repr]] (بعلامات التنصيص). و [[from e]] بيربطه بالخطأ الأصلي، فالـ traceback يوري الاتنين.

~~~text الناتج (لينكس)
ValueError: line 3: bad row ['cup', 'ten']
~~~

ومع ملف سليم طبع [[2 rows]].

---

## الخلاصة

| الأمر | امتى |
|---|---|
| [[python -m pdb -c continue script.py]] | سكربت بيقع وعايز تبص جواه |
| [[pytest -x --pdb]] | اختبار بيقع والرسالة مش كفاية |
| [[pytest --trace path::test]] | عايز تمشي في اختبار من أوله |
| [[python -i script.py]] ثم [[pdb.pm()]] | وقع خلاص، وعايز REPL والـ debugger |
| [[PYTHONBREAKPOINT=0]] | شغّل من غير ما يقف عند أي breakpoint() |

- في post-mortem: [[p]] و [[w]] و [[u]] و [[d]]، و [[q]] للخروج. [[c]] بيعيد التشغيل من الأول.
- بعد ما تلاقي السبب: خلّي رسالة الخطأ نفسها تقول الصف والسطر.`,
          lines: [
            R`[[python -m pdb]] بيشغّل السكربت تحت الـ debugger، و [[-c continue]] بيقوله يكمّل على طول بدل ما يقف قبل أول سطر. البرنامج يمشي عادي، ولو وقع بـ exception محدش مسكه، pdb بيفتح في السطر اللي رماه بالظبط، فتكتب [[p row]] تشوف الصف البايظ. خلي بالك: [[c]] بعدها بيعيد البرنامج من الأول، و [[q]] بيخرج.`,
            R`[[--pdb]] بيفتح pdb جوه أي اختبار يفشل في لحظة الفشل، فتطبع القيم أو تنادي الدالة نفسها وتجرّب. و [[-x]] بيوقف التشغيل عند أول فشل، عشان pdb ميفتحش لكل اختبار واقع ورا بعض. ومتستخدموش في CI: مفيش حد يكتب أوامر.`,
            R`[[--trace]] بيوقف في **أول** الاختبار ده قبل ما يقع أو يعدّي، كأنك حاطط [[breakpoint()]] في أوله، وبعدين تمشي بـ [[n]]. والمسار بعد [[::]] بيختار اختبار واحد بس، ولو الاختبار parametrize هيقف في أول كل صف لوحده.`,
            R`[[-i]] (interactive): بعد ما السكربت يخلص أو يقع، Python بيفتح REPL بدل ما يخرج، وكل المتغيرات العالمية موجودة. ولو وقع، اكتب [[import pdb; pdb.pm()]] يفتح الـ debugger على آخر exception، فيبقى معاك الـ REPL والـ debugger الاتنين.`,
            R`[[PYTHONBREAKPOINT=0]] متغير بيئة بيخلي كل [[breakpoint()]] في الكود متعملش حاجة للتشغيل ده بس، فالبرنامج يكمّل من غير ما يقف. الصيغة [[VAR=value command]] دي بتاعة bash؛ في PowerShell اكتب [[$env:PYTHONBREAKPOINT = "0"]] الأول وبعدين الأمر.`,
          ],
          sol: R`التشغيل العادي بيقع بـ [[ValueError: invalid literal for int() with base 10: 'ten']] وسطر [[int(row[1])]]، من غير ما يقولك أنهي صف.

بـ pdb: بيطبع نفس الـ traceback وبعده [[Uncaught exception. Entering post mortem debugging]] و [[> seed.py(3)parse()]]. [[p row]] بيطبع [[['cup', 'ten'] ]]، و [[w]] بيوريك الـ stack: الـ module (سطر الـ list comprehension) نادى parse. (من Python 3.12 الـ comprehension مبقاش ليه frame لوحده في الـ stack.)

التصليح: [[enumerate(..., start=1)]] عشان رقم السطر، وتمسك [[ValueError]] وترمي رسالة واضحة فيها السطر والقيمة (أو تسجّل الصف وتكمّل لو ده المطلوب). من غير ما تبلع الخطأ بصمت.`,
          solCode: R`import csv
import sys

def parse(row: list[str], line: int) -> dict:
    try:
        return {"name": row[0], "price": int(row[1])}
    except (ValueError, IndexError) as e:
        raise ValueError(f"line {line}: bad row {row!r}") from e

with open(sys.argv[1], newline="", encoding="utf-8") as f:
    rows = [parse(r, n) for n, r in enumerate(csv.reader(f), start=1)]
print(len(rows), "rows")
# ValueError: line 3: bad row ['cup', 'ten']`
        },
        {
          cmd: "debugpy و launch.json",
          title: "breakpoints في VS Code لـ FastAPI والاختبارات و Docker",
          desc: R`[[debugpy]] هو الـ debugger اللي VS Code بيستخدمه لـ Python (من خلال إضافة Python Debugger). بتحط نقطة حمرا جنب السطر (F9)، وتشغّل من Run and Debug (F5)، والبرنامج يقف هناك وتشوف Variables و Call Stack و Watch.

[[.vscode/launch.json]] بيحدد إزاي يشغّل: uvicorn كـ module، أو pytest على الملف المفتوح، أو يتصل (attach) بـ debugpy شغال جوه container.`,
          example: R`{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--port", "8000"],
      "justMyCode": true
    },
    {
      "name": "pytest: this file",
      "type": "debugpy",
      "request": "launch",
      "module": "pytest",
      "args": ["$__{file}", "-x", "-q"]
    },
    {
      "name": "Attach to Docker",
      "type": "debugpy",
      "request": "attach",
      "connect": { "host": "localhost", "port": 5678 },
      "pathMappings": [{ "localRoot": "$__{workspaceFolder}", "remoteRoot": "/app" }]
    }
  ]
}`,
          try: R`حط الملف في [[.vscode/launch.json]]، واختار الـ interpreter بتاع الـ venv (Ctrl+Shift+P ثم Python: Select Interpreter). حط breakpoint في [[create_item]] وشغّل «FastAPI» بـ F5، وابعت POST من [[/docs]]. الـ request هيفضل مستني: بص على [[item]] في Variables واضغط F10 كذا مرة. وبعدين شغّل «pytest: this file» وانت فاتح ملف اختبار فيه breakpoint.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** سطّب [[debugpy==1.8.11]] في venv وشغّل [[python -m debugpy --help]]. إيه الفرق بين [[--listen]] و [[--connect]]، و [[--wait-for-client]] بتعمل إيه؟`, done: R`[[--listen]] البرنامج بيستنى VS Code يتصل بيه (attach)، و [[--connect]] البرنامج هو اللي بيتصل بـ VS Code مستني، و [[--wait-for-client]] بيخلّي البرنامج ميبدأش لحد ما الـ debugger يتصل، عشان متفوّتش breakpoint في أول سطور.` },
            { lvl: 'سريع', t: R`**اقرا:** على Python 3.14 [[python -m debugpy --help]] طبع قبل الـ usage تحذير فيه [[frozen modules]]. اقراه واعرف معناه.`, done: R`التحذير بيقول إن Python بيحمّل موديولات المكتبة القياسية frozen فممكن الـ breakpoints جواها متشتغلش، والحل [[-Xfrozen_modules=off]]، أو [[PYDEVD_DISABLE_FILE_VALIDATION=1]] تخفي الرسالة. وكتبت إن ده مش مشكلة لكودك انت.` },
            { lvl: 'تطبيق', t: R`**ابني:** config اسمه «script with args» في [[launch.json]] بيشغّل [[$__{file}]] بـ [[args]] فيها [[data.csv]] و [[--dry-run]]، و [[env]] فيه [[APP_DEBUG=1]]، و [[cwd]] بفولدر المشروع.`, done: R`F5 على [[seed.py]] بيشغّله بالـ arguments دي، و [[sys.argv]] و [[os.environ["APP_DEBUG"]]] ظاهرين في Variables، وبيقف عند الـ breakpoint.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حطيت breakpoint جوه كود مكتبة في [[site-packages]] ومش بيقف عنده. ليه؟`, done: R`لأن [[justMyCode: true]] بيتجاهل أي كود مش بتاعك، وغيّرته لـ [[false]] في config منفصل للـ debugging العميق، والـ breakpoint بقى يشتغل.` },
            { lvl: 'تحدي', t: R`**اشرحها:** في الـ compose شغّلت [[python -m debugpy --listen 0.0.0.0:5678 ...]] و [[ports: "5678:5678"]]. اكتب ٣ سطور لزميل: ليه [[0.0.0.0]] جوه الكونتينر، و [[pathMappings]] بتعمل إيه، وليه البورت ده ممنوع يتفتح على سيرفر.`, done: R`كتبت إن [[0.0.0.0]] عشان VS Code من بره الكونتينر يوصل، و [[pathMappings]] بيربط [[/app]] جوه بالفولدر عندك عشان الـ breakpoints تتطابق، وإن أي حد يوصل لبورت debugpy يقدر يشغّل كود على السيرفر، فيتربط على [[127.0.0.1:5678:5678]] بس وعلى جهازك بس.` },
          ],
          deep: {
            why: "pdb في الترمنال كويس، بس لما تبقى الدوال كتير والـ objects كبيرة، إنك تشوف كل المتغيرات مفتوحة قدامك وتدوس على أي frame في الـ stack أسرع بكتير. والأهم: التطبيق جوه Docker مفيهوش ترمنال تكتب فيه لـ pdb، و debugpy بيخليك تتصل بيه من VS Code.",
            how: R`[[type: "debugpy"]] هو النوع الحالي (الإعدادات القديمة كانت [["python"]] وبقى deprecated). [[request: "launch"]] يعني VS Code هو اللي يشغّل البرنامج، و [[module]] زي [[python -m uvicorn]]. و [[args]] بيتبعتوا بعده. وبيستخدم الـ interpreter اللي اخترته، فلازم يبقى بتاع الـ venv.

[[--reload]] بيشغّل السيرفر في subprocess، و debugpy بيتصل بالـ subprocesses لوحده، فالـ breakpoints شغالة حتى بعد reload. الإعداد اسمه [[subProcess]]، وافتراضيه في كود debugpy نفسه true (صفحة VS Code مكتوب فيها false، بس الكود هو اللي بيتنفّذ). لو حصل ومبقتش بتقف بعد reload، حط [["subProcess": true]] صريحة.

[[justMyCode: true]] (الافتراضي) بيخلي F11 مبيدخلش جوه كود FastAPI و Starlette، وبيوقف بس على breakpoints في كودك. خليه false لو عايز تفهم المكتبة من جوه.

[[$__{file}]] الملف المفتوح دلوقتي، و [[$__{workspaceFolder}]] فولدر المشروع. وتقدر تضيف [["env": {"APP_DEBUG": "1"}]] أو [["envFile": "$__{workspaceFolder}/.env"]]. (وتبويب Testing في VS Code فيه زرار Debug Test جنب كل اختبار من غير launch.json أصلًا.)

Docker: التطبيق جوه container بيشتغل بـ [[python -m debugpy --listen 0.0.0.0:5678 -m uvicorn app.main:app --host 0.0.0.0 --port 8080]]، والبورت [[127.0.0.1:5678:5678]] في compose. [[--wait-for-client]] يخليه ميبدأش لحد ما تتصل (لو محتاج توقف على كود الـ startup). و [[request: "attach"]] بيتصل بيه. [[pathMappings]] بيقول إن [[/app]] جوه الـ container هو فولدر المشروع عندك، وإلا الـ breakpoints مش هتقف لأن المسارات مختلفة.`,
            when: "bug في FastAPI بيعدّي على كذا dependency ودالة. وأي تطبيق جوه Docker أو على سيرفر تاني (عن طريق SSH tunnel). وأول مرة تقرا كود مشروع وعايز تمشي ورا request من أوله لآخره.",
            mistakes: R`[[--listen 0.0.0.0:5678]] والبورت منشور على [[0.0.0.0]] في compose أو على سيرفر: أي حد يوصل للبورت ده يقدر ينفّذ كود على التطبيق. خليه [[127.0.0.1:5678:5678]] وللسيرفر استخدم SSH tunnel، ومتسيبوش في إعدادات الإنتاج أبدًا. و pathMappings غلط أو ناقص: VS Code يقول متصل والـ breakpoints رمادي ومبتقفش. والـ interpreter مش بتاع الـ venv فيطلع [[No module named uvicorn]].`
          },
          teach: R`## الفكرة: ملف بيقول لـ VS Code «شغّل البرنامج ده كده، ووقّف عند النقط الحمرا»

[[launch.json]] ملف JSON جوه فولدر [[.vscode]] في المشروع. كل عنصر في [[configurations]] طريقة تشغيل بتظهر في قايمة Run and Debug، تختارها وتدوس F5. و [[debugpy]] هو الـ debugger اللي VS Code بيستخدمه لـ Python (بييجي مع إضافة Python Debugger).

اللي جربناه هنا: الملف JSON سليم (قريناه بـ [[JSON.parse]] وطلعت الـ ٣ configurations)، وأمر debugpy اللي بيشغّل uvicorn على ويندوز ولينكس. الشاشات والـ F5 و F10 من توثيق VS Code، ماتجربتش هنا لأن مفيش VS Code في البيئة دي.

---

## ١. الهيكل

### [[{]] و [["version": "0.2.0"]]

نسخة صيغة الملف. ثابتة كده، VS Code بيحطها لوحده لو عملت الملف من Run and Debug.

### [["configurations": [ ... ] ]]

لستة (القوسين المربعين)، كل عنصر فيها object بين [[{ }]] = طريقة تشغيل.

---

## ٢. الأولى: «FastAPI»

| الخانة | القيمة | معناها |
|---|---|---|
| [["name"]] | [["FastAPI"]] | الاسم اللي هتختاره من القايمة |
| [["type"]] | [["debugpy"]] | استخدم debugger بتاع Python (القديم كان [["python"]]) |
| [["request"]] | [["launch"]] | VS Code هو اللي يشغّل البرنامج |
| [["module"]] | [["uvicorn"]] | زي [[python -m uvicorn]] |
| [["args"]] | [[["app.main:app", "--reload", "--port", "8000"] ]] | اللي بيتكتب بعده |
| [["justMyCode"]] | [[true]] | وقّف في كودك بس، مش جوه FastAPI و Starlette |

يعني لما تدوس F5 كأنك كتبت:

~~~bash
python -m uvicorn app.main:app --reload --port 8000
~~~

بس تحت عين الـ debugger. كل argument عنصر لوحده في [[args]]: [["--port", "8000"]] مش [["--port 8000"]].

و [[python]] هنا هو الـ interpreter اللي اخترته في VS Code (Ctrl+Shift+P ثم Python: Select Interpreter)، فلازم يبقى بتاع الـ venv، وإلا [[No module named uvicorn]].

---

## ٣. التانية: «pytest: this file»

نفس الفكرة بـ [["module": "pytest"]]، و [["args": ["$__{file}", "-x", "-q"] ]].

[[$__{file}]] متغير بتاع VS Code: مسار الملف المفتوح قدامك دلوقتي. فلو فاتح [[tests/test_items.py]] ودست F5، كأنك كتبت [[python -m pytest tests/test_items.py -x -q]]. و [[-x]] و [[-q]] من درس pytest.

---

## ٤. التالتة: «Attach to Docker»

### [["request": "attach"]]

بدل ما VS Code يشغّل البرنامج، **يتصل** ببرنامج شغال فعلًا فيه debugpy مستني.

### [["connect": { "host": "localhost", "port": 5678 }]]

يتصل فين: البورت 5678 على جهازك، واللي Docker بيوصّله للـ container.

### [["pathMappings": [{ "localRoot": "$__{workspaceFolder}", "remoteRoot": "/app" }]]]

[[$__{workspaceFolder}]] فولدر المشروع اللي فاتحه في VS Code. والسطر بيقول: الملف اللي عندي في [[C:\Users\ali\proj\app\main.py]] هو نفسه [[/app/app/main.py]] جوه الـ container. من غيره، VS Code يحط النقطة على مسار ويندوز، و debugpy جوه الـ container ميعرفش المسار ده، فمبيقفش.

---

## ٥. الطرف التاني: debugpy جوه الـ container

الـ attach محتاج حد سامع. ده الأمر اللي في الحل:

~~~bash
python -m debugpy --listen 0.0.0.0:5678 -m uvicorn app.main:app --host 0.0.0.0 --port 8080
~~~

| الحتة | معناها |
|---|---|
| [[python -m debugpy]] | شغّل debugpy كبرنامج، وهو اللي هيشغّل التطبيق جواه |
| [[--listen 0.0.0.0:5678]] | استنى VS Code يتصل على البورت ده. [[0.0.0.0]] = من أي عنوان (لازم جوه container عشان Docker يوصل له) |
| [[-m uvicorn ...]] | وبعدها شغّل البرنامج ده جوه الـ debugger |

جربناه على لينكس ([[python:3.13-slim]]، debugpy 1.8.22): السيرفر رد [[{"ok":true}]] على 8080، والبورتين 5678 و 8080 مفتوحين. واللوج:

~~~text الناتج
0.00s - Debugger warning: It seems that frozen modules are being used, which may
0.00s - make the debugger miss breakpoints. Please pass -Xfrozen_modules=off
0.00s - to python to disable frozen modules.
0.00s - Note: Debugging will proceed. Set PYDEVD_DISABLE_FILE_VALIDATION=1 to disable this validation.
INFO:     Started server process [373]
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
~~~

التحذير عن «frozen modules»: Python بيحمّل شوية موديولات أساسية متجهزة مسبقًا لسرعة البداية، والـ debugger بيقولك ممكن ميقفش جوهم. بيخص كود Python نفسه مش كودك، فعادي.

وعلى ويندوز جربناه بـ [[--listen 127.0.0.1:5688]] (جهازك بس، مفيش container): نفس التحذير، والسيرفر رد، و [[Get-NetTCPConnection]] ورّى البورتين سامعين على [[127.0.0.1]].

### [[--wait-for-client]]

جربنا نضيفه: السيرفر **ما بدأش**، و [[curl]] رجع [[rc=7]] (يعني مقدرش يتصل خالص)، لحد ما debugger يتصل. مفيد لو عايز توقف على كود الـ startup.

---

## ٦. الـ compose في الحل

| السطر | ليه |
|---|---|
| [[command: ["python", "-m", "debugpy", ...]]] | بيبدّل أمر التشغيل بتاع الصورة بأمر debugpy |
| [[ports: - "127.0.0.1:5678:5678"]] | بورت الـ debugger منشور على جهازك بس |
| [[volumes: - ./:/app]] | الكود اللي عندك هو اللي جوه الـ container، فالـ pathMappings تطابق |

و [[127.0.0.1]] في الـ ports مهم جدًا: debugpy بيسمح لأي حد متصل إنه ينفّذ كود. لو اتنشر على [[0.0.0.0]] أي حد على الشبكة يقدر.

---

## الخلاصة

| الخانة | معناها |
|---|---|
| [["type": "debugpy"]] | debugger بتاع Python |
| [["request": "launch"]] | VS Code يشغّل البرنامج |
| [["request": "attach"]] | VS Code يتصل ببرنامج شغال |
| [["module"]] + [["args"]] | زي ما تكتب [[python -m module args...]] في الترمنال بالظبط |
| [["justMyCode": true]] | وقّف في كودك بس |
| [[$__{file}]] و [[$__{workspaceFolder}]] | الملف المفتوح، وفولدر المشروع |
| [["pathMappings"]] | مسار عندك = مسار جوه الـ container |

- الـ interpreter في VS Code لازم يبقى بتاع الـ venv.
- debugpy على بورت منشور على [[127.0.0.1]] بس، وللتطوير بس.`,
          lines: [
            R`بداية الملف: كله object واحد بين قوسين معوجين. VS Code بيقراه من [[.vscode/launch.json]] جوه فولدر المشروع.`,
            R`نسخة صيغة الملف نفسه، مش نسخة Python ولا مشروعك. قيمتها ثابتة [["0.2.0"]]، و VS Code بيحطها لوحده لو عملت الملف من Run and Debug.`,
            R`لستة طرق التشغيل. كل object جواها بيظهر اختيار في قايمة Run and Debug، تختاره وتدوس F5. هنا فيه تلاتة: السيرفر، والاختبارات، والاتصال بـ Docker.`,
            R`أول طريقة تشغيل: السيرفر.`,
            R`الاسم اللي هيظهر في قايمة Run and Debug عشان تختار منها. اكتبه واضح، لأن مع الوقت القايمة بتكبر.`,
            R`نوع الـ debugger: [["debugpy"]] هو بتاع Python، وبييجي مع إضافة Python Debugger في VS Code. الإعدادات القديمة كانت بتكتب [["python"]] وده بقى deprecated.`,
            R`[["launch"]] يعني VS Code هو اللي بيشغّل البرنامج من الأول تحت الـ debugger، بعكس [["attach"]] اللي بيتصل ببرنامج شغال أصلًا (هتشوفها في التالتة).`,
            R`شغّل [[uvicorn]] كـ module، يعني زي [[python -m uvicorn]] بالظبط. و [[python]] هنا هو الـ interpreter اللي اخترته في VS Code، فلازم يبقى بتاع الـ venv وإلا يطلع [[No module named uvicorn]].`,
            R`الـ arguments اللي بتتكتب بعد [[uvicorn]]: مكان التطبيق [[app.main:app]]، و [[--reload]] يعيد التشغيل لما تحفظ، والبورت. كل كلمة عنصر لوحده: [["--port", "8000"]] مش [["--port 8000"]]، وإلا uvicorn هيستلمها argument واحد غلط.`,
            R`وقّف بس على الـ breakpoints في كودك، ومتدخلش جوه كود FastAPI و Starlette لما تدوس F11. ده الافتراضي أصلًا وكتابته توضيح؛ خليه [[false]] لو عايز تفهم المكتبة من جوه.`,
            R`نهاية أول طريقة تشغيل، والفاصلة لأن بعدها عنصر تاني في اللستة.`,
            R`تاني طريقة تشغيل: الاختبارات.`,
            R`اسم بيوضح إنها بتشغّل pytest على الملف المفتوح قدامك بس، مش كل الاختبارات.`,
            R`نفس الـ debugger بتاع Python: أي برنامج Python بيتشغّل بيه، سواء سيرفر أو اختبارات.`,
            R`VS Code هو اللي يشغّل pytest من الأول، فالـ breakpoints في الاختبار أو في الكود اللي بيناديه هتقف.`,
            R`زي [[python -m pytest]]. تشغيله كـ module من الـ interpreter بتاع الـ venv بيضمن إن pytest والمكتبات جايين من نفس البيئة.`,
            R`[[$__{file}]] متغير بتاع VS Code: مسار الملف المفتوح دلوقتي، فـ F5 وانت فاتح ملف اختبار بيشغّله هو بس. و [[-x]] يوقف عند أول فشل، و [[-q]] يقلّل الكلام في الناتج.`,
            R`نهاية التانية.`,
            R`تالت طريقة تشغيل: الاتصال بتطبيق جوه Docker.`,
            R`اسمها في القايمة. دي مختلفة عن اللي قبلها: مش بتشغّل حاجة، بتتصل بحاجة شغالة.`,
            R`نفس debugpy. والطرف التاني جوه الـ container لازم يكون شغال بـ debugpy برضه عشان يفهموا بعض.`,
            R`[["attach"]] يعني اتصل ببرنامج شغال بالفعل بدل ما تشغّله. التطبيق جوه الـ container متشغّل بـ [[python -m debugpy --listen 0.0.0.0:5678 ...]] ومستني حد يتصل.`,
            R`يتصل فين: البورت 5678 على جهازك، و Docker بيوصّله للـ container. انشره في compose على [[127.0.0.1:5678:5678]] بس، لأن أي حد يوصل لبورت debugpy يقدر ينفّذ كود على التطبيق.`,
            R`بيقول إن فولدر المشروع عندك ([[$__{workspaceFolder}]]) هو نفسه [[/app]] جوه الـ container. من غيره VS Code يبعت مسارات جهازك اللي الـ container ميعرفهاش، فيقول متصل والـ breakpoints تفضل رمادي ومبتقفش.`,
            R`نهاية التالتة، ومن غير فاصلة لأنها آخر عنصر في اللستة.`,
            R`نهاية لستة [[configurations]].`,
            R`نهاية الـ object الأساسي، يعني نهاية الملف.`,
          ],
          sol: R`الجزء بتاع VS Code (الشاشات والـ F5 و F10) من توثيق VS Code، ماجربتهوش هنا. اللي جربته: [[python -m debugpy --listen 0.0.0.0:5678 -m uvicorn app.main:app --host 0.0.0.0 --port 8080]] شغّل التطبيق عادي ورد على [[/health]]، وطبع تحذير [[Debugger warning: It seems that frozen modules are being used]].

المتوقع: لما تبعت POST من [[/docs]]، VS Code بيقف على السطر وبيعلّمه أصفر، وصفحة الـ docs تفضل «Loading» لحد ما تكمّل (F5). في Variables هتلاقي [[item]] من نوع [[Item]] بالقيم اللي بعتها، و [[store]]. و F10 بيمشي سطر سطر، و Call Stack بيوريك كود Starlette و FastAPI اللي نادى الدالة (باهت لأن justMyCode).

مع «pytest: this file» الـ breakpoint جوه الاختبار أو جوه الكود اللي الاختبار بيناديه بيقف بنفس الشكل.

لو الـ breakpoint رمادي ومبيقفش: الـ interpreter مش بتاع الـ venv، أو الملف اللي حاطط فيه النقطة مش هو اللي بيتنفذ. ولـ Docker الغلطة المعتادة pathMappings. وتحذير [[frozen modules]] اللي ممكن يطلع في الترمنال مش مشكلة في الغالب.

الحل تحت: الـ compose اللي بيشغّل التطبيق بـ debugpy للتطوير بس، ويتصل بيه «Attach to Docker».`,
          solCode: R`# compose.debug.yaml (للتطوير بس)
# docker compose -f compose.yaml -f compose.debug.yaml up
services:
  app:
# debugpy لازم يبقى متسطّب في الصورة (requirements-dev.txt مثلًا)
    command: ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678",
              "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
    ports:
      - "127.0.0.1:5678:5678"
    volumes:
      - ./:/app`
        }
      ]
    }
]);
