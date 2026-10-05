// مشترك بين أدوات tools/: بيعرف ملفات التابات من index.html، ويلاقي الدروس جوه الملفات، ويحسب بصمة لكل درس
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');

// tab files in the order index.html loads them, grouped by tab: { bash: ['js/tabs/bash/01.js', ...], ... }
function tabFiles(){
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const out = {};
  for (const [, f] of html.matchAll(/<script src="(js\/tabs\/[^"]+)"><\/script>/g)){
    const key = f.split('/')[2].replace(/\.js$/, '');
    (out[key] = out[key] || []).push(f);
  }
  return out;
}

// index just past the bracket that closes the one at `open`, skipping strings, templates and comments.
// Lesson content never holds ${ (it writes $__{) or a bare backtick (it writes $__bt), so a template ends at the next unescaped backtick.
function matchEnd(src, open){
  let depth = 0;
  for (let i = open; i < src.length; i++){
    const c = src[i];
    if (c === '"' || c === "'" || c === '`'){ for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++; continue; }
    if (c === '/' && src[i+1] === '/'){ i = src.indexOf('\n', i); if (i < 0) return src.length; continue; }
    if (c === '/' && src[i+1] === '*'){ i = src.indexOf('*/', i + 2) + 1; continue; }
    if (c === '{' || c === '[' || c === '(') depth++;
    else if (c === '}' || c === ']' || c === ')'){ depth--; if (depth === 0) return i + 1; }
  }
  throw new Error('قوس مش مقفول');
}

// the {...} elements directly inside the array that opens at `open`: [{start, end}] (start = the {)
function arrayElements(src, open){
  const end = matchEnd(src, open), els = [];
  for (let i = open + 1; i < end - 1; i++){
    const c = src[i];
    if (c === '{'){ const e = matchEnd(src, i); els.push({start: i, end: e}); i = e - 1; }
    else if (c === '/' && src[i+1] === '/') i = src.indexOf('\n', i);
    else if (c === '/' && src[i+1] === '*') i = src.indexOf('*/', i + 2) + 1;
    else if (c === '"' || c === "'" || c === '`' || c === '/') throw new Error('عنصر مش object جوه الـ array عند ' + i);
  }
  return {end, els};
}

// every lesson in a tab with where it is: [{cmd, cat, file, line, start, end}]
function lessonsIn(files){
  const out = [];
  for (const f of files){
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const m = src.match(/\bcategories:\s*\[|\bMORE\("[^"]+",\s*\[/);
    if (!m) continue;
    const open = m.index + m[0].length - 1;
    for (const cat of arrayElements(src, open).els){
      const body = src.slice(cat.start, cat.end);
      const t = (body.match(/^\s*\{\s*t:\s*"((?:[^"\\]|\\.)*)"/) || [])[1];
      const im = body.match(/\bitems:\s*\[/);
      if (!im) continue;
      for (const it of arrayElements(body, im.index + im[0].length - 1).els){
        const s = cat.start + it.start, txt = src.slice(s, cat.start + it.end);
        // cmd is "..." or R`...` (raw, kept as written like the rest of the content)
        const q = txt.match(/\bcmd:\s*"((?:[^"\\]|\\.)*)"/), r = txt.match(/\bcmd:\s*R`([^`]*)`/);
        const cmd = q && (!r || q.index < r.index) ? JSON.parse('"' + q[1] + '"') : r && r[1];
        out.push({cmd, cat: t, file: f, line: src.slice(0, s).split('\n').length, start: s, end: cat.start + it.end});
      }
    }
  }
  return out;
}

// the raw lesson objects as written (before core.js touches them): { bash: [{cat, item}, ...] }
function loadRaw(fileMap, read = f => fs.readFileSync(path.join(ROOT, f), 'utf8')){
  const out = {};
  const add = (key, cats) => cats.forEach(c => c.items.forEach(item => (out[key] = out[key] || []).push({cat: c.t, item})));
  const ctx = vm.createContext({ R: String.raw, TAB: (k, d) => add(k, d.categories), MORE: add });
  for (const files of Object.values(fileMap)) for (const f of files) vm.runInContext(read(f), ctx, {filename: f});
  return out;
}

// fingerprint of everything a reader sees in a lesson, so a later edit shows the review is out of date
function lessonHash(item){
  const norm = v => Array.isArray(v) ? v.map(norm) : v && typeof v === 'object' ? Object.keys(v).sort().reduce((o, k) => (o[k] = norm(v[k]), o), {}) : v;
  return crypto.createHash('sha1').update(JSON.stringify(norm(item))).digest('hex').slice(0, 12);
}

module.exports = { ROOT, tabFiles, matchEnd, arrayElements, lessonsIn, loadRaw, lessonHash };
