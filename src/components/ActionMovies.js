/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

import { animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";

const ActionMovies = ({ id, state }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState("");

  const fetchImages = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        with_genres: id,
        language: "en-US",
        page: page,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setImages(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, [id, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function handlePanigation(event, value) {
    setPage(value);
  }
  function handleScroll() {
    scroll.scrollTo(650);
  }
  return (
    <motion.div className="movies-cat-data">
      <motion.div
        initial={{ Y: 50, opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="movies-flex">
        {images.results &&
          images.results.map((item, index) => (
            <div className="movies-box" key={index}>
              <div className="movie-img">
                {item.poster_path ? (
                  <img
                    src={"https://image.tmdb.org/t/p/w185/" + item.poster_path}
                    alt=""
                  />
                ) : (
                  <img
                    src="https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg"
                    alt=""
                  />
                )}
              </div>

              <div className="movie-text">
                <h2>{item.original_title}</h2>
                <Link
                  to={"/movie/" + item.id}
                  style={{ textDecoration: "none" }}>
                  <button>
                    <AiOutlinePlayCircle className="play-icon" /> Exlore more
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </motion.div>
      <div className="pages">
        <p>Page no : {page} </p>
        <a href="/#" style={{ textDecoration: "none" }} onClick={handleScroll}>
          <Pagination
            defaultPage={1}
            page={page}
            onChange={handlePanigation}
            count={120}
          />
        </a>
      </div>
    </motion.div>
  );
};

export default ActionMovies;
