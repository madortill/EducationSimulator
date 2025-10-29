import { useEffect, useRef } from "react";
import startSound from "../assets/sounds/electronic-cinematic-dramatic.wav";

function UseSeamlessLoop(volume = 0.5) {
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const bufferRef = useRef(null);

  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();

    fetch(startSound)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => audioCtxRef.current.decodeAudioData(arrayBuffer))
      .then(decodedBuffer => {
        bufferRef.current = decodedBuffer;
      });

    return () => {
      stop();
      audioCtxRef.current.close();
    };
  }, []);

  const play = () => {
    if (!bufferRef.current) return;
    const source = audioCtxRef.current.createBufferSource();
    const gainNode = audioCtxRef.current.createGain();

    source.buffer = bufferRef.current;
    source.loop = true;

    gainNode.gain.value = volume;

    source.connect(gainNode).connect(audioCtxRef.current.destination);
    source.start(0);
    sourceRef.current = source;
  };

  const stop = () => {
    if (sourceRef.current) {
      sourceRef.current.stop(0);
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
  };

  return { play, stop };
}

export default UseSeamlessLoop;
