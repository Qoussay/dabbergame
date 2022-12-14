var axios = require("axios");
require("dotenv").config();

exports.getGames = async (req, res) => {
  var data = `fields id,name,first_release_date, cover.image_id; search "${req.body.input}"; 
    limit 10; where platforms != null & cover != null & total_rating != null;`;
  var config = {
    method: "post",
    url: "https://api.igdb.com/v4/games",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "text/plain",
    },
    data: data,
  };
  const result = await axios(config);

  //   return result.data;
  res.json(result.data);
};

exports.getGameInfo = async (req, res) => {
  var data = `fields id,name,first_release_date, cover.image_id, platforms.name ; where id=${req.body.input} & total_rating != null; sort follows asc;`;
  var config = {
    method: "post",
    url: "https://api.igdb.com/v4/games",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "text/plain",
    },
    data: data,
  };
  const result = await axios(config);

  let gameInfo = result.data[0];

  // await getPlatformList(gameInfo.platforms);
  // console.log(gameInfo);
  res.json(gameInfo);
};

// const getGameCover = async (coverId) => {
//   var data = `fields image_id ; where id=${coverId}; `;
//   var config = {
//     method: "post",
//     url: "https://api.igdb.com/v4/covers",
//     headers: {
//       "Client-ID": process.env.CLIENT_ID,
//       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//       "Content-Type": "text/plain",
//     },
//     data: data,
//   };
//   const result = await axios(config);

//   const coverUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${result.data[0].image_id}.png`;

//   return coverUrl;
// };

// const getPlatformName = async (platformId) => {
//   var data = `fields name ; where id=${platformId}; `;
//   var config = {
//     method: "post",
//     url: "https://api.igdb.com/v4/platforms",
//     headers: {
//       "Client-ID": process.env.CLIENT_ID,
//       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//       "Content-Type": "text/plain",
//     },
//     data: data,
//   };
//   const result = await axios(config);

//   return result.data[0].name;
// };

// const getPlatformList = async (platformArray) => {
//   if (platformArray) {
//     for (let index = 0; index < platformArray.length; index++) {
//       const platformId = platformArray[index];
//       // let name = await getPlatformName(platformId);
//       if (name === "PC (Microsoft Windows)") name = "PC";
//       platformArray[index] = name;
//     }
//   } else {
//     return null;
//   }
// };
