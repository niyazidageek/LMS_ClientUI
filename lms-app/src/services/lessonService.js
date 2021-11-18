import { httpClient } from "../utils/httpClient";

export const getMoreStudentsLessons = (
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

export const getMoreTeachersLessons = (
  token,
  groupId,
  page,
  size,
  futureDaysCount = null
) => {
  let path;
  futureDaysCount
    ? (path =
        "lesson/getlessonsbygroupid/" +
        groupId +
        "/" +
        page +
        "/" +
        size +
        "/" +
        futureDaysCount)
    : (path =
        "lesson/getlessonsbygroupid/" +
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
