import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetassignmentMarkQuery,
  useGetquizzeMarkQuery,
  useGetStudentsQuery,
} from "../../../features/leaderboard/leaderboardAPI";
import { getTopPosition } from "../../../features/leaderboard/leaderboardSlice";
import MyPosition from "./MyPosition";
import TopTwenty from "./TopTwenty";
const Leaderboard = () => {
  const { assimentMark } = useSelector((state) => state.leaderboard) || {};
  const { quizzeMark } = useSelector((state) => state.leaderboard) || {};
  const { user } = useSelector((state) => state.auth) || {};
  const { isLoading: ALoading, isError } = useGetquizzeMarkQuery();
  const { isLoading: QLoading, isError: QError } = useGetassignmentMarkQuery();
  const { data: students, isLoading: SLoading } = useGetStudentsQuery();
  console.log(students);
  console.log(assimentMark, user);
  const topTwenty = [];
  if (!ALoading && !QLoading && !SLoading) {
    students.map((student) => {
      assimentMark.map((AMark) => {
        if(student.id===AMark.student_id&&AMark.status==='published'){
            if(topTwenty?.length===0){
                const d={
                    name:student.name,
                    AssignmentMark:AMark.mark,
                }
                topTwenty.push(d)
            }
            else{
                let f=0;
                topTwenty.map((t)=>{
                    if(t.name===student.name){
                        t.AssignmentMark=t.AssignmentMark+AMark.mark
                        f=1
                    }
                })
                if(f===0){
                    console.log(student.name);
                    const d={
                        name:student.name,
                        AssignmentMark:AMark.mark,
                    }
                    topTwenty.push(d)
                }
            }
        }
      });
      quizzeMark.map((QMark)=>{
         if(student.id===QMark.student_id){
            if(topTwenty?.length===0){
                const d={
                    name:student.name,
                    QuizMark:QMark.mark,
                }
                topTwenty.push(d)
            }else{
                let f=0;
                topTwenty.map((t)=>{
                    if(t.name===student.name){
                        if(t.QuizMark){
                            t.QuizMark=t.QuizMark+QMark.mark
                        }
                        else{
                            t.QuizMark=QMark.mark
                        }
                        f=1
                    }
                })
                if(f===0){
                    console.log(student.name);
                    const d={
                        name:student.name,
                        QuizMark:QMark.mark,
                    }
                    topTwenty.push(d)
                }
            }
         }
      })
    });
  }
  console.log('top',topTwenty);
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <MyPosition></MyPosition>
          </table>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              <TopTwenty></TopTwenty>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
