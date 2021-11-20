import { httpClient } from "../utils/httpClient";

export const getUndoneAssignmentsByLessonId = (lessonId, token) => {
  return httpClient.get(
    "assignment/getundoneassignmentsbylessonid/" + lessonId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getStudentsAssignmentById = (id, token) => {
  return httpClient.get("assignment/getstudentsassignmentbyid/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitAssignmentById = (id, data, token) => {
  return httpClient.post("assignment/submitassignment/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAssignmentById = (id) => {
  return httpClient.get("assignment/getassignmentbyid/" + id);
};

export const getAllAssignmentsByGroupId = (groupId, page, size) => {
  let path;
  (page!=null && size!=null)
    ? (
      path =
        "assignment/getallassignemntsbygroupid/" +
        groupId +
        "/" +
        page +
        "/" +
        size)
    : (
      path = "assignment/getallassignemntsbygroupid/" + groupId);
  return httpClient.get(path);
};
