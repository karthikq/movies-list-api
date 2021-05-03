/** @format */

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const CastCrew = ({ movies }) => {
  var settings = {
    className: "slider",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 1,

    responsive: [
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1430,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="movie-cast">
      <h2 clas="cast">Related Movies</h2>
      <Slider {...settings}>
        {movies &&
          movies.map((items) => (
            <div className="movie-cast-img">
              {items.poster_path ? (
                <img
                  className="profile-images"
                  src={"https://image.tmdb.org/t/p/w185/" + items.poster_path}
                  alt=""
                />
              ) : (
                <img
                  className="profile-images"
                  src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg"
                  alt="error"
                />
              )}

              <div className="movie-cast-details">
                <h3>{items.name}</h3>
                <p> {items.character}</p>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default CastCrew;
