import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchGameInfo(gameName) {
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    async function getGameData() {
      let temp;
      const data = await axios
        .post(`/api/games/${gameName}`, { input: gameName })
        .catch((err) => {
          console.log(err);
        });

      await setGameInfo(data.data);

      //   temp = data.data;

      //   const coverUrl = await axios
      //     .post(`/api/games/${gameName}/${temp.cover}`, {
      //       input: temp.cover,
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

      //   //   console.log(coverUrl.data[0]);

      //   await setGameInfo({
      //     ...gameInfo,
      //     coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverUrl.data[0].image_id}.png`,
      //   });
    }

    // async function getGameCover() {
    //   const coverUrl = await axios
    //     .post(`/api/games/${gameName}/${gameInfo.cover}`, {
    //       input: gameInfo.cover,
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   setGameInfo({
    //     ...gameInfo,
    //     coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverUrl.data.image_id}`,
    //   });
    // }
    if (gameName) {
      getGameData();

      //   getGameCover();
    }
  }, [gameName]);

  return gameInfo;
}
