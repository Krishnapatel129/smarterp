import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StockGroups() {
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const res = await axios.get("http://localhost:5000/api/stock-groups");
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const deleteGroup = async (id) => {
    if (!window.confirm("Delete this stock group?")) return;
    await axios.delete(`http://localhost:5000/api/stock-groups/${id}`);
    fetchGroups();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Stock Groups</h1>
          <Link to="/stock-groups/create" className="bg-blue-600 text-white px-5 py-3 rounded">
            Add Stock Group
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Group Name</th>
              <th className="p-3 border">Parent Group</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {groups.map((g) => (
              <tr key={g.id} className="text-center">
                <td className="p-3 border">{g.id}</td>
                <td className="p-3 border">{g.group_name}</td>
                <td className="p-3 border">{g.parent_group}</td>
                <td className="p-3 border">{g.description}</td>
                <td className="p-3 border">
                  <Link to={`/stock-groups/edit/${g.id}`} className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </Link>
                  <button onClick={() => deleteGroup(g.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {groups.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No stock groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}