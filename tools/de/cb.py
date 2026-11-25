# Course audio with Chatterbox Multilingual (tools/de/chatterbox/Dockerfile), the same contract as tools/de/tts.py:
#   jobs.json: [{"text": "...", "voice": "m"|"f", "out": "path/to/file.mp3"}]  (paths relative to /w, the repo)
#   prints JSON: [{"out": ..., "heard": "<what whisper wrote>", "score": 0–1, "take": 0–2, "sec": seconds}]
# Chatterbox copies the voice of a short reference recording. The references are the course's own Piper lines
# (Thorsten for m, Kerstin for f), so the two voices stay the two the readers already know, said more naturally.
import json, re, subprocess, sys, tempfile, time, wave
import numpy as np
import torch, torchaudio
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
from faster_whisper import WhisperModel

REF = {'m': 'audio/de/c2259c2b.mp3', 'f': 'audio/de/5102a5d9.mp3'}
jobs = json.load(open(sys.argv[1], encoding='utf-8'))
lang = sys.argv[2] if len(sys.argv) > 2 else 'de'
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
toks = lambda s: re.findall(r'[\wäöüß]+', s.lower())


def score(text, heard):
    want = [w for w in toks(text) if not NUM.match(w)]
    got = set(toks(heard))
    return 1.0 if not want else sum(w in got for w in want) / len(want)


# a take whisper doesn't hear well is made again with a calmer setting, up to 3 takes, and the best one stays
TAKES = [dict(exaggeration=0.5, cfg_weight=0.5), dict(exaggeration=0.4, cfg_weight=0.3), dict(exaggeration=0.3, cfg_weight=0.3, temperature=0.6)]
out = []
print(f'device {dev}', file=sys.stderr)
for j in jobs:
    best, t0 = None, time.time()
    for n, kw in enumerate(TAKES):
        path = f'{tmp}/take{n}.wav'
        wav = tts.generate(j['text'], language_id=lang, audio_prompt_path=refs[j['voice']], **kw)
        torchaudio.save(path, wav.cpu(), tts.sr, encoding='PCM_S', bits_per_sample=16)
        segs, _ = whisper.transcribe(read16k(path), language=lang, beam_size=5)
        heard = ' '.join(s.text.strip() for s in segs)
        sc = score(j['text'], heard)
        if best is None or sc > best[0]:
            best = (sc, path, heard, n)
            if n:  # keep the better take apart, the next one overwrites take{n}.wav
                subprocess.run(['cp', path, f'{tmp}/best.wav'], check=True)
                best = (sc, f'{tmp}/best.wav', heard, n)
        if sc >= 0.9:
            break
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', best[1], '-ac', '1', '-b:a', '48k', '/w/' + j['out']], check=True)
    out.append({'out': j['out'], 'heard': best[2], 'score': round(best[0], 2), 'take': best[3], 'sec': round(time.time() - t0, 1)})
    print(json.dumps(out[-1], ensure_ascii=False), file=sys.stderr)
json.dump(out, sys.stdout, ensure_ascii=False)
