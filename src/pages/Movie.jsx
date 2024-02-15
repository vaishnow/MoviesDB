import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MoviesMain from "../components/MoviesMain";
import MoviesCrew from "../components/MoviesCrew";
import Videos from "../components/Videos";
import { discoverContent } from "../api/tmdb";
import "./Movie.css";
import "react-toastify/dist/ReactToastify.css";

function Movie({ content }) {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams("id");

  const getMovieDetails = async () => {
    let result = await discoverContent(
      `/${content}/${id}?language=en-US&append_to_response=credits,videos`
    );
    if (result.status === 200) {
      setMovieDetails(result.data);
    } else {
      console.log(result.response.data);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div className="mdb-page p-2 sm:p-4">
      <MoviesMain movieDetails={movieDetails} />
      <MoviesCrew crew={movieDetails.credits?.cast} title={"Actors"} />
      <MoviesCrew crew={movieDetails.credits?.crew} title={"Crew Members"} />
      <Videos videos={movieDetails.videos?.results} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        theme="dark"
      />
    </div>
  );
}

export default Movie;
