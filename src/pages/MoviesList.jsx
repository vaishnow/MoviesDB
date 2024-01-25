import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { discoverContent } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

function MoviesList({ content }) {
  const [filterParams, setFilterParams] = useSearchParams({ page: 1 });
  const [contentList, setContentList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [totalPages, setTotalPages] = useState(500);
  const [sort, setSort] = useState({ by: "popularity", order: "desc" });

  const apiPrefix = {
    movie: `/discover/movie?include_adult=false&include_video=false&language=en-US&`,
    tvshow: `/discover/tv?include_null_first_air_dates=false&include_adult=false&language=en-US&`,
  };
  const api = `${
    content == "movie" ? apiPrefix.movie : apiPrefix.tvshow
  }page=${filterParams.get("page")}&sort_by=${sort.by}.${sort.order}`;

  const getContent = async (sort) => {
    let result = await discoverContent(api);
    if (result.status === 200) {
      setContentList(result.data.results);
      setTotalPages(result.data.total_pages);
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

  const updatePage = (page) => {
    setFilterParams({ page: page });
  };

  useEffect(() => {
    getGenres();
    getContent(sort);
  }, [content]);

  useEffect(() => {
    getContent(sort);
  }, [filterParams]);

  useEffect(() => {
    getGenres();
    getContent(sort);
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
      <Pagination
        currPage={parseInt(filterParams.get("page")) || 1}
        totalPages={totalPages}
        pageUpdate={updatePage}
      />
    </section>
  );
}

export default MoviesList;
