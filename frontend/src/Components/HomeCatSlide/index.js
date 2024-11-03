import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeCatSilde = () => {
  const [itemBackground, setItemBackground] = useState([
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#ecffec",
    "#feefea",
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3ff",
  ]);

  return (
    <>
      <section className="homeCatSilde">
        <div className="container">
            <h3 className="mb-3 hd">Featured Categories</h3>
          <Swiper
            slidesPerView={10}
            spaceBetween={10}
            navigation={true}
            slidesPerGroup={5}
            // autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {itemBackground?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="item text-center" style={{background: item}}>
                    <img
                      src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725960852/1725960851153_fash.png"
                      alt=""
                    />
                    <h6>Fashion</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default HomeCatSilde;
