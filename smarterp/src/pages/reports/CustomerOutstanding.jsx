import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerOutstanding() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchOutstanding();
  }, []);

  const fetchOutstanding = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/reports/customer-outstanding"
    );
    setCustomers(res.data);
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalOutstanding = customers.reduce(
    (sum, customer) => sum + Number(customer.outstanding_amount),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">
          Customer Outstanding Report
        </h1>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Total Sales</th>
              <th className="p-3">Total Receipt</th>
              <th className="p-3">Outstanding</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id} className="border-b text-center">
                <td className="p-3">{customer.customer_name}</td>
                <td className="p-3">₹{formatMoney(customer.total_sales)}</td>
                <td className="p-3 text-green-700">
                  ₹{formatMoney(customer.total_receipt)}
                </td>
                <td className="p-3 font-bold text-red-600">
                  ₹{formatMoney(customer.outstanding_amount)}
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-5">
                  No outstanding found
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td colSpan="3" className="text-right p-4">
                Total Outstanding
              </td>
              <td className="p-4 text-red-700">
                ₹{formatMoney(totalOutstanding)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}