import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStockGroup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    group_name: "",
    parent_group: "",
    description: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/stock-groups/${id}`)
      .then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/stock-groups/${id}`, form);
    alert("Stock group updated");
    navigate("/stock-groups");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Edit Stock Group</h1>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <input name="group_name" value={form.group_name || ""} onChange={handleChange} className="border p-3 rounded" required />
          <input name="parent_group" value={form.parent_group || ""} onChange={handleChange} className="border p-3 rounded" />
          <textarea name="description" value={form.description || ""} onChange={handleChange} className="border p-3 rounded col-span-2" />

          <button className="bg-green-600 text-white p-3 rounded col-span-2">
            Update Stock Group
          </button>
        </form>
      </div>
    </div>
  );
}