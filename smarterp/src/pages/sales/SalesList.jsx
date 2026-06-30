import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SalesList() {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/sales");
    setSales(res.data);
  } catch (error) {
    console.error("Fetch sales error:", error.response?.data || error.message);
  }
};

  useEffect(() => {
    fetchSales();
  }, []);

  const deleteSales = async (id) => {
    if (!window.confirm("Delete this sales voucher?")) return;

    await axios.delete(`http://localhost:5000/api/sales/${id}`);
    alert("Sales voucher deleted");
    fetchSales();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Sales Voucher List
          </h1>

          <Link
            to="/sales/create"
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Create Sales
          </Link>
        </div>

        <table className="w-full border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3">Voucher No</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Invoice No</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="text-center">
                <td className="border p-3">{sale.voucher_no}</td>
                <td className="border p-3">{sale.sale_date}</td>
                <td className="border p-3">{sale.customer_name}</td>
                <td className="border p-3">{sale.invoice_no}</td>
                <td className="border p-3">₹{sale.total_amount}</td>
                <td className="border p-3">
                  <Link
                    to={`/sales/edit/${sale.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteSales(sale.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {sales.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No sales vouchers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}