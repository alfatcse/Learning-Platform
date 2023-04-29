import React from 'react';
import { useParams } from 'react-router';
import { useGetQuizzesQuery } from '../../../features/quizze/quizzeAPI';
import Error from '../../UI/Error';
import Loading from '../../UI/Loading';
import Quizze from './Quizze';

const Quizzes = () => {
    const { quizzeid } = useParams();
    console.log('iii',quizzeid);
    const {data,isError,isLoading,error} =useGetQuizzesQuery(quizzeid);
    let content=null,Vediotitle;
    if(isLoading){
        content=<Loading></Loading>
    }
    if(isError&&!isLoading){
        content=<Error message={'An Error Occurred'}></Error>
    }
    if(!isError&&!isLoading&&data?.length===0){
        content=<div>No Quizze Found </div>
    }
    if(!isError&&!isLoading&&data?.length>0){
        Vediotitle=data[0].video_title
        content=data.map((d)=><Quizze quizze={d}></Quizze>)
    }
    console.log(data);
    return (
        <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for {Vediotitle}
            </h1>
            <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
          </div>
          <div className="space-y-8 ">
          {content}
          </div>
          <button
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
        </div>
      </section>
    );
};

export default Quizzes;