import React, { Suspense, lazy } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LazyLoadPage from "./pages/LazyLoadPage";
const Home = lazy(() => import("./pages/Home"));
const MoviesList = lazy(() => import("./pages/MoviesList"));
const Movie = lazy(() => import("./pages/Movie"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={<LazyLoadPage />}>
        <Outlet />
      </Suspense>
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
            {
              path: "dashboard",
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
