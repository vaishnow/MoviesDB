import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MoviesList from "./pages/MoviesList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Movie from "./pages/Movie";
import Auth from "./pages/Auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/user/login",
      element: <Auth registered />,
    },
    {
      path: "/user/register",
      element: <Auth />,
    },
    {
      path: "/movies",
      element: <MoviesList content="movie" />,
    },
    {
      path: "/movies/:id",
      element: <Movie content="movie" />,
    },
    {
      path: "/tvshows",
      element: <MoviesList content="tv" />,
    },
    {
      path: "/tvshows/:id",
      element: <Movie content="tv" />,
    },
  ]);
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
