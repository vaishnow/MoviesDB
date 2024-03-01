import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Header.css";
import { useUserDetail } from "../contexts/UserProvider";

function Header() {
  const [navExpanded, setNavExpanded] = useState(false);
  const {
    userDetails: { username },
  } = useUserDetail();
  const dashboardUser =
    username || JSON.parse(sessionStorage.getItem("userdata")).username;
  const isLoggedIn = sessionStorage.getItem("token");

  return (
    <nav
      className={
        (navExpanded
          ? "fixed w-3/4 h-full z-20 shadow-md shadow-slate-500"
          : "flex") +
        " md:flex justify-between font-semibold bg-mdb-light-100 dark:bg-mdb-dark dark:text-mdb-light"
      }
    >
      <div className=" md:hidden">
        <button
          className="btn my-1"
          onClick={() => setNavExpanded(!navExpanded)}
        >
          {navExpanded ? (
            /* Menu toggle collapse icon */
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Menu toggle expand icon */
            <svg
              className="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div className={(navExpanded ? "hidden " : "") + "mx-3 my-auto"}>
        <Link to="/">
          <img className="h-10" src={logo} />
        </Link>
      </div>
      <ul
        className={
          (navExpanded ? "" : "hidden ") +
          " grow md:flex md:justify-between md:max-w-96 mr-auto"
        }
      >
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {/* <li>
          <NavLink to="/movies">Explore</NavLink>
        </li> */}
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/tvshows">TVShows</NavLink>
        </li>
      </ul>
      <Link
        className={
          (navExpanded ? "hidden " : "") +
          "py-3 px-1 my-auto max-w-16 md:max-w-56 overflow-hidden text-ellipsis text-right"
        }
        to={isLoggedIn ? "/dashboard" : "/user/register"}
      >
        {isLoggedIn ? dashboardUser : " Sign up"}
      </Link>
    </nav>
  );
}

export default Header;
