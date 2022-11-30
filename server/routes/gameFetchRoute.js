const router = require("express").Router();

const gameFetchController = require("../controllers/gameFetchController");

router.route("/").post(gameFetchController.getGames);
router.route("/:id").post(gameFetchController.getGameInfo);

module.exports = router;
