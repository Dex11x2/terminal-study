// بيجمّع الصفحة في ملف HTML واحد (للموبايل من غير نت، أو تبعته لحد):  node tools/build.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'dist', 'terminal.html');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, f) => '<style>\n' + read(f) + '</style>');
const srcs = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
if (!srcs.length) throw new Error('مفيش <script src> في index.html');
const js = srcs.map(f => '/* ===== ' + f + ' ===== */\n' + read(f)).join('\n');
if (/<\/script/i.test(js)) throw new Error('فيه </script> جوه الكود، هيكسر الملف الواحد');
html = html.replace(/(?:<script src="[^"]+"><\/script>\n?)+/, () => '<script>\n' + js + '</script>\n');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log('اتعمل ' + path.relative(ROOT, OUT) + ' (' + Math.round(fs.statSync(OUT).size / 1024) + ' KB)');
