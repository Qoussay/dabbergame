import PlatformBanner from "./PlatformBanner";
export default function GameCover({
  url,
  platform,
  textSize,
  rounded,
  className,
}) {
  return (
    <div
      className={`${className} flex flex-col font-bold ${
        rounded ? "rounded-b-lg" : null
      }`}
    >
      <PlatformBanner platform={platform} textSize={textSize} />
      <img src={url} className={rounded ? "rounded-b-lg" : null}></img>
    </div>
  );
}
