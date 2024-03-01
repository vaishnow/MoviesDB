import { useEffect, useState } from "react";

const SearchPanel = ({ handleSearch }) => {
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const delayedSearch = setTimeout(() => handleSearch(searchItem), 1000);

    return () => clearTimeout(delayedSearch);
  }, [searchItem]);

  return (
    <div className="p-5 flex">
      <input
        type="text"
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search..."
        className="rounded-md w-full md:max-w-2xl mx-auto bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default SearchPanel;
