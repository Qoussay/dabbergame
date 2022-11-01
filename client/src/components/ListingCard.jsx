import ListingCardInfo from "./ListingCardInfo";
import PlatformBanner from "./PlatformBanner";
export default function ListingCard(props) {
  return (
    <div className="flex flex-col shadow-md shadow-bg-dark rounded-lg h-full">
      <PlatformBanner platform={props.data.platform} />
      <img src={props.data.coverURL}></img>
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
