import { httpClient } from "../utils/httpClient";

export const getTeacherHome = (token, id) => {
  let url = "teacherhome/getteacherhomecontent";
  id && (url += "/" + id);

  return httpClient.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
