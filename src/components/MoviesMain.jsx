import React from "react";
import {
  FaRegCirclePlay,
  FaBookmark,
  FaRegBookmark,
  FaHeart,
  FaRegHeart,
  FaDisplay,
} from "react-icons/fa6";
import "./MoviesMain.css";

const MoviesMain = ({ movieDetails }) => {
  return (
    <div
      style={
        movieDetails.backdrop_path && {
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})`,
        }
      }
      className="mbg bg-no-repeat bg-cover bg-center rounded-lg w-full"
    >
      <div className="mfg md:flex p-3 md:p-5 w-full max-w-full h-full rounded-lg shadow text-white">
        <div className="min-w-fit max-w-md mx-auto">
          <img
            src={
              movieDetails.poster_path &&
              `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
            }
            alt=""
            className="rounded w-full md:w-80"
          />
          <div className="mt-4 flex justify-around text-2xl">
            <button onClick={() => console.log("like")}>
              {true ? (
                <FaHeart className="movie-actions text-red-500" />
              ) : (
                <FaRegHeart className="movie-actions" />
              )}
            </button>
            <button onClick={() => console.log("like")}>
              {true ? (
                <FaBookmark className="movie-actions text-yellow-400" />
              ) : (
                <FaRegBookmark className="movie-actions" />
              )}
            </button>
            <button>
              <FaRegCirclePlay className="movie-actions" />
            </button>
            <button>
              <FaDisplay className="movie-actions" />
            </button>
          </div>

          <div></div>
        </div>
        <div className="md:px-4 text-center my-2 md:my-0 md:text-left w-full md:overflow-hidden">
          <p className="text-5xl font-semibold md:whitespace-nowrap lg:whitespace-normal md:text-4xl md:text-ellipsis md:overflow-hidden">
            {movieDetails.title || movieDetails.name}
          </p>
          <h6 className="text-3xl py-1 md:py-3">
            {(movieDetails.release_date || movieDetails.first_air_date)?.slice(
              0,
              4
            )}
          </h6>
          {movieDetails.runtime && (
            <div>
              <span className="text-gray-400">Runtime : </span>
              {movieDetails.runtime} mins
            </div>
          )}
          <div className="flex flex-wrap py-2 md:py-4 justify-center md:justify-normal">
            {movieDetails.genres?.map((item) => (
              <div
                key={item.id}
                className="rounded me-2 mb-2 px-1 font-semibold py-0.5 bg-purple-800"
              >
                {item.name}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-xl text-gray-500">Overview</h4>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesMain;
