import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateCompany() {
  const navigate = useNavigate();

  const [form, setForm] =useState({
  company_name: "",
  owner_name: "",
  email: "",
  phone: "",
  gst_number: "",
  pan_number: "",
  address: "",
  state: "",
  pincode: "",
  financial_year: "",
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
      await axios.post("http://localhost:5000/api/companies", form);
      alert("Company created successfully");
      navigate("/companies");
    } catch (error) {
      alert(error.response?.data?.message || "Company create failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Create Company
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
  name="company_name"
  value={form.company_name}
  placeholder="Company Name"
  onChange={handleChange}
  className="border p-3 rounded"
  required
/>
          <input name="owner_name" value={form.owner_name} placeholder="Owner Name" onChange={handleChange} className="border p-3 rounded" />
          <input name="email" value={form.email} placeholder="Email" onChange={handleChange} className="border p-3 rounded" />
          <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} className="border p-3 rounded" />
          <input name="gst_number" value={form.gst_number} placeholder="GST Number" onChange={handleChange} className="border p-3 rounded" />
          <input name="pan_number" value={form.pan_number} placeholder="PAN Number" onChange={handleChange} className="border p-3 rounded" />
         <select
  name="state"
  value={form.state}
  onChange={handleChange}
  className="border p-3 rounded"
  required
>
  <option value="">Select State</option>

  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>

  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">
    Dadra and Nagar Haveli and Daman and Diu
  </option>
  <option value="Delhi">Delhi</option>
  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
  <option value="Ladakh">Ladakh</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Puducherry">Puducherry</option>
</select>
          <input name="pincode" value={form.pincode} placeholder="Pincode" onChange={handleChange} className="border p-3 rounded" />
         <select
  name="financial_year"
  value={form.financial_year}
  onChange={handleChange}
  className="border p-3 rounded"
  required
>
  <option value="">Select Financial Year</option>
  <option value="2024-25">2024-25</option>
  <option value="2025-26">2025-26</option>
  <option value="2026-27">2026-27</option>
  <option value="2027-28">2027-28</option>
  <option value="2028-29">2028-29</option>
  <option value="2029-30">2029-30</option>
  <option value="2030-31">2030-31</option>
</select>

          <textarea
            name="address"
            value={form.address}
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded col-span-2"
          />

          <button className="bg-blue-600 text-white p-3 rounded col-span-2">
            Save Company
          </button>
        </form>
      </div>
    </div>
  );
}