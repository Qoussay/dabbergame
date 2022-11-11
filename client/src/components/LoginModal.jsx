import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function LoginModal({
  open,
  closeButtonClick,
  type,
  switchButtonClick,
}) {
  if (!open) return null;
  return (
    <div className="w-full h-full fixed pt-16 bg-dark-bg z-10">
      <div className="bg-bg-light shadow-md shadow-bg-dark rounded-lg laptop:w-1/3 desktop:w-[28%] h-fit mx-auto flex flex-col py-3 z-10">
        <div className="flex flex-row justify-end px-4">
          <h1 className=" text-2xl text-accent text-left flex-auto ">
            DabberGame
          </h1>
          <div
            className="text-text-white text-lg hover:cursor-pointer hover:brightness-120 hover:scale-105 transition-all duration-300"
            onClick={closeButtonClick}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>

        {type ? (
          <LoginForm onClick={switchButtonClick} />
        ) : (
          <RegistrationForm onClick={switchButtonClick} />
        )}
      </div>
    </div>
  );
}
