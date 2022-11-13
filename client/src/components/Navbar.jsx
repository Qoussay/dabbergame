import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetchGames from "../hooks/useFetchGames";

export default function Navbar(props) {
  const navigate = useNavigate();
  const navigateAddListing = () => {
    navigate("/sell");
  };

  //set up the game states
  const [inputValue, setInputValue] = useState("");
  const [chosenGame, setChosenGame] = useState("");

  const searchOptions = useFetchGames(inputValue);

  return (
    <div className="bg-bg-dark fixed w-full py-2.5 shadow-md shadow-bg-dark z-10">
      <div className="flex flex-row justify-center desktop:mx-80 laptop:mx-60 space-x-20">
        <a href="/" className=" text-2xl text-accent text-right">
          DabberGame
        </a>
        <Autocomplete
          value={chosenGame}
          onChange={(event, newValue) => {
            setChosenGame(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          className="grow pt-1"
          disablePortal
          id="combo-box-demo"
          options={searchOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              color="primary"
              dark
              size="small"
              placeholder="Search for a game"
              sx={{
                background: "#fff",
                borderRadius: "5px",
                "& .MuiFilledInput-root": {
                  paddingTop: 0,
                },
              }}
            />
          )}
        />
        <div className="flex flex-row space-x-2">
          <Button
            text="Post a listing"
            bgColor="bg-accent"
            textColor="text-text-dark"
            icon={
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="text-text-dark pr-2"
              />
            }
            className="text-sm py-1"
            onClick={navigateAddListing}
          />
          <p className="text-white text-2xl">|</p>
          <Button
            text="Login"
            bgColor="bg-text-white"
            textColor="text-bg-dark"
            icon={
              <FontAwesomeIcon icon={faUser} className="text-bg-dark pr-2" />
            }
            className="text-sm py-1"
            onClick={props.loginClick}
          />
        </div>
      </div>
    </div>
  );
}
