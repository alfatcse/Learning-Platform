import React from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import useAuthCheck from "./hooks/useAuthCheck";
import CoursePlayer from "./Components/Home/CoursePlayer/CoursePlayer";
import Home from "./Components/Home/Home";
import Leaderboard from "./Components/Home/Leaderboard/Leaderboard";
import StudentRegistration from "./Components/Registration/StudentRegistration";
import StudentLogin from "./Components/StudentLogin/StudentLogin";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import CurrentVideo from "./Components/Home/CoursePlayer/CurrentVideo/CurrentVideo";
import Quizzes from "./Components/Home/Quizzes/Quizzes";
import Assignment from "./Components/Home/CoursePlayer/CurrentVideo/Video/Assignment";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Dashboard from "./Components/AminDashboard/Dashboard";
import Admin from "./Components/Admin/Admin";
import VideosPage from "./Components/AminDashboard/Videos/VideosPage";
import QuizzesPage from "./Components/AminDashboard/Quizzes/QuizzesPage";
import AdminRoute from "./Utils/AdminRoute";
import AssignmentUpload from "./Components/AminDashboard/Assignment/AssignmentUpload/AssignmentUpload";
import AssignmentMark from "./Components/AminDashboard/Assignment/AssignmentMark/AssignmentMark";
import AddVideo from "./Components/AminDashboard/Videos/AddVideo";
import EditVideo from "./Components/AminDashboard/Videos/EditVideo";
import AddAssignment from "./Components/AminDashboard/Assignment/AssignmentUpload/AddAssignment";
import EditAssignment from "./Components/AminDashboard/Assignment/AssignmentUpload/EditAssignment";
import UploadQuzze from "./Components/AminDashboard/Quizzes/UploadQuzze";

function App() {
  const authChecked = useAuthCheck();
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
              <CoursePlayer></CoursePlayer>
            </PrivateRoute>
          ),
          children: [
            {
              path: "/home/:vedioId",
              element: (
                <PrivateRoute>
                  <CurrentVideo></CurrentVideo>
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "/home/quizzes/:quizzeid",
          element: (
            <PrivateRoute>
              <Quizzes></Quizzes>
            </PrivateRoute>
          ),
        },
        {
          path: "/home/assignment/:assignmentId",
          element: (
            <PrivateRoute>
              <Assignment></Assignment>
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
    {
      path: "/adminlogin",
      element: (
       
          <AdminLogin></AdminLogin>
        
      ),
    },
    {
      path: "/admin",
      element: <Admin></Admin>  ,
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard></Dashboard>,
        },
        {
          path: "/admin/videos",
          element: <VideosPage></VideosPage>,
        },
        {
          path: "/admin/quizzes",
          element: <QuizzesPage></QuizzesPage>,
        },
        {
          path:'/admin/uploadquizze',
          element:<UploadQuzze></UploadQuzze>
        },
        {
          path:"/admin/assignmentupload",
          element:<AssignmentUpload></AssignmentUpload>
        },
        {
          path:"/admin/editassignment/:assignmentid",
          element:<EditAssignment></EditAssignment>
        },
        {
          path:"/admin/assignmentpost",
          element:<AddAssignment></AddAssignment>
        },
        {
          path:"/admin/assignmentmark",
          element:<AssignmentMark></AssignmentMark>
        },
        {
          path:"/admin/addvideo",
          element:<AddVideo></AddVideo>
        },
        {
          path:"/admin/editvideo/:videoid",
          element:<EditVideo></EditVideo>
        }
      ],
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
