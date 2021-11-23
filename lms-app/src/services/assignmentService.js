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

export const createAssignment = (data, token) => {
  return httpClient.post("assignment/createassignment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editAssignmentById = (id, data, token) => {
  return httpClient.put("assignment/editassignment/"+id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getSubmissionsByLessonId = (id, token) => {
  return httpClient.get("assignment/getsubmissionsbylessonid/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubmissionById = (id, token) => {
  return httpClient.get("assignment/getsubmissionbyid/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const gradeSubmissionById = (id, data, token) => {
  return httpClient.put("assignment/gradeassignment/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};