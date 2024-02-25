import CircularProgressWithLabel from "./CircularProgressWithLabel";

const ReviewBox = ({ review }) => {
  return (
    <div className="overflow-hidden bg-mdb-sec-300 p-4 rounded">
      <div className="flex justify-between">
        <h1 className="font-semibold">{review.user[0].username}</h1>
        <CircularProgressWithLabel value={review.rating.overall * 10} />
      </div>
      <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
        {review.review}
      </p>
    </div>
  );
};

const Reviews = ({ reviews }) => {
  return (
    <div className="min-h-64 py-5 flex">
      <div className="my-auto w-full">
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {reviews?.slice(0, 3).map((review) => (
              <ReviewBox key={review.userId} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl">No Reviews have been added yet</h3>
            <h4 className="text-gray-400">Be the first one to review</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
