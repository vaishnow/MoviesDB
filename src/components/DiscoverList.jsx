import { Link } from "react-router-dom";
import useContent from "../hooks/useContent";
import DiscoverCard from "./DiscoverCard";

function DiscoverList({ content }) {
  const [contentDetails] = useContent(content.api);

  return (
    <div className="px-5 md min-h-max">
      <div className="px-1 py-1 mt-32">
        <h6 className="text-center">{content.title}</h6>
      </div>
      <div className="edl snap-mandatory snap-x">
        {contentDetails.results?.map((item) => (
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
