import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContraList() {
  const navigate = useNavigate();

  const [contra, setContra] = useState([]);

  useEffect(() => {
    fetchContra();
  }, []);

  const fetchContra = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/contra"
    );

    setContra(res.data);
  };

  const deleteContra = async (id) => {
    if (!window.confirm("Delete?")) return;

    await axios.delete(
      `http://localhost:5000/api/contra/${id}`
    );

    fetchContra();
  };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Contra Voucher List
        </h1>

        <button
          onClick={() =>
            navigate("/contra/create")
          }
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          + Create Contra
        </button>

      </div>

      <table className="w-full border">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th>Voucher</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {contra.map((row) => (
            <tr
              key={row.id}
              className="text-center border-b"
            >
              <td>{row.voucher_no}</td>
              <td>{row.voucher_date}</td>
              <td>{row.from_account}</td>
              <td>{row.to_account}</td>
              <td>₹{row.amount}</td>

              <td>
                <button
                  onClick={() =>
                    deleteContra(row.id)
                  }
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}