import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  const [navExpanded, setNavExpanded] = useState(false);
  return (
    <nav
      className={
        (navExpanded ? " " : "flex") +
        " md:flex justify-between font-semibold dark:bg-mdb-dark dark:text-mdb-light"
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
        <a href="/"><img className="h-10" src={logo} /></a>
      </div>
      <ul
        className={
          (navExpanded ? "" : "hidden ") +
          " grow md:flex md:justify-between md:max-w-96 mr-auto"
        }
      >
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/movies">Explore</a>
        </li>
        <li>
          <a href="/movies">Movies</a>
        </li>
        <li>
          <a href="/tvshows">TVShows</a>
        </li>
      </ul>
      <a className={(navExpanded ? "hidden " : "") + "btn my-auto bg-"} href="">
        Sign up
      </a>
    </nav>
  );
}

export default Header;
