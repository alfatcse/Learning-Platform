import React from "react";
import { useGetVideosQuery } from "../../../features/videos/videoAPI";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import VideoInfo from "./VideoInfo";

const VideosPage = () => {
  const {
    data: Allvideo,
    isError: isAllVError,
    isLoading: AllVLoading,
    error: AllVError,
  } = useGetVideosQuery();
  
  let content = null;
  if (AllVLoading) {
    content = <Loading></Loading>;
  }
  if (isAllVError && !AllVLoading) {
    content = <Error message={"An Error Occurred"}></Error>;
  }
  let noVideo = null;
  if (!AllVLoading && !isAllVError && Allvideo?.length === 0) {
    noVideo = <h1>No video found</h1>;
  }
  if (!AllVLoading && !isAllVError && Allvideo?.length > 0) {
    content = Allvideo.map((allV) => <VideoInfo video={allV}></VideoInfo>);
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button className="btn ml-auto">Add Video</button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
          {noVideo && <div>No video found</div>}
        </div>
      </div>
    </section>
  );
};

export default VideosPage;
