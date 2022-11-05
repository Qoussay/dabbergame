import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
export default function ListingCardInfo(props) {
  let username;

  if (props.user.length > 8) {
    username = props.user.slice(0, 6) + "...";
  } else {
    username = props.user;
  }
  return (
    <div className="bg-bg-light rounded-b-lg px-2 py-1 flex flex-row h-full">
      <div className="flex flex-col grow justify-center space-y-0.5">
        <p className="text-text-white text-sm">{username}</p>
        <p className=" text-text-light text-[0.7rem]">{props.state}</p>
      </div>
      <div className="flex flex-col justify-start w-1/2">
        <div className=" text-lg font-bold  text-accent text-right flex flex-row justify-end desktop:space-x-1 laptop:space-x-0.5 items-baseline">
          <p className="laptop:text-sm desktop:text-base">{props.price}</p>
          <p className=" laptop:text-[0.7rem] desktop:text-sm">TND</p>
        </div>
        <div className=" justify-end flex flex-row py-0.5 space-x-2">
          {props.trade && (
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="text-accent desktop:text-sm laptop:text-xs"
            />
          )}
          {props.delivery && (
            <FontAwesomeIcon
              icon={faTruck}
              className="text-accent desktop:text-sm laptop:text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}
