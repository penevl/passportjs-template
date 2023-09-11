const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

function initialize(passport, getUser, getUserById) {
    const authUser = async (username, password, done) => {
        const user = getUser(username);
        if (user == null) {
            return done(null, false, { message: "Wrong username" });
        }
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Wrong password" });
        }
    };

    passport.use(new LocalStrategy(authUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = { initialize };
