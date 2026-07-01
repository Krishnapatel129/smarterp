import { useEffect, useState } from "react";
import axios from "axios";

export default function GSTReport() {
  const [gstData, setGstData] = useState([]);

  useEffect(() => {
    fetchGSTReport();
  }, []);

  const fetchGSTReport = async () => {
    const res = await axios.get("http://localhost:5000/api/gst");
    setGstData(res.data);
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">GST Report</h1>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Invoice</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Item</th>
              <th className="p-3">HSN</th>
              <th className="p-3">GST %</th>
              <th className="p-3">Taxable</th>
              <th className="p-3">CGST</th>
              <th className="p-3">SGST</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {gstData.map((row, index) => (
              <tr key={index} className="border-b text-center">
                <td className="p-3">
                  {new Date(row.sale_date).toLocaleDateString()}
                </td>
                <td className="p-3">{row.invoice_no}</td>
                <td className="p-3">{row.customer_name}</td>
                <td className="p-3">{row.item_name}</td>
                <td className="p-3">{row.hsn_code}</td>
                <td className="p-3">{row.gst_percent}%</td>
                <td className="p-3">₹{formatMoney(row.taxable_value)}</td>
                <td className="p-3">₹{formatMoney(row.cgst)}</td>
                <td className="p-3">₹{formatMoney(row.sgst)}</td>
                <td className="p-3 font-bold">₹{formatMoney(row.total_amount)}</td>
              </tr>
            ))}

            {gstData.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center p-5">
                  No GST data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}