import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Units() {
  const [units, setUnits] = useState([]);

  const fetchUnits = async () => {
    const res = await axios.get("http://localhost:5000/api/units");
    setUnits(res.data);
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const deleteUnit = async (id) => {
    if (!window.confirm("Delete this unit?")) return;

    await axios.delete(`http://localhost:5000/api/units/${id}`);
    fetchUnits();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-5xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Units</h1>

          <Link
            to="/units/create"
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Add Unit
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Unit Name</th>
              <th className="p-3 border">Symbol</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="text-center">
                <td className="p-3 border">{unit.id}</td>
                <td className="p-3 border">{unit.unit_name}</td>
                <td className="p-3 border">{unit.symbol}</td>
                <td className="p-3 border">
                  <Link
                    to={`/units/edit/${unit.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteUnit(unit.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {units.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No units found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}