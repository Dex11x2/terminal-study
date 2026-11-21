# Makes the course audio and listens to it again. Runs inside the de-tools image (tools/de/audio.js calls it).
#   jobs.json: [{"text": "...", "voice": "m"|"f", "out": "audio/de/<hash>.mp3"}]  (paths relative to /w, the repo)
#   prints JSON: [{"out": ..., "heard": "<what whisper wrote>", "score": 0–1, "take": 0–2}]
# m = Thorsten (medium), f = Kerstin (medium). Not Thorsten high: whisper heard its «Ägypten» as «Igbken» and «Ich hab' ihn» (22 Nov),
# and medium said it right; «Ägypten» is in almost every lesson of the course.
import json, re, shutil, subprocess, sys, tempfile, wave
import numpy as np
from piper import PiperVoice, SynthesisConfig
from faster_whisper import WhisperModel

VOICES = {'m': '/voices/de_DE-thorsten-medium.onnx', 'f': '/voices/de_DE-kerstin-medium.onnx'}
jobs = json.load(open(sys.argv[1], encoding='utf-8'))
loaded = {}
model = WhisperModel('small', device='cpu', compute_type='int8', download_root='/w/.cache/de/whisper')


def read16k(path):
    # faster-whisper's own reader (PyAV) fails on this image («metadata_errors»), so the wav is read here and resampled to 16 kHz
    with wave.open(path, 'rb') as w:
        rate, n = w.getframerate(), w.getnframes()
        a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768.0
    t = np.linspace(0, len(a) / rate, int(len(a) * 16000 / rate), endpoint=False)
    return np.interp(t, np.arange(len(a)) / rate, a).astype(np.float32)


# Kerstin in particular sometimes swallows a short phrase («Am siebten Juli» came back as «Ich bin Zypton Juli», 22 Nov).
# So a take whose words whisper doesn't hear is made again with other settings (slower, steadier), up to 3 takes, and the best one stays.
# Number words don't count in the score: whisper writes them as digits anyway.
TAKES = [None, SynthesisConfig(length_scale=1.15, noise_scale=0.4), SynthesisConfig(length_scale=1.3, noise_scale=0.3, noise_w_scale=0.5)]
NUM = re.compile(r'^(null|eins?|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\w*zehn|\w*zig|\w*ßig|hundert|\w*tausend\w*|\w*hundert\w*|\d+)$')
toks = lambda s: re.findall(r'[\wäöüß]+', s.lower())


def score(text, heard):
    want = [w for w in toks(text) if not NUM.match(w)]
    got = set(toks(heard))
    return 1.0 if not want else sum(w in got for w in want) / len(want)


out = []
for j in jobs:
    v = loaded.get(j['voice']) or loaded.setdefault(j['voice'], PiperVoice.load(VOICES[j['voice']]))
    best = None
    with tempfile.TemporaryDirectory() as d:
        for n, cfg in enumerate(TAKES):
            path = f'{d}/take{n}.wav'
            with wave.open(path, 'wb') as wf:
                v.synthesize_wav(j['text'], wf, syn_config=cfg)
            segs, _ = model.transcribe(read16k(path), language='de', beam_size=5)
            heard = ' '.join(s.text.strip() for s in segs)
            sc = score(j['text'], heard)
            if best is None or sc > best[0]:
                best = (sc, path, heard, n)
            if sc >= 0.8:
                break
        # mono mp3 at 48 kbit/s: about 6 KB a second, clear enough for speech
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', best[1], '-ac', '1', '-b:a', '48k', '/w/' + j['out']], check=True)
        out.append({'out': j['out'], 'heard': best[2], 'score': round(best[0], 2), 'take': best[3]})
json.dump(out, sys.stdout, ensure_ascii=False)
