import { useState, useEffect } from "react";
import {
  getPendingMatches,
  acceptMatch,
  rejectMatch,
  completeMatch,
} from "../services/matchService";
import Loader from "../components/Loader";
import {
  Link as LinkIcon,
  Star,
  Flame,
  Heart,
  User,
  Droplet,
  FileText,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

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
        const allMatches = data.matches || [];
        setMatches(allMatches);
      } catch (error) {
        console.error("Error loading matches:", error);
        setMessage("Failed to load matches. Please refresh the page.");
        setMessageType("error");
      }
      setLoading(false);
    };

    loadMatches();
  }, []);

  const getFilteredMatches = () => {
    if (filter === "all") return matches;
    return matches.filter((m) => m.status === filter);
  };

  const filteredMatches = getFilteredMatches();

  const stats = {
    pending: matches.filter((m) => m.status === "pending").length,
    accepted: matches.filter((m) => m.status === "accepted").length,
    completed: matches.filter((m) => m.status === "completed").length,
    rejected: matches.filter((m) => m.status === "rejected").length,
  };

  const topMatches = matches
    .filter((m) => m.status === "pending")
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  const handleAccept = async (matchId) => {
    try {
      await acceptMatch(matchId);
      setMessage("✅ Match accepted!");
      setMessageType("success");
      setTimeout(() => {
        window.location.reload();
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
        window.location.reload();
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
        window.location.reload();
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(err?.message || "Failed to complete match");
      setMessageType("error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-2 flex items-center gap-2">
            <LinkIcon className="w-10 h-10 text-green-400" />
            AI Organ Matches
          </h1>
          <p className="text-gray-400">
            Instant AI-powered compatibility matching system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6 text-center">
            <p className="text-yellow-400 text-sm font-semibold">PENDING</p>
            <p className="text-4xl font-bold text-yellow-300 mt-2">
              {stats.pending}
            </p>
          </div>
          <div className="bg-green-900/30 border border-green-600 rounded-lg p-6 text-center">
            <p className="text-green-400 text-sm font-semibold">ACCEPTED</p>
            <p className="text-4xl font-bold text-green-300 mt-2">
              {stats.accepted}
            </p>
          </div>
          <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6 text-center">
            <p className="text-blue-400 text-sm font-semibold">COMPLETED</p>
            <p className="text-4xl font-bold text-blue-300 mt-2">
              {stats.completed}
            </p>
          </div>
          <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 text-center">
            <p className="text-red-400 text-sm font-semibold">REJECTED</p>
            <p className="text-4xl font-bold text-red-300 mt-2">
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-lg backdrop-blur-sm ${
              messageType === "success"
                ? "bg-green-500/20 border border-green-500 text-green-300"
                : "bg-red-500/20 border border-red-500 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Top Matches Section (if pending matches exist) */}
        {topMatches.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-600/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              Top AI Matches
              <span className="text-sm font-normal text-green-400 ml-2">
                (Auto-Recommended)
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topMatches.map((match, idx) => (
                <div
                  key={match._id}
                  className="bg-gray-900 border border-green-500/50 rounded-lg p-6 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Match #{idx + 1}</p>
                      <p className="text-4xl font-bold text-green-400">
                        {match.matchScore}%
                      </p>
                    </div>
                    {match.matchScore >= 80 && (
                      <span className="px-3 py-1 bg-green-500/30 border border-green-500 text-green-300 rounded-full text-xs font-bold flex items-center gap-1">
                        <Flame className="w-4 h-4 fill-green-300" />
                        HOT
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Donor</p>
                      <p className="font-semibold">{match.donorUserId?.name}</p>
                      <p className="text-sm text-gray-400">
                        {match.donorId?.organ} • {match.donorId?.bloodGroup}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Patient</p>
                      <p className="font-semibold">
                        {match.requestUserId?.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {match.requestId?.organ} • {match.requestId?.urgency}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(match._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-3 py-2 rounded font-semibold text-sm transition flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(match._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded font-semibold text-sm transition flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["all", "pending", "accepted", "completed", "rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  filter === status
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} (
                {status === "all"
                  ? matches.length
                  : [...Object.entries(stats)].find(
                      ([k]) => k === status,
                    )?.[1] || 0}
                )
              </button>
            ),
          )}
        </div>

        {/* All Matches Grid */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMatches.map((match) => (
              <div
                key={match._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition"
              >
                {/* Match Score */}
                <div className="mb-5 flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">AI Match Score</p>
                    <p
                      className={`text-3xl font-bold mt-1 ${
                        match.matchScore >= 80
                          ? "text-green-400"
                          : match.matchScore >= 60
                            ? "text-yellow-400"
                            : "text-orange-400"
                      }`}
                    >
                      {match.matchScore}%
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      match.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : match.status === "accepted"
                          ? "bg-green-500/20 text-green-300"
                          : match.status === "completed"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {match.status.toUpperCase()}
                  </span>
                </div>

                {/* Donor Info */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <p className="text-xs text-gray-500 uppercase mb-2 font-semibold flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                    Donor
                  </p>
                  <div className="bg-gray-800/50 rounded p-3">
                    <p className="font-semibold text-lg">
                      {match.donorUserId?.name || "Unknown"}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Droplet className="w-4 h-4" />
                        {match.donorId?.bloodGroup}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {match.donorId?.organ}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {match.donorId?.location?.city}
                    </p>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <p className="text-xs text-gray-500 uppercase mb-2 font-semibold flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Patient
                  </p>
                  <div className="bg-gray-800/50 rounded p-3">
                    <p className="font-semibold text-lg">
                      {match.requestUserId?.name || "Unknown"}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Droplet className="w-4 h-4" />
                        {match.requestId?.bloodGroup}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {match.requestId?.organ}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Urgency: {match.requestId?.urgency}
                    </p>
                  </div>
                </div>

                {/* Compatibility Details */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <p className="text-xs text-gray-500 uppercase mb-3 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Compatibility
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.bloodTypeMatch
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span>Blood Type Match</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.organMatch
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span>Organ Match</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.locationProximity > 50
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>
                        Location (
                        {match.compatibilityDetails?.locationProximity}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          match.compatibilityDetails?.urgencyFit
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span>Urgency Fit</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {match.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(match._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(match._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                {match.status === "accepted" && (
                  <button
                    onClick={() => handleComplete(match._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    Complete Match
                  </button>
                )}

                {match.status === "completed" && (
                  <div className="w-full bg-green-600/30 border border-green-600/50 px-4 py-2 rounded text-center font-semibold text-green-300 flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </div>
                )}

                {match.status === "rejected" && (
                  <div className="w-full bg-red-600/30 border border-red-600/50 px-4 py-2 rounded text-center font-semibold text-red-300 flex items-center justify-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Rejected
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              No {filter === "all" ? "matches" : filter + " matches"} found
            </p>
            <p className="text-gray-500 mt-2">
              Check back later for new matches!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches;
