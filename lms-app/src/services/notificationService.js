import { httpClient } from "../utils/httpClient";

export const getUnreadNotifications = (token) => {
  return httpClient.get("notification/getunreadnotifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markNotificationAsReadById = (id, token) => {
  return httpClient.get("notification/marknotificationasread/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
