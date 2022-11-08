import states from "../mock/states.json";
import Button from "./Button";
export default function RegistrationForm({ onClick }) {
  return (
    <div>
      <h1 className="text-center text-text-white text-xl text py-7 font-semibold underline">
        Register
      </h1>
      <form className="grow flex flex-col justify-center px-4 space-y-3">
        <div className="flex flex-row ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            First Name:
          </div>
          <input
            type="text"
            name="firstName"
            className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg"
            placeholder="First Name"
          />
        </div>
        <div className="flex flex-row ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            Last Name:
          </div>
          <input
            type="text"
            name="lastName"
            className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-corowl ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            State:
          </div>
          <select className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg">
            {states.map((state) => {
              return <option>{state}</option>;
            })}
          </select>
        </div>
        <div className="flex flex-row ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            Birthdate:
          </div>
          <input
            type="date"
            name="username"
            className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-row ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            Username:
          </div>
          <input
            type="text"
            name="username"
            className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-row ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            Email:
          </div>
          <input
            type="email"
            name="loginEmail"
            className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-row ">
          <div className="text-lg w-1/3 flex flex-col justify-center text-text-white">
            Password:
          </div>
          <input
            type="password"
            name="loginPassword"
            className="focus:shadow-accent focus:border-accent focus:outline-none w-full h-10 pl-2 py-0.5 rounded-lg"
            placeholder="Password"
          />
        </div>

        <Button
          bgColor="bg-accent"
          textColor="text-text-dark"
          text="Sign Up"
          className="my-4 py-1"
        />
      </form>
      <div className="flex flex-row justify-center py-2">
        <p className="text-text-white flex flex-col justify-center">
          You have an account?
        </p>
        <Button
          bgColor="bg-bg-light"
          textColor="text-accent"
          text="Sign In"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
