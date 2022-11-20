// When you get to this pageXOffset, search the listing via ID
import { useParams, useNavigate } from "react-router-dom";
import PlatformBanner from "../components/PlatformBanner";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListingUserReviewPanel from "../components/ListingUserReviewPanel";
import {
  faMessage,
  faSquarePlus,
  faFlag,
  faArrowRightArrowLeft,
  faTruck,
  faPenToSquare,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Pill from "../components/Pill";

import SectionTitle from "../components/SectionTitle";
import GameCover from "../components/GameCover";
import { useState, useEffect } from "react";
import UserReviewsScore from "../components/UserReviewsScore";
import axios from "axios";
import { useUserContext } from "../context/LoggedUserContext";
import ReviewModal from "../components/ReviewModal";
import CustomAlert from "../components/CustomAlert";

export default function ListingPage() {
  //review Modal
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const { listingId } = useParams();
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useUserContext();

  const [error, setError] = useState(null);

  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const [listing, setListing] = useState({
    user: "",
    state: "",
    gameName: "",
    coverURL: "",
    platform: "",
    price: "",
    condition: "",
    paymentMethod: "",
    delivery: "",
    trade: "",
    description: "",
  });

  const [reviewsIsMore, setReviewsIsMore] = useState(false);
  const [showingReviews, setShowingReviews] = useState([]);

  // const userReviews = reviews.filter(
  //   (review) => review.target === listing.user
  // );

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`/api/listings/${listingId}`).catch((err) => {
        console.log(err);
      });

      setListing(res.data);
    }

    getData();

    axios
      .get(`/api/reviews/user/${listing.user}`)
      .then((res) => {
        setUserReviews(res.data);
      })
      .catch((err) => {});

    setShowingReviews([...userReviews.slice(0, 3)]);
    if (userReviews.length > 3) {
      setReviewsIsMore(true);
    }
  }, [listing]);

  const handleMore = () => {
    setShowingReviews(userReviews.slice(0, showingReviews.length + 3));
    if (showingReviews.length + 3 >= userReviews.length) {
      setReviewsIsMore(false);
    }
  };

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

  let gamesTradeSection;
  if (listing.trade) {
    gamesTradeSection = (
      <div className="pb-10">
        <SectionTitle title="Games accepted for trade" />
        <div className="grid grid-cols-5 gap-4">
          {listing.gamesTrade.map((game) => {
            return (
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`}
                className="rounded-lg shadow-md shadow-bg-dark  "
              ></img>
            );
          })}
        </div>
      </div>
    );
  } else {
    gamesTradeSection = null;
  }

  return (
    <div className="h-full">
      <ReviewModal
        open={openReviewModal}
        closeButtonClick={() => handleReviewModalClose()}
        target={listing.user}
        source={loggedUser}
      />
      <CustomAlert type="error" message={error} fixed={true} timed={true} />
      <div className="flex flex-row space-x-10 h-full">
        {/* Left Panel */}
        <div className="flex flex-col w-1/4 space-y-10">
          {/* Game Cover  */}
          <GameCover
            url={listing.coverURL}
            platform={listing.platform}
            rounded={true}
            textSize="text-base"
            className="shadow-md shadow-bg-dark"
          />
          {/* Profile Section  */}
          {/* Fetch data of user from userId from the listing data  */}
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-1/4 justify-center">
              <img
                src={process.env.PUBLIC_URL + "/userImage.png"}
                className="h-fit"
              ></img>
            </div>
            <div className="flex flex-col">
              <div
                className="text-text-white hover:underline hover:cursor-pointer"
                onClick={() => navigate(`/user/${listing.user}`)} //change the 1 to the actual useId or whatever will define the user in the listing
              >
                {listing.user}
              </div>
              <UserReviewsScore username={listing.user} />
              <div className=" text-text-medium text-sm">Date User Joined</div>
            </div>
          </div>
          {/* Buttons for messaging user and for reporting  */}
          {loggedUser === listing.user ? (
            <div className="flex flex-col space-y-3">
              <Button
                text="Update the listing"
                bgColor="bg-accent"
                textColor="text-text-dark"
                icon={
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-bg-dark pr-2"
                  />
                }
                className="text-sm py-1.5"
              />
              <Button
                text="Mark as sold"
                bgColor="bg-text-white"
                textColor="text-text-dark"
                icon={
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-bg-dark pr-2"
                  />
                }
                className="text-sm py-1.5"
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Button
                text="Contact The Seller"
                bgColor="bg-accent"
                textColor="text-text-dark"
                icon={
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="text-bg-dark pr-2"
                  />
                }
                className="text-sm py-1.5"
              />
              <Button
                text="Report Listing"
                bgColor="bg-red-400"
                textColor="text-bg-dark"
                icon={
                  <FontAwesomeIcon
                    icon={faFlag}
                    className="text-bg-dark pr-2"
                  />
                }
                className="text-sm py-1.5"
              />
            </div>
          )}
        </div>
        {/* RIght Panel  */}
        <div class="flex-1 flex overflow-hidden">
          <div class="flex-1 overflow-y-scroll no-scrollbar">
            <div className="flex flex-col flex-auto pb-10">
              {/* title and price  */}
              <div className="flex flex-row font-semibold">
                <div className="text-text-white text-[2rem] grow">
                  {listing.gameName}
                </div>
                <div className="text-accent text-[2rem]">
                  {listing.price} TND
                </div>
              </div>
              {/* line  */}
              <hr className="my-4"></hr>
              {/* delivery trade and date  */}
              <div className="flex flex-row justify-end space-x-4 pb-12">
                {/* delivery pill  */}
                {listing.delivery && (
                  <div className="flex flex-col justify-center">
                    <Pill
                      bgColor="bg-text-white"
                      text="delivery"
                      icon={
                        <FontAwesomeIcon
                          icon={faTruck}
                          className="text-bg-dark pr-2"
                        />
                      }
                      className="py-1.5 px-5"
                    />
                  </div>
                )}
                {/* trade pill  */}
                {listing.trade && (
                  <div className="flex flex-col justify-center">
                    <Pill
                      bgColor="bg-text-white"
                      text="trade"
                      icon={
                        <FontAwesomeIcon
                          icon={faArrowRightArrowLeft}
                          className="text-bg-dark pr-2"
                        />
                      }
                      className="py-1.5 px-5"
                    />
                  </div>
                )}
                <div className="flex flex-col grow text-right">
                  <div className="text-text-white">{listing.state}</div>
                  <div className="text-sm text-text-light">
                    Date listing added
                  </div>
                </div>
              </div>
              {/* condition and method of payment  */}
              <div className="flex flex-row text-text-white pb-12">
                <div className="flex flex-col space-y-1.5 grow">
                  <div className="font-semibold">Condition</div>
                  <div className=" text-sm">{listing.condition}</div>
                </div>
                <div className="flex flex-col space-y-1.5 text-right">
                  <div className="font-semibold">Payment Method</div>
                  <div className=" text-sm">{listing.paymentMethod}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 text-text-white">
                <div className="font-semibold">Description</div>
                <div className=" text-sm">{listing.description}</div>
              </div>
              {/* next section title  */}
              <SectionTitle title="Seller's reviews" />
              {/* Review Section  */}
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row">
                  <div className="flex flex-col justify-center grow">
                    <UserReviewsScore username={listing.user} />
                  </div>
                  {loggedUser === listing.user ? null : (
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
                      className="text-sm py-1.5"
                      onClick={handleReviewModalOpen}
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-3 w-1/2 max-w-[50%]">
                  {showingReviews.map((review) => {
                    if (review) {
                      return <ListingUserReviewPanel review={review} />;
                    }
                  })}
                </div>
                <div className="w-1/3 py-2">
                  {reviewsIsMore && (
                    <Button
                      text="Show More"
                      bgColor="bg-text-white"
                      textColor="text-bg-dark"
                      className="text-sm py-1.5"
                      onClick={handleMore}
                    />
                  )}
                </div>
              </div>
              {/* Games accepted to trade with section  */}
              {gamesTradeSection}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
