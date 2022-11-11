import states from "../mock/states.json";
import Button from "./Button";
import { TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
export default function RegistrationForm({ onClick }) {
  const [dateValue, setDateValue] = useState(null);
  return (
    <div>
      <h1 className="text-center text-text-white text-2xl text py-5 font-semibold ">
        Register
      </h1>
      <form className="grow flex flex-col justify-center px-4 space-y-3">
        <TextField
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="First Name"
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
          label="Last Name"
          variant="filled"
          color="primary"
          dark
          size="small"
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
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
          label="Basic example"
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
          }}
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
          sx={{
            background: "#fff",
            borderRadius: "5px",
          }}
          id="filled-basic"
          label="Username"
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
          label="Email"
          type="email"
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
          text="Sign Up"
          className="mb-5 mt-3 py-3"
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
