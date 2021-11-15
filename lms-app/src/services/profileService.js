import { httpClient } from "../utils/httpClient";

export const getProfile = (token) => {
  return httpClient.get("profile/getmyprofile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProfile = (token, data) => {
  return httpClient.put("profile/changeprofileinfo", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProfilePicture = (token, data) => {
  return httpClient.put("profile/changeprofilepicture", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const requestChangeEmail = (data,token) => {
  return httpClient.post("profile/requestchangeemail", data,{
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export const confirmNewEmail = (data,token) => {
  return httpClient.post("profile/confirmnewemail", data,{
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};
