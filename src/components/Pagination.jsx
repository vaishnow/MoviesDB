import React from "react";

const Pagination = ({ currPage, pageUpdate, totalPages }) => {
  const lastPage = 500 <= totalPages ? 500 : totalPages;
  return (
    <>
      <div className="flex p-5">
        <div className="flex flex-wrap justify-around mx-auto">
          {/* Prev Page Button */}
          {currPage > 1 && (
            <button
              className="btn m-1 bg-mdb-light-100 dark:bg-mdb-sec-300"
              onClick={() => pageUpdate(currPage - 1)}
            >
              &lt;
            </button>
          )}
          {/* First Page Button */}
          {currPage > 2 && (
            <button
              className="btn m-1 bg-mdb-light-100 dark:bg-mdb-sec-300"
              onClick={() => pageUpdate(1)}
            >
              1
            </button>
          )}
          {/* Dots */}
          {currPage > 3 && <span className="btn">...</span>}
          {/* Current Page - 1 */}
          {currPage > 1 && (
            <button
              className="btn m-1 bg-mdb-light-100 dark:bg-mdb-sec-300"
              onClick={() => pageUpdate(currPage - 1)}
            >
              {currPage - 1}
            </button>
          )}
          {/* Current Page */}
          <button className="btn m-1 bg-mdb-red text-white">{currPage}</button>
          {/* Current Page + 1 */}
          {currPage < lastPage - 1 && (
            <button
              className="btn m-1 bg-mdb-light-100 dark:bg-mdb-sec-300"
              onClick={() => pageUpdate(currPage + 1)}
            >
              {currPage + 1}
            </button>
          )}
          {/* Dots */}
          {currPage < lastPage - 2 && <span className="btn">...</span>}
          {/* Last Page Button */}
          {currPage < lastPage && (
            <button
              className="btn m-1 bg-mdb-light-100 dark:bg-mdb-sec-300"
              onClick={() => pageUpdate(lastPage)}
            >
              {lastPage}
            </button>
          )}
          {/* Next Page Button */}
          {currPage < lastPage && (
            <button
              className="btn m-1 bg-mdb-light-100 dark:bg-mdb-sec-300"
              onClick={() => pageUpdate(currPage + 1)}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
