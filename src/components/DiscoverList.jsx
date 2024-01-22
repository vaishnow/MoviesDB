import React, { useEffect, useState } from "react";
import DiscoverCard from "./DiscoverCard";
import { discoverContent } from "../api/tmdb";
import { Link } from "react-router-dom";

function DiscoverList({ content }) {
  const [exploreContent, setExploreContent] = useState([]);

  const getExploreContent = async () => {
    const result = await discoverContent(content.api);
    if (result.status === 200) {
      setExploreContent(result.data.results);
    } else {
      console.log(result.response.data);
    }
  };

  useEffect(() => {
    getExploreContent();
  }, []);

  return (
    <div className="px-5 md min-h-max">
      <div className="px-1 py-1 mt-32">
        <h6 className="text-center">{content.title}</h6>
      </div>
      <div className="edl py-5 flex overflow-x-scroll snap-mandatory snap-x">
        {exploreContent?.map((item) => (
          <DiscoverCard key={item.id} movie={item} />
        ))}
      </div>
      <div className="mx-auto text-center py-5 w-52 font-bold">
        <Link
          to={"/" + content.type}
          className="w-full px-3 py-1 rounded text-2xl bg-gray-300 dark:bg-gray-800"
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
}

export default DiscoverList;
