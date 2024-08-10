import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { publicRoute } from "../../PublicRoute/PublicRoute";

export default function Notification({ info,manageNotify,notifySupport }) {
  const removeNotification = useMutation({
    mutationFn:(value)=>{
      
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
  return (
    <>
      <div
        className={`max-h-[250px] w-[300px] bg-white fixed top-[80px] right-[18%] rounded-md overflow-y-scroll notificationScroll z-30
        ${notifySupport?"scale-in-top":"fade-out-bck"}  ${
          info ? "" : "flex justify-center items-center"
        } notificationBoard`}
      >
        {info ? (
          info.map((value, index) => {
            return <div key={index} className="flex flex-row w-full px-6 py-4">
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
                      removeNotification.mutate(value._id)
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
