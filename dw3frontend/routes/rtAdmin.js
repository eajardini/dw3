var express = require("express");
var adminRouter = express.Router();

var AdminUserApp = require("../apps/30100admin/30110adminUser/controller/ctlAdminUser");

//@ Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  //@ Verificar se existe uma sessão válida  
  isLogged = req.session.isLogged;

  if (!isLogged) {
    return res.redirect("/Login");
  }
  next();
};

adminRouter.get("/manutUsers", authenticationMiddleware, AdminUserApp.ManutUsers);

adminRouter.get('/open:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID ${userId}`);
});

module.exports = adminRouter;
