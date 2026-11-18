// بيبني syllabus/css.json (منهج كورس HTML و CSS) من المراجع الرسمية، مش من الذاكرة (ROADMAP القاعدة ١).
//   node tools/syllabus-gen/css.js <ref-dir>
// <ref-dir> فولدر (في الـ scratchpad) فيه الملفات دي زي ما نزلت من مصدرها:
//   indices.html                 https://html.spec.whatwg.org/multipage/indices.html
//   css-properties.json وإخواتها  https://raw.githubusercontent.com/mdn/data/main/css/{properties,at-rules,selectors,functions,types,units}.json
//   web-features.json            https://unpkg.com/web-features/data.json  (حالة Baseline)
//   links.html                   https://html.spec.whatwg.org/multipage/links.html  (جدول Link types)
//   mdn_html_reference_elements.json         api.github.com/repos/mdn/content/contents/files/en-us/web/html/reference/elements
//   mdn_html_reference_elements_input.json   .../elements/input
//   mdn_html_reference_attributes_rel.json   .../attributes/rel
//   mdn_length.md                raw.githubusercontent.com/mdn/content/main/files/en-us/web/css/reference/values/length/index.md
//   cur_*.md                     raw.githubusercontent.com/mdn/curriculum/main/curriculum/{3-core/2..5,3-core/7,4-extensions/1}-*.md
// القرارات اليدوية (at و skip و note) اللي في الملف الموجود بتفضل زي ما هي لما تعيد البناء.
const fs = require('fs'), path = require('path');
const ref = process.argv[2];
if (!ref) { console.error('اكتب فولدر المراجع: node tools/syllabus-gen/css.js <ref-dir>'); process.exit(1); }
const rd = f => fs.readFileSync(path.join(ref, f), 'utf8'), J = f => JSON.parse(rd(f));
const OUT = path.join(__dirname, '..', '..', 'syllabus', 'css.json');
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// ---- Baseline: compat key -> high | low | false
const BL = {};
for (const f of Object.values(J('web-features.json').features))
  for (const [k, v] of Object.entries((f.status && f.status.by_compat_key) || {})) BL[k] = v.baseline;
const bl = (...keys) => { for (const k of keys) if (k in BL) return BL[k]; };
// a function or unit lives under different parents (css.types.color.rgb, css.types.length.rem…): take the best exact last-segment match
const blLast = name => {
  let best;
  for (const k in BL) if (k.startsWith('css.types.') && k.endsWith('.' + name)) { const b = BL[k]; if (b === 'high' || (b === 'low' && best !== 'high') || best === undefined) best = b; }
  return best;
};

const items = [];
const add = it => items.push(it);
const W = 'https://html.spec.whatwg.org/multipage/', M = 'https://developer.mozilla.org/en-US/docs/Web/';

// ---- HTML elements: WHATWG index is the authority
const idx = rd('indices.html');
const table = cap => idx.match(new RegExp('<table[^>]*><caption>' + cap + '[\\s\\S]*?</table>'))[0];
const whatEls = new Set();
for (const row of table('List of elements').split('<tr>').slice(2)) {
  const [th, ...tds] = row.split('<td>');
  for (const m of th.matchAll(/<a href=([^>\s]+)>([^<]+)<\/a>/g)) {
    const name = m[2].trim(); whatEls.add(name);
    const svgmath = /^(SVG|MathML) /.test(name);
    const n = name.replace(/^(SVG|MathML) /, '');
    add({ id: 'el:' + n, kind: 'element', name: n, group: m[1].split('.html')[0].replace(/^https?:.*/, svgmath ? 'embedded' : ''), what: strip(tds[0]),
      ref: 'WHATWG HTML', url: /^http/.test(m[1]) ? m[1] : W + m[1], mdn: svgmath ? undefined : M + 'HTML/Reference/Elements/' + (/^h[1-6]$/.test(n) ? 'Heading_Elements' : n), baseline: bl('html.elements.' + n) });
  }
}
// MDN documents elements the standard dropped: listed so they are not silently missing
for (const e of J('mdn_html_reference_elements.json')) {
  if (e.type !== 'dir' || e.name === 'heading_elements') continue;
  if (items.some(i => i.id === 'el:' + e.name)) continue;
  add({ id: 'el:' + e.name, kind: 'element', name: e.name, group: 'obsolete', ref: 'MDN', url: M + 'HTML/Reference/Elements/' + e.name,
    skip: 'مش في مواصفة WHATWG (مهجور أو تجريبي). يتذكر في جملة مع البديل، من غير درس.' });
}

