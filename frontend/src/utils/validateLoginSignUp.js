/* eslint-disable */
export default (values, form) => {
  console.log(values, form);
  const errors = {};
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!values.email) {
    errors.email = "Email is required!";
  }
  if (!regexEmail.test(values.email)) {
    errors.email = "Make sure you enter a correct email!";
  }
  if (!values.password) {
    errors.password = "Password is required!";
  }
  if (values.password.length < 3) {
    errors.password = "Password must contain at least 3 characters";
  }
  if (form && !values.passwordConfirm) {
    errors.passwordConfirm = "Confirmation password is required!";
  }
  if (
    values.password &&
    values.passwordConfirm &&
    values.password !== values.passwordConfirm
  ) {
    errors.passwordConfirm =
      "Your confirmation password must match your password!";
  }else{console.log("top")}
  console.log(errors);
  return errors;
};
