import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PrintBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = async () => {
    const res = await axios.get(`http://localhost:5000/api/billing/${id}`);
    setBill(res.data.bill);
    setItems(res.data.items);
  };

  if (!bill) {
    return <div className="p-8 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 print:bg-white print:p-0">
      <div className="mb-6 flex gap-4 print:hidden">
        <button
          onClick={() => navigate("/billing/list")}
          className="rounded bg-gray-600 px-5 py-2 text-white hover:bg-gray-700"
        >
          Back
        </button>

        <button
          onClick={() => window.print()}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Print Bill
        </button>
      </div>

      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg print:shadow-none print:rounded-none">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">SmartERP</h1>
          <p className="text-sm text-gray-500">
            Accounting & Inventory Management System
          </p>
          <h2 className="mt-4 text-xl font-semibold uppercase">
            Tax Invoice / Bill
          </h2>
        </div>

        <div className="my-6 border-t border-gray-300"></div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p>
              <span className="font-semibold">Bill No:</span>{" "}
              {bill.bill_no}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {bill.bill_date?.slice(0, 10)}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">Bill To:</p>
            <p>{bill.customer_name}</p>
          </div>
        </div>

        <div className="my-6 border-t border-gray-300"></div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-200 print:bg-white">
              <th className="border p-3 text-left">No</th>
              <th className="border p-3 text-left">Item Name</th>
              <th className="border p-3 text-right">Qty</th>
              <th className="border p-3 text-right">Rate</th>
              <th className="border p-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-3">{index + 1}</td>
                <td className="border p-3">{item.item_name}</td>
                <td className="border p-3 text-right">
                  {item.quantity}
                </td>
                <td className="border p-3 text-right">
                  ₹{item.rate}
                </td>
                <td className="border p-3 text-right">
                  ₹{item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-end">
          <div className="w-72">
            <div className="flex justify-between border-b py-2">
              <span className="font-semibold">Grand Total</span>
              <span className="font-bold">₹{bill.total_amount}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="font-semibold">Terms & Conditions</p>
            <p className="text-gray-500">
              Goods once sold will not be returned.
            </p>
          </div>

          <div className="text-right">
            <p className="mb-10">Authorized Signature</p>
            <p className="font-semibold">SmartERP</p>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Thank you for your business!
        </p>
      </div>
    </div>
  );
}