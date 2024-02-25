import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReviews } from "../api/moviesDB";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";

const ReviewPanel = ({ type, tmdbId }) => {
  const [mdbReviews, setMdbReviews] = useState([]);
  const [isReviewed, setIsReviewed] = useState(false);

  const getMdbReview = async () => {
    const result = await getReviews(type, tmdbId);
    if (result.status === 200) {
      setMdbReviews(result.data.reviews);
      setIsReviewed(result.data.reviewed);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getMdbReview();
  }, []);

  return (
    <section className="m-5">
      <h4 className="font-semibold text-2xl pb-0">Reviews</h4>
      <Reviews reviews={mdbReviews} />
      <ReviewForm type={type} tmdbId={tmdbId} updateFunc={getMdbReview} isReviewed={isReviewed} review={isReviewed?mdbReviews[0]:null}/>
    </section>
  );
};

export default ReviewPanel;
