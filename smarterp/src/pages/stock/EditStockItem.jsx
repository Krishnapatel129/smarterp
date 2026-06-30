import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStockItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stockGroups, setStockGroups] = useState([]);
  const [units, setUnits] = useState([]);

  const [form, setForm] = useState({
    item_name: "",
    stock_group: "",
    unit: "",
    opening_stock: "",
    rate: "",
    gst_percentage: "",
    description: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/stock-groups").then((res) => {
      setStockGroups(res.data);
    });

    axios.get("http://localhost:5000/api/units").then((res) => {
      setUnits(res.data);
    });

    axios
      .get(`http://localhost:5000/api/stock-items/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load stock item"));
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
      await axios.put(`http://localhost:5000/api/stock-items/${id}`, form);
      alert("Stock item updated successfully");
      navigate("/stock-items");
    } catch (error) {
      alert(error.response?.data?.message || "Stock item update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Edit Stock Item
        </h1>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <input
            name="item_name"
            value={form.item_name || ""}
            onChange={handleChange}
            placeholder="Item Name"
            className="border p-3 rounded"
            required
          />

          <select
            name="stock_group"
            value={form.stock_group || ""}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Stock Group</option>
            {stockGroups.map((group) => (
              <option key={group.id} value={group.group_name}>
                {group.group_name}
              </option>
            ))}
          </select>

          <select
            name="unit"
            value={form.unit || ""}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.symbol}>
                {unit.unit_name} ({unit.symbol})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="opening_stock"
            value={form.opening_stock || ""}
            onChange={handleChange}
            placeholder="Opening Stock"
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="rate"
            value={form.rate || ""}
            onChange={handleChange}
            placeholder="Rate"
            className="border p-3 rounded"
          />

          <select
            name="gst_percentage"
            value={form.gst_percentage || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select GST %</option>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>

          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded col-span-2"
          />

          <button className="bg-green-600 text-white p-3 rounded col-span-2">
            Update Stock Item
          </button>
        </form>
      </div>
    </div>
  );
}