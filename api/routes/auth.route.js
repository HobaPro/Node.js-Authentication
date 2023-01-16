const router = require("express").Router();
const path = require("path");

const Auth_Controller = require("../controllers/auth.controller");

router.post("/api/createaccount", Auth_Controller.CreateAccount);
router.post("/api/login", Auth_Controller.LogIn);

// Steam Auth
router.get("/api/steam-auth", Auth_Controller.SteamAuthPage);
router.get("/api/auth/steam/authenticate", Auth_Controller.SteamAuth);

module.exports = router;