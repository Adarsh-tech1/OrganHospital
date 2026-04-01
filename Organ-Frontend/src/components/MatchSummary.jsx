import { useState, useEffect } from "react";
import { getPendingMatches } from "../services/matchService";
import { Link } from "react-router-dom";
import { Link as LinkIcon, Star, ChevronRight } from "lucide-react";

function MatchSummary() {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    completed: 0,
  });
  const [topMatch, setTopMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getPendingMatches();
        const matches = data.matches || [];

        setStats({
          pending: matches.filter((m) => m.status === "pending").length,
          accepted: matches.filter((m) => m.status === "accepted").length,
          completed: matches.filter((m) => m.status === "completed").length,
        });

        // Get top pending match
        const topPending = matches
          .filter((m) => m.status === "pending")
          .sort((a, b) => b.matchScore - a.matchScore)[0];

        setTopMatch(topPending);
      } catch (error) {
        console.error("Error loading matches:", error);
        // Silently handle error - don't show error state, just use defaults
      }
      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 animate-pulse h-64"></div>
    );
  }

  return (
    <Link to="/matches">
      <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-600/50 rounded-lg p-6 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/20 transition cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-green-400" />
            Organ Matches
          </h3>
          <span className="text-4xl">
            {stats.pending + stats.accepted + stats.completed}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-yellow-900/40 border border-yellow-600/50 rounded p-3 text-center">
            <p className="text-yellow-300 text-sm font-semibold">Pending</p>
            <p className="text-2xl font-bold text-yellow-200">
              {stats.pending}
            </p>
          </div>
          <div className="bg-green-900/40 border border-green-600/50 rounded p-3 text-center">
            <p className="text-green-300 text-sm font-semibold">Accepted</p>
            <p className="text-2xl font-bold text-green-200">
              {stats.accepted}
            </p>
          </div>
          <div className="bg-blue-900/40 border border-blue-600/50 rounded p-3 text-center">
            <p className="text-blue-300 text-sm font-semibold">Completed</p>
            <p className="text-2xl font-bold text-blue-200">
              {stats.completed}
            </p>
          </div>
        </div>

        {topMatch && (
          <div className="bg-gray-800/50 border border-green-600/30 rounded p-4">
            <p className="text-xs text-gray-400 uppercase mb-2 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              Top Match
            </p>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-lg">
                  {topMatch.donorUserId?.name} → {topMatch.requestUserId?.name}
                </p>
                <p className="text-sm text-gray-400">
                  {topMatch.donorId?.organ} match
                </p>
              </div>
              <p
                className={`text-2xl font-bold ${
                  topMatch.matchScore >= 80
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {topMatch.matchScore}%
              </p>
            </div>
          </div>
        )}

        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-1">
          View All Matches
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
}

export default MatchSummary;
