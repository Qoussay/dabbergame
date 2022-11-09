import platforms from "../mock/platforms.json";
export default function PopularPlatformSection() {
  return (
    <div className="grid grid-cols-5 gap-10 place-items-center">
      {platforms.map((platform) => {
        return (
          <img
            src={process.env.PUBLIC_URL + platform.image}
            className=" object-contain h-[80px] grayscale hover:scale-110 transition-all duration-300 hover:grayscale-0"
          ></img>
        );
      })}
    </div>
  );
}
