import { useState, useEffect } from "react";
import {
  getPendingMatches,
  acceptMatch,
  rejectMatch,
  completeMatch,
} from "../services/matchService";
import Loader from "../components/Loader";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        const data = await getPendingMatches();
        let filtered = data.matches || [];

        if (filter === "accepted") {
          filtered = filtered.filter((m) => m.status === "accepted");
        } else if (filter === "completed") {
          filtered = filtered.filter((m) => m.status === "completed");
        } else if (filter === "rejected") {
          filtered = filtered.filter((m) => m.status === "rejected");
        }

        setMatches(filtered);
      } catch {
        setMessage("Failed to load matches");
        setMessageType("error");
      }
      setLoading(false);
    };

    loadMatches();
  }, [filter]);

  const handleAccept = async (matchId) => {
    try {
      await acceptMatch(matchId);
      setMessage("✅ Match accepted!");
      setMessageType("success");
      setTimeout(() => {
        setFilter(filter);
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(err?.message || "Failed to accept match");
      setMessageType("error");
    }
  };

  const handleReject = async (matchId) => {
    try {
      await rejectMatch(matchId, "User rejected");
      setMessage("❌ Match rejected");
      setMessageType("success");
      setTimeout(() => {
        setFilter(filter);
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(err?.message || "Failed to reject match");
      setMessageType("error");
    }
  };

  const handleComplete = async (matchId) => {
    try {
      await completeMatch(matchId);
      setMessage("🎉 Match completed!");
      setMessageType("success");
      setTimeout(() => {
        setFilter(filter);
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(err?.message || "Failed to complete match");
      setMessageType("error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🔗 Organ Matches</h1>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          {["pending", "accepted", "completed", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {matches.filter((m) => m.status === status).length})
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              messageType === "success"
                ? "bg-green-500/20 border border-green-500 text-green-400"
                : "bg-red-500/20 border border-red-500 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Matches Grid */}
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match) => (
              <div
                key={match._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-green-500 transition"
              >
                {/* Match Score */}
                <div className="mb-4 flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Match Score</p>
                    <p className="text-3xl font-bold text-green-400">
                      {match.matchScore}%
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      match.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : match.status === "accepted"
                          ? "bg-green-500/20 text-green-400"
                          : match.status === "completed"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {match.status.toUpperCase()}
                  </span>
                </div>

                {/* Donor Info */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <p className="text-sm text-gray-400 mb-2">Donor</p>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="font-semibold">
                      {match.donorUserId?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Blood: {match.donorId?.bloodGroup}
                    </p>
                    <p className="text-sm text-gray-400">
                      Organ: {match.donorId?.organ}
                    </p>
                    <p className="text-sm text-gray-400">
                      Location: {match.donorId?.location?.city}
                    </p>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <p className="text-sm text-gray-400 mb-2">Patient</p>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="font-semibold">
                      {match.requestUserId?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Blood: {match.requestId?.bloodGroup}
                    </p>
                    <p className="text-sm text-gray-400">
                      Organ: {match.requestId?.organ}
                    </p>
                    <p className="text-sm text-gray-400">
                      Urgency: {match.requestId?.urgency}
                    </p>
                  </div>
                </div>

                {/* Compatibility Details */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <p className="text-sm text-gray-400 mb-2">Compatibility</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.bloodTypeMatch
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span>Blood Type</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.organMatch
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span>Organ Match</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.locationProximity > 50
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.urgencyFit
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>Urgency</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {match.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(match._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold transition"
                    >
                      ✅ Accept
                    </button>
                    <button
                      onClick={() => handleReject(match._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}

                {match.status === "accepted" && (
                  <button
                    onClick={() => handleComplete(match._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
                  >
                    ✨ Complete Match
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No matches found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches;
