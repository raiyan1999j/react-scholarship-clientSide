import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImCross } from "react-icons/im";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { useEffect, useState } from "react";

export default function Notification({ info,notifySupport}) {
  const queryClient = useQueryClient();
  const [condition,setCondition] = useState();
  const [container,setContainer] = useState(info);
  const removeNotification=useMutation({
    mutationFn:(trackId)=>{
      return publicRoute.delete(`/removeNotification?userId=${trackId}`)
    },
    onSuccess:(data)=>{
      setTimeout(()=>{
        setContainer(data.data)
      },1000 * 60)
      queryClient.invalidateQueries(['getNotification'])
    }
  })

  const timeConvert=(time)=>{
    const current = new Date();
    const preValue= new Date(time);
    const difference=current - preValue;
    const minutes = difference/(1000 * 60);
    const hours = difference/(1000 * 60 * 60);
    const day = difference/(1000 * 60 * 60 * 24);
    let result;

    if(minutes > 60){
      if(hours > 24){
        if(Math.floor(day) === 1){
          result = 'a day ago'
        }else{
          result = `${Math.floor(day)} days ago`
        }
      }else{
        if(Math.floor(hours) === 1){
          result = '1 hour ago'
        }else{
          result = `${Math.floor(hours)} hours ago`;
        }
      }
    }else{
      if(Math.floor(minutes) < 1){
        result = 'a few seconds ago'
      }else{
        result = `${Math.floor(minutes)} minutes ago`
      }
    }

    return result;
  }

  const notificationMange=(trackId)=>{
    removeNotification.mutate(trackId);
    setCondition(trackId);
    setTimeout(()=>{
      const step1 = [...container];
      const step2 = step1.filter(value => value._id !== trackId);

      setContainer(step2)
    },500)
  }

  useEffect(()=>{
    setTimeout(()=>{
      setContainer(info)
    },1000 * 30)
  },[info])
  return (
    <>
      <div
        className={`max-h-[300px] w-[300px] bg-white fixed top-[80px] right-[18%] rounded-md overflow-y-scroll overflow-x-hidden notificationScroll z-30
        ${notifySupport?"scale-in-top":"fade-out-bck"}  ${
          container ? "" : "flex justify-center items-center"
        } notificationBoard`}
      >
        {info ? (
          container?.sort((a,b)=>{return new Date(b.time) - new Date(a.time)}).map((value, index) => {
            return <div key={index} className={`flex flex-row w-full px-6 py-4 ${condition===value._id?"fade-out-right":""}`}>
                <div className="w-[80%]">
                    <button className="capitalize font-serif text-base text-start font-medium hover:underline hover:underline-offset-4"> 
                        {value.message}
                    </button>
                    <p className="font-bold text-sky-400 font-sans text-sm mt-2">
                        {timeConvert(value.time)}
                    </p>
                </div>
                <div className="flex justify-end items-center w-[20%]">
                    <button className="transition-all duration-200 hover:text-rose-600" onClick={()=>{
                       notificationMange(value._id)
                    }}>
                    <ImCross className="text-xs"/>
                    </button>
                </div>
            </div>;
          })
        ) : (
          <span className="loading loading-ring loading-lg bg-rose-500"></span>
        )}
      </div>
    </>
  );
}
