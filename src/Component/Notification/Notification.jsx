import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

export default function Notification({ info,manageNotify,notifySupport }) {
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
                        a few seconds ago
                    </p>
                </div>
                <div className="flex justify-end items-center w-[20%]">
                    <button className="transition-all duration-200 hover:text-rose-600">
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
