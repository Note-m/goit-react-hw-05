import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
              accept: "application/json",
            },
          }
        );
        setMovies(response.data.cast);
      } catch (error) {
        setError(true);
      }
    };
    fetchMovies();
  }, [movieId]);
  return (
    <div>
      {error && <p>Error :{error.message}</p>}
      <ul className={css.castList}>
        {movies.map((movie) => (
          <li className={css.castItem} key={movie.id}>
            <img
              className={css.castImage}
              src={`https://image.tmdb.org/t/p/w200${movie.profile_path}`}
              alt=""
            />
            <p className={css.name}>{movie.original_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
