import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateBill() {
  const [customers, setCustomers] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  const [form, setForm] = useState({
    bill_no: "",
    bill_date: "",
    customer_id: "",
  });

  const [items, setItems] = useState([
    {
      stock_item_id: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ]);

  useEffect(() => {
    fetchCustomers();
    fetchStockItems();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/ledgers");
    setCustomers(res.data);
  };

  const fetchStockItems = async () => {
    const res = await axios.get("http://localhost:5000/api/stock-items");
    setStockItems(res.data);
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    const { name, value } = e.target;

    updatedItems[index][name] = value;

    if (name === "stock_item_id") {
      const selectedItem = stockItems.find(
        (item) => item.id === Number(value)
      );

      updatedItems[index].rate = selectedItem ? selectedItem.rate : 0;
    }

    updatedItems[index].amount =
      Number(updatedItems[index].quantity) *
      Number(updatedItems[index].rate);

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
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    ...form,
    total_amount: totalAmount,
    items,
  };

  try {
    await axios.post("http://localhost:5000/api/billing", data);

    alert("Bill created successfully");
    navigate("/billing/list");
  } catch (error) {
    console.error(error);
    alert("Bill create failed");
  }
};
 return (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-slate-700 mb-8">
        Create Bill
      </h1>

      {/* Bill Details */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div>
          <label className="block font-semibold mb-2">
            Bill No
          </label>

          <input
            type="text"
            name="bill_no"
            value={form.bill_no}
            onChange={handleFormChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter Bill No"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Bill Date
          </label>

          <input
            type="date"
            name="bill_date"
            value={form.bill_date}
            onChange={handleFormChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Customer
          </label>

          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleFormChange}
            className="w-full border rounded-lg p-3"
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

      </div>

      {/* Items Table */}

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-3">Stock Item</th>

              <th className="p-3">Quantity</th>

              <th className="p-3">Rate</th>

              <th className="p-3">Amount</th>

              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr key={index} className="border-b">

                <td className="p-3">

                  <select
                    name="stock_item_id"
                    value={item.stock_item_id}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Select Item</option>

                    {stockItems.map((stock) => (

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
                    className="w-24 border rounded-lg p-2"
                  />

                </td>

                <td className="p-3">

                  <input
                    type="number"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-28 border rounded-lg p-2"
                  />

                </td>

                <td className="p-3 font-semibold">
                  ₹{item.amount}
                </td>

                <td className="p-3">

                  <button
                    type="button"
                    onClick={() => removeItemRow(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Buttons */}

      <div className="flex justify-between items-center mt-8">

        <button
          type="button"
          onClick={addItemRow}
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          + Add Item
        </button>

        <h2 className="text-2xl font-bold">
          Total : ₹{totalAmount}
        </h2>

      </div>

      <div className="mt-8 text-right">

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
        >
          Save Bill
        </button>

      </div>

    </div>
  </div>
);
}