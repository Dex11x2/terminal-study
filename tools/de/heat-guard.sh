#!/usr/bin/env bash
# Keeps a long GPU container (the Chatterbox run, the video transcription) from cooking a laptop: every 30 seconds it
# reads the GPU temperature, pauses the container (docker pause, nothing is lost) above HOT and lets it go on below COOL.
# It ends when the container stops, printing how often it paused.
#   bash tools/de/heat-guard.sh de-cb-run [HOT=85] [COOL=72]
name=${1:?container name}; hot=${2:-85}; cool=${3:-72}; pauses=0
while [ "$(docker inspect -f '{{.State.Running}}' "$name" 2>/dev/null)" = true ]; do
  t=$(nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits | head -1 | cut -d. -f1)
  paused=$(docker inspect -f '{{.State.Paused}}' "$name")
  if [ "$paused" = false ] && [ "$t" -ge "$hot" ]; then
    docker pause "$name" >/dev/null && pauses=$((pauses + 1)) && echo "$(date +%H:%M) $t°C: paused"
  elif [ "$paused" = true ] && [ "$t" -le "$cool" ]; then
    docker unpause "$name" >/dev/null && echo "$(date +%H:%M) $t°C: going on"
  fi
  sleep 30
done
echo "$name stopped; paused $pauses times"
