const mdlCursos = require("../model/mdlCursos");

const GetAllCursos = (req, res) =>
  (async () => {
    let registro = await mdlCursos.GetAllCursos();
    res.json({ status: "ok", registro: registro });
  })();

const GetCursoByID = (req, res) =>
  (async () => {
    const cursoID = parseInt(req.params.cursoid);
    let registro = await mdlCursos.GetCursoByID(cursoID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertCurso = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlCursos.InsertCurso(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateCurso = (request, res) =>
  (async () => {
    const cursoID = parseInt(request.params.cursoid);
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlCursos.UpdateCurso(cursoID, registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteCurso = (request, res) =>
  (async () => {
    const cursoID = parseInt(request.params.cursoid);
    let { msg, linhasAfetadas } = await mdlCursos.DeleteCurso(cursoID);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllCursos,
  GetCursoByID,
  InsertCurso,
  UpdateCurso,
  DeleteCurso
};
