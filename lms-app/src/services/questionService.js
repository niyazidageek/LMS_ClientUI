import { httpClient } from "../utils/httpClient";

export const createQuestion = (data, token) => {
  return httpClient.post("question/createquestion", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getQuestionById = (id) => {
  return httpClient.get("question/getquestionbyid/" + id);
};

export const editQuestionById = (id, data, token) => {
  return httpClient.put("question/editquestion/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getQuestionsByQuizId = (quizId) => {
  return httpClient.get("question/getquestionsbyquizid/" + quizId);
};

export const getQuestionByPageAndQuizId = (page, quizId, token) => {
  return httpClient.get(
    "question/getquestionbypageandquizid/" + page + "/" + quizId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteQuestionById = (id) =>{
  return httpClient.delete("question/deletequestion/"+id)
}

