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
            why: "BFS، وطابور مهام (إيميلات بتتبعت واحد واحد)، و sliding window maximum، كلهم queue. ولو كتبته بـ shift الكود هيشتغل في التجربة ويبقى بطيء جدًا على بيانات حقيقية. قياس على Node 24: تفضية array فيها ١٠٠ ألف عنصر بـ shift خدت حوالي نص ثانية، و ٤٠٠ ألف خدت أكتر من ٤٠ ثانية. ده شكل O(n^2).",
            how: R`ليه shift بطيء؟ الـ array بلوك متصل، والعنصر رقم i لازم يبقى في الخانة i. لما تشيل الأول، كل عنصر لازم يتنقل خانة لورا عشان الـ indexes تفضل صح. ده n عملية. V8 عنده تحسينات في حالات معينة، بس القياس فوق بيقول إن الطابور الكبير بـ shift بيبقى [[O(n^2)]] فعلًا.

الحل بالـ head و tail: العناصر مبتتحركش أبدًا. «أول الطابور» مجرد رقم بيزيد. الـ object هنا شغال كأنه Map من رقم لقيمة، و [[delete]] بيسيب الذاكرة تتحرر.

بديل أبسط في BFS: array عادية ومتغير [[head]] بيزيد، من غير ما تشيل حاجة: [[const x = queue[head++]]]. العيب إن الذاكرة مبتتحررش لحد ما الـ BFS يخلص، وده عادي في مسائل الانترفيو.

وبديل تاني: circular buffer، array بحجم ثابت والمؤشرات بتلف بـ [[% capacity]]. ده اللي بتستخدمه المكتبات لما الحجم معروف.

الـ deque: نفس الـ object، بس [[pushFront]] بتكتب في [[--this.head]]، والـ head ينفع يبقى سالب عادي لأن مفاتيح الـ object أي رقم. و [[popBack]] بتقرا من [[--this.tail]].`,
            when: "BFS على شجرة أو graph أو grid. أي طابور طلبات أو رسايل بيتعالج بالترتيب. و deque في sliding window maximum ومسائل «الأكبر في كل شباك».",
            mistakes: R`[[shift()]] في BFS على بيانات كبيرة. وإنك تفتكر إن [[unshift]] أحسن: نفس المشكلة من الناحية التانية. وإنك تنسى check الفاضي في dequeue فترجّع undefined وتكمّل كأن فيه عنصر. وفي النسخة بالـ array والـ head من غير مسح: الذاكرة بتفضل محجوزة لكل اللي خرجوا، مش مشكلة في BFS بس مشكلة في طابور شغال على طول في سيرفر.`
          },
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
          sol: R`على ١٠٠ ألف عنصر: [[push]] + [[shift]] أخدت حوالي 900ms عندي، والـ Queue حوالي 20ms. أرقامك هتختلف، بس الفرق كبير لأن [[shift]] ممكن تحرّك كل العناصر خطوة لورا.

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
console.timeEnd("shift"); // shift: around 900ms on node 22 (varies)
console.time("queue");
const q = new Deque();
for (let i = 0; i < N; i++) q.pushBack(i);
let s2 = 0;
while (q.size) s2 += q.popFront();
console.timeEnd("queue"); // queue: around 20ms
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
    },
    {
      t: "binary search",
      l: 2,
      n: "كل خطوة بتشيل نص الاحتمالات، فمليون عنصر محتاجين ٢٠ خطوة",
      items: [
        {
          cmd: "binary search",
          title: "دوّر على رقم في array مترتبة من غير ما تعدّي عليها كلها",
          desc: R`بص على العنصر اللي في النص: لو هو المطلوب خلاص، لو أصغر يبقى المطلوب في النص اليمين، لو أكبر يبقى في الشمال. كل خطوة بتشيل نص الاحتمالات: [[O(log n)]].

مليون عنصر محتاجين ٢٠ مقارنة بالكتير، ومليار محتاجين ٣٠. عشان كده الـ binary search من أقوى الأدوات، بس شرطه إن البيانات مترتبة.

