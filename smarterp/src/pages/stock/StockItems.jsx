import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StockItems() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/stock-items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this stock item?")) return;

    await axios.delete(`http://localhost:5000/api/stock-items/${id}`);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Stock Items</h1>

          <Link
            to="/stock-items/create"
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Add Stock Item
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Item Name</th>
              <th className="p-3 border">Stock Group</th>
              <th className="p-3 border">Unit</th>
              <th className="p-3 border">Opening Stock</th>
              <th className="p-3 border">Rate</th>
              <th className="p-3 border">GST %</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border">{item.item_name}</td>
                <td className="p-3 border">{item.stock_group}</td>
                <td className="p-3 border">{item.unit}</td>
                <td className="p-3 border">{item.opening_stock}</td>
                <td className="p-3 border">{item.rate}</td>
                <td className="p-3 border">{item.gst_percentage}</td>
                <td className="p-3 border">
                  <Link
                    to={`/stock-items/edit/${item.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No stock items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}