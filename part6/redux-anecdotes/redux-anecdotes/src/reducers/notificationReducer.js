const initialState = { notificationText: "Initial notification", showNotification: false };

var timeoutID;

export const setNotification = (newNotification, timeInSeconds) => {
  clearTimeout(timeoutID);
  return async (dispatch) => {
    dispatch({
      type: "CHANGE_NOTIFICATION",
      data: newNotification,
    });
    dispatch({
      type: "TOGGLE_NOTIFICATION",
      data: true,
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        data: false,
      });
    }, timeInSeconds * 1000);
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NOTIFICATION":
      return { ...state, notificationText: action.data };
    case "TOGGLE_NOTIFICATION":
      return { ...state, showNotification: action.data };
    default:
      return state;
  }
};

export default reducer;
