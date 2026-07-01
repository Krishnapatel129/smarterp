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

import PurchaseVoucher from "./pages/purchase/PurchaseVoucher";
import PurchaseList from "./pages/purchase/PurchaseList";

import SalesList from "./pages/sales/SalesList.jsx";
import CreateSales from "./pages/sales/CreateSales.jsx";
import EditSales from "./pages/sales/EditSales.jsx";

import CreateBill from "./pages/Billing/CreateBill";
import BillList from "./pages/Billing/BillList";
import EditBill from "./pages/Billing/EditBill";
import PrintBill from "./pages/Billing/PrintBill";

import CreateReceipt from "./pages/receipt/CreateReceipt";
import ReceiptList from "./pages/receipt/ReceiptList";

import CreatePayment from "./pages/payment/CreatePayment";
import PaymentList from "./pages/payment/PaymentList";

import CreateContra from "./pages/contra/CreateContra";
import ContraList from "./pages/contra/ContraList";

import StockLedger from "./pages/reports/StockLedger";
import InventoryValuation from "./pages/reports/InventoryValuation";
import GSTReport from "./pages/reports/GSTReport";
import SalesReport from "./pages/reports/SalesReport";
import PurchaseReport from "./pages/reports/PurchaseReport";
import CustomerOutstanding from "./pages/reports/CustomerOutstanding";
import SupplierOutstanding from "./pages/reports/SupplierOutstanding";
import ProfitLossReport from "./pages/reports/ProfitLossReport";

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

        <Route path="/purchase/create" element={<PurchaseVoucher />} />
        <Route path="/purchase" element={<PurchaseList />} />

        <Route path="/sales" element={<SalesList />} />
        <Route path="/sales/create" element={<CreateSales />} />
        <Route path="/sales/edit/:id" element={<EditSales />} />  

        <Route path="/billing/create" element={<CreateBill />} />
        <Route path="/billing/list" element={<BillList />} />
        <Route path="/billing/edit/:id" element={<EditBill />} />
        <Route path="/billing/print/:id" element={<PrintBill />} />
        <Route path="/billing" element={<BillList />} />

        <Route path="/receipts" element={<ReceiptList />} />
<Route path="/receipts/create" element={<CreateReceipt />} />

        <Route path="/payments" element={<PaymentList />} />
<Route path="/payments/create" element={<CreatePayment />} />

<Route
  path="/contra"
  element={<ContraList />}
/>

<Route
  path="/contra/create"
  element={<CreateContra />}
/>
<Route path="/stock-ledger" element={<StockLedger />} />

<Route path="/inventory-valuation" element={<InventoryValuation />} />  
<Route path="/gst-report" element={<GSTReport />} />
<Route path="/reports/sales" element={<SalesReport />} />
<Route path="/reports/purchase" element={<PurchaseReport />} />
<Route
  path="/reports/customer-outstanding"
  element={<CustomerOutstanding />}
/>
<Route
  path="/reports/supplier-outstanding"
  element={<SupplierOutstanding />}
/>
<Route path="/reports/profit-loss" element={<ProfitLossReport />} />

      </Routes>
    </BrowserRouter>
  );
}