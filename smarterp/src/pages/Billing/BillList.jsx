import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BillList() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/billing");
      setBills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700">
            Billing System
          </h1>

         <button onClick={() => navigate("/billing/create")}>
  + Create Bill
</button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">Bill No</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Invoice No</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {bills.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    No Bills Found
                  </td>
                </tr>
              ) : (
                bills.map((bill) => (
                  <tr key={bill.id} className="border-b hover:bg-slate-50">
                    <td className="p-4">{bill.bill_no}</td>
                    <td className="p-4">{bill.bill_date?.slice(0, 10)}</td>
                    <td className="p-4">{bill.customer_name}</td>
                    <td className="p-4">{bill.invoice_no}</td>
                    <td className="p-4 text-right font-semibold">
                      ₹{bill.total_amount}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/billing/print/${bill.id}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Print
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}