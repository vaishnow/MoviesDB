import React, { useEffect } from "react";
import CrewCard from "./CrewCard";

const MoviesCrew = ({ crew, title }) => {

  return (
    <>
      <h4 className="font-semibold text-2xl pb-0 p-5">{title}</h4>
      <div className="edl mb-5">
        {crew?.map((member, i) => (
          <CrewCard key={i} member={member} />
        ))}
      </div>
    </>
  );
};

export default MoviesCrew;
