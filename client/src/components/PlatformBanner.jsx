export default function PlatformBanner(props) {
  let bannerColor = "";
  let bannerTextColor = "";

  switch (props.platform) {
    case "PlayStation 5":
      bannerColor = "bg-white";
      bannerTextColor = "text-black";
      break;
    case "PlayStation 4":
      bannerColor = "bg-blue-700";
      bannerTextColor = "text-white";
      break;
    case "Xbox One":
      bannerColor = "bg-green-500";
      bannerTextColor = "text-white";
      break;
    case "Xbox Series X|S":
      bannerColor = "bg-green-500";
      bannerTextColor = "text-white";
      break;
    case "Nintendo Switch":
      bannerColor = "bg-[#E60013]";
      bannerTextColor = "text-white";
      break;
    default:
      bannerColor = "bg-black";
      bannerTextColor = "text-text-white";
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
