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
      invalidMsg: "",
      touched: false,
    },
    endDate: {
      value: null,
      invalidMsg: "",
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
  editingJobId: 0,
  jobList: [],
  /*
      {
      jobTitle: "Data Analyst",
      company: "Verizon Media",
      companyLogo: "https://source.unsplash.com/random/400x300",
      startDate: "2019/6/1",
      endDate: "",
      isCurrent: true,
      jobDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet architecto at dolor ea iste nam quo similique vitae voluptas? Eum ipsam obcaecati perferendis porro provident quam, velit voluptate voluptatibus perferendis porro provident quam, velit voluptate voluptatibus."
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
      const pairingFieldNames = {
        startDate: "endDate",
        endDate: "startDate",
      };
      const pairingFieldName = pairingFieldNames[fieldName];
      // FIXME: Integrate newState with final state
      const newState = {
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
      const hasBothValue = Object.keys(pairingFieldNames)
        .every(fieldName => newState.jobForm[fieldName].value !== null);
      let invalidMsg = "";
      if((newState.jobForm.startDate.value > newState.jobForm.endDate.value) && hasBothValue) {
        invalidMsg = "End Date should be after Start Date"
      }

      return {
        ...newState,
        jobForm: {
          ...newState.jobForm,
          [fieldName]: {
            ...newState.jobForm[fieldName],
            invalidMsg,
          },
          [pairingFieldName]: {
            ...newState.jobForm[pairingFieldName],
            invalidMsg,
          }
        }
      }
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
              invalidMsg: "",
            },
            startDate: {
              ...state.jobForm.startDate,
              invalidMsg: "",
            }
          })
        }
      };
    }
    case 'EDIT_SINGLE_JOB':
    {
      const { jobId } = action;
      const { jobList, jobForm } = state;
      const targetJob = jobList.find(job => job.id === jobId);

      const newJobForm = (targetJob === undefined)?
        initialState.jobForm
        :
        Object.keys(jobForm)
          .reduce((acc, fieldName) => {
            return {
              ...acc,
              [fieldName]: {
                ...jobForm[fieldName],
                value: targetJob[fieldName],
              }
            }
          }, {});

      return {
        ...state,
        jobForm: newJobForm,
        editingJobId: jobId,
      };
    }
    case 'DELETE_SINGLE_JOB':
    {
      const { jobId } = action;
      const { jobList } = state;
      const updatedJobList = jobList.filter(job => job.id !== jobId);

      return {
        ...state,
        jobList: updatedJobList,
      };
    }
    case 'SUBMIT_SINGLE_JOB':
    {
      const { editingJobId, jobForm, jobList } = state;
      const newJob = Object.keys(jobForm)
        .filter(fieldName => fieldName !== "companyLogo")
        .reduce((accu, fieldName) => {
          return {
            ...accu,
            [fieldName]: jobForm[fieldName].value,
          }
        }, {});
      const isExistingJob = (editingJobId !== 0);
      const newJobList = isExistingJob ?
        jobList.map(job => (job.id === editingJobId)? { ...newJob, id: job.id }: job)
        :
        [
          ...jobList,
          {
            ...newJob,
            id: new Date().getTime(),
          },
        ];

      return {
        ...state,
        jobForm: initialState.jobForm,
        jobList: newJobList,
        editingJobId: initialState.editingJobId,
      };
    }
    case 'RESET_JOB_FORM':
    {
      return {
        ...state,
        jobForm: initialState.jobForm,
        editingJobId: initialState.editingJobId,
      };
    }
    case 'SET_FIELDS_INVALID_MSG':
    {
      const { validatedFields } = action;
      return {
        ...state,
        personalForm: {
          ...validatedFields
        },
      }
    }
    case 'REHYDRATE_OVERALL_DATA':
    {
      const { jobList } = action;
      const newPersonalForm = Object.keys(state.personalForm)
        .reduce((acc, fieldName) => {
          return {
            ...acc,
            [fieldName]: {
              ...state.personalForm,
              value: action[fieldName],
            }
          }
        }, {});

      return {
        ...state,
        personalForm: newPersonalForm,
        jobList,
      }
    }
    default:
      return state
  }
};

export default reducer;
