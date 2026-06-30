import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateLedger() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ledger_name: "",
    group_name: "",
    opening_balance: "",
    balance_type: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/ledgers", form);
      alert("Ledger created successfully");
      navigate("/ledgers");
    } catch (error) {
      alert(error.response?.data?.message || "Ledger create failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Create Ledger
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="ledger_name"
            value={form.ledger_name}
            placeholder="Ledger Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <select
            name="group_name"
            value={form.group_name}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Group</option>
            <option value="Capital Account">Capital Account</option>
            <option value="Sundry Debtors">Sundry Debtors</option>
            <option value="Sundry Creditors">Sundry Creditors</option>
            <option value="Sales Account">Sales Account</option>
            <option value="Purchase Account">Purchase Account</option>
            <option value="Bank Account">Bank Account</option>
            <option value="Cash Account">Cash Account</option>
            <option value="Direct Expenses">Direct Expenses</option>
            <option value="Indirect Expenses">Indirect Expenses</option>
            <option value="Duties & Taxes">Duties & Taxes</option>
          </select>

          <input
            type="number"
            name="opening_balance"
            value={form.opening_balance}
            placeholder="Opening Balance"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="balance_type"
            value={form.balance_type}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Balance Type</option>
            <option value="Dr">Dr</option>
            <option value="Cr">Cr</option>
          </select>

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <textarea
            name="address"
            value={form.address}
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded col-span-2"
          />

          <button className="bg-blue-600 text-white p-3 rounded col-span-2">
            Save Ledger
          </button>
        </form>
      </div>
    </div>
  );
}