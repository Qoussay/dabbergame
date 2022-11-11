export default function PlatformBanner(props) {
  let bannerColor = "";
  let bannerTextColor = "";

  switch (props.platform) {
    case "Playstation 5":
      bannerColor = "bg-white";
      bannerTextColor = "text-black";
      break;
    case "Playstation 4":
      bannerColor = "bg-blue-700";
      bannerTextColor = "text-white";
      break;
    case "Xbox One":
      bannerColor = "bg-green-500";
      bannerTextColor = "text-white";
      break;
    default:
      bannerColor = "bg-black";
      bannerTextColor = "text-black";
      break;
  }
  return (
    <div
      className={`${bannerColor} ${bannerTextColor} ${props.textSize} py-0.5 text-center rounded-t-lg`}
    >
      {props.platform}
    </div>
  );
}
