import Button from "./Button";
import { TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm({ onClick }) {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginUser = async () => {
    const res = await axios.post("/api/signin", values).catch((err) => {
      console.log(err);
    });

    if (res.status === 200) {
      navigate(0);
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setSigningIn(true);
    try {
      loginUser();
    } catch {
      console.log("error signing in");
    }
  };
  return (
    <div className="px-4">
      <h1 className="text-center text-text-white text-2xl text py-5 font-semibold ">
        Login
      </h1>

      <form className="grow flex flex-col justify-center space-y-4">
        <TextField
          name="email"
          value={values.email}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="Email"
          variant="filled"
          color="primary"
          dark="true"
          size="small"
        />
        <TextField
          name="password"
          value={values.password}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="Password"
          type="password"
          variant="filled"
          color="primary"
          dark="true"
          size="small"
        />
        <Button
          bgColor="bg-accent"
          textColor="text-text-dark"
          onClick={handleSubmission}
          text={signingIn ? "Signing you in ..." : "Sign In"}
          className="mb-5 mt-3 py-3 hover:brightness-110"
        />
      </form>

      <div className="flex flex-row place-items-center text-text-white space-x-3 text-lg">
        <hr className="grow" />
        <div>Log in with</div>
        <hr className="grow" />
      </div>

      <div className="flex flex-row justify-center space-x-4 py-3">
        <div className="rounded-lg bg-white drop-shadow hover:drop-shadow-lg hover:brightness-90 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          <FacebookIcon fontSize="large" htmlColor="#156EE5" />
        </div>
        <div className="rounded-lg bg-[#EA4335] drop-shadow hover:drop-shadow-lg hover:brightness-90 hover:cursor-pointer hover:scale-105 transition-all duration-300">
          <GoogleIcon fontSize="large" htmlColor="#fff" />
        </div>
      </div>

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
