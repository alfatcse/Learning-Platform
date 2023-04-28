import React from "react";
import { Route, Router, RouterProvider, Routes } from "react-router";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./App.css";
import CoursePlayer from "./Components/Home/CoursePlayer/CoursePlayer";

import Home from "./Components/Home/Home";
import Leaderboard from "./Components/Home/Leaderboard/Leaderboard";

import StudentRegistration from "./Components/Registration/StudentRegistration";
import StudentLogin from "./Components/StudentLogin/StudentLogin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home></Home>,
      children: [
        {
          path: "/home/leaderboard",
          element:<Leaderboard></Leaderboard>
        },
        {
          path:"/home",
          element:<CoursePlayer></CoursePlayer>
        }
      ],
    },
    {
      path: "/",
      element: <StudentLogin></StudentLogin>,
    },
    {
      path: "/registration",
      element: <StudentRegistration></StudentRegistration>,
    },
  ]);
  return (
    <div className="max-w-6xl mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
