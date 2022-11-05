import { useNavigate } from "react-router-dom";
export default function ProfileReviewCard({ review }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-3 ">
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col justify-center w-1/12">
          <img
            src={process.env.PUBLIC_URL + "/userImage.png"}
            className="h-fit"
          ></img>
        </div>
        <div className="flex flex-col justify-center">
          <div
            className="text-text-white text-sm font-semibold hover:underline hover:cursor-pointer"
            onClick={() => navigate(`/user/${review.source}`)}
          >
            {review.source}
          </div>
          <div className="text-accent text-sm">({review.rate} / 5)</div>
        </div>
        <div className="flex flex-col justify-center text-text-light text-xs grow text-right">
          {review.date}
        </div>
      </div>
      <div className="text-text-white px-1">{review.message}</div>
    </div>
  );
}
