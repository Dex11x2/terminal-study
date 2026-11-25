# Writes the speech of the owner's course videos as text, to find what the site's course is missing (PLAN, review of the
# owner's German course). Runs in the de-cb image, which has the CUDA libraries, on the GPU:
#   docker run -d --name de-tr-run --gpus all -v "D:/courses/languages Courses/german course:/c:ro" -v "<repo>:/w" -w /w \
#     de-cb python tools/de/transcribe.py /c ".cache/de/course-text" "A1-1 Kurs" "A1-2 Kurs"
# One .txt per video («[mm:ss] text» a line), skipped when it already exists, so a stopped run starts where it was.
# The teacher speaks Arabic and German in the same sentence, so the language is detected per segment (multilingual).
import glob, os, sys, time
import nvidia.cublas, nvidia.cudnn  # ctranslate2 loads these from the pip packages torch brought along

for m in (nvidia.cublas, nvidia.cudnn):
    lib = os.path.join(list(m.__path__)[0], 'lib')
    os.environ['LD_LIBRARY_PATH'] = lib + ':' + os.environ.get('LD_LIBRARY_PATH', '')
from faster_whisper import WhisperModel

src, out, levels = sys.argv[1], sys.argv[2], sys.argv[3:]
model = WhisperModel('large-v3-turbo', device='cuda', compute_type='float16', download_root='/w/.cache/de/whisper')
for level in levels:
    vids = sorted(glob.glob(os.path.join(src, level, '*', '*.mp4')))
    os.makedirs(os.path.join(out, level), exist_ok=True)
    for v in vids:
        dst = os.path.join(out, level, os.path.basename(v)[:-4] + '.txt')
        if os.path.exists(dst):
            continue
        t0 = time.time()
        segs, info = model.transcribe(v, multilingual=True, vad_filter=True, beam_size=5)
        lines = [f'[{int(s.start // 60):02d}:{int(s.start % 60):02d}] {s.text.strip()}' for s in segs]
        tmp = dst + '.part'
        with open(tmp, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines) + '\n')
        os.replace(tmp, dst)
        print(f'{level}/{os.path.basename(v)} {info.duration / 60:.0f} min in {(time.time() - t0) / 60:.1f} min, {len(lines)} lines', flush=True)
