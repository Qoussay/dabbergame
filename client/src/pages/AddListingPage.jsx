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
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import useFetchGames from "../hooks/useFetchGames";
import useFetchGameInfo from "../hooks/useFetchGameInfo";
import { useUserContext } from "../context/LoggedUserContext";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

export default function AddListingPage() {
  const navigate = useNavigate();

  //setting up the error state for alert
  const [error, setError] = useState(null);

  // this state will keep track of the page state
  const [pageState, setPageState] = useState(0);

  // input Values
  const [gameTitleIV, setGameTitleIV] = useState("");
  const [platformOptions, setPlatformOptions] = useState([]);
  const [platformChosen, setPlatformChosen] = useState("");
  const [platformInput, setPlatformInput] = useState("");
  const [gameTradeList, setGameTradeList] = useState([]);
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
    gamesTrade: [],
  });

  //get user
  const { loggedUser } = useUserContext();

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
      console.log(gameInfo);
    }
  }, [gameInfo]);

  useEffect(() => {
    setListing({ ...listing, gamesTrade: gameTradeList });
  }, [gameTradeList]);

  useEffect(() => {
    if (gameName && platformChosen) {
      setListing({
        ...listing,
        user: loggedUser,
        gameName: gameName,
        coverURL: `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`,
        platform: platformChosen.name,
      });
    }
  }, [gameName, platformChosen]);

  const handleNextBtn = () => {
    setPageState(pageState + 1);
  };

  const handleBackBtn = () => {
    setPageState(pageState - 1);
  };

  const handleTradeChange = (value) => {
    if (value) {
      setTradeAccepted(true);
      return;
    } else {
      setTradeAccepted(false);
      return;
    }
  };

  const handleSubmission = async () => {
    const res = await axios
      .post("/api/listings", { listing: listing })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });

    if (res.status === 200) {
      console.log("Listing created successfully");
      navigate("/");
    } else {
      setError("An error has occured. Listing could not be created.");
      navigate(0);
    }
  };

  let formStage = null;

  switch (pageState) {
    case 0:
      formStage = (
        <div className="flex flex-col">
          <div className="text-text-white text-lg pb-4">
            Choose a game and select the corresponding platform
          </div>
          <form className="flex flex-row space-x-4">
            <div className="w-2/3">
              <Autocomplete
                // value={gameName}
                onChange={(event, newValue) => {
                  setGameName(newValue.name);
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
                  placeholder="Platform"
                  sx={{
                    background: "#fff",
                    borderRadius: "5px",
                    "& .MuiFilledInput-root": {
                      paddingTop: 0,
                    },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
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
        <div className="flex flex-col">
          <div className="flex flex-row space-x-16">
            {/* left panel for image  */}
            <div className="w-1/4">
              <GameCover
                url={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`}
                platform={platformChosen.name}
                rounded={true}
                textSize="text-sm"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-8">
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <TextField
                    name="condition"
                    value={listing.condition}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    type="number"
                    label="Condition"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    select
                  >
                    <MenuItem key="New" value="New">
                      New
                    </MenuItem>
                    <MenuItem key="Used" value="Used">
                      Used
                    </MenuItem>
                  </TextField>
                </div>
                <div className="w-1/2">
                  <TextField
                    name="paymentMethod"
                    value={listing.paymentMethod}
                    onChange={handleInputChange}
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    type="number"
                    label="Payment Method"
                    variant="filled"
                    color="primary"
                    dark="true"
                    size="small"
                    select
                  >
                    <MenuItem key="Cash" value="Cash">
                      Cash
                    </MenuItem>
                    <MenuItem key="CreditCard" value="Credit Card">
                      Credit Card
                    </MenuItem>
                  </TextField>
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
        <div className="flex flex-col">
          <div className="flex flex-row space-x-16">
            {/* left panel for image  */}
            <div className="w-1/4 ">
              <GameCover
                url={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`}
                platform={platformChosen.name}
                rounded={true}
                textSize="text-sm"
                className=" shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <TextField
                    name="trade"
                    value={listing.trade}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleTradeChange(e.target.value);
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
                  </TextField>
                </div>
                <div className="w-1/2">
                  <TextField
                    name="delivery"
                    value={listing.delivery}
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
                    <MenuItem key="yes" value={true}>
                      Yes
                    </MenuItem>
                    <MenuItem key="no" value={false}>
                      No
                    </MenuItem>
                  </TextField>
                </div>
              </div>
              {tradeAccepted ? (
                <TradeGamesPanel
                  passTradeGamesList={(list) => {
                    setGameTradeList(list);
                  }}
                />
              ) : null}
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
              onClick={handleSubmission}
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
    <div>
      {/* <div className="text-text-white text-3xl">
        What game would you like to sell ?
      </div> */}
      <div className=" bg-bg-light rounded-lg shadow-md shadow-bg-dark flex flex-col space-y-6 p-10 mt-10">
        {formStage}
      </div>
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
        <CustomAlert type="error" message={error} fixed={true} timed={true} />
      </div>
    </div>
  );
}
