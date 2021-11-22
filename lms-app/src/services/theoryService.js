import { httpClient } from "../utils/httpClient";

export const getStudentsTheoriesByLessonId = (lessonId, token) => {
  return httpClient.get("theory/getstudentstheoriesbylessonid/" + lessonId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStudentsTheoryById = (id, token) => {
  return httpClient.get("theory/getstudentstheorybyid/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markTheoryAsRead = (id, token) => {
  return httpClient.post("theory/marktheoryasread/" + id, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTheoryById = (id) => {
  return httpClient.get("theory/gettheorybyid/" + id);
};

export const getTheoryContent = (fileName) => {
  return httpClient.get(process.env.REACT_APP_FILES_API + fileName);
};

export const getAllTheoriesByGroupId = (groupId, page, size) => {
  let path;
  (page!=null && size!=null)
    ? (
      path =
        "theory/getalltheoriesbygroupid/" +
        groupId +
        "/" +
        page +
        "/" +
        size)
    : (
      path = "assignment/getalltheoriesbygroupid/" + groupId);
  return httpClient.get(path);
};

export const createTheory = (data, token)=>{
  return httpClient.post("theory/createtheory", data,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

export const editTheoryById = (id, data, token)=>{
  return httpClient.put("theory/edittheory/"+id, data,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
}