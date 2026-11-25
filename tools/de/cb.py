# Course audio with Chatterbox Multilingual (tools/de/chatterbox/Dockerfile). Same jobs as tools/de/tts.py (Piper):
#   python tools/de/cb.py <jobs.json> [lang] [done.jsonl]
#   jobs.json: [{"text": "...", "voice": "m"|"f", "out": "audio/de/<hash>.mp3"}]  (paths relative to /w, the repo)
# Each finished line is appended to done.jsonl at once ({"out", "heard", "score", "take", "sec"}), and a line already in it
# is skipped. So a run of many hours can stop (Docker restarts, the laptop sleeps) and start again where it was.
# Without done.jsonl it prints the results as one JSON list at the end, like tts.py.
# Chatterbox copies the voice of a short recording: tools/de/voices/ref-m.mp3 (Thorsten) and ref-f.mp3 (Kerstin), two
# course lines Piper made, kept apart so the run doesn't overwrite its own references.
import json, os, re, subprocess, sys, tempfile, time, wave
from collections import Counter
import numpy as np
import torch, torchaudio
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
from faster_whisper import WhisperModel

REF = {'m': 'tools/de/voices/ref-m.mp3', 'f': 'tools/de/voices/ref-f.mp3'}
jobs = json.load(open(sys.argv[1], encoding='utf-8'))
lang = sys.argv[2] if len(sys.argv) > 2 else 'de'
log = sys.argv[3] if len(sys.argv) > 3 else None
done = set()
if log and os.path.exists(log):
    for l in open(log, encoding='utf-8'):
        if l.strip():
            done.add(json.loads(l)['out'])
todo = [j for j in jobs if j['out'] not in done]
print(f'{len(jobs)} jobs, {len(done)} done before, {len(todo)} to make', file=sys.stderr, flush=True)

dev = 'cuda' if torch.cuda.is_available() else 'cpu'
tts = ChatterboxMultilingualTTS.from_pretrained(device=dev)
whisper = WhisperModel('small', device='cpu', compute_type='int8', download_root='/w/.cache/de/whisper')
tmp = tempfile.mkdtemp()
refs = {}
for v, mp3 in REF.items():
    refs[v] = f'{tmp}/ref-{v}.wav'
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', mp3, '-ac', '1', '-ar', '24000', refs[v]], check=True)


def read16k(path):
    with wave.open(path, 'rb') as w:
        rate, n = w.getframerate(), w.getnframes()
        a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768.0
    t = np.linspace(0, len(a) / rate, int(len(a) * 16000 / rate), endpoint=False)
    return np.interp(t, np.arange(len(a)) / rate, a).astype(np.float32)


NUM = re.compile(r'^(null|eins?|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\w*zehn|\w*zig|\w*ßig|hundert|\w*tausend\w*|\w*hundert\w*|\d+)$')
toks = lambda s: re.findall(r'[\wäöüß]+', s.lower().replace("'", ''))  # «geht's» and whisper's «gehts» are one word


UNITS = {'cm', 'mm', 'm', 'km', 'kg', 'g', 'l', 'ml', 'qm', 'm²', 'ca', 'z', 'b'}  # whisper writes «90 cm» for «neunzig Zentimeter»


def score(text, heard):
    # the share of the line's words whisper heard, minus the words it heard that the line doesn't have: Chatterbox
    # sometimes says the end twice («unmöglich, unmöglich») or adds a tail of nonsense, and that take must lose
    want = Counter(w for w in toks(text) if not NUM.match(w))
    got = Counter(w for w in toks(heard) if not NUM.match(w) and w not in UNITS)
    n = sum(want.values())
    if not n:
        return 1.0
    hit = sum(min(c, got[w]) for w, c in want.items())
    extra = sum(max(0, c - want[w]) for w, c in got.items())
    return max(0.0, (hit - extra) / n)


# a take whisper doesn't hear well is made again with a calmer setting, up to 3 takes, and the best one stays
TAKES = [dict(exaggeration=0.5, cfg_weight=0.5), dict(exaggeration=0.4, cfg_weight=0.3), dict(exaggeration=0.3, cfg_weight=0.3, temperature=0.6)]
out = []
print(f'device {dev}', file=sys.stderr, flush=True)
for i, j in enumerate(todo):
    best, t0 = None, time.time()
    for n, kw in enumerate(TAKES):
        path = f'{tmp}/take{n}.wav'
        wav = tts.generate(j['text'], language_id=lang, audio_prompt_path=refs[j['voice']], **kw)
        torchaudio.save(path, wav.cpu(), tts.sr, encoding='PCM_S', bits_per_sample=16)
        segs, _ = whisper.transcribe(read16k(path), language=lang, beam_size=5)
        heard = ' '.join(s.text.strip() for s in segs)
        sc = score(j['text'], heard)
        if best is None or sc > best[0]:
            subprocess.run(['cp', path, f'{tmp}/best.wav'], check=True)
            best = (sc, heard, n)
        if sc >= 0.9:
            break
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{tmp}/best.wav', '-ac', '1', '-b:a', '48k', '/w/' + j['out']], check=True)
    r = {'out': j['out'], 'heard': best[1], 'score': round(best[0], 2), 'take': best[2], 'sec': round(time.time() - t0, 1)}
    out.append(r)
    if log:
        with open(log, 'a', encoding='utf-8') as f:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    print(f'{i + 1}/{len(todo)} {r["score"]} {r["sec"]}s {j["text"][:60]}', file=sys.stderr, flush=True)
if not log:
    json.dump(out, sys.stdout, ensure_ascii=False)
