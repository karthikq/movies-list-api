/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/App.css";
import { withStyles } from "@material-ui/core/styles";
import MoviesList from "./MoviesList";
import Pagination from "@material-ui/lab/Pagination";
import Videobg from "./Videobg";

const styles = {
  root: {
    background: "transparent",
    width: "100%",
    color: "white",

    padding: "0 0rem",
  },
};

const Trending = (props) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [toprated, setToprated] = useState([]);
  const [topratedpage, setTopratedPage] = useState(1);
  const [nowPlaying, setNowplaying] = useState([]);
  const [nowPlayingpage, setNowplayingPage] = useState(1);

  const fetchMoviesList = () => {
    axios
      .request({
        url: "https://api.themoviedb.org/3/movie/upcoming",
        method: "GET",
        params: {
          api_key: "5e6a88364748be068a42f3d6e03e3535",
          language: "en-US",
          page: page,
        },
      })
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  console.log(page);
  useEffect(() => {
    fetchMoviesList();
  }, [page]);
  const { classes } = props;
  const fetchTopRated = () => {
    axios
      .request({
        url: "https://api.themoviedb.org/3/movie/top_rated",
        method: "GET",
        params: {
          api_key: "5e6a88364748be068a42f3d6e03e3535",
          language: "en-US",
          page: topratedpage,
        },
      })
      .then((res) => {
        console.log(res.data);
        setToprated(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTopRated();
  }, [topratedpage]);

  const fetchNowPlaying = () => {
    axios
      .request({
        url: "https://api.themoviedb.org/3/movie/now_playing",
        method: "GET",
        params: {
          api_key: "5e6a88364748be068a42f3d6e03e3535",
          language: "en-US",
          page: nowPlayingpage,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNowplaying(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNowPlaying();
  }, [nowPlayingpage]);

  return (
    <div className="trending-container">
      <div className="trending-contents">
        <div className="trending-video">
          <Videobg />
        </div>
        <div className="trending-page-bg">
          <div className="trending-movies-list">
            <div className="trenidng-items">
              <h2>Upcoming Movies</h2>
              <Pagination
                count={results.total_pages}
                defaultPage={1}
                onChange={(e, value) => setPage(value)}></Pagination>
            </div>
            <MoviesList results={results} />
          </div>
          <div className="trending-movies-list">
            <div className="trenidng-items">
              <h2>Top Rated Movies</h2>
              <Pagination
                className={classes.root}
                count={results.total_pages}
                defaultPage={1}
                onChange={(e, value) => setTopratedPage(value)}></Pagination>
            </div>
            <MoviesList results={toprated} />
          </div>
          <div className="trending-movies-list">
            <div className="trenidng-items">
              <h2>Now Playing</h2>
              <Pagination
                count={results.total_pages}
                defaultPage={1}
                onChange={(e, value) => setNowplayingPage(value)}></Pagination>
            </div>
            <MoviesList results={nowPlaying} state={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Trending);
