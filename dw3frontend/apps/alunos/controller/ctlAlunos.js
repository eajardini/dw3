const axios = require("axios");
const moment = require("moment");




const manutAlunos = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de alunos
    const userName = req.session.userName;
    const token = req.session.token;
    //console.log("[ctlAlunos|ManutAlunos] Valor token:" + token)
    // try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAlunos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Set JWT token in the header
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível"

      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";

      } else {
        remoteMSG = error;
      }
      res.render("alunos/view/vwManutAlunos.njk", {
        title: "Manutenção de alunos",
        data: null,
        erro: remoteMSG, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }


    res.render("alunos/view/vwManutAlunos.njk", {
      title: "Manutenção de alunos",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertAlunos = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      //@ Busca os cursos disponíveis
      const cursos = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      });

      return res.render("alunos/view/vwFCrAlunos.njk", {
        title: "Cadastro de alunos",
        data: null,
        erro: null, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        curso: cursos.data.registro,
        userName: null,
      });

    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertAlunos", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // @ 5 segundos de timeout
        });

        //console.log('[ctlAlunos|InsertAlunos] Dados retornados:', response.data);

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: response.data,
          erro: null,
        });
      }
    }
  })();

const ViewAlunos = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAlunoByID",
          {
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlAlunos|ViewAlunos] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("alunos/view/vwFRUDrAlunos.njk", {
            title: "Visualização de alunos",
            data: response.data.registro[0],
            disabled: true,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlAlunos|ViewAlunos] ID de aluno não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlAlunos.js|ViewAlunos] Aluno não localizado!" });
      console.log(
        "[ctlAlunos.js|viewAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const UpdateAluno = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAlunoByID",
          {
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlAlunos|UpdateAluno] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("alunos/view/vwFRUDrAlunos.njk", {
            title: "Atualização de dados de alunos",
            data: response.data.registro[0],
            disabled: false,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlAlunos|UpdateAluno] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;
        // console.log("[ctlAlunos|UpdateAluno] Valor regData:", JSON.stringify(regData));
        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateAlunos", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000, // @ 5 segundos de timeout
          });

          //console.log('[ctlAlunos|InsertAlunos] Dados retornados:', response.data);

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlAlunos.js|UpdateAluno] Erro ao atualiza dados de alunos no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlAlunos.js|UpdateAluno] Aluno não localizado!" });
      console.log(
        "[ctlAlunos.js|UpdateAluno] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteAluno = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const token = req.session.token;
    //console.log("[ctlAlunos|DeleteAluno] Valor regData:", JSON.stringify(regData));

    try {
      // @ Enviando dados para o servidor Backend
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteAlunos", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // @ 5 segundos de timeout
      });

      //console.log('[ctlAlunos|DeleteAluno] Dados retornados:', response.data);

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlAlunos.js|DeleteAluno] Erro ao deletar dados de alunos no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
      });
    }
  })();

module.exports = {
  manutAlunos,
  insertAlunos,
  ViewAlunos,
  UpdateAluno,
  DeleteAluno
};
