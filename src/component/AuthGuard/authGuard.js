import React from "react";
import { Redirect, Route } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../Layout/navBar";

toast.configure();
const AuthGuard = (props) => {
  return (
    <Route
      path={props.path}
      render={(data) =>
        localStorage.getItem("token") !== null ? (
          <>
            <NavBar />
            <props.component></props.component>
          </>
        ) : (
          <>
            {toast.error("You are not Authenticated, Please Login !!")}
            <Redirect to={{ pathname: "/" }}></Redirect>
          </>
        )
      }
    />
  );
};

export default AuthGuard;
