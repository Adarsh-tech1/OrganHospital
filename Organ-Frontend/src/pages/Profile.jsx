import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bloodType: user?.bloodType || "O+",
    age: user?.age || "",
    medicalHistory: user?.medicalHistory || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await API.put(`/user/${user._id}`, formData);
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("❌ Error updating profile");
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-white">
        <p>Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">👤 My Profile</h1>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.includes("✅")
                ? "bg-green-900 text-green-200 border border-green-700"
                : "bg-red-900 text-red-200 border border-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-8 mb-8 border border-blue-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h2>
              <p className="text-blue-100 mb-1">📧 {user.email}</p>
              <p className="text-blue-100 mb-3">
                🎭 Role:{" "}
                <span className="capitalize font-semibold">{user.role}</span>
              </p>
              <p className="text-blue-100">
                🆔 User ID:{" "}
                <span className="text-xs font-mono">{user._id}</span>
              </p>
            </div>
            <div className="text-5xl">
              {user.role === "donor" ? "❤️" : "🏥"}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Basic Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">
              ℹ️ Basic Information
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-gray-300 text-sm font-semibold">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-3 rounded mt-2 border border-gray-600 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-white mt-2">{formData.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm font-semibold">
                  Email
                </label>
                <p className="text-gray-400 mt-2">
                  {formData.email} (Read-only)
                </p>
              </div>

              {/* Age */}
              <div>
                <label className="text-gray-300 text-sm font-semibold">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-3 rounded mt-2 border border-gray-600 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-white mt-2">
                    {formData.age || "Not specified"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Medical Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">
              🏥 Medical Information
            </h3>

            <div className="space-y-4">
              {/* Blood Type */}
              <div>
                <label className="text-gray-300 text-sm font-semibold">
                  Blood Type
                </label>
                {isEditing ? (
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-3 rounded mt-2 border border-gray-600 focus:border-blue-500 outline-none"
                  >
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                ) : (
                  <p className="text-white mt-2 text-lg font-bold">
                    {formData.bloodType}
                  </p>
                )}
              </div>

              {/* Medical History */}
              <div>
                <label className="text-gray-300 text-sm font-semibold">
                  Medical History
                </label>
                {isEditing ? (
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any relevant medical conditions..."
                    className="w-full bg-gray-700 text-white p-3 rounded mt-2 border border-gray-600 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-400 mt-2">
                    {formData.medicalHistory || "No medical history recorded"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Donor Status */}
        {user.role === "donor" && (
          <div className="bg-gradient-to-r from-pink-900 to-red-900 rounded-lg p-6 border border-red-700 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ❤️ Donor Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black bg-opacity-30 p-4 rounded">
                <p className="text-red-200 text-sm">Registered As</p>
                <p className="text-white text-lg font-bold">Organ Donor</p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded">
                <p className="text-red-200 text-sm">Status</p>
                <p className="text-green-400 text-lg font-bold">✓ Active</p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded">
                <p className="text-red-200 text-sm">Blood Type</p>
                <p className="text-white text-lg font-bold">
                  {formData.bloodType}
                </p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded">
                <p className="text-red-200 text-sm">Lives Can Save</p>
                <p className="text-white text-lg font-bold">Up to 7</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                ✅ Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>

        {/* Safety Notice */}
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-bold text-blue-300 mb-2">
            🔒 Privacy & Safety
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>✓ Your medical information is encrypted and secure</li>
            <li>✓ Only hospitals and verified donors can see your details</li>
            <li>✓ You can update or delete your profile anytime</li>
            <li>✓ Your blood type helps match with compatible recipients</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
