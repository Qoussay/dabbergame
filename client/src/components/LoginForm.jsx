import Button from "./Button";
import { TextField } from "@mui/material";

export default function LoginForm({ onClick }) {
  return (
    <div>
      <h1 className="text-center text-text-white text-2xl text py-5 font-semibold ">
        Login
      </h1>

      <form className="grow flex flex-col justify-center px-4 space-y-4">
        <TextField
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="Email"
          variant="filled"
          color="primary"
          dark
          size="small"
        />
        <TextField
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="Password"
          type="password"
          variant="filled"
          color="primary"
          dark
          size="small"
        />
        <Button
          bgColor="bg-accent"
          textColor="text-text-dark"
          text="Log In"
          className="mb-5 mt-3 py-3 hover:brightness-110"
        />
      </form>

      <div className="flex flex-row justify-center py-2 space-x-2">
        <p className="text-text-white flex flex-col justify-center">
          Don't have an account?
        </p>
        <p
          className="text-accent hover:cursor-pointer hover:brightness-120 hover:scale-105 transition-all duration-300"
          onClick={onClick}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
}
