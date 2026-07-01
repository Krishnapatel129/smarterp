import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePayment() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    payment_no: "",
    payment_date: "",
    supplier_id: "",
    payment_mode: "",
    amount: "",
    narration: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const res = await axios.get("http://localhost:5000/api/ledgers");
    setSuppliers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/payments", form);
      alert("Payment voucher created successfully");
      navigate("/payments");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        alert("Payment No already exists");
      } else {
        alert("Payment create failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-700 mb-8">
          Create Payment Voucher
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Payment No</label>
            <input
              type="text"
              name="payment_no"
              value={form.payment_no}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Payment Date</label>
            <input
              type="date"
              name="payment_date"
              value={form.payment_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Supplier</label>
            <select
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
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
            <label className="block font-semibold mb-2">Payment Mode</label>
            <select
              name="payment_mode"
              value={form.payment_mode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Mode</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="UPI">UPI</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Narration</label>
            <input
              type="text"
              name="narration"
              value={form.narration}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Paid amount to supplier"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}