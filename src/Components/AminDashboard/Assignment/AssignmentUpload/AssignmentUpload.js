import React from 'react';
import { useGetAllAssignmentQuery } from '../../../../features/assignment/assignmentAPI';
import SingleAssignment from './SingleAssignment';
import Loading from '../../../UI/Loading';
import Error from '../../../UI/Error';
const AssignmentUpload = () => {
    const {data,isLoading,isSuccess,isError}=useGetAllAssignmentQuery();
    let content;
    if(isLoading){
        content=<Loading></Loading>
    }
    if(!isLoading&&isError ){
        content=<Error message={'An Error Occurred'}></Error>
    }
    if(!isLoading && !isError && data?.length===0){
        content=<div>No Assignment Found</div>
    }
    if(!isLoading && !isError && data?.length>0){
        content=data.map((a)=><SingleAssignment assignment={a}></SingleAssignment>) 
    }
    console.log(data);
    return (
        <section class="py-6 bg-primary">
        <div class="mx-auto max-w-full px-5 lg:px-20">
            <div class="px-3 py-20 bg-opacity-10">
                <div class="w-full flex">
                    <button class="btn ml-auto">Add Assignment</button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th class="table-th">Title</th>
                                <th class="table-th">Video Title</th>
                                <th class="table-th">Mark</th>
                                <th class="table-th">Action</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-600/50">
                           {content}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    );
};

export default AssignmentUpload;