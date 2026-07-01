import { useEffect, useState } from "react";
import axios from "axios";

export default function PurchaseReport() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchaseReport();
  }, []);

  const fetchPurchaseReport = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/purchase");
    setPurchases(res.data);
  };

  const totalPurchase = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.total_amount),
    0
  );

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Purchase Report</h1>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Voucher No</th>
              <th className="p-3">Invoice No</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="border-b text-center">
                <td className="p-3">
                  {new Date(purchase.purchase_date).toLocaleDateString()}
                </td>
                <td className="p-3">{purchase.voucher_no}</td>
                <td className="p-3">{purchase.invoice_no}</td>
                <td className="p-3">{purchase.supplier_name}</td>
                <td className="p-3 font-bold">
                  ₹{formatMoney(purchase.total_amount)}
                </td>
              </tr>
            ))}

            {purchases.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-5">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td colSpan="4" className="text-right p-4">
                Total Purchase
              </td>
              <td className="p-4 text-green-700">
                ₹{formatMoney(totalPurchase)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}