import { Rating } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import { Bounce, toast } from "react-toastify";

export default function EditReview({ dataPass, modalBox }) {
  const [dateContainer,setContainer] = useState();
  const [boxCondition,setCondition] = useState(true);

  const boxHandler=()=>{
    setCondition(false)
    setTimeout(()=>{
      modalBox(false)
    },1500)
  }

  const formInfo=useFormik({
    enableReinitialize:true,
    initialValues:{
      rating:`${dataPass.rating}`,
      currentDate:`${dateContainer}`,
      feedback:`${dataPass.feedback}`
    },
    onSubmit:value=>{
      publicRoute.put(`/reviewUpdate?track=${dataPass._id}`,value )
      .then((res)=>{
        if(res.status==200){
          toast.success('Update success!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        }
      })

      boxHandler();
    }
  })

  const ratingTrack=(event)=>{
    formInfo.setFieldValue('rating',event.target.defaultValue)
  }
  useEffect(()=>{
    const primary = new Date();
    const year = primary.getFullYear();
    const month= primary.getMonth();
    const date = primary.getDate();
    
    const fullFormat = `${year}-${month}-${date}`;

    setContainer(fullFormat);
  },[])
  return (
    <>
      <div className={`h-screen w-screen fixed top-0 reviewModal left-[300px] modalBox ${boxCondition?"scale-in-br":"scale-out-br"}`}>
        <div className="w-[450px] rounded-lg fixed translate-y-[25%] translate-x-[50%] px-4 reviewModalBox ">
        <button className="bg-neutral h-[40px] w-[40px] rounded-full flex justify-center items-center translate-x-[-90%] translate-y-[-15%] transition-all duration-300 hover:bg-rose-500" onClick={boxHandler}>
        <ImCross className="text-white"/>
        </button>
          <div className="w-full flex flex-row justify-center items-center">
            <h2 className="capitalize text-center font-sans font-bold py-4 bg-blue-950 w-[50%] text-white">
              Edit your feedback
            </h2>
          </div>
          <form onSubmit={formInfo.handleSubmit}>
          <div className="flex flex-row justify-between font-mono capitalize py-4">
            <div className="w-1/2">
              <h5 className="text-sm font-black">rating</h5>
              <Rating defaultValue={Number(dataPass.rating)} precision={0.5} onChange={ratingTrack}/>
            </div>
            <div>
            <h5 className="text-sm font-black">Post date</h5>
              <input type="text" className="bg-transparent shadow-inner shadow-indigo-500 rounded-lg pl-2 py-1 w-[100%] hover:cursor-not-allowed font-bold tracking-widest" disabled defaultValue={dateContainer}/>
            </div>
          </div>
          <div>
            <textarea className="h-[250px] w-full bg-transparent shadow-inner shadow-slate-500/50 rounded-xl placeholder:font-mono placeholder:font-semibold placeholder:capitalize placeholder:p-3 font-mono capitalize pl-4 pt-2 font-bold text-base text-slate-700" {...formInfo.getFieldProps('feedback')}></textarea>
          </div>
          <div className="flex flex-row justify-end py-4">
          <button className="btn-17" type="submit">
              update
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
