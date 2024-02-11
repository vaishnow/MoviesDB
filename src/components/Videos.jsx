import React from "react";

const Videos = ({ videos }) => {
  return (
    videos?.length > 0 && (
      <>
        <h4 className="font-semibold text-2xl pb-0 p-5">Videos</h4>
        <div className="edl">
          {videos?.map((video) => (
            <div className="m-2" key={video.key}>
              <iframe
                className="rounded"
                width="560"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${video.key}?si=dUnqE3_wyom46WRo`}
                title="YouTube video player"
                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          ))}
        </div>
      </>
    )
  );
};

export default Videos;
