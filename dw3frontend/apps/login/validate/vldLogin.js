var validate = require("validate.js");


const constraints = {
  UserName: {
    presence: true,
      length: {
          minimum: 1,
          message: " é obrigatório!"
      }            
  },
  Password: {     
      length: {
          minimum: 1,
          message: " é obrigatório!"
      }
  },  
};


function Validar(formDataPar) {

    
    // Perform validation

    // Convert FormData to plain object
    // let formDataObject = {};
    // for (let [key, value] of formDataPar.entries()) {
    //     formDataObject[key] = value;
    // }
    const errors = validate(formDataPar, constraints);

    // Display validation errors if any
    if (errors) {
        const errorMessages = Object.values(errors).flat();            
        //alert(errorMessages[0]);
        return false;
    }
    return true;
}


module.exports = {
  constraints,
  Validar,
};
