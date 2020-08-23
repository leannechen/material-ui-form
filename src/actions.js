// Personal Form
export const changeInputValue = (payload) => ({
  ...payload,
  type: 'CHANGE_INPUT_VALUE',
});

export const changeDatePickerValue = (payload) => ({
  ...payload,
  type: 'CHANGE_DATE_PICKER_VALUE',
});

export const toggleIsCurrentJob = (payload) => ({
  ...payload,
  type: 'TOGGLE_IS_CURRENT_JOB',
});

export const submitSingleJob = (payload) => ({
  ...payload,
  type: 'SUBMIT_SINGLE_JOB',
});

export const setFieldsInvalidMsg = (payload) => ({
  ...payload,
  type: 'SET_FIELDS_INVALID_MSG',
});

export const submitOverallForm = (payload) => ({
  ...payload,
  type: 'SUBMIT_OVERALL_FORM',
});
