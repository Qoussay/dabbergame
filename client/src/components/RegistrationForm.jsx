import states from "../mock/states.json";
import Button from "./Button";
import axios from "axios";
import { TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/LoggedUserContext";
import CustomAlert from "./CustomAlert";

export default function RegistrationForm({ onClick }) {
  const navigate = useNavigate();
  const { setLoggedUser } = useUserContext();
  const [signingUp, setSigningUp] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: null,
    state: "",
  });

  const [error, setError] = useState(null);

  const validateInput = () => {
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.firstName) {
      setError("You must enter a first name.");
      setSigningUp(false);
      return false;
    }
    if (!values.lastName) {
      setError("You must enter a last name.");
      setSigningUp(false);
      return false;
    }
    if (!values.email) {
      setError("You must enter an email.");
      setSigningUp(false);
      return false;
    }
    if (!reg.test(values.email)) {
      setError("You must enter a valid email.");
      setSigningUp(false);
      return false;
    }
    if (!values.state) {
      setError("You must choose a state.");
      setSigningUp(false);
      return false;
    }
    if (!values.dateOfBirth) {
      setError("You must enter a date of birth.");
      setSigningUp(false);
      return false;
    } else {
      const thisYear = new Date().getFullYear();
      if (thisYear - values.dateOfBirth._d.getFullYear() < 14) {
        setError("You must be 14 years old or older.");
        setSigningUp(false);
        return false;
      }
    }
    if (!values.username) {
      setError("You must enter a username.");
      setSigningUp(false);
      return false;
    }
    if (!values.phoneNumber) {
      setError("You must enter a phoneNumber.");
      setSigningUp(false);
      return false;
    }
    if (values.phoneNumber.length !== 8) {
      setError("You must enter a valid phone number.");
      setSigningUp(false);
      return false;
    }
    if (!values.password) {
      setError("You must enter a password.");
      setSigningUp(false);
      return false;
    }
    if (values.password.length < 8) {
      setError("You must enter a password of 8 characters or more.");
      setSigningUp(false);
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (isNaN(value)) return;
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const registerUser = async () => {
    const res = await axios.post("/api/signup", values).catch((err) => {
      // console.log(err);
      // setError(err.response.data.message);
      // setSigningUp(false);
      // return;
      console.log("res status is 400");
      setError("Username or email is already in use.");
      setSigningUp(false);
      return;
    });

    if (res.status === 200) {
      console.log("User created successfully");
      localStorage.setItem("user", values.username);
      setLoggedUser(values.username);
      navigate(0);
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setSigningUp(true);
    try {
      if (validateInput()) registerUser();
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
          dark="true"
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
          dark="true"
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
              dark="true"
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
              dark="true"
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
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleInputChange}
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          label="Phone Number"
          variant="filled"
          color="primary"
          dark="true"
          size="small"
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
          dark="true"
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
          label="Password"
          type="password"
          variant="filled"
          color="primary"
          dark="true"
          size="small"
        />
        <CustomAlert type="error" message={error} fixed={false} timed={false} />
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
