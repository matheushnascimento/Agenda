const express = require("express");
const routes = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");

//Rotas da home
routes.get("/", homeController.index);

//Rotas de login
routes.get("/login", loginController.index);

module.exports = routes;
