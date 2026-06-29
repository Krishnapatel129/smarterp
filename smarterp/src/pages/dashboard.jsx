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

export default function Dashboard() {
  const cards = [
    {
      title: "Companies",
      icon: <Building2 size={35} />,
      color: "bg-blue-600",
    },
    {
      title: "Users",
      icon: <Users size={35} />,
      color: "bg-green-600",
    },
    {
      title: "Ledger",
      icon: <FileText size={35} />,
      color: "bg-orange-500",
    },
    {
      title: "Inventory",
      icon: <Package size={35} />,
      color: "bg-purple-600",
    },
    {
      title: "Vouchers",
      icon: <Receipt size={35} />,
      color: "bg-red-600",
    },
    {
      title: "Reports",
      icon: <BarChart3 size={35} />,
      color: "bg-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-2xl font-bold">
          SmartERP
        </h1>

        <div className="flex items-center gap-6">

          <button className="flex items-center gap-2 hover:text-yellow-300">
            <Settings size={20} />
            Settings
          </button>

          <button className="flex items-center gap-2 hover:text-red-300">
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

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`${card.color} text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition duration-300 cursor-pointer`}
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-2xl font-bold">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm">
                  Open Module
                </p>

              </div>

              {card.icon}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}