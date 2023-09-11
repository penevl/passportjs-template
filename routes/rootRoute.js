const express = require("express");
const router = express.Router();
const passport = require("passport");
const { addUser } = require("../src/users");

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

router.get("/", checkAuthenticated, (req, res) => {
    res.render("index", {
        users: [
            {
                id: 123456,
                username: "elduko",
                password: "gay",
            },
        ],
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const id = Number(Date.now().toString());
    const username = req.body.username;
    const password = req.body.password;
    await addUser(id, username, password);
    res.redirect("/login");
});

router.delete("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.error(`Failed to logout user ${req.user.username}`);
        }
    });
    res.redirect("/login");
});

module.exports = router;
