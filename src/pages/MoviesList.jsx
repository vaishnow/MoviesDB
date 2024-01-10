import React, { useEffect, useState } from "react";
import { discoverContent } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function MoviesList({ content }) {
  const apiPrefix =
    content == "movie"
      ? `/discover/movie?include_adult=false&include_video=false&language=en-US&`
      : `/discover/tv?include_null_first_air_dates=false&include_adult=false&language=en-US&`;

  const [sort, setSort] = useState({ by: "popularity", order: "desc" });
  const [api, setApi] = useState(
    `${apiPrefix}page=1&sort_by=${sort.by}.${sort.order}`
  );
  const [contentList, setContentList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const getContent = async (sort) => {
    let result = await discoverContent(api);
    if (result.status === 200) {
      setContentList(result.data.results);
    } else {
      alert(result.response.data);
    }
  };

  const getGenres = async () => {
    let result = await discoverContent(`/genre/${content}/list`);
    if (result.status === 200) {
      setGenreList(result.data.genres);
    } else {
      alert(result.response.data);
    }
  };

  useEffect(() => {
    getContent();
  }, [sort]);

  useEffect(() => {
    getGenres();
  }, []);
  return (
    <section className="mdb-page">
      <div className="text-5xl text-center p-5">
        {content === "movie" ? "Movies" : "TV Shows"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 p-4">
        {contentList?.map((item) => {
          let gList = item.genre_ids?.map((gid) =>
            genreList?.find((genre) => gid === genre.id)
          );
          return (
            <MovieCard
              key={item.id}
              content={content}
              movie={item}
              genres={gList}
            />
          );
        })}
      </div>
      {/* <div className="flex p-5">
        <div className="flex flex-wrap justify-around mx-auto">
          <button className="btn m-1 bg-mdb-sec-300">&lt;&lt;</button>
          <button className="btn m-1 bg-mdb-sec-300">&lt;</button>
          <button className="btn m-1 bg-mdb-sec-300">1</button>
          <button className="btn m-1 bg-mdb-sec-300">1</button>
          <button className="btn m-1 bg-mdb-sec-300">1</button>
          <button className="btn m-1 bg-mdb-sec-300">1</button>
          <button className="btn m-1 bg-mdb-sec-300">&gt;</button>
          <button className="btn m-1 bg-mdb-sec-300">&gt;&gt;</button> 
        </div>
      </div> */}
    </section>
  );
}

export default MoviesList;
