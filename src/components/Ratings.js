/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { BsGraphUp } from "react-icons/bs";
import { BsGraphDown } from "react-icons/bs";

const Ratings = ({ id, data }) => {
  const [imdbid, setImdbid] = useState("");

  const fetchDetails = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/external_ids`,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setImdbid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <>
      <div className="movie-score">
        <h4>IMBD : {data.vote_average}</h4>
        <Rating
          name="read-only"
          value={Math.floor(data.vote_average)}
          readOnly
          max={10}
        />
      </div>
      <div className="movie-score">
        <h4 className="pop">
          Popularity
          {data.popularity > 1000 ? (
            <BsGraphUp className="graph" />
          ) : (
            <BsGraphDown className="graph" />
          )}
        </h4>
      </div>
      {/* <div className="movie-score">
        <h4>Revieves</h4>
        <div className="ratings">
          <p>user</p>
          <p>critic</p>
        </div>
      </div> */}
      {/* <div className="movie-score">
        <h4>Director </h4>
        <p>name</p>
      </div> */}
      {/* <div className="movie-score">
        <h4>Stars</h4>
        <p>name</p>
      </div> */}
    </>
  );
};

export default Ratings;
