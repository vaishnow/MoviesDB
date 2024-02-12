import React from "react";

const Videos = ({ videos }) => {
  return (
    videos?.length > 0 && (
      <section id="videos">
        <h4 className="font-semibold text-2xl pb-0 p-5">Videos</h4>
        <div className="edl">
          {videos?.map((video) => (
            <div className="m-2" key={video.key}>
              <iframe
                loading="lazy"
                className="rounded"
                width="560"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          ))}
        </div>
      </section>
    )
  );
};

export default Videos;
