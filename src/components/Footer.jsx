import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  const footerAccLinks = [
    {
      path: "/user/register",
      desc: "Sign up",
    },
    {
      path: "/user/login",
      desc: "Sign in",
    },
  ];

  const footerSupportLinks = [
    {
      path: "",
      desc: "Contact",
    },
    {
      path: "",
      desc: "About",
    },
    {
      path: "",
      desc: "Terms of Use",
    },
    {
      path: "",
      desc: "Privacy Policy",
    },
  ];

  const footerContentLinks = [
    {
      path: "/movies",
      desc: "Movies",
    },
    {
      path: "tvshows",
      desc: "TV Shows",
    },
    {
      path: "",
      desc: "Popular",
    },
    {
      path: "",
      desc: "Top Rated",
    },
  ];
  const footerSocialMedia = [
    {
      path: "https://instagram.com",
      faIcon: faInstagram,
      label: "Instagram",
    },
    {
      path: "https://instagram.com",
      faIcon: faXTwitter,
      label: "Twitter",
    },
    {
      path: "https://instagram.com",
      faIcon: faLinkedin,
      label: "LinkedIn",
    },
    {
      path: "https://instagram.com",
      faIcon: faDiscord,
      label: "Discord",
    },
  ];

  /* Function for repeated Footer links */
  const FooterLists = ({ linksArray }) => {
    return linksArray.map((item, i) => (
      <li key={i}>
        <Link to={item.path} className="block p-2" rel="noopener noreferrer">
          {item.desc}
        </Link>
      </li>
    ));
  };

  /* Function for repeated Footer Social links */
  const FooterSocialIcons = ({ socialsArray }) => {
    return socialsArray.map((item, i) => (
      <Link
        to={item.path}
        key={i}
        target="_blank"
        className="py-2 h-12 fluid "
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className="block m-auto"
          icon={item.faIcon}
          aria-label={item.desc}
        />
      </Link>
    ));
  };

  return (
    <footer className="min-h-64 text-center sm:text-left grid sm:grid-cols-2 lg:grid-cols-4 p-4 dark:bg-mdb-dark dark:text-mdb-light">
      <div className="p-2">
        <ul>
          <FooterLists linksArray={footerAccLinks} />
        </ul>
      </div>
      <div className="p-2">
        <ul>
          <FooterLists linksArray={footerContentLinks} />
        </ul>
      </div>
      <div className="p-2">
        <ul>
          <FooterLists linksArray={footerSupportLinks} />
        </ul>
      </div>
      <div className="p-2">
        <label htmlFor="news-sub" className="text-nowrap">
          Subscribe to our newsletter
        </label>
        <div className="flex">
          <input
            type="text"
            autoComplete="email"
            id="news-sub"
            className="rounded-s-md w-full grow shadow-sm sm:max-w-md bg-transparent p-1.5 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="user123@email.com"
          />
          <button className="py-2 px-2 rounded-e-md bg-mdb-red text-white">
            Subscribe
          </button>
        </div>
        <div className="flex justify-between my-4 text-3xl">
          <FooterSocialIcons socialsArray={footerSocialMedia} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