المهم تفهم الحدود: [[lo]] و [[hi]] الاتنين جوه المنطقة اللي لسه ممكن يكون فيها المطلوب، والـ loop شغال طول ما المنطقة مش فاضية ([[lo <= hi]]).`,
          example: R`function binarySearch(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
const a = [1, 3, 5, 7, 9, 11];
console.log(binarySearch(a, 7));  // 3
console.log(binarySearch(a, 4));  // -1
console.log(binarySearch([], 1)); // -1
// O(log n) time, O(1) space`,
          try: R`اكتبها recursive بـ [[(a, target, lo, hi)]]، وقول الـ space complexity بتاعتها. وبعدين دوّر في array مترتبة واتلفّت زي [4, 5, 6, 7, 0, 1, 2] في O(log n): في كل خطوة، نص واحد على الأقل مترتب. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[bsRec(a, target, lo, hi)]] (والـ lo و hi ليهم قيم افتراضية)، و [[searchRotated(a, target)]].`,
          flag: "script",
          deep: {
            why: "أي بحث في بيانات مترتبة: الـ index في قاعدة البيانات (B-tree بنفس الروح)، و [[git bisect]] اللي بيدوّر على الـ commit اللي بوّظ الكود، والبحث في لوج مترتب بالوقت. والانترفيو بيحبها لأن فيها off-by-one كتير وسهل تتكتب غلط.",
            how: R`dry run على [1, 3, 5, 7, 9, 11] ونبحث عن 7:

lo = 0 و hi = 5، و mid = 2 (قيمته 5). 5 أصغر من 7، فـ lo = 3.

lo = 3 و hi = 5، و mid = 4 (قيمته 9). أكبر، فـ hi = 3.

lo = 3 و hi = 3، و mid = 3 (قيمته 7). لقيناه.

والبحث عن 4: mid = 2 (5) أكبر، فـ hi = 1. mid = 0 (1) أصغر، فـ lo = 1. mid = 1 (3) أصغر، فـ lo = 2. دلوقتي lo = 2 أكبر من hi = 1: المنطقة فاضية، -1.

القاعدة اللي بتمنع الأخطاء: قرّر معنى lo و hi وخليك عليه. هنا الاتنين «شاملين» (المطلوب ممكن يكون عند lo أو عند hi). فالـ loop بـ [[<=]]، والتحديث [[mid + 1]] و [[mid - 1]] لأن mid نفسه اتفحص خلاص.

لو كتبت [[lo = mid]] بدل [[mid + 1]]، لما lo و hi يبقوا جنب بعض، mid هيفضل = lo، والـ loop هيلف للأبد.

و [[lo + Math.floor((hi - lo) / 2)]] بدل [[(lo + hi) / 2]]: في Java و C++ جمع رقمين كبار ممكن يعدّي حد الـ int. في JS الأرقام doubles فمفيش overflow عملي، بس العادة دي بتبان كويس في الانترفيو. وفيه كمان [[(lo + hi) >>> 1]] اللي هتشوفه في الدروس الجاية.`,
            when: "أي بحث في حاجة مترتبة. ولو المطلوب «أول/آخر مكان» أو «يتحط فين» أو «أقل قيمة تحقق شرط»، دي تنويعات عليها (الدروس الجاية).",
            mistakes: R`[[lo < hi]] مع [[hi = a.length - 1]] بيفوّت آخر عنصر فاضل. و [[lo = mid]] بدل [[mid + 1]] بيعمل loop لا نهائي. ونسيان [[Math.floor]] فيطلع mid كسر والقيمة undefined. وتشغيلها على array مش مترتبة: مفيش error، بس الإجابات غلط. ولو هتدوّر مرة واحدة بس في array مش مترتبة، [[includes]] ([[O(n)]]) أحسن من sort وبعده binary search ([[O(n log n)]]).`
          },
          lines: [
            "ترجّع مكان target أو -1.",
            "المنطقة اللي ممكن يكون فيها: من أول لآخر عنصر (شاملين الاتنين).",
            "طول ما المنطقة فيها عنصر واحد على الأقل.",
            "النص. [[Math.floor]] مهمة لأن القسمة في JS بتطلّع كسور.",
            "لقيناه.",
            "النص أصغر: المطلوب على اليمين، والنص نفسه اتستبعد (+ 1).",
            "النص أكبر: المطلوب على الشمال (- 1).",
            "قفلة.",
            "المنطقة فضيت: مش موجود.",
            "قفلة.",
            "array مترتبة.",
            "7 عند index 3.",
            "4 مش موجود.",
            "array فاضية: hi = -1 والـ loop مبيلفّش."
          ],
          sol: R`النسخة الـ recursive: [[if (lo > hi) return -1]]، واحسب mid، وبعدين [[return bsRec(a, target, mid + 1, hi)]] أو [[lo, mid - 1]]. الناتج 3 و -1 و -1. الوقت [[O(log n)]] بس الـ space [[O(log n)]] كمان (عمق الـ stack)، والـ loop كان [[O(1)]].

المتلفّتة: في كل خطوة قارن [[a[lo] <= a[mid]]]. لو آه، الشمال مترتب: لو target بين [[a[lo]]] و [[a[mid]]] روح شمال، وإلا يمين. لو لأ يبقى اليمين مترتب، واعمل نفس الشيك عليه. على [4, 5, 6, 7, 0, 1, 2]: الـ 0 عند 4، والـ 4 عند 0، والـ 2 عند 6، والـ 3 مش موجودة.

الغلطة المشهورة: [[a[lo] < a[mid]]] بدل [[<=]]. لما [[lo === mid]] (آخر عنصرين) الشرط يغلط، فـ [3, 1] والتارجت 1 ترجع -1.`,
          solCode: R`function bsRec(a, target, lo = 0, hi = a.length - 1) {
  if (lo > hi) return -1;
  const mid = lo + Math.floor((hi - lo) / 2);
  if (a[mid] === target) return mid;
  if (a[mid] < target) return bsRec(a, target, mid + 1, hi);
  return bsRec(a, target, lo, mid - 1);
}
console.log(bsRec([1, 3, 5, 7, 9, 11], 7), bsRec([1, 3, 5], 4), bsRec([], 1)); // 3 -1 -1
function searchRotated(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[lo] <= a[mid]) {
      if (a[lo] <= target && target < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (a[mid] < target && target <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
const r = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotated(r, 0), searchRotated(r, 4), searchRotated(r, 2), searchRotated(r, 3)); // 4 0 6 -1
console.log(searchRotated([1], 1), searchRotated([3, 1], 1)); // 0 1
// bsRec: O(log n) time, O(log n) stack space; searchRotated: O(log n) time, O(1) space (distinct values)`,
          check: {
            lang: "js",
            starter: R`function bsRec(a, target, lo = 0, hi = a.length - 1) {
  // if (lo > hi) return -1، واحسب mid، ونادي نفسك على نص واحد
}
function searchRotated(a, target) {
  let lo = 0, hi = a.length - 1;
  // في كل خطوة: a[lo] <= a[mid] يبقى الشمال مترتب
  return -1;
}`,
            tests: R`test("bsRec([1, 3, 5, 7, 9, 11], 7) ← 3", () => expect(bsRec([1, 3, 5, 7, 9, 11], 7)).toBe(3));
test("مش موجود ← -1، و [] ← -1", () => expect([bsRec([1, 3, 5, 7, 9, 11], 4), bsRec([], 1)]).toEqual([-1, -1]));
test("searchRotated([4, 5, 6, 7, 0, 1, 2]): 0 ← 4، و 4 ← 0، و 2 ← 6", () => {
  const a = [4, 5, 6, 7, 0, 1, 2];
  expect([searchRotated(a, 0), searchRotated(a, 4), searchRotated(a, 2)]).toEqual([4, 0, 6]);
});
test("searchRotated: 3 مش موجودة ← -1", () => expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1));
test("فخ <= : searchRotated([3, 1], 1) ← 1", () => expect(searchRotated([3, 1], 1)).toBe(1));
test("مليون عنصر متلفّتين: كل بحث O(log n)", () => {
  const n = 1000000, k = 377777, a = Array.from({ length: n }, (_, i) => (i + k) % n);
  expect([searchRotated(a, 0), searchRotated(a, n - 1), searchRotated(a, k), bsRec(Array.from({ length: n }, (_, i) => i * 2), 1999998)]).toEqual([n - k, n - k - 1, 0, 999999]);
});`,
            solution: R`function bsRec(a, target, lo = 0, hi = a.length - 1) {
  if (lo > hi) return -1;
  const mid = lo + Math.floor((hi - lo) / 2);
  if (a[mid] === target) return mid;
  return a[mid] < target ? bsRec(a, target, mid + 1, hi) : bsRec(a, target, lo, mid - 1);
}
function searchRotated(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[lo] <= a[mid]) {
      if (a[lo] <= target && target < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (a[mid] < target && target <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`
          }
        },
        {
          cmd: "lower bound (first/last)",
          title: "أول وآخر مكان لرقم متكرر في array مترتبة",
          desc: R`[[lowerBound(a, x)]] بترجّع أول مكان قيمته ≥ x. أول ظهور لـ x هو الـ lowerBound بتاعه، وآخر ظهور هو lowerBound لـ [[x + 1]] ناقص واحد. الاتنين [[O(log n)]].

الفرق عن الـ binary search العادية: لما تلاقي x متقفش، لأن ممكن يكون فيه نسخة قبله. بدل كده [[hi = mid]] وتكمّل على الشمال.

هنا [[hi = a.length]] (مش [[a.length - 1]]) والـ loop بـ [[lo < hi]]: المنطقة [lo, hi) نصها مفتوح، والإجابة ممكن تبقى [[a.length]] نفسها لو كل العناصر أصغر من x.`,
          example: R`function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, lowerBound(a, x + 1) - 1];
}
console.log(firstLast([5, 7, 7, 8, 8, 8, 10], 8), firstLast([5, 7], 6)); // [3, 5] [-1, -1]
// O(log n) time, O(1) space; x + 1 works for integers only (use an upperBound for anything else)`,
          try: R`اكتب [[upperBound]] (أول مكان قيمته > x) بتغيير علامة واحدة، واستخدمها بدل [[x + 1]] عشان تشتغل مع أرقام عشرية و strings. وبعدين: عدد مرات ظهور x = [[upperBound - lowerBound]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[upperBound]] و [[firstLast]] من غير [[x + 1]]، و [[count]].`,
          flag: "script",
          deep: {
            why: "الـ binary search العادية بترجّع «أي» مكان للقيمة، ودا مش كفاية لما فيه تكرار: أول طلب في يوم معين، أو عدد المستخدمين اللي عمرهم بين ٢٠ و ٣٠ في array مترتبة. الـ lower bound هو القالب اللي بيحل كل ده، وموجود جاهز في لغات تانية ([[bisect_left]] في Python، و [[std::lower_bound]] في C++).",
            how: R`dry run: lowerBound على [5, 7, 7, 8, 8, 8, 10] و x = 8:

lo = 0 و hi = 7. mid = 3 (8)، مش أصغر من 8، فـ hi = 3.

lo = 0 و hi = 3. mid = 1 (7)، أصغر، فـ lo = 2.

lo = 2 و hi = 3. mid = 2 (7)، أصغر، فـ lo = 3. دلوقتي lo = hi = 3. أول 8 عند 3.

lowerBound لـ 9: هيوصل لـ 6 (أول قيمة ≥ 9 هي 10 عند 6). فآخر 8 عند 5.

ليه الـ loop ده مبيلفّش للأبد؟ mid دايمًا أصغر من hi (لأن [[>>> 1]] بيقرّب لتحت)، فـ [[hi = mid]] بيصغّر المنطقة، و [[lo = mid + 1]] بيصغّرها. المنطقة بتقل كل لفة.

طريقة تفكير بتسهّل كل ده: تخيّل الـ array اتحولت لـ false, false, true, true حسب الشرط «القيمة ≥ x». إنت بتدوّر على أول true. كل مسائل الـ binary search الصعبة بترجع لكده.

[[x + 1]] بتشتغل مع الأعداد الصحيحة بس. مع 2.5 مثلًا، [[x + 1]] = 3.5، وممكن يكون فيه 3 في النص تتحسب غلط. عشان كده الـ upperBound (أول قيمة > x) هي الحل العام.`,
            when: "أول أو آخر ظهور، وعدد مرات ظهور قيمة في بيانات مترتبة، وعدد العناصر في range (upperBound للحد الأعلى ناقص lowerBound للأدنى).",
            mistakes: R`إنك تخلط القالبين: [[hi = a.length]] مع [[lo <= hi]] بيقرا برّا الـ array، و [[hi = mid - 1]] مع [[lo < hi]] بيفوّت الإجابة. اختار قالب واحد واحفظه. وإنك تنسى تتأكد إن القيمة عند [[first]] هي x فعلًا، فترجّع مكان رقم تاني. وإنك تحل «أول ظهور» بإنك تلاقي أي ظهور وتمشي لورا بـ loop: مع array كلها نفس الرقم ده بقى [[O(n)]].`
          },
          lines: [
            "أول index قيمته ≥ target (أو a.length لو مفيش).",
            "hi = a.length: الإجابة ممكن تبقى بعد آخر عنصر.",
            "لحد ما lo و hi يتقابلوا.",
            "النص. [[>>> 1]] قسمة على ٢ مع تقريب لتحت.",
            "النص أصغر من target: الإجابة أكيد بعده.",
            "النص ≥ target: ممكن يكون هو الإجابة، فسيبه في المنطقة (hi = mid مش mid - 1).",
            "قفلة.",
            "lo = hi = الإجابة.",
            "قفلة.",
            "أول وآخر مكان لـ x.",
            "أول مكان ≥ x.",
            "لو برّا الـ array أو القيمة هناك مش x، يبقى x مش موجود.",
            "آخر x = قبل أول مكان ≥ x + 1 بخانة.",
            "قفلة.",
            "8 من 3 لـ 5، و 6 مش موجود."
          ],
          sol: R`[[upperBound]] هي نفس [[lowerBound]] بالظبط، بس [[<]] بتبقى [[<=]]: كده بتعدّي كل القيم اللي = x وتقف عند أول أكبر منها. وآخر مكان لـ x = [[upperBound - 1]].

دلوقتي بتشتغل مع أي حاجة بتتقارن: [[firstLast([1.5, 2.5, 2.5, 3], 2.5)]] ترجع [[[1, 2]]]، ومع strings [[["ali", "bob", "bob", "zed"]]] ترجع [[[1, 2]]]. و [[x + 1]] كانت هتبوظ هنا: [[2.5 + 1]] بتعدّي الـ 3، و [["bob" + 1]] بتبقى "bob1". عدد مرات 8 في [5, 7, 7, 8, 8, 8, 10] = 6 - 3 = 3. كله [[O(log n)]].

الغلطة المشهورة: تغيّر العلامة في مكان تاني (مثلًا [[hi = mid - 1]]) فالحدود تتلخبط وتطلع بـ loop مالهاش نهاية أو إجابة ناقصة واحد.`,
          solCode: R`function lowerBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, upperBound(a, x) - 1];
}
const count = (a, x) => upperBound(a, x) - lowerBound(a, x);
console.log(firstLast([5, 7, 7, 8, 8, 8, 10], 8));        // [3, 5]
console.log(firstLast([1.5, 2.5, 2.5, 3], 2.5));         // [1, 2]
console.log(firstLast(["ali", "bob", "bob", "zed"], "bob")); // [1, 2]
console.log(count([5, 7, 7, 8, 8, 8, 10], 8), count([5, 7], 6)); // 3 0
// O(log n) time, O(1) space`,
          check: {
            lang: "js",
            starter: R`function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, target) {
  // نفس lowerBound بعلامة واحدة مختلفة
}
function firstLast(a, x) {
  return [-1, -1];
}
function count(a, x) {
  return 0;
}`,
            tests: R`test("upperBound([5, 7, 7, 8, 8, 8, 10], 8) ← 6", () => expect(upperBound([5, 7, 7, 8, 8, 8, 10], 8)).toBe(6));
test("upperBound([1, 2], 5) ← 2 (بعد الآخر)", () => expect(upperBound([1, 2], 5)).toBe(2));
test("firstLast([5, 7, 7, 8, 8, 8, 10], 8) ← [3, 5]", () => expect(firstLast([5, 7, 7, 8, 8, 8, 10], 8)).toEqual([3, 5]));
test("أرقام عشرية: firstLast([1.5, 2.5, 2.5, 3], 2.5) ← [1, 2]", () => expect(firstLast([1.5, 2.5, 2.5, 3], 2.5)).toEqual([1, 2]));
test("strings: firstLast(['ali', 'bob', 'bob', 'zed'], 'bob') ← [1, 2]", () => expect(firstLast(["ali", "bob", "bob", "zed"], "bob")).toEqual([1, 2]));
test("مش موجود ← [-1, -1]", () => expect(firstLast([5, 7], 6)).toEqual([-1, -1]));
test("count: 8 ← 3، و [] ← 0", () => expect([count([5, 7, 7, 8, 8, 8, 10], 8), count([], 1)]).toEqual([3, 0]));
test("مليون عنصر (O(log n))", () => {
  const a = Array.from({ length: 1000000 }, (_, i) => Math.floor(i / 10));
  expect([count(a, 4242), firstLast(a, 99999)]).toEqual([10, [999990, 999999]]);
});`,
            solution: R`function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, upperBound(a, x) - 1];
}
function count(a, x) {
  return upperBound(a, x) - lowerBound(a, x);
}`
          }
        },
        {
          cmd: "search insert position",
          title: "الرقم ده لو مش موجود، يتحط فين عشان الترتيب يفضل صح؟",
          desc: R`نفس الـ binary search العادية بالظبط، بس لما تخلص من غير ما تلاقي الرقم، رجّع [[lo]] بدل -1. [[lo]] ساعتها أول مكان قيمته أكبر من target، وده مكان الإضافة. [[O(log n)]].

ليه [[lo]]؟ الـ loop بيقف لما [[lo = hi + 1]]. كل اللي قبل lo أصغر من target (اتستبعدوا بـ [[lo = mid + 1]])، وكل اللي بعد hi أكبر (اتستبعدوا بـ [[hi = mid - 1]]). فـ lo هو الحد بينهم.

ده نفس نتيجة الـ lowerBound من الدرس اللي فات، بقالب تاني، طول ما مفيش تكرار (مع التكرار بيرجّع أي نسخة يقابلها، مش أولها). اختار واحد تحفظه، وافهم التاني.`,
          example: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
console.log(searchInsert([1, 3, 5, 6], 5)); // 2
console.log(searchInsert([1, 3, 5, 6], 2)); // 1
console.log(searchInsert([1, 3, 5, 6], 7)); // 4
console.log(searchInsert([1, 3, 5, 6], 0)); // 0
console.log(searchInsert([], 3));           // 0
// O(log n) time, O(1) space`,
          try: R`استخدمها عشان تضيف رقم لـ array مترتبة: [[a.splice(searchInsert(a, x), 0, x)]]. البحث [[O(log n)]]، بس الإضافة نفسها Big-O بتاعتها إيه؟ (O(n)، لأن splice بتحرّك اللي بعدها). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[insertSorted(a, x)]] بتضيف في نفس الـ array وترجّعها.`,
          flag: "script",
          deep: {
            why: "«يتحط فين» سؤال بيتسأل كتير: leaderboard مترتب وعايز تضيف score جديد، أو مواعيد مترتبة وعايز تحط ميعاد، أو autocomplete بيدوّر على أول كلمة بتبدأ بحروف معينة. ولو فهمت ليه [[lo]] هو الإجابة، يبقى فهمت الـ binary search فعلًا.",
            how: R`dry run على [1, 3, 5, 6] و target = 2:

lo = 0 و hi = 3. mid = 1 (3)، أكبر من 2، فـ hi = 0.

lo = 0 و hi = 0. mid = 0 (1)، أصغر، فـ lo = 1.

lo = 1 أكبر من hi = 0، الـ loop وقف. رجّع 1. وفعلًا 2 مكانها بين 1 و 3.

و target = 7: mid = 1 (3) أصغر، lo = 2. mid = 2 (5) أصغر، lo = 3. mid = 3 (6) أصغر، lo = 4. وقف، ورجّع 4 = طول الـ array: يتحط في الآخر.

الـ invariant (الحاجة اللي بتفضل صح طول الوقت): كل حاجة قبل lo أصغر من target، وكل حاجة بعد hi أكبر. لما الـ loop يقف (lo = hi + 1)، مفيش حاجة بين الاتنين، فـ lo هو أول «أكبر».

لو فيه تكرار (زي [1, 3, 3, 3, 5] و target = 3)، الكود ده بيرجّع أي 3 يقابله، مش أولهم. لو المطلوب أول واحد، استخدم الـ lowerBound.`,
            when: "إضافة في قايمة مترتبة، أو تحديد «أنهي شريحة»: أسعار شحن حسب الوزن بحدود [0, 1, 5, 10] كيلو، والوزن 3 في أنهي شريحة؟",
            mistakes: R`إنك ترجّع [[hi]] بدل [[lo]] (بيطلع قبل المكان الصح بخانة). وإنك ترجّع [[mid]] الأخير: ساعات بيطلع صح وساعات لأ حسب آخر اتجاه. والـ edge cases اللي لازم تجربها: أصغر من الكل، وأكبر من الكل، و array فاضية، و array فيها عنصر واحد.`
          },
          lines: [
            "مكان target، أو المكان اللي يتحط فيه.",
            "نفس الحدود الشاملة.",
            "نفس الـ loop.",
            "النص.",
            "موجود: رجّع مكانه.",
            "أصغر: روح يمين.",
            "أكبر: روح شمال.",
            "قفلة.",
            "مش موجود: lo هو أول مكان قيمته أكبر من target.",
            "قفلة.",
            "5 موجود عند 2.",
            "2 بين 1 و 3، يتحط عند 1.",
            "أكبر من الكل: في الآخر (4).",
            "أصغر من الكل: في الأول (0).",
            "array فاضية: 0."
          ],
          sol: R`[[a.splice(searchInsert(a, x), 0, x)]] بتحط الرقم في مكانه. لو ضفت 5 و 1 و 4 و 2 و 3 و 0 و 6 لـ array فاضية، الناتج [[0 1 2 3 4 5 6]] مترتب.

البحث [[O(log n)]]، بس الإضافة [[O(n)]]: [[splice]] لازم تحرّك كل العناصر اللي بعد المكان خطوة لقدام. فكل إضافة [[O(n)]]، و n إضافات [[O(n^2)]] في أسوأ حالة (لو كل رقم جديد أصغر من كله).

الغلطة المشهورة: تقول إن الحل كله [[O(log n)]] لأن فيه binary search. لو محتاج إضافة ومسح سريع مع ترتيب، ده شغل balanced tree أو heap. ولو هتبني الـ array مرة واحدة، اعمل push للكل وبعدين sort واحد ([[O(n log n)]]).`,
          solCode: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
function insertSorted(a, x) {
  a.splice(searchInsert(a, x), 0, x);
  return a;
}
const a = [];
for (const x of [5, 1, 4, 2, 3, 0, 6]) insertSorted(a, x);
console.log(a.join(" ")); // 0 1 2 3 4 5 6
// find the spot: O(log n); splice shifts everything after it: O(n); so one insert is O(n)
// n inserts = O(n^2) in the worst case: to build a big sorted array, push everything then sort once (O(n log n))`,
          check: {
            lang: "js",
            starter: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
function insertSorted(a, x) {
  // a.splice(مكان, 0, x)
  return a;
}`,
            tests: R`test("ضيف 5 و 1 و 4 و 2 و 3 و 0 و 6 لـ [] ← [0, 1, 2, 3, 4, 5, 6]", () => {
  const a = [];
  for (const x of [5, 1, 4, 2, 3, 0, 6]) insertSorted(a, x);
  expect(a).toEqual([0, 1, 2, 3, 4, 5, 6]);
});
test("بترجّع نفس الـ array", () => { const a = [1, 3]; expect(insertSorted(a, 2) === a).toBe(true); });
test("رقم مكرر: insertSorted([1, 3, 3, 5], 3) ← [1, 3, 3, 3, 5]", () => expect(insertSorted([1, 3, 3, 5], 3)).toEqual([1, 3, 3, 3, 5]));
test("في الأطراف: 0 في الأول و 9 في الآخر", () => expect(insertSorted(insertSorted([2, 4], 0), 9)).toEqual([0, 2, 4, 9]));`,
            solution: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
function insertSorted(a, x) {
  a.splice(searchInsert(a, x), 0, x);
  return a;
}`
          }
        },
        {
          cmd: "binary search on answer",
          title: "أقل سرعة أكل تخلّص بيها كل أكوام الموز في h ساعة",
          desc: R`مش بتدوّر في array، بتدوّر في مدى الإجابات الممكنة (السرعة من 1 لأكبر كوم). اسأل عن كل سرعة: «ينفع أخلّص في h ساعة؟». لو نفع، جرّب أبطأ. لو لأ، لازم أسرع. [[O(n log m)]].

الشرط الأساسي: الإجابة لازم تبقى monotonic. لو سرعة 4 بتلحق، يبقى 5 و 6 وأي سرعة أكبر بتلحق. يعني false, false, true, true وإنت بتدوّر على أول true.

ده نفس الـ lowerBound، بس بدل «القيمة ≥ x» الشرط دالة إنت كاتبها. أي مسألة فيها «أقل قيمة تحقق كذا» أو «أكبر قيمة تحقق كذا» جرّب فيها الفكرة دي.`,
          example: R`function minEatingSpeed(piles, h) {
  const hoursAt = k => piles.reduce((t, p) => t + Math.ceil(p / k), 0);
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
console.log(minEatingSpeed([3, 6, 7, 11], 8));       // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // 23
// O(n log m) time (m = biggest pile), O(1) space`,
          try: R`حل «ship within D days»: أوزان طرود بالترتيب، وأقل حمولة للمركب تشحنهم كلهم في D أيام (كل يوم بتشحن طرود ورا بعض لحد ما الحمولة تتملي). الأوزان من 1 لـ 10 و D = 5 الإجابة 15. المدى هنا من أتقل طرد لمجموع الكل. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[shipWithinDays(weights, days)]].`,
          flag: "script",
          deep: {
            why: "من أقوى الأفكار في الانترفيو لأنها مش واضحة: المسألة مفيهاش array مترتبة خالص، ومع ذلك الحل binary search. بتظهر في مسائل التحسين: أقل حمولة، أقل وقت، أكبر مسافة ممكنة، أقل عدد سيرفرات يستحمل الضغط.",
            how: R`dry run على [3, 6, 7, 11] و h = 8:

المدى من 1 لـ 11. mid = 6: الساعات 1 + 1 + 2 + 2 = 6 ≤ 8، بتلحق، hi = 6.

lo = 1 و hi = 6. mid = 3: الساعات 1 + 2 + 3 + 4 = 10، مبتلحقش، lo = 4.

lo = 4 و hi = 6. mid = 5: الساعات 1 + 2 + 2 + 3 = 8، بتلحق، hi = 5.

lo = 4 و hi = 5. mid = 4: الساعات 1 + 2 + 2 + 3 = 8، بتلحق، hi = 4. و lo = hi = 4.

الـ Big-O: الـ binary search بياخد log m خطوة (m = أكبر كوم)، وكل خطوة بتحسب الساعات على n كوم. المجموع [[O(n log m)]]. لو جرّبت كل السرعات من 1 لـ m بالترتيب يبقى [[O(n × m)]]، ومع m مليار ده مستحيل.

الخطوات لأي مسألة من النوع ده: (١) إيه الإجابة؟ رقم: سرعة، أو حمولة، أو وقت. (٢) أقل وأكبر قيمة ممكنة ليها. (٣) دالة [[canDo(x)]]: لو الإجابة x، ينفع؟ (٤) اتأكد إنها monotonic، وبعدين lowerBound على أول true.`,
            when: "«أقل X بحيث يحصل Y» أو «أكبر X بحيث ميحصلش Y»، والتحقق من إجابة معينة أسهل بكتير من إيجادها.",
            mistakes: R`إنك تبدأ lo بـ 0: القسمة على 0 بتدّي Infinity. وإنك تكتب [[Math.floor]] بدل [[Math.ceil]] في حساب الساعات. وإنك تستخدم [[Math.max(...piles)]] على array فيها مئات الآلاف من العناصر: الـ spread بيحط كل عنصر كـ argument، وعلى Node 24 مع ٢٠٠ ألف عنصر بيرمي RangeError. استخدم loop أو [[reduce]]. وإنك تنسى تتأكد إن الشرط monotonic: لو مش كده الـ binary search هيرجّع إجابة غلط من غير error.`
          },
          lines: [
            "piles أكوام الموز، و h عدد الساعات المتاحة.",
            "بسرعة k: كل كوم محتاج [[ceil(p / k)]] ساعة (الساعة مبتتقسمش على كومين).",
            "مدى الإجابة: أقل سرعة 1، وأكبر كوم كفاية (ساعة لكل كوم).",
            "نفس قالب الـ lowerBound.",
            "سرعة في النص.",
            "بتلحق: الإجابة هي دي أو أقل، hi = mid.",
            "مبتلحقش: لازم أسرع من mid.",
            "قفلة.",
            "أقل سرعة بتلحق.",
            "قفلة.",
            "بسرعة 4: 1 + 2 + 2 + 3 = 8 ساعات بالظبط.",
            "الساعات قد عدد الأكوام: لازم تخلّص كل كوم في ساعة، يعني السرعة = أكبر كوم.",
            "ساعة زيادة: 23 تكفي."
          ],
          sol: R`الإجابة 15. المدى من [[Math.max(...weights)]] (أتقل طرد لازم يدخل المركب) لـ [[sum]] (كله في يوم واحد). والدالة المساعدة [[daysAt(cap)]] بتمشي على الطرود وتبدأ يوم جديد لما [[load + w > cap]]. وبعدين نفس binary search: لو [[daysAt(mid) <= D]] جرّب أصغر ([[hi = mid]])، وإلا [[lo = mid + 1]].

كمان [3, 2, 2, 4, 1, 4] مع 3 أيام الإجابة 6، و [1, 2, 3, 1, 1] مع 4 أيام الإجابة 3. الوقت [[O(n log S)]] (S = مجموع الأوزان)، والـ space [[O(1)]].

الغلطة المشهورة: تبدأ [[lo]] من 1. مع حمولة أصغر من أتقل طرد، [[daysAt]] هتحط الطرد التقيل في يوم لوحده وتفتكر إن ده ينفع، فالإجابة تطلع أصغر من المفروض وغلط.`,
          solCode: R`function shipWithinDays(weights, days) {
  const daysAt = cap => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { d++; load = 0; }
      load += w;
    }
    return d;
  };
  let lo = Math.max(...weights), hi = weights.reduce((s, w) => s + w, 0);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (daysAt(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3));             // 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));                // 3
// O(n log S) time (S = sum of weights), O(1) space`,
          check: {
            lang: "js",
            starter: R`function shipWithinDays(weights, days) {
  const daysAt = cap => {
    // امشي على الطرود، وابدأ يوم جديد لما load + w > cap
  };
  let lo = 1, hi = 0; // المدى الصح: من أتقل طرد لمجموع الكل
  return lo;
}`,
            tests: R`const daysNeeded = (ws, cap) => { let d = 1, load = 0; for (const w of ws) { if (load + w > cap) { d++; load = 0; } load += w; } return d; };
test("الأوزان من 1 لـ 10 و 5 أيام ← 15", () => expect(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(15));
test("([3, 2, 2, 4, 1, 4], 3) ← 6", () => expect(shipWithinDays([3, 2, 2, 4, 1, 4], 3)).toBe(6));
test("([1, 2, 3, 1, 1], 4) ← 3", () => expect(shipWithinDays([1, 2, 3, 1, 1], 4)).toBe(3));
test("lo يبدأ من أتقل طرد: ([10, 1, 1], 3) ← 10", () => expect(shipWithinDays([10, 1, 1], 3)).toBe(10));
test("يوم واحد ← المجموع كله", () => expect(shipWithinDays([4, 5, 6], 1)).toBe(15));
test("20 ألف طرد: الناتج بيكفي، والناتج - 1 مبيكفيش (O(n log S))", () => {
  const ws = Array.from({ length: 20000 }, (_, i) => (i * 37) % 500 + 1);
  const cap = shipWithinDays(ws, 100);
  expect([daysNeeded(ws, cap) <= 100, daysNeeded(ws, cap - 1) > 100]).toEqual([true, true]);
});`,
            solution: R`function shipWithinDays(weights, days) {
  const daysAt = cap => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { d++; load = 0; }
      load += w;
    }
    return d;
  };
  let lo = Math.max(...weights), hi = weights.reduce((s, w) => s + w, 0);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (daysAt(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`
          }
        }
      ]
    }
]);
