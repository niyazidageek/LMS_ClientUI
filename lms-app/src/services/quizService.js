import { httpClient } from "../utils/httpClient";

export const getMoreTeachersByGroupIdQuizzes = (
    token,
    groupId,
    page,
    size
  ) => {
    let path = `quiz/getquizzesbygroupid/${groupId}/${page}/${size}` 

    return httpClient.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const getStudentsQuizById = (quizId,token) => {
    return httpClient.get("quiz/getstudentsquizbyId/" + quizId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  };

  export const getStudentsQuizInfoById = (quizId,token) => {
    return httpClient.get("quiz/getstudentsquizinfobyid/" + quizId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  };


  export const createQuiz = (data, token) => {
    return httpClient.post("quiz/createquiz", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const getQuizById = (quizId) => {
    return httpClient.get("quiz/getquizbyid/" + quizId)
  };


  export const editQuizById = (quizId, data, token) => {
    return httpClient.put("quiz/editquiz/" + quizId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const makeQuizAvailableById = (quizid, data, token) => {
    return httpClient.put("quiz/makequizavailablebyid/"+quizid, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const getMoreStudentsQuizzesByGroupId = (
    token,
    groupId,
    page,
    size
  ) => {
    let path = `quiz/getstudentsquizzesbygroupid/${groupId}/${page}/${size}` 

    return httpClient.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const submitQuizById = (quizid, data, token) => {
    return httpClient.put("quiz/submitquizbyid/"+quizid, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const deleteQuizById = (id) =>{
    return httpClient.delete("quiz/deletequiz/"+id)
  }

