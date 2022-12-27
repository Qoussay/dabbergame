import Button from "./Button";
import { TextField, Stack, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./CustomAlert";
import { useUserContext } from "../context/LoggedUserContext";

export default function LoginForm({ onClick }) {
  const navigate = useNavigate();
  const { setLoggedUser } = useUserContext();
  const [signingIn, setSigningIn] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginUser = async () => {
    const res = await axios.post("/api/signin", values).catch((err) => {
      console.log(err.response.data.error);
      setError(err.response.data.error);
      setSigningIn(false);
    });

    if (res.status === 200) {
      localStorage.setItem("user", values.username);
      setLoggedUser(values.username);
      navigate(0);
    }
  };

  const validateInput = () => {
    if (!values.username) {
      setError("You must enter a username.");
      setSigningIn(false);
      return false;
    }
    if (!values.password) {
      setError("You must enter a password.");
      setSigningIn(false);
      return false;
    }
    return true;
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setSigningIn(true);
    try {
      if (validateInput()) loginUser();
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
          name="username"
          value={values.username}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="Username"
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
        <CustomAlert type="error" message={error} fixed={false} timed={false} />
        {/* </Stack> */}
        <Button
          bgColor="bg-accent"
          textColor="text-text-dark"
          onClick={handleSubmission}
          text={signingIn ? "Signing you in ..." : "Sign In"}
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
