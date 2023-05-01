import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import logo from "../../../../../assets/image/learningportal.svg";
import { useSelector } from "react-redux";
import {
  useGetAssignmentQuery,
  usePostAssignmentMutation,
} from "../../../../../features/assignment/assignmentAPI";
import moment from "moment";
const Assignment = () => {
  const { assignmentId } = useParams();
  const {
    data: assignment,
    isError,
    isLoading,
    error,
  } = useGetAssignmentQuery(assignmentId);
  const [postAssignment, { isLoading: submitLoading, isSuccess }] =
    usePostAssignmentMutation();
  const [assignmentLink, setAssignment] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = {
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignment?.id,
      title: assignment?.title,
      createdAt: moment().format(),
      totalMark: assignment?.totalMark,
      mark: 0,
      repo_link: assignmentLink,
      status: "pending",
    };
    console.log(d);
    postAssignment(d);
    console.log(isSuccess);
  };
  useEffect(() => {
    setAssignment("");
    console.log(isSuccess);
    if (isSuccess) {
      navigate(`/home/${assignmentId}`);
    }
  }, [isSuccess, navigate, assignmentId]);
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Submit Your Assignment on
          </h2>
          <h2 className="mt-6 text-center text-xl font-extrabold text-slate-100">
            {assignment?.title}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                onChange={(e) => setAssignment(e.target.value)}
                id="assignmentlink"
                name="text"
                type="text"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Github Link"
                value={assignmentLink}
              />
            </div>
          </div>
          <div>
            <button
              disabled={isLoading || submitLoading}
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

export default Assignment;
