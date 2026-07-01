import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  const [form, setForm] = useState({
    bill_no: "",
    bill_date: "",
    customer_id: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchStockItems();
    fetchBill();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/ledgers");
    setCustomers(res.data);
  };

  const fetchStockItems = async () => {
    const res = await axios.get("http://localhost:5000/api/stock-items");
    setStockItems(res.data);
  };

  const fetchBill = async () => {
    const res = await axios.get(`http://localhost:5000/api/bills/${id}`);

    setForm({
      bill_no: res.data.bill.bill_no,
      bill_date: res.data.bill.bill_date.slice(0, 10),
      customer_id: res.data.bill.customer_id,
    });

    setItems(res.data.items);
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

    try {
      await axios.put(`http://localhost:5000/api/bills/${id}`, {
        ...form,
        items,
      });

      alert("Bill updated successfully");
      navigate("/billing/list");
    } catch (error) {
      console.error(error);
      alert("Bill update failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Edit Bill</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bill_no"
          value={form.bill_no}
          onChange={handleFormChange}
          required
        />

        <br />
        <br />

        <input
          type="date"
          name="bill_date"
          value={form.bill_date}
          onChange={handleFormChange}
          required
        />

        <br />
        <br />

        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleFormChange}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Stock Item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    name="stock_item_id"
                    value={item.stock_item_id}
                    onChange={(e) => handleItemChange(index, e)}
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

                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    min="1"
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                </td>

                <td>{item.amount}</td>

                <td>
                  <button type="button" onClick={() => removeItemRow(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />

        <button type="button" onClick={addItemRow}>
          + Add Item
        </button>

        <h3>Total Amount: ₹{totalAmount}</h3>

        <button type="submit">Update Bill</button>
      </form>
    </div>
  );
}