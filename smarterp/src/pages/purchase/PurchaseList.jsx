import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PurchaseList() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/purchase");
      setPurchases(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load purchase vouchers");
    }
  };

  const deletePurchase = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purchase voucher?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/purchase/${id}`);
      fetchPurchases();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Purchase Voucher List
          </h1>

          <button
            onClick={() => navigate("/purchase/create")}
            className="flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800"
          >
            <Plus size={20} />
            New Purchase
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-4 text-left">Voucher No</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Supplier</th>
                <th className="p-4 text-left">Invoice No</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No Purchase Vouchers Found
                  </td>
                </tr>
              ) : (
                purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      {purchase.voucher_no}
                    </td>

                    <td className="p-4">
                      {new Date(
                        purchase.purchase_date
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td className="p-4">
                      {purchase.supplier_name}
                    </td>

                    <td className="p-4">
                      {purchase.invoice_no}
                    </td>

                    <td className="p-4 text-right font-bold text-green-700">
                      ₹
                      {Number(
                        purchase.total
                      ).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          deletePurchase(purchase.id)
                        }
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
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