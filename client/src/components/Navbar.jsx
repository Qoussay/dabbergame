import Button from "./Button";
export default function Navbar() {
  return (
    <div className="bg-bg-dark fixed w-full py-2.5">
      <div className="flex flex-row justify-center mx-80 space-x-20">
        <h1 className=" text-3xl text-accent text-right">DabberGame</h1>
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
          />
          <p className="text-white text-2xl">|</p>
          <Button
            text="Login"
            bgColor="bg-bg-dark"
            textColor="text-text-white"
          />
        </div>
      </div>
    </div>
  );
}
