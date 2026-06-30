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

import Groups from "./pages/group/Groups.jsx";
import CreateGroup from "./pages/group/CreateGroup.jsx";
import EditGroup from "./pages/group/EditGroup.jsx";

import StockGroups from "./pages/stock/StockGroups.jsx";
import CreateStockGroup from "./pages/stock/CreateStockGroup.jsx";
import EditStockGroup from "./pages/stock/EditStockGroup.jsx";

import Units from "./pages/stock/Units.jsx";
import CreateUnit from "./pages/stock/CreateUnit.jsx";
import EditUnit from "./pages/stock/EditUnit.jsx";

import StockItems from "./pages/stock/StockItems.jsx";
import CreateStockItem from "./pages/stock/CreateStockItem.jsx";
import EditStockItem from "./pages/stock/EditStockItem.jsx";
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

        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/create" element={<CreateGroup />} />
        <Route path="/groups/edit/:id" element={<EditGroup />} />

        <Route path="/stock-groups" element={<StockGroups />} />
        <Route path="/stock-groups/create" element={<CreateStockGroup />} />
        <Route path="/stock-groups/edit/:id" element={<EditStockGroup />} />

        <Route path="/units" element={<Units />} />
        <Route path="/units/create" element={<CreateUnit />} />
        <Route path="/units/edit/:id" element={<EditUnit />} />

        <Route path="/stock-items" element={<StockItems />} />
        <Route path="/stock-items/create" element={<CreateStockItem />} />
        <Route path="/stock-items/edit/:id" element={<EditStockItem />} />
      </Routes>
    </BrowserRouter>
  );
}