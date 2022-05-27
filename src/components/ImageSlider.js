/** @format */

import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

const ImageSlider = ({ videos }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        centeredSlides
        navigation
        className="mySwiper"
        modules={[Navigation]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {videos.map((video) => (
          <SwiperSlide className="swiper_slider">
            <iframe
              title="video"
              allowfullscreen="allowfullscreen"
              src={
                "https://www.youtube.com/embed/" +
                video.key +
                "?controls=1&showinfo=0&autohide=1&rel=0&"
              }
              frameborder="0"></iframe>{" "}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
