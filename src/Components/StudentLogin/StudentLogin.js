import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../features/auth/authApi";
import Error from "../UI/Error";
import Loading from "../UI/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { data, isLoading, error: responseError, isSuccess }] =
    useLoginMutation();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const c = true;
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    }
    if (data?.accessToken && data?.user && isSuccess) {
      navigate("/home");
    }
  }, [responseError, navigate, data, isSuccess]);
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" className="sr-only">
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
                className="input-group"
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type={showPassword === true ? `text` : `password`}
                  autocomplete="current-password"
                  required
                  className="login-input rounded-b-md"
                  placeholder="Password"
                />
                <button
                  // style={{ position: "absolute", top: "13%", right: "1%" }}
                  type="button"
                  className="input input-bordered"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword === false ? faEyeSlash : faEye}
                    className="eye-icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to={"/registration"}
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Create New Account
              </Link>
            </div>
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
          {responseError && <Error message={error}></Error>}
          {isLoading && <Loading></Loading>}
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
