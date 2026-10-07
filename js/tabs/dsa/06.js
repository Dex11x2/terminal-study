// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "stacks و queues",
      l: 2,
      n: "آخر واحد دخل أول واحد يطلع (stack)، وأول واحد دخل أول واحد يطلع (queue)",
      items: [
        {
          cmd: "stack (matching brackets)",
          title: "الأقواس دي متقفلة صح وبالترتيب؟ زي ({[]})",
          desc: R`كل قوس بيفتح حطه في stack. كل قوس بيقفل لازم يطابق آخر واحد اتفتح (اللي فوق الـ stack)، فاعمله pop وقارن. في الآخر الـ stack لازم يبقى فاضي. [[O(n)]].

ليه stack؟ لأن آخر قوس اتفتح هو أول واحد لازم يتقفل. ده بالظبط LIFO (Last In, First Out).

وفي JS الـ array هي الـ stack: [[push]] و [[pop]] و [[at(-1)]] للي فوق، كلهم [[O(1)]].`,
          example: R`function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
console.log(isValid("({[]})")); // true
console.log(isValid("([)]"));   // false
console.log(isValid("(("));     // false
console.log(isValid("))"));     // false
// O(n) time, O(n) space`,
          try: R`عدّلها ترجّع index أول قوس غلط (أو -1). وبعدين حل: أقل عدد أقواس تضيفها عشان [[())(]] تبقى سليمة (الإجابة 2). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[firstBadIndex(s)]] بترجّع مكان أول قوس غلط أو -1، و [[minAddToMakeValid(s)]].`,
          flag: "script",
          deep: {
            why: "الـ stack هو الـ data structure اللي ورا حاجات بتستخدمها كل يوم: الـ call stack نفسه، و undo في أي editor، وزرار back في المتصفح، والـ parser اللي بيقرا JSON و HTML ويتأكد إن كل حاجة اتقفلت. والمسألة دي أبسط مثال عليه، وبتتسأل كتير.",
            how: R`dry run على ({[]}):

( يفتح: الـ stack فيه (. و { يفتح: فيه ( و {. و [ يفتح: فيه ( و { و [.

] يقفل: pop بيطلّع [، وبيطابق. فاضل ( و {.

} يقفل: pop بيطلّع {، بيطابق. ) يقفل: pop بيطلّع (، بيطابق. الـ stack فاضي: true.

على ([)]: ( و [ اتحطوا. جت ): pop بيطلّع [ ومش بيطابق (: false على طول.

ليه الـ object من القفل للفتح مش العكس؟ لأن لما ييجي قوس قفل محتاج تعرف «المفروض يبقى فوق إيه»، فالقفل هو المفتاح.

و [[ch in pairs]] بتسأل: الحرف ده مفتاح في الـ object؟ يعني قوس قفل. أي حرف تاني (حروف أو أرقام) بيتجاهل.`,
            when: "أقواس وتاجز، وأي «آخر حاجة اتفتحت لازم تتقفل الأول». وكمان حساب expression زي 3 + (4 × 2)، و undo/redo، و DFS من غير recursion.",
            mistakes: R`إنك تعدّ الأقواس بس (عدد الفتح = عدد القفل): ([)] عدّها سليم وهي غلط. وإنك تنسى الـ check الأخير إن الـ stack فاضي ((( هترجع true). وإنك تعتمد على إن [[pop()]] على stack فاضي بترجّع undefined بهدوء: هنا ده شغال لصالحنا، بس في كود تاني ممكن يخبّي bug، فاعمل check صريح لو المعنى مهم.`
          },
          teach: R`## الفكرة في جملة

امشي على الـ string حرف حرف. كل قوس بيفتح حطه فوق الـ stack. كل قوس بيقفل لازم يقابل **آخر** قوس اتفتح، يعني اللي فوق الـ stack: شيله وقارن. لو مطابقش، غلط على طول. ولو خلصت والـ stack فيه حاجة، فيه قوس اتفتح وماتقفلش.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. الكود سطر سطر

~~~js
function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
~~~

### [[const pairs = { ")": "(", "]": "[", "}": "{" };]]

object (جدول مفتاح وقيمة). المفتاح قوس **القفل**، والقيمة قوس **الفتح** بتاعه. ليه بالاتجاه ده؟ لأن السؤال اللي هنسأله دايمًا بييجي لما نقابل قوس قفل: «القوس ده المفروض يقفل مين؟». فـ [[pairs["]"]]] بترجّع [["["]].

### [[const stack = [];]]

array فاضية هنستخدمها كـ stack. الـ stack (كومة أطباق) ليه عمليتين بس: [[push]] تحط فوق، و [[pop]] تشيل اللي فوق وترجّعه. ده اسمه LIFO = Last In, First Out: آخر واحد دخل أول واحد يطلع. الاتنين [[O(1)]] لأنهم بيشتغلوا على آخر الـ array بس.

### [[for (const ch of s)]]

[[for...of]] بتمشي على الـ string حرف حرف، و [[ch]] (اختصار character) هو الحرف الحالي.

### [[if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);]]

[[||]] معناها «أو». لو الحرف قوس بيفتح من أي نوع، حطه فوق الـ stack. لسه مش عارفين مين هيقفله، فبنستنى.

### [[else if (ch in pairs)]]

[[in]] بتسأل: الحرف ده **مفتاح** في الـ object؟ جرّبناها: [[")" in pairs]] طلعت [[true]]، و [["a" in pairs]] طلعت [[false]]. يعني الفرع ده للأقواس اللي بتقفل بس، وأي حرف تاني (حرف أو رقم) مبيدخلش أي فرع، فبيتجاهل.

### [[if (stack.pop() !== pairs[ch]) return false;]]

ده قلب الحل، ويتقرا من جوه لبرة:

1. [[stack.pop()]]: شيل آخر قوس اتفتح.
2. [[pairs[ch]]]: القوس اللي المفروض يكون اتفتح.
3. [[!==]]: لو مختلفين، الترتيب غلط: [[return false]] ونخرج من الدالة كلها على طول.

ولو الـ stack فاضي؟ [[[].pop()]] بترجّع [[undefined]] (جرّبناها)، و [[undefined]] عمره ما هيساوي قوس، فبترجع [[false]] صح.

### [[return stack.length === 0;]]

خلصنا الحروف. لو الـ stack فاضي، كل قوس اتفتح اتقفل: [[true]]. لو فيه حاجة، فيه أقواس فاضلة مفتوحة: [[false]].

---

## ٢. التتبع على [["{[]()}"]] (سليمة)

| الحرف | العملية | اللي طلع من pop | المفروض | الـ stack بعدها |
|---|---|---|---|---|
| { | push | | | [ { ] |
| [ | push | | | [ {, [ ] |
| ] | pop | [ | [ | [ { ] |
| ( | push | | | [ {, ( ] |
| ) | pop | ( | ( | [ { ] |
| } | pop | { | { | [ ] |
| النهاية | | | | فاضي: [[true]] |

لاحظ إن الـ stack مكبرش عن عنصرين: الـ [ اتقفلت قبل ما الـ ( تيجي.

## ٣. التتبع على [["a(]"]] (غلط)

| الحرف | العملية | اللي طلع | المفروض | النتيجة |
|---|---|---|---|---|
| a | مش قوس، اتجاهل | | | [ ] |
| ( | push | | | [ ( ] |
| ] | pop | ( | [ | مختلفين: [[false]] |

وعلى [["]"]] لوحدها: الـ pop طلّع [[undefined]] والمفروض [ ، فـ [[false]].

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
true
false
false
false
~~~

- [["({[]})"]]: متداخلين صح، [[true]].
- [["([)]"]]: الـ ) جت والـ [ هي اللي فوق، [[false]] عند الحرف التالت.
- [["(("]]: مفيش ولا قفلة، الـ loop خلص والـ stack فيه اتنين، [[false]] من السطر الأخير.
- [["))"]]: أول قفلة لقت الـ stack فاضي، [[false]].

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | كل حرف بيتلمس مرة، وكل عملية عليه ([[push]] أو [[pop]] أو [[in]]) [[O(1)]] |
| الذاكرة | [[O(n)]] | أسوأ حالة كل الحروف فتح زي [["(((("]]، فالـ stack بيشيلهم كلهم |

---

## الخلاصة

~~~text
pairs     قفل ← فتح، عشان السؤال بييجي عند القفل
فتح       push
قفل       pop وقارن بـ pairs[ch]، ولو مختلف false على طول
آخر سطر   الـ stack لازم يبقى فاضي
~~~

> أي مسألة فيها «آخر حاجة اتفتحت لازم تتقفل الأول» هي stack. عدّ الأقواس لوحده مش كفاية: [["([)]"]] عددها سليم وترتيبها غلط.`,
          lines: [
            "true لو كل الأقواس متقفلة صح.",
            "كل قوس قفل ← القوس اللي بيفتحه.",
            "الـ stack: الأقواس المفتوحة اللي لسه متقفلتش.",
            "حرف حرف.",
            "قوس بيفتح: حطه فوق.",
            "قوس بيقفل...",
            "...لازم اللي فوق يبقى نفس النوع. [[pop]] على stack فاضي بترجّع undefined، فبيفشل صح.",
            "قفلة.",
            "قفلة.",
            "لو فاضل حاجة مفتوحة، يبقى غلط.",
            "قفلة.",
            "متداخلين صح.",
            "الـ ) جت والـ [ لسه مفتوح فوقها.",
            "فتح من غير قفل.",
            "قفل من غير فتح."
          ],
          sol: R`index أول قوس غلط: خزّن الـ indexes في الـ stack بدل الحروف. لو قفلة ملهاش فتحة أو مش مناسبة، رجّع مكانها. ولو الـ loop خلص والـ stack فيه حاجة، رجّع [[stack[0]]] (أول فتحة ماتقفلتش). النتايج: [[-1]] لـ ({[]})، و 2 لـ ([)]، و 0 لـ ((.

أقل إضافة: مع نوع واحد من الأقواس مش محتاج stack، عداد كفاية. [[open]] بيزيد مع كل فتحة وبيقل مع كل قفلة، ولو جت قفلة و [[open]] صفر زوّد [[add]]. الإجابة [[add + open]]، و ())( تطلع 2. [[O(n)]] time و [[O(1)]] space.

الغلطة المشهورة: تكتفي بـ [[open]] وتخليه ينزل تحت الصفر. كده ( و ) بيلغوا بعض حتى لو القفلة جت قبل الفتحة، فـ ")(" تطلع 0 وهي محتاجة 2.`,
          solCode: R`function firstBadIndex(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(" || ch === "[" || ch === "{") stack.push(i);
    else if (ch in pairs) {
      if (!stack.length || s[stack.pop()] !== pairs[ch]) return i;
    }
  }
  return stack.length ? stack[0] : -1;
}
console.log(firstBadIndex("({[]})")); // -1
console.log(firstBadIndex("([)]"));   // 2
console.log(firstBadIndex("(("));     // 0  (never closed)
console.log(firstBadIndex("a)"));     // 1
function minAddToMakeValid(s) {
  let open = 0, add = 0;
  for (const ch of s) {
    if (ch === "(") open++;
    else if (open > 0) open--;
    else add++;
  }
  return add + open;
}
console.log(minAddToMakeValid("())("));  // 2
console.log(minAddToMakeValid("((("));   // 3
console.log(minAddToMakeValid("()"));    // 0
// firstBadIndex: O(n) time, O(n) space; minAdd: O(n) time, O(1) space (one kind of bracket needs only a counter)`,
          check: {
            lang: "js",
            starter: R`function firstBadIndex(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = []; // خزّن الـ indexes مش الحروف
  return -1;
}
function minAddToMakeValid(s) {
  let open = 0, add = 0;
  // ...
  return add + open;
}`,
            tests: R`test("'({[]})' ← -1", () => expect(firstBadIndex("({[]})")).toBe(-1));
test("'([)]' ← 2 (القفلة مش مناسبة)", () => expect(firstBadIndex("([)]")).toBe(2));
test("'((' ← 0 (أول فتحة ماتقفلتش)", () => expect(firstBadIndex("((")).toBe(0));
test("'())' ← 2 و ')(' ← 0", () => expect([firstBadIndex("())"), firstBadIndex(")(")]).toEqual([2, 0]));
test("أي حرف تاني بيتجاهل: 'a(b)c' ← -1", () => expect(firstBadIndex("a(b)c")).toBe(-1));
test("minAddToMakeValid('())(') ← 2", () => expect(minAddToMakeValid("())(")).toBe(2));
test("')(' ← 2 مش 0: open مينزلش تحت الصفر", () => expect(minAddToMakeValid(")(")).toBe(2));
test("'' ← 0 و '(((' ← 3", () => expect([minAddToMakeValid(""), minAddToMakeValid("(((")]).toEqual([0, 3]));`,
            solution: R`function firstBadIndex(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(" || ch === "[" || ch === "{") stack.push(i);
    else if (ch in pairs) {
      if (!stack.length || s[stack.at(-1)] !== pairs[ch]) return i;
      stack.pop();
    }
  }
  return stack.length ? stack[0] : -1;
}
function minAddToMakeValid(s) {
  let open = 0, add = 0;
  for (const ch of s) {
    if (ch === "(") open++;
    else if (ch === ")") {
      if (open > 0) open--;
      else add++;
    }
  }
  return add + open;
}`
          }
        },
        {
          cmd: "min stack",
          title: "stack بيرجّع أصغر رقم فيه في أي لحظة في O(1)",
          desc: R`جنب الـ stack الأساسي، stack تاني [[mins]] كل خانة فيه = أصغر رقم من أول الـ stack لحد الخانة دي. مع كل push تحط الأصغر بين الجديد وآخر خانة في [[mins]]، ومع كل pop تشيل من الاتنين. [[getMin]] = اللي فوق [[mins]]. كل العمليات [[O(1)]].

الحل البديهي تدوّر على الأصغر بـ loop مع كل [[getMin]]: [[O(n)]]. أو تخزّن الأصغر في متغير واحد، بس لما تعمل pop للأصغر نفسه، مش هتعرف مين اللي بعده.

الـ stack التاني بيحفظ «التاريخ»: لكل ارتفاع للـ stack، الأصغر كان مين.`,
          example: R`class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    this.mins.push(this.mins.length ? Math.min(x, this.mins.at(-1)) : x);
  }
  pop() { this.mins.pop(); return this.items.pop(); }
  getMin() { return this.mins.at(-1); }
}
const st = new MinStack();
st.push(5); st.push(2); st.push(7); st.push(1);
console.log(st.getMin());           // 1
console.log(st.pop(), st.getMin()); // 1 2
console.log(st.pop(), st.getMin()); // 7 2
// push, pop and getMin are all O(1) time; O(n) extra space for mins`,
          try: R`ضيف [[top()]] و [[size]]. وبعدين حل النسخة الموفّرة: خزّن في mins بس لما الجديد ≤ الأصغر الحالي، وفي pop شيل من mins بس لو العنصر اللي خارج = الأصغر. ليه لازم ≤ مش <؟ (جرّب push 2 و push 2 و pop). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[top()]] و [[size]] والنسخة الموفّرة (بتبص على [[mins]]).`,
          flag: "script",
          deep: {
            why: "سؤال بيختبر إزاي تصمّم data structure بعمليات O(1) بإنك تدفع ذاكرة. ونفس الفكرة («خزّن معلومة زيادة مع كل عنصر») بتتكرر كتير: max stack، و undo بحالة كاملة، وقوايم بتحفظ المجموع لحد كل عنصر.",
            how: R`dry run: push 5 و 2 و 7 و 1:

push 5: items [5]، و mins [5]. push 2: items [5, 2]، و mins [5, 2]. push 7: الأصغر بين 7 و 2 هو 2، و mins [5, 2, 2]. push 1: mins [5, 2, 2, 1].

getMin: آخر خانة = 1.

pop: شلنا 1 من items و 1 من mins. دلوقتي آخر خانة في mins = 2، وده فعلًا أصغر رقم في [5, 2, 7].

pop تاني: شلنا 7 من items و 2 (الخانة التالتة) من mins. آخر خانة 2، وده الأصغر في [5, 2].

الخانة i في mins بتجاوب «لو الـ stack ارتفاعه i + 1، الأصغر مين؟». وبما إن الـ stack بيتغير من فوق بس، الإجابة دي عمرها ما بتتغير لما تضيف أو تشيل فوقها.

الذاكرة [[O(n)]] زيادة. النسخة الموفّرة بتخزّن في mins بس لما الأصغر يتغير، بس أسوأ حالة (أرقام نازلة) برضه [[O(n)]].`,
            when: "أي data structure مطلوب منها «الأصغر أو الأكبر لحد دلوقتي» مع إضافة وحذف من ناحية واحدة. وفي الانترفيو: أي «صمّم class عملياته O(1)».",
            mistakes: R`إنك تخزّن الأصغر في متغير واحد وتنسى إنه لما يتشال مش هتعرف اللي بعده. وفي النسخة الموفّرة إنك تستخدم [[<]] بدل [[<=]]: لو الأصغر اتضاف مرتين وشلت واحدة، هتشيله من mins وهو لسه موجود. وإنك تنسى تعمل pop من mins مع كل pop. و [[getMin]] على stack فاضي: اتفق مع الانترفيوير هترجّع إيه (undefined أو error).`
          },
          teach: R`## الفكرة في جملة

مع كل عنصر بتحطه في الـ stack، احفظ جنبه «أصغر رقم في الـ stack لحد هنا». كده [[getMin]] مجرد قراية لآخر خانة، مهما كان فيه عناصر. والسبب إن الـ stack بيتغيّر من فوق بس: الخانات اللي تحت عمرها ما بتتغيّر، فالأصغر اللي اتحفظ جنبها بيفضل صح.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] في [[push]] و [[pop]] يطبع الـ array الاتنين.

---

## ١. الكود سطر سطر

~~~js
class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    this.mins.push(this.mins.length ? Math.min(x, this.mins.at(-1)) : x);
  }
  pop() { this.mins.pop(); return this.items.pop(); }
  getMin() { return this.mins.at(-1); }
}
~~~

### [[class MinStack]] و [[constructor()]]

[[class]] قالب بنعمل منه objects بـ [[new MinStack()]]. و [[constructor]] دالة بتشتغل مرة واحدة وقت الـ [[new]]، وبتجهّز الـ object. [[this]] معناها «الـ object ده نفسه».

- [[this.items]]: الـ stack الحقيقي.
- [[this.mins]]: stack تاني **بنفس الطول دايمًا**. الخانة رقم i فيه = أصغر رقم في [[items]] من الخانة 0 لحد الخانة i.

### [[push(x)]]

1. [[this.items.push(x)]]: حط العنصر عادي.
2. [[this.mins.length ? ... : x]]: ده الـ ternary operator، يعني [[شرط ? لو صح : لو غلط]]. الشرط [[this.mins.length]]: لو 0 يتحسب false (الـ stack كان فاضي)، فالأصغر هو x نفسه.
3. لو مش فاضي: [[Math.min(x, this.mins.at(-1))]]. [[at(-1)]] بترجّع آخر عنصر في الـ array (السالب بيعدّ من الآخر). يعني الأصغر الجديد = الأصغر بين x والأصغر القديم.

### [[pop()]]

[[this.mins.pop()]] الأول عشان الاتنين يفضلوا نفس الطول، وبعدين [[return this.items.pop()]] بيشيل العنصر ويرجّعه. لو نسيت تشيل من [[mins]]، هيفضل فيها أصغر قديم لعنصر مش موجود.

### [[getMin()]]

[[this.mins.at(-1)]]: آخر خانة في [[mins]] = أصغر رقم في الـ stack كله دلوقتي. ولو الـ stack فاضي بترجع [[undefined]] (جرّبناها).

---

## ٢. التتبع: push 4 و 9 و 3 و 8، وبعدين 3 مرات pop

| العملية | items | mins | getMin |
|---|---|---|---|
| push 4 | [4] | [4] | 4 |
| push 9 | [4, 9] | [4, **4**] | 4 |
| push 3 | [4, 9, 3] | [4, 4, **3**] | 3 |
| push 8 | [4, 9, 3, 8] | [4, 4, 3, **3**] | 3 |
| pop ← 8 | [4, 9, 3] | [4, 4, 3] | 3 |
| pop ← 3 | [4, 9] | [4, 4] | 4 |
| pop ← 9 | [4] | [4] | 4 |

ركّز في سطر «pop ← 3»: الـ 3 كانت هي الأصغر واتشالت. لو كنا حافظين الأصغر في متغير واحد، مكناش هنعرف الأصغر اللي بعدها مين. هنا الإجابة (4) كانت محفوظة جاهزة في الخانة اللي تحتها.

---

## ٣. الناتج الكامل للمثال

~~~js
const st = new MinStack();
st.push(5); st.push(2); st.push(7); st.push(1);
console.log(st.getMin());
console.log(st.pop(), st.getMin());
console.log(st.pop(), st.getMin());
~~~

~~~text الناتج (Node 24 على ويندوز)
1
1 2
7 2
~~~

بعد الـ 4 push: items = [5, 2, 7, 1] و mins = [5, 2, 2, 1]. أول pop طلّع 1 والأصغر رجع 2، وتاني pop طلّع 7 والأصغر لسه 2. و [[console.log]] لما تاخد كذا قيمة بتطبعهم في سطر واحد بينهم مسافة.

---

## ٤. الـ Big-O وليه

| العملية | الوقت | السبب |
|---|---|---|
| push | [[O(1)]] | push على آخر array مرتين و [[Math.min]] على رقمين |
| pop | [[O(1)]] | pop مرتين |
| getMin | [[O(1)]] | قراية آخر خانة، من غير ما نلف على حاجة |
| الذاكرة | [[O(n)]] زيادة | [[mins]] طولها نفس طول [[items]] |

يعني دفعنا ذاكرة (array تانية) عشان نكسب وقت: الحل البديهي اللي بيلف على الـ stack كله في كل [[getMin]] بياخد [[O(n)]].

---

## الخلاصة

~~~text
items       الـ stack نفسه
mins[i]     أصغر رقم من الخانة 0 لحد i
push        mins.push(min(x, آخر mins))، أو x لو فاضي
pop         شيل من الاتنين مع بعض
getMin      mins.at(-1)
~~~

> الفكرة العامة: «خزّن مع كل عنصر معلومة محسوبة لحد هنا». نفس الحيلة بتعمل max stack أو مجموع لحد كل خانة.`,
          lines: [
            "stack عادي ومعاه أصغر رقم في O(1).",
            "اتنين array: العناصر، والأصغر عند كل ارتفاع.",
            "إضافة.",
            "حط العنصر.",
            "الأصغر الجديد = الأصغر بين x وآخر خانة في mins (أو x لو الـ stack كان فاضي).",
            "قفلة.",
            "شيل من الاتنين مع بعض عشان يفضلوا متزامنين، ورجّع العنصر.",
            "الأصغر = آخر خانة في mins.",
            "قفلة الـ class.",
            "stack جديد.",
            "items بقت [5, 2, 7, 1]، و mins بقت [5, 2, 2, 1].",
            "الأصغر 1.",
            "شلنا 1، فرجع الأصغر 2.",
            "شلنا 7، والأصغر لسه 2."
          ],
          sol: R`[[top()]] هي [[this.items.at(-1)]]، و [[size]] getter بيرجّع [[this.items.length]]. بعد push 5 و 2 و 7 و 2، [[mins]] بتبقى [[[5, 2, 2]]] بس، والـ 7 مش متخزنة لأنها مش أصغر.

ليه [[<=]]؟ لو استخدمت [[<]]، الـ 2 التانية مش هتتخزن في mins، فتبقى [[[5, 2]]]. أول pop بيطلّع 2، وبما إنه = الأصغر، بيشيل الـ 2 الوحيدة من mins. فـ getMin هترجع 5 مع إن فيه 2 لسه في الـ stack. مع [[<=]] الإجابة الصح 2. كل العمليات [[O(1)]].

الغلطة المشهورة: تفتكر إن النسخة دي بتوفّر دايمًا. في input نازل (5، 4، 3، ...) كل عنصر بيتخزن مرتين، فأسوأ حالة [[O(n)]] space زي الأولى.`,
          solCode: R`class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)) this.mins.push(x);
  }
  pop() {
    const x = this.items.pop();
    if (x === this.mins.at(-1)) this.mins.pop();
    return x;
  }
  top() { return this.items.at(-1); }
  get size() { return this.items.length; }
  getMin() { return this.mins.at(-1); }
}
const st = new MinStack();
st.push(5); st.push(2); st.push(7); st.push(2);
console.log(st.top(), st.size, st.getMin(), st.mins); // 2 4 2 [5, 2, 2]
st.pop();
console.log(st.getMin()); // 2  (with < instead of <=, mins would be [5, 2], the pop removes that 2, and this prints 5)
st.pop(); st.pop();
console.log(st.getMin(), st.size); // 5 1
// all operations O(1); mins holds only the new records, O(n) in the worst case (a decreasing input)`,
          check: {
            lang: "js",
            starter: R`class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    this.mins.push(this.mins.length ? Math.min(x, this.mins.at(-1)) : x);
  }
  pop() { this.mins.pop(); return this.items.pop(); }
  getMin() { return this.mins.at(-1); }
}`,
            tests: R`test("push 5 و 2 و 7 و 1: getMin ← 1، وبعد pop ← 2", () => {
  const st = new MinStack();
  [5, 2, 7, 1].forEach(x => st.push(x));
  expect(st.getMin()).toBe(1);
  expect([st.pop(), st.getMin()]).toEqual([1, 2]);
});
test("top() و size", () => {
  const st = new MinStack();
  st.push(4); st.push(9);
  expect([st.top(), st.size]).toEqual([9, 2]);
});
test("الموفّرة: بعد push 5 و 2 و 7 و 2، الـ mins فيها [5, 2, 2] بس", () => {
  const st = new MinStack();
  [5, 2, 7, 2].forEach(x => st.push(x));
  expect(st.mins).toEqual([5, 2, 2]);
});
test("ليه <= مش <: push 2 و push 2 و pop ← getMin لسه 2", () => {
  const st = new MinStack();
  st.push(2); st.push(2); st.pop();
  expect(st.getMin()).toBe(2);
});
test("stack فاضي: getMin و top ← undefined و size ← 0", () => {
  const st = new MinStack();
  expect([st.getMin(), st.top(), st.size]).toEqual([undefined, undefined, 0]);
});`,
            solution: R`class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)) this.mins.push(x);
  }
  pop() {
    const x = this.items.pop();
    if (x === this.mins.at(-1)) this.mins.pop();
    return x;
  }
  getMin() { return this.mins.at(-1); }
  top() { return this.items.at(-1); }
  get size() { return this.items.length; }
}`
          }
        },
        {
          cmd: "monotonic stack",
          title: "لكل رقم في الـ array، أول رقم أكبر منه على يمينه",
          desc: R`امشي من الشمال لليمين ومعاك stack فيه indexes لسه «مستنية» حد أكبر منها. لما ييجي رقم جديد، طول ما هو أكبر من اللي فوق الـ stack، يبقى هو الإجابة بتاعته: اعمل pop وسجّل. وبعدين حط الجديد. [[O(n)]].

الـ stack ده قيمه دايمًا نازلة من تحت لفوق (monotonic)، لأن أي رقم أصغر من الجديد بيتشال قبل ما الجديد يتحط.

ليه [[O(n)]] مع إن فيه while جوه for؟ لأن كل index بيدخل الـ stack مرة ويطلع مرة بالكتير. المجموع 2n عملية.`,
          example: R`function nextGreater(a) {
  const res = new Array(a.length).fill(-1);
  const stack = [];
  for (let i = 0; i < a.length; i++) {
    while (stack.length && a[stack.at(-1)] < a[i]) {
      res[stack.pop()] = a[i];
    }
    stack.push(i);
  }
  return res;
}
console.log(nextGreater([2, 1, 2, 4, 3])); // [4, 2, 4, -1, -1]
console.log(nextGreater([5, 4, 3]));       // [-1, -1, -1]
console.log(nextGreater([]));              // []
// O(n) time (every index is pushed and popped at most once), O(n) space`,
          try: R`حل daily temperatures: لكل يوم، كام يوم لحد ما الحرارة تبقى أعلى؟ [73, 74, 75, 71, 69, 72, 76, 73] ترجع [1, 1, 4, 2, 1, 1, 0, 0]. (نفس الكود، بس سجّل الفرق بين الـ indexes بدل القيمة، والافتراضي 0). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[dailyTemperatures]].`,
          flag: "script",
          deep: {
            why: "الـ monotonic stack بيحل عيلة كاملة من المسائل في O(n) بدل O(n^2): أول أكبر أو أصغر على اليمين أو الشمال، وأيام لحد درجة حرارة أعلى، وأكبر مستطيل في histogram، و stock span. الحل البديهي لكل عنصر بيدوّر على يمينه: O(n^2).",
            how: R`dry run على [2, 1, 2, 4, 3]:

i = 0 (2): الـ stack فاضي. حط 0.

i = 1 (1): اللي فوق قيمته 2، و 1 مش أكبر. حط 1. الـ stack فيه 0 و 1 (قيمهم 2 و 1، نازلة).

i = 2 (2): اللي فوق (index 1) قيمته 1 أصغر من 2: إجابته 2، pop. اللي فوق دلوقتي (index 0) قيمته 2، مش أصغر من 2. حط 2.

i = 3 (4): index 2 قيمته 2 أصغر: إجابته 4. و index 0 قيمته 2 أصغر: إجابته 4. الـ stack فضي، حط 3.

i = 4 (3): اللي فوق قيمته 4، مش أصغر. حط 4. خلصنا، و index 3 و 4 فضلوا بـ -1.

ليه نخزّن indexes مش قيم؟ عشان نعرف نكتب الإجابة فين في res، ولو المطلوب مسافة (daily temperatures) نحسبها من الـ index.

لو المطلوب «أول أصغر»، اعكس المقارنة. ولو «على الشمال»، امشي من اليمين للشمال. ولو الـ array دايرية (circular)، لف مرتين واستخدم [[i % n]].`,
            when: "أي «أول عنصر أكبر أو أصغر من ده» أو «لحد إمتى القيمة دي هتفضل الأكبر». ولما تلاقي نفسك بتكتب loop جوه loop بيدوّر على اليمين لحد ما يلاقي حاجة أكبر.",
            mistakes: R`إنك تخزّن القيم بدل الـ indexes فمتعرفش تسجّل الإجابة فين. وإنك تستخدم [[<=]] بدل [[<]] من غير ما تفكر: مع أرقام متساوية ده بيغيّر المعنى بين «أكبر» و «أكبر أو يساوي». وإنك تقول الـ Big-O [[O(n^2)]] بسبب الـ while جوه الـ for: عدّ العمليات على كل عنصر، مش شكل الـ loops.`
          },
          teach: R`## الفكرة في جملة

امشي من الشمال لليمين، ومعاك stack فيه indexes لعناصر لسه **مستنية** حد أكبر منها. كل عنصر جديد بيبص على اللي فوق الـ stack: طول ما الجديد أكبر، يبقى هو الإجابة بتاعته، فشيله وسجّل. وبعدين الجديد نفسه يدخل يستنى.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الـ stack و [[res]].

---

## ١. الكود سطر سطر

~~~js
function nextGreater(a) {
  const res = new Array(a.length).fill(-1);
  const stack = [];
  for (let i = 0; i < a.length; i++) {
    while (stack.length && a[stack.at(-1)] < a[i]) {
      res[stack.pop()] = a[i];
    }
    stack.push(i);
  }
  return res;
}
~~~

### [[const res = new Array(a.length).fill(-1);]]

[[new Array(n)]] بتعمل array طولها n بس خاناتها فاضية، و [[fill(-1)]] بتملاها كلها بـ -1. جرّبناها بـ 3 وطلعت [[[ -1, -1, -1 ]]]. ليه -1 من الأول؟ لأن أي عنصر محدش هيلاقيله إجابة هيفضل كده، فمش محتاجين نعدّي في الآخر نكتبها.

### [[const stack = [];]]

بنحط فيه **indexes** مش قيم. ليه؟ لأن لما نلاقي الإجابة لازم نعرف نكتبها في أنهي خانة في [[res]]. والقيمة نفسها بنجيبها بـ [[a[index]]].

### [[for (let i = 0; i < a.length; i++)]]

لفة على كل index من الشمال لليمين. [[a[i]]] هو «العنصر الجديد».

### [[while (stack.length && a[stack.at(-1)] < a[i])]]

من جوه لبرة:

1. [[stack.at(-1)]]: الـ index اللي فوق الـ stack.
2. [[a[...]]]: قيمته.
3. [[< a[i]]]: أصغر من الجديد؟
4. [[stack.length &&]]: الأول اتأكد إن الـ stack مش فاضي. [[&&]] بتقف عند أول false، فلو فاضي مش هنقرا [[at(-1)]] أصلًا.

[[while]] مش [[if]]: الجديد ممكن يبقى الإجابة لكذا واحد مستني ورا بعض.

### [[res[stack.pop()] = a[i];]]

[[stack.pop()]] بيشيل الـ index اللي فوق ويرجّعه، وبنستخدمه على طول كمكان في [[res]]. والإجابة هي قيمة الجديد [[a[i]]].

### [[stack.push(i);]]

بعد ما الجديد خلّص على كل اللي أصغر منه، يدخل هو يستنى حد أكبر منه.

---

## ٢. التتبع على [[[4, 2, 1, 3, 6]]]

القيم بين قوسين جنب كل index.

| i (القيمة) | اللي اتشال وإجابته | الـ stack بعدها (indexes) | قيمهم | res |
|---|---|---|---|---|
| 0 (4) | | [0] | [4] | [-1, -1, -1, -1, -1] |
| 1 (2) | 2 مش أكبر من 4 | [0, 1] | [4, 2] | [-1, -1, -1, -1, -1] |
| 2 (1) | 1 مش أكبر من 2 | [0, 1, 2] | [4, 2, 1] | [-1, -1, -1, -1, -1] |
| 3 (3) | index 2 (1) ← 3، و index 1 (2) ← 3 | [0, 3] | [4, 3] | [-1, 3, 3, -1, -1] |
| 4 (6) | index 3 (3) ← 6، و index 0 (4) ← 6 | [4] | [6] | [6, 3, 3, 6, -1] |

- عند i = 3: الـ while لفّت مرتين وشالت اتنين، ووقفت عند الـ 4 لأن 4 مش أصغر من 3.
- عمود «قيمهم» دايمًا **نازل** من الشمال لليمين (من تحت لفوق). ده معنى monotonic: أي حاجة أصغر من الجديد بتتشال قبل ما يدخل.
- الـ 6 فضلت في الـ stack في الآخر، فإجابتها -1 من الـ [[fill]].

الناتج [[[ 6, 3, 3, 6, -1 ]]].

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 4, 2, 4, -1, -1 ]
[ -1, -1, -1 ]
[]
~~~

- [[[2, 1, 2, 4, 3]]]: الـ 2 الأولى إجابتها 4 مش 2 التانية، لأن الشرط [[<]] («أكبر» مش «أكبر أو يساوي»).
- [[[5, 4, 3]]]: نازلة، الـ while مبتلفّش أبدًا، وكله -1.
- [[[]]]: الـ for مبتلفّش.

---

## ٤. الـ Big-O وليه

فيه while جوه for، فليه مش [[O(n^2)]]؟ عدّ الشغل على كل index بدل ما تبص على شكل الـ loops: كل index بيدخل الـ stack **مرة** بالـ [[push]]، وبيطلع **مرة** بالكتير بالـ [[pop]]. يعني كل لفات الـ while مع بعض طول البرنامج كله ≤ n.

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | n push و n pop بالكتير، يعني حوالي 2n عملية |
| الذاكرة | [[O(n)]] | [[res]]، والـ stack ممكن يشيل n في array نازلة |

---

## الخلاصة

~~~text
stack        indexes مستنية إجابة، قيمهم نازلة
while        طول ما الجديد أكبر من اللي فوق: pop وسجّل الجديد إجابته
push(i)      الجديد يدخل يستنى
fill(-1)     اللي ملقاش حد أكبر
Big-O        كل index داخل مرة وخارج مرة: O(n)
~~~

> «أول أصغر» اعكس المقارنة، و «على الشمال» امشي من اليمين. نفس القالب.`,
          lines: [
            "لكل عنصر: أول عنصر أكبر منه على يمينه، أو -1.",
            "الإجابات، وافتراضيًا -1 (مفيش أكبر).",
            "indexes مستنية إجابة. قيمها نازلة من تحت لفوق.",
            "عدّي من الشمال لليمين.",
            "طول ما الجديد أكبر من اللي فوق...",
            "...يبقى الجديد هو الإجابة بتاعته. شيله وسجّل.",
            "قفلة الـ while.",
            "الجديد نفسه مستني حد أكبر منه.",
            "قفلة الـ for.",
            "اللي فضلوا في الـ stack ملهمش أكبر، وقيمتهم -1 من الأول.",
            "قفلة.",
            "2 ← 4، و 1 ← 2، و 2 ← 4، و 4 و 3 مفيش.",
            "نازلة: ولا واحد ليه أكبر على يمينه.",
            "فاضية."
          ],
          sol: R`الناتج [[[1, 1, 4, 2, 1, 1, 0, 0]]]. التعديل: الافتراضي [[fill(0)]]، ولما تعمل pop للـ index [[j]]، سجّل [[res[j] = i - j]] بدل [[a[i]]]. الـ 75 مثلًا (index 2) فضلت في الـ stack لحد 76 (index 6)، فالإجابة 4.

الحل [[O(n)]] time لأن كل index بيدخل الـ stack مرة ويخرج مرة، و [[O(n)]] space. ودرجات متساوية زي [30, 30, 30] ترجع أصفار، لأن الشرط [[<]] مش [[<=]] («أعلى» مش «أعلى أو زي»).

الغلطة المشهورة: تخزّن القيم في الـ stack مش الـ indexes. كده مش هتعرف تحسب المسافة، ومش هتعرف تكتب في [[res]] مكان مين.`,
          solCode: R`function dailyTemperatures(t) {
  const res = new Array(t.length).fill(0);
  const stack = [];
  for (let i = 0; i < t.length; i++) {
    while (stack.length && t[stack.at(-1)] < t[i]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]).join(" ")); // 1 1 4 2 1 1 0 0
console.log(dailyTemperatures([30, 30, 30]).join(" "));                     // 0 0 0
// O(n) time (each index is pushed and popped once), O(n) space`,
          check: {
            lang: "js",
            starter: R`function dailyTemperatures(t) {
  const res = new Array(t.length).fill(0);
  const stack = [];
  // زي nextGreater، بس سجّل res[j] = i - j
  return res;
}`,
            tests: R`test("[73, 74, 75, 71, 69, 72, 76, 73] ← [1, 1, 4, 2, 1, 1, 0, 0]", () => expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]));
test("درجات متساوية ← أصفار (أعلى مش أعلى أو زي)", () => expect(dailyTemperatures([30, 30, 30])).toEqual([0, 0, 0]));
test("[30, 40, 50, 60] ← [1, 1, 1, 0]", () => expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0]));
test("[] ← []", () => expect(dailyTemperatures([])).toEqual([]));
test("3000 يوم نازلين وبعدهم يوم حر (O(n): كل index بيدخل ويخرج مرة)", () => {
  const t = [...Array.from({ length: 3000 }, (_, i) => 3000 - i), 5000];
  const r = dailyTemperatures(t);
  expect([r[0], r[2999], r[3000]]).toEqual([3000, 1, 0]);
});`,
            solution: R`function dailyTemperatures(t) {
  const res = new Array(t.length).fill(0);
  const stack = [];
  for (let i = 0; i < t.length; i++) {
    while (stack.length && t[stack.at(-1)] < t[i]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}`
          }
        },
        {
          cmd: "queue و deque",
          title: "طابور أول واحد يدخل أول واحد يطلع، سريع في JS (وليه shift بطيء؟)",
          desc: R`[[shift()]] بتشيل أول عنصر وبتحرّك كل الباقي خطوة لورا، فهي [[O(n)]]. طابور بـ push و shift على مئات الآلاف من العناصر بيبقى [[O(n^2)]]. الحل: خزّن العناصر في object ومعاك رقمين، [[head]] و [[tail]]. الإضافة عند tail والطلوع من head، الاتنين [[O(1)]].

الـ queue هو FIFO (First In, First Out)، وده اللي بيحتاجه BFS، وطوابير الـ jobs، و rate limiting.

والـ deque (double-ended queue) بتضيف وتشيل من الناحيتين. نفس فكرة head و tail، بس head ينفع ينزل بالسالب. و JS مفيهاش queue أو deque جاهزين.`,
          example: R`class Queue {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  enqueue(x) { this.items[this.tail++] = x; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  get size() { return this.tail - this.head; }
}
const q = new Queue();
q.enqueue("a"); q.enqueue("b"); q.enqueue("c");
console.log(q.dequeue(), q.dequeue(), q.size); // a b 1
// enqueue and dequeue are O(1); Array.prototype.shift is O(n) because every item moves down one index`,
          try: R`قيس الفرق: ١٠٠ ألف عنصر بـ push و shift، وبعدين بالـ Queue دي، بـ [[console.time]]. وبعدين حوّلها deque: ضيف [[pushFront]] (بتقلّل head وتكتب فيه) و [[popBack]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[Deque]] بالأربع عمليات و [[size]].`,
          flag: "script",
          deep: {
            why: "BFS، وطابور مهام (إيميلات بتتبعت واحد واحد)، و sliding window maximum، كلهم queue. ولو كتبته بـ shift الكود هيشتغل في التجربة ويبقى بطيء جدًا على بيانات حقيقية. قياس على Node 24: تفضية array فيها ١٠٠ ألف عنصر بـ shift خدت حوالي ٠.٧ ثانية، و ٤٠٠ ألف خدت أكتر من ٤٠ ثانية. ده شكل O(n^2).",
            how: R`ليه shift بطيء؟ الـ array بلوك متصل، والعنصر رقم i لازم يبقى في الخانة i. لما تشيل الأول، كل عنصر لازم يتنقل خانة لورا عشان الـ indexes تفضل صح. ده n عملية. V8 عنده تحسينات في حالات معينة، بس القياس فوق بيقول إن الطابور الكبير بـ shift بيبقى [[O(n^2)]] فعلًا.

الحل بالـ head و tail: العناصر مبتتحركش أبدًا. «أول الطابور» مجرد رقم بيزيد. الـ object هنا شغال كأنه Map من رقم لقيمة، و [[delete]] بيسيب الذاكرة تتحرر.

بديل أبسط في BFS: array عادية ومتغير [[head]] بيزيد، من غير ما تشيل حاجة: [[const x = queue[head++]]]. العيب إن الذاكرة مبتتحررش لحد ما الـ BFS يخلص، وده عادي في مسائل الانترفيو.

وبديل تاني: circular buffer، array بحجم ثابت والمؤشرات بتلف بـ [[% capacity]]. ده اللي بتستخدمه المكتبات لما الحجم معروف.

الـ deque: نفس الـ object، بس [[pushFront]] بتكتب في [[--this.head]]، والـ head ينفع يبقى سالب عادي لأن مفاتيح الـ object أي رقم. و [[popBack]] بتقرا من [[--this.tail]].`,
            when: "BFS على شجرة أو graph أو grid. أي طابور طلبات أو رسايل بيتعالج بالترتيب. و deque في sliding window maximum ومسائل «الأكبر في كل شباك».",
            mistakes: R`[[shift()]] في BFS على بيانات كبيرة. وإنك تفتكر إن [[unshift]] أحسن: نفس المشكلة من الناحية التانية. وإنك تنسى check الفاضي في dequeue فترجّع undefined وتكمّل كأن فيه عنصر. وفي النسخة بالـ array والـ head من غير مسح: الذاكرة بتفضل محجوزة لكل اللي خرجوا، مش مشكلة في BFS بس مشكلة في طابور شغال على طول في سيرفر.`
          },
          teach: R`## الفكرة في جملة

الطابور (queue) أول واحد يدخل أول واحد يطلع: FIFO = First In, First Out. بدل ما نشيل أول عنصر من array بـ [[shift()]] (ودي بتحرّك كل الباقي)، العناصر بتفضل مكانها، ومعانا رقمين: [[head]] مكان أول واحد في الطابور، و [[tail]] الخانة اللي الجاي هيقف فيها. الدخول بيزوّد [[tail]]، والخروج بيزوّد [[head]]. ولا عنصر بيتحرك.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز.

---

## ١. الكود سطر سطر

~~~js
class Queue {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  enqueue(x) { this.items[this.tail++] = x; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  get size() { return this.tail - this.head; }
}
~~~

### [[constructor()]]

- [[this.items = {}]]: object عادي بنستخدمه كـ «رقم ← قيمة». ليه مش array؟ عشان لما نمسح الخانات اللي في الأول منحتاجش الباقي يتزق لورا.
- [[this.head = 0]]: مكان أول عنصر في الطابور.
- [[this.tail = 0]]: المكان اللي الإضافة الجاية هتتكتب فيه. الاتنين صفر يعني الطابور فاضي.

### [[enqueue(x) { this.items[this.tail++] = x; }]]

enqueue = دخّل الطابور. [[this.tail++]] اسمه post-increment: **بيرجّع القيمة القديمة الأول** وبعدين يزوّد. فلو tail = 5، الكتابة بتحصل في الخانة 5، و tail بيبقى 6. جرّبناها لوحدها: object فاضي و [[t = 5]] و [[o[t++] = "a"]] طلّعت [[{"5":"a"}]] و t بقت 6.

### [[dequeue()]]

dequeue = اطلع من الطابور.

1. [[if (this.head === this.tail) return undefined;]]: لو المؤشرين على نفس الخانة، مفيش حد بينهم: الطابور فاضي.
2. [[const x = this.items[this.head];]]: اقرا أول واحد.
3. [[delete this.items[this.head++];]]: [[delete]] بيشيل المفتاح من الـ object عشان الذاكرة تتحرر. و [[this.head++]] برضه post-increment: بيمسح الخانة القديمة، وبعدها head يتقدم.
4. [[return x;]]: رجّع اللي قريناه.

### [[get size()]]

[[get]] بيخلّي الدالة تتقري زي خاصية من غير قوسين: [[q.size]] مش [[q.size()]]. والعدد = الفرق بين المؤشرين.

---

## ٢. التتبع: enqueue x و y، dequeue، enqueue z، وبعدين 3 مرات dequeue

| العملية | items | head | tail | size |
|---|---|---|---|---|
| البداية | {} | 0 | 0 | 0 |
| enqueue x | {0: x} | 0 | 1 | 1 |
| enqueue y | {0: x, 1: y} | 0 | 2 | 2 |
| dequeue ← x | {1: y} | 1 | 2 | 1 |
| enqueue z | {1: y, 2: z} | 1 | 3 | 2 |
| dequeue ← y | {2: z} | 2 | 3 | 1 |
| dequeue ← z | {} | 3 | 3 | 0 |
| dequeue ← undefined | {} | 3 | 3 | 0 |

لاحظ إن y فضلت في الخانة 1 من أول ما دخلت لحد ما خرجت: ولا عنصر اتنقل. وآخر سطر: head = tail فرجعت [[undefined]] ومحدش اتلمس.

---

## ٣. الناتج الكامل للمثال

~~~js
const q = new Queue();
q.enqueue("a"); q.enqueue("b"); q.enqueue("c");
console.log(q.dequeue(), q.dequeue(), q.size);
~~~

~~~text الناتج (Node 24 على ويندوز)
a b 1
~~~

خرجوا بنفس ترتيب الدخول (a ثم b)، وفضل c لوحده فـ size = 3 - 2 = 1.

---

## ٤. ليه [[shift()]] بطيئة؟ قسناها

الـ array في الذاكرة خانات ورا بعض، والعنصر رقم i لازم يبقى في الخانة i. لما [[shift()]] تشيل الأول، كل عنصر لازم يتنقل خانة لورا عشان الـ indexes تفضل صح: n عملية في كل shift.

قسنا تفضية array بـ [[while (arr.length) arr.shift()]] على Node 24 على ويندوز:

| عدد العناصر | الوقت |
|---|---|
| ١٠٠ ألف | حوالي 0.7 ثانية |
| ٢٠٠ ألف | حوالي 3.3 ثانية |
| ٤٠٠ ألف | حوالي 43.6 ثانية |

لما العدد اتضاعف، الوقت اتضرب في أكتر من ٤: ده شكل [[O(n^2)]]. ونفس الـ ١٠٠ ألف بالـ Queue اللي فوق خدت حوالي 9ms.

---

## ٥. الـ Big-O وليه

| العملية | Queue دي | array بـ push و shift |
|---|---|---|
| إضافة | [[O(1)]]: كتابة في خانة وزيادة رقم | [[O(1)]] |
| طلوع | [[O(1)]]: قراية ومسح وزيادة رقم | [[O(n)]]: كل العناصر بتتحرك |
| n عملية | [[O(n)]] | [[O(n^2)]] |
| الذاكرة | [[O(n)]] للعناصر الموجودة بس، لأن [[delete]] بيمسح اللي خرج | [[O(n)]] |

---

## الخلاصة

~~~text
FIFO       أول واحد دخل أول واحد يطلع
items      object: رقم ← قيمة، ومحدش بيتحرك
tail++     الإضافة في الخانة tail وبعدين tail يزيد
head++     الطلوع من الخانة head وبعدين head يزيد
فاضي       head === tail
size       tail - head
~~~

> JS مفيهاش queue جاهزة. في BFS على بيانات كبيرة متستخدمش [[shift()]]: استخدم الفكرة دي، أو array ومتغير [[head]] بيزيد.`,
          lines: [
            "طابور FIFO.",
            "object للعناصر، و head أول واحد، و tail مكان الإضافة الجاية.",
            "إضافة في الآخر: خانة جديدة و tail يزيد. O(1).",
            "طلوع من الأول.",
            "فاضي: head لحق tail.",
            "أول عنصر.",
            "امسحه عشان الذاكرة، وقدّم head. محدش اتحرك من مكانه.",
            "رجّعه.",
            "قفلة.",
            "العدد = الفرق بين المؤشرين.",
            "قفلة الـ class.",
            "طابور جديد.",
            "تلاتة دخلوا بالترتيب.",
            "أول اتنين خرجوا بنفس الترتيب، وفاضل واحد."
          ],
          sol: R`على ١٠٠ ألف عنصر: [[push]] + [[shift]] أخدت حوالي 700ms على Node 24 على ويندوز، والـ Queue حوالي 10ms. أرقامك هتختلف، بس الفرق كبير لأن [[shift]] ممكن تحرّك كل العناصر خطوة لورا.

الـ deque: [[pushFront(x)]] بتعمل [[this.items[--this.head] = x]] (الـ head ممكن ينزل تحت الصفر، ومفيش مشكلة لأن الـ keys في object). و [[popBack()]] بتعمل [[--this.tail]] وتقرا وتمسح. الأربع عمليات [[O(1)]]. مثال: pushBack b، pushFront a، pushBack c، وبعدين popFront و popBack و popBack يطلّعوا [[a c b]].

الغلطة المشهورة: [[this.items[this.head--] = x]] بدل [[--this.head]]. كده بتكتب فوق أول عنصر موجود، لأن الـ head لسه بيشاور عليه.`,
          solCode: R`class Deque {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  pushBack(x) { this.items[this.tail++] = x; }
  pushFront(x) { this.items[--this.head] = x; }
  popFront() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  popBack() {
    if (this.head === this.tail) return undefined;
    const x = this.items[--this.tail];
    delete this.items[this.tail];
    return x;
  }
  get size() { return this.tail - this.head; }
}
const N = 100_000;
console.time("shift");
const arr = [];
for (let i = 0; i < N; i++) arr.push(i);
let s1 = 0;
while (arr.length) s1 += arr.shift();
console.timeEnd("shift"); // shift: around 700ms on Node 24 (varies)
console.time("queue");
const q = new Deque();
for (let i = 0; i < N; i++) q.pushBack(i);
let s2 = 0;
while (q.size) s2 += q.popFront();
console.timeEnd("queue"); // queue: around 10ms
console.log(s1 === s2); // true
const d = new Deque();
d.pushBack("b"); d.pushFront("a"); d.pushBack("c");
console.log(d.popFront(), d.popBack(), d.popBack(), d.size); // a c b 0
// all four operations O(1); head can go negative, which is fine for object keys`,
          check: {
            lang: "js",
            starter: R`class Deque {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  pushBack(x) { this.items[this.tail++] = x; }
  popFront() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  pushFront(x) {
    // قلّل head الأول وبعدين اكتب
  }
  popBack() {
    // قلّل tail واقرا وامسح
  }
  get size() { return this.tail - this.head; }
}`,
            tests: R`test("pushBack b، pushFront a، pushBack c ← popFront a و popBack c و popBack b", () => {
  const d = new Deque();
  d.pushBack("b"); d.pushFront("a"); d.pushBack("c");
  expect([d.size, d.popFront(), d.popBack(), d.popBack(), d.size]).toEqual([3, "a", "c", "b", 0]);
});
test("--this.head مش this.head--: pushFront متكتبش فوق أول عنصر", () => {
  const d = new Deque();
  d.pushBack(1); d.pushFront(0);
  expect([d.popFront(), d.popFront()]).toEqual([0, 1]);
});
test("فاضي: popFront و popBack ← undefined والـ size يفضل 0", () => {
  const d = new Deque();
  expect([d.popFront(), d.popBack(), d.size]).toEqual([undefined, undefined, 0]);
});
test("١٠٠ ألف pushFront وبعدين popBack بنفس ترتيب الدخول (كله O(1))", () => {
  const d = new Deque();
  for (let i = 0; i < 100000; i++) d.pushFront(i);
  let ok = true;
  for (let i = 0; i < 100000; i++) if (d.popBack() !== i) ok = false;
  expect([ok, d.size]).toEqual([true, 0]);
});`,
            solution: R`class Deque {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  pushBack(x) { this.items[this.tail++] = x; }
  popFront() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  pushFront(x) { this.items[--this.head] = x; }
  popBack() {
    if (this.head === this.tail) return undefined;
    const x = this.items[--this.tail];
    delete this.items[this.tail];
    return x;
  }
  get size() { return this.tail - this.head; }
}`
          }
        }
      ]
    }
]);
