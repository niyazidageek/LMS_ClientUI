import { httpClient } from "../utils/httpClient";

export const postApplication = (data, token) => {
  return httpClient.post("application/postapplication", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
