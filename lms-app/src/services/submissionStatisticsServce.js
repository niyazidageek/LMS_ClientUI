import { httpClient } from "../utils/httpClient";

export const getSubmissionsCountByGroupId = (groupId, token, year = null) => {
  let path;
  year
    ? (path =
        "groupsubmission/getsubmissionscountbygroupidandyear/" +
        groupId +
        "/" +
        year)
    : (path = "groupsubmission/getsubmissionscountbygroupidandyear/" + groupId);
  return httpClient.get(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAssignmentProgressByGroupId = (groupId, token, year = null) => {
  let path;
  year
    ? (path =
        "groupsubmission/getassignmentprogressbygroupidandyear/" +
        groupId +
        "/" +
        year)
    : (path =
        "groupsubmission/getassignmentprogressbygroupidandyear/" + groupId);
  return httpClient.get(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
