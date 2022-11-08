import Button from "./Button";
export default function LoginForm({ onClick }) {
  return (
    <div>
      <h1 className="text-center text-text-white text-xl text py-7 font-semibold underline">
        Login
      </h1>
      <form className="grow flex flex-col justify-center px-4 space-y-4">
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
        <Button
          bgColor="bg-accent"
          textColor="text-text-dark"
          text="Log In"
          className="mb-5 mt-3 py-1"
        />
      </form>
      <div className="flex flex-row justify-center py-2">
        <p className="text-text-white flex flex-col justify-center">
          Don't have an account?
        </p>
        <Button
          bgColor="bg-bg-light"
          textColor="text-accent"
          text="Sign Up"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
