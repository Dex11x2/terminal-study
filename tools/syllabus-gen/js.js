// بيبني syllabus/js.json (منهج كورس JavaScript) من المراجع الرسمية، مش من الذاكرة (ROADMAP القاعدة ١).
//   node tools/syllabus-gen/js.js <ref-dir>
// <ref-dir> فولدر (في الـ scratchpad) فيه الملفات دي زي ما نزلت من مصدرها:
//   bcd.json            https://unpkg.com/@mdn/browser-compat-data/data.json  (كل حاجة في اللغة: لينك MDN، ولينك ECMAScript، والحالة)
//   web-features.json   https://unpkg.com/web-features/data.json  (حالة Baseline)
//   mdn_<Page>.json     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/<Page>/index.json
//                       لـ Global_Objects و Operators و Statements (الأسماء الرسمية والتقسيم، والـ sidebar فيه فهرس المرجع والـ Guide)
//   cur_*.md            raw.githubusercontent.com/mdn/curriculum/main/curriculum/{3-core/6-javascript-fundamentals,4-extensions/2-custom-js-objects,4-extensions/3-web-apis}.md
// القرارات اليدوية (at و skip و note) اللي في الملف الموجود بتفضل زي ما هي لما تعيد البناء.
const fs = require('fs'), path = require('path');
const ref = process.argv[2];
if (!ref) { console.error('اكتب فولدر المراجع: node tools/syllabus-gen/js.js <ref-dir>'); process.exit(1); }
const rd = f => fs.readFileSync(path.join(ref, f), 'utf8'), J = f => JSON.parse(rd(f));
const OUT = path.join(__dirname, '..', '..', 'syllabus', 'js.json');
const M = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/';
const unent = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&');

// ---- Baseline: compat key -> high | low | false
const BL = {};
for (const f of Object.values(J('web-features.json').features))
  for (const [k, v] of Object.entries((f.status && f.status.by_compat_key) || {})) BL[k] = v.baseline;

