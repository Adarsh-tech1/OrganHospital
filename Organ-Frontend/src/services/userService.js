import API from "./api";

export const getUserRequests = async (userId) => {
  const res = await API.get(`/request/user/${userId}`);
  return res.data;
};

export const getUserDonors = async (userId) => {
  const res = await API.get(`/donor/user/${userId}`);
  return res.data;
};
