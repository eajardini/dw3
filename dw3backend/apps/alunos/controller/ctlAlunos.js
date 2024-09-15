const mdlAlunos = require("../model/mdlAlunos");

const getAllAlunos = (req, res) =>
  (async () => {
    let registro = await mdlAlunos.getAllAlunos();
    res.json({ status: "ok", "registro": registro });
  })();

const getAlunoByID = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.body.alunoid);
    let registro = await mdlAlunos.getAlunoByID(alunoID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertAlunos = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const alunoREG = request.body;    
    let { msg, linhasAfetadas } = await mdlAlunos.insertAlunos(alunoREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let  { msg, linhasAfetadas } = await mdlAlunos.UpdateAlunos(alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlunos.DeleteAlunos(alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  updateAlunos,
  DeleteAlunos
};
