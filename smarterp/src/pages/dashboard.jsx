import {
  Building2,
  Users,
  FileText,
  Package,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Companies",
      icon: <Building2 size={35} />,
      color: "bg-blue-600",
      path: "/companies",
    },
    {
      title: "Users",
      icon: <Users size={35} />,
      color: "bg-green-600",
      path: "/users",
    },
   {
  title: "Ledger",
  icon: <FileText size={35} />,
  color: "bg-orange-500",
  path: "/ledgers",
},
    {
      title: "Inventory",
      icon: <Package size={35} />,
      color: "bg-purple-600",
      path: "/inventory",
    },
    {
      title: "Vouchers",
      icon: <Receipt size={35} />,
      color: "bg-red-600",
      path: "/vouchers",
    },
    {
      title: "Reports",
      icon: <BarChart3 size={35} />,
      color: "bg-cyan-600",
      path: "/reports",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">SmartERP</h1>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 hover:text-yellow-300 transition">
            <Settings size={20} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-300 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome */}
      <div className="px-8 pt-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to SmartERP
        </h2>

        <p className="text-gray-500 mt-2">
          Manage Accounting, Inventory, GST, Sales and Purchase from one place.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`${card.color} text-white rounded-xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{card.title}</h3>

                <p className="mt-2 text-sm opacity-90">
                  Open Module
                </p>
              </div>

              {card.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}