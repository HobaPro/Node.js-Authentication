const SteamAuth = require("node-steam-openid");
const Auth_Model = require("../models/auth.model");

steam = new SteamAuth({
    realm: "http://localhost:5000", // Site name displayed to users on logon
    returnUrl: "http://localhost:5000/api/auth/steam/authenticate", // Your return route
    apiKey: "8293F8D205DDC60DC8D42149F630E691" // Steam API key
});

class Auth_Controller{

    static async CreateAccount(req, res){
        res.contentType('application/json');

        const response = await Auth_Model.CreateAccount(req.body.userName, req.body.email, req.body.password, true);
        if(!response) res.status(400).send(response);
        else res.status(200).send(response);
    }

    static async LogIn(req, res){
        res.contentType('application/json');

        const response = await Auth_Model.LogIn(req.body.email, req.body.password);
        if(!response) res.status(400).send(response);
        else res.status(200).send(response);
    }

    static async LogOut(req, res){
        res.contentType('application/json');

        const isLogOut = await Auth_Model.LogOut();
        if(!isLogOut) res.status(400).send(isLogOut);
        else res.status(200).send(isLogOut);
    }

    static async SteamAuthPage(req, res){
        console.log(steam);
        const redirectUrl = await steam.getRedirectUrl();
        return res.redirect(redirectUrl);
    }

    static async SteamAuth(req, res){
        try{
            const user = await steam.authenticate(req);
            
            const response = await Auth_Model.CreateAccount(user.username, user.username, user.steamid, true);
            if(!response) res.status(400).send(response);
            else res.status(200).send(response);

        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = Auth_Controller;