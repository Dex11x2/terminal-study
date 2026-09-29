// الأساس المشترك: كل ملف في tabs/ بينادي TAB() فيتسجّل في الأماكن اللي الصفحة بتقرا منها
const R = String.raw;
const SHELLS = {}, LAB = {}, LABTXT = {}, LEVEL_TAB = {}, DATA = {}, DEEP = {}, BREAK = {}, BASH_OS = {};
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
      if (it.mac) BASH_OS[it.cmd] = it.mac;
      const row = [it.cmd, it.title, it.desc, it.example, it.try];
      if (it.flag !== undefined) row.push(it.flag);
      return row;
    });
    return cat;
  });
}
