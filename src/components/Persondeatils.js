/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Persondeatils = ({ movies, state }) => {
  return (
    <>
      {movies.map((movie) => (
        <div className="person-movies-box">
          <div className="person-movies-img">
            {movie.poster_path ? (
              <Link to={"/movie/" + movie.id}>
                <img
                  src={"https://image.tmdb.org/t/p/w185/" + movie.poster_path}
                  alt=""
                />
              </Link>
            ) : (
              <Link to={"/movie/" + movie.id}>
                <img
                  src="https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg"
                  alt=""
                />
              </Link>
            )}
          </div>
          {state ? (
            <div className="movies-person-details">
              <h2>{movie.title}</h2>
              <p>As : {movie.character} </p>
            </div>
          ) : (
            <div className="movies-person-details">
              <h2>{movie.title}</h2>
              <p>Dept : {movie.department} </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Persondeatils;
