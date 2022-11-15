import Button from "./Button";
import {
  TextField,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import states from "../mock/states.json";
import platforms from "../mock/platforms.json";

export default function Hero() {
  const platformNames = [];
  platforms.map((platform) => {
    platformNames.push(platform.name);
  });
  return (
    <div className="mb-16 space-y-12">
      {/* title of the hero section */}
      <h1 className="text-2xl w-1/2 mx-auto text-center text-text-white font-semibold leading-relaxed">
        Find all the game listings and deals you want and more!
      </h1>
      {/* container for the form  */}
      <form className="bg-bg-light w-full rounded-lg shadow-md shadow-bg-dark flex flex-col p-10 space-y-8">
        {/* check boxes for trading and selling  */}
        <div className="flex flex-row space-x-8 text-text-white">
          <FormControlLabel
            className="w-fit"
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: "#E5F0F4",
                  "&.Mui-checked": {
                    color: "#47DDC2",
                  },
                }}
              />
            }
            label="For Sale"
          />
          <FormControlLabel
            className="w-fit"
            control={
              <Checkbox
                sx={{
                  color: "#E5F0F4",
                  "&.Mui-checked": {
                    color: "#47DDC2",
                  },
                }}
              />
            }
            label="For Trade"
          />
        </div>

        {/* search fields  */}
        <div className="flex flex-row space-x-6">
          <div className="flex-auto flex grow flex-row">
            <Autocomplete
              className="w-1/4"
              disablePortal
              options={platformNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  color="primary"
                  dark="true"
                  size="small"
                  label="Platform"
                  sx={{
                    background: "#fff",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                />
              )}
            />
            <Autocomplete
              className="grow"
              disablePortal
              options={states}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  color="primary"
                  dark="true"
                  size="small"
                  label="Game"
                  sx={{
                    background: "#fff",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    borderLeft: 1,
                  }}
                />
              )}
            />
          </div>
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
                label="State"
                sx={{
                  background: "#fff",
                  borderRadius: "5px",
                }}
              />
            )}
          />
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
    </div>
  );
}
