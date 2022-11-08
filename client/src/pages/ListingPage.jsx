// When you get to this pageXOffset, search the listing via ID
import { useParams, useNavigate } from "react-router-dom";
import data from "../mock/listings.json";
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
} from "@fortawesome/free-solid-svg-icons";
import Pill from "../components/Pill";
import reviews from "../mock/reviews.json";
import ListingPageSectionTitle from "../components/ListingPageSectionTitle";
import GameCover from "../components/GameCover";
import { useState, useEffect } from "react";
import UserReviewsScore from "../components/UserReviewsScore";
export default function ListingPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const listing = data.filter((listing) => listing.id === listingId)[0];

  const [reviewsIsMore, setReviewsIsMore] = useState(false);
  const [showingReviews, setShowingReviews] = useState([]);

  const userReviews = reviews.filter(
    (review) => review.target === listing.user
  );

  useEffect(() => {
    setShowingReviews([...userReviews.slice(0, 3)]);
    if (userReviews.length >= 3) {
      setReviewsIsMore(true);
    }
  }, []);

  const handleMore = () => {
    setShowingReviews(userReviews.slice(0, showingReviews.length + 3));
    if (showingReviews.length + 3 >= userReviews.length) {
      setReviewsIsMore(false);
    }
  };

  let gamesTradeSection;
  if (listing.trade) {
    gamesTradeSection = (
      <div className="pb-10">
        <ListingPageSectionTitle title="Games accepted for trade" />
        <div className="flex flex-row space-x-4">
          {listing.gamesTrade.map((game) => {
            return (
              <div className="w-1/5">
                <GameCover
                  url={game.coverUrl}
                  platform={game.platform}
                  rounded={true}
                  textSize="text-xs"
                />
              </div>
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
                <FontAwesomeIcon icon={faFlag} className="text-bg-dark pr-2" />
              }
              className="text-sm py-1.5"
            />
          </div>
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
              <ListingPageSectionTitle title="Seller's reviews" />
              {/* Review Section  */}
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row">
                  <div className="flex flex-col justify-center grow">
                    <UserReviewsScore username={listing.user} />
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
                    className="text-sm py-1.5"
                    onClick={() =>
                      navigate(`/user/${listing.user}/reviews/add`)
                    }
                  />
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
