import React from "react";
import { Outlet } from "react-router";

import CoursePlayer from "./CoursePlayer/CoursePlayer";
import Leaderboard from "./Leaderboard/Leaderboard";
import Navbar from "./Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
