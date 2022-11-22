import PlatformBanner from "./PlatformBanner";
export default function GameCover({
  url,
  platform,
  textSize,
  rounded,
  className,
  status,
}) {
  return (
    <div
      className={`${className} flex flex-col relative font-bold rounded-t-lg ${
        rounded ? "rounded-b-lg" : null
      }`}
    >
      <PlatformBanner platform={platform} textSize={textSize} />
      <img
        src={url}
        className={`${rounded ? "rounded-b-lg" : null} ${
          status === "sold" ? "grayscale" : null
        }`}
      ></img>
      {status === "sold" ? (
        <div className="absolute top-1/2 w-full text-center bg-yellow-300">
          SOLD
        </div>
      ) : null}
    </div>
  );
}
