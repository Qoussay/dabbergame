export default function PlatformBanner(props) {
  let bannerColor = "";
  let bannerTextColor = "";

  switch (props.platform) {
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
    <div
      className={`${bannerColor} ${bannerTextColor} text-[0.8rem] py-0.5 text-center rounded-t-lg`}
    >
      {props.platform}
    </div>
  );
}
