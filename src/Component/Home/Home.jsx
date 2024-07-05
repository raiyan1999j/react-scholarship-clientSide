import { useEffect, useState } from "react";
import HomeSlider from "./HomeSlider";
import TopScholar from "./TopScholar";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import StudentReview from "./StudentReview";

export default function Home() {
  const [info, setInfo] = useState(null);
  const [reviewData,setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    publicRoute("/latestData").then((res) => {
      setInfo(res.data);
    });
  }, []);

  useEffect(()=>{
    publicRoute('/reviewData')
    .then((res)=>{setData(res.data)})
  },[])
  return (
    <>
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
        <div className="w-full text-center mb-8">
          <h2 className="capitalize text-xl font-bold font-serif">
            top Scholarship
          </h2>
        </div>

        <div className="w-[90%] mx-auto overflow-x-scroll topScholarBox rounded-xl py-4 px-8 topScholarScrollbar">
          <div className="grid grid-cols-[600px_600px_600px_600px_600px_600px_600px] gap-x-6">
            {info?.map((value, index) => {
              return <TopScholar allData={value} key={index} />;
            })}
            <div className="h-[350px] w-full flex justify-center items-center">
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
        </div>

        <div className="w-[90%] mx-auto py-8 px-3 shadow-inner shadow-slate-500/50 rounded-lg mt-[100px]">
          <div className="w-[90%]">
            <Swiper className="mySwiper" modules={[Pagination]} grabCursor={true} pagination={{clickable:true}}>
              {
                reviewData.map((value,index)=>{
                  return <SwiperSlide key={index}>
                    <StudentReview information={value}/>
                  </SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
