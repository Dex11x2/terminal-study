// بيقيس الكورس على منهجه الرسمي (syllabus/<tab>.json)، مش على قايمة من الذاكرة (ROADMAP القاعدة ١).
//   node tools/syllabus.js               ملخص كل كورس ليه منهج
//   node tools/syllabus.js <tab>         الناقص في الكورس ده، متقسّم
//   node tools/syllabus.js <tab> --all   كل بند وهو متغطي فين
//   node tools/syllabus.js <tab> --write يكتب التقرير في syllabus/<tab>.md (بيتعمله commit، والشات الجاي يقراه)
//
// البند «متغطي» لو:
//   - اسمه في cmd درس، أو في عنوان ## / ### جوه teach، أو أول خانة في صف جدول جوه الشرح (يعني ليه درس أو قسم أو صف باسمه)، أو
//   - ليه at يدوي في المنهج («cmd» أو «cmd › عنوان القسم») والدرس والقسم دول موجودين فعلًا، أو
//   - ليه under (خاصية طويلة تبع مختصرة): المختصرة متغطية والطويلة مذكورة بالاسم في الكورس.
// ذكر عابر جوه كود أو جملة مش بيتحسب: بيطلع «مذكور من غير شرح».
// البند اللي عليه skip مستبعد بسببه ومبيتحسبش. لو اتشرح برضه بيتكتب «متغطي».
const fs = require('fs'), path = require('path');
const L = require('./lib.js');
const DIR = path.join(L.ROOT, 'syllabus');
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const spans = s => [...String(s).matchAll(/\[\[(.+?)\]\]/g)].map(m => m[1]);
const tok = n => new RegExp('(?<![\\w<@:.#-])' + esc(n) + '(?![\\w-])');

