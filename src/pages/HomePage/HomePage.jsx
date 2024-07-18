import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import css from "./HomePage.module.css";

const HomePage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
              accept: "application/json",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        setError(true);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className={css.containe}>
      <h1 className={css.title}>Trend movies</h1>
      {error && <p>Error :{error.message}</p>}
      <ul className={css.homeList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              className={css.movieName}
              to={`/movie/${movie.id}`}
              state={location}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
