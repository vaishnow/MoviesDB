import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useContent from "../hooks/useContent";
import MoviesMain from "../components/MoviesMain";
import MoviesCrew from "../components/MoviesCrew";
import Videos from "../components/Videos";
import "./Movie.css";
import "react-toastify/dist/ReactToastify.css";
import ReviewPanel from "../components/ReviewPanel";

function Movie({ content }) {
  const { id } = useParams("id");
  const [movieDetails] = useContent(
    `/${content}/${id}?language=en-US&append_to_response=credits,videos`
  );

  return (
    <div className="mdb-page p-2 sm:p-4">
      <MoviesMain movieDetails={movieDetails} type={content} />
      <MoviesCrew crew={movieDetails.credits?.cast} title={"Actors"} />
      <MoviesCrew crew={movieDetails.credits?.crew} title={"Crew Members"} />
      {sessionStorage.getItem("token") && (
        <ReviewPanel type={content} tmdbId={id} />
      )}
      <Videos videos={movieDetails.videos?.results} />
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

export default Movie;