// ---- HTML attributes (WHATWG index, one item per name with every element it sits on)
const attrs = new Map();
for (const row of table('List of attributes \\(excluding event handler content attributes\\)').split('<tr>').slice(2)) {
  const [th, els, desc] = row.split('<td>');
  const name = strip(th);
  const on = /HTML elements/.test(els) ? ['كل العناصر (global)'] : [...els.matchAll(/<a href=[^>]+>([^<]+)<\/a>/g)].map(m => m[1]);
  const url = (els.match(/<a href=([^>\s]+)/) || [])[1];
  const a = attrs.get(name) || { on: [], what: [], url: url && (/^http/.test(url) ? url : W + url) };
  a.on.push(...on); a.what.push(strip(desc)); attrs.set(name, a);
}
for (const [name, a] of attrs) {
  const glob = a.on.includes('كل العناصر (global)');
  add({ id: 'attr:' + name, kind: 'attribute', name, group: glob ? 'global' : a.on[0], on: [...new Set(a.on)], what: [...new Set(a.what)].join(' / '),
    ref: 'WHATWG HTML', url: a.url, baseline: glob ? bl('html.global_attributes.' + name) : bl(...a.on.map(e => `html.elements.${e}.${name}`)) });
}
add({ id: 'attr:on*', kind: 'attribute', name: 'on* (event handler attributes)', group: 'global', ref: 'WHATWG HTML', url: W + 'indices.html#ix-event-handlers',
  skip: 'الأحداث بتتكتب بـ addEventListener وبتتشرح في كورس JavaScript. هنا جملة واحدة: متكتبش onclick في الـ HTML وليه.' });

// ---- input types and rel values (MDN reference folders)
for (const e of J('mdn_html_reference_elements_input.json')) if (e.type === 'dir')
  add({ id: 'input:' + e.name, kind: 'input-type', name: e.name, group: 'input', ref: 'MDN', url: M + 'HTML/Reference/Elements/input/' + e.name, baseline: bl('html.elements.input.type_' + e.name) });
// rel values: the «Link types» table in the standard; MDN-only values are listed as excluded
const lh = rd('links.html'), lt = lh.slice(lh.indexOf('id=linkTypes')), ltable = lt.slice(0, lt.indexOf('</table>'));
const rels = new Set([...ltable.matchAll(/<tr><td>\s*<code[^>]*><a href=[^>\s]+>([^<]+)<\/a>/g)].map(m => m[1]));
for (const r of [...rels].sort())
  add({ id: 'rel:' + r, kind: 'rel', name: r, group: 'rel', ref: 'WHATWG HTML', url: W + 'links.html#linkTypes', mdn: M + 'HTML/Reference/Attributes/rel', baseline: bl('html.elements.link.rel.' + r, 'html.elements.a.rel.' + r) });
for (const e of J('mdn_html_reference_attributes_rel.json')) { const r = e.name.replace(/_/g, ' '); if (e.type === 'dir' && !rels.has(r) && r !== 'alternate stylesheet')
  add({ id: 'rel:' + r, kind: 'rel', name: r, group: 'rel', ref: 'MDN', url: M + 'HTML/Reference/Attributes/rel/' + e.name, skip: 'مش في جدول Link types في مواصفة WHATWG (تجريبي أو microformat).' }); }

