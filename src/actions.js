// Personal Form
export const changeInputValue = ({ formName, fieldName, value }) => ({
  type: 'CHANGE_INPUT_VALUE',
  formName,
  fieldName,
  value,
});