function lessonPlaces(item) {
  const prose = [item.teach, item.desc, ...Object.values(item.deep || {})].filter(x => typeof x === 'string').join('\n');
  const heads = (String(item.teach || '').match(/^#{2,4} .+$/gm) || []).map(h => h.replace(/^#+ /, ''));
  // first cell of every table row, with the header of its column (an element table says «العنصر» there)
  const cells = []; let head = null;
  for (const line of prose.split('\n')) {
    if (!line.startsWith('|')) { head = null; continue; }
    if (/^\|[\s:|-]+$/.test(line)) continue;
    const c = (line.split(/(?<!\\)\|/)[1] || '').trim();
    if (head === null) head = c; else cells.push({ c, h: head });
  }
  return { cmd: String(item.cmd), heads, cells, all: JSON.stringify(item) };
}

// matcher(item, ELS) -> { cmd(text), named(text): heading or table cell, mention(wholeLessonText) }
// element names that are also a CSS unit, property or function (em, s, q…): a lesson name can't tell which one it means
let AMBIG = new Set(), SHARED = new Map();
const CAT_OWNER = { 'المصفوفات': 'Array', 'المتغيرات والنصوص': 'String', 'الـ objects': 'Object', 'async: الـ Promises و await': 'Promise', 'التواريخ والوقت': 'Date', 'regex': 'RegExp', 'this': 'Function' };
// a JavaScript object as a lesson names it: Array lessons say «array», a typed array lesson names Uint8Array
const LOWER = new Set(['Array', 'String', 'Number', 'Object', 'Promise', 'Function', 'Boolean', 'Date', 'Symbol', 'Error', 'Iterator', 'Generator', 'BigInt', 'RegExp']);
function ownerRe(o) {
  if (o === 'TypedArray') return /TypedArray|(Big)?(Ui|I)nt\d+(Clamped)?Array|Float\d+Array|typed array/;
  if (o === 'RegExp') return /RegExp|regex/i;
  if (/^Async/.test(o)) return new RegExp(o + '|async (generator|iterator)', 'i');
  return new RegExp('(?<![\\w$])(' + esc(o.replace(/^Intl\./, '')) + ')(?![\\w$])', LOWER.has(o) ? 'i' : '');
}
function matcher(it, ELS) {
  const n = it.name, inSpan = (t, re) => spans(t).some(s => re.test(s)), exact = t => spans(t).some(s => s.trim() === n) || t.replace(/\[\[|\]\]/g, '').trim() === n;
  switch (it.kind) {
    case 'element': {
      const tag = new RegExp('<' + esc(n) + '(?=[\\s>/]|$)');
      // JSX snippets (className=) are React examples, not the place the element is taught; a bare name counts only in a table whose first column is the element
      return { cmd: t => !AMBIG.has(n) && tok(n).test(t), named: (t, h) => spans(t).some(s => !/className=/.test(s) && tag.test(s)) || (/عنصر|element|tag/i.test(h || '') && exact(t)), mention: t => new RegExp('<' + esc(n) + '[\\s>/\\\\]').test(t) };
    }
    case 'attribute': {
      if (it.skip && /\*/.test(n)) return { cmd: () => false, named: () => false, mention: () => false };
      const isEl = ELS.has(n);
      const inTag = new RegExp('(^|[\\s"])' + esc(n) + '(=|\\s|>|$)');
      return { cmd: t => !isEl && tok(n).test(t), named: t => spans(t).some(s => (/</.test(s) || /=/.test(s)) ? inTag.test(s.replace(/^<\/?[\w-]+/, ' ')) : (!isEl && s.trim() === n)), mention: t => new RegExp('[\\s"]' + esc(n) + '=').test(t) };
    }
    case 'input-type': {
      const re = new RegExp('type=\\\\?"?' + esc(n) + '(?![\\w-])');
      return { cmd: t => !ELS.has(n) && tok(n).test(t), named: t => inSpan(t, re), mention: t => re.test(t) };
    }
    case 'rel': {
      const re = new RegExp('rel=\\\\?"[^"]*(?<![\\w-])' + esc(n) + '(?![\\w-])');
      return { cmd: () => false, named: t => inSpan(t, re), mention: t => re.test(t) };
    }
    case 'property': {
      const decl = new RegExp('(?<![\\w-])' + esc(n) + '\\s*:'), plain = new RegExp('(?<![\\w-])' + esc(n) + '(?![\\w(-])');
      return { cmd: t => plain.test(t), named: t => inSpan(t, decl) || exact(t) || (n.includes('-') && plain.test(t)), mention: t => (it.under ? plain : decl).test(t) };
    }
    case 'selector': {
      if (!n.startsWith(':')) return { cmd: () => false, named: () => false, mention: () => false };
      const re = new RegExp('(?<!:)' + esc(n.replace(/\(\)$/, '')) + '(?![\\w-])');
      return { cmd: t => re.test(t), named: t => re.test(t), mention: t => re.test(t) };
    }
    case 'at-rule': { const re = new RegExp(esc(n) + '(?![\\w-])'); return { cmd: t => re.test(t), named: t => re.test(t), mention: t => re.test(t) }; }
    case 'function': { const re = new RegExp('(?<![\\w-])' + esc(n.replace(/\(\)$/, '')) + '\\('); return { cmd: t => re.test(t), named: t => re.test(t), mention: t => re.test(t) }; }
    case 'unit': {
      const num = new RegExp('(?<![\\w.#-])\\d*\\.?\\d+' + esc(n) + '(?![\\w-])');
      return { cmd: t => tok(n).test(t), named: t => inSpan(t, num) || exact(t), mention: t => num.test(t) };
    }
    case 'type': { const f = t => t.includes(n); return { cmd: f, named: f, mention: f }; }
    // ---- JavaScript (syllabus/js.json)
    case 'builtin': { const re = new RegExp('(?<![\\w$.])' + esc(n.replace(/\(\)$/, '')) + '(?![\\w$])'); return { cmd: t => re.test(t), named: t => re.test(t), mention: t => re.test(t) }; }
    case 'member': {
      if (it.static || it.name.startsWith(it.owner + '.' + it.short.split('.')[0]) && !it.name.includes('.prototype')) {
        // Object.keys, Math.max, Symbol.iterator: the full name or nothing
        const re = new RegExp('(?<![\\w$])' + esc(it.name.replace(/\(\)$/, '')) + '(?![\\w$])');
        return { cmd: t => re.test(t), named: t => re.test(t), mention: t => re.test(t) };
      }
      // arr.map(): the method's name, in a lesson that is about its owner (map in an Array lesson, not in a Map one)
      const short = it.short.startsWith('Symbol.') ? '[' + it.short + ']' : it.short;
      const re = new RegExp((short.startsWith('[') ? '' : '(?<![\\w$#-])') + esc(short) + '(?![\\w$-])');
      // a name only one object has (call, matchAll, flags) is enough; a shared one (toString, size, entries) needs its object named
      // in the heading or cell itself, the lesson's name, or its category
      const own = ownerRe(it.owner), alone = it.owner !== 'TypedArray' && (SHARED.get(it.short) || new Set()).size === 1;
      // the unique-name shortcut needs the name written as code ([[unicode]] or .unicode), not as an English word in a heading («unicode escape sequences»)
      const asCode = t => spans(t).some(s => re.test(s)) || new RegExp('\\.' + esc(short) + '(?![\\w$])').test(t);
      const about = (t, l) => (alone && asCode(t)) || !l || own.test(t) || own.test(l.cmd) || own.test(l.cat) || CAT_OWNER[l.cat] === it.owner;
      return { cmd: (t, l) => re.test(t) && about(t, l), named: (t, h, l) => re.test(t) && about(t, l), mention: t => own.test(t) && new RegExp('\\.' + esc(short) + '\\b').test(t) };
    }
    case 'operator': case 'statement': case 'syntax': case 'regex': case 'concept': {
      let re;
      if (it.alias) re = new RegExp(it.alias, 'i');
      else if (it.symbol && it.kind === 'operator') {
        // a + b: the symbol standing alone between spaces; -x, x++: stuck to its operand; ?. is always stuck
        const s = esc(it.symbol), alone = `(?:^|\\s)${s}(?=\\s|$)`;
        const r = it.symbol === '?.' ? new RegExp(s)
          : /^(Unary|Logical NOT|Bitwise NOT|Increment|Decrement)/.test(n) ? new RegExp(`${/^Unary/.test(n) ? '(?!)' : alone}|(?:^|[\\s(])${s}(?=[\\w$(])|[\\w$)]${s}(?=\\s|$|[);,])`)
          : new RegExp(alone);
        re = { test: t => r.test(t.replace(/\[\[|\]\]/g, ' ')) };
      } else if (/^[a-z][\w.*()]*$/.test(n)) re = new RegExp('(?<![\\w$."-])' + esc(n.replace(/\(\)$/, '')) + '(?![\\w$"-])'); // "in-stock" is not the in operator
      else re = new RegExp(esc(n.replace(/ \([^)]*\)$/, '')), 'i');
      return { cmd: t => re.test(t), named: t => re.test(t), mention: t => re.test(t) };
    }
    default: return { cmd: () => false, named: () => false, mention: () => false };
  }
}

function measure(tab) {
  const syl = JSON.parse(fs.readFileSync(path.join(DIR, tab + '.json'), 'utf8'));
  const raw = L.loadRaw({ [tab]: L.tabFiles()[tab] })[tab] || [];
  const lessons = raw.map(r => ({ cat: r.cat, ...lessonPlaces(r.item) }));
  const byCmd = new Map(lessons.map(l => [l.cmd, l]));
  const ELS = new Set(syl.items.filter(i => i.kind === 'element').map(i => i.name));
  SHARED = new Map();
  for (const i of syl.items) if (i.kind === 'member' && !i.static && i.owner !== 'TypedArray') { if (!SHARED.has(i.short)) SHARED.set(i.short, new Set()); SHARED.get(i.short).add(i.owner); }
  AMBIG = new Set(syl.items.filter(i => /^(unit|property|function)$/.test(i.kind)).map(i => i.name.replace(/\(\)$/, '')));
  const res = new Map(), bad = [];
  const find = it => {
    if (it.at) {
      const [cmd, h0] = it.at.split(' › '), head = h0 && h0.replace(/^#+ /, '');
      const l = byCmd.get(cmd);
      if (!l) bad.push(`${it.id}: at بيشاور على درس مش موجود «${cmd}»`);
      else if (head && !l.heads.some(h => h.includes(head))) bad.push(`${it.id}: القسم «${head}» مش في درس «${cmd}»`);
      else return { how: 'يدوي', where: it.at };
    }
    const m = matcher(it, ELS);
    for (const l of lessons) if (m.cmd(l.cmd, l)) return { how: 'درس', where: l.cmd };
    for (const l of lessons) { const h = l.heads.find(h => m.named(h, undefined, l)); if (h) return { how: 'قسم', where: l.cmd + ' › ' + h }; }
    for (const l of lessons) { const c = l.cells.find(c => m.named(c.c, c.h, l)); if (c) return { how: 'جدول', where: l.cmd + ' › صف ' + c.c }; }
    const n = lessons.filter(l => m.mention(l.all));
    return { how: null, mentions: n.length, first: n[0] && n[0].cmd };
  };
  for (const it of syl.items) res.set(it.id, find(it));
  // a longhand rides on its shorthand when the shorthand is taught and the longhand is at least named
  for (const it of syl.items) {
    const r = res.get(it.id);
    if (r.how || !it.under) continue;
    const p = res.get('prop:' + it.under);
    if (p && p.how && r.mentions) res.set(it.id, { how: 'مع المختصرة', where: p.where + ' (' + it.under + ')' });
  }
  return { syl, res, bad, lessons: lessons.length };
}

function summary(tab) {
  const { syl, res, bad, lessons } = measure(tab);
  const kinds = {};
  for (const it of syl.items) {
    const k = kinds[it.kind] = kinds[it.kind] || { in: 0, ok: 0, skip: 0, skipTaught: 0, miss: [], thin: [] };
    const r = res.get(it.id);
    if (it.skip) { k.skip++; if (r.how) k.skipTaught++; continue; }
    k.in++;
    if (r.how) k.ok++; else (r.mentions ? k.thin : k.miss).push(it);
  }
  return { syl, res, bad, lessons, kinds };
}

const KIND = { builtin: 'objects جاهزة (built-ins)', member: 'methods و properties', operator: 'operators و expressions', statement: 'statements', syntax: 'syntax (دوال و classes و grammar)', regex: 'regex syntax', concept: 'مفاهيم (MDN Guide)', error: 'رسايل الأخطاء', element: 'عناصر HTML', attribute: 'attributes', 'input-type': 'أنواع input', rel: 'قيم rel', property: 'خصائص CSS', selector: 'selectors', 'at-rule': 'at-rules', function: 'دوال CSS', unit: 'وحدات', type: 'أنواع القيم', outcome: 'مهارات (MDN Curriculum)' };

function report(tab, all) {
  const { syl, res, bad, lessons, kinds } = summary(tab);
  const out = [];
  let IN = 0, OK = 0;
  for (const k of Object.values(kinds)) { IN += k.in; OK += k.ok; }
  out.push(`# منهج ${syl.course} (${tab}): ${OK} من ${IN} بند متغطي (${Math.floor(OK / IN * 100)}٪)`, '');
  out.push(`اتبنى ${syl.built} من: ${syl.refs.map(r => `[${r.name}](${r.url})`).join('، ')}. الكورس فيه ${lessons} درس. الملف ده بيتولّد بـ \`node tools/syllabus.js ${tab} --write\`، متعدّلوش بإيدك.`, '');
  out.push('| النوع | في المنهج | متغطي | مذكور من غير شرح | ناقص خالص | مستبعد بسبب |', '|---|---|---|---|---|---|');
  for (const [kind, k] of Object.entries(kinds)) out.push(`| ${KIND[kind] || kind} | ${k.in} | ${k.ok} | ${k.thin.length} | ${k.miss.length} | ${k.skip} |`);
  out.push('');
  if (bad.length) out.push('## أخطاء في المنهج', '', ...bad.map(b => '- ' + b), '');
  const line = it => '`' + it.name + '`';
  for (const [kind, k] of Object.entries(kinds)) {
    if (!k.miss.length && !k.thin.length) continue;
    out.push(`## ${KIND[kind] || kind}: ناقص ${k.miss.length + k.thin.length}`, '');
    const groups = {};
    for (const it of [...k.miss, ...k.thin]) (groups[it.group || ''] = groups[it.group || ''] || []).push(it);
    for (const [g, list] of Object.entries(groups)) {
      if (kind === 'outcome') { out.push(`**${g}**`, '', ...list.map(it => `- \`${it.id}\` ${it.name}${it.parts ? ' (' + it.parts.length + ' نقطة فرعية)' : ''}${it.note ? ' ← ' + it.note : ''}`), ''); continue; }
      const miss = list.filter(it => !res.get(it.id).mentions), thin = list.filter(it => res.get(it.id).mentions);
      out.push(`- **${g || 'عام'}**` + (miss.length ? ` ناقص: ${miss.map(line).join(' ')}` : '') + (thin.length ? `${miss.length ? '.' : ''} مذكور من غير شرح: ${thin.map(it => `${line(it)} (${res.get(it.id).mentions})`).join(' ')}` : ''));
    }
    out.push('');
  }
  const manual = syl.items.filter(i => i.skip && i.manual);
  if (manual.length) out.push('## مستبعد بقرار يدوي', '', ...manual.map(i => `- \`${i.name}\` (${KIND[i.kind]}): ${i.skip}`), '');
  const auto = {};
  for (const i of syl.items) if (i.skip && !i.manual) (auto[i.skip] = auto[i.skip] || []).push(i);
  out.push('## مستبعد أوتوماتيك (من حالة المرجع)', '');
  for (const [why, list] of Object.entries(auto)) out.push(`- **${why}** (${list.length}): ${list.map(i => '`' + i.name + '`' + (res.get(i.id).how ? '✓' : '')).join(' ')}`);
  out.push('', '✓ = مستبعد من المنهج بس مشروح في الكورس برضه.', '');
  if (all) {
    out.push('## كل البنود المتغطية وفين', '');
    for (const it of syl.items) { const r = res.get(it.id); if (r.how) out.push(`- \`${it.name}\` (${KIND[it.kind]}) ← ${r.how}: ${r.where}`); }
  }
  return { text: out.join('\n'), IN, OK, bad };
}

if (require.main === module) {
  const [tab, flag] = process.argv.slice(2);
  if (!fs.existsSync(DIR)) { console.log('مفيش فولدر syllabus/ لسه'); process.exit(0); }
  if (!tab) {
    for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort()) {
      const t = f.replace('.json', ''), { kinds, bad } = summary(t);
      let IN = 0, OK = 0; for (const k of Object.values(kinds)) { IN += k.in; OK += k.ok; }
      console.log(t.padEnd(10), String(OK).padStart(5), '/', String(IN).padEnd(5), Math.floor(OK / IN * 100) + '٪', bad.length ? `  (${bad.length} خطأ في at)` : '');
    }
  } else {
    const r = report(tab, flag === '--all');
    if (flag === '--write') { fs.writeFileSync(path.join(DIR, tab + '.md'), r.text + '\n'); console.log(`syllabus/${tab}.md: ${r.OK} من ${r.IN}`); }
    else console.log(r.text);
    if (r.bad.length) process.exitCode = 1;
  }
}
module.exports = { measure, summary, report };
