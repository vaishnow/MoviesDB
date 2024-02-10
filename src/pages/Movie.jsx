import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoviesMain from "../components/MoviesMain";
import { discoverContent } from "../api/tmdb";
import "./Movie.css";

function Movie({ content }) {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams("id");

  const getMovieDetails = async () => {
    let result = await discoverContent(`/${content}/${id}?language=en-US`);
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
    </div>
  );
}

export default Movie;
