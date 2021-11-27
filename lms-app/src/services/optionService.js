import { httpClient } from "../utils/httpClient";

export const createOption = (data, token) => {
  return httpClient.post("option/createoption", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getOptionById = (id) => {
  return httpClient.get("option/getoptionbyid/" + id);
};

export const editOptionById = (id, data, token) => {
    return httpClient.put("option/editoption/"+id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  export const deleteOptionById = (id) =>{
    return httpClient.delete("option/deleteoption/"+id)
  }
  