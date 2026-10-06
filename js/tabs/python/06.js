// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "الـ debugging في Python",
      l: 2,
      n: "breakpoint() و أوامر pdb، و post-mortem بعد الـ exception، و debugpy في VS Code و Docker",
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
| [[breakpoint()]] | وقّف هنا |
| [[return total / len(nums)]] | المجموع على العدد |
| [[print(average([10, 20, 30]))]] | المفروض 20 |

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
| [[/src/dbg/average.py]] | الملف |
| [[(5)]] | رقم السطر |
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
            "دالة المتوسط (فيها غلطة).",
            "المجموع يبدأ صفر.",
            "لف على العناصر...",
            "...وجمّعها.",
            "وقّف هنا وافتح pdb.",
            "رجّع المتوسط.",
            "شغّل على [10, 20, 30]."
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
            "شغّل، ولو وقع افتح pdb مكان الـ exception.",
            "افتح pdb عند أول اختبار يفشل.",
            "وقّف في أول الاختبار ده وامشي سطر سطر.",
            R`بعد ما يقع افتح REPL، واكتب [[import pdb; pdb.pm()]].`,
            "شغّل من غير ما يقف عند أي breakpoint() في الكود."
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
| [[python -m debugpy]] | شغّل debugpy |
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
| [["module"]] + [["args"]] | زي [[python -m module args...]] |
| [["justMyCode": true]] | وقّف في كودك بس |
| [[$__{file}]] و [[$__{workspaceFolder}]] | الملف المفتوح، وفولدر المشروع |
| [["pathMappings"]] | مسار عندك = مسار جوه الـ container |

- الـ interpreter في VS Code لازم يبقى بتاع الـ venv.
- debugpy على بورت منشور على [[127.0.0.1]] بس، وللتطوير بس.`,
          lines: [
            "بداية الملف.",
            "نسخة صيغة الملف.",
            "لستة طرق التشغيل (بتظهر في Run and Debug).",
            "الأولى:",
            "اسمها في القايمة.",
            "debugger بتاع Python.",
            "VS Code يشغّل البرنامج بنفسه.",
            "زي python -m uvicorn.",
            "مسار التطبيق وإعادة التشغيل مع الحفظ.",
            "وقّف في كودك بس، مش في المكتبات.",
            "نهايتها.",
            "التانية:",
            "الاسم.",
            "نفس الـ debugger.",
            "تشغيل.",
            "زي python -m pytest.",
            "على الملف المفتوح، ووقف عند أول فشل.",
            "نهايتها.",
            "التالتة:",
            "الاسم.",
            "نفس الـ debugger.",
            "اتصل ببرنامج شغال بالفعل بدل ما تشغّله.",
            "debugpy سامع على البورت ده (منشور من الـ container).",
            "فولدر المشروع عندك = /app جوه الـ container.",
            "نهايتها.",
            "نهاية اللستة.",
            "نهاية الملف."
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
