import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import GameCover from "../components/GameCover";
import TradeGamesPanel from "../components/TradeGamesPanel";
import axios from "axios";
import states from "../mock/states.json";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import useFetchGames from "../hooks/useFetchGames";
import useFetchGameInfo from "../hooks/useFetchGameInfo";
import { useUserContext } from "../context/LoggedUserContext";
export default function AddListingPage() {
  // this state will keep track of the page state
  const [pageState, setPageState] = useState(0);

  // input Values
  const [gameTitleIV, setGameTitleIV] = useState("");
  const [platformOptions, setPlatformOptions] = useState([]);
  const [platformChosen, setPlatformChosen] = useState("");
  const [platformInput, setPlatformInput] = useState("");
  // the rest of the values
  const [listing, setListing] = useState({
    user: "",
    state: "",
    gameName: "",
    coverURL: "",
    platform: "",
    price: "",
    condition: "",
    paymentMethod: "",
    delivery: "",
    trade: "",
    description: "",
  });

  //get user
  const { loggedUser, setLoggedUser } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setListing({
      ...listing,
      [name]: value,
    });
  };

  //final gamename chosen by the user
  const [gameName, setGameName] = useState("");

  //final object that will be passed to the backend to be saved in the database

  const [tradeAccepted, setTradeAccepted] = useState(false);

  //these are the search options that will be displayed while the user is typing
  const searchOptions = useFetchGames(gameTitleIV);

  //get game details from the hook
  const { gameInfo, done } = useFetchGameInfo(gameName);

  useEffect(() => {
    if (gameInfo) {
      setPlatformOptions(gameInfo.platforms);
    }
  }, [gameInfo]);

  const handleNextBtn = () => {
    setPageState(pageState + 1);
  };

  const handleBackBtn = () => {
    setPageState(pageState - 1);
  };

  const handleTradeChange = (value) => {
    if (value === "Yes") {
      setTradeAccepted(true);
      return;
    } else {
      setTradeAccepted(false);
      return;
    }
  };

  const handleSubmit = () => {
    setListing({
      ...listing,
      user: loggedUser,
      gameName: gameName,
      coverURL: gameInfo.coverUrl,
      platform: platformChosen,
    });

    return;
  };
  let formStage = null;

  switch (pageState) {
    case 0:
      formStage = (
        <div className="flex flex-col py-6 px-10">
          <div className="text-text-white pb-4">
            Choose a game and select the corresponding platform
          </div>
          <form className="flex flex-row space-x-4">
            <div className="w-2/3">
              <Autocomplete
                value={gameName}
                onChange={(event, newValue) => {
                  setGameName(newValue);
                }}
                inputValue={gameTitleIV}
                onInputChange={(event, newInputValue) => {
                  setGameTitleIV(newInputValue);
                }}
                className="grow pt-1"
                disablePortal
                options={searchOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    color="primary"
                    dark="true"
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
            </div>
            <Autocomplete
              value={platformChosen}
              onChange={(event, newValue) => {
                setPlatformChosen(newValue);
              }}
              inputValue={platformInput}
              onInputChange={(event, newInputValue) => {
                setPlatformInput(newInputValue);
              }}
              className="grow pt-1"
              disablePortal
              options={platformOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  color="primary"
                  dark="true"
                  size="small"
                  placeholder="Platform"
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
          </form>
          <div className="flex flex-row justify-end pt-10">
            <Button
              text="Next"
              bgColor="bg-accent"
              textColor="text-text-dark"
              className="text-base py-1.5 px-6"
              onClick={handleNextBtn}
            />
          </div>
        </div>
      );
      break;
    case 1:
      formStage = (
        <div className="flex flex-col py-6 px-10">
          <div className="flex flex-row space-x-16">
            {/* left panel for image  */}
            <div className="w-1/4">
              <GameCover
                url={gameInfo.coverUrl}
                platform={platformChosen}
                rounded={true}
                textSize="text-sm"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-8">
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <Autocomplete
                    name="condition"
                    value={listing.condition}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      setListing({ ...listing, condition: newValue });
                    }}
                    disablePortal
                    options={["New", "Used"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        color="primary"
                        dark="true"
                        size="small"
                        label="Condition"
                        sx={{
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Autocomplete
                    name="paymentMethod"
                    value={listing.paymentMethod}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      setListing({ ...listing, paymentMethod: newValue });
                    }}
                    disablePortal
                    options={["Cash", "Bank Transfer"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        color="primary"
                        dark="true"
                        size="small"
                        label="Payment Method"
                        sx={{
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-1/2 space-y-1">
                  <TextField
                    name="price"
                    value={listing.price}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                    }}
                    type="number"
                    label="Price"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                  />
                </div>
                <div className="flex flex-col w-1/2 space-y-1">
                  <Autocomplete
                    name="state"
                    value={listing.state}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      setListing({ ...listing, state: newValue });
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
                </div>
              </div>
              <div className="flex flex-row grow">
                <div className="flex flex-col grow">
                  <TextField
                    name="description"
                    value={listing.description}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                    }}
                    multiline="true"
                    rows="5"
                    label="Description"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    maxRows="5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row pt-10">
            <Button
              text="Back"
              bgColor="bg-text-white"
              textColor="text-bg-dark"
              className="text-base py-1.5 px-6"
              onClick={handleBackBtn}
            />
            <div className="grow"></div>
            <Button
              text="Next"
              bgColor="bg-accent"
              textColor="text-text-dark"
              className="text-base py-1.5 px-6"
              onClick={handleNextBtn}
            />
          </div>
        </div>
      );
      break;
    case 2:
      formStage = (
        <div className="flex flex-col py-6 px-10">
          <div className="flex flex-row space-x-16">
            {/* left panel for image  */}
            <div className="w-1/4 ">
              <GameCover
                url={gameInfo.coverUrl}
                platform={platformChosen}
                rounded={true}
                textSize="text-sm"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-8">
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <Autocomplete
                    name="trade"
                    value={listing.trade}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      setListing({ ...listing, trade: newValue });
                      handleTradeChange(newValue);
                    }}
                    disablePortal
                    options={["Yes", "No"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        color="primary"
                        dark="true"
                        size="small"
                        label="Trade"
                        sx={{
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Autocomplete
                    name="delivery"
                    value={listing.delivery}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      setListing({ ...listing, delivery: newValue });
                    }}
                    disablePortal
                    options={["Yes", "No"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        color="primary"
                        dark="true"
                        size="small"
                        label="Delivery"
                        sx={{
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              {tradeAccepted ? <TradeGamesPanel /> : null}
            </div>
          </div>
          <div className="flex flex-row pt-10">
            <Button
              text="Back"
              bgColor="bg-text-white"
              textColor="text-bg-dark"
              className="text-base py-1.5 px-6"
              onClick={handleBackBtn}
            />
            <div className="grow"></div>
            <Button
              text="Submit"
              bgColor="bg-accent"
              textColor="text-text-dark"
              className="text-base py-1.5 px-6"
              onClick={handleSubmit}
            />
          </div>
        </div>
      );
      break;
    default:
      formStage = null;
      break;
  }
  return (
    <div className=" bg-bg-light rounded-lg shadow-md shadow-bg-dark flex flex-col space-y-6">
      <div className="flex flex-row space-x-4 px-2 bg-bg-dark rounded-t-lg shadow-md shadow-bg-dark py-3">
        <div className="flex flex-col justify-center grow">
          <hr className="border-accent" />
        </div>
        <div className="text-accent text-2xl">Add a Listing</div>
        <div className="flex flex-col justify-center grow">
          <hr className="border-accent" />
        </div>
      </div>
      {formStage}
      <div className="mt-20">
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
    </div>
  );
}
