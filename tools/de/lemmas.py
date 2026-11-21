# Lemmas of German text files with spaCy (de_core_news_sm), counted per file.
#   docker run --rm -v "$PWD/.cache/de/src:/w" -v "$PWD/tools/de:/tools" -w /w de-tools python /tools/lemmas.py a.txt b.txt > lemmas.json
# Output: {"<file>": {"<lemma>\t<POS>": count}}. Proper names, numbers, punctuation and symbols are left out.
# The PDFs break words at line ends («Wo-\nchenende»): those are joined back before parsing.
import json, re, sys
import spacy

nlp = spacy.load('de_core_news_sm')
SKIP = {'PROPN', 'NUM', 'PUNCT', 'SYM', 'SPACE', 'X'}
out = {}
for path in sys.argv[1:]:
    text = open(path, encoding='utf-8').read()
    text = re.sub(r'(\w)-\n\s*([a-zäöüß])', r'\1\2', text)
    text = re.sub(r'\s+', ' ', text)
    counts = {}
    for tok in nlp(text):
        if tok.pos_ in SKIP or not re.fullmatch(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß\-]*", tok.text):
            continue
        key = tok.lemma_ + '\t' + tok.pos_
        counts[key] = counts.get(key, 0) + 1
    out[path] = counts
json.dump(out, sys.stdout, ensure_ascii=False)
