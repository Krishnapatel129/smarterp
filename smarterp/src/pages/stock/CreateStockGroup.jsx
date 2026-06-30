import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateStockGroup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    group_name: "",
    parent_group: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/stock-groups", form);
    alert("Stock group created");
    navigate("/stock-groups");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Create Stock Group</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="group_name"
            value={form.group_name}
            onChange={handleChange}
            placeholder="Stock Group Name"
            className="border p-3 rounded"
            required
          />

          <select
  name="parent_group"
  value={form.parent_group}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select Parent Group</option>
  <option value="Primary">Primary</option>
  <option value="Electronics">Electronics</option>
  <option value="Grocery">Grocery</option>
  <option value="Furniture">Furniture</option>
  <option value="Clothing">Clothing</option>
</select>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded col-span-2"
          />

          <button className="bg-blue-600 text-white p-3 rounded col-span-2">
            Save Stock Group
          </button>
        </form>
      </div>
    </div>
  );
}