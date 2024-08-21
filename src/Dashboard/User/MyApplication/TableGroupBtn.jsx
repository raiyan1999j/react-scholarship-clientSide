import { useEffect } from "react";
import { FaInfo } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineCancel, MdRateReview } from "react-icons/md";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function TableGroupBtn({handleBox,modalReview,trackingEmail,trackingId, editModal,cancelationApp}){
    const navigate = useNavigate();

    const reviewOpt=()=>{
        handleBox(false)

        publicRoute(`/checkExistence?trackEmail=${trackingEmail}&&trackId=${trackingId}`)
        .then((res)=>{
            if(!res.data){
                modalReview(true)
            }else{
                toast.warn('Feedback already added', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition:Bounce
                    });
            }
        })
    }

    const detailsTrackId=(value)=>{
        navigate(`/details/${value}`)
    }
    return(
        <>
        <div className="flex flex-row justify-between">
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-sky-400 hover:text-white tooltip tooltip-top" data-tip="details" onClick={()=>{detailsTrackId(trackingId)}}>
        <FaInfo />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-green-400 hover:text-white tooltip tooltip-bottom" data-tip="edit" onClick={()=>{editModal(true)}}>
        <LuClipboardEdit />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-rose-400 hover:text-white tooltip tooltip-top" data-tip="Cancel" onClick={()=>{cancelationApp(trackingId)}}>
        <MdOutlineCancel />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-orange-400 hover:text-white tooltip tooltip-bottom" data-tip="Add review" onClick={reviewOpt}>
        <MdRateReview />
        </button>
        </div>
        </>
    )
}