import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
              accept: "application/json",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError(true);
      }
    };
    fetchMovies();
  }, [movieId]);
  return (
    <div>
      {reviews.length > 0 && !error ? (
        <ul className={css.revList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={css.autName}>
                Author: <span className={css.autNamed}>{review.author}</span>{" "}
              </p>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews for this movie</p>
      )}
    </div>
  );
};

export default MovieReviews;
