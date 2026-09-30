// بيحط PGlite (PostgreSQL حقيقي في WASM) في vendor/pglite عشان تمارين SQL تشتغل من غير CDN:  node tools/vendor-pglite.js [version]
// محتاج نت و npm مرة واحدة بس. الملفات الكبيرة (wasm و data) بتتحفظ gzip وبتتفك في المتصفح بـ DecompressionStream،
// فالـ repo والتحميل الأول حوالي ٦ ميجا بدل ١٧.
const fs = require('fs'), path = require('path'), zlib = require('zlib'), os = require('os'), { execSync } = require('child_process');
const VER = process.argv[2] || '0.5.8';
const OUT = path.join(__dirname, '..', 'vendor', 'pglite');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pglite-'));
const tgz = execSync('npm pack @electric-sql/pglite@' + VER, { cwd: tmp, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim().split('\n').pop();
execSync('tar xzf ' + JSON.stringify(tgz), { cwd: tmp });
const dist = path.join(tmp, 'package', 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
// index.js بيستورد الـ chunks دي بس؛ fs/nodefs و opfs مش محتاجينهم (القاعدة في الميموري)
for (const f of fs.readdirSync(dist)) if (f === 'index.js' || /^chunk-.*\.js$/.test(f)) fs.copyFileSync(path.join(dist, f), path.join(OUT, f));
for (const f of ['pglite.wasm', 'pglite.data', 'initdb.wasm']) fs.writeFileSync(path.join(OUT, f + '.gz'), zlib.gzipSync(fs.readFileSync(path.join(dist, f)), { level: 9 }));
fs.copyFileSync(path.join(tmp, 'package', 'LICENSE'), path.join(OUT, 'LICENSE'));
fs.writeFileSync(path.join(OUT, 'package.json'), JSON.stringify({ type: 'module', name: '@electric-sql/pglite', version: VER, license: 'Apache-2.0 (PGlite) + PostgreSQL License (Postgres)' }, null, 1) + '\n');
fs.rmSync(tmp, { recursive: true, force: true });
const size = fs.readdirSync(OUT).reduce((s, f) => s + fs.statSync(path.join(OUT, f)).size, 0);
console.log('اتحط PGlite ' + VER + ' في vendor/pglite (' + (size / 1048576).toFixed(1) + ' MB). غيّر VENDOR في sw.js لو غيّرت النسخة.');
