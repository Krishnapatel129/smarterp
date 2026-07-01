import { useEffect, useState } from "react";
import axios from "axios";

export default function SupplierOutstanding() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchOutstanding();
  }, []);

  const fetchOutstanding = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/reports/supplier-outstanding"
    );
    setSuppliers(res.data);
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalOutstanding = suppliers.reduce(
    (sum, supplier) => sum + Number(supplier.outstanding_amount),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">
          Supplier Outstanding Report
        </h1>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Supplier</th>
              <th className="p-3">Total Purchase</th>
              <th className="p-3">Total Payment</th>
              <th className="p-3">Outstanding</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id} className="border-b text-center">
                <td className="p-3">{supplier.supplier_name}</td>
                <td className="p-3">₹{formatMoney(supplier.total_purchase)}</td>
                <td className="p-3 text-green-700">
                  ₹{formatMoney(supplier.total_payment)}
                </td>
                <td className="p-3 font-bold text-red-600">
                  ₹{formatMoney(supplier.outstanding_amount)}
                </td>
              </tr>
            ))}

            {suppliers.length === 0 && (
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