// import { useState } from "react";
// import { useLocation, useSearchParams } from "react-router-dom";
// import MovieList from "../../components/MovieList/MovieList";
// import axios from "axios";
// import css from "./MoviesPage.module.css";

// const MoviePage = () => {
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(false);

//   const handleInpChange = (evt) => {
//     const value = evt.target.value;
//     setSearchQuery(value);
//     const params = new URLSearchParams(searchParams);
//     params.set("movie", value);
//     setSearchParams(params);
//   };

//   const handleBtnSubmit = async (evt) => {
//     evt.preventDefault();
//     if (searchQuery.trim() === "") return;

//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US`,
//         {
// headers: {
//   Authorization:
//     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
//   accept: "application/json",
//           },
//         }
//       );
//       setError(false);
//       setMovies(response.data.results);
//     } catch (error) {
//       setError(true);
//     }
//   };

//   return (
//     <>
//       {!error && (
//         <div className={css.error}>
//           <form onSubmit={handleBtnSubmit} className={css.container}>
//             <input
//               className={css.inp}
//               type="text"
//               name="searchMovie"
//               placeholder="Search some movie"
//               value={searchQuery}
//               onChange={handleInpChange}
//             />
//             <button className={css.btn} type="submit">
//               Search
//             </button>
//           </form>
//           <MovieList movies={movies} location={location} />
//         </div>
//       )}
//     </>
//   );
// };

// export default MoviePage;
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
  const [searched, setSearched] = useState(false);

  const handleInpChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const query = params.get("movie") || "";
    setSearchQuery(query);
  }, [searchParams]);

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
      if (movies.length === 0) {
        setSearched(true);
      }
      const params = new URLSearchParams(searchParams);
      params.set("movie", searchQuery);
      setSearchParams(params);
    } catch (error) {
      setError(true);
      // if (movies.length === 0 && searchQuery !== "") {
      //   return <p>No resalts for u request</p>;
      // }
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
              name="searchMovies"
              placeholder="Search some movie"
              value={searchQuery}
              onChange={handleInpChange}
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </form>
          {searched && movies.length === 0 && searchQuery !== "" && (
            <p>No resalts for u request</p>
          )}
          <MovieList movies={movies} location={location} />
        </div>
      )}
    </>
  );
};

export default MoviePage;
