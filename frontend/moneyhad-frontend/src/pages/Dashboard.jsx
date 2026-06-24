
import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { generatePdfReport } from "../services/pdfService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [suggestion, setSuggestion] = useState("");
const [expenses, setExpenses] = useState([]);
const [goal, setGoal] = useState(null);
const [budgetPlan, setBudgetPlan] = useState(null);
const COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#f59e0b"
];
const navigate = useNavigate();
  useEffect(() => {

  const token = localStorage.getItem("token");

  api.get(
  "/api/dashboard",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
.then(response => {

  setDashboard(response.data);

})
.catch(error => {

  localStorage.removeItem("token");

  navigate("/");

});

  api.get(
    "/api/dashboard/suggestion",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {

      setSuggestion(response.data.suggestion);

    })
    .catch(error => {

  localStorage.removeItem("token");

  navigate("/");

});

  api.get(
    "/api/expense/all",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  
    .then(response => {

      setExpenses(response.data);

    })
    .catch(error => {

  localStorage.removeItem("token");

  navigate("/");

});
api.get(
  "/api/goal",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
.then(response => {

  setGoal(response.data);

});
api.get(
  "/api/budget/generate?email=" +
  localStorage.getItem("email"),
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
.then(response => {

  setBudgetPlan(response.data);

});

}, []);

  if (!dashboard) {

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-purple-700">
          Loading...
        </h1>
      </div>
    );

  }

 const healthScore = Math.min(
  100,
  Math.max(
    0,
    Math.round(
      dashboard.remainingBalance * 100 /
      dashboard.monthlyIncome
    )
  )
);

  const budgetUsed = Math.round(
  dashboard.totalSpent * 100 /
  dashboard.monthlyIncome
);

const chartData = expenses.map(expense => ({
  name: expense.category,
  value: expense.amount
}));

const monthlyData = [
  {
    name: "Income",
    amount: dashboard.monthlyIncome
  },
  {
    name: "Spent",
    amount: dashboard.totalSpent
  },
  {
    name: "Balance",
    amount: dashboard.remainingBalance
  }
];

  return (

    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Good Morning 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome to MoneyHad AI Dashboard
            </p>

          </div>
        <button
  onClick={() =>
    generatePdfReport(
      dashboard,
      expenses,
      healthScore
    )
  }
  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 mr-4"
>
  📄 Download Report
</button>
          <Link to="/profile">

  <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg cursor-pointer hover:scale-110 transition-all">

 {
  localStorage
    .getItem("name")
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
}

  </div>

</Link>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <p className="text-gray-500 text-lg">
              Monthly Income
            </p>

            <h1 className="text-4xl font-bold text-green-600 mt-4">
              ₹{dashboard.monthlyIncome}
            </h1>

          </div>


          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <p className="text-gray-500 text-lg">
              Total Spent
            </p>

            <h1 className="text-4xl font-bold text-red-500 mt-4">
              ₹{dashboard.totalSpent}
            </h1>

          </div>


          <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <p className="text-gray-500 text-lg">
              Remaining Balance
            </p>

            <h1 className="text-4xl font-bold text-blue-600 mt-4">
              ₹{dashboard.remainingBalance}
            </h1>

          </div>


          <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-3xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <p className="text-lg opacity-80">
              Financial Health
            </p>

            <div className="flex justify-center items-center mt-8">

              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl border-4 border-blue-200">

                <h1 className="text-4xl font-bold text-blue-700">
                  {healthScore}
                </h1>

              </div>

            </div>

            <p className="text-center mt-5">
              {dashboard.warning}
            </p>

          </div>

        </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 hover:shadow-2xl transition-all duration-300">

  <h1 className="text-2xl font-bold mb-6">
    📊 Budget Usage
  </h1>

  <div className="w-full bg-slate-200 rounded-full h-5">

    <div
     className={
  budgetUsed > 80
    ? "bg-red-500 h-5 rounded-full transition-all duration-700"
    : budgetUsed > 50
    ? "bg-yellow-500 h-5 rounded-full transition-all duration-700"
    : "bg-green-500 h-5 rounded-full transition-all duration-700"
}
      style={{
        width: `${budgetUsed}%`
      }}
    >

    </div>

  </div>

  <div className="flex justify-between mt-4">

    <span className="text-gray-500">

      Used

    </span>

    <span className="font-bold text-purple-700">

      {budgetUsed}%

    </span>

  </div>

</div>
{
  budgetPlan && (

    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h1 className="text-2xl font-bold mb-6">
        💰 Budget Plan (50-30-20)
      </h1>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Needs</span>

          <span className="font-bold text-blue-600">

            ₹{budgetPlan.needsBudget}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Wants</span>

          <span className="font-bold text-orange-500">

            ₹{budgetPlan.wantsBudget}

          </span>

        </div>

        <div className="flex justify-between">

          <span>Savings</span>

          <span className="font-bold text-green-600">

            ₹{budgetPlan.savingsTarget}

          </span>

        </div>

      </div>

    </div>

  )
}
{
  goal && (

    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h1 className="text-2xl font-bold mb-6">
        🎯 Savings Goal
      </h1>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span className="text-gray-500">

            Goal

          </span>

          <span className="font-bold">

            {goal.goalName}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">

            Target Amount

          </span>

          <span className="font-bold text-blue-600">

            ₹{goal.targetAmount}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">

            Current Savings

          </span>

          <span className="font-bold text-green-600">

            ₹{goal.currentSavings}

          </span>

        </div>
        <div className="mt-6">

  <div className="w-full bg-slate-200 rounded-full h-5">

    <div
      className="bg-green-500 h-5 rounded-full transition-all duration-700"
      style={{
        width: `${goal.progress}%`
      }}
    >

    </div>

  </div>

  <div className="flex justify-between mt-3">

    <span className="text-gray-500">
      Progress
    </span>

    <span className="font-bold text-purple-700">
      {goal.progress.toFixed(2)}%
    </span>

  </div>

</div>

      </div>

    </div>

  )
}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-3xl shadow-lg p-8">

<h1 className="text-2xl font-bold mb-6">
📊 Expense Breakdown
</h1>

<PieChart width={400} height={300}>

<Pie
data={chartData}
cx="50%"
cy="50%"
outerRadius={100}
dataKey="value"
label
>

{
chartData.map((entry, index) => (

<Cell
key={index}
fill={COLORS[index % COLORS.length]}
/>

))
}

</Pie>

<Tooltip />

<Legend />

</PieChart>
<div className="bg-white rounded-3xl shadow-lg p-8">

<h1 className="text-2xl font-bold mb-6">
📈 Financial Overview
</h1>

<BarChart width={450} height={300} data={monthlyData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="name" />

<YAxis />

<Tooltip />

<Bar
dataKey="amount"
fill="#8b5cf6"
/>

</BarChart>

</div>
</div>
          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">

            <h1 className="text-2xl font-bold mb-6">
              🤖 AI Suggestion
            </h1>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">

              <p className="text-lg text-gray-700 leading-8">
                {suggestion}
              </p>

            </div>

          </div>

         <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">

        <h1 className="text-2xl font-bold mb-6">
          🧾 Recent Transactions
        </h1>

        <div className="space-y-4">

          {

            expenses.slice(0, 5).map((expense, index) => (

              <div
                key={index}
                className="flex justify-between border-b pb-3"
              >

                <div>

                  <h1 className="font-semibold">
                    {expense.category}
                  </h1>

                  <p className="text-gray-500 text-sm">
                    {expense.description}
                  </p>

                </div>

               <h1 className="font-bold text-red-500 text-lg">

  - ₹{expense.amount}

</h1>
              </div>

            ))

          }

        </div>

      </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">

            <h1 className="text-2xl font-bold mb-6">
              Quick Summary
            </h1>

            <div className="space-y-6">

              <div className="flex justify-between">
                <span className="text-gray-500">Income</span>
                <span className="font-bold text-green-600">
                  ₹{dashboard.monthlyIncome}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Spent</span>
                <span className="font-bold text-red-500">
                  ₹{dashboard.totalSpent}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Remaining</span>
                <span className="font-bold text-blue-600">
                  ₹{dashboard.remainingBalance}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;

