//-- arquivo apps/alunos/model/mdlAlunos.js

const db = require("../../../database/databaseconfig");

const GetAllAlunos = async () => {
  return (
    await db.query(
      "SELECT *,(SELECT descricao from CURSOS where cursoid = alunos.cursoid)" +
        "FROM alunos where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const GetAlunoByID = async (alunoIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = alunos.cursoid)" +
        "FROM alunos WHERE alunoid = $1 and deleted = false ORDER BY nome ASC",
      [alunoIDPar]
    )
  ).rows;
};

const InsertAluno = async (alunoREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO alunos " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|InsertAluno] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateAluno = async (alunoIDPar, alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE alunos SET " +
          "prontuario = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "rendafamiliar = $5, " +
          "datanascimento = $6, " +
          "cursoid = $7, " +
          "deleted = $8 " +
          "WHERE alunoid = $1",
        [
           alunoIDPar,
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|UpdateAluno] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteAluno = async (alunoIDPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE alunos SET " + "deleted = true " + "WHERE alunoid = $1",
      [alunoIDPar]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAlunos|DeleteAluno] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  GetAllAlunos,
  GetAlunoByID,
  InsertAluno,
  UpdateAluno,
  DeleteAluno,
};
