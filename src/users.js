require("dotenv").config();
const bcrypt = require("bcrypt");

var usersArray = [];

/**
 *
 * @param {String} username
 * @returns {{
 *      id: Number,
 *      username: String,
 *      password: String,
 * }}
 */
function getUserByName(username) {
    const users = getUsers();
    return users.find((user) => user.username === username);
}

/**
 *
 * @param {Number} id
 * @returns {{
 *      id: Number,
 *      username: String,
 *      password: String,
 * }}
 */
function getUserById(id) {
    const users = getUsers();
    return users.find((user) => user.id === id);
}

/** This function should always return an array of objects where each object has an id, username and a password. If this criteria is met auth will work.
 *
 * @returns {{
 *      id: Number,
 *      username: String,
 *      password: String,
 * }[]}
 */
function getUsers() {
    return usersArray;
}

/**
 *
 * @param {Number} id
 * @param {String} username
 * @param {String} password
 */
async function addUser(id, username, password) {
    const hashedPassword = await bcrypt.hashSync(
        password,
        Number(process.env.PASSWD_SALT_ROUNDS)
    );
    const userObj = {
        id: id,
        username: username,
        password: hashedPassword,
    };
    usersArray.push(userObj);
}

module.exports = { getUserById, getUserByName, getUsers, addUser };
