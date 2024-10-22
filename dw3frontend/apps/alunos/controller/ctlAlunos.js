const { Cookie } = require("express-session");
//const validate = require("../validate/vldAdminUser")
const axios = require("axios");



const ManutAlunos = async (req, res) =>
  (async () => {    
    if (req.method == "POST") {      
      const formData = req.body; 
      if (!validate.Validar(formData)) {
        return res.status(400).json({ status: "error", msg: "Dados de entrada validados" });
      };

      const resp = await axios.post(process.env.SERVIDOR_SIADBack + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {         
          return res.status(400).json({ status: "error", msg: error.response.data.msg });         
      });

      if (!resp.data) {
        return;
      }
      //console.log("[ctlLogin.js] Valor RESP.DATA:", resp.data);
      
     
      return res.json({ status: "ok", msg: "Login com sucesso!" });
    } else { 
      //@ GET 
      const resp = await axios.post(process.env.SERVIDOR_SIADBack + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {         
          return res.status(400).json({ status: "error", msg: error.response.data.msg });         
      });

      var parametros = { title: "SIAD - Manutenção de alunos" }
      var registros = [
        {Numero: 1, Name: "borodin", Age:33, City:"kiko"},
        {Numero: 2, Name: "belinha", Age:44, City:"Ferpa"},
        {Numero: 3, Name: "Pipoca", Age:123, City:"Mama"}
      ]
      res.render("alunos/view/vwAlunos.njk", { parametros, registros:resp });
    }
  })();


module.exports = {
  ManutAlunos, 
};
