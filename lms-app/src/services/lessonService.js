import { httpClient } from "../utils/httpClient";

export const getMoreLessons = (token, groupId, page, size) => {
  return httpClient.get(
    "lesson/getlessonsbygroupidanduserid/" + groupId + "/" + page + "/" + size,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
