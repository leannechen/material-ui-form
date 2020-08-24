import { db } from './services/firebase';

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

export const editSingleJob = (payload) => ({
  ...payload,
  type: 'EDIT_SINGLE_JOB',
});

export const submitSingleJob = (payload) => ({
  ...payload,
  type: 'SUBMIT_SINGLE_JOB',
});

export const setFieldsInvalidMsg = (payload) => ({
  ...payload,
  type: 'SET_FIELDS_INVALID_MSG',
});

export const rehydrateOverallData = (payload) => ({
  ...payload,
  type: 'REHYDRATE_OVERALL_DATA',
});

export const saveOverallForm = () => {

  return (dispatch, getState) => {
    const { jobList, personalForm } = getState();
    const personalData = Object.keys(personalForm)
      .reduce((acc, fieldName) => {
        return {
          ...acc,
          [fieldName]: personalForm[fieldName].value,
        }
      }, {});
    const allData = {
      ...personalData,
      jobList,
    };

    // todo: turn isPosting on
    return db.collection("profiles")
      .add(allData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem('glints-form', docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

  }
};

export const requestOverallForm = (firebaseDataId) => {
  console.log(firebaseDataId);

  return (dispatch, getState) => {
    return db.collection("profiles")
      .doc(firebaseDataId)
      .get()
      .then(doc => {
        const response = doc.data();
        if(typeof response === "object") {
          dispatch(rehydrateOverallData(response));
        } else {
         // back to welcome view
        }
      })
  }

};
