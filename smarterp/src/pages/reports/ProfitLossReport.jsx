import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfitLossReport() {
  const [report, setReport] = useState({
    total_sales: 0,
    total_purchase: 0,
    gross_profit: 0,
  });

  useEffect(() => {
    fetchProfitLoss();
  }, []);

  const fetchProfitLoss = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/profit-loss");
    setReport(res.data);
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const isProfit = Number(report.gross_profit) >= 0;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Profit & Loss Report</h1>

        <div className="space-y-5">
          <div className="flex justify-between border p-5 rounded-lg">
            <span className="font-semibold text-lg">Total Sales</span>
            <span className="font-bold text-green-700">
              ₹{formatMoney(report.total_sales)}
            </span>
          </div>

          <div className="flex justify-between border p-5 rounded-lg">
            <span className="font-semibold text-lg">Total Purchase</span>
            <span className="font-bold text-red-700">
              ₹{formatMoney(report.total_purchase)}
            </span>
          </div>

          <div className="flex justify-between border p-5 rounded-lg bg-gray-100">
            <span className="font-semibold text-xl">
              {isProfit ? "Gross Profit" : "Gross Loss"}
            </span>

            <span
              className={`font-bold text-xl ${
                isProfit ? "text-green-700" : "text-red-700"
              }`}
            >
              ₹{formatMoney(Math.abs(Number(report.gross_profit)))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}