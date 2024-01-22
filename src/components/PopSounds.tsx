import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import bubbles0Path from "../assets/sounds/bubbles0.mp3";
import bubbles1Path from "../assets/sounds/bubbles1.mp3";
import bubbles2Path from "../assets/sounds/bubbles2.mp3";
import bubbles3Path from "../assets/sounds/bubbles3.mp3";

const bubbles = [bubbles0Path, bubbles1Path, bubbles2Path, bubbles3Path];

const PopSounds: ForwardRefRenderFunction<{
  playRandomSound: () => void;
}> = (_, ref) => {
  const audioElementsRefs = useRef<HTMLAudioElement[]>([]);

  const playRandomSound = () => {
    const i = Math.floor(Math.random() * 4);
    audioElementsRefs.current[i].play();
  };

  useImperativeHandle(
    ref,
    () => ({
      playRandomSound,
    }),
    [],
  );
  return (
    <div className="hidden">
      {bubbles.map((b, i) => (
        <audio
          key={i}
          src={b}
          ref={(e) => (audioElementsRefs.current[i] = e!)}
        ></audio>
      ))}
    </div>
  );
};

PopSounds.displayName = "PopSounds";

export default forwardRef(PopSounds);
