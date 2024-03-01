import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useContent from "../hooks/useContent";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchPanel from "./SearchPanel";

function MoviesList({ content }) {
  const [filterParams, setFilterParams] = useSearchParams({ page: 1 });
  const [sort, setSort] = useState({ by: "popularity", order: "desc" });

  const apiPrefix = {
    movie: `/discover/movie?include_adult=false&include_video=false&language=en-US&`,
    tvshow: `/discover/tv?include_null_first_air_dates=false&include_adult=false&language=en-US&`,
  };
  const api = `${content == "movie" ? apiPrefix.movie : apiPrefix.tvshow}page=${
    filterParams.get("page") || 1
  }&sort_by=${sort.by}.${sort.order}`;
  let type = content;

  const [contentList, getContentList, setContentEndpoint] = useContent(api);
  const [genreList, getGenreList] = useContent(`/genre/${content}/list`);

  const updatePage = (page) => {
    setFilterParams({ page: page });
  };

  const searchContent=(query)=>{
    setContentEndpoint(`/search/${content}?query=${query}`)
  }

  useEffect(() => {
    if (type != content) {
      getGenreList();
      getContentList();
      setFilterParams({ page: 1 });
      type = content;
    } else {
      getContentList();
    }
  }, [content, filterParams]);

  return (
    <section className="mdb-page">
      <div className="text-5xl text-center p-5">
        {content === "movie" ? "Movies" : "TV Shows"}
      </div>
      <SearchPanel handleSearch={searchContent}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 p-4 min-h-96">
        {contentList.results?.map((item) => {
          let gList = genreList.genres?.filter((genre) =>
            item.genre_ids.includes(genre.id)
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
      <Pagination
        currPage={parseInt(filterParams.get("page")) || 1}
        totalPages={500}
        pageUpdate={updatePage}
      />
    </section>
  );
}

export default MoviesList;
