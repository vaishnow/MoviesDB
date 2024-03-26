import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import "./DiscoverCard.css";

function DiscoverCard({ movie }) {
  const [isLoading, setIsLoading] = useState(true);

  const { id, poster_path, vote_average } = movie;
  const title = movie.first_air_date ? movie.name : movie.title;
  const type = movie.first_air_date ? "tvshows" : "movies";
  const ratingColor =
    vote_average < 6
      ? "text-red-600"
      : vote_average < 7
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="discover-card bg-gray-300 dark:bg-mdb-sec-300 h-80 md:h-96 object-cover snap-proximity rounded me-4">
      <Link to={`/${type}/${id}`}>
        {isLoading && (
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="100%"
          />
        )}
        {poster_path && (
          <img
            loading="lazy"
            className={(isLoading && "h-0 ") + "w-full rounded-t"}
            onLoad={() => setIsLoading(false)}
            src={`https://image.tmdb.org/t/p/w400${poster_path}`}
          />
        )}
      </Link>
      {!isLoading && (
        <div className="w-full px-2 py-0.5 flex items-center h-10 my-auto justify-between">
          <span className="text-sm font-semibold my-auto text-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
          <div
            className={
              "min-w-8 h-8 flex rounded-2xl bg-gray-400 dark:bg-gray-600 font-bold my-auto " +
              ratingColor
            }
          >
            <span className="m-auto text-shadow dark:text-shadow-white">
              {parseFloat(vote_average.toFixed(2))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscoverCard;
