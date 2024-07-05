import { Rating } from "@mui/material";
import { SwiperSlide } from "swiper/react";

export default function ReviewSlider({information}){
    const {rating,currentDate,feedback,userName,image} = information;
    return(
        <>


            <div className="w-[90%] mx-auto flex flex-row items-center">
                <div className="w-[10%] flex flex-col items-center rounded-lg shadow-slate-300 shadow-inner py-8 px-4">
                    <div className="w-[80px] h-[80px]">
                    <img src={image} alt="userImg" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <h2 className="capitalize text-slate-900 font-serif text-xl mt-2 ">
                        {userName}
                    </h2>
                </div>
                <div className="w-[80%] ml-5 rounded-lg shadow-lg shadow-slate-600 py-4 px-4">
                    <h4 className=" text-indigo-100 font-black font-mono text-sm mb-3 badge badge-neutral">
                        {currentDate}
                    </h4>
                    <p className="font-mono font-semibold text-base text-slate-900 w-[95%] text-pretty">
                        {feedback}
                    </p>
                    <div className="w-[90%] flex justify-end">
                        <Rating defaultValue={Number(rating)} precision={0.5} readOnly size="small"/>
                    </div>
                </div>
            </div>

        </>
    )
}