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
      getData();
    }
  }, [searchString]);

  return gameSearch;
}

const generateSearchOptions = (array) => array.map((item) => item.name);

async function fetchData(searchString) {
  const res = await axios
    .post("/api/games", { input: searchString })
    .catch((err) => {
      console.log(err);
    });

  return generateSearchOptions(res.data);
}
