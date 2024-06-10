import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';

export default function HomeSlider() {
  return (
    <>
      <section className="w-[60%] left-[20%] top-[60%] absolute ">
        <Swiper
          loop={true}
          scrollbar={{
          hide: true,
        }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay,Scrollbar]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="h-[350px] w-full">
              <img src="https://i.postimg.cc/28SrRsZV/dora-dalberto-ORz-Zt-Y2i50k-unsplash.jpg" alt="versityImage" className="h-full w-full object-cover rounded-xl" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="h-[350px] w-full">
              <img src="https://i.postimg.cc/W4j5xvdy/vadim-sherbakov-d6eb-Y-fa-OO0-unsplash.jpg" alt="versityImage" className="h-full w-full object-cover rounded-xl" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="h-[350px] w-full">
              <img src="https://i.postimg.cc/ht8rL521/venti-views-t-QGi3b7d6r-U-unsplash.jpg" alt="versityImage" className="h-full w-full object-cover rounded-xl" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="h-[350px] w-full">
              <img src="https://i.postimg.cc/FRzVQsNT/fabian-mardi-t-Qu-Evmj83-U4-unsplash.jpg" alt="versityImage" className="h-full w-full object-cover rounded-xl" />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
