import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import logo from "../../../assets/image/learningportal.svg";
import {
  useEditQuizMutation,
  useGetSingleQuizzeQuery,
} from "../../../features/quizze/quizzeAPI";
const EditQuizze = () => {
  const { idquizze } = useParams();
  const { data } = useGetSingleQuizzeQuery(idquizze);
  const [editQuiz, { isSuccess }] = useEditQuizMutation();
  const [question, setQuestion] = useState(data?.question);
  const [addOption, setAddOption] = useState(data?.options);
  console.log(idquizze, data);
  useEffect(() => {
    setQuestion(data?.question);
    setAddOption(data?.options);
  }, [data]);
  const handleFormChange = (index, event) => {
    const data = [...addOption];
    const d = { ...data[index] };
    d.option = event.target.value;
    data[index] = d;
    setAddOption(data);
  };
  const handleFormChange1 = (index, event) => {
    let data = [...addOption];
    let Response = JSON.parse(event.target.value);
    const d = { ...data[index] };
    d.isCorrect = Response;
    data[index] = d;
    setAddOption(data);
  };
  const handleAddOption = () => {
    let newfield = {id: addOption?.length};
    setAddOption([...addOption, newfield]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = [...addOption];
    const data1 = {
      question,
      video_id: data?.video_id,
      video_title: data?.video_title,
      options,
    };
    console.log("opp", data1);
    editQuiz({ id: idquizze, data: data1 });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {navigate("/admin/quizzes");}
  }, [isSuccess,navigate]);
  return (
    <section className="py-9 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-2 lg:px-2">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Quizzes According to Video Lesson
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="assignmentlink" className="sr-only"></label>
              <input
                name="option"
                type="text"
                required
                className="login-input rounded-t-md rounded-b-md"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <button onClick={handleAddOption} className="btn ml-auto">
              Add Option
            </button>
          </div>
          {addOption?.map((op, index) => {
            return (
              <div key={index} className="rounded-md shadow-sm -space-y-px ">
                <label for="assignmentlink" className="sr-only"></label>
                <input
                  name="text"
                  type="text"
                  required
                  className="login-input rounded-t-md rounded-b-md"
                  placeholder={`Option ${index + 1}`}
                  value={op.option}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <select
                  style={{ color: "white" }}
                  type={Boolean}
                  required
                  className="mx-8 login-input rounded-t-md rounded-b-md "
                  onChange={(event) => handleFormChange1(index, event)}
                >
                  
                  <option selected={op.isCorrect === true}> true</option>
                  <option selected={op.isCorrect === false}> false</option>
                </select>
              </div>
            );
          })}
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

export default EditQuizze;
