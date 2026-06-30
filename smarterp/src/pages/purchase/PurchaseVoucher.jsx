import { useEffect, useState } from "react";
import axios from "axios";

export default function PurchaseVoucher() {
  const [suppliers, setSuppliers] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  const [form, setForm] = useState({
    purchase_date: "",
    supplier_id: "",
    invoice_no: "",
    narration: "",
  });

  const [items, setItems] = useState([
    {
      stock_item_id: "",
      quantity: 1,
      rate: 0,
      gst_percent: 18,
      amount: 0,
    },
  ]);

  useEffect(() => {
    fetchSuppliers();
    fetchItems();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ledgers");
      setSuppliers(res.data);
    } catch (error) {
      console.error("Supplier fetch error:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stock-items");
      setItemsList(res.data);
    } catch (error) {
      console.error("Stock item fetch error:", error);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index][e.target.name] = e.target.value;

    const qty = Number(updatedItems[index].quantity || 0);
    const rate = Number(updatedItems[index].rate || 0);

    updatedItems[index].amount = qty * rate;

    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        stock_item_id: "",
        quantity: 1,
        rate: 0,
        gst_percent: 18,
        amount: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.amount || 0);
  }, 0);

  const gst_amount = items.reduce((sum, item) => {
    return (
      sum +
      (Number(item.amount || 0) * Number(item.gst_percent || 0)) / 100
    );
  }, 0);

  const total = subtotal + gst_amount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/purchase", {
        ...form,
        items,
        subtotal,
        gst_amount,
        total,
      });

      alert("Purchase voucher saved successfully");

      setForm({
        purchase_date: "",
        supplier_id: "",
        invoice_no: "",
        narration: "",
      });

      setItems([
        {
          stock_item_id: "",
          quantity: 1,
          rate: 0,
          gst_percent: 18,
          amount: 0,
        },
      ]);
    } catch (error) {
      console.error("Purchase save error:", error);
      alert("Purchase save failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Purchase Voucher
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block font-semibold mb-2">
                Purchase Date
              </label>
              <input
                type="date"
                name="purchase_date"
                value={form.purchase_date}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Supplier
              </label>
              <select
                name="supplier_id"
                value={form.supplier_id}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.ledger_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Invoice No
              </label>
              <input
                type="text"
                name="invoice_no"
                value={form.invoice_no}
                onChange={handleFormChange}
                placeholder="Enter invoice no"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Purchase Items
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">GST %</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">
                      <select
                        name="stock_item_id"
                        value={item.stock_item_id}
                        onChange={(e) => handleItemChange(index, e)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">Select Item</option>
                        {itemsList.map((stock) => (
                          <option key={stock.id} value={stock.id}>
                            {stock.item_name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        min="1"
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-center"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, e)}
                        min="0"
                        className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-center"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        name="gst_percent"
                        value={item.gst_percent}
                        onChange={(e) => handleItemChange(index, e)}
                        min="0"
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-center"
                      />
                    </td>

                    <td className="p-3 text-center font-semibold">
                      ₹{Number(item.amount || 0).toFixed(2)}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                        disabled={items.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addRow}
            className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Row
          </button>

          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-96 bg-slate-50 border rounded-lg p-5">
              <div className="flex justify-between py-2">
                <span className="font-semibold">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-semibold">GST</span>
                <span>₹{gst_amount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-3 border-t mt-2 text-xl font-bold text-blue-700">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block font-semibold mb-2">
              Narration
            </label>
            <textarea
              name="narration"
              value={form.narration}
              onChange={handleFormChange}
              rows="3"
              placeholder="Enter narration"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold"
            >
              Save Purchase
            </button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}