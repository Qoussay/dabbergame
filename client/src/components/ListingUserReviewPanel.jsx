import { useNavigate } from "react-router-dom";
export default function ListingUserReviewPanel({ review }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row space-x-2">
      <div className="flex flex-col justify-start w-1/6">
        <img
          src={process.env.PUBLIC_URL + "/userImage.png"}
          className="h-fit"
        ></img>
      </div>
      <div className="flex flex-col grow w-5/6 justify-center">
        {/* first row of name rate and date  */}
        <div className="flex flex-row space-x-1">
          <div
            className="text-accent text-sm font-semibold hover:cursor-pointer hover:underline"
            onClick={() => navigate(`/user/${review.source}`)}
          >
            {review.source}
          </div>
          <div className="text-text-white text-sm">({review.rate})</div>
          <div className="text-text-medium text-xs grow text-right">
            {review.date}
          </div>
        </div>
        <div className="text-text-white">{review.message}</div>
      </div>
    </div>
  );
}
