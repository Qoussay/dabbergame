import { useEffect, useState } from "react";
import Button from "../components/Button";
import GameCover from "../components/GameCover";
import TradeGamesPanel from "../components/TradeGamesPanel";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import useFetchGames from "../hooks/useFetchGames";
import useFetchGameInfo from "../hooks/useFetchGameInfo";
export default function AddListingPage() {
  // this state will keep track of the page state
  const [pageState, setPageState] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [gameName, setGameName] = useState("");
  const [listing, setListing] = useState({});
  const [tradeAccepted, setTradeAccepted] = useState(false);

  const searchOptions = useFetchGames(inputValue);
  const { gameInfo, done } = useFetchGameInfo(gameName);

  useEffect(() => {
    console.log(gameInfo);
  }, [gameInfo]);

  const handleNextBtn = () => {
    setPageState(pageState + 1);
  };

  const handleBackBtn = () => {
    setPageState(pageState - 1);
  };

  const handleTradeChange = (e) => {
    if (e.target.value === "yes") {
      setTradeAccepted(true);
      return;
    } else {
      setTradeAccepted(false);
      return;
    }
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
            <Autocomplete
              value={gameName}
              onChange={(event, newValue) => {
                setGameName(newValue);
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
            <input
              type="text"
              className=" pl-5 py-0.5 w-1/4 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none"
              placeholder="Platform"
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
                platform="playstation5"
                rounded={true}
                textSize="text-base"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-3">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-1/2 space-y-1">
                  <div className="text-text-white">Condition</div>
                  <select className="px-3 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none">
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2 space-y-1">
                  <div className="text-text-white">Payment Method</div>
                  <select className="px-3 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none">
                    <option value="cash">Cash</option>
                    <option value="visa">Visa</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-1/2 space-y-1">
                  <div className="text-text-white">Price</div>
                  <input
                    type="number"
                    className="pl-5 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none"
                    placeholder="Price"
                  />
                </div>
                <div className="flex flex-col w-1/2 space-y-1">
                  <div className="text-text-white">State</div>
                  <select className="px-3 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none">
                    <option value="benArous">Ben Arous</option>
                    <option value="tunis">Tunis</option>
                    <option value="manouba">Manouba</option>
                    <option value="bizerte">Bizerte</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row grow">
                <div className="flex flex-col grow">
                  <div className="text-text-white">Description</div>
                  <textarea
                    value=""
                    className="focus:shadow-accent focus:border-accent focus:outline-none rounded-lg pl-5 px-0.5 h-full"
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
                platform="playstation5"
                rounded={true}
                textSize="text-base"
                className="shadow-md shadow-bg-dark"
              />
            </div>
            {/* right panel  */}
            <div className="w-3/4 flex flex-col space-y-8">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-1/2 space-y-1">
                  <div className="text-text-white">Trade</div>
                  <select
                    onChange={handleTradeChange}
                    className="px-3 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none"
                  >
                    <option value="yes">Yes</option>
                    <option selected value="no">
                      No
                    </option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2 space-y-1">
                  <div className="text-text-white">Delivery</div>
                  <select className="px-3 py-0.5 rounded-full h-8 focus:shadow-accent focus:border-accent focus:outline-none">
                    <option value="yes">Yes</option>
                    <option selected value="no">
                      No
                    </option>
                  </select>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!done}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
    </div>
  );
}
