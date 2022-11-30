import { Autocomplete, TextField, Box } from "@mui/material";
import platforms from "../mock/platforms.json";
import states from "../mock/states.json";
export default function SortAndFilter({ className, listingId }) {
  return (
    <form className={`flex flex-row space-x-5 ${className} place-items-center`}>
      <Autocomplete
        className="w-1/5"
        disablePortal
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled
            variant="filled"
            color="primary"
            dark="true"
            size="small"
            placeholder="Sort By:"
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

      <p className="text-3xl text-text-white ">|</p>
      <Autocomplete
        className="w-1/5"
        disablePortal
        options={platforms}
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
            size="small"
            placeholder="All Platforms"
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
      <Autocomplete
        className="w-1/5"
        disablePortal
        options={states}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="primary"
            dark="true"
            size="small"
            placeholder="All Tunisia"
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
      <Autocomplete
        className="w-1/5"
        disablePortal
        options={["New", "Used"]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="primary"
            dark="true"
            size="small"
            placeholder="Any Condition"
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
  );
}
