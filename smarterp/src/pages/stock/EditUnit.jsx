import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUnit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unit_name: "",
    symbol: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/units/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load unit"));
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
      await axios.put(`http://localhost:5000/api/units/${id}`, form);
      alert("Unit updated successfully");
      navigate("/units");
    } catch (error) {
      alert(error.response?.data?.message || "Unit update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Edit Unit
        </h1>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <input
            name="unit_name"
            value={form.unit_name || ""}
            onChange={handleChange}
            placeholder="Unit Name"
            className="border p-3 rounded"
            required
          />

          <input
            name="symbol"
            value={form.symbol || ""}
            onChange={handleChange}
            placeholder="Symbol"
            className="border p-3 rounded"
            required
          />

          <button className="bg-green-600 text-white p-3 rounded col-span-2">
            Update Unit
          </button>
        </form>
      </div>
    </div>
  );
}