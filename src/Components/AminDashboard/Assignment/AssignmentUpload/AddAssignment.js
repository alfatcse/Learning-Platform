import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../../../assets/image/learningportal.svg";
import { usePostAssignmentsMutation } from "../../../../features/assignment/assignmentAPI";
import { useGetVideosQuery } from "../../../../features/videos/videoAPI";
const AddAssignment = () => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState();
  const [totalmark,settotalmark]=useState('');
  const { data:vdata, isLoading, isError } = useGetVideosQuery();
  const [postAssignments,{isSuccess}]=usePostAssignmentsMutation()
  let content = vdata?.map((v) => <option value={v.id}>{v.title}</option>);
  console.log(vdata, content);
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vdata?.find((o) => o.id === video * 1);
    const d = {
        title,
        video_id:v.id,
        video_title:v.title,
        totalMark:totalmark*1
    };
    console.log(d);
    postAssignments(d)
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(isSuccess){
        navigate('/admin/assignmentupload')
    }
  },[isSuccess,navigate])
  return (
    <section className="py-9 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-2 lg:px-2">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Upload Assignment According to Lesson
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                name="text"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Title"
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                name="text"
                type="number"
                max={100}
                value={totalmark}
                onChange={(e) => settotalmark(e.target.value)}
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Total Mark"
              />
            </div>
          </div>
          <div className="p-2 flex  ">
            <label>Assign To</label>
            <select
              style={{ color: "white" }}
              className="mx-8 login-input rounded-t-md rounded-b-md"
              onChange={(e) => setVideo(e.target.value)}
              required
            >
              <option value=''> Submit Your Assignment on</option>
              {content}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAssignment;
