import React, { useState } from 'react';
import moment from 'moment';
import { useEditAssignmentMutation } from '../../../../features/assignment/assignmentAPI';
const SingleAssignmentMark = ({assignmentMark}) => {
    console.log(assignmentMark);
    const [editAssignment]=useEditAssignmentMutation()
    const [assignmentM,setassignmentM]=useState(0);
    const handleSubmit=()=>{
        if(assignmentM<=100){
            const d={
                assignment_id:assignmentMark?.assignment_id,
                createdAt:assignmentMark?.createdAt,
                repo_link:assignmentMark?.repo_link,
                status:'published',
                student_id:assignmentMark?.student_id,
                student_name:assignmentMark?.student_name,
                mark:assignmentM*1,
                totalMark:assignmentMark?.totalMark,
                title:assignmentMark?.title
            }
            console.log(d);
            editAssignment({id:assignmentMark?.id,data:d})
        } 
    }
    return (
        <tr>
            <td class="table-td">{assignmentMark?.title}</td>
            <td class="table-td">{ moment(assignmentMark?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td class="table-td">{assignmentMark?.student_name}</td>
            <td class="table-td">{assignmentMark?.repo_link}</td>
            {
                assignmentMark?.status==='published'?<td class="table-td">{assignmentMark?.mark}</td>:<td class="table-td input-mark">
                <input max="100"  value={assignmentM} onChange={(e)=>setassignmentM(e.target.value)}/>
                <svg onClick={handleSubmit} fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                    class="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </td>
            }
        </tr> 
    );
};

export default SingleAssignmentMark;