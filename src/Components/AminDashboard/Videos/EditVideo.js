import React from "react";
import logo from "../../../assets/image/learningportal.svg";
import { useParams } from "react-router";
import { useGetVideoQuery } from "../../../features/videos/videoAPI";
import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import EditSingleVideo from "./EditSingleVideo";
const EditVideo = () => {
  const { videoid } = useParams();
  const { data, isLoading, isError } = useGetVideoQuery(videoid);
  console.log('edit',data);
  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Error message={"An Error occurred"}></Error>;
  }
  if (!isError && !isLoading && data?.id) {
    content = <EditSingleVideo video={data}></EditSingleVideo>;
  }
  return (
    <section className="py-9 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-2 lg:px-2">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Video Lesson
          </h2>
        </div>
        {content}
      </div>
    </section>
  );
};

export default EditVideo;
