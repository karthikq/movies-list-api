/** @format */

import React, { useEffect, useState } from "react";
import "./movie.css";
import axios from "axios";

import CastCrew from "./CastCrew";
import { useParams } from "react-router";
import Ratings from "./Ratings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Backdrop from "@mui/material/Backdrop";
import MoviesList from "./MoviesList";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

export const Movie = () => {
  const [videos, setVideo] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [relatedMovies, setRealtedMovies] = useState([]);
  const [moviedata, setMData] = useState("");
  const [pageOffset, setPageOffset] = useState(false);
  const [backDropState, setbackDropState] = useState(true);

  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMovie = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCast(response.data.cast);
        setCrew(response.data.crew);
        setTimeout(() => {
          setbackDropState(false);
        }, 2500);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const fetchMovieData = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setVideo(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchRatings = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id} `,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const fetchWatchProviders = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/similar`,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setRealtedMovies(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);
  useEffect(() => {
    fetchMovieData();
  }, [id]);

  useEffect(() => {
    fetchRatings();
  }, []);

  useEffect(() => {
    fetchWatchProviders();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleAnimate);
  }, []);
  function handleAnimate() {
    const value = window.pageYOffset;
    if (value > 100) setPageOffset(true);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slider-video",
    adaptiveHeight: true,
  };
  return (
    <motion.div className="movie-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropState}>
        {" "}
        <CircularProgress color="inherit" />
      </Backdrop>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "anticipate" }}
        className="movie-contents">
        <div className="movie-contents-main">
          <h1>{moviedata.original_title}</h1>
          <div className="movie-trailer">
            <React.Fragment>
              <Slider {...settings}>
                {videos.map((video) =>
                  video ? (
                    <iframe
                      title="video"
                      allowfullscreen="allowfullscreen"
                      src={
                        "https://www.youtube.com/embed/" +
                        video.key +
                        "?controls=1&showinfo=0&autohide=1&rel=0&"
                      }
                      frameborder="0"></iframe>
                  ) : (
                    "Loading"
                  )
                )}
              </Slider>
            </React.Fragment>
          </div>
          <div className="movie-revieves">
            <Ratings id={id} data={moviedata} />
          </div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="movie-cast">
          <CastCrew cast={cast} h2={"Cast"} state={true} />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="movie-crew">
          <CastCrew cast={crew} h2={"Crew"} state={false} />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="realted-movies">
          <h2 className="rec">Recommended Movies</h2>
          <MoviesList results={relatedMovies} state={true} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
