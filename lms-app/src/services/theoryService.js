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
  return httpClient.post("theory/marktheoryasread/" + id, null,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTheoryContent = (fileName) =>{
  return httpClient.get(process.env.REACT_APP_FILES_API+fileName)
}