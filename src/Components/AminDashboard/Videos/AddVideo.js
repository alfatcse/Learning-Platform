import React, { useEffect, useState } from "react";
import logo from "../../../assets/image/learningportal.svg";
import "../../../style/output.css";
import moment from "moment";
import { usePostVideoMutation } from "../../../features/videos/videoAPI";
import { useNavigate } from "react-router";
const AddVideo = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [Views, setViews] = useState('');
  const [postVideo, { isSuccess }] = usePostVideoMutation('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sub");
    const d = {
      title: videoTitle,
      description,
      url,
      views: Views,
      duration,
      createdAt: moment().format(),
    };
    postVideo({ data: d });
    console.log(d);
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(isSuccess){
       navigate('/admin/videos')
    }
  },[isSuccess,navigate])
  return (
    <section className="py-9 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-2 lg:px-2">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Post Video Lesson
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                name="text"
                type="text"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Title"
              />
            </div>
          </div>
          {/* <div className="p-2 d-flex gap-2">
            <label >Assign To</label>
            <select  name="teamMember"
                id="lws-teamMember">
              <option className="login-input rounded-t-md rounded-b-md"> Submit Your Assignment on</option>
              <option className="login-input rounded-t-md rounded-b-md">b</option>
              <option className="login-input rounded-t-md rounded-b-md">c</option>
            </select>
          </div> */}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                name="text"
                type="text"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Video Url"
              />
            </div>
          </div>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="text"
                type="text"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Description"
              />
            </div>
          </div>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                name="text"
                type="number"
                step="0.1"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Duration"
              />
            </div>
          </div>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                name="text"
                type="text"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Views in K"
                value={Views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
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

export default AddVideo;
