import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import broken from "../assets/broken.png";
import "./MovieCard.css";

function MovieCard({ content, movie, genres }) {
  const [isLoading, setIsLoading] = useState(true);

  const { id, poster_path, vote_average } = movie;
  const title = movie.name || movie.title;
  const year = (movie.release_date || movie.first_air_date)?.slice(0, 4);

  const getRatingColor = () => {
    if (vote_average < 6) return "text-red-600";
    if (vote_average < 7) return "text-yellow-400";
    return "text-green-400";
  };

  const ratingColor = getRatingColor();

  return (
    <div className="movie-card bg-mdb-light-100 dark:bg-mdb-sec-300 w-full max-w-full max-h-48 object-cover snap-proximity rounded m-1">
      <Link
        className="flex h-full pe-2"
        to={`/${content == "tv" ? "tvshows" : "movies"}/${id}`}
      >
        {isLoading && (
          <Skeleton
            variant="rectangular"
            sx={{ aspectRatio: "11/16" }}
            height="100%"
          />
        )}

        <img
          onLoad={() => setIsLoading(false)}
          loading="lazy"
          className={(isLoading && "w-0 h-0") + " rounded-l object-cover"}
          src={
            !poster_path && !isLoading
              ? broken
              : `https://image.tmdb.org/t/p/w200${poster_path}`
          }
        />

        {vote_average && (
          <div className="relative w-0 right-9 top-1 ">
            <div
              className={
                "min-w-8 w-8 h-8 flex rounded-2xl bg-gray-400 dark:bg-gray-600 font-bold " +
                ratingColor
              }
            >
              <span className="m-auto text-shadow dark:text-shadow-white">
                {parseFloat(vote_average?.toFixed(2))}
              </span>
            </div>
          </div>
        )}
        <div className="w-full ps-2 h-full pt-3 overflow-hidden">
          <div className="movie-card-title text-base w-full font-semibold my-auto text-nowrap overflow-hidden text-ellipsis">
            {title}
          </div>
          <div className="text-sm my-2 text-gray-800 dark:text-gray-300">
            {year}
          </div>
          <div className="flex flex-wrap gap-y-2 gap-x-2 mt-2">
            {genres?.map((item) => (
              <div
                key={item.id}
                className="rounded-lg text-sm bg-purple-800 text-white px-1 pb-0.5 "
              >
                {item?.name}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
