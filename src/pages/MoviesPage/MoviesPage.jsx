// import { useState, useEffect } from "react";
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
//   const [searched, setSearched] = useState(true);

//   const handleInpChange = (evt) => {
//     const value = evt.target.value;
//     setSearchQuery(value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       // const params = new URLSearchParams(searchParams);
//       // const query = params.get("movie") || "";

//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US`,
//           {
//             headers: {
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM2Mjg0NDJlZTVjM2NiNDg3NjkzNjBlNmYyMTc5MSIsIm5iZiI6MTcyMTE4NTgyNC4wMTM1MTQsInN1YiI6IjY2OTVkMzdiYWI3MmNmNTQ4YzQ4ZDhiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cr3vBS9F2X6D6hSi_DyCvlXD6A0vY9FxSPlSy8J4xfc",
//               accept: "application/json",
//             },
//           }
//         );

//         setError(false);
//         setMovies(response.data.results);
//         setSearched(false);
//       } catch (error) {
//         setSearched(true);
//         setError(true);
//       }
//     };

//     fetchData();
//   }, [searchParams]);

//   const handleBtnSubmit = (evt) => {
//     evt.preventDefault();
//     if (searchQuery.trim() === "") {
//       setSearched(false);
//       setMovies([]);
//       return;
//     }
//     const params = new URLSearchParams();
//     params.set("movie", searchQuery);
//     setSearchParams(params);
//   };

//   return (
//     <>
//       {!error && (
//         <div className={css.container}>
//           <form onSubmit={handleBtnSubmit} className={css.form}>
//             <input
//               className={css.input}
//               type="text"
//               name="searchMovies"
//               placeholder="Search some movie"
//               value={searchQuery}
//               onChange={handleInpChange}
//             />
//             <button className={css.btn} type="submit">
//               Search
//             </button>
//           </form>
//           {!searched && <p className={css.noResults}>No results</p>}
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

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === "") {
        setSearched(false);
        setMovies([]);
        return;
      }

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
        setSearched(response.data.results.length === 0);
      } catch (error) {
        setError(true);
        setMovies([]);
        setSearched(true);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleBtnSubmit = (evt) => {
    evt.preventDefault();
    const params = new URLSearchParams();
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
          {searched && <p className={css.noResults}>No results</p>}
          <MovieList movies={movies} location={location} />
        </div>
      )}
    </>
  );
};

export default MoviePage;
