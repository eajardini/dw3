const mdlCursos = require("../model/mdlCursos");

const GetAllCursos = (req, res) =>
  (async () => {
    let registro = await mdlCursos.GetAllCursos();
    res.json({ status: "ok", registro: registro });
  })();

const GetCursoByID = (req, res) =>
  (async () => {
    const cursoID = parseInt(req.body.cursoid);
    let registro = await mdlCursos.GetCursoByID(cursoID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertCursos = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlCursos.InsertCursos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateCursos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlCursos.UpdateCursos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteCursos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlCursos.DeleteCursos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllCursos,
  GetCursoByID,
  InsertCursos,
  UpdateCursos,
  DeleteCursos
};
