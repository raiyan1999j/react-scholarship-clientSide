import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { publicRoute } from "../../PublicRoute/PublicRoute";

export default function AppliedFeedback({modalCondition,modalOption,trackId,userMail,statusFeedback}) {
  const textRef = useRef();
  const [closeModal,setClose] = useState(true);
  const [wordCount, setWord] = useState(0);
  const [wordWarn, setWarn] = useState();
  const appFeedback = useMutation({
    mutationFn:(value)=>{
      const userId = value[0];
      const feedback= value[1];
      const wrap ={
        path:"/dashboard/myApplication",
        subject:"authority",
        title:"authority feedback",
        message:"checkout your authority's feedback",
        time: new Date(),
        user: userMail
      }

      return publicRoute.put(`/workStatus?trackId=${userId}`,{feedback,envelope:false})
      .then(()=>{
        publicRoute.post("/manageAppNotification",wrap)
      })
    }
  })

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
            placeholder={statusFeedback?"":"Feedback not set yet"}
            onChange={limitedText}
            defaultValue={statusFeedback?statusFeedback:""}
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
        <div className="w-[90%] mx-auto flex justify-between py-4">
          <button className="capitalize py-2 px-8 font-mono text-xl bg-green-500 text-white rounded-lg transition-all ease-linear duration-150 hover:cursor-point hover:shadow-inner hover:shadow-green-950" onClick={()=>{modalOption('details',true)}}>
            Details
          </button>
          <button className="capitalize scholarsBtn py-2" onClick={()=>{
            appFeedback.mutate([trackId,textRef.current.value]);
            modalOperation();
          }}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
