const notificationReducer = (state = { message: null, error: false }, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.data;
    case "ERROR":
      return { message: action.data, error: true };
    default:
      return state;
  }
};

export const setNotification = (notification, error) => {
  let newNotification = null;
  return async (dispatch) => {
    const timeout = 5000;
    dispatch({
      type: "NOTIFICATION",
      data: { message: notification, error: error },
    });
    if (newNotification) {
      clearTimeout(newNotification);
    }
    newNotification = setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        data: { message: null, error: false },
      });
    }, timeout);
  };
};

export default notificationReducer;
