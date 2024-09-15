const db = require("../../../database/databaseconfig");

const getAllAlunos = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = alunos.cursoid)" +
        "FROM alunos where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getAlunoByID = async (alunoIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = alunos.cursoid)" +
        "FROM alunos WHERE alunoid = $1 and deleted = false ORDER BY nome ASC",
      [alunoIDPar]
    )
  ).rows;
};

const insertAlunos = async (alunoREGPar) => {
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
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateAlunos = async (alunoREGPar) => {
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
          alunoREGPar.alunoid,
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
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE alunos SET " + "deleted = true " + "WHERE alunoid = $1",
      [alunoREGPar.alunoid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAlunos|insertAlunos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  UpdateAlunos,
  DeleteAlunos,
};
