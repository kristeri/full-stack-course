import userService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    let users = null;
    users = await userService.getAll();
    dispatch({
      type: "INIT",
      data: users,
    });
  };
};

export default reducer;
