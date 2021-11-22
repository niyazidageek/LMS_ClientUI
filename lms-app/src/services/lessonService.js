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
        "lesson/getlessonsbygroupid/" + groupId + "/" + page + "/" + size);
  return httpClient.get(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLessonById = (lessonId) => {
  return httpClient.get("lesson/getlessonbyid/" + lessonId);
};

export const startLessonById = (lessonId, data, token) => {
  return httpClient.post("lesson/startlesson/" + lessonId, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editLessonById = (lessonId, data, token) => {
  return httpClient.put("lesson/editlesson/" + lessonId, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createLesson = (data, token) => {
  return httpClient.post("lesson/createlesson", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchLessonsByGroupId = (groupId, input) => {
  return httpClient.get(
    "lesson/searchlessonsbygroupid/" + groupId + "/" + input
  );
};

export const getLessonsWithSubmissionsByGroupId = (token, groupId, page, size) => {
  return httpClient.get(
    "lesson/getlessonswithsubmissionsbygroupid/" +
      groupId +
      "/" +
      page +
      "/" +
      size,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
