export default function validationChange(data) {
    let errors = {};
  
    if (!data.change ||  data.change <= 0 || isNaN(data.change)) {
      errors.change = "Debe colocar un número positivo";
    }
  
    return errors;
  }
  