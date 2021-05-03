/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import Persondeatils from "./Persondeatils";

const Person = () => {
  const [movies, setMovies] = useState([]);
  const [crew, setCrew] = useState([]);
  const [details, setDetails] = useState({});
  const { id } = useParams();
  console.log(id);

  const fetchDetails = () => {
    const options = {
      method: "get",
      url: `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setMovies(res.data.cast);
        setCrew(res.data.crew);
      })
      .catch((error) => console.log(error));
  };

  const fetchPersonDeatils = () => {
    const options = {
      method: "get",
      url: "https://api.themoviedb.org/3/person/" + id,
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchDetails();
    fetchPersonDeatils();
    scroll.scrollTo(0);
  }, []);

  return (
    <div className="person-container">
      <div className="person-contents">
        <div className="person-details">
          <div className="person-img">
            <img
              src={"https://image.tmdb.org/t/p/w185/" + details.profile_path}
              alt=""
            />
          </div>
          <div className="person-dettails">
            <h2>{details.name}</h2>
            <p>{details.birthday}</p>
          </div>
        </div>
        <div className="person-movies">
          <Persondeatils movies={movies} state={true} />
        </div>
        <div className="person-movies">
          <Persondeatils movies={crew} state={false} />
        </div>
      </div>
    </div>
  );
};

export default Person;
