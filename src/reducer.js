import validator from './utils/validator';

const initialState = {
  personalForm: {
    name: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 200,
        regex: null, // [\S]+
      },
      invalidMsg: "", // error hint. if not empty, then it has error
      touched: false,
    },
    age: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 3,
        regex: /^\d+$/,
      },
      invalidMsg: "",
      touched: false,
    },
    avatarImg: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 500,
        regex: null,
      },
      invalidMsg: "",
      touched: false,
    },
  },
  jobForm: {
    jobTitle: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 200,
        regex: null,
      },
      invalidMsg: "",
      touched: false,
    },
    company: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 200,
        regex: null,
      },
      invalidMsg: "",
      touched: false,
    },
    companyLogo: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 200,
        regex: null,
      },
      invalidMsg: "",
      touched: false,
    },
    startDate: {
      value: null,
      validateRule: {
        minLength: 1,
        maxLength: 10,
        regex: /\d{4}\/\d{1,2}\/\d{1,2}/,
      },
      invalidMsg: "",
      touched: false,
    },
    endDate: {
      value: null,
      validateRule: {
        minLength: 1,
        maxLength: 10,
        regex: /\d{4}\/\d{1,2}\/\d{1,2}/,
      },
      invalidMsg: "",
      touched: false,
    },
    isCurrent: {
      value: false,
      validateRule: {  // todo: boolean how to do?
        minLength: 1,
        maxLength: 10,
        regex: null,
      },
      invalidMsg: "",
      touched: false,
    },
    jobDesc: {
      value: "",
      validateRule: {
        minLength: 1,
        maxLength: 1000,
        regex: null,
      },
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
    case 'CHANGE_INPUT_VALUE':

      const { formName = "personalForm", fieldName, value } = action;

      if(!state[formName] || !state[formName][fieldName]) {
        return state;
      }

      const invalidMsg = validator({
        value,
        validateRule: state[formName][fieldName].validateRule,
      });

      return {
        ...state,
        [formName]: {
          ...state[formName],
          [fieldName]: {
            ...state[formName][fieldName],
            value,
            invalidMsg,
            touched: true,
          },
        }
      };
    default:
      return state
  }
};

export default reducer;
