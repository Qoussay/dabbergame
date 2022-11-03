import Button from "../components/Button";
import { useState } from "react";
export default function ProfilePage() {
  // what panel is being rendered/ true for listings and false for reviews
  const [panel, setPanel] = useState(true);
  return (
    <div className="flex flex-col h-full -mt-24">
      <img src={process.env.PUBLIC_URL + "/profileBg.png"}></img>
      <div className="flex flex-row space-x-4">
        {/* left panel  */}
        <div className="flex flex-col w-1/5">
          {/* user image  */}
          <img
            src={process.env.PUBLIC_URL + "/userImage.png"}
            className="-mt-16 mb-3 w-4/5 ml-2"
          ></img>
          {/* first name and last name  */}
          <div className=" text-text-white desktop:text-2xl laptop:text-xl">
            First Name Last Name
          </div>
          <div className=" text-accent desktop:text-xl laptop:text-lg">
            Reviews
          </div>
          <div className="flex flex-col">
            <div className=" text-text-light desktop:text-lg laptop:text-base">
              State
            </div>
            <div className="text-text-medium desktop:text-lg laptop:text-base">
              Date joined
            </div>
          </div>
        </div>
        {/* right panel  */}
        <div className="flex flex-col grow space-y-4 py-4">
          <div className="flex flex-row">
            <Button
              text="Listings"
              textColor={panel ? "text-text-white" : "text-text-medium"}
              className={`text-lg py-2 ${
                panel ? "border-b-4 border-b-accent" : ""
              }`}
            />
            <Button
              text="Reviews"
              textColor={!panel ? "text-text-white" : "text-text-medium"}
              className={`text-lg py-2 ${
                !panel ? "border-b-4 border-b-accent" : ""
              }`}
            />
          </div>
          <div className="rounded-lg bg-bg-light h-[65vh] overscroll-auto overflow-y-scroll no-scrollbar"></div>
        </div>
      </div>
    </div>
  );
}
