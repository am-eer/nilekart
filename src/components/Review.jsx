import { formatDate } from "../lib/utils";
import Stars from "./Stars";

const Review = ({review}) => {
  return (
    <div className="review">
      <div className="review-title">
        <h3>{review.reviewerName}</h3>
        <p>{formatDate(review.date)}</p>
      </div>
      <Stars rating={review.rating} />
      <p>{review.comment}</p>
    </div>
  );
};

export default Review;