import React, { useEffect, useState } from "react";
import logo from "../../../../assets/image/learningportal.svg";
import { useNavigate, useParams } from "react-router";
import {
  useEditAssignmentsMutation,
  useGetAssignmentQuery,
} from "../../../../features/assignment/assignmentAPI";
const EditAssignment = () => {
  const { assignmentid } = useParams();
  const { data } = useGetAssignmentQuery(assignmentid);
  const [title, setTitle] = useState(data?.title);
  const [totalmark, settotalmark] = useState(data?.totalMark);
  const [editAssignments, { isSuccess }] = useEditAssignmentsMutation();
  useEffect(() => {
    setTitle(data?.title);
    settotalmark(data?.totalMark);
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = {
      title,
      totalMark: totalmark * 1,
    };
    editAssignments({ id: assignmentid, data: d });
    setTitle("");
    settotalmark("");
    console.log("data", d);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignmentupload");
    }
  }, [isSuccess, navigate]);
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

export default EditAssignment;
