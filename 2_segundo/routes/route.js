const express = require("express");
const routerApp = express.Router();

const appHello = require("../controller/ctlHello");

routerApp.get("/", appHello.hello);
routerApp.get("/helloUserGet/:nome", appHello.helloUserGet);
routerApp.post("/helloUserPost", appHello.helloUserPost);

module.exports = routerApp;
