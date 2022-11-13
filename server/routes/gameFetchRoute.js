const router = require("express").Router();

const gameFetchController = require("../controllers/gameFetchController");

router.route("/").post(gameFetchController.getGames);

module.exports = router;
