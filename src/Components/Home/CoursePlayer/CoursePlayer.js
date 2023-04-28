import React from "react";
import CurrentVideo from "./CurrentVideo/CurrentVideo";
import AllVideos from "./RelatedVideos/RelatedVideos";

const CoursePlayer = () => {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <CurrentVideo></CurrentVideo>
          <AllVideos></AllVideos>
        </div>
      </div>
    </section>
  );
};

export default CoursePlayer;
