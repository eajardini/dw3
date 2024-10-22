



function windowOnLoad() {

  if (!Cookies.get("token")) {
    // Cookies.set("token", "{{parametros[0]['Token']}}");    
    // $(valorTokenCookie).val(Cookies.get('token'));
    console.log("[siad.js|window.onload] Evento onload com !Cookie")
    //window.open("/login");
  } else {
    // $(valorTokenCookie).val(Cookies.get('token'));    
    console.log("[siad.js|window.onload] Evento onload com else")
  }
};

function siadLogout() {  
  Cookies.remove('isLogged');  
  localStorage.clear();
  window.open("/Logout", "_self");
}

function siadCryptValue(valuePar, operPar) { 

  if (operPar == "c") {
    const encrypted = window.btoa('valuePar');
    return encrypted;
  } else {
    // const bytes = window.btoa('valuePar');
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const decrypted =  window.atob('valuePar');
    return decrypted;
  }
}

