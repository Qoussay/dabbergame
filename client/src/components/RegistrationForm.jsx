import states from "../mock/states.json";
import Button from "./Button";
import axios from "axios";
import { TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegistrationForm({ onClick }) {
  const navigate = useNavigate();
  const [signingUp, setSigningUp] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: null,
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const registerUser = async () => {
    const res = await axios.post("/api/signup", values).catch((err) => {
      console.log(err);
    });

    if (res.status === 200) {
      console.log("User created successfully");
      navigate(0);
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setSigningUp(true);
    try {
      registerUser();
    } catch {
      console.log("error signing up");
    }
  };

  return (
    <div>
      <h1 className="text-center text-text-white text-2xl text py-5 font-semibold ">
        Register
      </h1>
      <form className="grow flex flex-col justify-center px-4 space-y-3">
        <TextField
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          label="First Name"
          variant="filled"
          color="primary"
          dark
          size="small"
        />
        <TextField
          name="lastName"
          value={values.lastName}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          label="Last Name"
          variant="filled"
          color="primary"
          dark
          size="small"
        />
        <Autocomplete
          name="state"
          value={values.state}
          onChange={(e, newValue) => {
            e.preventDefault();
            setValues({ ...values, state: newValue });
          }}
          disablePortal
          options={states}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              color="primary"
              dark
              size="small"
              label="State"
              sx={{
                background: "#fff",
                borderRadius: "5px",
              }}
            />
          )}
        />
        <DatePicker
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={(newValue) => {
            setValues({ ...values, dateOfBirth: newValue });
          }}
          label="Basic example"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              color="primary"
              dark
              size="small"
              label="Birthdate"
              sx={{
                background: "#fff",
                borderRadius: "5px",
              }}
            />
          )}
        />
        <TextField
          name="username"
          value={values.username}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          label="Username"
          variant="filled"
          color="primary"
          dark
          size="small"
        />
        <TextField
          name="email"
          value={values.email}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          label="Email"
          type="email"
          variant="filled"
          color="primary"
          dark
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
          text={signingUp ? "Signing you up ..." : "Sign Up"}
          className="mb-5 mt-3 py-3"
          onClick={handleSubmission}
        />
      </form>
      <div className="flex flex-row justify-center py-2 space-x-2">
        <p className="text-text-white flex flex-col justify-center">
          You have an account?
        </p>
        <p
          className="text-accent hover:cursor-pointer hover:brightness-120 hover:scale-105 transition-all duration-300"
          onClick={onClick}
        >
          Sign In
        </p>
      </div>
    </div>
  );
}
