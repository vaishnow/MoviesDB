import { Suspense, lazy } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LazyLoadPage from "./pages/LazyLoadPage";
import ThemeSwitchProvider from "./contexts/ThemeSwitchProvider";
import UserProvider from "./contexts/UserProvider";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/Header"));
const MoviesList = lazy(() => import("./pages/MoviesList"));
const Movie = lazy(() => import("./pages/Movie"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Footer = lazy(() => import("./components/Footer"));

function Layout() {
  return (
    <>
      <UserProvider>
        <ThemeSwitchProvider>
          <Header />
          <Suspense fallback={<LazyLoadPage />}>
            <Outlet />
          </Suspense>
          <Footer />
        </ThemeSwitchProvider>
      </UserProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        theme="dark"
      />
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
