import { useState } from "react";
import { Avatar } from "@mui/material";
import "./CrewCard.css";

const CrewCard = ({ member }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="crew-card m-2 overflow-hidden">
      {isLoading && (
        <Avatar variant="rounded" sx={{ width: "100%", height: "100%" }} />
      )}
      {member.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w400/${member.profile_path}`}
          alt=""
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          className={isLoading ? "w-0 h-0" : "w-full h-full"}
        />
      )}
      <div className="h-28 py-6 -translate-y-20 rounded-b text-center text-nowrap text-ellipsis overflow-hidden bw-gradient">
        <span className="block font-semibold">{member.name}</span>
        <span className="text-sm text-gray-400">
          {member.character || member.department}
        </span>
      </div>
    </div>
  );
};

export default CrewCard;
