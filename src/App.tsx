import type { ElementRef, MouseEvent } from "react";
import { useRef, useState } from "react";
import frame0Path from "./assets/images/frame0.jpg";
import frame1Path from "./assets/images/frame1.jpg";
import frame2Path from "./assets/images/frame2.jpg";
import frame3Path from "./assets/images/frame3.jpg";
import PopSounds from "./components/PopSounds";

type PopSoundsRef = ElementRef<typeof PopSounds>;
const framesPath = [frame0Path, frame1Path, frame2Path, frame3Path];

function App() {
  const popSoundsRef = useRef<PopSoundsRef>(null);
  const [framesBoard, setFramesBoard] = useState([...framesPath]);

  const handleMousedown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    indexes: number[]
  ) => {
    e.preventDefault();
    popSoundsRef.current?.playRandomSound();

    const setNestedFrame = (
      nestedArray: any[],
      indexList: number[],
      depth = 0
    ) => {
      if (depth === indexList.length - 1) {
        nestedArray[indexList[depth]] = [...framesPath];
      } else {
        if (!Array.isArray(nestedArray[indexList[depth]])) {
          nestedArray[indexList[depth]] = [];
        }
        setNestedFrame(nestedArray[indexList[depth]], indexList, depth + 1);
      }
    };

    const next = [...framesBoard];
    setNestedFrame(next, indexes);
    setFramesBoard(next);
  };

  const renderFrames = (frames: any[], parentIndex?: string) => {
    return frames.flatMap((frames, i) => {
      const key = parentIndex ? `${parentIndex}-${i}` : `${i}`;
      if (Array.isArray(frames)) {
        return (
          <div className="flex h-1/2 w-1/2 flex-wrap" key={key}>
            {renderFrames(frames, key)}
          </div>
        );
      } else {
        return (
          <div
            className="h-1/2 w-1/2 select-none"
            onMouseDown={(e) => handleMousedown(e, key.split("-").map(Number))}
            key={key}
          >
            <img src={frames} alt="" className="select-none" />
          </div>
        );
      }
    });
  };

  return (
    <div className="w-screen bg-[#A7C9B9]/100">
      <div className="mx-auto flex h-screen w-[100vh] cursor-pointer flex-wrap justify-center">
        {renderFrames(framesBoard)}
      </div>
      <PopSounds ref={popSoundsRef} />
    </div>
  );
}

export default App;
