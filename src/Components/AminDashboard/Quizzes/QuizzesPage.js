import React from 'react';
import { useNavigate } from 'react-router';
import { useGetAllQuizzesQuery } from '../../../features/quizze/quizzeAPI';
import Error from '../../UI/Error';
import Loading from '../../UI/Loading';
import SingleQuizzePage from './SingleQuizzePage';

const QuizzesPage = () => {
    const {data,isLoading,isSuccess,isError}=useGetAllQuizzesQuery();
    let content;
    if(isLoading){
        content=<Loading></Loading>
    }
    if(!isLoading&&isError){
        content=<Error message={'An Error Occurred'}></Error>
    }
    if(!isError&&!isLoading&&data?.length===0){
        content=<div>No Data Found</div>
    }
    if(!isError&&!isLoading&&data?.length>0){
        content=data.map((q)=><SingleQuizzePage quizze={q}></SingleQuizzePage>)
    }
    const navigate=useNavigate();
    const handleAdd=()=>{
        console.log('add');
        navigate('/admin/uploadquizze')
    }
    return (
        <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <div className="w-full flex">
                    <button onClick={handleAdd} className="btn ml-auto">Add Quiz</button>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th className="table-th">Question</th>
                                <th className="table-th">Video</th>
                                <th className="table-th justify-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-600/50">
                            {content}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    );
};

export default QuizzesPage;