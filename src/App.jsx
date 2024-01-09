import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MoviesList from "./pages/MoviesList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Movie from "./pages/Movie";
import Auth from "./pages/Auth";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Outlet />,
          errorElement: <NotFound />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "user",
              children: [
                {
                  path: "login",
                  element: <Auth registered />,
                },
                {
                  path: "register",
                  element: <Auth />,
                },
              ],
            },
            {
              path: "movies",
                  element: <MoviesList content="movie" />,
              
            },
            {
              path: "movies/:id",
              element: <Movie content="movie" />,
            },
            {
              path: "tvshows",
              element: <MoviesList content="tv" />,
            },
            {
              path: "tvshows/:id",
              element: <Movie content="tv" />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
