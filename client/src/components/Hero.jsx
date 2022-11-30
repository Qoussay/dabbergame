import states from "../mock/states.json";
import Button from "./Button";
import {
  TextField,
  Autocomplete,
  MenuItem,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import useFetchGames from "../hooks/useFetchGames";
import useFetchGameInfo from "../hooks/useFetchGameInfo";

export default function Hero() {
  const navigate = useNavigate();
  const [gameTitleIV, setGameTitleIV] = useState("");
  const [platformOptions, setPlatformOptions] = useState([]);
  const [platformChosen, setPlatformChosen] = useState("");
  const [platformInput, setPlatformInput] = useState("");
  const [query, setQuery] = useState({
    gameName: "",
    platform: "",
    state: "",
    trade: "",
    delivery: "",
  });

  const searchOptions = useFetchGames(gameTitleIV);

  const [chosenGame, setChosenGame] = useState("");
  const { gameInfo, done } = useFetchGameInfo(chosenGame.id);

  useEffect(() => {
    if (gameInfo) {
      setPlatformOptions(gameInfo.platforms);
    }
  }, [gameInfo]);

  useEffect(() => {
    if (chosenGame) {
      setQuery({
        ...query,
        gameName: chosenGame.name,
      });
    }
    if (platformChosen) {
      setQuery({
        ...query,
        platform: platformChosen.name,
      });
    }
  }, [chosenGame, platformChosen]);

  useEffect(() => {
    console.log(query);
  }, [query]);

  const handleSubmission = async () => {
    navigate({
      pathname: "/listings",
      search: createSearchParams(query).toString(),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setQuery({
      ...query,
      [name]: value,
    });
  };

  return (
    <div className="mb-16 space-y-12">
      {/* title of the hero section */}
      <h1 className="text-2xl w-1/2 mx-auto text-center text-text-white font-semibold leading-relaxed">
        Find all the game listings and deals you want and more!
      </h1>
      {/* container for the form  */}
      <form className="bg-bg-light w-full rounded-lg shadow-md shadow-bg-dark flex flex-col p-10 space-y-8">
        {/* search fields  */}
        <div className="flex flex-row space-x-6">
          <div className="flex grow flex-row ">
            <div className="w-1/3">
              <Autocomplete
                // value={platformChosen ? platformChosen.name : null}
                onChange={(event, newValue) => {
                  setPlatformChosen(newValue);
                }}
                inputValue={platformInput}
                onInputChange={(event, newInputValue) => {
                  setPlatformInput(newInputValue);
                }}
                disablePortal
                className="grow pt-1"
                autoHighlight
                options={platformOptions}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    color="primary"
                    dark="true"
                    label="Platform"
                    placeholder="Platform"
                    sx={{
                      background: "#fff",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                  />
                )}
              />
            </div>
            <div className="grow">
              <Autocomplete
                // value={gameName}
                onChange={(event, newValue) => {
                  setChosenGame(newValue);
                }}
                inputValue={gameTitleIV}
                onInputChange={(event, newInputValue) => {
                  setGameTitleIV(newInputValue);
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
                    dark="true"
                    placeholder="Search for a game"
                    label="Game Title"
                    sx={{
                      background: "#fff",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      borderLeft: "1px solid #171826",
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end w-1/5">
            <Autocomplete
              name="state"
              value={query.state}
              onChange={(e, newValue) => {
                e.preventDefault();
                setQuery({ ...query, state: newValue });
              }}
              disablePortal
              options={states}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  color="primary"
                  dark="true"
                  label="Location"
                  placeholder="All Tunisia"
                  sx={{
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* trade and delivery values  */}
        <div className="flex flex-row space-x-8 text-text-white">
          <TextField
            name="trade"
            value={query.trade}
            onChange={(e) => {
              handleInputChange(e);
            }}
            sx={{
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
            }}
            type="number"
            label="Trade"
            variant="filled"
            color="primary"
            dark="true"
            size="small"
            select
          >
            <MenuItem key="yes" value={true}>
              Yes
            </MenuItem>
            <MenuItem key="no" value={false}>
              No
            </MenuItem>
            <MenuItem key="whatever" value="whatever">
              I don't mind
            </MenuItem>
          </TextField>
          <TextField
            name="delivery"
            value={query.delivery}
            onChange={handleInputChange}
            sx={{
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
            }}
            type="number"
            label="Delivery"
            variant="filled"
            color="primary"
            dark="true"
            size="small"
            select
          >
            <MenuItem key="yes" value="yes">
              Yes
            </MenuItem>
            <MenuItem key="no" value="no">
              No
            </MenuItem>
            <MenuItem key="whatever" value="whatever">
              I don't mind
            </MenuItem>
          </TextField>
        </div>
        {/* submit buttons */}
        <div className="flex flex-row space-x-6 justify-center">
          <Button
            text="Search"
            bgColor="bg-bg-medium"
            textColor="text-text-white"
            className="py-2 px-3 "
            icon={
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-text-white pr-2"
              />
            }
            onClick={handleSubmission}
          />
          <Button
            text="Post a listing"
            bgColor="bg-accent"
            textColor="text-text-dark"
            className="py-2 px-3 "
            icon={
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="text-text-dark pr-2"
              />
            }
          />
        </div>
      </form>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={!done}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
