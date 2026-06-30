import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import CompanyList from "./pages/company/CompanyList";
import CreateCompany from "./pages/company/CreateCompany";
import EditCompany from "./pages/company/EditCompany.jsx";

import Ledgers from "./pages/ledger/Ledgers";
import CreateLedger from "./pages/ledger/CreateLedger.jsx";
import EditLedger from "./pages/ledger/EditLedger.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/create" element={<CreateCompany />} />
        <Route path="/companies/edit/:id" element={<EditCompany />} />

        <Route path="/ledgers" element={<Ledgers />} />
        <Route path="/ledgers/create" element={<CreateLedger />} />
        <Route path="/ledgers/edit/:id" element={<EditLedger />} />
      </Routes>
    </BrowserRouter>
  );
}