// ---- CSS (mdn/data + Baseline)
const scope = (it, status, b) => {
  if (status === 'nonstandard') it.skip = 'مش قياسي (prefix أو متصفح واحد).';
  else if (status === 'obsolete') it.skip = 'اتشال من المواصفة.';
  else if (b === false || status === 'experimental') it.skip = 'مش Baseline: مش شغال في كل المتصفحات الأساسية لسه.';
  return it;
};
const props = J('css-properties.json');
// longhand -> its smallest shorthand (mdn/data lists a shorthand's longhands in `computed`)
const parent = {};
for (const [name, p] of Object.entries(props)) if (Array.isArray(p.computed) && p.computed.length > 1)
  for (const l of p.computed) if (l !== name && props[l] && (!parent[l] || props[parent[l]].computed.length > p.computed.length)) parent[l] = name;
for (const [name, p] of Object.entries(props)) {
  const b = bl('css.properties.' + (name === '--*' ? 'custom-property' : name));
  add(scope({ id: 'prop:' + name, kind: 'property', name, group: (p.groups || [''])[0], under: parent[name], ref: 'MDN', url: p.mdn_url && p.mdn_url.replace('/docs/', '/en-US/docs/'), baseline: b }, p.status, b));
}
for (const [name, s] of Object.entries(J('css-selectors.json'))) {
  const key = name.replace(/^::?/, '').replace(/\(\)$/, '');
  const b = bl('css.selectors.' + key);
  add(scope({ id: 'sel:' + name, kind: 'selector', name, group: name.startsWith('::') ? 'pseudo-elements' : name.startsWith(':') ? 'pseudo-classes' : 'basic & combinators', syntax: /^:/.test(name) ? undefined : s.syntax,
    ref: 'MDN', url: s.mdn_url && s.mdn_url.replace('/docs/', '/en-US/docs/'), baseline: b }, s.status, b));
}
for (const [name, a] of Object.entries(J('css-at-rules.json'))) {
  const b = bl('css.at-rules.' + name.slice(1));
  add(scope({ id: 'at:' + name, kind: 'at-rule', name, group: (a.groups || [''])[0], descriptors: a.descriptors ? Object.keys(a.descriptors) : undefined,
    ref: 'MDN', url: a.mdn_url && a.mdn_url.replace('/docs/', '/en-US/docs/'), baseline: b }, a.status, b));
}
for (const [name, f] of Object.entries(J('css-functions.json'))) {
  const b = blLast(name.replace(/\(\)$/, ''));
  add(scope({ id: 'fn:' + name, kind: 'function', name, group: (f.groups || [''])[0], ref: 'MDN', url: f.mdn_url && f.mdn_url.replace('/docs/', '/en-US/docs/'), baseline: b }, f.status, b));
}
for (const [name, u] of Object.entries(J('css-units.json'))) {
  const b = blLast(name);
  add(scope({ id: 'unit:' + name, kind: 'unit', name, group: (u.groups || [''])[0], ref: 'MDN', url: M + 'CSS/Guides/Values_and_units/Numeric_data_types', baseline: b }, u.status, b));
}
// mdn/data's unit list is behind (no lh, dvh, cqw…): add every unit the MDN <length> reference page names
const lenMd = rd('mdn_length.md');
for (const name of new Set([...lenMd.matchAll(/^- `([A-Za-z]+)`/gm), ...lenMd.matchAll(/`((?:s|l|d)v(?:h|w|min|max|b|i))`/g)].map(m => m[1]))) {
  if (items.some(i => i.id === 'unit:' + name)) continue;
  const b = blLast(name);
  add({ id: 'unit:' + name, kind: 'unit', name, group: 'CSS Values and Units', ref: 'MDN', url: M + 'CSS/Reference/Values/length', baseline: b });
}
for (const [name, t] of Object.entries(J('css-types.json'))) {
  const b = bl('css.types.' + name);
  add(scope({ id: 'type:<' + name + '>', kind: 'type', name: '<' + name + '>', group: (t.groups || [''])[0], ref: 'MDN', url: t.mdn_url && t.mdn_url.replace('/docs/', '/en-US/docs/'), baseline: b }, t.status, b));
}

