var axios = require("axios");
require("dotenv").config();

exports.getGames = async (req, res) => {
  var data = `fields id,name,cover,platforms ; search "${req.body.input}"; limit 5;`;
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
