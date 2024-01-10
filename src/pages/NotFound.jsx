import React from "react";
import { useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  return (
    <div className="flex justify-center items-center h-96">
      <div className="h-64 text-center">
        <h1
          className="text-9xl font-
		bold mt-4"
        >
          Oops!
        </h1>
        <p className="text-2xl mt-3">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="mt-3">{error.statusText || error.message}</p>
      </div>
    </div>
  );
}

export default NotFound;
