import PlatformBanner from "./PlatformBanner";
export default function GameCover({ url, platform, textSize, rounded }) {
  return (
    <div className="flex flex-col font-bold">
      <PlatformBanner platform={platform} textSize={textSize} />
      <img src={url} className={rounded ? "rounded-b-lg" : null}></img>
    </div>
  );
}
