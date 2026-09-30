// بيجمّع الصفحة في ملف HTML واحد (للموبايل من غير نت، أو تبعته لحد):  node tools/build.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'dist', 'terminal.html');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// the single file has no manifest, icons or service worker next to it, so drop those links
// it has no js/sql-worker.js or vendor/pglite either: SQL exercises there say they need the hosted site or the installed app,
// while JS exercises run from a blob Worker and work in the single file too
html = html.replace(/<link rel="(manifest|icon|apple-touch-icon)"[^>]*>\n?/g, '');

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, f) => '<style>\n' + read(f) + '</style>');
const srcs = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
if (!srcs.length) throw new Error('مفيش <script src> في index.html');
// lessons about HTML can show </script>, which would end the inline <script>, so the < goes in as $__lt and core.js restores it
const js = srcs.map(f => '/* ===== ' + f + ' ===== */\n' + (f.startsWith('js/tabs/') ? read(f).replace(/<(?=\/script)/gi, '$__lt') : read(f))).join('\n');
if (/<\/script/i.test(js)) throw new Error('فيه </script> جوه الكود، هيكسر الملف الواحد');
html = html.replace(/(?:<script src="[^"]+"><\/script>\n?)+/, () => '<script>\n' + js + '</script>\n');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log('اتعمل ' + path.relative(ROOT, OUT) + ' (' + Math.round(fs.statSync(OUT).size / 1024) + ' KB)');
