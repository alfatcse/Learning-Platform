import React from "react";
import { useSelector } from "react-redux";
import {
  useGetassignmentMarkQuery,
  useGetquizzeMarkQuery,
  useGetStudentsQuery,
} from "../../../features/leaderboard/leaderboardAPI";
import MyPosition from "./MyPosition";
import TopTwenty from "./TopTwenty";
const Leaderboard = () => {
  const { assimentMark } = useSelector((state) => state.leaderboard) || {};
  const { quizzeMark } = useSelector((state) => state.leaderboard) || {};
  const { user } = useSelector((state) => state.auth) || {};
  const { isLoading: ALoading, isError } = useGetquizzeMarkQuery();
  const { isLoading: QLoading, isError: QError } = useGetassignmentMarkQuery();
  const { data: students, isLoading: SLoading } = useGetStudentsQuery();
  let topTwenty = [];
  if (!ALoading && !QLoading && !SLoading) {
    students.map((student) => {
      assimentMark.map((AMark) => {
        if (student.id === AMark.student_id && AMark.status === "published") {
          if (topTwenty?.length === 0) {
            const d = {
              name: student.name,
              AssignmentMark: AMark.mark,
            };
            topTwenty.push(d);
          } else {
            let f = 0;
            topTwenty.map((t) => {
              if (t.name === student.name) {
                t.AssignmentMark = t.AssignmentMark + AMark.mark;
                f = 1;
              }
            });
            if (f === 0) {
              console.log(student.name);
              const d = {
                name: student.name,
                AssignmentMark: AMark.mark,
              };
              topTwenty.push(d);
            }
          }
        }
      });
      quizzeMark.map((QMark) => {
        if (student.id === QMark.student_id) {
          if (topTwenty?.length === 0) {
            const d = {
              name: student.name,
              QuizMark: QMark.mark,
            };
            topTwenty.push(d);
          } else {
            let f = 0;
            topTwenty.map((t) => {
              if (t.name === student.name) {
                if (t.QuizMark) {
                  t.QuizMark = t.QuizMark + QMark.mark;
                } else {
                  t.QuizMark = QMark.mark;
                }
                f = 1;
              }
            });
            if (f === 0) {
              console.log(student.name);
              const d = {
                name: student.name,
                QuizMark: QMark.mark,
              };
              topTwenty.push(d);
            }
          }
        }
      });
    });
  }
  topTwenty.map((p) => {
    p.total = p.AssignmentMark + p.QuizMark;
  });
  topTwenty = topTwenty.sort(function (a, b) {
    return parseFloat(b.total) - parseFloat(a.total);
  });
  topTwenty.map((p) => {
    p.rank = topTwenty.findIndex((x) => x.name === p.name);
  });
  console.log("top", topTwenty);
  let content = topTwenty.map((t) => <TopTwenty mark={t}></TopTwenty>);
  let myPosition;
  topTwenty.map((my) => {
    if (my.name === user.name) {
      myPosition = my;
    }
  });
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
            <MyPosition Position={myPosition}></MyPosition>
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
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
