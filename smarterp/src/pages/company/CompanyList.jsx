import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const res = await axios.get("http://localhost:5000/api/companies");
    setCompanies(res.data);
  };

  const deleteCompany = async (id) => {
    if (!confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/api/companies/${id}`);
    fetchCompanies();
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Companies</h1>

          <Link
            to="/companies/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Company
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Owner</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">GST</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="p-3 border">{c.id}</td>
                <td className="p-3 border">{c.company_name}</td>
                <td className="p-3 border">{c.owner_name}</td>
                <td className="p-3 border">{c.phone}</td>
                <td className="p-3 border">{c.gst_number}</td>
                <td className="p-3 border space-x-2">
                  <Link
  to={`/companies/edit/${c.id}`}
  className="bg-green-600 text-white px-3 py-1 rounded"
>
  Edit
</Link>

                  <button
                    onClick={() => deleteCompany(c.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {companies.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}