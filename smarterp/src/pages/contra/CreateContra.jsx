import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateContra() {
  const navigate = useNavigate();

  const [ledgers, setLedgers] = useState([]);

  const [form, setForm] = useState({
    voucher_no: "",
    voucher_date: "",
    from_account: "",
    to_account: "",
    amount: "",
    narration: "",
  });

  useEffect(() => {
    fetchLedgers();
  }, []);

  const fetchLedgers = async () => {
    const res = await axios.get("http://localhost:5000/api/ledgers");
    setLedgers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/contra",
      form
    );

    alert("Contra Voucher Created");

    navigate("/contra");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-8">
          Create Contra Voucher
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <input
            name="voucher_no"
            placeholder="Voucher No"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="date"
            name="voucher_date"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="from_account"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Select From Account</option>

            {ledgers.map((l) => (
              <option
                key={l.id}
                value={l.id}
              >
                {l.ledger_name}
              </option>
            ))}
          </select>

          <select
            name="to_account"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Select To Account</option>

            {ledgers.map((l) => (
              <option
                key={l.id}
                value={l.id}
              >
                {l.ledger_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="narration"
            placeholder="Narration"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <div className="md:col-span-2 text-right">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded"
            >
              Save Contra
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}