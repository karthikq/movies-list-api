/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { RiMovieLine } from "react-icons/ri";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const MoviesList = ({ results, state }) => {
  function handleScroll() {
    scroll.scrollTo(0);
  }
  return (
    <SimpleBar className="trending-flex">
      {results.results &&
        results.results.map((result) => (
          <div className="trending-movies-box">
            <div className="trending-img">
              <img
                src={"https://image.tmdb.org/t/p/w185/" + result.poster_path}
                alt="ew"
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
                <p
                  className="black"
                  onClick={() => window.open("/movie/" + result.id, "_blank")}>
                  Explore Now <RiMovieLine className="icon-movie" />
                </p>
              )}
            </div>
          </div>
        ))}
    </SimpleBar>
  );
};

export default MoviesList;
