const initialState = "Initial notification";

export const changeNotification = (newNotification) => {
  return {
    type: "CHANGE_NOTIFICATION",
    data: newNotification,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
