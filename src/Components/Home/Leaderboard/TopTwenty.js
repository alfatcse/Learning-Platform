import React from "react";

const TopTwenty = ({ mark }) => {
  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{mark?.rank + 1}</td>
      <td className="table-td text-center">{mark?.name}</td>
      <td className="table-td text-center">{mark?.QuizMark}</td>
      <td className="table-td text-center">{mark?.AssignmentMark}</td>
      <td className="table-td text-center">{mark?.total}</td>
    </tr>
  );
};

export default TopTwenty;
