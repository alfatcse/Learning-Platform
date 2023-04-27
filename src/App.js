import React from "react";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import StudentRegistration from "./Components/Registration/StudentRegistration";
import StudentLogin from "./Components/StudentLogin/StudentLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<StudentRegistration></StudentRegistration>}></Route>
        <Route path="/login" element={<StudentLogin></StudentLogin>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
