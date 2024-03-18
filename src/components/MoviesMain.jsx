import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import {
  FaRegCirclePlay,
  FaBookmark,
  FaRegBookmark,
  FaHeart,
  FaRegHeart,
  FaDisplay,
} from "react-icons/fa6";
import { getContentStats, likeContent, saveContent } from "../api/moviesDB";
import "./MoviesMain.css";

const MoviesMain = ({ movieDetails, type }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    id,
    backdrop_path,
    poster_path,
    title,
    name,
    release_date,
    first_air_date,
    runtime,
    genres,
    overview,
  } = movieDetails;

  const handleAction = async (action, stateChange) => {
    if (sessionStorage.getItem("token")) {
      const result = await action();
      if (result.status === 200) {
        stateChange((prev) => !prev);
        toast.success(result.data.message);
      } else {
        toast.error(`Something went wrong`);
      }
    } else {
      toast.warn("Login to continue");
    }
  };

  const handleLike = () =>
    handleAction(() => likeContent(type, id, !isLiked), setIsLiked);
  const handleSave = () =>
    handleAction(() => saveContent(type, id, !isSaved), setIsSaved);

  const fetchStatus = async () => {
    const listCache = { poster_path, title: title || name, genres };
    const result = await getContentStats(type, id, listCache);
    if (result.status === 200) {
      setIsLiked(result.data.stats.liked);
      setIsSaved(result.data.stats.saved);
    } else {
      toast.error(`Something went wrong`);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") && id) {
      fetchStatus();
    }
  }, [movieDetails]);

  return (
    <div
      style={
        backdrop_path && {
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`,
        }
      }
      className="mbg bg-no-repeat bg-cover bg-center rounded-lg w-full"
    >
      <div className="mfg md:flex p-3 md:p-5 w-full max-w-full h-full rounded-lg shadow text-white">
        <div className="min-w-96 max-w-md mx-auto">
          {isLoading && (
            <Skeleton
              variant="rounded"
              animation="wave"
              height="90%"
              sx={{
                bgcolor: "grey.700",
                maxWidth: "100%",
                height: "90%",
                aspectRatio: "11/16",
              }}
            />
          )}
          <img
            src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
            onLoad={() => setIsLoading(false)}
            alt=""
            className={isLoading && "h-0" + " rounded w-full md:w-80"}
          />
          <div className="mt-4 flex justify-around text-2xl">
            <button onClick={handleLike}>
              {isLiked ? (
                <FaHeart className="movie-actions text-red-500" />
              ) : (
                <FaRegHeart className="movie-actions" />
              )}
            </button>
            <button onClick={handleSave}>
              {isSaved ? (
                <FaBookmark className="movie-actions text-yellow-400" />
              ) : (
                <FaRegBookmark className="movie-actions" />
              )}
            </button>
            <a href="#videos">
              <FaRegCirclePlay className="movie-actions" />
            </a>
            <button>
              <FaDisplay className="movie-actions" />
            </button>
          </div>

          <div></div>
        </div>
        <div className="md:px-4 text-center my-2 md:my-0 md:text-left w-full md:overflow-hidden">
          <p className="text-5xl font-semibold md:whitespace-nowrap lg:whitespace-normal md:text-4xl md:text-ellipsis md:overflow-hidden">
            {title || name}
          </p>
          <h6 className="text-3xl py-1 md:py-3">
            {(release_date || first_air_date)?.slice(0, 4)}
          </h6>
          {runtime && (
            <div>
              <span className="text-gray-400">Runtime : </span>
              {runtime} mins
            </div>
          )}
          <div className="flex flex-wrap py-2 md:py-4 justify-center md:justify-normal">
            {genres?.map((item) => (
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
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesMain;
