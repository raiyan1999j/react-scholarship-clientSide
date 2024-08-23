import { Rating } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { publicRoute } from "../../PublicRoute/PublicRoute";

export default function ReviewCard({info,removeReview}){
    const [readCondition,setCondition] = useState(false);
    return(
        <>
            <div className="w-full rounded-lg overflow-hidden shadow-lg shadow-slate-500/50">
                <div className="h-[250px] w-full border border-gray-400/50 rounded-lg relative">
                    <div className="h-[80%] w-[80%] rounded-lg absolute top-[10%] left-[10%]">
                        <img src={info.image} alt="reviewer image" className="h-full w-full object-cover rounded-lg" />
                    </div>
                    <div className="absolute h-[30px] min-w-[60%] px-4 bg-rose-500 overflow-hidden top-[30px]">
                    <div className="absolute h-[30px] w-[30px] bg-[#e9e7e7] rotate-[48deg] left-[-10px]"></div>
                        <h4 className="text-white font-mono font-bold capitalize text-xl text-right">
                            {info.userName}
                        </h4>
                    </div>
                </div>
                <div className="w-full capitalize px-3 py-3">
                    <div className="my-3">
                        <h2 className="font-bold font-serif text-2xl text-blue-900">
                            {info.university}
                        </h2>
                    </div>
                    <div className="flex flex-row justify-between w-full mb-3">
                        <div>
                            <h4 className="badge badge-primary font-bold">
                                {info.subject}
                            </h4>
                        </div>
                        <div>
                            <h4 className="badge badge-neutral font-bold">
                                {info.currentDate}  
                            </h4>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div>
                            <Rating name="half-rating" defaultValue={`${info.rating}`} precision={0.5} readOnly size="small"/>
                        </div>
                    </div>
                    <div className="my-3">
                        <p className={`text-sm text-slate-700 font-sans font-medium w-full ${readCondition?"transition-all duration-200 ease-in h-auto":"h-[40px] overflow-hidden text-ellipsis userComment break-words"}`}>
                            {info.feedback}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between mt-5">
                    <div>
                        <button className={`capitalize py-1 px-4 border rounded-lg font-mono font-bold hover:bg-success hover:text-white transition-all duration-200 ${readCondition?"border-error text-error hover:bg-error":"border-success text-success hover:bg-success"}`} onClick={()=>{setCondition(!readCondition)}}>
                            {readCondition?"show less":"read more"}
                        </button>
                    </div>
                    <div>
                        <button className="py-1 px-4 border border-secondary text-secondary rounded-lg flex flex-row items-center font-mono font-bold transition-all duration-200 ease-in-out hover:bg-secondary hover:text-white" onClick={()=>{removeReview(info._id)}}> 
                            Delete
                            <MdDelete className="ml-2"/>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}