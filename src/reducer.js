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
      value: null, // null, timestamp ex. 1498229700000 (number)
      touched: false,
    },
    endDate: {
      value: null,
      touched: false,
    },
    isCurrent: {
      value: false,
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
    {
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
    }
    case 'CHANGE_DATE_PICKER_VALUE':
    {
      const { value, fieldName } = action;

      return {
        ...state,
        jobForm: {
          ...state.jobForm,
          [fieldName]: {
            ...state.jobForm[fieldName],
            value,
            touched: true,
          },
        }
      };
    }
    case 'TOGGLE_IS_CURRENT_JOB':
    {
      const { value } = action;

      return {
        ...state,
        jobForm: {
          ...state.jobForm,
          isCurrent: {
            ...state.jobForm.isCurrent,
            value,
            touched: true,
          },
          ...(value === true && {
            endDate: {
              ...state.jobForm.endDate,
              value: null,
            },
          })
        }
      };
    }
    default:
      return state
  }
};

export default reducer;
