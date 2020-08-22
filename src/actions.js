// Personal Form
export const changeInputValue = ({ formName, fieldName, value }) => ({
  type: 'CHANGE_INPUT_VALUE',
  formName,
  fieldName,
  value,
});

export const changeDatePickerValue = (payload) => ({
  ...payload,
  type: 'CHANGE_DATE_PICKER_VALUE',
});
