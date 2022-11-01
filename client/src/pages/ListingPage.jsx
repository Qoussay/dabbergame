// When you get to this pageXOffset, search the listing via ID
import { useParams } from "react-router-dom";
import data from "../mock/listings.json";
import PlatformBanner from "../components/PlatformBanner";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListingUserReviewPanel from "../components/ListingUserReviewPanel";
import {
  faMessage,
  faFlag,
  faArrowRightArrowLeft,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import Pill from "../components/Pill";
import reviews from "../mock/reviews.json";
import ListingPageSectionTitle from "../components/ListingPageSectionTitle";
import GameCover from "../components/GameCover";

export default function ListingPage() {
  const { listingId } = useParams();
  const listing = data.filter((listing) => listing.id === listingId)[0];

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
    <div className=" bg-bg-medium desktop:px-80 laptop:px-60 pt-24 h-screen">
      <div className="flex flex-row space-x-10 h-full">
        {/* Left Panel */}
        <div className="flex flex-col w-1/4 space-y-10">
          {/* Game Cover  */}
          <GameCover
            url={listing.coverURL}
            platform={listing.platform}
            rounded={true}
            textSize="text-base"
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
              <div className="text-text-white">{listing.user}</div>
              <div className="text-accent text-sm">Reviews</div>
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
            <div className="flex flex-col flex-auto">
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
              <div className="flex flex-row text-text-white">
                <div className="flex flex-col grow">
                  <div className="font-semibold">Condition</div>
                  <div className=" text-sm">{listing.condition}</div>
                </div>
                <div className="flex flex-col text-right">
                  <div className="font-semibold">Payment Method</div>
                  <div className=" text-sm">{listing.paymentMethod}</div>
                </div>
              </div>
              {/* next section title  */}
              <ListingPageSectionTitle title="Seller's ratings" />
              {/* Review Section  */}
              <div className="flex flex-col w-1/2 space-y-4">
                <div className="text-text-white">Total review count</div>
                {reviews
                  .filter((review) => review.target === listing.user)
                  .map((review) => {
                    if (review) {
                      return <ListingUserReviewPanel data={review} />;
                    }
                  })}
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
