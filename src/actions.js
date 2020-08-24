import { db, storageRef } from './services/firebase';

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

export const deleteSingleJob = (payload) => ({
  ...payload,
  type: 'DELETE_SINGLE_JOB',
});

export const submitSingleJob = (payload) => ({
  ...payload,
  type: 'SUBMIT_SINGLE_JOB',
});

export const resetJobForm = (payload) => ({
  ...payload,
  type: 'RESET_JOB_FORM',
});

export const setFieldsInvalidMsg = (payload) => ({
  ...payload,
  type: 'SET_FIELDS_INVALID_MSG',
});

export const rehydrateOverallData = (payload) => ({
  ...payload,
  type: 'REHYDRATE_OVERALL_DATA',
});

export const setAvatarSrc = (payload) => ({
  ...payload,
  type: 'SET_AVATAR_SRC',
});

export const setLogoSrc = (payload) => ({
  ...payload,
  type: 'SET_LOGO_SRC',
});


export const saveOverallForm = () => {

  return (dispatch, getState) => {
    const { jobList, personalForm, firebaseDataId } = getState();
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

    if(firebaseDataId) {
      const profileDoc = db.collection("profiles").doc(firebaseDataId);
      return profileDoc
        .update(allData)
        .then(function(docRef) {
          alert('Updated successfully!');
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    } else {
      // todo: turn isPosting on
      const collection = db.collection("profiles");
      return collection
        .add(allData)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          localStorage.setItem('glints-form', docRef.id);
          alert('Profile created!');
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }

  }
};

export const requestOverallForm = (firebaseDataId) => {

  return (dispatch, getState) => {
    return db.collection("profiles")
      .doc(firebaseDataId)
      .get()
      .then(doc => {
        const response = doc.data();
        if(typeof response === "object") {
          dispatch(rehydrateOverallData({
            ...response,
            firebaseDataId,
          }));
        }
      })
  }

};

export const uploadAvatar = (file) => {
  return (dispatch) => {

    const timestamp = new Date().getTime();
    const avatarRef = storageRef.child(`avatars/${timestamp}.jpg`);
    return avatarRef
      .put(file)
      .then(function(snapshot) {
        snapshot.ref.getDownloadURL()
          .then((url) => {
            dispatch(setAvatarSrc({ url }));
          })
      });
  }
};

export const uploadLogo = (file) => {
  return (dispatch) => {

    const timestamp = new Date().getTime();
    const logoRef = storageRef.child(`logos/${timestamp}.jpg`);
    return logoRef
      .put(file)
      .then(function(snapshot) {
        snapshot.ref.getDownloadURL()
          .then((url) => {
            dispatch(setLogoSrc({ url }));
          })
      });
  }
};
