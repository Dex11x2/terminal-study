# German course tools in one image, so nothing gets installed on the machine.
#   docker build -t de-tools tools/de
#   docker run --rm -v "$PWD:/w" -w /w de-tools <command>
# pdftotext (poppler): reads the Goethe PDFs; piper: German speech (voices in /voices);
# faster-whisper: listens to the generated audio and writes it back as text;
# spaCy + de_core_news_sm: lemmas, for the "no word above the level" check.
FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends poppler-utils && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir piper-tts==1.3.0 faster-whisper==1.2.0 spacy==3.8.7 \
 && python -m spacy download de_core_news_sm
WORKDIR /voices
# measured 21 Nov with whisper round-trip: thorsten-medium/high and kerstin-medium come back word for word;
# kerstin-low turns "Guten" into "Durven", mls-medium (236 speakers) comes back as unrelated words: not used
RUN python -m piper.download_voices de_DE-thorsten-medium de_DE-thorsten-high de_DE-kerstin-medium
WORKDIR /w
