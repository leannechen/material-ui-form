
const initialState = {
  fieldList: ["name", "age", "avatarImg"], //
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
  job: {
    value: "",
    validateReg: "",
    invalidMsg: "",
    touched: false,
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
