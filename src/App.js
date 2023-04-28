import React from "react";
import { Route, Router, RouterProvider, Routes } from "react-router";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./App.css";
import useAuthCheck from "./hooks/useAuthCheck";
import CoursePlayer from "./Components/Home/CoursePlayer/CoursePlayer";
import Home from "./Components/Home/Home";
import Leaderboard from "./Components/Home/Leaderboard/Leaderboard";
import StudentRegistration from "./Components/Registration/StudentRegistration";
import StudentLogin from "./Components/StudentLogin/StudentLogin";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";

function App() {
  const authChecked = useAuthCheck();
  console.log(authChecked);
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home></Home>,
      children: [
        {
          path: "/home/leaderboard",
          element: (
            <PrivateRoute>
              <Leaderboard></Leaderboard>
            </PrivateRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <PrivateRoute>
              {" "}
              <CoursePlayer></CoursePlayer>
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <PublicRoute>
          <StudentLogin></StudentLogin>
        </PublicRoute>
      ),
    },
    {
      path: "/registration",
      element: (
        <PublicRoute>
          <StudentRegistration></StudentRegistration>
        </PublicRoute>
      ),
    },
  ]);
  return (
    <div className="max-w-6xl mx-auto">
      {!authChecked ? (
        <div>Checking Authentication</div>
      ) : (
        <RouterProvider router={router}></RouterProvider>
      )}
    </div>
  );
}

export default App;
