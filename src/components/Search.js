/** @format */

import React, { useState } from "react";
import "../css/App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Lottie from "react-lottie";
import * as loader from "./34441-movie-clapboard.json";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "#ffffff",
    width: "100%",
    color: "white",
    borderRadius: "2px",
    opacity: 0.8,
    margin: "0 1rem",
  },
  input: {
    color: "white",
  },
};
const Search = (props) => {
  const [result, setResult] = useState([]);

  const [state, setState] = useState(false);

  const fetchSearch = (e) => {
    console.log(e.target.value);
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: e.target.value,
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        page: 1,

        language: "en-Us",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setResult(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { classes } = props;

  return (
    <div className="search-container">
      <div className="search-contents">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="search-form">
          {/* <form onSubmit={handleSubmit}>
            <label>Search Movies</label>
            <input
              type="text"
              name="input"
              value={input.input}
              onChange={handleChange}
              placeholder="Enter movie name"
              required
            />
            <button type="submit"> Search</button>
          </form> */}
          <div className="auto-complete">
            <Autocomplete
              options={result}
              className={classes.root}
              getOptionLabel={(options) => options.original_title}
              autoComplete
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={fetchSearch}
                  variant="filled"
                  InputLabelProps={{ className: "textfield_label" }}
                  label="Search Movies"
                />
              )}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="results">
          {result.length ? (
            result.map((item) => (
              <motion.div
                initial={state && { y: 100, opacity: 0 }}
                animate={state && { y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0 }}
                layout
                className="sreach-items">
                {item.poster_path ? (
                  <LazyLoad offset={100} height={200}>
                    <motion.img
                      src={
                        "https://image.tmdb.org/t/p/w185/" + item.poster_path
                      }
                      alt={
                        "https://image.tmdb.org/t/p/w185/" + item.poster_path
                      }
                    />
                  </LazyLoad>
                ) : (
                  <img
                    src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg"
                    alt="error"
                  />
                )}
                <div className="search-text">
                  <h2>{item.original_title}</h2>
                  <Link
                    className="tag"
                    style={{ textDecoration: "none" }}
                    to={"movie/" + item.id}>
                    <p>
                      <AiOutlinePlayCircle className="play-icon" /> Explore now
                    </p>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="search-empty">
              <h2>Search some of the Latest Movies</h2>
              <Lottie options={defaultOptions} height={100} width={100} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Search);
