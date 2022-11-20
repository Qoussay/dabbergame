import StarRatingComponent from "react-star-rating-component";
export default function UserReviewsScore({ userReviews }) {
  if (userReviews.length === 0) {
    return (
      <div className="desktop:text-lg laptop:text-base text-accent">
        No reviews yet.
      </div>
    );
  } else {
    let totalScore = 0;
    userReviews.map((review) => (totalScore += review.rate));
    totalScore = Number((totalScore / userReviews.length).toFixed(1));
    return (
      <div className="flex flex-row space-x-3">
        <StarRatingComponent
          name="userRating"
          editing={false}
          starCount={5}
          value={totalScore}
          starColor="#47DDC2" /* color of selected icons, default `#ffb400` */
          emptyStarColor="#9CB3BF"
        />
        <div className="text-text-white">({totalScore})</div>
      </div>
    );
  }
}
