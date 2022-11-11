import { Autocomplete, TextField } from "@mui/material";
export default function SortAndFilter({ className }) {
  const sortOptions = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    { value: "option3", label: "option3" },
    { value: "option4", label: "option4" },
    { value: "option5", label: "option5" },
  ];
  return (
    <form className={`flex flex-row space-x-5 ${className} place-items-center`}>
      <Autocomplete
        className="w-1/5"
        disablePortal
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="primary"
            dark
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
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="primary"
            dark
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
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="primary"
            dark
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
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="primary"
            dark
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
