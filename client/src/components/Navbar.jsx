import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function Navbar(props) {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  const navigateAddListing = () => {
    navigate("/sell");
  };

  return (
    <div className="bg-bg-dark fixed w-full py-2.5 shadow-md shadow-bg-dark z-10">
      <div className="flex flex-row justify-center desktop:mx-80 laptop:mx-60 space-x-20">
        <a href="/" className=" text-2xl text-accent text-right">
          DabberGame
        </a>
        <form className="grow flex flex-col justify-center">
          <input
            type="text"
            className="w-full pl-5 py-0.5 rounded-full"
            placeholder="Search for a game"
          />
        </form>
        <div className="flex flex-row space-x-2">
          <Button
            text="Post a listing"
            bgColor="bg-accent"
            textColor="text-text-dark"
            icon={
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="text-text-dark pr-2"
              />
            }
            className="text-sm"
            onClick={navigateAddListing}
          />
          <p className="text-white text-2xl">|</p>
          <Button
            text="Login"
            bgColor="bg-text-white"
            textColor="text-bg-dark"
            icon={
              <FontAwesomeIcon icon={faUser} className="text-bg-dark pr-2" />
            }
            className="text-sm"
            onClick={props.loginClick}
          />
        </div>
      </div>
    </div>
  );
}
