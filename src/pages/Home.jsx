import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import DiscoverList from "../components/DiscoverList";
import "./Home.css";

function Home() {
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  const discoverMovies = {
    title: "Trending Movies",
    api: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    type: "movies",
  };

  const discoverTVShows = {
    title: "Popular TV Shows",
    api: `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
    type: "tvshows",
  };

  return (
    <div className="mdb-page">
      <section
        id="top"
        className="items-stretch grid grid-cols-1 lg:grid-cols-2 select-none"
      >
        <div className="p-5 md:p-16 flex flex-col justify-center">
          <h5 className="text-h5  py-2">DISCOVER YOUR FAVOURITE</h5>
          <h4 className="text-h4 leading-tight">MOVIES AND MORE</h4>
          <p>
            Find and rate your favourite movies and shows or just find new
            movies to watch, share your preferences with the world
          </p>
          <Link
            to="/"
            className="btn bg-mdb-red text-white w-32 font-bold my-5"
          >
            Explore →
          </Link>
        </div>
        <div className="intro-div min-h-96 py-10 max-h-screen">
          <div className="imc-container grid grid-cols-3 mx-10 lg:mx-10">
            <Link
              className="intro-movie-card overflow-hidden -rotate-12 hover:-rotate-12"
              to="/movies/24428"
            >
              {isLoading1 && (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ bgcolor: "grey.800" }}
                  height="100%"
                />
              )}
              <img
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => setIsLoading1(false)}
                src="https://image.tmdb.org/t/p/w400/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
              />
            </Link>

            <Link
              className="intro-movie-card overflow-hidden"
              to="/movies/27205"
            >
              {isLoading2 && (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ bgcolor: "grey.700" }}
                  height="100%"
                />
              )}
              <img
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => setIsLoading2(false)}
                src="https://image.tmdb.org/t/p/w400/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
              />
            </Link>

            <Link
              className="intro-movie-card overflow-hidden rotate-12 hover:rotate-12 translate-x-3 translate-y-0 md:translate-y-7"
              to="/movies/155"
            >
              {isLoading3 && (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ bgcolor: "gray" }}
                  height="100%"
                />
              )}
              <img
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => setIsLoading3(false)}
                src="https://image.tmdb.org/t/p/w400/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
              />
            </Link>
          </div>
        </div>
      </section>
      <section id="discover">
        <DiscoverList content={discoverMovies} />
      </section>
      <section id="discover">
        <DiscoverList content={discoverTVShows} />
      </section>
    </div>
  );
}

export default Home;
