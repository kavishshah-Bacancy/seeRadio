import axios from "axios";
import * as actionTypes from "../actionTypes/actionTypes";
import { loginApi } from "../../Api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const authStart = () => {
  console.log("in authStart");
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userData) => {
  console.log("in authSuccess");
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userData: userData,
  };
};

export const authFail = (error) => {
  console.log("in authFail");
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const login = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    console.log(authData);
    loginApi(authData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.personData.id);
        let personData = {
          id: res.personData.id,
          email: res.personData.email,
          firstName: res.personData.firstName,
          lastName: res.personData.lastName,
          role: res.personData.roleCode,
        };
        localStorage.setItem("personalInfo", JSON.stringify(personData));
        toast.info("Successfully loggedIn");
        dispatch(authSuccess(res.token, personData));
      })
      .catch((error) => {
        console.log();
        toast.error(error.errorMessage);
        dispatch(authFail(error.errorMessage));
      });
    // axios
    //   .post("http://localhost:3000/pub/login", authData)
    //   .then((res) => {
    //     console.log(res.data);
    //     localStorage.setItem("token", res.data.data.token);
    //     let personData = {
    //       id: res.data.data.personData.id,
    //       email: res.data.data.personData.email,
    //       firstName: res.data.data.personData.firstName,
    //       lastName: res.data.data.personData.lastName,
    //       role: res.data.data.personData.roleCode,
    //     };
    //     //localStorage.setItem("personalInfo", JSON.stringify(personData));
    //     toast.info("Successfully loggedIn");
    //     dispatch(authSuccess(res.data.data.token, personData));
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.errorMessage);
    //     dispatch(authFail(error.response.data.errorMessage));
    //   });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(authLogout());
  };
};
