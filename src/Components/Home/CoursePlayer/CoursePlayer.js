import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import CurrentVideo from "./CurrentVideo/CurrentVideo";
import AllVideos from "./RelatedVideos/RelatedVideos";

const CoursePlayer = () => {
  const url = window.location.pathname;
  const [Url, setUrl] = useState("");
  useEffect(() => {
    setUrl(url);
  }, [url]);
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          {
            Url==='/home'?<CurrentVideo></CurrentVideo>: <Outlet></Outlet>
          }
          <AllVideos></AllVideos>
        </div>
      </div>
    </section>
  );
};

export default CoursePlayer;
