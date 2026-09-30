// الأساس المشترك: كل ملف في tabs/ بينادي TAB() فيتسجّل في الأماكن اللي الصفحة بتقرا منها
const R = String.raw;
const SHELLS = {}, LAB = {}, LABTXT = {}, LEVEL_TAB = {}, DATA = {}, DEEP = {}, BREAK = {}, SOL = {}, BASH_OS = {}, CHECK = {};
const LEVEL_INFO = {
  "1": ["البداية", "تتحرك بين الفولدرات وتتعامل مع الملفات وتقراها بثقة"],
  "2": ["المتوسط", "توصّل الأوامر ببعض، وتدير الصلاحيات والعمليات والشبكة"],
  "3": ["المتقدم", "سكربتات وأتمتة وحاجات هتعملها على السيرفر كل يوم"]
};
const LABDEF = "اعمل فولدر اسمه lab وجرب كل حاجة جواه، عشان أوامر المسح ملهاش سلة محذوفات.";
const AR = n => String(n);

/* a dollar-brace can't live inside String.raw templates, so the content writes $__{ and it is restored here */
/* a backtick can't live there either (JS template literals in code examples), so the content writes $__bt */
/* and the single-file build writes the < of a closing script tag as $__lt so it doesn't end its inline script */
function fixDollar(o){ for (const k in o){ if (typeof o[k]==='string') o[k]=o[k].split('$__{').join('$'+'{').split('$__bt').join('\x60').split('$__lt').join('<'); else if (o[k] && typeof o[k]==='object') fixDollar(o[k]); } return o; }

function TAB(key, def){
  fixDollar(def);
  SHELLS[key] = {label:def.label, prompt:def.prompt};
  if (def.lab !== undefined) LAB[key] = def.lab;
  if (def.labText !== undefined) LABTXT[key] = def.labText;
  if (def.levels) LEVEL_TAB[key] = def.levels;
  DATA[key] = def.categories.map(c => {
    const cat = {t:c.t, l:c.l};
    if (c.n !== undefined) cat.n = c.n;
    cat.items = c.items.map(it => {
      const id = key+'|'+it.cmd;
      if (it.deep) DEEP[id] = it.deep;
      if (it.lines) BREAK[id] = it.lines;
      if (it.sol) SOL[id] = {text: it.sol, code: it.solCode};
      if (it.mac) BASH_OS[it.cmd] = it.mac;
      if (it.check) CHECK[id] = it.check;
      const row = [it.cmd, it.title, it.desc, it.example, it.try];
      if (it.flag !== undefined) row.push(it.flag);
      return row;
    });
    return cat;
  });
}

/* ---------- auto-checked exercises (the lesson field check) ---------- */
/* runs a JS exercise: the learner's code, then the tests, in one async function so the tests see the learner's functions.
   The page runs it inside a Worker built from this function's source (so it has to stay self-contained),
   and tools/check.js runs it in node against check.solution. */
async function runJsCheck(code, tests){
  const logs = [], results = [], queue = [];
  const show = v => { try{ return typeof v==='number' || typeof v==='undefined' ? String(v) : typeof v==='bigint' ? v+'n' : typeof v==='function' ? 'function' : JSON.stringify(v) ?? String(v); }catch(e){ return String(v); } };
  const eq = (a, b) => {
    if (Object.is(a, b)) return true;
    if (!a || !b || typeof a!=='object' || typeof b!=='object') return false;
    if (a instanceof Date || b instanceof Date) return a instanceof Date && b instanceof Date && +a===+b;
    if (Array.isArray(a)!==Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    return ka.length===kb.length && ka.every(k => Object.prototype.hasOwnProperty.call(b, k) && eq(a[k], b[k]));
  };
  const q = v => '[['+show(v)+']]';
  const fail = m => { const e = new Error(m); e.isExpect = true; throw e; };
  const expect = x => ({
    toBe: y => Object.is(x, y) || fail('المتوقع '+q(y)+' بس طلع '+q(x)),
    toEqual: y => eq(x, y) || fail('المتوقع '+q(y)+' بس طلع '+q(x)),
    toBeTruthy: () => !!x || fail('المتوقع قيمة truthy بس طلع '+q(x)),
    toBeFalsy: () => !x || fail('المتوقع قيمة falsy بس طلع '+q(x)),
    toThrow: m => {
      if (typeof x!=='function') fail('toThrow محتاج دالة: expect(() => ...).toThrow()');
      try{ x(); }catch(e){
        const msg = String(e && e.message !== undefined ? e.message : e);
        if (m===undefined || (m instanceof RegExp ? m.test(msg) : msg.includes(m))) return true;
        fail('رمى error رسالته '+q(msg)+'، والمتوقع يكون فيها '+q(String(m)));
      }
      fail('المتوقع يرمي error، بس خلص عادي');
    }
  });
  const out = (...a) => { if (logs.length < 200) logs.push(a.map(v => typeof v==='string' ? v : show(v)).join(' ')); };
  const con = {log:out, info:out, warn:out, error:out, table:out};
  const errText = e => '[['+(e && e.message !== undefined ? (e.name || 'Error')+': '+e.message : String(e))+']]';
  let fn;
  // the tests go in their own block, so a helper they declare (const node, const root...) can't clash with the same name in the learner's code
  try{ fn = new (async function(){}).constructor('test', 'expect', 'console', code+'\n;\n{\n'+tests+'\n}'); }
  catch(e){ return {results, logs, error:'الكود فيه غلطة في الكتابة، فمتشغّلش خالص: '+errText(e)}; }
  try{ await fn((name, f) => queue.push([String(name), f]), expect, con); }
  catch(e){ return {results, logs, error:'الكود رمى error قبل ما الاختبارات تبدأ: '+errText(e)}; }
  if (!queue.length) return {results, logs, error:'مفيش ولا test() اتسجّل. لو كاتب return بره أي دالة شيله.'};
  for (const [name, f] of queue){
    try{ await f(); results.push({name, ok:true}); }
    catch(e){ results.push({name, ok:false, msg: e && e.isExpect ? e.message : 'رمى error: '+errText(e)}); }
  }
  return {results, logs};
}
/* SQL exercises compare rows by value: numbers as numbers (count() = 2 and numeric 2.50 = 2.5), dates as ISO text,
   and the row order is ignored unless the exercise sets ordered: true */
const sqlCell = v => v===null || v===undefined ? null : typeof v==='boolean' ? v : v instanceof Date ? v.toISOString()
  : typeof v==='number' || typeof v==='bigint' || (typeof v==='string' && /^-?\d+(\.\d+)?$/.test(v.trim())) ? Number(v)
  : typeof v==='object' ? JSON.stringify(v) : String(v);
function sqlDiff(got, exp, ordered){
  const k = rows => rows.map(r => JSON.stringify(r.map(sqlCell)));
  const a = k(got), b = k(exp), wa = got[0] ? got[0].length : 0, wb = exp[0] ? exp[0].length : 0;
  if (a.length && b.length && wa!==wb) return 'عدد الأعمدة: المتوقع '+wb+' وطلع '+wa+'.';
  if (a.length!==b.length) return 'عدد الصفوف: المتوقع '+b.length+' وطلع '+a.length+'.';
  if (a.every((x, i) => x===b[i])) return '';
  const sa = a.slice().sort(), sb = b.slice().sort();
  if (sa.every((x, i) => x===sb[i])) return ordered ? 'الصفوف صح بس الترتيب لأ: التمرين طالب ترتيب معيّن (ORDER BY).' : '';
  return 'القيم مش زي المتوقع. قارن جدولك بالناتج المتوقع.';
}
