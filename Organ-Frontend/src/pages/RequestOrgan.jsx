import { useState } from "react";
import API from "../services/api";

function RequestOrgan() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    organ: "",
    urgency: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/request/create", form);
      alert("Request Sent Successfully");
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Error sending request");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Request Organ</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <input
          name="bloodGroup"
          placeholder="Blood Group"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <input
          name="organ"
          placeholder="Organ Needed"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <select
          name="urgency"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        >
          <option value="">Select Urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <button className="w-full bg-red-600 p-2">Request Organ</button>
      </form>
    </div>
  );
}

export default RequestOrgan;
