/* eslint-disable */

export default (values) => {
  const errors = {};
  console.log(values);
  if (!values.category) {
    errors.category = "Category is required!";
  }
  if (!values.expense) {
    errors.expense = "Expense is required!";
  }
  if (!values.value) {
    errors.value = "Value for your expense is required!";
  }
  if (!values.date) {
    errors.date = "Date is required!";
  }
  console.log(errors);
  return errors;
};


