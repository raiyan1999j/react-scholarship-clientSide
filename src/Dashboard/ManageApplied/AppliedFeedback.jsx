import { useRef, useState } from "react";
import { GiCrossMark } from "react-icons/gi";

export default function AppliedFeedback({modalCondition}) {
  const textRef = useRef();
  const [closeModal,setClose] = useState(true);
  const [wordCount, setWord] = useState(0);
  const [wordWarn, setWarn] = useState();
  const limitedText = () => {
    const separate = textRef.current.value.split(" ");
    const count = separate.length;

    if (count > 500) {
      setWarn("Please limit your response to 500 words.");
      textRef.current.value = separate.slice(0, 500).join(" ");
    } else {
      setWarn("");
    }

    setWord(Math.min(count, 500));
  };

  const modalOperation=()=>{
    setClose(false);
    setTimeout(()=>{
        modalCondition(false);
    },500)
  }
  return (
    <>
      <div className={`w-[60%] mx-auto shadow-xl shadow-gray-600 appliedFeedbackBg py-4 ${closeModal?"slide-in-right":"scale-out-center"}`}>
        <div className="fixed top-[-8%] right-[-8%]">
          <button className="h-[50px] w-[50px] shadow-lg shadow-slate-900 rounded-full flex justify-center items-center" onClick={modalOperation}>
            <GiCrossMark className="text-2xl text-rose-900 transition-all duration-200 hover:text-4xl" />
          </button>
        </div>
        <div className="w-full text-center">
          <h2 className="appliedTxt font-sans text-3xl capitalize font-bold text-slate-700">
            Feedback
          </h2>
        </div>
        <div className="py-4 w-[90%] mx-auto ">
          <textarea
            className="w-full h-[250px] appliedFeedbackText resize-none py-4 px-4 text-slate-950 capitalize font-serif font-semibold placeholder:capitalize placeholder:py-4 placeholder:px-4 placeholder:text-slate-800/50 placeholder:font-medium placeholder:font-serif"
            placeholder="write your feedback"
            onChange={limitedText}
            ref={textRef}
          ></textarea>
          <div className="flex flex-row justify-between font-mono py-2">
            <div>
              <p className="appliedTxt text-rose-600 font-bold ml-2">
                {wordWarn}
              </p>
            </div>
            <div>
              <p className="text-base font-bold mr-2">{wordCount}/500</p>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex justify-end py-4">
          <button className="capitalize rejectApplied py-2 px-8 font-mono text-xl">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
