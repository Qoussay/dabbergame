import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchGameInfo(gameName) {
  const [gameInfo, setGameInfo] = useState(null);
  const [done, setDone] = useState(true);

  useEffect(() => {
    async function getGameData() {
      setDone(false);
      const data = await axios
        .post(`/api/games/${gameName}`, { input: gameName })
        .catch((err) => {
          console.log(err);
        });

      await setGameInfo(data.data);

      setDone(true);
    }
    if (gameName) {
      getGameData();
    }
  }, [gameName]);

  return { gameInfo: gameInfo, done: done };
}
