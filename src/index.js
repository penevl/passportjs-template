const express = require("express");
const app = express();
const passport = require("passport");
const { initialize } = require("./passport-conf");
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");
const rootRoute = require("../routes/rootRoute");
const { getUserByName, getUserById } = require("./users");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // Read form data
app.use(flash());
app.use(methodOverride("_method"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
initialize(passport, getUserByName, getUserById);

app.use("/", rootRoute);

app.listen(3300, () => {
    console.log("Server started");
});
