let checkLogin = require("./auth/checkLogin");
let login = require("./auth/login");
let registration = require("./auth/registration");
let logout = require("./auth/logout");
let redirectLogged = require("./auth/redirectLogged");

module.exports = {login, registration, checkLogin, logout, redirectLogged};
