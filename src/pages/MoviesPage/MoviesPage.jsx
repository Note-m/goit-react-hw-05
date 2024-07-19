import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import css from "./MoviesPage.module.css";

const MoviePage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [searched, setSearched] = useState(true);

  const handleInpChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(searchParams);
      const query = params.get("movie") || "";

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
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
        const params = new URLSearchParams(searchParams);
        params.set("movie", searchQuery);
        setSearchParams(params);
        if (!error) {
          setSearched(false);
        } else {
          setSearched(true);
        }
      } catch (error) {
        setMovies([]);

        setError(true);
      }
    };

    fetchData();
  }, [searchParams, searchQuery]);

  const handleBtnSubmit = (evt) => {
    evt.preventDefault();
    if (searchQuery.trim() === "") return;

    const params = new URLSearchParams(searchParams);
    params.set("movie", searchQuery);
    setSearchParams(params);
  };

  return (
    <>
      {!error && (
        <div className={css.container}>
          <form onSubmit={handleBtnSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              name="searchMovies"
              placeholder="Search some movie"
              value={searchQuery}
              onChange={handleInpChange}
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </form>
          {!searched && movies.length === 0 && (
            <p className={css.noResults}>No results</p>
          )}
          <MovieList movies={movies} location={location} />
        </div>
      )}
    </>
  );
};

export default MoviePage;
