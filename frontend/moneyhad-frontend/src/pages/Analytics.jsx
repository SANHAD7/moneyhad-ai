import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Analytics() {

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    api.get(
      "/api/expense/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {

        setCategoryData(response.data);

      });

    api.get(
      "/api/expense/monthly-report",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {

        setMonthlyData(response.data);

      });

  }, []);

  const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444"
  ];

  return (

    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Analytics Dashboard 📈
        </h1>


        <div className="grid lg:grid-cols-2 gap-8">


          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h1 className="text-2xl font-bold mb-6">
              Spending Categories
            </h1>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="totalAmount"
                  nameKey="category"
                  outerRadius={120}
                  label
                >

                  {
                    categoryData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                            index %
                            COLORS.length
                            ]
                          }
                        />

                      )
                    )
                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>



          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h1 className="text-2xl font-bold mb-6">
              Monthly Spending
            </h1>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={monthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="totalSpent"
                  fill="#8B5CF6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;