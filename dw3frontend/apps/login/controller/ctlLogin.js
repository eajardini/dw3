const { Cookie } = require("express-session");
const validate = require("../validate/vldLogin")
const axios = require("axios");



const Login = async (req, res) =>
  (async () => {
    let remoteMSG = "sem mais informações";
    //req.session.destroy();
    if (req.method == "POST") {      
      const formData = req.body;      
      if (!validate.Validar(formData)) {
        return res.status(400).json({ status: "error", msg: "Dados de entrada validados" });
      };

      const resp = await axios.post(process.env.SERVIDOR_DW3Back + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 2000, //@ Define um, TIMEOUT de 2 segundos
      }).catch(error => {           
          if (error.code === "ECONNREFUSED" ) {            
            remoteMSG = "Servidor indisponível"
            return res.status(503).json({ status: "error", msg: "Erro ao fazer login: " + remoteMSG}); 
          }
          if (error.code === "ERR_BAD_REQUEST" ) {            
            remoteMSG = "Usuário não autenticado";
            return res.status(503).json({ status: "error", msg: "Erro ao fazer login: " + remoteMSG}); 
          }
          
          remoteMSG = error;
          return res.status(400).json({ status: "error", msg: "Erro ao fazer login: " + remoteMSG}); 
      });

      if (!resp.data) {
        return;
      }     
      
      session = req.session;
      session.isLogged = true;
      session.userName = resp.data.username;
      session.token = resp.data.token;
      session.tokenRefresh = resp.data.tokenRefresh;
      session.tempoInativoMaximoFront = process.env.tempoInativoMaximoFront;
      res.cookie("tempoInativoMaximoFront", process.env.tempoInativoMaximoFront, { sameSite: 'strict' });
      return res.json({ status: "ok", msg: "Login com sucesso!" });
    } else { //GET      
      var parametros = { title: "DW3 - Login", teste: "'192.168.13.1'", constraint: JSON.stringify(validate.constraints) }
      res.render("login/view/vwLogin.njk", parametros);
    }
  })();

function Logout(req, res) {
  session = req.session;
  session.isLogged = false;
  session.token = false;
  session.tokenRefresh = false;
  session.tempoInativoMaximoFront = false;
  
  req.session.destroy();    
  res.clearCookie("tempoInativoMaximoFront");   
  res.redirect("/Login");
}
module.exports = {
  Login,
  Logout,
};
