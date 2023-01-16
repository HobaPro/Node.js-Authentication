const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

//app.use(express.static(__dirname + '/assets'));

const authRouter = require("./api/routes/auth.route");

app.use(authRouter);

app.listen(5000, err => {
    if(err) console.log(err);
})