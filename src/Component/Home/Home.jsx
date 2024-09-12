import { useEffect, useState } from "react";
import HomeSlider from "./HomeSlider";
import TopScholar from "./TopScholar";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import StudentReview from "./StudentReview";
import Loader from "../../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import ErrorCompo from "../../ErrorCompo/ErrorCompo";
import GetInTouch from "./GetInTouch";
import { Helmet } from "react-helmet";

export default function Home() {
  const navigate = useNavigate();

  const {isPending:infoPending,error:infoError,data:infoData} = useQuery({
    queryKey:["info"],
    queryFn: ()=>{
      return publicRoute("/latestData").then(res=>res.data);
    }
  })
  
  const {isPending:reviewPending,error:reviewError,data:reviewData} = useQuery({
    queryKey:["review"],
    queryFn: ()=>{
      return publicRoute("/reviewData").then(res=>res.data)
    }
  })
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Home</title>
    </Helmet>
      <section className="w-full bg-blue-100/50">
        <div className="h-[500px] w-[1200px] mx-auto relative ">
          <div className="absolute bg-homeBg h-full w-full">
            <div className="absolute top-[30%] w-[600px] left-[25%] text-slate-700">
              <h1 className="text-4xl text-center font-bold font-serif">
                Unlock Your Future with Global Scholarships!
              </h1>
            </div>
            <HomeSlider />
          </div>
        </div>
      </section>

      <section className="w-[1200px] mx-auto mt-[200px] py-[50px]">
        <div className="w-full flex flex-row justify-between items-center mb-8">
          <h2 className="capitalize text-2xl font-bold font-serif text-blue-900">
            top Scholarship
          </h2>
          <div className="w-[40%] flex justify-end">
          <button
                className="scholarsBtn w-[80%]"
                onClick={() => {
                  navigate("/allScholars");
                }}
              >
                Show All
          </button>
          </div>
        </div>
        {
          infoPending?<div className="flex justify-center items-center w-full h-[150px]">
            <Loader width="150"/>
          </div>:
          infoError? <ErrorCompo/>:
          <div className="w-full mx-auto overflow-x-scroll rounded-xl py-8 topScholarScrollbar">
          <div className="grid grid-cols-[700px_700px_700px_700px_700px_700px] gap-x-6 w-full mx-auto rounded-xl">
            {infoData?.map((value, index) => {
              return <TopScholar allData={value} key={index} />;
            })}
          </div>
        </div>
        }
        <div className="w-[90%] mx-auto py-8 px-3 shadow-inner shadow-slate-500/50 rounded-lg mt-[100px] reviewBackgroundImg">
          <div className="w-[90%] mx-auto relative">
          {
            reviewPending?<div className="flex w-full justify-center items-center ">
              <Loader width="150"/>
            </div>:
            reviewError?<ErrorCompo/>:
            <Swiper className="mySwiper" modules={[Pagination]} grabCursor={true} pagination={{clickable:true}}>
              {
                reviewData.map((value,index)=>{
                  return <SwiperSlide key={index}>
                    <StudentReview information={value}/>
                  </SwiperSlide>
                })
              }
            </Swiper>
          } 
          </div>
        </div>
      </section>

      <section className="w-[1200px] mx-auto my-[200px]">
        <GetInTouch/>
      </section>
    </>
  );
}
