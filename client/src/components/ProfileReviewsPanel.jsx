import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserReviewsScore from "./UserReviewsScore";
import ProfileReviewCard from "./ProfileReviewCard";
import { useUserContext } from "../context/LoggedUserContext";
import { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";

export default function ProfileReviewsPanel({ reviews, user }) {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const { loggedUser, setLoggedUser } = useUserContext();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const handleReviewModalOpen = () => {
    if (loggedUser) {
      setOpenReviewModal(true);
      document.body.style.overflow = "hidden";
    } else {
      setError("You need to log in first");
    }
  };

  const handleReviewModalClose = () => {
    setOpenReviewModal(false);
    document.body.style.overflow = "auto";
  };
  const navigate = useNavigate();

  if (reviews.length === 0) {
    return (
      <div>
        <ReviewModal
          open={openReviewModal}
          closeButtonClick={() => handleReviewModalClose()}
          target={user.username}
          source={loggedUser}
        />

        <div className=" flex flex-row">
          <div className="grow text-lg text-text-white">
            The user has no reviews yet
          </div>
          {loggedUser === user.username ? null : (
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
              onClick={handleReviewModalOpen}
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <ReviewModal
        open={openReviewModal}
        closeButtonClick={() => handleReviewModalClose()}
        target={user.username}
        source={loggedUser}
      />
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
            onClick={handleReviewModalOpen}
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
    </div>
  );
}
