import GameCover from "./GameCover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function ProfileListingCard({ listing }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="flex flex-col rounded-lg h-fit hover:cursor-pointer hover:shadow-accent hover:border-accent shadow-md shadow-bg-dark"
    >
      <GameCover
        url={listing.coverURL}
        platform={listing.platform}
        rounded={false}
        textSize="text-[0.8rem]"
      />
      <div className="bg-bg-medium rounded-b-lg text-center text-accent flex flex-row space-x-1.5 px-1.5 py-1.5">
        <div className="flex flex-row grow space-x-1">
          <div className="text-sm">{listing.price}</div>
          <div className="text-xs flex flex-col justify-center">TND</div>
        </div>
        {listing.trade && (
          <div className="flex flex-col justify-center">
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="text-accent desktop:text-sm laptop:text-xs"
            />
          </div>
        )}
        {listing.delivery && (
          <div className="flex flex-col justify-center">
            <FontAwesomeIcon
              icon={faTruck}
              className="text-accent desktop:text-sm laptop:text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
}
