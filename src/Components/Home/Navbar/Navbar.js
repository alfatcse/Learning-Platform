import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "./image/learningportal.svg";
import { userLoggedOut } from "../../../features/auth/authSlice";
import "../../../style/output.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const url = window.location.pathname;
  const [Url, setUrl] = useState("");
  useEffect(() => {
    setUrl(url);
  }, [url]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to={'/home'}>
        <img className="h-10" src={logo} alt="logo" />
        </Link>
       
        <div className="flex items-center gap-3">
          {Url === "/home/leaderboard" ? <Link to={"/home"}>Courses</Link>:<Link to={"/home/leaderboard"}>Leaderboard</Link>}
          <h2 className="font-bold">{user?.name}</h2>
          <button
            onClick={handleLogOut}
            className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
