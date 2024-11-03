import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import ProductItem from "../ProductItem";
const ProductItemSlide = () => {

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ProductItemSlide;
