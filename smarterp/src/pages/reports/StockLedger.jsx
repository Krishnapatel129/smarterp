import { useEffect, useState } from "react";
import axios from "axios";

export default function StockLedger() {
  const [stockLedger, setStockLedger] = useState([]);

  useEffect(() => {
    fetchStockLedger();
  }, []);

  const fetchStockLedger = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stock-ledger");
      setStockLedger(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load stock ledger");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-700 mb-6">
          Stock Ledger
        </h1>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Item Name</th>
              <th className="p-3">Opening Stock</th>
              <th className="p-3">Stock In</th>
              <th className="p-3">Stock Out</th>
              <th className="p-3">Closing Stock</th>
              <th className="p-3">Purchase Rate</th>
              <th className="p-3">Stock Value</th>
            </tr>
          </thead>

          <tbody>
            {stockLedger.map((item) => (
              <tr key={item.stock_item_id} className="border-b text-center">
                <td className="p-3">{item.item_name}</td>
                <td className="p-3">{item.opening_stock}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {item.stock_in}
                </td>
                <td className="p-3 text-red-600 font-semibold">
                  {item.stock_out}
                </td>
                <td className="p-3 font-bold">{item.closing_stock}</td>
                <td className="p-3">₹{Number(item.purchase_rate).toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</td>
                <td className="p-3 font-bold">₹{Number(item.stock_value).toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</td>
              </tr>
            ))}

            {stockLedger.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  No stock data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}