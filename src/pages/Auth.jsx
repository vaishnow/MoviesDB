import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import { userLogin, userRegister } from "../api/moviesDB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generateUserSchema = (isLoginForm) => {
  return z.object({
    username: isLoginForm
      ? z.string().optional()
      : z
          .string()
          .min(3, { message: "Username must contain at least 3 characters" })
          .max(20, { message: "Username must contain at most 20 characters" }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
  });
};

function Auth({ registered }) {
  const schema = generateUserSchema(registered);
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const response = await userRegister(data);
    if (response.status === 200) {
      toast.success(`Registration Successful`);
      setTimeout(() => navigate("/user/login"), 2000);
      resetField("password");
    } else {
      toast.error(response.response.data.message || `Registration Failed`);
      reset();
    }
  };

  const handleLogin = async (data) => {
    const response = await userLogin(data);
    if (response.status === 200) {
      toast.success(`Login Successful`);
      sessionStorage.setItem("userdata", JSON.stringify(response.data.userdata));
      sessionStorage.setItem("token", response.data.token);
      // TODO : navigate to dashboard
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error(response.response.data.message || `Login Failed`);
      reset();
    }
  };

  return (
    <div className="mdb-page pb-28">
      <h5 className="flex flex-wrap max-w-full justify-center gap-3 text-center py-10 text-5xl font-medium">
        Welcome {registered && "back"} to
        <img src={logo} alt="MoviesDB" className="w-44" />
      </h5>

      <div className="rounded w-11/12 sm:w-96 p-4 bg-gray-100 dark:bg-mdb-sec-300 shadow-lg shadow-gray-400 dark:shadow-gray-900 mx-auto">
        <form
          onSubmit={handleSubmit((data) => {
            registered ? handleLogin(data) : handleRegister(data);
          })}
        >
          <div className="mb-5">
            <label htmlFor="email" className="block my-2 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="johndoe@email.com"
              autoComplete="email"
              className="rounded-md w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow sm:max-w-md bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
            />
            <p className="text-xs font-semibold mt-1 text-red-500">
              {errors.email?.message}
            </p>
          </div>
          {!registered && (
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block my-2 text-sm font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                id="username"
                placeholder="johndoe"
                autoComplete="username"
                className="rounded-md w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow sm:max-w-md bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
              />
              <p className="text-xs font-semibold mt-1 text-red-500">
                {errors.username?.message}
              </p>
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block my-2 text-sm font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              autoComplete={registered ? "current-password" : "new-password"}
              className="rounded-md w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow sm:max-w-md bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
            />
            <p className="text-xs font-semibold mt-1 text-red-500">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="btn w-full mt-4 bg-mdb-red text-white"
          >
            {registered ? "Login" : "Signup"}
          </button>
        </form>
      </div>
      <div className="mt-5 rounded w-11/12 sm:w-96 p-4 border border-black dark:border-white  shadow-lg shadow-gray-400 dark:shadow-gray-900 mx-auto text-center">
        {registered ? "New to MoviesDB?" : "Already a member?"}
        <Link
          to={registered ? "/user/register" : "/user/login"}
          className="font-extrabold px-2 py-3"
        >
          Sign {registered ? "up" : "in"}{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        theme="dark"
      />
    </div>
  );
}

export default Auth;
