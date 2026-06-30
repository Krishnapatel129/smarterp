import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Groups() {
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const res = await axios.get("http://localhost:5000/api/groups");
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const deleteGroup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    await axios.delete(`http://localhost:5000/api/groups/${id}`);
    alert("Group deleted successfully");
    fetchGroups();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Groups</h1>

          <Link
  to="/groups/create"
  className="bg-blue-600 text-white px-5 py-3 rounded"
>
  Add Group
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
            {groups.map((group) => (
              <tr key={group.id} className="text-center">
                <td className="p-3 border">{group.id}</td>
                <td className="p-3 border">{group.group_name}</td>
                <td className="p-3 border">{group.parent_group}</td>
                <td className="p-3 border">{group.description}</td>
                <td className="p-3 border">
                  <Link
                    to={`/groups/edit/${group.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteGroup(group.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {groups.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}