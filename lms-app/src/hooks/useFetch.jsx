import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../actions/const";

export function useFetch(callback) {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    callback
      .then((res) => {
        setData(res.data);
        dispatch({
          type: actionTypes.DISABLE_IS_FETCHING,
        });
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          dispatch({
            type: actionTypes.SET_AUTH_ERROR,
            payload: error,
          });
        } else {
          dispatch({
            type: actionTypes.SET_AUTH_ERROR,
            payload: error.response.data,
          });
        }
        dispatch({
          type: actionTypes.DISABLE_IS_FETCHING,
        });
      });
  }, []);

  return data;
}
