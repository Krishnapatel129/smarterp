import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReceiptList() {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    const res = await axios.get("http://localhost:5000/api/receipts");
    setReceipts(res.data);
  };

  const deleteReceipt = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/api/receipts/${id}`);
    fetchReceipts();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-700">
            Receipt Vouchers
          </h1>

          <button
            onClick={() => navigate("/receipts/create")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            + Create Receipt
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Receipt No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Mode</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.id} className="border-b text-center">
                <td className="p-3">{receipt.receipt_no}</td>
                <td className="p-3">
                  {new Date(receipt.receipt_date).toLocaleDateString()}
                </td>
                <td className="p-3">{receipt.customer_name}</td>
                <td className="p-3">{receipt.payment_mode}</td>
                <td className="p-3">₹{receipt.amount}</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteReceipt(receipt.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {receipts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  No receipts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}