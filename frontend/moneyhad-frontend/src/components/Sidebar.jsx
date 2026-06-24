import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  return (

    <div className="w-64 min-h-screen bg-white shadow-xl p-6">

      <h1 className="text-4xl font-bold text-purple-700 mb-10">
        MoneyHad
      </h1>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className={`block p-3 rounded-xl transition-all duration-300
          ${
            location.pathname === "/dashboard"
              ? "bg-purple-100 text-purple-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          🏠 Dashboard
        </Link>


        <Link
          to="/expenses"
          className={`block p-3 rounded-xl transition-all duration-300
          ${
            location.pathname === "/expenses"
              ? "bg-purple-100 text-purple-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          💸 Expenses
        </Link>


        <Link
          to="/analytics"
          className={`block p-3 rounded-xl transition-all duration-300
          ${
            location.pathname === "/analytics"
              ? "bg-purple-100 text-purple-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          📈 Analytics
        </Link>


        <button
          className="block p-3 rounded-xl text-red-500 hover:bg-red-50 w-full text-left"
          onClick={() => {

            localStorage.clear();

            window.location.href = "/";

          }}
        >
          🚪 Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;