import axios from "axios";
import { useEffect, useState } from "react";
export default function useFetchGames(searchString) {
  const [gameSearch, setGameSearch] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchData(searchString);
      setGameSearch(data);
    }
    if (searchString) {
      //   setGameSearch(["Searching ..."]);
      //   try {
      //     getData();
      //   } catch {
      //     setGameSearch(["Try again please."]);
      //   }
      getData();
    }
  }, [searchString]);

  return gameSearch;
}

const generateSearchOptions = (array) =>
  array.map(
    (item) => item.name
    // `${item.name} (${
    //   item.first_release_date
    //     ? new Date(item.first_release_date * 1000).getFullYear()
    //     : "#"
    // })`
  );

async function fetchData(searchString) {
  const res = await axios
    .post("/api/games", { input: searchString })
    .catch((err) => {
      console.log(err);
    });

  return res.data;
}
