import * as actionTypes from "../actionTypes/actionTypes";

const initialState = {
  activeUser: null,
  token: null,
  error: null,
  loading: null,
};

const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        activeUser: null,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        activeUser: action.userData,
        token: action.token,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        activeUser: null,
        token: null,
        error: action.error,
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        activeUser: null,
        token: null,
        error: null,
        loading: null,
      };
    default:
      return state;
  }
};

export default authReducer;