// ---- every BCD javascript feature that has an MDN page, keyed by that page's path (Reference/…)
const bcd = J('bcd.json').javascript, BY = new Map();
(function walk(o, p) {
  for (const [k, v] of Object.entries(o)) {
    if (k === '__compat') continue;
    const id = p ? p + '.' + k : k, c = v.__compat;
    if (c && c.mdn_url && !c.mdn_url.includes('#')) { // an anchor is a section of another page, not a feature of its own
      const page = c.mdn_url.replace(/^https:\/\/developer\.mozilla\.org\/(en-US\/)?docs\/Web\/JavaScript\//, '');
      if (!BY.has(page)) BY.set(page, { key: 'javascript.' + id, c });
    }
    walk(v, id);
  }
})(bcd, '');
const spec = c => [].concat(c.spec_url || [])[0];
// status and Baseline -> a skip reason (or nothing: in the syllabus)
const why = (c, key) => {
  const s = c.status || {}, b = BL[key];
  if (s.deprecated) return 'مهجور (deprecated) في MDN: يتذكر في جملة مع البديل، من غير درس.';
  if (s.standard_track === false) return 'مش قياسي (متصفح واحد أو امتداد قديم).';
  if (s.experimental || b === false) return 'مش Baseline: مش شغال في كل المتصفحات الأساسية لسه.';
  // not in web-features yet: read the support table itself
  const sup = c.support || {}, no = v => !v || [].concat(v).every(x => !x.version_added || x.flags || x.partial_implementation);
  if (b === undefined && ['chrome', 'firefox', 'safari'].some(k => no(sup[k]))) return 'مش Baseline: مش شغال في كل المتصفحات الأساسية لسه.';
};

const items = [];
const add = it => { for (const k of Object.keys(it)) if (it[k] === undefined) delete it[k]; items.push(it); };
const fromBcd = (page, it) => {
  const e = BY.get(page);
  if (!e) return add({ ...it, ref: 'MDN', url: M + page });
  add({ ...it, ref: 'MDN + ECMAScript', url: M + page, spec: spec(e.c), baseline: BL[e.key], skip: why(e.c, e.key) });
};

// ---- the MDN sidebar: the official index of the reference and the guide, with page titles
const side = J('mdn_Operators.json').doc.sidebarHTML;
const pages = [...side.matchAll(/<a href="\/en-US\/docs\/Web\/JavaScript\/([^"#]+)"[^>]*>(?:<code>)?([^<]+)/g)].map(m => ({ page: m[1], title: unent(m[2]).trim() }));
const under = dir => pages.filter(p => p.page.startsWith('Reference/' + dir + '/'));

// groups from the «by category» sections of each index page
const groupsOf = f => {
  const g = {};
  for (const s of J(f).doc.body) if (s.type === 'prose' && s.value.title && s.value.content)
    for (const m of s.value.content.matchAll(/href="\/en-US\/docs\/Web\/JavaScript\/(Reference\/[^"#]+)"/g)) g[m[1]] = g[m[1]] || s.value.title;
  return g;
};

// ---- built-in objects and their members
const GO = groupsOf('mdn_Global_Objects.json');
const owners = new Set();
for (const [page, e] of BY) {
  if (!page.startsWith('Reference/Global_Objects/')) continue;
  const segs = page.split('/').slice(2);
  // a nested object (Intl/DateTimeFormat) is a built-in of its own; anything else under an object is a member
  const isObj = segs.length === 1 || (segs[0] === 'Intl' && segs.length === 2 && /^[A-Z]/.test(segs[1])) || (segs[0] === 'Temporal' && segs.length === 2 && /^[A-Z]/.test(segs[1]));
  if (isObj) {
    const name = segs.join('.'), fn = /^[a-z]/.test(name) && !['globalThis', 'undefined'].includes(name);
    owners.add(name);
    fromBcd(page, { id: 'obj:' + name, kind: 'builtin', name: name + (fn ? '()' : ''), group: GO['Reference/Global_Objects/' + segs[0]] || 'Built-in objects' });
  }
}
for (const [page, e] of BY) {
  if (!page.startsWith('Reference/Global_Objects/')) continue;
  const segs = page.split('/').slice(2), short = segs[segs.length - 1];
  if (owners.has(segs.join('.'))) continue;
  // the owner is the longest object path above it (Intl/Segmenter/segment/Segments/containing belongs to Intl.Segmenter)
  let owner = segs.slice(0, -1).join('.');
  while (owner && !owners.has(owner)) owner = owner.split('.').slice(0, -1).join('.');
  if (!owner) continue;
  if (segs[0] === 'Proxy' && segs[1] === 'Proxy' && segs.length === 3) { // the handler's traps
    fromBcd(page, { id: 'm:Proxy handler.' + short, kind: 'member', name: 'handler.' + short + '()', group: 'Proxy', owner: 'Proxy', short });
    continue;
  }
  if (segs.length - owner.split('.').length > 1) { // deeper than a member: a member of something a member returns
    const name = owner + '.' + segs.slice(owner.split('.').length).join('.').replace(/\.(Symbol\.\w+)$/, '[$1]');
    fromBcd(page, { id: 'm:' + name, kind: 'member', name, group: owner, owner, short });
    continue;
  }
  if (short === segs[segs.length - 2]) continue; // the constructor page rides with its object
  // the spec anchor says where it lives: …prototype… or …-instances-… is on every instance, the rest is on the object itself
  const inst = /\.prototype\b|prototype-|instances/i.test(spec(e.c) || '') // not «reflect.getprototypeof» || ['AggregateError.errors', 'Error.cause', 'RegExp.lastIndex'].includes(owner + '.' + short);
  const key = /^Symbol\./.test(short) ? `[${short}]` : short;
  const name = owner + (inst ? '.prototype' : '') + (key.startsWith('[') ? key : '.' + key);
  fromBcd(page, { id: 'm:' + name, kind: 'member', name, group: owner, owner, short, static: inst ? undefined : true });
}

// ---- operators and expressions, statements, functions, classes, regex syntax: one item per MDN page
const OP = groupsOf('mdn_Operators.json'), ST = groupsOf('mdn_Statements.json');
const sym = t => (t.match(/\(([^()]+)\)\s*$/) || [])[1];
for (const p of under('Operators')) {
  if (/^Reference\/Operators\/(import\/|import\.meta\/)/.test(p.page)) continue; // import.defer/source, import.meta.resolve: sub-pages, below
  const slug = p.page.split('/')[2];
  fromBcd(p.page, { id: 'op:' + slug, kind: 'operator', name: p.title.replace(/ operator$/, ''), group: OP[p.page] || (/function|class|async/.test(slug) ? 'Primary expressions' : 'Other expressions'), symbol: slug === 'Conditional_operator' ? '? :' : (sym(p.title) || '').trim() || undefined });
}
for (const p of pages.filter(p => /^Reference\/Operators\/(import\/|import\.meta\/)/.test(p.page)))
  fromBcd(p.page, { id: 'op:' + p.page.split('/').slice(2).join('/'), kind: 'operator', name: p.title, group: 'Left-hand-side expressions' });
// import() and import.meta have their own pages but the sidebar shows them as a folder heading
for (const [slug, name] of [['import', 'import()'], ['import.meta', 'import.meta']])
  if (!items.some(i => i.id === 'op:' + slug)) fromBcd('Reference/Operators/' + slug, { id: 'op:' + slug, kind: 'operator', name, group: 'Left-hand-side expressions' });
for (const p of [...under('Statements'), { page: 'Reference/Statements/import', title: 'import' }]) {
  if (items.some(i => i.url === M + p.page)) continue;
  fromBcd(p.page, { id: 'st:' + p.page.split('/').slice(2).join('/'), kind: 'statement', name: p.title, group: ST[p.page] || ST[p.page.replace(/\/[^/]+$/, '')] || 'Others' });
}
for (const p of [...under('Functions').filter(p => !/arguments\//.test(p.page)), { page: 'Reference/Functions/arguments', title: 'arguments' }])
  fromBcd(p.page, { id: 'syn:' + p.page.split('/').slice(2).join('/'), kind: 'syntax', name: p.title, group: 'Functions' });
for (const p of pages.filter(p => /^Reference\/Functions\/arguments\//.test(p.page))) {
  const t = p.title.replace(/\(\)$/, '');
  fromBcd(p.page, { id: 'syn:arguments/' + p.page.split('/')[3], kind: 'syntax', name: 'arguments' + (t.startsWith('[') ? t : '.' + t), group: 'Functions' });
}
for (const p of under('Classes')) fromBcd(p.page, { id: 'syn:' + p.page.split('/').slice(2).join('/'), kind: 'syntax', name: p.title, group: 'Classes' });
for (const p of under('Regular_expressions'))
  fromBcd(p.page, { id: 're:' + p.page.split('/')[2], kind: 'regex', name: p.title.split(':')[0], symbol: p.title.split(': ')[1], group: 'Regular expression syntax' });

// ---- lexical grammar (BCD keys: no page of their own, a section of Lexical_grammar or its own page)
for (const [k, v] of Object.entries(bcd.grammar)) {
  if (k === '__compat') continue;
  const c = v.__compat, url = c.mdn_url && c.mdn_url.replace(/^https:\/\/developer\.mozilla\.org\/docs\//, 'https://developer.mozilla.org/en-US/docs/');
  add({ id: 'gr:' + k, kind: 'syntax', name: k.replace(/_/g, ' '), group: 'Lexical grammar', ref: 'MDN + ECMAScript', url: url || M + 'Reference/Lexical_grammar', spec: spec(c), baseline: BL['javascript.grammar.' + k], skip: why(c, 'javascript.grammar.' + k) });
}

// ---- concepts: the guide and the reference's explanation pages (what an index of names can't list)
const CONCEPT_SKIP = {
  'Guide/Introduction': 'مقدمة: الكورس بيبدأ بمقدمته.',
  'Guide/Language_overview': 'ملخص للغة كلها لحد عارف لغة تانية: محتواه متوزع على الكورس.',
  'Guide/Representing_dates_times/Cookbook': 'وصفات Temporal، و Temporal مش Baseline لسه.',
  'Reference/Deprecated_and_obsolete_features': 'قايمة المهجور: كل بند مهجور مستبعد لوحده بسببه.',
  'Reference/Lexical_grammar': 'بنوده متقسمة تحت «Lexical grammar» بند بند.',
  'Reference/Template_literals': 'نفس بند template literals في Lexical grammar.',
  // the reference's index pages: their items are listed one by one
  ...Object.fromEntries(['Global_Objects', 'Operators', 'Statements', 'Functions', 'Classes', 'Regular_expressions', 'Errors'].map(p => ['Reference/' + p, 'فهرس: بنوده متقسمة في المنهج بند بند.'])),
};
for (const p of pages.filter(p => p.page.startsWith('Guide/') || /^Reference\/[A-Za-z_]+$/.test(p.page)))
  add({ id: 'c:' + p.page, kind: 'concept', name: p.title, group: p.page.startsWith('Guide/') ? 'JavaScript Guide' : 'Reference', ref: 'MDN', url: M + p.page, skip: CONCEPT_SKIP[p.page] });
// the guide pages that are folder headings in the sidebar
for (const [page, name] of [['Guide/Representing_dates_times', 'Representing dates & times'], ['Guide/Modules', 'JavaScript modules']])
  if (!items.some(i => i.id === 'c:' + page)) add({ id: 'c:' + page, kind: 'concept', name, group: 'JavaScript Guide', ref: 'MDN', url: M + page });

// ---- error messages: listed so they are not silently missing
for (const p of under('Errors'))
  add({ id: 'err:' + p.page.split('/')[2], kind: 'error', name: p.title, group: p.title.split(':')[0], ref: 'MDN', url: M + p.page,
    skip: 'رسالة خطأ واحدة: الأنواع بتتشرح في درس قراية الأخطاء، والرسايل المهمة بتيجي في الدرس اللي بيحصل فيه الغلط.' });

// ---- MDN Curriculum learning outcomes: the skills (DOM, events, fetch… live here)
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
      cur = { id: `out:${slug}/${sec.split(' ')[0]}.${++n}`, kind: 'outcome', name: clean(top[1]), group: mod + ' › ' + sec, ref: 'MDN Curriculum', url: 'https://developer.mozilla.org/en-US/curriculum/' + (f.includes('javascript-fundamentals') ? 'core' : 'extensions') + '/' + slug + '/' };
      add(cur);
    } else if (sub && cur) (cur.parts = cur.parts || []).push(clean(sub[1]));
  }
}

// ---- how a lesson names an item when the MDN title isn't the word people write (tools/syllabus.js: `alias` = case-insensitive regex on the lesson name, a heading or a table's first cell)
const ALIAS = {
  'op:Conditional_operator': 'ternary|\\? :', 'op:Comma_operator': 'comma operator', 'op:Grouping': 'grouping', 'op:Destructuring': 'destructuring',
  'op:Object_initializer': 'object (initializer|literal)', 'op:Property_accessors': 'property accessor|bracket notation|dot notation', 'op:Operator_precedence': 'precedence',
  'op:function': 'function expression', 'op:class': 'class expression', 'op:async_function': 'async function expression', 'op:function*': 'function\\* expression', 'op:async_function*': 'async function\\* expression',
  'op:Spread_syntax': 'spread', 'st:if...else': '(?<![\\w.])if(?![\\w])', 'st:try...catch': '(?<![\\w.])(try|catch|finally)(?![\\w])', 'st:do...while': 'do\\s*(\\.\\.\\.)?\\s*while',
  'st:for': '(?<![\\w.])for(?![\\w.]|\\s*(await|in|of)\\b)', 'st:for...in': 'for\\s*(\\.\\.\\.)?\\s*in(?![\\w])', 'st:for...of': 'for\\s*(\\.\\.\\.)?\\s*of(?![\\w])', 'st:for-await...of': 'for await',
  'st:async_function': '(?<![\\w.])async(?![\\w*]| function\\*)', 'st:async_function*': 'async function\\*|async generator', 'st:function*': '(?<!async )function\\*|generator', 'st:function': '(?<![\\w.])function(?![\\w*])',
  'st:block': 'block statement|\\bblock\\b', 'st:label': '\\blabel', 'st:import/with': 'import attributes|with \\{ ?type', 'st:Empty': 'empty statement', 'st:Expression_statement': 'expression statement',
  'syn:Arrow_functions': 'arrow', 'syn:Default_parameters': 'default param|(?<![\\w.])default(?![\\w])', 'syn:rest_parameters': 'rest param|(?<![\\w.])rest(?![\\w])', 'syn:get': 'getter|(?<![\\w.])get \\w+\\(', 'syn:set': 'setter|(?<![\\w.])set \\w+\\(',
  'syn:Method_definitions': 'method definition|shorthand method', 'syn:Private_elements': 'private|#\\w', 'syn:Public_class_fields': 'class field|public field', 'syn:Static_initialization_blocks': 'static (initialization )?block|static \\{',
  'syn:constructor': '\\bconstructor\\b', 'syn:extends': '\\bextends\\b', 'syn:static': '\\bstatic\\b', 'syn:arguments': '(?<![\\w.])arguments(?![\\w.[])',
  'gr:template_literals': 'template literal', 'gr:trailing_commas': 'trailing comma', 'gr:numeric_separators': 'numeric separator|\\d_\\d\\d\\d', 'gr:hexadecimal_numeric_literals': '(?<![\\w])0x[0-9a-f]+',
  'gr:binary_numeric_literals': '(?<![\\w])0b[01]+', 'gr:octal_numeric_literals': '(?<![\\w])0o[0-7]+', 'gr:hashbang_comments': 'hashbang|^#!', 'gr:shorthand_object_literals': 'shorthand propert',
  'gr:regular_expression_literals': 'regex literal|regular expression literal', 'gr:unicode_point_escapes': '\\\\u\\{', 'gr:unicode_escape_sequences': '\\\\u[0-9a-f]{4}', 'gr:hexadecimal_escape_sequences': '\\\\x[0-9a-f]{2}',
  're:Lookahead_assertion': 'lookahead|\\(\\?[=!]', 're:Lookbehind_assertion': 'lookbehind|\\(\\?<[=!]', 're:Named_capturing_group': 'named (capturing )?group|\\(\\?<\\w', 're:Non-capturing_group': 'non-capturing|\\(\\?:',
  're:Capturing_group': 'capturing group|(?<![\\w-])groups?(?![\\w])', 're:Backreference': 'backreference|\\\\[1-9]', 're:Named_backreference': 'named backreference|\\\\k<', 're:Quantifier': 'quantifier|\\{\\d+,?\\d*\\}',
  're:Character_class_escape': 'character class escape|\\\\[dDwWsS]', 're:Character_class': 'character class|\\[\\^?[a-z0-9]-[a-z0-9]\\]', 're:Unicode_character_class_escape': '\\\\p\\{', 're:Word_boundary_assertion': 'word boundary|\\\\b',
  're:Input_boundary_assertion': 'anchor|\\^.*\\$', 're:Disjunction': 'alternation|disjunction', 're:Wildcard': 'wildcard', 're:Modifier': 'modifier|\\(\\?[ims]+:',
  'c:Guide/Grammar_and_types': 'المتغيرات والأنواع|variables', 'c:Guide/Control_flow_and_error_handling': '(?<![\\w.])if(?![\\w])', 'c:Guide/Loops_and_iteration': '(?<![\\w.])(for|while)(?![\\w])',
  'c:Guide/Functions': '(?<![\\w.])function(?![\\w*])|الدوال', 'c:Guide/Expressions_and_operators': 'operator|&&', 'c:Guide/Numbers_and_strings': 'number|string', 'c:Guide/Representing_dates_times': '(?<![\\w])Date(?![\\w])|التواريخ',
  'c:Guide/Regular_expressions': 'regex', 'c:Guide/Indexed_collections': 'المصفوفات|(?<![\\w])array', 'c:Guide/Keyed_collections': '(?<![\\w])Map(?![\\w])', 'c:Guide/Working_with_objects': 'object',
  'c:Guide/Using_classes': '(?<![\\w])class', 'c:Guide/Using_promises': 'promise', 'c:Guide/Typed_arrays': 'typed ?array|ArrayBuffer', 'c:Guide/Iterators_and_generators': 'iterator|generator',
  'c:Guide/Resource_management': '(?<![\\w])using(?![\\w])|Symbol\\.dispose', 'c:Guide/Internationalization': 'Intl', 'c:Guide/Modules': 'module', 'c:Guide/Modules/Modules_on_the_web': 'type="module"|import map',
  'c:Guide/Modules/Module_graph': 'module graph|circular', 'c:Guide/Modules/Modules_across_platforms': 'CommonJS|require\\(', 'c:Guide/Data_structures': 'primitive', 'c:Guide/Equality_comparisons_and_sameness': '===|Object\\.is',
  'c:Guide/Enumerability_and_ownership_of_properties': 'enumerab', 'c:Guide/Closures': 'closure', 'c:Guide/Inheritance_and_the_prototype_chain': 'prototype', 'c:Guide/Meta_programming': 'Proxy|Reflect',
  'c:Guide/Memory_management': 'memory|garbage|الذاكرة', 'c:Guide/Agent_communication_and_coordination': 'Atomics|SharedArrayBuffer', 'c:Reference/JavaScript_technologies_overview': 'ECMAScript|JS engine',
  'c:Reference/Execution_model': 'event loop', 'c:Reference/Magic_comments': 'sourceMappingURL|source ?map', 'c:Reference/Iteration_protocols': 'iterator|iterable', 'c:Reference/Strict_mode': 'strict mode|use strict', 'c:Reference/Trailing_commas': 'trailing comma',
};
for (const it of items) if (ALIAS[it.id]) it.alias = ALIAS[it.id];

// ---- one id once
const seen = new Set();
for (let i = items.length - 1; i >= 0; i--) { if (seen.has(items[i].id)) items.splice(i, 1); else seen.add(items[i].id); }

// ---- keep manual decisions from the existing file
if (fs.existsSync(OUT)) {
  const old = new Map(JSON.parse(fs.readFileSync(OUT, 'utf8')).items.map(i => [i.id, i]));
  for (const it of items) { const o = old.get(it.id); if (!o) continue; for (const k of ['at', 'note']) if (o[k]) it[k] = o[k]; if (o.manual) { it.manual = true; if (o.skip) it.skip = o.skip; else delete it.skip; } }
}

const doc = {
  tab: 'js', course: 'JavaScript', built: new Date().toISOString().slice(0, 10),
  refs: [
    { name: 'MDN JavaScript reference', url: M + 'Reference', used: 'فهرس المرجع والـ Guide: الأسماء الرسمية لكل object و operator و statement، وتقسيمهم' },
    { name: 'ECMAScript (tc39.es/ecma262) و ECMA-402 (Intl)', url: 'https://tc39.es/ecma262/', used: 'لينك المواصفة لكل بند (spec)، ومنه static ولا prototype' },
    { name: '@mdn/browser-compat-data', url: 'https://github.com/mdn/browser-compat-data/tree/main/javascript', used: 'كل بند ليه صفحة في MDN، وحالته (deprecated و experimental و standard)' },
    { name: 'web-features (Baseline)', url: 'https://github.com/web-platform-dx/web-features', used: 'مين Baseline (في المنهج) ومين لأ (مستبعد بسبب)' },
    { name: 'MDN Curriculum', url: 'https://developer.mozilla.org/en-US/curriculum/', used: 'المهارات (learning outcomes): JavaScript fundamentals و Custom JS objects و Web APIs' },
  ],
  fields: 'id, kind, name, group, ref, url, spec (ECMAScript) | owner و short و static: لعضو في object | symbol: الرمز (operator أو regex) | skip: مستبعد وليه | at: «cmd الدرس» أو «cmd › عنوان القسم» (يدوي) | manual: القرار اتاخد بالإيد ومش بيتغيّر مع إعادة البناء',
  items,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, '{\n' + Object.entries(doc).filter(([k]) => k !== 'items').map(([k, v]) => ` ${JSON.stringify(k)}: ${JSON.stringify(v, null, k === 'refs' ? 1 : 0)}`).join(',\n') + ',\n "items": [\n' + items.map(i => '  ' + JSON.stringify(i)).join(',\n') + '\n ]\n}\n');
const by = {};
for (const i of items) { const k = i.kind + (i.skip ? ' (مستبعد)' : ''); by[k] = (by[k] || 0) + 1; }
console.log(items.length, 'بند ←', path.relative(process.cwd(), OUT)); console.log(by);
