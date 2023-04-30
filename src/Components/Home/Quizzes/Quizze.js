import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { quizzeCalculation } from "../../../features/quizze/quizzeSlice";
const Quizze = ({ quizze }) => {
  console.log(quizze);
  let content;
  const [OPclick,setOPClick]=useState(false);
  const dispatch=useDispatch();
  const  handleClick=({op,quizze})=>{
    console.log('click',op,quizze);
    if(op.isCorrect===true){
        dispatch(quizzeCalculation(true))
    }
    setOPClick(true)
  }
  content = quizze?.options?.map((op) => (
    <label >
      <input disabled={OPclick} onClick={()=>handleClick({op,quizze})} type="checkbox" />
      {op?.option}
    </label>
  ));

  return (
    <div className="quiz">
      <h4 className="question">{quizze?.question}</h4>
      <form className="quizOptions">{content}</form>
    </div>
  );
};

export default Quizze;
