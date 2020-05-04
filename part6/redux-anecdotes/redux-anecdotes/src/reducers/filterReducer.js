const initialState = "";

export const changeFilter = (newFilter) => {
  return {
    type: "CHANGE_FILTER",
    data: newFilter,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
