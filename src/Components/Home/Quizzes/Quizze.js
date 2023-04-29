import React from "react";

const Quizze = ({ quizze }) => {
  console.log(quizze);
  let content;
  content = quizze?.options.map((op) => (
    <label for="option1_q1">
      <input type="checkbox" id="option1_q1" />{op?.option}
    </label>
  ));
  return (
    <div className="quiz">
      <h4 className="question">{quizze?.question}</h4>
      <form className="quizOptions">
       {content}
      </form>
    </div>
  );
};

export default Quizze;
