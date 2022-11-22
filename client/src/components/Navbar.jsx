import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faUser,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, createSearchParams } from "react-router-dom";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetchGames from "../hooks/useFetchGames";
import { useUserContext } from "../context/LoggedUserContext";
import CustomAlert from "./CustomAlert";

export default function Navbar(props) {
  const navigate = useNavigate();

  const { loggedUser, setLoggedUser } = useUserContext();

  //set up the game states
  const [inputValue, setInputValue] = useState("");
  const [chosenGame, setChosenGame] = useState("");

  //setting up the error state for alert
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (chosenGame) {
      navigate({
        pathname: "/listings",
        search: createSearchParams({ gameName: chosenGame }).toString(),
      });
    }
  }, [chosenGame]);

  const handleSubmission = (event, newValue) => {
    const setState = async () => {
      await setChosenGame(newValue);
    };

    setState();

    navigate({
      pathname: "/listings",
      search: createSearchParams({ gameName: chosenGame }).toString(),
    });
  };

  const searchOptions = useFetchGames(inputValue);

  const loginButton = (
    <Button
      text="Login"
      bgColor="bg-text-white"
      textColor="text-bg-dark"
      icon={
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="text-bg-dark pr-2"
        />
      }
      className="text-sm py-1"
      onClick={props.loginClick}
    />
  );

  const profileLogoutButtons = (
    <div className="flex flex-row space-x-3">
      <Button
        text="Profile"
        bgColor="bg-text-white"
        textColor="text-bg-dark"
        icon={<FontAwesomeIcon icon={faUser} className="text-text-dark pr-2" />}
        className="text-sm py-1"
        onClick={() => {
          navigate(`/user/${loggedUser}`);
        }}
      />
      <Button
        text="Logout"
        bgColor="bg-text-dark"
        textColor="text-text-white"
        icon={
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-text-white pr-2"
          />
        }
        className="text-sm py-1"
        onClick={() => {
          localStorage.removeItem("user");
          setLoggedUser(null);
          navigate(0);
        }}
      />
    </div>
  );

  return (
    <div className="bg-bg-dark fixed w-full py-2.5 shadow-md shadow-bg-dark z-10">
      <div className="flex flex-row justify-center desktop:mx-80 laptop:mx-60 space-x-20">
        <a href="/" className=" text-2xl text-accent text-right">
          DabberGame
        </a>
        <Autocomplete
          // value={gameName}
          onChange={(event, newValue) => {
            setChosenGame(newValue.name);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          className="grow pt-1"
          disablePortal
          options={searchOptions}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                // loading="lazy"
                width="40"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${option.cover.image_id}.png`}
                alt=""
              />
              {option.name} (
              {new Date(option.first_release_date * 1000).getFullYear()})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              color="primary"
              size="small"
              dark="true"
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
            onClick={() => {
              loggedUser
                ? navigate("/sell")
                : setError("You must log in first.");
            }}
          />
          <p className="text-white text-2xl">|</p>
          {loggedUser ? profileLogoutButtons : loginButton}
        </div>
      </div>
      <CustomAlert type="error" message={error} fixed={true} timed={true} />
    </div>
  );
}
