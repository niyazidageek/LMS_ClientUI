import { httpClient } from "../utils/httpClient";

export const getMoreLessons = (
  token,
  groupId,
  page,
  size,
  futureDaysCount = null
) => {
  let path;
  futureDaysCount
    ? (path =
        "lesson/getlessonsbygroupidanduserid/" +
        groupId +
        "/" +
        page +
        "/" +
        size +
        "/" +
        futureDaysCount)
    : (path =
        "lesson/getlessonsbygroupidanduserid/" +
        groupId +
        "/" +
        page +
        "/" +
        size);
  return httpClient.get(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLessonById = (lessonId) => {
  return httpClient.get("lesson/getlessonbyid/" + lessonId);
};
