import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSales() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  const [form, setForm] = useState({
    voucher_no: "",
    invoice_no: "",
    customer_id: "",
    sale_date: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/ledgers").then((res) => {
      setCustomers(res.data);
    });

    axios.get("http://localhost:5000/api/stock-items").then((res) => {
      setStockItems(res.data);
    });

    axios.get(`http://localhost:5000/api/sales/${id}`).then((res) => {
      const sale = res.data;

      setForm({
        voucher_no: sale.voucher_no || "",
        invoice_no: sale.invoice_no || "",
        customer_id: sale.customer_id || "",
        sale_date: sale.sale_date
          ? sale.sale_date.substring(0, 10)
          : "",
      });

      setItems(
        sale.items && sale.items.length > 0
          ? sale.items
          : [
              {
                stock_item_id: "",
                quantity: 1,
                rate: 0,
                amount: 0,
              },
            ]
      );
    });
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];

    updatedItems[index][name] = value;

    if (name === "stock_item_id") {
      const selectedItem = stockItems.find(
        (item) => item.id === Number(value)
      );

      if (selectedItem) {
        updatedItems[index].rate = selectedItem.rate;
      }
    }

    const qty = Number(updatedItems[index].quantity || 0);
    const rate = Number(updatedItems[index].rate || 0);

    updatedItems[index].amount = qty * rate;

    setItems(updatedItems);
  };

  const addItemRow = () => {
    setItems([
      ...items,
      {
        stock_item_id: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const removeItemRow = (index) => {
    if (items.length === 1) {
      alert("At least one item is required");
      return;
    }

    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      total_amount: totalAmount,
      items,
    };

    try {
      await axios.put(`http://localhost:5000/api/sales/${id}`, payload);
      alert("Sales voucher updated successfully");
      navigate("/sales");
    } catch (error) {
      alert(error.response?.data?.message || "Sales update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Edit Sales Voucher
        </h1>

        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <input
              name="voucher_no"
              value={form.voucher_no}
              onChange={handleFormChange}
              placeholder="Voucher No"
              className="border p-3 rounded"
              required
            />

            <input
              name="invoice_no"
              value={form.invoice_no}
              onChange={handleFormChange}
              placeholder="Invoice No"
              className="border p-3 rounded"
            />

            <input
              type="date"
              name="sale_date"
              value={form.sale_date}
              onChange={handleFormChange}
              className="border p-3 rounded"
              required
            />

            <select
              name="customer_id"
              value={form.customer_id}
              onChange={handleFormChange}
              className="border p-3 rounded"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.ledger_name}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full border mb-6">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border">Stock Item</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Rate</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Remove</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 border">
                    <select
                      name="stock_item_id"
                      value={item.stock_item_id || ""}
                      onChange={(e) => handleItemChange(index, e)}
                      className="border p-2 rounded w-full"
                      required
                    >
                      <option value="">Select Item</option>
                      {stockItems.map((stock) => (
                        <option key={stock.id} value={stock.id}>
                          {stock.item_name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3 border">
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity || ""}
                      onChange={(e) => handleItemChange(index, e)}
                      className="border p-2 rounded w-full"
                    />
                  </td>

                  <td className="p-3 border">
                    <input
                      type="number"
                      name="rate"
                      value={item.rate || ""}
                      onChange={(e) => handleItemChange(index, e)}
                      className="border p-2 rounded w-full"
                    />
                  </td>

                  <td className="p-3 border">
                    <input
                      value={item.amount || 0}
                      readOnly
                      className="border p-2 rounded w-full bg-gray-100"
                    />
                  </td>

                  <td className="p-3 border text-center">
                    <button
                      type="button"
                      onClick={() => removeItemRow(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            onClick={addItemRow}
            className="bg-gray-700 text-white px-5 py-2 rounded mb-6"
          >
            + Add Item
          </button>

          <h2 className="text-2xl font-bold text-right mb-6">
            Total: ₹{totalAmount}
          </h2>

          <button className="bg-green-600 text-white p-3 rounded w-full">
            Update Sales Voucher
          </button>
        </form>
      </div>
    </div>
  );
}