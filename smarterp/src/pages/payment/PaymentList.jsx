import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentList() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:5000/api/payments");
    setPayments(res.data);
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/api/payments/${id}`);
    fetchPayments();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-700">
            Payment Vouchers
          </h1>

          <button
            onClick={() => navigate("/payments/create")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            + Create Payment
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Payment No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Mode</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b text-center">
                <td className="p-3">{payment.payment_no}</td>
                <td className="p-3">
                  {new Date(payment.payment_date).toLocaleDateString()}
                </td>
                <td className="p-3">{payment.supplier_name}</td>
                <td className="p-3">{payment.payment_mode}</td>
                <td className="p-3">₹{payment.amount}</td>
                <td className="p-3">
                  <button
                    onClick={() => deletePayment(payment.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}