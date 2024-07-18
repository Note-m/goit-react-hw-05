import css from "./MovieList.module.css";
import { Link } from "react-router-dom";

const movieList = ({ movies, location }) => {
  return (
    <div>
      {" "}
      <ul className={css.homeList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              className={css.movieName}
              to={`/movies/${movie.id}`}
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

export default movieList;
