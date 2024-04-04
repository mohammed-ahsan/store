// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import Image from "next/image";

// // import './styles.css';

// // import required modules
// import { Pagination } from "swiper";

// const LandingCarousel = () => {
//   return (
//     <>
//       <div className="bg-red-5 w-full h-[400px]">
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={0}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[Pagination]}
//           className="h-full"
//           autoplay={true}
//         >
//           <SwiperSlide>
//             <div className="w-full h-[400px] bg-white element">
//               <Image
//                 width={400}
//                 height={400}
//                 alt="Slide One"
//                 src={`/slider/slideOne.png`}
//               />
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="w-full h-[400px] bg-white element">
//               <Image
//                 width={400}
//                 height={400}
//                 alt="Slide One"
//                 src={`/slider/slideTwo.webp`}
//               />
//             </div>
//           </SwiperSlide>

//           <SwiperSlide>
//             <div className="w-full h-[400px] bg-white element">
//               <Image
//                 width={400}
//                 height={400}
//                 alt="Slide One"
//                 src={`/slider/slideThree.webp`}
//               />
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="w-full h-[400px] bg-white element">
//               <Image
//                 width={400}
//                 height={400}
//                 alt="Slide One"
//                 src={`/slider/slideFour.webp`}
//               />
//             </div>
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </>
//   );
// };

// export default LandingCarousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Pagination } from "swiper";

const LandingCarousel = () => {
  return (
    <>
      <div className="bg-red-5 w-full h-[400px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="h-full"
          autoplay={true}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className="w-full h-[400px] bg-white element">
              <Image
                width={400}
                height={400}
                alt="Slide One"
                src={`/slider/slideOne.png`}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[400px] bg-white element">
              <Image
                width={600} // Adjust width for larger screens
                height={600} // Adjust height for larger screens
                alt="Slide Two"
                src={`/slider/slideTwo.webp`}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full h-[400px] bg-white element">
              <Image
                width={400}
                height={400}
                alt="Slide Three"
                src={`/slider/slideThree.webp`}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-[400px] bg-white element">
              <Image
                width={400}
                height={400}
                alt="Slide Four"
                src={`/slider/slideFour.webp`}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default LandingCarousel;
