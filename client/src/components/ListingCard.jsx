import ListingCardInfo from "./ListingCardInfo";
import GameCover from "./GameCover";

export default function ListingCard(props) {
  return (
    <div
      className="flex flex-col shadow-md shadow-bg-dark rounded-lg h-full hover:cursor-pointer hover:shadow-accent hover:border-accent"
      onClick={props.onClick}
    >
      <GameCover
        url={props.data.coverURL}
        platform={props.data.platform}
        rounded={false}
        textSize="text-[0.8rem]"
      />
      <ListingCardInfo
        user={props.data.user}
        state={props.data.state}
        price={props.data.price}
        trade={props.data.trade}
        delivery={props.data.delivery}
      />
    </div>
  );
}
