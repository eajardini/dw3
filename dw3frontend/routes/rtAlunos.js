var express = require('express');
var router = express.Router();
var alunosApp = require("../apps/alunos/controller/ctlAlunos")



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/ManutAlunos', authenticationMiddleware, alunosApp.manutAlunos)
router.get('/InsertAlunos', authenticationMiddleware, alunosApp.insertAlunos);
router.get('/ViewAlunos/:id', authenticationMiddleware, alunosApp.ViewAlunos);
router.get('/UpdateAlunos/:id', authenticationMiddleware, alunosApp.UpdateAluno);

/* POST métodos */
router.post('/InsertAlunos', authenticationMiddleware, alunosApp.insertAlunos);
router.post('/UpdateAlunos', authenticationMiddleware, alunosApp.UpdateAluno);
router.post('/DeleteAlunos', authenticationMiddleware, alunosApp.DeleteAluno);
// router.post('/viewAlunos', authenticationMiddleware, alunosApp.viewAlunos);


module.exports = router;