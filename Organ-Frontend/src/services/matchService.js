import API from "./api";

// Find matches for a request
export const findMatches = async (requestId) => {
  try {
    const res = await API.post(`/match/find/${requestId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Auto-match a request
export const autoMatch = async (requestId) => {
  try {
    const res = await API.post("/match/auto-match", { requestId });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get all pending matches
export const getPendingMatches = async () => {
  try {
    const res = await API.get("/match/pending");
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Accept a match
export const acceptMatch = async (matchId) => {
  try {
    const res = await API.put(`/match/accept/${matchId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Reject a match
export const rejectMatch = async (matchId, reason) => {
  try {
    const res = await API.post(`/match/reject/${matchId}`, { reason });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Complete a match
export const completeMatch = async (matchId) => {
  try {
    const res = await API.put(`/match/complete/${matchId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get user matches
export const getUserMatches = async (userId) => {
  try {
    const res = await API.get(`/match/user/${userId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
