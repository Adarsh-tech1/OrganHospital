import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MatchSummary from "../components/MatchSummary";
import API from "../services/api";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, donorsRes] = await Promise.all([
        API.get("/request"),
        API.get("/donor"),
      ]);
      setRequests(requestsRes.data || []);
      setDonors(donorsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome to organ donation system</p>

        {/* User Info */}
        {user && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8 border border-gray-700">
            <p className="text-white">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
          </div>
        )}

        {/* Match Summary Section - Prominent Display */}
        <div className="mb-8">
          <MatchSummary />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Organ Requests Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              📤 Organ Requests
            </h2>

            {requests.length === 0 ? (
              <p className="text-gray-400">No organ requests yet</p>
            ) : (
              <div className="space-y-4">
                {requests.map((req, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                  >
                    <p className="text-white font-semibold">
                      Organ:{" "}
                      <span className="text-green-400">{req.organType}</span>
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Blood Type: {req.bloodType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Urgency:{" "}
                      <span
                        className={
                          req.urgency === "Critical"
                            ? "text-red-400 font-bold"
                            : req.urgency === "High"
                              ? "text-orange-400"
                              : "text-yellow-400"
                        }
                      >
                        {req.urgency}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Status: {req.status || "Waiting"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Donors Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              ❤️ Registered Donors
            </h2>

            {donors.length === 0 ? (
              <p className="text-gray-400">No donors registered</p>
            ) : (
              <div className="space-y-4">
                {donors.map((donor, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                  >
                    <p className="text-white font-semibold">
                      Donor: {donor.name}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Blood Type: {donor.bloodType}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Available Organs:{" "}
                      {donor.availableOrgans?.join(", ") || "Not specified"}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Status: <span className="text-green-400">Active</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Matching System Info */}
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-blue-300 mb-3">
            🔄 How Matching Works
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>
              ✓ Patient requests organ → System searches for matching donors
            </li>
            <li>✓ Blood type and organ type must match</li>
            <li>✓ Donors receive notification of urgent requests</li>
            <li>✓ When donor approves → Both get contact details</li>
            <li>✓ Hospital arranges transplant procedure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
