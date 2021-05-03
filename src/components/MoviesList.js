/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { RiMovieLine } from "react-icons/ri";

const MoviesList = ({ results, state }) => {
  function handleScroll() {
    scroll.scrollTo(0);
  }
  return (
    <div className="trending-flex">
      {results.results &&
        results.results.map((result) => (
          <div className="trending-movies-box">
            <div className="trending-img">
              <img
                src={"https://image.tmdb.org/t/p/w185/" + result.poster_path}
                alt=""
              />
            </div>
            <div className="trending-text">
              <h2 style={state ? { color: "white" } : { color: "black" }}>
                {result.original_title}
              </h2>
              {state ? (
                <a
                  href={"/movie/" + result.id}
                  className="tag2"
                  onClick={handleScroll}>
                  <p className="white">
                    Know More <RiMovieLine className="icon-movie" />
                  </p>
                </a>
              ) : (
                <Link
                  to={"/movie/" + result.id}
                  style={{ textDecoration: "none" }}>
                  <p className="black">
                    Explore Now <RiMovieLine className="icon-movie" />
                  </p>
                </Link>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MoviesList;
