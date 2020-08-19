
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
      value: null,
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    endDate: {
      value: null,
      validateReg: "",
      invalidMsg: "",
      touched: false,
    },
    isCurrent: {
      value: false,
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
  /*
      {
      jobTitle: "Data Analyst",
      company: "Verizon Media",
      companyLogo: "https://source.unsplash.com/random/400x300",
      startDate: "2019/6/1",
      endDate: "",
      isCurrentJob: true,
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet architecto at dolor ea iste nam quo similique vitae voluptas? Eum ipsam obcaecati perferendis porro provident quam, velit voluptate voluptatibus perferendis porro provident quam, velit voluptate voluptatibus."
    }
  * */
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
