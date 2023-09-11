# A template for passportjs

This template provides a fully configured expressjs server with passportjs-local for authentication. To use this template just click on `Use this template -> Create a new repository` or download it localy with `git clone https://github.com/penevl/passportjs-template`.

# Configuration

To configure everything just change the values in the `.env` file and thats it. For development the default ones will work just fine.

# Protecting routes

To protect a route just add the `checkAuthenticated` middleware located in the `rootRoute.js` file to any route you want to protect

# Structure

The most important file you will have to touch is probably `users.js` since that contains all the functions related to getting and adding users. Here are the two most important functions in there.

## getUsers()

The getUsers function should allways return an array of objects where each object contains at least three field:

1. id - Number
2. username - String
3. password - String - Also needs to be hashed.

These are the theree fields which are needed for user auth to work properly. You can add as many other fields as you want but these are mandatory to have.

## addUser(...)

The addUser(...) takes in three arguments:

1. id - Number
2. username - String
3. password - String

These then get converted to an object and saved to an array which resets any time the application restarts. The password also gets hashed which makes it safe to store in a DB if you decide to hook it up to one.

## Login and Register forms

The login and regiter forms should allways have two fields:

1. username
2. password
