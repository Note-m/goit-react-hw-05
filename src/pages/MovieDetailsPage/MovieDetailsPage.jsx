import { useParams, useLocation, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const backLinkUrl = useRef(location.state ?? "/movie");
  console.log(backLinkUrl);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
              accept: "application/json",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchMovieDetails();
  }, [id]);
  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }
  return (
    <div className={css.container}>
      <Link to={backLinkUrl.current}>Go back</Link>

      <img
        className={css.img}
        src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
      />
      <h1>{movie.title}</h1>
      <p className={css.overview}>{movie.overview} </p>
      <p>{movie.vote_average}</p>
      <div className={css.linkContainer}>
        <Link className={css.link} to="cast">
          Cast
        </Link>
        <Link className={css.link} to="reviews">
          Reviews
        </Link>
      </div>
      <Suspense fallback={<p>Error</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
