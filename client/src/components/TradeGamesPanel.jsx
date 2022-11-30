import { Autocomplete, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import useFetchGames from "../hooks/useFetchGames";
import useFetchGameInfo from "../hooks/useFetchGameInfo";

export default function TradeGamesPanel({ passTradeGamesList, initGameList }) {
  //final gamename chosen by the user
  const [gameList, setGameList] = useState(initGameList);
  const [gameTitleIV, setGameTitleIV] = useState("");
  const searchOptions = useFetchGames(gameTitleIV);

  useEffect(() => {
    passTradeGamesList(gameList);
  }, [gameList]);
  // const { gameInfo, done } = useFetchGameInfo(gameName);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1 grow">
        <div className="text-text-white">Games accepted for trade:</div>
        <Autocomplete
          multiple
          limitTags={1}
          // value={gameName}
          onChange={(event, newValue) => {
            console.log(event);
            console.log(newValue);
            setGameList(newValue);
          }}
          value={gameList}
          inputValue={gameTitleIV}
          onInputChange={(event, newInputValue) => {
            setGameTitleIV(newInputValue);
          }}
          className="grow pt-1"
          disablePortal
          sx={
            {
              // padding: "1%",
            }
          }
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
                  padding: "1%",
                },
              }}
            />
          )}
        />
      </div>

      <div className="grid laptop:grid-cols-6 desktop:grid-cols-5 gap-4">
        {gameList.map((game) => {
          return (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`}
              className="rounded-lg shadow-md shadow-bg-dark  "
            ></img>
          );
        })}
      </div>
    </div>
  );
}
