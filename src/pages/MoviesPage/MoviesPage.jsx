import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import css from "./MoviesPage.module.css";

const MoviePage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const handleInpChange = (evt) => {
    setSearchQuery(evt.target.value);
  };

  const handleBtnSubmit = async (evt) => {
    evt.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
            accept: "application/json",
          },
        }
      );
      setError(false);
      setMovies(response.data.results);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      {!error && (
        <div className={css.error}>
          <form onSubmit={handleBtnSubmit} className={css.container}>
            <input
              className={css.inp}
              type="text"
              name="searchMovie"
              placeholder="Search some movie"
              value={searchQuery}
              onChange={handleInpChange}
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </form>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MoviePage;
