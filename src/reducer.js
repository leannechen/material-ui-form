
const initialState = {
  personalForm: {
    name: {
      value: "",
      validateReg: "",
      invalidMsg: "", // error hint. if not empty, then it has error
      touched: false,
    },
    age: {
      value: 0,
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    avatarImg: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
  },
  jobForm: {
    jobTitle: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    company: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    companyLogo: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    startDate: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    endDate: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    jobDesc: {
      value: "",
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
  },
  jobList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
    default:
      return state
  }
};

export default reducer;
