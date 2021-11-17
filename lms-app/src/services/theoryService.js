import { httpClient } from "../utils/httpClient";

export const getStudentsTheoriesByLessonId = (lessonId, token) => {
  return httpClient.get("theory/getstudentstheoriesbylessonid/" + lessonId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
