import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUnit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unit_name: "",
    symbol: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/units", form);
      alert("Unit created successfully");
      navigate("/units");
    } catch (error) {
      alert(error.response?.data?.message || "Unit create failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Create Unit
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="unit_name"
            value={form.unit_name}
            onChange={handleChange}
            placeholder="Unit Name e.g. Kilogram"
            className="border p-3 rounded"
            required
          />

          <input
            name="symbol"
            value={form.symbol}
            onChange={handleChange}
            placeholder="Symbol e.g. Kg"
            className="border p-3 rounded"
            required
          />

          <button className="bg-blue-600 text-white p-3 rounded col-span-2">
            Save Unit
          </button>
        </form>
      </div>
    </div>
  );
}