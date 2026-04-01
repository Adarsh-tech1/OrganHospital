import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MatchSummary from "../components/MatchSummary";
import { getUserMatches } from "../services/matchService";
import API from "../services/api";
import {
  Download,
  Heart,
  MapPin,
  Droplet,
  FileText,
  Award,
  AlertCircle,
} from "lucide-react";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [userMatches, setUserMatches] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleStats, setRoleStats] = useState({});

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [matchesRes, requestsRes] = await Promise.all([
        getUserMatches(user._id),
        API.get(`/request/user/${user._id}`),
      ]);

      setUserMatches(matchesRes.matches || []);
      setUserRequests(requestsRes.data || []);

      const stats = {
        pending:
          matchesRes.matches?.filter((m) => m.status === "pending").length || 0,
        accepted:
          matchesRes.matches?.filter((m) => m.status === "accepted").length ||
          0,
        completed:
          matchesRes.matches?.filter((m) => m.status === "completed").length ||
          0,
      };
      setRoleStats(stats);
    } catch (error) {
      console.error("Dashboard data error:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (matchId) => {
    try {
      const response = await API.post(
        `/match/${matchId}/certificate`,
        {},
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `match-${matchId}-report.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Failed to download report");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {user.role === "donor" ? "Donor Dashboard" : "Patient Dashboard"}
          </h1>
          <p className="text-xl text-gray-400">
            AI-Powered Organ Matching System
          </p>
        </div>

        {/* ORIGINAL MatchSummary - AI Overview */}
        <div className="mb-12">
          <MatchSummary />
        </div>

        {/* Role Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-2 border-yellow-500/50 rounded-2xl p-8 backdrop-blur-sm">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-yellow-300">
              {roleStats.pending}
            </p>
            <p className="text-yellow-200 font-semibold mt-2">
              Pending Matches
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-2 border-green-500/50 rounded-2xl p-8 backdrop-blur-sm">
            <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-green-300">
              {roleStats.accepted}
            </p>
            <p className="text-green-200 font-semibold mt-2">
              Accepted Matches
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-2 border-blue-500/50 rounded-2xl p-8 backdrop-blur-sm">
            <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-blue-300">
              {roleStats.completed}
            </p>
            <p className="text-blue-200 font-semibold mt-2">
              Completed Matches
            </p>
          </div>
        </div>

        {/* Role-Based Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User's Matches Table */}
          <div className="bg-gray-900/80 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {user.role === "donor"
                ? "📥 Requests Received"
                : "🎯 Your Matches"}
            </h2>
            {userMatches.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>
                  No matches yet.{" "}
                  {user.role === "donor"
                    ? "Register more details"
                    : "Create organ request"}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {userMatches.map((match) => (
                  <div
                    key={match._id}
                    className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 hover:border-green-500 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-white">
                          {match.donorUserId?.name || "Donor"} ↔{" "}
                          {match.requestUserId?.name || "Patient"}
                        </h4>
                        <p className="text-green-400 font-semibold">
                          {match.donorId?.organ} ({match.matchScore}%) AI Score:{" "}
                          {match.mlScore}%
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          match.status === "completed"
                            ? "bg-green-500/30 text-green-300 border-green-500/50"
                            : match.status === "accepted"
                              ? "bg-blue-500/30 text-blue-300 border-blue-500/50"
                              : match.status === "pending"
                                ? "bg-yellow-500/30 text-yellow-300 border-yellow-500/50"
                                : "bg-gray-500/30 text-gray-300 border-gray-500/50"
                        }`}
                      >
                        {match.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4" />
                        {match.donorId?.bloodGroup}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {match.donorId?.location?.city}
                      </div>
                    </div>
                    {match.status === "completed" && (
                      <button
                        onClick={() => downloadReport(match._id)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/25"
                      >
                        <Download className="w-5 h-5" />
                        Download Medical Report
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User's Requests */}
          <div className="bg-gray-900/80 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📋 Your Requests ({userRequests.length})
            </h2>
            {userRequests.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Create your first organ request</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.slice(0, 3).map((req) => (
                  <div
                    key={req._id}
                    className="bg-gray-800/50 border border-gray-600 rounded-xl p-4 hover:border-blue-500 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white">{req.organ}</h4>
                        <p className="text-sm text-gray-400">
                          {req.bloodGroup} • {req.urgency.toUpperCase()} •{" "}
                          {req.location?.city}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          req.status === "matched"
                            ? "bg-green-500/30 text-green-300"
                            : req.status === "pending"
                              ? "bg-blue-500/30 text-blue-300"
                              : "bg-gray-500/30 text-gray-300"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
