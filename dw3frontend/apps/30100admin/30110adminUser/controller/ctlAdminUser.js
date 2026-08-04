const { Cookie } = require("express-session");
//const validate = require("../validate/vldAdminUser")
const axios = require("axios");



const ManutUsers = async (req, res) =>
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
    } else { //GET      
      var parametros = { title: "SIAD - Manutenção de usuários" }
      res.render("30100admin/30110adminUser/view/vwAdminUser.njk", { parametros });
    }
  })();


module.exports = {
  ManutUsers, 
};
