import { useRef, useState } from "react";
import type { ElementRef, MouseEvent } from "react";
import frame0Path from "./assets/images/frame0.jpg";
import frame1Path from "./assets/images/frame1.jpg";
import frame2Path from "./assets/images/frame2.jpg";
import frame3Path from "./assets/images/frame3.jpg";
import PopSounds from "./components/PopSounds";
import Footer from "./components/Footer";

type PopSoundsRef = ElementRef<typeof PopSounds>;
const framesPath = [frame0Path, frame1Path, frame2Path, frame3Path];

const handleNestedFrame = (
  nestedArray: any[],
  indexList: number[],
  depth = 0,
) => {
  if (depth === indexList.length - 1) {
    nestedArray[indexList[depth]] = [...framesPath];
  } else {
    if (!Array.isArray(nestedArray[indexList[depth]])) {
      nestedArray[indexList[depth]] = [];
    }
    handleNestedFrame(nestedArray[indexList[depth]], indexList, depth + 1);
  }
};

function App() {
  const popSoundsRef = useRef<PopSoundsRef>(null);
  const [framesBoard, setFramesBoard] = useState([...framesPath]);

  const handleMousedown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    indexes: number[],
  ) => {
    e.preventDefault();
    popSoundsRef.current?.playRandomSound();

    const next = [...framesBoard];
    handleNestedFrame(next, indexes);

    setFramesBoard(next);
  };

  const renderFrames = (frames: any[], parentIndex?: string) => {
    return frames.map((frames, i) => {
      const key = parentIndex ? `${parentIndex}-${i}` : `${i}`;

      if (Array.isArray(frames)) {
        return (
          <div className="flex size-1/2 flex-wrap" key={key}>
            {renderFrames(frames, key)}
          </div>
        );
      } else {
        return (
          <div
            className="size-1/2 select-none"
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
    <div className="fixed inset-0 bg-[#A7C9B9]/100">
      <div className="relative top-1/2 m-auto flex w-[50vh] translate-y-[-50%] cursor-pointer flex-wrap justify-center justify-items-center md:w-[100vh]">
        {renderFrames(framesBoard)}
      </div>
      <Footer />
      <PopSounds ref={popSoundsRef} />
    </div>
  );
}

export default App;
