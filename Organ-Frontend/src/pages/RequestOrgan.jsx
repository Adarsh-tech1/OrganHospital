import { useState } from "react";
import API from "../services/api";

function RequestOrgan() {
  const [form, setForm] = useState({
    bloodGroup: "",
    organ: "",
    urgency: "",
    city: "",
    state: "",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Capitalize organ enum
    const payload = {
      ...form,
      organ: form.organ.charAt(0).toUpperCase() + form.organ.slice(1),
      location: {
        city: form.city,
        state: form.state,
        country: form.country,
      },
    };
    delete payload.city;
    delete payload.state;
    delete payload.country;

    try {
      const { data } = await API.post("/request", payload);
      alert("✅ Request Sent Successfully! AI matching started...");
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 to-blue-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/80 backdrop-blur p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Request Organ
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            name="bloodGroup"
            placeholder="Blood Group (O+, A-, etc.)"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <select
            name="organ"
            value={form.organ}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select Organ</option>
            <option value="Heart">Heart</option>
            <option value="Liver">Liver</option>
            <option value="Kidney">Kidney</option>
            <option value="Lung">Lung</option>
            <option value="Pancreas">Pancreas</option>
            <option value="Cornea">Cornea</option>
          </select>

          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          >
            <option value="">Urgency Level</option>
            <option value="critical">Critical ⚠️</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-xl font-bold text-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        >
          🚀 Send Request & AI Match
        </button>
      </form>
    </div>
  );
}

export default RequestOrgan;
