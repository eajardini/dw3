//-- arquivo apps/alunos/controller/ctlAlunos.js

const mdlAlunos = require("../model/mdlAlunos");

const GetAllAlunos = (req, res) =>
  (async () => {
    let registro = await mdlAlunos.GetAllAlunos();
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i]; // Current row      
      const formattedDate = row.datanascimento.toISOString().split('T')[0];
      row.datanascimento = formattedDate;
      
    }
    res.json({ status: "ok", "registro": registro });
  })();

const GetAlunoByID = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.params.alunoid);
    let registro = await mdlAlunos.GetAlunoByID(alunoID);


    res.json({ status: "ok", "registro": registro });
  })();

const InsertAluno = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlunos.InsertAluno(alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const UpdateAluno = (request, res) =>
  (async () => {
    const alunoID = parseInt(request.params.alunoid);
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlunos.UpdateAluno(alunoID, alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const DeleteAluno = (request, res) =>
  (async () => {
    const alunoID = parseInt(request.params.alunoid);
    let { msg, linhasAfetadas } = await mdlAlunos.DeleteAluno(alunoID);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  GetAllAlunos,
  GetAlunoByID,
  InsertAluno,
  UpdateAluno,
  DeleteAluno
};
