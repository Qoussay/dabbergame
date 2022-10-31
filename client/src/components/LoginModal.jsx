import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function LoginModal() {
  return (
    <div className="bg-bg-light shadow-md shadow-bg-dark rounded-lg w-1/4 h-fit mx-auto flex flex-col py-3">
      <div className="flex flex-row justify-end pl-4">
        <h1 className=" text-2xl text-accent text-left flex-auto ">
          DabberGame
        </h1>
        <Button
          bgColor="bg-bg-light"
          icon={
            <FontAwesomeIcon
              icon={faX}
              className="text-text-white text-lg pr-2"
            />
          }
        />
      </div>
      <h1 className="text-center text-text-white text-xl text py-5 font-semibold underline">
        Login
      </h1>
      <form className="grow flex flex-col justify-center px-4 space-y-3">
        <input
          type="email"
          name="loginEmail"
          className="w-full h-10 pl-5 py-0.5 rounded-lg"
          placeholder="Email"
        />
        <input
          type="password"
          name="loginPassword"
          className="w-full h-10 pl-5 py-0.5 rounded-lg"
          placeholder="Password"
        />
        <a className="text-text-light">Forgot password?</a>
        <Button
          bgColor="bg-accent"
          textColor="text-text-dark"
          text="Log In"
          className="my-4 py-1"
        />
      </form>
      <div className="flex flex-row justify-center py-2 space-x-1">
        <p className="text-text-white">Don't have an account?</p>
        <a className="text-accent">Sign up</a>
      </div>
    </div>
  );
}
