import React from 'react';

const MyPosition = ({Position}) => {
    console.log(Position);
    return (
        <tbody>
        <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{Position?.rank+1}</td>
            <td className="table-td text-center font-bold">{Position?.name}</td>
            <td className="table-td text-center font-bold">{Position?.QuizMark}</td>
            <td className="table-td text-center font-bold">{Position?.AssignmentMark}</td>
            <td className="table-td text-center font-bold">{Position?.total}</td>
        </tr>
    </tbody>
    );
};

export default MyPosition;