import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { discoverContent } from "../api/tmdb";

function Movie({ content }) {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams("id");

  const getMovieDetails = async () => {
    let result = await discoverContent(`/${content}/${id}?language=en-US`);
    if (result.status === 200) {
      setMovieDetails(result.data);
      console.log(result.data);
    } else {
      console.log(result.response.data);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div className="mdb-page p-2 sm:p-4">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})`,
        }}
        className="mbg bg-no-repeat bg-cover bg-center rounded-lg w-full"
      >
        <div className="mfg sm:flex p-3 sm:p-5 w-full max-w-full h-full rounded-lg shadow text-white">
          <img
            src={`https://image.tmdb.org/t/p/w400//${movieDetails.poster_path}`}
            alt=""
            className="rounded w-full sm:w-80"
          />
          <div className="sm:px-4 text-center my-2 sm:my-0 sm:text-left w-full sm:overflow-hidden">
            <p className="text-5xl font-semibold sm:whitespace-nowrap md:whitespace-normal sm:text-4xl sm:text-ellipsis sm:overflow-hidden">
              {movieDetails.title || movieDetails.name}
            </p>
            <h6 className="text-3xl py-1 md:py-3">
              {(
                movieDetails.release_date || movieDetails.first_air_date
              )?.slice(0, 4)}
            </h6>
            {movieDetails.runtime && (
              <div>
                <span className="text-gray-400">Runtime : </span>
                {movieDetails.runtime} mins
              </div>
            )}
            <div className="flex flex-wrap py-2 md:py-4 justify-center sm:justify-normal">
              {movieDetails.genres?.map((item) => (
                <div
                  key={item.id}
                  className="rounded me-2 mb-2 px-1 font-semibold py-0.5 bg-purple-800"
                >
                  {item.name}
                </div>
              ))}
            </div>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
