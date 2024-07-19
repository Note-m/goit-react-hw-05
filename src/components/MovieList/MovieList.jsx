import css from "./MovieList.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const movieList = ({ movies }) => {
  const location = useLocation();
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
