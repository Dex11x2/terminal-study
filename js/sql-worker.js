// بيشغّل تمارين SQL على PostgreSQL حقيقي (PGlite) جوه worker، عشان الاستعلام اللي مبيخلصش يتقفل من غير ما يعلّق الصفحة.
// app.js بيفتحه أول ما تشغّل أول تمرين SQL بس. الملفات الكبيرة متخزنة gzip في vendor/pglite وبتتفك هنا.
import { PGlite } from '../vendor/pglite/index.js';

const gz = async f => {
  const r = await fetch(new URL('../vendor/pglite/' + f, import.meta.url));
  if (!r.ok) throw new Error(f + ': ' + r.status);
  // a server that already sent it with Content-Encoding: gzip hands over the unpacked bytes, so check the gzip magic first
  const b = await r.arrayBuffer(), m = new Uint8Array(b, 0, 2);
  return m[0] === 0x1f && m[1] === 0x8b ? new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer() : b;
};
const cell = v => v instanceof Date ? v.toISOString() : typeof v === 'bigint' ? String(v) : v && typeof v === 'object' && !ArrayBuffer.isView(v) ? JSON.stringify(v) : v;
let db;

// كل تشغيل بيبدأ من قاعدة نضيفة: schema public جديدة، وبعدين setup، وبعدين الاستعلام
async function run(setup, sql){
  await db.exec('ROLLBACK').catch(() => {});
  await db.exec('RESET ALL; DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public; SET search_path TO public;');
  if (setup) try{ await db.exec(setup); }catch(e){ throw new Error('setup: ' + e.message); }
  const rs = await db.exec(sql, { rowMode: 'array' });
  const last = [...rs].reverse().find(r => r.fields && r.fields.length);
  return last ? { cols: last.fields.map(f => f.name), rows: last.rows.map(r => r.map(cell)) } : { cols: [], rows: [] };
}

onmessage = async e => {
  const { id, setup, sql, ref } = e.data;
  try{
    const got = await run(setup, sql).catch(err => /^setup: /.test(err.message) ? Promise.reject(err) : { err: err.message });
    const exp = ref ? await run(setup, ref) : null;
    postMessage({ id, got, exp });
  }catch(err){ postMessage({ id, fail: String(err && err.message || err) }); }
};

(async () => {
  try{
    const [w, i, d] = await Promise.all(['pglite.wasm.gz', 'initdb.wasm.gz', 'pglite.data.gz'].map(gz));
    db = await PGlite.create({ pgliteWasmModule: await WebAssembly.compile(w), initdbWasmModule: await WebAssembly.compile(i), fsBundle: new Blob([d]) });
    postMessage({ ready: true });
  }catch(err){ postMessage({ fail: String(err && err.message || err) }); }
})();
