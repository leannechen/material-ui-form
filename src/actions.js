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

export const submitSingleJob = (payload) => ({
  ...payload,
  type: 'SUBMIT_SINGLE_JOB',
});

export const setFieldsInvalidMsg = (payload) => ({
  ...payload,
  type: 'SET_FIELDS_INVALID_MSG',
});

export const submitOverallForm = () => {
  const mockData = {
    name: "George",
    age: 64,
    avatarImg: "",
    jobList: [
      {
        jobTitle: "Data Analyst 1",
        company: "Apple",
        companyLogo: "https://source.unsplash.com/random/400x300",
        startDate: "2019/6/1",
        endDate: "2019/12/31",
        isCurrent: false,
        jobDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet architecto at dolor ea iste nam quo similique vitae voluptas? Eum ipsam obcaecati perferendis porro provident quam, velit voluptate voluptatibus perferendis porro provident quam, velit voluptate voluptatibus."
      },
      {
        jobTitle: "Data Analyst 2",
        company: "BeeHappy",
        companyLogo: "https://source.unsplash.com/random/400x300",
        startDate: "2020/2/1",
        endDate: "",
        isCurrent: true,
        jobDesc: "We are going to use axios to fetch data, but it is up to you to use another data fetching library or the native fetch API of the browser."
      }
    ]
  };
  console.log('he')
  return (dispatch, getState) => {
    console.log(dispatch);
    console.log(getState());
    // console.log(getState)
    // todo: turn isPosting on
    return db.collection("profiles")
      .add(mockData)
      .then(function(docRef) {
        // todo: save uid to localStorage
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem('glints-form', docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

  }
};
