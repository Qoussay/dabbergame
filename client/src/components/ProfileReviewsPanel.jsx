import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserReviewsScore from "./UserReviewsScore";
import ProfileReviewCard from "./ProfileReviewCard";
export default function ProfileReviewsPanel({ reviews, user }) {
  const navigate = useNavigate();
  if (reviews.length === 0) {
    return (
      <div className=" flex flex-row">
        <div className="grow text-lg text-text-white">
          The user has no reviews yet
        </div>
        <Button
          text="Add a review"
          bgColor="bg-accent"
          textColor="text-text-dark"
          icon={
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="text-text-dark pr-2"
            />
          }
          className="text-base py-2"
          onClick={() => navigate(`/user/${user.username}/reviews/add`)}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-4">
      <div className=" flex flex-row">
        <div className="flex flex-col grow text-lg text-text-white z-0">
          <UserReviewsScore username={user.username} />
          <div className="text-text-light">
            {reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}
          </div>
        </div>
        <Button
          text="Add a review"
          bgColor="bg-accent"
          textColor="text-text-dark"
          icon={
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="text-text-dark pr-2"
            />
          }
          className="text-base py-2"
          onClick={() => navigate(`/user/${user.username}/reviews/add`)}
        />
      </div>
      {reviews.map((review) => {
        return (
          <div>
            <ProfileReviewCard review={review} />
            <hr className=" my-4"></hr>
          </div>
        );
      })}
    </div>
  );
}
