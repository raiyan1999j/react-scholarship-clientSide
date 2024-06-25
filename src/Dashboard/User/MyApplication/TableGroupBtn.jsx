import { useEffect } from "react";
import { FaInfo } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineCancel, MdRateReview } from "react-icons/md";

export default function TableGroupBtn({info}){
    return(
        <>
        <div className="flex flex-row justify-between">
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-sky-400 hover:text-white tooltip tooltip-top" data-tip="Info">
        <FaInfo />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-green-400 hover:text-white tooltip tooltip-bottom" data-tip="Details">
        <LuClipboardEdit />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-rose-400 hover:text-white tooltip tooltip-top" data-tip="Cancel">
        <MdOutlineCancel />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-orange-400 hover:text-white tooltip tooltip-bottom" data-tip="Add review">
        <MdRateReview />
        </button>
        </div>
        </>
    )
}