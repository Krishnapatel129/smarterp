import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Ledgers() {
  const [ledgers, setLedgers] = useState([]);

  const fetchLedgers = async () => {
    const res = await axios.get("http://localhost:5000/api/ledgers");
    setLedgers(res.data);
  };

  useEffect(() => {
    fetchLedgers();
  }, []);

  const deleteLedger = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ledger?")) return;

    await axios.delete(`http://localhost:5000/api/ledgers/${id}`);
    alert("Ledger deleted successfully");
    fetchLedgers();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Ledgers</h1>

          <Link
            to="/ledgers/create"
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Add Ledger
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Ledger Name</th>
              <th className="p-3 border">Group</th>
              <th className="p-3 border">Opening Balance</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {ledgers.map((ledger) => (
              <tr key={ledger.id} className="text-center">
                <td className="p-3 border">{ledger.id}</td>
                <td className="p-3 border">{ledger.ledger_name}</td>
                <td className="p-3 border">{ledger.group_name}</td>
                <td className="p-3 border">{ledger.opening_balance}</td>
                <td className="p-3 border">{ledger.balance_type}</td>
                <td className="p-3 border">{ledger.phone}</td>
                <td className="p-3 border">
                  <Link
                    to={`/ledgers/edit/${ledger.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteLedger(ledger.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {ledgers.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No ledgers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}