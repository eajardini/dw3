const db = require("../../../database/databaseconfig");

const GetAllCursos = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM cursos where deleted = false ORDER BY descricao ASC"
    )
  ).rows;
};

const GetCursoByID = async (cursoIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM cursos WHERE cursoid = $1 and deleted = false ORDER BY descricao ASC",
      [cursoIDPar]
    )
  ).rows;
};

const InsertCurso = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO cursos " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.descricao,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCursos|InsertCurso] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateCurso = async (cursoIDPar, registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE cursos SET " +
          "codigo = $2, " +
          "descricao = $3, " +
          "ativo = $4, " +
          "deleted = $5 " +          
          "WHERE cursoid = $1",
        [
            cursoIDPar,
            registroPar.codigo,
            registroPar.descricao,
            registroPar.ativo,
            registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCursos|UpdateCurso] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteCurso = async (cursoIDPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE cursos SET " + "deleted = true " + "WHERE cursoid = $1",
      [cursoIDPar]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlCursos|DeleteCurso] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllCursos,
  GetCursoByID,
  InsertCurso,
  UpdateCurso,
  DeleteCurso,
};
