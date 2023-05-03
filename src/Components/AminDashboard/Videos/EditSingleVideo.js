import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useEditVideoMutation } from '../../../features/videos/videoAPI';

const EditSingleVideo = ({video}) => {
    console.log('vvvv',video);
    const [videoTitle, setVideoTitle] = useState(video?.title);
    const [url, setUrl] = useState(video?.url);
    const [description, setDescription] = useState(video?.description);
    const [duration, setDuration] = useState(video?.duration);
    const [Views, setViews] = useState(video?.views);
    const [editVideo, { isSuccess }] = useEditVideoMutation();
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
        editVideo({ id: video?.id, data: d });
        console.log(d);
      };
      const navigate = useNavigate();
      useEffect(() => {
        if (isSuccess) {
          navigate("/admin/videos");
        }
      }, [isSuccess, navigate]);
    return (
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
            {/* <div className="p-2 flex  ">
              <label>Assign To</label>
              <select
                style={{ color: "white" }}
                className="mx-8 login-input rounded-t-md rounded-b-md"
              >
                <option> Submit Your Assignment on</option>
                <option>b</option>
                <option>c</option>
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
    );
};

export default EditSingleVideo;