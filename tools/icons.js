// بيولّد أيقونات التطبيق (PWA) من غير أي مكتبة:  node tools/icons.js
const fs = require('fs'), path = require('path'), zlib = require('zlib');

function png(size, draw) {
  const S = 4, W = size * S;                       // supersampling for smooth edges
  const hi = new Float32Array(W * W * 4);
  draw((x, y) => x / W, W, hi);
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const acc = [0, 0, 0, 0];
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
        const p = ((y * S + j) * W + (x * S + i)) * 4;
        for (let k = 0; k < 4; k++) acc[k] += hi[p + k];
      }
      const o = y * (size * 4 + 1) + 1 + x * 4, a = acc[3] / (S * S);
      for (let k = 0; k < 3; k++) raw[o + k] = a ? Math.round(acc[k] / acc[3] * 255) : 0;
      raw[o + 3] = Math.round(a * 255);
    }
  }
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = b => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

// terminal-style icon: dark tile, amber ">" and "_"
function draw(maskable) {
  return (_, W, px) => {
    const bg = [0x1f / 255, 0x24 / 255, 0x30 / 255], fg = [0xff / 255, 0xcc / 255, 0x66 / 255];
    const pad = maskable ? 0 : W * 0.06, r = maskable ? 0 : W * 0.2;
    const inTile = (x, y) => {
      const l = pad, t = pad, rr = W - pad, b = W - pad;
      if (x < l || x > rr || y < t || y > b) return false;
      const cx = x < l + r ? l + r : x > rr - r ? rr - r : x, cy = y < t + r ? t + r : y > b - r ? b - r : y;
      return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
    };
    const k = maskable ? 0.78 : 1;                  // keep the glyph inside the maskable safe zone
    const c = W / 2, u = v => c + (v - 0.5) * W * k;
    const seg = (x, y, x1, y1, x2, y2, w) => {       // distance from point to a thick segment
      const dx = x2 - x1, dy = y2 - y1, t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
      return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)) <= w / 2;
    };
    const sw = W * 0.085 * k;
    for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
      const p = (y * W + x) * 4;
      if (!inTile(x + 0.5, y + 0.5)) continue;
      const X = x + 0.5, Y = y + 0.5;
      const glyph = seg(X, Y, u(0.27), u(0.32), u(0.47), u(0.5), sw) || seg(X, Y, u(0.47), u(0.5), u(0.27), u(0.68), sw) || seg(X, Y, u(0.55), u(0.69), u(0.75), u(0.69), sw);
      const col = glyph ? fg : bg;
      px[p] = col[0]; px[p + 1] = col[1]; px[p + 2] = col[2]; px[p + 3] = 1;
    }
  };
}

const out = path.join(__dirname, '..', 'icons');
fs.mkdirSync(out, { recursive: true });
for (const [name, size, m] of [['icon-192.png', 192, false], ['icon-512.png', 512, false], ['maskable-512.png', 512, true], ['apple-touch-icon.png', 180, true]]) {
  fs.writeFileSync(path.join(out, name), png(size, draw(m)));
  console.log('icons/' + name);
}
