export default function validation(data) {
  let errors = {};

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (!data.email) {
    errors.email = "Debe colocar su email";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Debe ingresar un email válido";
  }

  if (!data.password) {
    errors.password = "Debe colocar su contraseña";
  }

  return errors;
}
