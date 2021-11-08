import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { actionTypes } from "../../actions/const";

export const AuthErrorAlert = React.memo(() => {
  const error = useSelector((state) => state.authReducer.error);
  const hasError = error ? true : false;

  const dispatch = useDispatch();
  const toast = useToast();
  function Log() {
    toast({
      status: "error",
      description: error,
      position: "top",
      duration: 2000,
    });
    console.log("alert");

    dispatch({
      type: actionTypes.DISABLE_AUTH_ERROR,
    });
  }

  return <>{hasError ? Log() : null}</>;
});
