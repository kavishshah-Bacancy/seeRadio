import * as actionTypes from "../actionTypes/actionTypes";

export const updateToken = (token) => {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    token: token,
  };
};

export const changePassword = (token) => {
  return (dispatch) => {
    console.log(token);
    localStorage.setItem("token", token);
    dispatch(updateToken(token));
  };
};
