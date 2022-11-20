import Button from "../components/Button";
import ProfileListingsPanel from "../components/ProfileListingsPanel";
import ProfileReviewsPanel from "../components/ProfileReviewsPanel";
import UserReviewsScore from "../components/UserReviewsScore";
import { useEffect, useState } from "react";
import reviews from "../mock/reviews.json";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ProfilePage() {
  // what panel is being rendered/ true for listings and false for reviews
  const [panel, setPanel] = useState(true);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  //   get user
  const [userListings, setUserListings] = useState([]);
  const userReviews = reviews.filter((review) => review.target === username);

  useEffect(() => {
    axios
      .get(`/api/user/${username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/listings/user/${username}`)
      .then((res) => {
        setUserListings(res.data);
        console.log(userListings);
      })
      .catch((err) => {});
  }, [username]);

  const handleReviewBtn = () => {
    setPanel(false);
  };

  const handleListingsBtn = () => {
    setPanel(true);
  };

  //   check if username exists. It protects the routing
  if (!user) {
    return (
      <div className="text-center text-2xl text-text-white">
        This user does not exist.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full -mt-24 ">
      <img src={process.env.PUBLIC_URL + "/profileBg.png"}></img>
      <div className="flex flex-row space-x-4">
        {/* left panel  */}
        <div className="flex flex-col w-1/5">
          {/* user image  */}
          <img
            src={process.env.PUBLIC_URL + "/userImage.png"}
            className="-mt-16 mb-3 w-4/5 ml-2"
          ></img>
          {/* first name and last name  */}
          <div className=" text-text-white desktop:text-2xl laptop:text-xl">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-text-light desktop:text-xl laptop:text-base">
            {username}
          </div>
          <div className=" text-text-white desktop:text-xl laptop:text-lg py-3">
            {/* <UserReviewsScore userReviews={userReviews} /> */}
          </div>
          <div className="flex flex-col space-y-1">
            <div className=" text-text-light desktop:text-lg laptop:text-base">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-text-light pr-2"
              />
              {user.state}
            </div>
            <div className="text-text-medium desktop:text-lg laptop:text-base">
              Joined since {user.dateJoined.substring(0, 10)}
            </div>
          </div>
        </div>
        {/* right panel  */}
        <div className="flex flex-col w-[80%] space-y-4 py-4">
          <div className="flex flex-row">
            <Button
              text="Listings"
              textColor={panel ? "text-text-white" : "text-text-medium"}
              className={`text-lg py-2 ${
                panel ? "border-b-4 border-b-accent" : ""
              }`}
              onClick={handleListingsBtn}
            />
            <Button
              text="Reviews"
              textColor={!panel ? "text-text-white" : "text-text-medium"}
              className={`text-lg py-2 ${
                !panel ? "border-b-4 border-b-accent" : ""
              }`}
              onClick={handleReviewBtn}
            />
          </div>
          <div className="rounded-lg bg-bg-light h-[65vh] overscroll-auto overflow-y-scroll no-scrollbar p-4">
            {panel ? (
              <ProfileListingsPanel listings={userListings} />
            ) : (
              <ProfileReviewsPanel reviews={userReviews} user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
