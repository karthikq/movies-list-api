/** @format */

import { useEffect, useState } from "react";
import "./css/App.css";
import axios from "axios";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ActionMovies from "./components/ActionMovies";
import { Select, MenuItem } from "@material-ui/core";
import { Movie } from "./components/Movie";
import Search from "./components/Search";
import Trending from "./components/Trending";
import { motion } from "framer-motion";
import Person from "./components/Person";
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function App() {
  const [data, setData] = useState([]);
  const [geners, setGeneres] = useState([]);
  const [selectedMovie, setSelectedMvovie] = useState();
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [navState, setNavState] = useState(true);
  const fetchdata = () => {
    const options = {
      method: "GET",
      url:
        " https://api.themoviedb.org/3/movie/now_playing?api_key=5e6a88364748be068a42f3d6e03e3535&language=en-US&page=1",
    };

    axios
      .request(options)
      .then(function (response) {
        setData(response.data.results);
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchGeners = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list?",
      params: {
        api_key: "5e6a88364748be068a42f3d6e03e3535",
        language: "en-US",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setGeneres(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    fetchGeners();
  }, []);
  function handleChange(e) {
    console.log(e.target.value);
    setSelectedMvovie(e.target.value);
    setState(true);
    setState2(!state2);
  }
  function handleNav() {
    setNavState(!navState);
  }
  return (
    <Router>
      <Switch>
        <div className="container">
          <div className="contents">
            <div className="nav-bar">
              <nav>
                <div className="brand-name">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <h2>
                      movie<span>mania</span>
                    </h2>
                  </Link>
                </div>

                <div className="icon-nav" onClick={handleNav}>
                  {navState ? (
                    <AiOutlineBars className="nav-icon" />
                  ) : (
                    <AiOutlineClose className="nav-icon" />
                  )}
                </div>

                <div
                  className={
                    navState ? " nav-items nav-bar-items-active" : "nav-items "
                  }>
                  <ul className="unorderd">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <li onClick={() => setNavState(true)}>Home</li>
                    </Link>

                    <Link to="/search" style={{ textDecoration: "none" }}>
                      <li onClick={() => setNavState(true)}>Search</li>
                    </Link>

                    <Link to="/trending" style={{ textDecoration: "none" }}>
                      <li onClick={() => setNavState(true)}>Movies List </li>
                    </Link>
                  </ul>
                </div>
              </nav>
            </div>
            <Route path="/" exact>
              <div className="movie-contents">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                  className="video-bg">
                  <iframe
                    title="video"
                    src="https://www.youtube.com/embed/odM92ap8_c0?controls=1&showinfo=0&autohide=1&rel=0&"
                    frameborder="0"
                    allowfullscreen></iframe>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="movie-catagories">
                  <div className="nav-bar-2">
                    <div className="nav">
                      <div className="movies-list">
                        <h3>Movies list</h3>
                      </div>
                      <div className="movies-main-cat">
                        <ul>
                          {!state && <li>Catagories</li>}

                          <Select
                            className="select"
                            value={selectedMovie}
                            onChange={handleChange}>
                            {geners.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <motion.div>
                    <ActionMovies id={selectedMovie} state={state2} />
                  </motion.div>
                </motion.div>
              </div>
            </Route>
            <Route path="/trending" exact>
              <Trending />
            </Route>
            <Route path="/movie/:id" exact>
              <Movie />
            </Route>
            <Route path="/search" exact>
              <Search />
            </Route>
            <Route path="/person/:id" exact>
              <Person />
            </Route>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
// rewind: true,
// perPage: 5,
// perMove: 1,
// gap: '0.8rem',
// easing: "linear",
// autoWidth: true,
// keyboard: true,
// focus: 'left',
// pagination: false,
// trimSpace: false,
