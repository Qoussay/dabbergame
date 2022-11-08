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
    <div className="w-full h-full fixed pt-24 bg-dark-bg z-10">
      <div className="bg-bg-light shadow-md shadow-bg-dark rounded-lg laptop:w-1/3 desktop:w-[28%] h-fit mx-auto flex flex-col py-3 z-10">
        <div className="flex flex-row justify-end pl-4">
          <h1 className=" text-2xl text-accent text-left flex-auto ">
            DabberGame
          </h1>
          <Button
            bgColor="bg-bg-light"
            icon={
              <FontAwesomeIcon
                icon={faX}
                className="text-text-white text-lg pr-2 h-4"
              />
            }
            onClick={closeButtonClick}
          />
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
