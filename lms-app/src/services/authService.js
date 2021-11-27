import { httpClient } from "../utils/httpClient";

export const signIn = (data) => {
  return httpClient.post("user/login", data);
};

export const signUp = (data) => {
  return httpClient.post("user/register", data);
};

export const requestResetPassword = (data) => {
  return httpClient.post("user/forgetpassword", data);
};

export const resetPassword = (data) => {
  return httpClient.post("user/resetpassword", data);
};

export const sendConfirmEmail = (token) => {
  return httpClient.get("user/sendconfirmationemail",{
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export const confirmEmail = (data) => {
  return httpClient.post("user/confirmemail", data);
};
