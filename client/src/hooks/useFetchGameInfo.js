import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchGameInfo(gameId) {
  const [gameInfo, setGameInfo] = useState(null);
  const [done, setDone] = useState(true);

  useEffect(() => {
    async function getGameData() {
      setDone(false);
      const data = await axios
        .post(`/api/games/${gameId}`, { input: gameId })
        .catch((err) => {
          console.log(err);
        });

      await setGameInfo(data.data);

      console.log(data.data);

      setDone(true);
    }
    if (gameId) {
      getGameData();
    }
  }, [gameId]);

  return { gameInfo: gameInfo, done: done };
}
