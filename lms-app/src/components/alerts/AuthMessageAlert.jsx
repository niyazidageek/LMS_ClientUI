import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { actionTypes } from "../../actions/const";

export const AuthMessageAlert = React.memo(() => {
  const message = useSelector((state) => state.authReducer.message);
  const hasMessage = message ? true : false;

  const dispatch = useDispatch();
  const toast = useToast();
  function Log() {
    toast({
      status: "success",
      description: message,
      position: "top",
      duration: 2000,
    });

    dispatch({
      type: actionTypes.DISABLE_AUTH_MESSAGE,
    });
  }

  return <>{hasMessage ? Log() : null}</>;
});
