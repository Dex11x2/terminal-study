# Makes the course audio and listens to it again. Runs inside the de-tools image (tools/de/audio.js calls it).
#   jobs.json: [{"text": "...", "voice": "m"|"f", "out": "audio/de/<hash>.mp3"}]  (paths relative to /w, the repo)
#   prints JSON: [{"out": ..., "heard": "<what whisper wrote>"}]
# m = Thorsten (medium), f = Kerstin (medium). Not Thorsten high: whisper heard its «Ägypten» as «Igbken» and «Ich hab' ihn» (22 Nov),
# and medium said it right; «Ägypten» is in almost every lesson of the course.
import json, subprocess, sys, tempfile, wave
import numpy as np
from piper import PiperVoice
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


out = []
for j in jobs:
    v = loaded.get(j['voice']) or loaded.setdefault(j['voice'], PiperVoice.load(VOICES[j['voice']]))
    with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
        with wave.open(tmp.name, 'wb') as wf:
            v.synthesize_wav(j['text'], wf)
        # mono mp3 at 48 kbit/s: about 6 KB a second, clear enough for speech
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', tmp.name, '-ac', '1', '-b:a', '48k', '/w/' + j['out']], check=True)
        segs, _ = model.transcribe(read16k(tmp.name), language='de', beam_size=5)
        out.append({'out': j['out'], 'heard': ' '.join(s.text.strip() for s in segs)})
json.dump(out, sys.stdout, ensure_ascii=False)
