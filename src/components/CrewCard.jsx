import React from "react";
import "./CrewCard.css";

const CrewCard = ({ member }) => {
  return (
    <div className="crew-card m-2">
      <img
        src={
          member.profile_path &&
          `https://image.tmdb.org/t/p/w400/${member.profile_path}`
        }
        alt=""
		loading="lazy"
      />
      <div
        className={
          (member.department ? "h-20 pt-6" : "h-16 pt-8") +
          " -translate-y-full rounded-b text-center text-nowrap text-ellipsis overflow-hidden bw-gradient"
        }
      >
        <span className="block">{member.name}</span>
        {member.department && (
          <span className="text-sm text-gray-400">{member.department}</span>
        )}
      </div>
    </div>
  );
};

export default CrewCard;
