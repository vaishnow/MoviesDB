import DiscoverList from "../components/DiscoverList";

function Home() {
  const discoverMovies = {
    title: "Trending Movies",
    api: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    viewmore: "/movies",
  };

  const discoverTVShows = {
    title: "Popular TV Shows",
    api: `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
    viewmore: "/tvshows",
  };

  return (
    <div className="mdb-page">
      <section
        id="top"
        className="items-stretch grid grid-cols-1 xl:grid-cols-2 select-none"
      >
        <div className="intro-div  p-5 md:p-16 flex flex-col justify-center">
          <h5 className="text-h5  py-2">DISCOVER YOUR FAVOURITE</h5>
          <h4 className="text-h4 leading-tight">MOVIES AND MORE</h4>
          <p>
            Find and rate your favourite movies and shows or just find new
            movies to watch, share your preferences with the world
          </p>
          <a href="" className="btn bg-mdb-red text-white w-32 font-bold my-5">
            Explore →
          </a>
        </div>
        <div className=" intro-div min-h-96 py-10  max-h-screen">
          <div className="imc-container grid grid-cols-3 mx-10 lg:mx-10">
            <a
              className="intro-movie-card  -rotate-12 hover:-rotate-12"
              href=""
            >
              <img
                className="w-full h-full  object-cover rounded-lg"
                src="https://image.tmdb.org/t/p/w400/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
              />
            </a>

            <a className="intro-movie-card" href="">
              <img
                className="w-full h-full  object-cover rounded-lg"
                src="https://image.tmdb.org/t/p/w400/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
              />
            </a>

            <a
              className="intro-movie-card rotate-12 hover:rotate-12 translate-x-3 translate-y-0 md:translate-y-7"
              href=""
            >
              <img
                className="w-full h-full  object-cover rounded-lg"
                src="https://image.tmdb.org/t/p/w400/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
              />
            </a>
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
