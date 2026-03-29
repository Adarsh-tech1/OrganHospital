import { useState } from "react";
import API from "../services/api";

function AddDonor() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    organ: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/donor/add", form);
      alert("Donor Added Successfully");
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Error adding donor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Add Donor</h2>

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
          placeholder="Organ (Kidney, Liver...)"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <button className="w-full bg-green-600 p-2">Submit Donor</button>
      </form>
    </div>
  );
}

export default AddDonor;
