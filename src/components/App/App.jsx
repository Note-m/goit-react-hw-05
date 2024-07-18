// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation";
// import HomePage from "../../pages/HomePage/HomePage";
// import MovieList from "../MovieList/MovieList";
// import MoviePage from "../../pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
// import NotFound from "../../pages/NotFound/NotFound";
// import MovieCast from "../MovieCast/MovieCast";
// import MovieReviews from "../MovieReviews/MovieReviews";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviePage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>load</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};
export default App;
