import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGroup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    group_name: "",
    parent_group: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/groups/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load group"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/groups/${id}`, form);
      alert("Group updated successfully");
      navigate("/groups");
    } catch (error) {
      alert(error.response?.data?.message || "Group update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Edit Group
        </h1>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <input
            name="group_name"
            value={form.group_name || ""}
            placeholder="Group Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <select
            name="parent_group"
            value={form.parent_group || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Parent Group</option>
            <option value="Assets">Assets</option>
            <option value="Liabilities">Liabilities</option>
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
            <option value="Capital">Capital</option>
          </select>

          <textarea
            name="description"
            value={form.description || ""}
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded col-span-2"
          />

          <button className="bg-green-600 text-white p-3 rounded col-span-2">
            Update Group
          </button>
        </form>
      </div>
    </div>
  );
}