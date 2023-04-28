import React from "react";
import { useGetVideosQuery } from "../../../../features/videos/videoAPI";
import SingleRelatedVideo from "./SingleRelatedVideo";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
const AllVideos = () => {
  const { data: video, isError, isLoading, error } = useGetVideosQuery();
  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Error message={"An Error Occurred"}></Error>;
  }
  if (!isError && !isLoading && video?.length === 0) {
    content = <Error message={"No Video Found"}></Error>;
  }
  if (!isError && !isLoading && video?.length > 0) {
    content = video.map((video) => <SingleRelatedVideo video={video}></SingleRelatedVideo>);
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default AllVideos;
