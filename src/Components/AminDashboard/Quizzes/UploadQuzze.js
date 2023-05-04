import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../../assets/image/learningportal.svg";
import { usePostQuizMarkMutation, usePostQuizMutation } from "../../../features/quizze/quizzeAPI";
import { useGetVideosQuery } from "../../../features/videos/videoAPI";
const UploadQuzze = () => {
  const { data: vdata, isLoading, isError } = useGetVideosQuery();
  const [postQuiz,{isSuccess}]=usePostQuizMutation()
  let content = vdata?.map((v) => <option value={v.id}>{v.title}</option>);
  const [video, setVideo] = useState();
  const [question,setQuestion]=useState('');
  const [addOption, setAddOption] = useState([{ option: "",isCorrect:true,id:0 }]);
  const handleAddOption = () => {
    let newfield = { option: "" };
    setAddOption([...addOption, newfield]);
  };
  const handleFormChange = (index, event) => {
    let data = [...addOption];
    data[index].option = event.target.value;
    setAddOption(data);
  };
  const handleFormChange1 = (index, event) => {
    let data = [...addOption];
    let Response = JSON.parse(event.target.value);
    data[index].isCorrect = Response;
    data[index].id = index;
    
    setAddOption(data);
  };
  console.log(addOption);
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = [...addOption];
    const v = vdata?.find((o) => o.id === video * 1);
    const data = {
        question,
        video_id:v.id,
        video_title:v.title,
        options
    };
    console.log("opp", data);
    postQuiz(data)
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(isSuccess){
        navigate('/admin/quizzes')
    }
  },[navigate,isSuccess])
  return (
    <section className="py-9 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-2 lg:px-2">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Post Quizzes According to Video Lesson
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="p-2 flex  ">
            <label>Assign To</label>
            <select
              style={{ color: "white" }}
              className="mx-8 login-input rounded-t-md rounded-b-md"
              onChange={(e) => setVideo(e.target.value)}
              required
            >
              <option value=''> Add Quizzes According to Video Lesson</option>
              {content}
            </select>
          </div>
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
                onChange={(e)=>setQuestion(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <button onClick={handleAddOption} className="btn ml-auto">
              Add Option
            </button>
          </div>
          {addOption.map((op, index) => {
            return (
              <div key={index} className="rounded-md shadow-sm -space-y-px ">
                <label for="assignmentlink" className="sr-only"></label>
                <input
                  name="text"
                  type="text"
                  required
                  className="login-input rounded-t-md rounded-b-md"
                  placeholder={`Option ${index + 1}`}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <select
                  style={{ color: "white" }}
                  type={Boolean}
                  required
                  className="mx-8 login-input rounded-t-md rounded-b-md "
                  onChange={(event) => handleFormChange1(index, event)}
                >
                  <option selected value=''> Select Answer</option>
                  <option> true</option>
                  <option> false</option>
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

export default UploadQuzze;