// ---- MDN Curriculum learning outcomes: the skills, not the vocabulary (what a reference index can't list)
for (const f of fs.readdirSync(ref).filter(f => /^cur_.*\.md$/.test(f)).sort()) {
  const md = rd(f), mod = (md.match(/^# (.+)$/m) || [])[1];
  const slug = f.replace(/^cur_\d+-|\.md$/g, '');
  let sec = '0 الموديول كله', on = false, n = 0, cur = null;
  for (const line of md.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) { sec = h[1]; on = false; n = 0; cur = null; continue; }
    if (/^Learning outcomes:/.test(line)) { on = true; continue; }
    if (/^(Resources|General resources|Notes):/.test(line) || /^\s*>/.test(line)) { if (!/^\s*>/.test(line)) on = false; continue; }
    if (!on) continue;
    const top = line.match(/^- (.+)$/), sub = line.match(/^\s{2,}- (.+)$/);
    const clean = s => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`/g, '').trim();
    if (top) {
      cur = { id: `out:${slug}/${sec.split(' ')[0]}.${++n}`, kind: 'outcome', name: clean(top[1]), group: mod + ' › ' + sec, ref: 'MDN Curriculum', url: 'https://developer.mozilla.org/en-US/curriculum/' + (f.includes('transform') ? 'extensions' : 'core') + '/' + slug + '/' };
      add(cur);
    } else if (sub && cur) (cur.parts = cur.parts || []).push(clean(sub[1]));
  }
}

// ---- keep manual decisions from the existing file
if (fs.existsSync(OUT)) {
  const old = new Map(JSON.parse(fs.readFileSync(OUT, 'utf8')).items.map(i => [i.id, i]));
  for (const it of items) { const o = old.get(it.id); if (!o) continue; for (const k of ['at', 'note']) if (o[k]) it[k] = o[k]; if (o.manual) { it.manual = true; if (o.skip) it.skip = o.skip; else delete it.skip; } }
}
for (const it of items) for (const k of Object.keys(it)) if (it[k] === undefined) delete it[k];

const doc = {
  tab: 'css', course: 'HTML و CSS', built: new Date().toISOString().slice(0, 10),
  refs: [
    { name: 'WHATWG HTML Living Standard (Index)', url: W + 'indices.html', used: 'كل العناصر والـ attributes' },
    { name: 'MDN HTML reference', url: M + 'HTML/Reference', used: 'أنواع input وقيم rel والعناصر المهجورة' },
    { name: 'mdn/data (CSS)', url: 'https://github.com/mdn/data/tree/main/css', used: 'كل الخصائص والـ selectors والـ at-rules والدوال والوحدات والأنواع' },
    { name: 'web-features (Baseline)', url: 'https://github.com/web-platform-dx/web-features', used: 'مين Baseline (في المنهج) ومين لأ (مستبعد بسبب)' },
    { name: 'MDN Curriculum', url: 'https://developer.mozilla.org/en-US/curriculum/', used: 'المهارات (learning outcomes): Semantic HTML و CSS fundamentals و Text styling و Layout و Accessibility و Transform & animate' },
  ],
  fields: 'id, kind, name, group, ref, url | under: الخاصية المختصرة اللي بتتشرح معاها | skip: مستبعد وليه | at: «cmd الدرس» أو «cmd › عنوان القسم» (يدوي، للبنود اللي السكربت ميعرفش يلاقيها) | manual: القرار اتاخد بالإيد ومش بيتغيّر مع إعادة البناء',
  items,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, '{\n' + Object.entries(doc).filter(([k]) => k !== 'items').map(([k, v]) => ` ${JSON.stringify(k)}: ${JSON.stringify(v, null, k === 'refs' ? 1 : 0)}`).join(',\n') + ',\n "items": [\n' + items.map(i => '  ' + JSON.stringify(i)).join(',\n') + '\n ]\n}\n');
const by = {};
for (const i of items) { const k = i.kind + (i.skip ? ' (مستبعد)' : ''); by[k] = (by[k] || 0) + 1; }
console.log(items.length, 'بند ←', path.relative(process.cwd(), OUT)); console.log(by);
