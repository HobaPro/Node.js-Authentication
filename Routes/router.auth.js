const router = require("express").Router();
const path = require("path");

const Controller_Auth = require("../Controllers/controller.auth");

/*router.get("/", (req, res) => {

})*/

router.post("/api/createaccount", Controller_Auth.CreateAccount);
router.post("/api/login", Controller_Auth.LogIn);
router.post("/api/logout", Controller_Auth.LogOut);

// Steam Auth
router.get("/api/steam-auth", Controller_Auth.SteamAuthPage)
router.get("/api/auth/steam/authenticate", Controller_Auth.SteamAuth)

module.exports = router;