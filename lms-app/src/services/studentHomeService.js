import { httpClient } from "../utils/httpClient";

export const getStudentHome = (token, id) => {
  let url = "studenthome/getstudenthomecontent";
  id && (url += "/" + id);

  return httpClient.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
