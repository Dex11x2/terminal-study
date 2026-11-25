# Chatterbox Multilingual (Resemble AI, MIT): an open speech model that runs offline on the GPU and speaks
# 23 languages, German and English among them. Tried as the course voice instead of Piper (PLAN: «تبديل الصوت»).
#   docker build -t de-cb tools/de/chatterbox
#   docker run --rm --gpus all -v "$PWD:/w" -w /w de-cb python tools/de/cb.py <jobs.json>
# The model (about 3 GB) is downloaded once into /w/.cache/de/hf (the repo's ignored .cache folder, on the same disk as
# the repo), not into the image. ffmpeg: the reference voices are mp3 and the site wants mp3; faster-whisper: listens to
# every take, as tools/de/tts.py does for Piper.
FROM python:3.11-slim
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir chatterbox-tts==0.1.7 faster-whisper==1.2.0
ENV HF_HOME=/w/.cache/de/hf
WORKDIR /w
