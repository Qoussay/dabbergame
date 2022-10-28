export default function ListingCard(props) {
  let bannerColor = "";
  let bannerTextColor = "";

  switch (props.data.platform) {
    case "playstation5":
      bannerColor = "bg-white";
      bannerTextColor = "text-black";
      break;
    case "playstation4":
      bannerColor = "bg-blue-700";
      bannerTextColor = "text-white";
      break;
    case "xboxOne":
      bannerColor = "bg-green-500";
      bannerTextColor = "text-white";
      break;
    default:
      bannerColor = "bg-black";
      bannerTextColor = "text-black";
      break;
  }

  return (
    <div className="flex flex-col shadow-md shadow-bg-dark">
      <div
        className={`${bannerColor} ${bannerTextColor} text-sm text-center rounded-t-lg`}
      >
        {props.data.platform}
      </div>
      <img src={props.data.coverURL}></img>
      <div className="bg-bg-light rounded-b-lg px-2 py-1 flex flex-row">
        <div className="flex flex-col text-xs grow">
          <p className="text-text-white">{props.data.user}</p>
          <p className=" text-text-light">{props.data.state}</p>
        </div>
        <div className="flex flex-col justify-center w-1/2">
          <h1 className=" text-lg text-accent text-right">
            {props.data.price} TND
          </h1>
        </div>
      </div>
    </div>
  );
}
