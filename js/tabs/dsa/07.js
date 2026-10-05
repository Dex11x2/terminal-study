// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "graphs",
      l: 3,
      n: "عقد وعلاقات من غير root: adjacency list، و islands، وأقصر طريق بـ BFS، و topological sort، و cycles",
      items: [
        {
          cmd: "adjacency list",
          title: "إزاي تخزّن graph في الكود، وتمشي عليه من غير ما تلف في دواير؟",
          desc: R`الـ graph: عقد (vertices) ووصلات بينها (edges). الشجرة نوع من الـ graph، بس الـ graph العادي ممكن يبقى فيه دواير، وممكن عقدة ليها أكتر من أب، ومفيش root.

أشهر طريقة تخزّنه بيها: adjacency list، يعني Map (أو array) فيها لكل عقدة قائمة جيرانها. الذاكرة [[O(V + E)]]: عدد العقد + عدد الوصلات.

البديل adjacency matrix: جدول V × V فيه true لو فيه وصلة. بتسأل «فيه وصلة بين a و b؟» في [[O(1)]]، بس بتاخد [[O(V^2)]] ذاكرة حتى لو الوصلات قليلة. أغلب الـ graphs الحقيقية (أصحاب، links، dependencies) وصلاتها قليلة، فالـ list هي الاختيار الافتراضي.

الفرق الوحيد بين DFS على شجرة وعلى graph: لازم [[Set]] للعقد اللي زرتها، وإلا هتلف في دايرة لحد ما الـ stack يخلص.`,
          example: R`const edges = [["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"], ["d", "e"]];
function buildGraph(edges, directed = false) {
  const g = new Map();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, []);
    if (!g.has(v)) g.set(v, []);
    g.get(u).push(v);
    if (!directed) g.get(v).push(u);
  }
  return g;
}
function dfs(g, start, seen = new Set()) {
  seen.add(start);
  for (const next of g.get(start)) if (!seen.has(next)) dfs(g, next, seen);
  return seen;
}
function countComponents(g) {
  const seen = new Set();
  let count = 0;
  for (const v of g.keys()) if (!seen.has(v)) { dfs(g, v, seen); count++; }
  return count;
}
const g = buildGraph(edges);
console.log(g.get("d")); // ['b', 'c', 'e']
console.log([...dfs(g, "a")].join(" ")); // a b d c e
console.log(countComponents(buildGraph([["a", "b"], ["c", "d"], ["d", "e"]]))); // 2
// build: O(V + E); DFS visits every vertex once and every edge twice: O(V + E) time, O(V) space`,
          try: R`حل «Find if Path Exists in Graph»: عندك n عقدة مترقمة من 0 لـ n - 1، و edges، و source و destination. فيه طريق؟ ابني الـ graph بـ arrays بدل Map، وحلها بـ BFS المرة دي (queue ومؤشر [[head]]). جرّب n = 6 و edges [[[0,1],[0,2],[3,5],[5,4],[4,3]]]: من 0 لـ 5 الإجابة false، ومن 3 لـ 4 true. وخلي بالك إن فيه عقد ممكن متبقاش في أي edge. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[validPath(n, edges, source, destination)]].`,
          sol: R`الناتج: [[false]] من 0 لـ 5 (0 و 1 و 2 في جزيرة، و 3 و 4 و 5 في جزيرة تانية)، و [[true]] من 3 لـ 4، و [[true]] من 2 لـ 2 (العقدة بتوصل لنفسها).

ليه arrays؟ لما العقد أرقام من 0 لـ n - 1، [[Array.from({ length: n }, () => [])]] أسرع وأبسط من Map، وكل عقدة ليها قائمة حتى لو ملهاش edges. لو استخدمت [[new Array(n).fill([])]] كل الخانات هتشاور على نفس الـ array، وكل الجيران هيتخلطوا: دي أشهر غلطة في المسألة دي.

BFS بـ مؤشر [[head]] بدل [[shift]]: الـ queue بتفضل array عادية، وإنت بتقرا منها بالترتيب. وضيف العقدة للـ [[seen]] لحظة ما تحطها في الـ queue، مش لما تطلعها، وإلا نفس العقدة ممكن تدخل الـ queue كذا مرة.`,
          solCode: R`function validPath(n, edges, source, destination) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  const seen = new Array(n).fill(false);
  const queue = [source];
  seen[source] = true;
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    if (u === destination) return true;
    for (const v of graph[u]) if (!seen[v]) { seen[v] = true; queue.push(v); }
  }
  return false;
}
const edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]];
console.log(validPath(6, edges, 0, 5)); // false
console.log(validPath(6, edges, 3, 4)); // true
console.log(validPath(6, edges, 2, 2)); // true
// O(V + E) time and space`,
          flag: "script",
          deep: {
            why: "الـ graphs بتوصف أي «علاقات»: مين متابع مين، والصفحات اللي بتلينك لبعض، والـ packages اللي معتمدة على بعض في [[package-lock.json]]، والـ microservices اللي بتكلم بعض، والخرايط. وأغلب مسائل الـ graphs في الانترفيو بتبدأ بنفس الخطوة: ابني adjacency list من الـ edges، وبعدين DFS أو BFS.",
            how: R`[[buildGraph]] بتضيف كل عقدة للـ Map حتى لو ملهاش جيران غير في ناحية واحدة (عشان [[g.get(v)]] متبقاش undefined). وفي الـ undirected graph كل edge بيتضاف مرتين: من u لـ v ومن v لـ u.

DFS من a: نزور a ونحطها في seen، وجيرانها b و c. نروح b: جيرانها a (اتزارت) و d. نروح d: جيرانها b (اتزارت) و c و e. نروح c: كل جيرانها اتزاروا. نرجع لـ d ونروح e. الترتيب a b d c e.

من غير [[seen]]: a تروح b، و b ترجع a، و a تروح b... للأبد.

connected components: لف على كل العقد، وأي عقدة لسه ماتزارتش يبقى بداية جزيرة جديدة، فابدأ DFS منها وزوّد العدّاد. الـ DFS بيعلّم الجزيرة كلها، فمش هتتعد تاني. والإجمالي لسه [[O(V + E)]] لأن كل عقدة بتتزار مرة واحدة في كل الـ DFS calls مع بعض.

الـ Big-O: كل عقدة بتدخل مرة، وكل edge بيتبص عليه مرة من كل ناحية، فـ [[O(V + E)]]. ده الـ Big-O بتاع أغلب مسائل الـ graph traversal، واتعوّد تقوله كده بدل [[O(n)]].`,
            when: "adjacency list: الاختيار الافتراضي. matrix: لما الـ graph كثيف (أغلب العقد متوصلة ببعض) أو صغير، أو محتاج «فيه edge بين دول؟» كتير. والـ grid (زي الخرايط والـ mazes) هو graph من غير ما تبنيه: كل خانة جيرانها الأربعة، وده الدرس الجاي.",
            mistakes: R`[[new Array(n).fill([])]]: كل الخانات نفس الـ array. وإنك تنسى تضيف الناحية التانية في الـ undirected. وإنك تنسى [[seen]] فتلف في دايرة. وإنك تفترض إن الـ graph متوصل كله، فتعمل DFS من عقدة واحدة وتفوّت جزر تانية. وفي الانترفيو اسأل دايمًا: directed ولا undirected؟ فيه دواير؟ فيه عقد لوحدها؟ العقد أرقام ولا strings؟`
          },
          lines: [
            "الوصلات كـ أزواج.",
            "بناء adjacency list، و directed بيحدد لو الوصلة في اتجاه واحد.",
            "Map من العقدة لقائمة جيرانها.",
            "عدّي على كل وصلة.",
            "اتأكد إن u ليها قائمة.",
            "و v كمان، حتى لو ملهاش جيران طالعين.",
            "ضيف v في جيران u.",
            "لو مش directed، ضيف u في جيران v.",
            "قفلة الـ for.",
            "رجّع الـ graph.",
            "قفلة.",
            "DFS recursive بـ Set للي اتزار.",
            "علّم العقدة.",
            "انزل على كل جار لسه ماتزارش.",
            "رجّع كل اللي اتزار.",
            "قفلة.",
            "عدد الجزر (connected components).",
            "Set واحدة لكل الـ DFS calls.",
            "العدّاد.",
            "كل عقدة ماتزارتش = جزيرة جديدة، علّمها كلها وعدّها.",
            "رجّع العدد.",
            "قفلة.",
            "ابني الـ graph.",
            "جيران d.",
            "كل اللي يوصل له من a بترتيب الـ DFS.",
            "جزيرة a-b وجزيرة c-d-e."
          ],
          check: {
            lang: "js",
            starter: R`function validPath(n, edges, source, destination) {
  const graph = Array.from({ length: n }, () => []);
  // ابني الـ graph (الاتجاهين)، وبعدين BFS بـ queue ومؤشر head
  return false;
}`,
            tests: R`const E = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]];
test("من 0 لـ 5 ← false (جزيرتين)", () => expect(validPath(6, E, 0, 5)).toBe(false));
test("من 3 لـ 4 ← true", () => expect(validPath(6, E, 3, 4)).toBe(true));
test("العقدة بتوصل لنفسها: من 2 لـ 2 ← true", () => expect(validPath(6, E, 2, 2)).toBe(true));
test("عقدة ملهاش edges خالص: (3, [[0, 1]], 0, 2) ← false", () => expect(validPath(3, [[0, 1]], 0, 2)).toBe(false));
test("الـ edges في الاتجاهين: (3, [[1, 0], [2, 1]], 0, 2) ← true", () => expect(validPath(3, [[1, 0], [2, 1]], 0, 2)).toBe(true));
test("سلسلة 200 ألف عقدة (O(V + E)، و fill([]) كانت هتخلط الجيران)", () => {
  const n = 200000, edges = Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
  expect([validPath(n, edges, 0, n - 1), validPath(n + 1, edges, 0, n)]).toEqual([true, false]);
});`,
            solution: R`function validPath(n, edges, source, destination) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  const seen = new Array(n).fill(false);
  const queue = [source];
  seen[source] = true;
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    if (u === destination) return true;
    for (const v of graph[u]) if (!seen[v]) { seen[v] = true; queue.push(v); }
  }
  return false;
}`
          }
        },
        {
          cmd: "number of islands",
          title: "عدّ الجزر في خريطة من 1 و 0 (Number of Islands)",
          desc: R`الـ grid هو graph من غير ما تبنيه: كل خانة عقدة، وجيرانها الأربعة (فوق وتحت وشمال ويمين) هما الـ edges. الجزيرة مجموعة 1 متوصلين ببعض أفقي أو رأسي (مش قطري).

الحل: لف على كل الخانات. أول ما تلاقي 1، دي جزيرة جديدة: زوّد العدّاد، وبعدين «اغرق» الجزيرة كلها بـ DFS، يعني حوّل كل 1 متوصل بيها لـ 0، عشان متتعدّش تاني.

ده نفس connected components من الدرس اللي فات، بس الـ [[seen]] هنا هي الـ grid نفسها (بنعلّم بتغيير القيمة). عشان منبوّظش الـ input اللي جاي من برّا، بنشتغل على نسخة.`,
          example: R`function numIslands(grid) {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const g = grid.map(row => [...row]);
  let count = 0;
  const sink = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || g[r][c] !== "1") return;
    g[r][c] = "0";
    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (g[r][c] === "1") { count++; sink(r, c); }
  return count;
}
const map = ["11000", "11000", "00100", "00011"].map(s => s.split(""));
console.log(numIslands(map)); // 3
console.log(numIslands([["1", "1"], ["1", "1"]])); // 1
console.log(numIslands([["1", "0", "1"]])); // 2
console.log(numIslands([])); // 0
// O(rows × cols) time; O(rows × cols) space for the copy and, in the worst case, the recursion`,
          try: R`حل «Max Area of Island»: رجّع مساحة أكبر جزيرة بدل العدد (خلّي [[sink]] ترجّع عدد الخانات اللي غرّقتها). وبعدين اكتبها بـ BFS (queue) بدل recursion، وجرّبها على grid 1000 × 1000 كله 1: النسخة الـ recursive هتعمل إيه؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[maxAreaOfIsland(grid)]] بـ BFS (الـ grid فيها "1" و "0" زي المثال).`,
          sol: R`للخريطة اللي في المثال: أكبر جزيرة مساحتها 4 (المربع اللي فوق على الشمال). و grid كله 0 الإجابة 0.

[[area]] ترجّع 0 لو برّا الحدود أو مش 1، وغير كده [[1 + area(4 جيران)]]. وخد [[Math.max]] على كل الجزر.

على grid مليون خانة كله 1: الـ DFS الـ recursive ممكن ينزل مليون مستوى، فهيقع بـ [[RangeError: Maximum call stack size exceeded]]. نسخة الـ BFS بـ queue ومؤشر [[head]] بتشتغل عادي وبترجّع 1000000.

في الـ BFS علّم الخانة (حوّلها لـ 0) لحظة ما تحطها في الـ queue، مش لما تطلعها. لو استنيت، نفس الخانة هتدخل الـ queue من كذا جار، والـ queue هتكبر أضعاف.`,
          solCode: R`function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const g = grid.map(row => [...row]);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let best = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] !== "1") continue;
      g[r][c] = "0";
      const queue = [[r, c]];
      for (let head = 0; head < queue.length; head++) {
        const [cr, cc] = queue[head];
        for (const [dr, dc] of dirs) {
          const nr = cr + dr, nc = cc + dc;
          if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && g[nr][nc] === "1") {
            g[nr][nc] = "0";
            queue.push([nr, nc]);
          }
        }
      }
      best = Math.max(best, queue.length);
    }
  }
  return best;
}
const map = ["11000", "11000", "00100", "00011"].map(s => s.split(""));
console.log(maxAreaOfIsland(map)); // 4
console.log(maxAreaOfIsland([["0", "0"]])); // 0
const big = Array.from({ length: 1000 }, () => new Array(1000).fill("1"));
console.log(maxAreaOfIsland(big)); // 1000000
// O(rows × cols) time and space, no recursion depth limit`,
          flag: "script",
          deep: {
            why: "Number of Islands من أكتر مسائل الانترفيو اللي بتتسأل في الشركات الكبيرة، لأنها بتختبر إنك شايف الـ grid كـ graph. ونفس الفكرة بالظبط هي أداة «الجردل» (flood fill) في برامج الرسم، وتحديد المناطق المتوصلة في خريطة لعبة، وتجميع الخانات المتشابهة في spreadsheet.",
            how: R`dry run على الخريطة: [[(0,0)]] = 1، جزيرة رقم 1. [[sink(0,0)]] بتغرّق [[(0,0) (1,0) (0,1) (1,1)]]، والباقي حواليهم 0 أو برّا.

نكمل اللف لحد [[(2,2)]] = 1، جزيرة 2، وبتغرق لوحدها. وبعدين [[(3,3)]] = 1، جزيرة 3، وبتغرق هي و [[(3,4)]]. الإجابة 3.

الشرط الطويل في أول [[sink]] هو كل الـ base cases في سطر واحد: برّا الحدود من أي ناحية، أو ماء، أو اتغرّقت قبل كده. الترتيب مهم: لازم تتأكد من الحدود قبل ما تقرا [[g[r][c]]]، عشان [[g[-1]]] بـ undefined و [[undefined[c]]] هتوقع البرنامج.

[[grid[0]?.length ?? 0]]: لو الـ grid فاضي، [[grid[0]]] undefined، والـ optional chaining بيمنع الـ crash.

الـ Big-O: كل خانة بتتزار مرة في الـ loop الخارجي، وبتتغرق مرة واحدة بالكتير، فـ [[O(rows × cols)]].`,
            when: "أي grid فيه «مناطق متوصلة»: عدّها، أو احسب مساحتها، أو حيطها (Surrounded Regions)، أو اعرف إيه اللي يوصل للحافة (Pacific Atlantic Water Flow). DFS أو BFS الاتنين ينفعوا؛ BFS أأمن لو الـ grid كبير. ولو الـ grid بيتغير (جزر بتتضاف واحدة واحدة)، ده union-find.",
            mistakes: R`قراءة الخانة قبل التأكد من الحدود. ونسيان إنك تعلّم الخانة قبل ما تنزل على جيرانها (فتلف في دايرة). وإنك تقارن بـ [[1]] (رقم) والـ grid فيه [["1"]] (string)؛ LeetCode بيستخدم strings في المسألة دي بالذات. وإنك تعدّل الـ input من غير ما تقول، وفي الانترفيو قول «هعدّل الـ grid عشان أوفّر ذاكرة، ولو مش مسموح هعمل Set أو نسخة».`
          },
          lines: [
            "بتعدّ الجزر.",
            "الأبعاد، مع حماية للـ grid الفاضي.",
            "نسخة عشان منغيّرش الـ input.",
            "العدّاد.",
            "sink بتغرّق جزيرة كاملة بـ DFS.",
            "برّا الحدود أو مش أرض: ارجع.",
            "غرّق الخانة دي (هي كمان علامة إنها اتزارت).",
            "انزل على الجيران الأربعة.",
            "قفلة sink.",
            "لف على كل الصفوف.",
            "وكل الأعمدة.",
            "أرض لسه ماتغرقتش: جزيرة جديدة، عدّها وغرّقها كلها.",
            "رجّع العدد.",
            "قفلة.",
            "الخريطة المشهورة بتاعة المسألة، كل صف array من الحروف.",
            "٣ جزر.",
            "كله أرض: جزيرة واحدة.",
            "اتنين مفصولين بـ 0.",
            "فاضي."
          ],
          check: {
            lang: "js",
            starter: R`function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const g = grid.map(row => [...row]);
  let best = 0;
  // لكل "1": BFS بـ queue ومؤشر head، وعلّم الخانة لحظة ما تدخل الـ queue
  return best;
}`,
            tests: R`const grid = rows => rows.map(s => s.split(""));
test("الخريطة اللي في المثال ← 4", () => expect(maxAreaOfIsland(grid(["11000", "11000", "00100", "00011"]))).toBe(4));
test("كله 0 ← 0، و [] ← 0", () => expect([maxAreaOfIsland(grid(["000", "000"])), maxAreaOfIsland([])]).toEqual([0, 0]));
test("[['1']] ← 1", () => expect(maxAreaOfIsland([["1"]])).toBe(1));
test("القطري مش جار: ['101', '010', '101'] ← 1", () => expect(maxAreaOfIsland(grid(["101", "010", "101"]))).toBe(1));
test("شكل U ← 7", () => expect(maxAreaOfIsland(grid(["101", "101", "111"]))).toBe(7));
test("400 × 400 كله 1: الـ DFS الـ recursive هيقع، الـ BFS بيرجّع 160000", () => expect(maxAreaOfIsland(Array.from({ length: 400 }, () => new Array(400).fill("1")))).toBe(160000));`,
            solution: R`function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const g = grid.map(row => [...row]);
  let best = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] !== "1") continue;
      g[r][c] = "0";
      const queue = [[r, c]];
      for (let head = 0; head < queue.length; head++) {
        const [y, x] = queue[head];
        for (const [dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const ny = y + dy, nx = x + dx;
          if (ny < 0 || nx < 0 || ny >= rows || nx >= cols || g[ny][nx] !== "1") continue;
          g[ny][nx] = "0";
          queue.push([ny, nx]);
        }
      }
      best = Math.max(best, queue.length);
    }
  }
  return best;
}`
          }
        },
        {
          cmd: "shortest path in grid (BFS)",
          title: "أقل عدد خطوات من نقطة لنقطة في متاهة",
          desc: R`لما كل خطوة بنفس التكلفة (خطوة = 1)، BFS بيلاقي أقصر طريق. ليه؟ لأنه بيزور كل الخانات اللي على بعد 1، وبعدين كل اللي على بعد 2، وهكذا. فأول مرة يوصل للهدف، دي أقل مسافة ممكنة.

الـ DFS مينفعش هنا: ممكن ينزل في طريق طويل ملفوف ويوصل للهدف الأول، ومفيش ضمان إنه الأقصر.

الأدوات: queue ومؤشر [[head]]، و [[dist]] جدول بنفس حجم الـ grid فيه المسافة لكل خانة ([[-1]] = لسه ماوصلناش). الـ [[dist]] بيقوم بدور الـ [[seen]] كمان. و [[dirs]] فيها الاتجاهات الأربعة، عشان منكتبش نفس الكود ٤ مرات.

لو الخطوات ليها تكاليف مختلفة (طريق سريع وطريق زحمة)، BFS مبقاش ينفع، ومحتاج Dijkstra (درس «Dijkstra» في نفس المستوى).`,
          example: R`function shortestPath(grid, start, goal) {
  const rows = grid.length, cols = grid[0].length;
  const dist = grid.map(row => [...row].map(() => -1));
  const queue = [start];
  const [sr, sc] = start;
  dist[sr][sc] = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    if (r === goal[0] && c === goal[1]) return dist[r][c];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr][nc] === "#" || dist[nr][nc] !== -1) continue;
      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }
  return -1;
}
const maze = [
  "..#.",
  "..#.",
  "....",
  "#.#.",
];
console.log(shortestPath(maze, [0, 0], [0, 3])); // 7
console.log(shortestPath(maze, [0, 0], [0, 0])); // 0
console.log(shortestPath([".#", "#."], [0, 0], [1, 1])); // -1
// O(rows × cols) time and space: every cell enters the queue at most once`,
          try: R`خلّي الدالة ترجّع الطريق نفسه مش طوله بس: احفظ لكل خانة «جيت منين» ([[parent]])، ولما توصل للهدف ارجع بالـ parents لحد البداية واعكس. وبعدين حل «Rotting Oranges»: كل البرتقان البايظ بيبوّظ جيرانه كل دقيقة، في كام دقيقة كله يبوظ؟ (BFS بيبدأ من كل البايظين مع بعض: multi-source BFS). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[shortestRoute(grid, start, goal)]] بترجّع الخانات كـ [["r,c"]] من البداية للهدف (أو null)، و [[orangesRotting(grid)]].`,
          sol: R`الطريق في المتاهة من [[(0,0)]] لـ [[(0,3)]]: ٨ خانات (٧ خطوات)، زي [[0,0 → 1,0 → 2,0 → 2,1 → 2,2 → 2,3 → 1,3 → 0,3]]. ممكن يطلع عندك طريق تاني بنفس الطول حسب ترتيب [[dirs]]، وده صح برضه.

الـ [[parent]] ممكن تبقى Map مفتاحها [[r + "," + c]]، أو جدول زي [[dist]]. واحفظ الـ parent لحظة ما تحط الخانة في الـ queue (نفس لحظة [[dist]]).

Rotting Oranges على [[[[2,1,1],[1,1,0],[0,1,1]]]]: الإجابة 4. حط كل الـ 2 في الـ queue في الأول بمسافة 0، وعدّ البرتقان السليم. BFS عادي، وكل ما سليمة تبوظ نقّص العدد. في الآخر لو فيه سليم لسه، الإجابة [[-1]] (زي [[[[2,1,1],[0,1,1],[1,0,1]]]]). ولو مفيش سليم من الأول، الإجابة 0.

الغلطة الشائعة: تعمل BFS منفصل من كل برتقانة بايظة. ده [[O((rows × cols)^2)]] وبيدّي إجابة غلط لو مش بتاخد الـ minimum صح.`,
          solCode: R`function shortestRoute(grid, start, goal) {
  const rows = grid.length, cols = grid[0].length;
  const key = (r, c) => r + "," + c;
  const parent = new Map([[key(...start), null]]);
  const queue = [start];
  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    if (r === goal[0] && c === goal[1]) {
      const path = [];
      for (let k = key(r, c); k !== null; k = parent.get(k)) path.push(k);
      return path.reverse();
    }
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] === "#" || parent.has(key(nr, nc))) continue;
      parent.set(key(nr, nc), key(r, c));
      queue.push([nr, nc]);
    }
  }
  return null;
}
function orangesRotting(grid) {
  const g = grid.map(row => [...row]);
  let queue = [], fresh = 0, minutes = 0;
  g.forEach((row, r) => row.forEach((v, c) => { if (v === 2) queue.push([r, c]); if (v === 1) fresh++; }));
  while (queue.length && fresh > 0) {
    const next = [];
    for (const [r, c] of queue)
      for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]])
        if (g[nr]?.[nc] === 1) { g[nr][nc] = 2; fresh--; next.push([nr, nc]); }
    queue = next;
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
const maze = ["..#.", "..#.", "....", "#.#."];
console.log(shortestRoute(maze, [0, 0], [0, 3]).join(" > ")); // 0,0 > 1,0 > 2,0 > 2,1 > 2,2 > 2,3 > 1,3 > 0,3
console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])); // 4
console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])); // -1
console.log(orangesRotting([[0, 2]])); // 0
// both O(rows × cols) time and space`,
          flag: "script",
          deep: {
            why: "«أقل عدد خطوات» سؤال بيتكرر بأشكال كتير: أقل عدد نقلات في لعبة، وأقل عدد تحويلات بين كلمتين (Word Ladder)، وأقرب مخزن لكل عميل، ودرجات القرابة في شبكة اجتماعية («صديق صديقك»). وكلهم BFS على graph، سواء كان grid أو شبكة أو حالات لعبة.",
            how: R`dry run مختصر: [[dist(0,0) = 0]]. من [[(0,0)]] نضيف [[(1,0)]] و [[(0,1)]] بمسافة 1. من [[(1,0)]] نضيف [[(2,0)]] و [[(1,1)]] بمسافة 2. [[(0,1)]] جيرانها يا إما حيطة يا إما اتزاروا. وهكذا، الموجة بتتوسع خطوة خطوة.

الحيطة في [[(0,2)]] و [[(1,2)]] بتجبر الطريق ينزل لصف 2 عشان يعدّي لليمين. بعد ما يوصل [[(2,3)]] بمسافة 5، يطلع [[(1,3)]] بـ 6، و [[(0,3)]] بـ 7.

ليه بنكتب [[dist]] لحظة ما الخانة تدخل الـ queue؟ لو استنينا لحد ما تطلع، نفس الخانة ممكن تدخل الـ queue من جارين مختلفين، والـ queue تكبر. والأهم إن أول مرة بنوصل لخانة في BFS هي أقصر مسافة ليها، فمفيش داعي نكتبها تاني.

[[grid[nr][nc]]] بيشتغل على strings عادي ([["..#."[2]]] = "#")، فمش لازم نحوّل كل صف لـ array.

multi-source BFS (الـ try): بدل ما الـ queue تبدأ بعنصر واحد، تبدأ بكل المصادر مع بعض بمسافة 0. الموجات بتتوسع من كل المصادر في نفس الوقت، وكل خانة بتاخد المسافة لأقرب مصدر.`,
            when: "أقصر طريق لما كل الخطوات بنفس التكلفة: BFS، [[O(V + E)]]. لو التكاليف 0 و 1 بس، فيه 0-1 BFS بـ deque. لو التكاليف موجبة ومختلفة: Dijkstra. لو فيه تكاليف سالبة: Bellman-Ford (نادرًا ما يتسأل). ولو المطلوب «فيه طريق ولا لأ» بس، DFS كفاية.",
            mistakes: R`استخدام DFS لأقصر طريق. وإنك تعلّم الخانة لما تطلع من الـ queue بدل لما تدخل. و [[queue.shift()]] على grid كبير. وإنك تنسى حالة إن البداية هي الهدف (الإجابة 0) أو إن البداية نفسها حيطة. وإنك ترجّع [[Infinity]] أو [[undefined]] لما مفيش طريق بدل اللي المسألة طالباه (في الغالب [[-1]]).`
          },
          lines: [
            "أقل عدد خطوات من start لـ goal.",
            "الأبعاد.",
            "جدول المسافات، كله -1 في الأول (ماوصلناش).",
            "الـ queue بتبدأ بالبداية.",
            "صف وعمود البداية.",
            "المسافة للبداية 0.",
            "الاتجاهات الأربعة: تحت، فوق، يمين، شمال.",
            "queue بمؤشر head بدل shift.",
            "الخانة اللي عليها الدور.",
            "وصلنا للهدف: المسافة دي أقل مسافة أكيد.",
            "جرّب كل اتجاه.",
            "الخانة الجارة.",
            "برّا الحدود: فوّت.",
            "حيطة، أو اتزارت قبل كده: فوّت.",
            "المسافة = مسافتي + 1، وده كمان بيعلّمها إنها اتزارت.",
            "حطها في آخر الـ queue.",
            "قفلة الـ for الداخلية.",
            "قفلة الـ for الخارجية.",
            "الـ queue خلصت ومفيش وصول: مفيش طريق.",
            "قفلة.",
            "المتاهة: # حيطة، و . مكان فاضي.",
            "الصف الأول.",
            "التاني.",
            "التالت.",
            "الرابع.",
            "قفلة الـ array.",
            "لازم تنزل لصف 2 وتلف: ٧ خطوات.",
            "البداية هي الهدف.",
            "محبوس بين حيطتين."
          ],
          check: {
            lang: "js",
            starter: R`function shortestRoute(grid, start, goal) {
  const key = (r, c) => r + "," + c;
  const parent = new Map([[key(...start), null]]);
  // نفس shortestPath، واحفظ parent لكل خانة لحظة ما تدخل الـ queue
  return null;
}
function orangesRotting(grid) {
  // multi-source BFS: كل الـ 2 في الـ queue من الأول
  return -1;
}`,
            tests: R`const maze = ["..#.", "..#.", "....", "#.#."];
const isRoute = (g, p, s, t) => Array.isArray(p) && p[0] === s.join(",") && p.at(-1) === t.join(",") && p.every((k, i) => {
  const [r, c] = k.split(",").map(Number);
  if (g[r][c] === "#") return false;
  if (i === 0) return true;
  const [pr, pc] = p[i - 1].split(",").map(Number);
  return Math.abs(r - pr) + Math.abs(c - pc) === 1;
});
test("المتاهة من 0,0 لـ 0,3: 8 خانات (7 خطوات) وكل خطوة لجار مفتوح", () => {
  const p = shortestRoute(maze, [0, 0], [0, 3]);
  expect([p && p.length, isRoute(maze, p, [0, 0], [0, 3])]).toEqual([8, true]);
});
test("البداية هي الهدف ← ['0,0']", () => expect(shortestRoute(maze, [0, 0], [0, 0])).toEqual(["0,0"]));
test("مفيش طريق ← null", () => expect(shortestRoute([".#", "#."], [0, 0], [1, 1])).toBe(null));
test("orangesRotting([[2,1,1],[1,1,0],[0,1,1]]) ← 4", () => expect(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])).toBe(4));
test("برتقانة محدش يوصلها ← -1", () => expect(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])).toBe(-1));
test("مفيش سليم من الأول ← 0، وسليم من غير بايظ ← -1", () => expect([orangesRotting([[0, 2]]), orangesRotting([[1]])]).toEqual([0, -1]));
test("بايظين في طرفين بيشتغلوا مع بعض: [[2,1,1,1,2]] ← 2", () => expect(orangesRotting([[2, 1, 1, 1, 2]])).toBe(2));
test("متاهة 300 × 300 مفتوحة ← 599 خانة (O(rows × cols))", () => {
  const g = Array.from({ length: 300 }, () => ".".repeat(300));
  const p = shortestRoute(g, [0, 0], [299, 299]);
  expect([p && p.length, isRoute(g, p, [0, 0], [299, 299])]).toEqual([599, true]);
});`,
            solution: R`function shortestRoute(grid, start, goal) {
  const rows = grid.length, cols = grid[0].length;
  const key = (r, c) => r + "," + c;
  const parent = new Map([[key(...start), null]]);
  const queue = [start];
  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    if (r === goal[0] && c === goal[1]) {
      const path = [];
      for (let k = key(r, c); k !== null; k = parent.get(k)) path.push(k);
      return path.reverse();
    }
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] === "#" || parent.has(key(nr, nc))) continue;
      parent.set(key(nr, nc), key(r, c));
      queue.push([nr, nc]);
    }
  }
  return null;
}
function orangesRotting(grid) {
  const g = grid.map(row => [...row]);
  let queue = [], fresh = 0, minutes = 0;
  g.forEach((row, r) => row.forEach((v, c) => { if (v === 2) queue.push([r, c]); if (v === 1) fresh++; }));
  while (queue.length && fresh > 0) {
    const next = [];
    for (const [r, c] of queue)
      for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]])
        if (g[nr]?.[nc] === 1) { g[nr][nc] = 2; fresh--; next.push([nr, nc]); }
    queue = next;
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`
          }
        },
        {
          cmd: "topological sort (course schedule)",
          title: "رتّب المهام بحيث كل مهمة تيجي بعد اللي معتمدة عليه (Course Schedule)",
          desc: R`عندك كورسات، وكل كورس ليه prerequisites. عايز ترتيب تاخد بيه كل الكورسات بحيث متاخدش كورس قبل متطلباته. ده اسمه topological sort، وبيشتغل على directed graph من غير دواير (DAG).

طريقة Kahn (بـ BFS): احسب لكل عقدة [[indegree]] (عدد الحاجات اللي مستنياها). الحاجات اللي indegree بتاعها 0 مش مستنية حد، فحطها في الـ queue. كل ما تطلّع واحدة وتحطها في الترتيب، قلّل indegree لكل اللي معتمد عليها، واللي يوصل لـ 0 يدخل الـ queue.

لو خلصت والترتيب ناقص عقد، يبقى فيه دايرة: كورسات معتمدة على بعض في حلقة، ومحدش فيهم هيوصل لـ 0 أبدًا. فالكود نفسه بيكشف الدواير ببلاش.`,
          example: R`function courseOrder(n, prereqs) {
  const graph = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [course, pre] of prereqs) {
    graph[pre].push(course);
    indegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const order = [];
  for (let head = 0; head < queue.length; head++) {
    const c = queue[head];
    order.push(c);
    for (const next of graph[c]) if (--indegree[next] === 0) queue.push(next);
  }
  return order.length === n ? order : [];
}
console.log(courseOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // [0, 1, 2, 3]
console.log(courseOrder(2, [[1, 0], [0, 1]])); // []
console.log(courseOrder(3, [])); // [0, 1, 2]
// O(V + E) time and space`,
          try: R`طبّقها على حاجة حقيقية: عندك packages ومعتمدة على بعض كـ object: [[{ app: ["api", "ui"], api: ["db", "auth"], auth: ["db"], ui: [], db: [] }]]. اكتب [[buildOrder(deps)]] ترجّع ترتيب تبني بيه كل package بعد اللي هي معتمدة عليه، أو ترمي Error فيه كلمة cycle لو فيه اعتماد دائري. وجرّبها لما [[db]] تعتمد على [[app]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[buildOrder(deps)]] بترجّع ترتيب صح (أي ترتيب بيحقق الشروط)، أو ترمي Error فيه كلمة cycle.`,
          sol: R`الكود اللي تحت بيطلّع [[ui db auth api app]]، وأي ترتيب تاني فيه db قبل auth و api، و auth قبل api، و api و ui قبل app. الـ topological sort مش وحيد، وأي ترتيب يحقق الشروط صح.

خلي بالك من اتجاه السهم: «api معتمدة على db» يعني السهم من db لـ api (لازم db تتبني الأول)، فـ [[graph.get(db).push(api)]] و [[indegree(api)++]]. لو عكست الاتجاه هيطلعلك الترتيب مقلوب (app الأول).

لو [[db]] بقت معتمدة على [[app]]: db ← app ← api ← db دايرة، ومفيش حد فيهم indegree بتاعه هيوصل 0، فالترتيب هيطلع ناقص ([[ui]] بس)، والدالة ترمي [[cycle detected]].

واتأكد إن كل dependency ليها مكان في الـ Map حتى لو مش key في الـ object (مثلًا dependency خارجية مش متعرّفة).`,
          solCode: R`function buildOrder(deps) {
  const graph = new Map(), indegree = new Map();
  const ensure = x => { if (!graph.has(x)) { graph.set(x, []); indegree.set(x, 0); } };
  for (const [pkg, needs] of Object.entries(deps)) {
    ensure(pkg);
    for (const dep of needs) {
      ensure(dep);
      graph.get(dep).push(pkg);
      indegree.set(pkg, indegree.get(pkg) + 1);
    }
  }
  const queue = [...graph.keys()].filter(x => indegree.get(x) === 0);
  for (let head = 0; head < queue.length; head++)
    for (const next of graph.get(queue[head])) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  if (queue.length !== graph.size) throw new Error("cycle detected");
  return queue;
}
const deps = { app: ["api", "ui"], api: ["db", "auth"], auth: ["db"], ui: [], db: [] };
console.log(buildOrder(deps).join(" ")); // ui db auth api app
try { buildOrder({ ...deps, db: ["app"] }); } catch (e) { console.log(e.message); }
// O(V + E) time and space`,
          flag: "script",
          deep: {
            why: "topological sort موجود في أدوات بتستخدمها كل يوم: npm و pnpm بيرتبوا تثبيت الـ packages، و Turborepo و Nx بيرتبوا build الـ packages في monorepo، و GitHub Actions بيرتب الـ jobs حسب [[needs]]، والـ migrations بتتنفذ بالترتيب، و Excel بيعيد حساب الخلايا بعد اللي معتمدة عليه. وفي الانترفيو، Course Schedule من أشهر مسائل الـ graphs.",
            how: R`dry run على [[[[1,0],[2,0],[3,1],[3,2]]]]: الـ edges 0→1 و 0→2 و 1→3 و 2→3. الـ indegree: 0 عندها 0، و 1 و 2 عندهم 1، و 3 عندها 2.

الـ queue تبدأ بـ [0]. نطلّع 0، والترتيب [0]. نقلّل 1 و 2 لـ 0، فيدخلوا الـ queue.

نطلّع 1: نقلّل 3 لـ 1. نطلّع 2: نقلّل 3 لـ 0، فتدخل. نطلّع 3. الترتيب [0, 1, 2, 3]، وطوله 4 = n، يبقى مفيش دايرة.

في [[[[1,0],[0,1]]]]: الاتنين indegree بتاعهم 1، والـ queue بتبدأ فاضية، والترتيب طوله 0، فنرجّع [] (مستحيل).

الـ input بتاع LeetCode [[[course, pre]]] معناه «course محتاج pre»، فالسهم من pre لـ course. ده أكتر حاجة بتلخبط الناس في المسألة دي.

فيه طريقة تانية بـ DFS: رتّب العقد حسب وقت خروجها (post-order)، واعكس الترتيب. بتشتغل، بس محتاجة كشف دواير لوحدها (الدرس الجاي)، و Kahn أسهل تشرحه في الانترفيو.`,
            when: "أي «رتّب حاجات ليها شروط قبلها»: تبعيات، ومهام، وخطوات build، وترتيب قراءة دروس. ولو المطلوب «ممكن ولا لأ» بس (Course Schedule I)، نفس الكود وارجع [[order.length === n]]. ولو محتاج أول ترتيب أبجديًا، بدّل الـ queue بـ min heap.",
            mistakes: R`عكس اتجاه السهم. ونسيان العقد اللي ملهاش أي edges (لازم تدخل الترتيب برضه). ونسيان التأكد من طول الترتيب في الآخر، فترجّع ترتيب ناقص وكأنه صح. وإنك تفترض إن فيه ترتيب واحد بس صح؛ أي ترتيب يحقق الشروط مقبول، وفي الانترفيو قول كده.`
          },
          lines: [
            "n كورس، و prereqs أزواج [الكورس، متطلبه].",
            "لكل كورس، قائمة الكورسات اللي بتفتح بعده.",
            "indegree: كل كورس مستني كام متطلب.",
            "لكل شرط.",
            "السهم من المتطلب للكورس.",
            "الكورس بقى مستني واحد زيادة.",
            "قفلة.",
            "الـ queue.",
            "كل كورس مش مستني حاجة يبدأ فيها.",
            "الترتيب النهائي.",
            "queue بمؤشر.",
            "الكورس اللي عليه الدور.",
            "خده.",
            "كل اللي كان مستنيه: قلّل، واللي بقى 0 يدخل الـ queue.",
            "قفلة.",
            "لو مخدناش كل الكورسات يبقى فيه دايرة، رجّع فاضي.",
            "قفلة.",
            "0 الأول، وبعدين 1 و 2، وبعدين 3.",
            "كل واحد مستني التاني: مستحيل.",
            "مفيش شروط: أي ترتيب، والكود بيطلّعهم بالترتيب."
          ],
          check: {
            lang: "js",
            starter: R`function buildOrder(deps) {
  const graph = new Map(), indegree = new Map();
  // «api معتمدة على db» يعني السهم من db لـ api
  // واتأكد إن كل dependency ليها مكان حتى لو مش key
  return [];
}`,
            tests: R`const isValid = (deps, order) => {
  const pos = new Map(order.map((p, i) => [p, i]));
  const all = new Set(Object.entries(deps).flatMap(([p, ds]) => [p, ...ds]));
  return order.length === all.size && pos.size === all.size && Object.entries(deps).every(([p, ds]) => ds.every(d => pos.get(d) < pos.get(p)));
};
const deps = { app: ["api", "ui"], api: ["db", "auth"], auth: ["db"], ui: [], db: [] };
test("المثال: db قبل auth و api، و auth قبل api، و api و ui قبل app", () => expect(isValid(deps, buildOrder(deps))).toBe(true));
test("{} ← []", () => expect(buildOrder({})).toEqual([]));
test("dependency مش key: { a: ['ext'] } ← ['ext', 'a']", () => expect(buildOrder({ a: ["ext"] })).toEqual(["ext", "a"]));
test("db معتمدة على app ← Error فيه cycle", () => expect(() => buildOrder({ ...deps, db: ["app"] })).toThrow(/cycle/));
test("package معتمدة على نفسها ← cycle", () => expect(() => buildOrder({ a: ["a"] })).toThrow(/cycle/));
test("سلسلة 20 ألف package (O(V + E))", () => {
  const d = {};
  for (let i = 1; i < 20000; i++) d["p" + i] = ["p" + (i - 1)];
  const order = buildOrder(d);
  expect([order.length, order[0], order.at(-1)]).toEqual([20000, "p0", "p19999"]);
});`,
            solution: R`function buildOrder(deps) {
  const graph = new Map(), indegree = new Map();
  const add = p => { if (!graph.has(p)) { graph.set(p, []); indegree.set(p, 0); } };
  for (const [p, ds] of Object.entries(deps)) {
    add(p);
    for (const d of ds) {
      add(d);
      graph.get(d).push(p);
      indegree.set(p, indegree.get(p) + 1);
    }
  }
  const queue = [...graph.keys()].filter(p => indegree.get(p) === 0);
  for (let head = 0; head < queue.length; head++) {
    for (const next of graph.get(queue[head])) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  if (queue.length !== graph.size) throw new Error("cycle detected");
  return queue;
}`
          }
        },
        {
          cmd: "cycle detection",
          title: "فيه دايرة في الـ graph؟ (circular imports و deadlocks)",
          desc: R`كشف الدواير بيختلف حسب نوع الـ graph:

directed graph: بـ DFS و ٣ حالات لكل عقدة: 0 لسه مازرتهاش، و 1 أنا جوه المسار الحالي بتاعها (نزلت منها ولسه مارجعتش)، و 2 خلصت كل اللي تحتها. لو قابلت عقدة حالتها 1، يبقى رجعت لحاجة لسه في المسار: دايرة. لو حالتها 2، دي اتفحصت قبل كده ومفيش منها دايرة، فوّتها.

ليه مش [[seen]] عادية؟ في شكل الـ diamond (0→1 و 0→2 و 1→2)، هتوصل لـ 2 مرتين من طريقين مختلفين. ده مش دايرة، بس Set عادية هتقول إنه دايرة.

undirected graph: كل edge بيبان من الناحيتين، فلازم تتجاهل الأب اللي جيت منه. لو قابلت جار اتزار ومش أبوك، يبقى فيه دايرة.

وللـ directed فيه طريقة تانية ببلاش: Kahn من الدرس اللي فات، لو الترتيب طلع ناقص.`,
          example: R`function hasCycleDirected(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) graph[u].push(v);
  const state = new Array(n).fill(0);
  const visit = u => {
    if (state[u] === 1) return true;
    if (state[u] === 2) return false;
    state[u] = 1;
    for (const v of graph[u]) if (visit(v)) return true;
    state[u] = 2;
    return false;
  };
  for (let u = 0; u < n; u++) if (visit(u)) return true;
  return false;
}
function hasCycleUndirected(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  const seen = new Array(n).fill(false);
  const visit = (u, parent) => {
    seen[u] = true;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (seen[v] || visit(v, u)) return true;
    }
    return false;
  };
  for (let u = 0; u < n; u++) if (!seen[u] && visit(u, -1)) return true;
  return false;
}
console.log(hasCycleDirected(3, [[0, 1], [1, 2], [2, 0]])); // true
console.log(hasCycleDirected(3, [[0, 1], [0, 2], [1, 2]])); // false
console.log(hasCycleUndirected(3, [[0, 1], [1, 2]])); // false
console.log(hasCycleUndirected(3, [[0, 1], [1, 2], [2, 0]])); // true
// both O(V + E) time, O(V) space`,
          try: R`اكشف الـ circular imports في مشروع: [[{ "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"], "d.js": ["a.js"] }]] (كل ملف والملفات اللي بيعملها import). اكتب [[findCycle(imports)]] ترجّع الدايرة نفسها كـ array، زي [[["a.js", "b.js", "c.js", "a.js"]]]، أو null لو مفيش. (احفظ المسار الحالي في stack، ولما تقابل عقدة حالتها 1، اقطع المسار من عندها.) اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[findCycle(imports)]] بترجّع الدايرة (أول ملف متكرر في الآخر) أو null.`,
          sol: R`الإجابة: [[a.js → b.js → c.js → a.js]]. لو بدأت الـ DFS من [[d.js]] الأول برضه هتلاقي نفس الدايرة، بس d.js مش جزء منها، عشان كده بنقطع المسار من أول ظهور لـ [[a.js]] مش من أوله.

الحالات: [[path]] array فيها المسار الحالي. أول ما تنزل على ملف: حالته 1 و [[path.push]]. لما ترجع منه: حالته 2 و [[path.pop]]. لو قابلت ملف حالته 1: [[path.slice(path.indexOf(file))]] وضيف الملف في الآخر عشان تقفل الدايرة.

من غير دايرة (شيل [[c.js → a.js]]) الإجابة null.

ده بالظبط اللي أدوات زي madge و ESLint rule [[import/no-cycle]] بتعمله. و circular imports في Node بتطلّع bugs غريبة: الـ module بيستلم object ناقص لأن الملف التاني لسه ماخلصش تحميل.`,
          solCode: R`function findCycle(imports) {
  const state = new Map(), path = [];
  const visit = file => {
    if (state.get(file) === 1) return [...path.slice(path.indexOf(file)), file];
    if (state.get(file) === 2) return null;
    state.set(file, 1);
    path.push(file);
    for (const dep of imports[file] ?? []) {
      const cycle = visit(dep);
      if (cycle) return cycle;
    }
    path.pop();
    state.set(file, 2);
    return null;
  };
  for (const file of Object.keys(imports)) {
    const cycle = visit(file);
    if (cycle) return cycle;
  }
  return null;
}
console.log(findCycle({ "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"], "d.js": ["a.js"] })); // ['a.js', 'b.js', 'c.js', 'a.js']
console.log(findCycle({ "d.js": ["a.js"], "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"] })); // ['a.js', 'b.js', 'c.js', 'a.js']
console.log(findCycle({ "a.js": ["b.js"], "b.js": ["c.js"], "c.js": [] })); // null
// O(V + E) time, O(V) space`,
          flag: "script",
          deep: {
            why: "الدواير مشكلة حقيقية في الشغل: circular imports بتطلّع [[undefined]] في أماكن غريبة، و deadlock في الداتابيز هو دايرة «مين مستني مين»، والـ migration أو الـ build اللي معتمد على نفسه بيعلّق. وفي الانترفيو، Course Schedule في الأساس سؤال «فيه دايرة ولا لأ».",
            how: R`dry run للـ directed على [[0→1، 1→2، 2→0]]: [[visit(0)]]: حالتها 1. تنزل 1: حالتها 1. تنزل 2: حالتها 1. تنزل 0: حالتها 1 بالفعل، يعني 0 لسه في المسار: دايرة.

الـ diamond [[0→1، 0→2، 1→2]]: [[visit(0)]] تنزل 1، و 1 تنزل 2، و 2 ملهاش حاجة فتبقى 2 (خلصت). نرجع 1 تبقى 2. نرجع 0 وتنزل 2 تاني: حالتها 2، فوّت. مفيش دايرة. لو كنا بنستخدم Set عادية كانت هتقول «2 اتزارت» وتعتبرها دايرة.

الـ undirected على [[0-1، 1-2]]: [[visit(0, -1)]] تنزل 1 وأبوها 0. جيران 1: 0 (الأب، فوّت) و 2. تنزل 2 وأبوها 1. جيران 2: 1 (الأب). مفيش دايرة. ولو ضفت [[2-0]]: جيران 2 فيها 0، و 0 اتزارت ومش الأب، دايرة.

الـ loop الخارجي على كل العقد عشان الـ graph ممكن يبقى أكتر من جزيرة، والدايرة ممكن تبقى في أي واحدة.`,
            when: "directed (imports، تبعيات، مهام): ٣ حالات أو Kahn. undirected (شبكة، طرق): parent أو union-find (درس «union-find» في نفس المستوى، وبيبقى أسهل لما الـ edges بتيجي واحدة واحدة). ولو محتاج الدايرة نفسها مش مجرد true/false، الـ DFS بالـ path هو اللي بيطلّعها.",
            mistakes: R`Set واحدة في الـ directed فالـ diamond يبان دايرة. ونسيان الأب في الـ undirected فكل edge يبان دايرة (0 تروح 1، و 1 تشوف 0 «اتزارت»). ولو فيه edges مكررة بين نفس العقدتين (multi-graph)، مقارنة الأب بالقيمة بتفوّت الدايرة الصغيرة دي، والحل تقارن بـ id الـ edge. وإنك تنسى إن DFS الـ recursive على graph فيه مليون عقدة في خط ممكن يعمل stack overflow.`
          },
          lines: [
            "كشف دايرة في directed graph.",
            "adjacency list.",
            "السهم في اتجاه واحد بس.",
            "0 جديدة، 1 في المسار الحالي، 2 خلصت.",
            "visit بترجّع true لو لقت دايرة.",
            "رجعت لعقدة لسه في المسار: دايرة.",
            "اتفحصت قبل كده ومفيش منها دايرة.",
            "أنا دلوقتي في المسار.",
            "انزل على كل جار، ولو أي واحد لقى دايرة ارجع true.",
            "خلصت كل اللي تحتي من غير دواير.",
            "مفيش دايرة من هنا.",
            "قفلة visit.",
            "ابدأ من كل عقدة (العقد اللي خلصت بترجع على طول).",
            "مفيش دواير.",
            "قفلة.",
            "كشف دايرة في undirected graph.",
            "adjacency list.",
            "كل edge من الناحيتين.",
            "اللي اتزار.",
            "visit بتعرف هي جاية منين.",
            "علّم.",
            "لكل جار.",
            "ده اللي جيت منه، مش دايرة.",
            "جار اتزار ومش أبويا، أو دايرة تحت: دايرة.",
            "قفلة الـ for.",
            "مفيش.",
            "قفلة visit.",
            "كل جزيرة لوحدها.",
            "مفيش دواير.",
            "قفلة.",
            "0 ثم 1 ثم 2 ثم 0: دايرة.",
            "diamond: طريقين لـ 2، مش دايرة.",
            "خط: مفيش دايرة.",
            "مثلث: دايرة."
          ],
          check: {
            lang: "js",
            starter: R`function findCycle(imports) {
  const state = new Map(); // 0 مزارش، 1 في المسار الحالي، 2 خلص
  const path = [];
  // لما تقابل ملف حالته 1: path.slice(path.indexOf(file)) وضيف الملف في الآخر
  return null;
}`,
            tests: R`const isCycle = (g, c) => Array.isArray(c) && c.length >= 2 && c[0] === c.at(-1) && new Set(c.slice(0, -1)).size === c.length - 1 && c.slice(0, -1).every((f, i) => (g[f] || []).includes(c[i + 1]));
const g = { "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"], "d.js": ["a.js"] };
test("a.js → b.js → c.js → a.js", () => {
  const c = findCycle(g);
  expect([isCycle(g, c), c && [...c.slice(0, -1)].sort()]).toEqual([true, ["a.js", "b.js", "c.js"]]);
});
test("d.js مش جزء من الدايرة حتى لو الـ DFS بدأ منها", () => {
  const g2 = { "d.js": ["a.js"], "a.js": ["b.js"], "b.js": ["a.js"] };
  const c = findCycle(g2);
  expect([isCycle(g2, c), c.includes("d.js")]).toEqual([true, false]);
});
test("من غير دايرة ← null", () => expect(findCycle({ "a.js": ["b.js"], "b.js": ["c.js"], "d.js": ["a.js"] })).toBe(null));
test("ملف بيعمل import لنفسه ← ['a.js', 'a.js']", () => expect(findCycle({ "a.js": ["a.js"] })).toEqual(["a.js", "a.js"]));
test("import لحاجة مش ملف في المشروع (lodash) ← null من غير ما يقع", () => expect(findCycle({ "a.js": ["lodash"] })).toBe(null));
test("شكل الماسة من غير دايرة (حالة 2 مش 1) ← null", () => expect(findCycle({ a: ["b", "c"], b: ["d"], c: ["d"], d: [] })).toBe(null));`,
            solution: R`function findCycle(imports) {
  const state = new Map();
  const path = [];
  const visit = f => {
    const s = state.get(f) || 0;
    if (s === 1) return [...path.slice(path.indexOf(f)), f];
    if (s === 2) return null;
    state.set(f, 1);
    path.push(f);
    for (const next of imports[f] || []) {
      const c = visit(next);
      if (c) return c;
    }
    path.pop();
    state.set(f, 2);
    return null;
  };
  for (const f of Object.keys(imports)) {
    const c = visit(f);
    if (c) return c;
  }
  return null;
}`
          }
        }
      ]
    }
]);
