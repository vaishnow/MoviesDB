import MovieCard from "./MovieCard";

const UserList = ({ listname, listdata }) => {
  console.log("PUKE: listname = ", listdata); //DEBUG/Exposure
  return (
    <div className="h-dvh p-3 rounded bg-mdb-sec-100 overflow-y-scroll scroll-none">
      <div className="h-full my-4 ">
        <h1 className="font-semibold text-2xl mb-3">{listname}</h1>
        {listdata.map((item) => (
          <MovieCard
            genres={item?.list.genres}
            movie={{
              title: item.list.title,
              id: item.list.tmdbId,
              poster_path: item.list.poster_path,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
